const escapeXml = (v?: string | null) =>
  (v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const SVG = {
  user: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  users: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  heart: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`,
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
  brain: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M12 5v13"/></svg>`,
  eye: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`,
  repeat: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/></svg>`,
  checkCircle: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  bell: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>`,
  settings: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  pill: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg>`
};

function svgIcon(name: keyof typeof SVG, color: string = "#1E293B", size: number = 14): string {
  const icon = SVG[name] || SVG.heart;
  return icon
    .replace('width="24"', `width="${size}"`)
    .replace('height="24"', `height="${size}"`)
    .replace(/currentColor/g, color);
}

export function generateTemplate49HealthcareLifeSciencesPlatformXml(
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
  cell("hdr_num", "49", 16, 12, 54, 48, "shape=rectangle;rounded=1;arcSize=14;fillColor=#6D28D9;strokeColor=#6D28D9;fontColor=#FFFFFF;fontSize=26;fontStyle=1;align=center;verticalAlign=middle;");

  const titleHtml = `<div style="font-size:19px;font-weight:900;color:#0F172A;letter-spacing:0.5px;">HEALTHCARE &amp; LIFE SCIENCES DIGITAL PLATFORM</div>
    <div style="font-size:10.5px;color:#475569;font-weight:600;margin-top:3px;">Patient-Centric • Data-Driven • Interoperable • Secure • AI-Enabled</div>`;
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
  // TIER 7: CONSUMER EXPERIENCE LAYER (y: 68, h: 96)
  // -------------------------------------------------------------------------
  cell("t7_frame", "", 16, 68, 1140, 96, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("t7_badge", "7", 24, 74, 22, 22, "rounded=1;arcSize=6;fillColor=#6D28D9;fontColor=#FFFFFF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t7_lbl", `<b style="font-size:8px;color:#6D28D9;">CONSUMER EXPERIENCE<br/>LAYER</b><br/><span style="font-size:7px;color:#64748B;line-height:1.2;">Engage • Empower<br/>Personalize • Retain</span>`, 50, 74, 110, 32, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  const t7Groups = [
    { title: "Patients &amp; Caregivers", items: [{ t: "Patient Portal", ic: "user" }, { t: "Mobile App", ic: "activity" }, { t: "Wearables", ic: "heart" }, { t: "Telehealth", ic: "users" }] },
    { title: "Healthcare Providers", items: [{ t: "EHR / EMR", ic: "fileCode" }, { t: "Care Teams", ic: "users" }, { t: "Clinical Apps", ic: "activity" }] },
    { title: "Life Sciences", items: [{ t: "Researcher", ic: "brain" }, { t: "Study Manager", ic: "chart" }, { t: "Pharma Partner", ic: "pill" }] },
    { title: "Payers", items: [{ t: "Member Portal", ic: "user" }, { t: "Care Manager", ic: "shieldCheck" }] },
    { title: "Public Health", items: [{ t: "Health Officials", ic: "user" }, { t: "Population Health", ic: "users" }] }
  ];

  let curGx = 166;
  t7Groups.forEach((grp, i) => {
    const gw = grp.items.length === 4 ? 240 : grp.items.length === 3 ? 190 : 166;
    cell(`t7_g_${i}`, "", curGx, 74, gw, 84, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;");
    cell(`t7_gh_${i}`, `<b style="font-size:7.5px;color:#0F172A;">${grp.title}</b>`, curGx + 4, 76, gw - 8, 14, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
    const colW = (gw - 8) / grp.items.length;
    grp.items.forEach((it, j) => {
      const ix = curGx + 4 + j * colW;
      cell(`t7_gi_${i}_${j}`, "", ix + 2, 92, colW - 4, 60, "rounded=1;arcSize=4;fillColor=#FAF5FF;strokeColor=#E9D5FF;strokeWidth=1;");
      const ic = svgIcon(it.ic as keyof typeof SVG, "#6D28D9", 12);
      cell(`t7_git_${i}_${j}`, `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;">${ic}<div style="font-size:6.5px;font-weight:700;color:#6B21A8;text-align:center;line-height:1.1;">${it.t}</div></div>`, ix + 2, 92, colW - 4, 60, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
    });
    curGx += gw + 8;
  });

  // -------------------------------------------------------------------------
  // TIER 6: APPLICATION & SOLUTION LAYER (y: 168, h: 110)
  // -------------------------------------------------------------------------
  cell("t6_frame", "", 16, 168, 1140, 110, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("t6_badge", "6", 24, 174, 22, 22, "rounded=1;arcSize=6;fillColor=#1D4ED8;fontColor=#FFFFFF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t6_lbl", `<b style="font-size:8px;color:#1D4ED8;">APPLICATION &amp; SOLUTION<br/>LAYER</b><br/><span style="font-size:7px;color:#64748B;line-height:1.2;">Clinical • Operational<br/>Research • Commercial</span>`, 50, 174, 110, 32, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  const t6Cards = [
    { title: "Care Delivery", items: ["EHR Integration", "Telemedicine", "ePrescribing", "Care Coordination"] },
    { title: "Clinical Operations", items: ["Scheduling", "Bed Mgmt / Capacity", "Nursing", "Clinical Decision Support"] },
    { title: "Patient Management", items: ["Identity & Access", "Consent Mgmt", "Patient 360", "Communications"] },
    { title: "Population Health", items: ["Risk Stratification", "Chronic Care", "Outbreak Mgmt", "Social Determinants"] },
    { title: "Life Sciences R&D", items: ["Study Design", "eClinical (EDC)", "CTMS", "PV / Safety"] },
    { title: "Commercial & Market", items: ["HCP Engagement", "Distributor Mgmt", "Market Access", "Pricing & Contracts"] },
    { title: "Analytics & AI Solutions", items: ["GenAI Copilots", "Clinical NLP", "Imaging AI", "Predictive Analytics"] }
  ];

  t6Cards.forEach((cItem, i) => {
    const cx = 166 + i * 138;
    cell(`t6_c_${i}`, "", cx, 174, 134, 74, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;");
    cell(`t6_c_hdr_${i}`, `<b style="font-size:7.5px;color:#0F172A;">${cItem.title}</b>`, cx + 4, 176, 126, 14, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
    const itemsHtml = cItem.items.map(it => `<span style="font-size:6.5px;color:#475569;line-height:1.15;">• ${it}</span>`).join("<br/>");
    cell(`t6_c_bdy_${i}`, `<div style="line-height:1.2;padding-top:2px;">${itemsHtml}</div>`, cx + 6, 192, 122, 54, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");
  });

  // Tier 6 Sub-strip
  cell("t6_strip", "", 166, 252, 984, 20, "rounded=1;arcSize=6;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1;");
  const t6Pills = "API Gateway • Application Integration • Microservices • Workflow / Case Mgmt • Notification Service";
  cell("t6_strip_txt", `<div style="font-size:7.5px;font-weight:700;color:#1E40AF;text-align:center;">${t6Pills}</div>`, 166, 252, 984, 20, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // -------------------------------------------------------------------------
  // TIER 5: DATA & INTELLIGENCE LAYER (y: 282, h: 120)
  // -------------------------------------------------------------------------
  cell("t5_frame", "", 16, 282, 1140, 120, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("t5_badge", "5", 24, 288, 22, 22, "rounded=1;arcSize=6;fillColor=#0284C7;fontColor=#FFFFFF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t5_lbl", `<b style="font-size:8px;color:#0284C7;">DATA &amp; INTELLIGENCE<br/>LAYER</b><br/><span style="font-size:7px;color:#64748B;line-height:1.2;">Aggregate • Harmonize<br/>Analyze • AI/ML</span>`, 50, 288, 110, 32, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  // Top Section: Data Domains (left), Pipeline (center), AI & Analytics (right)
  // 1. Data Domains (x: 166, w: 280)
  cell("t5_domains_box", "", 166, 288, 280, 48, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;");
  cell("t5_domains_hdr", `<b style="font-size:7.5px;color:#0F172A;">Data Domains</b>`, 172, 290, 268, 12, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  const domains = ["Clinical", "Imaging", "Genomics", "Labs", "Pharmacy", "Claims", "Social", "Device/IoT"];
  const domainsHtml = domains.map(d => `<span style="font-size:6.5px;background:#E0F2FE;color:#0369A1;padding:1px 4px;border-radius:3px;font-weight:600;">${d}</span>`).join(" ");
  cell("t5_domains_pills", `<div style="display:flex;flex-wrap:wrap;gap:3px;justify-content:center;padding-top:2px;">${domainsHtml}</div>`, 170, 304, 272, 28, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // 2. Enterprise Data Platform (x: 454, w: 420)
  cell("t5_pipe_box", "", 454, 288, 420, 48, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;");
  cell("t5_pipe_hdr", `<b style="font-size:7.5px;color:#0F172A;">Enterprise Data Platform</b>`, 460, 290, 408, 12, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  const pipeStages = ["Ingestion", "Curate", "Standardize", "Store", "Model", "Serve"];
  pipeStages.forEach((ps, i) => {
    const px = 460 + i * 68;
    cell(`t5_ps_${i}`, `<div style="font-size:6.5px;font-weight:700;color:#0369A1;background:#E0F2FE;padding:2px 4px;border-radius:3px;text-align:center;">${ps}</div>`, px, 308, 56, 20, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  });

  // 3. AI & Analytics (x: 882, w: 268)
  cell("t5_ai_box", "", 882, 288, 268, 48, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;");
  cell("t5_ai_hdr", `<b style="font-size:7.5px;color:#0F172A;">AI &amp; Analytics</b>`, 888, 290, 256, 12, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  const aiPills = ["ML Ops", "Data Science", "Feature Store", "BI / Dashboards"];
  const aiHtml = aiPills.map(a => `<span style="font-size:6.5px;background:#F3E8FF;color:#6B21A8;padding:1px 4px;border-radius:3px;font-weight:600;">${a}</span>`).join(" ");
  cell("t5_ai_pills", `<div style="display:flex;flex-wrap:wrap;gap:3px;justify-content:center;padding-top:2px;">${aiHtml}</div>`, 886, 304, 260, 28, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // Middle Section: Standards Row (x: 166, w: 984)
  cell("t5_std_box", "", 166, 340, 984, 28, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  const standards = ["HL7 FHIR", "DICOM", "OMOP", "SNOMED CT", "LOINC", "ICD-10", "RxNorm", "CPT"];
  const stdHtml = standards.map(s => `<span style="font-size:7.5px;font-weight:700;color:#0F172A;background:#F1F5F9;padding:2px 8px;border-radius:4px;border:1px solid #CBD5E1;">${s}</span>`).join(" ");
  cell("t5_std_txt", `<div style="display:flex;justify-content:space-around;align-items:center;padding-top:3px;">${stdHtml}</div>`, 166, 340, 984, 28, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // Bottom Section: Sub-strip
  cell("t5_strip", "", 166, 372, 984, 22, "rounded=1;arcSize=6;fillColor=#E0F2FE;strokeColor=#BAE6FD;strokeWidth=1;");
  const t5Pills = "Data Governance &amp; Catalog • Master Data Management (MDM) • Data Quality • Lineage • Data Sharing &amp; Collaboration";
  cell("t5_strip_txt", `<div style="font-size:7.5px;font-weight:700;color:#0369A1;text-align:center;">${t5Pills}</div>`, 166, 372, 984, 22, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // -------------------------------------------------------------------------
  // TIER 4: INTEGRATION & INTEROPERABILITY LAYER (y: 406, h: 104)
  // -------------------------------------------------------------------------
  cell("t4_frame", "", 16, 406, 1140, 104, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("t4_badge", "4", 24, 412, 22, 22, "rounded=1;arcSize=6;fillColor=#059669;fontColor=#FFFFFF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t4_lbl", `<b style="font-size:8px;color:#059669;">INTEGRATION &amp;<br/>INTEROPERABILITY LAYER</b><br/><span style="font-size:7px;color:#64748B;line-height:1.2;">Connect • Exchange<br/>Interoperate</span>`, 50, 412, 110, 32, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  const t4Sections = [
    { title: "Standard Interfaces", desc: "FHIR APIs • HL7 / v2<br/>DICOMweb • IHE Profiles", icon: "repeat" },
    { title: "Integration Services", desc: "API Management • Event Streaming<br/>Message Queue • Data Transforms", icon: "network" },
    { title: "Partner Ecosystem", desc: "Hospital / Health Systems • Labs / Imaging<br/>Payers • Pharma / CROs • Public Health", icon: "users" },
    { title: "MCP &amp; Agents", desc: "MCP Gateway • Agent Orchestration<br/>Skills / Tools • Human-in-the-Loop", icon: "brain" }
  ];

  t4Sections.forEach((sItem, i) => {
    const cx = 166 + i * 248;
    cell(`t4_c_${i}`, "", cx, 412, 240, 68, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;");
    const ic = svgIcon(sItem.icon as keyof typeof SVG, "#059669", 12);
    cell(`t4_c_hdr_${i}`, `<div style="display:flex;align-items:center;gap:4px;">${ic}<b style="font-size:7.5px;color:#0F172A;">${sItem.title}</b></div>`, cx + 4, 414, 232, 16, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
    cell(`t4_c_bdy_${i}`, `<div style="font-size:7px;color:#475569;line-height:1.3;padding-top:4px;">${sItem.desc}</div>`, cx + 6, 432, 228, 44, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");
  });

  // Tier 4 Sub-strip
  cell("t4_strip", "", 166, 484, 984, 20, "rounded=1;arcSize=6;fillColor=#F0FDF4;strokeColor=#BBF7D0;strokeWidth=1;");
  const t4Pills = "Consent &amp; Preference Mgmt • Data Exchange Agreements • Interoperability Governance";
  cell("t4_strip_txt", `<div style="font-size:7.5px;font-weight:700;color:#166534;text-align:center;">${t4Pills}</div>`, 166, 484, 984, 20, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // -------------------------------------------------------------------------
  // TIER 3: PLATFORM & SERVICES LAYER (y: 514, h: 104)
  // -------------------------------------------------------------------------
  cell("t3_frame", "", 16, 514, 1140, 104, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("t3_badge", "3", 24, 520, 22, 22, "rounded=1;arcSize=6;fillColor=#D97706;fontColor=#FFFFFF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t3_lbl", `<b style="font-size:8px;color:#D97706;">PLATFORM &amp; SERVICES<br/>LAYER</b><br/><span style="font-size:7px;color:#64748B;line-height:1.2;">Build • Run • Scale<br/>Secure • Compliant</span>`, 50, 520, 110, 32, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  const t3Cards = [
    { title: "Compute", desc: "GKE<br/>Cloud Run<br/>App Engine", icon: "cpu" },
    { title: "Data Services", desc: "BigQuery • Cloud SQL<br/>Spanner • Firestore<br/>Memorystore", icon: "database" },
    { title: "AI / ML Services", desc: "Vertex AI • Vision AI<br/>NLP (Gemini)<br/>Speech AI", icon: "sparkles" },
    { title: "Integration Services", desc: "Apigee • Pub/Sub<br/>Dataflow<br/>Workflows", icon: "network" },
    { title: "Developer Services", desc: "Cloud Build<br/>Artifact Registry<br/>Cloud Deploy", icon: "fileCode" },
    { title: "Security Services", desc: "IAM • KMS<br/>Secret Manager<br/>VPC-SC", icon: "shieldCheck" }
  ];

  t3Cards.forEach((cItem, i) => {
    const cx = 166 + i * 162;
    cell(`t3_c_${i}`, "", cx, 520, 156, 68, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;");
    const ic = svgIcon(cItem.icon as keyof typeof SVG, "#D97706", 12);
    cell(`t3_c_hdr_${i}`, `<div style="display:flex;align-items:center;gap:4px;">${ic}<b style="font-size:7.5px;color:#0F172A;">${cItem.title}</b></div>`, cx + 4, 522, 148, 16, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
    cell(`t3_c_bdy_${i}`, `<div style="font-size:7px;color:#475569;line-height:1.2;padding-top:4px;">${cItem.desc}</div>`, cx + 6, 540, 144, 44, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");
  });

  // Tier 3 Sub-strip
  cell("t3_strip", "", 166, 592, 984, 20, "rounded=1;arcSize=6;fillColor=#FEF3C7;strokeColor=#FDE68A;strokeWidth=1;");
  const t3Pills = "Observability (Cloud Monitoring • Logging • Trace) • Audit &amp; Compliance • Cost Management";
  cell("t3_strip_txt", `<div style="font-size:7.5px;font-weight:700;color:#92400E;text-align:center;">${t3Pills}</div>`, 166, 592, 984, 20, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // -------------------------------------------------------------------------
  // TIER 2: DATA SOURCES LAYER (y: 622, h: 74)
  // -------------------------------------------------------------------------
  cell("t2_frame", "", 16, 622, 1140, 74, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("t2_badge", "2", 24, 628, 22, 22, "rounded=1;arcSize=6;fillColor=#EA580C;fontColor=#FFFFFF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t2_lbl", `<b style="font-size:8px;color:#EA580C;">DATA SOURCES LAYER</b><br/><span style="font-size:7px;color:#64748B;line-height:1.2;">Collect • Ingest<br/>Stream • Batch</span>`, 50, 628, 110, 32, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  const t2Sources = [
    { title: "Clinical Systems", desc: "EHR / EMR • LIS<br/>RIS / PACS • Pharmacy", icon: "activity" },
    { title: "Devices &amp; IoT", desc: "Medical Devices<br/>Wearables • Remote", icon: "heart" },
    { title: "External Data", desc: "Labs • Genomics<br/>Registries • SDoH", icon: "database" },
    { title: "Operational Systems", desc: "ERP / Finance • HR<br/>Supply Chain", icon: "settings" },
    { title: "External Partners", desc: "Payers • Partners<br/>Public Health", icon: "users" },
    { title: "File / Documents", desc: "Docs • Images<br/>Forms", icon: "fileCode" }
  ];

  t2Sources.forEach((src, i) => {
    const sx = 166 + i * 162;
    cell(`t2_s_${i}`, "", sx, 628, 156, 60, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;");
    const ic = svgIcon(src.icon as keyof typeof SVG, "#EA580C", 12);
    cell(`t2_sh_${i}`, `<div style="display:flex;align-items:center;gap:4px;">${ic}<b style="font-size:7.5px;color:#0F172A;">${src.title}</b></div>`, sx + 4, 630, 148, 16, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
    cell(`t2_sb_${i}`, `<div style="font-size:6.5px;color:#475569;line-height:1.2;padding-top:2px;">${src.desc}</div>`, sx + 6, 646, 144, 38, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");
  });

  // -------------------------------------------------------------------------
  // TIER 1: INFRASTRUCTURE LAYER (y: 700, h: 74)
  // -------------------------------------------------------------------------
  cell("t1_frame", "", 16, 700, 1140, 74, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("t1_badge", "1", 24, 706, 22, 22, "rounded=1;arcSize=6;fillColor=#DC2626;fontColor=#FFFFFF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t1_lbl", `<b style="font-size:8px;color:#DC2626;">INFRASTRUCTURE LAYER</b><br/><span style="font-size:7px;color:#64748B;line-height:1.2;">Global • Reliable • Secure<br/>Scalable • Sustainable</span>`, 50, 706, 110, 32, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  const t1Infra = [
    { title: "Google Cloud<br/>Global Infrastructure", icon: "globe" },
    { title: "Regions &amp;<br/>Zones", icon: "layers" },
    { title: "Compute<br/>Engine", icon: "cpu" },
    { title: "Storage<br/>(Cloud Storage)", icon: "cloud" },
    { title: "Network<br/>(VPC / Cloud Armor)", icon: "shield" },
    { title: "CDN<br/>(Cloud CDN)", icon: "zap" },
    { title: "Edge<br/>Locations", icon: "network" },
    { title: "Dedicated<br/>Interconnect", icon: "repeat" },
    { title: "Sustainability<br/>(Carbon Aware)", icon: "sparkles" }
  ];

  t1Infra.forEach((inf, i) => {
    const ix = 166 + i * 108;
    cell(`t1_i_${i}`, "", ix, 706, 104, 60, "rounded=1;arcSize=4;fillColor=#FEF2F2;strokeColor=#FECACA;strokeWidth=1;");
    const ic = svgIcon(inf.icon as keyof typeof SVG, "#DC2626", 12);
    cell(`t1_it_${i}`, `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;">${ic}<div style="font-size:6.5px;font-weight:700;color:#991B1B;text-align:center;line-height:1.1;">${inf.title}</div></div>`, ix, 706, 104, 60, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  });

  // =========================================================================
  // 3. RIGHT SIDEBAR (x: 1166, w: 354)
  // =========================================================================

  // -------------------------------------------------------------------------
  // TIER 8: GOVERNANCE, RISK & COMPLIANCE (y: 68, h: 226)
  // -------------------------------------------------------------------------
  cell("t8_frame", "", 1166, 68, 354, 226, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("t8_badge", "8", 1174, 74, 22, 22, "rounded=1;arcSize=6;fillColor=#7C3AED;fontColor=#FFFFFF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t8_lbl", `<b style="font-size:8.5px;color:#7C3AED;">GOVERNANCE, RISK &amp; COMPLIANCE</b><br/><span style="font-size:7px;color:#64748B;">Govern • Protect • Comply</span>`, 1202, 74, 308, 22, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  const t8Items = [
    { title: "Healthcare Regulations<br/>(HIPAA, HITECH, GDPR)", icon: "shield" },
    { title: "Data Privacy<br/>&amp; Consent", icon: "lock" },
    { title: "Security &amp; Access<br/>Control", icon: "shieldCheck" },
    { title: "Data Governance &amp;<br/>Stewardship", icon: "database" },
    { title: "Audit &amp; Logging", icon: "fileCode" },
    { title: "Risk Management", icon: "activity" },
    { title: "Vendor &amp; Third-Party<br/>Risk", icon: "users" },
    { title: "Policy Management", icon: "settings" }
  ];

  t8Items.forEach((it, i) => {
    const rx = 1174 + (i % 2) * 172;
    const ry = 102 + Math.floor(i / 2) * 36;
    cell(`t8_item_${i}`, "", rx, ry, 166, 32, "rounded=1;arcSize=4;fillColor=#FAF5FF;strokeColor=#E9D5FF;strokeWidth=1;");
    const ic = svgIcon(it.icon as keyof typeof SVG, "#7C3AED", 11);
    cell(`t8_item_txt_${i}`, `<div style="display:flex;align-items:center;gap:4px;">${ic}<div style="font-size:6.5px;font-weight:700;color:#6B21A8;line-height:1.1;">${it.title}</div></div>`, rx + 4, ry + 2, 158, 28, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  });

  // Compliance Dashboard Pod
  cell("t8_dash", "", 1174, 250, 338, 36, "rounded=1;arcSize=4;fillColor=#F3E8FF;strokeColor=#D8B4FE;strokeWidth=1;");
  const compIc = svgIcon("chart", "#7C3AED", 14);
  cell("t8_dash_txt", `<div style="display:flex;align-items:center;justify-content:center;gap:6px;">${compIc}<b style="font-size:8px;color:#581C87;">Compliance Dashboard</b></div>`, 1174, 250, 338, 36, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // -------------------------------------------------------------------------
  // TIER 9: OBSERVABILITY & ASSURANCE (y: 300, h: 226)
  // -------------------------------------------------------------------------
  cell("t9_frame", "", 1166, 300, 354, 226, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("t9_badge", "9", 1174, 306, 22, 22, "rounded=1;arcSize=6;fillColor=#059669;fontColor=#FFFFFF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t9_lbl", `<b style="font-size:8.5px;color:#059669;">OBSERVABILITY &amp; ASSURANCE</b><br/><span style="font-size:7px;color:#64748B;">Monitor • Detect • Assure</span>`, 1202, 306, 308, 22, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  const t9Items = [
    { title: "Performance Monitoring", icon: "activity" },
    { title: "Alerting &amp; Notifications", icon: "bell" },
    { title: "SLO / SLA Monitoring", icon: "checkCircle" },
    { title: "Incident Management", icon: "settings" },
    { title: "Anomaly &amp; Drift Detection", icon: "zap" },
    { title: "Synthetic Monitoring", icon: "repeat" },
    { title: "Audit Trails", icon: "fileCode" },
    { title: "Service Health", icon: "heart" }
  ];

  t9Items.forEach((it, i) => {
    const rx = 1174 + (i % 2) * 172;
    const ry = 334 + Math.floor(i / 2) * 36;
    cell(`t9_item_${i}`, "", rx, ry, 166, 32, "rounded=1;arcSize=4;fillColor=#F0FDF4;strokeColor=#BBF7D0;strokeWidth=1;");
    const ic = svgIcon(it.icon as keyof typeof SVG, "#059669", 11);
    cell(`t9_item_txt_${i}`, `<div style="display:flex;align-items:center;gap:4px;">${ic}<div style="font-size:6.5px;font-weight:700;color:#065F46;line-height:1.1;">${it.title}</div></div>`, rx + 4, ry + 2, 158, 28, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  });

  // Operational Dashboards Pod
  cell("t9_dash", "", 1174, 482, 338, 36, "rounded=1;arcSize=4;fillColor=#DCFCE7;strokeColor=#86EFAC;strokeWidth=1;");
  const opIc = svgIcon("chart", "#059669", 14);
  cell("t9_dash_txt", `<div style="display:flex;align-items:center;justify-content:center;gap:6px;">${opIc}<b style="font-size:8px;color:#14532D;">Operational Dashboards</b></div>`, 1174, 482, 338, 36, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // -------------------------------------------------------------------------
  // TIER 10: PLATFORM OPERATIONS (y: 532, h: 160)
  // -------------------------------------------------------------------------
  cell("t10_frame", "", 1166, 532, 354, 160, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("t10_badge", "10", 1174, 538, 22, 22, "rounded=1;arcSize=6;fillColor=#EA580C;fontColor=#FFFFFF;fontSize=10;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t10_lbl", `<b style="font-size:8.5px;color:#EA580C;">PLATFORM OPERATIONS</b><br/><span style="font-size:7px;color:#64748B;">Operate • Optimize • Improve</span>`, 1202, 538, 308, 22, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  const t10Items = [
    { title: "Release &amp; Deployment<br/>Management", icon: "zap" },
    { title: "Capacity &amp; Cost<br/>Optimization", icon: "chart" },
    { title: "Backup &amp; DR<br/>Management", icon: "database" },
    { title: "Change &amp; Config<br/>Management", icon: "settings" },
    { title: "Patch &amp; Vulnerability<br/>Management", icon: "shieldCheck" },
    { title: "FinOps", icon: "chart" }
  ];

  t10Items.forEach((it, i) => {
    const rx = 1174 + (i % 3) * 112;
    const ry = 566 + Math.floor(i / 3) * 40;
    cell(`t10_item_${i}`, "", rx, ry, 106, 36, "rounded=1;arcSize=4;fillColor=#FFF7ED;strokeColor=#FFEDD5;strokeWidth=1;");
    const ic = svgIcon(it.icon as keyof typeof SVG, "#EA580C", 11);
    cell(`t10_item_txt_${i}`, `<div style="display:flex;align-items:center;gap:3px;">${ic}<div style="font-size:6.5px;font-weight:700;color:#9A3412;line-height:1.1;">${it.title}</div></div>`, rx + 3, ry + 2, 100, 32, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  });

  // Continuous Improvement Pod
  cell("t10_ci", "", 1174, 650, 338, 34, "rounded=1;arcSize=4;fillColor=#FFEDD5;strokeColor=#FDBA74;strokeWidth=1;");
  const ciIc = svgIcon("repeat", "#EA580C", 14);
  cell("t10_ci_txt", `<div style="display:flex;align-items:center;justify-content:center;gap:6px;">${ciIc}<b style="font-size:8px;color:#7C2D12;">Continuous Improvement &amp; Lessons Learned</b></div>`, 1174, 650, 338, 34, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // -------------------------------------------------------------------------
  // OUTCOMES (y: 698, h: 76)
  // -------------------------------------------------------------------------
  cell("outcomes_frame", "", 1166, 698, 354, 76, "rounded=1;arcSize=3;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;");
  cell("outcomes_hdr", `<b style="font-size:8px;color:#6D28D9;">OUTCOMES</b>`, 1176, 702, 200, 14, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  const outcomeList = [
    "Better Patient Outcomes &amp; Experience",
    "Operational Efficiency &amp; Cost Savings",
    "Faster Innovation &amp; Time to Market",
    "Data-Driven Decisions at Scale",
    "Trust, Compliance &amp; Risk Reduction"
  ];
  const outcomesHtml = outcomeList.map(o => `<div style="display:flex;align-items:center;gap:4px;font-size:6.5px;color:#334155;line-height:1.1;"><span style="color:#6D28D9;">✓</span> ${o}</div>`).join("");
  cell("outcomes_txt", outcomesHtml, 1176, 716, 250, 56, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  const targetSvg = `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#6D28D9" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`;
  cell("outcomes_icon", targetSvg, 1456, 716, 40, 40, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // =========================================================================
  // 4. FOOTER REGION (y: 780, h: 108)
  // =========================================================================

  // Box 1: DATA FLOW LEGEND (x: 16, w: 230)
  cell("ft_legend_box", "", 16, 780, 230, 108, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("ft_legend_hdr", `<b style="font-size:8px;color:#1E293B;">DATA FLOW LEGEND</b>`, 24, 784, 200, 16, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  const legendHtml = `
    <div style="padding-top:4px;display:flex;flex-direction:column;gap:5px;">
      <div style="display:flex;align-items:center;gap:6px;"><span style="color:#2563EB;font-weight:bold;">╌╌▶</span> <span style="font-size:6.5px;color:#334155;">Data Flow (Batch)</span></div>
      <div style="display:flex;align-items:center;gap:6px;"><span style="color:#059669;font-weight:bold;">╌╌▶</span> <span style="font-size:6.5px;color:#334155;">Data Flow (Real-time)</span></div>
      <div style="display:flex;align-items:center;gap:6px;"><span style="color:#7C3AED;font-weight:bold;">╌╌▶</span> <span style="font-size:6.5px;color:#334155;">Control / Metadata Flow</span></div>
      <div style="display:flex;align-items:center;gap:6px;"><span style="color:#0F172A;font-weight:bold;">━━▶</span> <span style="font-size:6.5px;color:#334155;">External Exchange</span></div>
    </div>`;
  cell("ft_legend_txt", legendHtml, 24, 800, 214, 80, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  // Box 2: KEY STANDARDS (x: 254, w: 260)
  cell("ft_standards_box", "", 254, 780, 260, 108, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("ft_standards_hdr", `<b style="font-size:8px;color:#1E293B;">KEY STANDARDS</b>`, 262, 784, 200, 16, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  const standardsHtml = `
    <div style="padding-top:6px;display:flex;flex-wrap:wrap;gap:4px;justify-content:center;">
      <span style="font-size:7.5px;font-weight:bold;color:#DC2626;">HL7 FHIR</span>
      <span style="font-size:7.5px;font-weight:bold;color:#0284C7;">DICOM</span>
      <span style="font-size:7.5px;font-weight:bold;color:#D97706;">OMOP</span>
      <span style="font-size:7.5px;font-weight:bold;color:#2563EB;">SNOMED CT</span>
      <span style="font-size:7.5px;font-weight:bold;color:#059669;">LOINC</span>
      <span style="font-size:7.5px;font-weight:bold;color:#7C3AED;">ICD-10</span>
      <span style="font-size:7.5px;font-weight:bold;color:#EA580C;">RxNorm</span>
      <span style="font-size:7.5px;font-weight:bold;color:#0F172A;">CPT</span>
    </div>`;
  cell("ft_standards_txt", standardsHtml, 262, 810, 244, 68, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // Box 3: HEALTHCARE USE CASES (x: 522, w: 480)
  cell("ft_hc_box", "", 522, 780, 480, 108, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("ft_hc_hdr", `<b style="font-size:8px;color:#1E293B;">HEALTHCARE USE CASES</b>`, 530, 784, 200, 16, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  const hcCases = [
    { title: "Virtual<br/>Care", icon: "activity" },
    { title: "Chronic<br/>Disease Mgmt", icon: "heart" },
    { title: "Sepsis Early<br/>Detection", icon: "zap" },
    { title: "Clinical Trial<br/>Recruitment", icon: "user" },
    { title: "Drug<br/>&amp; PV", icon: "pill" },
    { title: "Imaging<br/>Analytics", icon: "eye" }
  ];
  hcCases.forEach((hc, i) => {
    const hx = 530 + i * 78;
    cell(`ft_hc_${i}`, "", hx, 804, 72, 74, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;");
    const ic = svgIcon(hc.icon as keyof typeof SVG, "#0284C7", 13);
    cell(`ft_hc_txt_${i}`, `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;">${ic}<div style="font-size:6.5px;font-weight:700;color:#0F172A;text-align:center;line-height:1.1;">${hc.title}</div></div>`, hx, 804, 72, 74, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  });

  // Box 4: LIFE SCIENCES USE CASES (x: 1010, w: 510)
  cell("ft_ls_box", "", 1010, 780, 510, 108, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("ft_ls_hdr", `<b style="font-size:8px;color:#1E293B;">LIFE SCIENCES USE CASES</b>`, 1018, 784, 200, 16, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  const lsCases = [
    { title: "Protocol<br/>Design", icon: "fileCode" },
    { title: "Site &amp; Patient<br/>Matching", icon: "users" },
    { title: "RWE &amp; HEOR<br/>Analytics", icon: "chart" },
    { title: "Signal<br/>Detection", icon: "bell" },
    { title: "Market Access<br/>Insights", icon: "sparkles" },
    { title: "HCP<br/>Engagement", icon: "user" }
  ];
  lsCases.forEach((ls, i) => {
    const lx = 1018 + i * 82;
    cell(`ft_ls_${i}`, "", lx, 804, 76, 74, "rounded=1;arcSize=4;fillColor=#FAF5FF;strokeColor=#E9D5FF;strokeWidth=1;");
    const ic = svgIcon(ls.icon as keyof typeof SVG, "#6D28D9", 13);
    cell(`ft_ls_txt_${i}`, `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;">${ic}<div style="font-size:6.5px;font-weight:700;color:#6B21A8;text-align:center;line-height:1.1;">${ls.title}</div></div>`, lx, 804, 76, 74, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  });

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_49" name="Healthcare &amp; Life Sciences Digital Platform">
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
