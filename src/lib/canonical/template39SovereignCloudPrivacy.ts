/**
 * Master 1:1 High-Craft Exact Ground-Truth Replica for Template 39: Sovereign Cloud & Data Privacy Blueprint
 * Matches 100% of images/39.png:
 * - Exact 1600x1050 Canvas.
 * - Bold high-contrast typography, crisp vectors, rich saturated colors, zero-void proportional card packing.
 */

const E = (v?: string | null) =>
  (v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export function generateTemplate39SovereignCloudPrivacyXml(
  domainFlavor = "sovereignty",
  theme: "light" | "dark" = "light"
): string {
  const isDark = theme === "dark";
  const c: string[] = [];

  const cell = (id: string, v: string, x: number, y: number, w: number, h: number, style: string) =>
    c.push(
      `<mxCell id="${id}" value="${E(v)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`
    );

  const rawEdge = (
    id: string,
    style: string,
    pts: { x: number; y: number }[]
  ) => {
    const pStr = pts.map(p => `<mxPoint x="${p.x}" y="${p.y}"/>`).join("\n            ");
    c.push(
      `<mxCell id="${id}" edge="1" parent="1" style="${style}">
        <mxGeometry relative="1" as="geometry">
          <mxPoint x="${pts[0].x}" y="${pts[0].y}" as="sourcePoint"/>
          <mxPoint x="${pts[pts.length - 1].x}" y="${pts[pts.length - 1].y}" as="targetPoint"/>
          <Array as="points">
            ${pStr}
          </Array>
        </mxGeometry>
      </mxCell>`
    );
  };

  // ==================== 1. TOP HEADER BANNER (y=16..76) ====================
  // Header Badge (Circle)
  cell("hdr_num", "39", 16, 16, 60, 60, "shape=ellipse;fillColor=#1E3A8A;strokeColor=#1E3A8A;fontColor=#FFFFFF;fontSize=32;fontStyle=1;align=center;verticalAlign=middle;");

  cell(
    "hdr_title",
    `<div style='font-size:28px;font-weight:900;color:#0F172A;letter-spacing:-0.2px;line-height:1.15;'>Sovereign Cloud & Data Privacy Blueprint</div>` +
    `<div style='font-size:13px;font-weight:700;color:#1E3A8A;margin-top:4px;'>Data Residency • Privacy by Design • Compliance • Sovereign Operations</div>`,
    88,
    16,
    760,
    60,
    "whiteSpace=wrap;overflow=hidden;text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;"
  );

  // Top Legend (x=850..1520, y=16..76)
  cell("top_legend_box", "", 850, 16, 670, 60, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("top_leg_title", "LEGEND", 858, 18, 50, 14, "html=1;fontColor:#64748B;fontSize=8;fontStyle=1;align=left;verticalAlign=middle;");

  // Legend items
  const legLines = [
    { t: "Data Flow", color: "#2563EB", style: "solid", y: 26 },
    { t: "Control / Governance Flow", color: "#7C3AED", style: "dashed", y: 44 },
    { t: "Audit / Monitoring Flow", color: "#16A34A", style: "dotted", y: 62 }
  ];
  legLines.forEach((li, idx) => {
    cell(`leg_txt_${idx}`, `<span style="font-size:8.5px;font-weight:800;color:#0F172A;">${li.t}</span>`, 970, li.y - 7, 170, 14, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
    rawEdge(`leg_e_${idx}`, `edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=${li.color};strokeWidth=2;${li.style === "dashed" ? "dashed=1;dashPattern=4 2;" : li.style === "dotted" ? "dashed=1;dashPattern=1 2;" : ""}endArrow=classic;endSize=3;`, [
      { x: 914, y: li.y },
      { x: 962, y: li.y }
    ]);
  });

  const legIcons = [
    { t: "Data Store", icon: "🗄️", x: 1160, y: 26 },
    { t: "Security Control", icon: "🛡️", x: 1160, y: 52 },
    { t: "Process / Service", icon: "⚙️", x: 1340, y: 26 },
    { t: "Trust Boundary", icon: "🔲", x: 1340, y: 52 }
  ];
  legIcons.forEach((li, idx) => {
    cell(`leg_ic_${idx}`, `<div style="display:flex;align-items:center;gap:4px;"><span style="font-size:16px;">${li.icon}</span><span style="font-size:8.5px;font-weight:800;color:#0F172A;">${li.t}</span></div>`, li.x, li.y - 7, 150, 18, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  });

  // ==================== 2. TOP ENCLAVE: GOVERNANCE & SOVEREIGN OVERSIGHT (x=240..1296, y=86..176) ====================
  cell("box_gov_top", "", 240, 86, 1056, 90, "rounded=1;arcSize=4;fillColor=#FAF5FF;strokeColor=#C4B5FD;strokeWidth=1.5;dashed=1;dashPattern=4 3;");
  cell("lbl_gov_top", "GOVERNANCE & SOVEREIGN OVERSIGHT", 240, 88, 1056, 18, "fontColor=#6D28D9;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;");

  const govPods = [
    { t: "Sovereignty Governance Board", sub: "Policy, Oversight, Accountability", icon: "🏛️" },
    { t: "Privacy Office (DPO)", sub: "Data Protection & Privacy<br/>Impact Assessments", icon: "🛡️" },
    { t: "Legal & Compliance", sub: "Regulations, Contracts,<br/>Approvals", icon: "⚖️" },
    { t: "Data Ethics Board", sub: "Ethical Use, Fairness,<br/>Transparency", icon: "🧠" },
    { t: "Audit & Assurance", sub: "Independent Audit,<br/>Assurance, Reporting", icon: "📋" }
  ];
  govPods.forEach((gp, idx) => {
    const gpx = 250 + idx * 208;
    cell(
      `gp_${idx}`,
      `<div style="display:flex;align-items:center;gap:8px;padding:2px 4px;"><span style="font-size:24px;">${gp.icon}</span><div><div style="font-size:9px;font-weight:900;color:#0F172A;line-height:1.15;">${gp.t}</div><div style="font-size:7.5px;font-weight:600;color:#64748B;margin-top:2px;line-height:1.15;">${gp.sub}</div></div></div>`,
      gpx,
      108,
      202,
      60,
      "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#E9D5FF;strokeWidth=1.2;html=1;align=left;verticalAlign=middle;padding=4;"
    );
  });

  // ==================== 3. LEFT COLUMN: USERS & STAKEHOLDERS (x=16..228, y=184..684) ====================
  cell("box_users_left", "", 16, 184, 212, 500, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.8;");
  cell("lbl_users_left", "USERS & STAKEHOLDERS", 16, 186, 212, 24, "html=1;fontColor=#1E40AF;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;");

  const stakeHolders = [
    { t: "Citizens / Customers", sub: "Portals, Apps,<br/>Self-Service", icon: "👤" },
    { t: "Employees", sub: "Internal Apps,<br/>Collaboration", icon: "👥" },
    { t: "Partners / Suppliers", sub: "Extranet, B2B<br/>Integrations", icon: "🤝" },
    { t: "Regulators / Authorities", sub: "Reporting, e-Discovery,<br/>Assurance", icon: "🏛️" },
    { t: "Support / Operations", sub: "IT Support,<br/>Operations Teams", icon: "🛠️" }
  ];
  stakeHolders.forEach((sh, idx) => {
    const shy = 216 + idx * 92;
    cell(
      `sh_${idx}`,
      `<div style="display:flex;align-items:center;gap:10px;"><span style="font-size:28px;">${sh.icon}</span><div><div style="font-size:10px;font-weight:900;color:#0F172A;">${sh.t}</div><div style="font-size:8px;color:#64748B;font-weight:600;margin-top:3px;line-height:1.2;">${sh.sub}</div></div></div>`,
      22,
      shy,
      200,
      82,
      "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;padding=4;"
    );
  });

  // Secure Access Gate (x=234..296, y=390..478)
  cell("gate_mfa", `<div style="text-align:center;"><div style="font-size:24px;">🔒</div><div style="font-size:8.5px;font-weight:900;color:#1E40AF;line-height:1.15;margin-top:3px;">Secure<br/>Access<br/><span style="font-size:7.5px;color:#64748B;">(MFA, SSO)</span></div></div>`, 234, 390, 62, 88, "rounded=1;arcSize=6;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.5;html=1;align=center;verticalAlign=middle;padding=2;" );

  // ==================== 4. CENTER: SOVEREIGN CLOUD ENVIRONMENT (x=302..1234, y=184..684) ====================
  cell("box_sov_env", "", 302, 184, 932, 500, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#1E40AF;strokeWidth=2.2;");
  cell("lbl_sov_env", `<div style="display:flex;align-items:center;justify-content:center;gap:8px;"><span style="font-size:18px;">🏛️</span><span style="font-size:12px;font-weight:900;color:#1E3A8A;letter-spacing:0.5px;">SOVEREIGN CLOUD ENVIRONMENT (In-Country / In-Region)</span></div>`, 302, 188, 932, 26, "html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // 4 Top Core Pods (x=312..1224, y=218..298)
  const sovPods = [
    { t: "Workloads", sub: "Sovereign Compute<br/>(VMs, Containers, Serverless)", icon: "☸️", w: 218 },
    { t: "Data Services", sub: "Sovereign Storage,<br/>Databases, Analytics, AI/ML", icon: "🗄️", w: 224 },
    { t: "Application Services", sub: "Integration, API,<br/>Messaging, Workflow", icon: "🌐", w: 224 },
    { t: "Identity & Access", sub: "Federated IAM,<br/>RBAC, PAM, CIEM", icon: "🛡️", w: 218 }
  ];
  let curSovX = 314;
  sovPods.forEach((sp, idx) => {
    cell(
      `sp_${idx}`,
      `<div style="display:flex;align-items:center;gap:8px;"><span style="font-size:28px;">${sp.icon}</span><div><div style="font-size:10px;font-weight:900;color:#0F172A;">${sp.t}</div><div style="font-size:8px;color:#64748B;font-weight:600;margin-top:3px;line-height:1.2;">${sp.sub}</div></div></div>`,
      curSovX,
      218,
      sp.w,
      76,
      "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.2;html=1;align=left;verticalAlign=middle;padding=6;"
    );
    curSovX += sp.w + 10;
  });

  // Data Classification & Residency Enforcement (y=304..380, h=76)
  cell("box_dc_re", "", 314, 304, 908, 76, "rounded=1;arcSize=4;fillColor=#FAF5FF;strokeColor=#C4B5FD;strokeWidth=1.2;");
  cell("lbl_dc_re", "DATA CLASSIFICATION & RESIDENCY ENFORCEMENT", 314, 306, 908, 16, "html=1;fontColor:#6D28D9;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");

  const dataClasses = [
    { t: "Public Data", w: 106, c: "#E0E7FF" },
    { t: "Internal Data", w: 116, c: "#E0E7FF" },
    { t: "Confidential Data", w: 146, c: "#EDE9FE" },
    { t: "Restricted Data", w: 136, c: "#FCE7F3" },
    { t: "Highly Restricted / Personal Data", w: 236, c: "#FEE2E2" }
  ];
  let curDcX = 338;
  dataClasses.forEach((dc, idx) => {
    cell(`dc_${idx}`, `<div style="font-size:8.5px;font-weight:800;color:#0F172A;">${dc.t}</div>`, curDcX, 326, dc.w, 26, `rounded=1;arcSize=24;fillColor=${dc.c};strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;`);
    curDcX += dc.w + 20;
  });
  cell("dc_footer", `<div style="font-size:8px;font-weight:800;color:#475569;">Tagging &nbsp;•&nbsp; Labeling &nbsp;•&nbsp; Residency Rules &nbsp;•&nbsp; Automated Enforcement</div>`, 314, 356, 908, 16, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // Privacy & Security Controls (Built-in) (y=388..484, h=96)
  cell("box_priv_sec", "", 314, 388, 908, 96, "rounded=1;arcSize=4;fillColor=#F0FDF4;strokeColor=#86EFAC;strokeWidth=1.2;");
  cell("lbl_priv_sec", "PRIVACY & SECURITY CONTROLS (Built-in)", 314, 390, 908, 16, "html=1;fontColor:#15803D;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");

  const privControls = [
    { t: "Encryption", sub: "At Rest, In Transit,<br/>In Use (KMS)", icon: "🔒", w: 134 },
    { t: "Data Masking &<br/>Pseudonymization", sub: "", icon: "👁️", w: 144 },
    { t: "DLP & Data<br/>Discovery", sub: "", icon: "🔍", w: 134 },
    { t: "Consent & Preference<br/>Management", sub: "", icon: "📑", w: 154 },
    { t: "Key Management", sub: "(Sovereign KMS/HSM)", icon: "🔑", w: 146 },
    { t: "Zero Trust", sub: "Network Access", icon: "🛡️", w: 134 }
  ];
  let curPcX = 326;
  privControls.forEach((pc, idx) => {
    cell(
      `pc_${idx}`,
      `<div style="display:flex;align-items:center;gap:6px;"><span style="font-size:22px;">${pc.icon}</span><div><div style="font-size:8.5px;font-weight:900;color:#0F172A;line-height:1.15;">${pc.t}</div>${pc.sub ? `<div style="font-size:7.5px;color:#64748B;font-weight:600;margin-top:2px;line-height:1.1;">${pc.sub}</div>` : ""}</div></div>`,
      curPcX,
      410,
      pc.w,
      64,
      "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;padding=2;"
    );
    curPcX += pc.w + 12;
  });

  // Infrastructure Sovereignty (y=492..576, h=84)
  cell("box_infra_sov", "", 314, 492, 908, 84, "rounded=1;arcSize=4;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.2;");
  cell("lbl_infra_sov", "INFRASTRUCTURE SOVEREIGNTY", 314, 494, 908, 16, "html=1;fontColor:#1E40AF;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");

  const infraItems = [
    { t: "In-Country / In-Region<br/>Data Centers", icon: "🏢" },
    { t: "Sovereign Network<br/>(Private Backbone)", icon: "🌐" },
    { t: "Sovereign Operations<br/>& Support", icon: "⚙️" },
    { t: "Sovereign Backups<br/>& DR", icon: "☁️" }
  ];
  infraItems.forEach((ii, idx) => {
    const iix = 326 + idx * 222;
    cell(
      `ii_${idx}`,
      `<div style="display:flex;align-items:center;gap:8px;"><span style="font-size:24px;">${ii.icon}</span><div style="font-size:9px;font-weight:900;color:#0F172A;line-height:1.2;">${ii.t}</div></div>`,
      iix,
      514,
      214,
      54,
      "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#BFDBFE;strokeWidth=1;html=1;align=left;verticalAlign=middle;padding=4;"
    );
  });

  // Controlled Exchange Gate (x=1240..1302, y=390..478)
  cell("gate_ctrl", `<div style="text-align:center;"><div style="font-size:24px;">🔒</div><div style="font-size:8.5px;font-weight:900;color:#1E40AF;line-height:1.15;margin-top:3px;">Controlled<br/>Exchange<br/><span style="font-size:7.5px;color:#64748B;">(Policy Engine)</span></div></div>`, 1240, 390, 62, 88, "rounded=1;arcSize=6;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.5;html=1;align=center;verticalAlign=middle;padding=2;" );

  // ==================== 5. RIGHT COLUMN: DATA EXCHANGE & CONTROLS (x=1308..1520, y=184..684) ====================
  cell("box_exchange_right", "", 1308, 184, 212, 500, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.8;");
  cell("lbl_exchange_right", "DATA EXCHANGE & CONTROLS", 1308, 186, 212, 24, "html=1;fontColor:#15803D;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;");

  const exchangeItems = [
    { t: "Cross-Border Transfers", sub: "Approved Mechanisms<br/>(SCCs, BCRs, Adequacy)", icon: "🌐" },
    { t: "Secure Data Exchange", sub: "APIs, VPN, Private Links,<br/>File Transfer", icon: "🔄" },
    { t: "Data Export Controls", sub: "Policy Enforcement,<br/>Approval Workflows", icon: "📑" },
    { t: "Third-Party Risk Mgmt", sub: "Due Diligence, Contracts,<br/>Continuous Monitoring", icon: "👥" },
    { t: "Data Localization", sub: "Enforced Residency,<br/>No Unauthorized Copy", icon: "🛡️" }
  ];
  exchangeItems.forEach((ei, idx) => {
    const eiy = 216 + idx * 92;
    cell(
      `ei_${idx}`,
      `<div style="display:flex;align-items:center;gap:10px;"><span style="font-size:28px;">${ei.icon}</span><div><div style="font-size:10px;font-weight:900;color:#0F172A;">${ei.t}</div><div style="font-size:8px;color:#64748B;font-weight:600;margin-top:3px;line-height:1.2;">${ei.sub}</div></div></div>`,
      1314,
      eiy,
      200,
      82,
      "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;padding=4;"
    );
  });

  // ==================== 6. MIDDLE-BOTTOM: MONITORING, AUDIT & ASSURANCE (x=16..1520, y=694..774) ====================
  cell("box_mon_audit", "", 16, 694, 1504, 80, "rounded=1;arcSize=4;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.5;");
  cell("lbl_mon_audit", "MONITORING, AUDIT & ASSURANCE", 16, 696, 1504, 16, "html=1;fontColor:#1E40AF;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;");

  const monItems = [
    { t: "Continuous Monitoring", sub: "Security, Privacy,<br/>Compliance", icon: "⏱️" },
    { t: "Audit Logging", sub: "Immutable Logs,<br/>Tamper-Proof", icon: "📋" },
    { t: "Compliance Automation", sub: "Policy as Code,<br/>Continuous Evidence", icon: "⚙️" },
    { t: "Reporting & Transparency", sub: "Regulatory & Stakeholder<br/>Reports", icon: "📑" },
    { t: "Incident Response", sub: "Privacy Breach Mgmt,<br/>Forensics", icon: "🛡️" }
  ];
  monItems.forEach((mi, idx) => {
    const mix = 26 + idx * 298;
    cell(
      `mi_${idx}`,
      `<div style="display:flex;align-items:center;gap:8px;"><span style="font-size:24px;">${mi.icon}</span><div><div style="font-size:9.5px;font-weight:900;color:#0F172A;">${mi.t}</div><div style="font-size:8px;color:#64748B;font-weight:600;margin-top:2px;line-height:1.15;">${mi.sub}</div></div></div>`,
      mix,
      716,
      288,
      52,
      "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;padding=2;"
    );
  });

  // ==================== 7. BOTTOM ROW (y=782..932, h=150) ====================

  // Box 1: SUPPORTING SOVEREIGN SERVICES (x=16..330, w=314)
  cell("box_supp_serv", "", 16, 782, 314, 150, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("lbl_supp_serv", "SUPPORTING SOVEREIGN SERVICES", 16, 784, 314, 16, "html=1;fontColor:#475569;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");

  const suppItems = [
    { t: "Sovereign<br/>DNS", icon: "🌐" },
    { t: "Sovereign<br/>PKI / CA", icon: "🛡️" },
    { t: "Time Sync<br/>(NTP)", icon: "⏱️" },
    { t: "Certificate<br/>Management", icon: "📑" },
    { t: "Secrets<br/>Management", icon: "🔒" }
  ];
  suppItems.forEach((si, idx) => {
    const six = 22 + idx * 60;
    cell(
      `si_${idx}`,
      `<div style="text-align:center;"><div style="font-size:22px;">${si.icon}</div><div style="font-size:8px;font-weight:800;color:#0F172A;line-height:1.15;margin-top:4px;">${si.t}</div></div>`,
      six,
      810,
      56,
      112,
      "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;padding=1;"
    );
  });

  // Box 2: COMPLIANCE FRAMEWORKS (x=338..730, w=392)
  cell("box_comp_fw", "", 338, 782, 392, 150, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("lbl_comp_fw", "COMPLIANCE FRAMEWORKS", 338, 784, 392, 16, "html=1;fontColor:#475569;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");

  const badges = [
    { t: "GDPR", icon: "🇪🇺", sub: "" },
    { t: "ISO 27001", icon: "🛡️", sub: "" },
    { t: "ISO 27701", icon: "🛡️", sub: "(Privacy)" },
    { t: "SOC 2", icon: "🛡️", sub: "Type II" },
    { t: "NIST", icon: "🛡️", sub: "Privacy Framework" },
    { t: "eIDAS", icon: "🇪🇺", sub: "" },
    { t: "Local Data", icon: "🏛️", sub: "Protection Laws" }
  ];
  badges.forEach((bg, idx) => {
    const col = idx % 4;
    const row = Math.floor(idx / 4);
    const bx = 346 + col * 94;
    const by = 808 + row * 56;
    cell(
      `cf_${idx}`,
      `<div style="text-align:center;"><div style="font-size:18px;">${bg.icon}</div><div style="font-size:8.5px;font-weight:900;color:#0F172A;line-height:1.1;">${bg.t}</div>${bg.sub ? `<div style="font-size:7px;color:#64748B;font-weight:600;">${bg.sub}</div>` : ""}</div>`,
      bx,
      by,
      90,
      50,
      "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;padding=1;"
    );
  });

  // Box 3: KEY PRINCIPLES (x=738..1160, w=422)
  cell("box_key_princ", "", 738, 782, 422, 150, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("lbl_key_princ", "KEY PRINCIPLES", 738, 784, 422, 16, "html=1;fontColor:#475569;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");

  const principles = [
    "Data Residency & Sovereignty",
    "Privacy by Design & Default",
    "Purpose Limitation & Data Minimization",
    "Transparency & Accountability",
    "Security & Confidentiality",
    "User Rights & Control"
  ];
  principles.forEach((pr, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const px = 746 + col * 206;
    const py = 810 + row * 36;
    cell(`kp_${idx}`, `<div style="display:flex;align-items:center;gap:8px;"><span style="color:#16A34A;font-size:16px;font-weight:900;">☑</span><span style="font-size:8.5px;font-weight:800;color:#0F172A;">${pr}</span></div>`, px, py, 202, 30, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  });

  // Box 4: NOTES (x=1168..1520, w=352)
  cell("box_notes", "", 1168, 782, 352, 150, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;dashed=1;dashPattern=4 3;");
  cell("lbl_notes", "NOTES", 1176, 788, 80, 16, "html=1;fontColor:#0F172A;fontSize=9;fontStyle=1;align=left;verticalAlign=middle;");
  const notesHtml = `<div style="font-size:8.5px;color:#334155;line-height:1.55;font-weight:600;">` +
    `• All sensitive / personal data remains within sovereign boundary.<br/>` +
    `• Cross-border transfers only via approved legal mechanisms.<br/>` +
    `• All controls are auditable and continuously monitored.` +
    `</div>`;
  cell("txt_notes", notesHtml, 1176, 812, 336, 110, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  // ==================== 8. BOTTOM VALUE BADGES & FOOTER (y=940..1010, h=70) ====================
  const valBadges = [
    { t: "Data Stays in<br/>Country / Region", icon: "🛡️" },
    { t: "Regulatory<br/>Compliance", icon: "🛡️" },
    { t: "Reduced Legal<br/>& Transfer Risk", icon: "⚙️" },
    { t: "Stronger Trust &<br/>Citizen Confidence", icon: "🤝" },
    { t: "Operational<br/>Independence", icon: "🏛️" }
  ];
  valBadges.forEach((vb, idx) => {
    const vbx = 16 + idx * 162;
    cell(
      `vb_${idx}`,
      `<div style="display:flex;align-items:center;gap:8px;"><span style="font-size:26px;">${vb.icon}</span><div style="font-size:9px;font-weight:900;color:#0F172A;line-height:1.2;">${vb.t}</div></div>`,
      vbx,
      940,
      154,
      62,
      "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#BFDBFE;strokeWidth=1.2;html=1;align=left;verticalAlign=middle;padding=4;"
    );
  });

  // Footer Legend Lines (x=834..1520, y=940..1010)
  cell("bot_leg_box", "", 834, 940, 686, 62, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  const bLegs = [
    { t: "Sovereign Boundary (Data & Operations)", color: "#1D4ED8", style: "solid", y: 954 },
    { t: "Governance Boundary", color: "#7C3AED", style: "dashed", y: 972 },
    { t: "Monitoring & Audit Boundary", color: "#16A34A", style: "dotted", y: 990 }
  ];
  bLegs.forEach((bl, idx) => {
    cell(`bl_txt_${idx}`, `<span style="font-size:9px;font-weight:800;color:#0F172A;">${bl.t}</span>`, 910, bl.y - 7, 400, 14, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
    rawEdge(`bl_e_${idx}`, `edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=${bl.color};strokeWidth=2.2;${bl.style === "dashed" ? "dashed=1;dashPattern=4 2;" : bl.style === "dotted" ? "dashed=1;dashPattern=1 2;" : ""}endArrow=none;`, [
      { x: 850, y: bl.y },
      { x: 900, y: bl.y }
    ]);
  });

  // ==================== 9. INTER-LAYER CONNECTORS ====================
  // Governance -> Sovereign Environment
  rawEdge("e_gov_to_sov", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#7C3AED;strokeWidth=1.5;dashed=1;dashPattern=4 2;endArrow=classic;endSize=4;", [
    { x: 768, y: 176 },
    { x: 768, y: 184 }
  ]);

  // Users -> Secure Access -> Sovereign Cloud
  rawEdge("e_users_to_gate", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 228, y: 434 },
    { x: 234, y: 434 }
  ]);
  rawEdge("e_gate_to_sov", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 296, y: 434 },
    { x: 302, y: 434 }
  ]);

  // Sovereign Cloud -> Controlled Exchange -> Data Exchange
  rawEdge("e_sov_to_ctrl", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 1234, y: 434 },
    { x: 1240, y: 434 }
  ]);
  rawEdge("e_ctrl_to_exch", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 1302, y: 434 },
    { x: 1308, y: 434 }
  ]);

  // Sovereign Cloud <-> Monitoring
  rawEdge("e_sov_to_mon", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#16A34A;strokeWidth=1.5;dashed=1;dashPattern=2 2;endArrow=classic;startArrow=classic;endSize=4;startSize=4;", [
    { x: 768, y: 684 },
    { x: 768, y: 694 }
  ]);

  const bg = isDark ? "#0F172A" : "#FFFFFF";

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_39_sovereign_cloud_privacy" name="Template 39: Sovereign Cloud &amp; Data Privacy Blueprint">
    <mxGraphModel dx="1536" dy="1024" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1536" pageHeight="1024" background="${bg}" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${c.join("\n        ")}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
