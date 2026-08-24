const escapeXml = (v?: string | null) =>
  (v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const SVG = {
  user: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  users: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  cpu: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9"/><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M20 9h3"/><path d="M20 14h3"/><path d="M1 9h3"/><path d="M1 14h3"/></svg>`,
  server: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/></svg>`,
  database: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
  shield: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  shieldCheck: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>`,
  activity: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  chart: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/></svg>`,
  sparkles: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>`,
  zap: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  box: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>`,
  layers: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
  network: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="6" height="6" x="16" y="16" rx="1"/><rect width="6" height="6" x="2" y="16" rx="1"/><rect width="6" height="6" x="9" y="2" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M12 12V8"/></svg>`,
  cloud: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>`,
  lock: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  key: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></svg>`,
  repeat: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/></svg>`,
  checkCircle: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  search: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/></svg>`,
  fileCode: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><polyline points="10 13 8 15 10 17"/><polyline points="14 13 16 15 14 17"/></svg>`,
  settings: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  target: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
  gitBranch: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>`,
  bell: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>`,
  brain: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M12 5v13"/></svg>`,
  eye: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`,
  sliders: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="4" y1="21" y2="14"/><line x1="4" x2="4" y1="10" y2="3"/><line x1="12" x2="12" y1="21" y2="12"/><line x1="12" x2="12" y1="8" y2="3"/><line x1="20" x2="20" y1="21" y2="16"/><line x1="20" x2="20" y1="12" y2="3"/><line x1="1" x2="7" y1="14" y2="14"/><line x1="9" x2="15" y1="8" y2="8"/><line x1="17" x2="23" y1="16" y2="16"/></svg>`
};

function svgIcon(name: keyof typeof SVG, color: string = "#1E293B", size: number = 14): string {
  const icon = SVG[name] || SVG.cpu;
  return icon
    .replace('width="24"', `width="${size}"`)
    .replace('height="24"', `height="${size}"`)
    .replace(/currentColor/g, color);
}

export function generateTemplate47MlopsAiLifecyclePlatformXml(
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
  cell("hdr_num", "47", 16, 12, 54, 48, "shape=rectangle;rounded=1;arcSize=14;fillColor=#1D4ED8;strokeColor=#1D4ED8;fontColor=#FFFFFF;fontSize=26;fontStyle=1;align=center;verticalAlign=middle;");

  const titleHtml = `<div style="font-size:19px;font-weight:900;color:#0F172A;letter-spacing:0.5px;">MLOps &amp; AI MODEL LIFECYCLE PLATFORM</div>
    <div style="font-size:10.5px;color:#475569;font-weight:600;margin-top:3px;">Governed • Scalable • Reproducible • Secure • Responsible • Value-Driven</div>`;
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
  // 2. MAIN CENTER COLUMN - TIERS 7, 6, 5, 4, 3, 2, 1 (x: 16, w: 1140)
  // =========================================================================

  // -------------------------------------------------------------------------
  // TIER 7: CONSUMPTION & BUSINESS VALUE LAYER (y: 68, h: 86)
  // -------------------------------------------------------------------------
  cell("t7_frame", "", 16, 68, 1140, 86, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("t7_badge", "7", 24, 74, 22, 22, "rounded=1;arcSize=6;fillColor=#1D4ED8;fontColor=#FFFFFF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t7_lbl", `<b style="font-size:8px;color:#1D4ED8;">CONSUMPTION &amp; BUSINESS<br/>VALUE LAYER</b><br/><span style="font-size:7px;color:#64748B;line-height:1.2;">AI/ML Applications<br/>&amp; Outcomes</span>`, 50, 74, 110, 32, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  const t7Cards = [
    { title: "AI/ML Applications", icon: "sparkles", items: ["Personalization", "Forecasting", "Recommendations"] },
    { title: "Intelligent Automation", icon: "cpu", items: ["Document AI", "Process Mining", "Decisioning"] },
    { title: "Generative AI Apps", icon: "brain", items: ["Copilots", "Content Gen", "Code Assist"] },
    { title: "Embed & Integrate", icon: "network", items: ["APIs", "Features", "Embeddings"] },
    { title: "BI & Insights", icon: "chart", items: ["Dashboards", "Reports", "Alerts"] },
    { title: "Users & Channels", icon: "users", items: ["Web", "Mobile", "APIs", "Partners"] }
  ];

  t7Cards.forEach((cItem, i) => {
    const cx = 166 + i * 162;
    cell(`t7_c_${i}`, "", cx, 74, 156, 74, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;");
    const ic = svgIcon(cItem.icon as keyof typeof SVG, "#1D4ED8", 12);
    cell(`t7_c_hdr_${i}`, `<div style="display:flex;align-items:center;gap:4px;">${ic}<b style="font-size:8px;color:#0F172A;">${cItem.title}</b></div>`, cx + 6, 76, 144, 16, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
    const itemsHtml = cItem.items.map(it => `<span style="font-size:7.5px;color:#475569;line-height:1.2;">• ${it}</span>`).join("<br/>");
    cell(`t7_c_bdy_${i}`, `<div style="line-height:1.3;padding-top:2px;">${itemsHtml}</div>`, cx + 6, 94, 144, 50, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");
  });

  // -------------------------------------------------------------------------
  // TIER 6: MODEL SERVING & INFERENCE LAYER (y: 158, h: 104)
  // -------------------------------------------------------------------------
  cell("t6_frame", "", 16, 158, 1140, 104, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("t6_badge", "6", 24, 164, 22, 22, "rounded=1;arcSize=6;fillColor=#1D4ED8;fontColor=#FFFFFF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t6_lbl", `<b style="font-size:8px;color:#1D4ED8;">MODEL SERVING &amp; INFERENCE<br/>LAYER</b><br/><span style="font-size:7px;color:#64748B;line-height:1.2;">Deploy • Serve • Scale<br/>Monitor • Protect</span>`, 50, 164, 110, 32, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  const t6Cards = [
    { title: "Online Prediction", desc: "Vertex AI<br/>Endpoints", icon: "zap" },
    { title: "Batch Prediction", desc: "Vertex AI<br/>Batch", icon: "layers" },
    { title: "Streaming Inference", desc: "Dataflow<br/>+ Vertex AI", icon: "activity" },
    { title: "Vector Search", desc: "Vertex AI<br/>Vector Search", icon: "search" },
    { title: "Feature Serving", desc: "Vertex AI<br/>Feature Store", icon: "database" },
    { title: "Edge Inference", desc: "Cloud Run<br/>/ GKE / TPU", icon: "cpu" },
    { title: "Model Gateway", desc: "API Gateway<br/>Rate Limits", icon: "network" }
  ];

  t6Cards.forEach((cItem, i) => {
    const cx = 166 + i * 138;
    cell(`t6_c_${i}`, "", cx, 164, 134, 68, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;");
    const ic = svgIcon(cItem.icon as keyof typeof SVG, "#1D4ED8", 12);
    cell(`t6_c_hdr_${i}`, `<div style="display:flex;align-items:center;gap:4px;">${ic}<b style="font-size:7.5px;color:#0F172A;">${cItem.title}</b></div>`, cx + 4, 166, 126, 16, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
    cell(`t6_c_bdy_${i}`, `<div style="font-size:7px;color:#475569;line-height:1.3;padding-top:4px;">${cItem.desc}</div>`, cx + 6, 184, 122, 44, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");
  });

  // Tier 6 Sub-strip
  cell("t6_strip", "", 166, 236, 984, 20, "rounded=1;arcSize=6;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1;");
  const t6Pills = "Traffic Management • A/B Testing • Canary / Blue-Green • Autoscaling • Caching • Guardrails • Safety &amp; Content Filters";
  cell("t6_strip_txt", `<div style="font-size:7.5px;font-weight:700;color:#1E40AF;text-align:center;">${t6Pills}</div>`, 166, 236, 984, 20, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // -------------------------------------------------------------------------
  // TIER 5: MODEL TRAINING & TUNING LAYER (y: 266, h: 104)
  // -------------------------------------------------------------------------
  cell("t5_frame", "", 16, 266, 1140, 104, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("t5_badge", "5", 24, 272, 22, 22, "rounded=1;arcSize=6;fillColor=#1D4ED8;fontColor=#FFFFFF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t5_lbl", `<b style="font-size:8px;color:#1D4ED8;">MODEL TRAINING &amp; TUNING<br/>LAYER</b><br/><span style="font-size:7px;color:#64748B;line-height:1.2;">Train • Tune • Optimize<br/>Experiment • Validate</span>`, 50, 272, 110, 32, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  const t5Cards = [
    { title: "Notebook Environments", desc: "Vertex AI<br/>Notebooks", icon: "fileCode" },
    { title: "Training at Scale", desc: "Vertex AI Training<br/>(TPU / GPU)", icon: "cpu" },
    { title: "AutoML", desc: "AutoML<br/>(Tabular / Vision / NLP)", icon: "sparkles" },
    { title: "Hyperparameter Tuning", desc: "Vertex AI<br/>Vizier", icon: "sliders" },
    { title: "Distributed Training", desc: "PyTorch / XGBoost<br/>TensorFlow", icon: "layers" },
    { title: "LLM Fine-Tuning", desc: "PEFT / LoRA<br/>SFT / RLHF", icon: "brain" },
    { title: "Model Evaluation", desc: "Metrics<br/>Bias • Drift • Quality", icon: "checkCircle" }
  ];

  t5Cards.forEach((cItem, i) => {
    const cx = 166 + i * 138;
    cell(`t5_c_${i}`, "", cx, 272, 134, 68, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;");
    const ic = svgIcon(cItem.icon as keyof typeof SVG, "#1D4ED8", 12);
    cell(`t5_c_hdr_${i}`, `<div style="display:flex;align-items:center;gap:4px;">${ic}<b style="font-size:7.5px;color:#0F172A;">${cItem.title}</b></div>`, cx + 4, 274, 126, 16, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
    cell(`t5_c_bdy_${i}`, `<div style="font-size:7px;color:#475569;line-height:1.3;padding-top:4px;">${cItem.desc}</div>`, cx + 6, 292, 122, 44, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");
  });

  // Tier 5 Sub-strip
  cell("t5_strip", "", 166, 344, 984, 20, "rounded=1;arcSize=6;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1;");
  const t5Pills = "Experiment Tracking (MLflow) • Lineage • Reproducibility • Data / Code / Model Versioning";
  cell("t5_strip_txt", `<div style="font-size:7.5px;font-weight:700;color:#1E40AF;text-align:center;">${t5Pills}</div>`, 166, 344, 984, 20, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // -------------------------------------------------------------------------
  // TIER 4: DATA & FEATURE ENGINEERING LAYER (y: 374, h: 114)
  // -------------------------------------------------------------------------
  cell("t4_frame", "", 16, 374, 1140, 114, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("t4_badge", "4", 24, 380, 22, 22, "rounded=1;arcSize=6;fillColor=#059669;fontColor=#FFFFFF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t4_lbl", `<b style="font-size:8px;color:#059669;">DATA &amp; FEATURE<br/>ENGINEERING LAYER</b><br/><span style="font-size:7px;color:#64748B;line-height:1.2;">Prepare • Transform • Curate<br/>Feature • Label</span>`, 50, 380, 110, 32, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  const t4CardsTop = [
    { title: "Data Ingestion", desc: "Batch / Streaming<br/>Dataflow / Datastream", icon: "repeat" },
    { title: "Data Processing", desc: "Dataproc (Spark)<br/>Dataflow (Beam)", icon: "cpu" },
    { title: "Data Quality", desc: "Great Expectations<br/>Deequ", icon: "shieldCheck" },
    { title: "Labeling & Annotation", desc: "Vertex AI<br/>Labeling", icon: "sparkles" },
    { title: "Feature Engineering", desc: "Feature Store<br/>(Offline / Online)", icon: "database" },
    { title: "Data Versioning", desc: "DVC / Git LFS<br/>LakeFS", icon: "gitBranch" },
    { title: "Training Data Mgmt", desc: "Datasets<br/>Splits • Sampling", icon: "box" }
  ];

  t4CardsTop.forEach((cItem, i) => {
    const cx = 166 + i * 138;
    cell(`t4_c_${i}`, "", cx, 380, 134, 52, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;");
    const ic = svgIcon(cItem.icon as keyof typeof SVG, "#059669", 11);
    cell(`t4_c_hdr_${i}`, `<div style="display:flex;align-items:center;gap:4px;">${ic}<b style="font-size:7.5px;color:#0F172A;">${cItem.title}</b></div>`, cx + 4, 382, 126, 14, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
    cell(`t4_c_bdy_${i}`, `<div style="font-size:7px;color:#475569;line-height:1.2;padding-top:2px;">${cItem.desc}</div>`, cx + 6, 396, 122, 32, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");
  });

  // Tier 4 Storage & Catalog Bottom Row
  const t4Stores = [
    { title: "BigQuery / BigLake", sub: "Data Warehouse", icon: "database" },
    { title: "Cloud Storage", sub: "Data Lake", icon: "cloud" },
    { title: "Dataplex", sub: "Data Catalog", icon: "layers" },
    { title: "Dataproc Metastore", sub: "Unity Catalog", icon: "server" },
    { title: "Governed Data", sub: "Discovery • Glossary • Classification", icon: "shieldCheck" }
  ];
  t4Stores.forEach((st, i) => {
    const sx = 166 + i * 196;
    const sw = i === 4 ? 200 : 190;
    cell(`t4_s_${i}`, "", sx, 438, sw, 44, "rounded=1;arcSize=4;fillColor=#F0FDF4;strokeColor=#BBF7D0;strokeWidth=1;");
    const ic = svgIcon(st.icon as keyof typeof SVG, "#059669", 12);
    cell(`t4_s_txt_${i}`, `<div style="display:flex;align-items:center;gap:6px;">${ic}<div><b style="font-size:8px;color:#065F46;">${st.title}</b><div style="font-size:7px;color:#047857;">${st.sub}</div></div></div>`, sx + 6, 442, sw - 12, 36, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  });

  // -------------------------------------------------------------------------
  // TIER 3: ML PIPELINE ORCHESTRATION LAYER (y: 492, h: 104)
  // -------------------------------------------------------------------------
  cell("t3_frame", "", 16, 492, 1140, 104, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("t3_badge", "3", 24, 498, 22, 22, "rounded=1;arcSize=6;fillColor=#D97706;fontColor=#FFFFFF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t3_lbl", `<b style="font-size:8px;color:#D97706;">ML PIPELINE ORCHESTRATION<br/>LAYER</b><br/><span style="font-size:7px;color:#64748B;line-height:1.2;">Orchestrate • Automate • Schedule<br/>Monitor • Retry</span>`, 50, 498, 110, 32, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  const t3Cards = [
    { title: "Pipeline Orchestration", desc: "Vertex AI Pipelines", icon: "activity" },
    { title: "Workflow Orchestration", desc: "Cloud Composer", icon: "layers" },
    { title: "Event-Driven Workflows", desc: "Cloud Workflows<br/>Pub/Sub", icon: "zap" },
    { title: "CI/CD for ML", desc: "Cloud Build<br/>Cloud Deploy", icon: "gitBranch" },
    { title: "Pipeline Templates", desc: "Reusable Components<br/>YAML / DSL", icon: "fileCode" },
    { title: "Validation Gates", desc: "Data / Model<br/>Quality Checks", icon: "shieldCheck" },
    { title: "Notifications", desc: "Email / Slack<br/>PagerDuty", icon: "bell" }
  ];

  t3Cards.forEach((cItem, i) => {
    const cx = 166 + i * 138;
    cell(`t3_c_${i}`, "", cx, 498, 134, 68, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;");
    const ic = svgIcon(cItem.icon as keyof typeof SVG, "#D97706", 12);
    cell(`t3_c_hdr_${i}`, `<div style="display:flex;align-items:center;gap:4px;">${ic}<b style="font-size:7.5px;color:#0F172A;">${cItem.title}</b></div>`, cx + 4, 500, 126, 16, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
    cell(`t3_c_bdy_${i}`, `<div style="font-size:7px;color:#475569;line-height:1.3;padding-top:4px;">${cItem.desc}</div>`, cx + 6, 518, 122, 44, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");
  });

  // Tier 3 Sub-strip
  cell("t3_strip", "", 166, 570, 984, 20, "rounded=1;arcSize=6;fillColor=#FEF3C7;strokeColor=#FDE68A;strokeWidth=1;");
  const t3Pills = "Scheduling • Triggers • Parameterization • Secrets Management • Retry / Backoff • Audit Logs";
  cell("t3_strip_txt", `<div style="font-size:7.5px;font-weight:700;color:#92400E;text-align:center;">${t3Pills}</div>`, 166, 570, 984, 20, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // -------------------------------------------------------------------------
  // TIER 2: MODEL REGISTRY & LIFECYCLE LAYER (y: 600, h: 104)
  // -------------------------------------------------------------------------
  cell("t2_frame", "", 16, 600, 1140, 104, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("t2_badge", "2", 24, 606, 22, 22, "rounded=1;arcSize=6;fillColor=#EA580C;fontColor=#FFFFFF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t2_lbl", `<b style="font-size:8px;color:#EA580C;">MODEL REGISTRY &amp; LIFECYCLE<br/>LAYER</b><br/><span style="font-size:7px;color:#64748B;line-height:1.2;">Version • Approve • Govern<br/>Promote • Archive</span>`, 50, 606, 110, 32, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  const t2Cards = [
    { title: "Model Registry", desc: "Vertex AI<br/>Model Registry", icon: "box" },
    { title: "Model Versioning", desc: "Versions<br/>Aliases", icon: "gitBranch" },
    { title: "Approval Workflow", desc: "Human-in-the-Loop<br/>Approvals", icon: "user" },
    { title: "Model Lineage", desc: "End-to-End<br/>Lineage", icon: "network" },
    { title: "Model Cards", desc: "Documentation<br/>Fairness • Risks", icon: "fileCode" },
    { title: "Policy & Governance", desc: "Access Control<br/>Audit Trails", icon: "shieldCheck" },
    { title: "Promotion & Deploy", desc: "Staging -> Prod<br/>Canary / Rollback", icon: "zap" },
    { title: "Archive & Retire", desc: "Deprecate<br/>Archive", icon: "lock" }
  ];

  t2Cards.forEach((cItem, i) => {
    const cx = 166 + i * 122;
    cell(`t2_c_${i}`, "", cx, 606, 118, 68, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;");
    const ic = svgIcon(cItem.icon as keyof typeof SVG, "#EA580C", 11);
    cell(`t2_c_hdr_${i}`, `<div style="display:flex;align-items:center;gap:3px;">${ic}<b style="font-size:7.5px;color:#0F172A;">${cItem.title}</b></div>`, cx + 3, 608, 112, 16, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
    cell(`t2_c_bdy_${i}`, `<div style="font-size:7px;color:#475569;line-height:1.2;padding-top:4px;">${cItem.desc}</div>`, cx + 5, 626, 108, 44, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");
  });

  // Tier 2 Sub-strip
  cell("t2_strip", "", 166, 678, 984, 20, "rounded=1;arcSize=6;fillColor=#FFEDD5;strokeColor=#FED7AA;strokeWidth=1;");
  const t2Pills = "RBAC &amp; Access • Model Tags • Audit &amp; Compliance • Retention Policies";
  cell("t2_strip_txt", `<div style="font-size:7.5px;font-weight:700;color:#9A3412;text-align:center;">${t2Pills}</div>`, 166, 678, 984, 20, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // -------------------------------------------------------------------------
  // TIER 1: INFRASTRUCTURE & ML FOUNDATION LAYER (y: 708, h: 104)
  // -------------------------------------------------------------------------
  cell("t1_frame", "", 16, 708, 1140, 104, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("t1_badge", "1", 24, 714, 22, 22, "rounded=1;arcSize=6;fillColor=#DC2626;fontColor=#FFFFFF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t1_lbl", `<b style="font-size:8px;color:#DC2626;">INFRASTRUCTURE &amp; ML<br/>FOUNDATION LAYER</b><br/><span style="font-size:7px;color:#64748B;line-height:1.2;">Compute • Storage • Network<br/>Security • Observability</span>`, 50, 714, 110, 32, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  const t1Cards = [
    { title: "Compute", desc: "Compute Engine<br/>TPU • GPUs", icon: "cpu" },
    { title: "Containers", desc: "GKE<br/>Cloud Run", icon: "box" },
    { title: "Storage", desc: "Cloud Storage<br/>Persistent Disks", icon: "cloud" },
    { title: "Databases", desc: "BigQuery<br/>Cloud SQL / Spanner", icon: "database" },
    { title: "Networking", desc: "VPC<br/>Cloud Load Balancing", icon: "network" },
    { title: "Security", desc: "Cloud IAM<br/>KMS • Secret Mgr", icon: "shieldCheck" },
    { title: "Observability", desc: "Cloud Monitoring<br/>Logging • Trace • Profiler", icon: "activity" }
  ];

  t1Cards.forEach((cItem, i) => {
    const cx = 166 + i * 138;
    cell(`t1_c_${i}`, "", cx, 714, 134, 68, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;");
    const ic = svgIcon(cItem.icon as keyof typeof SVG, "#DC2626", 12);
    cell(`t1_c_hdr_${i}`, `<div style="display:flex;align-items:center;gap:4px;">${ic}<b style="font-size:7.5px;color:#0F172A;">${cItem.title}</b></div>`, cx + 4, 716, 126, 16, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
    cell(`t1_c_bdy_${i}`, `<div style="font-size:7px;color:#475569;line-height:1.3;padding-top:4px;">${cItem.desc}</div>`, cx + 6, 734, 122, 44, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");
  });

  // Tier 1 Sub-strip
  cell("t1_strip", "", 166, 786, 984, 20, "rounded=1;arcSize=6;fillColor=#FEE2E2;strokeColor=#FECACA;strokeWidth=1;");
  const t1Pills = "Reliability • High Availability • Backup &amp; DR • Cost Optimization • Sustainability";
  cell("t1_strip_txt", `<div style="font-size:7.5px;font-weight:700;color:#991B1B;text-align:center;">${t1Pills}</div>`, 166, 786, 984, 20, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // =========================================================================
  // 3. RIGHT SIDEBAR (x: 1166, w: 354)
  // =========================================================================

  // -------------------------------------------------------------------------
  // TIER 8: GOVERNANCE, RISK & COMPLIANCE (y: 68, h: 236)
  // -------------------------------------------------------------------------
  cell("t8_frame", "", 1166, 68, 354, 236, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("t8_badge", "8", 1174, 74, 22, 22, "rounded=1;arcSize=6;fillColor=#7C3AED;fontColor=#FFFFFF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t8_lbl", `<b style="font-size:8.5px;color:#7C3AED;">GOVERNANCE, RISK &amp; COMPLIANCE</b><br/><span style="font-size:7px;color:#64748B;">Governed • Responsible • Compliant</span>`, 1202, 74, 308, 22, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  const t8Items = [
    { title: "AI Governance<br/>Framework", icon: "shield" },
    { title: "Model Risk<br/>Management", icon: "activity" },
    { title: "Responsible AI<br/>(FAIR)", icon: "sparkles" },
    { title: "Bias &amp; Fairness<br/>Monitoring", icon: "eye" },
    { title: "Privacy &amp; PII<br/>Protection", icon: "lock" },
    { title: "Security &amp; Data<br/>Protection", icon: "shieldCheck" },
    { title: "Audit &amp; Logging", icon: "fileCode" },
    { title: "Regulatory<br/>Compliance", icon: "checkCircle" },
    { title: "Data &amp; Model<br/>Lineage", icon: "network" }
  ];

  t8Items.forEach((it, i) => {
    const rx = 1174 + (i % 3) * 112;
    const ry = 104 + Math.floor(i / 3) * 48;
    cell(`t8_item_${i}`, "", rx, ry, 106, 44, "rounded=1;arcSize=4;fillColor=#FAF5FF;strokeColor=#E9D5FF;strokeWidth=1;");
    const ic = svgIcon(it.icon as keyof typeof SVG, "#7C3AED", 12);
    cell(`t8_item_txt_${i}`, `<div style="display:flex;align-items:center;gap:4px;">${ic}<div style="font-size:7px;font-weight:700;color:#6B21A8;line-height:1.2;">${it.title}</div></div>`, rx + 4, ry + 2, 98, 40, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  });

  // Ethics Review Board Pod
  cell("t8_ethics", "", 1174, 256, 338, 36, "rounded=1;arcSize=4;fillColor=#F3E8FF;strokeColor=#D8B4FE;strokeWidth=1;");
  const ethicsIc = svgIcon("users", "#7C3AED", 14);
  cell("t8_ethics_txt", `<div style="display:flex;align-items:center;justify-content:center;gap:6px;">${ethicsIc}<b style="font-size:8px;color:#581C87;">Ethics Review Board</b></div>`, 1174, 256, 338, 36, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // -------------------------------------------------------------------------
  // TIER 9: OBSERVABILITY & RELIABILITY (y: 310, h: 226)
  // -------------------------------------------------------------------------
  cell("t9_frame", "", 1166, 310, 354, 226, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("t9_badge", "9", 1174, 316, 22, 22, "rounded=1;arcSize=6;fillColor=#059669;fontColor=#FFFFFF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t9_lbl", `<b style="font-size:8.5px;color:#059669;">OBSERVABILITY &amp; RELIABILITY</b><br/><span style="font-size:7px;color:#64748B;">Observe • Detect • Respond</span>`, 1202, 316, 308, 22, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  const t9Items = [
    { title: "Model Performance<br/>Monitoring", icon: "activity" },
    { title: "Data Drift<br/>Detection", icon: "zap" },
    { title: "Prediction Drift<br/>Detection", icon: "chart" },
    { title: "Alerting &amp;<br/>Notifications", icon: "bell" },
    { title: "SLA / SLO<br/>Management", icon: "shieldCheck" },
    { title: "Incident<br/>Management", icon: "settings" },
    { title: "Root Cause<br/>Analysis", icon: "search" },
    { title: "Canary Analysis<br/>&amp; Rollback", icon: "repeat" },
    { title: "Cost &amp; Usage<br/>Monitoring", icon: "chart" }
  ];

  t9Items.forEach((it, i) => {
    const rx = 1174 + (i % 3) * 112;
    const ry = 344 + Math.floor(i / 3) * 44;
    cell(`t9_item_${i}`, "", rx, ry, 106, 40, "rounded=1;arcSize=4;fillColor=#F0FDF4;strokeColor=#BBF7D0;strokeWidth=1;");
    const ic = svgIcon(it.icon as keyof typeof SVG, "#059669", 11);
    cell(`t9_item_txt_${i}`, `<div style="display:flex;align-items:center;gap:4px;">${ic}<div style="font-size:7px;font-weight:700;color:#065F46;line-height:1.2;">${it.title}</div></div>`, rx + 4, ry + 2, 98, 36, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  });

  // Observability Dashboards Pod
  cell("t9_dash", "", 1174, 484, 338, 42, "rounded=1;arcSize=4;fillColor=#DCFCE7;strokeColor=#86EFAC;strokeWidth=1;");
  const dashIc = svgIcon("chart", "#059669", 14);
  cell("t9_dash_txt", `<div style="display:flex;align-items:center;justify-content:center;gap:6px;">${dashIc}<b style="font-size:8px;color:#14532D;">Observability Dashboards</b></div>`, 1174, 484, 338, 42, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // -------------------------------------------------------------------------
  // TIER 10: PLATFORM OPERATIONS (y: 542, h: 160)
  // -------------------------------------------------------------------------
  cell("t10_frame", "", 1166, 542, 354, 160, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("t10_badge", "10", 1174, 548, 22, 22, "rounded=1;arcSize=6;fillColor=#EA580C;fontColor=#FFFFFF;fontSize=10;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t10_lbl", `<b style="font-size:8.5px;color:#EA580C;">PLATFORM OPERATIONS</b><br/><span style="font-size:7px;color:#64748B;">Operate • Optimize • Evolve</span>`, 1202, 548, 308, 22, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  const t10Items = [
    { title: "Platform Onboarding", icon: "user" },
    { title: "Capacity Planning", icon: "layers" },
    { title: "Cost Management", icon: "chart" },
    { title: "Release Management", icon: "zap" },
    { title: "FinOps", icon: "settings" },
    { title: "Continuous Improvement", icon: "repeat" },
    { title: "Platform Health", icon: "activity" }
  ];

  t10Items.slice(0, 6).forEach((it, i) => {
    const rx = 1174 + (i % 3) * 112;
    const ry = 574 + Math.floor(i / 3) * 38;
    cell(`t10_item_${i}`, "", rx, ry, 106, 34, "rounded=1;arcSize=4;fillColor=#FFF7ED;strokeColor=#FFEDD5;strokeWidth=1;");
    const ic = svgIcon(it.icon as keyof typeof SVG, "#EA580C", 11);
    cell(`t10_item_txt_${i}`, `<div style="display:flex;align-items:center;gap:3px;">${ic}<div style="font-size:7px;font-weight:700;color:#9A3412;line-height:1.2;">${it.title}</div></div>`, rx + 3, ry + 2, 100, 30, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  });

  // Knowledge Base & Runbooks Pod
  cell("t10_kb", "", 1174, 656, 338, 36, "rounded=1;arcSize=4;fillColor=#FFEDD5;strokeColor=#FDBA74;strokeWidth=1;");
  const kbIc = svgIcon("fileCode", "#EA580C", 14);
  cell("t10_kb_txt", `<div style="display:flex;align-items:center;justify-content:center;gap:6px;">${kbIc}<b style="font-size:8px;color:#7C2D12;">Knowledge Base &amp; Runbooks</b></div>`, 1174, 656, 338, 36, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // -------------------------------------------------------------------------
  // KEY OUTCOMES (y: 708, h: 104)
  // -------------------------------------------------------------------------
  cell("outcomes_frame", "", 1166, 708, 354, 104, "rounded=1;arcSize=3;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;");
  cell("outcomes_hdr", `<b style="font-size:8.5px;color:#1D4ED8;">KEY OUTCOMES</b>`, 1176, 712, 200, 16, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  const outcomeList = [
    "Faster time to production for ML &amp; AI use cases",
    "High-quality, reliable &amp; trusted models",
    "Scalable, cost-efficient &amp; observable operations",
    "Governed, compliant &amp; responsible AI at scale",
    "Business ROI &amp; measurable impact"
  ];
  const outcomesHtml = outcomeList.map(o => `<div style="display:flex;align-items:center;gap:4px;font-size:7px;color:#334155;line-height:1.2;"><span style="color:#2563EB;">✓</span> ${o}</div>`).join("");
  cell("outcomes_txt", outcomesHtml, 1176, 728, 250, 78, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  // Target Bullseye Icon
  const targetSvg = `<svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`;
  cell("outcomes_icon", targetSvg, 1450, 730, 48, 48, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // =========================================================================
  // 4. FOOTER REGION (y: 818, h: 96)
  // =========================================================================

  // Box 1: ML LIFECYCLE FLOW (x: 16, w: 710)
  cell("ft_flow_box", "", 16, 818, 710, 96, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("ft_flow_hdr", `<b style="font-size:8px;color:#1E293B;">ML LIFECYCLE FLOW</b>`, 24, 822, 200, 16, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  const lifecycleSteps = [
    { title: "Data<br/>Ingestion", icon: "repeat" },
    { title: "Data<br/>Preparation", icon: "fileCode" },
    { title: "Model<br/>Training", icon: "cpu" },
    { title: "Evaluation &amp;<br/>Validation", icon: "shieldCheck" },
    { title: "Registry &amp;<br/>Approval", icon: "box" },
    { title: "Deployment &amp;<br/>Serving", icon: "cloud" },
    { title: "Monitoring &amp;<br/>Feedback", icon: "activity" }
  ];

  lifecycleSteps.forEach((st, i) => {
    const sx = 28 + i * 98;
    cell(`lc_st_${i}`, "", sx, 842, 70, 44, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;");
    const ic = svgIcon(st.icon as keyof typeof SVG, "#1D4ED8", 12);
    cell(`lc_st_txt_${i}`, `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;">${ic}<div style="font-size:6.5px;font-weight:700;color:#0F172A;text-align:center;line-height:1.1;">${st.title}</div></div>`, sx, 842, 70, 44, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
    if (i < 6) {
      rawEdge(`lc_edge_${i}`, "edgeStyle=none;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=classic;endFill=1;", [
        { x: sx + 72, y: 864 },
        { x: sx + 96, y: 864 }
      ]);
    }
  });

  // Box 2: FLOW LEGEND (x: 734, w: 170)
  cell("ft_legend_box", "", 734, 818, 170, 96, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("ft_legend_hdr", `<b style="font-size:8px;color:#1E293B;">FLOW LEGEND</b>`, 742, 822, 150, 16, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  const legendHtml = `
    <div style="padding-top:4px;display:flex;flex-direction:column;gap:6px;">
      <div style="display:flex;align-items:center;gap:6px;"><span style="color:#2563EB;font-weight:bold;">━━▶</span> <span style="font-size:7px;color:#334155;">Data Flow</span></div>
      <div style="display:flex;align-items:center;gap:6px;"><span style="color:#059669;font-weight:bold;">╌╌▶</span> <span style="font-size:7px;color:#334155;">Metadata / Control Flow</span></div>
      <div style="display:flex;align-items:center;gap:6px;"><span style="color:#EA580C;font-weight:bold;">╌╌▶</span> <span style="font-size:7px;color:#334155;">Feedback Loop</span></div>
    </div>`;
  cell("ft_legend_txt", legendHtml, 742, 840, 154, 68, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  // Box 3: SERVING PATTERNS (x: 912, w: 290)
  cell("ft_serving_box", "", 912, 818, 290, 96, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("ft_serving_hdr", `<b style="font-size:8px;color:#1E293B;">SERVING PATTERNS</b>`, 920, 822, 200, 16, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  const servingPats = [
    { title: "Real-time<br/>Online", icon: "zap" },
    { title: "Batch<br/>Prediction", icon: "layers" },
    { title: "Streaming<br/>Inference", icon: "activity" },
    { title: "Edge<br/>Inference", icon: "cpu" }
  ];
  servingPats.forEach((sp, i) => {
    const sx = 920 + i * 68;
    cell(`ft_sp_${i}`, "", sx, 842, 64, 64, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;");
    const ic = svgIcon(sp.icon as keyof typeof SVG, "#2563EB", 14);
    cell(`ft_sp_txt_${i}`, `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;">${ic}<div style="font-size:6.5px;font-weight:700;color:#0F172A;text-align:center;line-height:1.1;">${sp.title}</div></div>`, sx, 842, 64, 64, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  });

  // Box 4: MODEL TYPES (x: 1210, w: 310)
  cell("ft_models_box", "", 1210, 818, 310, 96, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("ft_models_hdr", `<b style="font-size:8px;color:#1E293B;">MODEL TYPES</b>`, 1218, 822, 200, 16, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  const modelTypes = [
    { title: "Tabular<br/>Models", icon: "database" },
    { title: "CV / Vision<br/>Models", icon: "eye" },
    { title: "NLP / LLM<br/>Models", icon: "brain" },
    { title: "Graph<br/>Models", icon: "network" }
  ];
  modelTypes.forEach((mt, i) => {
    const mx = 1218 + i * 72;
    cell(`ft_mt_${i}`, "", mx, 842, 68, 64, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;");
    const ic = svgIcon(mt.icon as keyof typeof SVG, "#2563EB", 14);
    cell(`ft_mt_txt_${i}`, `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;">${ic}<div style="font-size:6.5px;font-weight:700;color:#0F172A;text-align:center;line-height:1.1;">${mt.title}</div></div>`, mx, 842, 68, 64, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  });

  // =========================================================================
  // 5. INTER-TIER FLOW EDGES (Vertical Connectors)
  // =========================================================================
  rawEdge("flow_t7_t6", "edgeStyle=none;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=1.5;dashed=1;dashPattern=4 3;endArrow=classic;endFill=1;", [
    { x: 586, y: 154 },
    { x: 586, y: 158 }
  ]);

  rawEdge("flow_t6_t5", "edgeStyle=none;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=1.5;dashed=1;dashPattern=4 3;endArrow=classic;endFill=1;", [
    { x: 586, y: 262 },
    { x: 586, y: 266 }
  ]);

  rawEdge("flow_t5_t4", "edgeStyle=none;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#059669;strokeWidth=1.5;dashed=1;dashPattern=4 3;endArrow=classic;endFill=1;", [
    { x: 586, y: 370 },
    { x: 586, y: 374 }
  ]);

  rawEdge("flow_t4_t3", "edgeStyle=none;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#D97706;strokeWidth=1.5;dashed=1;dashPattern=4 3;endArrow=classic;endFill=1;", [
    { x: 586, y: 488 },
    { x: 586, y: 492 }
  ]);

  rawEdge("flow_t3_t2", "edgeStyle=none;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#EA580C;strokeWidth=1.5;dashed=1;dashPattern=4 3;endArrow=classic;endFill=1;", [
    { x: 586, y: 596 },
    { x: 586, y: 600 }
  ]);

  rawEdge("flow_t2_t1", "edgeStyle=none;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#DC2626;strokeWidth=1.5;dashed=1;dashPattern=4 3;endArrow=classic;endFill=1;", [
    { x: 586, y: 704 },
    { x: 586, y: 708 }
  ]);

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_47" name="MLOps &amp; AI Model Lifecycle Platform">
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
