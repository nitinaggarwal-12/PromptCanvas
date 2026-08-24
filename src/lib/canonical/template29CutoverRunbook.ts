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
  rect("num_badge", "29", 20, 16, 48, 48, "fillColor=#1E3A8A;fontColor=#FFFFFF;fontSize=24;fontStyle=1;rounded=1;align=center;verticalAlign=middle;");
  rect("hdr_title", "<div style='font-size:22px;font-weight:800;color:#0F172A;letter-spacing:0.5px;'>Cutover / Runbook Architecture</div><div style='font-size:11px;color:#1E3A8A;font-weight:700;margin-top:2px;'>Use Case: NovaCura – Production Go-Live &amp; Environment Cutover &nbsp;|&nbsp; Environment: Production &nbsp;|&nbsp; Region: us-central1 &nbsp;|&nbsp; Last Updated: May 8, 2025</div>", 78, 16, 840, 48, "strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=10;");
  rect("hdr_brand", "<div style='text-align:right;'><span style='font-size:20px;font-weight:800;color:#0284C7;'>🧬 NOVACURA</span><br/><span style='font-size:9.5px;color:#64748B;font-style:italic;'>AI-Powered Regulatory Intelligence Platform</span></div>", 940, 16, 280, 48, "strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

  // Objective Card
  rect("card_obj", "<div style='font-size:8.5px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>OBJECTIVE</div><div style='font-size:10px;line-height:1.35;color:#0F172A;'>Execute a safe, controlled and verifiable cutover to production with minimal downtime, zero/low data loss and rapid rollback capability using a well-defined runbook.</div>", 1240, 16, 320, 48, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=4;");

  // 2. LEFT COLUMN: RUNBOOK OVERVIEW & GO/NO-GO CRITERIA (x=20..115, y=72..410)
  rect("box_ov", "<div style='font-size:9px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>RUNBOOK OVERVIEW</div><div style='font-size:8px;line-height:1.3;color:#0F172A;'>💻 <b>Application:</b> NovaCura<br/>🏛️ <b>Domain:</b> Regulatory Intel<br/>☁️ <b>Platform:</b> Google Cloud<br/>🔄 <b>Cutover:</b> Blue/Green<br/>🎯 <b>Target:</b> Prod (us-central1)<br/>⏱️ <b>RTO:</b> ≤ 30 minutes<br/>⏱️ <b>RPO:</b> ≤ 5 minutes</div>", 20, 72, 95, 165, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  rect("box_gng", "<div style='font-size:9px;font-weight:800;color:#16A34A;margin-bottom:2px;'>GO / NO-GO CRITERIA</div><div style='font-size:8px;line-height:1.35;color:#0F172A;'>✔ All pre-cutover checks passed<br/>✔ Critical defects = 0<br/>✔ Performance tests successful<br/>✔ Security &amp; compliance sign-off<br/>✔ Business stakeholder approval</div>", 20, 245, 95, 165, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  // 3. CENTER TOP: CUTOVER LIFECYCLE – PHASES (x=122..1130, y=72..195)
  rect("box_life_main", "", 122, 72, 1008, 123, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;rounded=1;");
  rect("lbl_life_main", "<span style='font-size:10px;font-weight:800;color:#2563EB;'>CUTOVER LIFECYCLE – PHASES</span>", 122, 74, 1008, 12, "strokeColor=none;fillColor=none;align=center;");

  const lphases = [
    { n: "1. PLAN &amp; PREPARE", t: "(T-2 to T-14 Days)", col: "#1E3A8A", bg: "#EFF6FF", sub: "• Finalize cutover approach<br/>• Validate readiness criteria<br/>• Complete DR &amp; rollback plan<br/>• Obtain business sign-off" },
    { n: "2. PRE-CUTOVER", t: "(T-24 to T-1 Hours)", col: "#2563EB", bg: "#EFF6FF", sub: "• Deploy &amp; warm up prod<br/>• Sync / freeze data (if needed)<br/>• Run pre-cutover checks<br/>• Get final go/no-go approval" },
    { n: "3. CUTOVER", t: "(T-0 Window)", col: "#16A34A", bg: "#F0FDF4", sub: "• Switch traffic to production<br/>• Enable services / agents<br/>• Run smoke &amp; validation tests<br/>• Monitor in real-time" },
    { n: "4. STABILIZATION", t: "(T+0 to T+24 Hours)", col: "#D97706", bg: "#FFFBEB", sub: "• Hypercare monitoring<br/>• Resolve P1/P2 issues<br/>• Validate KPIs &amp; SLAs<br/>• Confirm business usage" },
    { n: "5. POST-CUTOVER", t: "(T+1 to T+7 Days)", col: "#0284C7", bg: "#F0F9FF", sub: "• Performance optimization<br/>• Decommission old env (if any)<br/>• Documentation update<br/>• Formal go-live sign-off" },
    { n: "6. OPERATE", t: "(BAU)", col: "#7C3AED", bg: "#FAF5FF", sub: "• Steady state operations<br/>• Continuous monitoring<br/>• Cost &amp; usage optimization<br/>• Ongoing improvements" }
  ];

  lphases.forEach((lp, idx) => {
    const lx = 128 + idx * 167;
    rect(`lp_${idx}`, `<div style='font-size:8px;font-weight:800;color:${lp.col};text-align:center;'>${lp.n}</div><div style='font-size:10px;color:#64748B;text-align:center;'>${lp.t}</div><div style='font-size:10px;line-height:1.2;color:#0F172A;margin-top:2px;'>${lp.sub}</div>`, lx, 88, 161, 100, `fillColor=${lp.bg};strokeColor=${lp.col};rounded=1;align=left;verticalAlign=top;padding=2;`);
  });

  // 4. TOP RIGHT: ENVIRONMENT TOPOLOGY (x=1138..1560, y=72..195)
  rect("box_env_topol", "<div style='font-size:9px;font-weight:800;color:#1E3A8A;margin-bottom:2px;text-align:center;'>ENVIRONMENT TOPOLOGY (POST-CUTOVER)</div><div style='font-size:8px;color:#0F172A;display:flex;justify-content:space-around;text-align:center;align-items:center;margin-top:10px;'><div>👥<br/>Users / Apps</div> <div>➔</div> <div style='border:1px solid #CBD5E1;background:#FFF;padding:3px;border-radius:3px;'>⚖️<br/>Cloud Load<br/>Balancing</div> <div>➔</div> <div style='border:1px solid #16A34A;background:#F0FDF4;padding:4px;border-radius:3px;'><b>NovaCura<br/>(Prod)</b></div> <div>➔</div> <div style='font-size:10px;text-align:left;line-height:1.2;'>🧠 Vertex AI<br/>📊 BigQuery<br/>🗄️ Cloud SQL<br/>🗃️ Cloud Storage<br/>🔒 Secret Mgr</div></div>", 1138, 72, 422, 123, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=top;padding=3;");

  // 5. CENTER MIDDLE: DETAILED RUNBOOK – CUTOVER STEPS (x=122..1560, y=202..282)
  rect("box_steps_main", "", 122, 202, 1438, 80, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;");
  rect("lbl_steps_main", "<span style='font-size:10px;font-weight:800;color:#1E3A8A;'>DETAILED RUNBOOK – CUTOVER STEPS</span>", 122, 204, 1438, 10, "strokeColor=none;fillColor=none;align=center;");

  const csteps = [
    { n: "1. Freeze &amp; Validate", sub: "• Freeze writes<br/>• Final data sync<br/>• Checksum validation" },
    { n: "2. Deploy Production", sub: "• Deploy services<br/>• Run DB migrations<br/>• Verify infra health" },
    { n: "3. Enable Dependencies", sub: "• Enable APIs<br/>• Activate connectors<br/>• Validate secrets" },
    { n: "4. Switch Traffic", sub: "• Update DNS / LB<br/>• Route to prod<br/>• Verify traffic flow" },
    { n: "5. Smoke Tests", sub: "• Run test suite<br/>• Validate key journeys<br/>• Health checks" },
    { n: "6. Business Validation", sub: "• User acceptance<br/>• Confirm data<br/>• Sign-off" },
    { n: "7. Monitor &amp; Observe", sub: "• Track SLOs / SLIs<br/>• Watch error rates<br/>• Confirm stability" },
    { n: "8. Close Cutover", sub: "• Declare go-live<br/>• Lift data freeze<br/>• Notify stakeholders" }
  ];
  csteps.forEach((cs, idx) => {
    const cx = 128 + idx * 179;
    rect(`cs_${idx}`, `<div style='font-size:8px;font-weight:800;color:#1E3A8A;text-align:center;'>${cs.n}</div><div style='font-size:10px;line-height:1.2;color:#0F172A;margin-top:2px;'>${cs.sub}</div>`, cx, 216, 173, 60, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=2;");
  });

  // 6. LOWER THREE PANELS: ROLLBACK PLAN, RACI & TIMELINE, MONITORING (x=122..1560, y=288..410)
  rect("box_rollback", "<div style='font-size:9px;font-weight:800;color:#DC2626;margin-bottom:2px;'>⚠️ ROLLBACK PLAN</div><div style='font-size:8px;line-height:1.3;color:#0F172A;'>❶ <b>Revert DNS / LB</b> to previous environment<br/>❷ <b>Disable</b> new production services<br/>❸ <b>Restore data</b> from last known good snapshot<br/>❹ <b>Validate</b> application health in previous env<br/>❺ <b>Communicate</b> status to stakeholders<br/>❻ <b>Perform root cause analysis</b></div><div style='text-align:center;margin-top:3px;'><span style='background:#FEF2F2;border:1px solid #DC2626;color:#DC2626;font-size:10px;padding:1px 4px;border-radius:2px;font-weight:700;'>Target Rollback Time: ≤ 30 minutes</span></div>", 122, 288, 320, 122, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  rect("box_raci_time", "<div style='font-size:9px;font-weight:800;color:#1E3A8A;display:flex;justify-content:space-between;'><span>RACI – CUTOVER RESPONSIBILITIES</span> <span>CUTOVER TIMELINE (T-0)</span></div><div style='font-size:10px;display:flex;justify-content:space-between;gap:8px;margin-top:2px;'><table style='border-collapse:collapse;width:55%;'><tr style='font-weight:700;border-bottom:1px solid #CBD5E1;'><td>Role</td><td>Plan</td><td>Exec</td><td>Mon</td><td>Appr</td><td>Roll</td></tr><tr><td><b>Lead</b></td><td>R</td><td>C</td><td>C</td><td>A</td><td>R</td></tr><tr><td><b>Eng</b></td><td>R</td><td>R</td><td>R</td><td>C</td><td>R</td></tr><tr><td><b>SRE</b></td><td>C</td><td>R</td><td>R</td><td>C</td><td>R</td></tr><tr><td><b>Sec</b></td><td>C</td><td>C</td><td>C</td><td>A</td><td>C</td></tr><tr><td><b>Biz</b></td><td>C</td><td>C</td><td>C</td><td>A</td><td>C</td></tr></table><div style='width:42%;line-height:1.25;color:#0F172A;'><b>18:00</b> Freeze begins<br/><b>19:00</b> Final data sync<br/><b>20:00</b> Prod deploy<br/><b>21:00</b> Switch traffic<br/><b>21:15</b> Smoke tests<br/><b>22:00</b> Biz sign-off<br/><b>22:30</b> Go-live declared<br/><span style='color:#16A34A;font-weight:700;'>Window: 2.5h</span></div></div>", 450, 288, 670, 122, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  rect("box_mon_hyper", "<div style='font-size:9px;font-weight:800;color:#16A34A;margin-bottom:2px;text-align:center;'>MONITORING &amp; ALERTING (HYPERCARE)</div><div style='font-size:8px;display:grid;grid-template-columns:repeat(3, 1fr);gap:3px;text-align:center;margin-top:6px;'><div>📊<br/><b>Monitoring</b><br/>(Metrics)</div> <div>📑<br/><b>Logging</b><br/>(Logs)</div> <div>⚠️<br/><b>Errors</b><br/>(Exceptions)</div> <div>🩺<br/><b>Uptime</b><br/>(Availability)</div> <div>📟<br/><b>PagerDuty</b><br/>(On-call)</div> <div>💬<br/><b>Slack / Email</b><br/>(Notifications)</div></div>", 1128, 288, 432, 122, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=top;padding=3;");

  // 7. BOTTOM ROW: METRICS, RISK, CHECKLIST, COMMS, NOTES (x=20..1560, y=546..740)
  rect("bot_metrics", "<div style='font-size:10px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>KEY SUCCESS METRICS</div><div style='font-size:8px;line-height:1.35;color:#0F172A;'>✔ Service availability ≥ 99.9%<br/>✔ Error rate ≤ 0.1%<br/>✔ P95 latency within SLO (&lt; 2s)<br/>✔ Zero data loss (RPO met)<br/>✔ All critical business flows validated<br/>✔ No P1 incidents in first 24 hours</div>", 20, 546, 260, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("bot_risk", "<div style='font-size:10px;font-weight:800;color:#DC2626;margin-bottom:2px;'>RISK &amp; MITIGATION</div><div style='font-size:8px;line-height:1.25;color:#0F172A;'><table style='width:100%;border-collapse:collapse;'><tr style='font-weight:700;border-bottom:1px solid #CBD5E1;'><td>Risk</td><td>Impact</td><td>Mitigation</td></tr><tr><td>Data inconsistency</td><td><span style='color:#DC2626;font-weight:700;'>High</span></td><td>Pre-sync + checksum</td></tr><tr><td>Service downtime</td><td><span style='color:#DC2626;font-weight:700;'>High</span></td><td>Blue/Green with rollback</td></tr><tr><td>Performance drop</td><td><span style='color:#D97706;font-weight:700;'>Med</span></td><td>Load test + autoscaling</td></tr><tr><td>Connector failure</td><td><span style='color:#D97706;font-weight:700;'>Med</span></td><td>Pre-validation + fallback</td></tr><tr><td>Security misconfig</td><td><span style='color:#DC2626;font-weight:700;'>High</span></td><td>Pre-deploy sec review</td></tr></table></div>", 290, 546, 330, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("bot_chk", "<div style='font-size:10px;font-weight:800;color:#16A34A;margin-bottom:2px;'>CHECKLIST (EXECUTION)</div><div style='font-size:8px;line-height:1.35;color:#0F172A;'>✔ Pre-cutover sign-off obtained<br/>✔ All runbook steps reviewed<br/>✔ Rollback plan validated (dry run)<br/>✔ Communication plan activated<br/>✔ Hypercare team on standby<br/>✔ Go-live confirmation recorded</div>", 630, 546, 260, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("bot_comms", "<div style='font-size:10px;font-weight:800;color:#2563EB;margin-bottom:2px;'>COMMUNICATION PLAN</div><div style='font-size:8px;line-height:1.35;color:#0F172A;'>👥 <b>Stakeholders:</b> Execs, Business, OC<br/>💬 <b>Channels:</b> Email, Slack, War Room<br/>⏱️ <b>Cadence:</b> Pre / During / Post</div>", 900, 546, 260, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("bot_notes", "<div style='font-size:10px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>NOTES</div><div style='font-size:8px;line-height:1.35;color:#64748B;'>• Runbook reviewed and updated for each release.<br/>• Perform periodic cutover drills to validate readiness.<br/>• Maintain central knowledge base.<br/>• Ensure compliance with GxP / 21 CFR Part 11.</div>", 1170, 546, 390, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  // 8. FOOTER METADATA STRIP (x=20..1560, y=744..768)
  rect("footer_meta", "<div style='font-size:9px;color:#0F172A;display:flex;justify-content:space-between;align-items:center;'><div>Version: 1.0</div><div>Date: May 2024</div></div>", 20, 744, 1540, 24, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=middle;padding=3;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_29_cutover_runbook_architecture" name="Template 29: Cutover / Runbook Architecture">
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
