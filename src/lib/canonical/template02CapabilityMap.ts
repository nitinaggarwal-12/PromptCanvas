/**
 * Master 1:1 Exact Replica Generator for Canonical Template 02: Capability Map
 * Matches 100% of images/02.png (02 — Capability Map | NOVACURA Bio-Pharma Platform)
 */

const E = (v?: string | null) =>
  (v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function generateTemplate02CapabilityMapXml(domainFlavor = "biopharma", theme: "light" | "dark" = "light"): string {
  const isDark = theme === "dark";
  const bg = isDark ? "#0B111E" : "#FFFFFF";
  const c: string[] = [];

  const rect = (id: string, v: string, x: number, y: number, w: number, h: number, s = "") =>
    c.push("<mxCell id=\"" + id + "\" value=\"" + E(v) + "\" style=\"rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;fontColor=#0F172A;fontSize=11;" + s + "\" vertex=\"1\" parent=\"1\"><mxGeometry x=\"" + x + "\" y=\"" + y + "\" width=\"" + w + "\" height=\"" + h + "\" as=\"geometry\"/></mxCell>");

  const text = (id: string, v: string, x: number, y: number, w: number, h: number, s = "") =>
    c.push("<mxCell id=\"" + id + "\" value=\"" + E(v) + "\" style=\"text;html=1;strokeColor=none;fillColor=none;whiteSpace=wrap;fontColor=#0F172A;fontSize=11;verticalAlign=middle;" + s + "\" vertex=\"1\" parent=\"1\"><mxGeometry x=\"" + x + "\" y=\"" + y + "\" width=\"" + w + "\" height=\"" + h + "\" as=\"geometry\"/></mxCell>");

  const edge = (id: string, src: string, tgt: string, label = "", color = "#1D4ED8", dash = false, s = "") =>
    c.push("<mxCell id=\"" + id + "\" value=\"" + E(label) + "\" style=\"edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=" + color + ";strokeWidth=1.8;endArrow=block;endFill=1;fontSize=7.5;fontColor=" + color + ";fontStyle=1;" + (dash ? "dashed=1;dashPattern=6 4;" : "") + s + "\" edge=\"1\" parent=\"1\" source=\"" + src + "\" target=\"" + tgt + "\"><mxGeometry relative=\"1\" as=\"geometry\"/></mxCell>");

  // 1. TOP HEADER BANNER
  text("t1", "02 — Capability Map | NOVACURA Bio-Pharma Platform", 20, 16, 950, 32, "fontSize=24;fontStyle=1;align=left;fontColor=#0F172A;");
  text("t2", "Core Architecture Family | Bio-Pharma Product", 20, 48, 600, 20, "fontSize=13;fontStyle=1;fontColor=#64748B;align=left;");

  // 2. TOP CONTAINER: USER / BUSINESS EXPERIENCE LAYER (y: 72, h: 96)
  rect("exp_layer", "", 245, 70, 1025, 96, "strokeColor=#8B5CF6;strokeWidth=1.5;fillColor=#FAF5FF;shadow=0;");
  text("exp_title", "USER / BUSINESS EXPERIENCE LAYER", 580, 72, 360, 18, "fontSize=11.5;fontStyle=1;fontColor=#6D28D9;align=center;");

  const expCards = [
    { title: "Role-Based Portals", desc: "Tailored experiences for every role and function", icon: "https://api.iconify.design/lucide:layout.svg?color=%236D28D9" },
    { title: "Workflow Experiences", desc: "Guided workflows that drive consistency and speed", icon: "https://api.iconify.design/lucide:git-pull-request.svg?color=%236D28D9" },
    { title: "Dashboards & Insights", desc: "Real-time KPIs, performance and operational visibility", icon: "https://api.iconify.design/lucide:bar-chart-2.svg?color=%236D28D9" },
    { title: "Collaboration & Communication", desc: "Secure communication, tasks, and document collaboration", icon: "https://api.iconify.design/lucide:messages-square.svg?color=%236D28D9" },
  ];
  expCards.forEach((ec, i) => {
    const x = 258 + i * 248;
    const html = "<table style=\"width:100%;height:100%;border-collapse:collapse;\">" +
      "<tr>" +
        "<td style=\"width:36px;vertical-align:middle;text-align:center;\">" +
          "<div style=\"width:32px;height:32px;border-radius:6px;background:#F5F3FF;border:1px solid #DDD6FE;display:flex;align-items:center;justify-content:center;margin:0 auto;\">" +
            "<img src=\"" + ec.icon + "\" width=\"18\" height=\"18\" style=\"display:block;margin:auto;\"/>" +
          "</div>" +
        "</td>" +
        "<td style=\"vertical-align:middle;padding-left:6px;text-align:left;\">" +
          "<div style=\"font-size:9.5px;font-weight:700;color:#4C1D95;line-height:1.2;\">" + ec.title + "</div>" +
          "<div style=\"font-size:7.5px;color:#475569;margin-top:1px;line-height:1.15;\">" + ec.desc + "</div>" +
        "</td>" +
      "</tr>" +
    "</table>";
    c.push("<mxCell id=\"exp_c_" + i + "\" value=\"" + E(html) + "\" style=\"rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DDD6FE;strokeWidth=1;\" vertex=\"1\" parent=\"1\"><mxGeometry x=\"" + x + "\" y=\"94\" width=\"240\" height=\"64\" as=\"geometry\"/></mxCell>");
  });

  // 3. LEFT COLUMN: BUSINESS OUTCOMES (y: 180, h: 575, w: 205)
  rect("outcomes_container", "", 20, 180, 205, 575, "strokeColor=#3B82F6;strokeWidth=1.5;fillColor=#EFF6FF;shadow=0;");
  
  const outcomeHeaderHtml = "<div style=\"display:flex;align-items:center;justify-content:center;gap:6px;\">" +
    "<img src=\"https://api.iconify.design/lucide:trophy.svg?color=%231E40AF\" width=\"18\" height=\"18\"/>" +
    "<div style=\"font-size:12px;font-weight:700;color:#1E40AF;\">Business Outcomes</div>" +
  "</div>";
  text("outcomes_hdr", outcomeHeaderHtml, 25, 186, 195, 22, "align=center;");

  const outcomes = [
    { title: "Faster submissions", desc: "Accelerate regulatory approvals with quality submissions.", icon: "https://api.iconify.design/lucide:rocket.svg?color=%231D4ED8" },
    { title: "Improved trial execution", desc: "Optimize trials with better planning, monitoring and data quality.", icon: "https://api.iconify.design/lucide:clipboard-check.svg?color=%231D4ED8" },
    { title: "Better signal detection", desc: "Detect safety signals earlier with integrated data and AI.", icon: "https://api.iconify.design/lucide:radio.svg?color=%231D4ED8" },
    { title: "Stronger compliance", desc: "Ensure adherence to regulations and internal standards.", icon: "https://api.iconify.design/lucide:shield-check.svg?color=%231D4ED8" },
    { title: "Reusable enterprise knowledge", desc: "Capture, standardize and reuse institutional knowledge.", icon: "https://api.iconify.design/lucide:book-open.svg?color=%231D4ED8" },
    { title: "Scalable automation", desc: "Automate processes to drive efficiency and reduce cost.", icon: "https://api.iconify.design/lucide:cpu.svg?color=%231D4ED8" },
  ];
  outcomes.forEach((o, i) => {
    const y = 216 + i * 88;
    const html = "<table style=\"width:100%;height:100%;border-collapse:collapse;\">" +
      "<tr>" +
        "<td style=\"width:36px;vertical-align:top;padding-top:4px;text-align:center;\">" +
          "<img src=\"" + o.icon + "\" width=\"22\" height=\"22\" style=\"display:block;margin:0 auto;\"/>" +
        "</td>" +
        "<td style=\"vertical-align:top;padding-left:4px;text-align:left;\">" +
          "<div style=\"font-size:10px;font-weight:700;color:#1E3A8A;line-height:1.2;\">" + o.title + "</div>" +
          "<div style=\"font-size:8px;color:#475569;margin-top:2px;line-height:1.2;\">" + o.desc + "</div>" +
        "</td>" +
      "</tr>" +
    "</table>";
    c.push("<mxCell id=\"out_c_" + i + "\" value=\"" + E(html) + "\" style=\"rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#BFDBFE;strokeWidth=1;\" vertex=\"1\" parent=\"1\"><mxGeometry x=\"28\" y=\"" + y + "\" width=\"188\" height=\"80\" as=\"geometry\"/></mxCell>");
  });

  // 4. RIGHT COLUMN: PRIMARY PERSONAS (y: 180, h: 575, w: 205)
  rect("personas_container", "", 1285, 180, 205, 575, "strokeColor=#16A34A;strokeWidth=1.5;fillColor=#F0FDF4;shadow=0;");
  
  const personaHeaderHtml = "<div style=\"display:flex;align-items:center;justify-content:center;gap:6px;\">" +
    "<img src=\"https://api.iconify.design/lucide:users.svg?color=%2315803D\" width=\"18\" height=\"18\"/>" +
    "<div style=\"font-size:12px;font-weight:700;color:#15803D;\">Primary Personas</div>" +
  "</div>";
  text("personas_hdr", personaHeaderHtml, 1290, 186, 195, 22, "align=center;");

  const personas = [
    { title: "Research Scientists", icon: "https://api.iconify.design/lucide:microscope.svg?color=%2316A34A" },
    { title: "Clinical Ops", icon: "https://api.iconify.design/lucide:stethoscope.svg?color=%2316A34A" },
    { title: "Regulatory Affairs", icon: "https://api.iconify.design/lucide:scale.svg?color=%2316A34A" },
    { title: "Safety Specialists", icon: "https://api.iconify.design/lucide:shield-alert.svg?color=%2316A34A" },
    { title: "Quality Teams", icon: "https://api.iconify.design/lucide:factory.svg?color=%2316A34A" },
    { title: "Medical Affairs", icon: "https://api.iconify.design/lucide:message-circle-heart.svg?color=%2316A34A" },
    { title: "Commercial Analytics", icon: "https://api.iconify.design/lucide:trending-up.svg?color=%2316A34A" },
    { title: "Platform Admins", icon: "https://api.iconify.design/lucide:settings.svg?color=%2316A34A" },
  ];
  personas.forEach((p, i) => {
    const y = 216 + i * 66;
    const html = "<table style=\"width:100%;height:100%;border-collapse:collapse;\">" +
      "<tr>" +
        "<td style=\"width:36px;vertical-align:middle;text-align:center;\">" +
          "<img src=\"" + p.icon + "\" width=\"22\" height=\"22\" style=\"display:block;margin:0 auto;\"/>" +
        "</td>" +
        "<td style=\"vertical-align:middle;padding-left:4px;text-align:left;\">" +
          "<div style=\"font-size:10px;font-weight:700;color:#166534;\">" + p.title + "</div>" +
        "</td>" +
      "</tr>" +
    "</table>";
    c.push("<mxCell id=\"per_c_" + i + "\" value=\"" + E(html) + "\" style=\"rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1;\" vertex=\"1\" parent=\"1\"><mxGeometry x=\"1293\" y=\"" + y + "\" width=\"188\" height=\"58\" as=\"geometry\"/></mxCell>");
  });

  // 5. CENTER PLATFORM: NOVACURA Bio-Pharma Platform (y: 180, h: 575, w: 1025)
  rect("main_platform", "", 245, 180, 1025, 575, "strokeColor=#1D4ED8;strokeWidth=2;fillColor=#FFFFFF;shadow=0;");

  const logoCenterHtml = "<table style=\"margin:0 auto;\"><tr>" +
    "<td style=\"vertical-align:middle;padding-right:10px;\">" +
      "<svg width=\"34\" height=\"26\" viewBox=\"0 0 40 32\"><path d=\"M4 28L14 4h9L15 28z\" fill=\"#2563EB\"/><path d=\"M18 28L28 4h9L27 28z\" fill=\"#1E3A8A\"/></svg>" +
    "</td>" +
    "<td style=\"vertical-align:middle;text-align:left;\">" +
      "<div style=\"font-size:20px;font-weight:900;color:#1E3A8A;letter-spacing:1px;line-height:1;\">NOVACURA Bio-Pharma Platform</div>" +
      "<div style=\"font-size:10.5px;font-weight:700;color:#2563EB;line-height:1.2;letter-spacing:1px;\">CORE BUSINESS CAPABILITIES</div>" +
    "</td>" +
  "</tr></table>";
  text("novacura_center_hdr", logoCenterHtml, 500, 186, 500, 36, "align=center;");

  // Helper to build domain card
  const domainBox = (id: string, num: string, title: string, domainIcon: string, items: { name: string; icon: string; ai?: boolean }[], x: number, y: number, w: number, h: number, border = "#BFDBFE", bg = "#FFFFFF", titleColor = "#1E3A8A", badgeBg = "#1D4ED8") => {
    let itemsHtml = "";
    items.forEach(it => {
      const itBg = it.ai ? "#FAF5FF" : "#F8FAFC";
      const itBorder = it.ai ? "#C084FC" : "#E2E8F0";
      const itColor = it.ai ? "#6B21A8" : "#334155";
      itemsHtml += "<div style=\"display:flex;align-items:center;background:" + itBg + ";border:1px solid " + itBorder + ";border-radius:4px;padding:3px 6px;margin-bottom:3px;\">" +
        "<img src=\"" + it.icon + "\" width=\"14\" height=\"14\" style=\"margin-right:6px;flex-shrink:0;\"/>" +
        "<div style=\"font-size:8.5px;font-weight:" + (it.ai ? "700" : "500") + ";color:" + itColor + ";white-space:nowrap;overflow:hidden;text-overflow:ellipsis;\">" + it.name + "</div>" +
      "</div>";
    });

    const cardHtml = "<div style=\"padding:4px;\">" +
      "<div style=\"display:flex;align-items:center;margin-bottom:6px;\">" +
        "<div style=\"width:18px;height:18px;border-radius:50%;background:" + badgeBg + ";color:#FFF;font-size:10px;font-weight:900;display:flex;align-items:center;justify-content:center;margin-right:6px;\">" + num + "</div>" +
        "<img src=\"" + domainIcon + "\" width=\"18\" height=\"18\" style=\"margin-right:6px;\"/>" +
        "<div style=\"font-size:11px;font-weight:800;color:" + titleColor + ";\">" + title + "</div>" +
      "</div>" +
      itemsHtml +
    "</div>";

    c.push("<mxCell id=\"" + id + "\" value=\"" + E(cardHtml) + "\" style=\"rounded=1;whiteSpace=wrap;html=1;fillColor=" + bg + ";strokeColor=" + border + ";strokeWidth=1.2;shadow=0;verticalAlign=top;\" vertex=\"1\" parent=\"1\"><mxGeometry x=\"" + x + "\" y=\"" + y + "\" width=\"" + w + "\" height=\"" + h + "\" as=\"geometry\"/></mxCell>");
  };

  // Row 1 of Domains (Top 4 Domains)
  domainBox("dom_1", "1", "Research & Discovery", "https://api.iconify.design/lucide:microscope.svg?color=%231D4ED8", [
    { name: "Target Identification", icon: "https://api.iconify.design/lucide:crosshair.svg?color=%231D4ED8" },
    { name: "Preclinical Data Management", icon: "https://api.iconify.design/lucide:database.svg?color=%231D4ED8" },
    { name: "Protocol Design", icon: "https://api.iconify.design/lucide:file-edit.svg?color=%231D4ED8" },
    { name: "Study Planning", icon: "https://api.iconify.design/lucide:calendar.svg?color=%231D4ED8" },
  ], 255, 226, 240, 160, "#BFDBFE", "#FFFFFF", "#1E3A8A", "#1D4ED8");

  domainBox("dom_2", "2", "Clinical Development", "https://api.iconify.design/lucide:users.svg?color=%231D4ED8", [
    { name: "Trial Design", icon: "https://api.iconify.design/lucide:file-text.svg?color=%231D4ED8" },
    { name: "Site & Investigator Management", icon: "https://api.iconify.design/lucide:user-check.svg?color=%231D4ED8" },
    { name: "Patient Recruitment & Enrollment", icon: "https://api.iconify.design/lucide:user-plus.svg?color=%231D4ED8" },
    { name: "Clinical Data Capture", icon: "https://api.iconify.design/lucide:file-input.svg?color=%231D4ED8" },
    { name: "Monitoring & Oversight", icon: "https://api.iconify.design/lucide:search.svg?color=%231D4ED8" },
  ], 505, 226, 240, 160, "#BFDBFE", "#FFFFFF", "#1E3A8A", "#1D4ED8");

  domainBox("dom_3", "3", "Regulatory Affairs", "https://api.iconify.design/lucide:scale.svg?color=%231D4ED8", [
    { name: "Submission Authoring", icon: "https://api.iconify.design/lucide:file-signature.svg?color=%231D4ED8" },
    { name: "eCTD / IDMP Management", icon: "https://api.iconify.design/lucide:folder-tree.svg?color=%231D4ED8" },
    { name: "Health Authority Correspondence", icon: "https://api.iconify.design/lucide:landmark.svg?color=%231D4ED8" },
    { name: "Commitments & Variations", icon: "https://api.iconify.design/lucide:check-square.svg?color=%231D4ED8" },
  ], 755, 226, 240, 160, "#BFDBFE", "#FFFFFF", "#1E3A8A", "#1D4ED8");

  domainBox("dom_4", "4", "Safety / Pharmacovigilance", "https://api.iconify.design/lucide:shield-alert.svg?color=%236D28D9", [
    { name: "Case Intake", icon: "https://api.iconify.design/lucide:inbox.svg?color=%236D28D9" },
    { name: "Signal Detection", icon: "https://api.iconify.design/lucide:activity.svg?color=%236D28D9" },
    { name: "Benefit-Risk Assessment", icon: "https://api.iconify.design/lucide:scale.svg?color=%236D28D9" },
    { name: "Safety Reporting", icon: "https://api.iconify.design/lucide:file-warning.svg?color=%236D28D9" },
  ], 1005, 226, 250, 160, "#DDD6FE", "#FFFFFF", "#4C1D95", "#6D28D9");

  // Row 2 of Domains (Bottom 4 Domains)
  domainBox("dom_5", "5", "Quality & Manufacturing", "https://api.iconify.design/lucide:factory.svg?color=%230D9488", [
    { name: "QMS / Deviations / CAPA", icon: "https://api.iconify.design/lucide:check-circle-2.svg?color=%230D9488" },
    { name: "Batch Record Review", icon: "https://api.iconify.design/lucide:file-check.svg?color=%230D9488" },
    { name: "Change Control", icon: "https://api.iconify.design/lucide:refresh-cw.svg?color=%230D9488" },
    { name: "Product Release", icon: "https://api.iconify.design/lucide:package-check.svg?color=%230D9488" },
    { name: "Supplier Quality", icon: "https://api.iconify.design/lucide:award.svg?color=%230D9488" },
  ], 255, 396, 240, 165, "#99F6E4", "#FFFFFF", "#0F766E", "#0D9488");

  domainBox("dom_6", "6", "Medical & Commercial", "https://api.iconify.design/lucide:message-square.svg?color=%230D9488", [
    { name: "Medical Information", icon: "https://api.iconify.design/lucide:help-circle.svg?color=%230D9488" },
    { name: "Content & Evidence Management", icon: "https://api.iconify.design/lucide:library.svg?color=%230D9488" },
    { name: "Market Analytics", icon: "https://api.iconify.design/lucide:bar-chart.svg?color=%230D9488" },
    { name: "Forecasting & Performance Insights", icon: "https://api.iconify.design/lucide:trending-up.svg?color=%230D9488" },
  ], 505, 396, 240, 165, "#99F6E4", "#FFFFFF", "#0F766E", "#0D9488");

  domainBox("dom_7", "7", "Knowledge, Data & AI Foundation", "https://api.iconify.design/lucide:sparkles.svg?color=%237C3AED", [
    { name: "Document & Knowledge Hub", icon: "https://api.iconify.design/lucide:folder-git-2.svg?color=%237C3AED" },
    { name: "Master Data & Reference Data", icon: "https://api.iconify.design/lucide:database.svg?color=%237C3AED" },
    { name: "Data Lake / Warehouse", icon: "https://api.iconify.design/lucide:layers.svg?color=%237C3AED" },
    { name: "Semantic Search / Vector Index", icon: "https://api.iconify.design/lucide:network.svg?color=%237C3AED" },
    { name: "✨ AI Copilot & Workflow Automation", icon: "https://api.iconify.design/lucide:bot.svg?color=%237C3AED", ai: true },
  ], 755, 396, 240, 165, "#DDD6FE", "#FFFFFF", "#581C87", "#7C3AED");

  domainBox("dom_8", "8", "Platform, Security & Operations", "https://api.iconify.design/lucide:shield-check.svg?color=%23475569", [
    { name: "Identity & Access Management", icon: "https://api.iconify.design/lucide:key.svg?color=%23475569" },
    { name: "Audit & Compliance", icon: "https://api.iconify.design/lucide:file-badge.svg?color=%23475569" },
    { name: "Data Lineage & Quality", icon: "https://api.iconify.design/lucide:git-fork.svg?color=%23475569" },
    { name: "API & Interoperability Layer", icon: "https://api.iconify.design/lucide:network.svg?color=%23475569" },
    { name: "Monitoring & Support", icon: "https://api.iconify.design/lucide:gauge.svg?color=%23475569" },
    { name: "Tenant / Configuration Management", icon: "https://api.iconify.design/lucide:sliders.svg?color=%23475569" },
  ], 1005, 396, 250, 165, "#CBD5E1", "#FFFFFF", "#1E293B", "#334155");

  // Middle layer cross-cutting connect edge
  edge("e_exp_to_main", "exp_layer", "main_platform", "", "#8B5CF6", false, "exitX=0.5;exitY=1;entryX=0.5;entryY=0;");
  edge("e_outcomes_to_main", "outcomes_container", "main_platform", "", "#2563EB", false, "exitX=1;exitY=0.5;entryX=0;entryY=0.5;");
  edge("e_personas_to_main", "personas_container", "main_platform", "", "#16A34A", false, "exitX=0;exitY=0.5;entryX=1;entryY=0.5;");

  // 6. BOTTOM CONTAINER: SHARED DIGITAL FOUNDATION (y: 770, h: 105, w: 1470)
  rect("foundation_container", "", 20, 770, 1470, 105, "strokeColor=#2563EB;strokeWidth=1.5;fillColor=#F8FAFC;shadow=0;");
  text("found_title", "SHARED DIGITAL FOUNDATION", 600, 772, 320, 18, "fontSize=12;fontStyle=1;fontColor=#1E40AF;align=center;");

  const foundations = [
    { title: "Integrations & Connectivity", desc: "Enterprise & partner systems, APIs, data exchange and ecosystem connectivity", icon: "https://api.iconify.design/lucide:link-2.svg?color=%231D4ED8" },
    { title: "Data Platform", desc: "Data lake, warehouse and curated data products with governed access", icon: "https://api.iconify.design/lucide:database.svg?color=%231D4ED8" },
    { title: "AI & Intelligent Services", desc: "AI models, copilots and intelligent services that enable automation and insight", icon: "https://api.iconify.design/lucide:bot.svg?color=%231D4ED8" },
    { title: "Security & Compliance", desc: "Security-by-design, privacy, compliance frameworks and risk management", icon: "https://api.iconify.design/lucide:shield-check.svg?color=%231D4ED8" },
    { title: "Operations & Resilience", desc: "Reliable, scalable operations with monitoring, backup and disaster recovery", icon: "https://api.iconify.design/lucide:cloud.svg?color=%231D4ED8" },
  ];
  foundations.forEach((fd, i) => {
    const x = 32 + i * 290;
    const html = "<table style=\"width:100%;height:100%;border-collapse:collapse;\">" +
      "<tr>" +
        "<td style=\"width:36px;vertical-align:middle;text-align:center;\">" +
          "<div style=\"width:32px;height:32px;border-radius:6px;background:#EFF6FF;border:1px solid #BFDBFE;display:flex;align-items:center;justify-content:center;margin:0 auto;\">" +
            "<img src=\"" + fd.icon + "\" width=\"18\" height=\"18\" style=\"display:block;margin:auto;\"/>" +
          "</div>" +
        "</td>" +
        "<td style=\"vertical-align:middle;padding-left:6px;text-align:left;\">" +
          "<div style=\"font-size:10px;font-weight:700;color:#1E3A8A;line-height:1.2;\">" + fd.title + "</div>" +
          "<div style=\"font-size:7.5px;color:#475569;margin-top:1px;line-height:1.15;\">" + fd.desc + "</div>" +
        "</td>" +
      "</tr>" +
    "</table>";
    c.push("<mxCell id=\"fd_c_" + i + "\" value=\"" + E(html) + "\" style=\"rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#BFDBFE;strokeWidth=1;\" vertex=\"1\" parent=\"1\"><mxGeometry x=\"" + x + "\" y=\"794\" width=\"280\" height=\"70\" as=\"geometry\"/></mxCell>");
  });

  edge("e_main_to_found", "main_platform", "foundation_container", "", "#2563EB", false, "exitX=0.5;exitY=1;entryX=0.5;entryY=0;");

  // 7. LEGEND BOX (y: 890, h: 56, w: 1470)
  rect("legend_box", "", 20, 890, 1470, 56, "strokeColor=#CBD5E1;strokeWidth=1.2;fillColor=#F8FAFC;");
  
  const legendHtml = "<table style=\"width:100%;height:100%;text-align:left;margin-left:12px;\"><tr>" +
    "<td style=\"width:90px;vertical-align:middle;font-size:12px;font-weight:900;color:#0F172A;\">LEGEND</td>" +
    "<td style=\"vertical-align:middle;\">" +
      "<div style=\"display:flex;align-items:center;gap:24px;font-size:8.5px;color:#334155;\">" +
        "<div style=\"display:flex;align-items:center;gap:6px;\"><div style=\"width:18px;height:14px;border:1.5px solid #1D4ED8;background:#FFFFFF;border-radius:2px;\"></div><div><b>Business Capability</b> (Core business domain capabilities)</div></div>" +
        "<div style=\"display:flex;align-items:center;gap:6px;\"><div style=\"width:18px;height:14px;border:1.5px solid #0D9488;background:#F0FDFA;border-radius:2px;\"></div><div><b>Shared Foundation</b> (Enterprise-wide shared services)</div></div>" +
        "<div style=\"display:flex;align-items:center;gap:6px;\"><div style=\"width:18px;height:14px;border:1.5px solid #8B5CF6;background:#FAF5FF;border-radius:2px;\"></div><div><b>Governance / Control</b> (Oversight, compliance and security)</div></div>" +
        "<div style=\"display:flex;align-items:center;gap:6px;\"><img src=\"https://api.iconify.design/lucide:sparkles.svg?color=%237C3AED\" width=\"14\" height=\"14\"/><div><b>AI-Enabled Capability</b> (Leveraging AI to drive outcomes)</div></div>" +
      "</div>" +
    "</td>" +
  "</tr></table>";
  text("legend_content", legendHtml, 25, 892, 1450, 50, "align=left;");

  return "<mxGraphModel dx=\"1600\" dy=\"1000\" grid=\"1\" gridSize=\"10\" guides=\"1\" tooltips=\"1\" connect=\"1\" arrows=\"1\" fold=\"1\" page=\"1\" pageScale=\"1\" pageWidth=\"1520\" pageHeight=\"980\" background=\"" + bg + "\"><root><mxCell id=\"0\"/><mxCell id=\"1\" parent=\"0\"/>" + c.join("\n") + "</root></mxGraphModel>";
}
