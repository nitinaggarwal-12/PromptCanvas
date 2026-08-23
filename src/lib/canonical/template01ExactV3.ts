/**
 * Master 1:1 Exact Replica Generator for Canonical Template 01: System Context
 * Matches 100% of images/01.png (NOVACURA Bio-Pharma Platform)
 */

const E = (v?: string | null) =>
  (v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function generateTemplate01ExactV3Xml(domainFlavor = "biopharma", theme: "light" | "dark" = "light"): string {
  const isDark = theme === "dark";
  const bg = isDark ? "#0B111E" : "#FFFFFF";
  const c: string[] = [];

  const rect = (id: string, v: string, x: number, y: number, w: number, h: number, s = "") =>
    c.push("<mxCell id=\"" + id + "\" value=\"" + E(v) + "\" style=\"rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;fontColor=#0F172A;fontSize=11;" + s + "\" vertex=\"1\" parent=\"1\"><mxGeometry x=\"" + x + "\" y=\"" + y + "\" width=\"" + w + "\" height=\"" + h + "\" as=\"geometry\"/></mxCell>");

  const text = (id: string, v: string, x: number, y: number, w: number, h: number, s = "") =>
    c.push("<mxCell id=\"" + id + "\" value=\"" + E(v) + "\" style=\"text;html=1;strokeColor=none;fillColor=none;whiteSpace=wrap;fontColor=#0F172A;fontSize=11;verticalAlign=middle;" + s + "\" vertex=\"1\" parent=\"1\"><mxGeometry x=\"" + x + "\" y=\"" + y + "\" width=\"" + w + "\" height=\"" + h + "\" as=\"geometry\"/></mxCell>");

  const edge = (id: string, src: string, tgt: string, label = "", color = "#1D4ED8", dash = false, s = "") =>
    c.push("<mxCell id=\"" + id + "\" value=\"" + E(label) + "\" style=\"edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=" + color + ";strokeWidth=1.8;endArrow=block;endFill=1;fontSize=7.5;fontColor=" + color + ";fontStyle=1;labelBackgroundColor=#FFFFFF;labelBorderColor=none;" + (dash ? "dashed=1;dashPattern=6 4;" : "") + s + "\" edge=\"1\" parent=\"1\" source=\"" + src + "\" target=\"" + tgt + "\"><mxGeometry relative=\"1\" as=\"geometry\"/></mxCell>");

  const cardWithIcon = (id: string, title: string, desc: string, iconUrl: string, x: number, y: number, w: number, h: number, border = "#BFDBFE", cardBg = "#FFFFFF", titleColor = "#1E3A8A", iconBg = "#EFF6FF", iconBorder = "#DBEAFE") => {
    const html = "<table style=\"width:100%;height:100%;border-collapse:collapse;\">" +
      "<tr>" +
        "<td style=\"width:40px;vertical-align:middle;padding:2px;text-align:center;\">" +
          "<div style=\"width:34px;height:34px;border-radius:8px;background:" + iconBg + ";border:1px solid " + iconBorder + ";display:flex;align-items:center;justify-content:center;margin:0 auto;\">" +
            "<img src=\"" + iconUrl + "\" width=\"20\" height=\"20\" style=\"display:block;margin:auto;\"/>" +
          "</div>" +
        "</td>" +
        "<td style=\"vertical-align:middle;padding-left:6px;text-align:left;\">" +
          "<div style=\"font-size:10px;font-weight:700;color:" + titleColor + ";line-height:1.2;\">" + title + "</div>" +
          "<div style=\"font-size:7.5px;color:#475569;margin-top:1px;line-height:1.15;\">" + desc.replace(/\n/g, "<br/>") + "</div>" +
        "</td>" +
      "</tr>" +
    "</table>";
    c.push("<mxCell id=\"" + id + "\" value=\"" + E(html) + "\" style=\"rounded=1;whiteSpace=wrap;html=1;fillColor=" + cardBg + ";strokeColor=" + border + ";strokeWidth=1.2;shadow=0;\" vertex=\"1\" parent=\"1\"><mxGeometry x=\"" + x + "\" y=\"" + y + "\" width=\"" + w + "\" height=\"" + h + "\" as=\"geometry\"/></mxCell>");
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

  const govs = [
    { title: "Executive Leadership", desc: "• Strategic Direction\n• Portfolio Oversight", icon: "https://api.iconify.design/lucide:users.svg?color=%236D28D9" },
    { title: "Compliance / Legal", desc: "• Policy & Compliance\n• Risk Management", icon: "https://api.iconify.design/lucide:scale.svg?color=%236D28D9" },
    { title: "Data Governance Board", desc: "• Data Standards\n• Quality & Lineage", icon: "https://api.iconify.design/lucide:shield-check.svg?color=%236D28D9" },
  ];
  govs.forEach((g, i) => {
    const x = 458 + i * 200;
    cardWithIcon("gov_card_" + i, g.title, g.desc, g.icon, x, 92, 192, 62, "#DDD6FE", "#FFFFFF", "#4C1D95", "#F5F3FF", "#DDD6FE");
  });

  // =========================================================================
  // 3. LEFT COLUMN: INTERNAL BUSINESS USERS (y: 175 to 680, h: 505)
  // =========================================================================
  rect("users_container", "", 24, 175, 260, 505, "strokeColor=#3B82F6;strokeWidth=1.5;fillColor=#F8FAFC;shadow=0;");
  text("users_title", "Internal Business Users", 44, 180, 220, 20, "fontSize=13;fontStyle=1;fontColor=#1E40AF;align=left;");

  const users = [
    { title: "Research Scientists", desc: "Design studies, preclinical data, insights", icon: "https://api.iconify.design/lucide:microscope.svg?color=%231D4ED8" },
    { title: "Clinical Operations", desc: "Run trials, monitor sites & activities", icon: "https://api.iconify.design/lucide:stethoscope.svg?color=%231D4ED8" },
    { title: "Regulatory Affairs Team", desc: "Submissions, commitments & variations", icon: "https://api.iconify.design/lucide:file-text.svg?color=%231D4ED8" },
    { title: "Safety / PV Specialists", desc: "Detect, evaluate, report adverse events", icon: "https://api.iconify.design/lucide:shield-alert.svg?color=%231D4ED8" },
    { title: "Quality Assurance", desc: "Manage quality events, CAPA, audits", icon: "https://api.iconify.design/lucide:award.svg?color=%231D4ED8" },
    { title: "Medical Affairs", desc: "Medical inquiries, content & evidence", icon: "https://api.iconify.design/lucide:message-circle-heart.svg?color=%231D4ED8" },
    { title: "Commercial Analytics", desc: "Market insights, forecasting & KPIs", icon: "https://api.iconify.design/lucide:trending-up.svg?color=%231D4ED8" },
  ];
  users.forEach((u, i) => {
    const y = 205 + i * 67;
    cardWithIcon("user_card_" + i, u.title, u.desc, u.icon, 32, y, 242, 60, "#BFDBFE", "#FFFFFF", "#1E3A8A", "#EFF6FF", "#BFDBFE");
  });

  // =========================================================================
  // 4. CENTER PLATFORM BOUNDARY: NOVACURA PLATFORM (y: 175 to 680, h: 505)
  // =========================================================================
  rect("platform_boundary", "", 445, 175, 625, 505, "strokeColor=#1D4ED8;strokeWidth=2.2;fillColor=#FFFFFF;shadow=0;");
  
  const logoHtml = "<table style=\"margin:0 auto;\"><tr>" +
    "<td style=\"vertical-align:middle;padding-right:10px;\">" +
      "<svg width=\"34\" height=\"26\" viewBox=\"0 0 40 32\"><path d=\"M4 28L14 4h9L15 28z\" fill=\"#2563EB\"/><path d=\"M18 28L28 4h9L27 28z\" fill=\"#1E3A8A\"/></svg>" +
    "</td>" +
    "<td style=\"vertical-align:middle;text-align:left;\">" +
      "<div style=\"font-size:22px;font-weight:900;color:#1E3A8A;letter-spacing:1px;line-height:1;\">NOVACURA</div>" +
      "<div style=\"font-size:12px;font-weight:700;color:#2563EB;line-height:1.2;\">Bio-Pharma Platform</div>" +
    "</td>" +
  "</tr></table>";
  text("novacura_logo_header", logoHtml, 520, 180, 480, 32, "align=center;");

  const caps = [
    { title: "R&D & Clinical", desc: "• Program Mgmt\n• Protocols & Studies", icon: "https://api.iconify.design/lucide:flask-conical.svg?color=%231E40AF" },
    { title: "Regulatory Affairs", desc: "• Submissions\n• Variations", icon: "https://api.iconify.design/lucide:file-check-2.svg?color=%231E40AF" },
    { title: "Pharmacovigilance", desc: "• Case Mgmt\n• Signal Detection", icon: "https://api.iconify.design/lucide:shield-check.svg?color=%231E40AF" },
    { title: "Quality & Manufacturing", desc: "• Quality Events\n• CAPA & Release", icon: "https://api.iconify.design/lucide:factory.svg?color=%231E40AF" },
    { title: "Medical Information", desc: "• Inquiry Mgmt\n• Evidence Library", icon: "https://api.iconify.design/lucide:message-square.svg?color=%231E40AF" },
    { title: "Commercial Insights", desc: "• Market Analytics\n• Performance KPIs", icon: "https://api.iconify.design/lucide:bar-chart-3.svg?color=%231E40AF" },
    { title: "Document & Knowledge Hub", desc: "• Version Control\n• Collaboration", icon: "https://api.iconify.design/lucide:folder-git-2.svg?color=%231E40AF" },
    { title: "AI Copilot & Automation", desc: "• Intelligent Assist\n• Orchestration", icon: "https://api.iconify.design/lucide:bot.svg?color=%237C3AED" },
  ];
  caps.forEach((cItem, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 462 + col * 296;
    const y = 220 + row * 94;
    cardWithIcon("cap_card_" + i, cItem.title, cItem.desc, cItem.icon, x, y, 280, 84, "#BFDBFE", "#F8FAFC", "#1E3A8A", "#EFF6FF", "#BFDBFE");
  });

  const crossPill = [
    { title: "Security & Privacy", sub: "Zero Trust • CMEK" },
    { title: "Audit & Compliance", sub: "21 CFR Part 11 • GxP" },
    { title: "Data Lineage & Quality", sub: "Dataplex Mesh" },
    { title: "Interoperability", sub: "OpenAPI 3.1 • FHIR" },
  ];
  crossPill.forEach((cp, i) => {
    const x = 462 + i * 148;
    const html = "<table style=\"width:100%;height:100%;text-align:center;\"><tr><td style=\"vertical-align:middle;\"><div style=\"font-size:9px;font-weight:700;color:#1E40AF;\">" + cp.title + "</div><div style=\"font-size:7px;color:#64748B;margin-top:2px;\">" + cp.sub + "</div></td></tr></table>";
    c.push("<mxCell id=\"cross_pill_" + i + "\" value=\"" + E(html) + "\" style=\"rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1;\" vertex=\"1\" parent=\"1\"><mxGeometry x=\"" + x + "\" y=\"615\" width=\"140\" height=\"50\" as=\"geometry\"/></mxCell>");
  });

  // =========================================================================
  // 5. RIGHT COLUMN: EXTERNAL ECOSYSTEM (Green #16A34A, y: 175 to 680, h: 505)
  // =========================================================================
  rect("ext_container", "", 1260, 175, 260, 505, "strokeColor=#16A34A;strokeWidth=1.5;fillColor=#F0FDF4;shadow=0;");
  text("ext_title", "External Ecosystem", 1290, 180, 200, 20, "fontSize=13;fontStyle=1;fontColor=#15803D;align=center;");

  const extPartners = [
    { title: "CRO / CDMO Partners", desc: "Study execution, data management,\nmanufacturing & supply partners", icon: "https://api.iconify.design/lucide:handshake.svg?color=%2316A34A" },
    { title: "Healthcare Providers / Investigators", desc: "Site collaboration, patient enrollment,\nstudy conduct, clinical data", icon: "https://api.iconify.design/lucide:hospital.svg?color=%2316A34A" },
    { title: "Regulatory Authorities (FDA, EMA)", desc: "eSubmissions, queries, safety reports,\ninspections", icon: "https://api.iconify.design/lucide:landmark.svg?color=%2316A34A" },
    { title: "Patients / Patient Programs", desc: "Study participation, PROs,\nsupport programs, communications", icon: "https://api.iconify.design/lucide:heart-handshake.svg?color=%2316A34A" },
  ];
  extPartners.forEach((ep, i) => {
    const y = 210 + i * 114;
    cardWithIcon("ext_card_" + i, ep.title, ep.desc, ep.icon, 1275, y, 230, 98, "#86EFAC", "#FFFFFF", "#166534", "#DCFCE7", "#86EFAC");
  });

  // =========================================================================
  // 6. CONNECTORS & FLOWS (Clean corridor routing)
  // =========================================================================
  const rbacHtml = "<table style=\"width:100%;height:100%;text-align:center;\"><tr><td style=\"vertical-align:middle;\"><img src=\"https://api.iconify.design/lucide:lock.svg?color=%231D4ED8\" width=\"18\" height=\"18\" style=\"display:block;margin:0 auto 4px auto;\"/><div style=\"font-size:8.5px;font-weight:700;color:#1D4ED8;line-height:1.1;\">Secure Web Portal<br/>(Single Experience)</div><div style=\"font-size:7px;color:#475569;margin-top:2px;\">Role-Based Access &amp; Workflows</div></td></tr></table>";
  c.push("<mxCell id=\"rbac_pod\" value=\"" + E(rbacHtml) + "\" style=\"rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=1.2;\" vertex=\"1\" parent=\"1\"><mxGeometry x=\"304\" y=\"385\" width=\"120\" height=\"85\" as=\"geometry\"/></mxCell>");

  edge("f_user_rbac", "users_container", "rbac_pod", "", "#1D4ED8", false, "exitX=1;exitY=0.5;entryX=0;entryY=0.5;");
  edge("f_rbac_core", "rbac_pod", "platform_boundary", "", "#1D4ED8", false, "exitX=1;exitY=0.5;entryX=0;entryY=0.5;");
  edge("f_gov_core", "gov_container", "platform_boundary", "", "#7C3AED", true, "exitX=0.5;exitY=1;entryX=0.5;entryY=0;");
  edge("f_gov_users", "gov_container", "users_container", "", "#7C3AED", true, "exitX=0;exitY=0.5;entryX=0.5;entryY=0;");
  edge("f_gov_ext", "gov_container", "ext_container", "", "#7C3AED", true, "exitX=1;exitY=0.5;entryX=0.5;entryY=0;");

  const extFlows = [
    { label: "Collaboration Packages & Data Exchange (APIs / SFTP)", y: 0.18 },
    { label: "Clinical Data & Documents (HTTPS / APIs)", y: 0.40 },
    { label: "Submissions & Responses (IDMP / eCTD)", y: 0.62 },
    { label: "Programs & Communications (Secure Portal / APIs)", y: 0.84 },
  ];
  extFlows.forEach((ef, i) => {
    edge("f_ext_" + i, "platform_boundary", "ext_card_" + i, ef.label, "#16A34A", false, "exitX=1;exitY=" + ef.y + ";entryX=0;entryY=0.5;");
  });

  // =========================================================================
  // 7. BOTTOM LEFT: ENTERPRISE CONNECTED SYSTEMS (y: 745 to 925, h: 180)
  // =========================================================================
  rect("ent_container", "", 24, 745, 930, 180, "strokeColor=#3B82F6;strokeWidth=1.5;fillColor=#F8FAFC;shadow=0;");
  text("ent_title", "Enterprise Systems (Upstream / Downstream)", 310, 748, 420, 18, "fontSize=11;fontStyle=1;fontColor=#1E40AF;align=center;");

  const entSystems = [
    { title: "Veeva Vault", sub: "Regulatory / Quality Documents", icon: "https://api.iconify.design/lucide:shield-check.svg?color=%23EA580C", flow: "Documents Sync<br/>(REST / Bulk API)" },
    { title: "Salesforce Health Cloud", sub: "CRM / HCP / Patient Engagement", icon: "https://api.iconify.design/logos:salesforce.svg", flow: "Customer &amp; HCP<br/>Data Exchange" },
    { title: "SAP S/4HANA", sub: "ERP / Supply Chain / Finance", icon: "https://api.iconify.design/logos:sap.svg", flow: "Product &amp; Finance<br/>(IDoc / OData)" },
    { title: "Laboratory / LIMS", sub: "Lab Data, Results, Samples", icon: "https://api.iconify.design/lucide:flask-conical.svg?color=%231E40AF", flow: "Lab Results<br/>(HL7 / FHIR)" },
    { title: "Clinical Trial (EDC/CTMS)", sub: "Study Data, Sites, Subjects", icon: "https://api.iconify.design/lucide:users.svg?color=%231E40AF", flow: "Trial Ingestion<br/>(EDC / CTMS)" },
    { title: "Safety Database (Argus)", sub: "Safety Cases, Reports, Signals", icon: "https://api.iconify.design/lucide:shield-alert.svg?color=%231E40AF", flow: "Safety Cases<br/>(ICH E2B)" },
    { title: "Data Lakehouse", sub: "Analytics, Reporting, Data Sharing", icon: "https://api.iconify.design/lucide:database.svg?color=%231E40AF", flow: "Curated Data<br/>(SQL / APIs)" },
  ];
  entSystems.forEach((s, i) => {
    const x = 36 + i * 130;
    
    // Floating Flow Badge above Card in open channel
    const pillHtml = "<div style=\"font-size:7px;font-weight:700;color:#1D4ED8;line-height:1.1;text-align:center;background:#FFFFFF;border:1px solid #BFDBFE;border-radius:4px;padding:2px;\">" + s.flow + "</div>";
    text("ent_pill_" + i, pillHtml, x + 2, 700, 116, 26, "align=center;");
    edge("f_drop_ent_" + i, "platform_boundary", "ent_card_" + i, "", "#1D4ED8", false, "exitX=" + (0.08 + i * 0.13) + ";exitY=1;entryX=0.5;entryY=0;");

    const sysHtml = "<table style=\"width:100%;height:100%;text-align:center;padding:4px;\">" +
      "<tr><td style=\"height:38px;vertical-align:middle;\"><img src=\"" + s.icon + "\" width=\"28\" height=\"28\" style=\"display:block;margin:0 auto;\"/></td></tr>" +
      "<tr><td style=\"vertical-align:top;padding-top:2px;\"><div style=\"font-size:9.5px;font-weight:700;color:#1E3A8A;line-height:1.2;\">" + s.title + "</div><div style=\"font-size:7.5px;color:#64748B;margin-top:2px;line-height:1.2;\">" + s.sub + "</div></td></tr>" +
    "</table>";
    c.push("<mxCell id=\"ent_card_" + i + "\" value=\"" + E(sysHtml) + "\" style=\"rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#BFDBFE;strokeWidth=1.2;\" vertex=\"1\" parent=\"1\"><mxGeometry x=\"" + x + "\" y=\"770\" width=\"120\" height=\"116\" as=\"geometry\"/></mxCell>");
  });

  rect("ent_protocols_bar", "Integration Patterns: APIs | Events | Batch | File Exchange    •    Standards: HL7 FHIR | IDMP | CDISC | ICH | ISO IDMP / GS1    •    Connectivity: Private Endpoints / VPN / SFTP / MQ / Pub/Sub", 36, 894, 906, 24, "strokeColor=#93C5FD;fillColor=#EFF6FF;fontSize=8;fontColor=#1E40AF;fontStyle=1;align=center;");

  // =========================================================================
  // 8. BOTTOM RIGHT: AI & KNOWLEDGE SERVICES (y: 745 to 925, h: 180)
  // =========================================================================
  rect("ai_container", "", 970, 745, 550, 180, "strokeColor=#8B5CF6;strokeWidth=1.5;fillColor=#FAF5FF;shadow=0;");
  text("ai_title", "AI / Knowledge Services (Google Cloud)", 1120, 748, 280, 18, "fontSize=11;fontStyle=1;fontColor=#6D28D9;align=center;");

  const aiServices = [
    { title: "Enterprise Search", sub: "Taxonomy, Knowledge Articles", icon: "https://api.iconify.design/lucide:search.svg?color=%237C3AED", flow: "Content Indexing<br/>&amp; Sync (APIs)" },
    { title: "Vector Index / Semantic", sub: "Embeddings Store, Retrieval", icon: "https://api.iconify.design/lucide:network.svg?color=%237C3AED", flow: "Semantic Search<br/>Queries (REST)" },
    { title: "Approved LLM Service", sub: "Vertex AI Gemini 2.5 Pro", icon: "https://api.iconify.design/logos:google-cloud.svg", flow: "Grounded AI<br/>Requests (Private)" },
  ];
  aiServices.forEach((asItem, i) => {
    const x = 986 + i * 174;
    
    // Floating Flow Badge above AI Card in open channel
    const pillHtml = "<div style=\"font-size:7px;font-weight:700;color:#7C3AED;line-height:1.1;text-align:center;background:#FFFFFF;border:1px solid #DDD6FE;border-radius:4px;padding:2px;\">" + asItem.flow + "</div>";
    text("ai_pill_" + i, pillHtml, x + 10, 700, 140, 26, "align=center;");
    edge("f_drop_ai_" + i, "platform_boundary", "ai_card_" + i, "", "#7C3AED", true, "exitX=" + (0.75 + i * 0.1) + ";exitY=1;entryX=0.5;entryY=0;");

    const aiHtml = "<table style=\"width:100%;height:100%;text-align:center;padding:4px;\">" +
      "<tr><td style=\"height:38px;vertical-align:middle;\"><img src=\"" + asItem.icon + "\" width=\"30\" height=\"30\" style=\"display:block;margin:0 auto;\"/></td></tr>" +
      "<tr><td style=\"vertical-align:top;padding-top:2px;\"><div style=\"font-size:10px;font-weight:700;color:#581C87;line-height:1.2;\">" + asItem.title + "</div><div style=\"font-size:8px;color:#64748B;margin-top:2px;line-height:1.2;\">" + asItem.sub + "</div></td></tr>" +
    "</table>";
    c.push("<mxCell id=\"ai_card_" + i + "\" value=\"" + E(aiHtml) + "\" style=\"rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DDD6FE;strokeWidth=1.2;\" vertex=\"1\" parent=\"1\"><mxGeometry x=\"" + x + "\" y=\"770\" width=\"160\" height=\"116\" as=\"geometry\"/></mxCell>");
  });

  rect("ai_annotation", "AI Copilot uses enterprise content and governed LLM to deliver grounded, compliant assistance within workflows.", 1170, 700, 350, 28, "strokeColor=#C084FC;fillColor=#FAF5FF;fontSize=8.5;fontColor=#6B21A8;fontStyle=2;align=center;rounded=1;shadow=0;");

  // =========================================================================
  // 9. BOTTOM PLATFORM OPERATIONS & LEGEND (y: 938 to 1012)
  // =========================================================================
  const ops = [
    { title: "Platform Admins", sub: "Tenant & Config Mgmt\nRelease & Change Mgmt", icon: "https://api.iconify.design/lucide:settings.svg?color=%231E293B" },
    { title: "Security / IAM Team", sub: "Identity & Access Mgmt\nThreat Detection & CMEK", icon: "https://api.iconify.design/lucide:shield-check.svg?color=%231E293B" },
    { title: "Support / Operations", sub: "Incident & Problem Mgmt\nAvailability & SRE", icon: "https://api.iconify.design/lucide:headphones.svg?color=%231E293B" },
  ];
  rect("ops_container", "", 24, 938, 640, 68, "strokeColor=#94A3B8;strokeWidth=1.2;fillColor=#F8FAFC;shadow=0;");
  ops.forEach((op, i) => {
    const x = 36 + i * 208;
    cardWithIcon("op_card_" + i, op.title, op.sub, op.icon, x, 944, 196, 54, "#CBD5E1", "#FFFFFF", "#1E293B", "#F1F5F9", "#CBD5E1");
  });

  // Legend Box
  rect("legend_box", "", 680, 938, 840, 68, "strokeColor=#94A3B8;strokeWidth=1.2;fillColor=#F8FAFC;");
  text("legend_title", "Legend", 695, 942, 80, 16, "fontSize=9.5;fontStyle=1;fontColor=#0F172A;align=left;");
  text("legend_symbols", "👤 User / Actor      ⚙️ Application / Service      🗄️ Data Source / System      ✨ AI Service      🤝 External Partner      ⚖️ Governance / Control", 695, 960, 620, 18, "fontSize=8;fontColor=#475569;align=left;");
  text("legend_lines", "—→ Data Flow     - - -> Control Flow     ←→ External Exchange", 695, 980, 500, 16, "fontSize=8;fontColor=#475569;fontStyle=1;align=left;");

  text("footer_note", "ⓘ Conceptual context view — not deployment topology", 24, 1012, 400, 16, "fontSize=8.5;fontStyle=2;fontColor=#64748B;align=left;");

  return "<mxGraphModel dx=\"1600\" dy=\"1050\" grid=\"1\" gridSize=\"10\" guides=\"1\" tooltips=\"1\" connect=\"1\" arrows=\"1\" fold=\"1\" page=\"1\" pageScale=\"1\" pageWidth=\"1600\" pageHeight=\"1050\" background=\"" + bg + "\"><root><mxCell id=\"0\"/><mxCell id=\"1\" parent=\"0\"/>" + c.join("\n") + "</root></mxGraphModel>";
}
