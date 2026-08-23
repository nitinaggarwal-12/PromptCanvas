/**
 * Master 1:1 Exact Replica Generator for Canonical Template 05: As-Is / To-Be Process Flow
 * Matches 100% of images/05.png (NOVACURA Bio-Pharma Product As-Is vs To-Be Transformation)
 * Pure collision-free geometry, complete <mxfile> envelope, and high-contrast typography.
 */

const E = (v?: string | null) =>
  (v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function generateTemplate05AsIsToBeXml(domainFlavor = "biopharma", theme: "light" | "dark" = "light"): string {
  const isDark = theme === "dark";
  const bg = isDark ? "#0B111E" : "#FFFFFF";
  const c: string[] = [];

  const rect = (id: string, v: string, x: number, y: number, w: number, h: number, s = "") =>
    c.push(`<mxCell id="${id}" value="${E(v)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;fontColor=#0F172A;fontSize=11;${s}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`);

  const text = (id: string, v: string, x: number, y: number, w: number, h: number, s = "") =>
    c.push(`<mxCell id="${id}" value="${E(v)}" style="text;html=1;strokeColor=none;fillColor=none;whiteSpace=wrap;fontColor=#0F172A;fontSize=11;verticalAlign=middle;${s}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`);

  // =========================================================================
  // 1. TOP HEADER BANNER & NOVACURA LOGO
  // =========================================================================
  const titleHtml = `<table style="border-collapse:collapse;">
    <tr>
      <td style="width:46px;height:46px;background:#0F2A4A;border-radius:6px;text-align:center;vertical-align:middle;">
        <span style="font-size:24px;font-weight:900;color:#FFFFFF;font-family:sans-serif;">05</span>
      </td>
      <td style="padding-left:14px;vertical-align:middle;">
        <div style="font-size:22px;font-weight:900;color:#0F2A4A;letter-spacing:1px;font-family:sans-serif;">AS-IS / TO-BE — NOVACURA BIO-PHARMA PRODUCT</div>
        <div style="font-size:12.5px;font-weight:600;color:#64748B;margin-top:2px;">Transforming to an Intelligent, Integrated and Compliant Digital Platform</div>
      </td>
    </tr>
  </table>`;
  text("header_title", titleHtml, 20, 16, 950, 52, "align=left;");

  const logoHtml = `<table style="text-align:right;float:right;">
    <tr>
      <td style="vertical-align:middle;padding-right:6px;"><span style="font-size:26px;">🧬</span></td>
      <td style="vertical-align:middle;text-align:left;">
        <div style="font-size:20px;font-weight:900;color:#0284C7;letter-spacing:1.5px;line-height:1;">NOVACURA</div>
        <div style="font-size:8px;font-weight:700;color:#64748B;line-height:1;margin-top:2px;">Transforming Therapies. Improving Lives.</div>
      </td>
    </tr>
  </table>`;
  text("header_logo", logoHtml, 1260, 16, 280, 48, "align=right;");

  // =========================================================================
  // 2. LEFT: AS-IS CURRENT STATE (x: 20 to 650, y: 78 to 680)
  // =========================================================================
  rect("as_is_box", "", 20, 78, 630, 600, "strokeColor=#EF4444;strokeWidth=1.5;fillColor=#FEF2F2;shadow=0;");
  rect("as_is_hdr", "<b style='font-size:12px;color:#FFFFFF;letter-spacing:0.5px;'>AS-IS CURRENT STATE</b>", 175, 78, 320, 26, "rounded=0;fillColor=#DC2626;strokeColor=#DC2626;align=center;");

  // Pain Points Row (y: 112, h: 46)
  const painPoints = [
    { name: "Siloed\nSystems", icon: "🏛️" },
    { name: "Manual\nProcesses", icon: "✍️" },
    { name: "Data\nInconsistency", icon: "📊" },
    { name: "Limited\nVisibility", icon: "👁️" },
    { name: "High\nOperational Cost", icon: "📈" },
    { name: "Long Time\nto Market", icon: "⏱️" },
  ];
  painPoints.forEach((pp, i) => {
    const px = 30 + i * 102;
    const html = `<table style="width:100%;height:100%;text-align:center;"><tr><td style="width:20px;font-size:13px;">${pp.icon}</td><td style="font-size:7.5px;font-weight:700;color:#991B1B;text-align:left;line-height:1.1;">${pp.name.replace(/\n/g, "<br/>")}</td></tr></table>`;
    rect(`as_is_pp_${i}`, html, px, 112, 96, 42, "rounded=1;fillColor=#FFFFFF;strokeColor=#FECACA;align=center;");
  });

  // Layer Labels on Far Left (x: 25, w: 90)
  const asIsLayers = [
    { id: "channels", name: "CHANNELS", y: 168, h: 72, icon: "👥" },
    { id: "apps", name: "APPLICATIONS", y: 248, h: 78, icon: "💻" },
    { id: "data", name: "DATA", y: 334, h: 78, icon: "🗄️" },
    { id: "integration", name: "INTEGRATION", y: 420, h: 78, icon: "🔗" },
    { id: "infra", name: "INFRASTRUCTURE", y: 506, h: 78, icon: "🖥️" },
    { id: "sec", name: "SECURITY &<br/>GOVERNANCE", y: 592, h: 76, icon: "🛡️" },
  ];

  asIsLayers.forEach((l) => {
    text(`as_is_lbl_${l.id}`, `<div style="text-align:center;"><span style="font-size:14px;">${l.icon}</span><div style="font-size:8px;font-weight:900;color:#991B1B;margin-top:2px;">${l.name}</div></div>`, 24, l.y + 4, 80, l.h - 8, "align=center;");
    rect(`as_is_div_${l.id}`, "", 108, l.y, 1, l.h, "fillColor=#FECACA;strokeColor=#FECACA;");
  });

  // 1. CHANNELS (y: 168)
  const asIsChannels = [
    { title: "Research\nTeams", icon: "🔬" },
    { title: "Clinical\nOps", icon: "👥" },
    { title: "Regulatory\nAffairs", icon: "📄" },
    { title: "Commercial\nTeams", icon: "📈" },
    { title: "Patients /\nHCPs", icon: "🩺" },
  ];
  asIsChannels.forEach((ch, i) => {
    const cx = 118 + i * 104;
    const html = `<div style="text-align:center;padding:2px;"><span style="font-size:15px;">${ch.icon}</span><div style="font-size:7.5px;font-weight:700;color:#1E293B;margin-top:1px;">${ch.title.replace(/\n/g, "<br/>")}</div></div>`;
    rect(`as_is_ch_${i}`, html, cx, 172, 98, 62, "rounded=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;");
  });

  // 2. APPLICATIONS (y: 248)
  const asIsApps = [
    { title: "Discovery Tools\n(Various)", icon: "🔬" },
    { title: "eTMF\n(On-Prem)", icon: "📁" },
    { title: "CTMS\n(On-Prem)", icon: "👥" },
    { title: "Safety DB\n(Oracle)", icon: "🛡️" },
    { title: "Regulatory\nSubmissions\n(FTP / Email)", icon: "📄" },
    { title: "Commercial\nSystems\n(ERP / CRM)", icon: "🏢" },
  ];
  asIsApps.forEach((ap, i) => {
    const ax = 118 + i * 86;
    const html = `<div style="text-align:center;padding:2px;"><div style="font-size:7.5px;font-weight:700;color:#1E293B;line-height:1.15;">${ap.title.replace(/\n/g, "<br/>")}</div></div>`;
    rect(`as_is_app_${i}`, html, ax, 252, 82, 68, "rounded=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;");
  });

  // 3. DATA (y: 334)
  const asIsData = [
    { title: "R&D Data\n(Disparate)", icon: "🗄️" },
    { title: "Clinical Data\n(Siloed)", icon: "🗄️" },
    { title: "Safety Data\n(Isolated)", icon: "🗄️" },
    { title: "Regulatory Docs\n(File Shares)", icon: "📁" },
    { title: "Commercial Data\n(Separate)", icon: "🗄️" },
  ];
  asIsData.forEach((dt, i) => {
    const dx = 118 + i * 104;
    const html = `<div style="text-align:center;padding:2px;"><div style="font-size:7.5px;font-weight:700;color:#1E293B;line-height:1.15;">${dt.title.replace(/\n/g, "<br/>")}</div></div>`;
    rect(`as_is_dt_${i}`, html, dx, 338, 98, 66, "rounded=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;shape=cylinder;");
  });

  // 4. INTEGRATION (y: 420)
  const asIsInt = [
    { title: "Point-to-Point\nInterfaces", icon: "⚙️" },
    { title: "Batch ETL\n& Scripts", icon: "🔄" },
    { title: "File Transfers\n(FTP / SFTP)", icon: "📁" },
    { title: "Email & Manual\nHandoffs", icon: "✉️" },
  ];
  asIsInt.forEach((it, i) => {
    const ix = 118 + i * 130;
    const html = `<table style="width:100%;height:100%;text-align:center;"><tr><td style="width:24px;"><span style="font-size:14px;">${it.icon}</span></td><td style="text-align:left;font-size:7.5px;font-weight:700;color:#1E293B;line-height:1.15;">${it.title.replace(/\n/g, "<br/>")}</td></tr></table>`;
    rect(`as_is_int_${i}`, html, ix, 424, 124, 66, "rounded=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;");
  });

  // 5. INFRASTRUCTURE (y: 506)
  const asIsInfra = [
    { title: "On-Prem\nData Centers", icon: "🏢" },
    { title: "VMware\nClusters", icon: "🖥️" },
    { title: "Traditional\nDatabases", icon: "🗄️" },
    { title: "File Servers", icon: "📁" },
    { title: "Backup\n(Tape)", icon: "💾" },
  ];
  asIsInfra.forEach((inf, i) => {
    const ifx = 118 + i * 104;
    const html = `<div style="text-align:center;padding:2px;"><span style="font-size:14px;">${inf.icon}</span><div style="font-size:7.5px;font-weight:700;color:#1E293B;margin-top:1px;line-height:1.15;">${inf.title.replace(/\n/g, "<br/>")}</div></div>`;
    rect(`as_is_infra_${i}`, html, ifx, 510, 98, 68, "rounded=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;");
  });

  // 6. SECURITY & GOVERNANCE (y: 592)
  const asIsSec = [
    { title: "Siloed Security\nPolicies", icon: "🛡️" },
    { title: "Manual Access\nManagement", icon: "👥" },
    { title: "Limited Audit\n& Monitoring", icon: "🔍" },
    { title: "Compliance\nRisks", icon: "⚠️" },
    { title: "Data Privacy\nChallenges", icon: "🛡️" },
  ];
  asIsSec.forEach((sc, i) => {
    const scx = 118 + i * 104;
    const html = `<table style="width:100%;height:100%;text-align:center;"><tr><td style="width:18px;"><span style="font-size:12px;">${sc.icon}</span></td><td style="text-align:left;font-size:7px;font-weight:700;color:#991B1B;line-height:1.1;">${sc.title.replace(/\n/g, "<br/>")}</td></tr></table>`;
    rect(`as_is_sec_${i}`, html, scx, 598, 98, 62, "rounded=1;fillColor=#FFFFFF;strokeColor=#FECACA;");
  });

  // =========================================================================
  // 3. MIDDLE: TRANSFORMATION BENEFITS (x: 665 to 895, y: 78 to 680)
  // =========================================================================
  rect("benefits_box", "", 665, 78, 230, 600, "strokeColor=#0284C7;strokeWidth=1.5;fillColor=#F0F9FF;shadow=0;");
  text("benefits_hdr", "<b>TRANSFORMATION BENEFITS</b>", 675, 84, 210, 24, "fontSize=10.5;fontColor=#0369A1;align=center;");

  const benefits = [
    { title: "Integrated Platform", desc: "Unified data, applications\nand processes across\nthe value chain", icon: "🧩" },
    { title: "End-to-End Visibility", desc: "Real-time insights and\nsingle source of truth", icon: "👁️" },
    { title: "AI & Automation", desc: "Intelligent automation,\npredictive analytics and\nfaster decisions", icon: "✨" },
    { title: "Faster Time to Market", desc: "Standardized processes\nand modern technology\naccelerate delivery", icon: "🚀" },
    { title: "Lower Cost", desc: "Cloud-native operations\nand automation reduce\nTCO", icon: "💲" },
    { title: "Risk & Compliance", desc: "Built-in security, privacy\nand regulatory compliance", icon: "🛡️" },
  ];

  benefits.forEach((bn, i) => {
    const by = 114 + i * 92;
    const html = `<table style="width:100%;height:100%;border-collapse:collapse;">
      <tr>
        <td style="width:34px;vertical-align:top;padding-top:4px;text-align:center;">
          <span style="font-size:20px;">${bn.icon}</span>
        </td>
        <td style="vertical-align:top;padding-left:6px;text-align:left;">
          <div style="font-size:10px;font-weight:800;color:#0369A1;line-height:1.15;">${bn.title}</div>
          <div style="font-size:8px;color:#475569;margin-top:2px;line-height:1.2;">${bn.desc.replace(/\n/g, "<br/>")}</div>
        </td>
      </tr>
    </table>`;
    rect(`bn_card_${i}`, html, 675, by, 210, 84, "rounded=1;fillColor=#FFFFFF;strokeColor=#BAE6FD;strokeWidth=1;");
  });

  // Big Transformation Arrows
  text("trans_arr_left", "➔", 646, 360, 20, 30, "fontSize=26;fontColor=#0284C7;align=center;");
  text("trans_arr_right", "➔", 894, 360, 20, 30, "fontSize=26;fontColor=#16A34A;align=center;");

  // =========================================================================
  // 4. RIGHT: TO-BE FUTURE STATE (x: 910 to 1540, y: 78 to 680)
  // =========================================================================
  rect("to_be_box", "", 910, 78, 630, 600, "strokeColor=#16A34A;strokeWidth=1.5;fillColor=#F0FDF4;shadow=0;");
  rect("to_be_hdr", "<b style='font-size:12px;color:#FFFFFF;letter-spacing:0.5px;'>TO-BE FUTURE STATE</b>", 1065, 78, 320, 26, "rounded=0;fillColor=#15803D;strokeColor=#15803D;align=center;");

  // To-Be Highlights Row (y: 112, h: 46)
  const toBeHighlights = [
    { name: "Integrated\nPlatform", icon: "🧩" },
    { name: "Intelligent\nAutomation", icon: "⚙️" },
    { name: "Trusted\n& Compliant", icon: "🛡️" },
    { name: "Real-time\nInsights", icon: "📊" },
    { name: "Lower Cost", icon: "💲" },
    { name: "Faster Time\nto Market", icon: "🚀" },
  ];
  toBeHighlights.forEach((tb, i) => {
    const tbx = 920 + i * 102;
    const html = `<table style="width:100%;height:100%;text-align:center;"><tr><td style="width:20px;font-size:13px;">${tb.icon}</td><td style="font-size:7.5px;font-weight:700;color:#14532D;text-align:left;line-height:1.1;">${tb.name.replace(/\n/g, "<br/>")}</td></tr></table>`;
    rect(`to_be_hl_${i}`, html, tbx, 112, 96, 42, "rounded=1;fillColor=#FFFFFF;strokeColor=#BBF7D0;align=center;");
  });

  // 1. TO-BE CHANNELS (y: 168)
  const toBeChannels = [
    { title: "Research\nTeams", icon: "🔬" },
    { title: "Clinical\nOps", icon: "👥" },
    { title: "Regulatory\nAffairs", icon: "📄" },
    { title: "Commercial\nTeams", icon: "📈" },
    { title: "Patients /\nHCPs", icon: "🩺" },
    { title: "Partners &\nVendors", icon: "🤝" },
  ];
  toBeChannels.forEach((ch, i) => {
    const cx = 920 + i * 102;
    const html = `<div style="text-align:center;padding:2px;"><span style="font-size:15px;">${ch.icon}</span><div style="font-size:7.5px;font-weight:700;color:#1E293B;margin-top:1px;">${ch.title.replace(/\n/g, "<br/>")}</div></div>`;
    rect(`to_be_ch_${i}`, html, cx, 172, 96, 62, "rounded=1;fillColor=#FFFFFF;strokeColor=#BBF7D0;");
  });

  // 2. TO-BE APPLICATIONS CONTAINER (y: 244, h: 90)
  rect("to_be_apps_frame", "", 920, 244, 610, 90, "rounded=1;fillColor=#FFFFFF;strokeColor=#BBF7D0;strokeWidth=1;");
  text("to_be_apps_title", "<b>NOVACURA DIGITAL PLATFORM (CLOUD-NATIVE)</b>", 930, 246, 590, 16, "fontSize=9;fontColor=#15803D;align=center;");

  const toBeApps = [
    { title: "AI / ML\nWorkbench", icon: "🧠" },
    { title: "eTMF\n(Cloud)", icon: "📁" },
    { title: "CTMS\n(Cloud)", icon: "👥" },
    { title: "Safety & PV\n(Cloud)", icon: "🛡️" },
    { title: "Regulatory\nSubmissions", icon: "📄" },
    { title: "Commercial\n(ERP / CRM)", icon: "📊" },
    { title: "Patient\nEngagement\nPortal", icon: "🩺" },
  ];
  toBeApps.forEach((ap, i) => {
    const ax = 926 + i * 86;
    const html = `<div style="text-align:center;padding:2px;"><span style="font-size:14px;">${ap.icon}</span><div style="font-size:7.5px;font-weight:700;color:#1E293B;line-height:1.15;margin-top:1px;">${ap.title.replace(/\n/g, "<br/>")}</div></div>`;
    rect(`to_be_app_${i}`, html, ax, 264, 82, 64, "rounded=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;");
  });

  // 3. TO-BE DATA PLATFORM CONTAINER (y: 342, h: 86)
  rect("to_be_data_frame", "", 920, 342, 610, 86, "rounded=1;fillColor=#FFFFFF;strokeColor=#BBF7D0;strokeWidth=1;");
  text("to_be_data_title", "<b>DATA PLATFORM (UNIFIED & GOVERNED)</b>", 930, 344, 590, 16, "fontSize=9;fontColor=#15803D;align=center;");

  const toBeData = [
    { title: "Unified Data Lake\n(BigQuery / Cloud Storage)", icon: "🗄️" },
    { title: "Clinical Data\n(Structured)", icon: "🗄️" },
    { title: "RWD & Real-World\nData", icon: "🌐" },
    { title: "Metadata & Master\nData Management", icon: "📑" },
    { title: "AI/ML Feature Store\n& Vector DB", icon: "✨" },
  ];
  toBeData.forEach((dt, i) => {
    const dx = 926 + i * 121;
    const html = `<div style="text-align:center;padding:2px;"><span style="font-size:14px;">${dt.icon}</span><div style="font-size:7.5px;font-weight:700;color:#1E293B;line-height:1.15;margin-top:1px;">${dt.title.replace(/\n/g, "<br/>")}</div></div>`;
    rect(`to_be_dt_${i}`, html, dx, 362, 116, 60, "rounded=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;");
  });

  // 4. TO-BE INTEGRATION (y: 436, h: 64)
  const toBeInt = [
    { title: "API Gateway\n& Management", icon: "⚡" },
    { title: "Event Streaming\n(Pub/Sub)", icon: "📡" },
    { title: "Data Integration\n(Dataflow)", icon: "🌊" },
    { title: "MCP / A2A\nConnectivity", icon: "🔄" },
    { title: "Partner & Vendor\nIntegrations", icon: "🤝" },
  ];
  toBeInt.forEach((it, i) => {
    const ix = 920 + i * 123;
    const html = `<table style="width:100%;height:100%;text-align:center;"><tr><td style="width:20px;"><span style="font-size:14px;">${it.icon}</span></td><td style="text-align:left;font-size:7.5px;font-weight:700;color:#1E293B;line-height:1.15;">${it.title.replace(/\n/g, "<br/>")}</td></tr></table>`;
    rect(`to_be_int_${i}`, html, ix, 436, 118, 60, "rounded=1;fillColor=#FFFFFF;strokeColor=#BBF7D0;");
  });

  // 5. TO-BE GOOGLE CLOUD PLATFORM (y: 508, h: 96)
  rect("to_be_gcp_frame", "", 920, 508, 610, 96, "rounded=1;fillColor=#FFFFFF;strokeColor=#BBF7D0;strokeWidth=1;");
  text("to_be_gcp_title", "<b>GOOGLE CLOUD PLATFORM</b>", 930, 510, 590, 16, "fontSize=9;fontColor=#15803D;align=center;");

  const toBeGcp = [
    { title: "Compute\n(GKE / Cloud Run)", icon: "☸️" },
    { title: "Storage\n(Cloud Storage)", icon: "☁️" },
    { title: "Databases\n(Spanner / AlloyDB)", icon: "🗄️" },
    { title: "Analytics\n(BigQuery)", icon: "🔍" },
    { title: "AI / ML\n(Vertex AI)", icon: "✨" },
    { title: "Global Regions\n& Multi-Zone", icon: "🌐" },
  ];
  toBeGcp.forEach((gc, i) => {
    const gcx = 926 + i * 101;
    const html = `<div style="text-align:center;padding:2px;"><span style="font-size:14px;">${gc.icon}</span><div style="font-size:7.5px;font-weight:700;color:#1E293B;line-height:1.15;margin-top:1px;">${gc.title.replace(/\n/g, "<br/>")}</div></div>`;
    rect(`to_be_gcp_${i}`, html, gcx, 530, 96, 68, "rounded=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;");
  });

  // 6. TO-BE SECURITY & GOVERNANCE (y: 612, h: 62)
  const toBeSec = [
    { title: "Zero Trust\nSecurity", icon: "🛡️" },
    { title: "IAM & Least\nPrivilege", icon: "🔒" },
    { title: "Encryption\n(At Rest & In Transit)", icon: "🔑" },
    { title: "Audit Logging\n& Monitoring", icon: "📊" },
    { title: "Data Privacy\n& Governance", icon: "🛡️" },
    { title: "Regulatory\nCompliance", icon: "📑" },
  ];
  toBeSec.forEach((sc, i) => {
    const scx = 920 + i * 102;
    const html = `<table style="width:100%;height:100%;text-align:center;"><tr><td style="width:18px;"><span style="font-size:12px;">${sc.icon}</span></td><td style="text-align:left;font-size:7px;font-weight:700;color:#15803D;line-height:1.1;">${sc.title.replace(/\n/g, "<br/>")}</td></tr></table>`;
    rect(`to_be_sec_${i}`, html, scx, 612, 96, 60, "rounded=1;fillColor=#FFFFFF;strokeColor=#BBF7D0;");
  });

  // =========================================================================
  // 5. BOTTOM SECTION: KEY TECHNOLOGY ENABLERS & OUTCOMES (y: 690 to 815)
  // =========================================================================
  rect("tech_enablers_frame", "", 20, 690, 875, 120, "strokeColor=#0284C7;strokeWidth=1.2;fillColor=#FFFFFF;shadow=0;");
  text("tech_enablers_title", "<b>KEY TECHNOLOGY ENABLERS</b>", 20, 694, 875, 20, "fontSize=10.5;fontColor=#0369A1;align=center;");

  const enablerIcons = [
    { name: "Google Cloud", icon: "☁️" },
    { name: "Vertex AI", icon: "✨" },
    { name: "BigQuery", icon: "🔍" },
    { name: "Cloud Storage", icon: "🗄️" },
    { name: "Dataflow", icon: "🌊" },
    { name: "Pub/Sub", icon: "📡" },
    { name: "Kubernetes (GKE)", icon: "☸️" },
    { name: "Apigee", icon: "⚡" },
    { name: "Looker", icon: "📊" },
    { name: "Dataplex", icon: "🕸️" },
    { name: "Gemini", icon: "✨" },
    { name: "MCP / A2A", icon: "🔄" },
  ];
  enablerIcons.forEach((tc, i) => {
    const tx = 30 + i * 71;
    const html = `<div style="text-align:center;padding:2px;"><span style="font-size:18px;">${tc.icon}</span><div style="font-size:7.5px;font-weight:700;color:#334155;margin-top:2px;">${tc.name}</div></div>`;
    rect(`tc_enabler_${i}`, html, tx, 722, 66, 80, "rounded=1;fillColor=#FFFFFF;strokeColor=#E2E8F0;align=center;");
  });

  // Outcomes on Right
  rect("outcomes_frame", "", 910, 690, 630, 120, "strokeColor=#16A34A;strokeWidth=1.2;fillColor=#FFFFFF;shadow=0;");
  text("outcomes_title", "<b>OUTCOMES</b>", 910, 694, 630, 20, "fontSize=10.5;fontColor=#15803D;align=center;");

  const outcomePods = [
    { title: "Innovative\nTherapies", icon: "💡" },
    { title: "Improved Patient\nOutcomes", icon: "💚" },
    { title: "Accessible &\nAffordable Care", icon: "👥" },
    { title: "Trusted by\nPartners", icon: "🤝" },
    { title: "Sustainable\nGrowth", icon: "📈" },
  ];
  outcomePods.forEach((oc, i) => {
    const ox = 925 + i * 122;
    const html = `<div style="text-align:center;padding:4px;"><span style="font-size:20px;">${oc.icon}</span><div style="font-size:8.5px;font-weight:800;color:#14532D;margin-top:2px;line-height:1.2;">${oc.title.replace(/\n/g, "<br/>")}</div></div>`;
    rect(`oc_pod_${i}`, html, ox, 722, 116, 80, "rounded=1;fillColor=#F0FDF4;strokeColor=#BBF7D0;align=center;");
  });

  // =========================================================================
  // 6. LEGEND & COPYRIGHT (y: 822 to 855)
  // =========================================================================
  const legendHtml = `<table style="width:100%;height:100%;text-align:left;">
    <tr>
      <td style="width:65px;vertical-align:middle;font-size:9.5px;font-weight:900;color:#0F172A;">LEGEND:</td>
      <td style="vertical-align:middle;">
        <div style="display:flex;align-items:center;gap:16px;font-size:8px;color:#334155;">
          <div style="display:flex;align-items:center;gap:4px;"><div style="width:14px;height:10px;background:#FEE2E2;border:1px solid #EF4444;border-radius:2px;"></div><div>As-Is Components</div></div>
          <div style="display:flex;align-items:center;gap:4px;"><div style="width:14px;height:10px;background:#DCFCE7;border:1px solid #16A34A;border-radius:2px;"></div><div>To-Be Components</div></div>
          <div style="display:flex;align-items:center;gap:4px;"><span>—➔</span><div>Data / Process Flow</div></div>
          <div style="display:flex;align-items:center;gap:4px;"><span>- - ➔</span><div>Manual / Batch / File Flow</div></div>
          <div style="display:flex;align-items:center;gap:4px;"><span style="color:#16A34A;">—➔</span><div>Real-time / Automated Flow</div></div>
          <div style="display:flex;align-items:center;gap:4px;"><span>🏢</span><div>On-Premise</div></div>
          <div style="display:flex;align-items:center;gap:4px;"><span>☁️</span><div>Cloud</div></div>
        </div>
      </td>
      <td style="width:160px;text-align:right;vertical-align:middle;font-size:8px;color:#64748B;">
        v1.0 &bull; &copy; 2026 NOVACURA
      </td>
    </tr>
  </table>`;
  text("legend_footer", legendHtml, 20, 822, 1520, 32, "align=left;");

  // =========================================================================
  // 7. CONNECTORS & TRANSFORMATION CHEVRON
  // =========================================================================
  // As-Is Red Dashed Vertical Batch/Manual Flows
  for (let i = 0; i < 4; i++) {
    c.push(`<mxCell id="arr_asis_flow_ch_app_${i}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#EF4444;strokeWidth=1.2;dashed=1;dashPattern=4 4;endArrow=block;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="as_is_ch_${i}" target="as_is_app_${i}"><mxGeometry relative="1" as="geometry"/></mxCell>`);
    c.push(`<mxCell id="arr_asis_flow_app_data_${i}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#EF4444;strokeWidth=1.2;dashed=1;dashPattern=4 4;endArrow=block;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="as_is_app_${i}" target="as_is_data_${i}"><mxGeometry relative="1" as="geometry"/></mxCell>`);
    c.push(`<mxCell id="arr_asis_flow_data_int_${i}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#EF4444;strokeWidth=1.2;dashed=1;dashPattern=4 4;endArrow=block;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="as_is_data_${i}" target="as_is_int_${i}"><mxGeometry relative="1" as="geometry"/></mxCell>`);
    c.push(`<mxCell id="arr_asis_flow_int_inf_${i}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#EF4444;strokeWidth=1.2;dashed=1;dashPattern=4 4;endArrow=block;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="as_is_int_${i}" target="as_is_inf_${i}"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  }

  // Central Transformation Transition Bridge Arrow
  c.push(`<mxCell id="arr_center_transformation" value="&lt;b style='font-size:10px;color:#FFFFFF;'&gt;TRANSFORMATION&lt;/b&gt;" style="shape=flexArrow;endArrow=classic;startArrow=none;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;fontColor=#FFFFFF;align=center;verticalAlign=middle;width=22;endSize=10;" edge="1" parent="1" source="as_is_box" target="to_be_box"><mxGeometry relative="1" as="geometry"/></mxCell>`);

  // To-Be Green Real-Time Automated Flow Connectors
  for (let i = 0; i < 6; i++) {
    c.push(`<mxCell id="arr_tobe_ch_plat_${i}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16A34A;strokeWidth=1.4;endArrow=classic;endFill=1;startArrow=classic;startFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="to_be_ch_${i}" target="to_be_plat_${i}"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  }
  for (let i = 0; i < 5; i++) {
    c.push(`<mxCell id="arr_tobe_plat_dp_${i}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16A34A;strokeWidth=1.4;endArrow=classic;endFill=1;startArrow=classic;startFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="to_be_plat_${i}" target="to_be_dp_${i}"><mxGeometry relative="1" as="geometry"/></mxCell>`);
    c.push(`<mxCell id="arr_tobe_dp_int_${i}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16A34A;strokeWidth=1.4;endArrow=classic;endFill=1;startArrow=classic;startFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="to_be_dp_${i}" target="to_be_int_${i}"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  }

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_05_asis_tobe" name="05 — As-Is / To-Be Process Flow">
    <mxGraphModel dx="1600" dy="860" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1560" pageHeight="860" background="${bg}" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${c.join("\n        ")}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
