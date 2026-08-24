/**
 * Canonical Architecture Template 18: Security / Trust Boundary
 * Exact 1:1 High-Fidelity Master Blueprint of images/18.png
 */

export function generateTemplate18SecurityTrustBoundaryXml(
  flavor: string = "biopharma",
  theme: "dark" | "light" = "light"
): string {
  const isDark = theme === "dark";
  const E = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
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
  rect("num_badge", "18", 20, 16, 48, 48, "fillColor=#1E3A8A;fontColor=#FFFFFF;fontSize=24;fontStyle=1;rounded=1;align=center;verticalAlign=middle;");
  rect("hdr_title", "<div style='font-size:22px;font-weight:800;color:#0F172A;letter-spacing:0.5px;'>Security / Trust Boundary</div><div style='font-size:11px;color:#1E3A8A;font-weight:700;margin-top:2px;'>Use Case: NovaCura – Regulatory Intelligence Platform &nbsp;|&nbsp; Environment: Production &nbsp;|&nbsp; Region: us-central1 &nbsp;|&nbsp; Last Updated: May 8, 2025</div>", 78, 16, 840, 48, "strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=10;");
  rect("hdr_brand", "<div style='text-align:right;'><span style='font-size:20px;font-weight:800;color:#0284C7;'>🧬 NOVACURA</span><br/><span style='font-size:9.5px;color:#64748B;font-style:italic;'>AI-Powered Regulatory Intelligence Platform</span></div>", 940, 16, 280, 48, "strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

  // Objective Card
  rect("card_obj", "<div style='font-size:8.5px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>OBJECTIVE</div><div style='font-size:10px;line-height:1.35;color:#0F172A;'>Enforce defense-in-depth with clear trust boundaries, least privilege access, network segmentation, and data protection across all layers.</div>", 1240, 16, 320, 48, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=4;");

  // 2. USERS & EXTERNAL (x=20..85, y=72..540)
  rect("box_users", "", 20, 72, 65, 465, "fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;rounded=1;");
  rect("lbl_users", "<span style='font-size:9px;font-weight:800;color:#16A34A;'>USERS &amp;<br/>EXTERNAL</span>", 20, 75, 65, 18, "strokeColor=none;fillColor=none;align=center;");

  rect("u_human", "<div style='font-size:14px;text-align:center;'>👤</div><div style='font-size:9px;font-weight:700;'>Human Users</div>", 25, 110, 55, 65, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("u_partner", "<div style='font-size:14px;text-align:center;'>👥</div><div style='font-size:9px;font-weight:700;'>Partners /<br/>Vendors</div>", 25, 230, 55, 65, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("u_apps", "<div style='font-size:14px;text-align:center;'>📱</div><div style='font-size:9px;font-weight:700;'>External<br/>Applications</div>", 25, 360, 55, 65, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");

  // 3. INGRESS INTERMEDIATE NODES (x=90..180, y=72..540)
  rect("box_ingress", "", 90, 72, 90, 465, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1;rounded=1;");
  rect("lbl_ingress", "<span style='font-size:10px;font-weight:800;color:#2563EB;'>INTERNET</span>", 90, 75, 90, 14, "strokeColor=none;fillColor=none;align=center;");

  rect("ing_net", "<div style='font-size:16px;text-align:center;'>🌐</div><div style='font-size:9px;font-weight:700;'>Internet</div>", 98, 105, 74, 58, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=center;verticalAlign=middle;");
  rect("ing_ddos", "<div style='font-size:14px;text-align:center;'>🛡️</div><div style='font-size:9px;font-weight:700;'>DDoS Protection<br/><span style='color:#64748B;font-size:8px;'>(Cloud Armor)</span></div>", 98, 225, 74, 65, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("ing_waf", "<div style='font-size:14px;text-align:center;'>🧱</div><div style='font-size:9px;font-weight:700;'>WAF<br/><span style='color:#64748B;font-size:8px;'>(Cloud Armor)</span></div>", 98, 360, 74, 65, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");

  // 4. GOOGLE CLOUD – TRUSTED ZONE (us-central1) (x=185..1080, y=72..540)
  rect("box_trusted", "", 185, 72, 895, 465, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;rounded=1;");
  rect("lbl_trusted", "<span style='font-size:8px;font-weight:800;color:#2563EB;'>🔒 GOOGLE CLOUD – TRUSTED ZONE (us-central1)</span>", 185, 75, 895, 14, "strokeColor=none;fillColor=none;align=center;");

  // Edge / Perimeter (x=195..380)
  rect("box_edge_zone", "", 195, 94, 185, 335, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;");
  rect("lbl_edge_zone", "<span style='font-size:9px;font-weight:800;color:#1E3A8A;'>EDGE / PERIMETER</span>", 195, 96, 185, 12, "strokeColor=none;fillColor=none;align=center;");

  rect("ez_lb", "<div style='font-size:12px;text-align:center;'>⚖️</div><div style='font-size:9px;font-weight:700;'>External HTTP(S)<br/>Load Balancer</div>", 205, 114, 165, 58, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("ez_armor", "<div style='font-size:12px;text-align:center;'>🛡️</div><div style='font-size:9px;font-weight:700;'>Cloud Armor<br/><span style='color:#64748B;font-size:8px;'>(WAF, Rate Limiting, IP Rep)</span></div>", 205, 196, 165, 68, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("ez_cdn", "<div style='font-size:12px;text-align:center;'>⚡</div><div style='font-size:9px;font-weight:700;'>Cloud CDN</div>", 205, 288, 165, 58, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");

  // Application Zone (Private Subnets) (x=388..590)
  rect("box_app_zone", "", 388, 94, 202, 335, "fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=1;rounded=1;dashed=1;");
  rect("lbl_app_zone", "<span style='font-size:9px;font-weight:800;color:#2563EB;'>APPLICATION ZONE<br/>(PRIVATE SUBNETS)</span>", 388, 96, 202, 18, "strokeColor=none;fillColor=none;align=center;");

  rect("az_fe", "<div style='font-size:12px;text-align:center;'>💻</div><div style='font-size:9px;font-weight:700;'>Frontend<br/><span style='color:#64748B;font-size:8px;'>(Web UI)</span></div>", 398, 120, 182, 58, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("az_gw", "<div style='font-size:12px;text-align:center;'>🛡️</div><div style='font-size:9px;font-weight:700;'>API Gateway<br/><span style='color:#64748B;font-size:8px;'>(Cloud Endpoints)</span></div>", 398, 200, 182, 58, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("az_be", "<div style='font-size:12px;text-align:center;'>⚙️</div><div style='font-size:9px;font-weight:700;'>Backend Services<br/><span style='color:#64748B;font-size:8px;'>(GKE / Cloud Run)</span></div>", 398, 280, 182, 66, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");

  // Data Zone (Private Subnets) (x=598..800)
  rect("box_data_zone", "", 598, 94, 202, 335, "fillColor=#FAF5FF;strokeColor=#7C3AED;strokeWidth=1;rounded=1;dashed=1;");
  rect("lbl_data_zone", "<span style='font-size:9px;font-weight:800;color:#7C3AED;'>DATA ZONE<br/>(PRIVATE SUBNETS)</span>", 598, 96, 202, 18, "strokeColor=none;fillColor=none;align=center;");

  rect("dz_sql", "<div style='font-size:12px;text-align:center;'>🗄️</div><div style='font-size:9px;font-weight:700;'>Primary Database<br/><span style='color:#64748B;font-size:8px;'>(Cloud SQL)</span></div>", 608, 120, 182, 58, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("dz_gcs", "<div style='font-size:12px;text-align:center;'>🗃️</div><div style='font-size:9px;font-weight:700;'>Object Storage<br/><span style='color:#64748B;font-size:8px;'>(Cloud Storage)</span></div>", 608, 200, 182, 58, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("dz_cache", "<div style='font-size:12px;text-align:center;'>⚡</div><div style='font-size:9px;font-weight:700;'>Cache<br/><span style='color:#64748B;font-size:8px;'>(Memorystore Redis)</span></div>", 608, 280, 182, 66, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");

  // Management Zone (x=808..1070)
  rect("box_mgmt_zone", "", 808, 94, 262, 335, "fillColor=#FFFBEB;strokeColor=#D97706;strokeWidth=1;rounded=1;");
  rect("lbl_mgmt_zone", "<span style='font-size:9px;font-weight:800;color:#D97706;'>MANAGEMENT ZONE</span>", 808, 96, 262, 12, "strokeColor=none;fillColor=none;align=center;");

  rect("mz_iam", "<div style='font-size:10px;'>🛡️ <b>IAM &amp; Admin</b></div><div style='font-size:8px;color:#64748B;'>(Least Privilege)</div>", 816, 114, 246, 44, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=middle;padding=3;");
  rect("mz_sec", "<div style='font-size:10px;'>🔒 <b>Secret Manager</b></div><div style='font-size:8px;color:#64748B;'>(Cloud Encrypted)</div>", 816, 168, 246, 44, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=middle;padding=3;");
  rect("mz_log", "<div style='font-size:10px;'>📑 <b>Cloud Logging &amp; Monitoring</b></div>", 816, 222, 246, 44, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=middle;padding=3;");
  rect("mz_scc", "<div style='font-size:10px;'>🛡️ <b>Security Command Center (SCC)</b></div>", 816, 276, 246, 44, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=middle;padding=3;");

  // Cross-Cutting Security Controls
  rect("box_cross_sec", "<div style='font-size:10px;font-weight:800;color:#7C3AED;margin-bottom:4px;text-align:center;'>CROSS-CUTTING SECURITY CONTROLS</div><div style='font-size:8px;color:#0F172A;display:flex;justify-content:space-around;text-align:center;align-items:center;'><div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:3px;border-radius:3px;'>🔒<br/><b>Encryption In Transit</b><br/>(TLS 1.2+)</div> <div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:3px;border-radius:3px;'>🔑<br/><b>Encryption At Rest</b><br/>(CMEK)</div> <div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:3px;border-radius:3px;'>🛡️<br/><b>VPC Service Controls</b></div> <div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:3px;border-radius:3px;'>🔒<br/><b>Private Google Access</b></div> <div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:3px;border-radius:3px;'>🧱<br/><b>Firewall Rules</b><br/>(Egress/Ingress)</div> <div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:3px;border-radius:3px;'>🛡️<br/><b>Binary Authorization</b><br/>(GKE)</div> <div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:3px;border-radius:3px;'>🔍<br/><b>Security Scanning</b><br/>(Container &amp; Code)</div> <div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:3px;border-radius:3px;'>📑<br/><b>Audit Logging</b><br/>(Immutable)</div></div>", 195, 436, 875, 92, "fillColor=#FAF5FF;strokeColor=#7C3AED;rounded=1;align=center;verticalAlign=top;padding=4;");

  // 5. DATA CLASSIFICATION COLUMN (x=1088..1240, y=72..540)
  rect("box_data_class", "", 1088, 72, 152, 465, "fillColor=#FFFFFF;strokeColor=#DC2626;strokeWidth=1.2;rounded=1;");
  rect("lbl_data_class", "<span style='font-size:10px;font-weight:800;color:#DC2626;'>🏷️ DATA CLASSIFICATION</span>", 1088, 75, 152, 14, "strokeColor=none;fillColor=none;align=center;");

  rect("dc_rest", "<div style='font-size:12px;text-align:center;'>🔒</div><div style='font-size:9px;font-weight:800;color:#DC2626;text-align:center;'>Restricted</div><div style='font-size:8px;color:#64748B;text-align:center;'>Highly Confidential<br/>(PHI / PII)</div>", 1096, 96, 136, 95, "fillColor=#FEF2F2;strokeColor=#DC2626;rounded=1;align=center;verticalAlign=middle;padding=3;");
  rect("dc_conf", "<div style='font-size:12px;text-align:center;'>🔒</div><div style='font-size:9px;font-weight:800;color:#D97706;text-align:center;'>Confidential</div><div style='font-size:8px;color:#64748B;text-align:center;'>Business Critical<br/>Data</div>", 1096, 202, 136, 95, "fillColor=#FFFBEB;strokeColor=#D97706;rounded=1;align=center;verticalAlign=middle;padding=3;");
  rect("dc_int", "<div style='font-size:12px;text-align:center;'>🔒</div><div style='font-size:9px;font-weight:800;color:#2563EB;text-align:center;'>Internal</div><div style='font-size:8px;color:#64748B;text-align:center;'>Operational<br/>Data</div>", 1096, 308, 136, 95, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=center;verticalAlign=middle;padding=3;");
  rect("dc_pub", "<div style='font-size:12px;text-align:center;'>🌐</div><div style='font-size:9px;font-weight:800;color:#16A34A;text-align:center;'>Public</div><div style='font-size:8px;color:#64748B;text-align:center;'>Public Information</div>", 1096, 414, 136, 113, "fillColor=#F0FDF4;strokeColor=#16A34A;rounded=1;align=center;verticalAlign=middle;padding=3;");

  // 6. FAR RIGHT COLUMN: LEGEND & TECHNOLOGIES (x=1248..1560, y=72..540)
  rect("box_r_legend", "<div style='font-size:10px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>LEGEND</div><div style='font-size:9px;line-height:1.4;color:#0F172A;'>── Trusted Data Flow<br/>- - Admin / Control Flow<br/>🛡️ Security Control<br/><span style='background:#EFF6FF;border:1px solid #2563EB;padding:1px 3px;border-radius:2px;'>■</span> Network / Security Zone<br/><span style='background:#F8FAFC;border:1px solid #CBD5E1;padding:1px 3px;border-radius:2px;'>■</span> Security Component<br/><span style='background:#F0FDF4;border:1px solid #16A34A;padding:1px 3px;border-radius:2px;'>■</span> External Entity<br/><span style='background:#FEF2F2;border:1px solid #DC2626;padding:1px 3px;border-radius:2px;'>■</span> Data Classification</div>", 1248, 72, 312, 195, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("box_r_techs", "<div style='font-size:10px;font-weight:800;color:#2563EB;margin-bottom:2px;'>TECHNOLOGIES</div><div style='font-size:9px;line-height:1.4;color:#0F172A;display:grid;grid-template-columns:repeat(2, 1fr);gap:2px;'><div>🛡️ Google Cloud Armor</div> <div>⚖️ Cloud Load Balancing</div> <div>🌐 VPC</div> <div>🗄️ Cloud SQL</div> <div>🗃️ Cloud Storage</div> <div>🔑 Cloud KMS</div> <div>🔒 Secret Manager</div> <div>🛡️ SCC</div></div>", 1248, 274, 312, 263, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  // 7. BOTTOM ROW: BENEFITS, TRUST LEGEND, PRINCIPLES, COMPLIANCE, NOTES (x=20..1560, y=546..740)
  rect("bot_p1", "<div style='font-size:10px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>KEY BENEFITS</div><div style='font-size:9px;line-height:1.35;color:#0F172A;'>✔ Clear segmentation and trust boundaries<br/>✔ Minimized attack surface<br/>✔ Data protection &amp; compliance enforcement<br/>✔ Centralized visibility and governance<br/>✔ Reduced blast radius for incidents</div>", 20, 546, 260, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("bot_p2", "<div style='font-size:10px;font-weight:800;color:#2563EB;margin-bottom:2px;'>TRUST BOUNDARY LEGEND</div><div style='font-size:9px;line-height:1.4;color:#0F172A;'>── Internet Boundary (Untrusted ↔ Perimeter)<br/>── Network Boundary (Perimeter ↔ VPC)<br/>- - Subnet Boundary (App ↔ Data Isolation)<br/>······ Data Classification Boundary</div>", 290, 546, 270, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("bot_p3", "<div style='font-size:10px;font-weight:800;color:#DC2626;margin-bottom:2px;'>SECURITY PRINCIPLES ENFORCED</div><div style='font-size:9px;line-height:1.35;color:#0F172A;'>🛡️ Least Privilege Access<br/>🔒 Zero Trust Network<br/>🧱 Defense in Depth<br/>🔐 Secure by Default<br/>⚠️ Assume Breach</div>", 570, 546, 260, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("bot_p4", "<div style='font-size:10px;font-weight:800;color:#16A34A;margin-bottom:2px;'>COMPLIANCE ALIGNMENT</div><div style='font-size:9px;line-height:1.35;color:#0F172A;'>🛡️ SOC 2<br/>🩺 HIPAA<br/>🏛️ ISO 27001<br/>⚖️ GDPR</div>", 840, 546, 240, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("bot_p5", "<div style='font-size:10px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>NOTES</div><div style='font-size:9px;line-height:1.35;color:#64748B;'>• All admin access via VPN / IAP with MFA<br/>• No public IPs on workloads or databases<br/>• Regular vulnerability scanning and patching<br/>• Secrets rotated and encrypted with KMS<br/>• Logs retained as per compliance policy</div>", 1090, 546, 470, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  // 8. FOOTER METADATA STRIP (x=20..1560, y=744..768)
  rect("footer_meta", "<div style='font-size:9px;color:#0F172A;display:flex;justify-content:space-between;align-items:center;'><div>Version: 1.0</div><div>Date: May 2024</div></div>", 20, 744, 1540, 24, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=middle;padding=3;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_18_security_trust_boundary" name="Template 18: Security / Trust Boundary">
    <mxGraphModel dx="1600" dy="780" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="780" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${c.join("\n        ")}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
