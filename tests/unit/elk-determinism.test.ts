import { computeElkLayout } from '../../src/lib/layout/elk-layout';
import { ArchitectureGraph } from '../../src/lib/graph/schema';

export async function runElkDeterminismTests(): Promise<boolean> {
  console.log('\n🧪 Running ELK.js Layout Determinism Unit Tests...');

  const inputGraph: ArchitectureGraph = {
    title: 'Determinism Test Graph',
    cloud: 'gcp',
    tiers: [
      { id: 'tier_1', label: 'Ingress', order: 1 },
      { id: 'tier_2', label: 'Compute & Microservices', order: 2 },
      { id: 'tier_3', label: 'Data & Storage', order: 3 },
    ],
    nodes: [
      { id: 'node_1', label: 'Global External HTTP(S) Load Balancer', tier: 'tier_1', type: 'network', product: 'gcp_lb', description: 'Ingress' },
      { id: 'node_2', label: 'Apigee API Management Gateway', tier: 'tier_1', type: 'security', product: 'apigee', description: 'API Auth' },
      { id: 'node_3', label: 'Cloud Run: Order Microservice', tier: 'tier_2', type: 'compute', product: 'cloud_run', description: 'Orders' },
      { id: 'node_4', label: 'Cloud Run: Payment Service', tier: 'tier_2', type: 'compute', product: 'cloud_run', description: 'Payments' },
      { id: 'node_5', label: 'Cloud SQL PostgreSQL Instance', tier: 'tier_3', type: 'database', product: 'cloud_sql', description: 'Main DB' },
      { id: 'node_6', label: 'Memorystore Redis Cache', tier: 'tier_3', type: 'cache', product: 'redis', description: 'Session Cache' },
    ],
    edges: [
      { id: 'e1', source: 'node_1', target: 'node_2', label: 'HTTPS', style: 'solid' },
      { id: 'e2', source: 'node_2', target: 'node_3', label: 'gRPC', style: 'solid' },
      { id: 'e3', source: 'node_2', target: 'node_4', label: 'gRPC', style: 'solid' },
      { id: 'e4', source: 'node_3', target: 'node_5', label: 'JDBC', style: 'solid' },
      { id: 'e5', source: 'node_4', target: 'node_6', label: 'RESP', style: 'solid' },
    ],
  };

  const layoutRun1 = await computeElkLayout(inputGraph);
  const layoutRun2 = await computeElkLayout(inputGraph);

  const json1 = JSON.stringify(layoutRun1);
  const json2 = JSON.stringify(layoutRun2);

  if (json1 !== json2) {
    console.error(' ❌ ELK Layout is NOT deterministic: Run 1 and Run 2 produced different outputs');
    return false;
  }

  console.log(' ✅ ELK Layout is 100% deterministic (Run 1 === Run 2)');
  return true;
}
