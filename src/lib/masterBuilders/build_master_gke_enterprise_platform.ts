/**
 * 🎨 Blueprint #52 (NEW-PLAT-02): GKE / Kubernetes Enterprise Platform Architecture
 * High-Craft Master Blueprint (Benchmark Pattern following Blueprint 50)
 * 
 * Featuring:
 * - Multi-Cluster Ingress & Fleet Control Plane (Cloud DNS, MCI, Config Sync GitOps)
 * - Multi-Cluster GKE Fleet (Cluster A us-central1 & Cluster B us-east4)
 * - Cloud Service Mesh (mTLS 1.3), Cilium eBPF CNI, Workload Identity
 * - Platform Services & Persistence Tier (Prometheus, Logging, Cloud Spanner, Redis)
 * - Security & Governance Foundation (Binary Authorization, Policy Controller, SCC)
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
  gke: svg('<rect x="6" y="6" width="36" height="36" rx="8" fill="#1D4ED8"/><path d="m24 12 11 6v12l-11 6-11-6V18z" fill="none" stroke="#fff" stroke-width="2.5"/><circle cx="24" cy="24" r="3" fill="#fff"/>'),
  mesh: svg('<circle cx="14" cy="14" r="6" fill="#0284C7"/><circle cx="34" cy="14" r="6" fill="#0284C7"/><circle cx="24" cy="34" r="6" fill="#0284C7"/><path d="M14 14l20 0M14 14l10 20M34 14l-10 20" stroke="#0284C7" stroke-width="2.5"/>'),
  gitops: svg('<circle cx="16" cy="16" r="6" fill="#9333EA"/><circle cx="32" cy="32" r="6" fill="#9333EA"/><path d="M16 16v16h16" fill="none" stroke="#9333EA" stroke-width="3"/>'),
  dns: svg('<rect x="8" y="8" width="32" height="32" rx="6" fill="#0284C7"/><path d="M14 16h20M14 24h20M14 32h14" stroke="#fff" stroke-width="2.5"/>'),
  mci: svg('<rect x="8" y="10" width="32" height="12" rx="3" fill="#0284C7"/><circle cx="14" cy="36" r="5" fill="#0284C7"/><circle cx="34" cy="36" r="5" fill="#0284C7"/><path d="M14 22v9m20-9v9" stroke="#0284C7" stroke-width="2.5"/>'),
  spanner: svg('<path d="M24 6 40 15v18L24 42 8 33V15z" fill="#1D4ED8"/><path d="M16 20h16v8H16z" fill="#fff"/>'),
  redis: svg('<ellipse cx="24" cy="12" rx="14" ry="6" fill="#DC2626"/><path d="M10 12v18c0 3.3 6.3 6 14 6s14-2.7 14-6V12" fill="#F87171"/><ellipse cx="24" cy="30" rx="14" ry="6" fill="#DC2626"/>'),
  auth: svg('<circle cx="24" cy="15" r="8" fill="#16A34A"/><path d="M9 41c2-11 8-16 15-16s13 5 15 16" fill="#16A34A"/><rect x="28" y="28" width="12" height="10" rx="2" fill="#fff" stroke="#16A34A" stroke-width="2"/>'),
  shield: svg('<path d="M24 4 40 10v12c0 11-6.5 18-16 22C14.5 40 8 33 8 22V10z" fill="#16A34A"/><path d="m16 24 5 5 11-13" fill="none" stroke="#fff" stroke-width="3"/>'),
  monitor: svg('<rect x="6" y="8" width="36" height="26" rx="3" fill="#EA580C"/><path d="m11 28 7-7 5 4 8-11 6 6" fill="none" stroke="#fff" stroke-width="2.5"/><path d="M18 40h12M24 34v6" stroke="#EA580C" stroke-width="3"/>'),
  log: svg('<rect x="10" y="6" width="28" height="36" rx="3" fill="#16A34A"/><path d="M16 15h16M16 23h16M16 31h10" stroke="#fff" stroke-width="2.5"/>'),
  key: svg('<circle cx="17" cy="21" r="9" fill="none" stroke="#16A34A" stroke-width="5"/><path d="m24 25 15 15m-7-8 5-5m-10 0 5-5" stroke="#16A34A" stroke-width="4"/>')
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

export function buildMasterGkeEnterprisePlatformXml(): string {
  const cells: string[] = [
    '<mxCell id="0"/>',
    '<mxCell id="1" parent="0"/>',

    // Lane 1: Ingress & Fleet Control Plane
    lane('control', 1, 'INGRESS & FLEET CONTROL PLANE', 'Global traffic routing, DNS, Multi-Cluster Ingress & GitOps', 20, 20, 1540, 140, '#0284C7', '#F0F9FF'),
    card('ctl_dns', 'Cloud DNS Anycast', 'Global low-latency DNS resolution & DNSSEC', ICON.dns, 45, 75, 270, 70, '#0284C7'),
    card('ctl_mci', 'Global Multi-Cluster Ingress (MCI)', 'Cross-cluster active-active HTTP(S) load balancing', ICON.mci, 345, 75, 340, 70, '#0284C7'),
    card('ctl_gitops', 'Config Sync GitOps Repository', 'Declarative multi-cluster policy & config synchronization', ICON.gitops, 715, 75, 380, 70, '#9333EA'),
    card('ctl_fleet', 'GKE Enterprise Fleet Manager', 'Unified cluster membership & service mesh management', ICON.gke, 1125, 75, 410, 70, '#0284C7'),

    // Lane 2: Multi-Cluster GKE Fleet
    lane('fleet', 2, 'MULTI-CLUSTER GKE FLEET (GKE ENTERPRISE)', 'Cross-region resilient container platform with Cloud Service Mesh', 20, 180, 1540, 310, '#1D4ED8', '#EFF6FF'),
    
    // Cluster A Container (us-central1)
    cell('cl_a_box', '', 'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#1D4ED8;strokeWidth=1.5;', 45, 235, 710, 235),
    cell('cl_a_title', '<b>Primary GKE Enterprise Cluster A (us-central1)</b>', 'text;html=1;whiteSpace=wrap;align=left;verticalAlign=middle;fontColor=#1D4ED8;fontSize=13;', 65, 245, 400, 25),
    card('cl_a_mesh', 'Cloud Service Mesh (mTLS 1.3)', 'Istio / Envoy proxy sidecars with strict mTLS', ICON.mesh, 65, 280, 320, 70, '#0284C7'),
    card('cl_a_cilium', 'Cilium eBPF CNI Policies', 'Kernel-level microsegmentation & DDoS defense', ICON.shield, 410, 280, 320, 70, '#16A34A'),
    card('cl_a_wif', 'Workload Identity Federation', 'KSA to GSA short-lived token impersonation', ICON.auth, 65, 365, 320, 70, '#16A34A'),
    card('cl_a_auto', 'Cluster Autoscaler & NAP', 'Node auto-provisioning with GKE Autopilot', ICON.gke, 410, 365, 320, 70, '#1D4ED8'),

    // Cluster B Container (us-east4)
    cell('cl_b_box', '', 'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#1D4ED8;strokeWidth=1.5;', 785, 235, 750, 235),
    cell('cl_b_title', '<b>Secondary GKE Enterprise Cluster B (us-east4)</b>', 'text;html=1;whiteSpace=wrap;align=left;verticalAlign=middle;fontColor=#1D4ED8;fontSize=13;', 805, 245, 400, 25),
    card('cl_b_mesh', 'Cloud Service Mesh (mTLS 1.3)', 'Cross-region peer mesh service discovery', ICON.mesh, 805, 280, 340, 70, '#0284C7'),
    card('cl_b_cilium', 'Cilium eBPF CNI Policies', 'Kernel-level microsegmentation & DDoS defense', ICON.shield, 1170, 280, 340, 70, '#16A34A'),
    card('cl_b_wif', 'Workload Identity Federation', 'KSA to GSA short-lived token impersonation', ICON.auth, 805, 365, 340, 70, '#16A34A'),
    card('cl_b_auto', 'Cluster Autoscaler & NAP', 'Node auto-provisioning with GKE Autopilot', ICON.gke, 1170, 365, 340, 70, '#1D4ED8'),

    // Lane 3: Platform Services & Persistence Tier
    lane('platform', 3, 'PLATFORM SERVICES & PERSISTENCE TIER', 'Enterprise storage, caching, secret management and monitoring', 20, 510, 1540, 190, '#EA580C', '#FFFBEB'),
    card('plt_prom', 'Managed Prometheus', 'Global metrics aggregation & PromQL dashboards', ICON.monitor, 45, 575, 280, 95, '#EA580C'),
    card('plt_log', 'Cloud Logging & Tracing', 'Cloud Trace latency profiling & centralized audit logs', ICON.log, 345, 575, 280, 95, '#16A34A'),
    card('plt_sec', 'Secret Manager & KMS', 'Dynamic secret injection via CSI Driver & CMEK', ICON.key, 645, 575, 280, 95, '#16A34A'),
    card('plt_span', 'Cloud Spanner (nam3)', 'Multi-Region TrueTime distributed transactional DB', ICON.spanner, 945, 575, 290, 95, '#1D4ED8'),
    card('plt_redis', 'Memorystore for Redis', 'Multi-zone in-memory caching & session store', ICON.redis, 1255, 575, 280, 95, '#DC2626'),

    // Lane 4: Security & Governance Foundation
    lane('security', 4, 'SECURITY & GOVERNANCE FOUNDATION', 'End-to-end container security, admission control and threat detection', 20, 720, 1540, 190, '#16A34A', '#F0FDF4'),
    card('sec_binauth', 'Binary Authorization', 'Signature verification & supply chain attestations', ICON.shield, 45, 785, 340, 95, '#16A34A'),
    card('sec_policy', 'Policy Controller (Gatekeeper)', 'OPA-based declarative admission webhooks', ICON.shield, 415, 785, 340, 95, '#16A34A'),
    card('sec_scc', 'Security Command Center (SCC)', 'Container threat detection & posture management', ICON.shield, 785, 785, 360, 95, '#16A34A'),
    card('sec_vuln', 'Artifact Analysis Scanner', 'Automated container image CVE scanning', ICON.shield, 1175, 785, 360, 95, '#16A34A'),

    // Edges
    edge('e_dns_mci', 'ctl_dns', 'ctl_mci', 'DNS Routing', 'request'),
    edge('e_mci_cla', 'ctl_mci', 'cl_a_mesh', 'Traffic us-central1', 'request', 0.25, 1, 0.5, 0),
    edge('e_mci_clb', 'ctl_mci', 'cl_b_mesh', 'Traffic us-east4', 'request', 0.75, 1, 0.5, 0),
    edge('e_git_cla', 'ctl_gitops', 'cl_a_box', 'GitOps Sync', 'governance', 0.25, 1, 0.5, 0),
    edge('e_git_clb', 'ctl_gitops', 'cl_b_box', 'GitOps Sync', 'governance', 0.75, 1, 0.5, 0),
    edge('e_mesh_cross', 'cl_a_mesh', 'cl_b_mesh', 'Cross-Cluster mTLS 1.3 Service Mesh', 'request', 1, 0.5, 0, 0.5),
    edge('e_cla_span', 'cl_a_box', 'plt_span', 'ACID SQL Writes', 'request', 0.75, 1, 0.25, 0),
    edge('e_clb_span', 'cl_b_box', 'plt_span', 'ACID SQL Writes', 'request', 0.25, 1, 0.75, 0),
    edge('e_cla_prom', 'cl_a_box', 'plt_prom', 'Metrics Scraping', 'governance', 0.25, 1, 0.5, 0),
    edge('e_bin_gke', 'sec_binauth', 'ctl_fleet', 'Attestation Verification', 'governance', 0.5, 0, 0.5, 1, [[215, 710], [1330, 710]]),
  ];

  return `<mxfile host="embed.diagrams.net" modified="2026-08-20T22:00:00.000Z" agent="PromptCanvas" version="24.0.0" type="embed">
  <diagram id="catalog_gke_enterprise_platform" name="GKE Enterprise Platform &amp; Multi-Cluster Service Mesh">
    <mxGraphModel dx="1600" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="950" background="#FFFFFF">
      <root>
        ${cells.join('\n        ')}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}

export const MASTER_GKE_ENTERPRISE_PLATFORM_XML = buildMasterGkeEnterprisePlatformXml();
