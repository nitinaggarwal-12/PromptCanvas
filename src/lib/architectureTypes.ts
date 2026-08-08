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
    prompt: "Act as an AI Chief Architect and Cognitive Systems Engineer. Design an advanced Cognitive Architecture featuring Agentic Retrieval-Augmented Generation (RAG). It should include: multi-agent orchestration loops, dynamic tool execution, vector embedding database (pgvector/Pinecone), document chunking & ingestion pipelines, semantic search retrieval, LLM reasoning engine (Gemini 2.5 Pro/Flash), and fallback validation guardrails."
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
    id: "tech_rag_gcp",
    name: "Enterprise Vertex AI Vector Search",
    category: "AI & Cognitive Systems",
    whenToUse: "Enterprise GCP cloud infrastructure for high-scale AI Retrieval-Augmented Generation (RAG) featuring Vertex AI Text Embeddings, Vertex AI Vector Search, Cloud Run / GKE serving, BigQuery data source integration, and VPC Service Controls private security perimeters",
    prompt: "Act as a GCP AI Principal Infrastructure Architect. Design a production enterprise GCP infrastructure for Retrieval-Augmented Generation (RAG). Include: Automated ingestion pipelines from Cloud Storage and BigQuery, continuous embedding generation via Vertex AI Text Embeddings API, ultra-low-latency vector indexing & ANN retrieval in Vertex AI Vector Search, high-availability container serving on Cloud Run & GKE, Gemini 2.5 Pro/Flash enterprise LLM inference, and air-gapped security boundaries via VPC Service Controls and Cloud KMS encryption."
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
    id: "tech_cicd_pipeline",
    name: "Cloud-Native CI/CD Pipeline",
    category: "DevSecOps & Platform Engineering",
    whenToUse: "Enterprise DevSecOps CI/CD pipeline with Git polyrepo, SonarQube SAST, Cloud Build, ArgoCD, and Kubernetes",
    prompt: "Act as a Principal DevSecOps Architect. Design an enterprise technical CI/CD Pipeline architecture. Include: Git polyrepo source control (GitHub/GitLab) with branch protection rules, CI pipeline triggering automated unit tests, SAST code scanning (SonarQube/Snyk), and Docker container build in Cloud Build / GitHub Actions, artifact vulnerability scanning in Artifact Registry / ECR, GitOps deployment orchestration via ArgoCD / Flux to staging and production Kubernetes clusters (GKE/EKS), and automated rollback on Canary monitoring failure."
  },
  {
    id: "tech_microservices_gcp",
    name: "GCP Kubernetes & Zero-Trust VPC",
    category: "Cloud Infrastructure & Networking",
    whenToUse: "Production GCP GKE Kubernetes microservices cluster integrated with Zero-Trust VPC network infrastructure, Cloud Armor WAF, Istio mTLS, Cloud SQL HA, and Private Service Connect",
    prompt: "Act as a GCP Principal Cloud Native & Security Architect. Design a production GCP Kubernetes & Zero-Trust VPC Infrastructure combining: Cloud DNS, Cloud Armor WAF & DDoS Shield, Shared VPC multi-subnet networks, GKE Autopilot Cluster across Multi-Zone Private Subnets, Istio Service Mesh with mTLS, Private Service Connect (PSC) endpoints for Cloud Storage & BigQuery, Cloud SQL PostgreSQL database with Private IP, and Cloud Monitoring / Cloud Trace observability."
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
    id: "legacy_dependency_map",
    name: "Legacy Data & System Dependency Map (Strangler Fig)",
    category: "Cloud Infrastructure & Networking",
    whenToUse: "WBS 0.1.1 / 0.2.1 Legacy discovery and Strangler Fig transition architecture mapping on-prem monoliths (SAP ECC R/3, Mainframe z/OS, Oracle 11g, IBM DB2), data gravity anchors, and progressive strangler migration into GCP serverless production.",
    prompt: "Act as an Enterprise Data & Migration Architect. Design a production-grade WBS 0.1.1 / 0.2.1 Legacy Data & System Dependency Map and Strangler Fig Transition Architecture. Include: Stage 1 As-Is Discovery On-Premises Datacenter (SAP ECC R/3, Mainframe z/OS, Oracle 11g, IBM DB2, Message Queue, File Shares), Stage 2 Strangler reverse proxy, Stage 3 Microservice decoupling & Informatica ETL grid, and Stage 4 Optimized GCP To-Be Production Architecture (Cloud Run, Cloud SQL, BigQuery, Bigtable, Eventarc, Workflows)."
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
  }
];

export const ARCHITECTURE_TYPES: ArchitectureTypeOption[] = [
  ...BUSINESS_ARCHITECTURE_TYPES,
  ...TECHNICAL_ARCHITECTURE_TYPES
];

export function normalizeArchitectureId(archId?: string | null): string {
  if (!archId) return 'conceptual_diagram';
  const id = archId.toLowerCase().trim();
  if (id === 'business_agent_governance_hitl' || id === 'business_agent_gov_hitl') return 'business_agent_gov_hitl';
  if (id === 'tech_data_lakehouse' || id === 'tech_data_lakehouse_gcp' || id === 'data_lakehouse') return 'tech_data_lakehouse_gcp';
  if (id === 'tech_microservices_aws' || id === 'tech_microservices_gcp' || id === 'k8s_mesh') return 'tech_microservices_gcp';
  if (id === 'tech_event_driven_aws' || id === 'tech_event_driven_eda' || id === 'event_driven_aws') return 'tech_event_driven_eda';
  if (id.includes('6rs') || id.includes('six_rs') || id.includes('disposition')) return 'six_rs_migration_matrix';
  if (id.includes('hybrid_strangler') || id.includes('strangler_fig') || id === 'hybrid_strangler_transition') return 'hybrid_strangler_transition';
  if (id.includes('legacy') || id.includes('dependency_map')) return 'legacy_dependency_map';
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
  } else if (id === 'agentic_rag') {
    xml = compileSpecToDrawioXml(getBenchmarkAgenticRagSpec());
  } else if (id === 'sequence_diagram') {
    xml = getExactSequenceDiagramReferenceXml();
  } else if (id === 'data_ai_pipeline') {
    xml = getExactDataAiPipelineReferenceXml();
  } else if (id === 'secure_deployment_map') {
    xml = getExactSecureDeploymentMapReferenceXml();
  } else if (id === 'devops_cicd_pipeline') {
    xml = getExactDevopsCicdPipelineReferenceXml();
  } else if (id === 'unified_system_view') {
    xml = getExactUnifiedSystemViewReferenceXml();
  } else if (id === 'business_agent_gov_hitl' || id.includes('agent_governance') || id.includes('gov_hitl')) {
    const { getExactAgentGovernanceHitlReferenceXml } = require('./newEnterpriseReferenceXmls');
    xml = getExactAgentGovernanceHitlReferenceXml();
  } else if (id === 'tech_multi_agent_langgraph' || id.includes('langgraph')) {
    const { getExactMultiAgentLangGraphReferenceXml } = require('./newEnterpriseReferenceXmls');
    xml = getExactMultiAgentLangGraphReferenceXml();
  } else if (id === 'tech_agent_harness_runtime' || id.includes('agent_harness') || id.includes('agent_runtime')) {
    const { getExactAgentHarnessRuntimeReferenceXml } = require('./newEnterpriseReferenceXmls');
    xml = getExactAgentHarnessRuntimeReferenceXml();
  } else if (id === 'legacy_dependency_map') {
    const { getExactLegacyDependencyMapXml } = require('./newEnterpriseReferenceXmls');
    xml = getExactLegacyDependencyMapXml();
  } else if (id === 'six_rs_migration_matrix') {
    const { getExactSixRsMigrationMatrixXml } = require('./newEnterpriseReferenceXmls');
    xml = getExactSixRsMigrationMatrixXml();
  } else if (id === 'hybrid_strangler_transition') {
    const { getExactHybridStranglerTransitionXml } = require('./newEnterpriseReferenceXmls');
    xml = getExactHybridStranglerTransitionXml();
  } else if (id.startsWith('tech_') || id === 'serverless_gcp' || id === 'streaming_pipeline' || id === 'k8s_mesh' || id === 'data_lakehouse' || id === 'rag_gcp' || id === 'event_driven_aws' || id === 'multi_region_dr' || id === 'zero_trust' || id === 'hybrid_interconnect' || id === 'cicd_pipeline' || id === 'enterprise_devsecops_polyrepo') {
    xml = getTechnicalArchitectureXml(id);
  } else {
    xml = getTechnicalArchitectureXml(id || 'tech_serverless_gcp');
  }

  const isFlagshipBlueprint = (
    id === 'business_agent_gov_hitl' ||
    id === 'tech_multi_agent_langgraph' ||
    id === 'tech_c4_system_context' ||
    id === 'tech_modern_data_stack' ||
    id === 'tech_event_driven_eda' ||
    id === 'tech_agent_harness_runtime' ||
    id === 'tech_serverless_gcp' ||
    id === 'serverless_gcp' ||
    id === 'tech_multi_region_dr' ||
    id === 'multi_region_dr' ||
    id === 'legacy_dependency_map' ||
    id === 'six_rs_migration_matrix' ||
    id === 'hybrid_strangler_transition' ||
    id.includes('agent_harness')
  );

  if (!isFlagshipBlueprint) {
    const cleanUseCase = (useCaseContext && !/^\d+\.\s/.test(useCaseContext)) ? useCaseContext : undefined;
    const effectiveContext = cleanUseCase || userPrompt || getTemplateTitle(id);
    xml = injectUseCaseFlavor(xml, effectiveContext, userPrompt);
    xml = preflightVerifyAndHealXmlAcrossAll6Audits(xml, id);
  }

  return xml || null;
}
