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

  // ==================== 1. TOP HEADER BANNER (y=12..66) ====================
  cell("hdr_num", "39", 16, 12, 60, 54, "shape=rectangle;rounded=1;arcSize=14;fillColor=#1E3A8A;strokeColor=#1E3A8A;fontColor=#FFFFFF;fontSize=30;fontStyle=1;align=center;verticalAlign=middle;");

  cell(
    "hdr_title",
    `<div style='font-size:25px;font-weight:900;color:#0F172A;letter-spacing:-0.2px;line-height:1.15;'>Sovereign Cloud & Data Privacy Blueprint</div>` +
    `<div style='font-size:12.5px;font-weight:700;color:#1E3A8A;margin-top:3px;'>Data Residency • Privacy by Design • Compliance • Sovereign Operations</div>`,
    84,
    12,
    760,
    54,
    "whiteSpace=wrap;overflow=hidden;text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;"
  );

  // Top Legend (x=900..1584, y=12..66)
  cell("top_legend_box", "", 900, 12, 684, 54, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("top_leg_title", "LEGEND", 906, 16, 60, 14, "html=1;fontColor:#475569;fontSize=8;fontStyle=1;align=left;verticalAlign=middle;");

  // Legend items in 3 columns
  const legItems = [
    { t: "Data Flow", color: "#2563EB", style: "solid", x: 970, y: 22 },
    { t: "Control / Governance Flow", color: "#7C3AED", style: "dashed", x: 970, y: 38 },
    { t: "Audit / Monitoring Flow", color: "#16A34A", style: "dotted", x: 970, y: 52 },
    { t: "Data Store", icon: "🗄️", x: 1230, y: 22 },
    { t: "Security Control", icon: "🛡️", x: 1230, y: 44 },
    { t: "Process / Service", icon: "⚙️", x: 1370, y: 22 },
    { t: "Trust Boundary", icon: "🔲", x: 1370, y: 44 }
  ];
  legItems.forEach((li, idx) => {
    if (li.color) {
      cell(`leg_txt_${idx}`, `<span style="font-size:8px;font-weight:800;color:#0F172A;">${li.t}</span>`, li.x + 60, li.y - 6, 170, 14, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
      rawEdge(`leg_e_${idx}`, `edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=${li.color};strokeWidth=1.8;${li.style === "dashed" ? "dashed=1;dashPattern=4 2;" : li.style === "dotted" ? "dashed=1;dashPattern=1 2;" : ""}endArrow=classic;endSize=3;`, [
        { x: li.x, y: li.y },
        { x: li.x + 50, y: li.y }
      ]);
    } else {
      cell(`leg_it_${idx}`, `<div style="display:flex;align-items:center;gap:4px;"><span style="font-size:14px;">${li.icon}</span><span style="font-size:8px;font-weight:800;color:#0F172A;">${li.t}</span></div>`, li.x, li.y - 6, 120, 16, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
    }
  });

  // ==================== 2. TOP ENCLAVE: GOVERNANCE & SOVEREIGN OVERSIGHT (x=290..1306, y=74..148) ====================
  cell("box_gov_top", "", 290, 74, 1016, 74, "rounded=1;arcSize=6;fillColor=#FAF5FF;strokeColor=#C4B5FD;strokeWidth=1.5;dashed=1;dashPattern=4 3;");
  cell("lbl_gov_top", "GOVERNANCE & SOVEREIGN OVERSIGHT", 290, 76, 1016, 16, "fontColor=#6D28D9;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");

  const govPods = [
    { t: "Sovereignty Governance Board", sub: "Policy, Oversight, Accountability", icon: "🏛️" },
    { t: "Privacy Office (DPO)", sub: "Data Protection & Privacy<br/>Impact Assessments", icon: "🛡️" },
    { t: "Legal & Compliance", sub: "Regulations, Contracts,<br/>Approvals", icon: "⚖️" },
    { t: "Data Ethics Board", sub: "Ethical Use, Fairness,<br/>Transparency", icon: "🧠" },
    { t: "Audit & Assurance", sub: "Independent Audit,<br/>Assurance, Reporting", icon: "📋" }
  ];
  govPods.forEach((gp, idx) => {
    const gpx = 300 + idx * 200;
    cell(
      `gp_${idx}`,
      `<div style="display:flex;align-items:center;gap:6px;"><span style="font-size:22px;">${gp.icon}</span><div><div style="font-size:8.5px;font-weight:800;color:#0F172A;line-height:1.15;">${gp.t}</div><div style="font-size:7px;font-weight:600;color:#64748B;margin-top:2px;line-height:1.1;">${gp.sub}</div></div></div>`,
      gpx,
      94,
      192,
      48,
      "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;padding=2;"
    );
  });

  // ==================== 3. LEFT COLUMN: USERS & STAKEHOLDERS (x=16..240, y=156..580) ====================
  cell("box_users_left", "", 16, 156, 224, 424, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;");
  cell("lbl_users_left", "USERS & STAKEHOLDERS", 16, 158, 224, 20, "html=1;fontColor=#1E40AF;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");

  const stakeHolders = [
    { t: "Citizens / Customers", sub: "Portals, Apps,<br/>Self-Service", icon: "👤" },
    { t: "Employees", sub: "Internal Apps,<br/>Collaboration", icon: "👥" },
    { t: "Partners / Suppliers", sub: "Extranet, B2B<br/>Integrations", icon: "🤝" },
    { t: "Regulators / Authorities", sub: "Reporting, e-Discovery,<br/>Assurance", icon: "🏛️" },
    { t: "Support / Operations", sub: "IT Support,<br/>Operations Teams", icon: "🛠️" }
  ];
  stakeHolders.forEach((sh, idx) => {
    const shy = 186 + idx * 76;
    cell(
      `sh_${idx}`,
      `<div style="display:flex;align-items:center;gap:8px;"><span style="font-size:24px;">${sh.icon}</span><div><div style="font-size:9px;font-weight:900;color:#0F172A;">${sh.t}</div><div style="font-size:7.5px;color:#64748B;font-weight:600;margin-top:2px;line-height:1.15;">${sh.sub}</div></div></div>`,
      24,
      shy,
      208,
      64,
      "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;padding=4;"
    );
  });

  // Secure Access Gate (x=248..312, y=340..400)
  cell("gate_mfa", `<div style="text-align:center;"><div style="font-size:20px;">🔒</div><div style="font-size:7.5px;font-weight:900;color:#1E40AF;line-height:1.15;margin-top:2px;">Secure<br/>Access<br/><span style="font-size:6.5px;color:#64748B;">(MFA, SSO)</span></div></div>`, 246, 336, 68, 68, "rounded=1;arcSize=6;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.2;html=1;align=center;verticalAlign=middle;padding=2;");

  // ==================== 4. CENTER: SOVEREIGN CLOUD ENVIRONMENT (x=320..1270, y=156..580) ====================
  cell("box_sov_env", "", 320, 156, 950, 424, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#1E40AF;strokeWidth=2;");
  cell("lbl_sov_env", `<div style="display:flex;align-items:center;justify-content:center;gap:6px;"><span style="font-size:16px;">🏛️</span><span style="font-size:11px;font-weight:900;color:#1E3A8A;letter-spacing:0.5px;">SOVEREIGN CLOUD ENVIRONMENT (In-Country / In-Region)</span></div>`, 320, 160, 950, 22, "html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // 4 Top Core Pods (x=330..1260, y=188..254)
  const sovPods = [
    { t: "Workloads", sub: "Sovereign Compute<br/>(VMs, Containers, Serverless)", icon: "☸️", w: 220 },
    { t: "Data Services", sub: "Sovereign Storage,<br/>Databases, Analytics, AI/ML", icon: "🗄️", w: 225 },
    { t: "Application Services", sub: "Integration, API,<br/>Messaging, Workflow", icon: "🌐", w: 225 },
    { t: "Identity & Access", sub: "Federated IAM,<br/>RBAC, PAM, CIEM", icon: "🛡️", w: 220 }
  ];
  let curSovX = 332;
  sovPods.forEach((sp, idx) => {
    cell(
      `sp_${idx}`,
      `<div style="display:flex;align-items:center;gap:6px;"><span style="font-size:24px;">${sp.icon}</span><div><div style="font-size:9px;font-weight:900;color:#0F172A;">${sp.t}</div><div style="font-size:7.5px;color:#64748B;font-weight:600;margin-top:2px;line-height:1.15;">${sp.sub}</div></div></div>`,
      curSovX,
      188,
      sp.w,
      64,
      "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.2;html=1;align=left;verticalAlign=middle;padding=6;"
    );
    curSovX += sp.w + 12;
  });

  // Data Classification & Residency Enforcement (y=260..330, h=70)
  cell("box_dc_re", "", 332, 260, 926, 70, "rounded=1;arcSize=4;fillColor=#FAF5FF;strokeColor=#C4B5FD;strokeWidth=1.2;");
  cell("lbl_dc_re", "DATA CLASSIFICATION & RESIDENCY ENFORCEMENT", 332, 262, 926, 14, "html=1;fontColor:#6D28D9;fontSize=8;fontStyle=1;align=center;verticalAlign=middle;");

  const dataClasses = [
    { t: "Public Data", w: 110, c: "#E0E7FF" },
    { t: "Internal Data", w: 120, c: "#E0E7FF" },
    { t: "Confidential Data", w: 150, c: "#EDE9FE" },
    { t: "Restricted Data", w: 140, c: "#FCE7F3" },
    { t: "Highly Restricted / Personal Data", w: 240, c: "#FEE2E2" }
  ];
  let curDcX = 356;
  dataClasses.forEach((dc, idx) => {
    cell(`dc_${idx}`, `<div style="font-size:8px;font-weight:800;color:#0F172A;">${dc.t}</div>`, curDcX, 280, dc.w, 24, `rounded=1;arcSize=24;fillColor=${dc.c};strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;`);
    curDcX += dc.w + 22;
  });
  cell("dc_footer", `<div style="font-size:7.5px;font-weight:800;color:#475569;">Tagging &nbsp;•&nbsp; Labeling &nbsp;•&nbsp; Residency Rules &nbsp;•&nbsp; Automated Enforcement</div>`, 332, 308, 926, 16, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // Privacy & Security Controls (Built-in) (y=336..426, h=90)
  cell("box_priv_sec", "", 332, 336, 926, 90, "rounded=1;arcSize=4;fillColor=#F0FDF4;strokeColor=#86EFAC;strokeWidth=1.2;");
  cell("lbl_priv_sec", "PRIVACY & SECURITY CONTROLS (Built-in)", 332, 338, 926, 14, "html=1;fontColor:#15803D;fontSize=8;fontStyle=1;align=center;verticalAlign=middle;");

  const privControls = [
    { t: "Encryption", sub: "At Rest, In Transit,<br/>In Use (KMS)", icon: "🔒", w: 136 },
    { t: "Data Masking &<br/>Pseudonymization", sub: "", icon: "👁️", w: 146 },
    { t: "DLP & Data<br/>Discovery", sub: "", icon: "🔍", w: 136 },
    { t: "Consent & Preference<br/>Management", sub: "", icon: "📑", w: 156 },
    { t: "Key Management", sub: "(Sovereign KMS/HSM)", icon: "🔑", w: 150 },
    { t: "Zero Trust", sub: "Network Access", icon: "🛡️", w: 136 }
  ];
  let curPcX = 346;
  privControls.forEach((pc, idx) => {
    cell(
      `pc_${idx}`,
      `<div style="display:flex;align-items:center;gap:6px;"><span style="font-size:20px;">${pc.icon}</span><div><div style="font-size:8px;font-weight:900;color:#0F172A;line-height:1.15;">${pc.t}</div>${pc.sub ? `<div style="font-size:7px;color:#64748B;font-weight:600;margin-top:2px;line-height:1.1;">${pc.sub}</div>` : ""}</div></div>`,
      curPcX,
      356,
      pc.w,
      60,
      "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;padding=2;"
    );
    curPcX += pc.w + 14;
  });

  // Infrastructure Sovereignty (y=432..512, h=80)
  cell("box_infra_sov", "", 332, 432, 926, 80, "rounded=1;arcSize=4;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.2;");
  cell("lbl_infra_sov", "INFRASTRUCTURE SOVEREIGNTY", 332, 434, 926, 14, "html=1;fontColor:#1E40AF;fontSize=8;fontStyle=1;align=center;verticalAlign=middle;");

  const infraItems = [
    { t: "In-Country / In-Region<br/>Data Centers", icon: "🏢" },
    { t: "Sovereign Network<br/>(Private Backbone)", icon: "🌐" },
    { t: "Sovereign Operations<br/>& Support", icon: "⚙️" },
    { t: "Sovereign Backups<br/>& DR", icon: "☁️" }
  ];
  infraItems.forEach((ii, idx) => {
    const iix = 348 + idx * 224;
    cell(
      `ii_${idx}`,
      `<div style="display:flex;align-items:center;gap:8px;"><span style="font-size:22px;">${ii.icon}</span><div style="font-size:8.5px;font-weight:900;color:#0F172A;line-height:1.2;">${ii.t}</div></div>`,
      iix,
      452,
      216,
      50,
      "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#BFDBFE;strokeWidth=1;html=1;align=left;verticalAlign=middle;padding=6;"
    );
  });

  // Controlled Exchange Gate (x=1278..1342, y=340..400)
  cell("gate_ctrl", `<div style="text-align:center;"><div style="font-size:20px;">🔒</div><div style="font-size:7.5px;font-weight:900;color:#1E40AF;line-height:1.15;margin-top:2px;">Controlled<br/>Exchange<br/><span style="font-size:6.5px;color:#64748B;">(Policy Engine)</span></div></div>`, 1278, 336, 68, 68, "rounded=1;arcSize=6;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.2;html=1;align=center;verticalAlign=middle;padding=2;");

  // ==================== 5. RIGHT COLUMN: DATA EXCHANGE & CONTROLS (x=1350..1584, y=156..580) ====================
  cell("box_exchange_right", "", 1350, 156, 234, 424, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;");
  cell("lbl_exchange_right", "DATA EXCHANGE & CONTROLS", 1350, 158, 234, 20, "html=1;fontColor:#15803D;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");

  const exchangeItems = [
    { t: "Cross-Border Transfers", sub: "Approved Mechanisms<br/>(SCCs, BCRs, Adequacy)", icon: "🌐" },
    { t: "Secure Data Exchange", sub: "APIs, VPN, Private Links,<br/>File Transfer", icon: "🔄" },
    { t: "Data Export Controls", sub: "Policy Enforcement,<br/>Approval Workflows", icon: "📑" },
    { t: "Third-Party Risk Mgmt", sub: "Due Diligence, Contracts,<br/>Continuous Monitoring", icon: "👥" },
    { t: "Data Localization", sub: "Enforced Residency,<br/>No Unauthorized Copy", icon: "🛡️" }
  ];
  exchangeItems.forEach((ei, idx) => {
    const eiy = 186 + idx * 76;
    cell(
      `ei_${idx}`,
      `<div style="display:flex;align-items:center;gap:8px;"><span style="font-size:24px;">${ei.icon}</span><div><div style="font-size:9px;font-weight:900;color:#0F172A;">${ei.t}</div><div style="font-size:7.5px;color:#64748B;font-weight:600;margin-top:2px;line-height:1.15;">${ei.sub}</div></div></div>`,
      1358,
      eiy,
      218,
      64,
      "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;padding=4;"
    );
  });

  // ==================== 6. MIDDLE-BOTTOM: MONITORING, AUDIT & ASSURANCE (x=16..1584, y=588..656) ====================
  cell("box_mon_audit", "", 16, 588, 1568, 68, "rounded=1;arcSize=6;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.5;");
  cell("lbl_mon_audit", "MONITORING, AUDIT & ASSURANCE", 16, 590, 1568, 14, "html=1;fontColor:#1E40AF;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");

  const monItems = [
    { t: "Continuous Monitoring", sub: "Security, Privacy,<br/>Compliance", icon: "⏱️" },
    { t: "Audit Logging", sub: "Immutable Logs,<br/>Tamper-Proof", icon: "📋" },
    { t: "Compliance Automation", sub: "Policy as Code,<br/>Continuous Evidence", icon: "⚙️" },
    { t: "Reporting & Transparency", sub: "Regulatory & Stakeholder<br/>Reports", icon: "📑" },
    { t: "Incident Response", sub: "Privacy Breach Mgmt,<br/>Forensics", icon: "🛡️" }
  ];
  monItems.forEach((mi, idx) => {
    const mix = 36 + idx * 308;
    cell(
      `mi_${idx}`,
      `<div style="display:flex;align-items:center;gap:8px;"><span style="font-size:22px;">${mi.icon}</span><div><div style="font-size:9px;font-weight:900;color:#0F172A;">${mi.t}</div><div style="font-size:7.5px;color:#64748B;font-weight:600;margin-top:2px;line-height:1.15;">${mi.sub}</div></div></div>`,
      mix,
      606,
      296,
      44,
      "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;padding=2;"
    );
  });

  // ==================== 7. BOTTOM ROW (y=664..786, h=122) ====================

  // Box 1: SUPPORTING SOVEREIGN SERVICES (x=16..360, w=344)
  cell("box_supp_serv", "", 16, 664, 344, 122, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("lbl_supp_serv", "SUPPORTING SOVEREIGN SERVICES", 16, 666, 344, 14, "html=1;fontColor:#475569;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;");

  const suppItems = [
    { t: "Sovereign<br/>DNS", icon: "🌐" },
    { t: "Sovereign<br/>PKI / CA", icon: "🛡️" },
    { t: "Time Sync<br/>(NTP)", icon: "⏱️" },
    { t: "Certificate<br/>Management", icon: "📑" },
    { t: "Secrets<br/>Management", icon: "🔒" }
  ];
  suppItems.forEach((si, idx) => {
    const six = 24 + idx * 66;
    cell(
      `si_${idx}`,
      `<div style="text-align:center;"><div style="font-size:18px;">${si.icon}</div><div style="font-size:7.5px;font-weight:800;color:#0F172A;line-height:1.15;margin-top:3px;">${si.t}</div></div>`,
      six,
      690,
      62,
      86,
      "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;padding=1;"
    );
  });

  // Box 2: COMPLIANCE FRAMEWORKS (x=368..770, w=402)
  cell("box_comp_fw", "", 368, 664, 402, 122, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("lbl_comp_fw", "COMPLIANCE FRAMEWORKS", 368, 666, 402, 14, "html=1;fontColor:#475569;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;");

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
    const bx = 376 + col * 96;
    const by = 688 + row * 44;
    cell(
      `cf_${idx}`,
      `<div style="text-align:center;"><div style="font-size:16px;">${bg.icon}</div><div style="font-size:7.5px;font-weight:900;color:#0F172A;line-height:1.1;">${bg.t}</div>${bg.sub ? `<div style="font-size:6.5px;color:#64748B;font-weight:600;">${bg.sub}</div>` : ""}</div>`,
      bx,
      by,
      92,
      40,
      "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;padding=1;"
    );
  });

  // Box 3: KEY PRINCIPLES (x=778..1210, w=432)
  cell("box_key_princ", "", 778, 664, 432, 122, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("lbl_key_princ", "KEY PRINCIPLES", 778, 666, 432, 14, "html=1;fontColor:#475569;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;");

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
    const px = 786 + col * 210;
    const py = 688 + row * 28;
    cell(`kp_${idx}`, `<div style="display:flex;align-items:center;gap:6px;"><span style="color:#16A34A;font-size:14px;font-weight:900;">☑</span><span style="font-size:7.5px;font-weight:800;color:#0F172A;">${pr}</span></div>`, px, py, 206, 24, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  });

  // Box 4: NOTES (x=1218..1584, w=366)
  cell("box_notes", "", 1218, 664, 366, 122, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;dashed=1;dashPattern=4 3;");
  cell("lbl_notes", "NOTES", 1226, 670, 80, 14, "html=1;fontColor:#0F172A;fontSize=8;fontStyle=1;align=left;verticalAlign=middle;");
  const notesHtml = `<div style="font-size:7.5px;color:#334155;line-height:1.45;font-weight:600;">` +
    `• All sensitive / personal data remains within sovereign boundary.<br/>` +
    `• Cross-border transfers only via approved legal mechanisms.<br/>` +
    `• All controls are auditable and continuously monitored.` +
    `</div>`;
  cell("txt_notes", notesHtml, 1226, 690, 350, 88, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  // ==================== 8. BOTTOM VALUE BADGES & FOOTER (y=796..860, h=64) ====================
  const valBadges = [
    { t: "Data Stays in<br/>Country / Region", icon: "🛡️" },
    { t: "Regulatory<br/>Compliance", icon: "🛡️" },
    { t: "Reduced Legal<br/>& Transfer Risk", icon: "⚙️" },
    { t: "Stronger Trust &<br/>Citizen Confidence", icon: "🤝" },
    { t: "Operational<br/>Independence", icon: "🏛️" }
  ];
  valBadges.forEach((vb, idx) => {
    const vbx = 16 + idx * 168;
    cell(
      `vb_${idx}`,
      `<div style="display:flex;align-items:center;gap:8px;"><span style="font-size:22px;">${vb.icon}</span><div style="font-size:8px;font-weight:900;color:#0F172A;line-height:1.2;">${vb.t}</div></div>`,
      vbx,
      796,
      160,
      56,
      "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#BFDBFE;strokeWidth=1.2;html=1;align=left;verticalAlign=middle;padding=4;"
    );
  });

  // Footer Legend Lines (x=880..1584, y=796..860)
  cell("bot_leg_box", "", 880, 796, 704, 56, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  const bLegs = [
    { t: "Sovereign Boundary (Data & Operations)", color: "#1D4ED8", style: "solid", y: 808 },
    { t: "Governance Boundary", color: "#7C3AED", style: "dashed", y: 824 },
    { t: "Monitoring & Audit Boundary", color: "#16A34A", style: "dotted", y: 840 }
  ];
  bLegs.forEach((bl, idx) => {
    cell(`bl_txt_${idx}`, `<span style="font-size:8px;font-weight:800;color:#0F172A;">${bl.t}</span>`, 960, bl.y - 6, 400, 14, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
    rawEdge(`bl_e_${idx}`, `edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=${bl.color};strokeWidth=2;${bl.style === "dashed" ? "dashed=1;dashPattern=4 2;" : bl.style === "dotted" ? "dashed=1;dashPattern=1 2;" : ""}endArrow=none;`, [
      { x: 900, y: bl.y },
      { x: 950, y: bl.y }
    ]);
  });

  // ==================== 9. INTER-LAYER CONNECTORS ====================
  // Governance -> Sovereign Environment
  rawEdge("e_gov_to_sov", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#7C3AED;strokeWidth=1.5;dashed=1;dashPattern=4 2;endArrow=classic;endSize=4;", [
    { x: 795, y: 148 },
    { x: 795, y: 156 }
  ]);

  // Users -> Secure Access -> Sovereign Cloud
  rawEdge("e_users_to_gate", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 240, y: 370 },
    { x: 246, y: 370 }
  ]);
  rawEdge("e_gate_to_sov", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 314, y: 370 },
    { x: 320, y: 370 }
  ]);

  // Sovereign Cloud -> Controlled Exchange -> Data Exchange
  rawEdge("e_sov_to_ctrl", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 1270, y: 370 },
    { x: 1278, y: 370 }
  ]);
  rawEdge("e_ctrl_to_exch", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 1346, y: 370 },
    { x: 1350, y: 370 }
  ]);

  // Sovereign Cloud <-> Monitoring
  rawEdge("e_sov_to_mon", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#16A34A;strokeWidth=1.5;dashed=1;dashPattern=2 2;endArrow=classic;startArrow=classic;endSize=4;startSize=4;", [
    { x: 795, y: 580 },
    { x: 795, y: 588 }
  ]);

  const bg = isDark ? "#0F172A" : "#FFFFFF";

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_39_sovereign_cloud_privacy" name="Template 39: Sovereign Cloud &amp; Data Privacy Blueprint">
    <mxGraphModel dx="1600" dy="1050" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="1050" background="${bg}" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${c.join("\n        ")}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
