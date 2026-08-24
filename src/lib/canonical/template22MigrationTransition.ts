/**
 * Master 1:1 High-Craft Exact Ground-Truth Replica for Template 22: Migration / Transition Architecture
 * Matches 100% of images/22.png:
 * - Current State (On-Prem & Legacy) vs Target State (Cloud-Native Platform)
 * - 5 Migration Phase columns (❶ Assess & Plan ➔ ❷ Ready & Build ➔ ❸ Migrate & Validate ➔ ❹ Optimize & Stabilize ➔ ❺ Decommission) with Key Deliverables
 * - Migration Principles, Migration Patterns (6Rs), Key Risks, Mitigation Strategies
 * - Migration Approach Overview (7 connected steps) + Wave Example progression
 * - Bottom Row: Key Benefits, Data Migration Strategy, Cutover Strategies, Success Metrics, Stakeholders, Tools & Technologies
 * - Pure 0°, 90°, 180°, 270° Geometrical Orthogonal Arrow Routing (Zero diagonals, Zero overlapping)
 * - 1536x1024 master canvas resolution.
 */

const E = (v?: string | null) =>
  (v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export function generateTemplate22MigrationTransitionXml(
  domainFlavor = "biopharma",
  theme: "light" | "dark" = "light"
): string {
  const isDark = theme === "dark";
  const c: string[] = [];

  const cell = (id: string, v: string, x: number, y: number, w: number, h: number, style: string) =>
    c.push(
      `<mxCell id="${id}" value="${E(v)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`
    );

  const edge = (id: string, src: string, trg: string, style: string) =>
    c.push(
      `<mxCell id="${id}" edge="1" parent="1" source="${src}" target="${trg}" style="${style}"><mxGeometry relative="1" as="geometry"/></mxCell>`
    );

  // ==================== 1. TOP HEADER BANNER (y=12..66) ====================
  cell("hdr_num", "22", 16, 12, 68, 54, "shape=rectangle;rounded=1;arcSize=14;fillColor=#6D28D9;strokeColor=#6D28D9;fontColor=#FFFFFF;fontSize=82;fontStyle=1;align=center;verticalAlign=middle;");
  
  cell(
    "hdr_title",
    `<div style='font-size:24px;font-weight:900;color:#0F172A;letter-spacing:0.5px;'>Migration / Transition Architecture</div>` +
    `<div style='font-size:12.5px;font-weight:700;color:#6D28D9;margin-top:2px;'>Use Case: NovaCura – Platform Modernization &amp; Migration</div>` +
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
    Migrate applications, data, and integrations to the target cloud architecture with minimal risk, zero data loss, and measurable business value at every step.
  </div>`;
  cell("hdr_obj", objHtml, 1140, 12, 380, 54, "overflow=hidden;whiteSpace=wrap;rounded=1;arcSize=8;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.2;html=1;align=left;verticalAlign=middle;padding=6;");

  // ==================== 2. CURRENT STATE (LEFT) (x=16..170, y=78..590, w=154, h=512) ====================
  cell("box_cur_state", "", 16, 78, 154, 512, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#64748B;strokeWidth=1.5;");
  cell("lbl_cur_state", "CURRENT STATE<br/><span style='font-size:7px;color:#64748B;font-weight:normal;'>On-Prem &amp; Legacy</span>", 16, 82, 154, 30, "text;html=1;strokeColor=none;fillColor=none;fontColor=#1E293B;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");

  const curItems = [
    { t: "Applications", sub: "Monolith Apps<br/>Legacy Services<br/>Batch Jobs", icon: "⚙️" },
    { t: "Data Stores", sub: "Oracle DB<br/>File Shares (NAS)<br/>Document Repos", icon: "🗄️" },
    { t: "Integrations", sub: "FTP / SFTP<br/>Point-to-Point<br/>Legacy APIs", icon: "🔄" },
    { t: "Infrastructure", sub: "On-Prem Data Center<br/>VMware / Physical<br/>Legacy Network", icon: "🏗️" }
  ];
  curItems.forEach((ci, idx) => {
    const cy = 118 + idx * 114;
    cell(`ci_${idx}`, `<div style="font-size:14px;text-align:center;">${ci.icon}</div><div style="font-size:7.5px;font-weight:800;color:#0F172A;text-align:center;margin-top:2px;">${ci.t}</div><div style="font-size:8px;color:#64748B;text-align:center;line-height:1.2;margin-top:2px;">${ci.sub}</div>`, 24, cy, 138, 102, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // Pure 0° Horizontal edge from Current State to Migration Phases
  edge("e_cur_to_phases", "box_cur_state", "box_phases", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#94A3B8;strokeWidth=3;endArrow=classic;endSize=6;exitX=1;exitY=0.5;entryX=0;entryY=0.5;");

  // ==================== 3. MIGRATION PHASES (CENTER) (x=180..1060, y=78..590, w=880, h=512) ====================
  cell("box_phases", "", 180, 78, 880, 512, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.8;");
  cell("lbl_phases", "MIGRATION PHASES", 180, 82, 880, 20, "text;html=1;strokeColor=none;fillColor=none;fontColor=#1E40AF;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;");

  const phases = [
    {
      num: "1", name: "Assess &amp; Plan",
      cards: [
        { t: "Discovery &amp; Inventory", sub: "Apps, data, infra, dependencies", icon: "🔍" },
        { t: "TCO &amp; Business Case", sub: "Cost, effort, timeline, value", icon: "💰" },
        { t: "Risk &amp; Dependency Analysis", sub: "Technical, data, operational risks", icon: "🛡️" },
        { t: "Migration Strategy Definition", sub: "Approach, pattern, wave plan", icon: "📑" }
      ],
      deliv: "• Migration Assessment Report<br/>• Target Architecture Blueprint<br/>• Migration Runbook (High Level)<br/>• Wave &amp; Cutover Plan"
    },
    {
      num: "2", name: "Ready &amp; Build",
      cards: [
        { t: "Target Landing Zone", sub: "Network, IAM, security, observability", icon: "🏗️" },
        { t: "Platform &amp; Services Provisioning", sub: "Core platform and shared services", icon: "⚙️" },
        { t: "Data Migration Setup", sub: "Connectivity, tools, validation rules", icon: "🗄️" },
        { t: "CI/CD &amp; Automation", sub: "Pipelines, IaC, guardrails", icon: "🚀" }
      ],
      deliv: "• Landing Zone Ready<br/>• Automation &amp; CI/CD Ready<br/>• Data Migration Plan<br/>• Validation Framework"
    },
    {
      num: "3", name: "Migrate &amp; Validate",
      cards: [
        { t: "Migrate in Waves", sub: "Low risk → High risk (Iterative)", icon: "🔄" },
        { t: "Data Migration", sub: "Bulk + CDC/Sync Validation", icon: "💾" },
        { t: "Application Cutover", sub: "Blue/Green / Canary / Phased", icon: "🚀" },
        { t: "Validate &amp; Test", sub: "Functional, performance, security, UAT", icon: "✔" }
      ],
      deliv: "• Wave Completion Report<br/>• Data Reconciliation Report<br/>• Test Results &amp; Sign-off<br/>• Cutover Readiness Report"
    },
    {
      num: "4", name: "Optimize &amp; Stabilize",
      cards: [
        { t: "Performance Tuning", sub: "Right size, caching, indexes", icon: "⏱️" },
        { t: "Resilience Hardening", sub: "HA/DR, backup, failover testing", icon: "🛡️" },
        { t: "Operational Handover", sub: "Runbooks, monitoring, SRE handoff", icon: "👥" },
        { t: "Cost Optimization", sub: "Rightsizing, savings plans, clean-up", icon: "💰" }
      ],
      deliv: "• Performance &amp; Resilience Report<br/>• DR Test Report<br/>• Runbooks &amp; SOPs<br/>• Cost Optimization Plan"
    },
    {
      num: "5", name: "Decommission",
      cards: [
        { t: "Legacy System Decommission", sub: "Quiet period &amp; sign-off", icon: "📦" },
        { t: "Data Retention", sub: "Archive &amp; compliance validation", icon: "📑" },
        { t: "Access &amp; Integration Cleanup", sub: "Remove old access, endpoints", icon: "🔒" },
        { t: "Knowledge Transfer", sub: "KT sessions &amp; documentation", icon: "👥" }
      ],
      deliv: "• Decommission Sign-off<br/>• Archive &amp; Retention Report<br/>• Access Removal Report<br/>• Final Migration Report"
    }
  ];

  phases.forEach((ph, pIdx) => {
    const px = 190 + pIdx * 172;
    cell(`ph_box_${pIdx}`, "", px, 108, 166, 360, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");
    cell(`ph_hdr_${pIdx}`, `<div style="display:flex;align-items:center;justify-content:center;"><span style="background:#6D28D9;color:#FFFFFF;padding:1px 5px;border-radius:10px;font-size:7.5px;font-weight:900;margin-right:4px;">${ph.num}</span> <span style="font-size:8px;font-weight:800;color:#0F172A;">${ph.name}</span></div>`, px, 112, 166, 16, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

    ph.cards.forEach((cd, cIdx) => {
      const cy = 132 + cIdx * 58;
      cell(`ph_${pIdx}_cd_${cIdx}`, `<div style="display:flex;align-items:flex-start;gap:4px;"><span style="font-size:13px;">${cd.icon}</span><div style="text-align:left;"><div style="font-size:7px;font-weight:800;color:#0F172A;line-height:1.1;">${cd.t}</div><div style="font-size:8px;color:#64748B;line-height:1.15;margin-top:1px;">${cd.sub}</div></div></div>`, px + 4, cy, 158, 52, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=left;verticalAlign=top;padding=3;");
    });

    cell(`ph_deliv_box_${pIdx}`, "", px, 474, 166, 106, "rounded=1;arcSize=4;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1;");
    cell(`ph_deliv_lbl_${pIdx}`, "Key Deliverables", px, 476, 166, 14, "text;html=1;strokeColor=none;fillColor=none;fontColor=#1E40AF;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;");
    cell(`ph_deliv_txt_${pIdx}`, `<div style="font-size:8px;line-height:1.35;color:#0F172A;padding:2px 4px;">${ph.deliv}</div>`, px, 492, 166, 84, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

    if (pIdx > 0) {
      // Pure 0° Horizontal arrow between adjacent phase boxes
      edge(`e_ph_${pIdx}`, `ph_box_${pIdx - 1}`, `ph_box_${pIdx}`, "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=classic;endSize=4;exitX=1;exitY=0.5;entryX=0;entryY=0.5;");
    }
  });

  // Pure 0° Horizontal edge from Phases to Target State
  edge("e_phases_to_target", "box_phases", "box_target_state", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16A34A;strokeWidth=3;endArrow=classic;endSize=6;exitX=1;exitY=0.5;entryX=0;entryY=0.5;");

  // ==================== 4. TARGET STATE (RIGHT) (x=1070..1224, y=78..590, w=154, h=512) ====================
  cell("box_target_state", "", 1070, 78, 154, 512, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;");
  cell("lbl_target_state", "TARGET STATE<br/><span style='font-size:7px;color:#16A34A;font-weight:normal;'>Cloud-Native Platform</span>", 1070, 82, 154, 30, "text;html=1;strokeColor=none;fillColor=none;fontColor=#166534;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");

  const targetItems = [
    { t: "Applications", sub: "Microservices<br/>Managed Services<br/>Serverless", icon: "⚙️" },
    { t: "Data Layer", sub: "Cloud SQL<br/>BigQuery<br/>Object Storage", icon: "🗄️" },
    { t: "Integrations", sub: "API Gateway<br/>Event-Driven<br/>Standard APIs", icon: "🔄" },
    { t: "Platform", sub: "GKE / Cloud Run<br/>Cloud Services<br/>Global Network", icon: "☁️" },
    { t: "Observability &amp; Ops", sub: "Cloud Monitoring<br/>Logging<br/>SCC / SIEM", icon: "📈" }
  ];
  targetItems.forEach((ti, idx) => {
    const ty = 118 + idx * 92;
    cell(`ti_${idx}`, `<div style="font-size:14px;text-align:center;">${ti.icon}</div><div style="font-size:7.5px;font-weight:800;color:#0F172A;text-align:center;margin-top:2px;">${ti.t}</div><div style="font-size:8px;color:#64748B;text-align:center;line-height:1.2;margin-top:2px;">${ti.sub}</div>`, 1078, ty, 138, 84, "rounded=1;arcSize=4;fillColor=#F0FDF4;strokeColor=#BBF7D0;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // ==================== 5. FAR RIGHT SIDEBAR (x=1234..1520, y=78..590, w=286, h=512) ====================
  // 1. Migration Principles
  cell("box_m_princ", "", 1234, 78, 286, 126, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;");
  cell("lbl_m_princ", "MIGRATION PRINCIPLES", 1234, 80, 286, 16, "text;html=1;strokeColor=none;fillColor=none;fontColor=#16A34A;fontSize=8;fontStyle=1;align=center;verticalAlign=middle;");
  const princHtml = `<div style="font-size:8px;line-height:1.35;color:#0F172A;padding:2px 6px;">
    ✔ <b>Business value driven</b><br/>
    ✔ <b>Security &amp; compliance by design</b><br/>
    ✔ <b>Data integrity &amp; zero data loss</b><br/>
    ✔ <b>Automate &amp; repeatable</b><br/>
    ✔ <b>Minimize downtime &amp; risk</b><br/>
    ✔ <b>Measure &amp; continuously improve</b>
  </div>`;
  cell("txt_m_princ", princHtml, 1236, 98, 282, 102, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  // 2. Migration Patterns (6Rs)
  cell("box_m_patt", "", 1234, 210, 286, 116, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.2;");
  cell("lbl_m_patt", "MIGRATION PATTERNS", 1234, 212, 286, 16, "text;html=1;strokeColor=none;fillColor=none;fontColor=#7C3AED;fontSize=8;fontStyle=1;align=center;verticalAlign=middle;");
  const pattHtml = `<div style="font-size:8px;line-height:1.35;color:#0F172A;padding:2px 6px;">
    📦 <b>Rehost</b> (Lift &amp; Shift)<br/>
    ⚙️ <b>Refactor / Replatform</b><br/>
    🧠 <b>Rearchitect</b> (Cloud Native)<br/>
    🗑️ <b>Retire / Decommission</b><br/>
    🔒 <b>Retain</b> (No Change)
  </div>`;
  cell("txt_m_patt", pattHtml, 1236, 230, 282, 92, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  // 3. Key Risks
  cell("box_m_risks", "", 1234, 332, 286, 130, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#DC2626;strokeWidth=1.2;");
  cell("lbl_m_risks", "⚠️ KEY RISKS", 1234, 334, 286, 16, "text;html=1;strokeColor=none;fillColor=none;fontColor=#DC2626;fontSize=8;fontStyle=1;align=center;verticalAlign=middle;");
  const risksHtml = `<div style="font-size:8px;line-height:1.35;color:#0F172A;padding:2px 6px;">
    🔴 <b>Data migration complexity</b><br/>
    🔴 <b>Application compatibility</b><br/>
    🔴 <b>Downtime / SLA impact</b><br/>
    🔴 <b>Security &amp; compliance gaps</b><br/>
    🔴 <b>Cost overrun</b><br/>
    🔴 <b>Parallel run inconsistency</b>
  </div>`;
  cell("txt_m_risks", risksHtml, 1236, 352, 282, 106, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  // 4. Mitigation Strategies
  cell("box_m_mitig", "", 1234, 468, 286, 122, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;");
  cell("lbl_m_mitig", "MITIGATION STRATEGIES", 1234, 470, 286, 16, "text;html=1;strokeColor=none;fillColor=none;fontColor=#1E40AF;fontSize=8;fontStyle=1;align=center;verticalAlign=middle;");
  const mitigHtml = `<div style="font-size:8px;line-height:1.35;color:#0F172A;padding:2px 6px;">
    ✔ <b>Wave-based approach</b><br/>
    ✔ <b>Thorough testing &amp; validation</b><br/>
    ✔ <b>Rollback &amp; fallback plans</b><br/>
    ✔ <b>Strong governance &amp; controls</b><br/>
    ✔ <b>Continuous monitoring</b>
  </div>`;
  cell("txt_m_mitig", mitigHtml, 1236, 488, 282, 98, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  // ==================== 6. MIDDLE ROW: APPROACH OVERVIEW & WAVE EXAMPLE (y=598..698, h=100) ====================
  // 1. Migration Approach Overview (w=850)
  cell("box_m_appr", "", 16, 598, 850, 100, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;");
  cell("lbl_m_appr", "MIGRATION APPROACH OVERVIEW", 16, 600, 850, 16, "text;html=1;strokeColor=none;fillColor=none;fontColor=#1E40AF;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");

  const approachSteps = [
    { t: "Discover &amp;<br/>Assess", icon: "🔍" },
    { t: "Plan &amp;<br/>Design", icon: "📑" },
    { t: "Build &amp;<br/>Prepare", icon: "🛠️" },
    { t: "Migrate in<br/>Waves", icon: "🔄" },
    { t: "Cutover &amp;<br/>Validate", icon: "✔" },
    { t: "Optimize &amp;<br/>Stabilize", icon: "📈" },
    { t: "Decommission<br/>&amp; Close", icon: "🗑️" }
  ];
  approachSteps.forEach((as, idx) => {
    const ax = 26 + idx * 118;
    cell(`as_${idx}`, `<div style="font-size:16px;text-align:center;">${as.icon}</div><div style="font-size:7px;font-weight:800;color:#0F172A;text-align:center;line-height:1.15;margin-top:2px;">${as.t}</div>`, ax, 624, 108, 64, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");
    if (idx > 0) {
      // Pure 0° Horizontal arrow between approach steps
      edge(`e_as_${idx}`, `as_${idx - 1}`, `as_${idx}`, "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=classic;endSize=4;exitX=1;exitY=0.5;entryX=0;entryY=0.5;");
    }
  });

  // 2. Wave Example (w=644)
  cell("box_m_wave", "", 876, 598, 644, 100, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.5;");
  cell("lbl_m_wave", "WAVE EXAMPLE", 876, 600, 644, 16, "text;html=1;strokeColor=none;fillColor=none;fontColor=#7C3AED;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");

  const waves = [
    { name: "Wave 1", desc: "Foundational<br/>(Non-Critical)", icon: "👥" },
    { name: "Wave 2", desc: "Business Support<br/>(Important)", icon: "👥" },
    { name: "Wave 3", desc: "Customer Facing<br/>(Critical)", icon: "👥" },
    { name: "Wave 4", desc: "Long Tail<br/>(Residual)", icon: "👥" }
  ];
  waves.forEach((wv, idx) => {
    const wx = 888 + idx * 156;
    cell(`wv_${idx}`, `<div style="font-size:8px;font-weight:900;color:#1E40AF;text-align:center;">${wv.name}</div><div style="font-size:8px;color:#0F172A;text-align:center;margin-top:2px;">${wv.desc}</div><div style="font-size:12px;text-align:center;margin-top:2px;">${wv.icon}</div>`, wx, 622, 146, 52, "rounded=1;arcSize=4;fillColor=#FAF5FF;strokeColor=#E9D5FF;html=1;align=center;verticalAlign=middle;padding=2;");
  });
  cell("lbl_wave_sub", "Iterative waves with feedback &amp; continuous improvement", 876, 680, 644, 14, "text;html=1;strokeColor=none;fillColor=none;fontColor=#64748B;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");

  // ==================== 7. BOTTOM ROW: 6 CARDS (y=706..954, h=248) ====================
  // 1. Key Benefits (w=230)
  cell("box_b_benefits", "", 16, 706, 230, 248, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;");
  cell("lbl_b_benefits", "KEY BENEFITS", 16, 706, 230, 20, "shape=rectangle;rounded=1;arcSize=8;fillColor=#F0FDF4;strokeColor=#CBD5E1;fontColor=#16A34A;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");
  const bBenefitsHtml = `<div style="font-size:7px;line-height:1.5;color:#0F172A;padding:4px 6px;">
    ✔ <b>Reduced risk</b> with iterative waves<br/><br/>
    ✔ <b>Minimal downtime</b> &amp; business impact<br/><br/>
    ✔ <b>Improved scalability</b> &amp; performance<br/><br/>
    ✔ <b>Enhanced security</b> &amp; compliance<br/><br/>
    ✔ <b>Lower operational cost</b><br/><br/>
    ✔ <b>Faster innovation</b> &amp; agility
  </div>`;
  cell("txt_b_benefits", bBenefitsHtml, 18, 728, 226, 222, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=2;");

  // 2. Data Migration Strategy (w=240)
  cell("box_b_dms", "", 254, 706, 240, 248, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;");
  cell("lbl_b_dms", "DATA MIGRATION STRATEGY", 254, 706, 240, 20, "shape=rectangle;rounded=1;arcSize=8;fillColor=#EFF6FF;strokeColor=#CBD5E1;fontColor=#1E40AF;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");
  const bDmsHtml = `<div style="font-size:7px;line-height:1.45;color:#0F172A;padding:4px 6px;">
    📊 <b>Assessment &amp; Profiling</b><br/><br/>
    📦 <b>Initial Bulk Migration</b><br/><br/>
    🔄 <b>CDC / Incremental Sync</b><br/><br/>
    ✔ <b>Validation &amp; Reconciliation</b><br/><br/>
    🚀 <b>Cutover &amp; Final Sync</b><br/><br/>
    📈 <b>Post-Cutover Monitoring</b>
  </div>`;
  cell("txt_b_dms", bDmsHtml, 256, 728, 236, 222, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=2;");

  // 3. Cutover Strategies (w=250)
  cell("box_b_cutover", "", 502, 706, 250, 248, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.5;");
  cell("lbl_b_cutover", "CUTOVER STRATEGIES", 502, 706, 250, 20, "shape=rectangle;rounded=1;arcSize=8;fillColor=#FAF5FF;strokeColor=#CBD5E1;fontColor=#7C3AED;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");
  const bCutoverHtml = `<div style="font-size:7px;line-height:1.45;color:#0F172A;padding:4px 6px;">
    🔴 <b>Big Bang</b><br/>&nbsp;&nbsp;&nbsp;&nbsp;Single cutover (High risk)<br/><br/>
    🔄 <b>Phased</b><br/>&nbsp;&nbsp;&nbsp;&nbsp;Module by module<br/><br/>
    🚀 <b>Blue / Green</b><br/>&nbsp;&nbsp;&nbsp;&nbsp;Parallel run &amp; switch<br/><br/>
    👥 <b>Canary</b><br/>&nbsp;&nbsp;&nbsp;&nbsp;Limited users first
  </div>`;
  cell("txt_b_cutover", bCutoverHtml, 504, 728, 246, 222, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=2;");

  // 4. Success Metrics (w=240)
  cell("box_b_metrics", "", 760, 706, 240, 248, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;");
  cell("lbl_b_metrics", "SUCCESS METRICS", 760, 706, 240, 20, "shape=rectangle;rounded=1;arcSize=8;fillColor=#F0FDF4;strokeColor=#CBD5E1;fontColor=#16A34A;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");
  const bMetricsHtml = `<div style="font-size:7px;line-height:1.5;color:#0F172A;padding:4px 6px;">
    ✔ <b>Zero data loss</b><br/><br/>
    ✔ <b>Cutover success rate &gt; 98%</b><br/><br/>
    ✔ <b>Downtime within planned window</b><br/><br/>
    ✔ <b>Performance within SLA</b><br/><br/>
    ✔ <b>Cost within target</b><br/><br/>
    ✔ <b>Business sign-off</b>
  </div>`;
  cell("txt_b_metrics", bMetricsHtml, 762, 728, 236, 222, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=2;");

  // 5. Stakeholders (w=240)
  cell("box_b_stake", "", 1008, 706, 240, 248, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;");
  cell("lbl_b_stake", "STAKEHOLDERS", 1008, 706, 240, 20, "shape=rectangle;rounded=1;arcSize=8;fillColor=#F8FAFC;strokeColor=#CBD5E1;fontColor=#1E3A8A;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");
  const bStakeHtml = `<div style="font-size:7px;line-height:1.45;color:#0F172A;padding:4px 6px;">
    👥 <b>Business Owners</b><br/><br/>
    ⚙️ <b>Application Owners</b><br/><br/>
    🗄️ <b>Data Owners</b><br/><br/>
    🏗️ <b>Platform / Infrastructure</b><br/><br/>
    🛡️ <b>Security &amp; Compliance</b><br/><br/>
    👥 <b>Operations / SRE</b><br/><br/>
    📊 <b>PMO / Governance</b>
  </div>`;
  cell("txt_b_stake", bStakeHtml, 1010, 728, 236, 222, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=2;");

  // 6. Tools & Technologies (w=264)
  cell("box_b_tools", "", 1256, 706, 264, 248, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;");
  cell("lbl_b_tools", "TOOLS &amp; TECHNOLOGIES", 1256, 706, 264, 20, "shape=rectangle;rounded=1;arcSize=8;fillColor=#EFF6FF;strokeColor=#CBD5E1;fontColor=#1E40AF;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");
  const bToolsHtml = `<div style="font-size:7px;line-height:1.4;color:#0F172A;padding:4px 6px;">
    ☁️ <b>Google Cloud (GCP)</b><br/><span style="color:#64748B;">Landing Zone, GKE, Cloud SQL, BigQuery</span><br/><br/>
    🔄 <b>Database Migration Service (DMS)</b><br/><br/>
    📦 <b>Data Transfer Appliance</b><br/><br/>
    🏗️ <b>Infrastructure as Code (Terraform)</b><br/><br/>
    🚀 <b>CI/CD (Cloud Build / GitHub Actions)</b><br/><br/>
    📈 <b>Monitoring (Cloud Monitoring, Logging)</b>
  </div>`;
  cell("txt_b_tools", bToolsHtml, 1258, 728, 260, 222, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=2;");

  // ==================== 8. FOOTER LEGEND (y=962, h=24) ====================
  const legendHtml = `<div style='font-size:8px;color:#64748B;display:flex;justify-content:space-between;align-items:center;'>
    <div><b>LEGEND:</b> &nbsp; ━━━━► Flow &nbsp;|&nbsp; ┈┈┈► Data/Control &nbsp;|&nbsp; ───► Optional &nbsp;|&nbsp; 🟦 Process/Phase &nbsp;|&nbsp; 🟩 Target State &nbsp;|&nbsp; 🟪 Supporting Area &nbsp;|&nbsp; 🟥 Risk/Issue</div>
    <div>Enterprise Migration Blueprint &nbsp;|&nbsp; May 8, 2025</div>
  </div>`;
  cell("footer_legend", legendHtml, 16, 962, 1504, 24, "rounded=1;arcSize=8;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=left;verticalAlign=middle;padding=4;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_22_migration_transition" name="Template 22: Migration / Transition Architecture">
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
