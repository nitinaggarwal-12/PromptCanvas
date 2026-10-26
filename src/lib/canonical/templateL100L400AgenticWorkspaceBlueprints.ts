import {
  compileOfficialArchCenterDrawioXml,
  OfficialArchCenterBlueprintConfig,
} from './templateOfficialGcpArchCenterHubSpoke';
import { buildOfficialOracleEbsExadataArchCenter78Xml } from './oracleAtGoogleExadataEbsTopology';
import { TEMPLATE_81_PRINCIPAL_SEQUENCE_XML } from './template81PrincipalSequenceXml';

/**
 * Blueprint #79: L400 Deployment & Network Spec — Multi-Tenant Agentic Hub-and-Spoke (GCP us-central1 • VPC-SC)
 */
export const L400_MULTI_TENANT_HUB_SPOKE_NETWORK_CONFIG: OfficialArchCenterBlueprintConfig = {
  id: 'l400-multi-tenant-hub-spoke-network-spec',
  badge: 'L400 DEPLOYMENT & NETWORK SPEC • GCP US-CENTRAL1 • VPC-SC',
  title: 'L400 Deployment & Network Spec — Multi-Tenant Agentic Hub-and-Spoke (GCP us-central1 • VPC-SC)',
  subtitle: 'Shared Control Plane (ramp-portal-dev • Project #248990048888 • Region: us-central1 • Zones: a/b/c)',
  topUserTitle: 'Enterprise Users & Client Apps',
  topUserSub: 'OAuth 2.0 PKCE + X-Tenant-ID JWT • TLS 1.3 ALPN h2/h3',
  step1LeftLabel: 'TLS 1.3 :443',
  step7RightLabel: 'SSE Stream :443',
  outerWrapperLabel:
    'VPC-SC Perimeter: p-shared-control-hub • KMS ECDSA P-256 Key: projects/ramp-portal-dev/locations/us-central1/keyRings/mt-auth',
  innerWrapperLabel: 'Hub VPC: 10.100.0.0/16 • BGP ASN 64512',
  routingHubTitle: 'Routing & PEP/PDP Hub (Hub VPC: 10.100.0.0/16 • BGP ASN 64512)',
  routingHubSub: 'Central ingress, OAuth 2.0 PKCE + X-Tenant-ID JWT & ECDSA P-256 envelope signing',
  routingCards: {
    topLeft: {
      icon: 'cloud_armor',
      title: 'Google Cloud Armor',
      sub: 'OWASP ModSec + 5k RPS/Tenant',
      l400Badge: 'WAF Policy: mt-prod-waf-v4',
      l400Spec: '130.211.0.0/22, 35.191.0.0/16',
    },
    midLeft: {
      icon: 'apigee_gateway',
      title: 'Apigee X / AgentGateway',
      sub: 'Hop 1 PEP • JWT Verify • Quota',
      l400Badge: 'PSC Endpoint: 10.100.1.0/28',
      l400Spec: 'gRPC :8443 • mTLS 1.3',
    },
    botLeft: {
      icon: 'iap_iam_shield',
      title: 'Cloud Identity / Workforce Pool',
      sub: 'SAML 2.0 / OIDC • STS Token Exchange',
      l400Badge: 'workforcePools/corp-idp-prod',
      l400Spec: 'RFC 8693 OBO + DPoP',
    },
    topRight: {
      icon: 'load_balancer_cloud_armor',
      title: 'Global External ALB',
      sub: 'TLS 1.3 • Cloud CDN • mTLS Backend',
      l400Badge: 'VIP: 34.120.55.10 (:443 HTTP/3)',
      l400Spec: 'ALPN h2/h3 • Anycast VIP',
    },
    botRight: {
      icon: 'cloud_run',
      title: 'Tenant Routing & Auth Engine',
      sub: 'Hop 2 PDP • Signs ECDSA P-256 Envelope',
      l400Badge: 'Subnet: 10.100.4.0/22',
      l400Spec: 'Cloud Run Gen2 (min=5, max=200)',
    },
    edgeTopLeft: ['WAF rule', 'mt-prod-waf-v4'],
    edgeMidLeft: ['gRPC :8443', 'JWT verify'],
    edgeBotLeft: ['STS OIDC', 'token exchange'],
    step2Left: 'mTLS :8443',
    step7Mid: 'Signed SSE',
  },
  govHubTitle: 'Central Governance, KMS',
  govHubTitle2: '& FinOps Hub (10.100.8.0/24)',
  govCards: {
    top: {
      icon: 'cloud_kms',
      title: 'Cloud KMS & Secret Manager',
      sub: '90-Day Auto-Rotation • Envelope DEK',
      l400Badge: 'HSM Ring: kr-mt-hsm-us-central1',
      l400Spec: 'FIPS 140-3 Level 3 HSM',
    },
    mid: {
      icon: 'bigquery_analytics',
      title: 'BigQuery & Cloud Logging',
      sub: 'CMEK: projects/.../keys/bq-cmek • 365d Retention',
      l400Badge: 'bq://ramp-portal-dev.finops_telemetry',
      l400Spec: 'OTel Spans + WORM Audit',
    },
    bot: {
      icon: 'vertex_agent_engine',
      title: 'Vertex AI Evaluation & FinOps',
      sub: 'Chargeback SKU Tag: labels.tenant_id',
      l400Badge: 'Pipeline: vertex-eval-drift-cron',
      l400Spec: 'Every 15m Drift & Cost Attribution',
    },
  },
  midStep3Label: ['Internal ALB / PSC', '10.100.12.0/24 (mTLS)'],
  midStep7Label: ['Sanitized response', 'stream (:443)'],
  midGovLabel: ['OTel gRPC :4317 &', 'KMS CMEK wrapping'],
  leftBoundaryLabel: 'Pattern A: Pooled Shared Runtime (ramp-portal-dev • VPC: 10.110.0.0/16)',
  leftZoneTitle: 'Tenant Pool Shared VPC Subnet: 10.110.0.0/20',
  leftZoneSub: 'Logical Isolation via tenant_id & FORCE ROW LEVEL SECURITY',
  leftCards: {
    modelArmor: {
      icon: 'model_armor',
      title: 'Model Armor & DLP Filter',
      sub: 'Prompt Injection + InfoTypes: SSN, CCN, ICD10',
      l400Badge: 'templates/ma-strict',
      l400Spec: 'Inline SDP Redaction Gate',
    },
    llm: {
      icon: 'cloud_spanner',
      title: 'Vertex AI Search & Spanner',
      sub: 'Vertex Index: idx-shared-rag (Namespace Filter)',
      l400Badge: 'Spanner: mt-shared-db (4000 PU)',
      l400Spec: 'RLS: tenant_id Isolation',
    },
    runtime: {
      icon: 'cloud_run',
      title: 'Shared Cloud Run ADK Pool',
      sub: '4 vCPU / 16GiB • Concurrency=80 • Serverless VPC',
      l400Badge: 'adk-pool-srv (10.110.1.0/24)',
      l400Spec: 'Cloud Run Gen2 Sandbox',
    },
    mcp: {
      icon: 'mcp_servers',
      title: 'MCP Tool Execution Gateway',
      sub: 'Hop 4 Per-Tenant OAuth Vault • Cloud NAT',
      l400Badge: 'Egress NAT: 34.71.190.12',
      l400Spec: 'mTLS 1.3 (:443 Outbound)',
    },
    datastore: {
      icon: 'alloydb',
      title: 'Cloud Storage & AlloyDB',
      sub: 'FORCE ROW LEVEL SECURITY (tenant_id = current_setting)',
      l400Badge: 'AlloyDB: 10.110.2.0/24 (:5432)',
      l400Spec: 'pgvector ScaNN HNSW Index',
    },
    step4Label: 'DLP + Model Armor',
    step6Label: 'Output SDP Scrub',
    step5Label: ['Namespace-filtered', 'RAG & Spanner'],
    ragLabel: ['Per-Tenant', 'OAuth Vault'],
    toolLabel: ['AlloyDB :5432', 'FORCE RLS'],
  },
  rightBoundaryLabel: 'Pattern B/C: Dedicated Sovereign Spoke (tenant-silo-8841 • VPC: 10.200.0.0/16)',
  rightZoneTitle: 'Dedicated Sovereign Tenant Silo Spoke VPC: 10.200.0.0/20',
  rightZoneSub: 'VPC-SC Perimeter: p-finvault-silo • PSC Attachment: 10.200.1.0/28',
  rightCards: {
    modelArmor: {
      icon: 'psc_bridge',
      title: 'Private Service Connect (PSC)',
      sub: 'Hop 3 Cross-Project Private Link • No Public IP',
      l400Badge: 'psc-silo-8841 (10.200.1.2:443)',
      l400Spec: 'PSC Attachment 10.200.1.0/28',
    },
    llm: {
      icon: 'gemini_agent_platform',
      title: 'Dedicated Vertex AI & Vector DB',
      sub: 'Dedicated Matching Engine Index • Zero Cache Share',
      l400Badge: 'Private Endpoint: 10.200.8.10',
      l400Spec: 'Peered :443 • Dedicated PT',
    },
    runtime: {
      icon: 'gke',
      title: 'Dedicated Cloud Run / GKE',
      sub: 'Master CIDR: 172.16.0.32/28 • Shielded Nodes',
      l400Badge: 'GKE Autopilot: 10.200.4.0/22',
      l400Spec: 'Pods /17 • Workload Identity',
    },
    mcp: {
      icon: 'cloud_spanner',
      title: 'Dedicated Spanner / BigQuery',
      sub: 'BigQuery Reservation: 500 Baseline Slots • Isolated',
      l400Badge: 'spanner-silo-8841 (Regional HA)',
      l400Spec: '99.999% Multi-Region Quorum',
    },
    datastore: {
      icon: 'cloud_kms',
      title: 'Customer-Managed KMS (CMEK)',
      sub: 'External HSM via VPC-SC • Tenant Revocable',
      l400Badge: 'projects/silo-8841/.../keys/ekm-01',
      l400Spec: 'Cloud EKM • Instant 423 Lock',
    },
    ragLabel: ['Dedicated Silo', 'Spanner & BQ'],
    toolLabel: ['Cloud EKM', 'CMEK Key Lock'],
  },
};

export function generateTemplate79L400MultiTenantHubSpokeNetworkSpecXml(
  _domainFlavor?: string,
  _theme?: 'light' | 'dark'
): string {
  return compileOfficialArchCenterDrawioXml(L400_MULTI_TENANT_HUB_SPOKE_NETWORK_CONFIG);
}

/**
 * Blueprint #81: [L400 PRINCIPAL SEQUENCE] OIDC JWT, SPIFFE mTLS, FW & VPC-SC (P3-APP-L-10)
 */
export function generateTemplate81L400PrincipalSequenceA2aMcpXml(
  _domainFlavor?: string,
  _theme?: 'light' | 'dark'
): string {
  return TEMPLATE_81_PRINCIPAL_SEQUENCE_XML;
}

/**
 * Blueprint #84: [GOOGLE CLOUD ARCHITECTURE CENTER #78] [L400 DEEP TECHNICAL IMPLEMENTATION GS (EBS R12.2) on Oracle Database@Google Cloud (Exadata X10M)]
 */
export function generateTemplate84L400OracleEbsExadataArchCenter78Xml(
  _domainFlavor?: string,
  theme?: 'light' | 'dark'
): string {
  return buildOfficialOracleEbsExadataArchCenter78Xml(theme || 'light');
}
