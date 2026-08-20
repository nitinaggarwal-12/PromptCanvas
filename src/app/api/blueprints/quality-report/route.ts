import { NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { BLUEPRINT_KNOWLEDGE_MATRIX } from '@/lib/blueprintKnowledgeMatrix';
import { getDefaultXmlForArchitecture, normalizeArchitectureId } from '@/lib/architectureTypes';

const NOTATION_SENSITIVE = new Set([
  'erd',
  'sequence_diagram',
  'tech_c4_system_context',
  'c4_component_lld',
  'bpmn_process_workflow',
  'threat_modeling_stride',
  'data_lineage_provenance',
]);

const STALE_PATTERNS: Array<[string, RegExp]> = [
  ['Gemini 3.7', /Gemini\s+3\.7/i],
  ['Cloud Source Repositories', /Cloud Source Repositories/i],
  ['Dataplex Data Catalog', /Dataplex Data Catalog/i],
  ['Dataplex Universal Catalog', /Dataplex Universal Catalog/i],
  ['Cloud DLP', /Cloud DLP/i],
  ['Anthos Service Mesh', /Anthos Service Mesh/i],
  ['Global HTTPS Load Balancer', /Global HTTPS Load Balancer/i],
];

const EMOJI_RE = /\p{Extended_Pictographic}/gu;

function numberMatches(xml: string, pattern: RegExp): number {
  return Array.from(xml.matchAll(pattern)).length;
}

function hashXml(xml: string): string {
  return createHash('sha256').update(xml).digest('hex').slice(0, 16);
}

function fontSizes(xml: string): number[] {
  const values: number[] = [];
  for (const match of xml.matchAll(/font-size:\s*(\d+(?:\.\d+)?)px/gi)) values.push(Number(match[1]));
  for (const match of xml.matchAll(/fontSize=(\d+(?:\.\d+)?)/gi)) values.push(Number(match[1]));
  return values.filter(Number.isFinite);
}

function diagramId(xml: string): string {
  return xml.match(/<diagram\b[^>]*\bid="([^"]+)"/i)?.[1] || '';
}

function riskyTextCells(xml: string): number {
  const cellRe = /<mxCell\b([^>]*\bvertex="1"[^>]*)>([\s\S]*?)<\/mxCell>/gi;
  let count = 0;
  for (const match of xml.matchAll(cellRe)) {
    const attrs = match[1] || '';
    const body = match[2] || '';
    const value = attrs.match(/\bvalue="([^"]*)"/i)?.[1] || '';
    if (!value) continue;
    if (/shape=image/i.test(attrs)) continue;
    const geo = body.match(/<mxGeometry\b([^>]*)/i)?.[1] || '';
    const w = Number(geo.match(/\bwidth="([\d.]+)"/i)?.[1] || 0);
    const h = Number(geo.match(/\bheight="([\d.]+)"/i)?.[1] || 0);
    if (!w || !h) continue;
    const plain = value
      .replace(/&lt;br\s*\/?&gt;/gi, '\n')
      .replace(/<br\s*\/?\s*>/gi, '\n')
      .replace(/&lt;[^&]*?&gt;/g, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/gi, ' ')
      .replace(/&amp;/gi, '&')
      .replace(/&quot;/gi, '"')
      .replace(/\s+/g, ' ')
      .trim();
    if (!plain) continue;
    const style = attrs.match(/style="([^"]*)"/i)?.[1] || '';
    const fs = Number(style.match(/fontSize=(\d+(?:\.\d+)?)/i)?.[1] || 11);
    const usableChars = Math.max(8, Math.floor(Math.max(30, w - 16) / Math.max(5.2, fs * 0.54)));
    const estimatedLines = Math.max(1, Math.ceil(plain.length / usableChars));
    const estimatedHeight = estimatedLines * fs * 1.25 + 12;
    if (estimatedHeight > h * 1.08) count += 1;
  }
  return count;
}

export async function GET() {
  const rows = BLUEPRINT_KNOWLEDGE_MATRIX.map((bp, index) => {
    const canonicalId = normalizeArchitectureId(bp.combinedId);
    const notationSensitive = NOTATION_SENSITIVE.has(canonicalId);
    const xml = getDefaultXmlForArchitecture(bp.combinedId) || '';
    const fonts = fontSizes(xml);
    const minFont = fonts.length ? Math.min(...fonts) : null;
    const vertexCount = numberMatches(xml, /<mxCell\b[^>]*\bvertex="1"/gi);
    const edgeCount = numberMatches(xml, /<mxCell\b[^>]*\bedge="1"/gi);
    const imageCount = numberMatches(xml, /shape=image/gi) + numberMatches(xml, /&lt;img\b/gi);
    const emojiCount = notationSensitive ? 0 : numberMatches(xml, EMOJI_RE);
    const staleTerms = STALE_PATTERNS.filter(([, pattern]) => pattern.test(xml)).map(([name]) => name);
    const hasContainmentMarker = notationSensitive || xml.includes('pc-text-containment-v1');
    const tinyFontCount = notationSensitive ? 0 : fonts.filter(size => size < 9.5).length;
    const overflowRiskCount = notationSensitive ? 0 : riskyTextCells(xml);
    const structuralOk = Boolean(xml && /<mxGraphModel\b/i.test(xml) && /<root>/i.test(xml) && /<\/root>/i.test(xml));
    const sparseRisk = !notationSensitive && (vertexCount < 10 || edgeCount < 2);

    return {
      number: index + 1,
      combinedId: bp.combinedId,
      canonicalId,
      name: bp.diagramName,
      diagramId: diagramId(xml),
      xmlHash: xml ? hashXml(xml) : '',
      structuralOk,
      vertexCount,
      edgeCount,
      imageCount,
      minFont,
      tinyFontCount,
      emojiCount,
      staleTerms,
      hasContainmentMarker,
      overflowRiskCount,
      sparseRisk,
      notationSensitive,
    };
  });

  const hashes = new Map<string, number[]>();
  const diagramIds = new Map<string, number[]>();
  rows.forEach(row => {
    if (row.xmlHash) hashes.set(row.xmlHash, [...(hashes.get(row.xmlHash) || []), row.number]);
    if (row.diagramId) diagramIds.set(row.diagramId, [...(diagramIds.get(row.diagramId) || []), row.number]);
  });

  const duplicateOutputGroups = [...hashes.entries()]
    .filter(([, nums]) => nums.length > 1)
    .map(([hash, blueprints]) => ({ hash, blueprints }));
  const duplicateDiagramIdGroups = [...diagramIds.entries()]
    .filter(([, nums]) => nums.length > 1)
    .map(([id, blueprints]) => ({ id, blueprints }));

  const aggregate = {
    catalogCount: rows.length,
    resolvedCount: rows.filter(r => r.structuralOk).length,
    staleTermBlueprints: rows.filter(r => r.staleTerms.length).length,
    emojiRiskBlueprints: rows.filter(r => r.emojiCount > 0).length,
    tinyFontRiskBlueprints: rows.filter(r => r.tinyFontCount > 0).length,
    overflowRiskBlueprints: rows.filter(r => r.overflowRiskCount > 0).length,
    missingContainmentBlueprints: rows.filter(r => !r.hasContainmentMarker).length,
    sparseRiskBlueprints: rows.filter(r => r.sparseRisk).length,
    duplicateOutputGroups: duplicateOutputGroups.length,
    duplicateDiagramIdGroups: duplicateDiagramIdGroups.length,
  };

  const phaseGate = {
    resolution: aggregate.catalogCount === 50 && aggregate.resolvedCount === 50,
    technicalTerminology: aggregate.staleTermBlueprints === 0,
    uniqueOutputs: aggregate.duplicateOutputGroups === 0,
    uniqueDiagramIds: aggregate.duplicateDiagramIdGroups === 0,
    containmentApplied: aggregate.missingContainmentBlueprints === 0,
  };

  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    aggregate,
    phaseGate,
    duplicateOutputGroups,
    duplicateDiagramIdGroups,
    rows,
  });
}
