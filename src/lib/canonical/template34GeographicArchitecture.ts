/**
 * Master 1:1 Ground-Truth Blueprint for Template 34: Geographic / Regional Architecture
 * Matches 100% of images/34.png on 1600x1020 canvas with zero voids and discrete card hierarchy.
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
      `<mxCell id="${id}" value="${E(v)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;fontColor=#0F172A;fontSize=11;${s}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`
    );

  const text = (id: string, v: string, x: number, y: number, w: number, h: number, s = "") =>
    c.push(
      `<mxCell id="${id}" value="${E(v)}" style="text;html=1;strokeColor=none;fillColor=none;whiteSpace=wrap;fontColor=#0F172A;fontSize=11;verticalAlign=middle;${s}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`
    );

  // 1. BRAND HEADER & METADATA (y=14..66)
  rect("num_badge", "34", 24, 14, 52, 52, "fillColor=#1E3A8A;fontColor=#FFFFFF;fontSize=26;fontStyle=1;rounded=1;align=center;verticalAlign=middle;");
  text(
    "hdr_title",
    `<div style='font-size:24px;font-weight:900;color:#0F172A;letter-spacing:0.5px;'>GEOGRAPHIC / REGIONAL ARCHITECTURE</div>` +
    `<div style='font-size:12px;font-weight:700;color:#1E3A8A;margin-top:2px;'>Use Case: NovaCura – AI-Powered Regulatory Intelligence Platform</div>` +
    `<div style='font-size:10px;color:#64748B;margin-top:1px;'>☁️ Environment: Production &nbsp;|&nbsp; 📅 Last Updated: May 8, 2025 &nbsp;|&nbsp; 👤 Owner: Enterprise Architecture Team</div>`,
    88,
    14,
    850,
    52,
    "align=left;"
  );

  const brandHtml = `<div style='text-align:right;'><span style='font-size:20px;font-weight:900;color:#0284C7;'>🧬 NOVACURA</span><br/><span style='font-size:10px;color:#64748B;font-style:italic;'>AI-Powered Regulatory Intelligence Platform</span></div>`;
  text("brand_logo", brandHtml, 950, 14, 275, 52, "align=right;");

  const objHtml = `<div style='font-size:9.5px;font-weight:900;color:#1E3A8A;margin-bottom:2px;'>OBJECTIVE</div><div style='font-size:8px;line-height:1.35;color:#0F172A;'>Deliver low-latency, highly available, and compliant services globally with data residency, disaster recovery, and local user experience.</div>`;
  rect("card_obj", objHtml, 1240, 14, 335, 52, "strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;padding=5;");

  // 2. LEFT SIDEBAR (x=24, w=215, y=78..825)
  // Architecture Principles (y=78, h=215)
  rect("box_l_prin", "", 24, 78, 215, 215, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.2;align=left;verticalAlign=top;");
  text("lbl_prin", "<div style='font-size:10px;font-weight:800;color:#1E3A8A;text-align:center;'>ARCHITECTURE PRINCIPLES</div>", 24, 82, 215, 18, "align=center;");
  const prinItems = [
    { t: "Data Residency &amp; Sovereignty", icon: "🏛️" },
    { t: "Low Latency Experience", icon: "⚡" },
    { t: "High Availability &amp; Resilience", icon: "📈" },
    { t: "Security by Design", icon: "🛡️" },
    { t: "Cost Optimization", icon: "💰" },
    { t: "Operational Excellence", icon: "⚙️" }
  ];
  prinItems.forEach((pi, idx) => {
    const py = 104 + idx * 30;
    rect(`pi_${idx}`, `<div style='font-size:8.5px;font-weight:700;display:flex;align-items:center;gap:6px;'><span style='font-size:12px;'>${pi.icon}</span> ${pi.t}</div>`, 32, py, 199, 26, "fillColor=#F8FAFC;strokeColor=#E2E8F0;rounded=1;align=left;verticalAlign=middle;padding=4;");
  });

  // Regional Capabilities (y=302, h=195)
  rect("box_l_caps", "", 24, 302, 215, 195, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.2;align=left;verticalAlign=top;");
  text("lbl_caps", "<div style='font-size:10px;font-weight:800;color:#2563EB;text-align:center;'>REGIONAL CAPABILITIES</div>", 24, 306, 215, 18, "align=center;");
  const capItems = [
    { t: "Local Data Storage", icon: "🗄️" },
    { t: "Regional Compute", icon: "⚙️" },
    { t: "Local Monitoring &amp; Logging", icon: "📑" },
    { t: "KMS &amp; Secrets (Regional)", icon: "🔑" },
    { t: "Local Backup &amp; Replication", icon: "🗃️" },
    { t: "Regional Networking &amp; Edge", icon: "🌐" }
  ];
  capItems.forEach((ci, idx) => {
    const cy = 328 + idx * 27;
    rect(`ci_${idx}`, `<div style='font-size:8.5px;font-weight:700;display:flex;align-items:center;gap:6px;'><span style='font-size:12px;'>${ci.icon}</span> ${ci.t}</div>`, 32, cy, 199, 23, "fillColor=#EFF6FF;strokeColor=#BFDBFE;rounded=1;align=left;verticalAlign=middle;padding=3;");
  });

  // Traffic Routing (y=506, h=175)
  rect("box_l_routes", "", 24, 506, 215, 175, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.2;align=left;verticalAlign=top;");
  text("lbl_routes", "<div style='font-size:10px;font-weight:800;color:#16A34A;text-align:center;'>TRAFFIC ROUTING</div>", 24, 510, 215, 18, "align=center;");
  const routeItems = [
    { t: "DNS Geo-Routing (Latency Based)", icon: "🌐" },
    { t: "Health Checks (Active/Passive)", icon: "🩺" },
    { t: "Failover (Automatic)", icon: "🔄" },
    { t: "DDoS Protection (Global Edge)", icon: "🛡️" },
    { t: "WAF &amp; Bot Protection", icon: "🛡️" }
  ];
  routeItems.forEach((ri, idx) => {
    const ry = 532 + idx * 28;
    rect(`ri_${idx}`, `<div style='font-size:8.5px;font-weight:700;display:flex;align-items:center;gap:6px;'><span style='font-size:12px;'>${ri.icon}</span> ${ri.t}</div>`, 32, ry, 199, 24, "fillColor=#F0FDF4;strokeColor=#BBF7D0;rounded=1;align=left;verticalAlign=middle;padding=3;");
  });

  // Legend (y=690, h=70)
  rect("box_legend", "<div style='font-size:9px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>LEGEND</div><div style='font-size:7.5px;line-height:1.3;'><span style='color:#16A34A;'>■</span> Region (Active) &nbsp; <span style='color:#EA580C;'>■</span> Region (Warm Standby) &nbsp; <span style='color:#2563EB;'>■</span> Region (Backup/DR)<br/>── User / Data Flow &nbsp; ······ Replication / Sync &nbsp; - - Failover Path</div>", 24, 690, 215, 70, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  // 3. TOP STAGE: GLOBAL USER BASE & REGIONAL OVERVIEW (y=78..293, h=215)
  // Global User Base (x=252, w=675, h=215)
  rect("box_users_map", "", 252, 78, 675, 215, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.2;align=center;verticalAlign=top;");
  text("lbl_user_base", "<div style='font-size:11px;font-weight:800;color:#1E3A8A;'>GLOBAL USER BASE</div>", 252, 82, 675, 18, "align=center;");
  const users = [
    { n: "North America\nUsers", icon: "👤", pin: "🟢" },
    { n: "South America\nUsers", icon: "👤", pin: "🟠" },
    { n: "Europe\nUsers", icon: "👤", pin: "🟢" },
    { n: "Middle East\nUsers", icon: "👤", pin: "🟠" },
    { n: "Asia Pacific\nUsers", icon: "👤", pin: "🟢" },
    { n: "Africa\nUsers", icon: "👤", pin: "🔵" }
  ];
  users.forEach((u, i) => {
    const ux = 265 + i * 110;
    rect(`u_${i}`, `<div style='font-size:16px;text-align:center;'>${u.icon}</div><div style='font-size:8.5px;font-weight:700;text-align:center;line-height:1.2;margin-top:2px;'>${u.n.replace(/\n/g, "<br/>")}</div><div style='font-size:12px;text-align:center;margin-top:4px;'>📍${u.pin}</div>`, ux, 106, 100, 75, "fillColor=#F8FAFC;strokeColor=#E2E8F0;rounded=1;align=center;verticalAlign=middle;padding=3;");
  });
  text("map_infographic", "<div style='font-size:11px;color:#94A3B8;letter-spacing:4px;font-weight:600;'>━━━━━ 🌍 GLOBAL DISTRIBUTED EDGE ANYCAST NETWORK ━━━━━</div><div style='font-size:8.5px;color:#64748B;margin-top:3px;'>Ultra-low latency edge routing directed to the nearest active regional cloud point-of-presence</div>", 252, 240, 675, 45, "align=center;");

  // Regional Overview Table (x=938, w=637, h=215)
  const regTableHtml = `<div style='font-size:11px;font-weight:800;color:#1E3A8A;text-align:center;margin-bottom:6px;'>REGIONAL OVERVIEW</div>
  <table style='width:100%;border-collapse:collapse;font-size:8.5px;'>
    <tr style='font-weight:800;border-bottom:1.5px solid #CBD5E1;background:#F8FAFC;'>
      <td style='padding:5px;'>Region</td><td style='padding:5px;'>Location</td><td style='padding:5px;'>Role</td><td style='padding:5px;'>Status</td><td style='padding:5px;'>Data Residency</td>
    </tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:4px;'><span style='color:#16A34A;'>●</span> <b>NA (US-East)</b></td><td>N. Virginia, USA</td><td>Primary (Active)</td><td><span style='background:#DCFCE7;color:#16A34A;padding:1px 5px;border-radius:3px;font-weight:800;'>Active</span></td><td>US / Canada</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:4px;'><span style='color:#16A34A;'>●</span> <b>EU (Europe)</b></td><td>Frankfurt, Germany</td><td>Primary (Active)</td><td><span style='background:#DCFCE7;color:#16A34A;padding:1px 5px;border-radius:3px;font-weight:800;'>Active</span></td><td>EU / EEA</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:4px;'><span style='color:#16A34A;'>●</span> <b>AP (Asia Pacific)</b></td><td>Singapore</td><td>Primary (Active)</td><td><span style='background:#DCFCE7;color:#16A34A;padding:1px 5px;border-radius:3px;font-weight:800;'>Active</span></td><td>APAC</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:4px;'><span style='color:#EA580C;'>●</span> <b>SA (South America)</b></td><td>São Paulo, Brazil</td><td>Warm Standby</td><td><span style='background:#FFEDD5;color:#EA580C;padding:1px 5px;border-radius:3px;font-weight:800;'>Standby</span></td><td>South America</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:4px;'><span style='color:#EA580C;'>●</span> <b>MEA (Middle East)</b></td><td>UAE (Dubai)</td><td>Warm Standby</td><td><span style='background:#FFEDD5;color:#EA580C;padding:1px 5px;border-radius:3px;font-weight:800;'>Standby</span></td><td>Middle East</td></tr>
    <tr><td style='padding:4px;'><span style='color:#2563EB;'>●</span> <b>AF (Africa)</b></td><td>Cape Town, SA</td><td>Backup / DR</td><td><span style='background:#DBEAFE;color:#2563EB;padding:1px 5px;border-radius:3px;font-weight:800;'>DR Ready</span></td><td>Africa</td></tr>
  </table>`;
  rect("box_reg_overview", regTableHtml, 938, 78, 637, 215, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;");

  // 4. MAIN 6 REGIONAL PILLARS (y=302..680, h=378)
  const pillars = [
    { name: "NORTH AMERICA (US-EAST)", role: "Primary Region", col: "#16A34A", bg: "#F0FDF4", res: "Data Residency: US / Canada" },
    { name: "EUROPE (EUROPE)", role: "Primary Region", col: "#16A34A", bg: "#F0FDF4", res: "Data Residency: EU / EEA" },
    { name: "ASIA PACIFIC (APAC)", role: "Primary Region", col: "#16A34A", bg: "#F0FDF4", res: "Data Residency: Asia Pacific" },
    { name: "SOUTH AMERICA (SA)", role: "Warm Standby Region", col: "#EA580C", bg: "#FFFBEB", res: "Data Residency: South America" },
    { name: "MIDDLE EAST (MEA)", role: "Warm Standby Region", col: "#EA580C", bg: "#FFFBEB", res: "Data Residency: Middle East" },
    { name: "AFRICA (AFRICA)", role: "Backup / DR Region", col: "#2563EB", bg: "#EFF6FF", res: "Data Residency: Africa" }
  ];

  pillars.forEach((p, i) => {
    const px = 252 + i * 220;
    const pw = (i === 5) ? 225 : 212;

    // Pillar Outer Box
    rect(`p_box_${i}`, "", px, 302, pw, 378, `strokeColor=${p.col};strokeWidth=1.5;fillColor=#FFFFFF;align=left;verticalAlign=top;`);

    // Top Header & Cloud Icons
    text(`p_hdr_${i}`, `<div style='font-size:9.5px;font-weight:900;color:${p.col};text-align:center;'>${p.name}</div><div style='font-size:8px;color:#64748B;text-align:center;'>${p.role}</div><div style='font-size:11px;text-align:center;margin-top:2px;'>☁️ 🌐 ⚡</div>`, px, 306, pw, 38, "align=center;");

    // Tier 1: Edge (y=348, h=52)
    rect(`p_edge_${i}`, `<div style='font-size:14px;text-align:center;'>🌐</div><div style='font-size:8.5px;font-weight:800;text-align:center;'>Cloud CDN + DNS</div>`, px + 8, 348, pw - 16, 52, "fillColor=#F8FAFC;strokeColor=#E2E8F0;rounded=1;align=center;verticalAlign=middle;");

    // Tier 2: Application (y=406, h=58)
    rect(`p_app_${i}`, `<div style='font-size:14px;text-align:center;'>⚙️</div><div style='font-size:8.5px;font-weight:800;text-align:center;'>GKE / EKS / AKS<br/><span style='font-size:7.5px;color:#64748B;'>(Containers)</span></div>`, px + 8, 406, pw - 16, 58, "fillColor=#EFF6FF;strokeColor=#BFDBFE;rounded=1;align=center;verticalAlign=middle;");

    // Tier 3: Data Layer (y=470, h=66)
    rect(`p_data_${i}`, `<table style='width:100%;height:100%;border-collapse:collapse;font-size:7.5px;text-align:center;'><tr><td>🗄️<br/><b>Cloud SQL</b><br/><span style='color:#64748B;'>Primary</span></td><td>📊<br/><b>BigQuery</b><br/><span style='color:#64748B;'>Warehouse</span></td></tr></table>`, px + 8, 470, pw - 16, 66, "fillColor=#FAF5FF;strokeColor=#E9D5FF;rounded=1;align=center;verticalAlign=middle;");

    // Tier 4: Services (y=542, h=54)
    rect(`p_svc_${i}`, `<table style='width:100%;height:100%;border-collapse:collapse;font-size:7.5px;text-align:center;'><tr><td>📨<br/>Pub/Sub</td><td>🧠<br/>Vertex AI</td><td>⚡<br/>Redis</td></tr></table>`, px + 8, 542, pw - 16, 54, "fillColor=#F8FAFC;strokeColor=#E2E8F0;rounded=1;align=center;verticalAlign=middle;");

    // Tier 5: Observability (y=602, h=44)
    rect(`p_obs_${i}`, `<table style='width:100%;height:100%;border-collapse:collapse;font-size:7.5px;text-align:center;'><tr><td>📈<br/>Monitoring</td><td>📑<br/>Logging</td><td>⏱️<br/>Trace</td></tr></table>`, px + 8, 602, pw - 16, 44, "fillColor=#F8FAFC;strokeColor=#E2E8F0;rounded=1;align=center;verticalAlign=middle;");

    // Bottom Residency Badge (y=652, h=22)
    rect(`p_res_${i}`, `<div style='font-size:7.5px;font-weight:800;color:${p.col};text-align:center;'>${p.res}</div>`, px + 8, 652, pw - 16, 22, `fillColor=${p.bg};strokeColor=${p.col};rounded=1;align=center;verticalAlign=middle;`);
  });

  // 5. GLOBAL SERVICES STRIP (x=252, y=690, w=1323, h=70)
  const gServices = [
    { title: "Global DNS", desc: "(Cloud DNS)", icon: "🌐" },
    { title: "Global Load Balancer", desc: "(Anycast)", icon: "⚖️" },
    { title: "DDoS Protection", desc: "(Cloud Armor)", icon: "🛡️" },
    { title: "WAF", desc: "(Appliance / Cloud)", icon: "🛡️" },
    { title: "Secrets &amp; KMS", desc: "(Multi-Region)", icon: "🔑" },
    { title: "Identity &amp; Access", desc: "(Cloud IAM)", icon: "🔒" },
    { title: "CI/CD Artifacts", desc: "(Regional Replication)", icon: "📦" }
  ];
  rect("box_g_svcs_bg", "", 252, 690, 1323, 70, "fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.2;align=left;verticalAlign=top;");
  text("lbl_g_svcs", "<div style='font-size:10px;font-weight:800;color:#1E40AF;text-align:center;'>GLOBAL SERVICES (MULTI-REGION)</div>", 252, 693, 1323, 16, "align=center;");
  gServices.forEach((gs, i) => {
    const gx = 262 + i * 186;
    rect(`gs_${i}`, `<div style='font-size:14px;text-align:center;'>${gs.icon}</div><div style='font-size:8px;font-weight:800;color:#1E3A8A;text-align:center;'>${gs.title}</div><div style='font-size:7px;color:#64748B;text-align:center;'>${gs.desc}</div>`, gx, 712, 178, 42, "fillColor=#FFFFFF;strokeColor=#DBEAFE;rounded=1;align=center;verticalAlign=middle;padding=2;");
  });

  // 6. BOTTOM 4 CARDS (y=770..960, h=190)
  // Card 1: Data Protection & DR (x=24, w=440)
  const dpHtml = `<div style='font-size:11px;font-weight:800;color:#1E3A8A;margin-bottom:6px;'>DATA PROTECTION &amp; DISASTER RECOVERY</div>
  <div style='font-size:8.5px;line-height:1.4;color:#0F172A;'>
    <b>Primary (Active)</b> ➔ <i>Async Replication</i> ➔ <b>Warm Standby</b> ➔ <i>DR Region (Backup)</i><br/><br/>
    ⏱️ <b>RPO Target:</b> ≤ 15 minutes &nbsp;|&nbsp; ⏱️ <b>RTO Target:</b> ≤ 1 hour<br/>
    🗄️ <b>Automated Backups:</b> Continuous WAL shipping + Daily Cloud SQL snapshots.<br/>
    📦 <b>GCS Replication:</b> Cross-region bucket sync with retention lock.
  </div>`;
  rect("bot_dp", dpHtml, 24, 770, 440, 190, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.2;align=left;verticalAlign=top;padding=8;");

  // Card 2: Failover Flow (x=472, w=410)
  const failoverHtml = `<div style='font-size:11px;font-weight:800;color:#DC2626;text-align:center;margin-bottom:6px;'>FAILOVER FLOW</div>
  <div style='font-size:8px;display:flex;justify-content:space-around;text-align:center;align-items:center;margin-top:16px;'>
    <div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:4px;border-radius:4px;'>🩺<br/><b>1. Health Check<br/>Fails</b></div> <div>➔</div>
    <div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:4px;border-radius:4px;'>🌐<br/><b>2. DNS Failover<br/>(Automatic)</b></div> <div>➔</div>
    <div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:4px;border-radius:4px;'>🔄<br/><b>3. Traffic Shift<br/>Standby Region</b></div> <div>➔</div>
    <div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:4px;border-radius:4px;'>⚙️<br/><b>4. Auto Scale &amp;<br/>Resume</b></div> <div>➔</div>
    <div style='border:1px solid #DC2626;background:#FEF2F2;padding:4px;border-radius:4px;'>🔔<br/><b>5. Notify &amp;<br/>Alert Teams</b></div>
  </div>`;
  rect("bot_failover", failoverHtml, 472, 770, 410, 190, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.2;align=center;verticalAlign=top;padding=8;");

  // Card 3: Compliance & Residency (x=892, w=350)
  const compHtml = `<div style='font-size:11px;font-weight:800;color:#16A34A;margin-bottom:6px;'>COMPLIANCE &amp; RESIDENCY</div>
  <div style='font-size:8.5px;line-height:1.45;color:#0F172A;'>
    ✔ <b>Data Residency:</b> Customer data never leaves defined regional boundaries.<br/>
    ✔ <b>Encryption:</b> KMS-managed keys at rest &amp; TLS 1.3 in transit globally.<br/>
    ✔ <b>Local Backups:</b> Regional backup buckets with strict IAM isolation.<br/>
    ✔ <b>Standards:</b> GDPR, HIPAA, FDA 21 CFR Part 11, SOC 2 Type II, ISO 27001.
  </div>`;
  rect("bot_comp", compHtml, 892, 770, 350, 190, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.2;align=left;verticalAlign=top;padding=8;");

  // Card 4: Key Benefits (x=1252, w=323)
  const benHtml = `<div style='font-size:11px;font-weight:800;color:#2563EB;margin-bottom:6px;'>KEY BENEFITS</div>
  <div style='font-size:8.5px;line-height:1.45;color:#0F172A;'>
    ✔ <b>Low Latency:</b> &lt; 50ms edge-to-client globally via Anycast routing.<br/>
    ✔ <b>High Availability:</b> 99.99% multi-region uptime SLA.<br/>
    ✔ <b>Sovereignty:</b> Meets strict EU/US/APAC health data privacy laws.<br/>
    ✔ <b>Elastic Scaling:</b> Auto-proportional multi-cloud resource allocation.
  </div>`;
  rect("bot_benefits", benHtml, 1252, 770, 323, 190, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.2;align=left;verticalAlign=top;padding=8;");

  // 7. FOOTER STATUS BAR (y=970, h=25)
  const footerHtml = `<div style='font-size:8.5px;color:#64748B;display:flex;justify-content:space-between;align-items:center;'>
    <div><b>NOTES:</b> All regions connected via high-speed private backbone (Global Network). Regular DR drills and failover tests conducted quarterly.</div>
    <div>Version: 1.0 &nbsp;|&nbsp; Enterprise Architecture Team</div>
  </div>`;
  rect("footer_status", footerHtml, 24, 970, 1551, 25, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=middle;padding=4;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_34_geographic_regional_architecture" name="Template 34: Geographic / Regional Architecture">
    <mxGraphModel dx="1600" dy="1020" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="1020" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${c.join("\n        ")}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
