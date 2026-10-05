/**
 * Unified FinOps Pricing Catalog — single source of truth for every cost surface
 * (FinOps overlay, Living Specs DOC-01/DOC-14, Terraform static plan preview).
 *
 * These are deterministic heuristic list-price buckets (US region, on-demand), NOT a live
 * Cloud Billing / Pricing API quote. Every consumer must surface COST_MODEL_ASSUMPTIONS so
 * users never mistake a heuristic for an invoice.
 */

export type PricingCategoryId =
  | 'ai_inference'
  | 'kubernetes'
  | 'compute_nodes'
  | 'serverless'
  | 'database'
  | 'cache'
  | 'analytics_warehouse'
  | 'storage'
  | 'messaging'
  | 'security'
  | 'network_edge'
  | 'observability'
  | 'registry'
  | 'network_free'
  | 'generic';

export interface PricingCategory {
  id: PricingCategoryId;
  label: string;
  unitMonthlyUsd: number;
  assumption: string;
}

export const COST_MODEL_ASSUMPTIONS = {
  pricingBasis: 'Heuristic US on-demand list-price buckets (not a live Cloud Billing quote)',
  monthlyRequestBaseline: 750_000,
  cudDiscountPct: 32,
  regionMultipliers: { US: 1.0, EU: 1.1, APAC: 1.15 } as const,
} as const;

export const PRICING_CATALOG: Record<PricingCategoryId, PricingCategory> = {
  ai_inference: {
    id: 'ai_inference',
    label: 'AI / LLM Inference Tier',
    unitMonthlyUsd: 480,
    assumption: 'Vertex AI Gemini tokens + managed vector index (≈25M tokens/mo)',
  },
  kubernetes: {
    id: 'kubernetes',
    label: 'Kubernetes Cluster',
    unitMonthlyUsd: 410,
    assumption: 'Regional GKE control plane + 3 e2-standard-4 nodes',
  },
  compute_nodes: {
    id: 'compute_nodes',
    label: 'Compute Node Pool',
    unitMonthlyUsd: 140,
    assumption: '2 vCPU / 8 GB standard worker node, 730 h/mo',
  },
  serverless: {
    id: 'serverless',
    label: 'Serverless Microservices',
    unitMonthlyUsd: 110,
    assumption: 'Cloud Run Gen2 (2 vCPU / 4 GB) with min-instances=1',
  },
  database: {
    id: 'database',
    label: 'Database & Ledger Tier',
    unitMonthlyUsd: 320,
    assumption: 'Spanner 300 PU / AlloyDB 4 vCPU HA / Cloud SQL HA',
  },
  cache: {
    id: 'cache',
    label: 'In-Memory Cache',
    unitMonthlyUsd: 180,
    assumption: 'Memorystore Redis 5 GB STANDARD_HA',
  },
  analytics_warehouse: {
    id: 'analytics_warehouse',
    label: 'Analytics & Data Warehouse',
    unitMonthlyUsd: 260,
    assumption: 'BigQuery on-demand ≈ 40 TB scanned + 1 TB active storage',
  },
  storage: {
    id: 'storage',
    label: 'Object Storage Tier',
    unitMonthlyUsd: 65,
    assumption: '500 GB dual-region Cloud Storage + WORM retention',
  },
  messaging: {
    id: 'messaging',
    label: 'Event Streaming & Messaging',
    unitMonthlyUsd: 75,
    assumption: '50M Pub/Sub messages/mo (topic + subscriptions)',
  },
  security: {
    id: 'security',
    label: 'Security & WAF Perimeter',
    unitMonthlyUsd: 95,
    assumption: 'Cloud Armor policy + Cloud KMS HSM key operations',
  },
  network_edge: {
    id: 'network_edge',
    label: 'Edge Load Balancing & CDN',
    unitMonthlyUsd: 120,
    assumption: 'Global external HTTPS LB forwarding rule + 1 TB CDN egress',
  },
  observability: {
    id: 'observability',
    label: 'Observability & Telemetry',
    unitMonthlyUsd: 60,
    assumption: 'Cloud Monitoring / Logging ≈ 100 GB ingested',
  },
  registry: {
    id: 'registry',
    label: 'Artifact Registry',
    unitMonthlyUsd: 10,
    assumption: '100 GB container image storage',
  },
  network_free: {
    id: 'network_free',
    label: 'VPC / Subnet (no direct charge)',
    unitMonthlyUsd: 0,
    assumption: 'VPC networks, subnets and key rings have no standalone list price',
  },
  generic: {
    id: 'generic',
    label: 'Cloud Application Service',
    unitMonthlyUsd: 85,
    assumption: 'Managed cloud service endpoint (unclassified)',
  },
};

/** Word-boundary token match — prevents "storage" matching "rag", "online" matching "nli", etc. */
export function hasToken(text: string, ...tokens: string[]): boolean {
  const lower = (text || '').toLowerCase();
  return tokens.some((t) => {
    const escaped = t.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s+');
    return new RegExp(`(^|[^a-z0-9])${escaped}(?=$|[^a-z0-9])`, 'i').test(lower);
  });
}

/** Classifies a diagram node label into a pricing bucket using word-boundary tokens only. */
export function classifyLabelToPricingCategory(label: string): PricingCategoryId {
  const l = (label || '').toLowerCase();
  if (hasToken(l, 'vertex', 'vertex ai', 'gemini', 'llm', 'bedrock', 'sagemaker', 'openai', 'ai foundry', 'scann', 'vector search', 'vector db', 'vector', 'rag', 'agent', 'agents', 'agentic', 'embedding', 'embeddings', 'inference', 'model garden', 'nli')) {
    return 'ai_inference';
  }
  if (hasToken(l, 'gke', 'kubernetes', 'autopilot', 'eks', 'aks', 'k8s')) return 'kubernetes';
  if (hasToken(l, 'cloud run', 'lambda', 'fargate', 'serverless', 'cloud functions', 'functions', 'app engine', 'microservice', 'microservices')) return 'serverless';
  if (hasToken(l, 'redis', 'memorystore', 'elasticache', 'cache', 'memcached')) return 'cache';
  if (hasToken(l, 'bigquery', 'biglake', 'lakehouse', 'redshift', 'synapse', 'snowflake', 'databricks', 'warehouse', 'looker', 'dataplex')) return 'analytics_warehouse';
  if (hasToken(l, 'spanner', 'alloydb', 'cloud sql', 'postgres', 'postgresql', 'mysql', 'aurora', 'rds', 'dynamodb', 'cosmos', 'cosmos db', 'firestore', 'bigtable', 'database', 'ledger', 'sql')) return 'database';
  if (hasToken(l, 'cloud storage', 'gcs', 'bucket', 'buckets', 's3', 'glacier', 'blob storage', 'object storage', 'archive', 'storage')) return 'storage';
  if (hasToken(l, 'pub/sub', 'pubsub', 'kafka', 'kinesis', 'eventbridge', 'sqs', 'event hub', 'service bus', 'dataflow', 'datastream', 'stream', 'streaming', 'queue', 'event mesh')) return 'messaging';
  if (hasToken(l, 'armor', 'waf', 'kms', 'hsm', 'cmek', 'vpc-sc', 'vpc sc', 'iam', 'secret manager', 'secrets', 'guardduty', 'key vault', 'entra', 'security command center', 'scc', 'chronicle', 'firewall', 'shield', 'ddos', 'identity', 'oidc', 'zero-trust', 'zero trust', 'opa')) return 'security';
  if (hasToken(l, 'load balancer', 'load balancing', 'cloud cdn', 'cdn', 'anycast', 'apigee', 'api gateway', 'gateway', 'cloudfront', 'front door', 'application gateway', 'dns', 'ingress', 'envoy', 'kong')) return 'network_edge';
  if (hasToken(l, 'monitoring', 'logging', 'prometheus', 'grafana', 'opentelemetry', 'otel', 'telemetry', 'observability', 'trace', 'tracing', 'cloudwatch', 'x-ray', 'sentinel', 'siem', 'soar')) return 'observability';
  if (hasToken(l, 'artifact registry', 'container registry', 'ecr', 'registry')) return 'registry';
  if (hasToken(l, 'vpc', 'subnet', 'vnet', 'peering', 'interconnect')) return 'network_free';
  return 'generic';
}

/** Maps a Terraform resource type to the same pricing buckets so plan previews agree with the FinOps overlay. */
export function classifyTerraformTypeToPricingCategory(resourceType: string): PricingCategoryId {
  const t = (resourceType || '').toLowerCase();
  if (/vertex_ai|bedrock|sagemaker|ai_index|notebooks/.test(t)) return 'ai_inference';
  if (/container_cluster|eks_cluster|kubernetes_cluster/.test(t)) return 'kubernetes';
  if (/node_pool|node_group|compute_instance/.test(t)) return 'compute_nodes';
  if (/cloud_run|cloudfunctions|lambda|app_engine/.test(t)) return 'serverless';
  if (/redis|elasticache|memcache/.test(t)) return 'cache';
  if (/bigquery|redshift|synapse|dataplex/.test(t)) return 'analytics_warehouse';
  if (/spanner_instance|alloydb_cluster|sql_database_instance|rds_cluster|dynamodb_table|firestore|bigtable_instance/.test(t)) return 'database';
  if (/storage_bucket|s3_bucket/.test(t)) return 'storage';
  if (/pubsub_topic|sqs_queue|kinesis_stream|sns_topic|eventarc/.test(t)) return 'messaging';
  if (/security_policy|kms_crypto_key|kms_key(?!_ring)|secret_manager|wafv2|guardduty/.test(t)) return 'security';
  if (/global_address|forwarding_rule|backend_service|url_map|target_https_proxy|cdn|lb|apigee|api_gateway/.test(t)) return 'network_edge';
  if (/monitoring|logging|cloudwatch/.test(t)) return 'observability';
  if (/artifact_registry|ecr_repository/.test(t)) return 'registry';
  if (/compute_network|compute_subnetwork|vpc|subnet|kms_key_ring|spanner_database|pubsub_subscription|service_account|iam_member|iam_binding|project_service|route|router/.test(t)) return 'network_free';
  return 'generic';
}

export function unitCostForCategory(id: PricingCategoryId, region: keyof typeof COST_MODEL_ASSUMPTIONS.regionMultipliers = 'US'): number {
  const multiplier = COST_MODEL_ASSUMPTIONS.regionMultipliers[region] || 1;
  return Math.round(PRICING_CATALOG[id].unitMonthlyUsd * multiplier);
}

/** Cost per 10k requests against the explicit monthly request baseline (never a hidden magic constant). */
export function costPer10kRequests(monthlyUsd: number): number {
  const per10kBuckets = COST_MODEL_ASSUMPTIONS.monthlyRequestBaseline / 10_000;
  return Math.round((monthlyUsd / per10kBuckets) * 1000) / 1000;
}

export function applyCudDiscount(monthlyUsd: number): number {
  return Math.round(monthlyUsd * (1 - COST_MODEL_ASSUMPTIONS.cudDiscountPct / 100) * 100) / 100;
}

export function formatUsd(value: number): string {
  return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
