export interface ArchitectureMeta {
  id: string;
  title: string;
  category: string;
  useCase: string;
  businessUseCase: string;
  primaryActors: string;
  targetOutcomes: string;
  desc: string;
}

export const ARCHITECTURE_METADATA_MAP: Record<string, ArchitectureMeta> = {
  conceptual_diagram: {
    id: "conceptual_diagram",
    title: "1. 3D Conceptual Ingestion Portal",
    category: "Business Architecture",
    useCase: "MERCK NSCLC TARGET DISCOVERY",
    businessUseCase: "Automate scientific literature mining across 5 internal silos to accelerate therapeutic target discovery for Non-Small Cell Lung Cancer (NSCLC).",
    primaryActors: "Oncology Researchers, Bioinformaticians, Market Access Analysts",
    targetOutcomes: "Accelerated Target Identification, 80% Reduction in Manual Research Hours, Strategic Launch Competitive Intelligence",
    desc: "Maps raw unstructured data sources, ITACS Gemini synthesis engine, and strategic oncology delivery outcomes."
  },
  erd: {
    id: "erd",
    title: "2. Dimensional Data Model (ERD)",
    category: "Business Architecture",
    useCase: "MERCK NSCLC TARGET DISCOVERY",
    businessUseCase: "Enterprise dimensional schema uniting clinical trial facts, oncology publication dimensions, dbt MLOps feature stores, and pgvector embeddings for NSCLC target hypothesis generation.",
    primaryActors: "Data Engineers, Database Architects, ML Engineers",
    targetOutcomes: "Single Source of Truth, Standardized Gene/Protein Lineage, High-Performance Vector & Relational Querying",
    desc: "Defines core BI dimensions, fact tables, MLOps feature stores, and GenAI vector search semantic layers."
  },
  agentic_rag: {
    id: "agentic_rag",
    title: "3. Cognitive Architecture (Agentic RAG)",
    category: "Business Architecture",
    useCase: "MERCK NSCLC TARGET DISCOVERY",
    businessUseCase: "Multi-agent ReAct orchestration loop enabling natural language query of PubMed, clinical trial PDFs, and internal proprietary research decks via Gemini 2.5 Pro.",
    primaryActors: "Oncology Researchers, Lead Scientists, AI Engineers",
    targetOutcomes: "Context-Aware Target Synthesis, Citation-Backed Answers, Zero-Hallucination Guardrails",
    desc: "Orchestrates multi-agent ReAct reasoning loops, Vertex AI vector search, and enterprise knowledge tools."
  },
  sequence_diagram: {
    id: "sequence_diagram",
    title: "4. Micro Dynamic Sequence Diagram",
    category: "Business Architecture",
    useCase: "MERCK NSCLC TARGET DISCOVERY",
    businessUseCase: "Step-by-step chronological execution flow of a scientific query, illustrating prompt injection scanning, private VPC-SC gRPC calls, vector retrieval, and LLM reasoning.",
    primaryActors: "API Architects, Security Auditors, Backend Engineers",
    targetOutcomes: "Sub-Second Latency Enforcement, VPC-SC Zero-Trust Compliance, End-to-End Audit Traceability",
    desc: "Chronological API execution flow illustrating agent reasoning, context retrieval, and VPC security checks."
  },
  data_ai_pipeline: {
    id: "data_ai_pipeline",
    title: "5. End-to-End Data & AI Pipeline",
    category: "Business Architecture",
    useCase: "ENTERPRISE DATA & AI PLATFORM",
    businessUseCase: "Unified Data Flow Diagram (DFD) and MLOps pipeline transforming raw unstructured data into dbt feature stores, model training loops, and automated research reports.",
    primaryActors: "Data Engineers, ML Engineers, Bioinformaticians",
    targetOutcomes: "Automated Data Ingestion, Managed Feature Store Lineage, Continuous Model Retraining",
    desc: "Integrates raw data ingestion (DFD), dbt feature engineering, managed feature store, and MLOps lifecycle."
  },
  secure_deployment_map: {
    id: "secure_deployment_map",
    title: "6. Security Boundary Deployment Map",
    category: "Business Architecture",
    useCase: "ENTERPRISE SECURITY TOPOLOGY",
    businessUseCase: "Enterprise security perimeter isolating proprietary data inside VPC Service Controls with Cloud Armor L7 WAF edge defense and IAM RBAC controls.",
    primaryActors: "Chief Information Security Officer (CISO), Cloud Architects, Security Operations",
    targetOutcomes: "HIPAA & GxP Compliance, Air-Gapped Data Isolation, Protection Against Data Exfiltration",
    desc: "Maps Cloud Armor L7 WAF edge protection, API Gateway rate-limiting, and isolated private subnets within VPC-SC."
  },
  devops_cicd_pipeline: {
    id: "devops_cicd_pipeline",
    title: "7. DevOps & CI/CD Pipeline",
    category: "Business Architecture",
    useCase: "ENTERPRISE DEVOPS GITOPS",
    businessUseCase: "Polyrepo DevSecOps GitOps pipeline automating unit tests, dbt data validation, container vulnerability scans, and ArgoCD canary deployments across cloud environments.",
    primaryActors: "DevSecOps Engineers, SREs, Platform Engineers",
    targetOutcomes: "Zero-Downtime Canary Rollouts, Automated Vulnerability Scanning, Infrastructure-as-Code Governance",
    desc: "Polyrepo GitOps workflow integrating unit tests, vulnerability scanning, Terraform deployment, and canary checks."
  },
  unified_system_view: {
    id: "unified_system_view",
    title: "8. Unified Master System View",
    category: "Business Architecture",
    useCase: "MASTER ENTERPRISE BLUEPRINT",
    businessUseCase: "Master enterprise blueprint consolidating data ingestion, cognitive agent RAG, MLOps training, VPC security perimeters, and governance into a single reference view.",
    primaryActors: "Chief Enterprise Architect, Lead Scientists, Executive Leadership",
    targetOutcomes: "Complete Architectural Alignment, Single Blueprint for Training & Onboarding, Risk Reduction",
    desc: "Total integrated architecture consolidating data foundation, AI lifecycle, topology, and governance."
  },
  business_agent_governance_hitl: {
    id: "business_agent_governance_hitl",
    title: "9. HITL Autonomous AI Agent Governance Lifecycle",
    category: "Business Architecture",
    useCase: "ENTERPRISE AI RISK & GOVERNANCE",
    businessUseCase: "Confidence-tiered autonomous agent escalation flow with supervisory cross-verification, human sign-off workbenches, and cryptographic audit certificates.",
    primaryActors: "AI Ethics Board, Compliance Officers, Lead Architects",
    targetOutcomes: "100% Audit Readiness, Zero Unsupervised Failures, Regulatory Compliance (EU AI Act)",
    desc: "Human-in-the-Loop governance state machine with confidence escalation and cryptographic sign-off."
  },
  tech_multi_agent_langgraph: {
    id: "tech_multi_agent_langgraph",
    title: "0. Flagship Stateful Multi-Agent Orchestration Engine",
    category: "Technical Architecture",
    useCase: "MULTI-AGENT AUTONOMOUS PLATFORM",
    businessUseCase: "Master supervisor DAG orchestrator routing tasks to parallel worker clusters with sandboxed code execution, human approval gates, and state checkpoints.",
    primaryActors: "AI Systems Engineers, Autonomous Agent Developers, Platform Architects",
    targetOutcomes: "Parallel Execution Throughput, Deterministic State Persistence, Safe Sandboxed Execution",
    desc: "Stateful Directed Graph multi-agent architecture with sandboxed kernel and checkpoint store."
  },
  tech_serverless_gcp: {
    id: "tech_serverless_gcp",
    title: "1. GCP Serverless Web Application",
    category: "Technical Architecture",
    useCase: "GCP CLOUD PLATFORM",
    businessUseCase: "Serverless web architecture on Google Cloud providing scalable API access to microservices for global users.",
    primaryActors: "Cloud Technical Architects, Web App Developers, SREs",
    targetOutcomes: "99.99% Availability, Auto-Scaling from 0 to 1000 Requests, Zero Infrastructure Management Overhead",
    desc: "GCP cloud-native architecture using Cloud Run microservices, Cloud SQL private IP, Cloud CDN, and Secret Manager."
  },
  tech_streaming_analytics: {
    id: "tech_streaming_analytics",
    title: "2. GCP Real-Time Streaming Analytics",
    category: "Technical Architecture",
    useCase: "REAL-TIME STREAMING PIPELINE",
    businessUseCase: "Real-time streaming telemetry ingestion capturing live updates and platform usage analytics into BigQuery and Looker Studio.",
    primaryActors: "Big Data Architects, Data Analysts, Business Intelligence Leads",
    targetOutcomes: "Sub-Second Ingestion Speed, Real-Time Executive Dashboards, Instant Alerting on Anomalies",
    desc: "Streaming ingestion via Cloud Pub/Sub, Dataflow Beam ETL, Vertex AI Feature Store, and BigQuery analytical warehousing."
  },
  tech_microservices_aws: {
    id: "tech_microservices_aws",
    title: "3. AWS Microservices Kubernetes Cluster",
    category: "Technical Architecture",
    useCase: "AWS CLOUD ARCHITECTURE",
    businessUseCase: "AWS EKS microservices service mesh hosting containerized algorithms, Istio mTLS encrypted communications, and Aurora database clusters.",
    primaryActors: "Cloud Native Architects, DevOps Engineers, Kubernetes Operators",
    targetOutcomes: "Zero-Trust Service-to-Service Encryption, Elastic Multi-AZ Resilience, Fine-Grained Traffic Splitting",
    desc: "Production EKS cluster architecture with ALB Ingress, Istio mTLS mesh, Aurora PostgreSQL, and CloudWatch telemetry."
  },
  tech_data_lakehouse: {
    id: "tech_data_lakehouse",
    title: "4. AWS Data Lakehouse Architecture",
    category: "Technical Architecture",
    useCase: "ENTERPRISE DATA LAKEHOUSE",
    businessUseCase: "AWS Modern Data Lakehouse staging petabytes of unstructured and structured data across S3 Raw, Clean, and Curated zones.",
    primaryActors: "Data Platform Architects, Data Scientists, Data Engineers",
    targetOutcomes: "Cost-Optimized Storage Tiers, Serverless Athena SQL Analytics, Centralized Lake Formation Security",
    desc: "Multi-tier S3 data landing zones, AWS Glue crawlers/catalog, Athena ad-hoc querying, and Redshift warehousing."
  },
  tech_rag_gcp: {
    id: "tech_rag_gcp",
    title: "5. GCP Enterprise RAG Architecture",
    category: "Technical Architecture",
    useCase: "ENTERPRISE VECTOR SEARCH & RAG",
    businessUseCase: "High-density Vertex AI Vector Search indexing millions of embeddings for instantaneous semantic retrieval by Gemini LLMs.",
    primaryActors: "AI Principal Architects, NLP Engineers, Enterprise Developers",
    targetOutcomes: "<100ms Vector Search Latency, High-Fidelity Semantic Retrieval, Private Air-Gapped AI Execution",
    desc: "Enterprise RAG topology with Vertex AI Vector Search, Gemini 2.5 LLM reasoning, and private VPC Service Controls."
  },
  tech_event_driven_aws: {
    id: "tech_event_driven_aws",
    title: "6. AWS Event-Driven Microservices",
    category: "Technical Architecture",
    useCase: "SERVERLESS EVENT ARCHITECTURE",
    businessUseCase: "Decoupled asynchronous event-driven workflow triggering background processing and event fan-out via Amazon EventBridge.",
    primaryActors: "Serverless Architects, Systems Integrators, Backend Engineers",
    targetOutcomes: "Loose Component Coupling, High Concurrency Spikes Support, Pay-per-Use Serverless Cost Efficiency",
    desc: "Decoupled serverless pattern using Amazon EventBridge event bus, AWS Lambda processing, SQS/SNS, and DynamoDB."
  },
  tech_multi_region_dr: {
    id: "tech_multi_region_dr",
    title: "7. GCP Multi-Region Disaster Recovery",
    category: "Technical Architecture",
    useCase: "BUSINESS CONTINUITY TOPOLOGY",
    businessUseCase: "Active-passive multi-region disaster recovery topology across GCP us-central1 and us-east4 ensuring RPO < 1 min and RTO < 5 mins.",
    primaryActors: "Site Reliability Engineers (SRE), Disaster Recovery Leads, Infrastructure Engineers",
    targetOutcomes: "Business Continuity Assurance, Zero Data Loss on Outages, Automated Global DNS Failover",
    desc: "Active-passive high availability topology with Global DNS failover, cross-region replication, and automated health checks."
  },
  tech_cicd_pipeline: {
    id: "tech_cicd_pipeline",
    title: "8. Technical CI/CD Build Pipeline",
    category: "Technical Architecture",
    useCase: "ENTERPRISE CI/CD PLATFORM",
    businessUseCase: "DevSecOps build and deployment pipeline enforcing SAST static analysis, container image signing, and automated integration tests before promoting models to production.",
    primaryActors: "DevSecOps Architects, Build Engineers, QA Managers",
    targetOutcomes: "100% Automated Security Scans, Reproducible Immutable Build Artifacts, Audit-Ready Deployment History",
    desc: "DevSecOps pipeline featuring SAST code analysis, container vulnerability scanning, ArgoCD GitOps, and canary rollbacks."
  },
  tech_c4_system_context: {
    id: "tech_c4_system_context",
    title: "9. C4 System Context & Containers",
    category: "Technical Architecture",
    useCase: "C4 ENTERPRISE ARCHITECTURE",
    businessUseCase: "C4 Model Level 1 Context and Level 2 Container mapping showing external actors, authentication boundaries, microservice containers, and database tiers.",
    primaryActors: "Enterprise Architects, Solution Designers, Lead Developers",
    targetOutcomes: "Clear Boundary Definition, Identity Gateway Standardization, Third-Party Service Separation",
    desc: "C4 model context and container blueprint mapping users, identity gateway, microservices, and databases."
  },
  tech_modern_data_stack: {
    id: "tech_modern_data_stack",
    title: "10. Modern Data Stack (CDC & dbt)",
    category: "Technical Architecture",
    useCase: "MODERN DATA PLATFORM",
    businessUseCase: "Real-time Change Data Capture (Debezium), automated Data Contracts schema validation, dbt dimensional modeling, and Reverse ETL back to CRM systems.",
    primaryActors: "Analytics Engineers, Data Architects, BI Leads",
    targetOutcomes: "Sub-Minute Data Freshness, 100% Schema Contract Enforcement, Automated Reverse ETL Syncing",
    desc: "Modern data platform combining PostgreSQL CDC, Data Contracts, dbt Gold marts, and Reverse ETL."
  },
  tech_event_driven_eda: {
    id: "tech_event_driven_eda",
    title: "11. Enterprise EDA & Kafka Mesh",
    category: "Technical Architecture",
    useCase: "ENTERPRISE EVENT MESH",
    businessUseCase: "High-scale partitioned Kafka event mesh with Schema Registry contract validation, automated Dead-Letter Queue (DLQ) retry routing, and decoupled GKE consumer groups.",
    primaryActors: "Distributed Systems Architects, Platform Engineers, SREs",
    targetOutcomes: "Million-Message-per-Second Scale, Zero Message Loss via DLQ, Decoupled Microservice Scaling",
    desc: "Event-driven architecture with Kafka brokers, Schema Registry Avro gates, and DLQ recovery."
  },
  tech_agent_harness_runtime: {
    id: "tech_agent_harness_runtime",
    title: "12. Enterprise Agent Harness Runtime Platform",
    category: "AI & Agentic Systems Architecture",
    useCase: "AGENT HARNESS RUNTIME KERNEL",
    businessUseCase: "Production enterprise AI agent harness runtime platform combining LiteLLM router, MCP tool protocol, gVisor/E2B sandboxed code execution, context compactor, OTel tracing, and self-healing reflection loops.",
    primaryActors: "AI Chief Architects, Platform Infrastructure Engineers, CISO & Compliance Officers",
    targetOutcomes: "Isolated Untrusted Code Execution, 90% Cost Cut via Prompt Caching, SOC2/HIPAA Audit Attestation",
    desc: "Production multi-agent execution harness featuring isolated microVMs, zero-trust IAM, and self-healing error reflection."
  }
};

export function getArchitectureMeta(archId?: string, promptText?: string, customUseCaseName?: string): ArchitectureMeta {
  const baseMeta: ArchitectureMeta = (archId && ARCHITECTURE_METADATA_MAP[archId])
    ? { ...ARCHITECTURE_METADATA_MAP[archId] }
    : {
        id: archId || "custom",
        title: archId ? archId.replace(/_/g, ' ').toUpperCase() : "CUSTOM ARCHITECTURE",
        category: archId?.startsWith('tech_') ? "Technical Architecture" : "Business Architecture",
        useCase: "ENTERPRISE SOLUTION ARCHITECTURE",
        businessUseCase: "End-to-end cloud and data platform workflow supporting mission-critical enterprise operations.",
        primaryActors: "Domain Specialists, System Engineers, Business Analysts, SREs",
        targetOutcomes: "Sub-Second Latency, High Availability, End-to-End Security Compliance",
        desc: "Enterprise architecture diagram generated for cloud, data, and AI operations."
      };

  if (customUseCaseName && customUseCaseName.trim().length > 0) {
    baseMeta.useCase = customUseCaseName.toUpperCase();
  } else if (promptText && promptText.trim().length > 3) {
    const topic = extractCleanTopicFromPrompt(promptText);
    baseMeta.useCase = topic.toUpperCase();
    baseMeta.businessUseCase = `Enterprise solution architecture supporting ${topic} workflows, high-throughput data processing, and automated governance.`;
    baseMeta.primaryActors = inferActorsFromPrompt(promptText);
    baseMeta.targetOutcomes = inferOutcomesFromPrompt(promptText);
  } else {
    // Provide clean domain-neutral metadata defaults instead of hardcoded Merck NSCLC
    baseMeta.useCase = getDomainNeutralUseCaseTitle(archId);
    baseMeta.businessUseCase = getDomainNeutralProblemStatement(archId);
    baseMeta.primaryActors = getDomainNeutralPrimaryActors(archId);
    baseMeta.targetOutcomes = getDomainNeutralTargetOutcomes(archId);
  }

  return baseMeta;
}

export function extractCleanTopicFromPrompt(prompt: string): string {
  if (!prompt) return "ENTERPRISE ARCHITECTURE";
  const p = prompt.toLowerCase();
  if (p.includes('keytruda') || p.includes('supply chain') || p.includes('demand forecasting')) {
    return "Merck Keytruda Supply Chain Forecasting";
  }
  const clean = prompt
    .replace(/act as|chief|enterprise|architect|and|pharma|technology|lead|at|we|are|building|a|generative|ai|platform|to|automate|scientific|literature|mining|accelerate|design|build|create|system|architecture|diagram/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const words = clean.split(' ').filter(w => w.length > 2).slice(0, 4);
  return words.length > 0
    ? words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ')
    : "ENTERPRISE PLATFORM";
}

function inferActorsFromPrompt(prompt: string): string {
  const p = prompt.toLowerCase();
  if (p.includes('supply chain') || p.includes('logistics') || p.includes('forecasting') || p.includes('keytruda')) {
    return "Global Supply Chain Planners, Manufacturing Site Leads, Logistics Managers, Plant Operations";
  } else if (p.includes('doctor') || p.includes('clinical') || p.includes('patient') || p.includes('health')) {
    return "Clinicians, Lead Researchers, Medical Data Analysts, Health IT Engineers";
  } else if (p.includes('bank') || p.includes('fraud') || p.includes('fintech') || p.includes('payment')) {
    return "Financial Analysts, Risk Engineers, Fraud Investigators, Security Operations";
  } else if (p.includes('iot') || p.includes('device') || p.includes('sensor') || p.includes('factory')) {
    return "IoT Platform Architects, Field Operations, Data Engineers, SREs";
  }
  return "Domain Specialists, System Engineers, Data Architects, Business Analysts";
}

function inferOutcomesFromPrompt(prompt: string): string {
  const p = prompt.toLowerCase();
  if (p.includes('supply chain') || p.includes('stockout') || p.includes('keytruda') || p.includes('biologic')) {
    return "Optimized Safety Stock, Zero Keytruda Stockouts, Reduced Cold-Chain Biologic Wastage, GxP Audit Traceability";
  } else if (p.includes('latency') || p.includes('real-time') || p.includes('streaming')) {
    return "Sub-10ms Streaming Ingestion, Zero Data Loss, Real-Time Telemetry Analytics";
  } else if (p.includes('security') || p.includes('compliance') || p.includes('hipaa') || p.includes('pci')) {
    return "100% Regulatory Compliance, Zero-Trust Encryption, Automated Audit Trail";
  }
  return "Accelerated Operational Efficiency, 99.99% Availability, Automated Lifecycle Governance";
}

function getDomainNeutralUseCaseTitle(archId?: string): string {
  if (!archId) return "ENTERPRISE SOLUTION ARCHITECTURE";
  if (archId.includes('rag')) return "COGNITIVE AGENTIC RAG SYSTEM";
  if (archId.includes('pipeline')) return "END-TO-END DATA & AI PIPELINE";
  if (archId.includes('erd')) return "DIMENSIONAL DATA MODEL (ERD)";
  if (archId.includes('sequence')) return "SYSTEM EXECUTION SEQUENCE FLOW";
  if (archId.includes('cicd')) return "DEVSECOPS CI/CD WORKFLOW";
  if (archId.includes('iot')) return "INDUSTRIAL IOT TELEMETRY PIPELINE";
  if (archId.includes('dr')) return "MULTI-REGION DISASTER RECOVERY";
  if (archId.includes('vpc')) return "ZERO-TRUST VPC INFRASTRUCTURE";
  return "ENTERPRISE CLOUD ARCHITECTURE";
}

function getDomainNeutralProblemStatement(archId?: string): string {
  return "Automate enterprise data workflows, secure ingestion channels, and intelligent analytics processing to accelerate operational decision-making.";
}

function getDomainNeutralPrimaryActors(archId?: string): string {
  return "Enterprise Architects, Data Engineers, Systems Analysts, Security Operations";
}

function getDomainNeutralTargetOutcomes(archId?: string): string {
  return "Accelerated Processing Timelines, High Availability, End-to-End Governance";
}
