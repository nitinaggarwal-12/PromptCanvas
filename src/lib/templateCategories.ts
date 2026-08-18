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
    id: "flowcharts",
    name: "Flowcharts",
    shortName: "Flowcharts",
    icon: "Network",
    description: "End-to-end operational flowcharts, sequential execution paths, multi-agent meshes, and state machine decision trees.",
    color: "from-blue-500/20 to-teal-500/20",
    accentColor: "border-teal-400 text-teal-400"
  },
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
  },
  {
    id: "industry_solutions",
    name: "Industry Specialized Blueprints",
    shortName: "Industry Solutions",
    icon: "Factory",
    description: "Domain-specific production blueprints tailored for Pharma & Healthcare, Supply Chain, FinTech Banking, Retail E-Commerce, Manufacturing, and HR.",
    color: "from-purple-500/20 to-indigo-500/20",
    accentColor: "border-purple-400 text-purple-400"
  }
];

export const TEMPLATE_CATALOG_ITEMS: TemplateCatalogItem[] = [
  // =========================================================================
  // 0. FLOWCHARTS
  // =========================================================================
  {
    id: "unified_flowchart",
    name: "Unified End-to-End Operational Flowchart",
    categoryId: "flowcharts",
    categoryName: "Flowcharts",
    badge: "Master Flowchart",
    isFlagship: true,
    isNew: true,
    whenToUse: "Comprehensive sequential step-by-step flowchart [1] to [15] spanning 7 layer swimlanes: Client Edge (Gemini App/Notebook/Agent Designer), Apigee Policy Gate, ADK 2.0 & Deep Research Agent Mesh, Pub/Sub Event Mesh, BigQuery Lakehouse, and SRE Hub.",
    bestFor: [
      "Master End-to-End Sequential Operational Architecture Flowchart",
      "Layer 1 Enterprise Agentic Workspace & Developer Studio (Gemini Enterprise App [1], Gemini Notebook [1a], Agent Designer IDE [1b], GSLB & WAF [1c])",
      "Layer 2 API Management & Zero-Trust Policy Gate (Apigee Gateway [2], KMS HSM Vault [2a], SIEM Rejection [2b])",
      "Layer 3 Cognitive Multi-Agent Mesh & ADK 2.0 (ADK 2.0 Orchestrator [3], Deep Research Agent [3a], Vertex AI Gemini 3.7 Flash [3b])",
      "Layer 4 In-Memory Cache, Vector Store & Persistence (Vertex Vector Search [4], Redis MemoryStore [5], Cloud SQL HA [6])",
      "Layer 5 Asynchronous Event Bus & Resilience Queue (Pub/Sub [7], Dead-Letter Queue [7a])",
      "Layer 6 Async Ingestion Agents & Lakehouse (Document Chunking Agent [8], Embedding Worker [9], BigQuery Lakehouse [10])",
      "Layer 7 Enterprise SRE Observability & Telemetry (Cloud Operations Suite [11], PagerDuty SRE Hub [12])"
    ],
    keyTech: ["Gemini Enterprise", "Gemini Notebook", "Agent Designer IDE", "Apigee X", "ADK 2.0", "Deep Research", "Vertex AI Gemini", "Vector Search", "Redis MemoryStore", "Cloud Pub/Sub", "Cloud SQL HA", "BigQuery", "Cloud Operations"],
    thumbnail: "/templates/unified_system_view.png",
    promptSummary: "Sequential End-to-End Flowchart: Gemini Apps & Agent Designer -> Apigee Gateway -> ADK 2.0 & Deep Research Mesh -> Pub/Sub -> Lakehouse & SRE Telemetry."
  },
  {
    id: "governance_state_machine",
    name: "Unified Governance & State-Machine Lifecycle",
    categoryId: "flowcharts",
    categoryName: "Flowcharts",
    badge: "State Machine Standard",
    isFlagship: true,
    isNew: true,
    whenToUse: "Use when modeling discrete entity or system lifecycle states (Draft -> Vetting -> Training -> Evaluated -> Approval -> Canary -> Production -> Drift -> Retired) with guard conditions and decision triggers.",
    bestFor: [
      "Unified Governance & State-Machine Lifecycle (The 'What Status' Total System View)",
      "Phase 1 Initial Vetting & Modeling: Ethical Sourcing, PII Checks, Dimensional ERD Data Model",
      "Phase 2 Training & Evaluation: Offline Metrics, GAMP 5 & SOC 2 Audits, Approval Gates",
      "Phase 3 Deployment: Canary / Shadow Testing, Production Gate, Live Deployment",
      "Phase 4 Continuous Governance: Telemetry Observability, Active Drift Detection, Automated Retrain Loops, Decommissioning"
    ],
    keyTech: ["UML State Machine", "Lifecycle States", "Guard Triggers", "GAMP 5 Audit Gate", "Drift Detection", "Decision Diamonds", "21 CFR Part 11"],
    thumbnail: "/templates/governance_state_machine.png",
    promptSummary: "Unified Governance & State Machine Lifecycle: Data Vetting & Modeling -> Training & Offline Evaluation -> GAMP 5 Audit Gate -> Canary & Production Deployment -> Continuous Telemetry & Retrain Loop."
  },

  // =========================================================================
  // 1. AI & AGENTIC SYSTEMS ARCHITECTURE
  // =========================================================================
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
    keyTech: ["Gemini 3.7 Flash", "pgvector", "Pinecone", "RAG Pipeline", "Vector Embeddings", "Re-ranking Engine"],
    thumbnail: "/templates/agentic_rag.png",
    promptSummary: "Cognitive RAG Architecture: Document Chunking -> Embeddings DB -> Hybrid Retrieval -> LLM Synthesis -> Guardrails."
  },
  {
    id: "tech_eval_safety",
    name: "Agentic AI Evaluation, Safety & Optimization Platform",
    categoryId: "ai_agentic",
    categoryName: "AI & Agentic Systems",
    badge: "Production Blueprint",
    isFlagship: true,
    isNew: true,
    whenToUse: "Use when establishing end-to-end agent lifecycle evaluation, safety policies, multi-modal grounding, AI-based and human-in-the-loop review, and ML-driven closed-loop optimization.",
    bestFor: [
      "Agentic AI Evaluation, Safety & Optimization Platform",
      "Agent Registry structured storage (definitions, safety policies, grounding knowledge)",
      "Gemini Agent Platform (Vertex AI Agent Builder Orchestrator, Gemini 3.7 Flash, GKE/Cloud Run workloads)",
      "Parallel AI-Based Evaluation (Vertex AI Model Evaluation) & Human Review UI",
      "Safety Guardrails (Toxicity Filter, Bias Mitigation, PII Redaction, Alignment Checker)",
      "ML-Driven Optimization (Prompt Engineering, RLHF) closed-loop updates"
    ],
    keyTech: ["Vertex AI Agent Builder", "Gemini 3.7 Flash", "Agent Registry", "Vertex AI Model Evaluation", "Looker", "BigQuery", "Safety Guardrails"],
    thumbnail: "/templates/tech_eval_safety.png",
    promptSummary: "Agentic AI Safety Platform: Ingestion & Registry -> Gemini Agent Platform -> Eval & Safety Loop -> BigQuery/Looker Analysis -> ML Closed-Loop Optimization."
  },
  {
    id: "tech_agentic_mesh",
    name: "Hybrid Multi-Cloud Networking & Gemini Enterprise",
    categoryId: "cloud_infra",
    categoryName: "Cloud Infrastructure & Networking",
    badge: "Production Blueprint",
    isFlagship: true,
    isNew: true,
    whenToUse: "Use for multi-cloud enterprise architectures requiring 100G Dedicated Interconnect, Partner Interconnect, Cloud VPN, Cross-Cloud Interconnect for AWS, Network Connectivity Center (NCC) BGP routing, and Gemini Enterprise AIOps.",
    bestFor: [
      "Hybrid Multi-Cloud Networking & Gemini Enterprise",
      "Dedicated Cloud Interconnect 100G with BGP ASN Peering (16550, 65001, 64512)",
      "Network Connectivity Center (NCC) Multi-Spoke Hub-and-Spoke Mesh",
      "Direct 100G Cloud-to-Cloud Demarc with AWS Direct Connect Gateway",
      "Gemini Enterprise Autonomous BGP Flap Damping & AIOps Orchestration",
      "VPC Service Controls (VPC-SC) Perimeter & Anthos Istio mTLS 1.3"
    ],
    keyTech: ["Dedicated Interconnect 100G", "Cross-Cloud Interconnect", "NCC BGP Hub", "Gemini Enterprise AIOps", "AWS Direct Connect", "VPC-SC Perimeter", "Vertex AI"],
    thumbnail: "/templates/tech_agentic_mesh.png",
    promptSummary: "Hybrid Multi-Cloud: 100G Interconnect -> On-Prem Data Center -> GCP Global Network PoPs -> NCC BGP Hub -> AWS Direct Connect -> Gemini Enterprise AIOps."
  },

  // =========================================================================
  // 2. CLOUD & ZERO-TRUST INFRASTRUCTURE
  // =========================================================================
  {
    id: "tech_serverless_gcp",
    name: "Serverless Event-Driven Architecture (GCP)",
    categoryId: "cloud_infra",
    categoryName: "Cloud & Infrastructure",
    badge: "Canonical Master",
    isFlagship: true,
    isNew: true,
    whenToUse: "Use for robust serverless Event-Driven Architecture (EDA) integrating Enterprise mobile clients and IoT Industrial Sensors with Cloud Load Balancing, Cloud Run Ingestion, Pub/Sub event bus, Vertex AI Gemini Platform, Cloud Bigtable, BigQuery, and automated Cloud Tasks actions.",
    bestFor: [
      "Serverless Event-Driven Architecture (Platform Engineering)",
      "Enterprise mobile user devices & IoT Industrial Sensors ingress",
      "Cloud Load Balancing / Cloud CDN edge traffic management",
      "Cloud Run Ingestion microservice performing light validation and enrichment",
      "Pub/Sub distributed asynchronous event bus (Topics & Subscriptions)",
      "Vertex AI Gemini Platform for Predictive Maintenance, Anomaly Interpretation & Root Cause Analysis",
      "Cloud Bigtable time-series IoT data & Cloud SQL transactional metadata",
      "BigQuery data analytics lake & Looker BI reporting visual insights",
      "Cloud Tasks external action orchestration & Notification Services push alerts"
    ],
    keyTech: ["Cloud Run", "Pub/Sub", "Vertex AI Gemini", "Cloud Bigtable", "Cloud SQL", "BigQuery", "Looker", "Cloud Tasks"],
    thumbnail: "/templates/tech_serverless_gcp.png",
    promptSummary: "Serverless EDA Architecture: Enterprise App & IoT Sensors -> Cloud Load Balancing -> Cloud Run Ingestion -> Pub/Sub Event Bus -> Event Processing -> Vertex AI Gemini Platform -> Bigtable / Cloud SQL / BigQuery -> Looker & Cloud Tasks."
  },
  {
    id: "tech_multi_region_dr",
    name: "Master Multi-Region Active-Passive DR",
    categoryId: "cloud_infra",
    categoryName: "Cloud & Infrastructure",
    badge: "Master Certified SRE Template",
    whenToUse: "Use when designing enterprise-grade multi-region active-passive disaster recovery (Pilot Light DR) with Zero-Trust VPC-SC perimeters, Private Service Connect, 1:1 Terraform IaC parity, and comprehensive FMEA failure mode analysis.",
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
    id: "six_rs_migration_matrix",
    name: "6Rs Migration Disposition Matrix (Assessment Phase)",
    categoryId: "cloud_infra",
    categoryName: "Cloud & Infrastructure",
    badge: "Master Blueprint",
    isFlagship: true,
    isNew: true,
    whenToUse: "Use during Phase 0 Assessment to systematically evaluate legacy on-premise components (VMs, DBs, Mainframes, Monoliths, File Shares) across Business Value, Technical Feasibility, and Cloud Compatibility to classify them into the 6Rs migration strategies.",
    bestFor: [
      "Cloud Migration Assessment & Application Disposition Framework",
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
    badge: "Master Blueprint",
    isFlagship: true,
    isNew: true,
    whenToUse: "Use in Phase 0 Assessment Transition when architecting hybrid cloud interconnects, reverse proxy traffic splitting via Apigee API Gateway, and phased strangler migration from on-prem monoliths to Google Cloud microservices.",
    bestFor: [
      "Hybrid Cloud & Strangler Fig Transition Architecture",
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
    badge: "Master Blueprint",
    isFlagship: true,
    isNew: true,
    whenToUse: "Use to implement comprehensive cloud financial management, automated unit cost allocation, Vertex AI GenAI token tracking, and departmental showback/chargeback reporting across engineering, product, and AI teams.",
    bestFor: [
      "Cloud FinOps & Chargeback Architecture (FinOps & Economics)",
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
    badge: "Master Blueprint",
    isFlagship: true,
    isNew: true,
    whenToUse: "Use to establish an enterprise AI Center of Excellence operating model connecting strategic business planning, GAMP 5 compliance validation, continuous prompt curation loops, Looker performance tracking, and recurring executive funding approval.",
    bestFor: [
      "AI Center of Excellence (CoE) Operating Model (Operational Excellence / Exec & Business Arch)",
      "Governance & Strategy layer with Adoption Modeling and cross-functional Cloud Plans alignment",
      "Process & Operations workflows with 3 circular loops (User Onboarding, Prompt Curation, Continuous Feedback Loops)",
      "Analytics & Measurement tracking Performance Metrics and Utilization Insights via Looker",
      "GAMP 5 Compliance Framework validation perimeter",
      "Delivers certified AI CoE Operating Model into Total Unified System View (Enterprise Platform Context & 24/7 Operations Support)",
      "Closed-loop executive review and approval with Business Leads to secure recurring multi-year Funding"
    ],
    keyTech: ["AI Governance", "Prompt Curation", "GAMP 5 Validation", "Looker Analytics", "Adoption Modeling", "Jira / Confluence", "24/7 Operations", "Executive Funding"],
    thumbnail: "/templates/ai_coe_operating_model.png",
    promptSummary: "AI Center of Excellence (CoE) Operating Model: Exec Strategy & GAMP 5 -> Governance, Prompt Curation Loops & Looker Analytics -> AI CoE Operating Model -> Unified System View & Executive Funding."
  },
  {
    id: "mcp_context_gateway",
    name: "Model Context Protocol Gateway (MCP Context Gateway)",
    categoryId: "cloud_infra",
    categoryName: "Cloud & Infrastructure",
    badge: "Master Blueprint",
    isFlagship: true,
    isNew: true,
    whenToUse: "Use to build an enterprise Model Context Protocol (MCP) gateway connecting heterogeneous databases, object stores, vector search, and legacy APIs with schema validation, SOC 2 compliance filtering, and tool execution proxies.",
    bestFor: [
      "Model Context Protocol Gateway (To-Be / Operational Excellence Category)",
      "Universal Context Ingestion & Adapters (Cloud SQL, Cloud Storage, Vertex AI Vector Search, Cloud Logging, Legacy Systems)",
      "Context Schema Mapping Engine normalizing multi-source data payloads",
      "MCP Message Bus & Normalization Tier (MCP Schemas, Schema Validation, SOC 2 Compliance Filtering, IAM Access Control)",
      "Audit Trail Logging to BigQuery/Cloud Logging with dedicated SOC 2 Audit Trail",
      "Tool Proxies & Downstream Integration (Cognitive Arch / Agentic RAG into API Proxy, GCP Service Proxy, Legacy Tool Proxy)",
      "Actionable Tool Systems integration and Looker Studio usage/economics metrics",
      "Total Unified System View with Enterprise Context / Platform View and 24/7 Operations Support",
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
    badge: "Master Blueprint",
    isFlagship: true,
    isNew: true,
    whenToUse: "Use to model enterprise multi-tenant logical AI configuration boundaries, environment segregation across Dev/Test/Prod, Agent Designer topologies, and compliance enforcement within Gemini Enterprise.",
    bestFor: [
      "Product Plan - Logical AI Config (Tenant Architecture) (Logical AI Config | To-Be)",
      "Multi-tenant environment segregation across Development, Testing, and Production environments",
      "Logical AI Config Management Console and automated Config Updates APIs with Enterprise IAM",
      "Platform Orchestrator routing configurations to Gemini Enterprise Engine instances",
      "Production Workspace encapsulation with Logical AI Config (Model Selection Gemini 3.7 Flash, System Instructions, Memory, Tool Invocation)",
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
    name: "Hub-and-Spoke Agent Configuration Map",
    categoryId: "cloud_infra",
    categoryName: "Cloud & Infrastructure",
    badge: "Master Blueprint",
    isFlagship: true,
    isNew: true,
    whenToUse: "Use to configure and orchestrate enterprise multi-agent hub-and-spoke topologies with Gemini Enterprise, specialized sub-agent spokes (Support, Fulfillment, Knowledge), Logical UI configuration matrices, HITL gates, and 21 CFR Part 11 compliance audit trails.",
    bestFor: [
      "Hub-and-Spoke Agent Configuration Map (Logical AI Config Category)",
      "Orchestrator (Parent Agent) Hub with General Configuration (Gemini 3.7 Flash, Global System Instructions, Shared Context Window, Memory TTL)",
      "Multi-Agent Router / Dispatcher Logic with intent-based dispatch routing rules",
      "Shared Memory & State and Vertex AI Agent Runtime invocation patterns",
      "Sub-Agent 1: Customer Support with Zendesk API tool proxy and BigQuery / Vector Search Grounding",
      "Sub-Agent 2: Fulfillment SA with SAP ERP API and BigQuery / Cloud Storage Grounding",
      "Sub-Agent 3: Knowledge Base SA with GCS PDF/Doc Document Grounding",
      "Logical UI Configuration Matrix (Prompt editors, Rule editors, Knowledge Source selectors, API Config panels)",
      "Human-in-the-Loop (HITL) Gate with signed compliance updates",
      "21 CFR Part 11 Compliance Gate & Immutable Audit Trail E-Signature Ledger",
      "Persona Dashboards (AI Architect, Solutions Architect, Agent Economic & Runtime Metrics)"
    ],
    keyTech: ["Gemini 3.7 Flash", "Vertex AI Agent Runtime", "Multi-Agent Router", "BigQuery Grounding", "Vector Search", "Zendesk API", "SAP ERP API", "GCS Storage", "21 CFR Part 11 Ledger", "HITL Gate", "Looker Metrics"],
    thumbnail: "/templates/hub_and_spoke_agent_config.png",
    promptSummary: "Hub-and-Spoke Agent Config Map: Orchestrator Hub -> Intent Router -> 3 Domain Spokes (Support, Fulfillment, Knowledge) -> Logical UI Matrix -> HITL Gate -> 21 CFR Part 11 Audit Ledger."
  },
  {
    id: "unified_data_governance",
    name: "Unified Data Governance & Access Control",
    categoryId: "cloud_infra",
    categoryName: "Cloud & Infrastructure",
    badge: "Master Blueprint",
    isFlagship: true,
    isNew: true,
    whenToUse: "Use to design enterprise data governance, active metadata management, and Attribute-Based Access Control (ABAC) across Collibra, Dataplex, BigQuery, GCS Data Lakes, Dataflow, Dataproc, and Vertex AI with compliance scorecards (GDPR, HIPAA, GxP).",
    bestFor: [
      "Unified Data Governance & Access Control Architecture (To-Be State)",
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
    name: "DataOps & Anomaly Detection",
    categoryId: "modern_data",
    categoryName: "Modern Data & Analytics",
    badge: "Master Blueprint",
    isFlagship: true,
    isNew: true,
    whenToUse: "Use to design automated DataOps pipelines, real-time data quality testing (SODA), continuous data observability (Monte Carlo CARLO), active schema drift monitoring, and AI hallucination prevention across Google Cloud & the Modern Data Stack.",
    bestFor: [
      "DataOps & Anomaly Detection Architecture (To-Be State)",
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
    name: "Go-Live Cutover & War Room Runbook",
    categoryId: "cloud_infra",
    categoryName: "Cloud & Infrastructure",
    badge: "Master Blueprint",
    isFlagship: true,
    isNew: true,
    whenToUse: "Use to design Day-1 enterprise Go-Live cutover playbooks, war room communications (Slack/Teams, Opsgenie), minute-by-minute execution steps (Data Migration, DNS, MFE mount, AI agents), and automated rollback scripts.",
    bestFor: [
      "Go-Live Cutover & War Room Runbook (Day-1 Cutover Phase / To-Be State)",
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
    name: "Enterprise SRE & Observability Architecture",
    categoryId: "cloud_infra",
    categoryName: "Cloud & Infrastructure",
    badge: "Master Blueprint",
    isFlagship: true,
    isNew: true,
    whenToUse: "Use to design Day-2 enterprise operations, unified observability pipelines (distributed tracing, Cloud Logging, Cloud Monitoring), Datadog SIEM integration, Looker Studio dynamic dashboards, automated drift detection & runbooks, and incident management with RED alerts.",
    bestFor: [
      "Enterprise SRE & Observability Architecture (Day-2 Operations / To-Be State)",
      "Prerequisite Flow: Cloud-Native CI/CD (Git Repository, Jenkins, GitLab -> Deployment Triggers & Manifests)",
      "Observed Workloads (GCP Workload Ingress): Client Applications, Microservices (Cloud Run / GKE), AI Agents (Gemini 3.7 Flash), Data Tier (Cloud SQL, BigQuery) emitting logs, metrics, traces",
      "Unified Observability & Telemetry Pipeline (The Core): distributed tracing (cross-service correlation), Cloud Logging (log sinks, SOC 2 compliance auditing), Cloud Monitoring (metrics aggregation policies)",
      "Operational Excellence Control Plane: SREs, SLO/SLA Definition, Capacity Planning, Budget Alerts with SOC 2 policies ingress",
      "Actionable Operations & Reporting: Datadog Observability & SIEM Integration, Looker Studio dashboards (SLO Health Score, Capacity Utilization, Cost Anomalies, Error Budget Burn), personas (SRE, Ops Team, DevSecOps), Day-2 Ops Drift Detection & Automated Remediation, Automated Runbooks, and Incident Management (Cloud Monitoring Alerts, PagerDuty, RED alerts)"
    ],
    keyTech: ["Cloud Monitoring", "Cloud Logging", "Distributed Tracing", "Datadog SIEM", "Looker Studio", "PagerDuty", "Google Kubernetes Engine (GKE)", "Cloud Run", "Gemini 3.7 Flash AI Agents", "SOC 2 Type II"],
    thumbnail: "/templates/enterprise_sre_observability.png",
    promptSummary: "Enterprise SRE & Observability: CI/CD Prereq -> Observed Workloads (Client, Microservices, AI Agents, Data Tier) -> Unified Telemetry Pipeline (Tracing, Logging, Monitoring) -> Datadog SIEM & Looker Studio Dashboards -> Automated Drift Remediation & PagerDuty Incident Management."
  },
  {
    id: "data_residency_sovereign_map",
    name: "Data Residency & Sovereign Cloud Map",
    categoryId: "cloud_infra",
    categoryName: "Cloud & Infrastructure",
    badge: "Master Blueprint",
    isFlagship: true,
    isNew: true,
    whenToUse: "Use to design multi-region data sovereignty, regional boundary isolation (EU-West4 vs US-Central1), VPC Service Controls (VPC SC) perimeters, cross-border VPC-SC transfer bridges, and Looker Studio compliance reporting (GDPR, EU AI Act, HIPAA).",
    bestFor: [
      "Data Residency & Sovereign Cloud Map (To-Be State, Infra Provisioning Phase)",
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
    name: "Google Cloud Federated IAM, SSO & Zero-Trust Workload Identity",
    categoryId: "cloud_infra",
    categoryName: "Identity, Access & Zero-Trust",
    badge: "Master Blueprint",
    isFlagship: true,
    isNew: true,
    whenToUse: "Use for enterprise Google Cloud zero-trust architectures requiring Active Directory/Okta federation, Cloud Identity (IdP Core), BeyondCorp Context-Aware Access, Identity-Aware Proxy (IAP) ingress, Cloud IAM fine-grained RBAC, and GKE Workload Identity Federation.",
    bestFor: [
      "Google Cloud Federated IAM & SSO Reference Architecture",
      "External Federated IdP: Active Directory / Okta with SAML 2.0 and OIDC Federation",
      "Cloud Identity (IdP Core) directory sync and MFA/Security Key enforcement",
      "BeyondCorp Enterprise: Real-time Device Context (MDM/Endpoint) and Network Context (IP/Geo)",
      "Zero-Trust Ingress: Identity-Aware Proxy (IAP) with signed JWT header assertions (No VPN)",
      "Workload Identity Federation: KSA-to-GSA OIDC short-lived credential exchange for GKE, Cloud Storage & BigQuery"
    ],
    keyTech: ["Cloud Identity", "Identity-Aware Proxy (IAP)", "BeyondCorp Enterprise", "Access Context Manager", "Workload Identity", "Cloud IAM", "GKE", "BigQuery", "Cloud Storage"],
    thumbnail: "/templates/federated_iam_sso.png",
    promptSummary: "Federated IAM & Zero-Trust: Active Directory/Okta -> Cloud Identity -> BeyondCorp Context Engine -> IAP Ingress -> App Engine / Cloud Run / Compute Engine -> GKE Workload Identity -> BigQuery & Cloud Storage."
  },
  {
    id: "tech_ai_trism_guardrails",
    name: "AI TRiSM Security Guardrail Pipeline",
    categoryId: "cloud_infra",
    categoryName: "Cloud & Infrastructure",
    badge: "Master Blueprint",
    isFlagship: true,
    isNew: true,
    whenToUse: "Use to design comprehensive AI Trust, Risk, and Security Management (AI TRiSM) guardrail pipelines, adversarial check & prompt injection defenses, Cloud DLP PII scrubbing/masking, and EU AI Act compliance observability.",
    bestFor: [
      "AI TRiSM Security Guardrail Pipeline System (Bespoke Security Solution)",
      "Agent Runtime Platform prerequisite with core application logic and execution context",
      "Input Guardrail with adversarial checks, prompt injection detection, and jailbreak prevention",
      "Cloud DLP PII scrubbing & data masking for agent inputs and sensitive tokens",
      "TRiSM Threat Logging & Alerting Engine with real-time audit gRPC streaming",
      "Output Filter with hallucination defense, offensive content filtering, and PII leakage prevention",
      "Looker Studio TRiSM Observability Dashboard (PII Scrubbing Rates, Threat Deflections, Compliance Status)",
      "Cloud IAM, VPC-SC, and Secret Manager secure configuration flow driven by DevSecOps GitOps",
      "EU AI Act continuous compliance and CISO / AI Sec posture reviews"
    ],
    keyTech: ["Cloud DLP", "Vertex AI Guardrails", "TRiSM Threat Engine", "Looker Studio", "VPC-SC", "Secret Manager", "DevSecOps GitOps", "EU AI Act Compliance"],
    thumbnail: "/templates/tech_ai_trism_guardrails.png",
    promptSummary: "AI TRiSM Security Guardrail Pipeline: Agent Runtime Platform -> Input Guardrail (Prompt Injection Defense) -> Cloud DLP PII Masking -> TRiSM Threat Engine -> Output Filter (Hallucination Defense) -> Looker Studio Observability Dashboard -> EU AI Act Compliance."
  },
  {
    id: "tech_micro_frontends",
    name: "Micro-Frontend & UI Architecture",
    categoryId: "cloud_infra",
    categoryName: "Cloud & Infrastructure",
    badge: "Master Blueprint",
    isFlagship: true,
    isNew: true,
    whenToUse: "Use to design enterprise client-side architectures, micro-frontend orchestrators, browser runtime modules, WebSocket-enabled chat widgets, and high-performance CDN bundle delivery.",
    bestFor: [
      "Micro-Frontend & UI Architecture (Client Implementation - To-Be State)",
      "End User HTTP browser ingress & interaction patterns",
      "Enterprise App Frontend (Host App) container lifecycle",
      "Cloud CDN static bundle & asset distribution (HTTPS/HTTP2)",
      "Real-time WebSocket Server bi-directional messaging and presence",
      "Micro-Frontend & UI System with JS Orchestrator, browser runtime, and Chat Widget",
      "GraphQL / REST Backend APIs data fetching and action dispatching",
      "GCP Identity Platform (IdP) OIDC / JWT authentication token exchange",
      "External Logging & Observability System telemetry streaming (Cloud Logging)",
      "Frontend Engineers & SRE operational workflows"
    ],
    keyTech: ["React", "WebSockets", "Cloud CDN", "Micro-Frontend Orchestrator", "GraphQL / REST", "GCP Identity Platform", "Cloud Logging"],
    thumbnail: "/templates/tech_micro_frontends.png",
    promptSummary: "Micro-Frontend & UI Architecture: End Users -> Host App -> Cloud CDN -> MFE Orchestrator & Chat Widget <-> Real-Time WebSocket Server & GraphQL/REST APIs -> GCP Identity Platform -> Cloud Logging Observability."
  },
  {
    id: "secure_deployment_map",
    name: "Enterprise Secure Software Supply Chain & Deployment Map",
    categoryId: "cloud_infra",
    categoryName: "Cloud & Infrastructure",
    badge: "Canonical Master",
    isFlagship: true,
    isNew: true,
    whenToUse: "Use for end-to-end secure software supply chain architecture on Google Cloud Platform integrating Developer Workstations (Gemini Code Assist), Cloud Build CI/CD gating (SBOM, SAST, DAST), Artifact Registry with Binary Authorization signing, Cloud Deploy, and Production VPC with GKE mTLS, Cloud SQL via PSC, and Security Command Center.",
    bestFor: [
      "Enterprise Secure Deployment Topology Map (Platform Engineering)",
      "Developer check-in with Gemini Code Assist AI IDE Copilot",
      "Cloud Build CI/CD secure pipeline with Container Build & SBOM Creation",
      "Gemini-Assisted Static Scan (SAST) & Dynamic Analysis (DAST)",
      "Artifact Registry with Software Composition Analysis (SCA) & Binary Authorization signing",
      "Cloud Deploy promotion to Development, Staging, and Production",
      "Production VPC with External Load Balancer protected by Cloud Armor WAF",
      "Management Subnet with Bastion Host & Identity-Aware Proxy (IAP)",
      "GKE Production Cluster Subnet with mTLS encrypted Workload microservices",
      "Data Subnet with Cloud SQL & Cloud Storage via Private Service Connect",
      "Security Command Center (SCC) with Gemini-driven threat analysis & Assured Workloads"
    ],
    keyTech: ["Gemini Code Assist", "Cloud Build", "Artifact Registry", "Binary Authorization", "Cloud Deploy", "Cloud Armor WAF", "GKE Autopilot", "Private Service Connect", "Security Command Center"],
    thumbnail: "/templates/secure_deployment_map.png",
    promptSummary: "Secure Deployment Topology Map: Gemini Code Assist -> Cloud Build CI/CD Gating -> Artifact Registry & Binary Auth -> Cloud Deploy -> Production VPC with GKE mTLS & Security Command Center."
  },

  // =========================================================================
  // 3. MODERN DATA & ANALYTICS PIPELINES
  // =========================================================================
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
    id: "tech_fintech_payments",
    name: "Automated Personalized Financial Advising (Fintech)",
    categoryId: "data_pipelines",
    categoryName: "Data Pipelines",
    badge: "Master Blueprint",
    isFlagship: true,
    isNew: true,
    whenToUse: "Use when designing an automated personalized financial advising and relationship management platform with AI Financial Assistant, Gemini Pro Vision, Gemini High-Capability synthesis, and Looker analytics.",
    bestFor: [
      "Automated Personalized Financial Advising & Relationship Management",
      "Multimodal User Ingress (Voice, Text, Tax Returns & Financial Statement Uploads)",
      "Financial Assistant on Google App Engine & Firebase Auth",
      "Vertex AI with Gemini Pro Vision for tax/statement parsing & Dialogflow CX chat agent",
      "Gemini High-Capability model for custom financial reports & investment strategies",
      "Looker Performance Analytics, Cloud Run & Firebase Cloud Messaging automated alerts"
    ],
    keyTech: ["Gemini Pro Vision", "Gemini Ultra/High-Capability", "Vertex AI", "Dialogflow CX", "BigQuery", "Looker", "Firebase Auth", "Cloud Run"],
    thumbnail: "/templates/tech_fintech_payments.png",
    promptSummary: "Fintech Advising Platform: User Inputs -> Enterprise App on App Engine -> Ingestion (GCS/BigQuery/PubSub) -> Vertex AI & Gemini Platform -> Analytics & Actions (BigQuery/GCS/Looker/FCM)."
  },
  {
    id: "tech_genomics_clinical",
    name: "Pharma-Specific Genomics & Drug Discovery Pipeline",
    categoryId: "data_pipelines",
    categoryName: "Data Pipelines",
    badge: "Master Blueprint",
    isFlagship: true,
    isNew: true,
    whenToUse: "Use for pharma and biotech workflows involving AlphaFold protein structure design, GKE TPU compute clusters, CMEK data lakes, and Gemini Drug Discovery models.",
    bestFor: [
      "AlphaFold Pro & Differentiable Protein Design with 3D folding structures",
      "GKE Spot & TPU Compute Clusters for GATK variant calling & auto-tuning",
      "CMEK-Encrypted Data Lakes with Cloud SQL & BigQuery clinical trial optimizers",
      "Gemini Drug-Discovery Specialized Models (Pro, Ultra, Specialized-Bio)",
      "Transitive PSC routing to Google Managed Services (BigQuery, Vertex AI, Genomics AI, Looker Studio)"
    ],
    keyTech: ["AlphaFold Pro", "Gemini Bio Models", "GKE TPU Clusters", "CMEK Data Lake", "BigQuery Omics", "PSC Managed Services"],
    thumbnail: "/templates/tech_genomics_clinical.png",
    promptSummary: "Pharma Genomics Pipeline: On-Prem FASTQ -> AlphaFold Pro Design -> GKE TPU Cluster -> Gemini Drug-Discovery Platform -> PSC Managed Services."
  },
  {
    id: "tech_supply_chain",
    name: "Equipment Optimization & Industrial AI Agents (Manufacturing)",
    categoryId: "data_pipelines",
    categoryName: "Data Pipelines",
    badge: "Master Blueprint",
    isFlagship: true,
    isNew: true,
    whenToUse: "Use for industrial IoT manufacturing, equipment optimization, Manufacturing Data Engine (MDE), Gemini Multimodal Anomaly Detection, and closed-loop actionable buttons.",
    bestFor: [
      "Equipment Optimization & Autonomous Gemini AI Agents",
      "Manufacturing Shop Floor IoT Ingestion (Turbines, Sensors, Visual Cameras)",
      "Manufacturing Data Engine (MDE), Cloud Pub/Sub, Dataflow & BigQuery Warehouse",
      "Vertex AI Intelligence Core with Gemini Multimodal Anomaly Detection (Visual + Telemetry Fuzing)",
      "Gemini Predictive Maintenance Reasoning Agent & Agentic Conversational Orchestrator",
      "Enterprise App Cockpit, Looker Dashboards, and Actionable Buttons (Schedule Maint, Optimize Speed, Order Parts, Re-Train Model)"
    ],
    keyTech: ["Manufacturing Data Engine", "Gemini Multimodal", "Vertex AI Orchestration", "BigQuery", "Looker", "Cloud Pub/Sub", "Dataflow"],
    thumbnail: "/templates/tech_supply_chain.png",
    promptSummary: "Manufacturing AI Optimization: Shop Floor IoT -> Data Ingestion (Pub/Sub, Dataflow, MDE) -> Vertex AI & Gemini Intelligence Core -> Enterprise App Cockpit & Closed-Loop Actions."
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
  },

  // =========================================================================
  // 7. INDUSTRY SPECIALIZED SOLUTIONS (DEDICATED SEPARATE CATALOG)
  // =========================================================================
  {
    id: "tech_multimodal_ingestion",
    name: "Agentic Multi-Modal Ingestion Flow",
    categoryId: "data_pipelines",
    categoryName: "Data Pipelines",
    badge: "Canonical Master",
    isFlagship: true,
    isNew: true,
    whenToUse: "Use for Google Cloud End-to-End Agentic Multi-Modal Ingestion Flow powered by Gemini Platform and Enterprise Client Applications across text, audio, video, geospatial, and BigQuery knowledge bases.",
    bestFor: [
      "Agentic Multi-Modal Ingestion Flow (Platform Engineering)",
      "Custom Clients & Enterprise Mobile App multimodal ingress",
      "GCP Services: Cloud Storage GCS, Speech-to-Text API, Vertex Vision & Video Intelligence, Google Maps APIs",
      "Gemini-Powered Agentic Orchestrator (Gemini 3.7 Flash, Tooling & Function Calling)",
      "Vertex AI Embedding API, Vector Search, Semantic Search, and Gemini Reasoning Engine",
      "BigQuery Knowledge Base, Knowledge Graph, Automated Insights & Reports, Cloud Functions Alerting"
    ],
    keyTech: ["Gemini 3.7 Flash", "Vertex AI Vector Search", "BigQuery Knowledge Base", "Speech-to-Text", "Vision API", "Maps Platform", "Cloud Logging"],
    thumbnail: "/templates/tech_multimodal_ingestion.png",
    promptSummary: "Agentic Multi-Modal Ingestion Flow: Multi-Modal Ingress (Text, Audio, Video, Geo-Spatial) -> GCP Ingestion Services -> Gemini Agentic Orchestrator -> Vector Search & Semantic Reasoning -> BigQuery Knowledge Base & Annotations."
  },
  {
    id: "tech_genomics_clinical",
    name: "Pharma Genomics & Drug Discovery Pipeline",
    categoryId: "industry_solutions",
    categoryName: "Industry Solutions",
    badge: "Pharma Specialized",
    isFlagship: true,
    isNew: true,
    whenToUse: "Use for pharmaceutical bioinformatics, AlphaFold protein folding, GKE TPU compute clusters, CMEK data lakes, and Gemini Drug Discovery models.",
    bestFor: [
      "AlphaFold Pro Differentiable Protein Design with 3D folding structures",
      "GKE Spot & TPU Compute Clusters for GATK variant calling",
      "CMEK-Encrypted Data Lakes with Cloud SQL & BigQuery clinical trial optimizers",
      "Gemini Drug-Discovery Specialized Models (Pro, Ultra, Specialized-Bio)",
      "Transitive PSC routing to Google Managed Services (BigQuery, Vertex AI, Looker Studio)"
    ],
    keyTech: ["AlphaFold Pro", "Gemini Bio Models", "GKE TPU Clusters", "CMEK Data Lake", "BigQuery Omics", "PSC Transitive"],
    thumbnail: "/templates/tech_genomics_clinical.png",
    promptSummary: "Pharma Genomics Pipeline: On-Prem FASTQ -> AlphaFold Pro Design -> GKE TPU Cluster -> Gemini Drug-Discovery Platform -> PSC Managed Services."
  },
  {
    id: "tech_supply_chain",
    name: "QuantumFlow Global Autonomous Supply Chain",
    categoryId: "industry_solutions",
    categoryName: "Industry Solutions",
    badge: "Supply Chain",
    isFlagship: true,
    isNew: true,
    whenToUse: "Use for global autonomous supply chain logistics, IoT fleet telemetry, Dataflow sliding-window simulation, Spanner Graph global inventory ledgers, and automated carrier dispatch.",
    bestFor: [
      "Cloud Pub/Sub & mTLS edge telemetry ingestion (500k+ assets)",
      "Cloud Dataflow sliding session window simulation engine",
      "Cloud Spanner Multi-Region Global Inventory Graph (GQL, 99.999% SLA)",
      "Vertex AI Multimodal Predictive ETA Forecaster & Weather Disruption AI",
      "Logistics Control Tower 3D Cockpit, Automated Carrier Dispatch & SAP S/4HANA ERP Bridge"
    ],
    keyTech: ["Cloud Pub/Sub", "Cloud Dataflow", "Spanner Graph", "Vertex AI ETA", "BigQuery Lakehouse", "SAP S/4HANA", "Control Tower 3D"],
    thumbnail: "/templates/tech_supply_chain.png",
    promptSummary: "Supply Chain Digital Twin: IoT Ingress -> Dataflow Simulation -> Spanner Graph -> Vertex AI ETA Forecaster -> Control Tower 3D -> Carrier Dispatch & SAP ERP."
  },
  {
    id: "tech_fintech_payments",
    name: "ApexPay Real-Time ISO 20022 Payments & Clearing",
    categoryId: "industry_solutions",
    categoryName: "Industry Solutions",
    badge: "FinTech Banking",
    isFlagship: true,
    isNew: true,
    whenToUse: "Use for PCI-DSS compliant real-time payment ledgers, ISO 20022 message transformation, sub-10ms fraud scoring, and FedNow / RTP settlement rails.",
    bestFor: [
      "Sub-10ms AI fraud scoring & anomaly detection on streaming transactions",
      "Immutable double-entry payment ledger with Cloud Spanner global consistency",
      "Multi-rail settlement integration (FedNow, RTP, ACH, SWIFT)",
      "PCI-DSS Level 1 compliance, HSM encryption, and regulatory audit reporting"
    ],
    keyTech: ["ISO 20022 Bus", "Cloud Spanner", "Real-Time Fraud Engine", "Double-Entry Ledger", "FedNow / RTP Rails", "PCI-DSS HSM"],
    thumbnail: "/templates/tech_fintech_payments.png",
    promptSummary: "FinTech Payments Architecture: Ingress -> ISO 20022 Bus -> Real-Time Fraud Engine -> Double-Entry Ledger -> Settlement Rails."
  },
  {
    id: "value_stream_map",
    name: "Enterprise Value Stream Map (VSM)",
    categoryId: "business_strategy",
    categoryName: "Business Strategy & Alignment",
    badge: "Lean VSM",
    isFlagship: true,
    isNew: true,
    whenToUse: "Use for visualizing end-to-end customer value streams, lead time vs process time (PT/LT), rolled first pass yield (%C/A), and bottleneck elimination.",
    bestFor: [
      "Customer demand & order processing stream visualization",
      "Automated Jira / ServiceNow lead time & process time calculation",
      "Gemini 3.7 Flash AI bottleneck detection & root cause diagnosis",
      "Real-time value-added vs non-value-added time ladder ratio calculation",
      "Executive scorecard with Rolled First Pass Yield (%C/A) analytics"
    ],
    keyTech: ["Gemini 3.7 Flash", "Dataflow Streaming VSM", "BigQuery Analytics", "Looker VSM Cockpit", "Jira/ServiceNow API"],
    thumbnail: "/templates/value_stream_map.png",
    promptSummary: "Enterprise Value Stream Map: Customer Ingress -> Order & Requirements -> Automated AI Build/Test -> Deployment Pipeline -> Customer Delivery & Lead Time Timeline."
  },
  {
    id: "asis_vs_tobe_process_flow",
    name: "As-Is vs To-Be Modernization Process Flow",
    categoryId: "business_strategy",
    categoryName: "Business Strategy & Alignment",
    badge: "Process Modernization",
    isFlagship: true,
    isNew: true,
    whenToUse: "Use for executive side-by-side comparison of legacy manual spaghetti processes vs modern Google Cloud automated target architectures.",
    bestFor: [
      "Side-by-side As-Is (Legacy Red) vs To-Be (Google Cloud Green) process comparison",
      "Quantifying pain points: manual spreadsheets, batch silos, multi-day delays",
      "Highlighting target wins: Cloud Run, Vertex AI Gemini 3.7, BigQuery Lakehouse",
      "Executive transformation ROI metrics: 92% cycle time reduction, 100% compliance"
    ],
    keyTech: ["Gemini 3.7 Flash", "Cloud Run", "Vertex AI", "BigQuery", "Eventarc", "Looker Studio"],
    thumbnail: "/templates/asis_vs_tobe_process_flow.png",
    promptSummary: "As-Is vs To-Be Modernization Flow: Top As-Is Legacy Lane (Manual Silos) vs Bottom To-Be Modern Lane (Serverless GCP + Gemini AI) with KPI Delta Callouts."
  },
  {
    id: "legacy_data_dependency_map",
    name: "Google Cloud Discovery & Assessment: Legacy Silos to Modern Migration Waves (P1-APP-L-01)",
    categoryId: "cloud_infra",
    categoryName: "Cloud & Zero-Trust Infrastructure",
    badge: "Discovery",
    isFlagship: true,
    isNew: true,
    whenToUse: "Use to assess on-prem legacy silos (Mainframe, Oracle RAC, SAP ECC, Shadow DBs), spaghetti integration matrices, StratoZone Discovery, Sensitive Data Protection (DLP), and 4-wave cloud migration roadmap.",
    bestFor: [
      "On-prem legacy silos and spaghetti integration matrix mapping",
      "StratoZone Collector Appliance & Migration Center TCO profiling",
      "Sensitive Data Protection (DLP) automated PII classification",
      "Gemini 3.7 Flash 4-wave migration plan (Rehost, Replatform, Refactor, Retire)"
    ],
    keyTech: ["StratoZone", "Google Cloud Migration Center", "Sensitive Data Protection (DLP)", "Compute Engine", "Database Migration Service (DMS)", "Cloud Run", "Gemini 3.7 Flash"],
    thumbnail: "/templates/legacy_data_dependency_map.png",
    promptSummary: "Discovery & Assessment: On-Prem Legacy Silos -> Spaghetti Matrix -> StratoZone & Migration Center -> 4-Wave Modern Migration Plan."
  },
  {
    id: "gcp_landing_zone_vpc",
    name: "Google Cloud Infrastructure: Landing Zone & Shared VPC Topology (P4-SEC-P-02)",
    categoryId: "cloud_infra",
    categoryName: "Cloud & Zero-Trust Infrastructure",
    badge: "Networking",
    isFlagship: true,
    isNew: true,
    whenToUse: "Use for physical zero-trust network fabric with 100G Dedicated Interconnect, Cloud Router BGP, Hub-and-Spoke Shared VPC, PSC Hub 10.100.0.0/24, GKE Autopilot, and VPC-SC perimeter.",
    bestFor: [
      "Corporate DC & 100G Dedicated Interconnect with MACsec Layer 2 Encryption",
      "Shared VPC Host Project Hub with Cloud Router BGP, Cloud NAT, and Cloud Armor WAF",
      "Production Workload Spokes with GKE Autopilot, Serverless Direct VPC, and PSA",
      "Zero-Trust Perimeter with VPC-SC, Cloud KMS HSM Dual Rings, SCC, and Org Policies"
    ],
    keyTech: ["Shared VPC Host Project", "100G Dedicated Interconnect", "Cloud Router BGP", "Private Service Connect (PSC)", "Cloud Armor WAF", "GKE Autopilot", "VPC-SC Perimeter", "Cloud KMS HSM", "Security Command Center", "Gemini 3.7 Flash"],
    thumbnail: "/templates/gcp_landing_zone_vpc.png",
    promptSummary: "GCP Landing Zone & Shared VPC: On-Prem & Transit 100G -> Shared VPC Host Project Hub -> Workload Spoke Projects -> Zero-Trust Perimeter (VPC-SC) -> Observability & Management."
  },
  {
    id: "enterprise_agent_runtime",
    name: "Enterprise Agent Runtime Platform (P4-AI-P-03)",
    categoryId: "ai_agentic",
    categoryName: "AI & Agentic Systems Architecture",
    badge: "Agent Runtime",
    isFlagship: true,
    isNew: true,
    whenToUse: "Use for physical sandboxed compute runtime on GKE Autopilot with Agent Gateway, MCP tool worker pods, Model Armor prompt interceptor, and Vertex AI TPU v5e serving.",
    bestFor: [
      "GKE Autopilot sandboxed compute with gVisor container kernel isolation",
      "Agent Gateway OIDC authentication & tenant quota management",
      "Model-Context Protocol (MCP) tool worker pods with ephemeral scratchpad disks",
      "Model Armor real-time prompt injection filtering and Vertex AI TPU v5e inference"
    ],
    keyTech: ["GKE Autopilot (gVisor)", "Model Armor", "Vertex AI TPU v5e", "MCP Gateway", "Memorystore Redis", "Gemini 3.7 Flash"],
    thumbnail: "/templates/enterprise_agent_runtime.png",
    promptSummary: "Enterprise Agent Runtime: Ingress LB -> Agent Gateway & Model Armor -> GKE Autopilot Sandboxed Workers (MCP) -> Vertex AI TPU Serving & Telemetry."
  },
  {
    id: "ai_agent_approval_workflow",
    name: "AI Agent Approval Workflow & Human-in-the-Loop Governance (P4-GOV-L-05)",
    categoryId: "devsecops",
    categoryName: "DevSecOps & Platform Engineering",
    badge: "AI Governance",
    isFlagship: true,
    isNew: true,
    whenToUse: "Use for multi-stage AI agent review, automated red-teaming, Legal/AppSec human approval gates, Binary Authorization KMS attestation, and signed production serving.",
    bestFor: [
      "Developer IDE agent submission & prompt artifact manifest packaging",
      "Automated SAST & Gemini 3.7 Flash adversarial red-teaming scans",
      "Human-in-the-Loop (HITL) approval portal for Legal, Security & Product Leads",
      "Binary Authorization Cloud KMS cryptographic signing & signed GKE deployment"
    ],
    keyTech: ["Vertex AI Evaluation", "Binary Authorization", "Cloud KMS HSM", "Cloud Tasks HITL", "GKE Autopilot", "Gemini 3.7 Flash"],
    thumbnail: "/templates/ai_agent_approval_workflow.png",
    promptSummary: "AI Agent Approval Workflow: Developer IDE -> Automated Red-Teaming -> Human Governance Approvals -> Binary Authorization Signing -> Signed GKE Serving."
  },
  {
    id: "incident_triage_swimlane",
    name: "Incident Triage & Escalation Swimlane (P5-GOV-L-04)",
    categoryId: "devsecops",
    categoryName: "DevSecOps & Platform Engineering",
    badge: "SRE Incident Ops",
    isFlagship: true,
    isNew: true,
    whenToUse: "Use for 3-tier SRE incident triage: L1 Automated Alerting & Gemini Cloud Assist RCA, L2 Auto-Remediation Runbooks, and L3 Incident Commander War Room bridge.",
    bestFor: [
      "L1 Automated Alerting with Cloud Monitoring & Gemini Cloud Assist RCA",
      "L2 Auto-Remediation Runbooks via Cloud Workflows & Terraform Rollbacks",
      "L3 Incident Commander War Room bridge with PagerDuty & Slack War Room",
      "Immutable post-mortem incident dossier generation in BigQuery"
    ],
    keyTech: ["Cloud Monitoring", "Gemini Cloud Assist RCA", "Cloud Workflows Auto-Remediation", "PagerDuty", "BigQuery Incident Ledger"],
    thumbnail: "/templates/incident_triage_swimlane.png",
    promptSummary: "Incident Triage Swimlane: L1 Automated Alerting & Gemini RCA -> L2 Auto-Remediation Workflow -> L3 War Room Bridge & Post-Mortem Dossier."
  },
  {
    id: "ecommerce_retail",
    name: "OmniChannel Intelligent E-Commerce Platform (IND-RETAIL-04)",
    categoryId: "industry_solutions",
    categoryName: "Industry Specialized Solutions",
    badge: "Retail AI",
    isFlagship: true,
    isNew: true,
    whenToUse: "Use for enterprise retail architectures featuring Vertex AI Search for Retail, AlloyDB pgvector discovery, Cloud Spanner global cart, and BigQuery Lakehouse.",
    bestFor: [
      "Omni-channel shopper ingress (Next.js PWA, Mobile, POS kiosks)",
      "Vertex AI Search for Retail & Gemini 3.7 Flash Conversational Concierge",
      "AlloyDB pgvector sub-10ms visual product similarity indexing",
      "Cloud Spanner multi-region ACID transactional cart & BigQuery Customer 360"
    ],
    keyTech: ["Vertex AI Search for Retail", "AlloyDB pgvector", "Cloud Spanner", "Cloud Run Microservices", "BigQuery Lakehouse", "Gemini 3.7 Flash"],
    thumbnail: "/templates/ecommerce_retail.png",
    promptSummary: "OmniChannel E-Commerce: Shopper Ingress -> Cloud Run Retail Microservices -> Vertex AI Retail Search & Gemini AI -> Cloud Spanner & BigQuery Lakehouse."
  },
  {
    id: "hr_talent_ai",
    name: "WorkforceAI HR Talent & People Intelligence (IND-HR-06)",
    categoryId: "industry_solutions",
    categoryName: "Industry Specialized Solutions",
    badge: "HR Talent AI",
    isFlagship: true,
    isNew: true,
    whenToUse: "Use for enterprise human capital AI platforms featuring Document AI resume parsing, AlloyDB pgvector skills graph, Gemini 3.7 Flash candidate matching, and bias audits.",
    bestFor: [
      "ATS / HRIS connectors (Workday, SuccessFactors, Greenhouse)",
      "Document AI custom resume parser & Cloud DLP blind screening filter",
      "AlloyDB pgvector enterprise skills taxonomy graph (O*NET aligned)",
      "Gemini 3.7 Flash multi-factor candidate fit evaluation & Looker Recruiter Cockpit"
    ],
    keyTech: ["Document AI Resume Parser", "Cloud DLP", "AlloyDB pgvector Skills Graph", "Gemini 3.7 Flash Matcher", "Looker Recruiter Cockpit"],
    thumbnail: "/templates/hr_talent_ai.png",
    promptSummary: "WorkforceAI HR Intelligence: ATS Ingress -> Document AI Resume Parser -> AlloyDB Skills Graph -> Gemini 3.7 Candidate Matcher -> Looker Recruiter Cockpit."
  },
  {
    id: "smart_factory_iot",
    name: "Smart Factory Industry 4.0 IoT & Predictive Maintenance (IND-MFG-05)",
    categoryId: "industry_solutions",
    categoryName: "Industry Specialized Solutions",
    badge: "Industry 4.0",
    isFlagship: true,
    isNew: true,
    whenToUse: "Use for industrial edge-to-cloud IoT platforms with Google Distributed Cloud (GDC) Edge, Cloud Dataflow streaming, Bigtable time-series, Vertex AI anomaly detection, and Looker OEE cockpit.",
    bestFor: [
      "Shop floor PLCs & GDC Edge gateway with OPC-UA / MQTT protocol broker",
      "Cloud Pub/Sub & Cloud Dataflow real-time telemetry streaming (500k+ events/s)",
      "Cloud Bigtable sub-10ms time-series store & Dataplex manufacturing data mesh",
      "Gemini 3.7 Flash multimodal anomaly fuser (thermal video + spindle waveforms) & SAP PM work order dispatch"
    ],
    keyTech: ["GDC Edge Gateway", "Cloud Pub/Sub", "Cloud Dataflow", "Cloud Bigtable", "Gemini 3.7 Anomaly Fuser", "Looker OEE Cockpit", "SAP PM"],
    thumbnail: "/templates/smart_factory_iot.png",
    promptSummary: "Smart Factory IoT: Shop Floor PLCs -> GDC Edge -> Cloud Dataflow Streaming -> Cloud Bigtable -> Gemini Anomaly AI -> Looker OEE & SAP PM."
  },
  {
    id: "c4_component_lld",
    name: "C4 Level 3 Component Diagram & Microservice LLD (ARCH-C4-03)",
    categoryId: "microservices_flow",
    categoryName: "Microservices & Application Flow",
    badge: "C4 L3 LLD",
    isFlagship: true,
    isNew: true,
    whenToUse: "Use for C4 Model Level 3 container internal component designs: REST controllers, JWT auth interceptors, SAGA domain services, repositories, Redis cache, and cloud DBs.",
    bestFor: [
      "C4 Level 3 component breakdown of containerized microservices",
      "REST & gRPC ingress controllers with DTO validation",
      "SAGA pattern domain services & transactional outbox event publishing",
      "PostgreSQL repository pattern, Redis caching, and AlloyDB / PubSub integration"
    ],
    keyTech: ["Cloud Run Microservices", "JWT Auth Interceptor", "SAGA Domain Service", "Outbox Pattern", "AlloyDB PostgreSQL", "Gemini 3.7 Flash"],
    thumbnail: "/templates/c4_component_lld.png",
    promptSummary: "C4 Level 3 Component LLD: Ingress Controllers -> Auth Interceptors -> SAGA Domain Services -> Repositories & Outbox -> AlloyDB & Pub/Sub."
  },
  {
    id: "bpmn_process_workflow",
    name: "BPMN 2.0 Business Process & Autonomous Workflow (ARCH-BPMN-01)",
    categoryId: "business_strategy",
    categoryName: "Business Strategy & Alignment",
    badge: "BPMN 2.0",
    isFlagship: true,
    isNew: true,
    whenToUse: "Use for standard BPMN 2.0 business workflows with start/end events, user tasks, Gemini 3.7 Flash AI service tasks, XOR branching gateways, and ERP backend posting.",
    bestFor: [
      "BPMN 2.0 standard notation: Pool, User Persona, Agentic AI & ERP Lanes",
      "Start / End events, User Tasks, and Service Tasks",
      "Exclusive XOR decision gateways with conditional branch routing",
      "Gemini 3.7 Flash automated fraud scoring & SAP ERP financial posting"
    ],
    keyTech: ["BPMN 2.0 Engine", "User Persona Lane", "Gemini 3.7 Service Task", "XOR Branching Gateways", "SAP ERP Posting"],
    thumbnail: "/templates/bpmn_process_workflow.png",
    promptSummary: "BPMN 2.0 Process Workflow: User Submit -> Document AI OCR -> Gemini Fraud Scorer -> XOR Risk Gateway -> Auto-Approve -> SAP ERP Post -> End Event."
  },
  {
    id: "threat_modeling_stride",
    name: "STRIDE Zero-Trust Threat Model & Boundary Map (ARCH-SEC-01)",
    categoryId: "devsecops",
    categoryName: "DevSecOps & Platform Engineering",
    badge: "STRIDE Threat Model",
    isFlagship: true,
    isNew: true,
    whenToUse: "Use for STRIDE threat modeling mapping attacks (Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege) to Google Cloud defenses.",
    bestFor: [
      "STRIDE threat taxonomy mapping across 4 zero-trust security zones",
      "Adversary threat actors & prompt injection / DDoS attack vector mapping",
      "DMZ defenses: Cloud Armor WAF, Model Armor AI Shield & Identity-Aware Proxy",
      "Trust boundary: GKE gVisor enclaves, Workload Identity, VPC-SC, and Cloud KMS HSM"
    ],
    keyTech: ["Cloud Armor WAF", "Model Armor", "Identity-Aware Proxy", "GKE gVisor", "Workload Identity", "VPC-SC Perimeter", "Cloud KMS HSM"],
    thumbnail: "/templates/threat_modeling_stride.png",
    promptSummary: "STRIDE Threat Model: Untrusted Attack Vectors -> DMZ & Model Armor -> Sandboxed GKE Compute -> Secure Data Enclave & VPC-SC Perimeter."
  },
  {
    id: "data_lineage_provenance",
    name: "Column-Level Data Lineage & Provenance Graph (ARCH-DAT-01)",
    categoryId: "data_pipelines",
    categoryName: "Modern Data & Analytics Pipelines",
    badge: "Data Governance",
    isFlagship: true,
    isNew: true,
    whenToUse: "Use for end-to-end column-level data lineage tracing from raw bronze tables through Dataform / dbt silver models to curated gold fact/dimension marts and Looker BI metrics.",
    bestFor: [
      "Bronze (Raw) -> Silver (Dataform/dbt Cleaned) -> Gold (Curated Marts) lineage flow",
      "Column-level transformation formula and type casting tracking",
      "Dataplex automatic lineage discovery from GoogleSQL query execution plans",
      "Upstream schema change impact analysis and BCBS 239 / GDPR audit compliance export"
    ],
    keyTech: ["BigQuery", "Dataform / dbt", "Dataplex Lineage Auto-Discovery", "Sensitive Data Protection DLP", "BI Engine", "Looker Studio"],
    thumbnail: "/templates/data_lineage_provenance.png",
    promptSummary: "Column-Level Data Lineage: Raw Bronze Tables -> Dataform Silver Models -> Curated Gold Marts -> Looker BI Metrics & Gemini 3.7 RAG."
  },
  {
    id: "healthcare_fhir_hl7",
    name: "Google Cloud Healthcare & Life Sciences FHIR / HL7 Pipeline (IND-HEALTH-01)",
    categoryId: "industry_solutions",
    categoryName: "Industry Specialized Solutions",
    badge: "Healthcare & Life Sciences",
    isFlagship: true,
    isNew: true,
    whenToUse: "Use for HIPAA-compliant healthcare interoperability featuring Cloud Healthcare API (HL7v2/FHIR R4/DICOM), DLP PHI de-identification, OMOP BigQuery lakehouse, and Gemini 3.7 Flash clinical insights.",
    bestFor: [
      "Hospital EHR ingress: HL7v2 ADT/ORU via MLLP, FHIR R4 bundles, DICOM imaging",
      "Cloud Healthcare API with automatic HL7-to-FHIR transformation",
      "Sensitive Data Protection (DLP) 18 HIPAA Safe Harbor PHI de-identification",
      "Gemini 3.7 Flash clinical reasoner, drug interaction safety, and OMOP BigQuery lakehouse"
    ],
    keyTech: ["Cloud Healthcare API", "HL7v2 & FHIR R4", "DLP PHI Redaction", "Cloud KMS HSM CMEK", "Gemini 3.7 Clinical Reasoner", "OMOP CDM BigQuery"],
    thumbnail: "/templates/healthcare_fhir_hl7.png",
    promptSummary: "Healthcare FHIR / HL7 Pipeline: Hospital EHR Ingress -> Cloud Healthcare API -> DLP PHI De-Identification -> Gemini Clinical AI -> OMOP BigQuery Lakehouse & Physician Cockpit."
  }
];

