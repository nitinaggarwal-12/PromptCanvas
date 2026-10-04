import { parseXmlNodesAndEdges, DiagramNodeItem } from '../graph/xmlNodesParser';

export interface CloudCostItem {
  id: string;
  resourceName: string;
  category: string;
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
}

/**
 * 💰 Computes monthly cloud infrastructure cost estimates (GCP/AWS/Azure/Infracost engine)
 * directly from diagram XML nodes while excluding visual containers, headers, and legends.
 */
export function estimateCloudArchitectureCost(
  xmlContent: string,
  diagramName: string = 'Enterprise Cloud Architecture',
  _archType: string = 'unified_system_view',
  region: 'US' | 'EU' | 'APAC' = 'US'
): CloudCostReport {
  const regionMultipliers = {
    US: 1.0,
    EU: 1.10,
    APAC: 1.15
  };
  const multiplier = regionMultipliers[region] || 1.0;

  const itemsAll = parseXmlNodesAndEdges(xmlContent || '');
  const nodes = itemsAll.filter((i: DiagramNodeItem) => !i.isEdge);

  const items: CloudCostItem[] = [];
  let providerCountGcp = 0;
  let providerCountAws = 0;
  let providerCountAzure = 0;

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
      (style.includes('fillColor=none') && style.includes('strokeColor=none')) ||
      /^(0|1|z\d|zone_|tier_|hdr_|header_|title|banner|legend|leg_|footer|ftr_|bg_|poster_|swimlane|grp_|group_|frame|panel|callout|watermark|lbl_|badge|pill|step_)/.test(id) ||
      (w >= 600 && h >= 200) ||
      (w >= 900 && h <= 110)
    ) {
      return;
    }

    const text = (node.label || '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    if (!text || text.length < 3) return;
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
      return;
    }

    const resourceName = text.slice(0, 46);
    let category = 'Compute & API Tier';
    let unitCost = 140;
    let desc = '2 vCPU / 8 GB RAM Standard Worker Node';
    let prov: 'GCP' | 'AWS' | 'Azure' = 'GCP';

    const isAzureNode =
      lower.includes('azure') ||
      lower.includes('aks') ||
      lower.includes('cosmos') ||
      lower.includes('entra') ||
      lower.includes('front door') ||
      lower.includes('application gateway') ||
      lower.includes('app gateway') ||
      lower.includes('key vault') ||
      lower.includes('vnet') ||
      lower.includes('synapse') ||
      lower.includes('event hub') ||
      lower.includes('service bus');

    const isAwsNode =
      lower.includes('aws') ||
      lower.includes('eks') ||
      lower.includes('ecs') ||
      lower.includes('fargate') ||
      lower.includes('lambda') ||
      lower.includes('aurora') ||
      lower.includes('rds') ||
      lower.includes('dynamodb') ||
      lower.includes('s3') ||
      lower.includes('cloudfront') ||
      lower.includes('route 53') ||
      lower.includes('kinesis') ||
      lower.includes('eventbridge') ||
      lower.includes('bedrock') ||
      lower.includes('sagemaker');

    if (isAzureNode) {
      prov = 'Azure';
      providerCountAzure++;
      if (lower.includes('aks') || lower.includes('kubernetes')) {
        category = 'Kubernetes Cluster (AKS)';
        unitCost = 420;
        desc = 'Azure Kubernetes Service Standard Tier + 3 System/User Node Pools';
      } else if (lower.includes('cosmos') || lower.includes('sql') || lower.includes('synapse')) {
        category = 'Database & Data Platform';
        unitCost = 350;
        desc = 'Azure Cosmos DB / Azure SQL Business Critical Multi-Region';
      } else if (lower.includes('front door') || lower.includes('gateway') || lower.includes('waf') || lower.includes('firewall')) {
        category = 'Edge & Network Security';
        unitCost = 165;
        desc = 'Azure Front Door Premium / App Gateway WAF v2';
      } else if (lower.includes('openai') || lower.includes('ai foundry') || lower.includes('cognitive')) {
        category = 'AI / LLM Inference Tier';
        unitCost = 490;
        desc = 'Azure AI Foundry Provisioned Throughput Units (PTU)';
      } else if (lower.includes('entra') || lower.includes('key vault') || lower.includes('defender') || lower.includes('sentinel')) {
        category = 'Identity & Zero-Trust Security';
        unitCost = 95;
        desc = 'Microsoft Entra ID P2 + Key Vault HSM Operations';
      } else {
        category = 'Azure PaaS Workload';
        unitCost = 130;
        desc = 'Managed Azure App Service / VNet Private Link Endpoint';
      }
    } else if (isAwsNode) {
      prov = 'AWS';
      providerCountAws++;
      if (lower.includes('eks') || lower.includes('ecs') || lower.includes('fargate')) {
        category = 'Container & Kubernetes Tier';
        unitCost = 415;
        desc = 'Amazon EKS Control Plane + Managed Fargate / EC2 Spot Pool';
      } else if (lower.includes('aurora') || lower.includes('rds') || lower.includes('dynamodb')) {
        category = 'Database & Ledger Tier';
        unitCost = 340;
        desc = 'Amazon Aurora Global Database / DynamoDB On-Demand';
      } else if (lower.includes('bedrock') || lower.includes('sagemaker')) {
        category = 'AI / Foundation Model Tier';
        unitCost = 475;
        desc = 'Amazon Bedrock / SageMaker Real-Time Inference Endpoint';
      } else if (lower.includes('s3') || lower.includes('glacier')) {
        category = 'Object Storage Tier';
        unitCost = 65;
        desc = 'Amazon S3 Standard + Cross-Region Replication';
      } else if (lower.includes('lambda')) {
        category = 'Serverless Compute';
        unitCost = 105;
        desc = 'AWS Lambda Provisioned Concurrency (2 GB RAM)';
      } else {
        category = 'AWS Managed Service';
        unitCost = 115;
        desc = 'Managed AWS CloudFront / ALB / EventBridge Endpoint';
      }
    } else if (lower.includes('vertex') || lower.includes('gemini') || lower.includes('ai platform') || lower.includes('nli') || lower.includes('scann') || lower.includes('rag') || lower.includes('agent')) {
      category = 'AI / LLM Inference Tier';
      unitCost = 480;
      desc = 'Vertex AI Gemini 2.5 Flash / 3.1 Pro Tokens & Safety Harness';
      prov = 'GCP';
      providerCountGcp++;
    } else if (lower.includes('armor') || lower.includes('waf') || lower.includes('safety setting') || lower.includes('kms') || lower.includes('vpc-sc')) {
      category = 'Security & WAF Perimeter';
      unitCost = 95;
      desc = 'Cloud Armor Managed Protection + Cloud KMS HSM';
      prov = 'GCP';
      providerCountGcp++;
    } else if (lower.includes('cloud storage') || lower.includes('gcs') || lower.includes('bucket')) {
      category = 'Storage Tier';
      unitCost = 65;
      desc = '500 GB Dual-Region Cloud Storage + WORM Lock';
      prov = 'GCP';
      providerCountGcp++;
    } else if (lower.includes('bigquery') || lower.includes('alloydb') || lower.includes('spanner') || lower.includes('sql') || lower.includes('redis') || lower.includes('memorystore')) {
      category = 'Database & Data Warehouse';
      unitCost = 320;
      desc = 'High-Availability Spanner / AlloyDB / BigQuery Slot Allocation';
      prov = 'GCP';
      providerCountGcp++;
    } else if (lower.includes('cloud run') || lower.includes('microservice')) {
      category = 'Serverless Microservices';
      unitCost = 110;
      desc = 'Autoscaling Cloud Run Gen2 Microservices (2 vCPU / 4 GB RAM)';
      prov = 'GCP';
      providerCountGcp++;
    } else if (lower.includes('gke') || lower.includes('kubernetes') || lower.includes('autopilot')) {
      category = 'Kubernetes Cluster';
      unitCost = 410;
      desc = 'GKE Autopilot Control Plane + 3 Regional Node Pools';
      prov = 'GCP';
      providerCountGcp++;
    } else if (lower.includes('pub/sub') || lower.includes('pubsub') || lower.includes('dataflow') || lower.includes('datastream') || lower.includes('kafka')) {
      category = 'Event Streaming & Messaging';
      unitCost = 75;
      desc = '50M Messages / Month Cloud Pub/Sub & Dataflow Stream';
      prov = 'GCP';
      providerCountGcp++;
    } else {
      category = 'Cloud Application Service';
      unitCost = 85;
      desc = 'Managed Cloud Service Endpoint';
      providerCountGcp++;
    }

    const finalUnitCost = Math.round(unitCost * multiplier);

    items.push({
      id: node.id || `cost_${idx}`,
      resourceName,
      category,
      count: 1,
      unitMonthlyCostUsd: finalUnitCost,
      totalMonthlyCostUsd: finalUnitCost,
      pricingTierDescription: desc,
      cloudProvider: prov
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
      ? `💡 Commitment Discount Tip: Enrolling in 1-to-3 Year ${provider === 'Multi-Cloud' ? 'Cloud' : provider} Committed Use / Reserved Instance Discounts can reduce your monthly bill by up to 34% (~$${Math.round(totalMonthly * 0.34)}/mo savings).`
      : `💡 Serverless Optimization: Utilizing autoscaling idle-to-zero scale down during off-peak hours can trim up to 22% (~$${Math.round(totalMonthly * 0.22)}/mo savings).`;

  return {
    diagramName,
    provider,
    totalMonthlyCostUsd: totalMonthly,
    totalAnnualCostUsd: totalAnnual,
    items,
    savingsRecommendation
  };
}

