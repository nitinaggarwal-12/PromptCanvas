/**
 * 🎨 Blueprint #51 (NEW-APP-01): Enterprise API Management & Integration Architecture
 * High-Craft Master Blueprint (Benchmark Pattern following Blueprint 50)
 * 
 * Featuring:
 * - Multi-Channel Ingress & Edge Defense (Cloud Armor, Global HTTPS LB)
 * - Apigee X Enterprise API Mediation Gateway (OAuth2, Rate Limiting, Mediation)
 * - Private VPC Microservices Tier (GKE Enterprise, Cloud Run, Internal LB)
 * - Enterprise Persistence Tier (Cloud Spanner, Memorystore Redis, Cloud SQL)
 * - Cross-Cutting Security, Governance & SRE Observability Plane
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
  apigee: svg('<rect x="6" y="6" width="36" height="36" rx="8" fill="#0284C7"/><path d="m14 34 10-20 10 20-5-1.5-5-10-5 10z" fill="#fff"/>'),
  armor: svg('<path d="M24 4 40 10v12c0 11-6.5 18-16 22C14.5 40 8 33 8 22V10z" fill="#DC2626"/><path d="m16 24 5 5 11-13" fill="none" stroke="#fff" stroke-width="3"/>'),
  gclb: svg('<rect x="8" y="10" width="32" height="12" rx="3" fill="#0284C7"/><circle cx="14" cy="36" r="5" fill="#0284C7"/><circle cx="24" cy="36" r="5" fill="#0284C7"/><circle cx="34" cy="36" r="5" fill="#0284C7"/><path d="M14 22v9m10-9v9m10-9v9" stroke="#0284C7" stroke-width="2.5"/>'),
  gke: svg('<rect x="6" y="6" width="36" height="36" rx="8" fill="#1D4ED8"/><path d="m24 12 11 6v12l-11 6-11-6V18z" fill="none" stroke="#fff" stroke-width="2.5"/><circle cx="24" cy="24" r="3" fill="#fff"/>'),
  run: svg('<path d="M9 10 31 24 9 38l9-14z" fill="#4285F4"/><path d="M26 10 39 24 26 38l6-14z" fill="#7456C2"/>'),
  spanner: svg('<path d="M24 6 40 15v18L24 42 8 33V15z" fill="#1D4ED8"/><path d="M16 20h16v8H16z" fill="#fff"/>'),
  redis: svg('<ellipse cx="24" cy="12" rx="14" ry="6" fill="#DC2626"/><path d="M10 12v18c0 3.3 6.3 6 14 6s14-2.7 14-6V12" fill="#F87171"/><ellipse cx="24" cy="30" rx="14" ry="6" fill="#DC2626"/>'),
  auth: svg('<circle cx="24" cy="15" r="8" fill="#16A34A"/><path d="M9 41c2-11 8-16 15-16s13 5 15 16" fill="#16A34A"/><rect x="28" y="28" width="12" height="10" rx="2" fill="#fff" stroke="#16A34A" stroke-width="2"/>'),
  shield: svg('<path d="M24 4 40 10v12c0 11-6.5 18-16 22C14.5 40 8 33 8 22V10z" fill="#16A34A"/><path d="m16 24 5 5 11-13" fill="none" stroke="#fff" stroke-width="3"/>'),
  key: svg('<circle cx="17" cy="21" r="9" fill="none" stroke="#16A34A" stroke-width="5"/><path d="m24 25 15 15m-7-8 5-5m-10 0 5-5" stroke="#16A34A" stroke-width="4"/>'),
  log: svg('<rect x="10" y="6" width="28" height="36" rx="3" fill="#16A34A"/><path d="M16 15h16M16 23h16M16 31h10" stroke="#fff" stroke-width="2.5"/>'),
  monitor: svg('<rect x="6" y="8" width="36" height="26" rx="3" fill="#16A34A"/><path d="m11 28 7-7 5 4 8-11 6 6" fill="none" stroke="#fff" stroke-width="2.5"/><path d="M18 40h12M24 34v6" stroke="#16A34A" stroke-width="3"/>'),
  app: svg('<rect x="7" y="8" width="34" height="32" rx="4" fill="#334155"/><path d="M13 15h22M13 21h22M13 27h15" stroke="#fff" stroke-width="2"/><circle cx="34" cy="32" r="4" fill="#60A5FA"/>'),
  portal: svg('<rect x="8" y="8" width="32" height="32" rx="6" fill="#9333EA"/><path d="M14 16h20M14 22h20M14 28h12" stroke="#fff" stroke-width="2.5"/>'),
  cloud: svg('<path d="M13 36a10 10 0 0 1 2-19 12 12 0 0 1 22 6 8 8 0 0 1-2 15H13z" fill="#4285F4"/><path d="M15 17a12 12 0 0 1 18-4" fill="none" stroke="#EA4335" stroke-width="5"/><path d="M10 28a10 10 0 0 1 5-10" fill="none" stroke="#FBBC05" stroke-width="5"/><path d="M15 38h20" stroke="#34A853" stroke-width="5"/>')
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

export function buildMasterEnterpriseApiManagementXml(): string {
  const cells: string[] = [
    '<mxCell id="0"/>',
    '<mxCell id="1" parent="0"/>',

    // Lanes
    lane('ingress', 1, 'MULTI-CHANNEL INGRESS', 'Client applications, mobile, B2B partners, IoT', 20, 20, 240, 680, '#0284C7', '#F0F9FF'),
    lane('edge', 2, 'EDGE SECURITY & LB', 'Anycast routing, DDoS mitigation, SSL termination', 280, 20, 220, 680, '#DC2626', '#FEF2F2'),
    lane('gateway', 3, 'APIGEE X ENTERPRISE GATEWAY', 'Centralized mediation, security policies & analytics', 520, 20, 480, 680, '#0284C7', '#F8FAFC'),
    lane('backend', 4, 'PRIVATE VPC MICROSERVICES', 'GKE Enterprise, Cloud Run & Private Persistence', 1020, 20, 540, 680, '#1D4ED8', '#EFF6FF'),

    // Ingress Cards
    card('in_mobile', 'Mobile Apps (iOS/Android)', 'OAuth2 PKCE flow, certificate pinning', ICON.app, 38, 85, 204, 76, '#0284C7'),
    card('in_web', 'Web SPAs & Portals', 'React / Angular, CORS & session cookie tokens', ICON.app, 38, 175, 204, 76, '#0284C7'),
    card('in_partner', 'Partner B2B (ERP/CRM)', 'Mutual mTLS, dedicated API keys, JSON/XML payloads', ICON.portal, 38, 265, 204, 76, '#0284C7'),
    card('in_iot', 'IoT Gateways & Edge', 'gRPC telemetry streams, high-concurrency ingestion', ICON.cloud, 38, 355, 204, 76, '#0284C7'),
    card('in_portal', 'Apigee Developer Portal', 'Interactive OpenAPI catalog, API key self-service', ICON.portal, 38, 445, 204, 76, '#9333EA'),
    card('in_monetize', 'API Monetization & Billing', 'Usage tier metering, rate plans, developer billing', ICON.portal, 38, 535, 204, 76, '#9333EA'),

    // Edge Cards
    card('edge_gclb', 'Global HTTPS Load Balancer', 'Anycast IP, multi-region routing & SSL offload', ICON.gclb, 298, 120, 184, 110, '#0284C7'),
    card('edge_armor', 'Cloud Armor WAF', 'L7 DDoS defense, OWASP rules, geo-fencing & bot control', ICON.armor, 298, 270, 184, 130, '#DC2626'),
    card('edge_dns', 'Cloud DNS Security', 'DNSSEC validation, geo-routing, anycast resolution', ICON.cloud, 298, 440, 184, 90, '#0284C7'),

    // Apigee Gateway Cards
    card('gw_runtime', 'Apigee X Runtime Engine', 'Google-managed tenant VPC, auto-scaling API proxy pods', ICON.apigee, 540, 80, 440, 75, '#0284C7'),
    card('gw_oauth', 'OAuth2 / OIDC Token Mediation', 'JWT validation, token minting & scopes enforcement', ICON.auth, 540, 170, 210, 80, '#16A34A'),
    card('gw_rbac', 'Access Control & RBAC', 'Fine-grained attribute-based claims authorization', ICON.auth, 770, 170, 210, 80, '#16A34A'),
    card('gw_rate', 'Dynamic Rate Limiting & Quotas', 'Spike arrest, concurrency caps & burst mitigation', ICON.shield, 540, 265, 210, 80, '#16A34A'),
    card('gw_traffic', 'Traffic Management & Canary', 'Blue/green routing, circuit breaking, failover', ICON.shield, 770, 265, 210, 80, '#16A34A'),
    card('gw_transform', 'Payload Transformation', 'XML-to-JSON, SOAP-to-REST, payload schema validation', ICON.apigee, 540, 360, 210, 80, '#0284C7'),
    card('gw_cache', 'Edge Response Caching', 'Cloud Memorystore cache, sub-millisecond lookups', ICON.redis, 770, 360, 210, 80, '#0284C7'),
    card('gw_analytics', 'Apigee Advanced Analytics', 'p99 latency tracking, error rate heatmaps & audits', ICON.monitor, 540, 455, 440, 75, '#0284C7'),
    card('gw_psc', 'Private Service Connect (PSC)', 'Northbound & Southbound non-routable private transit', ICON.cloud, 540, 545, 440, 75, '#0284C7'),

    // Backend VPC Cards
    card('be_ilb', 'Internal Application Load Balancer', 'Private Service Connect target endpoint, mTLS 1.3 transit', ICON.gclb, 1040, 80, 500, 70, '#1D4ED8'),
    card('be_order', 'Order Processing Microservice', 'GKE Enterprise pods, Spring Boot, event-driven architecture', ICON.gke, 1040, 165, 240, 80, '#1D4ED8'),
    card('be_payment', 'Payment Gateway Service', 'GKE Enterprise pods, Golang, PCI-DSS compliant enclave', ICON.gke, 1300, 165, 240, 80, '#1D4ED8'),
    card('be_catalog', 'Product Catalog & Search', 'Cloud Run serverless container, Direct VPC Egress', ICON.run, 1040, 260, 240, 80, '#1D4ED8'),
    card('be_notif', 'Customer Notification Service', 'Cloud Run serverless container, Pub/Sub triggered', ICON.run, 1300, 260, 240, 80, '#1D4ED8'),
    card('be_spanner', 'Cloud Spanner (nam3 Multi-Region)', 'Synchronous transactional persistence, 99.999% SLA TrueTime', ICON.spanner, 1040, 355, 500, 80, '#1D4ED8'),
    card('be_redis', 'Memorystore for Redis (HA)', 'Sub-millisecond session state and user token cache', ICON.redis, 1040, 450, 240, 80, '#DC2626'),
    card('be_db', 'Cloud SQL for PostgreSQL', 'Customer profile & relational transactional storage', ICON.spanner, 1300, 450, 240, 80, '#1D4ED8'),

    // Governance & Security Band
    lane('gov', 0, 'CROSS-CUTTING SECURITY, GOVERNANCE & SRE OBSERVABILITY PLANE', 'Universal controls applied across ingress, gateway, microservices and persistence', 20, 720, 1540, 190, '#16A34A', '#F0FDF4'),
    card('gov_iam', 'Cloud IAM & Workload Identity', 'Zero static keys, STS RFC 8693 token exchange', ICON.auth, 45, 785, 220, 86, '#16A34A'),
    card('gov_kms', 'Cloud KMS & Secret Manager', 'Customer-Managed Encryption Keys (CMEK) envelope encryption', ICON.key, 285, 785, 230, 86, '#16A34A'),
    card('gov_logs', 'Cloud Logging & OpenTelemetry', 'Distributed trace context propagation & audit logging', ICON.log, 535, 785, 230, 86, '#16A34A'),
    card('gov_mon', 'Cloud Monitoring & SRE Alerts', 'SLO budgets, error spikes & synthetic probe alerts', ICON.monitor, 785, 785, 230, 86, '#16A34A'),
    card('gov_scc', 'Security Command Center (SCC)', 'Real-time threat detection & container vulnerability scans', ICON.shield, 1035, 785, 240, 86, '#16A34A'),
    card('gov_mesh', 'Cloud Service Mesh mTLS', 'Mutual TLS 1.3 encryption & SPIFFE workload identities', ICON.shield, 1295, 785, 245, 86, '#16A34A'),

    // Edges
    edge('e_in_lb', 'in_mobile', 'edge_gclb', 'HTTPS Ingress', 'request', 1, 0.5, 0, 0.5),
    edge('e_web_lb', 'in_web', 'edge_gclb', 'HTTPS / WSS', 'request', 1, 0.5, 0, 0.5),
    edge('e_partner_lb', 'in_partner', 'edge_armor', 'B2B mTLS', 'request', 1, 0.5, 0, 0.5),
    edge('e_lb_armor', 'edge_gclb', 'edge_armor', 'WAF Filter', 'request', 0.5, 1, 0.5, 0),
    edge('e_armor_gw', 'edge_armor', 'gw_runtime', 'Clean Traffic', 'request', 1, 0.5, 0, 0.5),
    edge('e_gw_oauth', 'gw_runtime', 'gw_oauth', 'Token Validate', 'request', 0.25, 1, 0.5, 0),
    edge('e_gw_rate', 'gw_runtime', 'gw_rate', 'Enforce Quota', 'request', 0.75, 1, 0.5, 0),
    edge('e_gw_psc', 'gw_analytics', 'gw_psc', 'Private Transit', 'request', 0.5, 1, 0.5, 0),
    edge('e_psc_ilb', 'gw_psc', 'be_ilb', 'PSC Forwarding', 'request', 1, 0.5, 0, 0.5),
    edge('e_ilb_order', 'be_ilb', 'be_order', 'gRPC / HTTP', 'request', 0.25, 1, 0.5, 0),
    edge('e_ilb_pay', 'be_ilb', 'be_payment', 'PCI Enclave', 'request', 0.75, 1, 0.5, 0),
    edge('e_order_span', 'be_order', 'be_spanner', 'ACID Writes', 'request', 0.5, 1, 0.25, 0),
    edge('e_pay_span', 'be_payment', 'be_spanner', 'TrueTime Sync', 'request', 0.5, 1, 0.75, 0),
    edge('e_cat_redis', 'be_catalog', 'be_redis', 'Cache Lookup', 'request', 0.5, 1, 0.5, 0),
    edge('e_gov_gw', 'gov_iam', 'gw_runtime', 'IAM Auth Policies', 'governance', 0.5, 0, 0.25, 1, [[155, 700], [650, 700]]),
    edge('e_gov_scc', 'gov_scc', 'be_order', 'Threat Monitoring', 'governance', 0.5, 0, 0.5, 1, [[1155, 700], [1160, 700]]),
  ];

  return `<mxfile host="embed.diagrams.net" modified="2026-08-20T22:00:00.000Z" agent="PromptCanvas" version="24.0.0" type="embed">
  <diagram id="catalog_enterprise_api_management" name="Enterprise API Management &amp; Integration Architecture">
    <mxGraphModel dx="1600" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="950" background="#FFFFFF">
      <root>
        ${cells.join('\n        ')}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}

export const MASTER_ENTERPRISE_API_MANAGEMENT_XML = buildMasterEnterpriseApiManagementXml();
