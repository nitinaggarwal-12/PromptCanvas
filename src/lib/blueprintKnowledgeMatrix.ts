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
    coreGcpServices: ["Cloud Pub/Sub", "Cloud Dataflow", "BigQuery BigLake", "Vertex AI Agent Builder", "Gemini 3.6 Pro", "Looker Studio", "Cloud Storage"],
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
    coreGcpServices: ["Cloud Storage", "Cloud Dataflow", "BigQuery BigLake", "Vertex AI Agent Builder", "Gemini 3.6 Pro", "Cloud Armor", "GKE Autopilot", "Looker"],
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
    coreGcpServices: ["Vertex AI Vector Search", "Vertex AI Agent Builder", "Gemini 3.6 Pro", "Cloud Storage", "Model Armor", "Cloud Functions MCP Tools"],
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
    coreGcpServices: ["BeyondCorp Enterprise", "Cloud Armor WAF", "Identity-Aware Proxy", "GKE Autopilot", "Istio mTLS 1.3", "Model Armor", "Gemini 3.6 Pro", "Vertex AI Vector Search", "Cloud SQL PSA", "BigQuery BigLake", "Cloud KMS CMEK", "OpenTelemetry"],
    generativeBuildSequence: "1. Draw Top Header & 4-Flow Legend (Data, Network, Control, Telemetry). 2. Draw Tier 1 Ingress with [D1] Device Posture and [D2] WAF Threat Diamonds. 3. Draw Tier 2 Compute Subnet (10.100.1.0/24) with [D3] Model Armor Safety Diamond and Istio mTLS mesh. 4. Draw Tier 3 Cognitive Mesh with [D4] Confidence Interlock Diamond and HITL Review Gate. 5. Draw Tier 4 Secure Data Subnet (10.200.2.0/24) with [D5] DataOps Circuit Breaker Diamond.",
    advancedPromptLogic: "Enforce explicit color-coded wires (Solid Blue for Data, Solid Purple for Network, Dashed Amber for Control, Dotted Green for Telemetry) and solid white background pills on all edge labels.",
    requiredUserInputs: "VPC Subnet CIDRs (10.100.1.0/24, 10.200.2.0/24), FIDO2 Attestation Criteria, WAF Rate Limits, Model Confidence Threshold (≥90%), Data Anomaly Threshold (>5%)",
    prerequisite: "Secure Deployment Topology Map",
    primaryPersonas: "Creator: Chief Security & AI Systems Architect | Consumers: SecOps, Network & Data Engineers | Stakeholders: CISO / CTO / VP Engineering",
    salesStage: "Master Architecture Review / Technical Deep-Dive",
    lifecyclePhase: "Design → Build",
    liveRailwayLink: "https://promptcanvas-production-235c.up.railway.app/workspace?blueprint=P4-TECH-M-01_enterprise_multiflow_zerotrust_platform"
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
