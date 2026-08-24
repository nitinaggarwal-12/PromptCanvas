/**
 * Master 1:1 High-Craft Exact Ground-Truth Replica for Template 05: As-Is / To-Be Process Flow
 * Matches 100% of images/05.png (NOVACURA Bio-Pharma Product As-Is vs To-Be Transformation):
 * - Canvas Resolution: 1600x960 master grid
 * - Top Header: "05 AS-IS / TO-BE — NOVACURA BIO-PHARMA PRODUCT" + Subtitle + NOVACURA Brand Block
 * - 3 Main Vertical Zones:
 *   1. AS-IS CURRENT STATE (Red / Legacy): Siloed Systems, Manual Processes, 6 Tiers with downward dashed red batch flows
 *   2. TRANSFORMATION BENEFITS (Center Blue Column): 6 Value Drivers + Wide Transition Arrow
 *   3. TO-BE FUTURE STATE (Green / Cloud-Native): Unified Novacura Digital Platform, Governed Data Platform, GCP, Zero Trust Security
 * - Bottom Row: KEY TECHNOLOGY ENABLERS (GCP + 11 tech tiles) + OUTCOMES (5 cards)
 * - Bottom Legend: Component types, flow types, on-prem/cloud, and version footer
 * - 100% Native Vector SVGs (0 raw emojis, 0 mojibake).
 */

const E = (v?: string | null) =>
  (v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// SVG Vector Icons Helper (100% offline, zero network dependency)
const SVG = {
  microscope: `<path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 1 0 0-14h-1"/><path d="M9 14h2"/><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"/><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/>`,
  flask: `<path d="M10 2v4.5L4.2 18.5a2 2 0 0 0 1.8 2.5h12a2 2 0 0 0 1.8-2.5L14 6.5V2"/><line x1="8.5" y1="2" x2="15.5" y2="2"/><line x1="7" y1="14" x2="17" y2="14"/>`,
  factory: `<path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 4V8l-7 4V4H2z"/><path d="M18 16h2"/><path d="M18 12h2"/>`,
  heartUser: `<circle cx="12" cy="7" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/><path d="M12 17c-2 0-3-1-3-2s1-2 3-2 3 1 3 2-1 2-3 2z"/>`,
  users: `<circle cx="9" cy="7" r="3.5"/><path d="M3 20a6 6 0 0 1 12 0"/><circle cx="16.5" cy="8.5" r="2.5"/><path d="M15 20a5 5 0 0 1 6 0"/>`,
  chart: `<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>`,
  shieldCheck: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>`,
  trendUp: `<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>`,
  handshake: `<path d="m11 17 2 2a1 1 0 0 0 1.4 0l4.6-4.6a2 2 0 0 0 0-2.8l-3.2-3.2a2 2 0 0 0-2.8 0L7 14.4"/><path d="m21.5 7-3.5-3.5a2 2 0 0 0-2.8 0L9.4 9.3"/><path d="m2 14.5 4.5 4.5a2 2 0 0 0 2.8 0l3.7-3.7"/>`,
  heartPulse: `<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M12 5v14"/>`,
  lightbulb: `<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>`,
  box: `<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>`,
  gear: `<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>`,
  globe: `<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>`,
  brain: `<path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04zM14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04z"/>`,
  cloud: `<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>`,
  network: `<rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><line x1="12" y1="12" x2="12" y2="8"/>`,
  leaf: `<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 12"/>`,
  timer: `<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>`,
  medal: `<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>`,
  dollar: `<line x1="12" y1="2" x2="12" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>`,
  database: `<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>`,
  sparkles: `<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z"/>`,
  search: `<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>`,
  folder: `<path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/>`,
  document: `<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/>`,
  server: `<rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>`,
  eye: `<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>`,
  puzzle: `<path d="M19.439 7.85c0-1.57-1.28-2.85-2.85-2.85h-1.74a3 3 0 0 0-5.698 0H7.41c-1.57 0-2.85 1.28-2.85 2.85v1.74a3 3 0 0 0 0 5.698V17c0 1.57 1.28 2.85 2.85 2.85h1.74a3 3 0 0 0 5.698 0h1.741c1.57 0 2.85-1.28 2.85-2.85v-1.74a3 3 0 0 0 0-5.698V7.85Z"/>`,
  rocket: `<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>`
};

const svgIcon = (key: keyof typeof SVG, color = "#2563EB", size = 18) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${SVG[key] || SVG.users}</svg>`;

export function generateTemplate05AsIsToBeXml(domainFlavor = "biopharma", theme: "light" | "dark" = "light"): string {
  const isDark = theme === "dark";
  const bg = isDark ? "#0F172A" : "#FFFFFF";
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

  // =========================================================================
  // 1. TOP HEADER BANNER & NOVACURA LOGO
  // =========================================================================
  cell("hdr_num", `<span style="font-size:24px;font-weight:900;color:#FFFFFF;">05</span>`, 16, 12, 54, 46, "rounded=1;arcSize=8;fillColor=#0F2A4A;strokeColor=#0F2A4A;html=1;align=center;verticalAlign=middle;");

  const titleHtml = `<div style="font-size:22px;font-weight:900;color:#0F172A;letter-spacing:-0.2px;line-height:1.1;">AS-IS / TO-BE — NOVACURA BIO-PHARMA PRODUCT</div>` +
    `<div style="font-size:13px;font-weight:700;color:#475569;margin-top:2px;">Transforming to an Intelligent, Integrated and Compliant Digital Platform</div>`;
  cell("hdr_title", titleHtml, 78, 12, 980, 46, "whiteSpace=wrap;overflow=hidden;text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  const brandLogoSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 32 32" fill="none"><circle cx="8" cy="8" r="4" fill="#1D4ED8"/><circle cx="24" cy="8" r="4" fill="#1D4ED8"/><circle cx="8" cy="24" r="4" fill="#1D4ED8"/><circle cx="24" cy="24" r="4" fill="#1D4ED8"/><line x1="8" y1="8" x2="24" y2="24" stroke="#1D4ED8" stroke-width="2.5"/><line x1="24" y1="8" x2="8" y2="24" stroke="#1D4ED8" stroke-width="2.5"/></svg>`;
  const brandHtml = `<div style="display:flex;align-items:center;justify-content:flex-end;gap:8px;"><div style="flex-shrink:0;">${brandLogoSvg}</div><div style="text-align:left;"><div style="font-size:16px;font-weight:900;color:#0F2A4A;letter-spacing:1px;line-height:1;">NOVACURA</div><div style="font-size:8px;font-weight:600;color:#64748B;font-style:italic;line-height:1;margin-top:2px;">Transforming Therapies. Improving Lives.</div></div></div>`;
  cell("hdr_brand", brandHtml, 1280, 12, 304, 46, "text;html=1;strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

  // =========================================================================
  // 2. LEFT: AS-IS CURRENT STATE (x: 16 to 626, y: 68 to 686, w: 610, h: 618)
  // =========================================================================
  cell("as_is_frame", "", 16, 68, 610, 618, "rounded=1;arcSize=3;fillColor=#FEF2F2;strokeColor=#F87171;strokeWidth=1.2;");
  cell("as_is_hdr_pill", "<b style=\"font-size:11px;color:#FFFFFF;letter-spacing:0.5px;\">AS-IS CURRENT STATE</b>", 175, 68, 290, 26, "rounded=0;fillColor=#DC2626;strokeColor=#DC2626;html=1;align=center;verticalAlign=middle;");

  // Pain Points Row (y: 100, h: 42)
  const painPoints = [
    { name: "Siloed<br/>Systems", icon: "folder" },
    { name: "Manual<br/>Processes", icon: "document" },
    { name: "Data<br/>Inconsistency", icon: "chart" },
    { name: "Limited<br/>Visibility", icon: "eye" },
    { name: "High<br/>Operational Cost", icon: "trendUp" },
    { name: "Long Time<br/>to Market", icon: "timer" }
  ];
  painPoints.forEach((pp, i) => {
    const px = 24 + i * 98;
    const html = `<div style="display:flex;align-items:center;gap:6px;padding:2px 4px;">
      <div style="flex-shrink:0;">${svgIcon(pp.icon as keyof typeof SVG, "#DC2626", 16)}</div>
      <div style="font-size:7.5px;font-weight:800;color:#991B1B;line-height:1.15;">${pp.name}</div>
    </div>`;
    cell(`as_is_pp_${i}`, html, px, 100, 94, 38, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#FECACA;strokeWidth=1;html=1;align=left;verticalAlign=middle;padding=2;");
  });

  // Layer Labels on Far Left (x: 24, w: 84)
  const asIsLayers = [
    { id: "channels", name: "CHANNELS", y: 148, h: 68, icon: "users" },
    { id: "apps", name: "APPLICATIONS", y: 226, h: 78, icon: "box" },
    { id: "data", name: "DATA", y: 314, h: 76, icon: "database" },
    { id: "integration", name: "INTEGRATION", y: 400, h: 74, icon: "network" },
    { id: "infra", name: "INFRASTRUCTURE", y: 484, h: 74, icon: "server" },
    { id: "sec", name: "SECURITY &amp;<br/>GOVERNANCE", y: 576, h: 76, icon: "shieldCheck" }
  ];

  asIsLayers.forEach((l) => {
    const html = `<div style="text-align:center;padding:2px;">
      <div style="display:flex;justify-content:center;margin-bottom:2px;">${svgIcon(l.icon as keyof typeof SVG, "#991B1B", 18)}</div>
      <div style="font-size:7.5px;font-weight:900;color:#991B1B;line-height:1.15;">${l.name}</div>
    </div>`;
    cell(`as_is_lbl_${l.id}`, html, 24, l.y, 82, l.h, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
    rawEdge(`as_is_div_${l.id}`, "edgeStyle=none;strokeColor=#FECACA;strokeWidth=1;endArrow=none;", [{ x: 110, y: l.y }, { x: 110, y: l.y + l.h }]);
  });

  // 1. CHANNELS (y: 148)
  const asIsChannels = [
    { title: "Research<br/>Teams", icon: "microscope" },
    { title: "Clinical<br/>Ops", icon: "users" },
    { title: "Regulatory<br/>Affairs", icon: "document" },
    { title: "Commercial<br/>Teams", icon: "chart" },
    { title: "Patients /<br/>HCPs", icon: "heartUser" }
  ];
  asIsChannels.forEach((ch, i) => {
    const cx = 118 + i * 100;
    const html = `<div style="text-align:center;padding:4px 2px;">
      <div style="display:flex;justify-content:center;margin-bottom:3px;">${svgIcon(ch.icon as keyof typeof SVG, "#475569", 16)}</div>
      <div style="font-size:8px;font-weight:700;color:#1E293B;line-height:1.15;">${ch.title}</div>
    </div>`;
    cell(`as_is_ch_${i}`, html, cx, 152, 94, 60, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // AS-IS Connectors: Channels -> Applications (Criss-cross red dashed flows)
  const asIsChanAppLinks = [
    { from: { x: 165, y: 212 }, to: { x: 158, y: 230 } },
    { from: { x: 165, y: 212 }, to: { x: 241, y: 230 } },
    { from: { x: 265, y: 212 }, to: { x: 241, y: 230 } },
    { from: { x: 265, y: 212 }, to: { x: 324, y: 230 } },
    { from: { x: 265, y: 212 }, to: { x: 407, y: 230 } },
    { from: { x: 365, y: 212 }, to: { x: 407, y: 230 } },
    { from: { x: 365, y: 212 }, to: { x: 490, y: 230 } },
    { from: { x: 465, y: 212 }, to: { x: 573, y: 230 } },
    { from: { x: 565, y: 212 }, to: { x: 407, y: 230 } },
    { from: { x: 565, y: 212 }, to: { x: 490, y: 230 } }
  ];
  asIsChanAppLinks.forEach((lk, idx) => {
    rawEdge(`e_as_ch_app_${idx}`, "edgeStyle=none;strokeColor=#F87171;strokeWidth=1.2;dashed=1;dashPattern=3 3;endArrow=classic;endSize=3.5;", [lk.from, lk.to]);
  });

  // 2. APPLICATIONS (y: 226)
  const asIsApps = [
    { title: "Discovery Tools<br/>(Various)" },
    { title: "eTMF<br/>(On-Prem)" },
    { title: "CTMS<br/>(On-Prem)" },
    { title: "Safety DB<br/>(Oracle)" },
    { title: "Regulatory<br/>Submissions<br/>(FTP / Email)" },
    { title: "Commercial<br/>Systems<br/>(ERP / CRM)" }
  ];
  asIsApps.forEach((ap, i) => {
    const ax = 118 + i * 83;
    const html = `<div style="text-align:center;padding:4px 2px;font-size:7.5px;font-weight:700;color:#1E293B;line-height:1.2;">${ap.title}</div>`;
    cell(`as_is_app_${i}`, html, ax, 230, 80, 70, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // AS-IS Connectors: Applications -> Data (Criss-cross red dashed flows)
  const asIsAppDataLinks = [
    { from: { x: 158, y: 300 }, to: { x: 165, y: 318 } },
    { from: { x: 241, y: 300 }, to: { x: 265, y: 318 } },
    { from: { x: 241, y: 300 }, to: { x: 465, y: 318 } },
    { from: { x: 324, y: 300 }, to: { x: 265, y: 318 } },
    { from: { x: 407, y: 300 }, to: { x: 365, y: 318 } },
    { from: { x: 490, y: 300 }, to: { x: 465, y: 318 } },
    { from: { x: 573, y: 300 }, to: { x: 565, y: 318 } }
  ];
  asIsAppDataLinks.forEach((lk, idx) => {
    rawEdge(`e_as_app_dt_${idx}`, "edgeStyle=none;strokeColor=#F87171;strokeWidth=1.2;dashed=1;dashPattern=3 3;endArrow=classic;endSize=3.5;", [lk.from, lk.to]);
  });

  // 3. DATA (y: 314)
  const asIsData = [
    { title: "R&amp;D Data<br/>(Disparate)" },
    { title: "Clinical Data<br/>(Siloed)" },
    { title: "Safety Data<br/>(Isolated)" },
    { title: "Regulatory Docs<br/>(File Shares)" },
    { title: "Commercial Data<br/>(Separate)" }
  ];
  asIsData.forEach((dt, i) => {
    const dx = 118 + i * 100;
    const html = `<div style="text-align:center;padding:4px 2px;font-size:8px;font-weight:700;color:#1E293B;line-height:1.2;">${dt.title}</div>`;
    cell(`as_is_dt_${i}`, html, dx, 318, 94, 68, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;html=1;align=center;verticalAlign=middle;padding=2;shape=cylinder;");
  });

  // AS-IS Connectors: Data -> Integration (Criss-cross red dashed flows)
  const asIsDataIntLinks = [
    { from: { x: 165, y: 386 }, to: { x: 178, y: 404 } },
    { from: { x: 265, y: 386 }, to: { x: 178, y: 404 } },
    { from: { x: 265, y: 386 }, to: { x: 303, y: 404 } },
    { from: { x: 365, y: 386 }, to: { x: 303, y: 404 } },
    { from: { x: 365, y: 386 }, to: { x: 428, y: 404 } },
    { from: { x: 465, y: 386 }, to: { x: 428, y: 404 } },
    { from: { x: 465, y: 386 }, to: { x: 553, y: 404 } },
    { from: { x: 565, y: 386 }, to: { x: 553, y: 404 } }
  ];
  asIsDataIntLinks.forEach((lk, idx) => {
    rawEdge(`e_as_dt_int_${idx}`, "edgeStyle=none;strokeColor=#F87171;strokeWidth=1.2;dashed=1;dashPattern=3 3;endArrow=classic;endSize=3.5;", [lk.from, lk.to]);
  });

  // 4. INTEGRATION (y: 400)
  const asIsInt = [
    { title: "Point-to-Point<br/>Interfaces", icon: "gear" },
    { title: "Batch ETL<br/>&amp; Scripts", icon: "network" },
    { title: "File Transfers<br/>(FTP / SFTP)", icon: "folder" },
    { title: "Email &amp; Manual<br/>Handoffs", icon: "document" }
  ];
  asIsInt.forEach((it, i) => {
    const ix = 118 + i * 125;
    const html = `<div style="display:flex;align-items:center;gap:6px;padding:3px 6px;">
      <div style="flex-shrink:0;">${svgIcon(it.icon as keyof typeof SVG, "#475569", 16)}</div>
      <div style="font-size:8px;font-weight:700;color:#1E293B;line-height:1.15;">${it.title}</div>
    </div>`;
    cell(`as_is_int_${i}`, html, ix, 404, 120, 64, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;html=1;align=left;verticalAlign=middle;padding=2;");
  });

  // AS-IS Connectors: Integration -> Infrastructure (Red dashed flows)
  const asIsIntInfLinks = [
    { from: { x: 178, y: 468 }, to: { x: 165, y: 488 } },
    { from: { x: 303, y: 468 }, to: { x: 265, y: 488 } },
    { from: { x: 303, y: 468 }, to: { x: 365, y: 488 } },
    { from: { x: 428, y: 468 }, to: { x: 465, y: 488 } },
    { from: { x: 553, y: 468 }, to: { x: 565, y: 488 } }
  ];
  asIsIntInfLinks.forEach((lk, idx) => {
    rawEdge(`e_as_int_inf_${idx}`, "edgeStyle=none;strokeColor=#F87171;strokeWidth=1.2;dashed=1;dashPattern=3 3;endArrow=classic;endSize=3.5;", [lk.from, lk.to]);
  });

  // 5. INFRASTRUCTURE (y: 484)
  const asIsInfra = [
    { title: "On-Prem<br/>Data Centers", icon: "server" },
    { title: "VMware<br/>Clusters", icon: "server" },
    { title: "Traditional<br/>Databases", icon: "database" },
    { title: "File Servers", icon: "folder" },
    { title: "Backup<br/>(Tape)", icon: "database" }
  ];
  asIsInfra.forEach((inf, i) => {
    const ifx = 118 + i * 100;
    const html = `<div style="text-align:center;padding:4px 2px;">
      <div style="display:flex;justify-content:center;margin-bottom:3px;">${svgIcon(inf.icon as keyof typeof SVG, "#475569", 16)}</div>
      <div style="font-size:8px;font-weight:700;color:#1E293B;line-height:1.15;">${inf.title}</div>
    </div>`;
    cell(`as_is_inf_${i}`, html, ifx, 488, 94, 64, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // AS-IS Connectors: Infrastructure -> Security & Governance (Red dashed flows)
  [165, 265, 365, 465, 565].forEach((x, idx) => {
    rawEdge(`e_as_inf_sc_${idx}`, "edgeStyle=none;strokeColor=#F87171;strokeWidth=1.2;dashed=1;dashPattern=3 3;endArrow=classic;endSize=3.5;", [
      { x, y: 552 },
      { x, y: 580 }
    ]);
  });

  // 6. SECURITY & GOVERNANCE (y: 576, h: 76)
  const asIsSec = [
    { title: "Siloed Security<br/>Policies", icon: "shieldCheck" },
    { title: "Manual Access<br/>Management", icon: "users" },
    { title: "Limited Audit<br/>&amp; Monitoring", icon: "search" },
    { title: "Compliance<br/>Risks", icon: "shieldCheck" },
    { title: "Data Privacy<br/>Challenges", icon: "shieldCheck" }
  ];
  asIsSec.forEach((sc, i) => {
    const scx = 118 + i * 100;
    const html = `<div style="display:flex;align-items:center;gap:4px;padding:3px 4px;">
      <div style="flex-shrink:0;">${svgIcon(sc.icon as keyof typeof SVG, "#DC2626", 14)}</div>
      <div style="font-size:7px;font-weight:700;color:#991B1B;line-height:1.15;">${sc.title}</div>
    </div>`;
    cell(`as_is_sc_${i}`, html, scx, 580, 94, 72, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#FECACA;strokeWidth=1;html=1;align=left;verticalAlign=middle;padding=2;");
  });

  // =========================================================================
  // 3. CENTER: TRANSFORMATION BENEFITS (x: 636 to 886, y: 68 to 686, w: 250, h: 618)
  // =========================================================================
  cell("trans_box", "", 636, 68, 250, 618, "rounded=1;arcSize=3;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.2;");
  cell("trans_hdr", "<b style=\"font-size:10.5px;color:#1D4ED8;letter-spacing:0.5px;\">TRANSFORMATION BENEFITS</b>", 636, 76, 250, 24, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // Prominent Transition Chevron Arrows connecting AS-IS -> TRANSFORMATION -> TO-BE
  cell("trans_arrow_left", "", 618, 360, 24, 52, "shape=singleArrow;arrowWidth=0.55;arrowSize=0.45;direction=east;fillColor=#BFDBFE;strokeColor=#3B82F6;strokeWidth=1.2;");
  cell("trans_arrow_right", "", 878, 360, 24, 52, "shape=singleArrow;arrowWidth=0.55;arrowSize=0.45;direction=east;fillColor=#BFDBFE;strokeColor=#3B82F6;strokeWidth=1.2;");

  const transBenefits = [
    { title: "Integrated Platform", desc: "Unified data, applications and processes across the value chain", icon: "puzzle" },
    { title: "End-to-End Visibility", desc: "Real-time insights and single source of truth", icon: "eye" },
    { title: "AI &amp; Automation", desc: "Intelligent automation, predictive analytics and faster decisions", icon: "brain" },
    { title: "Faster Time to Market", desc: "Standardized processes and modern technology accelerate delivery", icon: "rocket" },
    { title: "Lower Cost", desc: "Cloud-native operations and automation reduce TCO", icon: "dollar" },
    { title: "Risk &amp; Compliance", desc: "Built-in security, privacy and regulatory compliance", icon: "shieldCheck" }
  ];

  transBenefits.forEach((tb, i) => {
    const tby = 106 + i * 93;
    const html = `<div style="display:flex;align-items:flex-start;gap:8px;padding:6px 8px;width:218px;box-sizing:border-box;">
      <div style="width:34px;height:34px;border-radius:17px;background:#DBEAFE;border:1.2px solid #3B82F6;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
        ${svgIcon(tb.icon as keyof typeof SVG, "#1D4ED8", 20)}
      </div>
      <div style="flex:1;">
        <div style="font-size:9.5px;font-weight:900;color:#1D4ED8;line-height:1.2;">${tb.title}</div>
        <div style="font-size:7.5px;color:#475569;font-weight:500;line-height:1.2;margin-top:2px;">${tb.desc}</div>
      </div>
    </div>`;
    cell(`trans_c_${i}`, html, 644, tby, 234, 85, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#BFDBFE;strokeWidth=1;html=1;whiteSpace=wrap;align=left;verticalAlign=top;padding=2;");
  });

  // =========================================================================
  // 4. RIGHT: TO-BE FUTURE STATE (x: 896 to 1584, y: 68 to 686, w: 688, h: 618)
  // =========================================================================
  cell("to_be_frame", "", 896, 68, 688, 618, "rounded=1;arcSize=3;fillColor=#F0FDF4;strokeColor=#86EFAC;strokeWidth=1.2;");
  cell("to_be_hdr_pill", "<b style=\"font-size:11px;color:#FFFFFF;letter-spacing:0.5px;\">TO-BE FUTURE STATE</b>", 1095, 68, 290, 26, "rounded=0;fillColor=#166534;strokeColor=#166534;html=1;align=center;verticalAlign=middle;");

  // Value Highlights Row (y: 100, h: 42)
  const valueHighlights = [
    { name: "Integrated<br/>Platform", icon: "puzzle" },
    { name: "Intelligent<br/>Automation", icon: "gear" },
    { name: "Trusted<br/>&amp; Compliant", icon: "shieldCheck" },
    { name: "Real-time<br/>Insights", icon: "chart" },
    { name: "Lower Cost", icon: "dollar" },
    { name: "Faster Time<br/>to Market", icon: "rocket" }
  ];
  valueHighlights.forEach((vh, i) => {
    const vx = 906 + i * 111;
    const html = `<div style="display:flex;align-items:center;gap:6px;padding:2px 4px;">
      <div style="flex-shrink:0;">${svgIcon(vh.icon as keyof typeof SVG, "#166534", 16)}</div>
      <div style="font-size:7.5px;font-weight:800;color:#166534;line-height:1.15;">${vh.name}</div>
    </div>`;
    cell(`to_be_vh_${i}`, html, vx, 100, 106, 38, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#BBF7D0;strokeWidth=1;html=1;align=left;verticalAlign=middle;padding=2;");
  });

  // 1. CHANNELS (y: 148, h: 56)
  const toBeChannels = [
    { title: "Research<br/>Teams", icon: "microscope" },
    { title: "Clinical<br/>Ops", icon: "users" },
    { title: "Regulatory<br/>Affairs", icon: "document" },
    { title: "Commercial<br/>Teams", icon: "chart" },
    { title: "Patients /<br/>HCPs", icon: "heartUser" },
    { title: "Partners &amp;<br/>Vendors", icon: "handshake" }
  ];
  toBeChannels.forEach((ch, i) => {
    const cx = 906 + i * 111;
    const html = `<div style="text-align:center;padding:4px 2px;">
      <div style="display:flex;justify-content:center;margin-bottom:3px;">${svgIcon(ch.icon as keyof typeof SVG, "#166534", 16)}</div>
      <div style="font-size:8px;font-weight:700;color:#166534;line-height:1.15;">${ch.title}</div>
    </div>`;
    cell(`to_be_ch_${i}`, html, cx, 150, 106, 52, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#BBF7D0;strokeWidth=1;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // TO-BE Connectors: Channels -> Novacura Digital Platform (Green drop flows)
  [959, 1070, 1181, 1292, 1403, 1514].forEach((x, idx) => {
    rawEdge(`e_tobe_ch_plat_${idx}`, "edgeStyle=none;strokeColor=#16A34A;strokeWidth=1.5;endArrow=classic;endSize=4;", [
      { x, y: 202 },
      { x, y: 210 }
    ]);
  });

  // 2. NOVACURA DIGITAL PLATFORM (CLOUD-NATIVE) (y: 210, h: 86)
  cell("to_be_dig_plat", "<div style=\"font-size:8px;font-weight:900;color:#0F2A4A;text-align:center;padding-top:2px;\">NOVACURA DIGITAL PLATFORM (CLOUD-NATIVE)</div>", 906, 210, 668, 86, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;html=1;align=center;verticalAlign=top;");

  const digitalApps = [
    { title: "AI / ML<br/>Workbench", icon: "brain" },
    { title: "eTMF<br/>(Cloud)", icon: "folder" },
    { title: "CTMS<br/>(Cloud)", icon: "users" },
    { title: "Safety &amp; PV<br/>(Cloud)", icon: "shieldCheck" },
    { title: "Regulatory<br/>Submissions", icon: "document" },
    { title: "Commercial<br/>(ERP / CRM)", icon: "chart" },
    { title: "Patient<br/>Engagement<br/>Portal", icon: "heartUser" }
  ];
  digitalApps.forEach((da, i) => {
    const dax = 914 + i * 93;
    const html = `<div style="text-align:center;padding:3px 2px;">
      <div style="display:flex;justify-content:center;margin-bottom:2px;">${svgIcon(da.icon as keyof typeof SVG, "#2563EB", 16)}</div>
      <div style="font-size:7.5px;font-weight:800;color:#0F172A;line-height:1.15;">${da.title}</div>
    </div>`;
    cell(`to_be_da_${i}`, html, dax, 230, 88, 60, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // TO-BE Connectors: Digital Platform <-> Governed Data Platform (Bidirectional Green flows)
  [958, 1051, 1144, 1237, 1330, 1423, 1516].forEach((x, idx) => {
    rawEdge(`e_tobe_plat_data_${idx}`, "edgeStyle=none;strokeColor=#16A34A;strokeWidth=1.5;startArrow=classic;endArrow=classic;startSize=4;endSize=4;", [
      { x, y: 296 },
      { x, y: 304 }
    ]);
  });

  // 3. DATA PLATFORM (UNIFIED & GOVERNED) (y: 304, h: 86)
  cell("to_be_data_plat", "<div style=\"font-size:8px;font-weight:900;color:#166534;text-align:center;padding-top:2px;\">DATA PLATFORM (UNIFIED &amp; GOVERNED)</div>", 906, 304, 668, 86, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.2;html=1;align=center;verticalAlign=top;");

  const governedData = [
    { title: "Unified Data Lake<br/>(BigQuery / Cloud Storage)", icon: "database" },
    { title: "Clinical Data<br/>(Structured)", icon: "database" },
    { title: "RWD &amp; Real-World<br/>Data", icon: "database" },
    { title: "Metadata &amp; Master<br/>Data Management", icon: "folder" },
    { title: "AI/ML Feature Store<br/>&amp; Vector DB", icon: "brain" }
  ];
  governedData.forEach((gd, i) => {
    const gdx = 914 + i * 131;
    const html = `<div style="text-align:center;padding:3px 2px;">
      <div style="display:flex;justify-content:center;margin-bottom:2px;">${svgIcon(gd.icon as keyof typeof SVG, "#166534", 16)}</div>
      <div style="font-size:7.5px;font-weight:800;color:#0F172A;line-height:1.15;">${gd.title}</div>
    </div>`;
    cell(`to_be_gd_${i}`, html, gdx, 324, 124, 60, "rounded=1;arcSize=4;fillColor=#F0FDF4;strokeColor=#BBF7D0;strokeWidth=1;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // TO-BE Connectors: Governed Data Platform <-> Integration (Bidirectional Green flows)
  [970, 1105, 1240, 1375, 1510].forEach((x, idx) => {
    rawEdge(`e_tobe_data_int_${idx}`, "edgeStyle=none;strokeColor=#16A34A;strokeWidth=1.5;startArrow=classic;endArrow=classic;startSize=4;endSize=4;", [
      { x, y: 390 },
      { x, y: 400 }
    ]);
  });

  // 4. INTEGRATION (y: 398, h: 58)
  const toBeIntegrations = [
    { title: "API Gateway<br/>&amp; Management", icon: "network" },
    { title: "Event Streaming<br/>(Pub/Sub)", icon: "network" },
    { title: "Data Integration<br/>(Dataflow)", icon: "network" },
    { title: "MCP / A2A<br/>Connectivity", icon: "network" },
    { title: "Partner &amp; Vendor<br/>Integrations", icon: "handshake" }
  ];
  toBeIntegrations.forEach((ti, i) => {
    const tix = 906 + i * 135;
    const html = `<div style="display:flex;align-items:center;gap:6px;padding:3px 4px;">
      <div style="flex-shrink:0;">${svgIcon(ti.icon as keyof typeof SVG, "#0284C7", 16)}</div>
      <div style="font-size:7.5px;font-weight:800;color:#0F172A;line-height:1.15;">${ti.title}</div>
    </div>`;
    cell(`to_be_ti_${i}`, html, tix, 400, 128, 52, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;html=1;align=left;verticalAlign=middle;padding=2;");
  });

  // TO-BE Connectors: Integration <-> Google Cloud Platform (Bidirectional Green flows)
  [968, 1077, 1186, 1295, 1404, 1513].forEach((x, idx) => {
    rawEdge(`e_tobe_int_gcp_${idx}`, "edgeStyle=none;strokeColor=#16A34A;strokeWidth=1.5;startArrow=classic;endArrow=classic;startSize=4;endSize=4;", [
      { x, y: 452 },
      { x, y: 464 }
    ]);
  });

  // 5. GOOGLE CLOUD PLATFORM (y: 464, h: 86)
  cell("to_be_gcp_box", "<div style=\"font-size:8px;font-weight:900;color:#0F2A4A;text-align:center;padding-top:2px;\">GOOGLE CLOUD PLATFORM</div>", 906, 464, 668, 86, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;html=1;align=center;verticalAlign=top;");

  const gcpServices = [
    { title: "Compute<br/>(GKE / Cloud Run)", icon: "server" },
    { title: "Storage<br/>(Cloud Storage)", icon: "folder" },
    { title: "Databases<br/>(Spanner / AlloyDB)", icon: "database" },
    { title: "Analytics<br/>(BigQuery)", icon: "search" },
    { title: "AI / ML<br/>(Vertex AI)", icon: "sparkles" },
    { title: "Global Regions<br/>&amp; Multi-Zone", icon: "globe" }
  ];
  gcpServices.forEach((gs, i) => {
    const gsx = 914 + i * 109;
    const html = `<div style="text-align:center;padding:3px 2px;">
      <div style="display:flex;justify-content:center;margin-bottom:2px;">${svgIcon(gs.icon as keyof typeof SVG, "#4285F4", 16)}</div>
      <div style="font-size:7.5px;font-weight:800;color:#0F172A;line-height:1.15;">${gs.title}</div>
    </div>`;
    cell(`to_be_gs_${i}`, html, gsx, 484, 102, 60, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // TO-BE Connectors: Google Cloud Platform -> Security & Governance (Green drop flows)
  [959, 1070, 1181, 1292, 1403, 1514].forEach((x, idx) => {
    rawEdge(`e_tobe_gcp_sec_${idx}`, "edgeStyle=none;strokeColor=#16A34A;strokeWidth=1.5;endArrow=classic;endSize=4;", [
      { x, y: 550 },
      { x, y: 580 }
    ]);
  });

  // 6. SECURITY & GOVERNANCE (y: 576, h: 76)
  const toBeSec = [
    { title: "Zero Trust<br/>Security", icon: "shieldCheck" },
    { title: "IAM &amp; Least<br/>Privilege", icon: "users" },
    { title: "Encryption<br/>(At Rest &amp; In Transit)", icon: "shieldCheck" },
    { title: "Audit Logging<br/>&amp; Monitoring", icon: "search" },
    { title: "Data Privacy<br/>&amp; Governance", icon: "shieldCheck" },
    { title: "Regulatory<br/>Compliance", icon: "shieldCheck" }
  ];
  toBeSec.forEach((ts, i) => {
    const tsx = 906 + i * 111;
    const html = `<div style="display:flex;align-items:center;gap:4px;padding:3px 4px;">
      <div style="flex-shrink:0;">${svgIcon(ts.icon as keyof typeof SVG, "#166534", 14)}</div>
      <div style="font-size:7px;font-weight:800;color:#166534;line-height:1.15;">${ts.title}</div>
    </div>`;
    cell(`to_be_ts_${i}`, html, tsx, 580, 106, 72, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#BBF7D0;strokeWidth=1;html=1;align=left;verticalAlign=middle;padding=2;");
  });

  // =========================================================================
  // 5. BOTTOM ROW: KEY TECHNOLOGY ENABLERS (x: 16..886) & OUTCOMES (x: 896..1584)
  // =========================================================================
  // Left: Key Technology Enablers (y: 698, w: 870, h: 86)
  cell("enablers_box", "", 16, 698, 870, 86, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("enablers_hdr", "<b style=\"font-size:9.5px;color:#0F2A4A;letter-spacing:0.5px;\">KEY TECHNOLOGY ENABLERS</b>", 16, 704, 870, 18, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  const btmTechTiles = [
    { title: "Google Cloud", icon: "cloud", color: "#4285F4" },
    { title: "Vertex AI", icon: "sparkles", color: "#7C3AED" },
    { title: "BigQuery", icon: "search", color: "#4285F4" },
    { title: "Cloud Storage", icon: "folder", color: "#4285F4" },
    { title: "Dataflow", icon: "network", color: "#4285F4" },
    { title: "Pub/Sub", icon: "network", color: "#4285F4" },
    { title: "Kubernetes<br/>(GKE)", icon: "gear", color: "#326CE5" },
    { title: "Apigee", icon: "gear", color: "#0284C7" },
    { title: "Looker", icon: "chart", color: "#34A853" },
    { title: "Dataplex", icon: "network", color: "#4285F4" },
    { title: "Gemini", icon: "sparkles", color: "#EA580C" },
    { title: "MCP / A2A", icon: "network", color: "#166534" }
  ];
  btmTechTiles.forEach((bt, i) => {
    const btx = 24 + i * 71;
    const html = `<div style="text-align:center;padding:2px 0;">
      <div style="display:flex;justify-content:center;margin-bottom:1px;">${svgIcon(bt.icon as keyof typeof SVG, bt.color, 16)}</div>
      <div style="font-size:7px;font-weight:800;color:#0F172A;line-height:1.1;">${bt.title}</div>
    </div>`;
    cell(`btm_tech_${i}`, html, btx, 726, 67, 52, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1;html=1;align=center;verticalAlign=middle;");
  });

  // Right: Outcomes (y: 698, w: 688, h: 86)
  cell("outcomes_box", "", 896, 698, 688, 86, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("outcomes_hdr", "<b style=\"font-size:9.5px;color:#0F2A4A;letter-spacing:0.5px;\">OUTCOMES</b>", 896, 704, 688, 18, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  const btmOutcomes = [
    { title: "Innovative<br/>Therapies", icon: "lightbulb", color: "#166534" },
    { title: "Improved Patient<br/>Outcomes", icon: "heartPulse", color: "#1D4ED8" },
    { title: "Accessible &amp;<br/>Affordable Care", icon: "users", color: "#0D9488" },
    { title: "Trusted by<br/>Partners", icon: "handshake", color: "#D97706" },
    { title: "Sustainable<br/>Growth", icon: "trendUp", color: "#6D28D9" }
  ];
  btmOutcomes.forEach((bo, i) => {
    const box = 906 + i * 133;
    const html = `<div style="text-align:center;padding:2px 0;">
      <div style="display:flex;justify-content:center;margin-bottom:2px;">${svgIcon(bo.icon as keyof typeof SVG, bo.color, 18)}</div>
      <div style="font-size:7.5px;font-weight:800;color:#0F172A;line-height:1.15;">${bo.title}</div>
    </div>`;
    cell(`btm_out_${i}`, html, box, 726, 126, 52, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;html=1;align=center;verticalAlign=middle;");
  });

  // =========================================================================
  // 6. BOTTOM LEGEND (x: 16 to 1584, y: 792, w: 1568, h: 36)
  // =========================================================================
  cell("legend_box", "", 16, 792, 1568, 36, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");

  cell("leg_title", "<b style=\"font-size:9px;color:#0F172A;letter-spacing:1px;\">LEGEND:</b>", 20, 796, 55, 28, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  cell("leg_as_is", `<span style="font-size:8px;font-weight:800;color:#DC2626;">As-Is Components</span>`, 80, 798, 105, 24, "rounded=1;arcSize=4;fillColor=#FEE2E2;strokeColor=#F87171;strokeWidth=1;html=1;align=center;verticalAlign=middle;");
  cell("leg_to_be", `<span style="font-size:8px;font-weight:800;color:#166534;">To-Be Components</span>`, 190, 798, 105, 24, "rounded=1;arcSize=4;fillColor=#DCFCE7;strokeColor=#86EFAC;strokeWidth=1;html=1;align=center;verticalAlign=middle;");

  cell("leg_flow_data", `<span style="font-size:8px;font-weight:700;color:#1D4ED8;">&mdash;&rarr; Data / Process Flow</span>`, 305, 798, 130, 24, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  cell("leg_flow_man", `<span style="font-size:8px;font-weight:700;color:#DC2626;">- - - &rarr; Manual / Batch / File Flow</span>`, 440, 798, 165, 24, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  cell("leg_flow_auto", `<span style="font-size:8px;font-weight:700;color:#166534;">&mdash;&rarr; Real-time / Automated Flow</span>`, 610, 798, 160, 24, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  cell("leg_onprem", `<div style="display:flex;align-items:center;gap:4px;">${svgIcon("server", "#475569", 14)}<span style="font-size:8px;font-weight:700;color:#475569;">On-Premise</span></div>`, 780, 798, 90, 24, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  cell("leg_cloud", `<div style="display:flex;align-items:center;gap:4px;">${svgIcon("cloud", "#4285F4", 14)}<span style="font-size:8px;font-weight:700;color:#475569;">Cloud</span></div>`, 875, 798, 70, 24, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  cell("leg_ver", "<span style=\"font-size:8px;font-weight:700;color:#64748B;\">v1.0 &ndash; May 2024</span>", 1460, 796, 116, 28, "text;html=1;strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_05_as_is_to_be" name="05 — As-Is / To-Be">
    <mxGraphModel dx="1600" dy="960" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="960" background="${bg}" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${c.join("\n        ")}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
