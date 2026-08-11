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
  getExactGcpDataLakehouseWbsXml,
  getExactMicroFrontendsXml,
  getExactFintechPaymentsXml,
  getExactGenomicsClinicalXml,
  getExactMultimodalIngestionXml,
  getExactSupplyChainXml,
  getExactEvalSafetyXml,
  getExactAgenticMeshXml,
  getExactValueStreamMapXml,
  getExactAsIsToBeProcessFlowXml,
  getExactStreamingAnalyticsXml,
  getExactLlmopsLifecycleXml,
  getExactLlmCapacityQuotaXml,
  getExactIncidentTriageSreXml,
  getExactServerlessGcpReferenceXml
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
    id: "tech_data_lakehouse_gcp",
    name: "GCP Enterprise Data Lakehouse",
    category: "Data & Lakehouse Architecture",
    whenToUse: "Data Lakehouse architecture on GCP using Cloud Storage BigLake tiers, Dataproc Spark ETL, BigQuery partitioned marts, and Looker BI",
    prompt: "Act as a GCP Data Platform Architect. Design a modern technical Data Lakehouse architecture on Google Cloud. Include: Data ingestion via Cloud Pub/Sub and Storage Transfer Service, landing zones in Cloud Storage (Raw, Clean, Curated tiers), automated schema discovery via BigLake and Dataplex Data Catalog, serverless SQL querying via BigQuery, and enterprise data governance with Cloud IAM and CMEK."
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
    name: "P4-APP-L-08: Serverless EDA Architecture",
    category: "Cloud Infrastructure & Networking",
    whenToUse: "P4-APP-L-08 Serverless Event-Driven Architecture (EDA): End-to-End GE App Integration powered by Google Cloud (GCP), Gemini Platform, and GE App. Features GE App/IoT industrial sensors, Cloud Load Balancing/CDN, Cloud Run ingestion, Pub/Sub event bus, Vertex AI Gemini Platform (Predictive Maintenance & Root Cause Analysis), Cloud Bigtable time-series data, Cloud SQL metadata, BigQuery data analytics lake, Looker reporting, BigQuery ML, and automated Cloud Tasks & Notification Services.",
    prompt: "Act as a Principal Serverless & Event-Driven Systems Architect. Design a production-grade P4-APP-L-08 Serverless EDA Architecture: End-to-End GE App Integration blueprint powered by Google Cloud (GCP), Gemini Platform, and GE App. Include: Column 1 External Sources & Event Triggers (GE App / User Devices with telemetry & user actions, IoT Industrial Sensors with real-time event streaming, Cloud Load Balancing / Cloud CDN); Column 2 Ingestion (Cloud Run Ingestion Microservice performing light validation and enrichment); Column 3 Distributed Asynchronous Messaging (Pub/Sub Topics and Subscriptions with User Action Event); Column 4 Processing (Cloud Run Telemetry Analysis, Cloud Functions Validate Event, Cloud Run Anomaly Interpretation, Cloud Functions Route Action); Column 5 Vertex AI Platform & Gemini (Gemini Model Family Pro/Ultra, Predictive Maintenance Analysis, Root Cause Analysis, Natural Language Insight Generation, Maintenance Order trigger); Column 6 Decision Executed & Storage (Cloud Run decision executor, Cloud Bigtable time-series data, Cloud SQL metadata, BigQuery data analytics lake, Cloud Tasks managing external actions, Pub/Sub egress); Column 7 Actions & Visibility (Looker Visual Insights & BI Reporting with charts mockup, BigQuery ML / Vertex AI ML, External APIs Vendor Systems/Work Order/ERP, Notification Services push alerts) -> Google Cloud + Gemini footer."
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
    name: "P5-GOV-L-04: Enterprise SRE Observability & Incident Triage",
    category: "Cloud Infrastructure & Networking",
    whenToUse: "P5-GOV-L-04 Enterprise Site Reliability Engineering (SRE) & Observability on Google Cloud Platform: DevSecOps pipeline, Multi-Cloud/GCP resources (GKE, Compute, DB), Operations Suite (Monitoring, Logging, Trace, Intelligent AI/ML Root Cause Analysis), automated Incident Management workflow, and SRE operational dashboards.",
    prompt: "Act as a Principal SRE & Observability Solutions Architect. Design a production-grade Enterprise Site Reliability Engineering (SRE) & Observability on Google Cloud Platform (GCP) blueprint. Include: Top DevSecOps Pipeline (Code, Build, Test, Security Scan, Release, Deploy with error reporting); Left Multi-Cloud/Hybrid/GCP Resources (GKE, Compute Engine, App Engine, Pub/Sub, Databases, On-Prem) emitting Metrics, Logs, Traces; Center Integrated Observability Platform (Cloud Monitoring with Uptime Checks and SLI/SLO/SLA, Cloud Logging with centralized ingest, Cloud Trace with distributed tracing, Intelligent Analysis AI/ML Root Cause Analysis); Incident Management & Response Workflow (Critical Alert trigger, Red Incident alert, PagerDuty/Email/Slack notification via Pub/Sub, Analysis & Diagnosis, Mitigation, Post-Mortem, Feedback Loop to DevSecOps); Right Dashboards & Interfaces (Service Health, SLO & Error Budget, Application Performance, Log Analysis, Incident Command Center war room console) and Key SRE Artifacts -> Legend & Notes."
  },
  {
    id: "tech_llm_capacity_quota",
    name: "P5-AI-L-05: LLM Capacity & Quota Management",
    category: "AI & Machine Learning",
    whenToUse: "P5-AI-L-05 Comprehensive Topology for (LLM) Capacity Quota Management: Edge API Gateway rate limiting, Quota Management Service with Redis distributed caching, Cross-Region Load Balancer, Multi-Region Managed GKE Inference Clusters (us-central1, europe-west1) with vLLM/TGI Pods and Vertex AI FinOps Agents, FinOps BigQuery cost reporting, Looker FinOps dashboards, and 4 SRE real-time operational monitoring dashboards.",
    prompt: "Act as a Principal AI Platform & FinOps Solutions Architect. Design a production-grade Comprehensive Topology for (LLM) Capacity Quota Management blueprint. Include: Left Ingress with Consumer Applications -> Edge API Gateway (Apigee / custom GKE Gateway) -> Quota Management Service with Redis distributed cache rate-limiting -> Cross-Region Load Balancer (Google Cloud Load Balancing); Center Multi-Region Managed GKE Inference Clusters in Region 1 us-central1 and Region 2 europe-west1 with LLM serving Pods (vLLM, TGI), NVIDIA GPUs, TPUs, and Vertex AI FinOps Agents; Center-Right FinOps Cost & Usage Hub with usage metrics callout, Vertex AI FinOps API Gateway, FinOps Cost Reporting Database BigQuery, and Looker FinOps Cost Dashboard; Right SRE Dashboards & Monitoring powered by Cloud Monitoring & Cloud Logging (Rate Limiting, Cross-Region LB, LLM Inference Health, Capacity Planning dashboards) -> Bottom Left Legend."
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
    name: "Google Cloud Federated IAM, SSO & Zero-Trust Workload Identity (WBS 5.1.4)",
    category: "Identity, Access & Zero-Trust",
    whenToUse: "Official Google Cloud Federated IAM & SSO reference architecture illustrating Google Cloud Directory Sync (GCDS), Cloud Identity IdP Core, Identity-Aware Proxy (IAP), BeyondCorp Enterprise Context-Aware Access, Cloud IAM RBAC, and Workload Identity Federation.",
    prompt: "Act as a Principal Google Cloud Security & IAM Architect. Design a production-grade Google Cloud Federated IAM, SSO & Zero-Trust Workload Identity Architecture (WBS 5.1.4) mirror blueprint. Include: External Identity Sources (Federated IdP: Active Directory, Okta) with SAML 2.0 / OIDC federation -> User Client (Browser/Device) with 1. SSO Authenticate -> Google Cloud Container with Google Cloud Identity (IdP Core) & GCDS sync -> BeyondCorp Enterprise Context-Aware Access container with 3. Context & Policy Check, 2. Device Context (MDM/Endpoint signals), and 3. Network Context (IP/Geo) -> Identity-Aware Proxy (IAP) zero-trust ingress with 2. Access Request -> App Engine, Cloud Run, Compute Engine (via Load Balancer) -> Cloud IAM with 4. IAM & 5. Backend Access to IAM Policy Document -> Bottom Workload Identity container with Google Kubernetes Engine (GKE), Application Workload Pod, Kubernetes Service Account (KSA) bound to Google Service Account (GSA) via Workload Identity Link badge, 6. Workload Identity API Call & 6. Short-lived credentials, and IAM access to Cloud Storage and BigQuery."
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
    id: "tech_multimodal_ingestion",
    name: "P4-DAT-P-09: Agentic Multi-Modal Ingestion Flow",
    category: "Data & Lakehouse Architecture",
    whenToUse: "P4-DAT-P-09 Google Cloud End-to-End Architecture: Agentic Multi-Modal Ingestion Flow powered by Gemini Platform and Google Earth App (GE App): Custom Clients, multi-modal capture (Text/Docs, Voice/Audio, Image/Video, Geo-Spatial), GCP Services (GCS, STT API, Vision/Video Intelligence, Maps APIs), Gemini-Powered Agentic Orchestrator (Orchestration Agent, Embedding API, Vector Search, Semantic Search, Reasoning Engine), and Knowledge Representation & Actions (BigQuery Knowledge Base, Knowledge Graph, Automated Insights, Alerting Cloud Functions, GE App Visualizations).",
    prompt: "Act as a Principal Multimodal AI & Data Solutions Architect. Design a production-grade Google Cloud End-to-End Architecture: Agentic Multi-Modal Ingestion Flow blueprint. Include: Left Platform Governance & Monitoring rotated strip; Column 1 Multi-Modal Input Sources & User Applications (User Application Custom Client, Google Earth App GE App, 4 channels: Text/Docs, Voice/Audio, Image/Video, Geo-Spatial); Column 2 Capture & Multi-Modal Processing GCP Services (Cloud Storage GCS, Speech-to-Text API, Vertex AI Vision API & Video Intelligence API, Google Maps Platform APIs); Column 3 Gemini-Powered Agentic Orchestrator Vertex AI (Orchestration Agent powered by Gemini 1.5 Pro, Agentic Planning & Reasoning, Function Calling Tooling, Vertex AI Embedding API, Vertex AI Vector Search, Multimodal Semantic Search, Multimodal Gemini Reasoning Engine, agent context feedback); Column 4 Knowledge Representation & Actions (BigQuery Knowledge Base, Knowledge Graph Storage, Automated Insights & Reports, Alerting & Notifications Cloud Functions, GE App Annotations & Visualizations); Bottom Platform Governance & Monitoring (IAM, Vertex AI Model Monitoring, Cloud Logging)."
  },
  {
    id: "tech_genomics_clinical",
    name: "Pharma-Specific Genomics & Drug Discovery Pipeline with Agentic AI",
    category: "Industry Specialized Solutions",
    whenToUse: "Industry-Specific Google Native Pharma Genomics & Drug Discovery Pipeline featuring AlphaFold Pro Differentiable Protein Design, GKE Spot & TPU Clusters, Gemini Drug-Discovery Specialized Models, and transitive PSC connectivity.",
    prompt: "Act as a Lead BioInformatics & AI Pharma Architect. Design a production-grade Pharma-Specific Genomics & Drug Discovery Pipeline blueprint. Include: On-Prem Sequencers & FASTQ -> Gemini Data Prep -> AlphaFold Pro Differentiable Protein Design -> GKE TPU Cluster & CMEK Lakehouse -> Gemini Drug-Discovery Models -> PSC Transitive Routing -> Google Cloud Managed Services (BigQuery, Vertex AI, Genomics AI, Looker Studio)."
  },
  {
    id: "tech_supply_chain",
    name: "Autonomous Supply Chain Logistics & Real-Time Digital Twin (WBS 5.3.1)",
    category: "Data & Lakehouse Architecture",
    whenToUse: "WBS 5.3.1 Autonomous Supply Chain Logistics & Real-Time Digital Twin featuring Cloud Dataflow sliding session window simulation, Cloud Spanner Multi-Region Global Inventory Graph (GQL), Vertex AI predictive ETA forecaster, and SAP S/4HANA ERP Bridge.",
    prompt: "Act as a Principal Supply Chain & Cloud Solutions Architect. Design a production-grade WBS 5.3.1 Autonomous Supply Chain Logistics & Digital Twin blueprint. Include: 500k+ Fleet Telemetry Ingress -> Cloud Pub/Sub & mTLS TPM -> Cloud Dataflow Sliding Session Window Simulation -> Cloud Spanner Multi-Region Global Inventory Graph (GQL) -> Vertex AI Demand & Multimodal Predictive ETA Engine -> Logistics Control Tower 3D Cockpit -> Automated Carrier Spot Dispatch & SAP S/4HANA ERP Bridge -> BigQuery Logistics Data Lakehouse."
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
    name: "Hybrid Multi-Cloud Networking & Gemini Enterprise (WBS 5.5.1)",
    category: "Cloud Infrastructure & Networking",
    whenToUse: "WBS 5.5.1 Google Cloud Hybrid Multi-Cloud Networking Architecture with 100G Dedicated Interconnect, Partner Interconnect, Cloud VPN, Cross-Cloud Interconnect for AWS, Network Connectivity Center (NCC) BGP Routing, and Gemini Enterprise AIOps.",
    prompt: "Act as a Principal Google Cloud Networking & AI Infrastructure Architect. Design a production-grade WBS 5.5.1 Hybrid Multi-Cloud Networking & Gemini Enterprise reference blueprint. Include: On-Premises / Private Cloud (Tier IV Data Center, BGP ASN 65001, BFD 300ms, VMware Servers, Gemini on GDC Hosted) -> Google Cloud Global Network (187+ Anycast PoPs, Cloud CDN, Global L7 Load Balancing) -> Region us-central1 VPC (GKE Autopilot, Compute Engine, Cloud SQL PSA, Gemini Enterprise AIOps) -> AWS Cloud us-east-1 (EKS, EC2, ECS, Aurora RDS, DX Gateway ASN 64512) -> Direct 100G Cross-Cloud Interconnect & Bottom Routing Telemetry Matrix."
  }
];

export const ARCHITECTURE_TYPES: ArchitectureTypeOption[] = [
  ...BUSINESS_ARCHITECTURE_TYPES,
  ...TECHNICAL_ARCHITECTURE_TYPES
];

export function normalizeArchitectureId(archId?: string | null): string {
  if (!archId) return 'conceptual_diagram';
  const id = archId.toLowerCase().trim();
  // 32 Master WBS / Combined ID normalizers
  if (id.startsWith('p1-app-l-01') || id === 'p1-app-l-01') return 'hybrid_strangler_transition';
  if (id.startsWith('p1-gov-c-02') || id === 'p1-gov-c-02') return 'value_stream_map';
  if (id.startsWith('p1-gov-c-03') || id === 'p1-gov-c-03') return 'asis_vs_tobe_process_flow';
  if (id.startsWith('p2-gov-c-03') || id === 'p2-gov-c-03') return 'cloud_finops_chargeback';
  if (id.startsWith('p3-app-c-01') || id === 'p3-app-c-01') return 'unified_system_view';
  if (id.startsWith('p3-ai-l-02') || id === 'p3-ai-l-02') return 'agentic_rag';
  if (id.startsWith('p3-ai-l-03') || id === 'p3-ai-l-03') return 'hub_and_spoke_agent_config';
  if (id.startsWith('p3-dat-l-04') || id === 'p3-dat-l-04') return 'tech_data_lakehouse_gcp';
  if (id.startsWith('p3-dat-l-05') || id === 'p3-dat-l-05') return 'erd';
  if (id.startsWith('p3-dat-c-06') || id === 'p3-dat-c-06') return 'unified_data_governance';
  if (id.startsWith('p3-sec-l-07') || id === 'p3-sec-l-07') return 'federated_iam_sso';
  if (id.startsWith('p3-app-l-08') || id === 'p3-app-l-08') return 'tech_micro_frontends';
  if (id.startsWith('p3-gov-l-09') || id === 'p3-gov-l-09') return 'logical_ai_config_tenant';
  if (id.startsWith('p3-app-l-10') || id === 'p3-app-l-10') return 'sequence_diagram';
  if (id.startsWith('p4-sec-p-01') || id === 'p4-sec-p-01') return 'secure_deployment_map';
  if (id.startsWith('p4-sec-p-02') || id === 'p4-sec-p-02') return 'data_residency_sovereign_map';
  if (id.startsWith('p4-ai-p-03') || id === 'p4-ai-p-03') return 'tech_agentic_mesh';
  if (id.startsWith('p4-gov-l-04') || id === 'p4-gov-l-04') return 'tech_eval_safety';
  if (id.startsWith('p4-gov-l-05') || id === 'p4-gov-l-05') return 'tech_ai_trism_guardrails';
  if (id.startsWith('p4-gov-p-06') || id === 'p4-gov-p-06') return 'devops_cicd_pipeline';
  if (id.startsWith('p4-app-l-07') || id === 'p4-app-l-07') return 'tech_event_driven_eda';
  if (id.startsWith('p4-dat-p-09') || id === 'p4-dat-p-09') return 'tech_multimodal_ingestion';
  if (id.includes('multimodal_ingestion') || id.includes('multimodal') || id === 'tech_multimodal_ingestion') return 'tech_multimodal_ingestion';
  if (id.includes('genomics') || id.includes('clinical') || id === 'tech_genomics_clinical') return 'tech_genomics_clinical';
  if (id.startsWith('p4-dat-p-10') || id === 'p4-dat-p-10') return 'tech_streaming_analytics';
  if (id.startsWith('p5-app-l-01') || id === 'p5-app-l-01') return 'six_rs_migration_matrix';
  if (id.startsWith('p5-sec-p-02') || id === 'p5-sec-p-02') return 'enterprise_sre_observability';
  if (id.startsWith('p5-gov-p-03') || id === 'p5-gov-p-03') return 'golive_warroom_runbook';
  if (id.startsWith('p5-ai-l-05') || id === 'p5-ai-l-05') return 'tech_llm_capacity_quota';
  if (id.includes('capacity_quota') || id.includes('quota_management') || id === 'tech_llm_capacity_quota') return 'tech_llm_capacity_quota';
  if (id.startsWith('p5-ai-p-07') || id === 'p5-ai-p-07') return 'tech_llmops_lifecycle';
  if (id.includes('llmops') || id.includes('prompt_config') || id === 'tech_llmops_lifecycle') return 'tech_llmops_lifecycle';
  if (id.startsWith('p5-dat-p-08') || id === 'p5-dat-p-08') return 'dataops_anomaly_detection';
  if (id.startsWith('p5-gov-p-09') || id === 'p5-gov-p-09') return 'tech_multi_region_dr';

  if (id === 'tech_cicd_pipeline' || id === 'tech_cicd') return 'devops_cicd_pipeline';
  if (id === 'business_agent_governance_hitl' || id === 'business_agent_gov_hitl') return 'tech_ai_trism_guardrails';
  if (id === 'tech_multi_agent_langgraph' || id === 'tech_agent_harness_runtime') return 'tech_agentic_mesh';
  if (id === 'data_ai_pipeline' || id === 'tech_modern_data_stack') return 'tech_data_lakehouse_gcp';
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
  if (id.includes('serverless') || id === 'tech_serverless_gcp' || id.includes('p4-app-l-08')) return 'tech_serverless_gcp';
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
  } else if (id === 'secure_deployment_map' || id.includes('secure_deployment') || id.includes('zero_trust')) {
    xml = getExactSecureDeploymentMapWidescreenXml();
  } else if (id === 'devops_cicd_pipeline') {
    xml = getExactDevopsCicdPipelineReferenceXml();
  } else if (id === 'unified_system_view') {
    xml = getExactUnifiedSystemViewReferenceXml();
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
  } else if (id === 'tech_multimodal_ingestion' || id.includes('multimodal') || id === 'p4-dat-p-09') {
    xml = getExactMultimodalIngestionXml();
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
  } else if (id === 'tech_streaming_analytics' || id.includes('streaming') || id === 'streaming_pipeline') {
    xml = getExactStreamingAnalyticsXml();
  } else if (id === 'tech_llmops_lifecycle' || id.includes('llmops') || id.includes('prompt_config') || id === 'p5-ai-p-07') {
    xml = getExactLlmopsLifecycleXml();
  } else if (id === 'tech_llm_capacity_quota' || id.includes('capacity_quota') || id.includes('quota_management') || id === 'p5-ai-l-05') {
    xml = getExactLlmCapacityQuotaXml();
  } else if (id === 'enterprise_sre_observability' || id.includes('incident_triage') || id.includes('sre_observability') || id === 'p5-gov-l-04' || id === 'p5-sec-p-02') {
    xml = getExactIncidentTriageSreXml();
  } else if (id === 'tech_data_lakehouse_gcp' || id === 'data_lakehouse' || id.includes('lakehouse')) {
    xml = getExactGcpDataLakehouseWbsXml();
  } else if (id === 'tech_serverless_gcp' || id === 'serverless_gcp' || id.includes('serverless') || id === 'p4-app-l-08') {
    xml = getExactServerlessGcpReferenceXml();
  } else if (id.startsWith('tech_') || id === 'serverless_gcp' || id === 'streaming_pipeline' || id === 'k8s_mesh' || id === 'data_lakehouse' || id === 'rag_gcp' || id === 'event_driven_aws' || id === 'multi_region_dr' || id === 'zero_trust' || id === 'hybrid_interconnect' || id === 'cicd_pipeline' || id === 'enterprise_devsecops_polyrepo') {
    xml = getTechnicalArchitectureXml(id);
  } else {
    xml = getTechnicalArchitectureXml(id || 'tech_serverless_gcp');
  }

  const hasCustomUserPrompt = Boolean(userPrompt && userPrompt.trim() !== '' && userPrompt.trim() !== getTemplateTitle(id));

  const isFlagshipBlueprint = true; // All registered master builders preserve exact calibrated 2D coordinates

  // If user provided a specific custom prompt to re-flavor the diagram, inject the flavor
  if (hasCustomUserPrompt && !isFlagshipBlueprint) {
    const cleanUseCase = (useCaseContext && !/^\d+\.\s/.test(useCaseContext)) ? useCaseContext : undefined;
    const effectiveContext = cleanUseCase || userPrompt || getTemplateTitle(id);
    xml = injectUseCaseFlavor(xml, effectiveContext, userPrompt);
    xml = preflightVerifyAndHealXmlAcrossAll6Audits(xml, id);
  }

  return xml ? xml.replace(/&amp;amp;/g, '&amp;').replace(/&amp;quot;/g, '&quot;').replace(/&amp;lt;/g, '&lt;').replace(/&amp;gt;/g, '&gt;') : null;
}
