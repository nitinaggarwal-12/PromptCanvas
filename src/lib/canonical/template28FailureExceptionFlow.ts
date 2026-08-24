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

  const diamond = (id: string, val: string, x: number, y: number, w: number, h: number, style: string) => {
    c.push(
      `<mxCell id="${id}" value="${E(val)}" style="shape=rhombus;whiteSpace=wrap;html=1;${style}" vertex="1" parent="1">` +
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
  rect("num_badge", "28", 20, 16, 48, 48, "fillColor=#1E3A8A;fontColor=#FFFFFF;fontSize=24;fontStyle=1;rounded=1;align=center;verticalAlign=middle;");
  rect("hdr_title", "<div style='font-size:22px;font-weight:800;color:#0F172A;letter-spacing:0.5px;'>FAILURE / EXCEPTION FLOW ARCHITECTURE</div><div style='font-size:11px;color:#1E3A8A;font-weight:700;margin-top:2px;'>Use Case: NovaCura – AI-Powered Regulatory Intelligence Platform &nbsp;|&nbsp; Environment: Production &nbsp;|&nbsp; Region: us-central1 &nbsp;|&nbsp; Last Updated: May 8, 2025</div>", 78, 16, 840, 48, "strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=10;");
  rect("hdr_brand", "<div style='text-align:right;'><span style='font-size:20px;font-weight:800;color:#0284C7;'>🧬 NOVACURA</span><br/><span style='font-size:9.5px;color:#64748B;font-style:italic;'>AI-Powered Regulatory Intelligence Platform</span></div>", 940, 16, 280, 48, "strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

  // Objective Card
  rect("card_obj", "<div style='font-size:8.5px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>OBJECTIVE</div><div style='font-size:10px;line-height:1.35;color:#0F172A;'>Detect, classify, and respond to failures/exception conditions quickly to minimize impact, restore service, and learn to prevent recurrence.</div>", 1240, 16, 320, 48, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=4;");

  // 2. LEFT COLUMN: POTENTIAL FAILURE SOURCES (x=20..135, y=72..540)
  rect("box_l_srcs", "<div style='font-size:8px;font-weight:800;color:#1E3A8A;margin-bottom:6px;text-align:center;'>POTENTIAL FAILURE<br/>SOURCES</div>" +
    "<div style='font-size:10px;line-height:1.35;color:#0F172A;'>" +
    "👤 <b>User / Client</b><br/><span style='color:#64748B;font-size:9px;'>Invalid input, timeout</span><br/><br/>" +
    "🌐 <b>Network / Conn</b><br/><span style='color:#64748B;font-size:9px;'>Latency, DNS drops</span><br/><br/>" +
    "⚙️ <b>Application / Svc</b><br/><span style='color:#64748B;font-size:9px;'>Code errors, crashes</span><br/><br/>" +
    "🧠 <b>AI / Model Layer</b><br/><span style='color:#64748B;font-size:9px;'>Model errors, halluc</span><br/><br/>" +
    "🗄️ <b>Data / Storage</b><br/><span style='color:#64748B;font-size:9px;'>DB errors, corrupt data</span><br/><br/>" +
    "🔌 <b>External Systems</b><br/><span style='color:#64748B;font-size:9px;'>API error, rate limits</span><br/><br/>" +
    "🏗️ <b>Infrastructure</b><br/><span style='color:#64748B;font-size:9px;'>VM/Pod evicted</span><br/><br/>" +
    "🔐 <b>Security / Access</b><br/><span style='color:#64748B;font-size:9px;'>Auth token expired</span>" +
    "</div>", 20, 72, 115, 465, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  // 3. CENTER TOP: END-TO-END FAILURE / EXCEPTION FLOW (x=142..1120, y=72..155)
  rect("box_e2e_flow", "", 142, 72, 978, 83, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;rounded=1;");
  rect("lbl_e2e_flow", "<span style='font-size:8.5px;font-weight:800;color:#2563EB;'>END-TO-END FAILURE / EXCEPTION FLOW</span>", 142, 75, 978, 14, "strokeColor=none;fillColor=none;align=center;");

  const e2eSteps = [
    { n: "1", t: "DETECT", d: "Monitoring, alerts, health checks, user reports", col: "#2563EB", bg: "#EFF6FF", x: 150, w: 155 },
    { n: "2", t: "CLASSIFY", d: "Identify failure type, impact, severity, affected services", col: "#7C3AED", bg: "#F5F3FF", x: 312, w: 155 },
    { n: "3", t: "ANALYZE", d: "Correlate logs &amp; metrics, root cause, blast radius", col: "#D97706", bg: "#FFFBEB", x: 474, w: 155 },
    { n: "4", t: "RESPOND", d: "Execute runbook, contain, mitigate, communicate", col: "#DC2626", bg: "#FEF2F2", x: 636, w: 155 },
    { n: "5", t: "RECOVER", d: "Restore service, validate, monitor stability", col: "#16A34A", bg: "#F0FDF4", x: 798, w: 155 },
    { n: "6", t: "LEARN", d: "Post-incident review, RCA, action items, update runbook", col: "#0284C7", bg: "#F0F9FF", x: 960, w: 152 }
  ];

  e2eSteps.forEach((st, idx) => {
    rect(`st_box_${idx}`, `<div style='font-size:10px;font-weight:800;color:${st.col};'>${st.n}. ${st.t}</div><div style='font-size:9px;color:#0F172A;line-height:1.3;margin-top:2px;'>${st.d}</div>`, st.x, 92, st.w, 44, `fillColor=${st.bg};strokeColor=${st.col};rounded=1;align=center;verticalAlign=middle;padding=3;`);
  });

  rect("lbl_feedback", "<span style='font-size:9px;font-style:italic;color:#64748B;'>Feedback Loop (Improve detection, automation &amp; resilience) ➔</span>", 142, 140, 978, 12, "strokeColor=none;fillColor=none;align=center;");

  // 4. CENTER MIDDLE: COMMON FAILURE SCENARIOS & EXCEPTION FLOW EXAMPLES (x=142..1120, y=160..540)
  rect("box_scenarios", "", 142, 160, 978, 377, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;");
  rect("lbl_scenarios", "<span style='font-size:8px;font-weight:800;color:#1E3A8A;'>COMMON FAILURE SCENARIOS &amp; EXCEPTION FLOW EXAMPLES</span>", 142, 164, 978, 14, "strokeColor=none;fillColor=none;align=center;");

  const scenCols = [
    {
      code: "A", t: "API TIMEOUT / SVC UNAVAILABLE", col: "#2563EB", bg: "#EFF6FF", x: 150, w: 155,
      b1: "Request Timeout / 5xx Error",
      b2: "Retry with Exponential Backoff",
      dia: "Still Failing?",
      noB: "Failover to Healthy Instance",
      yesB: "Notify &amp; Create Incident (P1/P2)"
    },
    {
      code: "B", t: "DATA QUALITY EXCEPTION", col: "#16A34A", bg: "#F0FDF4", x: 312, w: 155,
      b1: "Data Validation Failed",
      b2: "Quarantine Bad Records",
      dia: "Route to Data Steward Queue",
      noB: "Use Last Known Good Data",
      yesB: "Alert &amp; Track in DQ Dashboard"
    },
    {
      code: "C", t: "MODEL GENERATION FAILURE", col: "#7C3AED", bg: "#F5F3FF", x: 474, w: 155,
      b1: "Model Error / Hallucination Risk",
      b2: "Re-ask with Guardrails / Tooling",
      dia: "Still Failing?",
      noB: "Fallback Model (Alternate LLM)",
      yesB: "Escalate to Human Review (HITL)"
    },
    {
      code: "D", t: "EXTERNAL API RATE LIMIT", col: "#D97706", bg: "#FFFBEB", x: 636, w: 155,
      b1: "Rate Limit / 429 or 5xx",
      b2: "Respect Retry-After Header",
      dia: "Retry with Jitter",
      noB: "Circuit Breaker Open",
      yesB: "Degrade Gracefully (Cache / Queue)"
    },
    {
      code: "E", t: "INFRASTRUCTURE EXHAUSTION", col: "#DC2626", bg: "#FEF2F2", x: 798, w: 155,
      b1: "High CPU / Memory / Disk / Conn",
      b2: "Auto-Scale / Scale-Up",
      dia: "Throttle / Shed Non-critical Load",
      noB: "Failover / Move Traffic",
      yesB: "Page On-call"
    },
    {
      code: "F", t: "AUTH / PERMISSION FAILURE", col: "#0284C7", bg: "#F0F9FF", x: 960, w: 152,
      b1: "Auth Failed / Token Expired",
      b2: "Refresh Token / Re-authenticate",
      dia: "Still Failing?",
      noB: "Deny Access &amp; Log Security Event",
      yesB: "Notify User &amp; SecOps"
    }
  ];

  scenCols.forEach((sc, idx) => {
    rect(`sc_box_${idx}`, "", sc.x, 180, sc.w, 348, `fillColor=${sc.bg};strokeColor=${sc.col};strokeWidth=1;rounded=1;`);
    rect(`sc_hdr_${idx}`, `<div style='font-size:9px;font-weight:800;color:${sc.col};'>${sc.code}. ${sc.t}</div>`, sc.x, 183, sc.w, 16, "strokeColor=none;fillColor=none;align=center;");

    // Box 1
    rect(`sc_${idx}_b1`, `<div style='font-size:9px;font-weight:700;color:#0F172A;'>${sc.b1}</div>`, sc.x + 8, 202, sc.w - 16, 38, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=2;");
    // Box 2
    rect(`sc_${idx}_b2`, `<div style='font-size:9px;font-weight:700;color:#0F172A;'>${sc.b2}</div>`, sc.x + 8, 252, sc.w - 16, 38, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=2;");
    // Decision Diamond
    diamond(`sc_${idx}_dia`, `<div style='font-size:9px;font-weight:800;color:#0F172A;'>${sc.dia}</div>`, sc.x + 20, 302, sc.w - 40, 48, "fillColor=#FFFFFF;strokeColor=#64748B;align=center;verticalAlign=middle;");
    // No Branch (Recovery)
    rect(`sc_${idx}_no`, `<div style='font-size:9px;font-weight:700;color:#16A34A;'>${sc.noB}</div>`, sc.x + 8, 384, sc.w - 16, 42, "fillColor=#F0FDF4;strokeColor=#16A34A;rounded=1;align=center;verticalAlign=middle;padding=2;");
    // Yes Branch (Escalate)
    rect(`sc_${idx}_yes`, `<div style='font-size:9px;font-weight:700;color:#DC2626;'>${sc.yesB}</div>`, sc.x + 8, 442, sc.w - 16, 44, "fillColor=#FEF2F2;strokeColor=#DC2626;rounded=1;align=center;verticalAlign=middle;padding=2;");

    // Edges
    edge(nid(), "", `sc_${idx}_b1`, `sc_${idx}_b2`, "edgeStyle=none;strokeColor=#64748B;strokeWidth=1.2;endArrow=block;endSize=4;");
    edge(nid(), "", `sc_${idx}_b2`, `sc_${idx}_dia`, "edgeStyle=none;strokeColor=#64748B;strokeWidth=1.2;endArrow=block;endSize=4;");
    edge(nid(), "No", `sc_${idx}_dia`, `sc_${idx}_no`, "edgeStyle=none;strokeColor=#16A34A;strokeWidth=1.2;endArrow=block;endSize=4;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;fontSize=6.5;fontStyle=1;");
    edge(nid(), "Yes", `sc_${idx}_no`, `sc_${idx}_yes`, "edgeStyle=none;strokeColor=#DC2626;strokeWidth=1.2;endArrow=block;endSize=4;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;fontSize=6.5;fontStyle=1;");
  });

  // 5. RIGHT COLUMN: CATEGORIES, PATTERNS, ARTIFACTS & SEVERITY (x=1128..1560, y=72..540)
  rect("box_r_cats", "<div style='font-size:10px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>EXCEPTION CATEGORIES</div>" +
    "<div style='font-size:9px;color:#0F172A;'>" +
    "<table style='width:100%;border-collapse:collapse;'>" +
    "<tr style='font-weight:800;color:#1E3A8A;'><td>CAT</td><td>DESC</td><td>EXAMPLES</td></tr>" +
    "<tr><td><span style='background:#EFF6FF;color:#2563EB;padding:1px 3px;border-radius:2px;font-weight:700;'>Transient</span></td><td>Self-resolving</td><td>Timeout, 5xx, Network jitter</td></tr>" +
    "<tr><td><span style='background:#FEF2F2;color:#DC2626;padding:1px 3px;border-radius:2px;font-weight:700;'>Persistent</span></td><td>Requires fix</td><td>Code bug, Bad input</td></tr>" +
    "<tr><td><span style='background:#F0FDF4;color:#16A34A;padding:1px 3px;border-radius:2px;font-weight:700;'>Data Qual</span></td><td>Invalid schema</td><td>Missing fields, outliers</td></tr>" +
    "<tr><td><span style='background:#F5F3FF;color:#7C3AED;padding:1px 3px;border-radius:2px;font-weight:700;'>Model Out</span></td><td>Hallucination</td><td>Filter rejected, guardrail block</td></tr>" +
    "<tr><td><span style='background:#FFFBEB;color:#D97706;padding:1px 3px;border-radius:2px;font-weight:700;'>Ext Dep</span></td><td>Third-party issues</td><td>API down, Rate limit</td></tr>" +
    "<tr><td><span style='background:#F8FAFC;color:#475569;padding:1px 3px;border-radius:2px;font-weight:700;'>Capacity</span></td><td>Resource limits</td><td>CPU, Memory, Storage</td></tr>" +
    "</table></div>", 1128, 72, 432, 135, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  rect("box_r_patts", "<div style='font-size:10px;font-weight:800;color:#2563EB;margin-bottom:2px;'>RESPONSE PATTERNS (TOOLS &amp; TECHNIQUES)</div><div style='font-size:9px;line-height:1.4;color:#0F172A;display:grid;grid-template-columns:repeat(2, 1fr);gap:2px;'>" +
    "<div>🔄 <b>Retry</b> (Exp Backoff + Jitter)</div> <div>🛡️ <b>Fallback / Degradation</b></div>" +
    "<div>⚡ <b>Circuit Breaker</b> (Open/Closed)</div> <div>👥 <b>Human-in-the-Loop (HITL)</b></div>" +
    "<div>⏱️ <b>Timeouts &amp; Deadlines</b></div> <div>🛡️ <b>Quarantine / DLQ</b></div>" +
    "<div>📦 <b>Idempotency &amp; Safe Retries</b></div> <div>🌐 <b>Multi-Region Failover</b></div>" +
    "</div>", 1128, 211, 432, 85, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("box_r_arts", "<div style='font-size:10px;font-weight:800;color:#16A34A;margin-bottom:2px;'>KEY ARTIFACTS</div><div style='font-size:9px;line-height:1.4;color:#0F172A;display:grid;grid-template-columns:repeat(2, 1fr);gap:2px;'>" +
    "<div>📖 <b>Runbooks</b> (Per Scenario)</div> <div>🔔 <b>Alerts &amp; Notifications</b></div>" +
    "<div>🎫 <b>Incident Tickets</b> (P1, P2, P3)</div> <div>📑 <b>Post-Incident Reports (PIR)</b></div>" +
    "<div>🩺 <b>Dashboard / SLOs</b></div> <div>🔄 <b>Change / Action Items</b></div>" +
    "</div>", 1128, 300, 432, 70, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("box_r_sev", "<div style='font-size:10px;font-weight:800;color:#DC2626;margin-bottom:2px;'>SEVERITY MATRIX (IMPACT vs URGENCY)</div><div style='font-size:9px;color:#0F172A;'>" +
    "<table style='width:100%;border-collapse:collapse;text-align:center;'>" +
    "<tr style='font-weight:800;'><td>URGENCY ➔<br/>IMPACT ↓</td><td>Low</td><td>Medium</td><td>High</td><td>Critical</td></tr>" +
    "<tr><td><b>Low</b></td><td style='background:#DCFCE7;'>P4</td><td style='background:#DCFCE7;'>P4</td><td style='background:#FEF9C3;'>P3</td><td style='background:#FED7AA;'>P2</td></tr>" +
    "<tr><td><b>Medium</b></td><td style='background:#DCFCE7;'>P4</td><td style='background:#FEF9C3;'>P3</td><td style='background:#FED7AA;'>P2</td><td style='background:#FECACA;'>P1</td></tr>" +
    "<tr><td><b>High</b></td><td style='background:#FEF9C3;'>P3</td><td style='background:#FED7AA;'>P2</td><td style='background:#FECACA;'>P1</td><td style='background:#FECACA;'>P1</td></tr>" +
    "<tr><td><b>Critical</b></td><td style='background:#FED7AA;'>P2</td><td style='background:#FECACA;'>P1</td><td style='background:#FECACA;'>P1</td><td style='background:#FECACA;'>P1</td></tr>" +
    "</table></div>", 1128, 374, 432, 163, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  // 6. BOTTOM ROW: MONITORING, ESCALATION, RECOVERY, PIR & NOTES (x=20..1560, y=546..740)
  rect("bot_p1", "<div style='font-size:8px;font-weight:800;color:#1E3A8A;margin-bottom:3px;'>MONITORING &amp; DETECTION</div><div style='font-size:10px;line-height:1.4;color:#0F172A;'>" +
    "📈 <b>Cloud Monitoring</b> (Metrics, Logs)<br/>" +
    "⏱️ <b>Distributed Tracing</b> (Cloud Trace)<br/>" +
    "🩺 <b>Uptime Checks</b> (Probes)<br/>" +
    "📑 <b>Log Analytics</b> (BigQuery / Logs)<br/>" +
    "👤 <b>User Feedback</b> (In-App / Support)<br/><br/>" +
    "<b>Signals:</b> Error Rate, Latency, Saturation" +
    "</div>", 20, 546, 260, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=6;");

  rect("bot_p2", "<div style='font-size:8px;font-weight:800;color:#2563EB;margin-bottom:6px;text-align:center;'>ESCALATION PATHS</div>" +
    "<div style='font-size:9px;color:#0F172A;display:flex;justify-content:space-around;text-align:center;align-items:center;margin-top:10px;'>" +
    "<div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:4px;border-radius:4px;'>🔔<br/><b>Alert</b></div> <div>➔</div> " +
    "<div style='border:1px solid #2563EB;background:#EFF6FF;padding:4px;border-radius:4px;'>👤<br/><b>On-Call Eng</b><br/>(L1) • T0</div> <div>➔</div> " +
    "<div style='border:1px solid #7C3AED;background:#F5F3FF;padding:4px;border-radius:4px;'>👤<br/><b>Service Owner</b><br/>(L2) • T0+15m</div> <div>➔</div> " +
    "<div style='border:1px solid #D97706;background:#FFFBEB;padding:4px;border-radius:4px;'>👤<br/><b>Eng Lead</b><br/>(L3) • T0+30m</div> <div>➔</div> " +
    "<div style='border:1px solid #DC2626;background:#FEF2F2;padding:4px;border-radius:4px;'>👤<br/><b>Incident Cmd</b><br/>(L4) • T0+60m</div>" +
    "</div>" +
    "<div style='font-size:9px;color:#64748B;text-align:center;margin-top:16px;'><b>Channels:</b> PagerDuty • Slack • Email • Phone • War Room</div>", 290, 546, 380, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=top;padding=6;");

  rect("bot_p3", "<div style='font-size:8px;font-weight:800;color:#16A34A;margin-bottom:3px;'>RECOVERY &amp; VALIDATION</div><div style='font-size:10px;line-height:1.4;color:#0F172A;'>" +
    "✔ Restore Service / Failover Complete<br/>" +
    "✔ Validate Functionality (Smoke Tests)<br/>" +
    "✔ Check SLOs &amp; Error Rates Stabilize<br/>" +
    "✔ Communicate Resolution Status<br/>" +
    "✔ Declare Resolved in P1/P2 Schedule<br/><br/>" +
    "<span style='color:#16A34A;font-weight:700;'>✔ Service Restored ➔ PIR Scheduled</span>" +
    "</div>", 680, 546, 290, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=6;");

  rect("bot_p4", "<div style='font-size:8px;font-weight:800;color:#7C3AED;margin-bottom:3px;'>POST-INCIDENT ACTIVITIES</div><div style='font-size:10px;line-height:1.4;color:#0F172A;'>" +
    "📑 Root Cause Analysis (RCA)<br/>" +
    "🤝 Blameless Post-Incident Review<br/>" +
    "🎯 Action Items &amp; Owners<br/>" +
    "📖 Update Runbooks / Alerts<br/>" +
    "💡 Knowledge Base Update<br/><br/>" +
    "<span style='color:#7C3AED;font-weight:700;'>Tools for Closure &amp; Validate</span>" +
    "</div>", 980, 546, 280, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=6;");

  rect("bot_p5", "<div style='font-size:8px;font-weight:800;color:#1E3A8A;margin-bottom:3px;'>NOTES</div><div style='font-size:9px;line-height:1.35;color:#64748B;'>" +
    "• All failures are expected. Fast recovery is the goal.<br/>" +
    "• Automate detection and response where safe.<br/>" +
    "• Guardrails + HITL for AI/ML model failures.<br/>" +
    "• Design for observability, resilience and graceful degradation.<br/>" +
    "• Continuously improve via learning loops." +
    "</div>", 1270, 546, 290, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=6;");

  // 7. FOOTER METADATA STRIP (x=20..1560, y=744..768)
  rect("footer_meta", "<div style='font-size:9px;color:#0F172A;display:flex;justify-content:space-between;align-items:center;'><div><b>LEGEND:</b> ── Primary Flow &nbsp;|&nbsp; - - Feedback Loop &nbsp;|&nbsp; ····· Optional Flow &nbsp;|&nbsp; 🟦 Process/Step &nbsp;|&nbsp; ⚙️ Auto Action &nbsp;|&nbsp; 👤 Human Action</div><div>Last Updated: May 8, 2025 &nbsp;|&nbsp; Next Review: Aug 8, 2025 &nbsp;|&nbsp; Owner: Enterprise Architecture Team</div></div>", 20, 744, 1540, 24, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=middle;padding=3;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_28_failure_exception_flow" name="Template 28: Failure / Exception Flow Architecture">
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
