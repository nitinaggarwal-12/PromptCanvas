import {
  compileOfficialArchCenterDrawioXml,
  OfficialArchCenterBlueprintConfig,
} from './templateOfficialGcpArchCenterHubSpoke';
import { generateLogicalGcpAgentArchitectureXml } from './templateLogicalGcpAgentArchitecture';
import { buildOfficialOracleEbsExadataArchCenter78Xml } from './oracleAtGoogleExadataEbsTopology';
import { TEMPLATE_81_PRINCIPAL_SEQUENCE_XML } from './template81PrincipalSequenceXml';
import { resolveArchIconUri } from './workstreamTopologyRenderers';

function escXml(str: string): string {
  return String(str ?? '')
    .replace(/&(?!(?:amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

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
 * Blueprint #80: L400 Physical Network & Deployment Topology — The Agentic Workspace (Orchestrator V1)
 */
export function generateTemplate80L400PhysicalNetworkAgenticWorkspaceXml(
  _domainFlavor?: string,
  _theme?: 'light' | 'dark'
): string {
  const cells: string[] = [];

  const addBox = (
    id: string,
    x: number,
    y: number,
    w: number,
    h: number,
    html: string,
    style: string
  ) => {
    cells.push(
      `        <mxCell id="${id}" value="${escXml(html)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`
    );
  };

  const addCard = (
    id: string,
    x: number,
    y: number,
    w: number,
    h: number,
    iconKey: string,
    badge: string,
    title: string,
    sub: string,
    spec: string,
    fill = '#FFFFFF',
    stroke = '#64748B'
  ) => {
    const iconUri = resolveArchIconUri(iconKey, title, sub);
    const html = `<table style="width:100%;height:100%;border-collapse:collapse;font-family:'Inter','Google Sans',sans-serif;"><tr><td style="width:36px;text-align:center;vertical-align:middle;padding-left:6px;"><img src="${iconUri}" width="26" height="26"/></td><td style="text-align:left;vertical-align:middle;padding:4px 8px;line-height:1.2;"><div style="font-size:8.5px;font-weight:800;color:#1D4ED8;letter-spacing:0.3px;">${badge}</div><div style="font-size:11px;font-weight:800;color:#0F172A;">${title}</div><div style="font-size:9px;color:#334155;">${sub}</div><div style="font-size:8px;font-family:'Roboto Mono',monospace;color:#B91C1C;background:#F8FAFC;border:1px solid #CBD5E1;border-radius:3px;padding:1px 4px;margin-top:2px;display:inline-block;">${spec}</div></td></tr></table>`;
    addBox(
      id,
      x,
      y,
      w,
      h,
      html,
      `rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${stroke};strokeWidth=1.6;align=left;verticalAlign=middle;`
    );
  };

  const addEdge = (
    id: string,
    src: string,
    tgt: string,
    label: string,
    color = '#1E293B',
    dashed = false,
    extraStyle = '',
    offsetXml = ''
  ) => {
    const dash = dashed ? 'dashed=1;dashPattern=5 4;' : '';
    cells.push(
      `        <mxCell id="${id}" value="${escXml(label)}" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;${dash}${extraStyle}strokeColor=${color};strokeWidth=1.8;endArrow=block;endFill=1;fontSize=8.5;fontStyle=1;fontColor=#0F172A;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;" edge="1" parent="1" source="${src}" target="${tgt}"><mxGeometry relative="1" as="geometry">${offsetXml}</mxGeometry></mxCell>`
    );
  };

  // Outer Frame & Title Banner
  addBox(
    'l400_phys_bg',
    20,
    16,
    1560,
    920,
    `<div style="font-family:'Inter','Google Sans',sans-serif;text-align:center;padding-top:6px;"><b style="font-size:15px;color:#0F172A;letter-spacing:0.4px;">GOOGLE CLOUD PLATFORM (GCP) — PHYSICAL DEPLOYMENT TOPOLOGY (L400) FOR THE AGENTIC WORKSPACE (ORCHESTRATOR V1)</b><br/><span style="font-size:10.5px;color:#475569;">Active-Active Multi-Region Status (us-central1 Primary + europe-west1 Passive ValKey Sync) • 100 Gbps Partner Interconnect • gRPC mTLS 1.3</span></div>`,
    'rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#94A3B8;strokeWidth=2;verticalAlign=top;align=center;spacingTop=4;'
  );

  // Zone 1 Left: On-Prem Edge & Perimeter Subnet (10.10.1.0/24)
  addBox(
    'zone_onprem_edge',
    40,
    72,
    236,
    600,
    `<div style="font-family:'Inter',sans-serif;font-weight:800;font-size:11.5px;color:#1E3A8A;">1. ON-PREM EDGE &amp; WAN INGRESS</div><div style="font-size:9px;color:#475569;">192.168.1.8/24 • Corporate Edge</div>`,
    'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#60A5FA;strokeWidth=1.6;verticalAlign=top;align=left;spacingLeft=10;spacingTop=8;'
  );

  addCard(
    'card_onprem_client',
    52,
    122,
    212,
    96,
    'iap_iam_shield',
    '192.168.1.8/24',
    'On-Prem Edge & Users',
    'Enterprise Workstations & Apps',
    'TLS 1.3 + OAuth 2.0 PKCE',
    '#FFFFFF',
    '#3B82F6'
  );
  addCard(
    'card_onprem_iam',
    52,
    242,
    212,
    96,
    'iap_iam_shield',
    'OIDC / SAML 2.0',
    'IAM & Governance',
    'Workforce Identity Federation',
    'STS Token Exchange (:443)',
    '#FFFFFF',
    '#3B82F6'
  );
  addCard(
    'card_onprem_wan',
    52,
    362,
    212,
    102,
    'cloud_router',
    'BGP ASN 64512',
    'WAN / Partner Interconnect',
    'Dedicated 100G Edge Uplink',
    'VLAN 100/200 • IPSec / MACsec',
    '#FFFFFF',
    '#3B82F6'
  );
  addBox(
    'card_routing_table',
    52,
    484,
    212,
    168,
    `<div style="font-family:'Roboto Mono',monospace;font-size:8.5px;color:#1E293B;text-align:left;padding:6px;line-height:1.35;"><b style="font-size:9.5px;color:#0F172A;">SUBNET &amp; ROUTE TABLE</b><br/>• 10.10.1.0/24: Perimeter DMZ<br/>• 10.10.2.0/24: Agent Runtime<br/>• 10.10.3.0/26: Filestore HA<br/>• 10.20.1.0/24: Decision Plane<br/>• ASN 16550 ⇄ ASN 31998<br/>• Explicit Log Routing Enabled</div>`,
    'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.2;align=left;verticalAlign=top;'
  );

  // Perimeter Subnet (10.10.1.0/24)
  addBox(
    'zone_perimeter_subnet',
    292,
    72,
    228,
    600,
    `<div style="font-family:'Inter',sans-serif;font-weight:800;font-size:11.5px;color:#991B1B;">PERIMETER SUBNET (10.10.1.0/24)</div><div style="font-size:9px;color:#7F1D1D;">Cloud Armor WAF • ALB VIP • NAT</div>`,
    'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FEF2F2;strokeColor=#F87171;strokeWidth=1.6;verticalAlign=top;align=left;spacingLeft=10;spacingTop=8;'
  );

  addCard(
    'card_perim_armor',
    304,
    126,
    204,
    102,
    'cloud_armor',
    'WAF & DDoS Shield',
    'Google Cloud Armor',
    'Input Filtering & Safety Gate',
    'OWASP Top 10 • Adaptive Protection',
    '#FFFFFF',
    '#DC2626'
  );
  addCard(
    'card_perim_alb',
    304,
    254,
    204,
    102,
    'load_balancer_cloud_armor',
    'VIP: 10.10.1.100',
    'Cloud Load Balancing',
    'Global External & Internal ALB',
    'HTTPS :443 • gRPC HTTP/2',
    '#FFFFFF',
    '#2563EB'
  );
  addCard(
    'card_perim_nat',
    304,
    382,
    204,
    102,
    'cloud_nat',
    'Egress Gateway',
    'Cloud NAT Gateways',
    'Deterministic Outbound IPs',
    'Auto-Allocated • Port Reservation',
    '#FFFFFF',
    '#D97706'
  );
  addCard(
    'card_perim_knowledge',
    304,
    510,
    204,
    142,
    'cloud_spanner',
    'Vector & Long-Term Memory',
    'Enterprise Knowledge Store',
    'Stores 768-d Embeddings & State',
    'Spanner Vector + Vertex Search',
    '#FEFCE8',
    '#CA8A04'
  );

  // Center Intelligence Orchestration Plane (10.10.2.0/24)
  addBox(
    'zone_orchestration_plane',
    564,
    72,
    428,
    600,
    `<div style="font-family:'Inter',sans-serif;font-weight:800;font-size:12px;color:#312E81;">[INTELLIGENCE ORCHESTRATION PLANE — 10.10.2.0/24]</div><div style="font-size:9.5px;color:#4338CA;">OIDC Envoy Proxy • Gemma 2 9B Serving • Gemini Enterprise Agent (ADK v1.4 / LangGraph v0.2.1)</div>`,
    'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#F5F3FF;strokeColor=#818CF8;strokeWidth=1.8;verticalAlign=top;align=left;spacingLeft=12;spacingTop=8;'
  );

  addCard(
    'card_orch_envoy',
    584,
    126,
    388,
    106,
    'apigee_gateway',
    'gRPC mTLS 1.3 • EMBEDDING_INSTANCE (v1.3)',
    '[OIDC & ENVOY ACCESS PROXY (gRPC)]',
    'JWT Signature Verification, Rate Limiting & Context Propagation',
    'Envoy v1.29+ • SPIFFE SVID mTLS • 10.10.2.10:8443',
    '#FFFFFF',
    '#6366F1'
  );
  addCard(
    'card_orch_gemma',
    584,
    252,
    388,
    112,
    'gke',
    'GKE Regional Cluster • GPU Inference Pool',
    '[GEMINI AGENT PLATFORM (v1) — GEMMA 2 9B]',
    'Low-Latency Model Serving & Context Cache Pool',
    'GKE Autopilot • L4/H100 Node Pool • vLLM / Vertex Prediction',
    '#FFFFFF',
    '#2563EB'
  );
  addCard(
    'card_orch_adk',
    584,
    384,
    388,
    120,
    'gemini_agent_platform',
    'ORCHESTRATOR V1 • Stateful Cognitive Coordinator',
    'GEMINI ENTERPRISE AGENT (v1) — ADK v1.4 / LANGGRAPH',
    'Orchestrates Multi-Agent Decisions, Tool Calls & Safety Guardrails',
    'Vertex AI Agent Engine • ReAct Loop • Deterministic Tool Dispatch',
    '#EEF2FF',
    '#1D4ED8'
  );
  addCard(
    'card_orch_filestore',
    584,
    524,
    388,
    128,
    'cloud_storage',
    'Shared POSIX NFSv4.1 • 10.10.3.0/26',
    'Cloud Filestore Enterprise (Regional HA NFSv4.1)',
    'Multi-Zone Shared Checkpoints, Model Artifacts & Workspace Volumes',
    '100k IOPS • Regional Synchronous Replication • KMS CMEK',
    '#FFFFFF',
    '#059669'
  );

  // Dedicated ODB / Partner Interconnect Column
  addBox(
    'zone_interconnect_col',
    1012,
    72,
    132,
    600,
    `<div style="font-family:'Inter',sans-serif;font-weight:800;font-size:10.5px;color:#0F172A;text-align:center;">Dedicated ODB Network</div>`,
    'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#64748B;strokeWidth=1.5;dashed=1;verticalAlign=top;align=center;spacingTop=8;'
  );

  addBox(
    'card_interconnect_gw',
    1022,
    230,
    112,
    280,
    `<div style="font-family:'Inter',sans-serif;text-align:center;padding:6px;line-height:1.3;"><b style="font-size:10.5px;color:#0F172A;">100 Gbps Partner Interconnect</b><br/><br/><span style="font-size:8.5px;color:#1D4ED8;font-weight:700;">Dedicated Gateway</span><br/><br/><span style="font-size:8px;font-family:'Roboto Mono',monospace;color:#334155;">BGP ASN 16550<br/>⇄ Peer ASN 31998<br/>MTU 9000<br/>Jumbo Frames<br/>&lt;0.5ms Latency</span></div>`,
    'rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.8;align=center;verticalAlign=middle;'
  );

  // Zone 2 Right: Decision Ignition Plane (10.20.1.0/24)
  addBox(
    'zone_decision_ignition',
    1164,
    72,
    396,
    600,
    `<div style="font-family:'Inter',sans-serif;font-weight:800;font-size:12px;color:#065F46;">ZONE 2: [DECISION_IGNITION PLANE — 10.20.1.0/24]</div><div style="font-size:9.5px;color:#047857;">Actionable Insights • Tool Loop • Active-Passive Multi-Region ValKey</div>`,
    'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#ECFDF5;strokeColor=#34D399;strokeWidth=1.8;verticalAlign=top;align=left;spacingLeft=12;spacingTop=8;'
  );

  addCard(
    'card_zone2_exadata',
    1184,
    126,
    356,
    104,
    'alloydb',
    'Co-Located OCI / Enterprise Data Rack',
    'Oracle Exadata X10M & Core Transactional Systems',
    'High-Throughput RoCEv2 RDMA Fabric & OCI Object Storage Peering',
    '100GbE RoCEv2 • <20µs Latency • ASN 85001',
    '#FFF7ED',
    '#EA580C'
  );
  addCard(
    'card_zone2_decision_log',
    1184,
    250,
    356,
    116,
    'vertex_agent_engine',
    'Actionable Insights / Tool Loop (Node A)',
    'DECISION_LOG_STATE (getStatus, queryCrm)',
    'Executes Deterministic CRM & Core Banking State Lookups',
    'gRPC over VPC Peering (mTLS v1.3) • Idempotent Read/Write',
    '#FFFFFF',
    '#059669'
  );
  addCard(
    'card_zone2_state_snapshot',
    1184,
    386,
    356,
    116,
    'cloud_spanner',
    'Actionable Insights / Tool Loop (Node B)',
    'STATE_SNAPSHOT (nonMutation & queryCrm)',
    'Captures Immutable Execution Snapshots & Tool Audit Proofs',
    'DLP Masking Path: [Project A/rules/dlp_masking_gcp.config]',
    '#FFFFFF',
    '#059669'
  );
  addCard(
    'card_zone2_valkey',
    1184,
    522,
    356,
    130,
    'valkey_cache',
    'Memorystore for ValKey v1.0.3 • Active-Passive HA',
    'ValKey Cluster us-central1 (Active)',
    'Cross-Region Async Sync to europe-west1 Passive ValKey',
    'Sub-ms Semantic & Session Cache • Automatic Failover',
    '#FFFFFF',
    '#DC2626'
  );

  // Bottom Zone 4: External Action Tools & Technology Logos
  addBox(
    'zone_external_tools',
    40,
    692,
    1520,
    176,
    `<div style="font-family:'Inter',sans-serif;font-weight:800;font-size:11.5px;color:#0F172A;">4. EXTERNAL ACTION TOOLS, DATA MODERNIZATION &amp; SECURITY GOVERNANCE</div>`,
    'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#64748B;strokeWidth=1.6;verticalAlign=top;align=left;spacingLeft=12;spacingTop=8;'
  );

  addCard(
    'card_ext_data_mod',
    60,
    732,
    350,
    118,
    'bigquery_analytics',
    'MCP Endpoint via Peering Path',
    'Data Modernization Plans (BigQuery & GCS)',
    'Dataset Schemas, Conversation Logs & Lakehouse Marts',
    'HTTPS :443 • BigQuery Storage Read/Write API',
    '#FFFFFF',
    '#2563EB'
  );
  addCard(
    'card_ext_vertex_plans',
    434,
    732,
    350,
    118,
    'gemini_agent_platform',
    'Vertex AI MLOps & Serving',
    'AI / Vertex AI Plans',
    'Machine Training, Model Serving & Evaluation Pipelines',
    'HTTPS :443 • Vertex AI Prediction & Evaluation',
    '#FFFFFF',
    '#7C3AED'
  );
  addCard(
    'card_ext_sec_gov',
    808,
    732,
    350,
    118,
    'cloud_kms',
    'DLP Masking & KMS CMEK',
    'Security & Governance Controls',
    'Fleet Governance, KMS Security Keys & DLP Masking Config',
    'projects/ramp-portal-dev/locations/global/dlp',
    '#FFFFFF',
    '#059669'
  );
  addCard(
    'card_ext_scc_logging',
    1182,
    732,
    358,
    118,
    'security_command_center',
    'OTel Collector (:54222 / :4317)',
    'GCP Cloud Logging & Security Command Center',
    'Continuous Monitoring, SIEM Threat Detection & IO Ops',
    'Real-Time Audit Stream • Zero-PII Telemetry',
    '#FFFFFF',
    '#DC2626'
  );

  // Technology Logos Strip
  addBox(
    'tech_logos_footer',
    40,
    880,
    1520,
    44,
    `<div style="font-family:'Inter','Google Sans',sans-serif;font-size:10.5px;color:#0F172A;text-align:center;"><b>TECHNOLOGY STACK:</b> &nbsp; <b>Google Cloud (GCP)</b> &bull; <b>GKE Regional Cluster</b> [Gemma 2 9B Serving] &bull; <b>Envoy Access Proxy</b> [v1.29+ gRPC mTLS] &bull; <b>Cloud Spanner</b> [Vector v1.3] &bull; <b>ValKey Memory</b> [v1.0.3 Cache] &bull; <b>Google ADK v1.4 / LangGraph v0.2.1</b> &bull; <b>Oracle Exadata X10M</b></div>`,
    'rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.4;align=center;verticalAlign=middle;'
  );

  // Edges
  addEdge('e_onprem_to_armor', 'card_onprem_client', 'card_perim_armor', 'TLS 1.3', '#2563EB');
  addEdge('e_armor_to_alb', 'card_perim_armor', 'card_perim_alb', 'WAF Pass', '#DC2626');
  addEdge(
    'e_alb_to_envoy',
    'card_perim_alb',
    'card_orch_envoy',
    'gRPC :8443',
    '#2563EB',
    false,
    'exitX=1;exitY=0.25;exitDx=0;exitDy=0;entryX=0;entryY=0.75;entryDx=0;entryDy=0;'
  );
  addEdge('e_envoy_to_gemma', 'card_orch_envoy', 'card_orch_gemma', 'OIDC JWT', '#6366F1');
  addEdge('e_gemma_to_adk', 'card_orch_gemma', 'card_orch_adk', 'Context', '#2563EB');
  addEdge(
    'e_adk_to_knowledge',
    'card_orch_adk',
    'card_perim_knowledge',
    'Vector RAG',
    '#CA8A04',
    false,
    'exitX=0;exitY=0.75;exitDx=0;exitDy=0;entryX=1;entryY=0.25;entryDx=0;entryDy=0;'
  );
  addEdge('e_adk_to_filestore', 'card_orch_adk', 'card_orch_filestore', 'NFSv4.1', '#059669');
  addEdge('e_adk_to_interconnect', 'card_orch_adk', 'card_interconnect_gw', '100G Link', '#1D4ED8');
  addEdge('e_interconnect_to_decision', 'card_interconnect_gw', 'card_zone2_decision_log', 'BGP Peer', '#059669');
  addEdge('e_exadata_to_decision', 'card_zone2_exadata', 'card_zone2_decision_log', 'RoCEv2', '#EA580C');
  addEdge('e_decision_to_snapshot', 'card_zone2_decision_log', 'card_zone2_state_snapshot', 'Commit', '#059669');
  addEdge('e_snapshot_to_valkey', 'card_zone2_state_snapshot', 'card_zone2_valkey', 'Sync Cache', '#DC2626');
  addEdge(
    'e_adk_to_ext_data',
    'card_orch_filestore',
    'card_ext_vertex_plans',
    'MCP Peering',
    '#2563EB',
    true,
    'exitX=0.25;exitY=1;exitDx=0;exitDy=0;entryX=0.75;entryY=0;entryDx=0;entryDy=0;'
  );
  addEdge('e_ext_data_to_vertex', 'card_ext_data_mod', 'card_ext_vertex_plans', 'HTTPS 443', '#7C3AED');
  addEdge('e_ext_vertex_to_sec', 'card_ext_vertex_plans', 'card_ext_sec_gov', 'HTTPS 443', '#059669');
  addEdge('e_ext_sec_to_scc', 'card_ext_sec_gov', 'card_ext_scc_logging', 'OTel :54222', '#DC2626');

  return `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="app.diagrams.net" agent="PromptCanvas-L400-Physical-Topology" version="24.7.5">
  <diagram id="l400_physical_network_agentic_workspace" name="L400 Physical Network &amp; Deployment Topology — The Agentic Workspace">
    <mxGraphModel dx="1600" dy="960" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="960" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
${cells.join('\n')}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
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
 * Blueprint #82: L200 Logical — Google Cloud Multi-Agent System Architecture
 */
export function generateTemplate82L200LogicalGcpMultiAgentSystemXml(
  domainFlavor?: string,
  theme?: 'light' | 'dark'
): string {
  return generateLogicalGcpAgentArchitectureXml(domainFlavor || 'enterprise', theme || 'light');
}

/**
 * Blueprint #83: L100 Conceptual — The Agentic Workspace (L100 Conceptual Map) - Business Value View
 */
export function generateTemplate83L100ConceptualAgenticWorkspaceXml(
  _domainFlavor?: string,
  _theme?: 'light' | 'dark'
): string {
  const cells: string[] = [];

  const addBox = (
    id: string,
    x: number,
    y: number,
    w: number,
    h: number,
    html: string,
    style: string
  ) => {
    cells.push(
      `        <mxCell id="${id}" value="${escXml(html)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`
    );
  };

  const addCard = (
    id: string,
    x: number,
    y: number,
    w: number,
    h: number,
    iconKey: string,
    stepTitle: string,
    sub: string,
    valueOutcome: string,
    fill = '#FFFFFF',
    stroke = '#64748B'
  ) => {
    const iconUri = resolveArchIconUri(iconKey, stepTitle, sub);
    const html = `<table style="width:100%;height:100%;border-collapse:collapse;font-family:'Inter','Google Sans',sans-serif;"><tr><td style="width:38px;text-align:center;vertical-align:middle;padding-left:6px;"><img src="${iconUri}" width="28" height="28"/></td><td style="text-align:left;vertical-align:middle;padding:4px 8px;line-height:1.25;"><div style="font-size:11.5px;font-weight:800;color:#0F172A;">${stepTitle}</div><div style="font-size:9.5px;color:#334155;margin-top:2px;">${sub}</div><div style="font-size:8.5px;font-weight:700;color:#1D4ED8;margin-top:3px;">${valueOutcome}</div></td></tr></table>`;
    addBox(
      id,
      x,
      y,
      w,
      h,
      html,
      `rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${stroke};strokeWidth=1.8;align=left;verticalAlign=middle;`
    );
  };

  const addEdge = (
    id: string,
    src: string,
    tgt: string,
    label: string,
    color = '#2563EB',
    dashed = false,
    extraStyle = '',
    offsetXml = ''
  ) => {
    const dash = dashed ? 'dashed=1;dashPattern=5 4;' : '';
    cells.push(
      `        <mxCell id="${id}" value="${escXml(label)}" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;${dash}${extraStyle}strokeColor=${color};strokeWidth=2.2;endArrow=block;endFill=1;fontSize=9;fontStyle=1;fontColor=#0F172A;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;" edge="1" parent="1" source="${src}" target="${tgt}"><mxGeometry relative="1" as="geometry">${offsetXml}</mxGeometry></mxCell>`
    );
  };

  // Outer Frame
  addBox(
    'l100_concept_bg',
    20,
    16,
    1560,
    920,
    `<div style="font-family:'Inter','Google Sans',sans-serif;text-align:center;padding-top:6px;"><b style="font-size:16px;color:#0F172A;letter-spacing:0.5px;">THE AGENTIC WORKSPACE (L100 CONCEPTUAL MAP) — BUSINESS VALUE VIEW</b><br/><span style="font-size:10.5px;color:#475569;">End-to-End Business Value Flow: User Prompt ➔ Model Armor Safety Gateway ➔ Gemini Agent Coordinator ➔ Actionable Insights &amp; Enterprise Tool Loop</span></div>`,
    'rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#94A3B8;strokeWidth=2;verticalAlign=top;align=center;spacingTop=4;'
  );

  // Zone 1: User / Client
  addBox(
    'l100_zone_user',
    40,
    72,
    250,
    600,
    `<div style="font-family:'Inter',sans-serif;font-weight:800;font-size:12px;color:#1E3A8A;">1. USER / CLIENT</div><div style="font-size:9.5px;color:#475569;">Omnichannel Business Prompts</div>`,
    'rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#60A5FA;strokeWidth=1.8;verticalAlign=top;align=left;spacingLeft=12;spacingTop=8;'
  );

  addCard(
    'l100_card_user_input',
    56,
    126,
    218,
    130,
    'iap_iam_shield',
    '1. USER / CLIENT',
    "User Inputs Business Prompt (e.g., 'Check my balance')",
    'Natural-Language Intent Capture',
    '#FFFFFF',
    '#3B82F6'
  );
  addCard(
    'l100_card_edge_armor',
    56,
    286,
    218,
    130,
    'model_armor',
    '2. MODEL ARMOR (Safety Gateway)',
    'Input Filtering & Safety Checks at Edge',
    'Blocks Prompt Injection & PII Leaks',
    '#FEF2F2',
    '#EF4444'
  );
  addCard(
    'l100_card_corp_iam',
    56,
    446,
    218,
    196,
    'iap_iam_shield',
    'Corporate Users & IAM',
    'Enterprise Identity, Role-Based Access & Subnet Routing',
    'Explicit Audit & Compliance Governance',
    '#FFFFFF',
    '#64748B'
  );

  // Zone 2: Intelligence Orchestration Plane
  addBox(
    'l100_zone_orchestration',
    310,
    72,
    680,
    600,
    `<div style="font-family:'Inter',sans-serif;font-weight:800;font-size:12px;color:#312E81;">[INTELLIGENCE ORCHESTRATION PLANE]</div><div style="font-size:9.5px;color:#4338CA;">Safety Gateway • Enterprise Knowledge Store • Gemini Agent Coordinator • Shared HA Filestore</div>`,
    'rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#F5F3FF;strokeColor=#818CF8;strokeWidth=1.8;verticalAlign=top;align=left;spacingLeft=12;spacingTop=8;'
  );

  addCard(
    'l100_card_inner_armor',
    324,
    126,
    216,
    150,
    'model_armor',
    '2. MODEL ARMOR (Safety Gateway)',
    'Input Filtering & Policy Safety Checks',
    'Zero Unsafe Requests Reach Coordinator',
    '#FEF2F2',
    '#EF4444'
  );
  addCard(
    'l100_card_knowledge_store',
    324,
    304,
    216,
    220,
    'cloud_spanner',
    '3. ENTERPRISE KNOWLEDGE STORE',
    'Stores Vector Embeddings & Long-Term Memory (Spanner + Vertex Vector)',
    'Grounded Enterprise Context & Citations',
    '#FEFCE8',
    '#EAB308'
  );
  addCard(
    'l100_card_vm_nat',
    630,
    126,
    344,
    108,
    'cloud_nat',
    'In VMs / App Servers / Middle Tier',
    'VM Instance Group & Cloud NAT Gateway',
    'Managed Compute & Secure Outbound Routing',
    '#FFFFFF',
    '#64748B'
  );
  addBox(
    'l100_card_gemini_coordinator',
    630,
    256,
    344,
    224,
    `<div style="font-family:'Inter','Google Sans',sans-serif;text-align:center;padding:12px;line-height:1.35;"><div style="font-size:11px;font-weight:800;color:#2563EB;letter-spacing:0.6px;">✨ CENTRAL COGNITIVE ENGINE</div><div style="font-size:17px;font-weight:900;color:#0F172A;margin-top:6px;">GEMINI AGENT COORDINATOR</div><div style="font-size:12px;font-weight:700;color:#1D4ED8;margin-top:4px;">Gemini Intelligence</div><div style="font-size:10.5px;color:#334155;margin-top:6px;">Orchestrates Multi-Step Decisions, Grounded Knowledge Lookup &amp; Enterprise Tool Actions via OIDC/Envoy</div></div>`,
    'rounded=1;arcSize=20;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=3;align=center;verticalAlign=middle;'
  );
  addCard(
    'l100_card_filestore',
    630,
    502,
    344,
    140,
    'cloud_storage',
    'Cloud Filestore (Regional HA NFSv4.1)',
    'Shared Enterprise NFS Storage & Session State Persistence',
    'Zero-Data-Loss Regional High Availability',
    '#ECFDF5',
    '#10B981'
  );

  // Dedicated ODB Network Bridge
  addBox(
    'l100_zone_odb_bridge',
    1006,
    72,
    132,
    600,
    `<div style="font-family:'Inter',sans-serif;font-weight:800;font-size:10.5px;color:#0F172A;text-align:center;">Dedicated ODB Network</div>`,
    'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#64748B;strokeWidth=1.5;dashed=1;verticalAlign=top;align=center;spacingTop=8;'
  );
  addBox(
    'l100_card_partner_interconnect',
    1016,
    220,
    112,
    290,
    `<div style="font-family:'Inter',sans-serif;text-align:center;padding:6px;line-height:1.35;"><b style="font-size:10.5px;color:#0F172A;">100 Gbps Partner Interconnect</b><br/><br/><span style="font-size:9px;color:#2563EB;font-weight:700;">Dedicated Gateway</span><br/><br/><span style="font-size:8.5px;color:#334155;">BGP ASN 16550<br/>⇄ ASN 31998<br/>MTU 9000<br/>Jumbo Frames</span></div>`,
    'rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.8;align=center;verticalAlign=middle;'
  );

  // Zone 2 Right: Actionable Insights / Tool Loop
  addBox(
    'l100_zone_actionable_loop',
    1154,
    72,
    406,
    600,
    `<div style="font-family:'Inter',sans-serif;font-weight:800;font-size:12px;color:#065F46;">ZONE 2: ACTIONABLE INSIGHTS / TOOL LOOP</div><div style="font-size:9.5px;color:#047857;">Customer Lookup • Function Execution • Active ValKey Memory</div>`,
    'rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#ECFDF5;strokeColor=#10B981;strokeWidth=1.8;verticalAlign=top;align=left;spacingLeft=12;spacingTop=8;'
  );

  addCard(
    'l100_card_exadata_rack',
    1174,
    122,
    366,
    98,
    'alloydb',
    'Enterprise Core Database Rack',
    'Oracle Exadata X10M & Core Systems of Record',
    'High-Speed Peering (ASN 85001 • HTTPS/TCP)',
    '#FFF7ED',
    '#EA580C'
  );
  addCard(
    'l100_card_customer_lookup',
    1174,
    240,
    366,
    118,
    'vertex_agent_engine',
    'CUSTOMER LOOKUP (getStatus, queryCrm)',
    'Real-Time Customer Profile, Entitlement & Account Verification',
    'Closed-Loop Actionable Business Insights',
    '#FFFFFF',
    '#059669'
  );
  addCard(
    'l100_card_function_exec',
    1174,
    378,
    366,
    118,
    'mcp_servers',
    'FUNCTION EXECUTION (queryCrm & Domain Tools)',
    'Governed Read/Write Tool Invocations with DLP Masking',
    'Audited Enterprise Workflow Automation',
    '#FFFFFF',
    '#059669'
  );
  addCard(
    'l100_card_valkey_cluster',
    1174,
    516,
    366,
    130,
    'valkey_cache',
    'ValKey Cluster us-central1 (Active)',
    'Cross-Region Sync to europe-west3 Passive ValKey + Storage Volume',
    'Sub-Millisecond Low-Latency Memory Cache',
    '#FFFFFF',
    '#2563EB'
  );

  // Bottom Zone 4: External Action Tools
  addBox(
    'l100_zone_external_tools',
    40,
    692,
    1520,
    176,
    `<div style="font-family:'Inter',sans-serif;font-weight:800;font-size:11.5px;color:#0F172A;">4. EXTERNAL ACTION TOOLS (BIGQUERY, VERTEX AI &amp; SECURITY)</div>`,
    'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#64748B;strokeWidth=1.6;verticalAlign=top;align=left;spacingLeft=12;spacingTop=8;'
  );

  addCard(
    'l100_ext_bq',
    60,
    732,
    350,
    118,
    'bigquery_analytics',
    'Data Modernization Plans (BigQuery, Cloud Storage)',
    'Dataset Schemas, Conversation Analytics & Enterprise Data Marts',
    'Unified Analytics Foundation',
    '#FFFFFF',
    '#2563EB'
  );
  addCard(
    'l100_ext_vertex',
    434,
    732,
    350,
    118,
    'gemini_agent_platform',
    'AI / Vertex AI Plans',
    'Machine Training, Machine Serving & Managed Runtime',
    'Scalable Enterprise AI Lifecycle',
    '#FFFFFF',
    '#7C3AED'
  );
  addCard(
    'l100_ext_sec',
    808,
    732,
    350,
    118,
    'cloud_kms',
    'Security & Governance',
    'Fleet Governance, KMS Security Keys & DLP Masking Config',
    'Zero-Trust Regulatory Compliance',
    '#FFFFFF',
    '#059669'
  );
  addCard(
    'l100_ext_scc',
    1182,
    732,
    358,
    118,
    'security_command_center',
    'GCP Cloud Logging & Security Command Center',
    'Continuous Monitoring, OTel Agents & IO Operations',
    'Full-Stack Executive Observability',
    '#FFFFFF',
    '#DC2626'
  );

  // Bottom Technology Logos Strip
  addBox(
    'l100_tech_logos_footer',
    40,
    880,
    1520,
    44,
    `<div style="font-family:'Inter','Google Sans',sans-serif;font-size:10.5px;color:#0F172A;text-align:center;"><b>TECHNOLOGY LOGOS:</b> &nbsp; <b>Envoy Access Proxy</b> &bull; <b>GCP [version 1.29+]</b> &bull; <b>GKE Regional Cluster [Gemma 2 9B model serving]</b> &bull; <b>ValKey Memory [v1.0.3 latency cache]</b> &bull; <b>Cloud Spanner [Vector v1.3]</b> &bull; <b>Gemini Enterprise Agent Platform (V1) [ADK v1.4 / LangGraph v0.2.1]</b></div>`,
    'rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.4;align=center;verticalAlign=middle;'
  );

  // Edges
  addEdge('l100_e1', 'l100_card_user_input', 'l100_card_edge_armor', 'User Prompt', '#2563EB');
  addEdge('l100_e2', 'l100_card_edge_armor', 'l100_card_inner_armor', 'Filtered', '#2563EB');
  addEdge(
    'l100_e3',
    'l100_card_inner_armor',
    'l100_card_gemini_coordinator',
    'Safe Prompt',
    '#2563EB',
    false,
    'exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.22;entryDx=0;entryDy=0;'
  );
  addEdge(
    'l100_e4',
    'l100_card_gemini_coordinator',
    'l100_card_knowledge_store',
    'OIDC / Envoy',
    '#D97706',
    false,
    'exitX=0;exitY=0.65;exitDx=0;exitDy=0;entryX=1;entryY=0.44;entryDx=0;entryDy=0;'
  );
  addEdge('l100_e5', 'l100_card_gemini_coordinator', 'l100_card_filestore', 'mTLS State', '#10B981');
  addEdge('l100_e6', 'l100_card_gemini_coordinator', 'l100_card_partner_interconnect', '100G Link', '#16A34A');
  addEdge('l100_e7', 'l100_card_partner_interconnect', 'l100_card_customer_lookup', 'Tool Loop', '#16A34A');
  addEdge('l100_e8', 'l100_card_exadata_rack', 'l100_card_customer_lookup', 'Core Data', '#EA580C');
  addEdge('l100_e9', 'l100_card_customer_lookup', 'l100_card_function_exec', 'queryCrm', '#059669');
  addEdge('l100_e10', 'l100_card_function_exec', 'l100_card_valkey_cluster', 'Cache Sync', '#2563EB');
  addEdge(
    'l100_e11',
    'l100_card_knowledge_store',
    'l100_ext_vertex',
    'MCP Endpoint',
    '#2563EB',
    true,
    'exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.25;entryY=0;entryDx=0;entryDy=0;',
    '<mxPoint x="0" y="-26" as="offset"/>'
  );
  addEdge('l100_e12', 'l100_ext_bq', 'l100_ext_vertex', 'HTTPS 443', '#7C3AED');
  addEdge('l100_e13', 'l100_ext_vertex', 'l100_ext_sec', 'HTTPS 443', '#059669');
  addEdge('l100_e14', 'l100_ext_sec', 'l100_ext_scc', 'OTel :54222', '#DC2626');

  return `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="app.diagrams.net" agent="PromptCanvas-L100-Conceptual-Map" version="24.7.5">
  <diagram id="l100_conceptual_agentic_workspace" name="L100 Conceptual — The Agentic Workspace Business Value View">
    <mxGraphModel dx="1600" dy="960" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="960" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
${cells.join('\n')}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
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
