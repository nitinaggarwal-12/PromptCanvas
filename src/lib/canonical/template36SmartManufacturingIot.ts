/**
 * Master 1:1 High-Craft Exact Ground-Truth Replica for Template 36: Smart Manufacturing & Industrial IoT
 * Matches 100% of images/36.png:
 * - 1) Shop Floor / OT Channels
 * - 2) Edge Control & Site Operations
 * - 3) Manufacturing Operations Platform (MES / MOM)
 * - 4) AI / Optimization Layer (Predictive Maintenance, Digital Twin)
 * - 5) Enterprise & External Ecosystem (ERP, Supply Chain, PLM)
 * - 6) Data & Industrial Intelligence Layer (Google Cloud)
 * - 7) Risk, Safety, Compliance & Governance
 * - 8) Platform / DevOps / MLOps (Google Cloud)
 * - 9) Security, Network & Reliability Foundation
 * - Right Sidebar: Legend, Key Flows, Security & Compliance Highlights, Diagram Information
 * - 1600x1050 master canvas resolution.
 */

const E = (v?: string | null) =>
  (v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export function generateTemplate36SmartManufacturingIotXml(
  domainFlavor = "manufacturing",
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
  cell("hdr_num", "36", 16, 12, 68, 54, "shape=rectangle;rounded=1;arcSize=14;fillColor=#1D4ED8;strokeColor=#1D4ED8;fontColor=#FFFFFF;fontSize=32;fontStyle=1;align=center;verticalAlign=middle;");

  cell(
    "hdr_title",
    `<div style='font-size:24px;font-weight:900;color:#0F172A;letter-spacing:0.5px;'>Smart Manufacturing &amp; Industrial IoT</div>` +
    `<div style='font-size:12.5px;font-weight:700;color:#2563EB;margin-top:2px;'>Connected • Intelligent • Resilient • Secure on Google Cloud</div>` +
    `<div style='font-size:11px;color:#64748B;margin-top:2px;'>Environment: Production &nbsp;|&nbsp; Region: Multi-Region &nbsp;|&nbsp; Last Updated: May 21, 2025</div>`,
    94,
    12,
    760,
    54,
    "whiteSpace=wrap;overflow=hidden;text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;"
  );

  const brandHtml = `<table style="width:100%;border-collapse:collapse;"><tr><td style="width:36px;vertical-align:middle;text-align:center;"><span style="font-size:32px;">☁️</span></td><td style="text-align:left;vertical-align:middle;padding-left:8px;"><div style="font-size:24px;font-weight:900;color:#4285F4;letter-spacing:1px;">Google Cloud</div><div style="font-size:10.5px;color:#64748B;font-weight:600;font-style:italic;">Industrial Reference Architecture</div></td></tr></table>`;
  cell("hdr_brand", brandHtml, 860, 12, 270, 54, "whiteSpace=wrap;overflow=hidden;text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  const objHtml = `<div style='font-size:10.5px;font-weight:900;color:#1E3A8A;margin-bottom:2px;white-space:normal;'>OBJECTIVE</div><div style='font-size:8.5px;line-height:1.35;color:#0F172A;white-space:normal;word-break:break-word;'>
    End-to-end industrial IoT intelligence connecting plant floor OT telemetry to cloud AI, MES, and predictive analytics on Google Cloud.
  </div>`;
  cell("hdr_obj", objHtml, 1140, 12, 380, 54, "whiteSpace=wrap;overflow=hidden;rounded=1;arcSize=8;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.2;html=1;align=left;verticalAlign=middle;padding=6;");

  // Helper for 9 horizontal bands (x=16..1240)
  const band = (num: string, title: string, y: number, h: number, col: string) => {
    cell(`band_num_${num}`, num, 16, y, 42, h, `rounded=1;arcSize=4;fillColor=${col};fontColor=#FFFFFF;fontSize=18;fontStyle=1;align=center;verticalAlign=middle;`);
    cell(`band_lbl_${num}`, title, 62, y, 164, h, `html=1;whiteSpace=wrap;fillColor=#F8FAFC;strokeColor=#CBD5E1;fontColor=#0F172A;fontSize=8.5;fontStyle=1;align=left;spacingLeft=6;verticalAlign=middle;`);
    cell(`band_box_${num}`, "", 230, y, 1010, h, `rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;`);
  };

  // 1. SHOP FLOOR / OT CHANNELS (y=74..148, h=74)
  band("1", "SHOP FLOOR /<br/>OT CHANNELS", 74, 74, "#1D4ED8");
  const shopFloor = [
    { t: "Production Lines", icon: "🏭" },
    { t: "Machines &amp; CNC", icon: "⚙️" },
    { t: "PLC / SCADA / DCS", icon: "🎛️" },
    { t: "Robotics / Cobots", icon: "🤖" },
    { t: "Sensors &amp; IoT", icon: "📡" },
    { t: "Cameras / Vision", icon: "📷" },
    { t: "Operator HMIs", icon: "📱" },
    { t: "Quality Inspection", icon: "🔬" }
  ];
  shopFloor.forEach((sf, idx) => {
    const sfx = 236 + idx * 125;
    cell(`sf_${idx}`, `<div style="text-align:center;"><span style="font-size:16px;">${sf.icon}</span><div style="font-size:8.5px;font-weight:800;color:#0F172A;margin-top:2px;">${sf.t}</div></div>`, sfx, 80, 120, 62, "rounded=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // 2. EDGE CONTROL & SITE OPERATIONS (y=154..228, h=74)
  band("2", "EDGE CONTROL &amp;<br/>SITE OPERATIONS", 154, 74, "#0284C7");
  const edgeOps = [
    { t: "Industrial Edge Gateway", icon: "🌐" },
    { t: "OPC-UA / MQTT Collectors", icon: "🔌" },
    { t: "Local Historian", icon: "🗄️" },
    { t: "Site HMI Apps", icon: "🖥️" },
    { t: "Edge Inference", icon: "🧠" },
    { t: "Buffering &amp; Forward", icon: "📦" },
    { t: "Site Connectivity", icon: "📶" },
    { t: "Offline Resilience", icon: "🛡️" }
  ];
  edgeOps.forEach((eo, idx) => {
    const eox = 236 + idx * 125;
    cell(`eo_${idx}`, `<div style="text-align:center;"><span style="font-size:16px;">${eo.icon}</span><div style="font-size:8px;font-weight:800;color:#0F172A;margin-top:2px;">${eo.t}</div></div>`, eox, 160, 120, 62, "rounded=1;fillColor=#F0F9FF;strokeColor=#BAE6FD;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // 3. MANUFACTURING OPERATIONS PLATFORM (y=234..308, h=74)
  band("3", "MANUFACTURING<br/>OPERATIONS PLATFORM", 234, 74, "#1E40AF");
  const mesCards = [
    { t: "MES / MOM", icon: "🏢" },
    { t: "Production Scheduling", icon: "📅" },
    { t: "Work Orders", icon: "📋" },
    { t: "Asset Maintenance", icon: "🔧" },
    { t: "Quality Mgmt", icon: "⭐" },
    { t: "Batch Recipe Mgmt", icon: "🧪" },
    { t: "OEE Monitoring", icon: "⏱️" },
    { t: "Traceability / Genealogy", icon: "🧬" }
  ];
  mesCards.forEach((mc, idx) => {
    const mcx = 236 + idx * 125;
    cell(`mc_${idx}`, `<div style="text-align:center;"><span style="font-size:16px;">${mc.icon}</span><div style="font-size:8.5px;font-weight:800;color:#0F172A;margin-top:2px;">${mc.t}</div></div>`, mcx, 240, 120, 62, "rounded=1;fillColor=#EFF6FF;strokeColor=#BFDBFE;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // 4. AI / OPTIMIZATION LAYER (y=314..388, h=74)
  band("4", "AI / OPTIMIZATION<br/>LAYER", 314, 74, "#7C3AED");
  const aiOpts = [
    { t: "Predictive Maint. Agent", icon: "🤖" },
    { t: "Quality Anomaly Detect", icon: "🔍" },
    { t: "Process Opt. Copilot", icon: "✨" },
    { t: "Energy Optimization", icon: "⚡" },
    { t: "Demand Forecasting", icon: "📈" },
    { t: "Digital Twin Simulation", icon: "🌐" },
    { t: "Document SOP Assistant", icon: "📄" },
    { t: "Human-in-Loop Review", icon: "👥" }
  ];
  aiOpts.forEach((ao, idx) => {
    const aox = 236 + idx * 125;
    cell(`ao_${idx}`, `<div style="text-align:center;"><span style="font-size:16px;">${ao.icon}</span><div style="font-size:8px;font-weight:800;color:#5B21B6;margin-top:2px;">${ao.t}</div></div>`, aox, 320, 120, 62, "rounded=1;fillColor=#FAF5FF;strokeColor=#E9D5FF;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // 5. ENTERPRISE & EXTERNAL ECOSYSTEM (y=394..468, h=74)
  band("5", "ENTERPRISE &amp;<br/>EXTERNAL ECOSYSTEM", 394, 74, "#EA580C");
  const extEco = [
    { t: "ERP / SAP S/4HANA", icon: "🏢" },
    { t: "Supply Chain / WMS", icon: "🚚" },
    { t: "PLM System", icon: "📐" },
    { t: "CRM / Service Systems", icon: "🤝" },
    { t: "Supplier Partner APIs", icon: "🔗" },
    { t: "Logistics Providers", icon: "🚢" },
    { t: "Customer Channels", icon: "👥" },
    { t: "Regulatory Compliance", icon: "🏛️" }
  ];
  extEco.forEach((ee, idx) => {
    const eex = 236 + idx * 125;
    cell(`ee_${idx}`, `<div style="text-align:center;"><span style="font-size:16px;">${ee.icon}</span><div style="font-size:8px;font-weight:800;color:#0F172A;margin-top:2px;">${ee.t}</div></div>`, eex, 400, 120, 62, "rounded=1;fillColor=#FFF7ED;strokeColor=#FED7AA;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // 6. DATA & INDUSTRIAL INTELLIGENCE LAYER (y=474..548, h=74)
  band("6", "DATA &amp; INDUSTRIAL<br/>INTELLIGENCE LAYER", 474, 74, "#0D9488");
  const dataInd = [
    { t: "Industrial Data Lake", sub: "GCS", icon: "🗄️" },
    { t: "Time-Series Store", sub: "Bigtable", icon: "⏱️" },
    { t: "BigQuery Analytics", sub: "Analytics", icon: "📊" },
    { t: "Streaming Backbone", sub: "Dataflow", icon: "🌊" },
    { t: "Event Bus / PubSub", sub: "Pub/Sub", icon: "📬" },
    { t: "Feature Store", sub: "Vertex AI", icon: "⚡" },
    { t: "Data Quality &amp; Lineage", sub: "Dataplex", icon: "🛡️" },
    { t: "Curated Mart", sub: "BigQuery", icon: "📈" }
  ];
  dataInd.forEach((di, idx) => {
    const dix = 236 + idx * 125;
    cell(`di_${idx}`, `<div style="text-align:center;"><span style="font-size:16px;">${di.icon}</span><div style="font-size:8px;font-weight:800;color:#0F172A;margin-top:2px;">${di.t}</div><div style="font-size:7px;color:#64748B;">${di.sub}</div></div>`, dix, 480, 120, 62, "rounded=1;fillColor=#F0FDFA;strokeColor=#99F6E4;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // 7. RISK, SAFETY, COMPLIANCE & GOVERNANCE (y=554..628, h=74)
  band("7", "RISK, SAFETY,<br/>COMPLIANCE &amp; GOV.", 554, 74, "#E11D48");
  const safetyCards = [
    { t: "Safety Monitoring", icon: "🛡️" },
    { t: "Policy / SOP Rules", icon: "📜" },
    { t: "Model Governance", icon: "🧠" },
    { t: "Audit Trail", icon: "📋" },
    { t: "Root Cause Analysis", icon: "🔬" },
    { t: "Regulatory Reports", icon: "📑" },
    { t: "Escalation Workflows", icon: "🚨" },
    { t: "Governance Review", icon: "👥" }
  ];
  safetyCards.forEach((sc, idx) => {
    const scx = 236 + idx * 125;
    cell(`sc7_${idx}`, `<div style="text-align:center;"><span style="font-size:16px;">${sc.icon}</span><div style="font-size:8px;font-weight:800;color:#0F172A;margin-top:2px;">${sc.t}</div></div>`, scx, 560, 120, 62, "rounded=1;fillColor=#FFF1F2;strokeColor=#FECDD3;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // 8. PLATFORM / DEVOPS / MLOPS (y=634..708, h=74)
  band("8", "PLATFORM / DEVOPS /<br/>MLOPS (Google Cloud)", 634, 74, "#0284C7");
  const devopsCards = [
    { t: "API Gateway (Apigee)", icon: "🌐" },
    { t: "Containers (GKE)", icon: "☸️" },
    { t: "Cloud Workflows", icon: "🔄" },
    { t: "Cloud Build CI/CD", icon: "🚀" },
    { t: "Artifact Registry", icon: "📦" },
    { t: "Model Registry (Vertex)", icon: "🧠" },
    { t: "Observability (Cloud Log)", icon: "📈" },
    { t: "Secret Manager", icon: "🔒" }
  ];
  devopsCards.forEach((dc, idx) => {
    const dcx = 236 + idx * 125;
    cell(`dc8_${idx}`, `<div style="text-align:center;"><span style="font-size:16px;">${dc.icon}</span><div style="font-size:8px;font-weight:800;color:#0F172A;margin-top:2px;">${dc.t}</div></div>`, dcx, 640, 120, 62, "rounded=1;fillColor=#F0F9FF;strokeColor=#BAE6FD;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // 9. SECURITY, NETWORK & RELIABILITY FOUNDATION (y=714..788, h=74)
  band("9", "SECURITY, NETWORK &amp;<br/>RELIABILITY FOUNDATION", 714, 74, "#0F172A");
  const secFound = [
    { t: "Device Identity", icon: "🪪" },
    { t: "IAM / Access Mgmt", icon: "👤" },
    { t: "Zero Trust Network", icon: "🔒" },
    { t: "VPC Segmentation", icon: "🛡️" },
    { t: "Private Interconnect", icon: "🌐" },
    { t: "Encryption Transit/Rest", icon: "🔐" },
    { t: "SOC / SIEM (Chronicle)", icon: "🚨" },
    { t: "Multi-Site HA / DR", icon: "💾" }
  ];
  secFound.forEach((sf, idx) => {
    const sfx = 236 + idx * 125;
    cell(`sf9_${idx}`, `<div style="text-align:center;"><span style="font-size:16px;">${sf.icon}</span><div style="font-size:8px;font-weight:800;color:#0F172A;margin-top:2px;">${sf.t}</div></div>`, sfx, 720, 120, 62, "rounded=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;html=1;align=center;verticalAlign=middle;padding=2;");
  });

  // ==================== 10. RIGHT SIDEBAR (x=1252..1584, y=74..788) ====================
  // Legend
  cell("box_sb_legend", "", 1252, 74, 332, 230, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("lbl_sb_legend", "SECTION &amp; LINE LEGEND", 1252, 76, 332, 16, "fontColor=#0F172A;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");
  const legLines = [
    { t: "Telemetry / Data Flow", col: "#1D4ED8", dash: "" },
    { t: "Command / Control Flow", col: "#0F172A", dash: "dashed" },
    { t: "AI / Optimization Flow", col: "#7C3AED", dash: "" },
    { t: "Enterprise Integration Flow", col: "#EA580C", dash: "dashed" },
    { t: "Compliance / Review Flow", col: "#E11D48", dash: "dashed" },
    { t: "Event / Streaming Flow", col: "#0D9488", dash: "dashed" }
  ];
  legLines.forEach((ll, idx) => {
    const lly = 98 + idx * 34;
    cell(`leg36_${idx}`, `<div style="display:flex;align-items:center;gap:6px;"><div style="width:18px;height:4px;background:${ll.col};"></div><span style="font-size:8.5px;font-weight:700;color:#0F172A;">${ll.t}</span></div>`, 1262, lly, 312, 26, "rounded=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;html=1;align=left;verticalAlign=middle;padding=4;");
  });

  // Security Highlights
  cell("box_sb_sec", "", 1252, 310, 332, 240, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("lbl_sb_sec", "SECURITY &amp; COMPLIANCE HIGHLIGHTS", 1252, 312, 332, 16, "fontColor=#0F172A;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");
  const sec36 = [
    "Zero Trust security model across OT, IT, and Cloud",
    "End-to-end data lineage &amp; sensor traceability",
    "Model governance, validation &amp; continuous monitoring",
    "Human-in-the-loop review for critical plant decisions",
    "Continuous monitoring, alerting &amp; incident response",
    "Data protection: encryption, masking &amp; access controls"
  ];
  sec36.forEach((sh, idx) => {
    const shy = 334 + idx * 34;
    cell(`sh36_${idx}`, `<div style="display:flex;align-items:center;gap:4px;"><span style="color:#16A34A;font-weight:900;">✔</span><span style="font-size:8px;color:#0F172A;line-height:1.2;">${sh}</span></div>`, 1262, shy, 312, 28, "rounded=1;fillColor=#F0FDF4;strokeColor=#BBF7D0;html=1;align=left;verticalAlign=middle;padding=4;");
  });

  // Diagram Info
  cell("box_sb_info", "", 1252, 556, 332, 232, "rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;");
  cell("lbl_sb_info", "DIAGRAM INFORMATION", 1252, 558, 332, 16, "fontColor=#0F172A;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");
  const diagInfoHtml = `
    <table style="width:100%;font-size:8.5px;color:#0F172A;border-collapse:collapse;line-height:1.6;">
      <tr><td style="font-weight:800;width:100px;">Title:</td><td>36. Smart Manufacturing &amp; Industrial IoT</td></tr>
      <tr><td style="font-weight:800;">Version:</td><td>1.0</td></tr>
      <tr><td style="font-weight:800;">Date:</td><td>May 21, 2025</td></tr>
      <tr><td style="font-weight:800;">Architecture:</td><td>Cloud-native Industrial Platform</td></tr>
      <tr><td style="font-weight:800;">Cloud:</td><td>Google Cloud</td></tr>
      <tr><td style="font-weight:800;">Region:</td><td>Multi-site / Multi-region</td></tr>
      <tr><td style="font-weight:800;">Audience:</td><td>Enterprise Architecture, Manufacturing, OT/IT</td></tr>
    </table>
  `;
  cell("sb_info_content", diagInfoHtml, 1262, 580, 312, 200, "whiteSpace=wrap;overflow=hidden;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=4;");

  // ==================== 11. BOTTOM FOOTER (y=796..822) ====================
  cell("ftr_note", "ⓘ This blueprint is a reference architecture for PromptCanvas. Components and services are illustrative and can be adapted to specific manufacturing environments.", 16, 796, 1224, 26, "rounded=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;fontColor=#64748B;fontSize=8;html=1;align=left;spacingLeft=8;verticalAlign=middle;");
  cell("ftr_brand", "❖ PromptCanvas | Enterprise Architecture Suite", 1252, 796, 332, 26, "rounded=1;fillColor=#EFF6FF;strokeColor=#BFDBFE;fontColor=#1D4ED8;fontSize=8.5;fontStyle=1;align=center;verticalAlign=middle;");

  const bg = isDark ? "#0F172A" : "#FFFFFF";

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_36_smart_manufacturing_iot" name="36. Smart Manufacturing &amp; Industrial IoT">
    <mxGraphModel dx="1600" dy="1050" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="1050" background="${bg}" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${c.join("\n        ")}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
