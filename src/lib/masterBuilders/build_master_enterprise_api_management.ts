/**
 * 🎨 Blueprint #51 (NEW-APP-01): Google Cloud Enterprise API Management and Integration Architecture
 * 
 * 100% Exact 1:1 Architectural and Visual Translation of Reference Image:
 * blueprint_51_api_management_1787260677085.jpg
 * 
 * Layout Structure:
 * - Canvas Background: Dark Glassmorphic (#0B132B)
 * - Top Title: "Google Cloud Enterprise API Management and Integration Architecture"
 * - Lane 1: Multi-Channel Ingress (Mobile Apps, Web SPAs, Partner B2B, IoT Gateways -> Public Internet buffer)
 * - Lane 2: Edge Ingress (Global External HTTP(S) Load Balancer, Cloud Armor WAF with DDOS/WAF/Geo pills)
 * - Lane 3: Apigee X Enterprise API Gateway Platform (Cloud Armor box, API Gateway Runtime with 6 policy engines, Apigee Analytics & Monetization)
 * - Lane 4: Core Application & Microservices Tier (Private VPC, Network Security Groups, ILB, GKE Enterprise, Cloud Run, Mutual TLS)
 * - Bottom Plane: Security, Governance & Observability Plane (Cloud KMS, Cloud IAM, Cloud Logging & Monitoring, Security Command Center)
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
  mobile: svg('<rect x="12" y="6" width="24" height="36" rx="4" fill="#0284C7"/><rect x="15" y="10" width="18" height="26" rx="2" fill="#0F172A"/><circle cx="24" cy="39" r="1.5" fill="#38BDF8"/>'),
  web: svg('<rect x="6" y="8" width="36" height="32" rx="4" fill="#0284C7"/><path d="M6 16h36" stroke="#0F172A" stroke-width="2"/><circle cx="11" cy="12" r="1.5" fill="#38BDF8"/><circle cx="16" cy="12" r="1.5" fill="#38BDF8"/><circle cx="21" cy="12" r="1.5" fill="#38BDF8"/><circle cx="24" cy="27" r="5" fill="none" stroke="#fff" stroke-width="2"/><path d="M19 27h10M24 22v10" stroke="#fff" stroke-width="2"/>'),
  partner: svg('<circle cx="18" cy="18" r="6" fill="#0284C7"/><circle cx="30" cy="18" r="6" fill="#0284C7"/><path d="M8 38c0-5.5 4.5-10 10-10h12c5.5 0 10 4.5 10 10" fill="#0284C7"/><circle cx="24" cy="16" r="7" fill="#38BDF8"/>'),
  iot: svg('<rect x="12" y="12" width="24" height="24" rx="4" fill="#0284C7"/><rect x="18" y="18" width="12" height="12" rx="2" fill="#0F172A"/><circle cx="24" cy="24" r="2.5" fill="#38BDF8"/><path d="M24 6v6M24 36v6M6 24h6M36 24h6" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>'),
  gclb: svg('<rect x="8" y="10" width="32" height="12" rx="3" fill="#38BDF8"/><circle cx="14" cy="36" r="5" fill="#38BDF8"/><circle cx="24" cy="36" r="5" fill="#38BDF8"/><circle cx="34" cy="36" r="5" fill="#38BDF8"/><path d="M14 22v9m10-9v9m10-9v9" stroke="#38BDF8" stroke-width="2.5"/>'),
  armor: svg('<path d="M24 4 40 10v12c0 11-6.5 18-16 22C14.5 40 8 33 8 22V10z" fill="#0284C7"/><path d="M24 8 36 13v9c0 9-5 14.5-12 18-7-3.5-12-9-12-18v-9z" fill="#0F172A"/><path d="m18 23 4 4 8-9" fill="none" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/>'),
  apigee: svg('<path d="M14 8 24 24 14 40h6l7-11 7 11h6L30 24 40 8h-6l-7 11-7-11z" fill="#38BDF8"/>'),
  gke: svg('<rect x="6" y="6" width="36" height="36" rx="8" fill="#1D4ED8"/><path d="m24 12 11 6v12l-11 6-11-6V18z" fill="none" stroke="#38BDF8" stroke-width="2.5"/><circle cx="24" cy="24" r="3" fill="#fff"/>'),
  run: svg('<path d="M9 10 31 24 9 38l9-14z" fill="#38BDF8"/><path d="M26 10 39 24 26 38l6-14z" fill="#0284C7"/>'),
  analytics: svg('<rect x="6" y="8" width="36" height="32" rx="4" fill="#0F172A" stroke="#0284C7" stroke-width="2"/><path d="m12 30 7-8 6 5 11-13" fill="none" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"/><circle cx="36" cy="14" r="2.5" fill="#38BDF8"/>'),
  kms: svg('<path d="M24 6 40 15v18L24 42 8 33V15z" fill="#0284C7"/><circle cx="24" cy="21" r="5" fill="#0F172A"/><path d="M24 26v8m-3-3h6" stroke="#38BDF8" stroke-width="2.5" stroke-linecap="round"/>'),
  iam: svg('<circle cx="24" cy="15" r="8" fill="#38BDF8"/><path d="M9 41c2-11 8-16 15-16s13 5 15 16" fill="#0284C7"/><circle cx="24" cy="15" r="4" fill="#0F172A"/>'),
  ops: svg('<rect x="6" y="8" width="36" height="26" rx="3" fill="#0F172A" stroke="#0284C7" stroke-width="2"/><path d="M12 16h24M12 22h16M12 28h20" stroke="#38BDF8" stroke-width="2.5" stroke-linecap="round"/>'),
  scc: svg('<path d="M24 4 40 10v12c0 11-6.5 18-16 22C14.5 40 8 33 8 22V10z" fill="#0284C7"/><circle cx="24" cy="22" r="6" fill="#0F172A"/><path d="M24 28v5" stroke="#38BDF8" stroke-width="3"/>'),
  psc: svg('<circle cx="16" cy="24" r="7" fill="#0284C7"/><circle cx="32" cy="24" r="7" fill="#0284C7"/><path d="M16 24h16" stroke="#38BDF8" stroke-width="3"/>'),
  shield: svg('<path d="M24 4 40 10v12c0 11-6.5 18-16 22C14.5 40 8 33 8 22V10z" fill="#0284C7"/><path d="m18 23 4 4 8-9" fill="none" stroke="#38BDF8" stroke-width="2.5"/>'),
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
    ? { stroke: '#38BDF8', dashed: 0, pattern: '6 4', arrow: 'block', width: 2 }
    : kind === 'response'
      ? { stroke: '#94A3B8', dashed: 1, pattern: '6 4', arrow: 'block', width: 1.6 }
      : { stroke: '#0284C7', dashed: 1, pattern: '3 3', arrow: 'open', width: 1.6 };
  const pts = points.length ? `<Array as="points">${points.map(([x, y]) => `<mxPoint x="${x}" y="${y}"/>`).join('')}</Array>` : '';
  return `<mxCell id="${id}" value="${esc(label)}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${cfg.stroke};strokeWidth=${cfg.width};dashed=${cfg.dashed};dashPattern=${cfg.pattern};endArrow=${cfg.arrow};endFill=${cfg.arrow === 'block' ? 1 : 0};fontColor=#E2E8F0;fontSize=10;fontStyle=1;labelBackgroundColor=#0F172A;labelBorderColor=#1E293B;exitX=${exitX};exitY=${exitY};exitDx=0;exitDy=0;entryX=${entryX};entryY=${entryY};entryDx=0;entryDy=0;" edge="1" parent="1" source="${source}" target="${target}"><mxGeometry relative="1" as="geometry">${pts}</mxGeometry></mxCell>`;
};

export function buildMasterEnterpriseApiManagementXml(): string {
  const cells: string[] = [
    '<mxCell id="0"/>',
    '<mxCell id="1" parent="0"/>',

    // -------------------------------------------------------------
    // TOP TITLE BANNER
    // -------------------------------------------------------------
    cell(
      'top_title',
      'Google Cloud Enterprise API Management and Integration Architecture',
      'text;html=1;whiteSpace=wrap;align=center;verticalAlign=middle;fontColor=#F8FAFC;fontSize=20;fontStyle=1;',
      40, 20, 1520, 36
    ),

    // -------------------------------------------------------------
    // LANE 1: Multi-Channel Ingress (x=40, y=70, w=240, h=590)
    // -------------------------------------------------------------
    cell(
      'lane_ingress',
      '',
      'rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#09101F;strokeColor=#1E293B;strokeWidth=1.5;',
      40, 70, 240, 590
    ),
    cell(
      'lane_ingress_title',
      'Multi-Channel Ingress',
      'text;html=1;whiteSpace=wrap;align=center;verticalAlign=middle;fontColor=#F1F5F9;fontSize=14;fontStyle=1;',
      40, 80, 240, 30
    ),
    // 4 Ingress Client Cards
    cell(
      'in_mobile',
      `<table style="width:100%;height:100%;border-collapse:collapse"><tr><td style="width:36px;text-align:center"><img src="${ICON.mobile}" width="28" height="28"/></td><td style="text-align:center;font-size:12px;font-weight:bold;color:#F8FAFC">Mobile Apps</td></tr></table>`,
      'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#131E36;strokeColor=#1E293B;strokeWidth=1.2;align=center;verticalAlign=middle;',
      55, 125, 120, 85
    ),
    cell(
      'in_web',
      `<table style="width:100%;height:100%;border-collapse:collapse"><tr><td style="width:36px;text-align:center"><img src="${ICON.web}" width="28" height="28"/></td><td style="text-align:center;font-size:12px;font-weight:bold;color:#F8FAFC">Web SPAs</td></tr></table>`,
      'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#131E36;strokeColor=#1E293B;strokeWidth=1.2;align=center;verticalAlign=middle;',
      55, 235, 120, 85
    ),
    cell(
      'in_partner',
      `<table style="width:100%;height:100%;border-collapse:collapse"><tr><td style="width:36px;text-align:center"><img src="${ICON.partner}" width="28" height="28"/></td><td style="text-align:center;font-size:11px;font-weight:bold;color:#F8FAFC">Partner B2B<br/><span style="font-size:9px;color:#94A3B8">(ERP/CRM)</span></td></tr></table>`,
      'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#131E36;strokeColor=#1E293B;strokeWidth=1.2;align=center;verticalAlign=middle;',
      55, 345, 120, 95
    ),
    cell(
      'in_iot',
      `<table style="width:100%;height:100%;border-collapse:collapse"><tr><td style="width:36px;text-align:center"><img src="${ICON.iot}" width="28" height="28"/></td><td style="text-align:center;font-size:11px;font-weight:bold;color:#F8FAFC">IoT Gateways</td></tr></table>`,
      'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#131E36;strokeColor=#1E293B;strokeWidth=1.2;align=center;verticalAlign=middle;',
      55, 465, 120, 85
    ),
    // Public Internet Vertical Pillar
    cell(
      'public_internet',
      '<b>Public<br/>Internet</b>',
      'rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#334155;strokeWidth=1.5;fontColor=#E2E8F0;fontSize=12;align=center;verticalAlign=middle;',
      195, 125, 65, 425
    ),

    // -------------------------------------------------------------
    // LANE 2: Edge Security & Ingress (x=300, y=70, w=180, h=590)
    // -------------------------------------------------------------
    cell(
      'lane_edge',
      '',
      'rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#09101F;strokeColor=#1E293B;strokeWidth=1.5;',
      300, 70, 180, 590
    ),
    // Global External Load Balancer Card
    cell(
      'edge_gclb',
      `<table style="width:100%;height:100%;border-collapse:collapse"><tr><td style="text-align:center;padding:6px 0"><img src="${ICON.gclb}" width="32" height="32"/></td></tr><tr><td style="text-align:center;font-size:12px;font-weight:bold;color:#F8FAFC;padding:0 6px">Global External HTTP(S)<br/>Load Balancer</td></tr></table>`,
      'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#131E36;strokeColor=#1E293B;strokeWidth=1.2;align=center;verticalAlign=middle;',
      315, 140, 150, 140
    ),
    // Cloud Armor WAF Card with feature pills
    cell(
      'edge_armor_container',
      '',
      'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#131E36;strokeColor=#1E293B;strokeWidth=1.2;',
      315, 330, 150, 220
    ),
    cell(
      'edge_armor_icon',
      `<img src="${ICON.armor}" width="36" height="36"/>`,
      'text;html=1;whiteSpace=wrap;align=center;verticalAlign=middle;',
      365, 340, 50, 45
    ),
    cell(
      'edge_armor_title',
      '<b>Cloud Armor<br/>WAF</b>',
      'text;html=1;whiteSpace=wrap;align=center;verticalAlign=middle;fontColor=#F8FAFC;fontSize=12;',
      325, 385, 130, 30
    ),
    cell(
      'edge_pill_ddos',
      'DDOS Protection',
      'rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#334155;strokeWidth=1;fontColor=#94A3B8;fontSize=10;align=center;verticalAlign=middle;',
      325, 425, 130, 24
    ),
    cell(
      'edge_pill_waf',
      'WAF Rules',
      'rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#334155;strokeWidth=1;fontColor=#94A3B8;fontSize=10;align=center;verticalAlign=middle;',
      325, 458, 130, 24
    ),
    cell(
      'edge_pill_geo',
      'Geo-blocking',
      'rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#334155;strokeWidth=1;fontColor=#94A3B8;fontSize=10;align=center;verticalAlign=middle;',
      325, 491, 130, 24
    ),

    // -------------------------------------------------------------
    // LANE 3: Apigee X Enterprise API Gateway Platform (x=500, y=70, w=390, h=590)
    // -------------------------------------------------------------
    cell(
      'lane_apigee',
      '',
      'rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#09101F;strokeColor=#1E293B;strokeWidth=1.5;',
      500, 70, 390, 590
    ),
    cell(
      'lane_apigee_title',
      'Apigee X Enterprise API Gateway Platform',
      'text;html=1;whiteSpace=wrap;align=center;verticalAlign=middle;fontColor=#F1F5F9;fontSize=14;fontStyle=1;',
      500, 80, 390, 30
    ),
    // Apigee Top Box: Cloud Armor WAF integration
    cell(
      'apigee_waf_box',
      `<table style="width:100%;height:100%;border-collapse:collapse"><tr><td style="width:50px;text-align:center;vertical-align:middle"><img src="${ICON.armor}" width="34" height="34"/></td><td style="text-align:left;vertical-align:middle;padding-left:8px"><b style="font-size:12px;color:#F8FAFC">Cloud Armor WAF</b><ul style="margin:2px 0 0 14px;padding:0;font-size:10px;color:#94A3B8"><li>DDOS Protection</li><li>WAF Rules</li><li>Geo-blocking</li></ul></td></tr></table>`,
      'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#131E36;strokeColor=#1E293B;strokeWidth=1.2;align=left;verticalAlign=middle;spacing=6;',
      520, 115, 350, 90
    ),
    // Apigee Middle Box: API Gateway Runtime with 6 policy engines
    cell(
      'apigee_runtime_box',
      '',
      'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#131E36;strokeColor=#1E293B;strokeWidth=1.2;',
      520, 220, 350, 250
    ),
    cell(
      'apigee_runtime_header',
      `<table style="width:100%;border-collapse:collapse"><tr><td style="width:36px;text-align:center"><img src="${ICON.apigee}" width="26" height="26"/></td><td style="text-align:left;font-size:13px;font-weight:bold;color:#F8FAFC">API Gateway Runtime</td></tr></table>`,
      'text;html=1;whiteSpace=wrap;align=left;verticalAlign=middle;',
      535, 230, 320, 32
    ),
    // 6 Policy Engine Sub-boxes (2 columns x 3 rows)
    cell(
      'apigee_pol_oauth',
      'OAuth2/OIDC<br/>Token Mediation',
      'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#334155;strokeWidth=1;fontColor=#F1F5F9;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;',
      535, 272, 150, 48
    ),
    cell(
      'apigee_pol_rbac',
      'Access Control',
      'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#334155;strokeWidth=1;fontColor=#F1F5F9;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;',
      705, 272, 150, 48
    ),
    cell(
      'apigee_pol_rate',
      'Dynamic Rate<br/>Limiting &amp; Quotas',
      'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#334155;strokeWidth=1;fontColor=#F1F5F9;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;',
      535, 330, 150, 48
    ),
    cell(
      'apigee_pol_traffic',
      'Traffic<br/>Management',
      'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#334155;strokeWidth=1;fontColor=#F1F5F9;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;',
      705, 330, 150, 48
    ),
    cell(
      'apigee_pol_transform',
      'XML-to-JSON<br/>Message Mediation',
      'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#334155;strokeWidth=1;fontColor=#F1F5F9;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;',
      535, 388, 150, 48
    ),
    cell(
      'apigee_pol_monitor',
      'API Monitoring',
      'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#334155;strokeWidth=1;fontColor=#F1F5F9;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;',
      705, 388, 150, 48
    ),
    // Apigee Bottom Box: Analytics & Monetization
    cell(
      'apigee_analytics_box',
      `<table style="width:100%;height:100%;border-collapse:collapse"><tr><td style="width:45px;text-align:center"><img src="${ICON.analytics}" width="30" height="30"/></td><td style="text-align:left;font-size:12px;font-weight:bold;color:#F8FAFC">Apigee Analytics &amp;<br/>Monetization</td></tr></table>`,
      'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#131E36;strokeColor=#1E293B;strokeWidth=1.2;align=left;verticalAlign=middle;spacing=6;',
      520, 490, 350, 75
    ),

    // -------------------------------------------------------------
    // LANE 4: Core Application & Microservices Tier (x=910, y=70, w=650, h=590)
    // -------------------------------------------------------------
    cell(
      'lane_core_app',
      '',
      'rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#09101F;strokeColor=#1E293B;strokeWidth=1.5;',
      910, 70, 650, 590
    ),
    cell(
      'lane_core_title',
      'Core Application &amp; Microservices Tier',
      'text;html=1;whiteSpace=wrap;align=center;verticalAlign=middle;fontColor=#F1F5F9;fontSize=14;fontStyle=1;',
      910, 80, 650, 30
    ),
    // Outer Private VPC Container
    cell(
      'vpc_container',
      '',
      'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#0E1A33;strokeColor=#1E3A8A;strokeWidth=1.5;',
      930, 115, 610, 525
    ),
    cell(
      'vpc_title',
      'Private VPC',
      'text;html=1;whiteSpace=wrap;align=left;verticalAlign=middle;fontColor=#60A5FA;fontSize=13;fontStyle=1;',
      975, 125, 200, 24
    ),
    cell(
      'vpc_icon_psc',
      `<img src="${ICON.psc}" width="22" height="22"/>`,
      'text;html=1;whiteSpace=wrap;align=center;verticalAlign=middle;',
      945, 125, 24, 24
    ),
    // Nested VPC Network & Security Group Container
    cell(
      'vpc_net_box',
      '',
      'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#102347;strokeColor=#1E40AF;strokeWidth=1.2;',
      945, 160, 580, 465
    ),
    cell(
      'vpc_net_title',
      'VPC Network',
      'text;html=1;whiteSpace=wrap;align=left;verticalAlign=middle;fontColor=#93C5FD;fontSize=12;fontStyle=1;',
      960, 170, 150, 20
    ),
    cell(
      'vpc_sec_groups',
      `<table style="border-collapse:collapse"><tr><td><img src="${ICON.shield}" width="16" height="16"/></td><td style="padding-left:4px;font-size:11px;font-weight:bold;color:#93C5FD">Network Security Groups</td></tr></table>`,
      'text;html=1;whiteSpace=wrap;align=right;verticalAlign=middle;',
      1330, 170, 185, 20
    ),
    // Subnets Inner Box
    cell(
      'vpc_subnets_box',
      '',
      'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#132D5C;strokeColor=#2563EB;strokeWidth=1.2;',
      960, 200, 550, 410
    ),
    cell(
      'subnets_title',
      'Subnets',
      'text;html=1;whiteSpace=wrap;align=left;verticalAlign=middle;fontColor=#BFDBFE;fontSize=12;fontStyle=1;',
      975, 210, 100, 20
    ),
    // Internal Application Load Balancer
    cell(
      'be_ilb',
      `<table style="width:100%;height:100%;border-collapse:collapse"><tr><td style="text-align:center"><img src="${ICON.gclb}" width="28" height="28"/></td></tr><tr><td style="text-align:center;font-size:10px;font-weight:bold;color:#F8FAFC;padding-top:4px">Internal<br/>Application<br/>Load Balancers</td></tr></table>`,
      'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#1E3A8A;strokeColor=#3B82F6;strokeWidth=1.2;align=center;verticalAlign=middle;',
      975, 290, 95, 175
    ),
    // Upper Microservices Cluster: GKE Enterprise -> Cloud Run
    cell(
      'be_gke_micro',
      `<table style="width:100%;height:100%;border-collapse:collapse"><tr><td style="text-align:center;font-size:10px;color:#94A3B8">Microservices</td></tr><tr><td style="text-align:center;padding:4px 0"><img src="${ICON.gke}" width="28" height="28"/></td></tr><tr><td style="text-align:center;font-size:11px;font-weight:bold;color:#F8FAFC">GKE Enterprise<br/><span style="font-size:9px;color:#94A3B8">(Google Kubernetes Engine)</span></td></tr></table>`,
      'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#172554;strokeColor=#3B82F6;strokeWidth=1.2;align=center;verticalAlign=middle;',
      1095, 240, 180, 110
    ),
    cell(
      'be_run_micro',
      `<table style="width:100%;height:100%;border-collapse:collapse"><tr><td style="text-align:center;padding-bottom:4px"><img src="${ICON.run}" width="32" height="32"/></td></tr><tr><td style="text-align:center;font-size:12px;font-weight:bold;color:#F8FAFC">Cloud Run</td></tr></table>`,
      'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#172554;strokeColor=#3B82F6;strokeWidth=1.2;align=center;verticalAlign=middle;',
      1335, 240, 150, 110
    ),
    // Mutual TLS mTLS Pill
    cell(
      'be_mtls_pill',
      'Mutual TLS (mTLS)',
      'rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#38BDF8;strokeWidth=1.2;fontColor=#38BDF8;fontSize=10;fontStyle=1;align=center;verticalAlign=middle;',
      1170, 390, 180, 26
    ),
    // Lower Serverless Containers Cluster: GKE Enterprise -> Cloud Run
    cell(
      'be_gke_serverless',
      `<table style="width:100%;height:100%;border-collapse:collapse"><tr><td style="text-align:center;font-size:10px;color:#94A3B8">Serverless Containers</td></tr><tr><td style="text-align:center;padding:4px 0"><img src="${ICON.gke}" width="28" height="28"/></td></tr><tr><td style="text-align:center;font-size:11px;font-weight:bold;color:#F8FAFC">GKE Enterprise<br/><span style="font-size:9px;color:#94A3B8">(Google Kubernetes Engine)</span></td></tr></table>`,
      'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#172554;strokeColor=#3B82F6;strokeWidth=1.2;align=center;verticalAlign=middle;',
      1095, 455, 180, 110
    ),
    cell(
      'be_run_serverless',
      `<table style="width:100%;height:100%;border-collapse:collapse"><tr><td style="text-align:center;padding-bottom:4px"><img src="${ICON.run}" width="32" height="32"/></td></tr><tr><td style="text-align:center;font-size:12px;font-weight:bold;color:#F8FAFC">Cloud Run</td></tr></table>`,
      'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#172554;strokeColor=#3B82F6;strokeWidth=1.2;align=center;verticalAlign=middle;',
      1335, 455, 150, 110
    ),

    // -------------------------------------------------------------
    // LANE 5: Security, Governance & Observability Plane (x=40, y=680, w=1520, h=140)
    // -------------------------------------------------------------
    cell(
      'lane_sec_ops',
      '',
      'rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#09101F;strokeColor=#1E293B;strokeWidth=1.5;',
      40, 680, 1520, 140
    ),
    cell(
      'sec_ops_title',
      'Security, Governance<br/>&amp; Observability Plane',
      'text;html=1;whiteSpace=wrap;align=left;verticalAlign=middle;fontColor=#F1F5F9;fontSize=13;fontStyle=1;',
      55, 715, 180, 60
    ),
    cell(
      'sec_kms',
      `<table style="width:100%;height:100%;border-collapse:collapse"><tr><td style="width:40px;text-align:center"><img src="${ICON.kms}" width="28" height="28"/></td><td style="text-align:left;font-size:11px;font-weight:bold;color:#F8FAFC">Cloud Key Management<br/>Service (KMS)</td></tr></table>`,
      'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#131E36;strokeColor=#1E293B;strokeWidth=1.2;align=left;verticalAlign=middle;spacing=6;',
      245, 715, 275, 70
    ),
    cell(
      'sec_iam',
      `<table style="width:100%;height:100%;border-collapse:collapse"><tr><td style="width:40px;text-align:center"><img src="${ICON.iam}" width="28" height="28"/></td><td style="text-align:left;font-size:11px;font-weight:bold;color:#F8FAFC">Cloud Identity and Access<br/>Management (IAM)</td></tr></table>`,
      'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#131E36;strokeColor=#1E293B;strokeWidth=1.2;align=left;verticalAlign=middle;spacing=6;',
      545, 715, 275, 70
    ),
    cell(
      'sec_ops',
      `<table style="width:100%;height:100%;border-collapse:collapse"><tr><td style="width:40px;text-align:center"><img src="${ICON.ops}" width="28" height="28"/></td><td style="text-align:left;font-size:11px;font-weight:bold;color:#F8FAFC">Cloud Logging &amp; Monitoring<br/><span style="font-size:9px;color:#94A3B8">(part of Google Cloud\'s operations suite)</span></td></tr></table>`,
      'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#131E36;strokeColor=#1E293B;strokeWidth=1.2;align=left;verticalAlign=middle;spacing=6;',
      845, 715, 345, 70
    ),
    cell(
      'sec_scc',
      `<table style="width:100%;height:100%;border-collapse:collapse"><tr><td style="width:40px;text-align:center"><img src="${ICON.scc}" width="28" height="28"/></td><td style="text-align:left;font-size:11px;font-weight:bold;color:#F8FAFC">Security Command<br/>Center</td></tr></table>`,
      'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#131E36;strokeColor=#1E293B;strokeWidth=1.2;align=left;verticalAlign=middle;spacing=6;',
      1215, 715, 325, 70
    ),

    // -------------------------------------------------------------
    // EDGES & DATA FLOW CORRIDORS
    // -------------------------------------------------------------
    // Clients -> Public Internet
    edge('e_mob_net', 'in_mobile', 'public_internet', '', 'request', 1, 0.5, 0, 0.12),
    edge('e_web_net', 'in_web', 'public_internet', '', 'request', 1, 0.5, 0, 0.35),
    edge('e_part_net', 'in_partner', 'public_internet', '', 'request', 1, 0.5, 0, 0.62),
    edge('e_iot_net', 'in_iot', 'public_internet', '', 'request', 1, 0.5, 0, 0.88),

    // Public Internet -> Cloud Armor
    edge('e_net_armor', 'public_internet', 'edge_armor_container', '', 'request', 1, 0.74, 0, 0.5),

    // Cloud Armor / GCLB -> Apigee X
    edge('e_gclb_apigee_waf', 'edge_gclb', 'apigee_waf_box', '', 'request', 1, 0.5, 0, 0.5),
    edge('e_armor_apigee_run', 'edge_armor_container', 'apigee_runtime_box', '', 'request', 1, 0.35, 0, 0.5),
    edge('e_apigee_waf_run', 'apigee_waf_box', 'apigee_runtime_box', '', 'request', 0.5, 1, 0.5, 0),

    // Apigee Runtime -> Internal Application Load Balancer
    edge('e_apigee_ilb', 'apigee_runtime_box', 'be_ilb', '', 'request', 1, 0.63, 0, 0.5),

    // ILB -> GKE Microservices & Serverless
    edge('e_ilb_gke_micro', 'be_ilb', 'be_gke_micro', '', 'request', 1, 0.25, 0, 0.5),
    edge('e_ilb_gke_srv', 'be_ilb', 'be_gke_serverless', '', 'request', 1, 0.75, 0, 0.5),

    // GKE -> Cloud Run
    edge('e_gke_run_micro', 'be_gke_micro', 'be_run_micro', '', 'request', 1, 0.5, 0, 0.5),
    edge('e_gke_run_srv', 'be_gke_serverless', 'be_run_serverless', '', 'request', 1, 0.5, 0, 0.5),

    // Bidirectional mTLS connectors
    edge('e_mtls_up', 'be_mtls_pill', 'be_gke_micro', '', 'request', 0.25, 0, 0.5, 1),
    edge('e_mtls_down', 'be_mtls_pill', 'be_gke_serverless', '', 'request', 0.25, 1, 0.5, 0),
    edge('e_mtls_run_up', 'be_mtls_pill', 'be_run_micro', '', 'request', 0.75, 0, 0.5, 1),
    edge('e_mtls_run_down', 'be_mtls_pill', 'be_run_serverless', '', 'request', 0.75, 1, 0.5, 0),

    // Governance & Security Plane connection
    edge('e_apigee_sec_plane', 'apigee_runtime_box', 'sec_kms', '', 'governance', 0.25, 1, 0.5, 0, [[607, 675], [382, 675]]),
  ];

  return `<mxfile host="embed.diagrams.net" modified="2026-08-20T22:00:00.000Z" agent="PromptCanvas" version="24.0.0" type="embed">
  <diagram id="catalog_enterprise_api_management" name="Google Cloud Enterprise API Management and Integration Architecture">
    <mxGraphModel dx="1600" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="950" background="#0B132B">
      <root>
        ${cells.join('\n        ')}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}

export const MASTER_ENTERPRISE_API_MANAGEMENT_XML = buildMasterEnterpriseApiManagementXml();
