import { parseXmlNodesAndEdges, DiagramNodeItem } from '../graph/xmlNodesParser';
import {
  COST_MODEL_ASSUMPTIONS,
  PRICING_CATALOG,
  PricingCategoryId,
  classifyLabelToPricingCategory,
  hasToken,
  unitCostForCategory,
} from './unifiedPricing';

export interface CloudCostItem {
  id: string;
  resourceName: string;
  category: string;
  pricingCategoryId: PricingCategoryId;
  count: number;
  unitMonthlyCostUsd: number;
  totalMonthlyCostUsd: number;
  pricingTierDescription: string;
  cloudProvider: 'GCP' | 'AWS' | 'Azure' | 'Multi-Cloud';
}

export interface CloudCostReport {
  diagramName: string;
  provider: 'GCP' | 'AWS' | 'Azure' | 'Multi-Cloud';
  totalMonthlyCostUsd: number;
  totalAnnualCostUsd: number;
  items: CloudCostItem[];
  savingsRecommendation: string;
  /** Explicit model assumptions so no consumer can present this as a billing quote. */
  assumptions: {
    pricingBasis: string;
    monthlyRequestBaseline: number;
    cudDiscountPct: number;
    region: 'US' | 'EU' | 'APAC';
    billableNodes: number;
    skippedVisualNodes: number;
  };
}

const AZURE_TOKENS = ['azure', 'aks', 'cosmos', 'cosmos db', 'entra', 'front door', 'application gateway', 'app gateway', 'key vault', 'vnet', 'synapse', 'event hub', 'event hubs', 'service bus', 'azure openai', 'ai foundry', 'sentinel', 'defender'];
const AWS_TOKENS = ['aws', 'eks', 'ecs', 'fargate', 'lambda', 'aurora', 'rds', 'dynamodb', 's3', 'cloudfront', 'route 53', 'route53', 'kinesis', 'eventbridge', 'bedrock', 'sagemaker', 'redshift', 'sqs', 'sns', 'glacier', 'guardduty', 'cloudwatch', 'opensearch', 'elasticache'];

function providerSpecificDescription(
  provider: 'GCP' | 'AWS' | 'Azure',
  category: PricingCategoryId,
  lower: string
): string {
  if (provider === 'Azure') {
    switch (category) {
      case 'kubernetes': return 'Azure Kubernetes Service Standard tier + 3 node pools';
      case 'database': return 'Azure Cosmos DB / Azure SQL Business Critical';
      case 'analytics_warehouse': return 'Azure Synapse dedicated SQL pool (DW100c)';
      case 'network_edge': return 'Azure Front Door Premium / App Gateway WAF v2';
      case 'ai_inference': return 'Azure AI Foundry provisioned throughput (PTU)';
      case 'security': return 'Microsoft Entra ID P2 + Key Vault HSM operations';
      default: return 'Managed Azure PaaS endpoint / Private Link';
    }
  }
  if (provider === 'AWS') {
    switch (category) {
      case 'kubernetes': return 'Amazon EKS control plane + managed node group';
      case 'serverless': return hasToken(lower, 'lambda') ? 'AWS Lambda provisioned concurrency (2 GB)' : 'AWS Fargate tasks (2 vCPU / 4 GB)';
      case 'database': return hasToken(lower, 'dynamodb') ? 'Amazon DynamoDB on-demand + global tables' : 'Amazon Aurora PostgreSQL Multi-AZ';
      case 'analytics_warehouse': return 'Amazon Redshift Serverless (base RPUs)';
      case 'ai_inference': return 'Amazon Bedrock tokens / SageMaker real-time endpoint';
      case 'storage': return 'Amazon S3 Standard + cross-region replication';
      case 'messaging': return 'Amazon Kinesis Data Streams / SQS / EventBridge';
      case 'cache': return 'Amazon ElastiCache for Redis (cache.m6g.large)';
      case 'security': return 'AWS KMS CMK + WAF + GuardDuty';
      case 'network_edge': return 'Amazon CloudFront + Application Load Balancer';
      default: return 'Managed AWS service endpoint';
    }
  }
  switch (category) {
    case 'ai_inference': return 'Vertex AI Gemini 3.1 Pro / 3.8 Flash tokens + Vector Search index';
    case 'kubernetes': return 'GKE regional control plane + 3 e2-standard-4 nodes';
    case 'serverless': return 'Cloud Run Gen2 (2 vCPU / 4 GB, min-instances=1)';
    case 'database': return hasToken(lower, 'spanner') ? 'Cloud Spanner 300 processing units' : hasToken(lower, 'alloydb') ? 'AlloyDB 4 vCPU HA primary' : 'Cloud SQL HA (db-custom-2-8192)';
    case 'cache': return 'Memorystore for Redis 5 GB STANDARD_HA';
    case 'analytics_warehouse': return 'BigQuery on-demand (≈40 TB scanned) + active storage';
    case 'storage': return '500 GB dual-region Cloud Storage + retention lock';
    case 'messaging': return hasToken(lower, 'dataflow') ? 'Dataflow streaming (2 workers) + Pub/Sub' : '50M Pub/Sub messages / month';
    case 'security': return 'Cloud Armor policy + Cloud KMS HSM key operations';
    case 'network_edge': return 'Global external HTTPS LB + Cloud CDN egress';
    case 'observability': return 'Cloud Monitoring / Logging (≈100 GB ingested)';
    case 'registry': return 'Artifact Registry (100 GB images)';
    case 'network_free': return 'VPC / subnet — no standalone charge';
    default: return PRICING_CATALOG[category].assumption;
  }
}

/**
 * 💰 Computes monthly cloud infrastructure cost estimates directly from diagram XML nodes
 * (excluding visual containers, headers and legends) using the unified pricing catalog so
 * FinOps overlays, Living Specs and Terraform previews always agree.
 */
export function estimateCloudArchitectureCost(
  xmlContent: string,
  diagramName: string = 'Enterprise Cloud Architecture',
  _archType: string = 'unified_system_view',
  region: 'US' | 'EU' | 'APAC' = 'US'
): CloudCostReport {
  const itemsAll = parseXmlNodesAndEdges(xmlContent || '');
  const nodes = itemsAll.filter((i: DiagramNodeItem) => !i.isEdge);

  const items: CloudCostItem[] = [];
  let providerCountGcp = 0;
  let providerCountAws = 0;
  let providerCountAzure = 0;
  let skippedVisualNodes = 0;

  nodes.forEach((node: DiagramNodeItem, idx: number) => {
    const id = (node.id || '').toLowerCase();
    const style = (node.style || '').toLowerCase();
    const w = node.width || 0;
    const h = node.height || 0;

    // Filter out non-billable visual containers, swimlanes, headers, banners, legends, and badges
    if (
      style.includes('swimlane') ||
      style.includes('container=1') ||
      style.includes('group') ||
      (style.includes('fillcolor=none') && style.includes('strokecolor=none')) ||
      /^(0|1|z\d|zone_|tier_|hdr_|header_|title|banner|legend|leg_|footer|ftr_|bg_|poster_|swimlane|grp_|group_|frame|panel|callout|watermark|lbl_|badge|pill|step_)/.test(id) ||
      (w >= 600 && h >= 200) ||
      (w >= 900 && h <= 110)
    ) {
      skippedVisualNodes++;
      return;
    }

    const text = (node.label || '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    if (!text || text.length < 3) {
      skippedVisualNodes++;
      return;
    }
    const lower = text.toLowerCase();

    // Ignore zone/tier headers, prompt callouts, or legend labels by text pattern
    if (
      lower.includes('1. gcp continuous') ||
      lower.includes('2. vertex ai automated') ||
      lower.includes('3. vertex ai safety') ||
      lower.includes('4. vertex ai promotion') ||
      lower.includes('ingestion portal') ||
      lower.includes('overall architecture') ||
      lower.startsWith('tier ') ||
      lower.startsWith('zone ') ||
      lower.startsWith('layer ') ||
      lower.startsWith('cumulative ') ||
      lower.startsWith('💬') ||
      lower.includes('reference architecture') ||
      lower.includes('legend')
    ) {
      skippedVisualNodes++;
      return;
    }

    const resourceName = text.slice(0, 46);
    const pricingCategoryId = classifyLabelToPricingCategory(lower);

    let prov: 'GCP' | 'AWS' | 'Azure' = 'GCP';
    if (hasToken(lower, ...AZURE_TOKENS)) {
      prov = 'Azure';
      providerCountAzure++;
    } else if (hasToken(lower, ...AWS_TOKENS)) {
      prov = 'AWS';
      providerCountAws++;
    } else {
      providerCountGcp++;
    }

    const unitCost = unitCostForCategory(pricingCategoryId, region);

    items.push({
      id: node.id || `cost_${idx}`,
      resourceName,
      category: PRICING_CATALOG[pricingCategoryId].label,
      pricingCategoryId,
      count: 1,
      unitMonthlyCostUsd: unitCost,
      totalMonthlyCostUsd: unitCost,
      pricingTierDescription: providerSpecificDescription(prov, pricingCategoryId, lower),
      cloudProvider: prov,
    });
  });

  const totalMonthly = items.reduce((sum, item) => sum + item.totalMonthlyCostUsd, 0);
  const totalAnnual = totalMonthly * 12;

  const activeProviders = [
    providerCountGcp > 0 ? 'GCP' : null,
    providerCountAws > 0 ? 'AWS' : null,
    providerCountAzure > 0 ? 'Azure' : null,
  ].filter(Boolean) as Array<'GCP' | 'AWS' | 'Azure'>;

  let provider: 'GCP' | 'AWS' | 'Azure' | 'Multi-Cloud' = 'GCP';
  if (activeProviders.length > 1) {
    provider = 'Multi-Cloud';
  } else if (activeProviders.length === 1) {
    provider = activeProviders[0];
  }

  const savingsRecommendation =
    totalMonthly > 1500
      ? `💡 Commitment Discount Tip: 1-to-3 year ${provider === 'Multi-Cloud' ? 'Cloud' : provider} committed-use / reserved pricing can reduce this heuristic estimate by up to ${COST_MODEL_ASSUMPTIONS.cudDiscountPct}% (~$${Math.round(totalMonthly * (COST_MODEL_ASSUMPTIONS.cudDiscountPct / 100))}/mo).`
      : `💡 Serverless Optimization: scale-to-zero during off-peak hours can trim up to 22% (~$${Math.round(totalMonthly * 0.22)}/mo) of this heuristic estimate.`;

  return {
    diagramName,
    provider,
    totalMonthlyCostUsd: totalMonthly,
    totalAnnualCostUsd: totalAnnual,
    items,
    savingsRecommendation,
    assumptions: {
      pricingBasis: COST_MODEL_ASSUMPTIONS.pricingBasis,
      monthlyRequestBaseline: COST_MODEL_ASSUMPTIONS.monthlyRequestBaseline,
      cudDiscountPct: COST_MODEL_ASSUMPTIONS.cudDiscountPct,
      region,
      billableNodes: items.length,
      skippedVisualNodes,
    },
  };
}
