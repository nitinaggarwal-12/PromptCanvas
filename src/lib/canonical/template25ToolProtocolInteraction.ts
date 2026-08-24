/**
 * Master 1:1 High-Craft Exact Ground-Truth Replica for Template 25: Tool / Protocol Interaction Architecture
 * Matches 100% of images/25.png:
 * - Tool & Service Categories (6 items)
 * - 5 Protocol Interaction Layers (Agent/Client, Integration Gateway, Protocol Adapters, Service Connectors, Target Services)
 * - Cross-Cutting Capabilities bar (7 controls)
 * - Protocol Interaction Flow (8 numbered steps with arrows)
 * - Protocol Mapping & Translation Examples (4 sub-diagrams: MCP->REST, A2A->gRPC, REST->SQL, Event->Tool Call)
 * - Right Sidebar: Common Protocols & When to Use (10 items), Interaction Patterns (6 items), Key Risks, Tool Examples by Category
 * - Bottom Row: Security & Governance, Reliability & Resilience, Observability, Tools & Technologies (10 icons), Use Case Examples, Legend, Notes & Abbreviations
 * - 1536x1024 master canvas resolution.
 */

const E = (v?: string | null) =>
  (v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export function generateTemplate25ToolProtocolInteractionXml(
  domainFlavor = "biopharma",
  theme: "light" | "dark" = "light"
): string {
  const isDark = theme === "dark";
  const c: string[] = [];

  const cell = (id: string, v: string, x: number, y: number, w: number, h: number, style: string) =>
    c.push(
      `<mxCell id="${id}" value="${E(v)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`
    );

  const edge = (id: string, src: string, trg: string, style = "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;endSize=5;") =>
    c.push(
      `<mxCell id="${id}" edge="1" parent="1" source="${src}" target="${trg}" style="${style}"><mxGeometry relative="1" as="geometry"/></mxCell>`
    );

  // ==================== 1. TOP HEADER BANNER (y=12..66) ====================
  cell("hdr_num", "25", 16, 12, 68, 54, "shape=rectangle;rounded=1;arcSize=14;fillColor=#6D28D9;strokeColor=#6D28D9;fontColor=#FFFFFF;fontSize=32;fontStyle=1;align=center;verticalAlign=middle;");
  
  cell(
    "hdr_title",
    `<div style='font-size:24px;font-weight:900;color:#0F172A;letter-spacing:0.5px;'>Tool / Protocol Interaction Architecture</div>` +
    `<div style='font-size:12.5px;font-weight:700;color:#6D28D9;margin-top:2px;'>Use Case: NovaCura – Agentic Platform Integrations &amp; Protocol Interactions</div>` +
    `<div style='font-size:11px;color:#64748B;margin-top:2px;'>Environment: Production &nbsp;|&nbsp; Region: us-central1 &nbsp;|&nbsp; Last Updated: May 8, 2025</div>`,
    94,
    12,
    760,
    54,
    "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;"
  );

  const brandHtml = `<table style="width:100%;border-collapse:collapse;"><tr><td style="width:36px;vertical-align:middle;text-align:center;"><span style="font-size:32px;">🧬</span></td><td style="text-align:left;vertical-align:middle;padding-left:8px;"><div style="font-size:24px;font-weight:900;color:#0284C7;letter-spacing:1px;">NOVACURA</div><div style="font-size:10.5px;color:#64748B;font-weight:600;font-style:italic;">AI-Powered Regulatory Intelligence Platform</div></td></tr></table>`;
  cell("hdr_brand", brandHtml, 860, 12, 270, 54, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  const objHtml = `<div style='font-size:10.5px;font-weight:900;color:#1E3A8A;margin-bottom:2px;'>OBJECTIVE</div><div style='font-size:8.5px;line-height:1.35;color:#0F172A;'>
    Standardize how agents and services interact with external tools, APIs, and data sources using industry protocols and well-defined interfaces with security, reliability, and observability.
  </div>`;
  cell("hdr_obj", objHtml, 1140, 12, 380, 54, "rounded=1;arcSize=8;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.2;html=1;align=left;verticalAlign=middle;padding=6;");

  // ==================== 2. LEFT COLUMN: TOOL & SERVICE CATEGORIES (x=16..180, y=78..470, w=164) ====================
  cell("box_categories", "", 16, 78, 164, 392, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;");
  cell("lbl_categories", "TOOL &amp; SERVICE CATEGORIES", 16, 80, 164, 18, "text;html=1;strokeColor=none;fillColor=none;fontColor=#1E40AF;fontSize=8;fontStyle=1;html=1;align=center;verticalAlign=middle;");

  const catItems = [
    { t: "Data Sources", sub: "(Internal / External)", icon: "🗄️" },
    { t: "Enterprise Systems", sub: "(Transactional / SaaS)", icon: "🏢" },
    { t: "AI / ML Services", sub: "(Models &amp; Inference)", icon: "🧠" },
    { t: "Utility Services", sub: "(Email, Storage, Search)", icon: "🔧" },
    { t: "Developer Tools", sub: "(CICD, Monitoring)", icon: "💻" },
    { t: "Human Interfaces", sub: "(HITL / Approvals)", icon: "👤" }
  ];
  catItems.forEach((ci, idx) => {
    const ciy = 104 + idx * 60;
    cell(`ci_cat_${idx}`, `<div style="display:flex;align-items:center;gap:6px;"><span style="font-size:16px;">${ci.icon}</span><div><div style="font-size:7.5px;font-weight:800;color:#0F172A;">${ci.t}</div><div style="font-size:6px;color:#64748B;margin-top:1px;">${ci.sub}</div></div></div>`, 24, ciy, 148, 52, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=left;verticalAlign=middle;padding=3;");
  });

  // ==================== 3. CENTER: PROTOCOL INTERACTION LAYERS (x=190..1010, y=78..390, w=820) ====================
  cell("box_p_layers", "", 190, 78, 820, 312, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.8;");
  cell("lbl_p_layers", "PROTOCOL INTERACTION LAYERS", 190, 80, 820, 16, "text;html=1;strokeColor=none;fillColor=none;fontColor=#1E40AF;fontSize=9;fontStyle=1;align=center;verticalAlign=middle;");

  const protoLayers = [
    {
      num: "1", name: "AGENT / CLIENT LAYER",
      desc: "Agents, Apps,<br/>Services, Users",
      proto: "MCP, A2A, HTTP/HTTPS,<br/>WebSocket, gRPC",
      format: "JSON / Protobuf<br/>Text / Binary",
      icon: "👥"
    },
    {
      num: "2", name: "INTEGRATION GATEWAY",
      desc: "API Gateway /<br/>Service Mesh",
      proto: "HTTPS, gRPC, REST,<br/>GraphQL, WebSocket",
      format: "JSON, Protobuf,<br/>GraphQL",
      icon: "🌐"
    },
    {
      num: "3", name: "PROTOCOL ADAPTERS",
      desc: "Protocol Translators /<br/>Connectors",
      proto: "MCP, A2A, OData,<br/>SOAP, JDBC, FTP",
      format: "JSON, XML, CSV,<br/>Parquet",
      icon: "🔌"
    },
    {
      num: "4", name: "SERVICE CONNECTORS",
      desc: "Tool / Service<br/>Connectors",
      proto: "REST APIs, gRPC,<br/>SQL, SFTP, SMTP",
      format: "JSON, XML, CSV,<br/>Avro",
      icon: "🔗"
    },
    {
      num: "5", name: "TARGET SERVICES &amp; TOOLS",
      desc: "APIs, Databases,<br/>SaaS, Models, Tools",
      proto: "REST, gRPC, SQL,<br/>GraphQL, Message",
      format: "JSON, XML, CSV,<br/>Binary",
      icon: "🗄️"
    }
  ];

  protoLayers.forEach((pl, idx) => {
    const plx = 200 + idx * 160;
    // Layer Box
    cell(`pl_box_${idx}`, "", plx, 100, 152, 216, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");
    cell(`pl_hdr_${idx}`, `<div style="font-size:6.5px;font-weight:900;color:#1E40AF;text-align:center;">${pl.num}. ${pl.name}</div>`, plx, 102, 152, 16, "text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

    cell(`pl_desc_${idx}`, `<div style="text-align:center;"><span style="font-size:16px;">${pl.icon}</span><div style="font-size:6.5px;font-weight:800;color:#0F172A;line-height:1.15;margin-top:2px;">${pl.desc}</div></div>`, plx + 4, 120, 144, 46, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=center;verticalAlign=middle;padding=2;");

    // Protocols Sub-Box
    cell(`pl_proto_${idx}`, `<div style="font-size:6px;color:#1E40AF;font-weight:900;text-align:center;">Protocols</div><div style="font-size:5.5px;color:#0F172A;text-align:center;line-height:1.15;margin-top:2px;">${pl.proto}</div>`, plx + 4, 170, 144, 40, "rounded=1;arcSize=4;fillColor=#EFF6FF;strokeColor=#BFDBFE;html=1;align=center;verticalAlign=middle;padding=2;");

    // Format Sub-Box
    cell(`pl_format_${idx}`, `<div style="font-size:6px;color:#166534;font-weight:900;text-align:center;">Format</div><div style="font-size:5.5px;color:#0F172A;text-align:center;line-height:1.15;margin-top:2px;">${pl.format}</div>`, plx + 4, 214, 144, 40, "rounded=1;arcSize=4;fillColor=#F0FDF4;strokeColor=#BBF7D0;html=1;align=center;verticalAlign=middle;padding=2;");

    if (idx > 0) {
      edge(`e_pl_${idx}`, `pl_box_${idx - 1}`, `pl_box_${idx}`, "strokeColor=#0F172A;strokeWidth=1.2;endArrow=classic;endSize=3;");
    }
  });

  // Cross-Cutting Capabilities bar (y=322..382, h=60)
  cell("box_cross_caps", "", 200, 322, 800, 60, "rounded=1;arcSize=6;fillColor=#FAF5FF;strokeColor=#7C3AED;strokeWidth=1.2;");
  cell("lbl_cross_caps", "CROSS-CUTTING CAPABILITIES", 200, 324, 800, 14, "text;html=1;strokeColor=none;fillColor=none;fontColor=#7C3AED;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;");

  const crossItems = [
    { t: "Authentication &amp;<br/>Authorization", icon: "🔒" },
    { t: "Encryption &amp;<br/>Key Management", icon: "🔑" },
    { t: "Rate Limiting &amp;<br/>Throttling", icon: "⏱️" },
    { t: "Request/Response<br/>Validation", icon: "✔" },
    { t: "Retry, Timeout &amp;<br/>Circuit Breaker", icon: "🔄" },
    { t: "Idempotency &amp;<br/>Deduplication", icon: "📑" },
    { t: "Logging, Tracing &amp;<br/>Observability", icon: "📈" }
  ];
  crossItems.forEach((ci, idx) => {
    const cx = 206 + idx * 112;
    cell(`ci_caps_${idx}`, `<div style="text-align:center;"><span style="font-size:12px;">${ci.icon}</span><div style="font-size:5.5px;font-weight:800;color:#0F172A;line-height:1.1;margin-top:1px;">${ci.t}</div></div>`, cx, 340, 106, 38, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // ==================== 4. MIDDLE ROW: PROTOCOL FLOW & EXAMPLES (x=16..1010, y=478..660, h=182) ====================
  // 1. Protocol Interaction Flow (Example) (y=400..472, h=72)
  cell("box_flow_ex", "", 16, 400, 994, 72, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;");
  cell("lbl_flow_ex", "PROTOCOL INTERACTION FLOW (EXAMPLE)", 16, 402, 994, 14, "text;html=1;strokeColor=none;fillColor=none;fontColor=#1E40AF;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;");

  const flowSteps = [
    { num: "1", t: "Discover Tool", sub: "Agent discovers via MCP", icon: "🔍" },
    { num: "2", t: "Invoke Tool", sub: "MCP / REST over HTTPS", icon: "▶️" },
    { num: "3", t: "Authenticate", sub: "Gateway validates scope", icon: "✔" },
    { num: "4", t: "Route &amp; Adapt", sub: "Adapts protocol", icon: "🔀" },
    { num: "5", t: "Call Target", sub: "SaaS / DB / API", icon: "⚙️" },
    { num: "6", t: "Process Response", sub: "Normalize response", icon: "📥" },
    { num: "7", t: "Return Result", sub: "Result to agent", icon: "💬" },
    { num: "8", t: "Log &amp; Observe", sub: "Metrics &amp; traces", icon: "📈" }
  ];
  flowSteps.forEach((fs, idx) => {
    const fx = 24 + idx * 122;
    cell(`fs_p_${idx}`, `<div style="display:flex;align-items:center;gap:3px;"><span style="font-size:12px;">${fs.icon}</span><span style="font-size:6px;font-weight:900;color:#1E40AF;">${fs.num}. ${fs.t}</span></div><div style="font-size:5px;color:#64748B;line-height:1.1;margin-top:1px;">${fs.sub}</div>`, fx, 418, 116, 48, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=left;verticalAlign=middle;padding=2;");
    if (idx > 0) {
      edge(`e_fs_p_${idx}`, `fs_p_${idx - 1}`, `fs_p_${idx}`, "strokeColor=#2563EB;strokeWidth=1.2;endArrow=classic;endSize=3;");
    }
  });

  // 2. Protocol Mapping & Translation Examples (y=478..588, h=110)
  cell("box_trans_ex", "", 16, 478, 994, 110, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.5;");
  cell("lbl_trans_ex", "PROTOCOL MAPPING &amp; TRANSLATION EXAMPLES", 16, 480, 994, 14, "text;html=1;strokeColor=none;fillColor=none;fontColor=#7C3AED;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;");

  // Ex 1: MCP -> REST API (w=236)
  cell("box_ex1", "", 24, 498, 236, 82, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("lbl_ex1", "MCP ➔ REST API", 24, 500, 236, 12, "text;html=1;strokeColor=none;fillColor=none;fontColor=#1E40AF;fontSize=6.5;fontStyle=1;align=center;");
  cell("ex1_c", "<span style='font-size:6px;'>Agent (MCP Client) ➔ Gateway Adapter ➔ REST API (Service)</span>", 28, 518, 228, 56, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;");

  // Ex 2: A2A -> gRPC (w=236)
  cell("box_ex2", "", 272, 498, 236, 82, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("lbl_ex2", "A2A ➔ gRPC", 272, 500, 236, 12, "text;html=1;strokeColor=none;fillColor=none;fontColor=#7C3AED;fontSize=6.5;fontStyle=1;align=center;");
  cell("ex2_c", "<span style='font-size:6px;'>Agent A (A2A) ➔ Adapter ➔ Agent B (Service via gRPC)</span>", 276, 518, 228, 56, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;");

  // Ex 3: REST -> SQL (w=236)
  cell("box_ex3", "", 520, 498, 236, 82, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("lbl_ex3", "REST ➔ SQL", 520, 500, 236, 12, "text;html=1;strokeColor=none;fillColor=none;fontColor=#166534;fontSize=6.5;fontStyle=1;align=center;");
  cell("ex3_c", "<span style='font-size:6px;'>REST Client ➔ Adapter ➔ Database (SQL / JDBC)</span>", 524, 518, 228, 56, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;");

  // Ex 4: Event -> Tool Call (w=236)
  cell("box_ex4", "", 768, 498, 236, 82, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;");
  cell("lbl_ex4", "Event ➔ Tool Call", 768, 500, 236, 12, "text;html=1;strokeColor=none;fillColor=none;fontColor=#D97706;fontSize=6.5;fontStyle=1;align=center;");
  cell("ex4_c", "<span style='font-size:6px;'>Pub/Sub (Event) ➔ Function Adapter ➔ External Tool Invocation</span>", 772, 518, 228, 56, "rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;");

  // ==================== 5. RIGHT SIDEBAR (x=1020..1520, y=78..588, w=500) ====================
  // 1. Common Protocols & When to Use (w=240, x=1020)
  cell("box_r_proto_use", "", 1020, 78, 240, 290, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;");
  cell("lbl_r_proto_use", "COMMON PROTOCOLS &amp; WHEN TO USE", 1020, 80, 240, 16, "text;html=1;strokeColor=none;fillColor=none;fontColor=#1E40AF;fontSize=7.5;fontStyle=1;html=1;align=center;verticalAlign=middle;");
  const protoUseHtml = `<div style="font-size:6px;line-height:1.35;color:#0F172A;padding:2px 6px;">
    🤖 <b>MCP</b>: Standard for tool discovery &amp; invocation<br/>
    🤝 <b>A2A</b>: Agent collaboration &amp; delegation<br/>
    🌐 <b>REST (HTTP/HTTPS)</b>: General APIs &amp; web services<br/>
    ⚡ <b>gRPC</b>: High-performance, strongly-typed<br/>
    🔄 <b>WebSocket / SSE</b>: Real-time bidirectional streaming<br/>
    🕸️ <b>GraphQL</b>: Flexible query for APIs<br/>
    🗄️ <b>SQL / JDBC</b>: Relational database access<br/>
    📁 <b>SFTP / FTP</b>: Secure file transfer<br/>
    ✉️ <b>SMTP / IMAP</b>: Email sending / retrieval<br/>
    📨 <b>Pub/Sub</b>: Event streaming &amp; messaging
  </div>`;
  cell("txt_r_proto_use", protoUseHtml, 1022, 98, 236, 266, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  // 2. Interaction Patterns (w=250, x=1270, y=78..290)
  cell("box_r_patts", "", 1270, 78, 250, 210, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.2;");
  cell("lbl_r_patts", "INTERACTION PATTERNS", 1270, 80, 250, 16, "text;html=1;strokeColor=none;fillColor=none;fontColor=#7C3AED;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;");
  const iPattsHtml = `<div style="font-size:6px;line-height:1.35;color:#0F172A;padding:2px 6px;">
    🔄 <b>Request / Response</b> (Sync)<br/>
    📨 <b>Fire-and-Forget</b> (Async)<br/>
    ⚡ <b>Streaming</b> (Real-time)<br/>
    📦 <b>Batch</b> (Scheduled / Bulk)<br/>
    📡 <b>Event-Driven</b> (Pub/Sub)<br/>
    👤 <b>Human-in-the-Loop</b> (Approval / Review)
  </div>`;
  cell("txt_r_patts", iPattsHtml, 1272, 98, 246, 186, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  // 3. Key Risks (w=250, x=1270, y=294..440)
  cell("box_r_risks", "", 1270, 294, 250, 146, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#DC2626;strokeWidth=1.2;");
  cell("lbl_r_risks", "⚠️ KEY RISKS", 1270, 296, 250, 16, "text;html=1;strokeColor=none;fillColor=none;fontColor=#DC2626;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;");
  const pRisksHtml = `<div style="font-size:5.5px;line-height:1.25;color:#0F172A;padding:2px 6px;">
    🔴 <b>Authentication failures</b><br/>
    🔴 <b>Protocol mismatches</b><br/>
    🔴 <b>Data format incompatibility</b><br/>
    🔴 <b>Rate limit exceeded</b><br/>
    🔴 <b>Network / timeout issues</b><br/>
    🔴 <b>Partial failures / retries</b><br/>
    🔴 <b>Security vulnerabilities</b><br/>
    🔴 <b>Data leakage / compliance</b>
  </div>`;
  cell("txt_r_risks", pRisksHtml, 1272, 314, 246, 122, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  // 4. Tool Examples by Category (w=500, x=1020, y=446..588)
  cell("box_r_tool_ex", "", 1020, 446, 500, 142, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;");
  cell("lbl_r_tool_ex", "TOOL EXAMPLES BY CATEGORY", 1020, 448, 500, 16, "text;html=1;strokeColor=none;fillColor=none;fontColor=#166534;fontSize=7.5;fontStyle=1;align=center;verticalAlign=middle;");
  const toolExHtml = `<div style="font-size:6px;line-height:1.3;color:#0F172A;padding:2px 8px;">
    <b>Data Sources:</b> BigQuery, Snowflake, Oracle, MongoDB, S3, GCS<br/>
    <b>Enterprise Systems:</b> Salesforce, SAP, Workday, ServiceNow<br/>
    <b>AI / ML Services:</b> Vertex AI, OpenAI, Cohere, Hugging Face, LangChain<br/>
    <b>Utility Services:</b> SendGrid, Elasticsearch, Redis, Cloud Storage<br/>
    <b>Developer Tools:</b> GitHub, Jira, PagerDuty, Datadog<br/>
    <b>Human Interfaces:</b> Web UI, Slack, Email, Approval Workflows
  </div>`;
  cell("txt_r_tool_ex", toolExHtml, 1022, 466, 496, 118, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  // ==================== 6. BOTTOM ROW: 6 CARDS (y=598..954, h=356) ====================
  // 1. Security & Governance (w=220)
  cell("box_b_sec", "", 16, 598, 220, 356, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;");
  cell("lbl_b_sec", "SECURITY &amp; GOVERNANCE", 16, 600, 220, 20, "shape=rectangle;rounded=1;arcSize=8;fillColor=#F0FDF4;strokeColor=#CBD5E1;fontColor=#16A34A;fontSize=8;fontStyle=1;html=1;align=center;verticalAlign=middle;");
  const bSecHtml = `<div style="font-size:6.5px;line-height:1.5;color:#0F172A;padding:4px 6px;">
    ✔ <b>IAM &amp; Least Privilege</b><br/><br/>
    ✔ <b>OAuth2 / OIDC / Service Accounts</b><br/><br/>
    ✔ <b>TLS 1.2+ for all interactions</b><br/><br/>
    ✔ <b>Secrets Management (Secret Manager)</b><br/><br/>
    ✔ <b>Audit Logging &amp; Traceability</b><br/><br/>
    ✔ <b>Data Classification &amp; DLP</b><br/><br/>
    ✔ <b>Policy Enforcement (VPC-SC, IAP)</b>
  </div>`;
  cell("txt_b_sec", bSecHtml, 18, 624, 216, 324, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=2;");

  // 2. Reliability & Resilience (w=220)
  cell("box_b_rel", "", 244, 598, 220, 356, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;");
  cell("lbl_b_rel", "RELIABILITY &amp; RESILIENCE", 244, 600, 220, 20, "shape=rectangle;rounded=1;arcSize=8;fillColor=#EFF6FF;strokeColor=#CBD5E1;fontColor=#1E40AF;fontSize=8;fontStyle=1;html=1;align=center;verticalAlign=middle;");
  const bRelHtml = `<div style="font-size:6.5px;line-height:1.5;color:#0F172A;padding:4px 6px;">
    ✔ <b>Timeouts &amp; Retries</b><br/><br/>
    ✔ <b>Circuit Breaker</b><br/><br/>
    ✔ <b>Fallback / Degradation</b><br/><br/>
    ✔ <b>Idempotent Operations</b><br/><br/>
    ✔ <b>Dead Letter Queue</b><br/><br/>
    ✔ <b>Health Checks &amp; Heartbeats</b><br/><br/>
    ✔ <b>Multi-region Redundancy</b>
  </div>`;
  cell("txt_b_rel", bRelHtml, 246, 624, 216, 324, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=2;");

  // 3. Observability (w=220)
  cell("box_b_obs", "", 472, 598, 220, 356, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.5;");
  cell("lbl_b_obs", "OBSERVABILITY", 472, 600, 220, 20, "shape=rectangle;rounded=1;arcSize=8;fillColor=#FAF5FF;strokeColor=#CBD5E1;fontColor=#7C3AED;fontSize=8;fontStyle=1;align=center;verticalAlign=middle;");
  const bObsHtml = `<div style="font-size:6.5px;line-height:1.5;color:#0F172A;padding:4px 6px;">
    ✔ <b>Distributed Tracing (Cloud Trace)</b><br/><br/>
    ✔ <b>Structured Logging (Cloud Logging)</b><br/><br/>
    ✔ <b>Metrics &amp; Dashboards (Monitoring)</b><br/><br/>
    ✔ <b>SLA / SLO Monitoring</b><br/><br/>
    ✔ <b>Alerting &amp; Incident Response</b><br/><br/>
    ✔ <b>Correlation IDs &amp; Request Tracking</b>
  </div>`;
  cell("txt_b_obs", bObsHtml, 474, 624, 216, 324, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=2;");

  // 4. Tools & Technologies (w=360)
  cell("box_b_tools", "", 700, 598, 360, 230, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;");
  cell("lbl_b_tools", "TOOLS &amp; TECHNOLOGIES (Google Cloud)", 700, 600, 360, 20, "shape=rectangle;rounded=1;arcSize=8;fillColor=#EFF6FF;strokeColor=#CBD5E1;fontColor=#1E40AF;fontSize=7.5;fontStyle=1;html=1;align=center;verticalAlign=middle;");
  
  const techToolItems = [
    { t: "Apigee (API Mgmt)", icon: "🌐" },
    { t: "Cloud Endpoints", icon: "🛡️" },
    { t: "Eventarc (Pub/Sub)", icon: "⚡" },
    { t: "Cloud Functions", icon: "⚙️" },
    { t: "Cloud Run", icon: "🚀" },
    { t: "Vertex AI (Agents)", icon: "🧠" },
    { t: "BigQuery", icon: "📊" },
    { t: "Cloud Storage", icon: "📦" },
    { t: "Secret Manager", icon: "🔒" },
    { t: "Cloud Armor", icon: "🛡️" }
  ];
  techToolItems.forEach((tt, idx) => {
    const col = idx % 5;
    const row = Math.floor(idx / 5);
    const gx = 708 + col * 68;
    const gy = 626 + row * 92;
    cell(`tt_${idx}`, `<div style="font-size:14px;text-align:center;">${tt.icon}</div><div style="font-size:5.5px;font-weight:800;color:#0F172A;text-align:center;line-height:1.1;margin-top:2px;">${tt.t}</div>`, gx, gy, 64, 82, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // Notes below Tools (y=836..954, h=118)
  cell("box_b_notes", "", 700, 836, 360, 118, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("lbl_b_notes", "NOTES", 700, 838, 360, 14, "text;html=1;strokeColor=none;fillColor=none;fontColor=#1E3A8A;fontSize=7.5;fontStyle=1;align=left;padding=4;");
  const bNotesHtml = `<div style="font-size:6.5px;line-height:1.4;color:#0F172A;padding:2px 6px;">
    • Always prefer secure, managed connectors and official SDKs.<br/>
    • Design for idempotency and graceful degradation.
  </div>`;
  cell("txt_b_notes", bNotesHtml, 702, 854, 356, 96, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  // 5. Use Case Examples (w=444, x=1068, y=598..828)
  cell("box_b_uc", "", 1068, 598, 452, 230, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;");
  cell("lbl_b_uc", "USE CASE EXAMPLES", 1068, 600, 452, 20, "shape=rectangle;rounded=1;arcSize=8;fillColor=#F0FDF4;strokeColor=#CBD5E1;fontColor=#16A34A;fontSize=8;fontStyle=1;align=center;verticalAlign=middle;");
  const bUcHtml = `<div style="font-size:6.5px;line-height:1.55;color:#0F172A;padding:4px 8px;">
    ✔ <b>Agent querying internal policy documents</b> (RAG)<br/>
    ✔ <b>Agent creating Jira ticket</b> via REST API<br/>
    ✔ <b>Agent collaborating with another agent</b> via A2A<br/>
    ✔ <b>Agent sending email notifications</b> via SMTP<br/>
    ✔ <b>Agent reading data from BigQuery</b> via SQL<br/>
    ✔ <b>Agent invoking custom tool</b> via MCP
  </div>`;
  cell("txt_b_uc", bUcHtml, 1070, 624, 448, 198, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=2;");

  // 6. Abbreviations (x=1068, y=836..954, w=452, h=118)
  cell("box_b_abbr", "", 1068, 836, 452, 118, "rounded=1;arcSize=6;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("lbl_b_abbr", "ABBREVIATIONS", 1068, 838, 452, 14, "text;html=1;strokeColor=none;fillColor=none;fontColor=#64748B;fontSize=7.5;fontStyle=1;align=left;padding=4;");
  const bAbbrHtml = `<div style="font-size:6px;line-height:1.4;color:#0F172A;padding:2px 8px;">
    <b>MCP:</b> Model Context Protocol &nbsp;|&nbsp; <b>A2A:</b> Agent-to-Agent &nbsp;|&nbsp; <b>API:</b> Application Programming Interface<br/>
    <b>SaaS:</b> Software as a Service &nbsp;|&nbsp; <b>DLP:</b> Data Loss Prevention &nbsp;|&nbsp; <b>SLA:</b> Service Level Agreement
  </div>`;
  cell("txt_b_abbr", bAbbrHtml, 1070, 854, 448, 96, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  // ==================== 7. FOOTER LEGEND (y=962, h=24) ====================
  const legendHtml = `<div style='font-size:8px;color:#64748B;display:flex;justify-content:space-between;align-items:center;'>
    <div><b>LEGEND:</b> &nbsp; ━━━━► Synchronous Flow &nbsp;|&nbsp; ┈┈┈► Asynchronous Flow &nbsp;|&nbsp; ───► Protocol Translation &nbsp;|&nbsp; 🟦 Layer &nbsp;|&nbsp; 🟪 Cross-Cutting &nbsp;|&nbsp; 🟥 Risk</div>
    <div>Tool &amp; Protocol Integration Standard &nbsp;|&nbsp; May 8, 2025</div>
  </div>`;
  cell("footer_legend", legendHtml, 16, 962, 1504, 24, "rounded=1;arcSize=8;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=left;verticalAlign=middle;padding=4;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_25_tool_protocol_interaction" name="Template 25: Tool / Protocol Interaction Architecture">
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
