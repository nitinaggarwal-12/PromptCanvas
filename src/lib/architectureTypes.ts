import { getTechnicalArchitectureXml } from '@/lib/technicalArchitectureXmls';
export { getTechnicalArchitectureXml };
import {
  compileSpecToDrawioXml,
  getExactItacsReferenceXml,
  getExactSequenceDiagramReferenceXml,
  getExactMacroSequenceDiagramReferenceXml,
  getExactDataAiPipelineReferenceXml,
  getExactSecureDeploymentMapReferenceXml,
  getExactDevopsCicdPipelineReferenceXml,
  getExactGovernanceStateMachineReferenceXml,
  getExactUnifiedSystemViewReferenceXml,
  getExactDarkModeUnifiedSystemViewReferenceXml,
  getExactEvalSafetyBenchmarkingReferenceXml,
  getBenchmarkItacsSpec,
  getBenchmarkErdSpec,
  getBenchmarkAgenticRagSpec,
  getBenchmarkSequenceDiagramSpec,
  getBenchmarkMacroSequenceDiagramSpec,
  getBenchmarkDataAiPipelineSpec,
  getBenchmarkSecureDeploymentMapSpec,
  getBenchmarkDevopsCicdPipelineSpec,
  getBenchmarkGovernanceStateMachineSpec,
  getBenchmarkUnifiedSystemViewSpec,
  getBenchmarkDarkModeUnifiedSystemViewSpec,
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
    id: "macro_sequence_diagram",
    name: "5. Macro Dynamic Sequence Diagram",
    category: "Business Architecture",
    whenToUse: "4-phase end-to-end macro sequence diagram across data ingestion, MLOps, RAG, and delivery",
    prompt: "Enterprise End-to-End System Flow:\n- Phase 1: Data Ingestion, Feature Engineering & Lineage Logging.\n- Phase 2: MLOps Lifecycle: Model Training, Evaluation, Approval, Deployment & Monitoring.\n- Phase 3: GenAI / Agentic RAG Orchestration & Analytics Tooling.\n- Phase 4: Prototype Delivery & System Telemetry Logging."
  },
  {
    id: "data_ai_pipeline",
    name: "6. Data & AI Pipeline",
    category: "Business Architecture",
    whenToUse: "Data & AI Pipeline combining DFD data ingestion, feature engineering, MLOps lifecycle, and serving",
    prompt: "Enterprise Data & AI Pipeline:\n- Data Ingestion (DFD): Multi-channel raw data ingestion and Cloud Lakehouse storage.\n- Feature Engineering: Automated pipeline transformations and Model-Ready Feature Store.\n- MLOps Lifecycle: Continuous model training, registry, inference API endpoints, and monitoring.\n- Serving & Analytics: Dashboards, Mobile/Web API serving, and telemetry analytics."
  },
  {
    id: "secure_deployment_map",
    name: "7. Secure Deployment Map",
    category: "Business Architecture",
    whenToUse: "Secure deployment topology map with edge load balancing, private VPC subnets, and security boundaries",
    prompt: "Enterprise Secure Deployment Map:\n- Zone 1: Edge & Ingress filtering (Cloud Armor WAF, External Load Balancer, API Gateway).\n- Zone 2: Private Network & Subnets (Application Subnets, Data/AI Subnets, Isolated Pods).\n- Security Perimeters: VPC Service Controls, IAM RBAC, Private Service Connect (PSC) endpoints."
  },
  {
    id: "devops_cicd_pipeline",
    name: "8. DevOps & CI/CD Pipeline",
    category: "Business Architecture",
    whenToUse: "Enterprise DevSecOps polyrepo CI/CD pipeline spanning Plan, Git Source, 3-track CI/CD, and promotion",
    prompt: "Enterprise DevSecOps Polyrepo CI/CD Pipeline:\n- Plan & Govern: Data modeling and architectural governance.\n- Git Source & IaC: Polyrepo source control with automated PR protection rules.\n- 3-Track CI/CD: Data Engineering, Application Code, and MLOps build & test tracks.\n- Evaluation & Promotion: Automated quality gates, human-in-the-loop approval, and canary deployment."
  },
  {
    id: "governance_state_machine",
    name: "9. Governance & State Machine",
    category: "Business Architecture",
    whenToUse: "Unified governance & state-machine lifecycle tracking model vetting, training, audits, and archival",
    prompt: "Unified Governance & State-Machine Lifecycle:\n- Vetting & Modeling: Ethical data vetting, PII checks, and reference data modeling.\n- Training & Evaluation: Offline metrics, bias & fairness audits, explainability reports.\n- Governance Boundary: Compliance audit, adversarial red-teaming, societal bias & security checks.\n- Deployment & Archival: Canary deployment, drift monitoring, continuous observation, and archival."
  },
  {
    id: "unified_system_view",
    name: "10. Unified System View",
    category: "Business Architecture",
    whenToUse: "Total unified system view combining data flow, MLOps, cognitive architecture, and deployment",
    prompt: "Total Unified System View:\n- Plan & Data Foundation: Enterprise architecture planning, data vetting, and schema lineage.\n- Development & AI Lifecycle: Data engineering DFD, feature store, model development, and governance.\n- Cognitive Architecture & Deployment: Secure VPC network, agent orchestrator, tool endpoints, and observability."
  },
  {
    id: "dark_mode_unified_system_view",
    name: "11. Architecture",
    category: "Business Architecture",
    whenToUse: "Dark mode unified system view mapping data flow, orchestration, time, and governance",
    prompt: "Total Unified System View (Dark Mode):\n- Plan & Data Foundation: Enterprise architecture planning, data vetting, and schema lineage.\n- Development & AI Lifecycle: Data engineering DFD, feature store, model development, and governance.\n- Cognitive Architecture & Deployment: Secure VPC network, agent orchestrator, tool endpoints, and observability."
  },
  {
    id: "business_agent_governance_hitl",
    name: "12. Human-in-the-Loop Autonomous AI Agent Governance Lifecycle",
    category: "Business Architecture",
    whenToUse: "Executive workflow showing autonomous agent decision tiers, multi-dimensional risk matrix, confidence escalation rules (>=95%, 75-94%, <75%), and mandatory human sign-off gates",
    prompt: "Human-in-the-Loop Autonomous AI Agent Governance Lifecycle:\n- Tier 1: Multimodal Ingress & Constitutional HHH Safety Gate\n- Tier 2: Run State Machine & Confidence Escalation (>=95% Fast Path, 75-94% Supervisor AI Cross-Verification, <75% Mandatory HITL Escalation Router)\n- Tier 3: Human-in-the-Loop (HITL) Review Workbench & Cryptographic Sign-Off Certificate\n- Tier 4: Autonomous GUI Computer Use OS, Immutable Regulatory Audit Ledger & RLHF Fine-Tuning Feedback Loop"
  },
  {
    id: "eval_safety_benchmarking",
    name: "13. End-to-End Enterprise AI Safety, NLI Claim Benchmarking & Red-Teaming Flow",
    category: "Business Architecture",
    whenToUse: "Automated evaluation harnesses (Ragas / G-Eval), NLI factual claim verification, toxicity screening, and automated safety red-teaming flow",
    prompt: "END-TO-END ENTERPRISE AI SAFETY, NLI CLAIM BENCHMARKING & RED-TEAMING FLOW:\n- Continuous Integration (CI) & Data Ingestion: Model Checkpoints, Reference & Distractor Datasets, Test Prompts & Scenarios.\n- Automated Evaluation: Performance Metrics (Context Relevance, Faithfulness, Answer Relevance) + NLI Claim Verification (Isolate Claims, Retrieve Supporting Evidence, Classify Claims as Entailed/Contradicted/Neutral) -> Evaluation Results Aggregator.\n- Safety Red-Teaming & Screening: Toxicity & Bias Screening + Safety Red-Teaming (Simulate Jailbreak Attempts, Prompt Injection/Adversarial Attacks, Check against Safety Guidelines) -> Safety Decision Gate.\n- Model Promotion & Deployment: High Quality AND Safety Passed -> Model Promotion -> Production Endpoint Deployment. Low Quality/Reliability -> Block & Remediate. Failed -> Immediate Halt -> AI Safety Team Intervention & Model Retraining."
  }
];

export const TECHNICAL_ARCHITECTURE_TYPES: ArchitectureTypeOption[] = [
  {
    id: "tech_multi_agent_langgraph",
    name: "0. Multi-Agent Autonomous Orchestration Platform (Stateful Directed Acyclic Graph)",
    category: "Technical Architecture",
    whenToUse: "Production Stateful Directed Acyclic Graph multi-agent platform with Master Agent Router, worker agents, parallel Cloud Run code sandbox, and pgvector long-term memory store",
    prompt: "Multi-Agent Autonomous Orchestration Platform (Stateful Directed Acyclic Graph):\n- Tier 1: Multimodal WebRTC / 2M+ Token Long-Context Ingress, Master Directed Graph Supervisor Agent & Run State Machine Checkpoint Store\n- Tier 2: Specialized Autonomous Worker Cluster (Research & Grounding Agent, Code/SQL/GUI Synthesis Agent, Verification & Safety Critic Agent) with Hierarchical Peer Hand-off Routines\n- Tier 3: Parallel Sandboxed Code Execution Kernel, Autonomous GUI OS Computer Use Container, gRPC/REST Tool Call Gateway & Long-Term Vector Memory with Ephemeral System Prompt Caching (90% Cost Cut)\n- Tier 4: Run Lifecycle Human Interrupt Approval Gate (requires_action), Final Grounded Response Synthesizer & Distributed Trace Observability"
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
    name: "2. Real-time Streaming Analytics (GCP)",
    category: "Technical Architecture",
    whenToUse: "Real-time streaming analytics pipeline on GCP using Pub/Sub, Dataflow, Vertex AI, and BigQuery",
    prompt: "Act as a GCP Big Data Architect. Design a real-time streaming analytics technical architecture on Google Cloud. Include: IoT/Web event telemetry ingestion via Cloud Pub/Sub topics and subscriptions, streaming ETL processing via Cloud Dataflow (Apache Beam), real-time feature engineering into Vertex AI Feature Store, analytical warehousing in BigQuery with partitioned tables, and interactive dashboards via Looker Studio / Grafana."
  },
  {
    id: "tech_microservices_aws",
    name: "3. Microservices Kubernetes Cluster (AWS)",
    category: "Technical Architecture",
    whenToUse: "Kubernetes microservices cluster on AWS EKS with ALB Ingress, Istio Mesh, RDS Aurora, and Prometheus",
    prompt: "Act as an AWS Cloud Native Architect. Design a production-grade microservices architecture on AWS EKS (Amazon Elastic Kubernetes Service). Include: Route 53 DNS, AWS Shield & WAF, Application Load Balancer (ALB) Ingress Controller, EKS Cluster across 3 Multi-AZ VPC subnets, Istio Service Mesh with mTLS, Amazon ECR registry, AWS App Mesh / Cloud Map, Amazon RDS Aurora PostgreSQL database, and Prometheus/Grafana CloudWatch observability."
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
    name: "5. AI Retrieval-Augmented Generation / RAG (GCP)",
    category: "Technical Architecture",
    whenToUse: "AI RAG system on GCP using Vertex AI Embeddings, Vector Search, Cloud Run/GKE, and Gemini 1.5",
    prompt: "Act as a GCP AI Principal Architect. Design an advanced technical Cognitive Architecture for AI Retrieval-Augmented Generation (RAG) on Google Cloud. Include: Ingestion pipelines from Cloud Storage and BigQuery, embedding generation via Vertex AI Text Embeddings API, high-scale vector indexing in Vertex AI Vector Search (formerly Matching Engine), agent orchestration on Cloud Run / GKE with LlamaIndex/LangChain, LLM reasoning with Gemini 1.5 Pro/Flash, and VPC Service Controls private security perimeters."
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
    id: "tech_vpc_infra",
    name: "8. Secure VPC Network Infrastructure (AWS)",
    category: "Technical Architecture",
    whenToUse: "Zero-Trust secure VPC network infrastructure on AWS with Transit Gateway, Network Firewall, and PrivateLink",
    prompt: "Act as an AWS Network & Security Architect. Design a Zero-Trust Secure VPC Network Infrastructure on AWS. Include: AWS Transit Gateway connecting Shared Services, Production, and Development VPCs, dual-stack IPv4/IPv6 routing, AWS Network Firewall and GuardDuty inspection subnets, NAT Gateways in Public subnets, isolated Private Application and Database subnets, VPC Endpoints (PrivateLink) for S3 and DynamoDB, and AWS KMS encryption with centralized IAM SCPs."
  },
  {
    id: "tech_iot_telemetry",
    name: "9. IoT Telemetry Ingestion (GCP)",
    category: "Technical Architecture",
    whenToUse: "Industrial IoT telemetry ingestion on GCP using MQTT field gateways, Pub/Sub, Dataflow, Bigtable, and BigQuery",
    prompt: "Act as a GCP IoT & Edge Computing Architect. Design an industrial IoT Telemetry Ingestion technical architecture on Google Cloud. Include: Edge device field gateways using MQTT/HTTPS protocols, Cloud Pub/Sub high-throughput telemetry stream ingress, stream processing and anomaly detection using Cloud Dataflow, time-series data storage in Bigtable and BigQuery, device metadata in Cloud SQL, and real-time operational alerting via Vertex AI Model Monitoring and Cloud Functions."
  },
  {
    id: "tech_cicd_pipeline",
    name: "10. CI/CD Pipeline Architecture",
    category: "Technical Architecture",
    whenToUse: "Enterprise DevSecOps CI/CD pipeline with Git polyrepo, SonarQube SAST, Cloud Build, ArgoCD, and Kubernetes",
    prompt: "Act as a Principal DevSecOps Architect. Design an enterprise technical CI/CD Pipeline architecture. Include: Git polyrepo source control (GitHub/GitLab) with branch protection rules, CI pipeline triggering automated unit tests, SAST code scanning (SonarQube/Snyk), and Docker container build in Cloud Build / GitHub Actions, artifact vulnerability scanning in Artifact Registry / ECR, GitOps deployment orchestration via ArgoCD / Flux to staging and production Kubernetes clusters (GKE/EKS), and automated rollback on Canary monitoring failure."
  },
  {
    id: "v2_freeform",
    name: "Freeform Technical (V2)",
    category: "Technical Architecture",
    whenToUse: "Freeform untyped technical architecture diagram generated dynamically via ELK.js layout engine",
    prompt: "Freeform technical architecture generated via Pipeline V2 deterministic ELK.js layout engine."
  },
  {
    id: "vertex_ai_graphrag",
    name: "26. Google Vertex AI GraphRAG Enterprise Architecture (Latest Google AI Stack)",
    category: "Technical Architecture",
    whenToUse: "Google's latest flagship enterprise AI architecture combining Gemini 2.5 Flash Ephemeral Caching, Vertex AI Graph Search Index, Google Spanner/AlloyDB Graph, and Multi-Hop Relational Knowledge Graph reasoning",
    prompt: "Google Vertex AI GraphRAG Enterprise Architecture:\n- Ingress & Ephemeral Caching: Enterprise Workspace Ingress -> Gemini 2.5 Flash Ephemeral Context Caching Router (90% OPEX cut).\n- Graph Knowledge Engine: Google Spanner Graph & AlloyDB Relational Entity Graph -> Vertex AI GraphRAG Multi-Hop Index.\n- Semantic & Relational Synthesis: Gemini 2.5 Pro Relational Synthesis Engine -> VPC Service Controls Enclave -> Real-Time Executive Insights."
  },
  {
    id: "google_a2a_agentic_ecosystem",
    name: "27. Google Agent-to-Agent (A2A) Autonomous Enterprise Protocol",
    category: "Technical Architecture",
    whenToUse: "Google's latest enterprise Agent-to-Agent (A2A) delegation protocol linking Vertex AI Agent Builder, Google Workspace extensions, and private cloud agent enclaves",
    prompt: "Google Agent-to-Agent (A2A) Autonomous Enterprise Protocol:\n- Primary Orchestrator: Master Vertex AI A2A Protocol Supervisor -> Ephemeral Context Caching Gate.\n- Federated Agent Network: Research Agent -> SQL/BigQuery Synthesis Agent -> Compliance & Safety Critic Agent via A2A Signed Protocol Tokens.\n- Execution & Audit: Private Cloud Run Execution Sandbox -> Cryptographic Cryptographic HITL Audit Trail."
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
  // Handle version number or technical ID matching
  if (archId.includes('serverless')) return '1. Serverless Web Application (GCP)';
  if (archId.includes('streaming')) return '2. Real-time Streaming Analytics (GCP)';
  if (archId.includes('microservices') || archId.includes('k8s')) return '3. Microservices Kubernetes Cluster (AWS)';
  if (archId.includes('lakehouse')) return '4. Data Lakehouse (AWS)';
  if (archId.includes('rag')) return '5. AI Retrieval-Augmented Generation / RAG (GCP)';
  if (archId.includes('event_driven')) return '6. Event-Driven Microservices (AWS)';
  if (archId.includes('multi_region')) return '7. Multi-Region Disaster Recovery (GCP)';
  if (archId.includes('vpc')) return '8. Secure VPC Network Infrastructure (AWS)';
  if (archId.includes('iot')) return '9. IoT Telemetry Ingestion (GCP)';
  if (archId.includes('cicd')) return '10. CI/CD Pipeline Architecture';
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
  } else if (archId === 'macro_sequence_diagram') {
    xml = getExactMacroSequenceDiagramReferenceXml();
  } else if (archId === 'data_ai_pipeline') {
    xml = getExactDataAiPipelineReferenceXml();
  } else if (archId === 'secure_deployment_map') {
    xml = getExactSecureDeploymentMapReferenceXml();
  } else if (archId === 'devops_cicd_pipeline') {
    xml = getExactDevopsCicdPipelineReferenceXml();
  } else if (archId === 'governance_state_machine') {
    xml = getExactGovernanceStateMachineReferenceXml();
  } else if (archId === 'unified_system_view') {
    xml = getExactUnifiedSystemViewReferenceXml();
  } else if (archId === 'dark_mode_unified_system_view') {
    xml = getExactDarkModeUnifiedSystemViewReferenceXml();
  } else if (archId === 'business_agent_governance_hitl' || archId?.includes('agent_governance')) {
    const { getExactAgentGovernanceHitlReferenceXml } = require('./newEnterpriseReferenceXmls');
    xml = getExactAgentGovernanceHitlReferenceXml();
  } else if (archId === 'tech_multi_agent_langgraph' || archId?.includes('langgraph')) {
    const { getExactMultiAgentLangGraphReferenceXml } = require('./newEnterpriseReferenceXmls');
    xml = getExactMultiAgentLangGraphReferenceXml();
  } else if (archId === 'eval_safety_benchmarking' || archId?.includes('monitex') || archId?.includes('safety_benchmarking')) {
    xml = getExactEvalSafetyBenchmarkingReferenceXml();
  } else if (archId && (archId.startsWith('tech_') || archId === 'serverless_gcp' || archId === 'streaming_pipeline' || archId === 'k8s_mesh' || archId === 'data_lakehouse' || archId === 'rag_gcp' || archId === 'event_driven_aws' || archId === 'multi_region_dr' || archId === 'zero_trust' || archId === 'hybrid_interconnect' || archId === 'cicd_pipeline')) {
    xml = getTechnicalArchitectureXml(archId);
  } else {
    xml = getTechnicalArchitectureXml('tech_serverless_gcp');
  }

  if (archId !== 'eval_safety_benchmarking' && archId !== 'business_agent_governance_hitl' && archId !== 'tech_multi_agent_langgraph') {
    const effectiveContext = useCaseContext || userPrompt || getTemplateTitle(archId || '');
    xml = injectUseCaseFlavor(xml, effectiveContext, userPrompt);
  }
  xml = preflightVerifyAndHealXmlAcrossAll6Audits(xml, archId || 'unified_system_view');

  return xml;
}
