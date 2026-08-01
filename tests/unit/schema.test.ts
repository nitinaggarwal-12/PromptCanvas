import { validateGraphJson, ArchitectureGraph } from '../../src/lib/graph/schema';

export function runSchemaTests(): boolean {
  console.log('\n🧪 Running Schema Validation Unit Tests...');
  let passed = true;

  // 1. Valid Fixture
  const validGraph: ArchitectureGraph = {
    title: 'Valid E-Commerce Architecture',
    cloud: 'gcp',
    tiers: [
      { id: 'tier_ingress', label: 'Ingress & Edge', order: 1 },
      { id: 'tier_compute', label: 'Compute', order: 2 },
    ],
    nodes: [
      { id: 'node_1', label: 'Cloud Armor WAF', tier: 'tier_ingress', type: 'security', product: 'cloud_armor', description: 'Edge WAF' },
      { id: 'node_2', label: 'Cloud Run Service', tier: 'tier_compute', type: 'compute', product: 'cloud_run', description: 'API Service' },
    ],
    edges: [
      { id: 'edge_1', source: 'node_1', target: 'node_2', label: 'HTTPS', style: 'solid' },
    ],
  };

  const res1 = validateGraphJson(validGraph);
  if (!res1.valid) {
    console.error(' ❌ Valid fixture failed validation:', res1.errors);
    passed = false;
  } else {
    console.log(' ✅ Valid fixture passed');
  }

  // 2. Invalid Fixture 1: Missing Title
  const invalid1 = { ...validGraph, title: '' };
  const resInvalid1 = validateGraphJson(invalid1);
  if (resInvalid1.valid) {
    console.error(' ❌ Invalid Fixture 1 (Missing Title) unexpectedly passed');
    passed = false;
  } else {
    console.log(' ✅ Invalid Fixture 1 (Missing Title) correctly rejected');
  }

  // 3. Invalid Fixture 2: Duplicate Node ID
  const invalid2 = {
    ...validGraph,
    nodes: [
      { id: 'node_1', label: 'Node 1', tier: 'tier_ingress', type: 'security', product: 'p1', description: 'd1' },
      { id: 'node_1', label: 'Node 2', tier: 'tier_compute', type: 'compute', product: 'p2', description: 'd2' },
    ],
  };
  const resInvalid2 = validateGraphJson(invalid2);
  if (resInvalid2.valid) {
    console.error(' ❌ Invalid Fixture 2 (Duplicate Node ID) unexpectedly passed');
    passed = false;
  } else {
    console.log(' ✅ Invalid Fixture 2 (Duplicate Node ID) correctly rejected');
  }

  // 4. Invalid Fixture 3: Edge Source Non-Existent
  const invalid3 = {
    ...validGraph,
    edges: [{ id: 'edge_1', source: 'non_existent_node', target: 'node_2', label: 'HTTPS', style: 'solid' }],
  };
  const resInvalid3 = validateGraphJson(invalid3);
  if (resInvalid3.valid) {
    console.error(' ❌ Invalid Fixture 3 (Dangling Source) unexpectedly passed');
    passed = false;
  } else {
    console.log(' ✅ Invalid Fixture 3 (Dangling Source) correctly rejected');
  }

  // 5. Invalid Fixture 4: Node Referencing Non-Existent Tier
  const invalid4 = {
    ...validGraph,
    nodes: [
      { id: 'node_1', label: 'Node 1', tier: 'non_existent_tier', type: 'compute', product: 'p1', description: 'd1' },
    ],
  };
  const resInvalid4 = validateGraphJson(invalid4);
  if (resInvalid4.valid) {
    console.error(' ❌ Invalid Fixture 4 (Non-Existent Tier) unexpectedly passed');
    passed = false;
  } else {
    console.log(' ✅ Invalid Fixture 4 (Non-Existent Tier) correctly rejected');
  }

  // 6. Invalid Fixture 5: Zero Tiers (<1 tier)
  const invalid5 = { ...validGraph, tiers: [] };
  const resInvalid5 = validateGraphJson(invalid5);
  if (resInvalid5.valid) {
    console.error(' ❌ Invalid Fixture 5 (Zero Tiers) unexpectedly passed');
    passed = false;
  } else {
    console.log(' ✅ Invalid Fixture 5 (Zero Tiers) correctly rejected');
  }

  // 7. Invalid Fixture 6: >60 Nodes
  const manyNodes = Array.from({ length: 65 }, (_, i) => ({
    id: `node_${i + 1}`,
    label: `Node ${i + 1}`,
    tier: 'tier_ingress',
    type: 'compute' as const,
    product: 'p',
    description: 'd',
  }));
  const invalid6 = { ...validGraph, nodes: manyNodes };
  const resInvalid6 = validateGraphJson(invalid6);
  if (resInvalid6.valid) {
    console.error(' ❌ Invalid Fixture 6 (>60 Nodes) unexpectedly passed');
    passed = false;
  } else {
    console.log(' ✅ Invalid Fixture 6 (>60 Nodes) correctly rejected');
  }

  return passed;
}
