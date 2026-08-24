const escapeXml = (v?: string | null) =>
  (v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const SVG = {
  user: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  users: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  monitor: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>`,
  cloud: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>`,
  settings: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  shield: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  shieldCheck: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>`,
  shieldAlert: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>`,
  database: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
  server: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/></svg>`,
  cpu: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9"/><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M20 9h3"/><path d="M20 14h3"/><path d="M1 9h3"/><path d="M1 14h3"/></svg>`,
  network: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="6" height="6" x="16" y="16" rx="1"/><rect width="6" height="6" x="2" y="16" rx="1"/><rect width="6" height="6" x="9" y="2" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M12 12V8"/></svg>`,
  repeat: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/></svg>`,
  layers: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
  activity: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  checkCircle: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  chart: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/></svg>`,
  fileCode: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><polyline points="10 13 8 15 10 17"/><polyline points="14 13 16 15 14 17"/></svg>`,
  folder: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/></svg>`,
  lock: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  key: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></svg>`,
  sparkles: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>`,
  zap: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  globe: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  search: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/></svg>`,
  dollarSign: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
  api: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>`,
  k8s: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><line x1="12" x2="12" y1="3" y2="9"/><line x1="12" x2="12" y1="15" y2="21"/><line x1="3" x2="9" y1="12" y2="12"/><line x1="15" x2="21" y1="12" y2="12"/></svg>`
};

function svgIcon(name: keyof typeof SVG, color: string = "#1E293B", size: number = 14): string {
  const icon = SVG[name] || SVG.monitor;
  return icon
    .replace('width="24"', `width="${size}"`)
    .replace('height="24"', `height="${size}"`)
    .replace(/currentColor/g, color);
}

export function generateTemplate46EnterpriseKubernetesPlatformEngineeringXml(
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
  // 1. TOP HEADER BANNER (y: 12..66)
  // =========================================================================
  cell("hdr_num", "46", 16, 12, 54, 48, "shape=rectangle;rounded=1;arcSize=14;fillColor=#1D4ED8;strokeColor=#1D4ED8;fontColor=#FFFFFF;fontSize=26;fontStyle=1;align=center;verticalAlign=middle;");

  const titleHtml = `<div style="font-size:19px;font-weight:900;color:#0F172A;letter-spacing:0.5px;">ENTERPRISE KUBERNETES &amp; PLATFORM ENGINEERING</div>
    <div style="font-size:10.5px;color:#475569;font-weight:600;margin-top:3px;">Standardized • Self-Service • Secure • Scalable • Developer-Enabled</div>`;
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
  // 2. MAIN CENTER COLUMN - TIERS 6, 5, 4, 3, 2, 1, 0 (x: 16, w: 1140)
  // =========================================================================

  // -------------------------------------------------------------------------
  // TIER 6: CONSUMER LAYER (y: 72, h: 96)
  // -------------------------------------------------------------------------
  cell("t6_frame", "", 16, 72, 1140, 96, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("t6_badge", "6", 24, 78, 22, 22, "rounded=1;arcSize=6;fillColor=#1D4ED8;fontColor=#FFFFFF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t6_lbl", `<b style="font-size:8.5px;color:#1D4ED8;">CONSUMER LAYER</b><br/><span style="font-size:7px;color:#64748B;line-height:1.2;">Platform Consumers<br/>&amp; Experience</span>`, 50, 78, 92, 32, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  // Platform Consumers sub-box
  cell("t6_users_box", "", 146, 78, 436, 84, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;");
  const users = [
    { title: "Developers", icon: "user", color: "#1D4ED8" },
    { title: "DevOps / SREs", icon: "users", color: "#1D4ED8" },
    { title: "Platform<br/>Engineers", icon: "users", color: "#1D4ED8" },
    { title: "Product<br/>Teams", icon: "users", color: "#1D4ED8" },
    { title: "Data<br/>Scientists", icon: "user", color: "#1D4ED8" },
    { title: "Business<br/>Users", icon: "users", color: "#1D4ED8" }
  ];
  users.forEach((u, i) => {
    const ux = 150 + i * 72;
    const uHtml = `<div style="text-align:center;">
      <div style="display:flex;justify-content:center;margin-bottom:4px;">${svgIcon(u.icon as any, u.color, 16)}</div>
      <div style="font-size:7px;font-weight:700;color:#0F172A;line-height:1.15;">${u.title}</div>
    </div>`;
    cell(`t6_u_${i}`, uHtml, ux, 84, 68, 70, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  });

  // Portal Boxes (Developer Portal, Self-Service Portal, API Portal, ChatOps)
  const portals = [
    { title: "Developer Portal", name: "Backstage", icon: "folder", color: "#10B981" },
    { title: "Self-Service Portal", name: "Port", icon: "monitor", color: "#3B82F6" },
    { title: "API Portal", name: "Apigee", icon: "api", color: "#F97316" },
    { title: "ChatOps", name: "Slack", icon: "sparkles", color: "#8B5CF6" }
  ];
  portals.forEach((p, i) => {
    const px = 590 + i * 138;
    cell(`t6_p_${i}_box`, "", px, 78, 132, 84, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;");
    cell(`t6_p_${i}_hdr`, `<b style="font-size:7.5px;color:#475569;">${p.title}</b>`, px, 82, 132, 14, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
    const pHtml = `<div style="display:flex;align-items:center;justify-content:center;gap:6px;">
      ${svgIcon(p.icon as any, p.color, 16)}
      <span style="font-size:9.5px;font-weight:900;color:#0F172A;">${p.name}</span>
    </div>`;
    cell(`t6_p_${i}_body`, pHtml, px, 102, 132, 54, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  });

  // -------------------------------------------------------------------------
  // TIER 5: PLATFORM SERVICES LAYER (y: 176, h: 114)
  // -------------------------------------------------------------------------
  cell("t5_frame", "", 16, 176, 1140, 114, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("t5_badge", "5", 24, 182, 22, 22, "rounded=1;arcSize=6;fillColor=#1D4ED8;fontColor=#FFFFFF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t5_lbl", `<b style="font-size:8.5px;color:#1D4ED8;">PLATFORM SERVICES<br/>LAYER</b><br/><span style="font-size:7px;color:#64748B;line-height:1.2;">Reusable Services<br/>&amp; Components</span>`, 50, 182, 92, 40, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  const pServices = [
    { title: "Application Platform", items: [{ name: "Helm<br/>Charts", icon: "fileCode", color: "#0F172A" }, { name: "KubeVela", icon: "settings", color: "#0F172A" }, { name: "Service<br/>Catalog", icon: "folder", color: "#0F172A" }], w: 160 },
    { title: "Data & AI Services", items: [{ name: "Kubeflow", icon: "sparkles", color: "#0F172A" }, { name: "KServe", icon: "cloud", color: "#0F172A" }, { name: "Trino", icon: "database", color: "#0F172A" }, { name: "MLflow", icon: "activity", color: "#0F172A" }], w: 190 },
    { title: "Integration Services", items: [{ name: "API<br/>Gateway", icon: "api", color: "#0F172A" }, { name: "Kafka", icon: "repeat", color: "#0F172A" }, { name: "Pub/Sub", icon: "zap", color: "#0F172A" }, { name: "Eventarc", icon: "activity", color: "#0F172A" }], w: 190 },
    { title: "Developer Services", items: [{ name: "Code<br/>Repos", icon: "fileCode", color: "#0F172A" }, { name: "CI/CD<br/>Pipelines", icon: "repeat", color: "#0F172A" }, { name: "Artifact<br/>Registry", icon: "layers", color: "#0F172A" }], w: 160 },
    { title: "Observability Services", items: [{ name: "Monitoring", icon: "chart", color: "#0F172A" }, { name: "Logging", icon: "fileCode", color: "#0F172A" }, { name: "Tracing", icon: "activity", color: "#0F172A" }], w: 155 },
    { title: "Security Services", items: [{ name: "Secrets<br/>Manager", icon: "key", color: "#0F172A" }, { name: "IAM", icon: "user", color: "#0F172A" }, { name: "Policy<br/>Controller", icon: "lock", color: "#0F172A" }], w: 125 }
  ];

  let curX = 146;
  pServices.forEach((ps, idx) => {
    cell(`t5_sub_${idx}_box`, "", curX, 182, ps.w, 70, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1;");
    cell(`t5_sub_${idx}_hdr`, `<b style="font-size:7px;color:#0F172A;">${ps.title}</b>`, curX, 184, ps.w, 12, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
    
    const itmWidth = Math.floor((ps.w - 8) / ps.items.length);
    ps.items.forEach((itm, itmIdx) => {
      const ix = curX + 4 + itmIdx * itmWidth;
      const itmHtml = `<div style="text-align:center;">
        <div style="display:flex;justify-content:center;margin-bottom:3px;">${svgIcon(itm.icon as any, itm.color, 12)}</div>
        <div style="font-size:6px;font-weight:700;color:#334155;line-height:1.1;">${itm.name}</div>
      </div>`;
      cell(`t5_sub_${idx}_i_${itmIdx}`, itmHtml, ix, 198, itmWidth, 50, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
    });
    curX += ps.w + 6;
  });

  // Tier 5 Bottom Pill Bars
  cell("t5_btm_left", `<div style="display:flex;align-items:center;justify-content:center;gap:6px;font-size:7.5px;font-weight:800;color:#1D4ED8;">
    ${svgIcon("settings", "#1D4ED8", 12)} Platform APIs &amp; Internal Services
  </div>`, 146, 258, 460, 24, "rounded=1;arcSize=10;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1;html=1;align=center;verticalAlign=middle;");

  cell("t5_btm_right", `<div style="display:flex;align-items:center;justify-content:center;gap:6px;font-size:7.5px;font-weight:800;color:#1D4ED8;">
    ${svgIcon("cloud", "#1D4ED8", 12)} Service Mesh (Istio)
  </div>`, 614, 258, 534, 24, "rounded=1;arcSize=10;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1;html=1;align=center;verticalAlign=middle;");

  // -------------------------------------------------------------------------
  // TIER 4: PLATFORM ENGINEERING LAYER (y: 298, h: 104)
  // -------------------------------------------------------------------------
  cell("t4_frame", "", 16, 298, 1140, 104, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("t4_badge", "4", 24, 304, 22, 22, "rounded=1;arcSize=6;fillColor=#1D4ED8;fontColor=#FFFFFF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t4_lbl", `<b style="font-size:8.5px;color:#1D4ED8;">PLATFORM<br/>ENGINEERING LAYER</b><br/><span style="font-size:6.5px;color:#64748B;line-height:1.2;">Build • Automate • Govern<br/>• Secure • Operate</span>`, 50, 304, 92, 44, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  const peBoxes = [
    { title: "Software Factory", items: [{ name: "Templates", icon: "fileCode" }, { name: "Scaffolder", icon: "settings" }, { name: "Pipelines", icon: "repeat" }], w: 142 },
    { title: "GitOps", items: [{ name: "Argo CD", icon: "repeat" }, { name: "Flux", icon: "repeat" }], w: 110 },
    { title: "Policy & Governance", items: [{ name: "OPA/Gatekeeper", icon: "shield" }, { name: "Kyverno", icon: "shieldCheck" }], w: 150 },
    { title: "Quality & Security", items: [{ name: "SonarQube", icon: "chart" }, { name: "Trivy", icon: "shieldAlert" }], w: 142 },
    { title: "Cost & FinOps", items: [{ name: "Kubecost", icon: "dollarSign" }, { name: "FinOps<br/>Toolkit", icon: "chart" }], w: 132 },
    { title: "Documentation", items: [{ name: "Docs as Code", icon: "fileCode" }, { name: "Runbooks", icon: "folder" }], w: 150 },
    { title: "IDP & Automation", items: [{ name: "Backstage", icon: "monitor" }, { name: "Automation", icon: "settings" }], w: 156 }
  ];

  curX = 146;
  peBoxes.forEach((pb, idx) => {
    cell(`t4_sub_${idx}_box`, "", curX, 304, pb.w, 62, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1;");
    cell(`t4_sub_${idx}_hdr`, `<b style="font-size:7px;color:#0F172A;">${pb.title}</b>`, curX, 306, pb.w, 12, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
    const itmWidth = Math.floor((pb.w - 8) / pb.items.length);
    pb.items.forEach((itm, itmIdx) => {
      const ix = curX + 4 + itmIdx * itmWidth;
      const itmHtml = `<div style="text-align:center;">
        <div style="display:flex;justify-content:center;margin-bottom:3px;">${svgIcon(itm.icon as any, "#0284C7", 12)}</div>
        <div style="font-size:6px;font-weight:700;color:#334155;line-height:1.1;">${itm.name}</div>
      </div>`;
      cell(`t4_sub_${idx}_i_${itmIdx}`, itmHtml, ix, 320, itmWidth, 42, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
    });
    curX += pb.w + 6;
  });

  cell("t4_btm_bar", `<div style="display:flex;align-items:center;justify-content:center;gap:14px;font-size:7.5px;font-weight:800;color:#1D4ED8;">
    <span>Golden Paths</span> • <span>Paved Roads</span> • <span>Policy as Code</span> • <span>Compliance as Code</span>
  </div>`, 146, 372, 1002, 22, "rounded=1;arcSize=10;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1;html=1;align=center;verticalAlign=middle;");

  // -------------------------------------------------------------------------
  // TIER 3: CLUSTER MANAGEMENT LAYER (y: 410, h: 104)
  // -------------------------------------------------------------------------
  cell("t3_frame", "", 16, 410, 1140, 104, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("t3_badge", "3", 24, 416, 22, 22, "rounded=1;arcSize=6;fillColor=#16A34A;fontColor=#FFFFFF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t3_lbl", `<b style="font-size:8.5px;color:#16A34A;">CLUSTER<br/>MANAGEMENT LAYER</b><br/><span style="font-size:6.5px;color:#64748B;line-height:1.2;">Provision • Configure<br/>• Upgrade • Heal</span>`, 50, 416, 92, 44, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  const cmBoxes = [
    { title: "Cluster Provisioning", items: [{ name: "GKE Fleet", icon: "cloud" }, { name: "Terraform", icon: "settings" }, { name: "Config<br/>Connector", icon: "settings" }], w: 168 },
    { title: "Lifecycle Management", items: [{ name: "Upgrade", icon: "repeat" }, { name: "Auto-heal", icon: "checkCircle" }, { name: "Backup", icon: "database" }], w: 158 },
    { title: "Multi-tenancy", items: [{ name: "Namespaces", icon: "folder" }, { name: "Resource<br/>Quota", icon: "chart" }, { name: "LimitRange", icon: "shield" }], w: 158 },
    { title: "Configuration Management", items: [{ name: "Config Sync", icon: "repeat" }, { name: "Policy Sync", icon: "shieldCheck" }, { name: "Drift<br/>Detection", icon: "activity" }], w: 168 },
    { title: "Cluster Security", items: [{ name: "Binary<br/>Auth", icon: "lock" }, { name: "Image<br/>Scanning", icon: "search" }, { name: "Admission<br/>Control", icon: "shieldCheck" }], w: 168 },
    { title: "Cluster Observability", items: [{ name: "Health<br/>Checks", icon: "activity" }, { name: "Cluster<br/>Logging", icon: "fileCode" }, { name: "Metrics", icon: "chart" }], w: 168 }
  ];

  curX = 146;
  cmBoxes.forEach((cb, idx) => {
    cell(`t3_sub_${idx}_box`, "", curX, 416, cb.w, 62, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1;");
    cell(`t3_sub_${idx}_hdr`, `<b style="font-size:7px;color:#0F172A;">${cb.title}</b>`, curX, 418, cb.w, 12, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
    const itmWidth = Math.floor((cb.w - 8) / cb.items.length);
    cb.items.forEach((itm, itmIdx) => {
      const ix = curX + 4 + itmIdx * itmWidth;
      const itmHtml = `<div style="text-align:center;">
        <div style="display:flex;justify-content:center;margin-bottom:3px;">${svgIcon(itm.icon as any, "#059669", 12)}</div>
        <div style="font-size:6px;font-weight:700;color:#334155;line-height:1.1;">${itm.name}</div>
      </div>`;
      cell(`t3_sub_${idx}_i_${itmIdx}`, itmHtml, ix, 432, itmWidth, 42, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
    });
    curX += cb.w + 6;
  });

  cell("t3_btm_bar", `<div style="display:flex;align-items:center;justify-content:center;gap:14px;font-size:7.5px;font-weight:800;color:#16A34A;">
    <span>Central Management (Multi-cluster)</span> • <span>Policy Enforcement</span> • <span>Compliance</span> • <span>Inventory</span> • <span>Drift Detection</span>
  </div>`, 146, 484, 1002, 22, "rounded=1;arcSize=10;fillColor=#F0FDF4;strokeColor=#BBF7D0;strokeWidth=1;html=1;align=center;verticalAlign=middle;");

  // -------------------------------------------------------------------------
  // TIER 2: KUBERNETES RUNTIME LAYER (y: 522, h: 104)
  // -------------------------------------------------------------------------
  cell("t2_frame", "", 16, 522, 1140, 104, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("t2_badge", "2", 24, 528, 22, 22, "rounded=1;arcSize=6;fillColor=#EA580C;fontColor=#FFFFFF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t2_lbl", `<b style="font-size:8.5px;color:#EA580C;">KUBERNETES<br/>RUNTIME LAYER</b><br/><span style="font-size:6.5px;color:#64748B;line-height:1.2;">Run • Scale • Secure<br/>• Connect</span>`, 50, 528, 92, 44, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  const rtBoxes = [
    { title: "GKE Capabilities", items: [{ name: "Autopilot", icon: "cloud" }, { name: "Standard", icon: "server" }, { name: "Node<br/>Pools", icon: "layers" }, { name: "Shielded<br/>Nodes", icon: "shieldCheck" }, { name: "Workload<br/>Identity", icon: "key" }], w: 308 },
    { title: "Workload Management", items: [{ name: "Deployments", icon: "layers" }, { name: "StatefulSets", icon: "database" }, { name: "DaemonSets", icon: "server" }, { name: "Jobs", icon: "zap" }, { name: "CronJobs", icon: "repeat" }], w: 326 },
    { title: "Platform Add-ons", items: [{ name: "CNI (VPC<br/>Native)", icon: "network" }, { name: "CSI Drivers", icon: "database" }, { name: "CoreDNS", icon: "globe" }, { name: "Metrics<br/>Server", icon: "chart" }, { name: "Cluster<br/>Autoscaler", icon: "repeat" }], w: 356 }
  ];

  curX = 146;
  rtBoxes.forEach((rb, idx) => {
    cell(`t2_sub_${idx}_box`, "", curX, 528, rb.w, 62, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1;");
    cell(`t2_sub_${idx}_hdr`, `<b style="font-size:7px;color:#0F172A;">${rb.title}</b>`, curX, 530, rb.w, 12, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
    const itmWidth = Math.floor((rb.w - 8) / rb.items.length);
    rb.items.forEach((itm, itmIdx) => {
      const ix = curX + 4 + itmIdx * itmWidth;
      const itmHtml = `<div style="text-align:center;">
        <div style="display:flex;justify-content:center;margin-bottom:3px;">${svgIcon(itm.icon as any, "#EA580C", 12)}</div>
        <div style="font-size:6px;font-weight:700;color:#334155;line-height:1.1;">${itm.name}</div>
      </div>`;
      cell(`t2_sub_${idx}_i_${itmIdx}`, itmHtml, ix, 544, itmWidth, 42, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
    });
    curX += rb.w + 6;
  });

  cell("t2_btm_bar", `<div style="display:flex;align-items:center;justify-content:space-around;width:100%;font-size:7.5px;font-weight:800;color:#0F172A;">
    <span style="display:flex;align-items:center;gap:4px;">${svgIcon("k8s", "#1D4ED8", 13)} <b>Kubernetes API Server</b></span>
    <span style="display:flex;align-items:center;gap:4px;">${svgIcon("database", "#EA580C", 13)} <b>etcd Key-Value Store</b></span>
    <span style="display:flex;align-items:center;gap:4px;">${svgIcon("settings", "#2563EB", 13)} <b>kube-scheduler</b></span>
    <span style="display:flex;align-items:center;gap:4px;">${svgIcon("repeat", "#16A34A", 13)} <b>kube-controller-manager</b></span>
  </div>`, 146, 596, 1002, 22, "rounded=1;arcSize=10;fillColor=#FFF7ED;strokeColor=#FFEDD5;strokeWidth=1;html=1;align=center;verticalAlign=middle;");

  // -------------------------------------------------------------------------
  // TIER 1: INFRASTRUCTURE LAYER (y: 634, h: 96)
  // -------------------------------------------------------------------------
  cell("t1_frame", "", 16, 634, 1140, 96, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("t1_badge", "1", 24, 640, 22, 22, "rounded=1;arcSize=6;fillColor=#EA580C;fontColor=#FFFFFF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t1_lbl", `<b style="font-size:8.5px;color:#EA580C;">INFRASTRUCTURE<br/>LAYER</b><br/><span style="font-size:6.5px;color:#64748B;line-height:1.2;">Compute • Network<br/>• Storage • Edge</span>`, 50, 640, 92, 44, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  const infraBoxes = [
    { title: "Compute", items: [{ name: "Compute<br/>Engine", icon: "cpu" }, { name: "GKE Node<br/>Pools", icon: "server" }, { name: "TPU<br/>Pods", icon: "zap" }], w: 205 },
    { title: "Network", items: [{ name: "VPC<br/>Network", icon: "network" }, { name: "Cloud<br/>NAT", icon: "cloud" }, { name: "Cloud<br/>Load Balancing", icon: "repeat" }, { name: "Cloud<br/>Armor", icon: "shield" }], w: 295 },
    { title: "Storage", items: [{ name: "Persistent<br/>Disks", icon: "database" }, { name: "Filestore", icon: "folder" }, { name: "Cloud<br/>Storage", icon: "database" }], w: 225 },
    { title: "Edge & Connectivity", items: [{ name: "Cloud CDN", icon: "globe" }, { name: "Cloud<br/>DNS", icon: "network" }, { name: "Cloud<br/>Interconnect", icon: "repeat" }], w: 255 }
  ];

  curX = 146;
  infraBoxes.forEach((ib, idx) => {
    cell(`t1_sub_${idx}_box`, "", curX, 640, ib.w, 82, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1;");
    cell(`t1_sub_${idx}_hdr`, `<b style="font-size:7px;color:#0F172A;">${ib.title}</b>`, curX, 642, ib.w, 12, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
    const itmWidth = Math.floor((ib.w - 8) / ib.items.length);
    ib.items.forEach((itm, itmIdx) => {
      const ix = curX + 4 + itmIdx * itmWidth;
      const itmHtml = `<div style="text-align:center;">
        <div style="display:flex;justify-content:center;margin-bottom:3px;">${svgIcon(itm.icon as any, "#0284C7", 14)}</div>
        <div style="font-size:6px;font-weight:700;color:#334155;line-height:1.1;">${itm.name}</div>
      </div>`;
      cell(`t1_sub_${idx}_i_${itmIdx}`, itmHtml, ix, 658, itmWidth, 58, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
    });
    curX += ib.w + 6;
  });

  // -------------------------------------------------------------------------
  // TIER 0: GOOGLE CLOUD FOUNDATION (y: 738, h: 84)
  // -------------------------------------------------------------------------
  cell("t0_frame", "", 16, 738, 1140, 84, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("t0_badge", "0", 24, 744, 22, 22, "rounded=1;arcSize=6;fillColor=#DC2626;fontColor=#FFFFFF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t0_lbl", `<b style="font-size:8.5px;color:#DC2626;">GOOGLE CLOUD<br/>FOUNDATION</b><br/><span style="font-size:6.5px;color:#64748B;line-height:1.2;">Global • Reliable • Secure • Sustainable</span>`, 50, 744, 92, 44, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  const fndItems = [
    { title: "Global<br/>Infrastructure", icon: "globe" },
    { title: "Regions &amp;<br/>Zones", icon: "sparkles" },
    { title: "VPC Service<br/>Controls", icon: "shieldCheck" },
    { title: "Identity &amp; Access<br/>Management", icon: "users" },
    { title: "Cloud<br/>KMS", icon: "key" },
    { title: "Cloud<br/>Audit Logs", icon: "fileCode" },
    { title: "Sustainability", icon: "checkCircle" }
  ];

  fndItems.forEach((fi, idx) => {
    const fx = 146 + idx * 110;
    cell(`t0_itm_${idx}_box`, "", fx, 744, 104, 70, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1;");
    const fHtml = `<div style="text-align:center;">
      <div style="display:flex;justify-content:center;margin-bottom:3px;">${svgIcon(fi.icon as any, "#0284C7", 14)}</div>
      <div style="font-size:6.5px;font-weight:700;color:#0F172A;line-height:1.15;">${fi.title}</div>
    </div>`;
    cell(`t0_itm_${idx}_lbl`, fHtml, fx, 748, 104, 62, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  });

  // Foundation Right Pillar Box
  cell("t0_right_box", "", 922, 744, 226, 70, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;");
  const fndRightHtml = `<div style="display:flex;align-items:center;gap:8px;padding:4px;">
    <svg width="28" height="24" viewBox="0 0 24 24" fill="none"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" fill="#4285F4"/></svg>
    <div style="font-size:6.5px;color:#334155;font-weight:700;line-height:1.3;">
      • High Availability<br/>
      • Scalability<br/>
      • Reliability<br/>
      • Sustainability
    </div>
  </div>`;
  cell("t0_right_content", fndRightHtml, 922, 744, 226, 70, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  // =========================================================================
  // 3. RIGHT COLUMN - TIERS 7, 8, 9 (x: 1166, w: 354)
  // =========================================================================

  // -------------------------------------------------------------------------
  // TIER 7: GOVERNANCE & COMPLIANCE (y: 72, h: 242)
  // -------------------------------------------------------------------------
  cell("t7_frame", "", 1166, 72, 354, 242, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("t7_badge", "7", 1172, 78, 22, 22, "rounded=1;arcSize=6;fillColor=#7C3AED;fontColor=#FFFFFF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t7_lbl", `<b style="font-size:8.5px;color:#7C3AED;">GOVERNANCE &amp; COMPLIANCE</b><br/><span style="font-size:7px;color:#64748B;">Governed • Policy-Driven • Compliant</span>`, 1198, 78, 220, 24, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  const govItems = [
    { title: "Policy Management", icon: "shield" },
    { title: "Compliance Frameworks", icon: "shieldCheck" },
    { title: "RBAC &amp; IAM", icon: "user" },
    { title: "Audit &amp; Logging", icon: "fileCode" },
    { title: "Data Protection", icon: "lock" },
    { title: "Regulatory Compliance", icon: "shieldCheck" },
    { title: "Risk Management", icon: "activity" },
    { title: "Evidence Collection", icon: "folder" }
  ];

  govItems.forEach((gi, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const gx = 1174 + col * 168;
    const gy = 108 + row * 37;
    cell(`t7_i_${i}_box`, "", gx, gy, 162, 30, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1;");
    const gHtml = `<div style="display:flex;align-items:center;gap:6px;padding:0 6px;">
      ${svgIcon(gi.icon as any, "#7C3AED", 12)}
      <span style="font-size:7px;font-weight:700;color:#0F172A;">${gi.title}</span>
    </div>`;
    cell(`t7_i_${i}_lbl`, gHtml, gx, gy, 162, 30, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  });

  cell("t7_scorecard", `<div style="display:flex;align-items:center;justify-content:center;gap:6px;font-size:7.5px;font-weight:800;color:#7C3AED;">
    ${svgIcon("chart", "#7C3AED", 12)} Platform Scorecard
  </div>`, 1174, 276, 336, 28, "rounded=1;arcSize=8;fillColor=#FAF5FF;strokeColor=#E9D5FF;strokeWidth=1;html=1;align=center;verticalAlign=middle;");

  // -------------------------------------------------------------------------
  // TIER 8: OBSERVABILITY & OPERATIONS (y: 322, h: 252)
  // -------------------------------------------------------------------------
  cell("t8_frame", "", 1166, 322, 354, 252, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("t8_badge", "8", 1172, 328, 22, 22, "rounded=1;arcSize=6;fillColor=#16A34A;fontColor=#FFFFFF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t8_lbl", `<b style="font-size:8.5px;color:#16A34A;">OBSERVABILITY &amp; OPERATIONS</b><br/><span style="font-size:7px;color:#64748B;">Monitor • Detect • Respond</span>`, 1198, 328, 220, 24, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  const obsItems = [
    { title: "Unified Monitoring", icon: "chart" },
    { title: "Centralized Logging", icon: "fileCode" },
    { title: "Distributed Tracing", icon: "activity" },
    { title: "SLO / SLIs", icon: "chart" },
    { title: "Alerting &amp; On-call", icon: "shieldAlert" },
    { title: "Incident Management", icon: "shield" },
    { title: "Runbooks", icon: "folder" },
    { title: "ChatOps", icon: "sparkles" }
  ];

  obsItems.forEach((oi, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const ox = 1174 + col * 168;
    const oy = 358 + row * 37;
    cell(`t8_i_${i}_box`, "", ox, oy, 162, 30, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1;");
    const oHtml = `<div style="display:flex;align-items:center;gap:6px;padding:0 6px;">
      ${svgIcon(oi.icon as any, "#16A34A", 12)}
      <span style="font-size:7px;font-weight:700;color:#0F172A;">${oi.title}</span>
    </div>`;
    cell(`t8_i_${i}_lbl`, oHtml, ox, oy, 162, 30, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  });

  cell("t8_dashboard", `<div style="display:flex;align-items:center;justify-content:center;gap:6px;font-size:7.5px;font-weight:800;color:#16A34A;">
    ${svgIcon("monitor", "#16A34A", 12)} Operations Dashboard
  </div>`, 1174, 532, 336, 28, "rounded=1;arcSize=8;fillColor=#F0FDF4;strokeColor=#BBF7D0;strokeWidth=1;html=1;align=center;verticalAlign=middle;");

  // -------------------------------------------------------------------------
  // TIER 9: PLATFORM OPERATIONS (y: 582, h: 240)
  // -------------------------------------------------------------------------
  cell("t9_frame", "", 1166, 582, 354, 240, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("t9_badge", "9", 1172, 588, 22, 22, "rounded=1;arcSize=6;fillColor=#EA580C;fontColor=#FFFFFF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t9_lbl", `<b style="font-size:8.5px;color:#EA580C;">PLATFORM OPERATIONS</b><br/><span style="font-size:7px;color:#64748B;">Operate • Optimize • Evolve</span>`, 1198, 588, 220, 24, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  const opsItems = [
    { title: "Release Management", icon: "repeat" },
    { title: "Change Management", icon: "settings" },
    { title: "Capacity Management", icon: "chart" },
    { title: "Performance Tuning", icon: "activity" },
    { title: "Cost Management", icon: "dollarSign" },
    { title: "FinOps", icon: "chart" },
    { title: "Patch Management", icon: "settings" },
    { title: "Backup &amp; DR", icon: "database" }
  ];

  opsItems.forEach((op, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const opx = 1174 + col * 168;
    const opy = 618 + row * 36;
    cell(`t9_i_${i}_box`, "", opx, opy, 162, 30, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1;");
    const opHtml = `<div style="display:flex;align-items:center;gap:6px;padding:0 6px;">
      ${svgIcon(op.icon as any, "#EA580C", 12)}
      <span style="font-size:7px;font-weight:700;color:#0F172A;">${op.title}</span>
    </div>`;
    cell(`t9_i_${i}_lbl`, opHtml, opx, opy, 162, 30, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  });

  cell("t9_roadmap", `<div style="display:flex;align-items:center;justify-content:center;gap:6px;font-size:7.5px;font-weight:800;color:#EA580C;">
    ${svgIcon("chart", "#EA580C", 12)} Roadmap &amp; Continuous Improvement
  </div>`, 1174, 782, 336, 28, "rounded=1;arcSize=8;fillColor=#FFF7ED;strokeColor=#FFEDD5;strokeWidth=1;html=1;align=center;verticalAlign=middle;");

  // =========================================================================
  // 4. BOTTOM PANELS: DATA FLOW LEGEND, PLATFORM PRINCIPLES, LEGEND (LAYERS)
  // (y: 830, h: 84)
  // =========================================================================

  // DATA FLOW LEGEND (w: 240)
  cell("btm_flow_box", "", 16, 830, 240, 84, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("btm_flow_hdr", `<b style="font-size:7.5px;color:#0F172A;">DATA FLOW LEGEND</b>`, 16, 834, 240, 14, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  const flowLegendHtml = `<div style="padding:4px 12px;font-size:7px;color:#334155;display:flex;flex-direction:column;gap:6px;">
    <div style="display:flex;align-items:center;gap:8px;">
      <span style="display:inline-block;width:30px;height:0px;border-top:2px dashed #2563EB;"></span>
      <span style="font-weight:600;">Request / Traffic</span>
    </div>
    <div style="display:flex;align-items:center;gap:8px;">
      <span style="display:inline-block;width:30px;height:0px;border-top:2px dashed #16A34A;"></span>
      <span style="font-weight:600;">Control / Management</span>
    </div>
    <div style="display:flex;align-items:center;gap:8px;">
      <span style="display:inline-block;width:30px;height:0px;border-top:2px dashed #7C3AED;"></span>
      <span style="font-weight:600;">Data / Event</span>
    </div>
  </div>`;
  cell("btm_flow_content", flowLegendHtml, 16, 848, 240, 62, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  // PLATFORM PRINCIPLES (w: 680)
  cell("btm_princ_box", "", 264, 830, 680, 84, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("btm_princ_hdr", `<b style="font-size:7.5px;color:#0F172A;">PLATFORM PRINCIPLES</b>`, 264, 834, 680, 14, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  
  const principles = [
    { title: "Self-Service<br/>by Default", icon: "user" },
    { title: "Security<br/>by Design", icon: "shieldCheck" },
    { title: "Automate<br/>Everything", icon: "settings" },
    { title: "Policy<br/>as Code", icon: "fileCode" },
    { title: "Observable<br/>by Design", icon: "activity" },
    { title: "Developer<br/>Experience", icon: "users" },
    { title: "Cost<br/>Optimized", icon: "dollarSign" }
  ];
  principles.forEach((pr, idx) => {
    const px = 272 + idx * 95;
    const prHtml = `<div style="text-align:center;">
      <div style="display:flex;justify-content:center;margin-bottom:3px;">${svgIcon(pr.icon as any, "#0284C7", 14)}</div>
      <div style="font-size:6.5px;font-weight:700;color:#0F172A;line-height:1.15;">${pr.title}</div>
    </div>`;
    cell(`btm_pr_${idx}`, prHtml, px, 850, 90, 60, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  });

  // LEGEND (LAYERS) (w: 568, from 952 to 1520)
  cell("btm_layers_box", "", 952, 830, 568, 84, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("btm_layers_hdr", `<b style="font-size:7.5px;color:#0F172A;">LEGEND (Layers)</b>`, 952, 834, 568, 14, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  const layerPills = [
    { num: "0", name: "Foundation", color: "#DC2626" },
    { num: "1", name: "Infrastructure", color: "#EA580C" },
    { num: "2", name: "Runtime", color: "#EA580C" },
    { num: "3", name: "Management", color: "#16A34A" },
    { num: "4", name: "Platform Engineering", color: "#1D4ED8" },
    { num: "5", name: "Platform Services", color: "#1D4ED8" },
    { num: "6", name: "Consumer", color: "#1D4ED8" },
    { num: "7", name: "Governance", color: "#7C3AED" },
    { num: "8", name: "Observability", color: "#16A34A" },
    { num: "9", name: "Operations", color: "#EA580C" }
  ];

  layerPills.forEach((lp, idx) => {
    const row = Math.floor(idx / 5);
    const col = idx % 5;
    const lx = 960 + col * 110;
    const ly = 852 + row * 26;
    const lpHtml = `<div style="display:flex;align-items:center;gap:4px;">
      <span style="display:inline-flex;align-items:center;justify-content:center;width:14px;height:14px;background-color:${lp.color};color:#FFFFFF;font-size:7.5px;font-weight:900;border-radius:3px;">${lp.num}</span>
      <span style="font-size:7px;font-weight:700;color:#334155;">${lp.name}</span>
    </div>`;
    cell(`btm_lp_${idx}`, lpHtml, lx, ly, 106, 22, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  });

  // =========================================================================
  // 5. CONNECTOR ARROWS & DATA FLOWS
  // =========================================================================
  rawEdge("flow_t6_t5", "edgeStyle=none;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=1.5;dashed=1;dashPattern=4 3;endArrow=classic;endFill=1;", [
    { x: 364, y: 168 },
    { x: 364, y: 176 }
  ]);

  rawEdge("flow_t5_t4", "edgeStyle=none;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=1.5;dashed=1;dashPattern=4 3;endArrow=classic;endFill=1;", [
    { x: 586, y: 290 },
    { x: 586, y: 298 }
  ]);

  rawEdge("flow_t4_t3", "edgeStyle=none;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16A34A;strokeWidth=1.5;dashed=1;dashPattern=4 3;endArrow=classic;endFill=1;", [
    { x: 586, y: 402 },
    { x: 586, y: 410 }
  ]);

  rawEdge("flow_t3_t2", "edgeStyle=none;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#EA580C;strokeWidth=1.5;dashed=1;dashPattern=4 3;endArrow=classic;endFill=1;", [
    { x: 586, y: 514 },
    { x: 586, y: 522 }
  ]);

  rawEdge("flow_t2_t1", "edgeStyle=none;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#EA580C;strokeWidth=1.5;dashed=1;dashPattern=4 3;endArrow=classic;endFill=1;", [
    { x: 586, y: 626 },
    { x: 586, y: 634 }
  ]);

  rawEdge("flow_t1_t0", "edgeStyle=none;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#DC2626;strokeWidth=1.5;dashed=1;dashPattern=4 3;endArrow=classic;endFill=1;", [
    { x: 586, y: 730 },
    { x: 586, y: 738 }
  ]);

  // Horizontal cross-column arrows
  rawEdge("flow_cross_gov", "edgeStyle=none;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#7C3AED;strokeWidth=1.5;dashed=1;dashPattern=4 3;endArrow=classic;endFill=1;", [
    { x: 1156, y: 190 },
    { x: 1166, y: 190 }
  ]);

  rawEdge("flow_cross_obs", "edgeStyle=none;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16A34A;strokeWidth=1.5;dashed=1;dashPattern=4 3;endArrow=classic;endFill=1;", [
    { x: 1156, y: 445 },
    { x: 1166, y: 445 }
  ]);

  rawEdge("flow_cross_ops", "edgeStyle=none;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#EA580C;strokeWidth=1.5;dashed=1;dashPattern=4 3;endArrow=classic;endFill=1;", [
    { x: 1156, y: 700 },
    { x: 1166, y: 700 }
  ]);

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_46" name="Enterprise Kubernetes &amp; Platform Engineering">
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
