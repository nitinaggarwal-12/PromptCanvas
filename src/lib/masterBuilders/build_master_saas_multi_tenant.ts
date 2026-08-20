/**
 * 🎨 Blueprint #59 (NEW-APP-09): SaaS Multi-Tenant Application Architecture
 * Executive Light Theme Master Blueprint
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
  auth: svg('<circle cx="24" cy="15" r="8" fill="#059669"/><path d="M9 41c2-11 8-16 15-16s13 5 15 16" fill="#059669"/><rect x="28" y="28" width="12" height="10" rx="2" fill="#fff" stroke="#059669" stroke-width="2"/>'),
  armor: svg('<path d="M24 4 40 10v12c0 11-6.5 18-16 22C14.5 40 8 33 8 22V10z" fill="#DC2626"/><path d="m16 24 5 5 11-13" fill="none" stroke="#fff" stroke-width="3"/>'),
  envoy: svg('<rect x="6" y="6" width="36" height="36" rx="8" fill="#7C3AED"/><path d="m24 12 10 20-4 2-6-12-6 12-4-2z" fill="#fff"/>'),
  gke: svg('<rect x="6" y="6" width="36" height="36" rx="8" fill="#1D4ED8"/><path d="m24 12 11 6v12l-11 6-11-6V18z" fill="none" stroke="#fff" stroke-width="2.5"/><circle cx="24" cy="24" r="3" fill="#fff"/>'),
  db: svg('<ellipse cx="24" cy="11" rx="14" ry="6" fill="#7E57C2"/><path d="M10 11v24c0 3.3 6.3 6 14 6s14-2.7 14-6V11" fill="#B8A6E6"/><ellipse cx="24" cy="35" rx="14" ry="6" fill="#7E57C2"/>'),
  key: svg('<circle cx="17" cy="21" r="9" fill="none" stroke="#D97706" stroke-width="4"/><path d="m24 25 15 15m-7-8 5-5m-10 0 5-5" stroke="#D97706" stroke-width="3"/>'),
  bq: svg('<ellipse cx="24" cy="12" rx="14" ry="6" fill="#1D4ED8"/><path d="M10 12v18c0 3.3 6.3 6 14 6s14-2.7 14-6V12" fill="#93C5FD"/><ellipse cx="24" cy="30" rx="14" ry="6" fill="#1D4ED8"/>'),
  log: svg('<rect x="10" y="6" width="28" height="36" rx="3" fill="#059669"/><path d="M16 15h16M16 23h16M16 31h10" stroke="#fff" stroke-width="2.5"/>'),
  billing: svg('<rect x="8" y="10" width="32" height="24" rx="4" fill="#2563EB"/><path d="M14 20h20M14 26h12" stroke="#fff" stroke-width="2"/>')
};

const cell = (id: string, value: string, style: string, x: number, y: number, width: number, height: number): string =>
  `<mxCell id="${id}" value="${esc(value)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${width}" height="${height}" as="geometry"/></mxCell>`;

const lane = (id: string, number: number, title: string, subtitle: string, x: number, y: number, width: number, height: number, accent: string, fill: string): string =>
  [
    cell(id, '', `rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=#CBD5E1;strokeWidth=1.5;shadow=1;`, x, y, width, height),
    cell(`${id}_number`, String(number), `ellipse;whiteSpace=wrap;html=1;fillColor=${accent};strokeColor=${accent};fontColor=#FFFFFF;fontStyle=1;fontSize=13;align=center;verticalAlign=middle;`, x + 12, y + 12, 32, 32),
    cell(`${id}_title`, `<b>${title}</b><br><span style="font-size:10px;color:#64748B">${subtitle}</span>`, `text;html=1;whiteSpace=wrap;align=left;verticalAlign=middle;fontColor=${accent};fontSize=14;fontStyle=1;`, x + 54, y + 7, width - 64, 44),
  ].join('\n');

const card = (id: string, title: string, subtitle: string, icon: string, x: number, y: number, width: number, height: number, accent: string, fill = '#FFFFFF'): string => {
  const html = `<table style="width:100%;height:100%;border-collapse:collapse"><tr><td style="width:42px;text-align:center;vertical-align:middle"><img src="${icon}" width="30" height="30"/></td><td style="text-align:left;vertical-align:middle"><b style="font-size:11.5px;color:#0F172A">${title}</b><br/><span style="font-size:9.5px;color:#475569">${subtitle}</span></td></tr></table>`;
  return cell(id, html, `rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${accent};strokeWidth=1.3;align=center;verticalAlign=middle;spacing=4;`, x, y, width, height);
};

const edge = (id: string, source: string, target: string, label: string, kind: 'request' | 'response' | 'governance', exitX = 1, exitY = 0.5, entryX = 0, entryY = 0.5, points: Array<[number, number]> = []): string => {
  const cfg = kind === 'request'
    ? { stroke: '#2563EB', dashed: 0, pattern: '6 4', arrow: 'block', width: 2 }
    : kind === 'response'
      ? { stroke: '#64748B', dashed: 1, pattern: '6 4', arrow: 'block', width: 1.7 }
      : { stroke: '#059669', dashed: 1, pattern: '2 4', arrow: 'open', width: 1.6 };
  const pts = points.length ? `<Array as="points">${points.map(([x, y]) => `<mxPoint x="${x}" y="${y}"/>`).join('')}</Array>` : '';
  return `<mxCell id="${id}" value="${esc(label)}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${cfg.stroke};strokeWidth=${cfg.width};dashed=${cfg.dashed};dashPattern=${cfg.pattern};endArrow=${cfg.arrow};endFill=${cfg.arrow === 'block' ? 1 : 0};fontColor=#0F172A;fontSize=10;fontStyle=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;exitX=${exitX};exitY=${exitY};exitDx=0;exitDy=0;entryX=${entryX};entryY=${entryY};entryDx=0;entryDy=0;" edge="1" parent="1" source="${source}" target="${target}"><mxGeometry relative="1" as="geometry">${pts}</mxGeometry></mxCell>`;
};

export function buildMasterSaasMultiTenantXml(): string {
  const cells: string[] = [
    '<mxCell id="0"/>',
    '<mxCell id="1" parent="0"/>',

    // Lane 1: Tenant Ingress & Identity Routing
    lane('ingress', 1, 'TENANT INGRESS & IDENTITY ROUTING TIER', 'Subdomain mapping (tenant.app.com), custom SSO & TLS routing', 20, 20, 1540, 140, '#1E3A8A', '#FFFFFF'),
    card('in_subdomain', 'Tenant Subdomain Ingress', 'Dynamic wildcard DNS (*.saas-platform.com) & custom SSL', ICON.app, 45, 75, 340, 70, '#2563EB'),
    card('in_idp', 'Identity Platform Multi-Tenancy', 'Per-tenant SAML/OIDC SSO configurations & tenantId claims', ICON.auth, 415, 75, 360, 70, '#059669'),
    card('in_armor', 'Cloud Armor Rate Limiting', 'Per-tenant token bucket rate limits to prevent noisy neighbors', ICON.armor, 805, 75, 350, 70, '#DC2626'),
    card('in_gateway', 'Envoy Tenant Router Gateway', 'Injects X-Tenant-Context header into downstream requests', ICON.envoy, 1185, 75, 350, 70, '#7C3AED'),

    // Lane 2: Hybrid Compute Layer (Pool vs Silo Models)
    lane('compute', 2, 'HYBRID COMPUTE LAYER (SHARED POOL VS DEDICATED SILO)', 'Cost-effective pooled standard tier & dedicated GKE pods for enterprise', 20, 180, 1540, 150, '#1D4ED8', '#FFFFFF'),
    card('cmp_pool', 'Pooled GKE Autopilot Pods', 'Shared multi-tenant microservices with Kubernetes namespaces', ICON.gke, 45, 235, 450, 75, '#1D4ED8'),
    card('cmp_ctx', 'Tenant Context Propagator', 'Propagates tenantId via gRPC metadata and thread locals', ICON.envoy, 525, 235, 450, 75, '#7C3AED'),
    card('cmp_silo', 'Dedicated Silo VIP Pods', 'Dedicated single-tenant node pool with physical node affinity', ICON.gke, 1005, 235, 530, 75, '#1D4ED8'),

    // Lane 3: Partitioned Data & Storage Layer
    lane('data', 3, 'PARTITIONED DATA & STORAGE TIER (RLS + CMEK)', 'Logical Row-Level Security isolation vs Dedicated schema / database instances', 20, 350, 1540, 150, '#047857', '#FFFFFF'),
    card('dat_rls', 'Cloud SQL PostgreSQL with RLS', 'Shared schema enforcing `tenant_id = current_setting(...)` RLS', ICON.db, 45, 405, 450, 75, '#7C3AED'),
    card('dat_kmek', 'Per-Tenant Cloud KMS (CMEK)', 'Independent cryptographic key rotation & revocation per customer', ICON.key, 525, 405, 450, 75, '#D97706'),
    card('dat_silo', 'Dedicated Silo Database Instances', 'Physically isolated Cloud SQL instance for enterprise tiers', ICON.db, 1005, 405, 530, 75, '#7C3AED'),

    // Lane 4: SaaS Operations & Metering Plane
    lane('metering', 4, 'SAAS METERING, BILLING & COST ALLOCATION PLANE', 'Real-time resource attribution and usage-based billing aggregation', 20, 520, 1540, 150, '#D97706', '#FFFFFF'),
    card('met_bq', 'BigQuery Cost Allocation Mart', 'Aggregated tenant compute/storage/API calls for margin analysis', ICON.bq, 45, 575, 450, 75, '#1D4ED8'),
    card('met_log', 'Cloud Logging Tenant Sinks', 'Individual per-tenant audit logs exported to dedicated storage', ICON.log, 525, 575, 450, 75, '#059669'),
    card('met_stripe', 'Cloud Billing & Stripe Invoicing', 'Automated tiered billing based on real-time consumption metrics', ICON.billing, 1005, 575, 530, 75, '#2563EB'),

    // Lane 5: Tenant Security & Isolation Governance
    lane('security', 5, 'TENANT ISOLATION GOVERNANCE & AUDITING', 'Continuous automated verification of zero cross-tenant data leaks', 20, 690, 1540, 140, '#047857', '#FFFFFF'),
    card('sec_canary', 'Synthetic Tenant Isolation Probes', 'Continuous automated canary testing verifying RLS boundary', ICON.armor, 45, 745, 460, 70, '#059669'),
    card('sec_iam', 'Per-Tenant Service Account Scopes', 'Short-lived credentials restricted to tenant-specific storage paths', ICON.auth, 545, 745, 450, 70, '#059669'),
    card('sec_scc', 'Security Command Center Audits', 'Compliance reporting for SOC 2 Type II and HIPAA multi-tenancy', ICON.armor, 1035, 745, 500, 70, '#059669'),

    // Edges
    edge('e_sub_idp', 'in_subdomain', 'in_idp', 'Resolve Tenant SSO', 'request'),
    edge('e_idp_arm', 'in_idp', 'in_armor', 'Authenticated Claims', 'request'),
    edge('e_arm_gtw', 'in_armor', 'in_gateway', 'Clean Requests', 'request'),
    edge('e_gtw_pool', 'in_gateway', 'cmp_pool', 'Standard Tier (Pooled)', 'request', 0.25, 1, 0.5, 0),
    edge('e_gtw_silo', 'in_gateway', 'cmp_silo', 'Enterprise Tier (Silo)', 'request', 0.75, 1, 0.5, 0),
    edge('e_pool_rls', 'cmp_pool', 'dat_rls', 'RLS Filtered Queries', 'request'),
    edge('e_silo_db', 'cmp_silo', 'dat_silo', 'Direct Dedicated SQL', 'request'),
    edge('e_rls_kmek', 'dat_rls', 'dat_kmek', 'CMEK Decrypt', 'governance'),
    edge('e_pool_bq', 'cmp_pool', 'met_bq', 'Record API Usage', 'governance'),
    edge('e_bq_stripe', 'met_bq', 'met_stripe', 'Monthly Invoice Run', 'request'),
    edge('e_canary_rls', 'sec_canary', 'dat_rls', 'Verify Zero Cross-Tenant Leakage', 'governance', 0.5, 0, 0.5, 1),
  ];

  return `<mxfile host="app.diagrams.net" modified="2026-08-21T00:35:00.000Z" agent="PromptCanvas Blueprint 59" version="24.7.17" type="device">
  <diagram id="catalog_saas_multi_tenant" name="SaaS Multi-Tenant Application Architecture">
    <mxGraphModel dx="1600" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="950" background="#F8FAFC">
      <root>
        ${cells.join('\n        ')}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}

export const MASTER_SAAS_MULTI_TENANT_XML = buildMasterSaasMultiTenantXml();
