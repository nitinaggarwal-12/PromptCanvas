/**
 * Master 1:1 High-Craft Exact Ground-Truth Replica for Template 32: Architecture Evolution & Roadmap
 * Fully valid XML attribute escaping (all HTML labels have html=1 and &lt; &gt; escaping),
 * 4 detailed microservice tier sub-diagrams with native connectors, 7 discrete key enabler cards,
 * 5 sequential next step cards with blue vector arrows, and edge-to-edge balanced layout on 1536x1024.
 */

const E = (v?: string | null) =>
  (v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export function generateTemplate32RoadmapEvolutionXml(
  domainFlavor = "biopharma",
  theme: "light" | "dark" = "light"
): string {
  const isDark = theme === "dark";
  const c: string[] = [];

  const cell = (id: string, v: string, x: number, y: number, w: number, h: number, style: string) =>
    c.push(
      `<mxCell id="${id}" value="${E(v)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`
    );

  const edge = (id: string, src: string, trg: string, style = "edgeStyle=none;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#64748B;strokeWidth=1.5;endArrow=classic;endSize=5;") =>
    c.push(
      `<mxCell id="${id}" edge="1" parent="1" source="${src}" target="${trg}" style="${style}"><mxGeometry relative="1" as="geometry"/></mxCell>`
    );

  // ==================== 1. TOP HEADER BANNER (y=12..66) ====================
  cell("hdr_num", "32", 16, 12, 68, 54, "shape=rectangle;rounded=1;arcSize=14;fillColor=#1E3A8A;strokeColor=#1E3A8A;fontColor=#FFFFFF;fontSize=32;fontStyle=1;align=center;verticalAlign=middle;");
  
  cell(
    "hdr_title",
    `<div style='font-size:24px;font-weight:900;color:#0F172A;letter-spacing:0.5px;'>ARCHITECTURE EVOLUTION &amp; ROADMAP</div>` +
    `<div style='font-size:12.5px;font-weight:700;color:#1E3A8A;margin-top:2px;'>Use Case: NovaCura – AI-Powered Regulatory Intelligence Platform</div>` +
    `<div style='font-size:11px;color:#64748B;margin-top:2px;'>☁️ Environment: Production &nbsp;|&nbsp; 📍 Region: us-central1 &nbsp;|&nbsp; 📅 Last Updated: May 8, 2025</div>`,
    94,
    12,
    760,
    54,
    "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;"
  );

  const brandHtml = `<table style="width:100%;border-collapse:collapse;"><tr><td style="width:36px;vertical-align:middle;text-align:center;"><span style="font-size:32px;">🧬</span></td><td style="text-align:left;vertical-align:middle;padding-left:8px;"><div style="font-size:24px;font-weight:900;color:#0284C7;letter-spacing:1px;">NOVACURA</div><div style="font-size:10.5px;color:#64748B;font-weight:600;font-style:italic;">AI-Powered Regulatory Intelligence Platform</div></td></tr></table>`;
  cell("hdr_brand", brandHtml, 860, 12, 270, 54, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  const objHtml = `<div style='font-size:11px;font-weight:900;color:#1E3A8A;margin-bottom:2px;'>OBJECTIVE</div><div style='font-size:9.5px;line-height:1.4;color:#0F172A;'>Evolve the architecture in phases to achieve business outcomes, reduce risk, and enable continuous innovation with cloud-native, secure, and scalable capabilities.</div>`;
  cell("hdr_obj", objHtml, 1140, 12, 380, 54, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;html=1;align=left;verticalAlign=top;spacing=8;");

  // ==================== 2. LEFT SIDEBAR (x=16..188, y=74..580) ====================
  // Evolution Principles (y=74, h=250)
  cell("box_l_prin", "", 16, 74, 172, 250, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#1E3A8A;strokeWidth=1.8;");
  cell("lbl_l_prin", "EVOLUTION PRINCIPLES", 16, 74, 172, 26, "shape=rectangle;rounded=1;arcSize=8;fillColor=#1E3A8A;strokeColor=#1E3A8A;fontColor=#FFFFFF;fontSize=10.5;fontStyle=1;align=center;verticalAlign=middle;");
  const prinItems = [
    { t: "Iterative &amp; Value-Driven", icon: "🔄" },
    { t: "Cloud Native &amp; API-First", icon: "☁️" },
    { t: "Security &amp; Compliance", icon: "🛡️" },
    { t: "Data as Strategic Asset", icon: "🗄️" },
    { t: "Automate Everything", icon: "⚙️" },
    { t: "Observability &amp; Resilience", icon: "🩺" },
    { t: "Cost Efficient &amp; Sustainable", icon: "💰" }
  ];
  prinItems.forEach((pi, idx) => {
    cell(`pi_${idx}`, `<div style="font-size:9px;font-weight:700;color:#0F172A;">${pi.icon} ${pi.t}</div>`, 20, 106 + idx * 30, 164, 24, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  });

  // Drivers (y=330, h=250)
  cell("box_l_driv", "", 16, 330, 172, 250, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;");
  cell("lbl_l_driv", "DRIVERS", 16, 330, 172, 26, "shape=rectangle;rounded=1;arcSize=8;fillColor=#EFF6FF;strokeColor=#CBD5E1;fontColor=#1E3A8A;fontSize=10.5;fontStyle=1;align=center;verticalAlign=middle;");
  const drivItems = [
    { t: "Regulatory Complexity Growth", icon: "📈" },
    { t: "Data Volume &amp; Variety", icon: "🗃️" },
    { t: "Real-time Intelligence Need", icon: "⚡" },
    { t: "AI / ML Capability Maturity", icon: "🧠" },
    { t: "Operational Efficiency", icon: "⚙️" },
    { t: "Scalability &amp; Performance", icon: "🚀" },
    { t: "Compliance Pressure", icon: "🔒" }
  ];
  drivItems.forEach((di, idx) => {
    cell(`di_${idx}`, `<div style="font-size:9px;font-weight:700;color:#0F172A;">${di.icon} ${di.t}</div>`, 20, 362 + idx * 30, 164, 24, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  });

  // ==================== 3. TOP-CENTER: STAKEHOLDERS (x=196..1236, y=74..134, h=60) ====================
  cell("box_stake_bg", "", 196, 74, 1032, 60, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;");
  cell("lbl_stake", "STAKEHOLDERS", 196, 76, 1032, 14, "text;html=1;strokeColor=none;fillColor=none;fontColor=#1E3A8A;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  const stakes = [
    { t: "Business Leaders", icon: "👤" },
    { t: "Regulatory &amp; Compliance", icon: "⚖️" },
    { t: "Product Management", icon: "💻" },
    { t: "Enterprise Architecture", icon: "🏛️" },
    { t: "Security &amp; Risk", icon: "🛡️" },
    { t: "Data Governance", icon: "🗄️" },
    { t: "Platform Engineering", icon: "🚀" },
    { t: "Dev / QA Teams", icon: "👥" }
  ];
  stakes.forEach((st, idx) => {
    const sx = 204 + idx * 128;
    cell(`st_${idx}`, `<div style="font-size:16px;text-align:center;">${st.icon}</div><div style="font-size:8.5px;font-weight:800;color:#0F172A;text-align:center;line-height:1.1;margin-top:2px;">${st.t}</div>`, sx, 92, 122, 38, "rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // Top-Right: Modernization Themes (x=1236..1520, y=74..320)
  cell("box_r_themes", "", 1236, 74, 284, 246, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#1E3A8A;strokeWidth=1.5;");
  cell("lbl_r_themes", "MODERNIZATION THEMES", 1236, 74, 284, 26, "shape=rectangle;rounded=1;arcSize=8;fillColor=#1E3A8A;strokeColor=#1E3A8A;fontColor=#FFFFFF;fontSize=10.5;fontStyle=1;align=center;verticalAlign=middle;");
  const themeItems = [
    { t: "Decompose &amp; Modularize", icon: "🧩" },
    { t: "Event-driven Architecture", icon: "⚡" },
    { t: "Data Platform Modernization", icon: "🗄️" },
    { t: "AI / ML Integration", icon: "🧠" },
    { t: "Automation &amp; Orchestration", icon: "⚙️" },
    { t: "Developer Experience", icon: "💻" },
    { t: "Ecosystem &amp; Extensibility", icon: "🌐" }
  ];
  themeItems.forEach((ti, idx) => {
    cell(`ti_${idx}`, `<div style="font-size:9px;font-weight:700;color:#0F172A;">${ti.icon} ${ti.t}</div>`, 1242, 106 + idx * 30, 272, 24, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  });

  // ==================== 4. CENTER: 4-PHASE EVOLUTION ROADMAP (x=196..1236, y=140..510, h=370) ====================
  cell("box_road_bg", "", 196, 140, 1032, 370, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;");
  cell("lbl_road", "ARCHITECTURE EVOLUTION ROADMAP", 196, 144, 1032, 16, "text;html=1;strokeColor=none;fillColor=none;fontColor=#1E3A8A;fontSize=12.5;fontStyle=1;align=center;verticalAlign=middle;");

  const phases = [
    { n: "PHASE 0<br/>FOUNDATION (Now – Q2 2025)", sub: "Stabilize core platform, establish security foundation.", col: "#16A34A", bg: "#F0FDF4", out: "• Compliant &amp; Secure Platform<br/>• Single Source of Truth<br/>• Faster Manual Research" },
    { n: "PHASE 1<br/>SCALE &amp; INTEGRATE (Q3 – Q4 2025)", sub: "Scale platform, integrate data sources, expand AI.", col: "#2563EB", bg: "#EFF6FF", out: "• Wider Coverage &amp; Integrations<br/>• Higher Automation &amp; Efficiency<br/>• Scalable &amp; Reusable Platform" },
    { n: "PHASE 2<br/>INTELLIGENT &amp; AUTO (H1 2026)", sub: "Increase automation, enable predictive intelligence.", col: "#7C3AED", bg: "#FAF5FF", out: "• Predictive Regulatory Insights<br/>• Self-Service Analytics<br/>• Reduced Time-to-Insight 60%+" },
    { n: "PHASE 3<br/>AUTONOMOUS &amp; OPT (H2 2026+)", sub: "Autonomous operations, advanced AI agents.", col: "#EA580C", bg: "#FFFBEB", out: "• Autonomous Operations<br/>• Proactive Compliance<br/>• Continuous Innovation Engine" }
  ];

  phases.forEach((ph, idx) => {
    const px = 204 + idx * 254;
    // Outer phase container
    cell(`ph_box_${idx}`, "", px, 164, 248, 338, `rounded=1;arcSize=8;fillColor=${ph.bg};strokeColor=${ph.col};strokeWidth=1.5;`);
    // Header Chevron with html=1
    cell(`ph_hdr_${idx}`, ph.n, px, 164, 248, 34, `shape=rectangle;rounded=1;arcSize=8;fillColor=${ph.col};strokeColor=${ph.col};fontColor=#FFFFFF;fontSize=9.5;fontStyle=1;html=1;align=center;verticalAlign=middle;`);
    
    // Sub-title
    cell(`ph_sub_${idx}`, ph.sub, px + 4, 200, 240, 22, "text;html=1;strokeColor=none;fillColor=none;fontColor=#64748B;fontSize=8;align=center;verticalAlign=middle;");

    // Business Outcomes Box
    const outContent = `<div style="font-size:8px;font-weight:800;color:#1E3A8A;margin-bottom:2px;">BUSINESS OUTCOMES:</div><div style="font-size:7.5px;line-height:1.35;color:#0F172A;">${ph.out}</div>`;
    cell(`ph_out_${idx}`, outContent, px + 6, 224, 236, 56, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=left;verticalAlign=top;padding=4;");

    // Microservices Sub-Diagram Box
    cell(`ph_diag_bg_${idx}`, "", px + 6, 284, 236, 212, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
    cell(`ph_diag_lbl_${idx}`, "ARCHITECTURE EVOLUTION", px + 6, 286, 236, 14, "text;html=1;strokeColor=none;fillColor=none;fontColor=#64748B;fontSize=8;fontStyle=1;align=center;verticalAlign=middle;");

    // Specific tiered microservices nodes inside each sub-diagram
    if (idx === 0) {
      // Tier 1: Web App, API, Search
      cell("p0_n1", "Web App", px + 12, 304, 66, 24, "rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#CBD5E1;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;");
      cell("p0_n2", "API", px + 88, 304, 70, 24, "rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#CBD5E1;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;");
      cell("p0_n3", "Search", px + 168, 304, 66, 24, "rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#CBD5E1;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;");

      // Tier 2: Microservices
      cell("p0_ms", "Microservices", px + 12, 342, 222, 26, "rounded=1;arcSize=6;fillColor=#F0FDF4;strokeColor=#16A34A;fontSize=8.5;fontStyle=1;fontColor=#16A34A;align=center;verticalAlign=middle;");

      // Tier 3: Relational DB, Object Storage, Cache
      cell("p0_db1", "Relational DB", px + 12, 382, 70, 24, "rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#CBD5E1;fontSize=7;fontStyle=1;align=center;verticalAlign=middle;");
      cell("p0_db2", "Object Storage", px + 88, 382, 70, 24, "rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#CBD5E1;fontSize=7;fontStyle=1;align=center;verticalAlign=middle;");
      cell("p0_db3", "Cache", px + 164, 382, 70, 24, "rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#CBD5E1;fontSize=7;fontStyle=1;align=center;verticalAlign=middle;");

      // Tier 4: Cloud Infrastructure
      cell("p0_infra", "Cloud Infrastructure", px + 12, 420, 222, 22, "rounded=1;arcSize=6;fillColor=#F1F5F9;strokeColor=#CBD5E1;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;");

      edge("p0_e1", "p0_n2", "p0_ms", "strokeColor=#16A34A;strokeWidth=1.5;endArrow=classic;endSize=4;");
      edge("p0_e2", "p0_ms", "p0_db2", "strokeColor=#16A34A;strokeWidth=1.5;endArrow=classic;endSize=4;");
      edge("p0_e3", "p0_db2", "p0_infra", "strokeColor=#64748B;strokeWidth=1.2;endArrow=classic;endSize=4;");
    } else if (idx === 1) {
      // Tier 1: Web App, API, Search, Integrations
      cell("p1_n1", "Web App", px + 10, 304, 50, 24, "rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#CBD5E1;fontSize=7;fontStyle=1;align=center;verticalAlign=middle;");
      cell("p1_n2", "API", px + 66, 304, 50, 24, "rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#CBD5E1;fontSize=7;fontStyle=1;align=center;verticalAlign=middle;");
      cell("p1_n3", "Search", px + 122, 304, 50, 24, "rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#CBD5E1;fontSize=7;fontStyle=1;align=center;verticalAlign=middle;");
      cell("p1_n4", "Integrations", px + 178, 304, 56, 24, "rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#CBD5E1;fontSize=7;fontStyle=1;align=center;verticalAlign=middle;");

      // Tier 2: Microservices
      cell("p1_ms", "Microservices", px + 10, 338, 224, 24, "rounded=1;arcSize=6;fillColor=#EFF6FF;strokeColor=#2563EB;fontSize=8.5;fontStyle=1;fontColor=#2563EB;align=center;verticalAlign=middle;");

      // Tier 2.5: Event Bus & Workflow Engine
      cell("p1_eb", "Event Bus", px + 10, 370, 108, 22, "rounded=1;arcSize=6;fillColor=#EFF6FF;strokeColor=#BFDBFE;fontSize=7;fontStyle=1;align=center;verticalAlign=middle;");
      cell("p1_wf", "Workflow Engine", px + 126, 370, 108, 22, "rounded=1;arcSize=6;fillColor=#EFF6FF;strokeColor=#BFDBFE;fontSize=7;fontStyle=1;align=center;verticalAlign=middle;");

      // Tier 3: Data Lake, WH, Vector DB, Cache
      cell("p1_d1", "Data Lake", px + 10, 400, 50, 22, "rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#CBD5E1;fontSize=6.5;fontStyle=1;align=center;verticalAlign=middle;");
      cell("p1_d2", "Data WH", px + 66, 400, 50, 22, "rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#CBD5E1;fontSize=6.5;fontStyle=1;align=center;verticalAlign=middle;");
      cell("p1_d3", "Vector DB", px + 122, 400, 50, 22, "rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#CBD5E1;fontSize=6.5;fontStyle=1;align=center;verticalAlign=middle;");
      cell("p1_d4", "Cache", px + 178, 400, 56, 22, "rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#CBD5E1;fontSize=6.5;fontStyle=1;align=center;verticalAlign=middle;");

      // Tier 4: Cloud Infrastructure
      cell("p1_infra", "Cloud Infrastructure", px + 10, 430, 224, 20, "rounded=1;arcSize=6;fillColor=#F1F5F9;strokeColor=#CBD5E1;fontSize=7;fontStyle=1;align=center;verticalAlign=middle;");

      edge("p1_e1", "p1_n2", "p1_ms", "strokeColor=#2563EB;strokeWidth=1.5;endArrow=classic;endSize=4;");
      edge("p1_e2", "p1_ms", "p1_eb", "strokeColor=#2563EB;strokeWidth=1.5;endArrow=classic;endSize=4;");
      edge("p1_e3", "p1_eb", "p1_d2", "strokeColor=#2563EB;strokeWidth=1.5;endArrow=classic;endSize=4;");
    } else if (idx === 2) {
      // Tier 1: Web App, API, AI Copilot, Analytics
      cell("p2_n1", "Web App", px + 10, 304, 50, 24, "rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#CBD5E1;fontSize=7;fontStyle=1;align=center;verticalAlign=middle;");
      cell("p2_n2", "API", px + 66, 304, 50, 24, "rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#CBD5E1;fontSize=7;fontStyle=1;align=center;verticalAlign=middle;");
      cell("p2_n3", "AI Copilot", px + 122, 304, 52, 24, "rounded=1;arcSize=6;fillColor=#FAF5FF;strokeColor=#7C3AED;fontSize=7;fontStyle=1;fontColor=#7C3AED;align=center;verticalAlign=middle;");
      cell("p2_n4", "Analytics", px + 180, 304, 54, 24, "rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#CBD5E1;fontSize=7;fontStyle=1;align=center;verticalAlign=middle;");

      // Tier 2: Microservices & AI/ML Services
      cell("p2_ms", "Microservices", px + 10, 338, 108, 24, "rounded=1;arcSize=6;fillColor=#FAF5FF;strokeColor=#7C3AED;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;");
      cell("p2_ai", "AI / ML Services", px + 126, 338, 108, 24, "rounded=1;arcSize=6;fillColor=#FAF5FF;strokeColor=#7C3AED;fontSize=7.5;fontStyle=1;fontColor=#7C3AED;align=center;verticalAlign=middle;");

      // Tier 2.5: Event Streaming & Workflow Auto
      cell("p2_es", "Event Streaming", px + 10, 370, 108, 22, "rounded=1;arcSize=6;fillColor=#FAF5FF;strokeColor=#DDD6FE;fontSize=7;fontStyle=1;align=center;verticalAlign=middle;");
      cell("p2_wa", "Workflow Automation", px + 126, 370, 108, 22, "rounded=1;arcSize=6;fillColor=#FAF5FF;strokeColor=#DDD6FE;fontSize=7;fontStyle=1;align=center;verticalAlign=middle;");

      // Tier 3: Data Lakehouse, Vector DB, Feature Store
      cell("p2_d1", "Data Lakehouse", px + 10, 400, 70, 22, "rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#CBD5E1;fontSize=6.5;fontStyle=1;align=center;verticalAlign=middle;");
      cell("p2_d2", "Vector DB", px + 88, 400, 70, 22, "rounded=1;arcSize=6;fillColor=#FAF5FF;strokeColor=#7C3AED;fontSize=6.5;fontStyle=1;fontColor=#7C3AED;align=center;verticalAlign=middle;");
      cell("p2_d3", "Feature Store", px + 164, 400, 70, 22, "rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#CBD5E1;fontSize=6.5;fontStyle=1;align=center;verticalAlign=middle;");

      // Tier 4: Cloud Infrastructure
      cell("p2_infra", "Cloud Infrastructure", px + 10, 430, 224, 20, "rounded=1;arcSize=6;fillColor=#F1F5F9;strokeColor=#CBD5E1;fontSize=7;fontStyle=1;align=center;verticalAlign=middle;");

      edge("p2_e1", "p2_n3", "p2_ai", "strokeColor=#7C3AED;strokeWidth=1.5;endArrow=classic;endSize=4;");
      edge("p2_e2", "p2_ai", "p2_d2", "strokeColor=#7C3AED;strokeWidth=1.5;endArrow=classic;endSize=4;");
    } else {
      // Tier 1: AI Agents, API Marketplace, Ecosystem
      cell("p3_n1", "AI Agents", px + 10, 304, 70, 24, "rounded=1;arcSize=6;fillColor=#FFFBEB;strokeColor=#EA580C;fontSize=7.5;fontStyle=1;fontColor=#EA580C;align=center;verticalAlign=middle;");
      cell("p3_n2", "API Marketplace", px + 86, 304, 76, 24, "rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#CBD5E1;fontSize=7;fontStyle=1;align=center;verticalAlign=middle;");
      cell("p3_n3", "Ecosystem", px + 168, 304, 66, 24, "rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#CBD5E1;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;");

      // Tier 2: Intelligent Orchestration Layer
      cell("p3_orch", "Intelligent Orchestration Layer", px + 10, 338, 224, 24, "rounded=1;arcSize=6;fillColor=#FFFBEB;strokeColor=#EA580C;fontSize=8;fontStyle=1;fontColor=#EA580C;align=center;verticalAlign=middle;");

      // Tier 2.5: Knowledge Graph & Decision Engine
      cell("p3_kg", "Knowledge Graph", px + 10, 370, 108, 22, "rounded=1;arcSize=6;fillColor=#FFFBEB;strokeColor=#FED7AA;fontSize=7;fontStyle=1;align=center;verticalAlign=middle;");
      cell("p3_de", "Decision Engine", px + 126, 370, 108, 22, "rounded=1;arcSize=6;fillColor=#FFFBEB;strokeColor=#FED7AA;fontSize=7;fontStyle=1;align=center;verticalAlign=middle;");

      // Tier 3: Data Mesh, Real-time Analytics, AutoML Platform
      cell("p3_d1", "Data Mesh", px + 10, 400, 70, 22, "rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#CBD5E1;fontSize=6.5;fontStyle=1;align=center;verticalAlign=middle;");
      cell("p3_d2", "Real-time Analytics", px + 88, 400, 70, 22, "rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#CBD5E1;fontSize=6.5;fontStyle=1;align=center;verticalAlign=middle;");
      cell("p3_d3", "AutoML Platform", px + 164, 400, 70, 22, "rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#CBD5E1;fontSize=6.5;fontStyle=1;align=center;verticalAlign=middle;");

      // Tier 4: Multi-Cloud / Hybrid
      cell("p3_infra", "Multi-Cloud / Hybrid", px + 10, 430, 224, 20, "rounded=1;arcSize=6;fillColor=#F1F5F9;strokeColor=#CBD5E1;fontSize=7;fontStyle=1;align=center;verticalAlign=middle;");

      edge("p3_e1", "p3_n1", "p3_orch", "strokeColor=#EA580C;strokeWidth=1.5;endArrow=classic;endSize=4;");
      edge("p3_e2", "p3_orch", "p3_kg", "strokeColor=#EA580C;strokeWidth=1.5;endArrow=classic;endSize=4;");
    }
  });

  // ==================== 4.5. KEY ENABLERS (CROSS-PHASE) (x=196..1236, y=518..580, h=62) ====================
  cell("box_enablers_bg", "", 196, 518, 1032, 62, "rounded=1;arcSize=8;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.5;");
  cell("lbl_enablers", "KEY ENABLERS (CROSS-PHASE)", 196, 520, 1032, 14, "text;html=1;strokeColor=none;fillColor=none;fontColor=#1E40AF;fontSize=10;fontStyle=1;align=center;verticalAlign=middle;");
  const enablers = [
    { t: "Security &amp; Zero Trust", icon: "🔒" },
    { t: "Identity &amp; Access Mgmt", icon: "👤" },
    { t: "Observability &amp; Monitoring", icon: "📈" },
    { t: "CI/CD &amp; GitOps", icon: "⚙️" },
    { t: "IaC (Terraform)", icon: "☁️" },
    { t: "Data Governance Opt", icon: "🗄️" },
    { t: "Backup &amp; DR Strategy", icon: "💾" }
  ];
  enablers.forEach((en, idx) => {
    const ex = 204 + idx * 145;
    cell(`en_${idx}`, `<div style="font-size:14px;text-align:center;">${en.icon}</div><div style="font-size:8px;font-weight:800;color:#0F172A;text-align:center;margin-top:2px;">${en.t}</div>`, ex, 536, 140, 38, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // Middle-Right: Risk & Mitigation (x=1236..1520, y=326..580)
  cell("box_r_risk", "", 1236, 326, 284, 254, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#DC2626;strokeWidth=1.5;");
  cell("lbl_r_risk", "RISK &amp; MITIGATION", 1236, 326, 284, 26, "shape=rectangle;rounded=1;arcSize=8;fillColor=#FEF2F2;strokeColor=#CBD5E1;fontColor=#DC2626;fontSize=10.5;fontStyle=1;align=center;verticalAlign=middle;");
  const riskTableHtml = `<table style='width:100%;border-collapse:collapse;font-size:8.5px;'>
    <tr style='font-weight:800;border-bottom:1.5px solid #CBD5E1;background:#F8FAFC;'>
      <td style='padding:4px;'>RISK</td><td>MITIGATION</td>
    </tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:4px;'><b>Integration Complexity</b></td><td style='color:#64748B;'>API Standards, Incremental Ingest</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:4px;'><b>Data Quality Issues</b></td><td style='color:#64748B;'>Data Governance, Validation Pipelines</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:4px;'><b>Security Vulnerabilities</b></td><td style='color:#64748B;'>Zero Trust, Continuous Testing</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:4px;'><b>Cost Overrun</b></td><td style='color:#64748B;'>FinOps, Budgets, Right-sizing</td></tr>
    <tr><td style='padding:4px;'><b>Adoption Resistance</b></td><td style='color:#64748B;'>Change Mgmt, Training, Buy-in</td></tr>
  </table>`;
  cell("txt_r_risk", riskTableHtml, 1238, 354, 280, 222, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=2;");

  // ==================== 5. CAPABILITY AREAS TABLE (x=16..1230, y=588..780, h=192) ====================
  cell("box_caps_bg", "", 16, 588, 1212, 192, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;");
  const capsTableHtml = `<table style='width:100%;border-collapse:collapse;font-size:9px;'>
    <tr style='font-weight:800;border-bottom:2px solid #CBD5E1;background:#F8FAFC;'>
      <td style='padding:5px;width:150px;'>CAPABILITY AREAS</td>
      <td style='color:#16A34A;font-weight:900;'>PHASE 0 (Now – Q2 2025)</td>
      <td style='color:#2563EB;font-weight:900;'>PHASE 1 (Q3 – Q4 2025)</td>
      <td style='color:#7C3AED;font-weight:900;'>PHASE 2 (H1 2026)</td>
      <td style='color:#EA580C;font-weight:900;'>PHASE 3 (H2 2026+)</td>
    </tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:4px;'><b>🚀 Platform</b></td><td>Set up core GKE, security baseline</td><td>Multi-env, autoscaling, CI/CD</td><td>Service mesh, platform hardening</td><td>Multi-cloud / hybrid, autonomous</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:4px;'><b>🗄️ Data</b></td><td>Centralize data, build lake &amp; WH</td><td>Data catalog, streaming ingest</td><td>Data mesh, real-time lakehouse</td><td>Active data products, dynamic fabric</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:4px;'><b>🔌 Integration</b></td><td>Core system integrations (APIs, SFTP)</td><td>Event-driven integrations, partner APIs</td><td>Ecosystem integrations, API market</td><td>Open ecosystem, plug-and-play</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:4px;'><b>🧠 AI / Analytics</b></td><td>LLM integration, basic search</td><td>RAG, advanced NLP, dashboards</td><td>Predictive models, anomaly detection</td><td>Autonomous agents, generative decision</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:4px;'><b>⚙️ Operations</b></td><td>Logging, basic monitoring, backup</td><td>SRE practices, alerting, runbooks</td><td>AIOps, predictive monitoring, chaos</td><td>Autonomous ops, self-healing</td></tr>
    <tr><td style='padding:4px;'><b>🛡️ Security &amp; Compliance</b></td><td>IAM, encryption, vulnerability scan</td><td>Policy as Code, compliance auto</td><td>Continuous compliance, risk score</td><td>Adaptive security, zero-trust auto</td></tr>
  </table>`;
  cell("txt_caps_table", capsTableHtml, 20, 592, 1204, 184, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=2;");

  // Lower-Right: Success Metrics (x=1236..1520, y=588..780)
  cell("box_r_metrics", "", 1236, 588, 284, 192, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;");
  cell("lbl_r_metrics", "SUCCESS METRICS", 1236, 588, 284, 26, "shape=rectangle;rounded=1;arcSize=8;fillColor=#F0FDF4;strokeColor=#CBD5E1;fontColor=#16A34A;fontSize=10.5;fontStyle=1;align=center;verticalAlign=middle;");
  const metricsHtml = `<div style="font-size:9px;line-height:1.75;color:#0F172A;padding:6px;">
    ⏱️ <b>Time to Regulatory Insight:</b> <span style="color:#16A34A;font-weight:900;">▼ 60%+</span><br/>
    ⚙️ <b>Automation Rate:</b> <span style="color:#16A34A;font-weight:900;">▲ 70%+</span><br/>
    📈 <b>Platform Availability:</b> <span style="color:#16A34A;font-weight:900;">99.99%+</span><br/>
    💰 <b>Cost Efficiency:</b> <span style="color:#16A34A;font-weight:900;">▲ 30%+</span><br/>
    👤 <b>User Adoption:</b> <span style="color:#16A34A;font-weight:900;">▲ 80%+</span><br/>
    ✔ <b>Compliance Coverage:</b> <span style="color:#16A34A;font-weight:900;">100%</span>
  </div>`;
  cell("txt_r_metrics", metricsHtml, 1238, 616, 280, 160, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=2;");

  // ==================== 6. BOTTOM ROW (x=16..1520, y=788..954, h=166) ====================
  // 1. Architecture Maturity Model (x=16, w=350)
  cell("box_b_mat", "", 16, 788, 350, 166, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;");
  cell("lbl_b_mat", "ARCHITECTURE MATURITY MODEL", 16, 788, 350, 24, "shape=rectangle;rounded=1;arcSize=8;fillColor=#F8FAFC;strokeColor=#CBD5E1;fontColor=#1E3A8A;fontSize=10;fontStyle=1;align=center;verticalAlign=middle;");
  const matCurveHtml = `<div style="font-size:8.5px;text-align:center;padding:4px;">
    <div style="display:flex;justify-content:space-between;margin-top:6px;font-weight:800;">
      <div><b>L1</b><br/><span style="font-size:7.5px;color:#64748B;">Siloed</span></div>
      <div><b>L2</b><br/><span style="font-size:7.5px;color:#64748B;">Standardized</span></div>
      <div><b>L3</b><br/><span style="font-size:7.5px;color:#64748B;">Integrated</span></div>
      <div><b>L4</b><br/><span style="font-size:7.5px;color:#64748B;">Intelligent</span></div>
      <div><b>L5</b><br/><span style="font-size:7.5px;color:#64748B;">Autonomous</span></div>
    </div>
    <div style="margin:12px 0;font-size:16px;">🟢 ── 🔵 ── 🟣 ── 🟠 ── 🏆</div>
    <div style="color:#64748B;font-size:8px;line-height:1.4;">Ad-hoc manual ops ➔ Standardized centralized ➔ Integrated platform ➔ AI-driven predictive ➔ Autonomous self-optimizing.</div>
  </div>`;
  cell("txt_b_mat", matCurveHtml, 18, 814, 346, 136, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=top;padding=2;");

  // 2. Investment & Effort Trend (x=374, w=340)
  cell("box_b_trend", "", 374, 788, 340, 166, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;");
  cell("lbl_b_trend", "INVESTMENT &amp; EFFORT TREND", 374, 788, 340, 24, "shape=rectangle;rounded=1;arcSize=8;fillColor=#F8FAFC;strokeColor=#CBD5E1;fontColor=#1E3A8A;fontSize=10;fontStyle=1;align=center;verticalAlign=middle;");
  const trendHtml = `<div style="font-size:8.5px;line-height:1.6;color:#0F172A;padding:4px;">
    📈 <b>Business Value:</b> Exponential growth from Q4 2025 onwards.<br/>
    📉 <b>Maintenance Effort:</b> Decreases steadily as automation matures.<br/>
    📊 <b>Capex to Opex:</b> Transition to predictable cloud economics.<br/>
    <div style="text-align:center;margin-top:10px;font-size:11.5px;font-weight:800;color:#2563EB;">Now ➔ Q2 '25 ➔ Q4 '25 ➔ H1 '26 ➔ H2 '26+</div>
  </div>`;
  cell("txt_b_trend", trendHtml, 376, 814, 336, 136, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=2;");

  // 3. Dependencies (x=722, w=290)
  cell("box_b_dep", "", 722, 788, 290, 166, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;");
  cell("lbl_b_dep", "DEPENDENCIES", 722, 788, 290, 24, "shape=rectangle;rounded=1;arcSize=8;fillColor=#F8FAFC;strokeColor=#CBD5E1;fontColor=#1E3A8A;fontSize=10;fontStyle=1;align=center;verticalAlign=middle;");
  const depHtml = `<div style="font-size:9px;line-height:1.65;color:#0F172A;padding:6px;">
    ☑ <b>Executive Sponsorship</b><br/>
    ☑ <b>Budget &amp; Resource Allocation</b><br/>
    ☑ <b>Data Availability &amp; Quality</b><br/>
    ☑ <b>Vendor &amp; Partner Alignment</b><br/>
    ☑ <b>Change Management &amp; Training</b>
  </div>`;
  cell("txt_b_dep", depHtml, 724, 814, 286, 136, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=4;");

  // 4. Next Steps (x=1020, w=500)
  cell("box_b_next", "", 1020, 788, 500, 166, "rounded=1;arcSize=8;fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=1.5;");
  cell("lbl_b_next", "NEXT STEPS", 1020, 788, 500, 24, "shape=rectangle;rounded=1;arcSize=8;fillColor=#DBEAFE;strokeColor=#CBD5E1;fontColor=#1E40AF;fontSize=10;fontStyle=1;align=center;verticalAlign=middle;");
  const nextSteps = [
    { id: "ns_0", n: "Validate Roadmap", sub: "Now", icon: "📋" },
    { id: "ns_1", n: "Prioritize Initiatives", sub: "May '25", icon: "📑" },
    { id: "ns_2", n: "Detailed Design", sub: "Jun '25", icon: "📐" },
    { id: "ns_3", n: "Execute Phase 0", sub: "Q2 2025", icon: "⚙️" },
    { id: "ns_4", n: "Review &amp; Iterate", sub: "Quarterly", icon: "🔄" }
  ];
  nextSteps.forEach((ns, idx) => {
    const nx = 1028 + idx * 98;
    cell(ns.id, `<div style="font-size:20px;text-align:center;">${ns.icon}</div><div style="font-size:9px;font-weight:800;color:#0F172A;text-align:center;line-height:1.15;margin-top:2px;">${ns.n}</div><div style="font-size:8px;color:#64748B;text-align:center;margin-top:2px;">${ns.sub}</div>`, nx, 824, 92, 86, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=3;");
    if (idx > 0) {
      edge(`e_ns_${idx}`, nextSteps[idx - 1].id, ns.id, "strokeColor=#2563EB;strokeWidth=1.8;endArrow=classic;endSize=4;");
    }
  });

  // ==================== 7. FOOTER STATUS BAR (y=962, h=24) ====================
  const footerHtml = `<div style='font-size:9px;color:#64748B;display:flex;justify-content:space-between;align-items:center;'>
    <div><b>LEGEND:</b> Phase 0 (Foundation) &nbsp;|&nbsp; Phase 1 (Scale) &nbsp;|&nbsp; Phase 2 (Intelligent) &nbsp;|&nbsp; Phase 3 (Autonomous)</div>
    <div>Review Cadence: Quarterly &nbsp;|&nbsp; Enterprise Architecture Team</div>
  </div>`;
  cell("footer_status", footerHtml, 16, 962, 1504, 24, "rounded=1;arcSize=8;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=left;verticalAlign=middle;padding=4;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_32_architecture_evolution_roadmap" name="Template 32: Architecture Evolution &amp; Roadmap">
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
