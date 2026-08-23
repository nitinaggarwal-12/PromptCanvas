/**
 * Canonical Architecture Template 32: Architecture Evolution & Roadmap
 * Exact 1:1 High-Fidelity Master Blueprint of images/32.png
 */

export function generateTemplate32RoadmapEvolutionXml(
  flavor: string = "biopharma",
  theme: "dark" | "light" = "light"
): string {
  const isDark = theme === "dark";
  const E = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const c: string[] = [];
  let idCounter = 100;
  const nid = () => `c_${idCounter++}`;

  const rect = (id: string, val: string, x: number, y: number, w: number, h: number, style: string) => {
    c.push(
      `<mxCell id="${id}" value="${E(val)}" style="rounded=1;whiteSpace=wrap;html=1;${style}" vertex="1" parent="1">` +
      `<mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/>` +
      `</mxCell>`
    );
  };

  const edge = (id: string, val: string, src: string, tgt: string, style: string, pts: Array<{x: number, y: number}> = []) => {
    let ptsXml = "";
    if (pts.length > 0) {
      ptsXml = `<Array as="points">${pts.map(p => `<mxPoint x="${p.x}" y="${p.y}"/>`).join("")}</Array>`;
    }
    c.push(
      `<mxCell id="${id}" value="${E(val)}" edge="1" parent="1" source="${src}" target="${tgt}" style="rounded=1;html=1;${style}">` +
      `<mxGeometry relative="1" as="geometry">${ptsXml}</mxGeometry>` +
      `</mxCell>`
    );
  };

  // 1. BRAND HEADER & METADATA
  rect("num_badge", "32", 20, 20, 48, 48, "fillColor=#1E3A8A;fontColor=#FFFFFF;fontSize=24;fontStyle=1;rounded=1;align=center;verticalAlign=middle;");
  rect("hdr_title", "<div style='font-size:24px;font-weight:800;color:#0F172A;letter-spacing:0.5px;'>ARCHITECTURE EVOLUTION &amp; ROADMAP</div><div style='font-size:11px;color:#1E3A8A;font-weight:700;margin-top:3px;'>Use Case: NovaCura – AI-Powered Regulatory Intelligence Platform &nbsp;|&nbsp; Environment: Production &nbsp;|&nbsp; Region: us-central1 &nbsp;|&nbsp; Last Updated: May 8, 2025</div>", 78, 16, 850, 56, "strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  rect("hdr_brand", "<div style='text-align:right;'><span style='font-size:20px;font-weight:800;color:#0284C7;'>🧬 NOVACURA</span><br/><span style='font-size:9.5px;color:#64748B;font-style:italic;'>AI-Powered Regulatory Intelligence Platform</span></div>", 940, 18, 280, 45, "strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

  // Objective Card
  rect("card_obj", "<div style='font-size:12px;font-weight:800;color:#1E3A8A;margin-bottom:3px;'>OBJECTIVE</div><div style='font-size:11.5px;line-height:1.4;color:#0F172A;'>Evolve the architecture in phases to achieve business outcomes, reduce risk, and enable continuous innovation with cloud-native, secure, and scalable capabilities.</div>", 1240, 18, 320, 52, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=6;");

  // 2. LEFT COLUMN 1: EVOLUTION PRINCIPLES (x=20..140, y=78..285)
  rect("box_l_prin", "<div style='font-size:11px;font-weight:800;color:#1E3A8A;margin-bottom:4px;'>EVOLUTION PRINCIPLES</div>" +
    "<div style='font-size:8.5px;line-height:1.4;color:#0F172A;'>" +
    "✔ Iterative &amp; Value-Driven<br/>" +
    "✔ Cloud Native &amp; API-First<br/>" +
    "✔ Security &amp; Compliance by Design<br/>" +
    "✔ Data as Strategic Asset<br/>" +
    "✔ Automate Everything<br/>" +
    "✔ Observability &amp; Resilience<br/>" +
    "✔ Cost Efficient &amp; Sustainable" +
    "</div>", 20, 78, 120, 202, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  // LEFT COLUMN 2: DRIVERS (x=20..140, y=288..560)
  rect("box_l_driv", "<div style='font-size:11px;font-weight:800;color:#1E3A8A;margin-bottom:4px;'>DRIVERS</div>" +
    "<div style='font-size:8.5px;line-height:1.4;color:#0F172A;'>" +
    "📈 Regulatory Complexity Growth<br/>" +
    "📊 Data Volume &amp; Variety<br/>" +
    "⏱️ Need for Real-time Intel<br/>" +
    "🧠 AI / ML Capability Maturity<br/>" +
    "⚙️ Operational Efficiency<br/>" +
    "📈 Scalability &amp; Performance<br/>" +
    "🛡️ Security &amp; Compliance" +
    "</div>", 20, 288, 120, 272, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  // 3. TOP STAKEHOLDERS BAR (x=148..1120, y=78..118)
  rect("bar_stake", "<div style='font-size:11px;font-weight:800;color:#1E3A8A;margin-bottom:2px;text-align:center;'>STAKEHOLDERS</div>" +
    "<div style='font-size:8.5px;color:#0F172A;display:flex;justify-content:space-around;text-align:center;'>" +
    "<div>👥 Business Leaders</div> <div>👥 Regulatory &amp; Compliance</div> <div>👥 Product Mgmt</div> <div>👥 Enterprise Arch</div> <div>🛡️ Security &amp; Risk</div> <div>📑 Data Governance</div> <div>🏗️ Platform Eng</div> <div>💻 Dev / QA</div>" +
    "</div>", 148, 78, 972, 40, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");

  // 4. CENTER ROADMAP CONTAINER (x=148..1120, y=124..560)
  rect("box_rm_phases", "", 148, 124, 972, 436, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;rounded=1;");
  rect("lbl_rm_phases", "<span style='font-size:12px;font-weight:800;color:#2563EB;'>ARCHITECTURE EVOLUTION ROADMAP</span>", 148, 128, 972, 14, "strokeColor=none;fillColor=none;align=center;");

  const rPhases = [
    { p: "PHASE 0", t: "FOUNDATION", sub: "(Now – Q2 2025)", d: "Stabilize core platform, establish security foundation, and enable initial AI capabilities.", outs: "• Compliant &amp; Secure Core Platform<br/>• Single Source of Regulatory Truth<br/>• Faster Manual Research", col: "#16A34A", bg: "#F0FDF4", x: 156, w: 236 },
    { p: "PHASE 1", t: "SCALE &amp; INTEGRATE", sub: "(Q3 – Q4 2025)", d: "Scale platform, integrate more data sources, and expand AI/automation capabilities.", outs: "• Wider Coverage &amp; Integrations<br/>• Higher Automation &amp; Efficiency<br/>• Scalable &amp; Reusable Platform", col: "#2563EB", bg: "#EFF6FF", x: 398, w: 236 },
    { p: "PHASE 2", t: "INTELLIGENT &amp; AUTOMATED", sub: "(H1 2026)", d: "Increase automation, enable predictive intelligence, and self-service analytics.", outs: "• Predictive Regulatory Intelligence<br/>• Self-Service Insights<br/>• Reduced Time-to-Insight by 60%+", col: "#7C3AED", bg: "#F5F3FF", x: 640, w: 236 },
    { p: "PHASE 3", t: "AUTONOMOUS &amp; OPTIMIZED", sub: "(H2 2026+)", d: "Autonomous operations, advanced AI agents, and ecosystem-driven innovation.", outs: "• Autonomous Regulatory Operations<br/>• Proactive Compliance<br/>• Continuous Innovation Engine", col: "#D97706", bg: "#FFFBEB", x: 882, w: 230 }
  ];

  rPhases.forEach((rp, idx) => {
    rect(`rp_box_${idx}`, "", rp.x, 144, rp.w, 88, `fillColor=${rp.bg};strokeColor=${rp.col};rounded=1;`);
    rect(`rp_hdr_${idx}`, `<div style='font-size:10.5px;font-weight:800;color:${rp.col};'>${rp.p}: ${rp.t}</div><div style='font-size:8.5px;color:#64748B;'>${rp.sub}</div><div style='font-size:8.5px;color:#0F172A;margin-top:2px;'>${rp.d}</div>`, rp.x + 4, 146, rp.w - 8, 84, "strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

    rect(`rp_out_${idx}`, `<div style='font-size:8.5px;line-height:1.4;color:#0F172A;'>${rp.outs}</div>`, rp.x, 236, rp.w, 65, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

    rect(`rp_arch_${idx}`, `<div style='font-size:9px;font-weight:800;color:${rp.col};text-align:center;'>Architecture Evolution Box ${idx}</div><div style='font-size:8.5px;color:#64748B;text-align:center;margin-top:4px;'>Web/API ➔ Microservices ➔ Data Store ➔ Cloud Infra</div>`, rp.x, 305, rp.w, 145, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=3;");
  });

  // Key Enablers Bar
  rect("bar_enablers", "<div style='font-size:10.5px;font-weight:800;color:#1E3A8A;margin-bottom:2px;text-align:center;'>KEY ENABLERS (CROSS-PHASE)</div>" +
    "<div style='font-size:8.5px;color:#0F172A;display:flex;justify-content:space-around;text-align:center;'>" +
    "<div>🛡️ Security &amp; Zero Trust</div> <div>👤 Identity &amp; Access</div> <div>📈 Observability</div> <div>🔄 CI/CD &amp; GitOps</div> <div>🏗️ IaC</div> <div>📑 Data Governance</div> <div>🛡️ Backup &amp; DR</div>" +
    "</div>", 156, 455, 956, 32, "fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=1;rounded=1;align=center;verticalAlign=middle;");

  // Capability Areas Matrix (y=492..555)
  rect("box_cap_matrix", "<div style='font-size:8.5px;color:#0F172A;'>" +
    "<table style='width:100%;border-collapse:collapse;'>" +
    "<tr style='font-weight:800;color:#1E3A8A;'><td>CAPABILITY</td><td>PHASE 0</td><td>PHASE 1</td><td>PHASE 2</td><td>PHASE 3</td></tr>" +
    "<tr><td><b>Platform</b></td><td>Core GKE, networking</td><td>Multi-env, autoscaling</td><td>Service mesh, resilience</td><td>Multi-cloud / hybrid</td></tr>" +
    "<tr><td><b>Data</b></td><td>Central data lake</td><td>Data catalog, streaming</td><td>Data mesh, real-time</td><td>Active data fabric</td></tr>" +
    "<tr><td><b>AI/ML</b></td><td>LLM integration, search</td><td>RAG, advanced NLP</td><td>Predictive models, anomaly</td><td>Autonomous agents</td></tr>" +
    "</table></div>", 156, 492, 956, 62, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=2;");

  // 5. FAR RIGHT COLUMN: THEMES, RISKS & SUCCESS METRICS (x=1128..1560, y=78..560)
  rect("box_r_themes", "<div style='font-size:11px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>MODERNIZATION THEMES</div><div style='font-size:8.5px;line-height:1.35;color:#0F172A;'>⚙️ Decompose &amp; Modularize<br/>📡 Event-driven Architecture<br/>🗄️ Data Platform Modernization<br/>🧠 AI / ML Integration<br/>🔄 Automation &amp; Orchestration<br/>💻 Developer Experience<br/>🌐 Ecosystem &amp; Extensibility</div>", 1128, 78, 432, 145, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  rect("box_r_risk_tbl", "<div style='font-size:11px;font-weight:800;color:#DC2626;margin-bottom:2px;'>RISK &amp; MITIGATION</div><div style='font-size:8.5px;color:#0F172A;'>" +
    "<table style='width:100%;border-collapse:collapse;'>" +
    "<tr style='font-weight:800;'><td>RISK</td><td>MITIGATION</td></tr>" +
    "<tr><td>Integration Complexity</td><td>API Standards, Incremental</td></tr>" +
    "<tr><td>Data Quality Issues</td><td>Data Governance, Validation</td></tr>" +
    "<tr><td>Security Vulns</td><td>Zero Trust, Continuous Test</td></tr>" +
    "<tr><td>Cost Overrun</td><td>FinOps, Budgets, Right-sizing</td></tr>" +
    "<tr><td>Adoption Resistance</td><td>Change Mgmt, Training</td></tr>" +
    "</table></div>", 1128, 228, 432, 155, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  rect("box_r_metrics", "<div style='font-size:11px;font-weight:800;color:#16A34A;margin-bottom:2px;'>SUCCESS METRICS</div><div style='font-size:8.5px;line-height:1.4;color:#0F172A;'>⏱️ <b>Time to Regulatory Insight:</b> ▼ 60%+<br/>⚙️ <b>Automation Rate:</b> ▲ 70%+<br/>📈 <b>Platform Availability:</b> 99.99%+<br/>💰 <b>Cost Efficiency:</b> ▲ 30%+<br/>👤 <b>User Adoption:</b> ▲ 80%+<br/>✔ <b>Compliance Coverage:</b> 100%</div>", 1128, 388, 432, 172, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  // 6. BOTTOM ROW: MATURITY, EFFORT TREND, DEPENDENCIES & NEXT STEPS (x=20..1560, y=568..775)
  rect("bot_p1", "<div style='font-size:11px;font-weight:800;color:#1E3A8A;margin-bottom:2px;text-align:center;'>ARCHITECTURE MATURITY MODEL</div><div style='font-size:8.5px;color:#0F172A;display:flex;justify-content:space-around;text-align:center;'><div><b>L1</b><br/>Siloed</div> <div>➔</div> <div><b>L2</b><br/>Standardized</div> <div>➔</div> <div><b>L3</b><br/>Integrated</div> <div>➔</div> <div><b>L4</b><br/>Intelligent</div> <div>➔</div> <div><b>L5</b><br/>Autonomous</div></div>", 20, 568, 360, 178, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=3;");

  rect("bot_p2", "<div style='font-size:11px;font-weight:800;color:#2563EB;margin-bottom:2px;text-align:center;'>INVESTMENT &amp; EFFORT TREND</div><div style='font-size:8.5px;line-height:1.4;color:#0F172A;'>📈 <b>Business Value:</b> Exponential Growth<br/>📉 <b>Manual Effort:</b> Declining with Automation<br/>💰 <b>ROI Target:</b> Break-even at Phase 1, High Margin at Phase 3</div>", 390, 568, 360, 178, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=middle;padding=4;");

  rect("bot_p3", "<div style='font-size:11px;font-weight:800;color:#16A34A;margin-bottom:2px;'>DEPENDENCIES</div><div style='font-size:8.5px;line-height:1.4;color:#0F172A;'>✔ Executive Sponsorship<br/>✔ Budget &amp; Resource Allocation<br/>✔ Data Availability &amp; Quality<br/>✔ Vendor &amp; Partner Alignment<br/>✔ Change Management &amp; Training</div>", 760, 568, 360, 178, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("bot_p4", "<div style='font-size:11px;font-weight:800;color:#7C3AED;margin-bottom:2px;text-align:center;'>NEXT STEPS</div><div style='font-size:8.5px;color:#0F172A;display:flex;justify-content:space-around;text-align:center;align-items:center;'><div>📑<br/>Validate</div> <div>➔</div> <div>🎯<br/>Prioritize</div> <div>➔</div> <div>📐<br/>Design</div> <div>➔</div> <div>🚀<br/>Execute</div> <div>➔</div> <div>🔄<br/>Review</div></div>", 1130, 568, 430, 178, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=4;");

  // 7. FOOTER METADATA STRIP (x=20..1560, y=752..775)
  rect("footer_meta", "<div style='font-size:10.5px;color:#0F172A;display:flex;justify-content:space-between;align-items:center;'><div><b>LEGEND:</b> 🟩 Phase 0 (Foundation) &nbsp;|&nbsp; 🟦 Phase 1 (Scale) &nbsp;|&nbsp; 🟪 Phase 2 (Intelligent) &nbsp;|&nbsp; 🟧 Phase 3 (Autonomous)</div><div>Last Updated: May 8, 2025 &nbsp;|&nbsp; Next Review: Aug 8, 2025 &nbsp;|&nbsp; Owner: Enterprise Architecture Team</div></div>", 20, 752, 1540, 30, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=middle;padding=4;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_32_roadmap_evolution" name="Template 32: Architecture Evolution &amp; Roadmap">
    <mxGraphModel dx="1440" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1440" pageHeight="800" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${c.join("\n        ")}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
