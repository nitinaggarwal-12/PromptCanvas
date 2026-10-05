/**
 * Offline HCL static analysis for generated Terraform bundles.
 *
 * This is deliberately NOT presented as `terraform plan`: it runs no provider, touches no
 * cloud API and cannot know real state. It performs deterministic, explainable checks
 * (brace balance, required-attribute presence per resource type, and security lint rules)
 * and returns rule-by-rule findings so the UI can show real pass/fail counts.
 */

export type HclFindingSeverity = 'error' | 'warning' | 'info';

export interface HclFinding {
  severity: HclFindingSeverity;
  rule: string;
  resource?: string;
  message: string;
}

export interface HclResourceBlock {
  type: string;
  name: string;
  body: string;
}

export interface HclStaticAnalysis {
  resources: HclResourceBlock[];
  findings: HclFinding[];
  checksRun: number;
  checksPassed: number;
  braceBalanced: boolean;
}

/** Required attributes / blocks per resource type (subset of the official provider schemas). */
const REQUIRED_ATTRIBUTES: Record<string, string[]> = {
  google_compute_network: ['name'],
  google_compute_subnetwork: ['name', 'ip_cidr_range', 'network'],
  google_compute_security_policy: ['name'],
  google_container_cluster: ['name', 'location'],
  google_container_node_pool: ['cluster'],
  google_spanner_instance: ['config', 'display_name'],
  google_spanner_database: ['instance', 'name'],
  google_redis_instance: ['name', 'memory_size_gb'],
  google_pubsub_topic: ['name'],
  google_pubsub_subscription: ['name', 'topic'],
  google_kms_key_ring: ['name', 'location'],
  google_kms_crypto_key: ['name', 'key_ring'],
  google_vertex_ai_index: ['display_name', 'metadata'],
  google_bigquery_dataset: ['dataset_id'],
  google_storage_bucket: ['name', 'location'],
  google_cloud_run_v2_service: ['name', 'location', 'template'],
  google_artifact_registry_repository: ['repository_id', 'format', 'location'],
  google_sql_database_instance: ['database_version', 'settings'],
  google_alloydb_cluster: ['cluster_id', 'location', 'network_config'],
  google_compute_global_address: ['name'],
  google_dataflow_job: ['name', 'template_gcs_path', 'temp_gcs_location'],
  aws_vpc: ['cidr_block'],
  aws_subnet: ['vpc_id', 'cidr_block'],
  aws_eks_cluster: ['name', 'role_arn', 'vpc_config'],
  aws_rds_cluster: ['engine'],
  aws_dynamodb_table: ['name', 'hash_key', 'attribute'],
  aws_elasticache_replication_group: ['replication_group_id', 'description'],
  aws_s3_bucket: [],
  aws_kms_key: [],
  aws_sqs_queue: [],
  aws_kinesis_stream: ['name'],
  aws_lambda_function: ['function_name', 'role'],
  aws_wafv2_web_acl: ['name', 'scope', 'default_action', 'visibility_config'],
  aws_lb: [],
  aws_sagemaker_endpoint: ['endpoint_config_name'],
  aws_opensearchserverless_collection: ['name'],
};

const RESOURCE_REGEX = /resource\s+"([^"]+)"\s+"([^"]+)"\s*\{/g;

/** Extracts top-level resource blocks using brace matching (string-literal aware). */
export function extractResourceBlocks(hcl: string): HclResourceBlock[] {
  const blocks: HclResourceBlock[] = [];
  const src = hcl || '';
  let match: RegExpExecArray | null;
  RESOURCE_REGEX.lastIndex = 0;
  while ((match = RESOURCE_REGEX.exec(src)) !== null) {
    const start = match.index + match[0].length;
    let depth = 1;
    let i = start;
    let inString = false;
    while (i < src.length && depth > 0) {
      const ch = src[i];
      if (ch === '"' && src[i - 1] !== '\\') inString = !inString;
      if (!inString) {
        if (ch === '#') {
          while (i < src.length && src[i] !== '\n') i++;
          continue;
        }
        if (ch === '{') depth++;
        if (ch === '}') depth--;
      }
      i++;
    }
    blocks.push({ type: match[1], name: match[2], body: src.slice(start, Math.max(start, i - 1)) });
  }
  return blocks;
}

function hasAttr(body: string, attr: string): boolean {
  return new RegExp(`(^|\\n)\\s*${attr}\\s*(=|\\{)`, 'm').test(body);
}

function attrValue(body: string, attr: string): string | null {
  const m = body.match(new RegExp(`(^|\\n)\\s*${attr}\\s*=\\s*([^\\n]+)`, 'm'));
  return m ? m[2].trim() : null;
}

function isBraceBalanced(hcl: string): boolean {
  let depth = 0;
  let inString = false;
  for (let i = 0; i < hcl.length; i++) {
    const ch = hcl[i];
    if (ch === '"' && hcl[i - 1] !== '\\') inString = !inString;
    if (inString) continue;
    if (ch === '#') {
      while (i < hcl.length && hcl[i] !== '\n') i++;
      continue;
    }
    if (ch === '{') depth++;
    if (ch === '}') depth--;
    if (depth < 0) return false;
  }
  return depth === 0;
}

export function analyzeHcl(mainTf: string): HclStaticAnalysis {
  const resources = extractResourceBlocks(mainTf);
  const findings: HclFinding[] = [];
  let checksRun = 0;

  // 1. Syntax: brace balance
  checksRun++;
  const braceBalanced = isBraceBalanced(mainTf || '');
  if (!braceBalanced) {
    findings.push({ severity: 'error', rule: 'SYNTAX_BRACE_BALANCE', message: 'Unbalanced `{`/`}` blocks — terraform validate would fail.' });
  }

  // 2. Required attributes per resource
  for (const r of resources) {
    const required = REQUIRED_ATTRIBUTES[r.type];
    const ref = `${r.type}.${r.name}`;
    if (!required) {
      checksRun++;
      findings.push({ severity: 'info', rule: 'SCHEMA_UNKNOWN_TYPE', resource: ref, message: `No local schema for ${r.type}; required-attribute check skipped.` });
      continue;
    }
    for (const attr of required) {
      checksRun++;
      if (!hasAttr(r.body, attr)) {
        findings.push({ severity: 'error', rule: 'SCHEMA_REQUIRED_ATTRIBUTE', resource: ref, message: `Missing required \`${attr}\` on ${r.type}.` });
      }
    }
  }

  // 3. Security lint rules
  const hasKms = resources.some((r) => /kms_crypto_key|aws_kms_key/.test(r.type));
  checksRun++;
  if (!hasKms) {
    findings.push({ severity: 'info', rule: 'SEC_CMEK_PRESENT', message: 'No customer-managed encryption key declared; services fall back to Google-managed keys.' });
  }

  for (const r of resources) {
    const ref = `${r.type}.${r.name}`;
    const b = r.body;
    switch (r.type) {
      case 'google_storage_bucket': {
        checksRun++;
        if (!/uniform_bucket_level_access\s*=\s*true/.test(b)) {
          findings.push({ severity: 'warning', rule: 'SEC_GCS_UNIFORM_ACCESS', resource: ref, message: 'Bucket lacks `uniform_bucket_level_access = true` (CIS GCP 5.2).' });
        }
        checksRun++;
        if (/force_destroy\s*=\s*true/.test(b)) {
          findings.push({ severity: 'warning', rule: 'SEC_GCS_FORCE_DESTROY', resource: ref, message: '`force_destroy = true` allows deleting non-empty buckets on destroy.' });
        }
        break;
      }
      case 'google_container_cluster': {
        checksRun++;
        if (!/private_cluster_config\s*\{/.test(b)) {
          findings.push({ severity: 'warning', rule: 'SEC_GKE_PRIVATE_NODES', resource: ref, message: 'Cluster is not private (`private_cluster_config` missing) (CIS GKE 6.6.4).' });
        }
        checksRun++;
        if (!/workload_identity_config\s*\{/.test(b) && !/enable_autopilot\s*=\s*true/.test(b)) {
          findings.push({ severity: 'info', rule: 'SEC_GKE_WORKLOAD_IDENTITY', resource: ref, message: 'Workload Identity not configured; node service-account scopes will be used.' });
        }
        break;
      }
      case 'google_cloud_run_v2_service': {
        checksRun++;
        const ingress = attrValue(b, 'ingress');
        if (!ingress || /INGRESS_TRAFFIC_ALL/.test(ingress)) {
          findings.push({ severity: 'warning', rule: 'SEC_RUN_PUBLIC_INGRESS', resource: ref, message: 'Cloud Run service accepts public ingress; restrict to internal/LB unless intentionally public.' });
        }
        break;
      }
      case 'google_sql_database_instance': {
        checksRun++;
        if (!/deletion_protection\s*=\s*true/.test(b)) {
          findings.push({ severity: 'warning', rule: 'SEC_SQL_DELETION_PROTECTION', resource: ref, message: '`deletion_protection = true` not set on Cloud SQL instance.' });
        }
        checksRun++;
        if (/ipv4_enabled\s*=\s*true/.test(b)) {
          findings.push({ severity: 'warning', rule: 'SEC_SQL_PUBLIC_IP', resource: ref, message: 'Cloud SQL instance exposes a public IPv4 address (CIS GCP 6.6).' });
        }
        break;
      }
      case 'google_redis_instance': {
        checksRun++;
        if (/tier\s*=\s*"BASIC"/.test(b)) {
          findings.push({ severity: 'warning', rule: 'REL_REDIS_NO_HA', resource: ref, message: 'Redis BASIC tier has no replica — single point of failure.' });
        }
        break;
      }
      case 'google_kms_crypto_key': {
        checksRun++;
        if (!hasAttr(b, 'rotation_period')) {
          findings.push({ severity: 'warning', rule: 'SEC_KMS_ROTATION', resource: ref, message: 'No `rotation_period` set on CMEK key (CIS GCP 1.10).' });
        }
        break;
      }
      case 'google_compute_firewall':
      case 'aws_security_group': {
        checksRun++;
        if (/0\.0\.0\.0\/0/.test(b) && /allow|ingress/.test(b)) {
          findings.push({ severity: 'warning', rule: 'SEC_OPEN_INGRESS', resource: ref, message: 'Ingress rule allows 0.0.0.0/0.' });
        }
        break;
      }
      case 'aws_s3_bucket': {
        checksRun++;
        if (/acl\s*=\s*"public-read/.test(b)) {
          findings.push({ severity: 'warning', rule: 'SEC_S3_PUBLIC_ACL', resource: ref, message: 'S3 bucket ACL is public.' });
        }
        break;
      }
      case 'aws_rds_cluster': {
        checksRun++;
        if (!/storage_encrypted\s*=\s*true/.test(b)) {
          findings.push({ severity: 'warning', rule: 'SEC_RDS_ENCRYPTION', resource: ref, message: 'RDS/Aurora cluster storage is not encrypted at rest.' });
        }
        break;
      }
      default:
        break;
    }
  }

  const failing = findings.filter((f) => f.severity !== 'info').length;
  return {
    resources,
    findings,
    checksRun,
    checksPassed: Math.max(0, checksRun - failing),
    braceBalanced,
  };
}
