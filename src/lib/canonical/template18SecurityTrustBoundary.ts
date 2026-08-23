/**
 * Canonical Architecture Template 18: Template 18: Security / Trust Boundary
 * High-fidelity 16:9 replication of images/18.png
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


  // 1. BRAND HEADER & METADATA
  rect("num_badge", "18", 20, 20, 48, 48, "fillColor=#1E3A8A;fontColor=#FFFFFF;fontSize=24;fontStyle=1;rounded=1;align=center;verticalAlign=middle;");
  rect("hdr_title", "<div style='font-size:22px;font-weight:800;color:#0F172A;letter-spacing:0.5px;'>Security / Trust Boundary</div><div style='font-size:11px;color:#1E3A8A;font-weight:700;margin-top:2px;'>Use Case: NovaCura – Regulatory Intelligence Platform &nbsp;|&nbsp; Environment: Production &nbsp;|&nbsp; Region: us-central1 &nbsp;|&nbsp; Last Updated: May 8, 2025</div>", 78, 18, 900, 50, "strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  rect("hdr_brand", "<div style='text-align:right;'><span style='font-size:18px;font-weight:800;color:#1E3A8A;'>🧬 NOVACURA</span><br/><span style='font-size:9.5px;color:#64748B;font-style:italic;'>AI-Powered Regulatory Intelligence Platform</span></div>", 1180, 18, 350, 45, "strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

  // Objective Card
  rect("card_obj", "<div style='font-size:8px;font-weight:800;color:#1E3A8A;margin-bottom:4px;'>OBJECTIVE</div><div style='font-size:7.5px;line-height:1.5;color:#0F172A;'>Enforce defense-in-depth with clear trust boundaries, least privilege access, network segmentation, and data protection across all layers.</div>", 1000, 18, 280, 50, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=6;");

  // 2. LEFT COLUMN: USERS & EXTERNAL
  rect("hdr_users", "<span style='font-size:8px;font-weight:800;color:#16A34A;'>USERS &amp;<br/>EXTERNAL</span>", 20, 150, 90, 24, "fillColor=#DCFCE7;strokeColor=#16A34A;rounded=1;align=center;verticalAlign=middle;");
  rect("box_users", "", 20, 174, 90, 340, "fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;rounded=1;");
  rect("u_human", "<div style='font-size:7.5px;font-weight:700;'>👤<br/>Human Users</div>", 26, 195, 78, 44, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("u_part", "<div style='font-size:7.5px;font-weight:700;'>👥<br/>Partners /<br/>Vendors</div>", 26, 290, 78, 44, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("u_apps", "<div style='font-size:7.5px;font-weight:700;'>💻<br/>External<br/>Applications</div>", 26, 395, 78, 44, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");

  // Perimeter Intermediaries: Internet & WAF
  rect("box_internet", "", 160, 174, 105, 340, "fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=1.2;rounded=1;");
  rect("lbl_internet", "<span style='font-size:8px;font-weight:800;color:#2563EB;'>INTERNET</span>", 160, 180, 105, 16, "strokeColor=none;fillColor=none;align=center;");
  rect("i_net", "<div style='font-size:7.5px;font-weight:700;'>🌐<br/>Internet</div>", 170, 205, 85, 40, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("i_ddos", "<div style='font-size:7.5px;font-weight:700;'>🛡️<br/>DDoS Protection<br/><span style='font-size:6px;color:#64748B;'>(Cloud Armor)</span></div>", 170, 290, 85, 46, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("i_waf", "<div style='font-size:7.5px;font-weight:700;'>☁️<br/>WAF<br/><span style='font-size:6px;color:#64748B;'>(Cloud Armor)</span></div>", 170, 395, 85, 46, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");

  edge(nid(), "HTTPS TLS 1.2+", "u_human", "i_net", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endSize=4;labelBackgroundColor=#FFFFFF;fontSize=7;");
  edge(nid(), "Admin Access (VPN)", "u_apps", "i_waf", "edgeStyle=none;strokeColor=#64748B;strokeWidth=1.2;dashed=1;dashPattern=4 4;endArrow=block;endSize=4;labelBackgroundColor=#FFFFFF;fontSize=6.5;");

  // Vertical Network Boundary Line
  rect("lbl_net_bound", "<div style='font-size:7.5px;font-weight:800;color:#2563EB;text-align:center;'>🛡️<br/>NETWORK<br/>BOUNDARY</div>", 285, 110, 60, 36, "strokeColor=none;fillColor=none;align=center;");
  rect("line_net_bound", "", 314, 148, 2, 380, "fillColor=#2563EB;strokeColor=#2563EB;strokeWidth=1.5;dashed=1;dashPattern=6 4;");

  // 3. CENTER MAIN BOX: GOOGLE CLOUD – TRUSTED ZONE (us-central1)
  rect("box_trusted_zone", "", 330, 140, 560, 380, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;rounded=1;");
  rect("lbl_trusted_zone", "<span style='font-size:9.5px;font-weight:800;color:#2563EB;'>☁️ GOOGLE CLOUD – TRUSTED ZONE (us-central1)</span>", 340, 148, 400, 18, "strokeColor=none;fillColor=none;align=left;");

  // 4 Internal Zones:
  // Edge / Perimeter
  rect("box_z_edge", "", 340, 174, 125, 335, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;");
  rect("lbl_z_edge", "<span style='font-size:7.5px;font-weight:800;color:#1E3A8A;'>EDGE / PERIMETER</span>", 340, 180, 125, 14, "strokeColor=none;fillColor=none;align=center;");
  rect("ze_lb", "<div style='font-size:6.8px;font-weight:700;'>⚖️ External HTTP(S)<br/>Load Balancer</div>", 346, 205, 113, 38, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("ze_armor", "<div style='font-size:6.8px;font-weight:700;'>🛡️ Cloud Armor<br/><span style='font-size:5.5px;color:#64748B;'>(WAF, Rate Limiting, IP Reputation)</span></div>", 346, 280, 113, 50, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("ze_cdn", "<div style='font-size:6.8px;font-weight:700;'>⚡ Cloud CDN</div>", 346, 385, 113, 38, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");

  // Application Zone (Private Subnets)
  rect("box_z_app", "", 475, 174, 125, 335, "fillColor=#F0FDF4;strokeColor=#16A34A;strokeWidth=1;dashed=1;dashPattern=4 4;rounded=1;");
  rect("lbl_z_app", "<span style='font-size:7.5px;font-weight:800;color:#16A34A;'>APPLICATION ZONE<br/>(PRIVATE SUBNETS)</span>", 475, 178, 125, 20, "strokeColor=none;fillColor=none;align=center;");
  rect("za_fe", "<div style='font-size:6.8px;font-weight:700;'>🖥️ Frontend<br/><span style='font-size:5.5px;color:#64748B;'>(Web UI)</span></div>", 481, 205, 113, 38, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("za_gw", "<div style='font-size:6.8px;font-weight:700;'>🔌 API Gateway<br/><span style='font-size:5.5px;color:#64748B;'>(Cloud Endpoints)</span></div>", 481, 280, 113, 50, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("za_be", "<div style='font-size:6.8px;font-weight:700;'>⚙️ Backend Services<br/><span style='font-size:5.5px;color:#64748B;'>(GKE / Cloud Run)</span></div>", 481, 385, 113, 38, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");

  // Data Zone (Private Subnets)
  rect("box_z_data", "", 610, 174, 125, 335, "fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=1;dashed=1;dashPattern=4 4;rounded=1;");
  rect("lbl_z_data", "<span style='font-size:7.5px;font-weight:800;color:#2563EB;'>DATA ZONE<br/>(PRIVATE SUBNETS)</span>", 610, 178, 125, 20, "strokeColor=none;fillColor=none;align=center;");
  rect("zd_db", "<div style='font-size:6.8px;font-weight:700;'>🗄️ Primary Database<br/><span style='font-size:5.5px;color:#64748B;'>(Cloud SQL)</span></div>", 616, 205, 113, 38, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("zd_obj", "<div style='font-size:6.8px;font-weight:700;'>🗃️ Object Storage<br/><span style='font-size:5.5px;color:#64748B;'>(Cloud Storage)</span></div>", 616, 280, 113, 50, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("zd_cache", "<div style='font-size:6.8px;font-weight:700;'>⚡ Cache<br/><span style='font-size:5.5px;color:#64748B;'>(Memorystore Redis)</span></div>", 616, 385, 113, 38, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");

  // Management Zone
  rect("box_z_mgmt", "", 745, 174, 135, 335, "fillColor=#FAF5FF;strokeColor=#9333EA;rounded=1;");
  rect("lbl_z_mgmt", "<span style='font-size:7.5px;font-weight:800;color:#9333EA;'>MANAGEMENT ZONE</span>", 745, 180, 135, 14, "strokeColor=none;fillColor=none;align=center;");
  rect("zm_iam", "<div style='font-size:6.8px;font-weight:700;'>🛡️ IAM &amp; Admin<br/><span style='font-size:5.5px;color:#64748B;'>(Least Privilege)</span></div>", 752, 205, 121, 38, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("zm_sec", "<div style='font-size:6.8px;font-weight:700;'>🔒 Secret Manager<br/><span style='font-size:5.5px;color:#64748B;'>(Cloud Encrypted)</span></div>", 752, 280, 121, 50, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("zm_log", "<div style='font-size:6.8px;font-weight:700;'>📊 Cloud Logging<br/>&amp; Monitoring</div>", 752, 345, 121, 36, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("zm_scc", "<div style='font-size:6.8px;font-weight:700;'>🛡️ Security Command<br/>Center (SCC)</div>", 752, 395, 121, 36, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");

  // Lateral Flow Connectors
  edge(nid(), "", "box_internet", "ze_armor", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endSize=4;");
  edge(nid(), "", "ze_armor", "za_gw", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endSize=4;");
  edge(nid(), "", "za_gw", "zd_obj", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;startArrow=block;endSize=4;startSize=4;");

  // 4. RIGHT PILLAR: DATA CLASSIFICATION
  rect("hdr_data_class", "<span style='font-size:8px;font-weight:800;color:#DC2626;'>🛡️ DATA CLASSIFICATION</span>", 910, 150, 115, 24, "fillColor=#FEE2E2;strokeColor=#DC2626;rounded=1;align=center;verticalAlign=middle;");
  rect("box_data_class", "", 910, 174, 115, 340, "fillColor=#FFFFFF;strokeColor=#DC2626;strokeWidth=1.2;dashed=1;dashPattern=4 4;rounded=1;");
  rect("dc_res", "<div style='font-size:6.8px;font-weight:700;color:#DC2626;'>🔒<br/><b>Restricted</b><br/><span style='font-size:5.5px;color:#64748B;'>Highly Confidential<br/>(PHI / PII)</span></div>", 916, 195, 103, 55, "fillColor=#FEF2F2;strokeColor=#DC2626;rounded=1;align=center;");
  rect("dc_conf", "<div style='font-size:6.8px;font-weight:700;color:#EA580C;'>🔒<br/><b>Confidential</b><br/><span style='font-size:5.5px;color:#64748B;'>Business Critical<br/>Data</span></div>", 916, 265, 103, 55, "fillColor=#FFF7ED;strokeColor=#EA580C;rounded=1;align=center;");
  rect("dc_int", "<div style='font-size:6.8px;font-weight:700;color:#D97706;'>🔒<br/><b>Internal</b><br/><span style='font-size:5.5px;color:#64748B;'>Operational<br/>Data</span></div>", 916, 335, 103, 55, "fillColor=#FFFBEB;strokeColor=#D97706;rounded=1;align=center;");
  rect("dc_pub", "<div style='font-size:6.8px;font-weight:700;color:#16A34A;'>🔒<br/><b>Public</b><br/><span style='font-size:5.5px;color:#64748B;'>Public Information</span></div>", 916, 405, 103, 50, "fillColor=#F0FDF4;strokeColor=#16A34A;rounded=1;align=center;");

  // 5. CROSS-CUTTING SECURITY CONTROLS BANNER
  rect("box_sec_ctrls", "<div style='font-size:8px;font-weight:800;color:#7C3AED;margin-bottom:6px;text-align:center;'>CROSS-CUTTING SECURITY CONTROLS</div>" +
    "<div style='font-size:7px;color:#0F172A;display:flex;justify-content:space-around;text-align:center;'>" +
    "🔒 <b>Encryption In Transit</b><br/><span style='font-size:5.5px;color:#64748B;'>(TLS 1.2+)</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
    "🔐 <b>Encryption At Rest</b><br/><span style='font-size:5.5px;color:#64748B;'>(CMEK)</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
    "🛡️ <b>VPC Service Controls</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
    "⚡ <b>Private Google Access</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
    "🧱 <b>Firewall Rules</b><br/><span style='font-size:5.5px;color:#64748B;'>(Egress / Ingress)</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
    "⚙️ <b>Binary Authorization</b><br/><span style='font-size:5.5px;color:#64748B;'>(GKE)</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
    "🔍 <b>Security Scanning</b><br/><span style='font-size:5.5px;color:#64748B;'>(Container &amp; Code)</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
    "📑 <b>Audit Logging</b><br/><span style='font-size:5.5px;color:#64748B;'>(Immutable)</span>" +
    "</div>", 20, 535, 1005, 55, "fillColor=#FAF5FF;strokeColor=#7C3AED;strokeWidth=1.2;rounded=1;align=center;verticalAlign=middle;");

  // 6. RIGHT COLUMN: LEGEND & TECHNOLOGIES
  rect("hdr_legend", "<span style='font-size:8.5px;font-weight:800;color:#1E3A8A;'>LEGEND</span>", 1045, 78, 235, 22, "fillColor=#EFF6FF;strokeColor=#1E3A8A;rounded=1;align=center;verticalAlign=middle;");
  rect("card_legend", "<div style='font-size:7px;line-height:1.65;padding:4px;color:#0F172A;'>" +
    "─── Trusted Data Flow<br/>" +
    "- - - Admin / Control Flow<br/>" +
    "🛡️ Security Control<br/>" +
    "🟦 Network / Security Zone &nbsp;&nbsp; 🟪 Security Component<br/>" +
    "🟩 External Entity &nbsp;&nbsp; 🟧 Data Classification" +
    "</div>", 1045, 100, 235, 125, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;");

  rect("hdr_tech", "<span style='font-size:8.5px;font-weight:800;color:#2563EB;'>TECHNOLOGIES</span>", 1045, 235, 235, 22, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=center;verticalAlign=middle;");
  rect("card_tech", "<div style='font-size:7px;line-height:1.6;padding:4px;color:#0F172A;'>" +
    "🛡️ <b>Google Cloud Armor</b> &nbsp;&nbsp;&nbsp; ⚖️ <b>Cloud Load Balancing</b><br/>" +
    "🌐 <b>VPC</b> &nbsp;&nbsp;&nbsp; 🗄️ <b>Cloud SQL</b><br/>" +
    "🗃️ <b>Cloud Storage</b> &nbsp;&nbsp;&nbsp; 🔐 <b>Cloud KMS</b><br/>" +
    "🔑 <b>Secret Manager</b> &nbsp;&nbsp;&nbsp; 🛡️ <b>Security Command Center</b>" +
    "</div>", 1045, 257, 235, 155, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;");

  // 7. BOTTOM ROW: 5 PANELS
  rect("bot_p1", "<div style='font-size:8px;font-weight:800;color:#16A34A;margin-bottom:6px;'>KEY BENEFITS</div>" +
    "<div style='font-size:7px;line-height:1.6;color:#0F172A;'>" +
    "✔ Clear segmentation and trust boundaries<br/>" +
    "✔ Minimized attack surface<br/>" +
    "✔ Data protection &amp; compliance enforcement<br/>" +
    "✔ Centralized visibility and governance<br/>" +
    "✔ Reduced blast radius for incidents" +
    "</div>", 20, 600, 240, 170, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=6;");

  rect("bot_p2", "<div style='font-size:8px;font-weight:800;color:#D97706;margin-bottom:6px;'>TRUST BOUNDARY LEGEND</div>" +
    "<div style='font-size:7px;line-height:1.6;color:#0F172A;'>" +
    "- - - Internet Boundary (Untrusted ↔ Perimeter)<br/>" +
    "─── Network Boundary (Perimeter ↔ VPC)<br/>" +
    "- - - Subnet Boundary (App ↔ Data Isolation)<br/>" +
    "- - - Data Classification Boundary" +
    "</div>", 270, 600, 240, 170, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=6;");

  rect("bot_p3", "<div style='font-size:8px;font-weight:800;color:#DC2626;margin-bottom:6px;'>SECURITY PRINCIPLES ENFORCED</div>" +
    "<div style='font-size:7px;line-height:1.6;color:#0F172A;'>" +
    "🔒 Least Privilege Access<br/>" +
    "🛡️ Zero Trust Network<br/>" +
    "🏰 Defense in Depth<br/>" +
    "🔐 Secure by Default<br/>" +
    "⚡ Assume Breach" +
    "</div>", 520, 600, 210, 170, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=6;");

  rect("bot_p4", "<div style='font-size:8px;font-weight:800;color:#2563EB;margin-bottom:6px;'>COMPLIANCE ALIGNMENT</div>" +
    "<div style='font-size:7px;line-height:1.6;color:#0F172A;'>" +
    "🛡️ <b>SOC 2</b><br/>" +
    "🩺 <b>HIPAA</b><br/>" +
    "🏛️ <b>ISO 27001</b><br/>" +
    "🔒 <b>GDPR</b>" +
    "</div>", 740, 600, 170, 170, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=6;");

  rect("bot_p5", "<div style='font-size:8px;font-weight:800;color:#1E3A8A;margin-bottom:6px;'>NOTES</div>" +
    "<div style='font-size:7px;line-height:1.6;color:#0F172A;'>" +
    "• All admin access via VPN / IAP with MFA<br/>" +
    "• No public IPs on workloads or databases<br/>" +
    "• Regular vulnerability scanning and patching<br/>" +
    "• Secrets rotated and encrypted with KMS<br/>" +
    "• Logs retained as per compliance policy" +
    "</div>", 920, 600, 360, 170, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=6;");

  // Footer Metadata
  rect("footer_version", "<span style='font-size:9px;color:#64748B;font-weight:600;'>Version: 1.0</span>", 20, 780, 200, 18, "strokeColor=none;fillColor=none;align=left;");
  rect("footer_date", "<span style='font-size:9px;color:#64748B;font-weight:600;'>Date: May 2024</span>", 1145, 780, 135, 18, "strokeColor=none;fillColor=none;align=right;");


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
