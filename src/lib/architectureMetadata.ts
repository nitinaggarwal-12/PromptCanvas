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
  macro_sequence_diagram: {
    id: "macro_sequence_diagram",
    title: "5. Macro End-to-End Sequence Flow",
    category: "Business Architecture",
    useCase: "MERCK NSCLC TARGET DISCOVERY",
    businessUseCase: "Cross-functional enterprise timeline coordinating data ingestion (Phase 1), MLOps model training (Phase 2), Agentic RAG synthesis (Phase 3), and executive dashboard delivery (Phase 4).",
    primaryActors: "Enterprise Architects, SREs, Product Managers",
    targetOutcomes: "Full Lifecycle Visibility, Multi-Department Alignment, Continuous Compliance & Quality Gates",
    desc: "Comprehensive multi-phase lifecycle spanning data ingestion, model training, agent RAG, and delivery."
  },
  data_ai_pipeline: {
    id: "data_ai_pipeline",
    title: "6. End-to-End Data & AI Pipeline",
    category: "Business Architecture",
    useCase: "MERCK NSCLC TARGET DISCOVERY",
    businessUseCase: "Unified Data Flow Diagram (DFD) and MLOps pipeline transforming raw unstructured PDFs into dbt feature stores, Vertex AI training loops, and automated research reports.",
    primaryActors: "Data Engineers, ML Engineers, Bioinformaticians",
    targetOutcomes: "Automated Data Ingestion, Managed Feature Store Lineage, Continuous Model Retraining",
    desc: "Integrates raw data ingestion (DFD), dbt feature engineering, managed feature store, and MLOps lifecycle."
  },
  secure_deployment_map: {
    id: "secure_deployment_map",
    title: "7. Security Boundary Deployment Map",
    category: "Business Architecture",
    useCase: "MERCK NSCLC TARGET DISCOVERY",
    businessUseCase: "GCP enterprise security perimeter isolating proprietary Merck genomic data inside VPC Service Controls with Cloud Armor L7 WAF edge defense and IAM RBAC controls.",
    primaryActors: "Chief Information Security Officer (CISO), Cloud Architects, Security Operations",
    targetOutcomes: "HIPAA & GxP Compliance, Air-Gapped Data Isolation, Protection Against Data Exfiltration",
    desc: "Maps Cloud Armor L7 WAF edge protection, API Gateway rate-limiting, and isolated private subnets within VPC-SC."
  },
  devops_cicd_pipeline: {
    id: "devops_cicd_pipeline",
    title: "8. DevOps & CI/CD Pipeline",
    category: "Business Architecture",
    useCase: "MERCK NSCLC TARGET DISCOVERY",
    businessUseCase: "Polyrepo DevSecOps GitOps pipeline automating unit tests, dbt data validation, container vulnerability scans, and ArgoCD canary deployments across GCP environments.",
    primaryActors: "DevSecOps Engineers, SREs, Platform Engineers",
    targetOutcomes: "Zero-Downtime Canary Rollouts, Automated Vulnerability Scanning, Infrastructure-as-Code Governance",
    desc: "Polyrepo GitOps workflow integrating unit tests, vulnerability scanning, Terraform deployment, and canary checks."
  },
  governance_state_machine: {
    id: "governance_state_machine",
    title: "9. Governance & State Machine",
    category: "Business Architecture",
    useCase: "MERCK NSCLC TARGET DISCOVERY",
    businessUseCase: "Formal state-machine lifecycle tracking model/prompt status from initial ethical data vetting -> offline evaluation -> human-in-the-loop board review -> continuous drift monitoring -> archival.",
    primaryActors: "AI Ethics Board, Regulatory Compliance Officers, AI Security Leads",
    targetOutcomes: "100% Audit Readiness, Proactive Bias Detection, Automated Incident Rollback",
    desc: "Auditable state transitions from initial data vetting to human-in-the-loop governance and continuous drift monitoring."
  },
  unified_system_view: {
    id: "unified_system_view",
    title: "10. Unified Master System View (Light)",
    category: "Business Architecture",
    useCase: "MERCK NSCLC TARGET DISCOVERY",
    businessUseCase: "Master enterprise blueprint consolidating data ingestion, cognitive agent RAG, MLOps training, VPC security perimeters, and governance into a single reference view.",
    primaryActors: "Chief Enterprise Architect, Lead Scientists, Executive Leadership",
    targetOutcomes: "Complete Architectural Alignment, Single Blueprint for Training & Onboarding, Risk Reduction",
    desc: "Total integrated architecture consolidating data foundation, AI lifecycle, topology, and governance."
  },
  dark_mode_unified_system_view: {
    id: "dark_mode_unified_system_view",
    title: "11. Unified Master System View (Dark)",
    category: "Business Architecture",
    useCase: "MERCK NSCLC TARGET DISCOVERY",
    businessUseCase: "High-contrast dark mode master blueprint for command center monitoring, technical reviews, and executive strategy sessions.",
    primaryActors: "SRE Command Center, Enterprise Security Team, Executive Operations",
    targetOutcomes: "Visual Clarity in Command Centers, Reduced Eye Fatigue during Deep Reviews, Operational Alignment",
    desc: "High-contrast dark mode master architecture mapping data flow, cognition, security boundaries, and operational state."
  },
  tech_serverless_gcp: {
    id: "tech_serverless_gcp",
    title: "12. GCP Serverless Web Application",
    category: "Technical Architecture",
    useCase: "MERCK NSCLC TARGET DISCOVERY",
    businessUseCase: "Serverless web architecture on Google Cloud providing scalable API access to scientific literature search microservices for global research teams.",
    primaryActors: "Cloud Technical Architects, Web App Developers, SREs",
    targetOutcomes: "99.99% Availability, Auto-Scaling from 0 to 1000 Requests, Zero Infrastructure Management Overhead",
    desc: "GCP cloud-native architecture using Cloud Run microservices, Cloud SQL private IP, Cloud CDN, and Secret Manager."
  },
  tech_streaming_analytics: {
    id: "tech_streaming_analytics",
    title: "13. GCP Real-Time Streaming Analytics",
    category: "Technical Architecture",
    useCase: "MERCK NSCLC TARGET DISCOVERY",
    businessUseCase: "Real-time streaming telemetry ingestion capturing live clinical trial updates, research query metrics, and platform usage analytics into BigQuery and Looker Studio.",
    primaryActors: "Big Data Architects, Data Analysts, Business Intelligence Leads",
    targetOutcomes: "Sub-Second Ingestion Speed, Real-Time Executive Dashboards, Instant Alerting on Anomalies",
    desc: "Streaming ingestion via Cloud Pub/Sub, Dataflow Beam ETL, Vertex AI Feature Store, and BigQuery analytical warehousing."
  },
  tech_microservices_aws: {
    id: "tech_microservices_aws",
    title: "14. AWS Microservices Kubernetes Cluster",
    category: "Technical Architecture",
    useCase: "MERCK NSCLC TARGET DISCOVERY",
    businessUseCase: "AWS EKS microservices service mesh hosting containerized target discovery algorithms, Istio mTLS encrypted communications, and Aurora database clusters.",
    primaryActors: "Cloud Native Architects, DevOps Engineers, Kubernetes Operators",
    targetOutcomes: "Zero-Trust Service-to-Service Encryption, Elastic Multi-AZ Resilience, Fine-Grained Traffic Splitting",
    desc: "Production EKS cluster architecture with ALB Ingress, Istio mTLS mesh, Aurora PostgreSQL, and CloudWatch telemetry."
  },
  tech_data_lakehouse: {
    id: "tech_data_lakehouse",
    title: "15. AWS Data Lakehouse Architecture",
    category: "Technical Architecture",
    useCase: "MERCK NSCLC TARGET DISCOVERY",
    businessUseCase: "AWS Modern Data Lakehouse staging petabytes of genomic sequences, unstructured PubMed literature, and clinical trial results across S3 Raw, Clean, and Curated zones.",
    primaryActors: "Data Platform Architects, Lead Bioinformaticians, Data Scientists",
    targetOutcomes: "Cost-Optimized Storage Tiers, Serverless Athena SQL Analytics, Centralized Lake Formation Security",
    desc: "Multi-tier S3 data landing zones, AWS Glue crawlers/catalog, Athena ad-hoc querying, and Redshift warehousing."
  },
  tech_rag_gcp: {
    id: "tech_rag_gcp",
    title: "16. GCP Enterprise RAG Architecture",
    category: "Technical Architecture",
    useCase: "MERCK NSCLC TARGET DISCOVERY",
    businessUseCase: "High-density Vertex AI Vector Search indexing millions of scientific literature embeddings for instantaneous semantic target retrieval by Gemini 1.5/2.5 LLMs.",
    primaryActors: "AI Principal Architects, NLP Engineers, Scientific Researchers",
    targetOutcomes: "<100ms Vector Search Latency, High-Fidelity Semantic Retrieval, Private Air-Gapped AI Execution",
    desc: "Enterprise RAG topology with Vertex AI Vector Search, Gemini 2.5 LLM reasoning, and private VPC Service Controls."
  },
  tech_event_driven_aws: {
    id: "tech_event_driven_aws",
    title: "17. AWS Event-Driven Microservices",
    category: "Technical Architecture",
    useCase: "MERCK NSCLC TARGET DISCOVERY",
    businessUseCase: "Decoupled asynchronous event-driven workflow triggering background target scoring, document OCR processing, and Slack/Email research notifications via Amazon EventBridge.",
    primaryActors: "Serverless Architects, Systems Integrators, Backend Engineers",
    targetOutcomes: "Loose Component Coupling, High Concurrency Spikes Support, Pay-per-Use Serverless Cost Efficiency",
    desc: "Decoupled serverless pattern using Amazon EventBridge event bus, AWS Lambda processing, SQS/SNS, and DynamoDB."
  },
  tech_multi_region_dr: {
    id: "tech_multi_region_dr",
    title: "18. GCP Multi-Region Disaster Recovery",
    category: "Technical Architecture",
    useCase: "MERCK NSCLC TARGET DISCOVERY",
    businessUseCase: "Active-passive multi-region disaster recovery topology across GCP us-central1 and us-east4 ensuring RPO < 1 min and RTO < 5 mins for mission-critical research systems.",
    primaryActors: "Site Reliability Engineers (SRE), Disaster Recovery Leads, Infrastructure Engineers",
    targetOutcomes: "Business Continuity Assurance, Zero Data Loss on Outages, Automated Global DNS Failover",
    desc: "Active-passive high availability topology with Global DNS failover, cross-region replication, and automated health checks."
  },
  tech_vpc_infra: {
    id: "tech_vpc_infra",
    title: "19. AWS Zero-Trust VPC Network",
    category: "Technical Architecture",
    useCase: "MERCK NSCLC TARGET DISCOVERY",
    businessUseCase: "Multi-AZ AWS VPC network architecture with AWS Network Firewall, Transit Gateway routing, and PrivateLink endpoints protecting confidential pharma IP.",
    primaryActors: "Network Security Engineers, Cloud Infrastructure Leads, Compliance Officers",
    targetOutcomes: "Zero Public Internet Exposure for Core Databases, Deep Packet Inspection, Multi-AZ Isolation",
    desc: "Multi-AZ VPC infrastructure with Transit Gateway, Network Firewall inspection, PrivateLink endpoints, and KMS."
  },
  tech_iot_telemetry: {
    id: "tech_iot_telemetry",
    title: "20. GCP Industrial IoT Telemetry Ingestion",
    category: "Technical Architecture",
    useCase: "MERCK NSCLC TARGET DISCOVERY",
    businessUseCase: "High-throughput lab instrument telemetry ingestion streaming real-time sensor data from high-content screening microscopes and bioreactors into Cloud Bigtable.",
    primaryActors: "Lab Automation Engineers, IoT Platform Architects, Data Engineers",
    targetOutcomes: "Real-Time Sensor Monitoring, Million-Event-per-Second Scale, Automated Anomaly Alerting",
    desc: "Edge MQTT/HTTPS telemetry pipeline using Pub/Sub streaming, Cloud Dataflow, Bigtable time-series store, and alerting."
  },
  tech_cicd_pipeline: {
    id: "tech_cicd_pipeline",
    title: "21. Technical CI/CD Build Pipeline",
    category: "Technical Architecture",
    useCase: "MERCK NSCLC TARGET DISCOVERY",
    businessUseCase: "DevSecOps build and deployment pipeline enforcing SAST static analysis, container image signing, and automated integration tests before promoting AI models to production.",
    primaryActors: "DevSecOps Architects, Build Engineers, QA Managers",
    targetOutcomes: "100% Automated Security Scans, Reproducible Immutable Build Artifacts, Audit-Ready Deployment History",
    desc: "DevSecOps pipeline featuring SAST code analysis, container vulnerability scanning, ArgoCD GitOps, and canary rollbacks."
  }
};

export function getArchitectureMeta(archId?: string, promptText?: string): ArchitectureMeta {
  if (archId && ARCHITECTURE_METADATA_MAP[archId]) {
    return ARCHITECTURE_METADATA_MAP[archId];
  }

  return {
    id: archId || "custom",
    title: archId ? archId.replace(/_/g, ' ').toUpperCase() : "CUSTOM ARCHITECTURE",
    category: archId?.startsWith('tech_') ? "Technical Architecture" : "Business Architecture",
    useCase: "MERCK NSCLC TARGET DISCOVERY",
    businessUseCase: promptText || "Automate scientific literature mining across 5 internal silos to accelerate therapeutic target discovery for Non-Small Cell Lung Cancer (NSCLC).",
    primaryActors: "Oncology Researchers, Bioinformaticians, Enterprise Architects, DevSecOps SREs",
    targetOutcomes: "Accelerated Target Identification, Reduced Research Hours, 100% Audit Compliance",
    desc: "Enterprise architecture diagram generated for scientific literature mining and target discovery."
  };
}
