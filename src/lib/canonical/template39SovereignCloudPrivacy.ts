/**
 * Master 1:1 High-Craft Exact Ground-Truth Replica for Template 39: Sovereign Cloud & Data Privacy Blueprint
 * Matches 100% of images/39.png:
 * - Top Enclave: Governance & Sovereign Oversight (Governance Board, DPO, Legal, Data Ethics, Audit)
 * - Left Column: Users & Stakeholders (Citizens, Employees, Partners, Regulators, Support + MFA/SSO Gate)
 * - Center: Sovereign Cloud Environment (In-Country / In-Region)
 *   - 4 Pods: Workloads, Data Services, Application Services, Identity & Access
 *   - Data Classification & Residency Enforcement (Public, Internal, Confidential, Restricted, Highly Restricted)
 *   - Privacy & Security Controls (Encryption KMS, Masking, DLP, Consent, HSM, Zero Trust)
 *   - Infrastructure Sovereignty (In-Country DCs, Sovereign Network, Operations, Backups)
 * - Right Column: Data Exchange & Controls (Cross-Border, Secure Exchange, Export Controls, Third-Party, Data Localization)
 * - Middle-Bottom: Monitoring, Audit & Assurance
 * - Bottom Row: Supporting Sovereign Services, Compliance Frameworks (GDPR, ISO 27001, SOC 2, NIST, eIDAS), Key Principles, Value Badges
 * - 1600x1050 master canvas resolution.
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

  const edge = (id: string, src: string, trg: string, style = "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;endSize=5;") =>
    c.push(
      `<mxCell id="${id}" edge="1" parent="1" source="${src}" target="${trg}" style="${style}"><mxGeometry relative="1" as="geometry"/></mxCell>`
    );

  // ==================== 1. TOP HEADER BANNER (y=12..66) ====================
  cell("hdr_num", "39", 16, 12, 68, 54, "shape=rectangle;rounded=1;arcSize=14;fillColor=#1E3A8A;strokeColor=#1E3A8A;fontColor=#FFFFFF;fontSize=32;fontStyle=1;align=center;verticalAlign=middle;");

  cell(
    "hdr_title",
    `<div style='font-size:24px;font-weight:900;color:#0F172A;letter-spacing:0.5px;'>Sovereign Cloud &amp; Data Privacy Blueprint</div>` +
    `<div style='font-size:12.5px;font-weight:700;color:#1E3A8A;margin-top:2px;'>Data Residency • Privacy by Design • Compliance • Sovereign Operations</div>` +
    `<div style='font-size:11px;color:#64748B;margin-top:2px;'>Scope: National &amp; Regional Cloud Sovereignty &nbsp;|&nbsp; Last Updated: May 21, 2025</div>`,
    94,
    12,
    760,
    54,
    "whiteSpace=wrap;overflow=hidden;text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;"
  );

  // Top Legend
  cell("top_legend", `<div style="display:flex;align-items:center;gap:12px;font-size:8.5px;font-weight:700;color:#0F172A;"><span style="font-weight:900;">LEGEND:</span><span>🔵 Data Flow</span><span>🟣 Control / Governance</span><span>🟢 Audit / Monitoring</span><span>🗄️ Data Store</span><span>⚙️ Process</span><span>🛡️ Trust Boundary</span></div>`, 860, 12, 720, 54, "rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=4;");

  // ==================== 2. TOP ENCLAVE: GOVERNANCE & SOVEREIGN OVERSIGHT (x=16..1580, y=74..148) ====================
  cell("box_gov_top", "", 16, 74, 1564, 74, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.5;");
  cell("lbl_gov_top", "GOVERNANCE &amp; SOVEREIGN OVERSIGHT", 16, 76, 1564, 16, "fontColor=#6D28D9;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");

  const govPods = [
    { t: "Sovereignty Governance Board", sub: "Policy, Oversight, Accountability", icon: "🏛️" },
    { t: "Privacy Office (DPO)", sub: "Data Protection &amp; Privacy Impact Assessments", icon: "🛡️" },
    { t: "Legal &amp; Compliance", sub: "Regulations, Contracts, Approvals", icon: "⚖️" },
    { t: "Data Ethics Board", sub: "Ethical Use, Fairness, Transparency", icon: "🧠" },
    { t: "Audit &amp; Assurance", sub: "Independent Audit, Assurance, Reporting", icon: "📋" }
  ];
  govPods.forEach((gp, idx) => {
    const gpx = 30 + idx * 310;
    cell(`gp_${idx}`, `<div style="display:flex;align-items:center;gap:6px;"><span style="font-size:20px;">${gp.icon}</span><div><div style="font-size:9.5px;font-weight:800;color:#0F172A;">${gp.t}</div><div style="font-size:8px;color:#64748B;margin-top:1px;">${gp.sub}</div></div></div>`, gpx, 94, 296, 48, "rounded=1;arcSize=4;fillColor=#FAF5FF;strokeColor=#E9D5FF;html=1;align=left;verticalAlign=middle;padding=4;");
  });

  // ==================== 3. LEFT COLUMN: USERS & STAKEHOLDERS (x=16..240, y=156..580) ====================
  cell("box_users_left", "", 16, 156, 224, 424, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;");
  cell("lbl_users_left", "USERS &amp; STAKEHOLDERS", 16, 158, 224, 18, "html=1;fillColor=#2563EB;fontColor=#FFFFFF;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");

  const stakeHolders = [
    { t: "Citizens / Customers", sub: "Portals, Apps, Self-Service", icon: "👤" },
    { t: "Employees", sub: "Internal Apps, Collaboration", icon: "👥" },
    { t: "Partners / Suppliers", sub: "Extranet, B2B Integrations", icon: "🤝" },
    { t: "Regulators / Authorities", sub: "Reporting, e-Discovery, Assurance", icon: "🏛️" },
    { t: "Support / Operations", sub: "IT Support, Operations Teams", icon: "🛠️" }
  ];
  stakeHolders.forEach((sh, idx) => {
    const shy = 186 + idx * 64;
    cell(`sh_${idx}`, `<div style="display:flex;align-items:center;gap:6px;"><span style="font-size:20px;">${sh.icon}</span><div><div style="font-size:9.5px;font-weight:800;color:#0F172A;">${sh.t}</div><div style="font-size:8px;color:#64748B;margin-top:1px;">${sh.sub}</div></div></div>`, 24, shy, 208, 56, "rounded=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=left;verticalAlign=middle;padding=4;");
  });

  // MFA / SSO Gate pill
  cell("gate_mfa", `<div style="text-align:center;"><span style="font-size:16px;">🔒</span><div style="font-size:8px;font-weight:800;color:#1E40AF;">Secure Access<br/>(MFA, SSO)</div></div>`, 244, 330, 70, 70, "rounded=1;fillColor=#EFF6FF;strokeColor=#BFDBFE;html=1;align=center;verticalAlign=middle;padding=2;");

  // ==================== 4. CENTER: SOVEREIGN CLOUD ENVIRONMENT (x=320..1270, y=156..580) ====================
  cell("box_sov_env", "", 320, 156, 950, 424, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#1E40AF;strokeWidth=2;");
  cell("lbl_sov_env", "🏛️ SOVEREIGN CLOUD ENVIRONMENT (In-Country / In-Region)", 320, 160, 950, 20, "html=1;fontColor=#1E40AF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");

  // 4 Core Pods (y=186..256)
  const sovPods = [
    { t: "Workloads", sub: "Sovereign Compute<br/>(VMs, Containers, Serverless)", icon: "☸️" },
    { t: "Data Services", sub: "Sovereign Storage,<br/>Databases, Analytics, AI/ML", icon: "🗄️" },
    { t: "Application Services", sub: "Integration, API,<br/>Messaging, Workflow", icon: "🔄" },
    { t: "Identity &amp; Access", sub: "Federated IAM,<br/>RBAC, PAM, CIEM", icon: "🛡️" }
  ];
  sovPods.forEach((sp, idx) => {
    const spx = 332 + idx * 232;
    cell(`sp_${idx}`, `<div style="display:flex;align-items:center;gap:6px;"><span style="font-size:22px;">${sp.icon}</span><div><div style="font-size:10px;font-weight:800;color:#0F172A;">${sp.t}</div><div style="font-size:7.5px;color:#64748B;line-height:1.2;margin-top:2px;">${sp.sub}</div></div></div>`, spx, 186, 224, 70, "rounded=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=left;verticalAlign=middle;padding=4;");
  });

  // Data Classification & Residency Enforcement Box (y=264..334)
  cell("box_data_class", "", 332, 264, 926, 70, "rounded=1;arcSize=4;fillColor=#F5F3FF;strokeColor=#DDD6FE;strokeWidth=1;");
  cell("lbl_data_class", "DATA CLASSIFICATION &amp; RESIDENCY ENFORCEMENT", 332, 266, 926, 14, "html=1;fontColor=#6D28D9;fontSize=8;fontStyle=1;align=center;verticalAlign=middle;");
  const classPills = [
    { t: "Public Data", bg: "#F1F5F9", fg: "#0F172A" },
    { t: "Internal Data", bg: "#EFF6FF", fg: "#1E40AF" },
    { t: "Confidential Data", bg: "#FEF9C3", fg: "#854D0E" },
    { t: "Restricted Data", bg: "#FFEDD5", fg: "#9A3412" },
    { t: "Highly Restricted / Personal Data", bg: "#FCE7F3", fg: "#9D174D" }
  ];
  classPills.forEach((cp, idx) => {
    const cpx = 340 + idx * 182;
    cell(`cp_${idx}`, `<div style="font-size:8px;font-weight:800;color:${cp.fg};text-align:center;">${cp.t}</div>`, cpx, 284, 174, 26, `rounded=1;arcSize=12;fillColor=${cp.bg};strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;`);
  });
  cell("lbl_class_sub", "Tagging • Labeling • Residency Rules • Automated Enforcement", 332, 314, 926, 16, "fontColor=#64748B;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;");

  // Privacy & Security Controls (y=342..450)
  cell("box_priv_sec", "", 332, 342, 926, 108, "rounded=1;arcSize=4;fillColor=#F0FDF4;strokeColor=#BBF7D0;strokeWidth=1.2;");
  cell("lbl_priv_sec", "PRIVACY &amp; SECURITY CONTROLS (Built-in)", 332, 344, 926, 16, "html=1;fontColor=#166534;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");
  const privControls = [
    { t: "Encryption", sub: "At Rest, In Transit, In Use (KMS)", icon: "🔐" },
    { t: "Data Masking", sub: "Pseudonymization &amp; Tokenization", icon: "🎭" },
    { t: "DLP &amp; Discovery", sub: "Sensitive Data Scanner", icon: "🔍" },
    { t: "Consent Mgmt", sub: "Preferences &amp; Rights", icon: "📋" },
    { t: "Key Management", sub: "Sovereign KMS / HSM", icon: "🔑" },
    { t: "Zero Trust", sub: "Identity-Aware Proxy", icon: "🛡️" }
  ];
  privControls.forEach((pc, idx) => {
    const pcx = 340 + idx * 152;
    cell(`pc39_${idx}`, `<div style="text-align:center;"><span style="font-size:18px;">${pc.icon}</span><div style="font-size:8.5px;font-weight:800;color:#0F172A;margin-top:2px;">${pc.t}</div><div style="font-size:7px;color:#64748B;margin-top:1px;">${pc.sub}</div></div>`, pcx, 364, 144, 78, "rounded=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // Infrastructure Sovereignty (y=458..566)
  cell("box_infra_sov", "", 332, 458, 926, 108, "rounded=1;arcSize=4;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.2;");
  cell("lbl_infra_sov", "INFRASTRUCTURE SOVEREIGNTY", 332, 460, 926, 16, "html=1;fontColor=#1E40AF;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");
  const infraSov = [
    { t: "In-Country / Region DCs", sub: "Dedicated Physical Isolation", icon: "🏢" },
    { t: "Sovereign Network", sub: "Private Backbone (No Public Transit)", icon: "🌐" },
    { t: "Sovereign Operations", sub: "Local Cleared Personnel &amp; Support", icon: "👥" },
    { t: "Sovereign Backups &amp; DR", sub: "In-Country Redundant Storage", icon: "💾" }
  ];
  infraSov.forEach((is, idx) => {
    const isx = 340 + idx * 230;
    cell(`is39_${idx}`, `<div style="display:flex;align-items:center;gap:6px;"><span style="font-size:22px;">${is.icon}</span><div><div style="font-size:9.5px;font-weight:800;color:#0F172A;">${is.t}</div><div style="font-size:8px;color:#64748B;margin-top:1px;">${is.sub}</div></div></div>`, isx, 480, 220, 76, "rounded=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=left;verticalAlign=middle;padding=4;");
  });

  // Controlled Exchange Gate
  cell("gate_exchange", `<div style="text-align:center;"><span style="font-size:16px;">🔒</span><div style="font-size:8px;font-weight:800;color:#1E40AF;">Controlled<br/>Exchange<br/>(Policy Engine)</div></div>`, 1276, 330, 80, 70, "rounded=1;fillColor=#EFF6FF;strokeColor=#BFDBFE;html=1;align=center;verticalAlign=middle;padding=2;");

  // ==================== 5. RIGHT COLUMN: DATA EXCHANGE & CONTROLS (x=1362..1580, y=156..580) ====================
  cell("box_exchange_right", "", 1362, 156, 218, 424, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;");
  cell("lbl_exchange_right", "DATA EXCHANGE &amp; CONTROLS", 1362, 158, 218, 18, "html=1;fillColor=#16A34A;fontColor=#FFFFFF;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");

  const exchangeCards = [
    { t: "Cross-Border Transfers", sub: "Approved Mechanisms (SCCs, BCRs)", icon: "🌐" },
    { t: "Secure Data Exchange", sub: "APIs, VPN, Private Links", icon: "🔄" },
    { t: "Data Export Controls", sub: "Policy Enforcement, Approvals", icon: "📑" },
    { t: "Third-Party Risk Mgmt", sub: "Due Diligence, Monitoring", icon: "👥" },
    { t: "Data Localization", sub: "Enforced Residency, No Leakage", icon: "📍" }
  ];
  exchangeCards.forEach((ec, idx) => {
    const ecy = 186 + idx * 64;
    cell(`ec39_${idx}`, `<div style="display:flex;align-items:center;gap:6px;"><span style="font-size:20px;">${ec.icon}</span><div><div style="font-size:9.5px;font-weight:800;color:#0F172A;">${ec.t}</div><div style="font-size:8px;color:#64748B;margin-top:1px;">${ec.sub}</div></div></div>`, 1370, ecy, 202, 56, "rounded=1;fillColor=#F0FDF4;strokeColor=#BBF7D0;html=1;align=left;verticalAlign=middle;padding=4;");
  });

  // ==================== 6. MIDDLE-BOTTOM: MONITORING, AUDIT & ASSURANCE (x=16..1580, y=590..660) ====================
  cell("box_mon_audit", "", 16, 590, 1564, 70, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.5;");
  cell("lbl_mon_audit", "MONITORING, AUDIT &amp; ASSURANCE", 16, 592, 1564, 16, "html=1;fontColor=#0284C7;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");
  const monAudit = [
    { t: "Continuous Monitoring", sub: "Security, Privacy, Compliance", icon: "⏱️" },
    { t: "Audit Logging", sub: "Immutable Logs, Tamper-Proof", icon: "📋" },
    { t: "Compliance Automation", sub: "Policy as Code, Continuous Evidence", icon: "🤖" },
    { t: "Reporting &amp; Transparency", sub: "Stakeholder &amp; Regulatory Reports", icon: "📑" },
    { t: "Incident Response", sub: "Privacy Breach Mgmt, Forensics", icon: "🚨" }
  ];
  monAudit.forEach((ma, idx) => {
    const max = 30 + idx * 310;
    cell(`ma_${idx}`, `<div style="display:flex;align-items:center;gap:6px;"><span style="font-size:20px;">${ma.icon}</span><div><div style="font-size:9.5px;font-weight:800;color:#0F172A;">${ma.t}</div><div style="font-size:8px;color:#64748B;margin-top:1px;">${ma.sub}</div></div></div>`, max, 610, 296, 44, "rounded=1;fillColor=#F0F9FF;strokeColor=#BAE6FD;html=1;align=left;verticalAlign=middle;padding=4;");
  });

  // ==================== 7. BOTTOM ROW: SUPPORTING SERVICES, FRAMEWORKS, PRINCIPLES, NOTES (x=16..1580, y=668..810) ====================
  // Supporting Sovereign Services (w=290)
  cell("box_supp_serv", "", 16, 668, 290, 142, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("lbl_supp_serv", "SUPPORTING SOVEREIGN SERVICES", 16, 670, 290, 16, "fontColor=#0F172A;fontSize=8;fontStyle=1;align=center;verticalAlign=middle;");
  const suppPills = [
    { t: "Sovereign DNS", icon: "🌐" },
    { t: "Sovereign PKI/CA", icon: "📜" },
    { t: "Time Sync (NTP)", icon: "⏱️" },
    { t: "Cert Manager", icon: "🔑" },
    { t: "Secrets Mgmt", icon: "🔒" }
  ];
  suppPills.forEach((sp, idx) => {
    const spx = 22 + (idx % 3) * 92;
    const spy = 690 + Math.floor(idx / 3) * 54;
    cell(`spill_${idx}`, `<div style="text-align:center;"><span style="font-size:14px;">${sp.icon}</span><div style="font-size:7.5px;font-weight:800;color:#0F172A;">${sp.t}</div></div>`, spx, spy, 88, 48, "rounded=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // Compliance Frameworks (w=360)
  cell("box_comp_fw", "", 314, 668, 360, 142, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("lbl_comp_fw", "COMPLIANCE FRAMEWORKS", 314, 670, 360, 16, "fontColor=#0F172A;fontSize=8;fontStyle=1;align=center;verticalAlign=middle;");
  const compBadges = [
    { t: "GDPR", bg: "#EFF6FF", fg: "#1E40AF" },
    { t: "ISO 27001", bg: "#F0FDF4", fg: "#166534" },
    { t: "ISO 27701 (Privacy)", bg: "#FEF9C3", fg: "#854D0E" },
    { t: "SOC 2 Type II", bg: "#FAF5FF", fg: "#6D28D9" },
    { t: "NIST Privacy", bg: "#FFF1F2", fg: "#9F1239" },
    { t: "eIDAS / Local Laws", bg: "#F0FDFA", fg: "#0D9488" }
  ];
  compBadges.forEach((cb, idx) => {
    const cbx = 322 + (idx % 3) * 114;
    const cby = 692 + Math.floor(idx / 3) * 52;
    cell(`cb_${idx}`, `<div style="font-size:9px;font-weight:900;color:${cb.fg};text-align:center;">${cb.t}</div>`, cbx, cby, 108, 46, `rounded=1;fillColor=${cb.bg};strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;`);
  });

  // Key Principles (w=500)
  cell("box_key_princ", "", 682, 668, 500, 142, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("lbl_key_princ", "KEY PRINCIPLES", 682, 670, 500, 16, "fontColor=#0F172A;fontSize=8;fontStyle=1;align=center;verticalAlign=middle;");
  const principles = [
    "Data Residency &amp; Sovereignty Guaranteed",
    "Privacy by Design &amp; Default",
    "Purpose Limitation &amp; Data Minimization",
    "Transparency &amp; Accountability",
    "Security &amp; Confidentiality (Zero Trust)",
    "User Rights &amp; Access Control"
  ];
  principles.forEach((pr, idx) => {
    const prx = 690 + (idx % 2) * 244;
    const pry = 692 + Math.floor(idx / 2) * 36;
    cell(`pr_${idx}`, `<div style="display:flex;align-items:center;gap:4px;"><span style="color:#16A34A;font-weight:900;">✔</span><span style="font-size:8.5px;color:#0F172A;font-weight:700;">${pr}</span></div>`, prx, pry, 238, 30, "rounded=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=left;verticalAlign=middle;padding=4;");
  });

  // Notes (w=390)
  cell("box_sov_notes", "", 1190, 668, 390, 142, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("lbl_sov_notes", "NOTES &amp; AUDITABILITY", 1190, 670, 390, 16, "fontColor=#0F172A;fontSize=8;fontStyle=1;align=center;verticalAlign=middle;");
  const sovNotesHtml = `
    <ul style="margin:0;padding-left:14px;font-size:8px;color:#0F172A;line-height:1.5;">
      <li>All sensitive / personal data remains strictly within sovereign boundary.</li>
      <li>Cross-border transfers only via approved legal mechanisms (SCCs/BCRs).</li>
      <li>All access and administrative actions are auditable and continuously monitored.</li>
    </ul>
  `;
  cell("sov_notes_text", sovNotesHtml, 1196, 690, 378, 112, "whiteSpace=wrap;overflow=hidden;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=2;");

  // ==================== 8. BOTTOM VALUE BADGES (y=818..860) ====================
  const valueBadges = [
    { t: "Data Stays in Country/Region", icon: "🛡️" },
    { t: "Regulatory Compliance", icon: "⚖️" },
    { t: "Reduced Legal &amp; Transfer Risk", icon: "📉" },
    { t: "Stronger Trust &amp; Citizen Confidence", icon: "🤝" },
    { t: "Operational Independence", icon: "🏛️" }
  ];
  valueBadges.forEach((vb, idx) => {
    const vbx = 16 + idx * 314;
    cell(`vb_${idx}`, `<div style="display:flex;align-items:center;gap:6px;justify-content:center;"><span style="font-size:16px;">${vb.icon}</span><span style="font-size:9px;font-weight:900;color:#1E40AF;">${vb.t}</span></div>`, vbx, 818, 306, 38, "rounded=1;fillColor=#EFF6FF;strokeColor=#BFDBFE;html=1;align=center;verticalAlign=middle;padding=4;");
  });

  // Footer
  cell("ftr_sov_note", "ⓘ Sovereign reference architecture for PromptCanvas; adapt boundary definitions, key management, and data classification to local regulatory requirements.", 16, 864, 1564, 24, "rounded=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;fontColor=#64748B;fontSize=8;html=1;align=left;spacingLeft=8;verticalAlign=middle;");

  const bg = isDark ? "#0F172A" : "#FFFFFF";

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_39_sovereign_cloud_privacy" name="39. Sovereign Cloud &amp; Data Privacy Blueprint">
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
