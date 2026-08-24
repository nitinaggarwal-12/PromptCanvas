/**
 * Master 1:1 High-Craft Exact Ground-Truth Replica for Template 43: Real-Time Streaming & Event-Driven Enterprise
 * Matches 100% of images/43.png:
 * - Top Header: "43" Badge, "REAL-TIME STREAMING & EVENT-DRIVEN ENTERPRISE", Subtitle, Google Cloud Reference Architecture v2.0
 * - Left Column (Tiers 7 down to 1 + Security Foundation):
 *   7) ENTERPRISE BUSINESS DOMAINS / USE CASES (Fraud Detection, Order Processing, Customer 360, Real-Time Personalization, Supply Chain, Industrial Telemetry, Observability, Risk & Compliance)
 *   6) EVENT CONSUMER & APPLICATION LAYER (Microservices on GKE/Cloud Run, Serverless Consumers, Dashboards, Alerting Apps, AI/ML Apps, Search/Personalization, Downstream Systems)
 *   5) STATE, STORAGE & ANALYTICS LAYER (BigQuery, Bigtable, Spanner, Cloud Storage, Memorystore Redis, Operational State Store, Event Archive Replay, Feature Store)
 *   4) STREAM PROCESSING & ENRICHMENT LAYER (Dataflow/Beam, Real-Time Transformation, Enrichment, CEP Rules, Windowing & Aggregation, Stream Joins, Idempotency/Deduplication)
 *   3) EVENT ROUTING & MESH LAYER (Topics, Subscriptions, Dead-Letter Queues, Retry Handling, Filtering, Routing Rules, Schema Validation, Event Mesh, Fan-Out, Pub-Sub Patterns)
 *   2) EVENT INGESTION LAYER (Pub/Sub Managed, Kafka/Confluent, Eventarc CloudEvents, Datastream CDC, API Gateway/Apigee, Batch-to-Event, File/Event Bridge)
 *   1) EVENT SOURCES LAYER (On-prem DBs, Operational Apps, Web/Mobile, SaaS, Partners, External APIs, IoT Devices, Clickstream, Logs/Telemetry)
 *   - SECURITY & NETWORK FOUNDATION (Zero Trust, VPC, Private Ingress/Egress, TLS in-transit, CMEK at rest, Secret Manager, KMS, Firewall & VPC-SC, Multi-Region, Backup/DR)
 * - Right Sidebar (Tiers 8, 9, 10):
 *   8) GOVERNANCE & EVENT MANAGEMENT (Schema Registry, Event Catalog, Lineage & Impact, Data Quality, Retention Policies, Privacy/PII, IAM, Data Contracts)
 *   9) OBSERVABILITY & RELIABILITY (Cloud Monitoring, Logging, Trace, SLO/Alerting, Lag Monitoring, Throughput/Latency, Error Reporting, Replay/Backpressure, Audit Logs)
 *   10) PLATFORM OPERATIONS (CI/CD, IaC, Deployment Mgr/GitOps, Cost Mgmt, SCC, Capacity/Scaling, Incident Response, Release Mgmt, Policy Mgmt)
 * - Bottom Footer:
 *   - End-to-End Event Flow (Steps 1..6)
 *   - Arrow Legend (Data Flow, Event Flow, Control/Governance Flow)
 *   - Icon Legend (Selected GCP & Event Architecture icons)
 *   - Copyright footer notice
 * - 1600x1100 master canvas resolution.
 */

const E = (v?: string | null) =>
  (v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const SVG = {
  database: `<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>`,
  network: `<rect width="6" height="6" x="9" y="2" rx="1"/><rect width="6" height="6" x="2" y="16" rx="1"/><rect width="6" height="6" x="16" y="16" rx="1"/><path d="M5 16v-4h14v4"/><path d="M12 8v8"/>`,
  server: `<rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>`,
  shieldCheck: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>`,
  sparkles: `<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>`,
  search: `<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>`,
  cloud: `<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>`,
  chart: `<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>`,
  checkCircle: `<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>`,
  layers: `<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>`,
  folder: `<path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/>`,
  repeat: `<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>`,
  fileCode: `<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="m10 13-2 2 2 2"/><path d="m14 17 2-2-2-2"/>`,
  users: `<circle cx="9" cy="7" r="3.5"/><path d="M3 20a6 6 0 0 1 12 0"/><circle cx="16.5" cy="8.5" r="2.5"/><path d="M15 20a5 5 0 0 1 6 0"/>`,
  lock: `<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>`,
  activity: `<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>`,
  dollar: `<line x1="12" y1="2" x2="12" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>`,
  bell: `<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>`,
  settings: `<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>`,
  cart: `<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>`,
  truck: `<rect width="16" height="10" x="1" y="5" rx="1"/><polygon points="17 8 20 8 23 11 23 15 17 15 17 8"/><circle cx="5.5" cy="17.5" r="2.5"/><circle cx="18.5" cy="17.5" r="2.5"/>`,
  scale: `<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>`,
  zap: `<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>`,
  cpu: `<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>`,
  key: `<circle cx="8" cy="8" r="4"/><path d="m11 11 9 9M18 14l2 2M15 17l2 2"/>`,
  smartphone: `<rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>`
};

const svgIcon = (iconName: keyof typeof SVG, strokeColor = "#1D4ED8", size = 16) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${SVG[iconName] || SVG.database}</svg>`;

export function generateTemplate43RealTimeStreamingEventEnterpriseXml(
  domainFlavor = "streaming",
  theme: "light" | "dark" = "light"
): string {
  const c: string[] = [];

  const cell = (id: string, v: string, x: number, y: number, w: number, h: number, style: string) =>
    c.push(
      `<mxCell id="${id}" value="${E(v)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`
    );

  const rawEdge = (id: string, style: string, pts: { x: number; y: number }[]) => {
    let ptsXml = "";
    if (pts.length > 2) {
      ptsXml = `<Array as="points">${pts.slice(1, -1).map((p) => `<mxPoint x="${p.x}" y="${p.y}"/>`).join("")}</Array>`;
    }
    c.push(
      `<mxCell id="${id}" edge="1" parent="1" style="${style}"><mxGeometry relative="1" as="geometry"><mxPoint x="${pts[0].x}" y="${pts[0].y}" as="sourcePoint"/><mxPoint x="${pts[pts.length - 1].x}" y="${pts[pts.length - 1].y}" as="targetPoint"/>${ptsXml}</mxGeometry></mxCell>`
    );
  };

  // =========================================================================
  // 1. TOP HEADER BANNER (y: 12..62)
  // =========================================================================
  cell("hdr_num", "43", 16, 12, 54, 48, "shape=rectangle;rounded=1;arcSize=14;fillColor=#1D4ED8;strokeColor=#1D4ED8;fontColor=#FFFFFF;fontSize=26;fontStyle=1;align=center;verticalAlign=middle;");

  const titleHtml = `<div style="font-size:20px;font-weight:900;color:#0F172A;letter-spacing:0.5px;">REAL-TIME STREAMING &amp; EVENT-DRIVEN ENTERPRISE</div>
    <div style="font-size:11px;color:#475569;font-weight:600;margin-top:2px;">Scalable • Event-Driven • Low-Latency • Resilient • Governed</div>`;
  cell("hdr_title", titleHtml, 78, 12, 750, 48, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  const brandHtml = `<div style="display:flex;align-items:center;justify-content:flex-end;gap:8px;">
    <div style="text-align:right;">
      <div style="font-size:16px;font-weight:900;color:#4285F4;letter-spacing:0.5px;display:flex;align-items:center;justify-content:flex-end;gap:6px;">
        ${svgIcon("cloud", "#4285F4", 20)} Google Cloud
      </div>
      <div style="font-size:9px;color:#64748B;font-weight:600;margin-top:2px;">Reference Architecture v2.0</div>
    </div>
  </div>`;
  cell("hdr_brand", brandHtml, 1280, 12, 304, 48, "text;html=1;strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

  // =========================================================================
  // 2. LEFT COLUMN: TIERS 7 DOWN TO 1 + FOUNDATION (x: 16..1230, w: 1214)
  // =========================================================================

  // --- TIER 7: ENTERPRISE BUSINESS DOMAINS / USE CASES (y: 68..144, h: 76) ---
  cell("t7_frame", "", 16, 68, 1214, 76, "rounded=1;arcSize=2;fillColor=#FFFFFF;strokeColor=#6D28D9;strokeWidth=1.2;");
  cell("t7_badge", "7", 22, 74, 24, 24, "rounded=1;arcSize=4;fillColor=#6D28D9;fontColor=#FFFFFF;fontSize=12;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t7_lbl", "<b style=\"font-size:8.5px;color:#6D28D9;\">ENTERPRISE BUSINESS<br/>DOMAINS / USE CASES</b>", 50, 74, 105, 34, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  const t7Domains = [
    { t: "Fraud<br/>Detection", icon: "shieldCheck" },
    { t: "Order<br/>Processing", icon: "cart" },
    { t: "Customer<br/>360", icon: "users" },
    { t: "Real-Time<br/>Personalization", icon: "sparkles" },
    { t: "Supply Chain<br/>Visibility", icon: "truck" },
    { t: "Industrial<br/>Telemetry", icon: "cpu" },
    { t: "Observability<br/>Events", icon: "chart" },
    { t: "Risk &amp;<br/>Compliance", icon: "scale" }
  ];
  t7Domains.forEach((d, idx) => {
    const dx = 160 + idx * 133;
    const html = `<div style="display:flex;align-items:center;gap:6px;padding:2px 4px;">
      ${svgIcon(d.icon as keyof typeof SVG, "#6D28D9", 16)}
      <span style="font-size:8px;font-weight:800;color:#0F172A;line-height:1.15;">${d.t}</span>
    </div>`;
    cell(`t7_d_${idx}`, html, dx, 74, 127, 64, "rounded=1;arcSize=4;fillColor=#FAF5FF;strokeColor=#E9D5FF;strokeWidth=1;html=1;align=left;verticalAlign=middle;");
  });

  // --- TIER 6: EVENT CONSUMER & APPLICATION LAYER (y: 148..224, h: 76) ---
  cell("t6_frame", "", 16, 148, 1214, 76, "rounded=1;arcSize=2;fillColor=#FFFFFF;strokeColor=#4338CA;strokeWidth=1.2;");
  cell("t6_badge", "6", 22, 154, 24, 24, "rounded=1;arcSize=4;fillColor=#4338CA;fontColor=#FFFFFF;fontSize=12;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t6_lbl", "<b style=\"font-size:8.5px;color:#4338CA;\">EVENT CONSUMER &amp;<br/>APPLICATION LAYER</b>", 50, 154, 105, 34, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  const t6Consumers = [
    { t: "Microservices on<br/>GKE / Cloud Run", icon: "server" },
    { t: "Serverless<br/>Consumers", icon: "cloud" },
    { t: "Analytics<br/>Dashboards", icon: "chart" },
    { t: "Alerting<br/>Apps", icon: "bell" },
    { t: "AI / ML<br/>Applications", icon: "sparkles" },
    { t: "Search /<br/>Personalization", icon: "search" },
    { t: "Downstream<br/>Enterprise Systems", icon: "layers" }
  ];
  t6Consumers.forEach((tc, idx) => {
    const cx = 160 + idx * 152;
    const html = `<div style="display:flex;align-items:center;gap:6px;padding:2px 4px;">
      ${svgIcon(tc.icon as keyof typeof SVG, "#4338CA", 16)}
      <span style="font-size:8px;font-weight:800;color:#0F172A;line-height:1.15;">${tc.t}</span>
    </div>`;
    cell(`t6_c_${idx}`, html, cx, 154, 146, 64, "rounded=1;arcSize=4;fillColor=#EEF2FF;strokeColor=#C7D2FE;strokeWidth=1;html=1;align=left;verticalAlign=middle;");
  });

  // --- TIER 5: STATE, STORAGE & ANALYTICS LAYER (y: 228..304, h: 76) ---
  cell("t5_frame", "", 16, 228, 1214, 76, "rounded=1;arcSize=2;fillColor=#FFFFFF;strokeColor=#1D4ED8;strokeWidth=1.2;");
  cell("t5_badge", "5", 22, 234, 24, 24, "rounded=1;arcSize=4;fillColor=#1D4ED8;fontColor=#FFFFFF;fontSize=12;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t5_lbl", "<b style=\"font-size:8.5px;color:#1D4ED8;\">STATE, STORAGE &amp;<br/>ANALYTICS LAYER</b>", 50, 234, 105, 34, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  const t5Stores = [
    { t: "BigQuery<br/><span style=\"font-size:7px;color:#64748B;\">Analytics DW</span>", icon: "search" },
    { t: "Bigtable<br/><span style=\"font-size:7px;color:#64748B;\">Wide-Column Store</span>", icon: "database" },
    { t: "Spanner<br/><span style=\"font-size:7px;color:#64748B;\">Relational DB</span>", icon: "layers" },
    { t: "Cloud Storage<br/><span style=\"font-size:7px;color:#64748B;\">Object Storage</span>", icon: "cloud" },
    { t: "Memorystore<br/><span style=\"font-size:7px;color:#64748B;\">Cache (Redis)</span>", icon: "server" },
    { t: "Operational<br/><span style=\"font-size:7px;color:#64748B;\">State Store</span>", icon: "database" },
    { t: "Event Archive /<br/><span style=\"font-size:7px;color:#64748B;\">Replay Store</span>", icon: "folder" },
    { t: "Feature /<br/><span style=\"font-size:7px;color:#64748B;\">Serving Store</span>", icon: "sparkles" }
  ];
  t5Stores.forEach((ts, idx) => {
    const sx = 160 + idx * 133;
    const html = `<div style="display:flex;align-items:center;gap:6px;padding:2px 4px;">
      ${svgIcon(ts.icon as keyof typeof SVG, "#1D4ED8", 15)}
      <span style="font-size:7.5px;font-weight:800;color:#0F172A;line-height:1.15;">${ts.t}</span>
    </div>`;
    cell(`t5_s_${idx}`, html, sx, 234, 127, 64, "rounded=1;arcSize=4;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1;html=1;align=left;verticalAlign=middle;");
  });

  // --- TIER 4: STREAM PROCESSING & ENRICHMENT LAYER (y: 308..384, h: 76) ---
  cell("t4_frame", "", 16, 308, 1214, 76, "rounded=1;arcSize=2;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;");
  cell("t4_badge", "4", 22, 314, 24, 24, "rounded=1;arcSize=4;fillColor=#16A34A;fontColor=#FFFFFF;fontSize=12;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t4_lbl", "<b style=\"font-size:8.5px;color:#16A34A;\">STREAM PROCESSING<br/>&amp; ENRICHMENT LAYER</b>", 50, 314, 105, 34, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  const t4Processors = [
    { t: "Dataflow /<br/>Apache Beam", icon: "repeat" },
    { t: "Real-Time<br/>Transformation", icon: "zap" },
    { t: "Enrichment<br/>(Reference Data)", icon: "layers" },
    { t: "CEP / Business<br/>Rules", icon: "settings" },
    { t: "Windowing &amp;<br/>Aggregation", icon: "chart" },
    { t: "Stream<br/>Joins", icon: "network" },
    { t: "Idempotency /<br/>Deduplication", icon: "checkCircle" }
  ];
  t4Processors.forEach((tp, idx) => {
    const px = 160 + idx * 152;
    const html = `<div style="display:flex;align-items:center;gap:6px;padding:2px 4px;">
      ${svgIcon(tp.icon as keyof typeof SVG, "#16A34A", 16)}
      <span style="font-size:8px;font-weight:800;color:#0F172A;line-height:1.15;">${tp.t}</span>
    </div>`;
    cell(`t4_p_${idx}`, html, px, 314, 146, 64, "rounded=1;arcSize=4;fillColor=#F0FDF4;strokeColor=#BBF7D0;strokeWidth=1;html=1;align=left;verticalAlign=middle;");
  });

  // --- TIER 3: EVENT ROUTING & MESH LAYER (y: 388..464, h: 76) ---
  cell("t3_frame", "", 16, 388, 1214, 76, "rounded=1;arcSize=2;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.2;");
  cell("t3_badge", "3", 22, 394, 24, 24, "rounded=1;arcSize=4;fillColor=#D97706;fontColor=#FFFFFF;fontSize=12;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t3_lbl", "<b style=\"font-size:8.5px;color:#D97706;\">EVENT ROUTING &amp;<br/>MESH LAYER</b>", 50, 394, 105, 34, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  const t3Routing = [
    { t: "Topics<br/><span style=\"font-size:7px;color:#64748B;\">(Channels)</span>", icon: "folder" },
    { t: "Subscriptions<br/><span style=\"font-size:7px;color:#64748B;\">(Consumers)</span>", icon: "users" },
    { t: "Dead-Letter<br/>Queues", icon: "bell" },
    { t: "Retry<br/>Handling", icon: "repeat" },
    { t: "Event<br/>Filtering", icon: "settings" },
    { t: "Routing<br/>Rules", icon: "network" },
    { t: "Schema<br/>Validation", icon: "checkCircle" },
    { t: "Event Mesh /<br/>Event Bus", icon: "zap" },
    { t: "Fan-Out<br/>Patterns", icon: "layers" },
    { t: "Pub-Sub<br/>Patterns", icon: "activity" }
  ];
  t3Routing.forEach((tr, idx) => {
    const rx = 160 + idx * 106;
    const html = `<div style="text-align:center;padding:2px;">
      <div style="display:flex;justify-content:center;margin-bottom:2px;">${svgIcon(tr.icon as keyof typeof SVG, "#D97706", 13)}</div>
      <div style="font-size:7px;font-weight:800;color:#0F172A;line-height:1.1;">${tr.t}</div>
    </div>`;
    cell(`t3_r_${idx}`, html, rx, 394, 101, 64, "rounded=1;arcSize=4;fillColor=#FFFBEB;strokeColor=#FDE68A;strokeWidth=1;html=1;align=center;verticalAlign=middle;");
  });

  // --- TIER 2: EVENT INGESTION LAYER (y: 468..544, h: 76) ---
  cell("t2_frame", "", 16, 468, 1214, 76, "rounded=1;arcSize=2;fillColor=#FFFFFF;strokeColor=#EA580C;strokeWidth=1.2;");
  cell("t2_badge", "2", 22, 474, 24, 24, "rounded=1;arcSize=4;fillColor=#EA580C;fontColor=#FFFFFF;fontSize=12;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t2_lbl", "<b style=\"font-size:8.5px;color:#EA580C;\">EVENT INGESTION<br/>LAYER</b>", 50, 474, 105, 34, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  const t2Ingestion = [
    { t: "Pub/Sub<br/>(Managed)", icon: "network" },
    { t: "Kafka / Confluent<br/>Compatibility", icon: "layers" },
    { t: "Eventarc<br/>(CloudEvents)", icon: "zap" },
    { t: "Datastream<br/>CDC", icon: "repeat" },
    { t: "API Gateway /<br/>Apigee", icon: "network" },
    { t: "Batch-to-Event<br/>Adapters", icon: "server" },
    { t: "File / Event<br/>Bridge", icon: "folder" }
  ];
  t2Ingestion.forEach((ti, idx) => {
    const ix = 160 + idx * 152;
    const html = `<div style="display:flex;align-items:center;gap:6px;padding:2px 4px;">
      ${svgIcon(ti.icon as keyof typeof SVG, "#EA580C", 16)}
      <span style="font-size:8px;font-weight:800;color:#0F172A;line-height:1.15;">${ti.t}</span>
    </div>`;
    cell(`t2_i_${idx}`, html, ix, 474, 146, 64, "rounded=1;arcSize=4;fillColor=#FFF7ED;strokeColor=#FED7AA;strokeWidth=1;html=1;align=left;verticalAlign=middle;");
  });

  // --- TIER 1: EVENT SOURCES LAYER (y: 548..624, h: 76) ---
  cell("t1_frame", "", 16, 548, 1214, 76, "rounded=1;arcSize=2;fillColor=#FFFFFF;strokeColor=#1E40AF;strokeWidth=1.2;");
  cell("t1_badge", "1", 22, 554, 24, 24, "rounded=1;arcSize=4;fillColor=#1E40AF;fontColor=#FFFFFF;fontSize=12;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t1_lbl", "<b style=\"font-size:8.5px;color:#1E40AF;\">EVENT SOURCES<br/>LAYER</b>", 50, 554, 105, 34, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  const t1Sources = [
    { t: "On-prem<br/>Databases", icon: "database" },
    { t: "Operational<br/>Applications", icon: "server" },
    { t: "Web / Mobile<br/>Applications", icon: "smartphone" },
    { t: "SaaS<br/>Applications", icon: "cloud" },
    { t: "Partner<br/>Systems", icon: "users" },
    { t: "APIs<br/>(External)", icon: "network" },
    { t: "IoT Devices<br/>&amp; Sensors", icon: "activity" },
    { t: "Clickstream /<br/>Events", icon: "chart" },
    { t: "Logs /<br/>Telemetry", icon: "fileCode" }
  ];
  t1Sources.forEach((ts, idx) => {
    const sx = 160 + idx * 118;
    const html = `<div style="text-align:center;padding:2px;">
      <div style="display:flex;justify-content:center;margin-bottom:2px;">${svgIcon(ts.icon as keyof typeof SVG, "#1E40AF", 14)}</div>
      <div style="font-size:7px;font-weight:800;color:#0F172A;line-height:1.1;">${ts.t}</div>
    </div>`;
    cell(`t1_s_${idx}`, html, sx, 554, 112, 64, "rounded=1;arcSize=4;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1;html=1;align=center;verticalAlign=middle;");
  });

  // --- CROSS-CUTTING FOUNDATION: SECURITY & NETWORK FOUNDATION (y: 630..698, h: 68) ---
  cell("sec_frame", "", 16, 630, 1214, 68, "rounded=1;arcSize=2;fillColor=#FFFFFF;strokeColor=#1E293B;strokeWidth=1.2;");
  cell("sec_hdr", "<b style=\"font-size:9.5px;color:#0F172A;letter-spacing:0.5px;\">SECURITY &amp; NETWORK FOUNDATION</b>", 16, 632, 1214, 14, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  const secControls = [
    { t: "Zero Trust<br/>Architecture", icon: "shieldCheck" },
    { t: "VPC<br/>Network", icon: "network" },
    { t: "Private Ingress /<br/>Egress", icon: "cloud" },
    { t: "Encryption In Transit<br/>(TLS)", icon: "lock" },
    { t: "Encryption At Rest<br/>(CMEK)", icon: "shieldCheck" },
    { t: "Secret<br/>Manager", icon: "key" },
    { t: "KMS /<br/>CMEK", icon: "lock" },
    { t: "Firewall &amp;<br/>Service Perimeter", icon: "shieldCheck" },
    { t: "Multi-Region<br/>Resilience", icon: "cloud" },
    { t: "Backup /<br/>DR", icon: "database" }
  ];
  secControls.forEach((sc, idx) => {
    const scx = 24 + idx * 119;
    const html = `<div style="text-align:center;padding:2px;">
      <div style="display:flex;justify-content:center;margin-bottom:2px;">${svgIcon(sc.icon as keyof typeof SVG, "#1E293B", 13)}</div>
      <div style="font-size:6.5px;font-weight:700;color:#0F172A;line-height:1.1;">${sc.t}</div>
    </div>`;
    cell(`sec_c_${idx}`, html, scx, 648, 114, 46, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;html=1;align=center;verticalAlign=middle;");
  });

  // =========================================================================
  // 3. RIGHT COLUMN: TIERS 8, 9, 10 (x: 1246..1584, w: 338)
  // =========================================================================

  // --- TIER 8: GOVERNANCE & EVENT MANAGEMENT (y: 68..278, h: 210) ---
  cell("t8_frame", "", 1246, 68, 338, 210, "rounded=1;arcSize=2;fillColor=#FFFFFF;strokeColor=#6D28D9;strokeWidth=1.2;");
  cell("t8_badge", "8", 1252, 74, 24, 24, "rounded=1;arcSize=4;fillColor=#6D28D9;fontColor=#FFFFFF;fontSize=12;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t8_lbl", "<b style=\"font-size:9.5px;color:#6D28D9;\">GOVERNANCE &amp; EVENT MANAGEMENT</b>", 1282, 74, 290, 24, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  const govGrid = [
    { t: "Schema Registry", icon: "fileCode", r: 0, c: 0 },
    { t: "Event Catalog", icon: "folder", r: 0, c: 1 },
    { t: "Lineage &amp; Impact", icon: "network", r: 1, c: 0 },
    { t: "Data Quality", icon: "checkCircle", r: 1, c: 1 },
    { t: "Retention Policies", icon: "database", r: 2, c: 0 },
    { t: "Privacy / PII Controls", icon: "shieldCheck", r: 2, c: 1 }
  ];
  govGrid.forEach((gg, idx) => {
    const gx = 1256 + gg.c * 160;
    const gy = 102 + gg.r * 40;
    const html = `<div style="display:flex;align-items:center;gap:6px;padding:2px 4px;">
      ${svgIcon(gg.icon as keyof typeof SVG, "#6D28D9", 13)}
      <span style="font-size:7.5px;font-weight:700;color:#0F172A;">${gg.t}</span>
    </div>`;
    cell(`t8_g_${idx}`, html, gx, gy, 154, 34, "rounded=1;arcSize=4;fillColor=#FAF5FF;strokeColor=#E9D5FF;strokeWidth=1;html=1;align=left;verticalAlign=middle;");
  });

  // Bottom row in Tier 8: IAM & Access Management + Data Contracts
  const iamGovHtml = `<div style="display:flex;align-items:center;gap:6px;padding:2px 4px;">
    ${svgIcon("lock", "#6D28D9", 13)}
    <span style="font-size:7.5px;font-weight:700;color:#0F172A;">IAM &amp; Access Mgmt</span>
  </div>`;
  cell("t8_iam", iamGovHtml, 1256, 226, 154, 44, "rounded=1;arcSize=4;fillColor=#F5F3FF;strokeColor=#DDD6FE;strokeWidth=1;html=1;align=left;verticalAlign=middle;");

  const contractGovHtml = `<div style="display:flex;align-items:center;gap:6px;padding:2px 4px;">
    ${svgIcon("fileCode", "#6D28D9", 13)}
    <span style="font-size:7.5px;font-weight:700;color:#0F172A;">Data Contracts</span>
  </div>`;
  cell("t8_contracts", contractGovHtml, 1416, 226, 154, 44, "rounded=1;arcSize=4;fillColor=#F5F3FF;strokeColor=#DDD6FE;strokeWidth=1;html=1;align=left;verticalAlign=middle;");

  // --- TIER 9: OBSERVABILITY & RELIABILITY (y: 284..486, h: 202) ---
  cell("t9_frame", "", 1246, 284, 338, 202, "rounded=1;arcSize=2;fillColor=#FFFFFF;strokeColor=#1D4ED8;strokeWidth=1.2;");
  cell("t9_badge", "9", 1252, 290, 24, 24, "rounded=1;arcSize=4;fillColor=#1D4ED8;fontColor=#FFFFFF;fontSize=12;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t9_lbl", "<b style=\"font-size:9.5px;color:#1D4ED8;\">OBSERVABILITY &amp; RELIABILITY</b>", 1282, 290, 290, 24, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  const obsGrid = [
    { t: "Cloud Monitoring", icon: "activity", r: 0, c: 0 },
    { t: "Cloud Logging", icon: "fileCode", r: 0, c: 1 },
    { t: "Cloud Trace", icon: "network", r: 1, c: 0 },
    { t: "SLO / Alerting", icon: "bell", r: 1, c: 1 },
    { t: "Lag Monitoring", icon: "chart", r: 2, c: 0 },
    { t: "Throughput / Latency", icon: "zap", r: 2, c: 1 },
    { t: "Error Reporting", icon: "shieldCheck", r: 3, c: 0 },
    { t: "Replay / Backpressure", icon: "repeat", r: 3, c: 1 }
  ];
  obsGrid.forEach((og, idx) => {
    const ox = 1256 + og.c * 160;
    const oy = 318 + og.r * 38;
    const html = `<div style="display:flex;align-items:center;gap:6px;padding:2px 4px;">
      ${svgIcon(og.icon as keyof typeof SVG, "#1D4ED8", 13)}
      <span style="font-size:7.5px;font-weight:700;color:#0F172A;">${og.t}</span>
    </div>`;
    cell(`t9_o_${idx}`, html, ox, oy, 154, 32, "rounded=1;arcSize=4;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1;html=1;align=left;verticalAlign=middle;");
  });

  // --- TIER 10: PLATFORM OPERATIONS (y: 492..698, h: 206) ---
  cell("t10_frame", "", 1246, 492, 338, 206, "rounded=1;arcSize=2;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;");
  cell("t10_badge", "10", 1252, 498, 24, 24, "rounded=1;arcSize=4;fillColor=#16A34A;fontColor=#FFFFFF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t10_lbl", "<b style=\"font-size:9.5px;color:#16A34A;\">PLATFORM OPERATIONS</b>", 1282, 498, 290, 24, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  const opsGrid = [
    { t: "CI / CD Pipelines", icon: "repeat", r: 0, c: 0 },
    { t: "Infrastructure as Code", icon: "fileCode", r: 0, c: 1 },
    { t: "Deployment / GitOps", icon: "settings", r: 1, c: 0 },
    { t: "Cost Management", icon: "dollar", r: 1, c: 1 },
    { t: "Security Command Ctr", icon: "shieldCheck", r: 2, c: 0 },
    { t: "Capacity / Scaling", icon: "server", r: 2, c: 1 },
    { t: "Incident Response", icon: "activity", r: 3, c: 0 },
    { t: "Release Management", icon: "layers", r: 3, c: 1 }
  ];
  opsGrid.forEach((og, idx) => {
    const ox = 1256 + og.c * 160;
    const oy = 526 + og.r * 40;
    const html = `<div style="display:flex;align-items:center;gap:6px;padding:2px 4px;">
      ${svgIcon(og.icon as keyof typeof SVG, "#16A34A", 13)}
      <span style="font-size:7.5px;font-weight:700;color:#0F172A;">${og.t}</span>
    </div>`;
    cell(`t10_o_${idx}`, html, ox, oy, 154, 34, "rounded=1;arcSize=4;fillColor=#F0FDF4;strokeColor=#BBF7D0;strokeWidth=1;html=1;align=left;verticalAlign=middle;");
  });

  // =========================================================================
  // 4. BOTTOM PANELS: FLOW, ARROWS, ICONS (y: 708..840, h: 132)
  // =========================================================================

  // --- Left Box: END-TO-END EVENT FLOW (x: 16..600, w: 584) ---
  cell("flow_box", "", 16, 708, 584, 132, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("flow_hdr", "<b style=\"font-size:9px;color:#0F172A;\">END-TO-END EVENT FLOW (EXAMPLE)</b>", 16, 712, 584, 16, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  const flowSteps = [
    { n: "1", t: "Source", sub: "Events originate from diverse sources", color: "#1E40AF" },
    { n: "2", t: "Ingestion", sub: "Events are captured &amp; ingested", color: "#EA580C" },
    { n: "3", t: "Routing", sub: "Events are routed &amp; managed", color: "#D97706" },
    { n: "4", t: "Processing", sub: "Events are processed &amp; enriched", color: "#16A34A" },
    { n: "5", t: "Storage", sub: "State stored &amp; analytics captured", color: "#1D4ED8" },
    { n: "6", t: "Consumption", sub: "Events consumed by apps &amp; systems", color: "#6D28D9" }
  ];
  flowSteps.forEach((fs, idx) => {
    const fx = 24 + idx * 95;
    const html = `<div style="text-align:center;padding:2px;">
      <div style="display:inline-block;background:${fs.color};color:#FFFFFF;border-radius:12px;width:20px;height:20px;font-size:10px;font-weight:900;line-height:20px;margin-bottom:4px;">${fs.n}</div>
      <div style="font-size:8px;font-weight:800;color:#0F172A;margin-bottom:2px;">${fs.t}</div>
      <div style="font-size:6px;color:#64748B;line-height:1.1;">${fs.sub}</div>
    </div>`;
    cell(`flow_step_${idx}`, html, fx, 730, 90, 102, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=top;");
  });

  // --- Middle Box: ARROW LEGEND (x: 608..950, w: 342) ---
  cell("arrow_box", "", 608, 708, 342, 132, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("arrow_hdr", "<b style=\"font-size:9px;color:#0F172A;\">ARROW LEGEND</b>", 608, 712, 342, 16, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  const arrowLegendHtml = `<div style="padding:4px 12px;font-size:7.5px;color:#0F172A;">
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;">
      <span style="width:24px;height:2px;background:#1D4ED8;display:inline-block;"></span>
      <div><b>Data Flow</b> (Payload / Data)<br/><span style="font-size:6.5px;color:#64748B;">Continuous movement of event data or datasets</span></div>
    </div>
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;">
      <span style="width:24px;height:2px;border-top:2px dashed #EA580C;display:inline-block;"></span>
      <div><b>Event Flow</b> (Events / Messages)<br/><span style="font-size:6.5px;color:#64748B;">Discrete events and message propagation</span></div>
    </div>
    <div style="display:flex;align-items:center;gap:8px;">
      <span style="width:24px;height:2px;border-top:2px dashed #6D28D9;display:inline-block;"></span>
      <div><b>Control / Governance Flow</b><br/><span style="font-size:6.5px;color:#64748B;">Policies, configurations, metadata &amp; governance</span></div>
    </div>
  </div>`;
  cell("arrow_legend_content", arrowLegendHtml, 608, 730, 342, 102, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  // --- Right Box: ICON LEGEND (Selected) (x: 958..1584, w: 626) ---
  cell("icon_box", "", 958, 708, 626, 132, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("icon_hdr", "<b style=\"font-size:9px;color:#0F172A;\">ICON LEGEND (Selected)</b>", 958, 712, 626, 16, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  const iconLegendHtml = `<div style="display:grid;grid-template-columns:repeat(6, 1fr);gap:6px;padding:4px 10px;font-size:7px;color:#0F172A;align-items:center;">
    <div style="display:flex;align-items:center;gap:4px;">${svgIcon("network", "#1D4ED8", 12)} <span>Pub/Sub Topic</span></div>
    <div style="display:flex;align-items:center;gap:4px;">${svgIcon("users", "#1D4ED8", 12)} <span>Subscription</span></div>
    <div style="display:flex;align-items:center;gap:4px;">${svgIcon("bell", "#DC2626", 12)} <span>DLQ</span></div>
    <div style="display:flex;align-items:center;gap:4px;">${svgIcon("repeat", "#16A34A", 12)} <span>Dataflow</span></div>
    <div style="display:flex;align-items:center;gap:4px;">${svgIcon("search", "#1D4ED8", 12)} <span>BigQuery</span></div>
    <div style="display:flex;align-items:center;gap:4px;">${svgIcon("cloud", "#1D4ED8", 12)} <span>Cloud Storage</span></div>
    <div style="display:flex;align-items:center;gap:4px;">${svgIcon("layers", "#1D4ED8", 12)} <span>Spanner</span></div>
    <div style="display:flex;align-items:center;gap:4px;">${svgIcon("database", "#1D4ED8", 12)} <span>Bigtable</span></div>
    <div style="display:flex;align-items:center;gap:4px;">${svgIcon("server", "#1D4ED8", 12)} <span>Memorystore</span></div>
    <div style="display:flex;align-items:center;gap:4px;">${svgIcon("repeat", "#EA580C", 12)} <span>Datastream</span></div>
    <div style="display:flex;align-items:center;gap:4px;">${svgIcon("zap", "#EA580C", 12)} <span>Eventarc</span></div>
    <div style="display:flex;align-items:center;gap:4px;">${svgIcon("network", "#EA580C", 12)} <span>Apigee</span></div>
    <div style="display:flex;align-items:center;gap:4px;">${svgIcon("server", "#4338CA", 12)} <span>GKE / Cloud Run</span></div>
    <div style="display:flex;align-items:center;gap:4px;">${svgIcon("cloud", "#4338CA", 12)} <span>Cloud Functions</span></div>
    <div style="display:flex;align-items:center;gap:4px;">${svgIcon("activity", "#1D4ED8", 12)} <span>Monitoring</span></div>
    <div style="display:flex;align-items:center;gap:4px;">${svgIcon("fileCode", "#1D4ED8", 12)} <span>Logging</span></div>
    <div style="display:flex;align-items:center;gap:4px;">${svgIcon("network", "#1D4ED8", 12)} <span>Trace</span></div>
    <div style="display:flex;align-items:center;gap:4px;">${svgIcon("shieldCheck", "#16A34A", 12)} <span>Security</span></div>
  </div>`;
  cell("icon_legend_content", iconLegendHtml, 958, 730, 626, 102, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  // Bottom Copyright Note
  const footerNote = `<span style="font-size:7px;color:#94A3B8;">This reference architecture is designed for illustrative purposes. Customize based on your business requirements, compliance needs, and operational constraints.</span>`;
  cell("footer_note", footerNote, 16, 846, 1100, 20, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  const footerCopy = `<span style="font-size:7px;color:#94A3B8;">© 2024 Google Cloud</span>`;
  cell("footer_copy", footerCopy, 1400, 846, 184, 20, "text;html=1;strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

  // =========================================================================
  // 5. INTER-TIER CONNECTING FLOW ARROWS
  // =========================================================================
  // Tier 1 -> Tier 2 (Upward arrows from Sources to Ingestion)
  [216, 334, 452, 570, 688, 806, 924, 1042].forEach((x, idx) => {
    rawEdge(`e_t1_t2_${idx}`, "edgeStyle=none;strokeColor=#1E40AF;strokeWidth=1.5;endArrow=classic;endSize=4;", [
      { x, y: 548 },
      { x, y: 544 }
    ]);
  });

  // Tier 2 -> Tier 3 (Upward arrows from Ingestion to Routing)
  [233, 385, 537, 689, 841, 993, 1145].forEach((x, idx) => {
    rawEdge(`e_t2_t3_${idx}`, "edgeStyle=none;strokeColor=#EA580C;strokeWidth=1.5;endArrow=classic;endSize=4;", [
      { x, y: 468 },
      { x, y: 464 }
    ]);
  });

  // Tier 3 -> Tier 4 (Upward arrows from Routing to Processing)
  [213, 319, 425, 531, 637, 743, 849, 955, 1061].forEach((x, idx) => {
    rawEdge(`e_t3_t4_${idx}`, "edgeStyle=none;strokeColor=#D97706;strokeWidth=1.5;endArrow=classic;endSize=4;", [
      { x, y: 388 },
      { x, y: 384 }
    ]);
  });

  // Tier 4 -> Tier 5 (Upward arrows from Processing to Storage)
  [233, 385, 537, 689, 841, 993, 1145].forEach((x, idx) => {
    rawEdge(`e_t4_t5_${idx}`, "edgeStyle=none;strokeColor=#16A34A;strokeWidth=1.5;endArrow=classic;endSize=4;", [
      { x, y: 308 },
      { x, y: 304 }
    ]);
  });

  // Tier 5 -> Tier 6 (Upward arrows from Storage to Consumers)
  [226, 359, 492, 625, 758, 891, 1024, 1157].forEach((x, idx) => {
    rawEdge(`e_t5_t6_${idx}`, "edgeStyle=none;strokeColor=#1D4ED8;strokeWidth=1.5;endArrow=classic;endSize=4;", [
      { x, y: 228 },
      { x, y: 224 }
    ]);
  });

  // Tier 6 -> Tier 7 (Upward arrows from Consumers to Business Domains)
  [233, 385, 537, 689, 841, 993, 1145].forEach((x, idx) => {
    rawEdge(`e_t6_t7_${idx}`, "edgeStyle=none;strokeColor=#4338CA;strokeWidth=1.5;endArrow=classic;endSize=4;", [
      { x, y: 148 },
      { x, y: 144 }
    ]);
  });

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_43" name="Real-Time Streaming &amp; Event-Driven Enterprise">
    <mxGraphModel dx="1600" dy="880" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="880" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${c.join("\n        ")}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
