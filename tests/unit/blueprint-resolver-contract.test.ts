/**
 * Blueprint resolver contract.
 *
 * Every blueprint advertised in BLUEPRINT_KNOWLEDGE_MATRIX must resolve to a
 * real, distinct, labelled diagram. Today many do not: `getTechnicalArchitectureXml`
 * is a chain of `id.includes(...)` substring tests, so an ID matching no branch
 * falls through to a generic default instead of failing loudly.
 *
 * Three assertions:
 *   RESOLVES  — the ID returns XML without throwing
 *   LABELLED  — that XML contains vertices with readable text
 *   DISTINCT  — no two IDs return byte-identical XML unless declared related
 *
 * Declared variants: if two blueprints are intentionally the same diagram in a
 * different presentation (light/dark, exec/architect view), record the pair in
 * DECLARED_VARIANTS below. Identity WITH a declaration is a product decision;
 * identity WITHOUT one is a routing bug. This test only fails the latter.
 *
 * KNOWN_FAILURES is a ratchet, not an excuse list. It records today's breakage
 * so the gate can run green now and shrink as blueprints are wired. Remove
 * entries as they are fixed; never add a new one to make a build pass.
 */
import { BLUEPRINT_KNOWLEDGE_MATRIX } from '../../src/lib/blueprintKnowledgeMatrix';
import { getTechnicalArchitectureXml } from '../../src/lib/technicalArchitectureXmls';
import { createHash } from 'crypto';

/** Pairs of IDs that are intentionally the same diagram in a different presentation. */
const DECLARED_VARIANTS: Array<[string, string]> = [
  // e.g. ['ARCH-C4-01_c4_system_context_container', 'ARCH-C4-02_ARCH-C4-03_c4_component_lld'],
];

/**
 * Blueprints that do not currently satisfy the contract.
 * Each line is a broken promise on the template gallery — a user selecting it
 * gets an error or a generic unlabelled diagram.
 */
const KNOWN_FAILURES = new Set<string>([
  // throws: getExactAgentHarnessRuntimeReferenceXml is not a function
  'P4-AI-P-04_enterprise_agent_runtime_platform',
  // throws under ESM: technicalArchitectureXmls.ts uses a CommonJS require()
  // for './newEnterpriseReferenceXmls' inside an ES module. Works in the Next
  // bundler, fails anywhere else — including this test and any future script.
  'P3-DAT-L-04_gcp_enterprise_data_lakehouse',
]);

/**
 * Groups of blueprint IDs that currently return byte-identical XML because the
 * resolver's includes() chain matched no branch and fell through to a default.
 * These are routing bugs, not variants — each entry is a blueprint advertised
 * in the gallery that does not have its own diagram. Shrink this list.
 */
const KNOWN_COLLISIONS: string[][] = [
  [
    'P1-APP-L-01_legacy_data_dependency_map', 'P1-GOV-C-03_value_stream_map_vsm',
    'P1-GOV-C-04_as_is_vs_to_be_process_flow', 'P3-APP-C-01_total_unified_system_view',
    'P3-DAT-L-05_dimensional_data_model_erd', 'P4-SEC-P-01_secure_deployment_topology_map',
    'P4-SEC-P-02_gcp_landing_zone_vpc_map', 'P4-GOV-L-08_ai_agent_approval_workflow',
    'P4-APP-L-11_serverless_eda_architecture', 'P4-DAT-P-12_multimodal_ingestion_flow',
    'P5-GOV-L-04_incident_triage_swimlane', 'P5-AI-L-05_llm_capacity_quota_management',
    'P5-AI-P-07_tech_llmops_lifecycle', 'IND-MFG-02_ge_equipment_optimization_gemini',
    'IND-RETAIL-04_omnichannel_ecommerce_retail', 'IND-HR-06_workforce_talent_ai',
    'IND-HEALTH-07_IND-HEALTH-01_healthcare_fhir_hl7', 'ARCH-BPMN-03_ARCH-BPMN-01_bpmn_process_workflow',
    'ARCH-SEC-04_ARCH-SEC-01_threat_modeling_stride', 'ARCH-DAT-05_ARCH-DAT-01_data_lineage_provenance',
  ],
  ['P3-AI-L-03_hub_and_spoke_agent_mesh', 'P4-SEC-P-05_tech_agentic_mesh'],
  ['P4-DAT-P-13_real_time_streaming_analytics', 'IND-MFG-05_smart_manufacturing_iot'],
  ['ARCH-C4-01_c4_system_context_container', 'ARCH-C4-02_ARCH-C4-03_c4_component_lld'],
];

const KNOWN_COLLISION_KEYS = new Set(KNOWN_COLLISIONS.map((g) => [...g].sort().join('::')));

interface Resolution {
  id: string;
  ok: boolean;
  reason?: string;
  hash?: string;
  labels?: number;
}

function labelledVertexCount(xml: string): number {
  // `value` may appear before or after `vertex="1"` on the same mxCell, so match
  // the whole tag and test its attributes rather than assuming an order.
  const cellRe = /<mxCell([^>]*?)\/?>/g;
  let m: RegExpExecArray | null;
  let n = 0;
  while ((m = cellRe.exec(xml)) !== null) {
    const attrs = m[1];
    if (!/vertex="1"/.test(attrs)) continue;
    const v = /value="([^"]*)"/.exec(attrs);
    if (!v) continue;
    const text = v[1].replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/g, ' ').trim();
    if (text.length > 1) n++;
  }
  return n;
}

export function resolveAll(): Resolution[] {
  const results: Resolution[] = [];
  for (const bp of BLUEPRINT_KNOWLEDGE_MATRIX) {
    const id = bp.combinedId;
    try {
      const xml = getTechnicalArchitectureXml(id);
      if (!xml || xml.length < 200) {
        results.push({ id, ok: false, reason: `empty or truncated XML (${xml?.length ?? 0} bytes)` });
        continue;
      }
      const labels = labelledVertexCount(xml);
      if (labels === 0) {
        results.push({ id, ok: false, reason: 'resolved XML has no labelled vertices', labels });
        continue;
      }
      results.push({ id, ok: true, hash: createHash('sha256').update(xml).digest('hex').slice(0, 16), labels });
    } catch (err) {
      results.push({ id, ok: false, reason: `threw: ${(err as Error).message}` });
    }
  }
  return results;
}

function variantKey(a: string, b: string): string {
  return [a, b].sort().join('::');
}

export function runResolverContract(): boolean {
  const results = resolveAll();
  let passed = true;

  // --- RESOLVES + LABELLED ---
  const broken = results.filter((r) => !r.ok);
  const unexpected = broken.filter((r) => !KNOWN_FAILURES.has(r.id));
  const fixed = [...KNOWN_FAILURES].filter((id) => results.find((r) => r.id === id)?.ok);

  console.log(`\nBlueprint resolver: ${results.length - broken.length}/${results.length} resolve to a labelled diagram`);

  if (unexpected.length > 0) {
    passed = false;
    console.error(` ❌ ${unexpected.length} blueprint(s) newly broken:`);
    for (const r of unexpected) console.error(`      ${r.id} — ${r.reason}`);
  }
  if (fixed.length > 0) {
    passed = false;
    console.error(` ❌ ${fixed.length} blueprint(s) now resolve but are still listed in KNOWN_FAILURES.`);
    console.error(`      Remove them from the list so the gate ratchets: ${fixed.join(', ')}`);
  }

  // --- DISTINCT ---
  const declared = new Set(DECLARED_VARIANTS.map(([a, b]) => variantKey(a, b)));
  const byHash = new Map<string, string[]>();
  for (const r of results) {
    if (!r.ok || !r.hash) continue;
    if (!byHash.has(r.hash)) byHash.set(r.hash, []);
    byHash.get(r.hash)!.push(r.id);
  }
  const undeclared: string[][] = [];
  for (const group of byHash.values()) {
    if (group.length < 2) continue;
    const allDeclared = group.every((a, i) =>
      group.every((b, j) => i === j || declared.has(variantKey(a, b))),
    );
    if (allDeclared) continue;
    if (KNOWN_COLLISION_KEYS.has([...group].sort().join('::'))) continue; // known, ratcheting
    undeclared.push(group);
  }
  const collisionsFixed = KNOWN_COLLISIONS.filter(
    (g) => ![...byHash.values()].some((cur) => [...cur].sort().join('::') === [...g].sort().join('::')),
  );
  if (collisionsFixed.length > 0) {
    passed = false;
    console.error(` ❌ ${collisionsFixed.length} collision group(s) no longer collide — remove them from KNOWN_COLLISIONS.`);
  }
  if (undeclared.length > 0) {
    passed = false;
    console.error(` ❌ ${undeclared.length} NEW group(s) of blueprints return identical XML with no declared variant relationship:`);
    for (const g of undeclared) console.error(`      [${g.length}] ${g.join(', ')}`);
    console.error('      Either fix the resolver, or declare the pair in DECLARED_VARIANTS if the shared diagram is intentional.');
  }

  if (passed) {
    const collided = KNOWN_COLLISIONS.reduce((n, g) => n + g.length, 0);
    console.log(
      ` ✅ contract holds — but ${broken.length} blueprint(s) fail to resolve and ${collided} share a diagram ` +
      `with another blueprint. ${results.length - broken.length - collided + KNOWN_COLLISIONS.length} of ${results.length} ` +
      `advertised blueprints have their own diagram.`,
    );
  }
  return passed;
}

if (typeof describe !== 'undefined') {
  describe('Blueprint resolver contract', () => {
    it('every advertised blueprint resolves to a distinct, labelled diagram', () => {
      expect(runResolverContract()).toBe(true);
    });
  });
}
