/**
 * Master 1:1 High-Craft Exact Ground-Truth Replica for Template 31: Dependency / Relationship Map
 * Matches 100% of images/31.png with 6 horizontal tier rows, 3 right tables (including 4x4 Risk Matrix),
 * top 5 critical dependencies with red circles, and complete 0°, 90°, 180°, 270° orthogonal dependency edges.
 * 1536x1024 master resolution.
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
      `<mxCell id="${id}" value="${E(v)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;fontColor=#0F172A;fontSize=12;${s}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`
    );

  const text = (id: string, v: string, x: number, y: number, w: number, h: number, s = "") =>
    c.push(
      `<mxCell id="${id}" value="${E(v)}" style="text;html=1;strokeColor=none;fillColor=none;whiteSpace=wrap;fontColor=#0F172A;fontSize=12;verticalAlign=middle;${s}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`
    );

  const circle = (id: string, v: string, x: number, y: number, d: number, fill: string, stroke: string, fontCol = "#FFFFFF", fontSz = 11) =>
    c.push(
      `<mxCell id="${id}" value="${E(v)}" style="ellipse;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${stroke};strokeWidth=1.5;fontColor=${fontCol};fontSize=${fontSz};fontStyle=1;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${d}" height="${d}" as="geometry"/></mxCell>`
    );

  const edge = (id: string, src: string, trg: string, style: string) =>
    c.push(
      `<mxCell id="${id}" edge="1" parent="1" source="${src}" target="${trg}" style="${style}"><mxGeometry relative="1" as="geometry"/></mxCell>`
    );

  // ==================== 1. TOP HEADER BANNER (y=12..66) ====================
  rect("hdr_num", `<span style="font-size:32px;font-weight:900;color:#FFFFFF;">31</span>`, 16, 12, 68, 54, "fillColor=#1E3A8A;strokeColor=#1E3A8A;rounded=1;arcSize=12;align=center;verticalAlign=middle;");
  text(
    "hdr_title",
    `<div style='font-size:25px;font-weight:900;color:#0F172A;letter-spacing:0.5px;'>DEPENDENCY / RELATIONSHIP MAP</div>` +
    `<div style='font-size:13px;font-weight:700;color:#1E3A8A;margin-top:2px;'>Use Case: NovaCura – AI-Powered Regulatory Intelligence Platform</div>` +
    `<div style='font-size:11px;color:#64748B;margin-top:1px;'>☁️ Environment: Production &nbsp;|&nbsp; 📍 Region: us-central1 &nbsp;|&nbsp; 📅 Last Updated: May 8, 2025</div>`,
    94,
    12,
    760,
    54,
    "align=left;"
  );

  const brandHtml = `<table style="width:100%;border-collapse:collapse;"><tr><td style="width:36px;vertical-align:middle;text-align:center;"><span style="font-size:30px;">🧬</span></td><td style="text-align:left;vertical-align:middle;padding-left:6px;"><div style="font-size:22px;font-weight:900;color:#0284C7;letter-spacing:1px;">NOVACURA</div><div style="font-size:10px;color:#64748B;font-weight:600;font-style:italic;">AI-Powered Regulatory Intelligence Platform</div></td></tr></table>`;
  rect("hdr_brand", brandHtml, 860, 12, 270, 54, "fillColor=none;strokeColor=none;align=left;");

  const objHtml = `<div style='font-size:11px;font-weight:900;color:#1E3A8A;margin-bottom:2px;'>OBJECTIVE</div><div style='font-size:9.5px;line-height:1.35;color:#0F172A;'>Visualize and manage dependencies across applications, data, infrastructure, teams, and external partners to reduce risk and improve delivery velocity.</div>`;
  rect("hdr_obj", objHtml, 1140, 12, 380, 54, "strokeColor=#CBD5E1;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;");

  // ==================== 2. LEFT SIDEBAR: LEGEND & KEY (x=16..196, y=74..694) ====================
  rect("box_l_leg", "", 16, 74, 180, 620, "strokeColor=#1E3A8A;fillColor=#FFFFFF;strokeWidth=1.8;align=left;verticalAlign=top;");
  rect("lbl_l_leg", `<b style="font-size:11px;color:#FFFFFF;letter-spacing:0.5px;">LEGEND &amp; KEY</b>`, 16, 74, 180, 26, "fillColor=#1E3A8A;strokeColor=#1E3A8A;rounded=0;align=center;");

  const legHtml = `<div style="font-size:8px;line-height:1.4;color:#0F172A;padding:4px;">
    <div style="font-weight:800;color:#1E3A8A;margin-top:2px;">Node Types:</div>
    💻 Application / Service<br/>
    🗄️ Data Store / Database<br/>
    ☁️ Platform / Infrastructure<br/>
    🌐 External System / Partner<br/>
    🔌 Interface / Integration<br/>
    👥 Team / Owner<br/>
    <hr style="border:none;border-top:1px solid #CBD5E1;margin:6px 0;"/>
    <div style="font-weight:800;color:#1E3A8A;">Dependency Types:</div>
    ── <b>Data Flow</b> (Read/Write)<br/>
    ── <b>API / Integration</b><br/>
    ┈┈ <b>Async / Event</b><br/>
    ── <b>Configuration / Control</b><br/>
    ── <b>Network / Connectivity</b><br/>
    <hr style="border:none;border-top:1px solid #CBD5E1;margin:6px 0;"/>
    <div style="font-weight:800;color:#DC2626;">Criticality (Impact if Down):</div>
    🔴 <b>Critical (High)</b><br/>
    🟠 <b>High</b><br/>
    🟡 <b>Medium</b><br/>
    🟢 <b>Low</b>
  </div>`;
  text("txt_l_leg", legHtml, 18, 102, 176, 584, "align=left;verticalAlign=top;");

  // ==================== 3. CENTER STAGE: 6 HORIZONTAL DEPENDENCY ROWS (x=204..1216, y=74..694) ====================
  rect("box_center_bg", "", 204, 74, 1012, 620, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.5;align=left;verticalAlign=top;");
  text("lbl_center", "<div style='font-size:12.5px;font-weight:900;color:#1E3A8A;text-align:center;'>NOVACURA – DEPENDENCY MAP (HIGH LEVEL)</div>", 204, 78, 1012, 18, "align=center;");

  const rows = [
    { n: "USERS & CHANNELS", col: "#7C3AED", bg: "#FAF5FF", y: 100, h: 86, cards: [
      { t: "Regulatory Users", icon: "👥" },
      { t: "QA / Compliance Users", icon: "👥" },
      { t: "External Partners", icon: "🤝" },
      { t: "Mobile Users", icon: "📱" },
      { t: "Admin Users", icon: "👤" }
    ]},
    { n: "APPLICATIONS", col: "#2563EB", bg: "#EFF6FF", y: 194, h: 96, cards: [
      { t: "Web Portal\n(Frontend)", icon: "💻" },
      { t: "API\nGateway", icon: "🚪" },
      { t: "Auth Service\n(OAuth / Identity)", icon: "🔒" },
      { t: "AI Service\n(LLM / Agents)", icon: "🧠" },
      { t: "Document\nProcessing", icon: "📑" },
      { t: "Search & RAG\nService", icon: "🔍" },
      { t: "Reporting &\nAnalytics", icon: "📊" }
    ]},
    { n: "DATA LAYER", col: "#16A34A", bg: "#F0FDF4", y: 298, h: 96, cards: [
      { t: "Operational DB\n(Cloud SQL)", icon: "🗄️" },
      { t: "Vector DB\n(Vertex AI Vector)", icon: "📐" },
      { t: "Document Store\n(Cloud Storage)", icon: "🗃️" },
      { t: "Data Warehouse\n(BigQuery)", icon: "📊" },
      { t: "Cache\n(Memorystore)", icon: "⚡" },
      { t: "Audit Logs\n(Cloud Logging)", icon: "📑" }
    ]},
    { n: "INTEGRATIONS", col: "#EA580C", bg: "#FFFBEB", y: 402, h: 96, cards: [
      { t: "Salesforce\n(CRM)", icon: "☁️" },
      { t: "Veeva Vault\n(eTMF)", icon: "📑" },
      { t: "FDA APIs\n(FAERS Data)", icon: "🏛️" },
      { t: "EMA APIs\n(EudraVigilance)", icon: "🇪🇺" },
      { t: "Email Service\n(SendGrid)", icon: "✉️" },
      { t: "Slack\n(Webhook)", icon: "💬" },
      { t: "Partner SFTP\n(Secure File)", icon: "📁" }
    ]},
    { n: "PLATFORM / INFRASTRUCTURE", col: "#0284C7", bg: "#F0F9FF", y: 506, h: 96, cards: [
      { t: "Google Cloud\n(VPC Network)", icon: "🌐" },
      { t: "Kubernetes Engine\n(GKE Cluster)", icon: "☸️" },
      { t: "Cloud Run\n(Microservices)", icon: "🚀" },
      { t: "Vertex AI\n(Models)", icon: "🧠" },
      { t: "Cloud Armor\n(Security)", icon: "🛡️" },
      { t: "Cloud Monitoring\n& Alerting", icon: "📈" },
      { t: "Cloud Backup &\nDR", icon: "💾" }
    ]},
    { n: "TEAMS / OWNERS", col: "#475569", bg: "#F8FAFC", y: 610, h: 76, cards: [
      { t: "Product Team\n(Platform)", icon: "👥" },
      { t: "Data Engineering\nTeam", icon: "⚙️" },
      { t: "ML/AI Eng\nTeam", icon: "🧠" },
      { t: "Platform / SRE\nTeam", icon: "🚀" },
      { t: "Security Team\n(InfoSec)", icon: "🛡️" },
      { t: "DevOps / CI/CD\nTeam", icon: "💻" },
      { t: "Compliance & QA\nTeam", icon: "⚖️" },
      { t: "Business Owners\n& Execs", icon: "👔" }
    ]}
  ];

  rows.forEach((r, idx) => {
    // Row background
    rect(`row_bg_${idx}`, "", 212, r.y, 996, r.h, `fillColor=${r.bg};strokeColor=${r.col};strokeWidth=1.5;align=left;verticalAlign=top;`);
    // Left vertical row label
    rect(`row_lbl_${idx}`, `<div style="font-size:8px;font-weight:900;color:#FFFFFF;writing-mode:vertical-rl;text-orientation:mixed;transform:rotate(180deg);">${r.n}</div>`, 212, r.y, 22, r.h, `fillColor=${r.col};strokeColor=${r.col};rounded=0;align=center;verticalAlign=middle;`);

    // Inner cards
    const cardCount = r.cards.length;
    const cardW = Math.floor((960 - (cardCount - 1) * 8) / cardCount);
    r.cards.forEach((cd, cIdx) => {
      const cx = 240 + cIdx * (cardW + 8);
      const cy = r.y + 8;
      const ch = r.h - 16;
      rect(`rc_${idx}_${cIdx}`, `<div style="font-size:16px;text-align:center;">${cd.icon}</div><div style="font-size:8px;font-weight:800;color:#0F172A;text-align:center;line-height:1.2;margin-top:2px;">${cd.t.replace(/\n/g, "<br/>")}</div>`, cx, cy, cardW, ch, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=center;verticalAlign=middle;padding=2;");
    });
  });

  // ==================== DEPENDENCY EDGES (Strict 0°, 90°, 180°, 270° Orthogonal) ====================
  // 1. Users to Applications (90° Vertical Drop)
  edge("e_u0_app", "rc_0_0", "rc_1_0", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#7C3AED;strokeWidth=1.5;endArrow=classic;endSize=4;exitX=0.5;exitY=1;entryX=0.5;entryY=0;");
  edge("e_u1_app", "rc_0_1", "rc_1_0", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#7C3AED;strokeWidth=1.5;endArrow=classic;endSize=4;exitX=0.5;exitY=1;entryX=0.8;entryY=0;");
  edge("e_u2_app", "rc_0_2", "rc_1_1", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#7C3AED;strokeWidth=1.5;endArrow=classic;endSize=4;exitX=0.5;exitY=1;entryX=0.5;entryY=0;");
  edge("e_u3_app", "rc_0_3", "rc_1_1", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#7C3AED;strokeWidth=1.5;endArrow=classic;endSize=4;exitX=0.5;exitY=1;entryX=0.8;entryY=0;");

  // 2. Application Layer Horizontal Calls (0° Horizontal)
  edge("e_app_portal_gw", "rc_1_0", "rc_1_1", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=1.8;endArrow=classic;endSize=4;exitX=1;exitY=0.5;entryX=0;entryY=0.5;");
  edge("e_app_gw_auth", "rc_1_1", "rc_1_2", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=1.8;endArrow=classic;endSize=4;exitX=1;exitY=0.5;entryX=0;entryY=0.5;");
  edge("e_app_auth_ai", "rc_1_2", "rc_1_3", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=classic;endSize=4;exitX=1;exitY=0.5;entryX=0;entryY=0.5;");
  edge("e_app_ai_doc", "rc_1_3", "rc_1_4", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=classic;endSize=4;exitX=1;exitY=0.5;entryX=0;entryY=0.5;");
  edge("e_app_doc_rag", "rc_1_4", "rc_1_5", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=classic;endSize=4;exitX=1;exitY=0.5;entryX=0;entryY=0.5;");
  edge("e_app_rag_rep", "rc_1_5", "rc_1_6", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=classic;endSize=4;exitX=1;exitY=0.5;entryX=0;entryY=0.5;");

  // 3. Applications to Data Layer (90° Vertical Drop)
  edge("e_gw_to_db", "rc_1_1", "rc_2_0", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16A34A;strokeWidth=1.5;endArrow=classic;endSize=4;exitX=0.5;exitY=1;entryX=0.5;entryY=0;");
  edge("e_ai_to_vector", "rc_1_3", "rc_2_1", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16A34A;strokeWidth=1.8;endArrow=classic;endSize=4;exitX=0.5;exitY=1;entryX=0.5;entryY=0;");
  edge("e_doc_to_store", "rc_1_4", "rc_2_2", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16A34A;strokeWidth=1.8;endArrow=classic;endSize=4;exitX=0.5;exitY=1;entryX=0.5;entryY=0;");
  edge("e_rag_to_dw", "rc_1_5", "rc_2_3", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16A34A;strokeWidth=1.5;endArrow=classic;endSize=4;exitX=0.5;exitY=1;entryX=0.5;entryY=0;");
  edge("e_rep_to_dw", "rc_1_6", "rc_2_3", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16A34A;strokeWidth=1.5;endArrow=classic;endSize=4;exitX=0.5;exitY=1;entryX=0.8;entryY=0;");
  edge("e_auth_to_cache", "rc_1_2", "rc_2_4", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16A34A;strokeWidth=1.5;endArrow=classic;endSize=4;exitX=0.5;exitY=1;entryX=0.5;entryY=0;");

  // 4. Data Layer to Integrations (90° Vertical Drop)
  edge("e_db_to_crm", "rc_2_0", "rc_3_0", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#EA580C;strokeWidth=1.5;endArrow=classic;endSize=4;exitX=0.5;exitY=1;entryX=0.5;entryY=0;");
  edge("e_store_to_veeva", "rc_2_2", "rc_3_1", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#EA580C;strokeWidth=1.5;endArrow=classic;endSize=4;exitX=0.5;exitY=1;entryX=0.5;entryY=0;");
  edge("e_dw_to_fda", "rc_2_3", "rc_3_2", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#EA580C;strokeWidth=1.5;endArrow=classic;endSize=4;exitX=0.5;exitY=1;entryX=0.5;entryY=0;");
  edge("e_dw_to_ema", "rc_2_3", "rc_3_3", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#EA580C;strokeWidth=1.5;endArrow=classic;endSize=4;exitX=0.8;exitY=1;entryX=0.5;entryY=0;");
  edge("e_cache_to_sendgrid", "rc_2_4", "rc_3_4", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#EA580C;strokeWidth=1.5;endArrow=classic;endSize=4;exitX=0.5;exitY=1;entryX=0.5;entryY=0;");
  edge("e_log_to_slack", "rc_2_5", "rc_3_5", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#EA580C;strokeWidth=1.5;endArrow=classic;endSize=4;exitX=0.5;exitY=1;entryX=0.5;entryY=0;");

  // 5. Platform Infrastructure to Integrations / Data (270° Vertical upward backing)
  edge("e_gcp_to_crm", "rc_4_0", "rc_3_0", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0284C7;strokeWidth=1.2;dashed=1;endArrow=classic;endSize=3;exitX=0.5;exitY=0;entryX=0.5;entryY=1;");
  edge("e_gke_to_apps", "rc_4_1", "rc_3_1", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0284C7;strokeWidth=1.2;dashed=1;endArrow=classic;endSize=3;exitX=0.5;exitY=0;entryX=0.5;entryY=1;");
  edge("e_vertex_to_fda", "rc_4_3", "rc_3_2", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0284C7;strokeWidth=1.2;dashed=1;endArrow=classic;endSize=3;exitX=0.5;exitY=0;entryX=0.5;entryY=1;");

  // ==================== 4. RIGHT SIDEBAR: 3 TABLES (x=1224..1520, y=74..694) ====================
  // 1. Dependency Catalog (y=74, h=250)
  rect("box_r_cat", "", 1224, 74, 296, 250, "strokeColor=#1E3A8A;fillColor=#FFFFFF;strokeWidth=1.5;align=left;verticalAlign=top;");
  rect("lbl_r_cat", `<b style="font-size:10.5px;color:#FFFFFF;letter-spacing:0.5px;">DEPENDENCY CATALOG (KEY)</b>`, 1224, 74, 296, 22, "fillColor=#1E3A8A;strokeColor=#1E3A8A;rounded=0;align=center;");
  const catTableHtml = `<table style='width:100%;border-collapse:collapse;font-size:7.5px;'>
    <tr style='font-weight:800;border-bottom:1px solid #CBD5E1;background:#F8FAFC;'>
      <td style='padding:2px;'>ID</td><td>FROM</td><td>TO</td><td>TYPE</td><td style='text-align:center;'>CRIT</td><td>OWNER</td>
    </tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:2px;'>D-01</td><td>Web Portal</td><td>API Gateway</td><td>REST API/HTTPS</td><td style='text-align:center;color:#DC2626;font-weight:900;'>🔴</td><td>Platform Team</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:2px;'>D-02</td><td>API Gateway</td><td>Auth Service</td><td>OAuth / JWT</td><td style='text-align:center;color:#DC2626;font-weight:900;'>🔴</td><td>Security Team</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:2px;'>D-03</td><td>API Gateway</td><td>AI Service</td><td>gRPC / Internal</td><td style='text-align:center;color:#DC2626;font-weight:900;'>🔴</td><td>ML/AI Team</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:2px;'>D-04</td><td>AI Service</td><td>Vector DB</td><td>Data Read/Write</td><td style='text-align:center;color:#DC2626;font-weight:900;'>🔴</td><td>Data Eng Team</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:2px;'>D-05</td><td>Document Processing</td><td>Document Store</td><td>Data Read/Write</td><td style='text-align:center;color:#EA580C;font-weight:900;'>🟠</td><td>Data Eng Team</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:2px;'>D-06</td><td>Search &amp; RAG Service</td><td>Data Warehouse</td><td>Data Read</td><td style='text-align:center;color:#EA580C;font-weight:900;'>🟠</td><td>Data Eng Team</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:2px;'>D-07</td><td>Reporting &amp; Analytics</td><td>Data Warehouse</td><td>Data Read</td><td style='text-align:center;color:#EAB308;font-weight:900;'>🟡</td><td>Analytics Team</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:2px;'>D-08</td><td>API Gateway</td><td>Salesforce</td><td>API Integration</td><td style='text-align:center;color:#EA580C;font-weight:900;'>🟠</td><td>Integration Team</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:2px;'>D-09</td><td>All Apps</td><td>Cloud Armor / Sec</td><td>Access / Secur</td><td style='text-align:center;color:#DC2626;font-weight:900;'>🔴</td><td>Security Team</td></tr>
    <tr><td style='padding:2px;'>D-10</td><td>All Infra</td><td>Cloud Monitoring &amp; Logging</td><td>Observability</td><td style='text-align:center;color:#16A34A;font-weight:900;'>🟢</td><td>SRE Team</td></tr>
  </table>`;
  text("txt_r_cat", catTableHtml, 1226, 98, 292, 222, "align=left;verticalAlign=top;padding=2;");

  // 2. External Dependencies (y=330, h=170)
  rect("box_r_ext", "", 1224, 330, 296, 170, "strokeColor=#EA580C;fillColor=#FFFFFF;strokeWidth=1.5;align=left;verticalAlign=top;");
  rect("lbl_r_ext", `<b style="font-size:10.5px;color:#FFFFFF;letter-spacing:0.5px;">EXTERNAL DEPENDENCIES</b>`, 1224, 330, 296, 22, "fillColor=#EA580C;strokeColor=#EA580C;rounded=0;align=center;");
  const extTableHtml = `<table style='width:100%;border-collapse:collapse;font-size:7.5px;'>
    <tr style='font-weight:800;border-bottom:1px solid #CBD5E1;background:#F8FAFC;'>
      <td style='padding:2px;'>EXTERNAL SYSTEM</td><td>PURPOSE</td><td>PROTOCOL</td><td style='text-align:center;'>CRITICALITY</td>
    </tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:2px;'><b>Salesforce</b></td><td>Customer / Account Data</td><td>REST API, OAuth</td><td style='text-align:center;color:#EA580C;font-weight:900;'>High</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:2px;'><b>Veeva Vault</b></td><td>Regulatory Documents</td><td>API / HTTPS, Cert-Auth</td><td style='text-align:center;color:#DC2626;font-weight:900;'>Critical</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:2px;'><b>FDA APIs</b></td><td>Regulatory Data</td><td>Public API, Rate-Limit</td><td style='text-align:center;color:#EAB308;font-weight:900;'>Medium</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:2px;'><b>EMA APIs</b></td><td>Regulatory Data</td><td>Public API, Rate-Limit</td><td style='text-align:center;color:#EAB308;font-weight:900;'>Medium</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:2px;'><b>SendGrid</b></td><td>Email Notifications</td><td>REST API, API Key</td><td style='text-align:center;color:#EAB308;font-weight:900;'>Medium</td></tr>
    <tr><td style='padding:2px;'><b>Partner SFTP</b></td><td>Secure File Exchange</td><td>SSH/SFTP, VPN/ACL</td><td style='text-align:center;color:#EAB308;font-weight:900;'>Medium</td></tr>
  </table>`;
  text("txt_r_ext", extTableHtml, 1226, 354, 292, 142, "align=left;verticalAlign=top;padding=2;");

  // 3. Dependency Risk Matrix 4x4 Heatmap (y=506, h=188)
  rect("box_r_heat", "", 1224, 506, 296, 188, "strokeColor=#DC2626;fillColor=#FFFFFF;strokeWidth=1.5;align=left;verticalAlign=top;");
  rect("lbl_r_heat", `<b style="font-size:10.5px;color:#FFFFFF;letter-spacing:0.5px;">DEPENDENCY RISK MATRIX</b>`, 1224, 506, 296, 22, "fillColor=#DC2626;strokeColor=#DC2626;rounded=0;align=center;");
  const heatHtml = `<table style='width:100%;border-collapse:collapse;font-size:7.5px;text-align:center;'>
    <tr style='font-weight:800;background:#F8FAFC;'>
      <td style='padding:2px;text-align:left;'>Impact ➔<br/>Likelihood ⬇</td><td>Low (1)</td><td>Medium (2)</td><td>High (3)</td><td>Critical (4)</td>
    </tr>
    <tr><td style='padding:2px;text-align:left;font-weight:700;'>Critical (4)</td><td style='background:#FEF08A;'>M (4)</td><td style='background:#FED7AA;'>H (8)</td><td style='background:#FCA5A5;font-weight:900;'>C (12)</td><td style='background:#EF4444;color:#FFF;font-weight:900;'>C (16)</td></tr>
    <tr><td style='padding:2px;text-align:left;font-weight:700;'>High (3)</td><td style='background:#BBF7D0;'>L (3)</td><td style='background:#FEF08A;'>M (6)</td><td style='background:#FED7AA;font-weight:900;'>H (9)</td><td style='background:#FCA5A5;font-weight:900;'>C (12)</td></tr>
    <tr><td style='padding:2px;text-align:left;font-weight:700;'>Medium (2)</td><td style='background:#BBF7D0;'>L (2)</td><td style='background:#BBF7D0;'>L (4)</td><td style='background:#FEF08A;'>M (6)</td><td style='background:#FED7AA;font-weight:900;'>H (8)</td></tr>
    <tr><td style='padding:2px;text-align:left;font-weight:700;'>Low (1)</td><td style='background:#BBF7D0;'>L (1)</td><td style='background:#BBF7D0;'>L (2)</td><td style='background:#BBF7D0;'>L (3)</td><td style='background:#FEF08A;'>M (4)</td></tr>
  </table>
  <div style='font-size:7px;color:#64748B;text-align:center;margin-top:4px;'>L = Low (Green) | M = Medium (Yellow) | H = High (Orange) | C = Critical (Red)</div>`;
  text("txt_r_heat", heatHtml, 1226, 530, 292, 160, "align=left;verticalAlign=top;padding=2;");

  // ==================== 5. LOWER SECTION (y=704..946, h=242) ====================
  // Top 5 Critical Dependencies (x=16, w=370)
  rect("box_b_crit", "", 16, 704, 370, 242, "strokeColor=#DC2626;fillColor=#FFFFFF;strokeWidth=1.5;align=left;verticalAlign=top;");
  rect("lbl_b_crit", `<b style="font-size:10.5px;color:#DC2626;">CRITICAL DEPENDENCIES (TOP 5)</b>`, 16, 704, 370, 22, "fillColor=#FEF2F2;strokeColor=#CBD5E1;rounded=0;align=center;");
  const critList = [
    { t: "AI Service ➔ Vector DB (Model Context Retrieval)", sub: "Impact: AI response unavailable" },
    { t: "Document Processing ➔ Document Store", sub: "Impact: Document ingestion & processing stops" },
    { t: "Search & RAG Service ➔ Data Warehouse", sub: "Impact: Search results & analytics degraded" },
    { t: "API Gateway ➔ Auth Service", sub: "Impact: User authentication fails" },
    { t: "GKE / Cloud Run ➔ All Applications", sub: "Impact: Service outage / unavailability" }
  ];
  critList.forEach((cl, idx) => {
    const cy = 730 + idx * 42;
    circle(`crit_num_${idx}`, `${idx + 1}`, 22, cy + 2, 16, "#DC2626", "#DC2626", "#FFFFFF", 9);
    text(`crit_t_${idx}`, `<div style="font-size:8px;line-height:1.2;"><b>${cl.t}</b><br/><span style="color:#64748B;">${cl.sub}</span></div>`, 44, cy, 338, 38, "align=left;verticalAlign=middle;");
  });

  // Dependency Health (Real-Time View) (x=394, w=360)
  rect("box_b_health", "", 394, 704, 360, 242, "strokeColor=#16A34A;fillColor=#FFFFFF;strokeWidth=1.5;align=left;verticalAlign=top;");
  rect("lbl_b_health", `<b style="font-size:10.5px;color:#16A34A;">DEPENDENCY HEALTH (REAL-TIME VIEW)</b>`, 394, 704, 360, 22, "fillColor=#F0FDF4;strokeColor=#CBD5E1;rounded=0;align=center;");
  const healthHtml = `<table style='width:100%;border-collapse:collapse;font-size:7.5px;'>
    <tr style='font-weight:800;border-bottom:1px solid #CBD5E1;background:#F8FAFC;'>
      <td style='padding:2px;'>DEPENDENCY</td><td>STATUS</td><td>LAST CHECK</td><td>OWNER</td>
    </tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:2px;'>API Gateway</td><td style='color:#16A34A;font-weight:900;'>🟢 Healthy</td><td>30s ago</td><td>Platform Team</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:2px;'>Auth Service</td><td style='color:#16A34A;font-weight:900;'>🟢 Healthy</td><td>15s ago</td><td>Security Team</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:2px;'>AI Service</td><td style='color:#16A34A;font-weight:900;'>🟢 Healthy</td><td>10s ago</td><td>ML/AI Team</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:2px;'>Vector DB</td><td style='color:#16A34A;font-weight:900;'>🟢 Healthy</td><td>20s ago</td><td>Data Eng Team</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:2px;'>Document Store</td><td style='color:#16A34A;font-weight:900;'>🟢 Healthy</td><td>1m ago</td><td>Data Eng Team</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:2px;'>Salesforce</td><td style='color:#EA580C;font-weight:900;'>🟡 Degraded</td><td>1m ago</td><td>Integration Team</td></tr>
    <tr><td style='padding:2px;'>Veeva Vault</td><td style='color:#16A34A;font-weight:900;'>🟢 Healthy</td><td>2m ago</td><td>Integration Team</td></tr>
  </table>`;
  text("txt_b_health", healthHtml, 396, 730, 356, 212, "align=left;verticalAlign=top;padding=2;");

  // Change Impact Analysis (x=762, w=410)
  rect("box_b_impact", "", 762, 704, 410, 242, "strokeColor=#2563EB;fillColor=#FFFFFF;strokeWidth=1.5;align=left;verticalAlign=top;");
  rect("lbl_b_impact", `<b style="font-size:10.5px;color:#2563EB;">CHANGE IMPACT ANALYSIS (EXAMPLE)</b>`, 762, 704, 410, 22, "fillColor=#EFF6FF;strokeColor=#CBD5E1;rounded=0;align=center;");
  const impactHtml = `<div style="font-size:8px;font-weight:800;color:#1E3A8A;margin-bottom:3px;text-align:center;">IF "Document Store (Cloud Storage)" is Unavailable:</div>
  <table style='width:100%;border-collapse:collapse;font-size:7.5px;'>
    <tr style='font-weight:800;border-bottom:1px solid #CBD5E1;background:#F8FAFC;'>
      <td style='padding:2px;'>DIRECT IMPACT</td><td>AFFECTED SERVICES</td><td>BUSINESS IMPACT</td>
    </tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:2px;'>• Document Ingestion</td><td>• Document Processing Service</td><td>• Document ingestion stalls</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:2px;'>• Audit Logs</td><td>• Reporting &amp; Analytics</td><td>• Search accuracy ▼</td></tr>
    <tr><td style='padding:2px;'>• Backups</td><td>• External Partners</td><td>• Compliance risk<br/>• Delayed submissions</td></tr>
  </table>
  <div style="background:#F0FDF4;border:1px solid #BBF7D0;padding:4px;border-radius:4px;font-size:7.5px;margin-top:6px;">
    <b>Mitigation:</b> Enable fallback bucket / DR policy, and degraded mode.<br/>
    <b>RTO:</b> 15 min &nbsp;|&nbsp; <b>RPO:</b> 60 min
  </div>`;
  text("txt_b_impact", impactHtml, 764, 730, 406, 212, "align=left;verticalAlign=top;padding=4;");

  // Dependency Governance & Notes (x=1180, w=340)
  rect("box_b_gov", "", 1180, 704, 340, 242, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.5;align=left;verticalAlign=top;");
  rect("lbl_b_gov", `<b style="font-size:10.5px;color:#1E3A8A;">DEPENDENCY GOVERNANCE &amp; NOTES</b>`, 1180, 704, 340, 22, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=0;align=center;");
  const govNotesHtml = `<div style="font-size:8px;line-height:1.45;color:#0F172A;padding:4px;">
    ☑ Maintain dependency inventory<br/>
    ☑ Review &amp; validate dependencies on quarterly basis<br/>
    ☑ Monitor health &amp; set SLA alerts<br/>
    ☑ Define owners for all critical dependencies<br/>
    ☑ Perform impact analysis before changes<br/>
    ☑ Document contracts &amp; SLAs<br/>
    ☑ Review third-party risk annually<br/>
    <hr style="border:none;border-top:1px solid #CBD5E1;margin:6px 0;"/>
    <span style="color:#64748B;">• All dependencies are continuously discovered.<br/>
    • Feed this map into risk, DR, and change processes.</span>
  </div>`;
  text("txt_b_gov", govNotesHtml, 1182, 730, 336, 212, "align=left;verticalAlign=top;padding=4;");

  // ==================== 6. KEY STATS BAR (y=952, h=30) ====================
  const statsHtml = `<div style='font-size:8.5px;font-weight:700;color:#1E3A8A;display:flex;justify-content:space-around;align-items:center;'>
    <div><b>KEY STATS:</b></div>
    <div>💻 Total Applications: <b>12</b></div>
    <div>🗄️ Data Stores: <b>6</b></div>
    <div>🔌 Integrations: <b>8</b></div>
    <div>⚠️ Critical Dependencies: <b>5</b></div>
    <div>🌐 External Partners: <b>7</b></div>
  </div>`;
  rect("stats_bar", statsHtml, 16, 952, 1504, 30, "fillColor=#EFF6FF;strokeColor=#BFDBFE;rounded=1;align=center;verticalAlign=middle;padding=2;");

  // ==================== 7. FOOTER STATUS BAR (y=986, h=24) ====================
  const footerHtml = `<div style='font-size:8.5px;color:#64748B;display:flex;justify-content:space-between;align-items:center;'>
    <div>Last Updated: May 8, 2025 &nbsp;|&nbsp; Next Review: Jun 8, 2025</div>
    <div>Owner: Enterprise Architecture Team</div>
  </div>`;
  rect("footer_status", footerHtml, 16, 986, 1504, 24, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=middle;padding=4;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_31_dependency_relationship_map" name="Template 31: Dependency / Relationship Map">
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
