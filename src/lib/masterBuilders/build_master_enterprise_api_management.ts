/**
 * 🎨 Blueprint #51 (NEW-APP-01): Google Cloud Enterprise API Management and Integration Architecture
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
  mobile: svg('<rect x="12" y="6" width="24" height="36" rx="4" fill="#0284C7"/><rect x="15" y="10" width="18" height="26" rx="2" fill="#F8FAFC"/><circle cx="24" cy="39" r="1.5" fill="#0284C7"/>'),
  web: svg('<rect x="6" y="8" width="36" height="32" rx="4" fill="#0284C7"/><path d="M6 16h36" stroke="#F8FAFC" stroke-width="2"/><circle cx="11" cy="12" r="1.5" fill="#fff"/><circle cx="16" cy="12" r="1.5" fill="#fff"/><circle cx="21" cy="12" r="1.5" fill="#fff"/>'),
  partner: svg('<circle cx="18" cy="18" r="6" fill="#7C3AED"/><circle cx="30" cy="18" r="6" fill="#7C3AED"/><path d="M8 38c0-5.5 4.5-10 10-10h12c5.5 0 10 4.5 10 10" fill="#7C3AED"/>'),
  iot: svg('<rect x="12" y="12" width="24" height="24" rx="4" fill="#059669"/><circle cx="24" cy="24" r="3" fill="#fff"/><path d="M24 6v6M24 36v6M6 24h6M36 24h6" stroke="#059669" stroke-width="3"/>'),
  gclb: svg('<rect x="8" y="10" width="32" height="12" rx="3" fill="#2563EB"/><circle cx="14" cy="36" r="5" fill="#2563EB"/><circle cx="24" cy="36" r="5" fill="#2563EB"/><circle cx="34" cy="36" r="5" fill="#2563EB"/><path d="M14 22v9m10-9v9m10-9v9" stroke="#2563EB" stroke-width="2.5"/>'),
  armor: svg('<path d="M24 4 40 10v12c0 11-6.5 18-16 22C14.5 40 8 33 8 22V10z" fill="#2563EB"/><path d="m18 23 4 4 8-9" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>'),
  apigee: svg('<path d="M14 8 24 24 14 40h6l7-11 7 11h6L30 24 40 8h-6l-7 11-7-11z" fill="#2563EB"/>'),
  gke: svg('<rect x="6" y="6" width="36" height="36" rx="8" fill="#1D4ED8"/><path d="m24 12 11 6v12l-11 6-11-6V18z" fill="none" stroke="#93C5FD" stroke-width="2.5"/><circle cx="24" cy="24" r="3" fill="#fff"/>'),
  run: svg('<path d="M9 10 31 24 9 38l9-14z" fill="#2563EB"/><path d="M26 10 39 24 26 38l6-14z" fill="#1D4ED8"/>'),
  analytics: svg('<rect x="6" y="8" width="36" height="32" rx="4" fill="#FFFFFF" stroke="#7C3AED" stroke-width="2"/><path d="m12 30 7-8 6 5 11-13" fill="none" stroke="#7C3AED" stroke-width="3" stroke-linecap="round"/><circle cx="36" cy="14" r="2.5" fill="#7C3AED"/>'),
  kms: svg('<path d="M24 6 40 15v18L24 42 8 33V15z" fill="#059669"/><circle cx="24" cy="21" r="5" fill="#fff"/><path d="M24 26v8m-3-3h6" stroke="#fff" stroke-width="2.5"/>'),
  iam: svg('<circle cx="24" cy="15" r="8" fill="#2563EB"/><path d="M9 41c2-11 8-16 15-16s13 5 15 16" fill="#2563EB"/>'),
  ops: svg('<rect x="6" y="8" width="36" height="26" rx="3" fill="#059669"/><path d="M12 16h24M12 22h16M12 28h20" stroke="#fff" stroke-width="2.5"/>'),
  scc: svg('<path d="M24 4 40 10v12c0 11-6.5 18-16 22C14.5 40 8 33 8 22V10z" fill="#059669"/><path d="M24 28v5" stroke="#fff" stroke-width="3"/>'),
  psc: svg('<circle cx="16" cy="24" r="7" fill="#2563EB"/><circle cx="32" cy="24" r="7" fill="#2563EB"/><path d="M16 24h16" stroke="#2563EB" stroke-width="3"/>'),
  shield: svg('<path d="M24 4 40 10v12c0 11-6.5 18-16 22C14.5 40 8 33 8 22V10z" fill="#059669"/><path d="m18 23 4 4 8-9" fill="none" stroke="#fff" stroke-width="2.5"/>'),
};

const cell = (id: string, value: string, style: string, x: number, y: number, width: number, height: number): string =>
  `<mxCell id="${id}" value="${esc(value)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${width}" height="${height}" as="geometry"/></mxCell>`;

const edge = (
  id: string,
  source: string,
  target: string,
  label: string,
  kind: 'request' | 'response' | 'governance',
  exitX = 1,
  exitY = 0.5,
  entryX = 0,
  entryY = 0.5,
  points: Array<[number, number]> = [],
): string => {
  const cfg = kind === 'request'
    ? { stroke: '#2563EB', dashed: 0, pattern: '6 4', arrow: 'block', width: 2 }
    : kind === 'response'
      ? { stroke: '#64748B', dashed: 1, pattern: '6 4', arrow: 'block', width: 1.6 }
      : { stroke: '#059669', dashed: 1, pattern: '3 3', arrow: 'open', width: 1.6 };
  const pts = points.length ? `<Array as="points">${points.map(([x, y]) => `<mxPoint x="${x}" y="${y}"/>`).join('')}</Array>` : '';
  return `<mxCell id="${id}" value="${esc(label)}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${cfg.stroke};strokeWidth=${cfg.width};dashed=${cfg.dashed};dashPattern=${cfg.pattern};endArrow=${cfg.arrow};endFill=${cfg.arrow === 'block' ? 1 : 0};fontColor=#0F172A;fontSize=10;fontStyle=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;exitX=${exitX};exitY=${exitY};exitDx=0;exitDy=0;entryX=${entryX};entryY=${entryY};entryDx=0;entryDy=0;" edge="1" parent="1" source="${source}" target="${target}"><mxGeometry relative="1" as="geometry">${pts}</mxGeometry></mxCell>`;
};

export function buildMasterEnterpriseApiManagementXml(): string {
  const cells: string[] = [
    '<mxCell id="0"/>',
    '<mxCell id="1" parent="0"/>',

    // TOP TITLE BANNER
    cell('top_title', 'Google Cloud Enterprise API Management and Integration Architecture', 'text;html=1;whiteSpace=wrap;align=center;verticalAlign=middle;fontColor=#0F172A;fontSize=20;fontStyle=1;', 40, 20, 1520, 36),

    // LANE 1: Multi-Channel Ingress
    cell('lane_ingress', '', 'rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;shadow=1;', 40, 70, 240, 590),
    cell('lane_ingress_pod', '<b style="color:#FFFFFF;font-size:12px;">MULTI-CHANNEL INGRESS</b>', 'rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#CBD5E1;strokeWidth=1.2;align=center;verticalAlign=middle;', 55, 80, 210, 32),
    cell('in_mobile', `<table style="width:100%;height:100%;border-collapse:collapse"><tr><td style="width:36px;text-align:center"><img src="${ICON.mobile}" width="28" height="28"/></td><td style="text-align:center;font-size:12px;font-weight:bold;color:#0F172A">Mobile Apps</td></tr></table>`, 'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.3;align=center;verticalAlign=middle;', 55, 125, 120, 85),
    cell('in_web', `<table style="width:100%;height:100%;border-collapse:collapse"><tr><td style="width:36px;text-align:center"><img src="${ICON.web}" width="28" height="28"/></td><td style="text-align:center;font-size:12px;font-weight:bold;color:#0F172A">Web SPAs</td></tr></table>`, 'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.3;align=center;verticalAlign=middle;', 55, 235, 120, 85),
    cell('in_partner', `<table style="width:100%;height:100%;border-collapse:collapse"><tr><td style="width:36px;text-align:center"><img src="${ICON.partner}" width="28" height="28"/></td><td style="text-align:center;font-size:11px;font-weight:bold;color:#0F172A">Partner B2B<br/><span style="font-size:9px;color:#64748B">(ERP/CRM)</span></td></tr></table>`, 'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.3;align=center;verticalAlign=middle;', 55, 345, 120, 95),
    cell('in_iot', `<table style="width:100%;height:100%;border-collapse:collapse"><tr><td style="width:36px;text-align:center"><img src="${ICON.iot}" width="28" height="28"/></td><td style="text-align:center;font-size:11px;font-weight:bold;color:#0F172A">IoT Gateways<br/><span style="font-size:9px;color:#64748B">(Telemetry)</span></td></tr></table>`, 'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#059669;strokeWidth=1.3;align=center;verticalAlign=middle;', 55, 465, 120, 95),
    cell('buf_internet', 'Public Internet Buffer<br/><span style="font-size:9px;color:#64748B">TLS 1.3 Transport</span>', 'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.2;align=center;verticalAlign=middle;fontColor=#1E3A8A;fontSize=10;fontStyle=1;', 190, 125, 75, 435),

    // LANE 2: Edge Ingress
    cell('lane_edge', '', 'rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;shadow=1;', 300, 70, 200, 590),
    cell('lane_edge_pod', '<b style="color:#FFFFFF;font-size:12px;">EDGE INGRESS</b>', 'rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#1E3A8A;strokeColor=#CBD5E1;strokeWidth=1.2;align=center;verticalAlign=middle;', 315, 80, 170, 32),
    cell('gclb_box', `<table style="width:100%;height:100%;border-collapse:collapse"><tr><td style="width:36px;text-align:center"><img src="${ICON.gclb}" width="30" height="30"/></td><td style="text-align:center;font-size:12px;font-weight:bold;color:#0F172A">Global External<br/>HTTP(S) Load Balancer</td></tr></table>`, 'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.3;align=center;verticalAlign=middle;', 315, 130, 170, 140),
    cell('armor_box', `<table style="width:100%;height:100%;border-collapse:collapse"><tr><td style="width:36px;text-align:center"><img src="${ICON.armor}" width="30" height="30"/></td><td style="text-align:center;font-size:12px;font-weight:bold;color:#0F172A">Google Cloud Armor<br/>(WAF Security)</td></tr></table>`, 'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.3;align=center;verticalAlign=middle;', 315, 300, 170, 150),
    cell('pill_ddos', 'DDoS Protection &amp; Rate Limit', 'rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=1;align=center;verticalAlign=middle;fontColor=#1E3A8A;fontSize=9;fontStyle=1;', 325, 470, 150, 40),
    cell('pill_owasp', 'OWASP Top 10 Core Rules', 'rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=1;align=center;verticalAlign=middle;fontColor=#1E3A8A;fontSize=9;fontStyle=1;', 325, 520, 150, 40),
    cell('pill_geo', 'Adaptive Geo-Fencing Rules', 'rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=1;align=center;verticalAlign=middle;fontColor=#1E3A8A;fontSize=9;fontStyle=1;', 325, 570, 150, 40),

    // LANE 3: Apigee X Enterprise API Gateway Platform
    cell('lane_apigee', '', 'rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;shadow=1;', 520, 70, 520, 590),
    cell('lane_apigee_pod', '<b style="color:#FFFFFF;font-size:12px;">APIGEE X ENTERPRISE API GATEWAY PLATFORM</b>', 'rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#4C1D95;strokeColor=#CBD5E1;strokeWidth=1.2;align=center;verticalAlign=middle;', 540, 80, 480, 32),
    cell('apigee_armor_sub', `<table style="width:100%;height:100%;border-collapse:collapse"><tr><td style="width:36px;text-align:center"><img src="${ICON.shield}" width="28" height="28"/></td><td style="text-align:center;font-size:12px;font-weight:bold;color:#0F172A">Cloud Armor for Apigee<br/><span style="font-size:9.5px;color:#64748B">Pre-routing L7 Security</span></td></tr></table>`, 'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#059669;strokeWidth=1.3;align=center;verticalAlign=middle;', 540, 130, 480, 75),
    cell('apigee_runtime_box', '', 'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;', 540, 220, 480, 310),
    cell('apigee_rt_title', `<table style="width:100%;height:100%;border-collapse:collapse"><tr><td style="width:32px;text-align:center"><img src="${ICON.apigee}" width="26" height="26"/></td><td style="text-align:left;font-size:12px;font-weight:bold;color:#0F172A">Apigee X Gateway Runtime Engine (Managed PSC Plane)</td></tr></table>`, 'text;html=1;whiteSpace=wrap;align=left;verticalAlign=middle;', 555, 230, 450, 30),
    cell('pol_oauth', 'OAuth 2.0 / JWT Auth', 'rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;align=center;verticalAlign=middle;fontColor=#0F172A;fontSize=10;fontStyle=1;', 555, 275, 210, 50),
    cell('pol_quota', 'Spike Arrest &amp; Quotas', 'rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;align=center;verticalAlign=middle;fontColor=#0F172A;fontSize=10;fontStyle=1;', 790, 275, 210, 50),
    cell('pol_xml_json', 'JSON/XML Transform', 'rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.2;align=center;verticalAlign=middle;fontColor=#0F172A;fontSize=10;fontStyle=1;', 555, 345, 210, 50),
    cell('pol_mtls', 'Mutual TLS Enforcement', 'rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.2;align=center;verticalAlign=middle;fontColor=#0F172A;fontSize=10;fontStyle=1;', 790, 345, 210, 50),
    cell('pol_spec', 'OpenAPI 3.0 Validation', 'rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#059669;strokeWidth=1.2;align=center;verticalAlign=middle;fontColor=#0F172A;fontSize=10;fontStyle=1;', 555, 415, 210, 50),
    cell('pol_caching', 'Distributed Cache Engine', 'rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#059669;strokeWidth=1.2;align=center;verticalAlign=middle;fontColor=#0F172A;fontSize=10;fontStyle=1;', 790, 415, 210, 50),
    cell('apigee_analytics', `<table style="width:100%;height:100%;border-collapse:collapse"><tr><td style="width:36px;text-align:center"><img src="${ICON.analytics}" width="26" height="26"/></td><td style="text-align:center;font-size:11px;font-weight:bold;color:#0F172A">Apigee Analytics &amp; Monetization Hub</td></tr></table>`, 'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.3;align=center;verticalAlign=middle;', 540, 545, 480, 70),

    // LANE 4: Core Application & Microservices Tier
    cell('lane_core', '', 'rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;shadow=1;', 1060, 70, 500, 590),
    cell('lane_core_pod', '<b style="color:#FFFFFF;font-size:12px;">CORE APPLICATION &amp; BACKEND TIER</b>', 'rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#1E3A8A;strokeColor=#CBD5E1;strokeWidth=1.2;align=center;verticalAlign=middle;', 1080, 80, 460, 32),
    cell('core_vpc_box', '', 'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;', 1080, 130, 460, 515),
    cell('core_vpc_title', 'Customer Virtual Private Cloud (VPC Network)', 'text;html=1;whiteSpace=wrap;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=12;fontStyle=1;', 1095, 140, 430, 25),
    cell('be_nsg', 'Network Security Groups &amp; Firewalls', 'rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#059669;strokeWidth=1.2;align=center;verticalAlign=middle;fontColor=#0F172A;fontSize=10;fontStyle=1;', 1095, 175, 430, 35),
    cell('be_ilb', `<table style="width:100%;height:100%;border-collapse:collapse"><tr><td style="width:36px;text-align:center"><img src="${ICON.psc}" width="28" height="28"/></td><td style="text-align:center;font-size:12px;font-weight:bold;color:#0F172A">Internal Application<br/>Load Balancer (ILB)</td></tr></table>`, 'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.3;align=center;verticalAlign=middle;', 1095, 230, 430, 80),
    cell('be_gke_micro', `<table style="width:100%;height:100%;border-collapse:collapse"><tr><td style="width:32px;text-align:center"><img src="${ICON.gke}" width="24" height="24"/></td><td style="text-align:left;font-size:11px;font-weight:bold;color:#0F172A">GKE Enterprise Cluster<br/><span style="font-size:9px;color:#64748B">Core Domain Microservices</span></td></tr></table>`, 'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#1D4ED8;strokeWidth=1.2;align=center;verticalAlign=middle;', 1095, 330, 205, 95),
    cell('be_gke_serverless', `<table style="width:100%;height:100%;border-collapse:collapse"><tr><td style="width:32px;text-align:center"><img src="${ICON.gke}" width="24" height="24"/></td><td style="text-align:left;font-size:11px;font-weight:bold;color:#0F172A">GKE Enterprise Platform<br/><span style="font-size:9px;color:#64748B">Event Processors</span></td></tr></table>`, 'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#1D4ED8;strokeWidth=1.2;align=center;verticalAlign=middle;', 1095, 445, 205, 95),
    cell('be_run_micro', `<table style="width:100%;height:100%;border-collapse:collapse"><tr><td style="width:32px;text-align:center"><img src="${ICON.run}" width="24" height="24"/></td><td style="text-align:left;font-size:11px;font-weight:bold;color:#0F172A">Cloud Run (Autoscaling)<br/><span style="font-size:9px;color:#64748B">RESTful APIs</span></td></tr></table>`, 'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;align=center;verticalAlign=middle;', 1320, 330, 205, 95),
    cell('be_run_serverless', `<table style="width:100%;height:100%;border-collapse:collapse"><tr><td style="width:32px;text-align:center"><img src="${ICON.run}" width="24" height="24"/></td><td style="text-align:left;font-size:11px;font-weight:bold;color:#0F172A">Cloud Run Serverless<br/><span style="font-size:9px;color:#64748B">Webhooks &amp; Async</span></td></tr></table>`, 'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;align=center;verticalAlign=middle;', 1320, 445, 205, 95),
    cell('be_mtls_pill', 'Internal Mutual TLS (mTLS) Encryption Mesh', 'rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=#ECFDF5;strokeColor=#059669;strokeWidth=1.2;align=center;verticalAlign=middle;fontColor=#065F46;fontSize=10;fontStyle=1;', 1095, 560, 430, 45),

    // BOTTOM PLANE: Security, Governance & Observability Plane
    cell('sec_plane', '', 'rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;shadow=1;', 40, 680, 1520, 160),
    cell('sec_plane_pod', '<b style="color:#FFFFFF;font-size:12px;">CROSS-CUTTING SECURITY, GOVERNANCE &amp; OBSERVABILITY PLANE</b>', 'rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#065F46;strokeColor=#CBD5E1;strokeWidth=1.2;align=center;verticalAlign=middle;', 60, 690, 600, 30),
    cell('sec_kms', `<table style="width:100%;height:100%;border-collapse:collapse"><tr><td style="width:36px;text-align:center"><img src="${ICON.kms}" width="28" height="28"/></td><td style="text-align:left;font-size:11px;font-weight:bold;color:#0F172A">Cloud Key Management (KMS)<br/><span style="font-size:9px;color:#64748B">Customer Managed Keys</span></td></tr></table>`, 'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#059669;strokeWidth=1.2;align=center;verticalAlign=middle;', 60, 735, 340, 75),
    cell('sec_iam', `<table style="width:100%;height:100%;border-collapse:collapse"><tr><td style="width:36px;text-align:center"><img src="${ICON.iam}" width="28" height="28"/></td><td style="text-align:left;font-size:11px;font-weight:bold;color:#0F172A">Cloud IAM &amp; Service Accounts<br/><span style="font-size:9px;color:#64748B">Least Privilege RBAC</span></td></tr></table>`, 'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;align=center;verticalAlign=middle;', 425, 735, 340, 75),
    cell('sec_ops', `<table style="width:100%;height:100%;border-collapse:collapse"><tr><td style="width:36px;text-align:center"><img src="${ICON.ops}" width="28" height="28"/></td><td style="text-align:left;font-size:11px;font-weight:bold;color:#0F172A">Cloud Logging &amp; Monitoring<br/><span style="font-size:9px;color:#64748B">Full Distributed Tracing</span></td></tr></table>`, 'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#059669;strokeWidth=1.2;align=center;verticalAlign=middle;', 790, 735, 340, 75),
    cell('sec_scc', `<table style="width:100%;height:100%;border-collapse:collapse"><tr><td style="width:36px;text-align:center"><img src="${ICON.scc}" width="28" height="28"/></td><td style="text-align:left;font-size:11px;font-weight:bold;color:#0F172A">Security Command Center<br/><span style="font-size:9px;color:#64748B">Threat Detection &amp; Audit</span></td></tr></table>`, 'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#059669;strokeWidth=1.2;align=center;verticalAlign=middle;', 1155, 735, 385, 75),

    // CONNECTORS
    edge('e_in_mobile_buf', 'in_mobile', 'buf_internet', '', 'request', 1, 0.5, 0, 0.1),
    edge('e_in_web_buf', 'in_web', 'buf_internet', '', 'request', 1, 0.5, 0, 0.35),
    edge('e_in_partner_buf', 'in_partner', 'buf_internet', '', 'request', 1, 0.5, 0, 0.62),
    edge('e_in_iot_buf', 'in_iot', 'buf_internet', '', 'request', 1, 0.5, 0, 0.9),
    edge('e_buf_gclb', 'buf_internet', 'gclb_box', '1. Ingress HTTPS', 'request', 1, 0.25, 0, 0.5),
    edge('e_gclb_armor', 'gclb_box', 'armor_box', '2. L7 Inspect', 'request', 0.5, 1, 0.5, 0),
    edge('e_gclb_apigee', 'gclb_box', 'apigee_armor_sub', '3. Proxy Route', 'request', 1, 0.5, 0, 0.5),
    edge('e_apigee_armor_rt', 'apigee_armor_sub', 'apigee_runtime_box', '', 'request', 0.5, 1, 0.5, 0),
    edge('e_apigee_ilb', 'apigee_runtime_box', 'be_ilb', '4. Private PSC Call', 'request', 1, 0.5, 0, 0.5),
    edge('e_ilb_gke_micro', 'be_ilb', 'be_gke_micro', '', 'request', 1, 0.25, 0, 0.5),
    edge('e_ilb_gke_srv', 'be_ilb', 'be_gke_serverless', '', 'request', 1, 0.75, 0, 0.5),
    edge('e_gke_run_micro', 'be_gke_micro', 'be_run_micro', '', 'request', 1, 0.5, 0, 0.5),
    edge('e_gke_run_srv', 'be_gke_serverless', 'be_run_serverless', '', 'request', 1, 0.5, 0, 0.5),
    edge('e_mtls_up', 'be_mtls_pill', 'be_gke_micro', '', 'request', 0.25, 0, 0.5, 1),
    edge('e_mtls_down', 'be_mtls_pill', 'be_gke_serverless', '', 'request', 0.25, 1, 0.5, 0),
    edge('e_mtls_run_up', 'be_mtls_pill', 'be_run_micro', '', 'request', 0.75, 0, 0.5, 1),
    edge('e_mtls_run_down', 'be_mtls_pill', 'be_run_serverless', '', 'request', 0.75, 1, 0.5, 0),
    edge('e_apigee_sec_plane', 'apigee_runtime_box', 'sec_kms', '', 'governance', 0.25, 1, 0.5, 0, [[607, 675], [382, 675]]),
  ];

  return `<mxfile host="app.diagrams.net" modified="2026-08-21T00:35:00.000Z" agent="PromptCanvas Blueprint 51" version="24.7.17" type="device">
  <diagram id="catalog_enterprise_api_management" name="Google Cloud Enterprise API Management and Integration Architecture">
    <mxGraphModel dx="1600" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="950" background="#F8FAFC">
      <root>
        ${cells.join('\n        ')}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}

export const MASTER_ENTERPRISE_API_MANAGEMENT_XML = buildMasterEnterpriseApiManagementXml();
