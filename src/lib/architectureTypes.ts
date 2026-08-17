import { getTechnicalArchitectureXml } from './technicalArchitectureXmls';
export { getTechnicalArchitectureXml };
import {
  compileSpecToDrawioXml,
  getExactItacsReferenceXml,
  getExactErdReferenceXml,
  getExactSequenceDiagramReferenceXml,
  getExactDataAiPipelineReferenceXml,
  getExactSecureDeploymentMapReferenceXml,
  getExactDevopsCicdPipelineReferenceXml,
  getExactUnifiedSystemViewReferenceXml,
  getExactGovernanceStateMachineReferenceXml,
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
  getExactServerlessGcpReferenceXml,
  getExactMultiFlowZeroTrustPlatformXml,
  getExactUnifiedFlowchartXml,
  getExactLegacyDataDependencyMapXml,
  getExactGcpLandingZoneVpcXml,
  getExactEnterpriseAgentRuntimeXml,
  getExactAiAgentApprovalWorkflowXml,
  getExactIncidentTriageSwimlaneXml,
  getExactEcommerceRetailXml,
  getExactHrTalentAiXml,
  getExactSmartFactoryIotXml,
  getExactC4ComponentLldXml,
  getExactBpmnWorkflowXml,
  getExactThreatModelingStrideXml,
  getExactDataLineageXml,
  getExactHealthcareFhirXml
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
    prompt: "Act as an AI Chief Architect and Cognitive Systems Engineer. Design an advanced Cognitive Architecture featuring Agentic Retrieval-Augmented Generation (RAG). It should include: multi-agent orchestration loops, dynamic tool execution, vector embedding database (pgvector/Pinecone), document chunking & ingestion pipelines, semantic search retrieval, LLM reasoning engine (Gemini 3.7 Flash), and fallback validation guardrails."
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
    name: "Enterprise Secure Software Supply Chain & Deployment Map",
    category: "Cloud Infrastructure & Networking",
    whenToUse: "Enterprise Secure Deployment Topology Map: End-to-End Secure Software Supply Chain integrating GCP, Gemini Platform, and Enterprise Workloads. Features Stage 1 Code Check-In with Gemini Code Assist AI IDE Copilot, Stage 2 CI/CD Secure Build & Gating (Cloud Build, SBOM, Gemini SAST, DAST), Stage 3 Secure Image Registry & Binary Authorization signing, Stage 4 Secure Deployment (Cloud Deploy to Dev/Stage/Prod), and Production Environment with Cloud Armor WAF, GKE Cluster, mTLS, Private Service Connect, Cloud NAT, and Security Command Center (SCC) Gemini-Driven Threat Analysis.",
    prompt: "Act as a Principal Cloud Security & DevSecOps Architect. Design a production-grade Google Cloud End-to-End Architecture: Secure Deployment Topology Map blueprint integrating GCP, Gemini Platform, and Enterprise Workloads. Include: Top Conceptual Flow (Gemini Code Assist -> Cloud Source Repositories -> CI/CD Chain Build/Test/Scan -> Registry Sign & Authorize -> Target Environments Dev/Stage/Prod -> Secure Software Supply Chain badge); Outer Google Cloud Project container; Section 1 Code (Developer Gemini Code Assist AI IDE Copilot, Cloud Source Repositories, SAST & Code Quality Check, Git Push to secure pipeline with lock); Section 2 Build & Gating CI/CD Pipeline Cloud Build (Container Build, SBOM Creation, Gemini-Assisted Static Scan SAST, Dynamic Analysis DAST, Secure Supply Chain Gating with lock); Section 3 Registry & Binary Authorization (Artifact Registry, Software Composition Analysis SCA, Secure Image Registry, Binary Authorization policy, Secure Image Promotion with lock); Section 4 Target Environments & Networking (Development/Staging GKE envs, Stage 4 Binary Authorization Policy Check, Cloud Deploy, Internet Gateways with VPC Service Controls VPC SC); Production Environment with Production VPC (External Load Balancer with Cloud Armor WAF, Management Subnet with Bastion Host and Identity-Aware Proxy IAP, GKE Production Cluster Subnet with Internal Load Balancer and Workload Microservices with mTLS, Data Subnet with Cloud SQL and Cloud Storage via Private Service Connect, Cloud NAT); Right Side Stage 5 Production Security & Compliance (Firewalls, Cloud Audit Logs, Security Command Center SCC with Gemini-Driven Threat Analysis, Secret Manager, IAM Cloud Logging, Assured Workloads for compliance) -> Top right legend and Google Cloud logo."
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
    prompt: "Act as an Enterprise Agile & Lean Value Stream Architect. Design a production-grade Enterprise AI Architecture & Delivery Value Stream Map (VSM). Include: Top Information & Control Plane (Customer Demand, Jira Portfolio Steering, Weekly ARB Committee, SRE Telemetry) -> Core Execution Value Stream Pipeline (Stage 1 Prompt Ingestion, Stage 2 Gemini 3.7 Flash Compilation, Stage 3 AI TRiSM & FinOps, Stage 4 ARB & HITL Sign-Off, Stage 5 GitOps IaC Provisioning) with Queue WIP Triangles and Kaizen Bursts -> Bottom Lead Time & Process Time Ladder with Flow Efficiency Scorecard and VSM Symbology Legend."
  },
  {
    id: "asis_vs_tobe_process_flow",
    name: "As-Is vs. To-Be Process Flow",
    category: "Executive & Business Strategy",
    whenToUse: "Enterprise Modernization Process Flow comparing fragile on-premises monolithic legacy state against Google Cloud real-time Lakehouse and Gemini 3.7 Flash cognitive architecture with Strangler Fig modernization bridge and ROI transformation scorecard.",
    prompt: "Act as an Enterprise Cloud Modernization & AI Transformation Principal Architect. Design a production-grade Enterprise As-Is vs. To-Be Process & Architecture Modernization Flow blueprint. Include: Top Zone AS-IS Legacy State (On-Prem VMs/Monolith Ingress, Nightly Informatica Batch ETL, Oracle RDBMS Core, Manual Spreadsheet Review, Static Cognos Reports) -> Center Google Cloud Strangler Fig Modernization Bridge (Apigee API Interceptor & Datastream CDC) -> Bottom Zone TO-BE Target State (Cloud Pub/Sub Ingress, Cloud Dataflow Streaming Pipeline, Gemini 3.7 Flash Reasoning Hub, AI TRiSM & HITL Gate, Cloud Run Serverless Serving, BigQuery Lakehouse, AlloyDB HA, Dataplex ABAC, Cloud KMS) -> Right Panel Executive Transformation Scorecard with 68% OpEx Cut and Year 1 ROI."
  },
  {
    id: "governance_state_machine",
    name: "Unified Governance & State-Machine Lifecycle",
    category: "Executive & Business Strategy",
    whenToUse: "Comprehensive state machine tracking data vetting, dimensional data modeling, model creation, training & offline evaluation, GAMP 5 / SOC 2 certification, canary/production deployment, and continuous drift monitoring",
    prompt: "Act as an Enterprise Systems & Governance Architect. Design a production-grade Unified Governance & State-Machine Lifecycle blueprint. Include: 4 Core Phases: Phase 1 Initial Vetting & Modeling (Data Vetting, Ethical Sourcing, PII Check, Dimensional Data Model ERD, Model/Prompt Created) -> Phase 2 Training, Evaluation & Audits (In Training/Development, Offline Metric Evaluation, Audited & Certified GAMP 5 / SOC 2, Approval Pending) -> Phase 3 Deployment & Promotion (Canary / Shadow Deployment, Live Production Deployed) -> Phase 4 Continuous Governance & Feedback Loop (Continuous Telemetry & Observability, Drift Detected / Retrain Trigger, Decommissioned / Archived, Societal & Regulatory Monitoring) with decision diamonds, status badges, and guard triggers."
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
    name: "Serverless Event-Driven Architecture (GCP)",
    category: "Cloud Infrastructure & Networking",
    whenToUse: "Serverless Event-Driven Architecture (EDA): End-to-End Enterprise App Integration powered by Google Cloud (GCP) and Vertex AI. Features Enterprise App/IoT industrial sensors, Cloud Load Balancing/CDN, Cloud Run ingestion, Pub/Sub event bus, Vertex AI Platform (Predictive Maintenance & Root Cause Analysis), Cloud Bigtable time-series data, Cloud SQL metadata, BigQuery data analytics lake, Looker reporting, BigQuery ML, and automated Cloud Tasks & Notification Services.",
    prompt: "Act as a Principal Serverless & Event-Driven Systems Architect. Design a production-grade Serverless Event-Driven Architecture (EDA): End-to-End Enterprise App Integration blueprint powered by Google Cloud (GCP) and Vertex AI Gemini Platform. Include: Column 1 External Sources & Event Triggers (Enterprise App / User Devices with telemetry & user actions, IoT Industrial Sensors with real-time event streaming, Cloud Load Balancing / Cloud CDN); Column 2 Ingestion (Cloud Run Ingestion Microservice performing light validation and enrichment); Column 3 Distributed Asynchronous Messaging (Pub/Sub Topics and Subscriptions with User Action Event); Column 4 Processing (Cloud Run Telemetry Analysis, Cloud Functions Validate Event, Cloud Run Anomaly Interpretation, Cloud Functions Route Action); Column 5 Vertex AI Platform & Gemini (Gemini Model Family Pro/Ultra, Predictive Maintenance Analysis, Root Cause Analysis, Natural Language Insight Generation, Maintenance Order trigger); Column 6 Decision Executed & Storage (Cloud Run decision executor, Cloud Bigtable time-series data, Cloud SQL metadata, BigQuery data analytics lake, Cloud Tasks managing external actions, Pub/Sub egress); Column 7 Actions & Visibility (Looker Visual Insights & BI Reporting with charts mockup, BigQuery ML / Vertex AI ML, External APIs Vendor Systems/Work Order/ERP, Notification Services push alerts) -> Google Cloud + Gemini footer."
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
    whenToUse: "6Rs Migration Disposition Matrix evaluating legacy components (VMs, DBs, Mainframe, Monoliths, File Shares) across Business Value, Technical Feasibility, and Cloud Compatibility into Rehost, Replatform, Refactor, Retain, Retire, and Repurchase.",
    prompt: "Act as an Enterprise Cloud Migration Architect. Design a production-grade 6Rs Cloud Migration Disposition Matrix. Include: Legacy Components (On-Premise VMs, Legacy Databases Oracle/SAP, Mainframe Systems, Custom Monolith Apps, File Shares) -> Migration Assessment Logic (Business Value, Technical Feasibility, Cloud Compatibility) -> 6Rs Dispositions (Rehost Lift & Shift, Replatform Lift & Reshape, Refactor Re-architect, Retain Revisit Later, Retire Decommission, Repurchase Drop & Shop) -> Cost Optimization GCAF & Continuous Validation feedback loops."
  },
  {
    id: "hybrid_strangler_transition",
    name: "Hybrid / Strangler Fig Transition (Assessment Phase)",
    category: "Cloud Infrastructure & Networking",
    whenToUse: "Hybrid Cloud & Strangler Fig Transition Architecture with Apigee API Gateway request interception, Secure Cloud Interconnect, Site-to-Site VPN, and parallel on-premise to GCP modern microservice execution.",
    prompt: "Act as an Enterprise Cloud Migration Architect. Design a production-grade Hybrid Cloud & Strangler Fig Transition Architecture. Include: On-Premises Datacenter (Legacy Monolithic App v1.0, Legacy SQL DB, Mainframe System) -> Secure Cloud Interconnect (Primary Path) & Site-to-Site VPN (Backup Path) with SOC 2 & HIPAA perimeters -> Apigee API Gateway (Strangler Fig Interface) routing Legacy features back to on-prem vs Modern/New features to GKE/Cloud Run Microservices and Cloud SQL for PostgreSQL."
  },
  {
    id: "cloud_finops_chargeback",
    name: "Cloud FinOps & Chargeback Model",
    category: "Cloud Infrastructure & Networking",
    whenToUse: "Cloud FinOps & Chargeback Model for unit cost allocation, GenAI Vertex AI token tracking, BigQuery cost data lake, and automated showback/chargeback reporting.",
    prompt: "Act as an Enterprise FinOps & Cloud Economics Architect. Design a production-grade Cloud FinOps & Chargeback Architecture. Include: Ingestion & Usage Tracking (GKE Kubecost, GCE VMs, GCS, Cloud SQL, BigQuery, Vertex AI Token Tracking) -> Data Aggregation (GCP Billing Exports, Kubecost Costs, Vertex AI Token Cost Calculator, Tagging Policies into Unified BigQuery Cost Data Lake) -> Looker Studio Analytics & FinOps Governance Engine (Tagging Enforcement, Budgets & Alerts, Commitment Manager CUDs/SUDs, Cloud Monitoring) -> Chargeback Generator for Business Units (Engineering, Product, Data Science & GenAI) under Cloud IAM access control and Secret Manager."
  },
  {
    id: "ai_coe_operating_model",
    name: "AI Center of Excellence (CoE) Operating Model",
    category: "Cloud Infrastructure & Networking",
    whenToUse: "AI Center of Excellence (CoE) Operating Model for AI governance, prompt curation loops, Looker analytics, GAMP 5 compliance, and executive funding loops.",
    prompt: "Act as an Enterprise AI Strategy & Governance Architect. Design a production-grade AI Center of Excellence (CoE) Operating Model. Include: Exec & Strategy, Business Plan, Cloud Plans -> GAMP 5 Compliance Framework (Validated) -> AI Center of Excellence (Governance & Strategy with Adoption Modeling; Process & Operations with User Onboarding, Prompt Curation, Feedback Loops; Analytics & Measurement with Performance Metrics and Utilization Insights) -> AI CoE Operating Model artifact -> Total Unified System View (Enterprise Platform View, 24/7 Operations Support) -> CSV data export -> Funding and Execs & Business Leads approval loop."
  },
  {
    id: "mcp_context_gateway",
    name: "Model Context Protocol (MCP) Gateway",
    category: "Cloud Infrastructure & Networking",
    whenToUse: "Model Context Protocol Gateway (MCP Context Gateway) with Universal Context Ingestion Adapters, MCP Message Bus & Normalization, and Tool Proxies.",
    prompt: "Act as an Enterprise AI Platform Architect. Design a production-grade Model Context Protocol (MCP) Gateway Architecture. Include: 5 Ingestion Sources (Database Source Cloud SQL, Object Storage Source Cloud Storage, Vector DB Source Vertex AI Vector Search, Logs Cloud Logging, Legacy Systems) -> Apigee & Looker Studio -> Security & Secret Management (Workload Identity IAM, VPC-SC, Secret Manager) -> Model Context Protocol (MCP) Gateway Node.js/Python (Universal Context Ingestion Adapters, Context Schema Mapping Engine, MCP Message Bus & Normalization with MCP Schemas, SOC 2 Compliance Filtering, IAM Access Control, BigQuery Audit Trail Logging, Tool Proxies & Downstream Integration with Cognitive Arch / Agentic RAG, API Proxy, GCP Service Proxy, Legacy Tool Proxy) -> External API Actionable Tool Systems -> Looker Studio Analytics & Total Unified System View (Enterprise Context / Platform View & Operations Support) -> Legend."
  },
  {
    id: "logical_ai_config_tenant",
    name: "Product Plan - Logical AI Config (Tenant Architecture)",
    category: "Cloud Infrastructure & Networking",
    whenToUse: "Product Plan: Multi-tenant Logical AI Config architecture modeling environment segregation across Dev/Test/Prod, Agent Designer topologies, and SOC 2 / GxP compliance within Gemini Enterprise.",
    prompt: "Act as an Enterprise AI Platform Architect. Design a production-grade Product Plan - Logical AI Config (Tenant Architecture) blueprint. Include: App Owners & Devs -> Logical AI Config Management Console & APIs -> Enterprise IAM -> Development, Testing, and Production Environments with Tenant Boundaries -> Platform Orchestrator -> Gemini Enterprise Engine instances -> Production Workspace A with Logical AI Config (Model Selection Gemini 3.7 Flash, System Instructions, Memory & Context Management, Tool Invocation Definitions) and Agent Designer (Single-Agent, Multi-Agent Chains, Task-Based Sub-Agents) -> Application Logic invocation -> SOC 2 & GxP Compliance Guardrails -> VPC Firewalls, Centralized Audit Logging, and KMS Configuration Encryption -> Legend."
  },
  {
    id: "hub_and_spoke_agent_config",
    name: "Hub-and-Spoke Agent Configuration Map",
    category: "Cloud Infrastructure & Networking",
    whenToUse: "Hub-and-Spoke Multi-Agent Configuration Map with Orchestrator Parent Agent Hub, 3 domain sub-agents (Support, Fulfillment, Knowledge), Logical UI Matrix, HITL Gate, and 21 CFR Part 11 Audit Trail.",
    prompt: "Act as an Enterprise AI Solutions Architect. Design a production-grade Hub-and-Spoke Agent Configuration Map blueprint. Include: Workspace X (Tenant Y - Production Environment) -> 3 Sub-Agents / Spokes (Customer Support with Zendesk API & BigQuery/Vector Grounding, Fulfillment SA with SAP ERP API & Cloud Storage Grounding, Knowledge Base SA with GCS PDF/Doc Grounding) -> Orchestrator (Parent Agent) Hub (General Config Gemini 3.7 Flash, System Instructions, Context, Memory TTL; Multi-Agent Router / Dispatcher Logic rules; Shared Memory & State; Vertex AI Agent Runtime; 21 CFR Part 11 Compliance Gate) -> Logical UI Configuration Matrix (Prompt editors, Rule editors, Knowledge Source selectors, API Config panels) -> Logical UI Config Management Console -> Human-in-the-Loop (HITL) Gate -> 21 CFR Part 11 Immutable Audit Trail & E-Signature Ledger -> Persona Dashboards (AI Architect, Solutions Arch, Agent Economic & Runtime Metrics) -> Legend."
  },
  {
    id: "unified_data_governance",
    name: "Unified Data Governance & Access Control",
    category: "Cloud Infrastructure & Networking",
    whenToUse: "Unified Data Governance & Access Control Architecture across 4 horizontal tiers: Collibra Strategy, Dataplex ABAC Engine, Modern Data Stack, and Executive Compliance Scorecards.",
    prompt: "Act as a Principal Enterprise Data Architect. Design a production-grade Unified Data Governance & Access Control Architecture (To-Be State) blueprint. Include: 4 Horizontal Zones (Top Zone Strategy & Governance Interface with CDO, Data Stewards, Collibra Data Intelligence Cloud; Zone Two Unified Control Plane Orchestration with Dataplex Unified Control Plane, Active Data Control Plane, Dataplex Data Catalog, Data Profiling & Quality, ABAC Enforcement Engine; Third Zone Enforced Technical Data Tier with BigQuery, Cloud Storage, Dataflow, Dataproc, Vertex AI; Bottom Zone Outcomes & Compliance Reporting with CDO Reporting Dashboard, GDPR Guardrails, HIPAA Data Masking, GxP Audit Trail, Data Quality Scorecards) -> Legend."
  },
  {
    id: "dataops_anomaly_detection",
    name: "DataOps & Anomaly Detection",
    category: "Cloud Infrastructure & Networking",
    whenToUse: "DataOps & Anomaly Detection Architecture spanning Looker Studio observability, SRE PagerDuty incident alerts, Dataplex SODA/CARLO anomaly engine, and hallucination-free Vertex AI model grounding.",
    prompt: "Act as a Lead DataOps & Reliability Architect. Design a production-grade DataOps & Anomaly Detection Architecture (To-Be State) blueprint. Include: 5 Horizontal Zones (Top Zone Strategy & Observability Dashboard with Looker Studio 8-metric reporting; Second Zone Incident Management & SRE View with SRE, Cloud Monitoring, PagerDuty, RCA feedback loop; Third Zone The Core Dataplex Integrated DataOps Control Plane with Partner observability, SODA Quality checks, Active Schema Drift Monitoring, Anomaly Detection Engine, CARLO observability, CSV Checkpoints, Reliability Guardrails; Fourth Zone Enforced Pipeline & Consumption with Validated GCS Lakes and Vertex AI Hallucination Prevention; Bottom Zone Unified Modern Data Stack with BigQuery, GCS, Cloud SQL, Dataflow, Dataproc, External SaaS) -> Legend."
  },
  {
    id: "unified_flowchart",
    name: "Unified End-to-End Operational Flowchart",
    category: "Flowcharts",
    whenToUse: "Complete End-to-End Enterprise Flowchart showing sequential step-by-step operational flow [1] to [15], 7 distinct layer swimlanes, decision gates, official Google Cloud product icons, and zero-collision line routing",
    prompt: "Act as a Principal Google Cloud Solutions Architect. Design a production-grade Unified End-to-End Enterprise Flowchart Architecture blueprint across 7 horizontal layer swimlanes: Layer 1 Enterprise Agentic Workspace & Developer Studio (Gemini Enterprise App [1], Gemini Notebook [1a], Agent Designer IDE [1b], GSLB & WAF [1c]); Layer 2 API Management & Zero-Trust Policy Gate (Apigee Gateway [2], KMS HSM Vault [2a], SIEM Rejection [2b]); Layer 3 Cognitive Multi-Agent Mesh & ADK 2.0 (ADK 2.0 Orchestrator [3], Deep Research Agent [3a], Vertex AI Gemini 3.7 Flash [3b]); Layer 4 In-Memory Cache, Vector Store & Persistence (Vertex Vector Search [4], Redis MemoryStore [5], Cloud SQL HA [6]); Layer 5 Asynchronous Event Bus & Resilience Queue (Pub/Sub [7], Dead-Letter Queue [7a]); Layer 6 Async Ingestion Agents & Lakehouse (Document Chunking Agent [8], Embedding Worker [9], BigQuery Lakehouse [10]); Layer 7 Enterprise SRE Observability & Telemetry (Cloud Operations Suite [11], PagerDuty SRE Hub [12])."
  },
  {
    id: "golive_warroom_runbook",
    name: "Go-Live Cutover & War Room Runbook",
    category: "Cloud Infrastructure & Networking",
    whenToUse: "Go-Live Cutover & War Room Runbook across 3 horizontal layers: Preparation & Approval Gates, War Room & Opsgenie Execution with 5-Step Minute-by-Minute Cutover & Automated Rollback Script, and Post-Launch Day-2 Operations.",
    prompt: "Act as a Lead DevSecOps & SRE Solutions Architect. Design a production-grade Go-Live Cutover & War Room Runbook (Day-1 Cutover Phase / To-Be State) blueprint. Include: 3 Horizontal Layers (Layer 1 Top Preparation & Approval Phase with CI/CD Pipeline, WORM storage Go-Live Prep Checklist, Release Manager & App Owner Go/No-Go Decision Gate, Confluence Runbook Draft, Jira Cutover Ticket; Layer 2 Center The War Room & Live Execution with SRE, Live Communication Channel, Enterprise War Room banner, Opsgenie Integration Engine, 5-Step Minute-by-Minute Execution Script, Automated Rollback Script with DNS fallback/MFE rollback/Disable AI Agent/Restore Data snapshots and Red Alert; Layer 3 Bottom Post-Launch Day-2 Operations & Support with SRE, Release Manager, Dynamic Dashboards, Active Data Control Plane, Go-Live Verification Scorecard) -> Legend."
  },
  {
    id: "enterprise_sre_observability",
    name: "Enterprise SRE Observability & Incident Triage",
    category: "Cloud Infrastructure & Networking",
    whenToUse: "Enterprise Site Reliability Engineering (SRE) & Observability on Google Cloud Platform: DevSecOps pipeline, Multi-Cloud/GCP resources (GKE, Compute, DB), Operations Suite (Monitoring, Logging, Trace, Intelligent AI/ML Root Cause Analysis), automated Incident Management workflow, and SRE operational dashboards.",
    prompt: "Act as a Principal SRE & Observability Solutions Architect. Design a production-grade Enterprise Site Reliability Engineering (SRE) & Observability on Google Cloud Platform (GCP) blueprint. Include: Top DevSecOps Pipeline (Code, Build, Test, Security Scan, Release, Deploy with error reporting); Left Multi-Cloud/Hybrid/GCP Resources (GKE, Compute Engine, App Engine, Pub/Sub, Databases, On-Prem) emitting Metrics, Logs, Traces; Center Integrated Observability Platform (Cloud Monitoring with Uptime Checks and SLI/SLO/SLA, Cloud Logging with centralized ingest, Cloud Trace with distributed tracing, Intelligent Analysis AI/ML Root Cause Analysis); Incident Management & Response Workflow (Critical Alert trigger, Red Incident alert, PagerDuty/Email/Slack notification via Pub/Sub, Analysis & Diagnosis, Mitigation, Post-Mortem, Feedback Loop to DevSecOps); Right Dashboards & Interfaces (Service Health, SLO & Error Budget, Application Performance, Log Analysis, Incident Command Center war room console) and Key SRE Artifacts -> Legend & Notes."
  },
  {
    id: "tech_llm_capacity_quota",
    name: "LLM Capacity & Quota Management",
    category: "AI & Machine Learning",
    whenToUse: "Comprehensive Topology for LLM Capacity Quota Management: Edge API Gateway rate limiting, Quota Management Service with Redis distributed caching, Cross-Region Load Balancer, Multi-Region Managed GKE Inference Clusters (us-central1, europe-west1) with vLLM/TGI Pods and Vertex AI FinOps Agents, FinOps BigQuery cost reporting, Looker FinOps dashboards, and 4 SRE real-time operational monitoring dashboards.",
    prompt: "Act as a Principal AI Platform & FinOps Solutions Architect. Design a production-grade Comprehensive Topology for LLM Capacity Quota Management blueprint. Include: Left Ingress with Consumer Applications -> Edge API Gateway (Apigee / custom GKE Gateway) -> Quota Management Service with Redis distributed cache rate-limiting -> Cross-Region Load Balancer (Google Cloud Load Balancing); Center Multi-Region Managed GKE Inference Clusters in Region 1 us-central1 and Region 2 europe-west1 with LLM serving Pods (vLLM, TGI), NVIDIA GPUs, TPUs, and Vertex AI FinOps Agents; Center-Right FinOps Cost & Usage Hub with usage metrics callout, Vertex AI FinOps API Gateway, FinOps Cost Reporting Database BigQuery, and Looker FinOps Cost Dashboard; Right SRE Dashboards & Monitoring powered by Cloud Monitoring & Cloud Logging (Rate Limiting, Cross-Region LB, LLM Inference Health, Capacity Planning dashboards) -> Bottom Left Legend."
  },
  {
    id: "data_residency_sovereign_map",
    name: "Data Residency & Sovereign Cloud Map",
    category: "Cloud Infrastructure & Networking",
    whenToUse: "Data Residency & Sovereign Cloud Map modeling isolated regional perimeters across EU-West4 (The Netherlands) and US-Central1 (Iowa) with VPC Service Controls, restricted GCP APIs, cross-border GCP VPC-SC bridge, Looker Studio compliance reporting (GDPR, EU AI Act, HIPAA), and async management plane (Dataplex, Cloud Logging).",
    prompt: "Act as a Principal Security & Sovereign Cloud Architect. Design a production-grade Data Residency & Sovereign Cloud Map (To-Be State, Infra Provisioning Phase) blueprint. Include: Top Title Banner & GDPR/EU AI Act/HIPAA Badges; Left Ingress with End Users (Patient data source), SRE/Legal/CISO Personas, Cloud Load Balancing (Global/Regional) with Verified access control; Center Core Sovereign Cloud container with GCP Region EU-West4 (The Netherlands) VPC-SC perimeter, Restricted GCP APIs, Vertex AI Local Inference & Grounding, Cloud Storage Buckets, Cloud SQL GxP keys, Vertex AI Vector Search, Internal Compliant Data Flow; Center Channel with Cross-Border Data Transfer Path, GCP VPC-SC Bridge, and red alert perimeter tripwires; GCP Region US-Central1 (Iowa) VPC-SC perimeter with symmetric restricted services; Right Top Observability & Compliance Reporting container with Looker Studio Dashboards (Regional Data Compliance Score 99.8%, Cross-Border Transfer Audit Logs, VPC SC Perimeter Alerts, Vertex AI Grounding Lineage), Central logging with BigQuery historical data from prerequisite context; Right Bottom Management Plane (Async Flows) with Cloud Infra Lead, Internal metric collectors, Unified Trace Correlation, Vertex AI Monitoring, Dataplex, Cloud Logging, and Async Flow / Audit Flow connectors; Bottom Left Legend -> Footer Note."
  },
  {
    id: "federated_iam_sso",
    name: "Google Cloud Federated IAM, SSO & Zero-Trust Workload Identity",
    category: "Identity, Access & Zero-Trust",
    whenToUse: "Official Google Cloud Federated IAM & SSO reference architecture illustrating Google Cloud Directory Sync (GCDS), Cloud Identity IdP Core, Identity-Aware Proxy (IAP), BeyondCorp Enterprise Context-Aware Access, Cloud IAM RBAC, and Workload Identity Federation.",
    prompt: "Act as a Principal Google Cloud Security & IAM Architect. Design a production-grade Google Cloud Federated IAM, SSO & Zero-Trust Workload Identity Architecture mirror blueprint. Include: External Identity Sources (Federated IdP: Active Directory, Okta) with SAML 2.0 / OIDC federation -> User Client (Browser/Device) with 1. SSO Authenticate -> Google Cloud Container with Google Cloud Identity (IdP Core) & GCDS sync -> BeyondCorp Enterprise Context-Aware Access container with 3. Context & Policy Check, 2. Device Context (MDM/Endpoint signals), and 3. Network Context (IP/Geo) -> Identity-Aware Proxy (IAP) zero-trust ingress with 2. Access Request -> App Engine, Cloud Run, Compute Engine (via Load Balancer) -> Cloud IAM with 4. IAM & 5. Backend Access to IAM Policy Document -> Bottom Workload Identity container with Google Kubernetes Engine (GKE), Application Workload Pod, Kubernetes Service Account (KSA) bound to Google Service Account (GSA) via Workload Identity Link badge, 6. Workload Identity API Call & 6. Short-lived credentials, and IAM access to Cloud Storage and BigQuery."
  },
  {
    id: "tech_ai_trism_guardrails",
    name: "AI TRiSM Security Guardrail Pipeline",
    category: "Cloud Infrastructure & Networking",
    whenToUse: "AI TRiSM (Trust, Risk & Security Management) Guardrail Pipeline for LLM prompt injection defense, PII masking, toxic content filtration, model watermarking, and continuous compliance audit.",
    prompt: "Act as an AI Security & TRiSM Architect. Design a production-grade AI TRiSM Security Guardrail Pipeline (To-Be State) blueprint. Include: Ingress Gateway with User / Client Request -> AI TRiSM Pre-Inference Inspection (Prompt Injection Defense, PII Tokenization & Masking, Jailbreak Detection) -> Model Inference Tier with Gemini Pro / Claude 3.5 -> Post-Inference Evaluation (Hallucination Checker, Toxicity Scoring, Policy & Legal Filter, Cryptographic Model Watermarking) -> Actionable Egress & Centralized Audit Trail Log."
  },
  {
    id: "tech_micro_frontends",
    name: "Micro-Frontend & UI Architecture",
    category: "Backend & Systems Architecture",
    whenToUse: "Micro-Frontend & Modular UI Composition Architecture showing host container shell, federated remote module mounting (Module Federation / Webpack 5), isolated state buses, and CDN edge delivery.",
    prompt: "Act as a Principal Frontend & Systems Architect. Design a production-grade Micro-Frontend & UI Architecture (To-Be State) blueprint. Include: Client Ingress with CDN Edge & Global Load Balancer -> Core Host Application Shell (Routing, Global Auth & OIDC Context, Shared Design System, Event Bus) -> Remote Federated Micro-Frontend Modules (Billing MFE, Analytics MFE, Agent Workspace MFE, Catalog MFE) -> Backend for Frontend (BFF) Gateway -> Microservices Tier."
  },
  {
    id: "tech_fintech_payments",
    name: "Automated Personalized Financial Advising (Fintech)",
    category: "Industry Specialized Solutions",
    whenToUse: "Google Cloud Architecture: Fintech Use Case - Automated Personalized Financial Advising and Relationship Management with AI Financial Assistant & Gemini Platform.",
    prompt: "Act as a Principal FinTech & Google Cloud AI Architect. Design a production-grade Google Cloud Fintech Architecture: Automated Personalized Financial Advising blueprint. Include: Users (Voice text-to-speech, Text input, Upload documents like tax returns/statements) -> User Interface Layer (Enterprise App on App Engine, Firebase Authentication, Cloud Load Balancing) -> Ingestion & Data Management Layer (Unstructured recordings to GCS, Structured transaction history to BigQuery/Cloud SQL, Real-time transaction streams to Pub/Sub) -> Vertex AI & Gemini Platform Processing Layer (Gemini Pro Vision, Dialogflow CX conversational chat agent, Vertex AI, Gemini High-Capability Model for long-form reports & tailored strategies, Dataflow ETL) -> Analytics, Actions & Storage Layer (BigQuery insights, Cloud Storage PDF reports, Looker performance analytics, Firebase Cloud Messaging, Cloud Run & Cloud Functions automated alerts) -> Security, Governance & Compliance (IAM, VPC Service Controls, SCC, Fintech Compliance Standards)."
  },
  {
    id: "tech_multimodal_ingestion",
    name: "Agentic Multi-Modal Ingestion Flow",
    category: "Data & Lakehouse Architecture",
    whenToUse: "Google Cloud End-to-End Architecture: Agentic Multi-Modal Ingestion Flow powered by Gemini Platform and Enterprise Client Applications: Custom Clients, multi-modal capture (Text/Docs, Voice/Audio, Image/Video, Geo-Spatial), GCP Services (GCS, STT API, Vision/Video Intelligence, Maps APIs), Gemini-Powered Agentic Orchestrator (Orchestration Agent, Embedding API, Vector Search, Semantic Search, Reasoning Engine), and Knowledge Representation & Actions (BigQuery Knowledge Base, Knowledge Graph, Automated Insights, Alerting Cloud Functions, Visualizations).",
    prompt: "Act as a Principal Multimodal AI & Data Solutions Architect. Design a production-grade Google Cloud End-to-End Architecture: Agentic Multi-Modal Ingestion Flow blueprint. Include: Left Platform Governance & Monitoring rotated strip; Column 1 Multi-Modal Input Sources & User Applications (User Application Custom Client, Enterprise Mobile App, 4 channels: Text/Docs, Voice/Audio, Image/Video, Geo-Spatial); Column 2 Capture & Multi-Modal Processing GCP Services (Cloud Storage GCS, Speech-to-Text API, Vertex AI Vision API & Video Intelligence API, Google Maps Platform APIs); Column 3 Gemini-Powered Agentic Orchestrator Vertex AI (Orchestration Agent powered by Gemini 3.7 Flash, Agentic Planning & Reasoning, Function Calling Tooling, Vertex AI Embedding API, Vertex AI Vector Search, Multimodal Semantic Search, Multimodal Gemini Reasoning Engine, agent context feedback); Column 4 Knowledge Representation & Actions (BigQuery Knowledge Base, Knowledge Graph Storage, Automated Insights & Reports, Alerting & Notifications Cloud Functions, Map Annotations & Visualizations); Bottom Platform Governance & Monitoring (IAM, Vertex AI Model Monitoring, Cloud Logging)."
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
    name: "Equipment Optimization & Industrial AI Agents (Manufacturing)",
    category: "Industry Specialized Solutions",
    whenToUse: "Google Cloud Manufacturing Use Case: Equipment Optimization & Industrial AI Agents with Manufacturing Data Engine, Multimodal Anomaly Detection, Predictive Maintenance Reasoning, and Closed-Loop Actions.",
    prompt: "Act as a Principal Manufacturing & Industrial AI Architect. Design a production-grade Google Cloud Manufacturing Use Case: Equipment Optimization & Gemini AI Agents blueprint. Include: Left Sidebar Security, Governance & Compliance (IAM, VPC Service Controls, SCC, Manufacturing Compliance Standards); Column 1 Manufacturing Shop Floor & IoT Devices (Turbines & Heavy Equipment, Sensors & Telemetry Data, Visual Inspection Stream Cameras, Shop Floor Factory Assembly); Column 2 Data Ingestion & Manufacturing Data Engine (Data Ingestion Pub/Sub, Streaming ETL Dataflow, Manufacturing Data Engine MDE, Unified Data Warehouse BigQuery); Column 3 Vertex AI & Gemini Platform Intelligence Core (Vertex AI Orchestration, Gemini Multimodal Anomaly Detection with visual/telemetry fuzing, Gemini Predictive Maintenance Reasoning Agent, Agentic Orchestrator / Conversational Interface); Column 4 Enterprise Application Layer (Enterprise App Web & Mobile UI, Looker Operational Dashboards, Actionable Buttons: Schedule Maintenance, Optimize Line Speed, Order Parts, Re-Train Model closed loop); Bottom Platform Legend (GCP Services, Gemini Elements, Data/Control Flow, Security/Governance, Actionable Button)."
  },
  {
    id: "tech_eval_safety",
    name: "Agentic AI Evaluation, Safety & Optimization Platform",
    category: "AI & Cognitive Systems",
    whenToUse: "Agentic AI Evaluation, Safety, and Optimization Platform powered by Google Cloud, Gemini Platform, Agent Registry, and Enterprise Context — Continuous Evaluation, RLHF & Guardrails Closed Loop.",
    prompt: "Act as a Principal Google Cloud & Gemini AI Architect. Design a production-grade Agentic AI Evaluation, Safety, and Optimization Platform blueprint. Include: Multi-modal Input & Enterprise Context -> Cloud Load Balancing & Cloud Armor WAF -> Ingestion & Agent Registry (Structured Storage, Safety Policies, Grounding Knowledge) -> Gemini Agent Platform (Vertex AI Agent Builder Orchestrator, Gemini Pro/Ultra Intelligence Core, GKE/Cloud Run Agent Workloads, Vertex AI Search, Function Calling Extensions, Execution Logs & Traces) -> Evaluation, Safety & Guardrails Loop (AI-Based Eval with Vertex AI Model Eval, Human-in-the-Loop Review UI, Safety Guardrails) -> Analysis, Reporting & ML-Driven Optimization (BigQuery -> Looker Dashboards, RLHF / Prompt Tuning Closed Loop back to Agent Registry) -> Platform Governance & Monitoring (IAM, Secret Manager, Cloud Armor, Audit Logs, Vertex AI Model Monitoring, SCC, Assured Workloads)."
  },
  {
    id: "tech_agentic_mesh",
    name: "Hybrid Multi-Cloud Networking & Gemini Enterprise",
    category: "Cloud Infrastructure & Networking",
    whenToUse: "Google Cloud Hybrid Multi-Cloud Networking Architecture with 100G Dedicated Interconnect, Partner Interconnect, Cloud VPN, Cross-Cloud Interconnect for AWS, Network Connectivity Center (NCC) BGP Routing, and Gemini Enterprise AIOps.",
    prompt: "Act as a Principal Google Cloud Networking & AI Infrastructure Architect. Design a production-grade Hybrid Multi-Cloud Networking & Gemini Enterprise reference blueprint. Include: On-Premises / Private Cloud (Tier IV Data Center, BGP ASN 65001, BFD 300ms, VMware Servers, Gemini on GDC Hosted) -> Google Cloud Global Network (187+ Anycast PoPs, Cloud CDN, Global L7 Load Balancing) -> Region us-central1 VPC (GKE Autopilot, Compute Engine, Cloud SQL PSA, Gemini Enterprise AIOps) -> AWS Cloud us-east-1 (EKS, EC2, ECS, Aurora RDS, DX Gateway ASN 64512) -> Direct 100G Cross-Cloud Interconnect & Bottom Routing Telemetry Matrix."
  },
  {
    id: "legacy_data_dependency_map",
    name: "Legacy Data Dependency Map (P1-APP-L-01)",
    category: "Migration & Modernization",
    whenToUse: "Visualizes legacy on-premises spaghetti dependencies, database coupling, shadow IT extracts, StratoZone inventory probes, and Migration Center wave planning.",
    prompt: "Act as a Principal Google Cloud Migration & Discovery Architect. Design a production-grade Legacy Data Dependency Map blueprint featuring on-prem legacy spaghetti dependencies, shadow DBs, StratoZone probe, and Migration Center wave planning powered by Gemini 3.7 Flash."
  },
  {
    id: "gcp_landing_zone_vpc",
    name: "GCP Landing Zone & Shared VPC Network Fabric (P4-SEC-P-02)",
    category: "Cloud Infrastructure & Networking",
    whenToUse: "Production-grade Hub-and-Spoke Shared VPC network fabric with 100G Dedicated Interconnect, Cloud NAT HA, Private Service Connect (PSC), Cloud NGFW, and VPC-SC isolation.",
    prompt: "Act as a Principal Google Cloud Network & Security Architect. Design a production-grade GCP Landing Zone & Hub-and-Spoke Shared VPC Network Fabric blueprint featuring Dedicated Interconnect, Cloud Router BGP, PSC Endpoints, GKE/Serverless Subnets, and VPC-SC perimeter powered by Gemini 3.7 Flash."
  },
  {
    id: "enterprise_agent_runtime",
    name: "Enterprise Agent Runtime Platform (P4-AI-P-03)",
    category: "AI & Cognitive Systems",
    whenToUse: "Physical sandboxed compute runtime on GKE Autopilot with Agent Gateway, MCP tool worker pods, Model Armor real-time prompt interceptor, and Vertex AI TPU v5e serving.",
    prompt: "Act as a Principal Google Cloud & Gemini AI Systems Architect. Design a production-grade Enterprise Agent Runtime Platform blueprint featuring GKE Autopilot sandboxed compute, Agent Gateway, MCP Tool Worker Pods, Model Armor Interceptor, and Vertex AI TPU v5e serving powered by Gemini 3.7 Flash."
  },
  {
    id: "ai_agent_approval_workflow",
    name: "AI Agent Approval Workflow & Human-in-the-Loop Governance (P4-GOV-L-05)",
    category: "Security, Governance & Risk",
    whenToUse: "Multi-stage AI agent review, automated red-teaming, Legal/AppSec human approval gates, Binary Authorization KMS attestation, and signed production serving.",
    prompt: "Act as a Principal AI Governance & SecOps Architect. Design a production-grade AI Agent Approval Workflow & Governance Gatekeeper blueprint featuring developer IDE agent submission, automated red-teaming, Legal/AppSec approvals, Binary Authorization KMS attestation, and signed GKE serving powered by Gemini 3.7 Flash."
  },
  {
    id: "incident_triage_swimlane",
    name: "Incident Triage & Escalation Swimlane (P5-GOV-L-04)",
    category: "Security, Governance & Risk",
    whenToUse: "Multi-tier SRE incident triage swimlane: L1 Automated Alerting & Gemini Cloud Assist RCA, L2 Auto-Remediation Runbooks, and L3 Incident Commander War Room bridge.",
    prompt: "Act as a Principal Google Cloud SRE & Incident Response Architect. Design a production-grade 3-tier SRE Incident Triage Swimlane blueprint featuring L1 Alerting & Gemini Assist RCA, L2 Auto-Remediation Runbooks, and L3 Incident Commander War Room bridge powered by Gemini 3.7 Flash."
  },
  {
    id: "ecommerce_retail",
    name: "OmniChannel Intelligent E-Commerce Platform (IND-RETAIL-04)",
    category: "Industry Specialized Solutions",
    whenToUse: "Enterprise retail platform featuring Vertex AI Search for Retail, AlloyDB pgvector product catalog, Cloud Spanner multi-region cart, and BigQuery Lakehouse.",
    prompt: "Act as a Principal Google Cloud Retail Architect. Design a production-grade OmniChannel Intelligent E-Commerce Platform blueprint featuring Vertex AI Search for Retail, AlloyDB pgvector Discovery, Cloud Spanner Global Cart, and BigQuery Lakehouse powered by Gemini 3.7 Flash."
  },
  {
    id: "hr_talent_ai",
    name: "WorkforceAI HR Talent & People Intelligence (IND-HR-06)",
    category: "Industry Specialized Solutions",
    whenToUse: "Enterprise human capital AI platform featuring Document AI resume parsing, AlloyDB pgvector skills graph, Gemini 3.7 Flash candidate matching, and bias-free audits.",
    prompt: "Act as a Principal Google Cloud AI Architect for HR & People Systems. Design a production-grade WorkforceAI HR Talent & People Intelligence blueprint featuring Document AI resume parser, AlloyDB pgvector skills graph, Gemini 3.7 Flash candidate matching, and Looker Recruiter Cockpit."
  },
  {
    id: "smart_factory_iot",
    name: "Smart Factory Industry 4.0 IoT & Predictive Maintenance (IND-MFG-05)",
    category: "Industry Specialized Solutions",
    whenToUse: "Industrial edge-to-cloud platform with Google Distributed Cloud (GDC) Edge gateway, Cloud Dataflow streaming, Bigtable time-series store, Vertex AI anomaly detection, and Looker OEE cockpit.",
    prompt: "Act as a Principal Google Cloud Industrial IoT Architect. Design a production-grade Smart Factory Industry 4.0 IoT & Predictive Maintenance blueprint featuring GDC Edge Gateway, Cloud Dataflow streaming, Bigtable time-series, Vertex AI Anomaly Fuser, and Looker OEE Cockpit powered by Gemini 3.7 Flash."
  },
  {
    id: "c4_component_lld",
    name: "C4 Level 3 Component Diagram & Microservice LLD (ARCH-C4-03)",
    category: "Software & Application Architecture",
    whenToUse: "Detailed container internal architecture: REST controllers, JWT auth interceptors, SAGA domain services, repositories, Redis cache, outbox poller, and external cloud infrastructure.",
    prompt: "Act as a Principal Software & Microservice Architect. Design a production-grade C4 Level 3 Component Diagram & Microservice Low-Level Design (LLD) blueprint featuring Ingress Controllers, Auth Interceptors, Domain Services, Repositories, Redis Cache, and Cloud DBs powered by Gemini 3.7 Flash."
  },
  {
    id: "bpmn_process_workflow",
    name: "BPMN 2.0 Business Process & Autonomous Workflow (ARCH-BPMN-01)",
    category: "Business Strategy & Alignment",
    whenToUse: "BPMN 2.0 standard process map featuring customer start/end events, user tasks, Gemini 3.7 Flash service tasks, XOR branching gateways, and ERP backend posting.",
    prompt: "Act as a Principal Business Process & BPMN 2.0 Enterprise Architect. Design a production-grade BPMN 2.0 Business Process & Autonomous Workflow blueprint featuring Start Events, User Tasks, Gemini 3.7 Service Tasks, XOR Gateways, and ERP systems."
  },
  {
    id: "threat_modeling_stride",
    name: "STRIDE Zero-Trust Threat Model & Boundary Map (ARCH-SEC-01)",
    category: "Security, Governance & Risk",
    whenToUse: "STRIDE security analysis mapping threat vectors (Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege) to Google Cloud defenses (Cloud Armor, Model Armor, IAP, GKE gVisor, Workload Identity, VPC-SC, Cloud KMS HSM).",
    prompt: "Act as a Principal Google Cloud Chief Information Security Officer (CISO) & Threat Modeler. Design a production-grade STRIDE Threat Model & Attack Vector Boundary Map blueprint featuring STRIDE attack vectors and Google Cloud defenses powered by Gemini 3.7 Flash."
  },
  {
    id: "data_lineage_provenance",
    name: "Column-Level Data Lineage & Provenance Graph (ARCH-DAT-01)",
    category: "Data Pipelines & Governance",
    whenToUse: "End-to-end data lineage tracing from raw bronze tables through Dataform / dbt silver models to curated gold fact/dimension marts, Looker BI metrics, and Gemini 3.7 Flash RAG grounding.",
    prompt: "Act as a Principal Google Cloud Data Governance & Lineage Architect. Design a production-grade Column-Level Data Lineage & Provenance Graph blueprint featuring Raw Bronze Tables, Dataform Silver Cleaning, Curated Gold Marts, and Looker Metrics powered by Gemini 3.7 Flash."
  },
  {
    id: "healthcare_fhir_hl7",
    name: "Google Cloud Healthcare & Life Sciences FHIR / HL7 Pipeline (IND-HEALTH-01)",
    category: "Industry Specialized Solutions",
    whenToUse: "Enterprise healthcare interoperability platform featuring Cloud Healthcare API (HL7v2/FHIR R4/DICOM), DLP PHI de-identification, OMOP BigQuery lakehouse, and Gemini 3.7 Flash clinical insights.",
    prompt: "Act as a Principal Google Cloud Healthcare & Life Sciences Architect. Design a production-grade Healthcare FHIR R4 & HL7 Pipeline blueprint featuring Cloud Healthcare API, DLP PHI De-Identification, BigQuery Health Marts, and Gemini 3.7 Flash Clinical Reasoner."
  }
];

export const ARCHITECTURE_TYPES: ArchitectureTypeOption[] = [
  ...BUSINESS_ARCHITECTURE_TYPES,
  ...TECHNICAL_ARCHITECTURE_TYPES
];

export function normalizeArchitectureId(archId?: string | null): string {
  if (!archId) return 'conceptual_diagram';
  const id = archId.toLowerCase().trim();
  // 50 Master WBS / Combined ID normalizers
  if (id.includes('p1-app-l-01') || id.includes('legacy_data_dependency')) return 'legacy_data_dependency_map';
  if (id.includes('p1-app-l-02') || id.includes('hybrid_strangler') || id.includes('strangler_fig')) return 'hybrid_strangler_transition';
  if (id.includes('p1-gov-c-03') || id.includes('value_stream') || id.includes('vsm')) return 'value_stream_map';
  if (id.includes('p1-gov-c-04') || id.includes('as_is') || id.includes('asis') || id.includes('tobe') || id.includes('to_be')) return 'asis_vs_tobe_process_flow';
  if (id.includes('p2-gov-c-01') || id.includes('finops') || id.includes('chargeback')) return 'cloud_finops_chargeback';
  if (id.includes('p3-app-c-01') || id.includes('total_unified_system_view') || id === 'unified_system_view') return 'unified_system_view';
  if (id.includes('p3-ai-l-02') || id.includes('cognitive_architecture') || id.includes('agentic_rag')) return 'agentic_rag';
  if (id.includes('p3-ai-l-03') || id.includes('hub_and_spoke') || id.includes('hub_spoke')) return 'hub_and_spoke_agent_config';
  if (id.includes('p3-dat-l-04') || id.includes('gcp_enterprise_data_lakehouse') || id.includes('lakehouse')) return 'tech_data_lakehouse_gcp';
  if (id.includes('p3-dat-l-05') || id.includes('dimensional_data_model') || id.includes('erd')) return 'erd';
  if (id.includes('p3-dat-c-06') || id.includes('unified_data_governance')) return 'unified_data_governance';
  if (id.includes('p3-sec-l-07') || id.includes('federated_iam') || id.includes('iam_sso')) return 'federated_iam_sso';
  if (id.includes('p3-app-l-08') || id.includes('micro_frontend') || id.includes('mfe')) return 'tech_micro_frontends';
  if (id.includes('p3-gov-l-09') || id.includes('logical_ai_config') || id.includes('tenant_architecture')) return 'logical_ai_config_tenant';
  if (id.includes('p3-app-l-10') || id.includes('multi_agent_sequence') || id.includes('sequence_diagram') || id.includes('sequence_flow')) return 'sequence_diagram';
  if (id.includes('p4-sec-p-01') || id.includes('secure_deployment')) return 'secure_deployment_map';
  if (id.includes('p4-sec-p-02') || id.includes('landing_zone') || id.includes('shared_vpc')) return 'gcp_landing_zone_vpc';
  if (id.includes('p4-sec-p-03') || id.includes('data_residency') || id.includes('sovereign')) return 'data_residency_sovereign_map';
  if (id.includes('p4-ai-p-04') || id.includes('enterprise_agent_runtime') || id.includes('agent_runtime')) return 'enterprise_agent_runtime';
  if (id.includes('p4-sec-p-05') || id.includes('tech_agentic_mesh') || id.includes('mesh_swarm')) return 'tech_agentic_mesh';
  if (id.includes('p4-gov-l-06') || id.includes('tech_eval_safety') || id.includes('eval_safety')) return 'tech_eval_safety';
  if (id.includes('p4-gov-l-07') || id.includes('ai_trism') || id.includes('trism')) return 'tech_ai_trism_guardrails';
  if (id.includes('p4-gov-l-08') || id.includes('ai_agent_approval') || id.includes('approval_workflow')) return 'ai_agent_approval_workflow';
  if (id.includes('p4-gov-p-09') || id.includes('devsecops_ci_cd') || id.includes('cicd_pipeline') || id.includes('cicd')) return 'devops_cicd_pipeline';
  if (id.includes('p4-app-l-10') || id.includes('event_driven_eda_mesh') || id.includes('event_driven_eda') || id.includes('event_driven_aws')) return 'tech_event_driven_eda';
  if (id.includes('p4-app-l-11') || id.includes('serverless_eda') || id.includes('serverless_gcp') || id.includes('serverless')) return 'tech_serverless_gcp';
  if (id.includes('p4-dat-p-12') || id.includes('multimodal_ingestion') || id.includes('multimodal')) return 'tech_multimodal_ingestion';
  if (id.includes('p4-dat-p-13') || id.includes('streaming_analytics') || id.includes('streaming_pipeline') || id.includes('streaming')) return 'tech_streaming_analytics';
  if (id.includes('p5-app-l-01') || id.includes('six_rs') || id.includes('6rs')) return 'six_rs_migration_matrix';
  if (id.includes('p5-sec-p-02') || id.includes('enterprise_sre') || id.includes('sre_observability') || id.includes('observability')) return 'enterprise_sre_observability';
  if (id.includes('p5-gov-p-03') || id.includes('golive_warroom') || id.includes('warroom_runbook') || id.includes('golive')) return 'golive_warroom_runbook';
  if (id.includes('p5-gov-l-04') || id.includes('incident_triage') || id.includes('incident_triage_swimlane')) return 'incident_triage_swimlane';
  if (id.includes('p5-ai-l-05') || id.includes('capacity_quota') || id.includes('quota_management')) return 'tech_llm_capacity_quota';
  if (id.includes('p5-ai-l-06') || id.includes('ai_coe') || id.includes('operating_model')) return 'ai_coe_operating_model';
  if (id.includes('p5-ai-p-07') || id.includes('llmops_lifecycle') || id.includes('llmops') || id.includes('prompt_config')) return 'tech_llmops_lifecycle';
  if (id.includes('p5-dat-p-08') || id.includes('dataops_anomaly') || id.includes('dataops')) return 'dataops_anomaly_detection';
  if (id.includes('p5-gov-p-09') || id.includes('bcdr_multi_region') || id.includes('multi_region_dr') || id.includes('multi_cloud_dr')) return 'tech_multi_region_dr';
  if (id.includes('ind-fintech-01') || id.includes('ind-fintech-03') || id.includes('financial_advising') || id.includes('fintech') || id.includes('payments')) return 'tech_fintech_payments';
  if (id.includes('ind-mfg-02') || id.includes('equipment_optimization')) return 'smart_factory_iot';
  if (id.includes('ind-pharma-03') || id.includes('ind-pharma-01') || id.includes('pharma_genomics') || id.includes('genomics') || id.includes('clinical')) return 'tech_genomics_clinical';
  if (id.includes('ind-retail-04') || id.includes('omnichannel_ecommerce') || id.includes('ecommerce') || id.includes('retail')) return 'ecommerce_retail';
  if (id.includes('ind-mfg-05') || id.includes('smart_manufacturing') || id.includes('smart_factory') || id.includes('manufacturing_iot')) return 'smart_factory_iot';
  if (id.includes('ind-hr-06') || id.includes('workforce_talent') || id.includes('talent_ai') || id.includes('hr_talent')) return 'hr_talent_ai';
  if (id.includes('ind-health-07') || id.includes('ind-health-01') || id.includes('healthcare_fhir') || id.includes('fhir') || id.includes('hl7')) return 'healthcare_fhir_hl7';
  if (id.includes('arch-c4-01') || id.includes('c4_system_context')) return 'tech_c4_system_context';
  if (id.includes('arch-c4-02') || id.includes('arch-c4-03') || id.includes('c4_component') || id.includes('c4_lld')) return 'c4_component_lld';
  if (id.includes('arch-bpmn-03') || id.includes('arch-bpmn-01') || id.includes('bpmn') || id.includes('workflow_process')) return 'bpmn_process_workflow';
  if (id.includes('arch-sec-04') || id.includes('arch-sec-01') || id.includes('stride') || id.includes('threat_modeling')) return 'threat_modeling_stride';
  if (id.includes('arch-dat-05') || id.includes('arch-dat-01') || id.includes('data_lineage') || id.includes('provenance')) return 'data_lineage_provenance';
  if (id.includes('arch-mcp-06') || id.includes('arch-mcp-02') || id.includes('mcp_gateway') || id.includes('mcp') || id.includes('context_gateway')) return 'mcp_context_gateway';
  if (id.includes('multiflow') || id.includes('decision_diamond')) return 'multiflow_zerotrust_platform';
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
  if (id === 'blank_canvas' || id === 'arch_blank_canvas') {
    return `<mxGraphModel dx="1422" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="1000" math="0" shadow="0"><root><mxCell id="0"/><mxCell id="1" parent="0"/></root></mxGraphModel>`;
  }
  let xml = '';

  if (id === 'conceptual_diagram') {
    xml = getExactItacsReferenceXml();
  } else if (id === 'erd') {
    xml = getExactErdReferenceXml();
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
  } else if (id === 'governance_state_machine' || id.includes('governance_state') || id.includes('state_machine')) {
    xml = getExactGovernanceStateMachineReferenceXml();
  } else if (id === 'six_rs_migration_matrix') {
    xml = getExactSixRsMigrationMatrixXml();
  } else if (id === 'hybrid_strangler_transition') {
    xml = getExactHybridStranglerTransitionXml();
  } else if (id === 'legacy_data_dependency_map') {
    xml = getExactLegacyDataDependencyMapXml();
  } else if (id === 'gcp_landing_zone_vpc') {
    xml = getExactGcpLandingZoneVpcXml();
  } else if (id === 'enterprise_agent_runtime') {
    xml = getExactEnterpriseAgentRuntimeXml();
  } else if (id === 'ai_agent_approval_workflow') {
    xml = getExactAiAgentApprovalWorkflowXml();
  } else if (id === 'incident_triage_swimlane') {
    xml = getExactIncidentTriageSwimlaneXml();
  } else if (id === 'ecommerce_retail') {
    xml = getExactEcommerceRetailXml();
  } else if (id === 'hr_talent_ai') {
    xml = getExactHrTalentAiXml();
  } else if (id === 'smart_factory_iot') {
    xml = getExactSmartFactoryIotXml();
  } else if (id === 'c4_component_lld') {
    xml = getExactC4ComponentLldXml();
  } else if (id === 'bpmn_process_workflow') {
    xml = getExactBpmnWorkflowXml();
  } else if (id === 'threat_modeling_stride') {
    xml = getExactThreatModelingStrideXml();
  } else if (id === 'data_lineage_provenance') {
    xml = getExactDataLineageXml();
  } else if (id === 'healthcare_fhir_hl7') {
    xml = getExactHealthcareFhirXml();
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
  } else if (id.includes('incident_triage') || id.includes('sre_observability') || id === 'p5-sec-p-02') {
    xml = getExactIncidentTriageSreXml();
  } else if (id === 'tech_data_lakehouse_gcp' || id === 'data_lakehouse' || id.includes('lakehouse')) {
    xml = getExactGcpDataLakehouseWbsXml();
  } else if (id === 'tech_serverless_gcp' || id === 'serverless_gcp' || id.includes('serverless') || id === 'p4-app-l-08') {
    xml = getExactServerlessGcpReferenceXml();
  } else if (id === 'multiflow_zerotrust_platform') {
    xml = getExactMultiFlowZeroTrustPlatformXml();
  } else if (id === 'unified_flowchart' || id.includes('flowchart') || id.includes('unified_flow')) {
    xml = getExactUnifiedFlowchartXml();
  } else if (id.startsWith('tech_') || id === 'serverless_gcp' || id === 'streaming_pipeline' || id === 'k8s_mesh' || id === 'data_lakehouse' || id === 'rag_gcp' || id === 'event_driven_aws' || id === 'multi_region_dr' || id === 'zero_trust' || id === 'hybrid_interconnect' || id === 'cicd_pipeline' || id === 'enterprise_devsecops_polyrepo') {
    xml = getTechnicalArchitectureXml(id);
  } else {
    xml = getTechnicalArchitectureXml(id || 'tech_serverless_gcp');
  }

  const hasCustomUserPrompt = Boolean(userPrompt && userPrompt.trim() !== '' && userPrompt.trim() !== getTemplateTitle(id));

  // If user provided a specific custom prompt to re-flavor the diagram, inject the flavor
  if (hasCustomUserPrompt) {
    const cleanUseCase = (useCaseContext && !/^\d+\.\s/.test(useCaseContext)) ? useCaseContext : undefined;
    const effectiveContext = cleanUseCase || userPrompt || getTemplateTitle(id);
    xml = injectUseCaseFlavor(xml, effectiveContext, userPrompt);
    xml = preflightVerifyAndHealXmlAcrossAll6Audits(xml, id);
  }

  return xml ? xml.replace(/&amp;amp;/g, '&amp;').replace(/&amp;quot;/g, '&quot;').replace(/&amp;lt;/g, '&lt;').replace(/&amp;gt;/g, '&gt;') : null;
}
