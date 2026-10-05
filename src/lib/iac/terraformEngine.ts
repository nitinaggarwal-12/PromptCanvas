/**
 * Terraform & Infrastructure as Code (IaC) Generation Engine
 *
 * Generates Terraform modules and Kubernetes manifests that are GROUNDED in the active
 * canvas: every `resource` block is derived from a classified canvas node (or, when no
 * canvas XML is attached, from a clearly labelled baseline reference topology).
 *
 * The "plan" surface is an offline static analysis (syntax, required attributes, security
 * lint) — it never claims to be a real `terraform plan`.
 */

import { parseXmlNodesAndEdges } from '../graph/xmlNodesParser';
import { analyzeHcl } from './hclStaticAnalysis';
import {
  PRICING_CATALOG,
  classifyLabelToPricingCategory,
  classifyTerraformTypeToPricingCategory,
  formatUsd,
  hasToken,
  unitCostForCategory,
  COST_MODEL_ASSUMPTIONS,
} from '../cost/unifiedPricing';

export const TERRAFORM_PINS = {
  requiredVersion: '>= 1.9.0',
  google: '~> 6.12',
  googleBeta: '~> 6.12',
  kubernetes: '~> 2.35',
  aws: '~> 5.80',
  redisVersion: 'REDIS_7_2',
  gkeReleaseChannel: 'REGULAR',
  postgresVersion: 'POSTGRES_16',
} as const;

export type TerraformGroundingSource = 'canvas-xml' | 'baseline-template';

export interface TerraformFileBundle {
  mainTf: string;
  variablesTf: string;
  outputsTf: string;
  terraformTfvars: string;
  providerTf: string;
  k8sManifestYaml: string;
  resourcesCount: number;
  groundingSource: TerraformGroundingSource;
  canvasNodeCount: number;
  mappedNodeCount: number;
  unmappedNodeLabels: string[];
  cloudProvider: 'gcp' | 'aws';
}

export interface TerraformPlanSimulation {
  planOutput: string;
  resourcesToAdd: number;
  resourcesToChange: number;
  resourcesToDestroy: number;
  estimatedMonthlyCost: string;
  estimatedMonthlyCostUsd: number;
  securityChecksRun: number;
  securityChecksPassed: number;
  securityWarnings: string[];
  errors: string[];
  infoNotes: string[];
  analysisMode: 'offline-static-analysis';
}

type ResourceKind =
  | 'waf'
  | 'lb'
  | 'gke'
  | 'cloud_run'
  | 'spanner'
  | 'alloydb'
  | 'cloud_sql'
  | 'bigquery'
  | 'redis'
  | 'pubsub'
  | 'storage'
  | 'vertex_index'
  | 'kms'
  | 'observability'
  | 'registry'
  | 'external_actor'
  | 'unmapped';

interface CanvasNode {
  id: string;
  label: string;
  slug: string;
  k8sSlug: string;
  kind: ResourceKind;
  isAws: boolean;
}

const AWS_HINT_TOKENS = ['aws', 'amazon', 'eks', 'ecs', 'fargate', 'lambda', 'aurora', 'rds', 'dynamodb', 's3', 'cloudfront', 'kinesis', 'eventbridge', 'bedrock', 'sagemaker', 'redshift', 'sqs', 'sns', 'elasticache', 'opensearch', 'cloudwatch', 'guardduty'];
const APP_WORKLOAD_TOKENS = ['service', 'services', 'api', 'portal', 'app', 'application', 'engine', 'worker', 'workers', 'orchestrator', 'processor', 'pipeline', 'extractor', 'console', 'dashboard', 'backend', 'frontend', 'microservice', 'microservices', 'adapter', 'connector', 'router', 'scheduler', 'handler', 'gateway', 'bff', 'ui', 'web'];
const EXTERNAL_ACTOR_TOKENS = ['user', 'users', 'customer', 'customers', 'browser', 'mobile', 'client', 'clients', 'operator', 'analyst', 'clinician', 'patient', 'drone', 'sensor', 'iot', 'device', 'devices', 'partner', 'third-party', 'on-prem', 'on-premises', 'legacy', 'sap', 'erp', 'actor'];

function slugify(label: string): string {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .replace(/^(\d)/, 'n$1')
    .slice(0, 28) || 'node';
}

function hclString(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\$\{/g, '$${');
}

function classifyNodeKind(label: string): ResourceKind {
  const l = label.toLowerCase();
  if (hasToken(l, 'armor', 'waf', 'shield', 'ddos', 'firewall')) return 'waf';
  if (hasToken(l, 'kms', 'hsm', 'cmek', 'secret manager', 'secrets', 'key vault', 'vpc-sc', 'vpc sc', 'iam', 'zero-trust', 'zero trust', 'identity')) return 'kms';
  if (hasToken(l, 'vertex', 'vertex ai', 'gemini', 'llm', 'rag', 'vector', 'vector search', 'scann', 'embedding', 'embeddings', 'agent', 'agents', 'agentic', 'bedrock', 'sagemaker', 'openai', 'model garden', 'inference')) return 'vertex_index';
  if (hasToken(l, 'gke', 'kubernetes', 'autopilot', 'k8s', 'eks', 'aks')) return 'gke';
  if (hasToken(l, 'spanner')) return 'spanner';
  if (hasToken(l, 'alloydb')) return 'alloydb';
  if (hasToken(l, 'cloud sql', 'postgres', 'postgresql', 'mysql', 'aurora', 'rds', 'database', 'ledger', 'sql', 'dynamodb', 'firestore', 'cosmos')) return 'cloud_sql';
  if (hasToken(l, 'bigquery', 'biglake', 'lakehouse', 'warehouse', 'redshift', 'synapse', 'analytics', 'looker', 'dataplex')) return 'bigquery';
  if (hasToken(l, 'redis', 'memorystore', 'elasticache', 'cache', 'memcached')) return 'redis';
  if (hasToken(l, 'pub/sub', 'pubsub', 'kafka', 'kinesis', 'eventbridge', 'sqs', 'event hub', 'dataflow', 'datastream', 'stream', 'streaming', 'queue', 'event mesh', 'event bus')) return 'pubsub';
  if (hasToken(l, 'cloud storage', 'gcs', 'bucket', 'buckets', 's3', 'glacier', 'object storage', 'archive', 'storage', 'data lake', 'lake')) return 'storage';
  if (hasToken(l, 'load balancer', 'load balancing', 'cloud cdn', 'cdn', 'anycast', 'apigee', 'api gateway', 'cloudfront', 'front door', 'application gateway', 'dns', 'ingress', 'envoy')) return 'lb';
  if (hasToken(l, 'monitoring', 'logging', 'prometheus', 'grafana', 'opentelemetry', 'otel', 'telemetry', 'observability', 'trace', 'tracing', 'cloudwatch', 'siem', 'soar', 'chronicle', 'alerting')) return 'observability';
  if (hasToken(l, 'artifact registry', 'container registry', 'ecr', 'registry')) return 'registry';
  if (hasToken(l, 'cloud run', 'lambda', 'fargate', 'serverless', 'cloud functions', 'functions', 'app engine')) return 'cloud_run';
  if (hasToken(l, ...EXTERNAL_ACTOR_TOKENS) && !hasToken(l, ...APP_WORKLOAD_TOKENS)) return 'external_actor';
  if (hasToken(l, ...APP_WORKLOAD_TOKENS) || classifyLabelToPricingCategory(l) === 'serverless') return 'cloud_run';
  return 'unmapped';
}

function extractCanvasNodes(xmlContent?: string): CanvasNode[] {
  if (!xmlContent || xmlContent.trim().length === 0) return [];
  let items: ReturnType<typeof parseXmlNodesAndEdges> = [];
  try {
    items = parseXmlNodesAndEdges(xmlContent);
  } catch {
    return [];
  }
  const seen = new Set<string>();
  const nodes: CanvasNode[] = [];
  for (const n of items) {
    if (n.isEdge) continue;
    const id = (n.id || '').toLowerCase();
    const style = (n.style || '').toLowerCase();
    const label = (n.label || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    if (!label || label.length < 4) continue;
    if (
      style.includes('swimlane') ||
      style.includes('container=1') ||
      style.includes('group') ||
      id.startsWith('z') ||
      /^(zone_|tier_|hdr_|header_|title|legend|leg_|footer|ftr_|bg_|poster_|grp_|group_|frame|panel|callout|watermark|lbl_|badge|pill|step_|banner)/.test(id) ||
      /^(tier|zone|layer|cumulative)\s/i.test(label) ||
      label.startsWith('💬') ||
      /reference architecture|legend/i.test(label)
    ) {
      continue;
    }
    const slug = slugify(label);
    if (seen.has(slug)) continue;
    seen.add(slug);
    nodes.push({
      id: n.id || slug,
      label: label.slice(0, 80),
      slug,
      k8sSlug: slug.replace(/_/g, '-'),
      kind: classifyNodeKind(label),
      isAws: hasToken(label, ...AWS_HINT_TOKENS),
    });
    if (nodes.length >= 24) break;
  }
  return nodes;
}

// ---------------------------------------------------------------------------------------
// GCP emitters
// ---------------------------------------------------------------------------------------

function gcpFoundation(safeName: string): string {
  return `# ---------------------------------------------------------------------------
# FOUNDATION: Zero-Trust VPC & private subnet (required by private GKE / SQL / Redis)
# ---------------------------------------------------------------------------
resource "google_compute_network" "vpc_network" {
  name                    = "\${var.environment}-${safeName}-vpc"
  auto_create_subnetworks = false
  routing_mode            = "GLOBAL"
}

resource "google_compute_subnetwork" "app_subnet_primary" {
  name                     = "\${var.environment}-${safeName}-subnet"
  ip_cidr_range            = "10.100.0.0/20"
  region                   = var.primary_region
  network                  = google_compute_network.vpc_network.id
  private_ip_google_access = true

  secondary_ip_range {
    range_name    = "pods"
    ip_cidr_range = "10.100.16.0/20"
  }

  secondary_ip_range {
    range_name    = "services"
    ip_cidr_range = "10.100.32.0/20"
  }
}
`;
}

function gcpKms(safeName: string, reason: string): string {
  return `# ${reason}
resource "google_kms_key_ring" "keyring" {
  name     = "\${var.environment}-${safeName}-keyring"
  location = var.primary_region
}

resource "google_kms_crypto_key" "data_key" {
  name            = "data-encryption-key"
  key_ring        = google_kms_key_ring.keyring.id
  rotation_period = "7776000s" # 90 days
}
`;
}

function gcpArtifactRegistry(safeName: string): string {
  return `# Container images for Cloud Run / GKE workloads (Artifact Registry — gcr.io is deprecated)
resource "google_artifact_registry_repository" "containers" {
  repository_id = "\${var.environment}-${safeName}-containers"
  format        = "DOCKER"
  location      = var.primary_region
  description   = "Workload images for ${safeName}"
}
`;
}

function gcpEmit(node: CanvasNode, safeName: string, ctx: { hasVpc: boolean; hasKms: boolean; hasRegistry: boolean }): string {
  const header = `# Canvas Node: ${node.label} (id: ${node.id})`;
  const display = hclString(node.label);
  switch (node.kind) {
    case 'waf':
      return `${header}
resource "google_compute_security_policy" "canvas_${node.slug}" {
  name        = "\${var.environment}-${safeName}-${node.k8sSlug}"
  description = "L7 edge WAF derived from canvas node ${display}"

  rule {
    action   = "deny(403)"
    priority = "1000"
    match {
      expr {
        expression = "evaluatePreconfiguredExpr('sqli-v33-stable') || evaluatePreconfiguredExpr('xss-v33-stable')"
      }
    }
    description = "Block OWASP SQLi & XSS"
  }

  rule {
    action   = "allow"
    priority = "2147483647"
    match {
      versioned_expr = "SRC_IPS_V1"
      config {
        src_ip_ranges = ["*"]
      }
    }
    description = "Default rule (required by Cloud Armor)"
  }
}
`;
    case 'lb':
      return `${header}
resource "google_compute_global_address" "canvas_${node.slug}" {
  name         = "\${var.environment}-${safeName}-${node.k8sSlug}-ip"
  address_type = "EXTERNAL"
  ip_version   = "IPV4"
}
`;
    case 'gke':
      return `${header}
resource "google_container_cluster" "canvas_${node.slug}" {
  name                = "\${var.environment}-${safeName}-${node.k8sSlug}"
  location            = var.primary_region
  enable_autopilot    = true
  deletion_protection = false
  network             = google_compute_network.vpc_network.id
  subnetwork          = google_compute_subnetwork.app_subnet_primary.id

  release_channel {
    channel = "${TERRAFORM_PINS.gkeReleaseChannel}"
  }

  ip_allocation_policy {
    cluster_secondary_range_name  = "pods"
    services_secondary_range_name = "services"
  }

  private_cluster_config {
    enable_private_nodes    = true
    enable_private_endpoint = false
    master_ipv4_cidr_block  = "172.16.0.0/28"
  }
}
`;
    case 'cloud_run':
      return `${header}
resource "google_cloud_run_v2_service" "canvas_${node.slug}" {
  name     = "\${var.environment}-${node.k8sSlug}"
  location = var.primary_region
  ingress  = "INGRESS_TRAFFIC_INTERNAL_LOAD_BALANCER"

  template {
    containers {
      image = "\${var.primary_region}-docker.pkg.dev/\${var.project_id}/\${google_artifact_registry_repository.containers.repository_id}/${node.k8sSlug}:latest"
    }
    scaling {
      min_instance_count = 1
      max_instance_count = 20
    }
  }
}
`;
    case 'spanner':
      return `${header}
resource "google_spanner_instance" "canvas_${node.slug}" {
  name             = "\${var.environment}-${safeName}-${node.k8sSlug}"
  config           = var.enable_multi_region_dr ? "nam-eur-asia1" : "regional-\${var.primary_region}"
  display_name     = "${display}"
  processing_units = var.spanner_processing_units
}

resource "google_spanner_database" "canvas_${node.slug}_db" {
  instance                 = google_spanner_instance.canvas_${node.slug}.name
  name                     = "app_state"
  version_retention_period = "3d"
  deletion_protection      = true
  ddl = [
    "CREATE TABLE EntityMaster (EntityId STRING(64) NOT NULL, Domain STRING(32), State STRING(24), CreatedAt TIMESTAMP OPTIONS (allow_commit_timestamp=true)) PRIMARY KEY (EntityId)"
  ]
}
`;
    case 'alloydb':
      return `${header}
resource "google_alloydb_cluster" "canvas_${node.slug}" {
  cluster_id = "\${var.environment}-${safeName}-${node.k8sSlug}"
  location   = var.primary_region

  network_config {
    network = google_compute_network.vpc_network.id
  }
}

resource "google_alloydb_instance" "canvas_${node.slug}_primary" {
  cluster       = google_alloydb_cluster.canvas_${node.slug}.name
  instance_id   = "primary"
  instance_type = "PRIMARY"

  machine_config {
    cpu_count = 4
  }
}
`;
    case 'cloud_sql':
      return `${header}
resource "google_sql_database_instance" "canvas_${node.slug}" {
  name                = "\${var.environment}-${safeName}-${node.k8sSlug}"
  database_version    = "${TERRAFORM_PINS.postgresVersion}"
  region              = var.primary_region
  deletion_protection = true

  settings {
    tier              = "db-custom-2-8192"
    availability_type = "REGIONAL"

    ip_configuration {
      ipv4_enabled    = false
      private_network = google_compute_network.vpc_network.id
    }

    backup_configuration {
      enabled                        = true
      point_in_time_recovery_enabled = true
    }
  }
}
`;
    case 'bigquery':
      return `${header}
resource "google_bigquery_dataset" "canvas_${node.slug}" {
  dataset_id                 = "\${var.environment}_${node.slug}"
  friendly_name              = "${display}"
  location                   = var.primary_region
  delete_contents_on_destroy = false
}
`;
    case 'redis':
      return `${header}
resource "google_redis_instance" "canvas_${node.slug}" {
  name               = "\${var.environment}-${safeName}-${node.k8sSlug}"
  tier               = "STANDARD_HA"
  memory_size_gb     = 5
  region             = var.primary_region
  authorized_network = google_compute_network.vpc_network.id
  redis_version      = "${TERRAFORM_PINS.redisVersion}"
  display_name       = "${display}"
}
`;
    case 'pubsub':
      return `${header}
resource "google_pubsub_topic" "canvas_${node.slug}" {
  name                       = "\${var.environment}-${safeName}-${node.k8sSlug}"
  message_retention_duration = "604800s"
}

resource "google_pubsub_subscription" "canvas_${node.slug}_sub" {
  name                    = "\${var.environment}-${safeName}-${node.k8sSlug}-sub"
  topic                   = google_pubsub_topic.canvas_${node.slug}.name
  ack_deadline_seconds    = 20
  enable_message_ordering = true
}
`;
    case 'storage':
      return `${header}
resource "google_storage_bucket" "canvas_${node.slug}" {
  name                        = "\${var.project_id}-${safeName}-${node.k8sSlug}"
  location                    = "US"
  uniform_bucket_level_access = true
  force_destroy               = false

  versioning {
    enabled = true
  }
}
`;
    case 'vertex_index':
      return `${header}
resource "google_vertex_ai_index" "canvas_${node.slug}" {
  region              = var.primary_region
  display_name        = "${display}"
  description         = "Vector index derived from canvas node ${node.id}"
  index_update_method = "STREAM_UPDATE"

  metadata {
    contents_delta_uri = "gs://\${google_storage_bucket.vector_index_source.name}/${node.k8sSlug}/contents"
    config {
      dimensions                  = 768
      approximate_neighbors_count = 150
      distance_measure_type       = "DOT_PRODUCT_DISTANCE"
      algorithm_config {
        tree_ah_config {
          leaf_node_embedding_count    = 500
          leaf_nodes_to_search_percent = 7
        }
      }
    }
  }
}
`;
    case 'observability':
      return `${header}
resource "google_monitoring_notification_channel" "canvas_${node.slug}" {
  display_name = "${display}"
  type         = "email"
  labels = {
    email_address = "sre-oncall@example.com"
  }
}
`;
    case 'registry':
      return ctx.hasRegistry ? `${header} → satisfied by google_artifact_registry_repository.containers\n` : gcpArtifactRegistry(safeName);
    case 'kms':
      return ctx.hasKms ? `${header} → satisfied by google_kms_crypto_key.data_key\n` : gcpKms(safeName, header);
    default:
      return '';
  }
}

// ---------------------------------------------------------------------------------------
// AWS emitters
// ---------------------------------------------------------------------------------------

function awsFoundation(safeName: string): string {
  return `# ---------------------------------------------------------------------------
# FOUNDATION: VPC, private subnets and KMS CMK
# ---------------------------------------------------------------------------
resource "aws_vpc" "main" {
  cidr_block           = "10.100.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true
  tags = { Name = "\${var.environment}-${safeName}-vpc" }
}

resource "aws_subnet" "private_a" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.100.0.0/20"
  availability_zone = "\${var.aws_region}a"
  tags = { Name = "\${var.environment}-${safeName}-private-a" }
}

resource "aws_subnet" "private_b" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.100.16.0/20"
  availability_zone = "\${var.aws_region}b"
  tags = { Name = "\${var.environment}-${safeName}-private-b" }
}

resource "aws_kms_key" "data_key" {
  description             = "CMK for ${safeName} data at rest"
  enable_key_rotation     = true
  deletion_window_in_days = 30
}
`;
}

function awsEmit(node: CanvasNode, safeName: string): string {
  const header = `# Canvas Node: ${node.label} (id: ${node.id})`;
  const display = hclString(node.label);
  switch (node.kind) {
    case 'waf':
      return `${header}
resource "aws_wafv2_web_acl" "canvas_${node.slug}" {
  name  = "\${var.environment}-${safeName}-${node.k8sSlug}"
  scope = "REGIONAL"

  default_action {
    allow {}
  }

  rule {
    name     = "AWSManagedRulesCommonRuleSet"
    priority = 1
    override_action {
      none {}
    }
    statement {
      managed_rule_group_statement {
        name        = "AWSManagedRulesCommonRuleSet"
        vendor_name = "AWS"
      }
    }
    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "common-rules"
      sampled_requests_enabled   = true
    }
  }

  visibility_config {
    cloudwatch_metrics_enabled = true
    metric_name                = "${node.k8sSlug}"
    sampled_requests_enabled   = true
  }
}
`;
    case 'lb':
      return `${header}
resource "aws_lb" "canvas_${node.slug}" {
  name               = "\${var.environment}-${node.k8sSlug}"
  load_balancer_type = "application"
  internal           = false
  subnets            = [aws_subnet.private_a.id, aws_subnet.private_b.id]
  drop_invalid_header_fields = true
}
`;
    case 'gke':
      return `${header}
resource "aws_iam_role" "canvas_${node.slug}_cluster" {
  name = "\${var.environment}-${node.k8sSlug}-cluster-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Principal = { Service = "eks.amazonaws.com" }
      Action    = "sts:AssumeRole"
    }]
  })
}

resource "aws_eks_cluster" "canvas_${node.slug}" {
  name     = "\${var.environment}-${safeName}-${node.k8sSlug}"
  role_arn = aws_iam_role.canvas_${node.slug}_cluster.arn
  version  = "1.31"

  vpc_config {
    subnet_ids              = [aws_subnet.private_a.id, aws_subnet.private_b.id]
    endpoint_private_access = true
    endpoint_public_access  = false
  }

  encryption_config {
    provider {
      key_arn = aws_kms_key.data_key.arn
    }
    resources = ["secrets"]
  }
}
`;
    case 'cloud_run':
      return `${header}
resource "aws_ecr_repository" "canvas_${node.slug}" {
  name                 = "\${var.environment}-${node.k8sSlug}"
  image_tag_mutability = "IMMUTABLE"
  image_scanning_configuration {
    scan_on_push = true
  }
}

resource "aws_iam_role" "canvas_${node.slug}_exec" {
  name = "\${var.environment}-${node.k8sSlug}-exec-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Principal = { Service = "lambda.amazonaws.com" }
      Action    = "sts:AssumeRole"
    }]
  })
}

resource "aws_lambda_function" "canvas_${node.slug}" {
  function_name = "\${var.environment}-${node.k8sSlug}"
  role          = aws_iam_role.canvas_${node.slug}_exec.arn
  package_type  = "Image"
  image_uri     = "\${aws_ecr_repository.canvas_${node.slug}.repository_url}:latest"
  memory_size   = 2048
  timeout       = 30
}
`;
    case 'spanner':
    case 'alloydb':
    case 'cloud_sql':
      return hasToken(node.label, 'dynamodb')
        ? `${header}
resource "aws_dynamodb_table" "canvas_${node.slug}" {
  name         = "\${var.environment}-${node.k8sSlug}"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "pk"

  attribute {
    name = "pk"
    type = "S"
  }

  server_side_encryption {
    enabled     = true
    kms_key_arn = aws_kms_key.data_key.arn
  }

  point_in_time_recovery {
    enabled = true
  }
}
`
        : `${header}
resource "aws_rds_cluster" "canvas_${node.slug}" {
  cluster_identifier          = "\${var.environment}-${node.k8sSlug}"
  engine                      = "aurora-postgresql"
  engine_version              = "16.4"
  database_name               = "app_state"
  master_username             = "app_admin"
  manage_master_user_password = true
  storage_encrypted           = true
  kms_key_id                  = aws_kms_key.data_key.arn
  deletion_protection         = true
  skip_final_snapshot         = false
  final_snapshot_identifier   = "\${var.environment}-${node.k8sSlug}-final"
}
`;
    case 'bigquery':
      return `${header}
resource "aws_redshiftserverless_namespace" "canvas_${node.slug}" {
  namespace_name = "\${var.environment}-${node.k8sSlug}"
  kms_key_id     = aws_kms_key.data_key.arn
}

resource "aws_redshiftserverless_workgroup" "canvas_${node.slug}" {
  namespace_name = aws_redshiftserverless_namespace.canvas_${node.slug}.namespace_name
  workgroup_name = "\${var.environment}-${node.k8sSlug}-wg"
  base_capacity  = 32
}
`;
    case 'redis':
      return `${header}
resource "aws_elasticache_replication_group" "canvas_${node.slug}" {
  replication_group_id       = "\${var.environment}-${node.k8sSlug}"
  description                = "${display}"
  engine                     = "redis"
  engine_version             = "7.1"
  node_type                  = "cache.m6g.large"
  num_cache_clusters         = 2
  automatic_failover_enabled = true
  at_rest_encryption_enabled = true
  transit_encryption_enabled = true
  kms_key_id                 = aws_kms_key.data_key.arn
}
`;
    case 'pubsub':
      return hasToken(node.label, 'kinesis', 'stream', 'streaming')
        ? `${header}
resource "aws_kinesis_stream" "canvas_${node.slug}" {
  name             = "\${var.environment}-${node.k8sSlug}"
  retention_period = 168
  encryption_type  = "KMS"
  kms_key_id       = aws_kms_key.data_key.arn

  stream_mode_details {
    stream_mode = "ON_DEMAND"
  }
}
`
        : `${header}
resource "aws_sqs_queue" "canvas_${node.slug}" {
  name                      = "\${var.environment}-${node.k8sSlug}"
  kms_master_key_id         = aws_kms_key.data_key.arn
  message_retention_seconds = 604800
}
`;
    case 'storage':
      return `${header}
resource "aws_s3_bucket" "canvas_${node.slug}" {
  bucket = "\${var.environment}-${safeName}-${node.k8sSlug}"
}

resource "aws_s3_bucket_public_access_block" "canvas_${node.slug}" {
  bucket                  = aws_s3_bucket.canvas_${node.slug}.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_server_side_encryption_configuration" "canvas_${node.slug}" {
  bucket = aws_s3_bucket.canvas_${node.slug}.id
  rule {
    apply_server_side_encryption_by_default {
      kms_master_key_id = aws_kms_key.data_key.arn
      sse_algorithm     = "aws:kms"
    }
  }
}
`;
    case 'vertex_index':
      return `${header}
resource "aws_opensearchserverless_collection" "canvas_${node.slug}" {
  name = "\${var.environment}-${node.k8sSlug}"
  type = "VECTORSEARCH"
}

resource "aws_iam_policy" "canvas_${node.slug}_bedrock" {
  name = "\${var.environment}-${node.k8sSlug}-bedrock-invoke"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect   = "Allow"
      Action   = ["bedrock:InvokeModel", "bedrock:InvokeModelWithResponseStream"]
      Resource = "*"
    }]
  })
}
`;
    case 'observability':
      return `${header}
resource "aws_cloudwatch_log_group" "canvas_${node.slug}" {
  name              = "/${safeName}/${node.k8sSlug}"
  retention_in_days = 90
  kms_key_id        = aws_kms_key.data_key.arn
}
`;
    case 'kms':
      return `${header} → satisfied by aws_kms_key.data_key\n`;
    case 'registry':
      return `${header}
resource "aws_ecr_repository" "canvas_${node.slug}" {
  name                 = "\${var.environment}-${node.k8sSlug}"
  image_tag_mutability = "IMMUTABLE"
}
`;
    default:
      return '';
  }
}

// ---------------------------------------------------------------------------------------
// Baseline reference topology (only when NO canvas XML is attached)
// ---------------------------------------------------------------------------------------

function baselineNodes(provider: 'gcp' | 'aws'): CanvasNode[] {
  const mk = (label: string, kind: ResourceKind): CanvasNode => ({
    id: `baseline_${slugify(label)}`,
    label,
    slug: slugify(label),
    k8sSlug: slugify(label).replace(/_/g, '-'),
    kind,
    isAws: provider === 'aws',
  });
  return provider === 'aws'
    ? [mk('AWS WAF Edge', 'waf'), mk('Application Load Balancer', 'lb'), mk('EKS Orchestration Cluster', 'gke'), mk('Aurora PostgreSQL Ledger', 'cloud_sql'), mk('ElastiCache Session Cache', 'redis'), mk('Kinesis Event Stream', 'pubsub'), mk('S3 Data Lake', 'storage')]
    : [mk('Cloud Armor WAF', 'waf'), mk('Global HTTPS Load Balancer', 'lb'), mk('GKE Orchestration Mesh', 'gke'), mk('Cloud Spanner Ledger', 'spanner'), mk('Memorystore Redis Cache', 'redis'), mk('Pub/Sub Event Stream', 'pubsub'), mk('Cloud Storage Archive', 'storage')];
}

// ---------------------------------------------------------------------------------------
// Bundle generator
// ---------------------------------------------------------------------------------------

export function generateTerraformBundle(
  projectTitle: string,
  projectScope: string,
  domain: string = 'enterprise',
  cloudProvider: 'gcp' | 'aws' = 'gcp',
  xmlContent?: string
): TerraformFileBundle {
  const safeName = (projectTitle || 'enterprise-platform').toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '').slice(0, 24) || 'platform';
  const domainPrefix = (domain || 'enterprise').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'enterprise';

  const canvasNodes = extractCanvasNodes(xmlContent);
  const groundingSource: TerraformGroundingSource = canvasNodes.length > 0 ? 'canvas-xml' : 'baseline-template';

  // Provider resolution: explicit AWS request, or canvas that is predominantly AWS-native
  const awsNodeCount = canvasNodes.filter((n) => n.isAws).length;
  const resolvedProvider: 'gcp' | 'aws' = cloudProvider === 'aws' || (canvasNodes.length > 0 && awsNodeCount >= Math.ceil(canvasNodes.length / 2)) ? 'aws' : 'gcp';

  const nodes = groundingSource === 'canvas-xml' ? canvasNodes : baselineNodes(resolvedProvider);
  const provisionable = nodes.filter((n) => n.kind !== 'external_actor' && n.kind !== 'unmapped');
  const externalActors = nodes.filter((n) => n.kind === 'external_actor');
  const unmapped = nodes.filter((n) => n.kind === 'unmapped');

  const hasKind = (k: ResourceKind) => provisionable.some((n) => n.kind === k);
  const needsRegistry = hasKind('cloud_run') || hasKind('gke') || hasKind('registry');
  const needsKmsForData = hasKind('spanner') || hasKind('alloydb') || hasKind('cloud_sql') || hasKind('storage') || hasKind('bigquery');
  const needsVectorBucket = hasKind('vertex_index');

  const groundingBanner =
    groundingSource === 'canvas-xml'
      ? `# GROUNDING: ${provisionable.length} of ${nodes.length} canvas nodes mapped to resources` +
        (externalActors.length > 0 ? `\n# External actors (not provisioned): ${externalActors.map((n) => n.label).join(', ')}` : '') +
        (unmapped.length > 0 ? `\n# Unmapped canvas nodes (review manually): ${unmapped.map((n) => n.label).join(', ')}` : '')
      : `# GROUNDING: baseline reference topology — NO canvas XML attached. Attach a diagram to derive resources from it.`;

  const headerBlock = `# ==============================================================================
# PROMPTCANVAS INFRASTRUCTURE AS CODE (TERRAFORM)
# System: ${projectTitle}
# Domain: ${domainPrefix.toUpperCase()} | Cloud Provider: ${resolvedProvider === 'aws' ? 'Amazon Web Services (AWS)' : 'Google Cloud Platform (GCP)'}
${groundingBanner}
# Scope: ${(projectScope || '').replace(/\s+/g, ' ').slice(0, 140) || 'n/a'}
# ==============================================================================
`;

  let mainTf = '';
  if (resolvedProvider === 'gcp') {
    const providers = [
      `    google = {\n      source  = "hashicorp/google"\n      version = "${TERRAFORM_PINS.google}"\n    }`,
      `    google-beta = {\n      source  = "hashicorp/google-beta"\n      version = "${TERRAFORM_PINS.googleBeta}"\n    }`,
    ];
    if (hasKind('gke')) {
      providers.push(`    kubernetes = {\n      source  = "hashicorp/kubernetes"\n      version = "${TERRAFORM_PINS.kubernetes}"\n    }`);
    }
    mainTf += `${headerBlock}
terraform {
  required_version = "${TERRAFORM_PINS.requiredVersion}"
  required_providers {
${providers.join('\n')}
  }
}

${gcpFoundation(safeName)}`;
    if (needsRegistry) mainTf += `\n${gcpArtifactRegistry(safeName)}`;
    if (needsVectorBucket) {
      mainTf += `
# Source bucket for Vertex AI Vector Search index contents (required by metadata.contents_delta_uri)
resource "google_storage_bucket" "vector_index_source" {
  name                        = "\${var.project_id}-${safeName}-vector-source"
  location                    = "US"
  uniform_bucket_level_access = true
  force_destroy               = false
}
`;
    }
    const ctx = { hasVpc: true, hasKms: false, hasRegistry: needsRegistry };
    const explicitKms = provisionable.find((n) => n.kind === 'kms');
    if (explicitKms) {
      mainTf += `\n${gcpKms(safeName, `# Canvas Node: ${explicitKms.label} (id: ${explicitKms.id})`)}`;
      ctx.hasKms = true;
    } else if (needsKmsForData) {
      mainTf += `\n${gcpKms(safeName, '# CMEK key for stateful canvas resources (data stores detected on canvas)')}`;
      ctx.hasKms = true;
    }
    mainTf += `\n# ---------------------------------------------------------------------------\n# CANVAS-DERIVED RESOURCES\n# ---------------------------------------------------------------------------\n`;
    for (const node of provisionable) {
      if (node.kind === 'kms') continue; // already emitted above
      const block = gcpEmit(node, safeName, ctx);
      if (block) mainTf += `\n${block}`;
    }
  } else {
    mainTf += `${headerBlock}
terraform {
  required_version = "${TERRAFORM_PINS.requiredVersion}"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "${TERRAFORM_PINS.aws}"
    }
  }
}

${awsFoundation(safeName)}
# ---------------------------------------------------------------------------
# CANVAS-DERIVED RESOURCES
# ---------------------------------------------------------------------------
`;
    for (const node of provisionable) {
      const block = awsEmit(node, safeName);
      if (block) mainTf += `\n${block}`;
    }
  }

  const resourceRefs = Array.from(mainTf.matchAll(/resource\s+"([^"]+)"\s+"([^"]+)"/g)).map((m) => ({ type: m[1], name: m[2] }));
  const resourcesCount = resourceRefs.length;

  // variables.tf — only declare what main.tf references
  const variableBlocks: string[] = [
    `variable "project_id" {\n  type        = string\n  description = "${resolvedProvider === 'aws' ? 'Logical project / account alias used in resource names' : 'GCP project ID where infrastructure will be deployed'}"\n}`,
    `variable "environment" {\n  type        = string\n  description = "Deployment environment tier (prod, staging, dev)"\n  default     = "prod"\n}`,
  ];
  if (resolvedProvider === 'gcp') {
    variableBlocks.push(`variable "primary_region" {\n  type        = string\n  description = "Primary compute and database region"\n  default     = "us-central1"\n}`);
    if (hasKind('spanner')) {
      variableBlocks.push(`variable "spanner_processing_units" {\n  type        = number\n  description = "Cloud Spanner compute capacity in processing units (100 PU = 0.1 node)"\n  default     = 300\n}`);
      variableBlocks.push(`variable "enable_multi_region_dr" {\n  type        = bool\n  description = "Use the nam-eur-asia1 multi-region Spanner configuration instead of a single-region config"\n  default     = false\n}`);
    }
  } else {
    variableBlocks.push(`variable "aws_region" {\n  type        = string\n  description = "Primary AWS region"\n  default     = "us-east-1"\n}`);
  }
  const variablesTf = `# ==============================================================================\n# TERRAFORM VARIABLES (declared only for values referenced in main.tf)\n# ==============================================================================\n\n${variableBlocks.join('\n\n')}\n`;

  // outputs.tf — derived from emitted resources
  const outputBlocks: string[] = [];
  for (const r of resourceRefs) {
    const ref = `${r.type}.${r.name}`;
    if (r.type === 'google_compute_network' || r.type === 'aws_vpc') outputBlocks.push(`output "vpc_network_id" {\n  description = "VPC network ID"\n  value       = ${ref}.id\n}`);
    if (r.type === 'google_container_cluster' || r.type === 'aws_eks_cluster') outputBlocks.push(`output "${r.name}_endpoint" {\n  description = "Kubernetes API endpoint (${r.name})"\n  value       = ${ref}.endpoint\n  sensitive   = true\n}`);
    if (r.type === 'google_spanner_database') outputBlocks.push(`output "${r.name}_id" {\n  description = "Spanner database ID"\n  value       = ${ref}.id\n}`);
    if (r.type === 'google_sql_database_instance') outputBlocks.push(`output "${r.name}_connection_name" {\n  description = "Cloud SQL connection name"\n  value       = ${ref}.connection_name\n}`);
    if (r.type === 'google_redis_instance') outputBlocks.push(`output "${r.name}_host" {\n  description = "Redis internal host"\n  value       = ${ref}.host\n}`);
    if (r.type === 'google_pubsub_topic' || r.type === 'aws_sqs_queue' || r.type === 'aws_kinesis_stream') outputBlocks.push(`output "${r.name}_name" {\n  description = "Messaging resource name"\n  value       = ${ref}.name\n}`);
    if (r.type === 'google_kms_crypto_key' || r.type === 'aws_kms_key') outputBlocks.push(`output "cmek_key_id" {\n  description = "Customer-managed encryption key"\n  value       = ${ref}.id\n}`);
    if (r.type === 'google_cloud_run_v2_service') outputBlocks.push(`output "${r.name}_uri" {\n  description = "Cloud Run service URI"\n  value       = ${ref}.uri\n}`);
    if (r.type === 'google_storage_bucket' || r.type === 'aws_s3_bucket') outputBlocks.push(`output "${r.name}_bucket" {\n  description = "Bucket name"\n  value       = ${ref}.${r.type === 'aws_s3_bucket' ? 'bucket' : 'name'}\n}`);
    if (r.type === 'google_vertex_ai_index') outputBlocks.push(`output "${r.name}_id" {\n  description = "Vertex AI Vector Search index ID"\n  value       = ${ref}.id\n}`);
  }
  const outputsTf = `# ==============================================================================\n# TERRAFORM OUTPUTS (derived from ${resourcesCount} emitted resources)\n# ==============================================================================\n\n${outputBlocks.length > 0 ? outputBlocks.join('\n\n') : '# No outputs — no provisionable resources were derived from the canvas.'}\n`;

  const terraformTfvars =
    resolvedProvider === 'gcp'
      ? `project_id     = "${domainPrefix}-${safeName}-prod"\nenvironment    = "prod"\nprimary_region = "us-central1"\n${hasKind('spanner') ? 'spanner_processing_units = 300\nenable_multi_region_dr   = false\n' : ''}`
      : `project_id  = "${domainPrefix}-${safeName}-prod"\nenvironment = "prod"\naws_region  = "us-east-1"\n`;

  const providerTf =
    resolvedProvider === 'gcp'
      ? `provider "google" {\n  project = var.project_id\n  region  = var.primary_region\n}\n\nprovider "google-beta" {\n  project = var.project_id\n  region  = var.primary_region\n}\n`
      : `provider "aws" {\n  region = var.aws_region\n\n  default_tags {\n    tags = {\n      environment = var.environment\n      managed_by  = "promptcanvas-iac"\n    }\n  }\n}\n`;

  const gkeDetected = hasKind('gke');
  const k8sImage =
    resolvedProvider === 'gcp'
      ? `us-central1-docker.pkg.dev/PROJECT_ID/prod-${safeName}-containers/${safeName}:v1.0.0`
      : `ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/prod-${safeName}:v1.0.0`;
  const k8sManifestYaml = `# ==============================================================================
# KUBERNETES WORKLOAD SPECIFICATION
# System: ${projectTitle}
# ${gkeDetected ? `Target: ${provisionable.filter((n) => n.kind === 'gke').map((n) => n.label).join(', ')}` : 'NOTE: no Kubernetes cluster detected on the canvas — this manifest is a reference scaffold.'}
# ==============================================================================
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ${safeName}-core-engine
  namespace: default
  labels:
    app: ${safeName}
    tier: microservice
spec:
  replicas: 3
  selector:
    matchLabels:
      app: ${safeName}
  template:
    metadata:
      labels:
        app: ${safeName}
    spec:
      securityContext:
        runAsNonRoot: true
      containers:
      - name: engine
        image: ${k8sImage}
        ports:
        - containerPort: 8080
          name: http-api
        resources:
          requests:
            memory: "1Gi"
            cpu: "500m"
          limits:
            memory: "2Gi"
            cpu: "1500m"
        readinessProbe:
          httpGet:
            path: /healthz
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 10
        livenessProbe:
          httpGet:
            path: /livez
            port: 8080
          initialDelaySeconds: 15
          periodSeconds: 20
        env:
        - name: ENVIRONMENT
          value: "production"
        - name: DOMAIN
          value: "${domainPrefix}"
---
apiVersion: v1
kind: Service
metadata:
  name: ${safeName}-service
spec:
  selector:
    app: ${safeName}
  ports:
  - name: http
    port: 80
    targetPort: 8080
  type: ClusterIP
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: ${safeName}-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: ${safeName}-core-engine
  minReplicas: 3
  maxReplicas: 20
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
`;

  return {
    mainTf,
    variablesTf,
    outputsTf,
    terraformTfvars,
    providerTf,
    k8sManifestYaml,
    resourcesCount,
    groundingSource,
    canvasNodeCount: canvasNodes.length,
    mappedNodeCount: groundingSource === 'canvas-xml' ? provisionable.length : 0,
    unmappedNodeLabels: unmapped.map((n) => n.label),
    cloudProvider: resolvedProvider,
  };
}

// ---------------------------------------------------------------------------------------
// Offline static analysis ("plan preview") — explicitly NOT a real terraform plan
// ---------------------------------------------------------------------------------------

export function simulateTerraformPlan(bundle: TerraformFileBundle): TerraformPlanSimulation {
  const mainTf = bundle?.mainTf || '';
  const analysis = analyzeHcl(mainTf);
  const count = analysis.resources.length;

  const resourceBlocksText = analysis.resources
    .map((r) => {
      const attrLines = r.body
        .split('\n')
        .map((l) => l.trim())
        .filter((l) => l && !l.startsWith('#') && l.includes('=') && !l.includes('{'))
        .slice(0, 3)
        .map((l) => `      + ${l}`);
      return [`  # ${r.type}.${r.name} will be created`, `  + resource "${r.type}" "${r.name}" {`, ...(attrLines.length > 0 ? attrLines : ['      + id = (known after apply)']), `    }`].join('\n');
    })
    .join('\n\n');

  let estimatedNumeric = 0;
  const costLines: string[] = [];
  for (const r of analysis.resources) {
    const cat = classifyTerraformTypeToPricingCategory(r.type);
    const unit = unitCostForCategory(cat, 'US');
    estimatedNumeric += unit;
    if (unit > 0) costLines.push(`  ${r.type}.${r.name}: ${formatUsd(unit)} (${PRICING_CATALOG[cat].label})`);
  }
  const formattedMonthly = `${formatUsd(estimatedNumeric)} / mo`;

  const errors = analysis.findings.filter((f) => f.severity === 'error').map((f) => `${f.rule}${f.resource ? ` [${f.resource}]` : ''}: ${f.message}`);
  const warnings = analysis.findings.filter((f) => f.severity === 'warning').map((f) => `${f.rule}${f.resource ? ` [${f.resource}]` : ''}: ${f.message}`);
  const infos = analysis.findings.filter((f) => f.severity === 'info').map((f) => `${f.rule}${f.resource ? ` [${f.resource}]` : ''}: ${f.message}`);

  const groundingLine =
    bundle.groundingSource === 'canvas-xml'
      ? `Grounding: ${bundle.mappedNodeCount} of ${bundle.canvasNodeCount} canvas nodes mapped → ${count} resources${bundle.unmappedNodeLabels.length > 0 ? ` (unmapped: ${bundle.unmappedNodeLabels.join(', ')})` : ''}`
      : `Grounding: baseline reference topology (no canvas XML attached) → ${count} resources`;

  const planOutput = `OFFLINE STATIC ANALYSIS — this is NOT the output of \`terraform plan\`.
No provider was initialised, no cloud API was called and no state was read.
Authoritative results require: terraform init && terraform validate && terraform plan

${groundingLine}

Resource actions (if applied to an empty state):
  + create

${resourceBlocksText || '  (no resources)'}

Plan preview: ${count} to add, 0 to change, 0 to destroy.

------------------------------------------------------------------------
Static validation: ${analysis.checksRun} checks run, ${analysis.checksPassed} passed, ${errors.length} error(s), ${warnings.length} warning(s)
${analysis.braceBalanced ? '✔ HCL block structure balanced' : '✖ HCL block structure UNBALANCED'}
${errors.length > 0 ? errors.map((e) => `✖ ERROR   ${e}`).join('\n') : '✔ Required attributes present for all known resource types'}
${warnings.length > 0 ? warnings.map((w) => `⚠ WARNING ${w}`).join('\n') : '✔ No security lint warnings'}
${infos.length > 0 ? infos.map((i) => `ℹ INFO    ${i}`).join('\n') : ''}
------------------------------------------------------------------------
Heuristic monthly cost (${COST_MODEL_ASSUMPTIONS.pricingBasis}): ${formattedMonthly}
${costLines.join('\n')}
------------------------------------------------------------------------`;

  return {
    planOutput,
    resourcesToAdd: count,
    resourcesToChange: 0,
    resourcesToDestroy: 0,
    estimatedMonthlyCost: formattedMonthly,
    estimatedMonthlyCostUsd: estimatedNumeric,
    securityChecksRun: analysis.checksRun,
    securityChecksPassed: analysis.checksPassed,
    securityWarnings: warnings,
    errors,
    infoNotes: infos,
    analysisMode: 'offline-static-analysis',
  };
}
