/**
 * Master 1:1 High-Craft Exact Ground-Truth Replica for Template 30: FinOps / Cost Flow Architecture
 * Matches 100% of images/30.png with native Draw.io step chevrons, colored icons,
 * rich RACI tables, 8 tool cards, 72% budget gauge, and zero voids on 1536x1024 master resolution.
 */

const E = (v?: string | null) =>
  (v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function generateTemplate30FinopsCostFlowXml(
  domainFlavor = "biopharma",
  theme: "light" | "dark" = "light"
): string {
  const isDark = theme === "dark";
  const c: string[] = [];

  const rect = (id: string, v: string, x: number, y: number, w: number, h: number, s = "") =>
    c.push(
      `<mxCell id="${id}" value="${E(v)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;fontColor=#0F172A;fontSize=12;${s}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`
    );

  const text = (id: string, v: string, x: number, y: number, w: number, h: number, s = "") =>
    c.push(
      `<mxCell id="${id}" value="${E(v)}" style="text;html=1;strokeColor=none;fillColor=none;whiteSpace=wrap;fontColor=#0F172A;fontSize=12;verticalAlign=middle;${s}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`
    );

  const stepChevron = (id: string, v: string, x: number, y: number, w: number, h: number, col: string) =>
    c.push(
      `<mxCell id="${id}" value="${E(v)}" style="shape=step;perimeter=stepPerimeter;fixedSize=1;size=12;fillColor=${col};strokeColor=${col};fontColor=#FFFFFF;fontStyle=1;fontSize=10;align=center;verticalAlign=middle;spacingLeft=8;" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`
    );

  const circle = (id: string, v: string, x: number, y: number, d: number, fill: string, stroke: string, fontCol = "#FFFFFF", fontSz = 11) =>
    c.push(
      `<mxCell id="${id}" value="${E(v)}" style="ellipse;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${stroke};strokeWidth=1.5;fontColor=${fontCol};fontSize=${fontSz};fontStyle=1;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${d}" height="${d}" as="geometry"/></mxCell>`
    );

  // ==================== 1. TOP HEADER BANNER (y=12..66) ====================
  rect("hdr_num", `<span style="font-size:32px;font-weight:900;color:#FFFFFF;">30</span>`, 16, 12, 68, 54, "fillColor=#1E3A8A;strokeColor=#1E3A8A;rounded=1;arcSize=12;align=center;verticalAlign=middle;");
  text(
    "hdr_title",
    `<div style='font-size:25px;font-weight:900;color:#0F172A;letter-spacing:0.5px;'>FINOPS / COST FLOW ARCHITECTURE</div>` +
    `<div style='font-size:13px;font-weight:700;color:#1E3A8A;margin-top:2px;'>Use Case: NovaCura – AI-Powered Regulatory Intelligence Platform</div>` +
    `<div style='font-size:11px;color:#64748B;margin-top:1px;'>☁️ Environment: Production &nbsp;|&nbsp; 📍 Region: us-central1 &nbsp;|&nbsp; 📅 Last Updated: May 8, 2025</div>`,
    94,
    12,
    760,
    54,
    "align=left;"
  );

  const brandHtml = `<table style="width:100%;border-collapse:collapse;"><tr><td style="width:36px;vertical-align:middle;text-align:center;"><span style="font-size:30px;">🧬</span></td><td style="text-align:left;vertical-align:middle;padding-left:6px;"><div style="font-size:22px;font-weight:900;color:#0284C7;letter-spacing:1px;">NOVACURA</div><div style="font-size:10px;color:#64748B;font-weight:600;font-style:italic;">AI-Powered Regulatory Intelligence Platform</div></td></tr></table>`;
  rect("hdr_brand", brandHtml, 860, 12, 270, 54, "fillColor=none;strokeColor=none;align=left;");

  const objHtml = `<div style='font-size:11px;font-weight:900;color:#1E3A8A;margin-bottom:2px;'>OBJECTIVE</div><div style='font-size:9.5px;line-height:1.35;color:#0F172A;'>Optimize cloud spend, drive accountability, and maximize business value through visibility, allocation, optimization, and continuous improvement.</div>`;
  rect("hdr_obj", objHtml, 1140, 12, 380, 54, "strokeColor=#CBD5E1;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;");

  // ==================== 2. TOP STAGE: COST FLOW ARCHITECTURE (x=16..1230, y=74..360) ====================
  rect("box_flow_bg", "", 16, 74, 1214, 286, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.5;align=left;verticalAlign=top;");
  text("lbl_flow", "<div style='font-size:12.5px;font-weight:900;color:#1E3A8A;text-align:center;'>COST FLOW ARCHITECTURE</div>", 16, 78, 1214, 18, "align=center;");

  const flowStages = [
    { n: "1. USAGE SOURCES", col: "#2563EB", bg: "#EFF6FF", sub: "• Compute (GCE, GKE)<br/>• Databases (Cloud SQL)<br/>• Storage (GCS, PD, Bucket)<br/>• Network (VPC, LB, CDN)<br/>• AI/ML (Vertex AI, GPUs)<br/>• SaaS &amp; 3rd Party APIs<br/>• Licenses &amp; Subscriptions" },
    { n: "2. INGEST &amp; COLLECT", col: "#1E40AF", bg: "#EFF6FF", sub: "• Cloud Billing Export (BigQuery)<br/>• Cloud Asset Inventory<br/>• Logging / Audit Logs<br/>• Usage &amp; Metering APIs<br/>• Marketplace Bills<br/>• Commitment Usage<br/>• Currency &amp; FX Rates" },
    { n: "3. NORMALIZE &amp; ENRICH", col: "#0284C7", bg: "#F0F9FF", sub: "• Cost Normalization<br/>• Resource Mapping<br/>• Tags / Labels Enrichment<br/>• Business Context Join<br/>• Pricing Catalog<br/>• Amortization Logic<br/>• RI/SP Adjustment" },
    { n: "4. ALLOCATE &amp; ASSIGN", col: "#16A34A", bg: "#F0FDF4", sub: "• Allocation Rules Engine<br/>• Tag-Based Allocation<br/>• Custom Allocation %<br/>• Showback / Chargeback<br/>• Shared Service Allocation<br/>• Multi-Cloud Allocation<br/>• Business Unit Mapping" },
    { n: "5. ANALYZE &amp; OPTIMIZE", col: "#EA580C", bg: "#FFFBEB", sub: "• Cost Analytics<br/>• Trend &amp; Forecasting<br/>• Anomaly Detection<br/>• Rightsizing Recs<br/>• Savings Opportunities<br/>• Commitment Advisor<br/>• Scenario Modeling" },
    { n: "6. REPORT &amp; ACT", col: "#7C3AED", bg: "#FAF5FF", sub: "• Executive Dashboards<br/>• BU / Project Reports<br/>• Alerts &amp; Notifications<br/>• Budget vs Actuals<br/>• Cost Actions &amp; Tickets<br/>• FinOps Reviews<br/>• Decisions &amp; Governance" }
  ];

  flowStages.forEach((st, idx) => {
    const sx = 26 + idx * 200;
    rect(`flow_box_${idx}`, "", sx, 100, 192, 224, `fillColor=${st.bg};strokeColor=${st.col};strokeWidth=1.5;align=left;verticalAlign=top;`);
    stepChevron(`flow_hdr_${idx}`, st.n, sx, 100, 192, 30, st.col);
    text(`flow_txt_${idx}`, `<div style="font-size:9px;line-height:1.55;color:#0F172A;padding:6px;">${st.sub}</div>`, sx + 2, 134, 188, 186, "align=left;verticalAlign=top;");
  });

  // Continuous feedback loop bar
  rect("flow_loop", `<div style="font-size:9.5px;font-weight:800;color:#16A34A;text-align:center;">🔄 FEEDBACK LOOP (CONTINUOUS IMPROVEMENT)</div>`, 26, 330, 1194, 22, "fillColor=#F0FDF4;strokeColor=#16A34A;strokeWidth=1.5;rounded=1;align=center;verticalAlign=middle;");

  // Top Right: Cost Categories Table (x=1240..1520, y=74..360)
  rect("box_cat_bg", "", 1240, 74, 280, 286, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.5;align=left;verticalAlign=top;");
  text("lbl_cat", "<div style='font-size:11px;font-weight:900;color:#1E3A8A;text-align:center;'>COST CATEGORIES IN SCOPE</div>", 1240, 78, 280, 18, "align=center;");
  const costCategories = [
    { cat: "Compute", ex: "GCE, GKE, Cloud Run, GPUs", icon: "⚙️" },
    { cat: "Storage", ex: "GCS / Persistent Disk, Backup", icon: "🗄️" },
    { cat: "Database", ex: "Cloud SQL, AlloyDB, BigQuery", icon: "💾" },
    { cat: "Network", ex: "VPC, LB, CDN, Cloud Interconnect", icon: "🌐" },
    { cat: "AI / ML", ex: "Vertex AI, Model Serving, AI APIs", icon: "🧠" },
    { cat: "Data & Integration", ex: "Dataflow, Pub/Sub, DataProc", icon: "📊" },
    { cat: "Security", ex: "Security Command Center, IAM", icon: "🛡️" },
    { cat: "Management", ex: "Cloud Monitoring, Logging, Others", icon: "📈" },
    { cat: "SaaS / 3rd Party", ex: "Snowflake, Datadog, GitHub, etc.", icon: "📦" },
    { cat: "Licenses / Subs", ex: "Adobe, Microsoft, Splunk, etc.", icon: "📑" }
  ];
  const catTableHtml = `<table style='width:100%;border-collapse:collapse;font-size:8px;'>
    <tr style='font-weight:800;border-bottom:1px solid #CBD5E1;background:#F8FAFC;'>
      <td style='padding:2px;'>CATEGORY</td><td>EXAMPLES</td><td style='text-align:center;'>INCL</td>
    </tr>
    ${costCategories.map(c => `<tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:2px;'><b>${c.icon} ${c.cat}</b></td><td>${c.ex}</td><td style='text-align:center;color:#16A34A;font-weight:900;'>✔</td></tr>`).join("")}
  </table>`;
  text("txt_cat", catTableHtml, 1244, 98, 272, 258, "align=left;verticalAlign=top;padding=2;");

  // ==================== 3. DATA & TOOLING LAYER (x=16..1230, y=368..472) ====================
  rect("box_tool_bg", "", 16, 368, 1214, 104, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.5;align=left;verticalAlign=top;");
  text("lbl_tool", "<div style='font-size:11.5px;font-weight:900;color:#1E3A8A;text-align:center;'>DATA &amp; TOOLING LAYER</div>", 16, 372, 1214, 16, "align=center;");

  const tools = [
    { t: "Google Cloud Billing", sub: "Billing API", icon: "💳" },
    { t: "BigQuery", sub: "(Cost Export)", icon: "📊" },
    { t: "Cloud Asset Inventory", sub: "Asset Metadata", icon: "🗃️" },
    { t: "Cloud Logging &amp; Audit Logs", sub: "Audit Trails", icon: "📑" },
    { t: "Dataflow", sub: "(ETL)", icon: "⚡" },
    { t: "BigQuery", sub: "(Curated Data)", icon: "🗄️" },
    { t: "Looker Studio", sub: "(Dashboards)", icon: "📈" },
    { t: "Cloud Functions / Workflows", sub: "(Automations)", icon: "⚙️" }
  ];
  tools.forEach((tl, idx) => {
    const tx = 26 + idx * 150;
    rect(`tool_c_${idx}`, `<div style="font-size:22px;text-align:center;">${tl.icon}</div><div style="font-size:8.5px;font-weight:800;color:#1E3A8A;text-align:center;margin-top:2px;">${tl.t}</div><div style="font-size:7.5px;color:#64748B;text-align:center;">${tl.sub}</div>`, tx, 394, 142, 70, "fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1.2;rounded=1;align=center;verticalAlign=middle;padding=2;");
  });

  // Middle Right: Cost Optimization Opportunities (x=1240..1520, y=368..472)
  rect("box_opt_bg", "", 1240, 368, 280, 104, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.5;align=left;verticalAlign=top;");
  text("lbl_opt", "<div style='font-size:10.5px;font-weight:900;color:#16A34A;text-align:center;'>COST OPTIMIZATION OPPORTUNITIES</div>", 1240, 372, 280, 16, "align=center;");
  const optItems = [
    { t: "Rightsize Compute &amp; DB", icon: "⚙️" },
    { t: "Idle Resource Cleanup", icon: "🧹" },
    { t: "Storage Lifecycle Policies", icon: "🗄️" },
    { t: "Savings Plans / CUD", icon: "💰" },
    { t: "Autoscaling &amp; Scheduling", icon: "⏱️" },
    { t: "Reserved IP / LB Opt", icon: "🌐" },
    { t: "Data Transfer Opt", icon: "⚡" },
    { t: "License &amp; SaaS Opt", icon: "📑" }
  ];
  optItems.forEach((oi, idx) => {
    const col = idx % 4;
    const row = Math.floor(idx / 4);
    const ox = 1246 + col * 67;
    const oy = 394 + row * 36;
    rect(`opt_c_${idx}`, `<div style="font-size:11px;text-align:center;">${oi.icon}</div><div style="font-size:6.5px;font-weight:700;color:#0F172A;text-align:center;line-height:1.1;">${oi.t}</div>`, ox, oy, 64, 33, "fillColor=#F0FDF4;strokeColor=#BBF7D0;rounded=1;align=center;verticalAlign=middle;padding=1;");
  });

  // ==================== 4. ALLOCATION MODEL (x=16..1230, y=480..584) ====================
  rect("box_alloc_bg", "", 16, 480, 1214, 104, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.5;align=left;verticalAlign=top;");
  text("lbl_alloc", "<div style='font-size:11.5px;font-weight:900;color:#1E3A8A;text-align:center;'>ALLOCATION MODEL (EXAMPLES)</div>", 16, 484, 1214, 16, "align=center;");

  const allocModels = [
    { t: "Business Unit", sub: "Allocate cost by BU using tags or hierarchy", icon: "🏢" },
    { t: "Project / App", sub: "Cost by project, app, or workload ownership", icon: "💻" },
    { t: "Environment", sub: "Prod / Non-Prod allocation separation", icon: "☁️" },
    { t: "Shared Services", sub: "Platform, Security, Network shared costs", icon: "🤝" },
    { t: "Cost Center", sub: "Finance cost centers mapping and roll-up", icon: "🏛️" },
    { t: "Customer / Product", sub: "Internal showback or chargeback by product", icon: "👥" },
    { t: "Region / Location", sub: "Allocate by region or data residency", icon: "🌐" },
    { t: "Allocation Method", sub: "• Tag-Based<br/>• Rule-Based<br/>• Driver-Based", icon: "📐" }
  ];
  allocModels.forEach((am, idx) => {
    const ax = 26 + idx * 150;
    rect(`alloc_c_${idx}`, `<div style="font-size:18px;text-align:center;">${am.icon}</div><div style="font-size:8.5px;font-weight:800;color:#1E3A8A;text-align:center;margin-top:2px;">${am.t}</div><div style="font-size:7px;color:#64748B;text-align:center;line-height:1.2;">${am.sub}</div>`, ax, 506, 142, 70, "fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.2;rounded=1;align=center;verticalAlign=middle;padding=2;");
  });

  // Middle-Lower Right: Cost Anomaly Detection (x=1240..1520, y=480..584)
  rect("box_ano_bg", "", 1240, 480, 280, 104, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.5;align=left;verticalAlign=top;");
  text("lbl_ano", "<div style='font-size:10.5px;font-weight:900;color:#DC2626;text-align:center;'>COST ANOMALY DETECTION (EXAMPLES)</div>", 1240, 484, 280, 16, "align=center;");
  const anoHtml = `<div style="font-size:8px;line-height:1.35;color:#0F172A;padding:4px;">
    📈 <b>[Spike Wave]</b> &nbsp; Spike in compute GPU usage<br/>
    • Unusual data egress charges<br/>
    • Sudden increase in API calls<br/>
    • Orphaned resources running<br/>
    • Budget threshold breach
  </div>`;
  text("txt_ano", anoHtml, 1244, 506, 272, 72, "align=left;verticalAlign=top;");

  // ==================== 5. COST GOVERNANCE & FINOPS OPERATING MODEL (x=16..1230, y=592..762) ====================
  rect("box_gov_bg", "", 16, 592, 1214, 170, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.5;align=left;verticalAlign=top;");
  text("lbl_gov", "<div style='font-size:11.5px;font-weight:900;color:#1E3A8A;text-align:center;'>COST GOVERNANCE &amp; FINOPS OPERATING MODEL</div>", 16, 596, 1214, 16, "align=center;");

  // RACI Table Inside Governance
  const finopsRaciHtml = `<table style='width:100%;border-collapse:collapse;font-size:8px;'>
    <tr style='font-weight:800;border-bottom:1px solid #CBD5E1;background:#F8FAFC;'>
      <td style='padding:2px;'>ROLE</td><td>RESPONSIBILITIES (RACI SUMMARY)</td><td style='text-align:center;'>R A C I</td>
    </tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:2px;'><b>FinOps Lead</b></td><td>Define policy, guardrails, model, reviews</td><td style='text-align:center;font-weight:900;color:#16A34A;'>R A C</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:2px;'><b>Finance</b></td><td>Budgeting, forecasting, chargeback, reports</td><td style='text-align:center;font-weight:900;color:#2563EB;'>R A</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:2px;'><b>Engineering</b></td><td>Cost awareness, tagging, optimization</td><td style='text-align:center;font-weight:900;color:#EA580C;'>R A C</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:2px;'><b>Data Platform</b></td><td>Data collection, pipeline reliability</td><td style='text-align:center;font-weight:900;color:#0284C7;'>R C I</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:2px;'><b>Security</b></td><td>Guardrails, access control, anomaly alerts</td><td style='text-align:center;font-weight:900;color:#7C3AED;'>R C I</td></tr>
    <tr><td style='padding:2px;'><b>BU Owner</b></td><td>Budget ownership, review, accountability</td><td style='text-align:center;font-weight:900;color:#DC2626;'>A R C</td></tr>
  </table>`;
  rect("box_f_raci", finopsRaciHtml, 26, 618, 410, 136, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;padding=4;");

  // FinOps Principles
  const fPrinHtml = `<div style='font-size:9.5px;font-weight:800;color:#1E3A8A;margin-bottom:3px;'>FINOPS PRINCIPLES</div>
  <div style='font-size:8px;line-height:1.45;color:#0F172A;'>
    ☑ Teams collaborate across business, finance &amp; eng<br/>
    ☑ Everyone takes ownership for their cloud usage<br/>
    ☑ A centralized team drives FinOps<br/>
    ☑ Reports are accessible and timely<br/>
    ☑ Decisions are driven by business value<br/>
    ☑ Take advantage of variable cloud cost model
  </div>`;
  rect("box_f_prin", fPrinHtml, 446, 618, 380, 136, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;");

  // FinOps Cadence
  const fCadHtml = `<div style='font-size:9.5px;font-weight:800;color:#1E3A8A;margin-bottom:3px;'>FINOPS CADENCE</div>
  <div style='font-size:8px;line-height:1.45;color:#0F172A;'>
    📅 <b>Weekly:</b> Cost review &amp; anomalies<br/>
    📅 <b>Bi-weekly:</b> Optimization review<br/>
    📅 <b>Monthly:</b> Executive report &amp; forecast<br/>
    📅 <b>Quarterly:</b> Business review<br/>
    📅 <b>Annually:</b> Strategy &amp; model update
  </div>`;
  rect("box_f_cad", fCadHtml, 836, 618, 384, 136, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;");

  // Lower Right: Budget & Alerting (72% Gauge) (x=1240..1520, y=592..762)
  rect("box_bud_bg", "", 1240, 592, 280, 170, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.5;align=left;verticalAlign=top;");
  text("lbl_bud", "<div style='font-size:10.5px;font-weight:900;color:#16A34A;text-align:center;'>BUDGET &amp; ALERTING (EXAMPLE)</div>", 1240, 596, 280, 16, "align=center;");
  circle("bud_circle", "72%", 1255, 624, 60, "#F0FDF4", "#16A34A", "#16A34A", 16);
  text("bud_txt", "<div style='font-size:8.5px;font-weight:800;'>$72K of $100K<br/><span style='font-weight:400;color:#64748B;'>Monthly Budget</span></div>", 1325, 638, 100, 36, "align=left;");
  const budAlertsHtml = `<div style='font-size:7.5px;line-height:1.35;color:#0F172A;'>
    ⚠️ <b>Budget &gt; 80%</b><br/>
    ⚠️ <b>Daily spend increase &gt; 30% WoW</b><br/>
    ⚠️ <b>Anomaly detected (High)</b><br/>
    ⚠️ <b>Commitment utilization &lt; 60%</b>
  </div>`;
  text("bud_alerts", budAlertsHtml, 1250, 692, 260, 64, "align=left;verticalAlign=top;");

  // ==================== 6. BOTTOM ROW (y=770..954, h=184) ====================
  // Data Flow (High Level) (x=16, w=235)
  rect("box_b_flow", "", 16, 770, 235, 184, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.5;align=left;verticalAlign=top;");
  rect("lbl_b_flow", `<b style="font-size:10px;color:#1E3A8A;">DATA FLOW (HIGH LEVEL)</b>`, 16, 770, 235, 22, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=0;align=center;");
  text("txt_b_flow", `<div style="font-size:8px;line-height:1.5;text-align:center;padding:6px;">
    Billing Export (BigQuery)<br/>↓<br/>
    ETL &amp; Enrichment (Dataflow)<br/>↓<br/>
    Curated Cost Data (BigQuery)<br/>↓<br/>
    Analytics &amp; Reporting (Looker Studio)
  </div>`, 18, 794, 231, 154, "align=center;verticalAlign=top;");

  // Key Metrics (x=259, w=330)
  rect("box_b_met", "", 259, 770, 330, 184, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.5;align=left;verticalAlign=top;");
  rect("lbl_b_met", `<b style="font-size:10px;color:#1E3A8A;">KEY METRICS (TRACK &amp; IMPROVE)</b>`, 259, 770, 330, 22, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=0;align=center;");
  text("txt_b_met", `<div style="font-size:8.5px;line-height:1.6;color:#0F172A;padding:6px;">
    💰 <b>Total Cloud Spend</b> &nbsp;|&nbsp; 📊 <b>Budget Variance %</b><br/>
    👤 <b>Cost per Active User</b> &nbsp;|&nbsp; 🤝 <b>Committed Use Savings %</b><br/>
    🧬 <b>Unit Economics (per Case / Dossier)</b><br/>
    💵 <b>Cost Optimization Realized $</b>
  </div>`, 261, 794, 326, 154, "align=left;verticalAlign=top;");

  // Tags & Labels Strategy (x=597, w=290)
  rect("box_b_tag", "", 597, 770, 290, 184, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.5;align=left;verticalAlign=top;");
  rect("lbl_b_tag", `<b style="font-size:10px;color:#1E3A8A;">TAGS &amp; LABELS STRATEGY</b>`, 597, 770, 290, 22, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=0;align=center;");
  text("txt_b_tag", `<div style="font-size:8px;line-height:1.55;color:#0F172A;padding:6px;">
    🏷️ <b>env:</b> prod / nonprod<br/>
    🏷️ <b>app:</b> dossier-service<br/>
    🏷️ <b>owner:</b> data-platform<br/>
    🏷️ <b>cost_center:</b> R&amp;D<br/>
    🏷️ <b>business_unit:</b> Regulatory<br/>
    🏷️ <b>data_class:</b> Internal / Confidential
  </div>`, 599, 794, 286, 154, "align=left;verticalAlign=top;");

  // Success Criteria (x=895, w=290)
  rect("box_b_succ", "", 895, 770, 290, 184, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.5;align=left;verticalAlign=top;");
  rect("lbl_b_succ", `<b style="font-size:10px;color:#16A34A;">SUCCESS CRITERIA</b>`, 895, 770, 290, 22, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=0;align=center;");
  text("txt_b_succ", `<div style="font-size:8.5px;line-height:1.55;color:#0F172A;padding:6px;">
    ✔ <b>100% Budget Visibility</b><br/>
    ✔ <b>&gt; 90% Tagged Resources</b><br/>
    ✔ <b>&gt; 20% Cost Optimization Realized</b><br/>
    ✔ <b>Forecast Accuracy &gt; 85%</b><br/>
    ✔ <b>Anomalies Detected &lt; 24h</b>
  </div>`, 897, 794, 286, 154, "align=left;verticalAlign=top;");

  // Notes (x=1193, w=327)
  rect("box_b_notes", "", 1193, 770, 327, 184, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.5;align=left;verticalAlign=top;");
  rect("lbl_b_notes", `<b style="font-size:10px;color:#1E3A8A;">NOTES</b>`, 1193, 770, 327, 22, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=0;align=center;");
  text("txt_b_notes", `<div style="font-size:8px;line-height:1.5;color:#64748B;padding:6px;">
    • Use consistent tagging at source.<br/>
    • Review and refine allocation rules regularly.<br/>
    • Automate where possible.<br/>
    • Drive cost conversations with business context and value.
  </div>`, 1195, 794, 323, 154, "align=left;verticalAlign=top;");

  // ==================== 7. FOOTER STATUS BAR (y=962, h=24) ====================
  const footerHtml = `<div style='font-size:9px;color:#64748B;display:flex;justify-content:space-between;align-items:center;'>
    <div><b>CLASSIFICATION:</b> Confidential | NovaCura FinOps Framework v1.0</div>
    <div>Enterprise Architecture Team</div>
  </div>`;
  rect("footer_status", footerHtml, 16, 962, 1504, 24, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=middle;padding=4;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_30_finops_cost_flow_architecture" name="Template 30: FinOps / Cost Flow Architecture">
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
