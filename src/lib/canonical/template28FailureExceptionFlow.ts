/**
 * Master 1:1 High-Craft Exact Ground-Truth Replica for Template 28: Failure / Exception Flow Architecture
 * Matches 100% of images/28.png:
 * - Left Column: Potential Failure Sources (8 items)
 * - Top Center: End-to-End Failure Flow (6 steps: ❶ Detect ➔ ❻ Learn) with feedback loop
 * - Center: 6 Common Failure Scenarios (A. API Timeout, B. Data Quality, C. Model Generation, D. External API Rate Limit, E. Infra Exhaustion, F. Auth Failure) with decision diamonds and branch outcomes
 * - Right Sidebar: Exception Categories table (6 types), Response Patterns (8 items), Key Artifacts (6 items), Severity Matrix (Impact vs Urgency Heatmap)
 * - Bottom Row: Monitoring & Detection (5 icons), Escalation Paths (4 levels + Timeouts), Recovery & Validation (5 checkmarks), Post-Incident Activities (5 items), Legend, Notes
 * - 1536x1024 master canvas resolution.
 */

const E = (v?: string | null) =>
  (v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export function generateTemplate28FailureExceptionFlowXml(
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
  cell("hdr_num", "28", 16, 12, 68, 54, "shape=rectangle;rounded=1;arcSize=14;fillColor=#6D28D9;strokeColor=#6D28D9;fontColor=#FFFFFF;fontSize=82;fontStyle=1;align=center;verticalAlign=middle;");
  
  cell(
    "hdr_title",
    `<div style='font-size:24px;font-weight:900;color:#0F172A;letter-spacing:0.5px;'>FAILURE / EXCEPTION FLOW ARCHITECTURE</div>` +
    `<div style='font-size:12.5px;font-weight:700;color:#6D28D9;margin-top:2px;'>Use Case: NovaCura – AI-Powered Regulatory Intelligence Platform</div>` +
    `<div style='font-size:11px;color:#64748B;margin-top:2px;'>Environment: Production &nbsp;|&nbsp; Region: us-central1 &nbsp;|&nbsp; Last Updated: May 8, 2025</div>`,
    94,
    12,
    760,
    54,
    "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;"
  );

  const brandHtml = `<table style="width:100%;border-collapse:collapse;"><tr><td style="width:36px;vertical-align:middle;text-align:center;"><span style="font-size:32px;">🧬</span></td><td style="text-align:left;vertical-align:middle;padding-left:8px;"><div style="font-size:24px;font-weight:900;color:#0284C7;letter-spacing:1px;">NOVACURA</div><div style="font-size:10.5px;color:#64748B;font-weight:600;font-style:italic;">AI-Powered Regulatory Intelligence Platform</div></td></tr></table>`;
  cell("hdr_brand", brandHtml, 860, 12, 270, 54, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  const objHtml = `<div style='font-size:10.5px;font-weight:900;color:#1E3A8A;margin-bottom:2px;'>OBJECTIVE</div><div style='font-size:8.5px;line-height:1.35;color:#0F172A;'>
    Detect, classify, and respond to failures/exception conditions quickly to minimize impact, restore service, and learn to prevent recurrence.
  </div>`;
  cell("hdr_obj", objHtml, 1140, 12, 380, 54, "rounded=1;arcSize=8;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.2;html=1;align=left;verticalAlign=middle;padding=6;");

  // ==================== 2. LEFT COLUMN: POTENTIAL FAILURE SOURCES (x=16..170, y=78..588, w=154) ====================
  cell("box_sources", "", 16, 78, 154, 510, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;");
  cell("lbl_sources", "POTENTIAL FAILURE SOURCES", 16, 80, 154, 18, "text;html=1;strokeColor=none;fillColor=none;fontColor=#1E40AF;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;");

  const failSources = [
    { t: "User / Client", sub: "(Invalid input, timeouts)", icon: "👤" },
    { t: "Network / Connectivity", sub: "(Latency, DNS, drops)", icon: "🌐" },
    { t: "Application / Service", sub: "(Code errors, crashes)", icon: "💻" },
    { t: "AI / Model Layer", sub: "(Model errors, timeouts, hallucination guardrails)", icon: "🧠" },
    { t: "Data / Storage", sub: "(DB errors, schema issues, unavailable data)", icon: "🗄️" },
    { t: "External Systems", sub: "(API errors, rate limits, third-party outages)", icon: "🔗" },
    { t: "Infrastructure / Platform", sub: "(Resource exhaustion, VM/Container/Service down)", icon: "☁️" },
    { t: "Security / Access", sub: "(Auth failures, token expiry, permission issues)", icon: "🔒" }
  ];

  failSources.forEach((fs, idx) => {
    const fsy = 102 + idx * 60;
    cell(`fs_src_${idx}`, `<div style="display:flex;align-items:center;gap:4px;"><span style="font-size:13px;">${fs.icon}</span><div><div style="font-size:8px;font-weight:800;color:#0F172A;">${fs.t}</div><div style="font-size:7.5px;color:#64748B;line-height:1.1;margin-top:1px;">${fs.sub}</div></div></div>`, 22, fsy, 142, 52, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=left;verticalAlign=middle;padding=2;");
  });

  // ==================== 3. TOP CENTER: END-TO-END FLOW (x=180..1090, y=78..200, w=910) ====================
  cell("box_e2e_flow", "", 180, 78, 910, 122, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.8;");
  cell("lbl_e2e_flow", "END-TO-END FAILURE / EXCEPTION FLOW", 180, 80, 910, 14, "text;html=1;strokeColor=none;fillColor=none;fontColor=#1E40AF;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");

  const e2eSteps = [
    { num: "1", name: "DETECT", desc: "Monitoring, alerts, health checks, user reports", icon: "🔍", bg: "#EFF6FF", stroke: "#BFDBFE", fg: "#1E40AF" },
    { num: "2", name: "CLASSIFY", desc: "Identify failure type, impact, severity, affected services", icon: "🏷️", bg: "#F0FDF4", stroke: "#BBF7D0", fg: "#166534" },
    { num: "3", name: "ANALYZE", desc: "Correlate logs &amp; metrics, identify root cause, blast radius", icon: "📈", bg: "#FFFBEB", stroke: "#FDE68A", fg: "#D97706" },
    { num: "4", name: "RESPOND", desc: "Execute runbook, contain, mitigate, communicate", icon: "⚡", bg: "#FAF5FF", stroke: "#E9D5FF", fg: "#7C3AED" },
    { num: "5", name: "RECOVER", desc: "Restore service, validate, monitor stability", icon: "🔄", bg: "#EFF6FF", stroke: "#BFDBFE", fg: "#1E40AF" },
    { num: "6", name: "LEARN", desc: "Post-incident review, RCA, action items, update runbooks", icon: "🧠", bg: "#F0FDF4", stroke: "#BBF7D0", fg: "#166534" }
  ];

  e2eSteps.forEach((es, idx) => {
    const esx = 188 + idx * 148;
    cell(`es_box_${idx}`, "", esx, 98, 142, 94, `rounded=1;arcSize=4;fillColor=${es.bg};strokeColor=${es.stroke};strokeWidth=1.2;`);
    cell(`es_hdr_${idx}`, `<div style="font-size:8px;font-weight:900;color:${es.fg};text-align:center;">${es.num}. ${es.name}</div>`, esx, 100, 142, 14, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
    cell(`es_desc_${idx}`, `<div style="font-size:7.5px;color:#0F172A;line-height:1.2;padding:2px 4px;">${es.desc}</div>`, esx, 116, 142, 74, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

    if (idx > 0) {
      edge(`e_es_${idx}`, `es_box_${idx - 1}`, `es_box_${idx}`, "strokeColor=#0F172A;strokeWidth=1.2;endArrow=classic;endSize=3;");
    }
  });

  // ==================== 4. CENTER: 6 FAILURE SCENARIOS & EXCEPTION FLOWS (x=180..1090, y=208..588, w=910, h=380) ====================
  cell("box_scenarios_sec", "", 180, 208, 910, 380, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;");
  cell("lbl_scenarios_sec", "COMMON FAILURE SCENARIOS &amp; EXCEPTION FLOW EXAMPLES", 180, 210, 910, 14, "text;html=1;strokeColor=none;fillColor=none;fontColor=#1E40AF;fontSize=8;fontStyle=1;align=center;verticalAlign=middle;");

  const scenCols = [
    {
      title: "A. API TIMEOUT /<br/>SERVICE UNAVAILABLE",
      steps: [
        { t: "Request Timeout /<br/>5xx Error", icon: "🌐", bg: "#EFF6FF", fg: "#1E40AF" },
        { t: "Retry with<br/>Exponential Backoff", icon: "🔄", bg: "#FFFFFF", fg: "#0F172A" },
        { t: "Still Failing?", diamond: true },
        { t: "Failover to<br/>Healthy Instance", icon: "🛡️", bg: "#F0FDF4", fg: "#166534" },
        { t: "Notify &amp; Create<br/>Incident (P1/P2)", icon: "🚨", bg: "#FEF2F2", fg: "#DC2626" }
      ]
    },
    {
      title: "B. DATA QUALITY<br/>EXCEPTION",
      steps: [
        { t: "Data Validation<br/>Failed", icon: "📑", bg: "#EFF6FF", fg: "#1E40AF" },
        { t: "Quarantine<br/>Bad Records", icon: "🔒", bg: "#FFFFFF", fg: "#0F172A" },
        { t: "Route to Data<br/>Steward (Queue)", icon: "👥", bg: "#FAF5FF", fg: "#7C3AED" },
        { t: "Use Last Known<br/>Good Data", icon: "🗄️", bg: "#F0FDF4", fg: "#166534" },
        { t: "Alert &amp; Track in<br/>DQ Dashboard", icon: "📊", bg: "#FFFBEB", fg: "#D97706" }
      ]
    },
    {
      title: "C. MODEL GENERATION<br/>FAILURE",
      steps: [
        { t: "Model Error /<br/>Hallucination Risk", icon: "🧠", bg: "#FFFBEB", fg: "#D97706" },
        { t: "Re-ask with<br/>Guardrails / Tooling", icon: "⚙️", bg: "#FFFFFF", fg: "#0F172A" },
        { t: "Still Failing?", diamond: true },
        { t: "Fallback Model<br/>(Alternate LLM)", icon: "🤖", bg: "#EFF6FF", fg: "#1E40AF" },
        { t: "Escalate to Human<br/>Review (HITL)", icon: "👤", bg: "#FAF5FF", fg: "#7C3AED" }
      ]
    },
    {
      title: "D. EXTERNAL API<br/>RATE LIMIT / ERROR",
      steps: [
        { t: "Rate Limit / 429<br/>or 5xx", icon: "⏱️", bg: "#EFF6FF", fg: "#1E40AF" },
        { t: "Respect Retry-After<br/>Header", icon: "🕒", bg: "#FFFFFF", fg: "#0F172A" },
        { t: "Retry with<br/>Jitter", icon: "🔀", bg: "#FFFFFF", fg: "#0F172A" },
        { t: "Circuit Breaker<br/>Open", icon: "🔌", bg: "#FEF2F2", fg: "#DC2626" },
        { t: "Degrade Gracefully<br/>(Cache / Queue)", icon: "🗄️", bg: "#F0FDF4", fg: "#166534" }
      ]
    },
    {
      title: "E. INFRASTRUCTURE<br/>RESOURCE EXHAUSTION",
      steps: [
        { t: "High CPU / Memory /<br/>Disk / Connections", icon: "☁️", bg: "#FEF2F2", fg: "#DC2626" },
        { t: "Auto-Scale /<br/>Scale-Up", icon: "⚡", bg: "#FFFFFF", fg: "#0F172A" },
        { t: "Throttle / Shed<br/>Non-critical Load", icon: "⚙️", bg: "#FFFBEB", fg: "#D97706" },
        { t: "Failover / Move<br/>Traffic", icon: "🔄", bg: "#EFF6FF", fg: "#1E40AF" },
        { t: "Page On-call", icon: "🔔", bg: "#FEF2F2", fg: "#DC2626" }
      ]
    },
    {
      title: "F. AUTH / PERMISSION<br/>FAILURE",
      steps: [
        { t: "Auth Failed /<br/>Token Expired", icon: "🔒", bg: "#EFF6FF", fg: "#1E40AF" },
        { t: "Refresh Token /<br/>Re-authenticate", icon: "🔑", bg: "#FFFFFF", fg: "#0F172A" },
        { t: "Still Failing?", diamond: true },
        { t: "Deny Access &amp; Log<br/>Security Event", icon: "🛡️", bg: "#FEF2F2", fg: "#DC2626" },
        { t: "Notify User &amp; SecOps", icon: "👤", bg: "#FAF5FF", fg: "#7C3AED" }
      ]
    }
  ];

  scenCols.forEach((sc, colIdx) => {
    const scx = 188 + colIdx * 148;
    cell(`sc_hdr_${colIdx}`, `<div style="font-size:8px;font-weight:900;color:#1E40AF;text-align:center;line-height:1.1;">${sc.title}</div>`, scx, 226, 142, 24, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

    sc.steps.forEach((st, stIdx) => {
      const sty = 254 + stIdx * 64;
      if (st.diamond) {
        cell(`st_${colIdx}_${stIdx}`, `<div style="font-size:7.5px;font-weight:800;color:#0F172A;text-align:center;">${st.t}</div>`, scx + 30, sty, 82, 48, "rhombus;fillColor=#FFFBEB;strokeColor=#FDE68A;html=1;align=center;verticalAlign=middle;");
      } else {
        cell(`st_${colIdx}_${stIdx}`, `<div style="display:flex;align-items:center;justify-content:center;gap:3px;"><span style="font-size:10px;">${st.icon}</span><span style="font-size:7.5px;font-weight:800;color:${st.fg};text-align:center;line-height:1.1;">${st.t}</span></div>`, scx + 4, sty, 134, 48, `rounded=1;arcSize=4;fillColor=${st.bg};strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;`);
      }

      if (stIdx > 0) {
        edge(`e_sc_${colIdx}_${stIdx}`, `st_${colIdx}_${stIdx - 1}`, `st_${colIdx}_${stIdx}`, "strokeColor=#0F172A;strokeWidth=1.2;endArrow=classic;endSize=3;");
      }
    });
  });

  // ==================== 5. RIGHT SIDEBAR (x=1100..1520, y=78..588, w=420) ====================
  // 1. Exception Categories (Table) (y=78..234, h=156)
  cell("box_r_cat", "", 1100, 78, 420, 156, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.2;");
  cell("lbl_r_cat", "EXCEPTION CATEGORIES", 1100, 80, 420, 14, "text;html=1;strokeColor=none;fillColor=none;fontColor=#7C3AED;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;");

  // Headers
  cell("ch_cat", "CATEGORY", 1104, 96, 76, 14, "fillColor=#FAF5FF;fontColor=#7C3AED;fontSize=8;fontStyle=1;strokeColor=#E9D5FF;align=center;verticalAlign=middle;");
  cell("ch_desc", "DESCRIPTION", 1182, 96, 114, 14, "fillColor=#FAF5FF;fontColor=#7C3AED;fontSize=8;fontStyle=1;strokeColor=#E9D5FF;align=center;verticalAlign=middle;");
  cell("ch_ex", "EXAMPLES", 1298, 96, 218, 14, "fillColor=#FAF5FF;fontColor=#7C3AED;fontSize=8;fontStyle=1;strokeColor=#E9D5FF;align=center;verticalAlign=middle;");

  const excCats = [
    { cat: "Transient", bg: "#1D4ED8", desc: "Temporary, self-resolving", ex: "Timeouts, 5xx, Network blips" },
    { cat: "Persistent", bg: "#DC2626", desc: "Requires intervention", ex: "Code bug, DB down" },
    { cat: "Data Quality", bg: "#16A34A", desc: "Invalid / inconsistent data", ex: "Missing fields, outliers" },
    { cat: "Security", bg: "#7C3AED", desc: "AuthZ/AuthN failures", ex: "Token expired, access denied" },
    { cat: "Ext Dependency", bg: "#0284C7", desc: "Third-party / external issues", ex: "API down, Rate limit" },
    { cat: "Capacity", bg: "#EA580C", desc: "Resource limits reached", ex: "CPU, Memory, Storage" }
  ];

  excCats.forEach((ec, idx) => {
    const ecy = 112 + idx * 19;
    cell(`ec_c_${idx}`, ec.cat, 1104, ecy, 76, 17, `shape=rectangle;rounded=1;arcSize=4;fillColor=${ec.bg};fontColor=#FFFFFF;fontSize=8px;fontStyle=1;align=center;verticalAlign=middle;`);
    cell(`ec_d_${idx}`, `<div style="font-size:7.5px;line-height:1.1;color:#0F172A;padding:1px 3px;">${ec.desc}</div>`, 1182, ecy, 114, 17, "html=1;strokeColor=#CBD5E1;fillColor=#FFFFFF;align=left;verticalAlign=middle;");
    cell(`ec_e_${idx}`, `<div style="font-size:7.5px;line-height:1.1;color:#0F172A;padding:1px 3px;">${ec.ex}</div>`, 1298, ecy, 218, 17, "html=1;strokeColor=#CBD5E1;fillColor=#FFFFFF;align=left;verticalAlign=middle;");
  });

  // 2. Response Patterns (y=238..330, h=92)
  cell("box_r_patt", "", 1100, 238, 420, 92, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;");
  cell("lbl_r_patt", "RESPONSE PATTERNS (TOOLS &amp; TECHNIQUES)", 1100, 240, 420, 14, "text;html=1;strokeColor=none;fillColor=none;fontColor=#1E40AF;fontSize=7;fontStyle=1;align=center;verticalAlign=middle;");
  const rPattHtml = `<div style="font-size:7.5px;line-height:1.3;color:#0F172A;display:grid;grid-template-columns:1fr 1fr;gap:2px 12px;padding:2px 8px;">
    <div>🔄 <b>Retry</b> (Backoff + Jitter)</div>
    <div>🛡️ <b>Fallback / Degradation</b></div>
    <div>⚡ <b>Circuit Breaker</b> (Open/Closed)</div>
    <div>📨 <b>Queue &amp; Async Processing</b></div>
    <div>⏱️ <b>Timeouts &amp; Deadlines</b></div>
    <div>👤 <b>Human-in-the-Loop</b></div>
    <div>🔑 <b>Idempotency &amp; Safe Retries</b></div>
    <div>🧱 <b>Bulkhead Isolation</b></div>
  </div>`;
  cell("txt_r_patt", rPattHtml, 1102, 256, 416, 72, "html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  // 3. Key Artifacts (y=334..424, h=90)
  cell("box_r_art", "", 1100, 334, 420, 90, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;");
  cell("lbl_r_art", "KEY ARTIFACTS", 1100, 336, 420, 14, "text;html=1;strokeColor=none;fillColor=none;fontColor=#166534;fontSize=7;fontStyle=1;align=center;verticalAlign=middle;");
  const rArtHtml = `<div style="font-size:7.5px;line-height:1.3;color:#0F172A;display:grid;grid-template-columns:1fr 1fr;gap:2px 12px;padding:2px 8px;">
    <div>📑 <b>Runbooks</b> (Per Scenario)</div>
    <div>🔔 <b>Alerts &amp; Notifications</b></div>
    <div>🎫 <b>Incident Tickets</b> (P1..P3)</div>
    <div>📜 <b>Post-Incident Reports</b> (PIR)</div>
    <div>📊 <b>Dashboards</b> (SLOs, SLIs)</div>
    <div>🔄 <b>Change / Action Items</b></div>
  </div>`;
  cell("txt_r_art", rArtHtml, 1102, 352, 416, 70, "html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  // 4. Severity Matrix (Impact vs Urgency Heatmap) (y=428..588, h=160)
  cell("box_r_sev", "", 1100, 428, 420, 160, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#DC2626;strokeWidth=1.2;");
  cell("lbl_r_sev", "SEVERITY MATRIX (IMPACT vs URGENCY)", 1100, 430, 420, 14, "text;html=1;strokeColor=none;fillColor=none;fontColor=#DC2626;fontSize=7;fontStyle=1;align=center;verticalAlign=middle;");

  // Matrix Heatmap Table
  const sevMatrix = [
    { imp: "Critical", l: "P2", m: "P1", h: "P1", c: "P1" },
    { imp: "High", l: "P3", m: "P2", h: "P1", c: "P1" },
    { imp: "Medium", l: "P4", m: "P3", h: "P2", h2: "P1" },
    { imp: "Low", l: "P4", m: "P4", h: "P3", c: "P2" }
  ];

  // Header Row
  cell("sm_h_urg", "URGENCY ➔", 1106, 448, 70, 18, "fillColor=#F8FAFC;fontColor=#64748B;fontSize=8;fontStyle=1;strokeColor=#CBD5E1;align=center;verticalAlign=middle;");
  cell("sm_h_l", "Low", 1178, 448, 80, 18, "fillColor=#EFF6FF;fontColor=#1E40AF;fontSize=8;fontStyle=1;strokeColor=#CBD5E1;align=center;verticalAlign=middle;");
  cell("sm_h_m", "Medium", 1260, 448, 80, 18, "fillColor=#EFF6FF;fontColor=#1E40AF;fontSize=8;fontStyle=1;strokeColor=#CBD5E1;align=center;verticalAlign=middle;");
  cell("sm_h_h", "High", 1342, 448, 80, 18, "fillColor=#EFF6FF;fontColor=#1E40AF;fontSize=8;fontStyle=1;strokeColor=#CBD5E1;align=center;verticalAlign=middle;");
  cell("sm_h_c", "Critical", 1424, 448, 88, 18, "fillColor=#EFF6FF;fontColor=#1E40AF;fontSize=8;fontStyle=1;strokeColor=#CBD5E1;align=center;verticalAlign=middle;");

  sevMatrix.forEach((sm, idx) => {
    const smy = 468 + idx * 28;
    cell(`sm_r_${idx}`, sm.imp, 1106, smy, 70, 26, "fillColor=#F8FAFC;fontColor=#0F172A;fontSize=8;fontStyle=1;strokeColor=#CBD5E1;align=center;verticalAlign=middle;");
    cell(`sm_l_${idx}`, sm.l, 1178, smy, 80, 26, "fillColor=#DCFCE7;fontColor=#166534;fontSize=8.5;fontStyle=1;strokeColor=#CBD5E1;align=center;verticalAlign=middle;");
    cell(`sm_m_${idx}`, sm.m, 1260, smy, 80, 26, "fillColor=#FEF08A;fontColor=#854D0E;fontSize=8.5;fontStyle=1;strokeColor=#CBD5E1;align=center;verticalAlign=middle;");
    cell(`sm_h_${idx}`, sm.h, 1342, smy, 80, 26, "fillColor=#FED7AA;fontColor=#9A3412;fontSize=8.5;fontStyle=1;strokeColor=#CBD5E1;align=center;verticalAlign=middle;");
    cell(`sm_c_${idx}`, sm.c ?? sm.h2, 1424, smy, 88, 26, "fillColor=#FECACA;fontColor=#991B1B;fontSize=8.5;fontStyle=1;strokeColor=#CBD5E1;align=center;verticalAlign=middle;");
  });

  // ==================== 6. BOTTOM ROW: MONITORING, ESCALATION, RECOVERY, PIR, NOTES (y=598..954, h=356) ====================
  // 1. Monitoring & Detection (w=320)
  cell("box_b_mon", "", 16, 598, 320, 356, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;");
  cell("lbl_b_mon", "MONITORING &amp; DETECTION", 16, 600, 320, 20, "shape=rectangle;rounded=1;arcSize=8;fillColor=#EFF6FF;strokeColor=#CBD5E1;fontColor=#1E40AF;fontSize=8;fontStyle=1;align=center;verticalAlign=middle;");

  const monTools = [
    { t: "Cloud Monitoring<br/>(Metrics, Logs)", icon: "📈" },
    { t: "Distributed<br/>Tracing (Cloud Trace)", icon: "🔍" },
    { t: "Uptime<br/>Checks (Health Probes)", icon: "🛡️" },
    { t: "Log Analytics<br/>(BigQuery / Looker)", icon: "📊" },
    { t: "User Feedback<br/>(In-App / Support)", icon: "👤" }
  ];
  monTools.forEach((mt, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const mx = 26 + col * 150;
    const my = 630 + row * 78;
    cell(`mt_${idx}`, `<div style="font-size:14px;text-align:center;">${mt.icon}</div><div style="font-size:7.5px;font-weight:800;color:#0F172A;text-align:center;line-height:1.1;margin-top:2px;">${mt.t}</div>`, mx, my, 140, 68, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  cell("bar_mon_sigs", "<b>Key Signals:</b> Error Rate, Latency, Saturation, Availability, Anomalies", 26, 912, 300, 30, "rounded=1;arcSize=4;fillColor=#EFF6FF;strokeColor=#BFDBFE;fontColor=#1E40AF;fontSize=8;html=1;align=center;verticalAlign=middle;");

  // 2. Escalation Paths (w=340, x=344)
  cell("box_b_escl", "", 344, 598, 340, 356, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.5;");
  cell("lbl_b_escl", "ESCALATION PATHS", 344, 600, 340, 20, "shape=rectangle;rounded=1;arcSize=8;fillColor=#FAF5FF;strokeColor=#CBD5E1;fontColor=#7C3AED;fontSize=8;fontStyle=1;align=center;verticalAlign=middle;");

  const esclNodes = [
    { t: "Alert", icon: "🔔" },
    { t: "On-call Eng<br/>(Level 1)", icon: "👤" },
    { t: "Service Owner<br/>(Level 2)", icon: "👥" },
    { t: "Eng Lead<br/>(Level 3)", icon: "🏛️" },
    { t: "Incident<br/>Commander", icon: "👑" }
  ];
  esclNodes.forEach((en, idx) => {
    const enx = 352 + idx * 64;
    cell(`en_${idx}`, `<div style="font-size:14px;text-align:center;">${en.icon}</div><div style="font-size:7.5px;font-weight:800;color:#0F172A;text-align:center;line-height:1.1;margin-top:2px;">${en.t}</div>`, enx, 630, 58, 78, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");
    if (idx > 0) {
      edge(`e_en_${idx}`, `en_${idx - 1}`, `en_${idx}`, "strokeColor=#7C3AED;strokeWidth=1.2;endArrow=classic;endSize=3;");
    }
  });

  const esclDetailHtml = `<div style="font-size:8px;line-height:1.45;color:#0F172A;padding:4px 8px;margin-top:90px;">
    <b>Escalation Timeouts:</b> L1 (5m) ➔ L2 (15m) ➔ L3 (30m) ➔ IC (30m)<br/>
    <b>Channels:</b> PagerDuty • Slack • Email • Phone • War Room
  </div>`;
  cell("txt_b_escl_dtl", esclDetailHtml, 346, 718, 336, 230, "html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  // 3. Recovery & Validation (w=270, x=692)
  cell("box_b_recov", "", 692, 598, 270, 356, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;");
  cell("lbl_b_recov", "RECOVERY &amp; VALIDATION", 692, 600, 270, 20, "shape=rectangle;rounded=1;arcSize=8;fillColor=#F0FDF4;strokeColor=#CBD5E1;fontColor=#16A34A;fontSize=8;fontStyle=1;align=center;verticalAlign=middle;");
  const recovHtml = `<div style="font-size:8px;line-height:1.55;color:#0F172A;padding:6px 8px;">
    ✔ <b>Restore Service / Failover Complete</b><br/><br/>
    ✔ <b>Validate Functionality (Smoke Tests)</b><br/><br/>
    ✔ <b>Check SLOs &amp; Error Rates Stabilize</b><br/><br/>
    ✔ <b>Communicate Resolution</b><br/><br/>
    ✔ <b>Monitor Closely (Watch Window)</b>
  </div>`;
  cell("txt_b_recov", recovHtml, 694, 624, 266, 260, "html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=2;");

  cell("btn_recov", "✔ Declare Resolved ➔ PIR Scheduled", 702, 894, 250, 36, "rounded=1;arcSize=6;fillColor=#F0FDF4;strokeColor=#16A34A;fontColor=#166534;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");

  // 4. Post-Incident Activities (w=260, x=970)
  cell("box_b_pir", "", 970, 598, 260, 356, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;");
  cell("lbl_b_pir", "POST-INCIDENT ACTIVITIES", 970, 600, 260, 20, "shape=rectangle;rounded=1;arcSize=8;fillColor=#EFF6FF;strokeColor=#CBD5E1;fontColor=#1E40AF;fontSize=8;fontStyle=1;align=center;verticalAlign=middle;");
  const pirHtml = `<div style="font-size:8px;line-height:1.55;color:#0F172A;padding:6px 8px;">
    📑 <b>Root Cause Analysis (RCA)</b><br/><br/>
    📜 <b>Blameless Post-Incident Review</b><br/><br/>
    👥 <b>Action Items &amp; Owners</b><br/><br/>
    ⚙️ <b>Update Runbooks / Alerts</b><br/><br/>
    🧠 <b>Knowledge Base Update</b>
  </div>`;
  cell("txt_b_pir", pirHtml, 972, 624, 256, 260, "html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=2;");

  cell("btn_pir", "Track to Closure &amp; Validate", 980, 894, 240, 36, "rounded=1;arcSize=6;fillColor=#EFF6FF;strokeColor=#2563EB;fontColor=#1E40AF;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");

  // 5. Notes & Legend (w=280, x=1238)
  cell("box_b_notes", "", 1238, 598, 282, 356, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;");
  cell("lbl_b_notes", "NOTES &amp; RESILIENCE", 1238, 600, 282, 20, "shape=rectangle;rounded=1;arcSize=8;fillColor=#F8FAFC;strokeColor=#CBD5E1;fontColor=#1E3A8A;fontSize=8;fontStyle=1;align=center;verticalAlign=middle;");
  const notesFailHtml = `<div style="font-size:8px;line-height:1.5;color:#0F172A;padding:6px 10px;">
    • <b>Failure Anticipation:</b> All failures are expected. Fast recovery is the goal.<br/><br/>
    • <b>Automation:</b> Automate detection and response where safe.<br/><br/>
    • <b>AI Safeguards:</b> Guardrails + HITL for AI / model failures.<br/><br/>
    • <b>Observability:</b> Design for observability, resiliency and graceful degradation.<br/><br/>
    • <b>Continuous Learning:</b> Continuously improve via learning loops.
  </div>`;
  cell("txt_b_notes", notesFailHtml, 1240, 624, 278, 324, "html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=4;");

  // ==================== 7. FOOTER LEGEND (y=962, h=24) ====================
  const legendHtml = `<div style='font-size:8px;color:#64748B;display:flex;justify-content:space-between;align-items:center;'>
    <div><b>LEGEND:</b> &nbsp; ━━━━► Primary Flow &nbsp;|&nbsp; ┈┈┈► Feedback Loop &nbsp;|&nbsp; ───► Optional Flow &nbsp;|&nbsp; 🟦 Process &nbsp;|&nbsp; 🟨 Decision &nbsp;|&nbsp; 👤 Human Action</div>
    <div>Incident &amp; Failure Resilience Architecture &nbsp;|&nbsp; May 8, 2025</div>
  </div>`;
  cell("footer_legend", legendHtml, 16, 962, 1504, 24, "rounded=1;arcSize=8;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=left;verticalAlign=middle;padding=4;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_28_failure_exception_flow" name="Template 28: Failure / Exception Flow Architecture">
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
