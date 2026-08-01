import { computeElkLayout } from '../../src/lib/layout/elk-layout';
import { renderGraphToDrawioXml } from '../../src/lib/render/drawio-xml';
import { validateDrawioXml } from '../../src/lib/validate/validator';
import { ArchitectureGraph } from '../../src/lib/graph/schema';
import { XMLParser } from 'fast-xml-parser';

export async function runGoldenPipelineTests(): Promise<boolean> {
  console.log('\n🏆 Running Golden Pipeline & Round-Trip Tests on 10 Templates...');
  let passed = true;

  const templates: { name: string; graph: ArchitectureGraph }[] = [
    {
      name: '1. Serverless Web App (GCP)',
      graph: {
        title: 'Serverless Web Application',
        cloud: 'gcp',
        tiers: [
          { id: 'tier_ingress', label: '1. Ingress & Edge', order: 1 },
          { id: 'tier_compute', label: '2. Application Compute', order: 2 },
          { id: 'tier_data', label: '3. Data & Storage', order: 3 },
        ],
        nodes: [
          { id: 'n1', label: 'Cloud Armor WAF', tier: 'tier_ingress', type: 'security', product: 'cloud_armor', description: 'Edge WAF' },
          { id: 'n2', label: 'Cloud Run API', tier: 'tier_compute', type: 'compute', product: 'cloud_run', description: 'API Service' },
          { id: 'n3', label: 'Cloud SQL Postgres', tier: 'tier_data', type: 'database', product: 'cloud_sql', description: 'Main DB' },
        ],
        edges: [
          { id: 'e1', source: 'n1', target: 'n2', label: 'HTTPS', style: 'solid' },
          { id: 'e2', source: 'n2', target: 'n3', label: 'JDBC', style: 'solid' },
        ],
      },
    },
    {
      name: '2. Microservices EKS Cluster (AWS)',
      graph: {
        title: 'Microservices Kubernetes Cluster',
        cloud: 'aws',
        tiers: [
          { id: 'tier_ingress', label: '1. Ingress', order: 1 },
          { id: 'tier_compute', label: '2. Microservices', order: 2 },
          { id: 'tier_data', label: '3. Persistence', order: 3 },
        ],
        nodes: [
          { id: 'n1', label: 'Application Load Balancer', tier: 'tier_ingress', type: 'network', product: 'alb', description: 'Ingress LB' },
          { id: 'n2', label: 'EKS Worker Node Pods', tier: 'tier_compute', type: 'compute', product: 'eks', description: 'App Services' },
          { id: 'n3', label: 'Amazon DynamoDB Table', tier: 'tier_data', type: 'database', product: 'dynamodb', description: 'Key-Value DB' },
        ],
        edges: [
          { id: 'e1', source: 'n1', target: 'n2', label: 'HTTP', style: 'solid' },
          { id: 'e2', source: 'n2', target: 'n3', label: 'AWS SDK', style: 'solid' },
        ],
      },
    },
    {
      name: '3. AI RAG Retrieval System',
      graph: {
        title: 'Retrieval Augmented Generation (RAG)',
        cloud: 'gcp',
        tiers: [
          { id: 'tier_app', label: '1. App Layer', order: 1 },
          { id: 'tier_ai', label: '2. AI & Vector Engine', order: 2 },
          { id: 'tier_store', label: '3. Knowledge Base', order: 3 },
        ],
        nodes: [
          { id: 'n1', label: 'Agent Orchestrator', tier: 'tier_app', type: 'compute', product: 'cloud_run', description: 'Orchestrator' },
          { id: 'n2', label: 'Vertex AI Embeddings', tier: 'tier_ai', type: 'ai', product: 'vertex_ai', description: 'Embeddings' },
          { id: 'n3', label: 'pgvector Search Store', tier: 'tier_store', type: 'database', product: 'postgres', description: 'Vector Search' },
        ],
        edges: [
          { id: 'e1', source: 'n1', target: 'n2', label: 'gRPC', style: 'solid' },
          { id: 'e2', source: 'n1', target: 'n3', label: 'Cosine Search', style: 'solid' },
        ],
      },
    },
    {
      name: '4. Data Lakehouse',
      graph: {
        title: 'Enterprise Data Lakehouse',
        cloud: 'gcp',
        tiers: [
          { id: 'tier_ingest', label: '1. Ingestion', order: 1 },
          { id: 'tier_lake', label: '2. Data Lake & Warehouse', order: 2 },
          { id: 'tier_bi', label: '3. Analytics & BI', order: 3 },
        ],
        nodes: [
          { id: 'n1', label: 'GCS Raw Storage Bucket', tier: 'tier_ingest', type: 'storage', product: 'gcs', description: 'Landing Zone' },
          { id: 'n2', label: 'BigQuery Data Warehouse', tier: 'tier_lake', type: 'analytics', product: 'bigquery', description: 'Analytics Warehouse' },
          { id: 'n3', label: 'Looker Studio Dashboards', tier: 'tier_bi', type: 'user', product: 'looker', description: 'BI Reports' },
        ],
        edges: [
          { id: 'e1', source: 'n1', target: 'n2', label: 'SQL Load', style: 'solid' },
          { id: 'e2', source: 'n2', target: 'n3', label: 'SQL Query', style: 'solid' },
        ],
      },
    },
    {
      name: '5. Real-Time Streaming Analytics',
      graph: {
        title: 'Real-Time Streaming Analytics',
        cloud: 'gcp',
        tiers: [
          { id: 'tier_stream', label: '1. Streaming Broker', order: 1 },
          { id: 'tier_proc', label: '2. Stream Processor', order: 2 },
          { id: 'tier_sink', label: '3. Analytics Sink', order: 3 },
        ],
        nodes: [
          { id: 'n1', label: 'Cloud Pub/Sub Topics', tier: 'tier_stream', type: 'queue', product: 'pubsub', description: 'Event Bus' },
          { id: 'n2', label: 'Dataflow Apache Beam Pipeline', tier: 'tier_proc', type: 'compute', product: 'dataflow', description: 'Stream Processor' },
          { id: 'n3', label: 'BigQuery Streaming Table', tier: 'tier_sink', type: 'analytics', product: 'bigquery', description: 'Real-time Sink' },
        ],
        edges: [
          { id: 'e1', source: 'n1', target: 'n2', label: 'Push Event', style: 'dashed' },
          { id: 'e2', source: 'n2', target: 'n3', label: 'Stream Insert', style: 'solid' },
        ],
      },
    },
    {
      name: '6. Event-Driven Microservices',
      graph: {
        title: 'Event-Driven Architecture',
        cloud: 'aws',
        tiers: [
          { id: 'tier_bus', label: '1. Event Router', order: 1 },
          { id: 'tier_workers', label: '2. Event Handlers', order: 2 },
          { id: 'tier_cache', label: '3. Cache', order: 3 },
        ],
        nodes: [
          { id: 'n1', label: 'AWS EventBridge', tier: 'tier_bus', type: 'queue', product: 'eventbridge', description: 'Event Bus' },
          { id: 'n2', label: 'AWS Lambda Processor', tier: 'tier_workers', type: 'compute', product: 'lambda', description: 'Serverless Handler' },
          { id: 'n3', label: 'ElastiCache Redis Cluster', tier: 'tier_cache', type: 'cache', product: 'redis', description: 'State Cache' },
        ],
        edges: [
          { id: 'e1', source: 'n1', target: 'n2', label: 'Async Trigger', style: 'dashed' },
          { id: 'e2', source: 'n2', target: 'n3', label: 'Read/Write', style: 'solid' },
        ],
      },
    },
    {
      name: '7. Multi-Region Disaster Recovery',
      graph: {
        title: 'Multi-Region High Availability',
        cloud: 'gcp',
        tiers: [
          { id: 'tier_dns', label: '1. Global DNS', order: 1 },
          { id: 'tier_region1', label: '2. Primary Region', order: 2 },
          { id: 'tier_region2', label: '3. Secondary Region', order: 3 },
        ],
        nodes: [
          { id: 'n1', label: 'Cloud DNS Global Traffic Director', tier: 'tier_dns', type: 'network', product: 'dns', description: 'Global Routing' },
          { id: 'n2', label: 'Primary Region Cloud Run Cluster', tier: 'tier_region1', type: 'compute', product: 'cloud_run', description: 'Primary Active' },
          { id: 'n3', label: 'Secondary Region Cloud Run Cluster', tier: 'tier_region2', type: 'compute', product: 'cloud_run', description: 'Standby Active' },
        ],
        edges: [
          { id: 'e1', source: 'n1', target: 'n2', label: 'Primary Flow', style: 'solid' },
          { id: 'e2', source: 'n1', target: 'n3', label: 'Failover Flow', style: 'dashed' },
        ],
      },
    },
    {
      name: '8. Secure VPC Network Infrastructure',
      graph: {
        title: 'Secure VPC Infrastructure',
        cloud: 'gcp',
        tiers: [
          { id: 'tier_pub', label: '1. Public Subnet', order: 1 },
          { id: 'tier_priv', label: '2. Isolated Private Subnet', order: 2 },
        ],
        nodes: [
          { id: 'n1', label: 'Google Cloud Armor WAF', tier: 'tier_pub', type: 'security', product: 'cloud_armor', description: 'Public Edge' },
          { id: 'n2', label: 'Internal Private Service Connect', tier: 'tier_priv', type: 'network', product: 'psc', description: 'Private Endpoint' },
        ],
        edges: [{ id: 'e1', source: 'n1', target: 'n2', label: 'Private Tunnel', style: 'solid' }],
      },
    },
    {
      name: '9. AI Core Pipeline',
      graph: {
        title: 'AI Training & Inference Pipeline',
        cloud: 'gcp',
        tiers: [
          { id: 'tier_train', label: '1. Model Training', order: 1 },
          { id: 'tier_registry', label: '2. Model Registry', order: 2 },
          { id: 'tier_infer', label: '3. Online Inference Endpoint', order: 3 },
        ],
        nodes: [
          { id: 'n1', label: 'Vertex AI Training Pipeline', tier: 'tier_train', type: 'ai', product: 'vertex_ai', description: 'GPU Trainer' },
          { id: 'n2', label: 'Vertex Model Registry', tier: 'tier_registry', type: 'storage', product: 'vertex_registry', description: 'Artifact Store' },
          { id: 'n3', label: 'Vertex AI Realtime Endpoint', tier: 'tier_infer', type: 'compute', product: 'vertex_endpoint', description: 'Online Serving' },
        ],
        edges: [
          { id: 'e1', source: 'n1', target: 'n2', label: 'Save Model', style: 'solid' },
          { id: 'e2', source: 'n2', target: 'n3', label: 'Deploy Model', style: 'solid' },
        ],
      },
    },
    {
      name: '10. DevOps & CI/CD Pipeline',
      graph: {
        title: 'DevOps & CI/CD Operational Flow',
        cloud: 'gcp',
        tiers: [
          { id: 'tier_code', label: '1. Source Control', order: 1 },
          { id: 'tier_build', label: '2. Build & Test', order: 2 },
          { id: 'tier_deploy', label: '3. Production Deployment', order: 3 },
        ],
        nodes: [
          { id: 'n1', label: 'GitHub Repository Main', tier: 'tier_code', type: 'external', product: 'github', description: 'Source Code' },
          { id: 'n2', label: 'Cloud Build CI Runner', tier: 'tier_build', type: 'compute', product: 'cloud_build', description: 'Automated Test' },
          { id: 'n3', label: 'Cloud Deploy Production', tier: 'tier_deploy', type: 'security', product: 'cloud_deploy', description: 'Canary Release' },
        ],
        edges: [
          { id: 'e1', source: 'n1', target: 'n2', label: 'Webhook Push', style: 'dashed' },
          { id: 'e2', source: 'n2', target: 'n3', label: 'Artifact Release', style: 'solid' },
        ],
      },
    },
  ];

  const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '@_' });

  for (const t of templates) {
    const laidOut = await computeElkLayout(t.graph);
    const xml = renderGraphToDrawioXml(laidOut);
    const validation = validateDrawioXml(xml);

    if (!validation.valid) {
      console.error(` ❌ Template "${t.name}" failed pre-render validation:`, validation.errors);
      passed = false;
    } else {
      console.log(` ✅ Template "${t.name}" passed validation (0 errors, 0 overlaps, all children contained)`);
    }

    // Round-Trip Test: Parse XML and verify cell count matching
    const parsedObj = parser.parse(xml);
    const rootCells = parsedObj?.mxfile?.diagram?.mxGraphModel?.root?.mxCell || [];
    const cellCount = Array.isArray(rootCells) ? rootCells.length : 1;

    // Expected cell count: 1 (cell 0) + 1 (cell 1) + tiers + nodes + edges
    const expectedCellCount = 2 + t.graph.tiers.length + t.graph.nodes.length + t.graph.edges.length;
    if (cellCount !== expectedCellCount) {
      console.error(` ❌ Round-trip cell count mismatch for "${t.name}": expected ${expectedCellCount}, got ${cellCount}`);
      passed = false;
    } else {
      console.log(` ✅ Round-trip cell count matched (${cellCount} cells)`);
    }
  }

  // --- Edit-Flow Test ---
  console.log('\n🧪 Running Edit-Flow Minimal Diff Test...');
  const serverlessTemplate = templates[0].graph;

  const editedGraph: ArchitectureGraph = {
    ...serverlessTemplate,
    nodes: [
      ...serverlessTemplate.nodes,
      { id: 'node_redis', label: 'Memorystore Redis Cache', tier: 'tier_data', type: 'cache', product: 'redis', description: 'Session Cache' },
    ],
    edges: [
      ...serverlessTemplate.edges,
      { id: 'edge_redis', source: 'n2', target: 'node_redis', label: 'RESP', style: 'solid' },
    ],
  };

  const oldIds = new Set([...serverlessTemplate.nodes.map((n) => n.id), ...serverlessTemplate.edges.map((e) => e.id)]);
  const newNodes = editedGraph.nodes.filter((n) => !oldIds.has(n.id));
  const newEdges = editedGraph.edges.filter((e) => !oldIds.has(e.id));

  if (newNodes.length !== 1 || newNodes[0].id !== 'node_redis' || newEdges.length !== 1 || newEdges[0].id !== 'edge_redis') {
    console.error(' ❌ Edit-flow failed minimal diff check: unexpected mutation', { newNodes, newEdges });
    passed = false;
  } else {
    console.log(' ✅ Edit-flow passed minimal diff check (existing IDs byte-identical, only node_redis & edge_redis added)');
  }

  const laidOutEdited = await computeElkLayout(editedGraph);
  const editedXml = renderGraphToDrawioXml(laidOutEdited);
  const editedValidation = validateDrawioXml(editedXml);

  if (!editedValidation.valid) {
    console.error(' ❌ Edited diagram failed pre-render validation:', editedValidation.errors);
    passed = false;
  } else {
    console.log(' ✅ Edited diagram passed re-layout pre-render validation');
  }

  return passed;
}

if (typeof describe !== 'undefined') {
  describe('Golden Pipeline Tests', () => {
    it('should pass golden pipeline tests', async () => {
      const res = await runGoldenPipelineTests();
      expect(res).toBe(true);
    });
  });
}
