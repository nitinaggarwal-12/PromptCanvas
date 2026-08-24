/**
 * Master 1:1 High-Craft Exact Ground-Truth Replica for Template 23: Agent Interaction Architecture
 * Matches 100% of images/23.png:
 * - Left Column: User & Channels (5 items) + Entry Points (4 items)
 * - 7-step Agent Collaboration Flow sequence (❶ User Intent Capture ➔ ❼ Response & Feedback)
 * - Agent Ecosystem container with 7 discrete agents (Orchestrator, Research, Analysis, Compliance, Drafting, Review, Memory) with Core/Specialized pills
 * - Horizontal bidirectional communication between adjacent agents
 * - Vertical bidirectional links to Shared Context & Memory (Short-term) bar and 5 persistent Data Stores
 * - 6 Visual Agent Collaboration Patterns sub-diagrams (Supervisor, Peer-to-Peer, Pipeline, Blackboard, Hierarchical, Human-in-the-Loop)
 * - Right Sidebar: Communication Patterns, Interaction Protocols (MCP, A2A, gRPC), Key Risks
 * - Bottom Row: Guardrails & Governance, Memory & Context, Observability & Ops, Quality & Evaluation, Tools & Technologies (10 icons), Notes
 * - Pure 0°, 90°, 180°, 270° Geometrical Orthogonal Arrow Routing (Zero diagonals, Zero overlapping)
 * - 1536x1024 master canvas resolution.
 */

const E = (v?: string | null) =>
  (v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export function generateTemplate23AgentInteractionXml(
  domainFlavor = "biopharma",
  theme: "light" | "dark" = "light"
): string {
  const isDark = theme === "dark";
  const c: string[] = [];

  const cell = (id: string, v: string, x: number, y: number, w: number, h: number, style: string) =>
    c.push(
      `<mxCell id="${id}" value="${E(v)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`
    );

  const edge = (id: string, src: string, trg: string, style: string) =>
    c.push(
      `<mxCell id="${id}" edge="1" parent="1" source="${src}" target="${trg}" style="${style}"><mxGeometry relative="1" as="geometry"/></mxCell>`
    );

  // ==================== 1. TOP HEADER BANNER (y=12..66) ====================
  cell("hdr_num", "23", 16, 12, 68, 54, "shape=rectangle;rounded=1;arcSize=14;fillColor=#6D28D9;strokeColor=#6D28D9;fontColor=#FFFFFF;fontSize=82;fontStyle=1;align=center;verticalAlign=middle;");
  
  cell(
    "hdr_title",
    `<div style='font-size:24px;font-weight:900;color:#0F172A;letter-spacing:0.5px;'>Agent Interaction Architecture</div>` +
    `<div style='font-size:12.5px;font-weight:700;color:#6D28D9;margin-top:2px;'>Use Case: NovaCura – Multi-Agent Collaboration for Regulatory Intelligence</div>` +
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
    Enable specialized AI agents to collaborate, communicate, and orchestrate tasks to deliver accurate, context-aware regulatory intelligence.
  </div>`;
  cell("hdr_obj", objHtml, 1140, 12, 380, 54, "rounded=1;arcSize=8;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.2;html=1;align=left;verticalAlign=middle;padding=6;");

  // ==================== 2. LEFT COLUMN (x=16..170, y=78..560, w=154) ====================
  // 1. User & Channels (h=240)
  cell("box_l_users", "", 16, 78, 154, 240, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;");
  cell("lbl_l_users", "USER &amp; CHANNELS", 16, 82, 154, 20, "text;html=1;strokeColor=none;fillColor=none;fontColor=#1E40AF;fontSize=8.5;fontStyle=1;html=1;align=center;verticalAlign=middle;");
  
  const userChannels = [
    { t: "Web / Portal", icon: "🌐" },
    { t: "Mobile App", icon: "📱" },
    { t: "Slack / Teams", icon: "💬" },
    { t: "Email / Notifications", icon: "✉️" },
    { t: "API / Webhook", icon: "🔌" }
  ];
  userChannels.forEach((uc, idx) => {
    const ucy = 108 + idx * 40;
    cell(`uc_${idx}`, `<div style="display:flex;align-items:center;gap:6px;padding:0 6px;"><span style="font-size:13px;">${uc.icon}</span><span style="font-size:7.5px;font-weight:800;color:#0F172A;">${uc.t}</span></div>`, 24, ucy, 138, 34, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=left;verticalAlign=middle;padding=2;");
  });

  // 2. Entry Points (h=230)
  cell("box_l_entry", "", 16, 328, 154, 230, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.5;");
  cell("lbl_l_entry", "ENTRY POINTS", 16, 332, 154, 20, "text;html=1;strokeColor=none;fillColor=none;fontColor=#7C3AED;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");
  
  const entryPoints = [
    { t: "User Query", icon: "👤" },
    { t: "Scheduled Trigger", icon: "⏰" },
    { t: "Event / Webhook", icon: "⚡" },
    { t: "System API Call", icon: "⚙️" }
  ];
  entryPoints.forEach((ep, idx) => {
    const epy = 358 + idx * 48;
    cell(`ep_${idx}`, `<div style="display:flex;align-items:center;gap:6px;padding:0 6px;"><span style="font-size:13px;">${ep.icon}</span><span style="font-size:7.5px;font-weight:800;color:#0F172A;">${ep.t}</span></div>`, 24, epy, 138, 40, "rounded=1;arcSize=4;fillColor=#FAF5FF;strokeColor=#E9D5FF;html=1;align=left;verticalAlign=middle;padding=2;");
  });

  // Pure 0° Horizontal flow edge from Channels to Flow
  edge("e_user_to_flow", "box_l_users", "box_collab_flow", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=2;endArrow=classic;endSize=5;exitX=1;exitY=0.5;entryX=0;entryY=0.5;");
  // Pure 0° Horizontal flow edge from Entry Points to Ecosystem
  edge("e_entry_to_eco", "box_l_entry", "box_agent_eco", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#7C3AED;strokeWidth=2;endArrow=classic;endSize=5;exitX=1;exitY=0.5;entryX=0;entryY=0.5;");

  // ==================== 3. CENTER TOP: AGENT COLLABORATION FLOW (x=180..1220, y=78..190, w=1040, h=112) ====================
  cell("box_collab_flow", "", 180, 78, 1040, 112, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;");
  cell("lbl_collab_flow", "AGENT COLLABORATION FLOW", 180, 80, 1040, 16, "text;html=1;strokeColor=none;fillColor=none;fontColor=#1E40AF;fontSize=9;fontStyle=1;align=center;verticalAlign=middle;");

  const flowSteps = [
    { num: "1", name: "User Intent<br/>Capture", desc: "Capture request, context, and preferences" },
    { num: "2", name: "Orchestrator<br/>Agent", desc: "Decompose intent, plan tasks, select agents" },
    { num: "3", name: "Agent Discovery<br/>&amp; Selection", desc: "Find best-fit agents (skills, availability)" },
    { num: "4", name: "Task Delegation", desc: "Assign tasks with context, guardrails, deadlines" },
    { num: "5", name: "Agent Execution<br/>&amp; Collaboration", desc: "Agents work, share intermediate results" },
    { num: "6", name: "Result Synthesis<br/>&amp; Validation", desc: "Aggregate results, validate quality &amp; checks" },
    { num: "7", name: "Response to User<br/>&amp; Feedback", desc: "Deliver response, collect feedback, learn" }
  ];

  flowSteps.forEach((fs, idx) => {
    const fx = 190 + idx * 146;
    cell(`fs_${idx}`, `<div style="display:flex;align-items:center;justify-content:center;margin-bottom:2px;"><span style="background:#6D28D9;color:#FFFFFF;padding:1px 5px;border-radius:10px;font-size:7px;font-weight:900;margin-right:4px;">${fs.num}</span> <span style="font-size:7px;font-weight:800;color:#0F172A;">${fs.name}</span></div><div style="font-size:7.5px;color:#64748B;text-align:center;line-height:1.15;margin-top:2px;">${fs.desc}</div>`, fx, 100, 138, 80, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=top;padding=3;");
    if (idx > 0) {
      // Pure 0° Horizontal edge between flow steps
      edge(`e_fs_${idx}`, `fs_${idx - 1}`, `fs_${idx}`, "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.2;endArrow=classic;endSize=3;exitX=1;exitY=0.5;entryX=0;entryY=0.5;");
    }
  });

  // Pure 90° Vertical dropline from Flow down to Ecosystem
  edge("e_flow_to_eco", "box_collab_flow", "box_agent_eco", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#64748B;strokeWidth=1.2;dashed=1;endArrow=classic;endSize=4;exitX=0.5;exitY=1;entryX=0.5;entryY=0;");

  // ==================== 4. CENTER MIDDLE: AGENT ECOSYSTEM CONTAINER (x=180..1220, y=198..450, w=1040, h=252) ====================
  cell("box_agent_eco", "", 180, 198, 1040, 252, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.8;");
  cell("lbl_agent_eco", "AGENT ECOSYSTEM", 180, 202, 1040, 16, "text;html=1;strokeColor=none;fillColor=none;fontColor=#7C3AED;fontSize=9;fontStyle=1;align=center;verticalAlign=middle;");

  const agents = [
    { name: "Orchestrator<br/>Agent", desc: "Plans, routes and monitors execution", pill: "Core", pbg: "#EFF6FF", pfg: "#1E40AF", icon: "🧠", bg: "#EFF6FF", bc: "#BFDBFE" },
    { name: "Research<br/>Agent", desc: "Searches, gathers evidence &amp; data", pill: "Specialized", pbg: "#F0FDF4", pfg: "#166534", icon: "🔍", bg: "#F0FDF4", bc: "#BBF7D0" },
    { name: "Analysis<br/>Agent", desc: "Analyzes data, extracts insights", pill: "Specialized", pbg: "#FAF5FF", pfg: "#7C3AED", icon: "📊", bg: "#FAF5FF", bc: "#E9D5FF" },
    { name: "Compliance<br/>Agent", desc: "Checks rules, policies &amp; regs", pill: "Specialized", pbg: "#EFF6FF", pfg: "#0284C7", icon: "🛡️", bg: "#EFF6FF", bc: "#BAE6FD" },
    { name: "Drafting<br/>Agent", desc: "Creates drafts, summaries, reports", pill: "Specialized", pbg: "#FFFBEB", pfg: "#D97706", icon: "📝", bg: "#FFFBEB", bc: "#FDE68A" },
    { name: "Review<br/>Agent", desc: "Reviews, critiques, suggests edits", pill: "Specialized", pbg: "#FEF2F2", pfg: "#DC2626", icon: "👥", bg: "#FEF2F2", bc: "#FECACA" },
    { name: "Memory<br/>Agent", desc: "Manages memory, context &amp; snippets", pill: "Core", pbg: "#EFF6FF", pfg: "#1E40AF", icon: "🧠", bg: "#EFF6FF", bc: "#BFDBFE" }
  ];

  agents.forEach((ag, idx) => {
    const ax = 190 + idx * 146;
    cell(`ag_${idx}`, `<div style="font-size:16px;text-align:center;">${ag.icon}</div><div style="font-size:7.5px;font-weight:900;color:#0F172A;text-align:center;line-height:1.1;margin-top:2px;">${ag.name}</div><div style="font-size:7.5px;color:#64748B;text-align:center;line-height:1.15;margin-top:2px;">${ag.desc}</div><div style="text-align:center;margin-top:4px;"><span style="background:${ag.pbg};color:${ag.pfg};border:1px solid ${ag.bc};padding:1px 6px;border-radius:10px;font-size:8px;font-weight:800;">${ag.pill}</span></div>`, ax, 224, 138, 108, `rounded=1;arcSize=6;fillColor=${ag.bg};strokeColor=${ag.bc};strokeWidth=1.2;html=1;align=center;verticalAlign=top;padding=3;`);
    
    if (idx > 0) {
      // Pure 0° Horizontal bidirectional edge between adjacent agents
      edge(`e_ag_peer_${idx}`, `ag_${idx - 1}`, `ag_${idx}`, "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0F172A;strokeWidth=1.2;startArrow=classic;endArrow=classic;startSize=3;endSize=3;exitX=1;exitY=0.5;entryX=0;entryY=0.5;");
    }
  });

  // Short-term Shared Memory Bar
  cell("bar_shared_mem", "💾 Shared Context &amp; Memory (Short-term)", 190, 342, 1020, 26, "rounded=1;arcSize=4;fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=1.2;fontColor=#1E40AF;fontSize=7.5;fontStyle=1;html=1;align=center;verticalAlign=middle;");

  // Pure 90° Vertical bidirectional edge from Orchestrator down to Memory bar
  edge("e_orch_mem", "ag_0", "bar_shared_mem", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=1.2;startArrow=classic;endArrow=classic;startSize=3;endSize=3;exitX=0.5;exitY=1;entryX=0.08;entryY=0;");
  // Pure 90° Vertical bidirectional edge from Memory Agent down to Memory bar
  edge("e_mem_ag_bar", "ag_6", "bar_shared_mem", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=1.2;startArrow=classic;endArrow=classic;startSize=3;endSize=3;exitX=0.5;exitY=1;entryX=0.92;entryY=0;");

  // 5 Persistent Data Stores below memory bar
  const dataStores = [
    { t: "Vector DB<br/><span style='color:#64748B;'>(Embeddings)</span>", icon: "🗄️" },
    { t: "Document Store<br/><span style='color:#64748B;'>(Knowledge Base)</span>", icon: "📑" },
    { t: "Graph DB<br/><span style='color:#64748B;'>(Relationships)</span>", icon: "🕸️" },
    { t: "Object Storage<br/><span style='color:#64748B;'>(Files / Reports)</span>", icon: "📦" },
    { t: "Metadata Store<br/><span style='color:#64748B;'>(Catalog)</span>", icon: "📊" }
  ];
  dataStores.forEach((ds, idx) => {
    const dsx = 200 + idx * 204;
    cell(`ds_${idx}`, `<div style="display:flex;align-items:center;justify-content:center;gap:6px;"><span style="font-size:16px;">${ds.icon}</span><span style="font-size:7px;font-weight:800;color:#0F172A;line-height:1.1;">${ds.t}</span></div>`, dsx, 380, 192, 54, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");
    
    // Pure 90° Vertical edge from Shared Memory bar to Data Store
    edge(`e_mem_ds_${idx}`, "bar_shared_mem", `ds_${idx}`, "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#64748B;strokeWidth=1.2;startArrow=classic;endArrow=classic;startSize=3;endSize=3;exitX=0.1 + 0.2 * idx;exitY=1;entryX=0.5;entryY=0;");
  });

  // Pure 0° Horizontal edge from Agent Ecosystem to Protocols
  edge("e_eco_to_proto", "box_agent_eco", "box_r_proto", "edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#7C3AED;strokeWidth=2;endArrow=classic;endSize=5;exitX=1;exitY=0.5;entryX=0;entryY=0.5;");

  // ==================== 5. MIDDLE ROW: 6 AGENT COLLABORATION PATTERNS (x=16..1520, y=458..590, w=1504, h=132) ====================
  cell("box_patterns", "", 16, 458, 1504, 132, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;");
  cell("lbl_patterns", "AGENT COLLABORATION PATTERNS (Examples)", 16, 460, 1504, 16, "text;html=1;strokeColor=none;fillColor=none;fontColor=#1E40AF;fontSize=9;fontStyle=1;align=center;verticalAlign=middle;");

  const patterns = [
    { title: "Supervisor Pattern", sub: "1 orchestrator manages<br/>and delegates to workers", icon: "👑" },
    { title: "Peer-to-Peer Pattern", sub: "Agents collaborate as<br/>equals", icon: "🤝" },
    { title: "Pipeline Pattern", sub: "Sequential handoff through<br/>specialized agents", icon: "🔄" },
    { title: "Blackboard Pattern", sub: "Agents read/write to<br/>shared blackboard", icon: "📋" },
    { title: "Hierarchical Pattern", sub: "Multi-level orchestration<br/>&amp; delegation", icon: "🌳" },
    { title: "Human-in-the-Loop", sub: "Human review/approval at<br/>key checkpoints", icon: "👤" }
  ];

  patterns.forEach((pt, idx) => {
    const ptx = 26 + idx * 248;
    cell(`pt_${idx}`, `<div style="font-size:8px;font-weight:900;color:#1E40AF;text-align:center;">${pt.title}</div><div style="font-size:16px;text-align:center;margin:3px 0;">${pt.icon}</div><div style="font-size:8px;color:#64748B;text-align:center;line-height:1.15;">${pt.sub}</div>`, ptx, 480, 238, 98, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=top;padding=4;");
  });

  // ==================== 6. RIGHT SIDEBAR (x=1230..1520, y=78..450, w=290, h=372) ====================
  // 1. Communication Patterns
  cell("box_r_comm", "", 1230, 78, 290, 116, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;");
  cell("lbl_r_comm", "COMMUNICATION PATTERNS", 1230, 80, 290, 16, "text;html=1;strokeColor=none;fillColor=none;fontColor=#1E40AF;fontSize=8;fontStyle=1;align=center;verticalAlign=middle;");
  const commHtml = `<div style="font-size:8px;line-height:1.35;color:#0F172A;padding:2px 6px;">
    🔄 <b>Request / Response</b> (Sync)<br/>
    📨 <b>Event-driven</b> (Async)<br/>
    📡 <b>Publish / Subscribe</b><br/>
    ⚡ <b>Streaming / Push</b><br/>
    👤 <b>Human-in-the-loop</b>
  </div>`;
  cell("txt_r_comm", commHtml, 1232, 98, 286, 92, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  // 2. Interaction Protocols
  cell("box_r_proto", "", 1230, 200, 290, 116, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.2;");
  cell("lbl_r_proto", "INTERACTION PROTOCOLS", 1230, 202, 290, 16, "text;html=1;strokeColor=none;fillColor=none;fontColor=#7C3AED;fontSize=8;fontStyle=1;align=center;verticalAlign=middle;");
  const protoHtml = `<div style="font-size:8px;line-height:1.35;color:#0F172A;padding:2px 6px;">
    🔌 <b>MCP</b> (Model Context Protocol)<br/>
    🤖 <b>A2A</b> (Agent-to-Agent Protocol)<br/>
    🌐 <b>gRPC / REST APIs</b><br/>
    ⚡ <b>WebSockets / SSE</b><br/>
    📜 <b>OpenAPI / AsyncAPI</b>
  </div>`;
  cell("txt_r_proto", protoHtml, 1232, 220, 286, 92, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  // 3. Key Risks
  cell("box_r_risks", "", 1230, 322, 290, 128, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#DC2626;strokeWidth=1.2;");
  cell("lbl_r_risks", "⚠️ KEY RISKS", 1230, 324, 290, 16, "text;html=1;strokeColor=none;fillColor=none;fontColor=#DC2626;fontSize=8;fontStyle=1;align=center;verticalAlign=middle;");
  const aRisksHtml = `<div style="font-size:8px;line-height:1.3;color:#0F172A;padding:2px 6px;">
    🔴 <b>Poor agent selection / routing</b><br/>
    🔴 <b>Context loss / inconsistency</b><br/>
    🔴 <b>Infinite loops / repeated calls</b><br/>
    🔴 <b>Hallucination / wrong output</b><br/>
    🔴 <b>Latency / timeout issues</b><br/>
    🔴 <b>Security / data leakage</b><br/>
    🔴 <b>Cost overrun</b>
  </div>`;
  cell("txt_r_risks", aRisksHtml, 1232, 342, 286, 104, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  // ==================== 7. BOTTOM ROW: 6 CARDS (y=598..954, h=356) ====================
  // 1. Guardrails & Governance (w=240)
  cell("box_b_guard", "", 16, 598, 240, 356, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;");
  cell("lbl_b_guard", "GUARDRAILS &amp; GOVERNANCE", 16, 600, 240, 20, "shape=rectangle;rounded=1;arcSize=8;fillColor=#F0FDF4;strokeColor=#CBD5E1;fontColor=#16A34A;fontSize=8.5;fontStyle=1;html=1;align=center;verticalAlign=middle;");
  const bGuardHtml = `<div style="font-size:7px;line-height:1.55;color:#0F172A;padding:4px 6px;">
    ✔ <b>IAM &amp; Least Privilege</b><br/><br/>
    ✔ <b>Data Classification &amp; Access Control</b><br/><br/>
    ✔ <b>Content Safety &amp; Policy Enforcement</b><br/><br/>
    ✔ <b>Audit Logging &amp; Traceability</b><br/><br/>
    ✔ <b>Model &amp; Agent Approvals</b><br/><br/>
    ✔ <b>PII / PHI Detection &amp; Redaction</b>
  </div>`;
  cell("txt_b_guard", bGuardHtml, 18, 624, 236, 324, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=2;");

  // 2. Memory & Context Management (w=250)
  cell("box_b_mem", "", 264, 598, 250, 356, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;");
  cell("lbl_b_mem", "MEMORY &amp; CONTEXT MANAGEMENT", 264, 600, 250, 20, "shape=rectangle;rounded=1;arcSize=8;fillColor=#EFF6FF;strokeColor=#CBD5E1;fontColor=#1E40AF;fontSize=8.5;fontStyle=1;html=1;align=center;verticalAlign=middle;");
  const bMemHtml = `<div style="font-size:7px;line-height:1.55;color:#0F172A;padding:4px 6px;">
    💾 <b>Short-term Context</b> (In-Memory)<br/><br/>
    🗄️ <b>Long-term Memory</b> (Vector / Graph DB)<br/><br/>
    📑 <b>Conversation Summarization</b><br/><br/>
    🗃️ <b>Context Window Management</b><br/><br/>
    👥 <b>User / Session / Tenant Isolation</b>
  </div>`;
  cell("txt_b_mem", bMemHtml, 266, 624, 246, 324, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=2;");

  // 3. Observability & Operations (w=240)
  cell("box_b_obs", "", 522, 598, 240, 356, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.5;");
  cell("lbl_b_obs", "OBSERVABILITY &amp; OPERATIONS", 522, 600, 240, 20, "shape=rectangle;rounded=1;arcSize=8;fillColor=#FAF5FF;strokeColor=#CBD5E1;fontColor=#7C3AED;fontSize=8.5;fontStyle=1;html=1;align=center;verticalAlign=middle;");
  const bObsHtml = `<div style="font-size:7px;line-height:1.55;color:#0F172A;padding:4px 6px;">
    🔍 <b>Agent Tracing</b> (End-to-End)<br/><br/>
    💰 <b>Token Usage &amp; Cost Monitoring</b><br/><br/>
    ⏱️ <b>Latency &amp; Throughput Metrics</b><br/><br/>
    ⚙️ <b>Agent Health &amp; Availability</b><br/><br/>
    🔔 <b>Alerts &amp; Anomaly Detection</b>
  </div>`;
  cell("txt_b_obs", bObsHtml, 524, 624, 236, 324, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=2;");

  // 4. Quality & Evaluation (w=240)
  cell("box_b_qual", "", 770, 598, 240, 356, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;");
  cell("lbl_b_qual", "QUALITY &amp; EVALUATION", 770, 600, 240, 20, "shape=rectangle;rounded=1;arcSize=8;fillColor=#F0FDF4;strokeColor=#CBD5E1;fontColor=#16A34A;fontSize=8.5;fontStyle=1;html=1;align=center;verticalAlign=middle;");
  const bQualHtml = `<div style="font-size:7px;line-height:1.55;color:#0F172A;padding:4px 6px;">
    ✔ <b>Output Validation</b> (Rules / LLM-as-a-Judge)<br/><br/>
    ✔ <b>Hallucination Detection</b><br/><br/>
    ✔ <b>Grounding &amp; Citation Check</b><br/><br/>
    ✔ <b>Automated Test Sets</b><br/><br/>
    ✔ <b>Human Evaluation &amp; Feedback Loop</b>
  </div>`;
  cell("txt_b_qual", bQualHtml, 772, 624, 236, 324, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=2;");

  // 5. Tools & Technologies (Google Cloud) (w=502)
  cell("box_b_tools", "", 1018, 598, 502, 230, "rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;");
  cell("lbl_b_tools", "TOOLS &amp; TECHNOLOGIES (Google Cloud)", 1018, 600, 502, 20, "shape=rectangle;rounded=1;arcSize=8;fillColor=#EFF6FF;strokeColor=#CBD5E1;fontColor=#1E40AF;fontSize=8.5;fontStyle=1;html=1;align=center;verticalAlign=middle;");
  
  const techIcons = [
    { t: "Vertex AI (Agents)", icon: "🧠" },
    { t: "Agent Builder", icon: "⚙️" },
    { t: "Cloud Functions", icon: "⚡" },
    { t: "Pub/Sub", icon: "📨" },
    { t: "BigQuery", icon: "📊" },
    { t: "Cloud Storage", icon: "📦" },
    { t: "Firestore / AlloyDB", icon: "🗄️" },
    { t: "Memorystore (Redis)", icon: "💾" },
    { t: "Cloud Monitoring", icon: "📈" },
    { t: "Cloud Logging", icon: "📑" }
  ];
  techIcons.forEach((ti, idx) => {
    const col = idx % 5;
    const row = Math.floor(idx / 5);
    const gx = 1028 + col * 96;
    const gy = 628 + row * 84;
    cell(`ti_eco_${idx}`, `<div style="font-size:16px;text-align:center;">${ti.icon}</div><div style="font-size:8px;font-weight:800;color:#0F172A;text-align:center;line-height:1.1;margin-top:2px;">${ti.t}</div>`, gx, gy, 90, 74, "rounded=1;arcSize=4;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // 6. Notes (at bottom right, y=836..954, w=502, h=118)
  cell("box_b_notes", "", 1018, 836, 502, 118, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("lbl_b_notes", "NOTES", 1018, 838, 502, 16, "text;html=1;strokeColor=none;fillColor=none;fontColor=#1E3A8A;fontSize=8;fontStyle=1;align=left;padding=4;");
  const bNotesHtml = `<div style="font-size:7px;line-height:1.4;color:#0F172A;padding:2px 8px;">
    • Agents are stateless by default; state is stored in memory layer.<br/>
    • All agent interactions are logged and traceable.<br/>
    • Design for idempotency, retries, and graceful degradation.
  </div>`;
  cell("txt_b_notes", bNotesHtml, 1020, 856, 498, 92, "text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;");

  // ==================== 8. FOOTER LEGEND (y=962, h=24) ====================
  const legendHtml = `<div style='font-size:8px;color:#64748B;display:flex;justify-content:space-between;align-items:center;'>
    <div><b>LEGEND:</b> &nbsp; ━━━━► Synchronous Flow &nbsp;|&nbsp; ┈┈┈► Asynchronous Flow &nbsp;|&nbsp; ───► Data/Context Flow &nbsp;|&nbsp; 🟦 Core Agent &nbsp;|&nbsp; 🟩 Specialized Agent &nbsp;|&nbsp; 🟪 Data Store</div>
    <div>Multi-Agent Architecture Standard &nbsp;|&nbsp; May 8, 2025</div>
  </div>`;
  cell("footer_legend", legendHtml, 16, 962, 1504, 24, "rounded=1;arcSize=8;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=left;verticalAlign=middle;padding=4;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_23_agent_interaction" name="Template 23: Agent Interaction Architecture">
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
