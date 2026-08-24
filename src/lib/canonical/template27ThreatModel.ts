/**
 * Master 1:1 High-Craft Exact Ground-Truth Replica for Template 27: Threat Model Architecture
 * Matches 100% of images/27.png:
 * - High-Contrast, Ultra-Legible Typography (Zero microscopic text, Zero empty voids)
 * - 6 Trust Zones (Users, Edge, App, AI/Agent, Data, External) + Shared Security Services bar
 * - Attack Surface Map with 11 attack vectors and STRIDE Threat Pills (T1..T8)
 * - Right Sidebar: Complete STRIDE Table (T1..T8), Risk Ratings, Key Security Controls, Compliance & Standards
 * - Threat Scenarios & Mitigations Table (6 scenarios with Risk High / Medium badges, full technical mitigations)
 * - Bottom Row: Incident Response Flow (5 connected steps), Monitoring & Detection (4 cards), Risk Assessment Summary (Pie/Donut chart + percentages), Notes, Legend
 * - 1536x1024 master canvas resolution.
 */

const E = (v?: string | null) =>
  (v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export function generateTemplate27ThreatModelXml(
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
  cell("hdr_num", "27", 16, 12, 68, 54, "shape=rectangle;rounded=1;arcSize=14;fillColor=#6D28D9;strokeColor=#6D28D9;fontColor=#FFFFFF;fontSize=82;fontStyle=1;align=center;verticalAlign=middle;");
  
  cell(
    "hdr_title",
    `<div style='font-size:26px;font-weight:900;color:#0F172A;letter-spacing:0.5px;line-height:1.1;'>THREAT MODEL ARCHITECTURE</div>` +
    `<div style='font-size:13.5px;font-weight:800;color:#6D28D9;margin-top:3px;'>Use Case: NovaCura – AI-Powered Regulatory Intelligence Platform</div>` +
    `<div style='font-size:11px;color:#475569;font-weight:600;margin-top:3px;'>Environment: Production &nbsp;|&nbsp; Region: us-central1 &nbsp;|&nbsp; Last Updated: May 8, 2025</div>`,
    94,
    12,
    760,
    54,
    "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;"
  );

  const brandHtml = `<table style="width:100%;border-collapse:collapse;"><tr><td style="width:40px;vertical-align:middle;text-align:center;"><span style="font-size:36px;">🧬</span></td><td style="text-align:left;vertical-align:middle;padding-left:8px;"><div style="font-size:26px;font-weight:900;color:#0284C7;letter-spacing:1px;line-height:1;">NOVACURA</div><div style="font-size:11px;color:#64748B;font-weight:700;font-style:italic;margin-top:2px;">AI-Powered Regulatory Intelligence Platform</div></td></tr></table>`;
  cell("hdr_brand", brandHtml, 860, 12, 270, 54, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  const objHtml = `<div style='font-size:11px;font-weight:900;color:#1E3A8A;margin-bottom:3px;'>OBJECTIVE</div><div style='font-size:9.5px;line-height:1.4;color:#0F172A;font-weight:600;'>
    Identify, assess, and mitigate threats across NovaCura to protect data, ensure system resilience, maintain compliance, and preserve customer trust.
  </div>`;
  cell("hdr_obj", objHtml, 1140, 12, 380, 54, "rounded=1;arcSize=8;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.2;html=1;align=left;verticalAlign=middle;padding=6;");

  // ==================== 2. TOP CENTER: SYSTEM CONTEXT & TRUST ZONES (x=16..1090, y=78..260, w=1074) ====================
  cell("box_trust_zones", "", 16, 78, 1074, 184, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.8;");
  cell("lbl_trust_zones", "SYSTEM CONTEXT &amp; DATA FLOW (TRUST ZONES)", 16, 80, 1074, 16, "text;html=1;strokeColor=none;fillColor=none;fontColor=#1E40AF;fontSize=10.5;fontStyle=1;align=center;verticalAlign=middle;");

  const trustZones = [
    {
      num: "1", name: "USERS &amp; CLIENTS",
      items: ["Web App", "Mobile App", "APIs / Integrations", "Client Systems"],
      icon: "👥", bg: "#F0FDF4", stroke: "#BBF7D0", fg: "#166534"
    },
    {
      num: "2", name: "EDGE &amp; ACCESS",
      items: ["Cloud Armor (WAF)", "HTTPS / TLS", "Identity-Aware Proxy", "DDoS Protection"],
      icon: "🛡️", bg: "#EFF6FF", stroke: "#BFDBFE", fg: "#1E40AF"
    },
    {
      num: "3", name: "APPLICATION LAYER",
      items: ["Frontend (UI)", "API Gateway", "Auth Service", "Orchestration Service"],
      icon: "💻", bg: "#FAF5FF", stroke: "#E9D5FF", fg: "#7C3AED"
    },
    {
      num: "4", name: "AI &amp; AGENT LAYER",
      items: ["Agent Orchestrator", "LLM / Model Serving", "Vector Search Service", "Tool / Function Calls"],
      icon: "🧠", bg: "#EFF6FF", stroke: "#BFDBFE", fg: "#1E40AF"
    },
    {
      num: "5", name: "DATA &amp; STORAGE LAYER",
      items: ["Vector DB (AlloyDB / PG)", "Operational DB (Cloud SQL)", "Object Storage (GCS)", "Knowledge Store"],
      icon: "🗄️", bg: "#FFFBEB", stroke: "#FDE68A", fg: "#D97706"
    },
    {
      num: "6", name: "EXTERNAL SYSTEMS",
      items: ["Regulatory Sources", "Third-Party APIs", "Partner Systems", "External Tools"],
      icon: "🌐", bg: "#FEF2F2", stroke: "#FECACA", fg: "#DC2626"
    }
  ];

  trustZones.forEach((tz, idx) => {
    const tzx = 24 + idx * 176;
    cell(`tz_box_${idx}`, "", tzx, 98, 168, 114, `rounded=1;arcSize=4;fillColor=${tz.bg};strokeColor=${tz.stroke};strokeWidth=1.2;`);
    cell(`tz_hdr_${idx}`, `<div style="display:flex;align-items:center;justify-content:center;gap:4px;"><span style="font-size:14px;">${tz.icon}</span><span style="font-size:8.5px;font-weight:900;color:${tz.fg};">${tz.num}. ${tz.name}</span></div>`, tzx, 100, 168, 18, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

    const itemsHtml = tz.items.map(it => `<div style="margin-bottom:3px;">• <b>${it}</b></div>`).join("");
    cell(`tz_items_${idx}`, `<div style="font-size:8px;color:#0F172A;line-height:1.35;padding:2px 6px;">${itemsHtml}</div>`, tzx, 120, 168, 90, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

    if (idx > 0) {
      edge(`e_tz_${idx}`, `tz_box_${idx - 1}`, `tz_box_${idx}`, "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.2;dashed=1;endArrow=classic;endSize=4;exitX=1;exitY=0.5;entryX=0;entryY=0.5;");
    }
  });

  // Shared Security Services Bar (y=216..256, h=40)
  cell("box_shared_sec", "", 24, 216, 1056, 40, "rounded=1;arcSize=6;fillColor=#FAF5FF;strokeColor=#7C3AED;strokeWidth=1.2;");
  cell("lbl_shared_sec", "SHARED SECURITY SERVICES (ACROSS ALL ZONES)", 24, 218, 1056, 12, "text;html=1;strokeColor=none;fillColor=none;fontColor=#7C3AED;fontSize=8;fontStyle=1;align=center;verticalAlign=middle;");

  const sharedSecItems = [
    { t: "IAM &amp; Access<br/>Management", icon: "🔒" },
    { t: "Secrets Manager", icon: "🔑" },
    { t: "KMS / Encryption", icon: "🛡️" },
    { t: "VPC Service<br/>Controls", icon: "🌐" },
    { t: "Audit Logging", icon: "📜" },
    { t: "Security Command<br/>Center", icon: "🛡️" },
    { t: "Monitoring &amp;<br/>Alerting", icon: "📈" }
  ];
  sharedSecItems.forEach((ss, idx) => {
    const ssx = 30 + idx * 148;
    cell(`ss_${idx}`, `<div style="display:flex;align-items:center;gap:4px;"><span style="font-size:13px;">${ss.icon}</span><span style="font-size:7.5px;font-weight:800;color:#0F172A;line-height:1.15;">${ss.t}</span></div>`, ssx, 230, 142, 22, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=left;verticalAlign=middle;padding=3;");
  });

  // ==================== 3. ATTACK SURFACE MAP (x=16..1090, y=268..342, h=74) ====================
  cell("box_attack_surf", "", 16, 268, 1074, 74, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#DC2626;strokeWidth=1.2;");
  cell("lbl_attack_surf", "ATTACK SURFACE MAP", 16, 270, 1074, 12, "text;html=1;strokeColor=none;fillColor=none;fontColor=#DC2626;fontSize=9;fontStyle=1;align=center;verticalAlign=middle;");

  const attackSurfaces = [
    { t: "Public Endpoints<br/>(Internet)", tags: ["T1", "T5", "T2"], icon: "🌐" },
    { t: "Auth &amp; Identity<br/>(IAM, OAuth)", tags: ["T1", "T6"], icon: "👤" },
    { t: "APIs &amp; Gateways", tags: ["T1", "T2", "T5"], icon: "💻" },
    { t: "Web / UI", tags: ["T2", "T5"], icon: "🖥️" },
    { t: "Agent Orchestrator<br/>&amp; Tools", tags: ["T2", "T7", "T6"], icon: "🤖" },
    { t: "LLM / Model<br/>Serving", tags: ["T2", "T7", "T3"], icon: "🧠" },
    { t: "Data Stores<br/>(DB, Vector DB)", tags: ["T2", "T4", "T6"], icon: "🗄️" },
    { t: "Object Storage<br/>(GCS)", tags: ["T4", "T2", "T5"], icon: "📦" },
    { t: "External APIs &amp;<br/>Data Sources", tags: ["T1", "T8", "T2"], icon: "🔗" },
    { t: "CI/CD &amp; DevOps<br/>Pipelines", tags: ["T8", "T6", "T5"], icon: "⚙️" },
    { t: "Admin &amp; Ops<br/>Interfaces", tags: ["T1", "T6"], icon: "👤" }
  ];

  attackSurfaces.forEach((as, idx) => {
    const asx = 22 + idx * 96;
    const pillsHtml = as.tags.map(tg => `<span style="background:#1E3A8A;color:#FFFFFF;padding:1px 4px;border-radius:4px;font-size:7px;font-weight:900;margin-right:2px;">${tg}</span>`).join("");
    cell(`as_${idx}`, `<div style="text-align:center;"><span style="font-size:15px;">${as.icon}</span><div style="font-size:7px;font-weight:800;color:#0F172A;line-height:1.15;margin-top:2px;">${as.t}</div><div style="margin-top:3px;">${pillsHtml}</div></div>`, asx, 284, 92, 54, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // ==================== 4. THREAT SCENARIOS & MITIGATIONS TABLE (x=16..1090, y=348..588, h=240) ====================
  cell("box_scenarios", "", 16, 348, 1074, 240, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;");
  cell("lbl_scenarios", "THREAT SCENARIOS &amp; MITIGATIONS (EXAMPLES)", 16, 350, 1074, 14, "text;html=1;strokeColor=none;fillColor=none;fontColor=#1E40AF;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;");

  // Headers
  cell("th_scen", "THREAT SCENARIO", 20, 366, 120, 16, "fillColor=#EFF6FF;fontColor=#1E40AF;fontSize=8;fontStyle=1;strokeColor=#BFDBFE;align=center;verticalAlign=middle;");
  cell("th_desc", "DESCRIPTION", 142, 366, 170, 16, "fillColor=#EFF6FF;fontColor=#1E40AF;fontSize=8;fontStyle=1;strokeColor=#BFDBFE;align=center;verticalAlign=middle;");
  cell("th_imp", "POTENTIAL IMPACT", 314, 366, 160, 16, "fillColor=#EFF6FF;fontColor=#1E40AF;fontSize=8;fontStyle=1;strokeColor=#BFDBFE;align=center;verticalAlign=middle;");
  cell("th_mit", "MITIGATIONS / CONTROLS", 476, 366, 290, 16, "fillColor=#EFF6FF;fontColor=#1E40AF;fontSize=8;fontStyle=1;strokeColor=#BFDBFE;align=center;verticalAlign=middle;");
  cell("th_det", "DETECTION &amp; RESPONSE", 768, 366, 316, 16, "fillColor=#EFF6FF;fontColor=#1E40AF;fontSize=8;fontStyle=1;strokeColor=#BFDBFE;align=center;verticalAlign=middle;");

  const scenRows = [
    {
      name: "Prompt Injection", bg: "#6D28D9",
      desc: "Attacker crafts input to override instructions and exfiltrate data.",
      impact: "Data leakage, harmful responses", risk: "⚠️ High", rfg: "#DC2626",
      mit: "• Input validation &amp; content filtering<br/>• System prompts &amp; guardrails<br/>• Least data exposure, RAG with scoped context",
      det: "• Prompt anomaly detection<br/>• Output monitoring &amp; alerting<br/>• Human review for high-risk outputs"
    },
    {
      name: "Data Leakage via Over-Privileged Access", bg: "#1D4ED8",
      desc: "Excessive permissions allow unauthorized data access.",
      impact: "PII/PHI exposure, compliance breach", risk: "⚠️ High", rfg: "#DC2626",
      mit: "• Least privilege IAM<br/>• Row/Column level security<br/>• VPC Service Controls, Restricted sharing",
      det: "• Access logs &amp; anomaly detection<br/>• SCC findings &amp; alerts<br/>• Automated containment"
    },
    {
      name: "Model / Data Poisoning", bg: "#16A34A",
      desc: "Malicious data introduced to corrupt training or retrieval data.",
      impact: "Incorrect / biased answers, reputational damage", risk: "⚠️ High", rfg: "#DC2626",
      mit: "• Data provenance &amp; validation<br/>• Trusted data pipelines<br/>• Regular data quality checks",
      det: "• Data drift &amp; quality monitoring<br/>• Anomaly detection in embeddings<br/>• Rollback &amp; quarantine"
    },
    {
      name: "DDoS / Service Exhaustion", bg: "#EA580C",
      desc: "Attackers overwhelm services with traffic or heavy requests.",
      impact: "Service disruption, SLA impact", risk: "⚠️ Medium", rfg: "#D97706",
      mit: "• Cloud Armor, DDoS protection<br/>• Rate limiting, quotas, autoscaling<br/>• Caching &amp; request throttling",
      det: "• Traffic anomaly detection<br/>• Auto-scaling &amp; load shedding<br/>• Incident response runbooks"
    },
    {
      name: "Privilege Escalation", bg: "#DC2626",
      desc: "Attacker gains higher privileges through misconfig or exploits.",
      impact: "Full system access, data compromise", risk: "⚠️ High", rfg: "#DC2626",
      mit: "• Strong IAM policies &amp; SoD<br/>• Regular access reviews<br/>• Hardened configs, patch management",
      det: "• IAM change monitoring<br/>• Privilege escalation alerts<br/>• Immediate revocation &amp; forensics"
    },
    {
      name: "Third-Party / Supply Chain Risk", bg: "#0F766E",
      desc: "Vulnerable third-party or dependencies cause breach.",
      impact: "Data / service impact, trust erosion", risk: "⚠️ Medium", rfg: "#D97706",
      mit: "• Vendor risk assessment<br/>• Dependency scanning (SCA)<br/>• Contractual &amp; security requirements",
      det: "• Vulnerability scanning &amp; alerts<br/>• External dependency monitoring<br/>• Incident communication plan"
    }
  ];

  scenRows.forEach((sr, idx) => {
    const sry = 384 + idx * 33;
    cell(`sr_n_${idx}`, sr.name, 20, sry, 120, 31, `shape=rectangle;rounded=1;arcSize=4;fillColor=${sr.bg};fontColor=#FFFFFF;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;`);
    cell(`sr_d_${idx}`, `<div style="font-size:7.5px;line-height:1.25;color:#0F172A;font-weight:600;padding:2px;">${sr.desc}</div>`, 142, sry, 170, 31, "html=1;strokeColor=#E2E8F0;fillColor=#FFFFFF;align=left;verticalAlign=middle;");
    cell(`sr_i_${idx}`, `<div style="font-size:7.5px;line-height:1.2;color:#0F172A;padding:2px;"><b>${sr.impact}</b><br/><span style="color:${sr.rfg};font-weight:900;font-size:8px;">${sr.risk}</span></div>`, 314, sry, 160, 31, "html=1;strokeColor=#E2E8F0;fillColor=#FFFFFF;align=left;verticalAlign=middle;");
    cell(`sr_m_${idx}`, `<div style="font-size:7px;line-height:1.2;color:#0F172A;font-weight:600;padding:2px;">${sr.mit}</div>`, 476, sry, 290, 31, "html=1;strokeColor=#E2E8F0;fillColor=#FFFFFF;align=left;verticalAlign=middle;");
    cell(`sr_dt_${idx}`, `<div style="font-size:7px;line-height:1.2;color:#0F172A;font-weight:600;padding:2px;">${sr.det}</div>`, 768, sry, 316, 31, "html=1;strokeColor=#E2E8F0;fillColor=#FFFFFF;align=left;verticalAlign=middle;");
  });

  // ==================== 5. RIGHT SIDEBAR (x=1100..1520, y=78..588, w=420) ====================
  // 1. Threat Catalog (STRIDE Table) (y=78..300, h=222)
  cell("box_stride_cat", "", 1100, 78, 420, 222, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.2;");
  cell("lbl_stride_cat", "THREAT CATALOG (STRIDE)", 1100, 80, 420, 14, "text;html=1;strokeColor=none;fillColor=none;fontColor=#7C3AED;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;");

  // STRIDE Table Header
  cell("sth_id", "ID", 1104, 96, 26, 14, "fillColor=#FAF5FF;fontColor=#7C3AED;fontSize=7.5;fontStyle=1;strokeColor=#E9D5FF;align=center;verticalAlign=middle;");
  cell("sth_str", "STRIDE", 1132, 96, 68, 14, "fillColor=#FAF5FF;fontColor=#7C3AED;fontSize=7.5;fontStyle=1;strokeColor=#E9D5FF;align=center;verticalAlign=middle;");
  cell("sth_ex", "THREAT EXAMPLES", 1202, 96, 250, 14, "fillColor=#FAF5FF;fontColor=#7C3AED;fontSize=7.5;fontStyle=1;strokeColor=#E9D5FF;align=center;verticalAlign=middle;");
  cell("sth_aff", "AFFECTED", 1454, 96, 62, 14, "fillColor=#FAF5FF;fontColor=#7C3AED;fontSize=7.5;fontStyle=1;strokeColor=#E9D5FF;align=center;verticalAlign=middle;");

  const strideItems = [
    { id: "T1", s: "Spoofing", ex: "Credential theft, account takeover, API key abuse", aff: "1, 2, 3, 4" },
    { id: "T2", s: "Tampering", ex: "Data modification, prompt injection, model / data poisoning", aff: "3, 4, 5, 6" },
    { id: "T3", s: "Repudiation", ex: "Insufficient logging, user actions denied", aff: "1, 2, 3, 4, 5" },
    { id: "T4", s: "Info Disclosure", ex: "Data leakage, over-privileged access, misconfigured storage", aff: "2, 3, 4, 5, 6" },
    { id: "T5", s: "Denial of Service", ex: "DDoS attacks, resource exhaustion, rate limit abuse", aff: "1, 2, 3, 4" },
    { id: "T6", s: "Elevation of Priv", ex: "Privilege escalation, misconfig in IAM / policies", aff: "2, 3, 4, 5" },
    { id: "T7", s: "AI-specific", ex: "LLM hallucination, harmful output, data exfil via model responses", aff: "4, 6" },
    { id: "T8", s: "Supply Chain", ex: "Compromised dependencies, third-party service risk", aff: "3, 4, 6" }
  ];

  strideItems.forEach((st, idx) => {
    const sty = 112 + idx * 23;
    cell(`st_id_${idx}`, st.id, 1104, sty, 26, 21, "shape=ellipse;fillColor=#1E3A8A;fontColor=#FFFFFF;fontSize=8;fontStyle=1;strokeColor=#FFFFFF;align=center;verticalAlign=middle;");
    cell(`st_s_${idx}`, st.s, 1132, sty, 68, 21, "strokeColor=#CBD5E1;fillColor=#FFFFFF;fontColor=#0F172A;fontSize=8;fontStyle=1;align=left;verticalAlign=middle;padding=3;");
    cell(`st_ex_${idx}`, `<div style="font-size:7.5px;line-height:1.15;color:#0F172A;font-weight:600;padding:2px;">${st.ex}</div>`, 1202, sty, 250, 21, "html=1;strokeColor=#CBD5E1;fillColor=#FFFFFF;align=left;verticalAlign=middle;");
    cell(`st_aff_${idx}`, st.aff, 1454, sty, 62, 21, "strokeColor=#CBD5E1;fillColor=#FFFFFF;fontColor:#1E40AF;fontSize=8px;fontStyle=1;align=center;verticalAlign=middle;");
  });

  // 2. Risk Rating Bar (y=304..342, h=38)
  cell("box_r_ratings", "", 1100, 304, 420, 38, "rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;");
  const rRatingHtml = `<div style="font-size:8.5px;color:#0F172A;display:flex;justify-content:space-around;align-items:center;height:100%;">
    <b>RISK RATING:</b> &nbsp;
    <span>🔴 <b>Critical</b></span> &nbsp;
    <span>🟠 <b>High</b></span> &nbsp;
    <span>🟡 <b>Medium</b></span> &nbsp;
    <span>🟢 <b>Low</b></span>
  </div>`;
  cell("txt_r_ratings", rRatingHtml, 1102, 306, 416, 34, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // 3. Key Security Controls (w=206, x=1100, y=348..588)
  cell("box_r_sec_ctrls", "", 1100, 348, 206, 240, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;");
  cell("lbl_r_sec_ctrls", "KEY SECURITY CONTROLS", 1100, 350, 206, 14, "text;html=1;strokeColor=none;fillColor=none;fontColor=#1E40AF;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");
  const secCtrlsHtml = `<div style="font-size:8px;line-height:1.55;color:#0F172A;padding:4px 8px;">
    ✔ <b>Identity &amp; Access</b> (IAM, Least Privilege)<br/><br/>
    ✔ <b>Network Security</b> (VPC-SC, Firewall, WAF)<br/><br/>
    ✔ <b>Data Protection</b> (Encryption, DLP)<br/><br/>
    ✔ <b>Application Security</b> (Secure SDLC)<br/><br/>
    ✔ <b>Secrets Management</b><br/><br/>
    ✔ <b>Logging &amp; Audit</b> (Cloud Audit Logs)<br/><br/>
    ✔ <b>Monitoring &amp; Alerting</b> (SCC, SIEM)<br/><br/>
    ✔ <b>Backup &amp; Resilience</b> (Multi-region)
  </div>`;
  cell("txt_r_sec_ctrls", secCtrlsHtml, 1102, 366, 202, 218, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  // 4. Compliance & Standards (w=206, x=1314, y=348..588)
  cell("box_r_comp_std", "", 1314, 348, 206, 240, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;");
  cell("lbl_r_comp_std", "COMPLIANCE &amp; STANDARDS", 1314, 350, 206, 14, "text;html=1;strokeColor=none;fillColor=none;fontColor=#166534;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");
  const compStdHtml = `<div style="font-size:8px;line-height:1.55;color:#0F172A;padding:4px 8px;">
    ✔ <b>GDPR, HIPAA, 21 CFR Part 11</b><br/><br/>
    ✔ <b>ISO/IEC 27001, 27017, 27018</b><br/><br/>
    ✔ <b>SOC 2</b> (CC6.1, CC7.1, CC7.2)<br/><br/>
    ✔ <b>NIST AI RMF, NIST CSF</b><br/><br/>
    ✔ <b>OWASP Top 10 for LLM Apps</b><br/><br/>
    ✔ <b>Google Cloud Security Best Practices</b>
  </div>`;
  cell("txt_r_comp_std", compStdHtml, 1316, 366, 202, 218, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  // ==================== 6. BOTTOM ROW: IR FLOW, MONITORING, DONUT CHART, NOTES (y=598..954, h=356) ====================
  // 1. Incident Response Flow (w=430)
  cell("box_b_ir", "", 16, 598, 430, 356, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;");
  cell("lbl_b_ir", "INCIDENT RESPONSE FLOW (HIGH LEVEL)", 16, 600, 430, 20, "shape=rectangle;rounded=1;arcSize=8;fillColor=#EFF6FF;strokeColor=#CBD5E1;fontColor=#1E40AF;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;");

  const irSteps = [
    { t: "Detect", icon: "🔍" },
    { t: "Triage", icon: "📋" },
    { t: "Contain", icon: "🛡️" },
    { t: "Eradicate", icon: "🧹" },
    { t: "Post-Incident<br/>Review", icon: "📑" }
  ];
  irSteps.forEach((ir, idx) => {
    const irx = 26 + idx * 82;
    cell(`ir_${idx}`, `<div style="font-size:22px;text-align:center;">${ir.icon}</div><div style="font-size:8px;font-weight:800;color:#0F172A;text-align:center;line-height:1.15;margin-top:3px;">${ir.t}</div>`, irx, 630, 76, 78, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=3;");
    if (idx > 0) {
      edge(`e_ir_${idx}`, `ir_${idx - 1}`, `ir_${idx}`, "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=classic;endSize=4;exitX=1;exitY=0.5;entryX=0;entryY=0.5;");
    }
  });

  const irDetailsHtml = `<div style="font-size:8px;line-height:1.6;color:#0F172A;padding:8px 12px;margin-top:92px;">
    ✔ <b>Automated Isolation:</b> Workloads flagged as compromised are cordoned automatically.<br/><br/>
    ✔ <b>Forensic Preservation:</b> Snapshots &amp; audit trails exported to immutable GCS vault.<br/><br/>
    ✔ <b>Regulatory Notification:</b> FDA &amp; GDPR breach notification workflows triggered within 72h.
  </div>`;
  cell("txt_b_ir_dtl", irDetailsHtml, 18, 718, 426, 230, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  // 2. Monitoring & Detection (w=340, x=454)
  cell("box_b_mon", "", 454, 598, 340, 356, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.5;");
  cell("lbl_b_mon", "MONITORING &amp; DETECTION", 454, 600, 340, 20, "shape=rectangle;rounded=1;arcSize=8;fillColor=#FAF5FF;strokeColor=#CBD5E1;fontColor=#7C3AED;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;");

  const monIcons = [
    { t: "Cloud Monitoring<br/>(Metrics, Logs)", icon: "📈" },
    { t: "SIEM Integration<br/>(Splunk / Chronicle)", icon: "⚙️" },
    { t: "Alerting Policies<br/>(Email, Slack, PagerDuty)", icon: "🔔" },
    { t: "Intelligence<br/>Feeds", icon: "🌐" }
  ];
  monIcons.forEach((mi, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const mx = 464 + col * 160;
    const my = 630 + row * 92;
    cell(`mi_${idx}`, `<div style="font-size:22px;text-align:center;">${mi.icon}</div><div style="font-size:8px;font-weight:800;color:#0F172A;text-align:center;line-height:1.15;margin-top:3px;">${mi.t}</div>`, mx, my, 150, 80, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=center;verticalAlign=middle;padding=3;");
  });

  const monFootHtml = `<div style="font-size:8px;line-height:1.55;color:#0F172A;padding:6px 10px;margin-top:190px;">
    • <b>24/7 SOC Coverage:</b> Active monitoring &amp; automated incident response.<br/>
    • <b>Audit Correlation:</b> Automated correlation of cloud audit logs &amp; API anomalies.
  </div>`;
  cell("txt_b_mon_foot", monFootHtml, 456, 820, 336, 128, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  // 3. Risk Assessment Summary (w=350, x=802)
  cell("box_b_risk_sum", "", 802, 598, 350, 356, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.5;");
  cell("lbl_b_risk_sum", "RISK ASSESSMENT SUMMARY", 802, 600, 350, 20, "shape=rectangle;rounded=1;arcSize=8;fillColor=#FFFBEB;strokeColor=#CBD5E1;fontColor=#D97706;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;");

  const riskSumHtml = `<div style="display:flex;align-items:center;justify-content:center;gap:18px;padding:14px;">
    <div style="font-size:52px;">🍩</div>
    <div style="font-size:9.5px;line-height:1.8;color:#0F172A;">
      <span style="color:#DC2626;font-weight:900;">■ Critical: 10%</span><br/>
      <span style="color:#EA580C;font-weight:900;">■ High: 35%</span><br/>
      <span style="color:#D97706;font-weight:900;">■ Medium: 40%</span><br/>
      <span style="color:#16A34A;font-weight:900;">■ Low: 15%</span>
    </div>
  </div>
  <div style="font-size:8px;line-height:1.5;color:#475569;font-weight:600;padding:6px 14px;">
    Based on CVSS v3.1 and STRIDE severity scoring across all 11 mapped attack surfaces.
  </div>`;
  cell("txt_b_risk_sum", riskSumHtml, 804, 624, 346, 324, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=4;");

  // 4. Notes & Legend (w=360, x=1160)
  cell("box_b_notes", "", 1160, 598, 360, 356, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;");
  cell("lbl_b_notes", "NOTES &amp; GOVERNANCE", 1160, 600, 360, 20, "shape=rectangle;rounded=1;arcSize=8;fillColor=#F8FAFC;strokeColor=#CBD5E1;fontColor=#1E3A8A;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;");
  const notesSecHtml = `<div style="font-size:8px;line-height:1.65;color:#0F172A;padding:8px 14px;">
    • <b>Continuous Threat Modeling:</b> Threats are continuously reviewed and updated.<br/><br/>
    • <b>Model Risk Governance:</b> Model risks require human oversight and guardrails.<br/><br/>
    • <b>Penetration Testing:</b> Perform periodic threat modeling reviews &amp; penetration tests.<br/><br/>
    • <b>Traceability:</b> Maintain end-to-end traceability and auditability.
  </div>`;
  cell("txt_b_notes", notesSecHtml, 1162, 624, 356, 324, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=4;");

  // ==================== 7. FOOTER LEGEND (y=962, h=24) ====================
  const legendHtml = `<div style='font-size:9.5px;color:#0F172A;font-weight:700;display:flex;justify-content:space-between;align-items:center;'>
    <div><b>LEGEND:</b> &nbsp; ━━━━► Data Flow &nbsp;|&nbsp; ┈┈┈► Trust Boundary &nbsp;|&nbsp; ───► External Connection &nbsp;|&nbsp; 🟦 Trust Zone &nbsp;|&nbsp; 🟪 STRIDE Catalog</div>
    <div>Enterprise Threat Modeling &amp; Risk Architecture &nbsp;|&nbsp; May 8, 2025</div>
  </div>`;
  cell("footer_legend", legendHtml, 16, 962, 1504, 24, "rounded=1;arcSize=8;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=left;verticalAlign=middle;padding=4;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_27_threat_model" name="Template 27: Threat Model Architecture">
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
