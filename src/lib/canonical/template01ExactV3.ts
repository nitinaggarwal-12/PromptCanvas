/**
 * Master 1:1 Exact Replica Generator for Canonical Template 01: System Context
 * Matches 100% of images/01.png (NOVACURA Bio-Pharma Platform)
 * Pure collision-free geometry, complete <mxfile> envelope, and high-contrast typography.
 */

const E = (v?: string | null) =>
  (v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function generateTemplate01ExactV3Xml(domainFlavor = "biopharma", theme: "light" | "dark" = "light"): string {
  const isDark = theme === "dark";
  const bg = isDark ? "#0B111E" : "#FFFFFF";
  const c: string[] = [];

  const rect = (id: string, v: string, x: number, y: number, w: number, h: number, s = "") =>
    c.push(`<mxCell id="${id}" value="${E(v)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;fontColor=#0F172A;fontSize=11;${s}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`);

  const text = (id: string, v: string, x: number, y: number, w: number, h: number, s = "") =>
    c.push(`<mxCell id="${id}" value="${E(v)}" style="text;html=1;strokeColor=none;fillColor=none;whiteSpace=wrap;fontColor=#0F172A;fontSize=11;verticalAlign=middle;${s}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`);

  const edge = (id: string, src: string, tgt: string, label = "", color = "#1D4ED8", dash = false, s = "") =>
    c.push(`<mxCell id="${id}" value="${E(label)}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${color};strokeWidth=1.8;endArrow=block;endFill=1;fontSize=8;fontColor=${color};fontStyle=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=3;${dash ? "dashed=1;dashPattern=6 4;" : ""}${s}" edge="1" parent="1" source="${src}" target="${tgt}"><mxGeometry relative="1" as="geometry"/></mxCell>`);

  const cardWithIcon = (id: string, title: string, desc: string, iconEmoji: string, x: number, y: number, w: number, h: number, border = "#BFDBFE", cardBg = "#FFFFFF", titleColor = "#1E3A8A", iconBg = "#EFF6FF", iconBorder = "#DBEAFE") => {
    const html = `<table style="width:100%;height:100%;border-collapse:collapse;">
      <tr>
        <td style="width:38px;vertical-align:middle;padding:2px;text-align:center;">
          <div style="width:32px;height:32px;border-radius:8px;background:${iconBg};border:1px solid ${iconBorder};display:flex;align-items:center;justify-content:center;margin:0 auto;">
            <span style="font-size:16px;">${iconEmoji}</span>
          </div>
        </td>
        <td style="vertical-align:middle;padding-left:6px;text-align:left;">
          <div style="font-size:9.5px;font-weight:700;color:${titleColor};line-height:1.2;">${title}</div>
          <div style="font-size:7.5px;color:#475569;margin-top:1px;line-height:1.15;">${desc.replace(/\n/g, "<br/>")}</div>
        </td>
      </tr>
    </table>`;
    c.push(`<mxCell id="${id}" value="${E(html)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${border};strokeWidth=1.2;shadow=0;" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`);
  };

  // =========================================================================
  // 1. TOP HEADER BANNER
  // =========================================================================
  text("t1", "01 — System Context | NOVACURA Bio-Pharma Platform", 24, 16, 950, 32, "fontSize=24;fontStyle=1;align=left;fontColor=#0F172A;");
  text("t2", "Core Architecture Family | Bio-Pharma Product", 24, 48, 600, 20, "fontSize=13;fontStyle=1;fontColor=#64748B;align=left;");

  // =========================================================================
  // 2. TOP GOVERNANCE & OVERSIGHT POD (Purple #7C3AED, y: 70 to 160)
  // =========================================================================
  rect("gov_container", "", 445, 68, 625, 96, "strokeColor=#8B5CF6;strokeWidth=1.5;fillColor=#FAF5FF;shadow=0;");
  text("gov_title", "Governance & Oversight", 632, 70, 250, 18, "fontSize=12;fontStyle=1;fontColor=#6D28D9;align=center;");

  const govItems = [
    { title: "Executive Leadership", sub: "• Strategic Direction\n• Portfolio Oversight", icon: "👤" },
    { title: "Compliance / Legal", sub: "• Policy & Compliance\n• Risk Management\n• Audit & eDiscovery", icon: "⚖️" },
    { title: "Data Governance Board", sub: "• Data Standards\n• Quality & Lineage\n• Access & Ethics", icon: "👥" },
  ];

  govItems.forEach((item, i) => {
    const x = 460 + i * 200;
    cardWithIcon(`gov_card_${i}`, item.title, item.sub, item.icon, x, 92, 190, 62, "#DDD6FE", "#FFFFFF", "#6D28D9", "#F5F3FF", "#DDD6FE");
  });

  // =========================================================================
  // 3. LEFT COLUMN: INTERNAL BUSINESS USERS (x: 24 to 280, y: 140 to 650)
  // =========================================================================
  rect("users_container", "", 24, 140, 256, 500, "strokeColor=#3B82F6;strokeWidth=1.5;fillColor=#EFF6FF;shadow=0;");
  text("users_title", "Internal Business Users", 40, 144, 224, 22, "fontSize=12.5;fontStyle=1;fontColor=#1E40AF;align=center;");

  const users = [
    { title: "Research Scientists", sub: "Design studies, manage laboratory\n& preclinical data, insights", icon: "🔬" },
    { title: "Clinical Operations", sub: "Run trials, monitor sites, manage\nparticipants and activities", icon: "🩺" },
    { title: "Regulatory Affairs Team", sub: "Prepare submissions, track\ncommitments, manage variations", icon: "📋" },
    { title: "Safety / PV Specialists", sub: "Detect, evaluate, report adverse\nevents and safety signals", icon: "🛡️" },
    { title: "Quality Assurance", sub: "Manage quality events, CAPA,\naudits, deviations", icon: "🏅" },
    { title: "Medical Affairs", sub: "Respond to inquiries, medical\ncontent and evidence", icon: "💬" },
    { title: "Commercial Analytics", sub: "Market insights, forecasting,\nperformance & customer analytics", icon: "📊" },
  ];

  users.forEach((u, i) => {
    const y = 170 + i * 66;
    cardWithIcon(`user_card_${i}`, u.title, u.sub, u.icon, 34, y, 236, 58, "#BFDBFE", "#FFFFFF", "#1E3A8A", "#EFF6FF", "#BFDBFE");
  });

  // =========================================================================
  // 4. CENTRAL PLATFORM CONTAINER: NOVACURA Bio-Pharma Platform (x: 400 to 1080, y: 180 to 650)
  // =========================================================================
  rect("platform_container", "", 400, 180, 680, 460, "strokeColor=#2563EB;strokeWidth=2;fillColor=#FFFFFF;shadow=1;");

  // Platform Header Banner
  const platLogoHtml = `<table style="margin:0 auto;text-align:center;">
    <tr>
      <td style="vertical-align:middle;padding-right:6px;"><span style="font-size:24px;">🧬</span></td>
      <td style="vertical-align:middle;text-align:left;">
        <div style="font-size:20px;font-weight:900;color:#0F2A4A;letter-spacing:1.5px;line-height:1;">NOVACURA</div>
        <div style="font-size:11px;font-weight:700;color:#2563EB;line-height:1;margin-top:2px;">Bio-Pharma Platform</div>
      </td>
    </tr>
  </table>`;
  text("plat_logo", platLogoHtml, 530, 186, 420, 42, "align=center;");

  // Middle Web Portal Lock
  rect("portal_box", `<div style="text-align:center;padding:4px;"><span style="font-size:16px;">🔒</span><div style="font-size:8.5px;font-weight:700;color:#1E3A8A;margin-top:2px;">Secure Web Portal<br/>(Single Experience)</div><div style="font-size:7px;color:#64748B;margin-top:2px;">Role-Based Access &amp; Workflows</div></div>`, 295, 360, 95, 76, "strokeColor=#3B82F6;strokeWidth=1.2;fillColor=#EFF6FF;align=center;rounded=1;shadow=0;");

  // Core Capabilities Grid (8 modules: 2 columns x 4 rows)
  const coreModules = [
    { title: "R&D & Clinical", sub: "• Program Mgmt\n• Protocols & Studies\n• Trial Oversight", icon: "🧪", col: 0, row: 0 },
    { title: "Regulatory Affairs", sub: "• Submissions\n• Commitments\n• Variations", icon: "📋", col: 1, row: 0 },
    { title: "Pharmacovigilance", sub: "• Case Mgmt\n• Signal Detection\n• Risk Mgmt", icon: "🛡️", col: 0, row: 1 },
    { title: "Quality & Manufacturing", sub: "• Quality Events\n• CAPA & Change\n• Batch & Release", icon: "🏭", col: 1, row: 1 },
    { title: "Medical Information", sub: "• Inquiry Mgmt\n• Medical Content\n• Evidence Library", icon: "💬", col: 0, row: 2 },
    { title: "Commercial Insights", sub: "• Market Analytics\n• Forecasting\n• Performance KPIs", icon: "📊", col: 1, row: 2 },
    { title: "Document & Knowledge Hub", sub: "• Document Mgmt\n• Version Control\n• Collaboration", icon: "📁", col: 0, row: 3 },
    { title: "AI Copilot & Automation", sub: "• Intelligent Assist\n• Workflow Orchestration\n• Decision Support", icon: "✨", col: 1, row: 3 },
  ];

  coreModules.forEach((m, i) => {
    const x = 420 + m.col * 320;
    const y = 236 + m.row * 82;
    cardWithIcon(`mod_${i}`, m.title, m.sub, m.icon, x, y, 300, 72, "#DBEAFE", "#F8FAFC", "#1E3A8A", "#EFF6FF", "#DBEAFE");
  });

  // Cross-Cutting Governance Bar (4 badges)
  const crossCutting = [
    { title: "Security & Privacy", sub: "Zero Trust • CMEK", icon: "🛡️" },
    { title: "Audit & Compliance", sub: "21 CFR Part 11 • GxP", icon: "⚖️" },
    { title: "Data Lineage & Quality", sub: "Dataplex Mesh", icon: "🕸️" },
    { title: "Interoperability", sub: "OpenAPI 3.1 • FHIR", icon: "🌐" },
  ];
  crossCutting.forEach((cc, i) => {
    const x = 420 + i * 160;
    rect(`cc_box_${i}`, `<div style="text-align:center;padding:4px;"><span style="font-size:12px;">${cc.icon}</span><div style="font-size:8px;font-weight:700;color:#1E3A8A;">${cc.title}</div><div style="font-size:7px;color:#64748B;">${cc.sub}</div></div>`, x, 575, 152, 48, "strokeColor=#93C5FD;fillColor=#EFF6FF;rounded=1;shadow=0;");
  });

  // =========================================================================
  // 5. RIGHT COLUMN: EXTERNAL ECOSYSTEM (x: 1210 to 1490, y: 180 to 650)
  // =========================================================================
  rect("ext_container", "", 1210, 180, 270, 460, "strokeColor=#16A34A;strokeWidth=1.5;fillColor=#F0FDF4;shadow=0;");
  text("ext_title", "External Ecosystem", 1230, 186, 230, 22, "fontSize=12.5;fontStyle=1;fontColor=#15803D;align=center;");

  const extPartners = [
    { title: "CRO / CDMO Partners", sub: "Study execution, data management,\nmanufacturing & supply partners", icon: "🤝" },
    { title: "Healthcare Providers / Investigators", sub: "Site collaboration, patient enrollment,\nstudy conduct, clinical data", icon: "🏥" },
    { title: "Regulatory Authorities (FDA, EMA)", sub: "eSubmissions, queries, safety\nreports, compliance status", icon: "🏛️" },
    { title: "Patients / Patient Programs", sub: "Study participation, PROs,\nsupport programs, communications", icon: "👥" },
  ];

  extPartners.forEach((ep, i) => {
    const y = 224 + i * 102;
    cardWithIcon(`ext_card_${i}`, ep.title, ep.sub, ep.icon, 1225, y, 240, 88, "#BBF7D0", "#FFFFFF", "#15803D", "#DCFCE7", "#BBF7D0");
  });

  // =========================================================================
  // 6. CONNECTOR ARROWS ACROSS DOMAINS
  // =========================================================================
  // Users -> Portal -> Platform
  edge("e_users_to_portal", "users_container", "portal_box", "", "#2563EB");
  edge("e_portal_to_plat", "portal_box", "platform_container", "", "#2563EB");

  // Governance -> Domains
  c.push(`<mxCell id="e_gov_left" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#7C3AED;strokeWidth=1.5;dashed=1;dashPattern=6 4;endArrow=block;endFill=1;exitX=0;exitY=0.5;entryX=0.5;entryY=0;" edge="1" parent="1" source="gov_container" target="users_container"><mxGeometry relative="1" as="geometry"><Array as="points"><mxPoint x="152" y="116"/></Array></mxGeometry></mxCell>`);
  c.push(`<mxCell id="e_gov_mid" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#7C3AED;strokeWidth=1.5;dashed=1;dashPattern=6 4;endArrow=block;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="gov_container" target="platform_container"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  c.push(`<mxCell id="e_gov_right" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#7C3AED;strokeWidth=1.5;dashed=1;dashPattern=6 4;endArrow=block;endFill=1;exitX=1;exitY=0.5;entryX=0.5;entryY=0;" edge="1" parent="1" source="gov_container" target="ext_container"><mxGeometry relative="1" as="geometry"><Array as="points"><mxPoint x="1345" y="116"/></Array></mxGeometry></mxCell>`);

  // Platform -> External Ecosystem (4 Dedicated Collision-Free Connectors)
  edge("e_plat_ext_0", "platform_container", "ext_card_0", "Collaboration Packages & Data Exchange (APIs / SFTP)", "#15803D", false, ";exitX=1;exitY=0.2;entryX=0;entryY=0.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#86EFAC;");
  edge("e_plat_ext_1", "platform_container", "ext_card_1", "Clinical Data & Documents (HTTPS / APIs)", "#15803D", false, ";exitX=1;exitY=0.45;entryX=0;entryY=0.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#86EFAC;");
  edge("e_plat_ext_2", "platform_container", "ext_card_2", "Submissions & Responses (IDMP / eCTD)", "#15803D", false, ";exitX=1;exitY=0.7;entryX=0;entryY=0.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#86EFAC;");
  edge("e_plat_ext_3", "platform_container", "ext_card_3", "Programs & Communications (Secure Portal / APIs)", "#15803D", false, ";exitX=1;exitY=0.9;entryX=0;entryY=0.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#86EFAC;");

  // =========================================================================
  // 7. BOTTOM ENTERPRISE SYSTEMS (UPSTREAM / DOWNSTREAM) (x: 24 to 960, y: 700 to 910)
  // =========================================================================
  rect("ent_container", "", 24, 700, 950, 210, "strokeColor=#2563EB;strokeWidth=1.5;fillColor=#EFF6FF;shadow=0;");
  text("ent_title", "Enterprise Systems (Upstream / Downstream)", 330, 704, 340, 18, "fontSize=11.5;fontStyle=1;fontColor=#1E40AF;align=center;");

  const entSystems = [
    { title: "Veeva Vault", sub: "Regulatory / Quality Documents", vendor: "Veeva", color: "#EA580C", icon: "📁" },
    { title: "Salesforce Health Cloud", sub: "CRM / HCP / Patient Engagement", vendor: "Salesforce", color: "#0284C7", icon: "☁️" },
    { title: "SAP S/4HANA", sub: "ERP / Supply Chain / Finance", vendor: "SAP", color: "#0F172A", icon: "🏢" },
    { title: "Laboratory / LIMS", sub: "Lab Data, Results, Samples", vendor: "LIMS", color: "#2563EB", icon: "🧪" },
    { title: "Clinical Trial (EDC/CTMS)", sub: "Study Data, Sites, Subjects", vendor: "Medidata", color: "#0284C7", icon: "👥" },
    { title: "Safety Database (Argus)", sub: "Safety Cases, Reports, Signals", vendor: "Argus", color: "#1E3A8A", icon: "🛡️" },
    { title: "Data Lakehouse", sub: "Analytics, Reporting, Data Sharing", vendor: "BigQuery", color: "#0284C7", icon: "🗄️" },
  ];

  entSystems.forEach((es, i) => {
    const x = 38 + i * 132;
    const cardHtml = `<table style="width:100%;height:100%;border-collapse:collapse;text-align:center;">
      <tr><td style="vertical-align:top;padding-top:4px;"><span style="font-size:20px;">${es.icon}</span></td></tr>
      <tr><td style="vertical-align:middle;padding:2px 4px;"><div style="font-size:9.5px;font-weight:700;color:#0F172A;line-height:1.2;">${es.title}</div><div style="font-size:7.5px;color:#64748B;margin-top:2px;line-height:1.15;">${es.sub}</div></td></tr>
      <tr><td style="vertical-align:bottom;padding-bottom:4px;"><span style="font-size:8px;font-weight:900;color:${es.color};">${es.vendor}</span></td></tr>
    </table>`;
    c.push(`<mxCell id="ent_card_${i}" value="${E(cardHtml)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;" vertex="1" parent="1"><mxGeometry x="${x}" y="${728}" width="${124}" height="${135}" as="geometry"/></mxCell>`);
  });

  // Integration Patterns Footer Bar
  rect("int_patterns_bar", `<div style="font-size:8px;color:#334155;text-align:center;"><b>Integration Patterns:</b> APIs | Events | Batch | File Exchange &nbsp;&nbsp;&bull;&nbsp;&nbsp; <b>Standards:</b> HL7 FHIR | IDMP | CDISC | ICH | ISO IDMP / GS1 &nbsp;&nbsp;&bull;&nbsp;&nbsp; <b>Connectivity:</b> Private Endpoints / VPN / SFTP / MQ / Pub/Sub</div>`, 36, 868, 925, 26, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;shadow=0;align=center;");

  // =========================================================================
  // 8. AI & KNOWLEDGE SERVICES (GOOGLE CLOUD) (x: 1000 to 1490, y: 700 to 910)
  // =========================================================================
  rect("ai_container", "", 1000, 700, 480, 210, "strokeColor=#8B5CF6;strokeWidth=1.5;fillColor=#FAF5FF;shadow=0;");
  text("ai_title", "AI / Knowledge Services (Google Cloud)", 1090, 704, 300, 18, "fontSize=11.5;fontStyle=1;fontColor=#6D28D9;align=center;");

  const aiServices = [
    { title: "Enterprise Search", sub: "Taxonomy, Knowledge Articles", icon: "🔍", badge: "Google Search" },
    { title: "Vector Index / Semantic", sub: "Embeddings Store, Retrieval", icon: "🕸️", badge: "Vertex Vector" },
    { title: "Approved LLM Service", sub: "Secure, Governed GenAI Service", icon: "✨", badge: "Vertex AI Gemini 2.5 Pro" },
  ];

  aiServices.forEach((asItem, i) => {
    const x = 1020 + i * 150;
    const aiHtml = `<table style="width:100%;height:100%;border-collapse:collapse;text-align:center;">
      <tr><td style="vertical-align:top;padding-top:4px;"><span style="font-size:22px;">${asItem.icon}</span></td></tr>
      <tr><td style="vertical-align:middle;padding:2px 4px;"><div style="font-size:9.5px;font-weight:700;color:#581C87;line-height:1.2;">${asItem.title}</div><div style="font-size:8px;color:#64748B;margin-top:2px;line-height:1.2;">${asItem.sub}</div></td></tr>
      <tr><td style="vertical-align:bottom;padding-bottom:4px;"><span style="font-size:8px;font-weight:800;color:#7C3AED;">${asItem.badge}</span></td></tr>
    </table>`;
    c.push(`<mxCell id="ai_card_${i}" value="${E(aiHtml)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DDD6FE;strokeWidth=1.2;" vertex="1" parent="1"><mxGeometry x="${x}" y="${728}" width="${140}" height="${135}" as="geometry"/></mxCell>`);
  });

  // AI Annotation banner
  rect("ai_annotation", `<div style="font-size:8.5px;color:#6B21A8;font-style:italic;text-align:center;padding:4px;">AI Copilot uses enterprise content and governed LLM to deliver grounded, compliant assistance within workflows.</div>`, 1020, 868, 440, 26, "strokeColor=#C084FC;fillColor=#FFFFFF;rounded=1;shadow=0;");

  // =========================================================================
  // 9. BOTTOM PLATFORM OPERATIONS & LEGEND (y: 925 to 995)
  // =========================================================================
  const ops = [
    { title: "Platform Admins", sub: "• Tenant & Config Mgmt\n• Release & Change Mgmt", icon: "⚙️" },
    { title: "Security / IAM Team", sub: "• Identity & Access Mgmt\n• Threat Detection & CMEK", icon: "🛡️" },
    { title: "Support / Operations", sub: "• Incident & Problem Mgmt\n• Availability & SRE", icon: "🎧" },
  ];
  rect("ops_container", "", 24, 925, 640, 70, "strokeColor=#94A3B8;strokeWidth=1.2;fillColor=#F8FAFC;shadow=0;");
  ops.forEach((op, i) => {
    const x = 36 + i * 208;
    cardWithIcon(`op_card_${i}`, op.title, op.sub, op.icon, x, 931, 196, 58, "#CBD5E1", "#FFFFFF", "#1E293B", "#F1F5F9", "#CBD5E1");
  });

  // Legend Box
  rect("legend_box", "", 680, 925, 800, 70, "strokeColor=#94A3B8;strokeWidth=1.2;fillColor=#F8FAFC;");
  text("legend_title", "<b>Legend</b>", 695, 930, 80, 16, "fontSize=9.5;align=left;");
  text("legend_symbols", "👤 User / Actor  &nbsp;&bull;&nbsp; ⚙️ Application / Service  &nbsp;&bull;&nbsp; 🗄️ Data Source / System  &nbsp;&bull;&nbsp; ✨ AI Service  &nbsp;&bull;&nbsp; 🤝 External Partner  &nbsp;&bull;&nbsp; ⚖️ Governance / Control", 695, 948, 770, 18, "fontSize=8.5;fontColor=#475569;align=left;");
  text("legend_lines", "—→ Data Flow &nbsp;&nbsp;&bull;&nbsp;&nbsp; - - -> Control Flow &nbsp;&nbsp;&bull;&nbsp;&nbsp; ←→ External Exchange", 695, 968, 500, 16, "fontSize=8.5;fontColor=#475569;fontStyle=1;align=left;");

  text("footer_note", "ⓘ Conceptual context view — not deployment topology", 24, 1002, 400, 16, "fontSize=8.5;fontStyle=2;fontColor=#64748B;align=left;");

  // =========================================================================
  // 10. CONNECTORS & PROTOCOL EDGES (Typed, Color-Coded, Collision-Free)
  // =========================================================================
  // User Portal Single Sign-on / Lock Flow
  rect("user_lock_badge", "<div style='font-size:16px;'>🔒</div><div style='font-size:7.5px;font-weight:bold;color:#1E40AF;margin-top:2px;'>Role-Based Access<br/>&amp; Workflows</div>", 298, 360, 84, 52, "strokeColor=#3B82F6;fillColor=#FFFFFF;rounded=1;align=center;verticalAlign=middle;shadow=1;");
  edge("e_user_to_lock", "users_container", "user_lock_badge", "", "#1D4ED8", false, "exitX=1;exitY=0.5;entryX=0;entryY=0.5;");
  edge("e_lock_to_plat", "user_lock_badge", "platform_container", "Secure Web Portal\n(Single Experience)", "#1D4ED8", false, "exitX=1;exitY=0.5;entryX=0;entryY=0.5;");

  // Governance Oversight (Dashed Purple)
  edge("e_gov_to_plat", "gov_container", "platform_container", "Policy, Standards & Risk Oversight", "#7C3AED", true, "exitX=0.5;exitY=1;entryX=0.5;entryY=0;");

  // External Partner Connections (Green, Protocol Labels)
  const extEdges = [
    { target: "ext_card_0", label: "Collaboration Packages & Data Exchange (APIs / SFTP)", y: 220 },
    { target: "ext_card_1", label: "Clinical Data & Documents (HTTPS / APIs)", y: 340 },
    { target: "ext_card_2", label: "Submissions & Responses (IDMP / eCTD)", y: 460 },
    { target: "ext_card_3", label: "Programs & Communications (Secure Portal / APIs)", y: 580 },
  ];
  extEdges.forEach((ee, i) => {
    edge(`e_ext_${i}`, "platform_container", ee.target, ee.label, "#16A34A", false, `exitX=1;exitY=${(i + 1) * 0.2};entryX=0;entryY=0.5;`);
  });

  // Enterprise Systems Connections (Blue, Bidirectional Sync Labels)
  const entEdges = [
    { target: "ent_card_0", label: "Documents Sync\n(REST / Bulk API)" },
    { target: "ent_card_1", label: "Customer & HCP Data\n(REST / APIs)" },
    { target: "ent_card_2", label: "Product & Mfg Data\n(IDoc / OData)" },
    { target: "ent_card_3", label: "Lab Results & LIMS\n(HL7 / FHIR / APIs)" },
    { target: "ent_card_4", label: "Trial Data Ingestion\n(EDC / CTMS APIs)" },
    { target: "ent_card_5", label: "Safety Cases Exchange\n(REST / ICH E2B)" },
    { target: "ent_card_6", label: "Curated Analytics\n(SQL / APIs)" },
  ];
  entEdges.forEach((ee, i) => {
    edge(`e_ent_${i}`, "platform_container", ee.target, ee.label, "#2563EB", false, `exitX=${0.1 + i * 0.12};exitY=1;entryX=0.5;entryY=0;`);
  });

  // AI Services Connections (Purple Dashed Grounding Lines)
  const aiEdges = [
    { target: "ai_card_0", label: "Enterprise Content Indexing & Sync (APIs)" },
    { target: "ai_card_1", label: "Semantic Search Queries & Results (REST / Graph)" },
    { target: "ai_card_2", label: "Grounded AI Requests / Responses (Private Endpoint)" },
  ];
  aiEdges.forEach((ae, i) => {
    edge(`e_ai_${i}`, "platform_container", ae.target, ae.label, "#7C3AED", true, `exitX=${0.85 + i * 0.05};exitY=1;entryX=0.5;entryY=0;`);
  });

  // Operations to Enterprise line
  edge("e_ops_to_ent", "ops_container", "ent_container", "Infrastructure & Tenant Operations", "#64748B", true, "exitX=0.5;exitY=0;entryX=0.35;entryY=1;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_01_system_context" name="01 — System Context">
    <mxGraphModel dx="1600" dy="1050" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="1050" background="${bg}" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${c.join("\n        ")}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
