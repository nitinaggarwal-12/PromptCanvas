import { CloudEnum, NodeTypeEnum } from '../graph/schema';

export interface StyleToken {
  fillColor: string;
  strokeColor: string;
  fontColor: string;
  shape?: string;
  iconUrl?: string;
}

export const TIER_PALETTE: Record<number, string> = {
  1: '#F8FAFC', // Slate 50
  2: '#F1F5F9', // Slate 100
  3: '#EFF6FF', // Blue 50
  4: '#F0FDF4', // Green 50
  5: '#FAF5FF', // Purple 50
  6: '#FFF7ED', // Orange 50
  7: '#FEF2F2', // Red 50
  8: '#F5F5F5', // Neutral
};

export const NODE_TYPE_STYLES: Record<NodeTypeEnum, StyleToken> = {
  user: { fillColor: '#FFE6CC', strokeColor: '#D79B00', fontColor: '#000000' },
  external: { fillColor: '#FFE6CC', strokeColor: '#D79B00', fontColor: '#000000' },
  network: { fillColor: '#DAE8FC', strokeColor: '#6C8EBF', fontColor: '#000000' },
  security: { fillColor: '#F8CECC', strokeColor: '#B85450', fontColor: '#000000' },
  compute: { fillColor: '#E1D5E7', strokeColor: '#9673A6', fontColor: '#000000' },
  database: { fillColor: '#D5E8D4', strokeColor: '#82B366', fontColor: '#000000', shape: 'cylinder3' },
  storage: { fillColor: '#D5E8D4', strokeColor: '#82B366', fontColor: '#000000' },
  queue: { fillColor: '#FFF2CC', strokeColor: '#D6B656', fontColor: '#000000' },
  cache: { fillColor: '#FFF2CC', strokeColor: '#D6B656', fontColor: '#000000' },
  ai: { fillColor: '#E1D5E7', strokeColor: '#9673A6', fontColor: '#000000' },
  analytics: { fillColor: '#DAE8FC', strokeColor: '#6C8EBF', fontColor: '#000000' },
  gateway: { fillColor: '#F8CECC', strokeColor: '#B85450', fontColor: '#000000', shape: 'rhombus' },
};

export function getProductIconUrl(product: string, cloud: CloudEnum): string {
  const p = (product || '').toLowerCase();

  if (p.includes('gcp') || p.includes('cloud run') || p.includes('bigquery') || p.includes('gcs') || p.includes('vertex')) {
    return 'https://api.iconify.design/logos:google-cloud.svg';
  }
  if (p.includes('aws') || p.includes('s3') || p.includes('ec2') || p.includes('lambda') || p.includes('dynamodb')) {
    return 'https://api.iconify.design/logos:aws.svg';
  }
  if (p.includes('azure') || p.includes('cosmos')) {
    return 'https://api.iconify.design/logos:microsoft-azure.svg';
  }
  if (p.includes('postgres') || p.includes('pgvector')) {
    return 'https://api.iconify.design/logos:postgresql.svg';
  }
  if (p.includes('redis')) {
    return 'https://api.iconify.design/logos:redis.svg';
  }
  if (p.includes('kafka')) {
    return 'https://api.iconify.design/logos:kafka-icon.svg';
  }
  if (p.includes('kubernetes') || p.includes('k8s') || p.includes('eks') || p.includes('gke')) {
    return 'https://api.iconify.design/logos:kubernetes.svg';
  }

  switch (cloud) {
    case 'gcp':
      return 'https://api.iconify.design/logos:google-cloud.svg';
    case 'aws':
      return 'https://api.iconify.design/logos:aws.svg';
    case 'azure':
      return 'https://api.iconify.design/logos:microsoft-azure.svg';
    default:
      return 'https://api.iconify.design/logos:google-cloud.svg';
  }
}
