/**
 * 🎨 Blueprint #53 (NEW-REL-03): Highly Available Multi-Region Active-Active Application Architecture
 * High-Craft Master Blueprint (Benchmark Pattern following Blueprint 50)
 * 
 * Featuring:
 * - Global Ingress & Traffic Management (Cloud DNS, Anycast HTTPS LB, Cloud Armor WAF, Edge Health Checks)
 * - Dual-Region Compute: Primary Region A (us-central1) & Secondary Region B (us-east4) with 50/50 active-active load sharing
 * - Multi-Region Synchronous Data Tier: Cloud Spanner (nam3 TrueTime), Dual-Region GCS Turbo Replication, Cloud KMS CMEK
 * - SRE Observability & Automated Failover Plane (SLO budgets, Cloud Monitoring, Cross-Region Health Probes)
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
  gclb: svg('<rect x="8" y="10" width="32" height="12" rx="3" fill="#0284C7"/><circle cx="14" cy="36" r="5" fill="#0284C7"/><circle cx="24" cy="36" r="5" fill="#0284C7"/><circle cx="34" cy="36" r="5" fill="#0284C7"/><path d="M14 22v9m10-9v9m10-9v9" stroke="#0284C7" stroke-width="2.5"/>'),
  armor: svg('<path d="M24 4 40 10v12c0 11-6.5 18-16 22C14.5 40 8 33 8 22V10z" fill="#DC2626"/><path d="m16 24 5 5 11-13" fill="none" stroke="#fff" stroke-width="3"/>'),
  gke: svg('<rect x="6" y="6" width="36" height="36" rx="8" fill="#1D4ED8"/><path d="m24 12 11 6v12l-11 6-11-6V18z" fill="none" stroke="#fff" stroke-width="2.5"/><circle cx="24" cy="24" r="3" fill="#fff"/>'),
  spanner: svg('<path d="M24 6 40 15v18L24 42 8 33V15z" fill="#1D4ED8"/><path d="M16 20h16v8H16z" fill="#fff"/>'),
  gcs: svg('<rect x="8" y="10" width="32" height="28" rx="4" fill="#0284C7"/><path d="M14 18h20M14 24h20M14 30h12" stroke="#fff" stroke-width="2"/>'),
  redis: svg('<ellipse cx="24" cy="12" rx="14" ry="6" fill="#DC2626"/><path d="M10 12v18c0 3.3 6.3 6 14 6s14-2.7 14-6V12" fill="#F87171"/><ellipse cx="24" cy="30" rx="14" ry="6" fill="#DC2626"/>'),
  nat: svg('<rect x="8" y="8" width="32" height="32" rx="6" fill="#0284C7"/><path d="M14 24h20m-6-6l6 6-6 6" stroke="#fff" stroke-width="2.5"/>'),
  key: svg('<circle cx="17" cy="21" r="9" fill="none" stroke="#16A34A" stroke-width="5"/><path d="m24 25 15 15m-7-8 5-5m-10 0 5-5" stroke="#16A34A" stroke-width="4"/>'),
  monitor: svg('<rect x="6" y="8" width="36" height="26" rx="3" fill="#16A34A"/><path d="m11 28 7-7 5 4 8-11 6 6" fill="none" stroke="#fff" stroke-width="2.5"/><path d="M18 40h12M24 34v6" stroke="#16A34A" stroke-width="3"/>'),
  log: svg('<rect x="10" y="6" width="28" height="36" rx="3" fill="#16A34A"/><path d="M16 15h16M16 23h16M16 31h10" stroke="#fff" stroke-width="2.5"/>'),
  dns: svg('<rect x="8" y="8" width="32" height="32" rx="6" fill="#0284C7"/><path d="M14 16h20M14 24h20M14 32h14" stroke="#fff" stroke-width="2.5"/>')
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

export function buildMasterHaMultiRegionAppXml(): string {
  const cells: string[] = [
    '<mxCell id="0"/>',
    '<mxCell id="1" parent="0"/>',

    // Lane 1: Global Ingress & Traffic Management
    lane('ingress', 1, 'GLOBAL INGRESS & TRAFFIC MANAGEMENT', 'Anycast IP routing, Cloud Armor DDoS, sub-second failover', 20, 20, 1540, 140, '#0284C7', '#F0F9FF'),
    card('in_dns', 'Cloud DNS Geo-Routing', 'Low-latency Anycast DNS resolution with DNSSEC', ICON.dns, 45, 75, 270, 70, '#0284C7'),
    card('in_gclb', 'Global External HTTPS Load Balancer', 'Single Anycast Virtual IP with 50/50 active-active load sharing', ICON.gclb, 345, 75, 420, 70, '#0284C7'),
    card('in_armor', 'Cloud Armor WAF (DDoS Mitigation)', 'Adaptive rate limiting, Bot management & geo-blocking', ICON.armor, 795, 75, 380, 70, '#DC2626'),
    card('in_health', 'Sub-Second Edge Health Probes', 'Continuous backend latency checks & automated failover', ICON.monitor, 1205, 75, 330, 70, '#16A34A'),

    // Lane 2: Dual Active-Active Regions
    lane('regions', 2, 'ACTIVE-ACTIVE DUAL REGION COMPUTE PLATFORM (99.999% SLA TARGET)', 'Simultaneous active traffic handling across US-Central and US-East regions', 20, 180, 1540, 310, '#1D4ED8', '#EFF6FF'),

    // Primary Region A (us-central1)
    cell('reg_a_box', '', 'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#1D4ED8;strokeWidth=1.5;', 45, 235, 710, 235),
    cell('reg_a_title', '<b>Primary Region A (us-central1 - Iowa)</b>', 'text;html=1;whiteSpace=wrap;align=left;verticalAlign=middle;fontColor=#1D4ED8;fontSize=13;', 65, 245, 400, 25),
    card('reg_a_gke', 'GKE Autopilot Cluster A', 'Production container pods (10.10.0.0/16)', ICON.gke, 65, 280, 320, 70, '#1D4ED8'),
    card('reg_a_redis', 'Memorystore Redis Cache A', 'Regional in-memory session store (HA)', ICON.redis, 410, 280, 320, 70, '#DC2626'),
    card('reg_a_nat', 'Cloud NAT Gateway A', 'Static outbound IP managed egress', ICON.nat, 65, 365, 320, 70, '#0284C7'),
    card('reg_a_log', 'Cloud Logging Agent A', 'Regional log sinks & telemetry buffering', ICON.log, 410, 365, 320, 70, '#16A34A'),

    // Secondary Region B (us-east4)
    cell('reg_b_box', '', 'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#1D4ED8;strokeWidth=1.5;', 785, 235, 750, 235),
    cell('reg_b_title', '<b>Secondary Region B (us-east4 - N. Virginia)</b>', 'text;html=1;whiteSpace=wrap;align=left;verticalAlign=middle;fontColor=#1D4ED8;fontSize=13;', 805, 245, 400, 25),
    card('reg_b_gke', 'GKE Autopilot Cluster B', 'Production container pods (10.20.0.0/16)', ICON.gke, 805, 280, 340, 70, '#1D4ED8'),
    card('reg_b_redis', 'Memorystore Redis Cache B', 'Regional in-memory session store (HA)', ICON.redis, 1170, 280, 340, 70, '#DC2626'),
    card('reg_b_nat', 'Cloud NAT Gateway B', 'Static outbound IP managed egress', ICON.nat, 805, 365, 340, 70, '#0284C7'),
    card('reg_b_log', 'Cloud Logging Agent B', 'Regional log sinks & telemetry buffering', ICON.log, 1170, 365, 340, 70, '#16A34A'),

    // Lane 3: Multi-Region Synchronous Data Tier
    lane('data', 3, 'MULTI-REGION SYNCHRONOUS DATA & STORAGE TIER', 'TrueTime globally distributed ACID database and Turbo Replicated object store', 20, 510, 1540, 190, '#EA580C', '#FFFBEB'),
    card('dt_spanner', 'Cloud Spanner (nam3 Config)', 'Multi-Region TrueTime consensus replication across 3 read-write regions', ICON.spanner, 45, 575, 480, 95, '#1D4ED8'),
    card('dt_gcs', 'Dual-Region Cloud Storage (GCS)', 'Turbo Replication with 15-minute RPO/RTO disaster recovery SLA', ICON.gcs, 555, 575, 470, 95, '#0284C7'),
    card('dt_kms', 'Cloud KMS Multi-Region CMEK', 'Envelope encryption with hardware HSM keys replicated globally', ICON.key, 1055, 575, 480, 95, '#16A34A'),

    // Lane 4: SRE Observability & Automated Failover Plane
    lane('sre', 4, 'SRE OBSERVABILITY & AUTOMATED FAILOVER PLANE', 'Continuous SLO monitoring, global anomaly detection and disaster recovery runbooks', 20, 720, 1540, 190, '#16A34A', '#F0FDF4'),
    card('sre_mon', 'Cloud Monitoring SLO Budgets', 'Cross-region error budget consumption tracking', ICON.monitor, 45, 785, 360, 95, '#16A34A'),
    card('sre_fail', 'Automated Health-Check Failover', 'Instantaneous traffic drain from degraded region', ICON.monitor, 435, 785, 360, 95, '#16A34A'),
    card('sre_trace', 'Cloud Trace Distributed Tracing', 'Cross-region latency spans & bottleneck analytics', ICON.log, 825, 785, 360, 95, '#16A34A'),
    card('sre_audit', 'Cloud Audit & Compliance Logs', 'Immutable tamper-proof audit trail for regulatory sign-off', ICON.log, 1215, 785, 320, 95, '#16A34A'),

    // Edges
    edge('e_dns_gclb', 'in_dns', 'in_gclb', 'Geo Routing', 'request'),
    edge('e_gclb_armor', 'in_gclb', 'in_armor', 'WAF Filtering', 'request'),
    edge('e_armor_gkea', 'in_armor', 'reg_a_gke', '50% Traffic (us-central1)', 'request', 0.25, 1, 0.5, 0),
    edge('e_armor_gkeb', 'in_armor', 'reg_b_gke', '50% Traffic (us-east4)', 'request', 0.75, 1, 0.5, 0),
    edge('e_gkea_span', 'reg_a_gke', 'dt_spanner', 'TrueTime ACID Writes', 'request', 0.5, 1, 0.25, 0),
    edge('e_gkeb_span', 'reg_b_gke', 'dt_spanner', 'TrueTime ACID Writes', 'request', 0.5, 1, 0.75, 0),
    edge('e_gkea_gcs', 'reg_a_box', 'dt_gcs', 'Turbo Replication Sync', 'request', 0.8, 1, 0.3, 0),
    edge('e_gkeb_gcs', 'reg_b_box', 'dt_gcs', 'Turbo Replication Sync', 'request', 0.2, 1, 0.7, 0),
    edge('e_sre_fail_gclb', 'sre_fail', 'in_gclb', 'Automated Health Failover Trigger', 'governance', 0.5, 0, 0.5, 1, [[615, 710], [555, 710]]),
  ];

  return `<mxfile host="embed.diagrams.net" modified="2026-08-20T22:00:00.000Z" agent="PromptCanvas" version="24.0.0" type="embed">
  <diagram id="catalog_ha_multi_region_application" name="Highly Available Multi-Region Active-Active Application Architecture">
    <mxGraphModel dx="1600" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="950" background="#FFFFFF">
      <root>
        ${cells.join('\n        ')}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}

export const MASTER_HA_MULTI_REGION_APP_XML = buildMasterHaMultiRegionAppXml();
