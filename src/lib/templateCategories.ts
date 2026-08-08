export interface TemplateCategory {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  description: string;
  color: string;
  accentColor: string;
}

export interface TemplateCatalogItem {
  id: string;
  name: string;
  categoryId: string;
  categoryName: string;
  badge?: string;
  isFlagship?: boolean;
  isNew?: boolean;
  whenToUse: string;
  bestFor: string[];
  keyTech: string[];
  thumbnail: string;
  promptSummary: string;
}

export const TEMPLATE_CATEGORIES: TemplateCategory[] = [
  {
    id: "ai_agentic",
    name: "AI & Agentic Systems Architecture",
    shortName: "AI & Agents",
    icon: "Bot",
    description: "Multi-agent orchestration engines, sandboxed execution kernels, cognitive RAG, and human-in-the-loop governance lifecycles.",
    color: "from-sky-500/20 to-indigo-500/20",
    accentColor: "border-sky-400 text-sky-400"
  },
  {
    id: "cloud_infra",
    name: "Cloud & Zero-Trust Infrastructure",
    shortName: "Cloud & Infra",
    icon: "Cloud",
    description: "Production VPC topologies, Kubernetes microservice clusters, serverless platforms, multi-region disaster recovery, and edge WAF.",
    color: "from-emerald-500/20 to-teal-500/20",
    accentColor: "border-emerald-400 text-emerald-400"
  },
  {
    id: "data_pipelines",
    name: "Modern Data & Analytics Pipelines",
    shortName: "Data Pipelines",
    icon: "Database",
    description: "CDC data streams, dbt data contracts, Lakehouse architectures, real-time IoT/Edge telemetry, and dimensional ERD data models.",
    color: "from-purple-500/20 to-pink-500/20",
    accentColor: "border-purple-400 text-purple-400"
  },
  {
    id: "microservices_flow",
    name: "Microservices & Application Flow",
    shortName: "Microservices",
    icon: "Cpu",
    description: "Decoupled event-driven Kafka meshes, C4 System Context models, and micro API lifeline sequence execution diagrams.",
    color: "from-amber-500/20 to-orange-500/20",
    accentColor: "border-amber-400 text-amber-400"
  },
  {
    id: "devsecops",
    name: "DevSecOps & Platform Engineering",
    shortName: "DevSecOps",
    icon: "GitBranch",
    description: "Polyrepo Git source control, SAST security quality gates, multi-track CI/CD builds, and GitOps ArgoCD promotion.",
    color: "from-rose-500/20 to-red-500/20",
    accentColor: "border-rose-400 text-rose-400"
  },
  {
    id: "business_strategy",
    name: "Enterprise Business & Strategy",
    shortName: "Business Strategy",
    icon: "Building2",
    description: "High-level 3-stage business ingestion-to-outcome blueprints, unified enterprise lifecycle maps, and board-level strategy views.",
    color: "from-blue-500/20 to-cyan-500/20",
    accentColor: "border-blue-400 text-blue-400"
  }
];

export const TEMPLATE_CATALOG_ITEMS: TemplateCatalogItem[] = [
  // =========================================================================
  // 1. AI & AGENTIC SYSTEMS ARCHITECTURE
  // =========================================================================
  {
    id: "tech_agent_harness_runtime",
    name: "Enterprise Agent Runtime Platform",
    categoryId: "ai_agentic",
    categoryName: "AI & Agentic Systems",
    badge: "Production Blueprint",
    isFlagship: true,
    isNew: true,
    whenToUse: "Use when deploying production AI agents that require isolated code execution (gVisor/E2B), prompt caching, zero-trust IAM, OTel tracing, and self-healing reflection loops.",
    bestFor: [
      "Enterprise autonomous agent runtimes",
      "Sandboxed Python/Bash execution security",
      "Prefix token caching (slashes cost by 90%)",
      "SOC2, HIPAA & EU AI Act compliance ledgers"
    ],
    keyTech: ["LiteLLM", "MCP Protocol", "gVisor / E2B", "Temporal", "Redis KV Cache", "PostgreSQL", "NeMo Guardrails"],
    thumbnail: "/templates/agent_harness_runtime_enhanced.png",
    promptSummary: "Production Agent Harness: Ingress -> 3x4 Middleware Matrix -> Sandboxed Kernel Directed Graph -> External Egress."
  },
  {
    id: "tech_multi_agent_langgraph",
    name: "LangGraph Stateful Multi-Agent DAG",
    categoryId: "ai_agentic",
    categoryName: "AI & Agentic Systems",
    badge: "Flagship Blueprint",
    isFlagship: true,
    whenToUse: "Use for multi-agent systems with hierarchical delegation, parallel specialized worker clusters (Coder, Researcher, Critic), and stateful checkpoint persistence.",
    bestFor: [
      "Supervisor-Worker multi-agent patterns",
      "LangGraph / GraphFlow DAG state management",
      "Human-in-the-loop interrupt gates (requires_action)",
      "Long-context multimodal WebRTC ingress"
    ],
    keyTech: ["LangGraph", "pgvector", "Claude 3.5 Sonnet", "GPT-4o", "Supervisor Agent", "OTel Traces"],
    thumbnail: "/templates/tech_multi_agent_langgraph.png",
    promptSummary: "Stateful DAG Multi-Agent Platform: Ingress -> Supervisor Router -> Specialized Worker Swarm -> Sandboxed Kernel -> Checkpoint Store."
  },
  {
    id: "agentic_rag",
    name: "Cognitive Architecture / Agentic RAG",
    categoryId: "ai_agentic",
    categoryName: "AI & Agentic Systems",
    badge: "Reference Architecture",
    whenToUse: "Use when designing enterprise RAG systems with dynamic query planning, semantic vector search, document chunking pipelines, and LLM reasoning engines.",
    bestFor: [
      "Knowledge retrieval & document Q&A",
      "Vector embedding pipelines (Pinecone/pgvector)",
      "Hybrid dense/sparse search & re-ranking",
      "Dynamic tool invocation guardrails"
    ],
    keyTech: ["Gemini 2.5 Pro", "pgvector", "Pinecone", "RAG Pipeline", "Vector Embeddings", "Re-ranking Engine"],
    thumbnail: "/templates/agentic_rag.png",
    promptSummary: "Cognitive RAG Architecture: Document Chunking -> Embeddings DB -> Hybrid Retrieval -> LLM Synthesis -> Guardrails."
  },
  {
    id: "tech_rag_gcp",
    name: "Enterprise Vertex AI Vector Search",
    categoryId: "ai_agentic",
    categoryName: "AI & Agentic Systems",
    badge: "Cloud Reference",
    whenToUse: "Use when implementing enterprise-scale vector search and RAG natively on Google Cloud Platform with Vertex AI, Cloud Storage, and VPC-SC perimeters.",
    bestFor: [
      "Vertex AI Vector Search (ScaNN index)",
      "BigQuery & Cloud Storage automated embeddings",
      "Air-gapped VPC Service Controls security",
      "Gemini 2.5 Pro enterprise inference endpoints"
    ],
    keyTech: ["Vertex AI Vector Search", "Text Embeddings API", "BigQuery", "Cloud Storage", "GKE / Cloud Run", "VPC-SC"],
    thumbnail: "/templates/tech_rag_gcp.png",
    promptSummary: "GCP Vertex AI RAG Infrastructure: BigQuery Ingestion -> Text Embeddings API -> Vertex Vector Search -> GKE -> Gemini Pro."
  },
  {
    id: "business_agent_gov_hitl",
    name: "Human-in-the-Loop AI Governance",
    categoryId: "ai_agentic",
    categoryName: "AI & Agentic Systems",
    badge: "Governance Standard",
    isFlagship: true,
    whenToUse: "Use when establishing enterprise AI risk management, confidence-based escalation thresholds (>=95% fast path, 75-94% supervisor check, <75% human approval), and regulatory sign-off.",
    bestFor: [
      "Regulated enterprise AI compliance",
      "Confidence-tiered decision escalation",
      "Human reviewer review workbench",
      "Cryptographic sign-off certificates"
    ],
    keyTech: ["HITL Reviewer UI", "Confidence Router", "Constitutional AI", "Immutable Audit Trail", "RLHF Loop"],
    thumbnail: "/templates/business_agent_governance_hitl.png",
    promptSummary: "Agent Governance Lifecycle: Multimodal Ingress -> Confidence Escalation -> HITL Review Workbench -> Regulatory Ledger."
  },

  // =========================================================================
  // 2. CLOUD & ZERO-TRUST INFRASTRUCTURE
  // =========================================================================
  {
    id: "tech_microservices_gcp",
    name: "GCP Kubernetes & Zero-Trust VPC",
    categoryId: "cloud_infra",
    categoryName: "Cloud & Infrastructure",
    badge: "2D Network Topology",
    whenToUse: "Use when architecting enterprise production GKE Kubernetes across Multi-Zone private subnets with Cloud Armor WAF, Istio mTLS, and Private Service Connect.",
    bestFor: [
      "Multi-Zone GKE Autopilot Kubernetes clusters",
      "Zero-Trust VPC network segmentation",
      "Istio Service Mesh with mutual TLS (mTLS)",
      "Private Service Connect (PSC) Endpoints for BigQuery & Cloud Storage"
    ],
    keyTech: ["Google GKE", "Cloud Armor WAF", "Istio mTLS", "Cloud SQL HA", "Cloud DNS", "Cloud Monitoring"],
    thumbnail: "/templates/tech_microservices_aws.png",
    promptSummary: "GCP Kubernetes Zero-Trust VPC: Cloud DNS -> Cloud Armor WAF -> Multi-Zone Private Subnets -> Istio Mesh -> Cloud SQL HA."
  },
  {
    id: "tech_serverless_gcp",
    name: "Serverless Web Application - GCP",
    categoryId: "cloud_infra",
    categoryName: "Cloud & Infrastructure",
    badge: "Cloud Reference",
    whenToUse: "Use for high-traffic serverless web applications on Google Cloud using Cloud Run, Cloud Armor WAF, Serverless VPC Connectors, and Cloud SQL HA.",
    bestFor: [
      "Serverless container microservices",
      "Cloud Armor WAF (SQLi/XSS & Rate Limiting)",
      "Private Google Access & Serverless VPC connectors",
      "Cloud SQL High-Availability PostgreSQL"
    ],
    keyTech: ["Google Cloud Run", "Cloud Armor WAF", "Cloud CDN", "Serverless VPC Access", "Cloud SQL HA", "Cloud Storage"],
    thumbnail: "/templates/tech_serverless_gcp.png",
    promptSummary: "GCP Serverless Architecture: Cloud DNS -> Cloud Armor WAF -> Cloud Run UI/API -> VPC Connector -> Cloud SQL HA."
  },
  {
    id: "tech_multi_region_dr",
    name: "Master Multi-Region Active-Passive DR (Case B)",
    categoryId: "cloud_infra",
    categoryName: "Cloud & Infrastructure",
    badge: "Master Certified SRE Template",
    whenToUse: "Use when designing enterprise-grade multi-region active-passive disaster recovery (Pilot Light Case B) with Zero-Trust VPC-SC perimeters, Private Service Connect, 1:1 Terraform IaC parity, and comprehensive FMEA failure mode analysis.",
    bestFor: [
      "Google Cloud Well-Architected Certified (6 Pillars Assessment)",
      "Zero-Trust Perimeter (VPC-SC, PSC 10.10.1.5, KMS CMEK Dual Key Rings, Secret Manager)",
      "Global L7 HTTPS Load Balancer + Cloud Armor WAF with Zero-DNS-Lag Failover",
      "Cloud Run Microservices A-D with Direct VPC Access (10.8.0.0/28) & 10% Warm Pilot Light",
      "Cloud SQL HA (us-east1-b/c) with Cross-Region Async WAL Streaming (<5min RPO)",
      "Memorystore for Redis (HA & Standby) with Graceful Circuit Breaker Fallback",
      "Dual-Region GCS Object Storage (Turbo Replication) & Secondary Storage Mirror",
      "Page 2 Executive SRE Playbook, 1:1 Terraform State Sync & FMEA Governance Matrix"
    ],
    keyTech: ["Global HTTPS LB", "Cloud Armor WAF", "Cloud Run Gen2", "Memorystore Redis HA", "Cloud SQL HA & Cross-Region Replica", "Dual-Region GCS", "Cloud KMS CMEK", "VPC-SC & PSC", "Terraform IaC"],
    thumbnail: "/templates/tech_multi_region_dr.png",
    promptSummary: "Master Multi-Region Active-Passive DR: Global L7 LB -> Zero-Trust Active Region A (US-East1) & Pilot Light Region B (US-West1) -> Redis Cache -> Cross-Region Async DB Replication -> 6-Step SRE Failover Runbook & FMEA Matrix."
  },
  {
    id: "legacy_dependency_map",
    name: "Legacy Data & System Dependency Map (Strangler Fig)",
    categoryId: "cloud_infra",
    categoryName: "Cloud & Infrastructure",
    badge: "Master Blueprint (WBS 0.1.1 / 0.2.1)",
    isFlagship: true,
    isNew: true,
    whenToUse: "Use for enterprise legacy discovery, data gravity assessment, technical debt cataloging, and orchestrating progressive Strangler Fig zero-downtime migrations from on-prem monoliths into Google Cloud Platform.",
    bestFor: [
      "WBS 0.1.1 Legacy Assessment & As-Is System Discovery",
      "WBS 0.2.1 Migration Strangler Fig Transition Architecture",
      "On-Premises Datacenter mapping (SAP ECC R/3, Mainframe z/OS, Oracle 11g, IBM DB2)",
      "Technical Debt & Data Gravity Anchor identification",
      "Reverse proxy traffic interception & selective microservice routing",
      "Informatica PowerCenter ETL grid ingestion into GCP Target Data Platform (Cloud Run, Cloud SQL, BigQuery, Bigtable)"
    ],
    keyTech: ["Oracle 11g", "SAP ECC R/3", "Mainframe z/OS", "IBM DB2", "Informatica PowerCenter", "Google Cloud Run", "Cloud SQL", "BigQuery", "Bigtable", "Eventarc", "Cloud Workflows", "StratoZone"],
    thumbnail: "/templates/legacy_dependency_map.png",
    promptSummary: "Legacy Data & Dependency Map: As-Is On-Prem Datacenter (ERP Monolith, Mainframe, Oracle/DB2) -> Strangler Reverse Proxy -> Microservice Decoupling -> Informatica ETL Grid -> Optimized GCP To-Be Target Tier."
  },
  {
    id: "six_rs_migration_matrix",
    name: "6Rs Migration Disposition Matrix (Assessment Phase)",
    categoryId: "cloud_infra",
    categoryName: "Cloud & Infrastructure",
    badge: "Master Blueprint (WBS 0.1.2)",
    isFlagship: true,
    isNew: true,
    whenToUse: "Use during Phase 0 Assessment to systematically evaluate legacy on-premise components (VMs, DBs, Mainframes, Monoliths, File Shares) across Business Value, Technical Feasibility, and Cloud Compatibility to classify them into the 6Rs migration strategies.",
    bestFor: [
      "WBS 0.1.2 Cloud Migration Assessment & Application Disposition Framework",
      "Evaluation across Business Value, Technical Feasibility, and Cloud Compatibility tracks",
      "Rehost (Lift & Shift) to Google Compute Engine (GCE) and Migrate for Anthos",
      "Replatform (Lift & Reshape) to Google Kubernetes Engine (GKE) and Cloud SQL managed services",
      "Refactor (Re-architect) to Cloud Run microservices and Cloud Functions serverless",
      "Retain (Revisit Later) for high-complexity on-premise mainframes and regulatory apps",
      "Retire (Decommission) for redundant reporting tools and legacy dev environments",
      "Repurchase (Drop & Shop) for SaaS replacements (Salesforce, Google Workspace, SAP S/4HANA Public Cloud)",
      "Continuous validation loop against Google Cloud Architecture Framework (GCAF) Cost Optimization pillar"
    ],
    keyTech: ["Compute Engine (GCE)", "Kubernetes Engine (GKE)", "Cloud Run", "Cloud Functions", "Cloud SQL", "Migrate for Anthos", "SaaS Solutions", "GCAF Cost Optimization"],
    thumbnail: "/templates/six_rs_migration_matrix.png",
    promptSummary: "6Rs Migration Disposition Matrix: Legacy Components -> Migration Assessment Logic (Business Value, Technical Feasibility, Cloud Compatibility) -> 6Rs Dispositions (Rehost, Replatform, Refactor, Retain, Retire, Repurchase) -> Cost Optimization & Continuous Validation."
  },
  {
    id: "hybrid_strangler_transition",
    name: "Hybrid / Strangler Fig Transition (Assessment Phase)",
    categoryId: "cloud_infra",
    categoryName: "Cloud & Infrastructure",
    badge: "Master Blueprint (WBS 0.1.3)",
    isFlagship: true,
    isNew: true,
    whenToUse: "Use in Phase 0 Assessment Transition when architecting hybrid cloud interconnects, reverse proxy traffic splitting via Apigee API Gateway, and phased strangler migration from on-prem monoliths to Google Cloud microservices.",
    bestFor: [
      "WBS 0.1.3 Hybrid Cloud & Strangler Fig Transition Architecture",
      "Apigee API Gateway Strangler Fig Interface with dynamic legacy vs modern feature routing",
      "On-Premises Datacenter mapping (Legacy Monolithic App v1.0, Legacy SQL DB, Mainframe)",
      "Secure Cloud Interconnect (Primary 10Gbps Path) & Site-to-Site VPN (Backup Path)",
      "SOC 2 Type II and HIPAA compliant secure hybrid communication channels",
      "Target modern cloud deployment on Google Kubernetes Engine (GKE), Cloud Run, and Cloud SQL for PostgreSQL",
      "Persona-driven operations with SRE Apigee monitoring, Network Engineering, and Backend Engineering"
    ],
    keyTech: ["Apigee API Gateway", "Cloud Interconnect", "Cloud VPN", "GKE", "Cloud Run", "Cloud SQL PostgreSQL", "SOC 2 / HIPAA", "Legacy Monolith"],
    thumbnail: "/templates/hybrid_strangler_transition.png",
    promptSummary: "Hybrid / Strangler Fig Transition Architecture: On-Prem Monolith Datacenter -> Secure Cloud Interconnect & VPN -> Apigee API Gateway (Strangler Fig Interface) -> Modern Microservices on GKE/Cloud Run & Cloud SQL PostgreSQL."
  },
  {
    id: "cloud_finops_chargeback",
    name: "Cloud FinOps & Chargeback Model",
    categoryId: "cloud_infra",
    categoryName: "Cloud & Infrastructure",
    badge: "Master Blueprint (WBS 1.1.3)",
    isFlagship: true,
    isNew: true,
    whenToUse: "Use to implement comprehensive cloud financial management, automated unit cost allocation, Vertex AI GenAI token tracking, and departmental showback/chargeback reporting across engineering, product, and AI teams.",
    bestFor: [
      "WBS 1.1.3 Cloud FinOps & Chargeback Model (FinOps & Economics)",
      "Ingestion & Usage Tracking (GKE Kubecost Agents, GCE VMs, GCS, Cloud SQL, BigQuery)",
      "Generative AI Token Tracking for Vertex AI prompt and completion tokens across Cloud Run & GKE Pods",
      "GCP Billing Exports and Kubecost container costs aggregation into Unified BigQuery Cost Data Lake",
      "Dynamic Vertex AI Token Cost Calculator with real-time model pricing tables",
      "Looker Studio visualization with executive summary, unit cost anomalies, GenAI costs, and budget forecasts",
      "FinOps Governance Engine with tagging enforcement, Cloud Monitoring budgets/alerts, and CUD/SUD commitment management",
      "Automated Chargeback & Showback generation for Business Units and GenAI teams with Cloud IAM governance and Secret Manager"
    ],
    keyTech: ["BigQuery Cost Data Lake", "Kubecost", "Vertex AI Token Tracker", "Looker Studio", "GCP Billing Export", "Cloud Monitoring", "Cloud IAM", "Secret Manager"],
    thumbnail: "/templates/cloud_finops_chargeback.png",
    promptSummary: "Cloud FinOps & Chargeback Model: Usage Tracking (Kubecost, GenAI Tokens, GCE, GCS) -> BigQuery Cost Data Lake -> Looker Studio Analytics & FinOps Governance -> Chargeback Generator for Business Units."
  },
  {
    id: "ai_coe_operating_model",
    name: "AI Center of Excellence (CoE) Operating Model",
    categoryId: "cloud_infra",
    categoryName: "Cloud & Infrastructure",
    badge: "Master Blueprint (WBS 1.1.5)",
    isFlagship: true,
    isNew: true,
    whenToUse: "Use to establish an enterprise AI Center of Excellence operating model connecting strategic business planning, GAMP 5 compliance validation, continuous prompt curation loops, Looker performance tracking, and recurring executive funding approval.",
    bestFor: [
      "WBS 1.1.5 AI Center of Excellence (CoE) Operating Model (Operational Excellence / Exec & Business Arch)",
      "Governance & Strategy layer with Adoption Modeling and cross-functional Cloud Plans alignment",
      "Process & Operations workflows with 3 circular loops (User Onboarding, Prompt Curation, Continuous Feedback Loops)",
      "Analytics & Measurement tracking Performance Metrics and Utilization Insights via Looker",
      "GAMP 5 Compliance Framework validation perimeter",
      "Delivers certified AI CoE Operating Model into Total Unified System View (WBS Platform Context & PSO Operations Support)",
      "Closed-loop executive review and approval with Business Leads to secure recurring multi-year Funding"
    ],
    keyTech: ["AI Governance", "Prompt Curation", "GAMP 5 Validation", "Looker Analytics", "Adoption Modeling", "Jira / Confluence", "PSO Operations", "Executive Funding"],
    thumbnail: "/templates/ai_coe_operating_model.png",
    promptSummary: "AI Center of Excellence (CoE) Operating Model: Exec Strategy & GAMP 5 -> Governance, Prompt Curation Loops & Looker Analytics -> AI CoE Operating Model -> Unified System View & Executive Funding."
  },
  {
    id: "mcp_context_gateway",
    name: "Model Context Protocol Gateway (MCP Context Gateway)",
    categoryId: "cloud_infra",
    categoryName: "Cloud & Infrastructure",
    badge: "Master Blueprint (WBS 2.1.5)",
    isFlagship: true,
    isNew: true,
    whenToUse: "Use to build an enterprise Model Context Protocol (MCP) gateway connecting heterogeneous databases, object stores, vector search, and legacy APIs with schema validation, SOC 2 compliance filtering, and tool execution proxies.",
    bestFor: [
      "WBS 2.1.5 Model Context Protocol Gateway (To-Be / Operational Excellence Category)",
      "Universal Context Ingestion & Adapters (Cloud SQL, Cloud Storage, Vertex AI Vector Search, Cloud Logging, Legacy Systems)",
      "Context Schema Mapping Engine normalizing multi-source data payloads",
      "MCP Message Bus & Normalization Tier (MCP Schemas, Schema Validation, SOC 2 Compliance Filtering, IAM Access Control)",
      "Audit Trail Logging to BigQuery/Cloud Logging with dedicated SOC 2 Audit Trail",
      "Tool Proxies & Downstream Integration (Cognitive Arch / Agentic RAG into API Proxy, GCP Service Proxy, Legacy Tool Proxy)",
      "Actionable Tool Systems integration and Looker Studio usage/economics metrics",
      "Total Unified System View with WBS Context / Platform View and PSO Operations Support",
      "Perimeter Security via Workload Identity (IAM), VPC-SC, and Secret Manager"
    ],
    keyTech: ["Model Context Protocol", "MCP Gateway (Node.js/Python)", "Cloud SQL", "Vertex AI Vector Search", "BigQuery Audit Trail", "SOC 2 Compliance", "Looker Studio", "Workload Identity", "VPC-SC", "Secret Manager"],
    thumbnail: "/templates/mcp_context_gateway.png",
    promptSummary: "Model Context Protocol Gateway: 5 Ingestion Adapters -> Context Schema Mapping -> MCP Message Bus (SOC 2 Filter & Audit) -> Cognitive RAG & Tool Proxies -> Actionable Tool Systems & Unified View."
  },
  {
    id: "logical_ai_config_tenant",
    name: "Product Plan - Logical AI Config (Tenant Architecture)",
    categoryId: "cloud_infra",
    categoryName: "Cloud & Infrastructure",
    badge: "Master Blueprint (Product Plan)",
    isFlagship: true,
    isNew: true,
    whenToUse: "Use to model enterprise multi-tenant logical AI configuration boundaries, environment segregation across Dev/Test/Prod, Agent Designer topologies, and compliance enforcement within Gemini Enterprise.",
    bestFor: [
      "Product Plan - Logical AI Config (Tenant Architecture) (Logical AI Config | To-Be)",
      "Multi-tenant environment segregation across Development, Testing, and Production environments",
      "Logical AI Config Management Console and automated Config Updates APIs with Enterprise IAM",
      "Platform Orchestrator routing configurations to Gemini Enterprise Engine instances",
      "Production Workspace encapsulation with Logical AI Config (Model Selection Gemini 1.5 Pro, System Instructions, Memory, Tool Invocation)",
      "Agent Designer topologies (Single-Agent, Multi-Agent Chains, Task-Based Sub-Agents)",
      "Application Logic execution with agent endpoint invocation",
      "Strict SOC 2 & GxP Compliance Guardrails and compliance markers",
      "Network Security Perimeters (VPC, Firewalls), Centralized Audit Logging, and KMS Configuration Encryption"
    ],
    keyTech: ["Gemini Enterprise", "Logical AI Config", "Agent Designer", "Multi-Tenant Isolation", "Enterprise IAM", "SOC 2 Guardrails", "GxP Compliance", "VPC Firewalls", "Cloud KMS", "Centralized Audit Logging"],
    thumbnail: "/templates/logical_ai_config_tenant.png",
    promptSummary: "Logical AI Config Tenant Architecture: App Owners / Devs -> IAM -> Dev/Test/Prod Environments -> Agent Designer Topologies -> SOC 2 / GxP Guardrails & KMS Encryption."
  },
  {
    id: "hub_and_spoke_agent_config",
    name: "Hub-and-Spoke Agent Configuration Map (WBS 2.2.2)",
    categoryId: "cloud_infra",
    categoryName: "Cloud & Infrastructure",
    badge: "Master Blueprint (WBS 2.2.2)",
    isFlagship: true,
    isNew: true,
    whenToUse: "Use to configure and orchestrate enterprise multi-agent hub-and-spoke topologies with Gemini Enterprise, specialized sub-agent spokes (Support, Fulfillment, Knowledge), Logical UI configuration matrices, HITL gates, and 21 CFR Part 11 compliance audit trails.",
    bestFor: [
      "WBS 2.2.2 Hub-and-Spoke Agent Configuration Map (Logical AI Config Category)",
      "Orchestrator (Parent Agent) Hub with General Configuration (Gemini 1.5 Pro, Global System Instructions, Shared Context Window, Memory TTL)",
      "Multi-Agent Router / Dispatcher Logic with intent-based dispatch routing rules",
      "Shared Memory & State and Vertex AI Agent Runtime invocation patterns",
      "Sub-Agent 1: Customer Support with Zendesk API tool proxy and BigQuery / Vector Search Grounding",
      "Sub-Agent 2: Fulfillment SA with SAP ERP API and BigQuery / Cloud Storage Grounding",
      "Sub-Agent 3: Knowledge Base SA with GCS PDF/Doc Document Grounding",
      "Logical UI Configuration Matrix (Prompt editors, Rule editors, Knowledge Source selectors, API Config panels)",
      "Human-in-the-Loop (HITL) Gate with signed compliance updates",
      "21 CFR Part 11 Compliance Gate & Immutable Audit Trail E-Signature Ledger",
      "Persona Dashboards (AI Architect, Workplace & Talent Architect, Agent Economic & Runtime Metrics)"
    ],
    keyTech: ["Gemini 1.5 Pro", "Vertex AI Agent Runtime", "Multi-Agent Router", "BigQuery Grounding", "Vector Search", "Zendesk API", "SAP ERP API", "GCS Storage", "21 CFR Part 11 Ledger", "HITL Gate", "Looker Metrics"],
    thumbnail: "/templates/hub_and_spoke_agent_config.png",
    promptSummary: "Hub-and-Spoke Agent Config Map: Orchestrator Hub -> Intent Router -> 3 Domain Spokes (Support, Fulfillment, Knowledge) -> Logical UI Matrix -> HITL Gate -> 21 CFR Part 11 Audit Ledger."
  },
  {
    id: "unified_data_governance",
    name: "Unified Data Governance & Access Control (WBS 3.1.4)",
    categoryId: "cloud_infra",
    categoryName: "Cloud & Infrastructure",
    badge: "Master Blueprint (WBS 3.1.4)",
    isFlagship: true,
    isNew: true,
    whenToUse: "Use to design enterprise data governance, active metadata management, and Attribute-Based Access Control (ABAC) across Collibra, Dataplex, BigQuery, GCS Data Lakes, Dataflow, Dataproc, and Vertex AI with compliance scorecards (GDPR, HIPAA, GxP).",
    bestFor: [
      "WBS 3.1.4 Unified Data Governance & Access Control Architecture (To-Be State)",
      "Top Zone Strategy & Governance Interface (CDO, Data Stewards, Collibra Data Intelligence Cloud with Business Glossary, Policy Registry, Stewardship Dashboards)",
      "Zone Two Unified Control Plane Orchestration (Dataplex Unified Control Plane, Active Data Control Plane, Dataplex Data Catalog metadata sync, Data Profiling & Quality, ABAC Enforcement Engine)",
      "Third Zone Enforced Technical Data Tier (BigQuery ABAC, Cloud Storage Data Lakes ABAC, Dataflow Pipeline Lineage Indexing, Dataproc Processing ABAC, Vertex AI Model Governance ABAC)",
      "Bottom Zone Outcomes & Compliance Reporting (CDO Executive Reporting Dashboard with KPI metrics, GDPR Compliance Guardrails, HIPAA Data Masking & Anonymization, GxP Audit Trail & Validation, Data Quality Scorecards)",
      "End-to-end policy flow directives, automated metadata synchronization, and bidirectional data lineage tracking"
    ],
    keyTech: ["Collibra Data Intelligence Cloud", "Google Cloud Dataplex", "Dataplex Data Catalog", "Attribute-Based Access Control (ABAC)", "BigQuery", "Cloud Storage", "Cloud Dataflow", "Cloud Dataproc", "Vertex AI", "Looker Reporting", "GDPR Guardrails", "HIPAA Masking", "GxP Validation"],
    thumbnail: "/templates/unified_data_governance.png",
    promptSummary: "Unified Data Governance Architecture: CDO & Stewards -> Collibra Strategy -> Dataplex ABAC Engine -> Modern Data Stack (BigQuery, GCS, Dataflow, Dataproc, Vertex AI) -> Executive Compliance Dashboards (GDPR, HIPAA, GxP)."
  },
  {
    id: "dataops_anomaly_detection",
    name: "DataOps & Anomaly Detection (WBS 3.1.7)",
    categoryId: "modern_data",
    categoryName: "Modern Data & Analytics",
    badge: "Master Blueprint (WBS 3.1.7)",
    isFlagship: true,
    isNew: true,
    whenToUse: "Use to design automated DataOps pipelines, real-time data quality testing (SODA), continuous data observability (Monte Carlo CARLO), active schema drift monitoring, and AI hallucination prevention across Google Cloud & the Modern Data Stack.",
    bestFor: [
      "WBS 3.1.7 DataOps & Anomaly Detection Architecture (To-Be State)",
      "Top Zone Strategy & Observability Dashboard (CDO, Data Architect, SRE Ops Lead, Looker Studio 8-metric reporting with Hallucination Prevention Score 105)",
      "Second Zone Incident Management & SRE View (SRE persona, Cloud Monitoring Alerts, PagerDuty Incident Integration, RCA Feedback Loop)",
      "Third Zone The Core Dataplex Integrated DataOps Control Plane (SODA quality checks, Active Schema Drift Monitoring, Anomaly Detection Engine, Monte Carlo CARLO observability, CSV Checkpoints, Reliability Guardrails)",
      "Fourth Zone Enforced Pipeline & Consumption (Cloud Storage Validated GCS Lakes with SOC 2 / CSV badge, Vertex AI Model Grounding with Vector Search and Prevention of AI/LLM Hallucination)",
      "Bottom Zone Unified Modern Data Stack (Enterprise Data Lakehouse prerequisites: BigQuery, GCS, Cloud SQL, Dataflow, Dataproc, External SaaS)"
    ],
    keyTech: ["Google Cloud Dataplex", "SODA (SQL-based Quality)", "Monte Carlo (CARLO Observability)", "Looker Studio", "PagerDuty", "Cloud Monitoring", "BigQuery", "Cloud Storage", "Dataflow", "Dataproc", "Cloud SQL", "Vertex AI Vector Search", "SOC 2 & CSV"],
    thumbnail: "/templates/dataops_anomaly_detection.png",
    promptSummary: "DataOps Architecture: Looker Observability -> SRE PagerDuty -> Dataplex SODA & CARLO Anomaly Engine -> Validated GCS Lakes & Hallucination-Free Vertex AI Grounding."
  },
  {
    id: "golive_warroom_runbook",
    name: "Go-Live Cutover & War Room Runbook (WBS 6.2.1)",
    categoryId: "cloud_infra",
    categoryName: "Cloud & Infrastructure",
    badge: "Master Blueprint (WBS 6.2.1)",
    isFlagship: true,
    isNew: true,
    whenToUse: "Use to design Day-1 enterprise Go-Live cutover playbooks, war room communications (Slack/Teams, Opsgenie), minute-by-minute execution steps (Data Migration, DNS, MFE mount, AI agents), and automated rollback scripts.",
    bestFor: [
      "WBS 6.2.1 Go-Live Cutover & War Room Runbook (Day-1 Cutover Phase / To-Be State)",
      "Layer 1 Top Preparation & Approval Phase (CI/CD Pipeline triggers, WORM storage Go-Live Prep Checklist, Release Manager & App Owner Go/No-Go Decision Gate, Confluence Runbook, Jira Cutover Ticket)",
      "Layer 2 Center The War Room & Live Execution with Opsgenie (SRE / DevSecOps communication, Enterprise War Room banner, Opsgenie Integration Engine)",
      "5-Step Minute-by-Minute Execution Script (1. Data Migration/ETL Verified, 2. Cloud DNS Update with GLB, 3. MFE Orchestration & Live Mount, 4. Vertex AI Agent Online, 5. Real-Time Observability Check)",
      "Automated Rollback Logic (Cutover Success Verification diamond, Automated Rollback Script: DNS fallback, MFE rollback, Disable AI Agent, Restore Data snapshots, Red Alert alerting)",
      "Layer 3 Bottom Post-Launch Day-2 Operations (Dynamic Dashboards, Active Data Control Plane monitoring, Go-Live Verification Scorecard)"
    ],
    keyTech: ["Jira & Confluence", "Opsgenie", "Slack / Microsoft Teams", "Google Cloud DNS", "Cloud Load Balancing", "Vertex AI Agents", "Micro-Frontends (MFE)", "Cloud Monitoring", "Automated Rollback Scripts", "SOC 2 & CSV"],
    thumbnail: "/templates/golive_warroom_runbook.png",
    promptSummary: "Go-Live War Room Runbook: CI/CD & Go/No-Go Gates -> War Room & Opsgenie -> 5-Step Minute-by-Minute Execution Script -> Automated Rollback Logic -> Post-Launch Operations."
  },
  {
    id: "enterprise_sre_observability",
    name: "Enterprise SRE & Observability Architecture (WBS 6.1.1)",
    categoryId: "cloud_infra",
    categoryName: "Cloud & Infrastructure",
    badge: "Master Blueprint (WBS 6.1.1)",
    isFlagship: true,
    isNew: true,
    whenToUse: "Use to design Day-2 enterprise operations, unified observability pipelines (distributed tracing, Cloud Logging, Cloud Monitoring), Datadog SIEM integration, Looker Studio dynamic dashboards, automated drift detection & runbooks, and incident management with RED alerts.",
    bestFor: [
      "WBS 6.1.1 Enterprise SRE & Observability Architecture (Day-2 Operations / To-Be State)",
      "Prerequisite Flow: Cloud-Native CI/CD (Git Repository, Jenkins, GitLab -> Deployment Triggers & Manifests)",
      "Observed Workloads (GCP Workload Ingress): Client Applications, Microservices (Cloud Run / GKE), AI Agents (Gemini Pro), Data Tier (Cloud SQL, BigQuery) emitting logs, metrics, traces",
      "Unified Observability & Telemetry Pipeline (The Core): distributed tracing (cross-service correlation), Cloud Logging (log sinks, SOC 2 compliance auditing), Cloud Monitoring (metrics aggregation policies)",
      "Operational Excellence Control Plane: SREs, SLO/SLA Definition, Capacity Planning, Budget Alerts with SOC 2 policies ingress",
      "Actionable Operations & Reporting: Datadog Observability & SIEM Integration, Looker Studio dashboards (SLO Health Score, Capacity Utilization, Cost Anomalies, Error Budget Burn), personas (SRE, Ops Team, DevSecOps), Day-2 Ops Drift Detection & Automated Remediation, Automated Runbooks, and Incident Management (Cloud Monitoring Alerts, PagerDuty, RED alerts)"
    ],
    keyTech: ["Cloud Monitoring", "Cloud Logging", "Distributed Tracing", "Datadog SIEM", "Looker Studio", "PagerDuty", "Google Kubernetes Engine (GKE)", "Cloud Run", "Gemini Pro AI Agents", "SOC 2 Type II"],
    thumbnail: "/templates/enterprise_sre_observability.png",
    promptSummary: "Enterprise SRE & Observability: CI/CD Prereq -> Observed Workloads (Client, Microservices, AI Agents, Data Tier) -> Unified Telemetry Pipeline (Tracing, Logging, Monitoring) -> Datadog SIEM & Looker Studio Dashboards -> Automated Drift Remediation & PagerDuty Incident Management."
  },
  {
    id: "data_residency_sovereign_map",
    name: "Data Residency & Sovereign Cloud Map (WBS 5.1.6)",
    categoryId: "cloud_infra",
    categoryName: "Cloud & Infrastructure",
    badge: "Master Blueprint (WBS 5.1.6)",
    isFlagship: true,
    isNew: true,
    whenToUse: "Use to design multi-region data sovereignty, regional boundary isolation (EU-West4 vs US-Central1), VPC Service Controls (VPC SC) perimeters, cross-border VPC-SC transfer bridges, and Looker Studio compliance reporting (GDPR, EU AI Act, HIPAA).",
    bestFor: [
      "WBS 5.1.6 Data Residency & Sovereign Cloud Map (To-Be State, Infra Provisioning Phase)",
      "Multi-region isolation across EU-West4 (The Netherlands) and US-Central1 (Iowa)",
      "VPC Service Controls (VPC SC) perimeters with restricted GCP APIs and CMEK encryption",
      "Vertex AI Local Inference & Grounding patterns strictly isolated inside sovereign regions",
      "Cross-Border Data Transfer Path with GCP VPC-SC Bridge and perimeter red alert tripwires",
      "Looker Studio Compliance Dashboards (Regional Data Compliance Score 99.8%, cross-border audit logs, grounding lineage)",
      "Async Management Plane: Unified Trace Correlation, Vertex AI monitoring, Dataplex, Cloud Logging",
      "Persona-driven compliance oversight for Legal, CISO, and SRE Ops Leads"
    ],
    keyTech: ["VPC Service Controls (VPC SC)", "Vertex AI Localization", "Cloud Storage Buckets", "Cloud SQL", "Vertex AI Vector Search", "GCP VPC-SC Bridge", "Looker Studio", "Dataplex", "GDPR, EU AI Act, HIPAA"],
    thumbnail: "/templates/data_residency_sovereign_map.png",
    promptSummary: "Data Residency & Sovereign Cloud Map: Regional Ingress -> Core Sovereign Cloud (EU-West4 & US-Central1 VPC-SC Perimeters) -> GCP VPC-SC Bridge -> Looker Studio Compliance Dashboards -> Async Management Plane (Dataplex, Cloud Logging)."
  },
  {
    id: "federated_iam_sso",
    name: "Federated IAM & SSO Architecture (WBS 5.1.4)",
    categoryId: "cloud_infra",
    categoryName: "Cloud & Infrastructure",
    badge: "Master Blueprint (WBS 5.1.4)",
    isFlagship: true,
    isNew: true,
    whenToUse: "Use to design multi-protocol federated identity brokerages, SSO integrations (OAuth2/OIDC, SAML, JWT), Okta/Google Identity user federation, and enforced downstream workload access (GKE, Cloud Run, Cloud SQL, Vertex AI Agents, Data Lakes, Dataplex).",
    bestFor: [
      "WBS 5.1.4 Federated IAM & SSO Architecture (To-Be State, Infra Provisioning Phase)",
      "Client Ingress with SOC 2 / HIPAA Compliant Global Load Balancing",
      "Federated Identity & SSO Broker (Apigee / GCP Services) supporting OAuth2, SAML, and API Token Adapters",
      "Attribute Mapping Engine, Token Translation Service, MFA Enforcement, and Session Auditing",
      "Active Identity Control Plane communicating with Okta / Google Identity Directory",
      "Enforced downstream IAM access across GKE, Cloud Run, Cloud SQL, Vertex AI Agents, Data Lakes, and Dataplex",
      "Analytics & Compliance Reporting with Authentication Audit Logs, User Access Reports, and Agent Token Federation checks",
      "HIPAA and SOC 2 Type II compliance guardrails"
    ],
    keyTech: ["Google Identity", "Okta", "OAuth2 / OIDC", "SAML 2.0", "JWT Token Exchange", "Apigee", "Cloud IAM", "Vertex AI Agents", "Dataplex", "HIPAA & SOC 2"],
    thumbnail: "/templates/federated_iam_sso.png",
    promptSummary: "Federated IAM & SSO Architecture: Client Ingress -> Federated Identity & SSO Broker (OAuth2, SAML, JWT) <-> Okta / Google Identity Directory -> Enforced Workloads (GKE, Cloud Run, Cloud SQL, Vertex AI Agents, Data Lakes) -> Analytics & HIPAA Compliance Reporting."
  },
  {
    id: "secure_deployment_map",
    name: "Secure Deployment Topology Map",
    categoryId: "cloud_infra",
    categoryName: "Cloud & Infrastructure",
    badge: "Security Standard",
    whenToUse: "Use when mapping out physical network security perimeters, demilitarized zones (DMZ), private application subnets, and isolated database clusters.",
    bestFor: [
      "DMZ & Perimeter network isolation",
      "Private application and data subnets",
      "VPC Service Controls & IAM boundary policies",
      "Private Service Connect (PSC) endpoint routing"
    ],
    keyTech: ["WAF Gateway", "VPC Subnets", "Private Service Connect", "IAM RBAC", "VPC-SC", "Isolated Pods"],
    thumbnail: "/templates/secure_deployment_map.png",
    promptSummary: "Secure Deployment Map: Edge Ingress Zone -> Private Application Subnet -> Isolated Data Subnet -> VPC-SC Perimeter."
  },

  // =========================================================================
  // 3. MODERN DATA & ANALYTICS PIPELINES
  // =========================================================================
  {
    id: "tech_modern_data_stack",
    name: "Modern Data Stack Architecture",
    categoryId: "data_pipelines",
    categoryName: "Data Pipelines",
    badge: "Analytics Engineering",
    isFlagship: true,
    whenToUse: "Use when building modern analytics engineering pipelines with Change Data Capture (Debezium/Fivetran), automated Data Contracts quality gates, dbt marts, and Reverse ETL.",
    bestFor: [
      "Debezium real-time CDC from PostgreSQL",
      "Automated Data Contracts schema enforcement",
      "dbt Core Silver/Gold dimensional modeling",
      "Reverse ETL syncing insights back to operational systems"
    ],
    keyTech: ["Debezium CDC", "Data Contracts", "dbt Core", "Snowflake / BigQuery", "Hightouch / Census", "Looker BI"],
    thumbnail: "/templates/tech_modern_data_stack.png",
    promptSummary: "Modern Data Stack: OLTP Postgres -> Debezium CDC -> Data Contracts Gate -> dbt Gold Marts -> Reverse ETL to CRM."
  },
  {
    id: "tech_streaming_analytics",
    name: "Real-Time Streaming Analytics",
    categoryId: "data_pipelines",
    categoryName: "Data Pipelines",
    badge: "Big Data & IoT",
    whenToUse: "Use for high-throughput streaming analytics and IoT/Edge telemetry ingestion using MQTT gateways, Cloud Pub/Sub, Dataflow (Apache Beam), Bigtable, and BigQuery.",
    bestFor: [
      "IoT/Edge field telemetry & MQTT ingestion",
      "Real-time stream processing with Cloud Dataflow",
      "Sub-second feature extraction for Vertex AI",
      "Time-series storage in Bigtable & BigQuery"
    ],
    keyTech: ["Cloud Pub/Sub", "Cloud Dataflow (Beam)", "Bigtable", "BigQuery", "Vertex AI Feature Store", "Looker Studio"],
    thumbnail: "/templates/tech_streaming_analytics.png",
    promptSummary: "GCP Streaming Pipeline: Edge Field Gateways -> Cloud Pub/Sub -> Dataflow Stream ETL -> Bigtable Time-Series -> BigQuery."
  },
  {
    id: "tech_data_lakehouse_gcp",
    name: "GCP Enterprise Data Lakehouse",
    categoryId: "data_pipelines",
    categoryName: "Data Pipelines",
    badge: "Data Lakehouse",
    whenToUse: "Use for multi-tiered cloud lakehouse architectures with Cloud Storage BigLake Raw/Clean/Curated landing zones, Dataproc Spark ETL, and BigQuery partitioned analytics.",
    bestFor: [
      "Multi-tier Cloud Storage BigLake (Raw, Bronze, Silver, Gold)",
      "Automated schema discovery with Dataplex Data Catalog",
      "Serverless SQL analytics using BigQuery",
      "Centralized governance via Cloud IAM and CMEK"
    ],
    keyTech: ["Cloud Storage", "BigLake", "BigQuery", "Dataplex", "Dataproc Spark"],
    thumbnail: "/templates/tech_data_lakehouse.png",
    promptSummary: "GCP Data Lakehouse: Multi-source Ingestion -> Cloud Storage Multi-Tier Lake -> Dataplex Catalog -> BigQuery SQL."
  },
  {
    id: "erd",
    name: "Dimensional Data Model - ERD",
    categoryId: "data_pipelines",
    categoryName: "Data Pipelines",
    badge: "Data Modeling",
    whenToUse: "Use when designing relational and dimensional database schemas with explicit Fact tables, Dimension tables, Primary/Foreign keys, attributes, and cardinality (1:1, 1:N, M:N).",
    bestFor: [
      "Enterprise relational database modeling",
      "Star schema & Snowflake dimensional modeling",
      "PK/FK constraint and relationship mapping",
      "Data warehousing fact & dimension design"
    ],
    keyTech: ["Fact Tables", "Dimension Tables", "PostgreSQL", "Snowflake", "Cardinality (1:N)", "Foreign Keys"],
    thumbnail: "/templates/erd.png",
    promptSummary: "Dimensional Data Model: Fact Tables, Dimension Tables, Foreign Key Relationships, Data Types, and Explicit Cardinality."
  },
  {
    id: "data_ai_pipeline",
    name: "Data & AI Pipeline",
    categoryId: "data_pipelines",
    categoryName: "Data Pipelines",
    badge: "MLOps Lifecycle",
    whenToUse: "Use when visualizing the complete data flow from multi-channel raw data ingestion, feature engineering, model training registry, to inference serving and telemetry.",
    bestFor: [
      "End-to-end dataflow diagrams (DFD)",
      "Feature store ingestion & transformation",
      "MLOps model training & registry promotion",
      "Inference API serving and telemetry logging"
    ],
    keyTech: ["Data Ingestion DFD", "Feature Store", "Model Registry", "Inference API", "Serving Endpoints", "Telemetry"],
    thumbnail: "/templates/data_ai_pipeline.png",
    promptSummary: "Data & AI Pipeline: Data Ingestion -> Feature Engineering -> MLOps Lifecycle -> Model Registry -> Serving Analytics."
  },

  // =========================================================================
  // 4. MICROSERVICES & APPLICATION FLOW
  // =========================================================================
  {
    id: "tech_event_driven_eda",
    name: "Enterprise Event-Driven EDA Mesh",
    categoryId: "microservices_flow",
    categoryName: "Microservices",
    badge: "EDA Standard",
    isFlagship: true,
    whenToUse: "Use for decoupled event-driven microservices featuring Order producers, Schema Registry Avro contract validation, partitioned Kafka/PubSub brokers, DLQ recovery, and consumer groups.",
    bestFor: [
      "Asynchronous decoupled microservices",
      "Kafka/PubSub topic partitioning & consumer groups",
      "Schema Registry contract enforcement",
      "Automated Dead-Letter Queue (DLQ) retry routing"
    ],
    keyTech: ["Apache Kafka", "Schema Registry (Avro)", "Dead-Letter Queue", "GKE Consumer Groups", "Cloud Spanner Ledger"],
    thumbnail: "/templates/tech_event_driven_eda.png",
    promptSummary: "Enterprise EDA Architecture: Order Producers -> Schema Registry Gate -> Kafka Partitioned Topics -> DLQ -> GKE Consumers."
  },
  {
    id: "tech_c4_system_context",
    name: "C4 System Context & Container Model",
    categoryId: "microservices_flow",
    categoryName: "Microservices",
    badge: "C4 Standard",
    isFlagship: true,
    whenToUse: "Use when presenting C4 Model Level 1 Context and Level 2 Container architectures to show how external actors, identity gateways, core web apps, and databases interact.",
    bestFor: [
      "C4 Model Level 1 (System Context) & Level 2 (Containers)",
      "B2B Customer & Internal SRE identity routing",
      "Frontend SPA to backend microservice boundaries",
      "External SaaS API integrations (Stripe, FedEx)"
    ],
    keyTech: ["C4 Model", "Identity Gateway (IAP)", "Next.js SPA", "Cloud Run Microservices", "AlloyDB HA", "Third-Party APIs"],
    thumbnail: "/templates/tech_c4_system_context.png",
    promptSummary: "C4 System Context & Containers: External Actors -> Identity Gateway -> Core Web App & API Services -> HA Database & SaaS."
  },
  {
    id: "sequence_diagram",
    name: "Micro Dynamic UML Sequence Diagram",
    categoryId: "microservices_flow",
    categoryName: "Microservices",
    badge: "Execution Protocol",
    whenToUse: "Use when documenting chronological, step-by-step API interactions, synchronous request arrows, dashed return flows, PII screening checks, and ReAct thought/action loops.",
    bestFor: [
      "Chronological UML sequence execution flows",
      "Synchronous API calls vs asynchronous callbacks",
      "ReAct (Thought/Action/Observation) agent loops",
      "PII and data privacy pre-execution checks"
    ],
    keyTech: ["UML Sequence Lifelines", "ReAct Loop", "PII Redaction Gate", "gRPC / REST Calls", "VPC-SC Private Access"],
    thumbnail: "/templates/sequence_diagram.png",
    promptSummary: "Micro Dynamic Sequence Diagram: User Lifeline -> API Gateway -> Agent Orchestrator -> ReAct Loop -> Vector DB -> Response."
  },

  // =========================================================================
  // 5. DEVSECOPS & PLATFORM ENGINEERING
  // =========================================================================
  {
    id: "devops_cicd_pipeline",
    name: "DevSecOps Polyrepo CI/CD Pipeline",
    categoryId: "devsecops",
    categoryName: "DevSecOps",
    badge: "DevSecOps Standard",
    whenToUse: "Use when modeling enterprise CI/CD pipelines across Plan, Git source control, 3-track automated testing (Data, App, MLOps), SAST security scanning, and GitOps ArgoCD promotion.",
    bestFor: [
      "Polyrepo Git source control & branch rules",
      "3-Track CI: Data Engineering, App Code, MLOps",
      "SonarQube / Snyk SAST vulnerability scanning",
      "GitOps ArgoCD staging & production promotion"
    ],
    keyTech: ["Git Polyrepo", "SonarQube SAST", "Cloud Build", "Artifact Registry", "ArgoCD GitOps", "Kubernetes GKE/EKS"],
    thumbnail: "/templates/devops_cicd_pipeline.png",
    promptSummary: "Enterprise DevSecOps Pipeline: Plan & Govern -> Polyrepo Git -> 3-Track CI & SAST Scan -> ArgoCD GitOps Deployment."
  },
  {
    id: "tech_cicd_pipeline",
    name: "Cloud-Native CI/CD Pipeline",
    categoryId: "devsecops",
    categoryName: "DevSecOps",
    badge: "Platform CI/CD",
    whenToUse: "Use when detailing cloud-native container build workflows, automated unit tests, container image scanning, and automated canary rollback mechanisms.",
    bestFor: [
      "Automated Docker container builds",
      "Container vulnerability scanning (ECR/Artifact Registry)",
      "Automated canary deployment with rollback",
      "Prometheus & Grafana release health monitoring"
    ],
    keyTech: ["GitHub Actions", "Docker / BuildKit", "Artifact Registry", "ArgoCD", "Canary Analysis", "Prometheus"],
    thumbnail: "/templates/tech_cicd_pipeline.png",
    promptSummary: "Cloud Native CI/CD Pipeline: Git PR Trigger -> Unit Tests -> Container Build -> Artifact Scan -> Canary Promotion."
  },

  // =========================================================================
  // 6. ENTERPRISE BUSINESS & STRATEGY
  // =========================================================================
  {
    id: "conceptual_diagram",
    name: "Conceptual Diagram",
    categoryId: "business_strategy",
    categoryName: "Business Strategy",
    badge: "Executive Platform",
    whenToUse: "Use for executive C-suite and board presentations to illustrate high-level 3-stage business value flows: Ingestion across silos, Core Synthesis Engine, and Strategic Business Outcomes.",
    bestFor: [
      "Executive C-Suite & Board presentations",
      "High-level 3-stage platform capability mapping",
      "Multi-channel operational silo unification",
      "Strategic outcome & ROI visualization"
    ],
    keyTech: ["3-Tier Value Flow", "Multi-channel Ingestion", "Enterprise Synthesis Engine", "Strategic Outcomes", "Real-Time Alerts"],
    thumbnail: "/templates/conceptual_diagram.png",
    promptSummary: "Conceptual Business Architecture: Operational Silos Ingestion -> Core Synthesis Engine -> Strategic Business Outcomes."
  },
  {
    id: "unified_system_view",
    name: "Total Unified System View",
    categoryId: "business_strategy",
    categoryName: "Business Strategy",
    badge: "Holistic Overview",
    whenToUse: "Use when presenting a complete, unified enterprise blueprint combining architectural planning, data engineering, MLOps model lifecycle, and secure cloud deployment in a single panoramic view.",
    bestFor: [
      "Holistic enterprise-wide architectural overview",
      "Cross-functional alignment (Data, AI, DevOps, Infra)",
      "End-to-end data vetting and schema lineage",
      "Complete operational stack visualization"
    ],
    keyTech: ["Enterprise Planning", "Data Vetting", "Feature Store", "MLOps Lifecycle", "Secure VPC Subnets", "Agentic Orchestrator"],
    thumbnail: "/templates/unified_system_view.png",
    promptSummary: "Unified System View: Plan & Data Foundation -> Development & AI Lifecycle -> Cognitive Architecture & Secure Deployment."
  }
];
