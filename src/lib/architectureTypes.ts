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
    name: "1. Conceptual Diagram",
    category: "Business Architecture",
    whenToUse: "High-level 3-stage business architecture showing ingestion, processing hub, and strategic outcomes",
    prompt: "Enterprise Conceptual Platform:\n- Ingestion: Multi-channel data ingestion across core operational silos.\n- Processing Engine: Core Enterprise Synthesis Engine (Powered by Gemini Enterprise) executing data synthesis, document analysis, and strategic AI workflows.\n- Strategic Outcomes: System Efficiency, Fast Time-to-Value, Strategic Planning & Analysis.\n- Priority Alert: Real-Time Operational Strategy Monitoring."
  },
  {
    id: "erd",
    name: "2. Dimensional Data Model (ERD)",
    category: "Business Architecture",
    whenToUse: "Entity Relationship Diagram (ERD) with dimensional data models, fact/dimension tables, PK/FK, and cardinality",
    prompt: "Act as a Database Architect and Data Modeler. Design a comprehensive Dimensional Data Model (Entity Relationship Diagram - ERD) for an enterprise system. It should include: fact tables, dimension tables, primary and foreign key relationships, attributes, data types, and clear cardinality markings (1:1, 1:N, M:N)."
  },
  {
    id: "agentic_rag",
    name: "3. Cognitive Architecture (Agentic RAG)",
    category: "Business Architecture",
    whenToUse: "AI Cognitive Architecture with multi-agent orchestration, RAG retrieval, vector search, and LLM reasoning",
    prompt: "Act as an AI Chief Architect and Cognitive Systems Engineer. Design an advanced Cognitive Architecture featuring Agentic Retrieval-Augmented Generation (RAG). It should include: multi-agent orchestration loops, dynamic tool execution, vector embedding database (pgvector/Pinecone), document chunking & ingestion pipelines, semantic search retrieval, LLM reasoning engine (Gemini 2.5 Pro/Flash), and fallback validation guardrails."
  },
  {
    id: "sequence_diagram",
    name: "4. Micro Dynamic Sequence Diagram",
    category: "Business Architecture",
    whenToUse: "Micro UML sequence diagram detailing step-by-step API execution, PII checks, and ReAct loops",
    prompt: "Act as an API Chief Architect and Backend Systems Engineer. Design a chronologically exact, step-by-step Micro Dynamic Sequence Diagram (Execution Loop) for an Agentic RAG ecosystem. It should include: standard UML Sequence lifelines (rectangles on dashed lines), light cream background theme, synchronous solid arrows for API calls, dashed return arrows for context observations, and callout badges for PII/Ethical sourcing checks, ReAct Thought/Action loops, and IAM private access VPC-SC enforcement."
  },
  {
    id: "data_ai_pipeline",
    name: "5. Data & AI Pipeline",
    category: "Business Architecture",
    whenToUse: "Data & AI Pipeline combining DFD data ingestion, feature engineering, MLOps lifecycle, and serving",
    prompt: "Enterprise Data & AI Pipeline:\n- Data Ingestion (DFD): Multi-channel raw data ingestion and Cloud Lakehouse storage.\n- Feature Engineering: Automated pipeline transformations and Model-Ready Feature Store.\n- MLOps Lifecycle: Continuous model training, registry, inference API endpoints, and monitoring.\n- Serving & Analytics: Dashboards, Mobile/Web API serving, and telemetry analytics."
  },
  {
    id: "secure_deployment_map",
    name: "6. Secure Deployment Map",
    category: "Business Architecture",
    whenToUse: "Secure deployment topology map with edge load balancing, private VPC subnets, and security boundaries",
    prompt: "Enterprise Secure Deployment Map:\n- Zone 1: Edge & Ingress filtering (Cloud Armor WAF, External Load Balancer, API Gateway).\n- Zone 2: Private Network & Subnets (Application Subnets, Data/AI Subnets, Isolated Pods).\n- Security Perimeters: VPC Service Controls, IAM RBAC, Private Service Connect (PSC) endpoints."
  },
  {
    id: "devops_cicd_pipeline",
    name: "7. DevOps & CI/CD Pipeline",
    category: "Business Architecture",
    whenToUse: "Enterprise DevSecOps polyrepo CI/CD pipeline spanning Plan, Git Source, 3-track CI/CD, and promotion",
    prompt: "Enterprise DevSecOps Polyrepo CI/CD Pipeline:\n- Plan & Govern: Data modeling and architectural governance.\n- Git Source & IaC: Polyrepo source control with automated PR protection rules.\n- 3-Track CI/CD: Data Engineering, Application Code, and MLOps build & test tracks.\n- Evaluation & Promotion: Automated quality gates, human-in-the-loop approval, and canary deployment."
  },
  {
    id: "unified_system_view",
    name: "8. Unified System View",
    category: "Business Architecture",
    whenToUse: "Total unified system view combining data flow, MLOps, cognitive architecture, and deployment",
    prompt: "Total Unified System View:\n- Plan & Data Foundation: Enterprise architecture planning, data vetting, and schema lineage.\n- Development & AI Lifecycle: Data engineering DFD, feature store, model development, and governance.\n- Cognitive Architecture & Deployment: Secure VPC network, agent orchestrator, tool endpoints, and observability."
  },
  {
    id: "business_agent_governance_hitl",
    name: "9. Human-in-the-Loop Autonomous AI Agent Governance Lifecycle",
    category: "Business Architecture",
    whenToUse: "Executive workflow showing autonomous agent decision tiers, multi-dimensional risk matrix, confidence escalation rules (>=95%, 75-94%, <75%), and mandatory human sign-off gates",
    prompt: "Human-in-the-Loop Autonomous AI Agent Governance Lifecycle:\n- Tier 1: Multimodal Ingress & Constitutional HHH Safety Gate\n- Tier 2: Run State Machine & Confidence Escalation (>=95% Fast Path, 75-94% Supervisor AI Cross-Verification, <75% Mandatory HITL Escalation Router)\n- Tier 3: Human-in-the-Loop (HITL) Review Workbench & Cryptographic Sign-Off Certificate\n- Tier 4: Autonomous GUI Computer Use OS, Immutable Regulatory Audit Ledger & RLHF Fine-Tuning Feedback Loop"
  }
];

export const TECHNICAL_ARCHITECTURE_TYPES: ArchitectureTypeOption[] = [
  {
    id: "tech_multi_agent_langgraph",
    name: "0. Flagship Stateful Multi-Agent Orchestration Engine (LangGraph DAG)",
    category: "Technical Architecture",
    whenToUse: "Flagship stateful Directed Acyclic Graph (DAG) multi-agent orchestration engine featuring Master Supervisor Router, parallel worker cluster, sandboxed code execution, human-in-the-loop gates, and pgvector long-term memory store",
    prompt: "Flagship Stateful Directed Acyclic Graph (DAG) Multi-Agent Orchestration Platform:\n- Tier 1: Multimodal WebRTC / 2M+ Token Long-Context Ingress, Master Directed Graph Supervisor Agent & Run State Machine Checkpoint Store\n- Tier 2: Specialized Autonomous Worker Cluster (Research & Grounding Agent, Code/SQL/GUI Synthesis Agent, Verification & Safety Critic Agent) with Hierarchical Peer Hand-off Routines\n- Tier 3: Parallel Sandboxed Code Execution Kernel, Autonomous GUI OS Computer Use Container, gRPC/REST Tool Call Gateway & Long-Term Vector Memory with Ephemeral System Prompt Caching (90% Cost Cut)\n- Tier 4: Run Lifecycle Human Interrupt Approval Gate (requires_action), Final Grounded Response Synthesizer & Distributed Trace Observability"
  },
  {
    id: "tech_serverless_gcp",
    name: "1. Serverless Web Application (GCP)",
    category: "Technical Architecture",
    whenToUse: "Serverless web application on GCP using Cloud Run, Cloud CDN, Load Balancing, and Cloud SQL",
    prompt: "Act as a GCP Cloud Technical Architect. Design a detailed technical architecture for a serverless web application on Google Cloud. Include: Cloud DNS, Cloud CDN, External HTTP(S) Load Balancing with Cloud Armor WAF rules, Cloud Run microservices for frontend and APIs, Serverless VPC Access connectors, Cloud SQL for PostgreSQL with private IP, Cloud Storage buckets for static assets, and Cloud IAM / Secret Manager for security."
  },
  {
    id: "tech_streaming_analytics",
    name: "2. GCP Real-Time Streaming Analytics & Telemetry Pipeline",
    category: "Technical Architecture",
    whenToUse: "Real-time streaming analytics and IoT/Edge telemetry ingestion pipeline on GCP using MQTT field gateways, Cloud Pub/Sub, Dataflow Beam ETL, Vertex AI Feature Store, Cloud Bigtable, and BigQuery",
    prompt: "Act as a GCP Big Data & Edge IoT Principal Architect. Design a unified GCP Real-Time Streaming Analytics & Telemetry Pipeline combining: Edge device field gateways (MQTT/HTTPS) & Web telemetry ingestion, Cloud Pub/Sub high-throughput topics and subscriptions, streaming ETL processing via Cloud Dataflow (Apache Beam), real-time feature engineering into Vertex AI Feature Store, time-series & analytical warehousing in Cloud Bigtable and BigQuery with partitioned tables, and interactive operational dashboards via Looker Studio / Grafana."
  },
  {
    id: "tech_microservices_aws",
    name: "3. AWS Production Kubernetes & Zero-Trust VPC Infrastructure",
    category: "Technical Architecture",
    whenToUse: "Production AWS EKS Kubernetes microservices cluster integrated with Zero-Trust VPC network infrastructure, AWS Transit Gateway, AWS Network Firewall, Istio mTLS, Aurora, and PrivateLink",
    prompt: "Act as an AWS Principal Cloud Native & Security Architect. Design a production AWS Kubernetes & Zero-Trust VPC Infrastructure combining: Route 53 DNS, AWS Shield & WAF, AWS Transit Gateway connecting multi-VPC networks, AWS Network Firewall & GuardDuty inspection subnets, Application Load Balancer (ALB) Ingress Controller, AWS EKS Kubernetes Cluster across 3 Multi-AZ Private Subnets, Istio Service Mesh with mTLS, AWS PrivateLink VPC Endpoints for S3 & DynamoDB, Amazon RDS Aurora PostgreSQL database, and Prometheus/Grafana CloudWatch observability."
  },
  {
    id: "tech_data_lakehouse",
    name: "4. Data Lakehouse (AWS)",
    category: "Technical Architecture",
    whenToUse: "Data Lakehouse architecture on AWS using S3 tiers, Glue Data Catalog, Athena, and Redshift Spectrum",
    prompt: "Act as an AWS Data Platform Architect. Design a modern technical Data Lakehouse architecture on AWS. Include: Data ingestion via AWS Lake Formation, Amazon Kinesis Data Streams, landing zones in Amazon S3 (Raw, Clean, Curated tiers), automated schema discovery via AWS Glue Crawlers and Glue Data Catalog, serverless SQL querying via Amazon Athena, enterprise data warehousing with Amazon Redshift Spectrum, and centralized IAM/lake governance."
  },
  {
    id: "tech_rag_gcp",
    name: "5. GCP Enterprise Vertex AI Vector Search & RAG Infrastructure",
    category: "Technical Architecture",
    whenToUse: "Enterprise GCP cloud infrastructure for high-scale AI Retrieval-Augmented Generation (RAG) featuring Vertex AI Text Embeddings, Vertex AI Vector Search, Cloud Run / GKE serving, BigQuery data source integration, and VPC Service Controls private security perimeters",
    prompt: "Act as a GCP AI Principal Infrastructure Architect. Design a production enterprise GCP infrastructure for Retrieval-Augmented Generation (RAG). Include: Automated ingestion pipelines from Cloud Storage and BigQuery, continuous embedding generation via Vertex AI Text Embeddings API, ultra-low-latency vector indexing & ANN retrieval in Vertex AI Vector Search, high-availability container serving on Cloud Run & GKE, Gemini 2.5 Pro/Flash enterprise LLM inference, and air-gapped security boundaries via VPC Service Controls and Cloud KMS encryption."
  },
  {
    id: "tech_event_driven_aws",
    name: "6. Event-Driven Microservices (AWS)",
    category: "Technical Architecture",
    whenToUse: "Decoupled event-driven microservices on AWS using EventBridge, Lambda, Step Functions, SQS, and DynamoDB",
    prompt: "Act as an AWS Serverless Architect. Design a decoupled event-driven microservices technical architecture on AWS. Include: API Gateway ingress, Amazon EventBridge central event bus with rules and schema registry, asynchronous processing via AWS Lambda and AWS Step Functions, message queuing via Amazon SQS and SNS topic fan-out, high-performance NoSQL state storage in Amazon DynamoDB, and distributed tracing with AWS X-Ray."
  },
  {
    id: "tech_multi_region_dr",
    name: "7. Multi-Region Disaster Recovery (GCP)",
    category: "Technical Architecture",
    whenToUse: "Multi-region active-passive disaster recovery on GCP with global DNS failover and Spanner/Cloud SQL replication",
    prompt: "Act as a GCP Reliability Engineer. Design a multi-region active-passive Disaster Recovery (DR) technical architecture on Google Cloud. Include: Global Cloud DNS with failover routing policies, External Global Load Balancers across Primary (us-central1) and Secondary (us-east4) regions, multi-region GKE / Cloud Run compute clusters, synchronous replication, and automated failover monitoring."
  },
  {
    id: "tech_cicd_pipeline",
    name: "8. CI/CD Pipeline Architecture",
    category: "Technical Architecture",
    whenToUse: "Enterprise DevSecOps CI/CD pipeline with Git polyrepo, SonarQube SAST, Cloud Build, ArgoCD, and Kubernetes",
    prompt: "Act as a Principal DevSecOps Architect. Design an enterprise technical CI/CD Pipeline architecture. Include: Git polyrepo source control (GitHub/GitLab) with branch protection rules, CI pipeline triggering automated unit tests, SAST code scanning (SonarQube/Snyk), and Docker container build in Cloud Build / GitHub Actions, artifact vulnerability scanning in Artifact Registry / ECR, GitOps deployment orchestration via ArgoCD / Flux to staging and production Kubernetes clusters (GKE/EKS), and automated rollback on Canary monitoring failure."
  },
  {
    id: "tech_c4_system_context",
    name: "9. C4 Enterprise System Context & Container Model",
    category: "Technical Architecture",
    whenToUse: "C4 Model Level 1 Context & Level 2 Containers mapping external B2B actors, IAP auth gateway, core serverless containers, database core, and third-party SaaS APIs",
    prompt: "C4 Enterprise System Context & Container Model: External B2B Customers & SRE Staff -> Identity Gateway & API Gateway -> Core Next.js SPA & Cloud Run API Microservices -> AlloyDB HA Database & Stripe/FedEx External APIs."
  },
  {
    id: "tech_modern_data_stack",
    name: "10. Modern Data Stack (CDC, Data Contracts, dbt & Reverse ETL)",
    category: "Technical Architecture",
    whenToUse: "Modern analytics engineering pipeline combining Debezium CDC, automated Data Contracts quality gates, dbt Silver/Gold marts, and Reverse ETL back to CRM",
    prompt: "Modern Data Stack with CDC & Reverse ETL: Production OLTP PostgreSQL -> Debezium CDC -> Data Contracts & Quality Gate -> dbt Core Silver/Gold Marts -> Looker BI & Reverse ETL Engine (Hightouch/Census) syncing to Salesforce."
  },
  {
    id: "tech_event_driven_eda",
    name: "11. Enterprise Event-Driven Microservices Architecture (EDA & Kafka Mesh)",
    category: "Technical Architecture",
    whenToUse: "Decoupled enterprise event-driven architecture featuring Order producers, Schema Registry contract validation, Kafka/PubSub multi-topic broker, Dead-Letter Queue (DLQ) recovery, and decoupled GKE consumer groups",
    prompt: "Enterprise Event-Driven Architecture (EDA): Order Microservice Producers -> Schema Registry Avro Gate -> Partitioned Kafka/PubSub Broker -> Dead-Letter Queue (DLQ) automated recovery -> GKE Decoupled Consumer Groups -> Cloud Spanner Immutable Event Ledger."
  },
  {
    id: "tech_agent_harness_runtime",
    name: "12. Enterprise Agent Harness Runtime Platform (AI Operating System Kernel)",
    category: "AI & Agentic Systems Architecture",
    whenToUse: "Production enterprise AI agent harness platform featuring LiteLLM routing, MCP protocol, hierarchical memory, context compactor, zero-trust IAM, 6-step sandboxed graph engine (gVisor/E2B), and continuous evaluation",
    previewImage: "/templates/agent_harness_runtime_enhanced.png",
    prompt: `Why most enterprise AI agents fail after deployment: We treated them like scripts instead of operating systems.

For the past year, the industry has been obsessed with orchestrating agent workflows—drawing state graphs, chaining tools, and defining dynamic decision trees.

But here is the reality engineering teams face the moment an agent touches live enterprise infrastructure:

A workflow graph is only as reliable as the runtime boundary encapsulating it.

If an agent writes Python to aggregate customer data, where does that code actually execute?
If an API call times out mid-transaction, how does state rollback work?
If a prompt injection attempts to exfiltrate database records, what kernel intercepts the system call?

To move from fragile AI prototypes to mission-critical infrastructure, we have to borrow the architectural playbook of Modern Operating Systems:

1. The LLM is the CPU — Not the Application
An LLM performs probabilistic computation and reasoning. Just as an OS never allows an unprivileged CPU instruction to read raw kernel memory directly, an enterprise agent runtime must enforce strict syscall isolation:
- Tools are accessed through standardized, capability-based protocols (like MCP).
- Permissions are ephemeral, scoped down to individual parameters via short-lived cryptographic tokens.

2. The Context Window is L1/L2 Cache
Treating the context window as an unbounded document dump causes prompt drift, attention dilution, and staggering latency.
- KV Prefix Caching provides instant memory lookups for invariant system state.
- Hierarchical Token Compaction acts as active garbage collection—pruning transient conversational noise while persisting core execution checkpoints to cold storage.

3. MicroVM Isolation is the Hypervisor Boundary
Allowing an autonomous model to run interpreter scripts in your application container is a catastrophic security risk. Modern runtime harnesses execute all generated code inside isolated MicroVMs (e.g., gVisor, E2B, Firecracker) with strict zero-network egress defaults.

4. The Self-Healing Kernel: Automatic Trace Reflection
In classical software, an uncaught exception triggers a kernel panic. In an agent runtime, exceptions are feedforward inputs. The harness intercepts standard error output, packages the trace into an isolated evaluation sub-node, and triggers a deterministic self-healing patch loop before failing out to human operators.

💡 The Big Takeaway
State machines and graph orchestrators define what the agent intends to do.
The Harness Runtime guarantees how safely, durably, and deterministically it survives in production.

If you are building AI agents for the enterprise today, you aren't just writing prompts—you are building an AI Operating System.

💬 For teams deploying autonomous agents to production: What has been your biggest runtime challenge—sandboxing untrusted code, context window garbage collection, or state checkpoint recovery?

#SystemsEngineering #AgentHarness #InfrastructureArchitecture #PlatformEngineering #LLMOps #CyberSecurity #EnterpriseAI #DistributedSystems`
  },
  {
    id: "v2_freeform",
    name: "Freeform Technical (V2)",
    category: "Technical Architecture",
    whenToUse: "Freeform untyped technical architecture diagram generated dynamically via ELK.js layout engine",
    prompt: "Freeform technical architecture generated via Pipeline V2 deterministic ELK.js layout engine."
  }
];

export const ARCHITECTURE_TYPES: ArchitectureTypeOption[] = [
  ...BUSINESS_ARCHITECTURE_TYPES,
  ...TECHNICAL_ARCHITECTURE_TYPES
];

export function getArchitectureTypeById(id: string): ArchitectureTypeOption {
  return ARCHITECTURE_TYPES.find(t => t.id === id) || BUSINESS_ARCHITECTURE_TYPES[0];
}

export function getTemplateTitle(archId?: string | null): string {
  if (!archId) return 'Architecture Diagram';
  const opt = ARCHITECTURE_TYPES.find(t => t.id === archId);
  if (opt) return opt.name;
  return archId;
}

export function getDefaultXmlForArchitecture(archId?: string | null, useCaseContext?: string, userPrompt?: string): string | null {
  if (archId === 'v2_freeform') {
    return null;
  }
  let xml = '';

  if (archId === 'conceptual_diagram') {
    xml = getExactItacsReferenceXml();
  } else if (archId === 'erd') {
    xml = compileSpecToDrawioXml(getBenchmarkErdSpec());
  } else if (archId === 'agentic_rag') {
    xml = compileSpecToDrawioXml(getBenchmarkAgenticRagSpec());
  } else if (archId === 'sequence_diagram') {
    xml = getExactSequenceDiagramReferenceXml();
  } else if (archId === 'data_ai_pipeline') {
    xml = getExactDataAiPipelineReferenceXml();
  } else if (archId === 'secure_deployment_map') {
    xml = getExactSecureDeploymentMapReferenceXml();
  } else if (archId === 'devops_cicd_pipeline') {
    xml = getExactDevopsCicdPipelineReferenceXml();
  } else if (archId === 'unified_system_view') {
    xml = getExactUnifiedSystemViewReferenceXml();
  } else if (archId === 'business_agent_governance_hitl' || archId?.includes('agent_governance')) {
    const { getExactAgentGovernanceHitlReferenceXml } = require('./newEnterpriseReferenceXmls');
    xml = getExactAgentGovernanceHitlReferenceXml();
  } else if (archId === 'tech_multi_agent_langgraph' || archId?.includes('langgraph')) {
    const { getExactMultiAgentLangGraphReferenceXml } = require('./newEnterpriseReferenceXmls');
    xml = getExactMultiAgentLangGraphReferenceXml();
  } else if (archId && (archId.startsWith('tech_') || archId === 'serverless_gcp' || archId === 'streaming_pipeline' || archId === 'k8s_mesh' || archId === 'data_lakehouse' || archId === 'rag_gcp' || archId === 'event_driven_aws' || archId === 'multi_region_dr' || archId === 'zero_trust' || archId === 'hybrid_interconnect' || archId === 'cicd_pipeline' || archId === 'enterprise_devsecops_polyrepo')) {
    xml = getTechnicalArchitectureXml(archId);
  } else if (archId === 'v2_freeform') {
    xml = getTechnicalArchitectureXml('tech_serverless_gcp');
  } else {
    xml = getTechnicalArchitectureXml(archId || 'tech_serverless_gcp');
  }

  const isFlagshipBlueprint = (
    archId === 'business_agent_governance_hitl' ||
    archId === 'tech_multi_agent_langgraph' ||
    archId === 'tech_c4_system_context' ||
    archId === 'tech_modern_data_stack' ||
    archId === 'tech_event_driven_eda' ||
    archId === 'tech_agent_harness_runtime' ||
    archId?.includes('agent_harness')
  );

  if (!isFlagshipBlueprint) {
    const cleanUseCase = (useCaseContext && !/^\d+\.\s/.test(useCaseContext)) ? useCaseContext : undefined;
    const effectiveContext = cleanUseCase || userPrompt || getTemplateTitle(archId || '');
    xml = injectUseCaseFlavor(xml, effectiveContext, userPrompt);
    xml = preflightVerifyAndHealXmlAcrossAll6Audits(xml, archId || 'unified_system_view');
  }

  return xml;
}
