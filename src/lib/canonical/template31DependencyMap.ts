/**
 * Master 1:1 Ground-Truth Blueprint for Template 31: Dependency / Relationship Map
 * Matches 100% of images/31.png on 1600x1020 canvas with zero voids and discrete card hierarchy.
 */

const E = (v?: string | null) =>
  (v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function generateTemplate31DependencyMapXml(
  domainFlavor = "biopharma",
  theme: "light" | "dark" = "light"
): string {
  const isDark = theme === "dark";
  const c: string[] = [];

  const rect = (id: string, v: string, x: number, y: number, w: number, h: number, s = "") =>
    c.push(
      `<mxCell id="${id}" value="${E(v)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;fontColor=#0F172A;fontSize=11;${s}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`
    );

  const text = (id: string, v: string, x: number, y: number, w: number, h: number, s = "") =>
    c.push(
      `<mxCell id="${id}" value="${E(v)}" style="text;html=1;strokeColor=none;fillColor=none;whiteSpace=wrap;fontColor=#0F172A;fontSize=11;verticalAlign=middle;${s}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`
    );

  // 1. BRAND HEADER & METADATA (y=14..66)
  rect("num_badge", "31", 24, 14, 52, 52, "fillColor=#1E3A8A;fontColor=#FFFFFF;fontSize=26;fontStyle=1;rounded=1;align=center;verticalAlign=middle;");
  text(
    "hdr_title",
    `<div style='font-size:24px;font-weight:900;color:#0F172A;letter-spacing:0.5px;'>DEPENDENCY / RELATIONSHIP MAP</div>` +
    `<div style='font-size:12px;font-weight:700;color:#1E3A8A;margin-top:2px;'>Use Case: NovaCura – AI-Powered Regulatory Intelligence Platform</div>` +
    `<div style='font-size:10px;color:#64748B;margin-top:1px;'>☁️ Environment: Production &nbsp;|&nbsp; 📍 Region: us-central1 &nbsp;|&nbsp; 📅 Last Updated: May 8, 2025</div>`,
    88,
    14,
    850,
    52,
    "align=left;"
  );

  const brandHtml = `<div style='text-align:right;'><span style='font-size:20px;font-weight:900;color:#0284C7;'>🧬 NOVACURA</span><br/><span style='font-size:10px;color:#64748B;font-style:italic;'>AI-Powered Regulatory Intelligence Platform</span></div>`;
  text("brand_logo", brandHtml, 950, 14, 275, 52, "align=right;");

  const objHtml = `<div style='font-size:9.5px;font-weight:900;color:#1E3A8A;margin-bottom:2px;'>OBJECTIVE</div><div style='font-size:8px;line-height:1.35;color:#0F172A;'>Visualize and manage dependencies across applications, data, infrastructure, teams, and external partners to reduce risk and improve delivery velocity.</div>`;
  rect("card_obj", objHtml, 1240, 14, 335, 52, "strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;padding=5;");

  // 2. LEFT SIDEBAR: LEGEND & KEY (x=24, w=170, y=78..680, h=602)
  const legHtml = `<div style='font-size:10px;font-weight:800;color:#1E3A8A;text-align:center;margin-bottom:6px;'>LEGEND &amp; KEY</div>
  <div style='font-size:8px;font-weight:800;color:#64748B;margin-top:4px;'>Node Types</div>
  <div style='font-size:7.5px;line-height:1.4;margin-top:2px;'>
    💻 Application / Service<br/>
    🗄️ Data Store / DB<br/>
    ⚙️ Platform / Infra<br/>
    🏢 External / Partner<br/>
    🔌 Interface / Integration<br/>
    👥 Team / Owner
  </div>
  <div style='font-size:8px;font-weight:800;color:#64748B;margin-top:10px;'>Dependency Types</div>
  <div style='font-size:7.5px;line-height:1.4;margin-top:2px;'>
    ── Data Flow (Read/Write)<br/>
    ···· API / Integration<br/>
    - - Async / Event<br/>
    -·- Config / Control<br/>
    ══ Network / Connectivity
  </div>
  <div style='font-size:8px;font-weight:800;color:#64748B;margin-top:10px;'>Criticality</div>
  <div style='font-size:7.5px;line-height:1.4;margin-top:2px;'>
    🔴 Critical (High)<br/>
    🟠 High<br/>
    🟡 Medium<br/>
    🟢 Low
  </div>`;
  rect("box_legend", legHtml, 24, 78, 170, 602, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;");

  // 3. CENTER STAGE: 6 DEPENDENCY ROWS (x=204, y=78, w=890, h=602)
  rect("box_center_bg", "", 204, 78, 890, 602, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.2;align=left;verticalAlign=top;");
  text("lbl_dep_map", "<div style='font-size:11px;font-weight:800;color:#1E3A8A;text-align:center;'>NOVACURA – DEPENDENCY MAP (HIGH LEVEL)</div>", 204, 82, 890, 16, "align=center;");

  // Row 1: Users & Channels (y=104, h=80)
  rect("r1_lbl", "<div style='font-size:8px;font-weight:800;color:#1E40AF;transform:rotate(-90deg);'>USERS &amp;<br/>CHANNELS</div>", 208, 104, 30, 80, "fillColor=#EFF6FF;strokeColor=#BFDBFE;align=center;verticalAlign=middle;");
  const users = [
    { n: "Regulatory Users", icon: "👥" },
    { n: "QA / Compliance", icon: "👥" },
    { n: "External Partners", icon: "🏢" },
    { n: "Mobile Users", icon: "📱" },
    { n: "Admin Users", icon: "👤" }
  ];
  users.forEach((u, idx) => {
    const ux = 244 + idx * 168;
    rect(`u_c_${idx}`, `<div style='font-size:16px;text-align:center;'>${u.icon}</div><div style='font-size:8px;font-weight:800;text-align:center;margin-top:2px;'>${u.n}</div>`, ux, 114, 156, 60, "fillColor=#F8FAFC;strokeColor=#E2E8F0;rounded=1;align=center;verticalAlign=middle;padding=3;");
  });

  // Row 2: Applications (y=190, h=94)
  rect("r2_lbl", "<div style='font-size:8px;font-weight:800;color:#2563EB;transform:rotate(-90deg);'>APPLICATIONS</div>", 208, 190, 30, 94, "fillColor=#EFF6FF;strokeColor=#BFDBFE;align=center;verticalAlign=middle;");
  const apps = [
    { n: "Web Portal\n(Frontend)", icon: "💻" },
    { n: "API\nGateway", icon: "🛡️" },
    { n: "Auth Service\n(Identity)", icon: "🔒" },
    { n: "AI Service\n(LLM / Agents)", icon: "🧠" },
    { n: "Document\nProcessing", icon: "📑" },
    { n: "Search &amp; RAG\nService", icon: "🔍" },
    { n: "Reporting &amp;\nAnalytics", icon: "📊" }
  ];
  apps.forEach((a, idx) => {
    const ax = 244 + idx * 120;
    rect(`a_c_${idx}`, `<div style='font-size:14px;text-align:center;'>${a.icon}</div><div style='font-size:7.5px;font-weight:800;text-align:center;line-height:1.2;margin-top:2px;'>${a.n.replace(/\n/g, "<br/>")}</div>`, ax, 198, 112, 78, "fillColor=#EFF6FF;strokeColor=#BFDBFE;rounded=1;align=center;verticalAlign=middle;padding=2;");
  });

  // Row 3: Data Layer (y=290, h=94)
  rect("r3_lbl", "<div style='font-size:8px;font-weight:800;color:#059669;transform:rotate(-90deg);'>DATA LAYER</div>", 208, 290, 30, 94, "fillColor=#F0FDF4;strokeColor=#BBF7D0;align=center;verticalAlign=middle;");
  const dataStores = [
    { n: "Operational DB\n(Cloud SQL)", icon: "🗄️" },
    { n: "Vector DB\n(Vertex Vector)", icon: "🧠" },
    { n: "Document Store\n(Cloud Storage)", icon: "🗃️" },
    { n: "Data Warehouse\n(BigQuery)", icon: "📊" },
    { n: "Cache\n(Memorystore)", icon: "⚡" },
    { n: "Audit Logs\n(Cloud Logging)", icon: "📑" }
  ];
  dataStores.forEach((d, idx) => {
    const dx = 244 + idx * 140;
    rect(`d_c_${idx}`, `<div style='font-size:14px;text-align:center;'>${d.icon}</div><div style='font-size:7.5px;font-weight:800;text-align:center;line-height:1.2;margin-top:2px;'>${d.n.replace(/\n/g, "<br/>")}</div>`, dx, 298, 132, 78, "fillColor=#F0FDF4;strokeColor=#BBF7D0;rounded=1;align=center;verticalAlign=middle;padding=2;");
  });

  // Row 4: Integrations (y=390, h=90)
  rect("r4_lbl", "<div style='font-size:8px;font-weight:800;color:#D97706;transform:rotate(-90deg);'>INTEGRATIONS</div>", 208, 390, 30, 90, "fillColor=#FFFBEB;strokeColor=#FDE68A;align=center;verticalAlign=middle;");
  const integrations = [
    { n: "Salesforce\n(CRM)", icon: "🏢" },
    { n: "Veeva Vault\n(eCTD)", icon: "📁" },
    { n: "FDA APIs\n(Public Data)", icon: "🏛️" },
    { n: "EMA APIs\n(EU Regs)", icon: "🏛️" },
    { n: "Email Service\n(SendGrid)", icon: "✉️" },
    { n: "Slack\n(Webhook)", icon: "💬" },
    { n: "Partner SFTP\n(Batch Data)", icon: "📦" }
  ];
  integrations.forEach((it, idx) => {
    const ix = 244 + idx * 120;
    rect(`i_c_${idx}`, `<div style='font-size:14px;text-align:center;'>${it.icon}</div><div style='font-size:7.5px;font-weight:800;text-align:center;line-height:1.2;margin-top:2px;'>${it.n.replace(/\n/g, "<br/>")}</div>`, ix, 398, 112, 74, "fillColor=#FFFBEB;strokeColor=#FDE68A;rounded=1;align=center;verticalAlign=middle;padding=2;");
  });

  // Row 5: Platform / Infra (y=486, h=94)
  rect("r5_lbl", "<div style='font-size:8px;font-weight:800;color:#7C3AED;transform:rotate(-90deg);'>PLATFORM /<br/>INFRA</div>", 208, 486, 30, 94, "fillColor=#FAF5FF;strokeColor=#E9D5FF;align=center;verticalAlign=middle;");
  const infra = [
    { n: "Google Cloud\n(VPC, Network)", icon: "☁️" },
    { n: "Kubernetes Engine\n(GKE)", icon: "⚙️" },
    { n: "Cloud Run\n(Containers)", icon: "🚀" },
    { n: "Vertex AI\n(Models)", icon: "🧠" },
    { n: "Cloud Armor\n(Security)", icon: "🛡️" },
    { n: "Monitoring &amp;\nAlerting", icon: "📊" },
    { n: "Cloud Backup\n&amp; DR", icon: "🗃️" }
  ];
  infra.forEach((inf, idx) => {
    const fx = 244 + idx * 120;
    rect(`f_c_${idx}`, `<div style='font-size:14px;text-align:center;'>${inf.icon}</div><div style='font-size:7.5px;font-weight:800;text-align:center;line-height:1.2;margin-top:2px;'>${inf.n.replace(/\n/g, "<br/>")}</div>`, fx, 494, 112, 78, "fillColor=#FAF5FF;strokeColor=#E9D5FF;rounded=1;align=center;verticalAlign=middle;padding=2;");
  });

  // Row 6: Teams / Owners (y=586, h=88)
  rect("r6_lbl", "<div style='font-size:8px;font-weight:800;color:#475569;transform:rotate(-90deg);'>TEAMS /<br/>OWNERS</div>", 208, 586, 30, 88, "fillColor=#F8FAFC;strokeColor=#CBD5E1;align=center;verticalAlign=middle;");
  const teams = [
    { n: "Product Team", icon: "👥" },
    { n: "Data Engineering", icon: "👥" },
    { n: "ML/AI Eng", icon: "👥" },
    { n: "Security Team", icon: "👥" },
    { n: "DevOps / SRE", icon: "👥" },
    { n: "Compliance &amp; QA", icon: "👥" },
    { n: "Business Owners", icon: "👥" }
  ];
  teams.forEach((tm, idx) => {
    const tx = 244 + idx * 120;
    rect(`t_c_${idx}`, `<div style='font-size:14px;text-align:center;'>${tm.icon}</div><div style='font-size:7.5px;font-weight:800;text-align:center;margin-top:2px;'>${tm.n}</div>`, tx, 594, 112, 72, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=2;");
  });

  // 4. RIGHT SIDEBAR: CATALOG, EXTERNAL DEPS & RISK MATRIX (x=1104, y=78, w=472, h=602)
  // Dependency Catalog (y=78, h=200)
  const catHtml = `<div style='font-size:10px;font-weight:800;color:#1E3A8A;text-align:center;margin-bottom:3px;'>DEPENDENCY CATALOG (KEY)</div>
  <table style='width:100%;border-collapse:collapse;font-size:7.5px;'>
    <tr style='font-weight:800;border-bottom:1px solid #CBD5E1;background:#F8FAFC;'>
      <td style='padding:2px;'>ID</td><td>FROM</td><td>TO</td><td>TYPE</td><td>CRIT</td><td>OWNER</td>
    </tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:2px;'>D-01</td><td>Web Portal</td><td>API Gateway</td><td>API</td><td style='color:#DC2626;font-weight:800;'>🔴</td><td>Platform Team</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:2px;'>D-02</td><td>API Gateway</td><td>Auth Service</td><td>API</td><td style='color:#DC2626;font-weight:800;'>🔴</td><td>Platform Team</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:2px;'>D-03</td><td>AI Service</td><td>Vector DB</td><td>Data Read</td><td style='color:#DC2626;font-weight:800;'>🔴</td><td>ML Eng Team</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:2px;'>D-04</td><td>Doc Processing</td><td>Document Store</td><td>Data W/R</td><td style='color:#EA580C;font-weight:800;'>🟠</td><td>Data Eng Team</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:2px;'>D-05</td><td>Search &amp; RAG</td><td>Data Warehouse</td><td>Data Read</td><td style='color:#EA580C;font-weight:800;'>🟠</td><td>Data Eng Team</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:2px;'>D-06</td><td>Reporting</td><td>Data Warehouse</td><td>Data Read</td><td style='color:#EA580C;font-weight:800;'>🟠</td><td>Data Eng Team</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:2px;'>D-07</td><td>API Gateway</td><td>Salesforce</td><td>API</td><td style='color:#EA580C;font-weight:800;'>🟠</td><td>Integration Team</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:2px;'>D-08</td><td>System</td><td>Email Service</td><td>Async/Event</td><td style='color:#CA8A04;font-weight:800;'>🟡</td><td>Platform Team</td></tr>
    <tr><td style='padding:2px;'>D-09</td><td>All Apps</td><td>Cloud Monitoring</td><td>Config/Ctrl</td><td style='color:#16A34A;font-weight:800;'>🟢</td><td>SRE Team</td></tr>
  </table>`;
  rect("box_dep_cat", catHtml, 1104, 78, 472, 200, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.2;align=left;verticalAlign=top;padding=4;");

  // External Dependencies Table (y=284, h=164)
  const extHtml = `<div style='font-size:10px;font-weight:800;color:#1E3A8A;text-align:center;margin-bottom:3px;'>EXTERNAL DEPENDENCIES</div>
  <table style='width:100%;border-collapse:collapse;font-size:7.5px;'>
    <tr style='font-weight:800;border-bottom:1px solid #CBD5E1;background:#F8FAFC;'>
      <td style='padding:2px;'>SYSTEM</td><td>PURPOSE</td><td>CONTROL</td><td>CRITICALITY</td>
    </tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:2px;'><b>Salesforce</b></td><td>Customer / Account Data</td><td>API Limits, Contract</td><td style='color:#DC2626;font-weight:800;'>High</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:2px;'><b>Veeva Vault</b></td><td>Regulatory Documents</td><td>API Limits, Contract</td><td style='color:#DC2626;font-weight:800;'>High</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:2px;'><b>FDA APIs</b></td><td>Regulatory Data</td><td>Public API, Rate Limit</td><td style='color:#EA580C;font-weight:800;'>Medium</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:2px;'><b>EMA APIs</b></td><td>Regulatory Data</td><td>Public API, Rate Limit</td><td style='color:#EA580C;font-weight:800;'>Medium</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:2px;'><b>SendGrid</b></td><td>Email Notifications</td><td>API Limits, Contract</td><td style='color:#EA580C;font-weight:800;'>Medium</td></tr>
    <tr><td style='padding:2px;'><b>Partner SFTP</b></td><td>Secure File Exchange</td><td>Network, VPN, ACL</td><td style='color:#EA580C;font-weight:800;'>Medium</td></tr>
  </table>`;
  rect("box_ext_dep", extHtml, 1104, 284, 472, 164, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.2;align=left;verticalAlign=top;padding=4;");

  // Dependency Risk Matrix Heatmap (y=454, h=226)
  const riskHtml = `<div style='font-size:10px;font-weight:800;color:#DC2626;text-align:center;margin-bottom:3px;'>DEPENDENCY RISK MATRIX</div>
  <table style='width:100%;border-collapse:collapse;font-size:7.5px;text-align:center;'>
    <tr style='font-weight:800;background:#F8FAFC;'>
      <td style='padding:2px;text-align:left;'>Impact ➔<br/>Likelihood ↓</td><td>Low (1)</td><td>Medium (2)</td><td>High (3)</td><td>Critical (4)</td>
    </tr>
    <tr><td style='text-align:left;font-weight:700;'>High (Frequent)</td><td style='background:#DCFCE7;'>M (2)</td><td style='background:#FFEDD5;'>H (4)</td><td style='background:#FCA5A5;'>H (6)</td><td style='background:#F87171;color:#FFF;font-weight:900;'>C (8)</td></tr>
    <tr><td style='text-align:left;font-weight:700;'>Medium (Possible)</td><td style='background:#DCFCE7;'>L (2)</td><td style='background:#FEF08A;'>M (4)</td><td style='background:#FCA5A5;'>H (6)</td><td style='background:#F87171;color:#FFF;font-weight:900;'>C (8)</td></tr>
    <tr><td style='text-align:left;font-weight:700;'>Low (Rare)</td><td style='background:#DCFCE7;'>L (1)</td><td style='background:#DCFCE7;'>L (2)</td><td style='background:#FEF08A;'>M (3)</td><td style='background:#FCA5A5;'>H (4)</td></tr>
    <tr><td style='text-align:left;font-weight:700;'>Very Low (Unlikely)</td><td style='background:#DCFCE7;'>L (1)</td><td style='background:#DCFCE7;'>L (1)</td><td style='background:#FEF08A;'>M (2)</td><td style='background:#FEF08A;'>M (3)</td></tr>
  </table>`;
  rect("box_risk_matrix", riskHtml, 1104, 454, 472, 226, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.2;align=left;verticalAlign=top;padding=4;");

  // 5. LOWER 5 CARDS (y=688..920, h=232)
  // Critical Dependencies (x=24, w=290)
  const critHtml = `<div style='font-size:10px;font-weight:800;color:#DC2626;margin-bottom:3px;'>CRITICAL DEPENDENCIES (TOP 5)</div>
  <div style='font-size:7.5px;line-height:1.4;color:#0F172A;'>
    ❶ <b>AI Service ➔ Vector DB</b> (Model Context Retrieval)<br/><span style='color:#64748B;'>Impact: AI responses unavailable</span><br/>
    ❷ <b>Document Processing ➔ Document Store</b><br/><span style='color:#64748B;'>Impact: Document ingestion &amp; processing stops</span><br/>
    ❸ <b>Search &amp; RAG Service ➔ Data Warehouse</b><br/><span style='color:#64748B;'>Impact: Search results &amp; analytics degraded</span><br/>
    ❹ <b>API Gateway ➔ Auth Service</b><br/><span style='color:#64748B;'>Impact: User authentication fails</span><br/>
    ❺ <b>GKE / Cloud Run ➔ All Applications</b><br/><span style='color:#64748B;'>Impact: Service outage / unavailability</span>
  </div>`;
  rect("bot_crit", critHtml, 24, 688, 290, 232, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.2;align=left;verticalAlign=top;padding=5;");

  // Dependency Health Table (x=322, w=350)
  const healthHtml = `<div style='font-size:10px;font-weight:800;color:#16A34A;text-align:center;margin-bottom:3px;'>DEPENDENCY HEALTH (REAL-TIME VIEW)</div>
  <table style='width:100%;border-collapse:collapse;font-size:7.5px;'>
    <tr style='font-weight:800;border-bottom:1px solid #CBD5E1;background:#F8FAFC;'>
      <td style='padding:2px;'>COMPONENT</td><td>STATUS</td><td>LAST CHECK</td><td>OWNER</td>
    </tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:2px;'>API Gateway</td><td style='color:#16A34A;font-weight:800;'>✔ Healthy</td><td>2m ago</td><td>Platform Team</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:2px;'>Auth Service</td><td style='color:#16A34A;font-weight:800;'>✔ Healthy</td><td>1m ago</td><td>Platform Team</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:2px;'>AI Service</td><td style='color:#16A34A;font-weight:800;'>✔ Healthy</td><td>2m ago</td><td>ML Eng Team</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:2px;'>Vector DB</td><td style='color:#16A34A;font-weight:800;'>✔ Healthy</td><td>1m ago</td><td>Data Eng Team</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:2px;'>Document Store</td><td style='color:#16A34A;font-weight:800;'>✔ Healthy</td><td>3m ago</td><td>Data Eng Team</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:2px;'>Salesforce</td><td style='color:#D97706;font-weight:800;'>▲ Degraded</td><td>5m ago</td><td>Integration Team</td></tr>
    <tr><td style='padding:2px;'>EMA APIs</td><td style='color:#DC2626;font-weight:800;'>✖ Down</td><td>6m ago</td><td>Integration Team</td></tr>
  </table>`;
  rect("bot_health", healthHtml, 322, 688, 350, 232, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.2;align=left;verticalAlign=top;padding=5;");

  // Change Impact Analysis (x=680, w=350)
  const impHtml = `<div style='font-size:10px;font-weight:800;color:#2563EB;text-align:center;margin-bottom:3px;'>CHANGE IMPACT ANALYSIS (EXAMPLE)</div>
  <div style='font-size:8px;font-weight:700;color:#DC2626;text-align:center;'>If "Document Store (Cloud Storage)" is Unavailable</div>
  <div style='font-size:7.5px;display:flex;justify-content:space-between;margin-top:8px;'>
    <div><b>DIRECT IMPACT:</b><br/>• Document Processing<br/>• Audit Logs<br/>• Backups</div>
    <div><b>INDIRECT IMPACT:</b><br/>• Search &amp; RAG Service<br/>• Reporting &amp; Analytics<br/>• External Partners</div>
    <div><b>BUSINESS IMPACT:</b><br/>• Document ingestion stops<br/>• Search accuracy ↓<br/>• Compliance risk ↑</div>
  </div>
  <div style='font-size:7.5px;color:#16A34A;background:#F0FDF4;border:1px solid #BBF7D0;padding:3px;border-radius:4px;margin-top:10px;'>
    <b>Mitigation:</b> Enable backup bucket, retry policy, and degraded mode.<br/>
    RPO: 15 min &nbsp;|&nbsp; RTO: 60 min
  </div>`;
  rect("bot_impact", impHtml, 680, 688, 350, 232, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.2;align=left;verticalAlign=top;padding=5;");

  // Dependency Governance (x=1038, w=260)
  const govHtml = `<div style='font-size:10px;font-weight:800;color:#16A34A;margin-bottom:3px;'>DEPENDENCY GOVERNANCE</div>
  <div style='font-size:7.5px;line-height:1.45;color:#0F172A;'>
    ☑ Maintain dependency inventory<br/>
    ☑ Review &amp; validate dependencies quarterly<br/>
    ☑ Monitor health &amp; set SLOs<br/>
    ☑ Define owners for all critical dependencies<br/>
    ☑ Perform impact analysis before changes<br/>
    ☑ Document contracts &amp; SLAs<br/>
    ☑ Review third-party risk annually
  </div>`;
  rect("bot_gov", govHtml, 1038, 688, 260, 232, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.2;align=left;verticalAlign=top;padding=5;");

  // Notes (x=1306, w=270)
  const notesHtml = `<div style='font-size:10px;font-weight:800;color:#1E3A8A;margin-bottom:3px;'>NOTES</div>
  <div style='font-size:7.5px;line-height:1.45;color:#64748B;'>
    • All dependencies are continuously discovered and updated via scans &amp; integrations.<br/>
    • Critical dependencies have alerts and runbooks.<br/>
    • This map is reviewed monthly and after major changes.<br/>
    • Feed this map into risk, DR, and change management processes.
  </div>`;
  rect("bot_notes", notesHtml, 1306, 688, 270, 232, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.2;align=left;verticalAlign=top;padding=5;");

  // 6. KEY STATS BAR (y=926, h=38)
  const statsHtml = `<div style='font-size:8px;font-weight:800;color:#1E3A8A;display:flex;justify-content:space-around;align-items:center;'>
    <div><b>KEY STATS</b></div>
    <div>📄 Total Applications: <b>12</b></div>
    <div>🗄️ Data Stores: <b>6</b></div>
    <div>🔌 Integrations: <b>8</b></div>
    <div>⚠️ Critical Dependencies: <b>9</b></div>
    <div>🏢 External Partners: <b>7</b></div>
  </div>`;
  rect("box_key_stats", statsHtml, 24, 926, 1552, 38, "fillColor=#EFF6FF;strokeColor=#BFDBFE;rounded=1;align=center;verticalAlign=middle;padding=4;");

  // 7. FOOTER STATUS BAR (y=970, h=25)
  const footerHtml = `<div style='font-size:8.5px;color:#64748B;display:flex;justify-content:space-between;align-items:center;'>
    <div>Last Updated: May 8, 2025 &nbsp;|&nbsp; Next Review: Jun 8, 2025</div>
    <div>Owner: Enterprise Architecture Team</div>
  </div>`;
  rect("footer_status", footerHtml, 24, 970, 1552, 25, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=middle;padding=4;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_31_dependency_relationship_map" name="Template 31: Dependency / Relationship Map">
    <mxGraphModel dx="1600" dy="1020" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="1020" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${c.join("\n        ")}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
