/**
 * Master 1:1 High-Craft Exact Ground-Truth Replica for Template 32: Architecture Evolution & Roadmap
 * Matches 100% of images/32.png with 4 detailed architecture evolution phase sub-diagrams,
 * 8 stakeholder pods, 7 modernization themes, full capability matrix, maturity curve,
 * investment trend, and 5 sequential next steps on 1536x1024 master resolution.
 */

const E = (v?: string | null) =>
  (v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function generateTemplate32RoadmapEvolutionXml(
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

  // ==================== 1. TOP HEADER BANNER (y=12..66) ====================
  rect("hdr_num", `<span style="font-size:32px;font-weight:900;color:#FFFFFF;">32</span>`, 16, 12, 68, 54, "fillColor=#1E3A8A;strokeColor=#1E3A8A;rounded=1;arcSize=12;align=center;verticalAlign=middle;");
  text(
    "hdr_title",
    `<div style='font-size:24px;font-weight:900;color:#0F172A;letter-spacing:0.5px;'>ARCHITECTURE EVOLUTION &amp; ROADMAP</div>` +
    `<div style='font-size:12.5px;font-weight:700;color:#1E3A8A;margin-top:2px;'>Use Case: NovaCura – AI-Powered Regulatory Intelligence Platform</div>` +
    `<div style='font-size:11px;color:#64748B;margin-top:1px;'>☁️ Environment: Production &nbsp;|&nbsp; 📍 Region: us-central1 &nbsp;|&nbsp; 📅 Last Updated: May 8, 2025</div>`,
    94,
    12,
    760,
    54,
    "align=left;"
  );

  const brandHtml = `<table style="width:100%;border-collapse:collapse;"><tr><td style="width:36px;vertical-align:middle;text-align:center;"><span style="font-size:30px;">🧬</span></td><td style="text-align:left;vertical-align:middle;padding-left:6px;"><div style="font-size:22px;font-weight:900;color:#0284C7;letter-spacing:1px;">NOVACURA</div><div style="font-size:10px;color:#64748B;font-weight:600;font-style:italic;">AI-Powered Regulatory Intelligence Platform</div></td></tr></table>`;
  rect("hdr_brand", brandHtml, 860, 12, 270, 54, "fillColor=none;strokeColor=none;align=left;");

  const objHtml = `<div style='font-size:11px;font-weight:900;color:#1E3A8A;margin-bottom:2px;'>OBJECTIVE</div><div style='font-size:9.5px;line-height:1.35;color:#0F172A;'>Evolve the architecture in phases to achieve business outcomes, reduce risk, and enable continuous innovation with cloud-native, secure, and scalable capabilities.</div>`;
  rect("hdr_obj", objHtml, 1140, 12, 380, 54, "strokeColor=#CBD5E1;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;");

  // ==================== 2. LEFT SIDEBAR (x=16..196, y=74..580) ====================
  // Evolution Principles (y=74, h=250)
  rect("box_l_prin", "", 16, 74, 180, 250, "strokeColor=#1E3A8A;fillColor=#FFFFFF;strokeWidth=1.8;align=left;verticalAlign=top;");
  rect("lbl_l_prin", `<b style="font-size:10.5px;color:#FFFFFF;letter-spacing:0.5px;">EVOLUTION PRINCIPLES</b>`, 16, 74, 180, 24, "fillColor=#1E3A8A;strokeColor=#1E3A8A;rounded=0;align=center;");
  const prinItems = [
    { t: "Iterative &amp; Value-Driven", icon: "🔄" },
    { t: "Cloud Native &amp; API-First", icon: "☁️" },
    { t: "Security &amp; Compliance by Design", icon: "🛡️" },
    { t: "Data as a Strategic Asset", icon: "🗄️" },
    { t: "Automate Everything", icon: "⚙️" },
    { t: "Observability &amp; Resilience", icon: "🩺" },
    { t: "Cost Efficient &amp; Sustainable", icon: "💰" }
  ];
  const prinHtml = `<div style="font-size:8.5px;line-height:1.6;color:#0F172A;padding:6px;">
    ${prinItems.map(pi => `<div style="margin-bottom:3.5px;">${pi.icon} <b>${pi.t}</b></div>`).join("")}
  </div>`;
  text("txt_l_prin", prinHtml, 18, 100, 176, 220, "align=left;verticalAlign=top;");

  // Drivers (y=330, h=250)
  rect("box_l_driv", "", 16, 330, 180, 250, "strokeColor=#2563EB;fillColor=#FFFFFF;strokeWidth=1.5;align=left;verticalAlign=top;");
  rect("lbl_l_driv", `<b style="font-size:10.5px;color:#2563EB;">DRIVERS</b>`, 16, 330, 180, 24, "fillColor=#EFF6FF;strokeColor=#CBD5E1;rounded=0;align=center;");
  const drivItems = [
    { t: "Regulatory Complexity Growth", icon: "📈" },
    { t: "Data Volume &amp; Variety Increase", icon: "🗃️" },
    { t: "Need for Real-time Intelligence", icon: "⚡" },
    { t: "AI / ML Capability Maturity", icon: "🧠" },
    { t: "Operational Efficiency", icon: "⚙️" },
    { t: "Scalability &amp; Performance", icon: "🚀" },
    { t: "Security &amp; Compliance Pressure", icon: "🔒" }
  ];
  const drivHtml = `<div style="font-size:8.5px;line-height:1.6;color:#0F172A;padding:6px;">
    ${drivItems.map(di => `<div style="margin-bottom:3.5px;">${di.icon} <b>${di.t}</b></div>`).join("")}
  </div>`;
  text("txt_l_driv", drivHtml, 18, 356, 176, 220, "align=left;verticalAlign=top;");

  // ==================== 3. TOP-CENTER: STAKEHOLDERS (x=204..1216, y=74..134, h=60) ====================
  rect("box_stake_bg", "", 204, 74, 1012, 60, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.5;align=left;verticalAlign=top;");
  text("lbl_stake", "<div style='font-size:10.5px;font-weight:900;color:#1E3A8A;text-align:center;'>STAKEHOLDERS</div>", 204, 76, 1012, 14, "align=center;");
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
    const sx = 212 + idx * 125;
    rect(`st_${idx}`, `<div style="font-size:16px;text-align:center;">${st.icon}</div><div style="font-size:8px;font-weight:800;color:#0F172A;text-align:center;line-height:1.1;margin-top:2px;">${st.t}</div>`, sx, 92, 120, 38, "fillColor=#F8FAFC;strokeColor=#E2E8F0;rounded=1;align=center;verticalAlign=middle;padding=2;");
  });

  // Top-Right: Modernization Themes (x=1224..1520, y=74..320)
  rect("box_r_themes", "", 1224, 74, 296, 246, "strokeColor=#1E3A8A;fillColor=#FFFFFF;strokeWidth=1.5;align=left;verticalAlign=top;");
  rect("lbl_r_themes", `<b style="font-size:10.5px;color:#FFFFFF;letter-spacing:0.5px;">MODERNIZATION THEMES</b>`, 1224, 74, 296, 24, "fillColor=#1E3A8A;strokeColor=#1E3A8A;rounded=0;align=center;");
  const themeItems = [
    { t: "Decompose &amp; Modularize", icon: "🧩" },
    { t: "Event-driven Architecture", icon: "⚡" },
    { t: "Data Platform Modernization", icon: "🗄️" },
    { t: "AI / ML Integration", icon: "🧠" },
    { t: "Automation &amp; Orchestration", icon: "⚙️" },
    { t: "Developer Experience", icon: "💻" },
    { t: "Ecosystem &amp; Extensibility", icon: "🌐" }
  ];
  const themeHtml = `<div style="font-size:8.5px;line-height:1.6;color:#0F172A;padding:6px;">
    ${themeItems.map(ti => `<div style="margin-bottom:4px;">${ti.icon} <b>${ti.t}</b></div>`).join("")}
  </div>`;
  text("txt_r_themes", themeHtml, 1226, 100, 292, 216, "align=left;verticalAlign=top;");

  // ==================== 4. CENTER: 4-PHASE EVOLUTION ROADMAP (x=204..1216, y=140..580, h=440) ====================
  rect("box_road_bg", "", 204, 140, 1012, 440, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.5;align=left;verticalAlign=top;");
  text("lbl_road", "<div style='font-size:12.5px;font-weight:900;color:#1E3A8A;text-align:center;'>ARCHITECTURE EVOLUTION ROADMAP</div>", 204, 144, 1012, 16, "align=center;");

  const phases = [
    { n: "PHASE 0<br/>FOUNDATION (Now – Q2 2025)", sub: "Stabilize core platform, establish security foundation, and enable initial AI capabilities.", col: "#16A34A", bg: "#F0FDF4", out: "• Compliant &amp; Secure Core Platform<br/>• Single Source of Regulatory Truth<br/>• Faster Manual Research" },
    { n: "PHASE 1<br/>SCALE &amp; INTEGRATE (Q3 – Q4 2025)", sub: "Scale platform, integrate more data sources, and expand AI/automation capabilities.", col: "#2563EB", bg: "#EFF6FF", out: "• Wider Coverage &amp; Integrations<br/>• Higher Automation &amp; Efficiency<br/>• Scalable &amp; Reusable Platform" },
    { n: "PHASE 2<br/>INTELLIGENT &amp; AUTOMATED (H1 2026)", sub: "Increase automation, enable predictive intelligence, and self-service analytics.", col: "#7C3AED", bg: "#FAF5FF", out: "• Predictive Regulatory Intelligence<br/>• Self-Service Insights<br/>• Reduced Time-to-Insight by 60%+" },
    { n: "PHASE 3<br/>AUTONOMOUS &amp; OPTIMIZED (H2 2026+)", sub: "Autonomous operations, advanced AI agents, and ecosystem-driven innovation.", col: "#EA580C", bg: "#FFFBEB", out: "• Autonomous Regulatory Operations<br/>• Proactive Compliance<br/>• Continuous Innovation Engine" }
  ];

  phases.forEach((ph, idx) => {
    const px = 212 + idx * 248;
    rect(`ph_box_${idx}`, "", px, 164, 242, 360, `fillColor=${ph.bg};strokeColor=${ph.col};strokeWidth=1.5;align=left;verticalAlign=top;`);
    rect(`ph_hdr_${idx}`, `<div style="font-size:9.5px;font-weight:900;color:#FFFFFF;text-align:center;">${ph.n}</div>`, px, 164, 242, 34, `fillColor=${ph.col};strokeColor=${ph.col};rounded=0;align=center;verticalAlign=middle;`);
    text(`ph_sub_${idx}`, `<div style="font-size:8px;color:#64748B;padding:4px;text-align:center;line-height:1.25;">${ph.sub}</div>`, px, 200, 242, 36, "align=center;verticalAlign=top;");

    // Business Outcomes Box
    rect(`ph_out_${idx}`, `<div style="font-size:8px;font-weight:800;color:#1E3A8A;margin-bottom:2px;">BUSINESS OUTCOMES:</div><div style="font-size:7.5px;line-height:1.4;color:#0F172A;">${ph.out}</div>`, px + 6, 238, 230, 68, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

    // Mini Architecture Evolution sub-diagrams
    let archDiagramHtml = "";
    if (idx === 0) {
      archDiagramHtml = `<div style="font-size:7.5px;font-weight:800;color:#64748B;text-align:center;margin-bottom:4px;">ARCHITECTURE EVOLUTION</div>
      <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
        <span style="border:1px solid #CBD5E1;padding:2px 4px;border-radius:3px;font-size:7px;">Web App</span>
        <span style="border:1px solid #CBD5E1;padding:2px 4px;border-radius:3px;font-size:7px;">API</span>
        <span style="border:1px solid #CBD5E1;padding:2px 4px;border-radius:3px;font-size:7px;">Search</span>
      </div>
      <div style="text-align:center;font-size:8px;color:#64748B;margin:-2px 0;">↓</div>
      <div style="border:1px solid #16A34A;background:#F0FDF4;padding:4px;border-radius:3px;text-align:center;font-weight:800;font-size:8px;margin-bottom:4px;">Microservices</div>
      <div style="text-align:center;font-size:8px;color:#64748B;margin:-2px 0;">↓</div>
      <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
        <span style="border:1px solid #CBD5E1;padding:2px 4px;border-radius:3px;font-size:6.5px;">Relational DB</span>
        <span style="border:1px solid #CBD5E1;padding:2px 4px;border-radius:3px;font-size:6.5px;">Object Storage</span>
        <span style="border:1px solid #CBD5E1;padding:2px 4px;border-radius:3px;font-size:6.5px;">Cache</span>
      </div>
      <div style="text-align:center;font-size:8px;color:#64748B;margin:-2px 0;">↓</div>
      <div style="border:1px solid #CBD5E1;background:#F8FAFC;padding:3px;border-radius:3px;text-align:center;font-weight:700;font-size:7.5px;">Cloud Infrastructure</div>`;
    } else if (idx === 1) {
      archDiagramHtml = `<div style="font-size:7.5px;font-weight:800;color:#64748B;text-align:center;margin-bottom:4px;">ARCHITECTURE EVOLUTION</div>
      <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
        <span style="border:1px solid #CBD5E1;padding:2px 3px;border-radius:3px;font-size:6.5px;">Web App</span>
        <span style="border:1px solid #CBD5E1;padding:2px 3px;border-radius:3px;font-size:6.5px;">API</span>
        <span style="border:1px solid #CBD5E1;padding:2px 3px;border-radius:3px;font-size:6.5px;">Search</span>
        <span style="border:1px solid #CBD5E1;padding:2px 3px;border-radius:3px;font-size:6.5px;">Integrations</span>
      </div>
      <div style="text-align:center;font-size:8px;color:#64748B;margin:-2px 0;">↓</div>
      <div style="border:1px solid #2563EB;background:#EFF6FF;padding:3px;border-radius:3px;text-align:center;font-weight:800;font-size:8px;margin-bottom:3px;">Microservices</div>
      <div style="display:flex;justify-content:space-around;margin-bottom:3px;">
        <span style="border:1px solid #BFDBFE;background:#EFF6FF;padding:2px 4px;border-radius:3px;font-size:6.5px;">Event Bus</span>
        <span style="border:1px solid #BFDBFE;background:#EFF6FF;padding:2px 4px;border-radius:3px;font-size:6.5px;">Workflow Engine</span>
      </div>
      <div style="display:flex;justify-content:space-between;margin-bottom:3px;">
        <span style="border:1px solid #CBD5E1;padding:2px 2px;border-radius:3px;font-size:6px;">Data Lake</span>
        <span style="border:1px solid #CBD5E1;padding:2px 2px;border-radius:3px;font-size:6px;">Data WH</span>
        <span style="border:1px solid #CBD5E1;padding:2px 2px;border-radius:3px;font-size:6px;">Vector DB</span>
        <span style="border:1px solid #CBD5E1;padding:2px 2px;border-radius:3px;font-size:6px;">Cache</span>
      </div>
      <div style="border:1px solid #CBD5E1;background:#F8FAFC;padding:2px;border-radius:3px;text-align:center;font-weight:700;font-size:7px;">Cloud Infrastructure</div>`;
    } else if (idx === 2) {
      archDiagramHtml = `<div style="font-size:7.5px;font-weight:800;color:#64748B;text-align:center;margin-bottom:4px;">ARCHITECTURE EVOLUTION</div>
      <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
        <span style="border:1px solid #CBD5E1;padding:2px 3px;border-radius:3px;font-size:6.5px;">Web App</span>
        <span style="border:1px solid #CBD5E1;padding:2px 3px;border-radius:3px;font-size:6.5px;">API</span>
        <span style="border:1px solid #CBD5E1;padding:2px 3px;border-radius:3px;font-size:6.5px;">AI Copilot</span>
        <span style="border:1px solid #CBD5E1;padding:2px 3px;border-radius:3px;font-size:6.5px;">Analytics</span>
      </div>
      <div style="display:flex;justify-content:space-around;margin-bottom:3px;">
        <span style="border:1px solid #7C3AED;background:#FAF5FF;padding:2px 6px;border-radius:3px;font-size:7px;font-weight:800;">Microservices</span>
        <span style="border:1px solid #7C3AED;background:#FAF5FF;padding:2px 6px;border-radius:3px;font-size:7px;font-weight:800;">AI / ML Services</span>
      </div>
      <div style="display:flex;justify-content:space-around;margin-bottom:3px;">
        <span style="border:1px solid #DDD6FE;background:#FAF5FF;padding:2px 4px;border-radius:3px;font-size:6.5px;">Event Streaming</span>
        <span style="border:1px solid #DDD6FE;background:#FAF5FF;padding:2px 4px;border-radius:3px;font-size:6.5px;">Workflow Auto</span>
      </div>
      <div style="display:flex;justify-content:space-between;margin-bottom:3px;">
        <span style="border:1px solid #CBD5E1;padding:2px 4px;border-radius:3px;font-size:6.5px;">Data Lakehouse</span>
        <span style="border:1px solid #CBD5E1;padding:2px 4px;border-radius:3px;font-size:6.5px;">Vector DB</span>
        <span style="border:1px solid #CBD5E1;padding:2px 4px;border-radius:3px;font-size:6.5px;">Feature Store</span>
      </div>
      <div style="border:1px solid #CBD5E1;background:#F8FAFC;padding:2px;border-radius:3px;text-align:center;font-weight:700;font-size:7px;">Cloud Infrastructure</div>`;
    } else {
      archDiagramHtml = `<div style="font-size:7.5px;font-weight:800;color:#64748B;text-align:center;margin-bottom:4px;">ARCHITECTURE EVOLUTION</div>
      <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
        <span style="border:1px solid #CBD5E1;padding:2px 4px;border-radius:3px;font-size:7px;">AI Agents</span>
        <span style="border:1px solid #CBD5E1;padding:2px 4px;border-radius:3px;font-size:7px;">API Market</span>
        <span style="border:1px solid #CBD5E1;padding:2px 4px;border-radius:3px;font-size:7px;">Ecosystem</span>
      </div>
      <div style="text-align:center;font-size:8px;color:#64748B;margin:-2px 0;">↓</div>
      <div style="border:1px solid #EA580C;background:#FFFBEB;padding:3px;border-radius:3px;text-align:center;font-weight:800;font-size:7.5px;margin-bottom:3px;">Intelligent Orchestration Layer</div>
      <div style="display:flex;justify-content:space-around;margin-bottom:3px;">
        <span style="border:1px solid #FED7AA;background:#FFFBEB;padding:2px 4px;border-radius:3px;font-size:6.5px;">Knowledge Graph</span>
        <span style="border:1px solid #FED7AA;background:#FFFBEB;padding:2px 4px;border-radius:3px;font-size:6.5px;">Decision Engine</span>
      </div>
      <div style="display:flex;justify-content:space-between;margin-bottom:3px;">
        <span style="border:1px solid #CBD5E1;padding:2px 4px;border-radius:3px;font-size:6.5px;">Data Mesh</span>
        <span style="border:1px solid #CBD5E1;padding:2px 4px;border-radius:3px;font-size:6.5px;">Real-time Analytics</span>
        <span style="border:1px solid #CBD5E1;padding:2px 4px;border-radius:3px;font-size:6.5px;">AutoML Platform</span>
      </div>
      <div style="border:1px solid #CBD5E1;background:#F8FAFC;padding:2px;border-radius:3px;text-align:center;font-weight:700;font-size:7px;">Multi-Cloud / Hybrid</div>`;
    }

    rect(`ph_arch_${idx}`, archDiagramHtml, px + 6, 312, 230, 204, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");
  });

  // Cross-phase Key Enablers strip
  rect("box_enablers", `<div style="font-size:8.5px;font-weight:800;color:#1E3A8A;display:flex;justify-content:space-around;align-items:center;">
    <div><b>KEY ENABLERS:</b></div>
    <div>🔒 Security &amp; Zero Trust</div>
    <div>👤 Identity &amp; Access</div>
    <div>📈 Observability</div>
    <div>⚙️ CI/CD &amp; GitOps</div>
    <div>☁️ IaC (Terraform)</div>
    <div>🗄️ Data Governance</div>
    <div>💾 Backup &amp; DR</div>
  </div>`, 212, 532, 996, 40, "fillColor=#EFF6FF;strokeColor=#BFDBFE;rounded=1;align=center;verticalAlign=middle;padding=2;");

  // Middle-Right: Risk & Mitigation (x=1224..1520, y=326..580)
  rect("box_r_risk", "", 1224, 326, 296, 254, "strokeColor=#DC2626;fillColor=#FFFFFF;strokeWidth=1.5;align=left;verticalAlign=top;");
  rect("lbl_r_risk", `<b style="font-size:10.5px;color:#DC2626;">RISK &amp; MITIGATION</b>`, 1224, 326, 296, 24, "fillColor=#FEF2F2;strokeColor=#CBD5E1;rounded=0;align=center;");
  const riskTableHtml = `<table style='width:100%;border-collapse:collapse;font-size:8px;'>
    <tr style='font-weight:800;border-bottom:1.5px solid #CBD5E1;background:#F8FAFC;'>
      <td style='padding:3px;'>RISK</td><td>MITIGATION</td>
    </tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:3px;'><b>Integration Complexity</b></td><td style='color:#64748B;'>API Standards, Incremental Integration</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:3px;'><b>Data Quality Issues</b></td><td style='color:#64748B;'>Data Governance, Validation Pipelines</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:3px;'><b>Security Vulnerabilities</b></td><td style='color:#64748B;'>Zero Trust, Continuous Security Testing</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:3px;'><b>Cost Overrun</b></td><td style='color:#64748B;'>FinOps, Budgets, Right-sizing</td></tr>
    <tr><td style='padding:3px;'><b>Adoption Resistance</b></td><td style='color:#64748B;'>Change Mgmt, Training, Stakeholder Buy-in</td></tr>
  </table>`;
  text("txt_r_risk", riskTableHtml, 1226, 352, 292, 224, "align=left;verticalAlign=top;padding=2;");

  // ==================== 5. CAPABILITY AREAS TABLE (x=16..1216, y=588..780, h=192) ====================
  rect("box_caps_bg", "", 16, 588, 1200, 192, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.5;align=left;verticalAlign=top;");
  const capsTableHtml = `<table style='width:100%;border-collapse:collapse;font-size:8.5px;'>
    <tr style='font-weight:800;border-bottom:2px solid #CBD5E1;background:#F8FAFC;'>
      <td style='padding:4px;width:140px;'>CAPABILITY AREAS</td>
      <td style='color:#16A34A;font-weight:900;'>PHASE 0 (Now – Q2 2025)</td>
      <td style='color:#2563EB;font-weight:900;'>PHASE 1 (Q3 – Q4 2025)</td>
      <td style='color:#7C3AED;font-weight:900;'>PHASE 2 (H1 2026)</td>
      <td style='color:#EA580C;font-weight:900;'>PHASE 3 (H2 2026+)</td>
    </tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:3px;'><b>🚀 Platform</b></td><td>Set up core GKE, security baseline</td><td>Multi-env, autoscaling, CI/CD</td><td>Service mesh, platform hardening</td><td>Multi-cloud / hybrid, autonomous</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:3px;'><b>🗄️ Data</b></td><td>Centralize data, build lake &amp; WH</td><td>Data catalog, streaming ingest</td><td>Data mesh, real-time lakehouse</td><td>Active data products, dynamic fabric</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:3px;'><b>🔌 Integration</b></td><td>Core system integrations (APIs, SFTP)</td><td>Event-driven integrations, partner APIs</td><td>Ecosystem integrations, API market</td><td>Open ecosystem, plug-and-play</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:3px;'><b>🧠 AI / Analytics</b></td><td>LLM integration, basic search</td><td>RAG, advanced NLP, dashboards</td><td>Predictive models, anomaly detection</td><td>Autonomous agents, generative decision</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:3px;'><b>⚙️ Operations</b></td><td>Logging, basic monitoring, backup</td><td>SRE practices, alerting, runbooks</td><td>AIOps, predictive monitoring, chaos</td><td>Autonomous ops, self-healing</td></tr>
    <tr><td style='padding:3px;'><b>🛡️ Security &amp; Compliance</b></td><td>IAM, encryption, vulnerability scan</td><td>Policy as Code, compliance auto</td><td>Continuous compliance, risk score</td><td>Adaptive security, zero-trust auto</td></tr>
  </table>`;
  text("txt_caps_table", capsTableHtml, 20, 592, 1192, 184, "align=left;verticalAlign=top;padding=2;");

  // Lower-Right: Success Metrics (x=1224..1520, y=588..780)
  rect("box_r_metrics", "", 1224, 588, 296, 192, "strokeColor=#16A34A;fillColor=#FFFFFF;strokeWidth=1.5;align=left;verticalAlign=top;");
  rect("lbl_r_metrics", `<b style="font-size:10.5px;color:#16A34A;">SUCCESS METRICS</b>`, 1224, 588, 296, 24, "fillColor=#F0FDF4;strokeColor=#CBD5E1;rounded=0;align=center;");
  const metricsHtml = `<div style="font-size:8.5px;line-height:1.65;color:#0F172A;padding:6px;">
    ⏱️ <b>Time to Regulatory Insight:</b> <span style="color:#16A34A;font-weight:900;">▼ 60%+</span><br/>
    ⚙️ <b>Automation Rate:</b> <span style="color:#16A34A;font-weight:900;">▲ 70%+</span><br/>
    📈 <b>Platform Availability:</b> <span style="color:#16A34A;font-weight:900;">99.99%+</span><br/>
    💰 <b>Cost Efficiency:</b> <span style="color:#16A34A;font-weight:900;">▲ 30%+</span><br/>
    👤 <b>User Adoption:</b> <span style="color:#16A34A;font-weight:900;">▲ 80%+</span><br/>
    ✔ <b>Compliance Coverage:</b> <span style="color:#16A34A;font-weight:900;">100%</span>
  </div>`;
  text("txt_r_metrics", metricsHtml, 1226, 614, 292, 162, "align=left;verticalAlign=top;padding=2;");

  // ==================== 6. BOTTOM ROW (x=16..1520, y=788..954, h=166) ====================
  // 1. Architecture Maturity Model (x=16, w=350)
  rect("box_b_mat", "", 16, 788, 350, 166, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.5;align=left;verticalAlign=top;");
  rect("lbl_b_mat", `<b style="font-size:10px;color:#1E3A8A;">ARCHITECTURE MATURITY MODEL</b>`, 16, 788, 350, 22, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=0;align=center;");
  const matCurveHtml = `<div style="font-size:8px;text-align:center;padding:4px;">
    <div style="display:flex;justify-content:space-between;margin-top:6px;font-weight:800;">
      <div><b>L1</b><br/><span style="font-size:7px;color:#64748B;">Siloed</span></div>
      <div><b>L2</b><br/><span style="font-size:7px;color:#64748B;">Standardized</span></div>
      <div><b>L3</b><br/><span style="font-size:7px;color:#64748B;">Integrated</span></div>
      <div><b>L4</b><br/><span style="font-size:7px;color:#64748B;">Intelligent</span></div>
      <div><b>L5</b><br/><span style="font-size:7px;color:#64748B;">Autonomous</span></div>
    </div>
    <div style="margin:10px 0;font-size:14px;">🟢 ── 🔵 ── 🟣 ── 🟠 ── 🏆</div>
    <div style="color:#64748B;font-size:7.5px;line-height:1.4;">Ad-hoc manual ops ➔ Standardized centralized ➔ Integrated platform ➔ AI-driven predictive ➔ Autonomous self-optimizing.</div>
  </div>`;
  text("txt_b_mat", matCurveHtml, 18, 812, 346, 138, "align=center;verticalAlign=top;padding=2;");

  // 2. Investment & Effort Trend (x=374, w=340)
  rect("box_b_trend", "", 374, 788, 340, 166, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.5;align=left;verticalAlign=top;");
  rect("lbl_b_trend", `<b style="font-size:10px;color:#1E3A8A;">INVESTMENT &amp; EFFORT TREND</b>`, 374, 788, 340, 22, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=0;align=center;");
  const trendHtml = `<div style="font-size:8px;line-height:1.55;color:#0F172A;padding:4px;">
    📈 <b>Business Value:</b> Exponential growth from Q4 2025 onwards.<br/>
    📉 <b>Maintenance Effort:</b> Decreases steadily as automation matures.<br/>
    📊 <b>Capex to Opex:</b> Transition to predictable cloud economics.<br/>
    <div style="text-align:center;margin-top:8px;font-size:11px;font-weight:800;color:#2563EB;">Now ➔ Q2 '25 ➔ Q4 '25 ➔ H1 '26 ➔ H2 '26+</div>
  </div>`;
  text("txt_b_trend", trendHtml, 376, 812, 336, 138, "align=left;verticalAlign=top;padding=2;");

  // 3. Dependencies (x=722, w=290)
  rect("box_b_dep", "", 722, 788, 290, 166, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.5;align=left;verticalAlign=top;");
  rect("lbl_b_dep", `<b style="font-size:10px;color:#1E3A8A;">DEPENDENCIES</b>`, 722, 788, 290, 22, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=0;align=center;");
  const depHtml = `<div style="font-size:8.5px;line-height:1.6;color:#0F172A;padding:6px;">
    ☑ <b>Executive Sponsorship</b><br/>
    ☑ <b>Budget &amp; Resource Allocation</b><br/>
    ☑ <b>Data Availability &amp; Quality</b><br/>
    ☑ <b>Vendor &amp; Partner Alignment</b><br/>
    ☑ <b>Change Management &amp; Training</b>
  </div>`;
  text("txt_b_dep", depHtml, 724, 812, 286, 138, "align=left;verticalAlign=top;padding=4;");

  // 4. Next Steps (x=1020, w=500)
  rect("box_b_next", "", 1020, 788, 500, 166, "strokeColor=#2563EB;fillColor=#EFF6FF;strokeWidth=1.5;align=left;verticalAlign=top;");
  rect("lbl_b_next", `<b style="font-size:10px;color:#1E40AF;">NEXT STEPS</b>`, 1020, 788, 500, 22, "fillColor=#DBEAFE;strokeColor=#CBD5E1;rounded=0;align=center;");
  const nextSteps = [
    { n: "Validate Roadmap", sub: "Now", icon: "📋" },
    { n: "Prioritize Initiatives", sub: "May '25", icon: "📑" },
    { n: "Detailed Design", sub: "Jun '25", icon: "📐" },
    { n: "Execute Phase 0", sub: "Q2 2025", icon: "⚙️" },
    { n: "Review &amp; Iterate", sub: "Quarterly", icon: "🔄" }
  ];
  nextSteps.forEach((ns, idx) => {
    const nx = 1028 + idx * 98;
    rect(`ns_${idx}`, `<div style="font-size:18px;text-align:center;">${ns.icon}</div><div style="font-size:8.5px;font-weight:800;color:#0F172A;text-align:center;line-height:1.1;margin-top:2px;">${ns.n}</div><div style="font-size:7.5px;color:#64748B;text-align:center;">${ns.sub}</div>`, nx, 824, 92, 84, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=2;");
  });

  // ==================== 7. FOOTER STATUS BAR (y=962, h=24) ====================
  const footerHtml = `<div style='font-size:9px;color:#64748B;display:flex;justify-content:space-between;align-items:center;'>
    <div><b>LEGEND:</b> Phase 0 (Foundation) &nbsp;|&nbsp; Phase 1 (Scale) &nbsp;|&nbsp; Phase 2 (Intelligent) &nbsp;|&nbsp; Phase 3 (Autonomous)</div>
    <div>Review Cadence: Quarterly &nbsp;|&nbsp; Enterprise Architecture Team</div>
  </div>`;
  rect("footer_status", footerHtml, 16, 962, 1504, 24, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=middle;padding=4;");

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
