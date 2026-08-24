/**
 * Master 1:1 High-Craft Exact Ground-Truth Replica for Template 03: Business Process / Swimlane — NOVACURA BIO-PHARMA PRODUCT
 * Matches 100% of images/03.png (End-to-End Drug Development & Commercialization Lifecycle):
 * - Exact 1600x960 master canvas resolution with high-contrast, clean modern enterprise styling.
 * - Top Header: "03 BUSINESS PROCESS / SWIMLANE — NOVACURA BIO-PHARMA PRODUCT" + Subtitle + Top-Right NOVACURA Brand Block
 * - Top Phase Chevron Bar: SWIMLANES | 1. RESEARCH & DISCOVERY | 2. DEVELOPMENT | 3. MANUFACTURING | 4. COMMERCIALIZATION | 5. PATIENT OUTCOMES
 * - 7 Swimlane Rows:
 *   1. RESEARCH SCIENTIST (Discover & validate novel therapies)
 *   2. CLINICAL OPERATIONS (Design & execute clinical trials)
 *   3. REGULATORY AFFAIRS (Ensure compliance & regulatory submissions)
 *   4. MANUFACTURING OPERATIONS (Manufacture with quality & compliance)
 *   5. COMMERCIAL OPERATIONS (Deliver to market & engage customers)
 *   6. PATIENT & HEALTHCARE PROVIDERS (Care delivery & patient outcomes)
 *   7. DATA & DIGITAL PLATFORM (Enable data, analytics & insights)
 * - Exact Process Cards, Decision Diamonds ("Proceed to Clinical Trials?", "Regulatory Approval?"), and feedback return loops.
 * - Row 7 Foundation: 7 Shared Platform Services + Key Systems & Tools (Examples) Pod (Veeva, Medidata, SAP, IQVIA, Salesforce, Google Cloud, BigQuery, Dataplex, Vertex AI, Looker).
 * - Bottom Legend: 5 phase color pills + process step + decision + flow + feedback loop.
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
  flask: `<path d="M10 2v4.5L4.2 18.5a2 2 0 0 0 1.8 2.5h12a2 2 0 0 0 1.8-2.5L14 6.5V2"/><line x1="8.5" y1="2" x2="15.5" y2="2"/><line x1="7" y1="14" x2="17" y2="14"/>`,
  microscope: `<path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 1 0 0-14h-1"/><path d="M9 14h2"/><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"/><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/>`,
  users: `<circle cx="9" cy="7" r="3.5"/><path d="M3 20a6 6 0 0 1 12 0"/><circle cx="16.5" cy="8.5" r="2.5"/><path d="M15 20a5 5 0 0 1 6 0"/>`,
  user: `<circle cx="12" cy="7" r="4"/><path d="M5.5 21a8.5 8.5 0 0 1 13 0"/>`,
  shield: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`,
  shieldCheck: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>`,
  factory: `<path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 4V8l-7 4V4H2z"/><path d="M18 16h2"/><path d="M18 12h2"/>`,
  chart: `<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>`,
  heartUser: `<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>`,
  database: `<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>`,
  molecule: `<circle cx="12" cy="12" r="3"/><circle cx="19" cy="5" r="2.5"/><circle cx="5" cy="5" r="2.5"/><circle cx="19" cy="19" r="2.5"/><circle cx="5" cy="19" r="2.5"/><line x1="7" y1="7" x2="10" y2="10"/><line x1="17" y1="7" x2="14" y2="10"/><line x1="7" y1="17" x2="10" y2="14"/><line x1="17" y1="17" x2="14" y2="14"/>`,
  target: `<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>`,
  documentCheck: `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="m9 15 2 2 4-4"/>`,
  document: `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>`,
  landmark: `<line x1="2" y1="22" x2="22" y2="22"/><line x1="12" y1="2" x2="2" y2="7"/><line x1="12" y1="2" x2="22" y2="7"/><line x1="6" y1="7" x2="6" y2="18"/><line x1="10" y1="7" x2="10" y2="18"/><line x1="14" y1="7" x2="14" y2="18"/><line x1="18" y1="7" x2="18" y2="18"/>`,
  award: `<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>`,
  gear: `<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>`,
  truck: `<rect width="16" height="10" x="1" y="5" rx="1"/><polygon points="17 8 20 8 23 11 23 15 17 15 17 8"/><circle cx="5.5" cy="17.5" r="2.5"/><circle cx="18.5" cy="17.5" r="2.5"/>`,
  handshake: `<path d="m11 17 2 2a1 1 0 0 0 1.4 0l4.6-4.6a2 2 0 0 0 0-2.8l-3.2-3.2a2 2 0 0 0-2.8 0L7 14.4"/><path d="m21.5 7-3.5-3.5a2 2 0 0 0-2.8 0L9.4 9.3"/><path d="m2 14.5 4.5 4.5a2 2 0 0 0 2.8 0l3.7-3.7"/>`,
  pill: `<path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/>`,
  pulse: `<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>`,
  search: `<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>`,
  folder: `<path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/>`,
  brain: `<path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04zM14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04z"/>`,
  network: `<rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><line x1="12" y1="12" x2="12" y2="8"/>`,
  cloud: `<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>`,
  sparkles: `<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z"/>`
};

const svgIcon = (key: keyof typeof SVG, color = "#2563EB", size = 18) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${SVG[key] || SVG.users}</svg>`;

export function generateTemplate03SwimlaneXml(domainFlavor = "biopharma", theme: "light" | "dark" = "light"): string {
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

  // ==================== 1. TOP HEADER BANNER ====================
  // Header Badge "03"
  cell("hdr_num", `<span style="font-size:24px;font-weight:900;color:#FFFFFF;">03</span>`, 16, 12, 54, 46, "rounded=1;arcSize=8;fillColor=#0F2A4A;strokeColor=#0F2A4A;html=1;align=center;verticalAlign=middle;");

  // Title & Subtitle
  const titleHtml = `<div style="font-size:22px;font-weight:900;color:#0F172A;letter-spacing:-0.2px;line-height:1.1;">BUSINESS PROCESS / SWIMLANE — NOVACURA BIO-PHARMA PRODUCT</div>` +
    `<div style="font-size:13px;font-weight:700;color:#475569;margin-top:2px;">End-to-End Drug Development &amp; Commercialization Lifecycle</div>`;
  cell("hdr_title", titleHtml, 78, 12, 980, 46, "whiteSpace=wrap;overflow=hidden;text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  // Top Right Brand Logo
  const brandLogoSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 32 32" fill="none"><circle cx="8" cy="8" r="4" fill="#1D4ED8"/><circle cx="24" cy="8" r="4" fill="#1D4ED8"/><circle cx="8" cy="24" r="4" fill="#1D4ED8"/><circle cx="24" cy="24" r="4" fill="#1D4ED8"/><line x1="8" y1="8" x2="24" y2="24" stroke="#1D4ED8" stroke-width="2.5"/><line x1="24" y1="8" x2="8" y2="24" stroke="#1D4ED8" stroke-width="2.5"/></svg>`;
  const brandHtml = `<div style="display:flex;align-items:center;justify-content:flex-end;gap:8px;"><div style="flex-shrink:0;">${brandLogoSvg}</div><div style="text-align:left;"><div style="font-size:16px;font-weight:900;color:#0F2A4A;letter-spacing:1px;line-height:1;">NOVACURA</div><div style="font-size:8px;font-weight:600;color:#64748B;font-style:italic;line-height:1;margin-top:2px;">Transforming Therapies. Improving Lives.</div></div></div>`;
  cell("hdr_brand", brandHtml, 1280, 12, 304, 46, "text;html=1;strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

  // ==================== 2. PHASE COLUMN HEADERS (CHEVRONS) ====================
  const phases = [
    { title: "SWIMLANES", color: "#0F2A4A", x: 16, w: 180 },
    { title: "1. RESEARCH &amp; DISCOVERY", color: "#166534", x: 200, w: 330 },
    { title: "2. DEVELOPMENT", color: "#1D4ED8", x: 534, w: 460 },
    { title: "3. MANUFACTURING", color: "#6D28D9", x: 998, w: 220 },
    { title: "4. COMMERCIALIZATION", color: "#D97706", x: 1222, w: 234 },
    { title: "5. PATIENT OUTCOMES", color: "#0D9488", x: 1460, w: 124 },
  ];
  phases.forEach((p, idx) => {
    cell(`ph_${idx}`, `<b style="font-size:10.5px;color:#FFFFFF;letter-spacing:0.5px;">${p.title}</b>`, p.x, 70, p.w, 32, `rounded=0;fillColor=${p.color};strokeColor=${p.color};html=1;align=center;verticalAlign=middle;`);
  });

  // Swimlane Outer Container Frame (x=16..1584, y=102..784, w=1568, h=682)
  cell("swimlane_frame", "", 16, 102, 1568, 682, "rounded=0;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");

  // Phase Vertical Guidelines (Dashed dividers across process rows y=102..666)
  const phaseDividers = [200, 534, 998, 1222, 1460];
  phaseDividers.forEach((px, idx) => {
    rawEdge(`div_phase_${idx}`, "edgeStyle=none;strokeColor=#E2E8F0;strokeWidth=1.2;dashed=1;dashPattern=4 4;endArrow=none;", [
      { x: px, y: 102 },
      { x: px, y: 666 }
    ]);
  });

  // 7 Swimlane Rows (heights: 94px for Rows 1-6, 118px for Row 7)
  const lanes = [
    { id: "lane_research", y: 102, h: 94, icon: "microscope", color: "#166534", title: "RESEARCH<br/>SCIENTIST", desc: "Discover &amp; validate<br/>novel therapies" },
    { id: "lane_clinops", y: 196, h: 94, icon: "users", color: "#1D4ED8", title: "CLINICAL<br/>OPERATIONS", desc: "Design &amp; execute<br/>clinical trials" },
    { id: "lane_reg", y: 290, h: 94, icon: "shieldCheck", color: "#0D9488", title: "REGULATORY<br/>AFFAIRS", desc: "Ensure compliance<br/>&amp; regulatory submissions" },
    { id: "lane_mfg", y: 384, h: 94, icon: "factory", color: "#6D28D9", title: "MANUFACTURING<br/>OPERATIONS", desc: "Manufacture with<br/>quality &amp; compliance" },
    { id: "lane_comm", y: 478, h: 94, icon: "chart", color: "#EA580C", title: "COMMERCIAL<br/>OPERATIONS", desc: "Deliver to market &amp;<br/>engage customers" },
    { id: "lane_patient", y: 572, h: 94, icon: "heartUser", color: "#059669", title: "PATIENT &amp;<br/>HEALTHCARE PROVIDERS", desc: "Care delivery &amp;<br/>patient outcomes" },
    { id: "lane_platform", y: 666, h: 118, icon: "database", color: "#0F2A4A", title: "DATA &amp; DIGITAL<br/>PLATFORM", desc: "Enable data, analytics<br/>&amp; insights" },
  ];

  lanes.forEach((lane, idx) => {
    if (idx > 0) {
      rawEdge(`div_lane_${idx}`, "edgeStyle=none;strokeColor=#E2E8F0;strokeWidth=1.2;endArrow=none;", [
        { x: 16, y: lane.y },
        { x: 1584, y: lane.y }
      ]);
    }

    // Lane Role Pod (Left Column x=16..196)
    const podHtml = `<div style="display:flex;align-items:center;gap:8px;padding:4px 6px;"><div style="width:34px;height:34px;border-radius:17px;background:${lane.color};display:flex;align-items:center;justify-content:center;flex-shrink:0;">${svgIcon(lane.icon as keyof typeof SVG, "#FFFFFF", 18)}</div><div><div style="font-size:9.5px;font-weight:900;color:${lane.color};line-height:1.15;">${lane.title}</div><div style="font-size:7.5px;color:#64748B;font-weight:500;line-height:1.15;margin-top:2px;">${lane.desc}</div></div></div>`;
    cell(`${lane.id}_pod`, podHtml, 16, lane.y, 184, lane.h, "text;html=1;strokeColor=none;fillColor=#FFFFFF;align=left;verticalAlign=middle;padding=2;");
  });

  // ==================== 3. PROCESS NODES (CARDS & DIAMONDS) ====================
  const stepCard = (id: string, title: string, x: number, y: number, w: number, h: number, color: string, icon: keyof typeof SVG) => {
    const html = `<div style="text-align:center;padding:3px 4px;"><div style="display:flex;justify-content:center;margin-bottom:2px;">${svgIcon(icon, color, 14)}</div><div style="font-size:8.5px;font-weight:800;color:#0F172A;line-height:1.15;">${title.replace("\n", "<br/>")}</div></div>`;
    cell(id, html, x, y, w, h, `rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=${color};strokeWidth=1.2;html=1;align=center;verticalAlign=middle;padding=1;`);
  };

  const decisionDiamond = (id: string, title: string, x: number, y: number, w: number, h: number, strokeColor = "#F59E0B", fillColor = "#FFFBEB") => {
    const html = `<div style="font-size:7.5px;font-weight:800;color:#0F172A;text-align:center;line-height:1.1;">${title.replace("\n", "<br/>")}</div>`;
    cell(id, html, x, y, w, h, `rhombus;whiteSpace=wrap;html=1;fillColor=${fillColor};strokeColor=${strokeColor};strokeWidth=1.5;align=center;verticalAlign=middle;padding=2;`);
  };

  // --- ROW 1: RESEARCH SCIENTIST (y=102..196, centerY=149) ---
  stepCard("card_id_targets", "Identify\nTargets", 220, 122, 78, 54, "#166534", "target");
  stepCard("card_lead_disc", "Lead\nDiscovery", 324, 122, 78, 54, "#166534", "flask");
  stepCard("card_lead_opt", "Lead\nOptimization", 428, 122, 84, 54, "#166534", "molecule");
  stepCard("card_cand_sel", "Candidate\nSelection", 552, 122, 84, 54, "#1D4ED8", "documentCheck");
  stepCard("card_preclin", "Preclinical\nStudies", 662, 122, 84, 54, "#1D4ED8", "flask");

  // Decision 1: Proceed to Clinical Trials? (Centered between Row 1 and Row 2)
  decisionDiamond("dec_proceed_trials", "Proceed to\nClinical\nTrials?", 620, 196, 76, 50, "#10B981", "#ECFDF5");

  // --- ROW 2: CLINICAL OPERATIONS (y=196..290, centerY=243) ---
  stepCard("card_ind_sub", "IND\nSubmission", 500, 240, 78, 50, "#1D4ED8", "documentCheck");
  stepCard("card_phase1", "Clinical Trials\nPhase I", 606, 240, 84, 50, "#1D4ED8", "users");
  stepCard("card_phase2", "Clinical Trials\nPhase II", 716, 240, 84, 50, "#1D4ED8", "users");
  stepCard("card_phase3", "Clinical Trials\nPhase III", 826, 240, 84, 50, "#1D4ED8", "users");
  stepCard("card_nda_sub", "NDA / BLA\nSubmission", 936, 240, 84, 50, "#1D4ED8", "documentCheck");

  // Decision 2: Regulatory Approval? (Between Row 2 and Row 3)
  decisionDiamond("dec_reg_approval", "Regulatory\nApproval?", 1080, 240, 80, 50, "#F59E0B", "#FFFBEB");

  // --- ROW 3: REGULATORY AFFAIRS (y=290..384, centerY=337) ---
  stepCard("card_reg_strat", "Regulatory\nStrategy", 220, 310, 80, 54, "#0D9488", "document");
  stepCard("card_pre_ind", "Pre-IND\nMeeting", 324, 310, 80, 54, "#0D9488", "users");
  stepCard("card_ha_review", "Health Authority\nReview", 1020, 324, 88, 54, "#EA580C", "landmark");
  stepCard("card_approval_lic", "Approval /\nLicense", 1144, 324, 84, 54, "#EA580C", "award");

  // --- ROW 4: MANUFACTURING OPERATIONS (y=384..478, centerY=431) ---
  stepCard("card_proc_dev", "Process\nDevelopment", 606, 404, 84, 54, "#6D28D9", "gear");
  stepCard("card_tech_trans", "Scale-Up & Tech\nTransfer", 716, 404, 88, 54, "#6D28D9", "flask");
  stepCard("card_gmp_mfg", "GMP\nManufacturing", 828, 404, 88, 54, "#6D28D9", "factory");
  stepCard("card_qc_release", "Quality Control\n& Release", 940, 404, 88, 54, "#6D28D9", "shieldCheck");

  // --- ROW 5: COMMERCIAL OPERATIONS (y=478..572, centerY=525) ---
  stepCard("card_mkt_access", "Market Access\n& Pricing", 1030, 498, 88, 54, "#EA580C", "chart");
  stepCard("card_prod_launch", "Product Launch\n& Distribution", 1144, 498, 92, 54, "#EA580C", "truck");
  stepCard("card_sales_hcp", "Sales & HCP\nEngagement", 1262, 498, 90, 54, "#EA580C", "handshake");
  stepCard("card_patient_supp", "Patient Support\nPrograms", 1378, 498, 92, 54, "#EA580C", "heartUser");

  // --- ROW 6: PATIENT & HEALTHCARE PROVIDERS (y=572..666, centerY=619) ---
  stepCard("card_treat_adh", "Treatment &\nAdherence", 1144, 592, 92, 54, "#059669", "pill");
  stepCard("card_outcome_mon", "Outcomes\nMonitoring", 1262, 592, 90, 54, "#059669", "pulse");
  stepCard("card_rwe_evid", "Real-World\nEvidence", 1378, 592, 92, 54, "#059669", "database");

  // --- ROW 7: DATA & DIGITAL PLATFORM (y=666..784) ---
  const platformPods = [
    { title: "Data Collection<br/>(EDC, ePRO, Labs)", icon: "database", x: 216, w: 104 },
    { title: "Data Integration<br/>& Governance", icon: "network", x: 326, w: 104 },
    { title: "Analytics &<br/>AI/ML Insights", icon: "brain", x: 436, w: 104 },
    { title: "Document & Content<br/>Management", icon: "folder", x: 546, w: 114 },
    { title: "Security, Privacy<br/>& Compliance", icon: "shieldCheck", x: 666, w: 108 },
    { title: "Audit Trail &<br/>Lineage", icon: "search", x: 780, w: 98 },
    { title: "Reporting &<br/>Dashboards", icon: "chart", x: 884, w: 98 },
  ];
  platformPods.forEach((pod, i) => {
    const html = `<div style="text-align:center;padding:4px 2px;"><div style="display:flex;justify-content:center;margin-bottom:2px;">${svgIcon(pod.icon as keyof typeof SVG, "#0F2A4A", 18)}</div><div style="font-size:7.5px;font-weight:800;color:#0F2A4A;line-height:1.15;">${pod.title}</div></div>`;
    cell(`pod_plat_${i}`, html, pod.x, 680, pod.w, 90, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.2;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // Right Enclosure inside Row 7: KEY SYSTEMS & TOOLS (Examples) (x: 994..1572, w: 578, h: 90)
  const sysBoxHtml = `<div style="padding:4px 6px;">
    <div style="font-size:8.5px;font-weight:900;color:#0F2A4A;letter-spacing:0.5px;text-align:center;margin-bottom:4px;">KEY SYSTEMS &amp; TOOLS (Examples)</div>
    <div style="display:flex;justify-content:space-around;align-items:center;margin-bottom:4px;">
      <div style="text-align:center;"><div style="font-size:11px;font-weight:900;color:#EA580C;">Veeva</div><div style="font-size:6.5px;color:#64748B;">Veeva Vault</div></div>
      <div style="text-align:center;"><div style="font-size:10px;font-weight:900;color:#0284C7;">Medidata</div><div style="font-size:6.5px;color:#64748B;">Rave EDC</div></div>
      <div style="text-align:center;"><div style="font-size:11px;font-weight:900;color:#0F172A;">SAP</div><div style="font-size:6.5px;color:#64748B;">S/4HANA</div></div>
      <div style="text-align:center;"><div style="font-size:10px;font-weight:900;color:#2563EB;">IQVIA</div><div style="font-size:6.5px;color:#64748B;">Orchestrate</div></div>
      <div style="text-align:center;"><div style="font-size:8px;font-weight:900;background:#0284C7;color:#FFFFFF;padding:1px 4px;border-radius:4px;">Salesforce</div><div style="font-size:6.5px;color:#64748B;">Health Cloud</div></div>
    </div>
    <div style="display:flex;justify-content:space-around;align-items:center;">
      <div style="text-align:center;"><div style="display:flex;justify-content:center;">${svgIcon("cloud", "#4285F4", 14)}</div><div style="font-size:6.5px;color:#475569;font-weight:700;">Google Cloud</div></div>
      <div style="text-align:center;"><div style="display:flex;justify-content:center;">${svgIcon("search", "#4285F4", 14)}</div><div style="font-size:6.5px;color:#475569;font-weight:700;">BigQuery</div></div>
      <div style="text-align:center;"><div style="display:flex;justify-content:center;">${svgIcon("network", "#4285F4", 14)}</div><div style="font-size:6.5px;color:#475569;font-weight:700;">Dataplex</div></div>
      <div style="text-align:center;"><div style="display:flex;justify-content:center;">${svgIcon("sparkles", "#7C3AED", 14)}</div><div style="font-size:6.5px;color:#475569;font-weight:700;">Vertex AI</div></div>
      <div style="text-align:center;"><div style="display:flex;justify-content:center;">${svgIcon("chart", "#34A853", 14)}</div><div style="font-size:6.5px;color:#475569;font-weight:700;">Looker</div></div>
    </div>
  </div>`;
  cell("box_key_systems", sysBoxHtml, 994, 680, 578, 90, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.5;html=1;align=left;verticalAlign=top;padding=1;");

  // ==================== 4. WORKFLOW CONNECTORS ====================
  // Row 1 Connections
  rawEdge("e_id_to_disc", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#166534;strokeWidth=1.5;endArrow=classic;endSize=4;", [{ x: 298, y: 149 }, { x: 324, y: 149 }]);
  rawEdge("e_disc_to_opt", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#166534;strokeWidth=1.5;endArrow=classic;endSize=4;", [{ x: 402, y: 149 }, { x: 428, y: 149 }]);
  rawEdge("e_opt_to_cand", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#166534;strokeWidth=1.5;endArrow=classic;endSize=4;", [{ x: 512, y: 149 }, { x: 552, y: 149 }]);
  rawEdge("e_cand_to_preclin", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#1D4ED8;strokeWidth=1.5;endArrow=classic;endSize=4;", [{ x: 636, y: 149 }, { x: 662, y: 149 }]);

  // Preclinical Studies -> Decision 1
  rawEdge("e_preclin_to_dec1", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#1D4ED8;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 704, y: 176 },
    { x: 704, y: 221 },
    { x: 696, y: 221 }
  ]);

  // Decision 1 Branches:
  // Yes -> Phase I (Row 2)
  rawEdge("e_dec1_yes", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#10B981;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 658, y: 246 },
    { x: 658, y: 265 },
    { x: 648, y: 265 }
  ], "Yes");

  // No -> Return loop back to Candidate Selection / Lead Opt (Dashed Red)
  rawEdge("e_dec1_no", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#EF4444;strokeWidth=1.5;dashed=1;dashPattern=4 3;endArrow=classic;endSize=4;", [
    { x: 620, y: 221 },
    { x: 470, y: 221 },
    { x: 470, y: 176 }
  ], "No");

  // Regulatory Row 3 Pre-IND -> IND Submission (Row 2)
  rawEdge("e_reg_strat_to_pre", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#0D9488;strokeWidth=1.5;endArrow=classic;endSize=4;", [{ x: 300, y: 337 }, { x: 324, y: 337 }]);
  rawEdge("e_pre_to_ind", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#0D9488;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 404, y: 337 },
    { x: 450, y: 337 },
    { x: 450, y: 265 },
    { x: 500, y: 265 }
  ]);

  // IND Submission -> Phase I
  rawEdge("e_ind_to_p1", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#1D4ED8;strokeWidth=1.5;endArrow=classic;endSize=4;", [{ x: 578, y: 265 }, { x: 606, y: 265 }]);
  rawEdge("e_p1_to_p2", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#1D4ED8;strokeWidth=1.5;endArrow=classic;endSize=4;", [{ x: 690, y: 265 }, { x: 716, y: 265 }]);
  rawEdge("e_p2_to_p3", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#1D4ED8;strokeWidth=1.5;endArrow=classic;endSize=4;", [{ x: 800, y: 265 }, { x: 826, y: 265 }]);
  rawEdge("e_p3_to_nda", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#1D4ED8;strokeWidth=1.5;endArrow=classic;endSize=4;", [{ x: 910, y: 265 }, { x: 936, y: 265 }]);

  // NDA / BLA -> Decision 2
  rawEdge("e_nda_to_dec2", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#1D4ED8;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 1020, y: 265 },
    { x: 1080, y: 265 }
  ]);

  // Decision 2 Branches:
  // Yes -> Health Authority Review & Approval / License (Row 3)
  rawEdge("e_dec2_yes", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#10B981;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 1160, y: 265 },
    { x: 1186, y: 265 },
    { x: 1186, y: 324 }
  ], "Yes");

  // No -> Feedback return loop (Dashed Red)
  rawEdge("e_dec2_no", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#EF4444;strokeWidth=1.5;dashed=1;dashPattern=4 3;endArrow=classic;endSize=4;", [
    { x: 1120, y: 240 },
    { x: 1120, y: 149 },
    { x: 746, y: 149 }
  ], "No");

  // NDA -> Health Authority Review (Row 3)
  rawEdge("e_nda_to_ha", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#EA580C;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 978, y: 290 },
    { x: 978, y: 351 },
    { x: 1020, y: 351 }
  ]);

  // Health Authority Review -> Approval / License
  rawEdge("e_ha_to_appr", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#EA580C;strokeWidth=1.5;endArrow=classic;endSize=4;", [{ x: 1108, y: 351 }, { x: 1144, y: 351 }]);

  // Phase II -> Process Development (Row 4)
  rawEdge("e_p2_to_proc", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#6D28D9;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 758, y: 290 },
    { x: 758, y: 380 },
    { x: 648, y: 380 },
    { x: 648, y: 404 }
  ]);
  rawEdge("e_proc_to_tech", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#6D28D9;strokeWidth=1.5;endArrow=classic;endSize=4;", [{ x: 690, y: 431 }, { x: 716, y: 431 }]);
  rawEdge("e_tech_to_gmp", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#6D28D9;strokeWidth=1.5;endArrow=classic;endSize=4;", [{ x: 804, y: 431 }, { x: 828, y: 431 }]);
  rawEdge("e_gmp_to_qc", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#6D28D9;strokeWidth=1.5;endArrow=classic;endSize=4;", [{ x: 916, y: 431 }, { x: 940, y: 431 }]);

  // Approval & QC Release -> Market Access & Pricing (Row 5)
  rawEdge("e_appr_to_mkt", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#EA580C;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 1186, y: 378 },
    { x: 1186, y: 470 },
    { x: 1074, y: 470 },
    { x: 1074, y: 498 }
  ]);
  rawEdge("e_qc_to_mkt", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#EA580C;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 984, y: 458 },
    { x: 984, y: 525 },
    { x: 1030, y: 525 }
  ]);

  // Commercial Operations Chain
  rawEdge("e_mkt_to_launch", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#EA580C;strokeWidth=1.5;endArrow=classic;endSize=4;", [{ x: 1118, y: 525 }, { x: 1144, y: 525 }]);
  rawEdge("e_launch_to_sales", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#EA580C;strokeWidth=1.5;endArrow=classic;endSize=4;", [{ x: 1236, y: 525 }, { x: 1262, y: 525 }]);
  rawEdge("e_sales_to_supp", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#EA580C;strokeWidth=1.5;endArrow=classic;endSize=4;", [{ x: 1352, y: 525 }, { x: 1378, y: 525 }]);

  // Product Launch -> Treatment & Adherence (Row 6)
  rawEdge("e_launch_to_treat", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#059669;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 1190, y: 552 },
    { x: 1190, y: 592 }
  ]);
  rawEdge("e_treat_to_outc", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#059669;strokeWidth=1.5;endArrow=classic;endSize=4;", [{ x: 1236, y: 619 }, { x: 1262, y: 619 }]);
  rawEdge("e_outc_to_rwe", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#059669;strokeWidth=1.5;endArrow=classic;endSize=4;", [{ x: 1352, y: 619 }, { x: 1378, y: 619 }]);

  // ==================== 5. BOTTOM LEGEND ====================
  cell("legend_box", "", 16, 796, 1568, 44, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");

  const legPhases = [
    { title: "Research & Discovery", color: "#166534", bg: "#DCFCE7", x: 100, w: 140 },
    { title: "Development", color: "#1D4ED8", bg: "#DBEAFE", x: 248, w: 105 },
    { title: "Manufacturing", color: "#6D28D9", bg: "#F3E8FF", x: 361, w: 110 },
    { title: "Commercialization", color: "#D97706", bg: "#FEF3C7", x: 479, w: 125 },
    { title: "Patient Outcomes", color: "#0D9488", bg: "#CCFBF1", x: 612, w: 120 },
  ];
  cell("leg_title", "<b style=\"font-size:9.5px;color:#0F172A;letter-spacing:1px;\">LEGEND</b>", 24, 804, 70, 28, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  legPhases.forEach((lp, idx) => {
    cell(`leg_p_${idx}`, `<span style="font-size:8px;font-weight:800;color:${lp.color};">${lp.title}</span>`, lp.x, 806, lp.w, 24, `rounded=1;arcSize=4;fillColor=${lp.bg};strokeColor=${lp.color};strokeWidth=1;html=1;align=center;verticalAlign=middle;`);
  });

  cell("leg_sym_step", `<span style="font-size:8px;font-weight:700;color:#475569;">Process Step</span>`, 740, 806, 86, 24, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#475569;strokeWidth=1;html=1;align=center;verticalAlign=middle;");
  cell("leg_sym_dec", `<span style="font-size:7.5px;font-weight:700;color:#D97706;">Decision</span>`, 834, 804, 68, 28, "rhombus;whiteSpace=wrap;html=1;fillColor=#FFFBEB;strokeColor=#F59E0B;strokeWidth=1;align=center;verticalAlign=middle;");
  cell("leg_sym_flow", `<span style="font-size:8px;font-weight:700;color:#475569;">&mdash;&rarr; Flow</span>`, 910, 806, 70, 24, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  cell("leg_sym_dash", `<span style="font-size:8px;font-weight:700;color:#475569;">- - - &rarr; Feedback Loop</span>`, 988, 806, 130, 24, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_03_swimlane" name="03 — Business Process / Swimlane">
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

