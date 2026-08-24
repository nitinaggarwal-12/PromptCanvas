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
  rect("num_badge", "21", 20, 16, 48, 48, "fillColor=#1E3A8A;fontColor=#FFFFFF;fontSize=24;fontStyle=1;rounded=1;align=center;verticalAlign=middle;");
  rect("hdr_title", "<div style='font-size:22px;font-weight:800;color:#0F172A;letter-spacing:0.5px;'>Observability Architecture</div><div style='font-size:11px;color:#1E3A8A;font-weight:700;margin-top:2px;'>Use Case: NovaCura – Full-Stack Observability &nbsp;|&nbsp; Environment: Production &nbsp;|&nbsp; Region: us-central1 &nbsp;|&nbsp; Last Updated: May 8, 2025</div>", 78, 16, 840, 48, "strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=10;");
  rect("hdr_brand", "<div style='text-align:right;'><span style='font-size:20px;font-weight:800;color:#0284C7;'>🧬 NOVACURA</span><br/><span style='font-size:9.5px;color:#64748B;font-style:italic;'>AI-Powered Regulatory Intelligence Platform</span></div>", 940, 16, 280, 48, "strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

  // Objective Card
  rect("card_obj", "<div style='font-size:8.5px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>OBJECTIVE</div><div style='font-size:10px;line-height:1.35;color:#0F172A;'>Provide end-to-end visibility across infrastructure, applications, data, and AI workloads to ensure reliability, performance, security, and business outcomes.</div>", 1240, 16, 320, 48, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=4;");

  // 2. TOP TELEMETRY SOURCES BAR (x=20..1560, y=72..135)
  rect("box_sources_top", "", 20, 72, 1540, 62, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;");
  rect("lbl_sources_top", "<span style='font-size:9px;font-weight:800;color:#1E3A8A;'>TELEMETRY<br/>SOURCES<br/><span style='color:#64748B;font-size:8px;'>(What we collect)</span></span>", 24, 76, 70, 52, "strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  const sources = [
    { t: "Users", sub: "Web / Mobile", icon: "👤" },
    { t: "API Gateway", sub: "Cloud Endpoints", icon: "🛡️" },
    { t: "Microservices", sub: "GKE / Cloud Run", icon: "⚙️" },
    { t: "Databases", sub: "Cloud SQL / BQ", icon: "🗄️" },
    { t: "Caching", sub: "Memorystore Redis", icon: "⚡" },
    { t: "Messaging", sub: "Pub/Sub", icon: "📨" },
    { t: "AI / ML Services", sub: "Vertex AI", icon: "🧠" },
    { t: "Data Pipeline", sub: "Dataflow / Dataproc", icon: "📊" },
    { t: "Infrastructure", sub: "GCE / GKE / Net", icon: "🖥️" },
    { t: "Security", sub: "IAM / KMS / SCC", icon: "🔒" },
    { t: "Third-Party", sub: "APIs / SaaS", icon: "🏢" }
  ];

  sources.forEach((src, idx) => {
    const sx = 96 + idx * 131;
    rect(`src_${idx}`, `<div style='font-size:10px;text-align:center;'>${src.icon}</div><div style='font-size:9px;font-weight:700;color:#0F172A;text-align:center;'>${src.t}</div><div style='font-size:8px;color:#64748B;text-align:center;'>(${src.sub})</div>`, sx, 78, 126, 48, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=2;");
  });

  // 3. LEFT COLUMN: OBSERVABILITY PILLARS (x=20..115, y=142..540)
  rect("box_pillars", "", 20, 142, 95, 395, "fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.2;rounded=1;");
  rect("lbl_pillars", "<span style='font-size:10px;font-weight:800;color:#7C3AED;'>OBSERVABILITY PILLARS</span>", 20, 144, 95, 14, "strokeColor=none;fillColor=none;align=center;");

  const pillars = [
    { t: "Reliability", sub: "Uptime, SLOs, Error budgets", icon: "🛡️" },
    { t: "Performance", sub: "Latency, Throughput, Saturation", icon: "⚡" },
    { t: "Availability", sub: "Health, Failover, Capacity", icon: "📈" },
    { t: "Security", sub: "Threats, Vulns, Audit", icon: "🔒" },
    { t: "Business", sub: "User Journeys, Adoption", icon: "📊" },
    { t: "Cost", sub: "Resource usage, Optimization", icon: "💰" }
  ];
  pillars.forEach((pil, idx) => {
    const py = 162 + idx * 62;
    rect(`pil_${idx}`, `<div style='font-size:10px;text-align:center;'>${pil.icon}</div><div style='font-size:9px;font-weight:700;color:#0F172A;text-align:center;'>${pil.t}</div><div style='font-size:8px;color:#64748B;text-align:center;'>${pil.sub}</div>`, 25, py, 85, 54, "fillColor=#FAF5FF;strokeColor=#7C3AED;rounded=1;align=center;verticalAlign=middle;padding=2;");
  });

  // 4. MAIN GCP OBSERVABILITY PIPELINE (x=122..1410, y=142..540)
  rect("box_pipeline_main", "", 122, 142, 1284, 395, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;rounded=1;");
  rect("lbl_pipeline_main", "<span style='font-size:8px;font-weight:800;color:#2563EB;'>GOOGLE CLOUD OBSERVABILITY PIPELINE</span>", 122, 144, 1284, 14, "strokeColor=none;fillColor=none;align=center;");

  // 5 Pipeline Columns
  // Col 1: COLLECTION (x=130..370)
  rect("col_box_1", "", 130, 162, 240, 310, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;");
  rect("col_lbl_1", "<span style='font-size:9px;font-weight:800;color:#2563EB;'>COLLECTION</span>", 130, 164, 240, 12, "strokeColor=none;fillColor=none;align=center;");

  const colItems = [
    { t: "Cloud Operations", sub: "(Ops Agent)", icon: "☁️" },
    { t: "OpenTelemetry", sub: "Collector", icon: "🔭" },
    { t: "Cloud Audit Logs", sub: "", icon: "📑" },
    { t: "VPC Flow Logs", sub: "", icon: "🌐" },
    { t: "Application Logs", sub: "(Structured)", icon: "💻" },
    { t: "Custom Metrics", sub: "", icon: "📈" }
  ];
  colItems.forEach((it, idx) => {
    const iy = 180 + idx * 48;
    rect(`col1_it_${idx}`, `<div style='font-size:9px;font-weight:700;'>${it.icon} ${it.t}</div><div style='font-size:8px;color:#64748B;'>${it.sub}</div>`, 138, iy, 224, 42, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=2;");
  });

  // Col 2: INGESTION & PROCESSING (x=380..620)
  rect("col_box_2", "", 380, 162, 240, 310, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;");
  rect("col_lbl_2", "<span style='font-size:9px;font-weight:800;color:#1E3A8A;'>INGESTION &amp; PROCESSING</span>", 380, 164, 240, 12, "strokeColor=none;fillColor=none;align=center;");

  const ingItems = [
    { t: "Cloud Logging", icon: "📑" },
    { t: "Cloud Monitoring", icon: "📈" },
    { t: "Cloud Trace", icon: "⏱️" },
    { t: "Eventarc", icon: "⚡" },
    { t: "Pub/Sub", icon: "📨" }
  ];
  ingItems.forEach((it, idx) => {
    const iy = 184 + idx * 56;
    rect(`col2_it_${idx}`, `<div style='font-size:12px;text-align:center;'>${it.icon}</div><div style='font-size:9px;font-weight:700;text-align:center;'>${it.t}</div>`, 390, iy, 220, 48, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=2;");
  });

  // Col 3: STORAGE & INDEXING (x=630..880)
  rect("col_box_3", "", 630, 162, 240, 310, "fillColor=#FAF5FF;strokeColor=#7C3AED;rounded=1;");
  rect("col_lbl_3", "<span style='font-size:9px;font-weight:800;color:#7C3AED;'>STORAGE &amp; INDEXING</span>", 630, 164, 240, 12, "strokeColor=none;fillColor=none;align=center;");

  const stItems = [
    { t: "Log Buckets", sub: "(Regional / CMEK)", icon: "🗄️" },
    { t: "Time Series DB", sub: "(Monitoring Backend)", icon: "📈" },
    { t: "Trace Storage", sub: "(Cloud Trace)", icon: "⏱️" },
    { t: "BigQuery", sub: "(Long-term Analytics)", icon: "📊" }
  ];
  stItems.forEach((it, idx) => {
    const iy = 184 + idx * 70;
    rect(`col3_it_${idx}`, `<div style='font-size:12px;text-align:center;'>${it.icon}</div><div style='font-size:9px;font-weight:700;text-align:center;'>${it.t}</div><div style='font-size:8px;color:#64748B;text-align:center;'>${it.sub}</div>`, 640, iy, 220, 60, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=2;");
  });

  // Col 4: ANALYSIS & CORRELATION (x=880..1130)
  rect("col_box_4", "", 880, 162, 240, 310, "fillColor=#F0FDF4;strokeColor=#16A34A;rounded=1;");
  rect("col_lbl_4", "<span style='font-size:9px;font-weight:800;color:#16A34A;'>ANALYSIS &amp; CORRELATION</span>", 880, 164, 240, 12, "strokeColor=none;fillColor=none;align=center;");

  const anItems = [
    { t: "Monitoring Dashboards", sub: "(Metrics Explorer)", icon: "📊" },
    { t: "Log Analytics", sub: "(Logs Explorer)", icon: "📑" },
    { t: "Trace Analysis", sub: "(Trace Explorer)", icon: "⏱️" },
    { t: "Security Command Center", sub: "(Threat &amp; Vuln Mgmt)", icon: "🛡️" },
    { t: "BigQuery Analytics", sub: "(Custom Queries)", icon: "📈" }
  ];
  anItems.forEach((it, idx) => {
    const iy = 180 + idx * 56;
    rect(`col4_it_${idx}`, `<div style='font-size:9px;font-weight:700;'>${it.icon} ${it.t}</div><div style='font-size:8px;color:#64748B;'>${it.sub}</div>`, 890, iy, 220, 48, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=2;");
  });

  // Col 5: VISUALIZATION & ALERTING (x=1140..1396)
  rect("col_box_5", "", 1140, 162, 256, 310, "fillColor=#FFFBEB;strokeColor=#D97706;rounded=1;");
  rect("col_lbl_5", "<span style='font-size:9px;font-weight:800;color:#D97706;'>VISUALIZATION &amp; ALERTING</span>", 1140, 164, 256, 12, "strokeColor=none;fillColor=none;align=center;");

  const vizItems = [
    { t: "Dashboards", sub: "(Looker Studio / Cloud Monitoring)", icon: "📊" },
    { t: "Alert Policies", sub: "(Threshold / Anomaly)", icon: "🔔" },
    { t: "Notification Channels", sub: "(Email / Slack / PagerDuty)", icon: "📨" },
    { t: "SLO / Error Budget", sub: "(SLOs &amp; Uptime Checks)", icon: "⏱️" },
    { t: "Incident Management", sub: "(PagerDuty / Jira)", icon: "🚨" }
  ];
  vizItems.forEach((it, idx) => {
    const iy = 180 + idx * 56;
    rect(`col5_it_${idx}`, `<div style='font-size:9px;font-weight:700;'>${it.icon} ${it.t}</div><div style='font-size:8px;color:#64748B;'>${it.sub}</div>`, 1150, iy, 236, 48, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=2;");
  });

  // Observability Foundation
  rect("box_foundation", "<div style='font-size:10px;font-weight:800;color:#D97706;margin-bottom:3px;text-align:center;'>OBSERVABILITY FOUNDATION</div><div style='font-size:8px;color:#0F172A;display:flex;justify-content:space-around;text-align:center;align-items:center;'><div style='background:#FFF;border:1px solid #CBD5E1;padding:3px;border-radius:3px;'>👤 <b>IAM &amp; Least Privilege</b></div> <div style='background:#FFF;border:1px solid #CBD5E1;padding:3px;border-radius:3px;'>🔑 <b>CMEK Encryption</b><br/>(At Rest)</div> <div style='background:#FFF;border:1px solid #CBD5E1;padding:3px;border-radius:3px;'>📑 <b>Retention Policies</b><br/>(Per Data Type)</div> <div style='background:#FFF;border:1px solid #CBD5E1;padding:3px;border-radius:3px;'>🔒 <b>Data Access Controls</b><br/>(RBAC / ABAC)</div> <div style='background:#FFF;border:1px solid #CBD5E1;padding:3px;border-radius:3px;'>📊 <b>Sampling Policies</b><br/>(Traces / Logs)</div> <div style='background:#FFF;border:1px solid #CBD5E1;padding:3px;border-radius:3px;'>💰 <b>Cost Controls</b><br/>(Quotas / Budgets)</div></div>", 130, 478, 1266, 50, "fillColor=#FFFBEB;strokeColor=#D97706;rounded=1;align=center;verticalAlign=middle;padding=2;");

  // 5. FAR RIGHT: CONSUMERS & OUTCOMES (x=1416..1560, y=142..540)
  rect("box_consumers", "", 1416, 142, 144, 395, "fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;rounded=1;");
  rect("lbl_consumers", "<span style='font-size:9px;font-weight:800;color:#16A34A;'>CONSUMERS &amp;<br/>OUTCOMES</span>", 1416, 144, 144, 18, "strokeColor=none;fillColor=none;align=center;");

  const consumers = [
    { t: "SRE / DevOps", sub: "Operate &amp; Improve", icon: "⚙️" },
    { t: "Security Team", sub: "Detect &amp; Respond", icon: "🛡️" },
    { t: "Data / AI Team", sub: "Monitor Pipelines &amp; Models", icon: "🧠" },
    { t: "Product / Business", sub: "Understand Impact", icon: "💼" },
    { t: "Compliance / Audit", sub: "Reports &amp; Evidence", icon: "📑" },
    { t: "Leadership", sub: "KPIs &amp; Health", icon: "📊" }
  ];
  consumers.forEach((cs, idx) => {
    const cy = 168 + idx * 61;
    rect(`cs_${idx}`, `<div style='font-size:10px;text-align:center;'>${cs.icon}</div><div style='font-size:9px;font-weight:700;color:#0F172A;text-align:center;'>${cs.t}</div><div style='font-size:8px;color:#64748B;text-align:center;'>${cs.sub}</div>`, 1422, cy, 132, 54, "fillColor=#F0FDF4;strokeColor=#16A34A;rounded=1;align=center;verticalAlign=middle;padding=2;");
  });

  // 6. BOTTOM ROW: BENEFITS, SIGNALS, SLO, ALERTS, RETENTION, TECHS (x=20..1560, y=546..740)
  rect("bot_benefits", "<div style='font-size:10px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>KEY BENEFITS</div><div style='font-size:8px;line-height:1.35;color:#0F172A;'>✔ Full-stack visibility across applications, data, AI, and infra<br/>✔ Proactive issue detection with correlation across signals<br/>✔ Faster MTTR with actionable insights<br/>✔ SLO-driven reliability and error budget management<br/>✔ Security, compliance, and audit readiness<br/>✔ Cost visibility and optimization</div>", 20, 546, 260, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("bot_signals", "<div style='font-size:10px;font-weight:800;color:#2563EB;margin-bottom:2px;'>KEY SIGNALS &amp; KPIs</div><div style='font-size:8px;line-height:1.35;color:#0F172A;'>📈 <b>Availability</b> (SLA / SLO Compliance %)<br/>⏱️ <b>Latency</b> (P50 / P95 / P99)<br/>❌ <b>Error Rate</b> (4xx / 5xx %)<br/>🔄 <b>Throughput</b> (RPS / TPS)<br/>💻 <b>CPU / Memory / Disk Utilization</b><br/>📦 <b>Queue Depth / Backlog</b><br/>🧠 <b>AI Model Latency / Token Usage</b><br/>📊 <b>Data Freshness / Pipeline Lag</b></div>", 290, 546, 260, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("bot_slo", "<div style='font-size:10px;font-weight:800;color:#16A34A;margin-bottom:2px;'>SLO EXAMPLE (User API Service)</div><div style='font-size:8px;line-height:1.4;color:#0F172A;'>✔ <b>Availability SLO:</b> 99.95% (Monthly)<br/>⏱️ <b>Latency SLO:</b> P95 &lt; 500 ms<br/>🛡️ <b>Error Budget:</b> 21.6 minutes / month<br/>🔔 <b>Burn Rate Alerts:</b> 2x (14m), 14x (2m)</div>", 560, 546, 240, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("bot_alerts", "<div style='font-size:10px;font-weight:800;color:#DC2626;margin-bottom:2px;'>ALERTING EXAMPLES</div><div style='font-size:8px;line-height:1.35;color:#0F172A;'>🔺 <b>High Error Rate:</b> 5xx &gt; 1% for 5 min<br/>🔺 <b>High Latency:</b> P95 &gt; 1s for 5 min<br/>🔺 <b>SLO Burn Rate:</b> &gt; 2x for 14 min<br/>🔺 <b>Pipeline Delay:</b> Data lag &gt; 15 min<br/>🔺 <b>Security Finding:</b> Critical severity<br/>❌ <b>Instance Down:</b> Uptime &lt; 99.9%</div>", 810, 546, 240, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("bot_ret", "<div style='font-size:10px;font-weight:800;color:#D97706;margin-bottom:2px;'>DATA RETENTION (Defaults)</div><div style='font-size:8px;line-height:1.4;color:#0F172A;'>📑 <b>Logs (Hot):</b> 30 Days<br/>🗄️ <b>Logs (Archive):</b> 1 Year<br/>📈 <b>Metrics (High Res):</b> 6 Weeks<br/>📊 <b>Metrics (Standard):</b> 24 Months<br/>⏱️ <b>Traces:</b> 30 Days<br/>🔒 <b>Audit Logs:</b> 1 Year</div>", 1060, 546, 230, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("bot_techs", "<div style='font-size:10px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>TECHNOLOGIES</div><div style='font-size:8px;line-height:1.4;color:#0F172A;display:grid;grid-template-columns:repeat(2, 1fr);gap:2px;'><div>📑 Cloud Logging</div> <div>📊 BigQuery</div> <div>📈 Cloud Monitoring</div> <div>🛡️ SCC</div> <div>⏱️ Cloud Trace</div> <div>☁️ Ops Agent</div> <div>⚡ Eventarc</div> <div>📊 Looker Studio</div> <div>📨 Pub/Sub</div> <div>🚨 PagerDuty</div></div>", 1300, 546, 260, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  // 7. FOOTER METADATA STRIP (x=20..1560, y=744..768)
  rect("footer_meta", "<div style='font-size:9px;color:#0F172A;display:flex;justify-content:space-between;align-items:center;'><div>Version: 1.0</div><div>Date: May 2024</div></div>", 20, 744, 1540, 24, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=middle;padding=3;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_21_observability_architecture" name="Template 21: Observability Architecture">
    <mxGraphModel dx="1600" dy="780" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="780" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${c.join("\n        ")}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
