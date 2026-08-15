/**
 * 🏛️ BLUEPRINT KNOWLEDGE MATRIX & 4-TIER AI GENERATIVE ROUTER
 * Contains the 41 canonical enterprise blueprints structured in 4 generative tiers:
 * Tier 1: Intent & Routing (Combined ID, Name, Keywords, Example Payloads)
 * Tier 2: Architectural Scope & Framing (Phase, Goal, Domain, Abstraction, Stack Layer)
 * Tier 3: The Generative Recipe (Notation, Direction, Core GCP Services, Build Sequence, Overlay Logic)
 * Tier 4: Enterprise Context & Execution (User Inputs, Prerequisites, Personas, Sales Stage, Lifecycle)
 */

export interface BlueprintKnowledgeItem {
  // Tier 1: Intent & Routing
  combinedId: string;
  diagramName: string;
  intentKeywords: string[];
  goldenExamplePayload: string;
  uiCardDesc: string;

  // Tier 2: Architectural Scope & Framing
  phase: string;
  phaseName: string;
  phaseGoal: string;
  domain: string;
  abstractionLevel: 'Conceptual' | 'Logical' | 'Physical' | 'Industry';
  stackLayer: string;

  // Tier 3: The Generative Recipe
  notationStandard: string;
  defaultDirection: 'LR' | 'TD';
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
    combinedId: "P1-APP-L-01_hybrid_strangler_fig_transition",
    diagramName: "Hybrid / Strangler Fig Transition Architecture",
    intentKeywords: ["strangler fig", "hybrid migration", "apigee routing", "on-prem coexistence", "legacy monolith", "cloud interconnect", "vpn backup"],
    goldenExamplePayload: "Design a hybrid strangler fig migration architecture where incoming client requests hit Apigee API Gateway, legacy queries route over 10G Dedicated Interconnect to an on-prem Oracle DB, and modernized services run on GKE with Cloud SQL.",
    uiCardDesc: "Apigee API Gateway intercepting client traffic, routing legacy features to on-prem databases and modern features to GCP GKE.",
    phase: "1",
    phaseName: "Current State Assessment & Baseline",
    phaseGoal: "Document legacy on-prem dependencies, interconnects, and strangler fig facade routing before cutover.",
    domain: "Application Migration",
    abstractionLevel: "Logical",
    stackLayer: "Layer 4 (Application)",
    notationStandard: "Strangler Fig Traffic Facade",
    defaultDirection: "LR",
    coreGcpServices: ["Apigee API Gateway", "Dedicated Cloud Interconnect (10G)", "Cloud HA VPN", "GKE Autopilot", "Cloud SQL for PostgreSQL", "Cloud Monitoring"],
    generativeBuildSequence: "1. Draw On-Premises Datacenter container (Legacy App, SQL DB, Mainframe). 2. Draw GCP VPC container with Apigee Gateway, GKE Microservices, and Cloud SQL. 3. Connect via dual Cloud Interconnect (Active) and Cloud VPN (Backup). 4. Route client requests into Apigee with conditional legacy vs new paths. 5. Add SOC2/HIPAA compliance badges.",
    advancedPromptLogic: "If [High Security] or [Zero-Trust] requested: Add Cloud Armor WAF in front of Apigee, VPC Service Controls perimeters, and TLS 1.3 inspection.",
    requiredUserInputs: "On-Prem Datacenter Inventory, Legacy Monolith Endpoints, Interconnect Bandwidth (10Gbps/100Gbps), Phased Cutover Milestones",
    prerequisite: "- (Foundational)",
    primaryPersonas: "Creator: Discovery Lead / Solutions Arch. | Consumers: Cloud Migration Team | Stakeholders: Legacy App Owners / CTO",
    salesStage: "Presales Pitch",
    lifecyclePhase: "Requirements → Design",
    liveRailwayLink: "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=P1-APP-L-01_hybrid_strangler_fig_transition"
  },
  {
    combinedId: "P1-GOV-C-02_value_stream_map_vsm",
    diagramName: "Enterprise AI Architecture & Delivery Value Stream Map",
    intentKeywords: ["value stream map", "vsm", "lead time", "process time", "automated gates", "ai delivery lifecycle", "agile governance"],
    goldenExamplePayload: "Generate an Enterprise AI Delivery Value Stream Map showing Inception, Data Prep, Model Training, Safety Evaluation, and Deployment with LT/PT metrics and automated quality gates.",
    uiCardDesc: "Enterprise AI delivery value stream measuring lead time, process time, automated quality gates, and process efficiency.",
    phase: "1",
    phaseName: "Current State Assessment & Baseline",
    phaseGoal: "Map cycle times, wait times, automated gates, and process efficiency across the AI delivery lifecycle.",
    domain: "Strategy & Governance",
    abstractionLevel: "Conceptual",
    stackLayer: "Layer 4 (Operations)",
    notationStandard: "Value Stream Map (VSM) Standard",
    defaultDirection: "LR",
    coreGcpServices: ["Vertex AI Pipelines", "Cloud Build", "Artifact Registry", "Cloud Deploy", "Cloud Monitoring", "BigQuery Metrics Export"],
    generativeBuildSequence: "1. Draw horizontal timeline chevron header (Inception -> Ingestion -> Model Prep -> Safety Eval -> Deploy). 2. Add stage cards with LT, PT, and %C&A KPIs. 3. Draw automated quality gate pills between stages. 4. Render bottom timeline showing Total Lead Time vs Processing Time ratio.",
    advancedPromptLogic: "If [Lean Metric Breakdown] requested: Calculate Process Efficiency = (Total Processing Time / Total Lead Time) * 100% and render in executive summary callout.",
    requiredUserInputs: "Delivery Phases, Lead Time (LT) per stage, Process Time (PT), % Complete & Accurate (%C&A), Automation Tooling",
    prerequisite: "- (Foundational)",
    primaryPersonas: "Creator: Lean/Agile Coach / Enterprise Arch. | Consumers: Business Unit Leaders | Stakeholders: Chief AI Officer / VP Engineering",
    salesStage: "Executive Workshop",
    lifecyclePhase: "Assessment",
    liveRailwayLink: "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=P1-GOV-C-02_value_stream_map_vsm"
  },
  {
    combinedId: "P1-GOV-C-03_as_is_vs_to_be_process_flow",
    diagramName: "As-Is vs. To-Be Process & Architecture Flow",
    intentKeywords: ["as-is vs to-be", "modernization roi", "legacy comparison", "before after", "modernization roadmap", "cost reduction"],
    goldenExamplePayload: "Show a split-screen As-Is vs To-Be modernization architecture comparing legacy on-prem overnight batch ETL and manual spreadsheet triage against a real-time Pub/Sub Lakehouse and Gemini Agentic mesh.",
    uiCardDesc: "Top: Manual legacy triage & batch ETL. Bottom: Sub-50ms real-time lakehouse & Gemini Enterprise cognitive architecture with ROI scorecard.",
    phase: "1",
    phaseName: "Current State Assessment & Baseline",
    phaseGoal: "Provide side-by-side executive comparison of manual legacy batch bottlenecks vs. automated real-time GCP AI future state.",
    domain: "Strategy & Governance",
    abstractionLevel: "Conceptual",
    stackLayer: "Layer 4 (Operations)",
    notationStandard: "Split-Screen Architecture Transformation",
    defaultDirection: "TD",
    coreGcpServices: ["Cloud Pub/Sub", "Cloud Dataflow", "BigQuery BigLake", "Vertex AI Agent Builder", "Gemini 3.7 Flash", "Looker Studio", "Cloud Storage"],
    generativeBuildSequence: "1. Draw top red-tinted container: 'As-Is Legacy State' with on-prem monolith, batch cron jobs, and manual handoffs. 2. Draw bottom green-tinted container: 'To-Be GCP Cloud Native State' with real-time stream, Lakehouse, and Gemini Agents. 3. Insert center Transformation Arrow with ROI scorecard (80% Latency Reduction, $1.2M Annual Savings).",
    advancedPromptLogic: "If [Executive Financials] requested: Inject OPEX vs CAPEX comparison breakdown table on right margin.",
    requiredUserInputs: "Legacy Bottlenecks, Target SLA Targets, Estimated Cost Savings (%), Annualized ROI ($), Modernized GCP Services",
    prerequisite: "Target Operating Model",
    primaryPersonas: "Creator: Principal Solutions Architect | Consumers: C-Suite & Board Members | Stakeholders: CIO, CFO, Business Sponsors",
    salesStage: "Presales Pitch / Board Review",
    lifecyclePhase: "Planning → Design",
    liveRailwayLink: "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=P1-GOV-C-03_as_is_vs_to_be_process_flow"
  },
  {
    combinedId: "P3-APP-C-01_total_unified_system_view",
    diagramName: "Total Unified System View",
    intentKeywords: ["unified system view", "total platform", "master blueprint", "panoramic architecture", "enterprise reference model"],
    goldenExamplePayload: "Generate a panoramic Total Unified System View covering Multi-Modal Ingestion, Medallion Lakehouse on BigQuery, Gemini Multi-Agent Mesh, VPC-SC Security Perimeter, and Executive Cockpit.",
    uiCardDesc: "Total integrated architecture consolidating data foundation, AI cognitive lifecycle, VPC network topology, and governance.",
    phase: "3",
    phaseName: "Target State Logical Architecture",
    phaseGoal: "Provide master panoramic enterprise architecture consolidating multi-tier ingestion, cognitive RAG, VPC security perimeters, and governance.",
    domain: "App & Integration",
    abstractionLevel: "Conceptual",
    stackLayer: "Layer 4 (Application)",
    notationStandard: "Panoramic Enterprise Architecture",
    defaultDirection: "TD",
    coreGcpServices: ["Cloud Storage", "Cloud Dataflow", "BigQuery BigLake", "Vertex AI Agent Builder", "Gemini 3.7 Flash", "Cloud Armor", "GKE Autopilot", "Looker"],
    generativeBuildSequence: "1. Draw Ingestion Tier (Batch, Streaming, Multi-Modal). 2. Draw Lakehouse Foundation (Bronze, Silver, Gold BigLake). 3. Draw Cognitive Intelligence Layer (Gemini Pro, Vector Search, Tool Mesh). 4. Wrap with Zero-Trust VPC-SC and Cloud Armor Perimeter. 5. Draw Top Presentation Cockpit.",
    advancedPromptLogic: "If [Zero-Trust High-Density] requested: Add CMEK Cloud KMS keys, Private Service Connect links, and 21 CFR Part 11 audit trails.",
    requiredUserInputs: "Ingestion Sources, Data Lakehouse Sizing, LLM Orchestration Engines, Security VPC Boundaries, Executive Visualizations",
    prerequisite: "Hybrid Strangler Fig Transition",
    primaryPersonas: "Creator: Chief Enterprise Architect | Consumers: All Technical & Business Teams | Stakeholders: CTO, CISO, Chief Data Officer",
    salesStage: "Presales / Master Review",
    lifecyclePhase: "Planning → Design",
    liveRailwayLink: "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=P3-APP-C-01_total_unified_system_view"
  },
  {
    combinedId: "P3-AI-L-02_cognitive_architecture_agentic_rag",
    diagramName: "Cognitive Architecture / Agentic RAG",
    intentKeywords: ["agentic rag", "cognitive architecture", "react loop", "vector search", "semantic embeddings", "knowledge grounding", "mcp tools"],
    goldenExamplePayload: "Build a Cognitive Agentic RAG architecture featuring text-embedding-004 chunking, Vertex AI Vector Search, a 4-stage circular ReAct loop (Thought -> Action -> Observation -> Synthesis), and Gemini Pro reasoning.",
    uiCardDesc: "Multi-agent ReAct orchestration loop (Thought -> Action -> Observation -> Synthesis) with 100% circular ring geometry.",
    phase: "3",
    phaseName: "Target State Logical Architecture",
    phaseGoal: "Map the logical flow of context, vectors, base models, tools, and circular ReAct loops for GenAI apps.",
    domain: "AI Agentic & LLMOps",
    abstractionLevel: "Logical",
    stackLayer: "Layer 3 (Complex)",
    notationStandard: "Tangential ReAct Ring",
    defaultDirection: "TD",
    coreGcpServices: ["Vertex AI Vector Search", "Vertex AI Agent Builder", "Gemini 3.7 Flash", "Cloud Storage", "Model Armor", "Cloud Functions MCP Tools"],
    generativeBuildSequence: "1. Draw Ingestion & Chunking pipeline (GCS -> Document AI -> Embedding Engine). 2. Draw Vector Search & Metadata Store. 3. Build central ReAct circular loop with 4 curved tangential arcs. 4. Attach Model Armor guardrails and external MCP tool calling.",
    advancedPromptLogic: "Enforce 100% smooth curved tangential ring geometry (curved=1) with zero straight diagonal crossing lines.",
    requiredUserInputs: "Unstructured Data Corpus, Embedding Model (text-embedding-004), Vector Store (Vertex Vector Search/pgvector), Agent Tools",
    prerequisite: "Enterprise Agent Platform",
    primaryPersonas: "Creator: Principal AI Architect | Consumers: AI Application Developers | Stakeholders: Head of AI / Product Management",
    salesStage: "Presales / AI Workshop",
    lifecyclePhase: "Design → Prompt Eng.",
    liveRailwayLink: "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=P3-AI-L-02_cognitive_architecture_agentic_rag"
  },
  {
    combinedId: "P4-SEC-P-01_secure_deployment_topology_map",
    diagramName: "Secure Deployment Topology Map",
    intentKeywords: ["secure deployment", "zero trust", "gke autopilot", "cloud armor", "waf", "binary authorization", "cmek kms", "scc", "security topology"],
    goldenExamplePayload: "Generate a production Secure Deployment Topology Map on GCP with Cloud Armor WAF, Private GKE Autopilot cluster, Private Service Connect to Cloud SQL, Cloud KMS CMEK encryption, and Binary Authorization signing.",
    uiCardDesc: "Zero-Trust GCP Network Topology with Cloud Armor WAF, GKE Autopilot, Cloud SQL PSA, Binary Authorization, and CMEK KMS.",
    phase: "4",
    phaseName: "Technical Deep-Dive & Security Validation",
    phaseGoal: "Detail the physical macro security perimeter including Cloud Build CI/CD gating, Binary Authorization, and GKE mTLS VPC.",
    domain: "Cloud Infra Security",
    abstractionLevel: "Physical",
    stackLayer: "Layer 1 (Foundation)",
    notationStandard: "Zero-Trust Physical Network Topology",
    defaultDirection: "TD",
    coreGcpServices: ["Cloud Armor", "GKE Autopilot", "Cloud SQL PSA", "Cloud KMS CMEK", "Artifact Registry", "Binary Authorization", "Security Command Center", "Cloud NAT"],
    generativeBuildSequence: "1. Draw Outer Internet & CDN edge with Cloud Armor WAF. 2. Draw Secure CI/CD Pipeline (Cloud Build -> Artifact Registry -> Binary Auth). 3. Draw Production VPC Perimeter (Private GKE cluster with Istio mTLS 1.3). 4. Draw Private Data Zone (Cloud SQL via PSC, Cloud KMS CMEK). 5. Add SCC threat detection overlay.",
    advancedPromptLogic: "Ensure 100% canvas density, explicit port numbers (443, 8443, 5432), and zero plain-text passwords.",
    requiredUserInputs: "VPC Subnet CIDRs, WAF Rate Limits, Container Registry Security Rules, Cloud KMS Key Ring Names, PSC Endpoints",
    prerequisite: "Workspace Architecture",
    primaryPersonas: "Creator: Principal Cloud Security Architect | Consumers: DevSecOps & Network Engineers | Stakeholders: CISO / Head of Security",
    salesStage: "Security Review / ARB Sign-Off",
    lifecyclePhase: "Design → Build",
    liveRailwayLink: "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=P4-SEC-P-01_secure_deployment_topology_map"
  },
  {
    combinedId: "P4-AI-P-03_tech_agentic_mesh",
    diagramName: "Hybrid Multi-Cloud Networking & Gemini Enterprise",
    intentKeywords: ["multi cloud", "hybrid interconnect", "100g dedicated interconnect", "ncc", "bgp routing", "aws direct connect", "gemini aiops"],
    goldenExamplePayload: "Create a carrier-grade Hybrid Multi-Cloud network topology connecting On-Premises Core (ASN 65001), Google Cloud VPC (ASN 16550) via dual 100G Interconnect, and AWS us-east-1 via Cross-Cloud Interconnect with Network Connectivity Center (NCC) BGP routing.",
    uiCardDesc: "100G Dedicated Interconnect, Partner Interconnect, Cloud VPN, Cross-Cloud Interconnect for AWS, NCC BGP routing, and Gemini AIOps.",
    phase: "4",
    phaseName: "Technical Deep-Dive & Security Validation",
    phaseGoal: "Provide carrier-grade line-rate transit, sub-second BFD failover (300ms), and autonomous Gemini AIOps routing optimization.",
    domain: "Cloud Infra Security",
    abstractionLevel: "Physical",
    stackLayer: "Layer 1 (Foundation)",
    notationStandard: "Multi-Cloud Network Transit Mesh",
    defaultDirection: "TD",
    coreGcpServices: ["Dedicated Cloud Interconnect (100G)", "Network Connectivity Center (NCC)", "Cloud Router", "Cloud VPN", "Cross-Cloud Interconnect", "Gemini Enterprise AIOps"],
    generativeBuildSequence: "1. Draw Left Tier: On-Premises Core Datacenter. 2. Draw Center Tier: Google Cloud VPC with NCC Hub and Cloud Routers. 3. Draw Right Tier: AWS Direct Connect Gateway and VPCs. 4. Draw redundant active-active 100G BGP circuits. 5. Overlay Gemini Enterprise AIOps self-healing brain.",
    advancedPromptLogic: "Enforce sub-second BFD failover (300ms) badges and 100% private RFC 1918 CIDR IP block labels.",
    requiredUserInputs: "BGP Autonomous System Numbers (ASNs), VLAN Attachment IDs, Direct Connect Demarc Bandwidth, Gemini AIOps Telemetry",
    prerequisite: "Secure Deployment Topology Map",
    primaryPersonas: "Creator: Principal Network Architect | Consumers: Multi-Cloud Network Engineers | Stakeholders: VP Infrastructure / CISO",
    salesStage: "Architecture Design / Review",
    lifecyclePhase: "Implementation",
    liveRailwayLink: "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=P4-AI-P-03_tech_agentic_mesh"
  },
  {
    combinedId: "P4-APP-L-08_serverless_eda_architecture",
    diagramName: "Serverless EDA Architecture",
    intentKeywords: ["serverless eda", "cloud run", "eventarc", "pubsub", "gemini predictive engine", "bigtable", "looker reporting"],
    goldenExamplePayload: "Build a Serverless EDA architecture on GCP where Enterprise App clients and IoT Sensors trigger Cloud Run ingestion via Eventarc, stream to Cloud Bigtable, run Gemini Predictive Maintenance, and push alerts via Cloud Tasks.",
    uiCardDesc: "Cloud Run serverless microservices, Eventarc triggers, Cloud Tasks queues, and Firestore / MemoryStore cache.",
    phase: "4",
    phaseName: "Technical Deep-Dive & Security Validation",
    phaseGoal: "Detail serverless trigger flows, queue management, stateless execution, and Enterprise App integration.",
    domain: "App & Integration",
    abstractionLevel: "Logical",
    stackLayer: "Layer 3 (Complex)",
    notationStandard: "Serverless Microservice Flow",
    defaultDirection: "LR",
    coreGcpServices: ["Cloud Run", "Eventarc", "Cloud Pub/Sub", "Cloud Tasks", "Cloud Bigtable", "Vertex AI Gemini Platform", "BigQuery", "Looker Studio"],
    generativeBuildSequence: "1. Draw Ingestion Edge (Enterprise App Mobile, IoT Sensors). 2. Draw Serverless Processing Hub (Eventarc -> Cloud Run Microservices). 3. Draw Real-Time Bigtable & Gemini AI Analytics. 4. Draw Outbound Async Action Queues (Cloud Tasks -> Notifications).",
    advancedPromptLogic: "Ensure 100% density with Enterprise App mobile triggers, time-series telemetry, and sub-100ms processing SLAs.",
    requiredUserInputs: "Event Sources (IoT Sensors, Webhooks), Max Concurrent Cloud Run Instances, Bigtable Table Design, BigQuery ML Models",
    prerequisite: "Total Unified System View",
    primaryPersonas: "Creator: Principal Serverless Architect | Consumers: Cloud Native Developers | Stakeholders: Head of Cloud Engineering",
    salesStage: "Technical Workshop",
    lifecyclePhase: "Design → Implementation",
    liveRailwayLink: "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=P4-APP-L-08_serverless_eda_architecture"
  },
  {
    combinedId: "P4-TECH-M-01_enterprise_multiflow_zerotrust_platform",
    diagramName: "Enterprise Multi-Flow Zero-Trust & Cognitive Platform Architecture",
    intentKeywords: ["multi-flow", "decision diamond", "rhombus", "network flow", "process flow", "dataflow", "zero trust platform", "beyondcorp", "model armor gate", "hitl review"],
    goldenExamplePayload: "Build an Enterprise Multi-Flow Zero-Trust Platform featuring 5 Decision Diamonds (BeyondCorp Posture Check, Cloud Armor WAF, Model Armor AI Safety, Agentic Confidence Gate, and DataOps Circuit Breaker) with explicit Dataflow, Network Flow, Control Flow, and Telemetry wires.",
    uiCardDesc: "Deep Technical Blueprint featuring 5 Decision Diamonds, 4 distinct flow styles (Data, Network, Control, Telemetry), and full-stack GCP zero-trust services.",
    phase: "4",
    phaseName: "Technical Deep-Dive & Security Validation",
    phaseGoal: "Visualize comprehensive multi-flow execution with 5 explicit decision diamonds routing network, process, data, and telemetry traffic.",
    domain: "Zero-Trust & Cognitive Systems",
    abstractionLevel: "Physical",
    stackLayer: "Layer 1 to 4 (Full Stack)",
    notationStandard: "Multi-Flow Zero-Trust & Decision Diamond Topology",
    defaultDirection: "LR",
    coreGcpServices: ["BeyondCorp Enterprise", "Cloud Armor WAF", "Identity-Aware Proxy", "GKE Autopilot", "Istio mTLS 1.3", "Model Armor", "Gemini 3.7 Flash", "Vertex AI Vector Search", "Cloud SQL PSA", "BigQuery BigLake", "Cloud KMS CMEK", "OpenTelemetry"],
    generativeBuildSequence: "1. Draw Top Header & 4-Flow Legend (Data, Network, Control, Telemetry). 2. Draw Tier 1 Ingress with [D1] Device Posture and [D2] WAF Threat Diamonds. 3. Draw Tier 2 Compute Subnet (10.100.1.0/24) with [D3] Model Armor Safety Diamond and Istio mTLS mesh. 4. Draw Tier 3 Cognitive Mesh with [D4] Confidence Interlock Diamond and HITL Review Gate. 5. Draw Tier 4 Secure Data Subnet (10.200.2.0/24) with [D5] DataOps Circuit Breaker Diamond.",
    advancedPromptLogic: "Enforce explicit color-coded wires (Solid Blue for Data, Solid Purple for Network, Dashed Amber for Control, Dotted Green for Telemetry) and solid white background pills on all edge labels.",
    requiredUserInputs: "VPC Subnet CIDRs (10.100.1.0/24, 10.200.2.0/24), FIDO2 Attestation Criteria, WAF Rate Limits, Model Confidence Threshold (≥90%), Data Anomaly Threshold (>5%)",
    prerequisite: "Secure Deployment Topology Map",
    primaryPersonas: "Creator: Chief Security & AI Systems Architect | Consumers: SecOps, Network & Data Engineers | Stakeholders: CISO / CTO / VP Engineering",
    salesStage: "Master Architecture Review / Technical Deep-Dive",
    lifecyclePhase: "Design → Build",
    liveRailwayLink: "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=P4-TECH-M-01_enterprise_multiflow_zerotrust_platform"
  },
  {
    combinedId: "P1-APP-L-01_legacy_data_dependency_map",
    diagramName: "Legacy Data Dependency Map",
    intentKeywords: ["legacy data dependency", "spaghetti dependencies", "stratozone", "migration center", "database coupling", "shadow it"],
    goldenExamplePayload: "Design a legacy data dependency map visualizing on-prem SQL databases, ETL scripts, and shadow IT extracts discovered by StratoZone for wave planning in Migration Center.",
    uiCardDesc: "Maps current on-prem legacy spaghetti dependencies, database coupling, and Migration Center wave planning.",
    phase: "1",
    phaseName: "Current State Assessment & Baseline",
    phaseGoal: "Document legacy on-premises database dependencies, shadow IT extracts, and migration wave priorities.",
    domain: "Application Migration",
    abstractionLevel: "Logical",
    stackLayer: "Layer 4 (Application)",
    notationStandard: "Discovery Dependency Mapping",
    defaultDirection: "LR",
    coreGcpServices: ["StratoZone Discovery Probe", "Migration Center", "Cloud Run Strangler Proxy", "BigQuery Lakehouse", "Gemini 3.7 Flash"],
    generativeBuildSequence: "1. Draw On-Prem Core Monolith & Shadow DBs. 2. Draw Discovery & Coupling Analysis tier with StratoZone Probe. 3. Draw Migration Wave Classification. 4. Draw Modernized Target Architecture with Strangler Proxy.",
    advancedPromptLogic: "If [Mainframe] requested: Add z/OS DB2, CICS connectors, and MQ series queues in Tier 1.",
    requiredUserInputs: "On-Prem DB Inventory, ETL Schedule Table, StratoZone Probe IP, Wave Cutover Priority (Wave 1/2/3)",
    prerequisite: "None (Entry Discovery Phase)",
    primaryPersonas: "Creator: Cloud Migration Architect | Consumers: App Modernization Team | Stakeholders: VP Infrastructure",
    salesStage: "Discovery / Pre-Sales Assessment",
    lifecyclePhase: "Discover → Assess",
    liveRailwayLink: "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=P1-APP-L-01_legacy_data_dependency_map"
  },
  {
    combinedId: "P4-SEC-P-02_gcp_landing_zone_vpc",
    diagramName: "GCP Landing Zone & Shared VPC Network Fabric",
    intentKeywords: ["landing zone", "shared vpc", "hub and spoke", "cloud interconnect", "private service connect", "cloud nat", "ngfw"],
    goldenExamplePayload: "Design a GCP Landing Zone & Hub-and-Spoke Shared VPC Network Fabric with 100G Dedicated Interconnect, Cloud Router BGP, PSC Endpoints, GKE subnets, and Cloud NGFW.",
    uiCardDesc: "Production-grade Hub-and-Spoke Shared VPC network fabric with 100G Interconnect, PSC, and VPC-SC isolation.",
    phase: "4",
    phaseName: "Technical Deep-Dive & Security Validation",
    phaseGoal: "Establish enterprise-grade multi-region network foundation with central governance, zero-trust perimeter, and private transit.",
    domain: "Cloud Infrastructure & Networking",
    abstractionLevel: "Physical",
    stackLayer: "Layer 1 to 3 (Infrastructure & Network)",
    notationStandard: "Network Topology & Hub-and-Spoke Shared VPC",
    defaultDirection: "LR",
    coreGcpServices: ["Shared VPC Host Project", "Dedicated Interconnect 100G", "Cloud Router BGP", "Private Service Connect", "Cloud NGFW", "Cloud NAT HA", "VPC Service Controls"],
    generativeBuildSequence: "1. Draw Hybrid Ingress (Dedicated Interconnect, Cloud VPN). 2. Draw Central Hub Host Project (Cloud NGFW, PSC Hub). 3. Draw Production Workload Spoke (GKE Subnet, Cloud Run Subnet). 4. Draw Managed Services Enclave (BigQuery, Vertex AI, Cloud Storage).",
    advancedPromptLogic: "If [Multi-Region] requested: Add us-east4 secondary VPC peering, cross-region NCC spokes, and BGP failover routes.",
    requiredUserInputs: "VPC CIDR Ranges (10.0.0.0/16 Hub, 10.10.0.0/16 Spoke), Interconnect ASN (64512), PSC Endpoint IP (10.50.0.5)",
    prerequisite: "Foundation IAM & Organization Hierarchy",
    primaryPersonas: "Creator: Principal Network Architect | Consumers: SecOps & Cloud Ops | Stakeholders: CISO / VP Infrastructure",
    salesStage: "Technical Deep-Dive / PoC",
    lifecyclePhase: "Design → Build",
    liveRailwayLink: "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=P4-SEC-P-02_gcp_landing_zone_vpc"
  },
  {
    combinedId: "P4-AI-P-03_enterprise_agent_runtime",
    diagramName: "Enterprise Agent Runtime Platform",
    intentKeywords: ["agent runtime", "gke autopilot", "model armor", "mcp gateway", "tpu v5e", "sandboxed compute", "agentic mesh"],
    goldenExamplePayload: "Design an Enterprise Agent Runtime Platform on GKE Autopilot with Agent Gateway, MCP tool worker pods, Model Armor interceptor, and Vertex AI TPU v5e serving.",
    uiCardDesc: "Physical sandboxed compute runtime on GKE Autopilot with Agent Gateway, MCP worker pods, Model Armor, and Vertex AI TPU serving.",
    phase: "4",
    phaseName: "Technical Deep-Dive & Security Validation",
    phaseGoal: "Provide enterprise-grade compute isolation, sub-second tool execution, and prompt security for agentic systems.",
    domain: "AI & Cognitive Systems",
    abstractionLevel: "Physical",
    stackLayer: "Layer 2 to 4 (Compute & AI Layer)",
    notationStandard: "Containerized Agent Runtime Topology",
    defaultDirection: "LR",
    coreGcpServices: ["GKE Autopilot (gVisor)", "Model Armor", "Vertex AI TPU v5e", "MCP Gateway", "Memorystore Redis", "Gemini 3.7 Flash", "Cloud Logging"],
    generativeBuildSequence: "1. Draw Ingress LB & Cloud Armor. 2. Draw Agent Gateway & Model Armor real-time prompt interceptor. 3. Draw GKE Autopilot Sandboxed Workers (MCP Tool Pods, ephemeral SSDs). 4. Draw Vertex AI TPU v5e serving and BigQuery telemetry.",
    advancedPromptLogic: "If [High Security] requested: Enforce gVisor kernel isolation, CMEK HSM for tool scratchpads, and VPC-SC perimeter.",
    requiredUserInputs: "Agent Worker Concurrency (e.g. 500 pods), TPU v5e Slice Count, MCP Tool Server Registry, Context Memory TTL (3600s)",
    prerequisite: "GCP Landing Zone & Shared VPC",
    primaryPersonas: "Creator: AI Systems Architect | Consumers: ML Engineers & Developers | Stakeholders: VP AI / CTO",
    salesStage: "Technical Deep-Dive / Pilot Implementation",
    lifecyclePhase: "Design → Build",
    liveRailwayLink: "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=P4-AI-P-03_enterprise_agent_runtime"
  },
  {
    combinedId: "P4-GOV-L-05_ai_agent_approval_workflow",
    diagramName: "AI Agent Approval Workflow & Human Governance",
    intentKeywords: ["agent approval", "hitl", "human in the loop", "red teaming", "binary authorization", "agent governance", "kms attestation"],
    goldenExamplePayload: "Design an AI Agent Approval Workflow featuring developer IDE submission, automated red-teaming, Legal/Security human review gates, and Binary Authorization KMS attestation.",
    uiCardDesc: "Multi-stage AI agent review, automated red-teaming, Legal/AppSec human approval gates, and Binary Authorization signed serving.",
    phase: "4",
    phaseName: "Technical Deep-Dive & Security Validation",
    phaseGoal: "Enforce rigorous governance and cryptographic attestation before AI agents are authorized to access production tools.",
    domain: "Security, Governance & Risk",
    abstractionLevel: "Logical",
    stackLayer: "Layer 4 (Governance & CI/CD)",
    notationStandard: "Governance Gatekeeper & Attestation Pipeline",
    defaultDirection: "LR",
    coreGcpServices: ["Vertex AI Evaluation", "Binary Authorization", "Cloud KMS HSM", "Cloud Tasks HITL", "GKE Autopilot", "Gemini 3.7 Flash", "Cloud Audit Logs"],
    generativeBuildSequence: "1. Draw Developer IDE & Agent Manifest submission. 2. Draw Automated Security & Red-Teaming stage. 3. Draw Multi-Stakeholder Human Approval stage. 4. Draw Binary Authorization KMS signing and Signed GKE deployment.",
    advancedPromptLogic: "If [Regulated Financial/Health] requested: Require 3-key M-of-N multi-sig attestation from Legal, SecOps, and Compliance.",
    requiredUserInputs: "Agent Manifest Spec, Red-Teaming Benchmark Suites, Human Approver Email Groups, KMS Attestor Key URI",
    prerequisite: "Enterprise Agent Runtime Platform",
    primaryPersonas: "Creator: AI Governance & SecOps Architect | Consumers: DevSecOps & Legal Teams | Stakeholders: Chief Compliance Officer / CISO",
    salesStage: "Security Review / Compliance Sign-Off",
    lifecyclePhase: "Design → Verify",
    liveRailwayLink: "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=P4-GOV-L-05_ai_agent_approval_workflow"
  },
  {
    combinedId: "P5-GOV-L-04_incident_triage_swimlane",
    diagramName: "Incident Triage & Escalation Swimlane",
    intentKeywords: ["incident triage", "sre swimlane", "gemini cloud assist rca", "auto-remediation", "war room", "pagerduty", "post-mortem"],
    goldenExamplePayload: "Design a 3-tier SRE Incident Triage Swimlane featuring L1 Automated Alerting & Gemini Assist RCA, L2 Auto-Remediation Runbooks, and L3 Incident Commander War Room bridge.",
    uiCardDesc: "3-tier SRE incident triage swimlane: L1 Automated Alerting & Gemini Assist RCA, L2 Auto-Remediation, and L3 War Room bridge.",
    phase: "5",
    phaseName: "Migration Execution, Cutover & Day-2 Operations",
    phaseGoal: "Minimize Mean Time to Resolution (MTTR) with automated AI root-cause analysis, runbook remediation, and war room coordination.",
    domain: "Security, Governance & Risk",
    abstractionLevel: "Logical",
    stackLayer: "Layer 4 (Operations & SRE)",
    notationStandard: "SRE Incident Triage Swimlane",
    defaultDirection: "LR",
    coreGcpServices: ["Cloud Monitoring", "Gemini Cloud Assist RCA", "Cloud Workflows Auto-Remediation", "PagerDuty", "BigQuery Incident Ledger", "Cloud Pub/Sub"],
    generativeBuildSequence: "1. Draw L1 Automated Telemetry & Gemini Assist RCA tier. 2. Draw L2 Auto-Remediation & Runbook Execution tier. 3. Draw L3 Incident Commander War Room bridge tier. 4. Draw Post-Incident Review & BigQuery Dossier.",
    advancedPromptLogic: "If [Critical Infrastructure] requested: Inject automated canary drain, DNS traffic diversion via Cloud DNS, and PagerDuty priority override.",
    requiredUserInputs: "SLO Alert Thresholds (Error Rate > 1%), Auto-Remediation Workflow YAML, Incident Commander PagerDuty Schedule",
    prerequisite: "Enterprise SRE Observability Matrix",
    primaryPersonas: "Creator: Lead SRE Architect | Consumers: On-Call Engineers & SecOps | Stakeholders: VP Reliability / CTO",
    salesStage: "Day-2 Operations / Enterprise Support Enablement",
    lifecyclePhase: "Operate → Optimize",
    liveRailwayLink: "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=P5-GOV-L-04_incident_triage_swimlane"
  },
  {
    combinedId: "IND-RETAIL-04_omnichannel_ecommerce_retail",
    diagramName: "OmniChannel Intelligent E-Commerce Platform",
    intentKeywords: ["retail", "ecommerce", "vertex ai search for retail", "alloydb pgvector", "cloud spanner cart", "recommendations ai"],
    goldenExamplePayload: "Design an OmniChannel Intelligent E-Commerce Platform featuring Vertex AI Search for Retail, AlloyDB pgvector Discovery, Cloud Spanner Global Cart, and BigQuery Lakehouse.",
    uiCardDesc: "Enterprise retail platform featuring Vertex AI Search for Retail, AlloyDB pgvector catalog, Cloud Spanner global cart, and BigQuery Lakehouse.",
    phase: "4",
    phaseName: "Technical Deep-Dive & Security Validation",
    phaseGoal: "Maximize conversion rates and deliver sub-second multi-channel shopping experiences with conversational AI and global transactional consistency.",
    domain: "Industry Specialized Solutions",
    abstractionLevel: "Industry",
    stackLayer: "Layer 1 to 4 (Full Stack Retail)",
    notationStandard: "Industry Solution Architecture",
    defaultDirection: "LR",
    coreGcpServices: ["Vertex AI Search for Retail", "AlloyDB pgvector", "Cloud Spanner", "Cloud Run Microservices", "BigQuery Lakehouse", "Gemini 3.7 Flash", "Cloud CDN"],
    generativeBuildSequence: "1. Draw Multi-Channel Shopper Ingress (Web, Mobile, POS). 2. Draw Cloud Run Microservices (Catalog, Cart, Inventory). 3. Draw Vertex AI Retail Search & Gemini AI Personalization. 4. Draw Cloud Spanner Orders & BigQuery Retail Lakehouse.",
    advancedPromptLogic: "If [Black Friday Surge] requested: Add Media CDN edge caching, Cloud Spanner auto-scaler (100k TPS), and Memorystore Redis clusters.",
    requiredUserInputs: "Product SKU Count (e.g. 20M+), Peak Ingress TPS (50k+), POS Integration Protocol, Regional Latency SLA (<20ms)",
    prerequisite: "GCP Landing Zone & Shared VPC",
    primaryPersonas: "Creator: Principal Retail Architect | Consumers: E-Commerce Engineering Team | Stakeholders: Chief Digital Officer / VP E-Commerce",
    salesStage: "Industry Solution Pitch / Technical Deep-Dive",
    lifecyclePhase: "Design → Build",
    liveRailwayLink: "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=IND-RETAIL-04_omnichannel_ecommerce_retail"
  },
  {
    combinedId: "IND-HR-06_workforce_talent_ai",
    diagramName: "WorkforceAI HR Talent & People Intelligence",
    intentKeywords: ["hr talent", "workforce ai", "document ai resume", "skills graph", "blind screening", "gemini candidate matching", "recruiter cockpit"],
    goldenExamplePayload: "Design a WorkforceAI HR Talent & People Intelligence platform featuring Document AI resume parser, AlloyDB pgvector skills graph, Gemini 3.7 Flash candidate matching, and Looker Recruiter Cockpit.",
    uiCardDesc: "Enterprise human capital AI platform featuring Document AI resume parser, AlloyDB pgvector skills graph, Gemini 3.7 Flash matching, and Looker Recruiter Cockpit.",
    phase: "4",
    phaseName: "Technical Deep-Dive & Security Validation",
    phaseGoal: "Streamline talent acquisition, eliminate unconscious bias, and accelerate candidate matching using multimodal AI and vector skill taxonomies.",
    domain: "Industry Specialized Solutions",
    abstractionLevel: "Industry",
    stackLayer: "Layer 2 to 4 (Data & AI)",
    notationStandard: "Industry Solution Architecture",
    defaultDirection: "LR",
    coreGcpServices: ["Document AI Resume Parser", "Cloud DLP Blind Screening", "AlloyDB pgvector Skills Graph", "Gemini 3.7 Flash Matcher", "Looker Recruiter Cockpit", "BigQuery Workforce Lakehouse"],
    generativeBuildSequence: "1. Draw ATS/HRIS Ingestion & Document AI resume parser. 2. Draw AlloyDB pgvector Enterprise Skills Graph. 3. Draw Gemini 3.7 Flash Candidate Matching & Interview Kit Generator. 4. Draw Looker Recruiter Cockpit & Workforce Lakehouse.",
    advancedPromptLogic: "If [EEOC Audit] requested: Inject Cloud DLP blind redaction, Disparate Impact 80% rule scanner, and Cloud Logging immutable audit trail.",
    requiredUserInputs: "ATS Connector (Workday / SuccessFactors), Monthly Resume Volume (100k+), EEOC Redaction Fields, Skills Taxonomy Standard (O*NET)",
    prerequisite: "GCP Landing Zone & Shared VPC",
    primaryPersonas: "Creator: HR Technology & AI Architect | Consumers: Talent Acquisition & HRIS Teams | Stakeholders: Chief People Officer / VP Talent",
    salesStage: "Enterprise HR Solution Review",
    lifecyclePhase: "Design → Build",
    liveRailwayLink: "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=IND-HR-06_workforce_talent_ai"
  },
  {
    combinedId: "IND-MFG-05_smart_manufacturing_iot",
    diagramName: "Smart Factory Industry 4.0 IoT & Predictive Maintenance",
    intentKeywords: ["smart factory", "industry 4.0", "gdc edge", "cloud dataflow", "bigtable timeseries", "anomaly detection", "predictive maintenance", "oee cockpit"],
    goldenExamplePayload: "Design a Smart Factory Industry 4.0 IoT platform featuring GDC Edge Gateway, Cloud Dataflow streaming, Bigtable time-series store, Vertex AI Anomaly Fuser, and Looker OEE Cockpit.",
    uiCardDesc: "Industrial edge-to-cloud IoT platform with GDC Edge, Cloud Dataflow, Bigtable time-series, Vertex AI anomaly detection, and Looker OEE cockpit.",
    phase: "4",
    phaseName: "Technical Deep-Dive & Security Validation",
    phaseGoal: "Maximize Overall Equipment Effectiveness (OEE), eliminate unplanned downtime, and enable closed-loop factory automation.",
    domain: "Industry Specialized Solutions",
    abstractionLevel: "Industry",
    stackLayer: "Layer 1 to 4 (Edge to Cloud)",
    notationStandard: "Industry Solution Architecture",
    defaultDirection: "LR",
    coreGcpServices: ["Google Distributed Cloud (GDC) Edge", "Cloud Pub/Sub IoT", "Cloud Dataflow Streaming", "Cloud Bigtable Time-Series", "Gemini 3.7 Anomaly Fuser", "Looker OEE Cockpit", "SAP PM Integration"],
    generativeBuildSequence: "1. Draw Shop Floor Sensors, PLCs & GDC Edge Gateway. 2. Draw Cloud Pub/Sub & Dataflow Streaming Telemetry Tier. 3. Draw Vertex AI Predictive Maintenance & Gemini Multimodal Anomaly Core. 4. Draw Looker OEE Cockpit & SAP Maintenance Work Orders.",
    advancedPromptLogic: "If [Offline Resilience] requested: Add 72-hour GDC local SSD edge buffer, local Edge TPU anomaly loop, and lossless replay upon reconnect.",
    requiredUserInputs: "Factory PLC Protocols (OPC-UA / Modbus), Sensor Ingestion Throughput (500k events/s), Edge Hardware Specs, SAP PM API Endpoints",
    prerequisite: "GCP Landing Zone & Shared VPC",
    primaryPersonas: "Creator: Chief Industrial IoT Architect | Consumers: Plant Managers & SREs | Stakeholders: VP Manufacturing / Chief Operating Officer",
    salesStage: "Industry 4.0 Executive Briefing",
    lifecyclePhase: "Design → Build",
    liveRailwayLink: "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=IND-MFG-05_smart_manufacturing_iot"
  },
  {
    combinedId: "ARCH-C4-03_c4_component_lld",
    diagramName: "C4 Level 3 Component Diagram & Microservice LLD",
    intentKeywords: ["c4 component", "c4 level 3", "low level design", "lld", "microservice architecture", "rest controller", "domain service", "repository pattern"],
    goldenExamplePayload: "Design a C4 Level 3 Component Diagram for a payment microservice featuring Ingress Controllers, Auth Interceptors, SAGA Domain Services, Repositories, Redis Cache, and Cloud DBs.",
    uiCardDesc: "Detailed container internal architecture: REST controllers, JWT auth interceptors, SAGA domain services, repositories, Redis cache, and cloud DBs.",
    phase: "3",
    phaseName: "Target State Definition & High-Level Architecture",
    phaseGoal: "Provide structural low-level blueprint for engineering teams building containerized microservices.",
    domain: "Software & Application Architecture",
    abstractionLevel: "Physical",
    stackLayer: "Layer 3 to 4 (Software & Microservices)",
    notationStandard: "C4 Model Level 3 Component Standard",
    defaultDirection: "LR",
    coreGcpServices: ["Cloud Run Microservices", "JWT Auth Interceptor", "SAGA Domain Service", "Outbox Table Poller", "AlloyDB PostgreSQL", "Gemini 3.7 Flash API", "Cloud Pub/Sub"],
    generativeBuildSequence: "1. Draw Container Boundary frame. 2. Draw Ingress Controllers & Middleware (REST, gRPC, JWT Auth, Rate Limiter). 3. Draw Core Domain Services (SAGA Fulfillment, Dynamic Pricing, Fraud Scorer). 4. Draw Persistence & Repositories (Postgres Repo, Redis Redlock, Outbox Poller). 5. Draw External Cloud Infrastructure (AlloyDB, Pub/Sub, Vertex AI).",
    advancedPromptLogic: "If [High Concurrency] requested: Add Redis distributed lock manager (Redlock), connection pool sizing, and circuit breaker patterns.",
    requiredUserInputs: "Microservice Name, Language Runtime (Node.js/Go/Java), API Protocols (REST/gRPC), Database Schema & ORM Spec",
    prerequisite: "C4 Level 2 Container Diagram",
    primaryPersonas: "Creator: Lead Software Architect | Consumers: Backend Developers & Tech Leads | Stakeholders: Engineering Manager / VP Engineering",
    salesStage: "Technical Design & Sprint Planning",
    lifecyclePhase: "Design → Build",
    liveRailwayLink: "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=ARCH-C4-03_c4_component_lld"
  },
  {
    combinedId: "ARCH-BPMN-01_bpmn_process_workflow",
    diagramName: "BPMN 2.0 Business Process & Autonomous Workflow",
    intentKeywords: ["bpmn", "bpmn 2.0", "business process", "user task", "service task", "xor gateway", "swimlane process", "claims workflow"],
    goldenExamplePayload: "Design a BPMN 2.0 Business Process map featuring User Submit Task, Document AI OCR Service Task, Gemini 3.7 Flash Fraud Scorer, XOR Risk Gateway, and SAP ERP Posting.",
    uiCardDesc: "BPMN 2.0 standard process map featuring customer start/end events, user tasks, Gemini 3.7 Flash service tasks, XOR gateways, and ERP backend posting.",
    phase: "1",
    phaseName: "Current State Assessment & Baseline",
    phaseGoal: "Model enterprise human-in-the-loop and autonomous agentic workflows using the internationally recognized BPMN 2.0 standard.",
    domain: "Business Strategy & Alignment",
    abstractionLevel: "Logical",
    stackLayer: "Layer 4 (Business Process Layer)",
    notationStandard: "BPMN 2.0 Standard (OMG Certified)",
    defaultDirection: "LR",
    coreGcpServices: ["BPMN 2.0 Engine", "Document AI OCR", "Gemini 3.7 Flash Service Task", "Cloud Tasks Dispatcher", "SAP ERP Gateway"],
    generativeBuildSequence: "1. Draw BPMN Pool and 3 Swimlanes (User Persona, AI Orchestrator, ERP Backend). 2. Draw Start Event (Green Circle) and User Submit Task. 3. Draw Gemini AI Service Tasks and XOR Decision Gateway. 4. Draw Conditional High-Risk vs Low-Risk branches. 5. Draw SAP Posting and End Event (Red Circle).",
    advancedPromptLogic: "If [Timer Boundary Event] requested: Add intermediate catch timer (e.g. 24h SLA timeout) with auto-escalation branch.",
    requiredUserInputs: "Process Name, Participant Swimlanes, Business Rules for Branching, Service Task Integrations",
    prerequisite: "Value Stream Map / As-Is Process Flow",
    primaryPersonas: "Creator: Business Process Architect / Enterprise BPM Consultant | Consumers: Business Analysts & Ops Teams | Stakeholders: Chief Operating Officer / VP Operations",
    salesStage: "Business Strategy & Process Discovery",
    lifecyclePhase: "Discover → Design",
    liveRailwayLink: "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=ARCH-BPMN-01_bpmn_process_workflow"
  },
  {
    combinedId: "ARCH-SEC-01_threat_modeling_stride",
    diagramName: "STRIDE Zero-Trust Threat Model & Boundary Map",
    intentKeywords: ["stride", "threat modeling", "attack vector", "spoofing", "tampering", "repudiation", "information disclosure", "dos", "elevation of privilege", "model armor"],
    goldenExamplePayload: "Design a STRIDE Threat Model mapping attack vectors across 4 security zones (Untrusted, DMZ, Sandboxed Compute, Secure Data Enclave) to Google Cloud defenses.",
    uiCardDesc: "STRIDE security analysis mapping threat vectors to Google Cloud defenses (Cloud Armor, Model Armor, IAP, GKE gVisor, Workload Identity, VPC-SC, Cloud KMS HSM).",
    phase: "4",
    phaseName: "Technical Deep-Dive & Security Validation",
    phaseGoal: "Systematically identify, categorize, and eliminate attack vectors across application, data, and AI model boundaries.",
    domain: "Security, Governance & Risk",
    abstractionLevel: "Physical",
    stackLayer: "Layer 1 to 4 (Full-Stack Security)",
    notationStandard: "STRIDE Threat Model & Zero-Trust Boundary Standard",
    defaultDirection: "LR",
    coreGcpServices: ["Cloud Armor WAF", "Google Cloud Model Armor", "Identity-Aware Proxy", "GKE Autopilot (gVisor)", "Workload Identity Federation", "VPC Service Controls", "Cloud KMS HSM"],
    generativeBuildSequence: "1. Draw 4 Security Zones (Untrusted Zone, DMZ Shield, Sandboxed Compute, Secure Data Enclave). 2. Draw Adversary Threat Actors & STRIDE Attack Vectors ([S], [T], [D]). 3. Draw Perimeter Defenses (Cloud Armor, Model Armor, IAP, [R] Audit Logs). 4. Draw Trust Boundary (gVisor Mesh, Workload Identity, [E] Binary Auth). 5. Draw Data Enclave ([I] VPC-SC, Cloud KMS HSM, Assured Workloads).",
    advancedPromptLogic: "If [AI LLM Specific] requested: Inject OWASP Top 10 for LLMs (Prompt Injection, Insecure Output, Denial of Wallet, Supply Chain Attacks).",
    requiredUserInputs: "Application Threat Boundary, Trust Enclave Boundaries, Data Classification (Confidential / Restricted), Regulatory Framework (FedRAMP/HIPAA)",
    prerequisite: "Secure Deployment Topology Map",
    primaryPersonas: "Creator: Chief Information Security Officer (CISO) & SecOps Lead | Consumers: Security Engineers & AppSec Teams | Stakeholders: Board Audit Committee / CTO",
    salesStage: "Security Review & Risk Assessment",
    lifecyclePhase: "Design → Verify",
    liveRailwayLink: "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=ARCH-SEC-01_threat_modeling_stride"
  },
  {
    combinedId: "ARCH-DAT-01_data_lineage_provenance",
    diagramName: "Column-Level Data Lineage & Provenance Graph",
    intentKeywords: ["data lineage", "column lineage", "provenance", "dataplex discovery", "dataform", "dbt", "gold marts", "bcbs 239", "looker metrics"],
    goldenExamplePayload: "Design a Column-Level Data Lineage & Provenance Graph tracing raw bronze orders through Dataform silver models to gold fact/dimension marts and Looker BI metrics.",
    uiCardDesc: "End-to-end data lineage tracing from raw bronze tables through Dataform/dbt silver models to curated gold marts, Looker BI metrics, and Gemini RAG grounding.",
    phase: "3",
    phaseName: "Target State Definition & High-Level Architecture",
    phaseGoal: "Provide mathematical proof of metric derivation, regulatory audit compliance, and upstream schema change impact analysis.",
    domain: "Data Pipelines & Governance",
    abstractionLevel: "Logical",
    stackLayer: "Layer 2 to 3 (Data & Semantic Layer)",
    notationStandard: "Data Lineage & Column-Level Provenance Standard",
    defaultDirection: "LR",
    coreGcpServices: ["BigQuery", "Dataform / dbt", "Dataplex Lineage Auto-Discovery", "Sensitive Data Protection DLP", "BI Engine In-Memory Cache", "Looker Studio", "Gemini 3.7 Flash"],
    generativeBuildSequence: "1. Draw Raw Ingestion Bronze Layer tables with typed column schemas. 2. Draw Dataform / dbt Cleaned Silver Layer models with SQL transformation formulas. 3. Draw Curated Gold Marts (Fact & Dimension tables). 4. Draw Downstream BI Metrics, Gemini RAG Grounding, and Dataplex Upstream Impact UI.",
    advancedPromptLogic: "If [BCBS 239 Banking] requested: Add mathematical provenance hashing, aggregation formula validation, and immutable auditor exports.",
    requiredUserInputs: "Source Tables & Schema, Dataform / dbt Model Names, Target Metric Definitions, Downstream BI Dashboard URIs",
    prerequisite: "GCP Data Lakehouse Architecture",
    primaryPersonas: "Creator: Lead Data Governance Architect | Consumers: Data Engineers & Analytics Engineers | Stakeholders: Chief Data Officer / External Financial Auditors",
    salesStage: "Data Governance & Compliance Review",
    lifecyclePhase: "Design → Build",
    liveRailwayLink: "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=ARCH-DAT-01_data_lineage_provenance"
  },
  {
    combinedId: "IND-HEALTH-01_healthcare_fhir_hl7",
    diagramName: "Google Cloud Healthcare & Life Sciences FHIR / HL7 Pipeline",
    intentKeywords: ["healthcare", "fhir", "hl7", "cloud healthcare api", "dicom", "dlp phi", "omop cdm", "gemini clinical", "hipaa baa"],
    goldenExamplePayload: "Design a Google Cloud Healthcare & Life Sciences FHIR / HL7 Pipeline featuring Cloud Healthcare API, DLP PHI De-Identification, OMOP BigQuery lakehouse, and Gemini 3.7 Flash Clinical Reasoner.",
    uiCardDesc: "Enterprise healthcare interoperability platform featuring Cloud Healthcare API (HL7v2/FHIR R4/DICOM), DLP PHI de-identification, OMOP BigQuery, and Gemini Clinical AI.",
    phase: "4",
    phaseName: "Technical Deep-Dive & Security Validation",
    phaseGoal: "Enable secure clinical data interoperability, automated PHI de-identification for medical research, and AI-assisted clinical diagnosis.",
    domain: "Industry Specialized Solutions",
    abstractionLevel: "Industry",
    stackLayer: "Layer 1 to 4 (Full-Stack Healthcare)",
    notationStandard: "Healthcare Interoperability Architecture Standard",
    defaultDirection: "LR",
    coreGcpServices: ["Cloud Healthcare API", "HL7v2 Store & FHIR R4 Store", "Sensitive Data Protection DLP", "Cloud KMS HSM CMEK", "Gemini 3.7 Clinical Reasoner", "BigQuery OMOP CDM", "Looker Clinical Cockpit"],
    generativeBuildSequence: "1. Draw Hospital EHR & Medical Device Ingress (HL7v2, FHIR R4, DICOM PACS). 2. Draw Cloud Healthcare API & DLP 18 HIPAA PHI De-Identification. 3. Draw Vertex AI & Gemini 3.7 Flash Clinical Insights Core. 4. Draw OMOP CDM BigQuery Lakehouse & Physician Clinical Operations Cockpit.",
    advancedPromptLogic: "If [Medical Imaging AI] requested: Add DICOM PACS store, Vertex AI Medical Vision model for CT/X-Ray pre-reads, and radiologist sign-off queue.",
    requiredUserInputs: "EHR Vendor (Epic / Cerner), Clinical Feeds (HL7v2 / FHIR R4 JSON), HIPAA De-Identification Strategy, OMOP Lakehouse Schema",
    prerequisite: "GCP Landing Zone & Shared VPC",
    primaryPersonas: "Creator: Chief Healthcare & Life Sciences AI Architect | Consumers: BioInformatics Engineers & Clinical Informaticists | Stakeholders: Chief Medical Officer / VP Health Informatics",
    salesStage: "Healthcare Enterprise Solution Pitch",
    lifecyclePhase: "Design → Build",
    liveRailwayLink: "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=IND-HEALTH-01_healthcare_fhir_hl7"
  }
];

/**
 * 🎯 Finds the best matching canonical blueprint for a user's prompt using keywords and semantic weighting.
 */
export function findBestMatchingBlueprint(prompt: string): BlueprintKnowledgeItem | null {
  if (!prompt || prompt.trim() === '') return null;
  const p = prompt.toLowerCase();

  let bestMatch: BlueprintKnowledgeItem | null = null;
  let highestScore = 0;

  for (const item of BLUEPRINT_KNOWLEDGE_MATRIX) {
    let score = 0;

    // Check direct ID or Name match
    if (p.includes(item.combinedId.toLowerCase()) || p.includes(item.diagramName.toLowerCase())) {
      score += 10;
    }

    // Check intent keyword matches
    for (const kw of item.intentKeywords) {
      if (p.includes(kw.toLowerCase())) {
        score += 3;
      }
    }

    // Check core GCP service matches
    for (const svc of item.coreGcpServices) {
      if (p.includes(svc.toLowerCase())) {
        score += 1;
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
  }

  return highestScore >= 3 ? bestMatch : null;
}
