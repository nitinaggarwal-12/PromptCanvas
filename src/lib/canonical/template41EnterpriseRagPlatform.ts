/**
 * Master 1:1 High-Craft Exact Ground-Truth Replica for Template 41: Enterprise RAG & Knowledge Intelligence Platform
 * Matches 100% of images/41.png:
 * - Exact 1672x941 master canvas resolution with high-contrast, clean modern enterprise styling.
 * - Top Header Banner: "41. Enterprise RAG & Knowledge Intelligence Platform" + Subtitle
 * - Tier 1: USER & CHANNELS LAYER (6 Personas + 6 Channels)
 * - Tier 2: ACCESS, IDENTITY & EXPERIENCE LAYER (9 Access & Identity blocks)
 * - Tier 3: KNOWLEDGE EXPERIENCE & ORCHESTRATION LAYER (5 Orchestration Steps + Knowledge Governance enclave)
 * - Tier 4: RAG / REASONING LAYER (Query Rewriter, Model Gateway, Models Pro/Flash/Embed, Re-ranker + Guardrails enclave)
 * - Tier 5: MEMORY, INDEX & KNOWLEDGE LAYER (7 Stores + 10-Step RAG Pipeline with sequential pill badges ❶..❿)
 * - Tier 6: INGESTION, PARSING & CONNECTORS LAYER (6 Ingestion Components + Protocols enclave)
 * - Tier 7: ENTERPRISE KNOWLEDGE SOURCES LAYER (6 Source Zones: Collaboration, Apps, DBs, Files, External, Platforms)
 * - Tier 8: SECURITY / PRIVACY / SOVEREIGNTY FOUNDATION (10 Security & Governance controls)
 * - Right Sidebar:
 *   - Pillar A: GOVERNANCE / COMPLIANCE (5 controls + Compliance standards box)
 *   - Pillar B: OBSERVABILITY / EVALUATION / FINOPS (6 monitoring & telemetry metrics)
 *   - Pillar C: PLATFORM OPERATIONS / DELIVERY (6 GitOps, prompt & lifecycle items)
 * - Bottom Section:
 *   - Legend (4 Arrow Types)
 *   - END-TO-END FLOW (6 Sequential Process Steps ❶..❻)
 *   - Google Cloud Brand Block ("Build. On Google Cloud.")
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
  chart: `<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>`,
  code: `<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>`,
  gear: `<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>`,
  shield: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`,
  lock: `<rect width="16" height="11" x="4" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>`,
  key: `<circle cx="8" cy="8" r="4"/><path d="m11 11 9 9M18 14l2 2M15 17l2 2"/>`,
  globe: `<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>`,
  phone: `<rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>`,
  message: `<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>`,
  headset: `<path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>`,
  search: `<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>`,
  sparkles: `<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z"/>`,
  eye: `<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>`,
  brain: `<path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04zM14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04z"/>`,
  database: `<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>`,
  cloud: `<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>`,
  box: `<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>`,
  repeat: `<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>`,
  clipboard: `<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="m9 14 2 2 4-4"/>`,
  plug: `<path d="M12 22v-5M9 8V2M15 8V2M18 8v5a6 6 0 0 1-12 0V8z"/>`,
  bolt: `<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>`,
  link: `<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>`,
  server: `<rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>`,
  target: `<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>`,
  alert: `<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>`,
  checkCircle: `<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>`,
  crown: `<path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14v2H5v-2z"/>`,
  clock: `<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>`,
  tag: `<path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/><circle cx="7" cy="7" r=".5" fill="currentColor"/>`,
  pulse: `<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>`,
  document: `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>`,
  folder: `<path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/>`,
  layers: `<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>`,
  microscope: `<path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 1 0 0-14h-1"/><path d="M9 14h2"/><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"/><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/>`,
  thumbsUp: `<path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h3"/>`,
  dollar: `<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>`,
  scale: `<path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>`,
  network: `<rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><line x1="12" y1="12" x2="12" y2="8"/>`
};

const svgIcon = (key: keyof typeof SVG, color = "#2563EB", size = 18) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${SVG[key] || SVG.box}</svg>`;

export function generateTemplate41EnterpriseRagPlatformXml(
  domainFlavor = "enterprise",
  theme: "light" | "dark" = "light"
): string {
  const isDark = theme === "dark";
  const c: string[] = [];

  const cell = (id: string, v: string, x: number, y: number, w: number, h: number, style: string) =>
    c.push(
      `<mxCell id="${id}" value="${E(v)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`
    );

  const rawEdge = (
    id: string,
    style: string,
    pts: { x: number; y: number }[]
  ) => {
    const pStr = pts.map(p => `<mxPoint x="${p.x}" y="${p.y}"/>`).join("\n            ");
    c.push(
      `<mxCell id="${id}" edge="1" parent="1" style="${style}">
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

  // ==================== 1. TOP HEADER BANNER (y=12..56) ====================
  const titleHtml = `<div style="font-size:26px;font-weight:900;color:#0F172A;letter-spacing:-0.2px;line-height:1.1;">41. Enterprise RAG & Knowledge Intelligence Platform</div>` +
    `<div style="font-size:13px;font-weight:700;color:#1E3A8A;font-style:italic;margin-top:2px;">Trusted enterprise knowledge retrieval, grounding, citations, governance, and observability</div>`;
  cell("hdr_title", titleHtml, 16, 10, 1260, 46, "whiteSpace=wrap;overflow=hidden;text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  // ==================== 2. MAIN STACK (LEFT COLUMN: x=16..1280, w=1264) ====================

  // ----------------------------------------------------
  // TIER 1: USER & CHANNELS LAYER (y=62..144, h=82)
  // ----------------------------------------------------
  cell("t1_num", "1", 16, 62, 24, 24, "rounded=1;arcSize=14;fillColor=#1D4ED8;strokeColor=#1D4ED8;fontColor=#FFFFFF;fontSize=13;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t1_lbl", `<div style="font-size:9px;font-weight:900;color:#1E40AF;line-height:1.15;">USER &<br/>CHANNELS LAYER</div>`, 44, 62, 118, 26, "whiteSpace=wrap;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  // Tier 1 Container Box
  cell("t1_box", "", 166, 62, 1114, 82, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.5;");

  // 6 User Personas (Left)
  const personas: { t: string; icon: keyof typeof SVG; color: string }[] = [
    { t: "Business<br/>Users", icon: "users", color: "#1D4ED8" },
    { t: "Analysts", icon: "chart", color: "#0D9488" },
    { t: "Researchers", icon: "microscope", color: "#7C3AED" },
    { t: "Customer<br/>Support", icon: "headset", color: "#EA580C" },
    { t: "Developers", icon: "code", color: "#0284C7" },
    { t: "External<br/>Partners", icon: "globe", color: "#16A34A" }
  ];
  personas.forEach((p, idx) => {
    const px = 176 + idx * 76;
    cell(
      `t1_p_${idx}`,
      `<div style="text-align:center;"><div style="display:flex;justify-content:center;margin-bottom:2px;">${svgIcon(p.icon, p.color, 20)}</div><div style="font-size:8.5px;font-weight:800;color:#0F172A;line-height:1.15;margin-top:2px;">${p.t}</div></div>`,
      px,
      68,
      72,
      70,
      "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;padding=1;"
    );
  });

  // Channels Box (Right)
  cell("t1_chan_box", "", 646, 68, 624, 70, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("t1_chan_lbl", "Channels", 652, 70, 120, 14, "html=1;fontColor:#1E40AF;fontSize=8.5;fontStyle=1;align=left;verticalAlign=middle;");

  const channels: { t: string; icon: keyof typeof SVG; color: string }[] = [
    { t: "Web App", icon: "globe", color: "#2563EB" },
    { t: "Mobile App", icon: "phone", color: "#0284C7" },
    { t: "Slack / Teams", icon: "message", color: "#7C3AED" },
    { t: "API / SDK", icon: "code", color: "#0D9488" },
    { t: "Search Portal", icon: "search", color: "#EA580C" },
    { t: "Copilot UI", icon: "sparkles", color: "#16A34A" }
  ];
  channels.forEach((ch, idx) => {
    const cx = 660 + idx * 100;
    cell(
      `t1_ch_${idx}`,
      `<div style="text-align:center;"><div style="display:flex;justify-content:center;margin-bottom:2px;">${svgIcon(ch.icon, ch.color, 18)}</div><div style="font-size:8.5px;font-weight:800;color:#0F172A;margin-top:2px;">${ch.t}</div></div>`,
      cx,
      82,
      92,
      52,
      "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;padding=1;"
    );
  });

  // ----------------------------------------------------
  // TIER 2: ACCESS, IDENTITY & EXPERIENCE LAYER (y=150..222, h=72)
  // ----------------------------------------------------
  cell("t2_num", "2", 16, 150, 24, 24, "rounded=1;arcSize=14;fillColor=#0D9488;strokeColor=#0D9488;fontColor=#FFFFFF;fontSize=13;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t2_lbl", `<div style="font-size:9px;font-weight:900;color:#0F766E;line-height:1.15;">ACCESS, IDENTITY &<br/>EXPERIENCE LAYER</div>`, 44, 150, 118, 26, "whiteSpace=wrap;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  // Tier 2 Container Box
  cell("t2_box", "", 166, 150, 1114, 72, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#5EEAD4;strokeWidth=1.5;");

  const accessBlocks: { t: string; icon: keyof typeof SVG; color: string }[] = [
    { t: "SSO<br/><span style='color:#64748B;font-size:7px;font-weight:600;'>(SAML/OIDC)</span>", icon: "user", color: "#0D9488" },
    { t: "IAM", icon: "shield", color: "#2563EB" },
    { t: "MFA", icon: "lock", color: "#0284C7" },
    { t: "RBAC / ABAC", icon: "users", color: "#7C3AED" },
    { t: "API Gateway", icon: "bolt", color: "#EA580C" },
    { t: "Load Balancer", icon: "layers", color: "#16A34A" },
    { t: "Cloud Armor<br/><span style='color:#64748B;font-size:7px;font-weight:600;'>(WAF)</span>", icon: "shield", color: "#0D9488" },
    { t: "OAuth / OIDC", icon: "key", color: "#D97706" },
    { t: "Workspace /<br/>Tenant Isolation", icon: "network", color: "#1E3A8A" }
  ];
  accessBlocks.forEach((ab, idx) => {
    const ax = 176 + idx * 122;
    cell(
      `t2_b_${idx}`,
      `<div style="display:flex;align-items:center;gap:6px;padding:0 6px;">${svgIcon(ab.icon, ab.color, 18)}<span style="font-size:8.5px;font-weight:800;color:#0F172A;line-height:1.15;">${ab.t}</span></div>`,
      ax,
      158,
      116,
      56,
      "rounded=1;arcSize=4;fillColor=#F0FDFA;strokeColor=#CCFBF1;strokeWidth=1.2;html=1;align=left;verticalAlign=middle;padding=3;"
    );
  });

  // ----------------------------------------------------
  // TIER 3: KNOWLEDGE EXPERIENCE & ORCHESTRATION LAYER (y=228..306, h=78)
  // ----------------------------------------------------
  cell("t3_num", "3", 16, 228, 24, 24, "rounded=1;arcSize=14;fillColor=#16A34A;strokeColor=#16A34A;fontColor=#FFFFFF;fontSize=13;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t3_lbl", `<div style="font-size:9px;font-weight:900;color:#15803D;line-height:1.15;">KNOWLEDGE EXPERIENCE<br/>& ORCHESTRATION LAYER</div>`, 44, 228, 118, 26, "whiteSpace=wrap;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  // Tier 3 Container Box
  cell("t3_box", "", 166, 228, 1114, 78, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.5;");

  // 5 Process Steps
  const t3Steps: { t: string; icon: keyof typeof SVG; color: string }[] = [
    { t: "Query<br/>Understanding", icon: "brain", color: "#16A34A" },
    { t: "Search & Retrieval<br/>Orchestrator", icon: "search", color: "#2563EB" },
    { t: "Prompt Assembly /<br/>Context Builder", icon: "document", color: "#7C3AED" },
    { t: "Citation & Answer<br/>Composer", icon: "clipboard", color: "#0D9488" },
    { t: "Follow-up /<br/>Conversation Manager", icon: "message", color: "#EA580C" }
  ];
  t3Steps.forEach((st, idx) => {
    const sx = 176 + idx * 144;
    cell(
      `t3_s_${idx}`,
      `<div style="display:flex;align-items:center;gap:6px;padding:0 6px;">${svgIcon(st.icon, st.color, 18)}<span style="font-size:8.5px;font-weight:800;color:#0F172A;line-height:1.15;">${st.t}</span></div>`,
      sx,
      238,
      136,
      58,
      "rounded=1;arcSize=4;fillColor=#F0FDF4;strokeColor=#BBF7D0;strokeWidth=1.2;html=1;align=left;verticalAlign=middle;padding=4;"
    );

    // Connecting arrows between steps
    if (idx > 0) {
      rawEdge(`e_t3_s_${idx}`, "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#16A34A;strokeWidth=1.5;endArrow=classic;endSize=4;", [
        { x: sx - 8, y: 267 },
        { x: sx, y: 267 }
      ]);
    }
  });

  // Right Enclave: Knowledge Governance Services (Dashed Box)
  cell("t3_gov_box", "", 898, 234, 372, 66, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#16A34A;strokeWidth=1.5;dashed=1;dashPattern=4 3;");
  cell("t3_gov_lbl", "Knowledge Governance Services", 898, 236, 372, 14, "html=1;fontColor:#15803D;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");

  const govServices: { t: string; icon: keyof typeof SVG; color: string }[] = [
    { t: "Policy Rules", icon: "scale", color: "#16A34A" },
    { t: "Grounding<br/>Thresholds", icon: "target", color: "#2563EB" },
    { t: "Answer<br/>Templates", icon: "document", color: "#7C3AED" },
    { t: "Relevance<br/>Controls", icon: "gear", color: "#0D9488" }
  ];
  govServices.forEach((gs, idx) => {
    const gx = 906 + idx * 90;
    cell(
      `t3_gs_${idx}`,
      `<div style="text-align:center;"><div style="display:flex;justify-content:center;margin-bottom:2px;">${svgIcon(gs.icon, gs.color, 16)}</div><div style="font-size:7.5px;font-weight:800;color:#0F172A;line-height:1.1;margin-top:2px;">${gs.t}</div></div>`,
      gx,
      252,
      84,
      44,
      "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;padding=1;"
    );
  });

  // ----------------------------------------------------
  // TIER 4: RAG / REASONING LAYER (y=312..392, h=80)
  // ----------------------------------------------------
  cell("t4_num", "4", 16, 312, 24, 24, "rounded=1;arcSize=14;fillColor=#7C3AED;strokeColor=#7C3AED;fontColor=#FFFFFF;fontSize=13;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t4_lbl", `<div style="font-size:9px;font-weight:900;color:#6D28D9;line-height:1.15;">RAG / REASONING<br/>LAYER</div>`, 44, 312, 118, 26, "whiteSpace=wrap;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  // Tier 4 Container Box
  cell("t4_box", "", 166, 312, 1114, 80, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#C4B5FD;strokeWidth=1.5;");

  // Reasoning Chain
  cell("t4_rewriter", `<div style="display:flex;align-items:center;gap:6px;padding:0 6px;">${svgIcon("repeat", "#7C3AED", 18)}<span style="font-size:8.5px;font-weight:800;color:#0F172A;line-height:1.15;">Query Rewriting /<br/>Decomposition</span></div>`, 176, 322, 130, 60, "rounded=1;arcSize=4;fillColor=#FAF5FF;strokeColor=#E9D5FF;strokeWidth=1.2;html=1;align=left;verticalAlign=middle;padding=3;" );
  cell("t4_gateway", `<div style="display:flex;align-items:center;gap:6px;padding:0 6px;">${svgIcon("network", "#7C3AED", 18)}<span style="font-size:8.5px;font-weight:800;color:#0F172A;line-height:1.15;">Model Gateway /<br/>LLM Router</span></div>`, 320, 322, 130, 60, "rounded=1;arcSize=4;fillColor=#FAF5FF;strokeColor=#E9D5FF;strokeWidth=1.2;html=1;align=left;verticalAlign=middle;padding=3;" );

  // Foundation Models Box
  cell("t4_models_box", "", 464, 322, 210, 60, "rounded=1;arcSize=4;fillColor=#FAF5FF;strokeColor=#E9D5FF;strokeWidth=1.2;");
  cell("t4_m_pro", `<div style="text-align:center;"><div style="display:flex;justify-content:center;margin-bottom:2px;">${svgIcon("sparkles", "#7C3AED", 16)}</div><div style="font-size:8px;font-weight:800;color:#0F172A;line-height:1.1;margin-top:2px;">Gemini 1.5<br/>Pro</div></div>`, 470, 326, 62, 52, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  cell("t4_m_flash", `<div style="text-align:center;"><div style="display:flex;justify-content:center;margin-bottom:2px;">${svgIcon("bolt", "#7C3AED", 16)}</div><div style="font-size:8px;font-weight:800;color:#0F172A;line-height:1.1;margin-top:2px;">Gemini 1.5<br/>Flash</div></div>`, 538, 326, 62, 52, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  cell("t4_m_embed", `<div style="text-align:center;"><div style="display:flex;justify-content:center;margin-bottom:2px;">${svgIcon("brain", "#7C3AED", 16)}</div><div style="font-size:8px;font-weight:800;color:#0F172A;line-height:1.1;margin-top:2px;">Embedding<br/>Models</div></div>`, 606, 326, 62, 52, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // Re-ranker
  cell("t4_reranker", `<div style="text-align:center;"><div style="display:flex;justify-content:center;margin-bottom:2px;">${svgIcon("chart", "#7C3AED", 18)}</div><div style="font-size:8.5px;font-weight:800;color:#0F172A;line-height:1.15;margin-top:2px;">Re-ranker /<br/>Relevance Layer</div></div>`, 688, 322, 100, 60, "rounded=1;arcSize=4;fillColor=#FAF5FF;strokeColor=#E9D5FF;strokeWidth=1.2;html=1;align=center;verticalAlign=middle;padding=3;" );

  // Arrows between reasoning blocks
  rawEdge("e_t4_1", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#7C3AED;strokeWidth=1.5;endArrow=classic;endSize=4;", [{ x: 306, y: 352 }, { x: 320, y: 352 }]);
  rawEdge("e_t4_2", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#7C3AED;strokeWidth=1.5;endArrow=classic;endSize=4;", [{ x: 450, y: 352 }, { x: 464, y: 352 }]);
  rawEdge("e_t4_3", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#7C3AED;strokeWidth=1.5;endArrow=classic;endSize=4;", [{ x: 674, y: 352 }, { x: 688, y: 352 }]);

  // Right Enclave: Guardrails & Safety (Dashed Box)
  cell("t4_safe_box", "", 802, 320, 468, 64, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#7C3AED;strokeWidth=1.5;dashed=1;dashPattern=4 3;");
  cell("t4_safe_lbl", "Guardrails & Safety", 802, 322, 468, 14, "html=1;fontColor:#6D28D9;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");

  const safetyItems: { t: string; icon: keyof typeof SVG; color: string }[] = [
    { t: "Safety Filters", icon: "shield", color: "#7C3AED" },
    { t: "Prompt Injection<br/>Defense", icon: "alert", color: "#DC2626" },
    { t: "PII / DLP<br/>Checks", icon: "lock", color: "#2563EB" },
    { t: "Hallucination<br/>Controls", icon: "eye", color: "#0D9488" }
  ];
  safetyItems.forEach((si, idx) => {
    const sx = 812 + idx * 114;
    cell(
      `t4_si_${idx}`,
      `<div style="text-align:center;"><div style="display:flex;justify-content:center;margin-bottom:2px;">${svgIcon(si.icon, si.color, 16)}</div><div style="font-size:7.5px;font-weight:800;color:#0F172A;line-height:1.1;margin-top:2px;">${si.t}</div></div>`,
      sx,
      338,
      106,
      42,
      "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;padding=1;"
    );
  });

  // ----------------------------------------------------
  // TIER 5: MEMORY, INDEX & KNOWLEDGE LAYER (y=398..496, h=98)
  // ----------------------------------------------------
  cell("t5_num", "5", 16, 398, 24, 24, "rounded=1;arcSize=14;fillColor=#D97706;strokeColor=#D97706;fontColor=#FFFFFF;fontSize=13;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t5_lbl", `<div style="font-size:9px;font-weight:900;color:#B45309;line-height:1.15;">MEMORY, INDEX &<br/>KNOWLEDGE LAYER</div>`, 44, 398, 118, 26, "whiteSpace=wrap;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  // Tier 5 Container Box
  cell("t5_box", "", 166, 398, 1114, 98, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#FCD34D;strokeWidth=1.5;");

  // Top Row (7 Stores)
  const t5Stores: { t: string; icon: keyof typeof SVG; color: string; w: number }[] = [
    { t: "Session<br/>Memory", icon: "brain", color: "#D97706", w: 90 },
    { t: "User Profile /<br/>Personalization Store", icon: "user", color: "#D97706", w: 125 },
    { t: "Vector Index /<br/>Semantic Search<br/><span style='font-size:6.5px;color:#64748B;font-weight:600;'>(Vertex AI Matching Engine)</span>", icon: "network", color: "#D97706", w: 155 },
    { t: "Enterprise Search /<br/>Keyword Search<br/><span style='font-size:6.5px;color:#64748B;font-weight:600;'>(Cloud Search / Apigee Search)</span>", icon: "search", color: "#D97706", w: 160 },
    { t: "Knowledge Graph /<br/>Taxonomy<br/><span style='font-size:6.5px;color:#64748B;font-weight:600;'>(Neo4j / AlloyDB Graph)</span>", icon: "network", color: "#D97706", w: 155 },
    { t: "Metadata /<br/>Catalog Store<br/><span style='font-size:6.5px;color:#64748B;font-weight:600;'>(Data Catalog)</span>", icon: "tag", color: "#D97706", w: 125 },
    { t: "Cache /<br/>Prompt-Context Store<br/><span style='font-size:6.5px;color:#64748B;font-weight:600;'>(Cloud Memorystore)</span>", icon: "database", color: "#D97706", w: 150 }
  ];

  let curStoreX = 176;
  t5Stores.forEach((st, idx) => {
    cell(
      `t5_st_${idx}`,
      `<div style="display:flex;align-items:center;gap:6px;padding:0 5px;">${svgIcon(st.icon, st.color, 18)}<span style="font-size:8px;font-weight:800;color:#0F172A;line-height:1.15;">${st.t}</span></div>`,
      curStoreX,
      406,
      st.w,
      48,
      "rounded=1;arcSize=4;fillColor=#FFFBEB;strokeColor=#FDE68A;strokeWidth=1.2;html=1;align=left;verticalAlign=middle;padding=3;"
    );
    curStoreX += st.w + 12;
  });

  // Bottom Sub-Bar: RAG PIPELINE (10-Step Sequential Flow)
  cell("t5_rag_lbl", "RAG PIPELINE", 176, 464, 75, 20, "html=1;fontColor=#D97706;fontSize=8;fontStyle=1;align=left;verticalAlign=middle;");

  const ragSteps = [
    { n: "1", t: "Ingest" },
    { n: "2", t: "Parse" },
    { n: "3", t: "Chunk" },
    { n: "4", t: "Embed" },
    { n: "5", t: "Index" },
    { n: "6", t: "Retrieve" },
    { n: "7", t: "Re-rank" },
    { n: "8", t: "Ground" },
    { n: "9", t: "Cite" },
    { n: "10", t: "Respond" }
  ];
  ragSteps.forEach((rs, idx) => {
    const rx = 256 + idx * 98;
    cell(
      `t5_rs_${idx}`,
      `<div style="display:flex;align-items:center;gap:5px;"><span style="display:inline-block;width:18px;height:18px;background:#D97706;color:#FFFFFF;border-radius:50%;font-size:8.5px;font-weight:900;text-align:center;line-height:18px;">${rs.n}</span><span style="font-size:8.5px;font-weight:800;color:#0F172A;">${rs.t}</span></div>`,
      rx,
      464,
      76,
      20,
      "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;"
    );

    // Arrow to next step
    if (idx < ragSteps.length - 1) {
      rawEdge(`e_t5_r_${idx}`, "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#D97706;strokeWidth=1.2;endArrow=classic;endSize=3;", [
        { x: rx + 74, y: 474 },
        { x: rx + 92, y: 474 }
      ]);
    }
  });

  // ----------------------------------------------------
  // TIER 6: INGESTION, PARSING & CONNECTORS LAYER (y=502..578, h=76)
  // ----------------------------------------------------
  cell("t6_num", "6", 16, 502, 24, 24, "rounded=1;arcSize=14;fillColor=#EA580C;strokeColor=#EA580C;fontColor=#FFFFFF;fontSize=13;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t6_lbl", `<div style="font-size:9px;font-weight:900;color:#C2410C;line-height:1.15;">INGESTION, PARSING &<br/>CONNECTORS LAYER</div>`, 44, 502, 118, 26, "whiteSpace=wrap;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  // Tier 6 Container Box
  cell("t6_box", "", 166, 502, 1114, 76, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#FDBA74;strokeWidth=1.5;");

  // Left Ingestion Pipeline Components (6 components)
  const t6Components: { t: string; icon: keyof typeof SVG; color: string; w: number }[] = [
    { t: "Connectors /<br/>Adapters", icon: "plug", color: "#EA580C", w: 100 },
    { t: "Document Parsers /<br/>OCR", icon: "document", color: "#EA580C", w: 120 },
    { t: "ETL / Workflow Engine<br/><span style='font-size:6.5px;color:#64748B;font-weight:600;'>(Cloud Workflows)</span>", icon: "gear", color: "#EA580C", w: 130 },
    { t: "Content Classification /<br/>Labeling <span style='font-size:6.5px;color:#64748B;font-weight:600;'>(Vertex AI)</span>", icon: "tag", color: "#EA580C", w: 140 },
    { t: "Deduplication /<br/>Quality Checks", icon: "checkCircle", color: "#EA580C", w: 120 },
    { t: "CDC / Sync<br/>Services", icon: "repeat", color: "#EA580C", w: 100 }
  ];
  let curT6X = 176;
  t6Components.forEach((comp, idx) => {
    cell(
      `t6_c_${idx}`,
      `<div style="display:flex;align-items:center;gap:6px;padding:0 5px;">${svgIcon(comp.icon, comp.color, 18)}<span style="font-size:8px;font-weight:800;color:#0F172A;line-height:1.15;">${comp.t}</span></div>`,
      curT6X,
      510,
      comp.w,
      58,
      "rounded=1;arcSize=4;fillColor=#FFF7ED;strokeColor=#FFEDD5;strokeWidth=1.2;html=1;align=left;verticalAlign=middle;padding=3;"
    );
    curT6X += comp.w + 10;
  });

  // Right Enclave: Protocols & Ingestion Modes (Dashed Box)
  cell("t6_proto_box", "", 914, 508, 356, 62, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#EA580C;strokeWidth=1.5;dashed=1;dashPattern=4 3;");
  cell("t6_proto_lbl", "Protocols & Ingestion Modes", 914, 510, 356, 14, "html=1;fontColor:#C2410C;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");

  const protocols: { t: string; icon: keyof typeof SVG; color: string }[] = [
    { t: "REST", icon: "globe", color: "#EA580C" },
    { t: "gRPC", icon: "bolt", color: "#EA580C" },
    { t: "Webhooks", icon: "link", color: "#EA580C" },
    { t: "Batch", icon: "clock", color: "#EA580C" },
    { t: "Files", icon: "folder", color: "#EA580C" }
  ];
  protocols.forEach((pr, idx) => {
    const px = 924 + idx * 70;
    cell(
      `t6_pr_${idx}`,
      `<div style="text-align:center;"><div style="display:flex;justify-content:center;margin-bottom:2px;">${svgIcon(pr.icon, pr.color, 16)}</div><div style="font-size:8px;font-weight:800;color:#0F172A;margin-top:2px;">${pr.t}</div></div>`,
      px,
      526,
      62,
      38,
      "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;padding=1;"
    );
  });

  // ----------------------------------------------------
  // TIER 7: ENTERPRISE KNOWLEDGE SOURCES LAYER (y=584..712, h=128)
  // ----------------------------------------------------
  cell("t7_num", "7", 16, 584, 24, 24, "rounded=1;arcSize=14;fillColor=#2563EB;strokeColor=#2563EB;fontColor=#FFFFFF;fontSize=13;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t7_lbl", `<div style="font-size:9px;font-weight:900;color:#1E40AF;line-height:1.15;">ENTERPRISE<br/>KNOWLEDGE SOURCES<br/>LAYER</div>`, 44, 584, 118, 36, "whiteSpace=wrap;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  // Tier 7 Container Box
  cell("t7_box", "", 166, 584, 1114, 128, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.5;");

  // 6 Knowledge Source Zones:
  // Zone 1: Collaboration & Content (w=176)
  cell("t7_z1", "", 174, 590, 176, 116, "rounded=1;arcSize=4;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.2;");
  cell("t7_z1_lbl", "Collaboration & Content", 174, 592, 176, 14, "html=1;fontColor:#1E40AF;fontSize=8;fontStyle=1;align=center;verticalAlign=middle;");
  const z1Items: { t: string; icon: keyof typeof SVG; color: string }[] = [
    { t: "SharePoint", icon: "folder", color: "#0284C7" },
    { t: "Google Drive", icon: "cloud", color: "#16A34A" },
    { t: "Confluence", icon: "document", color: "#2563EB" },
    { t: "Notion", icon: "document", color: "#0F172A" },
    { t: "Docs / Wikis", icon: "document", color: "#7C3AED" }
  ];
  z1Items.forEach((it, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const zx = 180 + col * 84;
    const zy = 614 + row * 28;
    cell(`t7_z1_${idx}`, `<div style="display:flex;align-items:center;gap:4px;">${svgIcon(it.icon, it.color, 14)}<span style="font-size:7.5px;font-weight:800;color:#0F172A;">${it.t}</span></div>`, zx, zy, 80, 26, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  });

  // Zone 2: Enterprise Apps (w=176)
  cell("t7_z2", "", 356, 590, 176, 116, "rounded=1;arcSize=4;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.2;");
  cell("t7_z2_lbl", "Enterprise Apps", 356, 592, 176, 14, "html=1;fontColor:#1E40AF;fontSize=8;fontStyle=1;align=center;verticalAlign=middle;");
  const z2Items: { t: string; icon: keyof typeof SVG; color: string }[] = [
    { t: "Salesforce", icon: "cloud", color: "#0284C7" },
    { t: "ServiceNow", icon: "gear", color: "#16A34A" },
    { t: "Workday", icon: "user", color: "#EA580C" },
    { t: "SAP", icon: "database", color: "#2563EB" },
    { t: "Jira", icon: "checkCircle", color: "#0284C7" }
  ];
  z2Items.forEach((it, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const zx = 362 + col * 84;
    const zy = 614 + row * 28;
    cell(`t7_z2_${idx}`, `<div style="display:flex;align-items:center;gap:4px;">${svgIcon(it.icon, it.color, 14)}<span style="font-size:7.5px;font-weight:800;color:#0F172A;">${it.t}</span></div>`, zx, zy, 80, 26, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  });

  // Zone 3: Databases & Warehouses (w=176)
  cell("t7_z3", "", 538, 590, 176, 116, "rounded=1;arcSize=4;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.2;");
  cell("t7_z3_lbl", "Databases & Warehouses", 538, 592, 176, 14, "html=1;fontColor:#1E40AF;fontSize=8;fontStyle=1;align=center;verticalAlign=middle;");
  const z3Items: { t: string; icon: keyof typeof SVG; color: string }[] = [
    { t: "BigQuery", icon: "chart", color: "#2563EB" },
    { t: "Cloud SQL", icon: "database", color: "#0284C7" },
    { t: "AlloyDB", icon: "bolt", color: "#7C3AED" },
    { t: "Spanner", icon: "network", color: "#16A34A" },
    { t: "Bigtable", icon: "database", color: "#EA580C" }
  ];
  z3Items.forEach((it, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const zx = 544 + col * 84;
    const zy = 614 + row * 28;
    cell(`t7_z3_${idx}`, `<div style="display:flex;align-items:center;gap:4px;">${svgIcon(it.icon, it.color, 14)}<span style="font-size:7.5px;font-weight:800;color:#0F172A;">${it.t}</span></div>`, zx, zy, 80, 26, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  });

  // Zone 4: Object & File Stores (w=176)
  cell("t7_z4", "", 720, 590, 176, 116, "rounded=1;arcSize=4;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.2;");
  cell("t7_z4_lbl", "Object & File Stores", 720, 592, 176, 14, "html=1;fontColor:#1E40AF;fontSize=8;fontStyle=1;align=center;verticalAlign=middle;");
  const z4Items: { t: string; icon: keyof typeof SVG; color: string }[] = [
    { t: "Cloud Storage", icon: "cloud", color: "#0284C7" },
    { t: "PDFs", icon: "document", color: "#DC2626" },
    { t: "Office Docs", icon: "document", color: "#2563EB" },
    { t: "Images", icon: "eye", color: "#16A34A" },
    { t: "Audio", icon: "headset", color: "#7C3AED" },
    { t: "Emails", icon: "message", color: "#EA580C" }
  ];
  z4Items.forEach((it, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const zx = 726 + col * 84;
    const zy = 614 + row * 28;
    cell(`t7_z4_${idx}`, `<div style="display:flex;align-items:center;gap:4px;">${svgIcon(it.icon, it.color, 14)}<span style="font-size:7.5px;font-weight:800;color:#0F172A;">${it.t}</span></div>`, zx, zy, 80, 26, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  });

  // Zone 5: External Sources (w=176)
  cell("t7_z5", "", 902, 590, 176, 116, "rounded=1;arcSize=4;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.2;");
  cell("t7_z5_lbl", "External Sources", 902, 592, 176, 14, "html=1;fontColor:#1E40AF;fontSize=8;fontStyle=1;align=center;verticalAlign=middle;");
  const z5Items: { t: string; icon: keyof typeof SVG; color: string }[] = [
    { t: "Websites", icon: "globe", color: "#2563EB" },
    { t: "Research Feeds", icon: "document", color: "#7C3AED" },
    { t: "Public Data", icon: "users", color: "#16A34A" },
    { t: "Knowledge Subs", icon: "tag", color: "#EA580C" }
  ];
  z5Items.forEach((it, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const zx = 908 + col * 84;
    const zy = 614 + row * 28;
    cell(`t7_z5_${idx}`, `<div style="display:flex;align-items:center;gap:4px;">${svgIcon(it.icon, it.color, 14)}<span style="font-size:7.5px;font-weight:800;color:#0F172A;">${it.t}</span></div>`, zx, zy, 80, 26, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  });

  // Zone 6: Data Platforms / Infrastructure (w=184)
  cell("t7_z6", "", 1084, 590, 184, 116, "rounded=1;arcSize=4;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.2;");
  cell("t7_z6_lbl", "Data Platforms / Infrastructure", 1084, 592, 184, 14, "html=1;fontColor:#1E40AF;fontSize=8;fontStyle=1;align=center;verticalAlign=middle;");
  const z6Items: { t: string; icon: keyof typeof SVG; color: string }[] = [
    { t: "Pub/Sub", icon: "bolt", color: "#EA580C" },
    { t: "Dataflow", icon: "repeat", color: "#2563EB" },
    { t: "Dataplex", icon: "layers", color: "#0D9488" },
    { t: "Data Catalog", icon: "tag", color: "#7C3AED" }
  ];
  z6Items.forEach((it, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const zx = 1090 + col * 88;
    const zy = 614 + row * 28;
    cell(`t7_z6_${idx}`, `<div style="display:flex;align-items:center;gap:4px;">${svgIcon(it.icon, it.color, 14)}<span style="font-size:7.5px;font-weight:800;color:#0F172A;">${it.t}</span></div>`, zx, zy, 84, 26, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  });

  // ----------------------------------------------------
  // TIER 8: SECURITY / PRIVACY / SOVEREIGNTY FOUNDATION (y=718..778, h=60)
  // ----------------------------------------------------
  cell("t8_num", "8", 16, 718, 24, 24, "rounded=1;arcSize=14;fillColor=#1E3A8A;strokeColor=#1E3A8A;fontColor=#FFFFFF;fontSize=13;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t8_lbl", `<div style="font-size:9px;font-weight:900;color:#1E3A8A;line-height:1.15;">SECURITY / PRIVACY /<br/>SOVEREIGNTY<br/>FOUNDATION</div>`, 44, 718, 118, 36, "whiteSpace=wrap;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  // Tier 8 Container Box
  cell("t8_box", "", 166, 718, 1114, 60, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;");

  const secBlocks: { t: string; icon: keyof typeof SVG; color: string }[] = [
    { t: "VPC Network", icon: "network", color: "#1E3A8A" },
    { t: "Private Service<br/>Connect", icon: "lock", color: "#2563EB" },
    { t: "Cloud NAT", icon: "cloud", color: "#0284C7" },
    { t: "Firewall Rules", icon: "shield", color: "#DC2626" },
    { t: "Encryption in Transit<br/><span style='font-size:7px;color:#64748B;font-weight:600;'>TLS 1.2+</span>", icon: "lock", color: "#16A34A" },
    { t: "Encryption at Rest<br/><span style='font-size:7px;color:#64748B;font-weight:600;'>CMEK / KMS</span>", icon: "key", color: "#D97706" },
    { t: "Secret Manager", icon: "key", color: "#7C3AED" },
    { t: "DLP / Masking /<br/>Redaction", icon: "eye", color: "#0D9488" },
    { t: "Data Residency /<br/>Sovereignty Controls", icon: "globe", color: "#1E3A8A" },
    { t: "Identity-Aware Proxy /<br/>Zero Trust Access", icon: "user", color: "#2563EB" }
  ];
  secBlocks.forEach((sb, idx) => {
    const sx = 172 + idx * 110;
    cell(
      `t8_b_${idx}`,
      `<div style="display:flex;align-items:center;gap:4px;padding:0 2px;">${svgIcon(sb.icon, sb.color, 16)}<span style="font-size:7.5px;font-weight:800;color:#0F172A;line-height:1.1;">${sb.t}</span></div>`,
      sx,
      724,
      106,
      48,
      "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;padding=1;"
    );
  });

  // ==================== 3. RIGHT SIDEBAR: 3 PILLARS (x=1292..1656, w=364) ====================

  // ----------------------------------------------------
  // PILLAR A: GOVERNANCE / COMPLIANCE (y=62..280, h=218)
  // ----------------------------------------------------
  cell("pA_box", "", 1292, 62, 364, 218, "rounded=1;arcSize=4;fillColor=#FAF5FF;strokeColor=#C4B5FD;strokeWidth=1.5;");
  cell("pA_badge", "A", 1296, 66, 22, 22, "rounded=1;arcSize=14;fillColor=#7C3AED;strokeColor=#7C3AED;fontColor=#FFFFFF;fontSize=12;fontStyle=1;align=center;verticalAlign=middle;");
  cell("pA_title", "GOVERNANCE / COMPLIANCE", 1324, 66, 324, 22, "html=1;fontColor=#6D28D9;fontSize=9.5;fontStyle=1;align=left;verticalAlign=middle;");

  const pAItems: { t: string; icon: keyof typeof SVG; color: string }[] = [
    { t: "Human Approval Queue", icon: "user", color: "#7C3AED" },
    { t: "Policy & Prompt Governance", icon: "document", color: "#7C3AED" },
    { t: "Audit Trail / Evidence Logging", icon: "clipboard", color: "#7C3AED" },
    { t: "PII / DLP Checks", icon: "lock", color: "#7C3AED" },
    { t: "Responsible AI", icon: "scale", color: "#7C3AED" }
  ];
  pAItems.forEach((it, idx) => {
    const iy = 94 + idx * 28;
    cell(`pA_it_${idx}`, `<div style="display:flex;align-items:center;gap:8px;padding:0 6px;">${svgIcon(it.icon, it.color, 16)}<span style="font-size:8.5px;font-weight:800;color:#0F172A;">${it.t}</span></div>`, 1298, iy, 350, 26, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  });

  // Compliance Controls box inside Pillar A
  cell("pA_comp_box", `<div style="font-size:8.5px;font-weight:900;color:#6D28D9;margin-bottom:2px;">Compliance Controls</div><div style="font-size:8px;color:#334155;font-weight:800;">HIPAA &nbsp;•&nbsp; GDPR &nbsp;•&nbsp; SOC2 &nbsp;•&nbsp; ISO 27001 &nbsp;•&nbsp; Internal Policy</div>`, 1298, 236, 350, 36, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#E9D5FF;strokeWidth=1.2;html=1;align=center;verticalAlign=middle;padding=3;");

  // ----------------------------------------------------
  // PILLAR B: OBSERVABILITY / EVALUATION / FINOPS (y=288..538, h=250)
  // ----------------------------------------------------
  cell("pB_box", "", 1292, 288, 364, 250, "rounded=1;arcSize=4;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.5;");
  cell("pB_badge", "B", 1296, 292, 22, 22, "rounded=1;arcSize=14;fillColor=#2563EB;strokeColor=#2563EB;fontColor=#FFFFFF;fontSize=12;fontStyle=1;align=center;verticalAlign=middle;");
  cell("pB_title", "OBSERVABILITY / EVALUATION / FINOPS", 1324, 292, 324, 22, "html=1;fontColor=#1E40AF;fontSize=9.5;fontStyle=1;align=left;verticalAlign=middle;");

  const pBItems: { t: string; sub: string; icon: keyof typeof SVG; color: string }[] = [
    { t: "Logs, Metrics, Traces", sub: "", icon: "chart", color: "#2563EB" },
    { t: "Retrieval Metrics", sub: "(recall, precision, hit rate)", icon: "pulse", color: "#2563EB" },
    { t: "RAG Evaluation", sub: "(grounding score, citation coverage, answer quality)", icon: "target", color: "#2563EB" },
    { t: "Feedback Loop", sub: "(user ratings, corrections, reinforcement signals)", icon: "thumbsUp", color: "#2563EB" },
    { t: "Cost & Token Tracking", sub: "", icon: "dollar", color: "#2563EB" },
    { t: "SLOs / Alerts / Dashboards", sub: "", icon: "alert", color: "#2563EB" }
  ];
  pBItems.forEach((it, idx) => {
    const iy = 318 + idx * 35;
    cell(
      `pB_it_${idx}`,
      `<div style="display:flex;align-items:center;gap:8px;padding:0 6px;">${svgIcon(it.icon, it.color, 18)}<div><div style="font-size:8.5px;font-weight:800;color:#0F172A;">${it.t}</div>${it.sub ? `<div style="font-size:7.5px;color:#64748B;font-weight:600;">${it.sub}</div>` : ""}</div></div>`,
      1298,
      iy,
      350,
      32,
      "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;"
    );
  });

  // ----------------------------------------------------
  // PILLAR C: PLATFORM OPERATIONS / DELIVERY (y=546..778, h=232)
  // ----------------------------------------------------
  cell("pC_box", "", 1292, 546, 364, 232, "rounded=1;arcSize=4;fillColor=#F0FDF4;strokeColor=#86EFAC;strokeWidth=1.5;");
  cell("pC_badge", "C", 1296, 550, 22, 22, "rounded=1;arcSize=14;fillColor=#16A34A;strokeColor=#16A34A;fontColor=#FFFFFF;fontSize=12;fontStyle=1;align=center;verticalAlign=middle;");
  cell("pC_title", "PLATFORM OPERATIONS / DELIVERY", 1324, 550, 324, 22, "html=1;fontColor=#15803D;fontSize=9.5;fontStyle=1;align=left;verticalAlign=middle;");

  const pCItems: { t: string; sub: string; icon: keyof typeof SVG; color: string }[] = [
    { t: "CI/CD / GitOps", sub: "", icon: "repeat", color: "#16A34A" },
    { t: "Prompt / Template Management", sub: "", icon: "document", color: "#16A34A" },
    { t: "Index Lifecycle Management", sub: "", icon: "gear", color: "#16A34A" },
    { t: "Model Registry / Rollout", sub: "", icon: "box", color: "#16A34A" },
    { t: "Runtime & Compute", sub: "(GKE / Cloud Run / Cloud Functions)", icon: "server", color: "#16A34A" },
    { t: "Artifacts & Secrets", sub: "(Artifact Registry / Secret Manager / Config)", icon: "lock", color: "#16A34A" }
  ];
  pCItems.forEach((it, idx) => {
    const iy = 576 + idx * 33;
    cell(
      `pC_it_${idx}`,
      `<div style="display:flex;align-items:center;gap:8px;padding:0 6px;">${svgIcon(it.icon, it.color, 18)}<div><div style="font-size:8.5px;font-weight:800;color:#0F172A;">${it.t}</div>${it.sub ? `<div style="font-size:7.5px;color:#64748B;font-weight:600;">${it.sub}</div>` : ""}</div></div>`,
      1298,
      iy,
      350,
      30,
      "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;"
    );
  });

  // ==================== 4. BOTTOM SECTION (y=788..926, h=138) ====================

  // ----------------------------------------------------
  // Left: LEGEND (Arrow Types) (x=16..170, w=154, h=138)
  // ----------------------------------------------------
  cell("bot_leg_box", "", 16, 788, 154, 138, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("bot_leg_title", "LEGEND (Arrow Types)", 16, 792, 154, 14, "html=1;fontColor=#475569;fontSize=8;fontStyle=1;align=center;verticalAlign=middle;");

  const legendTypes = [
    { t: "User Interaction", color: "#1D4ED8", style: "solid" },
    { t: "Control / Policy", color: "#7C3AED", style: "dashed" },
    { t: "Data Flow", color: "#0F172A", style: "solid" },
    { t: "Async Events / Streaming", color: "#EA580C", style: "dashed" }
  ];
  legendTypes.forEach((lt, idx) => {
    const ly = 814 + idx * 26;
    cell(
      `bot_lt_${idx}`,
      `<div style="font-size:8px;font-weight:800;color:#0F172A;line-height:1.2;">${lt.t}</div>`,
      54,
      ly - 4,
      110,
      20,
      "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;"
    );
    rawEdge(`e_leg_${idx}`, `edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=${lt.color};strokeWidth=1.8;${lt.style === "dashed" ? "dashed=1;dashPattern=3 2;" : ""}endArrow=classic;endSize=3;`, [
      { x: 22, y: ly + 6 },
      { x: 48, y: ly + 6 }
    ]);
  });

  // ----------------------------------------------------
  // Center: END-TO-END FLOW (Example) (x=178..1300, w=1122, h=138)
  // ----------------------------------------------------
  cell("bot_e2e_box", "", 178, 788, 1122, 138, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.5;");
  cell("bot_e2e_title", "END-TO-END FLOW (Example)", 178, 788, 1122, 20, "shape=rectangle;rounded=1;arcSize=4;fillColor=#1E3A8A;strokeColor=#1E3A8A;fontColor=#FFFFFF;fontSize=9;fontStyle=1;align=center;verticalAlign=middle;");

  const e2eSteps: { n: string; t: string; icon: keyof typeof SVG; color: string }[] = [
    { n: "1", t: "User asks<br/>question", icon: "user", color: "#1D4ED8" },
    { n: "2", t: "Query understanding<br/>and routing", icon: "brain", color: "#0D9488" },
    { n: "3", t: "Retrieve relevant<br/>knowledge", icon: "search", color: "#16A34A" },
    { n: "4", t: "Re-rank and<br/>ground context", icon: "chart", color: "#7C3AED" },
    { n: "5", t: "Generate answer<br/>with citations", icon: "document", color: "#D97706" },
    { n: "6", t: "Capture feedback /<br/>monitoring", icon: "thumbsUp", color: "#EA580C" }
  ];
  e2eSteps.forEach((st, idx) => {
    const ex = 196 + idx * 182;
    cell(
      `e2e_${idx}`,
      `<div style="text-align:center;padding:6px 4px;"><div style="display:flex;justify-content:center;align-items:center;gap:6px;margin-bottom:6px;"><div style="width:26px;height:26px;background:${st.color};color:#FFFFFF;border-radius:50%;font-size:13px;font-weight:900;text-align:center;line-height:26px;flex-shrink:0;">${st.n}</div>${svgIcon(st.icon, st.color, 24)}</div><div style="font-size:8.5px;font-weight:800;color:#0F172A;line-height:1.2;">${st.t}</div></div>`,
      ex,
      814,
      150,
      104,
      "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1.2;html=1;align=center;verticalAlign=middle;padding=2;"
    );

    // Chained arrow to next step
    if (idx < e2eSteps.length - 1) {
      rawEdge(`e_e2e_${idx}`, "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#0F172A;strokeWidth=1.8;endArrow=classic;endSize=4;", [
        { x: ex + 150, y: 866 },
        { x: ex + 182, y: 866 }
      ]);
    }
  });

  // ----------------------------------------------------
  // Right: Google Cloud Brand Block (x=1310..1656, w=346, h=138)
  // ----------------------------------------------------
  const gcpHtml = `<div style="text-align:center;padding:22px 6px;"><div style="display:flex;align-items:center;justify-content:center;gap:8px;">${svgIcon("cloud", "#4285F4", 32)}<span style="font-size:26px;font-weight:900;color:#0F172A;letter-spacing:0.5px;">Google Cloud</span></div><div style="font-size:14px;font-weight:800;color:#64748B;margin-top:6px;">Build. On Google Cloud.</div></div>`;
  cell("bot_gcp_block", gcpHtml, 1310, 788, 346, 138, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;html=1;align=center;verticalAlign=middle;");

  // ==================== 5. INTER-TIER & CROSS-CUTTING CONNECTORS ====================
  // Inter-Tier Ingress / Egress Arrows:
  // Tier 1 -> Tier 2 (Downward arrow)
  rawEdge("e_t1_to_t2", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#0F172A;strokeWidth=1.8;endArrow=classic;endSize=4;", [
    { x: 723, y: 144 },
    { x: 723, y: 150 }
  ]);

  // Tier 2 -> Tier 3 (Downward arrow)
  rawEdge("e_t2_to_t3", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#0F172A;strokeWidth=1.8;endArrow=classic;endSize=4;", [
    { x: 723, y: 222 },
    { x: 723, y: 228 }
  ]);

  // Tier 3 -> Tier 4 (Downward arrow)
  rawEdge("e_t3_to_t4", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#0F172A;strokeWidth=1.8;endArrow=classic;endSize=4;", [
    { x: 723, y: 306 },
    { x: 723, y: 312 }
  ]);

  // Tier 4 <-> Tier 5 (Bidirectional data/grounding arrow)
  rawEdge("e_t4_to_t5", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#7C3AED;strokeWidth=1.8;endArrow=classic;startArrow=classic;endSize=4;startSize=4;", [
    { x: 723, y: 392 },
    { x: 723, y: 398 }
  ]);

  // Tier 5 <-> Tier 6 (Bidirectional Ingestion/Index arrow)
  rawEdge("e_t5_to_t6", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#EA580C;strokeWidth=1.8;dashed=1;dashPattern=4 3;endArrow=classic;startArrow=classic;endSize=4;startSize=4;", [
    { x: 723, y: 496 },
    { x: 723, y: 502 }
  ]);

  // Tier 6 <-> Tier 7 (Bidirectional Source Connector arrow)
  rawEdge("e_t6_to_t7", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#2563EB;strokeWidth=1.8;endArrow=classic;startArrow=classic;endSize=4;startSize=4;", [
    { x: 723, y: 578 },
    { x: 723, y: 584 }
  ]);

  // Tier 7 <-> Tier 8 (Security Foundation link)
  rawEdge("e_t7_to_t8", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#1E3A8A;strokeWidth=1.8;endArrow=classic;startArrow=classic;endSize=4;startSize=4;", [
    { x: 723, y: 712 },
    { x: 723, y: 718 }
  ]);

  // Main Stack -> Right Pillars Cross-Cutting Connectors:
  // Tier 1 / Tier 2 -> Pillar A (Governance / Compliance)
  rawEdge("e_stack_to_pA", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#7C3AED;strokeWidth=1.5;dashed=1;dashPattern=4 3;endArrow=classic;startArrow=classic;endSize=4;startSize=4;", [
    { x: 1280, y: 150 },
    { x: 1292, y: 150 }
  ]);

  // Tier 3 / Tier 4 -> Pillar B (Observability / Eval / FinOps)
  rawEdge("e_stack_to_pB", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#2563EB;strokeWidth=1.5;dashed=1;dashPattern=4 3;endArrow=classic;startArrow=classic;endSize=4;startSize=4;", [
    { x: 1280, y: 390 },
    { x: 1292, y: 390 }
  ]);

  // Tier 6 / Tier 7 -> Pillar C (Platform Operations / Delivery)
  rawEdge("e_stack_to_pC", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#16A34A;strokeWidth=1.5;dashed=1;dashPattern=4 3;endArrow=classic;startArrow=classic;endSize=4;startSize=4;", [
    { x: 1280, y: 650 },
    { x: 1292, y: 650 }
  ]);

  const bg = isDark ? "#0F172A" : "#FFFFFF";

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_41_enterprise_rag_platform" name="Template 41: Enterprise RAG &amp; Knowledge Intelligence Platform">
    <mxGraphModel dx="1672" dy="941" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1672" pageHeight="941" background="${bg}" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${c.join("\n        ")}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
