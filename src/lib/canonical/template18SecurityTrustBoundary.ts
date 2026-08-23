/**
 * 🏛️ CANONICAL MASTER BLUEPRINT 18 — SECURITY / TRUST BOUNDARY
 * 
 * 1:1 Ground-Truth Reproduction of images/18.png
 * "18 Security / Trust Boundary | Use Case: NovaCura – Regulatory Intelligence Platform"
 * Defense-in-Depth Trust Zones (Edge, App, Data, Management), Data Classification Pillar,
 * Cross-Cutting Security Controls, Compliance Alignment (SOC 2, HIPAA, ISO 27001, GDPR).
 * 
 * Geometric Coordinates: 1600x1000px
 */

export function generateTemplate18SecurityTrustBoundaryXml(domainFlavor = "biopharma", theme: "light" | "dark" = "light"): string {
  const E = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const c: string[] = [];

  const rect = (id: string, val: string, x: number, y: number, w: number, h: number, style: string) => {
    c.push(`<mxCell id="${id}" value="${E(val)}" style="rounded=1;whiteSpace=wrap;html=1;${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`);
  };

  const text = (id: string, val: string, x: number, y: number, w: number, h: number, style: string) => {
    c.push(`<mxCell id="${id}" value="${E(val)}" style="text;html=1;whiteSpace=wrap;overflow=hidden;strokeColor=none;fillColor=none;${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`);
  };

  const edge = (id: string, label: string, x1: number, y1: number, x2: number, y2: number, color = "#0F172A", dashed = false, arrow = "block", pts: [number, number][] = []) => {
    const dashStyle = dashed ? "dashed=1;dashPattern=5 4;" : "";
    const ptsXml = pts.length > 0 ? `<Array as="points">${pts.map(p => `<mxPoint x="${p[0]}" y="${p[1]}"/>`).join("")}</Array>` : "";
    const labelStyle = label ? `fontSize=8;fontStyle=1;fontColor=#0F172A;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=2;` : "";
    c.push(`<mxCell id="${id}" value="${E(label)}" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;${dashStyle}strokeColor=${color};strokeWidth=1.2;endArrow=${arrow};endFill=1;${labelStyle}" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="${x1}" y="${y1}" as="sourcePoint"/><mxPoint x="${x2}" y="${y2}" as="targetPoint"/>${ptsXml}</mxGeometry></mxCell>`);
  };

  // =========================================================================
  // 1. MASTER HEADER & TOP-RIGHT BRAND BLOCK
  // =========================================================================
  rect("badge_18", "<b style='font-size:24px;color:#FFFFFF;'>18</b>", 20, 14, 52, 40, "fillColor=#0F2A4A;strokeColor=#0F2A4A;rounded=0;arcSize=0;align=center;verticalAlign=middle;");

  const titleHtml = `<div style="font-family:Inter,system-ui,sans-serif;">
    <div style="font-size:22px;font-weight:900;color:#0F2A4A;letter-spacing:1px;line-height:1.1;">Security / Trust Boundary</div>
    <div style="font-size:11px;font-weight:700;color:#475569;margin-top:2px;">Use Case: NovaCura – Regulatory Intelligence Platform &nbsp;|&nbsp; Environment: Production &nbsp;|&nbsp; Region: us-central1 &nbsp;|&nbsp; Last Updated: May 8, 2025</div>
  </div>`;
  text("header_title", titleHtml, 82, 14, 850, 42, "align=left;verticalAlign=middle;");

  const brandHtml = `<div style="text-align:right;font-family:Inter,system-ui,sans-serif;">
    <div style="display:inline-flex;align-items:center;gap:6px;">
      <span style="font-size:20px;">🧬</span>
      <span style="font-size:20px;font-weight:900;color:#0284C7;letter-spacing:1px;">NOVACURA</span>
    </div>
    <div style="font-size:9.5px;font-style:italic;color:#64748B;margin-top:2px;">AI-Powered Regulatory Intelligence Platform</div>
  </div>`;
  text("brand_block", brandHtml, 1260, 12, 320, 44, "align=right;verticalAlign=top;");

  // Objective Card (Top Right)
  const objHtml = `<div style="padding:4px 6px;">
    <div style="font-size:8px;font-weight:900;color:#0F2A4A;margin-bottom:2px;">OBJECTIVE</div>
    <div style="font-size:7.5px;color:#334155;line-height:1.35;">Enforce defense-in-depth with clear trust boundaries, least privilege access, network segmentation, and data protection across all layers.</div>
  </div>`;
  rect("card_obj", objHtml, 1140, 64, 440, 65, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // =========================================================================
  // 2. LEFT SIDEBAR: USERS & EXTERNAL (x: 20, w: 105) & INTERNET (x: 140, w: 115)
  // =========================================================================
  const usersHtml = `<div style="padding:6px;text-align:center;">
    <div style="background:#0F2A4A;color:#FFFFFF;font-size:8px;font-weight:900;padding:3px;border-radius:2px;margin-bottom:8px;">USERS &amp; EXTERNAL</div>
    <div style="margin-bottom:18px;"><div style="font-size:16px;">👤</div><div style="font-size:7.5px;font-weight:700;">Human Users</div></div>
    <div style="margin-bottom:18px;"><div style="font-size:16px;">🤝</div><div style="font-size:7.5px;font-weight:700;">Partners / Vendors</div></div>
    <div><div style="font-size:16px;">💻</div><div style="font-size:7.5px;font-weight:700;">External Applications</div></div>
  </div>`;
  rect("card_users", usersHtml, 20, 190, 105, 420, "fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;align=center;verticalAlign=top;");

  const internetHtml = `<div style="padding:6px;text-align:center;">
    <div style="font-size:8px;font-weight:900;color:#0284C7;margin-bottom:8px;">INTERNET</div>
    <div style="margin-bottom:16px;"><div style="font-size:18px;">🌐</div><div style="font-size:7.5px;font-weight:700;">Internet</div></div>
    <div style="margin-bottom:16px;"><div style="font-size:16px;">🛡️</div><div style="font-size:7px;font-weight:700;">DDoS Protection<br><span style="font-size:6px;color:#64748B;">(Cloud Armor)</span></div></div>
    <div><div style="font-size:16px;">⚡</div><div style="font-size:7px;font-weight:700;">WAF<br><span style="font-size:6px;color:#64748B;">(Cloud Armor)</span></div></div>
  </div>`;
  rect("card_internet", internetHtml, 140, 220, 115, 360, "fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.2;align=center;verticalAlign=top;");

  edge("e_users_net", "HTTPS\nTLS 1.2+", 125, 290, 140, 290, "#0F172A");

  // =========================================================================
  // 3. CENTER TRUSTED ZONE (us-central1) (x: 270, y: 190, w: 670, h: 420)
  // =========================================================================
  rect("trusted_zone_frame", "", 270, 190, 670, 420, "fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.5;rounded=1;arcSize=2;");
  text("trusted_zone_title", "<span style='font-size:9px;font-weight:900;color:#0284C7;'>☁️ GOOGLE CLOUD – TRUSTED ZONE (us-central1)</span>", 285, 198, 450, 20, "align=left;");

  // Edge / Perimeter (x: 285, w: 145)
  rect("z_edge_frame", "", 285, 230, 145, 365, "fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1;rounded=1;");
  text("z_edge_title", "<span style='font-size:7.5px;font-weight:900;color:#1D4ED8;'>EDGE / PERIMETER</span>", 285, 235, 145, 15, "align=center;");
  rect("e_lb", "<div style='font-size:14px;'>⚖️</div><div style='font-size:6.5px;font-weight:700;'>External HTTP(S)<br>Load Balancer</div>", 295, 260, 125, 45, "fillColor=#FFFFFF;strokeColor=#CBD5E1;align=center;verticalAlign=middle;");
  rect("e_armor", "<div style='font-size:14px;'>🛡️</div><div style='font-size:6.5px;font-weight:700;'>Cloud Armor<br><span style='font-size:5.5px;color:#64748B;'>WAF, Rate Limiting, IP Rep</span></div>", 295, 360, 125, 55, "fillColor=#FFFFFF;strokeColor=#CBD5E1;align=center;verticalAlign=middle;");
  rect("e_cdn", "<div style='font-size:14px;'>⚡</div><div style='font-size:6.5px;font-weight:700;'>Cloud CDN</div>", 295, 480, 125, 45, "fillColor=#FFFFFF;strokeColor=#CBD5E1;align=center;verticalAlign=middle;");

  // Application Zone (Private Subnets) (x: 445, w: 150)
  rect("z_app_frame", "", 445, 230, 150, 365, "fillColor=#F0FDF4;strokeColor=#86EFAC;strokeWidth=1;rounded=1;");
  text("z_app_title", "<span style='font-size:7.5px;font-weight:900;color:#15803D;'>APPLICATION ZONE<br><span style='font-size:6.5px;font-weight:700;'>(PRIVATE SUBNETS)</span></span>", 445, 235, 150, 25, "align=center;");
  rect("a_front", "<div style='font-size:14px;'>💻</div><div style='font-size:7px;font-weight:700;'>Frontend<br><span style='font-size:6px;color:#64748B;'>(Web UI)</span></div>", 455, 270, 130, 50, "fillColor=#FFFFFF;strokeColor=#CBD5E1;align=center;verticalAlign=middle;");
  rect("a_api", "<div style='font-size:14px;'>🔌</div><div style='font-size:7px;font-weight:700;'>API Gateway<br><span style='font-size:6px;color:#64748B;'>(Cloud Endpoints)</span></div>", 455, 365, 130, 50, "fillColor=#FFFFFF;strokeColor=#CBD5E1;align=center;verticalAlign=middle;");
  rect("a_back", "<div style='font-size:14px;'>⚙️</div><div style='font-size:7px;font-weight:700;'>Backend Services<br><span style='font-size:6px;color:#64748B;'>(GKE / Cloud Run)</span></div>", 455, 480, 130, 50, "fillColor=#FFFFFF;strokeColor=#CBD5E1;align=center;verticalAlign=middle;");

  // Data Zone (Private Subnets) (x: 610, w: 155)
  rect("z_data_frame", "", 610, 230, 155, 365, "fillColor=#FAF5FF;strokeColor=#D8B4FE;strokeWidth=1;rounded=1;");
  text("z_data_title", "<span style='font-size:7.5px;font-weight:900;color:#7C3AED;'>DATA ZONE<br><span style='font-size:6.5px;font-weight:700;'>(PRIVATE SUBNETS)</span></span>", 610, 235, 155, 25, "align=center;");
  rect("d_db", "<div style='font-size:14px;'>🗄️</div><div style='font-size:7px;font-weight:700;'>Primary Database<br><span style='font-size:6px;color:#64748B;'>(Cloud SQL)</span></div>", 620, 270, 135, 50, "fillColor=#FFFFFF;strokeColor=#CBD5E1;align=center;verticalAlign=middle;");
  rect("d_obj", "<div style='font-size:14px;'>📦</div><div style='font-size:7px;font-weight:700;'>Object Storage<br><span style='font-size:6px;color:#64748B;'>(Cloud Storage)</span></div>", 620, 365, 135, 50, "fillColor=#FFFFFF;strokeColor=#CBD5E1;align=center;verticalAlign=middle;");
  rect("d_cache", "<div style='font-size:14px;'>⚡</div><div style='font-size:7px;font-weight:700;'>Cache<br><span style='font-size:6px;color:#64748B;'>(Memorystore Redis)</span></div>", 620, 480, 135, 50, "fillColor=#FFFFFF;strokeColor=#CBD5E1;align=center;verticalAlign=middle;");

  // Management Zone (x: 780, w: 145)
  rect("z_mgmt_frame", "", 780, 230, 145, 365, "fillColor=#FFF7ED;strokeColor=#FDBA74;strokeWidth=1;rounded=1;");
  text("z_mgmt_title", "<span style='font-size:7.5px;font-weight:900;color:#C2410C;'>MANAGEMENT ZONE</span>", 780, 235, 145, 15, "align=center;");
  rect("m_iam", "<div style='font-size:14px;'>🛡️</div><div style='font-size:6.5px;font-weight:700;'>IAM &amp; Admin<br><span style='font-size:5.5px;color:#64748B;'>(Least Privilege)</span></div>", 790, 260, 125, 45, "fillColor=#FFFFFF;strokeColor=#CBD5E1;align=center;verticalAlign=middle;");
  rect("m_sec", "<div style='font-size:14px;'>🔒</div><div style='font-size:6.5px;font-weight:700;'>Secret Manager<br><span style='font-size:5.5px;color:#64748B;'>(Cloud Encrypted)</span></div>", 790, 335, 125, 45, "fillColor=#FFFFFF;strokeColor=#CBD5E1;align=center;verticalAlign=middle;");
  rect("m_log", "<div style='font-size:14px;'>📑</div><div style='font-size:6.5px;font-weight:700;'>Cloud Logging<br>&amp; Monitoring</div>", 790, 410, 125, 45, "fillColor=#FFFFFF;strokeColor=#CBD5E1;align=center;verticalAlign=middle;");
  rect("m_scc", "<div style='font-size:14px;'>🛡️</div><div style='font-size:6.5px;font-weight:700;'>Security Command<br>Center (SCC)</div>", 790, 485, 125, 45, "fillColor=#FFFFFF;strokeColor=#CBD5E1;align=center;verticalAlign=middle;");

  // Inter-zone connectors
  edge("e_edge_app", "", 420, 390, 445, 390, "#0F172A");
  edge("e_app_data", "", 595, 390, 610, 390, "#0F172A");

  // =========================================================================
  // 4. DATA CLASSIFICATION PILLAR (x: 955, y: 190, w: 145, h: 420)
  // =========================================================================
  rect("data_class_frame", "", 955, 190, 145, 420, "fillColor=#FFFFFF;strokeColor=#DC2626;strokeWidth=1.5;dashed=1;dashPattern=5 3;rounded=1;");
  text("data_class_title", "<span style='font-size:8px;font-weight:900;color:#DC2626;'>🛡️ DATA CLASSIFICATION</span>", 955, 198, 145, 15, "align=center;");

  rect("dc_res", "<div style='font-size:16px;'>🔒</div><div style='font-size:7px;font-weight:900;color:#B91C1C;'>Restricted</div><div style='font-size:6px;color:#64748B;'>Highly Confidential<br>(PHI / PII)</div>", 965, 230, 125, 65, "fillColor=#FEF2F2;strokeColor=#DC2626;align=center;verticalAlign=middle;");
  rect("dc_conf", "<div style='font-size:16px;'>🔒</div><div style='font-size:7px;font-weight:900;color:#C2410C;'>Confidential</div><div style='font-size:6px;color:#64748B;'>Business Critical<br>Data</div>", 965, 320, 125, 65, "fillColor=#FFF7ED;strokeColor=#EA580C;align=center;verticalAlign=middle;");
  rect("dc_int", "<div style='font-size:16px;'>🔒</div><div style='font-size:7px;font-weight:900;color:#B45309;'>Internal</div><div style='font-size:6px;color:#64748B;'>Operational<br>Data</div>", 965, 410, 125, 65, "fillColor=#FFFBEB;strokeColor=#F59E0B;align=center;verticalAlign=middle;");
  rect("dc_pub", "<div style='font-size:16px;'>🔒</div><div style='font-size:7px;font-weight:900;color:#15803D;'>Public</div><div style='font-size:6px;color:#64748B;'>Public Information</div>", 965, 500, 125, 65, "fillColor=#F0FDF4;strokeColor=#16A34A;align=center;verticalAlign=middle;");

  // =========================================================================
  // 5. RIGHT SIDEBAR: LEGEND & TECHNOLOGIES (x: 1120, w: 460)
  // =========================================================================
  // Legend
  const legHtml = `<div style="padding:6px;">
    <div style="background:#0F2A4A;color:#FFFFFF;font-size:9px;font-weight:900;text-align:center;padding:3px;border-radius:2px;margin-bottom:6px;">LEGEND</div>
    <div style="font-size:7.5px;color:#1E293B;line-height:1.45;">
      <div>➔ &nbsp;<b>Trusted Data Flow</b></div>
      <div>- - - ➔ &nbsp;<b>Admin / Control Flow</b></div>
      <div>🛡️ &nbsp;<b>Security Control</b></div>
      <div>🟦 &nbsp;<b>Network / Security Zone</b></div>
      <div>🟪 &nbsp;<b>Security Component</b></div>
      <div>🟩 &nbsp;<b>External Entity</b></div>
      <div>🟥 &nbsp;<b>Data Classification</b></div>
    </div>
  </div>`;
  rect("card_legend_sec", legHtml, 1120, 140, 460, 200, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // Technologies
  const techSecHtml = `<div style="padding:6px;">
    <div style="background:#0F2A4A;color:#FFFFFF;font-size:9px;font-weight:900;text-align:center;padding:3px;border-radius:2px;margin-bottom:6px;">TECHNOLOGIES</div>
    <div style="font-size:7.5px;color:#1E293B;line-height:1.5;">
      <div>🛡️ Google Cloud Armor</div>
      <div>⚖️ Cloud Load Balancing</div>
      <div>🔌 VPC</div>
      <div>🗄️ Cloud SQL</div>
      <div>📦 Cloud Storage</div>
      <div>🔑 Cloud KMS</div>
      <div>🔒 Secret Manager</div>
      <div>🛡️ Security Command Center</div>
    </div>
  </div>`;
  rect("card_tech_sec", techSecHtml, 1120, 355, 460, 255, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // =========================================================================
  // 6. CROSS-CUTTING SECURITY CONTROLS (x: 20, y: 630, w: 1080, h: 75)
  // =========================================================================
  const crossSecHtml = `<div style="padding:4px 6px;text-align:center;">
    <div style="font-size:8px;font-weight:900;color:#0F2A4A;margin-bottom:4px;">CROSS-CUTTING SECURITY CONTROLS</div>
    <div style="display:flex;align-items:center;justify-content:space-around;font-size:6.5px;font-weight:700;color:#1E293B;">
      <div>🔒 Encryption in Transit<br><span style="color:#64748B;">(TLS 1.2+)</span></div>
      <div>🔑 Encryption at Rest<br><span style="color:#64748B;">(CMEK)</span></div>
      <div>🌐 VPC Service<br>Controls</div>
      <div>⚡ Private Google<br>Access</div>
      <div>🧱 Firewall Rules<br><span style="color:#64748B;">(Egress / Ingress)</span></div>
      <div>🛡️ Binary Auth<br><span style="color:#64748B;">(GKE)</span></div>
      <div>🔍 Security Scanning<br><span style="color:#64748B;">(Container &amp; Code)</span></div>
      <div>📑 Audit Logging<br><span style="color:#64748B;">(Immutable)</span></div>
    </div>
  </div>`;
  rect("card_cross_sec", crossSecHtml, 20, 630, 1080, 75, "fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.2;align=center;verticalAlign=middle;");

  // =========================================================================
  // 7. BOTTOM PANELS: BENEFITS, TRUST BOUNDARY, PRINCIPLES, COMPLIANCE, NOTES (y: 725, h: 225)
  // =========================================================================
  // Panel 1: KEY BENEFITS (x: 20, w: 260)
  const benSecHtml = `<div style="padding:6px 8px;">
    <div style="font-size:8.5px;font-weight:900;color:#0F2A4A;border-bottom:1.5px solid #E2E8F0;padding-bottom:3px;margin-bottom:4px;">KEY BENEFITS</div>
    <div style="font-size:7px;color:#1E293B;line-height:1.45;">
      <div style="display:flex;align-items:center;gap:4px;margin-bottom:3px;"><span style="color:#16A34A;font-weight:900;">✔</span><span>Clear segmentation and trust boundaries</span></div>
      <div style="display:flex;align-items:center;gap:4px;margin-bottom:3px;"><span style="color:#16A34A;font-weight:900;">✔</span><span>Minimized attack surface</span></div>
      <div style="display:flex;align-items:center;gap:4px;margin-bottom:3px;"><span style="color:#16A34A;font-weight:900;">✔</span><span>Data protection &amp; compliance enforcement</span></div>
      <div style="display:flex;align-items:center;gap:4px;margin-bottom:3px;"><span style="color:#16A34A;font-weight:900;">✔</span><span>Centralized visibility and governance</span></div>
      <div style="display:flex;align-items:center;gap:4px;"><span style="color:#16A34A;font-weight:900;">✔</span><span>Reduced blast radius for incidents</span></div>
    </div>
  </div>`;
  rect("card_ben_sec", benSecHtml, 20, 725, 260, 225, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // Panel 2: TRUST BOUNDARY LEGEND (x: 290, w: 280)
  const bndLegendHtml = `<div style="padding:6px 8px;">
    <div style="font-size:8.5px;font-weight:900;color:#0F2A4A;border-bottom:1.5px solid #E2E8F0;padding-bottom:3px;margin-bottom:4px;">TRUST BOUNDARY LEGEND</div>
    <div style="font-size:7px;color:#1E293B;line-height:1.45;">
      <div>- - - <b>Internet Boundary</b> (Untrusted ↔ Perimeter)</div>
      <div>─── <b>Network Boundary</b> (Perimeter ↔ VPC)</div>
      <div>- - - <b>Subnet Boundary</b> (App ↔ Data Isolation)</div>
      <div>- - - <b>Data Classification Boundary</b></div>
    </div>
  </div>`;
  rect("card_bnd_leg", bndLegendHtml, 290, 725, 280, 225, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // Panel 3: SECURITY PRINCIPLES ENFORCED (x: 580, w: 260)
  const princSecHtml = `<div style="padding:6px 8px;">
    <div style="font-size:8.5px;font-weight:900;color:#0F2A4A;border-bottom:1.5px solid #E2E8F0;padding-bottom:3px;margin-bottom:4px;">SECURITY PRINCIPLES ENFORCED</div>
    <div style="font-size:7px;color:#1E293B;line-height:1.45;">
      <div>🔒 Least Privilege Access</div>
      <div>🛡️ Zero Trust Network</div>
      <div>🛡️ Defense in Depth</div>
      <div>🔒 Secure by Default</div>
      <div>⚡ Assume Breach</div>
    </div>
  </div>`;
  rect("card_princ_sec", princSecHtml, 580, 725, 260, 225, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // Panel 4: COMPLIANCE ALIGNMENT (x: 850, w: 250)
  const compSecHtml = `<div style="padding:6px 8px;">
    <div style="font-size:8.5px;font-weight:900;color:#0F2A4A;border-bottom:1.5px solid #E2E8F0;padding-bottom:3px;margin-bottom:4px;">COMPLIANCE ALIGNMENT</div>
    <div style="font-size:7px;color:#1E293B;line-height:1.45;">
      <div>🛡️ SOC 2</div>
      <div>🩺 HIPAA</div>
      <div>🏛️ ISO 27001</div>
      <div>🔒 GDPR</div>
    </div>
  </div>`;
  rect("card_comp_sec", compSecHtml, 850, 725, 250, 225, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // Panel 5: NOTES (x: 1110, w: 470)
  const notesSecHtml = `<div style="padding:6px 8px;">
    <div style="font-size:8.5px;font-weight:900;color:#0F2A4A;border-bottom:1.5px solid #E2E8F0;padding-bottom:3px;margin-bottom:4px;">NOTES</div>
    <div style="font-size:7px;color:#334155;line-height:1.45;">
      <div>• All admin access via VPN / IAP with MFA</div>
      <div>• No public IPs on workloads or databases</div>
      <div>• Regular vulnerability scanning and patching</div>
      <div>• Secrets rotated and encrypted with KMS</div>
      <div>• Logs retained as per compliance policy</div>
    </div>
  </div>`;
  rect("card_notes_sec", notesSecHtml, 1110, 725, 470, 225, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // =========================================================================
  // 8. FOOTER METADATA
  // =========================================================================
  text("footer_version", "<span style='font-size:9px;color:#64748B;font-weight:600;'>Version: 1.0</span>", 20, 970, 200, 20, "align=left;");
  text("footer_date", "<span style='font-size:9px;color:#64748B;font-weight:600;'>Date: May 2024</span>", 1400, 970, 180, 20, "align=right;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_18_security_boundary" name="Template 18: Security / Trust Boundary">
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
