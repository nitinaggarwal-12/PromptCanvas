/**
 * Master 1:1 High-Craft Exact Ground-Truth Replica for Template 26: HITL / Governance Architecture
 * Matches 100% of images/26.png:
 * - Left Column: Inputs & Triggers (7 items)
 * - 6-step HITL Governance Workflow (❶ Assess & Route ➔ ❻ Learn & Improve) with type tags (Automated, Human, System, Continuous)
 * - HITL Roles & Responsibilities (RACI) with 7 Role Pods and RACI badges + RACI Legend
 * - Governance Controls cross-cutting bar (8 controls)
 * - Examples of HITL Checkpoints (7 cards with Risk High / Medium badges)
 * - Audit Trail (What We Capture) + Standards & Compliance checklist (7 frameworks)
 * - Right Sidebar: Governance Principles (7 items), Escalation Paths (4 levels), Key Risks
 * - Bottom Row: Technologies (Google Cloud, 10 icons), Observability (5 icons), Metrics (Examples, 7 items), Notes, Legend
 * - 1536x1024 master canvas resolution.
 */

const E = (v?: string | null) =>
  (v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export function generateTemplate26HitlGovernanceFlowXml(
  domainFlavor = "biopharma",
  theme: "light" | "dark" = "light"
): string {
  const isDark = theme === "dark";
  const c: string[] = [];

  const cell = (id: string, v: string, x: number, y: number, w: number, h: number, style: string) =>
    c.push(
      `<mxCell id="${id}" value="${E(v)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`
    );

  const edge = (id: string, src: string, trg: string, style = "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;endSize=5;") =>
    c.push(
      `<mxCell id="${id}" edge="1" parent="1" source="${src}" target="${trg}" style="${style}"><mxGeometry relative="1" as="geometry"/></mxCell>`
    );

  // ==================== 1. TOP HEADER BANNER (y=12..66) ====================
  cell("hdr_num", "26", 16, 12, 68, 54, "shape=rectangle;rounded=1;arcSize=14;fillColor=#6D28D9;strokeColor=#6D28D9;fontColor=#FFFFFF;fontSize=82;fontStyle=1;align=center;verticalAlign=middle;");
  
  cell(
    "hdr_title",
    `<div style='font-size:24px;font-weight:900;color:#0F172A;letter-spacing:0.5px;'>HITL / Governance Architecture</div>` +
    `<div style='font-size:12.5px;font-weight:700;color:#6D28D9;margin-top:2px;'>Use Case: NovaCura – Responsible AI with Human-in-the-Loop &amp; Governance</div>` +
    `<div style='font-size:11px;color:#64748B;margin-top:2px;'>Environment: Production &nbsp;|&nbsp; Region: us-central1 &nbsp;|&nbsp; Last Updated: May 8, 2025</div>`,
    94,
    12,
    760,
    54,
    "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;"
  );

  const brandHtml = `<table style="width:100%;border-collapse:collapse;"><tr><td style="width:36px;vertical-align:middle;text-align:center;"><span style="font-size:32px;">🧬</span></td><td style="text-align:left;vertical-align:middle;padding-left:8px;"><div style="font-size:24px;font-weight:900;color:#0284C7;letter-spacing:1px;">NOVACURA</div><div style="font-size:10.5px;color:#64748B;font-weight:600;font-style:italic;">AI-Powered Regulatory Intelligence Platform</div></td></tr></table>`;
  cell("hdr_brand", brandHtml, 860, 12, 270, 54, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  const objHtml = `<div style='white-space:normal;word-break:break-word;font-size:10.5px;font-weight:900;color:#1E3A8A;margin-bottom:2px;'>OBJECTIVE</div><div style='white-space:normal;word-break:break-word;font-size:8.5px;line-height:1.35;color:#0F172A;'>
    Ensure accuracy, transparency, accountability and compliance by incorporating human oversight, approvals and governance at every critical step of the AI lifecycle.
  </div>`;
  cell("hdr_obj", objHtml, 1140, 12, 380, 54, "overflow=hidden;whiteSpace=wrap;rounded=1;arcSize=8;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.2;html=1;align=left;verticalAlign=middle;padding=6;");

  // ==================== 2. LEFT COLUMN: INPUTS & TRIGGERS (x=16..170, y=78..520, w=154) ====================
  cell("box_inputs", "", 16, 78, 154, 442, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;");
  cell("lbl_inputs", "INPUTS &amp; TRIGGERS", 16, 80, 154, 18, "text;html=1;strokeColor=none;fillColor=none;fontColor=#1E40AF;fontSize=8;fontStyle=1;html=1;align=center;verticalAlign=middle;");

  const inputTriggers = [
    { t: "User Query / Request", icon: "💬" },
    { t: "Agent / Workflow Output", icon: "🤖" },
    { t: "Automated Decision", icon: "⚙️" },
    { t: "Policy / Rule Trigger", icon: "📑" },
    { t: "Regulatory / Compliance Change", icon: "⚖️" },
    { t: "Data / Content Update", icon: "🗄️" },
    { t: "Risk / Anomaly Detected", icon: "⚠️" }
  ];
  inputTriggers.forEach((it, idx) => {
    const ity = 104 + idx * 58;
    cell(`it_trig_${idx}`, `<div style="display:flex;align-items:center;gap:6px;"><span style="font-size:14px;">${it.icon}</span><span style="font-size:8px;font-weight:800;color:#0F172A;line-height:1.15;">${it.t}</span></div>`, 24, ity, 138, 50, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=left;verticalAlign=middle;padding=3;");
  });

  // ==================== 3. CENTER: HITL WORKFLOW & RACI (x=180..1220, y=78..450, w=1040) ====================
  // 1. HITL Governance Workflow (6 steps: 1..6)
  cell("box_hitl_wf", "", 180, 78, 1040, 172, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.8;");
  cell("lbl_hitl_wf", "HITL GOVERNANCE WORKFLOW", 180, 80, 1040, 16, "text;html=1;strokeColor=none;fillColor=none;fontColor=#1E40AF;fontSize=9;fontStyle=1;align=center;verticalAlign=middle;");

  const wfSteps = [
    {
      num: "1", name: "ASSESS &amp; ROUTE",
      desc: "• Assess risk, impact &amp; sensitivity<br/>• Apply policies &amp; rules<br/>• Route to right human role",
      tag: "Automated", tbg: "#EFF6FF", tfg: "#1E40AF", icon: "🔍"
    },
    {
      num: "2", name: "REVIEW &amp; EVALUATE",
      desc: "• Human reviews context &amp; AI output<br/>• Validate accuracy, completeness<br/>• Add comments",
      tag: "Human", tbg: "#F0FDF4", tfg: "#166534", icon: "👤"
    },
    {
      num: "3", name: "DECISION &amp; ACTION",
      desc: "• Approve / Reject / Modify / Escalate<br/>• Request more info<br/>• Provide rationale",
      tag: "Human", tbg: "#FFFBEB", tfg: "#D97706", icon: "⚖️"
    },
    {
      num: "4", name: "ENFORCE &amp; EXECUTE",
      desc: "• Execute approved action<br/>• Block or rollback if rejected<br/>• Apply guardrails &amp; controls",
      tag: "System", tbg: "#FAF5FF", tfg: "#7C3AED", icon: "⚙️"
    },
    {
      num: "5", name: "RECORD &amp; AUDIT",
      desc: "• Log decision, rationale &amp; artifacts<br/>• Version &amp; retain records<br/>• Ensure traceability",
      tag: "Automated", tbg: "#EFF6FF", tfg: "#1E40AF", icon: "📑"
    },
    {
      num: "6", name: "LEARN &amp; IMPROVE",
      desc: "• Analyze feedback &amp; outcomes<br/>• Improve models, prompts, policies<br/>• Update knowledge base",
      tag: "Continuous", tbg: "#F0FDF4", tfg: "#166534", icon: "📈"
    }
  ];

  wfSteps.forEach((ws, idx) => {
    const wsx = 190 + idx * 170;
    cell(`ws_box_${idx}`, "", wsx, 100, 162, 142, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");
    cell(`ws_hdr_${idx}`, `<div style="display:flex;align-items:center;justify-content:center;"><span style="background:#6D28D9;color:#FFFFFF;padding:1px 5px;border-radius:10px;font-size:7px;font-weight:900;margin-right:4px;">${ws.num}</span> <span style="font-size:7px;font-weight:800;color:#0F172A;">${ws.name}</span></div>`, wsx, 104, 162, 16, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

    cell(`ws_desc_${idx}`, `<div style="font-size:7.5px;color:#0F172A;line-height:1.2;padding:2px 4px;">${ws.desc}</div>`, wsx, 122, 162, 86, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

    // Tag
    cell(`ws_tag_${idx}`, ws.tag, wsx + 20, 214, 122, 20, `rounded=1;arcSize=4;fillColor=${ws.tbg};strokeColor=#CBD5E1;fontColor=${ws.tfg};fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;`);

    if (idx > 0) {
      edge(`e_ws_${idx}`, `ws_box_${idx - 1}`, `ws_box_${idx}`, "strokeColor=#0F172A;strokeWidth=1.2;endArrow=classic;endSize=3;");
    }
  });

  // 2. HITL Roles & Responsibilities (RACI) (y=256..396, h=140)
  cell("box_raci_row", "", 180, 256, 1040, 140, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.5;");
  cell("lbl_raci_row", "HITL ROLES &amp; RESPONSIBILITIES (RACI)", 180, 258, 930, 16, "text;html=1;strokeColor=none;fillColor=none;fontColor=#7C3AED;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");

  const raciRoles = [
    { name: "Business User<br/><span style='color:#64748B;'>(Requester)</span>", desc: "• Initiate request<br/>• Provide context<br/>• Review outcome", raci: "R", rbg: "#2563EB" },
    { name: "Reviewer / SME<br/><span style='color:#64748B;'>(Domain Expert)</span>", desc: "• Evaluate output<br/>• Validate accuracy<br/>• Provide feedback", raci: "R / A", rbg: "#16A34A" },
    { name: "Approver<br/><span style='color:#64748B;'>(Authorized)</span>", desc: "• Final decision<br/>• Approve / Reject<br/>• Ensure compliance", raci: "A", rbg: "#D97706" },
    { name: "Compliance Officer<br/><span style='color:#64748B;'>(Policy Owner)</span>", desc: "• Define policies<br/>• Ensure adherence<br/>• Periodic audits", raci: "C", rbg: "#7C3AED" },
    { name: "Data Steward<br/><span style='color:#64748B;'>(Data Owner)</span>", desc: "• Data quality<br/>• Access &amp; usage<br/>• Classification", raci: "C", rbg: "#0284C7" },
    { name: "AI/ML Ops<br/><span style='color:#64748B;'>(System Owner)</span>", desc: "• Implement controls<br/>• Monitor &amp; alert<br/>• Maintain pipelines", raci: "R", rbg: "#2563EB" },
    { name: "Audit / Risk<br/><span style='color:#64748B;'>(Independent)</span>", desc: "• Audit &amp; verify<br/>• Risk assessment<br/>• Reporting", raci: "I", rbg: "#0F172A" }
  ];

  raciRoles.forEach((rr, idx) => {
    const rrx = 188 + idx * 132;
    cell(`rr_box_${idx}`, "", rrx, 276, 126, 112, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;");
    cell(`rr_hdr_${idx}`, `<div style="font-size:8px;font-weight:900;color:#0F172A;text-align:center;">${rr.name}</div>`, rrx, 278, 126, 24, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
    cell(`rr_desc_${idx}`, `<div style="font-size:7.5px;color:#0F172A;line-height:1.2;padding:2px;">${rr.desc}</div>`, rrx, 304, 126, 52, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");
    
    // RACI Badge
    cell(`rr_badge_${idx}`, rr.raci, rrx + 44, 360, 38, 20, `shape=ellipse;fillColor=${rr.rbg};strokeColor=#FFFFFF;fontColor=#FFFFFF;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;`);
  });

  // RACI Legend Box (Right side of RACI row)
  cell("box_raci_leg", "", 1114, 276, 100, 112, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("lbl_raci_leg", "RACI LEGEND", 1114, 278, 100, 14, "text;html=1;strokeColor=none;fillColor=none;fontColor:#64748B;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");
  const raciLegHtml = `<div style="font-size:8px;line-height:1.4;color:#0F172A;padding:2px 6px;">
    <b>R</b> Responsible<br/>
    <b>A</b> Accountable<br/>
    <b>C</b> Consulted<br/>
    <b>I</b> Informed
  </div>`;
  cell("txt_raci_leg", raciLegHtml, 1116, 294, 96, 90, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  // 3. Governance Controls bar (y=402..444, h=42)
  cell("box_gov_caps", "", 180, 402, 1040, 42, "rounded=1;arcSize=6;fillColor=#FAF5FF;strokeColor=#7C3AED;strokeWidth=1.2;");
  cell("lbl_gov_caps", "GOVERNANCE CONTROLS (APPLIED ACROSS WORKFLOW)", 180, 404, 1040, 12, "text;html=1;strokeColor=none;fillColor=none;fontColor=#7C3AED;fontSize=7;fontStyle=1;align=center;verticalAlign=middle;");

  const govControls = [
    { t: "Policy Enforcement<br/>&amp; Guardrails", icon: "🛡️" },
    { t: "Access Control<br/>(IAM, Least Privilege)", icon: "🔒" },
    { t: "Segregation of Duties<br/>(SoD)", icon: "👥" },
    { t: "Data Classification &amp;<br/>Handling", icon: "📑" },
    { t: "Consent &amp;<br/>Transparency", icon: "📜" },
    { t: "Audit Logging &amp;<br/>Traceability", icon: "📑" },
    { t: "Retention &amp;<br/>Record Management", icon: "📦" },
    { t: "Monitoring &amp;<br/>Anomaly Detection", icon: "📈" }
  ];
  govControls.forEach((gc, idx) => {
    const gcx = 186 + idx * 128;
    cell(`gc_${idx}`, `<div style="display:flex;align-items:center;gap:3px;"><span style="font-size:11px;">${gc.icon}</span><span style="font-size:7.5px;font-weight:800;color:#0F172A;line-height:1.1;">${gc.t}</span></div>`, gcx, 418, 124, 22, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=left;verticalAlign=middle;padding=2;");
  });

  // ==================== 4. MIDDLE ROW: 7 CHECKPOINTS, AUDIT TRAIL, STANDARDS (y=450..588, h=138) ====================
  // 1. Examples of HITL Checkpoints (7 cards, w=900)
  cell("box_chk_sec", "", 16, 450, 900, 138, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;");
  cell("lbl_chk_sec", "EXAMPLES OF HITL CHECKPOINTS", 16, 452, 900, 14, "text;html=1;strokeColor=none;fillColor=none;fontColor=#1E40AF;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;");

  const checkpoints = [
    { t: "Regulatory Q&amp;A<br/>Answer Generation", sub: "Review for accuracy,<br/>compliance &amp; citations", risk: "Risk: High", rbg: "#FEF2F2", rfg: "#DC2626" },
    { t: "Document Summarization<br/>&amp; Extraction", sub: "Validate key facts,<br/>entities &amp; context", risk: "Risk: Medium", rbg: "#FFFBEB", rfg: "#D97706" },
    { t: "Policy / Rule Change<br/>Impact Analysis", sub: "Review impact, scope<br/>&amp; recommendations", risk: "Risk: High", rbg: "#FEF2F2", rfg: "#DC2626" },
    { t: "Automated Decision<br/>(e.g., Approvals)", sub: "Human approval<br/>before execution", risk: "Risk: High", rbg: "#FEF2F2", rfg: "#DC2626" },
    { t: "Data Redaction<br/>&amp; PII Handling", sub: "Verify redaction<br/>&amp; data protection", risk: "Risk: High", rbg: "#FEF2F2", rfg: "#DC2626" },
    { t: "Content Publishing<br/>(External)", sub: "Final review before<br/>publication / sharing", risk: "Risk: Medium", rbg: "#FFFBEB", rfg: "#D97706" },
    { t: "Model / Prompt Update<br/>Deployment", sub: "Human sign-off<br/>before deployment", risk: "Risk: Medium", rbg: "#FFFBEB", rfg: "#D97706" }
  ];

  checkpoints.forEach((ck, idx) => {
    const ckx = 24 + idx * 126;
    cell(`ck_${idx}`, `<div style="font-size:8px;font-weight:900;color:#1E40AF;text-align:center;line-height:1.15;">${ck.t}</div><div style="font-size:7.5px;color:#0F172A;text-align:center;line-height:1.15;margin:3px 0;">${ck.sub}</div><div style="text-align:center;"><span style="background:${ck.rbg};color:${ck.rfg};padding:1px 5px;border-radius:6px;font-size:7.5px;font-weight:800;">${ck.risk}</span></div>`, ckx, 470, 120, 110, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=top;padding=3;");
  });

  // 2. Audit Trail (What We Capture) (w=290, x=922)
  cell("box_m_audit", "", 922, 450, 290, 138, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.2;");
  cell("lbl_m_audit", "AUDIT TRAIL (WHAT WE CAPTURE)", 922, 452, 290, 14, "text;html=1;strokeColor=none;fillColor=none;fontColor=#7C3AED;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;");
  const auditHtml = `<div style="font-size:8px;line-height:1.35;color:#0F172A;padding:2px 6px;">
    📑 <b>Request ID &amp; Context</b><br/>
    🤖 <b>AI Output / Artifacts</b><br/>
    👤 <b>Human Decisions &amp; Comments</b><br/>
    📜 <b>Rationale &amp; Evidence</b><br/>
    ⏱️ <b>Timestamps &amp; SLA Metrics</b><br/>
    ⚙️ <b>Versioning &amp; Changes</b><br/>
    ✔ <b>Final Outcome &amp; Actions</b>
  </div>`;
  cell("txt_m_audit", auditHtml, 924, 468, 286, 116, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  // 3. Standards & Compliance (w=296, x=1220)
  cell("box_m_std", "", 1220, 450, 300, 138, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;");
  cell("lbl_m_std", "STANDARDS &amp; COMPLIANCE", 1220, 452, 300, 14, "text;html=1;strokeColor=none;fillColor=none;fontColor=#166534;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;");
  const stdHtml = `<div style="font-size:7.5px;line-height:1.3;color:#0F172A;padding:2px 6px;">
    ✔ <b>EU AI Act</b> (Risk Management &amp; Oversight)<br/>
    ✔ <b>ISO/IEC 42001</b> (AI Management System)<br/>
    ✔ <b>NIST AI RMF</b> (Govern, Map, Measure, Manage)<br/>
    ✔ <b>SOC 2</b> (CC6.1 Logical Access, CC7 Change Mgmt)<br/>
    ✔ <b>GDPR</b> (Art. 5, 24, 25, 32 Data Protection by Design)<br/>
    ✔ <b>FDA GxP</b> (21 CFR Part 11 Audit Trails)<br/>
    ✔ <b>HIPAA</b> (Privacy &amp; Security Rules)
  </div>`;
  cell("txt_m_std", stdHtml, 1222, 468, 296, 116, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  // ==================== 5. RIGHT SIDEBAR TOP: PRINCIPLES, ESCALATION, RISKS (x=1230..1520, y=78..444, w=290) ====================
  // 1. Principles
  cell("box_r_princ", "", 1230, 78, 290, 130, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;");
  cell("lbl_r_princ", "HITL / GOVERNANCE PRINCIPLES", 1230, 80, 290, 16, "text;html=1;strokeColor=none;fillColor=none;fontColor=#16A34A;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;");
  const hPrincHtml = `<div style="font-size:8px;line-height:1.3;color:#0F172A;padding:2px 6px;">
    ✔ <b>Human oversight for high-risk decisions</b><br/>
    ✔ <b>Clear roles, responsibilities &amp; escalation paths</b><br/>
    ✔ <b>Explainability &amp; transparency</b><br/>
    ✔ <b>Auditability &amp; end-to-end traceability</b><br/>
    ✔ <b>Fairness, safety &amp; ethical AI</b><br/>
    ✔ <b>Continuous learning &amp; improvement</b><br/>
    ✔ <b>Compliance with regulations &amp; standards</b>
  </div>`;
  cell("txt_r_princ", hPrincHtml, 1232, 98, 286, 106, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  // 2. Escalation Paths
  cell("box_r_escl", "", 1230, 214, 290, 110, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.2;");
  cell("lbl_r_escl", "ESCALATION PATHS", 1230, 216, 290, 14, "text;html=1;strokeColor=none;fillColor=none;fontColor=#7C3AED;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;");
  const esclHtml = `<div style="font-size:8px;line-height:1.35;color:#0F172A;padding:2px 6px;text-align:center;">
    👤 <b>Level 1: Reviewer / SME</b><br/>⬇<br/>
    👥 <b>Level 2: Approver / Manager</b><br/>⬇<br/>
    ⚖️ <b>Level 3: Compliance / Legal</b><br/>⬇<br/>
    🏛️ <b>Level 4: Executive / Governance Board</b>
  </div>`;
  cell("txt_r_escl", esclHtml, 1232, 232, 286, 88, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // 3. Key Risks
  cell("box_r_risks", "", 1230, 328, 290, 116, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#DC2626;strokeWidth=1.2;");
  cell("lbl_r_risks", "⚠️ KEY RISKS", 1230, 330, 290, 14, "text;html=1;strokeColor=none;fillColor=none;fontColor=#DC2626;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;");
  const hRisksHtml = `<div style="font-size:7.5px;line-height:1.25;color:#0F172A;padding:2px 6px;">
    🔴 <b>Incorrect / biased AI output</b><br/>
    🔴 <b>Inadequate human review</b><br/>
    🔴 <b>Policy non-compliance</b><br/>
    🔴 <b>Lack of auditability / traceability</b><br/>
    🔴 <b>Privilege misuse / access issues</b><br/>
    🔴 <b>Feedback not captured / acted upon</b><br/>
    🔴 <b>Delayed decisions / bottlenecks</b>
  </div>`;
  cell("txt_r_risks", hRisksHtml, 1232, 346, 286, 94, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  // ==================== 6. BOTTOM ROW: TECHNOLOGIES, OBSERVABILITY, METRICS, NOTES (y=598..954, h=356) ====================
  // 1. Technologies (Google Cloud) (w=680)
  cell("box_b_tech", "", 16, 598, 680, 230, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;");
  cell("lbl_b_tech", "TECHNOLOGIES (Google Cloud)", 16, 600, 680, 20, "shape=rectangle;rounded=1;arcSize=8;fillColor=#EFF6FF;strokeColor=#CBD5E1;fontColor=#1E40AF;fontSize=8.5;fontStyle=1;html=1;align=center;verticalAlign=middle;");
  
  const gcpTechs = [
    { t: "Vertex AI (Agents)", icon: "🧠" },
    { t: "Cloud Functions / Run", icon: "⚡" },
    { t: "BigQuery", icon: "📊" },
    { t: "Firestore / AlloyDB", icon: "🗄️" },
    { t: "Cloud Storage", icon: "📦" },
    { t: "Pub/Sub", icon: "📨" },
    { t: "IAM / Access Mgmt", icon: "🔒" },
    { t: "Dataplex", icon: "📁" },
    { t: "Cloud Audit Logs", icon: "📜" },
    { t: "Security Command Center", icon: "🛡️" }
  ];
  gcpTechs.forEach((gt, idx) => {
    const col = idx % 5;
    const row = Math.floor(idx / 5);
    const gx = 26 + col * 132;
    const gy = 626 + row * 92;
    cell(`gt_${idx}`, `<div style="font-size:14px;text-align:center;">${gt.icon}</div><div style="font-size:8px;font-weight:800;color:#0F172A;text-align:center;line-height:1.1;margin-top:2px;">${gt.t}</div>`, gx, gy, 124, 82, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // Notes below Tech (y=836..954, h=118)
  cell("box_b_notes", "", 16, 836, 680, 118, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("lbl_b_notes", "NOTES", 16, 838, 680, 14, "text;html=1;strokeColor=none;fillColor=none;fontColor=#1E3A8A;fontSize=7.5;fontStyle=1;align=left;padding=4;");
  const hNotesHtml = `<div style="font-size:8px;line-height:1.4;color:#0F172A;padding:2px 8px;">
    • All high-risk interactions require human oversight.<br/>
    • Design for idempotency, retries and graceful degradation.<br/>
    • Maintain end-to-end traceability for all decisions.
  </div>`;
  cell("txt_b_notes", hNotesHtml, 18, 854, 676, 96, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  // 2. Observability (w=430, x=706)
  cell("box_b_obs", "", 706, 598, 430, 356, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.5;");
  cell("lbl_b_obs", "OBSERVABILITY", 706, 600, 430, 20, "shape=rectangle;rounded=1;arcSize=8;fillColor=#FAF5FF;strokeColor=#CBD5E1;fontColor=#7C3AED;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");
  
  const obsIcons = [
    { t: "Monitoring<br/>(Metrics)", icon: "📈" },
    { t: "Logging<br/>(Cloud Logging)", icon: "📑" },
    { t: "Alerting<br/>(Policies)", icon: "🔔" },
    { t: "Tracing<br/>(Cloud Trace)", icon: "🔍" },
    { t: "SLOs &amp; SLA<br/>Dashboards", icon: "📊" }
  ];
  obsIcons.forEach((ob, idx) => {
    const obx = 716 + idx * 82;
    cell(`ob_${idx}`, `<div style="font-size:16px;text-align:center;">${ob.icon}</div><div style="font-size:8px;font-weight:800;color:#0F172A;text-align:center;line-height:1.1;margin-top:2px;">${ob.t}</div>`, obx, 628, 76, 78, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  const obsDetailsHtml = `<div style="font-size:8px;line-height:1.45;color:#0F172A;padding:6px 12px;margin-top:90px;">
    ✔ <b>Audit Log Retention:</b> Immutable 7-year storage for FDA 21 CFR Part 11.<br/>
    ✔ <b>Reviewer SLA Tracking:</b> Alert when review queue latency exceeds 15 minutes.<br/>
    ✔ <b>Drift &amp; Anomaly Monitoring:</b> Real-time detection of model confidence degradation.
  </div>`;
  cell("txt_b_obs_dtl", obsDetailsHtml, 708, 716, 426, 230, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  // 3. Metrics (Examples) (w=370, x=1146)
  cell("box_b_met", "", 1146, 598, 374, 356, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;");
  cell("lbl_b_met", "METRICS (EXAMPLES)", 1146, 600, 374, 20, "shape=rectangle;rounded=1;arcSize=8;fillColor=#F0FDF4;strokeColor=#CBD5E1;fontColor=#16A34A;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");
  const metHtml = `<div style="font-size:7px;line-height:1.6;color:#0F172A;padding:6px 12px;">
    📈 <b>HITL Review Rate (%)</b><br/><br/>
    ✔ <b>Approval Rate (%)</b><br/><br/>
    ⏱️ <b>Avg Review Time (mins)</b><br/><br/>
    ⚠️ <b>Escalation Rate (%)</b><br/><br/>
    🔄 <b>Rework Rate (%)</b><br/><br/>
    📑 <b>Audit Trail Completeness (%)</b><br/><br/>
    🛡️ <b>Policy Violation Count</b>
  </div>`;
  cell("txt_b_met", metHtml, 1148, 624, 370, 324, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=4;");

  // ==================== 7. FOOTER LEGEND (y=962, h=24) ====================
  const legendHtml = `<div style='font-size:8px;color:#64748B;display:flex;justify-content:space-between;align-items:center;'>
    <div><b>LEGEND:</b> &nbsp; ━━━━► Data / Control Flow &nbsp;|&nbsp; ┈┈┈► Feedback Loop &nbsp;|&nbsp; 🟦 Automated &nbsp;|&nbsp; 🟩 Human &nbsp;|&nbsp; 🟪 Governance / Policy</div>
    <div>Responsible AI &amp; Human-in-the-Loop Architecture &nbsp;|&nbsp; May 8, 2025</div>
  </div>`;
  cell("footer_legend", legendHtml, 16, 962, 1504, 24, "rounded=1;arcSize=8;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=left;verticalAlign=middle;padding=4;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_26_hitl_governance_flow" name="Template 26: HITL / Governance Architecture">
    <mxGraphModel dx="1536" dy="1024" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1536" pageHeight="1024" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${c.join("\n        ")}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
