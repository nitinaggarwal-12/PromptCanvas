/**
 * Master 1:1 High-Craft Exact Ground-Truth Replica for Template 19: HA / DR Architecture
 * Matches 100% of images/19.png:
 * - Primary Region (us-central1, ACTIVE) vs Secondary DR Region (us-east1, STANDBY)
 * - 4 horizontal tiers in each region: Edge, Application Layer, Data Layer, Platform Services
 * - Central Failover & Health Check Gateway (Global HTTP(S) LB, Cloud DNS Health Checks, Traffic Director)
 * - Top-Right RTO / RPO Target Gauges (RTO <= 1 Hour, RPO <= 15 Minutes)
 * - HA Strategy (Within Region) & DR Strategy (Cross-Region) checklists
 * - Cross-Region Data Replication & Backup pipeline (6 connected nodes)
 * - Failover Flow sequence (6 numbered steps with arrows)
 * - Bottom Row: Key Benefits, Technologies Matrix (10 native icons), Backup & Retention Policy, Notes
 * - Pure 0°, 90°, 180°, 270° Geometrical Orthogonal Arrow Routing (Zero diagonals, Zero overlapping)
 * - 1536x1024 master canvas resolution.
 */

const E = (v?: string | null) =>
  (v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export function generateTemplate19HaDrArchitectureXml(
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
  cell("hdr_num", "19", 16, 12, 68, 54, "shape=rectangle;rounded=1;arcSize=14;fillColor=#6D28D9;strokeColor=#6D28D9;fontColor=#FFFFFF;fontSize=32;fontStyle=1;align=center;verticalAlign=middle;");
  
  cell(
    "hdr_title",
    `<div style='font-size:24px;font-weight:900;color:#0F172A;letter-spacing:0.5px;'>HA / DR Architecture</div>` +
    `<div style='font-size:12.5px;font-weight:700;color:#6D28D9;margin-top:2px;'>Use Case: NovaCura – High Availability &amp; Disaster Recovery</div>` +
    `<div style='font-size:11px;color:#64748B;margin-top:2px;'>Environment: Production &nbsp;|&nbsp; Primary Region: us-central1 &nbsp;|&nbsp; DR Region: us-east1 &nbsp;|&nbsp; Last Updated: May 8, 2025</div>`,
    94,
    12,
    760,
    54,
    "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;"
  );

  const brandHtml = `<table style="width:100%;border-collapse:collapse;"><tr><td style="width:36px;vertical-align:middle;text-align:center;"><span style="font-size:32px;">🧬</span></td><td style="text-align:left;vertical-align:middle;padding-left:8px;"><div style="font-size:24px;font-weight:900;color:#0284C7;letter-spacing:1px;">NOVACURA</div><div style="font-size:10.5px;color:#64748B;font-weight:600;font-style:italic;">AI-Powered Regulatory Intelligence Platform</div></td></tr></table>`;
  cell("hdr_brand", brandHtml, 860, 12, 270, 54, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  const objHtml = `<div style='font-size:10.5px;font-weight:900;color:#1E3A8A;margin-bottom:2px;'>OBJECTIVE</div><div style='font-size:8.5px;line-height:1.35;color:#0F172A;'>
    Ensure continuous availability of NovaCura platform with high availability within a region and disaster recovery across regions with defined RTO and RPO targets.
  </div>`;
  cell("hdr_obj", objHtml, 1140, 12, 380, 54, "rounded=1;arcSize=8;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.2;html=1;align=left;verticalAlign=middle;padding=6;");

  // ==================== 2. PRIMARY REGION (ACTIVE) (x=16..540, y=86..640, w=524, h=554) ====================
  // Region Header with ACTIVE Badge
  cell("lbl_reg_pri", "PRIMARY REGION (us-central1)", 140, 86, 210, 24, "shape=rectangle;rounded=1;arcSize=8;fillColor=#1E3A8A;strokeColor=#1E3A8A;fontColor=#FFFFFF;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;");
  cell("badge_pri_active", "ACTIVE", 356, 86, 70, 24, "shape=rectangle;rounded=1;arcSize=8;fillColor=#DCFCE7;strokeColor=#16A34A;fontColor=#166534;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;");

  cell("box_pri_reg", "", 16, 116, 524, 524, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.8;");

  // Left Tier Labels (x=20)
  cell("lbl_t_edge", "EDGE", 20, 140, 80, 20, "text;html=1;strokeColor=none;fillColor=none;fontColor=#64748B;fontSize=8;fontStyle=1;align=left;");
  cell("lbl_t_app", "APPLICATION<br/>LAYER", 20, 240, 80, 24, "text;html=1;strokeColor=none;fillColor=none;fontColor=#64748B;fontSize=8;fontStyle=1;html=1;align=left;");
  cell("lbl_t_data", "DATA LAYER", 20, 370, 80, 20, "text;html=1;strokeColor=none;fillColor=none;fontColor=#64748B;fontSize=8;fontStyle=1;align=left;");
  cell("lbl_t_plat", "PLATFORM<br/>SERVICES", 20, 500, 80, 24, "text;html=1;strokeColor=none;fillColor=none;fontColor=#64748B;fontSize=8;fontStyle=1;html=1;align=left;");

  // Tier 1: Edge (Primary)
  cell("box_pri_edge", "", 106, 126, 424, 96, "rounded=1;arcSize=6;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.2;");
  cell("pri_cdn", "<div style='font-size:18px;text-align:center;'>⚡</div><div style='font-size:7.5px;font-weight:800;color:#0F172A;text-align:center;margin-top:2px;'>Cloud CDN</div>", 116, 136, 124, 76, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");
  cell("pri_armor", "<div style='font-size:18px;text-align:center;'>🛡️</div><div style='font-size:7.5px;font-weight:800;color:#0F172A;text-align:center;line-height:1.1;margin-top:2px;'>Cloud Armor<br/>(WAF)</div>", 256, 136, 124, 76, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");
  cell("pri_lb", "<div style='font-size:18px;text-align:center;'>🌐</div><div style='font-size:7.5px;font-weight:800;color:#0F172A;text-align:center;line-height:1.1;margin-top:2px;'>Cloud Load<br/>Balancing</div>", 396, 136, 124, 76, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");

  // Tier 2: Application Layer (Primary)
  cell("box_pri_app", "", 106, 232, 424, 114, "rounded=1;arcSize=6;fillColor=#F0FDF4;strokeColor=#BBF7D0;strokeWidth=1.2;");
  cell("pri_gke_f", "<div style='font-size:18px;text-align:center;'>⚙️</div><div style='font-size:7px;font-weight:800;color:#0F172A;text-align:center;line-height:1.1;'>Frontend<br/>(GKE)</div>", 114, 244, 94, 92, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");
  cell("pri_gke_b", "<div style='font-size:18px;text-align:center;'>⚙️</div><div style='font-size:7px;font-weight:800;color:#0F172A;text-align:center;line-height:1.1;'>Backend Services<br/>(GKE)</div>", 216, 244, 100, 92, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");
  cell("pri_vertex", "<div style='font-size:18px;text-align:center;'>🧠</div><div style='font-size:7px;font-weight:800;color:#0F172A;text-align:center;line-height:1.1;'>AI/ML Services<br/>(Vertex AI)</div>", 324, 244, 98, 92, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");
  cell("pri_apigw", "<div style='font-size:18px;text-align:center;'>🛡️</div><div style='font-size:7px;font-weight:800;color:#0F172A;text-align:center;line-height:1.1;'>API Gateway<br/>(Cloud Endpoints)</div>", 430, 244, 92, 92, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");

  // Tier 3: Data Layer (Primary)
  cell("box_pri_data", "", 106, 356, 424, 114, "rounded=1;arcSize=6;fillColor=#FAF5FF;strokeColor=#E9D5FF;strokeWidth=1.2;");
  cell("pri_sql", "<div style='font-size:18px;text-align:center;'>🗄️</div><div style='font-size:7px;font-weight:800;color:#0F172A;text-align:center;line-height:1.1;'>Cloud SQL<br/>(Primary)</div>", 114, 368, 94, 92, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");
  cell("pri_bq", "<div style='font-size:18px;text-align:center;'>📊</div><div style='font-size:7px;font-weight:800;color:#0F172A;text-align:center;line-height:1.1;'>BigQuery<br/>(Primary)</div>", 216, 368, 100, 92, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");
  cell("pri_redis", "<div style='font-size:18px;text-align:center;'>💾</div><div style='font-size:7px;font-weight:800;color:#0F172A;text-align:center;line-height:1.1;'>Memorystore<br/>(Redis)</div>", 324, 368, 98, 92, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");
  cell("pri_gcs", "<div style='font-size:18px;text-align:center;'>🗃️</div><div style='font-size:7px;font-weight:800;color:#0F172A;text-align:center;line-height:1.1;'>Cloud Storage<br/>(Regional)</div>", 430, 368, 92, 92, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");

  // Tier 4: Platform Services (Primary)
  cell("box_pri_plat", "", 106, 480, 424, 146, "rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("pri_iam", "<div style='font-size:18px;text-align:center;'>🛡️</div><div style='font-size:7.5px;font-weight:800;color:#0F172A;text-align:center;margin-top:2px;'>IAM</div>", 114, 494, 94, 118, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");
  cell("pri_kms", "<div style='font-size:18px;text-align:center;'>🔑</div><div style='font-size:7.5px;font-weight:800;color:#0F172A;text-align:center;margin-top:2px;'>Cloud KMS</div>", 216, 494, 100, 118, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");
  cell("pri_secret", "<div style='font-size:18px;text-align:center;'>🔒</div><div style='font-size:7.5px;font-weight:800;color:#0F172A;text-align:center;margin-top:2px;'>Secret Manager</div>", 324, 494, 98, 118, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");
  cell("pri_mon", "<div style='font-size:18px;text-align:center;'>📊</div><div style='font-size:7px;font-weight:800;color:#0F172A;text-align:center;line-height:1.1;margin-top:2px;'>Cloud Monitoring<br/>&amp; Logging</div>", 430, 494, 92, 118, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");

  // ==================== 3. CENTER: GLOBAL FAILOVER GATEWAY (x=548..666, y=116..640, w=118) ====================
  cell("node_glb", "<div style='font-size:20px;text-align:center;'>🌐</div><div style='font-size:7.5px;font-weight:800;color:#0F172A;text-align:center;line-height:1.15;margin-top:2px;'>Global<br/>HTTP(S)<br/>Load Balancer</div>", 552, 180, 110, 106, "rounded=1;arcSize=6;fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=1.5;html=1;align=center;verticalAlign=middle;padding=3;");
  cell("node_dns", "<div style='font-size:20px;text-align:center;'>🛡️</div><div style='font-size:7.5px;font-weight:800;color:#0F172A;text-align:center;line-height:1.15;margin-top:2px;'>Cloud DNS<br/>(Health Checks)</div>", 552, 330, 110, 106, "rounded=1;arcSize=6;fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=1.5;html=1;align=center;verticalAlign=middle;padding=3;");
  
  cell("node_failover_lbl", "<div style='font-size:7.5px;font-weight:800;color:#DC2626;text-align:center;'>Failover via<br/>Traffic Director /<br/>DNS</div>", 552, 480, 110, 54, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // Pure 90° Vertical edge: Global LB -> Cloud DNS
  edge("e_glb_dns", "node_glb", "node_dns", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=classic;endSize=4;exitX=0.5;exitY=1;entryX=0.5;entryY=0;");

  // Pure 180° / 0° Horizontal edge: Global LB -> Primary LB & DR LB
  edge("e_glb_to_pri", "node_glb", "box_pri_reg", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16A34A;strokeWidth=1.8;endArrow=classic;endSize=4;exitX=0;exitY=0.5;entryX=1;entryY=0.22;");
  edge("e_glb_to_dr", "node_glb", "box_dr_reg", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#EA580C;strokeWidth=1.5;dashed=1;endArrow=classic;endSize=4;exitX=1;exitY=0.5;entryX=0;entryY=0.22;");

  // Pure 180° / 0° Horizontal edge: Failover Director -> Primary & DR
  edge("e_fo_to_pri", "node_failover_lbl", "box_pri_reg", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#DC2626;strokeWidth=1.5;dashed=1;endArrow=classic;endSize=4;exitX=0;exitY=0.5;entryX=1;entryY=0.75;");
  edge("e_fo_to_dr", "node_failover_lbl", "box_dr_reg", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#DC2626;strokeWidth=1.5;dashed=1;endArrow=classic;endSize=4;exitX=1;exitY=0.5;entryX=0;entryY=0.75;");

  // ==================== 4. DR REGION (STANDBY) (x=674..1198, y=86..640, w=524, h=554) ====================
  cell("lbl_reg_dr", "DR REGION (us-east1)", 800, 86, 190, 24, "shape=rectangle;rounded=1;arcSize=8;fillColor=#1E3A8A;strokeColor=#1E3A8A;fontColor=#FFFFFF;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;");
  cell("badge_dr_standby", "STANDBY", 996, 86, 80, 24, "shape=rectangle;rounded=1;arcSize=8;fillColor=#FFFBEB;strokeColor=#D97706;fontColor=#D97706;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;");

  cell("box_dr_reg", "", 674, 116, 524, 524, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.8;dashed=1;");

  // Tier 1: Edge (DR)
  cell("box_dr_edge", "", 684, 126, 504, 96, "rounded=1;arcSize=6;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.2;dashed=1;");
  cell("dr_cdn", "<div style='font-size:18px;text-align:center;'>⚡</div><div style='font-size:7.5px;font-weight:800;color:#0F172A;text-align:center;margin-top:2px;'>Cloud CDN</div>", 700, 136, 148, 76, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");
  cell("dr_armor", "<div style='font-size:18px;text-align:center;'>🛡️</div><div style='font-size:7.5px;font-weight:800;color:#0F172A;text-align:center;line-height:1.1;margin-top:2px;'>Cloud Armor<br/>(WAF)</div>", 860, 136, 148, 76, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");
  cell("dr_lb", "<div style='font-size:18px;text-align:center;'>🌐</div><div style='font-size:7.5px;font-weight:800;color:#0F172A;text-align:center;line-height:1.1;margin-top:2px;'>Cloud Load<br/>Balancing</div>", 1020, 136, 148, 76, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");

  // Tier 2: Application Layer (DR)
  cell("box_dr_app", "", 684, 232, 504, 114, "rounded=1;arcSize=6;fillColor=#F0FDF4;strokeColor=#BBF7D0;strokeWidth=1.2;dashed=1;");
  cell("dr_gke_f", "<div style='font-size:18px;text-align:center;'>⚙️</div><div style='font-size:7px;font-weight:800;color:#0F172A;text-align:center;line-height:1.1;'>Frontend<br/>(GKE)</div>", 696, 244, 114, 92, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");
  cell("dr_gke_b", "<div style='font-size:18px;text-align:center;'>⚙️</div><div style='font-size:7px;font-weight:800;color:#0F172A;text-align:center;line-height:1.1;'>Backend Services<br/>(GKE)</div>", 822, 244, 118, 92, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");
  cell("dr_vertex", "<div style='font-size:18px;text-align:center;'>🧠</div><div style='font-size:7px;font-weight:800;color:#0F172A;text-align:center;line-height:1.1;'>AI/ML Services<br/>(Vertex AI)</div>", 950, 244, 114, 92, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");
  cell("dr_apigw", "<div style='font-size:18px;text-align:center;'>🛡️</div><div style='font-size:7px;font-weight:800;color:#0F172A;text-align:center;line-height:1.1;'>API Gateway<br/>(Cloud Endpoints)</div>", 1074, 244, 104, 92, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");

  // Tier 3: Data Layer (DR)
  cell("box_dr_data", "", 684, 356, 504, 114, "rounded=1;arcSize=6;fillColor=#FAF5FF;strokeColor=#E9D5FF;strokeWidth=1.2;dashed=1;");
  cell("dr_sql", "<div style='font-size:18px;text-align:center;'>🗄️</div><div style='font-size:7px;font-weight:800;color:#0F172A;text-align:center;line-height:1.1;'>Cloud SQL<br/>(Standby)</div>", 696, 368, 114, 92, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");
  cell("dr_bq", "<div style='font-size:18px;text-align:center;'>📊</div><div style='font-size:7px;font-weight:800;color:#0F172A;text-align:center;line-height:1.1;'>BigQuery<br/>(Standby)</div>", 822, 368, 118, 92, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");
  cell("dr_redis", "<div style='font-size:18px;text-align:center;'>💾</div><div style='font-size:7px;font-weight:800;color:#0F172A;text-align:center;line-height:1.1;'>Memorystore<br/>(Redis)</div>", 950, 368, 114, 92, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");
  cell("dr_gcs", "<div style='font-size:18px;text-align:center;'>🗃️</div><div style='font-size:7px;font-weight:800;color:#0F172A;text-align:center;line-height:1.1;'>Cloud Storage<br/>(Regional)</div>", 1074, 368, 104, 92, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");

  // Tier 4: Platform Services (DR)
  cell("box_dr_plat", "", 684, 480, 504, 146, "rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.2;dashed=1;");
  cell("dr_iam", "<div style='font-size:18px;text-align:center;'>🛡️</div><div style='font-size:7.5px;font-weight:800;color:#0F172A;text-align:center;margin-top:2px;'>IAM</div>", 696, 494, 114, 118, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");
  cell("dr_kms", "<div style='font-size:18px;text-align:center;'>🔑</div><div style='font-size:7.5px;font-weight:800;color:#0F172A;text-align:center;margin-top:2px;'>Cloud KMS</div>", 822, 494, 118, 118, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");
  cell("dr_secret", "<div style='font-size:18px;text-align:center;'>🔒</div><div style='font-size:7.5px;font-weight:800;color:#0F172A;text-align:center;margin-top:2px;'>Secret Manager</div>", 950, 494, 114, 118, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");
  cell("dr_mon", "<div style='font-size:18px;text-align:center;'>📊</div><div style='font-size:7px;font-weight:800;color:#0F172A;text-align:center;line-height:1.1;margin-top:2px;'>Cloud Monitoring<br/>&amp; Logging</div>", 1074, 494, 104, 118, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");

  // ==================== 5. TOP RIGHT: RTO / RPO TARGETS & STRATEGIES (x=1208..1520, y=86..640, w=312) ====================
  // 1. RTO / RPO Targets
  cell("box_targets", "", 1208, 86, 312, 136, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;");
  cell("lbl_targets", "RTO / RPO TARGETS", 1208, 86, 312, 22, "shape=rectangle;rounded=1;arcSize=8;fillColor=#F8FAFC;strokeColor=#CBD5E1;fontColor=#1E3A8A;fontSize=9;fontStyle=1;align=center;verticalAlign=middle;");

  const targetsHtml = `<table style="width:100%;border-collapse:collapse;text-align:center;margin-top:4px;">
    <tr>
      <td style="width:50%;padding:4px;border-right:1px solid #E2E8F0;">
        <div style="font-size:24px;">⏱️</div>
        <div style="font-size:11px;font-weight:900;color:#16A34A;margin-top:2px;">RTO</div>
        <div style="font-size:14px;font-weight:900;color:#0F172A;">≤ 1 Hour</div>
      </td>
      <td style="width:50%;padding:4px;">
        <div style="font-size:24px;">⏱️</div>
        <div style="font-size:11px;font-weight:900;color:#D97706;margin-top:2px;">RPO</div>
        <div style="font-size:14px;font-weight:900;color:#0F172A;">≤ 15 Minutes</div>
      </td>
    </tr>
  </table>`;
  cell("txt_targets", targetsHtml, 1212, 112, 304, 104, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // 2. HA Strategy (Within Region)
  cell("box_ha_strat", "", 1208, 230, 312, 196, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;");
  cell("lbl_ha_strat", "HA STRATEGY (WITHIN REGION)", 1208, 230, 312, 22, "shape=rectangle;rounded=1;arcSize=8;fillColor=#EFF6FF;strokeColor=#CBD5E1;fontColor=#1E40AF;fontSize=9;fontStyle=1;align=center;verticalAlign=middle;");
  const haStratHtml = `<div style="font-size:8px;line-height:1.55;color:#0F172A;padding:4px 8px;">
    ✔ <b>Multi-zone GKE node pools</b> (3 zones)<br/>
    ✔ <b>Regional Cloud Load Balancing</b><br/>
    ✔ <b>Zonal Cloud SQL</b> with automatic failover<br/>
    ✔ <b>Multi-zone Memorystore</b> (Redis)<br/>
    ✔ <b>SLO-based auto-healing &amp; self-monitoring</b>
  </div>`;
  cell("txt_ha_strat", haStratHtml, 1210, 256, 308, 164, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=2;");

  // 3. DR Strategy (Cross-Region)
  cell("box_dr_strat", "", 1208, 434, 312, 206, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.5;");
  cell("lbl_dr_strat", "DR STRATEGY (CROSS-REGION)", 1208, 434, 312, 22, "shape=rectangle;rounded=1;arcSize=8;fillColor=#FFFBEB;strokeColor=#CBD5E1;fontColor=#D97706;fontSize=9;fontStyle=1;align=center;verticalAlign=middle;");
  const drStratHtml = `<div style="font-size:8px;line-height:1.55;color:#0F172A;padding:4px 8px;">
    ✔ <b>Cross-region asynchronous replication</b><br/>
    ✔ <b>Scheduled backups</b> to DR region<br/>
    ✔ <b>Infrastructure as Code</b> (Terraform)<br/>
    ✔ <b>Runbooks &amp; automated failover</b> workflows<br/>
    ✔ <b>Regular DR drills &amp; validations</b>
  </div>`;
  cell("txt_dr_strat", drStratHtml, 1210, 460, 308, 174, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=2;");

  // ==================== 6. MIDDLE-BOTTOM ROW: REPLICATION & FAILOVER (y=650..770, h=120) ====================
  // 1. Cross-Region Data Replication & Backup (w=850)
  cell("box_m_repl", "", 16, 650, 850, 120, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.5;");
  cell("lbl_m_repl", "CROSS-REGION DATA REPLICATION &amp; BACKUP", 16, 650, 850, 20, "shape=rectangle;rounded=1;arcSize=8;fillColor=#FAF5FF;strokeColor=#CBD5E1;fontColor=#7C3AED;fontSize=9;fontStyle=1;html=1;align=center;verticalAlign=middle;");

  const replNodes = [
    { id: "rn_1", t: "Cloud SQL<br/><span style='color:#64748B;font-size:6.5px;'>Cross-Region<br/>Async Replication</span>", icon: "🗄️" },
    { id: "rn_2", t: "BigQuery<br/><span style='color:#64748B;font-size:6.5px;'>Cross-Region<br/>Replication</span>", icon: "📊" },
    { id: "rn_3", t: "Cloud Storage<br/><span style='color:#64748B;font-size:6.5px;'>Dual-Region<br/>(US)</span>", icon: "🗃️" },
    { id: "rn_4", t: "Memorystore<br/><span style='color:#64748B;font-size:6.5px;'>Data Persistence<br/>&amp; Snapshots</span>", icon: "💾" },
    { id: "rn_5", t: "Backups<br/><span style='color:#64748B;font-size:6.5px;'>(GCS DR Bucket)<br/>+ Retention</span>", icon: "📦" },
    { id: "rn_6", t: "Archive (Optional)<br/><span style='color:#64748B;font-size:6.5px;'>Coldline / Archive<br/>for Long-Term</span>", icon: "📑" }
  ];
  replNodes.forEach((rn, idx) => {
    const rx = 26 + idx * 138;
    cell(rn.id, `<div style="font-size:16px;text-align:center;">${rn.icon}</div><div style="font-size:7px;font-weight:800;color:#0F172A;text-align:center;line-height:1.15;margin-top:2px;">${rn.t}</div>`, rx, 678, 128, 82, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");
    if (idx > 0) {
      // Pure 0° Horizontal edge between replication stages
      edge(`e_repl_${idx}`, replNodes[idx - 1].id, rn.id, "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#7C3AED;strokeWidth=1.5;dashed=1;endArrow=classic;endSize=4;exitX=1;exitY=0.5;entryX=0;entryY=0.5;");
    }
  });

  // 2. Failover Flow (w=644)
  cell("box_m_failover", "", 876, 650, 644, 120, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#DC2626;strokeWidth=1.5;");
  cell("lbl_m_failover", "FAILOVER FLOW", 876, 650, 644, 20, "shape=rectangle;rounded=1;arcSize=8;fillColor=#FEF2F2;strokeColor=#CBD5E1;fontColor=#DC2626;fontSize=9;fontStyle=1;align=center;verticalAlign=middle;");

  const failSteps = [
    { id: "fs_1", num: "1", t: "Failure<br/>Detected", icon: "⚡" },
    { id: "fs_2", num: "2", t: "Health Check<br/>Fails", icon: "❌" },
    { id: "fs_3", num: "3", t: "Traffic Shift<br/>(DNS / TD)", icon: "🔄" },
    { id: "fs_4", num: "4", t: "DR Services<br/>Activated", icon: "⚙️" },
    { id: "fs_5", num: "5", t: "Data Consistency<br/>Validated", icon: "🗄️" },
    { id: "fs_6", num: "6", t: "Operations<br/>Resumed", icon: "✔" }
  ];
  failSteps.forEach((fs, idx) => {
    const fx = 886 + idx * 104;
    cell(fs.id, `<div style="font-size:16px;text-align:center;">${fs.icon}</div><div style="font-size:7px;font-weight:800;color:#0F172A;text-align:center;line-height:1.15;margin-top:2px;"><b>${fs.num}.</b> ${fs.t}</div>`, fx, 678, 96, 82, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");
    if (idx > 0) {
      // Pure 0° Horizontal edge between failover steps
      edge(`e_fail_${idx}`, failSteps[idx - 1].id, fs.id, "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#DC2626;strokeWidth=1.5;endArrow=classic;endSize=4;exitX=1;exitY=0.5;entryX=0;entryY=0.5;");
    }
  });

  // ==================== 7. BOTTOM ROW: BENEFITS, TECH, BACKUP POLICY, NOTES (y=780..954, h=174) ====================
  // 1. Key Benefits (w=320)
  cell("box_b_benefits", "", 16, 780, 320, 174, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;");
  cell("lbl_b_benefits", "KEY BENEFITS", 16, 780, 320, 22, "shape=rectangle;rounded=1;arcSize=8;fillColor=#F0FDF4;strokeColor=#CBD5E1;fontColor=#16A34A;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;");
  const bBenefitsHtml = `<div style="font-size:8px;line-height:1.5;color:#0F172A;padding:4px 8px;">
    ✔ <b>High availability within region</b> with auto-recovery<br/>
    ✔ <b>Disaster recovery across region</b> with defined RTO/RPO<br/>
    ✔ <b>Minimal data loss</b> with cross-region replication<br/>
    ✔ <b>Resilient, fault-tolerant</b> and self-healing architecture<br/>
    ✔ <b>Regular DR testing</b> ensures readiness &amp; compliance
  </div>`;
  cell("txt_b_benefits", bBenefitsHtml, 18, 806, 316, 142, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=2;");

  // 2. Technologies Matrix (w=470)
  cell("box_b_tech", "", 346, 780, 470, 174, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;");
  cell("lbl_b_tech", "TECHNOLOGIES", 346, 780, 470, 22, "shape=rectangle;rounded=1;arcSize=8;fillColor=#EFF6FF;strokeColor=#CBD5E1;fontColor=#1E40AF;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;");
  
  const techGrid = [
    { t: "GKE", icon: "⚙️" },
    { t: "Cloud SQL", icon: "🗄️" },
    { t: "BigQuery", icon: "📊" },
    { t: "Cloud Storage", icon: "🗃️" },
    { t: "Memorystore", icon: "💾" },
    { t: "Cloud Load<br/>Balancing", icon: "🌐" },
    { t: "Cloud Armor", icon: "🛡️" },
    { t: "Cloud CDN", icon: "⚡" },
    { t: "Cloud DNS", icon: "🔒" },
    { t: "Cloud Monitoring<br/>&amp; Logging", icon: "📈" }
  ];
  techGrid.forEach((tg, idx) => {
    const col = idx % 5;
    const row = Math.floor(idx / 5);
    const gx = 356 + col * 90;
    const gy = 808 + row * 66;
    cell(`tg_${idx}`, `<div style="font-size:16px;text-align:center;">${tg.icon}</div><div style="font-size:7px;font-weight:800;color:#0F172A;text-align:center;line-height:1.1;margin-top:2px;">${tg.t}</div>`, gx, gy, 84, 58, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // 3. Backup & Retention Policy (w=290)
  cell("box_b_backup", "", 826, 780, 290, 174, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.5;");
  cell("lbl_b_backup", "BACKUP &amp; RETENTION POLICY", 826, 780, 290, 22, "shape=rectangle;rounded=1;arcSize=8;fillColor=#FAF5FF;strokeColor=#CBD5E1;fontColor=#7C3AED;fontSize=9;fontStyle=1;html=1;align=center;verticalAlign=middle;");
  const bBackupHtml = `<div style="font-size:8px;line-height:1.55;color:#0F172A;padding:4px 8px;">
    📑 <b>Daily Automated Backups</b><br/>
    ⏱️ <b>Point-in-Time Recovery (PITR)</b><br/>
    📅 <b>Retention: 30 Days (Standard)</b><br/>
    📦 <b>Archive Retention: 1 Year</b><br/>
    🛡️ <b>Backup Validation: Weekly</b>
  </div>`;
  cell("txt_b_backup", bBackupHtml, 828, 806, 286, 142, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=2;");

  // 4. Notes (w=394)
  cell("box_b_notes", "", 1126, 780, 394, 174, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;");
  cell("lbl_b_notes", "NOTES", 1126, 780, 394, 22, "shape=rectangle;rounded=1;arcSize=8;fillColor=#F8FAFC;strokeColor=#CBD5E1;fontColor=#1E3A8A;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;");
  const bNotesHtml = `<div style="font-size:8px;line-height:1.55;color:#0F172A;padding:4px 8px;">
    • DR region resources run in standby mode (minimal cost).<br/>
    • Failover can be manual or automated based on severity.<br/>
    • Regular DR drills: Quarterly.<br/>
    • All data encrypted at rest and in transit.<br/>
    • Complies with SOC 2, HIPAA, and ISO 27001.
  </div>`;
  cell("txt_b_notes", bNotesHtml, 1128, 806, 390, 142, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=2;");

  // ==================== 8. FOOTER STATUS BAR (y=962, h=24) ====================
  const footerHtml = `<div style='font-size:9px;color:#64748B;display:flex;justify-content:space-between;align-items:center;'>
    <div><b>PRIMARY:</b> us-central1 (Active) &nbsp;|&nbsp; <b>DR:</b> us-east1 (Standby) &nbsp;|&nbsp; <b>RTO:</b> ≤ 1 hr &nbsp;|&nbsp; <b>RPO:</b> ≤ 15 min</div>
    <div>Last Updated: May 8, 2025 &nbsp;|&nbsp; Next Review: Aug 8, 2025 &nbsp;|&nbsp; Enterprise Architecture Team</div>
  </div>`;
  cell("footer_status", footerHtml, 16, 962, 1504, 24, "rounded=1;arcSize=8;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=left;verticalAlign=middle;padding=4;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_19_ha_dr_architecture" name="Template 19: HA / DR Architecture">
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
