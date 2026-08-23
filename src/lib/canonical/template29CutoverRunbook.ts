/**
 * Canonical Architecture Template 29: Cutover / Runbook Architecture
 * Exact 1:1 High-Fidelity Master Blueprint of images/29.png
 */

export function generateTemplate29CutoverRunbookXml(
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
  rect("num_badge", "29", 20, 20, 48, 48, "fillColor=#1E3A8A;fontColor=#FFFFFF;fontSize=24;fontStyle=1;rounded=1;align=center;verticalAlign=middle;");
  rect("hdr_title", "<div style='font-size:24px;font-weight:800;color:#0F172A;letter-spacing:0.5px;'>Cutover / Runbook Architecture</div><div style='font-size:11px;color:#1E3A8A;font-weight:700;margin-top:3px;'>Use Case: NovaCura – Production Go-Live &amp; Environment Cutover &nbsp;|&nbsp; Environment: Production &nbsp;|&nbsp; Region: us-central1 &nbsp;|&nbsp; Last Updated: May 8, 2025</div>", 78, 16, 850, 56, "strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  rect("hdr_brand", "<div style='text-align:right;'><span style='font-size:20px;font-weight:800;color:#0284C7;'>🧬 NOVACURA</span><br/><span style='font-size:9.5px;color:#64748B;font-style:italic;'>AI-Powered Regulatory Intelligence Platform</span></div>", 940, 18, 280, 45, "strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

  // Objective Card
  rect("card_obj", "<div style='font-size:12px;font-weight:800;color:#1E3A8A;margin-bottom:3px;'>OBJECTIVE</div><div style='font-size:11.5px;line-height:1.4;color:#0F172A;'>Execute a safe, controlled and verifiable cutover to production with minimal downtime, zero/low data loss and rapid rollback capability using a well-defined runbook.</div>", 1240, 18, 320, 52, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=6;");

  // 2. LEFT COLUMN 1: RUNBOOK OVERVIEW (x=20..170, y=78..260)
  rect("box_rb_ov", "<div style='font-size:11px;font-weight:800;color:#1E3A8A;margin-bottom:4px;'>RUNBOOK OVERVIEW</div>" +
    "<div style='font-size:9px;line-height:1.45;color:#0F172A;'>" +
    "📱 <b>Application:</b> NovaCura<br/>" +
    "🏢 <b>Domain:</b> Regulatory Intel<br/>" +
    "☁️ <b>Platform:</b> Google Cloud<br/>" +
    "🔄 <b>Cutover Type:</b> Blue/Green<br/>" +
    "🎯 <b>Target:</b> Prod (us-central1)<br/>" +
    "⏱️ <b>RTO:</b> ≤ 30 minutes<br/>" +
    "⏱️ <b>RPO:</b> ≤ 5 minutes" +
    "</div>", 20, 78, 150, 178, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  // LEFT COLUMN 2: GO / NO-GO CRITERIA (x=20..170, y=262..465)
  rect("box_gng", "<div style='font-size:11px;font-weight:800;color:#16A34A;margin-bottom:4px;'>GO / NO-GO CRITERIA</div>" +
    "<div style='font-size:9px;line-height:1.45;color:#0F172A;'>" +
    "✔ All pre-cutover checks passed<br/>" +
    "✔ Critical defects = 0<br/>" +
    "✔ Performance tests successful<br/>" +
    "✔ Security &amp; compliance sign-off<br/>" +
    "✔ Business stakeholder approval" +
    "</div>", 20, 262, 150, 198, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  // 3. CENTER TOP: CUTOVER LIFECYCLE - PHASES (x=178..1180, y=78..260)
  rect("box_life", "", 178, 78, 1002, 178, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;rounded=1;");
  rect("lbl_life", "<span style='font-size:12px;font-weight:800;color:#2563EB;'>CUTOVER LIFECYCLE – PHASES</span>", 178, 82, 1002, 14, "strokeColor=none;fillColor=none;align=center;");

  const lPhases = [
    { n: "1", t: "PLAN &amp; PREPARE", sub: "(T-2 to T-14 Days)", d: "• Finalize cutover approach<br/>• Validate readiness criteria<br/>• Complete DR &amp; rollback plan<br/>• Obtain business sign-off", col: "#1E3A8A", bg: "#EFF6FF", x: 186, w: 160 },
    { n: "2", t: "PRE-CUTOVER", sub: "(T-24 to T-1 Hours)", d: "• Deploy &amp; warm up prod<br/>• Sync / freeze data (if needed)<br/>• Run pre-cutover checks<br/>• Get final go/no-go approval", col: "#7C3AED", bg: "#F5F3FF", x: 350, w: 160 },
    { n: "3", t: "CUTOVER", sub: "(T-0 Window)", d: "• Switch traffic to production<br/>• Enable services / agents<br/>• Run smoke &amp; validation tests<br/>• Monitor in real-time", col: "#16A34A", bg: "#F0FDF4", x: 514, w: 160 },
    { n: "4", t: "STABILIZATION", sub: "(T+0 to T+24 Hours)", d: "• Hypercare monitoring<br/>• Resolve P1/P2 issues<br/>• Validate KPIs &amp; SLAs<br/>• Confirm business usage", col: "#D97706", bg: "#FFFBEB", x: 678, w: 160 },
    { n: "5", t: "POST-CUTOVER", sub: "(T+1 to T+7 Days)", d: "• Performance optimization<br/>• Decommission old env (if any)<br/>• Documentation update<br/>• Formal go-live sign-off", col: "#0284C7", bg: "#F0F9FF", x: 842, w: 160 },
    { n: "6", t: "OPERATE", sub: "(BAU)", d: "• Steady state operations<br/>• Continuous monitoring<br/>• Cost &amp; usage optimization<br/>• Ongoing improvements", col: "#475569", bg: "#F8FAFC", x: 1006, w: 164 }
  ];

  lPhases.forEach((lp, idx) => {
    rect(`lp_box_${idx}`, "", lp.x, 98, lp.w, 148, `fillColor=${lp.bg};strokeColor=${lp.col};strokeWidth=1;rounded=1;`);
    rect(`lp_hdr_${idx}`, `<div style='font-size:10.5px;font-weight:800;color:${lp.col};'>${lp.n}. ${lp.t}</div><div style='font-size:8.5px;color:#64748B;'>${lp.sub}</div>`, lp.x, 102, lp.w, 20, "strokeColor=none;fillColor=none;align=center;");
    rect(`lp_d_${idx}`, `<div style='font-size:8.5px;line-height:1.4;color:#0F172A;'>${lp.d}</div>`, lp.x + 4, 126, lp.w - 8, 114, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");
  });

  // 4. CENTER MIDDLE: DETAILED RUNBOOK - CUTOVER STEPS (x=178..1180, y=262..465)
  rect("box_steps", "", 178, 262, 1002, 198, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;");
  rect("lbl_steps", "<span style='font-size:11.5px;font-weight:800;color:#1E3A8A;'>DETAILED RUNBOOK – CUTOVER STEPS</span>", 178, 266, 1002, 12, "strokeColor=none;fillColor=none;align=center;");

  const rSteps = [
    { n: "1", t: "Freeze &amp; Validate", d: "Freeze writes<br/>Final data sync<br/>Checksum validation", x: 186, w: 118 },
    { n: "2", t: "Deploy Prod", d: "Deploy services<br/>Run DB migrations<br/>Verify infra health", x: 308, w: 118 },
    { n: "3", t: "Dependencies", d: "Enable APIs<br/>Activate connectors<br/>Validate secrets", x: 430, w: 118 },
    { n: "4", t: "Switch Traffic", d: "Update DNS / LB<br/>Route to prod<br/>Verify traffic flow", x: 552, w: 118 },
    { n: "5", t: "Smoke Tests", d: "Run automated suite<br/>Validate key journeys", x: 674, w: 118 },
    { n: "6", t: "Business Val", d: "User acceptance<br/>Confirm data accuracy", x: 796, w: 118 },
    { n: "7", t: "Monitor &amp; Obs", d: "Track SLOs / SLIs<br/>Watch error rates<br/>Confirm stability", x: 918, w: 118 },
    { n: "8", t: "Close Cutover", d: "Declare go-live<br/>Lift data freeze<br/>Notify stakeholders", x: 1040, w: 130 }
  ];

  rSteps.forEach((rs, idx) => {
    rect(`rs_box_${idx}`, `<div style='font-size:10px;font-weight:800;color:#1E3A8A;'>${['❶','❷','❸','❹','❺','❻','❼','❽'][idx]} ${rs.t}</div><div style='font-size:8.5px;color:#0F172A;line-height:1.35;margin-top:4px;'>${rs.d}</div>`, rs.x, 282, rs.w, 168, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=3;");
  });

  // 5. FAR RIGHT CONTAINER: POST-CUTOVER TOPOLOGY (x=1188..1560, y=78..465)
  rect("box_r_top", "<div style='font-size:11px;font-weight:800;color:#1E3A8A;margin-bottom:4px;text-align:center;'>ENVIRONMENT TOPOLOGY (POST-CUTOVER)</div>" +
    "<div style='font-size:9px;color:#0F172A;text-align:center;'>" +
    "☁️ <b>Google Cloud</b><br/><br/>" +
    "👤 Users ➔ ⚖️ Cloud LB ➔ 🏢 <b>NovaCura (Prod)</b><br/><br/>" +
    "&nbsp;&nbsp;&nbsp;&nbsp;├── 🧠 Vertex AI (Models)<br/>" +
    "&nbsp;&nbsp;&nbsp;&nbsp;├── 📊 BigQuery (Data)<br/>" +
    "&nbsp;&nbsp;&nbsp;&nbsp;├── 🗄️ Cloud SQL (OLTP)<br/>" +
    "&nbsp;&nbsp;&nbsp;&nbsp;├── 🗃️ Cloud Storage (Docs)<br/>" +
    "&nbsp;&nbsp;&nbsp;&nbsp;└── 🔐 Secret Manager" +
    "</div>", 1188, 78, 372, 382, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=6;");

  // 6. MIDDLE ROW: ROLLBACK, RACI, TIMELINE, HYPERCARE (x=20..1560, y=468..650)
  rect("mid_p1", "<div style='font-size:11px;font-weight:800;color:#DC2626;margin-bottom:2px;'>⚠️ ROLLBACK PLAN</div><div style='font-size:8.5px;line-height:1.35;color:#0F172A;'>❶ Revert DNS / LB to previous env<br/>❷ Disable new production services<br/>❸ Restore data from last known good snapshot<br/>❹ Validate application health in previous env<br/>❺ Communicate status to stakeholders<br/>❻ Perform root cause analysis<br/><br/><b>Target Rollback Time:</b> ≤ 30 minutes</div>", 20, 468, 250, 178, "fillColor=#FEF2F2;strokeColor=#FECACA;rounded=1;align=left;verticalAlign=top;padding=3;");

  rect("mid_p2", "<div style='font-size:11px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>RACI – CUTOVER RESPONSIBILITIES</div><div style='font-size:8.5px;color:#0F172A;'>" +
    "<table style='width:100%;border-collapse:collapse;text-align:center;'>" +
    "<tr style='font-weight:800;color:#1E3A8A;'><td>ROLE</td><td>PLAN</td><td>EXEC</td><td>MON</td><td>APP</td><td>ROLL</td></tr>" +
    "<tr><td><b>Program Lead</b></td><td style='color:#16A34A;'>R</td><td style='color:#2563EB;'>C</td><td style='color:#2563EB;'>C</td><td style='color:#D97706;'>A</td><td style='color:#16A34A;'>R</td></tr>" +
    "<tr><td><b>Engineering</b></td><td style='color:#16A34A;'>R</td><td style='color:#16A34A;'>R</td><td style='color:#2563EB;'>R</td><td style='color:#2563EB;'>C</td><td style='color:#16A34A;'>R</td></tr>" +
    "<tr><td><b>SRE / DevOps</b></td><td style='color:#2563EB;'>C</td><td style='color:#16A34A;'>R</td><td style='color:#16A34A;'>R</td><td style='color:#2563EB;'>C</td><td style='color:#16A34A;'>R</td></tr>" +
    "<tr><td><b>Compliance</b></td><td style='color:#2563EB;'>C</td><td style='color:#2563EB;'>C</td><td style='color:#2563EB;'>C</td><td style='color:#D97706;'>A</td><td style='color:#2563EB;'>C</td></tr>" +
    "<tr><td><b>Business Owner</b></td><td style='color:#2563EB;'>C</td><td style='color:#2563EB;'>C</td><td style='color:#2563EB;'>C</td><td style='color:#D97706;'>A</td><td style='color:#2563EB;'>C</td></tr>" +
    "<tr><td><b>Support / NOC</b></td><td>I</td><td style='color:#2563EB;'>C</td><td style='color:#16A34A;'>R</td><td>I</td><td style='color:#16A34A;'>R</td></tr>" +
    "</table></div>", 276, 468, 380, 178, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  rect("mid_p3", "<div style='font-size:11px;font-weight:800;color:#2563EB;margin-bottom:2px;'>CUTOVER TIMELINE (T-0 WINDOW EXAMPLE)</div><div style='font-size:8.5px;line-height:1.4;color:#0F172A;'>18:00 • Change freeze begins<br/>19:00 • Final data sync &amp; pre-checks<br/>20:00 • Production deployment<br/>21:00 • Switch traffic (DNS / LB)<br/>21:15 • Smoke tests &amp; validation<br/>22:00 • Business sign-off<br/>22:30 • Go-live declared<br/><br/><b>Total Cutover Window:</b> 2.5 Hours</div>", 662, 468, 380, 178, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  rect("mid_p4", "<div style='font-size:11px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>MONITORING &amp; ALERTING (HYPERCARE)</div><div style='font-size:8.5px;line-height:1.4;color:#0F172A;display:grid;grid-template-columns:repeat(2, 1fr);gap:2px;'><div>📈 <b>Cloud Monitoring</b> (Metrics)</div> <div>📑 <b>Cloud Logging</b> (Logs)</div> <div>⚠️ <b>Error Reporting</b></div> <div>🩺 <b>Uptime Checks</b></div> <div>🚨 <b>PagerDuty</b> (On-call)</div> <div>💬 <b>Slack / Email</b></div></div>", 1048, 468, 512, 178, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  // 7. BOTTOM ROW: METRICS, RISKS, CHECKLIST, COMMS & NOTES (x=20..1560, y=652..775)
  rect("bot_p1", "<div style='font-size:11px;font-weight:800;color:#16A34A;margin-bottom:2px;'>KEY SUCCESS METRICS</div><div style='font-size:8.5px;line-height:1.4;color:#0F172A;'>✔ Service availability ≥ 99.9%<br/>✔ Error rate ≤ 0.1%<br/>✔ P95 latency within SLO (&lt; 2s)<br/>✔ Zero data loss (RPO met)<br/>✔ All critical business flows validated<br/>✔ No P1 incidents in first 24 hours</div>", 20, 652, 280, 120, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  rect("bot_p2", "<div style='font-size:11px;font-weight:800;color:#DC2626;margin-bottom:2px;'>RISK &amp; MITIGATION</div><div style='font-size:8.5px;color:#0F172A;'>" +
    "<table style='width:100%;border-collapse:collapse;'>" +
    "<tr><td><b>Data inconsistency</b></td><td>High</td><td>Pre-sync + checksum</td></tr>" +
    "<tr><td><b>Service downtime</b></td><td>High</td><td>Blue/green rollback</td></tr>" +
    "<tr><td><b>Perf degradation</b></td><td>Med</td><td>Load test + autoscaling</td></tr>" +
    "<tr><td><b>API failure</b></td><td>Med</td><td>Pre-val + fallback</td></tr>" +
    "</table></div>", 306, 652, 330, 120, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  rect("bot_p3", "<div style='font-size:11px;font-weight:800;color:#2563EB;margin-bottom:2px;'>CHECKLIST (EXECUTION)</div><div style='font-size:8.5px;line-height:1.4;color:#0F172A;'>✔ Pre-cutover sign-off obtained<br/>✔ All runbook steps reviewed<br/>✔ Rollback plan validated (dry run)<br/>✔ Communication plan activated<br/>✔ Hypercare team on standby</div>", 642, 652, 300, 120, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  rect("bot_p4", "<div style='font-size:11px;font-weight:800;color:#7C3AED;margin-bottom:2px;'>COMMUNICATION PLAN</div><div style='font-size:8.5px;line-height:1.4;color:#0F172A;'>👥 <b>Stakeholders:</b> Execs, Business, OC<br/>✉️ <b>Channels:</b> Email, Slack, War Room<br/>⏱️ <b>Cadence:</b> Pre / During / Post</div>", 948, 652, 280, 120, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  rect("bot_p5", "<div style='font-size:11px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>NOTES</div><div style='font-size:8.5px;line-height:1.35;color:#64748B;'>• Runbook reviewed for each release.<br/>• Perform periodic cutover drills.<br/>• Maintain central knowledge base.<br/>• Ensure 21 CFR Part 11 compliance.</div>", 1234, 652, 326, 120, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_29_cutover_runbook" name="Template 29: Cutover / Runbook Architecture">
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
