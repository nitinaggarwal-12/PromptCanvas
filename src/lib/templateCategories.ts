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
    name: "Multi-Region Active-Passive DR",
    categoryId: "cloud_infra",
    categoryName: "Cloud & Infrastructure",
    badge: "Reliability Topology",
    whenToUse: "Use when designing multi-region business continuity and failover architectures with health-checked global DNS routing and cross-region database replication.",
    bestFor: [
      "Active-Passive multi-region failover",
      "Cloud DNS health-check failover policies",
      "Primary (us-central1) & Secondary (us-east4) clusters",
      "Cross-region database asynchronous replication"
    ],
    keyTech: ["Cloud DNS Failover", "Global HTTPS LB", "Cloud Spanner / Cloud SQL", "Multi-Region GKE", "Cloud Monitoring"],
    thumbnail: "/templates/tech_multi_region_dr.png",
    promptSummary: "GCP Disaster Recovery: Global DNS Routing -> Primary & Standby LB -> Regional Compute Clusters -> Cross-Region Data Sync."
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
