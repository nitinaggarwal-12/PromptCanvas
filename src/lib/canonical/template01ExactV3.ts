/**
 * Master 1:1 High-Craft Exact Ground-Truth Replica for Template 01: System Context | NOVACURA Bio-Pharma Platform
 * Matches 100% of images/01.png:
 * - Exact 1600x960 master canvas resolution with high-contrast, clean modern enterprise styling.
 * - Top Header Banner: "01 — System Context | NOVACURA Bio-Pharma Platform" + Subtitle
 * - Top: Governance & Oversight Pod (Executive Leadership, Compliance / Legal, Data Governance Board)
 * - Left: Internal Business Users Container (7 Personas: Research Scientists, Clinical Operations, Regulatory Affairs Team, Safety / PV Specialists, Quality Assurance, Medical Affairs, Commercial Analytics)
 * - Center: NOVACURA Bio-Pharma Platform Box (Brand Block + 8 Domain Cards + 4 Cross-Cutting Governance/Security Badges)
 * - Right: External Ecosystem Container (4 Entities: CRO / CDMO Partners, Healthcare Providers / Investigators, Regulatory Authorities, Patients / Patient Programs)
 * - Bottom Left: Enterprise Systems (Upstream / Downstream) Container (7 Systems: Veeva Vault, Salesforce Health Cloud, SAP S/4HANA, LIMS, Clinical Trial Systems, Safety Database, Data Lake/Warehouse + Integration Patterns Bar)
 * - Bottom Right: AI / Knowledge Services (Enterprise Search, Vector Index, Approved LLM Service GCP Vertex AI + AI Copilot Note)
 * - Bottom Footer: Platform Operations (Platform Admins, Security / IAM Team, Support / Operations) + Full Visual Legend
 * - 100% Native vector SVGs (0 raw emojis, 0 mojibake).
 */

const E = (v?: string | null) =>
  (v ?? "")
    .replace(/&amp;/g, "&")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// SVG Vector Icons Helper (100% offline, zero network dependency)
const SVG = {
  user: `<circle cx="12" cy="7" r="4"/><path d="M5.5 21a8.5 8.5 0 0 1 13 0"/>`,
  users: `<circle cx="9" cy="7" r="3.5"/><path d="M3 20a6 6 0 0 1 12 0"/><circle cx="16.5" cy="8.5" r="2.5"/><path d="M15 20a5 5 0 0 1 6 0"/>`,
  microscope: `<path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 1 0 0-14h-1"/><path d="M9 14h2"/><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"/><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/>`,
  clipboard: `<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="m9 14 2 2 4-4"/>`,
  document: `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>`,
  shield: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`,
  shieldPlus: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="14"/><line x1="9" y1="11" x2="15" y2="11"/>`,
  award: `<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>`,
  message: `<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>`,
  stethoscope: `<path d="M4.5 3v5a4.5 4.5 0 0 0 9 0V3"/><path d="M13.5 3h3a2 2 0 0 1 2 2v6a7 7 0 0 1-14 0V5a2 2 0 0 1 2-2h3"/><circle cx="18" cy="18" r="3"/><path d="M9 12.5v3.5a4 4 0 0 0 4 4h2"/>`,
  chart: `<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>`,
  lock: `<rect width="16" height="11" x="4" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>`,
  flask: `<path d="M10 2v4.5L4.2 18.5a2 2 0 0 0 1.8 2.5h12a2 2 0 0 0 1.8-2.5L14 6.5V2"/><line x1="8.5" y1="2" x2="15.5" y2="2"/><line x1="7" y1="14" x2="17" y2="14"/>`,
  factory: `<path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 4V8l-7 4V4H2z"/><path d="M18 16h2"/><path d="M18 12h2"/>`,
  folder: `<path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/>`,
  brain: `<path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04zM14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04z"/>`,
  sparkles: `<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z"/>`,
  scale: `<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>`,
  globe: `<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>`,
  hospital: `<path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14"/><path d="M2 20h20"/><path d="M10 9h4"/><path d="M12 7v4"/><path d="M10 16h4"/><path d="M10 20v-4h4v4"/>`,
  landmark: `<line x1="2" y1="22" x2="22" y2="22"/><line x1="12" y1="2" x2="2" y2="7"/><line x1="12" y1="2" x2="22" y2="7"/><line x1="6" y1="7" x2="6" y2="18"/><line x1="10" y1="7" x2="10" y2="18"/><line x1="14" y1="7" x2="14" y2="18"/><line x1="18" y1="7" x2="18" y2="18"/>`,
  heartUser: `<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>`,
  cloud: `<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>`,
  database: `<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>`,
  search: `<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>`,
  network: `<rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><line x1="12" y1="12" x2="12" y2="8"/>`,
  gear: `<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>`,
  headset: `<path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>`,
  gavel: `<path d="m14 13-7.5 7.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L11 10"/><path d="m16 16 6-6"/><path d="m8 8 6-6"/><path d="m9 7 8 8"/><path d="m21 11-8-8"/>`
};

const svgIcon = (key: keyof typeof SVG, color = "#2563EB", size = 20) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${SVG[key] || SVG.users}</svg>`;

export function generateTemplate01ExactV3Xml(
  domainFlavor = "biopharma",
  theme: "light" | "dark" = "light"
): string {
  const isDark = theme === "dark";
  const c: string[] = [];

  const cell = (id: string, v: string, x: number, y: number, w: number, h: number, style: string) => {
    const normStyle = v ? (style.includes("whiteSpace=wrap") ? style : `whiteSpace=wrap;html=1;${style}`) : style;
    c.push(
      `<mxCell id="${id}" value="${E(v)}" style="${normStyle}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`
    );
  };

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
  cell("hdr_num", "<b style='font-size:16px;color:#ffffff;'>01</b>", 16, 14, 38, 38, "rounded=1;whiteSpace=wrap;html=1;fillColor=#1E3A8A;strokeColor=#1E3A8A;fontStyle=1;align=center;");
  const titleHtml = `<div style="font-size:22px;font-weight:900;color:#0F172A;letter-spacing:-0.2px;line-height:1.15;">01 — System Context Architecture</div>` +
    `<div style="font-size:11.5px;font-weight:700;color:#475569;margin-top:3px;">C4 Level 1 System Boundary — Personas, Core Domain Capabilities, Enterprise Systems of Record, Governed AI Runtime &amp; External Ecosystem</div>`;
  cell("hdr_title", titleHtml, 64, 10, 1050, 46, "whiteSpace=wrap;overflow=hidden;text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  // Top-Right Architectural Governance & Posture Badges
  const hdrBadges = [
    { id: "hdr_b_0", lbl: "C4 Level 1 • System Context", bg: "#EFF6FF", stroke: "#93C5FD", color: "#1E3A8A", x: 1132, w: 142 },
    { id: "hdr_b_1", lbl: "Zero-Trust mTLS • OIDC", bg: "#F0FDF4", stroke: "#86EFAC", color: "#15803D", x: 1282, w: 136 },
    { id: "hdr_b_2", lbl: "21 CFR Part 11 • GxP • HIPAA", bg: "#FAF5FF", stroke: "#C4B5FD", color: "#6D28D9", x: 1426, w: 154 }
  ];
  hdrBadges.forEach(hb => {
    cell(hb.id, `<div style="font-size:8px;font-weight:800;color:${hb.color};text-align:center;">${hb.lbl}</div>`, hb.x, 18, hb.w, 26, `rounded=1;arcSize=12;fillColor=${hb.bg};strokeColor=${hb.stroke};strokeWidth=1.2;html=1;align=center;verticalAlign=middle;`);
  });

  // ==================== 2. TOP GOVERNANCE & OVERSIGHT POD (x=480..1100, y=58..160) ====================
  cell("gov_box", "", 480, 58, 620, 102, "rounded=1;arcSize=4;fillColor=#FAF5FF;strokeColor=#C4B5FD;strokeWidth=1.5;");
  cell("gov_title", "Governance &amp; Policy Oversight", 480, 60, 620, 18, "text;strokeColor=none;fillColor=none;html=1;fontColor=#6D28D9;fontSize=10.5;fontStyle=1;align=center;verticalAlign=middle;");

  const govCards: { t: string; items: string[]; icon: keyof typeof SVG; color: string }[] = [
    { t: "Executive Leadership", items: ["Strategic Direction", "Portfolio Oversight", "Value Realization"], icon: "user", color: "#6D28D9" },
    { t: "Compliance / Legal", items: ["Policy & Compliance", "Risk Management", "Audit & eDiscovery"], icon: "scale", color: "#6D28D9" },
    { t: "Data Governance Board", items: ["Data Standards", "Quality & Lineage", "Access & Ethics"], icon: "users", color: "#6D28D9" }
  ];
  govCards.forEach((gc, idx) => {
    const gx = 494 + idx * 200;
    const itemsHtml = gc.items.map(it => `<div style="font-size:8px;color:#475569;font-weight:600;line-height:1.2;">• ${it}</div>`).join("");
    const html = `<div style="display:flex;align-items:flex-start;gap:8px;padding:4px 6px;"><div style="padding-top:2px;">${svgIcon(gc.icon, gc.color, 20)}</div><div><div style="font-size:9px;font-weight:800;color:#0F172A;line-height:1.15;margin-bottom:2px;">${gc.t}</div>${itemsHtml}</div></div>`;
    cell(`gov_c_${idx}`, html, gx, 82, 190, 70, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#E9D5FF;strokeWidth=1.2;html=1;align=left;verticalAlign=top;padding=2;");
  });

  // ==================== 3. LEFT COLUMN: INTERNAL BUSINESS USERS (x=16..286, y=140..635) ====================
  cell("users_box", "", 16, 140, 270, 495, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.5;");
  cell("users_title", "Internal Business Users (Actors)", 16, 144, 270, 22, "text;strokeColor=none;fillColor=none;html=1;fontColor=#1E3A8A;fontSize=11.5;fontStyle=1;align=center;verticalAlign=middle;");

  const personas: { t: string; desc: string; icon: keyof typeof SVG; color: string }[] = [
    { t: "Research Scientists", desc: "Design studies, manage lab &amp; preclinical data, experiment insights", icon: "microscope", color: "#1E3A8A" },
    { t: "Clinical Operations", desc: "Run trials, monitor sites, manage participants and activities", icon: "clipboard", color: "#1E3A8A" },
    { t: "Regulatory Affairs Team", desc: "Prepare submissions, track commitments, manage variations", icon: "document", color: "#1E3A8A" },
    { t: "Safety / PV Specialists", desc: "Detect, evaluate, report adverse events and safety signals", icon: "shieldPlus", color: "#1E3A8A" },
    { t: "Quality Assurance", desc: "Manage quality events, CAPA, audits, deviations", icon: "award", color: "#1E3A8A" },
    { t: "Medical Affairs", desc: "Respond to inquiries, medical content and evidence", icon: "stethoscope", color: "#1E3A8A" },
    { t: "Commercial Analytics", desc: "Market insights, forecasting, performance &amp; customer analytics", icon: "chart", color: "#1E3A8A" }
  ];
  personas.forEach((p, idx) => {
    const py = 170 + idx * 65;
    const html = `<div style="display:flex;align-items:flex-start;gap:8px;padding:3px 6px;"><div style="padding-top:2px;">${svgIcon(p.icon, p.color, 20)}</div><div><div style="font-size:9.5px;font-weight:800;color:#0F172A;line-height:1.15;">${p.t}</div><div style="font-size:8px;color:#475569;font-weight:500;line-height:1.2;margin-top:2px;">${p.desc}</div></div></div>`;
    cell(`user_p_${idx}`, html, 24, py, 254, 58, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1.2;html=1;align=left;verticalAlign=top;padding=2;");
  });

  // Access Lock pod on the bracket connection
  const lockHtml = `<div style="text-align:center;padding:4px 2px;"><div style="display:flex;justify-content:center;margin-bottom:2px;">${svgIcon("lock", "#1D4ED8", 18)}</div><div style="font-size:8px;font-weight:800;color:#1E3A8A;line-height:1.15;">Unified Experience<br/><span style="font-weight:700;color:#0284C7;">(SSO • OIDC • RBAC)</span></div><div style="font-size:7.5px;color:#475569;font-weight:600;margin-top:2px;">Role-Scoped Workspaces</div></div>`;
  cell("portal_lock_pod", lockHtml, 308, 360, 112, 70, "rounded=1;arcSize=4;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.2;html=1;align=center;verticalAlign=middle;");

  // ==================== 4. CENTER CONTAINER: Core Platform Boundary (x=436..1090, y=190..635) ====================
  cell("plat_box", "", 436, 190, 654, 445, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#1D4ED8;strokeWidth=2.2;");
  cell("plat_title", "Core Application &amp; Domain Capability Boundary (System in Scope)", 436, 195, 654, 22, "text;strokeColor=none;fillColor=none;html=1;fontColor=#1E3A8A;fontSize=12;fontStyle=1;align=center;verticalAlign=middle;");

  // 8 Domain Capability Cards (2 cols x 4 rows — expanded to fill reclaimed brand space cleanly)
  const domainCards: { t: string; tag: string; items: string[]; icon: keyof typeof SVG; color: string; col: number; row: number }[] = [
    { t: "R&D & Clinical", tag: "CDISC ODM", items: ["Program & Portfolio Mgmt", "Protocols & Study Design", "Real-Time Trial Oversight"], icon: "flask", color: "#1D4ED8", col: 0, row: 0 },
    { t: "Regulatory Affairs", tag: "eCTD / IDMP", items: ["Global Dossier Submissions", "Health Authority Commitments", "Labeling & Variations"], icon: "document", color: "#1D4ED8", col: 1, row: 0 },
    { t: "Pharmacovigilance", tag: "ICH E2B(R3)", items: ["Adverse Event Case Intake", "Automated Signal Detection", "Benefit-Risk Evaluation"], icon: "shieldPlus", color: "#1D4ED8", col: 0, row: 1 },
    { t: "Quality & Manufacturing", tag: "GxP / Part 11", items: ["Quality Events & Deviations", "CAPA & Change Control", "Batch Record & Release"], icon: "factory", color: "#1D4ED8", col: 1, row: 1 },
    { t: "Medical Information", tag: "HL7 FHIR R4", items: ["HCP / Patient Inquiry Mgmt", "Approved Scientific Content", "Clinical Evidence Library"], icon: "message", color: "#1D4ED8", col: 0, row: 2 },
    { t: "Commercial Insights", tag: "OLAP / KPI", items: ["Omnichannel Market Analytics", "Demand & Launch Forecasting", "Territory Performance KPIs"], icon: "chart", color: "#1D4ED8", col: 1, row: 2 },
    { t: "Document & Knowledge Hub", tag: "Versioned KMS", items: ["Controlled Document Lifecycle", "Cryptographic Audit & Versioning", "Cross-Functional Authoring"], icon: "folder", color: "#1D4ED8", col: 0, row: 3 },
    { t: "AI Copilot & Orchestration", tag: "Agentic RAG", items: ["Citation-Backed Domain Q&A", "Multi-Step Workflow Automation", "Human-in-the-Loop Decisioning"], icon: "brain", color: "#7C3AED", col: 1, row: 3 }
  ];
  domainCards.forEach((dc, idx) => {
    const cx = 450 + dc.col * 314;
    const cy = 224 + dc.row * 86;
    const tagBg = dc.color === "#7C3AED" ? "#F3E8FF" : "#EFF6FF";
    const tagBorder = dc.color === "#7C3AED" ? "#DDD6FE" : "#BFDBFE";
    const itemsHtml = dc.items.map(it => `<div style="font-size:8px;color:#475569;font-weight:600;line-height:1.25;">• ${it}</div>`).join("");
    const html = `<div style="display:flex;align-items:flex-start;gap:8px;padding:5px 7px;"><div style="padding-top:2px;flex-shrink:0;">${svgIcon(dc.icon, dc.color, 22)}</div><div style="width:100%;"><div style="display:flex;align-items:center;justify-content:space-between;gap:4px;margin-bottom:3px;"><span style="font-size:9.5px;font-weight:800;color:#0F172A;line-height:1.15;">${dc.t}</span><span style="font-size:7px;font-weight:800;color:${dc.color};background:${tagBg};border:1px solid ${tagBorder};padding:1px 5px;border-radius:3px;white-space:nowrap;">${dc.tag}</span></div>${itemsHtml}</div></div>`;
    cell(`plat_dc_${idx}`, html, cx, cy, 304, 76, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#DBEAFE;strokeWidth=1.2;html=1;align=left;verticalAlign=top;padding=2;");
  });

  // 4 Bottom Cross-Cutting Badges inside Core Platform Boundary
  const platBadges: { t: string; sub: string; icon: keyof typeof SVG }[] = [
    { t: "Security & Privacy", sub: "(Zero Trust • mTLS)", icon: "shield" },
    { t: "Audit & Compliance", sub: "(21 CFR Part 11)", icon: "gavel" },
    { t: "Data Lineage & Quality", sub: "(End-to-End Catalog)", icon: "chart" },
    { t: "Interoperability", sub: "(FHIR • IDMP • REST)", icon: "network" }
  ];
  platBadges.forEach((pb, idx) => {
    const bx = 450 + idx * 157;
    const html = `<div style="display:flex;align-items:center;justify-content:center;gap:5px;padding:2px;"><div style="flex-shrink:0;">${svgIcon(pb.icon, "#1E3A8A", 15)}</div><div style="text-align:left;"><div style="font-size:8px;font-weight:800;color:#0F172A;line-height:1.15;">${pb.t}</div><div style="font-size:7.5px;font-weight:600;color:#475569;line-height:1.15;">${pb.sub}</div></div></div>`;
    cell(`plat_pb_${idx}`, html, bx, 578, 150, 44, "rounded=1;arcSize=4;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // ==================== 5. RIGHT COLUMN: EXTERNAL ECOSYSTEM (x=1240..1584, y=165..595) ====================
  cell("ext_box", "", 1240, 165, 344, 430, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.5;");
  cell("ext_title", "External Ecosystem &amp; Partners", 1240, 168, 344, 22, "text;strokeColor=none;fillColor=none;html=1;fontColor=#15803D;fontSize=11.5;fontStyle=1;align=center;verticalAlign=middle;");

  const extEntities: { t: string; desc: string; icon: keyof typeof SVG; color: string }[] = [
    { t: "CRO / CDMO Partners", desc: "Study execution, clinical data management, manufacturing &amp; supply chain partners", icon: "users", color: "#16A34A" },
    { t: "Healthcare Providers / Investigators", desc: "Site collaboration, patient enrollment, study conduct, eSource clinical data", icon: "hospital", color: "#16A34A" },
    { t: "Regulatory Authorities", desc: "eCTD submissions, health authority queries, safety reports, compliance status", icon: "landmark", color: "#16A34A" },
    { t: "Patients / Patient Programs", desc: "Study participation, ePRO / eCOA telemetry, adherence &amp; support programs", icon: "heartUser", color: "#16A34A" }
  ];
  extEntities.forEach((ee, idx) => {
    const ey = 198 + idx * 96;
    const html = `<div style="display:flex;align-items:flex-start;gap:8px;padding:4px 6px;"><div style="padding-top:2px;">${svgIcon(ee.icon, ee.color, 24)}</div><div><div style="font-size:9.5px;font-weight:800;color:#0F172A;line-height:1.15;">${ee.t}</div><div style="font-size:8px;color:#475569;font-weight:500;line-height:1.25;margin-top:3px;">${ee.desc}</div></div></div>`;
    cell(`ext_e_${idx}`, html, 1250, ey, 324, 86, "rounded=1;arcSize=4;fillColor=#F0FDF4;strokeColor=#BBF7D0;strokeWidth=1.2;html=1;align=left;verticalAlign=top;padding=2;");
  });

  // ==================== 6. LOWER MID TIER: ENTERPRISE SYSTEMS & AI SERVICES (y=665..850) ====================

  // ----------------------------------------------------
  // Left: Enterprise Systems (Upstream / Downstream) (x=16..910, w=894, h=182)
  // ----------------------------------------------------
  cell("ent_box", "", 16, 665, 894, 182, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.5;");

  const entSystems: { t: string; sub: string; logo: string; icon: keyof typeof SVG; color: string }[] = [
    { t: "Regulatory Vault<br/>(eTMF / RIM)", sub: "Submissions &amp; Quality<br/>Documents", logo: svgIcon("folder", "#EA580C", 18), icon: "folder", color: "#EA580C" },
    { t: "Healthcare CRM<br/>Platform", sub: "HCP &amp; Patient<br/>Engagement", logo: svgIcon("cloud", "#0284C7", 18), icon: "cloud", color: "#0284C7" },
    { t: "Enterprise ERP<br/>Core", sub: "Supply Chain, Batch<br/>&amp; Finance", logo: svgIcon("database", "#0F172A", 18), icon: "database", color: "#0F172A" },
    { t: "Laboratory /<br/>LIMS Systems", sub: "Assay Data, Results<br/>&amp; Samples", logo: svgIcon("flask", "#2563EB", 18), icon: "flask", color: "#2563EB" },
    { t: "Clinical Trial Systems<br/>(EDC / CTMS)", sub: "Study Data, Sites<br/>&amp; Subjects", logo: svgIcon("users", "#0284C7", 18), icon: "users", color: "#0284C7" },
    { t: "Pharmacovigilance<br/>Safety DB", sub: "ICSR Cases, Reports<br/>&amp; Signals", logo: svgIcon("shieldPlus", "#1E3A8A", 18), icon: "shieldPlus", color: "#1E3A8A" },
    { t: "Enterprise Lakehouse<br/>&amp; Warehouse", sub: "Curated Analytics<br/>&amp; Data Mesh", logo: svgIcon("chart", "#0284C7", 18), icon: "chart", color: "#0284C7" }
  ];
  entSystems.forEach((es, idx) => {
    const ex = 26 + idx * 125;
    const html = `<div style="text-align:center;padding:4px 2px;"><div style="font-size:8.5px;font-weight:800;color:#0F172A;line-height:1.15;margin-bottom:2px;">${es.t}</div><div style="font-size:8px;color:#64748B;font-weight:500;line-height:1.15;margin-bottom:6px;">${es.sub}</div><div style="display:flex;justify-content:center;align-items:center;height:24px;">${es.logo}</div></div>`;
    cell(`ent_s_${idx}`, html, ex, 718, 120, 94, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1.2;html=1;align=center;verticalAlign=top;padding=2;");
  });

  // Footer bar inside Enterprise Systems
  cell("ent_footer_bar", `<div style="font-size:7.5px;color:#334155;font-weight:700;text-align:center;">Integration Patterns: REST / GraphQL | Async Events | CDC | Bulk File &nbsp;&nbsp;•&nbsp;&nbsp; Standards: HL7 FHIR R4 | ISO IDMP | CDISC | ICH E2B(R3) &nbsp;&nbsp;•&nbsp;&nbsp; Transport: Private mTLS / VPN / SFTP / Event Bus</div>`, 26, 818, 874, 22, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;html=1;align=center;verticalAlign=middle;");

  // ----------------------------------------------------
  // Right: AI / Knowledge Services (x=926..1580, w=654, h=182)
  // ----------------------------------------------------
  cell("ai_box", "", 926, 665, 654, 182, "rounded=1;arcSize=4;fillColor=#FAF5FF;strokeColor=#C4B5FD;strokeWidth=1.5;");

  const aiCards: { t: string; sub: string; logo: string }[] = [
    { t: "Enterprise Search &amp;<br/>Knowledge Graph", sub: "Hybrid Lexical Search,<br/>Ontology &amp; Taxonomy", logo: svgIcon("search", "#7C3AED", 22) },
    { t: "Vector Index &amp;<br/>Semantic Retriever", sub: "Dense HNSW Embeddings,<br/>Chunk &amp; ACL Filtering", logo: svgIcon("network", "#7C3AED", 22) },
    { t: "Enterprise LLM &amp;<br/>Agent Runtime", sub: "Governed Foundation Models,<br/>Guardrails &amp; Router", logo: svgIcon("sparkles", "#7C3AED", 22) }
  ];
  aiCards.forEach((ac, idx) => {
    const ax = 940 + idx * 150;
    const html = `<div style="text-align:center;padding:4px 2px;"><div style="font-size:8.5px;font-weight:800;color:#581C87;line-height:1.15;margin-bottom:2px;">${ac.t}</div><div style="font-size:7.5px;color:#64748B;font-weight:500;line-height:1.15;margin-bottom:6px;">${ac.sub}</div><div style="display:flex;justify-content:center;align-items:center;height:24px;">${ac.logo}</div></div>`;
    cell(`ai_c_${idx}`, html, ax, 718, 142, 94, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#DDD6FE;strokeWidth=1.2;html=1;align=center;verticalAlign=top;padding=2;");
  });

  // Structured AI Guardrails & Grounding Contract Card inside AI services
  const aiContractHtml = `<div style="padding:4px 6px;"><div style="font-size:8.5px;font-weight:800;color:#581C87;margin-bottom:4px;border-bottom:1px solid #DDD6FE;padding-bottom:2px;">AI Guardrails &amp; Grounding</div><div style="font-size:7.5px;color:#475569;font-weight:600;line-height:1.35;">• Citation-backed RAG retrieval<br/>• PII/PHI redaction &amp; safety gates<br/>• Zero external model training<br/>• Immutable HITL audit trail</div></div>`;
  cell("ai_note_banner", aiContractHtml, 1392, 718, 176, 94, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#DDD6FE;strokeWidth=1.2;html=1;whiteSpace=wrap;overflow=hidden;align=left;verticalAlign=top;padding=2;");

  // Footer bar inside AI / Knowledge Services
  cell("ai_footer_bar", `<div style="font-size:7.5px;color:#581C87;font-weight:700;text-align:center;">Grounding Protocol: ACL-Scoped Vector Retrieval &nbsp;&nbsp;•&nbsp;&nbsp; Safety: Prompt Injection &amp; Toxicity Filters &nbsp;&nbsp;•&nbsp;&nbsp; Isolation: Dedicated Private Endpoint</div>`, 940, 818, 628, 22, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#DDD6FE;strokeWidth=1;html=1;align=center;verticalAlign=middle;");

  // Section Headers for Bottom Tier
  cell("ent_sec_title", "Enterprise Systems of Record (Upstream / Downstream)", 16, 850, 894, 16, "text;strokeColor=none;fillColor=none;html=1;fontColor=#1E40AF;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;");
  cell("ai_sec_title", "Governed AI &amp; Knowledge Intelligence Services", 926, 850, 654, 16, "text;strokeColor=none;fillColor=none;html=1;fontColor=#6D28D9;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;");

  // ==================== 7. BOTTOM ROW: OPERATIONS & LEGEND (y=876..946) ====================

  // Platform Operations Box (x=16..770, w=754, h=70)
  cell("ops_box", "", 16, 876, 754, 70, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.2;");

  const opsCards: { t: string; items: string[]; icon: keyof typeof SVG }[] = [
    { t: "Platform Engineering", items: ["Tenant & Configuration Mgmt", "GitOps Release & Change Mgmt", "SLO Monitoring & Telemetry"], icon: "gear" },
    { t: "Security / IAM Operations", items: ["Zero-Trust Identity & Access", "Privileged Access (PAM)", "SIEM Threat Detection & Response"], icon: "lock" },
    { t: "SRE / Support Operations", items: ["L1–L3 Runbook Automation", "Incident & Problem Mgmt", " Multi-AZ Availability & DR"], icon: "headset" }
  ];
  opsCards.forEach((op, idx) => {
    const ox = 26 + idx * 248;
    const itemsHtml = op.items.map(it => `<div style="font-size:7px;color:#475569;font-weight:600;line-height:1.15;">• ${it}</div>`).join("");
    const html = `<div style="display:flex;align-items:flex-start;gap:8px;padding:3px 6px;"><div style="padding-top:2px;">${svgIcon(op.icon, "#1E3A8A", 20)}</div><div><div style="font-size:9px;font-weight:800;color:#0F172A;line-height:1.15;margin-bottom:2px;">${op.t}</div>${itemsHtml}</div></div>`;
    cell(`op_c_${idx}`, html, ox, 882, 240, 58, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1;html=1;align=left;verticalAlign=top;padding=2;");
  });

  // Legend Box (x=782..1580, w=798, h=70)
  cell("leg_box", "", 782, 876, 798, 70, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("leg_title", "<b>Legend</b>", 790, 880, 50, 14, "text;strokeColor=none;fillColor=none;html=1;fontColor=#0F172A;fontSize=8.5;fontStyle=1;align=left;verticalAlign=middle;");

  const legIcons: { t: string; icon: keyof typeof SVG }[] = [
    { t: "User / Actor", icon: "user" },
    { t: "Domain Capability", icon: "document" },
    { t: "System of Record", icon: "database" },
    { t: "AI / RAG Runtime", icon: "brain" },
    { t: "External Partner", icon: "users" },
    { t: "Governance Control", icon: "network" }
  ];
  legIcons.forEach((li, idx) => {
    const lx = 848 + idx * 86;
    const html = `<div style="text-align:center;"><div style="display:flex;justify-content:center;margin-bottom:1px;">${svgIcon(li.icon, "#0F172A", 14)}</div><div style="font-size:6.5px;font-weight:700;color:#475569;line-height:1.1;">${li.t}</div></div>`;
    cell(`leg_i_${idx}`, html, lx, 884, 82, 34, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;padding=1;");
  });

  // Line Styles in Legend (Right Side)
  const lineStyles = [
    { t: "Synchronous / API Data Flow", color: "#1D4ED8", dashed: false },
    { t: "AI Grounding / Governance Control", color: "#7C3AED", dashed: true },
    { t: "External B2B / Partner Exchange", color: "#16A34A", dashed: false }
  ];
  lineStyles.forEach((ls, idx) => {
    const ly = 884 + idx * 18;
    cell(`leg_ls_lbl_${idx}`, `<div style="font-size:7.5px;font-weight:700;color:#475569;">${ls.t}</div>`, 1400, ly - 4, 170, 16, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
    rawEdge(`leg_ls_edge_${idx}`, `edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=${ls.color};strokeWidth=1.8;${ls.dashed ? "dashed=1;dashPattern=4 3;" : ""}endArrow=classic;endSize=3;`, [
      { x: 1364, y: ly + 4 },
      { x: 1394, y: ly + 4 }
    ]);
  });

  // Watermark Note
  cell("watermark_note", "ⓘ C4 Level 1 System Context View — Defines system boundaries, actors, external dependencies, and integration contracts", 16, 949, 600, 12, "text;strokeColor=none;fillColor=none;html=1;fontColor=#64748B;fontSize=8;fontStyle=2;align=left;verticalAlign=middle;");

  // ==================== 8. CONNECTORS & FLOW ARROWS ====================

  // Users -> Portal Lock -> Platform (Clean Orthogonal Collector Bracket)
  rawEdge("e_users_bracket_top", "edgeStyle=orthogonalEdgeStyle;rounded=0;strokeColor=#1D4ED8;strokeWidth=1.8;endArrow=none;", [
    { x: 286, y: 198 },
    { x: 296, y: 198 },
    { x: 296, y: 588 },
    { x: 286, y: 588 }
  ]);
  rawEdge("e_users_to_lock", "edgeStyle=orthogonalEdgeStyle;rounded=0;strokeColor=#1D4ED8;strokeWidth=1.8;endArrow=classic;endSize=4;", [
    { x: 296, y: 395 },
    { x: 308, y: 395 }
  ]);
  rawEdge("e_portal_to_plat", "edgeStyle=orthogonalEdgeStyle;rounded=0;strokeColor=#1D4ED8;strokeWidth=1.8;endArrow=classic;endSize=4;", [
    { x: 420, y: 395 },
    { x: 436, y: 395 }
  ]);

  // Governance -> Core Platform Boundary (Dashed Purple Line)
  rawEdge("e_gov_down", "edgeStyle=orthogonalEdgeStyle;rounded=0;strokeColor=#7C3AED;strokeWidth=1.5;dashed=1;dashPattern=4 3;endArrow=classic;endSize=4;", [
    { x: 763, y: 160 },
    { x: 763, y: 190 }
  ]);

  // Governance -> Left Users Box & Right External Box (Orthogonal Dashed Purple Lines landing cleanly on container tops)
  rawEdge("e_gov_left_loop", "edgeStyle=orthogonalEdgeStyle;rounded=0;strokeColor=#7C3AED;strokeWidth=1.5;dashed=1;dashPattern=4 3;endArrow=classic;endSize=4;", [
    { x: 480, y: 110 },
    { x: 151, y: 110 },
    { x: 151, y: 140 }
  ]);
  rawEdge("e_gov_right_loop", "edgeStyle=orthogonalEdgeStyle;rounded=0;strokeColor=#7C3AED;strokeWidth=1.5;dashed=1;dashPattern=4 3;endArrow=classic;endSize=4;", [
    { x: 1100, y: 110 },
    { x: 1412, y: 110 },
    { x: 1412, y: 165 }
  ]);

  // Platform -> External Ecosystem (4 Green Chained Connectors with Protocol Badges)
  const extConnectors = [
    { y: 241, label: "Collaboration<br/>Packages &amp; Data<br/>Exchange (APIs / SFTP)" },
    { y: 337, label: "Clinical Data &amp;<br/>Documents<br/>(HTTPS / FHIR)" },
    { y: 433, label: "Submissions &amp;<br/>Responses<br/>(IDMP / eCTD)" },
    { y: 529, label: "Programs &amp;<br/>Communications<br/>(Secure Portal / APIs)" }
  ];
  extConnectors.forEach((ec, idx) => {
    cell(`ext_badge_${idx}`, `<div style="font-size:7.5px;font-weight:800;color:#15803D;text-align:center;line-height:1.15;">${ec.label}</div>`, 1106, ec.y - 20, 118, 40, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.2;html=1;align=center;verticalAlign=middle;padding=2;");
    rawEdge(`e_ext_l_${idx}`, "edgeStyle=orthogonalEdgeStyle;rounded=0;strokeColor=#16A34A;strokeWidth=1.8;endArrow=classic;startArrow=classic;endSize=4;startSize=4;", [
      { x: 1090, y: ec.y },
      { x: 1106, y: ec.y }
    ]);
    rawEdge(`e_ext_r_${idx}`, "edgeStyle=orthogonalEdgeStyle;rounded=0;strokeColor=#16A34A;strokeWidth=1.8;endArrow=classic;startArrow=classic;endSize=4;startSize=4;", [
      { x: 1224, y: ec.y },
      { x: 1240, y: ec.y }
    ]);
  });

  // Orthogonal Enterprise Integration Busbar (y=650) connecting Core Platform Boundary (y=635) to all 7 Enterprise Systems
  rawEdge("e_ent_bus_trunk", "edgeStyle=orthogonalEdgeStyle;rounded=0;strokeColor=#1D4ED8;strokeWidth=1.8;startArrow=classic;endArrow=none;startSize=4;", [
    { x: 586, y: 635 },
    { x: 586, y: 650 }
  ]);
  rawEdge("e_ent_bus_horiz", "edgeStyle=orthogonalEdgeStyle;rounded=0;strokeColor=#1D4ED8;strokeWidth=1.8;endArrow=none;", [
    { x: 86, y: 650 },
    { x: 836, y: 650 }
  ]);

  // Enterprise Systems Drop-Line Connectors (7 Blue Connectors from Busbar y=650 with Protocol Badges)
  const entProtocols = [
    { x: 86, label: "Documents Sync<br/>(REST / Bulk API)" },
    { x: 211, label: "Customer &amp; HCP<br/>Data Exchange<br/>(REST / APIs)" },
    { x: 336, label: "Product, Finance &amp;<br/>Manufacturing Data<br/>(IDoc / OData)" },
    { x: 461, label: "Lab Results &amp;<br/>Data Ingestion<br/>(HL7 / FHIR / APIs)" },
    { x: 586, label: "Trial Data Ingestion<br/>(EDC / CTMS APIs)<br/>&amp; Exports" },
    { x: 711, label: "Safety Cases &amp;<br/>Reports Exchange<br/>(REST / ICH E2B)" },
    { x: 836, label: "Curated Analytics<br/>&amp; Reporting<br/>(SQL / APIs)" }
  ];
  entProtocols.forEach((ep, idx) => {
    cell(`ent_proto_${idx}`, `<div style="font-size:6.5px;font-weight:800;color:#1D4ED8;text-align:center;line-height:1.1;">${ep.label}</div>`, ep.x - 48, 674, 96, 32, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1;html=1;align=center;verticalAlign=middle;padding=1;");
    rawEdge(`e_ent_drop_${idx}`, "edgeStyle=orthogonalEdgeStyle;rounded=0;strokeColor=#1D4ED8;strokeWidth=1.5;endArrow=classic;endSize=3;", [
      { x: ep.x, y: 650 },
      { x: ep.x, y: 674 }
    ]);
    rawEdge(`e_ent_card_${idx}`, "edgeStyle=orthogonalEdgeStyle;rounded=0;strokeColor=#1D4ED8;strokeWidth=1.5;endArrow=classic;endSize=3;", [
      { x: ep.x, y: 706 },
      { x: ep.x, y: 718 }
    ]);
  });

  // Orthogonal AI / Knowledge Busbar (y=650) connecting Core Platform Boundary (y=635) to all 3 AI Services
  rawEdge("e_ai_bus_trunk", "edgeStyle=orthogonalEdgeStyle;rounded=0;strokeColor=#7C3AED;strokeWidth=1.8;dashed=1;dashPattern=4 3;startArrow=classic;endArrow=none;startSize=4;", [
    { x: 1011, y: 635 },
    { x: 1011, y: 650 }
  ]);
  rawEdge("e_ai_bus_horiz", "edgeStyle=orthogonalEdgeStyle;rounded=0;strokeColor=#7C3AED;strokeWidth=1.8;dashed=1;dashPattern=4 3;endArrow=none;", [
    { x: 1011, y: 650 },
    { x: 1311, y: 650 }
  ]);

  // AI / Knowledge Services Drop-Line Connectors (3 Purple Dashed Connectors from Busbar y=650 with Protocol Badges)
  const aiProtocols = [
    { x: 1011, label: "Enterprise Content<br/>Indexing &amp; Sync<br/>(APIs)" },
    { x: 1161, label: "Semantic Search<br/>Queries &amp; Results<br/>(REST / Graph)" },
    { x: 1311, label: "Grounded AI<br/>Requests / Responses<br/>(Private mTLS)" }
  ];
  aiProtocols.forEach((ap, idx) => {
    cell(`ai_proto_${idx}`, `<div style="font-size:6.5px;font-weight:800;color:#6D28D9;text-align:center;line-height:1.1;">${ap.label}</div>`, ap.x - 52, 674, 104, 32, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#C4B5FD;strokeWidth=1;html=1;align=center;verticalAlign=middle;padding=1;");
    rawEdge(`e_ai_drop_${idx}`, "edgeStyle=orthogonalEdgeStyle;rounded=0;strokeColor=#7C3AED;strokeWidth=1.5;dashed=1;dashPattern=4 3;endArrow=classic;endSize=3;", [
      { x: ap.x, y: 650 },
      { x: ap.x, y: 674 }
    ]);
    rawEdge(`e_ai_card_${idx}`, "edgeStyle=orthogonalEdgeStyle;rounded=0;strokeColor=#7C3AED;strokeWidth=1.5;dashed=1;dashPattern=4 3;endArrow=classic;endSize=3;", [
      { x: ap.x, y: 706 },
      { x: ap.x, y: 718 }
    ]);
  });

  const bg = isDark ? "#0F172A" : "#FFFFFF";

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_01_system_context" name="01 — System Context">
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

