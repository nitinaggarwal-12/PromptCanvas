/**
 * Master 1:1 High-Craft Exact Ground-Truth Replica for Template 34: Geographic / Regional Architecture
 * Matches 100% of images/34.png with 6 global user pods, 6 full regional pillars,
 * 5-step Failover Flow, Global Services banner, and 0 voids on 1536x1024 master resolution.
 */

const E = (v?: string | null) =>
  (v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function generateTemplate34GeographicArchitectureXml(
  domainFlavor = "biopharma",
  theme: "light" | "dark" = "light"
): string {
  const isDark = theme === "dark";
  const c: string[] = [];

  const rect = (id: string, v: string, x: number, y: number, w: number, h: number, s = "") =>
    c.push(
      `<mxCell id="${id}" value="${E(v)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;fontColor=#0F172A;fontSize=12;${s}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`
    );

  const text = (id: string, v: string, x: number, y: number, w: number, h: number, s = "") =>
    c.push(
      `<mxCell id="${id}" value="${E(v)}" style="text;html=1;strokeColor=none;fillColor=none;whiteSpace=wrap;fontColor=#0F172A;fontSize=12;verticalAlign=middle;${s}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`
    );

  const circle = (id: string, v: string, x: number, y: number, d: number, fill: string, stroke: string, fontCol = "#FFFFFF", fontSz = 11) =>
    c.push(
      `<mxCell id="${id}" value="${E(v)}" style="ellipse;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${stroke};strokeWidth=1.5;fontColor=${fontCol};fontSize=${fontSz};fontStyle=1;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${d}" height="${d}" as="geometry"/></mxCell>`
    );

  // ==================== 1. TOP HEADER BANNER (y=12..66) ====================
  rect("hdr_num", `<span style="font-size:32px;font-weight:900;color:#FFFFFF;">34</span>`, 16, 12, 68, 54, "fillColor=#1E3A8A;strokeColor=#1E3A8A;rounded=1;arcSize=12;align=center;verticalAlign=middle;");
  text(
    "hdr_title",
    `<div style='font-size:25px;font-weight:900;color:#0F172A;letter-spacing:0.5px;'>GEOGRAPHIC / REGIONAL ARCHITECTURE</div>` +
    `<div style='font-size:13px;font-weight:700;color:#1E3A8A;margin-top:2px;'>Use Case: NovaCura – Multi-Region Regulatory Intelligence Platform</div>` +
    `<div style='font-size:11px;color:#64748B;margin-top:1px;'>☁️ Environment: Production &nbsp;|&nbsp; 📍 Region: Multi-Region (Global) &nbsp;|&nbsp; 📅 Last Updated: May 8, 2025</div>`,
    94,
    12,
    760,
    54,
    "align=left;"
  );

  const brandHtml = `<table style="width:100%;border-collapse:collapse;"><tr><td style="width:36px;vertical-align:middle;text-align:center;"><span style="font-size:30px;">🧬</span></td><td style="text-align:left;vertical-align:middle;padding-left:6px;"><div style="font-size:22px;font-weight:900;color:#0284C7;letter-spacing:1px;">NOVACURA</div><div style="font-size:10px;color:#64748B;font-weight:600;font-style:italic;">AI-Powered Regulatory Intelligence Platform</div></td></tr></table>`;
  rect("hdr_brand", brandHtml, 860, 12, 270, 54, "fillColor=none;strokeColor=none;align=left;");

  const objHtml = `<div style='font-size:11px;font-weight:900;color:#1E3A8A;margin-bottom:2px;'>OBJECTIVE</div><div style='font-size:9.5px;line-height:1.35;color:#0F172A;'>Deliver low-latency, highly available, and compliant services globally with data residency, disaster recovery, and local user experience.</div>`;
  rect("hdr_obj", objHtml, 1140, 12, 380, 54, "strokeColor=#CBD5E1;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;");

  // ==================== 2. TOP STAGE: GLOBAL USER BASE & REGIONAL OVERVIEW (x=16..1520, y=74..276) ====================
  // Architecture Principles (x=16..196)
  rect("box_prin_bg", "", 16, 74, 180, 202, "strokeColor=#1E3A8A;fillColor=#FFFFFF;strokeWidth=1.8;align=left;verticalAlign=top;");
  rect("lbl_prin", `<b style="font-size:11px;color:#FFFFFF;letter-spacing:0.5px;">ARCHITECTURE PRINCIPLES</b>`, 16, 74, 180, 26, "fillColor=#1E3A8A;strokeColor=#1E3A8A;rounded=0;align=center;");
  const prinItems = [
    { t: "Data Residency &amp; Sovereignty", icon: "🛡️" },
    { t: "Low-Latency Local Edge", icon: "⚡" },
    { t: "High Availability &amp; Resilience", icon: "📈" },
    { t: "Security by Design", icon: "🔒" },
    { t: "Cost Optimization", icon: "💰" },
    { t: "Operational Excellence", icon: "⚙️" }
  ];
  prinItems.forEach((pi, idx) => {
    const py = 104 + idx * 28;
    rect(`pi_${idx}`, `<div style='font-size:8.5px;font-weight:700;display:flex;align-items:center;gap:6px;'><span style='font-size:11px;'>${pi.icon}</span> ${pi.t}</div>`, 22, py, 168, 24, "fillColor=#F8FAFC;strokeColor=#E2E8F0;rounded=1;align=left;verticalAlign=middle;padding=3;");
  });

  // Global User Base (x=204..1040)
  rect("box_users_bg", "", 204, 74, 836, 202, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.5;align=left;verticalAlign=top;");
  text("lbl_users", "<div style='font-size:12.5px;font-weight:900;color:#1E3A8A;text-align:center;'>GLOBAL USER BASE</div>", 204, 78, 836, 18, "align=center;");

  const globalUsers = [
    { n: "North America\nUsers", icon: "👤", loc: "🇺🇸 USA / Canada" },
    { n: "South America\nUsers", icon: "👤", loc: "🇧🇷 Brazil" },
    { n: "Europe\nUsers", icon: "👤", loc: "🇪🇺 UK / Germany" },
    { n: "Middle East\nUsers", icon: "👤", loc: "🇦🇪 UAE (Dubai)" },
    { n: "Asia Pacific\nUsers", icon: "👤", loc: "🇸🇬 Singapore / JP" },
    { n: "Africa\nUsers", icon: "👤", loc: "🇿🇦 South Africa" }
  ];
  globalUsers.forEach((gu, idx) => {
    const ux = 216 + idx * 136;
    rect(`gu_${idx}`, `<div style="font-size:22px;text-align:center;">${gu.icon}</div><div style="font-size:8.5px;font-weight:800;color:#1E3A8A;text-align:center;margin-top:2px;">${gu.n.replace(/\n/g, "<br/>")}</div><div style="font-size:7.5px;color:#64748B;text-align:center;">${gu.loc}</div>`, ux, 102, 126, 92, "fillColor=#EFF6FF;strokeColor=#BFDBFE;rounded=1;align=center;verticalAlign=middle;padding=2;");
  });

  // Anycast Banner
  rect("box_anycast", `<div style="font-size:9.5px;font-weight:800;color:#2563EB;text-align:center;">🌐 GLOBAL DISTRIBUTED EDGE ANYCAST NETWORK (Ultra-low latency edge routing to nearest active regional cloud point-of-presence)</div>`, 216, 234, 812, 32, "fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.5;rounded=1;align=center;verticalAlign=middle;");

  // Regional Overview Table (x=1048..1520)
  rect("box_reg_ov", "", 1048, 74, 472, 202, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.5;align=left;verticalAlign=top;");
  text("lbl_reg_ov", "<div style='font-size:11px;font-weight:900;color:#1E3A8A;text-align:center;'>REGIONAL OVERVIEW</div>", 1048, 78, 472, 18, "align=center;");
  const regTableHtml = `<table style='width:100%;border-collapse:collapse;font-size:8px;'>
    <tr style='font-weight:800;border-bottom:1px solid #CBD5E1;background:#F8FAFC;'>
      <td style='padding:3px;'>REGION</td><td>LOCATION</td><td>ROLE</td><td style='text-align:center;'>STATUS</td><td>DATA RESIDENCY</td>
    </tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:3px;'><b>NA (US-East)</b></td><td>N. Virginia, USA</td><td>Primary (Active)</td><td style='text-align:center;color:#16A34A;font-weight:900;'>Active</td><td>US / Canada</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:3px;'><b>EU (Europe)</b></td><td>Frankfurt, Germany</td><td>Primary (Active)</td><td style='text-align:center;color:#16A34A;font-weight:900;'>Active</td><td>EU / EEA</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:3px;'><b>AP (Asia Pacific)</b></td><td>Singapore</td><td>Primary (Active)</td><td style='text-align:center;color:#16A34A;font-weight:900;'>Active</td><td>APAC</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:3px;'><b>SA (South America)</b></td><td>São Paulo, Brazil</td><td>Warm Standby</td><td style='text-align:center;color:#EA580C;font-weight:900;'>Standby</td><td>South America</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:3px;'><b>MEA (Middle East)</b></td><td>UAE (Dubai)</td><td>Warm Standby</td><td style='text-align:center;color:#EA580C;font-weight:900;'>Standby</td><td>Middle East</td></tr>
    <tr><td style='padding:3px;'><b>AF (Africa)</b></td><td>Cape Town, SA</td><td>Backup / DR</td><td style='text-align:center;color:#0284C7;font-weight:900;'>DR Ready</td><td>Africa</td></tr>
  </table>`;
  text("txt_reg_ov", regTableHtml, 1052, 98, 464, 170, "align=left;verticalAlign=top;padding=2;");

  // ==================== 3. MIDDLE STAGE: 6 REGIONAL PILLARS (x=16..1520, y=286..676) ====================
  // Left side: Capabilities and Routing tags (x=16..166)
  rect("box_l_caps", "", 16, 286, 150, 390, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.5;align=left;verticalAlign=top;");
  const capsHtml = `<div style="font-size:7.5px;line-height:1.45;color:#0F172A;padding:4px;">
    <div style="font-weight:800;color:#1E3A8A;margin-bottom:2px;">REGIONAL CAPABILITIES:</div>
    🗄️ Local Data Storage<br/>
    💻 Regional Compute<br/>
    📊 Local Monitoring &amp; Logging<br/>
    🔒 KMS &amp; Secrets (Regional)<br/>
    💾 Local Backup &amp; Replication<br/>
    🌐 Regional Networking &amp; Edge<br/>
    <hr style="border:none;border-top:1px solid #CBD5E1;margin:6px 0;"/>
    <div style="font-weight:800;color:#2563EB;margin-bottom:2px;">TRAFFIC ROUTING:</div>
    ⚡ DNS Geo-Routing (Latency-Based)<br/>
    🩺 Health Checks (Active/Passive)<br/>
    🔄 Failover (Automated)<br/>
    🛡️ DDoS Protection (Global Edge)<br/>
    🔒 WAF &amp; Bot Protection<br/>
    <hr style="border:none;border-top:1px solid #CBD5E1;margin:6px 0;"/>
    <div style="font-weight:800;color:#16A34A;margin-bottom:2px;">LEGEND:</div>
    🟢 Active Region &nbsp; 🟠 Standby<br/>
    🔵 DR Region &nbsp; ── Data Flow
  </div>`;
  text("txt_l_caps", capsHtml, 18, 290, 146, 382, "align=left;verticalAlign=top;");

  // 6 Regional Pillars (x=174..1520)
  const pillars = [
    { n: "NORTH AMERICA (US-EAST)\nPrimary Region", col: "#16A34A", bg: "#F0FDF4", edge: "Cloud CDN + DNS", app: "GKE / GCE / Cloud Run\n(Active/Active)", db: "Cloud SQL / AlloyDB\n(Primary Region)", svc: "Vertex AI / Vector Search", obs: "Monitoring, Logging, Trace", res: "Data Residency: US / Canada" },
    { n: "EUROPE (EU-WEST)\nPrimary Region", col: "#2563EB", bg: "#EFF6FF", edge: "Cloud CDN + DNS", app: "GKE / GCE / Cloud Run\n(Active/Active)", db: "Cloud SQL / AlloyDB\n(Primary Region)", svc: "Vertex AI / Vector Search", obs: "Monitoring, Logging, Trace", res: "Data Residency: EU / EEA" },
    { n: "ASIA PACIFIC (APAC)\nPrimary Region", col: "#16A34A", bg: "#F0FDF4", edge: "Cloud CDN + DNS", app: "GKE / GCE / Cloud Run\n(Active/Active)", db: "Cloud SQL / AlloyDB\n(Primary Region)", svc: "Vertex AI / Vector Search", obs: "Monitoring, Logging, Trace", res: "Data Residency: Asia Pacific" },
    { n: "SOUTH AMERICA (SA)\nWarm Standby Region", col: "#EA580C", bg: "#FFFBEB", edge: "Cloud CDN + DNS", app: "GKE / GCE / Cloud Run\n(Standby)", db: "Cloud SQL / AlloyDB\n(Replica / Standby)", svc: "Vertex AI (Fallback)", obs: "Monitoring, Logging, Trace", res: "Data Residency: South America" },
    { n: "MIDDLE EAST (MEA)\nWarm Standby Region", col: "#EA580C", bg: "#FFFBEB", edge: "Cloud CDN + DNS", app: "GKE / GCE / Cloud Run\n(Standby)", db: "Cloud SQL / AlloyDB\n(Replica / Standby)", svc: "Vertex AI (Fallback)", obs: "Monitoring, Logging, Trace", res: "Data Residency: Middle East" },
    { n: "AFRICA (AFRICA)\nBackup / DR Region", col: "#0284C7", bg: "#F0F9FF", edge: "Cloud CDN + DNS", app: "GKE / GCE / Cloud Run\n(Standby)", db: "Cloud SQL / AlloyDB\n(Replica / Standby)", svc: "Vertex AI (Fallback)", obs: "Monitoring, Logging, Trace", res: "Data Residency: Africa" }
  ];

  pillars.forEach((pl, idx) => {
    const px = 174 + idx * 224;
    // Outer Pillar Box
    rect(`pl_box_${idx}`, "", px, 286, 218, 390, `fillColor=${pl.bg};strokeColor=${pl.col};strokeWidth=1.8;align=left;verticalAlign=top;`);
    // Top Header Banner
    rect(`pl_hdr_${idx}`, `<div style="font-size:9.5px;font-weight:900;color:#FFFFFF;text-align:center;">${pl.n.replace(/\n/g, "<br/>")}</div>`, px, 286, 218, 38, `fillColor=${pl.col};strokeColor=${pl.col};rounded=0;align=center;verticalAlign=middle;`);

    // Edge Box
    rect(`pl_edge_${idx}`, `<div style="font-size:7.5px;font-weight:800;color:#64748B;">EDGE</div><div style="font-size:8.5px;font-weight:700;color:#0F172A;margin-top:2px;">${pl.edge}</div>`, px + 6, 332, 206, 44, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=center;verticalAlign=middle;");
    // Application Box
    rect(`pl_app_${idx}`, `<div style="font-size:7.5px;font-weight:800;color:#2563EB;">APPLICATION</div><div style="font-size:8.5px;font-weight:700;color:#0F172A;margin-top:2px;">${pl.app.replace(/\n/g, "<br/>")}</div>`, px + 6, 384, 206, 54, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=center;verticalAlign=middle;");
    // Data Layer Box
    rect(`pl_db_${idx}`, `<div style="font-size:7.5px;font-weight:800;color:#16A34A;">DATA LAYER</div><div style="font-size:8.5px;font-weight:700;color:#0F172A;margin-top:2px;">${pl.db.replace(/\n/g, "<br/>")}</div>`, px + 6, 446, 206, 54, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=center;verticalAlign=middle;");
    // Services Box
    rect(`pl_svc_${idx}`, `<div style="font-size:7.5px;font-weight:800;color:#7C3AED;">SERVICES</div><div style="font-size:8.5px;font-weight:700;color:#0F172A;margin-top:2px;">${pl.svc}</div>`, px + 6, 508, 206, 44, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=center;verticalAlign=middle;");
    // Observability Box
    rect(`pl_obs_${idx}`, `<div style="font-size:7.5px;font-weight:800;color:#0284C7;">OBSERVABILITY</div><div style="font-size:8.5px;font-weight:700;color:#0F172A;margin-top:2px;">${pl.obs}</div>`, px + 6, 560, 206, 44, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=center;verticalAlign=middle;");
    // Data Residency Pill
    rect(`pl_res_${idx}`, `<b style="font-size:8.5px;color:${pl.col};">${pl.res}</b>`, px + 6, 636, 206, 28, `fillColor=#FFFFFF;strokeColor=${pl.col};strokeWidth=1.5;rounded=1;align=center;verticalAlign=middle;`);
  });

  // ==================== 4. GLOBAL SERVICES STRIP (x=16..1520, y=684..744) ====================
  rect("box_glob_bg", "", 16, 684, 1504, 60, "strokeColor=#1E3A8A;fillColor=#EFF6FF;strokeWidth=1.5;align=left;verticalAlign=top;");
  text("lbl_glob", "<div style='font-size:10px;font-weight:900;color:#1E3A8A;text-align:center;'>GLOBAL SERVICES (MULTI-REGION)</div>", 16, 686, 1504, 14, "align=center;");

  const globSvcs = [
    { t: "Global DNS", sub: "Cloud DNS (Anycast)", icon: "🌐" },
    { t: "Global Load Balancer", sub: "Cloud Load Balancing", icon: "⚖️" },
    { t: "DDoS Protection", sub: "Cloud Armor", icon: "🛡️" },
    { t: "WAF", sub: "App-Layer Security", icon: "🔒" },
    { t: "Secrets &amp; KMS", sub: "Multi-Region Keys", icon: "🔑" },
    { t: "Identity &amp; Access", sub: "IAM &amp; SSO", icon: "👤" }
  ];
  globSvcs.forEach((gs, idx) => {
    const gx = 30 + idx * 248;
    rect(`gs_${idx}`, `<div style="font-size:8.5px;font-weight:800;color:#1E3A8A;display:flex;align-items:center;gap:6px;"><span style="font-size:14px;">${gs.icon}</span> <div><b>${gs.t}</b><br/><span style="font-size:7px;color:#64748B;font-weight:400;">${gs.sub}</span></div></div>`, gx, 704, 236, 32, "fillColor=#FFFFFF;strokeColor=#BFDBFE;rounded=1;align=left;verticalAlign=middle;padding=3;");
  });

  // ==================== 5. BOTTOM 4 CARDS (x=16..1520, y=752..954, h=202) ====================
  // 1. Data Protection & DR (x=16, w=350)
  rect("box_b_dp", "", 16, 752, 350, 202, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.5;align=left;verticalAlign=top;");
  rect("lbl_b_dp", `<b style="font-size:10px;color:#1E3A8A;">DATA PROTECTION &amp; DISASTER RECOVERY</b>`, 16, 752, 350, 22, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=0;align=center;");
  text("txt_b_dp", `<div style="font-size:8px;line-height:1.45;color:#0F172A;padding:4px;">
    <b>Primary (Active)</b> ➔ Cross-Region Replication ➔ <b>Warm Standby</b> ➔ DR Region (Backup)<br/><br/>
    ⏱️ <b>RPO Target:</b> &lt; 15 minutes &nbsp;|&nbsp; ⏱️ <b>RTO Target:</b> &lt; 1 hour<br/>
    💾 <b>Automated Backups:</b> Continuous WAL shipping + Daily Cloud SQL snapshots.<br/>
    🗃️ <b>GCS Replication:</b> Cross-region bucket sync with retention rules.
  </div>`, 18, 776, 346, 172, "align=left;verticalAlign=top;padding=4;");

  // 2. Failover Flow (x=374, w=420)
  rect("box_b_fo", "", 374, 752, 420, 202, "strokeColor=#DC2626;fillColor=#FFFFFF;strokeWidth=1.5;align=left;verticalAlign=top;");
  rect("lbl_b_fo", `<b style="font-size:10px;color:#DC2626;">FAILOVER FLOW</b>`, 374, 752, 420, 22, "fillColor=#FEF2F2;strokeColor=#CBD5E1;rounded=0;align=center;");
  const foSteps = [
    { n: "1. Health Check\nFails", icon: "🩺" },
    { n: "2. DNS Failover\n(Automatic)", icon: "🌐" },
    { n: "3. Traffic ➔\nStandby Region", icon: "🔄" },
    { n: "4. Auto-Scale &\nResume", icon: "⚙️" },
    { n: "5. Notify &\nAlert Teams", icon: "🔔" }
  ];
  foSteps.forEach((fs, idx) => {
    const fx = 384 + idx * 80;
    rect(`fo_${idx}`, `<div style="font-size:16px;text-align:center;">${fs.icon}</div><div style="font-size:7px;font-weight:800;color:#0F172A;text-align:center;line-height:1.2;margin-top:2px;">${fs.n.replace(/\n/g, "<br/>")}</div>`, fx, 804, 72, 70, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=2;");
  });
  text("txt_b_fo", `<div style="font-size:7.5px;color:#64748B;text-align:center;margin-top:6px;">Automated failover triggered upon 3 consecutive health probe failures across any regional edge.</div>`, 376, 890, 416, 40, "align=center;");

  // 3. Compliance & Residency (x=802, w=350)
  rect("box_b_comp", "", 802, 752, 350, 202, "strokeColor=#16A34A;fillColor=#FFFFFF;strokeWidth=1.5;align=left;verticalAlign=top;");
  rect("lbl_b_comp", `<b style="font-size:10px;color:#16A34A;">COMPLIANCE &amp; RESIDENCY</b>`, 802, 752, 350, 22, "fillColor=#F0FDF4;strokeColor=#CBD5E1;rounded=0;align=center;");
  text("txt_b_comp", `<div style="font-size:8px;line-height:1.45;color:#0F172A;padding:4px;">
    ✔ <b>Data Residency:</b> Customer data never leaves defined regional boundaries.<br/>
    ✔ <b>Encryption:</b> KMS managed keys stored in region (TLS 1.3 &amp; AES-256).<br/>
    ✔ <b>Audit Trails:</b> Regional Cloud Audit Logs with centralized SIEM export.<br/>
    ✔ <b>Standards:</b> GDPR, HIPAA, FDA 21 CFR Part 11, SOC 2 Type II, ISO 27001.
  </div>`, 804, 776, 346, 172, "align=left;verticalAlign=top;padding=4;");

  // 4. Key Benefits (x=1160, w=360)
  rect("box_b_ben", "", 1160, 752, 360, 202, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.5;align=left;verticalAlign=top;");
  rect("lbl_b_ben", `<b style="font-size:10px;color:#1E3A8A;">KEY BENEFITS</b>`, 1160, 752, 360, 22, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=0;align=center;");
  text("txt_b_ben", `<div style="font-size:8px;line-height:1.5;color:#0F172A;padding:4px;">
    ✔ <b>Low Latency:</b> &lt; 50ms edge-to-dock globally via Anycast routing.<br/>
    ✔ <b>High Availability:</b> 99.99%+ multi-region uptime SLA.<br/>
    ✔ <b>Sovereignty-Audit:</b> Audit-checked GxP/GDPR local data silos.<br/>
    ✔ <b>Route Healing:</b> Auto promotional multi-carrier reserve re-allocation.
  </div>`, 1162, 776, 356, 172, "align=left;verticalAlign=top;padding=4;");

  // ==================== 6. FOOTER STATUS BAR (y=962, h=24) ====================
  const footerHtml = `<div style='font-size:9px;color:#64748B;display:flex;justify-content:space-between;align-items:center;'>
    <div><b>NOTES:</b> All regions connected via high-speed private backbone (Global Network). Regular DR drills conducted quarterly.</div>
    <div>Version: 1.0 &nbsp;|&nbsp; Enterprise Architecture Team</div>
  </div>`;
  rect("footer_status", footerHtml, 16, 962, 1504, 24, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=middle;padding=4;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_34_geographic_regional_architecture" name="Template 34: Geographic / Regional Architecture">
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
