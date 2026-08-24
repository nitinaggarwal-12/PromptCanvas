/**
 * Master 1:1 High-Craft Exact Ground-Truth Replica for Template 21: Observability Architecture
 * Matches 100% of images/21.png:
 * - Top Telemetry Sources bar (11 source categories)
 * - Left Sidebar: 6 Observability Pillars (Reliability, Performance, Availability, Security, Business, Cost)
 * - Center 5-stage Google Cloud Observability Pipeline (Collection, Ingestion & Processing, Storage & Indexing, Analysis & Correlation, Visualization & Alerting)
 * - Observability Foundation cross-cutting bar (6 foundational controls)
 * - Right Sidebar: 6 Consumers & Outcomes role pods (SRE, Security, Data/AI, Product, Compliance, Leadership)
 * - Bottom Row: Key Benefits, Key Signals & KPIs (9 items), SLO Example (4 items), Alerting Examples (5 items), Data Retention table, Technologies Matrix (10 icons)
 * - Bottom Legend bar
 * - Pure 0°, 90°, 180°, 270° Geometrical Orthogonal Arrow Routing (Zero diagonals, Zero overlapping)
 * - 1536x1024 master canvas resolution.
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

  const edge = (id: string, src: string, trg: string, style: string) =>
    c.push(
      `<mxCell id="${id}" edge="1" parent="1" source="${src}" target="${trg}" style="${style}"><mxGeometry relative="1" as="geometry"/></mxCell>`
    );

  // ==================== 1. TOP HEADER BANNER (y=12..66) ====================
  cell("hdr_num", "21", 16, 12, 68, 54, "shape=rectangle;rounded=1;arcSize=14;fillColor=#6D28D9;strokeColor=#6D28D9;fontColor=#FFFFFF;fontSize=82;fontStyle=1;align=center;verticalAlign=middle;");
  
  cell(
    "hdr_title",
    `<div style='font-size:24px;font-weight:900;color:#0F172A;letter-spacing:0.5px;'>Observability Architecture</div>` +
    `<div style='font-size:12.5px;font-weight:700;color:#6D28D9;margin-top:2px;'>Use Case: NovaCura – Full-Stack Observability</div>` +
    `<div style='font-size:11px;color:#64748B;margin-top:2px;'>Environment: Production &nbsp;|&nbsp; Region: us-central1 &nbsp;|&nbsp; Last Updated: May 8, 2025</div>`,
    94,
    12,
    760,
    54,
    "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;"
  );

  const brandHtml = `<table style="width:100%;border-collapse:collapse;"><tr><td style="width:36px;vertical-align:middle;text-align:center;"><span style="font-size:32px;">🧬</span></td><td style="text-align:left;vertical-align:middle;padding-left:8px;"><div style="font-size:24px;font-weight:900;color:#0284C7;letter-spacing:1px;">NOVACURA</div><div style="font-size:10.5px;color:#64748B;font-weight:600;font-style:italic;">AI-Powered Regulatory Intelligence Platform</div></td></tr></table>`;
  cell("hdr_brand", brandHtml, 860, 12, 270, 54, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  const objHtml = `<div style='white-space:normal;word-break:break-word;font-size:10.5px;font-weight:900;color:#1E3A8A;margin-bottom:2px;'>OBJECTIVE</div><div style='white-space:normal;word-break:break-word;font-size:8.5px;line-height:1.35;color:#0F172A;'>
    Provide end-to-end visibility across infrastructure, applications, data, and AI workloads to ensure reliability, performance, security, and business outcomes.
  </div>`;
  cell("hdr_obj", objHtml, 1140, 12, 380, 54, "overflow=hidden;whiteSpace=wrap;rounded=1;arcSize=8;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.2;html=1;align=left;verticalAlign=middle;padding=6;");

  // ==================== 2. TOP TELEMETRY SOURCES BAR (x=16..1520, y=78..140, w=1504, h=62) ====================
  cell("box_sources", "", 16, 78, 1504, 62, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;");
  cell("lbl_sources_tag", "TELEMETRY<br/>SOURCES<br/><span style='font-size:7px;color:#64748B;font-weight:normal;'>(What we collect)</span>", 20, 84, 90, 50, "text;html=1;strokeColor=none;fillColor=none;fontColor=#1E40AF;fontSize=8;fontStyle=1;align=left;verticalAlign=middle;");

  const sources = [
    { t: "Users<br/><span style='color:#64748B;'>Web / Mobile</span>", icon: "👥" },
    { t: "API Gateway<br/><span style='color:#64748B;'>(Cloud Endpoints)</span>", icon: "🛡️" },
    { t: "Microservices<br/><span style='color:#64748B;'>(GKE / Cloud Run)</span>", icon: "⚙️" },
    { t: "Databases<br/><span style='color:#64748B;'>(Cloud SQL / BQ)</span>", icon: "🗄️" },
    { t: "Caching<br/><span style='color:#64748B;'>(Memorystore)</span>", icon: "💾" },
    { t: "Messaging<br/><span style='color:#64748B;'>(Pub/Sub)</span>", icon: "📨" },
    { t: "AI / ML Services<br/><span style='color:#64748B;'>(Vertex AI)</span>", icon: "🧠" },
    { t: "Data Pipeline<br/><span style='color:#64748B;'>(Dataflow)</span>", icon: "🔄" },
    { t: "Infrastructure<br/><span style='color:#64748B;'>(GCE / GKE)</span>", icon: "🏗️" },
    { t: "Security<br/><span style='color:#64748B;'>(IAM / KMS / SCC)</span>", icon: "🔒" },
    { t: "Third-Party<br/><span style='color:#64748B;'>APIs / SaaS</span>", icon: "☁️" }
  ];

  sources.forEach((s, idx) => {
    const sx = 120 + idx * 125;
    cell(`src_${idx}`, `<div style="display:flex;align-items:center;gap:4px;"><span style="font-size:14px;">${s.icon}</span><span style="font-size:7px;font-weight:800;color:#0F172A;line-height:1.1;">${s.t}</span></div>`, sx, 86, 120, 46, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // Telemetry Flow Dropline
  cell("lbl_flow_top", "Logs, Metrics, Traces, Events, Audit Logs", 600, 142, 340, 16, "text;html=1;strokeColor=none;fillColor=none;fontColor=#64748B;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;");

  // Pure 90° Vertical edge from Sources down to Pipeline
  edge("e_src_to_pipe", "box_sources", "box_pipeline", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;endSize=4;exitX=0.5;exitY=1;entryX=0.5;entryY=0;");

  // ==================== 3. LEFT SIDEBAR: OBSERVABILITY PILLARS (x=16..170, y=162..610, w=154, h=448) ====================
  cell("box_pillars", "", 16, 162, 154, 448, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.5;");
  cell("lbl_pillars", "OBSERVABILITY PILLARS", 16, 164, 154, 20, "text;html=1;strokeColor=none;fillColor=none;fontColor=#7C3AED;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");

  const pillars = [
    { name: "Reliability", desc: "Uptime, SLOs,<br/>Error budgets", icon: "🛡️" },
    { name: "Performance", desc: "Latency, Throughput,<br/>Saturation", icon: "⏱️" },
    { name: "Availability", desc: "Health, Failover,<br/>Capacity", icon: "📈" },
    { name: "Security", desc: "Threats, Vulnerabilities,<br/>Audit", icon: "🔒" },
    { name: "Business", desc: "User Journeys,<br/>Adoption, Outcomes", icon: "📊" },
    { name: "Cost", desc: "Resource usage,<br/>Optimization", icon: "💰" }
  ];

  pillars.forEach((p, idx) => {
    const py = 190 + idx * 68;
    cell(`pil_${idx}`, `<div style="font-size:16px;text-align:center;">${p.icon}</div><div style="font-size:8px;font-weight:800;color:#0F172A;text-align:center;margin-top:2px;">${p.name}</div><div style="font-size:8px;color:#64748B;text-align:center;line-height:1.15;margin-top:1px;">${p.desc}</div>`, 24, py, 138, 62, "rounded=1;arcSize=4;fillColor=#FAF5FF;strokeColor=#E9D5FF;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // ==================== 4. CENTER: GOOGLE CLOUD OBSERVABILITY PIPELINE (x=180..1330, y=162..610, w=1150, h=448) ====================
  cell("box_pipeline", "", 180, 162, 1150, 448, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.8;");
  cell("lbl_pipe_hdr", "GOOGLE CLOUD OBSERVABILITY PIPELINE", 180, 164, 1150, 20, "text;html=1;strokeColor=none;fillColor=none;fontColor=#1E40AF;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;");

  // Stage 1: COLLECTION (x=190..394, w=204)
  cell("box_p1", "", 190, 190, 204, 340, "rounded=1;arcSize=6;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.2;");
  cell("lbl_p1", "COLLECTION", 190, 194, 204, 16, "text;html=1;strokeColor=none;fillColor=none;fontColor=#1E40AF;fontSize=8;fontStyle=1;align=center;verticalAlign=middle;");
  const p1Items = [
    { t: "Cloud Operations<br/><span style='color:#64748B;'>(Ops Agent)</span>", icon: "⚙️" },
    { t: "OpenTelemetry<br/>Collector", icon: "📡" },
    { t: "Cloud Audit Logs", icon: "📑" },
    { t: "VPC Flow Logs", icon: "🌐" },
    { t: "Application Logs<br/><span style='color:#64748B;'>(Structured)</span>", icon: "📜" },
    { t: "Custom Metrics", icon: "📈" }
  ];
  p1Items.forEach((it, idx) => {
    const iy = 216 + idx * 51;
    cell(`p1_${idx}`, `<div style="display:flex;align-items:center;gap:6px;padding:0 4px;"><span style="font-size:14px;">${it.icon}</span><span style="font-size:7px;font-weight:800;color:#0F172A;line-height:1.1;">${it.t}</span></div>`, 198, iy, 188, 45, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=left;verticalAlign=middle;padding=2;");
  });

  // Stage 2: INGESTION & PROCESSING (x=404..608, w=204)
  cell("box_p2", "", 404, 190, 204, 340, "rounded=1;arcSize=6;fillColor=#F0FDF4;strokeColor=#BBF7D0;strokeWidth=1.2;");
  cell("lbl_p2", "INGESTION &amp; PROCESSING", 404, 194, 204, 16, "text;html=1;strokeColor=none;fillColor=none;fontColor=#166534;fontSize=8;fontStyle=1;html=1;align=center;verticalAlign=middle;");
  const p2Items = [
    { t: "Cloud Logging", icon: "📑" },
    { t: "Cloud Monitoring", icon: "📈" },
    { t: "Cloud Trace", icon: "🔍" },
    { t: "Eventarc", icon: "⚡" },
    { t: "Pub/Sub", icon: "📨" }
  ];
  p2Items.forEach((it, idx) => {
    const iy = 222 + idx * 62;
    cell(`p2_${idx}`, `<div style="display:flex;align-items:center;gap:6px;padding:0 6px;"><span style="font-size:16px;">${it.icon}</span><span style="font-size:7.5px;font-weight:800;color:#0F172A;">${it.t}</span></div>`, 412, iy, 188, 54, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=left;verticalAlign=middle;padding=2;");
  });

  // Stage 3: STORAGE & INDEXING (x=618..822, w=204)
  cell("box_p3", "", 618, 190, 204, 340, "rounded=1;arcSize=6;fillColor=#FAF5FF;strokeColor=#E9D5FF;strokeWidth=1.2;");
  cell("lbl_p3", "STORAGE &amp; INDEXING", 618, 194, 204, 16, "text;html=1;strokeColor=none;fillColor=none;fontColor=#7C3AED;fontSize=8;fontStyle=1;html=1;align=center;verticalAlign=middle;");
  const p3Items = [
    { t: "Log Buckets<br/><span style='color:#64748B;'>(Regional / CMEK)</span>", icon: "🗄️" },
    { t: "Time Series DB<br/><span style='color:#64748B;'>(Monitoring Backend)</span>", icon: "📊" },
    { t: "Trace Storage<br/><span style='color:#64748B;'>(Cloud Trace)</span>", icon: "💾" },
    { t: "BigQuery<br/><span style='color:#64748B;'>(Long-term Analytics)</span>", icon: "📈" }
  ];
  p3Items.forEach((it, idx) => {
    const iy = 228 + idx * 76;
    cell(`p3_${idx}`, `<div style="display:flex;align-items:center;gap:6px;padding:0 6px;"><span style="font-size:16px;">${it.icon}</span><span style="font-size:7.5px;font-weight:800;color:#0F172A;line-height:1.15;">${it.t}</span></div>`, 626, iy, 188, 66, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=left;verticalAlign=middle;padding=2;");
  });

  // Stage 4: ANALYSIS & CORRELATION (x=832..1036, w=204)
  cell("box_p4", "", 832, 190, 204, 340, "rounded=1;arcSize=6;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.2;");
  cell("lbl_p4", "ANALYSIS &amp; CORRELATION", 832, 194, 204, 16, "text;html=1;strokeColor=none;fillColor=none;fontColor=#1E40AF;fontSize=8;fontStyle=1;html=1;align=center;verticalAlign=middle;");
  const p4Items = [
    { t: "Monitoring Dashboards<br/><span style='color:#64748B;'>(Metrics Explorer)</span>", icon: "📈" },
    { t: "Log Analytics<br/><span style='color:#64748B;'>(Logs Explorer)</span>", icon: "📑" },
    { t: "Trace Analysis<br/><span style='color:#64748B;'>(Trace Explorer)</span>", icon: "🔍" },
    { t: "Security Command Center<br/><span style='color:#64748B;'>(Threat &amp; Vuln Mgmt)</span>", icon: "🛡️" },
    { t: "BigQuery Analytics<br/><span style='color:#64748B;'>(Custom Queries)</span>", icon: "📊" }
  ];
  p4Items.forEach((it, idx) => {
    const iy = 222 + idx * 62;
    cell(`p4_${idx}`, `<div style="display:flex;align-items:center;gap:6px;padding:0 6px;"><span style="font-size:16px;">${it.icon}</span><span style="font-size:7px;font-weight:800;color:#0F172A;line-height:1.15;">${it.t}</span></div>`, 840, iy, 188, 54, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=left;verticalAlign=middle;padding=2;");
  });

  // Stage 5: VISUALIZATION & ALERTING (x=1046..1250, w=204)
  cell("box_p5", "", 1046, 190, 274, 340, "rounded=1;arcSize=6;fillColor=#FFFBEB;strokeColor=#FDE68A;strokeWidth=1.2;");
  cell("lbl_p5", "VISUALIZATION &amp; ALERTING", 1046, 194, 274, 16, "text;html=1;strokeColor=none;fillColor=none;fontColor=#D97706;fontSize=8;fontStyle=1;html=1;align=center;verticalAlign=middle;");
  const p5Items = [
    { t: "Dashboards<br/><span style='color:#64748B;'>(Looker Studio / Cloud Monitoring)</span>", icon: "📊" },
    { t: "Alert Policies<br/><span style='color:#64748B;'>(Threshold / Anomaly)</span>", icon: "🔔" },
    { t: "Notification Channels<br/><span style='color:#64748B;'>(Email / Slack / PagerDuty)</span>", icon: "📨" },
    { t: "SLO / Error Budget<br/><span style='color:#64748B;'>(SLOs &amp; Uptime Checks)</span>", icon: "🎯" },
    { t: "Incident Management<br/><span style='color:#64748B;'>(PagerDuty / Jira)</span>", icon: "🚨" }
  ];
  p5Items.forEach((it, idx) => {
    const iy = 222 + idx * 62;
    cell(`p5_${idx}`, `<div style="display:flex;align-items:center;gap:6px;padding:0 6px;"><span style="font-size:16px;">${it.icon}</span><span style="font-size:7px;font-weight:800;color:#0F172A;line-height:1.15;">${it.t}</span></div>`, 1054, iy, 258, 54, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=left;verticalAlign=middle;padding=2;");
  });

  // Pure 0° Horizontal Pipeline Inter-Stage Connectors
  edge("e_p1_p2", "box_p1", "box_p2", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;endSize=4;exitX=1;exitY=0.5;entryX=0;entryY=0.5;");
  edge("e_p2_p3", "box_p2", "box_p3", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;endSize=4;exitX=1;exitY=0.5;entryX=0;entryY=0.5;");
  edge("e_p3_p4", "box_p3", "box_p4", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;endSize=4;exitX=1;exitY=0.5;entryX=0;entryY=0.5;");
  edge("e_p4_p5", "box_p4", "box_p5", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;endSize=4;exitX=1;exitY=0.5;entryX=0;entryY=0.5;");

  // Observability Foundation (Bottom of Pipeline box)
  cell("box_found", "", 190, 540, 1130, 60, "rounded=1;arcSize=6;fillColor=#FFFBEB;strokeColor=#D97706;strokeWidth=1.2;");
  cell("lbl_found", "OBSERVABILITY FOUNDATION", 190, 542, 1130, 14, "text;html=1;strokeColor=none;fillColor=none;fontColor=#D97706;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;");

  const foundationItems = [
    { t: "IAM &amp; Least Privilege", icon: "👥" },
    { t: "CMEK Encryption<br/><span style='color:#64748B;'>(At Rest)</span>", icon: "🔒" },
    { t: "Retention Policies<br/><span style='color:#64748B;'>(Per Data Type)</span>", icon: "📅" },
    { t: "Data Access Controls<br/><span style='color:#64748B;'>(RBAC / ABAC)</span>", icon: "🛡️" },
    { t: "Sampling Policies<br/><span style='color:#64748B;'>(Traces / Logs)</span>", icon: "📊" },
    { t: "Cost Controls<br/><span style='color:#64748B;'>(Quotas / Budgets)</span>", icon: "💰" }
  ];
  foundationItems.forEach((fi, idx) => {
    const fx = 196 + idx * 186;
    cell(`fi_${idx}`, `<div style="display:flex;align-items:center;gap:4px;"><span style="font-size:13px;">${fi.icon}</span><span style="font-size:8px;font-weight:800;color:#0F172A;line-height:1.1;">${fi.t}</span></div>`, fx, 558, 180, 36, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=left;verticalAlign=middle;padding=2;");
  });

  // Pure 270° Vertical dashed lines from Foundation up to the 5 Pipeline Stages
  edge("e_f_to_p1", "box_found", "box_p1", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#D97706;strokeWidth=1.2;dashed=1;endArrow=classic;endSize=3;exitX=0.08;exitY=0;entryX=0.5;entryY=1;");
  edge("e_f_to_p2", "box_found", "box_p2", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#D97706;strokeWidth=1.2;dashed=1;endArrow=classic;endSize=3;exitX=0.28;exitY=0;entryX=0.5;entryY=1;");
  edge("e_f_to_p3", "box_found", "box_p3", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#D97706;strokeWidth=1.2;dashed=1;endArrow=classic;endSize=3;exitX=0.48;exitY=0;entryX=0.5;entryY=1;");
  edge("e_f_to_p4", "box_found", "box_p4", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#D97706;strokeWidth=1.2;dashed=1;endArrow=classic;endSize=3;exitX=0.68;exitY=0;entryX=0.5;entryY=1;");
  edge("e_f_to_p5", "box_found", "box_p5", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#D97706;strokeWidth=1.2;dashed=1;endArrow=classic;endSize=3;exitX=0.88;exitY=0;entryX=0.5;entryY=1;");

  // ==================== 5. RIGHT SIDEBAR: CONSUMERS & OUTCOMES (x=1340..1520, y=162..610, w=180, h=448) ====================
  cell("box_consumers", "", 1340, 162, 180, 448, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;");
  cell("lbl_consumers", "CONSUMERS &amp; OUTCOMES", 1340, 164, 180, 20, "text;html=1;strokeColor=none;fillColor=none;fontColor=#16A34A;fontSize=8.5;fontStyle=1;html=1;align=center;verticalAlign=middle;");

  const consumers = [
    { role: "SRE / DevOps", outcome: "Operate &amp; Improve", icon: "⚙️" },
    { role: "Security Team", outcome: "Detect &amp; Respond", icon: "🛡️" },
    { role: "Data / AI Team", outcome: "Monitor Pipelines<br/>&amp; Models", icon: "🧠" },
    { role: "Product / Business", outcome: "Understand Impact", icon: "📈" },
    { role: "Compliance / Audit", outcome: "Reports &amp; Evidence", icon: "📑" },
    { role: "Leadership", outcome: "KPIs &amp; Health", icon: "👥" }
  ];

  consumers.forEach((cs, idx) => {
    const cy = 190 + idx * 68;
    cell(`con_${idx}`, `<div style="font-size:16px;text-align:center;">${cs.icon}</div><div style="font-size:7.5px;font-weight:800;color:#0F172A;text-align:center;margin-top:2px;">${cs.role}</div><div style="font-size:8px;color:#64748B;text-align:center;line-height:1.15;margin-top:1px;">${cs.outcome}</div>`, 1348, cy, 164, 62, "rounded=1;arcSize=4;fillColor=#F0FDF4;strokeColor=#BBF7D0;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // Pure 0° Horizontal edge: Pipeline Visualization -> Consumers
  edge("e_pipe_to_cons", "box_p5", "box_consumers", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16A34A;strokeWidth=1.5;endArrow=classic;endSize=4;exitX=1;exitY=0.5;entryX=0;entryY=0.5;");

  // ==================== 6. BOTTOM ROW: 6 CARDS (y=618..954, h=336) ====================
  // 1. Key Benefits (w=240)
  cell("box_b_benefits", "", 16, 618, 240, 336, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;");
  cell("lbl_b_benefits", "KEY BENEFITS", 16, 618, 240, 22, "shape=rectangle;rounded=1;arcSize=8;fillColor=#F0FDF4;strokeColor=#CBD5E1;fontColor=#16A34A;fontSize=9;fontStyle=1;align=center;verticalAlign=middle;");
  const bBenefitsHtml = `<div style="font-size:7.5px;line-height:1.6;color:#0F172A;padding:4px 6px;">
    ✔ <b>Full-stack visibility</b> across apps, data, AI, and infra<br/><br/>
    ✔ <b>Proactive issue detection</b> with signal correlation<br/><br/>
    ✔ <b>Faster MTTR</b> with actionable deep insights<br/><br/>
    ✔ <b>SLO-driven reliability</b> and error budget management<br/><br/>
    ✔ <b>Security, compliance</b>, and audit readiness<br/><br/>
    ✔ <b>Cost visibility</b> and resource optimization
  </div>`;
  cell("txt_b_benefits", bBenefitsHtml, 18, 642, 236, 306, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=2;");

  // 2. Key Signals & KPIs (w=240)
  cell("box_b_kpis", "", 264, 618, 240, 336, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;");
  cell("lbl_b_kpis", "KEY SIGNALS &amp; KPIs (Examples)", 264, 618, 240, 22, "shape=rectangle;rounded=1;arcSize=8;fillColor=#EFF6FF;strokeColor=#CBD5E1;fontColor=#1E40AF;fontSize=9;fontStyle=1;html=1;align=center;verticalAlign=middle;");
  const bKpisHtml = `<div style="font-size:7.5px;line-height:1.48;color:#0F172A;padding:4px 6px;">
    📊 <b>Availability</b> (SLA / SLO Compliance %)<br/>
    ⏱️ <b>Latency</b> (P50 / P95 / P99)<br/>
    🎯 <b>Error Rate</b> (4xx / 5xx %)<br/>
    🔄 <b>Throughput</b> (RPS / TPS)<br/>
    ⚙️ <b>CPU / Memory / Disk</b> Utilization<br/>
    📦 <b>Queue Depth / Backlog</b><br/>
    🧠 <b>AI Model Latency / Token Usage</b><br/>
    🗄️ <b>Data Freshness / Pipeline Lag</b><br/>
    🔒 <b>Security Findings / Incidents</b><br/>
    💰 <b>Cost per Service / per User</b>
  </div>`;
  cell("txt_b_kpis", bKpisHtml, 266, 642, 236, 306, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=2;");

  // 3. SLO Example (w=220)
  cell("box_b_slo", "", 512, 618, 220, 336, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.5;");
  cell("lbl_b_slo", "SLO EXAMPLE (User API Service)", 512, 618, 220, 22, "shape=rectangle;rounded=1;arcSize=8;fillColor=#FAF5FF;strokeColor=#CBD5E1;fontColor=#7C3AED;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");
  const bSloHtml = `<div style="font-size:7.5px;line-height:1.55;color:#0F172A;padding:4px 6px;">
    🛡️ <b>Availability SLO</b><br/>
    &nbsp;&nbsp;&nbsp;&nbsp;99.95% (Monthly)<br/><br/>
    ⏱️ <b>Latency SLO</b><br/>
    &nbsp;&nbsp;&nbsp;&nbsp;P95 &lt; 500 ms<br/><br/>
    ⚙️ <b>Error Budget</b><br/>
    &nbsp;&nbsp;&nbsp;&nbsp;21.6 minutes / month<br/><br/>
    🔔 <b>Burn Rate Alerts</b><br/>
    &nbsp;&nbsp;&nbsp;&nbsp;2x (14m), 14x (2m)
  </div>`;
  cell("txt_b_slo", bSloHtml, 514, 642, 216, 306, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=2;");

  // 4. Alerting Examples (w=220)
  cell("box_b_alerts", "", 740, 618, 220, 336, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#DC2626;strokeWidth=1.5;");
  cell("lbl_b_alerts", "ALERTING EXAMPLES", 740, 618, 220, 22, "shape=rectangle;rounded=1;arcSize=8;fillColor=#FEF2F2;strokeColor=#CBD5E1;fontColor=#DC2626;fontSize=9;fontStyle=1;align=center;verticalAlign=middle;");
  const bAlertsHtml = `<div style="font-size:7.5px;line-height:1.55;color:#0F172A;padding:4px 6px;">
    🚨 <b>High Error Rate</b><br/>
    &nbsp;&nbsp;&nbsp;&nbsp;5xx &gt; 1% for 5 min<br/><br/>
    ⏱️ <b>High Latency</b><br/>
    &nbsp;&nbsp;&nbsp;&nbsp;P95 &gt; 1s for 5 min<br/><br/>
    🔥 <b>SLO Burn Rate</b><br/>
    &nbsp;&nbsp;&nbsp;&nbsp;&gt; 2x for 14 min<br/><br/>
    🔄 <b>Pipeline Delay</b><br/>
    &nbsp;&nbsp;&nbsp;&nbsp;Data lag &gt; 15 min<br/><br/>
    🛡️ <b>Security Finding</b><br/>
    &nbsp;&nbsp;&nbsp;&nbsp;Critical severity
  </div>`;
  cell("txt_b_alerts", bAlertsHtml, 742, 642, 216, 306, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=2;");

  // 5. Data Retention (Defaults) (w=220)
  cell("box_b_ret", "", 968, 618, 220, 336, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.5;");
  cell("lbl_b_ret", "DATA RETENTION (Defaults)", 968, 618, 220, 22, "shape=rectangle;rounded=1;arcSize=8;fillColor=#FFFBEB;strokeColor=#CBD5E1;fontColor=#D97706;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");
  const bRetHtml = `<table style="width:100%;border-collapse:collapse;font-size:7.5px;line-height:1.5;padding:2px 4px;">
    <tr><td>📑 <b>Logs (Hot)</b></td><td style="text-align:right;font-weight:800;">30 Days</td></tr>
    <tr><td>📦 <b>Logs (Archive)</b></td><td style="text-align:right;font-weight:800;">1 Year</td></tr>
    <tr><td>📈 <b>Metrics (High Res)</b></td><td style="text-align:right;font-weight:800;">6 Weeks</td></tr>
    <tr><td>📊 <b>Metrics (Standard)</b></td><td style="text-align:right;font-weight:800;">24 Months</td></tr>
    <tr><td>💾 <b>Traces</b></td><td style="text-align:right;font-weight:800;">30 Days</td></tr>
    <tr><td>📜 <b>Audit Logs</b></td><td style="text-align:right;font-weight:800;">1 Year</td></tr>
  </table>`;
  cell("txt_b_ret", bRetHtml, 970, 642, 216, 306, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=2;");

  // 6. Technologies Matrix (w=324)
  cell("box_b_tech", "", 1196, 618, 324, 336, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;");
  cell("lbl_b_tech", "TECHNOLOGIES", 1196, 618, 324, 22, "shape=rectangle;rounded=1;arcSize=8;fillColor=#EFF6FF;strokeColor=#CBD5E1;fontColor=#1E40AF;fontSize=9;fontStyle=1;align=center;verticalAlign=middle;");
  
  const techGrid = [
    { t: "Cloud Logging", icon: "📑" },
    { t: "BigQuery", icon: "📊" },
    { t: "Cloud Monitoring", icon: "📈" },
    { t: "Security Command Center", icon: "🛡️" },
    { t: "Cloud Trace", icon: "🔍" },
    { t: "Cloud Operations", icon: "⚙️" },
    { t: "Eventarc", icon: "⚡" },
    { t: "Looker Studio", icon: "📊" },
    { t: "Pub/Sub", icon: "📨" },
    { t: "PagerDuty / Slack", icon: "🔔" }
  ];
  techGrid.forEach((tg, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const gx = 1206 + col * 154;
    const gy = 648 + row * 56;
    cell(`tg_${idx}`, `<div style="display:flex;align-items:center;gap:6px;padding:0 4px;"><span style="font-size:16px;">${tg.icon}</span><span style="font-size:7px;font-weight:800;color:#0F172A;line-height:1.1;">${tg.t}</span></div>`, gx, gy, 146, 50, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=left;verticalAlign=middle;padding=2;");
  });

  // ==================== 7. FOOTER LEGEND (y=962, h=24) ====================
  const legendHtml = `<div style='font-size:8px;color:#64748B;display:flex;justify-content:space-between;align-items:center;'>
    <div><b>LEGEND:</b> &nbsp; ━━━━► Telemetry Flow &nbsp;|&nbsp; ┈┈┈► Data/Control &nbsp;|&nbsp; ───► Alert &nbsp;|&nbsp; 🟦 Google Cloud Service &nbsp;|&nbsp; 🟪 Storage &nbsp;|&nbsp; 🟨 Visual/Alert &nbsp;|&nbsp; 🟩 Consumers</div>
    <div>Enterprise Observability &amp; SRE Foundation &nbsp;|&nbsp; May 8, 2025</div>
  </div>`;
  cell("footer_legend", legendHtml, 16, 962, 1504, 24, "rounded=1;arcSize=8;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=left;verticalAlign=middle;padding=4;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_21_observability_architecture" name="Template 21: Observability Architecture">
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
