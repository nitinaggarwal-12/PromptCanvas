const escapeXml = (v?: string | null) =>
  (v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const SVG = {
  user: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  users: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  leaf: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>`,
  activity: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  database: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
  shield: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  shieldCheck: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>`,
  cpu: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9"/><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M20 9h3"/><path d="M20 14h3"/><path d="M1 9h3"/><path d="M1 14h3"/></svg>`,
  network: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="6" height="6" x="16" y="16" rx="1"/><rect width="6" height="6" x="2" y="16" rx="1"/><rect width="6" height="6" x="9" y="2" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M12 12V8"/></svg>`,
  cloud: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>`,
  lock: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  sparkles: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>`,
  zap: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  fileCode: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><polyline points="10 13 8 15 10 17"/><polyline points="14 13 16 15 14 17"/></svg>`,
  chart: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/></svg>`,
  globe: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  repeat: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/></svg>`,
  checkCircle: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  settings: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  droplet: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`,
  layers: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`
};

function svgIcon(name: keyof typeof SVG, color: string = "#1E293B", size: number = 14): string {
  const icon = SVG[name] || SVG.leaf;
  return icon
    .replace('width="24"', `width="${size}"`)
    .replace('height="24"', `height="${size}"`)
    .replace(/currentColor/g, color);
}

export function generateTemplate50SustainabilityEsgPlatformXml(
  _flavor: string = "biopharma",
  _theme: "light" | "dark" = "light"
): string {
  const c: string[] = [];

  const cell = (
    id: string,
    value: string,
    x: number,
    y: number,
    w: number,
    h: number,
    style: string,
    parent: string = "1"
  ) => {
    c.push(
      `<mxCell id="${id}" value="${escapeXml(value)}" style="${style}" vertex="1" parent="${parent}"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`
    );
  };

  const rawEdge = (
    id: string,
    style: string,
    pts: { x: number; y: number }[]
  ) => {
    let ptsXml = "";
    if (pts.length > 2) {
      ptsXml = `<Array as="points">${pts.slice(1, -1).map((p) => `<mxPoint x="${p.x}" y="${p.y}"/>`).join("")}</Array>`;
    }
    c.push(
      `<mxCell id="${id}" edge="1" parent="1" style="${style}"><mxGeometry relative="1" as="geometry"><mxPoint x="${pts[0].x}" y="${pts[0].y}" as="sourcePoint"/><mxPoint x="${pts[pts.length - 1].x}" y="${pts[pts.length - 1].y}" as="targetPoint"/>${ptsXml}</mxGeometry></mxCell>`
    );
  };

  // =========================================================================
  // 1. TOP HEADER BANNER (y: 12..64)
  // =========================================================================
  cell("hdr_num", "50", 16, 12, 54, 48, "shape=rectangle;rounded=1;arcSize=14;fillColor=#0F766E;strokeColor=#0F766E;fontColor=#FFFFFF;fontSize=26;fontStyle=1;align=center;verticalAlign=middle;");

  const titleHtml = `<div style="font-size:19px;font-weight:900;color:#0F172A;letter-spacing:0.5px;">SUSTAINABILITY &amp; ESG INTELLIGENCE PLATFORM</div>
    <div style="font-size:10.5px;color:#475569;font-weight:600;margin-top:3px;">Measure • Report • Reduce • Comply • Innovate</div>`;
  cell("hdr_title", titleHtml, 78, 12, 850, 48, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  const brandHtml = `<div style="display:flex;align-items:center;justify-content:flex-end;gap:10px;">
    <div style="display:flex;align-items:center;gap:6px;">
      <svg width="24" height="20" viewBox="0 0 24 24" fill="none"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" fill="#4285F4"/></svg>
      <span style="font-size:17px;font-weight:900;color:#1E293B;letter-spacing:0.3px;"><span style="color:#4285F4;">G</span><span style="color:#EA4335;">o</span><span style="color:#FBBC05;">o</span><span style="color:#4285F4;">g</span><span style="color:#34A853;">l</span><span style="color:#EA4335;">e</span> Cloud</span>
    </div>
    <div style="width:1px;height:24px;background:#CBD5E1;"></div>
    <div style="text-align:left;">
      <div style="font-size:9px;color:#64748B;font-weight:700;line-height:1.1;">Reference Architecture</div>
      <div style="font-size:9px;color:#64748B;font-weight:700;line-height:1.1;">v2.0</div>
    </div>
  </div>`;
  cell("hdr_brand", brandHtml, 1220, 12, 300, 48, "text;html=1;strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

  // =========================================================================
  // 2. MAIN CENTER COLUMN - TIERS 7, 6, 5, 4, 3, 2, 1, 0 (x: 16, w: 1140)
  // =========================================================================

  // -------------------------------------------------------------------------
  // TIER 7: ENGAGEMENT & IMPACT LAYER (y: 68, h: 86)
  // -------------------------------------------------------------------------
  cell("t7_frame", "", 16, 68, 1140, 86, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("t7_badge", "7", 24, 74, 22, 22, "rounded=1;arcSize=6;fillColor=#7C3AED;fontColor=#FFFFFF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t7_lbl", `<b style="font-size:7.5px;color:#7C3AED;">ENGAGEMENT &amp; IMPACT<br/>LAYER</b><br/><span style="font-size:6.5px;color:#64748B;line-height:1.1;">Engage • Disclose • Act<br/>Influence • Improve</span>`, 50, 74, 110, 32, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  const t7Cards = [
    { title: "Stakeholder Engagement", items: [["Investor Portal", "Customer Portal"], ["Community Engagement", "Employee Engagement"]] },
    { title: "ESG &amp; Impact Dashboards", items: [["Executive ESG View", "KPI Dashboards"], ["Geo-spatial Insights", "Scorecards"]] },
    { title: "Disclosures &amp; Reporting", items: [["Sustainability Reports", "Regulatory Filings"], ["Framework Mapping", "Assurance Packages"]] },
    { title: "Action &amp; Collaboration", items: [["Initiatives Tracker", "Workflow Approvals"], ["Comments & Notes", "Knowledge Hub"]] }
  ];

  t7Cards.forEach((cItem, i) => {
    const cx = 166 + i * 248;
    cell(`t7_c_${i}`, "", cx, 74, 240, 56, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;");
    cell(`t7_ch_${i}`, `<b style="font-size:7.5px;color:#0F172A;">${cItem.title}</b>`, cx + 4, 76, 232, 12, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
    cItem.items.forEach((row, rIdx) => {
      const colW = (240 - 16) / row.length;
      row.forEach((it, cIdx) => {
        const ix = cx + 8 + cIdx * colW;
        const iy = 90 + rIdx * 17;
        cell(`t7_ci_${i}_${rIdx}_${cIdx}`, `<div style="font-size:6.5px;background:#FAF5FF;color:#6B21A8;padding:1px 2px;border-radius:3px;border:1px solid #E9D5FF;font-weight:700;text-align:center;">${it}</div>`, ix, iy, colW - 4, 14, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
      });
    });
  });

  // Tier 7 Sub-strip
  cell("t7_strip", "", 166, 134, 984, 16, "rounded=1;arcSize=6;fillColor=#FAF5FF;strokeColor=#E9D5FF;strokeWidth=1;");
  const t7Pills = "Multi-tenant Experience • White-label &amp; Branding • APIs &amp; Embeddables • Alerts &amp; Subscriptions • Mobile &amp; Offline Access";
  cell("t7_strip_txt", `<div style="font-size:7px;font-weight:700;color:#6B21A8;text-align:center;">${t7Pills}</div>`, 166, 134, 984, 16, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // -------------------------------------------------------------------------
  // TIER 6: ANALYTICS & INTELLIGENCE LAYER (y: 156, h: 96)
  // -------------------------------------------------------------------------
  cell("t6_frame", "", 16, 156, 1140, 96, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("t6_badge", "6", 24, 162, 22, 22, "rounded=1;arcSize=6;fillColor=#1D4ED8;fontColor=#FFFFFF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t6_lbl", `<b style="font-size:7.5px;color:#1D4ED8;">ANALYTICS &amp; INTELLIGENCE<br/>LAYER</b><br/><span style="font-size:6.5px;color:#64748B;line-height:1.1;">Analyze • Model • Predict<br/>Optimize • Recommend</span>`, 50, 162, 110, 32, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  const t6Cards = [
    { title: "ESG Analytics", desc: "Trend Analysis • Benchmarking<br/>Gap Analysis • Scenario Analysis", icon: "chart" },
    { title: "Carbon Intelligence", desc: "Emissions Analytics • Hotspots<br/>Reduction Pathways • Marginal Cost", icon: "leaf" },
    { title: "AI &amp; ML Insights", desc: "Anomaly Detection • Forecasting<br/>Recommendations • Impact Quant", icon: "sparkles" },
    { title: "Optimization &amp; Planning", desc: "Net Zero Planning • Resource Opt<br/>Supply Chain • Cost vs Impact", icon: "target" }
  ];

  t6Cards.forEach((cItem, i) => {
    const cx = 166 + i * 248;
    cell(`t6_c_${i}`, "", cx, 162, 240, 60, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;");
    const ic = svgIcon(cItem.icon as keyof typeof SVG, "#1D4ED8", 12);
    cell(`t6_ch_${i}`, `<div style="display:flex;align-items:center;gap:4px;">${ic}<b style="font-size:7.5px;color:#0F172A;">${cItem.title}</b></div>`, cx + 4, 164, 232, 14, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
    cell(`t6_cb_${i}`, `<div style="font-size:6.5px;color:#475569;line-height:1.2;padding-top:2px;">${cItem.desc}</div>`, cx + 6, 180, 228, 38, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");
  });

  // Tier 6 Sub-strip
  cell("t6_strip", "", 166, 226, 984, 18, "rounded=1;arcSize=6;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1;");
  const t6Pills = "Vertex AI • BigQuery ML • AI Notebooks • Feature Store • Model Registry • MLOps";
  cell("t6_strip_txt", `<div style="font-size:7px;font-weight:700;color:#1E40AF;text-align:center;">${t6Pills}</div>`, 166, 226, 984, 18, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // -------------------------------------------------------------------------
  // TIER 5: DATA INTEGRATION & PROCESSING LAYER (y: 254, h: 96)
  // -------------------------------------------------------------------------
  cell("t5_frame", "", 16, 254, 1140, 96, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("t5_badge", "5", 24, 260, 22, 22, "rounded=1;arcSize=6;fillColor=#0284C7;fontColor=#FFFFFF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t5_lbl", `<b style="font-size:7.5px;color:#0284C7;">DATA INTEGRATION &amp;<br/>PROCESSING LAYER</b><br/><span style="font-size:6.5px;color:#64748B;line-height:1.1;">Ingest • Validate • Enrich<br/>Calculate • Aggregate</span>`, 50, 260, 110, 32, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  const t5Cards = [
    { title: "Data Ingestion", desc: "Batch • Streaming<br/>API Ingestion • File Upload", icon: "repeat" },
    { title: "Data Processing", desc: "ETL/ELT • Data Quality<br/>De-duplication • Standardization", icon: "cpu" },
    { title: "Calculations Engine", desc: "Emissions Calc • Factor Mgmt<br/>Unit Conversions • Allocation", icon: "chart" },
    { title: "Enrichment &amp; Mapping", desc: "Activity Mapping • Entity Res<br/>Geo-coding • Classification", icon: "network" },
    { title: "Data Catalog &amp; Metadata", desc: "Business Glossary • Lineage<br/>Metadata Catalog • Impact Tags", icon: "database" }
  ];

  t5Cards.forEach((cItem, i) => {
    const cx = 166 + i * 196;
    cell(`t5_c_${i}`, "", cx, 260, 190, 60, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;");
    const ic = svgIcon(cItem.icon as keyof typeof SVG, "#0284C7", 12);
    cell(`t5_ch_${i}`, `<div style="display:flex;align-items:center;gap:4px;">${ic}<b style="font-size:7.5px;color:#0F172A;">${cItem.title}</b></div>`, cx + 4, 262, 182, 14, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
    cell(`t5_cb_${i}`, `<div style="font-size:6.5px;color:#475569;line-height:1.2;padding-top:2px;">${cItem.desc}</div>`, cx + 6, 278, 178, 38, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");
  });

  // Tier 5 Sub-strip
  cell("t5_strip", "", 166, 324, 984, 18, "rounded=1;arcSize=6;fillColor=#E0F2FE;strokeColor=#BAE6FD;strokeWidth=1;");
  const t5Pills = "Pub/Sub • Dataflow • Dataproc • Cloud Functions • Dataplex • Dataform • Data Quality • Workflows";
  cell("t5_strip_txt", `<div style="font-size:7px;font-weight:700;color:#0369A1;text-align:center;">${t5Pills}</div>`, 166, 324, 984, 18, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // -------------------------------------------------------------------------
  // TIER 4: ESG DATA MODEL & GOVERNANCE LAYER (y: 352, h: 96)
  // -------------------------------------------------------------------------
  cell("t4_frame", "", 16, 352, 1140, 96, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("t4_badge", "4", 24, 358, 22, 22, "rounded=1;arcSize=6;fillColor=#059669;fontColor=#FFFFFF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t4_lbl", `<b style="font-size:7.5px;color:#059669;">ESG DATA MODEL &amp;<br/>GOVERNANCE LAYER</b><br/><span style="font-size:6.5px;color:#64748B;line-height:1.1;">Standardize • Govern • Secure<br/>Lineage • Quality</span>`, 50, 358, 110, 32, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  const t4Cards = [
    { title: "ESG Data Model", desc: "Environment • Social<br/>Governance • Economic", icon: "database" },
    { title: "Standards &amp; Frameworks", desc: "GRI • SASB • TCFD<br/>CDP • ISSB • EU Taxonomy", icon: "fileCode" },
    { title: "Master Data Mgmt", desc: "Organizations • Facilities<br/>Products • Suppliers", icon: "layers" },
    { title: "Data Governance", desc: "Policies • Ownership<br/>Stewardship • Data Contracts", icon: "shieldCheck" },
    { title: "Data Quality &amp; Lineage", desc: "DQ Rules • Scorecards<br/>Lineage Graph • Observability", icon: "activity" }
  ];

  t4Cards.forEach((cItem, i) => {
    const cx = 166 + i * 196;
    cell(`t4_c_${i}`, "", cx, 358, 190, 60, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;");
    const ic = svgIcon(cItem.icon as keyof typeof SVG, "#059669", 12);
    cell(`t4_ch_${i}`, `<div style="display:flex;align-items:center;gap:4px;">${ic}<b style="font-size:7.5px;color:#0F172A;">${cItem.title}</b></div>`, cx + 4, 360, 182, 14, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
    cell(`t4_cb_${i}`, `<div style="font-size:6.5px;color:#475569;line-height:1.2;padding-top:2px;">${cItem.desc}</div>`, cx + 6, 376, 178, 38, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");
  });

  // Tier 4 Sub-strip
  cell("t4_strip", "", 166, 422, 984, 18, "rounded=1;arcSize=6;fillColor=#F0FDF4;strokeColor=#BBF7D0;strokeWidth=1;");
  const t4Pills = "Data Governance Council • Policy Automation • Data Contracts • Access Control (Row/Column) • Data Lineage";
  cell("t4_strip_txt", `<div style="font-size:7px;font-weight:700;color:#166534;text-align:center;">${t4Pills}</div>`, 166, 422, 984, 18, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // -------------------------------------------------------------------------
  // TIER 3: SUSTAINABILITY DOMAIN LAYER (y: 450, h: 96)
  // -------------------------------------------------------------------------
  cell("t3_frame", "", 16, 450, 1140, 96, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("t3_badge", "3", 24, 456, 22, 22, "rounded=1;arcSize=6;fillColor=#0F766E;fontColor=#FFFFFF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t3_lbl", `<b style="font-size:7.5px;color:#0F766E;">SUSTAINABILITY DOMAIN<br/>LAYER</b><br/><span style="font-size:6.5px;color:#64748B;line-height:1.1;">Capture • Measure • Monitor<br/>Assess • Target</span>`, 50, 456, 110, 32, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  const t3Cards = [
    { title: "Environmental", desc: "GHG Emissions (Scope 1/2/3)<br/>Energy • Water • Waste • Biodiversity", icon: "leaf" },
    { title: "Social", desc: "Diversity &amp; Inclusion • Health &amp; Safety<br/>Community Impact • Human Rights", icon: "users" },
    { title: "Governance", desc: "Board Diversity • Ethics &amp; Compliance<br/>Risk Management • Data Privacy", icon: "shield" },
    { title: "Economic &amp; Resilience", desc: "Economic Value • Tax Transparency<br/>Resilience • Supply Chain Resp", icon: "chart" }
  ];

  t3Cards.forEach((cItem, i) => {
    const cx = 166 + i * 248;
    cell(`t3_c_${i}`, "", cx, 456, 240, 60, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;");
    const ic = svgIcon(cItem.icon as keyof typeof SVG, "#0F766E", 12);
    cell(`t3_ch_${i}`, `<div style="display:flex;align-items:center;gap:4px;">${ic}<b style="font-size:7.5px;color:#0F172A;">${cItem.title}</b></div>`, cx + 4, 458, 232, 14, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
    cell(`t3_cb_${i}`, `<div style="font-size:6.5px;color:#475569;line-height:1.2;padding-top:2px;">${cItem.desc}</div>`, cx + 6, 474, 228, 38, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");
  });

  // Tier 3 Sub-strip
  cell("t3_strip", "", 166, 520, 984, 18, "rounded=1;arcSize=6;fillColor=#CCFBF1;strokeColor=#99F6E4;strokeWidth=1;");
  const t3Pills = "KPIs &amp; Metrics Library • Targets &amp; Goals • Materiality Assessment • Double Materiality • Initiatives Management";
  cell("t3_strip_txt", `<div style="font-size:7px;font-weight:700;color:#115E59;text-align:center;">${t3Pills}</div>`, 166, 520, 984, 18, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // -------------------------------------------------------------------------
  // TIER 2: DATA SOURCES & CONNECTIVITY LAYER (y: 548, h: 84)
  // -------------------------------------------------------------------------
  cell("t2_frame", "", 16, 548, 1140, 84, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("t2_badge", "2", 24, 554, 22, 22, "rounded=1;arcSize=6;fillColor=#D97706;fontColor=#FFFFFF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t2_lbl", `<b style="font-size:7.5px;color:#D97706;">DATA SOURCES &amp;<br/>CONNECTIVITY LAYER</b><br/><span style="font-size:6.5px;color:#64748B;line-height:1.1;">Connect • Collect • Stream<br/>Integrate • Sync</span>`, 50, 554, 110, 32, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  const t2Cards = [
    { title: "Enterprise Systems", desc: "ERP • Finance • HR<br/>EHS • PLM", icon: "database" },
    { title: "Operational (OT/IoT)", desc: "Sensors • Meters<br/>SCADA • BMS • Telematics", icon: "activity" },
    { title: "Supply Chain &amp; 3rd Party", desc: "Suppliers • Logistics<br/>Procurement • Partners", icon: "users" },
    { title: "External Data", desc: "Weather • Grid Mix<br/>Economic • Regulatory • Sat", icon: "globe" },
    { title: "Docs &amp; Submissions", desc: "Reports • Invoices<br/>Certificates • Surveys", icon: "fileCode" }
  ];

  t2Cards.forEach((cItem, i) => {
    const cx = 166 + i * 196;
    cell(`t2_c_${i}`, "", cx, 554, 190, 50, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;");
    const ic = svgIcon(cItem.icon as keyof typeof SVG, "#D97706", 12);
    cell(`t2_ch_${i}`, `<div style="display:flex;align-items:center;gap:4px;">${ic}<b style="font-size:7.5px;color:#0F172A;">${cItem.title}</b></div>`, cx + 4, 556, 182, 14, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
    cell(`t2_cb_${i}`, `<div style="font-size:6.5px;color:#475569;line-height:1.2;padding-top:2px;">${cItem.desc}</div>`, cx + 6, 572, 178, 30, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");
  });

  // Tier 2 Sub-strip
  cell("t2_strip", "", 166, 608, 984, 18, "rounded=1;arcSize=6;fillColor=#FEF3C7;strokeColor=#FDE68A;strokeWidth=1;");
  const t2Pills = "Connectors (SAP, Oracle, Salesforce, Workday, ServiceNow, etc.) • APIs • SFTP/FTPS • IoT Gateways • Manual Upload • EDI";
  cell("t2_strip_txt", `<div style="font-size:7px;font-weight:700;color:#92400E;text-align:center;">${t2Pills}</div>`, 166, 608, 984, 18, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // -------------------------------------------------------------------------
  // TIER 1: INFRASTRUCTURE LAYER (y: 634, h: 64)
  // -------------------------------------------------------------------------
  cell("t1_frame", "", 16, 634, 1140, 64, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("t1_badge", "1", 24, 640, 22, 22, "rounded=1;arcSize=6;fillColor=#EA580C;fontColor=#FFFFFF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t1_lbl", `<b style="font-size:7.5px;color:#EA580C;">INFRASTRUCTURE LAYER</b><br/><span style="font-size:6.5px;color:#64748B;line-height:1.1;">Compute • Storage • Network<br/>Secure • Scalable</span>`, 50, 640, 110, 32, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  const t1Categories = [
    { title: "Compute", desc: "GKE • Cloud Run • Compute Engine • Functions", icon: "cpu" },
    { title: "Storage", desc: "Cloud Storage • BigQuery • Cloud SQL • AlloyDB", icon: "database" },
    { title: "Analytics Engine", desc: "BigQuery • Databricks (GCP) • Vertex AI • Data Studio", icon: "chart" },
    { title: "Networking", desc: "VPC • Cloud NAT • Cloud VPN • Interconnect", icon: "network" },
    { title: "Security", desc: "IAM • KMS • Secret Manager • Cloud Armor", icon: "shieldCheck" }
  ];

  t1Categories.forEach((cat, i) => {
    const cx = 166 + i * 196;
    cell(`t1_c_${i}`, "", cx, 640, 190, 52, "rounded=1;arcSize=4;fillColor=#FFF7ED;strokeColor=#FFEDD5;strokeWidth=1;");
    const ic = svgIcon(cat.icon as keyof typeof SVG, "#EA580C", 11);
    cell(`t1_ch_${i}`, `<div style="display:flex;align-items:center;gap:3px;">${ic}<b style="font-size:7.5px;color:#9A3412;">${cat.title}</b></div>`, cx + 4, 642, 182, 14, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
    cell(`t1_cb_${i}`, `<div style="font-size:6.5px;color:#475569;line-height:1.2;padding-top:2px;">${cat.desc}</div>`, cx + 6, 658, 178, 30, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");
  });

  // -------------------------------------------------------------------------
  // TIER 0: GOOGLE CLOUD FOUNDATION (y: 700, h: 64)
  // -------------------------------------------------------------------------
  cell("t0_frame", "", 16, 700, 1140, 64, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("t0_badge", "0", 24, 706, 22, 22, "rounded=1;arcSize=6;fillColor=#DC2626;fontColor=#FFFFFF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t0_lbl", `<b style="font-size:7.5px;color:#DC2626;">GOOGLE CLOUD FOUNDATION</b><br/><span style="font-size:6.5px;color:#64748B;line-height:1.1;">Secure • Reliable • Sustainable<br/>Global • Compliant</span>`, 50, 706, 110, 32, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  const t0Infra = [
    { title: "Global<br/>Infrastructure", icon: "globe" },
    { title: "Regions &amp;<br/>Zones", icon: "layers" },
    { title: "Identity &amp; Access<br/>Management", icon: "user" },
    { title: "Security Command<br/>Center", icon: "shield" },
    { title: "Compliance<br/>Center", icon: "shieldCheck" },
    { title: "Sustainability<br/>(CO2 Aware)", icon: "leaf" },
    { title: "Cloud Audit<br/>Logs", icon: "fileCode" },
    { title: "Continuous<br/>Compliance", icon: "checkCircle" }
  ];

  t0Infra.forEach((inf, i) => {
    const ix = 166 + i * 122;
    cell(`t0_i_${i}`, "", ix, 706, 118, 52, "rounded=1;arcSize=4;fillColor=#FEF2F2;strokeColor=#FECACA;strokeWidth=1;");
    const ic = svgIcon(inf.icon as keyof typeof SVG, "#DC2626", 11);
    cell(`t0_it_${i}`, `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;">${ic}<div style="font-size:6.5px;font-weight:700;color:#991B1B;text-align:center;line-height:1.1;">${inf.title}</div></div>`, ix, 706, 118, 52, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  });

  // =========================================================================
  // 3. RIGHT SIDEBAR (x: 1166, w: 354)
  // =========================================================================

  // -------------------------------------------------------------------------
  // TIER 8: GOVERNANCE, RISK & COMPLIANCE (y: 68, h: 220)
  // -------------------------------------------------------------------------
  cell("t8_frame", "", 1166, 68, 354, 220, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("t8_badge", "8", 1174, 74, 22, 22, "rounded=1;arcSize=6;fillColor=#7C3AED;fontColor=#FFFFFF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t8_lbl", `<b style="font-size:8.5px;color:#7C3AED;">GOVERNANCE, RISK &amp; COMPLIANCE</b><br/><span style="font-size:7px;color:#64748B;">Governed • Transparent • Accountable</span>`, 1202, 74, 308, 22, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  const t8Items = [
    { title: "ESG Policy<br/>Management", icon: "shield" },
    { title: "Regulatory<br/>Compliance", icon: "fileCode" },
    { title: "Risk Assessment<br/>&amp; Analysis", icon: "activity" },
    { title: "Controls<br/>Management", icon: "settings" },
    { title: "Audit &amp; Assurance<br/>Management", icon: "shieldCheck" },
    { title: "Third-Party Risk<br/>Management", icon: "users" },
    { title: "Data Privacy &amp;<br/>Consent", icon: "lock" },
    { title: "Ethics &amp; Integrity<br/>Management", icon: "sparkles" },
    { title: "Whistleblower<br/>Management", icon: "bell" }
  ];

  t8Items.forEach((it, i) => {
    const rx = 1174 + (i % 3) * 112;
    const ry = 100 + Math.floor(i / 3) * 40;
    cell(`t8_item_${i}`, "", rx, ry, 106, 36, "rounded=1;arcSize=4;fillColor=#FAF5FF;strokeColor=#E9D5FF;strokeWidth=1;");
    const ic = svgIcon(it.icon as keyof typeof SVG, "#7C3AED", 11);
    cell(`t8_item_txt_${i}`, `<div style="display:flex;align-items:center;gap:3px;">${ic}<div style="font-size:6.5px;font-weight:700;color:#6B21A8;line-height:1.15;">${it.title}</div></div>`, rx + 3, ry + 2, 100, 32, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  });

  // GRC Dashboard Pod
  cell("t8_dash", "", 1174, 238, 338, 38, "rounded=1;arcSize=4;fillColor=#F3E8FF;strokeColor=#D8B4FE;strokeWidth=1;");
  const grcIc = svgIcon("chart", "#7C3AED", 14);
  cell("t8_dash_txt", `<div style="display:flex;align-items:center;justify-content:center;gap:6px;">${grcIc}<b style="font-size:8px;color:#581C87;">GRC Dashboard</b></div>`, 1174, 238, 338, 38, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // -------------------------------------------------------------------------
  // TIER 9: OBSERVABILITY & ASSURANCE (y: 294, h: 226)
  // -------------------------------------------------------------------------
  cell("t9_frame", "", 1166, 294, 354, 226, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("t9_badge", "9", 1174, 300, 22, 22, "rounded=1;arcSize=6;fillColor=#059669;fontColor=#FFFFFF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t9_lbl", `<b style="font-size:8.5px;color:#059669;">OBSERVABILITY &amp; ASSURANCE</b><br/><span style="font-size:7px;color:#64748B;">Observe • Detect • Assure</span>`, 1202, 300, 308, 22, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  const t9Items = [
    { title: "Data Quality<br/>Monitoring", icon: "database" },
    { title: "Metric<br/>Monitoring", icon: "activity" },
    { title: "Anomaly<br/>Detection", icon: "zap" },
    { title: "Carbon Data<br/>Verification", icon: "leaf" },
    { title: "Alerting &amp;<br/>Notifications", icon: "bell" },
    { title: "SLA / SLO<br/>Monitoring", icon: "checkCircle" },
    { title: "Incident<br/>Management", icon: "settings" },
    { title: "Audit Trail &amp;<br/>Logs", icon: "fileCode" },
    { title: "Root Cause<br/>Analysis", icon: "chart" }
  ];

  t9Items.forEach((it, i) => {
    const rx = 1174 + (i % 3) * 112;
    const ry = 328 + Math.floor(i / 3) * 42;
    cell(`t9_item_${i}`, "", rx, ry, 106, 38, "rounded=1;arcSize=4;fillColor=#F0FDF4;strokeColor=#BBF7D0;strokeWidth=1;");
    const ic = svgIcon(it.icon as keyof typeof SVG, "#059669", 11);
    cell(`t9_item_txt_${i}`, `<div style="display:flex;align-items:center;gap:3px;">${ic}<div style="font-size:6.5px;font-weight:700;color:#065F46;line-height:1.15;">${it.title}</div></div>`, rx + 3, ry + 2, 100, 34, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  });

  // Observability Dashboard Pod
  cell("t9_dash", "", 1174, 468, 338, 42, "rounded=1;arcSize=4;fillColor=#DCFCE7;strokeColor=#86EFAC;strokeWidth=1;");
  const obsIc = svgIcon("chart", "#059669", 14);
  cell("t9_dash_txt", `<div style="display:flex;align-items:center;justify-content:center;gap:6px;">${obsIc}<b style="font-size:8px;color:#14532D;">Observability Dashboard</b></div>`, 1174, 468, 338, 42, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // -------------------------------------------------------------------------
  // TIER 10: PLATFORM OPERATIONS (y: 526, h: 154)
  // -------------------------------------------------------------------------
  cell("t10_frame", "", 1166, 526, 354, 154, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("t10_badge", "10", 1174, 532, 22, 22, "rounded=1;arcSize=6;fillColor=#EA580C;fontColor=#FFFFFF;fontSize=10;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t10_lbl", `<b style="font-size:8.5px;color:#EA580C;">PLATFORM OPERATIONS</b><br/><span style="font-size:7px;color:#64748B;">Operate • Optimize • Evolve</span>`, 1202, 532, 308, 22, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  const t10Items = [
    { title: "Release &amp; Change<br/>Management", icon: "zap" },
    { title: "Capacity &amp; Cost<br/>Optimization", icon: "chart" },
    { title: "Performance<br/>Monitoring", icon: "activity" },
    { title: "Backup &amp; DR<br/>Management", icon: "database" },
    { title: "FinOps", icon: "chart" },
    { title: "Patch &amp; Vulnerability<br/>Management", icon: "shieldCheck" }
  ];

  t10Items.forEach((it, i) => {
    const rx = 1174 + (i % 3) * 112;
    const ry = 558 + Math.floor(i / 3) * 38;
    cell(`t10_item_${i}`, "", rx, ry, 106, 34, "rounded=1;arcSize=4;fillColor=#FFF7ED;strokeColor=#FFEDD5;strokeWidth=1;");
    const ic = svgIcon(it.icon as keyof typeof SVG, "#EA580C", 11);
    cell(`t10_item_txt_${i}`, `<div style="display:flex;align-items:center;gap:3px;">${ic}<div style="font-size:6.5px;font-weight:700;color:#9A3412;line-height:1.15;">${it.title}</div></div>`, rx + 3, ry + 2, 100, 30, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  });

  // Continuous Improvement Pod
  cell("t10_ci", "", 1174, 638, 338, 32, "rounded=1;arcSize=4;fillColor=#FFEDD5;strokeColor=#FDBA74;strokeWidth=1;");
  const ciIc = svgIcon("repeat", "#EA580C", 13);
  cell("t10_ci_txt", `<div style="display:flex;align-items:center;justify-content:center;gap:6px;">${ciIc}<b style="font-size:7.5px;color:#7C2D12;">Continuous Improvement &amp; Feedback Loop</b></div>`, 1174, 638, 338, 32, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // -------------------------------------------------------------------------
  // BUSINESS OUTCOMES (y: 686, h: 78)
  // -------------------------------------------------------------------------
  cell("outcomes_frame", "", 1166, 686, 354, 78, "rounded=1;arcSize=3;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;");
  cell("outcomes_hdr", `<b style="font-size:8px;color:#0F766E;">BUSINESS OUTCOMES</b>`, 1176, 690, 200, 14, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  const outcomeList = [
    "Accurate, trusted &amp; auditable ESG data",
    "Faster reporting across frameworks",
    "Data-driven decisions &amp; risk mitigation",
    "Operational efficiency &amp; cost savings",
    "Reduced emissions &amp; environmental impact",
    "Stronger stakeholder trust &amp; brand value"
  ];
  const outcomesHtml = outcomeList.map(o => `<div style="display:flex;align-items:center;gap:4px;font-size:6.5px;color:#334155;line-height:1.1;"><span style="color:#0F766E;">✓</span> ${o}</div>`).join("");
  cell("outcomes_txt", outcomesHtml, 1176, 704, 250, 58, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  const targetSvg = `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0F766E" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`;
  cell("outcomes_icon", targetSvg, 1456, 704, 40, 40, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // =========================================================================
  // 4. FOOTER REGION (y: 770, h: 104)
  // =========================================================================

  // Box 1: DATA FLOW LEGEND (x: 16, w: 230)
  cell("ft_legend_box", "", 16, 770, 230, 104, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("ft_legend_hdr", `<b style="font-size:8px;color:#1E293B;">DATA FLOW LEGEND</b>`, 24, 774, 200, 16, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  const legendHtml = `
    <div style="padding-top:4px;display:flex;flex-direction:column;gap:5px;">
      <div style="display:flex;align-items:center;gap:6px;"><span style="color:#2563EB;font-weight:bold;">╌╌▶</span> <span style="font-size:6.5px;color:#334155;">Data Flow (Batch)</span></div>
      <div style="display:flex;align-items:center;gap:6px;"><span style="color:#059669;font-weight:bold;">╌╌▶</span> <span style="font-size:6.5px;color:#334155;">Data Flow (Real-time)</span></div>
      <div style="display:flex;align-items:center;gap:6px;"><span style="color:#7C3AED;font-weight:bold;">━━▶</span> <span style="font-size:6.5px;color:#334155;">External Data / Exchange</span></div>
      <div style="display:flex;align-items:center;gap:6px;"><span style="color:#EA580C;font-weight:bold;">━━▶</span> <span style="font-size:6.5px;color:#334155;">Insights / Actions</span></div>
    </div>`;
  cell("ft_legend_txt", legendHtml, 24, 790, 214, 76, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  // Box 2: ESG DOMAINS (x: 254, w: 230)
  cell("ft_domains_box", "", 254, 770, 230, 104, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("ft_domains_hdr", `<b style="font-size:8px;color:#1E293B;">ESG DOMAINS</b>`, 262, 774, 200, 16, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  const esgDomains = [
    { title: "Environmental", icon: "leaf", color: "#059669" },
    { title: "Social", icon: "users", color: "#EA580C" },
    { title: "Governance", icon: "shield", color: "#2563EB" }
  ];
  esgDomains.forEach((ed, i) => {
    const ex = 262 + i * 72;
    cell(`ft_ed_${i}`, "", ex, 794, 68, 68, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;");
    const ic = svgIcon(ed.icon as keyof typeof SVG, ed.color, 14);
    cell(`ft_ed_txt_${i}`, `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;">${ic}<div style="font-size:6.5px;font-weight:700;color:#0F172A;text-align:center;line-height:1.1;">${ed.title}</div></div>`, ex, 794, 68, 68, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  });

  // Box 3: FRAMEWORKS & STANDARDS (x: 492, w: 290)
  cell("ft_standards_box", "", 492, 770, 290, 104, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("ft_standards_hdr", `<b style="font-size:8px;color:#1E293B;">FRAMEWORKS &amp; STANDARDS</b>`, 500, 774, 200, 16, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  const stds = ["GRI", "SASB", "TCFD", "CDP", "ISSB", "EU Taxonomy"];
  const stdsHtml = stds.map(s => `<span style="font-size:7.5px;font-weight:bold;color:#0F172A;background:#F1F5F9;padding:4px 8px;border-radius:4px;border:1px solid #CBD5E1;">${s}</span>`).join(" ");
  cell("ft_standards_txt", `<div style="padding-top:12px;display:flex;flex-wrap:wrap;gap:6px;justify-content:center;">${stdsHtml}</div>`, 500, 794, 274, 68, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // Box 4: DEPLOYMENT PATTERNS (x: 790, w: 240)
  cell("ft_deploy_box", "", 790, 770, 240, 104, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("ft_deploy_hdr", `<b style="font-size:8px;color:#1E293B;">DEPLOYMENT PATTERNS</b>`, 798, 774, 200, 16, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  const deployPatterns = [
    { title: "Multi-Cloud", icon: "cloud" },
    { title: "Hybrid", icon: "network" },
    { title: "Sovereign Cloud", icon: "shield" }
  ];
  deployPatterns.forEach((dp, i) => {
    const dx = 798 + i * 74;
    cell(`ft_dp_${i}`, "", dx, 794, 70, 68, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;");
    const ic = svgIcon(dp.icon as keyof typeof SVG, "#0284C7", 13);
    cell(`ft_dp_txt_${i}`, `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;">${ic}<div style="font-size:6.5px;font-weight:700;color:#0F172A;text-align:center;line-height:1.1;">${dp.title}</div></div>`, dx, 794, 70, 68, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  });

  // Box 5: SUSTAINABILITY BY DESIGN (x: 1038, w: 482)
  cell("ft_sust_box", "", 1038, 770, 482, 104, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("ft_sust_hdr", `<b style="font-size:8px;color:#1E293B;">SUSTAINABILITY BY DESIGN</b>`, 1046, 774, 200, 16, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  const sustDesign = [
    { title: "Energy<br/>Efficient", icon: "zap" },
    { title: "Carbon<br/>Aware", icon: "leaf" },
    { title: "Water<br/>Positive", icon: "droplet" },
    { title: "Responsible<br/>Operations", icon: "shieldCheck" }
  ];
  sustDesign.forEach((sd, i) => {
    const sx = 1046 + i * 116;
    cell(`ft_sd_${i}`, "", sx, 794, 110, 68, "rounded=1;arcSize=4;fillColor=#F0FDF4;strokeColor=#BBF7D0;strokeWidth=1;");
    const ic = svgIcon(sd.icon as keyof typeof SVG, "#059669", 14);
    cell(`ft_sd_txt_${i}`, `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;">${ic}<div style="font-size:6.5px;font-weight:700;color:#065F46;text-align:center;line-height:1.1;">${sd.title}</div></div>`, sx, 794, 110, 68, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  });

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_50" name="Sustainability &amp; ESG Intelligence Platform">
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
