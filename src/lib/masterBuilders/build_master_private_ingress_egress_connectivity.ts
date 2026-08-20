/**
 * 🎨 Blueprint #56 (NEW-NET-06): Private Ingress, Egress & Service Connectivity Architecture
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
  armor: svg('<path d="M24 4 40 10v12c0 11-6.5 18-16 22C14.5 40 8 33 8 22V10z" fill="#DC2626"/><path d="m16 24 5 5 11-13" fill="none" stroke="#fff" stroke-width="3"/>'),
  gclb: svg('<rect x="8" y="10" width="32" height="12" rx="3" fill="#2563EB"/><circle cx="14" cy="36" r="5" fill="#2563EB"/><circle cx="24" cy="36" r="5" fill="#2563EB"/><circle cx="34" cy="36" r="5" fill="#2563EB"/><path d="M14 22v9m10-9v9m10-9v9" stroke="#2563EB" stroke-width="2.5"/>'),
  interconnect: svg('<rect x="8" y="14" width="32" height="20" rx="4" fill="#2563EB"/><path d="M14 24h20M24 14v20" stroke="#fff" stroke-width="3"/>'),
  psc: svg('<circle cx="16" cy="24" r="8" fill="#2563EB"/><circle cx="32" cy="24" r="8" fill="#2563EB"/><path d="M16 24h16" stroke="#fff" stroke-width="3"/>'),
  gke: svg('<rect x="6" y="6" width="36" height="36" rx="8" fill="#1D4ED8"/><path d="m24 12 11 6v12l-11 6-11-6V18z" fill="none" stroke="#fff" stroke-width="2.5"/><circle cx="24" cy="24" r="3" fill="#fff"/>'),
  run: svg('<path d="M9 10 31 24 9 38l9-14z" fill="#2563EB"/><path d="M26 10 39 24 26 38l6-14z" fill="#1D4ED8"/>'),
  db: svg('<ellipse cx="24" cy="11" rx="14" ry="6" fill="#7E57C2"/><path d="M10 11v24c0 3.3 6.3 6 14 6s14-2.7 14-6V11" fill="#B8A6E6"/><ellipse cx="24" cy="35" rx="14" ry="6" fill="#7E57C2"/>'),
  nat: svg('<rect x="8" y="8" width="32" height="32" rx="6" fill="#0284C7"/><path d="M14 24h20m-6-6l6 6-6 6" stroke="#fff" stroke-width="2.5"/>'),
  swp: svg('<rect x="8" y="8" width="32" height="32" rx="6" fill="#059669"/><circle cx="24" cy="24" r="8" fill="none" stroke="#fff" stroke-width="2.5"/>'),
  dns: svg('<rect x="8" y="8" width="32" height="32" rx="6" fill="#2563EB"/><path d="M14 16h20M14 24h20M14 32h14" stroke="#fff" stroke-width="2.5"/>'),
  log: svg('<rect x="10" y="6" width="28" height="36" rx="3" fill="#059669"/><path d="M16 15h16M16 23h16M16 31h10" stroke="#fff" stroke-width="2.5"/>'),
  monitor: svg('<rect x="6" y="8" width="36" height="26" rx="3" fill="#059669"/><path d="m11 28 7-7 5 4 8-11 6 6" fill="none" stroke="#fff" stroke-width="2.5"/><path d="M18 40h12M24 34v6" stroke="#059669" stroke-width="3"/>')
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

export function buildMasterPrivateIngressEgressXml(): string {
  const cells: string[] = [
    '<mxCell id="0"/>',
    '<mxCell id="1" parent="0"/>',

    // Lane 1: Edge Ingress & Hybrid Perimeter
    lane('edge', 1, 'EDGE INGRESS & HYBRID INTERCONNECT PERIMETER', 'Public TLS traffic inspection and 100G dedicated hybrid transit', 20, 20, 1540, 140, '#1E3A8A', '#FFFFFF'),
    card('edg_armor', 'Cloud Armor DDoS & WAF', 'Layer 7 adaptive rate limiting & geo-blocking', ICON.armor, 45, 75, 340, 70, '#DC2626'),
    card('edg_gclb', 'Global External HTTPS LB', 'Global Anycast IP terminating TLS 1.3 certificates', ICON.gclb, 415, 75, 360, 70, '#2563EB'),
    card('edg_interconnect', 'Dedicated Cloud Interconnect', '100G direct fiber connection to on-premises data centers', ICON.interconnect, 805, 75, 350, 70, '#2563EB'),
    card('edg_dns', 'Cloud DNS Private Forwarding', 'Split-horizon DNS resolution across hybrid zones', ICON.dns, 1185, 75, 350, 70, '#2563EB'),

    // Lane 2: Private Transit & PSC Service Hub
    lane('transit', 2, 'PRIVATE TRANSIT & PRIVATE SERVICE CONNECT (PSC) HUB', 'Zero-IP overlap private endpoint transit across managed producer VPCs', 20, 180, 1540, 150, '#1D4ED8', '#FFFFFF'),
    card('trn_psc_ep', 'PSC Consumer Forwarding Rules', 'Private endpoint IP (10.100.0.5) to Google APIs', ICON.psc, 45, 235, 450, 75, '#2563EB'),
    card('trn_ilb', 'Internal Application Load Balancer', 'Regional L7 proxy for private microservices', ICON.gclb, 525, 235, 450, 75, '#2563EB'),
    card('trn_psc_sa', 'PSC Service Attachments', 'Expose internal services to partner consumer VPCs', ICON.psc, 1005, 235, 530, 75, '#2563EB'),

    // Lane 3: Private Application VPC Workloads
    lane('workloads', 3, 'PRIVATE APPLICATION VPC WORKLOADS (NO PUBLIC IPS)', 'Workload execution in fully isolated RFC 1918 subnets', 20, 350, 1540, 150, '#047857', '#FFFFFF'),
    card('wrk_gke', 'GKE Private Autopilot Cluster', 'Nodes have private RFC 1918 IPs only (10.0.1.0/24)', ICON.gke, 45, 405, 450, 75, '#1D4ED8'),
    card('wrk_run', 'Cloud Run Direct VPC Egress', 'Serverless microservices with sub-millisecond VPC transit', ICON.run, 525, 405, 450, 75, '#2563EB'),
    card('wrk_sql', 'Cloud SQL Private Service Access', 'Managed HA PostgreSQL with dedicated VPC peering IP', ICON.db, 1005, 405, 530, 75, '#7C3AED'),

    // Lane 4: Controlled Outbound Egress & Proxy Tier
    lane('egress', 4, 'CONTROLLED OUTBOUND EGRESS & SECURE WEB PROXY', 'Static NAT IPs and deep TLS inspection for outbound traffic', 20, 520, 1540, 150, '#D97706', '#FFFFFF'),
    card('egr_nat', 'Cloud NAT Gateway', 'Deterministic static IP pool for external third-party allowlisting', ICON.nat, 45, 575, 450, 75, '#0284C7'),
    card('egr_swp', 'Secure Web Proxy (SWP)', 'TLS inspection, URL domain filtering & zero-trust egress policies', ICON.swp, 525, 575, 450, 75, '#059669'),
    card('egr_vpna', 'VPC Service Controls (VPC-SC)', 'Cryptographic perimeter preventing data exfiltration', ICON.armor, 1005, 575, 530, 75, '#DC2626'),

    // Lane 5: Security Operations & Network Telemetry Plane
    lane('telemetry', 5, 'NETWORK TELEMETRY & SECURITY OPERATIONS PLANE', 'Continuous packet flow analysis and topology verification', 20, 690, 1540, 140, '#047857', '#FFFFFF'),
    card('tel_flow', 'VPC Flow Logs & Cloud Logging', '100% network traffic logging exported to BigQuery for analysis', ICON.log, 45, 745, 460, 70, '#059669'),
    card('tel_mirror', 'Packet Mirroring & IDS', 'Live packet capture routed to network inspection appliances', ICON.monitor, 545, 745, 450, 70, '#059669'),
    card('tel_nic', 'Network Intelligence Center', 'Performance Dashboard & Connectivity Tests validator', ICON.monitor, 1035, 745, 500, 70, '#059669'),

    // Edges
    edge('e_armor_gclb', 'edg_armor', 'edg_gclb', 'Clean Ingress', 'request'),
    edge('e_gclb_ilb', 'edg_gclb', 'trn_ilb', 'Cross-VPC Proxy', 'request'),
    edge('e_ilb_gke', 'trn_ilb', 'wrk_gke', 'Private Ingress', 'request'),
    edge('e_ilb_run', 'trn_ilb', 'wrk_run', 'Private Ingress', 'request'),
    edge('e_gke_psc', 'wrk_gke', 'trn_psc_ep', 'Call Google APIs', 'request'),
    edge('e_gke_sql', 'wrk_gke', 'wrk_sql', 'Private SQL', 'request'),
    edge('e_gke_nat', 'wrk_gke', 'egr_nat', 'Outbound Internet', 'request'),
    edge('e_run_swp', 'wrk_run', 'egr_swp', 'Egress Inspection', 'request'),
    edge('e_inter_gke', 'edg_interconnect', 'wrk_gke', 'On-Prem Hybrid Transit', 'request'),
    edge('e_flow_log', 'wrk_gke', 'tel_flow', '100% Flow Sampling', 'governance', 0.5, 1, 0.5, 0),
  ];

  return `<mxfile host="app.diagrams.net" modified="2026-08-21T00:35:00.000Z" agent="PromptCanvas Blueprint 56" version="24.7.17" type="device">
  <diagram id="catalog_private_ingress_egress_connectivity" name="Private Ingress, Egress &amp; Service Connectivity Architecture">
    <mxGraphModel dx="1600" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="950" background="#F8FAFC">
      <root>
        ${cells.join('\n        ')}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}

export const MASTER_PRIVATE_INGRESS_EGRESS_XML = buildMasterPrivateIngressEgressXml();
