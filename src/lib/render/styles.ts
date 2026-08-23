import { CloudEnum, NodeTypeEnum } from '../graph/schema';

export interface StyleToken {
  fillColor: string;
  strokeColor: string;
  fontColor: string;
  headerBg?: string;
  badgeBg?: string;
  shape?: string;
  iconUrl?: string;
}

export const TIER_PALETTE_LIGHT: Record<number, string> = {
  1: '#F8FAFC', // Slate 50
  2: '#F1F5F9', // Slate 100
  3: '#EFF6FF', // Blue 50
  4: '#F0FDF4', // Green 50
  5: '#FAF5FF', // Purple 50
  6: '#FFF7ED', // Orange 50
  7: '#FEF2F2', // Red 50
  8: '#F8FAFC', // Neutral
};

export const TIER_PALETTE_DARK: Record<number, string> = {
  1: '#0F172A', // Slate 900
  2: '#1E293B', // Slate 800
  3: '#172554', // Blue 950
  4: '#052E16', // Green 950
  5: '#3B0764', // Purple 950
  6: '#431407', // Orange 950
  7: '#450A0A', // Red 950
  8: '#0F172A', // Neutral
};

export const TIER_PALETTE = TIER_PALETTE_LIGHT;

export const NODE_TYPE_STYLES_LIGHT: Record<NodeTypeEnum, StyleToken> = {
  user: { fillColor: '#FFFFFF', strokeColor: '#F59E0B', fontColor: '#0F172A', badgeBg: '#FEF3C7' },
  external: { fillColor: '#FFFFFF', strokeColor: '#64748B', fontColor: '#0F172A', badgeBg: '#F1F5F9' },
  network: { fillColor: '#FFFFFF', strokeColor: '#0284C7', fontColor: '#0F172A', badgeBg: '#E0F2FE' },
  security: { fillColor: '#FFFFFF', strokeColor: '#DC2626', fontColor: '#0F172A', badgeBg: '#FEE2E2' },
  compute: { fillColor: '#FFFFFF', strokeColor: '#4F46E5', fontColor: '#0F172A', badgeBg: '#EEF2FF' },
  database: { fillColor: '#FFFFFF', strokeColor: '#059669', fontColor: '#0F172A', badgeBg: '#ECFDF5', shape: 'cylinder3' },
  storage: { fillColor: '#FFFFFF', strokeColor: '#0D9488', fontColor: '#0F172A', badgeBg: '#F0FDFA' },
  queue: { fillColor: '#FFFFFF', strokeColor: '#D97706', fontColor: '#0F172A', badgeBg: '#FEF3C7' },
  cache: { fillColor: '#FFFFFF', strokeColor: '#EA580C', fontColor: '#0F172A', badgeBg: '#FFEDD5' },
  ai: { fillColor: '#FFFFFF', strokeColor: '#7C3AED', fontColor: '#0F172A', badgeBg: '#F5F3FF' },
  analytics: { fillColor: '#FFFFFF', strokeColor: '#2563EB', fontColor: '#0F172A', badgeBg: '#EFF6FF' },
  gateway: { fillColor: '#FFFFFF', strokeColor: '#475569', fontColor: '#0F172A', badgeBg: '#F8FAFC' },
};

export const NODE_TYPE_STYLES_DARK: Record<NodeTypeEnum, StyleToken> = {
  user: { fillColor: '#1E293B', strokeColor: '#FBBF24', fontColor: '#F8FAFC', badgeBg: '#78350F' },
  external: { fillColor: '#1E293B', strokeColor: '#94A3B8', fontColor: '#F8FAFC', badgeBg: '#334155' },
  network: { fillColor: '#1E293B', strokeColor: '#38BDF8', fontColor: '#F8FAFC', badgeBg: '#075985' },
  security: { fillColor: '#1E293B', strokeColor: '#F87171', fontColor: '#F8FAFC', badgeBg: '#7F1D1D' },
  compute: { fillColor: '#1E293B', strokeColor: '#818CF8', fontColor: '#F8FAFC', badgeBg: '#312E81' },
  database: { fillColor: '#1E293B', strokeColor: '#34D399', fontColor: '#F8FAFC', badgeBg: '#064E3B', shape: 'cylinder3' },
  storage: { fillColor: '#1E293B', strokeColor: '#2DD4BF', fontColor: '#F8FAFC', badgeBg: '#134E4A' },
  queue: { fillColor: '#1E293B', strokeColor: '#FBBF24', fontColor: '#F8FAFC', badgeBg: '#78350F' },
  cache: { fillColor: '#1E293B', strokeColor: '#FB923C', fontColor: '#F8FAFC', badgeBg: '#7C2D12' },
  ai: { fillColor: '#1E293B', strokeColor: '#A78BFA', fontColor: '#F8FAFC', badgeBg: '#4C1D95' },
  analytics: { fillColor: '#1E293B', strokeColor: '#60A5FA', fontColor: '#F8FAFC', badgeBg: '#1E3A8A' },
  gateway: { fillColor: '#1E293B', strokeColor: '#94A3B8', fontColor: '#F8FAFC', badgeBg: '#334155' },
};

export const NODE_TYPE_STYLES = NODE_TYPE_STYLES_LIGHT;

const ICON_MAP: Record<string, string> = {
  // Google Cloud
  'bigquery': 'https://api.iconify.design/logos:google-cloud.svg',
  'spanner': 'https://api.iconify.design/logos:google-cloud.svg',
  'cloud sql': 'https://api.iconify.design/logos:google-cloud.svg',
  'vertex ai': 'https://api.iconify.design/logos:google-cloud.svg',
  'cloud run': 'https://api.iconify.design/logos:google-cloud.svg',
  'cloud functions': 'https://api.iconify.design/logos:google-cloud.svg',
  'pub/sub': 'https://api.iconify.design/logos:google-cloud.svg',
  'pubsub': 'https://api.iconify.design/logos:google-cloud.svg',
  'dataflow': 'https://api.iconify.design/logos:google-cloud.svg',
  'dataproc': 'https://api.iconify.design/logos:google-cloud.svg',
  'dataplex': 'https://api.iconify.design/logos:google-cloud.svg',
  'gcs': 'https://api.iconify.design/logos:google-cloud.svg',
  'cloud storage': 'https://api.iconify.design/logos:google-cloud.svg',
  'firestore': 'https://api.iconify.design/logos:google-cloud.svg',
  'bigtable': 'https://api.iconify.design/logos:google-cloud.svg',
  'gke': 'https://api.iconify.design/logos:kubernetes.svg',
  'kubernetes': 'https://api.iconify.design/logos:kubernetes.svg',
  'apigee': 'https://api.iconify.design/logos:google-cloud.svg',
  'cloud armor': 'https://api.iconify.design/logos:google-cloud.svg',
  'secret manager': 'https://api.iconify.design/logos:google-cloud.svg',
  'gemini': 'https://api.iconify.design/lucide:sparkles.svg?color=%237C3AED',

  // AWS
  'lambda': 'https://api.iconify.design/logos:aws-lambda.svg',
  's3': 'https://api.iconify.design/logos:aws-s3.svg',
  'dynamodb': 'https://api.iconify.design/logos:aws-dynamodb.svg',
  'ec2': 'https://api.iconify.design/logos:aws-ec2.svg',
  'ecs': 'https://api.iconify.design/logos:aws-ecs.svg',
  'eks': 'https://api.iconify.design/logos:kubernetes.svg',
  'rds': 'https://api.iconify.design/logos:aws-rds.svg',
  'aurora': 'https://api.iconify.design/logos:aws-aurora.svg',
  'sqs': 'https://api.iconify.design/logos:aws-sqs.svg',
  'sns': 'https://api.iconify.design/logos:aws-sns.svg',
  'kinesis': 'https://api.iconify.design/logos:aws-kinesis.svg',
  'cloudfront': 'https://api.iconify.design/logos:aws-cloudfront.svg',
  'sagemaker': 'https://api.iconify.design/logos:aws-sagemaker.svg',

  // Azure
  'cosmos': 'https://api.iconify.design/logos:azure-cosmos-db.svg',
  'azure blob': 'https://api.iconify.design/logos:microsoft-azure.svg',
  'azure sql': 'https://api.iconify.design/logos:microsoft-azure.svg',
  'aks': 'https://api.iconify.design/logos:kubernetes.svg',
  'event hubs': 'https://api.iconify.design/logos:microsoft-azure.svg',

  // Data / AI / OSS
  'kafka': 'https://api.iconify.design/logos:kafka-icon.svg',
  'redis': 'https://api.iconify.design/logos:redis.svg',
  'postgres': 'https://api.iconify.design/logos:postgresql.svg',
  'postgresql': 'https://api.iconify.design/logos:postgresql.svg',
  'pgvector': 'https://api.iconify.design/logos:postgresql.svg',
  'mysql': 'https://api.iconify.design/logos:mysql-icon.svg',
  'mongodb': 'https://api.iconify.design/logos:mongodb-icon.svg',
  'elasticsearch': 'https://api.iconify.design/logos:elasticsearch.svg',
  'opensearch': 'https://api.iconify.design/logos:opensearch.svg',
  'databricks': 'https://api.iconify.design/logos:databricks.svg',
  'snowflake': 'https://api.iconify.design/logos:snowflake-icon.svg',
  'dbt': 'https://api.iconify.design/logos:dbt-icon.svg',
  'airflow': 'https://api.iconify.design/logos:airflow-icon.svg',
  'neo4j': 'https://api.iconify.design/logos:neo4j.svg',
  'docker': 'https://api.iconify.design/logos:docker-icon.svg',
  'terraform': 'https://api.iconify.design/logos:terraform-icon.svg',
  'graphql': 'https://api.iconify.design/logos:graphql.svg',
  'istio': 'https://api.iconify.design/logos:istio.svg',
  'qdrant': 'https://api.iconify.design/lucide:database.svg?color=%23059669',
  'pinecone': 'https://api.iconify.design/lucide:database.svg?color=%23059669',
};

export function getProductIconUrl(product: string, cloud: CloudEnum): string {
  const p = (product || '').toLowerCase();

  for (const [key, iconUrl] of Object.entries(ICON_MAP)) {
    if (p.includes(key)) {
      return iconUrl;
    }
  }

  switch (cloud) {
    case 'gcp':
      return 'https://api.iconify.design/logos:google-cloud.svg';
    case 'aws':
      return 'https://api.iconify.design/logos:aws.svg';
    case 'azure':
      return 'https://api.iconify.design/logos:microsoft-azure.svg';
    default:
      return 'https://api.iconify.design/lucide:box.svg?color=%233B82F6';
  }
}
