/**
 * Master 1:1 High-Craft Exact Ground-Truth Replica for Template 40: Enterprise GenAI & Multi-Agent Platform
 * Matches 100% of images/40.png:
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
 * - 1600x1180 master canvas resolution.
 */

const E = (v?: string | null) =>
  (v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

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

  // ==================== 1. TOP HEADER BANNER (y=12..48) ====================
  cell(
    "hdr_title",
    `<div style='font-size:24px;font-weight:900;color:#0F172A;letter-spacing:0.5px;'>40. Enterprise GenAI & Multi-Agent Platform</div>`,
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
      y,
      26,
      26,
      `shape=ellipse;fillColor=${col};strokeColor=${col};fontColor=#FFFFFF;fontSize=13;fontStyle=1;align=center;verticalAlign=middle;`
    );
  };

  const tierLabel = (id: string, text: string, y: number, h: number) => {
    cell(
      `t_lbl_${id}`,
      text,
      42,
      y,
      86,
      h,
      "whiteSpace=wrap;overflow=hidden;text;html=1;strokeColor=none;fillColor=none;fontSize=8.5;fontStyle=1;fontColor=#1E3A8A;align=left;verticalAlign=middle;lineHeight=1.15;"
    );
  };

  // Flow Step Badge helper (Purple/Blue circles with white numbers)
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
  tierBadge("1", 54, 26, "#1D4ED8");
  tierLabel("1", "USER &<br/>CHANNELS<br/>LAYER", 54, 68);

  // Users Pod (w=340)
  cell("box_t1_users", "", 134, 54, 344, 68, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#BFDBFE;strokeWidth=1.5;");
  const usersList = [
    { t: "Business Users", icon: "👥" },
    { t: "Analysts", icon: "📊" },
    { t: "Developers", icon: "💻" },
    { t: "Operations", icon: "🛠️" },
    { t: "External Partners", icon: "🤝" }
  ];
  usersList.forEach((u, i) => {
    const ux = 140 + i * 67;
    cell(`u_${i}`, `<div style="text-align:center;"><div style="font-size:20px;line-height:1;">${u.icon}</div><div style="font-size:8px;font-weight:800;color:#0F172A;margin-top:3px;line-height:1.15;">${u.t}</div></div>`, ux, 58, 64, 60, "rounded=1;fillColor=#F8FAFC;strokeColor=none;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // Channels Pod (w=854)
  cell("box_t1_channels", "", 484, 54, 856, 68, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#BFDBFE;strokeWidth=1.5;");
  cell("lbl_t1_channels", "CHANNELS", 484, 56, 856, 14, "fontColor=#1E40AF;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");

  const channelsList = [
    { t: "Web App", icon: "🌐" },
    { t: "Mobile App", icon: "📱" },
    { t: "Teams / Slack", icon: "💬" },
    { t: "API / SDK", icon: "⚙️" },
    { t: "Contact Center", icon: "🎧" }
  ];
  channelsList.forEach((ch, i) => {
    const chx = 492 + i * 116;
    cell(`ch_${i}`, `<div style="text-align:center;"><div style="font-size:20px;line-height:1;">${ch.icon}</div><div style="font-size:8.5px;font-weight:800;color:#0F172A;margin-top:3px;">${ch.t}</div></div>`, chx, 70, 110, 48, "rounded=1;fillColor=#F0F9FF;strokeColor=#BAE6FD;strokeWidth=1.2;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // Enterprise Copilots Pod (Right inside Channels)
  cell("copilot_chat", `<div style="text-align:center;"><div style="font-size:9px;font-weight:900;color:#6D28D9;">Enterprise Copilots /<br/>Chat UI / Portal</div><div style="font-size:7.5px;font-weight:700;color:#64748B;margin-top:3px;background:#FAF5FF;padding:3px 6px;border-radius:4px;border:1px dashed #DDD6FE;">Hello! How can I help you?</div></div>`, 1080, 60, 252, 58, "rounded=1;fillColor=#FAF5FF;strokeColor=#DDD6FE;strokeWidth=1.2;html=1;align=center;verticalAlign=middle;padding=2;");

  // Connectors: Users -> Channels
  rawEdge("e_u_ch", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 478, y: 88 },
    { x: 484, y: 88 }
  ]);

  // Flow Step 1 Badge between Channels & Edge
  flowBadge("step_1", "1", 396, 118, "#7C3AED");

  // Connector: Channels -> Edge Gateway / Load Balancing through Step 1
  rawEdge("e_ch_edge", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 546, y: 122 },
    { x: 546, y: 148 }
  ]);
  rawEdge("e_ch_lb", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 622, y: 122 },
    { x: 622, y: 148 }
  ]);
  rawEdge("e_ch_armor", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 700, y: 122 },
    { x: 700, y: 148 }
  ]);

  // ==================== TIER 2: EXPERIENCE & ACCESS LAYER (y=130..202, h=72) ====================
  tierBadge("2", 130, 26, "#0D9488");
  tierLabel("2", "EXPERIENCE &<br/>ACCESS LAYER", 130, 68);

  // Identity & Access
  cell("box_t2_iam", "", 134, 130, 290, 72, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("lbl_t2_iam", "Identity & Access", 134, 132, 290, 14, "fontColor=#0D9488;fontSize=8;fontStyle=1;align=center;verticalAlign=middle;");
  const iamItems = [
    { t: "SSO (SAML/OIDC)", icon: "🪪" },
    { t: "IAM", icon: "👤" },
    { t: "MFA", icon: "🔒" },
    { t: "RBAC / ABAC", icon: "🛡️" }
  ];
  iamItems.forEach((im, i) => {
    const imx = 140 + i * 70;
    cell(`im_${i}`, `<div style="text-align:center;"><span style="font-size:14px;">${im.icon}</span><div style="font-size:7.5px;font-weight:800;color:#0F172A;margin-top:1px;">${im.t}</div></div>`, imx, 148, 66, 50, "rounded=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // Edge & Access Management
  cell("box_t2_edge", "", 430, 130, 390, 72, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("lbl_t2_edge", "Edge & Access Management", 430, 132, 390, 14, "fontColor=#0D9488;fontSize=8;fontStyle=1;align=center;verticalAlign=middle;");
  const edgeItems = [
    { t: "API Gateway", icon: "🌐" },
    { t: "Cloud Load Balancing", icon: "⚖️" },
    { t: "Cloud Armor (WAF)", icon: "🛡️" },
    { t: "OAuth 2.0 / OIDC", icon: "🔑" },
    { t: "Rate Limiting & Quotas", icon: "⏱️" }
  ];
  edgeItems.forEach((em, i) => {
    const emx = 436 + i * 76;
    cell(`em_${i}`, `<div style="text-align:center;"><span style="font-size:14px;">${em.icon}</span><div style="font-size:7px;font-weight:800;color:#0F172A;margin-top:1px;">${em.t}</div></div>`, emx, 148, 72, 50, "rounded=1;fillColor=#F0FDFA;strokeColor=#99F6E4;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // Tenant / Workspace Isolation
  cell("box_t2_tenant", "", 826, 130, 514, 72, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("lbl_t2_tenant", "Tenant / Workspace Isolation", 826, 132, 514, 14, "fontColor=#0D9488;fontSize=8;fontStyle=1;align=center;verticalAlign=middle;");
  const tenantCards = [
    { t: "Tenant A", sub: "👥 👥 👥" },
    { t: "Tenant B", sub: "👥 👥 👥" },
    { t: "Tenant N", sub: "👥 👥 👥" }
  ];
  tenantCards.forEach((tc, i) => {
    const tcx = 836 + i * 162;
    cell(`tc_${i}`, `<div style="text-align:center;"><div style="font-size:8.5px;font-weight:900;color:#0F172A;">${tc.t}</div><div style="font-size:12px;margin-top:2px;">${tc.sub}</div></div>`, tcx, 148, 154, 38, "rounded=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");
  });
  cell("lbl_tenant_iso", "Isolation: Projects • Folders • VPC SC • Namespaces", 826, 186, 514, 14, "fontColor=#64748B;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;");

  // Connectors within Tier 2
  rawEdge("e_iam_edge", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#0D9488;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 424, y: 166 },
    { x: 430, y: 166 }
  ]);
  rawEdge("e_edge_tenant", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#0D9488;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 820, y: 166 },
    { x: 826, y: 166 }
  ]);

  // ==================== TIER 3: AGENT EXPERIENCE & ORCHESTRATION LAYER (y=210..388, h=178) ====================
  tierBadge("3", 210, 26, "#7C3AED");
  tierLabel("3", "AGENT<br/>EXPERIENCE &<br/>ORCHESTRATION<br/>LAYER", 210, 80);

  // Left Step 2 Ingress Badge
  flowBadge("step_2", "2", 84, 324, "#7C3AED");
  rawEdge("e_step2_in", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#7C3AED;strokeWidth=1.5;dashed=1;dashPattern=4 3;endArrow=classic;endSize=4;", [
    { x: 104, y: 334 },
    { x: 142, y: 334 }
  ]);

  cell("box_t3_main", "", 134, 210, 1206, 178, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.5;dashed=1;");

  // Left Column: Agent Platform Services
  cell("box_t3_plat", "", 142, 216, 144, 166, "rounded=1;arcSize=4;fillColor=#FAF5FF;strokeColor=#E9D5FF;strokeWidth=1;");
  cell("lbl_t3_plat", "Agent Platform Services", 142, 218, 144, 14, "fontColor=#6D28D9;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;");
  const platSvcs = [
    { t: "Session Manager", icon: "📋" },
    { t: "State Manager", icon: "💾" },
    { t: "Conversation Manager", icon: "💬" },
    { t: "Identity Propagation", icon: "🪪" },
    { t: "Context Assembler", icon: "🧩" }
  ];
  platSvcs.forEach((ps, i) => {
    const psy = 234 + i * 29;
    cell(`ps_${i}`, `<div style="display:flex;align-items:center;gap:4px;"><span style="font-size:12px;">${ps.icon}</span><span style="font-size:7.5px;font-weight:800;color:#0F172A;">${ps.t}</span></div>`, 146, psy, 136, 26, "rounded=1;fillColor=#FFFFFF;strokeColor=#DDD6FE;html=1;align=left;verticalAlign=middle;padding=2;");
  });

  // Center Orchestration Enclave
  cell("sup_agent", `<div style="display:flex;align-items:center;gap:6px;justify-content:center;"><span style="font-size:18px;">👑</span><span style="font-size:10px;font-weight:900;color:#5B21B6;">Supervisor / Orchestrator Agent</span></div>`, 294, 216, 736, 32, "rounded=1;arcSize=4;fillColor=#F5F3FF;strokeColor=#DDD6FE;html=1;align=center;verticalAlign=middle;padding=2;");

  cell("router_agent", `<div style="text-align:center;"><span style="font-size:8.5px;font-weight:900;color:#6D28D9;">Agent Router / Planner / Task Decomposer</span></div>`, 294, 252, 736, 22, "rounded=1;fillColor=#FAF5FF;strokeColor=#E9D5FF;html=1;align=center;verticalAlign=middle;padding=2;");

  // 7 Specialized Agents
  const agentList = [
    { t: "Research Agent", sub: "Web research, market intel, competitors", icon: "🔍" },
    { t: "Analytics Agent", sub: "Data analysis, BI, insight generation", icon: "📊" },
    { t: "Workflow Agent", sub: "Process automation, orchestration", icon: "⚙️" },
    { t: "Support Agent", sub: "Customer support, Q&A, case mgmt", icon: "🎧" },
    { t: "Retrieval Agent", sub: "Semantic search, RAG, context retrieval", icon: "📚" },
    { t: "Code Agent", sub: "Code gen, review, refactor, debug", icon: "💻" },
    { t: "Compliance Agent", sub: "Policy check, PII, regulatory compliance", icon: "🛡️" }
  ];
  agentList.forEach((ag, i) => {
    const agx = 294 + i * 105;
    cell(`ag_${i}`, `<div style="text-align:center;"><span style="font-size:16px;">${ag.icon}</span><div style="font-size:8px;font-weight:900;color:#5B21B6;margin-top:2px;">${ag.t}</div><div style="font-size:6.5px;color:#64748B;line-height:1.15;margin-top:2px;">${ag.sub}</div></div>`, agx, 278, 102, 104, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#DDD6FE;html=1;align=center;verticalAlign=middle;padding=3;");
  });

  // Right Column: Agent Governance
  cell("box_t3_gov", "", 1038, 216, 294, 166, "rounded=1;arcSize=4;fillColor=#FAF5FF;strokeColor=#E9D5FF;strokeWidth=1;");
  cell("lbl_t3_gov", "Agent Governance", 1038, 218, 294, 14, "fontColor=#6D28D9;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;");
  const govItems = [
    { t: "Prompt Templates", icon: "📝" },
    { t: "Skill Library", icon: "📚" },
    { t: "Policy-Based Routing", icon: "📜" },
    { t: "Guardrails", icon: "🛡️" },
    { t: "A2A Protocol (Agent-to-Agent)", icon: "🔗" }
  ];
  govItems.forEach((gi, i) => {
    const giy = 234 + i * 29;
    cell(`gi_${i}`, `<div style="display:flex;align-items:center;gap:4px;"><span style="font-size:12px;">${gi.icon}</span><span style="font-size:7.5px;font-weight:800;color:#0F172A;">${gi.t}</span></div>`, 1044, giy, 282, 26, "rounded=1;fillColor=#FFFFFF;strokeColor=#DDD6FE;html=1;align=left;verticalAlign=middle;padding=2;");
  });

  // Connectors inside Tier 3
  // Platform Services <--> Supervisor / Router
  rawEdge("e_plat_sup", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#7C3AED;strokeWidth=1.5;dashed=1;dashPattern=4 3;startArrow=classic;endArrow=classic;startSize=4;endSize=4;", [
    { x: 286, y: 260 },
    { x: 294, y: 260 }
  ]);
  // Supervisor -> Router
  rawEdge("e_sup_router", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#7C3AED;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 662, y: 248 },
    { x: 662, y: 252 }
  ]);
  // Router -> 7 Agents drop arrows
  agentList.forEach((_, i) => {
    const ax = 345 + i * 105;
    rawEdge(`e_r_ag_${i}`, "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#7C3AED;strokeWidth=1.5;endArrow=classic;endSize=4;", [
      { x: ax, y: 274 },
      { x: ax, y: 278 }
    ]);
  });
  // Agent-to-Agent (A2A) horizontal bidirectional arrows between adjacent agents
  for (let i = 0; i < 6; i++) {
    const startX = 396 + i * 105;
    const endX = startX + 3;
    rawEdge(`e_a2a_${i}`, "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#7C3AED;strokeWidth=1.2;startArrow=classic;endArrow=classic;startSize=3;endSize=3;", [
      { x: startX, y: 330 },
      { x: endX, y: 330 }
    ]);
  }
  // Governance <--> Router / Supervisor
  rawEdge("e_gov_sup", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#7C3AED;strokeWidth=1.5;dashed=1;dashPattern=4 3;startArrow=classic;endArrow=classic;startSize=4;endSize=4;", [
    { x: 1038, y: 260 },
    { x: 1030, y: 260 }
  ]);

  // Flow Step 5 Badge to Right Sidebar Governance
  flowBadge("step_5", "5", 1344, 168, "#7C3AED");
  rawEdge("e_sup_gov_sb", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#7C3AED;strokeWidth=1.5;dashed=1;dashPattern=5 3;endArrow=classic;endSize=4;", [
    { x: 1030, y: 232 },
    { x: 1340, y: 232 },
    { x: 1340, y: 178 },
    { x: 1354, y: 178 }
  ]);

  // ==================== TIER 4: MODEL & REASONING LAYER (y=394..490, h=96) ====================
  tierBadge("4", 394, 26, "#0284C7");
  tierLabel("4", "MODEL &<br/>REASONING<br/>LAYER", 394, 60);

  // Left Step 4 Ingress Badge
  flowBadge("step_4", "4", 84, 468, "#0284C7");
  rawEdge("e_step4_in", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#0284C7;strokeWidth=1.5;dashed=1;dashPattern=4 3;endArrow=classic;endSize=4;", [
    { x: 104, y: 478 },
    { x: 134, y: 478 }
  ]);

  // Safety & Grounding Controls
  cell("box_t4_safety", "", 134, 394, 160, 96, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("lbl_t4_safety", "Safety & Grounding Controls", 134, 396, 160, 14, "fontColor=#0284C7;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;");
  const safetyList = [
    "Input / Output Filters",
    "PII / DLP Checks",
    "Content Safety",
    "Prompt Injection Guard",
    "Grounding Enforcement"
  ];
  safetyList.forEach((sl, i) => {
    const sly = 412 + i * 15;
    cell(`sl_${i}`, `<div style="display:flex;align-items:center;gap:3px;"><span style="color:#0284C7;font-size:8px;">✔</span><span style="font-size:7px;color:#0F172A;">${sl}</span></div>`, 138, sly, 152, 14, "whiteSpace=wrap;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  });

  // Center: Model Gateway / LLM Router
  cell("box_t4_router", "", 300, 394, 764, 96, "rounded=1;arcSize=4;fillColor=#F0F9FF;strokeColor=#BAE6FD;strokeWidth=1.2;");
  cell("lbl_t4_router", "Model Gateway / LLM Router", 300, 396, 764, 14, "fontColor=#0284C7;fontSize=8;fontStyle=1;align=center;verticalAlign=middle;");
  cell("lbl_t4_sub", "Route • Select • Ensemble • Fallback • Cost / Latency Optimization", 300, 410, 764, 12, "fontColor=#64748B;fontSize=6.5;align=center;verticalAlign=middle;");

  // Model Cards
  const modelCards = [
    { t: "Gemini", sub: "1.5 Pro / 1.5 Flash", icon: "✨" },
    { t: "Gemini", sub: "1.5 Pro (Vision)", icon: "👁️" },
    { t: "Gemma", sub: "(7B / 28B)", icon: "💎" },
    { t: "Other Foundation", sub: "Anthropic, Llama, Mistral", icon: "🌐" }
  ];
  modelCards.forEach((mc, i) => {
    const mcx = 308 + i * 130;
    cell(`mc_${i}`, `<div style="text-align:center;"><div style="font-size:18px;line-height:1;">${mc.icon}</div><div style="font-size:8.5px;font-weight:900;color:#0F172A;margin-top:2px;">${mc.t}</div><div style="font-size:7.5px;color:#64748B;font-weight:700;">${mc.sub}</div></div>`, mcx, 426, 124, 58, "rounded=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;html=1;align=center;verticalAlign=middle;padding=2;");
    // Drop arrow from router bar to model card
    rawEdge(`e_router_mc_${i}`, "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#0284C7;strokeWidth=1.5;endArrow=classic;endSize=4;", [
      { x: mcx + 62, y: 422 },
      { x: mcx + 62, y: 426 }
    ]);
  });

  // Smaller Models Pod
  cell("box_t4_small", "", 832, 426, 224, 58, "rounded=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;html=1;align=center;verticalAlign=middle;");
  cell("lbl_t4_small", "Smaller Models", 832, 428, 224, 12, "fontColor=#0284C7;fontSize=8;fontStyle=1;align=center;verticalAlign=middle;");
  const smallPills = ["Classification", "Summarization", "Extraction", "Embedding"];
  smallPills.forEach((sp, i) => {
    const spx = 836 + (i % 2) * 110;
    const spy = 442 + Math.floor(i / 2) * 18;
    cell(`spill_${i}`, `<div style="font-size:7.5px;font-weight:800;color:#0F172A;text-align:center;">${sp}</div>`, spx, spy, 106, 16, "rounded=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=center;verticalAlign=middle;");
  });
  rawEdge("e_router_small", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#0284C7;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 944, y: 422 },
    { x: 944, y: 426 }
  ]);

  // Model Ops
  cell("box_t4_ops", "", 1070, 394, 270, 96, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;");
  cell("lbl_t4_ops", "Model Ops", 1070, 396, 270, 14, "fontColor=#0284C7;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");
  const modelOpsList = [
    { t: "Model Registry", icon: "📦" },
    { t: "Versioning", icon: "🔢" },
    { t: "A/B Testing", icon: "⚖️" },
    { t: "Canary / Rollout", icon: "🚀" },
    { t: "Cost Controls", icon: "💰" }
  ];
  modelOpsList.forEach((mo, i) => {
    const mox = 1076 + (i % 2) * 130;
    const moy = 414 + Math.floor(i / 2) * 24;
    const mow = i === 4 ? 258 : 124;
    cell(`mo_${i}`, `<div style="display:flex;align-items:center;gap:4px;"><span style="font-size:14px;">${mo.icon}</span><span style="font-size:8px;font-weight:800;color:#0F172A;">${mo.t}</span></div>`, mox, moy, mow, 22, "rounded=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=left;verticalAlign=middle;padding=2;");
  });

  // Connectors inside Tier 4
  rawEdge("e_safety_router", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#0284C7;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 294, y: 442 },
    { x: 300, y: 442 }
  ]);
  rawEdge("e_ops_router", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#0284C7;strokeWidth=1.5;startArrow=classic;endArrow=classic;startSize=4;endSize=4;", [
    { x: 1064, y: 442 },
    { x: 1070, y: 442 }
  ]);
  // Tier 3 Agents down into Model Router
  rawEdge("e_ag_router_down", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#0284C7;strokeWidth=1.5;dashed=1;dashPattern=4 3;endArrow=classic;endSize=4;", [
    { x: 682, y: 382 },
    { x: 682, y: 394 }
  ]);

  // Flow Step 6 Badge to Observability Sidebar
  flowBadge("step_6", "6", 1344, 452, "#0284C7");
  rawEdge("e_ops_obs_sb", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#0284C7;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 1340, y: 462 },
    { x: 1354, y: 462 }
  ]);

  // ==================== TIER 5: MEMORY, KNOWLEDGE & CONTEXT LAYER (y=496..590, h=94) ====================
  tierBadge("5", 496, 26, "#1D4ED8");
  tierLabel("5", "MEMORY, KNOWLEDGE<br/>& CONTEXT LAYER", 496, 60);

  // Left Step 3 Ingress Badge
  flowBadge("step_3", "3", 84, 580, "#1D4ED8");
  rawEdge("e_step3_in", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#1D4ED8;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 104, y: 590 },
    { x: 134, y: 590 },
    { x: 134, y: 577 },
    { x: 198, y: 577 }
  ]);

  const memCards = [
    { t: "Short-Term / Conversation Memory", sub: "Recent turns, session state, user intent, working context", icon: "💬" },
    { t: "Long-Term Memory / Profile Store", sub: "User preferences, history, behavior, personalization", icon: "👤" },
    { t: "Vector Index / Semantic Search", sub: "Embeddings, vector store, semantic similarity search", icon: "🔍" },
    { t: "Knowledge Graph / Taxonomy", sub: "Entities, relationships, ontology, enterprise taxonomy", icon: "🕸️" },
    { t: "Cache / Prompt-Context Store", sub: "Frequently used contexts, prompts, responses", icon: "⚡" }
  ];
  memCards.forEach((mc, i) => {
    const mcx = 134 + i * 242;
    cell(`mem_${i}`, `<div style="text-align:center;"><span style="font-size:14px;">${mc.icon}</span><div style="font-size:8px;font-weight:900;color:#0F172A;margin-top:1px;">${mc.t}</div><div style="font-size:6.5px;color:#64748B;line-height:1.15;margin-top:1px;">${mc.sub}</div></div>`, mcx, 496, 236, 52, "rounded=1;arcSize=4;fillColor=#EFF6FF;strokeColor=#BFDBFE;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // Memory Inter-card bidirectional connectors
  for (let i = 0; i < 4; i++) {
    const startX = 370 + i * 242;
    const endX = startX + 6;
    rawEdge(`e_mem_${i}`, "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#1D4ED8;strokeWidth=1.2;startArrow=classic;endArrow=classic;startSize=3;endSize=3;", [
      { x: startX, y: 522 },
      { x: endX, y: 522 }
    ]);
  }

  // RAG Pipeline Steps (y=552..584)
  cell("lbl_rag_pipe", "— RAG Pipeline —", 134, 552, 1206, 12, "fontColor=#2563EB;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;");
  const ragSteps = [
    { n: "❶", t: "Retrieve", sub: "(Top-K)" },
    { n: "❷", t: "Rerank", sub: "(Relevance)" },
    { n: "❸", t: "Ground", sub: "(Verify & Filter)" },
    { n: "❹", t: "Cite", sub: "(Sources & Links)" },
    { n: "❺", t: "Context to Model", sub: "(Grounded Prompt)" }
  ];
  ragSteps.forEach((rs, i) => {
    const rsx = 200 + i * 210;
    cell(`rs_${i}`, `<div style="display:flex;align-items:center;gap:4px;justify-content:center;"><span style="color:#2563EB;font-weight:900;font-size:10px;">${rs.n}</span><span style="font-size:7.5px;font-weight:800;color:#0F172A;">${rs.t}</span><span style="font-size:6.5px;color:#64748B;">${rs.sub}</span></div>`, rsx, 566, 180, 22, "rounded=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // Chained arrows between RAG Pipeline steps
  for (let i = 0; i < 4; i++) {
    const startX = 380 + i * 210;
    const endX = 400 + i * 210;
    rawEdge(`e_rag_${i}`, "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#2563EB;strokeWidth=1.5;dashed=1;dashPattern=4 3;endArrow=classic;endSize=4;", [
      { x: startX, y: 577 },
      { x: endX, y: 577 }
    ]);
  }

  // RAG Step 5 looping up into Tier 4 Model Gateway
  rawEdge("e_rag_to_model", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 1130, y: 566 },
    { x: 1130, y: 490 }
  ]);

  // ==================== TIER 6: TOOL / PROTOCOL INTEGRATION LAYER (y=596..662, h=66) ====================
  tierBadge("6", 596, 26, "#0D9488");
  tierLabel("6", "TOOL / PROTOCOL<br/>INTEGRATION LAYER", 596, 50);

  // MCP Tool Gateway
  cell("box_t6_mcp", `<div style="text-align:center;"><div style="font-size:7.5px;font-weight:900;color:#0D9488;">MCP Tool Gateway</div><div style="font-size:12px;margin-top:2px;">🔌</div><div style="font-size:7px;color:#64748B;">MCP Server</div></div>`, 134, 596, 170, 66, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");

  // Tool Registry
  cell("box_t6_reg", `<div style="text-align:center;"><div style="font-size:7.5px;font-weight:900;color:#0D9488;">Tool Registry</div><div style="font-size:12px;margin-top:2px;">📦</div><div style="font-size:6.5px;color:#64748B;">Tools, Functions, APIs, Templates</div></div>`, 310, 596, 170, 66, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");

  // Connectors / Adapters
  cell("box_t6_conn", `<div style="text-align:center;"><div style="font-size:7.5px;font-weight:900;color:#0D9488;">Connectors / Adapters</div><div style="font-size:6.5px;color:#0F172A;margin-top:2px;">🔌 Prebuilt Connectors<br/>⚙️ Custom Adapters</div></div>`, 486, 596, 180, 66, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");

  // Execution Services
  cell("box_t6_exec", `<div style="text-align:center;"><div style="font-size:7.5px;font-weight:900;color:#0D9488;">Execution Services</div><div style="display:flex;justify-content:space-around;font-size:6.5px;color:#0F172A;margin-top:4px;"><span>⚡ Function Calling</span><span>🔄 Workflow Engine<br/>(Cloud Workflows)</span><span>⏱️ Job Scheduler<br/>(Cloud Scheduler)</span></div></div>`, 672, 596, 380, 66, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");

  // Integration & Protocols
  cell("box_t6_proto", `<div style="text-align:center;"><div style="font-size:7.5px;font-weight:900;color:#0D9488;">Integration & Protocols</div><div style="display:flex;flex-wrap:wrap;gap:4px;justify-content:center;font-size:6.5px;color:#0F172A;margin-top:2px;"><span>🔌 MCP</span><span>🌐 REST</span><span>🗄️ SQL</span><span>📬 Events (Pub/Sub)</span><span>⚡ gRPC</span><span>📁 SFTP</span><span>🔗 Webhooks</span></div></div>`, 1058, 596, 282, 66, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");

  // Tier 6 Horizontal Connectors
  rawEdge("e_t6_mcp_reg", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#0D9488;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 304, y: 628 },
    { x: 310, y: 628 }
  ]);
  rawEdge("e_t6_reg_conn", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#0D9488;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 480, y: 628 },
    { x: 486, y: 628 }
  ]);
  rawEdge("e_t6_conn_exec", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#0D9488;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 666, y: 628 },
    { x: 672, y: 628 }
  ]);
  rawEdge("e_t6_exec_proto", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#0D9488;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 1052, y: 628 },
    { x: 1058, y: 628 }
  ]);

  // ==================== TIER 7: ENTERPRISE SYSTEMS & DATA SOURCES LAYER (y=668..774, h=106) ====================
  tierBadge("7", 668, 26, "#1E40AF");
  tierLabel("7", "ENTERPRISE SYSTEMS<br/>& DATA SOURCES<br/>LAYER", 668, 80);

  // Top Sub-boxes
  // Structured Apps (w=260)
  cell("box_t7_struct", "", 134, 668, 260, 52, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;");
  cell("lbl_t7_struct", "Enterprise Applications (Structured)", 134, 670, 260, 12, "fontColor=#1E40AF;fontSize=6.5;fontStyle=1;align=center;verticalAlign=middle;");
  const structApps = ["Salesforce (CRM)", "SAP (ERP)", "ServiceNow (ITSM)", "Workday (HR)"];
  structApps.forEach((sa, i) => {
    const sax = 138 + i * 63;
    cell(`sa_${i}`, `<div style="font-size:6px;font-weight:800;color:#0F172A;text-align:center;">${sa}</div>`, sax, 684, 60, 32, "rounded=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=center;verticalAlign=middle;");
  });

  // Unstructured Content (w=250)
  cell("box_t7_unstruct", "", 400, 668, 250, 52, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;");
  cell("lbl_t7_unstruct", "Collaboration & Content (Unstructured)", 400, 670, 250, 12, "fontColor=#1E40AF;fontSize=6.5;fontStyle=1;align=center;verticalAlign=middle;");
  const unstructApps = ["SharePoint", "Google Drive", "Confluence", "Docs / Wikis"];
  unstructApps.forEach((ua, i) => {
    const uax = 404 + i * 60;
    cell(`ua_${i}`, `<div style="font-size:6px;font-weight:800;color:#0F172A;text-align:center;">${ua}</div>`, uax, 684, 58, 32, "rounded=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=center;verticalAlign=middle;");
  });

  // Databases & Stores (w=330)
  cell("box_t7_dbs", "", 656, 668, 330, 52, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;");
  cell("lbl_t7_dbs", "Databases & Data Stores", 656, 670, 330, 12, "fontColor=#1E40AF;fontSize=6.5;fontStyle=1;align=center;verticalAlign=middle;");
  const dbsList = ["AlloyDB", "Cloud SQL", "Spanner", "Bigtable"];
  dbsList.forEach((db, i) => {
    const dbx = 662 + i * 80;
    cell(`db_${i}`, `<div style="font-size:6.5px;font-weight:800;color:#0F172A;text-align:center;">🗄️ ${db}</div>`, dbx, 684, 76, 32, "rounded=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=center;verticalAlign=middle;");
  });

  // Analytics & Platform (w=348)
  cell("box_t7_analytics", "", 992, 668, 348, 52, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;");
  cell("lbl_t7_analytics", "Analytics & Data Platform (GCP)", 992, 670, 348, 12, "fontColor=#1E40AF;fontSize=6.5;fontStyle=1;align=center;verticalAlign=middle;");
  const analyticsList = ["BigQuery", "Dataplex", "Data Catalog", "Looker"];
  analyticsList.forEach((an, i) => {
    const anx = 998 + i * 84;
    cell(`an_${i}`, `<div style="font-size:6.5px;font-weight:800;color:#0F172A;text-align:center;">📊 ${an}</div>`, anx, 684, 80, 32, "rounded=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=center;verticalAlign=middle;");
  });

  // Connectors from Tier 6 down into Tier 7
  rawEdge("e_t6_t7_conn1", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#1E40AF;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 576, y: 662 },
    { x: 576, y: 668 }
  ]);
  rawEdge("e_t6_t7_conn2", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#1E40AF;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 862, y: 662 },
    { x: 862, y: 668 }
  ]);
  rawEdge("e_t6_t7_conn3", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#1E40AF;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 1200, y: 662 },
    { x: 1200, y: 668 }
  ]);

  // Bottom Row: Data Types, Platforms, Formats (y=724..770)
  // Data & Content Types (w=380)
  cell("box_t7_types", "", 134, 724, 380, 46, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;");
  cell("lbl_t7_types", "Data & Content Types: Documents (PDF/Word) • Email/Calendar • Chat • Images/Media • Logs • APIs", 134, 726, 380, 42, "fontColor:#0F172A;fontSize=6.5;align=center;verticalAlign=middle;whiteSpace=wrap;");

  // Data Platforms (w=420)
  cell("box_t7_infra", "", 520, 724, 420, 46, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;");
  cell("lbl_t7_infra", "Data Platforms (GCP): Cloud Storage (Object) • Pub/Sub (Streaming) • Dataflow (Batch/Stream) • Datastream (CDC)", 520, 726, 420, 42, "fontColor:#0F172A;fontSize=6.5;align=center;verticalAlign=middle;whiteSpace=wrap;");

  // Data Formats (w=394)
  cell("box_t7_formats", "", 946, 724, 394, 46, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;");
  cell("lbl_t7_formats", "Data Formats: Structured (Transactional) • Unstructured (Docs/Media) • Semi-structured (JSON/XML) • Streaming", 946, 726, 394, 42, "fontColor:#0F172A;fontSize=6.5;align=center;verticalAlign=middle;whiteSpace=wrap;");

  // Up/Down connectors between Tier 7 top & bottom
  rawEdge("e_t7_updown1", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#1E40AF;strokeWidth=1.2;startArrow=classic;endArrow=classic;startSize=3;endSize=3;", [
    { x: 320, y: 720 },
    { x: 320, y: 724 }
  ]);
  rawEdge("e_t7_updown2", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#1E40AF;strokeWidth=1.2;startArrow=classic;endArrow=classic;startSize=3;endSize=3;", [
    { x: 730, y: 720 },
    { x: 730, y: 724 }
  ]);
  rawEdge("e_t7_updown3", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#1E40AF;strokeWidth=1.2;startArrow=classic;endArrow=classic;startSize=3;endSize=3;", [
    { x: 1140, y: 720 },
    { x: 1140, y: 724 }
  ]);

  // Flow Step 10 Badge to Platform Operations Sidebar
  flowBadge("step_10", "10", 1344, 732, "#1E40AF");
  rawEdge("e_data_ops_sb", "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#1E40AF;strokeWidth=1.5;endArrow=classic;endSize=4;", [
    { x: 1340, y: 742 },
    { x: 1354, y: 742 }
  ]);

  // ==================== TIER 8: NETWORK / SECURITY FOUNDATION (y=780..846, h=66) ====================
  tierBadge("8", 780, 26, "#0F172A");
  tierLabel("8", "NETWORK / SECURITY<br/>FOUNDATION<br/>(Zero-Trust)", 780, 50);

  const secPills = [
    { t: "VPC Network", sub: "Private Subnets", icon: "🕸️" },
    { t: "Private Google Access", sub: "Private Service Connect", icon: "☁️" },
    { t: "Cloud NAT", sub: "Egress Control", icon: "🌐" },
    { t: "Firewall Rules", sub: "Least Privilege", icon: "🛡️" },
    { t: "Encryption in Transit", sub: "(TLS 1.2+)", icon: "🔐" },
    { t: "Encryption at Rest", sub: "(CMEK / KMS)", icon: "🔑" },
    { t: "Secret Manager", sub: "Secrets, Keys, Certs", icon: "🔒" },
    { t: "Identity-Aware Proxy", sub: "Zero-Trust Access", icon: "👤" },
    { t: "Multi-Region & DR", sub: "Failover • Durability", icon: "🌐" }
  ];
  secPills.forEach((sp, i) => {
    const spx = 134 + i * 134;
    cell(`sec_${i}`, `<div style="text-align:center;"><div style="font-size:16px;line-height:1;">${sp.icon}</div><div style="font-size:8px;font-weight:900;color:#0F172A;margin-top:2px;">${sp.t}</div><div style="font-size:7px;color:#64748B;font-weight:600;">${sp.sub}</div></div>`, spx, 780, 130, 66, "rounded=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // Horizontal connectors between security foundation pods
  for (let i = 0; i < 8; i++) {
    const startX = 264 + i * 134;
    const endX = startX + 4;
    rawEdge(`e_sec_${i}`, "edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#0F172A;strokeWidth=1.5;startArrow=classic;endArrow=classic;startSize=3;endSize=3;", [
      { x: startX, y: 813 },
      { x: endX, y: 813 }
    ]);
  }

  // ==================== RIGHT SIDEBAR (x=1354..1584, y=54..846) ====================
  // 8) GOVERNANCE / HITL / COMPLIANCE (y=54..320, h=266)
  cell("sb_gov_box", "", 1354, 54, 230, 266, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.5;");
  cell("sb_gov_badge", "8", 1358, 58, 22, 22, "shape=ellipse;fillColor=#7C3AED;strokeColor=#7C3AED;fontColor=#FFFFFF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  cell("sb_gov_title", "GOVERNANCE / HITL / COMPLIANCE", 1384, 58, 194, 22, "fontColor=#6D28D9;fontSize=8.5;fontStyle=1;align=left;verticalAlign=middle;");

  const govSidebar = [
    { t: "Human Approval Queue", sub: "Review Console / Escalation", icon: "👥" },
    { t: "Prompt & Policy Governance", sub: "Policies, Guardrails, Standards", icon: "📜" },
    { t: "Audit Trail & Evidence Logging", sub: "Immutable Logs, Traceability", icon: "📋" },
    { t: "PII / DLP Checks", sub: "Detection, Masking, Redaction", icon: "👁️" },
    { t: "Responsible AI", sub: "Red Teaming, Bias, Safety Content", icon: "🧠" },
    { t: "Compliance Controls", sub: "HIPAA • GDPR • SOC2 • ISO 27001", icon: "🛡️" }
  ];
  govSidebar.forEach((gs, i) => {
    const gsy = 82 + i * 38;
    cell(`gs_${i}`, `<div style="display:flex;align-items:center;gap:6px;"><span style="font-size:16px;">${gs.icon}</span><div><div style="font-size:8px;font-weight:900;color:#0F172A;">${gs.t}</div><div style="font-size:7px;color:#64748B;font-weight:600;">${gs.sub}</div></div></div>`, 1360, gsy, 218, 34, "rounded=1;fillColor=#FAF5FF;strokeColor=#E9D5FF;strokeWidth=1.2;html=1;align=left;verticalAlign=middle;padding=3;");
  });

  // OBSERVABILITY / EVALUATION / FINOPS (y=328..578, h=250)
  cell("sb_obs_box", "", 1354, 328, 230, 250, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.5;");
  cell("sb_obs_badge", "6", 1358, 332, 22, 22, "shape=ellipse;fillColor=#0284C7;strokeColor=#0284C7;fontColor=#FFFFFF;fontSize=11;fontStyle=1;align=center;verticalAlign=middle;");
  cell("sb_obs_title", "OBSERVABILITY / EVALUATION / FINOPS", 1384, 332, 194, 22, "fontColor=#0284C7;fontSize=8.5;fontStyle=1;align=left;verticalAlign=middle;");

  const obsSidebar = [
    { t: "Logs, Metrics, Traces", sub: "Cloud Logging • Monitoring • Trace", icon: "📈" },
    { t: "Model Monitoring", sub: "Latency, Errors, Drift, Quality", icon: "⏱️" },
    { t: "Agent & Prompt Evaluation", sub: "Quality Scoring, Groundedness", icon: "🎯" },
    { t: "Feedback Loop", sub: "User Feedback, Reinforcement", icon: "🔄" },
    { t: "Cost & Token Tracking", sub: "Spend, Token Usage, Allocation", icon: "💰" },
    { t: "SLOs / Alerts / Dashboards", sub: "Uptime, Latency, Errors, Cost", icon: "🚨" }
  ];
  obsSidebar.forEach((os, i) => {
    const osy = 354 + i * 36;
    cell(`os_${i}`, `<div style="display:flex;align-items:center;gap:6px;"><span style="font-size:16px;">${os.icon}</span><div><div style="font-size:8px;font-weight:900;color:#0F172A;">${os.t}</div><div style="font-size:7px;color:#64748B;font-weight:600;">${os.sub}</div></div></div>`, 1360, osy, 218, 32, "rounded=1;fillColor=#F0F9FF;strokeColor=#BAE6FD;strokeWidth=1.2;html=1;align=left;verticalAlign=middle;padding=3;");
  });

  // PLATFORM OPERATIONS / DELIVERY (y=586..846, h=260)
  cell("sb_ops_box", "", 1354, 586, 230, 260, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#1E40AF;strokeWidth=1.5;");
  cell("sb_ops_badge", "10", 1358, 590, 22, 22, "shape=ellipse;fillColor=#1E40AF;strokeColor=#1E40AF;fontColor=#FFFFFF;fontSize=10;fontStyle=1;align=center;verticalAlign=middle;");
  cell("sb_ops_title", "PLATFORM OPERATIONS / DELIVERY", 1384, 590, 194, 22, "fontColor=#1E40AF;fontSize=8.5;fontStyle=1;align=left;verticalAlign=middle;");

  const opsSidebar = [
    { t: "CI/CD / GitOps", sub: "Cloud Build • Cloud Deploy • ArgoCD", icon: "🚀" },
    { t: "Prompt Management", sub: "Templates, Versioning, A/B Test", icon: "📝" },
    { t: "Model Registry & Pipeline", sub: "Build, Test, Deploy, Monitor", icon: "🧠" },
    { t: "Runtime & Compute", sub: "GKE • Cloud Run • Cloud Functions", icon: "☸️" },
    { t: "Artifacts & Secrets", sub: "Artifact Registry • Secret Manager • KMS", icon: "🔒" }
  ];
  opsSidebar.forEach((op, i) => {
    const opy = 614 + i * 44;
    cell(`op_${i}`, `<div style="display:flex;align-items:center;gap:6px;"><span style="font-size:16px;">${op.icon}</span><div><div style="font-size:8px;font-weight:900;color:#0F172A;">${op.t}</div><div style="font-size:7px;color:#64748B;font-weight:600;">${op.sub}</div></div></div>`, 1360, opy, 218, 38, "rounded=1;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.2;html=1;align=left;verticalAlign=middle;padding=3;");
  });

  // ==================== BOTTOM FOOTER FLOW & LEGEND (y=856..930) ====================
  // Left: Legend
  cell("box_ftr_legend", "", 16, 856, 260, 74, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;html=1;");
  cell("lbl_ftr_legend", "LEGEND (Arrow Types)", 16, 858, 260, 14, "fontColor=#0F172A;fontSize=8;fontStyle=1;align=center;verticalAlign=middle;");
  const legendArrows = [
    { t: "User Interaction", col: "#0F172A", dash: "" },
    { t: "Agent-to-Agent (A2A)", col: "#7C3AED", dash: "" },
    { t: "Data Flow", col: "#2563EB", dash: "" },
    { t: "Control / Policy", col: "#EA580C", dash: "" },
    { t: "Async Events / Streaming", col: "#0D9488", dash: "dashed" }
  ];
  legendArrows.forEach((la, i) => {
    const lax = 22 + (i % 2) * 126;
    const lay = 874 + Math.floor(i / 2) * 16;
    cell(`la_${i}`, `<div style="display:flex;align-items:center;gap:4px;"><div style="width:14px;height:3px;background:${la.col};"></div><span style="font-size:7.5px;font-weight:800;color:#0F172A;">${la.t}</span></div>`, lax, lay, 120, 14, "whiteSpace=wrap;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  });

  // Center: End-to-End Flow Example
  cell("box_ftr_flow", "", 284, 856, 960, 74, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.5;html=1;");
  cell("lbl_ftr_flow", "END-TO-END FLOW (Example)", 284, 858, 960, 14, "fontColor=#1E3A8A;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");
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
    cell(`fs_${i}`, `<div style="display:flex;align-items:center;gap:4px;"><div style="width:18px;height:18px;border-radius:50%;background:#1D4ED8;color:#FFFFFF;font-size:9px;font-weight:900;display:flex;align-items:center;justify-content:center;flex-shrink:0;">${fs.n}</div><div><div style="font-size:7.5px;font-weight:900;color:#0F172A;">${fs.t}</div><div style="font-size:7px;color:#64748B;line-height:1.1;font-weight:600;">${fs.sub}</div></div></div>`, fsx, 874, 152, 50, "rounded=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;html=1;align=left;verticalAlign=middle;padding=2;");
  });

  // Right: Google Cloud Brand
  const brandHtml = `<table style="width:100%;border-collapse:collapse;"><tr><td style="width:36px;vertical-align:middle;text-align:center;"><span style="font-size:32px;">☁️</span></td><td style="text-align:left;vertical-align:middle;padding-left:6px;"><div style="font-size:22px;font-weight:900;color:#4285F4;letter-spacing:0.5px;">Google Cloud</div></td></tr></table>`;
  cell("ftr_brand_gcp", brandHtml, 1252, 856, 332, 74, "whiteSpace=wrap;overflow=hidden;text;html=1;strokeColor=#CBD5E1;strokeWidth=1.2;fillColor=#FFFFFF;rounded=1;align=center;verticalAlign=middle;padding=4;");

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
