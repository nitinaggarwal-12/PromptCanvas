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
  rect("num_badge", "32", 20, 16, 48, 48, "fillColor=#1E3A8A;fontColor=#FFFFFF;fontSize=24;fontStyle=1;rounded=1;align=center;verticalAlign=middle;");
  rect("hdr_title", "<div style='font-size:22px;font-weight:800;color:#0F172A;letter-spacing:0.5px;'>ARCHITECTURE EVOLUTION &amp; ROADMAP</div><div style='font-size:11px;color:#1E3A8A;font-weight:700;margin-top:2px;'>Use Case: NovaCura – AI-Powered Regulatory Intelligence Platform &nbsp;|&nbsp; Environment: Production &nbsp;|&nbsp; Region: us-central1 &nbsp;|&nbsp; Last Updated: May 8, 2025</div>", 78, 16, 840, 48, "strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=10;");
  rect("hdr_brand", "<div style='text-align:right;'><span style='font-size:20px;font-weight:800;color:#0284C7;'>🧬 NOVACURA</span><br/><span style='font-size:9.5px;color:#64748B;font-style:italic;'>AI-Powered Regulatory Intelligence Platform</span></div>", 940, 16, 280, 48, "strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

  // Objective Card
  rect("card_obj", "<div style='font-size:8.5px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>OBJECTIVE</div><div style='font-size:10px;line-height:1.35;color:#0F172A;'>Evolve the architecture in phases to achieve business outcomes, reduce risk, and enable continuous innovation with cloud-native, secure, and scalable capabilities.</div>", 1240, 16, 320, 48, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=4;");

  // 2. LEFT COLUMN: EVOLUTION PRINCIPLES & DRIVERS (x=20..115, y=72..410)
  rect("box_l_prin", "<div style='font-size:9px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>EVOLUTION PRINCIPLES</div><div style='font-size:10px;line-height:1.3;color:#0F172A;'>✔ Iterative &amp; Value-Driven<br/>✔ Cloud Native &amp; API-First<br/>✔ Security &amp; Compliance by Design<br/>✔ Data as Strategic Asset<br/>✔ Automate Everything<br/>✔ Observability &amp; Resilience<br/>✔ Cost Efficient &amp; Sustainable</div>", 20, 72, 95, 175, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  rect("box_l_drivers", "<div style='font-size:9px;font-weight:800;color:#2563EB;margin-bottom:2px;'>DRIVERS</div><div style='font-size:10px;line-height:1.3;color:#0F172A;'>📈 Regulatory Complexity Growth<br/>📊 Data Volume &amp; Variety<br/>⏱️ Need for Real-time Intel<br/>🧠 AI / ML Capability Maturity<br/>⚙️ Operational Efficiency<br/>🚀 Scalability &amp; Performance<br/>🔒 Security &amp; Compliance</div>", 20, 252, 95, 158, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  // 3. TOP STAKEHOLDERS STRIP (x=122..1150, y=72..108)
  rect("box_stakeholders", "<div style='font-size:9px;font-weight:800;color:#1E3A8A;margin-bottom:2px;text-align:center;'>STAKEHOLDERS</div><div style='font-size:10px;display:flex;justify-content:space-around;text-align:center;'><div>👥 Business Leaders</div> <div>👥 Regulatory &amp; Compliance</div> <div>👥 Product Mgmt</div> <div>👥 Enterprise Arch</div> <div>🛡️ Security &amp; Risk</div> <div>🗄️ Data Governance</div> <div>⚙️ Platform Eng</div> <div>💻 Dev / QA</div></div>", 122, 72, 1020, 36, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=top;padding=2;");

  // 4. MAIN ARCHITECTURE EVOLUTION ROADMAP (x=122..1150, y=112..352)
  rect("box_road_main", "", 122, 112, 1020, 240, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;rounded=1;");
  rect("lbl_road_main", "<span style='font-size:10px;font-weight:800;color:#2563EB;'>ARCHITECTURE EVOLUTION ROADMAP</span>", 122, 114, 1020, 10, "strokeColor=none;fillColor=none;align=center;");

  const rphases = [
    { n: "PHASE 0: FOUNDATION", t: "(Now – Q2 2025)", col: "#16A34A", bg: "#F0FDF4", sub: "Stabilize core platform, establish security foundation, enable initial AI capabilities.", outs: "• Compliant &amp; Secure Core Platform<br/>• Single Source of Regulatory Truth<br/>• Faster Manual Research", arch: "Web/API ➔ Microservices ➔ Data Store ➔ Cloud Infra" },
    { n: "PHASE 1: SCALE &amp; INTEGRATE", t: "(Q3 – Q4 2025)", col: "#2563EB", bg: "#EFF6FF", sub: "Scale platform, integrate more data sources, expand AI/automation capabilities.", outs: "• Wider Coverage &amp; Integrations<br/>• Higher Automation &amp; Efficiency<br/>• Scalable &amp; Reusable Platform", arch: "Event Bus, Workflow Engine, Data Lake, Vector DB" },
    { n: "PHASE 2: INTELLIGENT &amp; AUTO", t: "(H1 2026)", col: "#7C3AED", bg: "#FAF5FF", sub: "Increase automation, enable predictive intelligence, self-service analytics.", outs: "• Predictive Regulatory Intelligence<br/>• Self-Service Insights<br/>• Reduced Time-to-Insight by 60%+", arch: "AI Copilot, Event Stream, Data Lakehouse" },
    { n: "PHASE 3: AUTONOMOUS", t: "(H2 2026+)", col: "#D97706", bg: "#FFFBEB", sub: "Autonomous operations, advanced AI agents, ecosystem-driven innovation.", outs: "• Autonomous Regulatory Operations<br/>• Proactive Compliance<br/>• Continuous Innovation Engine", arch: "AI Agents, Marketplace, Data Mesh, Multi-Cloud" }
  ];

  rphases.forEach((rp, idx) => {
    const rx = 128 + idx * 252;
    rect(`rp_box_${idx}`, `<div style='font-size:8px;font-weight:800;color:${rp.col};text-align:center;'>${rp.n}</div><div style='font-size:10px;color:#64748B;text-align:center;'>${rp.t}</div><div style='font-size:10px;line-height:1.2;color:#0F172A;margin-top:2px;'>${rp.sub}</div><div style='border-top:1px solid #CBD5E1;margin-top:2px;padding-top:2px;font-size:10px;line-height:1.2;color:#0F172A;'><b>OUTCOMES:</b><br/>${rp.outs}</div><div style='background:#FFF;border:1px solid #CBD5E1;border-radius:2px;padding:2px;margin-top:2px;font-size:10px;text-align:center;color:#64748B;'>${rp.arch}</div>`, rx, 126, 246, 178, `fillColor=${rp.bg};strokeColor=${rp.col};rounded=1;align=left;verticalAlign=top;padding=2;`);
  });

  // Cross-Phase Key Enablers
  rect("box_cross_enablers", "<div style='font-size:8px;font-weight:800;color:#2563EB;text-align:center;'>KEY ENABLERS (CROSS-PHASE): 🔒 Security &amp; Zero Trust &nbsp;|&nbsp; 🔑 Identity &amp; Access &nbsp;|&nbsp; 📈 Observability &nbsp;|&nbsp; 🏗️ CI/CD &amp; GitOps &nbsp;|&nbsp; ☁️ IaC &nbsp;|&nbsp; 🗄️ Data Governance &nbsp;|&nbsp; 🗃️ Backup &amp; DR</div>", 128, 308, 1008, 18, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=center;verticalAlign=middle;");

  // Capability Areas Table (y=330..410)
  rect("box_cap_table", "<div style='font-size:10px;line-height:1.2;color:#0F172A;'><table style='width:100%;border-collapse:collapse;'><tr style='font-weight:700;border-bottom:1px solid #CBD5E1;background:#F8FAFC;'><td>CAPABILITY</td><td>PHASE 0</td><td>PHASE 1</td><td>PHASE 2</td><td>PHASE 3</td></tr><tr><td><b>Platform</b></td><td>Core GKE, networking</td><td>Multi-env, autoscaling</td><td>Service mesh, resilience</td><td>Multi-cloud / hybrid</td></tr><tr><td><b>Data</b></td><td>Central data lake</td><td>Data catalog, streaming</td><td>Data mesh, real-time</td><td>Active data fabric</td></tr><tr><td><b>AI/ML</b></td><td>LLM integration, search RAG</td><td>RAG, advanced NLP</td><td>Predictive models, anomaly</td><td>Autonomous agents</td></tr></table></div>", 122, 330, 1020, 80, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=2;");

  // 5. RIGHT COLUMN: MODERNIZATION THEMES, RISK & MITIGATION, SUCCESS METRICS (x=1150..1560, y=72..410)
  rect("box_r_themes", "<div style='font-size:9px;font-weight:800;color:#1E3A8A;margin-bottom:1px;'>MODERNIZATION THEMES</div><div style='font-size:10px;line-height:1.25;color:#0F172A;'>📦 Decompose &amp; Modularize<br/>⚡ Event-driven Architecture<br/>🗄️ Data Platform Modernization<br/>🧠 AI / ML Integration<br/>⚙️ Automation &amp; Orchestration<br/>💻 Developer Experience<br/>🌐 Ecosystem &amp; Extensibility</div>", 1150, 72, 410, 105, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=2;");

  rect("box_r_risk_mit", "<div style='font-size:9px;font-weight:800;color:#DC2626;margin-bottom:1px;'>RISK &amp; MITIGATION</div><div style='font-size:10px;line-height:1.2;color:#0F172A;'><table style='width:100%;border-collapse:collapse;'><tr style='font-weight:700;border-bottom:1px solid #CBD5E1;'><td>RISK</td><td>MITIGATION</td></tr><tr><td>Integration Complexity</td><td>API Standards, Incremental</td></tr><tr><td>Data Quality Issues</td><td>Data Governance, Validation</td></tr><tr><td>Security Vulns</td><td>Zero Trust, Continuous Test</td></tr><tr><td>Cost Overrun</td><td>FinOps, Budgets, Right-sizing</td></tr><tr><td>Adoption Resistance</td><td>Change Mgmt, Training</td></tr></table></div>", 1150, 180, 410, 115, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=2;");

  rect("box_r_metrics", "<div style='font-size:9px;font-weight:800;color:#16A34A;margin-bottom:1px;'>SUCCESS METRICS</div><div style='font-size:10px;line-height:1.25;color:#0F172A;'>⏱️ <b>Time to Regulatory Insight:</b> ▼ 60%+<br/>⚙️ <b>Automation Rate:</b> ▲ 70%+<br/>🛡️ <b>Platform Availability:</b> 99.99%+<br/>💰 <b>Cost Efficiency:</b> ▲ 30%+<br/>👤 <b>User Adoption:</b> ▲ 80%+<br/>✔ <b>Compliance Coverage:</b> 100%</div>", 1150, 298, 410, 112, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=2;");

  // 6. BOTTOM ROW: MATURITY MODEL, INVESTMENT TREND, DEPENDENCIES, NEXT STEPS (x=20..1560, y=546..740)
  rect("bot_maturity", "<div style='font-size:10px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>ARCHITECTURE MATURITY MODEL</div><div style='font-size:8px;line-height:1.35;color:#0F172A;'>L1 ➔ L2 ➔ L3 ➔ L4 ➔ L5<br/><b>Siloed</b> ➔ <b>Standardized</b> ➔ <b>Integrated</b> ➔ <b>Intelligent</b> ➔ <b>Autonomous</b></div>", 20, 546, 350, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("bot_invest", "<div style='font-size:10px;font-weight:800;color:#2563EB;margin-bottom:2px;'>INVESTMENT &amp; EFFORT TREND</div><div style='font-size:8px;line-height:1.35;color:#0F172A;'>📈 <b>Business Value:</b> Exponential Growth<br/>📉 <b>Manual Effort:</b> Declining with Automation<br/>💰 <b>ROI Target:</b> Break-even at Phase 1, High Margin at Phase 3</div>", 380, 546, 350, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("bot_deps", "<div style='font-size:10px;font-weight:800;color:#7C3AED;margin-bottom:2px;'>DEPENDENCIES</div><div style='font-size:8px;line-height:1.35;color:#0F172A;'>✔ Executive Sponsorship<br/>✔ Budget &amp; Resource Allocation<br/>✔ Data Availability &amp; Quality<br/>✔ Vendor &amp; Partner Alignment<br/>✔ Change Management &amp; Training</div>", 740, 546, 350, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("bot_steps", "<div style='font-size:10px;font-weight:800;color:#16A34A;margin-bottom:2px;text-align:center;'>NEXT STEPS</div><div style='font-size:8px;display:flex;justify-content:space-around;text-align:center;align-items:center;margin-top:15px;'><div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:3px;border-radius:3px;'>📋<br/><b>Validate</b></div> <div>➔</div> <div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:3px;border-radius:3px;'>🎯<br/><b>Prioritize</b></div> <div>➔</div> <div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:3px;border-radius:3px;'>📐<br/><b>Design</b></div> <div>➔</div> <div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:3px;border-radius:3px;'>🚀<br/><b>Execute</b></div> <div>➔</div> <div style='border:1px solid #16A34A;background:#F0FDF4;padding:3px;border-radius:3px;'>🔄<br/><b>Review</b></div></div>", 1100, 546, 460, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=top;padding=4;");

  // 7. FOOTER METADATA STRIP (x=20..1560, y=744..768)
  rect("footer_meta", "<div style='font-size:9px;color:#0F172A;display:flex;justify-content:space-between;align-items:center;'><div><b>LEGEND:</b> 🟩 Phase 0 (Foundation) &nbsp;|&nbsp; 🟦 Phase 1 (Scale) &nbsp;|&nbsp; 🟪 Phase 2 (Intelligent) &nbsp;|&nbsp; 🟧 Phase 3 (Autonomous)</div><div>Last Updated: May 8, 2025 &nbsp;|&nbsp; Next Review: Aug 8, 2025 &nbsp;|&nbsp; Owner: Enterprise Architecture Team</div></div>", 20, 744, 1540, 24, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=middle;padding=3;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_32_architecture_evolution_roadmap" name="Template 32: Architecture Evolution &amp; Roadmap">
    <mxGraphModel dx="1600" dy="780" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="780" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${c.join("\n        ")}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
