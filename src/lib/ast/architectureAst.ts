// Unified Architecture Abstract Syntax Tree (AST) Data Model
// Bridges Draw.io XML visual geometry and Living Specifications

export interface AstComponent {
  id: string;
  name: string;
  service: string; // e.g. 'Cloud Spanner', 'GKE Autopilot', 'Vertex AI', 'Cloud Armor'
  tier: 'ingress' | 'compute' | 'data' | 'dr' | 'security' | 'observability';
  icon?: string;
  region: string; // 'global', 'us-central1', 'europe-west1', etc.
  role?: string; // 'Primary Leader', 'Witness Replica', 'WAF Filter', etc.
  description: string;
  sla?: string;
  protocols?: string[];
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

export interface AstConnection {
  id: string;
  sourceId: string;
  targetId: string;
  protocol: string; // 'HTTPS (TLS 1.3)', 'gRPC mTLS', 'Synchronous Fiber', 'Kafka/PubSub'
  flowType: 'sync_api' | 'async_stream' | 'rag_grounding' | 'replication' | 'governance';
  stepNumber?: number;
  label: string;
}

export interface AstMetadata {
  projectTitle: string;
  projectId: string;
  version: string;
  domain: string;
  slaTarget: string; // e.g. '99.999%'
  targetRpo: string; // e.g. '< 5 Seconds'
  targetRto: string; // e.g. '< 30 Seconds'
  primaryRegion: string;
  drRegions: string[];
  compliance: string[]; // ['PCI-DSS 4.0', 'SOC2 Type II', 'ISO 27001', 'HIPAA']
  latencyBudgetMs: number; // e.g. 50
  lastSyncTimestamp: string;
}

export interface ArchitectureAst {
  metadata: AstMetadata;
  components: AstComponent[];
  connections: AstConnection[];
}

export function inferServiceAndTierFromLabel(label: string): {
  service: string;
  tier: AstComponent['tier'];
  sla: string;
} {
  const lower = (label || '').toLowerCase();

  // AWS services
  if (lower.includes('eks') || lower.includes('elastic kubernetes')) {
    return { service: 'AWS Elastic Kubernetes Service (EKS)', tier: 'compute', sla: '99.95%' };
  }
  if (lower.includes('ecs') || lower.includes('fargate')) {
    return { service: 'AWS ECS / Fargate', tier: 'compute', sla: '99.99%' };
  }
  if (lower.includes('lambda')) {
    return { service: 'AWS Lambda Serverless', tier: 'compute', sla: '99.95%' };
  }
  if (lower.includes('aurora') || lower.includes('rds')) {
    return { service: 'Amazon Aurora / RDS', tier: 'data', sla: '99.99%' };
  }
  if (lower.includes('dynamodb')) {
    return { service: 'Amazon DynamoDB Global Tables', tier: 'data', sla: '99.999%' };
  }
  if (lower.includes('s3') || lower.includes('glacier')) {
    return { service: 'Amazon S3 Object Storage', tier: 'data', sla: '99.99%' };
  }
  if (lower.includes('cloudfront') || lower.includes('route 53') || lower.includes('route53') || lower.includes('alb')) {
    return { service: 'AWS CloudFront / ALB Edge', tier: 'ingress', sla: '99.99%' };
  }
  if (lower.includes('bedrock') || lower.includes('sagemaker')) {
    return { service: 'Amazon Bedrock / SageMaker', tier: 'compute', sla: '99.9%' };
  }
  if (lower.includes('kinesis') || lower.includes('msk') || lower.includes('sqs') || lower.includes('eventbridge')) {
    return { service: 'AWS Kinesis / EventBridge', tier: 'compute', sla: '99.99%' };
  }

  // Azure services
  if (lower.includes('aks') || lower.includes('azure kubernetes')) {
    return { service: 'Azure Kubernetes Service (AKS)', tier: 'compute', sla: '99.95%' };
  }
  if (lower.includes('cosmos') || lower.includes('cosmosdb')) {
    return { service: 'Azure Cosmos DB', tier: 'data', sla: '99.999%' };
  }
  if (lower.includes('entra') || lower.includes('active directory') || lower.includes('key vault')) {
    return { service: 'Microsoft Entra ID / Key Vault', tier: 'security', sla: '99.99%' };
  }
  if (lower.includes('front door') || lower.includes('application gateway')) {
    return { service: 'Azure Front Door / App Gateway', tier: 'ingress', sla: '99.99%' };
  }
  if (lower.includes('azure openai') || lower.includes('ai foundry')) {
    return { service: 'Azure AI Foundry / OpenAI', tier: 'compute', sla: '99.9%' };
  }

  // GCP & General Cloud / AI / Edge services
  if (lower.includes('armor') || lower.includes('waf') || lower.includes('ddos') || lower.includes('shield')) {
    return { service: 'Cloud Armor L7 WAF', tier: 'ingress', sla: '99.99%' };
  }
  if (lower.includes('apigee') || lower.includes('api gateway') || lower.includes('envoy') || lower.includes('kong')) {
    return { service: 'Apigee X / API Gateway', tier: 'ingress', sla: '99.99%' };
  }
  if (lower.includes('load balanc') || lower.includes('gclb') || lower.includes('anycast') || lower.includes('cdn') || lower.includes('dns')) {
    return { service: 'Global HTTPS Load Balancing', tier: 'ingress', sla: '99.99%' };
  }
  if (lower.includes('spanner')) {
    return { service: 'Cloud Spanner Multi-Region', tier: 'data', sla: '99.999%' };
  }
  if (lower.includes('alloydb') || lower.includes('cloud sql') || lower.includes('postgres')) {
    return { service: 'AlloyDB / Cloud SQL PostgreSQL', tier: 'data', sla: '99.99%' };
  }
  if (lower.includes('bigquery') || lower.includes('biglake') || lower.includes('lakehouse') || lower.includes('snowflake') || lower.includes('databricks')) {
    return { service: 'BigQuery Analytics Lakehouse', tier: 'data', sla: '99.99%' };
  }
  if (lower.includes('redis') || lower.includes('memorystore') || lower.includes('cache')) {
    return { service: 'Memorystore Redis 7.2', tier: 'data', sla: '99.9%' };
  }
  if (lower.includes('gcs') || lower.includes('cloud storage') || lower.includes('bucket') || lower.includes('worm')) {
    return { service: 'Dual-Region Cloud Storage', tier: 'data', sla: '99.99%' };
  }
  if (lower.includes('pubsub') || lower.includes('pub/sub') || lower.includes('kafka') || lower.includes('dataflow') || lower.includes('datastream') || lower.includes('stream')) {
    return { service: 'Cloud Pub/Sub & Dataflow', tier: 'compute', sla: '99.95%' };
  }
  if (lower.includes('gemini') || lower.includes('vertex') || lower.includes('llm') || lower.includes('agent') || lower.includes('rag') || lower.includes('scann') || lower.includes('vector') || lower.includes('vllm')) {
    return { service: 'Vertex AI (Gemini 3.1 Pro / 2.5 Flash)', tier: 'compute', sla: '99.9%' };
  }
  if (lower.includes('kms') || lower.includes('hsm') || lower.includes('vpc-sc') || lower.includes('iam') || lower.includes('oidc') || lower.includes('mtls') || lower.includes('secret') || lower.includes('chronicle') || lower.includes('scc')) {
    return { service: 'Cloud KMS HSM & Zero-Trust IAM', tier: 'security', sla: '99.99%' };
  }
  if (lower.includes('prometheus') || lower.includes('grafana') || lower.includes('otel') || lower.includes('telemetry') || lower.includes('monitoring') || lower.includes('logging') || lower.includes('trace')) {
    return { service: 'Cloud Monitoring & OpenTelemetry', tier: 'observability', sla: '99.95%' };
  }
  if (lower.includes('drone') || lower.includes('lidar') || lower.includes('edge') || lower.includes('client') || lower.includes('browser') || lower.includes('mobile') || lower.includes('iot') || lower.includes('sensor')) {
    return { service: 'Edge Telemetry & Client Ingress', tier: 'ingress', sla: '99.9%' };
  }
  if (lower.includes('cloud run') || lower.includes('serverless')) {
    return { service: 'Cloud Run Gen2 Serverless', tier: 'compute', sla: '99.95%' };
  }
  if (lower.includes('gke') || lower.includes('kubernetes') || lower.includes('autopilot') || lower.includes('mesh') || lower.includes('worker') || lower.includes('orchestrat') || lower.includes('service')) {
    return { service: 'GKE Autopilot Compute Mesh', tier: 'compute', sla: '99.95%' };
  }

  return { service: 'Cloud Managed Workload Tier', tier: 'compute', sla: '99.95%' };
}

export function createDefaultFintechAst(projectTitle?: string, domain?: string): ArchitectureAst {
  const effectiveTitle = projectTitle || 'Global Real-Time Payments Mesh & Settlement Engine';
  const lower = `${effectiveTitle} ${domain || ''}`.toLowerCase();
  const isFintech =
    !projectTitle ||
    lower.includes('payment') ||
    lower.includes('settlement') ||
    lower.includes('fintech') ||
    lower.includes('bank') ||
    lower.includes('ledger');

  const resolvedCompliance = lower.includes('hipaa') || lower.includes('clinical') || lower.includes('hospital') || lower.includes('patient')
    ? ['HIPAA', 'HITRUST CSF', 'SOC2 Type II']
    : isFintech
    ? ['PCI-DSS 4.0', 'SOC2 Type II', 'ISO 27001']
    : ['SOC2 Type II', 'ISO 27001', 'NIST 800-53'];

  return {
    metadata: {
      projectTitle: effectiveTitle,
      projectId: 'gcp-arch-001',
      version: 'v1.1',
      domain: domain || (isFintech ? 'Financial Services & Banking' : 'Enterprise Cloud & AI Architecture'),
      slaTarget: '99.999%',
      targetRpo: '< 5 Seconds',
      targetRto: '< 30 Seconds',
      primaryRegion: 'us-central1',
      drRegions: ['europe-west1'],
      compliance: resolvedCompliance,
      latencyBudgetMs: 50,
      lastSyncTimestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
    components: [
      // Ingress Tier
      {
        id: 'comp_armor',
        name: 'Cloud Armor WAF',
        service: 'Cloud Armor',
        tier: 'ingress',
        region: 'global',
        role: 'Edge Protection',
        description: 'DDoS mitigation, OWASP Top 10 rule enforcement, and rate-limiting.',
        sla: '99.99%',
        protocols: ['HTTPS', 'TLS 1.3']
      },
      {
        id: 'comp_glb',
        name: 'Global HTTPS Load Balancer',
        service: 'Cloud Load Balancing',
        tier: 'ingress',
        region: 'global',
        role: 'Anycast Ingress',
        description: 'Multi-region Anycast IP routing with hardware-accelerated SSL offload.',
        sla: '99.99%',
        protocols: ['HTTPS', 'HTTP/3', 'QUIC']
      },
      // Compute Tier
      {
        id: 'comp_gke',
        name: 'GKE Autopilot Microservices Mesh',
        service: 'Google Kubernetes Engine',
        tier: 'compute',
        region: 'us-central1',
        role: isFintech ? 'Core Payment Gateway' : 'Core Orchestration Mesh',
        description: 'Containerized domain orchestration, policy enforcement, and microservice routing with mTLS zero-trust.',
        sla: '99.95%',
        protocols: ['gRPC mTLS', 'REST']
      },
      {
        id: 'comp_vertex',
        name: 'Vertex AI & Gemini Core',
        service: 'Vertex AI',
        tier: 'compute',
        region: 'us-central1',
        role: isFintech ? 'Real-Time Fraud Scoring RAG' : 'Real-Time Grounded AI Reasoning',
        description: 'Sub-20ms grounded inference via ScaNN vector search and Gemini 3.1 Pro / 2.5 Flash reasoning.',
        sla: '99.9%',
        protocols: ['gRPC']
      },
      // Primary Data Tier
      {
        id: 'comp_spanner_leader',
        name: 'Cloud Spanner Primary Leader',
        service: 'Cloud Spanner',
        tier: 'data',
        region: 'us-central1',
        role: 'Leader Instance',
        description: 'Multi-region distributed ACID database handling synchronous state commits.',
        sla: '99.999%',
        protocols: ['SQL DDL', 'gRPC']
      },
      {
        id: 'comp_bigquery',
        name: 'BigQuery Analytics Lakehouse',
        service: 'BigQuery',
        tier: 'data',
        region: 'us-central1',
        role: 'Audit Lake',
        description: 'Immutable audit streaming and long-term regulatory compliance analysis.',
        sla: '99.99%',
        protocols: ['Storage Write API']
      },
      // DR Tier
      {
        id: 'comp_spanner_dr',
        name: 'Cloud Spanner DR Read-Replica',
        service: 'Cloud Spanner',
        tier: 'dr',
        region: 'europe-west1',
        role: 'Witness / Standby Leader',
        description: 'Synchronous read replica and witness node with automated 30-second regional failover.',
        sla: '99.999%',
        protocols: ['Dedicated Fiber Sync']
      },
      {
        id: 'comp_gcs_backup',
        name: 'Dual-Region Cloud Storage',
        service: 'Cloud Storage',
        tier: 'dr',
        region: 'europe-west1',
        role: 'Encrypted Snapshots',
        description: 'CMEK-encrypted state archives with WORM object lock compliance.',
        sla: '99.999999999% Durability',
        protocols: ['HTTPS']
      }
    ],
    connections: [
      {
        id: 'conn_1',
        sourceId: 'comp_armor',
        targetId: 'comp_glb',
        protocol: 'Internal Filter',
        flowType: 'sync_api',
        stepNumber: 1,
        label: '1. Inspect & Sanitize'
      },
      {
        id: 'conn_2',
        sourceId: 'comp_glb',
        targetId: 'comp_gke',
        protocol: 'HTTPS / TLS 1.3',
        flowType: 'sync_api',
        stepNumber: 2,
        label: '2. Anycast Route'
      },
      {
        id: 'conn_3',
        sourceId: 'comp_gke',
        targetId: 'comp_vertex',
        protocol: 'gRPC mTLS',
        flowType: 'rag_grounding',
        stepNumber: 3,
        label: '3. Vector Grounding (<20ms)'
      },
      {
        id: 'conn_4',
        sourceId: 'comp_gke',
        targetId: 'comp_spanner_leader',
        protocol: 'gRPC ACID',
        flowType: 'sync_api',
        stepNumber: 4,
        label: '4. Commit ACID State'
      },
      {
        id: 'conn_5',
        sourceId: 'comp_spanner_leader',
        targetId: 'comp_spanner_dr',
        protocol: 'Synchronous Fiber',
        flowType: 'replication',
        stepNumber: 5,
        label: '5. Cross-Region Replication (RPO < 5s)'
      },
      {
        id: 'conn_6',
        sourceId: 'comp_gke',
        targetId: 'comp_bigquery',
        protocol: 'Streaming API',
        flowType: 'async_stream',
        stepNumber: 6,
        label: '6. Stream Audit Event'
      }
    ]
  };
}

