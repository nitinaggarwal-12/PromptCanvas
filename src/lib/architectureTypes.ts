import { compileSpecToDrawioXml, getBenchmarkItacsSpec, getBenchmarkErdSpec, getBenchmarkAgenticRagSpec, getBenchmarkSequenceDiagramSpec, getBenchmarkDataAiPipelineSpec } from './diagramCompiler';

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
    id: "event_driven_aws",
    name: "6. Event-Driven Microservices (AWS)",
    category: "Phase 2: Cloud & Microservices",
    prompt: "Act as an AWS Architect. Design an event-driven microservices architecture. It should use: Amazon EventBridge for event routing, AWS Lambda for processing events, Amazon SQS/SNS for messaging/decoupling, and DynamoDB as the fast key-value store."
  },
  {
    id: "k8s_mesh",
    name: "7. Kubernetes Service Mesh (EKS/GKE)",
    category: "Phase 2: Cloud & Microservices",
    prompt: "Act as a Cloud Native Architect. Design a multi-cluster Kubernetes Service Mesh architecture using EKS or GKE with Istio/Anthos, ingress controllers, mutual TLS (mTLS), distributed tracing, and Prometheus monitoring."
  },
  // Phase 3: Data & Analytics
  {
    id: "streaming_pipeline",
    name: "8. Real-time Streaming Pipeline (GCP)",
    category: "Phase 3: Data & Analytics",
    prompt: "Act as a GCP Data Architect. Design a real-time streaming data analytics pipeline. It should ingest streaming data via Pub/Sub, process it with Cloud Dataflow, store structured results in BigQuery, and visualize via Looker."
  },
  {
    id: "data_lakehouse",
    name: "9. Modern Data Lakehouse (AWS)",
    category: "Phase 3: Data & Analytics",
    prompt: "Act as an AWS Data Architect. Design a modern Data Lakehouse architecture. It should include: raw/processed data landing zones in Amazon S3, AWS Glue Catalog for schema registry, AWS Athena for querying, and Amazon Redshift for data warehousing."
  },
  // Phase 4: Resiliency & Security
  {
    id: "multi_region_dr",
    name: "9. Multi-Region Disaster Recovery (GCP)",
    category: "Phase 4: Resiliency & Security",
    prompt: "Act as a GCP Architect. Design a highly available, multi-region disaster recovery architecture. It should include: Cloud DNS routing, HTTPS Load Balancing across two regions, active-passive Cloud Spanner database sync, and dual-region GCS backups."
  },
  {
    id: "zero_trust",
    name: "10. Zero-Trust Security Perimeter (GCP/AWS)",
    category: "Phase 4: Resiliency & Security",
    prompt: "Act as an Enterprise Security Architect. Design a Zero-Trust Security Perimeter architecture featuring VPC Service Controls, Identity-Aware Proxy (IAP), centralized Cloud IAM policies, KMS encryption at rest and in transit, and continuous SIEM monitoring."
  },
  // Phase 5: Enterprise Integration
  {
    id: "hybrid_interconnect",
    name: "11. Hybrid Cloud Interconnect (Enterprise)",
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

