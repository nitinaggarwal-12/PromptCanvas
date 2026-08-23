/**
 * Canonical Architecture Template 28: Failure / Exception Flow Architecture
 * Exact 1:1 High-Fidelity Master Blueprint of images/28.png
 */

export function generateTemplate28FailureExceptionFlowXml(
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
  rect("num_badge", "28", 20, 20, 48, 48, "fillColor=#1E3A8A;fontColor=#FFFFFF;fontSize=24;fontStyle=1;rounded=1;align=center;verticalAlign=middle;");
  rect("hdr_title", "<div style='font-size:24px;font-weight:800;color:#0F172A;letter-spacing:0.5px;'>FAILURE / EXCEPTION FLOW ARCHITECTURE</div><div style='font-size:11px;color:#1E3A8A;font-weight:700;margin-top:3px;'>Use Case: NovaCura – AI-Powered Regulatory Intelligence Platform &nbsp;|&nbsp; Environment: Production &nbsp;|&nbsp; Region: us-central1 &nbsp;|&nbsp; Last Updated: May 8, 2025</div>", 78, 16, 850, 56, "strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  rect("hdr_brand", "<div style='text-align:right;'><span style='font-size:20px;font-weight:800;color:#0284C7;'>🧬 NOVACURA</span><br/><span style='font-size:9.5px;color:#64748B;font-style:italic;'>AI-Powered Regulatory Intelligence Platform</span></div>", 940, 18, 280, 45, "strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

  // Objective Card
  rect("card_obj", "<div style='font-size:12px;font-weight:800;color:#1E3A8A;margin-bottom:3px;'>OBJECTIVE</div><div style='font-size:11.5px;line-height:1.4;color:#0F172A;'>Detect, classify, and respond to failures/exception conditions quickly to minimize impact, restore service, and learn to prevent recurrence.</div>", 1240, 18, 320, 52, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=6;");

  // 2. LEFT COLUMN: POTENTIAL FAILURE SOURCES (x=20..140, y=78..480)
  rect("box_f_src", "", 20, 78, 120, 402, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;");
  rect("lbl_f_src", "<span style='font-size:11px;font-weight:800;color:#1E3A8A;'>POTENTIAL FAILURE<br/>SOURCES</span>", 20, 82, 120, 18, "strokeColor=none;fillColor=none;align=center;");
  const fSources = [
    { icon: "👤", t: "User / Client", s: "Invalid input, timeouts" },
    { icon: "🌐", t: "Network", s: "Latency, DNS drops" },
    { icon: "💻", t: "App / Service", s: "Code errors, crashes" },
    { icon: "🧠", t: "AI / Model", s: "Timeouts, hallucination" },
    { icon: "🗄️", t: "Data / Storage", s: "Schema issues, unavail" },
    { icon: "🌐", t: "External Systems", s: "API errors, outages" },
    { icon: "🏗️", t: "Infrastructure", s: "Resource exhaustion" },
    { icon: "🔒", t: "Security / Access", s: "Auth fails, token expiry" }
  ];
  fSources.forEach((fsItem, idx) => {
    rect(`fs_${idx}`, `<div style='font-size:9px;font-weight:700;'>${fsItem.icon} ${fsItem.t}</div><div style='font-size:8.5px;color:#64748B;'>${fsItem.s}</div>`, 24, 104 + idx * 46, 112, 42, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=2;");
  });

  // 3. TOP FLOW CONTAINER: END-TO-END FAILURE / EXCEPTION FLOW (x=148..1120, y=78..190)
  rect("box_e2e_flow", "", 148, 78, 964, 112, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;rounded=1;");
  rect("lbl_e2e_flow", "<span style='font-size:12px;font-weight:800;color:#2563EB;'>END-TO-END FAILURE / EXCEPTION FLOW</span>", 148, 82, 964, 14, "strokeColor=none;fillColor=none;align=center;");

  const e2eSteps = [
    { n: "1", t: "DETECT", d: "Monitoring, alerts, health checks, user reports", x: 156, w: 150 },
    { n: "2", t: "CLASSIFY", d: "Identify failure type, impact, severity, affected svcs", x: 316, w: 150 },
    { n: "3", t: "ANALYZE", d: "Correlate logs &amp; metrics, root cause, blast radius", x: 476, w: 150 },
    { n: "4", t: "RESPOND", d: "Execute runbook, contain, mitigate, communicate", x: 636, w: 150 },
    { n: "5", t: "RECOVER", d: "Restore service, validate, monitor stability", x: 796, w: 150 },
    { n: "6", t: "LEARN", d: "Post-incident review, RCA, action items, runbooks", x: 956, w: 148 }
  ];
  e2eSteps.forEach((es, idx) => {
    rect(`es_${idx}`, `<div style='font-size:11px;font-weight:800;color:#1E3A8A;'>🔍 ${es.n}. ${es.t}</div><div style='font-size:9px;color:#0F172A;margin-top:2px;'>${es.d}</div>`, es.x, 98, es.w, 82, "fillColor=#EFF6FF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=3;");
  });

  // 4. CENTER FAILURE SCENARIOS (x=148..1120, y=196..480)
  rect("box_scens", "", 148, 196, 964, 284, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;");
  rect("lbl_scens", "<span style='font-size:11.5px;font-weight:800;color:#1E3A8A;'>COMMON FAILURE SCENARIOS &amp; EXCEPTION FLOW EXAMPLES</span>", 148, 198, 964, 12, "strokeColor=none;fillColor=none;align=center;");

  const scens = [
    { code: "A", t: "API TIMEOUT / UNAVAIL", s1: "Request Timeout / 5xx", s2: "Retry with Exp Backoff", s3: "Failover to Healthy Instance", s4: "Notify &amp; Create Incident (P1/P2)", x: 156, w: 150 },
    { code: "B", t: "DATA QUALITY EXCEPTION", s1: "Data Validation Failed", s2: "Quarantine Bad Records", s3: "Route to Data Steward Queue", s4: "Alert &amp; Track in DQ Dashboard", x: 316, w: 150 },
    { code: "C", t: "MODEL GENERATION FAIL", s1: "Model Error / Hallucination", s2: "Re-ask with Guardrails", s3: "Fallback Model (Alternate LLM)", s4: "Escalate to Human Review (HITL)", x: 476, w: 150 },
    { code: "D", t: "EXTERNAL API RATE LIMIT", s1: "Rate Limit / 429 or 5xx", s2: "Respect Retry-After Header", s3: "Circuit Breaker Open", s4: "Degrade Gracefully (Cache)", x: 636, w: 150 },
    { code: "E", t: "INFRA EXHAUSTION", s1: "High CPU / Memory / Disk", s2: "Auto-Scale / Scale-Up", s3: "Throttle / Shed Non-crit Load", s4: "Page On-call", x: 796, w: 150 },
    { code: "F", t: "AUTH / PERMISSION FAIL", s1: "Auth Failed / Token Expired", s2: "Refresh Token / Re-auth", s3: "Deny Access &amp; Log Security", s4: "Notify User &amp; SecOps", x: 956, w: 148 }
  ];

  scens.forEach((sc, idx) => {
    rect(`sc_col_${idx}`, "", sc.x, 214, sc.w, 258, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;");
    rect(`sc_hdr_${idx}`, `<div style='font-size:9.5px;font-weight:800;color:#1E3A8A;'>${sc.code}. ${sc.t}</div>`, sc.x, 216, sc.w, 14, "strokeColor=none;fillColor=none;align=center;");
    rect(`sc_s1_${idx}`, `<div style='font-size:9px;font-weight:700;'>${sc.s1}</div>`, sc.x + 4, 234, sc.w - 8, 48, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=2;");
    rect(`sc_s2_${idx}`, `<div style='font-size:9px;font-weight:700;'>${sc.s2}</div>`, sc.x + 4, 290, sc.w - 8, 48, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=2;");
    rect(`sc_s3_${idx}`, `<div style='font-size:9px;font-weight:700;'>${sc.s3}</div>`, sc.x + 4, 346, sc.w - 8, 48, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=2;");
    rect(`sc_s4_${idx}`, `<div style='font-size:9px;font-weight:700;'>${sc.s4}</div>`, sc.x + 4, 402, sc.w - 8, 62, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=2;");
  });

  // 5. FAR RIGHT COLUMN: CATEGORIES, PATTERNS & SEVERITY (x=1120..1560, y=78..480)
  rect("box_r_cats", "<div style='font-size:11px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>EXCEPTION CATEGORIES</div>" +
    "<div style='font-size:8.5px;color:#0F172A;'>" +
    "<table style='width:100%;border-collapse:collapse;'>" +
    "<tr style='font-weight:800;color:#1E3A8A;'><td>CAT</td><td>DESC</td><td>EXAMPLES</td></tr>" +
    "<tr><td><b>Transient</b></td><td>Temporary, self-resolving</td><td>Timeouts, 5xx, blips</td></tr>" +
    "<tr><td><b>Persistent</b></td><td>Requires intervention</td><td>Code bug, DB down</td></tr>" +
    "<tr><td><b>Data Qual</b></td><td>Invalid / inconsistent data</td><td>Missing fields, outliers</td></tr>" +
    "<tr><td><b>Security</b></td><td>AuthZ/AuthN failures</td><td>Token expired, denied</td></tr>" +
    "<tr><td><b>Ext Dep</b></td><td>Third-party issues</td><td>API down, rate limit</td></tr>" +
    "<tr><td><b>Capacity</b></td><td>Resource limits reached</td><td>CPU, Memory, Storage</td></tr>" +
    "</table></div>", 1120, 78, 440, 130, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  rect("box_r_pats", "<div style='font-size:11px;font-weight:800;color:#2563EB;margin-bottom:2px;'>RESPONSE PATTERNS (TOOLS &amp; TECHNIQUES)</div><div style='font-size:8.5px;line-height:1.4;color:#0F172A;display:grid;grid-template-columns:repeat(2, 1fr);gap:2px;'><div>🔄 Retry (Exp Backoff)</div> <div>🛡️ Fallback / Degradation</div> <div>⚡ Circuit Breaker</div> <div>📬 Queue &amp; Async Buffer</div> <div>⏱️ Timeouts &amp; Deadlines</div> <div>👤 Human-in-the-Loop</div> <div>🆔 Idempotency</div> <div>🧱 Bulkhead Isolation</div></div>", 1120, 214, 440, 80, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  rect("box_r_sev", "<div style='font-size:11px;font-weight:800;color:#DC2626;margin-bottom:2px;'>SEVERITY MATRIX (IMPACT vs URGENCY)</div><div style='font-size:8.5px;color:#0F172A;'>" +
    "<table style='width:100%;border-collapse:collapse;text-align:center;'>" +
    "<tr style='font-weight:800;'><td>URGENCY →<br/>IMPACT ↓</td><td>Low</td><td>Medium</td><td>High</td><td>Critical</td></tr>" +
    "<tr><td><b>Low</b></td><td style='background:#DCFCE7;'>P4</td><td style='background:#DCFCE7;'>P4</td><td style='background:#FEF9C3;'>P3</td><td style='background:#FED7AA;'>P2</td></tr>" +
    "<tr><td><b>Medium</b></td><td style='background:#DCFCE7;'>P4</td><td style='background:#FEF9C3;'>P3</td><td style='background:#FED7AA;'>P2</td><td style='background:#FECACA;'>P1</td></tr>" +
    "<tr><td><b>High</b></td><td style='background:#FEF9C3;'>P3</td><td style='background:#FED7AA;'>P2</td><td style='background:#FECACA;'>P1</td><td style='background:#FECACA;'>P1</td></tr>" +
    "<tr><td><b>Critical</b></td><td style='background:#FED7AA;'>P2</td><td style='background:#FECACA;'>P1</td><td style='background:#FECACA;'>P1</td><td style='background:#FECACA;'>P1</td></tr>" +
    "</table></div>", 1120, 298, 440, 182, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  // 6. BOTTOM ROW: MONITORING, ESCALATION, RECOVERY, POST-INCIDENT, NOTES (x=20..1560, y=488..775)
  rect("bot_p1", "<div style='font-size:11px;font-weight:800;color:#1E3A8A;margin-bottom:3px;'>MONITORING &amp; DETECTION</div><div style='font-size:9px;line-height:1.45;color:#0F172A;'>📈 <b>Cloud Monitoring</b> (Metrics, Logs)<br/>⏱️ <b>Distributed Tracing</b> (Cloud Trace)<br/>🩺 <b>Uptime Checks</b> (Probes)<br/>📑 <b>Log Analytics</b> (BigQuery / Looker)<br/>👤 <b>User Feedback</b> (In-App / Support)<br/><br/><span style='color:#1E3A8A;font-weight:700;'>Signals:</span> Error Rate, Latency, Saturation</div>", 20, 488, 250, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");
  
  rect("bot_p2", "<div style='font-size:11px;font-weight:800;color:#2563EB;margin-bottom:3px;'>ESCALATION PATHS</div><div style='font-size:9px;line-height:1.4;color:#0F172A;'>🚨 Alert ➔ 👤 On-call (L1, 5m) ➔ 👤 Service Owner (L2, 15m) ➔ 👤 Eng Lead (L3, 30m) ➔ 👤 Incident Commander<br/><br/><b>Channels:</b> PagerDuty • Slack • Email • Phone • War Room</div>", 280, 488, 300, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");
  
  rect("bot_p3", "<div style='font-size:11px;font-weight:800;color:#16A34A;margin-bottom:3px;'>RECOVERY &amp; VALIDATION</div><div style='font-size:9px;line-height:1.45;color:#0F172A;'>✔ Restore Service / Failover Complete<br/>✔ Validate Functionality (Smoke Tests)<br/>✔ Check SLOs &amp; Error Rates Stabilize<br/>✔ Communicate Resolution<br/>✔ Monitor Closely (Watch Window)<br/>✔ Declare Resolved ➔ PIR Scheduled</div>", 590, 488, 280, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");
  
  rect("bot_p4", "<div style='font-size:11px;font-weight:800;color:#7C3AED;margin-bottom:3px;'>POST-INCIDENT ACTIVITIES</div><div style='font-size:9px;line-height:1.45;color:#0F172A;'>📑 Root Cause Analysis (RCA)<br/>🤝 Blameless Post-Incident Review<br/>📋 Action Items &amp; Owners<br/>🔄 Update Runbooks / Alerts<br/>📚 Knowledge Base Update</div>", 880, 488, 260, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");
  
  rect("bot_p5", "<div style='font-size:11px;font-weight:800;color:#1E3A8A;margin-bottom:3px;'>NOTES</div><div style='font-size:9px;line-height:1.4;color:#64748B;'>• All failures are expected. Fast recovery is the goal.<br/>• Automate detection and response where safe.<br/>• Guardrails + HITL for AI / model failures.<br/>• Design for observability, resiliency and graceful degradation.<br/>• Continuously improve via learning loops.</div>", 1150, 488, 410, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  // 7. FOOTER LEGEND (x=20..1560, y=685..775)
  rect("footer_leg", "<div style='font-size:11px;color:#0F172A;display:flex;justify-content:space-around;text-align:center;align-items:center;'>" +
    "<div><b style='color:#1E3A8A;'>LEGEND:</b></div>" +
    "<div>─── Primary Flow</div>" +
    "<div>- - - Feedback Loop</div>" +
    "<div>··· Optional Flow</div>" +
    "<div>🟦 Process / Step</div>" +
    "<div>◇ Decision</div>" +
    "<div>⚙️ Automated Action</div>" +
    "<div>👤 Human Action</div>" +
    "</div>", 20, 685, 1540, 45, "fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;rounded=1;align=center;verticalAlign=middle;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_28_failure_exception_flow" name="Template 28: Failure / Exception Flow Architecture">
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
