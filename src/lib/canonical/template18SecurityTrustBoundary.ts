/**
 * Canonical Architecture Template 18: Security / Trust Boundary
 * Exact 1:1 High-Fidelity Master Blueprint of images/18.png
 */

export function generateTemplate18SecurityTrustBoundaryXml(
  flavor: string = "biopharma",
  theme: "dark" | "light" = "light"
): string {
  const isDark = theme === "dark";
  const E = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const c: string[] = [];
  let idCounter = 100;
  const nid = () => `c_${idCounter++}`;

  const rect = (id: string, val: string, x: number, y: number, w: number, h: number, style: string) => {
    c.push(
      `<mxCell id="${id}" value="${E(val)}" style="rounded=1;whiteSpace=wrap;html=1;${style}" vertex="1" parent="1">` +
      `<mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/>` +
      `</mxCell>`
    );
  };

  const edge = (id: string, val: string, src: string, tgt: string, style: string, pts: Array<{x: number, y: number}> = []) => {
    let ptsXml = "";
    if (pts.length > 0) {
      ptsXml = `<Array as="points">${pts.map(p => `<mxPoint x="${p.x}" y="${p.y}"/>`).join("")}</Array>`;
    }
    c.push(
      `<mxCell id="${id}" value="${E(val)}" edge="1" parent="1" source="${src}" target="${tgt}" style="rounded=1;html=1;${style}">` +
      `<mxGeometry relative="1" as="geometry">${ptsXml}</mxGeometry>` +
      `</mxCell>`
    );
  };

  // 1. BRAND HEADER & METADATA (x=20..1560)
  rect("num_badge", "18", 20, 20, 48, 48, "fillColor=#1E3A8A;fontColor=#FFFFFF;fontSize=24;fontStyle=1;rounded=1;align=center;verticalAlign=middle;");
  rect("hdr_title", "<div style='font-size:24px;font-weight:800;color:#0F172A;letter-spacing:0.5px;'>Security / Trust Boundary</div><div style='font-size:11px;color:#1E3A8A;font-weight:700;margin-top:3px;'>Use Case: NovaCura – Regulatory Intelligence Platform &nbsp;|&nbsp; Environment: Production &nbsp;|&nbsp; Region: us-central1 &nbsp;|&nbsp; Last Updated: May 8, 2025</div>", 78, 16, 850, 56, "strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  rect("hdr_brand", "<div style='text-align:right;'><span style='font-size:20px;font-weight:800;color:#0284C7;'>🧬 NOVACURA</span><br/><span style='font-size:9.5px;color:#64748B;font-style:italic;'>AI-Powered Regulatory Intelligence Platform</span></div>", 940, 18, 280, 45, "strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

  // Objective Card (x=1240..1560, w=320)
  rect("card_obj", "<div style='font-size:8px;font-weight:800;color:#1E3A8A;margin-bottom:3px;'>OBJECTIVE</div><div style='font-size:7.5px;line-height:1.4;color:#0F172A;'>Enforce defense-in-depth with clear trust boundaries, least privilege access, network segmentation, and data protection across all layers.</div>", 1240, 18, 320, 52, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=6;");

  // 2. LEFT COLUMN: USERS & EXTERNAL (x=20..130, w=110, y=190..610)
  rect("hdr_users", "<span style='font-size:8px;font-weight:800;color:#16A34A;'>USERS &amp;<br/>EXTERNAL</span>", 20, 190, 110, 26, "fillColor=#DCFCE7;strokeColor=#16A34A;rounded=1;align=center;verticalAlign=middle;");
  rect("box_users", "", 20, 218, 110, 392, "fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;rounded=1;");
  rect("u_human", "<div style='font-size:7.5px;font-weight:700;'>👤<br/>Human Users</div>", 28, 240, 94, 52, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("u_part", "<div style='font-size:7.5px;font-weight:700;'>👥<br/>Partners /<br/>Vendors</div>", 28, 350, 94, 52, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("u_apps", "<div style='font-size:7.5px;font-weight:700;'>💻<br/>External<br/>Applications</div>", 28, 470, 94, 52, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");

  // Ingress Locks & Labels
  rect("lock_https", "<span style='font-size:6.8px;font-weight:800;color:#0F172A;background:#FFFFFF;border:1px solid #CBD5E1;padding:2px 4px;border-radius:4px;'>🔒 HTTPS<br/>TLS 1.2+</span>", 140, 252, 60, 28, "strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  rect("lock_vpn", "<span style='font-size:6.5px;font-weight:800;color:#64748B;background:#FFFFFF;border:1px solid #CBD5E1;padding:2px 4px;border-radius:4px;'>🔒 Admin Access<br/>(VPN)</span>", 136, 482, 68, 28, "strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // Perimeter Intermediaries: Internet (x=210..340, w=130, y=225..595)
  rect("box_internet", "", 210, 225, 130, 385, "fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=1.2;rounded=1;");
  rect("lbl_internet", "<span style='font-size:8.5px;font-weight:800;color:#2563EB;'>INTERNET</span>", 210, 232, 130, 16, "strokeColor=none;fillColor=none;align=center;");
  rect("i_net", "<div style='font-size:7.5px;font-weight:700;'>🌐<br/>Internet</div>", 220, 260, 110, 48, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("i_ddos", "<div style='font-size:7.2px;font-weight:700;'>🛡️<br/>DDoS Protection<br/><span style='font-size:5.8px;color:#64748B;'>(Cloud Armor)</span></div>", 220, 365, 110, 56, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("i_waf", "<div style='font-size:7.2px;font-weight:700;'>☁️<br/>WAF<br/><span style='font-size:5.8px;color:#64748B;'>(Cloud Armor)</span></div>", 220, 485, 110, 56, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");

  // Vertical Network Boundary Line (x=375)
  rect("lbl_net_bound", "<div style='font-size:7.5px;font-weight:800;color:#2563EB;text-align:center;'>🛡️<br/>NETWORK<br/>BOUNDARY</div>", 348, 160, 60, 36, "strokeColor=none;fillColor=none;align=center;");
  rect("line_net_bound", "", 377, 200, 2, 410, "fillColor=#2563EB;strokeColor=#2563EB;strokeWidth=1.5;dashed=1;dashPattern=6 4;");

  // 3. CENTER MAIN BOX: GOOGLE CLOUD – TRUSTED ZONE (us-central1) (x=405..1105, w=700)
  rect("box_trusted_zone", "", 405, 190, 700, 420, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;rounded=1;");
  rect("lbl_trusted_zone", "<span style='font-size:10px;font-weight:800;color:#2563EB;'>☁️ GOOGLE CLOUD – TRUSTED ZONE (us-central1)</span>", 415, 198, 450, 18, "strokeColor=none;fillColor=none;align=left;");

  // Sub-zone 1: Edge / Perimeter (x=418..575, w=157)
  rect("box_z_edge", "", 418, 225, 157, 370, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;");
  rect("lbl_z_edge", "<span style='font-size:7.5px;font-weight:800;color:#1E3A8A;'>EDGE / PERIMETER</span>", 418, 232, 157, 14, "strokeColor=none;fillColor=none;align=center;");
  rect("ze_lb", "<div style='font-size:7px;font-weight:700;'>⚖️ External HTTP(S)<br/>Load Balancer</div>", 426, 260, 141, 46, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("ze_armor", "<div style='font-size:7px;font-weight:700;'>🛡️ Cloud Armor<br/><span style='font-size:5.5px;color:#64748B;'>(WAF, Rate Limiting, IP Reputation)</span></div>", 426, 355, 141, 60, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("ze_cdn", "<div style='font-size:7px;font-weight:700;'>⚡ Cloud CDN</div>", 426, 480, 141, 46, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");

  // Sub-zone 2: Application Zone (Private Subnets) (x=585..755, w=170)
  rect("box_z_app", "", 585, 225, 170, 370, "fillColor=#F0FDF4;strokeColor=#16A34A;strokeWidth=1;dashed=1;dashPattern=4 4;rounded=1;");
  rect("lbl_z_app", "<span style='font-size:7.5px;font-weight:800;color:#16A34A;'>APPLICATION ZONE<br/>(PRIVATE SUBNETS)</span>", 585, 230, 170, 20, "strokeColor=none;fillColor=none;align=center;");
  rect("za_fe", "<div style='font-size:7px;font-weight:700;'>🖥️ Frontend<br/><span style='font-size:5.5px;color:#64748B;'>(Web UI)</span></div>", 594, 260, 152, 46, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("za_gw", "<div style='font-size:7px;font-weight:700;'>🔌 API Gateway<br/><span style='font-size:5.5px;color:#64748B;'>(Cloud Endpoints)</span></div>", 594, 355, 152, 60, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("za_be", "<div style='font-size:7px;font-weight:700;'>⚙️ Backend Services<br/><span style='font-size:5.5px;color:#64748B;'>(GKE / Cloud Run)</span></div>", 594, 480, 152, 46, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");

  // Sub-zone 3: Data Zone (Private Subnets) (x=765..935, w=170)
  rect("box_z_data", "", 765, 225, 170, 370, "fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=1;dashed=1;dashPattern=4 4;rounded=1;");
  rect("lbl_z_data", "<span style='font-size:7.5px;font-weight:800;color:#2563EB;'>DATA ZONE<br/>(PRIVATE SUBNETS)</span>", 765, 230, 170, 20, "strokeColor=none;fillColor=none;align=center;");
  rect("zd_db", "<div style='font-size:7px;font-weight:700;'>🗄️ Primary Database<br/><span style='font-size:5.5px;color:#64748B;'>(Cloud SQL)</span></div>", 774, 260, 152, 46, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("zd_obj", "<div style='font-size:7px;font-weight:700;'>🗃️ Object Storage<br/><span style='font-size:5.5px;color:#64748B;'>(Cloud Storage)</span></div>", 774, 355, 152, 60, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("zd_cache", "<div style='font-size:7px;font-weight:700;'>⚡ Cache<br/><span style='font-size:5.5px;color:#64748B;'>(Memorystore Redis)</span></div>", 774, 480, 152, 46, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");

  // Sub-zone 4: Management Zone (x=945..1093, w=148)
  rect("box_z_mgmt", "", 945, 225, 148, 370, "fillColor=#FAF5FF;strokeColor=#9333EA;rounded=1;");
  rect("lbl_z_mgmt", "<span style='font-size:7.5px;font-weight:800;color:#9333EA;'>MANAGEMENT ZONE</span>", 945, 232, 148, 14, "strokeColor=none;fillColor=none;align=center;");
  rect("zm_iam", "<div style='font-size:7px;font-weight:700;'>🛡️ IAM &amp; Admin<br/><span style='font-size:5.5px;color:#64748B;'>(Least Privilege)</span></div>", 953, 260, 132, 46, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("zm_sec", "<div style='font-size:7px;font-weight:700;'>🔒 Secret Manager<br/><span style='font-size:5.5px;color:#64748B;'>(Cloud Encrypted)</span></div>", 953, 335, 132, 56, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("zm_log", "<div style='font-size:7px;font-weight:700;'>📊 Cloud Logging<br/>&amp; Monitoring</div>", 953, 420, 132, 46, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("zm_scc", "<div style='font-size:7px;font-weight:700;'>🛡️ Security Command<br/>Center (SCC)</div>", 953, 495, 132, 46, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");

  // Flow Connectors
  edge(nid(), "", "i_ddos", "ze_armor", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endSize=4;");
  edge(nid(), "", "ze_armor", "za_gw", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endSize=4;");
  edge(nid(), "", "za_gw", "zd_obj", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;startArrow=block;endSize=4;startSize=4;");

  // 4. RIGHT PILLAR: DATA CLASSIFICATION (x=1135..1285, w=150, y=190..610)
  rect("lbl_dc_bound", "<div style='font-size:7.5px;font-weight:800;color:#DC2626;text-align:center;'>🛡️<br/>DATA<br/>CLASSIFICATION</div>", 1108, 160, 75, 36, "strokeColor=none;fillColor=none;align=center;");
  rect("line_dc_bound", "", 1120, 200, 2, 410, "fillColor=#DC2626;strokeColor=#DC2626;strokeWidth=1.5;dashed=1;dashPattern=6 4;");

  rect("hdr_data_class", "<span style='font-size:8px;font-weight:800;color:#DC2626;'>🛡️ DATA CLASSIFICATION</span>", 1135, 190, 150, 26, "fillColor=#FEE2E2;strokeColor=#DC2626;rounded=1;align=center;verticalAlign=middle;");
  rect("box_data_class", "", 1135, 218, 150, 392, "fillColor=#FFFFFF;strokeColor=#DC2626;strokeWidth=1.2;dashed=1;dashPattern=4 4;rounded=1;");
  rect("dc_res", "<div style='font-size:7px;font-weight:700;color:#DC2626;'>🔒<br/><b>Restricted</b><br/><span style='font-size:5.8px;color:#64748B;'>Highly Confidential<br/>(PHI / PII)</span></div>", 1144, 235, 132, 65, "fillColor=#FEF2F2;strokeColor=#DC2626;rounded=1;align=center;verticalAlign=middle;");
  rect("dc_conf", "<div style='font-size:7px;font-weight:700;color:#EA580C;'>🔒<br/><b>Confidential</b><br/><span style='font-size:5.8px;color:#64748B;'>Business Critical<br/>Data</span></div>", 1144, 325, 132, 65, "fillColor=#FFF7ED;strokeColor=#EA580C;rounded=1;align=center;verticalAlign=middle;");
  rect("dc_int", "<div style='font-size:7px;font-weight:700;color:#D97706;'>🔒<br/><b>Internal</b><br/><span style='font-size:5.8px;color:#64748B;'>Operational<br/>Data</span></div>", 1144, 415, 132, 65, "fillColor=#FFFBEB;strokeColor=#D97706;rounded=1;align=center;verticalAlign=middle;");
  rect("dc_pub", "<div style='font-size:7px;font-weight:700;color:#16A34A;'>🔒<br/><b>Public</b><br/><span style='font-size:5.8px;color:#64748B;'>Public Information</span></div>", 1144, 505, 132, 60, "fillColor=#F0FDF4;strokeColor=#16A34A;rounded=1;align=center;verticalAlign=middle;");

  // 5. RIGHT COLUMN: LEGEND & TECHNOLOGIES (x=1305..1560, w=255)
  rect("hdr_legend", "<span style='font-size:8.5px;font-weight:800;color:#1E3A8A;'>LEGEND</span>", 1305, 82, 255, 22, "fillColor=#EFF6FF;strokeColor=#1E3A8A;rounded=1;align=center;verticalAlign=middle;");
  rect("card_legend", "<div style='font-size:7px;line-height:1.65;padding:4px;color:#0F172A;'>" +
    "─── <b>Trusted Data Flow</b><br/>" +
    "- - - <b>Admin / Control Flow</b><br/>" +
    "🛡️ <b>Security Control</b><br/>" +
    "<span style='color:#2563EB;'>■ Network / Security Zone</span> &nbsp;&nbsp; <span style='color:#9333EA;'>■ Security Component</span><br/>" +
    "<span style='color:#16A34A;'>■ External Entity</span> &nbsp;&nbsp; <span style='color:#DC2626;'>■ Data Classification</span>" +
    "</div>", 1305, 104, 255, 130, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;");

  rect("hdr_tech", "<span style='font-size:8.5px;font-weight:800;color:#2563EB;'>TECHNOLOGIES</span>", 1305, 245, 255, 22, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=center;verticalAlign=middle;");
  rect("card_tech", "<div style='font-size:7px;line-height:1.6;padding:4px;color:#0F172A;'>" +
    "🛡️ <b>Google Cloud Armor</b> &nbsp;&nbsp;&nbsp; ⚖️ <b>Cloud Load Balancing</b><br/>" +
    "🌐 <b>VPC</b> &nbsp;&nbsp;&nbsp; 🗄️ <b>Cloud SQL</b><br/>" +
    "🗃️ <b>Cloud Storage</b> &nbsp;&nbsp;&nbsp; 🔐 <b>Cloud KMS</b><br/>" +
    "🔑 <b>Secret Manager</b> &nbsp;&nbsp;&nbsp; 🛡️ <b>Security Command Center</b>" +
    "</div>", 1305, 267, 255, 140, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;");

  // 6. CROSS-CUTTING SECURITY CONTROLS BANNER (x=20..1285, y=630..695, w=1265)
  rect("box_sec_ctrls", "<div style='font-size:8px;font-weight:800;color:#7C3AED;margin-bottom:4px;text-align:center;'>CROSS-CUTTING SECURITY CONTROLS</div>" +
    "<div style='font-size:7px;color:#0F172A;display:flex;justify-content:space-around;text-align:center;'>" +
    "<div>🔒 <b>Encryption In Transit</b><br/><span style='font-size:5.5px;color:#64748B;'>(TLS 1.2+)</span></div>" +
    "<div>🔐 <b>Encryption At Rest</b><br/><span style='font-size:5.5px;color:#64748B;'>(CMEK)</span></div>" +
    "<div>🛡️ <b>VPC Service Controls</b></div>" +
    "<div>⚡ <b>Private Google Access</b></div>" +
    "<div>🧱 <b>Firewall Rules</b><br/><span style='font-size:5.5px;color:#64748B;'>(Egress / Ingress)</span></div>" +
    "<div>⚙️ <b>Binary Authorization</b><br/><span style='font-size:5.5px;color:#64748B;'>(GKE)</span></div>" +
    "<div>🔍 <b>Security Scanning</b><br/><span style='font-size:5.5px;color:#64748B;'>(Container &amp; Code)</span></div>" +
    "<div>📑 <b>Audit Logging</b><br/><span style='font-size:5.5px;color:#64748B;'>(Immutable)</span></div>" +
    "</div>", 20, 630, 1265, 55, "fillColor=#FAF5FF;strokeColor=#7C3AED;strokeWidth=1.2;rounded=1;align=center;verticalAlign=middle;");

  // 7. BOTTOM ROW: 5 PANELS (x=20..1560, y=705..825)
  rect("bot_p1", "<div style='font-size:8px;font-weight:800;color:#16A34A;margin-bottom:6px;'>KEY BENEFITS</div>" +
    "<div style='font-size:7px;line-height:1.6;color:#0F172A;'>" +
    "✔ Clear segmentation and trust boundaries<br/>" +
    "✔ Minimized attack surface<br/>" +
    "✔ Data protection &amp; compliance enforcement<br/>" +
    "✔ Centralized visibility and governance<br/>" +
    "✔ Reduced blast radius for incidents" +
    "</div>", 20, 700, 290, 125, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=6;");

  rect("bot_p2", "<div style='font-size:8px;font-weight:800;color:#D97706;margin-bottom:6px;'>TRUST BOUNDARY LEGEND</div>" +
    "<div style='font-size:7px;line-height:1.6;color:#0F172A;'>" +
    "- - - Internet Boundary (Untrusted ↔ Perimeter)<br/>" +
    "─── Network Boundary (Perimeter ↔ VPC)<br/>" +
    "- - - Subnet Boundary (App ↔ Data Isolation)<br/>" +
    "- - - Data Classification Boundary" +
    "</div>", 325, 700, 310, 125, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=6;");

  rect("bot_p3", "<div style='font-size:8px;font-weight:800;color:#DC2626;margin-bottom:6px;'>SECURITY PRINCIPLES ENFORCED</div>" +
    "<div style='font-size:7px;line-height:1.6;color:#0F172A;'>" +
    "🔒 Least Privilege Access<br/>" +
    "🛡️ Zero Trust Network<br/>" +
    "🏰 Defense in Depth<br/>" +
    "🔐 Secure by Default<br/>" +
    "⚡ Assume Breach" +
    "</div>", 650, 700, 280, 125, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=6;");

  rect("bot_p4", "<div style='font-size:8px;font-weight:800;color:#2563EB;margin-bottom:6px;'>COMPLIANCE ALIGNMENT</div>" +
    "<div style='font-size:7px;line-height:1.6;color:#0F172A;'>" +
    "🛡️ <b>SOC 2</b><br/>" +
    "🩺 <b>HIPAA</b><br/>" +
    "🏛️ <b>ISO 27001</b><br/>" +
    "🔒 <b>GDPR</b>" +
    "</div>", 945, 700, 225, 125, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=6;");

  rect("bot_p5", "<div style='font-size:8px;font-weight:800;color:#1E3A8A;margin-bottom:6px;'>NOTES</div>" +
    "<div style='font-size:7px;line-height:1.6;color:#0F172A;'>" +
    "• All admin access via VPN / IAP with MFA<br/>" +
    "• No public IPs on workloads or databases<br/>" +
    "• Regular vulnerability scanning and patching<br/>" +
    "• Secrets rotated and encrypted with KMS<br/>" +
    "• Logs retained as per compliance policy" +
    "</div>", 1185, 700, 375, 125, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=6;");

  // Footer Metadata
  rect("footer_version", "<span style='font-size:9px;color:#64748B;font-weight:600;'>Version: 1.0</span>", 20, 835, 200, 18, "strokeColor=none;fillColor=none;align=left;");
  rect("footer_date", "<span style='font-size:9px;color:#64748B;font-weight:600;'>Date: May 2024</span>", 1425, 835, 135, 18, "strokeColor=none;fillColor=none;align=right;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_18_security_trust_boundary" name="Template 18: Security / Trust Boundary">
    <mxGraphModel dx="1600" dy="1000" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="1000" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${c.join("\n        ")}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}

