/**
 * Master 1:1 High-Craft Exact Ground-Truth Replica for Template 04: Value Stream — NOVACURA BIO-PHARMA PRODUCT
 * Matches 100% of images/04.png (End-to-End Value Delivery from Research to Patient Impact):
 * - Canvas Resolution: 1600x960 master grid
 * - Top Header: "04 VALUE STREAM — NOVACURA BIO-PHARMA PRODUCT" + Subtitle + NOVACURA Brand Block
 * - 7 Main Matrix Rows:
 *   1. VALUE STAGES: 5 Prominent colored circles (Research, Development, Manufacturing, Commercialization, Patient Outcomes) with directional arrows
 *   2. KEY ACTIVITIES: 5 columns of color-coded bullet points (5 activities each)
 *   3. VALUE METRICS: 2 metrics per column with high-contrast icon pods & typography
 *   4. VALUE FLOW: 5 horizontal flow steps (Ideas & Hypotheses -> Validated Candidates -> Approved Therapy -> Accessible to Patients -> Better Lives)
 *   5. VALUE ENABLERS: 6 Cards (Data & AI, Digital Platforms, Quality & Compliance, Talent & Culture, Partner Ecosystem, Sustainability)
 *   6. TECHNOLOGY PLATFORM: Google Cloud + 11 Technology Tiles (Vertex AI, BigQuery, Dataplex, Dataflow, Pub/Sub, Apigee, Looker, Gemini, MCP/A2A, Kubernetes, Terraform, GitHub)
 *   7. VALUE OUTCOMES: 6 Badges (Faster Innovation, Higher Quality, Operational Excellence, Patient-Centricity, Financial Performance, Societal Impact)
 * - Right Column: DELIVERED OUTCOMES (5 vertical impact cards)
 * - Bottom Legend: 5 phase color pills + process/stage + flow + info/feedback + copyright
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
  megaphone: `<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>`,
  heartUser: `<circle cx="12" cy="7" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/><path d="M12 17c-2 0-3-1-3-2s1-2 3-2 3 1 3 2-1 2-3 2z"/>`,
  target: `<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>`,
  users: `<circle cx="9" cy="7" r="3.5"/><path d="M3 20a6 6 0 0 1 12 0"/><circle cx="16.5" cy="8.5" r="2.5"/><path d="M15 20a5 5 0 0 1 6 0"/>`,
  chart: `<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>`,
  shieldCheck: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>`,
  clipboardCheck: `<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>`,
  trendUp: `<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>`,
  handshake: `<path d="m11 17 2 2a1 1 0 0 0 1.4 0l4.6-4.6a2 2 0 0 0 0-2.8l-3.2-3.2a2 2 0 0 0-2.8 0L7 14.4"/><path d="m21.5 7-3.5-3.5a2 2 0 0 0-2.8 0L9.4 9.3"/><path d="m2 14.5 4.5 4.5a2 2 0 0 0 2.8 0l3.7-3.7"/>`,
  heartPulse: `<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M12 5v14"/>`,
  refresh: `<path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21h5v-5"/>`,
  lightbulb: `<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>`,
  box: `<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>`,
  gear: `<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>`,
  globe: `<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>`,
  brain: `<path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04zM14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04z"/>`,
  cloud: `<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>`,
  network: `<rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><line x1="12" y1="12" x2="12" y2="8"/>`,
  leaf: `<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6 0-1.5 2-4 5-5"/>`,
  timer: `<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>`,
  medal: `<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>`,
  userCheck: `<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/>`,
  dollar: `<line x1="12" y1="2" x2="12" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>`,
  database: `<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>`,
  sparkles: `<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z"/>`,
  search: `<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>`,
  gitHub: `<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>`
};

const svgIcon = (key: keyof typeof SVG, color = "#2563EB", size = 18) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${SVG[key] || SVG.users}</svg>`;

export function generateTemplate04ValueStreamXml(domainFlavor = "biopharma", theme: "light" | "dark" = "light"): string {
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
  cell("hdr_num", `<span style="font-size:24px;font-weight:900;color:#FFFFFF;">04</span>`, 16, 12, 54, 46, "rounded=1;arcSize=8;fillColor=#0F2A4A;strokeColor=#0F2A4A;html=1;align=center;verticalAlign=middle;");

  const titleHtml = `<div style="font-size:22px;font-weight:900;color:#0F172A;letter-spacing:-0.2px;line-height:1.1;">VALUE STREAM — NOVACURA BIO-PHARMA PRODUCT</div>` +
    `<div style="font-size:13px;font-weight:700;color:#475569;margin-top:2px;">End-to-End Value Delivery from Research to Patient Impact</div>`;
  cell("hdr_title", titleHtml, 78, 12, 980, 46, "whiteSpace=wrap;overflow=hidden;text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  const brandLogoSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 32 32" fill="none"><circle cx="8" cy="8" r="4" fill="#1D4ED8"/><circle cx="24" cy="8" r="4" fill="#1D4ED8"/><circle cx="8" cy="24" r="4" fill="#1D4ED8"/><circle cx="24" cy="24" r="4" fill="#1D4ED8"/><line x1="8" y1="8" x2="24" y2="24" stroke="#1D4ED8" stroke-width="2.5"/><line x1="24" y1="8" x2="8" y2="24" stroke="#1D4ED8" stroke-width="2.5"/></svg>`;
  const brandHtml = `<div style="display:flex;align-items:center;justify-content:flex-end;gap:8px;"><div style="flex-shrink:0;">${brandLogoSvg}</div><div style="text-align:left;"><div style="font-size:16px;font-weight:900;color:#0F2A4A;letter-spacing:1px;line-height:1;">NOVACURA</div><div style="font-size:8px;font-weight:600;color:#64748B;font-style:italic;line-height:1;margin-top:2px;">Transforming Therapies. Improving Lives.</div></div></div>`;
  cell("hdr_brand", brandHtml, 1280, 12, 304, 46, "text;html=1;strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

  // =========================================================================
  // 2. MAIN 5-STAGE MATRIX (x: 16 to 1270, y: 68 to 452, w: 1254, h: 384)
  // =========================================================================
  cell("matrix_frame", "", 16, 68, 1254, 384, "rounded=0;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");

  // Left Row Header Titles
  cell("lbl_val_stages", "<b style=\"font-size:9.5px;color:#0F2A4A;\">VALUE<br/>STAGES</b>", 16, 68, 140, 96, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  cell("lbl_key_act", "<b style=\"font-size:9.5px;color:#0F2A4A;\">KEY ACTIVITIES</b>", 16, 164, 140, 114, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  cell("lbl_val_metrics", "<b style=\"font-size:9.5px;color:#0F2A4A;\">VALUE METRICS</b>", 16, 278, 140, 114, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  cell("lbl_val_flow", "<b style=\"font-size:9.5px;color:#0F2A4A;\">VALUE FLOW</b>", 16, 392, 140, 60, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // Horizontal Grid Dividers
  rawEdge("div_row_1", "edgeStyle=none;strokeColor=#E2E8F0;strokeWidth=1;endArrow=none;", [{ x: 16, y: 164 }, { x: 1270, y: 164 }]);
  rawEdge("div_row_2", "edgeStyle=none;strokeColor=#E2E8F0;strokeWidth=1;endArrow=none;", [{ x: 16, y: 278 }, { x: 1270, y: 278 }]);
  rawEdge("div_row_3", "edgeStyle=none;strokeColor=#E2E8F0;strokeWidth=1;endArrow=none;", [{ x: 16, y: 392 }, { x: 1270, y: 392 }]);

  // Vertical Column Dividers
  rawEdge("div_col_0", "edgeStyle=none;strokeColor=#E2E8F0;strokeWidth=1;endArrow=none;", [{ x: 156, y: 68 }, { x: 156, y: 452 }]);
  const colXDividers = [378, 602, 826, 1050];
  colXDividers.forEach((x, i) => {
    rawEdge(`div_col_${i + 1}`, "edgeStyle=none;strokeColor=#E2E8F0;strokeWidth=1;dashed=1;dashPattern=3 3;endArrow=none;", [
      { x, y: 68 },
      { x, y: 452 }
    ]);
  });

  // 5 Stages Definition
  const stages = [
    {
      id: "s1",
      num: "1",
      name: "1. RESEARCH &amp;<br/>DISCOVERY",
      color: "#166534",
      bgLight: "#F0FDF4",
      icon: "microscope",
      x: 156,
      w: 222,
      activities: [
        "Target identification",
        "Biology &amp; assay research",
        "Hit discovery &amp; validation",
        "Lead optimization",
        "In silico modeling"
      ],
      metrics: [
        { label: "Discovery<br/>Success Rate", icon: "target", color: "#166534" },
        { label: "Candidate<br/>Backlog", icon: "flask", color: "#166534" }
      ],
      flowItem: "Ideas &amp; Hypotheses",
      flowIcon: "lightbulb"
    },
    {
      id: "s2",
      num: "2",
      name: "2. DEVELOPMENT",
      color: "#1D4ED8",
      bgLight: "#EFF6FF",
      icon: "flask",
      x: 378,
      w: 224,
      activities: [
        "Preclinical studies",
        "Clinical trial design",
        "CMC &amp; formulation",
        "Biomarker development",
        "Data management"
      ],
      metrics: [
        { label: "Trials Started", icon: "users", color: "#1D4ED8" },
        { label: "Development<br/>Cycle Time", icon: "chart", color: "#1D4ED8" }
      ],
      flowItem: "Validated Candidates",
      flowIcon: "box"
    },
    {
      id: "s3",
      num: "3",
      name: "3. MANUFACTURING",
      color: "#6D28D9",
      bgLight: "#FAF5FF",
      icon: "factory",
      x: 602,
      w: 224,
      activities: [
        "Process development",
        "Scale-up &amp; tech transfer",
        "GMP manufacturing",
        "Quality control &amp; testing",
        "Batch release"
      ],
      metrics: [
        { label: "First Pass Yield", icon: "shieldCheck", color: "#6D28D9" },
        { label: "Batch Release<br/>Cycle Time", icon: "clipboardCheck", color: "#6D28D9" }
      ],
      flowItem: "Approved Therapy",
      flowIcon: "gear"
    },
    {
      id: "s4",
      num: "4",
      name: "4. COMMERCIALIZATION",
      color: "#D97706",
      bgLight: "#FFFBEB",
      icon: "megaphone",
      x: 826,
      w: 224,
      activities: [
        "Regulatory submission",
        "Market access &amp; pricing",
        "Launch planning",
        "Sales &amp; distribution",
        "HCP engagement"
      ],
      metrics: [
        { label: "Time to Market", icon: "trendUp", color: "#D97706" },
        { label: "Market Access<br/>Coverage", icon: "handshake", color: "#D97706" }
      ],
      flowItem: "Accessible to Patients",
      flowIcon: "globe"
    },
    {
      id: "s5",
      num: "5",
      name: "5. PATIENT OUTCOMES",
      color: "#0D9488",
      bgLight: "#F0FDFA",
      icon: "heartUser",
      x: 1050,
      w: 220,
      activities: [
        "Patient onboarding",
        "Therapy adherence",
        "Outcomes monitoring",
        "Real-world evidence",
        "Continuous support"
      ],
      metrics: [
        { label: "Patient Outcomes<br/>Improvement", icon: "heartPulse", color: "#0D9488" },
        { label: "Real-World<br/>Impact", icon: "refresh", color: "#0D9488" }
      ],
      flowItem: "Better Lives",
      flowIcon: "users"
    }
  ];

  stages.forEach((st, idx) => {
    // 1. VALUE STAGES Header & Circle Pod
    const hdrHtml = `<div style="text-align:center;">
      <div style="font-size:10px;font-weight:900;color:${st.color};letter-spacing:0.5px;line-height:1.2;margin-bottom:6px;">${st.name}</div>
      <div style="width:50px;height:50px;border-radius:25px;background:${st.color};display:flex;align-items:center;justify-content:center;margin:0 auto;box-shadow:0 3px 6px rgba(0,0,0,0.12);">
        ${svgIcon(st.icon as keyof typeof SVG, "#FFFFFF", 26)}
      </div>
    </div>`;
    cell(`stage_hdr_${idx}`, hdrHtml, st.x, 70, st.w, 90, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=top;");

    // Horizontal Stage Transition Arrow
    if (idx < 4) {
      rawEdge(`e_stage_${idx}`, "edgeStyle=none;strokeColor=#334155;strokeWidth=2;endArrow=classic;endSize=5;", [
        { x: st.x + st.w - 18, y: 122 },
        { x: st.x + st.w + 14, y: 122 }
      ]);
    }

    // 2. KEY ACTIVITIES Bullet List
    let actBullets = "";
    st.activities.forEach((act) => {
      actBullets += `<div style="display:flex;align-items:flex-start;gap:5px;margin-bottom:3.5px;font-size:8.5px;font-weight:600;color:#1E293B;line-height:1.2;"><span style="color:${st.color};font-weight:900;font-size:10px;line-height:1;">•</span><span>${act}</span></div>`;
    });
    cell(`stage_act_${idx}`, `<div style="padding:6px 10px;">${actBullets}</div>`, st.x, 166, st.w, 110, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

    // 3. VALUE METRICS (2 pods per stage)
    st.metrics.forEach((m, mIdx) => {
      const my = 284 + mIdx * 52;
      const mHtml = `<div style="display:flex;align-items:center;gap:8px;padding:3px 6px;">
        <div style="width:30px;height:30px;border-radius:6px;background:${st.bgLight};border:1.2px solid ${st.color};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          ${svgIcon(m.icon as keyof typeof SVG, m.color, 16)}
        </div>
        <div style="font-size:8.5px;font-weight:800;color:${m.color};line-height:1.2;">${m.label}</div>
      </div>`;
      cell(`stage_m_${idx}_${mIdx}`, mHtml, st.x + 8, my, st.w - 16, 44, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1;html=1;align=left;verticalAlign=middle;padding=2;");
    });

    // 4. VALUE FLOW Step Pill
    const flowHtml = `<div style="display:flex;align-items:center;justify-content:center;gap:6px;padding:2px 4px;">
      <div style="flex-shrink:0;">${svgIcon(st.flowIcon as keyof typeof SVG, st.color, 16)}</div>
      <div style="font-size:8.5px;font-weight:800;color:#0F172A;line-height:1.1;">${st.flowItem}</div>
    </div>`;
    cell(`stage_flow_${idx}`, flowHtml, st.x + 10, 398, st.w - 20, 42, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;html=1;align=center;verticalAlign=middle;");

    // Horizontal Flow Transition Arrow
    if (idx < 4) {
      rawEdge(`e_flow_${idx}`, "edgeStyle=none;strokeColor=#1D4ED8;strokeWidth=1.5;endArrow=classic;endSize=4;", [
        { x: st.x + st.w - 8, y: 419 },
        { x: st.x + st.w + 8, y: 419 }
      ]);
    }
  });

  // =========================================================================
  // 3. ROW 5: VALUE ENABLERS (x: 16 to 1270, y: 462, w: 1254, h: 78)
  // =========================================================================
  cell("enablers_frame", "", 16, 462, 1254, 78, "rounded=0;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("lbl_val_enablers", "<b style=\"font-size:9.5px;color:#0F2A4A;\">VALUE<br/>ENABLERS</b>", 16, 462, 140, 78, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  rawEdge("div_col_enabler", "edgeStyle=none;strokeColor=#E2E8F0;strokeWidth=1;endArrow=none;", [{ x: 156, y: 462 }, { x: 156, y: 540 }]);

  const enablers = [
    { title: "DATA &amp; AI", desc: "AI/ML, Predictive Modeling, Real-world Data, Advanced Analytics", icon: "brain", color: "#1D4ED8", bg: "#EFF6FF" },
    { title: "DIGITAL PLATFORMS", desc: "Unified R&amp;D, Clinical, Manufacturing and Commercial Platforms", icon: "cloud", color: "#0284C7", bg: "#F0F9FF" },
    { title: "QUALITY &amp; COMPLIANCE", desc: "GxP Quality, Data Integrity, Regulatory Compliance", icon: "shieldCheck", color: "#166534", bg: "#F0FDF4" },
    { title: "TALENT &amp; CULTURE", desc: "Scientific Excellence, Cross-functional Collaboration", icon: "users", color: "#6D28D9", bg: "#FAF5FF" },
    { title: "PARTNER ECOSYSTEM", desc: "CROs, CMOs, Academic Partners, Tech Partners", icon: "network", color: "#D97706", bg: "#FFFBEB" },
    { title: "SUSTAINABILITY", desc: "Environmentally Responsible Operations", icon: "leaf", color: "#0D9488", bg: "#F0FDFA" }
  ];

  enablers.forEach((en, i) => {
    const ex = 164 + i * 183;
    const html = `<div style="display:flex;align-items:flex-start;gap:6px;padding:3px 4px;">
      <div style="width:24px;height:24px;border-radius:12px;background:${en.bg};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
        ${svgIcon(en.icon as keyof typeof SVG, en.color, 14)}
      </div>
      <div>
        <div style="font-size:8px;font-weight:900;color:#0F172A;line-height:1.15;">${en.title}</div>
        <div style="font-size:6.5px;color:#64748B;font-weight:500;line-height:1.15;margin-top:1.5px;">${en.desc}</div>
      </div>
    </div>`;
    cell(`enabler_c_${i}`, html, ex, 468, 178, 66, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1;html=1;align=left;verticalAlign=top;padding=2;");
  });

  // =========================================================================
  // 4. ROW 6: TECHNOLOGY PLATFORM (x: 16 to 1270, y: 548, w: 1254, h: 74)
  // =========================================================================
  cell("tech_frame", "", 16, 548, 1254, 74, "rounded=0;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("lbl_tech_plat", "<b style=\"font-size:9px;color:#0F2A4A;\">TECHNOLOGY<br/>PLATFORM</b>", 16, 548, 140, 74, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  rawEdge("div_col_tech", "edgeStyle=none;strokeColor=#E2E8F0;strokeWidth=1;endArrow=none;", [{ x: 156, y: 548 }, { x: 156, y: 622 }]);

  // Google Cloud Box
  const gcpBoxHtml = `<div style="display:flex;align-items:center;justify-content:center;gap:6px;">
    <div style="flex-shrink:0;">${svgIcon("cloud", "#4285F4", 18)}</div>
    <div style="font-size:9px;font-weight:900;color:#0F172A;">Google Cloud</div>
  </div>`;
  cell("tech_gcp", gcpBoxHtml, 164, 556, 110, 58, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;html=1;align=center;verticalAlign=middle;");

  // 12 Technology Tiles
  const techTiles = [
    { title: "Vertex AI", icon: "sparkles", color: "#7C3AED" },
    { title: "BigQuery", icon: "search", color: "#4285F4" },
    { title: "Dataplex", icon: "network", color: "#4285F4" },
    { title: "Dataflow", icon: "network", color: "#4285F4" },
    { title: "Pub/Sub", icon: "network", color: "#4285F4" },
    { title: "Apigee", icon: "gear", color: "#0284C7" },
    { title: "Looker", icon: "chart", color: "#34A853" },
    { title: "Gemini", icon: "sparkles", color: "#EA580C" },
    { title: "MCP / A2A", icon: "network", color: "#166534" },
    { title: "Kubernetes", icon: "gear", color: "#326CE5" },
    { title: "Terraform", icon: "box", color: "#7B42BC" },
    { title: "GitHub", icon: "gitHub", color: "#0F172A" }
  ];

  techTiles.forEach((tt, i) => {
    const tx = 282 + i * 82;
    const html = `<div style="text-align:center;padding:2px 0;">
      <div style="display:flex;justify-content:center;margin-bottom:2px;">${svgIcon(tt.icon as keyof typeof SVG, tt.color, 16)}</div>
      <div style="font-size:7.5px;font-weight:800;color:#0F172A;line-height:1.1;">${tt.title}</div>
    </div>`;
    cell(`tech_tile_${i}`, html, tx, 556, 76, 58, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1;html=1;align=center;verticalAlign=middle;");
  });

  // =========================================================================
  // 5. ROW 7: VALUE OUTCOMES (x: 16 to 1270, y: 630, w: 1254, h: 56)
  // =========================================================================
  cell("outcomes_frame", "", 16, 630, 1254, 56, "rounded=0;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("lbl_val_outcomes", "<b style=\"font-size:9.5px;color:#0F2A4A;\">VALUE<br/>OUTCOMES</b>", 16, 630, 140, 56, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  rawEdge("div_col_outcomes", "edgeStyle=none;strokeColor=#E2E8F0;strokeWidth=1;endArrow=none;", [{ x: 156, y: 630 }, { x: 156, y: 686 }]);

  const valOutcomes = [
    { title: "Faster Innovation", icon: "timer", color: "#166534" },
    { title: "Higher Quality", icon: "medal", color: "#1D4ED8" },
    { title: "Operational Excellence", icon: "gear", color: "#6D28D9" },
    { title: "Patient-Centricity", icon: "userCheck", color: "#0D9488" },
    { title: "Financial Performance", icon: "dollar", color: "#D97706" },
    { title: "Societal Impact", icon: "globe", color: "#059669" }
  ];

  valOutcomes.forEach((vo, i) => {
    const vx = 164 + i * 183;
    const html = `<div style="display:flex;align-items:center;gap:6px;padding:3px 6px;">
      <div style="flex-shrink:0;">${svgIcon(vo.icon as keyof typeof SVG, vo.color, 18)}</div>
      <div style="font-size:8.5px;font-weight:900;color:#0F172A;">${vo.title}</div>
    </div>`;
    cell(`vo_pill_${i}`, html, vx, 638, 178, 40, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;html=1;align=left;verticalAlign=middle;padding=2;");
  });

  // =========================================================================
  // 6. RIGHT COLUMN: DELIVERED OUTCOMES (x: 1284 to 1584, y: 68 to 686, w: 300, h: 618)
  // =========================================================================
  cell("delivered_box", "", 1284, 68, 300, 618, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("delivered_hdr", "<b style=\"font-size:10.5px;color:#0F2A4A;letter-spacing:0.5px;\">DELIVERED OUTCOMES</b>", 1284, 74, 300, 24, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  const deliveredCards = [
    { title: "INNOVATIVE THERAPIES", desc: "Bring novel treatments to patients faster", icon: "lightbulb", color: "#166534", bg: "#F0FDF4" },
    { title: "IMPROVED PATIENT OUTCOMES", desc: "Meaningful clinical and real-world impact", icon: "heartPulse", color: "#1D4ED8", bg: "#EFF6FF" },
    { title: "ACCESSIBLE &amp; AFFORDABLE CARE", desc: "Wider access through efficient commercialization", icon: "users", color: "#0D9488", bg: "#F0FDFA" },
    { title: "TRUSTED BY PARTNERS", desc: "Collaborate with best-in-class research &amp; healthcare partners", icon: "handshake", color: "#D97706", bg: "#FFFBEB" },
    { title: "SUSTAINABLE GROWTH", desc: "Drive long-term value for patients and stakeholders", icon: "trendUp", color: "#6D28D9", bg: "#FAF5FF" }
  ];

  deliveredCards.forEach((dc, i) => {
    const dy = 104 + i * 114;
    const html = `<div style="padding:8px 10px;text-align:center;">
      <div style="width:36px;height:36px;border-radius:18px;background:${dc.bg};border:1.2px solid ${dc.color};display:flex;align-items:center;justify-content:center;margin:0 auto 4px auto;">
        ${svgIcon(dc.icon as keyof typeof SVG, dc.color, 20)}
      </div>
      <div style="font-size:9px;font-weight:900;color:${dc.color};line-height:1.2;">${dc.title}</div>
      <div style="font-size:7.5px;color:#64748B;font-weight:500;line-height:1.2;margin-top:2px;">${dc.desc}</div>
    </div>`;
    cell(`deliv_c_${i}`, html, 1296, dy, 276, 106, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // =========================================================================
  // 7. BOTTOM LEGEND (x: 16 to 1584, y: 698, w: 1568, h: 42)
  // =========================================================================
  cell("legend_box", "", 16, 698, 1568, 42, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");

  const legPhases = [
    { title: "Research & Discovery", color: "#166534", bg: "#DCFCE7", x: 80, w: 135 },
    { title: "Development", color: "#1D4ED8", bg: "#DBEAFE", x: 222, w: 100 },
    { title: "Manufacturing", color: "#6D28D9", bg: "#F3E8FF", x: 328, w: 105 },
    { title: "Commercialization", color: "#D97706", bg: "#FEF3C7", x: 440, w: 120 },
    { title: "Patient Outcomes", color: "#0D9488", bg: "#CCFBF1", x: 566, w: 115 },
  ];
  cell("leg_title", "<b style=\"font-size:9.5px;color:#0F172A;letter-spacing:1px;\">LEGEND:</b>", 20, 705, 60, 28, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  legPhases.forEach((lp, idx) => {
    cell(`leg_p_${idx}`, `<span style="font-size:8px;font-weight:800;color:${lp.color};">${lp.title}</span>`, lp.x, 707, lp.w, 24, `rounded=1;arcSize=4;fillColor=${lp.bg};strokeColor=${lp.color};strokeWidth=1;html=1;align=center;verticalAlign=middle;`);
  });

  cell("leg_sym_step", `<span style="font-size:8px;font-weight:700;color:#475569;">Process / Stage</span>`, 690, 707, 95, 24, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#475569;strokeWidth=1;html=1;align=center;verticalAlign=middle;");
  cell("leg_sym_flow", `<span style="font-size:8px;font-weight:700;color:#475569;">&mdash;&rarr; Flow</span>`, 795, 707, 70, 24, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  cell("leg_sym_dash", `<span style="font-size:8px;font-weight:700;color:#475569;">- - - &rarr; Information / Feedback</span>`, 870, 707, 160, 24, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  cell("leg_copy", "<span style=\"font-size:8px;font-weight:700;color:#64748B;\">&copy; 2024 NOVACURA Bio-Pharma</span>", 1400, 705, 176, 28, "text;html=1;strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_04_valuestream" name="04 — Value Stream">
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
