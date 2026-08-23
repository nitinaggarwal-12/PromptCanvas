/**
 * Canonical Architecture Template 33: Architecture Matrix Heatmap
 * Exact 1:1 High-Fidelity Master Blueprint of images/33.png
 */

export function generateTemplate33MatrixHeatmapXml(
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

  // 1. BRAND HEADER & METADATA
  rect("num_badge", "33", 20, 20, 48, 48, "fillColor=#1E3A8A;fontColor=#FFFFFF;fontSize=24;fontStyle=1;rounded=1;align=center;verticalAlign=middle;");
  rect("hdr_title", "<div style='font-size:24px;font-weight:800;color:#0F172A;letter-spacing:0.5px;'>ARCHITECTURE MATRIX HEATMAP</div><div style='font-size:11px;color:#1E3A8A;font-weight:700;margin-top:3px;'>Evaluate &amp; Prioritize Architectural Options for NovaCura &nbsp;|&nbsp; Environment: Production &nbsp;|&nbsp; Region: us-central1 &nbsp;|&nbsp; Last Updated: May 8, 2025</div>", 78, 16, 850, 56, "strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  rect("hdr_brand", "<div style='text-align:right;'><span style='font-size:20px;font-weight:800;color:#0284C7;'>🧬 NOVACURA</span><br/><span style='font-size:9.5px;color:#64748B;font-style:italic;'>AI-Powered Regulatory Intelligence Platform</span></div>", 940, 18, 280, 45, "strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

  // How to Read Card
  rect("card_obj", "<div style='font-size:11.5px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>HOW TO READ</div><div style='font-size:10.5px;line-height:1.35;color:#0F172A;'>Scores: 1 (Low / Poor) to 5 (High / Excellent)<br/>Colors: <span style='color:#16A34A;font-weight:700;'>Green = Strong</span> &nbsp; <span style='color:#D97706;font-weight:700;'>Yellow = Moderate</span> &nbsp; <span style='color:#DC2626;font-weight:700;'>Red = Weak</span><br/>Higher score is better for all criteria</div>", 1240, 18, 320, 52, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=4;");

  // 2. LEFT COLUMN: CRITERIA, SCORING & OPTIONS (x=20..180, y=78..560)
  rect("box_l_crit", "<div style='font-size:11px;font-weight:800;color:#1E3A8A;margin-bottom:3px;'>EVALUATION CRITERIA (WEIGHT)</div><div style='font-size:8.5px;line-height:1.4;color:#0F172A;'>💼 Business Value (15%)<br/>📈 Scalability (10%)<br/>⏱️ Performance (10%)<br/>🛡️ Security (15%)<br/>⚖️ Compliance Fit (10%)<br/>💰 Cost Efficiency (10%)<br/>🛠️ Implementation Effort (10%)<br/>⚙️ Operational Complexity (5%)<br/>⏱️ Time to Value (5%)</div>", 20, 78, 160, 180, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  rect("box_l_score", "<div style='font-size:11px;font-weight:800;color:#1E3A8A;margin-bottom:3px;'>SCORING GUIDE</div><div style='font-size:8.5px;line-height:1.4;color:#0F172A;'><b>5</b> &nbsp; Excellent – Best in class<br/><b>4</b> &nbsp; Good – Strong capability<br/><b>3</b> &nbsp; Moderate – Acceptable / Avg<br/><b>2</b> &nbsp; Low – Below average<br/><b>1</b> &nbsp; Poor – Not recommended</div>", 20, 264, 160, 120, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  rect("box_l_opts", "<div style='font-size:11px;font-weight:800;color:#1E3A8A;margin-bottom:3px;'>OPTIONS LEGEND</div><div style='font-size:8.5px;line-height:1.4;color:#0F172A;'><b>A</b>: Current State (As-Is)<br/><b>B</b>: Lift &amp; Shift<br/><b>C</b>: Modernize (Incremental)<br/><b>D</b>: Cloud Native (Target)<br/><b>E</b>: Future State (AI-Native)</div>", 20, 390, 160, 170, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  // 3. CENTER LARGE MATRIX HEATMAP (x=188..1560, y=78..560)
  rect("box_matrix", "", 188, 78, 1372, 482, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;rounded=1;");
  rect("lbl_matrix", "<span style='font-size:12px;font-weight:800;color:#2563EB;'>ARCHITECTURE OPTIONS</span>", 188, 82, 1372, 14, "strokeColor=none;fillColor=none;align=center;");

  // Header row for options A, B, C, D, E, Weight, Best Option
  const optCols = [
    { opt: "A", t: "CURRENT STATE (AS-IS)", sub: "On-Prem Monolith", col: "#1E3A8A", x: 348, w: 175 },
    { opt: "B", t: "LIFT &amp; SHIFT", sub: "Rehost to Cloud (IaaS)", col: "#0D9488", x: 527, w: 175 },
    { opt: "C", t: "MODERNIZE", sub: "Incremental Modernization", col: "#7C3AED", x: 706, w: 175 },
    { opt: "D", t: "CLOUD NATIVE", sub: "Microservices + Managed Svcs", col: "#D97706", x: 885, w: 175 },
    { opt: "E", t: "FUTURE STATE (AI-NATIVE)", sub: "AI-Native, Autonomous Platform", col: "#2563EB", x: 1064, w: 185 }
  ];

  optCols.forEach(oc => {
    rect(`oc_box_${oc.opt}`, `<div style='font-size:10.5px;font-weight:800;color:#FFFFFF;background:${oc.col};padding:2px;border-radius:3px;'>${oc.opt} &nbsp; ${oc.t}</div><div style='font-size:8.5px;color:#0F172A;margin-top:2px;'>${oc.sub}</div>`, oc.x, 98, oc.w, 42, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=2;");
  });

  rect("hdr_weight", "<div style='font-size:10.5px;font-weight:800;color:#1E3A8A;'>WEIGHT<br/>(%)</div>", 1253, 98, 95, 42, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("hdr_best", "<div style='font-size:10.5px;font-weight:800;color:#1E3A8A;'>BEST OPTION<br/>(BY CRITERIA)</div>", 1352, 98, 200, 42, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");

  // Matrix Rows
  const mRows = [
    { t: "💼 Business Value", a: 2, b: 3, c: 4, d: 5, e: 5, w: "15%", best: "E", aBg: "#FED7AA", bBg: "#FEF9C3", cBg: "#DCFCE7", dBg: "#86EFAC", eBg: "#86EFAC" },
    { t: "📈 Scalability", a: 1, b: 3, c: 4, d: 5, e: 5, w: "10%", best: "D / E", aBg: "#FECACA", bBg: "#FEF9C3", cBg: "#DCFCE7", dBg: "#86EFAC", eBg: "#86EFAC" },
    { t: "⏱️ Performance", a: 2, b: 3, c: 4, d: 5, e: 5, w: "10%", best: "D / E", aBg: "#FED7AA", bBg: "#FEF9C3", cBg: "#DCFCE7", dBg: "#86EFAC", eBg: "#86EFAC" },
    { t: "🛡️ Security", a: 2, b: 3, c: 4, d: 5, e: 5, w: "15%", best: "D / E", aBg: "#FED7AA", bBg: "#FEF9C3", cBg: "#DCFCE7", dBg: "#86EFAC", eBg: "#86EFAC" },
    { t: "⚖️ Compliance Fit", a: 2, b: 3, c: 4, d: 5, e: 5, w: "10%", best: "D / E", aBg: "#FED7AA", bBg: "#FEF9C3", cBg: "#DCFCE7", dBg: "#86EFAC", eBg: "#86EFAC" },
    { t: "💰 Cost Efficiency", a: 2, b: 4, c: 3, d: 4, e: 4, w: "10%", best: "B / D / E", aBg: "#FED7AA", bBg: "#DCFCE7", cBg: "#FEF9C3", dBg: "#DCFCE7", eBg: "#DCFCE7" },
    { t: "🛠️ Impl Effort", a: 5, b: 4, c: 3, d: 2, e: 1, w: "10%", best: "A", aBg: "#86EFAC", bBg: "#DCFCE7", cBg: "#FEF9C3", dBg: "#FED7AA", eBg: "#FECACA" },
    { t: "⚙️ Complexity", a: 2, b: 3, c: 4, d: 4, e: 3, w: "5%", best: "C / D", aBg: "#FED7AA", bBg: "#FEF9C3", cBg: "#DCFCE7", dBg: "#DCFCE7", eBg: "#FEF9C3" },
    { t: "⏱️ Time to Value", a: 5, b: 4, c: 3, d: 2, e: 2, w: "5%", best: "A / B", aBg: "#86EFAC", bBg: "#DCFCE7", cBg: "#FEF9C3", dBg: "#FED7AA", eBg: "#FED7AA" }
  ];

  mRows.forEach((mr, idx) => {
    const y = 144 + idx * 36;
    rect(`mr_lbl_${idx}`, `<div style='font-size:9.5px;font-weight:700;'>${mr.t}</div>`, 196, y, 148, 32, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=middle;padding=3;");
    rect(`mr_a_${idx}`, `<div style='font-size:11px;font-weight:800;'>${mr.a}</div>`, 348, y, 175, 32, `fillColor=${mr.aBg};strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;`);
    rect(`mr_b_${idx}`, `<div style='font-size:11px;font-weight:800;'>${mr.b}</div>`, 527, y, 175, 32, `fillColor=${mr.bBg};strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;`);
    rect(`mr_c_${idx}`, `<div style='font-size:11px;font-weight:800;'>${mr.c}</div>`, 706, y, 175, 32, `fillColor=${mr.cBg};strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;`);
    rect(`mr_d_${idx}`, `<div style='font-size:11px;font-weight:800;'>${mr.d}</div>`, 885, y, 175, 32, `fillColor=${mr.dBg};strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;`);
    rect(`mr_e_${idx}`, `<div style='font-size:11px;font-weight:800;'>${mr.e}</div>`, 1064, y, 185, 32, `fillColor=${mr.eBg};strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;`);
    rect(`mr_w_${idx}`, `<div style='font-size:9.5px;font-weight:700;'>${mr.w}</div>`, 1253, y, 95, 32, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
    rect(`mr_best_${idx}`, `<div style='font-size:9.5px;font-weight:800;color:#1E3A8A;'>${mr.best}</div>`, 1352, y, 200, 32, "fillColor=#EFF6FF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  });

  // Summary Row: Weighted Score & Rank
  const yScore = 144 + mRows.length * 36;
  rect("mr_score_lbl", "<div style='font-size:10.5px;font-weight:800;color:#1E3A8A;'>WEIGHTED SCORE<br/>(OUT OF 5)</div>", 196, yScore, 148, 36, "fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=1;rounded=1;align=center;verticalAlign=middle;");
  rect("mr_sc_a", "<div style='font-size:12px;font-weight:800;color:#DC2626;'>2.40</div>", 348, yScore, 175, 36, "fillColor=#FED7AA;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("mr_sc_b", "<div style='font-size:12px;font-weight:800;color:#D97706;'>3.25</div>", 527, yScore, 175, 36, "fillColor=#FEF9C3;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("mr_sc_c", "<div style='font-size:12px;font-weight:800;color:#16A34A;'>3.85</div>", 706, yScore, 175, 36, "fillColor=#DCFCE7;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("mr_sc_d", "<div style='font-size:12px;font-weight:800;color:#16A34A;'>4.45</div>", 885, yScore, 175, 36, "fillColor=#86EFAC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("mr_sc_e", "<div style='font-size:12px;font-weight:800;color:#16A34A;'>4.50</div>", 1064, yScore, 185, 36, "fillColor=#86EFAC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");

  const yRank = yScore + 40;
  rect("mr_rank_lbl", "<div style='font-size:10.5px;font-weight:800;color:#1E3A8A;'>RANK (1 = BEST)</div>", 196, yRank, 148, 32, "fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=1;rounded=1;align=center;verticalAlign=middle;");
  rect("mr_rk_a", "<div style='font-size:11px;font-weight:800;'>5</div>", 348, yRank, 175, 32, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("mr_rk_b", "<div style='font-size:11px;font-weight:800;'>4</div>", 527, yRank, 175, 32, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("mr_rk_c", "<div style='font-size:11px;font-weight:800;'>3</div>", 706, yRank, 175, 32, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("mr_rk_d", "<div style='font-size:11px;font-weight:800;'>2</div>", 885, yRank, 175, 32, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("mr_rk_e", "<div style='font-size:11px;font-weight:800;color:#16A34A;'>🥇 1</div>", 1064, yRank, 185, 32, "fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=1.5;rounded=1;align=center;verticalAlign=middle;");

  // 4. BOTTOM ROW: SUMMARY INSIGHTS, RECOMMENDED PATH, KEY CONSIDERATIONS, TOP REC (x=20..1560, y=568..775)
  rect("bot_p1", "<div style='font-size:11px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>SUMMARY INSIGHTS</div><div style='font-size:8.5px;line-height:1.4;color:#0F172A;'>⭐ <b>Option E (AI-Native)</b> scores highest overall, delivering best long-term value, scalability &amp; security.<br/>⭐ <b>Option D (Cloud Native)</b> is a strong near-term target with balanced cost, performance &amp; ops.<br/>⭐ <b>Option C (Modernize)</b> offers a practical stepping stone.<br/>⭐ <b>Option B (Lift &amp; Shift)</b> provides quick relocation but limited value realization.</div>", 20, 568, 430, 178, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("bot_p2", "<div style='font-size:11px;font-weight:800;color:#2563EB;margin-bottom:2px;text-align:center;'>RECOMMENDED PATH</div><div style='font-size:8.5px;color:#0F172A;display:flex;justify-content:space-around;text-align:center;align-items:center;'><div><b>Now (Q2 2025)</b><br/>Option C<br/>Modernize</div> <div>➔</div> <div><b>Next 12–18 Mos</b><br/>Option D<br/>Cloud Native</div> <div>➔</div> <div><b>18–36 Mos</b><br/>Option E<br/>AI-Native</div></div>", 460, 568, 430, 178, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=4;");

  rect("bot_p3", "<div style='font-size:11px;font-weight:800;color:#16A34A;margin-bottom:2px;'>KEY CONSIDERATIONS</div><div style='font-size:8.5px;line-height:1.4;color:#0F172A;'>✔ Business priorities &amp; risk appetite<br/>✔ Regulatory &amp; data residency needs<br/>✔ Skill sets &amp; organizational readiness<br/>✔ Change management &amp; training<br/>✔ TCO &amp; ROI over 3–5 years</div>", 900, 568, 330, 178, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("bot_p4", "<div style='font-size:11px;font-weight:800;color:#1E3A8A;margin-bottom:2px;text-align:center;'>TOP RECOMMENDATION</div><div style='font-size:9.5px;font-weight:800;color:#1E3A8A;text-align:center;margin-top:4px;'>🏆 Option E: AI-Native Platform</div><div style='font-size:8.5px;color:#64748B;text-align:center;margin-top:4px;'>Best long-term strategic fit for NovaCura</div>", 1240, 568, 320, 178, "fillColor=#F0FDF4;strokeColor=#16A34A;strokeWidth=1.5;rounded=1;align=center;verticalAlign=middle;padding=4;");

  // 5. FOOTER METADATA STRIP (x=20..1560, y=752..775)
  rect("footer_meta", "<div style='font-size:10.5px;color:#0F172A;display:flex;justify-content:space-between;align-items:center;'><div><b>LEGEND:</b> 🟥 1 Poor &nbsp;|&nbsp; 🟧 2 Low &nbsp;|&nbsp; 🟨 3 Moderate &nbsp;|&nbsp; 🟩 4 Good &nbsp;|&nbsp; 🟩 5 Excellent</div><div>Last Updated: May 8, 2025 &nbsp;|&nbsp; Next Review: Aug 8, 2025 &nbsp;|&nbsp; Owner: Enterprise Architecture Team</div></div>", 20, 752, 1540, 30, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=middle;padding=4;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_33_matrix_heatmap" name="Template 33: Architecture Matrix Heatmap">
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
