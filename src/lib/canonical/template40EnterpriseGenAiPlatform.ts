/**
 * Master 1:1 High-Craft Exact Ground-Truth Replica for Template 40: Enterprise GenAI & Multi-Agent Platform
 * Matches 100% of images/40.png:
 * - Exact 1600x1180 master canvas resolution.
 * - Top Header Banner: "40. Enterprise GenAI & Multi-Agent Platform" + Subtitle
 * - Tier 1: User & Channels Layer (Business Users, Analysts, Developers, Ops, Partners, Web, Mobile, Teams/Slack, API/SDK, Contact Center, Copilots/Chat UI)
 * - Tier 2: Experience & Access Layer (Identity & Access, Edge & Access Mgmt, Tenant/Workspace Isolation)
 * - Tier 3: Agent Experience & Orchestration Layer (Platform Services, Supervisor/Orchestrator, Planner/Router, 7 Specialized Agents, Agent Governance)
 * - Tier 4: Model & Reasoning Layer (Safety & Grounding, Model Gateway/LLM Router, Gemini 1.5, Gemma, Other Models, Model Ops)
 * - Tier 5: Memory, Knowledge & Context Layer (Short-Term, Long-Term, Vector Index, Knowledge Graph, Cache + 5-step RAG Pipeline)
 * - Tier 6: Tool / Protocol Integration Layer (MCP Tool Gateway, Tool Registry, Connectors, Execution Services, Integration Protocols)
 * - Tier 7: Enterprise Systems & Data Sources Layer (Structured Apps, Unstructured Content, DBs, Analytics Lakehouse, Data Types/Formats)
 * - Tier 8: Network / Security Foundation (Zero-Trust VPC, PSC, NAT, Firewalls, CMEK, KMS, IAP, Multi-Region DR)
 * - Right Sidebar:
 *   - Tier 8: Governance / HITL / Compliance (Human Approval, Prompt Governance, Audit Trail, DLP, Responsible AI, Compliance)
 *   - Observability / Evaluation / FinOps (Logs/Metrics/Traces, Model Mon, Agent Eval, Feedback Loop, Cost/Token Tracking, SLOs)
 *   - Platform Operations / Delivery (CI/CD GitOps, Prompt Mgmt, Model Registry, Runtime Compute, Artifacts & Secrets)
 * - Complete Inter-Tier Connectors, Agent-to-Agent (A2A) loops, RAG pipeline chaining, and Step Flow Badges (❶..❿)
 * - Bottom Footer: Legend (Arrow Types) + End-to-End Flow Example (1..6) + Google Cloud brand
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
  pulse: `<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>`
};

export function generateTemplate40EnterpriseGenAiPlatformXml(
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
    if (pts.length === 2) {
      c.push(
        `<mxCell id="${id}" edge="1" parent="1" style="${style}">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="${pts[0].x}" y="${pts[0].y}" as="sourcePoint"/>
            <mxPoint x="${pts[1].x}" y="${pts[1].y}" as="targetPoint"/>
          </mxGeometry>
        </mxCell>`
      );
    } else {
      const midPts = pts.slice(1, -1).map(p => `<mxPoint x="${p.x}" y="${p.y}"/>`).join("\n            ");
      c.push(
        `<mxCell id="${id}" edge="1" parent="1" style="${style}">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="${pts[0].x}" y="${pts[0].y}" as="sourcePoint"/>
            <mxPoint x="${pts[pts.length - 1].x}" y="${pts[pts.length - 1].y}" as="targetPoint"/>
            <Array as="points">
              ${midPts}
            </Array>
          </mxGeometry>
        </mxCell>`
      );
    }
  };

  // ==================== 1. TOP HEADER BANNER (y=12..48) ====================
  cell(
    "hdr_title",
    `<div style='font-size:26px;font-weight:900;color:#0F172A;letter-spacing:-0.3px;line-height:1.1;'><span style='color:#1D4ED8;'>40.</span> Enterprise GenAI &amp; Multi-Agent Platform</div>`,
    16,
    12,
    580,
    34,
    "whiteSpace=wrap;overflow=hidden;text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;"
  );

  cell(
    "hdr_sub",
    `<div style='font-size:12.5px;font-weight:700;color:#1E3A8A;'>End-to-End, Secure, Governed, and Observable Multi-Agent AI Platform on Google Cloud</div>`,
    590,
    16,
    750,
    28,
    "whiteSpace=wrap;overflow=hidden;text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;"
  );

  // Left vertical tier number badge helper
  const tierBadge = (num: string, y: number, h: number, col = "#1D4ED8") => {
    cell(
      `t_badge_${num}`,
      num,
      12,
      y + (h - 28) / 2,
      28,
      28,
      `shape=ellipse;fillColor=${col};strokeColor=${col};fontColor=#FFFFFF;fontSize=13;fontStyle=1;align=center;verticalAlign=middle;`
    );
  };

  const tierLabel = (id: string, text: string, y: number, h: number) => {
    cell(
      `t_lbl_${id}`,
      text,
      44,
      y,
      86,
      h,
      "whiteSpace=wrap;overflow=hidden;text;html=1;strokeColor=none;fillColor=none;fontSize=8.5;fontStyle=1;fontColor:#1E3A8A;align=left;verticalAlign=middle;lineHeight=1.15;"
    );
  };

  // Flow Step Badge helper
  const flowBadge = (id: string, num: string, x: number, y: number, col = "#7C3AED") => {
    cell(
      `fl_badge_${id}`,
      num,
      x,
      y,
      20,
      20,
      `shape=ellipse;fillColor=${col};strokeColor=${col};fontColor=#FFFFFF;fontSize=10;fontStyle=1;align=center;verticalAlign=middle;`
    );
  };

  // ==================== TIER 1: USER & CHANNELS LAYER (y=54..124, h=70) ====================
  tierBadge("1", 54, 70, "#1D4ED8");
  tierLabel("1", "USER &<br/>CHANNELS<br/>LAYER", 54, 70);

  // Users Pod (w=340)
  cell("box_t1_users", "", 134, 54, 344, 70, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#BFDBFE;strokeWidth=1.5;");
  const usersList = [
    { t: "Business Users", svg: SVG.users },
    { t: "Analysts", svg: SVG.chart },
    { t: "Developers", svg: SVG.code },
    { t: "Operations", svg: SVG.gear },
    { t: "External Partners", svg: SVG.users }
  ];
  usersList.forEach((u, i) => {
    const ux = 140 + i * 67;
    cell(`u_${i}`, `<div style="text-align:center;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" stroke-width="2">${u.svg}</svg><div style="font-size:7.5px;font-weight:800;color:#0F172A;margin-top:3px;line-height:1.15;">${u.t}</div></div>`, ux, 58, 64, 62, "rounded=1;fillColor=#F8FAFC;strokeColor=none;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // Channels Pod (w=854)
  cell("box_t1_channels", "", 484, 54, 856, 70, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#BFDBFE;strokeWidth=1.5;");
  cell("lbl_t1_channels", "CHANNELS", 484, 56, 856, 14, "fontColor:#1E40AF;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");

  const channelsList = [
    { t: "Web App", svg: SVG.globe },
    { t: "Mobile App", svg: SVG.phone },
    { t: "Teams / Slack", svg: SVG.message },
    { t: "API / SDK", svg: SVG.code },
    { t: "Contact Center", svg: SVG.headset }
  ];
  channelsList.forEach((ch, i) => {
    const chx = 492 + i * 116;
    cell(`ch_${i}`, `<div style="text-align:center;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2">${ch.svg}</svg><div style="font-size:8px;font-weight:800;color:#0F172A;margin-top:3px;">${ch.t}</div></div>`, chx, 72, 110, 48, "rounded=1;fillColor=#F0F9FF;strokeColor=#BAE6FD;strokeWidth=1.2;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // Enterprise Copilots Pod (Right inside Channels)
  cell("copilot_chat", `<div style="text-align:center;"><div style="font-size:8.5px;font-weight:900;color:#6D28D9;">Enterprise Copilots /<br/>Chat UI / Portal</div><div style="font-size:7.5px;font-weight:700;color:#64748B;margin-top:2px;background:#FAF5FF;padding:2px 6px;border-radius:4px;border:1px dashed #DDD6FE;">Hello! How can I help you?</div></div>`, 1080, 60, 252, 60, "rounded=1;fillColor=#FAF5FF;strokeColor=#DDD6FE;strokeWidth=1.2;html=1;align=center;verticalAlign=middle;padding=2;");

  // Connectors: Users -> Channels
  rawEdge("e_u_ch", "edgeStyle=none;strokeColor=#2563EB;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 478, y: 89 },
    { x: 484, y: 89 }
  ]);

  // Flow Step 1 Badge between Channels & Edge
  flowBadge("step_1", "1", 396, 120, "#7C3AED");

  // Connector: Channels -> Edge Gateway
  rawEdge("e_ch_edge", "edgeStyle=none;strokeColor=#2563EB;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 546, y: 124 },
    { x: 546, y: 132 }
  ]);

  // ==================== TIER 2: EXPERIENCE & ACCESS LAYER (y=132..204, h=72) ====================
  tierBadge("2", 132, 72, "#0D9488");
  tierLabel("2", "EXPERIENCE &<br/>ACCESS LAYER", 132, 72);

  // Identity & Access
  cell("box_t2_iam", "", 134, 132, 290, 72, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("lbl_t2_iam", "Identity & Access", 134, 134, 290, 14, "fontColor:#0D9488;fontSize=8;fontStyle=1;align=center;verticalAlign=middle;");
  const iamItems = [
    { t: "SSO (SAML/OIDC)", svg: SVG.user },
    { t: "IAM", svg: SVG.users },
    { t: "MFA", svg: SVG.lock },
    { t: "RBAC / ABAC", svg: SVG.shield }
  ];
  iamItems.forEach((im, i) => {
    const imx = 140 + i * 70;
    cell(`im_${i}`, `<div style="text-align:center;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0D9488" stroke-width="2">${im.svg}</svg><div style="font-size:7.5px;font-weight:800;color:#0F172A;margin-top:2px;">${im.t}</div></div>`, imx, 150, 66, 50, "rounded=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // Edge & Access Management
  cell("box_t2_edge", "", 430, 132, 390, 72, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("lbl_t2_edge", "Edge & Access Management", 430, 134, 390, 14, "fontColor:#0D9488;fontSize=8;fontStyle=1;align=center;verticalAlign=middle;");
  const edgeItems = [
    { t: "API Gateway", svg: SVG.globe },
    { t: "Cloud Load Balancing", svg: SVG.repeat },
    { t: "Cloud Armor (WAF)", svg: SVG.shield },
    { t: "OAuth 2.0 / OIDC", svg: SVG.key },
    { t: "Rate Limiting & Quotas", svg: SVG.clock }
  ];
  edgeItems.forEach((em, i) => {
    const emx = 436 + i * 76;
    cell(`em_${i}`, `<div style="text-align:center;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0D9488" stroke-width="2">${em.svg}</svg><div style="font-size:7.5px;font-weight:800;color:#0F172A;margin-top:2px;">${em.t}</div></div>`, emx, 150, 72, 50, "rounded=1;fillColor=#F0FDFA;strokeColor=#99F6E4;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // Tenant / Workspace Isolation
  cell("box_t2_tenant", "", 826, 132, 514, 72, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("lbl_t2_tenant", "Tenant / Workspace Isolation", 826, 134, 514, 14, "fontColor:#0D9488;fontSize=8;fontStyle=1;align=center;verticalAlign=middle;");
  const tenantCards = ["Tenant A", "Tenant B", "Tenant N"];
  tenantCards.forEach((tc, i) => {
    const tcx = 836 + i * 162;
    cell(`tc_${i}`, `<div style="text-align:center;"><div style="font-size:8.5px;font-weight:900;color:#0F172A;">${tc}</div><div style="display:flex;justify-content:center;gap:4px;margin-top:4px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0D9488" stroke-width="2">${SVG.users}</svg></div></div>`, tcx, 150, 154, 38, "rounded=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");
  });
  cell("lbl_tenant_iso", "Isolation: Projects • Folders • VPC SC • Namespaces", 826, 188, 514, 14, "fontColor:#64748B;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;");

  // Connectors within Tier 2
  rawEdge("e_iam_edge", "edgeStyle=none;strokeColor=#0D9488;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 424, y: 168 },
    { x: 430, y: 168 }
  ]);
  rawEdge("e_edge_tenant", "edgeStyle=none;strokeColor=#0D9488;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 820, y: 168 },
    { x: 826, y: 168 }
  ]);

  // ==================== TIER 3: AGENT EXPERIENCE & ORCHESTRATION LAYER (y=212..392, h=180) ====================
  tierBadge("3", 212, 180, "#7C3AED");
  tierLabel("3", "AGENT<br/>EXPERIENCE &<br/>ORCHESTRATION<br/>LAYER", 212, 80);

  // Left Step 2 Ingress Badge
  flowBadge("step_2", "2", 84, 326, "#7C3AED");
  rawEdge("e_step2_in", "edgeStyle=none;strokeColor=#7C3AED;strokeWidth=1.5;dashed=1;dashPattern=4 3;endArrow=classic;endSize=4;", [
    { x: 104, y: 336 },
    { x: 134, y: 336 }
  ]);

  cell("box_t3_main", "", 134, 212, 1206, 180, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.5;dashed=1;");

  // Left Column: Agent Platform Services
  cell("box_t3_plat", "", 142, 218, 144, 168, "rounded=1;arcSize=4;fillColor=#FAF5FF;strokeColor=#E9D5FF;strokeWidth=1;");
  cell("lbl_t3_plat", "Agent Platform Services", 142, 220, 144, 14, "fontColor:#6D28D9;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;");
  const platSvcs = [
    { t: "Session Manager", svg: SVG.clipboard },
    { t: "State Manager", svg: SVG.database },
    { t: "Conversation Manager", svg: SVG.message },
    { t: "Identity Propagation", svg: SVG.user },
    { t: "Context Assembler", svg: SVG.box }
  ];
  platSvcs.forEach((ps, i) => {
    const psy = 238 + i * 29;
    cell(`ps_${i}`, `<div style="display:flex;align-items:center;gap:6px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6D28D9" stroke-width="2">${ps.svg}</svg><span style="font-size:7.5px;font-weight:800;color:#0F172A;">${ps.t}</span></div>`, 146, psy, 136, 26, "rounded=1;fillColor=#FFFFFF;strokeColor=#DDD6FE;html=1;align=left;verticalAlign=middle;padding=3;");
  });

  // Center Orchestration Enclave
  cell("sup_agent", `<div style="display:flex;align-items:center;gap:8px;justify-content:center;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" stroke-width="2">${SVG.crown}</svg><span style="font-size:10px;font-weight:900;color:#5B21B6;">Supervisor / Orchestrator Agent</span></div>`, 294, 218, 736, 32, "rounded=1;arcSize=4;fillColor=#F5F3FF;strokeColor=#DDD6FE;html=1;align=center;verticalAlign=middle;padding=2;");

  cell("router_agent", `<div style="text-align:center;"><span style="font-size:8.5px;font-weight:900;color:#6D28D9;">Agent Router / Planner / Task Decomposer</span></div>`, 294, 254, 736, 22, "rounded=1;fillColor=#FAF5FF;strokeColor=#E9D5FF;html=1;align=center;verticalAlign=middle;padding=2;");

  // 7 Specialized Agents
  const agentList = [
    { t: "Research Agent", sub: "Web research, market intel, competitors", svg: SVG.search },
    { t: "Analytics Agent", sub: "Data analysis, BI, insight generation", svg: SVG.chart },
    { t: "Workflow Agent", sub: "Process automation, orchestration", svg: SVG.gear },
    { t: "Support Agent", sub: "Customer support, Q&A, case mgmt", svg: SVG.headset },
    { t: "Retrieval Agent", sub: "Semantic search, RAG, context retrieval", svg: SVG.brain },
    { t: "Code Agent", sub: "Code gen, review, refactor, debug", svg: SVG.code },
    { t: "Compliance Agent", sub: "Policy check, PII, regulatory compliance", svg: SVG.shield }
  ];
  agentList.forEach((ag, i) => {
    const agx = 294 + i * 105;
    cell(`ag_${i}`, `<div style="text-align:center;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" stroke-width="2">${ag.svg}</svg><div style="font-size:8px;font-weight:900;color:#5B21B6;margin-top:2px;">${ag.t}</div><div style="font-size:7px;color:#64748B;line-height:1.15;margin-top:2px;">${ag.sub}</div></div>`, agx, 280, 102, 106, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#DDD6FE;html=1;align=center;verticalAlign=middle;padding=3;");
  });

  // Right Column: Agent Governance
  cell("box_t3_gov", "", 1038, 218, 294, 168, "rounded=1;arcSize=4;fillColor=#FAF5FF;strokeColor=#E9D5FF;strokeWidth=1;");
  cell("lbl_t3_gov", "Agent Governance", 1038, 220, 294, 14, "fontColor:#6D28D9;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;");
  const govItems = [
    { t: "Prompt Templates", svg: SVG.clipboard },
    { t: "Skill Library", svg: SVG.box },
    { t: "Policy-Based Routing", svg: SVG.repeat },
    { t: "Guardrails", svg: SVG.shield },
    { t: "A2A Protocol (Agent-to-Agent)", svg: SVG.link }
  ];
  govItems.forEach((gi, i) => {
    const giy = 238 + i * 29;
    cell(`gi_${i}`, `<div style="display:flex;align-items:center;gap:6px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6D28D9" stroke-width="2">${gi.svg}</svg><span style="font-size:7.5px;font-weight:800;color:#0F172A;">${gi.t}</span></div>`, 1044, giy, 282, 26, "rounded=1;fillColor=#FFFFFF;strokeColor=#DDD6FE;html=1;align=left;verticalAlign=middle;padding=3;");
  });

  // Connectors inside Tier 3
  rawEdge("e_plat_sup", "edgeStyle=none;strokeColor=#7C3AED;strokeWidth=1.5;dashed=1;dashPattern=4 3;startArrow=classic;endArrow=classic;startSize=4;endSize=4;", [
    { x: 286, y: 265 },
    { x: 294, y: 265 }
  ]);
  rawEdge("e_sup_router", "edgeStyle=none;strokeColor=#7C3AED;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 662, y: 250 },
    { x: 662, y: 254 }
  ]);
  agentList.forEach((_, i) => {
    const ax = 345 + i * 105;
    rawEdge(`e_r_ag_${i}`, "edgeStyle=none;strokeColor=#7C3AED;strokeWidth=1.5;endArrow=classic;endSize=4;", [
      { x: ax, y: 276 },
      { x: ax, y: 280 }
    ]);
  });
  for (let i = 0; i < 6; i++) {
    const startX = 396 + i * 105;
    const endX = startX + 3;
    rawEdge(`e_a2a_${i}`, "edgeStyle=none;strokeColor=#7C3AED;strokeWidth=1.2;startArrow=classic;endArrow=classic;startSize=3;endSize=3;", [
      { x: startX, y: 333 },
      { x: endX, y: 333 }
    ]);
  }
  rawEdge("e_gov_sup", "edgeStyle=none;strokeColor=#7C3AED;strokeWidth=1.5;dashed=1;dashPattern=4 3;startArrow=classic;endArrow=classic;startSize=4;endSize=4;", [
    { x: 1038, y: 265 },
    { x: 1030, y: 265 }
  ]);

  // Flow Step 5 Badge to Right Sidebar Governance
  flowBadge("step_5", "5", 1344, 168, "#7C3AED");
  rawEdge("e_sup_gov_sb", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#7C3AED;strokeWidth=1.5;dashed=1;dashPattern=5 3;endArrow=classic;endSize=4;", [
    { x: 1030, y: 234 },
    { x: 1340, y: 234 },
    { x: 1340, y: 178 },
    { x: 1354, y: 178 }
  ]);

  // ==================== TIER 4: MODEL & REASONING LAYER (y=398..498, h=100) ====================
  tierBadge("4", 398, 100, "#0284C7");
  tierLabel("4", "MODEL &<br/>REASONING<br/>LAYER", 398, 60);

  // Left Step 4 Ingress Badge
  flowBadge("step_4", "4", 84, 474, "#0284C7");
  rawEdge("e_step4_in", "edgeStyle=none;strokeColor=#0284C7;strokeWidth=1.5;dashed=1;dashPattern=4 3;endArrow=classic;endSize=4;", [
    { x: 104, y: 484 },
    { x: 134, y: 484 }
  ]);

  // Safety & Grounding Controls
  cell("box_t4_safety", "", 134, 398, 160, 100, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("lbl_t4_safety", "Safety & Grounding Controls", 134, 400, 160, 14, "fontColor=#0284C7;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;");
  const safetyList = [
    "Input / Output Filters",
    "PII / DLP Checks",
    "Content Safety",
    "Prompt Injection Guard",
    "Grounding Enforcement"
  ];
  safetyList.forEach((sl, i) => {
    const sly = 416 + i * 16;
    cell(`sl_${i}`, `<div style="display:flex;align-items:center;gap:4px;"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0284C7" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg><span style="font-size:7.5px;font-weight:800;color:#0F172A;">${sl}</span></div>`, 138, sly, 152, 14, "whiteSpace=wrap;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  });

  // Center: Model Gateway / LLM Router
  cell("box_t4_router", "", 300, 398, 764, 100, "rounded=1;arcSize=4;fillColor=#F0F9FF;strokeColor=#BAE6FD;strokeWidth=1.2;");
  cell("lbl_t4_router", "Model Gateway / LLM Router", 300, 400, 764, 14, "fontColor=#0284C7;fontSize=8;fontStyle=1;align=center;verticalAlign=middle;");
  cell("lbl_t4_sub", "Route • Select • Ensemble • Fallback • Cost / Latency Optimization", 300, 414, 764, 12, "fontColor:#64748B;fontSize=7.5;align=center;verticalAlign=middle;");

  // Model Cards
  const modelCards = [
    { t: "Gemini", sub: "1.5 Pro / 1.5 Flash", svg: SVG.sparkles },
    { t: "Gemini", sub: "1.5 Pro (Vision)", svg: SVG.eye },
    { t: "Gemma", sub: "(7B / 28B)", svg: SVG.brain },
    { t: "Other Foundation", sub: "Anthropic, Llama, Mistral", svg: SVG.globe }
  ];
  modelCards.forEach((mc, i) => {
    const mcx = 308 + i * 130;
    cell(`mc_${i}`, `<div style="text-align:center;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0284C7" stroke-width="2">${mc.svg}</svg><div style="font-size:8.5px;font-weight:900;color:#0F172A;margin-top:2px;">${mc.t}</div><div style="font-size:7.5px;color:#64748B;font-weight:700;">${mc.sub}</div></div>`, mcx, 430, 124, 62, "rounded=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;html=1;align=center;verticalAlign=middle;padding=2;");
    rawEdge(`e_router_mc_${i}`, "edgeStyle=none;strokeColor=#0284C7;strokeWidth=1.5;endArrow=classic;endSize=4;", [
      { x: mcx + 62, y: 426 },
      { x: mcx + 62, y: 430 }
    ]);
  });

  // Smaller Models Pod
  cell("box_t4_small", "", 832, 430, 224, 62, "rounded=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;html=1;align=center;verticalAlign=middle;");
  cell("lbl_t4_small", "Smaller Models", 832, 432, 224, 12, "fontColor=#0284C7;fontSize=8;fontStyle=1;align=center;verticalAlign=middle;");
  const smallPills = ["Classification", "Summarization", "Extraction", "Embedding"];
  smallPills.forEach((sp, i) => {
    const spx = 836 + (i % 2) * 110;
    const spy = 448 + Math.floor(i / 2) * 20;
    cell(`spill_${i}`, `<div style="font-size:7.5px;font-weight:800;color:#0F172A;text-align:center;">${sp}</div>`, spx, spy, 106, 18, "rounded=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=center;verticalAlign=middle;");
  });
  rawEdge("e_router_small", "edgeStyle=none;strokeColor=#0284C7;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 944, y: 426 },
    { x: 944, y: 430 }
  ]);

  // Model Ops
  cell("box_t4_ops", "", 1070, 398, 270, 100, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;");
  cell("lbl_t4_ops", "Model Ops", 1070, 400, 270, 14, "fontColor=#0284C7;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");
  const modelOpsList = [
    { t: "Model Registry", svg: SVG.box },
    { t: "Versioning", svg: SVG.tag },
    { t: "A/B Testing", svg: SVG.repeat },
    { t: "Canary / Rollout", svg: SVG.target },
    { t: "Cost Controls", svg: SVG.chart }
  ];
  modelOpsList.forEach((mo, i) => {
    const mox = 1076 + (i % 2) * 130;
    const moy = 418 + Math.floor(i / 2) * 26;
    const mow = i === 4 ? 258 : 124;
    cell(`mo_${i}`, `<div style="display:flex;align-items:center;gap:6px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0284C7" stroke-width="2">${mo.svg}</svg><span style="font-size:8px;font-weight:800;color:#0F172A;">${mo.t}</span></div>`, mox, moy, mow, 24, "rounded=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=left;verticalAlign=middle;padding=2;");
  });

  // Connectors inside Tier 4
  rawEdge("e_safety_router", "edgeStyle=none;strokeColor=#0284C7;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 294, y: 448 },
    { x: 300, y: 448 }
  ]);
  rawEdge("e_ops_router", "edgeStyle=none;strokeColor=#0284C7;strokeWidth=1.5;startArrow=classic;endArrow=classic;startSize=4;endSize=4;", [
    { x: 1064, y: 448 },
    { x: 1070, y: 448 }
  ]);
  rawEdge("e_ag_router_down", "edgeStyle=none;strokeColor=#0284C7;strokeWidth=1.5;dashed=1;dashPattern=4 3;endArrow=classic;endSize=4;", [
    { x: 682, y: 392 },
    { x: 682, y: 398 }
  ]);

  // Flow Step 6 Badge to Observability Sidebar
  flowBadge("step_6", "6", 1344, 456, "#0284C7");
  rawEdge("e_ops_obs_sb", "edgeStyle=none;strokeColor=#0284C7;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 1340, y: 466 },
    { x: 1354, y: 466 }
  ]);

  // ==================== TIER 5: MEMORY, KNOWLEDGE & CONTEXT LAYER (y=504..600, h=96) ====================
  tierBadge("5", 504, 96, "#1D4ED8");
  tierLabel("5", "MEMORY, KNOWLEDGE<br/>& CONTEXT LAYER", 504, 60);

  // Left Step 3 Ingress Badge
  flowBadge("step_3", "3", 84, 584, "#1D4ED8");
  rawEdge("e_step3_in", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#1D4ED8;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 104, y: 594 },
    { x: 134, y: 594 },
    { x: 134, y: 580 },
    { x: 198, y: 580 }
  ]);

  const memCards = [
    { t: "Short-Term / Conversation Memory", sub: "Recent turns, session state, user intent, working context", svg: SVG.message },
    { t: "Long-Term Memory / Profile Store", sub: "User preferences, history, behavior, personalization", svg: SVG.user },
    { t: "Vector Index / Semantic Search", sub: "Embeddings, vector store, semantic similarity search", svg: SVG.search },
    { t: "Knowledge Graph / Taxonomy", sub: "Entities, relationships, ontology, enterprise taxonomy", svg: SVG.brain },
    { t: "Cache / Prompt-Context Store", sub: "Frequently used contexts, prompts, responses", svg: SVG.bolt }
  ];
  memCards.forEach((mc, i) => {
    const mcx = 134 + i * 242;
    cell(`mem_${i}`, `<div style="text-align:center;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" stroke-width="2">${mc.svg}</svg><div style="font-size:8px;font-weight:900;color:#0F172A;margin-top:2px;">${mc.t}</div><div style="font-size:7px;color:#64748B;line-height:1.15;margin-top:2px;">${mc.sub}</div></div>`, mcx, 504, 236, 54, "rounded=1;arcSize=4;fillColor=#EFF6FF;strokeColor=#BFDBFE;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // Memory Inter-card bidirectional connectors
  for (let i = 0; i < 4; i++) {
    const startX = 370 + i * 242;
    const endX = startX + 6;
    rawEdge(`e_mem_${i}`, "edgeStyle=none;strokeColor=#1D4ED8;strokeWidth=1.2;startArrow=classic;endArrow=classic;startSize=3;endSize=3;", [
      { x: startX, y: 531 },
      { x: endX, y: 531 }
    ]);
  }

  // RAG Pipeline Steps (y=562..594)
  cell("lbl_rag_pipe", "- RAG Pipeline -", 134, 560, 1206, 12, "fontColor:#2563EB;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;");
  const ragSteps = [
    { n: "❶", t: "Retrieve", sub: "(Top-K)" },
    { n: "❷", t: "Rerank", sub: "(Relevance)" },
    { n: "❸", t: "Ground", sub: "(Verify & Filter)" },
    { n: "❹", t: "Cite", sub: "(Sources & Links)" },
    { n: "❺", t: "Context to Model", sub: "(Grounded Prompt)" }
  ];
  ragSteps.forEach((rs, i) => {
    const rsx = 200 + i * 210;
    cell(`rs_${i}`, `<div style="display:flex;align-items:center;gap:4px;justify-content:center;"><span style="color:#2563EB;font-weight:900;font-size:10px;">${rs.n}</span><span style="font-size:7.5px;font-weight:800;color:#0F172A;">${rs.t}</span><span style="font-size:7px;color:#64748B;">${rs.sub}</span></div>`, rsx, 574, 180, 22, "rounded=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // Chained arrows between RAG Pipeline steps
  for (let i = 0; i < 4; i++) {
    const startX = 380 + i * 210;
    const endX = 400 + i * 210;
    rawEdge(`e_rag_${i}`, "edgeStyle=none;strokeColor=#2563EB;strokeWidth=1.5;dashed=1;dashPattern=4 3;endArrow=classic;endSize=4;", [
      { x: startX, y: 585 },
      { x: endX, y: 585 }
    ]);
  }

  // RAG Step 5 loops cleanly around memory card into Tier 4 Model Gateway
  rawEdge("e_rag_to_model", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 1220, y: 574 },
    { x: 1220, y: 560 },
    { x: 1040, y: 560 },
    { x: 1040, y: 498 }
  ]);

  // ==================== TIER 6: TOOL / PROTOCOL INTEGRATION LAYER (y=606..672, h=66) ====================
  tierBadge("6", 606, 66, "#0D9488");
  tierLabel("6", "TOOL / PROTOCOL<br/>INTEGRATION LAYER", 606, 50);

  // MCP Tool Gateway
  cell("box_t6_mcp", `<div style="text-align:center;"><div style="font-size:8px;font-weight:900;color:#0D9488;">MCP Tool Gateway</div><div style="margin-top:2px;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0D9488" stroke-width="2">${SVG.plug}</svg></div><div style="font-size:7px;color:#64748B;">MCP Server</div></div>`, 134, 606, 170, 66, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");

  // Tool Registry
  cell("box_t6_reg", `<div style="text-align:center;"><div style="font-size:8px;font-weight:900;color:#0D9488;">Tool Registry</div><div style="margin-top:2px;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0D9488" stroke-width="2">${SVG.box}</svg></div><div style="font-size:7px;color:#64748B;">Tools, Functions, APIs, Templates</div></div>`, 310, 606, 170, 66, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");

  // Connectors / Adapters
  cell("box_t6_conn", `<div style="text-align:center;"><div style="font-size:8px;font-weight:900;color:#0D9488;">Connectors / Adapters</div><div style="font-size:7px;color:#0F172A;margin-top:4px;">Prebuilt Connectors<br/>Custom Adapters</div></div>`, 486, 606, 180, 66, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");

  // Execution Services
  cell("box_t6_exec", `<div style="text-align:center;"><div style="font-size:8px;font-weight:900;color:#0D9488;">Execution Services</div><div style="display:flex;justify-content:space-around;font-size:7px;color:#0F172A;margin-top:6px;"><span>Function Calling</span><span>Workflow Engine<br/>(Cloud Workflows)</span><span>Job Scheduler<br/>(Cloud Scheduler)</span></div></div>`, 672, 606, 380, 66, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");

  // Integration & Protocols
  cell("box_t6_proto", `<div style="text-align:center;"><div style="font-size:8px;font-weight:900;color:#0D9488;">Integration & Protocols</div><div style="display:flex;flex-wrap:wrap;gap:6px;justify-content:center;font-size:7px;color:#0F172A;margin-top:4px;"><span>MCP</span><span>REST</span><span>SQL</span><span>Events (Pub/Sub)</span><span>gRPC</span><span>SFTP</span><span>Webhooks</span></div></div>`, 1058, 606, 282, 66, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");

  // Tier 6 Horizontal Connectors
  rawEdge("e_t6_mcp_reg", "edgeStyle=none;strokeColor=#0D9488;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 304, y: 639 },
    { x: 310, y: 639 }
  ]);
  rawEdge("e_t6_reg_conn", "edgeStyle=none;strokeColor=#0D9488;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 480, y: 639 },
    { x: 486, y: 639 }
  ]);
  rawEdge("e_t6_conn_exec", "edgeStyle=none;strokeColor=#0D9488;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 666, y: 639 },
    { x: 672, y: 639 }
  ]);
  rawEdge("e_t6_exec_proto", "edgeStyle=none;strokeColor=#0D9488;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 1052, y: 639 },
    { x: 1058, y: 639 }
  ]);

  // ==================== TIER 7: ENTERPRISE SYSTEMS & DATA SOURCES LAYER (y=678..784, h=106) ====================
  tierBadge("7", 678, 106, "#1E40AF");
  tierLabel("7", "ENTERPRISE SYSTEMS<br/>& DATA SOURCES<br/>LAYER", 678, 80);

  // Top Sub-boxes
  // Structured Apps (w=260)
  cell("box_t7_struct", "", 134, 678, 260, 52, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;");
  cell("lbl_t7_struct", "Enterprise Applications (Structured)", 134, 680, 260, 12, "fontColor=#1E40AF;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;");
  const structApps = ["Salesforce (CRM)", "SAP (ERP)", "ServiceNow (ITSM)", "Workday (HR)"];
  structApps.forEach((sa, i) => {
    const sax = 138 + i * 63;
    cell(`sa_${i}`, `<div style="font-size:7px;font-weight:800;color:#0F172A;text-align:center;">${sa}</div>`, sax, 694, 60, 32, "rounded=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=center;verticalAlign=middle;");
  });

  // Unstructured Content (w=250)
  cell("box_t7_unstruct", "", 400, 678, 250, 52, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;");
  cell("lbl_t7_unstruct", "Collaboration & Content (Unstructured)", 400, 680, 250, 12, "fontColor=#1E40AF;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;");
  const unstructApps = ["SharePoint", "Google Drive", "Confluence", "Docs / Wikis"];
  unstructApps.forEach((ua, i) => {
    const uax = 404 + i * 60;
    cell(`ua_${i}`, `<div style="font-size:7px;font-weight:800;color:#0F172A;text-align:center;">${ua}</div>`, uax, 694, 58, 32, "rounded=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=center;verticalAlign=middle;");
  });

  // Databases & Stores (w=330)
  cell("box_t7_dbs", "", 656, 678, 330, 52, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;");
  cell("lbl_t7_dbs", "Databases & Data Stores", 656, 680, 330, 12, "fontColor=#1E40AF;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;");
  const dbsList = ["AlloyDB", "Cloud SQL", "Spanner", "Bigtable"];
  dbsList.forEach((db, i) => {
    const dbx = 662 + i * 80;
    cell(`db_${i}`, `<div style="font-size:7.5px;font-weight:800;color:#0F172A;text-align:center;">${db}</div>`, dbx, 694, 76, 32, "rounded=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=center;verticalAlign=middle;");
  });

  // Analytics & Platform (w=348)
  cell("box_t7_analytics", "", 992, 678, 348, 52, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;");
  cell("lbl_t7_analytics", "Analytics & Data Platform (GCP)", 992, 680, 348, 12, "fontColor=#1E40AF;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;");
  const analyticsList = ["BigQuery", "Dataplex", "Data Catalog", "Looker"];
  analyticsList.forEach((an, i) => {
    const anx = 998 + i * 84;
    cell(`an_${i}`, `<div style="font-size:7.5px;font-weight:800;color:#0F172A;text-align:center;">${an}</div>`, anx, 694, 80, 32, "rounded=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=center;verticalAlign=middle;");
  });

  // Connectors from Tier 6 down into Tier 7
  rawEdge("e_t6_t7_conn1", "edgeStyle=none;strokeColor=#1E40AF;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 576, y: 672 },
    { x: 576, y: 678 }
  ]);
  rawEdge("e_t6_t7_conn2", "edgeStyle=none;strokeColor=#1E40AF;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 862, y: 672 },
    { x: 862, y: 678 }
  ]);
  rawEdge("e_t6_t7_conn3", "edgeStyle=none;strokeColor=#1E40AF;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 1200, y: 672 },
    { x: 1200, y: 678 }
  ]);

  // Bottom Row: Data Types, Platforms, Formats (y=734..780)
  // Data & Content Types (w=380)
  cell("box_t7_types", "", 134, 734, 380, 46, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;");
  cell("lbl_t7_types", "Data & Content Types: Documents (PDF/Word) • Email/Calendar • Chat • Images/Media • Logs • APIs", 134, 736, 380, 42, "fontColor:#0F172A;fontSize=7.5;align=center;verticalAlign=middle;whiteSpace=wrap;");

  // Data Platforms (w=420)
  cell("box_t7_infra", "", 520, 734, 420, 46, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;");
  cell("lbl_t7_infra", "Data Platforms (GCP): Cloud Storage (Object) • Pub/Sub (Streaming) • Dataflow (Batch/Stream) • Datastream (CDC)", 520, 736, 420, 42, "fontColor:#0F172A;fontSize=7.5;align=center;verticalAlign=middle;whiteSpace=wrap;");

  // Data Formats (w=394)
  cell("box_t7_formats", "", 946, 734, 394, 46, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;");
  cell("lbl_t7_formats", "Data Formats: Structured (Transactional) • Unstructured (Docs/Media) • Semi-structured (JSON/XML) • Streaming", 946, 736, 394, 42, "fontColor:#0F172A;fontSize=7.5;align=center;verticalAlign=middle;whiteSpace=wrap;");

  // Up/Down connectors between Tier 7 top & bottom
  rawEdge("e_t7_updown1", "edgeStyle=none;strokeColor=#1E40AF;strokeWidth=1.2;startArrow=classic;endArrow=classic;startSize=3;endSize=3;", [
    { x: 320, y: 730 },
    { x: 320, y: 734 }
  ]);
  rawEdge("e_t7_updown2", "edgeStyle=none;strokeColor=#1E40AF;strokeWidth=1.2;startArrow=classic;endArrow=classic;startSize=3;endSize=3;", [
    { x: 730, y: 730 },
    { x: 730, y: 734 }
  ]);
  rawEdge("e_t7_updown3", "edgeStyle=none;strokeColor=#1E40AF;strokeWidth=1.2;startArrow=classic;endArrow=classic;startSize=3;endSize=3;", [
    { x: 1140, y: 730 },
    { x: 1140, y: 734 }
  ]);

  // Flow Step 10 Badge to Platform Operations Sidebar
  flowBadge("step_10", "10", 1344, 742, "#1E40AF");
  rawEdge("e_data_ops_sb", "edgeStyle=none;strokeColor=#1E40AF;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 1340, y: 752 },
    { x: 1354, y: 752 }
  ]);

  // ==================== TIER 8: NETWORK / SECURITY FOUNDATION (y=790..856, h=66) ====================
  tierBadge("8", 790, 66, "#0F172A");
  tierLabel("8", "NETWORK / SECURITY<br/>FOUNDATION<br/>(Zero-Trust)", 790, 50);

  const secPills = [
    { t: "VPC Network", sub: "Private Subnets", svg: SVG.shield },
    { t: "Private Google Access", sub: "Private Service Connect", svg: SVG.cloud },
    { t: "Cloud NAT", sub: "Egress Control", svg: SVG.globe },
    { t: "Firewall Rules", sub: "Least Privilege", svg: SVG.shield },
    { t: "Encryption in Transit", sub: "(TLS 1.2+)", svg: SVG.lock },
    { t: "Encryption at Rest", sub: "(CMEK / KMS)", svg: SVG.key },
    { t: "Secret Manager", sub: "Secrets, Keys, Certs", svg: SVG.lock },
    { t: "Identity-Aware Proxy", sub: "Zero-Trust Access", svg: SVG.user },
    { t: "Multi-Region & DR", sub: "Failover • Durability", svg: SVG.globe }
  ];
  secPills.forEach((sp, i) => {
    const spx = 134 + i * 134;
    cell(`sec_${i}`, `<div style="text-align:center;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0F172A" stroke-width="2">${sp.svg}</svg><div style="font-size:8px;font-weight:900;color:#0F172A;margin-top:2px;">${sp.t}</div><div style="font-size:7px;color:#64748B;font-weight:600;">${sp.sub}</div></div>`, spx, 790, 130, 66, "rounded=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // Horizontal connectors between security foundation pods
  for (let i = 0; i < 8; i++) {
    const startX = 264 + i * 134;
    const endX = startX + 4;
    rawEdge(`e_sec_${i}`, "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;startArrow=classic;endArrow=classic;startSize=3;endSize=3;", [
      { x: startX, y: 823 },
      { x: endX, y: 823 }
    ]);
  }

  // ==================== RIGHT SIDEBAR (x=1354..1584, y=54..856) ====================
  // 8) GOVERNANCE / HITL / COMPLIANCE (y=54..320, h=266)
  cell("sb_gov_box", "", 1354, 54, 230, 266, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.5;");
  cell("sb_gov_badge", "8", 1358, 58, 22, 22, "shape=ellipse;fillColor=#7C3AED;strokeColor=#7C3AED;fontColor=#FFFFFF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  cell("sb_gov_title", "GOVERNANCE / HITL / COMPLIANCE", 1384, 58, 194, 22, "fontColor:#6D28D9;fontSize=8.5;fontStyle=1;align=left;verticalAlign=middle;");

  const govSidebar = [
    { t: "Human Approval Queue", sub: "Review Console / Escalation", svg: SVG.users },
    { t: "Prompt & Policy Governance", sub: "Policies, Guardrails, Standards", svg: SVG.clipboard },
    { t: "Audit Trail & Evidence Logging", sub: "Immutable Logs, Traceability", svg: SVG.clipboard },
    { t: "PII / DLP Checks", sub: "Detection, Masking, Redaction", svg: SVG.eye },
    { t: "Responsible AI", sub: "Red Teaming, Bias, Safety Content", svg: SVG.brain },
    { t: "Compliance Controls", sub: "HIPAA • GDPR • SOC2 • ISO 27001", svg: SVG.shield }
  ];
  govSidebar.forEach((gs, i) => {
    const gsy = 82 + i * 38;
    cell(`gs_${i}`, `<div style="display:flex;align-items:center;gap:6px;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" stroke-width="2">${gs.svg}</svg><div><div style="font-size:8px;font-weight:900;color:#0F172A;">${gs.t}</div><div style="font-size:7px;color:#64748B;font-weight:600;">${gs.sub}</div></div></div>`, 1360, gsy, 218, 34, "rounded=1;fillColor=#FAF5FF;strokeColor=#E9D5FF;strokeWidth=1.2;html=1;align=left;verticalAlign=middle;padding=3;");
  });

  // OBSERVABILITY / EVALUATION / FINOPS (y=328..578, h=250)
  cell("sb_obs_box", "", 1354, 328, 230, 250, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.5;");
  cell("sb_obs_badge", "6", 1358, 332, 22, 22, "shape=ellipse;fillColor=#0284C7;strokeColor=#0284C7;fontColor=#FFFFFF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  cell("sb_obs_title", "OBSERVABILITY / EVALUATION / FINOPS", 1384, 332, 194, 22, "fontColor=#0284C7;fontSize=8.5;fontStyle=1;align=left;verticalAlign=middle;");

  const obsSidebar = [
    { t: "Logs, Metrics, Traces", sub: "Cloud Logging • Monitoring • Trace", svg: SVG.chart },
    { t: "Model Monitoring", sub: "Latency, Errors, Drift, Quality", svg: SVG.clock },
    { t: "Agent & Prompt Evaluation", sub: "Quality Scoring, Groundedness", svg: SVG.target },
    { t: "Feedback Loop", sub: "User Feedback, Reinforcement", svg: SVG.repeat },
    { t: "Cost & Token Tracking", sub: "Spend, Token Usage, Allocation", svg: SVG.chart },
    { t: "SLOs / Alerts / Dashboards", sub: "Uptime, Latency, Errors, Cost", svg: SVG.alert }
  ];
  obsSidebar.forEach((os, i) => {
    const osy = 354 + i * 36;
    cell(`os_${i}`, `<div style="display:flex;align-items:center;gap:6px;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0284C7" stroke-width="2">${os.svg}</svg><div><div style="font-size:8px;font-weight:900;color:#0F172A;">${os.t}</div><div style="font-size:7px;color:#64748B;font-weight:600;">${os.sub}</div></div></div>`, 1360, osy, 218, 32, "rounded=1;fillColor=#F0F9FF;strokeColor=#BAE6FD;strokeWidth=1.2;html=1;align=left;verticalAlign=middle;padding=3;");
  });

  // PLATFORM OPERATIONS / DELIVERY (y=586..856, h=270)
  cell("sb_ops_box", "", 1354, 586, 230, 270, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#1E40AF;strokeWidth=1.5;");
  cell("sb_ops_badge", "10", 1358, 590, 22, 22, "shape=ellipse;fillColor=#1E40AF;strokeColor=#1E40AF;fontColor=#FFFFFF;fontSize=10;fontStyle=1;align=center;verticalAlign=middle;");
  cell("sb_ops_title", "PLATFORM OPERATIONS / DELIVERY", 1384, 590, 194, 22, "fontColor=#1E40AF;fontSize=8.5;fontStyle=1;align=left;verticalAlign=middle;");

  const opsSidebar = [
    { t: "CI/CD / GitOps", sub: "Cloud Build • Cloud Deploy • ArgoCD", svg: SVG.gear },
    { t: "Prompt Management", sub: "Templates, Versioning, A/B Test", svg: SVG.clipboard },
    { t: "Model Registry & Pipeline", sub: "Build, Test, Deploy, Monitor", svg: SVG.brain },
    { t: "Runtime & Compute", sub: "GKE • Cloud Run • Cloud Functions", svg: SVG.server },
    { t: "Artifacts & Secrets", sub: "Artifact Registry • Secret Manager • KMS", svg: SVG.lock }
  ];
  opsSidebar.forEach((op, i) => {
    const opy = 614 + i * 46;
    cell(`op_${i}`, `<div style="display:flex;align-items:center;gap:6px;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1E40AF" stroke-width="2">${op.svg}</svg><div><div style="font-size:8px;font-weight:900;color:#0F172A;">${op.t}</div><div style="font-size:7px;color:#64748B;font-weight:600;">${op.sub}</div></div></div>`, 1360, opy, 218, 40, "rounded=1;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.2;html=1;align=left;verticalAlign=middle;padding=3;");
  });

  // ==================== BOTTOM FOOTER FLOW & LEGEND (y=866..940) ====================
  // Left: Legend
  cell("box_ftr_legend", "", 16, 866, 260, 74, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;html=1;");
  cell("lbl_ftr_legend", "LEGEND (Arrow Types)", 16, 868, 260, 14, "fontColor:#0F172A;fontSize=8;fontStyle=1;align=center;verticalAlign=middle;");
  const legendArrows = [
    { t: "User Interaction", col: "#0F172A", dash: "" },
    { t: "Agent-to-Agent (A2A)", col: "#7C3AED", dash: "" },
    { t: "Data Flow", col: "#2563EB", dash: "" },
    { t: "Control / Policy", col: "#EA580C", dash: "" },
    { t: "Async Events / Streaming", col: "#0D9488", dash: "dashed" }
  ];
  legendArrows.forEach((la, i) => {
    const lax = 22 + (i % 2) * 126;
    const lay = 884 + Math.floor(i / 2) * 16;
    cell(`la_${i}`, `<div style="display:flex;align-items:center;gap:4px;"><div style="width:14px;height:3px;background:${la.col};"></div><span style="font-size:7.5px;font-weight:800;color:#0F172A;">${la.t}</span></div>`, lax, lay, 120, 14, "whiteSpace=wrap;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  });

  // Center: End-to-End Flow Example
  cell("box_ftr_flow", "", 284, 866, 960, 74, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.5;html=1;");
  cell("lbl_ftr_flow", "END-TO-END FLOW (Example)", 284, 868, 960, 14, "fontColor:#1E3A8A;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");
  const flowSteps = [
    { n: "1", t: "User Query", sub: "User submits request via any channel" },
    { n: "2", t: "Orchestration", sub: "Supervisor plans & delegates to specialist agents" },
    { n: "3", t: "Retrieve & Tool Use", sub: "Agents retrieve context and use tools / APIs" },
    { n: "4", t: "Model Inference", sub: "Models generate grounded responses" },
    { n: "5", t: "Human Approval (if needed)", sub: "Review & approval for sensitive actions" },
    { n: "6", t: "Response & Learn", sub: "Deliver response & capture feedback" }
  ];
  flowSteps.forEach((fs, i) => {
    const fsx = 292 + i * 158;
    cell(`fs_${i}`, `<div style="display:flex;align-items:center;gap:4px;"><div style="width:18px;height:18px;border-radius:50%;background:#1D4ED8;color:#FFFFFF;font-size:9px;font-weight:900;display:flex;align-items:center;justify-content:center;flex-shrink:0;">${fs.n}</div><div><div style="font-size:7.5px;font-weight:900;color:#0F172A;">${fs.t}</div><div style="font-size:7px;color:#64748B;line-height:1.1;font-weight:600;">${fs.sub}</div></div></div>`, fsx, 884, 152, 50, "rounded=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;html=1;align=left;verticalAlign=middle;padding=2;");
  });

  // Right: Google Cloud Brand
  const brandHtml = `<div style="display:flex;align-items:center;justify-content:center;gap:8px;">` +
    `<svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" fill="#4285F4"/></svg>` +
    `<div style="font-size:22px;font-weight:900;color:#374151;letter-spacing:-0.5px;">Google Cloud</div>` +
    `</div>`;
  cell("ftr_brand_gcp", brandHtml, 1252, 866, 332, 74, "whiteSpace=wrap;overflow=hidden;text;html=1;strokeColor=#CBD5E1;strokeWidth=1.2;fillColor=#FFFFFF;rounded=1;align=center;verticalAlign=middle;padding=4;");

  const bg = isDark ? "#0F172A" : "#FFFFFF";

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_40_enterprise_genai_platform" name="40. Enterprise GenAI &amp; Multi-Agent Platform">
    <mxGraphModel dx="1600" dy="1180" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="1180" background="${bg}" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${c.join("\n        ")}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
