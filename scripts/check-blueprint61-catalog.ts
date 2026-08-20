import { inflateRawSync } from 'node:zlib';
import { BLUEPRINT_KNOWLEDGE_MATRIX, getBlueprintMetadataById } from '../src/lib/blueprintKnowledgeMatrixCatalog';
import { getArchitectureHierarchy } from '../src/lib/architectureHierarchyCatalog';
import { getDefaultXmlForArchitecture } from '../src/lib/architectureTypesCertified';
import { isCompressedDrawioXml, validateAndHealDrawioXml } from '../src/lib/xmlHealerCompressedSafe';

const ID = 'enterprise_ai_document_assistant';
const failures: string[] = [];

function decodeRuntimeDiagram(xml: string): string {
  const body = xml.match(/<diagram\b[^>]*>([\s\S]*?)<\/diagram>/i)?.[1] || '';
  if (!body) return '';
  try {
    return decodeURIComponent(inflateRawSync(Buffer.from(body, 'base64')).toString('utf8'));
  } catch {
    return '';
  }
}

if (BLUEPRINT_KNOWLEDGE_MATRIX.length !== 61) {
  failures.push(`visible catalog size: expected 61, got ${BLUEPRINT_KNOWLEDGE_MATRIX.length}`);
}

if (new Set(BLUEPRINT_KNOWLEDGE_MATRIX.map((item) => item.combinedId)).size !== 61) {
  failures.push('visible catalog combined IDs are not unique');
}

const bp61 = BLUEPRINT_KNOWLEDGE_MATRIX[60];
if (!bp61 || bp61.combinedId !== ID) {
  failures.push(`catalog position #61 mismatch: got ${bp61?.combinedId || 'missing'}`);
}

const lookup = getBlueprintMetadataById('blueprint 61');
if (!lookup || lookup.combinedId !== ID) {
  failures.push('Blueprint 61 metadata lookup failed');
}

const hierarchyCount = getArchitectureHierarchy().reduce((sum, phase) => sum + phase.totalBlueprintsCount, 0);
if (hierarchyCount !== 61) {
  failures.push(`hierarchy size: expected 61, got ${hierarchyCount}`);
}

const xml = getDefaultXmlForArchitecture(ID) || '';
const diagram = decodeRuntimeDiagram(xml);

if (!xml.includes('PromptCanvas Blueprint 61')) failures.push('runtime XML missing Blueprint 61 agent identity');
if (!xml.includes('Blueprint 61 - Enterprise AI Document Assistant')) failures.push('runtime XML missing Blueprint 61 diagram name');
if (xml.includes('Blueprint 51') || xml.includes('enterprise_ai_doc_assistant_51')) failures.push('runtime XML leaked provisional Blueprint 51 identity');
if (!xml.includes('catalog_enterprise_ai_document_assistant')) failures.push('runtime XML missing canonical catalog diagram ID');
if (!diagram.includes('<mxGraphModel') || !diagram.includes('<root>')) failures.push('runtime diagram payload could not be decoded as editable Draw.io XML');
if (!isCompressedDrawioXml(xml)) failures.push('Blueprint 61 runtime payload is expected to be recognized as compressed Draw.io XML');

const renderPathResult = validateAndHealDrawioXml(xml, ID);
const renderPathDiagram = decodeRuntimeDiagram(renderPathResult.xml);
if (renderPathResult.isHealed) failures.push('browser render healer unexpectedly replaced or mutated Blueprint 61 compressed XML');
if (renderPathResult.xml !== xml.trim()) failures.push('browser render healer did not preserve Blueprint 61 payload byte-for-byte');
if (!renderPathDiagram.includes('<mxGraphModel') || !renderPathDiagram.includes('<root>')) {
  failures.push('browser render path no longer resolves Blueprint 61 as compressed editable Draw.io XML');
}

const required = [
  'Workflow Orchestrator',
  'Document AI',
  'Gemini',
  'Human Review',
  'Cloud Armor',
  'Pub/Sub',
  'BigQuery',
  'Cloud Logging',
];
for (const token of required) {
  if (!diagram.toLowerCase().includes(token.toLowerCase())) failures.push(`runtime diagram missing ${token}`);
  if (!renderPathDiagram.toLowerCase().includes(token.toLowerCase())) failures.push(`browser render path missing ${token}`);
}

const forbiddenFallbackMarkers = [
  'serverless_eda_architecture',
  'Event-Driven Microservices',
  'Serverless Web Application',
];
for (const token of forbiddenFallbackMarkers) {
  if (renderPathDiagram.toLowerCase().includes(token.toLowerCase())) {
    failures.push(`browser render path fell back to wrong legacy architecture: ${token}`);
  }
}

const vertices = (diagram.match(/<mxCell\b[^>]*\bvertex="1"/gi) || []).length;
const edges = (diagram.match(/<mxCell\b[^>]*\bedge="1"/gi) || []).length;
const decisions = (diagram.match(/rhombus/gi) || []).length;
if (vertices < 25) failures.push(`runtime diagram too sparse: ${vertices} vertices`);
if (edges < 18) failures.push(`runtime diagram too sparse: ${edges} edges`);
if (decisions < 3) failures.push(`runtime diagram missing decision depth: ${decisions} diamonds`);

const liveLink = bp61?.liveRailwayLink || '';
if (!liveLink.includes('promptcanvas-production-235c.up.railway.app') || !liveLink.includes(`blueprint=${ID}`)) {
  failures.push('Blueprint 61 Railway deep link is missing or incorrect');
}

if (failures.length) {
  console.error(JSON.stringify({ blueprint: 61, status: 'FAILED', failures }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  blueprint: 61,
  status: 'PASSED',
  visibleCatalogCount: BLUEPRINT_KNOWLEDGE_MATRIX.length,
  hierarchyCount,
  vertices,
  edges,
  decisions,
  compressedRuntimePreserved: !renderPathResult.isHealed && renderPathResult.xml === xml.trim(),
  combinedId: bp61.combinedId,
  liveRailwayLink: bp61.liveRailwayLink,
}, null, 2));
