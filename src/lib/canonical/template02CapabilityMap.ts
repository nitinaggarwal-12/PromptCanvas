/**
 * Master 1:1 Exact Replica Generator for Canonical Template 02: Capability Map
 * Matches 100% of images/02.png with proportional typography, high contrast & exact aspect ratio
 */

const E = (v?: string | null) =>
  (v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function generateTemplate02CapabilityMapXml(domainFlavor = "biopharma", theme: "light" | "dark" = "light"): string {
  const isDark = theme === "dark";
  const bg = isDark ? "#0B111E" : "#FFFFFF";
  const c: string[] = [];

  const rect = (id: string, v: string, x: number, y: number, w: number, h: number, s = "") =>
    c.push(`<mxCell id="${id}" value="${E(v)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;fontColor=#0F172A;fontSize=11;${s}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`);

  const text = (id: string, v: string, x: number, y: number, w: number, h: number, s = "") =>
    c.push(`<mxCell id="${id}" value="${E(v)}" style="text;html=1;strokeColor=none;fillColor=none;whiteSpace=wrap;fontColor=#0F172A;fontSize=11;verticalAlign=middle;${s}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`);

  const edge = (id: string, src: string, tgt: string, label = "", color = "#1D4ED8", dash = false, s = "") =>
    c.push(`<mxCell id="${id}" value="${E(label)}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${color};strokeWidth=1.8;endArrow=block;endFill=1;fontSize=8;fontColor=${color};fontStyle=1;${dash ? "dashed=1;dashPattern=6 4;" : ""}${s}" edge="1" parent="1" source="${src}" target="${tgt}"><mxGeometry relative="1" as="geometry"/></mxCell>`);

  // 1. TOP HEADER BANNER
  text("t1", "02 — Capability Map | NOVACURA Bio-Pharma Platform", 24, 16, 950, 28, "fontSize=24;fontStyle=1;align=left;fontColor=#0F172A;fontFamily=Inter,sans-serif;");
  text("t2", "Core Architecture Family | Bio-Pharma Product", 24, 46, 600, 20, "fontSize=13;fontStyle=1;fontColor=#475569;align=left;fontFamily=Inter,sans-serif;");

  // 2. TOP CONTAINER: USER / BUSINESS EXPERIENCE LAYER (x: 250, y: 72, w: 1040, h: 96)
  rect("exp_layer", "", 250, 72, 1040, 96, "strokeColor=#8B5CF6;strokeWidth=1.5;fillColor=#FAF5FF;shadow=0;");
  text("exp_title", "USER / BUSINESS EXPERIENCE LAYER", 590, 75, 360, 18, "fontSize=12;fontStyle=1;fontColor=#6D28D9;align=center;");

  const expCards = [
    { title: "Role-Based Portals", desc: "Tailored experiences for every\nrole and function", icon: "💻" },
    { title: "Workflow Experiences", desc: "Guided workflows that drive\nconsistency and speed", icon: "🔀" },
    { title: "Dashboards & Insights", desc: "Real-time KPIs, performance\nand operational visibility", icon: "📊" },
    { title: "Collaboration & Communication", desc: "Secure communication, tasks,\nand document collaboration", icon: "💬" },
  ];
  expCards.forEach((ec, i) => {
    const x = 265 + i * 254;
    const html = `<table style="width:100%;height:100%;border-collapse:collapse;">
      <tr>
        <td style="width:36px;vertical-align:middle;text-align:center;padding-left:4px;">
          <div style="width:32px;height:32px;border-radius:6px;background:#F5F3FF;border:1px solid #DDD6FE;display:flex;align-items:center;justify-content:center;margin:0 auto;">
            <span style="font-size:16px;">${ec.icon}</span>
          </div>
        </td>
        <td style="vertical-align:middle;padding-left:6px;text-align:left;">
          <div style="font-size:10.5px;font-weight:800;color:#4C1D95;line-height:1.2;">${ec.title}</div>
          <div style="font-size:8px;color:#475569;margin-top:2px;line-height:1.2;">${ec.desc.replace(/\n/g, "<br/>")}</div>
        </td>
      </tr>
    </table>`;
    c.push(`<mxCell id="exp_c_${i}" value="${E(html)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DDD6FE;strokeWidth=1;" vertex="1" parent="1"><mxGeometry x="${x}" y="96" width="242" height="62" as="geometry"/></mxCell>`);
  });

  // 3. LEFT COLUMN: BUSINESS OUTCOMES (x: 24, y: 72, w: 205, h: 630)
  rect("outcomes_container", "", 24, 72, 205, 630, "strokeColor=#3B82F6;strokeWidth=1.5;fillColor=#EFF6FF;shadow=0;");
  
  const outcomeHeaderHtml = `<div style="text-align:center;padding:4px;"><span style="font-size:16px;">🏆</span><div style="font-size:12px;font-weight:800;color:#1E40AF;margin-top:2px;">Business Outcomes</div></div>`;
  text("outcomes_hdr", outcomeHeaderHtml, 28, 76, 197, 36, "align=center;");

  const outcomes = [
    { title: "Faster submissions", desc: "Accelerate regulatory approvals with quality submissions.", icon: "🚀" },
    { title: "Improved trial execution", desc: "Optimize trials with better planning, monitoring and data.", icon: "📋" },
    { title: "Better signal detection", desc: "Detect safety signals earlier with integrated data and AI.", icon: "📡" },
    { title: "Stronger compliance", desc: "Ensure adherence to regulations and internal standards.", icon: "🛡️" },
    { title: "Reusable enterprise knowledge", desc: "Capture, standardize and reuse institutional knowledge.", icon: "📁" },
    { title: "Scalable automation", desc: "Automate processes to drive efficiency and reduce cost.", icon: "⚙️" },
  ];
  outcomes.forEach((o, i) => {
    const y = 118 + i * 95;
    const html = `<table style="width:100%;height:100%;border-collapse:collapse;">
      <tr>
        <td style="width:30px;vertical-align:top;padding-top:4px;text-align:center;">
          <span style="font-size:16px;">${o.icon}</span>
        </td>
        <td style="vertical-align:top;padding-left:4px;padding-top:2px;text-align:left;">
          <div style="font-size:10px;font-weight:800;color:#1E3A8A;line-height:1.2;">${o.title}</div>
          <div style="font-size:8px;color:#334155;margin-top:2px;line-height:1.2;">${o.desc}</div>
        </td>
      </tr>
    </table>`;
    c.push(`<mxCell id="out_c_${i}" value="${E(html)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#BFDBFE;strokeWidth=1.2;" vertex="1" parent="1"><mxGeometry x="32" y="${y}" width="189" height="85" as="geometry"/></mxCell>`);
  });

  // 4. RIGHT COLUMN: PRIMARY PERSONAS (x: 1315, y: 72, w: 220, h: 630)
  rect("personas_container", "", 1315, 72, 220, 630, "strokeColor=#16A34A;strokeWidth=1.5;fillColor=#F0FDF4;shadow=0;");
  
  const personaHeaderHtml = `<div style="text-align:center;padding:4px;"><span style="font-size:16px;">👥</span><div style="font-size:12px;font-weight:800;color:#15803D;margin-top:2px;">Primary Personas</div></div>`;
  text("personas_hdr", personaHeaderHtml, 1320, 76, 210, 36, "align=center;");

  const personas = [
    { title: "Research Scientists", icon: "🔬" },
    { title: "Clinical Ops", icon: "🩺" },
    { title: "Regulatory Affairs", icon: "⚖️" },
    { title: "Safety Specialists", icon: "🛡️" },
    { title: "Quality Teams", icon: "🏭" },
    { title: "Medical Affairs", icon: "💬" },
    { title: "Commercial Analytics", icon: "📊" },
    { title: "Platform Admins", icon: "⚙️" },
  ];
  personas.forEach((p, i) => {
    const y = 118 + i * 71;
    const html = `<table style="width:100%;height:100%;border-collapse:collapse;">
      <tr>
        <td style="width:34px;vertical-align:middle;text-align:center;padding-left:4px;">
          <span style="font-size:16px;">${p.icon}</span>
        </td>
        <td style="vertical-align:middle;padding-left:6px;text-align:left;">
          <div style="font-size:10px;font-weight:800;color:#14532D;">${p.title}</div>
        </td>
      </tr>
    </table>`;
    c.push(`<mxCell id="per_c_${i}" value="${E(html)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#BBF7D0;strokeWidth=1.2;" vertex="1" parent="1"><mxGeometry x="1327" y="${y}" width="196" height="60" as="geometry"/></mxCell>`);
  });

  // 5. CENTRAL CORE BUSINESS CAPABILITIES (x: 250, y: 180, w: 1040, h: 522)
  rect("core_container", "", 250, 180, 1040, 522, "strokeColor=#2563EB;strokeWidth=2;fillColor=#FFFFFF;shadow=1;");
  
  const coreLogoHtml = `<table style="margin:0 auto;text-align:center;">
    <tr>
      <td style="vertical-align:middle;padding-right:6px;"><span style="font-size:24px;">🧬</span></td>
      <td style="vertical-align:middle;text-align:left;">
        <div style="font-size:20px;font-weight:900;color:#0F2A4A;letter-spacing:1.5px;line-height:1;">NOVACURA Bio-Pharma Platform</div>
        <div style="font-size:10.5px;font-weight:800;color:#2563EB;letter-spacing:1px;margin-top:2px;">CORE BUSINESS CAPABILITIES</div>
      </td>
    </tr>
  </table>`;
  text("core_logo", coreLogoHtml, 420, 186, 700, 38, "align=center;");

  // Helper for capability box item
  const capBox = (id: string, num: string, title: string, items: Array<{ text: string; icon?: string }>, x: number, y: number, w: number, h: number, color = "#1D4ED8", bgTint = "#EFF6FF", isAi = false) => {
    let itemsHtml = "";
    items.forEach((it) => {
      const iconSpan = it.icon ? `<span style="font-size:11px;margin-right:4px;">${it.icon}</span>` : "";
      itemsHtml += `<div style="background:#FFFFFF;border:1px solid #E2E8F0;border-radius:4px;padding:4px 6px;margin-bottom:4px;font-size:8.5px;font-weight:600;color:#1E293B;display:flex;align-items:center;">${iconSpan}<span>${it.text}</span></div>`;
    });

    const aiBadge = isAi ? `<span style="font-size:10px;color:#7C3AED;margin-left:4px;">✨</span>` : "";

    const html = `<div style="padding:4px 6px;">
      <div style="display:flex;align-items:center;gap:4px;margin-bottom:6px;">
        <div style="width:18px;height:18px;border-radius:9px;background:${color};color:#FFFFFF;font-size:9.5px;font-weight:900;display:flex;align-items:center;justify-content:center;">${num}</div>
        <div style="font-size:10.5px;font-weight:800;color:${color};">${title} ${aiBadge}</div>
      </div>
      ${itemsHtml}
    </div>`;

    c.push(`<mxCell id="${id}" value="${E(html)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=${bgTint};strokeColor=${color};strokeWidth=1.2;align=left;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`);
  };

  // Top Row of 4 Core Capability Boxes (y: 228, h: 220)
  capBox("cap_1", "1", "Research & Discovery", [
    { text: "Target Identification", icon: "🎯" },
    { text: "Preclinical Data Management", icon: "🗄️" },
    { text: "Protocol Design", icon: "📋" },
    { text: "Study Planning", icon: "📅" },
  ], 262, 228, 245, 220, "#1E824C", "#F0FDF4");

  capBox("cap_2", "2", "Clinical Development", [
    { text: "Trial Design", icon: "🧪" },
    { text: "Site & Investigator Management", icon: "🏥" },
    { text: "Patient Recruitment & Enrollment", icon: "👥" },
    { text: "Clinical Data Capture", icon: "📊" },
    { text: "Monitoring & Oversight", icon: "🔍" },
  ], 517, 228, 248, 220, "#2563EB", "#EFF6FF");

  capBox("cap_3", "3", "Regulatory Affairs", [
    { text: "Submission Authoring", icon: "📄" },
    { text: "eCTD / IDMP Management", icon: "📁" },
    { text: "Health Authority Correspondence", icon: "🏛️" },
    { text: "Commitments & Variations", icon: "✅" },
  ], 775, 228, 248, 220, "#0D9488", "#F0FDFA");

  capBox("cap_4", "4", "Safety / Pharmacovigilance", [
    { text: "Case Intake", icon: "📥" },
    { text: "Signal Detection", icon: "📡" },
    { text: "Benefit-Risk Assessment", icon: "⚖️" },
    { text: "Safety Reporting", icon: "📊" },
  ], 1033, 228, 245, 220, "#7C3AED", "#FAF5FF");

  // Bottom Row of 4 Core Capability Boxes (y: 460, h: 230)
  capBox("cap_5", "5", "Quality & Manufacturing", [
    { text: "QMS / Deviations / CAPA", icon: "🛡️" },
    { text: "Batch Record Review", icon: "📑" },
    { text: "Change Control", icon: "🔄" },
    { text: "Product Release", icon: "📦" },
    { text: "Supplier Quality", icon: "🏭" },
  ], 262, 460, 245, 230, "#059669", "#F0FDF4");

  capBox("cap_6", "6", "Medical & Commercial", [
    { text: "Medical Information", icon: "💬" },
    { text: "Content & Evidence Management", icon: "📚" },
    { text: "Market Analytics", icon: "📈" },
    { text: "Forecasting & Performance Insights", icon: "📊" },
  ], 517, 460, 248, 230, "#0284C7", "#F0F9FF");

  capBox("cap_7", "7", "Knowledge, Data & AI Foundation", [
    { text: "Document & Knowledge Hub", icon: "📁" },
    { text: "Master Data & Reference Data", icon: "🗄️" },
    { text: "Data Lake / Warehouse", icon: "☁️" },
    { text: "Semantic Search / Vector Index", icon: "🕸️" },
    { text: "AI Copilot & Workflow Automation", icon: "✨" },
  ], 775, 460, 248, 230, "#6D28D9", "#FAF5FF", true);

  capBox("cap_8", "8", "Platform, Security & Operations", [
    { text: "Identity & Access Management", icon: "🔒" },
    { text: "Audit & Compliance", icon: "⚖️" },
    { text: "Data Lineage & Quality", icon: "🔍" },
    { text: "API & Interoperability Layer", icon: "🌐" },
    { text: "Monitoring & Support", icon: "🎧" },
    { text: "Tenant / Configuration Management", icon: "⚙️" },
  ], 1033, 460, 245, 230, "#334155", "#F8FAFC");

  // 6. BOTTOM CONTAINER: SHARED DIGITAL FOUNDATION (x: 24, y: 720, w: 1511, h: 96)
  rect("foundation_container", "", 24, 720, 1511, 96, "strokeColor=#0284C7;strokeWidth=1.5;fillColor=#F0F9FF;shadow=0;");
  text("found_title", "SHARED DIGITAL FOUNDATION", 625, 724, 310, 18, "fontSize=12;fontStyle=1;fontColor=#0369A1;align=center;");

  const foundationCards = [
    { title: "Integrations & Connectivity", desc: "Enterprise & partner systems,\nAPIs, data exchange and ecosystem", icon: "🔗" },
    { title: "Data Platform", desc: "Data lake, warehouse and\ncurated data products with governance", icon: "🗄️" },
    { title: "AI & Intelligent Services", desc: "AI models, copilots and\nintelligent services that enable automation", icon: "🧠" },
    { title: "Security & Compliance", desc: "Security-by-design, privacy,\ncompliance frameworks and risk", icon: "🛡️" },
    { title: "Operations & Resilience", desc: "Reliable, scalable operations\nwith monitoring, backup & DR", icon: "☁️" },
  ];
  foundationCards.forEach((fc, i) => {
    const x = 38 + i * 298;
    const html = `<table style="width:100%;height:100%;border-collapse:collapse;">
      <tr>
        <td style="width:36px;vertical-align:middle;text-align:center;padding-left:4px;">
          <div style="width:32px;height:32px;border-radius:6px;background:#E0F2FE;border:1px solid #BAE6FD;display:flex;align-items:center;justify-content:center;margin:0 auto;">
            <span style="font-size:16px;">${fc.icon}</span>
          </div>
        </td>
        <td style="vertical-align:middle;padding-left:6px;text-align:left;">
          <div style="font-size:10.5px;font-weight:800;color:#0369A1;line-height:1.2;">${fc.title}</div>
          <div style="font-size:8px;color:#475569;margin-top:2px;line-height:1.2;">${fc.desc.replace(/\n/g, "<br/>")}</div>
        </td>
      </tr>
    </table>`;
    c.push(`<mxCell id="found_c_${i}" value="${E(html)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#BAE6FD;strokeWidth=1;" vertex="1" parent="1"><mxGeometry x="${x}" y="746" width="286" height="60" as="geometry"/></mxCell>`);
  });

  // 7. LEGEND BOX (x: 24, y: 830, w: 1511, h: 44)
  rect("legend_box", "", 24, 830, 1511, 44, "strokeColor=#CBD5E1;strokeWidth=1.2;fillColor=#F8FAFC;");
  
  const legendHtml = `<table style="width:100%;height:100%;text-align:left;margin-left:12px;"><tr>
    <td style="width:80px;vertical-align:middle;font-size:11px;font-weight:900;color:#0F172A;">LEGEND</td>
    <td style="vertical-align:middle;">
      <div style="display:flex;align-items:center;gap:24px;font-size:9px;color:#334155;">
        <div style="display:flex;align-items:center;gap:6px;"><div style="width:18px;height:14px;border:1.5px solid #1D4ED8;background:#FFFFFF;border-radius:3px;"></div><div><b>Business Capability</b> (Core business domain capabilities)</div></div>
        <div style="display:flex;align-items:center;gap:6px;"><div style="width:18px;height:14px;border:1.5px solid #0D9488;background:#F0FDFA;border-radius:3px;"></div><div><b>Shared Foundation</b> (Enterprise-wide shared services)</div></div>
        <div style="display:flex;align-items:center;gap:6px;"><div style="width:18px;height:14px;border:1.5px solid #8B5CF6;background:#FAF5FF;border-radius:3px;"></div><div><b>Governance / Control</b> (Oversight, compliance and security)</div></div>
        <div style="display:flex;align-items:center;gap:6px;"><span style="font-size:14px;">✨</span><div><b>AI-Enabled Capability</b> (Leveraging AI to drive outcomes)</div></div>
      </div>
    </td>
  </tr></table>`;
  text("legend_content", legendHtml, 28, 832, 1500, 40, "align=left;");

  // 8. INTER-LAYER SINGLE CRISP CONNECTORS
  // Left: Core -> Outcomes (Arrow points LEFT into Outcomes)
  edge("e_core_to_outcomes", "core_container", "outcomes_container", "", "#2563EB", false, ";exitX=0;exitY=0.5;entryX=1;entryY=0.5;");
  // Right: Personas -> Core (Arrow points LEFT into Core)
  edge("e_personas_to_core", "personas_container", "core_container", "", "#16A34A", false, ";exitX=0;exitY=0.5;entryX=1;entryY=0.5;");
  // Top: Experience <-> Core (Bidirectional)
  c.push(`<mxCell id="e_exp_to_core" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#8B5CF6;strokeWidth=1.8;endArrow=classic;endFill=1;startArrow=classic;startFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="exp_layer" target="core_container"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  // Bottom: Foundation <-> Core (Bidirectional)
  c.push(`<mxCell id="e_found_to_core" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0284C7;strokeWidth=1.8;endArrow=classic;endFill=1;startArrow=classic;startFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="core_container" target="foundation_container"><mxGeometry relative="1" as="geometry"/></mxCell>`);

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_02_capability_map" name="02 — Capability Map">
    <mxGraphModel dx="1600" dy="1000" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="920" background="${bg}" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${c.join("\n        ")}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
