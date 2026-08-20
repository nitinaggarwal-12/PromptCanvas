import { BLUEPRINT_KNOWLEDGE_MATRIX, getBlueprintMetadataById } from '../src/lib/blueprintKnowledgeMatrixCatalog';
import { getArchitectureHierarchy } from '../src/lib/architectureHierarchyCatalog';
import { getDefaultXmlForArchitecture } from '../src/lib/architectureTypesCertified';

const ID = 'enterprise_ai_document_assistant';
const failures: string[] = [];

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
if (!xml.includes('PromptCanvas Blueprint 61')) failures.push('runtime XML missing Blueprint 61 agent identity');
if (!xml.includes('Blueprint 61 - Enterprise AI Document Assistant')) failures.push('runtime XML missing Blueprint 61 diagram name');
if (xml.includes('Blueprint 51') || xml.includes('enterprise_ai_doc_assistant_51')) failures.push('runtime XML leaked provisional Blueprint 51 identity');
if (!xml.includes('catalog_enterprise_ai_document_assistant')) failures.push('runtime XML missing canonical catalog diagram ID');

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
  if (!xml.toLowerCase().includes(token.toLowerCase())) failures.push(`runtime XML missing ${token}`);
}

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
  combinedId: bp61.combinedId,
  liveRailwayLink: bp61.liveRailwayLink,
}, null, 2));
