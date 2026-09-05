import puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';
import { computeElkLayout } from '../src/lib/layout/elk-layout';
import { renderGraphToDrawioXml } from '../src/lib/render/drawio-xml';
import { ArchitectureGraph } from '../src/lib/graph/schema';

const OUTPUT_DIR = path.resolve(process.cwd(), 'scratch/screenshots_golden_10');
const BRAIN_DIR = '/Users/nitinagga/.gemini/jetski/brain/8d379ad2-8382-4c17-976c-6502e40a06cb';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const templates: { name: string; filename: string; graph: ArchitectureGraph }[] = [
  {
    name: '1. Serverless Web App (GCP)',
    filename: 'golden_01_serverless_web_app_gcp.png',
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
    filename: 'golden_02_microservices_eks_cluster_aws.png',
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
    filename: 'golden_03_ai_rag_retrieval_system.png',
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
    filename: 'golden_04_data_lakehouse.png',
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
    filename: 'golden_05_realtime_streaming_analytics.png',
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
    filename: 'golden_06_event_driven_microservices.png',
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
    filename: 'golden_07_multiregion_disaster_recovery.png',
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
    filename: 'golden_08_secure_vpc_infrastructure.png',
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
    filename: 'golden_09_ai_core_pipeline.png',
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
    filename: 'golden_10_devops_cicd_pipeline.png',
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

async function renderDiagramToPng(
  page: any,
  viewerJs: string,
  xml: string,
  outputPath: string,
  brainPath?: string
) {
  const configObj = {
    highlight: '#0000ff',
    nav: false,
    resize: true,
    toolbar: null,
    edit: null,
    xml: xml
  };

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { margin: 0; padding: 24px; background: #0F172A; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
    .mxgraph { width: 1720px; height: 960px; background: #FFFFFF; border-radius: 12px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5); overflow: hidden; }
  </style>
</head>
<body>
  <div class="mxgraph" id="diagram-container"></div>
  <script>
    ${viewerJs}
  </script>
  <script>
    try {
      const el = document.getElementById('diagram-container');
      el.setAttribute('data-mxgraph', JSON.stringify(${JSON.stringify(configObj)}));
      if (window.GraphViewer && window.GraphViewer.processElements) {
        window.GraphViewer.processElements();
      }
    } catch(e) {
      console.error("Initialization error:", e);
    }
  </script>
</body>
</html>`;

  await page.setContent(html, { waitUntil: 'load' });
  await sleep(1800);

  // Assert SVG element was physically injected into the DOM
  const svgInfo = await page.evaluate(() => {
    const svg = document.querySelector('svg');
    if (!svg) return { exists: false, childCount: 0 };
    return {
      exists: true,
      childCount: svg.childNodes.length,
      width: svg.getAttribute('width'),
      height: svg.getAttribute('height')
    };
  });

  if (!svgInfo.exists || svgInfo.childCount === 0) {
    throw new Error(`SVG failed to render inside DOM for ${outputPath}`);
  }

  const container = await page.$('.mxgraph');
  if (container) {
    await container.screenshot({ path: outputPath });
  } else {
    await page.screenshot({ path: outputPath, fullPage: true });
  }

  const stat = fs.statSync(outputPath);
  console.log(` ✅ Rendered ${path.basename(outputPath)} (${Math.round(stat.size / 1024)} KB, SVG nodes: ${svgInfo.childCount})`);

  if (brainPath && fs.existsSync(BRAIN_DIR)) {
    fs.copyFileSync(outputPath, brainPath);
  }
}

async function main() {
  console.log('🚀 Rendering 10 Golden Pipeline Templates via ELK Layout Engine...');

  const viewerJsPath = path.join(process.cwd(), 'public/viewer-static.min.js');
  const viewerJs = fs.readFileSync(viewerJsPath, 'utf8');

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1180']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1180, deviceScaleFactor: 2 });

  for (const t of templates) {
    console.log(`\n▶ Processing [${t.name}]...`);
    const laidOut = await computeElkLayout(t.graph);
    const xml = renderGraphToDrawioXml(laidOut);

    const outPath = path.join(OUTPUT_DIR, t.filename);
    const brainPath = path.join(BRAIN_DIR, t.filename);
    await renderDiagramToPng(page, viewerJs, xml, outPath, brainPath);
  }

  await browser.close();
  console.log('\n🏆 All 10 Golden Pipeline Templates rendered successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
