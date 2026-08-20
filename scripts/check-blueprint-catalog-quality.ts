import { createHash } from 'crypto';
import { BLUEPRINT_KNOWLEDGE_MATRIX } from '../src/lib/blueprintKnowledgeMatrixNormalized';
import {
  getDefaultXmlForArchitecture,
  normalizeArchitectureId,
} from '../src/lib/architectureTypesVisual';
import { CATALOG_CANONICAL_IDS } from '../src/lib/blueprintExactResolver';

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

function hash(xml: string): string {
  return createHash('sha256').update(xml).digest('hex');
}

function diagramId(xml: string): string {
  return xml.match(/<diagram\b[^>]*\bid="([^"]+)"/i)?.[1] || '';
}

function fontSizes(xml: string): number[] {
  return [
    ...Array.from(xml.matchAll(/font-size:\s*(\d+(?:\.\d+)?)px/gi), match => Number(match[1])),
    ...Array.from(xml.matchAll(/fontSize=(\d+(?:\.\d+)?)/gi), match => Number(match[1])),
  ].filter(Number.isFinite);
}

function distinctMatches(xml: string, pattern: RegExp): number {
  return new Set(Array.from(xml.matchAll(pattern), match => match[1])).size;
}

function assertContains(xml: string, tokens: string[], label: string, failures: string[]): void {
  const lower = xml.toLowerCase();
  const missing = tokens.filter(token => !lower.includes(token.toLowerCase()));
  if (missing.length) failures.push(`${label}: missing ${missing.join(', ')}`);
}

const failures: string[] = [];
const advisories: string[] = [];

if (BLUEPRINT_KNOWLEDGE_MATRIX.length !== 50) {
  failures.push(`catalog size: expected 50, got ${BLUEPRINT_KNOWLEDGE_MATRIX.length}`);
}
if (CATALOG_CANONICAL_IDS.length !== 50 || new Set(CATALOG_CANONICAL_IDS).size !== 50) {
  failures.push('canonical resolver: expected exactly 50 unique canonical IDs');
}

const canonicalIds = BLUEPRINT_KNOWLEDGE_MATRIX.map(item => normalizeArchitectureId(item.combinedId));
if (new Set(canonicalIds).size !== 50) {
  failures.push(`canonical normalization collision: ${50 - new Set(canonicalIds).size} duplicate canonical IDs`);
}

const diagramIds = new Map<string, number[]>();
const hashes = new Map<string, number[]>();
const outputs = new Map<number, string>();

BLUEPRINT_KNOWLEDGE_MATRIX.forEach((item, index) => {
  const number = index + 1;
  const canonicalId = canonicalIds[index];
  const notationSensitive = NOTATION_SENSITIVE.has(canonicalId);
  const xml = getDefaultXmlForArchitecture(item.combinedId) || '';
  outputs.set(number, xml);

  if (!xml || !/<mxGraphModel\b/i.test(xml) || !/<root>/i.test(xml) || !/<\/root>/i.test(xml)) {
    failures.push(`#${number} ${canonicalId}: unresolved or structurally invalid XML`);
    return;
  }

  const id = diagramId(xml);
  if (id) diagramIds.set(id, [...(diagramIds.get(id) || []), number]);
  const fingerprint = hash(xml);
  hashes.set(fingerprint, [...(hashes.get(fingerprint) || []), number]);

  const stale = STALE_PATTERNS.filter(([, pattern]) => pattern.test(xml)).map(([name]) => name);
  if (stale.length) failures.push(`#${number} ${canonicalId}: stale terminology: ${stale.join(', ')}`);

  if (!notationSensitive) {
    if (!xml.includes('pc-text-containment-v1')) failures.push(`#${number} ${canonicalId}: containment transform missing`);
    if (!xml.includes('pc-semantic-icons-v1')) failures.push(`#${number} ${canonicalId}: semantic-icon transform missing`);
    if ((xml.match(EMOJI_RE) || []).length) failures.push(`#${number} ${canonicalId}: emoji placeholder remains`);

    const tiny = fontSizes(xml).filter(size => size < 9.5);
    if (tiny.length) failures.push(`#${number} ${canonicalId}: ${tiny.length} font declarations below 9.5px`);

    const vertexCount = Array.from(xml.matchAll(/<mxCell\b[^>]*\bvertex="1"/gi)).length;
    const edgeCount = Array.from(xml.matchAll(/<mxCell\b[^>]*\bedge="1"/gi)).length;
    const imageCount = Array.from(xml.matchAll(/shape=image/gi)).length + Array.from(xml.matchAll(/&lt;img\b/gi)).length;
    const fillColors = distinctMatches(xml, /fillColor=(#[0-9A-Fa-f]{6})/g);
    const shapeKinds = distinctMatches(xml, /(?:shape=|style=")([^;"\s]+)/g);

    if (vertexCount < 6) advisories.push(`#${number} ${canonicalId}: visually sparse (${vertexCount} vertices)`);
    if (edgeCount === 0 && !['cloud_finops_chargeback', 'six_rs_migration_matrix', 'ai_coe_operating_model'].includes(canonicalId)) {
      advisories.push(`#${number} ${canonicalId}: no explicit flow edge; verify this is intentional`);
    }
    if (imageCount === 0 && fillColors < 3 && shapeKinds < 2) {
      advisories.push(`#${number} ${canonicalId}: weak visual-depth heuristic; inspect composition intentionally`);
    }
  } else {
    if (xml.includes('pc-semantic-icons-v1')) failures.push(`#${number} ${canonicalId}: notation diagram was semantic-card transformed`);
    if (xml.includes('pc-text-containment-v1')) failures.push(`#${number} ${canonicalId}: notation geometry was generic-containment transformed`);
  }

  if (canonicalId !== 'unified_system_view' && !xml.includes(`pc-catalog-id:${canonicalId}`)) {
    failures.push(`#${number} ${canonicalId}: canonical catalog identity marker missing`);
  }
});

for (const [id, nums] of diagramIds) {
  if (nums.length > 1) failures.push(`duplicate internal diagram id "${id}": blueprints ${nums.join(', ')}`);
}
for (const [fingerprint, nums] of hashes) {
  if (nums.length > 1) failures.push(`duplicate resolved XML ${fingerprint.slice(0, 12)}: blueprints ${nums.join(', ')}`);
}

// Critical semantic/capability regressions.
const bp6 = outputs.get(6) || '';
assertContains(bp6, ['Connectors', 'Gemini Notebook', 'Skills', 'Agent Gallery', 'Agent Platform'], '#6 Gemini Enterprise capability portfolio', failures);

const bp20 = outputs.get(20) || '';
assertContains(bp20, ['Network Connectivity Center', 'Cloud Interconnect', 'HA VPN', 'Cross-Cloud Interconnect', 'Workforce Identity Federation', 'Workload Identity Federation'], '#20 hybrid multi-cloud architecture', failures);

const bp34 = outputs.get(34) || '';
assertContains(bp34, ['Assistant', 'Connectors', 'Gemini Notebook', 'Skills', 'Agent Gallery', 'Agent Designer', 'Agent Runtime'], '#34 Gemini Enterprise CoE capability portfolio', failures);

const bp39 = outputs.get(39) || '';
const bp42 = outputs.get(42) || '';
if (hash(bp39) === hash(bp42)) failures.push('#39/#42 manufacturing architectures resolved to identical XML');
assertContains(bp39, ['Predictive Maintenance', 'Manufacturing Connect', 'Maintenance'], '#39 predictive-maintenance differentiation', failures);
assertContains(bp42, ['Digital Twin', 'ISA-95', 'OEE'], '#42 smart-factory differentiation', failures);

const bp50 = outputs.get(50) || '';
assertContains(bp50, ['MCP Gateway', 'MCP Client', 'Remote MCP', 'Cloud Run'], '#50 enterprise MCP gateway', failures);

const report = {
  catalogCount: BLUEPRINT_KNOWLEDGE_MATRIX.length,
  canonicalCount: new Set(canonicalIds).size,
  resolvedCount: outputs.size,
  uniqueDiagramIds: diagramIds.size,
  uniqueOutputFingerprints: hashes.size,
  failures,
  advisories,
};

console.log(JSON.stringify(report, null, 2));

if (failures.length) {
  console.error(`\nBlueprint catalog quality gate FAILED with ${failures.length} release-blocking issue(s).`);
  process.exit(1);
}

console.log(`\nBlueprint catalog quality gate PASSED for ${BLUEPRINT_KNOWLEDGE_MATRIX.length} blueprints.`);
if (advisories.length) console.log(`${advisories.length} visual advisory item(s) remain visible in the report but do not represent structural/semantic regressions.`);
