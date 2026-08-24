/**
 * Master 1:1 High-Craft Exact Ground-Truth Replica for Template 42: Modern Data Lakehouse & Data Mesh
 * Matches 100% of images/42.png:
 * - Top Header with "42" Badge, "MODERN DATA LAKEHOUSE & DATA MESH", Subtitle, and Google Cloud 4-color branding
 * - Left Column (Tiers 7 down to 1):
 *   7) CONSUMPTION LAYER (BI & Reporting, Dashboards, Self-Service, AI/ML Apps, Operational Apps, APIs & Data Sharing, Data Consumers)
 *   6) DATA PRODUCT LAYER (Domain-Oriented Data Products, Data Product Portal/Catalog/Marketplace/Contracts/SLOs/Access)
 *   5) DATA MESH GOVERNANCE LAYER (Domain Ownership, Data Standards, Metadata/Catalog, Quality, Lineage, Policy, Access, Federated Governance)
 *   4) LAKEHOUSE STORAGE LAYER (Data Lake Raw Zone, BigLake, Lakehouse Curated Zone, Serving Zone, Storage Formats)
 *   3) DATA PROCESSING & COMPUTE LAYER (Batch, Interactive, Stream, Data Transformation, AI/ML Processing, Orchestration)
 *   2) DATA INGESTION LAYER with step badges 1..7 (Transfer Appliance, DMS, Pub/Sub, Datastream CDC, Apigee, Eventarc, Storage Transfer)
 *   1) DATA SOURCES LAYER (On-prem DBs, Operational Apps, Files/Logs, IoT Sensors, SaaS, External APIs, Third-party Data, Multi-region)
 * - Right Column (Tiers 8, 9, 10):
 *   8) GOVERNANCE & DATA MANAGEMENT (Data Catalog, Lineage, Quality, Observability, Privacy, MDM, Ref Data, Contracts, IAM)
 *   9) OBSERVABILITY & OPERATIONS (Monitoring, Logging, Error Reporting, Trace, SLO/Alerting, Audit Logs, Data Insights)
 *   10) PLATFORM OPERATIONS (IaC, CI/CD, Deployment Mgr, Cost Mgmt, Capacity Mgmt, SCC)
 * - Bottom Bar: Data Flow Legend (1..7 Flow Sequence with layer-matched colored badges) & Style Legend.
 * - 1600x980 master canvas resolution.
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
  settings: `<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>`
};

const gcpCloudLogo = `<svg width="24" height="20" viewBox="0 0 192 154" fill="none">
  <path d="M152 76.8c0-21.2-17.2-38.4-38.4-38.4-3.7 0-7.3.5-10.7 1.5C97.1 22.8 80.1 11.5 60.8 11.5c-27.4 0-49.6 22.2-49.6 49.6 0 1.9.1 3.7.4 5.5C4.8 71.3 0 79.9 0 89.6c0 14.1 11.5 25.6 25.6 25.6h126.4c22.1 0 40-17.9 40-40 0-21.3-16.7-38.7-37.8-39.9-.7.7-1.5 1.1-2.2 1.5z" fill="#4285F4"/>
  <path d="M60.8 11.5c19.3 0 36.3 11.3 42.1 28.4 3.4-1 7-1.5 10.7-1.5 21.2 0 38.4 17.2 38.4 38.4 0 1.2-.1 2.3-.2 3.5 2.8-.7 5.7-1.1 8.6-1.1 22.1 0 40 17.9 40 40 0 2.1-.2 4.1-.5 6.1C200.7 122.9 201 120 201 117c0-22.1-17.9-40-40-40-2.9 0-5.8.4-8.6 1.1.1-1.2.2-2.3.2-3.5 0-21.2-17.2-38.4-38.4-38.4-3.7 0-7.3.5-10.7 1.5C97.1 20.8 80.1 9.5 60.8 9.5c-27.4 0-49.6 22.2-49.6 49.6 0 1.9.1 3.7.4 5.5C4.8 69.3 0 77.9 0 87.6c0 14.1 11.5 25.6 25.6 25.6h126.4c22.1 0 40-17.9 40-40z" fill="#EA4335" opacity="0.15"/>
</svg>`;

const svgIcon = (iconName: keyof typeof SVG, strokeColor = "#1D4ED8", size = 16) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${SVG[iconName] || SVG.database}</svg>`;

export function generateTemplate42ModernDataLakehouseDataMeshXml(
  domainFlavor = "datamesh",
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
  cell("hdr_num", "42", 16, 12, 54, 48, "shape=rectangle;rounded=1;arcSize=14;fillColor=#1D4ED8;strokeColor=#1D4ED8;fontColor=#FFFFFF;fontSize=26;fontStyle=1;align=center;verticalAlign=middle;");

  const titleHtml = `<div style="font-size:20px;font-weight:900;color:#0F172A;letter-spacing:0.5px;">MODERN DATA LAKEHOUSE &amp; DATA MESH</div>
    <div style="font-size:11px;color:#475569;font-weight:600;margin-top:2px;">Unified • Governed • Scalable • Secure • AI-Ready</div>`;
  cell("hdr_title", titleHtml, 78, 12, 700, 48, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

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
  // 2. LEFT COLUMN: TIERS 7 DOWN TO 1 (x: 16..1230, w: 1214)
  // =========================================================================

  // --- TIER 7: CONSUMPTION LAYER (y: 68..172, h: 104) ---
  cell("t7_frame", "", 16, 68, 1214, 104, "rounded=1;arcSize=2;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;");
  cell("t7_badge", "7", 22, 74, 24, 24, "rounded=1;arcSize=4;fillColor=#1D4ED8;fontColor=#FFFFFF;fontSize=12;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t7_lbl", "<b style=\"font-size:9.5px;color:#1D4ED8;\">CONSUMPTION LAYER</b><br/><span style=\"font-size:7.5px;color:#64748B;\">Data Products<br/>&amp; Experiences</span>", 50, 74, 95, 34, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  const t7Cards = [
    { t: "BI &amp; Reporting", sub: "Looker • Looker Studio", icon: "chart" },
    { t: "Dashboards", sub: "Google Sheets • Data Studio", icon: "chart" },
    { t: "Self-Service Analytics", sub: "Vertex AI Notebooks • BigQuery Studio", icon: "search" },
    { t: "AI / ML Applications", sub: "Vertex AI Apps", icon: "sparkles" },
    { t: "Operational Applications", sub: "Business Applications • Data Apps", icon: "layers" },
    { t: "APIs &amp; Data Sharing", sub: "Gateway • Apigee", icon: "network" }
  ];
  t7Cards.forEach((crd, idx) => {
    const cx = 150 + idx * 148;
    const html = `<div style="text-align:center;padding:4px 2px;">
      <div style="font-size:8.5px;font-weight:800;color:#0F172A;margin-bottom:4px;">${crd.t}</div>
      <div style="display:flex;justify-content:center;margin-bottom:4px;">${svgIcon(crd.icon as keyof typeof SVG, "#1D4ED8", 16)}</div>
      <div style="font-size:7px;color:#64748B;line-height:1.2;">${crd.sub}</div>
    </div>`;
    cell(`t7_c_${idx}`, html, cx, 74, 142, 92, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;html=1;align=center;verticalAlign=middle;");
  });

  // Right Consumer box in Tier 7
  const consumerHtml = `<div style="text-align:center;padding:4px 2px;">
    <div style="display:flex;justify-content:center;margin-bottom:2px;">${svgIcon("users", "#1D4ED8", 18)}</div>
    <div style="font-size:8.5px;font-weight:900;color:#0F172A;">Data Consumers</div>
    <div style="font-size:7px;color:#64748B;margin-top:2px;">Business Users<br/>Data Scientists<br/>Engineers</div>
  </div>`;
  cell("t7_consumers", consumerHtml, 1042, 74, 180, 92, "rounded=1;arcSize=4;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1;html=1;align=center;verticalAlign=middle;");

  // --- TIER 6: DATA PRODUCT LAYER (y: 178..286, h: 108) ---
  cell("t6_frame", "", 16, 178, 1214, 108, "rounded=1;arcSize=2;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;");
  cell("t6_badge", "6", 22, 184, 24, 24, "rounded=1;arcSize=4;fillColor=#1D4ED8;fontColor=#FFFFFF;fontSize=12;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t6_lbl", "<b style=\"font-size:9.5px;color:#1D4ED8;\">DATA PRODUCT LAYER</b><br/><span style=\"font-size:7.5px;color:#64748B;\">Curated • Trusted<br/>Discoverable • Shareable</span>", 50, 184, 95, 34, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  // Domain-Oriented Data Products Container
  cell("t6_domain_box", "", 150, 184, 1072, 54, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("t6_domain_hdr", "<b style=\"font-size:8.5px;color:#0F172A;\">Domain-Oriented Data Products (Data as a Product)</b>", 150, 186, 1072, 16, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  const domainChips = [
    { t: "Customer 360", icon: "users" },
    { t: "Finance", icon: "dollar" },
    { t: "Sales", icon: "chart" },
    { t: "Supply Chain", icon: "layers" },
    { t: "Product", icon: "folder" },
    { t: "Marketing", icon: "activity" },
    { t: "Risk &amp; Compliance", icon: "shieldCheck" },
    { t: "... More", icon: "sparkles" }
  ];
  domainChips.forEach((dc, idx) => {
    const dx = 158 + idx * 131;
    const html = `<div style="display:flex;align-items:center;justify-content:center;gap:4px;font-size:8px;font-weight:800;color:#0F172A;padding:2px 4px;">
      ${svgIcon(dc.icon as keyof typeof SVG, "#1D4ED8", 12)}
      <span>${dc.t}</span>
    </div>`;
    cell(`t6_chip_${idx}`, html, dx, 204, 124, 28, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1;html=1;align=center;verticalAlign=middle;");
  });

  // Bottom Sub-Bar: Feature Badges
  const productFeatures = [
    { t: "Data Product Portal", icon: "users" },
    { t: "Catalog", icon: "folder" },
    { t: "Marketplace", icon: "layers" },
    { t: "Data Contracts", icon: "fileCode" },
    { t: "SLOs &amp; SLAs", icon: "checkCircle" },
    { t: "Access Policies", icon: "lock" }
  ];
  productFeatures.forEach((pf, idx) => {
    const px = 150 + idx * 179;
    const html = `<div style="display:flex;align-items:center;justify-content:center;gap:6px;padding:2px 4px;">
      ${svgIcon(pf.icon as keyof typeof SVG, "#7C3AED", 13)}
      <span style="font-size:8px;font-weight:700;color:#0F172A;">${pf.t}</span>
    </div>`;
    cell(`t6_feat_${idx}`, html, px, 244, 174, 34, "rounded=1;arcSize=4;fillColor=#FAF5FF;strokeColor=#DDD6FE;strokeWidth=1;html=1;align=center;verticalAlign=middle;");
  });

  // --- TIER 5: DATA MESH GOVERNANCE LAYER (y: 292..394, h: 102) ---
  cell("t5_frame", "", 16, 292, 1214, 102, "rounded=1;arcSize=2;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;");
  cell("t5_badge", "5", 22, 298, 24, 24, "rounded=1;arcSize=4;fillColor=#1D4ED8;fontColor=#FFFFFF;fontSize=12;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t5_lbl", "<b style=\"font-size:9px;color:#1D4ED8;\">DATA MESH<br/>GOVERNANCE LAYER</b><br/><span style=\"font-size:7px;color:#64748B;\">Federated Governance<br/>&amp; Domain Ownership</span>", 50, 298, 95, 34, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  const meshPillars = [
    { t: "Domain Ownership", sub: "Domain Teams &amp; Stewards", icon: "users" },
    { t: "Data Standards", sub: "Schemas &amp; Conventions", icon: "fileCode" },
    { t: "Metadata &amp; Catalog", sub: "Data Catalog &amp; Glossary", icon: "search" },
    { t: "Data Quality", sub: "Policy Rules &amp; Scorecards", icon: "checkCircle" },
    { t: "Data Lineage", sub: "End-to-End Lineage", icon: "network" },
    { t: "Policy &amp; Compliance", sub: "Classifications &amp; Policies", icon: "shieldCheck" },
    { t: "Access &amp; Sharing", sub: "IAM &amp; Sharing Policies", icon: "lock" }
  ];
  meshPillars.forEach((mp, idx) => {
    const mx = 150 + idx * 153;
    const html = `<div style="text-align:center;padding:3px 2px;">
      <div style="font-size:8px;font-weight:800;color:#0F172A;margin-bottom:2px;">${mp.t}</div>
      <div style="display:flex;justify-content:center;margin-bottom:2px;">${svgIcon(mp.icon as keyof typeof SVG, "#1D4ED8", 14)}</div>
      <div style="font-size:6.5px;color:#64748B;">${mp.sub}</div>
    </div>`;
    cell(`t5_pill_${idx}`, html, mx, 298, 147, 56, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;html=1;align=center;verticalAlign=middle;");
  });

  // Federated Governance Bar
  const fedGovHtml = `<div style="display:flex;align-items:center;justify-content:center;gap:8px;">
    ${svgIcon("shieldCheck", "#1D4ED8", 14)}
    <b style="font-size:8.5px;color:#1D4ED8;">Federated Governance (Central Guardrails + Decentralized Execution)</b>
  </div>`;
  cell("t5_fed_bar", fedGovHtml, 150, 360, 1072, 28, "rounded=1;arcSize=4;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1;html=1;align=center;verticalAlign=middle;");

  // --- TIER 4: LAKEHOUSE STORAGE LAYER (y: 400..508, h: 108) ---
  cell("t4_frame", "", 16, 400, 1214, 108, "rounded=1;arcSize=2;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;");
  cell("t4_badge", "4", 22, 406, 24, 24, "rounded=1;arcSize=4;fillColor=#16A34A;fontColor=#FFFFFF;fontSize=12;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t4_lbl", "<b style=\"font-size:9.5px;color:#16A34A;\">LAKEHOUSE<br/>STORAGE LAYER</b><br/><span style=\"font-size:7.5px;color:#64748B;\">Open • Scalable<br/>Multi-Engine</span>", 50, 406, 95, 34, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  // Zone 1: Data Lake (Raw Zone)
  const z1Html = `<div style="text-align:center;padding:4px 2px;">
    <div style="font-size:8.5px;font-weight:800;color:#16A34A;margin-bottom:4px;">Data Lake (Raw Zone)</div>
    <div style="display:flex;justify-content:center;margin-bottom:2px;">${svgIcon("database", "#4285F4", 18)}</div>
    <div style="font-size:8px;font-weight:700;color:#0F172A;">Cloud Storage</div>
    <div style="font-size:6.5px;color:#64748B;">Raw / Ingestion Immutable</div>
  </div>`;
  cell("t4_z1", z1Html, 150, 406, 170, 96, "rounded=1;arcSize=4;fillColor=#F0FDF4;strokeColor=#BBF7D0;strokeWidth=1;html=1;align=center;verticalAlign=middle;");

  // BigLake Bridge Pill
  const bigLakeHtml = `<div style="text-align:center;padding:2px;">
    <div style="display:flex;justify-content:center;margin-bottom:2px;">${svgIcon("database", "#1D4ED8", 16)}</div>
    <div style="font-size:8.5px;font-weight:900;color:#1D4ED8;">BigLake</div>
  </div>`;
  cell("t4_biglake", bigLakeHtml, 326, 434, 76, 44, "rounded=1;arcSize=6;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1;html=1;align=center;verticalAlign=middle;");

  // Zone 2: Lakehouse (Curated Zone)
  const z2Html = `<div style="text-align:center;padding:4px 2px;">
    <div style="font-size:8.5px;font-weight:800;color:#16A34A;margin-bottom:4px;">Lakehouse (Curated Zone)</div>
    <div style="display:flex;justify-content:space-around;gap:6px;">
      <div style="text-align:center;">
        <div style="font-size:8px;font-weight:700;color:#0F172A;">Delta Lake / Iceberg</div>
        <div style="font-size:6.5px;color:#64748B;">ACID Transactions • Time Travel</div>
      </div>
      <div style="text-align:center;">
        <div style="font-size:8px;font-weight:700;color:#0F172A;">Unity / Dataplex Catalog</div>
        <div style="font-size:6.5px;color:#64748B;">Fine-Grained Security • Governance</div>
      </div>
    </div>
  </div>`;
  cell("t4_z2", z2Html, 408, 406, 320, 96, "rounded=1;arcSize=4;fillColor=#F0FDF4;strokeColor=#BBF7D0;strokeWidth=1;html=1;align=center;verticalAlign=middle;");

  // Zone 3: Serving Zone
  const z3Html = `<div style="text-align:center;padding:4px 2px;">
    <div style="font-size:8.5px;font-weight:800;color:#16A34A;margin-bottom:4px;">Serving Zone</div>
    <div style="display:flex;justify-content:space-around;gap:6px;">
      <div style="text-align:center;">
        <div style="display:flex;justify-content:center;margin-bottom:2px;">${svgIcon("search", "#4285F4", 16)}</div>
        <div style="font-size:8px;font-weight:700;color:#0F172A;">BigQuery</div>
        <div style="font-size:6.5px;color:#64748B;">(Warehouse)</div>
      </div>
      <div style="text-align:center;">
        <div style="display:flex;justify-content:center;margin-bottom:2px;">${svgIcon("sparkles", "#7C3AED", 16)}</div>
        <div style="font-size:8px;font-weight:700;color:#0F172A;">Vertex AI</div>
        <div style="font-size:6.5px;color:#64748B;">Feature Store</div>
      </div>
    </div>
  </div>`;
  cell("t4_z3", z3Html, 734, 406, 270, 96, "rounded=1;arcSize=4;fillColor=#F0FDF4;strokeColor=#BBF7D0;strokeWidth=1;html=1;align=center;verticalAlign=middle;");

  // Storage Formats Box
  const fmtHtml = `<div style="text-align:center;padding:4px 2px;">
    <div style="font-size:8px;font-weight:800;color:#0F172A;margin-bottom:2px;">Storage Formats</div>
    <div style="font-size:7px;color:#475569;line-height:1.3;">
      <b>Parquet</b><br/><b>ORC</b><br/><b>Avro</b><br/><b>JSON</b>
    </div>
  </div>`;
  cell("t4_formats", fmtHtml, 1010, 406, 212, 96, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;html=1;align=center;verticalAlign=middle;");

  // --- TIER 3: DATA PROCESSING & COMPUTE LAYER (y: 514..616, h: 102) ---
  cell("t3_frame", "", 16, 514, 1214, 102, "rounded=1;arcSize=2;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.2;");
  cell("t3_badge", "3", 22, 520, 24, 24, "rounded=1;arcSize=4;fillColor=#D97706;fontColor=#FFFFFF;fontSize=12;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t3_lbl", "<b style=\"font-size:9px;color:#D97706;\">DATA PROCESSING<br/>&amp; COMPUTE LAYER</b><br/><span style=\"font-size:7px;color:#64748B;\">Batch • Stream<br/>Interactive • ML</span>", 50, 520, 95, 34, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  const computeNodes = [
    { t: "Batch Processing", p: "Dataproc", sub: "Spark / Hive / Python", icon: "server" },
    { t: "Interactive Analytics", p: "BigQuery", sub: "Interactive Engine", icon: "search" },
    { t: "Stream Processing", p: "Datastream", sub: "Real-time Pipelines", icon: "network" },
    { t: "Data Transformation", p: "Dataflow", sub: "Batch &amp; Streaming (Beam)", icon: "repeat" },
    { t: "AI / ML Processing", p: "Vertex AI", sub: "Training &amp; Inference", icon: "sparkles" },
    { t: "Orchestration", p: "Cloud Composer", sub: "Managed Airflow Workflows", icon: "activity" }
  ];
  computeNodes.forEach((cn, idx) => {
    const cx = 150 + idx * 179;
    const html = `<div style="text-align:center;padding:4px 2px;">
      <div style="font-size:8px;font-weight:800;color:#D97706;margin-bottom:2px;">${cn.t}</div>
      <div style="display:flex;justify-content:center;margin-bottom:2px;">${svgIcon(cn.icon as keyof typeof SVG, "#D97706", 16)}</div>
      <div style="font-size:8px;font-weight:700;color:#0F172A;">${cn.p}</div>
      <div style="font-size:6.5px;color:#64748B;">${cn.sub}</div>
    </div>`;
    cell(`t3_c_${idx}`, html, cx, 520, 174, 90, "rounded=1;arcSize=4;fillColor=#FFFBEB;strokeColor=#FDE68A;strokeWidth=1;html=1;align=center;verticalAlign=middle;");
  });

  // --- TIER 2: DATA INGESTION LAYER (y: 622..724, h: 102) ---
  cell("t2_frame", "", 16, 622, 1214, 102, "rounded=1;arcSize=2;fillColor=#FFFFFF;strokeColor=#EA580C;strokeWidth=1.2;");
  cell("t2_badge", "2", 22, 628, 24, 24, "rounded=1;arcSize=4;fillColor=#EA580C;fontColor=#FFFFFF;fontSize=12;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t2_lbl", "<b style=\"font-size:9px;color:#EA580C;\">DATA INGESTION<br/>LAYER</b><br/><span style=\"font-size:7px;color:#64748B;\">Reliable • Scalable<br/>Continuous</span>", 50, 628, 95, 34, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  const ingestionNodes = [
    { n: "❶", t: "Batch Ingestion", p: "Transfer Appliance", icon: "server" },
    { n: "❷", t: "Database Ingestion", p: "Database Migration Service", icon: "database" },
    { n: "❸", t: "Streaming Ingestion", p: "Pub/Sub Lite", icon: "network" },
    { n: "❹", t: "Change Data Capture", p: "Datastream CDC", icon: "repeat" },
    { n: "❺", t: "Data Ingestion API", p: "Apigee Connect", icon: "network" },
    { n: "❻", t: "Event Ingestion", p: "Eventarc", icon: "activity" },
    { n: "❼", t: "File Ingestion", p: "Cloud Storage Transfer", icon: "cloud" }
  ];
  ingestionNodes.forEach((inNode, idx) => {
    const ix = 150 + idx * 153;
    const html = `<div style="text-align:center;padding:4px 2px;">
      <div style="display:inline-block;background:#EA580C;color:#FFFFFF;border-radius:10px;width:16px;height:16px;font-size:9px;font-weight:900;line-height:16px;margin-bottom:2px;">${inNode.n}</div>
      <div style="font-size:7.5px;font-weight:800;color:#EA580C;margin-bottom:2px;">${inNode.t}</div>
      <div style="display:flex;justify-content:center;margin-bottom:2px;">${svgIcon(inNode.icon as keyof typeof SVG, "#EA580C", 14)}</div>
      <div style="font-size:7.5px;font-weight:700;color:#0F172A;line-height:1.1;">${inNode.p}</div>
    </div>`;
    cell(`t2_c_${idx}`, html, ix, 628, 147, 90, "rounded=1;arcSize=4;fillColor=#FFF7ED;strokeColor=#FED7AA;strokeWidth=1;html=1;align=center;verticalAlign=middle;");
  });

  // --- TIER 1: DATA SOURCES LAYER (y: 730..818, h: 88) ---
  cell("t1_frame", "", 16, 730, 1214, 88, "rounded=1;arcSize=2;fillColor=#FFFFFF;strokeColor=#DC2626;strokeWidth=1.2;");
  cell("t1_badge", "1", 22, 736, 24, 24, "rounded=1;arcSize=4;fillColor=#DC2626;fontColor=#FFFFFF;fontSize=12;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t1_lbl", "<b style=\"font-size:9px;color:#DC2626;\">DATA SOURCES<br/>LAYER</b><br/><span style=\"font-size:7px;color:#64748B;\">Internal • External<br/>Diverse • Trusted</span>", 50, 736, 95, 34, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  const sourceNodes = [
    { t: "On-prem Databases", icon: "database" },
    { t: "Operational Applications", icon: "server" },
    { t: "Files / Logs Documents", icon: "fileCode" },
    { t: "IoT / Devices Sensors", icon: "activity" },
    { t: "SaaS Applications", icon: "cloud" },
    { t: "APIs (External)", icon: "network" },
    { t: "Third-party Data", icon: "layers" },
    { t: "Multi-region &amp; Zones", icon: "folder" }
  ];
  sourceNodes.forEach((sn, idx) => {
    const sx = 150 + idx * 116;
    const html = `<div style="text-align:center;padding:3px 2px;">
      <div style="display:flex;justify-content:center;margin-bottom:2px;">${svgIcon(sn.icon as keyof typeof SVG, "#DC2626", 16)}</div>
      <div style="font-size:7.5px;font-weight:700;color:#0F172A;line-height:1.1;">${sn.t}</div>
    </div>`;
    cell(`t1_s_${idx}`, html, sx, 736, 110, 76, "rounded=1;arcSize=4;fillColor=#FEF2F2;strokeColor=#FECACA;strokeWidth=1;html=1;align=center;verticalAlign=middle;");
  });

  // Global Infra Badge far right in Tier 1
  const globalInfraHtml = `<div style="font-size:7px;color:#475569;line-height:1.3;padding:2px 4px;">
    • Global Infrastructure<br/>
    • High Availability<br/>
    • Scalability<br/>
    • Sustainability
  </div>`;
  cell("t1_global_infra", globalInfraHtml, 1084, 736, 138, 76, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;html=1;align=left;verticalAlign=middle;");

  // =========================================================================
  // 3. RIGHT COLUMN: TIERS 8, 9, 10 (x: 1246..1584, w: 338)
  // =========================================================================

  // --- TIER 8: GOVERNANCE & DATA MANAGEMENT (y: 68..352, h: 284) ---
  cell("t8_frame", "", 1246, 68, 338, 284, "rounded=1;arcSize=2;fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.2;");
  cell("t8_badge", "8", 1252, 74, 24, 24, "rounded=1;arcSize=4;fillColor=#7C3AED;fontColor=#FFFFFF;fontSize=12;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t8_lbl", "<b style=\"font-size:9.5px;color:#7C3AED;\">GOVERNANCE &amp; DATA MANAGEMENT</b><br/><span style=\"font-size:7.5px;color:#64748B;\">Governed • Secure • Compliant</span>", 1282, 74, 290, 24, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  const govGrid = [
    { t: "Data Catalog", icon: "folder", r: 0, c: 0 },
    { t: "Data Lineage", icon: "network", r: 0, c: 1 },
    { t: "Data Quality", icon: "checkCircle", r: 1, c: 0 },
    { t: "Data Observability", icon: "activity", r: 1, c: 1 },
    { t: "Data Privacy", icon: "shieldCheck", r: 2, c: 0 },
    { t: "Master Data Mgmt", icon: "database", r: 2, c: 1 },
    { t: "Reference Data", icon: "layers", r: 3, c: 0 },
    { t: "Data Contracts", icon: "fileCode", r: 3, c: 1 }
  ];
  govGrid.forEach((gg, idx) => {
    const gx = 1256 + gg.c * 160;
    const gy = 104 + gg.r * 44;
    const html = `<div style="display:flex;align-items:center;gap:6px;padding:2px 4px;">
      ${svgIcon(gg.icon as keyof typeof SVG, "#7C3AED", 14)}
      <span style="font-size:8px;font-weight:700;color:#0F172A;">${gg.t}</span>
    </div>`;
    cell(`t8_g_${idx}`, html, gx, gy, 154, 38, "rounded=1;arcSize=4;fillColor=#FAF5FF;strokeColor=#DDD6FE;strokeWidth=1;html=1;align=left;verticalAlign=middle;");
  });

  // IAM & Access Management wide bottom card in Tier 8
  const iamHtml = `<div style="display:flex;align-items:center;justify-content:center;gap:8px;">
    ${svgIcon("lock", "#7C3AED", 16)}
    <b style="font-size:8.5px;color:#0F172A;">IAM &amp; Access Management</b>
  </div>`;
  cell("t8_iam", iamHtml, 1256, 286, 314, 56, "rounded=1;arcSize=4;fillColor=#F5F3FF;strokeColor=#DDD6FE;strokeWidth=1;html=1;align=center;verticalAlign=middle;");

  // --- TIER 9: OBSERVABILITY & OPERATIONS (y: 358..578, h: 220) ---
  cell("t9_frame", "", 1246, 358, 338, 220, "rounded=1;arcSize=2;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;");
  cell("t9_badge", "9", 1252, 364, 24, 24, "rounded=1;arcSize=4;fillColor=#16A34A;fontColor=#FFFFFF;fontSize=12;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t9_lbl", "<b style=\"font-size:9.5px;color:#16A34A;\">OBSERVABILITY &amp; OPERATIONS</b><br/><span style=\"font-size:7.5px;color:#64748B;\">Monitor • Optimize • Secure</span>", 1282, 364, 290, 24, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  const obsGrid = [
    { t: "Cloud Monitoring", icon: "activity", r: 0, c: 0 },
    { t: "Logging", icon: "fileCode", r: 0, c: 1 },
    { t: "Error Reporting", icon: "shieldCheck", r: 1, c: 0 },
    { t: "Cloud Trace", icon: "network", r: 1, c: 1 },
    { t: "SLO / Alerting", icon: "bell", r: 2, c: 0 },
    { t: "Audit Logs", icon: "database", r: 2, c: 1 }
  ];
  obsGrid.forEach((og, idx) => {
    const ox = 1256 + og.c * 160;
    const oy = 394 + og.r * 44;
    const html = `<div style="display:flex;align-items:center;gap:6px;padding:2px 4px;">
      ${svgIcon(og.icon as keyof typeof SVG, "#16A34A", 14)}
      <span style="font-size:8px;font-weight:700;color:#0F172A;">${og.t}</span>
    </div>`;
    cell(`t9_o_${idx}`, html, ox, oy, 154, 38, "rounded=1;arcSize=4;fillColor=#F0FDF4;strokeColor=#BBF7D0;strokeWidth=1;html=1;align=left;verticalAlign=middle;");
  });

  // Data Insights wide bottom card in Tier 9
  const insightsHtml = `<div style="display:flex;align-items:center;justify-content:center;gap:8px;">
    ${svgIcon("chart", "#16A34A", 16)}
    <b style="font-size:8.5px;color:#0F172A;">Data Insights</b>
  </div>`;
  cell("t9_insights", insightsHtml, 1256, 530, 314, 40, "rounded=1;arcSize=4;fillColor=#DCFCE7;strokeColor=#BBF7D0;strokeWidth=1;html=1;align=center;verticalAlign=middle;");

  // --- TIER 10: PLATFORM OPERATIONS (y: 584..818, h: 234) ---
  cell("t10_frame", "", 1246, 584, 338, 234, "rounded=1;arcSize=2;fillColor=#FFFFFF;strokeColor=#EA580C;strokeWidth=1.2;");
  cell("t10_badge", "10", 1252, 590, 24, 24, "rounded=1;arcSize=4;fillColor=#EA580C;fontColor=#FFFFFF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t10_lbl", "<b style=\"font-size:9.5px;color:#EA580C;\">PLATFORM OPERATIONS</b><br/><span style=\"font-size:7.5px;color:#64748B;\">Manage • Automate • Optimize</span>", 1282, 590, 290, 24, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  const opsGrid = [
    { t: "Infrastructure as Code", icon: "fileCode", r: 0, c: 0 },
    { t: "CI / CD (Cloud Build)", icon: "repeat", r: 0, c: 1 },
    { t: "Deployment Manager", icon: "settings", r: 1, c: 0 },
    { t: "Cost Management", icon: "dollar", r: 1, c: 1 },
    { t: "Capacity Management", icon: "server", r: 2, c: 0 },
    { t: "Security Command Center", icon: "shieldCheck", r: 2, c: 1 }
  ];
  opsGrid.forEach((og, idx) => {
    const ox = 1256 + og.c * 160;
    const oy = 620 + og.r * 56;
    const html = `<div style="display:flex;align-items:center;gap:6px;padding:2px 4px;">
      ${svgIcon(og.icon as keyof typeof SVG, "#EA580C", 14)}
      <span style="font-size:8px;font-weight:700;color:#0F172A;line-height:1.15;">${og.t}</span>
    </div>`;
    cell(`t10_o_${idx}`, html, ox, oy, 154, 50, "rounded=1;arcSize=4;fillColor=#FFF7ED;strokeColor=#FED7AA;strokeWidth=1;html=1;align=left;verticalAlign=middle;");
  });

  // =========================================================================
  // 4. BOTTOM FLOW LEGENDS (y: 828..878, h: 50)
  // =========================================================================

  // Left Flow Legend (x: 16..1030, w: 1014)
  cell("flow_legend_box", "", 16, 828, 1014, 50, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  const flowLegendHtml = `<div style="display:flex;align-items:center;justify-content:space-between;padding:4px 12px;">
    <b style="font-size:9px;color:#1D4ED8;letter-spacing:0.5px;">DATA FLOW LEGEND</b>
    <div style="display:flex;align-items:center;gap:12px;font-size:8px;font-weight:700;color:#0F172A;">
      <span style="display:flex;align-items:center;gap:4px;"><span style="background:#DC2626;color:#FFF;border-radius:10px;width:16px;height:16px;display:inline-flex;align-items:center;justify-content:center;font-size:9px;">1</span> Source</span>
      <span style="color:#64748B;">➔</span>
      <span style="display:flex;align-items:center;gap:4px;"><span style="background:#EA580C;color:#FFF;border-radius:10px;width:16px;height:16px;display:inline-flex;align-items:center;justify-content:center;font-size:9px;">2</span> Ingestion</span>
      <span style="color:#64748B;">➔</span>
      <span style="display:flex;align-items:center;gap:4px;"><span style="background:#D97706;color:#FFF;border-radius:10px;width:16px;height:16px;display:inline-flex;align-items:center;justify-content:center;font-size:9px;">3</span> Processing</span>
      <span style="color:#64748B;">➔</span>
      <span style="display:flex;align-items:center;gap:4px;"><span style="background:#16A34A;color:#FFF;border-radius:10px;width:16px;height:16px;display:inline-flex;align-items:center;justify-content:center;font-size:9px;">4</span> Storage</span>
      <span style="color:#64748B;">➔</span>
      <span style="display:flex;align-items:center;gap:4px;"><span style="background:#1D4ED8;color:#FFF;border-radius:10px;width:16px;height:16px;display:inline-flex;align-items:center;justify-content:center;font-size:9px;">5</span> Governance</span>
      <span style="color:#64748B;">➔</span>
      <span style="display:flex;align-items:center;gap:4px;"><span style="background:#2563EB;color:#FFF;border-radius:10px;width:16px;height:16px;display:inline-flex;align-items:center;justify-content:center;font-size:9px;">6</span> Data Products</span>
      <span style="color:#64748B;">➔</span>
      <span style="display:flex;align-items:center;gap:4px;"><span style="background:#1E40AF;color:#FFF;border-radius:10px;width:16px;height:16px;display:inline-flex;align-items:center;justify-content:center;font-size:9px;">7</span> Consumption</span>
    </div>
  </div>`;
  cell("flow_legend_content", flowLegendHtml, 16, 828, 1014, 50, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  // Right Style Legend (x: 1040..1584, w: 544)
  cell("style_legend_box", "", 1040, 828, 544, 50, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  const styleLegendHtml = `<div style="display:flex;align-items:center;justify-content:space-between;padding:4px 12px;font-size:8px;">
    <b style="color:#0F172A;">LEGEND</b>
    <span style="display:flex;align-items:center;gap:4px;"><span style="width:16px;height:2px;background:#2563EB;border-top:1px dashed #2563EB;display:inline-block;"></span> Data Flow</span>
    <span style="display:flex;align-items:center;gap:4px;"><span style="width:16px;height:2px;background:#16A34A;border-top:1px dashed #16A34A;display:inline-block;"></span> Metadata / Control Flow</span>
    <span style="display:flex;align-items:center;gap:4px;"><span style="width:16px;height:2px;background:#0F172A;display:inline-block;"></span> Governance / Security</span>
  </div>`;
  cell("style_legend_content", styleLegendHtml, 1040, 828, 544, 50, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  // =========================================================================
  // 5. INTER-TIER CONNECTING FLOW ARROWS
  // =========================================================================
  // Tier 1 -> Tier 2 (Upward arrows from Ingress to Ingestion)
  [223, 376, 529, 682, 835, 988].forEach((x, idx) => {
    rawEdge(`e_t1_t2_${idx}`, "edgeStyle=none;strokeColor=#EA580C;strokeWidth=1.5;endArrow=classic;endSize=4;", [
      { x, y: 730 },
      { x, y: 724 }
    ]);
  });

  // Tier 2 -> Tier 3 (Upward arrows from Ingestion to Processing)
  [237, 416, 595, 774, 953, 1132].forEach((x, idx) => {
    rawEdge(`e_t2_t3_${idx}`, "edgeStyle=none;strokeColor=#D97706;strokeWidth=1.5;endArrow=classic;endSize=4;", [
      { x, y: 622 },
      { x, y: 616 }
    ]);
  });

  // Tier 3 -> Tier 4 (Upward arrows from Processing to Storage)
  [235, 480, 725, 970].forEach((x, idx) => {
    rawEdge(`e_t3_t4_${idx}`, "edgeStyle=none;strokeColor=#16A34A;strokeWidth=1.5;endArrow=classic;endSize=4;", [
      { x, y: 514 },
      { x, y: 508 }
    ]);
  });

  // Tier 4 -> Tier 5 (Upward arrows from Storage to Governance)
  [235, 568, 869].forEach((x, idx) => {
    rawEdge(`e_t4_t5_${idx}`, "edgeStyle=none;strokeColor=#2563EB;strokeWidth=1.5;endArrow=classic;endSize=4;", [
      { x, y: 400 },
      { x, y: 394 }
    ]);
  });

  // Tier 5 -> Tier 6 (Upward arrows from Governance to Data Products)
  [226, 379, 532, 685, 838, 991, 1144].forEach((x, idx) => {
    rawEdge(`e_t5_t6_${idx}`, "edgeStyle=none;strokeColor=#2563EB;strokeWidth=1.5;endArrow=classic;endSize=4;", [
      { x, y: 292 },
      { x, y: 286 }
    ]);
  });

  // Tier 6 -> Tier 7 (Upward arrows from Data Products to Consumption)
  [221, 369, 517, 665, 813, 961].forEach((x, idx) => {
    rawEdge(`e_t6_t7_${idx}`, "edgeStyle=none;strokeColor=#2563EB;strokeWidth=1.5;endArrow=classic;endSize=4;", [
      { x, y: 178 },
      { x, y: 172 }
    ]);
  });

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_42" name="Modern Data Lakehouse &amp; Data Mesh">
    <mxGraphModel dx="1600" dy="980" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="980" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${c.join("\n        ")}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
