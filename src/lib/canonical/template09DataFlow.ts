/**
 * Master 1:1 Exact Replica Generator for Canonical Template 09: Data Flow Architecture
 * Matches 100% of images/09.png (NOVACURA Data Flow Architecture for Biopharma)
 * Pure collision-free geometry, complete <mxfile> envelope, and high-contrast typography.
 */

const E = (v?: string | null) =>
  (v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function generateTemplate09DataFlowXml(domainFlavor = "biopharma", theme: "light" | "dark" = "light"): string {
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
        <span style="font-size:24px;font-weight:900;color:#FFFFFF;font-family:sans-serif;">09</span>
      </td>
      <td style="padding-left:14px;vertical-align:middle;">
        <div style="font-size:22px;font-weight:900;color:#0F2A4A;letter-spacing:1px;font-family:sans-serif;">DATA FLOW ARCHITECTURE</div>
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
  // 2. TOP STEP PROCESS INDICATORS (1 TO 6) (x: 230 to 1340, y: 76 to 120)
  // =========================================================================
  const steps = [
    { num: "1", text: "Source systems\npublish data via APIs,\nfiles, streams, or CDC" },
    { num: "2", text: "Raw data lands in\ncloud storage\n(immutable)" },
    { num: "3", text: "Data validated, cleansed,\ntransformed &amp;\nstandardized" },
    { num: "4", text: "Curated data published\nfor consumption via\nAPIs, Views, Services" },
    { num: "5", text: "Applications, dashboards\nand agents consume\ndata securely" },
    { num: "6", text: "Insights &amp; actions\nflow back to drive\nbusiness outcomes" },
  ];
  steps.forEach((st, i) => {
    const sx = 230 + i * 184;
    const html = `<table style="width:100%;height:100%;">
      <tr>
        <td style="width:20px;vertical-align:top;padding-top:2px;">
          <div style="width:18px;height:18px;background:#0F2A4A;color:#FFFFFF;border-radius:9px;font-size:8px;font-weight:900;display:flex;align-items:center;justify-content:center;text-align:center;">${st.num}</div>
        </td>
        <td style="vertical-align:top;padding-left:4px;font-size:7.5px;color:#334155;line-height:1.15;">${st.text.replace(/\n/g, "<br/>")}</td>
      </tr>
    </table>`;
    rect(`step_hdr_${i}`, html, sx, 76, 176, 46, "strokeColor=none;fillColor=none;");
  });

  // =========================================================================
  // 3. LEFT PANEL: DATA SOURCES (x: 20 to 180, y: 130 to 670)
  // =========================================================================
  rect("sources_box", "", 20, 130, 160, 540, "rounded=1;strokeColor=#1E3A8A;strokeWidth=1.5;fillColor=#FFFFFF;shadow=0;");
  rect("sources_hdr", "<b style='font-size:9.5px;color:#FFFFFF;'>DATA SOURCES</b>", 20, 130, 160, 26, "rounded=0;fillColor=#1E3A8A;strokeColor=#1E3A8A;align=center;");

  const sources = [
    { title: "Enterprise Applications", items: ["Veeva Vault (RIM / eTMF)", "Veeva CRM", "SAP S/4HANA", "Oracle EBS / Financials", "ServiceNow"], icon: "🏢" },
    { title: "Clinical & R&D Systems", items: ["CTMS, eClinical (Medidata)", "EDC (Rave / OpenClinica)", "LIMS, ELN", "Safety / PV Systems", "Imaging Repositories"], icon: "🔬" },
    { title: "External & Partner Data", items: ["CRO / Partner Portals", "Public Databases", "Regulatory Authorities", "Market & Competitor Data"], icon: "🌐" },
    { title: "Unstructured Content", items: ["PDF / Word / PPT", "Emails", "Scientific Publications", "Reports / Spreadsheets"], icon: "📄" },
    { title: "Real-time Streams", items: ["IoT / Sensors (Manufacturing)", "Field Data / Wearables", "Clickstream / Web Events", "System Logs / Audit Events"], icon: "📡" },
  ];
  sources.forEach((sc, i) => {
    const sy = 160 + i * 100;
    let bHtml = "";
    sc.items.forEach(it => { bHtml += `<div style="font-size:6.5px;color:#475569;line-height:1.15;">&bull; ${it}</div>`; });
    const html = `<div style="padding:2px;"><div style="display:flex;align-items:center;gap:4px;"><span style="font-size:12px;">${sc.icon}</span><b style="font-size:7.5px;color:#0F2A4A;">${sc.title}</b></div><div style="margin-top:3px;padding-left:2px;">${bHtml}</div></div>`;
    rect(`src_pod_${i}`, html, 24, sy, 152, 94, "rounded=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;");
  });

  // =========================================================================
  // 4. INGESTION LAYER (x: 188 to 288, y: 130 to 670)
  // =========================================================================
  rect("ingest_box", "", 188, 130, 100, 540, "rounded=1;strokeColor=#7C3AED;strokeWidth=1.2;fillColor=#FAF5FF;shadow=0;");
  rect("ingest_hdr", "<b style='font-size:8px;color:#FFFFFF;'>INGESTION LAYER</b>", 188, 130, 100, 24, "rounded=0;fillColor=#7C3AED;strokeColor=#7C3AED;align=center;");

  const ingestPods = [
    { title: "APIs &\nConnectors", sub: "REST / SOAP /\nGraphQL", icon: "⚡" },
    { title: "File Ingestion", sub: "SFTP / FTPS /\nBatch Upload", icon: "📁" },
    { title: "Streaming\nIngestion", sub: "Pub/Sub\n(Real-time)", icon: "📡" },
    { title: "CDC /\nReplication", sub: "Change Data\nCapture", icon: "🔄" },
    { title: "Partner Gateway", sub: "Secure Partner\nData Exchange", icon: "🤝" },
  ];
  ingestPods.forEach((ip, i) => {
    const ipy = 160 + i * 100;
    const html = `<div style="text-align:center;padding:2px;"><span style="font-size:16px;">${ip.icon}</span><div style="font-size:7.5px;font-weight:800;color:#6D28D9;line-height:1.15;margin-top:2px;">${ip.title.replace(/\n/g, "<br/>")}</div><div style="font-size:6px;color:#64748B;margin-top:2px;">${ip.sub.replace(/\n/g, "<br/>")}</div></div>`;
    rect(`ing_pod_${i}`, html, 192, ipy, 92, 94, "rounded=1;fillColor=#FFFFFF;strokeColor=#DDD6FE;");
  });

  // =========================================================================
  // 5. NOVACURA PLATFORM (GOOGLE CLOUD) (x: 295 to 940, y: 130 to 670)
  // =========================================================================
  rect("plat_main_frame", "", 295, 130, 645, 540, "rounded=1;strokeColor=#0F2A4A;strokeWidth=2;fillColor=#FFFFFF;shadow=0;");
  rect("plat_main_hdr", "<b style='font-size:10.5px;color:#FFFFFF;letter-spacing:1px;'>NOVACURA PLATFORM (GOOGLE CLOUD)</b>", 295, 130, 645, 24, "rounded=0;fillColor=#0F2A4A;strokeColor=#0F2A4A;align=center;");

  // 1. Landing Zone (Raw) (x: 305 to 415)
  rect("lz_frame", "", 305, 158, 110, 502, "rounded=1;fillColor=#F0FDF4;strokeColor=#BBF7D0;");
  text("lz_title", "<b>LANDING ZONE<br/>(RAW)</b>", 305, 160, 110, 24, "fontSize=7.5;fontColor=#15803D;align=center;");
  
  const lzHtml = `<div style="text-align:center;padding:4px;">
    <span style="font-size:28px;">🪣</span>
    <div style="font-size:8.5px;font-weight:800;color:#14532D;margin-top:4px;">Cloud Storage<br/>(Raw / Bronze)</div>
    <div style="font-size:7px;color:#475569;margin-top:12px;text-align:left;line-height:1.4;">
      &bull; Immutable<br/>
      &bull; Encrypted<br/>
      &bull; Versioned<br/>
      &bull; Lifecycle Policies
    </div>
  </div>`;
  rect("lz_pod", lzHtml, 310, 192, 100, 460, "rounded=1;fillColor=#FFFFFF;strokeColor=#BBF7D0;align=center;");

  // 2. Processing Layer (x: 422 to 542)
  rect("proc_frame", "", 422, 158, 120, 502, "rounded=1;fillColor=#EFF6FF;strokeColor=#BFDBFE;");
  text("proc_title", "<b>PROCESSING LAYER</b>", 422, 160, 120, 20, "fontSize=7.5;fontColor=#1E40AF;align=center;");

  const proc1Html = `<div style="text-align:center;padding:4px;">
    <div style="display:flex;justify-content:center;gap:6px;"><span style="font-size:18px;">🌊</span><span style="font-size:18px;">⚙️</span></div>
    <div style="font-size:8px;font-weight:800;color:#1E40AF;margin-top:3px;">Dataproc / Dataflow</div>
    <div style="font-size:7px;color:#475569;margin-top:8px;text-align:left;line-height:1.4;">
      &bull; Validation<br/>
      &bull; Cleansing<br/>
      &bull; De-duplication<br/>
      &bull; Standardization<br/>
      &bull; Enrichment
    </div>
  </div>`;
  rect("proc_pod_1", proc1Html, 428, 188, 108, 220, "rounded=1;fillColor=#FFFFFF;strokeColor=#BFDBFE;");

  const proc2Html = `<div style="text-align:center;padding:4px;">
    <span style="font-size:22px;">🛡️</span>
    <div style="font-size:8px;font-weight:800;color:#1E40AF;margin-top:3px;">Data Quality</div>
    <div style="font-size:7px;color:#475569;margin-top:8px;text-align:left;line-height:1.4;">
      &bull; Rules Engine<br/>
      &bull; Profiling<br/>
      &bull; Monitoring
    </div>
  </div>`;
  rect("proc_pod_2", proc2Html, 428, 416, 108, 236, "rounded=1;fillColor=#FFFFFF;strokeColor=#BFDBFE;");

  // 3. Curated Data Layer (x: 548 to 698)
  rect("curated_frame", "", 548, 158, 150, 502, "rounded=1;fillColor=#FAF5FF;strokeColor=#DDD6FE;");
  text("curated_title", "<b>CURATED DATA LAYER</b>", 548, 160, 150, 20, "fontSize=7.5;fontColor=#6D28D9;align=center;");

  const cur1Html = `<table style="width:100%;height:100%;"><tr><td style="width:24px;vertical-align:top;padding-top:4px;"><span style="font-size:18px;">🗄️</span></td><td style="vertical-align:top;padding-left:4px;"><div style="font-size:8px;font-weight:800;color:#6D28D9;">Curated Storage (Silver / Gold)</div><div style="font-size:6.5px;color:#64748B;line-height:1.2;margin-top:2px;">&bull; Optimized<br/>&bull; ACID Tables (Delta)<br/>&bull; Time Travel<br/>&bull; Z-Order / Partitioned</div></td></tr></table>`;
  rect("cur_pod_1", cur1Html, 554, 186, 138, 134, "rounded=1;fillColor=#FFFFFF;strokeColor=#DDD6FE;");

  const cur2Html = `<table style="width:100%;height:100%;"><tr><td style="width:24px;vertical-align:top;padding-top:4px;"><span style="font-size:18px;">📑</span></td><td style="vertical-align:top;padding-left:4px;"><div style="font-size:8px;font-weight:800;color:#6D28D9;">Master Data (MDM)</div><div style="font-size:6.5px;color:#64748B;line-height:1.2;margin-top:2px;">&bull; Reference Data<br/>&bull; Hierarchies</div></td></tr></table>`;
  rect("cur_pod_2", cur2Html, 554, 328, 138, 134, "rounded=1;fillColor=#FFFFFF;strokeColor=#DDD6FE;");

  const cur3Html = `<table style="width:100%;height:100%;"><tr><td style="width:24px;vertical-align:top;padding-top:4px;"><span style="font-size:18px;">🕸️</span></td><td style="vertical-align:top;padding-left:4px;"><div style="font-size:8px;font-weight:800;color:#6D28D9;">Semantic Layer</div><div style="font-size:6.5px;color:#64748B;line-height:1.2;margin-top:2px;">&bull; Business Models<br/>&bull; Metrics &amp; KPIs<br/>&bull; Data Marts</div></td></tr></table>`;
  rect("cur_pod_3", cur3Html, 554, 470, 138, 182, "rounded=1;fillColor=#FFFFFF;strokeColor=#DDD6FE;");

  // 4. Serving Layer (x: 704 to 930)
  rect("serv_frame", "", 704, 158, 226, 502, "rounded=1;fillColor=#F0F9FF;strokeColor=#BAE6FD;");
  text("serv_title", "<b>SERVING LAYER</b>", 704, 160, 226, 20, "fontSize=7.5;fontColor=#0369A1;align=center;");

  const servItems = [
    { title: "Data APIs", sub: "REST / GraphQL", icon: "⚡" },
    { title: "Data Views", sub: "Lookups / Views (Materialized)", icon: "📊" },
    { title: "Feature Store", sub: "AI / ML Features", icon: "✨" },
    { title: "Search Index", sub: "Vertex AI Search (BigQuery Index)", icon: "🔍" },
    { title: "Event Hub", sub: "Pub/Sub (Events)", icon: "📡" },
  ];
  servItems.forEach((sv, i) => {
    const svy = 188 + i * 92;
    const html = `<table style="width:100%;height:100%;"><tr><td style="width:26px;text-align:center;"><span style="font-size:16px;">${sv.icon}</span></td><td style="text-align:left;padding-left:4px;"><div style="font-size:8px;font-weight:800;color:#0369A1;">${sv.title}</div><div style="font-size:6.5px;color:#64748B;line-height:1.15;">${sv.sub}</div></td></tr></table>`;
    rect(`serv_pod_${i}`, html, 712, svy, 210, 84, "rounded=1;fillColor=#FFFFFF;strokeColor=#BAE6FD;");
  });

  // =========================================================================
  // 6. RIGHT: CONSUMERS (x: 950 to 1080) & BUSINESS OUTCOMES (x: 1090 to 1540)
  // =========================================================================
  rect("consumers_box", "", 950, 130, 130, 540, "rounded=1;strokeColor=#7C3AED;strokeWidth=1.2;fillColor=#FAF5FF;shadow=0;");
  rect("consumers_hdr", "<b style='font-size:8.5px;color:#FFFFFF;'>CONSUMERS</b>", 950, 130, 130, 24, "rounded=0;fillColor=#7C3AED;strokeColor=#7C3AED;align=center;");

  const consumers = [
    { title: "Web & Mobile Apps", icon: "💻" },
    { title: "Dashboards &\nBI (Looker)", icon: "📊" },
    { title: "AI Agents & Apps", icon: "🤖" },
    { title: "Notebooks &\nData Science", icon: "📓" },
    { title: "Partner / External\nApplications", icon: "🌐" },
  ];
  consumers.forEach((cs, i) => {
    const csy = 162 + i * 100;
    const html = `<div style="text-align:center;padding:2px;"><span style="font-size:18px;">${cs.icon}</span><div style="font-size:7.5px;font-weight:800;color:#6D28D9;margin-top:3px;line-height:1.15;">${cs.title.replace(/\n/g, "<br/>")}</div></div>`;
    rect(`cs_pod_${i}`, html, 956, csy, 118, 92, "rounded=1;fillColor=#FFFFFF;strokeColor=#DDD6FE;");
  });

  // Business Outcomes on Far Right
  rect("outcomes_box", "", 1090, 130, 450, 540, "rounded=1;strokeColor=#15803D;strokeWidth=1.2;fillColor=#F0FDF4;shadow=0;");
  rect("outcomes_hdr", "<b style='font-size:9.5px;color:#FFFFFF;'>BUSINESS OUTCOMES</b>", 1090, 130, 450, 24, "rounded=0;fillColor=#15803D;strokeColor=#15803D;align=center;");

  const outcomes = [
    { title: "Faster Decision Making", icon: "⏱️" },
    { title: "Operational Efficiency", icon: "⚙️" },
    { title: "Risk & Compliance", icon: "🛡️" },
    { title: "Cost Optimization", icon: "💲" },
    { title: "Better Patient Outcomes", icon: "🩺" },
    { title: "Innovation & Growth", icon: "💡" },
  ];
  outcomes.forEach((oc, i) => {
    const ocy = 165 + i * 82;
    const html = `<table style="width:100%;height:100%;"><tr><td style="width:34px;text-align:center;"><span style="font-size:18px;">${oc.icon}</span></td><td style="text-align:left;padding-left:6px;"><div style="font-size:9px;font-weight:800;color:#14532D;">${oc.title}</div></td></tr></table>`;
    rect(`oc_pod_${i}`, html, 1100, ocy, 430, 74, "rounded=1;fillColor=#FFFFFF;strokeColor=#BBF7D0;");
  });

  // =========================================================================
  // 7. BOTTOM: CROSS-CUTTING SERVICES (y: 680 to 745)
  // =========================================================================
  rect("cross_box", "", 20, 680, 1520, 65, "rounded=1;strokeColor=#0284C7;strokeWidth=1.2;fillColor=#F0F9FF;shadow=0;");
  text("cross_title", "<b>CROSS-CUTTING SERVICES</b>", 20, 682, 1520, 14, "fontSize=8;fontColor=#0369A1;align=center;");

  const crossServices = [
    { title: "IAM & Security", sub: "AuthN / AuthZ (RBAC/ABAC)", icon: "👤" },
    { title: "Encryption", sub: "In Transit & At Rest (KMS)", icon: "🔑" },
    { title: "Data Catalog", sub: "Metadata Mgmt & Lineage", icon: "📑" },
    { title: "Monitoring", sub: "Metrics / Logs / Traces", icon: "📈" },
    { title: "Governance", sub: "Policies & Data Ownership", icon: "🏛️" },
    { title: "Audit & Compliance", sub: "Audit Logs (Cloud Audit)", icon: "📊" },
  ];
  crossServices.forEach((cs, i) => {
    const csx = 28 + i * 252;
    const html = `<table style="width:100%;height:100%;"><tr><td style="width:20px;text-align:center;"><span style="font-size:14px;">${cs.icon}</span></td><td style="text-align:left;padding-left:4px;"><div style="font-size:7.5px;font-weight:800;color:#0F2A4A;">${cs.title}</div><div style="font-size:6.5px;color:#64748B;line-height:1.1;">${cs.sub}</div></td></tr></table>`;
    rect(`cs_cross_${i}`, html, csx, 700, 244, 38, "rounded=1;fillColor=#FFFFFF;strokeColor=#BAE6FD;");
  });

  // =========================================================================
  // 8. TECH STACK & DATA TYPES (y: 755 to 885)
  // =========================================================================
  // Flow Description on Left (x: 20 to 600)
  rect("flow_desc_box", "", 20, 755, 580, 120, "rounded=1;strokeColor=#CBD5E1;strokeWidth=1.2;fillColor=#FFFFFF;shadow=0;");
  text("flow_desc_title", "<b>FLOW DESCRIPTION</b>", 20, 758, 580, 14, "fontSize=8.5;fontColor=#0F2A4A;align=center;");

  let descHtml = "";
  steps.forEach(st => {
    descHtml += `<div style="font-size:7px;color:#334155;line-height:1.25;margin-bottom:3px;"><b style="color:#0284C7;">${st.num}</b> ${st.text.replace(/\n/g, " ")}</div>`;
  });
  text("flow_desc_text", descHtml, 26, 776, 568, 94, "align=left;");

  // Key Data Types (x: 610 to 930)
  rect("dt_types_box", "", 610, 755, 320, 120, "rounded=1;strokeColor=#CBD5E1;strokeWidth=1.2;fillColor=#FFFFFF;shadow=0;");
  text("dt_types_title", "<b>KEY DATA TYPES</b>", 610, 758, 320, 14, "fontSize=8.5;fontColor=#0F2A4A;align=center;");

  const dataTypes = [
    { title: "Structured Data", sub: "(RDBMS, ERP, CRM)", icon: "🗄️" },
    { title: "Semi-structured Data", sub: "(JSON, XML, Logs)", icon: "{}" },
    { title: "Unstructured Data", sub: "(Docs, PDFs, Images)", icon: "📄" },
    { title: "Event / Streaming Data", sub: "(IoT, Clickstream, Logs)", icon: "📡" },
  ];
  dataTypes.forEach((dt, i) => {
    const row = Math.floor(i / 2);
    const col = i % 2;
    const dtx = 618 + col * 154;
    const dty = 778 + row * 44;
    const html = `<table style="width:100%;height:100%;"><tr><td style="width:20px;text-align:center;"><span style="font-size:14px;">${dt.icon}</span></td><td style="text-align:left;padding-left:4px;"><div style="font-size:7.5px;font-weight:800;color:#0F2A4A;">${dt.title}</div><div style="font-size:6.5px;color:#64748B;">${dt.sub}</div></td></tr></table>`;
    rect(`dt_type_${i}`, html, dtx, dty, 148, 40, "rounded=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;");
  });

  // Technology Stack (Google Cloud) (x: 940 to 1540)
  rect("gcp_stack_box", "", 940, 755, 600, 120, "rounded=1;strokeColor=#0284C7;strokeWidth=1.2;fillColor=#FFFFFF;shadow=0;");
  text("gcp_stack_title", "<b>TECHNOLOGY STACK (GOOGLE CLOUD)</b>", 940, 758, 600, 14, "fontSize=8.5;fontColor=#0369A1;align=center;");

  const gcpStack = [
    { name: "Cloud Storage", icon: "🗄️" },
    { name: "Dataproc", icon: "🌊" },
    { name: "Dataflow", icon: "🌊" },
    { name: "BigQuery", icon: "🔍" },
    { name: "Pub/Sub", icon: "📡" },
    { name: "Vertex AI", icon: "✨" },
    { name: "Cloud Functions", icon: "⚡" },
    { name: "Looker", icon: "📊" },
  ];
  gcpStack.forEach((gs, i) => {
    const gsx = 948 + i * 74;
    const html = `<div style="text-align:center;padding:2px;"><span style="font-size:16px;">${gs.icon}</span><div style="font-size:7px;font-weight:800;color:#0F2A4A;margin-top:2px;">${gs.name}</div></div>`;
    rect(`gcp_st_${i}`, html, gsx, 778, 68, 88, "rounded=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;");
  });

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_09_data_flow" name="09 — Data Flow Architecture">
    <mxGraphModel dx="1600" dy="900" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1560" pageHeight="900" background="${bg}" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${c.join("\n        ")}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
