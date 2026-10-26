import { CloudEnum, NodeTypeEnum } from '../graph/schema';

interface StyleToken {
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

const svgDataUri = (svg: string) => `data:image/svg+xml,${encodeURIComponent(svg.trim())}`;

const OFFLINE_GCP_ICON = svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>`);
const OFFLINE_K8S_ICON = svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><circle cx="24" cy="24" r="22" fill="#326CE5"/><path fill="#FFFFFF" d="M24 8l13 7.5v15L24 38 11 30.5v-15L24 8zm0 4.5L14.8 17.8v10.4L24 33.5l9.2-5.3V17.8L24 12.5z"/><circle cx="24" cy="24" r="4" fill="#FFFFFF"/></svg>`);
const OFFLINE_GEMINI_ICON = svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><circle cx="24" cy="24" r="22" fill="#1E293B"/><path fill="#38BDF8" d="M24 8c0 8.8-7.2 16-16 16 8.8 0 16 7.2 16 16 0-8.8 7.2-16 16-16-8.8 0-16-7.2-16-16z"/></svg>`);
const OFFLINE_AWS_ICON = svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="8" fill="#232F3E"/><path fill="#FF9900" d="M14 26.5c-2.4 0-4.3-.8-5.7-2.3l2.2-2.4c.9 1 2.2 1.6 3.5 1.6 1.8 0 2.8-1 2.8-2.6v-.3c-.8.5-1.9.8-3.1.8-3.2 0-5.5-1.8-5.5-4.8 0-3.3 2.6-5.1 6.1-5.1 1.7 0 3 .5 3.9 1.4v-1.1h3.3v10.8c0 2.5-.9 4.3-2.6 5.3-1.3.8-3.1 1.2-4.9 1.2z"/></svg>`);
const OFFLINE_AZURE_ICON = svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="#0078D4" d="M17.4 4L4 39.5h10.2L27.6 4z"/><path fill="#50E6FF" d="M29.6 13.7L18.4 34.6 23.8 39.5h18.2L44 34z"/><path fill="#005BA1" d="M14.2 39.5l4.2-4.9 9.2-20.9 2-4.6z"/></svg>`);
const OFFLINE_DB_ICON = svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><circle cx="24" cy="24" r="22" fill="#059669"/><ellipse cx="24" cy="15" rx="11" ry="4" fill="#FFFFFF"/><path fill="#FFFFFF" d="M13 19v6c0 2.2 4.9 4 11 4s11-1.8 11-4v-6c-2.3 1.7-6.4 2.8-11 2.8S15.3 20.7 13 19zm0 9v6c0 2.2 4.9 4 11 4s11-1.8 11-4v-6c-2.3 1.7-6.4 2.8-11 2.8S15.3 29.7 13 28z"/></svg>`);
const OFFLINE_BOX_ICON = svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect x="6" y="6" width="36" height="36" rx="8" fill="#1A73E8"/><path fill="#FFFFFF" d="M24 12l12 6.5v11L24 36l-12-6.5v-11L24 12z"/></svg>`);

const ICON_MAP: Record<string, string> = {
  // Google Cloud
  'bigquery': OFFLINE_GCP_ICON,
  'spanner': OFFLINE_GCP_ICON,
  'cloud sql': OFFLINE_GCP_ICON,
  'vertex ai': OFFLINE_GCP_ICON,
  'cloud run': OFFLINE_GCP_ICON,
  'cloud functions': OFFLINE_GCP_ICON,
  'pub/sub': OFFLINE_GCP_ICON,
  'pubsub': OFFLINE_GCP_ICON,
  'dataflow': OFFLINE_GCP_ICON,
  'dataproc': OFFLINE_GCP_ICON,
  'dataplex': OFFLINE_GCP_ICON,
  'gcs': OFFLINE_GCP_ICON,
  'cloud storage': OFFLINE_GCP_ICON,
  'firestore': OFFLINE_GCP_ICON,
  'bigtable': OFFLINE_GCP_ICON,
  'gke': OFFLINE_K8S_ICON,
  'kubernetes': OFFLINE_K8S_ICON,
  'apigee': OFFLINE_GCP_ICON,
  'cloud armor': OFFLINE_GCP_ICON,
  'secret manager': OFFLINE_GCP_ICON,
  'gemini': OFFLINE_GEMINI_ICON,

  // AWS
  'lambda': OFFLINE_AWS_ICON,
  's3': OFFLINE_AWS_ICON,
  'dynamodb': OFFLINE_AWS_ICON,
  'ec2': OFFLINE_AWS_ICON,
  'ecs': OFFLINE_AWS_ICON,
  'eks': OFFLINE_K8S_ICON,
  'rds': OFFLINE_AWS_ICON,
  'aurora': OFFLINE_AWS_ICON,
  'sqs': OFFLINE_AWS_ICON,
  'sns': OFFLINE_AWS_ICON,
  'kinesis': OFFLINE_AWS_ICON,
  'cloudfront': OFFLINE_AWS_ICON,
  'sagemaker': OFFLINE_AWS_ICON,

  // Azure
  'cosmos': OFFLINE_AZURE_ICON,
  'azure blob': OFFLINE_AZURE_ICON,
  'azure sql': OFFLINE_AZURE_ICON,
  'aks': OFFLINE_K8S_ICON,
  'event hubs': OFFLINE_AZURE_ICON,

  // Data / AI / OSS
  'kafka': OFFLINE_BOX_ICON,
  'redis': OFFLINE_DB_ICON,
  'postgres': OFFLINE_DB_ICON,
  'postgresql': OFFLINE_DB_ICON,
  'pgvector': OFFLINE_DB_ICON,
  'mysql': OFFLINE_DB_ICON,
  'mongodb': OFFLINE_DB_ICON,
  'elasticsearch': OFFLINE_DB_ICON,
  'opensearch': OFFLINE_DB_ICON,
  'databricks': OFFLINE_DB_ICON,
  'biglake': OFFLINE_GCP_ICON,
  'dbt': OFFLINE_BOX_ICON,
  'airflow': OFFLINE_BOX_ICON,
  'neo4j': OFFLINE_DB_ICON,
  'docker': OFFLINE_K8S_ICON,
  'terraform': OFFLINE_BOX_ICON,
  'graphql': OFFLINE_BOX_ICON,
  'istio': OFFLINE_K8S_ICON,
  'qdrant': OFFLINE_DB_ICON,
  'pinecone': OFFLINE_DB_ICON,
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
      return OFFLINE_GCP_ICON;
    case 'aws':
      return OFFLINE_AWS_ICON;
    case 'azure':
      return OFFLINE_AZURE_ICON;
    default:
      return OFFLINE_BOX_ICON;
  }
}
