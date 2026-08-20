/**
 * 🎨 Blueprint #53 (NEW-REL-03): Highly Available Multi-Region Active-Active Application Architecture
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
  gclb: svg('<rect x="8" y="10" width="32" height="12" rx="3" fill="#2563EB"/><circle cx="14" cy="36" r="5" fill="#2563EB"/><circle cx="24" cy="36" r="5" fill="#2563EB"/><circle cx="34" cy="36" r="5" fill="#2563EB"/><path d="M14 22v9m10-9v9m10-9v9" stroke="#2563EB" stroke-width="2.5"/>'),
  armor: svg('<path d="M24 4 40 10v12c0 11-6.5 18-16 22C14.5 40 8 33 8 22V10z" fill="#DC2626"/><path d="m16 24 5 5 11-13" fill="none" stroke="#fff" stroke-width="3"/>'),
  gke: svg('<rect x="6" y="6" width="36" height="36" rx="8" fill="#1D4ED8"/><path d="m24 12 11 6v12l-11 6-11-6V18z" fill="none" stroke="#fff" stroke-width="2.5"/><circle cx="24" cy="24" r="3" fill="#fff"/>'),
  spanner: svg('<path d="M24 6 40 15v18L24 42 8 33V15z" fill="#1D4ED8"/><path d="M16 20h16v8H16z" fill="#fff"/>'),
  gcs: svg('<rect x="8" y="10" width="32" height="28" rx="4" fill="#0284C7"/><path d="M14 18h20M14 24h20M14 30h12" stroke="#fff" stroke-width="2"/>'),
  redis: svg('<ellipse cx="24" cy="12" rx="14" ry="6" fill="#DC2626"/><path d="M10 12v18c0 3.3 6.3 6 14 6s14-2.7 14-6V12" fill="#F87171"/><ellipse cx="24" cy="30" rx="14" ry="6" fill="#DC2626"/>'),
  nat: svg('<rect x="8" y="8" width="32" height="32" rx="6" fill="#0284C7"/><path d="M14 24h20m-6-6l6 6-6 6" stroke="#fff" stroke-width="2.5"/>'),
  key: svg('<circle cx="17" cy="21" r="9" fill="none" stroke="#059669" stroke-width="4"/><path d="m24 25 15 15m-7-8 5-5m-10 0 5-5" stroke="#059669" stroke-width="3"/>'),
  monitor: svg('<rect x="6" y="8" width="36" height="26" rx="3" fill="#059669"/><path d="m11 28 7-7 5 4 8-11 6 6" fill="none" stroke="#fff" stroke-width="2.5"/><path d="M18 40h12M24 34v6" stroke="#059669" stroke-width="3"/>'),
  log: svg('<rect x="10" y="6" width="28" height="36" rx="3" fill="#059669"/><path d="M16 15h16M16 23h16M16 31h10" stroke="#fff" stroke-width="2.5"/>'),
  dns: svg('<rect x="8" y="8" width="32" height="32" rx="6" fill="#2563EB"/><path d="M14 16h20M14 24h20M14 32h14" stroke="#fff" stroke-width="2.5"/>')
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

export function buildMasterHaMultiRegionAppXml(): string {
  const cells: string[] = [
    '<mxCell id="0"/>',
    '<mxCell id="1" parent="0"/>',

    // Lane 1: Global Ingress & Edge Security
    lane('ingress', 1, 'GLOBAL INGRESS & EDGE SECURITY TIER', 'Global Anycast IP, Cloud Armor WAF & Health Checks', 20, 20, 1540, 140, '#1E3A8A', '#FFFFFF'),
    card('in_dns', 'Cloud DNS Anycast Routing', 'Latency-based geo routing & automatic health failover', ICON.dns, 45, 75, 330, 70, '#2563EB'),
    card('in_gclb', 'Global External HTTPS Load Balancer', 'Single Anycast VIP, TLS 1.3 Termination, Multi-Region backends', ICON.gclb, 410, 75, 430, 70, '#2563EB'),
    card('in_armor', 'Cloud Armor Enterprise WAF', 'Layer 7 DDoS, Bot Management & OWASP Top 10 rules', ICON.armor, 875, 75, 330, 70, '#DC2626'),
    card('in_probe', 'Edge Health Check Probes', 'Continuous 5s HTTP health probes across both regions', ICON.monitor, 1235, 75, 305, 70, '#059669'),

    // Lane 2: Active-Active Regional Application Tier
    lane('compute', 2, 'DUAL-REGION ACTIVE-ACTIVE APPLICATION TIER (50/50 LOAD SHARING)', 'Identical stateless application runtimes with cross-region failover', 20, 180, 1540, 310, '#1D4ED8', '#FFFFFF'),

    // Region A (Primary / us-central1)
    cell('reg_a_box', '', 'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;', 45, 235, 710, 235),
    cell('reg_a_title', '<b>Active Region A — Iowa (us-central1)</b>', 'text;html=1;whiteSpace=wrap;align=left;verticalAlign=middle;fontColor=#1D4ED8;fontSize=13;fontStyle=1;', 65, 245, 400, 25),
    card('reg_a_gke', 'GKE Enterprise Cluster (us-central1)', 'Autopilot regional cluster across 3 availability zones', ICON.gke, 65, 280, 320, 70, '#1D4ED8'),
    card('reg_a_redis', 'Memorystore for Redis (Primary)', 'Read/write caching & session store with in-region replica', ICON.redis, 410, 280, 320, 70, '#DC2626'),
    card('reg_a_nat', 'Cloud NAT & Cloud Router', 'Secure private egress to external payment gateways', ICON.nat, 65, 365, 320, 70, '#0284C7'),
    card('reg_a_hpa', 'Horizontal Pod Autoscaler (HPA)', 'Dynamic pod scaling based on CPU, memory & queue depth', ICON.gke, 410, 365, 320, 70, '#1D4ED8'),

    // Region B (Secondary / us-east4)
    cell('reg_b_box', '', 'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;', 785, 235, 750, 235),
    cell('reg_b_title', '<b>Active Region B — N. Virginia (us-east4)</b>', 'text;html=1;whiteSpace=wrap;align=left;verticalAlign=middle;fontColor=#1D4ED8;fontSize=13;fontStyle=1;', 805, 245, 400, 25),
    card('reg_b_gke', 'GKE Enterprise Cluster (us-east4)', 'Autopilot regional cluster across 3 availability zones', ICON.gke, 805, 280, 340, 70, '#1D4ED8'),
    card('reg_b_redis', 'Memorystore for Redis (Secondary)', 'Warm cache replica with automated failover sync', ICON.redis, 1170, 280, 340, 70, '#DC2626'),
    card('reg_b_nat', 'Cloud NAT & Cloud Router', 'Secure private egress to external payment gateways', ICON.nat, 805, 365, 340, 70, '#0284C7'),
    card('reg_b_hpa', 'Horizontal Pod Autoscaler (HPA)', 'Dynamic pod scaling based on CPU, memory & queue depth', ICON.gke, 1170, 365, 340, 70, '#1D4ED8'),

    // Lane 3: Synchronous Multi-Region Data & Storage Tier
    lane('data', 3, 'SYNCHRONOUS MULTI-REGION DATA & STORAGE TIER', 'Global strongly consistent transactional storage with 99.999% SLA', 20, 510, 1540, 190, '#047857', '#FFFFFF'),
    card('dat_spanner', 'Cloud Spanner Multi-Region (nam3)', 'Synchronous TrueTime ACID transactions across us-central1 & us-east4', ICON.spanner, 45, 575, 460, 95, '#1D4ED8'),
    card('dat_gcs', 'Cloud Storage Dual-Region Bucket', 'Turbo replication (RPO < 15s) with multi-region object redundancy', ICON.gcs, 540, 575, 460, 95, '#0284C7'),
    card('dat_kmek', 'Cloud KMS Multi-Region CMEK', 'Hardware HSM dual-region envelope encryption keys', ICON.key, 1035, 575, 500, 95, '#059669'),

    // Lane 4: SRE Observability & Automated Failover Plane
    lane('sre', 4, 'SRE OBSERVABILITY & AUTOMATED FAILOVER PLANE', 'Continuous SLO tracking, automated drain controller and runbooks', 20, 720, 1540, 190, '#D97706', '#FFFFFF'),
    card('sre_mon', 'Cloud Monitoring & SLO Budgets', 'Cross-region error budget alerting & synthetic availability checks', ICON.monitor, 45, 785, 360, 95, '#EA580C'),
    card('sre_log', 'Cloud Logging Regional Sink', 'High-throughput structured log aggregation & BigQuery export', ICON.log, 435, 785, 350, 95, '#059669'),
    card('sre_failover', 'Automated Regional Drain Controller', 'Cloud Functions + GCLB backend service draining on regional incident', ICON.armor, 815, 785, 360, 95, '#DC2626'),
    card('sre_dnssec', 'Cloud DNS Health Check Failover', 'Automatic DNS record update if whole region becomes unreachable', ICON.dns, 1205, 785, 330, 95, '#2563EB'),

    // Edges
    edge('e_dns_gclb', 'in_dns', 'in_gclb', 'Anycast Resolution', 'request'),
    edge('e_gclb_armor', 'in_gclb', 'in_armor', 'WAF Inspection', 'request'),
    edge('e_gclb_rega', 'in_gclb', 'reg_a_gke', '50% Active Traffic (Iowa)', 'request', 0.25, 1, 0.5, 0),
    edge('e_gclb_regb', 'in_gclb', 'reg_b_gke', '50% Active Traffic (Virginia)', 'request', 0.75, 1, 0.5, 0),
    edge('e_rega_span', 'reg_a_gke', 'dat_spanner', 'Strong Consistent SQL', 'request', 0.5, 1, 0.25, 0),
    edge('e_regb_span', 'reg_b_gke', 'dat_spanner', 'Strong Consistent SQL', 'request', 0.5, 1, 0.75, 0),
    edge('e_rega_gcs', 'reg_a_gke', 'dat_gcs', 'Dual-Region Object Put/Get', 'request', 0.75, 1, 0.25, 0),
    edge('e_regb_gcs', 'reg_b_gke', 'dat_gcs', 'Dual-Region Object Put/Get', 'request', 0.25, 1, 0.75, 0),
    edge('e_fail_drain', 'sre_failover', 'in_gclb', 'Regional Drain Trigger', 'governance', 0.5, 0, 0.5, 1, [[995, 705], [625, 705]]),
    edge('e_probe_both', 'in_probe', 'reg_b_gke', '5s Health Probes', 'governance', 0.5, 1, 0.85, 0),
  ];

  return `<mxfile host="app.diagrams.net" modified="2026-08-21T00:35:00.000Z" agent="PromptCanvas Blueprint 53" version="24.7.17" type="device">
  <diagram id="catalog_ha_multi_region_application" name="Highly Available Multi-Region Active-Active Application Architecture">
    <mxGraphModel dx="1600" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="950" background="#F8FAFC">
      <root>
        ${cells.join('\n        ')}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}

export const MASTER_HA_MULTI_REGION_APP_XML = buildMasterHaMultiRegionAppXml();
