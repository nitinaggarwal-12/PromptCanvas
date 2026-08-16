export interface BlueprintKnowledgeItem {
  // Tier 1: Canonical Identity & Intent
  combinedId: string;
  diagramName: string;
  intentKeywords: string;
  goldenExamplePayload: string;
  uiCardDesc: string;

  // Tier 2: Architectural Scope & Framing
  phase: string;
  phaseName: string;
  phaseGoal: string;
  domain: string;
  abstractionLevel: string;
  stackLayer: string;

  // Tier 3: The Generative Recipe
  notationStandard: string;
  defaultDirection: string;
  coreGcpServices: string[];
  generativeBuildSequence: string;
  advancedPromptLogic: string;

  // Tier 4: Enterprise Context & Execution
  requiredUserInputs: string;
  prerequisite: string;
  primaryPersonas: string;
  salesStage: string;
  lifecyclePhase: string;
  liveRailwayLink: string;
}

export const BLUEPRINT_KNOWLEDGE_MATRIX: BlueprintKnowledgeItem[] = [
  {
    "combinedId": "P1-APP-L-01_legacy_data_dependency_map",
    "diagramName": "Legacy Data Dependency Map",
    "intentKeywords": "legacy, on-prem, spaghetti, current state, baseline, old systems, discovery, stratozone",
    "goldenExamplePayload": "Design a legacy data dependency map visualizing on-prem SQL databases, ETL scripts, and shadow IT extracts discovered by StratoZone for wave planning in Migration Center.",
    "uiCardDesc": "Visualizes on-prem legacy spaghetti dependencies, database coupling, shadow IT extracts, and Migration Center wave planning.",
    "phase": "Phase 1",
    "phaseName": "Phase 1: Current State Assessment & Baseline",
    "phaseGoal": "Visualizes on-prem legacy spaghetti dependencies, database coupling, shadow IT extracts, and Migration Center wave planning.",
    "domain": "App & Integration",
    "abstractionLevel": "Logical",
    "stackLayer": "Layer 4 (Application)",
    "notationStandard": "Discovery Dependency Mapping",
    "defaultDirection": "LR",
    "coreGcpServices": [
      "StratoZone",
      "Migrate to Containers",
      "Migration Center",
      "BigQuery",
      "Cloud Storage",
      "Gemini 3.7 Flash"
    ],
    "generativeBuildSequence": "1. Draw On-Prem Core Monolith & Shadow DBs. 2. Draw StratoZone Discovery Probe tier. 3. Draw Migration Wave Classification (Waves 1-3). 4. Draw Target Cloud Architecture with Strangler Proxy. 5. Add SOC2/ISO badges.",
    "advancedPromptLogic": "If [Mainframe] requested: Add z/OS DB2, CICS connectors, and MQ series queues in Tier 1.",
    "requiredUserInputs": "System scope, component names, protocols",
    "prerequisite": "Initial architectural intent",
    "primaryPersonas": "Creator: Discovery Lead / Solutions Arch. | Consumers: Cloud Migration Team | Stakeholders: Legacy App Owners / CTO",
    "salesStage": "Presales Pitch",
    "lifecyclePhase": "Assessment",
    "liveRailwayLink": "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=P1-APP-L-01_legacy_data_dependency_map"
  },
  {
    "combinedId": "P1-APP-L-02_hybrid_strangler_fig_transition",
    "diagramName": "Hybrid / Strangler Fig Transition Architecture",
    "intentKeywords": "strangler fig, hybrid migration, apigee routing, on-prem coexistence, legacy monolith, cloud interconnect, vpn backup",
    "goldenExamplePayload": "Design a hybrid strangler fig migration architecture where incoming client requests hit Apigee API Gateway, legacy queries route over 10G Dedicated Interconnect to an on-prem Oracle DB, and modernized services run on GKE with Cloud SQL.",
    "uiCardDesc": "Apigee API Gateway intercepting client traffic, routing legacy features to on-prem databases and modern features to GCP GKE.",
    "phase": "Phase 1",
    "phaseName": "Phase 1: Current State Assessment & Baseline",
    "phaseGoal": "Apigee API Gateway intercepting client traffic, routing legacy features to on-prem databases and modern features to GCP GKE.",
    "domain": "App & Integration",
    "abstractionLevel": "Logical",
    "stackLayer": "Layer 4 (Application)",
    "notationStandard": "Strangler Fig Traffic Facade",
    "defaultDirection": "LR",
    "coreGcpServices": [
      "Apigee API Gateway",
      "Dedicated Cloud Interconnect (10G)",
      "Cloud HA VPN",
      "GKE Autopilot",
      "Cloud SQL for PostgreSQL",
      "Cloud Monitoring"
    ],
    "generativeBuildSequence": "1. Draw On-Premises Datacenter container (Legacy App, SQL DB, Mainframe). 2. Draw GCP VPC container with Apigee Gateway, GKE Microservices, and Cloud SQL. 3. Connect via dual Cloud Interconnect (Active) and Cloud VPN (Backup). 4. Route client requests into Apigee with conditional legacy vs new paths. 5. Add SOC2/HIPAA compliance badges.",
    "advancedPromptLogic": "If [High Security] or [Zero-Trust] requested: Add Cloud Armor WAF in front of Apigee, VPC Service Controls perimeters, and TLS 1.3 inspection.",
    "requiredUserInputs": "System scope, component names, protocols",
    "prerequisite": "Initial architectural intent",
    "primaryPersonas": "Creator: Discovery Lead / Solutions Arch. | Consumers: Cloud Migration Team | Stakeholders: Legacy App Owners / CTO",
    "salesStage": "Presales Pitch",
    "lifecyclePhase": "Assessment",
    "liveRailwayLink": "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=P1-APP-L-02_hybrid_strangler_fig_transition"
  },
  {
    "combinedId": "P1-GOV-C-03_value_stream_map_vsm",
    "diagramName": "Enterprise AI Architecture & Delivery Value Stream Map",
    "intentKeywords": "value stream map, vsm, lead time, process time, automated gates, ai delivery lifecycle, agile governance, lean",
    "goldenExamplePayload": "Generate an Enterprise AI Delivery Value Stream Map showing Inception, Data Prep, Model Training, Safety Evaluation, and Deployment with LT/PT metrics and automated quality gates.",
    "uiCardDesc": "Enterprise AI delivery value stream measuring lead time, process time, automated quality gates, and process efficiency.",
    "phase": "Phase 1",
    "phaseName": "Phase 1: Current State Assessment & Baseline",
    "phaseGoal": "Enterprise AI delivery value stream measuring lead time, process time, automated quality gates, and process efficiency.",
    "domain": "Strategy & Governance",
    "abstractionLevel": "Conceptual",
    "stackLayer": "Layer 1 (Foundation)",
    "notationStandard": "Value Stream Map (VSM) Standard",
    "defaultDirection": "LR",
    "coreGcpServices": [
      "Vertex AI Pipelines",
      "Cloud Build",
      "Artifact Registry",
      "Cloud Deploy",
      "Cloud Monitoring",
      "BigQuery Metrics Export",
      "Gemini 3.7 Flash"
    ],
    "generativeBuildSequence": "1. Draw horizontal timeline chevron header (Inception -> Ingestion -> Model Prep -> Safety Eval -> Deploy). 2. Add stage cards with LT, PT, and %C&A KPIs. 3. Draw automated quality gate pills between stages. 4. Render bottom timeline showing Total Lead Time vs Processing Time ratio.",
    "advancedPromptLogic": "If [Lean Metric Breakdown] requested: Calculate Process Efficiency = (Total Processing Time / Total Lead Time) * 100% and render in executive summary callout.",
    "requiredUserInputs": "System scope, component names, protocols",
    "prerequisite": "Initial architectural intent",
    "primaryPersonas": "Creator: Lean/Agile Coach / Enterprise Arch. | Consumers: Business Unit Leaders | Stakeholders: Chief AI Officer / VP Engineering",
    "salesStage": "Presales Pitch",
    "lifecyclePhase": "Assessment",
    "liveRailwayLink": "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=P1-GOV-C-03_value_stream_map_vsm"
  },
  {
    "combinedId": "P1-GOV-C-04_as_is_vs_to_be_process_flow",
    "diagramName": "As-Is vs. To-Be Process & Architecture Flow",
    "intentKeywords": "as-is vs to-be, modernization ROI, legacy comparison, before after, modernization roadmap, cost reduction",
    "goldenExamplePayload": "Show a split-screen As-Is vs To-Be modernization architecture comparing legacy on-prem overnight batch ETL and manual spreadsheet triage against a real-time Pub/Sub Lakehouse and Gemini Agentic mesh.",
    "uiCardDesc": "Top: Manual legacy triage & batch ETL. Bottom: Sub-50ms real-time lakehouse & Gemini Enterprise cognitive architecture with ROI scorecard.",
    "phase": "Phase 1",
    "phaseName": "Phase 1: Current State Assessment & Baseline",
    "phaseGoal": "Top: Manual legacy triage & batch ETL. Bottom: Sub-50ms real-time lakehouse & Gemini Enterprise cognitive architecture with ROI scorecard.",
    "domain": "Strategy & Governance",
    "abstractionLevel": "Conceptual",
    "stackLayer": "Layer 1 (Foundation)",
    "notationStandard": "Split-Screen Architecture Transformation",
    "defaultDirection": "LR",
    "coreGcpServices": [
      "Cloud Pub/Sub",
      "Cloud Dataflow",
      "BigQuery BigLake",
      "Vertex AI Agent Builder",
      "Gemini 3.7 Flash",
      "Looker Studio",
      "Cloud Storage"
    ],
    "generativeBuildSequence": "1. Draw top red-tinted container: 'As-Is Legacy State' with on-prem monolith, batch cron jobs, and manual handoffs. 2. Draw bottom green-tinted container: 'To-Be GCP Cloud Native State' with real-time stream, Lakehouse, and Gemini Agents. 3. Insert center Transformation Arrow with ROI scorecard (80% Latency Reduction, $1.2M Annual Savings).",
    "advancedPromptLogic": "If [Executive Financials] requested: Inject OPEX vs CAPEX comparison breakdown table on right margin.",
    "requiredUserInputs": "System scope, component names, protocols",
    "prerequisite": "Initial architectural intent",
    "primaryPersonas": "Creator: Principal Solutions Architect | Consumers: C-Suite & Board Members | Stakeholders: CIO, CFO, Business Sponsors",
    "salesStage": "Presales Pitch",
    "lifecyclePhase": "Assessment",
    "liveRailwayLink": "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=P1-GOV-C-04_as_is_vs_to_be_process_flow"
  },
  {
    "combinedId": "P2-GOV-C-01_cloud_finops_chargeback_model",
    "diagramName": "Cloud FinOps & Chargeback Model",
    "intentKeywords": "finops, chargeback, showback, cost allocation, billing export, cloud unit economics, token budget",
    "goldenExamplePayload": "Build a Cloud FinOps Chargeback architecture showing Google Cloud Billing Export streaming into BigQuery, automated cost anomaly detection via Cloud Functions, and Looker showback dashboards for 5 Business Units.",
    "uiCardDesc": "Multi-tenant cost allocation tagging taxonomy, BigQuery billing export, showback/chargeback, and Looker executive budget alerts.",
    "phase": "Phase 2",
    "phaseName": "Phase 2: Business Vision & Strategy Alignment",
    "phaseGoal": "Multi-tenant cost allocation tagging taxonomy, BigQuery billing export, showback/chargeback, and Looker executive budget alerts.",
    "domain": "Strategy & Governance",
    "abstractionLevel": "Conceptual",
    "stackLayer": "Layer 1 (Foundation)",
    "notationStandard": "FinOps Allocation Matrix",
    "defaultDirection": "LR",
    "coreGcpServices": [
      "Cloud Billing Export",
      "BigQuery",
      "Looker Studio",
      "Cloud Functions",
      "Pub/Sub",
      "Cloud Budgets API",
      "Vertex AI Quota Governor"
    ],
    "generativeBuildSequence": "1. Draw Resource Tagging Tier (GCP Projects with env/cost-center tags). 2. Draw Ingestion Pipeline (Billing Export -> BigQuery partitioned table). 3. Draw Analytics & Alerting Tier (Cost Anomaly detection ML, Looker Dashboards). 4. Draw Chargeback Invoicing Engine routing monthly PDF reports to BU Leaders.",
    "advancedPromptLogic": "If [GenAI Token FinOps] requested: Add Model Quota Governor and Token Attribution per Team/Prompt.",
    "requiredUserInputs": "System scope, component names, protocols",
    "prerequisite": "Initial architectural intent",
    "primaryPersonas": "Creator: FinOps Lead Architect | Consumers: Department Budget Owners | Stakeholders: Finance, VP Cloud Infrastructure",
    "salesStage": "Executive Workshop",
    "lifecyclePhase": "Planning → Design",
    "liveRailwayLink": "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=P2-GOV-C-01_cloud_finops_chargeback_model"
  },
  {
    "combinedId": "P3-APP-C-01_total_unified_system_view",
    "diagramName": "Total Unified System View",
    "intentKeywords": "unified system view, total platform, master blueprint, panoramic architecture, enterprise reference model",
    "goldenExamplePayload": "Generate a panoramic Total Unified System View covering Multi-Modal Ingestion, Medallion Lakehouse on BigQuery, Gemini Multi-Agent Mesh, VPC-SC Security Perimeter, and Executive Cockpit.",
    "uiCardDesc": "Total integrated architecture consolidating data foundation, AI cognitive lifecycle, VPC network topology, and governance.",
    "phase": "Phase 3",
    "phaseName": "Phase 3: Target State Logical Architecture",
    "phaseGoal": "Total integrated architecture consolidating data foundation, AI cognitive lifecycle, VPC network topology, and governance.",
    "domain": "App & Integration",
    "abstractionLevel": "Conceptual",
    "stackLayer": "Layer 1 (Foundation)",
    "notationStandard": "Panoramic Enterprise Architecture",
    "defaultDirection": "LR",
    "coreGcpServices": [
      "Cloud Storage",
      "Cloud Dataflow",
      "BigQuery BigLake",
      "Vertex AI Agent Builder",
      "Gemini 3.7 Flash",
      "Cloud Armor",
      "GKE Autopilot",
      "Looker"
    ],
    "generativeBuildSequence": "1. Draw Ingestion Tier (Batch, Streaming, Multi-Modal). 2. Draw Lakehouse Foundation (Bronze, Silver, Gold BigLake). 3. Draw Cognitive Intelligence Layer (Gemini Pro, Vector Search, Tool Mesh). 4. Wrap with Zero-Trust VPC-SC and Cloud Armor Perimeter. 5. Draw Top Presentation Cockpit.",
    "advancedPromptLogic": "If [Zero-Trust High-Density] requested: Add CMEK Cloud KMS keys, Private Service Connect links, and 21 CFR Part 11 audit trails.",
    "requiredUserInputs": "System scope, component names, protocols",
    "prerequisite": "Initial architectural intent",
    "primaryPersonas": "Creator: Chief Enterprise Architect | Consumers: All Technical & Business Teams | Stakeholders: CTO, CISO, Chief Data Officer",
    "salesStage": "Architecture Design / Review",
    "lifecyclePhase": "Requirements → Design",
    "liveRailwayLink": "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=P3-APP-C-01_total_unified_system_view"
  },
  {
    "combinedId": "P3-AI-L-02_cognitive_architecture_agentic_rag",
    "diagramName": "Cognitive Architecture / Agentic RAG",
    "intentKeywords": "agentic rag, cognitive architecture, react loop, vector search, semantic embeddings, knowledge grounding, mcp tools",
    "goldenExamplePayload": "Build a Cognitive Agentic RAG architecture featuring text-embedding-004 chunking, Vertex AI Vector Search, a 4-stage circular ReAct loop (Thought -> Action -> Observation -> Synthesis), and Gemini 3.7 Flash reasoning.",
    "uiCardDesc": "Multi-agent ReAct orchestration loop (Thought -> Action -> Observation -> Synthesis) with 100% circular ring geometry.",
    "phase": "Phase 3",
    "phaseName": "Phase 3: Target State Logical Architecture",
    "phaseGoal": "Multi-agent ReAct orchestration loop (Thought -> Action -> Observation -> Synthesis) with 100% circular ring geometry.",
    "domain": "AI Agentic & LLMOps",
    "abstractionLevel": "Logical",
    "stackLayer": "Layer 3 (Complex)",
    "notationStandard": "Tangential ReAct Ring",
    "defaultDirection": "LR",
    "coreGcpServices": [
      "Vertex AI Vector Search",
      "Vertex AI Agent Builder",
      "Gemini 3.7 Flash",
      "Cloud Storage",
      "Model Armor",
      "Cloud Functions MCP Tools"
    ],
    "generativeBuildSequence": "1. Draw Ingestion & Chunking pipeline (GCS -> Document AI -> Embedding Engine). 2. Draw Vector Search & Metadata Store. 3. Build central ReAct circular loop with 4 curved tangential arcs. 4. Attach Model Armor guardrails and external MCP tool calling.",
    "advancedPromptLogic": "Enforce 100% smooth curved tangential ring geometry (curved=1) with zero straight diagonal crossing lines.",
    "requiredUserInputs": "System scope, component names, protocols",
    "prerequisite": "Initial architectural intent",
    "primaryPersonas": "Creator: Principal AI Architect | Consumers: AI Application Developers | Stakeholders: Head of AI / Product Management",
    "salesStage": "Architecture Design / Review",
    "lifecyclePhase": "Requirements → Design",
    "liveRailwayLink": "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=P3-AI-L-02_cognitive_architecture_agentic_rag"
  },
  {
    "combinedId": "P3-AI-L-03_hub_and_spoke_agent_mesh",
    "diagramName": "Hub-and-Spoke Agent Configuration Map",
    "intentKeywords": "hub and spoke, multi-agent mesh, agent supervisor, domain agents, subagents, agent delegation",
    "goldenExamplePayload": "Create a Hub-and-Spoke Multi-Agent Mesh with a central Gemini 3.7 Super-Orchestrator dispatching tasks to SQL Agent, Research Agent, and Compliance Agent with HITL fallback.",
    "uiCardDesc": "Hub-and-Spoke agent coordination model with Super-Orchestrator Hub, Domain Spoke agents, and human review gates.",
    "phase": "Phase 3",
    "phaseName": "Phase 3: Target State Logical Architecture",
    "phaseGoal": "Hub-and-Spoke agent coordination model with Super-Orchestrator Hub, Domain Spoke agents, and human review gates.",
    "domain": "AI Agentic & LLMOps",
    "abstractionLevel": "Logical",
    "stackLayer": "Layer 3 (Complex)",
    "notationStandard": "Hub-and-Spoke Agent Mesh",
    "defaultDirection": "LR",
    "coreGcpServices": [
      "Vertex AI Agent Builder",
      "Gemini 3.7 Flash / Pro",
      "Pub/Sub Agent Bus",
      "Cloud Run Agent Containers",
      "BigQuery Audit Log"
    ],
    "generativeBuildSequence": "1. Draw central Hub node: 'Super-Orchestrator Agent'. 2. Draw surrounding Spoke nodes in radial layout. 3. Connect bidirectional gRPC coordination channels. 4. Add bottom Human-in-the-Loop review gate for low confidence executions.",
    "advancedPromptLogic": "If [State Persistence] requested: Add Redis Memorystore distributed agent session memory bus.",
    "requiredUserInputs": "System scope, component names, protocols",
    "prerequisite": "Initial architectural intent",
    "primaryPersonas": "Creator: AI Systems Architect | Consumers: Agent Engineers | Stakeholders: Chief AI Architect",
    "salesStage": "Architecture Design / Review",
    "lifecyclePhase": "Requirements → Design",
    "liveRailwayLink": "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=P3-AI-L-03_hub_and_spoke_agent_mesh"
  },
  {
    "combinedId": "P3-DAT-L-04_gcp_enterprise_data_lakehouse",
    "diagramName": "GCP Enterprise Data Lakehouse & Gemini Agentic Mesh",
    "intentKeywords": "data lakehouse, biglake, medallion architecture, bronze silver gold, dataplex, bigquery, spark dataproc",
    "goldenExamplePayload": "Build a GCP Enterprise Data Lakehouse with Bronze (Raw GCS), Silver (Parquet / Iceberg via Dataproc Spark), and Gold (BigQuery BigLake tables) managed by Dataplex and analyzed in Looker.",
    "uiCardDesc": "Medallion Lakehouse schema on BigQuery BigLake with Dataplex fabric, GE Industrial Cockpit, and Gemini Agentic mesh.",
    "phase": "Phase 3",
    "phaseName": "Phase 3: Target State Logical Architecture",
    "phaseGoal": "Medallion Lakehouse schema on BigQuery BigLake with Dataplex fabric, GE Industrial Cockpit, and Gemini Agentic mesh.",
    "domain": "Data & Analytics",
    "abstractionLevel": "Logical",
    "stackLayer": "Layer 2 (Intermediary)",
    "notationStandard": "Medallion Lakehouse & BigLake Fabric",
    "defaultDirection": "LR",
    "coreGcpServices": [
      "Cloud Storage",
      "Dataproc Serverless",
      "BigQuery BigLake",
      "Dataplex Universal Catalog",
      "Cloud Data Fusion",
      "Looker Studio",
      "Gemini 3.7 Flash"
    ],
    "generativeBuildSequence": "1. Draw Ingestion Sources on left. 2. Draw 3-tier Medallion containers: Bronze Raw, Silver Refined, Gold Aggregated. 3. Overlay Dataplex governance fabric across all tiers. 4. Connect rightward to Looker Analytics and Gemini AI agent consumers.",
    "advancedPromptLogic": "Ensure 100% density with GE Industrial Cockpit, automated PII masking tags, and Data Lineage connectors.",
    "requiredUserInputs": "System scope, component names, protocols",
    "prerequisite": "Initial architectural intent",
    "primaryPersonas": "Creator: Principal Data Platform Architect | Consumers: Data Engineers & Analytics Teams | Stakeholders: Chief Data Officer",
    "salesStage": "Architecture Design / Review",
    "lifecyclePhase": "Requirements → Design",
    "liveRailwayLink": "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=P3-DAT-L-04_gcp_enterprise_data_lakehouse"
  },
  {
    "combinedId": "P3-DAT-L-05_dimensional_data_model_erd",
    "diagramName": "Dimensional Data Model - Crow's Foot ERD",
    "intentKeywords": "erd, entity relationship diagram, dimensional model, star schema, snowflake schema, crows foot, pgvector",
    "goldenExamplePayload": "Generate a Crow's Foot ERD with Fact_Transactions, Dim_Customer, Dim_Product, Dim_Date, and Table_Embeddings with 1536-dim vector columns and explicit PK/FK links.",
    "uiCardDesc": "Enterprise Star/Snowflake schema showing Fact tables, Dimension tables, Feature Store views, and pgvector embeddings.",
    "phase": "Phase 3",
    "phaseName": "Phase 3: Target State Logical Architecture",
    "phaseGoal": "Enterprise Star/Snowflake schema showing Fact tables, Dimension tables, Feature Store views, and pgvector embeddings.",
    "domain": "Data & Analytics",
    "abstractionLevel": "Logical",
    "stackLayer": "Layer 2 (Intermediary)",
    "notationStandard": "Crow's Foot Entity-Relationship (ERD)",
    "defaultDirection": "LR",
    "coreGcpServices": [
      "Cloud SQL for PostgreSQL (pgvector)",
      "AlloyDB AI",
      "BigQuery",
      "Vertex AI Feature Store",
      "Datastream CDC"
    ],
    "generativeBuildSequence": "1. Draw central Fact Table (Fact_Orders, Fact_Telemetry). 2. Draw surrounding Dimension Tables (Dim_User, Dim_Device, Dim_Location). 3. Connect with Crow's Foot cardinality lines (1:N, 1:1). 4. Highlight vector embedding columns with purple badges.",
    "advancedPromptLogic": "Enforce zero line slicing through table bodies; route orthogonal connectors through dedicated channel margins.",
    "requiredUserInputs": "System scope, component names, protocols",
    "prerequisite": "Initial architectural intent",
    "primaryPersonas": "Creator: Lead Database Modeler | Consumers: Backend & Data Engineers | Stakeholders: Data Engineering Lead",
    "salesStage": "Architecture Design / Review",
    "lifecyclePhase": "Requirements → Design",
    "liveRailwayLink": "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=P3-DAT-L-05_dimensional_data_model_erd"
  },
  {
    "combinedId": "P3-DAT-C-06_unified_data_governance",
    "diagramName": "Unified Data Governance & Access Control",
    "intentKeywords": "data governance, dataplex, access control, rbac, abac, data catalog, pii masking, compliance",
    "goldenExamplePayload": "Build a Unified Data Governance diagram on GCP showing Dataplex Universal Catalog, Cloud DLP automated PII masking, BigQuery row-level security, and Cloud IAM conditional access.",
    "uiCardDesc": "Enterprise-wide Dataplex taxonomy, row/column ABAC policies, automated PII tag templates, and 21 CFR Part 11 compliance.",
    "phase": "Phase 3",
    "phaseName": "Phase 3: Target State Logical Architecture",
    "phaseGoal": "Enterprise-wide Dataplex taxonomy, row/column ABAC policies, automated PII tag templates, and 21 CFR Part 11 compliance.",
    "domain": "Data & Analytics",
    "abstractionLevel": "Conceptual",
    "stackLayer": "Layer 1 (Foundation)",
    "notationStandard": "Dataplex Active Governance Fabric",
    "defaultDirection": "LR",
    "coreGcpServices": [
      "Dataplex Universal Catalog",
      "Cloud DLP",
      "BigQuery Column-Level Security",
      "Cloud IAM",
      "Cloud KMS",
      "Cloud Audit Logs"
    ],
    "generativeBuildSequence": "1. Draw Policy Definition Plane (Legal, Compliance, CISO). 2. Draw Dataplex Governance Hub (Metadata Catalog, Tag Templates). 3. Draw Enforcement Tier (Cloud DLP, Column-Level Encryption, Dynamic Row Filters). 4. Draw Audit Log Lakehouse.",
    "advancedPromptLogic": "If [Healthcare/Life Sciences] requested: Enforce HIPAA de-identification rules and 21 CFR Part 11 electronic signature audit logs.",
    "requiredUserInputs": "System scope, component names, protocols",
    "prerequisite": "Initial architectural intent",
    "primaryPersonas": "Creator: Data Governance Officer | Consumers: Data Stewards & SREs | Stakeholders: Chief Compliance Officer / CISO",
    "salesStage": "Architecture Design / Review",
    "lifecyclePhase": "Requirements → Design",
    "liveRailwayLink": "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=P3-DAT-C-06_unified_data_governance"
  },
  {
    "combinedId": "P3-SEC-L-07_federated_iam_sso",
    "diagramName": "Google Cloud Federated IAM & SSO Architecture",
    "intentKeywords": "iam, sso, saml, oidc, federated identity, azure ad, okta, workforce identity federation, iap, beyondcorp",
    "goldenExamplePayload": "Design a Google Cloud Federated IAM architecture synchronizing corporate Azure AD users via GCDS, enforcing SAML 2.0 SSO, and securing internal apps with BeyondCorp Identity-Aware Proxy (IAP).",
    "uiCardDesc": "GCDS Directory Sync, SAML 2.0 / OIDC Identity Federation, Okta / Azure AD Bridge, and Identity-Aware Proxy (IAP).",
    "phase": "Phase 3",
    "phaseName": "Phase 3: Target State Logical Architecture",
    "phaseGoal": "GCDS Directory Sync, SAML 2.0 / OIDC Identity Federation, Okta / Azure AD Bridge, and Identity-Aware Proxy (IAP).",
    "domain": "Cloud Infra Security",
    "abstractionLevel": "Logical",
    "stackLayer": "Layer 4 (Application)",
    "notationStandard": "Zero-Trust Context-Aware Flow",
    "defaultDirection": "LR",
    "coreGcpServices": [
      "Cloud Identity",
      "Workforce Identity Federation",
      "Identity-Aware Proxy (IAP)",
      "Cloud IAM",
      "BeyondCorp Enterprise",
      "Cloud Audit Logs"
    ],
    "generativeBuildSequence": "1. Draw Corporate IdP container (Azure AD / Okta). 2. Draw Google Cloud Identity sync bridge (GCDS). 3. Draw Workforce Identity Federation token exchange. 4. Draw IAP Gateway intercepting end-user HTTPS traffic with context-aware device checks. 5. Route to backend GKE/Cloud Run apps.",
    "advancedPromptLogic": "If [Workload Identity] requested: Add GitHub Actions OIDC federation with Google Cloud Service Accounts without static keys.",
    "requiredUserInputs": "System scope, component names, protocols",
    "prerequisite": "Initial architectural intent",
    "primaryPersonas": "Creator: Identity & Access Architect | Consumers: Cloud Security Engineers | Stakeholders: CISO / Identity Operations Lead",
    "salesStage": "Architecture Design / Review",
    "lifecyclePhase": "Requirements → Design",
    "liveRailwayLink": "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=P3-SEC-L-07_federated_iam_sso"
  },
  {
    "combinedId": "P3-APP-L-08_micro_frontend_architecture",
    "diagramName": "Micro-Frontend & Modular UI Presentation",
    "intentKeywords": "micro frontend, mfe, module federation, web components, design system, client event bus, shell app",
    "goldenExamplePayload": "Build a Micro-Frontend architecture with a host Next.js Shell dynamically loading remote Webpack 5 Module Federation micro-apps (Header, Dashboard, Chat Assistant) with shared Tailwind tokens and BroadcastChannel event bus.",
    "uiCardDesc": "Module Federation shell, isolated UI micro-apps, shared design system tokens, and client-side event bus.",
    "phase": "Phase 3",
    "phaseName": "Phase 3: Target State Logical Architecture",
    "phaseGoal": "Module Federation shell, isolated UI micro-apps, shared design system tokens, and client-side event bus.",
    "domain": "App & Integration",
    "abstractionLevel": "Logical",
    "stackLayer": "Layer 4 (Application)",
    "notationStandard": "Module Federation UI Component Map",
    "defaultDirection": "LR",
    "coreGcpServices": [
      "Cloud CDN",
      "Cloud Storage (Static Assets)",
      "Cloud Run (Host SSR)",
      "Firebase Hosting",
      "Cloud Armor WAF"
    ],
    "generativeBuildSequence": "1. Draw top User Presentation Shell (Host Container). 2. Draw decoupled remote Micro-App containers. 3. Add Shared Design System and State Bus. 4. Draw backend API Gateway routes connecting to each microservice domain.",
    "advancedPromptLogic": "If [Real-Time WebSocket Sync] requested: Inject WebSockets Client Gateway and BroadcastChannel state replication.",
    "requiredUserInputs": "System scope, component names, protocols",
    "prerequisite": "Initial architectural intent",
    "primaryPersonas": "Creator: Principal Frontend Architect | Consumers: UI/UX & Frontend Engineers | Stakeholders: VP Engineering / Head of Product",
    "salesStage": "Architecture Design / Review",
    "lifecyclePhase": "Requirements → Design",
    "liveRailwayLink": "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=P3-APP-L-08_micro_frontend_architecture"
  },
  {
    "combinedId": "P3-GOV-L-09_logical_ai_config_tenant",
    "diagramName": "Product Plan - Logical AI Config (Tenant Architecture)",
    "intentKeywords": "multi-tenant, tenant isolation, quota governor, rate limiting, noisy neighbor, persona routing",
    "goldenExamplePayload": "Create a Multi-Tenant Logical AI Configuration diagram showing Tenant Router, Tenant Quota Governor, Row-Level Security isolation in Cloud SQL, and dedicated Vertex AI model endpoints for Enterprise tier.",
    "uiCardDesc": "Multi-tenant logical isolation, tenant resource allocation, model persona routing, and quota governor.",
    "phase": "Phase 3",
    "phaseName": "Phase 3: Target State Logical Architecture",
    "phaseGoal": "Multi-tenant logical isolation, tenant resource allocation, model persona routing, and quota governor.",
    "domain": "Strategy & Governance",
    "abstractionLevel": "Logical",
    "stackLayer": "Layer 4 (Application)",
    "notationStandard": "Hierarchical Multi-Tenant Tree",
    "defaultDirection": "TD",
    "coreGcpServices": [
      "Vertex AI Model Endpoints",
      "Memorystore for Redis",
      "Cloud SQL",
      "BigQuery",
      "Apigee API Gateway",
      "Cloud Monitoring"
    ],
    "generativeBuildSequence": "1. Draw Ingress Tenant Router. 2. Draw Tenant Quota & Policy Governor. 3. Draw Tiered Compute Clusters (Shared vs Dedicated). 4. Draw Data Isolation Layer with tenant_id foreign keys and RLS rules.",
    "advancedPromptLogic": "If [Noisy Neighbor Prevention] requested: Add Redis Token Bucket Rate Limiting with sub-millisecond throttle enforcement.",
    "requiredUserInputs": "System scope, component names, protocols",
    "prerequisite": "Initial architectural intent",
    "primaryPersonas": "Creator: Cloud Platform Foundations Lead | Consumers: Platform Engineers & Tenant Admins | Stakeholders: Head of Infrastructure",
    "salesStage": "Architecture Design / Review",
    "lifecyclePhase": "Requirements → Design",
    "liveRailwayLink": "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=P3-GOV-L-09_logical_ai_config_tenant"
  },
  {
    "combinedId": "P3-APP-L-10_multi_agent_sequence_flow",
    "diagramName": "Multi-Agent Execution Lifeline Sequence Diagram",
    "intentKeywords": "sequence diagram, uml lifeline, grpc flow, vpc-sc, hitl review, agent execution, chronological sequence",
    "goldenExamplePayload": "Build a UML Sequence Diagram showing an end-user query flowing to API Gateway, prompt scanning in Model Armor, vector retrieval in Vertex Vector Search, Gemini 3.7 reasoning, a low-confidence Human-in-the-Loop review gate, and final verified response.",
    "uiCardDesc": "Micro Dynamic UML sequence diagram modeling end-user requests, agent orchestration, confidence gating, and HITL review.",
    "phase": "Phase 3",
    "phaseName": "Phase 3: Target State Logical Architecture",
    "phaseGoal": "Micro Dynamic UML sequence diagram modeling end-user requests, agent orchestration, confidence gating, and HITL review.",
    "domain": "App & Integration",
    "abstractionLevel": "Logical",
    "stackLayer": "Layer 4 (Application)",
    "notationStandard": "Dynamic UML Sequence Diagram",
    "defaultDirection": "LR",
    "coreGcpServices": [
      "Cloud Endpoints / Apigee",
      "Vertex AI Vector Search",
      "Gemini 3.7 Flash",
      "Model Armor",
      "Cloud Audit Logs",
      "PagerDuty / HITL Portal"
    ],
    "generativeBuildSequence": "1. Draw 5 vertical lifeline columns (User, API Gateway, Vector Store, Gemini Agent, Human Reviewer). 2. Draw numbered horizontal sequence arrows (1..8). 3. Add HITL condition box at Step 5. 4. Return sub-second verified output to client.",
    "advancedPromptLogic": "Enforce Maximum 140px Label Width (split with <br>) and 30px Minimum Vertical Clear-Zone to prevent text collisions.",
    "requiredUserInputs": "System scope, component names, protocols",
    "prerequisite": "Initial architectural intent",
    "primaryPersonas": "Creator: Principal API Architect | Consumers: Backend Developers & Auditors | Stakeholders: Product Managers / Lead Developers",
    "salesStage": "Architecture Design / Review",
    "lifecyclePhase": "Requirements → Design",
    "liveRailwayLink": "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=P3-APP-L-10_multi_agent_sequence_flow"
  },
  {
    "combinedId": "P4-SEC-P-01_secure_deployment_topology_map",
    "diagramName": "Secure Deployment Topology Map",
    "intentKeywords": "secure deployment, zero trust, gke autopilot, cloud armor, waf, binary authorization, cmek kms, scc, security topology",
    "goldenExamplePayload": "Generate a production Secure Deployment Topology Map on GCP with Cloud Armor WAF, Private GKE Autopilot cluster, Private Service Connect to Cloud SQL, Cloud KMS CMEK encryption, and Binary Authorization signing.",
    "uiCardDesc": "Zero-Trust GCP Network Topology with Cloud Armor WAF, GKE Autopilot, Cloud SQL PSA, Binary Authorization, and CMEK KMS.",
    "phase": "Phase 4",
    "phaseName": "Phase 4: Technical Deep-Dive & Security Validation",
    "phaseGoal": "Zero-Trust GCP Network Topology with Cloud Armor WAF, GKE Autopilot, Cloud SQL PSA, Binary Authorization, and CMEK KMS.",
    "domain": "Cloud Infra Security",
    "abstractionLevel": "Physical",
    "stackLayer": "Layer 4 (Operations)",
    "notationStandard": "Zero-Trust Physical Network Topology",
    "defaultDirection": "LR",
    "coreGcpServices": [
      "Cloud Armor",
      "GKE Autopilot",
      "Cloud SQL PSA",
      "Cloud KMS CMEK",
      "Artifact Registry",
      "Binary Authorization",
      "Security Command Center",
      "Cloud NAT"
    ],
    "generativeBuildSequence": "1. Draw Outer Internet & CDN edge with Cloud Armor WAF. 2. Draw Secure CI/CD Pipeline (Cloud Build -> Artifact Registry -> Binary Auth). 3. Draw Production VPC Perimeter (Private GKE cluster with Istio mTLS 1.3). 4. Draw Private Data Zone (Cloud SQL via PSC, Cloud KMS CMEK). 5. Add SCC threat detection overlay.",
    "advancedPromptLogic": "Ensure 100% canvas density, explicit port numbers (443, 8443, 5432), and zero plain-text passwords.",
    "requiredUserInputs": "System scope, component names, protocols",
    "prerequisite": "Initial architectural intent",
    "primaryPersonas": "Creator: Principal Cloud Security Architect | Consumers: DevSecOps & Network Engineers | Stakeholders: CISO / Head of Security",
    "salesStage": "Security Review / ARB Sign-Off",
    "lifecyclePhase": "Design → Verification",
    "liveRailwayLink": "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=P4-SEC-P-01_secure_deployment_topology_map"
  },
  {
    "combinedId": "P4-SEC-P-02_gcp_landing_zone_vpc_map",
    "diagramName": "GCP Landing Zone & Shared VPC Network Fabric",
    "intentKeywords": "landing zone, shared vpc, hub and spoke, cloud interconnect, private service connect, cloud nat, ngfw",
    "goldenExamplePayload": "Design a production-grade GCP Landing Zone with a Hub-and-Spoke Shared VPC, 100G Dedicated Interconnect, Private Service Connect (PSC 10.50.0.5), Cloud NGFW, and VPC-SC perimeter powered by Gemini 3.7 Flash.",
    "uiCardDesc": "Production-grade Hub-and-Spoke Shared VPC network fabric with 100G Dedicated Interconnect, Cloud Router BGP, PSC, and Cloud NGFW.",
    "phase": "Phase 4",
    "phaseName": "Phase 4: Technical Deep-Dive & Security Validation",
    "phaseGoal": "Production-grade Hub-and-Spoke Shared VPC network fabric with 100G Dedicated Interconnect, Cloud Router BGP, PSC, and Cloud NGFW.",
    "domain": "Cloud Infra Security",
    "abstractionLevel": "Physical",
    "stackLayer": "Layer 4 (Operations)",
    "notationStandard": "Hub-and-Spoke Shared VPC Topology",
    "defaultDirection": "LR",
    "coreGcpServices": [
      "Shared VPC Host Project",
      "100G Dedicated Interconnect",
      "Cloud Router BGP",
      "Private Service Connect (PSC)",
      "Cloud NGFW",
      "Cloud NAT HA",
      "VPC Service Controls"
    ],
    "generativeBuildSequence": "1. Draw Hybrid Ingress (100G Interconnect & Cloud VPN). 2. Draw Central Hub Host Project (Cloud NGFW, PSC Hub). 3. Draw Production Workload Spoke (GKE & Serverless Subnets). 4. Draw Managed Services Enclave (PSC 10.50.0.5). 5. Overlay VPC-SC Perimeter boundary.",
    "advancedPromptLogic": "If [Multi-Region] requested: Add us-east4 secondary VPC peering, cross-region Network Connectivity Center (NCC) spokes, and BGP failover routes.",
    "requiredUserInputs": "System scope, component names, protocols",
    "prerequisite": "Initial architectural intent",
    "primaryPersonas": "Creator: Principal Network Architect | Consumers: CISO & SecOps Leads | Stakeholders: VP Cloud Infrastructure",
    "salesStage": "Security Review / ARB Sign-Off",
    "lifecyclePhase": "Design → Verification",
    "liveRailwayLink": "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=P4-SEC-P-02_gcp_landing_zone_vpc_map"
  },
  {
    "combinedId": "P4-SEC-P-03_data_residency_sovereign_map",
    "diagramName": "Data Residency & Sovereign Cloud Map",
    "intentKeywords": "data residency, sovereign cloud, gdpr, eu ai act, jurisdiction boundary, vpc peering, cross-border dlp",
    "goldenExamplePayload": "Build a Data Residency & Sovereign Cloud Map separating EU Sovereign Cloud (Frankfurt) and US Commercial Cloud (Iowa) with Cloud DLP border inspection and local EU External Key Management (EKM).",
    "uiCardDesc": "Multi-region landing zone, cross-region VPC peering, sovereign boundary enforcement, and Cloud Interconnect links.",
    "phase": "Phase 4",
    "phaseName": "Phase 4: Technical Deep-Dive & Security Validation",
    "phaseGoal": "Multi-region landing zone, cross-region VPC peering, sovereign boundary enforcement, and Cloud Interconnect links.",
    "domain": "Cloud Infra Security",
    "abstractionLevel": "Physical",
    "stackLayer": "Layer 4 (Operations)",
    "notationStandard": "Sovereign Perimeter & Boundary Mesh",
    "defaultDirection": "LR",
    "coreGcpServices": [
      "Cloud KMS External Key Manager (EKM)",
      "Cloud DLP",
      "VPC Service Controls",
      "Dedicated Interconnect",
      "Cloud Storage Dual-Region",
      "Cloud Logging"
    ],
    "generativeBuildSequence": "1. Draw Left Container: EU Sovereign Cloud Perimeter (Frankfurt). 2. Draw Right Container: US Commercial Cloud Perimeter (Iowa). 3. Insert Central Cross-Border Gateway with Cloud DLP and EKM HSM keys. 4. Annotate GDPR Article 44 transfer compliance.",
    "advancedPromptLogic": "If [Sovereign Air-Gap] requested: Strip all external internet egress routes and enforce 100% private Google access.",
    "requiredUserInputs": "System scope, component names, protocols",
    "prerequisite": "Initial architectural intent",
    "primaryPersonas": "Creator: Sovereign Cloud Architect | Consumers: Compliance & Security Leads | Stakeholders: CISO / Data Protection Officer",
    "salesStage": "Security Review / ARB Sign-Off",
    "lifecyclePhase": "Design → Verification",
    "liveRailwayLink": "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=P4-SEC-P-03_data_residency_sovereign_map"
  },
  {
    "combinedId": "P4-AI-P-04_enterprise_agent_runtime_platform",
    "diagramName": "Enterprise Agent Runtime Platform",
    "intentKeywords": "agent runtime, gke, cloud run, compute, infrastructure, agent gateway, deployment, mcp, model armor",
    "goldenExamplePayload": "Design an Enterprise Agent Runtime Platform on GKE Autopilot with gVisor isolation, Agent Gateway, MCP tool worker pods, Model Armor prompt protection, and Vertex AI TPU v5e serving.",
    "uiCardDesc": "Physical sandboxed compute runtime on GKE Autopilot with Agent Gateway, MCP tool worker pods, and Model Armor prompt interceptor.",
    "phase": "Phase 4",
    "phaseName": "Phase 4: Technical Deep-Dive & Security Validation",
    "phaseGoal": "Physical sandboxed compute runtime on GKE Autopilot with Agent Gateway, MCP tool worker pods, and Model Armor prompt interceptor.",
    "domain": "AI & Agentic",
    "abstractionLevel": "Physical",
    "stackLayer": "Layer 4 (Operations)",
    "notationStandard": "Physical Microservice & GKE Topology",
    "defaultDirection": "LR",
    "coreGcpServices": [
      "GKE Autopilot (gVisor)",
      "Model Armor",
      "Vertex AI TPU v5e",
      "MCP Gateway",
      "Memorystore Redis",
      "Gemini 3.7 Flash",
      "Cloud Logging"
    ],
    "generativeBuildSequence": "1. Draw Ingress LB & Cloud Armor. 2. Draw Agent Gateway & Model Armor real-time prompt interceptor. 3. Draw GKE Autopilot Sandboxed Workers (MCP Tool Pods, ephemeral SSDs). 4. Draw Vertex AI TPU v5e serving and BigQuery telemetry.",
    "advancedPromptLogic": "If [High Security] requested: Enforce gVisor kernel isolation, CMEK HSM for tool scratchpads, and VPC-SC perimeter.",
    "requiredUserInputs": "System scope, component names, protocols",
    "prerequisite": "Initial architectural intent",
    "primaryPersonas": "Creator: AI Systems Architect | Consumers: ML Engineers & DevSecOps | Stakeholders: CTO / Head of AI Platforms",
    "salesStage": "Security Review / ARB Sign-Off",
    "lifecyclePhase": "Design → Verification",
    "liveRailwayLink": "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=P4-AI-P-04_enterprise_agent_runtime_platform"
  },
  {
    "combinedId": "P4-SEC-P-05_tech_agentic_mesh",
    "diagramName": "Hybrid Multi-Cloud Networking & Gemini Enterprise",
    "intentKeywords": "multi cloud, hybrid interconnect, 100g dedicated interconnect, ncc, bgp routing, aws direct connect, gemini aiops",
    "goldenExamplePayload": "Create a carrier-grade Hybrid Multi-Cloud network topology connecting On-Premises Core (ASN 65001), Google Cloud VPC (ASN 16550) via dual 100G Interconnect, and AWS us-east-1 via Cross-Cloud Interconnect with Network Connectivity Center (NCC) BGP routing.",
    "uiCardDesc": "100G Dedicated Interconnect, Partner Interconnect, Cloud VPN, Cross-Cloud Interconnect for AWS, NCC BGP routing, and Gemini AIOps.",
    "phase": "Phase 4",
    "phaseName": "Phase 4: Technical Deep-Dive & Security Validation",
    "phaseGoal": "100G Dedicated Interconnect, Partner Interconnect, Cloud VPN, Cross-Cloud Interconnect for AWS, NCC BGP routing, and Gemini AIOps.",
    "domain": "Cloud Infra Security",
    "abstractionLevel": "Physical",
    "stackLayer": "Layer 4 (Operations)",
    "notationStandard": "Multi-Cloud Network Transit Mesh",
    "defaultDirection": "LR",
    "coreGcpServices": [
      "Dedicated Cloud Interconnect (100G)",
      "Network Connectivity Center (NCC)",
      "Cloud Router",
      "Cloud VPN",
      "Cross-Cloud Interconnect",
      "Gemini Enterprise AIOps"
    ],
    "generativeBuildSequence": "1. Draw Left Tier: On-Premises Core Datacenter. 2. Draw Center Tier: Google Cloud VPC with NCC Hub and Cloud Routers. 3. Draw Right Tier: AWS Direct Connect Gateway and VPCs. 4. Draw redundant active-active 100G BGP circuits. 5. Overlay Gemini Enterprise AIOps self-healing brain.",
    "advancedPromptLogic": "Enforce sub-second BFD failover (300ms) badges and 100% private RFC 1918 CIDR IP block labels.",
    "requiredUserInputs": "System scope, component names, protocols",
    "prerequisite": "Initial architectural intent",
    "primaryPersonas": "Creator: Principal Network Architect | Consumers: Multi-Cloud Network Engineers | Stakeholders: VP Infrastructure / CISO",
    "salesStage": "Security Review / ARB Sign-Off",
    "lifecyclePhase": "Design → Verification",
    "liveRailwayLink": "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=P4-SEC-P-05_tech_agentic_mesh"
  },
  {
    "combinedId": "P4-GOV-L-06_tech_eval_safety",
    "diagramName": "Agentic AI Evaluation, Safety & Optimization Platform",
    "intentKeywords": "ai evaluation, model safety, model armor, rlhf, atheris fuzzer, agent registry, ai trism, closed loop optimization",
    "goldenExamplePayload": "Build an End-to-End Agentic AI Evaluation and Safety Platform on GCP with Agent Registry, Vertex AI Agent Builder, Model Armor prompt filters, Atheris security fuzzer, and BigQuery/Looker optimization telemetry.",
    "uiCardDesc": "Closed-loop Agentic AI Evaluation, Safety, and Optimization Platform integrating Agent Registry, Gemini Pro/Ultra, Model Armor, and RLHF tuning.",
    "phase": "Phase 4",
    "phaseName": "Phase 4: Technical Deep-Dive & Security Validation",
    "phaseGoal": "Closed-loop Agentic AI Evaluation, Safety, and Optimization Platform integrating Agent Registry, Gemini Pro/Ultra, Model Armor, and RLHF tuning.",
    "domain": "AI Agentic & LLMOps",
    "abstractionLevel": "Logical",
    "stackLayer": "Layer 3 (Complex)",
    "notationStandard": "Closed-Loop Governance Pipeline",
    "defaultDirection": "LR",
    "coreGcpServices": [
      "Vertex AI Agent Builder",
      "Gemini 3.7 Flash / Pro",
      "Agent Registry",
      "Model Armor",
      "Vertex AI Model Evaluation",
      "BigQuery",
      "Looker Studio"
    ],
    "generativeBuildSequence": "1. Draw Ingestion & Agent Registry. 2. Draw Gemini Platform Core (Orchestrator, Reasoning Engine, Tool Mesh). 3. Draw Parallel Evaluation & Safety Loop (Vertex Model Eval + Human Review). 4. Draw Feedback Loop updating Prompt Configurations & RLHF Weights.",
    "advancedPromptLogic": "Include GE App Context binding and continuous sub-second policy synchronization.",
    "requiredUserInputs": "System scope, component names, protocols",
    "prerequisite": "Initial architectural intent",
    "primaryPersonas": "Creator: Lead AI Safety Researcher | Consumers: MLOps & Governance Teams | Stakeholders: Chief AI Officer / AI Ethics Board",
    "salesStage": "Security Review / ARB Sign-Off",
    "lifecyclePhase": "Design → Verification",
    "liveRailwayLink": "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=P4-GOV-L-06_tech_eval_safety"
  },
  {
    "combinedId": "P4-GOV-L-07_ai_trism_guardrails",
    "diagramName": "AI TRiSM Security Guardrail Pipeline",
    "intentKeywords": "trism, model armor, prompt injection, jailbreak defense, pii redaction, constitutional ai, kill switch",
    "goldenExamplePayload": "Design an AI TRiSM Guardrail Pipeline where user prompts pass through Cloud DLP (PII Redaction), Model Armor (Prompt Injection & Jailbreak scanning), Vertex AI Gemini Inference, and a Constitutional AI Judge with an automated kill-switch.",
    "uiCardDesc": "Enterprise AI Safety & Ethics Governance Suite with Constitutional Judges, CI/CD Gatekeeper, and Kill-Switch.",
    "phase": "Phase 4",
    "phaseName": "Phase 4: Technical Deep-Dive & Security Validation",
    "phaseGoal": "Enterprise AI Safety & Ethics Governance Suite with Constitutional Judges, CI/CD Gatekeeper, and Kill-Switch.",
    "domain": "Strategy & Governance",
    "abstractionLevel": "Logical",
    "stackLayer": "Layer 4 (Application)",
    "notationStandard": "TRiSM Pre/Post Inference Pipeline",
    "defaultDirection": "LR",
    "coreGcpServices": [
      "Cloud DLP",
      "Model Armor",
      "Vertex AI Guardrails",
      "Gemini 3.7 Flash",
      "Cloud Functions (Kill-Switch)",
      "Cloud Logging"
    ],
    "generativeBuildSequence": "1. Draw User Prompt Ingress. 2. Draw Pre-Inference Inspection Gate (DLP, Jailbreak Fuzzer). 3. Draw Core LLM Inference. 4. Draw Post-Inference Validation Gate (Hallucination Checker, PII Re-check). 5. Attach Emergency Kill-Switch and Audit Logger.",
    "advancedPromptLogic": "If [EU AI Act Compliance] requested: Tag high-risk classification badges and audit trail retention specs.",
    "requiredUserInputs": "System scope, component names, protocols",
    "prerequisite": "Initial architectural intent",
    "primaryPersonas": "Creator: AI Security Architect | Consumers: CISO & Legal Officers | Stakeholders: Risk Management / Ethics Board",
    "salesStage": "Security Review / ARB Sign-Off",
    "lifecyclePhase": "Design → Verification",
    "liveRailwayLink": "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=P4-GOV-L-07_ai_trism_guardrails"
  },
  {
    "combinedId": "P4-GOV-L-08_ai_agent_approval_workflow",
    "diagramName": "AI Agent Approval Workflow & Human-in-the-Loop Governance",
    "intentKeywords": "approval workflow, ai governance, bias testing, legal review, deployment gate, binary auth, kms attestation",
    "goldenExamplePayload": "Design an AI Agent Approval Workflow with automated red-teaming, Legal/Security review gates, Cloud KMS HSM attestation, and Binary Authorization signed GKE deployment.",
    "uiCardDesc": "Security, legal, and bias testing gates agents pass before production with Binary Authorization cryptographic attestation.",
    "phase": "Phase 4",
    "phaseName": "Phase 4: Technical Deep-Dive & Security Validation",
    "phaseGoal": "Security, legal, and bias testing gates agents pass before production with Binary Authorization cryptographic attestation.",
    "domain": "Strategy & Governance",
    "abstractionLevel": "Logical",
    "stackLayer": "Layer 4 (Application)",
    "notationStandard": "Governance Gatekeeper Flow",
    "defaultDirection": "LR",
    "coreGcpServices": [
      "Vertex AI Evaluation",
      "Binary Authorization",
      "Cloud KMS HSM",
      "Cloud Tasks HITL",
      "GKE Autopilot",
      "Gemini 3.7 Flash",
      "Cloud Audit Logs"
    ],
    "generativeBuildSequence": "1. Draw Developer IDE & Agent Manifest submission. 2. Draw Automated Security & Red-Teaming stage. 3. Draw Multi-Stakeholder Human Approval stage (Legal & AppSec). 4. Draw Binary Authorization KMS signing and Signed GKE deployment.",
    "advancedPromptLogic": "If [Regulated Financial/Health] requested: Require 3-key M-of-N multi-sig attestation from Legal, SecOps, and Compliance.",
    "requiredUserInputs": "System scope, component names, protocols",
    "prerequisite": "Initial architectural intent",
    "primaryPersonas": "Creator: AI Governance Architect | Consumers: DevSecOps & Legal Teams | Stakeholders: Chief Compliance Officer / CISO",
    "salesStage": "Security Review / ARB Sign-Off",
    "lifecyclePhase": "Design → Verification",
    "liveRailwayLink": "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=P4-GOV-L-08_ai_agent_approval_workflow"
  },
  {
    "combinedId": "P4-GOV-P-09_devsecops_ci_cd_pipeline",
    "diagramName": "Enterprise DevSecOps Polyrepo CI/CD Pipeline Flow",
    "intentKeywords": "devsecops, ci cd, cloud build, artifact registry, binary authorization, sast, dast, sbom, gitops, argocd",
    "goldenExamplePayload": "Build a DevSecOps CI/CD pipeline showing Developer Git push triggering Cloud Build, SonarQube SAST, Trivy container vulnerability scan, Cosign Binary Authorization signing, and ArgoCD progressive canary rollout to GKE.",
    "uiCardDesc": "Cloud Build polyrepo CI/CD, Artifact Registry, Trivy/SonarQube SAST, Binary Authorization, and GKE continuous deployment.",
    "phase": "Phase 4",
    "phaseName": "Phase 4: Technical Deep-Dive & Security Validation",
    "phaseGoal": "Cloud Build polyrepo CI/CD, Artifact Registry, Trivy/SonarQube SAST, Binary Authorization, and GKE continuous deployment.",
    "domain": "Strategy & Governance",
    "abstractionLevel": "Physical",
    "stackLayer": "Layer 4 (Operations)",
    "notationStandard": "Polyrepo GitOps Pipeline Flow",
    "defaultDirection": "LR",
    "coreGcpServices": [
      "Cloud Build",
      "Artifact Registry",
      "Binary Authorization",
      "Cloud Deploy",
      "GKE Autopilot",
      "Secret Manager",
      "Cloud KMS"
    ],
    "generativeBuildSequence": "1. Draw Source Code Stage (GitHub / Cloud Source Repos). 2. Draw Build & Test Stage (Cloud Build, Unit Tests). 3. Draw Security Quality Gate (SAST, DAST, SBOM, Binary Auth). 4. Draw Promotion & Deployment Stage (Cloud Deploy -> GKE Staging -> Canary Prod).",
    "advancedPromptLogic": "Enforce zero unsigned container deployments by verifying Binary Authorization attestation verification.",
    "requiredUserInputs": "System scope, component names, protocols",
    "prerequisite": "Initial architectural intent",
    "primaryPersonas": "Creator: Lead DevSecOps Engineer | Consumers: Software Engineering Teams | Stakeholders: VP Engineering / Platform Lead",
    "salesStage": "Security Review / ARB Sign-Off",
    "lifecyclePhase": "Design → Verification",
    "liveRailwayLink": "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=P4-GOV-P-09_devsecops_ci_cd_pipeline"
  },
  {
    "combinedId": "P4-APP-L-10_enterprise_event_driven_eda_mesh",
    "diagramName": "Event-Driven Architecture (EDA) & Kafka Event Mesh",
    "intentKeywords": "eda, event driven, event mesh, kafka, pubsub, avro schema registry, dlq, dead letter queue, event sourcing",
    "goldenExamplePayload": "Design an Enterprise Event-Driven EDA Mesh with Cloud Pub/Sub and Managed Kafka brokers, Confluent Schema Registry, 3 consumer microservice groups, and automated Dead-Letter Queue (DLQ) retry routing.",
    "uiCardDesc": "Event broker mesh (Pub/Sub / Kafka), schema registry, event-driven consumer microservices, and DLQ handling.",
    "phase": "Phase 4",
    "phaseName": "Phase 4: Technical Deep-Dive & Security Validation",
    "phaseGoal": "Event broker mesh (Pub/Sub / Kafka), schema registry, event-driven consumer microservices, and DLQ handling.",
    "domain": "App & Integration",
    "abstractionLevel": "Logical",
    "stackLayer": "Layer 4 (Application)",
    "notationStandard": "Distributed Event Mesh & DLQ Matrix",
    "defaultDirection": "LR",
    "coreGcpServices": [
      "Cloud Pub/Sub",
      "Managed Service for Apache Kafka",
      "Cloud Run",
      "Cloud Tasks",
      "Cloud Bigtable",
      "BigQuery"
    ],
    "generativeBuildSequence": "1. Draw Event Producers on left. 2. Draw Central Event Mesh (Partitioned Topics, Schema Registry). 3. Draw Decoupled Consumer Groups. 4. Draw DLQ Error & Poison Pill Handling container. 5. Route analytical copies to BigQuery.",
    "advancedPromptLogic": "If [Exactly-Once Semantics] requested: Add Deduplication IDs and idempotent database transaction writes.",
    "requiredUserInputs": "System scope, component names, protocols",
    "prerequisite": "Initial architectural intent",
    "primaryPersonas": "Creator: Principal Integration Architect | Consumers: Backend & Event Stream Developers | Stakeholders: Application Architecture Lead",
    "salesStage": "Security Review / ARB Sign-Off",
    "lifecyclePhase": "Design → Verification",
    "liveRailwayLink": "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=P4-APP-L-10_enterprise_event_driven_eda_mesh"
  },
  {
    "combinedId": "P4-APP-L-11_serverless_eda_architecture",
    "diagramName": "Serverless EDA Architecture",
    "intentKeywords": "serverless eda, cloud run, eventarc, pubsub, gemini predictive engine, bigtable, looker reporting",
    "goldenExamplePayload": "Build a Serverless EDA architecture on GCP where GE App clients and IoT Sensors trigger Cloud Run ingestion via Eventarc, stream to Cloud Bigtable, run Gemini Predictive Maintenance, and push alerts via Cloud Tasks.",
    "uiCardDesc": "Cloud Run serverless microservices, Eventarc triggers, Cloud Tasks queues, and Firestore / MemoryStore cache.",
    "phase": "Phase 4",
    "phaseName": "Phase 4: Technical Deep-Dive & Security Validation",
    "phaseGoal": "Cloud Run serverless microservices, Eventarc triggers, Cloud Tasks queues, and Firestore / MemoryStore cache.",
    "domain": "App & Integration",
    "abstractionLevel": "Logical",
    "stackLayer": "Layer 4 (Application)",
    "notationStandard": "Serverless Microservice Flow",
    "defaultDirection": "LR",
    "coreGcpServices": [
      "Cloud Run",
      "Eventarc",
      "Cloud Pub/Sub",
      "Cloud Tasks",
      "Cloud Bigtable",
      "Vertex AI Gemini Platform",
      "BigQuery",
      "Looker Studio"
    ],
    "generativeBuildSequence": "1. Draw Ingestion Edge (GE App Mobile, IoT Sensors). 2. Draw Serverless Processing Hub (Eventarc -> Cloud Run Microservices). 3. Draw Real-Time Bigtable & Gemini AI Analytics. 4. Draw Outbound Async Action Queues (Cloud Tasks -> Notifications).",
    "advancedPromptLogic": "Ensure 100% density with GE App mobile triggers, time-series telemetry, and sub-100ms processing SLAs.",
    "requiredUserInputs": "System scope, component names, protocols",
    "prerequisite": "Initial architectural intent",
    "primaryPersonas": "Creator: Principal Serverless Architect | Consumers: Cloud Native Developers | Stakeholders: Head of Cloud Engineering",
    "salesStage": "Security Review / ARB Sign-Off",
    "lifecyclePhase": "Design → Verification",
    "liveRailwayLink": "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=P4-APP-L-11_serverless_eda_architecture"
  },
  {
    "combinedId": "P4-DAT-P-12_multimodal_ingestion_flow",
    "diagramName": "Agentic Multi-Modal Ingestion Flow",
    "intentKeywords": "multimodal ingestion, document ai, pdf parsing, speech to text, video intelligence, embeddings, vector lake",
    "goldenExamplePayload": "Design an Agentic Multi-Modal Ingestion Pipeline on GCP processing PDFs via Document AI, audio via Speech-to-Text, and video via Video Intelligence into GCS Bronze Lake, generating text-embedding-004 vectors for BigQuery BigLake.",
    "uiCardDesc": "Physical ingestion of raw PDFs, FASTQ omics streams, Document AI extraction, GCS Bronze Lake, and BigQuery loading.",
    "phase": "Phase 4",
    "phaseName": "Phase 4: Technical Deep-Dive & Security Validation",
    "phaseGoal": "Physical ingestion of raw PDFs, FASTQ omics streams, Document AI extraction, GCS Bronze Lake, and BigQuery loading.",
    "domain": "Data & Analytics",
    "abstractionLevel": "Physical",
    "stackLayer": "Layer 4 (Operations)",
    "notationStandard": "Multi-Modal Ingestion Pipeline",
    "defaultDirection": "LR",
    "coreGcpServices": [
      "Cloud Storage",
      "Document AI",
      "Speech-to-Text",
      "Vertex AI Embeddings",
      "BigQuery BigLake",
      "Cloud Dataflow",
      "Gemini 3.7 Flash"
    ],
    "generativeBuildSequence": "1. Draw Raw Multi-Modal Ingress (PDF, Audio, Video, Sensor). 2. Draw Multi-Modal AI Extraction Processors. 3. Draw Chunking & Embedding Generation Tier. 4. Write to BigQuery BigLake Vector Index and Looker Audit Dashboard.",
    "advancedPromptLogic": "If [High-Volume Batch OCR] requested: Add Cloud Tasks distribution and Document AI batch processing pools.",
    "requiredUserInputs": "System scope, component names, protocols",
    "prerequisite": "Initial architectural intent",
    "primaryPersonas": "Creator: Lead Data Pipeline Architect | Consumers: AI / ML Engineers | Stakeholders: Chief Data Architect",
    "salesStage": "Security Review / ARB Sign-Off",
    "lifecyclePhase": "Design → Verification",
    "liveRailwayLink": "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=P4-DAT-P-12_multimodal_ingestion_flow"
  },
  {
    "combinedId": "P4-DAT-P-13_real_time_streaming_analytics",
    "diagramName": "Real-Time Streaming Analytics & Telemetry Pipeline",
    "intentKeywords": "streaming analytics, pubsub, dataflow, apache beam, sliding window, bigquery bi engine, real time dashboard",
    "goldenExamplePayload": "Build a Real-Time Streaming Analytics Pipeline on GCP ingesting 100k msg/sec from Pub/Sub, processing sliding window aggregations in Dataflow Beam, and visualizing sub-second KPI updates in Looker.",
    "uiCardDesc": "High-throughput Cloud Pub/Sub stream ingestion, Cloud Dataflow (Apache Beam) exact-once windowing, and BigQuery BI engine.",
    "phase": "Phase 4",
    "phaseName": "Phase 4: Technical Deep-Dive & Security Validation",
    "phaseGoal": "High-throughput Cloud Pub/Sub stream ingestion, Cloud Dataflow (Apache Beam) exact-once windowing, and BigQuery BI engine.",
    "domain": "Data & Analytics",
    "abstractionLevel": "Physical",
    "stackLayer": "Layer 4 (Operations)",
    "notationStandard": "Real-Time Stream Processing Flow",
    "defaultDirection": "LR",
    "coreGcpServices": [
      "Cloud Pub/Sub",
      "Cloud Dataflow (Apache Beam)",
      "BigQuery BI Engine",
      "Cloud Bigtable",
      "Looker Studio",
      "Cloud Monitoring"
    ],
    "generativeBuildSequence": "1. Draw Edge IoT / App Stream Ingress. 2. Draw Cloud Pub/Sub Buffer. 3. Draw Dataflow Pipeline with Sliding Windows and ML Anomaly Scoring. 4. Sink to BigQuery for SQL analytics and Bigtable for low-latency lookups.",
    "advancedPromptLogic": "Enforce exact-once processing semantics and dead-letter queue (DLQ) error isolation.",
    "requiredUserInputs": "System scope, component names, protocols",
    "prerequisite": "Initial architectural intent",
    "primaryPersonas": "Creator: Principal Streaming Architect | Consumers: Data Engineers & Analytics Teams | Stakeholders: Head of Data Engineering",
    "salesStage": "Security Review / ARB Sign-Off",
    "lifecyclePhase": "Design → Verification",
    "liveRailwayLink": "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=P4-DAT-P-13_real_time_streaming_analytics"
  },
  {
    "combinedId": "P5-APP-L-01_six_rs_migration_matrix",
    "diagramName": "6Rs Migration Disposition Matrix",
    "intentKeywords": "6rs, migration matrix, rehost, replatform, refactor, retain, retire, repurchase, cloud disposition",
    "goldenExamplePayload": "Generate a 6Rs Migration Disposition Matrix mapping 50 enterprise workloads across Business Value vs Technical Feasibility into Rehost (Compute Engine), Replatform (Cloud SQL), Refactor (GKE), and Retire buckets.",
    "uiCardDesc": "6Rs cloud migration disposition matrix: Rehost, Refactor, Rearchitect, Replatform, Retain, Retire evaluation framework.",
    "phase": "Phase 5",
    "phaseName": "Phase 5: Transition Planning & Operational Readiness",
    "phaseGoal": "6Rs cloud migration disposition matrix: Rehost, Refactor, Rearchitect, Replatform, Retain, Retire evaluation framework.",
    "domain": "App & Integration",
    "abstractionLevel": "Logical",
    "stackLayer": "Layer 4 (Application)",
    "notationStandard": "6Rs Migration & Portfolio Matrix",
    "defaultDirection": "LR",
    "coreGcpServices": [
      "Migrate for Compute Engine",
      "Database Migration Service (DMS)",
      "GKE Autopilot",
      "Cloud SQL",
      "Cloud Monitoring"
    ],
    "generativeBuildSequence": "1. Draw Legacy Workload Inventory box. 2. Draw Multi-Criteria Assessment Decision Logic (Value vs Effort). 3. Draw 6 Destination Columns: Rehost, Replatform, Refactor, Repurchase, Retain, Retire. 4. Summarize target cloud cost savings.",
    "advancedPromptLogic": "Include GCAF Cost Optimization feedback loops and wave migration priority tags (Wave 1, 2, 3).",
    "requiredUserInputs": "System scope, component names, protocols",
    "prerequisite": "Initial architectural intent",
    "primaryPersonas": "Creator: Principal Cloud Migration Architect | Consumers: Migration PMO & Engineering Leads | Stakeholders: CIO / Cloud Transformation Steering Committee",
    "salesStage": "Implementation & Handoff",
    "lifecyclePhase": "Operations → Maintenance",
    "liveRailwayLink": "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=P5-APP-L-01_six_rs_migration_matrix"
  },
  {
    "combinedId": "P5-SEC-P-02_enterprise_sre_observability",
    "diagramName": "Enterprise SRE & Observability Architecture",
    "intentKeywords": "sre, observability, opentelemetry, cloud monitoring, cloud trace, error budget, sli, slo, pagerduty",
    "goldenExamplePayload": "Build an Enterprise SRE Observability architecture on GCP with OpenTelemetry Collector agents on GKE, Cloud Monitoring dashboards, Error Budget SLI/SLO tracking, Cloud Trace distributed tracing, and automated PagerDuty paging.",
    "uiCardDesc": "OpenTelemetry collectors, Cloud Monitoring SLI/SLO error budgets, Cloud Trace, and PagerDuty escalation policies.",
    "phase": "Phase 5",
    "phaseName": "Phase 5: Transition Planning & Operational Readiness",
    "phaseGoal": "OpenTelemetry collectors, Cloud Monitoring SLI/SLO error budgets, Cloud Trace, and PagerDuty escalation policies.",
    "domain": "Cloud Infra Security",
    "abstractionLevel": "Physical",
    "stackLayer": "Layer 4 (Operations)",
    "notationStandard": "SRE Observability & Incident Command",
    "defaultDirection": "LR",
    "coreGcpServices": [
      "Cloud Monitoring",
      "Cloud Logging",
      "Cloud Trace",
      "Cloud Profiler",
      "Google SecOps Chronicle",
      "PagerDuty Integration"
    ],
    "generativeBuildSequence": "1. Draw GKE & Serverless Workload Tier with OpenTelemetry Sidecars. 2. Draw Unified Telemetry Collector Mesh. 3. Draw SRE Control Plane (SLI/SLO Error Budget Engine, Trace Analyzer). 4. Draw Incident Alerting & Automated Remediation Runbooks.",
    "advancedPromptLogic": "Include SecOps Chronicle threat telemetry correlation for unified SOC & SRE monitoring.",
    "requiredUserInputs": "System scope, component names, protocols",
    "prerequisite": "Initial architectural intent",
    "primaryPersonas": "Creator: Principal Site Reliability Engineer (SRE) | Consumers: NOC, SRE & DevSecOps Teams | Stakeholders: VP Engineering / Head of SRE",
    "salesStage": "Implementation & Handoff",
    "lifecyclePhase": "Operations → Maintenance",
    "liveRailwayLink": "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=P5-SEC-P-02_enterprise_sre_observability"
  },
  {
    "combinedId": "P5-GOV-P-03_golive_warroom_runbook",
    "diagramName": "Go-Live Cutover & War Room Runbook",
    "intentKeywords": "go-live, cutover, war room, runbook, rollback plan, t-24h, dns cutover, release management",
    "goldenExamplePayload": "Generate a Go-Live Cutover War Room Runbook diagram detailing T-24h Pre-Flight checks, T-0 DNS Failover and Database Sync, and T+48h Post-Cutover telemetry monitoring with explicit Go/No-Go decision gates.",
    "uiCardDesc": "Enterprise Cutover War Room, T-24h to T+48h operational timeline, rollback criteria, and live executive command center.",
    "phase": "Phase 5",
    "phaseName": "Phase 5: Transition Planning & Operational Readiness",
    "phaseGoal": "Enterprise Cutover War Room, T-24h to T+48h operational timeline, rollback criteria, and live executive command center.",
    "domain": "Strategy & Governance",
    "abstractionLevel": "Physical",
    "stackLayer": "Layer 4 (Operations)",
    "notationStandard": "War Room Operational Playbook",
    "defaultDirection": "LR",
    "coreGcpServices": [
      "Cloud DNS",
      "Cloud Load Balancing",
      "Database Migration Service",
      "Cloud Monitoring",
      "Cloud Logging",
      "Slack / PagerDuty Integration"
    ],
    "generativeBuildSequence": "1. Draw War Room Command Center with Commander, Lead SRE, and CISO personas. 2. Draw T-24h to T+48h Chronological Timeline. 3. Draw Go/No-Go Decision Gate with Rollback Trigger Criteria. 4. Draw Live Verification Dashboard.",
    "advancedPromptLogic": "Include automated rollback trigger thresholds (e.g. Error Rate > 0.5% for 3 consecutive minutes).",
    "requiredUserInputs": "System scope, component names, protocols",
    "prerequisite": "Initial architectural intent",
    "primaryPersonas": "Creator: Release Lead / Cutover Commander | Consumers: War Room SREs & Support Staff | Stakeholders: CIO, VP Engineering, Business Unit Heads",
    "salesStage": "Implementation & Handoff",
    "lifecyclePhase": "Operations → Maintenance",
    "liveRailwayLink": "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=P5-GOV-P-03_golive_warroom_runbook"
  },
  {
    "combinedId": "P5-GOV-L-04_incident_triage_swimlane",
    "diagramName": "Incident Triage & SRE Escalation Swimlane",
    "intentKeywords": "incident response, triage, escalation, swimlanes, on-call, alert routing, rca, pagerduty",
    "goldenExamplePayload": "Design a 3-tier SRE Incident Triage Swimlane on GCP with L1 Gemini Cloud Assist RCA, L2 Cloud Workflows auto-remediation, L3 PagerDuty War Room escalation, and BigQuery incident post-mortem ledger.",
    "uiCardDesc": "3-tier SRE incident triage swimlane: L1 Alerting & Gemini RCA -> L2 Auto-Remediation -> L3 War Room bridge.",
    "phase": "Phase 5",
    "phaseName": "Phase 5: Transition Planning & Operational Readiness",
    "phaseGoal": "3-tier SRE incident triage swimlane: L1 Alerting & Gemini RCA -> L2 Auto-Remediation -> L3 War Room bridge.",
    "domain": "Strategy & Governance",
    "abstractionLevel": "Logical",
    "stackLayer": "Layer 4 (Application)",
    "notationStandard": "3-Tier SRE Incident Triage Swimlane",
    "defaultDirection": "LR",
    "coreGcpServices": [
      "Cloud Monitoring",
      "Gemini Cloud Assist RCA",
      "Cloud Workflows",
      "Cloud Pub/Sub",
      "PagerDuty",
      "BigQuery Incident Ledger"
    ],
    "generativeBuildSequence": "1. Draw L1 Automated Telemetry & Gemini Assist RCA tier. 2. Draw L2 Auto-Remediation & Runbook Execution tier. 3. Draw L3 Incident Commander War Room bridge tier. 4. Draw Post-Incident Review & BigQuery Dossier.",
    "advancedPromptLogic": "If [Critical Infrastructure] requested: Inject automated canary drain, DNS traffic diversion via Cloud DNS, and PagerDuty priority override.",
    "requiredUserInputs": "System scope, component names, protocols",
    "prerequisite": "Initial architectural intent",
    "primaryPersonas": "Creator: Incident Commander / Lead SRE | Consumers: NOC & On-Call Engineers | Stakeholders: VP Reliability / Head of Infrastructure",
    "salesStage": "Implementation & Handoff",
    "lifecyclePhase": "Operations → Maintenance",
    "liveRailwayLink": "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=P5-GOV-L-04_incident_triage_swimlane"
  },
  {
    "combinedId": "P5-AI-L-05_llm_capacity_quota_management",
    "diagramName": "Comprehensive Topology for LLM Capacity Quota Management",
    "intentKeywords": "capacity quota, llm rate limiting, tpm rpm limits, token bucket, redis rate limiter, vertex ai quota",
    "goldenExamplePayload": "Build an LLM Capacity and Quota Management architecture on GCP featuring Apigee AI Gateway rate limiting, Redis Token Bucket cache, multi-region Vertex AI quotas, and dynamic client prioritization.",
    "uiCardDesc": "Multi-region managed GKE inference clusters, Redis distributed rate-limiting, and Looker FinOps Cost Dashboards.",
    "phase": "Phase 5",
    "phaseName": "Phase 5: Transition Planning & Operational Readiness",
    "phaseGoal": "Multi-region managed GKE inference clusters, Redis distributed rate-limiting, and Looker FinOps Cost Dashboards.",
    "domain": "AI Agentic & LLMOps",
    "abstractionLevel": "Logical",
    "stackLayer": "Layer 3 (Complex)",
    "notationStandard": "Dynamic Quota & Rate-Limiter Topology",
    "defaultDirection": "LR",
    "coreGcpServices": [
      "Apigee API Gateway",
      "Memorystore for Redis",
      "Vertex AI Model Endpoints",
      "Cloud Load Balancing",
      "BigQuery Billing",
      "Looker"
    ],
    "generativeBuildSequence": "1. Draw Client Ingress with priority tiers (Enterprise, Standard, Batch). 2. Draw Apigee Gateway with Redis Distributed Rate Limiter. 3. Draw Multi-Region Vertex AI Inference Quotas (us-central1, europe-west4). 4. Draw Quota Spillover & Queueing tier.",
    "advancedPromptLogic": "Include Token Consumption telemetry streaming into BigQuery for automated unit economics chargeback.",
    "requiredUserInputs": "System scope, component names, protocols",
    "prerequisite": "Initial architectural intent",
    "primaryPersonas": "Creator: Principal FinOps & AI Architect | Consumers: AI Application SREs | Stakeholders: VP Engineering / Head of AI",
    "salesStage": "Implementation & Handoff",
    "lifecyclePhase": "Operations → Maintenance",
    "liveRailwayLink": "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=P5-AI-L-05_llm_capacity_quota_management"
  },
  {
    "combinedId": "P5-AI-L-06_ai_coe_operating_model",
    "diagramName": "AI Center of Excellence (CoE) Operating Model",
    "intentKeywords": "ai coe, center of excellence, operating model, ai governance, prompt engineering standards, model selection",
    "goldenExamplePayload": "Create an AI Center of Excellence (CoE) Operating Model diagram showing AI Steering Committee governance, central Platform & Prompt Engineering team, distributed Business Unit squads, and model catalog registry.",
    "uiCardDesc": "AI Center of Excellence operating model governing foundation model token budgets, TPM/RPM limits, and cost controls.",
    "phase": "Phase 5",
    "phaseName": "Phase 5: Transition Planning & Operational Readiness",
    "phaseGoal": "AI Center of Excellence operating model governing foundation model token budgets, TPM/RPM limits, and cost controls.",
    "domain": "Strategy & Governance",
    "abstractionLevel": "Logical",
    "stackLayer": "Layer 4 (Application)",
    "notationStandard": "Organizational Governance Blueprint",
    "defaultDirection": "LR",
    "coreGcpServices": [
      "Vertex AI Agent Builder",
      "Model Registry",
      "BigQuery Analytics",
      "Looker CoE Dashboard",
      "Cloud IAM",
      "Gemini 3.7 Flash"
    ],
    "generativeBuildSequence": "1. Draw Executive AI Steering Committee. 2. Draw Central AI CoE Core Team (Prompt Engineers, AI Security, Platform Leads). 3. Draw Embedded BU AI Squads. 4. Connect with Shared Asset Bus (Central Model Catalog, Prompt Templates, Evaluation Suite).",
    "advancedPromptLogic": "Include RACI responsibility matrix badges (Responsible, Accountable, Consulted, Informed) across governance milestones.",
    "requiredUserInputs": "System scope, component names, protocols",
    "prerequisite": "Initial architectural intent",
    "primaryPersonas": "Creator: Chief AI Strategist / CoE Lead | Consumers: Enterprise AI Stakeholders | Stakeholders: Chief AI Officer / CEO / CTO",
    "salesStage": "Implementation & Handoff",
    "lifecyclePhase": "Operations → Maintenance",
    "liveRailwayLink": "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=P5-AI-L-06_ai_coe_operating_model"
  },
  {
    "combinedId": "P5-AI-P-07_tech_llmops_lifecycle",
    "diagramName": "LLMOps Prompt Configuration Lifecycle",
    "intentKeywords": "llmops, prompt lifecycle, prompt versioning, llm as a judge, mmlu, helm, fine-tuning, rlhf, model registry",
    "goldenExamplePayload": "Build a Continuous LLMOps Lifecycle pipeline on GCP with Git-versioned Prompt YAMLs, automated Vertex AI Model Evaluation, LLM-as-a-Judge scoring, and canary promotion to production endpoints.",
    "uiCardDesc": "Distributed PyTorch/JAX model evaluation, MMLU/HELM benchmarking datasets, LLM-as-a-Judge jury, and promotion gates.",
    "phase": "Phase 5",
    "phaseName": "Phase 5: Transition Planning & Operational Readiness",
    "phaseGoal": "Distributed PyTorch/JAX model evaluation, MMLU/HELM benchmarking datasets, LLM-as-a-Judge jury, and promotion gates.",
    "domain": "AI Agentic & LLMOps",
    "abstractionLevel": "Physical",
    "stackLayer": "Layer 4 (Operations)",
    "notationStandard": "Continuous MLOps Pipeline Flow",
    "defaultDirection": "LR",
    "coreGcpServices": [
      "Vertex AI Pipelines",
      "Vertex AI Model Registry",
      "Cloud Build",
      "Artifact Registry",
      "BigQuery Evaluation Lake",
      "Cloud Deploy",
      "TPU v5e"
    ],
    "generativeBuildSequence": "1. Draw Prompt Authoring & Git Versioning. 2. Draw Automated Evaluation Stage (MMLU benchmark, LLM-as-a-Judge jury). 3. Draw Model Registry Promotion Gate. 4. Draw Production Serving Endpoint with Live Feedback Telemetry.",
    "advancedPromptLogic": "Include automated prompt regression alerts if evaluation accuracy drops below 95%.",
    "requiredUserInputs": "System scope, component names, protocols",
    "prerequisite": "Initial architectural intent",
    "primaryPersonas": "Creator: Principal MLOps Engineer | Consumers: Prompt Engineers & Data Scientists | Stakeholders: Head of AI Engineering",
    "salesStage": "Implementation & Handoff",
    "lifecyclePhase": "Operations → Maintenance",
    "liveRailwayLink": "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=P5-AI-P-07_tech_llmops_lifecycle"
  },
  {
    "combinedId": "P5-DAT-P-08_dataops_anomaly_detection",
    "diagramName": "DataOps & Anomaly Detection Architecture",
    "intentKeywords": "dataops, anomaly detection, data drift, data quality, great expectations, monte carlo, dbt tests",
    "goldenExamplePayload": "Design a DataOps and Anomaly Detection pipeline on GCP using BigQuery ML statistical models to detect data drift, triggering Cloud Functions alerts to Slack and halting broken downstream ETL pipelines.",
    "uiCardDesc": "Cloud Monitoring automated data drift detection, statistical anomaly alarms, schema validation, and Slack SRE alerts.",
    "phase": "Phase 5",
    "phaseName": "Phase 5: Transition Planning & Operational Readiness",
    "phaseGoal": "Cloud Monitoring automated data drift detection, statistical anomaly alarms, schema validation, and Slack SRE alerts.",
    "domain": "Data & Analytics",
    "abstractionLevel": "Physical",
    "stackLayer": "Layer 4 (Operations)",
    "notationStandard": "DataOps Quality Control Plane",
    "defaultDirection": "LR",
    "coreGcpServices": [
      "BigQuery ML",
      "Cloud Dataflow",
      "Cloud Functions",
      "Dataplex Data Quality",
      "Cloud Monitoring",
      "Slack Webhook Integration"
    ],
    "generativeBuildSequence": "1. Draw Ingestion Stream & Lakehouse Tables. 2. Draw Continuous Data Quality Engine (Dataplex Data Quality + BigQuery ML). 3. Draw Anomaly Evaluation Gate. 4. Draw Circuit Breaker Pipeline Halt & SRE Alerting.",
    "advancedPromptLogic": "If [Self-Healing Schema Drift] requested: Add automated column mutation schema evolution handlers.",
    "requiredUserInputs": "System scope, component names, protocols",
    "prerequisite": "Initial architectural intent",
    "primaryPersonas": "Creator: Lead Data Reliability Engineer | Consumers: Data Engineers & Stewards | Stakeholders: Chief Data Officer",
    "salesStage": "Implementation & Handoff",
    "lifecyclePhase": "Operations → Maintenance",
    "liveRailwayLink": "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=P5-DAT-P-08_dataops_anomaly_detection"
  },
  {
    "combinedId": "P5-GOV-P-09_bcdr_multi_region_failover",
    "diagramName": "Multi-Region Active-Active Disaster Recovery",
    "intentKeywords": "disaster recovery, bcdr, multi-region, active active, active passive, pilot light, cloud dns failover, rto rpo",
    "goldenExamplePayload": "Build a Google Cloud Well-Architected Multi-Region Disaster Recovery blueprint with Cloud Armor Global Load Balancer, Active Region us-east1, Pilot Light Standby us-west1, cross-region Cloud SQL async replication, and Dual-Region GCS.",
    "uiCardDesc": "Active-Passive multi-region DR with Cloud DNS health routing, Cloud Spanner/SQL cross-region replication, and automated RTO/RPO failover.",
    "phase": "Phase 5",
    "phaseName": "Phase 5: Transition Planning & Operational Readiness",
    "phaseGoal": "Active-Passive multi-region DR with Cloud DNS health routing, Cloud Spanner/SQL cross-region replication, and automated RTO/RPO failover.",
    "domain": "Cloud Infra Security",
    "abstractionLevel": "Physical",
    "stackLayer": "Layer 4 (Operations)",
    "notationStandard": "Active-Active Multi-Region Mesh",
    "defaultDirection": "LR",
    "coreGcpServices": [
      "Global L7 HTTPS Load Balancing",
      "Cloud Armor WAF",
      "Cloud SQL HA with Cross-Region Replica",
      "Cloud Spanner",
      "Cloud Storage Dual-Region",
      "Cloud DNS"
    ],
    "generativeBuildSequence": "1. Draw Top Global Traffic Layer (Cloud DNS, Global Anycast LB, Cloud Armor). 2. Draw Left Container: Active Region (us-east1 Compute & DB). 3. Draw Right Container: Standby Region (us-west1 Compute & Replica DB). 4. Connect cross-region asynchronous data sync lines. 5. Annotate RTO 15m / RPO 1m targets.",
    "advancedPromptLogic": "Include 90% compute cost savings callout during standby pilot light state.",
    "requiredUserInputs": "System scope, component names, protocols",
    "prerequisite": "Initial architectural intent",
    "primaryPersonas": "Creator: Principal Cloud DR Architect | Consumers: SREs & Business Continuity Leads | Stakeholders: CISO / Risk Management Committee",
    "salesStage": "Implementation & Handoff",
    "lifecyclePhase": "Operations → Maintenance",
    "liveRailwayLink": "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=P5-GOV-P-09_bcdr_multi_region_failover"
  },
  {
    "combinedId": "IND-FINTECH-01_IND-FINTECH-03_automated_personalized_financial_advising",
    "diagramName": "Automated Personalized Financial Advising",
    "intentKeywords": "fintech, financial advising, wealth management, document ocr, portfolio generation, dialogflow, pci-dss, sock2",
    "goldenExamplePayload": "Create a Google Cloud FinTech solution architecture for Automated Personalized Financial Advising with GE Fintech Assistant app, Gemini 3.7 Pro Vision tax document parser, Dialogflow CX chat agent, and Looker portfolio analytics.",
    "uiCardDesc": "Google Cloud Fintech Solution: Automated personalized financial advising with GE Fintech Assistant, Gemini 3.7 Pro Vision OCR, and Looker analytics.",
    "phase": "Phase 6",
    "phaseName": "Phase 6: Industry Specialized Solutions",
    "phaseGoal": "Google Cloud Fintech Solution: Automated personalized financial advising with GE Fintech Assistant, Gemini 3.7 Pro Vision OCR, and Looker analytics.",
    "domain": "Industry",
    "abstractionLevel": "Industry",
    "stackLayer": "Layer 4 (Application)",
    "notationStandard": "Multi-Tier FinTech Solution Topology",
    "defaultDirection": "LR",
    "coreGcpServices": [
      "GE Fintech Assistant App",
      "Firebase Auth",
      "Cloud Storage",
      "BigQuery",
      "Cloud SQL",
      "Vertex AI Gemini 3.7 Pro Vision",
      "Dialogflow CX",
      "Looker"
    ],
    "generativeBuildSequence": "1. Draw Customer & Advisor Ingress (GE Fintech Assistant App, Web Banking). 2. Draw Secure Ingestion & Document Vault (GCS, Firebase Auth, Cloud KMS). 3. Draw AI Advisory Intelligence Core (Gemini Pro Vision OCR, Gemini Strategy Synthesis, Dialogflow CX). 4. Draw Analytics & Compliance Cockpit.",
    "advancedPromptLogic": "Enforce PCI-DSS tokenization boundaries and sub-second portfolio advice rendering.",
    "requiredUserInputs": "System scope, component names, protocols",
    "prerequisite": "Initial architectural intent",
    "primaryPersonas": "Creator: Principal FinTech Architect | Consumers: Wealth Management Developers | Stakeholders: Chief Risk Officer / Head of Wealth",
    "salesStage": "Industry Solution Pitch",
    "lifecyclePhase": "Design → Production",
    "liveRailwayLink": "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=IND-FINTECH-01_IND-FINTECH-03_automated_personalized_financial_advising"
  },
  {
    "combinedId": "IND-MFG-02_ge_equipment_optimization_gemini",
    "diagramName": "GE Equipment Optimization & Gemini AI Agents",
    "intentKeywords": "manufacturing, industrial iot, equipment optimization, mde, predictive maintenance, digital twin, gemini agents",
    "goldenExamplePayload": "Build a Google Cloud Manufacturing blueprint for GE Industrial Equipment Optimization with Manufacturing Data Engine (MDE), Vertex AI Gemini Anomaly Detection Agent, and Looker Operational Cockpit.",
    "uiCardDesc": "GE Equipment telemetry, Manufacturing Data Engine (MDE), Vertex AI Orchestration, Gemini Multimodal Anomaly Detection, and Looker Cockpit.",
    "phase": "Phase 6",
    "phaseName": "Phase 6: Industry Specialized Solutions",
    "phaseGoal": "GE Equipment telemetry, Manufacturing Data Engine (MDE), Vertex AI Orchestration, Gemini Multimodal Anomaly Detection, and Looker Cockpit.",
    "domain": "Industry",
    "abstractionLevel": "Industry",
    "stackLayer": "Layer 4 (Application)",
    "notationStandard": "Industrial IoT & Closed-Loop Agent Architecture",
    "defaultDirection": "LR",
    "coreGcpServices": [
      "Manufacturing Data Engine (MDE)",
      "Cloud Pub/Sub",
      "Cloud Bigtable",
      "Vertex AI Agent Builder",
      "Gemini 3.7 Flash",
      "Looker Studio"
    ],
    "generativeBuildSequence": "1. Draw Industrial Factory Floor (Turbines, CNC Machines, Sensors). 2. Draw Manufacturing Data Engine (MDE) Ingestion Fabric. 3. Draw Gemini Predictive Maintenance Reasoning Agents. 4. Draw Looker Operational Cockpit with Actionable Dispatch Buttons.",
    "advancedPromptLogic": "Include zero unplanned downtime SLA tags and automated technician work-order dispatch triggers.",
    "requiredUserInputs": "System scope, component names, protocols",
    "prerequisite": "Initial architectural intent",
    "primaryPersonas": "Creator: Principal Industrial Architect | Consumers: Plant Reliability Engineers | Stakeholders: VP Manufacturing Operations",
    "salesStage": "Industry Solution Pitch",
    "lifecyclePhase": "Design → Production",
    "liveRailwayLink": "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=IND-MFG-02_ge_equipment_optimization_gemini"
  },
  {
    "combinedId": "IND-PHARMA-03_IND-PHARMA-01_pharma_genomics_pipeline",
    "diagramName": "Pharma-Specific Genomics & Drug Discovery Pipeline with Agentic AI",
    "intentKeywords": "pharma, genomics, drug discovery, alphafold, variant calling, fastq, gatk, bioinformatics, tpu clusters",
    "goldenExamplePayload": "Design a Google Native Pharma Genomics Pipeline on GCP with AlphaFold Pro protein folding, GKE TPU slices for variant calling, Gemini Drug Discovery models, and CMEK-encrypted omics lakehouse.",
    "uiCardDesc": "AlphaFold Pro Differentiable Protein Design, GKE TPU clusters, Gemini drug-discovery models, and BigQuery omics analytics.",
    "phase": "Phase 6",
    "phaseName": "Phase 6: Industry Specialized Solutions",
    "phaseGoal": "AlphaFold Pro Differentiable Protein Design, GKE TPU clusters, Gemini drug-discovery models, and BigQuery omics analytics.",
    "domain": "Industry",
    "abstractionLevel": "Industry",
    "stackLayer": "Layer 4 (Application)",
    "notationStandard": "Bioinformatics Pipeline & TPU Cluster Mesh",
    "defaultDirection": "LR",
    "coreGcpServices": [
      "Cloud Storage",
      "GKE with Cloud TPUs (v5p)",
      "Vertex AI AlphaFold",
      "BigQuery Omics",
      "Cloud KMS CMEK",
      "Transitive PSC"
    ],
    "generativeBuildSequence": "1. Draw On-Premises Omics Data Lake (Illumina Sequencers, FASTQ files). 2. Draw GKE TPU Compute Grid running GATK variant calling and AlphaFold Pro. 3. Draw Gemini Drug Discovery Synthesis Models. 4. Draw BigQuery Omics Analytics Lake with CMEK encryption.",
    "advancedPromptLogic": "Enforce 21 CFR Part 11 electronic records compliance and transitive PSC isolation.",
    "requiredUserInputs": "System scope, component names, protocols",
    "prerequisite": "Initial architectural intent",
    "primaryPersonas": "Creator: Lead Bioinformatics Architect | Consumers: Drug Discovery Researchers | Stakeholders: Chief Scientific Officer / VP Research",
    "salesStage": "Industry Solution Pitch",
    "lifecyclePhase": "Design → Production",
    "liveRailwayLink": "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=IND-PHARMA-03_IND-PHARMA-01_pharma_genomics_pipeline"
  },
  {
    "combinedId": "IND-RETAIL-04_omnichannel_ecommerce_retail",
    "diagramName": "OmniChannel Intelligent E-Commerce Commerce Platform",
    "intentKeywords": "retail, ecommerce, omnichannel, vertex ai search for retail, personalization, product recommendations, inventory sync",
    "goldenExamplePayload": "Build an OmniChannel Intelligent E-Commerce Platform with Cloud CDN, Vertex AI Search for Retail recommendations, Cloud Spanner global inventory sync, and AlloyDB AI personalized checkout.",
    "uiCardDesc": "Cloud CDN, Cloud Run Microservices, Vertex AI Search for Retail, AlloyDB pgvector, Cloud Spanner, and BigQuery Analytics.",
    "phase": "Phase 6",
    "phaseName": "Phase 6: Industry Specialized Solutions",
    "phaseGoal": "Cloud CDN, Cloud Run Microservices, Vertex AI Search for Retail, AlloyDB pgvector, Cloud Spanner, and BigQuery Analytics.",
    "domain": "Industry",
    "abstractionLevel": "Industry",
    "stackLayer": "Layer 4 (Application)",
    "notationStandard": "OmniChannel Retail Solution Topology",
    "defaultDirection": "LR",
    "coreGcpServices": [
      "Cloud CDN",
      "Cloud Run",
      "Vertex AI Search for Retail",
      "Cloud Spanner",
      "AlloyDB for PostgreSQL",
      "BigQuery",
      "Looker Studio",
      "Gemini 3.7 Flash"
    ],
    "generativeBuildSequence": "1. Draw Shopper Ingress (Mobile App, Web Storefront, In-Store POS). 2. Draw Edge CDN & Personalization Tier (Vertex AI Search for Retail). 3. Draw Transaction Core (Cloud Spanner globally consistent inventory). 4. Draw BigQuery Customer 360 Analytics.",
    "advancedPromptLogic": "Include sub-100ms personalized catalog search SLAs and multi-region failover resilience.",
    "requiredUserInputs": "System scope, component names, protocols",
    "prerequisite": "Initial architectural intent",
    "primaryPersonas": "Creator: Principal Retail Architect | Consumers: E-Commerce App Developers | Stakeholders: Chief Digital Officer / Head of E-Commerce",
    "salesStage": "Industry Solution Pitch",
    "lifecyclePhase": "Design → Production",
    "liveRailwayLink": "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=IND-RETAIL-04_omnichannel_ecommerce_retail"
  },
  {
    "combinedId": "IND-MFG-05_smart_manufacturing_iot",
    "diagramName": "Smart Factory Industry 4.0 IoT & Predictive Maintenance",
    "intentKeywords": "smart factory, industry 4.0, iot edge, google distributed cloud edge, predictive maintenance, oee, scada",
    "goldenExamplePayload": "Design a Smart Factory Industry 4.0 IoT architecture with Google Distributed Cloud (GDC) Edge on-premise gateways, Cloud Pub/Sub, Bigtable time-series store, and Vertex AI predictive maintenance algorithms.",
    "uiCardDesc": "GDC Edge sensor aggregation, Cloud Dataflow, Cloud Bigtable, BigQuery, and Vertex AI predictive maintenance.",
    "phase": "Phase 6",
    "phaseName": "Phase 6: Industry Specialized Solutions",
    "phaseGoal": "GDC Edge sensor aggregation, Cloud Dataflow, Cloud Bigtable, BigQuery, and Vertex AI predictive maintenance.",
    "domain": "Industry",
    "abstractionLevel": "Industry",
    "stackLayer": "Layer 4 (Application)",
    "notationStandard": "Smart Factory Edge-to-Cloud Mesh",
    "defaultDirection": "LR",
    "coreGcpServices": [
      "Google Distributed Cloud (GDC) Edge",
      "Cloud Pub/Sub",
      "Cloud Dataflow",
      "Cloud Bigtable",
      "Vertex AI ML",
      "Looker Studio",
      "Gemini 3.7 Flash"
    ],
    "generativeBuildSequence": "1. Draw Smart Factory Floor with GDC Edge appliances. 2. Draw Edge-to-Cloud Pub/Sub Ingestion Bridge. 3. Draw Real-Time Bigtable Time-Series Analytics. 4. Draw Vertex AI Predictive Maintenance Model scoring machine health.",
    "advancedPromptLogic": "Include Overall Equipment Effectiveness (OEE) metrics dashboard and automated maintenance ticket creation.",
    "requiredUserInputs": "System scope, component names, protocols",
    "prerequisite": "Initial architectural intent",
    "primaryPersonas": "Creator: Principal IoT Solutions Architect | Consumers: Factory Automation Engineers | Stakeholders: VP Plant Operations / Manufacturing CIO",
    "salesStage": "Industry Solution Pitch",
    "lifecyclePhase": "Design → Production",
    "liveRailwayLink": "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=IND-MFG-05_smart_manufacturing_iot"
  },
  {
    "combinedId": "IND-HR-06_workforce_talent_ai",
    "diagramName": "WorkforceAI Enterprise HR Talent & People Intelligence",
    "intentKeywords": "hr talent, workforce ai, resume parsing, candidate matching, skills vector, people analytics, unbiased hiring",
    "goldenExamplePayload": "Build a WorkforceAI Enterprise HR Platform on GCP with Document AI resume parsing, AlloyDB pgvector skills matching, Gemini 3.7 candidate scoring with bias mitigation guardrails, and Looker Executive Talent Cockpit.",
    "uiCardDesc": "Document AI resume parsing, skills gap vector embeddings in AlloyDB pgvector, Gemini candidate evaluation, and Looker Talent Cockpit.",
    "phase": "Phase 6",
    "phaseName": "Phase 6: Industry Specialized Solutions",
    "phaseGoal": "Document AI resume parsing, skills gap vector embeddings in AlloyDB pgvector, Gemini candidate evaluation, and Looker Talent Cockpit.",
    "domain": "Industry",
    "abstractionLevel": "Industry",
    "stackLayer": "Layer 4 (Application)",
    "notationStandard": "Enterprise HR Talent Intelligence Mesh",
    "defaultDirection": "LR",
    "coreGcpServices": [
      "Document AI",
      "AlloyDB with pgvector",
      "Vertex AI Gemini 3.7 Flash",
      "Model Armor (Bias Redaction)",
      "BigQuery",
      "Looker Studio"
    ],
    "generativeBuildSequence": "1. Draw Applicant & Employee Ingress (ATS, LinkedIn, Internal HRIS). 2. Draw Document AI Resume & Review Parser. 3. Draw Skills Vector Embedding Engine in AlloyDB. 4. Draw Gemini Candidate Matcher with Bias Guardrails. 5. Draw Looker Talent Dashboard.",
    "advancedPromptLogic": "Enforce strict PII anonymization before LLM scoring to eliminate candidate demographic bias.",
    "requiredUserInputs": "System scope, component names, protocols",
    "prerequisite": "Initial architectural intent",
    "primaryPersonas": "Creator: Lead HR Tech Solutions Architect | Consumers: HR Application Developers | Stakeholders: Chief People Officer / VP Talent Acquisition",
    "salesStage": "Industry Solution Pitch",
    "lifecyclePhase": "Design → Production",
    "liveRailwayLink": "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=IND-HR-06_workforce_talent_ai"
  },
  {
    "combinedId": "IND-HEALTH-07_IND-HEALTH-01_healthcare_fhir_hl7",
    "diagramName": "Google Cloud Healthcare & Life Sciences FHIR / HL7 Pipeline",
    "intentKeywords": "healthcare, fhir, hl7, cloud healthcare api, dicom, dlp phi, omop cdm, gemini clinical, hipaa baa",
    "goldenExamplePayload": "Design a Google Cloud Healthcare & Life Sciences FHIR / HL7 pipeline with Cloud Healthcare API, DLP 18 HIPAA PHI de-identification, OMOP BigQuery lakehouse, and Gemini 3.7 clinical insights.",
    "uiCardDesc": "HIPAA-compliant clinical platform featuring Cloud Healthcare API (HL7v2/FHIR R4/DICOM), DLP PHI de-identification, and OMOP lakehouse.",
    "phase": "Phase 6",
    "phaseName": "Phase 6: Industry Specialized Solutions",
    "phaseGoal": "HIPAA-compliant clinical platform featuring Cloud Healthcare API (HL7v2/FHIR R4/DICOM), DLP PHI de-identification, and OMOP lakehouse.",
    "domain": "Industry",
    "abstractionLevel": "Industry",
    "stackLayer": "Layer 4 (Application)",
    "notationStandard": "Healthcare Interoperability Architecture Standard",
    "defaultDirection": "LR",
    "coreGcpServices": [
      "Cloud Healthcare API",
      "HL7v2 Store & FHIR R4 Store",
      "Sensitive Data Protection (DLP)",
      "Cloud KMS HSM CMEK",
      "Gemini 3.7 Clinical Reasoner",
      "BigQuery OMOP CDM",
      "Looker Clinical Cockpit"
    ],
    "generativeBuildSequence": "1. Hospital EHR & Medical Devices (HL7v2, FHIR R4, DICOM). 2. Cloud Healthcare API & DLP 18 HIPAA PHI De-Identification. 3. Vertex AI & Gemini 3.7 Clinical Reasoner. 4. OMOP CDM BigQuery Lakehouse & Physician Cockpit.",
    "advancedPromptLogic": "If [Medical Imaging AI] requested: Add DICOM PACS store, Vertex AI Medical Vision model for CT/X-Ray pre-reads, and radiologist sign-off queue.",
    "requiredUserInputs": "System scope, component names, protocols",
    "prerequisite": "Initial architectural intent",
    "primaryPersonas": "Creator: Chief Healthcare AI Architect | Consumers: BioInformatics Engineers & Clinical Informaticists | Stakeholders: CMO / Chief Medical Officer",
    "salesStage": "Industry Solution Pitch",
    "lifecyclePhase": "Design → Production",
    "liveRailwayLink": "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=IND-HEALTH-07_IND-HEALTH-01_healthcare_fhir_hl7"
  },
  {
    "combinedId": "ARCH-C4-01_c4_system_context_container",
    "diagramName": "C4 System Context & Container Model",
    "intentKeywords": "c4 model, system context, container diagram, software architecture, boundary definition, architectural review",
    "goldenExamplePayload": "Generate a C4 System Context and Container Model for an Enterprise Platform showing External Users, Single-Page App Container, API Gateway Container, Microservice Containers, and Database Tier.",
    "uiCardDesc": "C4 Model Level 1 Context and Level 2 Container mapping showing external actors, authentication boundaries, microservices, and databases.",
    "phase": "Phase 7",
    "phaseName": "Phase 7: Universal Architecture Standards",
    "phaseGoal": "C4 Model Level 1 Context and Level 2 Container mapping showing external actors, authentication boundaries, microservices, and databases.",
    "domain": "App & Integration",
    "abstractionLevel": "Logical",
    "stackLayer": "Layer 4 (Application)",
    "notationStandard": "C4 Model Standard (Context & Container)",
    "defaultDirection": "TD",
    "coreGcpServices": [
      "Cloud CDN",
      "Cloud Run Microservices",
      "Apigee API Gateway",
      "Cloud SQL",
      "Cloud Storage",
      "Secret Manager"
    ],
    "generativeBuildSequence": "1. Draw External Actors on periphery (Users, External Banking Systems). 2. Draw Enterprise System Boundary. 3. Draw Internal Containers (SPA Frontend, Backend API, Message Queue, Database). 4. Annotate protocol relationships (HTTPS/JSON, gRPC).",
    "advancedPromptLogic": "Enforce strict C4 coloring: Blue (#1168BD) for internal system/containers, Grey (#999999) for external systems.",
    "requiredUserInputs": "System scope, component names, protocols",
    "prerequisite": "Initial architectural intent",
    "primaryPersonas": "Creator: Enterprise Software Architect | Consumers: Full-Stack Engineers & Reviewers | Stakeholders: Architecture Review Board (ARB)",
    "salesStage": "Enterprise Architecture Review",
    "lifecyclePhase": "Design → Build",
    "liveRailwayLink": "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=ARCH-C4-01_c4_system_context_container"
  },
  {
    "combinedId": "ARCH-C4-02_ARCH-C4-03_c4_component_lld",
    "diagramName": "C4 Level 3 Component Diagram & Microservice LLD",
    "intentKeywords": "c4 component, c4 level 3, low level design, lld, microservice architecture, rest controller, domain service, repository pattern",
    "goldenExamplePayload": "Design a C4 Level 3 Component Diagram for a payment microservice featuring Ingress Controllers, Auth Interceptors, SAGA Domain Services, Repositories, Redis Cache, and Cloud DBs powered by Gemini 3.7 Flash.",
    "uiCardDesc": "Detailed container internal architecture: REST controllers, JWT auth interceptors, SAGA domain services, repositories, and outbox poller.",
    "phase": "Phase 7",
    "phaseName": "Phase 7: Universal Architecture Standards",
    "phaseGoal": "Detailed container internal architecture: REST controllers, JWT auth interceptors, SAGA domain services, repositories, and outbox poller.",
    "domain": "App & Integration",
    "abstractionLevel": "Physical",
    "stackLayer": "Layer 4 (Operations)",
    "notationStandard": "C4 Model Level 3 Component Standard",
    "defaultDirection": "TD",
    "coreGcpServices": [
      "Cloud Run Microservices",
      "JWT Auth Interceptor",
      "SAGA Domain Service",
      "Outbox Table Poller",
      "AlloyDB PostgreSQL",
      "Gemini 3.7 Flash API",
      "Cloud Pub/Sub"
    ],
    "generativeBuildSequence": "1. Container Boundary frame. 2. Ingress Controllers & Middleware (REST, gRPC, JWT Auth). 3. Core Domain Services (SAGA Fulfillment, Dynamic Pricing). 4. Persistence & Repositories (Postgres, Redis, Outbox). 5. Cloud DBs.",
    "advancedPromptLogic": "If [High Concurrency] requested: Add Redis distributed lock manager (Redlock), connection pool sizing, and circuit breaker patterns.",
    "requiredUserInputs": "System scope, component names, protocols",
    "prerequisite": "Initial architectural intent",
    "primaryPersonas": "Creator: Lead Software Architect | Consumers: Backend Developers & Tech Leads | Stakeholders: Engineering Managers / Head of Engineering",
    "salesStage": "Enterprise Architecture Review",
    "lifecyclePhase": "Design → Build",
    "liveRailwayLink": "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=ARCH-C4-02_ARCH-C4-03_c4_component_lld"
  },
  {
    "combinedId": "ARCH-BPMN-03_ARCH-BPMN-01_bpmn_process_workflow",
    "diagramName": "BPMN 2.0 Business Process & Autonomous Workflow",
    "intentKeywords": "bpmn, bpmn 2.0, business process, user task, service task, xor gateway, swimlane process, claims workflow",
    "goldenExamplePayload": "Design a BPMN 2.0 business process workflow with User Task submission, Document AI OCR service task, Gemini 3.7 Flash fraud scoring, XOR branching gateway, and SAP ERP posting.",
    "uiCardDesc": "BPMN 2.0 standard process map featuring customer start/end events, user tasks, Gemini 3.7 Flash service tasks, and XOR gateways.",
    "phase": "Phase 7",
    "phaseName": "Phase 7: Universal Architecture Standards",
    "phaseGoal": "BPMN 2.0 standard process map featuring customer start/end events, user tasks, Gemini 3.7 Flash service tasks, and XOR gateways.",
    "domain": "Strategy & Governance",
    "abstractionLevel": "Logical",
    "stackLayer": "Layer 4 (Application)",
    "notationStandard": "BPMN 2.0 Standard (OMG Certified)",
    "defaultDirection": "LR",
    "coreGcpServices": [
      "BPMN 2.0 Engine",
      "Document AI OCR",
      "Gemini 3.7 Flash Service Task",
      "Cloud Tasks Dispatcher",
      "SAP ERP Gateway"
    ],
    "generativeBuildSequence": "1. BPMN Pool & 3 Swimlanes (User Persona, AI Orchestrator, ERP Backend). 2. Start Event & User Submit Task. 3. Document AI & Gemini Service Tasks. 4. XOR Decision Gateway (High/Low Risk). 5. SAP Post & End Event.",
    "advancedPromptLogic": "If [Timer Boundary Event] requested: Add intermediate catch timer (e.g. 24h SLA timeout) with auto-escalation branch.",
    "requiredUserInputs": "System scope, component names, protocols",
    "prerequisite": "Initial architectural intent",
    "primaryPersonas": "Creator: Business Process Architect | Consumers: Business Analysts & Ops Teams | Stakeholders: COO / Head of Operations",
    "salesStage": "Enterprise Architecture Review",
    "lifecyclePhase": "Design → Build",
    "liveRailwayLink": "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=ARCH-BPMN-03_ARCH-BPMN-01_bpmn_process_workflow"
  },
  {
    "combinedId": "ARCH-SEC-04_ARCH-SEC-01_threat_modeling_stride",
    "diagramName": "STRIDE Zero-Trust Threat Model & Boundary Map",
    "intentKeywords": "stride, threat modeling, attack vector, spoofing, tampering, repudiation, information disclosure, dos, elevation of privilege, model armor",
    "goldenExamplePayload": "Design a STRIDE Threat Model on GCP mapping attack vectors across 4 security zones (Untrusted, DMZ, Sandboxed Compute, Data Enclave) to Cloud Armor, Model Armor, GKE gVisor, and VPC-SC.",
    "uiCardDesc": "STRIDE security analysis mapping threat vectors ([S], [T], [R], [I], [D], [E]) to Google Cloud defenses across 4 security zones.",
    "phase": "Phase 7",
    "phaseName": "Phase 7: Universal Architecture Standards",
    "phaseGoal": "STRIDE security analysis mapping threat vectors ([S], [T], [R], [I], [D], [E]) to Google Cloud defenses across 4 security zones.",
    "domain": "Cloud Infra Security",
    "abstractionLevel": "Physical",
    "stackLayer": "Layer 4 (Operations)",
    "notationStandard": "STRIDE Threat Model & Zero-Trust Boundary Standard",
    "defaultDirection": "LR",
    "coreGcpServices": [
      "Cloud Armor WAF",
      "Google Cloud Model Armor",
      "Identity-Aware Proxy (IAP)",
      "GKE Autopilot (gVisor)",
      "Workload Identity Federation",
      "VPC Service Controls",
      "Cloud KMS HSM"
    ],
    "generativeBuildSequence": "1. 4 Security Zones (Untrusted Zone, DMZ Shield, Sandboxed Compute, Secure Data Enclave). 2. Adversary Threat Actors & STRIDE Vectors ([S],[T],[D]). 3. Perimeter Defenses (Armor, IAP). 4. Trust Boundary (gVisor, [E] Binary Auth). 5. Data Enclave ([I] VPC-SC, KMS HSM).",
    "advancedPromptLogic": "If [AI LLM Specific] requested: Inject OWASP Top 10 for LLMs (Prompt Injection, Insecure Output, Denial of Wallet, Supply Chain Attacks).",
    "requiredUserInputs": "System scope, component names, protocols",
    "prerequisite": "Initial architectural intent",
    "primaryPersonas": "Creator: Chief Information Security Officer (CISO) | Consumers: SecOps Engineers & AppSec Teams | Stakeholders: Board Audit Committee",
    "salesStage": "Enterprise Architecture Review",
    "lifecyclePhase": "Design → Build",
    "liveRailwayLink": "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=ARCH-SEC-04_ARCH-SEC-01_threat_modeling_stride"
  },
  {
    "combinedId": "ARCH-DAT-05_ARCH-DAT-01_data_lineage_provenance",
    "diagramName": "Column-Level Data Lineage & Provenance Graph",
    "intentKeywords": "data lineage, column lineage, provenance, dataplex discovery, dataform, dbt, gold marts, bcbs 239, looker metrics",
    "goldenExamplePayload": "Design a Column-Level Data Lineage graph on Google Cloud tracing raw bronze tables through Dataform silver models to gold fact marts, Looker BI metrics, and Dataplex impact analysis.",
    "uiCardDesc": "End-to-end data lineage tracing from raw bronze tables through Dataform / dbt silver models to curated gold fact/dimension marts.",
    "phase": "Phase 7",
    "phaseName": "Phase 7: Universal Architecture Standards",
    "phaseGoal": "End-to-end data lineage tracing from raw bronze tables through Dataform / dbt silver models to curated gold fact/dimension marts.",
    "domain": "Data & Analytics",
    "abstractionLevel": "Logical",
    "stackLayer": "Layer 2 (Intermediary)",
    "notationStandard": "Data Lineage & Column-Level Provenance Standard",
    "defaultDirection": "LR",
    "coreGcpServices": [
      "BigQuery",
      "Dataform / dbt",
      "Dataplex Lineage Auto-Discovery",
      "Sensitive Data Protection (DLP)",
      "BI Engine In-Memory Cache",
      "Looker Studio",
      "Gemini 3.7 Flash"
    ],
    "generativeBuildSequence": "1. Raw Ingestion Bronze Layer tables with typed schemas. 2. Dataform / dbt Cleaned Silver Layer with SQL formulas. 3. Curated Gold Marts (Fact/Dim tables). 4. Downstream BI Metrics, Gemini RAG, and Dataplex Upstream Impact UI.",
    "advancedPromptLogic": "If [BCBS 239 Banking] requested: Add mathematical provenance hashing, aggregation formula validation, and immutable auditor exports.",
    "requiredUserInputs": "System scope, component names, protocols",
    "prerequisite": "Initial architectural intent",
    "primaryPersonas": "Creator: Lead Data Governance Architect | Consumers: Data Engineers & Analytics Engineers | Stakeholders: External Financial Auditors / CDO",
    "salesStage": "Enterprise Architecture Review",
    "lifecyclePhase": "Design → Build",
    "liveRailwayLink": "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=ARCH-DAT-05_ARCH-DAT-01_data_lineage_provenance"
  },
  {
    "combinedId": "ARCH-MCP-06_ARCH-MCP-02_model_context_protocol_gateway",
    "diagramName": "Model Context Protocol (MCP) Gateway",
    "intentKeywords": "mcp, model context protocol, anthropic mcp, tool gateway, agent tools, standardized context, tool bus",
    "goldenExamplePayload": "Build a Model Context Protocol (MCP) Gateway architecture on GCP decoupling Gemini and Claude models from enterprise tools (PostgreSQL, GitHub, Slack) via normalized JSON-RPC MCP servers.",
    "uiCardDesc": "Multi-source context ingestion, normalized MCP message bus, tool proxies, and actionable tool integration.",
    "phase": "Phase 7",
    "phaseName": "Phase 7: Universal Architecture Standards",
    "phaseGoal": "Multi-source context ingestion, normalized MCP message bus, tool proxies, and actionable tool integration.",
    "domain": "AI Agentic & LLMOps",
    "abstractionLevel": "Logical",
    "stackLayer": "Layer 3 (Complex)",
    "notationStandard": "MCP Gateway & Normalized Tool Bus",
    "defaultDirection": "LR",
    "coreGcpServices": [
      "Cloud Run (MCP Servers)",
      "Secret Manager",
      "Cloud IAM",
      "Vertex AI Agent Builder",
      "Cloud Logging",
      "Pub/Sub",
      "Gemini 3.7 Flash"
    ],
    "generativeBuildSequence": "1. Draw Model Clients on left (Gemini 3.7 Flash, Claude, IDE Agents). 2. Draw Central MCP Context Gateway (Authentication, Tool Discovery, Rate Limiting). 3. Draw Normalized MCP Server Proxies. 4. Draw Downstream Enterprise Resources (Databases, Git, APIs).",
    "advancedPromptLogic": "Include granular tool permission gating and audit logs for all autonomous tool executions.",
    "requiredUserInputs": "System scope, component names, protocols",
    "prerequisite": "Initial architectural intent",
    "primaryPersonas": "Creator: Principal AI Integration Architect | Consumers: AI Application & Tool Developers | Stakeholders: Head of AI Infrastructure",
    "salesStage": "Enterprise Architecture Review",
    "lifecyclePhase": "Design → Build",
    "liveRailwayLink": "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=ARCH-MCP-06_ARCH-MCP-02_model_context_protocol_gateway"
  }
];

export interface BlueprintFilterState {
  phaseName?: string;
  domain?: string;
  abstractionLevel?: string;
  stackLayer?: string;
  defaultDirection?: string;
  salesStage?: string;
  lifecyclePhase?: string;
}

export interface FacetedFilterResult {
  matchingCount: number;
  matchingBlueprints: BlueprintKnowledgeItem[];
  phaseCounts: Record<string, number>;
  domainCounts: Record<string, number>;
  abstractionCounts: Record<string, number>;
  stackLayerCounts: Record<string, number>;
  directionCounts: Record<string, number>;
  salesStageCounts: Record<string, number>;
  lifecycleCounts: Record<string, number>;
}

/**
 * Calculates cascading, bi-directional filter counts across all 7 dimensions
 */
export function getFacetedBlueprintFilters(filters: BlueprintFilterState = {}): FacetedFilterResult {
  const isMatch = (item: BlueprintKnowledgeItem, f: BlueprintFilterState): boolean => {
    if (f.phaseName && f.phaseName !== 'ALL' && item.phaseName !== f.phaseName) return false;
    if (f.domain && f.domain !== 'ALL' && item.domain !== f.domain) return false;
    if (f.abstractionLevel && f.abstractionLevel !== 'ALL' && item.abstractionLevel !== f.abstractionLevel) return false;
    if (f.stackLayer && f.stackLayer !== 'ALL' && item.stackLayer !== f.stackLayer) return false;
    if (f.defaultDirection && f.defaultDirection !== 'ALL' && item.defaultDirection !== f.defaultDirection) return false;
    if (f.salesStage && f.salesStage !== 'ALL' && item.salesStage !== f.salesStage) return false;
    if (f.lifecyclePhase && f.lifecyclePhase !== 'ALL' && item.lifecyclePhase !== f.lifecyclePhase) return false;
    return true;
  };

  const matching = BLUEPRINT_KNOWLEDGE_MATRIX.filter(item => isMatch(item, filters));

  const countBy = (field: keyof BlueprintKnowledgeItem, excludeKey?: keyof BlueprintFilterState): Record<string, number> => {
    const counts: Record<string, number> = {};
    const subFilters = { ...filters };
    if (excludeKey) {
      delete subFilters[excludeKey];
    }
    const subset = BLUEPRINT_KNOWLEDGE_MATRIX.filter(item => isMatch(item, subFilters));
    subset.forEach(item => {
      const val = String(item[field]);
      if (val) counts[val] = (counts[val] || 0) + 1;
    });
    return counts;
  };

  return {
    matchingCount: matching.length,
    matchingBlueprints: matching,
    phaseCounts: countBy('phaseName'),
    domainCounts: countBy('domain'),
    abstractionCounts: countBy('abstractionLevel'),
    stackLayerCounts: countBy('stackLayer'),
    directionCounts: countBy('defaultDirection'),
    salesStageCounts: countBy('salesStage'),
    lifecycleCounts: countBy('lifecyclePhase')
  };
}

const ID_ALIASES: Record<string, string> = {
  'unified_flowchart': 'P1-GOV-C-03_value_stream_map_vsm',
  'governance_state_machine': 'P4-GOV-L-08_ai_agent_approval_workflow',
  'tech_serverless_gcp': 'P4-APP-L-11_serverless_eda_architecture',
  'tech_multi_region_dr': 'P5-GOV-P-09_bcdr_multi_region_failover',
  'hybrid_strangler_transition': 'P1-APP-L-02_hybrid_strangler_fig_transition',
  'mcp_context_gateway': 'ARCH-MCP-06_model_context_protocol_gateway',
  'hub_and_spoke_agent_config': 'P3-AI-L-03_hub_and_spoke_agent_mesh',
  'tech_ai_trism_guardrails': 'P4-GOV-L-07_ai_trism_guardrails',
  'tech_micro_frontends': 'P3-APP-L-08_micro_frontend_architecture',
  'secure_deployment_map': 'P4-SEC-P-01_secure_deployment_topology_map',
  'tech_streaming_analytics': 'P4-DAT-P-13_real_time_streaming_analytics',
  'tech_data_lakehouse_gcp': 'P3-DAT-L-04_gcp_enterprise_data_lakehouse',
  'tech_fintech_payments': 'IND-FINTECH-01_automated_personalized_financial_advising',
  'tech_genomics_clinical': 'IND-PHARMA-03_pharma_genomics_pipeline',
  'tech_supply_chain': 'IND-MFG-02_ge_equipment_optimization_gemini',
  'tech_event_driven_eda': 'P4-APP-L-10_enterprise_event_driven_eda_mesh',
  'tech_c4_system_context': 'ARCH-C4-01_c4_system_context_container',
  'sequence_diagram': 'P3-APP-L-10_multi_agent_sequence_flow',
  'devops_cicd_pipeline': 'P4-GOV-P-09_devsecops_ci_cd_pipeline',
  'conceptual_diagram': 'P3-APP-C-01_total_unified_system_view',
  'unified_system_view': 'P3-APP-C-01_total_unified_system_view',
  'tech_multimodal_ingestion': 'P4-DAT-P-12_multimodal_ingestion_flow',
  'asis_vs_tobe_process_flow': 'P1-GOV-C-04_as_is_vs_to_be_process_flow',
  'hr_talent_ai': 'IND-HR-06_workforce_talent_ai',
  'smart_factory_iot': 'IND-MFG-05_smart_manufacturing_iot',
  'tech_dimensional_erd': 'P3-DAT-L-05_dimensional_data_model_erd',
  'tech_agentic_rag': 'P3-AI-L-02_cognitive_architecture_agentic_rag',
  'agentic_rag': 'P3-AI-L-02_cognitive_architecture_agentic_rag',
  'erd': 'P3-DAT-L-05_dimensional_data_model_erd',
  'tech_landing_zone': 'P4-SEC-P-02_gcp_landing_zone_vpc_map',
  'tech_agent_runtime': 'P4-AI-P-04_enterprise_agent_runtime_platform',
  'tech_agentic_mesh': 'P4-SEC-P-05_hybrid_multicloud_networking',
  'tech_eval_safety': 'P4-GOV-L-06_tech_eval_safety',
  'tech_llm_quota': 'P5-AI-L-05_llm_capacity_quota_management',
  'six_rs_migration_matrix': 'P5-APP-L-01_six_rs_migration_matrix',
  'cloud_finops_chargeback': 'P2-GOV-C-01_cloud_finops_chargeback_model',
  'ai_coe_operating_model': 'P5-AI-L-06_ai_coe_operating_model',
  'logical_ai_config_tenant': 'P3-GOV-L-09_logical_ai_config_tenant',
  'unified_data_governance': 'P3-DAT-C-06_unified_data_governance',
  'dataops_anomaly_detection': 'P5-DAT-P-08_dataops_anomaly_detection',
  'golive_warroom_runbook': 'P5-GOV-P-03_golive_warroom_runbook',
  'enterprise_sre_observability': 'P5-SEC-P-02_enterprise_sre_observability',
  'data_residency_sovereign_map': 'P4-SEC-P-03_data_residency_sovereign_map',
  'federated_iam_sso': 'P3-SEC-L-07_federated_iam_sso'
};

function normalizeStr(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

/**
 * Helper to retrieve full metadata for a blueprint ID (handles canonical IDs, aliases, and fuzzy lookups)
 */
export function getBlueprintMetadataById(id: string): BlueprintKnowledgeItem | null {
  if (!id) return null;
  const cleanId = id.replace(/^arch_/, '').trim().toLowerCase();
  const targetId = ID_ALIASES[cleanId] || cleanId;
  const normTarget = normalizeStr(targetId);

  // 1. Direct Combined ID Match
  const directMatch = BLUEPRINT_KNOWLEDGE_MATRIX.find(item => {
    const itemCombined = item.combinedId.toLowerCase();
    return itemCombined === targetId || normalizeStr(itemCombined) === normTarget;
  });
  if (directMatch) return directMatch;

  // 2. Short code format matching (e.g. p1_bp01, p1-01, p3-bp05)
  const shortCodeMatch = cleanId.match(/^p(\d+)[-_]?(?:bp)?(\d+)/i);
  if (shortCodeMatch) {
    const phaseNum = shortCodeMatch[1];
    const indexNum = parseInt(shortCodeMatch[2], 10);
    const phasePrefix = `Phase ${phaseNum}:`;
    const phaseItems = BLUEPRINT_KNOWLEDGE_MATRIX.filter(item => item.phaseName.startsWith(phasePrefix));
    if (phaseItems[indexNum - 1]) {
      return phaseItems[indexNum - 1];
    }
  }

  // 3. Substring & Slug Match
  const subMatch = BLUEPRINT_KNOWLEDGE_MATRIX.find(item => {
    const itemCombined = item.combinedId.toLowerCase();
    const strippedItem = itemCombined.replace(/^p\d+-[a-z]+-[a-z]-\d+_/, '');
    return itemCombined.includes(targetId) || targetId.includes(strippedItem) || normalizeStr(strippedItem) === normTarget;
  });
  if (subMatch) return subMatch;

  // 4. Name Match
  const nameMatch = BLUEPRINT_KNOWLEDGE_MATRIX.find(item => {
    const nameNorm = normalizeStr(item.diagramName);
    return nameNorm.includes(normTarget) || normTarget.includes(nameNorm);
  });
  return nameMatch || null;
}

export const PHASE_NAME_OPTIONS = [
  'Phase 1: Current State Assessment & Baseline',
  'Phase 2: Business Vision & Strategy Alignment',
  'Phase 3: Target State Logical Architecture',
  'Phase 4: Technical Deep-Dive & Security Validation',
  'Phase 5: Transition Planning & Operational Readiness',
  'Phase 6: Industry Specialized Solutions',
  'Phase 7: Universal Architecture Standards'
];

export const ARCHITECTURE_DOMAIN_OPTIONS = [
  'App & Integration',
  'Data & Analytics',
  'AI Agentic & LLMOps',
  'Cloud Infra Security',
  'Strategy & Governance',
  'Industry'
];

export const ABSTRACTION_LEVEL_OPTIONS = [
  'Conceptual',
  'Logical',
  'Physical',
  'Industry'
];

export const ARCHITECTURAL_STACK_LAYER_OPTIONS = [
  'Layer 1 (Foundation)',
  'Layer 2 (Intermediary)',
  'Layer 3 (Complex)',
  'Layer 4 (Application)',
  'Layer 4 (Operations)'
];

export const DEFAULT_LAYOUT_DIRECTION_OPTIONS = [
  'LR',
  'TD'
];

export const SALES_CYCLE_STAGE_OPTIONS = [
  'Presales Pitch',
  'Executive Workshop',
  'Technical Deep-Dive',
  'Architecture Design / Review',
  'Security Review / ARB Sign-Off',
  'Implementation & Handoff',
  'Industry Solution Pitch',
  'Enterprise Architecture Review'
];

export const LIFECYCLE_PHASE_OPTIONS = [
  'Requirements → Design',
  'Assessment',
  'Planning → Design',
  'Design → Build',
  'Design → Implementation',
  'Design → Verification',
  'Design → Production',
  'Operations → Maintenance'
];
