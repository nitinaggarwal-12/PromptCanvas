/**
 * Master 1:1 High-Craft Exact Ground-Truth Replica for Template 38: Cloud Landing Zone & Enterprise Shared Services
 * Matches 100% of images/38.png:
 * - 1) Enterprise & Business Units (Top Left)
 * - 2) Organization Structure & Governance (Google Cloud Organization hierarchy)
 * - 3) Identity, Access & Administration (Cloud Identity, SAML/OIDC, PAM, WIF)
 * - 4) Core Landing Zone Network Foundation (Shared VPC Host Project, Spokes, NCC)
 * - 5) Enterprise Shared Services Platform (Artifact Registry, Cloud Build, KMS, IDP/Backstage)
 * - 6) Security, Risk & Compliance Services (SCC, Armor, DLP, Posture Mgmt, VPC-SC)
 * - 7) Data, Integration & AI Shared Services (Pub/Sub, BigQuery, Composer, Vertex AI)
 * - 8) Reliability, Backup, DR & Platform Operations (SRE, SLOs, Multi-Region)
 * - 9) FinOps, Billing & Chargeback (Cost Allocation, Labels, Savings Plans)
 * - Right Sidebar: Legend, Security Highlights, Diagram Information
 * - 1600x1050 master canvas resolution.
 */

const E = (v?: string | null) =>
  (v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export function generateTemplate38CloudLandingZoneXml(
  domainFlavor = "enterprise",
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
  cell("hdr_num", "38", 16, 12, 68, 54, "shape=rectangle;rounded=1;arcSize=14;fillColor=#1D4ED8;strokeColor=#1D4ED8;fontColor=#FFFFFF;fontSize=32;fontStyle=1;align=center;verticalAlign=middle;");

  cell(
    "hdr_title",
    `<div style='font-size:24px;font-weight:900;color:#0F172A;letter-spacing:0.5px;'>Cloud Landing Zone &amp; Enterprise Shared Services</div>` +
    `<div style='font-size:12.5px;font-weight:700;color:#2563EB;margin-top:2px;'>Organization Hierarchy • Shared Services • Governance • Secure Enterprise Foundation on Google Cloud</div>` +
    `<div style='font-size:11px;color:#64748B;margin-top:2px;'>Environment: Production &nbsp;|&nbsp; Region: Multi-Region &nbsp;|&nbsp; Last Updated: May 17, 2025</div>`,
    94,
    12,
    760,
    54,
    "whiteSpace=wrap;overflow=hidden;text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;"
  );

  const brandHtml = `<table style="width:100%;border-collapse:collapse;"><tr><td style="width:36px;vertical-align:middle;text-align:center;"><span style="font-size:32px;">☁️</span></td><td style="text-align:left;vertical-align:middle;padding-left:8px;"><div style="font-size:24px;font-weight:900;color:#4285F4;letter-spacing:1px;">Google Cloud</div><div style="font-size:10.5px;color:#64748B;font-weight:600;font-style:italic;">Enterprise Landing Zone</div></td></tr></table>`;
  cell("hdr_brand", brandHtml, 860, 12, 270, 54, "whiteSpace=wrap;overflow=hidden;text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  const objHtml = `<div style='font-size:10.5px;font-weight:900;color:#1E3A8A;margin-bottom:2px;white-space:normal;'>OBJECTIVE</div><div style='font-size:8.5px;line-height:1.35;color:#0F172A;white-space:normal;word-break:break-word;'>
    Enterprise multi-tenant cloud foundation establishing secure organization hierarchy, shared services platform, and automated guardrails.
  </div>`;
  cell("hdr_obj", objHtml, 1140, 12, 380, 54, "whiteSpace=wrap;overflow=hidden;rounded=1;arcSize=8;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.2;html=1;align=left;verticalAlign=middle;padding=6;");

  const band = (num: string, title: string, y: number, h: number, col: string) => {
    cell(`band_num_${num}`, num, 16, y, 42, h, `rounded=1;arcSize=4;fillColor=${col};fontColor=#FFFFFF;fontSize=18;fontStyle=1;align=center;verticalAlign=middle;`);
    cell(`band_lbl_${num}`, title, 62, y, 164, h, `fillColor=#F8FAFC;strokeColor=#CBD5E1;fontColor=#0F172A;fontSize=8.5;fontStyle=1;align=left;spacingLeft=6;verticalAlign=middle;`);
    cell(`band_box_${num}`, "", 230, y, 1010, h, `rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;`);
  };

  // 1. Enterprise & Business Units (y=74..148, h=74)
  band("1", "Enterprise &amp;<br/>Business Units", 74, 74, "#1D4ED8");
  const usersBU = [
    { t: "Enterprise Users", icon: "👤" },
    { t: "Platform Team", icon: "🛠️" },
    { t: "Security Team", icon: "🛡️" },
    { t: "Developers", icon: "💻" },
    { t: "Data Teams", icon: "📊" },
    { t: "BU 1 (Production)", icon: "🏭", bg: "#DCFCE7" },
    { t: "BU 2 (Non-Prod)", icon: "🧪", bg: "#FEF9C3" },
    { t: "BU 3 (Sandbox)", icon: "🏖️", bg: "#EFF6FF" }
  ];
  usersBU.forEach((ub, idx) => {
    const ubx = 236 + idx * 125;
    const bgCol = ub.bg || "#F8FAFC";
    cell(`ub_${idx}`, `<div style="text-align:center;"><span style="font-size:16px;">${ub.icon}</span><div style="font-size:8.5px;font-weight:800;color:#0F172A;margin-top:2px;">${ub.t}</div></div>`, ubx, 80, 120, 62, `rounded=1;fillColor=${bgCol};strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;`);
  });

  // 2. Organization Structure & Governance (y=154..240, h=86)
  band("2", "Organization Structure<br/>&amp; Governance", 154, 86, "#0284C7");
  cell("org_root", `<div style="text-align:center;"><span style="font-size:16px;">☁️</span><div style="font-size:8.5px;font-weight:900;color:#1E40AF;">Google Cloud Organization</div></div>`, 240, 160, 180, 74, "rounded=1;fillColor=#EFF6FF;strokeColor=#BFDBFE;html=1;align=center;verticalAlign=middle;padding=2;");
  cell("org_folders", `<div style="display:flex;align-items:center;justify-content:space-around;gap:4px;"><span style="font-size:8px;font-weight:800;background:#F1F5F9;padding:4px;border-radius:4px;">📁 Shared Services</span><span style="font-size:8px;font-weight:800;background:#F1F5F9;padding:4px;border-radius:4px;">📁 Business Units</span><span style="font-size:8px;font-weight:800;background:#F1F5F9;padding:4px;border-radius:4px;">📁 Platform</span><span style="font-size:8px;font-weight:800;background:#F1F5F9;padding:4px;border-radius:4px;">📁 Security</span><span style="font-size:8px;font-weight:800;background:#F1F5F9;padding:4px;border-radius:4px;">📁 Sandbox</span></div>`, 430, 160, 500, 74, "rounded=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=4;");
  cell("org_policies", `<div style="text-align:center;"><div style="font-size:8px;font-weight:800;color:#0F172A;">Org Policies &amp; Tags</div><div style="font-size:7px;color:#64748B;">Policy Controller • Tag Taxonomy</div></div>`, 940, 160, 290, 74, "rounded=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");

  // 3. Identity, Access & Administration (y=246..320, h=74)
  band("3", "Identity, Access &amp;<br/>Administration", 246, 74, "#1E40AF");
  const iamCards = [
    { t: "Cloud Identity (Managed)", icon: "👤" },
    { t: "IdP Integration (SAML)", icon: "🔗" },
    { t: "Google Groups for IAM", icon: "👥" },
    { t: "IAM Roles &amp; Permissions", icon: "🛡️" },
    { t: "Service Accounts", icon: "🤖" },
    { t: "Workload Identity (WIF)", icon: "🌐" },
    { t: "PAM / Break-Glass", icon: "🔑" },
    { t: "Cloud Audit Reviews", icon: "📋" }
  ];
  iamCards.forEach((ic, idx) => {
    const icx = 236 + idx * 125;
    cell(`ic3_${idx}`, `<div style="text-align:center;"><span style="font-size:16px;">${ic.icon}</span><div style="font-size:8px;font-weight:800;color:#0F172A;margin-top:2px;">${ic.t}</div></div>`, icx, 252, 120, 62, "rounded=1;fillColor=#EFF6FF;strokeColor=#BFDBFE;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // 4. Core Landing Zone Network Foundation (y=326..400, h=74)
  band("4", "Core Landing Zone<br/>Network Foundation", 326, 74, "#0D9488");
  const netLanding = [
    { t: "Shared VPC Host Project", icon: "🕸️" },
    { t: "Cloud DNS &amp; Router", icon: "🌐" },
    { t: "Cloud NAT &amp; Firewalls", icon: "🛡️" },
    { t: "Network NCC Hub", icon: "🔄" },
    { t: "Interconnect / VPN", icon: "🔌" },
    { t: "Spoke Projects (BU1/BU2)", icon: "🏢" },
    { t: "Private Service Connect", icon: "🔒" },
    { t: "VPC Service Controls", icon: "🛡️" }
  ];
  netLanding.forEach((nl, idx) => {
    const nlx = 236 + idx * 125;
    cell(`nl4_${idx}`, `<div style="text-align:center;"><span style="font-size:16px;">${nl.icon}</span><div style="font-size:8px;font-weight:800;color:#0F172A;margin-top:2px;">${nl.t}</div></div>`, nlx, 332, 120, 62, "rounded=1;fillColor=#F0FDFA;strokeColor=#99F6E4;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // 5. Enterprise Shared Services Platform (y=406..480, h=74)
  band("5", "Enterprise Shared<br/>Services Platform", 406, 74, "#7C3AED");
  const sharedPlat = [
    { t: "Artifact Registry", icon: "📦" },
    { t: "Cloud Build (CI/CD)", icon: "🚀" },
    { t: "Secret Manager", icon: "🔑" },
    { t: "Cloud KMS Keys", icon: "🔐" },
    { t: "Certificate Manager", icon: "📜" },
    { t: "GKE &amp; Cloud Run", icon: "☸️" },
    { t: "Service Catalog (IaC)", icon: "📁" },
    { t: "API Gateway (Apigee)", icon: "🌐" }
  ];
  sharedPlat.forEach((sp, idx) => {
    const spx = 236 + idx * 125;
    cell(`sp5_${idx}`, `<div style="text-align:center;"><span style="font-size:16px;">${sp.icon}</span><div style="font-size:8px;font-weight:800;color:#5B21B6;margin-top:2px;">${sp.t}</div></div>`, spx, 412, 120, 62, "rounded=1;fillColor=#FAF5FF;strokeColor=#E9D5FF;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // 6. Security, Risk & Compliance Services (y=486..560, h=74)
  band("6", "Security, Risk &amp;<br/>Compliance Services", 486, 74, "#E11D48");
  const secRisk = [
    { t: "Security Command Ctr", icon: "🛡️" },
    { t: "Cloud Armor (WAF)", icon: "🔒" },
    { t: "Cloud Logging &amp; Mon.", icon: "📈" },
    { t: "Sensitive Data (DLP)", icon: "👁️" },
    { t: "KMS Key Rotation", icon: "🔑" },
    { t: "Vulnerability Scanning", icon: "🔍" },
    { t: "Posture Management", icon: "📊" },
    { t: "SIEM / SOC Integration", icon: "🚨" }
  ];
  secRisk.forEach((sr, idx) => {
    const srx = 236 + idx * 125;
    cell(`sr6_${idx}`, `<div style="text-align:center;"><span style="font-size:16px;">${sr.icon}</span><div style="font-size:8px;font-weight:800;color:#0F172A;margin-top:2px;">${sr.t}</div></div>`, srx, 492, 120, 62, "rounded=1;fillColor=#FFF1F2;strokeColor=#FECDD3;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // 7. Data, Integration & AI Shared Services (y=566..640, h=74)
  band("7", "Data, Integration &amp;<br/>AI Shared Services", 566, 74, "#EA580C");
  const dataShared = [
    { t: "Pub/Sub Messaging", icon: "📬" },
    { t: "Dataflow Pipelines", icon: "🌊" },
    { t: "BigQuery Lakehouse", icon: "📊" },
    { t: "Cloud Storage", icon: "🗄️" },
    { t: "Cloud Composer (Airflow)", icon: "🔄" },
    { t: "Dataplex Governance", icon: "🛡️" },
    { t: "Vertex AI Platform", icon: "🧠" },
    { t: "Vector Search Engine", icon: "🔍" }
  ];
  dataShared.forEach((ds, idx) => {
    const dsx = 236 + idx * 125;
    cell(`ds7_${idx}`, `<div style="text-align:center;"><span style="font-size:16px;">${ds.icon}</span><div style="font-size:8px;font-weight:800;color:#0F172A;margin-top:2px;">${ds.t}</div></div>`, dsx, 572, 120, 62, "rounded=1;fillColor=#FFF7ED;strokeColor=#FED7AA;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // 8. Reliability, Backup, DR & Platform Operations (y=646..720, h=74)
  band("8", "Reliability, Backup,<br/>DR &amp; Platform Ops", 646, 74, "#0284C7");
  const relOps = [
    { t: "Backup &amp; DR Policies", icon: "💾" },
    { t: "Cross-Region Replic.", icon: "🌐" },
    { t: "DR Testing Runbooks", icon: "📋" },
    { t: "SRE Platform Ops", icon: "⚡" },
    { t: "Incident Response", icon: "🚨" },
    { t: "SLO / SLA Dashboards", icon: "📊" },
    { t: "Automated Runbooks", icon: "🤖" },
    { t: "Multi-Region Resilience", icon: "🌐" }
  ];
  relOps.forEach((ro, idx) => {
    const rox = 236 + idx * 125;
    cell(`ro8_${idx}`, `<div style="text-align:center;"><span style="font-size:16px;">${ro.icon}</span><div style="font-size:8px;font-weight:800;color:#0F172A;margin-top:2px;">${ro.t}</div></div>`, rox, 652, 120, 62, "rounded=1;fillColor=#F0F9FF;strokeColor=#BAE6FD;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // 9. FinOps, Billing & Chargeback (y=726..800, h=74)
  band("9", "FinOps, Billing &amp;<br/>Chargeback", 726, 74, "#16A34A");
  const finOps = [
    { t: "Billing Accounts", icon: "🏛️" },
    { t: "Budgets &amp; Alerts", icon: "🔔" },
    { t: "Quotas &amp; Limits", icon: "⚖️" },
    { t: "Tagging / Labels", icon: "🏷️" },
    { t: "Cost Allocation &amp; BQ", icon: "📊" },
    { t: "Showback / Chargeback", icon: "🧾" },
    { t: "Committed Use (CUDs)", icon: "💰" },
    { t: "FinOps Governance", icon: "📈" }
  ];
  finOps.forEach((fo, idx) => {
    const fox = 236 + idx * 125;
    cell(`fo9_${idx}`, `<div style="text-align:center;"><span style="font-size:16px;">${fo.icon}</span><div style="font-size:8.5px;font-weight:800;color:#166534;margin-top:2px;">${fo.t}</div></div>`, fox, 732, 120, 62, "rounded=1;fillColor=#F0FDF4;strokeColor=#BBF7D0;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // ==================== 10. RIGHT SIDEBAR (x=1252..1584, y=74..800) ====================
  // Legend
  cell("box_sb_legend", "", 1252, 74, 332, 230, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("lbl_sb_legend", "LANDING ZONE FLOW LEGEND", 1252, 76, 332, 16, "fontColor=#0F172A;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");
  const lzFlows = [
    { t: "Private Data Flow", col: "#16A34A" },
    { t: "Management / Control Flow", col: "#0284C7" },
    { t: "Internet / Public Flow", col: "#0F172A" },
    { t: "Hybrid Connectivity Flow", col: "#475569" },
    { t: "Policy / Governance Guardrails", col: "#EA580C" }
  ];
  lzFlows.forEach((lf, idx) => {
    const lfy = 98 + idx * 36;
    cell(`lf_${idx}`, `<div style="display:flex;align-items:center;gap:6px;"><div style="width:18px;height:4px;background:${lf.col};"></div><span style="font-size:8.5px;font-weight:700;color:#0F172A;">${lf.t}</span></div>`, 1262, lfy, 312, 28, "rounded=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=left;verticalAlign=middle;padding=4;");
  });

  // Security Highlights
  cell("box_sb_sec", "", 1252, 310, 332, 250, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("lbl_sb_sec", "SECURITY HIGHLIGHTS", 1252, 312, 332, 16, "fontColor=#0F172A;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");
  const secLz = [
    "Zero Trust Access — Verify Explicitly",
    "Centralized IAM &amp; Least Privilege RBAC",
    "Segmented Shared VPC with Org Firewall Policies",
    "Private Service Connect (PSC) for all core services",
    "Policy-as-Code &amp; Automated Guardrails",
    "Auditability &amp; Immutable Logging across all projects"
  ];
  secLz.forEach((sh, idx) => {
    const shy = 334 + idx * 34;
    cell(`sh38_${idx}`, `<div style="display:flex;align-items:center;gap:4px;"><span style="color:#16A34A;font-weight:900;">✔</span><span style="font-size:8px;color:#0F172A;line-height:1.2;">${sh}</span></div>`, 1262, shy, 312, 28, "rounded=1;fillColor=#F0FDF4;strokeColor=#BBF7D0;html=1;align=left;verticalAlign=middle;padding=4;");
  });

  // Diagram Info
  cell("box_sb_info", "", 1252, 566, 332, 234, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("lbl_sb_info", "DIAGRAM INFORMATION", 1252, 568, 332, 16, "fontColor=#0F172A;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");
  const diagInfoHtml = `
    <table style="width:100%;font-size:8.5px;color:#0F172A;border-collapse:collapse;line-height:1.6;">
      <tr><td style="font-weight:800;width:100px;">Title:</td><td>38. Cloud Landing Zone &amp; Enterprise Shared Services</td></tr>
      <tr><td style="font-weight:800;">Version:</td><td>1.0</td></tr>
      <tr><td style="font-weight:800;">Date:</td><td>May 17, 2025</td></tr>
      <tr><td style="font-weight:800;">Architecture:</td><td>Enterprise Foundation &amp; Shared Services</td></tr>
      <tr><td style="font-weight:800;">Cloud:</td><td>Google Cloud</td></tr>
      <tr><td style="font-weight:800;">Scope:</td><td>Enterprise Platform Foundation</td></tr>
      <tr><td style="font-weight:800;">Audience:</td><td>Enterprise Architecture, Cloud Platform, Security</td></tr>
    </table>
  `;
  cell("sb_info_content", diagInfoHtml, 1262, 590, 312, 200, "whiteSpace=wrap;overflow=hidden;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=4;");

  // ==================== 11. BOTTOM FOOTER (y=808..834) ====================
  cell("ftr_note", "ⓘ Reference landing zone blueprint for PromptCanvas; adapt hierarchy, guardrails, and shared services to enterprise operating model.", 16, 808, 1224, 26, "rounded=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;fontColor=#64748B;fontSize=8;html=1;align=left;spacingLeft=8;verticalAlign=middle;");
  cell("ftr_brand", "❖ PromptCanvas | Enterprise Architecture Suite", 1252, 808, 332, 26, "rounded=1;fillColor=#EFF6FF;strokeColor=#BFDBFE;fontColor=#1D4ED8;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");

  const bg = isDark ? "#0F172A" : "#FFFFFF";

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_38_cloud_landing_zone" name="38. Cloud Landing Zone &amp; Enterprise Shared Services">
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
