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
  rect("num_badge", "23", 20, 20, 48, 48, "fillColor=#1E3A8A;fontColor=#FFFFFF;fontSize=24;fontStyle=1;rounded=1;align=center;verticalAlign=middle;");
  rect("hdr_title", "<div style='font-size:24px;font-weight:800;color:#0F172A;letter-spacing:0.5px;'>Agent Interaction Architecture</div><div style='font-size:11px;color:#1E3A8A;font-weight:700;margin-top:3px;'>Use Case: NovaCura – Multi-Agent Collaboration for Regulatory Intelligence &nbsp;|&nbsp; Environment: Production &nbsp;|&nbsp; Region: us-central1 &nbsp;|&nbsp; Last Updated: May 8, 2025</div>", 78, 16, 850, 56, "strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  rect("hdr_brand", "<div style='text-align:right;'><span style='font-size:20px;font-weight:800;color:#0284C7;'>🧬 NOVACURA</span><br/><span style='font-size:9.5px;color:#64748B;font-style:italic;'>AI-Powered Regulatory Intelligence Platform</span></div>", 940, 18, 280, 45, "strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

  // Objective Card
  rect("card_obj", "<div style='font-size:12px;font-weight:800;color:#1E3A8A;margin-bottom:3px;'>OBJECTIVE</div><div style='font-size:11.5px;line-height:1.4;color:#0F172A;'>Enable specialized AI agents to collaborate, communicate, and orchestrate tasks to deliver accurate, context-aware regulatory intelligence.</div>", 1240, 18, 320, 52, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=6;");

  // 2. LEFT COLUMN 1: USER & CHANNELS (x=20..140, y=78..265)
  rect("box_chan", "", 20, 78, 120, 185, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;");
  rect("lbl_chan", "<span style='font-size:11.5px;font-weight:800;color:#1E3A8A;'>USER &amp; CHANNELS</span>", 20, 82, 120, 14, "strokeColor=none;fillColor=none;align=center;");
  const channels = [
    { icon: "🌐", t: "Web / Portal" },
    { icon: "📱", t: "Mobile App" },
    { icon: "💬", t: "Slack / Teams" },
    { icon: "✉️", t: "Email / Alerts" },
    { icon: "🔌", t: "API / Webhook" }
  ];
  channels.forEach((ch, idx) => {
    rect(`chan_${idx}`, `<div style='font-size:9.5px;font-weight:700;'>${ch.icon} ${ch.t}</div>`, 26, 100 + idx * 31, 108, 27, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  });

  // LEFT COLUMN 2: ENTRY POINTS (x=20..140, y=270..455)
  rect("box_ent", "", 20, 270, 120, 185, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;");
  rect("lbl_ent", "<span style='font-size:11.5px;font-weight:800;color:#1E3A8A;'>ENTRY POINTS</span>", 20, 274, 120, 14, "strokeColor=none;fillColor=none;align=center;");
  const entries = [
    { icon: "👤", t: "User Query" },
    { icon: "⏱️", t: "Scheduled Trigger" },
    { icon: "📡", t: "Event / Webhook" },
    { icon: "⚙️", t: "System API Call" }
  ];
  entries.forEach((en, idx) => {
    rect(`ent_${idx}`, `<div style='font-size:9.5px;font-weight:700;'>${en.icon} ${en.t}</div>`, 26, 296 + idx * 36, 108, 32, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  });

  // 3. CENTER OUTER CONTAINER: AGENT COLLABORATION FLOW (x=148..1280, y=78..455)
  rect("box_flow", "", 148, 78, 1132, 377, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;rounded=1;");
  rect("lbl_flow", "<span style='font-size:8.5px;font-weight:800;color:#2563EB;'>AGENT COLLABORATION FLOW</span>", 148, 82, 1132, 16, "strokeColor=none;fillColor=none;align=center;");

  const steps = [
    { n: "1", t: "User Intent Capture", s: "Capture request, context, and preferences", x: 156 },
    { n: "2", t: "Orchestrator Agent", s: "Decompose intent, plan tasks, select agents", x: 316 },
    { n: "3", t: "Agent Discovery & Sel", s: "Find best-fit agents (skills, availability)", x: 476 },
    { n: "4", t: "Task Delegation", s: "Assign tasks with context, guardrails", x: 636 },
    { n: "5", t: "Agent Execution & Collab", s: "Agents work, share intermediate results", x: 796 },
    { n: "6", t: "Result Synthesis & Val", s: "Aggregate results, validate quality, checks", x: 956 },
    { n: "7", t: "Response & Feedback", s: "Deliver response, collect feedback, improve", x: 1116 }
  ];
  steps.forEach((st, idx) => {
    rect(`st_${idx}`, `<div style='font-size:11px;font-weight:800;color:#1E3A8A;'>❶❷❸❹❺❻❼'[idx]} ${st.t}</div><div style='font-size:9px;color:#64748B;margin-top:2px;'>${st.s}</div>`, st.x, 102, 154, 52, "fillColor=#EFF6FF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=3;");
  });

  // AGENT ECOSYSTEM BOX (y=162..445)
  rect("box_eco", "", 156, 162, 1116, 285, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;");
  rect("lbl_eco", "<span style='font-size:12px;font-weight:800;color:#1E3A8A;'>AGENT ECOSYSTEM</span>", 156, 166, 1116, 14, "strokeColor=none;fillColor=none;align=center;");

  const agents = [
    { t: "Orchestrator Agent", sub: "Plans, routes and monitors execution", tag: "Core", col: "#1E3A8A", bg: "#EFF6FF", icon: "🧠", x: 168 },
    { t: "Research Agent", sub: "Searches, gathers evidence &amp; data", tag: "Specialized", col: "#16A34A", bg: "#F0FDF4", icon: "🔍", x: 326 },
    { t: "Analysis Agent", sub: "Analyzes data, extracts insights", tag: "Specialized", col: "#7C3AED", bg: "#F5F3FF", icon: "📊", x: 484 },
    { t: "Compliance Agent", sub: "Checks rules, policies &amp; regs", tag: "Specialized", col: "#0D9488", bg: "#F0FDFA", icon: "🛡️", x: 642 },
    { t: "Drafting Agent", sub: "Creates drafts, summaries, reports", tag: "Specialized", col: "#D97706", bg: "#FFFBEB", icon: "📑", x: 800 },
    { t: "Review Agent", sub: "Reviews, critiques, suggests edits", tag: "Specialized", col: "#DB2777", bg: "#FDF2F8", icon: "✍️", x: 958 },
    { t: "Memory Agent", sub: "Manages memory, context &amp; snippets", tag: "Core", col: "#2563EB", bg: "#EFF6FF", icon: "💾", x: 1116 }
  ];

  agents.forEach((ag, idx) => {
    rect(`ag_${idx}`, `<div style='font-size:11px;font-weight:800;color:${ag.col};'>${ag.icon} ${ag.t}</div><div style='font-size:9px;color:#64748B;margin:3px 0;'>${ag.sub}</div><div style='font-size:8.5px;font-weight:800;background:#FFFFFF;border:1px solid ${ag.col};color:${ag.col};padding:1px 4px;display:inline-block;border-radius:3px;'>${ag.tag}</div>`, ag.x, 185, 150, 80, `fillColor=${ag.bg};strokeColor=${ag.col};strokeWidth=1;rounded=1;align=center;verticalAlign=middle;padding=3;`);
  });

  // Shared Context & Memory Bar
  rect("bar_mem", "<div style='font-size:11px;font-weight:800;color:#1E3A8A;'>🗄️ Shared Context &amp; Memory (Short-term)</div>", 168, 275, 1098, 28, "fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=1;rounded=1;align=center;verticalAlign=middle;");

  // 5 Data Stores
  const dStores = [
    { icon: "🗄️", t: "Vector DB", s: "(Embeddings)", x: 168, w: 200 },
    { icon: "📑", t: "Document Store", s: "(Knowledge Base)", x: 390, w: 210 },
    { icon: "🕸️", t: "Graph DB", s: "(Relationships)", x: 620, w: 210 },
    { icon: "📦", t: "Object Storage", s: "(Files / Reports)", x: 850, w: 200 },
    { icon: "📋", t: "Metadata Store", s: "(Catalog)", x: 1070, w: 196 }
  ];
  dStores.forEach((ds, idx) => {
    rect(`ds_${idx}`, `<div style='font-size:10.5px;font-weight:700;'>${ds.icon} ${ds.t}<br/><span style='font-size:9px;color:#64748B;'>${ds.s}</span></div>`, ds.x, 312, ds.w, 40, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  });

  // 4. FAR RIGHT COLUMN: PROTOCOLS & RISKS (x=1290..1560, y=78..455)
  rect("box_r_comm", "<div style='font-size:11px;font-weight:800;color:#1E3A8A;margin-bottom:3px;'>COMMUNICATION PATTERNS</div><div style='font-size:9px;line-height:1.45;color:#0F172A;'>🔄 Request / Response (Sync)<br/>📡 Event-driven (Async)<br/>📢 Publish / Subscribe<br/>⚡ Streaming / Push<br/>👤 Human-in-the-loop</div>", 1290, 78, 270, 115, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");
  rect("box_r_proto", "<div style='font-size:11px;font-weight:800;color:#2563EB;margin-bottom:3px;'>INTERACTION PROTOCOLS</div><div style='font-size:9px;line-height:1.45;color:#0F172A;'>🔌 <b>MCP</b> (Model Context Protocol)<br/>🤝 <b>A2A</b> (Agent-to-Agent Protocol)<br/>🌐 <b>gRPC / REST APIs</b><br/>⚡ <b>WebSockets / SSE</b><br/>📑 <b>OpenAPI / AsyncAPI</b></div>", 1290, 198, 270, 115, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");
  rect("box_r_risks", "<div style='font-size:11px;font-weight:800;color:#DC2626;margin-bottom:3px;'>⚠️ KEY RISKS</div><div style='font-size:9px;line-height:1.45;color:#0F172A;'>🔴 Poor agent selection / routing<br/>🔴 Context loss / inconsistency<br/>🔴 Infinite loops / repeated calls<br/>🔴 Hallucination / wrong output<br/>🔴 Latency / timeout issues<br/>🔴 Security / data leakage<br/>🔴 Cost overrun</div>", 1290, 318, 270, 137, "fillColor=#FEF2F2;strokeColor=#FECACA;rounded=1;align=left;verticalAlign=top;padding=4;");

  // 5. MIDDLE ROW: AGENT COLLABORATION PATTERNS (x=20..1560, y=462..585)
  rect("box_pats", "", 20, 462, 1540, 125, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;");
  rect("lbl_pats", "<span style='font-size:11.5px;font-weight:800;color:#1E3A8A;'>AGENT COLLABORATION PATTERNS (Examples)</span>", 20, 466, 1540, 14, "strokeColor=none;fillColor=none;align=center;");

  const patterns = [
    { t: "Supervisor Pattern", desc: "1 orchestrator manages &amp; delegates to workers", x: 30, w: 235 },
    { t: "Peer-to-Peer Pattern", desc: "Agents collaborate as equals", x: 280, w: 235 },
    { t: "Pipeline Pattern", desc: "Sequential handoff through specialized agents", x: 530, w: 235 },
    { t: "Blackboard Pattern", desc: "Agents read/write to shared blackboard", x: 780, w: 235 },
    { t: "Hierarchical Pattern", desc: "Multi-level orchestration &amp; delegation", x: 1030, w: 235 },
    { t: "Human-in-the-Loop", desc: "Human review/approval at key checkpoints", x: 1280, w: 265 }
  ];
  patterns.forEach((pat, idx) => {
    rect(`pat_${idx}`, `<div style='font-size:11px;font-weight:800;color:#1E3A8A;'>${pat.t}</div><div style='font-size:9px;color:#64748B;margin-top:2px;'>${pat.desc}</div>`, pat.x, 485, pat.w, 92, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=4;");
  });

  // 6. BOTTOM ROW: 5 PANELS & NOTES (x=20..1560, y=595..775)
  rect("bot_p1", "<div style='font-size:11.5px;font-weight:800;color:#16A34A;margin-bottom:3px;'>GUARDRAILS &amp; GOVERNANCE</div><div style='font-size:9.5px;line-height:1.5;color:#0F172A;'>✔ IAM &amp; Least Privilege<br/>✔ Data Classification &amp; Access Control<br/>✔ Content Safety &amp; Policy Enforcement<br/>✔ Audit Logging &amp; Traceability<br/>✔ Model &amp; Agent Approvals<br/>✔ PII / PHI Detection &amp; Redaction</div>", 20, 595, 230, 180, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");
  rect("bot_p2", "<div style='font-size:11.5px;font-weight:800;color:#2563EB;margin-bottom:3px;'>MEMORY &amp; CONTEXT MANAGEMENT</div><div style='font-size:9.5px;line-height:1.5;color:#0F172A;'>💾 Short-term Context (In-Memory)<br/>🗄️ Long-term Memory (Vector / Graph DB)<br/>📑 Conversation Summarization<br/>🔍 Context Window Management<br/>👤 User / Session / Tenant Isolation</div>", 260, 595, 230, 180, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");
  rect("bot_p3", "<div style='font-size:11.5px;font-weight:800;color:#7C3AED;margin-bottom:3px;'>OBSERVABILITY &amp; OPERATIONS</div><div style='font-size:9.5px;line-height:1.5;color:#0F172A;'>⏱️ Agent Tracing (End-to-End)<br/>💰 Token Usage &amp; Cost Monitoring<br/>📈 Latency &amp; Throughput Metrics<br/>🩺 Agent Health &amp; Availability<br/>🔔 Alerts &amp; Anomaly Detection</div>", 500, 595, 220, 180, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");
  rect("bot_p4", "<div style='font-size:11.5px;font-weight:800;color:#D97706;margin-bottom:3px;'>QUALITY &amp; EVALUATION</div><div style='font-size:9.5px;line-height:1.5;color:#0F172A;'>✔ Output Validation (Rules / LLM-as-a-Judge)<br/>✔ Hallucination Detection<br/>✔ Grounding &amp; Citation Check<br/>✔ Automated Test Sets<br/>✔ Human Evaluation &amp; Feedback Loop</div>", 730, 595, 230, 180, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");
  rect("bot_p5", "<div style='font-size:11.5px;font-weight:800;color:#1E3A8A;margin-bottom:3px;'>TOOLS &amp; TECHNOLOGIES (Google Cloud)</div><div style='font-size:9.5px;line-height:1.6;color:#0F172A;display:grid;grid-template-columns:repeat(2, 1fr);gap:4px;'><div>🧠 <b>Vertex AI</b> (Agents)</div> <div>🤖 <b>Agent Builder</b></div> <div>⚡ <b>Cloud Functions</b></div> <div>📡 <b>Pub/Sub</b></div> <div>📊 <b>BigQuery</b></div> <div>🗃️ <b>Cloud Storage</b></div> <div>🗄️ <b>Firestore / AlloyDB</b></div> <div>📈 <b>Cloud Monitoring / Logging</b></div></div>", 970, 595, 330, 180, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");
  rect("bot_p6", "<div style='font-size:11.5px;font-weight:800;color:#1E3A8A;margin-bottom:3px;'>NOTES</div><div style='font-size:9.5px;line-height:1.45;color:#64748B;'>• Agents are stateless by default; state is stored in memory layer.<br/>• All agent interactions are logged and traceable.<br/>• Design for idempotency, retries, and graceful degradation.</div>", 1310, 595, 250, 180, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  // 7. FOOTER LEGEND (x=20..1560, y=785..815)
  rect("footer_leg", "<div style='font-size:11px;color:#0F172A;display:flex;justify-content:space-around;text-align:center;align-items:center;'>" +
    "<div><b style='color:#1E3A8A;'>LEGEND:</b></div>" +
    "<div>─── Synchronous Flow</div>" +
    "<div>- - - Asynchronous Flow</div>" +
    "<div>··· Data / Context Flow</div>" +
    "<div>🟦 Core Agent</div>" +
    "<div>🟩 Specialized Agent</div>" +
    "<div>🗄️ Data Store</div>" +
    "<div>👤 Human</div>" +
    "</div>", 20, 785, 1540, 30, "fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;rounded=1;align=center;verticalAlign=middle;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_23_agent_interaction" name="Template 23: Agent Interaction Architecture">
    <mxGraphModel dx="1440" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1440" pageHeight="800" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${c.join("\n        ")}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
