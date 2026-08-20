/**
 * 🎨 Blueprint #59 (NEW-APP-09): SaaS Multi-Tenant Application Architecture
 * High-Craft Master Blueprint (Benchmark Pattern following Blueprint 50)
 * 
 * Featuring:
 * - Tenant Clients & Ingress Routing (Tenant Domains, Cloud Identity Platform, Cloud Armor, Envoy Gateway)
 * - Hybrid Compute Layer (Shared Standard Pool GKE Autopilot vs Dedicated VIP Silo Tier)
 * - Partitioned Data & Storage Layer (Shared Postgres with RLS vs Dedicated Silo DB, Per-Tenant Cloud KMS CMEK)
 * - SaaS Operations & Tenant Metering Plane (BigQuery Cost Allocation, Per-Tenant Cloud Logging, Cloud Billing)
 * - Tenant Security & Isolation Governance (Tenant Context Propagator, IAM boundaries)
 */

const esc = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const svg = (body: string): string =>
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">${body}</svg>`)}`;

const ICON = {
  app: svg('<rect x="7" y="8" width="34" height="32" rx="4" fill="#334155"/><path d="M13 15h22M13 21h22M13 27h15" stroke="#fff" stroke-width="2"/><circle cx="34" cy="32" r="4" fill="#60A5FA"/>'),
  auth: svg('<circle cx="24" cy="15" r="8" fill="#16A34A"/><path d="M9 41c2-11 8-16 15-16s13 5 15 16" fill="#16A34A"/><rect x="28" y="28" width="12" height="10" rx="2" fill="#fff" stroke="#16A34A" stroke-width="2"/>'),
  armor: svg('<path d="M24 4 40 10v12c0 11-6.5 18-16 22C14.5 40 8 33 8 22V10z" fill="#DC2626"/><path d="m16 24 5 5 11-13" fill="none" stroke="#fff" stroke-width="3"/>'),
  envoy: svg('<rect x="6" y="6" width="36" height="36" rx="8" fill="#9333EA"/><path d="m24 12 10 20-4 2-6-12-6 12-4-2z" fill="#fff"/>'),
  gke: svg('<rect x="6" y="6" width="36" height="36" rx="8" fill="#1D4ED8"/><path d="m24 12 11 6v12l-11 6-11-6V18z" fill="none" stroke="#fff" stroke-width="2.5"/><circle cx="24" cy="24" r="3" fill="#fff"/>'),
  db: svg('<ellipse cx="24" cy="11" rx="14" ry="6" fill="#7E57C2"/><path d="M10 11v24c0 3.3 6.3 6 14 6s14-2.7 14-6V11" fill="#B8A6E6"/><ellipse cx="24" cy="35" rx="14" ry="6" fill="#7E57C2"/>'),
  key: svg('<circle cx="17" cy="21" r="9" fill="none" stroke="#16A34A" stroke-width="5"/><path d="m24 25 15 15m-7-8 5-5m-10 0 5-5" stroke="#16A34A" stroke-width="4"/>'),
  bq: svg('<ellipse cx="24" cy="12" rx="14" ry="6" fill="#1D4ED8"/><path d="M10 12v18c0 3.3 6.3 6 14 6s14-2.7 14-6V12" fill="#93C5FD"/><ellipse cx="24" cy="30" rx="14" ry="6" fill="#1D4ED8"/>'),
  log: svg('<rect x="10" y="6" width="28" height="36" rx="3" fill="#16A34A"/><path d="M16 15h16M16 23h16M16 31h10" stroke="#fff" stroke-width="2.5"/>'),
  billing: svg('<rect x="8" y="10" width="32" height="24" rx="4" fill="#0284C7"/><path d="M14 20h20M14 26h12" stroke="#fff" stroke-width="2"/>')
};

const cell = (id: string, value: string, style: string, x: number, y: number, width: number, height: number): string =>
  `<mxCell id="${id}" value="${esc(value)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${width}" height="${height}" as="geometry"/></mxCell>`;

const lane = (id: string, number: number, title: string, subtitle: string, x: number, y: number, width: number, height: number, accent: string, fill: string): string =>
  [
    cell(id, '', `rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${accent};strokeWidth=1.5;shadow=0;`, x, y, width, height),
    cell(`${id}_number`, String(number), `ellipse;whiteSpace=wrap;html=1;fillColor=${accent};strokeColor=${accent};fontColor=#FFFFFF;fontStyle=1;fontSize=13;align=center;verticalAlign=middle;`, x + 12, y + 12, 32, 32),
    cell(`${id}_title`, `<b>${title}</b><br><span style="font-size:10px;color:#64748B">${subtitle}</span>`, `text;html=1;whiteSpace=wrap;align=left;verticalAlign=middle;fontColor=${accent};fontSize=15;`, x + 54, y + 7, width - 64, 44),
  ].join('\n');

const card = (id: string, title: string, subtitle: string, icon: string, x: number, y: number, width: number, height: number, accent: string, fill = '#FFFFFF'): string => {
  const html = `<table style="width:100%;height:100%;border-collapse:collapse"><tr><td style="width:42px;text-align:center;vertical-align:middle"><img src="${icon}" width="30" height="30"/></td><td style="text-align:left;vertical-align:middle"><b style="font-size:12px;color:#0F172A">${title}</b><br/><span style="font-size:10px;color:#475569">${subtitle}</span></td></tr></table>`;
  return cell(id, html, `rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${accent};strokeWidth=1.1;align=center;verticalAlign=middle;spacing=4;`, x, y, width, height);
};

const edge = (id: string, source: string, target: string, label: string, kind: 'request' | 'response' | 'governance', exitX = 1, exitY = 0.5, entryX = 0, entryY = 0.5, points: Array<[number, number]> = []): string => {
  const cfg = kind === 'request'
    ? { stroke: '#0284C7', dashed: 0, pattern: '6 4', arrow: 'block', width: 2 }
    : kind === 'response'
      ? { stroke: '#64748B', dashed: 1, pattern: '6 4', arrow: 'block', width: 1.7 }
      : { stroke: '#16A34A', dashed: 1, pattern: '2 4', arrow: 'open', width: 1.6 };
  const pts = points.length ? `<Array as="points">${points.map(([x, y]) => `<mxPoint x="${x}" y="${y}"/>`).join('')}</Array>` : '';
  return `<mxCell id="${id}" value="${esc(label)}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${cfg.stroke};strokeWidth=${cfg.width};dashed=${cfg.dashed};dashPattern=${cfg.pattern};endArrow=${cfg.arrow};endFill=${cfg.arrow === 'block' ? 1 : 0};fontColor=#0F172A;fontSize=10;fontStyle=1;labelBackgroundColor=#FFFFFF;labelBorderColor=none;exitX=${exitX};exitY=${exitY};exitDx=0;exitDy=0;entryX=${entryX};entryY=${entryY};entryDx=0;entryDy=0;" edge="1" parent="1" source="${source}" target="${target}"><mxGeometry relative="1" as="geometry">${pts}</mxGeometry></mxCell>`;
};

export function buildMasterSaasMultiTenantXml(): string {
  const cells: string[] = [
    '<mxCell id="0"/>',
    '<mxCell id="1" parent="0"/>',

    // Lane 1: Tenant Clients & Ingress Routing
    lane('ingress', 1, 'TENANT INGRESS & IDENTITY ROUTER', 'Custom tenant domains, multi-tenant IdP & JWT context extraction', 20, 20, 310, 680, '#0284C7', '#F0F9FF'),
    card('in_domains', 'Custom Tenant Domains', 'tenant1.saas.io, tenant2.saas.io with SSL SNI', ICON.app, 38, 85, 274, 85, '#0284C7'),
    card('in_idp', 'Cloud Identity Platform (Multi-Tenant)', 'Tenant-scoped user authentication & SAML/OIDC SSO', ICON.auth, 38, 195, 274, 90, '#16A34A'),
    card('in_armor', 'Cloud Armor WAF (Tenant Quotas)', 'Per-tenant spike arrest & rate-limiting policies', ICON.armor, 38, 310, 274, 85, '#DC2626'),
    card('in_envoy', 'Envoy Gateway API Ingress Router', 'Extracts X-Tenant-ID JWT claim & routes to compute pool', ICON.envoy, 38, 420, 274, 95, '#9333EA'),

    // Lane 2: Hybrid Compute Layer (Silo vs Pool)
    lane('compute', 2, 'HYBRID COMPUTE LAYER (SILO VS POOL)', 'Standard shared multi-tenant GKE pool vs Dedicated VIP GKE silos', 350, 20, 420, 680, '#1D4ED8', '#EFF6FF'),
    
    // Shared Standard Pool Sub-box
    cell('pool_box', '', 'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#1D4ED8;strokeWidth=1.5;', 368, 85, 384, 255),
    cell('pool_title', '<b>Shared Standard Multi-Tenant Pool</b>', 'text;html=1;whiteSpace=wrap;align=left;verticalAlign=middle;fontColor=#1D4ED8;fontSize=13;', 388, 95, 340, 25),
    card('cp_gke_pool', 'GKE Autopilot Shared Cluster', 'Namespace per tenant with ResourceQuotas & NetworkPolicies', ICON.gke, 388, 130, 344, 90, '#1D4ED8'),
    card('cp_pool_noisy', 'Noisy-Neighbor Throttler', 'CPU/Memory burst mitigation & queue prioritization', ICON.armor, 388, 235, 344, 85, '#16A34A'),

    // Dedicated VIP Silo Sub-box
    cell('silo_box', '', 'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9333EA;strokeWidth=1.5;', 368, 360, 384, 240),
    cell('silo_title', '<b>Dedicated Enterprise VIP Silo Tier</b>', 'text;html=1;whiteSpace=wrap;align=left;verticalAlign=middle;fontColor=#9333EA;fontSize=13;', 388, 370, 340, 25),
    card('cp_gke_silo', 'Isolated GKE Autopilot Cluster', 'Dedicated single-tenant compute enclave for VIP customers', ICON.gke, 388, 405, 344, 90, '#9333EA'),
    card('cp_silo_sla', 'Dedicated Ingress VIP & SLA', '100% compute isolation with guaranteed 99.99% availability', ICON.app, 388, 510, 344, 75, '#9333EA'),

    // Lane 3: Partitioned Data & Storage Layer
    lane('data', 3, 'PARTITIONED DATA & ENCRYPTION TIER', 'PostgreSQL Row-Level Security (RLS) & Per-Tenant CMEK keys', 790, 20, 380, 680, '#16A34A', '#F0FDF4'),
    card('dt_rls', 'Shared Cloud SQL (Postgres RLS)', 'Row-Level Security: WHERE tenant_id = current_setting()', ICON.db, 808, 85, 344, 105, '#1D4ED8'),
    card('dt_silo_db', 'Dedicated Silo Cloud SQL Instance', 'Physically isolated database for Enterprise VIP tenant', ICON.db, 808, 215, 344, 105, '#9333EA'),
    card('dt_cmek_pool', 'Cloud KMS (Shared CMEK Key)', 'Tenant-shared envelope encryption key', ICON.key, 808, 345, 344, 85, '#16A34A'),
    card('dt_cmek_silo', 'Cloud KMS (Per-Tenant CMEK)', 'Customer-controlled encryption keys with instant crypto-shred', ICON.key, 808, 455, 344, 95, '#16A34A'),

    // Lane 4: SaaS Operations & Tenant Metering
    lane('ops', 4, 'TENANT METERING & BILLING PLANE', 'Cost allocation per tenant, usage traces & automated invoicing', 1190, 20, 370, 680, '#EA580C', '#FFFBEB'),
    card('op_meter', 'BigQuery Tenant Cost Allocation', 'Granular compute, API & storage cost attribution per tenant', ICON.bq, 1208, 85, 334, 105, '#1D4ED8'),
    card('op_log', 'Tenant-Aware Cloud Logging', 'Correlated trace logs filtered by X-Tenant-ID claim', ICON.log, 1208, 215, 334, 105, '#16A34A'),
    card('op_bill', 'Cloud Billing & Stripe Sync', 'Automated monthly usage billing & tier overage settlement', ICON.billing, 1208, 345, 334, 105, '#EA580C'),

    // Governance Band
    lane('gov', 0, 'TENANT CONTEXT PROPAGATION, ACCESS CONTROL & AUDIT PLANE', 'Strict data residency verification, IAM isolation & tenant deletion lifecycle', 20, 720, 1540, 190, '#16A34A', '#F0FDF4'),
    card('gov_context', 'Tenant Context Propagator (mTLS)', 'Propagate tenant header across all internal service calls', ICON.armor, 45, 785, 470, 95, '#16A34A'),
    card('gov_iam', 'Tenant-Scoped IAM Service Accounts', 'Least-privilege bindings preventing cross-tenant access', ICON.auth, 545, 785, 470, 95, '#16A34A'),
    card('gov_shred', 'Automated Crypto-Shredding', 'Instant tenant data disposal upon offboarding by revoking CMEK key', ICON.key, 1045, 785, 490, 95, '#DC2626'),

    // Edges
    edge('e_dom_idp', 'in_domains', 'in_idp', 'Resolve Tenant', 'request', 0.5, 1, 0.5, 0),
    edge('e_idp_arm', 'in_idp', 'in_armor', 'JWT Token', 'request', 0.5, 1, 0.5, 0),
    edge('e_arm_env', 'in_armor', 'in_envoy', 'Sanitized Requests', 'request', 0.5, 1, 0.5, 0),
    edge('e_env_pool', 'in_envoy', 'cp_gke_pool', 'Route Standard Tenant', 'request', 1, 0.25, 0, 0.5),
    edge('e_env_silo', 'in_envoy', 'cp_gke_silo', 'Route VIP Tenant', 'request', 1, 0.75, 0, 0.5),
    edge('e_pool_rls', 'cp_gke_pool', 'dt_rls', 'RLS SQL Query', 'request'),
    edge('e_silo_db', 'cp_gke_silo', 'dt_silo_db', 'Isolated SQL Query', 'request'),
    edge('e_rls_cmek', 'dt_rls', 'dt_cmek_pool', 'Decrypt with Key', 'request', 0.5, 1, 0.5, 0),
    edge('e_db_cmek', 'dt_silo_db', 'dt_cmek_silo', 'Decrypt with Key', 'request', 0.5, 1, 0.5, 0),
    edge('e_pool_meter', 'cp_gke_pool', 'op_meter', 'Emit Usage Telemetry', 'response', 1, 0.5, 0, 0.5, [[765, 175], [1180, 137]]),
    edge('e_meter_bill', 'op_meter', 'op_bill', 'Usage Invoicing', 'response', 0.5, 1, 0.5, 0),
  ];

  return `<mxfile host="embed.diagrams.net" modified="2026-08-20T22:00:00.000Z" agent="PromptCanvas" version="24.0.0" type="embed">
  <diagram id="catalog_saas_multi_tenant" name="SaaS Multi-Tenant Application Architecture">
    <mxGraphModel dx="1600" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="950" background="#FFFFFF">
      <root>
        ${cells.join('\n        ')}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}

export const MASTER_SAAS_MULTI_TENANT_XML = buildMasterSaasMultiTenantXml();
