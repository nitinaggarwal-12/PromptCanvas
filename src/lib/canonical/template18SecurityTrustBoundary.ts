/**
 * Master 1:1 High-Craft Exact Ground-Truth Replica for Template 18: Security / Trust Boundary Diagram
 * Matches 100% of images/18.png:
 * - Users & External on far left with HTTPS TLS 1.2+ & Admin Access (VPN) locks
 * - Internet Perimeter with DDoS Protection & WAF (Cloud Armor)
 * - Network Boundary line with Shield icon
 * - Google Cloud Trusted Zone with 4 discrete zones:
 *   1. Edge / Perimeter (LB, Cloud Armor, CDN)
 *   2. Application Zone (Private Subnets: Frontend, API Gateway, Backend GKE)
 *   3. Data Zone (Private Subnets: Primary Cloud SQL, Object Storage, Redis Cache)
 *   4. Management Zone (IAM, Secret Manager KMS, Cloud Logging, SCC)
 * - Data Classification Column (Restricted PHI/PII, Confidential, Internal, Public)
 * - Cross-Cutting Security Controls (8 discrete control cards)
 * - Legend & Technologies on right
 * - Bottom Row: Key Benefits, Trust Boundary Legend, Security Principles, Compliance Alignment, Notes
 * - 1536x1024 master canvas resolution.
 */

const E = (v?: string | null) =>
  (v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export function generateTemplate18SecurityTrustBoundaryXml(
  domainFlavor = "biopharma",
  theme: "light" | "dark" = "light"
): string {
  const isDark = theme === "dark";
  const c: string[] = [];

  const cell = (id: string, v: string, x: number, y: number, w: number, h: number, style: string) =>
    c.push(
      `<mxCell id="${id}" value="${E(v)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`
    );

  const edge = (id: string, src: string, trg: string, style = "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;endSize=5;") =>
    c.push(
      `<mxCell id="${id}" edge="1" parent="1" source="${src}" target="${trg}" style="${style}"><mxGeometry relative="1" as="geometry"/></mxCell>`
    );

  // ==================== 1. TOP HEADER BANNER (y=12..66) ====================
  cell("hdr_num", "18", 16, 12, 68, 54, "shape=rectangle;rounded=1;arcSize=14;fillColor=#6D28D9;strokeColor=#6D28D9;fontColor=#FFFFFF;fontSize=32;fontStyle=1;align=center;verticalAlign=middle;");
  
  cell(
    "hdr_title",
    `<div style='font-size:24px;font-weight:900;color:#0F172A;letter-spacing:0.5px;'>Security / Trust Boundary</div>` +
    `<div style='font-size:12.5px;font-weight:700;color:#6D28D9;margin-top:2px;'>Use Case: NovaCura – Regulatory Intelligence Platform</div>` +
    `<div style='font-size:11px;color:#64748B;margin-top:2px;'>Environment: Production &nbsp;|&nbsp; Region: us-central1 &nbsp;|&nbsp; Last Updated: May 8, 2025</div>`,
    94,
    12,
    760,
    54,
    "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;"
  );

  const brandHtml = `<table style="width:100%;border-collapse:collapse;"><tr><td style="width:36px;vertical-align:middle;text-align:center;"><span style="font-size:32px;">🧬</span></td><td style="text-align:left;vertical-align:middle;padding-left:8px;"><div style="font-size:24px;font-weight:900;color:#0284C7;letter-spacing:1px;">NOVACURA</div><div style="font-size:10.5px;color:#64748B;font-weight:600;font-style:italic;">AI-Powered Regulatory Intelligence Platform</div></td></tr></table>`;
  cell("hdr_brand", brandHtml, 860, 12, 270, 54, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  const objHtml = `<div style='font-size:10.5px;font-weight:900;color:#1E3A8A;margin-bottom:2px;'>OBJECTIVE</div><div style='font-size:8.5px;line-height:1.35;color:#0F172A;'>
    Enforce defense-in-depth with clear trust boundaries, least privilege access, network segmentation, and data protection across all layers.
  </div>`;
  cell("hdr_obj", objHtml, 1140, 12, 380, 54, "rounded=1;arcSize=8;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.2;html=1;align=left;verticalAlign=middle;padding=6;");

  // ==================== 2. LEFT: USERS & EXTERNAL + PERIMETER (x=16..290, y=86..560) ====================
  // Users & External Box (w=110, h=470)
  cell("box_users", "", 16, 86, 110, 470, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;");
  cell("lbl_users", "USERS &amp;<br/>EXTERNAL", 16, 86, 110, 30, "shape=rectangle;rounded=1;arcSize=8;fillColor=#F0FDF4;strokeColor=#CBD5E1;fontColor=#16A34A;fontSize=8.5;fontStyle=1;html=1;align=center;verticalAlign=middle;");

  const userActors = [
    { id: "u_hum", t: "Human Users", icon: "👤" },
    { id: "u_part", t: "Partners /<br/>Vendors", icon: "👥" },
    { id: "u_ext_app", t: "External<br/>Applications", icon: "💻" }
  ];
  userActors.forEach((ua, idx) => {
    const uy = 132 + idx * 140;
    cell(ua.id, `<div style="font-size:22px;text-align:center;">${ua.icon}</div><div style="font-size:8px;font-weight:800;color:#0F172A;text-align:center;line-height:1.15;margin-top:2px;">${ua.t}</div>`, 24, uy, 94, 96, "rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=4;");
  });

  // Internet Perimeter Box (w=130, h=470)
  cell("box_internet", "", 160, 86, 130, 470, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;");
  cell("lbl_internet", "INTERNET", 160, 86, 130, 26, "shape=rectangle;rounded=1;arcSize=8;fillColor=#EFF6FF;strokeColor=#CBD5E1;fontColor=#1E40AF;fontSize=9;fontStyle=1;html=1;align=center;verticalAlign=middle;");

  cell("node_net_cloud", "<div style='font-size:22px;text-align:center;'>🌐</div><div style='font-size:8px;font-weight:800;color:#0F172A;text-align:center;margin-top:2px;'>Internet</div>", 172, 132, 106, 96, "rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=4;");
  cell("node_net_ddos", "<div style='font-size:22px;text-align:center;'>🛡️</div><div style='font-size:7.5px;font-weight:800;color:#0F172A;text-align:center;line-height:1.15;margin-top:2px;'>DDoS Protection<br/>(Cloud Armor)</div>", 172, 272, 106, 96, "rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=4;");
  cell("node_net_waf", "<div style='font-size:22px;text-align:center;'>🔒</div><div style='font-size:7.5px;font-weight:800;color:#0F172A;text-align:center;line-height:1.15;margin-top:2px;'>WAF<br/>(Cloud Armor)</div>", 172, 412, 106, 96, "rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=4;");

  // Ingress connectors with locks
  edge("e_u_to_net", "u_hum", "node_net_cloud", "strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;endSize=4;");
  cell("lbl_lock_https", "🔒<br/>HTTPS<br/>TLS 1.2+", 120, 146, 36, 40, "text;html=1;strokeColor=none;fillColor=none;fontColor=#0F172A;fontSize=6.5;fontStyle=1;align=center;");

  edge("e_app_to_waf", "u_ext_app", "node_net_waf", "strokeColor=#0F172A;strokeWidth=1.5;dashed=1;endArrow=classic;endSize=4;");
  cell("lbl_lock_vpn", "🔒<br/>Admin Access<br/>(VPN)", 116, 426, 42, 40, "text;html=1;strokeColor=none;fillColor=none;fontColor=#0F172A;fontSize=6.5;fontStyle=1;align=center;");

  // Network Boundary line (x=306)
  cell("lbl_net_boundary", "🛡️ NETWORK<br/>BOUNDARY", 286, 68, 64, 20, "text;html=1;strokeColor=none;fillColor=none;fontColor=#2563EB;fontSize=7;fontStyle=1;align=center;");

  // ==================== 3. CENTER: GOOGLE CLOUD – TRUSTED ZONE (x=326..1000, y=86..560, w=674, h=470) ====================
  cell("box_gcp_trusted", "", 326, 86, 674, 470, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.8;");
  cell("lbl_gcp_trusted", "☁️ GOOGLE CLOUD – TRUSTED ZONE (us-central1)", 326, 90, 674, 18, "text;html=1;strokeColor=none;fillColor=none;fontColor=#2563EB;fontSize=10;fontStyle=1;align=center;verticalAlign=middle;");

  // 4 Zones inside Trusted Zone:
  // 1. Edge / Perimeter (w=148)
  cell("box_z_edge", "", 336, 116, 148, 428, "rounded=1;arcSize=6;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.2;");
  cell("lbl_z_edge", "EDGE / PERIMETER", 336, 118, 148, 16, "text;html=1;strokeColor=none;fillColor=none;fontColor=#1E40AF;fontSize=8;fontStyle=1;align=center;verticalAlign=middle;");

  cell("edge_lb", "<div style='font-size:18px;text-align:center;'>🌐</div><div style='font-size:7.5px;font-weight:800;color:#0F172A;text-align:center;'>External HTTP(S)<br/>Load Balancer</div>", 344, 140, 132, 100, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=3;");
  cell("edge_armor", "<div style='font-size:18px;text-align:center;'>🛡️</div><div style='font-size:7.5px;font-weight:800;color:#0F172A;text-align:center;line-height:1.15;'>Cloud Armor<br/><span style='font-size:6.5px;color:#64748B;'>(WAF, Rate Limiting,<br/>IP Reputation)</span></div>", 344, 252, 132, 126, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=3;");
  cell("edge_cdn", "<div style='font-size:18px;text-align:center;'>⚡</div><div style='font-size:7.5px;font-weight:800;color:#0F172A;text-align:center;'>Cloud CDN</div>", 344, 390, 132, 138, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=3;");

  edge("e_net_to_edge", "node_net_ddos", "edge_armor", "strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;endSize=4;");

  // 2. Application Zone (Private Subnets) (w=156)
  cell("box_z_app", "", 492, 116, 156, 428, "rounded=1;arcSize=6;fillColor=#F0FDF4;strokeColor=#BBF7D0;strokeWidth=1.2;dashed=1;");
  cell("lbl_z_app", "APPLICATION ZONE<br/>(PRIVATE SUBNETS)", 492, 118, 156, 24, "text;html=1;strokeColor=none;fillColor=none;fontColor=#16A34A;fontSize=7.5;fontStyle=1;html=1;align=center;verticalAlign=middle;");

  cell("app_front", "<div style='font-size:18px;text-align:center;'>💻</div><div style='font-size:7.5px;font-weight:800;color:#0F172A;text-align:center;'>Frontend<br/><span style='color:#64748B;'>(Web UI)</span></div>", 502, 150, 136, 100, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=3;");
  cell("app_gw", "<div style='font-size:18px;text-align:center;'>⚙️</div><div style='font-size:7.5px;font-weight:800;color:#0F172A;text-align:center;'>API Gateway<br/><span style='color:#64748B;'>(Cloud Endpoints)</span></div>", 502, 262, 136, 116, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=3;");
  cell("app_back", "<div style='font-size:18px;text-align:center;'>⚙️</div><div style='font-size:7.5px;font-weight:800;color:#0F172A;text-align:center;'>Backend Services<br/><span style='color:#64748B;'>(GKE / Cloud Run)</span></div>", 502, 390, 136, 138, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=3;");

  edge("e_edge_to_app", "edge_armor", "app_gw", "strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;endSize=4;");

  // 3. Data Zone (Private Subnets) (w=156)
  cell("box_z_data", "", 656, 116, 156, 428, "rounded=1;arcSize=6;fillColor=#FAF5FF;strokeColor=#E9D5FF;strokeWidth=1.2;dashed=1;");
  cell("lbl_z_data", "DATA ZONE<br/>(PRIVATE SUBNETS)", 656, 118, 156, 24, "text;html=1;strokeColor=none;fillColor=none;fontColor=#7C3AED;fontSize=7.5;fontStyle=1;html=1;align=center;verticalAlign=middle;");

  cell("dat_db", "<div style='font-size:18px;text-align:center;'>🗄️</div><div style='font-size:7.5px;font-weight:800;color:#0F172A;text-align:center;'>Primary Database<br/><span style='color:#64748B;'>(Cloud SQL)</span></div>", 666, 150, 136, 100, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=3;");
  cell("dat_gcs", "<div style='font-size:18px;text-align:center;'>🗃️</div><div style='font-size:7.5px;font-weight:800;color:#0F172A;text-align:center;'>Object Storage<br/><span style='color:#64748B;'>(Cloud Storage)</span></div>", 666, 262, 136, 116, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=3;");
  cell("dat_cache", "<div style='font-size:18px;text-align:center;'>💾</div><div style='font-size:7.5px;font-weight:800;color:#0F172A;text-align:center;'>Cache<br/><span style='color:#64748B;'>(Memorystore Redis)</span></div>", 666, 390, 136, 138, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=3;");

  edge("e_app_to_dat", "app_gw", "dat_gcs", "strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;startArrow=classic;endSize=4;startSize=4;");

  // 4. Management Zone (w=176)
  cell("box_z_mgmt", "", 820, 116, 170, 428, "rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("lbl_z_mgmt", "MANAGEMENT ZONE", 820, 118, 170, 16, "text;html=1;strokeColor=none;fillColor=none;fontColor=#64748B;fontSize=8;fontStyle=1;align=center;verticalAlign=middle;");

  const mgmtItems = [
    { t: "IAM &amp; Admin<br/><span style='color:#64748B;'>(Least Privilege)</span>", icon: "🛡️" },
    { t: "Secret Manager<br/><span style='color:#64748B;'>(Cloud KMS Encrypted)</span>", icon: "🔒" },
    { t: "Cloud Logging<br/>&amp; Monitoring", icon: "📊" },
    { t: "Security Command<br/>Center (SCC)", icon: "🚨" }
  ];
  mgmtItems.forEach((mg, idx) => {
    const my = 142 + idx * 98;
    cell(`mgmt_${idx}`, `<div style="font-size:16px;text-align:center;">${mg.icon}</div><div style="font-size:7.5px;font-weight:800;color:#0F172A;text-align:center;line-height:1.15;margin-top:2px;">${mg.t}</div>`, 828, my, 154, 86, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=3;");
  });

  // ==================== 4. DATA CLASSIFICATION COLUMN (x=1016..1140, y=86..560, w=124, h=470) ====================
  cell("box_data_class", "", 1016, 86, 124, 470, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#DC2626;strokeWidth=1.5;dashed=1;");
  cell("lbl_data_class", "🛡️ DATA<br/>CLASSIFICATION", 1016, 88, 124, 28, "text;html=1;strokeColor=none;fillColor=none;fontColor=#DC2626;fontSize=8.5;fontStyle=1;html=1;align=center;verticalAlign=middle;");

  const dataClasses = [
    { t: "Restricted<br/><span style='font-size:7px;color:#64748B;'>Highly Confidential<br/>(PHI / PII)</span>", icon: "🔴", col: "#DC2626", bg: "#FEF2F2" },
    { t: "Confidential<br/><span style='font-size:7px;color:#64748B;'>Business Critical<br/>Data</span>", icon: "🟠", col: "#D97706", bg: "#FFFBEB" },
    { t: "Internal<br/><span style='font-size:7px;color:#64748B;'>Operational<br/>Data</span>", icon: "🟡", col: "#CA8A04", bg: "#FEFCE8" },
    { t: "Public<br/><span style='font-size:7px;color:#64748B;'>Public Information</span>", icon: "🟢", col: "#16A34A", bg: "#F0FDF4" }
  ];
  dataClasses.forEach((dc, idx) => {
    const dy = 124 + idx * 106;
    cell(`dc_${idx}`, `<div style="font-size:16px;text-align:center;">${dc.icon}</div><div style="font-size:7.5px;font-weight:800;color:${dc.col};text-align:center;line-height:1.15;margin-top:2px;">${dc.t}</div>`, 1024, dy, 108, 96, `rounded=1;arcSize=6;fillColor=${dc.bg};strokeColor=${dc.col};strokeWidth=1.2;html=1;align=center;verticalAlign=middle;padding=3;`);
  });

  edge("e_data_to_class", "box_z_data", "box_data_class", "strokeColor=#DC2626;strokeWidth=1.5;dashed=1;endArrow=classic;endSize=4;");

  // ==================== 5. CROSS-CUTTING SECURITY CONTROLS (x=16..1140, y=570..670, w=1124, h=100) ====================
  cell("box_cross_sec", "", 16, 570, 1124, 100, "rounded=1;arcSize=8;fillColor=#FAF5FF;strokeColor=#7C3AED;strokeWidth=1.5;");
  cell("lbl_cross_sec", "CROSS-CUTTING SECURITY CONTROLS", 16, 572, 1124, 16, "text;html=1;strokeColor=none;fillColor=none;fontColor=#7C3AED;fontSize=9;fontStyle=1;align=center;verticalAlign=middle;");

  const crossControls = [
    { t: "Encryption<br/>In Transit<br/>(TLS 1.2+)", icon: "🔒" },
    { t: "Encryption<br/>At Rest<br/>(CMEK)", icon: "🔑" },
    { t: "VPC Service<br/>Controls", icon: "🛡️" },
    { t: "Private Google<br/>Access", icon: "🌐" },
    { t: "Firewall Rules<br/>(Egress / Ingress)", icon: "🧱" },
    { t: "Binary<br/>Authorization<br/>(GKE)", icon: "📦" },
    { t: "Security Scanning<br/>(Container &amp; Code)", icon: "🔍" },
    { t: "Audit Logging<br/>(Immutable)", icon: "📑" }
  ];
  crossControls.forEach((cc, idx) => {
    const cx = 26 + idx * 138;
    cell(`cc_${idx}`, `<div style="font-size:16px;text-align:center;">${cc.icon}</div><div style="font-size:7px;font-weight:800;color:#0F172A;text-align:center;line-height:1.15;margin-top:2px;">${cc.t}</div>`, cx, 592, 130, 68, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // ==================== 6. RIGHT SIDEBAR (x=1152..1520, y=86..670, w=368, h=584) ====================
  // 1. Legend
  cell("box_legend", "", 1152, 86, 368, 280, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;");
  cell("lbl_legend", "LEGEND", 1152, 86, 368, 24, "shape=rectangle;rounded=1;arcSize=8;fillColor=#F8FAFC;strokeColor=#CBD5E1;fontColor=#1E3A8A;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;");
  const legendHtml = `<table style="width:100%;border-collapse:collapse;font-size:8px;margin-top:4px;line-height:1.4;padding:4px 8px;">
    <tr style="height:22px;"><td style="width:40px;color:#0F172A;font-weight:900;">━━━━►</td><td>Trusted Data Flow</td></tr>
    <tr style="height:22px;"><td style="color:#64748B;font-weight:900;">┈┈┈┈►</td><td>Admin / Control Flow</td></tr>
    <tr style="height:22px;"><td style="color:#2563EB;font-weight:900;">🛡️</td><td>Security Control</td></tr>
    <tr style="height:22px;"><td style="color:#2563EB;font-size:12px;">🟦</td><td>Network / Security Zone</td></tr>
    <tr style="height:22px;"><td style="color:#7C3AED;font-size:12px;">🟪</td><td>Security Component</td></tr>
    <tr style="height:22px;"><td style="color:#16A34A;font-size:12px;">🟩</td><td>External Entity</td></tr>
    <tr style="height:22px;"><td style="color:#DC2626;font-size:12px;">🟥</td><td>Data Classification</td></tr>
  </table>`;
  cell("txt_legend", legendHtml, 1156, 114, 360, 248, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=4;");

  // 2. Technologies
  cell("box_tech", "", 1152, 376, 368, 294, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;");
  cell("lbl_tech", "TECHNOLOGIES", 1152, 376, 368, 24, "shape=rectangle;rounded=1;arcSize=8;fillColor=#EFF6FF;strokeColor=#CBD5E1;fontColor=#1E40AF;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;");
  const techHtml = `<div style="font-size:8.5px;line-height:1.65;color:#0F172A;padding:6px 12px;">
    🛡️ <b>Google Cloud Armor</b><br/>
    🌐 <b>Cloud Load Balancing</b><br/>
    🔒 <b>VPC &amp; Private Service Connect</b><br/>
    🗄️ <b>Cloud SQL &amp; Cloud Storage</b><br/>
    🔑 <b>Cloud KMS (CMEK)</b><br/>
    🔐 <b>Secret Manager</b><br/>
    🚨 <b>Security Command Center</b>
  </div>`;
  cell("txt_tech", techHtml, 1156, 404, 360, 260, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=4;");

  // ==================== 7. BOTTOM ROW: BENEFITS, BOUNDARIES, PRINCIPLES, COMPLIANCE, NOTES (y=680..954, h=274) ====================
  // 1. Key Benefits (w=290)
  cell("box_b_benefits", "", 16, 680, 290, 274, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;");
  cell("lbl_b_benefits", "KEY BENEFITS", 16, 680, 290, 24, "shape=rectangle;rounded=1;arcSize=8;fillColor=#F0FDF4;strokeColor=#CBD5E1;fontColor=#16A34A;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;");
  const bBenefitsHtml = `<div style="font-size:8px;line-height:1.55;color:#0F172A;padding:6px 8px;">
    ✔ <b>Clear segmentation</b> and trust boundaries<br/><br/>
    ✔ <b>Minimized attack surface</b> across ingress points<br/><br/>
    ✔ <b>Data protection &amp; compliance</b> enforcement<br/><br/>
    ✔ <b>Centralized visibility</b> and governance<br/><br/>
    ✔ <b>Reduced blast radius</b> for security incidents
  </div>`;
  cell("txt_b_benefits", bBenefitsHtml, 18, 708, 286, 240, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=2;");

  // 2. Trust Boundary Legend (w=280)
  cell("box_b_bound", "", 314, 680, 280, 274, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;");
  cell("lbl_b_bound", "TRUST BOUNDARY LEGEND", 314, 680, 280, 24, "shape=rectangle;rounded=1;arcSize=8;fillColor=#F8FAFC;strokeColor=#CBD5E1;fontColor=#1E3A8A;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;");
  const bBoundHtml = `<div style="font-size:8px;line-height:1.5;color:#0F172A;padding:6px 8px;">
    <span style="color:#2563EB;font-weight:900;">┈┈┈┈</span> <b>Internet Boundary</b> (Untrusted ↔ Perimeter)<br/><br/>
    <span style="color:#2563EB;font-weight:900;">━━━━</span> <b>Network Boundary</b> (Perimeter ↔ VPC)<br/><br/>
    <span style="color:#7C3AED;font-weight:900;">┈┈┈┈</span> <b>Subnet Boundary</b> (App ↔ Data Isolation)<br/><br/>
    <span style="color:#DC2626;font-weight:900;">┈┈┈┈</span> <b>Data Classification Boundary</b>
  </div>`;
  cell("txt_b_bound", bBoundHtml, 316, 708, 276, 240, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=2;");

  // 3. Security Principles Enforced (w=260)
  cell("box_b_princ", "", 602, 680, 260, 274, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#DC2626;strokeWidth=1.5;");
  cell("lbl_b_princ", "SECURITY PRINCIPLES ENFORCED", 602, 680, 260, 24, "shape=rectangle;rounded=1;arcSize=8;fillColor=#FEF2F2;strokeColor=#CBD5E1;fontColor=#DC2626;fontSize=9;fontStyle=1;align=center;verticalAlign=middle;");
  const bPrincHtml = `<div style="font-size:8px;line-height:1.6;color:#0F172A;padding:6px 8px;">
    🔒 <b>Least Privilege Access</b><br/>
    🛡️ <b>Zero Trust Network</b><br/>
    🧱 <b>Defense in Depth</b><br/>
    🔑 <b>Secure by Default</b><br/>
    ⚡ <b>Assume Breach</b>
  </div>`;
  cell("txt_b_princ", bPrincHtml, 604, 708, 256, 240, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=2;");

  // 4. Compliance Alignment (w=200)
  cell("box_b_comp", "", 870, 680, 200, 274, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;");
  cell("lbl_b_comp", "COMPLIANCE ALIGNMENT", 870, 680, 200, 24, "shape=rectangle;rounded=1;arcSize=8;fillColor=#EFF6FF;strokeColor=#CBD5E1;fontColor=#1E40AF;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");
  const bCompHtml = `<div style="font-size:8.5px;line-height:1.75;color:#0F172A;padding:6px 8px;">
    🛡️ <b>SOC 2</b><br/>
    🩺 <b>HIPAA</b><br/>
    🏛️ <b>ISO 27001</b><br/>
    🔒 <b>GDPR</b>
  </div>`;
  cell("txt_b_comp", bCompHtml, 872, 708, 196, 240, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=2;");

  // 5. Notes (w=434)
  cell("box_b_notes", "", 1078, 680, 442, 274, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;");
  cell("lbl_b_notes", "NOTES", 1078, 680, 442, 24, "shape=rectangle;rounded=1;arcSize=8;fillColor=#F8FAFC;strokeColor=#CBD5E1;fontColor=#1E3A8A;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;");
  const bNotesHtml = `<div style="font-size:8px;line-height:1.6;color:#0F172A;padding:6px 12px;">
    • All admin access via VPN / IAP with MFA<br/>
    • No public IPs on workloads or databases<br/>
    • Regular vulnerability scanning and patching<br/>
    • Secrets rotated and encrypted with KMS<br/>
    • Logs retained as per compliance policy
  </div>`;
  cell("txt_b_notes", bNotesHtml, 1080, 708, 438, 240, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=4;");

  // ==================== 8. FOOTER STATUS BAR (y=962, h=24) ====================
  const footerHtml = `<div style='font-size:9px;color:#64748B;display:flex;justify-content:space-between;align-items:center;'>
    <div><b>TRUST BOUNDARIES:</b> Zero Trust Architecture &nbsp;|&nbsp; <b>ENCRYPTION:</b> TLS 1.2+ / CMEK &nbsp;|&nbsp; <b>SEGMENTATION:</b> Multi-Tier Subnets</div>
    <div>Last Updated: May 8, 2025 &nbsp;|&nbsp; Next Review: Aug 8, 2025 &nbsp;|&nbsp; Enterprise Security Architecture</div>
  </div>`;
  cell("footer_status", footerHtml, 16, 962, 1504, 24, "rounded=1;arcSize=8;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=left;verticalAlign=middle;padding=4;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_18_security_trust_boundary" name="Template 18: Security / Trust Boundary">
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
