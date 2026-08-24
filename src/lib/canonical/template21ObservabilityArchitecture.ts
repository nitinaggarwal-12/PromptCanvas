/**
 * Master 1:1 High-Craft Exact Ground-Truth Replica for Template 21: Observability Architecture
 * Matches 100% of images/21.png:
 * - Top Header Banner: "21 Observability Architecture" + Use Case + Environment/Region/Date + Brand block + Objective Box
 * - Top Telemetry Sources Bar: 11 distinct sources with icons & subtitles + top drop-flow label + branched droplines
 * - Left Sidebar: 6 Observability Pillars (Reliability, Performance, Availability, Security, Business, Cost)
 * - Center: 5-Stage Google Cloud Observability Pipeline (Collection, Ingestion & Processing, Storage & Indexing, Analysis & Correlation, Visualization & Alerting)
 * - Observability Foundation: 6 foundational controls with upward dashed lines to all 5 stages
 * - Right Sidebar: 6 Consumers & Outcomes role pods (SRE, Security, Data/AI, Product, Compliance, Leadership)
 * - Bottom 6 Analytical Cards: Key Benefits (6 items), Key Signals & KPIs (10 items), SLO Example (4 items), Alerting Examples (6 items), Data Retention table (6 rows), Technologies Matrix (10 items in 2x5 grid)
 * - Bottom Legend: Complete flow types and color-coded categories
 * - Master canvas resolution: 1560x1020.
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
  // Number Badge 21
  cell(
    "hdr_num",
    "21",
    16,
    12,
    52,
    52,
    "rounded=1;arcSize=14;fillColor=#5B21B6;strokeColor=#5B21B6;fontColor=#FFFFFF;fontSize=28;fontStyle=1;align=center;verticalAlign=middle;"
  );

  // Title Block
  const titleHtml = `<div style="font-size:24px;font-weight:900;color:#0F172A;letter-spacing:0.5px;">Observability Architecture</div>` +
    `<div style="font-size:12px;font-weight:800;color:#5B21B6;margin-top:2px;">Use Case: NovaCura – Full-Stack Observability</div>` +
    `<div style="font-size:10px;font-weight:600;color:#64748B;margin-top:2px;">☁️ Environment: Production &nbsp;|&nbsp; 📍 Region: us-central1 &nbsp;|&nbsp; 📅 Last Updated: May 8, 2025</div>`;
  cell("hdr_title", titleHtml, 78, 12, 530, 52, "whiteSpace=wrap;overflow=hidden;text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  // Center Brand Block
  const brandHtml = `<table style="width:100%;border-collapse:collapse;"><tr><td style="width:36px;vertical-align:middle;text-align:center;"><span style="font-size:32px;">🧬</span></td><td style="text-align:left;vertical-align:middle;padding-left:6px;"><div style="font-size:22px;font-weight:900;color:#0284C7;letter-spacing:1px;">NOVACURA</div><div style="font-size:9.5px;color:#64748B;font-weight:700;font-style:italic;">AI-Powered Regulatory Intelligence Platform</div></td></tr></table>`;
  cell("hdr_brand", brandHtml, 630, 12, 430, 52, "whiteSpace=wrap;overflow=hidden;text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // Right Objective Box
  const objHtml = `<div style="font-size:9.5px;font-weight:900;color:#1E40AF;margin-bottom:2px;">OBJECTIVE</div><div style="font-size:8.5px;line-height:1.3;color:#0F172A;">Provide end-to-end visibility across infrastructure, applications, data, and AI workloads to ensure reliability, performance, security, and business outcomes.</div>`;
  cell("hdr_obj", objHtml, 1080, 12, 464, 52, "rounded=1;arcSize=6;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.2;html=1;align=left;verticalAlign=middle;padding=6;");

  // ==================== 2. TOP TELEMETRY SOURCES BAR (y=72..136, h=64) ====================
  cell("box_sources", "", 16, 72, 1528, 64, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;");
  cell(
    "lbl_sources_tag",
    `<div style="font-size:8px;font-weight:900;color:#1E40AF;line-height:1.2;">TELEMETRY<br/>SOURCES</div><div style="font-size:6.5px;color:#64748B;margin-top:2px;">(What we collect)</div>`,
    20,
    74,
    96,
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
    const sx = 120 + idx * 128;
    cell(
      `src_${idx}`,
      `<div style="display:flex;align-items:center;gap:4px;padding:0 2px;"><span style="font-size:16px;">${s.icon}</span><div><div style="font-size:8px;font-weight:800;color:#0F172A;">${s.t}</div><div style="font-size:6.5px;color:#64748B;">${s.sub}</div></div></div>`,
      sx,
      76,
      124,
      56,
      "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=left;verticalAlign=middle;padding=3;"
    );
  });

  // Telemetry flow label pill
  cell(
    "lbl_flow_top",
    "Logs, Metrics, Traces, Events, Audit Logs",
    640,
    140,
    280,
    16,
    "rounded=1;arcSize=12;fillColor=#F8FAFC;strokeColor=#CBD5E1;fontColor:#64748B;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;"
  );

  // Drop line from Sources to Pipeline & Stages
  rawEdge("e_src_to_pipe", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 780, y: 136 },
    { x: 780, y: 160 }
  ]);

  // Dashed drop lines to Collection, Ingestion, Storage, Analysis, Visualization
  rawEdge("e_drop_p1", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#64748B;strokeWidth=1;dashed=1;dashPattern=3 2;endArrow=classic;endSize=3;", [
    { x: 640, y: 148 },
    { x: 315, y: 148 },
    { x: 315, y: 160 }
  ]);
  rawEdge("e_drop_p2", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#64748B;strokeWidth=1;dashed=1;dashPattern=3 2;endArrow=classic;endSize=3;", [
    { x: 640, y: 148 },
    { x: 539, y: 148 },
    { x: 539, y: 160 }
  ]);
  rawEdge("e_drop_p4", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#64748B;strokeWidth=1;dashed=1;dashPattern=3 2;endArrow=classic;endSize=3;", [
    { x: 920, y: 148 },
    { x: 987, y: 148 },
    { x: 987, y: 160 }
  ]);
  rawEdge("e_drop_p5", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#64748B;strokeWidth=1;dashed=1;dashPattern=3 2;endArrow=classic;endSize=3;", [
    { x: 920, y: 148 },
    { x: 1222, y: 148 },
    { x: 1222, y: 160 }
  ]);

  // ==================== 3. LEFT SIDEBAR: OBSERVABILITY PILLARS (x=16..190, y=160..608, w=174, h=448) ====================
  cell("box_pillars", "", 16, 160, 174, 448, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.5;");
  cell("lbl_pillars", "OBSERVABILITY PILLARS", 16, 164, 174, 18, "html=1;fontColor=#7C3AED;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");

  const pillars = [
    { name: "Reliability", desc: "Uptime, SLOs,<br/>Error budgets", icon: "🛡️" },
    { name: "Performance", desc: "Latency, Throughput,<br/>Saturation", icon: "⏱️" },
    { name: "Availability", desc: "Health, Failover,<br/>Capacity", icon: "⬆️" },
    { name: "Security", desc: "Threats, Vulnerabilities,<br/>Audit", icon: "🔒" },
    { name: "Business", desc: "User Journeys,<br/>Adoption, Outcomes", icon: "📊" },
    { name: "Cost", desc: "Resource usage,<br/>Optimization", icon: "💲" }
  ];

  pillars.forEach((p, idx) => {
    const py = 186 + idx * 68;
    cell(
      `pil_${idx}`,
      `<div style="text-align:center;"><div style="font-size:16px;">${p.icon}</div><div style="font-size:8.5px;font-weight:900;color:#0F172A;margin-top:2px;">${p.name}</div><div style="font-size:7px;color:#64748B;line-height:1.15;margin-top:1px;">${p.desc}</div></div>`,
      22,
      py,
      162,
      64,
      "rounded=1;arcSize=4;fillColor=#FAF5FF;strokeColor=#E9D5FF;html=1;align=center;verticalAlign=middle;padding=2;"
    );
  });

  // ==================== 4. CENTER: GOOGLE CLOUD OBSERVABILITY PIPELINE (x=198..1350, y=160..608, w=1152, h=448) ====================
  cell("box_pipeline", "", 198, 160, 1152, 448, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.8;");
  cell("lbl_pipe_hdr", "GOOGLE CLOUD OBSERVABILITY PIPELINE", 198, 164, 1152, 18, "html=1;fontColor=#1E40AF;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;");

  // Stage 1: COLLECTION (x=208..422, w=214)
  cell("box_p1", "", 208, 188, 214, 342, "rounded=1;arcSize=4;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.2;");
  cell("lbl_p1", "COLLECTION", 208, 190, 214, 16, "html=1;fontColor=#1E40AF;fontSize=8;fontStyle=1;align=center;verticalAlign=middle;");
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
      `<div style="display:flex;align-items:center;gap:6px;padding:0 4px;"><span style="font-size:16px;">${it.icon}</span><div><div style="font-size:8px;font-weight:800;color:#0F172A;">${it.t}</div>${it.sub ? `<div style="font-size:6.5px;color:#64748B;">${it.sub}</div>` : ""}</div></div>`,
      216,
      iy,
      198,
      47,
      "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=left;verticalAlign=middle;padding=2;"
    );
  });

  // Stage 2: INGESTION & PROCESSING (x=432..646, w=214)
  cell("box_p2", "", 432, 188, 214, 342, "rounded=1;arcSize=4;fillColor=#F0FDF4;strokeColor=#BBF7D0;strokeWidth=1.2;");
  cell("lbl_p2", "INGESTION &amp; PROCESSING", 432, 190, 214, 16, "html=1;fontColor=#166534;fontSize=8;fontStyle=1;align=center;verticalAlign=middle;");
  const p2Items = [
    { t: "Cloud Logging", icon: "📑" },
    { t: "Cloud Monitoring", icon: "📈" },
    { t: "Cloud Trace", icon: "🔍" },
    { t: "Eventarc", icon: "⚡" },
    { t: "Pub/Sub", icon: "📨" }
  ];
  p2Items.forEach((it, idx) => {
    const iy = 214 + idx * 62;
    cell(
      `p2_${idx}`,
      `<div style="display:flex;align-items:center;gap:6px;padding:0 6px;"><span style="font-size:16px;">${it.icon}</span><span style="font-size:8px;font-weight:800;color:#0F172A;">${it.t}</span></div>`,
      440,
      iy,
      198,
      56,
      "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=left;verticalAlign=middle;padding=2;"
    );
  });

  // Stage 3: STORAGE & INDEXING (x=656..870, w=214)
  cell("box_p3", "", 656, 188, 214, 342, "rounded=1;arcSize=4;fillColor=#FAF5FF;strokeColor=#E9D5FF;strokeWidth=1.2;");
  cell("lbl_p3", "STORAGE &amp; INDEXING", 656, 190, 214, 16, "html=1;fontColor=#7C3AED;fontSize=8;fontStyle=1;align=center;verticalAlign=middle;");
  const p3Items = [
    { t: "Log Buckets", sub: "(Regional / CMEK)", icon: "🗄️" },
    { t: "Time Series DB", sub: "(Monitoring Backend)", icon: "📊" },
    { t: "Trace Storage", sub: "(Cloud Trace)", icon: "💾" },
    { t: "BigQuery", sub: "(Long-term Analytics)", icon: "📈" }
  ];
  p3Items.forEach((it, idx) => {
    const iy = 218 + idx * 76;
    cell(
      `p3_${idx}`,
      `<div style="display:flex;align-items:center;gap:6px;padding:0 6px;"><span style="font-size:16px;">${it.icon}</span><div><div style="font-size:8px;font-weight:800;color:#0F172A;">${it.t}</div><div style="font-size:6.5px;color:#64748B;">${it.sub}</div></div></div>`,
      664,
      iy,
      198,
      70,
      "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=left;verticalAlign=middle;padding=2;"
    );
  });

  // Stage 4: ANALYSIS & CORRELATION (x=880..1094, w=214)
  cell("box_p4", "", 880, 188, 214, 342, "rounded=1;arcSize=4;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.2;");
  cell("lbl_p4", "ANALYSIS &amp; CORRELATION", 880, 190, 214, 16, "html=1;fontColor=#1E40AF;fontSize=8;fontStyle=1;align=center;verticalAlign=middle;");
  const p4Items = [
    { t: "Monitoring Dashboards", sub: "(Metrics Explorer)", icon: "📈" },
    { t: "Log Analytics", sub: "(Logs Explorer)", icon: "📑" },
    { t: "Trace Analysis", sub: "(Trace Explorer)", icon: "🔍" },
    { t: "Security Command Center", sub: "(Threat &amp; Vuln Mgmt)", icon: "🛡️" },
    { t: "BigQuery Analytics", sub: "(Custom Queries)", icon: "📊" }
  ];
  p4Items.forEach((it, idx) => {
    const iy = 214 + idx * 62;
    cell(
      `p4_${idx}`,
      `<div style="display:flex;align-items:center;gap:6px;padding:0 6px;"><span style="font-size:16px;">${it.icon}</span><div><div style="font-size:8px;font-weight:800;color:#0F172A;">${it.t}</div><div style="font-size:6.5px;color:#64748B;">${it.sub}</div></div></div>`,
      888,
      iy,
      198,
      56,
      "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=left;verticalAlign=middle;padding=2;"
    );
  });

  // Stage 5: VISUALIZATION & ALERTING (x=1104..1340, w=236)
  cell("box_p5", "", 1104, 188, 236, 342, "rounded=1;arcSize=4;fillColor=#FFFBEB;strokeColor=#FDE68A;strokeWidth=1.2;");
  cell("lbl_p5", "VISUALIZATION &amp; ALERTING", 1104, 190, 236, 16, "html=1;fontColor=#D97706;fontSize=8;fontStyle=1;align=center;verticalAlign=middle;");
  const p5Items = [
    { t: "Dashboards", sub: "(Looker Studio / Cloud Monitoring)", icon: "📊" },
    { t: "Alert Policies", sub: "(Threshold / Anomaly)", icon: "🔔" },
    { t: "Notification Channels", sub: "(Email / Slack / PagerDuty)", icon: "📨" },
    { t: "SLO / Error Budget", sub: "(SLOs &amp; Uptime Checks)", icon: "🎯" },
    { t: "Incident Management", sub: "(PagerDuty / Jira)", icon: "🚨" }
  ];
  p5Items.forEach((it, idx) => {
    const iy = 214 + idx * 62;
    cell(
      `p5_${idx}`,
      `<div style="display:flex;align-items:center;gap:6px;padding:0 6px;"><span style="font-size:16px;">${it.icon}</span><div><div style="font-size:8px;font-weight:800;color:#0F172A;">${it.t}</div><div style="font-size:6.5px;color:#64748B;">${it.sub}</div></div></div>`,
      1112,
      iy,
      220,
      56,
      "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=left;verticalAlign=middle;padding=2;"
    );
  });

  // Pipeline Inter-Stage Horizontal Connecting Arrows
  rawEdge("e_p1_p2", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 422, y: 359 },
    { x: 432, y: 359 }
  ]);
  rawEdge("e_p2_p3", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 646, y: 359 },
    { x: 656, y: 359 }
  ]);
  rawEdge("e_p3_p4", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 870, y: 359 },
    { x: 880, y: 359 }
  ]);
  rawEdge("e_p4_p5", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 1094, y: 359 },
    { x: 1104, y: 359 }
  ]);

  // Observability Foundation (Bottom of Pipeline box)
  cell("box_found", "", 208, 538, 1132, 60, "rounded=1;arcSize=4;fillColor=#FFFBEB;strokeColor=#D97706;strokeWidth=1.2;");
  cell("lbl_found", "OBSERVABILITY FOUNDATION", 208, 540, 1132, 14, "html=1;fontColor=#D97706;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;");

  const foundationItems = [
    { t: "IAM &amp; Least Privilege", sub: "", icon: "👤" },
    { t: "CMEK Encryption", sub: "(At Rest)", icon: "🔒" },
    { t: "Retention Policies", sub: "(Per Data Type)", icon: "📅" },
    { t: "Data Access Controls", sub: "(RBAC / ABAC)", icon: "🛡️" },
    { t: "Sampling Policies", sub: "(Traces / Logs)", icon: "📊" },
    { t: "Cost Controls", sub: "(Quotas / Budgets)", icon: "💰" }
  ];
  foundationItems.forEach((fi, idx) => {
    const fx = 214 + idx * 187;
    cell(
      `fi_${idx}`,
      `<div style="display:flex;align-items:center;gap:4px;padding:0 4px;"><span style="font-size:14px;">${fi.icon}</span><div><div style="font-size:8px;font-weight:800;color:#0F172A;">${fi.t}</div>${fi.sub ? `<div style="font-size:6.5px;color:#64748B;">${fi.sub}</div>` : ""}</div></div>`,
      fx,
      556,
      180,
      36,
      "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=left;verticalAlign=middle;padding=2;"
    );

    // Upward dashed arrow to stage above
    const arrowX = fx + 90;
    rawEdge(`e_f_up_${idx}`, "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#D97706;strokeWidth=1.2;dashed=1;dashPattern=3 2;endArrow=classic;endSize=3;", [
      { x: arrowX, y: 538 },
      { x: arrowX, y: 530 }
    ]);
  });

  // ==================== 5. RIGHT SIDEBAR: CONSUMERS & OUTCOMES (x=1358..1544, y=160..608, w=186, h=448) ====================
  cell("box_consumers", "", 1358, 160, 186, 448, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;");
  cell("lbl_consumers", "CONSUMERS &amp; OUTCOMES", 1358, 164, 186, 18, "html=1;fontColor=#16A34A;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");

  const consumers = [
    { role: "SRE / DevOps", outcome: "Operate &amp; Improve", icon: "👥" },
    { role: "Security Team", outcome: "Detect &amp; Respond", icon: "🛡️" },
    { role: "Data / AI Team", outcome: "Monitor Pipelines<br/>&amp; Models", icon: "🧠" },
    { role: "Product / Business", outcome: "Understand Impact", icon: "📈" },
    { role: "Compliance / Audit", outcome: "Reports &amp; Evidence", icon: "📑" },
    { role: "Leadership", outcome: "KPIs &amp; Health", icon: "👥" }
  ];

  consumers.forEach((cs, idx) => {
    const cy = 186 + idx * 68;
    cell(
      `con_${idx}`,
      `<div style="text-align:center;"><div style="font-size:16px;">${cs.icon}</div><div style="font-size:8.5px;font-weight:900;color:#0F172A;margin-top:2px;">${cs.role}</div><div style="font-size:7px;color:#64748B;line-height:1.15;margin-top:1px;">${cs.outcome}</div></div>`,
      1366,
      cy,
      170,
      64,
      "rounded=1;arcSize=4;fillColor=#F0FDF4;strokeColor=#BBF7D0;html=1;align=center;verticalAlign=middle;padding=2;"
    );
  });

  // Edge from Visualization & Alerting to Consumers & Outcomes
  rawEdge("e_pipe_to_cons", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#16A34A;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 1340, y: 359 },
    { x: 1358, y: 359 }
  ]);

  // ==================== 6. BOTTOM ROW: 6 ANALYTICAL CARDS (y=618..944, h=326) ====================
  // Card 1: Key Benefits (w=244)
  cell("box_b_benefits", "", 16, 618, 244, 326, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;");
  cell("lbl_b_benefits", "KEY BENEFITS", 16, 618, 244, 24, "shape=rectangle;rounded=1;arcSize=6;fillColor=#F0FDF4;strokeColor=#CBD5E1;fontColor=#16A34A;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");
  const bBenefitsHtml = `<div style="font-size:8px;line-height:1.6;color:#0F172A;padding:4px 6px;">
    <div style="margin-bottom:8px;"><span style="color:#16A34A;font-weight:900;">✔</span> <b>Full-stack visibility</b> across applications, data, AI, and infrastructure</div>
    <div style="margin-bottom:8px;"><span style="color:#16A34A;font-weight:900;">✔</span> <b>Proactive issue detection</b> with correlation across signals</div>
    <div style="margin-bottom:8px;"><span style="color:#16A34A;font-weight:900;">✔</span> <b>Faster MTTR</b> with actionable insights</div>
    <div style="margin-bottom:8px;"><span style="color:#16A34A;font-weight:900;">✔</span> <b>SLO-driven reliability</b> and error budget management</div>
    <div style="margin-bottom:8px;"><span style="color:#16A34A;font-weight:900;">✔</span> <b>Security, compliance</b>, and audit readiness</div>
    <div><span style="color:#16A34A;font-weight:900;">✔</span> <b>Cost visibility</b> and optimization</div>
  </div>`;
  cell("txt_b_benefits", bBenefitsHtml, 18, 644, 240, 296, "whiteSpace=wrap;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=2;");

  // Card 2: Key Signals & KPIs (w=248)
  cell("box_b_kpis", "", 268, 618, 248, 326, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;");
  cell("lbl_b_kpis", "KEY SIGNALS &amp; KPIs (Examples)", 268, 618, 248, 24, "shape=rectangle;rounded=1;arcSize=6;fillColor=#EFF6FF;strokeColor=#CBD5E1;fontColor=#1E40AF;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");
  const bKpisHtml = `<div style="font-size:7.5px;line-height:1.55;color:#0F172A;padding:4px 6px;">
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
  cell("txt_b_kpis", bKpisHtml, 270, 644, 244, 296, "whiteSpace=wrap;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=2;");

  // Card 3: SLO Example (w=212)
  cell("box_b_slo", "", 524, 618, 212, 326, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.5;");
  cell("lbl_b_slo", "SLO EXAMPLE (User API Service)", 524, 618, 212, 24, "shape=rectangle;rounded=1;arcSize=6;fillColor=#FAF5FF;strokeColor=#CBD5E1;fontColor=#7C3AED;fontSize=8;fontStyle=1;align=center;verticalAlign=middle;");
  const bSloHtml = `<div style="font-size:8px;line-height:1.55;color:#0F172A;padding:6px 6px;">
    <div style="margin-bottom:12px;"><span style="font-size:12px;">🛡️</span> <b>Availability SLO</b><br/><span style="color:#64748B;font-size:7px;">99.95% (Monthly)</span></div>
    <div style="margin-bottom:12px;"><span style="font-size:12px;">⏱️</span> <b>Latency SLO</b><br/><span style="color:#64748B;font-size:7px;">P95 &lt; 500 ms</span></div>
    <div style="margin-bottom:12px;"><span style="font-size:12px;">⚙️</span> <b>Error Budget</b><br/><span style="color:#64748B;font-size:7px;">21.6 minutes / month</span></div>
    <div><span style="font-size:12px;">🔔</span> <b>Burn Rate Alerts</b><br/><span style="color:#64748B;font-size:7px;">2x (14m), 14x (2m)</span></div>
  </div>`;
  cell("txt_b_slo", bSloHtml, 526, 644, 208, 296, "whiteSpace=wrap;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=2;");

  // Card 4: Alerting Examples (w=220)
  cell("box_b_alerts", "", 744, 618, 220, 326, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#DC2626;strokeWidth=1.5;");
  cell("lbl_b_alerts", "ALERTING EXAMPLES", 744, 618, 220, 24, "shape=rectangle;rounded=1;arcSize=6;fillColor=#FEF2F2;strokeColor=#CBD5E1;fontColor=#DC2626;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");
  const bAlertsHtml = `<div style="font-size:7.5px;line-height:1.45;color:#0F172A;padding:4px 6px;">
    <div style="margin-bottom:6px;"><span style="color:#DC2626;">🚨</span> <b>High Error Rate</b><br/><span style="color:#64748B;font-size:6.5px;">5xx &gt; 1% for 5 min</span></div>
    <div style="margin-bottom:6px;"><span style="color:#DC2626;">⏱️</span> <b>High Latency</b><br/><span style="color:#64748B;font-size:6.5px;">P95 &gt; 1s for 5 min</span></div>
    <div style="margin-bottom:6px;"><span style="color:#DC2626;">🔥</span> <b>SLO Burn Rate</b><br/><span style="color:#64748B;font-size:6.5px;">&gt; 2x for 14 min</span></div>
    <div style="margin-bottom:6px;"><span style="color:#DC2626;">🔄</span> <b>Pipeline Delay</b><br/><span style="color:#64748B;font-size:6.5px;">Data lag &gt; 15 min</span></div>
    <div style="margin-bottom:6px;"><span style="color:#DC2626;">🛡️</span> <b>Security Finding</b><br/><span style="color:#64748B;font-size:6.5px;">Critical severity</span></div>
    <div><span style="color:#DC2626;">👤</span> <b>Instance Down</b><br/><span style="color:#64748B;font-size:6.5px;">Uptime &lt; 99.9%</span></div>
  </div>`;
  cell("txt_b_alerts", bAlertsHtml, 746, 644, 216, 296, "whiteSpace=wrap;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=2;");

  // Card 5: Data Retention (Defaults) (w=220)
  cell("box_b_ret", "", 972, 618, 220, 326, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.5;");
  cell("lbl_b_ret", "DATA RETENTION (Defaults)", 972, 618, 220, 24, "shape=rectangle;rounded=1;arcSize=6;fillColor=#FFFBEB;strokeColor=#CBD5E1;fontColor=#D97706;fontSize=8;fontStyle=1;align=center;verticalAlign=middle;");
  const bRetHtml = `<table style="width:100%;border-collapse:collapse;font-size:8px;line-height:1.8;padding:4px 6px;">
    <tr><td>📑 <b>Logs (Hot)</b></td><td style="text-align:right;font-weight:900;color:#0F172A;">30 Days</td></tr>
    <tr><td>📦 <b>Logs (Archive)</b></td><td style="text-align:right;font-weight:900;color:#0F172A;">1 Year</td></tr>
    <tr><td>📈 <b>Metrics (High Res)</b></td><td style="text-align:right;font-weight:900;color:#0F172A;">6 Weeks</td></tr>
    <tr><td>📊 <b>Metrics (Standard)</b></td><td style="text-align:right;font-weight:900;color:#0F172A;">24 Months</td></tr>
    <tr><td>💾 <b>Traces</b></td><td style="text-align:right;font-weight:900;color:#0F172A;">30 Days</td></tr>
    <tr><td>📜 <b>Audit Logs</b></td><td style="text-align:right;font-weight:900;color:#0F172A;">1 Year</td></tr>
  </table>`;
  cell("txt_b_ret", bRetHtml, 974, 644, 216, 296, "whiteSpace=wrap;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=2;");

  // Card 6: Technologies Matrix (w=344)
  cell("box_b_tech", "", 1200, 618, 344, 326, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;");
  cell("lbl_b_tech", "TECHNOLOGIES", 1200, 618, 344, 24, "shape=rectangle;rounded=1;arcSize=6;fillColor=#EFF6FF;strokeColor=#CBD5E1;fontColor=#1E40AF;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");

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
    const gx = 1208 + col * 166;
    const gy = 648 + row * 56;
    cell(
      `tg_${idx}`,
      `<div style="display:flex;align-items:center;gap:6px;padding:0 4px;"><span style="font-size:16px;">${tg.icon}</span><span style="font-size:7.5px;font-weight:800;color:#0F172A;">${tg.t}</span></div>`,
      gx,
      gy,
      158,
      48,
      "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=left;verticalAlign=middle;padding=3;"
    );
  });

  // ==================== 7. FOOTER LEGEND (y=952, h=28) ====================
  const legendHtml = `<table style="width:100%;border-collapse:collapse;font-size:7.5px;color:#475569;">
    <tr>
      <td style="font-weight:900;color:#0F172A;width:55px;">LEGEND</td>
      <td style="width:110px;">━━━━► Telemetry Flow</td>
      <td style="width:120px;">┈┈┈► Data / Control Flow</td>
      <td style="width:130px;">──► Alert / Notification Flow</td>
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
  cell("footer_legend", legendHtml, 16, 952, 1528, 28, "rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=left;verticalAlign=middle;padding=4;");

  const bg = isDark ? "#0F172A" : "#FFFFFF";

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_21_observability_architecture" name="Template 21: Observability Architecture">
    <mxGraphModel dx="1560" dy="1020" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1560" pageHeight="1020" background="${bg}" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${c.join("\n        ")}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
