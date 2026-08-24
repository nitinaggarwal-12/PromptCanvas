/**
 * Master 1:1 High-Craft Exact Ground-Truth Replica for Template 45: Enterprise API, Integration & MCP Gateway
 * Matches 100% of images/45.png:
 * - Top Header: "45" Badge, "45. Enterprise API, Integration & MCP Gateway", Subtitle, Enterprise Cloud (Connect • Integrate • Accelerate)
 * - Far Left Sidebar:
 *   - INTEGRATION PATTERNS: REST, GraphQL, gRPC, Webhooks, EDI/B2B, MCP (Tools), Event-Driven
 *   - FLOW LEGEND: API/Data Flow, Control/Policy Flow, Event/Message Flow, Agent/Tool Flow
 * - Center Main Column (Tiers 1, 2, 3, 4, 5, 6, 7, 8, 10):
 *   1) CONSUMER & CHANNEL LAYER (Business Apps, Mobile Apps, Partner Apps, Web Portals, Developer Clients, AI Agents, External Consumers)
 *   2) API EXPERIENCE & ACCESS LAYER (API Portal, Developer Portal, API Products, API Keys & Subscriptions, OAuth 2.0/OIDC, SSO, Rate Limiting, Monetization, Versioning)
 *   3) GATEWAY & TRAFFIC MANAGEMENT LAYER (API Gateway, Ingress Controller, Load Balancing, WAF, Service Mesh Ingress, Routing, Throttling, Caching, Request Transformation)
 *   4) INTEGRATION & MEDIATION LAYER (ESB/Integration, iPaaS Connectors, Workflow Orchestration, Event Routing, Protocol Transformation, Schema Mediation, B2B/EDI)
 *   5) MCP & TOOL EXPOSURE LAYER (MCP Gateway, Tool Registry, Tool Discovery, Agent-Safe Wrappers, Function Adapters, Policy Access, A2A Integration)
 *   6) MESSAGING & EVENT BACKBONE LAYER (Event Bus/Pub/Sub, Streaming, Queues, CDC Ingestion, Webhooks Gateway, Async Messaging, DLQ, Replay)
 *   7) ENTERPRISE SYSTEMS & SAAS LAYER (CRM, ERP, HR, ITSM, Data Warehouse, Databases, Legacy Apps, Partner Systems, Object Storage, Collaboration)
 *   8) SECURITY & GOVERNANCE LAYER (Zero Trust, IAM & SSO, RBAC/ABAC, Secrets Mgmt, PEP, DLP Engine, Audit Logging, Data Classification, Governance, Compliance)
 *   10) FOUNDATIONAL PLATFORM LAYER (Compute, Containers, Serverless, Networking, Private Connectivity, Encryption, KMS, HA, Backup & DR, Resilience + Global Infra bar)
 * - Right Column:
 *   9) OBSERVABILITY & OPERATIONS (Logs, Traces, Metrics, API Analytics, SLA/SLO, Dashboards, Error Tracking, Incident Response, Cost Monitoring, Capacity Planning)
 *   - OPERATIONS & DELIVERY (CI/CD Pipelines, GitOps, API Lifecycle Mgmt, Runtime Operations, Change Management)
 * - Bottom Row Panels:
 *   - END-TO-END FLOWS (Steps 1..5)
 *   - KEY INTERACTIONS (Mini-architecture interactive flow diagram)
 *   - ARCHITECTURE PRINCIPLES (6 principle cards)
 *   - OUTCOMES (6 green-check enterprise outcomes)
 * - 1600x1100 master canvas resolution.
 */

const E = (v?: string | null) =>
  (v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const SVG = {
  api: `<path d="m15 5 4 4-4 4"/><path d="M9 19l-4-4 4-4"/><path d="m14 9-4 6"/>`,
  shield: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`,
  shieldCheck: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>`,
  lock: `<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>`,
  key: `<circle cx="8" cy="8" r="4"/><path d="m11 11 9 9M18 14l2 2M15 17l2 2"/>`,
  user: `<circle cx="12" cy="7" r="4"/><path d="M5.5 21a8.5 8.5 0 0 1 13 0"/>`,
  users: `<circle cx="9" cy="7" r="3.5"/><path d="M3 20a6 6 0 0 1 12 0"/><circle cx="16.5" cy="8.5" r="2.5"/><path d="M15 20a5 5 0 0 1 6 0"/>`,
  server: `<rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>`,
  database: `<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>`,
  cloud: `<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>`,
  network: `<rect width="6" height="6" x="9" y="2" rx="1"/><rect width="6" height="6" x="2" y="16" rx="1"/><rect width="6" height="6" x="16" y="16" rx="1"/><path d="M5 16v-4h14v4"/><path d="M12 8v8"/>`,
  activity: `<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>`,
  chart: `<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>`,
  search: `<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>`,
  sparkles: `<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>`,
  folder: `<path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/>`,
  fileCode: `<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="m10 13-2 2 2 2"/><path d="m14 17 2-2-2-2"/>`,
  layers: `<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>`,
  settings: `<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>`,
  repeat: `<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>`,
  smartphone: `<rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>`,
  monitor: `<rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>`,
  cpu: `<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>`,
  bot: `<rect width="18" height="14" x="3" y="6" rx="2"/><path d="M12 2v4"/><circle cx="8.5" cy="11.5" r="1.5"/><circle cx="15.5" cy="11.5" r="1.5"/><path d="M9 16h6"/>`,
  dollarSign: `<line x1="12" y1="2" x2="12" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>`,
  checkCircle: `<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>`,
  zap: `<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>`,
  globe: `<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z"/>`
};

const svgIcon = (iconName: keyof typeof SVG, strokeColor = "#1D4ED8", size = 16) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${strokeColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${SVG[iconName] || SVG.shield}</svg>`;

export function generateTemplate45EnterpriseApiIntegrationMcpGatewayXml(
  domainFlavor = "api_mcp_gateway",
  theme: "light" | "dark" = "light"
): string {
  const c: string[] = [];

  const cell = (id: string, v: string, x: number, y: number, w: number, h: number, style: string) =>
    c.push(
      `<mxCell id="${id}" value="${E(v)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`
    );

  const rawEdge = (id: string, style: string, pts: { x: number; y: number }[]) => {
    let ptsXml = "";
    if (pts.length > 2) {
      ptsXml = `<Array as="points">${pts.slice(1, -1).map((p) => `<mxPoint x="${p.x}" y="${p.y}"/>`).join("")}</Array>`;
    }
    c.push(
      `<mxCell id="${id}" edge="1" parent="1" style="${style}"><mxGeometry relative="1" as="geometry"><mxPoint x="${pts[0].x}" y="${pts[0].y}" as="sourcePoint"/><mxPoint x="${pts[pts.length - 1].x}" y="${pts[pts.length - 1].y}" as="targetPoint"/>${ptsXml}</mxGeometry></mxCell>`
    );
  };

  // =========================================================================
  // 1. TOP HEADER BANNER (y: 10..58)
  // =========================================================================
  cell("hdr_num", "45", 16, 10, 54, 46, "shape=rectangle;rounded=1;arcSize=14;fillColor=#1D4ED8;strokeColor=#1D4ED8;fontColor=#FFFFFF;fontSize=26;fontStyle=1;align=center;verticalAlign=middle;");

  const titleHtml = `<div style="font-size:18px;font-weight:900;color:#0F172A;letter-spacing:0.5px;">45. Enterprise API, Integration &amp; MCP Gateway</div>
    <div style="font-size:10px;color:#475569;font-weight:600;margin-top:2px;">Unified API management, event integration, SaaS connectivity, agent/tool exposure, and policy enforcement</div>`;
  cell("hdr_title", titleHtml, 78, 10, 850, 46, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  const brandHtml = `<div style="display:flex;align-items:center;justify-content:flex-end;gap:8px;">
    <div style="text-align:right;">
      <div style="font-size:15px;font-weight:900;color:#1D4ED8;letter-spacing:0.5px;display:flex;align-items:center;justify-content:flex-end;gap:6px;">
        ${svgIcon("cloud", "#1D4ED8", 18)} Enterprise Cloud
      </div>
      <div style="font-size:9px;color:#64748B;font-weight:600;margin-top:2px;">Connect • Integrate • Accelerate</div>
    </div>
  </div>`;
  cell("hdr_brand", brandHtml, 1280, 10, 304, 46, "text;html=1;strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

  // =========================================================================
  // 2. FAR LEFT SIDEBAR: INTEGRATION PATTERNS & FLOW LEGEND (x: 16..170, w: 154)
  // =========================================================================
  // Header: INTEGRATION PATTERNS
  cell("pat_hdr", "INTEGRATION PATTERNS", 16, 64, 154, 22, "rounded=1;arcSize=4;fillColor=#1D4ED8;fontColor=#FFFFFF;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");

  const patterns = [
    { title: "REST", bullets: ["Resource based", "Stateless", "JSON/HTTP"], icon: "globe", color: "#1D4ED8" },
    { title: "GraphQL", bullets: ["Single endpoint", "Flexible queries", "Strong typing"], icon: "sparkles", color: "#7C3AED" },
    { title: "gRPC", bullets: ["High performance", "Contract first", "Bi-directional"], icon: "activity", color: "#0284C7" },
    { title: "Webhooks", bullets: ["Event callbacks", "Real-time notify", "HTTPS secure"], icon: "repeat", color: "#D97706" },
    { title: "EDI / B2B", bullets: ["AS2 / SFTP", "X12 / EDIFACT", "Trading partners"], icon: "folder", color: "#EA580C" },
    { title: "MCP (Tools)", bullets: ["Tool exposure", "Agent-safe", "Policy governed"], icon: "bot", color: "#6D28D9" },
    { title: "Event-Driven", bullets: ["Pub/Sub", "Async messaging", "Loose coupling"], icon: "zap", color: "#16A34A" }
  ];

  patterns.forEach((p, idx) => {
    const py = 90 + idx * 56;
    const pHtml = `<div style="padding:2px 4px;">
      <div style="display:flex;align-items:center;gap:4px;margin-bottom:2px;">
        ${svgIcon(p.icon as keyof typeof SVG, p.color, 12)}
        <b style="font-size:8px;color:${p.color};">${p.title}</b>
      </div>
      <div style="font-size:6.5px;color:#475569;line-height:1.15;padding-left:4px;">
        ${p.bullets.map((b) => `• ${b}`).join("<br/>")}
      </div>
    </div>`;
    cell(`pat_${idx}`, pHtml, 16, py, 154, 52, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;html=1;align=left;verticalAlign=top;");
  });

  // FLOW LEGEND (y: 486..610)
  cell("fl_box", "", 16, 486, 154, 126, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("fl_hdr", "<b style=\"font-size:8px;color:#0F172A;\">FLOW LEGEND</b>", 16, 488, 154, 16, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  const flHtml = `<div style="padding:2px 8px;font-size:7px;color:#0F172A;line-height:1.2;">
    <div style="margin-bottom:6px;">
      <span style="color:#1D4ED8;font-weight:900;">━━━►</span><br/>
      <span style="font-weight:700;">API / Data Flow</span><br/>
      <span style="color:#64748B;font-size:6px;">(Synchronous)</span>
    </div>
    <div style="margin-bottom:6px;">
      <span style="color:#16A34A;font-weight:900;">- - -►</span><br/>
      <span style="font-weight:700;">Control / Policy Flow</span>
    </div>
    <div style="margin-bottom:6px;">
      <span style="color:#EA580C;font-weight:900;">- - -►</span><br/>
      <span style="font-weight:700;">Event / Message Flow</span><br/>
      <span style="color:#64748B;font-size:6px;">(Asynchronous)</span>
    </div>
    <div>
      <span style="color:#7C3AED;font-weight:900;">- - -►</span><br/>
      <span style="font-weight:700;">Agent / Tool Flow</span>
    </div>
  </div>`;
  cell("fl_content", flHtml, 16, 504, 154, 106, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  // =========================================================================
  // 3. CENTER COLUMN: TIERS 1..8, 10 (x: 178..1246, w: 1068)
  // =========================================================================

  // --- TIER 1: CONSUMER & CHANNEL LAYER (y: 64..118, h: 54) ---
  cell("t1_frame", "", 178, 64, 1068, 54, "rounded=1;arcSize=2;fillColor=#FFFFFF;strokeColor=#1D4ED8;strokeWidth=1.2;");
  cell("t1_badge", "1", 184, 70, 20, 20, "rounded=1;arcSize=4;fillColor=#1D4ED8;fontColor=#FFFFFF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t1_lbl", "<b style=\"font-size:8px;color:#1D4ED8;\">CONSUMER &amp;<br/>CHANNEL LAYER</b>", 208, 68, 100, 24, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  const t1Consumers = [
    { t: "Business Apps", icon: "monitor" },
    { t: "Mobile Apps", icon: "smartphone" },
    { t: "Partner Apps", icon: "users" },
    { t: "Web Portals", icon: "globe" },
    { t: "Developer Clients", icon: "fileCode" },
    { t: "AI Agents", icon: "bot" },
    { t: "External Consumers", icon: "users" }
  ];
  t1Consumers.forEach((cItem, idx) => {
    const cx = 316 + idx * 132;
    const html = `<div style="text-align:center;padding:2px;">
      <div style="display:flex;justify-content:center;margin-bottom:2px;">${svgIcon(cItem.icon as keyof typeof SVG, "#1D4ED8", 14)}</div>
      <div style="font-size:7px;font-weight:700;color:#0F172A;">${cItem.t}</div>
    </div>`;
    cell(`t1_c_${idx}`, html, cx, 68, 126, 46, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  });

  // --- TIER 2: API EXPERIENCE & ACCESS LAYER (y: 122..176, h: 54) ---
  cell("t2_frame", "", 178, 122, 1068, 54, "rounded=1;arcSize=2;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;");
  cell("t2_badge", "2", 184, 128, 20, 20, "rounded=1;arcSize=4;fillColor=#2563EB;fontColor=#FFFFFF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t2_lbl", "<b style=\"font-size:8px;color:#2563EB;\">API EXPERIENCE &amp;<br/>ACCESS LAYER</b>", 208, 126, 100, 24, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  const t2Access = [
    { t: "API Portal", icon: "monitor" },
    { t: "Developer<br/>Portal", icon: "fileCode" },
    { t: "API<br/>Products", icon: "folder" },
    { t: "API Keys &amp;<br/>Subscriptions", icon: "key" },
    { t: "OAuth 2.0 /<br/>OIDC", icon: "lock" },
    { t: "SSO", icon: "shieldCheck" },
    { t: "Rate Limiting<br/>&amp; Quotas", icon: "settings" },
    { t: "Monetization<br/>&amp; Billing", icon: "dollarSign" },
    { t: "Versioning<br/>&amp; Lifecycle", icon: "repeat" }
  ];
  t2Access.forEach((it, idx) => {
    const ax = 316 + idx * 103;
    const html = `<div style="text-align:center;padding:2px;">
      <div style="display:flex;justify-content:center;margin-bottom:1px;">${svgIcon(it.icon as keyof typeof SVG, "#2563EB", 12)}</div>
      <div style="font-size:6.5px;font-weight:700;color:#0F172A;line-height:1.1;">${it.t}</div>
    </div>`;
    cell(`t2_a_${idx}`, html, ax, 126, 98, 46, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  });

  // --- TIER 3: GATEWAY & TRAFFIC MANAGEMENT LAYER (y: 180..234, h: 54) ---
  cell("t3_frame", "", 178, 180, 1068, 54, "rounded=1;arcSize=2;fillColor=#FFFFFF;strokeColor=#1E40AF;strokeWidth=1.2;");
  cell("t3_badge", "3", 184, 186, 20, 20, "rounded=1;arcSize=4;fillColor=#1E40AF;fontColor=#FFFFFF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t3_lbl", "<b style=\"font-size:8px;color:#1E40AF;\">GATEWAY &amp; TRAFFIC<br/>MANAGEMENT LAYER</b>", 208, 184, 100, 24, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  const t3Gateway = [
    { t: "API Gateway", icon: "api" },
    { t: "Ingress<br/>Controller", icon: "network" },
    { t: "Load<br/>Balancing", icon: "repeat" },
    { t: "WAF", icon: "shield" },
    { t: "Service Mesh<br/>Ingress", icon: "layers" },
    { t: "Routing", icon: "network" },
    { t: "Throttling /<br/>Rate Limit", icon: "settings" },
    { t: "Caching", icon: "database" },
    { t: "Request<br/>Transformation", icon: "fileCode" }
  ];
  t3Gateway.forEach((it, idx) => {
    const gx = 316 + idx * 103;
    const html = `<div style="text-align:center;padding:2px;">
      <div style="display:flex;justify-content:center;margin-bottom:1px;">${svgIcon(it.icon as keyof typeof SVG, "#1E40AF", 12)}</div>
      <div style="font-size:6.5px;font-weight:700;color:#0F172A;line-height:1.1;">${it.t}</div>
    </div>`;
    cell(`t3_g_${idx}`, html, gx, 184, 98, 46, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  });

  // --- TIER 4: INTEGRATION & MEDIATION LAYER (y: 238..292, h: 54) ---
  cell("t4_frame", "", 178, 238, 1068, 54, "rounded=1;arcSize=2;fillColor=#FFFFFF;strokeColor=#0D9488;strokeWidth=1.2;");
  cell("t4_badge", "4", 184, 244, 20, 20, "rounded=1;arcSize=4;fillColor=#0D9488;fontColor=#FFFFFF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t4_lbl", "<b style=\"font-size:8px;color:#0D9488;\">INTEGRATION &amp;<br/>MEDIATION LAYER</b>", 208, 242, 100, 24, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  const t4Mediation = [
    { t: "ESB / Integration<br/>Services", icon: "network" },
    { t: "iPaaS<br/>Connectors", icon: "repeat" },
    { t: "Workflow<br/>Orchestration", icon: "settings" },
    { t: "Event<br/>Routing", icon: "zap" },
    { t: "Protocol<br/>Transformation", icon: "repeat" },
    { t: "Schema<br/>Mediation", icon: "fileCode" },
    { t: "B2B / EDI<br/>Integration", icon: "folder" }
  ];
  t4Mediation.forEach((it, idx) => {
    const mx = 316 + idx * 132;
    const html = `<div style="text-align:center;padding:2px;">
      <div style="display:flex;justify-content:center;margin-bottom:1px;">${svgIcon(it.icon as keyof typeof SVG, "#0D9488", 12)}</div>
      <div style="font-size:6.5px;font-weight:700;color:#0F172A;line-height:1.1;">${it.t}</div>
    </div>`;
    cell(`t4_m_${idx}`, html, mx, 242, 126, 46, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  });

  // --- TIER 5: MCP & TOOL EXPOSURE LAYER (y: 296..350, h: 54) ---
  cell("t5_frame", "", 178, 296, 1068, 54, "rounded=1;arcSize=2;fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.2;");
  cell("t5_badge", "5", 184, 302, 20, 20, "rounded=1;arcSize=4;fillColor=#7C3AED;fontColor=#FFFFFF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t5_lbl", "<b style=\"font-size:8px;color:#7C3AED;\">MCP &amp; TOOL<br/>EXPOSURE LAYER</b>", 208, 300, 100, 24, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  const t5Mcp = [
    { t: "MCP Gateway", icon: "bot" },
    { t: "Tool<br/>Registry", icon: "database" },
    { t: "Tool<br/>Discovery", icon: "search" },
    { t: "Agent-Safe<br/>Tool Wrappers", icon: "shieldCheck" },
    { t: "Function<br/>Adapters", icon: "fileCode" },
    { t: "Policy-Based<br/>Tool Access", icon: "lock" },
    { t: "A2A / Agent<br/>Integration", icon: "network" }
  ];
  t5Mcp.forEach((it, idx) => {
    const tx = 316 + idx * 132;
    const html = `<div style="text-align:center;padding:2px;">
      <div style="display:flex;justify-content:center;margin-bottom:1px;">${svgIcon(it.icon as keyof typeof SVG, "#7C3AED", 12)}</div>
      <div style="font-size:6.5px;font-weight:700;color:#0F172A;line-height:1.1;">${it.t}</div>
    </div>`;
    cell(`t5_t_${idx}`, html, tx, 300, 126, 46, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  });

  // --- TIER 6: MESSAGING & EVENT BACKBONE LAYER (y: 354..408, h: 54) ---
  cell("t6_frame", "", 178, 354, 1068, 54, "rounded=1;arcSize=2;fillColor=#FFFFFF;strokeColor=#EA580C;strokeWidth=1.2;");
  cell("t6_badge", "6", 184, 360, 20, 20, "rounded=1;arcSize=4;fillColor=#EA580C;fontColor=#FFFFFF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t6_lbl", "<b style=\"font-size:8px;color:#EA580C;\">MESSAGING &amp; EVENT<br/>BACKBONE LAYER</b>", 208, 358, 100, 24, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  const t6Messaging = [
    { t: "Event Bus /<br/>Pub/Sub", icon: "zap" },
    { t: "Streaming<br/>(Kafka / Pulsar)", icon: "activity" },
    { t: "Queues<br/>(SQS / MQ)", icon: "layers" },
    { t: "CDC<br/>Ingestion", icon: "database" },
    { t: "Webhooks<br/>Gateway", icon: "repeat" },
    { t: "Async<br/>Messaging", icon: "network" },
    { t: "DLQ<br/>(Dead Letter)", icon: "shieldAlert" },
    { t: "Replay &amp;<br/>Reprocessing", icon: "repeat" }
  ];
  t6Messaging.forEach((it, idx) => {
    const ex = 316 + idx * 116;
    const html = `<div style="text-align:center;padding:2px;">
      <div style="display:flex;justify-content:center;margin-bottom:1px;">${svgIcon(it.icon as keyof typeof SVG, "#EA580C", 12)}</div>
      <div style="font-size:6.5px;font-weight:700;color:#0F172A;line-height:1.1;">${it.t}</div>
    </div>`;
    cell(`t6_e_${idx}`, html, ex, 358, 110, 46, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  });

  // --- TIER 7: ENTERPRISE SYSTEMS & SAAS LAYER (y: 412..466, h: 54) ---
  cell("t7_frame", "", 178, 412, 1068, 54, "rounded=1;arcSize=2;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;");
  cell("t7_badge", "7", 184, 418, 20, 20, "rounded=1;arcSize=4;fillColor=#16A34A;fontColor=#FFFFFF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t7_lbl", "<b style=\"font-size:8px;color:#16A34A;\">ENTERPRISE SYSTEMS<br/>&amp; SAAS LAYER</b>", 208, 416, 100, 24, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  const t7Systems = [
    { t: "CRM<br/>(Salesforce)", icon: "cloud" },
    { t: "ERP<br/>(SAP / Oracle)", icon: "database" },
    { t: "HR<br/>(Workday)", icon: "users" },
    { t: "ITSM<br/>(ServiceNow)", icon: "settings" },
    { t: "Data Warehouse<br/>(Snowflake)", icon: "database" },
    { t: "Databases<br/>(OLTP / OLAP)", icon: "server" },
    { t: "Legacy<br/>Applications", icon: "layers" },
    { t: "Partner<br/>Systems", icon: "users" },
    { t: "File / Object<br/>Storage (S3)", icon: "folder" },
    { t: "Collaboration<br/>(M365 / G Suite)", icon: "monitor" }
  ];
  t7Systems.forEach((it, idx) => {
    const sx = 316 + idx * 93;
    const html = `<div style="text-align:center;padding:2px;">
      <div style="display:flex;justify-content:center;margin-bottom:1px;">${svgIcon(it.icon as keyof typeof SVG, "#16A34A", 12)}</div>
      <div style="font-size:6px;font-weight:700;color:#0F172A;line-height:1.1;">${it.t}</div>
    </div>`;
    cell(`t7_s_${idx}`, html, sx, 416, 88, 46, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  });

  // --- TIER 8: SECURITY & GOVERNANCE LAYER (y: 470..524, h: 54) ---
  cell("t8_frame", "", 178, 470, 1068, 54, "rounded=1;arcSize=2;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.2;");
  cell("t8_badge", "8", 184, 476, 20, 20, "rounded=1;arcSize=4;fillColor=#D97706;fontColor=#FFFFFF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t8_lbl", "<b style=\"font-size:8px;color:#D97706;\">SECURITY &amp;<br/>GOVERNANCE LAYER</b>", 208, 474, 100, 24, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  const t8Security = [
    { t: "Zero Trust<br/>Architecture", icon: "shield" },
    { t: "IAM &amp; SSO<br/>(IdP)", icon: "key" },
    { t: "RBAC / ABAC<br/>Authorization", icon: "lock" },
    { t: "Secrets<br/>Management", icon: "key" },
    { t: "Policy Enforce<br/>Point (PEP)", icon: "shieldCheck" },
    { t: "DLP<br/>Engine", icon: "shieldAlert" },
    { t: "Audit Logging &amp;<br/>Event Audit", icon: "fileCode" },
    { t: "Data<br/>Classification", icon: "folder" },
    { t: "Governance<br/>Approvals", icon: "checkCircle" },
    { t: "Compliance<br/>(GDPR, SOC2)", icon: "shield" }
  ];
  t8Security.forEach((it, idx) => {
    const gx = 316 + idx * 93;
    const html = `<div style="text-align:center;padding:2px;">
      <div style="display:flex;justify-content:center;margin-bottom:1px;">${svgIcon(it.icon as keyof typeof SVG, "#D97706", 12)}</div>
      <div style="font-size:6px;font-weight:700;color:#0F172A;line-height:1.1;">${it.t}</div>
    </div>`;
    cell(`t8_sec_${idx}`, html, gx, 474, 88, 46, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  });

  // --- TIER 10: FOUNDATIONAL PLATFORM LAYER (y: 528..610, h: 82) ---
  cell("t10_frame", "", 178, 528, 1068, 82, "rounded=1;arcSize=2;fillColor=#FFFFFF;strokeColor=#1E3A8A;strokeWidth=1.2;");
  cell("t10_badge", "10", 184, 534, 20, 20, "rounded=1;arcSize=4;fillColor=#1E3A8A;fontColor=#FFFFFF;fontSize=10;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t10_lbl", "<b style=\"font-size:7.5px;color:#1E3A8A;\">FOUNDATIONAL<br/>PLATFORM LAYER</b>", 208, 532, 100, 24, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  const t10Infra = [
    { t: "Compute<br/>(VMs)", icon: "server" },
    { t: "Containers<br/>(Kubernetes)", icon: "layers" },
    { t: "Serverless<br/>(Functions)", icon: "cloud" },
    { t: "Networking<br/>(VPC / SDN)", icon: "network" },
    { t: "Private Connect<br/>(Direct Connect)", icon: "network" },
    { t: "Encryption<br/>(In-Transit/Rest)", icon: "lock" },
    { t: "Key Mgmt<br/>(KMS / HSM)", icon: "key" },
    { t: "High Availability<br/>(Multi-Region)", icon: "globe" },
    { t: "Backup &amp; DR<br/>(Restore)", icon: "database" },
    { t: "Resilience<br/>(Failover / DR)", icon: "repeat" }
  ];
  t10Infra.forEach((it, idx) => {
    const fx = 316 + idx * 93;
    const html = `<div style="text-align:center;padding:2px;">
      <div style="display:flex;justify-content:center;margin-bottom:1px;">${svgIcon(it.icon as keyof typeof SVG, "#1E3A8A", 12)}</div>
      <div style="font-size:6px;font-weight:700;color:#0F172A;line-height:1.1;">${it.t}</div>
    </div>`;
    cell(`t10_f_${idx}`, html, fx, 532, 88, 46, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  });

  // Platform sub-bar
  const platBarHtml = `<div style="display:flex;align-items:center;justify-content:center;gap:12px;font-size:7.5px;font-weight:700;color:#1E3A8A;">
    <span>Global Infrastructure</span> • <span>Multi-Region</span> • <span>High Performance</span> • <span>Elastic Scale</span> • <span>Secure by Design</span>
  </div>`;
  cell("t10_bar", platBarHtml, 316, 582, 924, 22, "rounded=1;arcSize=4;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1;html=1;align=center;verticalAlign=middle;");

  // =========================================================================
  // 4. RIGHT COLUMN: OBSERVABILITY & OPERATIONS (x: 1254..1584, w: 330)
  // =========================================================================

  // --- TIER 9: OBSERVABILITY & OPERATIONS (y: 64..410, h: 346) ---
  cell("t9_frame", "", 1254, 64, 330, 346, "rounded=1;arcSize=2;fillColor=#FFFFFF;strokeColor=#6D28D9;strokeWidth=1.2;");
  cell("t9_badge", "9", 1260, 70, 20, 20, "rounded=1;arcSize=4;fillColor=#6D28D9;fontColor=#FFFFFF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  cell("t9_lbl", "<b style=\"font-size:8.5px;color:#6D28D9;\">OBSERVABILITY &amp; OPERATIONS</b>", 1286, 70, 290, 20, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  const obsItems = [
    { t: "Centralized Logs (ELK / OpenSearch)", icon: "database" },
    { t: "Distributed Traces (Tempo / Jaeger)", icon: "activity" },
    { t: "Metrics &amp; Monitoring (Prometheus / Grafana)", icon: "chart" },
    { t: "API Analytics (Usage &amp; Performance)", icon: "activity" },
    { t: "SLA / SLO Monitoring &amp; Alerting", icon: "shieldAlert" },
    { t: "Dashboards &amp; Reports", icon: "chart" },
    { t: "Error Tracking &amp; Diagnostics", icon: "activity" },
    { t: "Incident Response &amp; Runbooks", icon: "fileCode" },
    { t: "Cost Monitoring &amp; Chargeback", icon: "dollarSign" },
    { t: "Capacity Planning &amp; Forecasting", icon: "chart" }
  ];
  obsItems.forEach((oi, idx) => {
    const oy = 96 + idx * 30;
    const html = `<div style="display:flex;align-items:center;gap:6px;padding:2px 4px;">
      ${svgIcon(oi.icon as keyof typeof SVG, "#6D28D9", 12)}
      <span style="font-size:7px;font-weight:700;color:#0F172A;">${oi.t}</span>
    </div>`;
    cell(`t9_oi_${idx}`, html, 1262, oy, 314, 26, "rounded=1;arcSize=4;fillColor=#FAF5FF;strokeColor=#E9D5FF;strokeWidth=1;html=1;align=left;verticalAlign=middle;");
  });

  // --- OPERATIONS & DELIVERY (y: 418..610, h: 192) ---
  cell("od_hdr", "OPERATIONS & DELIVERY", 1254, 418, 330, 20, "rounded=1;arcSize=4;fillColor=#4C1D95;fontColor=#FFFFFF;fontSize=8;fontStyle=1;align=center;verticalAlign=middle;");
  cell("od_frame", "", 1254, 440, 330, 170, "rounded=1;arcSize=2;fillColor=#FFFFFF;strokeColor=#4C1D95;strokeWidth=1.2;");

  const opsItems = [
    { t: "CI/CD Pipelines (Jenkins / GitHub Actions)", icon: "repeat" },
    { t: "GitOps (Argo CD / Flux)", icon: "network" },
    { t: "API Lifecycle Management (Design • Test • Deploy)", icon: "settings" },
    { t: "Runtime Operations (Scale • Heal • Optimize)", icon: "repeat" },
    { t: "Change Management &amp; Approvals", icon: "fileCode" }
  ];
  opsItems.forEach((oi, idx) => {
    const oy = 446 + idx * 31;
    const html = `<div style="display:flex;align-items:center;gap:6px;padding:2px 4px;">
      ${svgIcon(oi.icon as keyof typeof SVG, "#4C1D95", 12)}
      <span style="font-size:7px;font-weight:700;color:#0F172A;">${oi.t}</span>
    </div>`;
    cell(`od_oi_${idx}`, html, 1262, oy, 314, 27, "rounded=1;arcSize=4;fillColor=#F5F3FF;strokeColor=#DDD6FE;strokeWidth=1;html=1;align=left;verticalAlign=middle;");
  });

  // =========================================================================
  // 5. BOTTOM PANELS: FLOWS, INTERACTIONS, PRINCIPLES, OUTCOMES (y: 618..750, h: 132)
  // =========================================================================

  // --- Left Box 1: END-TO-END FLOWS (x: 16..260, w: 244) ---
  cell("e2e_box", "", 16, 618, 244, 132, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("e2e_hdr", "<b style=\"font-size:8px;color:#0F172A;\">END-TO-END FLOWS</b>", 16, 620, 244, 16, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  const e2eFlows = [
    { n: "1", t: "API Request Flow (Sync)", arr: "━━━►", c: "#1D4ED8" },
    { n: "2", t: "Event Flow (Async)", arr: "- - -►", c: "#EA580C" },
    { n: "3", t: "Partner / B2B Flow", arr: "━━━►", c: "#D97706" },
    { n: "4", t: "Agent to Tool Flow (MCP)", arr: "- - -►", c: "#7C3AED" },
    { n: "5", t: "Policy / Governance Flow", arr: "- - -►", c: "#16A34A" }
  ];
  const e2eHtml = `<div style="padding:2px 8px;font-size:7px;color:#0F172A;">
    ${e2eFlows
      .map(
        (ef) =>
          `<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px;">
            <div style="display:flex;align-items:center;gap:6px;">
              <span style="background:${ef.c};color:#FFF;border-radius:8px;width:13px;height:13px;display:inline-flex;align-items:center;justify-content:center;font-size:7.5px;font-weight:900;">${ef.n}</span>
              <span style="font-weight:700;">${ef.t}</span>
            </div>
            <span style="color:${ef.c};font-weight:900;">${ef.arr}</span>
          </div>`
      )
      .join("")}
  </div>`;
  cell("e2e_content", e2eHtml, 16, 638, 244, 110, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  // --- Middle-Left Box 2: KEY INTERACTIONS (x: 268..840, w: 572) ---
  cell("ki_box", "", 268, 618, 572, 132, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("ki_hdr", "<b style=\"font-size:8px;color:#0F172A;\">KEY INTERACTIONS</b>", 268, 620, 572, 16, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // Flow nodes in Key Interactions
  cell("ki_client", `<div style="text-align:center;">${svgIcon("user", "#1D4ED8", 12)}<div style="font-size:6.5px;font-weight:700;">Client</div></div>`, 280, 642, 54, 34, "rounded=1;arcSize=4;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1;html=1;align=center;verticalAlign=middle;");
  cell("ki_gw", `<div style="text-align:center;">${svgIcon("api", "#1D4ED8", 12)}<div style="font-size:6.5px;font-weight:700;">API<br/>Gateway</div></div>`, 364, 642, 60, 34, "rounded=1;arcSize=4;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1;html=1;align=center;verticalAlign=middle;");
  cell("ki_med", `<div style="text-align:center;">${svgIcon("network", "#0D9488", 12)}<div style="font-size:6.5px;font-weight:700;">Integration<br/>&amp; Mediation</div></div>`, 454, 642, 70, 34, "rounded=1;arcSize=4;fillColor=#F0FDFA;strokeColor=#99F6E4;strokeWidth=1;html=1;align=center;verticalAlign=middle;");
  cell("ki_msg", `<div style="text-align:center;">${svgIcon("zap", "#EA580C", 12)}<div style="font-size:6.5px;font-weight:700;">Messaging<br/>(Event Bus)</div></div>`, 554, 642, 70, 34, "rounded=1;arcSize=4;fillColor=#FFF7ED;strokeColor=#FED7AA;strokeWidth=1;html=1;align=center;verticalAlign=middle;");
  cell("ki_sys", `<div style="text-align:center;">${svgIcon("server", "#16A34A", 12)}<div style="font-size:6.5px;font-weight:700;">Enterprise<br/>Systems</div></div>`, 654, 642, 70, 34, "rounded=1;arcSize=4;fillColor=#F0FDF4;strokeColor=#BBF7D0;strokeWidth=1;html=1;align=center;verticalAlign=middle;");

  // Connectors across top row
  rawEdge("ki_e1", "edgeStyle=none;strokeColor=#1D4ED8;strokeWidth=1.2;endArrow=classic;endSize=4;", [{ x: 334, y: 659 }, { x: 364, y: 659 }]);
  rawEdge("ki_e2", "edgeStyle=none;strokeColor=#1D4ED8;strokeWidth=1.2;endArrow=classic;endSize=4;", [{ x: 424, y: 659 }, { x: 454, y: 659 }]);
  rawEdge("ki_e3", "edgeStyle=none;strokeColor=#0D9488;strokeWidth=1.2;endArrow=classic;endSize=4;", [{ x: 524, y: 659 }, { x: 554, y: 659 }]);
  rawEdge("ki_e4", "edgeStyle=none;strokeColor=#EA580C;strokeWidth=1.2;endArrow=classic;endSize=4;", [{ x: 624, y: 659 }, { x: 654, y: 659 }]);

  // Second row: AI Agent -> MCP Gateway -> Tools/Functions -> Enterprise Systems
  cell("ki_ai", `<div style="text-align:center;">${svgIcon("bot", "#7C3AED", 12)}<div style="font-size:6.5px;font-weight:700;">AI Agent</div></div>`, 310, 696, 60, 34, "rounded=1;arcSize=4;fillColor=#FAF5FF;strokeColor=#E9D5FF;strokeWidth=1;html=1;align=center;verticalAlign=middle;");
  cell("ki_mcp_gw", `<div style="text-align:center;">${svgIcon("bot", "#7C3AED", 12)}<div style="font-size:6.5px;font-weight:700;">MCP Gateway<br/>(Tool Access)</div></div>`, 420, 696, 78, 34, "rounded=1;arcSize=4;fillColor=#FAF5FF;strokeColor=#E9D5FF;strokeWidth=1;html=1;align=center;verticalAlign=middle;");
  cell("ki_tools", `<div style="text-align:center;">${svgIcon("settings", "#7C3AED", 12)}<div style="font-size:6.5px;font-weight:700;">Tools / Functions<br/>(System Actions)</div></div>`, 548, 696, 92, 34, "rounded=1;arcSize=4;fillColor=#FAF5FF;strokeColor=#E9D5FF;strokeWidth=1;html=1;align=center;verticalAlign=middle;");

  rawEdge("ki_e5", "edgeStyle=none;strokeColor=#7C3AED;strokeWidth=1.2;dashed=1;endArrow=classic;endSize=4;", [{ x: 370, y: 713 }, { x: 420, y: 713 }]);
  rawEdge("ki_e6", "edgeStyle=none;strokeColor=#7C3AED;strokeWidth=1.2;dashed=1;endArrow=classic;endSize=4;", [{ x: 498, y: 713 }, { x: 548, y: 713 }]);
  rawEdge("ki_e7", "edgeStyle=orthogonalEdgeStyle;strokeColor=#7C3AED;strokeWidth=1.2;dashed=1;endArrow=classic;endSize=4;", [
    { x: 640, y: 713 },
    { x: 689, y: 713 },
    { x: 689, y: 676 }
  ]);

  // --- Middle-Right Box 3: ARCHITECTURE PRINCIPLES (x: 848..1246, w: 398) ---
  cell("ap_box", "", 848, 618, 398, 132, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("ap_hdr", "<b style=\"font-size:8px;color:#0F172A;\">ARCHITECTURE PRINCIPLES</b>", 848, 620, 398, 16, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  const apPrinciples = [
    { t: "Secure by<br/>Default", icon: "shieldCheck" },
    { t: "API First<br/>&amp; Productized", icon: "api" },
    { t: "Event Driven<br/>&amp; Async", icon: "zap" },
    { t: "Reusability<br/>&amp; Composability", icon: "settings" },
    { t: "Observability<br/>End-to-End", icon: "activity" },
    { t: "Scalability<br/>&amp; Resilience", icon: "repeat" }
  ];
  apPrinciples.forEach((ap, idx) => {
    const col = idx % 3;
    const row = Math.floor(idx / 3);
    const ax = 858 + col * 128;
    const ay = 640 + row * 44;
    const html = `<div style="display:flex;align-items:center;gap:6px;padding:2px;">
      ${svgIcon(ap.icon as keyof typeof SVG, "#1D4ED8", 14)}
      <span style="font-size:7px;font-weight:700;color:#0F172A;line-height:1.15;">${ap.t}</span>
    </div>`;
    cell(`ap_p_${idx}`, html, ax, ay, 122, 38, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  });

  // --- Right Box 4: OUTCOMES (x: 1254..1584, w: 330) ---
  cell("oc_box", "", 1254, 618, 330, 132, "rounded=1;arcSize=3;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("oc_hdr", "<b style=\"font-size:8px;color:#0F172A;\">OUTCOMES</b>", 1254, 620, 330, 16, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  const outcomes = [
    "Unified API &amp; Integration Platform",
    "Faster Time to Market",
    "Secure &amp; Governed Access",
    "Operational Excellence",
    "Cost Efficiency &amp; Transparency",
    "Innovation with AI &amp; Automation"
  ];
  const ocHtml = `<div style="padding:2px 8px;font-size:7px;color:#0F172A;line-height:1.25;">
    ${outcomes
      .map(
        (o) =>
          `<div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
            ${svgIcon("checkCircle", "#16A34A", 11)}
            <span style="font-weight:700;">${o}</span>
          </div>`
      )
      .join("")}
  </div>`;
  cell("oc_content", ocHtml, 1254, 638, 330, 110, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  // Bottom Notice
  const footerNote = `<span style="font-size:7px;color:#94A3B8;">This reference architecture is designed for illustrative purposes. Customize based on your business requirements, integration protocols, and compliance frameworks.</span>`;
  cell("footer_note", footerNote, 16, 756, 1100, 18, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  const footerCopy = `<span style="font-size:7px;color:#94A3B8;">© 2024 Enterprise Architecture</span>`;
  cell("footer_copy", footerCopy, 1400, 756, 184, 18, "text;html=1;strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

  // =========================================================================
  // 6. INTER-TIER CONNECTING FLOW ARROWS
  // =========================================================================
  // Downward sync arrows from 1 to 2
  [380, 510, 640, 770, 900, 1030].forEach((x, idx) => {
    rawEdge(`e_t1_t2_${idx}`, "edgeStyle=none;strokeColor=#1D4ED8;strokeWidth=1.3;endArrow=classic;endSize=4;", [
      { x, y: 118 },
      { x, y: 122 }
    ]);
  });

  // Downward sync arrows from 2 to 3
  [380, 510, 640, 770, 900, 1030].forEach((x, idx) => {
    rawEdge(`e_t2_t3_${idx}`, "edgeStyle=none;strokeColor=#2563EB;strokeWidth=1.3;endArrow=classic;endSize=4;", [
      { x, y: 176 },
      { x, y: 180 }
    ]);
  });

  // Downward sync arrows from 3 to 4
  [450, 650, 850, 1050].forEach((x, idx) => {
    rawEdge(`e_t3_t4_${idx}`, "edgeStyle=none;strokeColor=#1E40AF;strokeWidth=1.3;endArrow=classic;endSize=4;", [
      { x, y: 234 },
      { x, y: 238 }
    ]);
  });

  // Downward MCP tool arrows from 4 to 5
  [450, 650, 850, 1050].forEach((x, idx) => {
    rawEdge(`e_t4_t5_${idx}`, "edgeStyle=none;strokeColor=#7C3AED;strokeWidth=1.3;dashed=1;endArrow=classic;endSize=4;", [
      { x, y: 292 },
      { x, y: 296 }
    ]);
  });

  // Downward async event arrows from 5 to 6
  [450, 650, 850, 1050].forEach((x, idx) => {
    rawEdge(`e_t5_t6_${idx}`, "edgeStyle=none;strokeColor=#EA580C;strokeWidth=1.3;dashed=1;endArrow=classic;endSize=4;", [
      { x, y: 350 },
      { x, y: 354 }
    ]);
  });

  // Downward sync arrows from 6 to 7
  [400, 550, 700, 850, 1000, 1150].forEach((x, idx) => {
    rawEdge(`e_t6_t7_${idx}`, "edgeStyle=none;strokeColor=#16A34A;strokeWidth=1.3;endArrow=classic;endSize=4;", [
      { x, y: 408 },
      { x, y: 412 }
    ]);
  });

  // Downward governance arrows from 7 to 8
  [400, 550, 700, 850, 1000, 1150].forEach((x, idx) => {
    rawEdge(`e_t7_t8_${idx}`, "edgeStyle=none;strokeColor=#D97706;strokeWidth=1.3;dashed=1;endArrow=classic;endSize=4;", [
      { x, y: 466 },
      { x, y: 470 }
    ]);
  });

  // Downward foundational arrows from 8 to 10
  [400, 550, 700, 850, 1000, 1150].forEach((x, idx) => {
    rawEdge(`e_t8_t10_${idx}`, "edgeStyle=none;strokeColor=#1E3A8A;strokeWidth=1.3;endArrow=classic;endSize=4;", [
      { x, y: 524 },
      { x, y: 528 }
    ]);
  });

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_45" name="Enterprise API, Integration &amp; MCP Gateway">
    <mxGraphModel dx="1600" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="800" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${c.join("\n        ")}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
