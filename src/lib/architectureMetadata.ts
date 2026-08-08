export interface ArchitectureMeta {
  id: string;
  title: string;
  category: string;
  useCase: string;
  businessUseCase: string;
  primaryActors: string;
  targetOutcomes: string;
  desc: string;
}

export const ARCHITECTURE_METADATA_MAP: Record<string, ArchitectureMeta> = {
  conceptual_diagram: {
    id: "conceptual_diagram",
    title: "Conceptual Diagram",
    category: "Executive & Business Strategy",
    useCase: "ENTERPRISE PLATFORM",
    businessUseCase: "Automate cross-silo data synthesis, document analysis, and strategic AI workflows to accelerate operational decision-making.",
    primaryActors: "Executive Leadership, Chief Architects, Strategic Analysts",
    targetOutcomes: "Accelerated Time-to-Value, 80% Reduction in Manual Research, Real-Time Strategic Insights",
    desc: "High-level 3-stage business architecture showing ingestion, processing hub, and strategic outcomes."
  },
  unified_system_view: {
    id: "unified_system_view",
    title: "Total Unified System View",
    category: "Executive & Business Strategy",
    useCase: "MASTER ENTERPRISE BLUEPRINT",
    businessUseCase: "Master enterprise blueprint consolidating data ingestion, cognitive agent RAG, MLOps training, VPC security perimeters, and governance into a single reference view.",
    primaryActors: "Chief Enterprise Architect, Lead Scientists, Executive Leadership",
    targetOutcomes: "Complete Architectural Alignment, Single Blueprint for Training & Onboarding, Risk Reduction",
    desc: "Total integrated architecture consolidating data foundation, AI lifecycle, topology, and governance."
  },
  business_agent_gov_hitl: {
    id: "business_agent_gov_hitl",
    title: "Human-in-the-Loop AI Governance",
    category: "Executive & Business Strategy",
    useCase: "ENTERPRISE AI RISK & GOVERNANCE",
    businessUseCase: "Confidence-tiered autonomous agent escalation flow with supervisory cross-verification, human sign-off workbenches, and cryptographic audit certificates.",
    primaryActors: "AI Ethics Board, Compliance Officers, Lead Architects",
    targetOutcomes: "100% Audit Readiness, Zero Unsupervised Failures, Regulatory Compliance (EU AI Act)",
    desc: "Human-in-the-Loop governance state machine with confidence escalation and cryptographic sign-off."
  },
  business_agent_governance_hitl: {
    id: "business_agent_gov_hitl",
    title: "Human-in-the-Loop AI Governance",
    category: "Executive & Business Strategy",
    useCase: "ENTERPRISE AI RISK & GOVERNANCE",
    businessUseCase: "Confidence-tiered autonomous agent escalation flow with supervisory cross-verification, human sign-off workbenches, and cryptographic audit certificates.",
    primaryActors: "AI Ethics Board, Compliance Officers, Lead Architects",
    targetOutcomes: "100% Audit Readiness, Zero Unsupervised Failures, Regulatory Compliance (EU AI Act)",
    desc: "Human-in-the-Loop governance state machine with confidence escalation and cryptographic sign-off."
  },
  erd: {
    id: "erd",
    title: "Dimensional Data Model - ERD",
    category: "Data & Lakehouse Architecture",
    useCase: "DIMENSIONAL DATA MODEL",
    businessUseCase: "Enterprise dimensional schema uniting core transactional facts, dimension tables, feature stores, and pgvector embeddings.",
    primaryActors: "Data Engineers, Database Architects, ML Engineers",
    targetOutcomes: "Single Source of Truth, Standardized Data Lineage, High-Performance Vector & Relational Querying",
    desc: "Defines core BI dimensions, fact tables, MLOps feature stores, and GenAI vector search semantic layers."
  },
  agentic_rag: {
    id: "agentic_rag",
    title: "Cognitive Architecture / Agentic RAG",
    category: "AI & Cognitive Systems",
    useCase: "COGNITIVE AGENTIC RAG SYSTEM",
    businessUseCase: "Multi-agent ReAct orchestration loop enabling natural language querying of unstructured document corpora with semantic retrieval.",
    primaryActors: "AI Architects, Lead Scientists, ML Engineers",
    targetOutcomes: "Context-Aware Synthesis, Citation-Backed Answers, Zero-Hallucination Guardrails",
    desc: "Orchestrates multi-agent ReAct reasoning loops, Vertex AI vector search, and enterprise knowledge tools."
  },
  sequence_diagram: {
    id: "sequence_diagram",
    title: "Micro Dynamic UML Sequence Diagram",
    category: "Backend & Systems Architecture",
    useCase: "SYSTEM EXECUTION SEQUENCE FLOW",
    businessUseCase: "Step-by-step chronological execution flow of a system query, illustrating prompt injection scanning, private VPC-SC gRPC calls, vector retrieval, and LLM reasoning.",
    primaryActors: "API Architects, Security Auditors, Backend Engineers",
    targetOutcomes: "Sub-Second Latency Enforcement, VPC-SC Zero-Trust Compliance, End-to-End Audit Traceability",
    desc: "Chronological API execution flow illustrating agent reasoning, context retrieval, and VPC security checks."
  },
  data_ai_pipeline: {
    id: "data_ai_pipeline",
    title: "Data & AI Pipeline",
    category: "Data & Lakehouse Architecture",
    useCase: "ENTERPRISE DATA & AI PLATFORM",
    businessUseCase: "Unified Data Flow Diagram (DFD) and MLOps pipeline transforming raw unstructured data into feature stores, model training loops, and automated reports.",
    primaryActors: "Data Engineers, ML Engineers, Data Scientists",
    targetOutcomes: "Automated Data Ingestion, Managed Feature Store Lineage, Continuous Model Retraining",
    desc: "Integrates raw data ingestion (DFD), dbt feature engineering, managed feature store, and MLOps lifecycle."
  },
  secure_deployment_map: {
    id: "secure_deployment_map",
    title: "Secure Deployment Topology Map",
    category: "Cloud Infrastructure & Networking",
    useCase: "ENTERPRISE SECURITY TOPOLOGY",
    businessUseCase: "Enterprise security perimeter isolating proprietary data inside VPC Service Controls with Cloud Armor L7 WAF edge defense and IAM RBAC controls.",
    primaryActors: "Chief Information Security Officer (CISO), Cloud Architects, Security Operations",
    targetOutcomes: "Zero-Trust Compliance, Air-Gapped Data Isolation, Protection Against Data Exfiltration",
    desc: "Maps Cloud Armor L7 WAF edge protection, API Gateway rate-limiting, and isolated private subnets within VPC-SC."
  },
  devops_cicd_pipeline: {
    id: "devops_cicd_pipeline",
    title: "DevSecOps Polyrepo CI/CD Pipeline",
    category: "DevSecOps & Platform Engineering",
    useCase: "ENTERPRISE DEVOPS GITOPS",
    businessUseCase: "Polyrepo DevSecOps GitOps pipeline automating unit tests, data validation, container vulnerability scans, and canary deployments across cloud environments.",
    primaryActors: "DevSecOps Engineers, SREs, Platform Engineers",
    targetOutcomes: "Zero-Downtime Canary Rollouts, Automated Vulnerability Scanning, Infrastructure-as-Code Governance",
    desc: "Polyrepo GitOps workflow integrating unit tests, vulnerability scanning, Terraform deployment, and canary checks."
  },
  tech_multi_agent_langgraph: {
    id: "tech_multi_agent_langgraph",
    title: "LangGraph Stateful Multi-Agent DAG",
    category: "AI & Cognitive Systems",
    useCase: "MULTI-AGENT AUTONOMOUS PLATFORM",
    businessUseCase: "Master supervisor DAG orchestrator routing tasks to parallel worker clusters with sandboxed code execution, human approval gates, and state checkpoints.",
    primaryActors: "AI Systems Engineers, Autonomous Agent Developers, Platform Architects",
    targetOutcomes: "Parallel Execution Throughput, Deterministic State Persistence, Safe Sandboxed Execution",
    desc: "Stateful Directed Graph multi-agent architecture with sandboxed kernel and checkpoint store."
  },
  tech_agent_harness_runtime: {
    id: "tech_agent_harness_runtime",
    title: "Enterprise Agent Runtime Platform",
    category: "AI & Cognitive Systems",
    useCase: "AGENT HARNESS RUNTIME KERNEL",
    businessUseCase: "Production enterprise AI agent harness runtime platform combining LiteLLM router, MCP tool protocol, gVisor/E2B sandboxed code execution, context compactor, OTel tracing, and self-healing reflection loops.",
    primaryActors: "AI Chief Architects, Platform Infrastructure Engineers, CISO & Compliance Officers",
    targetOutcomes: "Isolated Untrusted Code Execution, 90% Cost Cut via Prompt Caching, SOC2/HIPAA Audit Attestation",
    desc: "Production multi-agent execution harness featuring isolated microVMs, zero-trust IAM, and self-healing error reflection."
  },
  tech_data_lakehouse_gcp: {
    id: "tech_data_lakehouse_gcp",
    title: "GCP Enterprise Data Lakehouse",
    category: "Data & Lakehouse Architecture",
    useCase: "ENTERPRISE DATA LAKEHOUSE",
    businessUseCase: "GCP Modern Data Lakehouse staging petabytes of unstructured and structured data across Cloud Storage Raw, Clean, and Curated BigLake zones.",
    primaryActors: "Data Platform Architects, Data Scientists, Data Engineers",
    targetOutcomes: "Cost-Optimized Storage Tiers, Serverless BigQuery SQL Analytics, Centralized Dataplex Governance",
    desc: "Multi-tier Cloud Storage data landing zones, BigLake tables, and BigQuery partitioned analytics."
  },
  tech_data_lakehouse: {
    id: "tech_data_lakehouse_gcp",
    title: "GCP Enterprise Data Lakehouse",
    category: "Data & Lakehouse Architecture",
    useCase: "ENTERPRISE DATA LAKEHOUSE",
    businessUseCase: "GCP Modern Data Lakehouse staging petabytes of unstructured and structured data across Cloud Storage Raw, Clean, and Curated BigLake zones.",
    primaryActors: "Data Platform Architects, Data Scientists, Data Engineers",
    targetOutcomes: "Cost-Optimized Storage Tiers, Serverless BigQuery SQL Analytics, Centralized Dataplex Governance",
    desc: "Multi-tier Cloud Storage data landing zones, BigLake tables, and BigQuery partitioned analytics."
  },
  tech_modern_data_stack: {
    id: "tech_modern_data_stack",
    title: "Modern Data Stack Architecture",
    category: "Data & Lakehouse Architecture",
    useCase: "MODERN DATA PLATFORM",
    businessUseCase: "Real-time Change Data Capture (Debezium), automated Data Contracts schema validation, dbt dimensional modeling, and Reverse ETL back to operational systems.",
    primaryActors: "Analytics Engineers, Data Architects, BI Leads",
    targetOutcomes: "Sub-Minute Data Freshness, 100% Schema Contract Enforcement, Automated Reverse ETL Syncing",
    desc: "Modern data platform combining PostgreSQL CDC, Data Contracts, dbt Gold marts, and Reverse ETL."
  },
  tech_streaming_analytics: {
    id: "tech_streaming_analytics",
    title: "Real-Time Streaming Analytics",
    category: "Data & Lakehouse Architecture",
    useCase: "REAL-TIME STREAMING PIPELINE",
    businessUseCase: "Real-time streaming telemetry ingestion capturing live updates and platform usage analytics into BigQuery and Looker Studio.",
    primaryActors: "Big Data Architects, Data Analysts, Business Intelligence Leads",
    targetOutcomes: "Sub-Second Ingestion Speed, Real-Time Executive Dashboards, Instant Alerting on Anomalies",
    desc: "Streaming ingestion via Cloud Pub/Sub, Dataflow Beam ETL, Vertex AI Feature Store, and BigQuery analytical warehousing."
  },
  tech_c4_system_context: {
    id: "tech_c4_system_context",
    title: "C4 System Context & Container Model",
    category: "Backend & Systems Architecture",
    useCase: "C4 ENTERPRISE ARCHITECTURE",
    businessUseCase: "C4 Model Level 1 Context and Level 2 Container mapping showing external actors, authentication boundaries, microservice containers, and database tiers.",
    primaryActors: "Enterprise Architects, Solution Designers, Lead Developers",
    targetOutcomes: "Clear Boundary Definition, Identity Gateway Standardization, Third-Party Service Separation",
    desc: "C4 model context and container blueprint mapping users, identity gateway, microservices, and databases."
  },
  tech_event_driven_eda: {
    id: "tech_event_driven_eda",
    title: "Enterprise Event-Driven EDA Mesh",
    category: "Backend & Systems Architecture",
    useCase: "ENTERPRISE EVENT MESH",
    businessUseCase: "High-scale partitioned Kafka/PubSub event mesh with Schema Registry contract validation, automated Dead-Letter Queue (DLQ) retry routing, and decoupled consumer groups.",
    primaryActors: "Distributed Systems Architects, Platform Engineers, SREs",
    targetOutcomes: "Million-Message-per-Second Scale, Zero Message Loss via DLQ, Decoupled Microservice Scaling",
    desc: "Event-driven architecture with Kafka brokers, Schema Registry Avro gates, and DLQ recovery."
  },
  tech_event_driven_aws: {
    id: "tech_event_driven_eda",
    title: "Enterprise Event-Driven EDA Mesh",
    category: "Backend & Systems Architecture",
    useCase: "ENTERPRISE EVENT MESH",
    businessUseCase: "High-scale partitioned Kafka/PubSub event mesh with Schema Registry contract validation, automated Dead-Letter Queue (DLQ) retry routing, and decoupled consumer groups.",
    primaryActors: "Distributed Systems Architects, Platform Engineers, SREs",
    targetOutcomes: "Million-Message-per-Second Scale, Zero Message Loss via DLQ, Decoupled Microservice Scaling",
    desc: "Event-driven architecture with Kafka brokers, Schema Registry Avro gates, and DLQ recovery."
  },
  tech_serverless_gcp: {
    id: "tech_serverless_gcp",
    title: "Serverless Web Application - GCP",
    category: "Cloud Infrastructure & Networking",
    useCase: "GCP CLOUD PLATFORM",
    businessUseCase: "Production serverless web application on Google Cloud providing elastic API entry, asynchronous event ingestion, multi-step orchestration, and sub-millisecond in-memory caching.",
    primaryActors: "Cloud Technical Architects, Web App Developers, DevOps & SREs",
    targetOutcomes: "99.99% Availability, Auto-Scaling from 0 to 1000 Requests, Zero Infrastructure Management Overhead",
    desc: "Official GCP serverless reference architecture featuring Global Cloud Load Balancing, API Gateway, IAP, Cloud Run, Cloud Functions, Pub/Sub, Cloud Workflows, Firestore, Memorystore for Redis, and Cloud Operations Suite."
  },
  tech_multi_region_dr: {
    id: "tech_multi_region_dr",
    title: "Master Multi-Region Active-Passive Disaster Recovery (Pilot Light Case B)",
    category: "Cloud Infrastructure & Networking",
    useCase: "ENTERPRISE BUSINESS CONTINUITY & ZERO-TRUST DR",
    businessUseCase: "100% Google Cloud Well-Architected Certified Active-Passive Multi-Region Disaster Recovery architecture across GCP US-East1 (Active) and US-West1 (Pilot Light Standby) with Zero-Trust VPC-SC perimeters, Private Service Connect, Global L7 HTTPS Load Balancing + Cloud Armor WAF, Cloud Run Microservices A-D, Memorystore for Redis HA with Circuit Breakers, Cloud SQL HA with cross-region asynchronous replication (<5min data lag), Dual-Region GCS Object Storage, and automated SRE failover/failback runbooks.",
    primaryActors: "Principal Cloud Architects, Site Reliability Engineering (SRE) Leads, CISO / Security Architects, Infrastructure Leads",
    targetOutcomes: "Target RTO 15-30m, Target RPO 1-5m, Pilot Light 10% Standby Cost (~90% Compute Savings), Zero-Trust VPC-SC Compliance, 1:1 Terraform State Parity, FMEA Failure Mode Certification",
    desc: "Production-grade GCP Active-Passive Disaster Recovery master template with Global L7 Load Balancer, Zero-Trust perimeter, Cloud KMS CMEK, Memorystore Redis HA, Cloud SQL cross-region async replication, Dual-Region GCS, and executive SRE failover runbooks."
  },
  six_rs_migration_matrix: {
    id: "six_rs_migration_matrix",
    title: "6Rs Migration Disposition Matrix (Assessment Phase)",
    category: "Legacy Discovery",
    useCase: "6RS MIGRATION DISPOSITION MATRIX (WBS 0.1.2)",
    businessUseCase: "WBS 0.1.2: Enterprise Cloud Migration Assessment & 6Rs Disposition Framework evaluating Legacy Components (On-Premise VMs, Legacy Databases Oracle/SAP, Mainframe Systems, Custom Monolith Apps, File Shares) across Business Value, Technical Feasibility, and Cloud Compatibility decision tracks into Rehost (Lift & Shift), Replatform (Lift & Reshape), Refactor (Re-architect), Retain (Revisit Later), Retire (Decommission), and Repurchase (Drop & Shop) target dispositions with GCAF Cost Optimization feedback loops.",
    primaryActors: "Cloud Infrastructure Leads, Data Architects, C-Suite, PMO, Migration Teams",
    targetOutcomes: "Prioritized Application Disposition Inventory, Clear 6Rs Migration Roadmap, Quantified Cloud TCO Savings, Zero Cloud Migration Regressions",
    desc: "WBS 0.1.2 6Rs Migration Disposition Matrix mapping legacy workloads across multi-tier assessment logic into Rehost, Replatform, Refactor, Retain, Retire, and Repurchase cloud destinations."
  },
  tech_6rs_migration: {
    id: "six_rs_migration_matrix",
    title: "6Rs Migration Disposition Matrix (Assessment Phase)",
    category: "Legacy Discovery",
    useCase: "6RS MIGRATION DISPOSITION MATRIX (WBS 0.1.2)",
    businessUseCase: "WBS 0.1.2: Enterprise Cloud Migration Assessment & 6Rs Disposition Framework evaluating Legacy Components across Business Value, Technical Feasibility, and Cloud Compatibility decision tracks into Rehost, Replatform, Refactor, Retain, Retire, and Repurchase target dispositions.",
    primaryActors: "Cloud Infrastructure Leads, Data Architects, C-Suite, PMO, Migration Teams",
    targetOutcomes: "Prioritized Application Disposition Inventory, Clear 6Rs Migration Roadmap, Quantified Cloud TCO Savings, Zero Cloud Migration Regressions",
    desc: "WBS 0.1.2 6Rs Migration Disposition Matrix mapping legacy workloads into Rehost, Replatform, Refactor, Retain, Retire, and Repurchase cloud destinations."
  },
  hybrid_strangler_transition: {
    id: "hybrid_strangler_transition",
    title: "Hybrid / Strangler Fig Transition Architecture (Phase 0: Assessment Transition)",
    category: "Legacy Discovery",
    useCase: "HYBRID / STRANGLER FIG TRANSITION ARCHITECTURE (WBS 0.1.3)",
    businessUseCase: "WBS 0.1.3: Enterprise Hybrid Cloud & Strangler Fig Transition Architecture connecting On-Premises Datacenter legacy systems (Legacy Monolithic App v1.0, Legacy SQL Database, Mainframe System) with Google Cloud Platform VPC via Secure Cloud Interconnect (Primary 10Gbps Path) and Site-to-Site VPN (Backup Path) with SOC 2 / HIPAA compliance perimeters. Incoming Internet client requests are intercepted by Apigee API Gateway (Strangler Fig Interface) and dynamically routed: legacy features route back to on-premise components while modern/new features route directly to Modern Microservices on GKE/Cloud Run and Cloud SQL for PostgreSQL.",
    primaryActors: "Cloud Enterprise Architects, Network Engineers, SRE Leads, Backend Engineers, Security Officers",
    targetOutcomes: "Zero-Downtime Gradual Migration, 100% SLA Business Continuity, SOC 2 & HIPAA Regulatory Assurance, Phased Monolith Decommissioning",
    desc: "WBS 0.1.3 Hybrid Strangler Fig transition architecture with Apigee API Gateway request routing, Secure Cloud Interconnect, Site-to-Site VPN, and parallel on-premise to GCP modern microservice execution."
  },
  tech_hybrid_strangler: {
    id: "hybrid_strangler_transition",
    title: "Hybrid / Strangler Fig Transition Architecture (Phase 0: Assessment Transition)",
    category: "Legacy Discovery",
    useCase: "HYBRID / STRANGLER FIG TRANSITION ARCHITECTURE (WBS 0.1.3)",
    businessUseCase: "WBS 0.1.3: Enterprise Hybrid Cloud & Strangler Fig Transition Architecture connecting On-Premises Datacenter legacy systems with Google Cloud Platform VPC via Secure Cloud Interconnect and Site-to-Site VPN with Apigee API Gateway routing.",
    primaryActors: "Cloud Enterprise Architects, Network Engineers, SRE Leads, Backend Engineers, Security Officers",
    targetOutcomes: "Zero-Downtime Gradual Migration, 100% SLA Business Continuity, SOC 2 & HIPAA Regulatory Assurance, Phased Monolith Decommissioning",
    desc: "WBS 0.1.3 Hybrid Strangler Fig transition architecture with Apigee API Gateway request routing, Secure Cloud Interconnect, and modern microservices."
  },
  cloud_finops_chargeback: {
    id: "cloud_finops_chargeback",
    title: "Cloud FinOps & Chargeback Model (FinOps & Economics Category)",
    category: "FinOps & Economics",
    useCase: "CLOUD FINOPS & CHARGEBACK MODEL (WBS 1.1.3)",
    businessUseCase: "WBS 1.1.3: Enterprise Cloud FinOps, Cost Optimization & Automated Chargeback Framework connecting Ingestion & Usage Tracking (GKE Kubecost Agents, Compute Engine VMs, Cloud Storage, Vertex AI Generative AI Token Tracking, Cloud SQL, BigQuery) with Data Aggregation & Cost Allocation (GCP Billing Exports, Kubecost Container Costs, Vertex AI Token Cost Calculator, Enterprise Resource Tagging Policies into Unified BigQuery Cost Data Lake). Delivers automated Looker Studio executive reporting, FinOps Governance Engine (Tagging Enforcement, Budgets & Alerts, Commitment Manager CUDs/SUDs, Cloud Monitoring), and granular Chargeback/Showback generation for Business Unit 1 (Engineering), Business Unit 2 (Product), and Data Science & GenAI Teams under strict Cloud IAM access control and Secret Manager key security.",
    primaryActors: "Cloud Economists, FinOps Leads, BU Leads, Engineering Directors, Product VP, C-Suite",
    targetOutcomes: "100% Granular Cost Attribution, Automated GenAI Token Cost Accounting, Anomaly Detection & Budget Alerts, Optimized CUD/SUD Utilization, Zero Unallocated Cloud Spend",
    desc: "WBS 1.1.3 Cloud FinOps & Chargeback model mapping usage tracking, BigQuery cost data lake, Vertex AI token pricing, Looker Studio reporting, and automated showback/chargeback generation."
  },
  tech_cloud_finops: {
    id: "cloud_finops_chargeback",
    title: "Cloud FinOps & Chargeback Model (FinOps & Economics Category)",
    category: "FinOps & Economics",
    useCase: "CLOUD FINOPS & CHARGEBACK MODEL (WBS 1.1.3)",
    businessUseCase: "WBS 1.1.3: Enterprise Cloud FinOps, Cost Optimization & Automated Chargeback Framework connecting Ingestion & Usage Tracking with Data Aggregation & Cost Allocation into Unified BigQuery Cost Data Lake, Looker Studio dashboards, and FinOps Governance.",
    primaryActors: "Cloud Economists, FinOps Leads, BU Leads, Engineering Directors, Product VP",
    targetOutcomes: "100% Granular Cost Attribution, Automated GenAI Token Cost Accounting, Anomaly Detection & Budget Alerts, Optimized CUD/SUD Utilization",
    desc: "WBS 1.1.3 Cloud FinOps & Chargeback model with BigQuery cost data lake, Vertex AI token tracking, Looker Studio dashboards, and showback generator."
  },
  ai_coe_operating_model: {
    id: "ai_coe_operating_model",
    title: "AI Center of Excellence (CoE) Operating Model (Operational Excellence Category)",
    category: "Operational Excellence",
    useCase: "AI CENTER OF EXCELLENCE (COE) OPERATING MODEL (WBS 1.1.5)",
    businessUseCase: "WBS 1.1.5: Enterprise AI Center of Excellence (CoE) Operating Model establishing cross-functional Governance & Strategy (Adoption Modeling, Business Plan ideation, Cloud Plans alignment), Process & Operations (User Onboarding, Prompt Curation, Continuous Feedback Loops with Jira/Confluence integration), and Analytics & Measurement (Performance Metrics, Utilization Insights via Looker). Enforces GAMP 5 Compliance Framework validation, delivers the certified AI CoE Operating Model artifact into Total Unified System View (WBS Platform Context & PSO Operations Support), and secures recurring quarterly Funding through closed-loop executive review and approval with Business Leads.",
    primaryActors: "Head of AI / AI CoE Leads, Chief Strategy Officer, VP of Engineering, GAMP 5 Compliance Officers, Business Unit Leads, SRE / PSO Leads",
    targetOutcomes: "Accelerated Enterprise AI Adoption, 100% GAMP 5 Regulatory Validation, Standardized Prompt Curation & Guardrails, Continuous Feedback Flywheel, Secured Multi-Year AI Funding",
    desc: "WBS 1.1.5 AI Center of Excellence operating model framework mapping governance, continuous user onboarding & prompt curation loops, Looker analytics, GAMP 5 compliance, and executive funding loops."
  },
  tech_ai_coe: {
    id: "ai_coe_operating_model",
    title: "AI Center of Excellence (CoE) Operating Model (Operational Excellence Category)",
    category: "Operational Excellence",
    useCase: "AI CENTER OF EXCELLENCE (COE) OPERATING MODEL (WBS 1.1.5)",
    businessUseCase: "WBS 1.1.5: Enterprise AI Center of Excellence (CoE) Operating Model establishing cross-functional Governance & Strategy, Process & Operations (User Onboarding, Prompt Curation, Feedback Loops), and Analytics & Measurement under GAMP 5 validation and executive funding approval.",
    primaryActors: "Head of AI / AI CoE Leads, Chief Strategy Officer, VP of Engineering, GAMP 5 Compliance Officers, Business Unit Leads",
    targetOutcomes: "Accelerated Enterprise AI Adoption, 100% GAMP 5 Regulatory Validation, Standardized Prompt Curation, Secured AI Funding",
    desc: "WBS 1.1.5 AI Center of Excellence operating model framework mapping governance, prompt curation workflows, Looker analytics, and executive funding."
  },
  mcp_context_gateway: {
    id: "mcp_context_gateway",
    title: "Model Context Protocol Gateway (MCP Context Gateway) (Operational Excellence Category)",
    category: "Operational Excellence",
    useCase: "MODEL CONTEXT PROTOCOL (MCP) GATEWAY (WBS 2.1.5)",
    businessUseCase: "WBS 2.1.5: Enterprise Model Context Protocol (MCP) Gateway architecture (Node.js/Python) establishing Universal Context Ingestion & Adapters (SQL, Storage, Vector DB, Logs, Legacy Systems into Context Schema Mapping Engine), an MCP Message Bus & Normalization Tier (MCP Schemas, Schema Validation, SOC 2 Compliance Filtering, IAM Access Control, BigQuery Audit Trail Logging), and Tool Proxies & Downstream Integration (Cognitive Arch / Agentic RAG into API Proxy, GCP Service Proxy, and Legacy Tool Proxy). Connects to external Actionable Tool Systems, Looker Studio reporting, AI Integration Engineers, and Total Unified System View with PSO Operations Support under strict Workload Identity, VPC-SC, and Secret Manager security.",
    primaryActors: "AI Integration Engineers, Platform Architects, MCP Developers, Security & Compliance Officers, SRE / PSO Leads",
    targetOutcomes: "Zero-Trust Context Ingestion, 100% SOC 2 Compliance Filtering, Sub-50ms Tool Execution Proxies, Unified Schema Normalization, Immutable Audit Logging",
    desc: "WBS 2.1.5 Model Context Protocol Gateway blueprint mapping multi-source context ingestion, normalized MCP message bus, tool proxies, and actionable tool integration."
  },
  tech_mcp_gateway: {
    id: "mcp_context_gateway",
    title: "Model Context Protocol Gateway (MCP Context Gateway) (Operational Excellence Category)",
    category: "Operational Excellence",
    useCase: "MODEL CONTEXT PROTOCOL (MCP) GATEWAY (WBS 2.1.5)",
    businessUseCase: "WBS 2.1.5: Enterprise Model Context Protocol (MCP) Gateway architecture connecting multi-source context adapters, MCP Schema Message Bus, and Tool Proxies to downstream actionable tool systems and Looker analytics.",
    primaryActors: "AI Integration Engineers, Platform Architects, MCP Developers, Security Officers",
    targetOutcomes: "Zero-Trust Context Ingestion, 100% SOC 2 Compliance Filtering, Sub-50ms Tool Proxies, Unified Schema Normalization",
    desc: "WBS 2.1.5 Model Context Protocol Gateway blueprint mapping context ingestion adapters, MCP message bus, and downstream tool proxies."
  },
  logical_ai_config_tenant: {
    id: "logical_ai_config_tenant",
    title: "Product Plan - Logical AI Config (Tenant Architecture) (Logical AI Config | To-Be)",
    category: "Operational Excellence",
    useCase: "LOGICAL AI CONFIG (TENANT ARCHITECTURE)",
    businessUseCase: "Product Plan: Multi-tenant Logical AI Configuration architecture for Enterprise AI Platform within Gemini Enterprise. Enforces Environment Segregation across Development, Testing, and Production environments via Enterprise IAM, Logical AI Config Console, and APIs. Production workspaces encapsulate Logical AI Config (Model Selection Gemini 3.6 Pro, System Instructions, Memory & Context Management, Tool Invocation Definitions) and Agent Designer (Single-Agent, Multi-Agent Chains, Task-Based Sub-Agents) with strict SOC 2 and GxP Compliance Guardrails, VPC Firewalls, Centralized Audit Logging, and KMS Configuration Encryption.",
    primaryActors: "App Owners, AI Developers, Cloud Platform Architects, Security & GxP Compliance Officers",
    targetOutcomes: "Strict Multi-Tenant Environment Segregation, Automated Logical AI Config Propagation, SOC 2 & GxP Compliance Guardrails, Sub-10ms Agent Invocation, End-to-End KMS Encryption",
    desc: "Product Plan Logical AI Config tenant architecture mapping Development, Testing, and Production environments with Agent Designer topologies, compliance guardrails, and KMS encryption."
  },
  tech_logical_ai_config: {
    id: "logical_ai_config_tenant",
    title: "Product Plan - Logical AI Config (Tenant Architecture)",
    category: "Operational Excellence",
    useCase: "LOGICAL AI CONFIG (TENANT ARCHITECTURE)",
    businessUseCase: "Multi-tenant Logical AI Configuration topology illustrating Development, Testing, and Production workspace boundaries, Gemini Enterprise Engine instances, Agent Designer topologies, and compliance markers.",
    primaryActors: "App Owners, Devs, Platform Architects, Compliance Officers",
    targetOutcomes: "Multi-Tenant Isolation, SOC 2 & GxP Compliance, Automated Config APIs",
    desc: "Logical AI Config blueprint mapping tenant boundaries, Agent Designer topologies, and compliance guardrails."
  },
  hub_and_spoke_agent_config: {
    id: "hub_and_spoke_agent_config",
    title: "WBS 2.2.2 Hub-and-Spoke Agent Configuration Map (Logical AI Config Category)",
    category: "Operational Excellence",
    useCase: "HUB-AND-SPOKE AGENT CONFIGURATION MAP (WBS 2.2.2)",
    businessUseCase: "WBS 2.2.2: Enterprise Hub-and-Spoke Multi-Agent Configuration Map within Gemini Enterprise and Agent Designer. Orchestrator Parent Agent Hub manages General Configuration (Gemini 3.6 Pro, Global System Instructions, Shared Context Window, Memory TTL), Multi-Agent Router / Dispatcher Logic with intent-based rule routing, Shared Memory & State, Vertex AI Agent Runtime, and 21 CFR Part 11 Compliance Gate. Dispatches to 3 specialized Sub-Agents (Customer Support with Zendesk API & BigQuery/Vector Grounding, Fulfillment SA with SAP ERP API & Cloud Storage, and Knowledge SA with GCS PDF/Doc Grounding). Features Logical UI Configuration Matrix (Prompt editors, Rule editors, Knowledge Source selectors, API Config panels), Human-in-the-Loop (HITL) Gate, 21 CFR Part 11 Immutable Audit Trail & E-Signature Ledger, and Persona Dashboards (AI Architect, W&T Arch, Agent Economic & Runtime Metrics).",
    primaryActors: "AI Architects, Workplace & Talent (W&T) Architects, Agent Developers, 21 CFR Part 11 Compliance Officers, Support Engineers",
    targetOutcomes: "Deterministic Intent-Based Agent Dispatching, 100% 21 CFR Part 11 E-Signature Compliance, Sub-100ms Spoke Invocation, Unified UI Config Propagation, Real-Time Economic & Runtime Monitoring",
    desc: "WBS 2.2.2 Hub-and-Spoke agent configuration blueprint mapping Orchestrator parent agent, specialized domain sub-agents, Logical UI config matrix, HITL gate, and 21 CFR Part 11 audit ledger."
  },
  tech_hub_spoke_agent: {
    id: "hub_and_spoke_agent_config",
    title: "Hub-and-Spoke Agent Configuration Map (WBS 2.2.2)",
    category: "Operational Excellence",
    useCase: "HUB-AND-SPOKE AGENT CONFIGURATION MAP (WBS 2.2.2)",
    businessUseCase: "Hub-and-spoke agent orchestration topology connecting parent router hub to specialized sub-agents with UI configuration matrix, HITL validation gate, and 21 CFR Part 11 e-signature ledger.",
    primaryActors: "AI Architects, Agent Engineers, Compliance Officers",
    targetOutcomes: "Multi-Agent Routing, 21 CFR Part 11 Compliance, Dedicated Grounding",
    desc: "Hub-and-Spoke agent configuration map illustrating parent dispatcher hub, 3 domain spokes, UI matrix, and audit ledger."
  },
  unified_data_governance: {
    id: "unified_data_governance",
    title: "WBS 3.1.4: Unified Data Governance & Access Control Architecture (To-Be State)",
    category: "Security & Governance",
    useCase: "UNIFIED DATA GOVERNANCE & ACCESS CONTROL (WBS 3.1.4)",
    businessUseCase: "WBS 3.1.4: Enterprise Data Governance and Access Control Architecture across 4 horizontal zones: Top Zone Strategy & Governance Interface (CDO, Data Stewards, Collibra Data Intelligence Cloud with Business Glossary, Policy Registry, and Stewardship Dashboards); Zone Two Unified Control Plane Orchestration (Dataplex Unified Control Plane with Active Data Control Plane, Dataplex Data Catalog metadata sync, Data Profiling & Quality, and Attribute-based Access Control ABAC Enforcement Engine); Third Zone Enforced Technical Data Tier (BigQuery, Cloud Storage Data Lakes, Dataflow Pipelines Lineage Indexing, Dataproc Processing, Vertex AI Model Governance); and Bottom Zone Outcomes & Compliance Reporting (CDO Executive Reporting Dashboard with KPI metrics, GDPR Compliance Guardrails, HIPAA Data Masking & Anonymization, GxP Audit Trail & Validation, Data Quality Scorecards).",
    primaryActors: "Chief Data Officer (CDO), Data Stewards, Lead Data Architects, Compliance Officers, Security Engineers",
    targetOutcomes: "100% ABAC Access Policy Enforcement, Automated Metadata Synchronization with Collibra, End-to-End Column/Row Level Lineage Indexing, Real-Time Executive Compliance Dashboards, Full GDPR/GxP/HIPAA Audit Readiness",
    desc: "WBS 3.1.4 Unified Data Governance blueprint mapping Collibra strategy, Dataplex active control plane, ABAC enforcement across Modern Data Stack, and compliance scorecards."
  },
  tech_unified_data_governance: {
    id: "unified_data_governance",
    title: "Unified Data Governance & Access Control (WBS 3.1.4)",
    category: "Security & Governance",
    useCase: "UNIFIED DATA GOVERNANCE & ACCESS CONTROL (WBS 3.1.4)",
    businessUseCase: "Unified enterprise data governance architecture connecting Collibra strategy layer to Dataplex ABAC control plane and technical storage tiers.",
    primaryActors: "CDO, Data Stewards, Data Architects, Compliance Officers",
    targetOutcomes: "ABAC Enforcement, Metadata Sync, GDPR/GxP/HIPAA Compliance",
    desc: "Data governance and ABAC access control blueprint mapping Collibra, Dataplex, Modern Data Stack, and compliance dashboards."
  },
  dataops_anomaly_detection: {
    id: "dataops_anomaly_detection",
    title: "WBS 3.1.7: DataOps & Anomaly Detection Architecture (To-Be State)",
    category: "Modern Data Stack",
    useCase: "DATAOPS & ANOMALY DETECTION ARCHITECTURE (WBS 3.1.7)",
    businessUseCase: "WBS 3.1.7: Enterprise DataOps and Continuous Anomaly Detection Architecture spanning 5 horizontal zones: Top Zone Strategy & Observability Dashboard (CDO, Data Architect, SRE Ops Lead, Looker Studio Visualization & Reporting with Freshness, Schema Drift, Volume, Distribution Shift, and Hallucination Prevention Score 105 metrics); Second Zone Incident Management & SRE View (SRE persona, Cloud Monitoring Alerts, PagerDuty Integration, Root Cause Analysis feedback loop); Third Zone The Core Dataplex Integrated DataOps Control Plane (Partner observability metrics, SODA Quality testing and active checks, Active Schema Drift Monitoring, Anomaly Detection Engine preventing hallucination from bad data, Monte Carlo CARLO data observability, Computer System Validation CSV checkpoints, Reliability Guardrails); Fourth Zone Enforced Pipeline & Consumption (Cloud Storage Validated GCS Lakes with SOC 2 / CSV badge, Vertex AI Model Grounding with Vector Search and Prevention of AI/LLM Hallucination); and Bottom Zone Unified Modern Data Stack (BigQuery, Cloud Storage, Cloud SQL, Dataflow, Dataproc, External SaaS enterprise data lakehouse prerequisites).",
    primaryActors: "Lead Data Architects, Site Reliability Engineers (SREs), Data Engineers, AI/ML Engineers",
    targetOutcomes: "Zero Hallucination AI Grounding from Bad Data, Automated Schema Drift & Freshness Anomaly Detection, Sub-Minute PagerDuty Incident Alerting, SOC 2 / CSV Validated Data Lakes",
    desc: "WBS 3.1.7 DataOps blueprint mapping Looker observability, SRE incident integration, Dataplex SODA/CARLO anomaly detection, and hallucination-free Vertex AI grounding."
  },
  tech_dataops_anomaly: {
    id: "dataops_anomaly_detection",
    title: "DataOps & Anomaly Detection (WBS 3.1.7)",
    category: "Modern Data Stack",
    useCase: "DATAOPS & ANOMALY DETECTION ARCHITECTURE (WBS 3.1.7)",
    businessUseCase: "Enterprise DataOps and Anomaly Detection architecture connecting Looker Studio, PagerDuty, Dataplex SODA/CARLO, and Vertex AI Grounding.",
    primaryActors: "Data Architects, SREs, Data Engineers, AI Engineers",
    targetOutcomes: "Anomaly Detection, Schema Drift Prevention, Hallucination-Free Grounding",
    desc: "DataOps architecture blueprint illustrating Looker Studio observability, Dataplex anomaly detection, and validated data lakehouses."
  },
  golive_warroom_runbook: {
    id: "golive_warroom_runbook",
    title: "WBS 6.2.1: Go-Live Cutover & War Room Runbook (Day-1 Cutover Phase / To-Be State)",
    category: "Operational Excellence",
    useCase: "GO-LIVE CUTOVER & WAR ROOM RUNBOOK (WBS 6.2.1)",
    businessUseCase: "WBS 6.2.1: Enterprise Go-Live Cutover and War Room Execution Runbook across 3 horizontal layers: Layer 1 Top Preparation & Approval Phase (CI/CD Pipeline with Git, Jenkins/GitLab triggering deploy manifests, Go-Live Prep Checklist with WORM storage callouts, Validation Gates with Release Manager and App Owner Go/No-Go Decision Meeting, Confluence Runbook Draft, and Approved Jira Cutover Ticket); Layer 2 Center The War Room & Live Execution with Opsgenie Integration (SRE, DevSecOps, App Owner, Live Communication Channel via Slack/Teams, Enterprise War Room Day-1 Cutover banner, Opsgenie Integration Engine, 5-Step Minute-by-Minute Execution Script spanning 1. Data Migration/ETL Verified, 2. Cloud DNS Update with Global Load Balancer, 3. MFE Orchestration & Live Mount, 4. Vertex AI Agent Online, 5. Real-Time Observability Check, and Automated Rollback Logic with DNS fallback, MFE rollback, Disable AI Agent, Restore Data snapshots upon failure); and Layer 3 Bottom Post-Launch Day-2 Operations & Support (SRE, Release Manager, App Owner, Dynamic Dashboards with Freshness/Schema/Volume/Distribution metrics, Active Data Control Plane monitoring, and Go-Live Verification Scorecard).",
    primaryActors: "Release Managers, Site Reliability Engineers (SREs), App Owners, DevSecOps Leads, Cloud Architects",
    targetOutcomes: "Sub-Second DNS Cutover, 100% Automated Rollback Readiness, Zero-Downtime MFE Mounting, SOC 2 & CSV Compliant Go-Live Verification",
    desc: "WBS 6.2.1 Go-Live Cutover blueprint mapping preparation gates, war room Opsgenie integration, 5-step minute-by-minute cutover script, and automated rollback logic."
  },
  tech_golive_warroom: {
    id: "golive_warroom_runbook",
    title: "Go-Live Cutover & War Room Runbook (WBS 6.2.1)",
    category: "Operational Excellence",
    useCase: "GO-LIVE CUTOVER & WAR ROOM RUNBOOK (WBS 6.2.1)",
    businessUseCase: "Enterprise Day-1 Go-Live War Room Runbook orchestrating minute-by-minute cutover steps, Opsgenie alerting, and automated rollback scripts.",
    primaryActors: "Release Managers, SREs, DevSecOps, App Owners",
    targetOutcomes: "Minute-by-Minute Cutover, Automated Rollback, Dynamic Telemetry Verification",
    desc: "Go-live cutover runbook blueprint illustrating preparation gates, war room execution, and automated rollback scripts."
  },
  enterprise_sre_observability: {
    id: "enterprise_sre_observability",
    title: "WBS 6.1.1: Enterprise SRE & Observability Architecture (Day-2 Operations / To-Be State)",
    category: "Operational Excellence",
    useCase: "ENTERPRISE SRE & OBSERVABILITY ARCHITECTURE (WBS 6.1.1)",
    businessUseCase: "WBS 6.1.1: Enterprise SRE & Observability Architecture illustrating the complete Day-2 operations ecosystem: Prerequisite Flow (Cloud-Native CI/CD with Git Repository, Jenkins, GitLab); Observed Workloads (GCP Workload Ingress with Client Applications, Microservices on Cloud Run/GKE, AI Agents Gemini Pro, and Data Tier Cloud SQL/BigQuery emitting logs, metrics, traces); Unified Observability & Telemetry Pipeline (The Core with distributed tracing, Cloud Logging with SOC 2 log sinks, Cloud Monitoring metrics aggregation, and Operational Excellence Control Plane for SRE SLO/SLA definitions and budget alerts); Actionable Operations & Reporting (Datadog Observability & SIEM Integration, Looker Studio dynamic dashboards with SLO Health Score, Capacity Utilization, Cost Anomalies, Error Budget Burn, personas SRE, Ops Team, DevSecOps, Day-2 Ops Drift Detection & Automated Remediation with Automated Runbooks, and Incident Management with Cloud Monitoring Alerts and PagerDuty receiving RED alerts).",
    primaryActors: "Site Reliability Engineers (SREs), Operations Leads, DevSecOps Engineers, Cloud Architects",
    targetOutcomes: "Sub-Second Distributed Tracing, Zero-Lag SIEM & Datadog Observability, Automated Drift Detection & Runbook Remediation, SOC 2 Compliant Telemetry Audit",
    desc: "WBS 6.1.1 Enterprise SRE & Observability blueprint mapping observed workloads, unified telemetry core, Datadog SIEM, Looker Studio dashboards, and incident management."
  },
  tech_enterprise_sre: {
    id: "enterprise_sre_observability",
    title: "Enterprise SRE & Observability (WBS 6.1.1)",
    category: "Operational Excellence",
    useCase: "ENTERPRISE SRE & OBSERVABILITY ARCHITECTURE (WBS 6.1.1)",
    businessUseCase: "Enterprise SRE and Observability architecture connecting observed GCP workloads, unified telemetry pipelines, Datadog SIEM, and Looker Studio dashboards.",
    primaryActors: "SREs, Ops Teams, DevSecOps Engineers, Cloud Architects",
    targetOutcomes: "Distributed Tracing, Automated Drift Remediation, High-Precision Alerting",
    desc: "Enterprise SRE and observability blueprint illustrating unified telemetry pipelines, Datadog SIEM integration, and Looker Studio reporting."
  },
  data_residency_sovereign_map: {
    id: "data_residency_sovereign_map",
    title: "WBS 5.1.6: Data Residency & Sovereign Cloud Map (To-Be State, Infra Provisioning Phase)",
    category: "Security & Governance",
    useCase: "DATA RESIDENCY & SOVEREIGN CLOUD MAP (WBS 5.1.6)",
    businessUseCase: "WBS 5.1.6: Enterprise Data Residency and Sovereign Cloud Map establishing isolated regional boundaries across EU-West4 (The Netherlands) and US-Central1 (Iowa) with VPC Service Controls (VPC SC) perimeters, restricted GCP APIs, and Vertex AI local inference & grounding. Features cross-border GCP VPC-SC bridge data transfer paths, red alert perimeter tripwires, Looker Studio compliance dashboards (Compliance Score 99.8%, cross-border audit logs, grounding lineage), personas (Legal, CISO, SRE Ops Lead), and async management plane (Unified Trace Correlation, Vertex AI monitoring, Dataplex, Cloud Logging) enforcing GDPR, EU AI Act, and HIPAA regulatory guarantees.",
    primaryActors: "Legal Counsel, Chief Information Security Officers (CISOs), SecOps Engineers, SRE Ops Leads, Cloud Architects",
    targetOutcomes: "Zero Cross-Border Data Leakage, 100% GDPR / EU AI Act / HIPAA Isolation Compliance, Sub-Minute VPC-SC Perimeter Alerting, Immutable Regulatory Audit Lineage",
    desc: "WBS 5.1.6 Data Residency blueprint mapping multi-region sovereign boundaries, VPC Service Controls perimeters, cross-border transfer bridges, and Looker Studio compliance reporting."
  },
  tech_data_residency: {
    id: "data_residency_sovereign_map",
    title: "Data Residency & Sovereign Cloud Map (WBS 5.1.6)",
    category: "Security & Governance",
    useCase: "DATA RESIDENCY & SOVEREIGN CLOUD MAP (WBS 5.1.6)",
    businessUseCase: "Enterprise Data Residency and Sovereign Cloud architecture connecting isolated VPC-SC perimeters in EU-West4 and US-Central1 with Looker Studio compliance reporting.",
    primaryActors: "Legal, CISO, SRE Leads, SecOps Engineers",
    targetOutcomes: "Regional Isolation, Zero Unauthorized Cross-Border Egress, Automated Compliance Dashboards",
    desc: "Data residency and sovereign cloud blueprint illustrating VPC SC perimeters, cross-border bridges, and regulatory audit dashboards."
  },
  federated_iam_sso: {
    id: "federated_iam_sso",
    title: "WBS 5.1.4: Federated IAM & SSO Architecture (To-Be State)",
    category: "Security & Governance",
    useCase: "FEDERATED IAM & SSO ARCHITECTURE (WBS 5.1.4)",
    businessUseCase: "WBS 5.1.4: Enterprise Federated IAM & Single Sign-On (SSO) Architecture establishing a unified identity control plane across client ingress, broker adapters (OAuth2/OIDC, SAML, JWT Token Exchange), enterprise user directory federation (Okta / Google Identity), and enforced downstream workload access (GKE, Cloud Run, Cloud SQL, Vertex AI Agents, Data Lakes, Dataplex) with automated audit reporting and HIPAA compliance guardrails.",
    primaryActors: "IAM Architects, Cloud Infra Leads, Chief Information Security Officers (CISOs), Data Stewards, Security Engineers",
    targetOutcomes: "Zero-Trust Identity Federation, Sub-100ms Token Translation, 100% HIPAA & SOC 2 Compliance Auditability, Enforced Least-Privilege IAM",
    desc: "WBS 5.1.4 Federated IAM & SSO blueprint illustrating multi-protocol broker adapters, Okta/Google Identity federation, downstream workload enforcement, and compliance reporting."
  },
  tech_federated_iam: {
    id: "federated_iam_sso",
    title: "Federated IAM & SSO Architecture (WBS 5.1.4)",
    category: "Security & Governance",
    useCase: "FEDERATED IAM & SSO ARCHITECTURE (WBS 5.1.4)",
    businessUseCase: "Enterprise Federated Identity and SSO architecture connecting multi-protocol ingress, central IdP brokerage, federated user directories, and modern cloud workloads.",
    primaryActors: "IAM Architects, CISOs, Cloud Infra Leads, Data Stewards",
    targetOutcomes: "Centralized Identity Management, Multi-Protocol Support, Workload Identity Federation",
    desc: "Federated IAM and SSO blueprint illustrating broker adapters, identity control plane, and compliance audit reporting."
  },
  tech_ai_trism_guardrails: {
    id: "tech_ai_trism_guardrails",
    title: "WBS 4.3.1: AI TRiSM Security Guardrail Pipeline System (Bespoke Security Solution)",
    category: "Security & Governance",
    useCase: "AI TRISM SECURITY GUARDRAIL PIPELINE SYSTEM (WBS 4.3.1)",
    businessUseCase: "WBS 4.3.1: Enterprise AI Trust, Risk, and Security Management (AI TRiSM) Guardrail Pipeline System architected across: Ingress Flow (Input Guardrail with adversarial checks, prompt injection defenses, jailbreak filters, and Cloud DLP PII scrubbing & data masking); TRiSM Threat Logging & Alerting Engine (with real-time audit gRPC streaming); Egress Flow (Output Filter with Vertex AI Guardrails for hallucination defense, offensive content checks, and PII leakage prevention); External AI Models & Looker Studio TRiSM Observability Dashboard (PII Scrubbing Rates, Threat Deflections, Compliance Status widgets); and Secure Infrastructure Configuration Flow (Cloud IAM, VPC-SC, Secret Manager, DevSecOps GitOps, and EU AI Act compliance oversight by CISO & AI Sec).",
    primaryActors: "Chief Information Security Officers (CISOs), AI Security Leads, DevSecOps Engineers, Cloud Platform Engineers",
    targetOutcomes: "Zero Prompt Injection Vulnerabilities, 100% PII Masking & Data Redaction, Automated Hallucination & Offensive Content Defense, Continuous EU AI Act Compliance",
    desc: "WBS 4.3.1 AI TRiSM Guardrail blueprint mapping input/output security filters, Cloud DLP masking, TRiSM threat engine, Looker observability, and EU AI Act compliance."
  },
  ai_trism_guardrails: {
    id: "tech_ai_trism_guardrails",
    title: "AI TRiSM Security Guardrail Pipeline (WBS 4.3.1)",
    category: "Security & Governance",
    useCase: "AI TRISM SECURITY GUARDRAIL PIPELINE SYSTEM (WBS 4.3.1)",
    businessUseCase: "Enterprise AI TRiSM guardrail pipeline securing LLMs and autonomous agents against prompt injection, data leakage, and hallucinations with EU AI Act compliance observability.",
    primaryActors: "CISOs, AI Security Engineers, DevSecOps Leads",
    targetOutcomes: "Prompt Injection Defense, Cloud DLP PII Masking, Hallucination Prevention, Real-Time Threat Alerting",
    desc: "AI TRiSM Security Guardrail blueprint illustrating input defense, DLP scrubbing, threat logging, output filtering, and Looker Studio monitoring."
  },
  tech_micro_frontends: {
    id: "tech_micro_frontends",
    title: "WBS 4.2.1: Micro-Frontend & UI Architecture (Client Implementation - To-Be State)",
    category: "Client & Presentation",
    useCase: "MICRO-FRONTEND & UI ARCHITECTURE (WBS 4.2.1)",
    businessUseCase: "WBS 4.2.1: Enterprise Micro-Frontend (MFE) & UI Architecture connecting End Users (Browser/HTTP) -> Enterprise App Frontend (Host App) -> Cloud CDN (HTTPS/HTTP2 asset delivery) -> Micro-Frontend & UI System (JS Orchestrator, browser-based MFE runtime modules, and WebSockets-enabled Chat Widget Component) <-> Real-Time WebSocket Server (bi-directional messaging and presence) & Backend APIs (GraphQL/REST over HTTPS) -> Authentication Provider (IdP / GCP Identity Platform for OIDC/JWT validation) -> External Logging & Observability System (Cloud Logging performance and error metrics) with Frontend Engineers and SRE operational integration.",
    primaryActors: "Frontend Architects, Senior Frontend Engineers, Site Reliability Engineers (SREs), Product Designers",
    targetOutcomes: "Sub-Second Module Mounting, Zero-Bundle-Bloat Lazy Loading, Resilient Bi-Directional WebSocket Streaming, 100% OIDC/JWT Security Compliance",
    desc: "WBS 4.2.1 Micro-Frontend blueprint mapping Host App container, CDN bundles, MFE runtime orchestrator, WebSocket chat widgets, GraphQL APIs, and IdP token exchange."
  },
  micro_frontends_ui: {
    id: "tech_micro_frontends",
    title: "Micro-Frontend & UI Architecture (WBS 4.2.1)",
    category: "Client & Presentation",
    useCase: "MICRO-FRONTEND & UI ARCHITECTURE (WBS 4.2.1)",
    businessUseCase: "Enterprise client presentation architecture featuring modular micro-frontends, WebSocket real-time chat widgets, CDN delivery, and IdP authentication.",
    primaryActors: "Frontend Engineers, UI Architects, SREs",
    targetOutcomes: "Modular UI Composition, Real-Time WebSocket Messaging, Cloud CDN Performance",
    desc: "Micro-Frontend architecture blueprint illustrating host app composition, browser runtime modules, WebSocket server, and backend API integration."
  }
};

export function getArchitectureMeta(archId?: string, promptText?: string, customUseCaseName?: string): ArchitectureMeta {
  const baseMeta: ArchitectureMeta = (archId && ARCHITECTURE_METADATA_MAP[archId])
    ? { ...ARCHITECTURE_METADATA_MAP[archId] }
    : {
        id: archId || "custom",
        title: archId ? archId.replace(/_/g, ' ').toUpperCase() : "CUSTOM ARCHITECTURE",
        category: archId?.startsWith('tech_') ? "Technical Architecture" : "Business Architecture",
        useCase: "ENTERPRISE SOLUTION ARCHITECTURE",
        businessUseCase: "End-to-end cloud and data platform workflow supporting mission-critical enterprise operations.",
        primaryActors: "Domain Specialists, System Engineers, Business Analysts, SREs",
        targetOutcomes: "Sub-Second Latency, High Availability, End-to-End Security Compliance",
        desc: "Enterprise architecture diagram generated for cloud, data, and AI operations."
      };

  if (customUseCaseName && customUseCaseName.trim().length > 0) {
    baseMeta.useCase = customUseCaseName.toUpperCase();
  } else if (promptText && promptText.trim().length > 3) {
    const topic = extractCleanTopicFromPrompt(promptText);
    baseMeta.useCase = topic.toUpperCase();
    baseMeta.businessUseCase = `Enterprise solution architecture supporting ${topic} workflows, high-throughput data processing, and automated governance.`;
    baseMeta.primaryActors = inferActorsFromPrompt(promptText);
    baseMeta.targetOutcomes = inferOutcomesFromPrompt(promptText);
  } else {
    // Provide clean domain-neutral metadata defaults instead of hardcoded Merck NSCLC
    baseMeta.useCase = getDomainNeutralUseCaseTitle(archId);
    baseMeta.businessUseCase = getDomainNeutralProblemStatement(archId);
    baseMeta.primaryActors = getDomainNeutralPrimaryActors(archId);
    baseMeta.targetOutcomes = getDomainNeutralTargetOutcomes(archId);
  }

  return baseMeta;
}

export function extractCleanTopicFromPrompt(prompt: string): string {
  if (!prompt) return "ENTERPRISE ARCHITECTURE";
  const p = prompt.toLowerCase();
  if (p.includes('keytruda') || p.includes('supply chain') || p.includes('demand forecasting')) {
    return "Merck Keytruda Supply Chain Forecasting";
  }
  const clean = prompt
    .replace(/act as|chief|enterprise|architect|and|pharma|technology|lead|at|we|are|building|a|generative|ai|platform|to|automate|scientific|literature|mining|accelerate|design|build|create|system|architecture|diagram/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const words = clean.split(' ').filter(w => w.length > 2).slice(0, 4);
  return words.length > 0
    ? words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ')
    : "ENTERPRISE PLATFORM";
}

function inferActorsFromPrompt(prompt: string): string {
  const p = prompt.toLowerCase();
  if (p.includes('supply chain') || p.includes('logistics') || p.includes('forecasting') || p.includes('keytruda')) {
    return "Global Supply Chain Planners, Manufacturing Site Leads, Logistics Managers, Plant Operations";
  } else if (p.includes('doctor') || p.includes('clinical') || p.includes('patient') || p.includes('health')) {
    return "Clinicians, Lead Researchers, Medical Data Analysts, Health IT Engineers";
  } else if (p.includes('bank') || p.includes('fraud') || p.includes('fintech') || p.includes('payment')) {
    return "Financial Analysts, Risk Engineers, Fraud Investigators, Security Operations";
  } else if (p.includes('iot') || p.includes('device') || p.includes('sensor') || p.includes('factory')) {
    return "IoT Platform Architects, Field Operations, Data Engineers, SREs";
  }
  return "Domain Specialists, System Engineers, Data Architects, Business Analysts";
}

function inferOutcomesFromPrompt(prompt: string): string {
  const p = prompt.toLowerCase();
  if (p.includes('supply chain') || p.includes('stockout') || p.includes('keytruda') || p.includes('biologic')) {
    return "Optimized Safety Stock, Zero Keytruda Stockouts, Reduced Cold-Chain Biologic Wastage, GxP Audit Traceability";
  } else if (p.includes('latency') || p.includes('real-time') || p.includes('streaming')) {
    return "Sub-10ms Streaming Ingestion, Zero Data Loss, Real-Time Telemetry Analytics";
  } else if (p.includes('security') || p.includes('compliance') || p.includes('hipaa') || p.includes('pci')) {
    return "100% Regulatory Compliance, Zero-Trust Encryption, Automated Audit Trail";
  }
  return "Accelerated Operational Efficiency, 99.99% Availability, Automated Lifecycle Governance";
}

function getDomainNeutralUseCaseTitle(archId?: string): string {
  if (!archId) return "ENTERPRISE SOLUTION ARCHITECTURE";
  if (archId.includes('rag')) return "COGNITIVE AGENTIC RAG SYSTEM";
  if (archId.includes('pipeline')) return "END-TO-END DATA & AI PIPELINE";
  if (archId.includes('erd')) return "DIMENSIONAL DATA MODEL (ERD)";
  if (archId.includes('sequence')) return "SYSTEM EXECUTION SEQUENCE FLOW";
  if (archId.includes('cicd')) return "DEVSECOPS CI/CD WORKFLOW";
  if (archId.includes('iot')) return "INDUSTRIAL IOT TELEMETRY PIPELINE";
  if (archId.includes('dr')) return "MULTI-REGION DISASTER RECOVERY";
  if (archId.includes('vpc')) return "ZERO-TRUST VPC INFRASTRUCTURE";
  return "ENTERPRISE CLOUD ARCHITECTURE";
}

function getDomainNeutralProblemStatement(archId?: string): string {
  return "Automate enterprise data workflows, secure ingestion channels, and intelligent analytics processing to accelerate operational decision-making.";
}

function getDomainNeutralPrimaryActors(archId?: string): string {
  return "Enterprise Architects, Data Engineers, Systems Analysts, Security Operations";
}

function getDomainNeutralTargetOutcomes(archId?: string): string {
  return "Accelerated Processing Timelines, High Availability, End-to-End Governance";
}
