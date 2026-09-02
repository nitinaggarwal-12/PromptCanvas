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

export function createDefaultFintechAst(): ArchitectureAst {
  return {
    metadata: {
      projectTitle: 'Global Real-Time Payments Mesh & Settlement Engine',
      projectId: 'gcp-pay-001',
      version: 'v1.1',
      domain: 'Financial Services & Banking',
      slaTarget: '99.999%',
      targetRpo: '< 5 Seconds',
      targetRto: '< 30 Seconds',
      primaryRegion: 'us-central1',
      drRegions: ['europe-west1'],
      compliance: ['PCI-DSS 4.0', 'SOC2 Type II', 'ISO 27001'],
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
        role: 'Core Payment Gateway',
        description: 'Containerized payment orchestration, ledger posting, and tokenization services with mTLS zero-trust.',
        sla: '99.95%',
        protocols: ['gRPC mTLS', 'REST']
      },
      {
        id: 'comp_vertex',
        name: 'Vertex AI & Gemini Core',
        service: 'Vertex AI',
        tier: 'compute',
        region: 'us-central1',
        role: 'Real-Time Fraud Scoring RAG',
        description: 'Sub-20ms fraud inference via ScaNN vector search and Gemini risk analysis.',
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
        description: 'Multi-region distributed ACID database handling synchronous payment balance ledgers.',
        sla: '99.999%',
        protocols: ['SQL DDL', 'gRPC']
      },
      {
        id: 'comp_bigquery',
        name: 'BigQuery Analytics & Ledger Lakehouse',
        service: 'BigQuery',
        tier: 'data',
        region: 'us-central1',
        role: 'Audit Lake',
        description: 'Immutable ledger audit streaming and long-term regulatory compliance analysis.',
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
        description: 'CMEK-encrypted transaction archives with WORM object lock compliance.',
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
        label: '3. Fraud Vector Scoring (<20ms)'
      },
      {
        id: 'conn_4',
        sourceId: 'comp_gke',
        targetId: 'comp_spanner_leader',
        protocol: 'gRPC ACID',
        flowType: 'sync_api',
        stepNumber: 4,
        label: '4. Commit Ledger Transaction'
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
