/**
 * 🎨 Blueprint #56 (NEW-NET-06): Private Ingress, Egress & Service Connectivity Architecture
 * High-Craft Master Blueprint (Benchmark Pattern following Blueprint 50)
 * 
 * Featuring:
 * - Edge & Ingress Perimeter (Cloud Armor DDoS/WAF, External HTTPS LB, 100G Dedicated Interconnect)
 * - Private Transit & PSC Layer (Private Service Connect Endpoints, Service Attachments, Internal LB)
 * - Private VPC Subnets (GKE Private Cluster 10.0.1.0/24, Cloud Run Direct Egress, Cloud SQL PSA)
 * - Controlled Outbound Egress Tier (Cloud NAT Gateway static IPs, Secure Web Proxy SWP, DNS Security)
 * - Security Operations Plane (VPC Flow Logs, Packet Mirroring, Network Intelligence Center)
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
  gclb: svg('<rect x="8" y="10" width="32" height="12" rx="3" fill="#0284C7"/><circle cx="14" cy="36" r="5" fill="#0284C7"/><circle cx="24" cy="36" r="5" fill="#0284C7"/><circle cx="34" cy="36" r="5" fill="#0284C7"/><path d="M14 22v9m10-9v9m10-9v9" stroke="#0284C7" stroke-width="2.5"/>'),
  interconnect: svg('<rect x="8" y="14" width="32" height="20" rx="4" fill="#0284C7"/><path d="M14 24h20M24 14v20" stroke="#fff" stroke-width="3"/>'),
  psc: svg('<circle cx="16" cy="24" r="8" fill="#0284C7"/><circle cx="32" cy="24" r="8" fill="#0284C7"/><path d="M16 24h16" stroke="#fff" stroke-width="3"/>'),
  gke: svg('<rect x="6" y="6" width="36" height="36" rx="8" fill="#1D4ED8"/><path d="m24 12 11 6v12l-11 6-11-6V18z" fill="none" stroke="#fff" stroke-width="2.5"/><circle cx="24" cy="24" r="3" fill="#fff"/>'),
  run: svg('<path d="M9 10 31 24 9 38l9-14z" fill="#4285F4"/><path d="M26 10 39 24 26 38l6-14z" fill="#7456C2"/>'),
  db: svg('<ellipse cx="24" cy="11" rx="14" ry="6" fill="#7E57C2"/><path d="M10 11v24c0 3.3 6.3 6 14 6s14-2.7 14-6V11" fill="#B8A6E6"/><ellipse cx="24" cy="35" rx="14" ry="6" fill="#7E57C2"/>'),
  nat: svg('<rect x="8" y="8" width="32" height="32" rx="6" fill="#0284C7"/><path d="M14 24h20m-6-6l6 6-6 6" stroke="#fff" stroke-width="2.5"/>'),
  swp: svg('<rect x="8" y="8" width="32" height="32" rx="6" fill="#16A34A"/><circle cx="24" cy="24" r="8" fill="none" stroke="#fff" stroke-width="2.5"/>'),
  dns: svg('<rect x="8" y="8" width="32" height="32" rx="6" fill="#0284C7"/><path d="M14 16h20M14 24h20M14 32h14" stroke="#fff" stroke-width="2.5"/>'),
  log: svg('<rect x="10" y="6" width="28" height="36" rx="3" fill="#16A34A"/><path d="M16 15h16M16 23h16M16 31h10" stroke="#fff" stroke-width="2.5"/>'),
  monitor: svg('<rect x="6" y="8" width="36" height="26" rx="3" fill="#16A34A"/><path d="m11 28 7-7 5 4 8-11 6 6" fill="none" stroke="#fff" stroke-width="2.5"/><path d="M18 40h12M24 34v6" stroke="#16A34A" stroke-width="3"/>')
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

export function buildMasterPrivateIngressEgressXml(): string {
  const cells: string[] = [
    '<mxCell id="0"/>',
    '<mxCell id="1" parent="0"/>',

    // Lane 1: Edge & Ingress Perimeter
    lane('edge', 1, 'EDGE & INGRESS PERIMETER', 'Cloud Armor WAF, External HTTPS LB & Dedicated Interconnect', 20, 20, 280, 680, '#DC2626', '#FEF2F2'),
    card('ed_armor', 'Cloud Armor DDoS & WAF', 'Layer 7 adaptive protection & OWASP Top 10 rules', ICON.armor, 38, 85, 244, 90, '#DC2626'),
    card('ed_gclb', 'External Application LB', 'Global Anycast IP with SSL/TLS termination', ICON.gclb, 38, 200, 244, 90, '#0284C7'),
    card('ed_inter', 'Dedicated Interconnect (100G)', 'Private Layer 3 BGP peering from corporate DC', ICON.interconnect, 38, 315, 244, 90, '#0284C7'),
    card('ed_router', 'Cloud Router (HA BGP)', 'Dynamic prefix exchange & custom route advertisement', ICON.nat, 38, 430, 244, 90, '#0284C7'),

    // Lane 2: Private Transit & PSC Layer
    lane('transit', 2, 'PRIVATE TRANSIT & PSC LAYER', 'Private Service Connect endpoints, service attachments & ILB', 320, 20, 340, 680, '#0284C7', '#F0F9FF'),
    card('tr_psc_ep', 'Private Service Connect Endpoints', 'Non-routable 1:1 consumer forwarding IP rules', ICON.psc, 338, 85, 304, 95, '#0284C7'),
    card('tr_psc_att', 'PSC Service Attachments', 'Publish managed enterprise services across VPCs', ICON.psc, 338, 210, 304, 95, '#0284C7'),
    card('tr_ilb', 'Internal Regional App LB', 'Private Layer 7 proxy for microservice routing', ICON.gclb, 338, 335, 304, 95, '#0284C7'),
    card('tr_psa', 'Private Service Access (PSA)', 'VPC peering connection for Google-managed services', ICON.psc, 338, 460, 304, 85, '#0284C7'),

    // Lane 3: Private Application VPC Subnets
    lane('subnets', 3, 'PRIVATE APPLICATION VPC SUBNETS', 'Zero public IP compute workloads with strict microsegmentation', 680, 20, 440, 680, '#1D4ED8', '#EFF6FF'),
    card('sub_gke', 'GKE Enterprise Private Cluster', 'Worker nodes with zero external IPs (10.0.1.0/24)', ICON.gke, 698, 85, 404, 100, '#1D4ED8'),
    card('sub_run', 'Cloud Run (Direct VPC Egress)', 'Serverless containers routing all traffic to VPC (10.0.2.0/24)', ICON.run, 698, 215, 404, 100, '#1D4ED8'),
    card('sub_db', 'Cloud SQL for PostgreSQL (PSA)', 'Private IP database endpoint with no public gateway (10.0.3.0/24)', ICON.db, 698, 345, 404, 100, '#1D4ED8'),

    // Lane 4: Controlled Outbound Egress Tier
    lane('egress', 4, 'CONTROLLED OUTBOUND EGRESS TIER', 'Static NAT egress IPs, Secure Web Proxy TLS inspection', 1140, 20, 420, 680, '#16A34A', '#F0FDF4'),
    card('eg_nat', 'Cloud NAT Gateway', 'Deterministic static egress IP for third-party allowlisting', ICON.nat, 1158, 85, 384, 95, '#0284C7'),
    card('eg_swp', 'Secure Web Proxy (SWP)', 'TLS interception, domain category filtering & URL inspect', ICON.swp, 1158, 210, 384, 95, '#16A34A'),
    card('eg_dns', 'DNS Security Policies', 'Outbound DNS exfiltration defense & RPZ filtering', ICON.dns, 1158, 335, 384, 95, '#16A34A'),

    // Lane 5: Security Operations Plane
    lane('secops', 5, 'NETWORK SECURITY OPERATIONS & OBSERVABILITY PLANE', 'Deep packet inspection, flow log analytics & topology intelligence', 20, 720, 1540, 190, '#16A34A', '#F0FDF4'),
    card('ops_flow', 'VPC Flow Logs & Aggregation', '100% network conversation sampling to Cloud Logging', ICON.log, 45, 785, 470, 95, '#16A34A'),
    card('ops_mirror', 'Packet Mirroring Service', 'Mirroring raw VPC traffic to intrusion detection (IDS/IPS)', ICON.shield, 545, 785, 470, 95, '#16A34A'),
    card('ops_nic', 'Network Intelligence Center', 'Topology graph visualizer & performance dashboard', ICON.monitor, 1045, 785, 490, 95, '#16A34A'),

    // Edges
    edge('e_armor_gclb', 'ed_armor', 'ed_gclb', 'Clean Ingress', 'request', 0.5, 1, 0.5, 0),
    edge('e_gclb_psc', 'ed_gclb', 'tr_psc_ep', 'PSC Forward', 'request'),
    edge('e_inter_router', 'ed_inter', 'ed_router', 'BGP Transit', 'request', 0.5, 1, 0.5, 0),
    edge('e_router_ilb', 'ed_router', 'tr_ilb', 'Private Direct', 'request'),
    edge('e_psc_gke', 'tr_psc_ep', 'sub_gke', 'Route to GKE', 'request'),
    edge('e_ilb_run', 'tr_ilb', 'sub_run', 'Forward Container', 'request'),
    edge('e_gke_db', 'sub_gke', 'sub_db', 'PSA SQL Query', 'request', 0.5, 1, 0.5, 0),
    edge('e_gke_nat', 'sub_gke', 'eg_nat', 'Outbound Internet', 'request', 1, 0.25, 0, 0.25),
    edge('e_run_swp', 'sub_run', 'eg_swp', 'Egress Inspection', 'request'),
    edge('e_flow_ops', 'subnets', 'ops_flow', 'Capture Flow Logs', 'governance', 0.25, 1, 0.5, 0),
    edge('e_mirror_ops', 'subnets', 'ops_mirror', 'Mirror Packets', 'governance', 0.75, 1, 0.5, 0),
  ];

  return `<mxfile host="embed.diagrams.net" modified="2026-08-20T22:00:00.000Z" agent="PromptCanvas" version="24.0.0" type="embed">
  <diagram id="catalog_private_ingress_egress_connectivity" name="Private Ingress, Egress &amp; Service Connectivity Architecture">
    <mxGraphModel dx="1600" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="950" background="#FFFFFF">
      <root>
        ${cells.join('\n        ')}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}

export const MASTER_PRIVATE_INGRESS_EGRESS_XML = buildMasterPrivateIngressEgressXml();
