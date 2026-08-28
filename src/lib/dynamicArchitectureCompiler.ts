/**
 * ⚡ Dynamic Architecture Compiler & Node Synthesizer
 * 
 * Compiles ANY prompt or use case into authentic, structured, zero-collision
 * architectural nodes, stages, and cards for Draw.io viewports.
 * 
 * Comprehensive Semantic Intent Hierarchy:
 * 1. Cloud Armor / WAF / DDoS / Security Perimeter ("add cloud armor", "enforce waf")
 * 2. Multi-Tier VPC Subnets & Networking ("add subnets", "private subnets", "psc")
 * 3. ADK 2.0 Agentic Tools & BeyondCorp Zero-Trust ("integrate adk", "tool calling")
 * 4. Vertex AI Vector Search / ScaNN / RAG Grounding ("vector search", "scann", "rag")
 * 5. GPU MIGs, Compute Engine Autoscaling & Slurm ("scale migs", "gpu compute", "h100")
 * 6. Cloud Spanner / Multi-Region DB / ACID ("spanner", "ha database", "sql")
 * 7. BigQuery Lakehouse & Analytics ("bigquery lakehouse", "real-time analytics")
 * 8. Real-Time Event Streaming / PubSub / Dataflow ("pubsub streaming", "dataflow")
 * 9. Standard Enterprise Agentic AI Platform (Default)
 */

import { renderGcpIconHtml, GcpIconDefinition } from './gcpIcons';

export interface CompiledStage {
  num: string;
  title: string;
  category: string;
  color: string;
}

export interface CompiledNode {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  icon: string;
  stage: number;
  highlight?: boolean;
}

export interface CompiledArchitecture {
  projectTitle: string;
  subtitle: string;
  summary: string;
  targetTier: string;
  changedComponents: string[];
  stages: CompiledStage[];
  nodes: {
    ingress: CompiledNode[];
    routing: CompiledNode[];
    workers: CompiledNode[];
    data: CompiledNode[];
    aiCore: CompiledNode;
    delivery: CompiledNode[];
  };
}

export function compileArchitectureFromPrompt(
  prompt: string,
  projectName?: string,
  useCaseName?: string,
  projectTitle?: string
): CompiledArchitecture {
  const p = (prompt || '').toLowerCase();
  const title = projectTitle || (projectName && useCaseName ? `${projectName}: ${useCaseName}` : 'Enterprise Google Cloud Platform Architecture');

  // =========================================================================
  // 1. SPECIFIC: Cloud Armor / WAF / DDoS / Edge Security ("add cloud armor")
  // =========================================================================
  if (p.includes('armor') || p.includes('waf') || p.includes('ddos') || (p.includes('security') && !p.includes('database')) || p.includes('firewall') || p.includes('perimeter')) {
    return {
      projectTitle: title.includes('Armor') || title.includes('Security') ? title : `${projectName || 'Google Cloud'}: Cloud Armor WAF & Edge Security Architecture`,
      subtitle: 'Edge Security Flow: Global Anycast IP → Cloud Armor Adaptive WAF → IAP Zero-Trust → Filtered Backend Compute',
      summary: 'Enforced Edge Security, Cloud Armor WAF & Identity-Aware Proxy',
      targetTier: 'Ingress & Security (Tier 1)',
      changedComponents: ['Cloud Armor DDoS/WAF Filtering', 'Cloud Armor Adaptive Protection (ML)', 'Identity-Aware Proxy (IAP)', 'Global External HTTP(S) Load Balancer'],
      stages: [
        { num: '1', title: 'Edge WAF & DDoS Defense', category: 'ingress', color: '#1A73E8' },
        { num: '2', title: 'Zero-Trust & Identity', category: 'orchestration', color: '#1A73E8' },
        { num: '3', title: 'Protected Backend Services', category: 'compute', color: '#1A73E8' },
        { num: '4', title: 'Secure Data & KMS', category: 'data', color: '#1A73E8' },
        { num: '5', title: 'Threat Intelligence Core', category: 'ai', color: '#1E8E3E' },
        { num: '6', title: 'Security Command Center', category: 'ops', color: '#1E8E3E' }
      ],
      nodes: {
        ingress: [
          { id: 'n_start_users', title: 'Global Web & API Traffic', subtitle: 'Public Internet, Botnets, Partner APIs', icon: 'user_ingress', stage: 1 },
          { id: 'n_edge_armor', title: 'Cloud Armor & WAF Rules', subtitle: 'OWASP Top 10 • Rate Limiting • Geo-IP', icon: 'cloud_armor', stage: 1, highlight: true },
          { id: 'n_edge_iap', title: 'Cloud Armor Adaptive ML', subtitle: 'Automatic Layer 7 Attack Detection', icon: 'cloud_armor', stage: 1, highlight: true },
          { id: 'n_cloud_dlp', title: 'Global External HTTP(S) LB', subtitle: 'Anycast Edge IP & SSL Offloading', icon: 'cloud_load_balancing', stage: 1, highlight: true }
        ],
        routing: [
          { id: 'n_fast_path', title: 'Fast-Path Static Cache', subtitle: 'Cloud CDN Signed URLs & Tokens', icon: 'cloud_cdn', stage: 2 },
          { id: 'gate_task_type', title: 'Context-Aware Access Gate', subtitle: 'Device State & IP Subnet Verification', icon: 'iap', stage: 2 },
          { id: 'n_supervisor', title: 'Identity-Aware Proxy (IAP)', subtitle: 'BeyondCorp Zero-Trust Auth (mTLS)', icon: 'iap', stage: 2, highlight: true },
          { id: 'n_memory', title: 'VPC Service Controls', subtitle: 'Perimeter Egress & Exfiltration Shield', icon: 'vpc_sc', stage: 2 }
        ],
        workers: [
          { id: 'n_rag_agent', title: 'Protected GKE Autopilot', subtitle: 'Private Cluster in Shielded VPC Subnet', icon: 'gke_autopilot', stage: 3 },
          { id: 'n_sql_agent', title: 'Cloud Run Private Microservices', subtitle: 'Internal Ingress Only via Serverless VPC', icon: 'cloud_run', stage: 3 },
          { id: 'n_tool_agent', title: 'Compute Engine Shielded VMs', subtitle: 'vTPM & Secure Boot Instances', icon: 'compute_engine', stage: 3 }
        ],
        data: [
          { id: 'n_vector_search', title: 'Cloud Storage (CMEK)', subtitle: 'Encrypted at Rest with Customer Keys', icon: 'cloud_storage', stage: 4 },
          { id: 'n_doc_ingestion', title: 'Cloud KMS HSM Key Ring', subtitle: 'FIPS 140-2 Level 3 Hardware Security', icon: 'cloud_iam', stage: 4, highlight: true },
          { id: 'n_bigquery_dw', title: 'BigQuery Security Analytics', subtitle: 'Audit Logs & WAF Telemetry Warehouse', icon: 'bigquery', stage: 4 },
          { id: 'n_spanner_db', title: 'Cloud Spanner IAM Store', subtitle: 'Zero-Downtime Policy DB', icon: 'spanner', stage: 4 },
          { id: 'n_hitl_governance_node', title: 'Sensitive Data Protection', subtitle: 'Real-Time DLP Payload Tokenization', icon: 'cloud_dlp', stage: 4 },
          { id: 'n_vertex_extensions', title: 'Chronicle SIEM Egress', subtitle: 'Real-Time Security Event Streaming', icon: 'agent_builder', stage: 4 }
        ],
        aiCore: { id: 'n_gemini_core', title: 'Gemini Security Copilot', subtitle: 'Automated Threat Triage & WAF Tuning', icon: 'gemini', stage: 5 },
        delivery: [
          { id: 'gate_factuality', title: 'Vertex Model Armor', subtitle: 'Prompt Injection & Jailbreak Filter', icon: 'model_armor', stage: 6 },
          { id: 'n_delivery', title: 'Sanitized & Encrypted Stream', subtitle: 'TLS 1.3 End-to-End Verified Delivery', icon: 'vertex_ai', stage: 6 },
          { id: 'n_audit_logging', title: 'Security Command Center (SCC)', subtitle: 'Continuous Vulnerability & Threat Feeds', icon: 'scc', stage: 6, highlight: true }
        ]
      }
    };
  }

  // =========================================================================
  // 2. SPECIFIC: Multi-Tier VPC Subnets & Networking ("add subnets")
  // =========================================================================
  if (p.includes('subnet') || p.includes('vpc') || p.includes('cidr') || p.includes('network') || p.includes('nat') || p.includes('psc') || p.includes('peering')) {
    return {
      projectTitle: title.includes('Subnet') || title.includes('VPC') ? title : `${projectName || 'Google Cloud'}: Multi-Tier VPC Subnet & Network Topology`,
      subtitle: 'Multi-Tier Subnet Topology: Public Ingress Subnet → Regional Compute Subnet B → Isolated Data Subnet C → PSC Egress',
      summary: 'Configured Multi-Tier VPC Subnets & Private Service Connect (PSC)',
      targetTier: 'VPC Networking & Subnets (Tier 2)',
      changedComponents: ['Regional Compute Subnet B (10.10.1.0/24)', 'Isolated Data Subnet C (10.10.2.0/24)', 'Private Service Connect (PSC)', 'Cloud NAT & Cloud Router Gateway'],
      stages: [
        { num: '1', title: 'Public Ingress Subnet', category: 'ingress', color: '#1A73E8' },
        { num: '2', title: 'Routing & NAT Gateway', category: 'orchestration', color: '#1A73E8' },
        { num: '3', title: 'Compute Subnet (Private)', category: 'compute', color: '#1A73E8' },
        { num: '4', title: 'Data Subnet (Isolated)', category: 'data', color: '#1A73E8' },
        { num: '5', title: 'AI Acceleration Subnet', category: 'ai', color: '#1E8E3E' },
        { num: '6', title: 'VPC Flow Logs & Telemetry', category: 'ops', color: '#1E8E3E' }
      ],
      nodes: {
        ingress: [
          { id: 'n_start_users', title: 'External Public Ingress', subtitle: 'Public Subnet A (10.10.0.0/24)', icon: 'user_ingress', stage: 1, highlight: true },
          { id: 'n_edge_armor', title: 'Cloud Armor Edge Protection', subtitle: 'External HTTPS Load Balancing', icon: 'cloud_armor', stage: 1 },
          { id: 'n_edge_iap', title: 'IAP TCP Forwarding', subtitle: 'Bastion-less SSH/RDP to Private IPs', icon: 'iap', stage: 1, highlight: true },
          { id: 'n_cloud_dlp', title: 'VPC Firewall Rules', subtitle: 'Stateful Ingress & Egress ACLs', icon: 'vpc_sc', stage: 1 }
        ],
        routing: [
          { id: 'n_fast_path', title: 'Regional Internal LB (ILB)', subtitle: 'Private Subnet B VIP (10.10.1.5)', icon: 'cloud_load_balancing', stage: 2, highlight: true },
          { id: 'gate_task_type', title: 'Cloud Router & BGP', subtitle: 'Dynamic Multi-Region Route Exchange', icon: 'agent_builder', stage: 2 },
          { id: 'n_supervisor', title: 'Cloud NAT Gateway', subtitle: 'Secure Outbound Internet without Public IPs', icon: 'compute_engine', stage: 2, highlight: true },
          { id: 'n_memory', title: 'Cloud DNS Private Zones', subtitle: 'Internal Split-Horizon Service Discovery', icon: 'memorystore', stage: 2 }
        ],
        workers: [
          { id: 'n_rag_agent', title: 'Compute Engine MIG Subnet B', subtitle: 'Private Pool (10.10.1.0/24, No Public IP)', icon: 'compute_engine', stage: 3, highlight: true },
          { id: 'n_sql_agent', title: 'GKE Private Cluster Nodes', subtitle: 'Private Master & Worker Subnet', icon: 'gke_autopilot', stage: 3, highlight: true },
          { id: 'n_tool_agent', title: 'Serverless VPC Connector', subtitle: 'Direct Cloud Run to Private Subnet Bridging', icon: 'cloud_run', stage: 3 }
        ],
        data: [
          { id: 'n_vector_search', title: 'Private Service Connect (PSC)', subtitle: 'Zero-Egress Private Endpoint to Vertex AI', icon: 'vertex_vector_search', stage: 4, highlight: true },
          { id: 'n_doc_ingestion', title: 'Cloud Storage Private VIP', subtitle: '[restricted.googleapis.com Routing]', icon: 'cloud_storage', stage: 4 },
          { id: 'n_bigquery_dw', title: 'BigQuery PSC Endpoint', subtitle: 'Direct Private Subnet Ingestion', icon: 'bigquery', stage: 4 },
          { id: 'n_spanner_db', title: 'Cloud Spanner Data Subnet C', subtitle: 'Isolated Tier (10.10.2.0/24)', icon: 'spanner', stage: 4, highlight: true },
          { id: 'n_hitl_governance_node', title: 'VPC Service Controls', subtitle: 'Perimeter Bridge & Egress Policy', icon: 'cloud_iam', stage: 4 },
          { id: 'n_vertex_extensions', title: 'Dedicated Interconnect', subtitle: '10Gbps On-Premises L3 WAN Peering', icon: 'agent_builder', stage: 4 }
        ],
        aiCore: { id: 'n_gemini_core', title: 'Gemini 3.1 via Private IP', subtitle: 'Private Google Access • Zero Public Transit', icon: 'gemini', stage: 5 },
        delivery: [
          { id: 'gate_factuality', title: 'Network Policy Enforcement', subtitle: 'Calico / Kubernetes Egress Filters', icon: 'model_armor', stage: 6 },
          { id: 'n_delivery', title: 'Private Internal API Gateway', subtitle: 'Mutual TLS across Private Subnets', icon: 'vertex_ai', stage: 6 },
          { id: 'n_audit_logging', title: 'VPC Flow Logs & Cloud Trace', subtitle: 'Sub-ms Packet Telemetry & Loss Metrics', icon: 'cloud_logging', stage: 6, highlight: true }
        ]
      }
    };
  }

  // =========================================================================
  // 3. SPECIFIC: ADK 2.0 / Agent Tools / BeyondCorp / Function Calling / MCP
  // =========================================================================
  if (p.includes('adk') || p.includes('agentic tool') || p.includes('beyondcorp') || p.includes('tool calling') || p.includes('function call') || (p.includes('tool') && p.includes('iap')) || (p.includes('tool') && p.includes('agent'))) {
    return {
      projectTitle: title.includes('ADK') || title.includes('BeyondCorp') || title.includes('Tool') ? title : `${projectName || 'Google Cloud'}: ADK 2.0 Agentic Tools & BeyondCorp Zero-Trust Platform`,
      subtitle: 'Agentic Tool Architecture: BeyondCorp Ingress → ADK 2.0 Tool Runtime → Privileged HITL Gate → Enterprise API Connectors',
      summary: 'Integrated ADK 2.0 Agentic Tools with BeyondCorp Zero-Trust & Identity-Aware Proxy (IAP)',
      targetTier: 'Agentic Tools & Zero-Trust Governance (Tier 4)',
      changedComponents: ['ADK 2.0 Agent Tool Runtime', 'BeyondCorp Context-Aware IAP', 'Privileged Action Approval Gate (HITL)', 'Enterprise Tool Registry (OpenAPI)'],
      stages: [
        { num: '1', title: 'Zero-Trust Ingress', category: 'ingress', color: '#1A73E8' },
        { num: '2', title: 'Intent & Policy Router', category: 'orchestration', color: '#1A73E8' },
        { num: '3', title: 'ADK 2.0 Agent Swarm', category: 'compute', color: '#1A73E8' },
        { num: '4', title: 'Tools & Privileged Gate', category: 'data', color: '#1A73E8' },
        { num: '5', title: 'Gemini Multi-Agent Core', category: 'ai', color: '#1E8E3E' },
        { num: '6', title: 'Audited Action Delivery', category: 'ops', color: '#1E8E3E' }
      ],
      nodes: {
        ingress: [
          { id: 'n_start_users', title: 'Enterprise Users & Copilots', subtitle: 'Workspace, Slack, REST Clients, CLI', icon: 'user_ingress', stage: 1 },
          { id: 'n_edge_armor', title: 'Cloud Armor & WAF Rules', subtitle: 'OWASP Defense • Rate Limits', icon: 'cloud_armor', stage: 1 },
          { id: 'n_edge_iap', title: 'BeyondCorp IAP Zero-Trust', subtitle: 'Context-Aware mTLS & Device Identity', icon: 'iap', stage: 1, highlight: true },
          { id: 'n_cloud_dlp', title: 'Sensitive Data Protection', subtitle: 'Real-Time DLP Payload Sanitization', icon: 'cloud_dlp', stage: 1 }
        ],
        routing: [
          { id: 'n_fast_path', title: 'Direct Read-Only Tool Cache', subtitle: 'Memorystore Fast-Path Tool Lookup', icon: 'memorystore', stage: 2 },
          { id: 'gate_task_type', title: 'Agent Policy & Scope Router', subtitle: 'Role-Based Tool Permissions (RBAC)', icon: 'agent_builder', stage: 2 },
          { id: 'n_supervisor', title: 'ADK 2.0 Supervisor Engine', subtitle: 'GKE Autopilot Multi-Agent Orchestrator', icon: 'gke_autopilot', stage: 2, highlight: true },
          { id: 'n_memory', title: 'Episodic & Tool State Store', subtitle: 'Cloud Memorystore & Spanner Session Sync', icon: 'memorystore', stage: 2 }
        ],
        workers: [
          { id: 'n_rag_agent', title: 'ADK Autonomous Tool Agent', subtitle: 'Dynamic Function Calling & OpenAPI Exec', icon: 'agent_builder', stage: 3, highlight: true },
          { id: 'n_sql_agent', title: 'Database & Analytics Agent', subtitle: 'Text-to-SQL & Multi-Cloud Connectors', icon: 'bigquery', stage: 3 },
          { id: 'n_tool_agent', title: 'External Integration Worker', subtitle: 'Secure Async Cloud Run Webhook Runner', icon: 'cloud_run', stage: 3 }
        ],
        data: [
          { id: 'n_vector_search', title: 'Enterprise Tool Registry', subtitle: 'OpenAPI 3.0 & MCP Dynamic Catalog', icon: 'agent_builder', stage: 4, highlight: true },
          { id: 'n_doc_ingestion', title: 'Cloud Storage Secret Vault', subtitle: '[CMEK Encrypted Service Credentials]', icon: 'cloud_storage', stage: 4 },
          { id: 'n_bigquery_dw', title: 'BigQuery Audit Warehouse', subtitle: 'Real-Time Tool Invocation Logs', icon: 'bigquery', stage: 4 },
          { id: 'n_spanner_db', title: 'Cloud Spanner Tool State', subtitle: 'ACID Distributed Idempotency Ledger', icon: 'spanner', stage: 4 },
          { id: 'n_hitl_governance_node', title: 'Privileged HITL Approval Gate', subtitle: 'Dual-Admin Escalation (High-Risk)', icon: 'cloud_iam', stage: 4, highlight: true },
          { id: 'n_vertex_extensions', title: 'Enterprise API Connectors', subtitle: 'Salesforce, SAP, Workday, ServiceNow', icon: 'agent_builder', stage: 4, highlight: true }
        ],
        aiCore: { id: 'n_gemini_core', title: 'Gemini 3.1 Pro Multi-Agent', subtitle: 'CoT Reasoning • Function Call Verification', icon: 'gemini', stage: 5, highlight: true },
        delivery: [
          { id: 'gate_factuality', title: 'Vertex Model Armor', subtitle: 'Prompt Injection & Tool Guardrails', icon: 'model_armor', stage: 6 },
          { id: 'n_delivery', title: 'Signed Secure Action Stream', subtitle: 'Cryptographically Verified Responses', icon: 'vertex_ai', stage: 6 },
          { id: 'n_audit_logging', title: 'Cloud Logging & Cloud Trace', subtitle: 'Immutable Audit Trail • SIEM Egress', icon: 'cloud_logging', stage: 6 }
        ]
      }
    };
  }

  // =========================================================================
  // 4. SPECIFIC: Vertex AI Vector Search / ScaNN / RAG Grounding / Embeddings
  // =========================================================================
  if (p.includes('vector') || p.includes('scann') || p.includes('rag') || p.includes('grounding') || p.includes('similarity') || p.includes('embedding') || p.includes('knowledge graph')) {
    return {
      projectTitle: title.includes('Vector') || title.includes('RAG') ? title : `${projectName || 'Vertex AI'}: Real-Time Vector Search & ScaNN RAG Grounding`,
      subtitle: 'Real-Time Retrieval Flow: Event Stream Ingestion → ScaNN Vector Indexing → Hybrid Similarity Search → Gemini 3.1 Grounded Reasoning',
      summary: 'Integrated Vertex AI Vector Search (ScaNN) for Real-Time Stream Grounding',
      targetTier: 'Agentic AI & Vector Search (Tier 4)',
      changedComponents: ['Vertex Vector Search (ScaNN Index)', 'Real-Time Embedding Pipeline', 'RAG Retrieval Grounding Engine', 'Gemini 3.1 Live Context Injection'],
      stages: [
        { num: '1', title: 'Stream Ingress & Security', category: 'ingress', color: '#1A73E8' },
        { num: '2', title: 'Stream Routing & Embeddings', category: 'orchestration', color: '#1A73E8' },
        { num: '3', title: 'Chunking & Workers', category: 'compute', color: '#1A73E8' },
        { num: '4', title: 'Vector & Knowledge Stores', category: 'data', color: '#1A73E8' },
        { num: '5', title: 'Gemini Grounded Reasoning', category: 'ai', color: '#1E8E3E' },
        { num: '6', title: 'Safety & Stream Delivery', category: 'ops', color: '#1E8E3E' }
      ],
      nodes: {
        ingress: [
          { id: 'n_start_users', title: 'Real-Time Event Producers', subtitle: 'Document Feeds, User Queries, CDC Events', icon: 'user_ingress', stage: 1 },
          { id: 'n_edge_armor', title: 'Cloud Armor & API Gateway', subtitle: 'DDoS Defense & mTLS Authentication', icon: 'cloud_armor', stage: 1 },
          { id: 'n_edge_iap', title: 'Identity-Aware Proxy', subtitle: 'Zero-Trust IAM Token Verification', icon: 'iap', stage: 1 },
          { id: 'n_cloud_dlp', title: 'Sensitive Data Protection', subtitle: 'Pre-Embedding PII Redaction & Masking', icon: 'cloud_dlp', stage: 1 }
        ],
        routing: [
          { id: 'n_fast_path', title: 'Cloud Pub/Sub Message Bus', subtitle: 'High-Throughput Vector Ingest (< 10ms)', icon: 'pubsub', stage: 2 },
          { id: 'gate_task_type', title: 'Query & Document Classifier', subtitle: 'Hybrid Dense + Sparse Router', icon: 'agent_builder', stage: 2 },
          { id: 'n_supervisor', title: 'Vertex Text-Embedding-005', subtitle: 'High-Dimensional Vector Encoder (768d)', icon: 'vertex_ai', stage: 2, highlight: true },
          { id: 'n_memory', title: 'Cloud Memorystore Vector Cache', subtitle: 'Sub-ms Embeddings Exact Match Cache', icon: 'memorystore', stage: 2 }
        ],
        workers: [
          { id: 'n_rag_agent', title: 'RAG Retrieval Grounding Engine', subtitle: 'MMR & Reciprocal Rank Fusion (RRF)', icon: 'vertex_vector_search', stage: 3, highlight: true },
          { id: 'n_sql_agent', title: 'Dataflow Stream Chunking Worker', subtitle: 'Apache Beam Semantic Window Chunker', icon: 'dataflow', stage: 3, highlight: true },
          { id: 'n_tool_agent', title: 'Document AI OCR Parser', subtitle: 'LayoutLM Multimodal PDF/Table Extraction', icon: 'document_ai', stage: 3 }
        ],
        data: [
          { id: 'n_vector_search', title: 'Vertex Vector Search (ScaNN)', subtitle: 'Sub-5ms Billion-Scale Index (Cosine/Dot)', icon: 'vertex_vector_search', stage: 4, highlight: true },
          { id: 'n_doc_ingestion', title: 'Cloud Storage (GCS) Knowledge Lake', subtitle: '[Hierarchical Chunk Repository]', icon: 'cloud_storage', stage: 4 },
          { id: 'n_bigquery_dw', title: 'BigQuery Vector Index (OLAP)', subtitle: 'Embedding Search & SQL Analytics', icon: 'bigquery', stage: 4 },
          { id: 'n_spanner_db', title: 'Cloud Spanner Knowledge Graph', subtitle: 'Entity-Relation Semantic Graph (GQL)', icon: 'spanner', stage: 4, highlight: true },
          { id: 'n_hitl_governance_node', title: 'IAM & CMEK Policy Guard', subtitle: 'Hardware HSM Key Encryption', icon: 'cloud_iam', stage: 4 },
          { id: 'n_vertex_extensions', title: 'Vertex AI Grounding Tools', subtitle: 'Google Search & Enterprise Datastores', icon: 'agent_builder', stage: 4 }
        ],
        aiCore: { id: 'n_gemini_core', title: 'Gemini 3.1 Pro & Grounding', subtitle: '2M Token Context • Citation Attribution', icon: 'gemini', stage: 5, highlight: true },
        delivery: [
          { id: 'gate_factuality', title: 'Vertex Model Armor', subtitle: 'Factuality & Grounding SLA Filter', icon: 'model_armor', stage: 6 },
          { id: 'n_delivery', title: 'Grounded Response Stream', subtitle: 'Verified Citations • Sub-Second TTFT', icon: 'vertex_ai', stage: 6 },
          { id: 'n_audit_logging', title: 'Cloud Logging & GenAI Eval', subtitle: 'Citation Precision • RAG Hallucination Metric', icon: 'cloud_logging', stage: 6 }
        ]
      }
    };
  }

  // =========================================================================
  // 5. SPECIFIC: GPU / Compute Engine MIG / Autoscaling
  // =========================================================================
  if (p.includes('mig') || p.includes('gpu') || p.includes('instance') || p.includes('gce') || p.includes('h100') || p.includes('a3') || p.includes('compute engine') || p.includes('internal lb')) {
    return {
      projectTitle: title,
      subtitle: 'High-Performance Cloud Compute: GPU-Accelerated MIG Autoscaling, Regional Internal LB & High-Throughput Storage',
      summary: 'Configured Auto-Scaling Compute Engine MIGs & Internal Load Balancer',
      targetTier: 'Compute & Accelerated Infrastructure (Tier 2)',
      changedComponents: ['Compute Engine GPU MIGs (Subnet B)', 'Regional Internal Load Balancer', 'Dynamic Capacity Autoscaler', 'Cloud Filestore High Scale'],
      stages: [
        { num: '1', title: 'Edge & Ingress', category: 'ingress', color: '#1A73E8' },
        { num: '2', title: 'Traffic & Scheduling', category: 'orchestration', color: '#1A73E8' },
        { num: '3', title: 'GPU Compute MIGs', category: 'compute', color: '#1A73E8' },
        { num: '4', title: 'Data & Storage Fabric', category: 'data', color: '#1A73E8' },
        { num: '5', title: 'AI Acceleration Core', category: 'ai', color: '#1E8E3E' },
        { num: '6', title: 'Monitoring & Scaling', category: 'ops', color: '#1E8E3E' }
      ],
      nodes: {
        ingress: [
          { id: 'n_start_users', title: 'Client & Enterprise Workloads', subtitle: 'HPC Jobs, Training Pipelines, API Requests', icon: 'user_ingress', stage: 1 },
          { id: 'n_edge_armor', title: 'Cloud Armor & External GCLB', subtitle: 'SSL Termination • DDoS Defense', icon: 'cloud_armor', stage: 1 },
          { id: 'n_edge_iap', title: 'Identity-Aware Proxy (IAP)', subtitle: 'Zero-Trust Bastion-less SSH & Access', icon: 'iap', stage: 1 },
          { id: 'n_cloud_dlp', title: 'VPC Service Controls', subtitle: 'Data Egress & Perimeter Guard', icon: 'vpc_sc', stage: 1 }
        ],
        routing: [
          { id: 'n_fast_path', title: 'Regional Internal LB (ILB)', subtitle: 'Ultra-Low Latency Layer 4 Passthrough', icon: 'cloud_load_balancing', stage: 2, highlight: true },
          { id: 'gate_task_type', title: 'Capacity & Quota Scheduler', subtitle: 'Dynamic Workload Dispatcher', icon: 'agent_builder', stage: 2 },
          { id: 'n_supervisor', title: 'Dynamic Capacity Autoscaler', subtitle: 'Compute Engine Auto-Scaler (0-100 Nodes)', icon: 'compute_engine', stage: 2, highlight: true },
          { id: 'n_memory', title: 'Cloud Memorystore Redis', subtitle: 'Cluster State & Distributed Locks', icon: 'memorystore', stage: 2 }
        ],
        workers: [
          { id: 'n_rag_agent', title: 'NVIDIA H100 / A3 Mega MIG', subtitle: 'High-Throughput GPU Compute Pool (Subnet B)', icon: 'compute_engine', stage: 3, highlight: true },
          { id: 'n_sql_agent', title: 'NVIDIA L4 / G2 Inference MIG', subtitle: 'Cost-Optimized Low-Latency Serving', icon: 'compute_engine', stage: 3, highlight: true },
          { id: 'n_tool_agent', title: 'Spot VM Preemptible Pool', subtitle: 'Batch Job Elastic Compute Queue', icon: 'compute_engine', stage: 3 }
        ],
        data: [
          { id: 'n_vector_search', title: 'Cloud Filestore High Scale', subtitle: 'Parallel Multi-TB/s Parallel NFS Storage', icon: 'cloud_storage', stage: 4, highlight: true },
          { id: 'n_doc_ingestion', title: 'Cloud Storage (GCS) Fast Tier', subtitle: '[Hierarchical Namespace Training Data]', icon: 'cloud_storage', stage: 4 },
          { id: 'n_bigquery_dw', title: 'BigQuery Telemetry DW', subtitle: 'GPU Utilization & Cost Analytics', icon: 'bigquery', stage: 4 },
          { id: 'n_spanner_db', title: 'Cloud Spanner Metadata', subtitle: 'Job Registry & Global Lock Matrix', icon: 'spanner', stage: 4 },
          { id: 'n_hitl_governance_node', title: 'Quota Guard & IAM', subtitle: 'GPU Quota Governor', icon: 'cloud_iam', stage: 4 },
          { id: 'n_vertex_extensions', title: 'Slurm / Ray Orchestrator', subtitle: 'Distributed Workload Coordinator', icon: 'agent_builder', stage: 4 }
        ],
        aiCore: { id: 'n_gemini_core', title: 'Gemini 3.1 Pro & TensorRT', subtitle: 'Distributed Multi-GPU Model Serving', icon: 'gemini', stage: 5 },
        delivery: [
          { id: 'gate_factuality', title: 'Vertex Model Armor', subtitle: 'Safety & SLA Guardrails', icon: 'model_armor', stage: 6 },
          { id: 'n_delivery', title: 'High-Speed Inference Stream', subtitle: 'gRPC / RDMA Low-Latency Socket', icon: 'cloud_cdn', stage: 6 },
          { id: 'n_audit_logging', title: 'Cloud Logging & Ops Agent', subtitle: 'GPU Telemetry • Metrics • Alerts', icon: 'cloud_logging', stage: 6 }
        ]
      }
    };
  }

  // =========================================================================
  // 6. SPECIFIC: Cloud Spanner / Multi-Region DB / Zero-Trust Mesh
  // =========================================================================
  if (p.includes('spanner') || p.includes('database') || p.includes('sql') || p.includes('microservice') || p.includes('truetime')) {
    return {
      projectTitle: title,
      subtitle: 'Zero-Trust Cloud Architecture: Identity Ingress → Microservices Mesh → Multi-Region Spanner & Analytics',
      summary: 'Provisioned High-Availability Database Layer & TrueTime Replication',
      targetTier: 'Application & Data (Tier 3)',
      changedComponents: ['Cloud Spanner Multi-Region OLTP', 'GKE Microservices Mesh', 'BigQuery Studio Lakehouse', 'Cloud Armor Zero-Trust'],
      stages: [
        { num: '1', title: 'Zero-Trust Ingress', category: 'ingress', color: '#1A73E8' },
        { num: '2', title: 'API Gateway & Auth', category: 'orchestration', color: '#1A73E8' },
        { num: '3', title: 'Microservices Mesh', category: 'compute', color: '#1A73E8' },
        { num: '4', title: 'Multi-Region Data', category: 'data', color: '#1A73E8' },
        { num: '5', title: 'Intelligence Core', category: 'ai', color: '#1E8E3E' },
        { num: '6', title: 'Governance & Ops', category: 'ops', color: '#1E8E3E' }
      ],
      nodes: {
        ingress: [
          { id: 'n_start_users', title: 'Authenticated Users & Apps', subtitle: 'B2B Partners, Mobile, Web Apps', icon: 'user_ingress', stage: 1 },
          { id: 'n_edge_armor', title: 'Cloud Armor & Cloud CDN', subtitle: 'WAF Rule Sets • Edge Caching', icon: 'cloud_armor', stage: 1 },
          { id: 'n_edge_iap', title: 'Identity-Aware Proxy (IAP)', subtitle: 'BeyondCorp Context-Aware Access', icon: 'iap', stage: 1 },
          { id: 'n_cloud_dlp', title: 'Sensitive Data Protection', subtitle: 'DLP Field Masking & Tokenization', icon: 'cloud_dlp', stage: 1 }
        ],
        routing: [
          { id: 'n_fast_path', title: 'Apigee API Management', subtitle: 'Rate Limits & Developer Portal', icon: 'agent_builder', stage: 2 },
          { id: 'gate_task_type', title: 'Envoy Ingress Gateway', subtitle: 'mTLS & Microservice Router', icon: 'agent_builder', stage: 2 },
          { id: 'n_supervisor', title: 'Istio Service Mesh Control', subtitle: 'Traffic Splitting & Circuit Breaking', icon: 'gke_autopilot', stage: 2 },
          { id: 'n_memory', title: 'Cloud Memorystore Redis', subtitle: 'Distributed Session & Token Cache', icon: 'memorystore', stage: 2 }
        ],
        workers: [
          { id: 'n_rag_agent', title: 'Accounts & Auth Service', subtitle: 'GKE Autopilot Private Cluster', icon: 'gke_autopilot', stage: 3 },
          { id: 'n_sql_agent', title: 'Transactional Orders Core', subtitle: 'High-Concurrency GKE Microservice', icon: 'gke_autopilot', stage: 3, highlight: true },
          { id: 'n_tool_agent', title: 'Event Processor Service', subtitle: 'Async Cloud Run Microservices', icon: 'cloud_run', stage: 3 }
        ],
        data: [
          { id: 'n_vector_search', title: 'Cloud Storage (GCS)', subtitle: 'CMEK Encrypted Blob Store', icon: 'cloud_storage', stage: 4 },
          { id: 'n_doc_ingestion', title: 'Datastream CDC Engine', subtitle: '[Real-Time Spanner -> BQ Sync]', icon: 'document_ai', stage: 4 },
          { id: 'n_bigquery_dw', title: 'BigQuery Analytical DW', subtitle: 'Real-Time OLAP Business Reporting', icon: 'bigquery', stage: 4 },
          { id: 'n_spanner_db', title: 'Cloud Spanner (Multi-Region)', subtitle: 'TrueTime 99.999% SLA ACID DB', icon: 'spanner', stage: 4, highlight: true },
          { id: 'n_hitl_governance_node', title: 'Cloud KMS Key Ring', subtitle: 'Hardware HSM Key Encryption', icon: 'cloud_iam', stage: 4 },
          { id: 'n_vertex_extensions', title: 'Third-Party Connectors', subtitle: 'ERP, Payment Rails, Banking APIs', icon: 'agent_builder', stage: 4 }
        ],
        aiCore: { id: 'n_gemini_core', title: 'Gemini 3.1 Intelligence', subtitle: 'Predictive Routing & Insights', icon: 'gemini', stage: 5 },
        delivery: [
          { id: 'gate_factuality', title: 'Compliance & Audit Gate', subtitle: 'PCI-DSS & SOC2 Enforcement', icon: 'model_armor', stage: 6 },
          { id: 'n_delivery', title: 'Zero-Trust Response Stream', subtitle: 'Grounded & Signed API Payloads', icon: 'cloud_cdn', stage: 6 },
          { id: 'n_audit_logging', title: 'Cloud Logging & Cloud Trace', subtitle: 'Distributed Distributed Spans', icon: 'cloud_logging', stage: 6 }
        ]
      }
    };
  }

  // =========================================================================
  // 7. GENERAL: Event Streaming / PubSub / Dataflow
  // =========================================================================
  if (p.includes('stream') || p.includes('event') || p.includes('pubsub') || p.includes('kafka') || p.includes('dataflow') || p.includes('cdc') || p.includes('queue')) {
    return {
      projectTitle: title,
      subtitle: 'High-Throughput Streaming Flow: Ingress → Real-Time Pub/Sub Bus → Dataflow Stream Processing → Spanner & BigQuery → Monitoring & Closed Loop',
      summary: 'Configured Low-Latency Pub/Sub Messaging & Event Orchestration',
      targetTier: 'Load Balancing & Event Stream (Tier 2)',
      changedComponents: ['Cloud Pub/Sub Message Bus', 'Cloud Dataflow Engine', 'GKE Stream Workers', 'BigQuery Continuous SQL'],
      stages: [
        { num: '1', title: 'Ingress & Security', category: 'ingress', color: '#1A73E8' },
        { num: '2', title: 'Event Ingestion & Bus', category: 'orchestration', color: '#1A73E8' },
        { num: '3', title: 'Stream Processing', category: 'compute', color: '#1A73E8' },
        { num: '4', title: 'Data & State Stores', category: 'data', color: '#1A73E8' },
        { num: '5', title: 'Stream Analytics & ML', category: 'ai', color: '#1E8E3E' },
        { num: '6', title: 'Delivery & Ops', category: 'ops', color: '#1E8E3E' }
      ],
      nodes: {
        ingress: [
          { id: 'n_start_users', title: 'IoT & Telemetry Producers', subtitle: 'Sensors, Mobile Clients, Change Data Streams', icon: 'user_ingress', stage: 1 },
          { id: 'n_edge_armor', title: 'Cloud Armor & API Gateway', subtitle: 'DDoS Protection & Rate Limiting', icon: 'cloud_armor', stage: 1 },
          { id: 'n_edge_iap', title: 'Identity-Aware Proxy', subtitle: 'Mutual TLS (mTLS) & Token Auth', icon: 'iap', stage: 1 },
          { id: 'n_cloud_dlp', title: 'Sensitive Data Protection', subtitle: 'Real-Time Stream PII Redaction', icon: 'cloud_dlp', stage: 1 }
        ],
        routing: [
          { id: 'n_fast_path', title: 'Cloud Pub/Sub Message Bus', subtitle: 'High-Throughput Partitioned Topics (< 10ms)', icon: 'pubsub', stage: 2, highlight: true },
          { id: 'gate_task_type', title: 'Event Router & Sharder', subtitle: 'Schema Validation & Route Keys', icon: 'agent_builder', stage: 2 },
          { id: 'n_supervisor', title: 'Cloud Dataflow Engine', subtitle: 'Apache Beam Exactly-Once Stream', icon: 'dataflow', stage: 2, highlight: true },
          { id: 'n_memory', title: 'Cloud Memorystore Redis', subtitle: 'Sub-ms Window State & Deduplication', icon: 'memorystore', stage: 2 }
        ],
        workers: [
          { id: 'n_rag_agent', title: 'GKE Stream Workers', subtitle: 'Autoscaling Consumer Pods (Subnet B)', icon: 'gke_autopilot', stage: 3, highlight: true },
          { id: 'n_sql_agent', title: 'Continuous SQL Engine', subtitle: 'BigQuery Real-Time Stream Windows', icon: 'bigquery', stage: 3, highlight: true },
          { id: 'n_tool_agent', title: 'Eventarc & Cloud Run', subtitle: 'Serverless Event Handlers & DLQ', icon: 'cloud_run', stage: 3 }
        ],
        data: [
          { id: 'n_vector_search', title: 'Vertex Vector Search', subtitle: 'Real-Time ScaNN Embeddings Index', icon: 'vertex_vector_search', stage: 4 },
          { id: 'n_doc_ingestion', title: 'Cloud Storage (GCS) Raw Lake', subtitle: '[Immutable Bronze/Silver Medallion]', icon: 'cloud_storage', stage: 4 },
          { id: 'n_bigquery_dw', title: 'BigQuery Lakehouse (OLAP)', subtitle: 'Real-Time Partitioned Streaming Tables', icon: 'bigquery', stage: 4 },
          { id: 'n_spanner_db', title: 'Cloud Spanner (OLTP)', subtitle: 'Global Multi-Region High-Write OLTP', icon: 'spanner', stage: 4 },
          { id: 'n_hitl_governance_node', title: 'Policy & IAM Guard', subtitle: 'Stream Egress Authorization', icon: 'cloud_iam', stage: 4 },
          { id: 'n_vertex_extensions', title: 'External Webhooks', subtitle: 'Kafka, SFTP, Webhooks, REST', icon: 'agent_builder', stage: 4 }
        ],
        aiCore: { id: 'n_gemini_core', title: 'Gemini 3.1 Live Inference', subtitle: 'Stream Analytics & Anomaly ML', icon: 'gemini', stage: 5 },
        delivery: [
          { id: 'gate_factuality', title: 'Vertex Model Armor', subtitle: 'Factuality & Grounding SLA Filter', icon: 'model_armor', stage: 6 },
          { id: 'n_delivery', title: 'Real-Time Stream to Consumers', subtitle: 'Low-Latency WebSocket & SSE Feed', icon: 'cloud_cdn', stage: 6 },
          { id: 'n_audit_logging', title: 'Cloud Logging & Eval', subtitle: 'Audit Trail • Token FinOps • Latency', icon: 'cloud_logging', stage: 6 }
        ]
      }
    };
  }

  // =========================================================================
  // 8. DEFAULT: Standard Enterprise Agentic AI Platform
  // =========================================================================
  return {
    projectTitle: title,
    subtitle: 'Production Reference Flow: Secure Ingress → Intent Fork → 3-Lane Parallel Execution → Gemini Reasoning → Closed Loop',
    summary: 'Integrated Vertex AI Agent Platform & Knowledge Graph Reasoning',
    targetTier: 'Agentic AI Services (Tier 4)',
    changedComponents: ['Gemini 3.1 Pro Core', 'Vertex Vector Search / ScaNN', 'GKE Task Graph Planner', 'Cloud Spanner Memory'],
    stages: [
      { num: '1', title: 'Ingress & Security', category: 'ingress', color: '#1A73E8' },
      { num: '2', title: 'Planning & Memory', category: 'orchestration', color: '#1A73E8' },
      { num: '3', title: 'Agent Swarm', category: 'compute', color: '#1A73E8' },
      { num: '4', title: 'Data & Tools', category: 'data', color: '#1A73E8' },
      { num: '5', title: 'Gemini Reasoning', category: 'ai', color: '#1E8E3E' },
      { num: '6', title: 'Safety & Delivery', category: 'ops', color: '#1E8E3E' }
    ],
    nodes: {
      ingress: [
        { id: 'n_start_users', title: 'User & System Ingress', subtitle: 'Web UI, Slack Copilot, REST, Events', icon: 'user_ingress', stage: 1 },
        { id: 'n_edge_armor', title: 'Cloud Armor & GCLB', subtitle: 'OWASP Top 10 • DDoS Mitigation', icon: 'cloud_armor', stage: 1 },
        { id: 'n_edge_iap', title: 'Identity-Aware Proxy', subtitle: 'BeyondCorp Zero-Trust & OAuth2', icon: 'iap', stage: 1 },
        { id: 'n_cloud_dlp', title: 'Sensitive Data Protection', subtitle: 'Cloud DLP PII Redaction & Masking', icon: 'cloud_dlp', stage: 1 }
      ],
      routing: [
        { id: 'n_fast_path', title: 'Gemini Flash Fast-Path', subtitle: 'Direct Low-Latency (< 100ms TTFT)', icon: 'gemini', stage: 2 },
        { id: 'gate_task_type', title: 'Task Graph Router', subtitle: 'Complexity & Intent Classifier', icon: 'agent_builder', stage: 2 },
        { id: 'n_supervisor', title: 'Supervisor Agent', subtitle: 'GKE Autopilot • Task Graph Planner', icon: 'gke_autopilot', stage: 2 },
        { id: 'n_memory', title: 'Episodic & Working Memory', subtitle: 'Cloud Memorystore (< 1ms) • Cloud Spanner', icon: 'memorystore', stage: 2 }
      ],
      workers: [
        { id: 'n_rag_agent', title: 'RAG Specialist', subtitle: 'Hybrid Semantic Retrieval', icon: 'vertex_vector_search', stage: 3 },
        { id: 'n_sql_agent', title: 'SQL & Data Agent', subtitle: 'Text-to-SQL & Multi-DB Router', icon: 'bigquery', stage: 3 },
        { id: 'n_tool_agent', title: 'Action & Tool Agent', subtitle: 'Vertex AI Tool Execution', icon: 'agent_builder', stage: 3 }
      ],
      data: [
        { id: 'n_vector_search', title: 'Vertex Vector Search', subtitle: 'ScaNN Semantic Index (< 5ms)', icon: 'vertex_vector_search', stage: 4 },
        { id: 'n_doc_ingestion', title: 'GCS & Document AI OCR', subtitle: '[Async Ingestion & Chunking]', icon: 'document_ai', stage: 4 },
        { id: 'n_bigquery_dw', title: 'BigQuery Studio (OLAP)', subtitle: 'Analytics Lakehouse & Text-to-SQL', icon: 'bigquery', stage: 4 },
        { id: 'n_spanner_db', title: 'Cloud Spanner (OLTP)', subtitle: 'TrueTime Globally Distributed DB', icon: 'spanner', stage: 4 },
        { id: 'n_hitl_governance_node', title: 'HITL Approval Gate', subtitle: 'Dual Admin Authorization', icon: 'cloud_iam', stage: 4 },
        { id: 'n_vertex_extensions', title: 'Vertex AI Extensions', subtitle: 'Google Workspace, Salesforce, SAP', icon: 'agent_builder', stage: 4 }
      ],
      aiCore: { id: 'n_gemini_core', title: 'Gemini 3.1 Pro / Flash', subtitle: 'Multimodal Reasoning & Synthesis', icon: 'gemini', stage: 5 },
      delivery: [
        { id: 'gate_factuality', title: 'Vertex Model Armor', subtitle: 'Factuality & Grounding SLA Filter', icon: 'model_armor', stage: 6 },
        { id: 'n_delivery', title: 'Grounded Stream to User', subtitle: 'Verified Citations • Sub-Second TTFT', icon: 'vertex_ai', stage: 6 },
        { id: 'n_audit_logging', title: 'Cloud Logging & Eval', subtitle: 'Audit Trail • Token FinOps • Latency', icon: 'cloud_logging', stage: 6 }
      ]
    }
  };
}
