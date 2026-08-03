/**
 * 🌐 Google Open Knowledge Format (OKF) — Knowledge Graph & Relational Entity Schema
 * Formatted according to Google's Open Knowledge Graph / JSON-LD Relational Schema
 */

export interface OKFEntity {
  '@context': string;
  '@type': string;
  '@id': string;
  name: string;
  alternateName?: string;
  category: 'Blueprint' | 'NativeAIEngine' | 'CloudProvider' | 'DatabaseOrTool';
  description: string;
  vendor?: string;
  officialIconUrl: string;
  compatibleWith: string[];
  technicalSpecifications: Record<string, string>;
  blueprintId?: string;
}

export const GOOGLE_OPEN_KNOWLEDGE_CATALOG: OKFEntity[] = [
  // ==========================================
  // 1. NATIVE AI ENGINES (OKF ENTITIES)
  // ==========================================
  {
    '@context': 'https://schema.org',
    '@type': 'NativeAIEngine',
    '@id': 'okf:ai:databricks-genie',
    name: 'Databricks AI BI Genie',
    alternateName: 'Databricks Genie Conversational Assistant',
    category: 'NativeAIEngine',
    description: 'Conversational natural language analytics assistant running on Unity Catalog and Delta Live Tables (DLT).',
    vendor: 'Databricks',
    officialIconUrl: 'https://api.iconify.design/logos:databricks.svg',
    compatibleWith: ['multi_agent_autonomous_orchestration', 'aws_modern_data_lakehouse', 'data_ai_pipeline'],
    technicalSpecifications: {
      'Governance': 'Unity Catalog Fine-Grained Access Control',
      'Inference Runtime': 'Mosaic AI Model Serving',
      'Query Engine': 'Photon Vectorized SQL Engine'
    },
    blueprintId: 'multi_agent_autonomous_orchestration'
  },
  {
    '@context': 'https://schema.org',
    '@type': 'NativeAIEngine',
    '@id': 'okf:ai:snowflake-cortex',
    name: 'Snowflake Cortex AI',
    alternateName: 'Snowflake Cortex LLM & Cortex Search',
    category: 'NativeAIEngine',
    description: 'Serverless LLM inference, Cortex Search vector retrieval, and Cortex Analyst natural language SQL.',
    vendor: 'Snowflake',
    officialIconUrl: 'https://api.iconify.design/logos:snowflake.svg',
    compatibleWith: ['aws_modern_data_lakehouse', 'unified_system_view', 'agentic_rag'],
    technicalSpecifications: {
      'Vector Retrieval': 'Cortex Search Hybrid Index',
      'Analyst Engine': 'Cortex Analyst Natural Language to SQL',
      'Storage Format': 'Apache Iceberg Open Lakehouse'
    },
    blueprintId: 'aws_modern_data_lakehouse'
  },
  {
    '@context': 'https://schema.org',
    '@type': 'NativeAIEngine',
    '@id': 'okf:ai:google-gemini-2.5',
    name: 'Google Gemini 2.5 Flash & Pro',
    alternateName: 'Gemini 2.5 Ephemeral Context Caching Engine',
    category: 'NativeAIEngine',
    description: '1M+ token context windows with Ephemeral Context Caching (90% OPEX cut) and Vertex AI Agent Builder.',
    vendor: 'Google Cloud Platform (GCP)',
    officialIconUrl: 'https://api.iconify.design/logos:google-cloud.svg',
    compatibleWith: ['gcp_ai_cognitive_rag', 'unified_system_view', 'gcp_project_itacs_production'],
    technicalSpecifications: {
      'Cost Efficiency': '90% Token Caching OPEX Reduction',
      'Agent Orchestration': 'Vertex AI Agent Builder & Reasoning Loops',
      'Security Enclave': 'VPC Service Controls (VPC-SC) Perimeter'
    },
    blueprintId: 'gcp_ai_cognitive_rag'
  },
  {
    '@context': 'https://schema.org',
    '@type': 'NativeAIEngine',
    '@id': 'okf:ai:anthropic-claude-3.5',
    name: 'Anthropic Claude 3.5 Sonnet',
    alternateName: 'Claude 3.5 Sonnet Tool-Use Engine',
    category: 'NativeAIEngine',
    description: 'High-precision technical coding, complex structured tool calling, and long-horizon architectural reasoning.',
    vendor: 'Anthropic',
    officialIconUrl: 'https://api.iconify.design/logos:anthropic-icon.svg',
    compatibleWith: ['agentic_rag', 'sequence_diagram', 'macro_sequence_diagram'],
    technicalSpecifications: {
      'Tool Execution': 'Deterministic Structured JSON Tool Call Output',
      'Safety Framework': 'Constitutional AI Alignment',
      'Deployment': 'AWS Bedrock / GCP Vertex AI / Direct API'
    },
    blueprintId: 'agentic_rag'
  },
  {
    '@context': 'https://schema.org',
    '@type': 'NativeAIEngine',
    '@id': 'okf:ai:amazon-bedrock',
    name: 'Amazon Bedrock & Q',
    alternateName: 'AWS Bedrock Multi-Model Foundation Platform',
    category: 'NativeAIEngine',
    description: 'Managed multi-model foundational AI platform with Knowledge Bases, Agents, and Guardrails.',
    vendor: 'Amazon Web Services (AWS)',
    officialIconUrl: 'https://api.iconify.design/logos:aws.svg',
    compatibleWith: ['aws_serverless_event_driven', 'aws_eks_microservices_mesh', 'data_ai_pipeline'],
    technicalSpecifications: {
      'Knowledge Bases': 'OpenSearch Serverless Vector Index',
      'Agent Framework': 'Bedrock Multi-Step Action Groups',
      'Guardrails': 'Automated PII & Content Moderation Filter'
    },
    blueprintId: 'aws_serverless_event_driven'
  },
  {
    '@context': 'https://schema.org',
    '@type': 'NativeAIEngine',
    '@id': 'okf:ai:azure-copilot-openai',
    name: 'Microsoft Azure OpenAI & Copilot',
    alternateName: 'Azure OpenAI GPT-4o Enterprise Engine',
    category: 'NativeAIEngine',
    description: 'Enterprise GPT-4o deployments with Azure AI Search, Microsoft Fabric, and enterprise tenant isolation.',
    vendor: 'Microsoft Azure Cloud',
    officialIconUrl: 'https://api.iconify.design/logos:microsoft-azure.svg',
    compatibleWith: ['gcp_serverless_web_app', 'unified_system_view', 'secure_deployment_map'],
    technicalSpecifications: {
      'Hybrid Retrieval': 'Azure AI Hybrid Vector Search',
      'Integration': 'Microsoft Fabric OneLake Integration',
      'Network Boundary': 'Azure Private Link & VNet Injection'
    },
    blueprintId: 'gcp_serverless_web_app'
  },

  // ==========================================
  // 2. CLOUD INFRASTRUCTURE PROVIDERS (OKF ENTITIES)
  // ==========================================
  {
    '@context': 'https://schema.org',
    '@type': 'CloudProvider',
    '@id': 'okf:cloud:gcp',
    name: 'Google Cloud Platform (GCP)',
    alternateName: 'GCP AI-Native Infrastructure',
    category: 'CloudProvider',
    description: 'Industry-leading ephemeral AI caching, BigQuery analytics, Cloud Run serverless containers, and VPC-SC enclaves.',
    officialIconUrl: 'https://api.iconify.design/logos:google-cloud.svg',
    compatibleWith: ['gcp_industrial_iot', 'gcp_ai_cognitive_rag', 'gcp_realtime_streaming_pipeline', 'gcp_project_itacs_production'],
    technicalSpecifications: {
      'Serverless Compute': 'Google Cloud Run Multi-AZ',
      'Data Lakehouse': 'BigQuery Serverless Vector Index',
      'Security Perimeter': 'VPC Service Controls (VPC-SC)'
    },
    blueprintId: 'gcp_project_itacs_production'
  },
  {
    '@context': 'https://schema.org',
    '@type': 'CloudProvider',
    '@id': 'okf:cloud:aws',
    name: 'Amazon Web Services (AWS)',
    alternateName: 'AWS Enterprise Cloud Platform',
    category: 'CloudProvider',
    description: 'Comprehensive global cloud platform featuring Amazon EKS, Lambda serverless, Aurora Serverless, and Bedrock.',
    officialIconUrl: 'https://api.iconify.design/logos:aws.svg',
    compatibleWith: ['aws_modern_data_lakehouse', 'aws_eks_microservices_mesh', 'aws_serverless_event_driven', 'aws_zerotrust_vpc_network'],
    technicalSpecifications: {
      'Kubernetes': 'Amazon EKS Multi-AZ Cluster',
      'Serverless Event Bus': 'AWS EventBridge & Lambda',
      'Network Security': 'AWS Zero-Trust Transit Gateway'
    },
    blueprintId: 'aws_eks_microservices_mesh'
  },
  {
    '@context': 'https://schema.org',
    '@type': 'CloudProvider',
    '@id': 'okf:cloud:azure',
    name: 'Microsoft Azure Cloud (Enterprise)',
    alternateName: 'Azure Enterprise Hybrid Platform',
    category: 'CloudProvider',
    description: 'Azure Container Apps, Azure OpenAI Service, Microsoft Fabric OneLake, and Azure Synapse Analytics.',
    officialIconUrl: 'https://api.iconify.design/logos:microsoft-azure.svg',
    compatibleWith: ['gcp_serverless_web_app', 'unified_system_view', 'secure_deployment_map'],
    technicalSpecifications: {
      'Container Compute': 'Azure Container Apps & AKS',
      'Enterprise Analytics': 'Microsoft Fabric OneLake',
      'Identity Control': 'Microsoft Entra ID (Azure AD)'
    },
    blueprintId: 'gcp_serverless_web_app'
  },
  {
    '@context': 'https://schema.org',
    '@type': 'CloudProvider',
    '@id': 'okf:cloud:oci',
    name: 'Oracle Cloud Infrastructure (OCI)',
    alternateName: 'OCI High-Performance AI Compute & Exadata',
    category: 'CloudProvider',
    description: 'Oracle Autonomous Database, OCI High-Bandwidth GPU Clusters, OCI Streaming, and OCI Vault.',
    officialIconUrl: 'https://api.iconify.design/logos:oracle.svg',
    compatibleWith: ['gcp_industrial_iot', 'data_ai_pipeline', 'unified_system_view'],
    technicalSpecifications: {
      'Autonomous DB': 'OCI Autonomous Transaction Processing',
      'High-Speed Streaming': 'OCI Streaming Service (Kafka)',
      'Security Enclave': 'OCI Vault & KMS Envelope Encryption'
    },
    blueprintId: 'gcp_industrial_iot'
  },
  {
    '@context': 'https://schema.org',
    '@type': 'CloudProvider',
    '@id': 'okf:cloud:cncf',
    name: 'Kubernetes / CNCF Open Standards',
    alternateName: 'Cloud Native Computing Foundation Open Stack',
    category: 'CloudProvider',
    description: '100% vendor-agnostic cloud-native stack using Kubernetes, Istio, Apache Kafka, PostgreSQL, and HashiCorp Vault.',
    officialIconUrl: 'https://api.iconify.design/logos:kubernetes.svg',
    compatibleWith: ['unified_system_view', 'devops_cicd_pipeline', 'enterprise_devsecops_polyrepo'],
    technicalSpecifications: {
      'Orchestration': 'Kubernetes (K8s) Standard CNI',
      'Service Mesh': 'Istio mTLS Zero-Trust Gateway',
      'Secrets Vault': 'HashiCorp Vault External Secrets'
    },
    blueprintId: 'unified_system_view'
  }
];

/**
 * Helper to query Google Open Knowledge Format entities by search term or category
 */
export function queryOKFKnowledgeCatalog(query: string = '', category?: OKFEntity['category']): OKFEntity[] {
  return GOOGLE_OPEN_KNOWLEDGE_CATALOG.filter(item => {
    const matchesCategory = category ? item.category === category : true;
    const q = query.toLowerCase();
    const matchesQuery = !q ||
      item.name.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      (item.vendor && item.vendor.toLowerCase().includes(q));
    return matchesCategory && matchesQuery;
  });
}
