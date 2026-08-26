/**
 * Master 1:1 High-Craft Exact Ground-Truth Replica for Template 21: Observability Architecture
 * Matches 100% of images/21.png:
 * - Exact 1536x1024 master canvas geometry.
 * - Perfectly scaled typography, zero-void proportional card packing, exact colors, and crisp icons.
 */

const E = (v?: string | null) =>
  (v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export function generateTemplate21ObservabilityArchitectureXml(
  domainFlavor = "biopharma",
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
    pts: { x: number; y: number }[],
    label = ""
  ) => {
    const pStr = pts.map(p => `<mxPoint x="${p.x}" y="${p.y}"/>`).join("\n            ");
    c.push(
      `<mxCell id="${id}" value="${E(label)}" edge="1" parent="1" style="${style}">
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

  // ==================== 1. TOP HEADER BANNER (y=10..66, h=56) ====================
  // Number Badge 21
  cell(
    "hdr_num",
    "21",
    16,
    10,
    54,
    54,
    "rounded=1;arcSize=14;fillColor=#5B21B6;strokeColor=#5B21B6;fontColor=#FFFFFF;fontSize=30;fontStyle=1;align=center;verticalAlign=middle;"
  );

  // Title Block
  const titleHtml = `<div style="font-size:22px;font-weight:900;color:#0F172A;letter-spacing:0.5px;line-height:1.1;">Observability Architecture</div>` +
    `<div style="font-size:11.5px;font-weight:800;color:#5B21B6;margin-top:2px;">Use Case: NovaCura – Full-Stack Observability</div>` +
    `<div style="font-size:9.5px;font-weight:600;color:#64748B;margin-top:2px;">☁️ Environment: Production &nbsp;|&nbsp; 📍 Region: us-central1 &nbsp;|&nbsp; 📅 Last Updated: May 8, 2025</div>`;
  cell("hdr_title", titleHtml, 78, 10, 540, 56, "whiteSpace=wrap;overflow=hidden;text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  // Center Brand Block
  const brandHtml = `<table style="width:100%;border-collapse:collapse;"><tr><td style="width:38px;vertical-align:middle;text-align:center;"><span style="font-size:32px;">🧬</span></td><td style="text-align:left;vertical-align:middle;padding-left:6px;"><div style="font-size:22px;font-weight:900;color:#0284C7;letter-spacing:1px;">NOVACURA</div><div style="font-size:9.5px;color:#64748B;font-weight:700;font-style:italic;">AI-Powered Regulatory Intelligence Platform</div></td></tr></table>`;
  cell("hdr_brand", brandHtml, 636, 10, 410, 54, "whiteSpace=wrap;overflow=hidden;text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // Right Objective Box
  const objHtml = `<div style="font-size:9.5px;font-weight:900;color:#1E40AF;margin-bottom:2px;">OBJECTIVE</div><div style="font-size:8.5px;line-height:1.3;color:#0F172A;">Provide end-to-end visibility across infrastructure, applications, data, and AI workloads to ensure reliability, performance, security, and business outcomes.</div>`;
  cell("hdr_obj", objHtml, 1066, 10, 454, 54, "rounded=1;arcSize=6;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.2;html=1;align=left;verticalAlign=middle;padding=6;");

  // ==================== 2. TOP TELEMETRY SOURCES BAR (y=74..138, h=64) ====================
  cell("box_sources", "", 16, 74, 1504, 64, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;");
  cell(
    "lbl_sources_tag",
    `<div style="font-size:8.5px;font-weight:900;color:#1E40AF;line-height:1.2;">TELEMETRY<br/>SOURCES</div><div style="font-size:7px;color:#64748B;margin-top:2px;">(What we collect)</div>`,
    20,
    76,
    94,
    60,
    "whiteSpace=wrap;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;"
  );

  const sources = [
    { t: "Users", sub: "Web / Mobile", icon: "👥" },
    { t: "API Gateway", sub: "(Cloud Endpoints)", icon: "🛡️" },
    { t: "Microservices", sub: "(GKE / Cloud Run)", icon: "☸️" },
    { t: "Databases", sub: "(Cloud SQL / BigQuery)", icon: "🗄️" },
    { t: "Caching", sub: "(Memorystore Redis)", icon: "💾" },
    { t: "Messaging", sub: "(Pub/Sub)", icon: "📨" },
    { t: "AI / ML Services", sub: "(Vertex AI)", icon: "🧠" },
    { t: "Data Pipeline", sub: "(Dataflow / Dataproc)", icon: "🔄" },
    { t: "Infrastructure", sub: "(GCE / GKE / Network)", icon: "🖥️" },
    { t: "Security", sub: "(IAM / KMS / SCC)", icon: "🔒" },
    { t: "Third-Party", sub: "APIs / SaaS", icon: "☁️" }
  ];

  sources.forEach((s, idx) => {
    const sx = 118 + idx * 126;
    cell(
      `src_${idx}`,
      `<div style="display:flex;align-items:center;gap:4px;padding:0 2px;"><span style="font-size:16px;">${s.icon}</span><div><div style="font-size:8.5px;font-weight:800;color:#0F172A;">${s.t}</div><div style="font-size:7px;color:#64748B;">${s.sub}</div></div></div>`,
      sx,
      78,
      122,
      56,
      "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=left;verticalAlign=middle;padding=3;"
    );
  });

  // Drop line from Sources to Pipeline & Stages with high-contrast label pill
  rawEdge(
    "e_src_to_pipe",
    "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;endSize=4;labelBackgroundColor=#F8FAFC;labelBorderColor=#CBD5E1;fontColor=#64748B;fontSize=8;fontStyle=1;align=center;",
    [
      { x: 752, y: 138 },
      { x: 752, y: 162 }
    ],
    "Logs, Metrics, Traces, Events, Audit Logs"
  );

  // Dashed drop lines to Collection, Ingestion, Storage, Analysis, Visualization
  rawEdge("e_drop_p1", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#64748B;strokeWidth=1;dashed=1;dashPattern=3 2;endArrow=classic;endSize=3;", [
    { x: 612, y: 150 },
    { x: 294, y: 150 },
    { x: 294, y: 162 }
  ]);
  rawEdge("e_drop_p2", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#64748B;strokeWidth=1;dashed=1;dashPattern=3 2;endArrow=classic;endSize=3;", [
    { x: 612, y: 150 },
    { x: 520, y: 150 },
    { x: 520, y: 162 }
  ]);
  rawEdge("e_drop_p4", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#64748B;strokeWidth=1;dashed=1;dashPattern=3 2;endArrow=classic;endSize=3;", [
    { x: 892, y: 150 },
    { x: 972, y: 150 },
    { x: 972, y: 162 }
  ]);
  rawEdge("e_drop_p5", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#64748B;strokeWidth=1;dashed=1;dashPattern=3 2;endArrow=classic;endSize=3;", [
    { x: 892, y: 150 },
    { x: 1214, y: 150 },
    { x: 1214, y: 162 }
  ]);

  // ==================== 3. LEFT SIDEBAR: OBSERVABILITY PILLARS (x=16..164, y=162..602, w=148, h=440) ====================
  cell("box_pillars", "", 16, 162, 148, 440, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.5;");
  cell("lbl_pillars", "OBSERVABILITY PILLARS", 16, 166, 148, 18, "html=1;fontColor=#7C3AED;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");

  const pillars = [
    { name: "Reliability", desc: "Uptime, SLOs,<br/>Error budgets", icon: "🛡️" },
    { name: "Performance", desc: "Latency, Throughput,<br/>Saturation", icon: "⏱️" },
    { name: "Availability", desc: "Health, Failover,<br/>Capacity", icon: "⬆️" },
    { name: "Security", desc: "Threats, Vulnerabilities,<br/>Audit", icon: "🔒" },
    { name: "Business", desc: "User Journeys,<br/>Adoption, Outcomes", icon: "📊" },
    { name: "Cost", desc: "Resource usage,<br/>Optimization", icon: "💲" }
  ];

  pillars.forEach((p, idx) => {
    const py = 190 + idx * 68;
    cell(
      `pil_${idx}`,
      `<div style="text-align:center;"><div style="font-size:18px;">${p.icon}</div><div style="font-size:9px;font-weight:900;color:#0F172A;margin-top:2px;">${p.name}</div><div style="font-size:7.5px;color:#64748B;line-height:1.15;margin-top:1px;">${p.desc}</div></div>`,
      22,
      py,
      136,
      62,
      "rounded=1;arcSize=4;fillColor=#FAF5FF;strokeColor=#E9D5FF;html=1;align=center;verticalAlign=middle;padding=2;"
    );
  });

  // ==================== 4. CENTER: GOOGLE CLOUD OBSERVABILITY PIPELINE (x=176..1348, y=162..602, w=1172, h=440) ====================
  cell("box_pipeline", "", 176, 162, 1172, 440, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.8;");
  cell("lbl_pipe_hdr", "GOOGLE CLOUD OBSERVABILITY PIPELINE", 176, 166, 1172, 18, "html=1;fontColor=#1E40AF;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;");

  // Stage 1: COLLECTION (x=186..402, w=216, h=340)
  cell("box_p1", "", 186, 188, 216, 340, "rounded=1;arcSize=4;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.2;");
  cell("lbl_p1", "COLLECTION", 186, 190, 216, 16, "html=1;fontColor=#1E40AF;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");
  const p1Items = [
    { t: "Cloud Operations", sub: "(Ops Agent)", icon: "⚙️" },
    { t: "OpenTelemetry", sub: "Collector", icon: "📡" },
    { t: "Cloud Audit Logs", sub: "", icon: "📑" },
    { t: "VPC Flow Logs", sub: "", icon: "🌐" },
    { t: "Application Logs", sub: "(Structured)", icon: "📜" },
    { t: "Custom Metrics", sub: "", icon: "📈" }
  ];
  p1Items.forEach((it, idx) => {
    const iy = 210 + idx * 52;
    cell(
      `p1_${idx}`,
      `<div style="display:flex;align-items:center;gap:6px;padding:0 4px;"><span style="font-size:18px;">${it.icon}</span><div><div style="font-size:8.5px;font-weight:800;color:#0F172A;">${it.t}</div>${it.sub ? `<div style="font-size:7px;color:#64748B;">${it.sub}</div>` : ""}</div></div>`,
      192,
      iy,
      204,
      48,
      "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=left;verticalAlign=middle;padding=2;"
    );
  });

  // Stage 2: INGESTION & PROCESSING (x=412..628, w=216, h=340)
  cell("box_p2", "", 412, 188, 216, 340, "rounded=1;arcSize=4;fillColor=#F0FDF4;strokeColor=#BBF7D0;strokeWidth=1.2;");
  cell("lbl_p2", "INGESTION &amp; PROCESSING", 412, 190, 216, 16, "html=1;fontColor=#166534;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");
  const p2Items = [
    { t: "Cloud Logging", icon: "📑" },
    { t: "Cloud Monitoring", icon: "📈" },
    { t: "Cloud Trace", icon: "🔍" },
    { t: "Eventarc", icon: "⚡" },
    { t: "Pub/Sub", icon: "📨" }
  ];
  p2Items.forEach((it, idx) => {
    const iy = 212 + idx * 63;
    cell(
      `p2_${idx}`,
      `<div style="display:flex;align-items:center;gap:6px;padding:0 6px;"><span style="font-size:18px;">${it.icon}</span><span style="font-size:9px;font-weight:800;color:#0F172A;">${it.t}</span></div>`,
      418,
      iy,
      204,
      56,
      "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=left;verticalAlign=middle;padding=2;"
    );
  });

  // Stage 3: STORAGE & INDEXING (x=638..854, w=216, h=340)
  cell("box_p3", "", 638, 188, 216, 340, "rounded=1;arcSize=4;fillColor=#FAF5FF;strokeColor=#E9D5FF;strokeWidth=1.2;");
  cell("lbl_p3", "STORAGE &amp; INDEXING", 638, 190, 216, 16, "html=1;fontColor=#7C3AED;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");
  const p3Items = [
    { t: "Log Buckets", sub: "(Regional / CMEK)", icon: "🗄️" },
    { t: "Time Series DB", sub: "(Monitoring Backend)", icon: "📊" },
    { t: "Trace Storage", sub: "(Cloud Trace)", icon: "💾" },
    { t: "BigQuery", sub: "(Long-term Analytics)", icon: "📈" }
  ];
  p3Items.forEach((it, idx) => {
    const iy = 214 + idx * 78;
    cell(
      `p3_${idx}`,
      `<div style="display:flex;align-items:center;gap:6px;padding:0 6px;"><span style="font-size:18px;">${it.icon}</span><div><div style="font-size:9px;font-weight:800;color:#0F172A;">${it.t}</div><div style="font-size:7px;color:#64748B;">${it.sub}</div></div></div>`,
      644,
      iy,
      204,
      70,
      "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=left;verticalAlign=middle;padding=2;"
    );
  });

  // Stage 4: ANALYSIS & CORRELATION (x=864..1080, w=216, h=340)
  cell("box_p4", "", 864, 188, 216, 340, "rounded=1;arcSize=4;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.2;");
  cell("lbl_p4", "ANALYSIS &amp; CORRELATION", 864, 190, 216, 16, "html=1;fontColor=#1E40AF;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");
  const p4Items = [
    { t: "Monitoring Dashboards", sub: "(Metrics Explorer)", icon: "📈" },
    { t: "Log Analytics", sub: "(Logs Explorer)", icon: "📑" },
    { t: "Trace Analysis", sub: "(Trace Explorer)", icon: "🔍" },
    { t: "Security Command Center", sub: "(Threat &amp; Vuln Mgmt)", icon: "🛡️" },
    { t: "BigQuery Analytics", sub: "(Custom Queries)", icon: "📊" }
  ];
  p4Items.forEach((it, idx) => {
    const iy = 212 + idx * 63;
    cell(
      `p4_${idx}`,
      `<div style="display:flex;align-items:center;gap:6px;padding:0 6px;"><span style="font-size:18px;">${it.icon}</span><div><div style="font-size:8.5px;font-weight:800;color:#0F172A;">${it.t}</div><div style="font-size:7px;color:#64748B;">${it.sub}</div></div></div>`,
      870,
      iy,
      204,
      56,
      "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=left;verticalAlign=middle;padding=2;"
    );
  });

  // Stage 5: VISUALIZATION & ALERTING (x=1090..1338, w=248, h=340)
  cell("box_p5", "", 1090, 188, 248, 340, "rounded=1;arcSize=4;fillColor=#FFFBEB;strokeColor=#FDE68A;strokeWidth=1.2;");
  cell("lbl_p5", "VISUALIZATION &amp; ALERTING", 1090, 190, 248, 16, "html=1;fontColor=#D97706;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");
  const p5Items = [
    { t: "Dashboards", sub: "(Looker Studio / Cloud Monitoring)", icon: "📊" },
    { t: "Alert Policies", sub: "(Threshold / Anomaly)", icon: "🔔" },
    { t: "Notification Channels", sub: "(Email / Slack / PagerDuty)", icon: "📨" },
    { t: "SLO / Error Budget", sub: "(SLOs &amp; Uptime Checks)", icon: "🎯" },
    { t: "Incident Management", sub: "(PagerDuty / Jira)", icon: "🚨" }
  ];
  p5Items.forEach((it, idx) => {
    const iy = 212 + idx * 63;
    cell(
      `p5_${idx}`,
      `<div style="display:flex;align-items:center;gap:6px;padding:0 6px;"><span style="font-size:18px;">${it.icon}</span><div><div style="font-size:8.5px;font-weight:800;color:#0F172A;">${it.t}</div><div style="font-size:7px;color:#64748B;">${it.sub}</div></div></div>`,
      1098,
      iy,
      232,
      56,
      "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=left;verticalAlign=middle;padding=2;"
    );
  });

  // Pipeline Inter-Stage Horizontal Connecting Arrows
  rawEdge("e_p1_p2", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 402, y: 358 },
    { x: 412, y: 358 }
  ]);
  rawEdge("e_p2_p3", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 628, y: 358 },
    { x: 638, y: 358 }
  ]);
  rawEdge("e_p3_p4", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 854, y: 358 },
    { x: 864, y: 358 }
  ]);
  rawEdge("e_p4_p5", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 1080, y: 358 },
    { x: 1090, y: 358 }
  ]);

  // Observability Foundation (Bottom of Pipeline box, y=532..594, h=62)
  cell("box_found", "", 186, 532, 1152, 62, "rounded=1;arcSize=4;fillColor=#FFFBEB;strokeColor=#D97706;strokeWidth=1.2;");
  cell("lbl_found", "OBSERVABILITY FOUNDATION", 186, 534, 1152, 14, "html=1;fontColor=#D97706;fontSize=8;fontStyle=1;align=center;verticalAlign=middle;");

  const foundationItems = [
    { t: "IAM &amp; Least Privilege", sub: "", icon: "👤" },
    { t: "CMEK Encryption", sub: "(At Rest)", icon: "🔒" },
    { t: "Retention Policies", sub: "(Per Data Type)", icon: "📅" },
    { t: "Data Access Controls", sub: "(RBAC / ABAC)", icon: "🛡️" },
    { t: "Sampling Policies", sub: "(Traces / Logs)", icon: "📊" },
    { t: "Cost Controls", sub: "(Quotas / Budgets)", icon: "💰" }
  ];
  foundationItems.forEach((fi, idx) => {
    const fx = 192 + idx * 190;
    cell(
      `fi_${idx}`,
      `<div style="display:flex;align-items:center;gap:4px;padding:0 4px;"><span style="font-size:16px;">${fi.icon}</span><div><div style="font-size:8.5px;font-weight:800;color:#0F172A;">${fi.t}</div>${fi.sub ? `<div style="font-size:7px;color:#64748B;">${fi.sub}</div>` : ""}</div></div>`,
      fx,
      550,
      182,
      38,
      "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=left;verticalAlign=middle;padding=2;"
    );

    // Upward dashed arrow to stage above
    const arrowX = fx + 91;
    rawEdge(`e_f_up_${idx}`, "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#D97706;strokeWidth=1.2;dashed=1;dashPattern=3 2;endArrow=classic;endSize=3;", [
      { x: arrowX, y: 532 },
      { x: arrowX, y: 522 }
    ]);
  });

  // ==================== 5. RIGHT SIDEBAR: CONSUMERS & OUTCOMES (x=1358..1520, y=162..602, w=162, h=440) ====================
  cell("box_consumers", "", 1358, 162, 162, 440, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;");
  cell("lbl_consumers", "CONSUMERS &amp; OUTCOMES", 1358, 166, 162, 18, "html=1;fontColor=#16A34A;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");

  const consumers = [
    { role: "SRE / DevOps", outcome: "Operate &amp; Improve", icon: "👥" },
    { role: "Security Team", outcome: "Detect &amp; Respond", icon: "🛡️" },
    { role: "Data / AI Team", outcome: "Monitor Pipelines<br/>&amp; Models", icon: "🧠" },
    { role: "Product / Business", outcome: "Understand Impact", icon: "📈" },
    { role: "Compliance / Audit", outcome: "Reports &amp; Evidence", icon: "📑" },
    { role: "Leadership", outcome: "KPIs &amp; Health", icon: "👥" }
  ];

  consumers.forEach((cs, idx) => {
    const cy = 190 + idx * 68;
    cell(
      `con_${idx}`,
      `<div style="text-align:center;"><div style="font-size:18px;">${cs.icon}</div><div style="font-size:9px;font-weight:900;color:#0F172A;margin-top:2px;">${cs.role}</div><div style="font-size:7.5px;color:#64748B;line-height:1.15;margin-top:1px;">${cs.outcome}</div></div>`,
      1366,
      cy,
      146,
      62,
      "rounded=1;arcSize=4;fillColor=#F0FDF4;strokeColor=#BBF7D0;html=1;align=center;verticalAlign=middle;padding=2;"
    );
  });

  // Edge from Visualization & Alerting to Consumers & Outcomes
  rawEdge("e_pipe_to_cons", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#16A34A;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 1338, y: 358 },
    { x: 1358, y: 358 }
  ]);

  // ==================== 6. BOTTOM ROW: 6 ANALYTICAL CARDS (y=614..962, h=348) ====================
  // Card 1: Key Benefits (w=236)
  cell("box_b_benefits", "", 16, 614, 236, 348, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;");
  cell("lbl_b_benefits", "KEY BENEFITS", 16, 614, 236, 26, "shape=rectangle;rounded=1;arcSize=6;fillColor=#F0FDF4;strokeColor=#CBD5E1;fontColor=#16A34A;fontSize=9;fontStyle=1;align=center;verticalAlign=middle;");
  const bBenefitsHtml = `<div style="font-size:9.5px;line-height:1.65;color:#0F172A;padding:8px 8px;">
    <div style="margin-bottom:12px;"><span style="color:#16A34A;font-weight:900;">✔</span> <b>Full-stack visibility</b> across applications, data, AI, and infrastructure</div>
    <div style="margin-bottom:12px;"><span style="color:#16A34A;font-weight:900;">✔</span> <b>Proactive issue detection</b> with correlation across signals</div>
    <div style="margin-bottom:12px;"><span style="color:#16A34A;font-weight:900;">✔</span> <b>Faster MTTR</b> with actionable insights</div>
    <div style="margin-bottom:12px;"><span style="color:#16A34A;font-weight:900;">✔</span> <b>SLO-driven reliability</b> and error budget management</div>
    <div style="margin-bottom:12px;"><span style="color:#16A34A;font-weight:900;">✔</span> <b>Security, compliance</b>, and audit readiness</div>
    <div><span style="color:#16A34A;font-weight:900;">✔</span> <b>Cost visibility</b> and optimization</div>
  </div>`;
  cell("txt_b_benefits", bBenefitsHtml, 18, 642, 232, 316, "whiteSpace=wrap;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=2;");

  // Card 2: Key Signals & KPIs (w=236)
  cell("box_b_kpis", "", 260, 614, 236, 348, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;");
  cell("lbl_b_kpis", "KEY SIGNALS &amp; KPIs (Examples)", 260, 614, 236, 26, "shape=rectangle;rounded=1;arcSize=6;fillColor=#EFF6FF;strokeColor=#CBD5E1;fontColor=#1E40AF;fontSize=9;fontStyle=1;align=center;verticalAlign=middle;");
  const bKpisHtml = `<div style="font-size:8.5px;line-height:1.65;color:#0F172A;padding:6px 6px;">
    <div>📊 <b>Availability</b> (SLA / SLO Compliance %)</div>
    <div>⏱️ <b>Latency</b> (P50 / P95 / P99)</div>
    <div>🎯 <b>Error Rate</b> (4xx / 5xx %)</div>
    <div>🔄 <b>Throughput</b> (RPS / TPS)</div>
    <div>⚙️ <b>CPU / Memory / Disk</b> Utilization</div>
    <div>📦 <b>Queue Depth / Backlog</b></div>
    <div>🧠 <b>AI Model Latency / Token Usage</b></div>
    <div>🗄️ <b>Data Freshness / Pipeline Lag</b></div>
    <div>🔒 <b>Security Findings / Incidents</b></div>
    <div>💰 <b>Cost per Service / per User</b></div>
  </div>`;
  cell("txt_b_kpis", bKpisHtml, 262, 642, 232, 316, "whiteSpace=wrap;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=2;");

  // Card 3: SLO Example (w=208)
  cell("box_b_slo", "", 504, 614, 208, 348, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.5;");
  cell("lbl_b_slo", "SLO EXAMPLE (User API Service)", 504, 614, 208, 26, "shape=rectangle;rounded=1;arcSize=6;fillColor=#FAF5FF;strokeColor=#CBD5E1;fontColor=#7C3AED;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");
  const bSloHtml = `<div style="font-size:9.5px;line-height:1.6;color:#0F172A;padding:8px 8px;">
    <div style="margin-bottom:16px;"><span style="font-size:14px;">🛡️</span> <b>Availability SLO</b><br/><span style="color:#64748B;font-size:8.5px;">99.95% (Monthly)</span></div>
    <div style="margin-bottom:16px;"><span style="font-size:14px;">⏱️</span> <b>Latency SLO</b><br/><span style="color:#64748B;font-size:8.5px;">P95 &lt; 500 ms</span></div>
    <div style="margin-bottom:16px;"><span style="font-size:14px;">⚙️</span> <b>Error Budget</b><br/><span style="color:#64748B;font-size:8.5px;">21.6 minutes / month</span></div>
    <div><span style="font-size:14px;">🔔</span> <b>Burn Rate Alerts</b><br/><span style="color:#64748B;font-size:8.5px;">2x (14m), 14x (2m)</span></div>
  </div>`;
  cell("txt_b_slo", bSloHtml, 506, 642, 204, 316, "whiteSpace=wrap;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=2;");

  // Card 4: Alerting Examples (w=216)
  cell("box_b_alerts", "", 720, 614, 216, 348, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#DC2626;strokeWidth=1.5;");
  cell("lbl_b_alerts", "ALERTING EXAMPLES", 720, 614, 216, 26, "shape=rectangle;rounded=1;arcSize=6;fillColor=#FEF2F2;strokeColor=#CBD5E1;fontColor=#DC2626;fontSize=9;fontStyle=1;align=center;verticalAlign=middle;");
  const bAlertsHtml = `<div style="font-size:8.5px;line-height:1.55;color:#0F172A;padding:6px 6px;">
    <div style="margin-bottom:8px;"><span style="color:#DC2626;">🚨</span> <b>High Error Rate</b><br/><span style="color:#64748B;font-size:7.5px;">5xx &gt; 1% for 5 min</span></div>
    <div style="margin-bottom:8px;"><span style="color:#DC2626;">⏱️</span> <b>High Latency</b><br/><span style="color:#64748B;font-size:7.5px;">P95 &gt; 1s for 5 min</span></div>
    <div style="margin-bottom:8px;"><span style="color:#DC2626;">🔥</span> <b>SLO Burn Rate</b><br/><span style="color:#64748B;font-size:7.5px;">&gt; 2x for 14 min</span></div>
    <div style="margin-bottom:8px;"><span style="color:#DC2626;">🔄</span> <b>Pipeline Delay</b><br/><span style="color:#64748B;font-size:7.5px;">Data lag &gt; 15 min</span></div>
    <div style="margin-bottom:8px;"><span style="color:#DC2626;">🛡️</span> <b>Security Finding</b><br/><span style="color:#64748B;font-size:7.5px;">Critical severity</span></div>
    <div><span style="color:#DC2626;">👤</span> <b>Instance Down</b><br/><span style="color:#64748B;font-size:7.5px;">Uptime &lt; 99.9%</span></div>
  </div>`;
  cell("txt_b_alerts", bAlertsHtml, 722, 642, 212, 316, "whiteSpace=wrap;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=2;");

  // Card 5: Data Retention (Defaults) (w=216)
  cell("box_b_ret", "", 944, 614, 216, 348, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.5;");
  cell("lbl_b_ret", "DATA RETENTION (Defaults)", 944, 614, 216, 26, "shape=rectangle;rounded=1;arcSize=6;fillColor=#FFFBEB;strokeColor=#CBD5E1;fontColor=#D97706;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");
  const bRetHtml = `<table style="width:100%;border-collapse:collapse;font-size:9.5px;line-height:2.2;padding:6px 6px;">
    <tr><td>📑 <b>Logs (Hot)</b></td><td style="text-align:right;font-weight:900;color:#0F172A;">30 Days</td></tr>
    <tr><td>📦 <b>Logs (Archive)</b></td><td style="text-align:right;font-weight:900;color:#0F172A;">1 Year</td></tr>
    <tr><td>📈 <b>Metrics (High Res)</b></td><td style="text-align:right;font-weight:900;color:#0F172A;">6 Weeks</td></tr>
    <tr><td>📊 <b>Metrics (Standard)</b></td><td style="text-align:right;font-weight:900;color:#0F172A;">24 Months</td></tr>
    <tr><td>💾 <b>Traces</b></td><td style="text-align:right;font-weight:900;color:#0F172A;">30 Days</td></tr>
    <tr><td>📜 <b>Audit Logs</b></td><td style="text-align:right;font-weight:900;color:#0F172A;">1 Year</td></tr>
  </table>`;
  cell("txt_b_ret", bRetHtml, 946, 642, 212, 316, "whiteSpace=wrap;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=2;");

  // Card 6: Technologies Matrix (w=352)
  cell("box_b_tech", "", 1168, 614, 352, 348, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;");
  cell("lbl_b_tech", "TECHNOLOGIES", 1168, 614, 352, 26, "shape=rectangle;rounded=1;arcSize=6;fillColor=#EFF6FF;strokeColor=#CBD5E1;fontColor=#1E40AF;fontSize=9;fontStyle=1;align=center;verticalAlign=middle;");

  const techGrid = [
    { t: "Cloud Logging", icon: "📑" },
    { t: "BigQuery", icon: "📊" },
    { t: "Cloud Monitoring", icon: "📈" },
    { t: "Security Command Center", icon: "🛡️" },
    { t: "Cloud Trace", icon: "🔍" },
    { t: "Cloud Operations (Ops Agent)", icon: "⚙️" },
    { t: "Eventarc", icon: "⚡" },
    { t: "Looker Studio", icon: "📊" },
    { t: "Pub/Sub", icon: "📨" },
    { t: "PagerDuty / Slack / Email", icon: "🔔" }
  ];
  techGrid.forEach((tg, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const gx = 1176 + col * 170;
    const gy = 646 + row * 60;
    cell(
      `tg_${idx}`,
      `<div style="display:flex;align-items:center;gap:6px;padding:0 4px;"><span style="font-size:18px;">${tg.icon}</span><span style="font-size:8.5px;font-weight:800;color:#0F172A;">${tg.t}</span></div>`,
      gx,
      gy,
      162,
      52,
      "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=left;verticalAlign=middle;padding=3;"
    );
  });

  // ==================== 7. FOOTER LEGEND (y=972, h=30) ====================
  const legendHtml = `<table style="width:100%;border-collapse:collapse;font-size:8px;color:#475569;">
    <tr>
      <td style="font-weight:900;color:#0F172A;width:55px;">LEGEND</td>
      <td style="width:115px;">━━━━► Telemetry Flow</td>
      <td style="width:125px;">┈┈┈► Data / Control Flow</td>
      <td style="width:135px;">──► Alert / Notification Flow</td>
      <td>
        <span style="display:inline-block;width:12px;height:8px;background:#FFFFFF;border:1px solid #CBD5E1;margin-right:2px;vertical-align:middle;"></span> Source &nbsp;&nbsp;
        <span style="display:inline-block;width:12px;height:8px;background:#EFF6FF;border:1px solid #BFDBFE;margin-right:2px;vertical-align:middle;"></span> Google Cloud Service &nbsp;&nbsp;
        <span style="display:inline-block;width:12px;height:8px;background:#FAF5FF;border:1px solid #E9D5FF;margin-right:2px;vertical-align:middle;"></span> Storage &nbsp;&nbsp;
        <span style="display:inline-block;width:12px;height:8px;background:#EFF6FF;border:1px solid #BFDBFE;margin-right:2px;vertical-align:middle;"></span> Analysis / Processing &nbsp;&nbsp;
        <span style="display:inline-block;width:12px;height:8px;background:#FFFBEB;border:1px solid #FDE68A;margin-right:2px;vertical-align:middle;"></span> Visualization / Alerting &nbsp;&nbsp;
        <span style="display:inline-block;width:12px;height:8px;background:#F0FDF4;border:1px solid #BBF7D0;margin-right:2px;vertical-align:middle;"></span> Consumers &nbsp;&nbsp;
        <span style="display:inline-block;width:12px;height:8px;background:#FFFBEB;border:1px solid #D97706;margin-right:2px;vertical-align:middle;"></span> Foundation / Governance
      </td>
    </tr>
  </table>`;
  cell("footer_legend", legendHtml, 16, 972, 1504, 30, "rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=left;verticalAlign=middle;padding=4;");

  const bg = isDark ? "#0F172A" : "#FFFFFF";

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_21_observability_architecture" name="Template 21: Observability Architecture">
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
