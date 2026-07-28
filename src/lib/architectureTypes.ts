import { compileSpecToDrawioXml, getBenchmarkItacsSpec, getBenchmarkErdSpec, getBenchmarkAgenticRagSpec, getBenchmarkSequenceDiagramSpec, getBenchmarkDataAiPipelineSpec, getBenchmarkSecureDeploymentMapSpec, getBenchmarkDevopsCicdPipelineSpec, getBenchmarkGovernanceStateMachineSpec, getBenchmarkUnifiedSystemViewSpec, getBenchmarkDarkModeUnifiedSystemViewSpec } from './diagramCompiler';

export interface ArchitectureTypeOption {
  id: string;
  name: string;
  category: string;
  prompt: string;
}

export const ARCHITECTURE_TYPES: ArchitectureTypeOption[] = [
  // Phase 0: Conceptual & Standard Architecture
  {
    id: "conceptual_diagram",
    name: "Conceptual Diagram",
    category: "Phase 0: Conceptual & Standard Architecture",
    prompt: "ITACS Oncology Platform:\n- Ingestion: Unstructured PDFs and PPTs across 5 silos (Market Research, Medical Affairs, Market Access, Outcomes Research, Competitive Intelligence).\n- Processing Engine: Core ITACS Platform (Powered by Gemini Enterprise) doing data synthesis, document analysis, strategic QA chatbot, and competitive launch simulation.\n- Strategic Outcomes: Outmaneuver Competition, Reach Patients Faster, Strategic Planning & Analysis.\n- Priority Alert: Review Drug Launch Strategy."
  },
  {
    id: "technical_diagram",
    name: "0. Technical Diagram",
    category: "Phase 0: Conceptual & Standard Architecture",
    prompt: "Act as an Elite Solutions Architect and Cloud Systems Engineer. Design a comprehensive, multi-tier cloud technical architecture diagram in Draw.io 2D canvas format. It should include: ingress routing, load balancing, compute services, relational/NoSQL databases, caching layers, message queues/event buses, security boundaries (VPC/IAM), and observability monitoring."
  },
  // Phase 1: Foundation & Core Logic
  {
    id: "erd",
    name: "1. Dimensional Data Model (ERD)",
    category: "Phase 1: Foundation & Core Logic",
    prompt: "Act as a Database Architect and Data Modeler. Design a comprehensive Dimensional Data Model (Entity Relationship Diagram - ERD) for an enterprise system. It should include: fact tables, dimension tables, primary and foreign key relationships, attributes, data types, and clear cardinality markings (1:1, 1:N, M:N)."
  },
  {
    id: "agentic_rag",
    name: "2. Cognitive Architecture (Agentic RAG)",
    category: "Phase 1: Foundation & Core Logic",
    prompt: "Act as an AI Chief Architect and Cognitive Systems Engineer. Design an advanced Cognitive Architecture featuring Agentic Retrieval-Augmented Generation (RAG). It should include: multi-agent orchestration loops, dynamic tool execution, vector embedding database (pgvector/Pinecone), document chunking & ingestion pipelines, semantic search retrieval, LLM reasoning engine (Gemini 2.5 Pro/Flash), and fallback validation guardrails."
  },
  {
    id: "sequence_diagram",
    name: "3. Micro Dynamic Sequence Diagram",
    category: "Phase 1: Foundation & Core Logic",
    prompt: "Act as an API Chief Architect and Backend Systems Engineer. Design a chronologically exact, step-by-step Micro Dynamic Sequence Diagram (Execution Loop) for an Agentic RAG ecosystem. It should include: standard UML Sequence lifelines (rectangles on dashed lines), light cream background theme, synchronous solid arrows for API calls, dashed return arrows for context observations, and callout badges for PII/Ethical sourcing checks, ReAct Thought/Action loops, and IAM private access VPC-SC enforcement."
  },
  // Phase 2: Cloud & Microservices
  {
    id: "serverless_gcp",
    name: "4. Serverless Web Application (GCP)",
    category: "Phase 2: Cloud & Microservices",
    prompt: "Act as a GCP Cloud Architect. Design a serverless web application architecture. It should include: a Global HTTPS Load Balancer, Cloud CDN, Cloud Run for frontend and backend services, Cloud SQL (PostgreSQL) for relational data, and Cloud Storage for static assets."
  },
  {
    id: "data_ai_pipeline",
    name: "5. Data & AI Pipeline",
    category: "Phase 3: Data & Analytics",
    prompt: `Act as an Enterprise Solutions Architect and Diagram Design Expert. Generate a high-resolution, pixel-perfect technical architecture diagram titled "ITACS SECURE GOVERNED CLOUD TENANT (Managed Services)". The style is a clean, professional cloud architecture blueprint on a white background with modern sans-serif typography, crisp vector icons, color-coded functional containers, and orthogonal data flow arrows.

1. Canvas Header & Operational Process Timeline:
- Top Header Left: Google Cloud (GCP) multi-color logo followed by bold dark header text: ITACS SECURE GOVERNED CLOUD TENANT (Managed Services).
- Top Horizontal Process Arrow: A light gray process timeline arrow running horizontally across the top from left to right, containing 10 exact stage markers: Standard Operations, Data Ingestion (via Google Workspace / Enterprise Connectors), Combinize Feature Engineering, Normalize Transformtsaiton, Encode Processing, Derived Formas, Transformation Transformation, ML Model Transformation, Specific Operations, Monitoring & Alerting.

2. Column Stage 1: DATA INGESTION (DFD):
- Header & Security Container: Light yellow/beige shaded box with a dashed border labeled GCS (Secure Managed Environment) at the bottom-left. Stage Title: DATA INGESTION (DFD).
- Raw Data Sources Block (Far Left): Stack of three white cards wrapped in a dashed gray box titled Raw Data Sources: Postgres (blue elephant), Salesforce cloud App (blue cloud), Unstructured Files (red PDF and orange PPT).
- Central Storage Bucket Node: Google Cloud Storage (GCS) Secure Bucket (Raw Data Lake) (green cylinder).
- Funcriogy Panel: Light orange vertical panel titled Funcriogy containing 5 functional icons: Market Research, Access, Outcomes, Medical Affairs, Competitive Intel.

3. Column Stage 2: FEATURE ENGINEERING FLOW:
- Header & Security Container: Soft orange/light beige box labeled Security Boundary. Stage Title: FEATURE ENGINEERING FLOW.
- Feature Engineering Transformation Card (Left Blue Box): Checklist flow with DAG icons next to Clean, Normalize, Aggregate, Encode. Red/orange dbt logo connected via flow arrow. Derived Fields pill badge with DAG icon.
- Managed Feature Store Card (Right Green Cylinder Container): Titled Model-Ready Features containing Customer Churn Features and Sales Prediction Features.

4. Column Stage 3: MLOPS LIFECYCLE (Training & Serving):
- Header & Security Container: Soft peach/orange box labeled Security Boundary. Stage Title: MLOPS LIFECYCLE (Training & Serving).
- ML Model Training Box: Circular blue looping arrows labeled Training Loop, receiving Pull Features arrow from Feature Store.
- Model Registry: White card with vault/safe icon labeled Model Registry, receiving Stores trained models arrow from Training Loop.
- Model Inference API Endpoint: Blue card receiving arrow from Model Registry.
- Monitoring Loop: Large curved blue arrow looping from Model Inference Endpoint back up to ML Model Training, labeled Monitoring & Alerting.
- Output Delivery Destinations: Three white stacked cards receiving arrows from Inference Endpoint: Web App / Dashboard, Mobile App, Automated Report Generator.

5. Bottom Footer Region:
- Legend Container: Two-column item list (Managed compute, Storage, Secure boundary, Secure boundaries).
- Summary Callout Banner: Grouping bracket spanning Feature Engineering and MLOps sections. Text: WHY IT WORKS: Data engineers and ML engineers need to see how upstream data changes impact downstream model performance. This gives them a shared map.`
  },
  {
    id: "secure_deployment_map",
    name: "6. Secure Deployment Map",
    category: "Phase 4: Resiliency & Security",
    prompt: `Act as a Principal Cloud Architect and Master Diagram Illustrator. Generate a 16:9 high-resolution, uncompressed vector-style technical architecture diagram titled "Google Cloud Project (ITACS Platform Production)".

1. Global Bounding Container & Top Anchor Header:
- Master Container: Light-gray (#F1F3F4) box with rounded corners and 1px dark gray border.
- Top-Left Header: Official multi-colored Google Cloud (GCP) hexagon logo + bold text: Google Cloud Project (ITACS Platform Production).

2. Zone 1: The Edge (External Traffic):
- Medium-gray (#E8EAED) rectangle on left side. Title: Zone 1: The Edge (External Traffic).
- Public Internet Node (Outside Zone 1, Far Left): White card with silhouette person icon labeled Public Internet Traffic. Straight black arrow into Load Balancer.
- External HTTP(S) Load Balancer (L7) Card: Blue network icon + Cloud Armor shield. Subtitle: Cloud Armor WAF Rules (Ingress filtering). Arrow pointing to API Gateway.
- Google API Gateway Card: Blue diverging arrows icon. Subtitle: Access key validation and API rate limiting. Arrow pointing via PSC to Agent Orchestrator.

3. Zone 2: The Private Network & Nested Security Perimeters:
- VPC Service Controls Perimeter: Large beige/light-orange box (#FCE8D5) with orange border. Header: VPC Service Controls Perimeter (Secure Managed Environment). Sub-header: Zone 2: The Private Network (VPC Inside).
- ITACS Primary VPC Network: White box with solid blue border. Header: ITACS Primary VPC Network.
- Subnet 1: Private Application Subnet (Isolated): Light blue box. Central Card: ITACS Agent Orchestrator (GKE Pod) with isometric cube and GKE cluster node icon labeled Logic.
- Subnet 2: Private Data/AI Subnet (Isolated): Light green box. Stacked cards: Vertex AI Vector Search Index, Vertex AI Training Cluster, Vertex AI Gemini API (all via PSC Endpoint).
- Internal Connectors: Bidirectional arrows from Orchestrator to Vector Search and Training Cluster (Private gRPC/HTTP Endpoint). Orthogonal arrow down and right to Gemini API labeled "Private Private Call via PSC Endpoint".

4. Right-Margin Pointer Annotations:
- Curved arrows from external text blocks pointing to: Vector Search card, Training Cluster card, Beige Perimeter box, Master Container, and Gemini API card.

5. Bottom Footer Region:
- Legend Box: Logical container (cube), Software types (silhouette), Line colors, Security Boundaries (green line), Security Controls Boundaries (blue line), Google Cloud Armor, Google Cloud IAM (Role-Based Access Control) (repeated twice as anomaly), VPC Service Controls Perimeter (orange fill).
- Value Proposition Callout: WHY IT WORKS: Security teams and DevOps teams can immediately see both what the software is and how it is protected from the public internet.`
  },
  {
    id: "devops_cicd_pipeline",
    name: "7. DevOps & CI/CD Pipeline",
    category: "Phase 4: Resiliency & Security",
    prompt: `Act as a Principal DevSecOps Architect and Master Diagram Illustrator. Generate a 16:9 high-resolution, uncompressed vector-style technical architecture diagram titled "Diagram: The Operational Flow".

1. Global Canvas & Master Title:
- Top Canvas Title: Centered above the entire diagram, large text: Diagram: The Operational Flow.
- Master Container: A large light-gray (#F8FAFC) box with rounded corners and a dark gray 1px solid border.
- Top-Left Header: Official multi-colored Google Cloud (GCP) logo + bold text: ITACS Governing Cloud Tenant (Managed Services).

2. Column 1: PLAN & GOVERN:
- White vertically oriented rectangle on far left. Title: PLAN & GOVERN.
- Project Planning: Document checklist icon + text Project Planning.
- Dimensional Data Modeling (ERD): Hierarchical flowchart icon + text Dimensional Data Modeling (ERD).
- Connectors merge into a single horizontal line pointing right toward Column 2.

3. Column 2: GIT SOURCE & IaC DEFINE:
- Very light gray box. Title: GIT SOURCE & IaC DEFINE (Governance/Compliance) (Polyrepo setup with explicit PR/Branch Protection Rules).
- Top Icon: Black GitHub logo.
- 3 stacked cards: Data Engineering (blue fill, {...} icon), Application Development (green fill, </> icon), MLOps (blue fill, brain icon).
- Text Element: PR/Branch Protection Rules between middle and bottom cards with arrows pointing to App Dev and MLOps cards.

4. Central Ecosystem Boundary & The 3 Tracks:
- Massive beige/light-orange (#FFF3E0) container with orange border. Title: SECURE MANAGED GEMINI ENTERPRISE ECOSYSTEM BOUNDARY (VPC Service Controls).
- Ingress Connectors: 3 arrows with red diamond badges containing Git symbol labeled Git commit (Data Eng), Git commit (App Dev), and ML Eng Git commit.
- Cross-Track Connector: Arrow dropping vertically from Track 1 CI to Track 2 CI labeled Data availability.
- Track 1: DATA ENGINEERING & DIMENSIONAL MODELING FLOW (DFD/ERD Lifecycle). CI card (Automated unit tests on dbt models, data quality tests on private VPC-SC BigQuery and GCS structures, security config scan). CD card (Terraform/ArgoCD applies updates to BigQuery datasets, GCS buckets, dbt scheduler config; private VPC label; magnifying glass & database icons). Arrow labeled CI Passed / Triggers. Footer note: *References image 3 (Data Pipeline) and 7 (ERD) operations here.
- Track 2: APPLICATION DEVELOPMENT & COGNITIVE ARCHITECTURE FLOW (App Code Flow). CI card (Building Docker images, app unit tests, security vulnerability dependency scan). CD card (Terraform applies updates to API Gateway config, GKE manifest, deployment config within; private VPC label; API icon). Arrow labeled CI Passed / Triggers. Footer note: *References image 5 (Cognitive Architecture) and 1 (Agent ReAct loop) operations here.
- Track 3: MLOps LIFECYCLE (ML/AI TRAINING FLOW). CI card (Model training script test, validation of hyperparameter configs). Training Loop card (Pushes ML training job to private Vertex AI Training executing on GPU clusters; private VPC label). Arrow labeled CI Passed / Triggers. Footer note: *References image 3 (Training loop) operations here.

5. Column 4: PHASE 4: EVALUATION, GOVERNANCE & PROMOTION FLOW:
- Human-in-the-Loop Governance Box: 3 arrows converge here. Internal flow of Evaluated -> Approved in two rows with central Registry/Conversation Log label. Output node: Conversation Log config. Offline evaluation bullets (F1 scores, bias tests, hallucination metrics for LLM prompts).
- Promotion Box: Model pushed to production Model Registry and/or Conversation Log config updated.

6. Column 5: PHASE 5: SECURED DEPLOYMENT & OBSERVATION FLOW (Topology Flow):
- Top Left Badge: VPC-SC Enforcement.
- Continuous Deployment Actor: Orange robot icon labeled Continuous Deployment (ArgoCD/GitOps).
- Deployment Topology Box: Title Deployment topology. Inner blue box GKE Pods with dashed box GKE Containers containing GKE Pods, API Gateway, WAF icons. Bottom label Canary deployment on GKE.
- Observation Box: Continuous Observation & Alerting (Datadog/Sentry/GCP Cloud Logging) with bullets for inference drift, prompt injection attacks, application health.

7. Footer Region:
- Legend Box: Managed Compute, Storage, Secure boundary, Key block (verbatim with typos: config config, updates updates and dbt sumuronts), VPC-SC Enforcement, Securitive boundary type (with typo), IAM Roles (Role-Based Access Control) (Model Registry and/or Conversation Log config updated).
- Bottom Banner: *WHY IT WORKS: This unified diagram allows security, SREs, and architects to immediately understand the entire operational lifecycle, dependencies, security boundaries, and human governance across all four diagram types (Data Flow, Cognitive Architecture, Topology, MLOps) ensuring total, uncompromised end-to-end design.`
  },
  {
    id: "governance_state_machine",
    name: "8. Governance & State Machine",
    category: "Phase 4: Resiliency & Security",
    prompt: `Act as a Principal DevSecOps Architect and Master Diagram Illustrator. Generate a 16:9 high-resolution, uncompressed vector-style technical architecture diagram.

* Canvas & Background: Pure white (#FFFFFF) canvas.
* Typography: Google Sans or similar modern, clean sans-serif. Follow strict hierarchical sizing. CRITICAL: You must explicitly replicate all spelling, punctuation, and grammatical anomalies exactly as written in this prompt (e.g., "One-to-mankey", "uncompcompromised", "Architv").
* Line Styles: Solid 1px gray/black lines with triangular arrowheads for all connectors, unless specified otherwise.
* Color Palette Definitions:
* Dark Blue (Nodes/Headers): #12385B
* Teal (Nodes): #2A7B9B
* Orange (Nodes/Pills): #D37324
* Light Gray (Containers): #F3F4F6

1. Header Region
* Main Title Bar: A full-width Dark Blue rectangle spanning the very top. Text (Left-aligned, bold, white, all caps): UNIFIED GOVERNANCE & STATE-MACHINE LIFECYCLE: THE "WHAT STATUS" TOTAL SYSTEM VIEW.
* Subtitle Banner: A light gray full-width rectangle directly beneath the title bar. Text (Centered, regular weight, dark gray): Total end-to-end flow from Vetting to Continuous Societal & Regulatory Monitoring.

2. Column 1: Initial Vetting & Modeling
* DATA VETTING Node (Top Left): Shape: Dark Blue rectangle, rounded corners. Icon (Top Center): Magnifying glass over a line chart. Text: DATA VETTING (line 1, bold), (Ethical Sourcing (line 2), & PII Check) (line 3).
* Approval Badge (Below Data Vetting): Icon: Green circle with a white checkmark. Text below: Data (line 1), Governance (line 2), Approval (line 3).
* DIMENSIONAL DATA MODEL Node (Bottom Left): Shape: Dark Blue rectangle, rounded corners. Icon: Hierarchical ERD box structure. Text: DIMENSIONAL (line 1, bold), DATA MODEL (line 2, bold), (ERD) REFERENCE (line 3, bold).
* MODEL CREATED Node (Center Left): Shape: Dark Blue rectangle, rounded corners (slightly wider). Icon: Blueprint/Drafting paper. Text: MODEL CREATED (line 1, bold), (or PROMPT (line 2, bold), DESIGNED) (line 3, bold), Now versioning labels (line 4), (e.g., Prompt labels, (line 5), e.g., v1.0) (line 6).
* Connectors: Arrows from DATA VETTING (down-right) and DIMENSIONAL DATA MODEL (up-right) converge into the left side of MODEL CREATED.

3. Column 2: Training, Evaluation & Audits
* IN TRAINING Node (Top): Shape: Teal rectangle, rounded corners. Icon: Brain with gear/nodes. Text: IN TRAINING (line 1, bold), (or DEVELOPMENT) (line 2). Connector: Arrow flows up and right from MODEL CREATED into this node.
* EVALUATED Node (Center): Shape: Dark Blue rectangle, rounded corners. Icon: Computer monitor with a line chart. Text: EVALUATED (line 1, bold), (OFFLINE METRICS) (line 2, bold), Pre-deployment validation (line 3), (e.g., accuracy, bias, (line 4), hallucination scores) (line 5). Connectors: Arrow from MODEL CREATED pointing right into EVALUATED. Label above arrow: Evaluation. Label below arrow: Accuracy/F1. Arrow pointing down from IN TRAINING into EVALUATED. Label next to arrow: RETRAINING/REFINEMENT (bold).
* Bias & Fairness Audit (Bottom): Shape: Orange rectangle, rounded corners. Icon: Scales of Justice. Text: Bias & (line 1, bold), Fairness Audit (line 2, bold). Connectors: Loop between EVALUATED and this node. Left arrow points down labeled Hew (top) / Robust (bottom). Right arrow points up labeled Required. Badge Below: Green checkmark icon with text Explainability (line 1), Report (XAI) (line 2).

4. Center Section: GOVERNANCE BOUNDARY
* Boundary Container: A large Light Gray box with a dashed border, located centrally. Title (Top Center, inside box): GOVERNANCE BOUNDARY (Bold, dark gray).
* Internal Stack (4 components, top to bottom):
* Node a: Orange pill shape. Text: a) Compliance Audit (bold), (Regulatory).
* Node b: Teal rectangle. Icon: Shield with person inside. Text: b) (line 1), NEW: Adversarial (line 2, bold), Red Teaming & (line 3, bold), Security Verification (line 4, bold), (Checks, model inversion, (line 5), prompt injection, and (line 6), hallucination safety) (line 7).
* Node c: Teal rectangle. Icon: Three people silhouettes. Text: c) (line 1), NEW: Societal Bias (line 2, bold), & Ethics Audit (line 3, bold), (Formal verification of (line 4), fairness) (line 5).
* Node d: Orange pill shape. Text: d) SRE Approval (bold), (Operational readiness).
* Connectors (Input): A single arrow exits the right side of EVALUATED, enters the left side of the Governance Boundary, and splits into four separate lines leading into nodes a, b, c, and d.
* Footer Badges (Below Boundary): Light Blue pill: AI Ethics Board. Dark Gray pill: AI Security Lead.
* Human-in-the-Loop Node (Exiting Boundary): Shape: Dark Blue rectangle, straddling the right-side dashed line of the boundary. Icon: Shield with checkmark. Text: Human-in-the- (line 1), (Unified (line 2), Governance (line 3), Board) (line 4). All text centered. Connectors (Output): Lines exit nodes a, b, c, d, merge into one, and enter the left side of this node.

5. Column 4: Deployment & Operations
* CANARY DEPLOYMENT Node (Top): Shape: Teal rectangle. Icon: % symbol. Text: CANARY (line 1, bold), DEPLOYMENT (line 2, bold), Canary Failure (line 3), Rollback (line 4).
* PROMOTED TO PRODUCTION Node (Center): Shape: Dark Blue rectangle. Icon: Rocket ship and city buildings. Text: PROMOTED TO (line 1, bold), PRODUCTION (line 2, bold), Fully deployed state (line 3), serving live traffic (line 4).
* Multi-Silo Agentic Node (Bottom): Shape: Teal rectangle. Icon: Server rack/Database. Text: Multi-Silo Agentic (line 1), Workflow Tooling (line 2), Vetting (line 3).
* Connectors: Arrow from Human-in-the-Loop splits: goes up to CANARY DEPLOYMENT and straight to PROMOTED TO PRODUCTION. Arrow from CANARY DEPLOYMENT points down to PROMOTED TO PRODUCTION. Label next to it: Promotion (line 1) Path (line 2). Rollback Loop: Arrow loops from left of CANARY DEPLOYMENT back to Human-in-the-Loop. There is an orange pill overlay on this line reading: Canary Failure (line 1), Rollback (line 2).

6. Column 5: Continuous Monitoring & Archival
* Continuous Performance Arrow (Top): A long arrow routes from above PROMOTED TO PRODUCTION towards the right. Label above arrow: 1) Continuous (line 1), Online Performance (line 2), & Bias Monitoring (line 3).
* Drift Detection Node: Shape: Teal rectangle. Icon: Line graph with dotted trend. Text: 2) (top left corner), Drift (line 1), Detection (line 2), Monitoring (line 3).
* Societal & Regulatory Monitoring Node: Shape: Teal rectangle. Icon: Judge's gavel. Text: 3) (top left corner), Societal & (line 1, bold), Regulatory (line 2, bold), Monitoring (line 3, bold), Constantly checks against (line 4), external changes (... new (line 5), law, changing norms) (line 6).
* Connectors from Production: Arrows point from PROMOTED TO PRODUCTION into nodes 2 and 3.
* Archival Nodes (Far Right Stack): Top Archival Node: Dark Blue rectangle. Icon: Isometric open box. Text: ARCHIVAL (line 1, bold), (RETIRED) (line 2, bold), (Safety Incident) (line 3). Bottom Archival Node: Dark Blue rectangle. Icon: Isometric open box. Text: ARCHIVAL (line 1, bold), (RETIRED) (line 2, bold).
* Trigger Connectors (From Node 3 to Bottom Archival): Four separate arrows flow from the right side of Node 3 to the left side of Bottom Archival. Each has an orange pill label: Pill 1: Model Obsolescence, Pill 2: Regulatory Change, Pill 3: Societal Drift (Harm Detected), Pill 4: Safety Incident (Recall triggered).
* Incident Loop Connector: Arrow points up from Bottom Archival to Top Archival. Label left of line: 3) Trigger (line 1), Checks (line 2). Label right of line: 4) Architv (line 1, replicate exact typo), (Safety (line 2), Incident) (line 3).

7. Footer Region (Critical: Replicate all typos verbatim)
* Legend Box (Bottom Left): White box, gray border. Top left text: Legend:. Column 1: Blue square Managed Compute, Green square Storage, Yellow square Secure boundary. Column 2: White square Data Type, White square Data Description, Dashed square TimeRes. Column 3: Key icon Key Definition, Key with lock icon Key Definition (FK), Linked keys icon Key Demmondiate (line 1) Demendiate Relationsins (line 2). (REPLICATE TYPOS). Column 4: Solid arrow One-to-mankey. Hollow arrow One-to-many Relationship. Dashed line Line Type: Relationship. (REPLICATE TYPO).
* Why It Works Box (Bottom Right): Light Blue/Gray fill, gray border, rounded corners. Text: **WHY IT WORKS: This total system view ensures uncompcompromised end-to-end design, integrating ethical data sourcing, adversarial security verification, proactive societal audits, and robust post-production drift monitoring for truly complete governance and safety. (REPLICATE TYPO "uncompcompromised")`
  },
  {
    id: "unified_system_view",
    name: "9. Unified System View",
    category: "Phase 4: Resiliency & Security",
    prompt: "Act as a Principal Enterprise Systems Architect and Master Diagram Illustrator. Generate a highly complex 16:9 high-resolution, uncompressed vector-style technical architecture diagram.\n\n* Canvas & Background: Pure white (#FFFFFF) canvas.\n* Typography: Google Sans or similar clean sans-serif. Follow strict hierarchical sizing. CRITICAL MANDATE: Replicate all spelling errors, casing anomalies, and gibberish text VERBATIM.\n* Color Palette (GCP Standard): Dark Blues (Headers/Primary Nodes), Light Blues (Containers/Compute), Teals (Deployments/Actions), Greens (Storage/Data), Light Orange/Beige (Subnet boundaries), Gray (Backgrounds/Borders).\n* Structure: The diagram is divided into a top Header, three main horizontal Swimlanes, and a bottom Footer Legend.\n\n1. Global Header Bar\n* Main Title Bar: Full-width Dark Blue rectangle spanning the top.\n* Left Icon: Google Cloud (GCP) multi-color logo.\n* Title Text (White, bold): ITACS Integrated Insights Platform - TOTAL UNIFIED SYSTEM VIEW: Data, Cognition, Deployment, & Governance (End-to-End without Compromise).\n* Subtitle (White, regular, centered below title): Unified Logical Flow, Technology Stack, Security Boundaries, and Operational Lifecycles\n\n2. Swimlane 1: PLAN & DATA FOUNDATION\n* Left Vertical Tab (Rotated 90 degrees CCW): Gray fill, text: Poots & Planninc Phases (Replicate typos).\n* Top Main Label: Centered text spanning the top of the lane: Entire ultra-diate in organizing across major phases (Replicate typos).\n* Lane Header (Top Left): PLAN & DATA FOUNDATION (Vetting & ERD Integration) (Bold).\n* Icons (Left to Right): Clipboard icon -> Project Planning, Database w/ check icon -> Data Vetting, Leaf/Hands icon -> Ethical Sourcing.\n* ERD Section: Text Block: Dimensional Data Model (ERD) (Bold), (Schema for all structured, unstructured, and and derived AI context (Image 7 definitions)) (replicate \"and and\"). Visual: To the right of the text, a miniature unreadable ERD diagram.\n* VPC Boundary Anchor (Far Right): A large dashed gray boundary box begins here and drops down into Swimlane 2. Top-right label: VPC Service Controls Perimeter (Secure Managed Environment).\n\n3. Swimlane 2: DEVELOPMENT & AI LIFECYCLE\n* Left Vertical Tab (Rotated 90 degrees CCW): Gray fill. Text: DEVELOPMENT & AI LIFECYCLE (insograto4 MLOps(L)MLOps State Machine & Pipalinos) (Replicate all typos).\n* Track 2a: DATA ENGINEERING & DFD: Silo Stack (5 stacked dark teal pills): Market Research, Access, Outcomes, Medical, Competitive Intel. Raw Data Block: Salesforce, Postgres, Unstructured Files. Connector flows right with orange VPC-SC pill. Data Lake: GCS Secure Bucket (Raw Data Lake).\n* Track 2b: FEATURE ENGINEERING FLOW: Transformation Box: Circular Transformation with 4 overlapping circles Clean, Normalize, Aggregate, Encode and dbt models. Connector: dbt/SQL arrow to Managed Feature Store.\n* Track 2c: AI MODEL & PROMPT DEVELOPMENT LIFECYCLE: Governance Boundary Box incorporating the full unified audits from image 15 (Replicate typo incogporating). Internal Flow: GCS/BigQuery/Model Registry -> DATA VETTING -> CREATED (Model/Prompt) -> TRAINING Retraining/Refinement Loop -> EVALUATED (with Bias & Fairness Audit and Metripls metica gibberish) -> Accuracy/F1 arrow -> Human-in-the-Loop (Unified Governance Board) -> APPROVED (with Compliance, Adversarial, Bias badges and GKE inference compute). Deployment exiting boundary: Canary -> Promote with Rollback Promotion and Explicit rollback loops.\n\n4. Swimlane 3: GOVERNANCE, FEEDBACK & RETIREMENT LIFECYCLE\n* Left Vertical Tab (Rotated 90 degrees CCW): Gray fill. Text: GOVERNANCE, FEEDBACK & RETIREMENT LIFECYCLE (References Image 15).\n* Lane Header: COGNITIVE ARCHITECTURE & SECURE DEPLOYMENT (Topology Integration) (Yavates inside logical software inside secure cloud network bound. (References image 5 logical layout within VPC)) (Replicate typo Yavates).\n* The Edge (Left side outside VPC): Public Internet Traffic -> External Load Balancer (WAF) -> Google API Gateway with Cloud Armor WAF Rules (Edge protection) top/bottom callouts.\n* ITACS Primary VPC Network Container: Private Application Subnet (Isolated) housing ITACS Agent Orchestrator (GKE Pod) with ReAct Loop and Integrated System Prompt, Conversation Memory, Gemini LLM (Reasoner). Private Data/AI Subnet (Isolated) housing Tool 1: Enterprise Knowledge (Managed RAG), Tool 2: Business Analytics (Analytics), Tool 3: Agentic API Tools. Cross-Subnet Connectors: ACTION gRPC/HTTP, ACTIONS, OBSERVATION.\n* Deployment & Observability: Canary deployment on GKE, Continuous Observation & Alerting monitoring (Inference drift, Prompt ironction typo, Societal Changes).\n* ARCHIVAL (Far Right outside VPC): ARCHIVAL (Retired Model/Prompt) with duplicated Incoming triggers and gibberish fiennon nao integration. Inbound arrows from Monitoring, Drift Detection, and Continuous Observation (Regeslation typo, Regulatory Change, Societal Drift, Safety Incident).\n\n5. Bottom Footer Region: Dense Legend (CRITICAL: Retain all gibberish & typos)\n* Legend Bounding Box: Column 1 Managed Compute, Storage, Secure boundary, Control Flow, Key: Data, Managed, User Data, IAM, VPC-SC, Newscomptoie typo, VOC-S typo, Relationship, Reldonnics typo, Key/Default. Column 2 & 3 Key Definitions (Data Boundan typo, Bermanon Internal Nine and Data gibberish, Control Flow xumonent Boundan gibberish). Column 4 Line Descriptions (intewwships typo, Interaned Srandan typo, Data manieing typo, IPc edge talie typo, Line asnntription provboed oriens gibberish)."
  },
  {
    id: "dark_mode_unified_system_view",
    name: "10. Architecture",
    category: "Phase 4: Resiliency & Security",
    prompt: "Act as a Principal Enterprise Systems Architect and Master Diagram Illustrator. Generate a highly complex 16:9 high-resolution, uncompressed vector-style technical architecture diagram.\n\n* Canvas & Background: Dark mode theme. The canvas background must be extremely dark navy/black (#0B111A or similar). All primary text must be white or light gray.\n* Typography: Modern clean sans-serif. Follow strict hierarchical sizing. CRITICAL MANDATE: Replicate all spelling errors, casing anomalies, and gibberish text VERBATIM.\n* Color Palette (Dark Theme):\n* Text: White (#FFFFFF) or Light Gray (#A0AAB5).\n* Borders: Solid or dashed lines in bright cyan/blue, orange, yellow, and green.\n* Fills: Most boxes have a dark transparent fill or dark gray fill, relying on colored borders to define them.\n\n* Structure: The diagram is divided into a Global Header, four horizontal Swimlanes (L1-L4) with rotated left-side vertical tabs, a Footer containing legends, and a bottom edge footer text.\n\n1. Global Header Bar\n* Title Text (Center, Top, White, bold, large): ITACS Integrated Insights Platform - TOTAL UNIFIED SYSTEM VIEW: Data, Cognition, Deployment, & Governance (End-to-End without Compromise)\n* Subtitle (Center, below title, light gray, regular): Mapping Data Flow, Orchestration, Time, and Governance across Data/AI Solutions\n\n2. Swimlane 1: L1 (Top)\n* Left Vertical Tab (Rotated -90 degrees): Gray fill, black text: L1: Poots & Plonning Phases (Replicate typos).\n* Box 1 (White border): Title ITACS Governing Cloud Tenant (Mensged Services) (References image 15). Inside: Stick figure icon labeled Silo Analysts. Next to it, Google Cloud logo labeled Google Workspace Connectors.\n* Connector: Arrow pointing right. Label above line: Analysts upload raw dacs (POFS, PPTs). Label below line: Stream data.\n* Box 2 (White border): Title Plan & Data Foundation (Vetting & ERD Integration). Inside: Blue cylinder icon labeled GCS Secure Bucket (Raw Data Lake).\n* Connector: Arrow pointing right to Box 3.\n* Box 3 (White border): Title Entire ultre-diate in organizing across major phases. Inside: A tiny diagram of blank boxes connected by lines (representing an ERD). Top right corner of this box has a small illegible blue circle badge.\n\n3. Swimlane 2: L2\n* Left Vertical Tab (Rotated -90 degrees): Gray fill, black text: L2. DEVELOPMENT & AI LIFECYCLE (iosograto4 MLOps... (ocograto4 MLOps(L)MLOpa, Stalo Machine & Pipolinos).\n* Track 2a Container (White border): Title DEVELOPMENT & AI LIFECYCLE (iosograto4 MLOps... (References image 15 & 5). Left Stack: 5 teal pill-shaped nodes stacked vertically: Market Research, Access, Outcomes, Medical, Competitive Intel. Raw Data Block: A white bracket points from the stack to the text Raw Data. Next to it, 3 icons: Salesforce cloud logo (Salesforce), Database elephant logo (Postgres), Document icons (Unstructured Files).\n* Connector: Arrow points right. An orange pill badge overlaps the line reading VPC-SC.\n* Track 2b Container (Dashed white border): Title Zones 2 & 5 from image 5. Transform Box: Large light blue rounded box titled Transform. Inside are 4 light blue circles: Clean, Normalize, Aggregate, Encode. Connectors/Nodes: Arrow points right to an orange \"X\" icon labeled dbt models. Arrow points right to a gray square labeled SQL dbt/SQL. Arrow points right to a blue cylinder labeled Managed Feature Store.\n* Track 2c Container (Dashed blue border): Title Governance Boundary incogporating the full unified audits from Image 15. Internal Node Flow (Left to Right): Blue circle with graph icon labeled DATA VETTING. Arrow to blue rectangle CREATED (Modsl/Prompt). Arrow to blue rectangle TRAINING Retraining/ Refinement Loop. Arrow to blue rectangle EVALUATED offhoe Metrics Bias & Pairoess Audit Metripls metics. Arrow (labeled Accursay/P1 above line) to blue rectangle Noman-in-the-Loop (dhified Soromance Beant). Overlapping top-right of the Noman node: Green pill APPROVED with text below it GKE inference compute. Arrow to dark blue pill Canary. Arrow to dark blue pill Promote. Return Arrows: Loop from Promote back to Canary labeled Explicit rollback. Loop from Canary back to Noman-in-the-loop labeled Rollback Promotion.\n\n4. Swimlane 3: L3\n* Left Vertical Tab (Rotated -90 degrees): Gray fill, black text: L3. GOVERNANCE, FEEDBACK & RETIREMENT LIFECYCLE (Refeerence irnago 15).\n* Box 1 (White border): Title GOVERNANCE, FEEDBACK & DEYIRBMENT LIFECYCLE (References Image 15). Inside: A blue box Plan & Govern containing a stick figure actor and Google logo GCP Workapace Connectors.\n* Box 2 (White border): Title MLOps Lifecycle: model, training, eval, approval, deployment & monitoring (References image 13). Flow: Stick figure ML Enginaer -> Airflow Scheduler -> Model Traioing (Vertex AI) -> Model Registry -> Governance Board (Human-in-the-Loop) -> Deployment Pipeline. Labels: First arrow analists aplioad rao osss. Second arrow initiates training, pulls features, executes training. Between Vertex and Registry Status: EVALUATED. Under Governance Board provides Human in-the-Loop approval.\n* Box 3 (White border): Title GenAI / Agenlic BAG Orchestratien 5 Analytics Tooling (References image 15). Flow: GKE inference Endpoint -> Monitoring -> Green cylinder ML Inference Log. Labels: First arrow pulls model, logs inference and dirft with text Status: APPROVED in green. Second arrow pushes lags to & dliift.\n* Box 4 - Main VPC (Dashed yellow border): Title Zonss 2 & 5 from image 5. Inner Box (Solid blue border): ITACS Primary VPC Network (Secure Managed Environment). Left Subnet (Solid orange border): Private Application Subnet (Isolated). Title inside: ITACS Agent Orchestrator (GKE Pod). Contains a circular ReAct Loop (Thought, Action, Observation). To the right of the loop, stacked boxes: Integrated System Prompf, Canversation Memory, Gemini LLM (Reasoner). Bottom text block: • Betlict Theoghd loop, • Actien deoision Tbnoglt, • Actien deesion Memery. Right Subnet (Solid orange border): Private Dete/AI Subwet (Isolated). Title inside: Containers/Endpoints (via PSC). Three stacked tool boxes: Tool 1: Eaterprise Nnowledge (Danaged RiAG) GCS?Vertes A? Search, Tool 2: Boslouss Avalytics (Auakehce) BigQuery SQL, Tool 3: Agentic API Tools Deck Studio API. Connectors: Arrow from Orchestrator to Tools labeled ACTION gRP/HTTP. Arrow back labeled Priocla call.\n* Box 5 - The Edge (Dashed white border, right edge): Title Zones 2 & 5 from image 5. Stacked nodes: Cloud Armor WAF Rules, Public Internet Traffic (person icon), Loed Balencer (WAF), Google API Gateway, Cloud Armor WAF Rules (Edge protection).\n\n5. Swimlane 4: L4\n* Left Vertical Tab (Rotated -90 degrees): Gray fill, black text: L4. PLAN & DATA FOUNDATION (Vetting & EBG Inliogallao).\n* Title Text: PHASE 5: SECURED DEPLOYMENT & OBSERVATION FLOW (Topology Flow). Small blue pill overlapping line: VPC-SC Enforcement.\n* Topology Box (Dashed blue border): Title Deployment topology. Left side: Blue box GKE Pods. Right side: Dashed box GKE Centainers containing 3 hexagons GkE Pods, API Goleway, WkF. Bottom label: Canary deployment on GRE.\n* Action Flow (Bottom center): Stick figure Oncolngy Analyst requeslareaquakts PPT deck -> box UI -> box Agent Orchestrator -> box Deck Studio API -> box Global Market Radar API -> dark box Archival -> box Delivery (ourvey). Labels above arrows: Requests request, requeslzed request, Requests PPT dock, aynlhesized request and request flow, Generatee PPT deck, inlteractive visualizabcn, pushes to interface. Below arrows: pushes to interface, Logs actions.\n* Observation Box (Green border): Continuous Observelion & Alerting menlioning (Datadog/Seonyr/DCP C'laud Logging). Bullets: - Inference drift, - Prompt irenction, - Socislal Changes.\n* Archival Box (Gray border): ARCHIVAL (Retired Medel/Prompt). Bullets: - Imcaming triggers, - Incomimg triggers, - fienooe nae intagration, - Detailed role integration.\n* Connectors to Archival: Arrows from Observelion Box and Global Market Radar pointing into Archival Box, labeled drift detection, regaclation, regulatory changes.\n* Far Right Text: Large text References image 15.\n\n6. Footer Region\n* Legend (Bottom Left): Grid of icons with text: Blue box Managed Compute, Green box Storage, Yellow box Secure boundary, Arrow Control Flow, Dashed arrow Key: Data, Empty box Newscomptoie, Line VGC S, Dashed line Relationship, Blue arrow Managed, Red line Relationship, Blue hexagon Reldennics, Lock Key/Sefault, Google logo GCP Workagace, Person actor, Robot Gendhi, Cube GkE pod, Cloud private VPC, Cloud shield cloud annor, Infinity Humps de-tile Loop.\n* Key Refinitions Box: Header Key Refinitions:. Bullet • Eey 1 Aatemad unit tests.... Bullet • CO: GCS, config config....\n* Line Descriptions Box: Header Line Descriptions. Bullets Linn devoiopveenta/, Bete maineirg..., Pneate Application Container....\n* Value Proposition Boxes (Right): Top text: TECHNICAL ADVANTAGE: Unified architecture enables seamless data engineering, MLOps, and agentic RAG integration with end-to-end security and auditable governance. Middle text: WHY IT WORKS: This unified diagram consolidation enables all data engineering, ML engineering, GenAI engineering, SRE, and security teams to instantly understand the entire operational lifecycle, dependencies, security boundaries, and robust operational lifecycles without missing any critical details. Bottom text: PLATFORM VALUE: Unifying Data, MLOps, and GenAI to deliver faster, safer, and more accurate insights. Bottom Right Corner Box (Dark gray fill): #Prggresslon Ratiooale: We visuulize the sequential process fow while misgrating technical components, data Rows, and secority lozers into a single, umfied arctinectoral ayitilecis.\n* Absolute Bottom Edge Text (Centered): ITACS Integrated Insights Platform... end-to-end without compromise... unified diagram allowed security, SREs, and architects, adncutred loeos... end-to-end design"
  },
  {
    id: "event_driven_aws",
    name: "11. Event-Driven Microservices (AWS)",
    category: "Phase 2: Cloud & Microservices",
    prompt: "Act as an AWS Architect. Design an event-driven microservices architecture. It should use: Amazon EventBridge for event routing, AWS Lambda for processing events, Amazon SQS/SNS for messaging/decoupling, and DynamoDB as the fast key-value store."
  },
  {
    id: "k8s_mesh",
    name: "12. Kubernetes Service Mesh (EKS/GKE)",
    category: "Phase 2: Cloud & Microservices",
    prompt: "Act as a Cloud Native Architect. Design a multi-cluster Kubernetes Service Mesh architecture using EKS or GKE with Istio/Anthos, ingress controllers, mutual TLS (mTLS), distributed tracing, and Prometheus monitoring."
  },
  // Phase 3: Data & Analytics
  {
    id: "streaming_pipeline",
    name: "13. Real-time Streaming Pipeline (GCP)",
    category: "Phase 3: Data & Analytics",
    prompt: "Act as a GCP Data Architect. Design a real-time streaming data analytics pipeline. It should ingest streaming data via Pub/Sub, process it with Cloud Dataflow, store structured results in BigQuery, and visualize via Looker."
  },
  {
    id: "data_lakehouse",
    name: "14. Modern Data Lakehouse (AWS)",
    category: "Phase 3: Data & Analytics",
    prompt: "Act as an AWS Data Architect. Design a modern Data Lakehouse architecture. It should include: raw/processed data landing zones in Amazon S3, AWS Glue Catalog for schema registry, AWS Athena for querying, and Amazon Redshift for data warehousing."
  },
  // Phase 4: Resiliency & Security
  {
    id: "multi_region_dr",
    name: "15. Multi-Region Disaster Recovery (GCP)",
    category: "Phase 4: Resiliency & Security",
    prompt: "Act as a GCP Architect. Design a highly available, multi-region disaster recovery architecture. It should include: Cloud DNS routing, HTTPS Load Balancing across two regions, active-passive Cloud Spanner database sync, and dual-region GCS backups."
  },
  {
    id: "zero_trust",
    name: "16. Zero-Trust Security Perimeter (GCP/AWS)",
    category: "Phase 4: Resiliency & Security",
    prompt: "Act as an Enterprise Security Architect. Design a Zero-Trust Security Perimeter architecture featuring VPC Service Controls, Identity-Aware Proxy (IAP), centralized Cloud IAM policies, KMS encryption at rest and in transit, and continuous SIEM monitoring."
  },
  // Phase 5: Enterprise Integration
  {
    id: "hybrid_interconnect",
    name: "17. Hybrid Cloud Interconnect (Enterprise)",
    category: "Phase 5: Enterprise Integration",
    prompt: "Act as an Enterprise Cloud Architect. Design an integrated Hybrid Cloud Interconnect architecture linking on-premises corporate data centers with public clouds (GCP/AWS) via dedicated Cloud Interconnect / Direct Connect, redundant IPsec VPN gateways, and hybrid identity federation."
  }
];

export function getArchitectureTypeById(id: string): ArchitectureTypeOption {
  return ARCHITECTURE_TYPES.find(t => t.id === id) || ARCHITECTURE_TYPES[0];
}

export function getDefaultXmlForArchitecture(archId?: string | null): string {
  if (archId === 'conceptual_diagram') {
    return compileSpecToDrawioXml(getBenchmarkItacsSpec());
  }
  if (archId === 'erd') {
    return compileSpecToDrawioXml(getBenchmarkErdSpec());
  }
  if (archId === 'agentic_rag' || archId === 'technical_diagram') {
    return compileSpecToDrawioXml(getBenchmarkAgenticRagSpec());
  }
  if (archId === 'sequence_diagram') {
    return compileSpecToDrawioXml(getBenchmarkSequenceDiagramSpec());
  }
  if (archId === 'data_ai_pipeline') {
    return compileSpecToDrawioXml(getBenchmarkDataAiPipelineSpec());
  }
  if (archId === 'secure_deployment_map') {
    return compileSpecToDrawioXml(getBenchmarkSecureDeploymentMapSpec());
  }
  if (archId === 'devops_cicd_pipeline') {
    return compileSpecToDrawioXml(getBenchmarkDevopsCicdPipelineSpec());
  }
  if (archId === 'governance_state_machine') {
    return compileSpecToDrawioXml(getBenchmarkGovernanceStateMachineSpec());
  }
  if (archId === 'unified_system_view') {
    return compileSpecToDrawioXml(getBenchmarkUnifiedSystemViewSpec());
  }
  if (archId === 'dark_mode_unified_system_view') {
    return compileSpecToDrawioXml(getBenchmarkDarkModeUnifiedSystemViewSpec());
  }

  return `
<mxfile host="embed.diagrams.net">
  <diagram id="clean_workspace" name="Clean Architecture Workspace">
    <mxGraphModel dx="1193" dy="853" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1000" pageHeight="950" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />
        <mxCell id="welcome_node" value="&lt;b&gt;[1] New Architecture Workspace&lt;/b&gt;&lt;br&gt;&lt;i&gt;Type a prompt in the AI box below to design your system with Gemini!&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DAE8FC;strokeColor=#6C8EBF;strokeWidth=2;fontFamily=Helvetica;fontSize=14;" vertex="1" parent="1">
          <mxGeometry x="350" y="250" width="300" height="80" as="geometry" />
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
  `.trim();
}

