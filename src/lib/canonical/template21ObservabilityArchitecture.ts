/**
 * Canonical Architecture Template 21: Observability Architecture
 * Exact 1:1 High-Fidelity Master Blueprint of images/21.png
 */

export function generateTemplate21ObservabilityArchitectureXml(
  flavor: string = "biopharma",
  theme: "dark" | "light" = "light"
): string {
  const isDark = theme === "dark";
  const E = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const c: string[] = [];
  let idCounter = 100;
  const nid = () => `c_${idCounter++}`;

  const rect = (id: string, val: string, x: number, y: number, w: number, h: number, style: string) => {
    c.push(
      `<mxCell id="${id}" value="${E(val)}" style="rounded=1;whiteSpace=wrap;html=1;${style}" vertex="1" parent="1">` +
      `<mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/>` +
      `</mxCell>`
    );
  };

  const edge = (id: string, val: string, src: string, tgt: string, style: string, pts: Array<{x: number, y: number}> = []) => {
    let ptsXml = "";
    if (pts.length > 0) {
      ptsXml = `<Array as="points">${pts.map(p => `<mxPoint x="${p.x}" y="${p.y}"/>`).join("")}</Array>`;
    }
    c.push(
      `<mxCell id="${id}" value="${E(val)}" edge="1" parent="1" source="${src}" target="${tgt}" style="rounded=1;html=1;${style}">` +
      `<mxGeometry relative="1" as="geometry">${ptsXml}</mxGeometry>` +
      `</mxCell>`
    );
  };

  // 1. BRAND HEADER & METADATA
  rect("num_badge", "21", 20, 20, 48, 48, "fillColor=#1E3A8A;fontColor=#FFFFFF;fontSize=24;fontStyle=1;rounded=1;align=center;verticalAlign=middle;");
  rect("hdr_title", "<div style='font-size:24px;font-weight:800;color:#0F172A;letter-spacing:0.5px;'>Observability Architecture</div><div style='font-size:11px;color:#1E3A8A;font-weight:700;margin-top:3px;'>Use Case: NovaCura – Full-Stack Observability &nbsp;|&nbsp; Environment: Production &nbsp;|&nbsp; Region: us-central1 &nbsp;|&nbsp; Last Updated: May 8, 2025</div>", 78, 16, 850, 56, "strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  rect("hdr_brand", "<div style='text-align:right;'><span style='font-size:20px;font-weight:800;color:#0284C7;'>🧬 NOVACURA</span><br/><span style='font-size:9.5px;color:#64748B;font-style:italic;'>AI-Powered Regulatory Intelligence Platform</span></div>", 940, 18, 280, 45, "strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

  // Objective Card
  rect("card_obj", "<div style='font-size:12px;font-weight:800;color:#1E3A8A;margin-bottom:3px;'>OBJECTIVE</div><div style='font-size:11.5px;line-height:1.4;color:#0F172A;'>Provide end-to-end visibility across infrastructure, applications, data, and AI workloads to ensure reliability, performance, security, and business outcomes.</div>", 1240, 18, 320, 52, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=6;");

  // 2. TOP STRIP: TELEMETRY SOURCES (x=20..1560, y=78..138)
  rect("box_sources", "", 20, 78, 1540, 60, "fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;");
  rect("lbl_sources", "<div style='font-size:11.5px;font-weight:800;color:#1E3A8A;'>TELEMETRY<br/>SOURCES<br/><span style='font-size:9.5px;color:#64748B;'>(What we collect)</span></div>", 25, 82, 95, 52, "strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  const sources = [
    { icon: "👥", title: "Users", sub: "(Web / Mobile)", x: 125, w: 105 },
    { icon: "🔌", title: "API Gateway", sub: "(Cloud Endpoints)", x: 235, w: 115 },
    { icon: "⚙️", title: "Microservices", sub: "(GKE / Cloud Run)", x: 355, w: 120 },
    { icon: "🗄️", title: "Databases", sub: "(Cloud SQL / BQ)", x: 480, w: 120 },
    { icon: "⚡", title: "Caching", sub: "(Memorystore Redis)", x: 605, w: 120 },
    { icon: "📡", title: "Messaging", sub: "(Pub/Sub)", x: 730, w: 105 },
    { icon: "🧠", title: "AI / ML Services", sub: "(Vertex AI)", x: 840, w: 120 },
    { icon: "🔄", title: "Data Pipeline", sub: "(Dataflow / Dataproc)", x: 965, w: 130 },
    { icon: "🏗️", title: "Infrastructure", sub: "(GCE / GKE / Net)", x: 1100, w: 125 },
    { icon: "🛡️", title: "Security", sub: "(IAM / KMS / SCC)", x: 1230, w: 115 },
    { icon: "🌐", title: "Third-Party", sub: "(APIs / SaaS)", x: 1350, w: 110 },
  ];
  sources.forEach((s, idx) => {
    rect(`src_${idx}`, `<div style='font-size:11px;font-weight:700;'>${s.icon} ${s.title}<br/><span style='font-size:9px;color:#64748B;'>${s.sub}</span></div>`, s.x, 86, s.w, 44, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  });

  // 3. LEFT COLUMN: OBSERVABILITY PILLARS (x=20..200, y=148..565)
  rect("box_pillars", "", 20, 148, 180, 417, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;");
  rect("lbl_pillars", "<span style='font-size:12px;font-weight:800;color:#1E3A8A;'>OBSERVABILITY PILLARS</span>", 20, 154, 180, 14, "strokeColor=none;fillColor=none;align=center;");

  const pillars = [
    { icon: "🛡️", title: "Reliability", sub: "Uptime, SLOs, Error budgets", y: 175 },
    { icon: "⏱️", title: "Performance", sub: "Latency, Throughput, Saturation", y: 240 },
    { icon: "📈", title: "Availability", sub: "Health, Failover, Capacity", y: 305 },
    { icon: "🔒", title: "Security", sub: "Threats, Vulns, Audit", y: 370 },
    { icon: "📊", title: "Business", sub: "User Journeys, Adoption", y: 435 },
    { icon: "💰", title: "Cost", sub: "Resource usage, Optimization", y: 500 },
  ];
  pillars.forEach((p, idx) => {
    rect(`pil_${idx}`, `<div style='font-size:11px;font-weight:800;color:#1E3A8A;'>${p.icon} ${p.title}</div><div style='font-size:9.5px;color:#64748B;margin-top:2px;'>${p.sub}</div>`, 28, p.y, 164, 56, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  });

  // 4. CENTER CONTAINER: GOOGLE CLOUD OBSERVABILITY PIPELINE (x=210..1360, y=148..565)
  rect("box_pipeline", "", 210, 148, 1150, 417, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;rounded=1;");
  rect("lbl_pipeline", "<span style='font-size:8.5px;font-weight:800;color:#2563EB;'>GOOGLE CLOUD OBSERVABILITY PIPELINE</span>", 210, 154, 1150, 16, "strokeColor=none;fillColor=none;align=center;");

  // Pipeline Column 1: COLLECTION (x=222..422, w=200)
  rect("pcol_1", "", 222, 175, 205, 315, "fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=1;rounded=1;");
  rect("lbl_pc1", "<span style='font-size:11.5px;font-weight:800;color:#1E3A8A;'>COLLECTION</span>", 222, 180, 205, 14, "strokeColor=none;fillColor=none;align=center;");
  rect("pc1_1", "<div style='font-size:11px;font-weight:700;'>☁️ Cloud Operations<br/><span style='font-size:9px;color:#64748B;'>(Ops Agent)</span></div>", 230, 200, 189, 40, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("pc1_2", "<div style='font-size:11px;font-weight:700;'>🔭 OpenTelemetry<br/><span style='font-size:9px;color:#64748B;'>Collector</span></div>", 230, 246, 189, 40, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("pc1_3", "<div style='font-size:11px;font-weight:700;'>📑 Cloud Audit Logs</div>", 230, 292, 189, 40, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("pc1_4", "<div style='font-size:11px;font-weight:700;'>🌐 VPC Flow Logs</div>", 230, 338, 189, 40, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("pc1_5", "<div style='font-size:11px;font-weight:700;'>📑 Application Logs<br/><span style='font-size:9px;color:#64748B;'>(Structured)</span></div>", 230, 384, 189, 40, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("pc1_6", "<div style='font-size:11px;font-weight:700;'>📈 Custom Metrics</div>", 230, 430, 189, 40, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");

  // Pipeline Column 2: INGESTION & PROCESSING (x=437..637, w=200)
  rect("pcol_2", "", 437, 175, 205, 315, "fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=1;rounded=1;");
  rect("lbl_pc2", "<span style='font-size:11.5px;font-weight:800;color:#1E3A8A;'>INGESTION &amp; PROCESSING</span>", 437, 180, 205, 14, "strokeColor=none;fillColor=none;align=center;");
  rect("pc2_1", "<div style='font-size:11px;font-weight:700;'>📑 Cloud Logging</div>", 445, 210, 189, 46, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("pc2_2", "<div style='font-size:11px;font-weight:700;'>📈 Cloud Monitoring</div>", 445, 266, 189, 46, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("pc2_3", "<div style='font-size:11px;font-weight:700;'>⏱️ Cloud Trace</div>", 445, 322, 189, 46, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("pc2_4", "<div style='font-size:11px;font-weight:700;'>⚡ Eventarc</div>", 445, 378, 189, 46, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("pc2_5", "<div style='font-size:11px;font-weight:700;'>📡 Pub/Sub</div>", 445, 434, 189, 46, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");

  // Pipeline Column 3: STORAGE & INDEXING (x=652..852, w=200)
  rect("pcol_3", "", 652, 175, 205, 315, "fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=1;rounded=1;");
  rect("lbl_pc3", "<span style='font-size:11.5px;font-weight:800;color:#1E3A8A;'>STORAGE &amp; INDEXING</span>", 652, 180, 205, 14, "strokeColor=none;fillColor=none;align=center;");
  rect("pc3_1", "<div style='font-size:11px;font-weight:700;'>🗄️ Log Buckets<br/><span style='font-size:9px;color:#64748B;'>(Regional / CMEK)</span></div>", 660, 215, 189, 52, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("pc3_2", "<div style='font-size:11px;font-weight:700;'>📈 Time Series DB<br/><span style='font-size:9px;color:#64748B;'>(Monitoring Backend)</span></div>", 660, 280, 189, 52, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("pc3_3", "<div style='font-size:11px;font-weight:700;'>⏱️ Trace Storage<br/><span style='font-size:9px;color:#64748B;'>(Cloud Trace)</span></div>", 660, 345, 189, 52, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("pc3_4", "<div style='font-size:11px;font-weight:700;'>📊 BigQuery<br/><span style='font-size:9px;color:#64748B;'>(Long-term Analytics)</span></div>", 660, 410, 189, 52, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");

  // Pipeline Column 4: ANALYSIS & CORRELATION (x=867..1087, w=220)
  rect("pcol_4", "", 867, 175, 220, 315, "fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=1;rounded=1;");
  rect("lbl_pc4", "<span style='font-size:11.5px;font-weight:800;color:#1E3A8A;'>ANALYSIS &amp; CORRELATION</span>", 867, 180, 220, 14, "strokeColor=none;fillColor=none;align=center;");
  rect("pc4_1", "<div style='font-size:11px;font-weight:700;'>📊 Monitoring Dashboards<br/><span style='font-size:9px;color:#64748B;'>(Metrics Explorer)</span></div>", 875, 205, 204, 46, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("pc4_2", "<div style='font-size:11px;font-weight:700;'>📑 Log Analytics<br/><span style='font-size:9px;color:#64748B;'>(Logs Explorer)</span></div>", 875, 260, 204, 46, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("pc4_3", "<div style='font-size:11px;font-weight:700;'>⏱️ Trace Analysis<br/><span style='font-size:9px;color:#64748B;'>(Trace Explorer)</span></div>", 875, 315, 204, 46, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("pc4_4", "<div style='font-size:11px;font-weight:700;'>🛡️ Security Command Center<br/><span style='font-size:9px;color:#64748B;'>(Threat &amp; Vuln Mgmt)</span></div>", 875, 370, 204, 46, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("pc4_5", "<div style='font-size:11px;font-weight:700;'>📊 BigQuery Analytics<br/><span style='font-size:9px;color:#64748B;'>(Custom Queries)</span></div>", 875, 425, 204, 46, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");

  // Pipeline Column 5: VISUALIZATION & ALERTING (x=1097..1347, w=250)
  rect("pcol_5", "", 1097, 175, 250, 315, "fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=1;rounded=1;");
  rect("lbl_pc5", "<span style='font-size:11.5px;font-weight:800;color:#1E3A8A;'>VISUALIZATION &amp; ALERTING</span>", 1097, 180, 250, 14, "strokeColor=none;fillColor=none;align=center;");
  rect("pc5_1", "<div style='font-size:11px;font-weight:700;'>📊 Dashboards<br/><span style='font-size:9px;color:#64748B;'>(Looker Studio / Cloud Monitoring)</span></div>", 1105, 205, 234, 46, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("pc5_2", "<div style='font-size:11px;font-weight:700;'>🔔 Alert Policies<br/><span style='font-size:9px;color:#64748B;'>(Threshold / Anomaly)</span></div>", 1105, 260, 234, 46, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("pc5_3", "<div style='font-size:11px;font-weight:700;'>📬 Notification Channels<br/><span style='font-size:9px;color:#64748B;'>(Email / Slack / PagerDuty)</span></div>", 1105, 315, 234, 46, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("pc5_4", "<div style='font-size:11px;font-weight:700;'>🎯 SLO / Error Budget<br/><span style='font-size:9px;color:#64748B;'>(SLOs &amp; Uptime Checks)</span></div>", 1105, 370, 234, 46, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("pc5_5", "<div style='font-size:11px;font-weight:700;'>🚨 Incident Management<br/><span style='font-size:9px;color:#64748B;'>(PagerDuty / Jira)</span></div>", 1105, 425, 234, 46, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");

  // Inter-column arrows
  edge(nid(), "", "pcol_1", "pcol_2", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endSize=4;");
  edge(nid(), "", "pcol_2", "pcol_3", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endSize=4;");
  edge(nid(), "", "pcol_3", "pcol_4", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endSize=4;");
  edge(nid(), "", "pcol_4", "pcol_5", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endSize=4;");

  // OBSERVABILITY FOUNDATION BAR (x=210..1360, y=500..555)
  rect("box_fnd", "<div style='font-size:12px;font-weight:800;color:#D97706;margin-bottom:6px;text-align:center;'>OBSERVABILITY FOUNDATION</div>" +
    "<div style='font-size:11px;color:#0F172A;display:flex;justify-content:space-around;text-align:center;'>" +
    "<div>👤 <b>IAM &amp; Least Privilege</b></div>" +
    "<div>🔐 <b>CMEK Encryption</b><br/><span style='font-size:9px;color:#64748B;'>(At Rest)</span></div>" +
    "<div>📅 <b>Retention Policies</b><br/><span style='font-size:9px;color:#64748B;'>(Per Data Type)</span></div>" +
    "<div>🛡️ <b>Data Access Controls</b><br/><span style='font-size:9px;color:#64748B;'>(RBAC / ABAC)</span></div>" +
    "<div>🔍 <b>Sampling Policies</b><br/><span style='font-size:9px;color:#64748B;'>(Traces / Logs)</span></div>" +
    "<div>💰 <b>Cost Controls</b><br/><span style='font-size:9px;color:#64748B;'>(Quotas / Budgets)</span></div>" +
    "</div>", 222, 500, 1125, 55, "fillColor=#FFFBEB;strokeColor=#D97706;strokeWidth=1.2;rounded=1;align=center;verticalAlign=middle;");

  // 5. FAR RIGHT COLUMN: CONSUMERS & OUTCOMES (x=1375..1560, y=148..565)
  rect("box_cons", "", 1375, 148, 185, 417, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;");
  rect("lbl_cons", "<span style='font-size:12px;font-weight:800;color:#1E3A8A;'>CONSUMERS &amp; OUTCOMES</span>", 1375, 154, 185, 14, "strokeColor=none;fillColor=none;align=center;");

  const consumers = [
    { icon: "👨‍💻", title: "SRE / DevOps", sub: "Operate & Improve", y: 175 },
    { icon: "🛡️", title: "Security Team", sub: "Detect & Respond", y: 240 },
    { icon: "🤖", title: "Data / AI Team", sub: "Monitor Pipelines & Models", y: 305 },
    { icon: "💼", title: "Product / Business", sub: "Understand Impact", y: 370 },
    { icon: "📑", title: "Compliance / Audit", sub: "Reports & Evidence", y: 435 },
    { icon: "👥", title: "Leadership", sub: "KPIs & Health", y: 500 },
  ];
  consumers.forEach((cItem, idx) => {
    rect(`con_${idx}`, `<div style='font-size:11px;font-weight:800;color:#16A34A;'>${cItem.icon} ${cItem.title}</div><div style='font-size:9.5px;color:#64748B;margin-top:2px;'>${cItem.sub}</div>`, 1385, cItem.y, 165, 56, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  });

  edge(nid(), "", "box_pipeline", "box_cons", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endSize=4;");

  // 6. BOTTOM ROW: 6 PANELS (x=20..1560, y=575..775)
  // Panel 1: Key Benefits (x=20..260, w=240)
  rect("bot_p1", "<div style='font-size:12px;font-weight:800;color:#16A34A;margin-bottom:6px;'>KEY BENEFITS</div>" +
    "<div style='font-size:11px;line-height:1.55;color:#0F172A;'>" +
    "✔ Full-stack visibility across applications, data, AI, and infrastructure<br/>" +
    "✔ Proactive issue detection with correlation across signals<br/>" +
    "✔ Faster MTTR with actionable insights<br/>" +
    "✔ SLO-driven reliability and error budget management<br/>" +
    "✔ Security, compliance, and audit readiness<br/>" +
    "✔ Cost visibility and optimization" +
    "</div>", 20, 575, 240, 200, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=6;");

  // Panel 2: Key Signals & KPIs (x=270..530, w=260)
  rect("bot_p2", "<div style='font-size:12px;font-weight:800;color:#2563EB;margin-bottom:6px;'>KEY SIGNALS &amp; KPIS (Examples)</div>" +
    "<div style='font-size:11px;line-height:1.55;color:#0F172A;'>" +
    "📈 Availability (SLA / SLO Compliance %)<br/>" +
    "⏱️ Latency (P50 / P95 / P99)<br/>" +
    "❌ Error Rate (4xx / 5xx %)<br/>" +
    "🔄 Throughput (RPS / TPS)<br/>" +
    "💻 CPU / Memory / Disk Utilization<br/>" +
    "📬 Queue Depth / Backlog<br/>" +
    "🧠 AI Model Latency / Token Usage<br/>" +
    "📊 Data Freshness / Pipeline Lag<br/>" +
    "🛡️ Security Findings / Incidents<br/>" +
    "💰 Cost per Service / per User" +
    "</div>", 270, 575, 260, 200, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=6;");

  // Panel 3: SLO Example (x=540..720, w=180)
  rect("bot_p3", "<div style='font-size:12px;font-weight:800;color:#7C3AED;margin-bottom:6px;'>SLO EXAMPLE (User API Service)</div>" +
    "<div style='font-size:11px;line-height:1.6;color:#0F172A;'>" +
    "🎯 <b>Availability SLO</b><br/>&nbsp;&nbsp;&nbsp;&nbsp;99.95% (Monthly)<br/>" +
    "⏱️ <b>Latency SLO</b><br/>&nbsp;&nbsp;&nbsp;&nbsp;P95 &lt; 500 ms<br/>" +
    "📉 <b>Error Budget</b><br/>&nbsp;&nbsp;&nbsp;&nbsp;21.6 minutes / month<br/>" +
    "🚨 <b>Burn Rate Alerts</b><br/>&nbsp;&nbsp;&nbsp;&nbsp;2x (14m), 14x (2m)" +
    "</div>", 540, 575, 180, 200, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=6;");

  // Panel 4: Alerting Examples (x=730..910, w=180)
  rect("bot_p4", "<div style='font-size:12px;font-weight:800;color:#DC2626;margin-bottom:6px;'>ALERTING EXAMPLES</div>" +
    "<div style='font-size:11px;line-height:1.6;color:#0F172A;'>" +
    "🚨 <b>High Error Rate</b>: 5xx &gt; 1% for 5 min<br/>" +
    "⚠️ <b>High Latency</b>: P95 &gt; 1s for 5 min<br/>" +
    "🔥 <b>SLO Burn Rate</b>: &gt; 2x for 14 min<br/>" +
    "⏳ <b>Pipeline Delay</b>: Data lag &gt; 15 min<br/>" +
    "🛡️ <b>Security Finding</b>: Critical severity<br/>" +
    "❌ <b>Instance Down</b>: Uptime &lt; 99.9%" +
    "</div>", 730, 575, 180, 200, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=6;");

  // Panel 5: Data Retention (x=920..1150, w=230)
  rect("bot_p5", "<div style='font-size:12px;font-weight:800;color:#D97706;margin-bottom:6px;'>DATA RETENTION (Defaults)</div>" +
    "<div style='font-size:11px;line-height:1.6;color:#0F172A;'>" +
    "📑 <b>Logs (Hot)</b>: 30 Days<br/>" +
    "🗄️ <b>Logs (Archive)</b>: 1 Year<br/>" +
    "📈 <b>Metrics (High Res)</b>: 6 Weeks<br/>" +
    "📊 <b>Metrics (Standard)</b>: 24 Months<br/>" +
    "⏱️ <b>Traces</b>: 30 Days<br/>" +
    "🛡️ <b>Audit Logs</b>: 1 Year" +
    "</div>", 920, 575, 230, 200, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=6;");

  // Panel 6: Technologies (x=1160..1560, w=400)
  rect("bot_p6", "<div style='font-size:12px;font-weight:800;color:#1E3A8A;margin-bottom:6px;'>TECHNOLOGIES</div>" +
    "<div style='font-size:11px;line-height:1.6;color:#0F172A;display:grid;grid-template-columns:repeat(2, 1fr);gap:4px;'>" +
    "<div>📑 <b>Cloud Logging</b></div> <div>📊 <b>BigQuery</b></div>" +
    "<div>📈 <b>Cloud Monitoring</b></div> <div>🛡️ <b>Security Command Center</b></div>" +
    "<div>⏱️ <b>Cloud Trace</b></div> <div>☁️ <b>Cloud Operations (Ops Agent)</b></div>" +
    "<div>⚡ <b>Eventarc</b></div> <div>📊 <b>Looker Studio</b></div>" +
    "<div>📡 <b>Pub/Sub</b></div> <div>📬 <b>PagerDuty / Slack / Email</b></div>" +
    "</div>", 1160, 575, 400, 200, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=6;");

  // 7. FOOTER LEGEND (x=20..1560, y=785..815)
  rect("footer_leg", "<div style='font-size:11px;color:#0F172A;display:flex;justify-content:space-around;text-align:center;align-items:center;'>" +
    "<div><b style='color:#1E3A8A;'>LEGEND:</b></div>" +
    "<div>─── Telemetry Flow</div>" +
    "<div>- - - Data / Control Flow</div>" +
    "<div>··· Alert / Notification Flow</div>" +
    "<div>⬜ Source</div>" +
    "<div>🟦 Google Cloud Service</div>" +
    "<div>🗄️ Storage</div>" +
    "<div>🟪 Analysis / Processing</div>" +
    "<div>🟩 Visualization / Alerting</div>" +
    "<div>👤 Consumers</div>" +
    "<div>🟨 Foundation / Governance</div>" +
    "</div>", 20, 785, 1540, 30, "fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;rounded=1;align=center;verticalAlign=middle;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_21_observability_architecture" name="Template 21: Observability Architecture">
    <mxGraphModel dx="1440" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1440" pageHeight="800" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${c.join("\n        ")}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
