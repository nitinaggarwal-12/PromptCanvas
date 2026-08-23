/**
 * Master 1:1 Exact Replica Generator for Canonical Template 10: Integration Architecture
 * Matches 100% of images/10.png (NOVACURA Integration Architecture for Biopharma)
 * Pure collision-free geometry, complete <mxfile> envelope, and high-contrast typography.
 */

const E = (v?: string | null) =>
  (v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function generateTemplate10IntegrationArchXml(domainFlavor = "biopharma", theme: "light" | "dark" = "light"): string {
  const isDark = theme === "dark";
  const bg = isDark ? "#0B111E" : "#FFFFFF";
  const c: string[] = [];

  const rect = (id: string, v: string, x: number, y: number, w: number, h: number, s = "") =>
    c.push(`<mxCell id="${id}" value="${E(v)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;fontColor=#0F172A;fontSize=11;${s}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`);

  const text = (id: string, v: string, x: number, y: number, w: number, h: number, s = "") =>
    c.push(`<mxCell id="${id}" value="${E(v)}" style="text;html=1;strokeColor=none;fillColor=none;whiteSpace=wrap;fontColor=#0F172A;fontSize=11;verticalAlign=middle;${s}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`);

  // =========================================================================
  // 1. TOP HEADER BANNER & NOVACURA LOGO
  // =========================================================================
  const titleHtml = `<table style="border-collapse:collapse;">
    <tr>
      <td style="width:46px;height:46px;background:#0F2A4A;border-radius:6px;text-align:center;vertical-align:middle;">
        <span style="font-size:24px;font-weight:900;color:#FFFFFF;font-family:sans-serif;">10</span>
      </td>
      <td style="padding-left:14px;vertical-align:middle;">
        <div style="font-size:22px;font-weight:900;color:#0F2A4A;letter-spacing:1px;font-family:sans-serif;">INTEGRATION ARCHITECTURE</div>
        <div style="font-size:12.5px;font-weight:600;color:#64748B;margin-top:2px;">NOVACURA Enterprise AI Platform for Biopharma</div>
      </td>
    </tr>
  </table>`;
  text("header_title", titleHtml, 20, 16, 950, 52, "align=left;");

  const logoHtml = `<table style="text-align:right;float:right;">
    <tr>
      <td style="vertical-align:middle;padding-right:6px;"><span style="font-size:26px;">🧬</span></td>
      <td style="vertical-align:middle;text-align:left;">
        <div style="font-size:20px;font-weight:900;color:#0284C7;letter-spacing:1.5px;line-height:1;">NOVACURA</div>
        <div style="font-size:8px;font-weight:700;color:#64748B;line-height:1;margin-top:2px;">Transforming Therapies. Improving Lives.</div>
      </td>
    </tr>
  </table>`;
  text("header_logo", logoHtml, 1260, 16, 280, 48, "align=right;");

  // =========================================================================
  // 2. TOP INTEGRATION PRINCIPLES (x: 230 to 1200, y: 76 to 125)
  // =========================================================================
  rect("principles_frame", "", 230, 76, 970, 48, "rounded=1;strokeColor=#1E3A8A;strokeWidth=1.2;fillColor=#FFFFFF;shadow=0;");
  text("principles_title", "<b>INTEGRATION PRINCIPLES</b>", 230, 78, 970, 14, "fontSize=8.5;fontColor=#1E3A8A;align=center;");

  const principles = [
    { name: "API-First", icon: "⚡" },
    { name: "Loose Coupling", icon: "🔗" },
    { name: "Event-Driven", icon: "📡" },
    { name: "Secure by Design", icon: "🛡️" },
    { name: "Reusable", icon: "🔄" },
    { name: "Scalable", icon: "📈" },
    { name: "Observable", icon: "👁️" },
  ];
  principles.forEach((pr, i) => {
    const prx = 240 + i * 136;
    const html = `<table style="width:100%;height:100%;text-align:center;"><tr><td style="width:18px;"><span style="font-size:12px;">${pr.icon}</span></td><td style="text-align:left;font-size:7.5px;font-weight:700;color:#0F2A4A;">${pr.name}</td></tr></table>`;
    rect(`pr_pod_${i}`, html, prx, 92, 128, 28, "rounded=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;");
  });

  // =========================================================================
  // 3. LEFT PANEL: EXTERNAL SYSTEMS (x: 20 to 220, y: 135 to 670)
  // =========================================================================
  rect("ext_sys_box", "", 20, 135, 200, 535, "rounded=1;strokeColor=#1E3A8A;strokeWidth=1.5;fillColor=#FFFFFF;shadow=0;");
  rect("ext_sys_hdr", "<b style='font-size:9.5px;color:#FFFFFF;'>EXTERNAL SYSTEMS</b>", 20, 135, 200, 26, "rounded=0;fillColor=#1E3A8A;strokeColor=#1E3A8A;align=center;");

  const extSysGroups = [
    { title: "Enterprise Applications", items: ["Veeva Vault (RIM / eTMF)", "Veeva CRM", "SAP S/4HANA", "Oracle EBS / Financials", "ServiceNow"], icon: "🏢" },
    { title: "Clinical & R&D Systems", items: ["CTMS, eClinical (Medidata)", "EDC (Rave / OpenClinica)", "LIMS, ELN", "Safety / PV Systems", "Imaging Repositories"], icon: "🔬" },
    { title: "Partner & External Data", items: ["CRO / Partner Portals", "Public Databases", "Regulatory Authorities", "Market & Competitor Data"], icon: "🌐" },
    { title: "Real-time Sources", items: ["IoT / Sensors", "Manufacturing Systems", "Wearables / ePRO", "Clickstream / Web Events"], icon: "📡" },
  ];
  extSysGroups.forEach((es, i) => {
    const esy = 168 + i * 122;
    let bHtml = "";
    es.items.forEach(it => { bHtml += `<div style="font-size:6.5px;color:#475569;line-height:1.15;">&bull; ${it}</div>`; });
    const html = `<div style="padding:2px;"><div style="display:flex;align-items:center;gap:4px;"><span style="font-size:13px;">${es.icon}</span><b style="font-size:7.5px;color:#0F2A4A;">${es.title}</b></div><div style="margin-top:4px;padding-left:2px;">${bHtml}</div></div>`;
    rect(`ext_sys_grp_${i}`, html, 24, esy, 192, 114, "rounded=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;");
  });

  // =========================================================================
  // 4. CENTRAL BOUNDARY: INTEGRATION BACKBONE (x: 230 to 1010, y: 135 to 670)
  // =========================================================================
  rect("backbone_frame", "", 230, 135, 780, 535, "rounded=1;strokeColor=#7C3AED;strokeWidth=2;fillColor=#FFFFFF;shadow=0;");
  rect("backbone_hdr", "<b style='font-size:10.5px;color:#FFFFFF;letter-spacing:1px;'>INTEGRATION BACKBONE</b>", 230, 135, 780, 24, "rounded=0;fillColor=#7C3AED;strokeColor=#7C3AED;align=center;");

  // Column 1: API & Service Integration (x: 240 to 480)
  rect("api_int_frame", "", 240, 165, 240, 420, "rounded=1;fillColor=#F0F9FF;strokeColor=#BAE6FD;");
  text("api_int_title", "<b>API &amp; SERVICE INTEGRATION</b>", 240, 168, 240, 16, "fontSize=7.5;fontColor=#0369A1;align=center;");

  const apiIntCards = [
    { title: "API Gateway", sub: "Apigee X", icon: "⚡" },
    { title: "Service Mesh", sub: "Istio", icon: "⛵" },
    { title: "Authentication", sub: "OAuth 2.0 / OIDC", icon: "🔒" },
    { title: "Rate Limiting & Quotas", sub: "Protection & QoS", icon: "⏱️" },
    { title: "Transformation", sub: "Cloud Data Fusion", icon: "⚙️" },
    { title: "Validation", sub: "Schema Registry (Confluent)", icon: "📑" },
  ];
  apiIntCards.forEach((ac, i) => {
    const acy = 190 + i * 64;
    const html = `<table style="width:100%;height:100%;"><tr><td style="width:24px;text-align:center;"><span style="font-size:16px;">${ac.icon}</span></td><td style="text-align:left;padding-left:4px;"><div style="font-size:8px;font-weight:800;color:#0F2A4A;">${ac.title}</div><div style="font-size:7px;color:#0284C7;font-weight:600;">${ac.sub}</div></td></tr></table>`;
    rect(`api_card_${i}`, html, 246, acy, 228, 58, "rounded=1;fillColor=#FFFFFF;strokeColor=#BAE6FD;");
  });

  // Column 2: Event Integration (x: 490 to 730)
  rect("ev_int_frame", "", 490, 165, 240, 420, "rounded=1;fillColor=#FAF5FF;strokeColor=#DDD6FE;");
  text("ev_int_title", "<b>EVENT INTEGRATION</b>", 490, 168, 240, 16, "fontSize=7.5;fontColor=#6D28D9;align=center;");

  const evTopHtml = `<table style="width:100%;height:100%;text-align:center;"><tr><td style="width:28px;"><span style="font-size:18px;">📡</span></td><td style="text-align:left;padding-left:4px;"><div style="font-size:8.5px;font-weight:800;color:#6D28D9;">Event Streaming</div><div style="font-size:7px;color:#475569;">Pub/Sub</div></td></tr></table>`;
  rect("ev_stream_pod", evTopHtml, 496, 190, 228, 54, "rounded=1;fillColor=#FFFFFF;strokeColor=#DDD6FE;");

  // Topics Box
  rect("topics_box", "", 496, 252, 228, 324, "rounded=1;fillColor=#FFFFFF;strokeColor=#DDD6FE;strokeWidth=1;");
  text("topics_title", "<b style='font-size:7.5px;color:#6D28D9;'>Topics / Domains</b>", 496, 256, 228, 16, "align=center;");

  const topics = [
    "clinical-events",
    "safety-events",
    "manufacturing-events",
    "master-data-events",
    "document-events",
    "audit-events",
  ];
  topics.forEach((tp, i) => {
    const tpy = 280 + i * 46;
    rect(`tp_card_${i}`, `<div style="text-align:center;font-size:7.5px;font-family:monospace;font-weight:700;color:#0F2A4A;">${tp}</div>`, 506, tpy, 208, 38, "rounded=1;fillColor=#FAF5FF;strokeColor=#DDD6FE;");
  });

  // Column 3: Data Integration (x: 740 to 995)
  rect("dt_int_frame", "", 740, 165, 255, 420, "rounded=1;fillColor=#F0FDF4;strokeColor=#BBF7D0;");
  text("dt_int_title", "<b>DATA INTEGRATION</b>", 740, 168, 255, 16, "fontSize=7.5;fontColor=#15803D;align=center;");

  const dtIntCards = [
    { title: "Batch / Bulk", sub: "Cloud Storage", icon: "🗄️" },
    { title: "ETL / ELT", sub: "Dataflow", icon: "🌊" },
    { title: "Replication (CDC)", sub: "Datastream", icon: "🔄" },
    { title: "Orchestration", sub: "Cloud Composer", icon: "🎼" },
    { title: "File Transfer", sub: "Cloud Storage Transfer", icon: "📁" },
  ];
  dtIntCards.forEach((dc, i) => {
    const dcy = 190 + i * 76;
    const html = `<table style="width:100%;height:100%;"><tr><td style="width:26px;text-align:center;"><span style="font-size:16px;">${dc.icon}</span></td><td style="text-align:left;padding-left:4px;"><div style="font-size:8.5px;font-weight:800;color:#0F2A4A;">${dc.title}</div><div style="font-size:7px;color:#15803D;font-weight:600;">${dc.sub}</div></td></tr></table>`;
    rect(`dt_card_${i}`, html, 748, dcy, 238, 68, "rounded=1;fillColor=#FFFFFF;strokeColor=#BBF7D0;");
  });

  // Cross-Cutting Integration Services (y: 592 to 662)
  rect("cross_int_frame", "", 240, 592, 755, 70, "rounded=1;strokeColor=#0284C7;strokeWidth=1;fillColor=#F8FAFC;");
  text("cross_int_title", "<b>CROSS-CUTTING INTEGRATION SERVICES</b>", 240, 594, 755, 14, "fontSize=7.5;fontColor=#0369A1;align=center;");

  const crossInt = [
    { title: "Monitoring", sub: "Cloud Monitoring", icon: "📈" },
    { title: "Logging", sub: "Cloud Logging", icon: "📑" },
    { title: "Tracing", sub: "Cloud Trace", icon: "🔍" },
    { title: "Error Handling", sub: "Dead Letter Queues", icon: "⚠️" },
    { title: "Data Quality", sub: "Dataplex", icon: "🛡️" },
    { title: "Schema Registry", sub: "Confluent", icon: "📑" },
    { title: "Governance", sub: "Data Catalog", icon: "🏛️" },
    { title: "Audit & Compliance", sub: "Cloud Audit Logs", icon: "📊" },
  ];
  crossInt.forEach((ci, i) => {
    const cix = 246 + i * 92;
    const html = `<div style="text-align:center;padding:1px;"><span style="font-size:12px;">${ci.icon}</span><div style="font-size:7px;font-weight:800;color:#0F2A4A;margin-top:1px;">${ci.title}</div><div style="font-size:6px;color:#64748B;">${ci.sub}</div></div>`;
    rect(`ci_pod_${i}`, html, cix, 610, 88, 48, "rounded=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;");
  });

  // =========================================================================
  // 5. RIGHT: INTEGRATION CONSUMERS (x: 1020 to 1270, y: 135 to 670)
  // =========================================================================
  rect("consumers_box", "", 1020, 135, 250, 535, "rounded=1;strokeColor=#1E3A8A;strokeWidth=1.5;fillColor=#FFFFFF;shadow=0;");
  rect("consumers_hdr", "<b style='font-size:9.5px;color:#FFFFFF;'>INTEGRATION CONSUMERS</b>", 1020, 135, 250, 26, "rounded=0;fillColor=#1E3A8A;strokeColor=#1E3A8A;align=center;");

  // Platform Services Section
  text("plat_cons_title", "<b>NOVACURA PLATFORM SERVICES</b>", 1020, 168, 250, 16, "fontSize=7.5;fontColor=#1E3A8A;align=center;");
  const platCons = [
    { title: "Data Ingestion Services", icon: "📥" },
    { title: "AI / ML Services", icon: "✨" },
    { title: "Workflow & Automation", icon: "🔄" },
    { title: "Analytics & Reporting", icon: "📊" },
    { title: "Search & Discovery", icon: "🔍" },
  ];
  platCons.forEach((pc, i) => {
    const pcy = 190 + i * 48;
    const html = `<table style="width:100%;height:100%;"><tr><td style="width:20px;text-align:center;"><span style="font-size:13px;">${pc.icon}</span></td><td style="text-align:left;padding-left:4px;"><div style="font-size:7.5px;font-weight:800;color:#0F2A4A;">${pc.title}</div></td></tr></table>`;
    rect(`pc_pod_${i}`, html, 1028, pcy, 234, 42, "rounded=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;");
  });

  // External Consumers Section
  text("ext_cons_title", "<b>EXTERNAL CONSUMERS</b>", 1020, 440, 250, 16, "fontSize=7.5;fontColor=#0D9488;align=center;");
  const extCons = [
    { title: "Downstream Applications", icon: "💻" },
    { title: "Partner Applications", icon: "🤝" },
    { title: "Regulatory Submissions", icon: "🏛️" },
    { title: "Data Sharing Exports", icon: "📤" },
    { title: "Third-party Analytics", icon: "📊" },
  ];
  extCons.forEach((ec, i) => {
    const ecy = 462 + i * 42;
    const html = `<table style="width:100%;height:100%;"><tr><td style="width:20px;text-align:center;"><span style="font-size:13px;">${ec.icon}</span></td><td style="text-align:left;padding-left:4px;"><div style="font-size:7.5px;font-weight:800;color:#0F2A4A;">${ec.title}</div></td></tr></table>`;
    rect(`ec_pod_${i}`, html, 1028, ecy, 234, 38, "rounded=1;fillColor=#F0FDFA;strokeColor=#CCFBF1;");
  });

  // =========================================================================
  // 6. FAR RIGHT: PROTOCOLS & STANDARDS (x: 1280 to 1540, y: 135 to 670)
  // =========================================================================
  rect("protocols_box", "", 1280, 135, 260, 535, "rounded=1;strokeColor=#0F2A4A;strokeWidth=1.5;fillColor=#FFFFFF;shadow=0;");
  rect("protocols_hdr", "<b style='font-size:9.5px;color:#FFFFFF;'>PROTOCOLS &amp; STANDARDS</b>", 1280, 135, 260, 26, "rounded=0;fillColor=#0F2A4A;strokeColor=#0F2A4A;align=center;");

  const protoSections = [
    {
      title: "APIS & MESSAGING",
      items: ["REST / JSON", "GraphQL", "gRPC", "SOAP / XML", "AsyncAPI"]
    },
    {
      title: "STREAMING",
      items: ["Apache Kafka (Pub/Sub)", "Cloud Pub/Sub", "Cloud Storage Events"]
    },
    {
      title: "DATA & FILE",
      items: ["SFTP / FTPS", "AS2", "HL7 FHIR", "CDISC (SDTM / ADaM)"]
    },
    {
      title: "SECURITY",
      items: ["TLS 1.2+", "OAuth 2.0 / OIDC", "mTLS", "WAF & DDoS Protection"]
    }
  ];

  let pY = 168;
  protoSections.forEach((ps, sIdx) => {
    text(`ps_hdr_${sIdx}`, `<b style='font-size:8px;color:#0284C7;'>${ps.title}</b>`, 1285, pY, 250, 14, "align=left;paddingLeft=4;");
    pY += 16;
    let bHtml = "";
    ps.items.forEach(it => {
      bHtml += `<div style="font-size:7px;color:#334155;line-height:1.25;margin-bottom:2px;">&bull; ${it}</div>`;
    });
    rect(`ps_box_${sIdx}`, `<div style="padding:4px;">${bHtml}</div>`, 1288, pY, 244, ps.items.length * 18 + 12, "rounded=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;");
    pY += ps.items.length * 18 + 20;
  });

  // =========================================================================
  // 7. BOTTOM: INTEGRATION FLOW OVERVIEW & PATTERNS (y: 680 to 805)
  // =========================================================================
  // Integration Flow Overview on Left (x: 20 to 700)
  rect("flow_box", "", 20, 680, 680, 120, "rounded=1;strokeColor=#1E3A8A;strokeWidth=1.2;fillColor=#FFFFFF;shadow=0;");
  rect("flow_hdr", "<b style='font-size:8.5px;color:#FFFFFF;'>INTEGRATION FLOW OVERVIEW</b>", 20, 680, 680, 20, "rounded=0;fillColor=#1E3A8A;strokeColor=#1E3A8A;align=center;");

  const flowSteps = [
    { num: "1", title: "Source system\npublishes data\nor triggers event" },
    { num: "2", title: "Request/data enters\nvia API Gateway\nor Event Stream" },
    { num: "3", title: "Validated, secured,\ntransformed &\nrouted" },
    { num: "4", title: "Delivered to target\nservice or\nevent topic" },
    { num: "5", title: "Consumed by\nplatform services\nor downstream apps" },
    { num: "6", title: "Insights, actions &\nfeedback loop\n(if applicable)" },
  ];
  flowSteps.forEach((fs, i) => {
    const fsx = 28 + i * 110;
    const html = `<div style="text-align:center;padding:2px;"><div style="width:18px;height:18px;border-radius:9px;background:#15803D;color:#FFFFFF;font-size:8.5px;font-weight:900;display:flex;align-items:center;justify-content:center;margin:0 auto;">${fs.num}</div><div style="font-size:6.5px;color:#334155;line-height:1.2;margin-top:3px;">${fs.title.replace(/\n/g, "<br/>")}</div></div>`;
    rect(`fs_pod_${i}`, html, fsx, 706, 102, 88, "rounded=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;");
  });

  // Integration Patterns on Right (x: 710 to 1540)
  rect("pat_box", "", 710, 680, 830, 120, "rounded=1;strokeColor=#7C3AED;strokeWidth=1.2;fillColor=#FFFFFF;shadow=0;");
  rect("pat_hdr", "<b style='font-size:8.5px;color:#FFFFFF;'>INTEGRATION PATTERNS</b>", 710, 680, 830, 20, "rounded=0;fillColor=#7C3AED;strokeColor=#7C3AED;align=center;");

  const patterns = [
    { title: "API-led", sub: "Expose and consume standardized APIs", icon: "⚡" },
    { title: "Event-Driven", sub: "Decouple systems using events", icon: "📡" },
    { title: "Batch ETL/ELT", sub: "Scheduled bulk data movement", icon: "🔄" },
    { title: "Change Data Capture", sub: "Real-time data sync using CDC", icon: "🔄" },
    { title: "File-based", sub: "Secure file exchange (SFTP/AS2)", icon: "📁" },
    { title: "Request-Reply", sub: "Synchronous interactions", icon: "💬" },
  ];
  patterns.forEach((pt, i) => {
    const row = Math.floor(i / 2);
    const col = i % 2;
    const ptx = 718 + col * 408;
    const pty = 708 + row * 28;
    const html = `<table style="width:100%;height:100%;"><tr><td style="width:20px;text-align:center;"><span style="font-size:13px;">${pt.icon}</span></td><td style="text-align:left;padding-left:4px;"><span style="font-size:7.5px;font-weight:800;color:#0F2A4A;">${pt.title}:</span> <span style="font-size:7px;color:#64748B;">${pt.sub}</span></td></tr></table>`;
    rect(`pat_pod_${i}`, html, ptx, pty, 400, 26, "rounded=1;fillColor=#FAF5FF;strokeColor=#DDD6FE;");
  });

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_10_integration_arch" name="10 — Integration Architecture">
    <mxGraphModel dx="1600" dy="820" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1560" pageHeight="820" background="${bg}" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${c.join("\n        ")}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
