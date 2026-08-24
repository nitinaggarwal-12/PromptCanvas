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
  shieldAlert: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>`,
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
  fileCode: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><polyline points="10 13 8 15 10 17"/><polyline points="14 13 16 15 14 17"/></svg>`,
  settings: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  refresh: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>`,
  globe: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  bell: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>`,
  flame: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`
};

function svgIcon(name: keyof typeof SVG, color: string = "#1E293B", size: number = 14): string {
  const icon = SVG[name] || SVG.shield;
  return icon
    .replace('width="24"', `width="${size}"`)
    .replace('height="24"', `height="${size}"`)
    .replace(/currentColor/g, color);
}

export function generateTemplate48BcdrCyberRecoveryResilienceXml(
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
  cell("hdr_num", "48", 16, 12, 54, 48, "shape=rectangle;rounded=1;arcSize=14;fillColor=#1D4ED8;strokeColor=#1D4ED8;fontColor=#FFFFFF;fontSize=26;fontStyle=1;align=center;verticalAlign=middle;");

  const titleHtml = `<div style="font-size:19px;font-weight:900;color:#0F172A;letter-spacing:0.5px;">BCDR, CYBER RECOVERY &amp; OPERATIONAL RESILIENCE</div>
    <div style="font-size:10.5px;color:#475569;font-weight:600;margin-top:3px;">Resilient by Design • Recover with Confidence • Continuity Assured</div>`;
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
  // TIER 7: RESILIENCE CONSUMERS & BUSINESS VALUE (y: 68, h: 84)
  // -------------------------------------------------------------------------
  cell("t7_frame", "", 16, 68, 1140, 84, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("t7_badge", "7", 24, 74, 22, 22, "rounded=1;arcSize=6;fillColor=#7C3AED;fontColor=#FFFFFF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t7_lbl", `<b style="font-size:7.5px;color:#7C3AED;">RESILIENCE CONSUMERS<br/>&amp; BUSINESS VALUE</b><br/><span style="font-size:6.5px;color:#64748B;line-height:1.1;">Assure Continuity<br/>Protect Value • Build Trust</span>`, 50, 74, 110, 32, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  const t7Groups = [
    { title: "Executives &amp; Board", items: [{ t: "Risk Posture Visibility", ic: "shield" }, { t: "Continuity Assurance", ic: "checkCircle" }] },
    { title: "Business Units", items: [{ t: "Critical Service Continuity", ic: "activity" }, { t: "SLA Assurance", ic: "repeat" }] },
    { title: "IT &amp; Operations", items: [{ t: "Recovery Assurance", ic: "refresh" }, { t: "Resilience Dashboards", ic: "chart" }] },
    { title: "Customers &amp; Partners", items: [{ t: "Trusted Service Experience", ic: "users" }, { t: "Compliance Confidence", ic: "shieldCheck" }] },
    { title: "Regulators &amp; Auditors", items: [{ t: "Audit Evidence &amp; Reports", ic: "fileCode" }, { t: "Regulatory Compliance", ic: "lock" }] }
  ];

  t7Groups.forEach((grp, i) => {
    const gx = 166 + i * 196;
    cell(`t7_g_${i}`, "", gx, 74, 190, 72, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;");
    cell(`t7_gh_${i}`, `<b style="font-size:7.5px;color:#0F172A;">${grp.title}</b>`, gx + 6, 76, 178, 14, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
    grp.items.forEach((it, j) => {
      const ix = gx + 6 + j * 90;
      cell(`t7_gi_${i}_${j}`, "", ix, 92, 86, 48, "rounded=1;arcSize=4;fillColor=#FAF5FF;strokeColor=#E9D5FF;strokeWidth=1;");
      const ic = svgIcon(it.ic as keyof typeof SVG, "#7C3AED", 12);
      cell(`t7_git_${i}_${j}`, `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;">${ic}<div style="font-size:6.5px;font-weight:700;color:#6B21A8;text-align:center;line-height:1.1;">${it.t}</div></div>`, ix, 92, 86, 48, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
    });
  });

  // -------------------------------------------------------------------------
  // TIER 6: RESILIENCE ORCHESTRATION & AUTOMATION LAYER (y: 156, h: 96)
  // -------------------------------------------------------------------------
  cell("t6_frame", "", 16, 156, 1140, 96, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("t6_badge", "6", 24, 162, 22, 22, "rounded=1;arcSize=6;fillColor=#1D4ED8;fontColor=#FFFFFF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t6_lbl", `<b style="font-size:7.5px;color:#1D4ED8;">RESILIENCE ORCHESTRATION<br/>&amp; AUTOMATION LAYER</b><br/><span style="font-size:6.5px;color:#64748B;line-height:1.1;">Orchestrate • Automate<br/>Validate • Govern</span>`, 50, 162, 110, 32, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  const t6Cards = [
    { title: "Resilience Orchestration", desc: "Runbooks &amp; Playbooks", icon: "fileCode" },
    { title: "Recovery Workflows", desc: "Automated Failover<br/>Approval Workflows", icon: "refresh" },
    { title: "Testing &amp; Validation", desc: "Simulations &amp; Drills<br/>Continuous Validation", icon: "shieldCheck" },
    { title: "Chaos Engineering", desc: "Fault Injection<br/>Resilience Experiments", icon: "flame" },
    { title: "Communication Mgmt", desc: "Notifications<br/>Escalations", icon: "bell" },
    { title: "Evidence &amp; Reporting", desc: "Audit Trails<br/>Compliance Reports", icon: "database" }
  ];

  t6Cards.forEach((cItem, i) => {
    const cx = 166 + i * 162;
    cell(`t6_c_${i}`, "", cx, 162, 156, 60, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;");
    const ic = svgIcon(cItem.icon as keyof typeof SVG, "#1D4ED8", 12);
    cell(`t6_c_hdr_${i}`, `<div style="display:flex;align-items:center;gap:4px;">${ic}<b style="font-size:7.5px;color:#0F172A;">${cItem.title}</b></div>`, cx + 4, 164, 148, 16, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
    cell(`t6_c_bdy_${i}`, `<div style="font-size:7px;color:#475569;line-height:1.2;padding-top:2px;">${cItem.desc}</div>`, cx + 6, 180, 144, 38, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");
  });

  // Tier 6 Sub-strip
  cell("t6_strip", "", 166, 226, 984, 18, "rounded=1;arcSize=6;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1;");
  const t6Pills = "Policy as Code • Guardrails • RBAC &amp; Separation of Duties • Change Control • Audit &amp; Compliance";
  cell("t6_strip_txt", `<div style="font-size:7px;font-weight:700;color:#1E40AF;text-align:center;">${t6Pills}</div>`, 166, 226, 984, 18, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // -------------------------------------------------------------------------
  // TIER 5: BUSINESS CONTINUITY & DISASTER RECOVERY LAYER (y: 256, h: 96)
  // -------------------------------------------------------------------------
  cell("t5_frame", "", 16, 256, 1140, 96, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("t5_badge", "5", 24, 262, 22, 22, "rounded=1;arcSize=6;fillColor=#0284C7;fontColor=#FFFFFF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t5_lbl", `<b style="font-size:7.5px;color:#0284C7;">BUSINESS CONTINUITY &amp;<br/>DISASTER RECOVERY LAYER</b><br/><span style="font-size:6.5px;color:#64748B;line-height:1.1;">Plan • Protect • Recover<br/>Restore • Resume</span>`, 50, 262, 110, 32, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  const t5Cards = [
    { title: "Business Impact Analysis", desc: "Critical Services<br/>RTO / RPO Targets", icon: "activity" },
    { title: "DR Strategy &amp; Design", desc: "Multi-Site<br/>Active-Active / Active-Passive", icon: "layers" },
    { title: "Data Protection", desc: "Backups<br/>Replication", icon: "database" },
    { title: "Recovery Execution", desc: "Failover<br/>Failback", icon: "refresh" },
    { title: "Application Recovery", desc: "Stateful Apps<br/>Dependencies", icon: "cpu" },
    { title: "Service Restoration", desc: "Validate<br/>Resume Operations", icon: "checkCircle" }
  ];

  t5Cards.forEach((cItem, i) => {
    const cx = 166 + i * 162;
    cell(`t5_c_${i}`, "", cx, 262, 156, 60, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;");
    const ic = svgIcon(cItem.icon as keyof typeof SVG, "#0284C7", 12);
    cell(`t5_c_hdr_${i}`, `<div style="display:flex;align-items:center;gap:4px;">${ic}<b style="font-size:7.5px;color:#0F172A;">${cItem.title}</b></div>`, cx + 4, 264, 148, 16, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
    cell(`t5_c_bdy_${i}`, `<div style="font-size:7px;color:#475569;line-height:1.2;padding-top:2px;">${cItem.desc}</div>`, cx + 6, 280, 144, 38, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");
  });

  // Tier 5 Sub-strip
  cell("t5_strip", "", 166, 326, 984, 18, "rounded=1;arcSize=6;fillColor=#E0F2FE;strokeColor=#BAE6FD;strokeWidth=1;");
  const t5Pills = "RTO / RPO Management • Prioritization • Dependency Mapping • Recovery Strategies";
  cell("t5_strip_txt", `<div style="font-size:7px;font-weight:700;color:#0369A1;text-align:center;">${t5Pills}</div>`, 166, 326, 984, 18, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // -------------------------------------------------------------------------
  // TIER 4: DATA PROTECTION LAYER (y: 356, h: 96)
  // -------------------------------------------------------------------------
  cell("t4_frame", "", 16, 356, 1140, 96, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("t4_badge", "4", 24, 362, 22, 22, "rounded=1;arcSize=6;fillColor=#059669;fontColor=#FFFFFF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t4_lbl", `<b style="font-size:7.5px;color:#059669;">DATA PROTECTION LAYER</b><br/><span style="font-size:6.5px;color:#64748B;line-height:1.1;">Protect • Replicate • Retain<br/>Encrypt • Verify</span>`, 50, 362, 110, 32, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  const t4Cards = [
    { title: "Backup &amp; Snapshots", desc: "Automated Backups<br/>Point-in-Time Recovery", icon: "database" },
    { title: "Replication", desc: "Cross-Region<br/>Cross-Project Replication", icon: "repeat" },
    { title: "Immutable Storage", desc: "WORM<br/>Object Lock", icon: "lock" },
    { title: "Data Verification", desc: "Checksum Validation<br/>Backup Verification", icon: "shieldCheck" },
    { title: "Retention &amp; Lifecycle", desc: "Retention Policies<br/>Lifecycle Management", icon: "refresh" },
    { title: "Encryption &amp; KMS", desc: "Encryption At Rest<br/>Key Mgmt (KMS)", icon: "key" }
  ];

  t4Cards.forEach((cItem, i) => {
    const cx = 166 + i * 162;
    cell(`t4_c_${i}`, "", cx, 362, 156, 60, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;");
    const ic = svgIcon(cItem.icon as keyof typeof SVG, "#059669", 12);
    cell(`t4_c_hdr_${i}`, `<div style="display:flex;align-items:center;gap:4px;">${ic}<b style="font-size:7.5px;color:#0F172A;">${cItem.title}</b></div>`, cx + 4, 364, 148, 16, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
    cell(`t4_c_bdy_${i}`, `<div style="font-size:7px;color:#475569;line-height:1.2;padding-top:2px;">${cItem.desc}</div>`, cx + 6, 380, 144, 38, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");
  });

  // Tier 4 Sub-strip
  cell("t4_strip", "", 166, 426, 984, 18, "rounded=1;arcSize=6;fillColor=#F0FDF4;strokeColor=#BBF7D0;strokeWidth=1;");
  const t4Pills = "Data Classification • Retention Policies • Legal Hold • Data Sovereignty";
  cell("t4_strip_txt", `<div style="font-size:7px;font-weight:700;color:#166534;text-align:center;">${t4Pills}</div>`, 166, 426, 984, 18, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // -------------------------------------------------------------------------
  // TIER 3: INFRASTRUCTURE RESILIENCE LAYER (y: 456, h: 96)
  // -------------------------------------------------------------------------
  cell("t3_frame", "", 16, 456, 1140, 96, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("t3_badge", "3", 24, 462, 22, 22, "rounded=1;arcSize=6;fillColor=#D97706;fontColor=#FFFFFF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t3_lbl", `<b style="font-size:7.5px;color:#D97706;">INFRASTRUCTURE RESILIENCE<br/>LAYER</b><br/><span style="font-size:6.5px;color:#64748B;line-height:1.1;">Distribute • Isolate • Harden<br/>Monitor • Heal</span>`, 50, 462, 110, 32, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  const t3Cards = [
    { title: "Multi-Region Arch", desc: "Multi-Region Deployment<br/>Region Diversity", icon: "globe" },
    { title: "HA &amp; Fault Tolerance", desc: "Auto Healing<br/>Health Checks", icon: "activity" },
    { title: "Network Resilience", desc: "Global Load Balancing<br/>Network Segmentation", icon: "network" },
    { title: "Edge &amp; CDN Resilience", desc: "Cloud CDN<br/>Edge Failover", icon: "cloud" },
    { title: "Infra Hardening", desc: "Patching<br/>Config Hardening", icon: "shield" },
    { title: "Monitoring &amp; Alerting", desc: "Uptime Monitoring<br/>Alert Escalation", icon: "bell" }
  ];

  t3Cards.forEach((cItem, i) => {
    const cx = 166 + i * 162;
    cell(`t3_c_${i}`, "", cx, 462, 156, 60, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;");
    const ic = svgIcon(cItem.icon as keyof typeof SVG, "#D97706", 12);
    cell(`t3_c_hdr_${i}`, `<div style="display:flex;align-items:center;gap:4px;">${ic}<b style="font-size:7.5px;color:#0F172A;">${cItem.title}</b></div>`, cx + 4, 464, 148, 16, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
    cell(`t3_c_bdy_${i}`, `<div style="font-size:7px;color:#475569;line-height:1.2;padding-top:2px;">${cItem.desc}</div>`, cx + 6, 480, 144, 38, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");
  });

  // Tier 3 Sub-strip
  cell("t3_strip", "", 166, 526, 984, 18, "rounded=1;arcSize=6;fillColor=#FEF3C7;strokeColor=#FDE68A;strokeWidth=1;");
  const t3Pills = "Redundancy • Isolation • Least Privilege • Immutable Infrastructure • Self-Healing";
  cell("t3_strip_txt", `<div style="font-size:7px;font-weight:700;color:#92400E;text-align:center;">${t3Pills}</div>`, 166, 526, 984, 18, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // -------------------------------------------------------------------------
  // TIER 2: FOUNDATION SERVICES LAYER (y: 556, h: 74)
  // -------------------------------------------------------------------------
  cell("t2_frame", "", 16, 556, 1140, 74, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("t2_badge", "2", 24, 562, 22, 22, "rounded=1;arcSize=6;fillColor=#EA580C;fontColor=#FFFFFF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t2_lbl", `<b style="font-size:7.5px;color:#EA580C;">FOUNDATION SERVICES LAYER</b><br/><span style="font-size:6.5px;color:#64748B;line-height:1.1;">Build • Integrate • Secure<br/>Automate • Observe</span>`, 50, 562, 110, 32, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  const t2Services = [
    { title: "Compute", sub: "(GKE / VMs)", icon: "cpu" },
    { title: "Storage", sub: "(Cloud Storage)", icon: "cloud" },
    { title: "Database", sub: "(Cloud SQL / Spanner)", icon: "database" },
    { title: "Messaging", sub: "(Pub/Sub)", icon: "network" },
    { title: "Serverless", sub: "(Cloud Run / Func)", icon: "zap" },
    { title: "Identity &amp; Access", sub: "(IAM)", icon: "shieldCheck" },
    { title: "Secrets", sub: "Manager", icon: "key" },
    { title: "Logging", sub: "&amp; Audit", icon: "fileCode" },
    { title: "Monitoring", sub: "(Cloud Ops)", icon: "activity" },
    { title: "Service Mesh", sub: "(Istio)", icon: "layers" }
  ];

  t2Services.forEach((srv, i) => {
    const sx = 166 + i * 98;
    cell(`t2_s_${i}`, "", sx, 562, 94, 60, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;");
    const ic = svgIcon(srv.icon as keyof typeof SVG, "#EA580C", 12);
    cell(`t2_st_${i}`, `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;">${ic}<b style="font-size:7px;color:#0F172A;text-align:center;">${srv.title}</b><span style="font-size:6px;color:#64748B;text-align:center;">${srv.sub}</span></div>`, sx, 562, 94, 60, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  });

  // -------------------------------------------------------------------------
  // TIER 1: FOUNDATION INFRASTRUCTURE LAYER (y: 634, h: 74)
  // -------------------------------------------------------------------------
  cell("t1_frame", "", 16, 634, 1140, 74, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("t1_badge", "1", 24, 640, 22, 22, "rounded=1;arcSize=6;fillColor=#DC2626;fontColor=#FFFFFF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t1_lbl", `<b style="font-size:7.5px;color:#DC2626;">FOUNDATION INFRASTRUCTURE<br/>LAYER</b><br/><span style="font-size:6.5px;color:#64748B;line-height:1.1;">Global • Secure • Scalable<br/>Sustainable</span>`, 50, 640, 110, 32, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  const t1Infra = [
    { title: "Google Global<br/>Network", icon: "globe" },
    { title: "Regions &amp;<br/>Zones", icon: "layers" },
    { title: "Edge<br/>Locations", icon: "network" },
    { title: "Private Service<br/>Connect", icon: "shieldCheck" },
    { title: "DDoS Protection<br/>(Cloud Armor)", icon: "shield" },
    { title: "Data Centers<br/>(Secure Facilities)", icon: "server" },
    { title: "Sustainability<br/>&amp; Efficiency", icon: "sparkles" },
    { title: "Cross-Region<br/>Interconnect", icon: "repeat" }
  ];

  t1Infra.forEach((inf, i) => {
    const ix = 166 + i * 122;
    cell(`t1_i_${i}`, "", ix, 640, 118, 60, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;");
    const ic = svgIcon(inf.icon as keyof typeof SVG, "#DC2626", 12);
    cell(`t1_it_${i}`, `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;">${ic}<div style="font-size:6.5px;font-weight:700;color:#0F172A;text-align:center;line-height:1.1;">${inf.title}</div></div>`, ix, 640, 118, 60, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  });

  // -------------------------------------------------------------------------
  // TIER 0: RESILIENCE FOUNDATION (y: 712, h: 74)
  // -------------------------------------------------------------------------
  cell("t0_frame", "", 16, 712, 1140, 74, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("t0_badge", "0", 24, 718, 22, 22, "rounded=1;arcSize=6;fillColor=#991B1B;fontColor=#FFFFFF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t0_lbl", `<b style="font-size:7.5px;color:#991B1B;">RESILIENCE FOUNDATION</b><br/><span style="font-size:6.5px;color:#64748B;line-height:1.1;">Governance • Standards • Culture<br/>Continuous Improvement</span>`, 50, 718, 110, 32, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  const t0Foundations = [
    { title: "Resilience<br/>Governance", icon: "shield" },
    { title: "Policies &amp;<br/>Standards", icon: "fileCode" },
    { title: "Risk<br/>Management", icon: "activity" },
    { title: "Training &amp;<br/>Awareness", icon: "users" },
    { title: "Continuous<br/>Improvement", icon: "repeat" },
    { title: "Metrics &amp;<br/>KPIs", icon: "chart" },
    { title: "Lessons<br/>Learned", icon: "checkCircle" },
    { title: "Vendor &amp; Third-Party<br/>Resilience", icon: "network" }
  ];

  t0Foundations.forEach((fnd, i) => {
    const fx = 166 + i * 122;
    cell(`t0_f_${i}`, "", fx, 718, 118, 60, "rounded=1;arcSize=4;fillColor=#FEF2F2;strokeColor=#FECACA;strokeWidth=1;");
    const ic = svgIcon(fnd.icon as keyof typeof SVG, "#991B1B", 12);
    cell(`t0_ft_${i}`, `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;">${ic}<div style="font-size:6.5px;font-weight:700;color:#991B1B;text-align:center;line-height:1.1;">${fnd.title}</div></div>`, fx, 718, 118, 60, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  });

  // =========================================================================
  // 3. RIGHT SIDEBAR (x: 1166, w: 354)
  // =========================================================================

  // -------------------------------------------------------------------------
  // TIER 8: GOVERNANCE, RISK & COMPLIANCE (y: 68, h: 220)
  // -------------------------------------------------------------------------
  cell("t8_frame", "", 1166, 68, 354, 220, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("t8_badge", "8", 1174, 74, 22, 22, "rounded=1;arcSize=6;fillColor=#7C3AED;fontColor=#FFFFFF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t8_lbl", `<b style="font-size:8.5px;color:#7C3AED;">GOVERNANCE, RISK &amp; COMPLIANCE</b><br/><span style="font-size:7px;color:#64748B;">Governed • Risk-Aware • Compliant</span>`, 1202, 74, 308, 22, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  const t8Items = [
    { title: "BC/DR Policies<br/>&amp; Standards", icon: "shield" },
    { title: "Risk Assessment<br/>&amp; Analysis", icon: "activity" },
    { title: "Compliance<br/>Management", icon: "checkCircle" },
    { title: "Regulatory<br/>Requirements", icon: "fileCode" },
    { title: "Audit &amp; Logging", icon: "database" },
    { title: "Evidence<br/>Management", icon: "lock" }
  ];

  t8Items.forEach((it, i) => {
    const rx = 1174 + (i % 3) * 112;
    const ry = 104 + Math.floor(i / 3) * 50;
    cell(`t8_item_${i}`, "", rx, ry, 106, 44, "rounded=1;arcSize=4;fillColor=#FAF5FF;strokeColor=#E9D5FF;strokeWidth=1;");
    const ic = svgIcon(it.icon as keyof typeof SVG, "#7C3AED", 12);
    cell(`t8_item_txt_${i}`, `<div style="display:flex;align-items:center;gap:4px;">${ic}<div style="font-size:7px;font-weight:700;color:#6B21A8;line-height:1.2;">${it.title}</div></div>`, rx + 4, ry + 2, 98, 40, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  });

  // Third-Party Risk Pod
  cell("t8_third_party", "", 1174, 212, 338, 38, "rounded=1;arcSize=4;fillColor=#F3E8FF;strokeColor=#D8B4FE;strokeWidth=1;");
  const tpIc = svgIcon("users", "#7C3AED", 14);
  cell("t8_third_party_txt", `<div style="display:flex;align-items:center;justify-content:center;gap:6px;">${tpIc}<b style="font-size:8px;color:#581C87;">Third-Party &amp; Supply Chain Risk</b></div>`, 1174, 212, 338, 38, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // -------------------------------------------------------------------------
  // TIER 9: OBSERVABILITY & ASSURANCE (y: 294, h: 236)
  // -------------------------------------------------------------------------
  cell("t9_frame", "", 1166, 294, 354, 236, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("t9_badge", "9", 1174, 300, 22, 22, "rounded=1;arcSize=6;fillColor=#059669;fontColor=#FFFFFF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t9_lbl", `<b style="font-size:8.5px;color:#059669;">OBSERVABILITY &amp; ASSURANCE</b><br/><span style="font-size:7px;color:#64748B;">Observe • Detect • Assure</span>`, 1202, 300, 308, 22, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  const t9Items = [
    { title: "Resilience<br/>Dashboards", icon: "chart" },
    { title: "SLO / SLI<br/>Monitoring", icon: "activity" },
    { title: "Synthetic<br/>Monitoring", icon: "refresh" },
    { title: "Real-time<br/>Alerting", icon: "bell" },
    { title: "Incident<br/>Management", icon: "settings" },
    { title: "On-call<br/>Management", icon: "user" },
    { title: "Chaos &amp; Drill<br/>Insights", icon: "flame" },
    { title: "Continuous<br/>Validation", icon: "shieldCheck" }
  ];

  t9Items.slice(0, 6).forEach((it, i) => {
    const rx = 1174 + (i % 3) * 112;
    const ry = 328 + Math.floor(i / 3) * 44;
    cell(`t9_item_${i}`, "", rx, ry, 106, 40, "rounded=1;arcSize=4;fillColor=#F0FDF4;strokeColor=#BBF7D0;strokeWidth=1;");
    const ic = svgIcon(it.icon as keyof typeof SVG, "#059669", 11);
    cell(`t9_item_txt_${i}`, `<div style="display:flex;align-items:center;gap:4px;">${ic}<div style="font-size:7px;font-weight:700;color:#065F46;line-height:1.2;">${it.title}</div></div>`, rx + 4, ry + 2, 98, 36, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  });

  // Chaos & Drill Insights + Continuous Validation row
  t9Items.slice(6, 8).forEach((it, i) => {
    const rx = 1174 + i * 172;
    cell(`t9_item_sub_${i}`, "", rx, 420, 166, 40, "rounded=1;arcSize=4;fillColor=#F0FDF4;strokeColor=#BBF7D0;strokeWidth=1;");
    const ic = svgIcon(it.icon as keyof typeof SVG, "#059669", 11);
    cell(`t9_item_sub_txt_${i}`, `<div style="display:flex;align-items:center;gap:4px;">${ic}<div style="font-size:7px;font-weight:700;color:#065F46;line-height:1.2;">${it.title}</div></div>`, rx + 4, 422, 158, 36, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  });

  // Resilience Scorecard Pod
  cell("t9_scorecard", "", 1174, 468, 338, 48, "rounded=1;arcSize=4;fillColor=#DCFCE7;strokeColor=#86EFAC;strokeWidth=1;");
  const scIc = svgIcon("chart", "#059669", 14);
  cell("t9_scorecard_txt", `<div style="display:flex;align-items:center;justify-content:center;gap:6px;">${scIc}<b style="font-size:8px;color:#14532D;">Resilience Scorecard</b></div>`, 1174, 468, 338, 48, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // -------------------------------------------------------------------------
  // TIER 10: PLATFORM OPERATIONS (y: 536, h: 160)
  // -------------------------------------------------------------------------
  cell("t10_frame", "", 1166, 536, 354, 160, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("t10_badge", "10", 1174, 542, 22, 22, "rounded=1;arcSize=6;fillColor=#EA580C;fontColor=#FFFFFF;fontSize=10;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t10_lbl", `<b style="font-size:8.5px;color:#EA580C;">PLATFORM OPERATIONS</b><br/><span style="font-size:7px;color:#64748B;">Operate • Automate • Optimize</span>`, 1202, 542, 308, 22, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  const t10Items = [
    { title: "Runbook Automation", icon: "fileCode" },
    { title: "Change Management", icon: "settings" },
    { title: "Capacity Management", icon: "layers" },
    { title: "Cost Optimization", icon: "chart" },
    { title: "Release Management", icon: "zap" },
    { title: "Configuration Mgmt", icon: "settings" }
  ];

  t10Items.forEach((it, i) => {
    const rx = 1174 + (i % 3) * 112;
    const ry = 568 + Math.floor(i / 3) * 40;
    cell(`t10_item_${i}`, "", rx, ry, 106, 36, "rounded=1;arcSize=4;fillColor=#FFF7ED;strokeColor=#FFEDD5;strokeWidth=1;");
    const ic = svgIcon(it.icon as keyof typeof SVG, "#EA580C", 11);
    cell(`t10_item_txt_${i}`, `<div style="display:flex;align-items:center;gap:3px;">${ic}<div style="font-size:7px;font-weight:700;color:#9A3412;line-height:1.2;">${it.title}</div></div>`, rx + 3, ry + 2, 100, 32, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  });

  // Continuous Improvement Pod
  cell("t10_ci", "", 1174, 652, 338, 34, "rounded=1;arcSize=4;fillColor=#FFEDD5;strokeColor=#FDBA74;strokeWidth=1;");
  const ciIc = svgIcon("repeat", "#EA580C", 14);
  cell("t10_ci_txt", `<div style="display:flex;align-items:center;justify-content:center;gap:6px;">${ciIc}<b style="font-size:8px;color:#7C2D12;">Continuous Improvement &amp; Feedback Loop</b></div>`, 1174, 652, 338, 34, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // -------------------------------------------------------------------------
  // RESILIENCE OUTCOMES (y: 702, h: 84)
  // -------------------------------------------------------------------------
  cell("outcomes_frame", "", 1166, 702, 354, 84, "rounded=1;arcSize=3;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;");
  cell("outcomes_hdr", `<b style="font-size:8.5px;color:#1D4ED8;">RESILIENCE OUTCOMES</b>`, 1176, 706, 200, 14, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  const outcomeList = [
    "Minimize Downtime &amp; Data Loss",
    "Meet RTO / RPO Commitments",
    "Maintain Trust &amp; Customer Confidence",
    "Comply with Regulations &amp; Standards",
    "Strengthen Cyber Recovery Readiness"
  ];
  const outcomesHtml = outcomeList.map(o => `<div style="display:flex;align-items:center;gap:4px;font-size:7px;color:#334155;line-height:1.15;"><span style="color:#2563EB;">✓</span> ${o}</div>`).join("");
  cell("outcomes_txt", outcomesHtml, 1176, 720, 250, 62, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  // Target Bullseye Icon
  const targetSvg = `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`;
  cell("outcomes_icon", targetSvg, 1450, 720, 44, 44, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // =========================================================================
  // 4. FOOTER REGION (y: 792, h: 96)
  // =========================================================================

  // Box 1: RESILIENCE PRINCIPLES (x: 16, w: 420)
  cell("ft_prin_box", "", 16, 792, 420, 96, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("ft_prin_hdr", `<b style="font-size:8px;color:#1E293B;">RESILIENCE PRINCIPLES</b>`, 24, 796, 200, 16, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  const principles = [
    { title: "Anticipate<br/>&amp; Prepare", icon: "eye" },
    { title: "Absorb<br/>&amp; Withstand", icon: "shield" },
    { title: "Adapt<br/>&amp; Respond", icon: "zap" },
    { title: "Recover<br/>&amp; Restore", icon: "refresh" },
    { title: "Learn<br/>&amp; Improve", icon: "repeat" }
  ];
  principles.forEach((pr, i) => {
    const px = 24 + i * 80;
    cell(`ft_pr_${i}`, "", px, 816, 74, 64, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;");
    const ic = svgIcon(pr.icon as keyof typeof SVG, "#1D4ED8", 14);
    cell(`ft_pr_txt_${i}`, `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;">${ic}<div style="font-size:6.5px;font-weight:700;color:#0F172A;text-align:center;line-height:1.1;">${pr.title}</div></div>`, px, 816, 74, 64, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  });

  // Box 2: RECOVERY STRATEGIES (x: 444, w: 380)
  cell("ft_strat_box", "", 444, 792, 380, 96, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("ft_strat_hdr", `<b style="font-size:8px;color:#1E293B;">RECOVERY STRATEGIES</b>`, 452, 796, 200, 16, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  const strategies = [
    { title: "Backup &amp;<br/>Restore", icon: "database" },
    { title: "Pilot Light", icon: "flame" },
    { title: "Warm<br/>Standby", icon: "server" },
    { title: "Active<br/>Standby", icon: "layers" },
    { title: "Multi-Site<br/>Active / Active", icon: "globe" }
  ];
  strategies.forEach((st, i) => {
    const sx = 452 + i * 72;
    cell(`ft_st_${i}`, "", sx, 816, 68, 64, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;");
    const ic = svgIcon(st.icon as keyof typeof SVG, "#0284C7", 13);
    cell(`ft_st_txt_${i}`, `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;">${ic}<div style="font-size:6.5px;font-weight:700;color:#0F172A;text-align:center;line-height:1.1;">${st.title}</div></div>`, sx, 816, 68, 64, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  });

  // Box 3: DISASTER TYPES (x: 832, w: 350)
  cell("ft_disaster_box", "", 832, 792, 350, 96, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("ft_disaster_hdr", `<b style="font-size:8px;color:#1E293B;">DISASTER TYPES</b>`, 840, 796, 200, 16, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  const disasterTypes = [
    { title: "Natural<br/>Disasters", icon: "globe" },
    { title: "Cyber<br/>Incidents", icon: "shieldAlert" },
    { title: "Human<br/>Errors", icon: "user" },
    { title: "System<br/>Failures", icon: "cpu" },
    { title: "Supply Chain<br/>Disruptions", icon: "network" }
  ];
  disasterTypes.forEach((dt, i) => {
    const dx = 840 + i * 66;
    cell(`ft_dt_${i}`, "", dx, 816, 62, 64, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;");
    const ic = svgIcon(dt.icon as keyof typeof SVG, "#EA580C", 13);
    cell(`ft_dt_txt_${i}`, `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;">${ic}<div style="font-size:6.5px;font-weight:700;color:#0F172A;text-align:center;line-height:1.1;">${dt.title}</div></div>`, dx, 816, 62, 64, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  });

  // Box 4: DATA BENEFITS (x: 1190, w: 330)
  cell("ft_benefits_box", "", 1190, 792, 330, 96, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("ft_benefits_hdr", `<b style="font-size:8px;color:#1E293B;">DATA BENEFITS</b>`, 1198, 796, 200, 16, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  const dataBenefits = [
    { title: "Business<br/>Continuity", icon: "shieldCheck" },
    { title: "Cyber<br/>Resilience", icon: "shield" },
    { title: "Reduced<br/>Risk", icon: "lock" },
    { title: "Operational<br/>Excellence", icon: "sparkles" },
    { title: "Cost<br/>Efficiency", icon: "chart" }
  ];
  dataBenefits.forEach((db, i) => {
    const bx = 1198 + i * 62;
    cell(`ft_db_${i}`, "", bx, 816, 58, 64, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;");
    const ic = svgIcon(db.icon as keyof typeof SVG, "#059669", 13);
    cell(`ft_db_txt_${i}`, `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;">${ic}<div style="font-size:6px;font-weight:700;color:#0F172A;text-align:center;line-height:1.1;">${db.title}</div></div>`, bx, 816, 58, 64, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  });

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_48" name="BCDR, Cyber Recovery &amp; Operational Resilience">
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
