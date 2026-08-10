import { getTechnicalArchitectureXml } from './technicalArchitectureXmls';
export { getTechnicalArchitectureXml };
import {
  compileSpecToDrawioXml,
  getExactItacsReferenceXml,
  getExactSequenceDiagramReferenceXml,
  getExactDataAiPipelineReferenceXml,
  getExactSecureDeploymentMapReferenceXml,
  getExactDevopsCicdPipelineReferenceXml,
  getExactUnifiedSystemViewReferenceXml,
  getBenchmarkItacsSpec,
  getBenchmarkErdSpec,
  getBenchmarkAgenticRagSpec,
  getBenchmarkSequenceDiagramSpec,
  getBenchmarkDataAiPipelineSpec,
  getBenchmarkSecureDeploymentMapSpec,
  getBenchmarkDevopsCicdPipelineSpec,
  getBenchmarkUnifiedSystemViewSpec,
  getBenchmarkTechnicalArchitectureSpec
} from './diagramCompiler';
import { injectUseCaseFlavor } from './diagramCleaner';
import { preflightVerifyAndHealXmlAcrossAll6Audits } from './preflightAuditEngine';
import {
  getExactMultiAgentLangGraphReferenceXml,
  getExactAgentHarnessRuntimeReferenceXml,
  getExactAgentGovernanceHitlReferenceXml,
  getExactSixRsMigrationMatrixXml,
  getExactHybridStranglerTransitionXml,
  getExactCloudFinopsChargebackXml,
  getExactAiCoeOperatingModelXml,
  getExactMcpContextGatewayXml,
  getExactLogicalAiConfigTenantXml,
  getExactHubAndSpokeAgentConfigXml,
  getExactUnifiedDataGovernanceXml,
  getExactDataOpsAnomalyDetectionXml,
  getExactGoLiveWarRoomRunbookXml,
  getExactEnterpriseSreObservabilityXml,
  getExactDataResidencySovereignMapXml,
  getExactFederatedIamSsoXml,
  getExactAiTrismGuardrailsXml,
  getExactSecureDeploymentMapWidescreenXml,
  getExactAgenticRagWidescreenXml,
  getExactModernDataStackWbsXml,
  getExactDataAiPipelineWbsXml,
  getExactGcpDataLakehouseWbsXml,
  getExactMicroFrontendsXml,
  getExactFintechPaymentsXml,
  getExactGenomicsClinicalXml,
  getExactSupplyChainXml,
  getExactEvalSafetyXml,
  getExactAgenticMeshXml,
  getExactValueStreamMapXml,
  getExactAsIsToBeProcessFlowXml
} from './newEnterpriseReferenceXmls';

export interface ArchitectureTypeOption {
  id: string;
  name: string;
  category: string;
  prompt: string;
  whenToUse: string;
  previewImage?: string;
}

export const BUSINESS_ARCHITECTURE_TYPES: ArchitectureTypeOption[] = [
  {
    id: "conceptual_diagram",
    name: "Conceptual Diagram",
    category: "Executive & Business Strategy",
    whenToUse: "High-level 3-stage business architecture showing ingestion, processing hub, and strategic outcomes",
    prompt: "Enterprise Conceptual Platform:\n- Ingestion: Multi-channel data ingestion across core operational silos.\n- Processing Engine: Core Enterprise Synthesis Engine (Powered by Gemini Enterprise) executing data synthesis, document analysis, and strategic AI workflows.\n- Strategic Outcomes: System Efficiency, Fast Time-to-Value, Strategic Planning & Analysis.\n- Priority Alert: Real-Time Operational Strategy Monitoring."
  },
  {
    id: "unified_system_view",
    name: "Total Unified System View",
    category: "Executive & Business Strategy",
    whenToUse: "Total unified system view combining data flow, MLOps, cognitive architecture, and deployment",
    prompt: "Total Unified System View:\n- Plan & Data Foundation: Enterprise architecture planning, data vetting, and schema lineage.\n- Development & AI Lifecycle: Data engineering DFD, feature store, model development, and governance.\n- Cognitive Architecture & Deployment: Secure VPC network, agent orchestrator, tool endpoints, and observability."
  },
  {
    id: "business_agent_gov_hitl",
    name: "Human-in-the-Loop AI Governance",
    category: "Executive & Business Strategy",
    whenToUse: "Executive workflow showing autonomous agent decision tiers, multi-dimensional risk matrix, confidence escalation rules (>=95%, 75-94%, <75%), and mandatory human sign-off gates",
    prompt: "Human-in-the-Loop Autonomous AI Agent Governance Lifecycle:\n- Tier 1: Multimodal Ingress & Constitutional HHH Safety Gate\n- Tier 2: Run State Machine & Confidence Escalation (>=95% Fast Path, 75-94% Supervisor AI Cross-Verification, <75% Mandatory HITL Escalation Router)\n- Tier 3: Human-in-the-Loop (HITL) Review Workbench & Cryptographic Sign-Off Certificate\n- Tier 4: Autonomous GUI Computer Use OS, Immutable Regulatory Audit Ledger & RLHF Fine-Tuning Feedback Loop"
  },
  {
    id: "erd",
    name: "Dimensional Data Model - ERD",
    category: "Data & Lakehouse Architecture",
    whenToUse: "Entity Relationship Diagram (ERD) with dimensional data models, fact/dimension tables, PK/FK, and cardinality",
    prompt: "Act as a Database Architect and Data Modeler. Design a comprehensive Dimensional Data Model (Entity Relationship Diagram - ERD) for an enterprise system. It should include: fact tables, dimension tables, primary and foreign key relationships, attributes, data types, and clear cardinality markings (1:1, 1:N, M:N)."
  },
  {
    id: "agentic_rag",
    name: "Cognitive Architecture / Agentic RAG",
    category: "AI & Cognitive Systems",
    whenToUse: "AI Cognitive Architecture with multi-agent orchestration, RAG retrieval, vector search, and LLM reasoning",
    prompt: "Act as an AI Chief Architect and Cognitive Systems Engineer. Design an advanced Cognitive Architecture featuring Agentic Retrieval-Augmented Generation (RAG). It should include: multi-agent orchestration loops, dynamic tool execution, vector embedding database (pgvector/Pinecone), document chunking & ingestion pipelines, semantic search retrieval, LLM reasoning engine (Gemini 3.6 Pro/Flash), and fallback validation guardrails."
  },
  {
    id: "sequence_diagram",
    name: "Micro Dynamic UML Sequence Diagram",
    category: "Backend & Systems Architecture",
    whenToUse: "Micro UML sequence diagram detailing step-by-step API execution, PII checks, and ReAct loops",
    prompt: "Act as an API Chief Architect and Backend Systems Engineer. Design a chronologically exact, step-by-step Micro Dynamic Sequence Diagram (Execution Loop) for an Agentic RAG ecosystem. It should include: standard UML Sequence lifelines (rectangles on dashed lines), light cream background theme, synchronous solid arrows for API calls, dashed return arrows for context observations, and callout badges for PII/Ethical sourcing checks, ReAct Thought/Action loops, and IAM private access VPC-SC enforcement."
  },
  {
    id: "data_ai_pipeline",
    name: "Data & AI Pipeline",
    category: "Data & Lakehouse Architecture",
    whenToUse: "Data & AI Pipeline combining DFD data ingestion, feature engineering, MLOps lifecycle, and serving",
    prompt: "Enterprise Data & AI Pipeline:\n- Data Ingestion (DFD): Multi-channel raw data ingestion and Cloud Lakehouse storage.\n- Feature Engineering: Automated pipeline transformations and Model-Ready Feature Store.\n- MLOps Lifecycle: Continuous model training, registry, inference API endpoints, and monitoring.\n- Serving & Analytics: Dashboards, Mobile/Web API serving, and telemetry analytics."
  },
  {
    id: "secure_deployment_map",
    name: "Secure Deployment Topology Map",
    category: "Cloud Infrastructure & Networking",
    whenToUse: "Secure deployment topology map with edge load balancing, private VPC subnets, and security boundaries",
    prompt: "Enterprise Secure Deployment Map:\n- Zone 1: Edge & Ingress filtering (Cloud Armor WAF, External Load Balancer, API Gateway).\n- Zone 2: Private Network & Subnets (Application Subnets, Data/AI Subnets, Isolated Pods).\n- Security Perimeters: VPC Service Controls, IAM RBAC, Private Service Connect (PSC) endpoints."
  },
  {
    id: "devops_cicd_pipeline",
    name: "DevSecOps Polyrepo CI/CD Pipeline",
    category: "DevSecOps & Platform Engineering",
    whenToUse: "Enterprise DevSecOps polyrepo CI/CD pipeline spanning Plan, Git Source, 3-track CI/CD, and promotion",
    prompt: "Enterprise DevSecOps Polyrepo CI/CD Pipeline:\n- Plan & Govern: Data modeling and architectural governance.\n- Git Source & IaC: Polyrepo source control with automated PR protection rules.\n- 3-Track CI/CD: Data Engineering, Application Code, and MLOps build & test tracks.\n- Evaluation & Promotion: Automated quality gates, human-in-the-loop approval, and canary deployment."
  },
  {
    id: "value_stream_map",
    name: "Value Stream Map (VSM) - AI Delivery",
    category: "Executive & Business Strategy",
    whenToUse: "Enterprise AI Architecture & Delivery Value Stream Map (VSM) mapping Lead Time, Process Time (%C/A), Information Plane, Kaizen bursts, and DORA flow efficiency ladder from Prompt Ingestion to Production GitOps.",
    prompt: "Act as an Enterprise Agile & Lean Value Stream Architect. Design a production-grade WBS 1.2.1 Enterprise AI Architecture & Delivery Value Stream Map (VSM). Include: Top Information & Control Plane (Customer Demand, Jira Portfolio Steering, Weekly ARB Committee, SRE Telemetry) -> Core Execution Value Stream Pipeline (Stage 1 Prompt Ingestion, Stage 2 Gemini 3.1 Pro Compilation, Stage 3 AI TRiSM & FinOps, Stage 4 ARB & HITL Sign-Off, Stage 5 GitOps IaC Provisioning) with Queue WIP Triangles and Kaizen Bursts -> Bottom Lead Time & Process Time Ladder with Flow Efficiency Scorecard and VSM Symbology Legend."
  },
  {
    id: "asis_vs_tobe_process_flow",
    name: "As-Is vs. To-Be Process Flow",
    category: "Executive & Business Strategy",
    whenToUse: "Enterprise Modernization Process Flow comparing fragile on-premises monolithic legacy state against Google Cloud real-time Lakehouse and Gemini 3.1 Pro cognitive architecture with Strangler Fig modernization bridge and ROI transformation scorecard.",
    prompt: "Act as an Enterprise Cloud Modernization & AI Transformation Principal Architect. Design a production-grade WBS 0.1.1 As-Is vs. To-Be Process & Architecture Flow blueprint. Include: Top Zone AS-IS Legacy State (On-Prem VMs/Monolith Ingress, Nightly Informatica Batch ETL, Oracle RDBMS Core, Manual Spreadsheet Review, Static Cognos Reports) -> Center Google Cloud Strangler Fig Modernization Bridge (Apigee API Interceptor & Datastream CDC) -> Bottom Zone TO-BE Target State (Cloud Pub/Sub Ingress, Cloud Dataflow Streaming Pipeline, Gemini 3.1 Pro Reasoning Hub, AI TRiSM & HITL Gate, Cloud Run Serverless Serving, BigQuery Lakehouse, AlloyDB HA, Dataplex ABAC, Cloud KMS) -> Right Panel Executive Transformation Scorecard with 68% OpEx Cut and Year 1 ROI."
  }
];

export const TECHNICAL_ARCHITECTURE_TYPES: ArchitectureTypeOption[] = [
  {
    id: "tech_multi_agent_langgraph",
    name: "LangGraph Stateful Multi-Agent DAG",
    category: "AI & Cognitive Systems",
    whenToUse: "Flagship stateful Directed Acyclic Graph (DAG) multi-agent orchestration engine featuring Master Supervisor Router, parallel worker cluster, sandboxed code execution, human-in-the-loop gates, and pgvector long-term memory store",
    prompt: "Flagship Stateful Directed Acyclic Graph (DAG) Multi-Agent Orchestration Platform:\n- Tier 1: Multimodal WebRTC / 2M+ Token Long-Context Ingress, Master Directed Graph Supervisor Agent & Run State Machine Checkpoint Store\n- Tier 2: Specialized Autonomous Worker Cluster (Research & Grounding Agent, Code/SQL/GUI Synthesis Agent, Verification & Safety Critic Agent) with Hierarchical Peer Hand-off Routines\n- Tier 3: Parallel Sandboxed Code Execution Kernel, Autonomous GUI OS Computer Use Container, gRPC/REST Tool Call Gateway & Long-Term Vector Memory with Ephemeral System Prompt Caching (90% Cost Cut)\n- Tier 4: Run Lifecycle Human Interrupt Approval Gate (requires_action), Final Grounded Response Synthesizer & Distributed Trace Observability"
  },
  {
    id: "tech_agent_harness_runtime",
    name: "Enterprise Agent Harness Runtime Platform",
    category: "AI & Cognitive Systems",
    whenToUse: "Production enterprise AI agent harness platform featuring LiteLLM routing, MCP protocol, hierarchical memory, context compactor, zero-trust IAM, 6-step sandboxed graph engine (gVisor/E2B), and continuous evaluation",
    previewImage: "/templates/agent_harness_runtime_enhanced.png",
    prompt: "Enterprise Agent Harness Runtime Platform: Multi-Modal Ingress & Routing Gateway, MicroVM Sandboxed Code Execution Kernel, Capability-Scoped MCP Tool Gateway, Ephemeral KV Prefix Caching, and Continuous Evaluation / Self-Healing Kernel."
  },
  {
    id: "tech_data_lakehouse_gcp",
    name: "GCP Enterprise Data Lakehouse",
    category: "Data & Lakehouse Architecture",
    whenToUse: "Data Lakehouse architecture on GCP using Cloud Storage BigLake tiers, Dataproc Spark ETL, BigQuery partitioned marts, and Looker BI",
    prompt: "Act as a GCP Data Platform Architect. Design a modern technical Data Lakehouse architecture on Google Cloud. Include: Data ingestion via Cloud Pub/Sub and Storage Transfer Service, landing zones in Cloud Storage (Raw, Clean, Curated tiers), automated schema discovery via BigLake and Dataplex Data Catalog, serverless SQL querying via BigQuery, and enterprise data governance with Cloud IAM and CMEK."
  },
  {
    id: "tech_modern_data_stack",
    name: "Modern Data Stack Architecture",
    category: "Data & Lakehouse Architecture",
    whenToUse: "Modern analytics engineering pipeline combining Debezium CDC, automated Data Contracts quality gates, dbt Silver/Gold marts, and Reverse ETL back to CRM",
    prompt: "Modern Data Stack with CDC & Reverse ETL: Production OLTP PostgreSQL -> Debezium CDC -> Data Contracts & Quality Gate -> dbt Core Silver/Gold Marts -> Looker BI & Reverse ETL Engine (Hightouch/Census) syncing to Salesforce."
  },
  {
    id: "tech_streaming_analytics",
    name: "Real-Time Streaming Analytics",
    category: "Data & Lakehouse Architecture",
    whenToUse: "Real-time streaming analytics and IoT/Edge telemetry ingestion pipeline on GCP using MQTT field gateways, Cloud Pub/Sub, Dataflow Beam ETL, Vertex AI Feature Store, Cloud Bigtable, and BigQuery",
    prompt: "Act as a GCP Big Data & Edge IoT Principal Architect. Design a unified GCP Real-Time Streaming Analytics & Telemetry Pipeline combining: Edge device field gateways (MQTT/HTTPS) & Web telemetry ingestion, Cloud Pub/Sub high-throughput topics and subscriptions, streaming ETL processing via Cloud Dataflow (Apache Beam), real-time feature engineering into Vertex AI Feature Store, time-series & analytical warehousing in Cloud Bigtable and BigQuery with partitioned tables, and interactive operational dashboards via Looker Studio / Grafana."
  },
  {
    id: "tech_c4_system_context",
    name: "C4 System Context & Container Model",
    category: "Backend & Systems Architecture",
    whenToUse: "C4 Model Level 1 Context & Level 2 Containers mapping external B2B actors, IAP auth gateway, core serverless containers, database core, and third-party SaaS APIs",
    prompt: "C4 Enterprise System Context & Container Model: External B2B Customers & SRE Staff -> Identity Gateway & API Gateway -> Core Next.js SPA & Cloud Run API Microservices -> AlloyDB HA Database & Stripe/FedEx External APIs."
  },
  {
    id: "tech_event_driven_eda",
    name: "Enterprise Event-Driven EDA Mesh",
    category: "Backend & Systems Architecture",
    whenToUse: "Decoupled enterprise event-driven architecture featuring Order producers, Schema Registry contract validation, Kafka/PubSub multi-topic broker, Dead-Letter Queue (DLQ) recovery, and decoupled GKE consumer groups",
    prompt: "Enterprise Event-Driven Architecture (EDA): Order Microservice Producers -> Schema Registry Avro Gate -> Partitioned Kafka/PubSub Broker -> Dead-Letter Queue (DLQ) automated recovery -> GKE Decoupled Consumer Groups -> Cloud Spanner Immutable Event Ledger."
  },
  {
    id: "tech_serverless_gcp",
    name: "Serverless Web Application - GCP",
    category: "Cloud Infrastructure & Networking",
    whenToUse: "Official GCP serverless web application architecture using Cloud Run, Cloud Functions, API Gateway, Pub/Sub, Workflows, Firestore, and Memorystore",
    prompt: "Act as a GCP Principal Cloud Architect. Design a production-grade serverless web application architecture on Google Cloud. Include: Global Cloud Load Balancing with SSL & Cloud CDN, API Gateway with Identity-Aware Proxy (IAP) auth, Cloud Run microservices with zero-cold-start tuning, Cloud Functions for event-driven image processing, Cloud Pub/Sub with dead-letter queue, Cloud Workflows multi-step orchestration, Cloud Firestore auto-sharded document DB, Memorystore for Redis sub-millisecond cache, Cloud Storage (GCS), and Google Cloud Operations Suite with complete Terraform IaC and IAM least-privilege matrix."
  },
  {
    id: "tech_multi_region_dr",
    name: "Multi-Region DR GCP Active-Passive",
    category: "Cloud Infrastructure & Networking",
    whenToUse: "SRE-grade GCP active-passive disaster recovery architecture with Global L7 HTTPS Load Balancing, Cloud Run pilot light compute, Cloud SQL HA with cross-region asynchronous replication (<5min lag), Dual-Region GCS, and automated failover runbooks.",
    prompt: "Act as a GCP Principal Reliability Engineer & SRE. Design a production-grade GCP Active-Passive Multi-Region Disaster Recovery architecture across Region A (US-East1 Active) and Region B (US-West1 Pilot Light Standby). Include: Global L7 HTTPS Load Balancer with Anycast IP & SSL Offloading, Cloud Run microservices (100% active load vs 10% warm pilot light), Cloud SQL HA with cross-region asynchronous replication (<5min data lag), Dual-Region GCS bucket with Turbo Replication, and a documented 5-step automated failover and zero-data-loss failback runbook with full SLA recovery matrix."
  },
  {
    id: "six_rs_migration_matrix",
    name: "6Rs Migration Disposition Matrix (Assessment Phase)",
    category: "Cloud Infrastructure & Networking",
    whenToUse: "WBS 0.1.2 6Rs Migration Disposition Matrix evaluating legacy components (VMs, DBs, Mainframe, Monoliths, File Shares) across Business Value, Technical Feasibility, and Cloud Compatibility into Rehost, Replatform, Refactor, Retain, Retire, and Repurchase.",
    prompt: "Act as an Enterprise Cloud Migration Architect. Design a production-grade WBS 0.1.2 6Rs Migration Disposition Matrix. Include: Legacy Components (On-Premise VMs, Legacy Databases Oracle/SAP, Mainframe Systems, Custom Monolith Apps, File Shares) -> Migration Assessment Logic (Business Value, Technical Feasibility, Cloud Compatibility) -> 6Rs Dispositions (Rehost Lift & Shift, Replatform Lift & Reshape, Refactor Re-architect, Retain Revisit Later, Retire Decommission, Repurchase Drop & Shop) -> Cost Optimization GCAF & Continuous Validation feedback loops."
  },
  {
    id: "hybrid_strangler_transition",
    name: "Hybrid / Strangler Fig Transition (Assessment Phase)",
    category: "Cloud Infrastructure & Networking",
    whenToUse: "WBS 0.1.3 Hybrid Cloud & Strangler Fig Transition Architecture with Apigee API Gateway request interception, Secure Cloud Interconnect, Site-to-Site VPN, and parallel on-premise to GCP modern microservice execution.",
    prompt: "Act as an Enterprise Cloud Migration Architect. Design a production-grade WBS 0.1.3 Hybrid / Strangler Fig Transition Architecture. Include: On-Premises Datacenter (Legacy Monolithic App v1.0, Legacy SQL DB, Mainframe System) -> Secure Cloud Interconnect (Primary Path) & Site-to-Site VPN (Backup Path) with SOC 2 & HIPAA perimeters -> Apigee API Gateway (Strangler Fig Interface) routing Legacy features back to on-prem vs Modern/New features to GKE/Cloud Run Microservices and Cloud SQL for PostgreSQL."
  },
  {
    id: "cloud_finops_chargeback",
    name: "Cloud FinOps & Chargeback Model",
    category: "Cloud Infrastructure & Networking",
    whenToUse: "WBS 1.1.3 Cloud FinOps & Chargeback Model for unit cost allocation, GenAI Vertex AI token tracking, BigQuery cost data lake, and automated showback/chargeback reporting.",
    prompt: "Act as an Enterprise FinOps & Cloud Economics Architect. Design a production-grade WBS 1.1.3 Cloud FinOps & Chargeback Model. Include: Ingestion & Usage Tracking (GKE Kubecost, GCE VMs, GCS, Cloud SQL, BigQuery, Vertex AI Token Tracking) -> Data Aggregation (GCP Billing Exports, Kubecost Costs, Vertex AI Token Cost Calculator, Tagging Policies into Unified BigQuery Cost Data Lake) -> Looker Studio Analytics & FinOps Governance Engine (Tagging Enforcement, Budgets & Alerts, Commitment Manager CUDs/SUDs, Cloud Monitoring) -> Chargeback Generator for Business Units (Engineering, Product, Data Science & GenAI) under Cloud IAM access control and Secret Manager."
  },
  {
    id: "ai_coe_operating_model",
    name: "AI Center of Excellence (CoE) Operating Model",
    category: "Cloud Infrastructure & Networking",
    whenToUse: "WBS 1.1.5 AI Center of Excellence (CoE) Operating Model for AI governance, prompt curation loops, Looker analytics, GAMP 5 compliance, and executive funding loops.",
    prompt: "Act as an Enterprise AI Strategy & Governance Architect. Design a production-grade WBS 1.1.5 AI Center of Excellence (CoE) Operating Model. Include: Exec & Strategy, Business Plan, Cloud Plans -> GAMP 5 Compliance Framework (Validated) -> AI Center of Excellence (Governance & Strategy with Adoption Modeling; Process & Operations with User Onboarding, Prompt Curation, Feedback Loops; Analytics & Measurement with Performance Metrics and Utilization Insights) -> AI CoE Operating Model artifact -> Total Unified System View (WBS Platform View, PSO Operations Support) -> CSV data export -> Funding and Execs & Business Leads approval loop."
  },
  {
    id: "mcp_context_gateway",
    name: "Model Context Protocol (MCP) Gateway",
    category: "Cloud Infrastructure & Networking",
    whenToUse: "WBS 2.1.5 Model Context Protocol Gateway (MCP Context Gateway) with Universal Context Ingestion Adapters, MCP Message Bus & Normalization, and Tool Proxies.",
    prompt: "Act as an Enterprise AI Platform Architect. Design a production-grade WBS 2.1.5 Model Context Protocol Gateway (MCP Context Gateway). Include: 5 Ingestion Sources (Database Source Cloud SQL, Object Storage Source Cloud Storage, Vector DB Source Vertex AI Vector Search, Logs Cloud Logging, Legacy Systems) -> Apigee & Looker Studio -> Security & Secret Management (Workload Identity IAM, VPC-SC, Secret Manager) -> Model Context Protocol (MCP) Gateway Node.js/Python (Universal Context Ingestion Adapters, Context Schema Mapping Engine, MCP Message Bus & Normalization with MCP Schemas, SOC 2 Compliance Filtering, IAM Access Control, BigQuery Audit Trail Logging, Tool Proxies & Downstream Integration with Cognitive Arch / Agentic RAG, API Proxy, GCP Service Proxy, Legacy Tool Proxy) -> External API Actionable Tool Systems -> Looker Studio Analytics & Total Unified System View (WBS Context / Platform View & PSO Support) -> Legend."
  },
  {
    id: "logical_ai_config_tenant",
    name: "Product Plan - Logical AI Config (Tenant Architecture)",
    category: "Cloud Infrastructure & Networking",
    whenToUse: "Product Plan: Multi-tenant Logical AI Config architecture modeling environment segregation across Dev/Test/Prod, Agent Designer topologies, and SOC 2 / GxP compliance within Gemini Enterprise.",
    prompt: "Act as an Enterprise AI Platform Architect. Design a production-grade Product Plan - Logical AI Config (Tenant Architecture) blueprint. Include: App Owners & Devs -> Logical AI Config Management Console & APIs -> Enterprise IAM -> Development, Testing, and Production Environments with Tenant Boundaries -> Platform Orchestrator -> Gemini Enterprise Engine instances -> Production Workspace A with Logical AI Config (Model Selection Gemini 3.6 Pro, System Instructions, Memory & Context Management, Tool Invocation Definitions) and Agent Designer (Single-Agent, Multi-Agent Chains, Task-Based Sub-Agents) -> Application Logic invocation -> SOC 2 & GxP Compliance Guardrails -> VPC Firewalls, Centralized Audit Logging, and KMS Configuration Encryption -> Legend."
  },
  {
    id: "hub_and_spoke_agent_config",
    name: "Hub-and-Spoke Agent Configuration Map (WBS 2.2.2)",
    category: "Cloud Infrastructure & Networking",
    whenToUse: "WBS 2.2.2 Hub-and-Spoke Agent Configuration Map with Orchestrator Parent Agent Hub, 3 domain sub-agents (Support, Fulfillment, Knowledge), Logical UI Matrix, HITL Gate, and 21 CFR Part 11 Audit Trail.",
    prompt: "Act as an Enterprise AI Solutions Architect. Design a production-grade WBS 2.2.2 Hub-and-Spoke Agent Configuration Map blueprint. Include: Workspace X (Tenant Y - Production Environment) -> 3 Sub-Agents / Spokes (Customer Support with Zendesk API & BigQuery/Vector Grounding, Fulfillment SA with SAP ERP API & Cloud Storage Grounding, Knowledge Base SA with GCS PDF/Doc Grounding) -> Orchestrator (Parent Agent) Hub (General Config Gemini 3.6 Pro, System Instructions, Context, Memory TTL; Multi-Agent Router / Dispatcher Logic rules; Shared Memory & State; Vertex AI Agent Runtime; 21 CFR Part 11 Compliance Gate) -> Logical UI Configuration Matrix (Prompt editors, Rule editors, Knowledge Source selectors, API Config panels) -> Logical UI Config Management Console -> Human-in-the-Loop (HITL) Gate -> 21 CFR Part 11 Immutable Audit Trail & E-Signature Ledger -> Persona Dashboards (AI Architect, W&T Arch, Agent Economic & Runtime Metrics) -> Legend."
  },
  {
    id: "unified_data_governance",
    name: "Unified Data Governance & Access Control (WBS 3.1.4)",
    category: "Cloud Infrastructure & Networking",
    whenToUse: "WBS 3.1.4 Unified Data Governance & Access Control Architecture across 4 horizontal tiers: Collibra Strategy, Dataplex ABAC Engine, Modern Data Stack, and Executive Compliance Scorecards.",
    prompt: "Act as a Principal Enterprise Data Architect. Design a production-grade WBS 3.1.4 Unified Data Governance & Access Control Architecture (To-Be State) blueprint. Include: 4 Horizontal Zones (Top Zone Strategy & Governance Interface with CDO, Data Stewards, Collibra Data Intelligence Cloud; Zone Two Unified Control Plane Orchestration with Dataplex Unified Control Plane, Active Data Control Plane, Dataplex Data Catalog, Data Profiling & Quality, ABAC Enforcement Engine; Third Zone Enforced Technical Data Tier with BigQuery, Cloud Storage, Dataflow, Dataproc, Vertex AI; Bottom Zone Outcomes & Compliance Reporting with CDO Reporting Dashboard, GDPR Guardrails, HIPAA Data Masking, GxP Audit Trail, Data Quality Scorecards) -> Legend."
  },
  {
    id: "dataops_anomaly_detection",
    name: "DataOps & Anomaly Detection (WBS 3.1.7)",
    category: "Cloud Infrastructure & Networking",
    whenToUse: "WBS 3.1.7 DataOps & Anomaly Detection Architecture spanning Looker Studio observability, SRE PagerDuty incident alerts, Dataplex SODA/CARLO anomaly engine, and hallucination-free Vertex AI model grounding.",
    prompt: "Act as a Lead DataOps & Reliability Architect. Design a production-grade WBS 3.1.7 DataOps & Anomaly Detection Architecture (To-Be State) blueprint. Include: 5 Horizontal Zones (Top Zone Strategy & Observability Dashboard with Looker Studio 8-metric reporting; Second Zone Incident Management & SRE View with SRE, Cloud Monitoring, PagerDuty, RCA feedback loop; Third Zone The Core Dataplex Integrated DataOps Control Plane with Partner observability, SODA Quality checks, Active Schema Drift Monitoring, Anomaly Detection Engine, CARLO observability, CSV Checkpoints, Reliability Guardrails; Fourth Zone Enforced Pipeline & Consumption with Validated GCS Lakes and Vertex AI Hallucination Prevention; Bottom Zone Unified Modern Data Stack with BigQuery, GCS, Cloud SQL, Dataflow, Dataproc, External SaaS) -> Legend."
  },
  {
    id: "golive_warroom_runbook",
    name: "Go-Live Cutover & War Room Runbook (WBS 6.2.1)",
    category: "Cloud Infrastructure & Networking",
    whenToUse: "WBS 6.2.1 Go-Live Cutover & War Room Runbook across 3 horizontal layers: Preparation & Approval Gates, War Room & Opsgenie Execution with 5-Step Minute-by-Minute Cutover & Automated Rollback Script, and Post-Launch Day-2 Operations.",
    prompt: "Act as a Lead DevSecOps & SRE Solutions Architect. Design a production-grade WBS 6.2.1 Go-Live Cutover & War Room Runbook (Day-1 Cutover Phase / To-Be State) blueprint. Include: 3 Horizontal Layers (Layer 1 Top Preparation & Approval Phase with CI/CD Pipeline, WORM storage Go-Live Prep Checklist, Release Manager & App Owner Go/No-Go Decision Gate, Confluence Runbook Draft, Jira Cutover Ticket; Layer 2 Center The War Room & Live Execution with SRE, Live Communication Channel, Enterprise War Room banner, Opsgenie Integration Engine, 5-Step Minute-by-Minute Execution Script, Automated Rollback Script with DNS fallback/MFE rollback/Disable AI Agent/Restore Data snapshots and Red Alert; Layer 3 Bottom Post-Launch Day-2 Operations & Support with SRE, Release Manager, Dynamic Dashboards, Active Data Control Plane, Go-Live Verification Scorecard) -> Legend."
  },
  {
    id: "enterprise_sre_observability",
    name: "Enterprise SRE & Observability (WBS 6.1.1)",
    category: "Cloud Infrastructure & Networking",
    whenToUse: "WBS 6.1.1 Enterprise SRE & Observability Architecture spanning Prerequisite CI/CD flow, Observed Workloads (Client, Microservices, AI Agents, Data Tier), Unified Telemetry Pipeline Core, Datadog SIEM, Looker Studio dynamic dashboards, automated drift remediation, and PagerDuty incident management.",
    prompt: "Act as a Principal SRE & Observability Solutions Architect. Design a production-grade WBS 6.1.1 Enterprise SRE & Observability Architecture (Day-2 Operations / To-Be State) blueprint. Include: Left Prerequisite Flow (Cloud-Native CI/CD with Git Repository, Jenkins, GitLab); Container 1 Observed Workloads (GCP Workload Ingress with Client Applications, Microservices on Cloud Run/GKE, AI Agents Gemini Pro, and Data Tier Cloud SQL/BigQuery emitting logs, metrics, traces); Container 2 Unified Observability & Telemetry Pipeline (The Core with distributed tracing, Cloud Logging with SOC 2 log sinks, Cloud Monitoring metrics aggregation, and Operational Excellence Control Plane for SRE SLO/SLA definitions and budget alerts); Container 3 Actionable Operations & Reporting (Datadog Observability & SIEM Integration, Looker Studio dynamic dashboards with SLO Health Score, Capacity Utilization, Cost Anomalies, Error Budget Burn, personas SRE, Ops Team, DevSecOps, Day-2 Ops Drift Detection & Automated Remediation with Automated Runbooks, and Incident Management with Cloud Monitoring Alerts and PagerDuty receiving RED alerts) -> Legend."
  },
  {
    id: "data_residency_sovereign_map",
    name: "Data Residency & Sovereign Cloud Map (WBS 5.1.6)",
    category: "Cloud Infrastructure & Networking",
    whenToUse: "WBS 5.1.6 Data Residency & Sovereign Cloud Map modeling isolated regional perimeters across EU-West4 (The Netherlands) and US-Central1 (Iowa) with VPC Service Controls, restricted GCP APIs, cross-border GCP VPC-SC bridge, Looker Studio compliance reporting (GDPR, EU AI Act, HIPAA), and async management plane (Dataplex, Cloud Logging).",
    prompt: "Act as a Principal Security & Sovereign Cloud Architect. Design a production-grade WBS 5.1.6 Data Residency & Sovereign Cloud Map (To-Be State, Infra Provisioning Phase) blueprint. Include: Top Title Banner & GDPR/EU AI Act/HIPAA Badges; Left Ingress with End Users (Patient data source), SRE/Legal/CISO Personas, Cloud Load Balancing (Global/Regional) with Verified access control; Center Core Sovereign Cloud container with GCP Region EU-West4 (The Netherlands) VPC-SC perimeter, Restricted GCP APIs, Vertex AI Local Inference & Grounding, Cloud Storage Buckets, Cloud SQL GxP keys, Vertex AI Vector Search, Internal Compliant Data Flow; Center Channel with Cross-Border Data Transfer Path, GCP VPC-SC Bridge, and red alert perimeter tripwires; GCP Region US-Central1 (Iowa) VPC-SC perimeter with symmetric restricted services; Right Top Observability & Compliance Reporting container with Looker Studio Dashboards (Regional Data Compliance Score 99.8%, Cross-Border Transfer Audit Logs, VPC SC Perimeter Alerts, Vertex AI Grounding Lineage), Central logging with BigQuery historical data from prerequisite context; Right Bottom Management Plane (Async Flows) with Cloud Infra Lead, Internal metric collectors, Unified Trace Correlation, Vertex AI Monitoring, Dataplex, Cloud Logging, and Async Flow / Audit Flow connectors; Bottom Left Legend -> Footer Note."
  },
  {
    id: "federated_iam_sso",
    name: "Federated IAM & SSO Architecture (WBS 5.1.4)",
    category: "Cloud Infrastructure & Networking",
    whenToUse: "WBS 5.1.4 Federated IAM & SSO Architecture illustrating 4 horizontal tiers: Client Ingress with SOC 2/HIPAA Global Load Balancer, Federated Identity & SSO Broker (OAuth2, SAML, JWT) with Okta / Google Identity Directory federation, enforced downstream modern stack (GKE, Cloud Run, Cloud SQL, Vertex AI Agents, Data Lakes, Dataplex), and analytics compliance reporting.",
    prompt: "Act as a Principal IAM & Security Solutions Architect. Design a production-grade WBS 5.1.4 Federated IAM & SSO Architecture (To-Be State) blueprint. Include: 4 Horizontal Zones (Top Zone: Access Tier - Client Ingress with External/Internal Users, Data Eng, Vertex AI Agents, Enterprise Applications, External Entry Point / Global Load Balancer SOC 2/HIPAA; Second Zone: Control Tier - Federated IdP Brokerage with OAuth2/SAML/JWT requests, Federated Identity & SSO Broker containing OAuth2/SAML/API Token Adapters, User Attribute Mapping Engine, Token Translation Service, MFA Enforcement, Session Management & Auditing, Cloud IAM Policies, Active Identity Control Plane vertical bar, and Okta / Google Identity Directory with Credentials Validation, Attribute Lookup, Policy Directives; Third Zone: Data Tier - Enforced Modern Stack with GKE Clusters, Cloud Run Services, Cloud SQL Databases, Vertex AI Agents Workload Identity, Data Lakes, Dataplex, and System Element Legend; Fourth Zone: Analytics & Compliance Reporting with Personas IAM Architect, Cloud Infra Lead, CISO, Data Steward, Reporting Cards Authentication Audit Logs, User Access Report, Agent Token Usage, Compliance Checks OAuth2/OIDC, SAML, JWT Token Check, HIPAA Guardrails, Central Logging, and Bottom Right Legend) -> Metadata Table."
  },
  {
    id: "tech_ai_trism_guardrails",
    name: "AI TRiSM Security Guardrail Pipeline (WBS 4.3.1)",
    category: "Cloud Infrastructure & Networking",
    whenToUse: "WBS 4.3.1 AI TRiSM (Trust, Risk & Security Management) Guardrail Pipeline for LLM prompt injection defense, PII masking, toxic content filtration, model watermarking, and continuous compliance audit.",
    prompt: "Act as an AI Security & TRiSM Architect. Design a production-grade WBS 4.3.1 AI TRiSM Security Guardrail Pipeline (To-Be State) blueprint. Include: Ingress Gateway with User / Client Request -> AI TRiSM Pre-Inference Inspection (Prompt Injection Defense, PII Tokenization & Masking, Jailbreak Detection) -> Model Inference Tier with Gemini Pro / Claude 3.5 -> Post-Inference Evaluation (Hallucination Checker, Toxicity Scoring, Policy & Legal Filter, Cryptographic Model Watermarking) -> Actionable Egress & Centralized Audit Trail Log."
  },
  {
    id: "tech_micro_frontends",
    name: "Micro-Frontend & UI Architecture (WBS 4.2.1)",
    category: "Backend & Systems Architecture",
    whenToUse: "WBS 4.2.1 Micro-Frontend & Modular UI Composition Architecture showing host container shell, federated remote module mounting (Module Federation / Webpack 5), isolated state buses, and CDN edge delivery.",
    prompt: "Act as a Principal Frontend & Systems Architect. Design a production-grade WBS 4.2.1 Micro-Frontend & UI Architecture (To-Be State) blueprint. Include: Client Ingress with CDN Edge & Global Load Balancer -> Core Host Application Shell (Routing, Global Auth & OIDC Context, Shared Design System, Event Bus) -> Remote Federated Micro-Frontend Modules (Billing MFE, Analytics MFE, Agent Workspace MFE, Catalog MFE) -> Backend for Frontend (BFF) Gateway -> Microservices Tier."
  },
  {
    id: "tech_fintech_payments",
    name: "FinTech Real-Time Payments & ISO 20022 Clearing (WBS 3.2.1)",
    category: "Data & Lakehouse Architecture",
    whenToUse: "WBS 3.2.1 FinTech Real-Time Payments Architecture featuring ISO 20022 message transformation, sub-10ms fraud detection, double-entry payment ledger, and Federal Reserve / FedNow settlement rails.",
    prompt: "Act as a Principal FinTech & Payment Systems Architect. Design a production-grade WBS 3.2.1 FinTech Real-Time Payments & ISO 20022 Clearing blueprint. Include: Payment Ingress -> ISO 20022 Normalization Bus -> Real-Time Fraud & AML Scoring Engine -> Immutable Double-Entry Ledger on Cloud Spanner -> Settlement Rails (FedNow / RTP / SWIFT) -> Regulatory Reporting & AML Audit."
  },
  {
    id: "tech_genomics_clinical",
    name: "Genomics & Clinical Bioinformatics Pipeline (WBS 3.2.2)",
    category: "Data & Lakehouse Architecture",
    whenToUse: "WBS 3.2.2 Clinical Bioinformatics & Genomic Processing Pipeline for FASTQ/BAM ingestion, Nextflow/GATK variant calling, HIPAA compliant GCS data lake, and BigQuery variant analysis.",
    prompt: "Act as a Lead BioInformatics & Health Data Architect. Design a production-grade WBS 3.2.2 Genomics & Clinical Bioinformatics Pipeline blueprint. Include: Sequencer Ingress (FASTQ) -> Cloud Life Sciences / Nextflow GATK Variant Pipeline -> Multi-Tier HIPAA GCS Lakehouse -> BigQuery Variant DB & Feature Store -> Clinical Decision Support & AI Interpretation."
  },
  {
    id: "tech_supply_chain",
    name: "Autonomous Supply Chain & Fleet Telemetry (WBS 3.2.3)",
    category: "Data & Lakehouse Architecture",
    whenToUse: "WBS 3.2.3 Autonomous Supply Chain & Real-Time IoT Fleet Telemetry Architecture with MQTT edge broker, geospatial stream processing, inventory digital twin, and predictive stockout ML models.",
    prompt: "Act as a Principal IoT & Supply Chain Solutions Architect. Design a production-grade WBS 3.2.3 Autonomous Supply Chain & Fleet Telemetry blueprint. Include: IoT Telemetry Ingress -> Dataflow Streaming & Geospatial Indexing -> Digital Twin State in Bigtable -> Inventory Optimization & Predictive Stockout Engine -> Operations Dashboard & Driver Dispatch."
  },
  {
    id: "tech_eval_safety",
    name: "LLM-as-a-Judge AI Safety & Model Evaluation (WBS 4.3.2)",
    category: "AI & Cognitive Systems",
    whenToUse: "WBS 4.3.2 Automated AI Safety & Model Evaluation Platform with multi-metric benchmarking (MMLU, GSM8K, HELM), adversarial red-teaming, LLM-as-a-Judge consensus, and safety scorecards.",
    prompt: "Act as a Principal AI Safety & Evaluation Architect. Design a production-grade WBS 4.3.2 LLM-as-a-Judge AI Safety & Model Evaluation Platform blueprint. Include: Prompt Benchmark Ingress -> Adversarial Red-Teaming Harness -> Multi-Model Parallel Inference -> LLM-as-a-Judge Consensus Jury -> Safety, Toxicity & Truthfulness Scorecards -> Model Promotion Gate."
  },
  {
    id: "tech_agentic_mesh",
    name: "Google Cloud Private Service Connect (PSC) & Zero-Trust Mesh (WBS 5.5.1)",
    category: "Cloud Infrastructure & Networking",
    whenToUse: "WBS 5.5.1 Google Cloud Private Service Connect (PSC) & Zero-Trust Networking Architecture with 100G Dedicated Cloud Interconnect, BGP Cloud Router, Cross-VPC PSC Endpoints, Dedicated PSC NAT Subnets, PROXY Protocol v2, and VPC-SC Perimeters.",
    prompt: "Act as a Principal Google Cloud Networking & Security Architect. Design a production-grade WBS 5.5.1 Google Cloud Private Service Connect (PSC) & Zero-Trust Private Mesh blueprint. Include: On-Premises & Multi-Cloud Ingress (100G Dedicated Cloud Interconnect, BGP Cloud Router, HA VPN, Cloud Armor) -> Consumer Hub VPC (Private GKE Cluster, Cloud DNS Private Zone, PSC Endpoints for Google APIs & Producer Services) -> Google Andromeda SDN & PSC Fabric (Service Attachment, Dedicated PSC NAT Subnet 192.168.10.0/24, PROXY Protocol v2 Header, Network Analyzer) -> Producer AI Hub VPC (Internal L7 ILB, GKE Multi-Agent Pods, Vertex AI Gemini 3.1 Pro Private Endpoint, VPC-SC Perimeter, Cloud KMS HSM)."
  }
];

export const ARCHITECTURE_TYPES: ArchitectureTypeOption[] = [
  ...BUSINESS_ARCHITECTURE_TYPES,
  ...TECHNICAL_ARCHITECTURE_TYPES
];

export function normalizeArchitectureId(archId?: string | null): string {
  if (!archId) return 'conceptual_diagram';
  const id = archId.toLowerCase().trim();
  if (id === 'tech_cicd_pipeline' || id === 'tech_cicd') return 'devops_cicd_pipeline';
  if (id === 'tech_rag_gcp' || id === 'rag_gcp' || id === 'ai_rag') return 'agentic_rag';
  if (id === 'business_agent_governance_hitl' || id === 'business_agent_gov_hitl') return 'business_agent_gov_hitl';
  if (id === 'tech_data_lakehouse' || id === 'tech_data_lakehouse_gcp' || id === 'data_lakehouse') return 'tech_data_lakehouse_gcp';
  if (id === 'tech_microservices_aws' || id === 'tech_microservices_gcp' || id === 'k8s_mesh' || id === 'zero_trust_mesh' || id.includes('zero_trust')) return 'secure_deployment_map';
  if (id === 'tech_event_driven_aws' || id === 'tech_event_driven_eda' || id === 'event_driven_aws') return 'tech_event_driven_eda';
  if (id.includes('6rs') || id.includes('six_rs') || id.includes('disposition')) return 'six_rs_migration_matrix';
  if (id.includes('hybrid_strangler') || id.includes('strangler_fig') || id === 'hybrid_strangler_transition') return 'hybrid_strangler_transition';
  if (id.includes('finops') || id.includes('chargeback') || id === 'cloud_finops_chargeback') return 'cloud_finops_chargeback';
  if (id.includes('ai_coe') || id.includes('operating_model') || id === 'ai_coe_operating_model') return 'ai_coe_operating_model';
  if (id.includes('mcp') || id.includes('context_gateway') || id === 'mcp_context_gateway') return 'mcp_context_gateway';
  if (id.includes('hub_and_spoke') || id.includes('hub_spoke') || id === 'hub_and_spoke_agent_config') return 'hub_and_spoke_agent_config';
  if (id.includes('unified_data_governance') || id.includes('data_governance') || id === 'unified_data_governance') return 'unified_data_governance';
  if (id.includes('dataops_anomaly') || id.includes('dataops') || id === 'dataops_anomaly_detection') return 'dataops_anomaly_detection';
  if (id.includes('golive') || id.includes('war_room') || id.includes('cutover') || id === 'golive_warroom_runbook') return 'golive_warroom_runbook';
  if (id.includes('sre') || id.includes('observability') || id === 'enterprise_sre_observability') return 'enterprise_sre_observability';
  if (id.includes('data_residency') || id.includes('sovereign_map') || id.includes('sovereign') || id === 'data_residency_sovereign_map') return 'data_residency_sovereign_map';
  if (id.includes('federated_iam') || id.includes('iam_sso') || id.includes('federated') || id === 'federated_iam_sso') return 'federated_iam_sso';
  if (id.includes('logical_ai_config') || id.includes('tenant_architecture') || id === 'logical_ai_config_tenant') return 'logical_ai_config_tenant';
  if (id.includes('legacy') || id.includes('dependency_map')) return 'hybrid_strangler_transition';
  if (id.includes('trism') || id.includes('guardrail') || id === 'tech_ai_trism_guardrails') return 'tech_ai_trism_guardrails';
  if (id.includes('micro_frontend') || id.includes('mfe') || id === 'tech_micro_frontends') return 'tech_micro_frontends';
  if (id.includes('fintech') || id.includes('payments') || id === 'tech_fintech_payments') return 'tech_fintech_payments';
  if (id.includes('genomics') || id.includes('clinical') || id === 'tech_genomics_clinical') return 'tech_genomics_clinical';
  if (id.includes('supply_chain') || id.includes('logistics') || id === 'tech_supply_chain') return 'tech_supply_chain';
  if (id.includes('eval_safety') || id.includes('benchmarking') || id === 'tech_eval_safety') return 'tech_eval_safety';
  if (id.includes('agentic_mesh') || id.includes('mesh_swarm') || id === 'tech_agentic_mesh') return 'tech_agentic_mesh';
  if (id.includes('vsm') || id.includes('value_stream') || id === 'value_stream_map') return 'value_stream_map';
  if (id.includes('as_is') || id.includes('asis') || id.includes('tobe') || id.includes('to_be') || id === 'asis_vs_tobe_process_flow') return 'asis_vs_tobe_process_flow';
  return id;
}

export function getArchitectureTypeById(id: string): ArchitectureTypeOption {
  const canonicalId = normalizeArchitectureId(id);
  return ARCHITECTURE_TYPES.find(t => t.id === canonicalId) || BUSINESS_ARCHITECTURE_TYPES[0];
}

export function getTemplateTitle(archId?: string | null): string {
  if (!archId) return 'Architecture Diagram';
  const canonicalId = normalizeArchitectureId(archId);
  const opt = ARCHITECTURE_TYPES.find(t => t.id === canonicalId);
  if (opt) return opt.name;
  return archId;
}

export function getDefaultXmlForArchitecture(archId?: string | null, useCaseContext?: string, userPrompt?: string): string | null {
  if (archId === 'v2_freeform') {
    return null;
  }
  const id = normalizeArchitectureId(archId);
  let xml = '';

  if (id === 'conceptual_diagram') {
    xml = getExactItacsReferenceXml();
  } else if (id === 'erd') {
    xml = compileSpecToDrawioXml(getBenchmarkErdSpec());
  } else if (id === 'agentic_rag' || id.includes('rag')) {
    xml = getExactAgenticRagWidescreenXml();
  } else if (id === 'sequence_diagram') {
    xml = getExactSequenceDiagramReferenceXml();
  } else if (id === 'data_ai_pipeline' || id.includes('data_ai')) {
    xml = getExactDataAiPipelineWbsXml();
  } else if (id === 'secure_deployment_map' || id.includes('secure_deployment') || id.includes('zero_trust')) {
    xml = getExactSecureDeploymentMapWidescreenXml();
  } else if (id === 'devops_cicd_pipeline') {
    xml = getExactDevopsCicdPipelineReferenceXml();
  } else if (id === 'unified_system_view') {
    xml = getExactUnifiedSystemViewReferenceXml();
  } else if (id === 'business_agent_gov_hitl' || id.includes('agent_governance') || id.includes('gov_hitl')) {
    xml = getExactAgentGovernanceHitlReferenceXml();
  } else if (id === 'tech_multi_agent_langgraph' || id.includes('langgraph')) {
    xml = getExactMultiAgentLangGraphReferenceXml();
  } else if (id === 'tech_agent_harness_runtime' || id.includes('agent_harness') || id.includes('agent_runtime')) {
    xml = getExactAgentHarnessRuntimeReferenceXml();
  } else if (id === 'six_rs_migration_matrix') {
    xml = getExactSixRsMigrationMatrixXml();
  } else if (id === 'hybrid_strangler_transition') {
    xml = getExactHybridStranglerTransitionXml();
  } else if (id === 'cloud_finops_chargeback') {
    xml = getExactCloudFinopsChargebackXml();
  } else if (id === 'ai_coe_operating_model') {
    xml = getExactAiCoeOperatingModelXml();
  } else if (id === 'mcp_context_gateway') {
    xml = getExactMcpContextGatewayXml();
  } else if (id === 'logical_ai_config_tenant') {
    xml = getExactLogicalAiConfigTenantXml();
  } else if (id === 'hub_and_spoke_agent_config') {
    xml = getExactHubAndSpokeAgentConfigXml();
  } else if (id === 'unified_data_governance') {
    xml = getExactUnifiedDataGovernanceXml();
  } else if (id === 'dataops_anomaly_detection') {
    xml = getExactDataOpsAnomalyDetectionXml();
  } else if (id === 'golive_warroom_runbook') {
    xml = getExactGoLiveWarRoomRunbookXml();
  } else if (id === 'enterprise_sre_observability') {
    xml = getExactEnterpriseSreObservabilityXml();
  } else if (id === 'data_residency_sovereign_map') {
    xml = getExactDataResidencySovereignMapXml();
  } else if (id === 'federated_iam_sso') {
    xml = getExactFederatedIamSsoXml();
  } else if (id === 'tech_ai_trism_guardrails' || id.includes('trism')) {
    xml = getExactAiTrismGuardrailsXml();
  } else if (id === 'tech_micro_frontends' || id.includes('micro_frontend') || id.includes('mfe')) {
    xml = getExactMicroFrontendsXml();
  } else if (id === 'tech_fintech_payments' || id.includes('fintech') || id.includes('payments')) {
    xml = getExactFintechPaymentsXml();
  } else if (id === 'tech_genomics_clinical' || id.includes('genomics') || id.includes('clinical')) {
    xml = getExactGenomicsClinicalXml();
  } else if (id === 'tech_supply_chain' || id.includes('supply_chain') || id.includes('logistics')) {
    xml = getExactSupplyChainXml();
  } else if (id === 'tech_eval_safety' || id.includes('eval_safety') || id.includes('benchmarking')) {
    xml = getExactEvalSafetyXml();
  } else if (id === 'tech_agentic_mesh' || id.includes('agentic_mesh') || id.includes('mesh_swarm')) {
    xml = getExactAgenticMeshXml();
  } else if (id === 'value_stream_map' || id.includes('value_stream') || id.includes('vsm')) {
    xml = getExactValueStreamMapXml();
  } else if (id === 'asis_vs_tobe_process_flow' || id.includes('asis') || id.includes('as_is') || id.includes('tobe') || id.includes('to_be')) {
    xml = getExactAsIsToBeProcessFlowXml();
  } else if (id === 'tech_modern_data_stack' || id.includes('modern_data_stack')) {
    xml = getExactModernDataStackWbsXml();
  } else if (id === 'tech_data_lakehouse_gcp' || id === 'data_lakehouse' || id.includes('lakehouse')) {
    xml = getExactGcpDataLakehouseWbsXml();
  } else if (id.startsWith('tech_') || id === 'serverless_gcp' || id === 'streaming_pipeline' || id === 'k8s_mesh' || id === 'data_lakehouse' || id === 'rag_gcp' || id === 'event_driven_aws' || id === 'multi_region_dr' || id === 'zero_trust' || id === 'hybrid_interconnect' || id === 'cicd_pipeline' || id === 'enterprise_devsecops_polyrepo') {
    xml = getTechnicalArchitectureXml(id);
  } else {
    xml = getTechnicalArchitectureXml(id || 'tech_serverless_gcp');
  }

  const hasCustomUserPrompt = Boolean(userPrompt && userPrompt.trim() !== '' && userPrompt.trim() !== getTemplateTitle(id));

  const isFlagshipBlueprint = id.includes('agent_harness') || id.includes('modern_data_stack') || id.includes('data_ai') || id.includes('lakehouse') || id.includes('hitl') || id.includes('golive') || id.includes('value_stream') || id.includes('vsm') || id.includes('asis') || id.includes('tobe') || id.includes('agentic_mesh') || id === 'tech_agentic_mesh' || id === 'value_stream_map' || id === 'asis_vs_tobe_process_flow' || id === 'tech_modern_data_stack' || id === 'data_ai_pipeline' || id === 'tech_data_lakehouse_gcp' || id === 'business_agent_gov_hitl' || id === 'golive_warroom_runbook';

  // If user provided a specific custom prompt to re-flavor the diagram, inject the flavor
  if (hasCustomUserPrompt && !isFlagshipBlueprint) {
    const cleanUseCase = (useCaseContext && !/^\d+\.\s/.test(useCaseContext)) ? useCaseContext : undefined;
    const effectiveContext = cleanUseCase || userPrompt || getTemplateTitle(id);
    xml = injectUseCaseFlavor(xml, effectiveContext, userPrompt);
    xml = preflightVerifyAndHealXmlAcrossAll6Audits(xml, id);
  }

  return xml ? xml.replace(/&amp;amp;/g, '&amp;').replace(/&amp;quot;/g, '&quot;').replace(/&amp;lt;/g, '&lt;').replace(/&amp;gt;/g, '&gt;') : null;
}
