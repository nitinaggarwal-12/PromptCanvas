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
  rect("num_badge", "25", 20, 20, 48, 48, "fillColor=#1E3A8A;fontColor=#FFFFFF;fontSize=24;fontStyle=1;rounded=1;align=center;verticalAlign=middle;");
  rect("hdr_title", "<div style='font-size:24px;font-weight:800;color:#0F172A;letter-spacing:0.5px;'>Tool / Protocol Interaction Architecture</div><div style='font-size:11px;color:#1E3A8A;font-weight:700;margin-top:3px;'>Use Case: NovaCura – Agentic Platform Integrations &amp; Protocol Interactions &nbsp;|&nbsp; Environment: Production &nbsp;|&nbsp; Region: us-central1 &nbsp;|&nbsp; Last Updated: May 8, 2025</div>", 78, 16, 850, 56, "strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  rect("hdr_brand", "<div style='text-align:right;'><span style='font-size:20px;font-weight:800;color:#0284C7;'>🧬 NOVACURA</span><br/><span style='font-size:9.5px;color:#64748B;font-style:italic;'>AI-Powered Regulatory Intelligence Platform</span></div>", 940, 18, 280, 45, "strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

  // Objective Card
  rect("card_obj", "<div style='font-size:12px;font-weight:800;color:#1E3A8A;margin-bottom:3px;'>OBJECTIVE</div><div style='font-size:11.5px;line-height:1.4;color:#0F172A;'>Standardize how agents and services interact with external tools, APIs, and data sources using industry protocols and well-defined interfaces with security, reliability, and observability.</div>", 1240, 18, 320, 52, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=6;");

  // 2. LEFT COLUMN: TOOL & SERVICE CATEGORIES (x=20..140, y=78..465)
  rect("box_cats", "", 20, 78, 120, 387, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;");
  rect("lbl_cats", "<span style='font-size:11.5px;font-weight:800;color:#1E3A8A;'>TOOL &amp; SERVICE<br/>CATEGORIES</span>", 20, 82, 120, 20, "strokeColor=none;fillColor=none;align=center;");
  const cats = [
    { icon: "🗄️", t: "Data Sources", s: "(Internal / External)" },
    { icon: "🏢", t: "Enterprise Systems", s: "(Transactional / SaaS)" },
    { icon: "🧠", t: "AI / ML Services", s: "(Models &amp; Inference)" },
    { icon: "🛠️", t: "Utility Services", s: "(Email, Storage, Search)" },
    { icon: "💻", t: "Developer Tools", s: "(CICD, Monitoring)" },
    { icon: "👤", t: "Human Interfaces", s: "(HITL / Approvals)" }
  ];
  cats.forEach((ct, idx) => {
    rect(`cat_${idx}`, `<div style='font-size:10px;font-weight:700;'>${ct.icon} ${ct.t}<br/><span style='font-size:8.5px;color:#64748B;'>${ct.s}</span></div>`, 26, 108 + idx * 58, 108, 52, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=3;");
  });

  // 3. CENTER OUTER CONTAINER: PROTOCOL INTERACTION LAYERS (x=148..1030, y=78..465)
  rect("box_proto_layers", "", 148, 78, 882, 387, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;rounded=1;");
  rect("lbl_proto_layers", "<span style='font-size:8.5px;font-weight:800;color:#2563EB;'>PROTOCOL INTERACTION LAYERS</span>", 148, 82, 882, 16, "strokeColor=none;fillColor=none;align=center;");

  const pLayers = [
    { n: "1", t: "AGENT / CLIENT LAYER", s: "Agents, Apps, Services, Users", p: "MCP, A2A, HTTP/HTTPS, WebSocket, gRPC", f: "JSON / Protobuf<br/>Text / Binary", x: 156, w: 168 },
    { n: "2", t: "INTEGRATION GATEWAY", s: "API Gateway / Service Mesh", p: "HTTPS, gRPC, REST, GraphQL, WebSocket", f: "JSON, Protobuf,<br/>GraphQL", x: 332, w: 168 },
    { n: "3", t: "PROTOCOL ADAPTERS", s: "Protocol Translators / Connectors", p: "MCP, A2A, OData, SOAP, JDBC, FTP", f: "JSON, XML, CSV,<br/>Parquet", x: 508, w: 168 },
    { n: "4", t: "SERVICE CONNECTORS", s: "Tool / Service Connectors", p: "REST APIs, gRPC, SQL, SFTP, SMTP", f: "JSON, XML, CSV,<br/>Avro", x: 684, w: 168 },
    { n: "5", t: "TARGET SERVICES &amp; TOOLS", s: "APIs, Databases, SaaS, Models, Tools", p: "REST, gRPC, SQL, GraphQL, Message", f: "JSON, XML, CSV,<br/>Binary", x: 860, w: 162 }
  ];

  pLayers.forEach((pl, idx) => {
    rect(`pl_col_${idx}`, "", pl.x, 102, pl.w, 130, "fillColor=#EFF6FF;strokeColor=#CBD5E1;rounded=1;");
    rect(`pl_hdr_${idx}`, `<div style='font-size:10.5px;font-weight:800;color:#1E3A8A;'>${pl.n}. ${pl.t}</div>`, pl.x, 106, pl.w, 14, "strokeColor=none;fillColor=none;align=center;");
    rect(`pl_sub_${idx}`, `<div style='font-size:9px;color:#0F172A;'>${pl.s}</div>`, pl.x + 4, 122, pl.w - 8, 22, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
    rect(`pl_p_${idx}`, `<div style='font-size:8.5px;color:#2563EB;font-weight:700;'>Protocols:<br/>${pl.p}</div>`, pl.x + 4, 148, pl.w - 8, 38, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=2;");
    rect(`pl_f_${idx}`, `<div style='font-size:8.5px;color:#64748B;font-weight:700;'>Format:<br/>${pl.f}</div>`, pl.x + 4, 190, pl.w - 8, 36, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=2;");
  });

  // Cross-Cutting Capabilities Bar
  rect("bar_pl_cross", "<div style='font-size:11px;font-weight:800;color:#2563EB;margin-bottom:3px;text-align:center;'>CROSS-CUTTING CAPABILITIES</div>" +
    "<div style='font-size:9px;color:#0F172A;display:flex;justify-content:space-around;text-align:center;'>" +
    "<div>🔒 <b>Authentication &amp; Authz</b></div>" +
    "<div>🔐 <b>Encryption &amp; Keys</b></div>" +
    "<div>⏱️ <b>Rate Limiting</b></div>" +
    "<div>✔ <b>Request/Response Validation</b></div>" +
    "<div>🔄 <b>Retry &amp; Circuit Breaker</b></div>" +
    "<div>🆔 <b>Idempotency</b></div>" +
    "<div>📈 <b>Logging &amp; Tracing</b></div>" +
    "</div>", 156, 238, 866, 36, "fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=1;rounded=1;align=center;verticalAlign=middle;");

  // Protocol Interaction Flow (Example)
  rect("box_flow_ex", "<div style='font-size:11px;font-weight:800;color:#1E3A8A;margin-bottom:3px;text-align:center;'>PROTOCOL INTERACTION FLOW (EXAMPLE)</div>" +
    "<div style='font-size:9px;color:#0F172A;display:flex;justify-content:space-around;text-align:center;align-items:center;'>" +
    "<div>🔍<br/>1. Discover Tool</div> <div>➔</div>" +
    "<div>▶️<br/>2. Invoke Tool</div> <div>➔</div>" +
    "<div>🔒<br/>3. Authenticate</div> <div>➔</div>" +
    "<div>🔀<br/>4. Route &amp; Adapt</div> <div>➔</div>" +
    "<div>📞<br/>5. Call Target</div> <div>➔</div>" +
    "<div>⚙️<br/>6. Process Resp</div> <div>➔</div>" +
    "<div>💬<br/>7. Return Result</div> <div>➔</div>" +
    "<div>📈<br/>8. Log &amp; Observe</div>" +
    "</div>", 156, 280, 866, 52, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=3;");

  // Protocol Mapping & Translation Examples
  rect("box_map_ex", "<div style='font-size:11px;font-weight:800;color:#1E3A8A;margin-bottom:3px;text-align:center;'>PROTOCOL MAPPING &amp; TRANSLATION EXAMPLES</div>" +
    "<div style='font-size:9px;color:#0F172A;display:flex;justify-content:space-around;text-align:center;align-items:center;'>" +
    "<div style='background:#FFFFFF;border:1px solid #CBD5E1;padding:4px 8px;border-radius:4px;'><b>MCP ➔ REST API</b><br/>Agent (MCP Client) ➔ Gateway Adapter ➔ REST API (Service)</div>" +
    "<div style='background:#FFFFFF;border:1px solid #CBD5E1;padding:4px 8px;border-radius:4px;'><b>A2A ➔ gRPC</b><br/>Agent A (A2A) ➔ Adapter ➔ Agent B (gRPC Service)</div>" +
    "<div style='background:#FFFFFF;border:1px solid #CBD5E1;padding:4px 8px;border-radius:4px;'><b>REST ➔ SQL</b><br/>REST Client ➔ Adapter ➔ Database (SQL)</div>" +
    "<div style='background:#FFFFFF;border:1px solid #CBD5E1;padding:4px 8px;border-radius:4px;'><b>Event ➔ Tool Call</b><br/>Pub/Sub Event ➔ Adapter ➔ External Tool</div>" +
    "</div>", 156, 338, 866, 120, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=4;");

  // 4. RIGHT COLUMNS: PROTOCOLS & PATTERNS & RISKS (x=1038..1560, y=78..465)
  rect("box_r_proto_list", "<div style='font-size:11px;font-weight:800;color:#1E3A8A;margin-bottom:3px;'>COMMON PROTOCOLS &amp; WHEN TO USE</div><div style='font-size:9px;line-height:1.4;color:#0F172A;'>🔌 <b>MCP</b>: Standard for tool discovery &amp; invocation<br/>🤝 <b>A2A</b>: Agent collaboration &amp; delegation<br/>🌐 <b>REST</b>: General purpose APIs &amp; web services<br/>⚡ <b>gRPC</b>: High-perf, strongly-typed services<br/>🔄 <b>WebSocket / SSE</b>: Real-time, bidirectional push<br/>📊 <b>GraphQL</b>: Flexible query for APIs<br/>🗄️ <b>SQL / JDBC</b>: Relational database access<br/>📦 <b>SFTP / FTP</b>: Secure file transfer<br/>✉️ <b>SMTP / IMAP</b>: Email sending / retrieval<br/>📡 <b>Pub/Sub</b>: Event streaming &amp; messaging</div>", 1038, 78, 260, 205, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");
  
  rect("box_r_int_pats", "<div style='font-size:11px;font-weight:800;color:#2563EB;margin-bottom:3px;'>INTERACTION PATTERNS</div><div style='font-size:9px;line-height:1.45;color:#0F172A;'>🔄 Request / Response (Sync)<br/>⚡ Fire-and-Forget (Async)<br/>📡 Streaming (Real-time)<br/>📦 Batch (Scheduled / Bulk)<br/>📢 Event-Driven (Pub/Sub)<br/>👤 Human-in-the-Loop</div>", 1308, 78, 252, 125, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("box_r_tool_cats", "<div style='font-size:11px;font-weight:800;color:#16A34A;margin-bottom:3px;'>TOOL EXAMPLES BY CATEGORY</div><div style='font-size:8.5px;line-height:1.35;color:#0F172A;'><b>Data Sources:</b> BigQuery, Snowflake, Oracle, S3, GCS<br/><b>Enterprise:</b> Salesforce, SAP, Workday, ServiceNow<br/><b>AI/ML:</b> Vertex AI, OpenAI, Cohere, Hugging Face<br/><b>Utilities:</b> SendGrid, Elasticsearch, Redis, Cloud Storage<br/><b>Dev Tools:</b> GitHub, Jira, PagerDuty, Datadog</div>", 1038, 290, 260, 175, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("box_r_risks_p", "<div style='font-size:11px;font-weight:800;color:#DC2626;margin-bottom:3px;'>⚠️ KEY RISKS</div><div style='font-size:9px;line-height:1.4;color:#0F172A;'>🔴 Authentication failures<br/>🔴 Protocol mismatches<br/>🔴 Data format incompatibility<br/>🔴 Rate limit exceeded<br/>🔴 Network / timeout issues<br/>🔴 Partial failures / retries<br/>🔴 Security vulnerabilities<br/>🔴 Data leakage / compliance</div>", 1308, 210, 252, 255, "fillColor=#FEF2F2;strokeColor=#FECACA;rounded=1;align=left;verticalAlign=top;padding=4;");

  // 5. BOTTOM ROW: 5 PANELS & TECH & USE CASES (x=20..1560, y=472..775)
  rect("bot_p1", "<div style='font-size:11.5px;font-weight:800;color:#16A34A;margin-bottom:3px;'>SECURITY &amp; GOVERNANCE</div><div style='font-size:9px;line-height:1.45;color:#0F172A;'>✔ IAM &amp; Least Privilege<br/>✔ OAuth2 / OIDC / Service Accounts<br/>✔ TLS 1.2+ for all interactions<br/>✔ Secrets Management (Secret Manager)<br/>✔ Audit Logging &amp; Traceability<br/>✔ Data Classification &amp; DLP<br/>✔ Policy Enforcement (VPC-SC, IAP)</div>", 20, 472, 230, 205, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");
  rect("bot_p2", "<div style='font-size:11.5px;font-weight:800;color:#2563EB;margin-bottom:3px;'>RELIABILITY &amp; RESILIENCE</div><div style='font-size:9px;line-height:1.45;color:#0F172A;'>✔ Timeouts &amp; Retries<br/>✔ Circuit Breaker<br/>✔ Fallback / Degradation<br/>✔ Idempotent Operations<br/>✔ Dead Letter Queue<br/>✔ Health Checks &amp; Heartbeats<br/>✔ Multi-region Redundancy</div>", 260, 472, 230, 205, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");
  rect("bot_p3", "<div style='font-size:11.5px;font-weight:800;color:#7C3AED;margin-bottom:3px;'>OBSERVABILITY</div><div style='font-size:9px;line-height:1.45;color:#0F172A;'>✔ Distributed Tracing (Cloud Trace)<br/>✔ Structured Logging (Cloud Logging)<br/>✔ Metrics &amp; Dashboards (Cloud Monitoring)<br/>✔ SLA / SLO Monitoring<br/>✔ Alerting &amp; Incident Response<br/>✔ Correlation IDs &amp; Request Tracking</div>", 500, 472, 240, 205, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");
  rect("bot_p4", "<div style='font-size:11.5px;font-weight:800;color:#1E3A8A;margin-bottom:3px;'>TOOLS &amp; TECHNOLOGIES (Google Cloud)</div><div style='font-size:9px;line-height:1.5;color:#0F172A;display:grid;grid-template-columns:repeat(2, 1fr);gap:4px;'><div>🌐 <b>Apigee</b> (API Mgmt)</div> <div>🔌 <b>Cloud Endpoints</b></div> <div>⚡ <b>Eventarc</b> (Pub/Sub)</div> <div>⚙️ <b>Cloud Functions</b></div> <div>☸️ <b>Cloud Run</b></div> <div>🧠 <b>Vertex AI</b> (Agents)</div> <div>📊 <b>BigQuery</b> (Data)</div> <div>🗃️ <b>Cloud Storage</b></div> <div>🔐 <b>Secret Manager</b></div> <div>🛡️ <b>Cloud Armor</b></div></div>", 750, 472, 390, 205, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");
  rect("bot_p5", "<div style='font-size:11.5px;font-weight:800;color:#0D9488;margin-bottom:3px;'>USE CASE EXAMPLES</div><div style='font-size:9px;line-height:1.45;color:#0F172A;'>✔ Agent querying internal policy docs (RAG)<br/>✔ Agent creating Jira ticket via REST API<br/>✔ Agent collaborating with another agent via A2A<br/>✔ Agent sending email notifications via SMTP<br/>✔ Agent reading data from BigQuery via SQL<br/>✔ Agent invoking custom tool via MCP</div>", 1150, 472, 410, 205, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  // Abbreviations & Notes Strip
  rect("strip_notes", "<div style='font-size:9.5px;color:#0F172A;display:flex;justify-content:space-between;'><div><b>NOTES:</b> • Always prefer secure, managed connectors and official SDKs. • Design for idempotency and graceful degradation.</div><div><b>ABBREVIATIONS:</b> MCP: Model Context Protocol | A2A: Agent-to-Agent | API: Application Programming Interface | SaaS: Software as a Service | DLP: Data Loss Prevention | SLA: Service Level Agreement</div></div>", 20, 685, 1540, 45, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=middle;padding=4;");

  // 6. FOOTER LEGEND (x=20..1560, y=738..775)
  rect("footer_leg", "<div style='font-size:11px;color:#0F172A;display:flex;justify-content:space-around;text-align:center;align-items:center;'>" +
    "<div><b style='color:#1E3A8A;'>LEGEND:</b></div>" +
    "<div>─── Synchronous Flow</div>" +
    "<div>- - - Asynchronous Flow</div>" +
    "<div>··· Protocol Translation</div>" +
    "<div>🟦 Layer / Component</div>" +
    "<div>🟩 Protocol / Standard</div>" +
    "<div>🟪 Cross-Cutting Capability</div>" +
    "<div>🟥 Risk / Issue</div>" +
    "</div>", 20, 738, 1540, 36, "fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;rounded=1;align=center;verticalAlign=middle;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_25_tool_protocol_interaction" name="Template 25: Tool / Protocol Interaction Architecture">
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
