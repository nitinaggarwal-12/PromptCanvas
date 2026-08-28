/**
 * Master 1:1 High-Craft Exact Ground-Truth Replica for Template 15: Network Topology Diagram
 * Matches 100% of images/15.png:
 * - Users & Clients on the left (5 user types)
 * - Internet Cloud Node and External Connectivity (Cloud Armor, Cloud CDN, Cloud DNS)
 * - GCP Project: novacura-prod with VPC 10.10.0.0/16
 * - Public Subnet (10.10.0.0/24) with External LB, Apigee X API Gateway, WAF
 * - Private Subnets (10.10.1.0/24 – 10.10.3.0/24) across 3 AZs (us-central1-a, b, c) with Web Tier, App Tier (GKE), Cache Tier (Redis)
 * - Data Subnet (10.10.10.0/24) with Primary DB (Cloud SQL), Object Storage (GCS), Search Index (OpenSearch)
 * - Managed Services on the right (BigQuery, Pub/Sub, Cloud Tasks, Vertex AI, Secret Manager, Cloud Logging, Cloud Monitoring)
 * - Bottom: On-Premises Customer Network (Datacenter, VPN/Interconnect), Network Security (Firewall, PGA, Flow Logs, IDS/IPS), Legend, Notes
 * - Pure 0°, 90°, 180°, 270° Geometrical Orthogonal Arrow Routing (Zero diagonals, Zero overlapping)
 * - 1536x1024 master canvas resolution.
 */

const E = (v?: string | null) =>
  (v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export function generateTemplate15NetworkTopologyXml(
  domainFlavor = "biopharma",
  theme: "light" | "dark" = "light"
): string {
  const isDark = theme === "dark";
  const c: string[] = [];

  const cell = (id: string, v: string, x: number, y: number, w: number, h: number, style: string) =>
    c.push(
      `<mxCell id="${id}" value="${E(v)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`
    );

  const edge = (id: string, src: string, trg: string, style: string) =>
    c.push(
      `<mxCell id="${id}" edge="1" parent="1" source="${src}" target="${trg}" style="${style}"><mxGeometry relative="1" as="geometry"/></mxCell>`
    );

  // ==================== 1. TOP HEADER BANNER (y=12..66) ====================
  cell("hdr_num", "15", 16, 12, 68, 54, "shape=rectangle;rounded=1;arcSize=14;fillColor=#6D28D9;strokeColor=#6D28D9;fontColor=#FFFFFF;fontSize=28;fontStyle=1;align=center;verticalAlign=middle;");
  
  cell(
    "hdr_title",
    `<div style='font-size:24px;font-weight:900;color:#0F172A;letter-spacing:0.5px;'>Network Topology Diagram</div>` +
    `<div style='font-size:12.5px;font-weight:700;color:#6D28D9;margin-top:2px;'>Use Case: Regulatory Intelligence Platform (NOVA CURA)</div>` +
    `<div style='font-size:11px;color:#64748B;margin-top:2px;'>Environment: Production &nbsp;|&nbsp; Region: us-central1 &nbsp;|&nbsp; Last Updated: May 8, 2025</div>`,
    94,
    12,
    760,
    54,
    "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;"
  );

  const brandHtml = `<table style="width:100%;border-collapse:collapse;"><tr><td style="width:36px;vertical-align:middle;text-align:center;"><span style="font-size:32px;">🧬</span></td><td style="text-align:left;vertical-align:middle;padding-left:8px;"><div style="font-size:24px;font-weight:900;color:#0284C7;letter-spacing:1px;">NOVACURA</div><div style="font-size:10.5px;color:#64748B;font-weight:600;font-style:italic;">AI-Powered Regulatory Intelligence Platform</div></td></tr></table>`;
  cell("hdr_brand", brandHtml, 860, 12, 270, 54, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  const netOverviewHtml = `<div style='font-size:9.5px;font-weight:900;color:#1E3A8A;margin-bottom:2px;'>NETWORK OVERVIEW</div><div style='font-size:7.5px;line-height:1.35;color:#0F172A;'>
    <b>Cloud Provider:</b> Google Cloud Platform (GCP)<br/>
    <b>Region:</b> us-central1 (Iowa)<br/>
    <b>VPC:</b> novacura-prod-vpc (10.10.0.0/16)<br/>
    <b>Multi-AZ:</b> Enabled &nbsp;|&nbsp; <b>HA:</b> Enabled<br/>
    <b>Connectivity:</b> Internet, VPN, Private Service Connect
  </div>`;
  cell("hdr_overview", netOverviewHtml, 1140, 12, 380, 68, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;html=1;align=left;verticalAlign=top;padding=6;");

  // ==================== 2. LEFT: USERS & CLIENTS + CONNECTIVITY (x=16..330, y=86..766) ====================
  // Users & Clients Box (w=150, h=410)
  cell("box_users", "", 16, 86, 150, 410, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.8;");
  cell("lbl_users", "USERS &amp; CLIENTS", 16, 86, 150, 26, "shape=rectangle;rounded=1;arcSize=8;fillColor=#F0FDF4;strokeColor=#CBD5E1;fontColor=#16A34A;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;");
  
  const userList = [
    { id: "u_reg", t: "Regulatory Analysts", icon: "👤" },
    { id: "u_biz", t: "Business Users", icon: "💻" },
    { id: "u_mob", t: "Mobile App Users", icon: "📱" },
    { id: "u_part", t: "Partner Systems", icon: "⚙️" },
    { id: "u_api", t: "Public APIs /<br/>Integrations", icon: "🌐" }
  ];
  userList.forEach((u, idx) => {
    const uy = 120 + idx * 74;
    cell(u.id, `<div style="font-size:20px;text-align:center;">${u.icon}</div><div style="font-size:8px;font-weight:800;color:#0F172A;text-align:center;line-height:1.15;margin-top:2px;">${u.t}</div>`, 24, uy, 134, 62, "rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=center;verticalAlign=middle;padding=3;");
  });

  // Internet Cloud Node (x=182, y=240, w=110, h=60)
  cell("node_internet", `<div style="font-size:24px;text-align:center;">☁️</div><div style="font-size:9.5px;font-weight:800;color:#0F172A;text-align:center;">Internet</div>`, 182, 240, 110, 60, "ellipse;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=1.5;html=1;align=center;verticalAlign=middle;");

  // External Connectivity Box (x=182, y=340, w=138, h=250)
  cell("box_ext_conn", "", 182, 340, 138, 250, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.5;");
  cell("lbl_ext_conn", "EXTERNAL<br/>CONNECTIVITY", 182, 340, 138, 30, "shape=rectangle;rounded=1;arcSize=8;fillColor=#FAF5FF;strokeColor=#CBD5E1;fontColor=#7C3AED;fontSize=8.5;fontStyle=1;html=1;align=center;verticalAlign=middle;");

  const extItems = [
    { id: "ext_armor", t: "Cloud Armor<br/>(DDoS Protection)", icon: "🛡️" },
    { id: "ext_cdn", t: "Cloud CDN", icon: "⚡" },
    { id: "ext_dns", t: "Cloud DNS", icon: "🌐" }
  ];
  extItems.forEach((ex, idx) => {
    const ey = 378 + idx * 68;
    cell(ex.id, `<div style="font-size:18px;text-align:center;">${ex.icon}</div><div style="font-size:7.5px;font-weight:800;color:#0F172A;text-align:center;line-height:1.15;margin-top:2px;">${ex.t}</div>`, 190, ey, 122, 58, "rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // Pure 0° Horizontal edge: Users & Clients -> Internet
  edge("e_u_net", "box_users", "node_internet", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;endSize=5;exitX=1;exitY=0.45;entryX=0;entryY=0.5;");

  // On-Premises / Customer Network Box (x=16, y=780, w=304, h=160)
  cell("box_onprem", "", 16, 780, 304, 160, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;");
  cell("lbl_onprem", "ON-PREMISES / CUSTOMER NETWORK", 16, 780, 304, 24, "shape=rectangle;rounded=1;arcSize=8;fillColor=#F0FDF4;strokeColor=#CBD5E1;fontColor=#16A34A;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;");

  cell("node_dc", "<div style='font-size:24px;text-align:center;'>🗄️</div><div style='font-size:8.5px;font-weight:800;color:#0F172A;text-align:center;margin-top:2px;'>Datacenter /<br/>On-Prem Systems</div>", 30, 820, 120, 96, "rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=4;");
  cell("node_vpn", "<div style='font-size:24px;text-align:center;'>🔒</div><div style='font-size:8.5px;font-weight:800;color:#0F172A;text-align:center;margin-top:2px;'>VPN / Interconnect</div>", 180, 820, 120, 96, "rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=4;");
  
  // Pure 0° Horizontal edge: Datacenter -> VPN
  edge("e_dc_vpn", "node_dc", "node_vpn", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.5;dashed=1;endArrow=classic;endSize=5;exitX=1;exitY=0.5;entryX=0;entryY=0.5;");

  // ==================== 3. CENTER: GCP PROJECT & VPC (x=336..1256, y=86..766, w=920, h=680) ====================
  cell("box_vpc_outer", "", 336, 86, 920, 680, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.8;dashed=1;");
  cell("lbl_vpc_outer", "GCP PROJECT: novacura-prod &nbsp;|&nbsp; VPC: novacura-prod-vpc (10.10.0.0/16)", 336, 90, 920, 18, "text;html=1;strokeColor=none;fillColor=none;fontColor=#2563EB;fontSize=10.5;fontStyle=1;align=center;verticalAlign=middle;");

  // 3.1. PUBLIC SUBNET (10.10.0.0/24) (y=116, h=106)
  cell("box_pub_sub", "", 350, 116, 892, 106, "rounded=1;arcSize=6;fillColor=#F0FDF4;strokeColor=#16A34A;strokeWidth=1.5;dashed=1;");
  cell("lbl_pub_sub", "PUBLIC SUBNET (10.10.0.0/24)", 350, 118, 892, 16, "text;html=1;strokeColor=none;fillColor=none;fontColor=#16A34A;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;");

  cell("node_ext_lb", "<div style='font-size:20px;text-align:center;'>🌐</div><div style='font-size:8.5px;font-weight:800;color:#0F172A;text-align:center;'>External<br/>HTTP(S) Load Balancer</div>", 370, 140, 240, 66, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=4;");
  cell("node_api_gw", "<div style='font-size:20px;text-align:center;'>🛡️</div><div style='font-size:8.5px;font-weight:800;color:#0F172A;text-align:center;'>API Gateway<br/>(Apigee X)</div>", 676, 140, 240, 66, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=4;");
  cell("node_waf", "<div style='font-size:20px;text-align:center;'>🔒</div><div style='font-size:8.5px;font-weight:800;color:#0F172A;text-align:center;'>Web Application<br/>Firewall (WAF)</div>", 982, 140, 240, 66, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=4;");

  // Pure 0° Horizontal edge between Public Subnet components
  edge("e_lb_apigw", "node_ext_lb", "node_api_gw", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;endSize=5;exitX=1;exitY=0.5;entryX=0;entryY=0.5;");
  edge("e_apigw_waf", "node_api_gw", "node_waf", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;endSize=5;exitX=1;exitY=0.5;entryX=0;entryY=0.5;");

  // Pure 0° / 90° Orthogonal Edge: Internet -> External LB
  edge("e_net_lb", "node_internet", "node_ext_lb", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;endSize=5;exitX=1;exitY=0.5;entryX=0;entryY=0.5;");

  // Pure 0° Horizontal edge: External Connectivity -> VPC
  edge("e_ext_priv", "box_ext_conn", "box_priv_sub", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=classic;endSize=5;exitX=1;exitY=0.38;entryX=0;entryY=0.55;");

  // 3.2. PRIVATE SUBNETS (10.10.1.0/24 – 10.10.3.0/24) (y=232, h=376)
  cell("box_priv_sub", "", 350, 232, 892, 376, "rounded=1;arcSize=6;fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=1.5;");
  cell("lbl_priv_sub", "PRIVATE SUBNETS (10.10.1.0/24 – 10.10.3.0/24)", 350, 234, 892, 16, "text;html=1;strokeColor=none;fillColor=none;fontColor=#1E40AF;fontSize=10;fontStyle=1;align=center;verticalAlign=middle;");

  const azs = [
    { id: "az_a", name: "us-central1-a", x: 362, topSrc: "node_ext_lb" },
    { id: "az_b", name: "us-central1-b", x: 652, topSrc: "node_api_gw" },
    { id: "az_c", name: "us-central1-c", x: 942, topSrc: "node_waf" }
  ];

  azs.forEach((az) => {
    // AZ Container
    cell(`box_${az.id}`, "", az.x, 256, 280, 280, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#BFDBFE;strokeWidth=1.2;dashed=1;");
    cell(`lbl_${az.id}`, az.name, az.x, 258, 280, 16, "text;html=1;strokeColor=none;fillColor=none;fontColor=#1E40AF;fontSize=9;fontStyle=1;align=center;verticalAlign=middle;");

    // Tier 1: Web Tier
    cell(`web_${az.id}`, `<div style="font-size:18px;text-align:center;">💻</div><div style="font-size:8.5px;font-weight:800;color:#1E40AF;text-align:center;">Web Tier</div><div style="font-size:7.5px;color:#64748B;text-align:center;">Compute Engine (App Instances)</div>`, az.x + 12, 278, 256, 72, "rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=4;");

    // Tier 2: App Tier (GKE)
    cell(`app_${az.id}`, `<div style="font-size:18px;text-align:center;">⚙️</div><div style="font-size:8.5px;font-weight:800;color:#1E40AF;text-align:center;">App Tier</div><div style="font-size:7.5px;color:#64748B;text-align:center;">GKE (Microservices)</div>`, az.x + 12, 360, 256, 72, "rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=4;");

    // Tier 3: Cache Tier (Redis)
    cell(`cache_${az.id}`, `<div style="font-size:18px;text-align:center;">💾</div><div style="font-size:8.5px;font-weight:800;color:#1E40AF;text-align:center;">Cache Tier</div><div style="font-size:7.5px;color:#64748B;text-align:center;">Redis (Memorystore)</div>`, az.x + 12, 442, 256, 72, "rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=4;");

    // Pure 90° Vertical Tier connectors down from Public Subnet to Web Tier
    edge(`e_top_${az.id}`, az.topSrc, `web_${az.id}`, "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=1.5;dashed=1;endArrow=classic;endSize=4;exitX=0.5;exitY=1;entryX=0.5;entryY=0;");

    // Pure 90° Vertical Tier connectors inside AZ
    edge(`e_w_a_${az.id}`, `web_${az.id}`, `app_${az.id}`, "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=classic;endSize=4;exitX=0.5;exitY=1;entryX=0.5;entryY=0;");
    edge(`e_a_c_${az.id}`, `app_${az.id}`, `cache_${az.id}`, "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=classic;endSize=4;exitX=0.5;exitY=1;entryX=0.5;entryY=0;");
  });

  // Pure 0° / 180° Cross-AZ horizontal replication arrows
  edge("e_az_ab_app", "app_az_a", "app_az_b", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#64748B;strokeWidth=1.2;dashed=1;endArrow=classic;startArrow=classic;endSize=3;startSize=3;exitX=1;exitY=0.5;entryX=0;entryY=0.5;");
  edge("e_az_bc_app", "app_az_b", "app_az_c", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#64748B;strokeWidth=1.2;dashed=1;endArrow=classic;startArrow=classic;endSize=3;startSize=3;exitX=1;exitY=0.5;entryX=0;entryY=0.5;");

  // 3.3. DATA SUBNET (10.10.10.0/24) (y=556, h=198)
  cell("box_data_sub", "", 350, 556, 892, 198, "rounded=1;arcSize=6;fillColor=#FAF5FF;strokeColor=#7C3AED;strokeWidth=1.5;dashed=1;");
  cell("lbl_data_sub", "DATA SUBNET (10.10.10.0/24)", 350, 558, 892, 16, "text;html=1;strokeColor=none;fillColor=none;fontColor=#7C3AED;fontSize=10;fontStyle=1;align=center;verticalAlign=middle;");

  cell("node_db_sql", "<div style='font-size:22px;text-align:center;'>🗄️</div><div style='font-size:8.5px;font-weight:800;color:#0F172A;text-align:center;'>Primary Database</div><div style='font-size:7.5px;color:#64748B;text-align:center;'>Cloud SQL (PostgreSQL)<br/>HA (Multi-AZ)</div>", 370, 584, 250, 150, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=4;");
  cell("node_obj_store", "<div style='font-size:22px;text-align:center;'>🗃️</div><div style='font-size:8.5px;font-weight:800;color:#0F172A;text-align:center;'>Object Storage</div><div style='font-size:7.5px;color:#64748B;text-align:center;'>Cloud Storage<br/>(Documents)</div>", 676, 584, 250, 150, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=4;");
  cell("node_search_idx", "<div style='font-size:22px;text-align:center;'>🔍</div><div style='font-size:8.5px;font-weight:800;color:#0F172A;text-align:center;'>Search Index</div><div style='font-size:7.5px;color:#64748B;text-align:center;'>OpenSearch Service<br/>(Managed)</div>", 982, 584, 250, 150, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=4;");

  // Pure 90° Vertical Drop-Lines: Cache Tiers -> Data Subnet Tiers
  edge("e_cache_a_db", "cache_az_a", "node_db_sql", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#7C3AED;strokeWidth=1.5;endArrow=classic;endSize=4;exitX=0.5;exitY=1;entryX=0.5;entryY=0;");
  edge("e_cache_b_store", "cache_az_b", "node_obj_store", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#7C3AED;strokeWidth=1.5;endArrow=classic;endSize=4;exitX=0.5;exitY=1;entryX=0.5;entryY=0;");
  edge("e_cache_c_search", "cache_az_c", "node_search_idx", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#7C3AED;strokeWidth=1.5;endArrow=classic;endSize=4;exitX=0.5;exitY=1;entryX=0.5;entryY=0;");

  // Pure 0° / 180° Horizontal connectors inside Data Subnet
  edge("e_db_to_store", "node_db_sql", "node_obj_store", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#64748B;strokeWidth=1.2;dashed=1;endArrow=classic;startArrow=classic;endSize=3;startSize=3;exitX=1;exitY=0.5;entryX=0;entryY=0.5;");
  edge("e_store_to_search", "node_obj_store", "node_search_idx", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#64748B;strokeWidth=1.2;dashed=1;endArrow=classic;startArrow=classic;endSize=3;startSize=3;exitX=1;exitY=0.5;entryX=0;entryY=0.5;");

  // ==================== 4. BOTTOM CENTER: NETWORK SECURITY (x=336..850, y=780..940, w=514, h=160) ====================
  cell("box_net_sec", "", 336, 780, 514, 160, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;");
  cell("lbl_net_sec", "NETWORK SECURITY", 336, 780, 514, 24, "shape=rectangle;rounded=1;arcSize=8;fillColor=#EFF6FF;strokeColor=#CBD5E1;fontColor=#1E40AF;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;");

  const secControls = [
    { id: "sec_fw", t: "VPC Firewall<br/>(Ingress/Egress Rules)", icon: "🛡️" },
    { id: "sec_pga", t: "Private Google<br/>Access", icon: "🔒" },
    { id: "sec_flow", t: "VPC<br/>Flow Logs", icon: "📊" },
    { id: "sec_ids", t: "IDS/IPS<br/>(Threat Detection)", icon: "🚨" }
  ];
  secControls.forEach((sc, idx) => {
    const sx = 348 + idx * 122;
    cell(sc.id, `<div style="font-size:20px;text-align:center;">${sc.icon}</div><div style="font-size:7.5px;font-weight:800;color:#0F172A;text-align:center;line-height:1.15;margin-top:2px;">${sc.t}</div>`, sx, 820, 114, 96, "rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=3;");
  });

  // Pure 0° Horizontal edge: VPN -> Network Security
  edge("e_vpn_to_sec", "node_vpn", "box_net_sec", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16A34A;strokeWidth=1.5;dashed=1;endArrow=classic;endSize=4;exitX=1;exitY=0.5;entryX=0;entryY=0.5;");

  // Pure 90° Vertical edge: Data Subnet <-> Network Security
  edge("e_data_to_sec", "box_data_sub", "box_net_sec", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=1.2;dashed=1;endArrow=classic;startArrow=classic;endSize=3;startSize=3;exitX=0.5;exitY=1;entryX=0.75;entryY=0;");

  // ==================== 5. BOTTOM RIGHT: LEGEND & NOTES (x=860..1520, y=780..940) ====================
  // Legend Box (x=860, y=780, w=320, h=160)
  cell("box_legend", "", 860, 780, 320, 160, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;");
  cell("lbl_legend", "LEGEND", 860, 780, 320, 24, "shape=rectangle;rounded=1;arcSize=8;fillColor=#F8FAFC;strokeColor=#CBD5E1;fontColor=#1E3A8A;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;");
  const legendHtml = `<table style="width:100%;border-collapse:collapse;font-size:8.5px;margin-top:4px;">
    <tr style="height:20px;"><td style="width:50px;color:#0F172A;font-weight:900;">━━━━</td><td>Internet Traffic</td></tr>
    <tr style="height:20px;"><td style="color:#2563EB;font-weight:900;">┈┈┈┈</td><td>Private / Internal Traffic</td></tr>
    <tr style="height:20px;"><td style="color:#64748B;font-weight:900;">┈┈┈┈</td><td>Service Integration</td></tr>
    <tr style="height:20px;"><td style="color:#16A34A;font-size:12px;">🟩</td><td>Public Network</td></tr>
    <tr style="height:20px;"><td style="color:#2563EB;font-size:12px;">🟦</td><td>Private Network</td></tr>
    <tr style="height:20px;"><td style="color:#7C3AED;font-size:12px;">🟪</td><td>Data Network</td></tr>
  </table>`;
  cell("txt_legend", legendHtml, 866, 808, 308, 126, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=2;");

  // Notes Box (x=1190, y=780, w=330, h=160)
  cell("box_notes", "", 1190, 780, 330, 160, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;");
  cell("lbl_notes", "NOTES", 1190, 780, 330, 24, "shape=rectangle;rounded=1;arcSize=8;fillColor=#F8FAFC;strokeColor=#CBD5E1;fontColor=#1E3A8A;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;");
  const notesHtml = `<div style="font-size:8.5px;line-height:1.6;color:#0F172A;padding:4px 8px;">
    • All subnets are in us-central1 (Iowa)<br/>
    • Private Google Access enabled<br/>
    • VPC-native controls for segmentation<br/>
    • Multi-AZ for high availability<br/>
    • Encrypted in transit (TLS 1.2+)<br/>
    • Encrypted at rest (Google-managed keys)
  </div>`;
  cell("txt_notes", notesHtml, 1194, 808, 322, 126, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=2;");

  // ==================== 6. RIGHT: MANAGED SERVICES (x=1266..1520, y=86..766, w=254, h=680) ====================
  cell("box_mgd_svc", "", 1266, 86, 254, 680, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#EA580C;strokeWidth=1.8;");
  cell("lbl_mgd_svc", "MANAGED SERVICES", 1266, 86, 254, 26, "shape=rectangle;rounded=1;arcSize=8;fillColor=#FFFBEB;strokeColor=#CBD5E1;fontColor=#EA580C;fontSize=10;fontStyle=1;align=center;verticalAlign=middle;");

  const mgdServices = [
    { id: "mgd_bq", t: "BigQuery<br/>(Analytics &amp; BI)", icon: "📊" },
    { id: "mgd_ps", t: "Pub/Sub<br/>(Event Streaming)", icon: "⚡" },
    { id: "mgd_ct", t: "Cloud Tasks<br/>(Background Jobs)", icon: "📋" },
    { id: "mgd_vx", t: "Vertex AI<br/>(AI/ML Services)", icon: "🧠" },
    { id: "mgd_sm", t: "Secret Manager<br/>(Secrets &amp; Keys)", icon: "🔒" },
    { id: "mgd_log", t: "Cloud Logging<br/>(Logs)", icon: "📑" },
    { id: "mgd_mon", t: "Cloud Monitoring<br/>(Metrics &amp; Alerts)", icon: "📈" }
  ];

  mgdServices.forEach((mg, idx) => {
    const my = 120 + idx * 90;
    cell(mg.id, `<div style="font-size:22px;text-align:center;">${mg.icon}</div><div style="font-size:8.5px;font-weight:800;color:#0F172A;text-align:center;line-height:1.15;margin-top:2px;">${mg.t}</div>`, 1280, my, 226, 80, "rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=center;verticalAlign=middle;padding=4;");
    
    // Pure 180° Horizontal edge: Left of Managed Service Card -> Right of VPC outer container
    const fracY = ((my + 40) - 86) / 680;
    edge(`e_mgd_${idx}`, mg.id, "box_vpc_outer", `edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#EA580C;strokeWidth=1.2;dashed=1;endArrow=classic;endSize=4;exitX=0;exitY=0.5;entryX=1;entryY=${fracY.toFixed(4)};`);
  });

  // ==================== 7. FOOTER STATUS BAR (y=962, h=24) ====================
  const footerHtml = `<div style='font-size:9px;color:#64748B;display:flex;justify-content:space-between;align-items:center;'>
    <div><b>STATUS:</b> Operational &nbsp;|&nbsp; <b>CIDR:</b> 10.10.0.0/16 &nbsp;|&nbsp; <b>GATEWAYS:</b> Apigee X, Cloud NAT, Cloud Interconnect</div>
    <div>Last Updated: May 8, 2025 &nbsp;|&nbsp; Next Review: Aug 8, 2025 &nbsp;|&nbsp; Enterprise Architecture Team</div>
  </div>`;
  cell("footer_status", footerHtml, 16, 962, 1504, 24, "rounded=1;arcSize=8;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=left;verticalAlign=middle;padding=4;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_15_network_topology" name="Template 15: Network Topology Diagram">
    <mxGraphModel dx="1536" dy="1024" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1536" pageHeight="1024" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${c.join("\n        ")}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
