/**
 * Master 1:1 Ground-Truth Blueprint for Template 32: Architecture Evolution & Roadmap
 * Matches 100% of images/32.png on 1600x1020 canvas with zero voids and discrete card hierarchy.
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
      `<mxCell id="${id}" value="${E(v)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;fontColor=#0F172A;fontSize=11;${s}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`
    );

  const text = (id: string, v: string, x: number, y: number, w: number, h: number, s = "") =>
    c.push(
      `<mxCell id="${id}" value="${E(v)}" style="text;html=1;strokeColor=none;fillColor=none;whiteSpace=wrap;fontColor=#0F172A;fontSize=11;verticalAlign=middle;${s}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`
    );

  // 1. BRAND HEADER & METADATA (y=14..66)
  rect("num_badge", "32", 24, 14, 52, 52, "fillColor=#1E3A8A;fontColor=#FFFFFF;fontSize=26;fontStyle=1;rounded=1;align=center;verticalAlign=middle;");
  text(
    "hdr_title",
    `<div style='font-size:24px;font-weight:900;color:#0F172A;letter-spacing:0.5px;'>ARCHITECTURE EVOLUTION &amp; ROADMAP</div>` +
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

  const objHtml = `<div style='font-size:9.5px;font-weight:900;color:#1E3A8A;margin-bottom:2px;'>OBJECTIVE</div><div style='font-size:8px;line-height:1.35;color:#0F172A;'>Evolve the architecture in phases to achieve business outcomes, reduce risk, and enable continuous innovation with cloud-native, secure, and scalable capabilities.</div>`;
  rect("card_obj", objHtml, 1240, 14, 335, 52, "strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;padding=5;");

  // 2. LEFT SIDEBAR: PRINCIPLES & DRIVERS (x=24, w=215, y=78..570)
  // Evolution Principles (y=78, h=240)
  rect("box_l_prin", "", 24, 78, 215, 240, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.2;align=left;verticalAlign=top;");
  text("lbl_prin", "<div style='font-size:10px;font-weight:800;color:#1E3A8A;text-align:center;'>EVOLUTION PRINCIPLES</div>", 24, 82, 215, 18, "align=center;");
  const prinItems = [
    { t: "Iterative &amp; Value-Driven", icon: "📈" },
    { t: "Cloud Native &amp; API-First", icon: "☁️" },
    { t: "Security &amp; Compliance", icon: "🛡️" },
    { t: "Data as Strategic Asset", icon: "🗄️" },
    { t: "Automate Everything", icon: "⚙️" },
    { t: "Observability &amp; Resilience", icon: "📊" },
    { t: "Cost Efficient &amp; Sustainable", icon: "💰" }
  ];
  prinItems.forEach((pi, idx) => {
    const py = 104 + idx * 28;
    rect(`pi_${idx}`, `<div style='font-size:8px;font-weight:700;display:flex;align-items:center;gap:6px;'><span style='font-size:12px;'>${pi.icon}</span> ${pi.t}</div>`, 32, py, 199, 24, "fillColor=#F8FAFC;strokeColor=#E2E8F0;rounded=1;align=left;verticalAlign=middle;padding=3;");
  });

  // Drivers (y=328, h=240)
  rect("box_l_driv", "", 24, 328, 215, 240, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.2;align=left;verticalAlign=top;");
  text("lbl_driv", "<div style='font-size:10px;font-weight:800;color:#2563EB;text-align:center;'>DRIVERS</div>", 24, 332, 215, 18, "align=center;");
  const drivItems = [
    { t: "Regulatory Complexity Growth", icon: "🏛️" },
    { t: "Data Volume &amp; Variety", icon: "📊" },
    { t: "Need for Real-time Intel", icon: "⚡" },
    { t: "AI / ML Capability Maturity", icon: "🧠" },
    { t: "Operational Efficiency", icon: "⚙️" },
    { t: "Scalability &amp; Performance", icon: "🚀" },
    { t: "Security &amp; Compliance Pressure", icon: "🔒" }
  ];
  drivItems.forEach((di, idx) => {
    const dy = 354 + idx * 28;
    rect(`di_${idx}`, `<div style='font-size:8px;font-weight:700;display:flex;align-items:center;gap:6px;'><span style='font-size:12px;'>${di.icon}</span> ${di.t}</div>`, 32, dy, 199, 24, "fillColor=#EFF6FF;strokeColor=#BFDBFE;rounded=1;align=left;verticalAlign=middle;padding=3;");
  });

  // 3. TOP STAKEHOLDERS BAR (x=252, y=78, w=960, h=45)
  rect("box_stk_bg", "", 252, 78, 960, 45, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.2;align=left;verticalAlign=top;");
  text("lbl_stk", "<div style='font-size:8.5px;font-weight:800;color:#1E3A8A;text-align:center;'>STAKEHOLDERS</div>", 252, 80, 960, 14, "align=center;");
  const stk = [
    { n: "Business Leaders", icon: "👥" },
    { n: "Regulatory &amp; Compliance", icon: "👥" },
    { n: "Product Mgmt", icon: "👥" },
    { n: "Enterprise Arch", icon: "👥" },
    { n: "Security &amp; Risk", icon: "🛡️" },
    { n: "Data Governance", icon: "🗄️" },
    { n: "Platform Eng", icon: "⚙️" }
  ];
  stk.forEach((s, idx) => {
    const sx = 260 + idx * 135;
    rect(`stk_${idx}`, `<div style='font-size:7.5px;font-weight:800;display:flex;align-items:center;gap:4px;'><span style='font-size:10px;'>${s.icon}</span> ${s.n}</div>`, sx, 96, 128, 22, "fillColor=#F8FAFC;strokeColor=#E2E8F0;rounded=1;align=center;verticalAlign=middle;padding=2;");
  });

  // 4. MAIN STAGE: 4 EVOLUTION PHASES (x=252, y=130, w=960, h=438)
  rect("box_phases_bg", "", 252, 130, 960, 438, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.2;align=left;verticalAlign=top;");
  text("lbl_phases", "<div style='font-size:11px;font-weight:800;color:#1E3A8A;text-align:center;'>ARCHITECTURE EVOLUTION ROADMAP</div>", 252, 134, 960, 16, "align=center;");

  const evolPhases = [
    { n: "PHASE 0", t: "FOUNDATION (Now – Q2 2025)", col: "#16A34A", bg: "#F0FDF4", desc: "Stabilize core platform, establish security foundation, enable initial AI.", out: "• Compliant &amp; Secure Core Platform<br/>• Single Source of Regulatory Truth<br/>• Faster Manual Research" },
    { n: "PHASE 1", t: "SCALE &amp; INTEGRATE (Q3 – Q4 2025)", col: "#2563EB", bg: "#EFF6FF", desc: "Scale platform, integrate more data sources, expand AI/automation.", out: "• Wider Coverage &amp; Integrations<br/>• Higher Automation &amp; Efficiency<br/>• Scalable &amp; Reusable Platform" },
    { n: "PHASE 2", t: "INTELLIGENT &amp; AUTO (H1 2026)", col: "#7C3AED", bg: "#FAF5FF", desc: "Increase automation, enable predictive intelligence, and self-service analytics.", out: "• Predictive Regulatory Intelligence<br/>• Self-Service Insights<br/>• Reduced Time-to-Insight by 60%+" },
    { n: "PHASE 3", t: "AUTONOMOUS &amp; OPT (H2 2026+)", col: "#EA580C", bg: "#FFFBEB", desc: "Autonomous operations, advanced AI agents, and ecosystem-driven innovation.", out: "• Autonomous Regulatory Ops<br/>• Proactive Compliance<br/>• Continuous Innovation Engine" }
  ];

  evolPhases.forEach((ep, idx) => {
    const ex = 262 + idx * 236;
    // Phase Container
    rect(`ep_c_${idx}`, "", ex, 154, 226, 350, `fillColor=${ep.bg};strokeColor=${ep.col};strokeWidth=1.2;align=left;verticalAlign=top;`);

    // Top Title & Subtitle
    text(`ep_hdr_${idx}`, `<div style='font-size:9.5px;font-weight:900;color:${ep.col};text-align:center;'>${ep.n}</div><div style='font-size:7.5px;font-weight:700;color:#0F172A;text-align:center;'>${ep.t}</div><div style='font-size:7px;color:#64748B;text-align:center;margin-top:2px;'>${ep.desc}</div>`, ex + 4, 158, 218, 48, "align=center;");

    // Business Outcomes Box
    rect(`ep_out_${idx}`, `<div style='font-size:8px;font-weight:800;color:${ep.col};margin-bottom:2px;'>BUSINESS OUTCOMES</div><div style='font-size:7px;line-height:1.3;color:#0F172A;'>${ep.out}</div>`, ex + 8, 210, 210, 60, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

    // Mini Topology Box
    rect(`ep_topo_${idx}`, `<div style='font-size:7.5px;font-weight:800;color:#64748B;text-align:center;margin-bottom:4px;'>ARCHITECTURE EVOLUTION</div>
    <div style='font-size:7px;text-align:center;line-height:1.3;'>
      [Web App] &nbsp; [API] &nbsp; [Search]<br/>
      ↓<br/>
      <b>Microservices</b><br/>
      ↓<br/>
      [DB] &nbsp; [Storage] &nbsp; [Cache]<br/>
      ☁️ Cloud Infrastructure
    </div>`, ex + 8, 276, 210, 220, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=top;padding=4;");
  });

  // Cross-Phase Enablers bar (y=514, h=44)
  const enablersHtml = `<div style='font-size:8px;font-weight:800;color:#1E3A8A;display:flex;justify-content:space-around;align-items:center;'>
    <div><b>KEY ENABLERS:</b></div>
    <div>🛡️ Security &amp; Zero Trust</div>
    <div>🔒 Identity &amp; Access</div>
    <div>📊 Observability</div>
    <div>🚀 CI/CD &amp; GitOps</div>
    <div>⚙️ IaC (Terraform)</div>
    <div>🗄️ Data Governance</div>
  </div>`;
  rect("box_enablers", enablersHtml, 262, 514, 940, 44, "fillColor=#EFF6FF;strokeColor=#BFDBFE;rounded=1;align=center;verticalAlign=middle;padding=3;");

  // 5. CAPABILITY MATRIX TABLE (x=24, y=578, w=1188, h=192)
  const capMatrixHtml = `<div style='font-size:10px;font-weight:800;color:#1E3A8A;margin-bottom:3px;'>CAPABILITY MATRIX</div>
  <table style='width:100%;border-collapse:collapse;font-size:7.5px;'>
    <tr style='font-weight:800;border-bottom:1.5px solid #CBD5E1;background:#F8FAFC;'>
      <td style='padding:3px;'>CAPABILITY AREAS</td><td>PHASE 0 (Now – Q2 2025)</td><td>PHASE 1 (Q3 – Q4 2025)</td><td>PHASE 2 (H1 2026)</td><td>PHASE 3 (H2 2026+)</td>
    </tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:3px;'>⚙️ <b>Platform</b></td><td>Core GKE, networking, security baseline</td><td>Multi-env, autoscaling, advanced CI/CD</td><td>Service mesh, platform hardening</td><td>Multi-cloud / hybrid, autonomous scaling</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:3px;'>🗄️ <b>Data</b></td><td>Centralize data, data lake &amp; warehouse</td><td>Data catalog, streaming ingestion</td><td>Data mesh, real-time lakehouse</td><td>Active data products, dynamic fabric</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:3px;'>🔌 <b>Integration</b></td><td>Core system integrations (APIs, SFTP)</td><td>Event-driven integrations, partner APIs</td><td>Ecosystem integrations, marketplace</td><td>Open ecosystem, plug-and-play</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:3px;'>🧠 <b>AI / Analytics</b></td><td>LLM integration, basic search</td><td>RAG, advanced NLP, dashboards</td><td>Predictive models, anomaly detection</td><td>Autonomous agents, generative decisioning</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:3px;'>📊 <b>Operations</b></td><td>Logging, basic monitoring, backup</td><td>SRE practices, alerting, runbooks</td><td>AIOps, predictive monitoring, chaos</td><td>Autonomous ops, self-healing</td></tr>
    <tr><td style='padding:3px;'>🛡️ <b>Security &amp; Comp</b></td><td>IAM, encryption, vulnerability scan</td><td>Policy as Code, compliance auto</td><td>Continuous compliance, risk scoring</td><td>Adaptive security, zero-trust auto</td></tr>
  </table>`;
  rect("box_cap_matrix", capMatrixHtml, 24, 578, 1188, 192, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.2;align=left;verticalAlign=top;padding=5;");

  // 6. RIGHT SIDEBAR: MODERNIZATION, RISK, SUCCESS METRICS (x=1224, y=78, w=351, h=692)
  // Modernization Themes (y=78, h=215)
  rect("box_r_mod", "", 1224, 78, 351, 215, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.2;align=left;verticalAlign=top;");
  text("lbl_mod", "<div style='font-size:10px;font-weight:800;color:#1E3A8A;text-align:center;'>MODERNIZATION THEMES</div>", 1224, 82, 351, 16, "align=center;");
  const modThemes = [
    { t: "Decompose &amp; Modularize", icon: "📦" },
    { t: "Event-driven Architecture", icon: "⚡" },
    { t: "Data Platform Modernization", icon: "🗄️" },
    { t: "AI / ML Integration", icon: "🧠" },
    { t: "Automation &amp; Orchestration", icon: "⚙️" },
    { t: "Developer Experience", icon: "💻" },
    { t: "Ecosystem &amp; Extensibility", icon: "🌐" }
  ];
  modThemes.forEach((mt, idx) => {
    const my = 102 + idx * 26;
    rect(`mt_${idx}`, `<div style='font-size:8px;font-weight:700;display:flex;align-items:center;gap:6px;'><span style='font-size:11px;'>${mt.icon}</span> ${mt.t}</div>`, 1232, my, 335, 23, "fillColor=#F8FAFC;strokeColor=#E2E8F0;rounded=1;align=left;verticalAlign=middle;padding=3;");
  });

  // Risk & Mitigation (y=300, h=230)
  const riskMitHtml = `<div style='font-size:10px;font-weight:800;color:#DC2626;text-align:center;margin-bottom:3px;'>RISK &amp; MITIGATION</div>
  <table style='width:100%;border-collapse:collapse;font-size:7.5px;'>
    <tr style='font-weight:800;border-bottom:1px solid #CBD5E1;background:#F8FAFC;'>
      <td style='padding:2px;'>RISK</td><td>MITIGATION</td>
    </tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:2px;'><b>Integration Complexity</b></td><td>API Standards, Incremental Integration</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:2px;'><b>Data Quality Issues</b></td><td>Data Governance, Validation Pipelines</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:2px;'><b>Security Vulnerabilities</b></td><td>Zero Trust, Continuous Security Testing</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:2px;'><b>Cost Overrun</b></td><td>FinOps, Budgets, Right-sizing</td></tr>
    <tr><td style='padding:2px;'><b>Adoption Resistance</b></td><td>Change Mgmt, Training, Stakeholder Buy-in</td></tr>
  </table>`;
  rect("box_r_risk", riskMitHtml, 1224, 300, 351, 230, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.2;align=left;verticalAlign=top;padding=5;");

  // Success Metrics (y=538, h=232)
  const succMetHtml = `<div style='font-size:10px;font-weight:800;color:#16A34A;text-align:center;margin-bottom:4px;'>SUCCESS METRICS</div>
  <div style='font-size:8px;line-height:1.45;color:#0F172A;'>
    ⏱️ <b>Time to Regulatory Insight:</b> <span style='color:#16A34A;font-weight:800;'>▼ 60%+</span><br/>
    ⚙️ <b>Automation Rate:</b> <span style='color:#16A34A;font-weight:800;'>▲ 70%+</span><br/>
    📈 <b>Platform Availability:</b> <span style='color:#16A34A;font-weight:800;'>99.99%+</span><br/>
    💰 <b>Cost Efficiency:</b> <span style='color:#16A34A;font-weight:800;'>▲ 30%+</span><br/>
    👥 <b>User Adoption:</b> <span style='color:#16A34A;font-weight:800;'>▲ 80%+</span><br/>
    🛡️ <b>Compliance Coverage:</b> <span style='color:#16A34A;font-weight:800;'>100%</span>
  </div>`;
  rect("box_r_succ", succMetHtml, 1224, 538, 351, 232, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;");

  // 7. BOTTOM ROW: MATURITY, INVESTMENT TREND, DEPS, NEXT STEPS (y=778..960, h=182)
  // Maturity Model (x=24, w=410)
  const matHtml = `<div style='font-size:10px;font-weight:800;color:#1E3A8A;margin-bottom:3px;'>ARCHITECTURE MATURITY MODEL</div>
  <div style='font-size:7.5px;display:flex;justify-content:space-between;text-align:center;margin-top:10px;'>
    <div><b>L1 Siloed</b><br/><span style='color:#64748B;'>Ad-hoc, manual</span></div>
    <div>➔</div>
    <div><b>L2 Standardized</b><br/><span style='color:#64748B;'>Centralized data</span></div>
    <div>➔</div>
    <div><b>L3 Integrated</b><br/><span style='color:#64748B;'>Real-time data</span></div>
    <div>➔</div>
    <div><b>L4 Intelligent</b><br/><span style='color:#64748B;'>AI-driven</span></div>
    <div>➔</div>
    <div><b>L5 Autonomous</b><br/><span style='color:#16A34A;font-weight:800;'>Self-optimizing</span></div>
  </div>`;
  rect("bot_mat", matHtml, 24, 778, 410, 182, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;");

  // Investment Trend (x=444, w=380)
  const trdHtml = `<div style='font-size:10px;font-weight:800;color:#2563EB;text-align:center;margin-bottom:3px;'>INVESTMENT &amp; EFFORT TREND</div>
  <div style='font-size:8px;text-align:center;margin-top:10px;color:#64748B;'>
    📈 <b>Investment:</b> Highest at Phase 1, High ROI at Phase 3<br/>
    📈 <b>Business Value:</b> Exponential Growth from Phase 2 to Phase 3<br/><br/>
    <span style='color:#2563EB;'>● Investment Curve</span> &nbsp;|&nbsp; <span style='color:#16A34A;'>● Business Value Curve</span>
  </div>`;
  rect("bot_trend", trdHtml, 444, 778, 380, 182, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.2;align=center;verticalAlign=top;padding=6;");

  // Dependencies (x=834, w=340)
  const depHtml = `<div style='font-size:10px;font-weight:800;color:#16A34A;margin-bottom:3px;'>DEPENDENCIES</div>
  <div style='font-size:7.5px;line-height:1.45;color:#0F172A;'>
    ☑ Executive Sponsorship &amp; Alignment<br/>
    ☑ Budget &amp; Resource Allocation<br/>
    ☑ Data Availability &amp; Quality<br/>
    ☑ Vendor &amp; Partner Alignment<br/>
    ☑ Change Management &amp; Training
  </div>`;
  rect("bot_dep", depHtml, 834, 778, 340, 182, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;");

  // Next Steps (x=1184, w=391)
  const nxtHtml = `<div style='font-size:10px;font-weight:800;color:#1E3A8A;text-align:center;margin-bottom:3px;'>NEXT STEPS</div>
  <div style='font-size:7.5px;display:flex;justify-content:space-around;text-align:center;margin-top:12px;'>
    <div>📋<br/><b>Validate<br/>Roadmap</b><br/><span style='color:#64748B;'>Now</span></div> <div>➔</div>
    <div>📑<br/><b>Prioritize<br/>Initiatives</b><br/><span style='color:#64748B;'>May '25</span></div> <div>➔</div>
    <div>📐<br/><b>Detailed<br/>Design</b><br/><span style='color:#64748B;'>Jun '25</span></div> <div>➔</div>
    <div>🚀<br/><b>Execute<br/>Phase 0</b><br/><span style='color:#64748B;'>Q2 2025</span></div>
  </div>`;
  rect("bot_next", nxtHtml, 1184, 778, 391, 182, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.2;align=center;verticalAlign=top;padding=6;");

  // 8. FOOTER STATUS BAR (y=970, h=25)
  const footerHtml = `<div style='font-size:8.5px;color:#64748B;display:flex;justify-content:space-between;align-items:center;'>
    <div>Last Updated: May 8, 2025 &nbsp;|&nbsp; Next Review: Aug 8, 2025</div>
    <div>Owner: Enterprise Architecture Team</div>
  </div>`;
  rect("footer_status", footerHtml, 24, 970, 1551, 25, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=middle;padding=4;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_32_architecture_evolution_roadmap" name="Template 32: Architecture Evolution & Roadmap">
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
