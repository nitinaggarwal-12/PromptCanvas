/**
 * Master 1:1 Exact Replica Generator for Canonical Template 01: System Context
 * Matches the canonical NOVACURA Bio-Pharma Platform Architecture from Canonical PDF Page 1 / images/01.png
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
    c.push("<mxCell id=\"" + id + "\" value=\"" + E(label) + "\" style=\"edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=" + color + ";strokeWidth=1.8;endArrow=block;endFill=1;fontSize=8.5;fontColor=" + color + ";fontStyle=1;" + (dash ? "dashed=1;dashPattern=6 4;" : "") + s + "\" edge=\"1\" parent=\"1\" source=\"" + src + "\" target=\"" + tgt + "\"><mxGeometry relative=\"1\" as=\"geometry\"/></mxCell>");

  const cardWithIcon = (id: string, title: string, desc: string, iconUrl: string, x: number, y: number, w: number, h: number, border = "#BFDBFE", cardBg = "#FFFFFF", titleColor = "#1E3A8A", iconBg = "#EFF6FF", iconBorder = "#DBEAFE") => {
    const html = "<table style=\"width:100%;height:100%;border-collapse:collapse;\">" +
      "<tr>" +
        "<td style=\"width:44px;vertical-align:middle;padding:4px;text-align:center;\">" +
          "<div style=\"width:36px;height:36px;border-radius:10px;background:" + iconBg + ";border:1px solid " + iconBorder + ";display:flex;align-items:center;justify-content:center;margin:0 auto;\">" +
            "<img src=\"" + iconUrl + "\" width=\"22\" height=\"22\" style=\"display:block;margin:auto;\"/>" +
          "</div>" +
        "</td>" +
        "<td style=\"vertical-align:middle;padding-left:6px;text-align:left;\">" +
          "<div style=\"font-size:10.5px;font-weight:700;color:" + titleColor + ";line-height:1.2;\">" + title + "</div>" +
          "<div style=\"font-size:8px;color:#475569;margin-top:2px;line-height:1.2;\">" + desc.replace(/\n/g, "<br/>") + "</div>" +
        "</td>" +
      "</tr>" +
    "</table>";
    c.push("<mxCell id=\"" + id + "\" value=\"" + E(html) + "\" style=\"rounded=1;whiteSpace=wrap;html=1;fillColor=" + cardBg + ";strokeColor=" + border + ";strokeWidth=1.2;shadow=0;\" vertex=\"1\" parent=\"1\"><mxGeometry x=\"" + x + "\" y=\"" + y + "\" width=\"" + w + "\" height=\"" + h + "\" as=\"geometry\"/></mxCell>");
  };

  // 1. TOP HEADER BANNER
  text("t1", "01 — System Context | NOVACURA Bio-Pharma Platform", 30, 16, 950, 36, "fontSize=26;fontStyle=1;align=left;fontColor=#0F172A;");
  text("t2", "Core Architecture Family | Bio-Pharma Product", 30, 52, 600, 22, "fontSize=14;fontStyle=1;fontColor=#64748B;align=left;");

  // 2. TOP GOVERNANCE & OVERSIGHT POD (Purple #7C3AED)
  rect("gov_container", "", 430, 75, 635, 105, "strokeColor=#8B5CF6;strokeWidth=1.5;fillColor=#FAF5FF;shadow=0;");
  text("gov_title", "Governance & Oversight", 625, 78, 250, 22, "fontSize=13;fontStyle=1;fontColor=#6D28D9;align=center;");

  const govs = [
    { title: "Executive Leadership", desc: "• Strategic Direction\n• Portfolio Oversight\n• Value Realization", icon: "https://api.iconify.design/lucide:users.svg?color=%236D28D9" },
    { title: "Compliance / Legal", desc: "• Policy & Compliance\n• Risk Management\n• Audit & eDiscovery", icon: "https://api.iconify.design/lucide:scale.svg?color=%236D28D9" },
    { title: "Data Governance Board", desc: "• Data Standards\n• Quality & Lineage\n• Access & Ethics", icon: "https://api.iconify.design/lucide:shield-check.svg?color=%236D28D9" },
  ];
  govs.forEach((g, i) => {
    const x = 445 + i * 205;
    cardWithIcon("gov_card_" + i, g.title, g.desc, g.icon, x, 105, 195, 65, "#DDD6FE", "#FFFFFF", "#4C1D95", "#F5F3FF", "#DDD6FE");
  });

  // 3. LEFT COLUMN: INTERNAL BUSINESS USERS (Blue #2563EB)
  rect("users_container", "", 24, 150, 260, 600, "strokeColor=#3B82F6;strokeWidth=1.5;fillColor=#F8FAFC;shadow=0;");
  text("users_title", "Internal Business Users", 44, 156, 220, 22, "fontSize=14;fontStyle=1;fontColor=#1E40AF;align=left;");

  const users = [
    { title: "Research Scientists", desc: "Design studies, preclinical data, experiment insights", icon: "https://api.iconify.design/lucide:microscope.svg?color=%231D4ED8" },
    { title: "Clinical Operations", desc: "Run trials, monitor sites, manage participants", icon: "https://api.iconify.design/lucide:stethoscope.svg?color=%231D4ED8" },
    { title: "Regulatory Affairs Team", desc: "Prepare submissions, track commitments, variations", icon: "https://api.iconify.design/lucide:file-text.svg?color=%231D4ED8" },
    { title: "Safety / PV Specialists", desc: "Detect, evaluate, report adverse events & signals", icon: "https://api.iconify.design/lucide:shield-alert.svg?color=%231D4ED8" },
    { title: "Quality Assurance", desc: "Manage quality events, CAPA, audits, deviations", icon: "https://api.iconify.design/lucide:award.svg?color=%231D4ED8" },
    { title: "Medical Affairs", desc: "Respond to inquiries, medical content & evidence", icon: "https://api.iconify.design/lucide:message-circle-heart.svg?color=%231D4ED8" },
    { title: "Commercial Analytics", desc: "Market insights, forecasting, customer analytics", icon: "https://api.iconify.design/lucide:trending-up.svg?color=%231D4ED8" },
  ];
  users.forEach((u, i) => {
    const y = 186 + i * 78;
    cardWithIcon("user_card_" + i, u.title, u.desc, u.icon, 32, y, 242, 70, "#BFDBFE", "#FFFFFF", "#1E3A8A", "#EFF6FF", "#BFDBFE");
  });

  // 4. CENTER PLATFORM BOUNDARY: NOVACURA PLATFORM
  rect("platform_boundary", "", 445, 192, 625, 520, "strokeColor=#1D4ED8;strokeWidth=2.2;fillColor=#FFFFFF;shadow=0;");
  
  const logoHtml = "<div style=\"display:flex;align-items:center;justify-content:center;gap:10px;\">" +
    "<div style=\"font-size:24px;font-weight:900;color:#1E3A8A;letter-spacing:1px;\">NOVACURA</div>" +
    "<div style=\"font-size:14px;font-weight:700;color:#2563EB;\">Bio-Pharma Platform</div>" +
  "</div>";
  text("novacura_logo_header", logoHtml, 520, 202, 480, 32, "align=center;");

  const caps = [
    { title: "R&D & Clinical", desc: "• Program Mgmt\n• Protocols & Studies\n• Trial Oversight", icon: "https://api.iconify.design/lucide:flask-conical.svg?color=%231E40AF" },
    { title: "Regulatory Affairs", desc: "• Submissions\n• Commitments\n• Variations", icon: "https://api.iconify.design/lucide:file-check-2.svg?color=%231E40AF" },
    { title: "Pharmacovigilance", desc: "• Case Mgmt\n• Signal Detection\n• Risk Mgmt", icon: "https://api.iconify.design/lucide:shield-check.svg?color=%231E40AF" },
    { title: "Quality & Manufacturing", desc: "• Quality Events\n• CAPA & Change\n• Batch & Release", icon: "https://api.iconify.design/lucide:factory.svg?color=%231E40AF" },
    { title: "Medical Information", desc: "• Inquiry Mgmt\n• Medical Content\n• Evidence Library", icon: "https://api.iconify.design/lucide:message-square.svg?color=%231E40AF" },
    { title: "Commercial Insights", desc: "• Market Analytics\n• Forecasting\n• Performance KPIs", icon: "https://api.iconify.design/lucide:bar-chart-3.svg?color=%231E40AF" },
    { title: "Document & Knowledge Hub", desc: "• Document Mgmt\n• Version Control\n• Collaboration", icon: "https://api.iconify.design/lucide:folder-git-2.svg?color=%231E40AF" },
    { title: "AI Copilot & Automation", desc: "• Intelligent Assistance\n• Workflow Orchestration\n• Decision Support", icon: "https://api.iconify.design/lucide:bot.svg?color=%237C3AED" },
  ];
  caps.forEach((cItem, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 465 + col * 292;
    const y = 246 + row * 92;
    cardWithIcon("cap_card_" + i, cItem.title, cItem.desc, cItem.icon, x, y, 276, 82, "#BFDBFE", "#F8FAFC", "#1E3A8A", "#EFF6FF", "#BFDBFE");
  });

  const crossPill = [
    { title: "Security & Privacy", sub: "Zero Trust • CMEK" },
    { title: "Audit & Compliance", sub: "21 CFR Part 11 • GxP" },
    { title: "Data Lineage & Quality", sub: "Dataplex Lineage • Mesh" },
    { title: "Interoperability", sub: "OpenAPI 3.1 • FHIR • MCP" },
  ];
  crossPill.forEach((cp, i) => {
    const x = 465 + i * 147;
    const html = "<table style=\"width:100%;height:100%;text-align:center;\"><tr><td style=\"vertical-align:middle;\"><div style=\"font-size:9px;font-weight:700;color:#1E40AF;\">" + cp.title + "</div><div style=\"font-size:7.5px;color:#64748B;margin-top:2px;\">" + cp.sub + "</div></td></tr></table>";
    c.push("<mxCell id=\"cross_pill_" + i + "\" value=\"" + E(html) + "\" style=\"rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1;\" vertex=\"1\" parent=\"1\"><mxGeometry x=\"" + x + "\" y=\"628\" width=\"140\" height=\"58\" as=\"geometry\"/></mxCell>");
  });

  // 5. RIGHT COLUMN: EXTERNAL ECOSYSTEM (Green #16A34A)
  rect("ext_container", "", 1260, 160, 260, 510, "strokeColor=#16A34A;strokeWidth=1.5;fillColor=#F0FDF4;shadow=0;");
  text("ext_title", "External Ecosystem", 1290, 168, 200, 22, "fontSize=14;fontStyle=1;fontColor=#15803D;align=center;");

  const extPartners = [
    { title: "CRO / CDMO Partners", desc: "Study execution, data management, manufacturing & supply partners", icon: "https://api.iconify.design/lucide:handshake.svg?color=%2316A34A" },
    { title: "Healthcare Providers / Investigators", desc: "Site collaboration, patient enrollment, study conduct, clinical data", icon: "https://api.iconify.design/lucide:hospital.svg?color=%2316A34A" },
    { title: "Regulatory Authorities (FDA, EMA)", desc: "eSubmissions, queries, safety reports, inspections", icon: "https://api.iconify.design/lucide:landmark.svg?color=%2316A34A" },
    { title: "Patients / Patient Programs", desc: "Study participation, PROs, support programs, communications", icon: "https://api.iconify.design/lucide:heart-handshake.svg?color=%2316A34A" },
  ];
  extPartners.forEach((ep, i) => {
    const y = 205 + i * 114;
    cardWithIcon("ext_card_" + i, ep.title, ep.desc, ep.icon, 1275, y, 230, 98, "#86EFAC", "#FFFFFF", "#166534", "#DCFCE7", "#86EFAC");
  });

  // 6. CONNECTORS & FLOWS (Clean corridor routing)
  const rbacHtml = "<table style=\"width:100%;height:100%;text-align:center;\"><tr><td style=\"vertical-align:middle;\"><img src=\"https://api.iconify.design/lucide:lock.svg?color=%231D4ED8\" width=\"18\" height=\"18\" style=\"display:block;margin:0 auto 4px auto;\"/><div style=\"font-size:8.5px;font-weight:700;color:#1D4ED8;line-height:1.1;\">Secure Web Portal<br/>(Single Experience)</div><div style=\"font-size:7px;color:#475569;margin-top:2px;\">Role-Based Access &amp; Workflows</div></td></tr></table>";
  c.push("<mxCell id=\"rbac_pod\" value=\"" + E(rbacHtml) + "\" style=\"rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=1.2;\" vertex=\"1\" parent=\"1\"><mxGeometry x=\"304\" y=\"405\" width=\"120\" height=\"85\" as=\"geometry\"/></mxCell>");

  edge("f_user_rbac", "users_container", "rbac_pod", "", "#1D4ED8", false, "exitX=1;exitY=0.5;entryX=0;entryY=0.5;");
  edge("f_rbac_core", "rbac_pod", "platform_boundary", "", "#1D4ED8", false, "exitX=1;exitY=0.5;entryX=0;entryY=0.5;");
  edge("f_gov_core", "gov_container", "platform_boundary", "", "#7C3AED", true, "exitX=0.5;exitY=1;entryX=0.5;entryY=0;");

  const extFlows = [
    { label: "Collaboration Packages & Data Exchange (APIs / SFTP)", y: 0.18 },
    { label: "Clinical Data & Documents (HTTPS / APIs)", y: 0.40 },
    { label: "Submissions & Responses (IDMP / eCTD)", y: 0.62 },
    { label: "Programs & Communications (Secure Portal / APIs)", y: 0.84 },
  ];
  extFlows.forEach((ef, i) => {
    edge("f_ext_" + i, "platform_boundary", "ext_card_" + i, ef.label, "#16A34A", false, "exitX=1;exitY=" + ef.y + ";entryX=0;entryY=0.5;");
  });

  // 7. ENTERPRISE CONNECTED SYSTEMS
  rect("ent_container", "", 24, 765, 930, 160, "strokeColor=#3B82F6;strokeWidth=1.5;fillColor=#F8FAFC;shadow=0;");
  text("ent_title", "Enterprise Systems (Upstream / Downstream)", 310, 930, 420, 20, "fontSize=11;fontStyle=1;fontColor=#1E40AF;align=center;");

  const entSystems = [
    { title: "Veeva Vault", sub: "Regulatory / Quality Documents", icon: "https://api.iconify.design/lucide:shield-check.svg?color=%23EA580C" },
    { title: "Salesforce Health Cloud", sub: "CRM / HCP / Patient Engagement", icon: "https://api.iconify.design/logos:salesforce.svg" },
    { title: "SAP S/4HANA", sub: "ERP / Supply Chain / Finance", icon: "https://api.iconify.design/logos:sap.svg" },
    { title: "Laboratory / LIMS", sub: "Lab Data, Results, Samples", icon: "https://api.iconify.design/lucide:flask-conical.svg?color=%231E40AF" },
    { title: "Clinical Trial (EDC/CTMS)", sub: "Study Data, Sites, Subjects", icon: "https://api.iconify.design/lucide:users.svg?color=%231E40AF" },
    { title: "Safety Database (Argus)", sub: "Safety Cases, Reports, Signals", icon: "https://api.iconify.design/lucide:shield-alert.svg?color=%231E40AF" },
    { title: "Data Lakehouse", sub: "Analytics, Reporting, Data Sharing", icon: "https://api.iconify.design/lucide:database.svg?color=%231E40AF" },
  ];
  entSystems.forEach((s, i) => {
    const x = 36 + i * 130;
    const sysHtml = "<table style=\"width:100%;height:100%;text-align:center;padding:4px;\">" +
      "<tr><td style=\"height:44px;vertical-align:middle;\"><img src=\"" + s.icon + "\" width=\"30\" height=\"30\" style=\"display:block;margin:0 auto;\"/></td></tr>" +
      "<tr><td style=\"vertical-align:top;padding-top:2px;\"><div style=\"font-size:9.5px;font-weight:700;color:#1E3A8A;line-height:1.2;\">" + s.title + "</div><div style=\"font-size:7.5px;color:#64748B;margin-top:2px;line-height:1.2;\">" + s.sub + "</div></td></tr>" +
    "</table>";
    c.push("<mxCell id=\"ent_card_" + i + "\" value=\"" + E(sysHtml) + "\" style=\"rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#BFDBFE;strokeWidth=1.2;\" vertex=\"1\" parent=\"1\"><mxGeometry x=\"" + x + "\" y=\"782\" width=\"120\" height=\"126\" as=\"geometry\"/></mxCell>");
    edge("f_core_ent_" + i, "platform_boundary", "ent_card_" + i, "", "#1D4ED8", false, "exitX=0.2;exitY=1;entryX=0.5;entryY=0;");
  });

  rect("ent_protocols_bar", "Integration Patterns: APIs | Events | Batch | File Exchange    •    Standards: HL7 FHIR | IDMP | CDISC | ICH | ISO IDMP / GS1    •    Connectivity: Private Endpoints / VPN / SFTP / MQ / Pub/Sub", 36, 912, 906, 26, "strokeColor=#93C5FD;fillColor=#EFF6FF;fontSize=8;fontColor=#1E40AF;fontStyle=1;align=center;");

  // 8. AI & KNOWLEDGE SERVICES
  rect("ai_container", "", 970, 765, 550, 160, "strokeColor=#8B5CF6;strokeWidth=1.5;fillColor=#FAF5FF;shadow=0;");
  text("ai_title", "AI / Knowledge Services (Google Cloud)", 1120, 930, 280, 20, "fontSize=11;fontStyle=1;fontColor=#6D28D9;align=center;");

  const aiServices = [
    { title: "Enterprise Search", sub: "Taxonomy, Knowledge Articles", icon: "https://api.iconify.design/lucide:search.svg?color=%237C3AED" },
    { title: "Vector Index / Semantic", sub: "Embeddings Store, Retrieval", icon: "https://api.iconify.design/lucide:network.svg?color=%237C3AED" },
    { title: "Approved LLM Service", sub: "Vertex AI Gemini 2.5 Pro", icon: "https://api.iconify.design/logos:google-cloud.svg" },
  ];
  aiServices.forEach((asItem, i) => {
    const x = 986 + i * 174;
    const aiHtml = "<table style=\"width:100%;height:100%;text-align:center;padding:4px;\">" +
      "<tr><td style=\"height:44px;vertical-align:middle;\"><img src=\"" + asItem.icon + "\" width=\"32\" height=\"32\" style=\"display:block;margin:0 auto;\"/></td></tr>" +
      "<tr><td style=\"vertical-align:top;padding-top:2px;\"><div style=\"font-size:10px;font-weight:700;color:#581C87;line-height:1.2;\">" + asItem.title + "</div><div style=\"font-size:8px;color:#64748B;margin-top:2px;line-height:1.2;\">" + asItem.sub + "</div></td></tr>" +
    "</table>";
    c.push("<mxCell id=\"ai_card_" + i + "\" value=\"" + E(aiHtml) + "\" style=\"rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DDD6FE;strokeWidth=1.2;\" vertex=\"1\" parent=\"1\"><mxGeometry x=\"" + x + "\" y=\"782\" width=\"160\" height=\"126\" as=\"geometry\"/></mxCell>");
    edge("f_core_ai_" + i, "platform_boundary", "ai_card_" + i, "", "#7C3AED", true, "exitX=0.82;exitY=1;entryX=0.5;entryY=0;");
  });

  rect("ai_annotation", "AI Copilot uses enterprise content and governed LLM to deliver grounded, compliant assistance within workflows.", 1180, 715, 340, 42, "strokeColor=#C084FC;fillColor=#FAF5FF;fontSize=8.5;fontColor=#6B21A8;fontStyle=2;align=center;rounded=1;shadow=0;");

  // 9. OPS & LEGEND
  const ops = [
    { title: "Platform Admins", sub: "Tenant & Config Mgmt\nRelease & Change Mgmt", icon: "https://api.iconify.design/lucide:settings.svg?color=%231E293B" },
    { title: "Security / IAM Team", sub: "Identity & Access Mgmt\nThreat Detection & CMEK", icon: "https://api.iconify.design/lucide:shield-check.svg?color=%231E293B" },
    { title: "Support / Operations", sub: "Incident & Problem Mgmt\nAvailability & SRE", icon: "https://api.iconify.design/lucide:headphones.svg?color=%231E293B" },
  ];
  rect("ops_container", "", 24, 946, 640, 68, "strokeColor=#94A3B8;strokeWidth=1.2;fillColor=#F8FAFC;shadow=0;");
  ops.forEach((op, i) => {
    const x = 36 + i * 208;
    cardWithIcon("op_card_" + i, op.title, op.sub, op.icon, x, 952, 196, 54, "#CBD5E1", "#FFFFFF", "#1E293B", "#F1F5F9", "#CBD5E1");
  });

  rect("legend_box", "", 680, 946, 840, 68, "strokeColor=#94A3B8;strokeWidth=1.2;fillColor=#F8FAFC;");
  text("legend_title", "Legend", 695, 950, 80, 16, "fontSize=9.5;fontStyle=1;fontColor=#0F172A;align=left;");
  text("legend_symbols", "👤 User / Actor      ⚙️ Application / Service      🗄️ Data Source / System      ✨ AI Service      🤝 External Partner      ⚖️ Governance / Control", 695, 968, 620, 20, "fontSize=8;fontColor=#475569;align=left;");
  text("legend_lines", "—→ Data Flow     - - -> Control Flow     ←→ External Exchange", 695, 988, 500, 18, "fontSize=8;fontColor=#475569;fontStyle=1;align=left;");

  text("footer_note", "ⓘ Conceptual context view — not deployment topology", 24, 1020, 400, 16, "fontSize=8.5;fontStyle=2;fontColor=#64748B;align=left;");

  return "<mxGraphModel dx=\"1600\" dy=\"1050\" grid=\"1\" gridSize=\"10\" guides=\"1\" tooltips=\"1\" connect=\"1\" arrows=\"1\" fold=\"1\" page=\"1\" pageScale=\"1\" pageWidth=\"1600\" pageHeight=\"1050\" background=\"" + bg + "\"><root><mxCell id=\"0\"/><mxCell id=\"1\" parent=\"0\"/>" + c.join("\n") + "</root></mxGraphModel>";
}
