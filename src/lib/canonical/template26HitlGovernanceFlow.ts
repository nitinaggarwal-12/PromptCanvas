/**
 * Canonical Architecture Template 26: HITL / Governance Architecture
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
  rect("num_badge", "26", 20, 16, 48, 48, "fillColor=#1E3A8A;fontColor=#FFFFFF;fontSize=24;fontStyle=1;rounded=1;align=center;verticalAlign=middle;");
  rect("hdr_title", "<div style='font-size:22px;font-weight:800;color:#0F172A;letter-spacing:0.5px;'>HITL / Governance Architecture</div><div style='font-size:11px;color:#1E3A8A;font-weight:700;margin-top:2px;'>Use Case: NovaCura – Responsible AI with Human-in-the-Loop &amp; Governance &nbsp;|&nbsp; Environment: Production &nbsp;|&nbsp; Region: us-central1 &nbsp;|&nbsp; Last Updated: May 8, 2025</div>", 78, 16, 840, 48, "strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=10;");
  rect("hdr_brand", "<div style='text-align:right;'><span style='font-size:20px;font-weight:800;color:#0284C7;'>🧬 NOVACURA</span><br/><span style='font-size:9.5px;color:#64748B;font-style:italic;'>AI-Powered Regulatory Intelligence Platform</span></div>", 940, 16, 280, 48, "strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

  // Objective Card
  rect("card_obj", "<div style='font-size:8.5px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>OBJECTIVE</div><div style='font-size:10px;line-height:1.35;color:#0F172A;'>Ensure accuracy, transparency, accountability, and compliance by incorporating human oversight, approvals, and governance at every critical step of the AI lifecycle.</div>", 1240, 16, 320, 48, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=4;");

  // 2. LEFT COLUMN: INPUTS & TRIGGERS (x=20..115, y=72..410)
  rect("box_inputs", "", 20, 72, 95, 338, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;rounded=1;");
  rect("lbl_inputs", "<span style='font-size:9px;font-weight:800;color:#2563EB;'>INPUTS &amp; TRIGGERS</span>", 20, 75, 95, 12, "strokeColor=none;fillColor=none;align=center;");

  const inps = [
    { t: "User Query / Request", icon: "👤" },
    { t: "Agent / Workflow Output", icon: "🤖" },
    { t: "Automated Decision", icon: "⚙️" },
    { t: "Policy / Rule Trigger", icon: "📜" },
    { t: "Regulatory Change", icon: "🏛️" },
    { t: "Data / Content Update", icon: "🗄️" },
    { t: "Risk / Anomaly Detected", icon: "⚠️" }
  ];
  inps.forEach((inp, idx) => {
    const iy = 92 + idx * 44;
    rect(`inp_${idx}`, `<div style='font-size:8px;font-weight:700;'>${inp.icon} ${inp.t}</div>`, 25, iy, 85, 38, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=middle;padding=2;");
  });

  // 3. MAIN HITL GOVERNANCE WORKFLOW (x=122..1290, y=72..410)
  rect("box_workflow_main", "", 122, 72, 1160, 338, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;rounded=1;");
  rect("lbl_workflow_main", "<span style='font-size:10px;font-weight:800;color:#2563EB;'>HITL GOVERNANCE WORKFLOW</span>", 122, 74, 1160, 12, "strokeColor=none;fillColor=none;align=center;");

  // 6 Workflow Steps (y=88..210)
  const steps = [
    { n: "1. ASSESS &amp; ROUTE", tag: "Automated", col: "#2563EB", bg: "#EFF6FF", sub: "Assess risk, impact &amp; sensitivity<br/>Apply policies &amp; rules<br/>Route to right human role" },
    { n: "2. REVIEW &amp; EVALUATE", tag: "Human", col: "#16A34A", bg: "#F0FDF4", sub: "Human reviews context &amp; AI output<br/>Validate accuracy, completeness<br/>Add comments" },
    { n: "3. DECISION &amp; ACTION", tag: "Human", col: "#D97706", bg: "#FFFBEB", sub: "Approve / Reject / Modify / Escalate<br/>Request more info<br/>Provide rationale" },
    { n: "4. ENFORCE &amp; EXECUTE", tag: "System", col: "#7C3AED", bg: "#FAF5FF", sub: "Execute approved action<br/>Block or rollback if rejected<br/>Apply guardrails &amp; controls" },
    { n: "5. RECORD &amp; AUDIT", tag: "Automated", col: "#2563EB", bg: "#EFF6FF", sub: "Log decision, rationale &amp; artifacts<br/>Version &amp; retain records<br/>Ensure traceability" },
    { n: "6. LEARN &amp; IMPROVE", tag: "Continuous", col: "#16A34A", bg: "#F0FDF4", sub: "Analyze feedback &amp; outcomes<br/>Improve models, prompts, policies<br/>Update knowledge base" }
  ];

  steps.forEach((st, idx) => {
    const sx = 128 + idx * 192;
    rect(`st_box_${idx}`, `<div style='font-size:9px;font-weight:800;color:${st.col};text-align:center;'>${st.n}</div><div style='font-size:8px;line-height:1.25;color:#0F172A;margin-top:3px;'>${st.sub}</div><div style='text-align:center;margin-top:4px;'><span style='background:${st.bg};border:1px solid ${st.col};color:${st.col};font-size:10px;padding:1px 4px;border-radius:2px;font-weight:700;'>${st.tag}</span></div>`, sx, 88, 186, 100, `fillColor=#FFFFFF;strokeColor=${st.col};rounded=1;align=left;verticalAlign=top;padding=3;`);
  });

  // HITL Roles & Responsibilities (RACI) (y=192..280)
  rect("box_raci", "", 128, 192, 1148, 86, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;");
  rect("lbl_raci", "<span style='font-size:9px;font-weight:800;color:#1E3A8A;'>HITL ROLES &amp; RESPONSIBILITIES (RACI)</span>", 128, 194, 1148, 10, "strokeColor=none;fillColor=none;align=center;");

  const raciPods = [
    { t: "Business User", sub: "Initiate request, provide context", tag: "R", col: "#2563EB", icon: "👤" },
    { t: "Reviewer / SME", sub: "Evaluate output, validate accuracy", tag: "R / A", col: "#16A34A", icon: "🔬" },
    { t: "Approver", sub: "Final decision, approve / reject", tag: "A", col: "#D97706", icon: "🔑" },
    { t: "Compliance Officer", sub: "Define policies, ensure adherence", tag: "C", col: "#7C3AED", icon: "🛡️" },
    { t: "Data Steward", sub: "Data quality, classification", tag: "C", col: "#0D9488", icon: "🗄️" },
    { t: "AI/ML Ops", sub: "Implement controls, monitor", tag: "R", col: "#1E3A8A", icon: "⚙️" },
    { t: "Audit / Risk", sub: "Audit &amp; verify, risk reporting", tag: "I", col: "#DC2626", icon: "📑" }
  ];
  raciPods.forEach((rp, idx) => {
    const rx = 134 + idx * 162;
    rect(`rp_${idx}`, `<div style='font-size:8px;font-weight:800;color:${rp.col};text-align:center;'>${rp.icon} ${rp.t}</div><div style='font-size:10px;color:#64748B;text-align:center;line-height:1.2;margin-top:1px;'>${rp.sub}</div><div style='text-align:center;margin-top:2px;'><span style='background:#FFF;border:1px solid ${rp.col};color:${rp.col};font-size:8px;padding:1px 3px;border-radius:2px;font-weight:800;'>${rp.tag}</span></div>`, rx, 206, 156, 68, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=2;");
  });

  // Governance Controls
  rect("box_gov_ctrls", "<div style='font-size:9px;font-weight:800;color:#2563EB;text-align:center;'>📜 Policy Enforcement &nbsp;|&nbsp; 🔒 Access Control (IAM) &nbsp;|&nbsp; ⚖️ Segregation of Duties &nbsp;|&nbsp; 🏷️ Data Classification &nbsp;|&nbsp; 📋 Consent &amp; Transparency &nbsp;|&nbsp; 📑 Audit Logging &nbsp;|&nbsp; 🗄️ Retention &amp; Records &nbsp;|&nbsp; 🩺 Monitoring &amp; Alerts</div>", 128, 282, 1148, 18, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=center;verticalAlign=middle;");

  // Examples of HITL Checkpoints (y=304..405)
  rect("box_checkpoints", "", 128, 304, 1148, 100, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;");
  rect("lbl_checkpoints", "<span style='font-size:9px;font-weight:800;color:#1E3A8A;'>EXAMPLES OF HITL CHECKPOINTS</span>", 128, 306, 1148, 10, "strokeColor=none;fillColor=none;align=center;");

  const chkpts = [
    { t: "Regulatory Q&amp;A", sub: "Review for accuracy, compliance &amp; citations", risk: "High", rcol: "#DC2626", rbg: "#FEF2F2" },
    { t: "Doc Summarization", sub: "Validate key facts, entities &amp; context", risk: "Medium", rcol: "#D97706", rbg: "#FFFBEB" },
    { t: "Policy / Rule Change", sub: "Review impact, scope &amp; recommendations", risk: "High", rcol: "#DC2626", rbg: "#FEF2F2" },
    { t: "Automated Decision", sub: "Human approval before execution", risk: "High", rcol: "#DC2626", rbg: "#FEF2F2" },
    { t: "Data Redaction", sub: "Verify redaction &amp; data protection", risk: "High", rcol: "#DC2626", rbg: "#FEF2F2" },
    { t: "Content Publishing", sub: "Final review before publication / sharing", risk: "Medium", rcol: "#D97706", rbg: "#FFFBEB" },
    { t: "Model / Prompt Update", sub: "Human sign-off before deployment", risk: "High", rcol: "#DC2626", rbg: "#FEF2F2" }
  ];
  chkpts.forEach((cp, idx) => {
    const cx = 134 + idx * 162;
    rect(`cp_${idx}`, `<div style='font-size:8px;font-weight:800;text-align:center;'>${cp.t}</div><div style='font-size:10px;color:#64748B;text-align:center;line-height:1.2;margin-top:1px;'>${cp.sub}</div><div style='text-align:center;margin-top:2px;'><span style='background:${cp.rbg};border:1px solid ${cp.rcol};color:${cp.rcol};font-size:10px;padding:1px 3px;border-radius:2px;font-weight:800;'>Risk: ${cp.risk}</span></div>`, cx, 318, 156, 80, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=2;");
  });

  // 4. FAR RIGHT: PRINCIPLES, ESCALATION, RISKS (x=1290..1560, y=72..410)
  rect("box_r_prin", "<div style='font-size:9px;font-weight:800;color:#16A34A;margin-bottom:1px;'>HITL / GOVERNANCE PRINCIPLES</div><div style='font-size:10px;line-height:1.25;color:#0F172A;'>✔ Human oversight for high-risk decisions<br/>✔ Clear roles, responsibilities &amp; escalation paths<br/>✔ Explainability &amp; transparency<br/>✔ Auditability &amp; end-to-end traceability<br/>✔ Fairness, safety &amp; ethical AI<br/>✔ Continuous learning &amp; improvement<br/>✔ Compliance with regulations &amp; standards</div>", 1290, 72, 270, 100, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=2;");

  rect("box_r_esc", "<div style='font-size:9px;font-weight:800;color:#2563EB;margin-bottom:1px;'>ESCALATION PATHS</div><div style='font-size:10px;line-height:1.25;color:#0F172A;'>👤 <b>Level 1:</b> Reviewer / SME<br/>&nbsp;&nbsp;&nbsp;&nbsp;↓<br/>🔑 <b>Level 2:</b> Approver / Manager<br/>&nbsp;&nbsp;&nbsp;&nbsp;↓<br/>🛡️ <b>Level 3:</b> Compliance / Legal<br/>&nbsp;&nbsp;&nbsp;&nbsp;↓<br/>🏛️ <b>Level 4:</b> Executive / Governance Board</div>", 1290, 176, 270, 100, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=2;");

  rect("box_r_risks", "<div style='font-size:9px;font-weight:800;color:#DC2626;margin-bottom:1px;'>KEY RISKS</div><div style='font-size:10px;line-height:1.25;color:#0F172A;'>⚠️ Incorrect / biased AI output<br/>⚠️ Inadequate human review<br/>⚠️ Policy non-compliance<br/>⚠️ Lack of auditability / traceability<br/>⚠️ Privilege misuse / access issues<br/>⚠️ Feedback not captured / acted upon<br/>⚠️ Delayed decisions / bottlenecks</div>", 1290, 280, 270, 130, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=2;");

  // 5. BOTTOM ROW: AUDIT TRAIL, STANDARDS, TECHS, OBS, METRICS, NOTES (x=20..1560, y=546..740)
  rect("bot_audit", "<div style='font-size:10px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>AUDIT TRAIL (WHAT WE CAPTURE)</div><div style='font-size:8px;line-height:1.35;color:#0F172A;'>📑 <b>Request ID &amp; Context</b><br/>🤖 <b>AI Output / Artifacts</b><br/>👤 <b>Human Decisions &amp; Comments</b><br/>💡 <b>Rationale &amp; Evidence</b><br/>⏱️ <b>Timestamps &amp; SLA Metrics</b><br/>📦 <b>Versioning &amp; Changes</b><br/>✔ <b>Final Outcome &amp; Actions</b></div>", 20, 546, 250, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("bot_std", "<div style='font-size:10px;font-weight:800;color:#16A34A;margin-bottom:2px;'>STANDARDS &amp; COMPLIANCE</div><div style='font-size:8px;line-height:1.35;color:#0F172A;'>✔ <b>EU AI Act</b> (Risk Mgmt &amp; Oversight)<br/>✔ <b>ISO/IEC 42001</b> (AI Management System)<br/>✔ <b>NIST AI RMF</b> (Govern, Map, Measure, Manage)<br/>✔ <b>SOC 2</b> (CC6.1 - Logical Access, CC7 - Change)<br/>✔ <b>GDPR</b> (Art. 5, 24, 25, 32 – Data Protection)<br/>✔ <b>FDA GxP</b> (21 CFR Part 11 – Audit Trails)<br/>✔ <b>HIPAA</b> (Privacy &amp; Security Rules)</div>", 280, 546, 260, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("bot_techs", "<div style='font-size:10px;font-weight:800;color:#2563EB;margin-bottom:2px;'>TECHNOLOGIES (Google Cloud)</div><div style='font-size:8px;line-height:1.35;color:#0F172A;'>🧠 <b>Vertex AI (Agents)</b> &nbsp;|&nbsp; ⚡ <b>Cloud Functions</b><br/>📊 <b>BigQuery</b> &nbsp;|&nbsp; 🗄️ <b>Firestore / AlloyDB</b><br/>🗃️ <b>Cloud Storage</b> &nbsp;|&nbsp; 📨 <b>Pub/Sub</b><br/>🔒 <b>Cloud IAM</b> &nbsp;|&nbsp; 📑 <b>Cloud Audit Logs</b><br/>🛡️ <b>SCC</b> &nbsp;|&nbsp; 📊 <b>Looker Studio</b></div>", 550, 546, 250, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("bot_obs", "<div style='font-size:10px;font-weight:800;color:#7C3AED;margin-bottom:2px;'>OBSERVABILITY</div><div style='font-size:8px;line-height:1.35;color:#0F172A;'>📈 <b>Monitoring</b> (Metrics)<br/>📑 <b>Logging</b> (Cloud Logging)<br/>🔔 <b>Alerting</b> (Policies)<br/>⏱️ <b>Tracing</b> (Cloud Trace)<br/>📊 <b>SLOs &amp; SLA Dashboards</b></div>", 810, 546, 230, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("bot_metrics", "<div style='font-size:10px;font-weight:800;color:#D97706;margin-bottom:2px;'>METRICS (EXAMPLES)</div><div style='font-size:8px;line-height:1.35;color:#0F172A;'>📊 <b>HITL Review Rate (%)</b><br/>✔ <b>Approval Rate (%)</b><br/>⏱️ <b>Avg Review Time (mins)</b><br/>🔺 <b>Escalation Rate (%)</b><br/>🔄 <b>Rework Rate (%)</b><br/>📑 <b>Audit Trail Completeness (%)</b><br/>🚨 <b>Policy Violation Count</b></div>", 1050, 546, 240, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("bot_notes", "<div style='font-size:10px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>NOTES</div><div style='font-size:8px;line-height:1.35;color:#64748B;'>• All high-risk interactions require human oversight.<br/>• Design for idempotency, retries and graceful degradation.<br/>• Maintain end-to-end traceability for all decisions.</div>", 1300, 546, 260, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  // 6. FOOTER METADATA STRIP (x=20..1560, y=744..768)
  rect("footer_meta", "<div style='font-size:9px;color:#0F172A;display:flex;justify-content:space-between;align-items:center;'><div>Version: 1.0</div><div>Date: May 2024</div></div>", 20, 744, 1540, 24, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=middle;padding=3;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_26_hitl_governance_architecture" name="Template 26: HITL / Governance Architecture">
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
