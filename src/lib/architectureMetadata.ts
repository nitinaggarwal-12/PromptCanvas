export interface ArchitectureMeta {
  id: string;
  title: string;
  category: string;
  useCase: string;
  desc: string;
}

export const ARCHITECTURE_METADATA_MAP: Record<string, ArchitectureMeta> = {
  conceptual_diagram: {
    id: "conceptual_diagram",
    title: "1. 3D Conceptual Ingestion Portal",
    category: "Business Architecture",
    useCase: "MERCK NSCLC TARGET DISCOVERY",
    desc: "Maps raw unstructured data sources, ITACS Gemini synthesis engine, and strategic oncology delivery outcomes."
  },
  erd: {
    id: "erd",
    title: "2. Dimensional Data Model (ERD)",
    category: "Business Architecture",
    useCase: "MERCK NSCLC TARGET DISCOVERY",
    desc: "Defines core BI dimensions, fact tables, MLOps feature stores, and GenAI vector search semantic layers."
  },
  agentic_rag: {
    id: "agentic_rag",
    title: "3. Cognitive Architecture (Agentic RAG)",
    category: "Business Architecture",
    useCase: "MERCK NSCLC TARGET DISCOVERY",
    desc: "Orchestrates multi-agent ReAct reasoning loops, Vertex AI vector search, and enterprise knowledge tools."
  },
  sequence_diagram: {
    id: "sequence_diagram",
    title: "4. Micro Dynamic Sequence Diagram",
    category: "Business Architecture",
    useCase: "MERCK NSCLC TARGET DISCOVERY",
    desc: "Chronological API execution flow illustrating agent reasoning, context retrieval, and VPC security checks."
  },
  macro_sequence_diagram: {
    id: "macro_sequence_diagram",
    title: "5. Macro End-to-End Sequence Flow",
    category: "Business Architecture",
    useCase: "MERCK NSCLC TARGET DISCOVERY",
    desc: "Comprehensive multi-phase lifecycle spanning data ingestion, model training, agent RAG, and delivery."
  },
  data_ai_pipeline: {
    id: "data_ai_pipeline",
    title: "6. End-to-End Data & AI Pipeline",
    category: "Business Architecture",
    useCase: "MERCK NSCLC TARGET DISCOVERY",
    desc: "Integrates raw data ingestion (DFD), dbt feature engineering, managed feature store, and MLOps lifecycle."
  },
  secure_deployment_map: {
    id: "secure_deployment_map",
    title: "7. Security Boundary Deployment Map",
    category: "Business Architecture",
    useCase: "MERCK NSCLC TARGET DISCOVERY",
    desc: "Maps Cloud Armor L7 WAF edge protection, API Gateway rate-limiting, and isolated private subnets within VPC-SC."
  },
  devops_cicd_pipeline: {
    id: "devops_cicd_pipeline",
    title: "8. DevOps & CI/CD Pipeline",
    category: "Business Architecture",
    useCase: "MERCK NSCLC TARGET DISCOVERY",
    desc: "Polyrepo GitOps workflow integrating unit tests, vulnerability scanning, Terraform deployment, and canary checks."
  },
  governance_state_machine: {
    id: "governance_state_machine",
    title: "9. Governance & State Machine",
    category: "Business Architecture",
    useCase: "MERCK NSCLC TARGET DISCOVERY",
    desc: "Auditable state transitions from initial data vetting to human-in-the-loop governance and continuous drift monitoring."
  },
  unified_system_view: {
    id: "unified_system_view",
    title: "10. Unified Master System View (Light)",
    category: "Business Architecture",
    useCase: "MERCK NSCLC TARGET DISCOVERY",
    desc: "Total integrated architecture consolidating data foundation, AI lifecycle, topology, and governance."
  },
  dark_mode_unified_system_view: {
    id: "dark_mode_unified_system_view",
    title: "11. Unified Master System View (Dark)",
    category: "Business Architecture",
    useCase: "MERCK NSCLC TARGET DISCOVERY",
    desc: "High-contrast dark mode master architecture mapping data flow, cognition, security boundaries, and operational state."
  },
  tech_serverless_gcp: {
    id: "tech_serverless_gcp",
    title: "12. GCP Serverless Web Application",
    category: "Technical Architecture",
    useCase: "MERCK NSCLC TARGET DISCOVERY",
    desc: "GCP cloud-native architecture using Cloud Run microservices, Cloud SQL private IP, Cloud CDN, and Secret Manager."
  },
  tech_streaming_analytics: {
    id: "tech_streaming_analytics",
    title: "13. GCP Real-Time Streaming Analytics",
    category: "Technical Architecture",
    useCase: "MERCK NSCLC TARGET DISCOVERY",
    desc: "Streaming ingestion via Cloud Pub/Sub, Dataflow Beam ETL, Vertex AI Feature Store, and BigQuery analytical warehousing."
  },
  tech_microservices_aws: {
    id: "tech_microservices_aws",
    title: "14. AWS Microservices Kubernetes Cluster",
    category: "Technical Architecture",
    useCase: "MERCK NSCLC TARGET DISCOVERY",
    desc: "Production EKS cluster architecture with ALB Ingress, Istio mTLS mesh, Aurora PostgreSQL, and CloudWatch telemetry."
  },
  tech_data_lakehouse: {
    id: "tech_data_lakehouse",
    title: "15. AWS Data Lakehouse Architecture",
    category: "Technical Architecture",
    useCase: "MERCK NSCLC TARGET DISCOVERY",
    desc: "Multi-tier S3 data landing zones, AWS Glue crawlers/catalog, Athena ad-hoc querying, and Redshift warehousing."
  },
  tech_rag_gcp: {
    id: "tech_rag_gcp",
    title: "16. GCP Enterprise RAG Architecture",
    category: "Technical Architecture",
    useCase: "MERCK NSCLC TARGET DISCOVERY",
    desc: "Enterprise RAG topology with Vertex AI Vector Search, Gemini 2.5 LLM reasoning, and private VPC Service Controls."
  },
  tech_event_driven_aws: {
    id: "tech_event_driven_aws",
    title: "17. AWS Event-Driven Microservices",
    category: "Technical Architecture",
    useCase: "MERCK NSCLC TARGET DISCOVERY",
    desc: "Decoupled serverless pattern using Amazon EventBridge event bus, AWS Lambda processing, SQS/SNS, and DynamoDB."
  },
  tech_multi_region_dr: {
    id: "tech_multi_region_dr",
    title: "18. GCP Multi-Region Disaster Recovery",
    category: "Technical Architecture",
    useCase: "MERCK NSCLC TARGET DISCOVERY",
    desc: "Active-passive high availability topology with Global DNS failover, cross-region replication, and automated health checks."
  },
  tech_vpc_infra: {
    id: "tech_vpc_infra",
    title: "19. AWS Zero-Trust VPC Network",
    category: "Technical Architecture",
    useCase: "MERCK NSCLC TARGET DISCOVERY",
    desc: "Multi-AZ VPC infrastructure with Transit Gateway, Network Firewall inspection, PrivateLink endpoints, and KMS."
  },
  tech_iot_telemetry: {
    id: "tech_iot_telemetry",
    title: "20. GCP Industrial IoT Telemetry Ingestion",
    category: "Technical Architecture",
    useCase: "MERCK NSCLC TARGET DISCOVERY",
    desc: "Edge MQTT/HTTPS telemetry pipeline using Pub/Sub streaming, Cloud Dataflow, Bigtable time-series store, and alerting."
  },
  tech_cicd_pipeline: {
    id: "tech_cicd_pipeline",
    title: "21. Technical CI/CD Build Pipeline",
    category: "Technical Architecture",
    useCase: "MERCK NSCLC TARGET DISCOVERY",
    desc: "DevSecOps pipeline featuring SAST code analysis, container vulnerability scanning, ArgoCD GitOps, and canary rollbacks."
  }
};

export function getArchitectureMeta(archId?: string, promptText?: string): ArchitectureMeta {
  if (archId && ARCHITECTURE_METADATA_MAP[archId]) {
    return ARCHITECTURE_METADATA_MAP[archId];
  }

  // Derive from prompt text or archId fallback
  let derivedUseCase = "MERCK NSCLC TARGET DISCOVERY";
  if (promptText) {
    if (promptText.toLowerCase().includes('prior auth')) {
      derivedUseCase = "PRIOR AUTHORIZATION PLATFORM";
    } else {
      const clean = promptText.replace(/act as|chief|enterprise|architect|and|pharma|technology|lead|at|we|are|building|a|generative|ai|platform|to|automate|scientific|literature|mining|accelerate|therapeutic|target|discovery|for|non-small|cell|lung|cancer|design|build|create|system|architecture|diagram/gi, ' ').replace(/\s+/g, ' ').trim();
      const words = clean.split(' ').filter(w => w.length > 2).slice(0, 4);
      if (words.length > 0) {
        derivedUseCase = words.map(w => w.toUpperCase()).join(' ');
      }
    }
  }

  return {
    id: archId || "custom",
    title: archId ? archId.replace(/_/g, ' ').toUpperCase() : "CUSTOM ARCHITECTURE",
    category: archId?.startsWith('tech_') ? "Technical Architecture" : "Business Architecture",
    useCase: derivedUseCase,
    desc: "Enterprise architecture diagram generated for scientific literature mining and target discovery."
  };
}
