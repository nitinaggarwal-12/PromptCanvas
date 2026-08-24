/**
 * Canonical Architecture Template 23: Agent Interaction Architecture
 * Exact 1:1 High-Fidelity Master Blueprint of images/23.png
 */

export function generateTemplate23AgentInteractionXml(
  flavor: string = "biopharma",
  theme: "dark" | "light" = "light"
): string {
  const isDark = theme === "dark";
  const E = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const c: string[] = [];
  let idCounter = 100;
  const nid = () => `c_${idCounter++}`;

  const rect = (id: string, val: string, x: number, y: number, w: number, h: number, style: string) => {
    c.push(
      `<mxCell id="${id}" value="${E(val)}" style="rounded=1;whiteSpace=wrap;html=1;${style}" vertex="1" parent="1">` +
      `<mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/>` +
      `</mxCell>`
    );
  };

  const edge = (id: string, val: string, src: string, tgt: string, style: string, pts: Array<{x: number, y: number}> = []) => {
    let ptsXml = "";
    if (pts.length > 0) {
      ptsXml = `<Array as="points">${pts.map(p => `<mxPoint x="${p.x}" y="${p.y}"/>`).join("")}</Array>`;
    }
    c.push(
      `<mxCell id="${id}" value="${E(val)}" edge="1" parent="1" source="${src}" target="${tgt}" style="rounded=1;html=1;${style}">` +
      `<mxGeometry relative="1" as="geometry">${ptsXml}</mxGeometry>` +
      `</mxCell>`
    );
  };

  // 1. BRAND HEADER & METADATA
  rect("num_badge", "23", 20, 16, 48, 48, "fillColor=#1E3A8A;fontColor=#FFFFFF;fontSize=24;fontStyle=1;rounded=1;align=center;verticalAlign=middle;");
  rect("hdr_title", "<div style='font-size:22px;font-weight:800;color:#0F172A;letter-spacing:0.5px;'>Agent Interaction Architecture</div><div style='font-size:11px;color:#1E3A8A;font-weight:700;margin-top:2px;'>Use Case: NovaCura – Multi-Agent Collaboration for Regulatory Intelligence &nbsp;|&nbsp; Environment: Production &nbsp;|&nbsp; Region: us-central1 &nbsp;|&nbsp; Last Updated: May 8, 2025</div>", 78, 16, 840, 48, "strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=10;");
  rect("hdr_brand", "<div style='text-align:right;'><span style='font-size:20px;font-weight:800;color:#0284C7;'>🧬 NOVACURA</span><br/><span style='font-size:9.5px;color:#64748B;font-style:italic;'>AI-Powered Regulatory Intelligence Platform</span></div>", 940, 16, 280, 48, "strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

  // Objective Card
  rect("card_obj", "<div style='font-size:8.5px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>OBJECTIVE</div><div style='font-size:10px;line-height:1.35;color:#0F172A;'>Enable specialized AI agents to collaborate, communicate, and orchestrate tasks to deliver accurate, context-aware regulatory intelligence.</div>", 1240, 16, 320, 48, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=4;");

  // 2. LEFT COLUMN: USER & CHANNELS + ENTRY POINTS (x=20..115, y=72..410)
  rect("box_channels", "", 20, 72, 95, 175, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;rounded=1;");
  rect("lbl_channels", "<span style='font-size:9px;font-weight:800;color:#2563EB;'>USER &amp; CHANNELS</span>", 20, 75, 95, 12, "strokeColor=none;fillColor=none;align=center;");

  const chs = [
    { t: "Web / Portal", icon: "💻" },
    { t: "Mobile App", icon: "📱" },
    { t: "Slack / Teams", icon: "💬" },
    { t: "Email / Alerts", icon: "📨" },
    { t: "API / Webhook", icon: "🔌" }
  ];
  chs.forEach((ch, idx) => {
    const cy = 92 + idx * 30;
    rect(`ch_${idx}`, `<div style='font-size:8px;font-weight:700;'>${ch.icon} ${ch.t}</div>`, 25, cy, 85, 24, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=middle;padding=2;");
  });

  rect("box_entry", "", 20, 255, 95, 155, "fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.2;rounded=1;");
  rect("lbl_entry", "<span style='font-size:9px;font-weight:800;color:#7C3AED;'>ENTRY POINTS</span>", 20, 258, 95, 12, "strokeColor=none;fillColor=none;align=center;");

  const entries = [
    { t: "User Query", icon: "👤" },
    { t: "Scheduled Trigger", icon: "⏱️" },
    { t: "Event / Webhook", icon: "⚡" },
    { t: "System API Call", icon: "⚙️" }
  ];
  entries.forEach((en, idx) => {
    const ey = 274 + idx * 32;
    rect(`en_${idx}`, `<div style='font-size:8px;font-weight:700;'>${en.icon} ${en.t}</div>`, 25, ey, 85, 26, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=middle;padding=2;");
  });

  // 3. CENTER: AGENT COLLABORATION FLOW 1..7 (x=122..1310, y=72..410)
  rect("box_flow_main", "", 122, 72, 1180, 75, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;rounded=1;");
  rect("lbl_flow_main", "<span style='font-size:10px;font-weight:800;color:#2563EB;'>AGENT COLLABORATION FLOW</span>", 122, 74, 1180, 12, "strokeColor=none;fillColor=none;align=center;");

  const flowSteps = [
    { n: "1", t: "User Intent Capture", sub: "Capture request, context, and preferences" },
    { n: "2", t: "Orchestrator Agent", sub: "Decompose intent, plan tasks, select agents" },
    { n: "3", t: "Agent Discovery &amp; Sel", sub: "Find best-fit agents (skills, availability)" },
    { n: "4", t: "Task Delegation", sub: "Assign tasks with context, guardrails" },
    { n: "5", t: "Agent Execution &amp; Collab", sub: "Agents work, share intermediate results" },
    { n: "6", t: "Result Synthesis &amp; Val", sub: "Aggregate results, validate quality, checks" },
    { n: "7", t: "Response &amp; Feedback", sub: "Deliver response, collect feedback, improve" }
  ];
  flowSteps.forEach((fs, idx) => {
    const fx = 128 + idx * 167;
    rect(`fs_${idx}`, `<div style='font-size:9px;font-weight:800;color:#1E3A8A;text-align:center;'>${fs.n} ${fs.t}</div><div style='font-size:10px;color:#64748B;text-align:center;line-height:1.2;margin-top:1px;'>${fs.sub}</div>`, fx, 88, 160, 52, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=center;verticalAlign=middle;padding=2;");
  });

  // Agent Ecosystem Container (x=122..1310, y=152..315)
  rect("box_eco", "", 122, 152, 1180, 163, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;");
  rect("lbl_eco", "<span style='font-size:10px;font-weight:800;color:#1E3A8A;'>AGENT ECOSYSTEM</span>", 122, 154, 1180, 12, "strokeColor=none;fillColor=none;align=center;");

  const agents = [
    { t: "Orchestrator Agent", sub: "Plans, routes and monitors execution", tag: "Core", col: "#1E3A8A", bg: "#EFF6FF", icon: "🧠" },
    { t: "Research Agent", sub: "Searches, gathers evidence &amp; data", tag: "Specialized", col: "#16A34A", bg: "#F0FDF4", icon: "🔍" },
    { t: "Analysis Agent", sub: "Analyzes data, extracts insights", tag: "Specialized", col: "#7C3AED", bg: "#FAF5FF", icon: "📊" },
    { t: "Compliance Agent", sub: "Checks rules, policies &amp; regs", tag: "Specialized", col: "#0D9488", bg: "#F0FDFA", icon: "🛡️" },
    { t: "Drafting Agent", sub: "Creates drafts, summaries, reports", tag: "Specialized", col: "#D97706", bg: "#FFFBEB", icon: "✍️" },
    { t: "Review Agent", sub: "Reviews, critiques, suggests edits", tag: "Specialized", col: "#DC2626", bg: "#FEF2F2", icon: "🔬" },
    { t: "Memory Agent", sub: "Manages memory, context &amp; snippets", tag: "Core", col: "#2563EB", bg: "#EFF6FF", icon: "🗄️" }
  ];
  agents.forEach((ag, idx) => {
    const ax = 128 + idx * 167;
    rect(`ag_${idx}`, `<div style='font-size:10px;text-align:center;'>${ag.icon}</div><div style='font-size:9px;font-weight:800;color:${ag.col};text-align:center;'>${ag.t}</div><div style='font-size:10px;color:#64748B;text-align:center;line-height:1.2;margin-top:1px;'>${ag.sub}</div><div style='text-align:center;margin-top:3px;'><span style='background:${ag.bg};border:1px solid ${ag.col};color:${ag.col};font-size:10px;padding:1px 3px;border-radius:2px;font-weight:700;'>${ag.tag}</span></div>`, ax, 168, 160, 80, `fillColor=#FFFFFF;strokeColor=${ag.col};rounded=1;align=center;verticalAlign=middle;padding=2;`);
  });

  rect("eco_shared_ctx", "<div style='font-size:9px;font-weight:800;color:#1E3A8A;text-align:center;'>🗄️ Shared Context &amp; Memory (Short-term)</div>", 128, 252, 1166, 18, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=center;verticalAlign=middle;");

  // Data Stores
  const stores = [
    { t: "Vector DB", sub: "(Embeddings)", icon: "🗄️" },
    { t: "Document Store", sub: "(Knowledge Base)", icon: "📑" },
    { t: "Graph DB", sub: "(Relationships)", icon: "🕸️" },
    { t: "Object Storage", sub: "(Files / Reports)", icon: "🗃️" },
    { t: "Metadata Store", sub: "(Catalog)", icon: "📋" }
  ];
  stores.forEach((st, idx) => {
    const sx = 128 + idx * 235;
    rect(`st_box_${idx}`, `<div style='font-size:9px;font-weight:700;text-align:center;'>${st.icon} ${st.t} <span style='color:#64748B;font-size:8px;'>${st.sub}</span></div>`, sx, 274, 226, 34, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=2;");
  });

  // Collaboration Patterns Strip (x=122..1310, y=320..410)
  rect("box_pats", "", 122, 320, 1180, 90, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;");
  rect("lbl_pats", "<span style='font-size:9px;font-weight:800;color:#1E3A8A;'>AGENT COLLABORATION PATTERNS (Examples)</span>", 122, 322, 1180, 10, "strokeColor=none;fillColor=none;align=center;");

  const pats = [
    { t: "Supervisor Pattern", sub: "1 orchestrator manages &amp; delegates to workers", icon: "👑" },
    { t: "Peer-to-Peer Pattern", sub: "Agents collaborate as equals", icon: "👥" },
    { t: "Pipeline Pattern", sub: "Sequential handoff through specialized agents", icon: "🔄" },
    { t: "Blackboard Pattern", sub: "Agents read/write to shared blackboard", icon: "📋" },
    { t: "Hierarchical Pattern", sub: "Multi-level orchestration &amp; delegation", icon: "🌳" },
    { t: "Human-in-the-Loop", sub: "Human review/approval at key checkpoints", icon: "👤" }
  ];
  pats.forEach((pt, idx) => {
    const px = 128 + idx * 195;
    rect(`pat_${idx}`, `<div style='font-size:8px;text-align:center;'>${pt.icon}</div><div style='font-size:8px;font-weight:800;color:#1E3A8A;text-align:center;'>${pt.t}</div><div style='font-size:10px;color:#64748B;text-align:center;line-height:1.2;margin-top:1px;'>${pt.sub}</div>`, px, 334, 188, 70, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=2;");
  });

  // 4. FAR RIGHT: COMMUNICATION PATTERNS, PROTOCOLS, RISKS (x=1316..1560, y=72..410)
  rect("box_r_comm", "<div style='font-size:9px;font-weight:800;color:#2563EB;margin-bottom:1px;'>COMMUNICATION PATTERNS</div><div style='font-size:8px;line-height:1.3;color:#0F172A;'>🔄 <b>Request / Response (Sync)</b><br/>⚡ <b>Event-driven (Async)</b><br/>📨 <b>Publish / Subscribe</b><br/>📡 <b>Streaming / Push</b><br/>👤 <b>Human-in-the-loop</b></div>", 1316, 72, 244, 100, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  rect("box_r_proto", "<div style='font-size:9px;font-weight:800;color:#7C3AED;margin-bottom:1px;'>INTERACTION PROTOCOLS</div><div style='font-size:8px;line-height:1.3;color:#0F172A;'>🔌 <b>MCP</b> (Model Context Protocol)<br/>🤝 <b>A2A</b> (Agent-to-Agent Protocol)<br/>⚡ <b>gRPC / REST APIs</b><br/>🌐 <b>WebSockets / SSE</b><br/>📜 <b>OpenAPI / AsyncAPI</b></div>", 1316, 176, 244, 100, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  rect("box_r_risks", "<div style='font-size:9px;font-weight:800;color:#DC2626;margin-bottom:1px;'>KEY RISKS</div><div style='font-size:8px;line-height:1.3;color:#0F172A;'>⚠️ Poor agent selection / routing<br/>⚠️ Context loss / inconsistency<br/>⚠️ Infinite loops / repeated calls<br/>⚠️ Hallucination / wrong output<br/>⚠️ Latency / timeout issues<br/>⚠️ Security / data leakage<br/>⚠️ Cost overrun</div>", 1316, 280, 244, 130, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  // 5. BOTTOM ROW: GUARDRAILS, MEMORY, OPS, EVAL, TOOLS, NOTES (x=20..1560, y=546..740)
  rect("bot_guard", "<div style='font-size:10px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>GUARDRAILS &amp; GOVERNANCE</div><div style='font-size:8px;line-height:1.35;color:#0F172A;'>✔ IAM &amp; Least Privilege<br/>✔ Data Classification &amp; Access Control<br/>✔ Content Safety &amp; Policy Enforcement<br/>✔ Audit Logging &amp; Traceability<br/>✔ Model &amp; Agent Approvals<br/>✔ PII / PHI Detection &amp; Redaction</div>", 20, 546, 250, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("bot_mem", "<div style='font-size:10px;font-weight:800;color:#2563EB;margin-bottom:2px;'>MEMORY &amp; CONTEXT MANAGEMENT</div><div style='font-size:8px;line-height:1.35;color:#0F172A;'>🗄️ <b>Short-term Context</b> (In-Memory)<br/>📊 <b>Long-term Memory</b> (Vector / Graph DB)<br/>💬 <b>Conversation Summarization</b><br/>🔍 <b>Context Window Management</b><br/>🔒 <b>User / Session / Tenant Isolation</b></div>", 280, 546, 250, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("bot_ops", "<div style='font-size:10px;font-weight:800;color:#7C3AED;margin-bottom:2px;'>OBSERVABILITY &amp; OPERATIONS</div><div style='font-size:8px;line-height:1.35;color:#0F172A;'>⏱️ <b>Agent Tracing</b> (End-to-End)<br/>💰 <b>Token Usage &amp; Cost Monitoring</b><br/>⚡ <b>Latency &amp; Throughput Metrics</b><br/>🩺 <b>Agent Health &amp; Availability</b><br/>🔔 <b>Alerts &amp; Anomaly Detection</b></div>", 540, 546, 240, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("bot_eval", "<div style='font-size:10px;font-weight:800;color:#16A34A;margin-bottom:2px;'>QUALITY &amp; EVALUATION</div><div style='font-size:8px;line-height:1.35;color:#0F172A;'>✔ <b>Output Validation</b> (Rules / LLM-as-a-Judge)<br/>✔ <b>Hallucination Detection</b><br/>✔ <b>Grounding &amp; Citation Check</b><br/>✔ <b>Automated Test Sets</b><br/>✔ <b>Human Evaluation &amp; Feedback Loop</b></div>", 790, 546, 240, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("bot_tools", "<div style='font-size:10px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>TOOLS &amp; TECHNOLOGIES (Google Cloud)</div><div style='font-size:8px;line-height:1.35;color:#0F172A;'>🧠 <b>Vertex AI (Agents)</b><br/>⚡ <b>Cloud Functions</b><br/>📊 <b>BigQuery</b><br/>🗃️ <b>Cloud Storage</b><br/>🤖 <b>Agent Builder</b><br/>📨 <b>Pub/Sub</b><br/>🗄️ <b>Firestore / AlloyDB</b><br/>📑 <b>Cloud Monitoring / Logging</b></div>", 1040, 546, 240, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("bot_notes", "<div style='font-size:10px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>NOTES</div><div style='font-size:8px;line-height:1.35;color:#64748B;'>• Agents are stateless by default; state is stored in memory layer.<br/>• All agent interactions are logged and traceable.<br/>• Design for idempotency, retries, and graceful degradation.</div>", 1290, 546, 270, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  // 6. FOOTER METADATA STRIP (x=20..1560, y=744..768)
  rect("footer_meta", "<div style='font-size:9px;color:#0F172A;display:flex;justify-content:space-between;align-items:center;'><div>Version: 1.0</div><div>Date: May 2024</div></div>", 20, 744, 1540, 24, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=middle;padding=3;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_23_agent_interaction_architecture" name="Template 23: Agent Interaction Architecture">
    <mxGraphModel dx="1600" dy="780" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="780" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${c.join("\n        ")}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
