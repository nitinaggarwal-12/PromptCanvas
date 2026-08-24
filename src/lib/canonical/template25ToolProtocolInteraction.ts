/**
 * Canonical Architecture Template 25: Tool / Protocol Interaction Architecture
 * Exact 1:1 High-Fidelity Master Blueprint of images/25.png
 */

export function generateTemplate25ToolProtocolInteractionXml(
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
  rect("num_badge", "25", 20, 16, 48, 48, "fillColor=#1E3A8A;fontColor=#FFFFFF;fontSize=24;fontStyle=1;rounded=1;align=center;verticalAlign=middle;");
  rect("hdr_title", "<div style='font-size:22px;font-weight:800;color:#0F172A;letter-spacing:0.5px;'>Tool / Protocol Interaction Architecture</div><div style='font-size:11px;color:#1E3A8A;font-weight:700;margin-top:2px;'>Use Case: NovaCura – Agentic Platform Integrations &amp; Protocol Interactions &nbsp;|&nbsp; Environment: Production &nbsp;|&nbsp; Region: us-central1 &nbsp;|&nbsp; Last Updated: May 8, 2025</div>", 78, 16, 840, 48, "strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=10;");
  rect("hdr_brand", "<div style='text-align:right;'><span style='font-size:20px;font-weight:800;color:#0284C7;'>🧬 NOVACURA</span><br/><span style='font-size:9.5px;color:#64748B;font-style:italic;'>AI-Powered Regulatory Intelligence Platform</span></div>", 940, 16, 280, 48, "strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

  // Objective Card
  rect("card_obj", "<div style='font-size:8.5px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>OBJECTIVE</div><div style='font-size:10px;line-height:1.35;color:#0F172A;'>Standardize how agents and services interact with external tools, APIs, and data sources using industry protocols and well-defined interfaces with security, reliability, and observability.</div>", 1240, 16, 320, 48, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=4;");

  // 2. LEFT COLUMN: TOOL & SERVICE CATEGORIES (x=20..115, y=72..410)
  rect("box_cats", "", 20, 72, 95, 338, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;rounded=1;");
  rect("lbl_cats", "<span style='font-size:9px;font-weight:800;color:#2563EB;'>TOOL &amp; SERVICE<br/>CATEGORIES</span>", 20, 75, 95, 18, "strokeColor=none;fillColor=none;align=center;");

  const cats = [
    { t: "Data Sources", sub: "(Internal / External)", icon: "🗄️" },
    { t: "Enterprise Systems", sub: "(Transactional / SaaS)", icon: "🏢" },
    { t: "AI / ML Services", sub: "(Models &amp; Inference)", icon: "🧠" },
    { t: "Utility Services", sub: "(Email, Storage, Search)", icon: "⚙️" },
    { t: "Developer Tools", sub: "(CI/CD, Monitoring)", icon: "💻" },
    { t: "Human Interfaces", sub: "(HITL / Approvals)", icon: "👤" }
  ];
  cats.forEach((ct, idx) => {
    const cy = 96 + idx * 51;
    rect(`cat_${idx}`, `<div style='font-size:9px;font-weight:700;'>${ct.icon} ${ct.t}</div><div style='font-size:8px;color:#64748B;'>${ct.sub}</div>`, 25, cy, 85, 46, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=2;");
  });

  // 3. MAIN PROTOCOL INTERACTION LAYERS (x=122..1150, y=72..410)
  rect("box_layers_main", "", 122, 72, 1020, 338, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;rounded=1;");
  rect("lbl_layers_main", "<span style='font-size:10px;font-weight:800;color:#2563EB;'>PROTOCOL INTERACTION LAYERS</span>", 122, 74, 1020, 12, "strokeColor=none;fillColor=none;align=center;");

  // 5 Interaction Layers (y=88..235)
  const layers = [
    { n: "1. AGENT / CLIENT LAYER", sub: "Agents, Apps, Services, Users", p: "MCP, A2A, HTTP/HTTPS, WebSocket, gRPC", f: "JSON / Protobuf, Text / Binary", icon: "🧠" },
    { n: "2. INTEGRATION GATEWAY", sub: "API Gateway / Service Mesh", p: "HTTPS, gRPC, REST, GraphQL, WebSocket", f: "JSON, Protobuf, GraphQL", icon: "🛡️" },
    { n: "3. PROTOCOL ADAPTERS", sub: "Protocol Translators / Connectors", p: "MCP, A2A, OData, SOAP, JDBC, FTP", f: "JSON, XML, CSV, Parquet", icon: "🔌" },
    { n: "4. SERVICE CONNECTORS", sub: "Tool / Service Connectors", p: "REST APIs, gRPC, SQL, SFTP, SMTP", f: "JSON, XML, CSV, Avro", icon: "🔗" },
    { n: "5. TARGET SERVICES & TOOLS", sub: "APIs, Databases, SaaS, Models, Tools", p: "REST, gRPC, SQL, GraphQL, Message", f: "JSON, XML, CSV, Binary", icon: "🗄️" }
  ];

  layers.forEach((ly, idx) => {
    const lx = 130 + idx * 201;
    rect(`ly_box_${idx}`, `<div style='font-size:9px;font-weight:800;color:#1E3A8A;text-align:center;'>${ly.icon} ${ly.n}</div><div style='font-size:8px;color:#64748B;text-align:center;margin-bottom:3px;'>${ly.sub}</div><div style='background:#EFF6FF;border:1px solid #2563EB;padding:2px;border-radius:2px;font-size:10px;margin-bottom:2px;'><b>Protocols:</b><br/>${ly.p}</div><div style='background:#F8FAFC;border:1px solid #CBD5E1;padding:2px;border-radius:2px;font-size:10px;'><b>Format:</b><br/>${ly.f}</div>`, lx, 88, 195, 140, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");
  });

  // Cross-Cutting Capabilities
  rect("box_cross_proto", "<div style='font-size:9px;font-weight:800;color:#2563EB;text-align:center;'>🔒 Authentication &amp; Auth &nbsp;|&nbsp; 🔑 Encryption &amp; Keys &nbsp;|&nbsp; ⏱️ Rate Limiting &nbsp;|&nbsp; ✔ Request/Response Validation &nbsp;|&nbsp; 🛡️ Retry &amp; Circuit Breaker &nbsp;|&nbsp; 🗄️ Idempotency &nbsp;|&nbsp; 📑 Logging &amp; Tracing</div>", 130, 234, 1004, 18, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=center;verticalAlign=middle;");

  // Protocol Interaction Flow (Example) (y=258..325)
  rect("box_p_flow", "<div style='font-size:9px;font-weight:800;color:#1E3A8A;margin-bottom:2px;text-align:center;'>PROTOCOL INTERACTION FLOW (EXAMPLE)</div><div style='font-size:8px;color:#0F172A;display:flex;justify-content:space-around;text-align:center;align-items:center;'><div style='border:1px solid #CBD5E1;background:#FFF;padding:2px 4px;border-radius:3px;'>🔍<br/><b>1. Discover Tool</b></div> <div>➔</div> <div style='border:1px solid #CBD5E1;background:#FFF;padding:2px 4px;border-radius:3px;'>⚡<br/><b>2. Invoke Tool</b></div> <div>➔</div> <div style='border:1px solid #CBD5E1;background:#FFF;padding:2px 4px;border-radius:3px;'>🔒<br/><b>3. Authenticate</b></div> <div>➔</div> <div style='border:1px solid #CBD5E1;background:#FFF;padding:2px 4px;border-radius:3px;'>🔄<br/><b>4. Route &amp; Adapt</b></div> <div>➔</div> <div style='border:1px solid #CBD5E1;background:#FFF;padding:2px 4px;border-radius:3px;'>🎯<br/><b>5. Call Target</b></div> <div>➔</div> <div style='border:1px solid #CBD5E1;background:#FFF;padding:2px 4px;border-radius:3px;'>⚙️<br/><b>6. Process Resp</b></div> <div>➔</div> <div style='border:1px solid #CBD5E1;background:#FFF;padding:2px 4px;border-radius:3px;'>📤<br/><b>7. Return Result</b></div> <div>➔</div> <div style='border:1px solid #16A34A;background:#F0FDF4;padding:2px 4px;border-radius:3px;'>📑<br/><b>8. Log &amp; Observe</b></div></div>", 130, 258, 1004, 64, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=top;padding=2;");

  // Protocol Mapping & Translation Examples (y=328..405)
  rect("box_p_maps", "<div style='font-size:9px;font-weight:800;color:#7C3AED;margin-bottom:2px;text-align:center;'>PROTOCOL MAPPING &amp; TRANSLATION EXAMPLES</div><div style='font-size:8px;display:flex;justify-content:space-around;text-align:center;align-items:center;'><div style='border:1px solid #2563EB;background:#EFF6FF;padding:4px;border-radius:3px;'><b>MCP ➔ REST API</b><br/>Agent (MCP Client) ➔ Gateway Adapter ➔ REST API</div> <div style='border:1px solid #7C3AED;background:#FAF5FF;padding:4px;border-radius:3px;'><b>A2A ➔ gRPC</b><br/>Agent A (A2A) ➔ Adapter ➔ Agent B (gRPC)</div> <div style='border:1px solid #16A34A;background:#F0FDF4;padding:4px;border-radius:3px;'><b>REST ➔ SQL</b><br/>REST Client ➔ Adapter ➔ Database (SQL)</div> <div style='border:1px solid #D97706;background:#FFFBEB;padding:4px;border-radius:3px;'><b>Event ➔ Tool Call</b><br/>Pub/Sub Event ➔ Adapter ➔ External Tool</div></div>", 130, 328, 1004, 76, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=top;padding=2;");

  // 4. FAR RIGHT: PROTOCOLS, PATTERNS, RISKS, TOOL EXAMPLES (x=1150..1560, y=72..410)
  rect("box_r_common", "<div style='font-size:9px;font-weight:800;color:#1E3A8A;margin-bottom:1px;'>COMMON PROTOCOLS &amp; WHEN TO USE</div><div style='font-size:10px;line-height:1.25;color:#0F172A;'>🔌 <b>MCP:</b> Standard for tool discovery &amp; invocation<br/>🤝 <b>A2A:</b> Agent collaboration &amp; delegation<br/>🌐 <b>REST:</b> General purpose APIs &amp; web services<br/>⚡ <b>gRPC:</b> High-perf, strongly-typed services<br/>📡 <b>WebSocket / SSE:</b> Real-time, bidirectional push<br/>📜 <b>GraphQL:</b> Flexible query for APIs<br/>🗄️ <b>SQL / JDBC:</b> Relational database access<br/>📨 <b>Pub/Sub:</b> Event streaming &amp; messaging</div>", 1150, 72, 230, 180, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=2;");

  rect("box_r_patterns", "<div style='font-size:9px;font-weight:800;color:#2563EB;margin-bottom:1px;'>INTERACTION PATTERNS</div><div style='font-size:10px;line-height:1.25;color:#0F172A;'>🔄 <b>Request / Response (Sync)</b><br/>⚡ <b>Fire-and-Forget (Async)</b><br/>📡 <b>Streaming (Real-time)</b><br/>📦 <b>Batch (Scheduled / Bulk)</b><br/>📨 <b>Event-Driven (Pub/Sub)</b><br/>👤 <b>Human-in-the-Loop</b></div>", 1386, 72, 174, 180, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=2;");

  rect("box_r_tool_ex", "<div style='font-size:9px;font-weight:800;color:#16A34A;margin-bottom:1px;'>TOOL EXAMPLES BY CATEGORY</div><div style='font-size:10px;line-height:1.25;color:#0F172A;'>• <b>Data Sources:</b> BigQuery, Snowflake, Oracle, S3, GCS<br/>• <b>Enterprise:</b> Salesforce, SAP, Workday, ServiceNow<br/>• <b>AI/ML:</b> Vertex AI, OpenAI, Cohere, Hugging Face<br/>• <b>Utilities:</b> SendGrid, Elasticsearch, Redis, Cloud Storage<br/>• <b>Dev Tools:</b> GitHub, Jira, PagerDuty, Datadog</div>", 1150, 258, 230, 146, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=2;");

  rect("box_r_risks", "<div style='font-size:9px;font-weight:800;color:#DC2626;margin-bottom:1px;'>KEY RISKS</div><div style='font-size:10px;line-height:1.25;color:#0F172A;'>⚠️ Authentication failures<br/>⚠️ Protocol mismatches<br/>⚠️ Data format incompatibility<br/>⚠️ Rate limit exceeded<br/>⚠️ Network / timeout issues<br/>⚠️ Security vulnerabilities<br/>⚠️ Data leakage / compliance</div>", 1386, 258, 174, 146, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=2;");

  // 5. BOTTOM ROW: SECURITY, RELIABILITY, OBS, TOOLS, USE CASES, LEGEND (x=20..1560, y=546..740)
  rect("bot_sec", "<div style='font-size:10px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>SECURITY &amp; GOVERNANCE</div><div style='font-size:8px;line-height:1.35;color:#0F172A;'>✔ IAM &amp; Least Privilege<br/>✔ OAuth2 / OIDC / Service Accounts<br/>✔ TLS 1.2+ for all interactions<br/>✔ Secrets Management (Secret Manager)<br/>✔ Audit Logging &amp; Traceability<br/>✔ Data Classification &amp; DLP<br/>✔ Policy Enforcement (VPC-SC, IAP)</div>", 20, 546, 250, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("bot_rel", "<div style='font-size:10px;font-weight:800;color:#2563EB;margin-bottom:2px;'>RELIABILITY &amp; RESILIENCE</div><div style='font-size:8px;line-height:1.35;color:#0F172A;'>✔ Timeouts &amp; Retries<br/>✔ Circuit Breaker<br/>✔ Fallback / Degradation<br/>✔ Idempotent Operations<br/>✔ Dead Letter Queue<br/>✔ Health Checks &amp; Heartbeats<br/>✔ Multi-region Redundancy</div>", 280, 546, 250, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("bot_obs", "<div style='font-size:10px;font-weight:800;color:#7C3AED;margin-bottom:2px;'>OBSERVABILITY</div><div style='font-size:8px;line-height:1.35;color:#0F172A;'>⏱️ <b>Distributed Tracing</b> (Cloud Trace)<br/>📑 <b>Structured Logging</b> (Cloud Logging)<br/>📈 <b>Metrics &amp; Dashboards</b> (Monitoring)<br/>⏱️ <b>SLA / SLO Monitoring</b><br/>🔔 <b>Alerting &amp; Incident Response</b><br/>🔍 <b>Correlation IDs &amp; Request Tracking</b></div>", 540, 546, 250, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("bot_tools", "<div style='font-size:10px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>TOOLS &amp; TECHNOLOGIES (Google Cloud)</div><div style='font-size:8px;line-height:1.35;color:#0F172A;'>🛡️ <b>Apigee (API Mgmt)</b> &nbsp;|&nbsp; ⚡ <b>Cloud Endpoints</b><br/>⚡ <b>Eventarc (Pub/Sub)</b> &nbsp;|&nbsp; ⚡ <b>Cloud Functions</b><br/>📦 <b>Cloud Run</b> &nbsp;|&nbsp; 🧠 <b>Vertex AI (Agents)</b><br/>📊 <b>BigQuery (Data)</b> &nbsp;|&nbsp; 🗃️ <b>Cloud Storage</b><br/>🔒 <b>Secret Manager</b> &nbsp;|&nbsp; 🛡️ <b>Cloud Armor</b></div>", 800, 546, 250, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("bot_cases", "<div style='font-size:10px;font-weight:800;color:#16A34A;margin-bottom:2px;'>USE CASE EXAMPLES</div><div style='font-size:8px;line-height:1.35;color:#0F172A;'>✔ Agent querying internal policy docs (RAG)<br/>✔ Agent creating Jira ticket via REST API<br/>✔ Agent collaborating with another agent via A2A<br/>✔ Agent sending email notifications via SMTP<br/>✔ Agent reading data from BigQuery via SQL<br/>✔ Agent invoking custom tool via MCP</div>", 1060, 546, 250, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("bot_legend", "<div style='font-size:10px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>LEGEND</div><div style='font-size:8px;line-height:1.35;color:#0F172A;'>── Synchronous Flow<br/>- - Asynchronous Flow<br/>······ Protocol Translation<br/>🟦 Layer / Component &nbsp; <span style='background:#F0FDF4;border:1px solid #16A34A;padding:1px 3px;border-radius:2px;'>■</span> Protocol / Standard<br/>🟪 Cross-Cutting Capability &nbsp; 🔴 Risk / Issue</div>", 1320, 546, 240, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  // 6. FOOTER METADATA STRIP (x=20..1560, y=744..768)
  rect("footer_meta", "<div style='font-size:9px;color:#0F172A;display:flex;justify-content:space-between;align-items:center;'><div>Version: 1.0</div><div>Date: May 2024</div></div>", 20, 744, 1540, 24, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=middle;padding=3;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_25_tool_protocol_interaction_architecture" name="Template 25: Tool / Protocol Interaction Architecture">
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
