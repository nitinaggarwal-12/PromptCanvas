export interface ArchitectureTypeOption {
  id: string;
  name: string;
  category: string;
  prompt: string;
}

export const ARCHITECTURE_TYPES: ArchitectureTypeOption[] = [
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
  // Phase 2: Cloud & Microservices
  {
    id: "serverless_gcp",
    name: "3. Serverless Web Application (GCP)",
    category: "Phase 2: Cloud & Microservices",
    prompt: "Act as a GCP Cloud Architect. Design a serverless web application architecture. It should include: a Global HTTPS Load Balancer, Cloud CDN, Cloud Run for frontend and backend services, Cloud SQL (PostgreSQL) for relational data, and Cloud Storage for static assets."
  },
  {
    id: "event_driven_aws",
    name: "4. Event-Driven Microservices (AWS)",
    category: "Phase 2: Cloud & Microservices",
    prompt: "Act as an AWS Architect. Design an event-driven microservices architecture. It should use: Amazon EventBridge for event routing, AWS Lambda for processing events, Amazon SQS/SNS for messaging/decoupling, and DynamoDB as the fast key-value store."
  },
  {
    id: "k8s_mesh",
    name: "5. Kubernetes Service Mesh (EKS/GKE)",
    category: "Phase 2: Cloud & Microservices",
    prompt: "Act as a Cloud Native Architect. Design a multi-cluster Kubernetes Service Mesh architecture using EKS or GKE with Istio/Anthos, ingress controllers, mutual TLS (mTLS), distributed tracing, and Prometheus monitoring."
  },
  // Phase 3: Data & Analytics
  {
    id: "streaming_pipeline",
    name: "6. Real-time Streaming Pipeline (GCP)",
    category: "Phase 3: Data & Analytics",
    prompt: "Act as a GCP Data Architect. Design a real-time streaming data analytics pipeline. It should ingest streaming data via Pub/Sub, process it with Cloud Dataflow, store structured results in BigQuery, and visualize via Looker."
  },
  {
    id: "data_lakehouse",
    name: "7. Modern Data Lakehouse (AWS)",
    category: "Phase 3: Data & Analytics",
    prompt: "Act as an AWS Data Architect. Design a modern Data Lakehouse architecture. It should include: raw/processed data landing zones in Amazon S3, AWS Glue Catalog for schema registry, AWS Athena for querying, and Amazon Redshift for data warehousing."
  },
  // Phase 4: Resiliency & Security
  {
    id: "multi_region_dr",
    name: "8. Multi-Region Disaster Recovery (GCP)",
    category: "Phase 4: Resiliency & Security",
    prompt: "Act as a GCP Architect. Design a highly available, multi-region disaster recovery architecture. It should include: Cloud DNS routing, HTTPS Load Balancing across two regions, active-passive Cloud Spanner database sync, and dual-region GCS backups."
  },
  {
    id: "zero_trust",
    name: "9. Zero-Trust Security Perimeter (GCP/AWS)",
    category: "Phase 4: Resiliency & Security",
    prompt: "Act as an Enterprise Security Architect. Design a Zero-Trust Security Perimeter architecture featuring VPC Service Controls, Identity-Aware Proxy (IAP), centralized Cloud IAM policies, KMS encryption at rest and in transit, and continuous SIEM monitoring."
  },
  // Phase 5: Enterprise Integration
  {
    id: "hybrid_interconnect",
    name: "10. Hybrid Cloud Interconnect (Enterprise)",
    category: "Phase 5: Enterprise Integration",
    prompt: "Act as an Enterprise Cloud Architect. Design an integrated Hybrid Cloud Interconnect architecture linking on-premises corporate data centers with public clouds (GCP/AWS) via dedicated Cloud Interconnect / Direct Connect, redundant IPsec VPN gateways, and hybrid identity federation."
  }
];

export function getArchitectureTypeById(id: string): ArchitectureTypeOption {
  return ARCHITECTURE_TYPES.find(t => t.id === id) || ARCHITECTURE_TYPES[0];
}
