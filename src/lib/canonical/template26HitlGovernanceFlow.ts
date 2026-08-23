/**
 * Canonical Architecture Template 26: HITL / Governance Flow Architecture
 * Exact 1:1 High-Fidelity Master Blueprint of images/26.png
 */

export function generateTemplate26HitlGovernanceFlowXml(
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
  rect("num_badge", "26", 20, 20, 48, 48, "fillColor=#1E3A8A;fontColor=#FFFFFF;fontSize=24;fontStyle=1;rounded=1;align=center;verticalAlign=middle;");
  rect("hdr_title", "<div style='font-size:24px;font-weight:800;color:#0F172A;letter-spacing:0.5px;'>HITL / Governance Architecture</div><div style='font-size:11px;color:#1E3A8A;font-weight:700;margin-top:3px;'>Use Case: NovaCura – Responsible AI with Human-in-the-Loop &amp; Governance &nbsp;|&nbsp; Environment: Production &nbsp;|&nbsp; Region: us-central1 &nbsp;|&nbsp; Last Updated: May 8, 2025</div>", 78, 16, 850, 56, "strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  rect("hdr_brand", "<div style='text-align:right;'><span style='font-size:20px;font-weight:800;color:#0284C7;'>🧬 NOVACURA</span><br/><span style='font-size:9.5px;color:#64748B;font-style:italic;'>AI-Powered Regulatory Intelligence Platform</span></div>", 940, 18, 280, 45, "strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

  // Objective Card
  rect("card_obj", "<div style='font-size:12px;font-weight:800;color:#1E3A8A;margin-bottom:3px;'>OBJECTIVE</div><div style='font-size:11.5px;line-height:1.4;color:#0F172A;'>Ensure accuracy, transparency, accountability and compliance by incorporating human oversight, approvals and governance at every critical step of the AI lifecycle.</div>", 1240, 18, 320, 52, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=6;");

  // 2. LEFT COLUMN: INPUTS & TRIGGERS (x=20..140, y=78..465)
  rect("box_trig", "", 20, 78, 120, 387, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;");
  rect("lbl_trig", "<span style='font-size:11.5px;font-weight:800;color:#1E3A8A;'>INPUTS &amp; TRIGGERS</span>", 20, 82, 120, 14, "strokeColor=none;fillColor=none;align=center;");
  const trigs = [
    { icon: "💬", t: "User Query / Request" },
    { icon: "🤖", t: "Agent / Workflow Output" },
    { icon: "⚙️", t: "Automated Decision" },
    { icon: "📋", t: "Policy / Rule Trigger" },
    { icon: "⚖️", t: "Regulatory Change" },
    { icon: "🗄️", t: "Data / Content Update" },
    { icon: "⚠️", t: "Risk / Anomaly Detected" }
  ];
  trigs.forEach((tg, idx) => {
    rect(`tg_${idx}`, `<div style='font-size:9.5px;font-weight:700;'>${tg.icon} ${tg.t}</div>`, 26, 104 + idx * 51, 108, 45, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=2;");
  });

  // 3. CENTER OUTER CONTAINER: HITL GOVERNANCE WORKFLOW (x=148..1180, y=78..465)
  rect("box_gov_wf", "", 148, 78, 1032, 387, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;rounded=1;");
  rect("lbl_gov_wf", "<span style='font-size:8.5px;font-weight:800;color:#2563EB;'>HITL GOVERNANCE WORKFLOW</span>", 148, 82, 1032, 16, "strokeColor=none;fillColor=none;align=center;");

  const gwSteps = [
    { n: "1", t: "ASSESS &amp; ROUTE", s: "Assess risk, impact &amp; sensitivity<br/>Apply policies &amp; rules<br/>Route to right human role", mode: "Automated", col: "#1E3A8A", bg: "#EFF6FF", x: 156, w: 165 },
    { n: "2", t: "REVIEW &amp; EVALUATE", s: "Human reviews context &amp; AI output<br/>Validate accuracy, completeness<br/>Add comments", mode: "Human", col: "#16A34A", bg: "#F0FDF4", x: 326, w: 165 },
    { n: "3", t: "DECISION &amp; ACTION", s: "Approve / Reject / Modify / Escalate<br/>Request more info<br/>Provide rationale", mode: "Human", col: "#D97706", bg: "#FFFBEB", x: 496, w: 165 },
    { n: "4", t: "ENFORCE &amp; EXECUTE", s: "Execute approved action<br/>Block or rollback if rejected<br/>Apply guardrails &amp; controls", mode: "System", col: "#7C3AED", bg: "#F5F3FF", x: 666, w: 165 },
    { n: "5", t: "RECORD &amp; AUDIT", s: "Log decision, rationale &amp; artifacts<br/>Version &amp; retain records<br/>Ensure traceability", mode: "Automated", col: "#2563EB", bg: "#EFF6FF", x: 836, w: 165 },
    { n: "6", t: "LEARN &amp; IMPROVE", s: "Analyze feedback &amp; outcomes<br/>Improve models, prompts, policies<br/>Update knowledge base", mode: "Continuous", col: "#059669", bg: "#ECFDF5", x: 1006, w: 165 }
  ];

  gwSteps.forEach((gs, idx) => {
    rect(`gs_col_${idx}`, "", gs.x, 102, gs.w, 140, `fillColor=${gs.bg};strokeColor=${gs.col};strokeWidth=1;rounded=1;`);
    rect(`gs_hdr_${idx}`, `<div style='font-size:11px;font-weight:800;color:${gs.col};'>${gs.n}. ${gs.t}</div>`, gs.x, 106, gs.w, 14, "strokeColor=none;fillColor=none;align=center;");
    rect(`gs_sub_${idx}`, `<div style='font-size:9px;line-height:1.4;color:#0F172A;'>${gs.s}</div>`, gs.x + 4, 124, gs.w - 8, 80, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=middle;padding=4;");
    rect(`gs_tag_${idx}`, `<div style='font-size:9px;font-weight:800;color:${gs.col};'>${gs.mode}</div>`, gs.x + 20, 210, gs.w - 40, 24, `fillColor=#FFFFFF;strokeColor=${gs.col};rounded=1;align=center;verticalAlign=middle;`);
  });

  // RACI ROLES STRIP (y=248..340)
  rect("box_raci", "", 156, 248, 1015, 90, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;");
  rect("lbl_raci", "<span style='font-size:11.5px;font-weight:800;color:#1E3A8A;'>HITL ROLES &amp; RESPONSIBILITIES (RACI)</span>", 156, 252, 1015, 14, "strokeColor=none;fillColor=none;align=center;");

  const roles = [
    { t: "Business User", s: "(Requester)", r: "R", d: "Initiate request, provide context", x: 164, w: 138 },
    { t: "Reviewer / SME", s: "(Domain Expert)", r: "R / A", d: "Evaluate output, validate accuracy", x: 307, w: 138 },
    { t: "Approver", s: "(Authorized)", r: "A", d: "Final decision, approve / reject", x: 450, w: 138 },
    { t: "Compliance Officer", s: "(Policy Owner)", r: "C", d: "Define policies, ensure adherence", x: 593, w: 138 },
    { t: "Data Steward", s: "(Data Owner)", r: "C", d: "Data quality, classification", x: 736, w: 138 },
    { t: "AI/ML Ops", s: "(System Owner)", r: "R", d: "Implement controls, monitor", x: 879, w: 138 },
    { t: "Audit / Risk", s: "(Independent)", r: "I", d: "Audit &amp; verify, risk reporting", x: 1022, w: 140 }
  ];

  roles.forEach((rl, idx) => {
    rect(`rl_box_${idx}`, `<div style='font-size:10px;font-weight:800;color:#1E3A8A;'>👤 ${rl.t}<br/><span style='font-size:8.5px;color:#64748B;'>${rl.s}</span></div><div style='font-size:8.5px;color:#0F172A;margin:2px 0;'>${rl.d}</div><div style='font-size:9px;font-weight:800;background:#1E3A8A;color:#FFFFFF;padding:1px 4px;display:inline-block;border-radius:3px;'>${rl.r}</div>`, rl.x, 268, rl.w, 64, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=2;");
  });

  // GOVERNANCE CONTROLS BAR
  rect("bar_gov_ctrl", "<div style='font-size:11px;font-weight:800;color:#1E3A8A;margin-bottom:3px;text-align:center;'>GOVERNANCE CONTROLS (APPLIED ACROSS WORKFLOW)</div>" +
    "<div style='font-size:9px;color:#0F172A;display:flex;justify-content:space-around;text-align:center;'>" +
    "<div>🛡️ <b>Policy Enforcement</b></div>" +
    "<div>🔒 <b>Access Control (IAM)</b></div>" +
    "<div>👥 <b>Segregation of Duties</b></div>" +
    "<div>📑 <b>Data Classification</b></div>" +
    "<div>👁️ <b>Consent &amp; Transparency</b></div>" +
    "<div>⏱️ <b>Audit Logging</b></div>" +
    "<div>📅 <b>Retention &amp; Records</b></div>" +
    "<div>📈 <b>Monitoring &amp; Alerts</b></div>" +
    "</div>", 156, 342, 1015, 36, "fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=1;rounded=1;align=center;verticalAlign=middle;");

  // EXAMPLES OF HITL CHECKPOINTS (y=382..460)
  rect("box_hitl_chk", "", 156, 382, 1015, 78, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;");
  rect("lbl_hitl_chk", "<span style='font-size:11px;font-weight:800;color:#1E3A8A;'>EXAMPLES OF HITL CHECKPOINTS</span>", 156, 384, 1015, 12, "strokeColor=none;fillColor=none;align=center;");

  const chkpoints = [
    { t: "Regulatory Q&amp;A", s: "Review for accuracy, compliance &amp; citations", r: "High", col: "#DC2626", x: 164, w: 138 },
    { t: "Doc Summarization", s: "Validate key facts, entities &amp; context", r: "Medium", col: "#D97706", x: 307, w: 138 },
    { t: "Policy / Rule Change", s: "Review impact, scope &amp; recommendations", r: "High", col: "#DC2626", x: 450, w: 138 },
    { t: "Automated Decision", s: "Human approval before execution", r: "High", col: "#DC2626", x: 593, w: 138 },
    { t: "Data Redaction", s: "Verify redaction &amp; data protection", r: "High", col: "#DC2626", x: 736, w: 138 },
    { t: "Content Publishing", s: "Final review before publication / sharing", r: "Medium", col: "#D97706", x: 879, w: 138 },
    { t: "Model / Prompt Update", s: "Human sign-off before deployment", r: "Medium", col: "#D97706", x: 1022, w: 140 }
  ];

  chkpoints.forEach((cp, idx) => {
    rect(`cp_box_${idx}`, `<div style='font-size:9.5px;font-weight:800;color:#0F172A;'>${cp.t}</div><div style='font-size:8.5px;color:#64748B;margin:2px 0;'>${cp.s}</div><div style='font-size:8.5px;font-weight:800;color:${cp.col};'>Risk: ${cp.r}</div>`, cp.x, 398, cp.w, 56, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=2;");
  });

  // 4. FAR RIGHT COLUMN: PRINCIPLES, ESCALATION & RISKS (x=1188..1560, y=78..465)
  rect("box_r_prin", "<div style='font-size:11px;font-weight:800;color:#16A34A;margin-bottom:3px;'>HITL / GOVERNANCE PRINCIPLES</div><div style='font-size:9px;line-height:1.4;color:#0F172A;'>✔ Human oversight for high-risk decisions<br/>✔ Clear roles, responsibilities &amp; escalation paths<br/>✔ Explainability &amp; transparency<br/>✔ Auditability &amp; end-to-end traceability<br/>✔ Fairness, safety &amp; ethical AI<br/>✔ Continuous learning &amp; improvement<br/>✔ Compliance with regulations &amp; standards</div>", 1188, 78, 372, 115, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");
  
  rect("box_r_esc", "<div style='font-size:11px;font-weight:800;color:#2563EB;margin-bottom:3px;'>ESCALATION PATHS</div><div style='font-size:9px;line-height:1.4;color:#0F172A;'>👤 <b>Level 1</b>: Reviewer / SME<br/>&nbsp;&nbsp;&nbsp;&nbsp;↓<br/>👤 <b>Level 2</b>: Approver / Manager<br/>&nbsp;&nbsp;&nbsp;&nbsp;↓<br/>⚖️ <b>Level 3</b>: Compliance / Legal<br/>&nbsp;&nbsp;&nbsp;&nbsp;↓<br/>🏛️ <b>Level 4</b>: Executive / Governance Board</div>", 1188, 198, 372, 125, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("box_r_risks_g", "<div style='font-size:11px;font-weight:800;color:#DC2626;margin-bottom:3px;'>⚠️ KEY RISKS</div><div style='font-size:9px;line-height:1.4;color:#0F172A;'>🔴 Incorrect / biased AI output<br/>🔴 Inadequate human review<br/>🔴 Policy non-compliance<br/>🔴 Lack of auditability / traceability<br/>🔴 Privilege misuse / access issues<br/>🔴 Feedback not captured / acted upon<br/>🔴 Delayed decisions / bottlenecks</div>", 1188, 328, 372, 137, "fillColor=#FEF2F2;strokeColor=#FECACA;rounded=1;align=left;verticalAlign=top;padding=4;");

  // 5. BOTTOM ROW: 6 PANELS (x=20..1560, y=472..775)
  rect("bot_p1", "<div style='font-size:11.5px;font-weight:800;color:#1E3A8A;margin-bottom:3px;'>AUDIT TRAIL (WHAT WE CAPTURE)</div><div style='font-size:9px;line-height:1.5;color:#0F172A;'>📑 Request ID &amp; Context<br/>🤖 AI Output / Artifacts<br/>👤 Human Decisions &amp; Comments<br/>📋 Rationale &amp; Evidence<br/>⏱️ Timestamps &amp; SLA Metrics<br/>🔒 Versioning &amp; Changes<br/>✔ Final Outcome &amp; Actions</div>", 20, 472, 240, 205, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");
  
  rect("bot_p2", "<div style='font-size:11.5px;font-weight:800;color:#16A34A;margin-bottom:3px;'>STANDARDS &amp; COMPLIANCE</div><div style='font-size:9px;line-height:1.5;color:#0F172A;'>✔ EU AI Act (Risk Mgmt &amp; Oversight)<br/>✔ ISO/IEC 42001 (AI Management System)<br/>✔ NIST AI RMF (Govern, Map, Measure, Manage)<br/>✔ SOC 2 (CC6.1 - Logical Access, CC7 - Change)<br/>✔ GDPR (Art. 5, 24, 25, 32 – Data Protection)<br/>✔ FDA GxP (21 CFR Part 11 – Audit Trails)<br/>✔ HIPAA (Privacy &amp; Security Rules)</div>", 270, 472, 270, 205, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");
  
  rect("bot_p3", "<div style='font-size:11.5px;font-weight:800;color:#1E3A8A;margin-bottom:3px;'>TECHNOLOGIES (Google Cloud)</div><div style='font-size:9px;line-height:1.5;color:#0F172A;display:grid;grid-template-columns:repeat(2, 1fr);gap:4px;'><div>🧠 <b>Vertex AI</b> (Agents)</div> <div>⚡ <b>Cloud Functions</b></div> <div>📊 <b>BigQuery</b></div> <div>🗄️ <b>Firestore / AlloyDB</b></div> <div>🗃️ <b>Cloud Storage</b></div> <div>📡 <b>Pub/Sub</b></div> <div>👤 <b>Cloud IAM</b></div> <div>📑 <b>Cloud Audit Logs</b></div> <div>🛡️ <b>Security Command Center</b></div> <div>📊 <b>Looker Studio</b></div></div>", 550, 472, 380, 205, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");
  
  rect("bot_p4", "<div style='font-size:11.5px;font-weight:800;color:#7C3AED;margin-bottom:3px;'>OBSERVABILITY</div><div style='font-size:9px;line-height:1.5;color:#0F172A;'>📈 Monitoring (Metrics)<br/>📑 Logging (Cloud Logging)<br/>🔔 Alerting (Policies)<br/>⏱️ Tracing (Cloud Trace)<br/>🎯 SLOs &amp; SLA Dashboards</div>", 940, 472, 230, 205, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");
  
  rect("bot_p5", "<div style='font-size:11.5px;font-weight:800;color:#0D9488;margin-bottom:3px;'>METRICS (EXAMPLES)</div><div style='font-size:9px;line-height:1.5;color:#0F172A;'>📈 HITL Review Rate (%)<br/>✔ Approval Rate (%)<br/>⏱️ Avg Review Time (mins)<br/>🚨 Escalation Rate (%)<br/>🔄 Rework Rate (%)<br/>📑 Audit Trail Completeness (%)<br/>🛡️ Policy Violation Count</div>", 1180, 472, 220, 205, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");
  
  rect("bot_p6", "<div style='font-size:11.5px;font-weight:800;color:#1E3A8A;margin-bottom:3px;'>NOTES</div><div style='font-size:9px;line-height:1.45;color:#64748B;'>• All high-risk interactions require human oversight.<br/>• Design for idempotency, retries and graceful degradation.<br/>• Maintain end-to-end traceability for all decisions.</div>", 1410, 472, 150, 205, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  // 6. FOOTER LEGEND (x=20..1560, y=685..775)
  rect("footer_leg", "<div style='font-size:11px;color:#0F172A;display:flex;justify-content:space-around;text-align:center;align-items:center;'>" +
    "<div><b style='color:#1E3A8A;'>LEGEND:</b></div>" +
    "<div>─── Data / Control Flow</div>" +
    "<div>- - - Feedback / Learning Loop</div>" +
    "<div>🟦 Automated (System)</div>" +
    "<div>🟩 Human</div>" +
    "<div>🟪 Governance / Policy</div>" +
    "<div>🗄️ Data / Artifact</div>" +
    "<div>🟥 Risk / Issue</div>" +
    "</div>", 20, 685, 1540, 45, "fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;rounded=1;align=center;verticalAlign=middle;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_26_hitl_governance_flow" name="Template 26: HITL / Governance Architecture">
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
