/**
 * Master 1:1 High-Craft Exact Ground-Truth Replica for Template 02: Capability Map | NOVACURA Bio-Pharma Platform
 * Matches 100% of images/02.png:
 * - Exact 1600x960 master canvas resolution with high-contrast, clean modern enterprise styling.
 * - Top Header Banner: "02 — Capability Map | NOVACURA Bio-Pharma Platform" + Subtitle
 * - Top Center: USER / BUSINESS EXPERIENCE LAYER (4 Cards: Role-Based Portals, Workflow Experiences, Dashboards & Insights, Collaboration & Communication)
 * - Left Column: Business Outcomes Container (6 Cards: Faster submissions, Improved trial execution, Better signal detection, Stronger compliance, Reusable enterprise knowledge, Scalable automation)
 * - Center: NOVACURA Bio-Pharma Platform Box (Brand Block + 8 Core Business Capability Pods: Research & Discovery, Clinical Development, Regulatory Affairs, Safety / Pharmacovigilance, Quality & Manufacturing, Medical & Commercial, Knowledge Data & AI Foundation, Platform Security & Operations)
 * - Right Column: Primary Personas Container (8 Personas: Research Scientists, Clinical Ops, Regulatory Affairs, Safety Specialists, Quality Teams, Medical Affairs, Commercial Analytics, Platform Admins)
 * - Bottom Container: SHARED DIGITAL FOUNDATION (5 Blocks: Integrations & Connectivity, Data Platform, AI & Intelligent Services, Security & Compliance, Operations & Resilience)
 * - Bottom Legend: Business Capability, Shared Foundation, Governance / Control, AI-Enabled Capability
 * - 100% Native vector SVGs (0 raw emojis, 0 mojibake).
 */

const E = (v?: string | null) =>
  (v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// SVG Vector Icons Helper (100% offline, zero network dependency)
const SVG = {
  user: `<circle cx="12" cy="7" r="4"/><path d="M5.5 21a8.5 8.5 0 0 1 13 0"/>`,
  users: `<circle cx="9" cy="7" r="3.5"/><path d="M3 20a6 6 0 0 1 12 0"/><circle cx="16.5" cy="8.5" r="2.5"/><path d="M15 20a5 5 0 0 1 6 0"/>`,
  portal: `<rect width="18" height="14" x="3" y="5" rx="2"/><circle cx="8" cy="11" r="2"/><path d="M14 9h3"/><path d="M14 13h3"/>`,
  workflow: `<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="12" r="3"/><line x1="8.5" y1="7.5" x2="15.5" y2="10.5"/><line x1="8.5" y1="16.5" x2="15.5" y2="13.5"/>`,
  chart: `<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>`,
  message: `<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>`,
  trophy: `<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.45 1-1 1H8c-.55 0-1 .45-1 1v1h10v-1c0-.55-.45-1-1-1h-1c-.55 0-1-.45-1-1v-2.34"/><path d="M18 4H6v7a6 6 0 0 0 12 0V4Z"/>`,
  rocket: `<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>`,
  clipboard: `<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="m9 14 2 2 4-4"/>`,
  signal: `<path d="M2 20h.01"/><path d="M7 20v-4"/><path d="M12 20v-8"/><path d="M17 20V8"/><path d="M22 4v16"/>`,
  shieldCheck: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>`,
  shieldPlus: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="14"/><line x1="9" y1="11" x2="15" y2="11"/>`,
  books: `<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10"/><path d="M6 10h10"/>`,
  gear: `<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>`,
  microscope: `<path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 1 0 0-14h-1"/><path d="M9 14h2"/><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"/><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/>`,
  scale: `<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>`,
  factory: `<path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 4V8l-7 4V4H2z"/><path d="M18 16h2"/><path d="M18 12h2"/>`,
  stethoscope: `<path d="M4.5 3v5a4.5 4.5 0 0 0 9 0V3"/><path d="M13.5 3h3a2 2 0 0 1 2 2v6a7 7 0 0 1-14 0V5a2 2 0 0 1 2-2h3"/><circle cx="18" cy="18" r="3"/><path d="M9 12.5v3.5a4 4 0 0 0 4 4h2"/>`,
  target: `<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>`,
  database: `<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>`,
  document: `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>`,
  calendar: `<rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>`,
  search: `<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>`,
  flask: `<path d="M10 2v4.5L4.2 18.5a2 2 0 0 0 1.8 2.5h12a2 2 0 0 0 1.8-2.5L14 6.5V2"/><line x1="8.5" y1="2" x2="15.5" y2="2"/><line x1="7" y1="14" x2="17" y2="14"/>`,
  landmark: `<line x1="2" y1="22" x2="22" y2="22"/><line x1="12" y1="2" x2="2" y2="7"/><line x1="12" y1="2" x2="22" y2="7"/><line x1="6" y1="7" x2="6" y2="18"/><line x1="10" y1="7" x2="10" y2="18"/><line x1="14" y1="7" x2="14" y2="18"/><line x1="18" y1="7" x2="18" y2="18"/>`,
  checkCircle: `<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>`,
  pulse: `<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>`,
  inbox: `<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>`,
  folder: `<path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/>`,
  package: `<path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>`,
  refresh: `<path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21h5v-5"/>`,
  brain: `<path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04zM14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04z"/>`,
  sparkles: `<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z"/>`,
  lock: `<rect width="16" height="11" x="4" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>`,
  network: `<rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><line x1="12" y1="12" x2="12" y2="8"/>`,
  headset: `<path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>`,
  link: `<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>`,
  cloud: `<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>`,
  trendUp: `<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>`
};

const svgIcon = (key: keyof typeof SVG, color = "#2563EB", size = 18) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${SVG[key] || SVG.users}</svg>`;

export function generateTemplate02CapabilityMapXml(domainFlavor = "biopharma", theme: "light" | "dark" = "light"): string {
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
  // 1. TOP HEADER BANNER
  // =========================================================================
  const titleHtml = `<div style="font-size:24px;font-weight:900;color:#0F172A;letter-spacing:-0.2px;line-height:1.1;">02 — Capability Map | NOVACURA Bio-Pharma Platform</div>` +
    `<div style="font-size:13px;font-weight:700;color:#475569;margin-top:2px;">Core Architecture Family | Bio-Pharma Product</div>`;
  cell("hdr_title", titleHtml, 16, 12, 1000, 44, "whiteSpace=wrap;overflow=hidden;text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  // =========================================================================
  // 2. TOP CONTAINER: USER / BUSINESS EXPERIENCE LAYER (x: 260, y: 76, w: 1080, h: 96)
  // =========================================================================
  cell("exp_layer", "", 260, 76, 1080, 96, "rounded=1;arcSize=4;fillColor=#FAF5FF;strokeColor=#C4B5FD;strokeWidth=1.5;");
  cell("exp_title", "USER / BUSINESS EXPERIENCE LAYER", 260, 80, 1080, 16, "html=1;fontColor=#6D28D9;fontSize=10.5;fontStyle=1;align=center;verticalAlign=middle;");

  const expCards: { title: string; desc: string; icon: keyof typeof SVG }[] = [
    { title: "Role-Based Portals", desc: "Tailored experiences for every role and function", icon: "portal" },
    { title: "Workflow Experiences", desc: "Guided workflows that drive consistency and speed", icon: "workflow" },
    { title: "Dashboards & Insights", desc: "Real-time KPIs, performance and operational visibility", icon: "chart" },
    { title: "Collaboration & Communication", desc: "Secure communication, tasks, and document collaboration", icon: "message" },
  ];
  expCards.forEach((ec, i) => {
    const x = 274 + i * 264;
    const html = `<div style="display:flex;align-items:flex-start;gap:8px;padding:3px 6px;"><div style="padding-top:2px;">${svgIcon(ec.icon, "#6D28D9", 20)}</div><div><div style="font-size:9.5px;font-weight:800;color:#4C1D95;line-height:1.15;">${ec.title}</div><div style="font-size:7.5px;color:#475569;font-weight:500;line-height:1.2;margin-top:2px;">${ec.desc}</div></div></div>`;
    cell(`exp_c_${i}`, html, x, 100, 252, 60, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#DDD6FE;strokeWidth=1.2;html=1;align=left;verticalAlign=top;padding=2;");
  });

  // =========================================================================
  // 3. LEFT COLUMN: BUSINESS OUTCOMES (x: 16, y: 210, w: 206, h: 556)
  // =========================================================================
  cell("outcomes_box", "", 16, 210, 206, 556, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#60A5FA;strokeWidth=1.5;");

  // Header Badge inside Outcomes
  const outcomeHdrHtml = `<div style="display:flex;align-items:center;justify-content:center;gap:6px;"><div style="flex-shrink:0;">${svgIcon("trophy", "#1D4ED8", 16)}</div><div style="font-size:10px;font-weight:800;color:#1E40AF;">Business Outcomes</div></div>`;
  cell("outcomes_hdr", outcomeHdrHtml, 26, 220, 186, 28, "rounded=1;arcSize=4;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.2;html=1;align=center;verticalAlign=middle;padding=2;");

  const outcomes: { title: string; desc: string; icon: keyof typeof SVG }[] = [
    { title: "Faster submissions", desc: "Accelerate regulatory approvals with quality submissions.", icon: "rocket" },
    { title: "Improved trial execution", desc: "Optimize trials with better planning, monitoring and data quality.", icon: "clipboard" },
    { title: "Better signal detection", desc: "Detect safety signals earlier with integrated data and AI.", icon: "signal" },
    { title: "Stronger compliance", desc: "Ensure adherence to regulations and internal standards.", icon: "shieldCheck" },
    { title: "Reusable enterprise knowledge", desc: "Capture, standardize and reuse institutional knowledge.", icon: "books" },
    { title: "Scalable automation", desc: "Automate processes to drive efficiency and reduce cost.", icon: "gear" },
  ];
  outcomes.forEach((o, i) => {
    const y = 256 + i * 82;
    const html = `<div style="display:flex;align-items:flex-start;gap:8px;padding:3px 6px;"><div style="padding-top:2px;">${svgIcon(o.icon, "#1D4ED8", 18)}</div><div><div style="font-size:9.5px;font-weight:800;color:#1E3A8A;line-height:1.15;">${o.title}</div><div style="font-size:7.5px;color:#475569;font-weight:500;line-height:1.2;margin-top:2px;">${o.desc}</div></div></div>`;
    cell(`out_c_${i}`, html, 24, y, 190, 74, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#DBEAFE;strokeWidth=1.2;html=1;align=left;verticalAlign=top;padding=2;");
  });

  // =========================================================================
  // 4. RIGHT COLUMN: PRIMARY PERSONAS (x: 1378, y: 210, w: 206, h: 556)
  // =========================================================================
  cell("personas_box", "", 1378, 210, 206, 556, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#2DD4BF;strokeWidth=1.5;");

  // Header Badge inside Personas
  const personaHdrHtml = `<div style="display:flex;align-items:center;justify-content:center;gap:6px;"><div style="flex-shrink:0;">${svgIcon("users", "#0D9488", 16)}</div><div style="font-size:10px;font-weight:800;color:#0F766E;">Primary Personas</div></div>`;
  cell("personas_hdr", personaHdrHtml, 1388, 220, 186, 28, "rounded=1;arcSize=4;fillColor=#F0FDFA;strokeColor=#99F6E4;strokeWidth=1.2;html=1;align=center;verticalAlign=middle;padding=2;");

  const personas: { title: string; icon: keyof typeof SVG }[] = [
    { title: "Research Scientists", icon: "microscope" },
    { title: "Clinical Ops", icon: "users" },
    { title: "Regulatory Affairs", icon: "scale" },
    { title: "Safety Specialists", icon: "shieldPlus" },
    { title: "Quality Teams", icon: "factory" },
    { title: "Medical Affairs", icon: "message" },
    { title: "Commercial Analytics", icon: "chart" },
    { title: "Platform Admins", icon: "gear" },
  ];
  personas.forEach((p, i) => {
    const y = 256 + i * 62;
    const html = `<div style="display:flex;align-items:center;gap:8px;padding:3px 6px;"><div style="width:26px;height:26px;border-radius:6px;background:#F0FDFA;border:1px solid #CCFBF1;display:flex;align-items:center;justify-content:center;flex-shrink:0;">${svgIcon(p.icon, "#0D9488", 15)}</div><div style="font-size:9.5px;font-weight:800;color:#134E4A;">${p.title}</div></div>`;
    cell(`per_c_${i}`, html, 1386, y, 190, 54, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CCFBF1;strokeWidth=1.2;html=1;align=left;verticalAlign=middle;padding=2;");
  });

  // =========================================================================
  // 5. CENTER MAIN CONTAINER: NOVACURA Bio-Pharma Platform (x: 242, y: 196, w: 1116, h: 560)
  // =========================================================================
  cell("core_box", "", 242, 196, 1116, 560, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#1D4ED8;strokeWidth=2.2;");

  // Brand Header
  const brandLogoSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 32 32" fill="none"><path d="M4 26L12 6L16 16L20 6L28 26H22L18 16L16 21L14 16L10 26H4Z" fill="#1D4ED8"/></svg>`;
  const brandHtml = `<div style="display:flex;align-items:center;justify-content:center;gap:10px;padding:2px 0;"><div style="flex-shrink:0;">${brandLogoSvg}</div><div style="text-align:left;"><div style="font-size:20px;font-weight:900;color:#1E3A8A;letter-spacing:1px;line-height:1;">NOVACURA Bio-Pharma Platform</div><div style="font-size:10px;font-weight:800;color:#0284C7;letter-spacing:1.5px;line-height:1;margin-top:2px;">CORE BUSINESS CAPABILITIES</div></div></div>`;
  cell("core_brand", brandHtml, 260, 204, 1080, 36, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // 8 Capability Pods Helper with proportional zero-void scaling
  const capPod = (
    id: string,
    num: string,
    title: string,
    items: { text: string; icon: keyof typeof SVG }[],
    x: number,
    y: number,
    w: number,
    h: number,
    color: string,
    bgTint: string,
    headerIcon: keyof typeof SVG,
    isAi = false
  ) => {
    const count = items.length;
    const itemPadding = count <= 4 ? "7px 8px" : count === 5 ? "5.5px 8px" : "3.5px 6px";
    const itemMargin = count <= 4 ? "6.5px" : count === 5 ? "4.5px" : "3px";
    const fontSize = count <= 4 ? "9px" : count === 5 ? "8.5px" : "8px";
    const iconSize = count <= 4 ? 14 : count === 5 ? 13 : 12;

    let itemsHtml = "";
    items.forEach((it) => {
      itemsHtml += `<div style="background:#FFFFFF;border:1px solid #E2E8F0;border-radius:4px;padding:${itemPadding};margin-bottom:${itemMargin};font-size:${fontSize};font-weight:700;color:#1E293B;display:flex;align-items:center;gap:6px;">${svgIcon(it.icon, color, iconSize)}<span>${it.text}</span></div>`;
    });

    const aiSparkle = isAi ? `<span style="margin-left:4px;">${svgIcon("sparkles", "#7C3AED", 14)}</span>` : "";
    const html = `<div style="padding:6px 7px;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:7px;">
        <div style="width:19px;height:19px;border-radius:9.5px;background:${color};color:#FFFFFF;font-size:9.5px;font-weight:900;display:flex;align-items:center;justify-content:center;flex-shrink:0;">${num}</div>
        <div style="flex-shrink:0;">${svgIcon(headerIcon, color, 17)}</div>
        <div style="font-size:10px;font-weight:800;color:${color};display:flex;align-items:center;">${title} ${aiSparkle}</div>
      </div>
      ${itemsHtml}
    </div>`;

    cell(id, html, x, y, w, h, `rounded=1;arcSize=4;fillColor=${bgTint};strokeColor=${color};strokeWidth=1.2;html=1;align=left;verticalAlign=top;padding=2;`);
  };

  // Top Row of 4 Core Capability Pods (y: 248, h: 236)
  capPod("cap_1", "1", "Research & Discovery", [
    { text: "Target Identification", icon: "target" },
    { text: "Preclinical Data Management", icon: "database" },
    { text: "Protocol Design", icon: "clipboard" },
    { text: "Study Planning", icon: "calendar" }
  ], 258, 248, 252, 236, "#1D4ED8", "#EFF6FF", "microscope");

  capPod("cap_2", "2", "Clinical Development", [
    { text: "Trial Design", icon: "document" },
    { text: "Site & Investigator Management", icon: "user" },
    { text: "Patient Recruitment & Enrollment", icon: "users" },
    { text: "Clinical Data Capture", icon: "clipboard" },
    { text: "Monitoring & Oversight", icon: "search" }
  ], 524, 248, 268, 236, "#1D4ED8", "#EFF6FF", "users");

  capPod("cap_3", "3", "Regulatory Affairs", [
    { text: "Submission Authoring", icon: "document" },
    { text: "eCTD / IDMP Management", icon: "folder" },
    { text: "Health Authority Correspondence", icon: "landmark" },
    { text: "Commitments & Variations", icon: "checkCircle" }
  ], 806, 248, 276, 236, "#1D4ED8", "#EFF6FF", "scale");

  capPod("cap_4", "4", "Safety / Pharmacovigilance", [
    { text: "Case Intake", icon: "inbox" },
    { text: "Signal Detection", icon: "pulse" },
    { text: "Benefit-Risk Assessment", icon: "scale" },
    { text: "Safety Reporting", icon: "document" }
  ], 1096, 248, 248, 236, "#7C3AED", "#FAF5FF", "shieldPlus");

  // Bottom Row of 4 Core Capability Pods (y: 494, h: 248)
  capPod("cap_5", "5", "Quality & Manufacturing", [
    { text: "QMS / Deviations / CAPA", icon: "shieldCheck" },
    { text: "Batch Record Review", icon: "document" },
    { text: "Change Control", icon: "refresh" },
    { text: "Product Release", icon: "package" },
    { text: "Supplier Quality", icon: "factory" }
  ], 258, 494, 252, 248, "#0D9488", "#F0FDFA", "factory");

  capPod("cap_6", "6", "Medical & Commercial", [
    { text: "Medical Information", icon: "message" },
    { text: "Content & Evidence Management", icon: "books" },
    { text: "Market Analytics", icon: "chart" },
    { text: "Forecasting & Performance Insights", icon: "trendUp" }
  ], 524, 494, 268, 248, "#0D9488", "#F0FDFA", "stethoscope");

  capPod("cap_7", "7", "Knowledge, Data & AI Foundation", [
    { text: "Document & Knowledge Hub", icon: "folder" },
    { text: "Master Data & Reference Data", icon: "database" },
    { text: "Data Lake / Warehouse", icon: "database" },
    { text: "Semantic Search / Vector Index", icon: "network" },
    { text: "AI Copilot & Workflow Automation", icon: "brain" }
  ], 806, 494, 276, 248, "#6D28D9", "#FAF5FF", "brain", true);

  capPod("cap_8", "8", "Platform, Security & Operations", [
    { text: "Identity & Access Management", icon: "lock" },
    { text: "Audit & Compliance", icon: "shieldCheck" },
    { text: "Data Lineage & Quality", icon: "chart" },
    { text: "API & Interoperability Layer", icon: "network" },
    { text: "Monitoring & Support", icon: "headset" },
    { text: "Tenant / Configuration Management", icon: "gear" }
  ], 1096, 494, 248, 248, "#4338CA", "#F5F3FF", "shieldPlus");

  // =========================================================================
  // 6. BOTTOM CONTAINER: SHARED DIGITAL FOUNDATION (x: 242, y: 772, w: 1116, h: 104)
  // =========================================================================
  cell("found_box", "", 242, 772, 1116, 104, "rounded=1;arcSize=4;fillColor=#F0F9FF;strokeColor=#38BDF8;strokeWidth=1.5;");
  cell("found_title", "SHARED DIGITAL FOUNDATION", 242, 776, 1116, 16, "html=1;fontColor:#0284C7;fontSize=10.5;fontStyle=1;align=center;verticalAlign=middle;");

  const foundationCards: { title: string; desc: string; icon: keyof typeof SVG }[] = [
    { title: "Integrations & Connectivity", desc: "Enterprise & partner systems, APIs, data exchange and ecosystem connectivity", icon: "link" },
    { title: "Data Platform", desc: "Data lake, warehouse and curated data products with governed access", icon: "database" },
    { title: "AI & Intelligent Services", desc: "AI models, copilots and intelligent services that enable automation and insight", icon: "brain" },
    { title: "Security & Compliance", desc: "Security-by-design, privacy, compliance frameworks and risk management", icon: "lock" },
    { title: "Operations & Resilience", desc: "Reliable, scalable operations with monitoring, backup and disaster recovery", icon: "cloud" },
  ];
  foundationCards.forEach((fc, i) => {
    const x = 254 + i * 218;
    const html = `<div style="display:flex;align-items:flex-start;gap:8px;padding:4px 6px;"><div style="width:28px;height:28px;border-radius:6px;background:#E0F2FE;border:1px solid #BAE6FD;display:flex;align-items:center;justify-content:center;flex-shrink:0;">${svgIcon(fc.icon, "#0284C7", 17)}</div><div><div style="font-size:9px;font-weight:800;color:#0369A1;line-height:1.2;">${fc.title}</div><div style="font-size:7px;color:#475569;font-weight:500;line-height:1.2;margin-top:2px;">${fc.desc}</div></div></div>`;
    cell(`found_c_${i}`, html, x, 796, 210, 68, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#BAE6FD;strokeWidth=1.2;html=1;align=left;verticalAlign=top;padding=2;");
  });

  // =========================================================================
  // 7. LEGEND CONTAINER (x: 190, y: 896, w: 1220, h: 48)
  // =========================================================================
  cell("legend_box", "", 190, 896, 1220, 48, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.2;");

  const legendHtml = `<div style="display:flex;align-items:center;justify-content:space-between;height:100%;padding:0 16px;">
    <div style="font-size:10px;font-weight:900;color:#0F172A;">LEGEND</div>
    <div style="display:flex;align-items:center;gap:8px;">
      <div style="width:20px;height:16px;border:1.5px solid #1D4ED8;background:#FFFFFF;border-radius:3px;"></div>
      <div><div style="font-size:8.5px;font-weight:800;color:#0F172A;">Business Capability</div><div style="font-size:7px;color:#64748B;">Core business domain capabilities</div></div>
    </div>
    <div style="display:flex;align-items:center;gap:8px;">
      <div style="width:20px;height:16px;border:1.5px solid #0D9488;background:#F0FDFA;border-radius:3px;"></div>
      <div><div style="font-size:8.5px;font-weight:800;color:#0F172A;">Shared Foundation</div><div style="font-size:7px;color:#64748B;">Enterprise-wide shared services</div></div>
    </div>
    <div style="display:flex;align-items:center;gap:8px;">
      <div style="width:20px;height:16px;border:1.5px solid #8B5CF6;background:#FAF5FF;border-radius:3px;"></div>
      <div><div style="font-size:8.5px;font-weight:800;color:#0F172A;">Governance / Control</div><div style="font-size:7px;color:#64748B;">Oversight, compliance and security</div></div>
    </div>
    <div style="display:flex;align-items:center;gap:8px;">
      <div>${svgIcon("sparkles", "#7C3AED", 16)}</div>
      <div><div style="font-size:8.5px;font-weight:800;color:#0F172A;">AI-Enabled Capability</div><div style="font-size:7px;color:#64748B;">Leveraging AI to drive outcomes</div></div>
    </div>
  </div>`;
  cell("legend_content", legendHtml, 190, 896, 1220, 48, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;padding=2;");

  // =========================================================================
  // 8. INTER-LAYER CONNECTORS (Straight Point-to-Point Connectors)
  // =========================================================================

  // Top: Experience <-> Core Platform (Vertical Purple Double Arrow at X=800)
  rawEdge("e_exp_to_core", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#7C3AED;strokeWidth=1.8;endArrow=classic;startArrow=classic;endSize=4;startSize=4;", [
    { x: 800, y: 172 },
    { x: 800, y: 196 }
  ]);

  // Left: Outcomes -> Core Platform (Horizontal Blue Arrow at Y=476)
  rawEdge("e_outcomes_to_core", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#1D4ED8;strokeWidth=2;endArrow=classic;endSize=5;", [
    { x: 222, y: 476 },
    { x: 242, y: 476 }
  ]);

  // Right: Personas -> Core Platform (Horizontal Teal Arrow at Y=476)
  rawEdge("e_personas_to_core", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#0D9488;strokeWidth=2;endArrow=classic;endSize=5;", [
    { x: 1378, y: 476 },
    { x: 1358, y: 476 }
  ]);

  // Bottom 1: Core Platform <-> Shared Foundation (Vertical Blue Double Arrow at X=800)
  rawEdge("e_core_to_found", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#0284C7;strokeWidth=1.8;endArrow=classic;startArrow=classic;endSize=4;startSize=4;", [
    { x: 800, y: 756 },
    { x: 800, y: 772 }
  ]);

  // Bottom 2: Shared Foundation <-> Legend (Vertical Blue Double Arrow at X=800)
  rawEdge("e_found_to_legend", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#0284C7;strokeWidth=1.8;endArrow=classic;startArrow=classic;endSize=4;startSize=4;", [
    { x: 800, y: 876 },
    { x: 800, y: 896 }
  ]);

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_02_capability_map" name="02 — Capability Map">
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
