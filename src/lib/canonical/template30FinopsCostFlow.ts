/**
 * Master 1:1 Ground-Truth Blueprint for Template 30: FinOps / Cost Flow Architecture
 * Matches 100% of images/30.png on 1600x1020 canvas with zero voids and discrete card hierarchy.
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
      `<mxCell id="${id}" value="${E(v)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;fontColor=#0F172A;fontSize=11;${s}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`
    );

  const text = (id: string, v: string, x: number, y: number, w: number, h: number, s = "") =>
    c.push(
      `<mxCell id="${id}" value="${E(v)}" style="text;html=1;strokeColor=none;fillColor=none;whiteSpace=wrap;fontColor=#0F172A;fontSize=11;verticalAlign=middle;${s}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`
    );

  // 1. BRAND HEADER & METADATA (y=14..66)
  rect("num_badge", "30", 24, 14, 52, 52, "fillColor=#1E3A8A;fontColor=#FFFFFF;fontSize=26;fontStyle=1;rounded=1;align=center;verticalAlign=middle;");
  text(
    "hdr_title",
    `<div style='font-size:24px;font-weight:900;color:#0F172A;letter-spacing:0.5px;'>FINOPS / COST FLOW ARCHITECTURE</div>` +
    `<div style='font-size:12px;font-weight:700;color:#1E3A8A;margin-top:2px;'>Use Case: NovaCura – AI-Powered Regulatory Intelligence Platform</div>` +
    `<div style='font-size:10px;color:#64748B;margin-top:1px;'>☁️ Environment: Production &nbsp;|&nbsp; 📍 Region: us-central1 &nbsp;|&nbsp; 📅 Last Updated: May 8, 2025</div>`,
    88,
    14,
    850,
    52,
    "align=left;"
  );

  const brandHtml = `<div style='text-align:right;'><span style='font-size:20px;font-weight:900;color:#0284C7;'>🧬 NOVACURA</span><br/><span style='font-size:10px;color:#64748B;font-style:italic;'>AI-Powered Regulatory Intelligence Platform</span></div>`;
  text("brand_logo", brandHtml, 950, 14, 275, 52, "align=right;");

  const objHtml = `<div style='font-size:9.5px;font-weight:900;color:#1E3A8A;margin-bottom:2px;'>OBJECTIVE</div><div style='font-size:8px;line-height:1.35;color:#0F172A;'>Optimize cloud spend, drive accountability, and maximize business value through visibility, allocation, optimization, and continuous improvement.</div>`;
  rect("card_obj", objHtml, 1240, 14, 335, 52, "strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;padding=5;");

  // 2. TOP STAGE: COST FLOW ARCHITECTURE (x=24, y=78, w=1080, h=282)
  rect("box_flow_bg", "", 24, 78, 1080, 282, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.2;align=left;verticalAlign=top;");
  text("lbl_cost_flow", "<div style='font-size:11px;font-weight:800;color:#1E3A8A;text-align:center;'>COST FLOW ARCHITECTURE</div>", 24, 82, 1080, 18, "align=center;");

  const costStages = [
    { n: "1. USAGE SOURCES", col: "#1E3A8A", bg: "#EFF6FF", items: ["⚙️ Compute (GCE, GKE)", "🗄️ Databases (Cloud SQL)", "🗃️ Storage (GCS, PD, Bucket)", "🌐 Network (VPC, LB, CDN)", "🧠 AI/ML (Vertex AI, GPUs)", "📦 SaaS &amp; 3rd Party APIs", "📑 Licenses &amp; Subscriptions"] },
    { n: "2. INGEST &amp; COLLECT", col: "#2563EB", bg: "#EFF6FF", items: ["📊 Cloud Billing Export (BigQuery)", "🗃️ Cloud Asset Inventory", "📑 Logging / Audit Logs", "⏱️ Usage &amp; Metering APIs", "💳 Marketplace Bills", "🤝 Commitment Usage", "💱 Currency &amp; FX Rates"] },
    { n: "3. NORMALIZE &amp; ENRICH", col: "#0284C7", bg: "#F0F9FF", items: ["🔄 Cost Normalization", "🗺️ Resource Mapping", "🏷️ Tags / Labels Enrichment", "🏢 Business Context Join", "💲 Pricing Catalog", "📅 Amortization Logic", "⚖️ RI/SP Adjustment"] },
    { n: "4. ALLOCATE &amp; ASSIGN", col: "#16A34A", bg: "#F0FDF4", items: ["📐 Allocation Rules Engine", "🏷️ Tag-Based Allocation", "📊 Custom Allocation %", "💼 Showback / Chargeback", "🔗 Shared Service Allocation", "☁️ Multi-Cloud Allocation", "🏢 Business Unit Mapping"] },
    { n: "5. ANALYZE &amp; OPTIMIZE", col: "#EA580C", bg: "#FFFBEB", items: ["📈 Cost Analytics", "🔮 Trend &amp; Forecasting", "⚠️ Anomaly Detection", "🎯 Rightsizing Recs", "💡 Savings Opportunities", "🤝 Commitment Advisor", "🧪 Scenario Modeling"] },
    { n: "6. REPORT &amp; ACT", col: "#7C3AED", bg: "#FAF5FF", items: ["📊 Executive Dashboards", "📑 BU / Project Reports", "🔔 Alerts &amp; Notifications", "💰 Budget vs Actuals", "🎫 Cost Actions &amp; Tickets", "👥 FinOps Reviews", "⚖️ Decisions &amp; Governance"] }
  ];

  costStages.forEach((cs, idx) => {
    const cx = 34 + idx * 176;
    const bodyHtml = `<div style='font-size:9px;font-weight:900;color:${cs.col};text-align:center;margin-bottom:6px;'>${cs.n}</div>
    <div style='font-size:7.5px;line-height:1.4;color:#0F172A;'>${cs.items.map(it => `<div>${it}</div>`).join("")}</div>`;
    rect(`c_stg_${idx}`, bodyHtml, cx, 104, 170, 216, `fillColor=${cs.bg};strokeColor=${cs.col};rounded=1;align=left;verticalAlign=top;padding=5;`);
  });

  // Feedback loop strip
  rect("box_feedback", "<div style='font-size:8.5px;font-weight:800;color:#16A34A;text-align:center;'>🔄 FEEDBACK LOOP (CONTINUOUS IMPROVEMENT)</div>", 34, 328, 1060, 24, "fillColor=#DCFCE7;strokeColor=#16A34A;rounded=1;align=center;verticalAlign=middle;");

  // Top Right: Cost Categories Table (x=1114, y=78, w=462, h=282)
  const catTableHtml = `<div style='font-size:11px;font-weight:800;color:#1E3A8A;text-align:center;margin-bottom:4px;'>COST CATEGORIES IN SCOPE</div>
  <table style='width:100%;border-collapse:collapse;font-size:8px;'>
    <tr style='font-weight:800;border-bottom:1.5px solid #CBD5E1;background:#F8FAFC;'>
      <td style='padding:3px;'>CATEGORY</td><td style='padding:3px;'>EXAMPLES</td><td style='padding:3px;text-align:center;'>INCLUDED</td>
    </tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:3px;'>⚙️ <b>Compute</b></td><td>GCE, GKE, Cloud Run, GPUs</td><td style='text-align:center;color:#16A34A;font-weight:800;'>✔</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:3px;'>🗃️ <b>Storage</b></td><td>GCS / Persistent Disk, Backup</td><td style='text-align:center;color:#16A34A;font-weight:800;'>✔</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:3px;'>🗄️ <b>Database</b></td><td>Cloud SQL, AlloyDB, BigQuery</td><td style='text-align:center;color:#16A34A;font-weight:800;'>✔</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:3px;'>🌐 <b>Network</b></td><td>VPC, LB, CDN, Cloud Interconnect</td><td style='text-align:center;color:#16A34A;font-weight:800;'>✔</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:3px;'>🧠 <b>AI / ML</b></td><td>Vertex AI, Model Serving, All APIs</td><td style='text-align:center;color:#16A34A;font-weight:800;'>✔</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:3px;'>📊 <b>Data &amp; Integration</b></td><td>Dataflow, Pub/Sub, Dataproc</td><td style='text-align:center;color:#16A34A;font-weight:800;'>✔</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:3px;'>🛡️ <b>Security</b></td><td>Security Command Center, IAM</td><td style='text-align:center;color:#16A34A;font-weight:800;'>✔</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:3px;'>📑 <b>Management</b></td><td>Cloud Monitoring, Logging, Others</td><td style='text-align:center;color:#16A34A;font-weight:800;'>✔</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:3px;'>🏢 <b>SaaS / 3rd Party</b></td><td>Snowflake, Datadog, GitHub, etc.</td><td style='text-align:center;color:#16A34A;font-weight:800;'>✔</td></tr>
    <tr><td style='padding:3px;'>📑 <b>Licenses / Subs</b></td><td>Adobe, Microsoft, Splunk, etc.</td><td style='text-align:center;color:#16A34A;font-weight:800;'>✔</td></tr>
  </table>`;
  rect("box_cat_scope", catTableHtml, 1114, 78, 462, 282, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;");

  // 3. MIDDLE LEFT: DATA & TOOLING LAYER (x=24, y=368, w=1080, h=105)
  rect("box_dt_bg", "", 24, 368, 1080, 105, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.2;align=left;verticalAlign=top;");
  text("lbl_dt", "<div style='font-size:10.5px;font-weight:800;color:#1E3A8A;text-align:center;'>DATA &amp; TOOLING LAYER</div>", 24, 372, 1080, 16, "align=center;");

  const dtTools = [
    { n: "Google\nCloud Billing", icon: "💳" },
    { n: "BigQuery\n(Cost Export)", icon: "📊" },
    { n: "Cloud Asset\nInventory", icon: "🗃️" },
    { n: "Cloud Logging\n&amp; Audit Logs", icon: "📑" },
    { n: "Dataflow\n(ETL)", icon: "⚡" },
    { n: "BigQuery\n(Curated Data)", icon: "📊" },
    { n: "Looker Studio\n(Dashboards)", icon: "📈" },
    { n: "Cloud Functions\n(Automations)", icon: "⚙️" }
  ];
  dtTools.forEach((dt, i) => {
    const dtx = 36 + i * 133;
    rect(`dt_${i}`, `<div style='font-size:16px;text-align:center;'>${dt.icon}</div><div style='font-size:7.5px;font-weight:800;text-align:center;line-height:1.2;margin-top:2px;'>${dt.n.replace(/\n/g, "<br/>")}</div>`, dtx, 394, 122, 68, "fillColor=#F8FAFC;strokeColor=#E2E8F0;rounded=1;align=center;verticalAlign=middle;padding=3;");
  });

  // 4. MIDDLE RIGHT: COST OPTIMIZATION OPPORTUNITIES, ANOMALY & BUDGET (x=1114, y=368, w=462, h=412)
  rect("box_opt_bg", "", 1114, 368, 462, 412, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.2;align=left;verticalAlign=top;");
  text("lbl_opt", "<div style='font-size:10.5px;font-weight:800;color:#1E3A8A;text-align:center;'>COST OPTIMIZATION OPPORTUNITIES</div>", 1114, 372, 462, 16, "align=center;");

  const optBoxes = [
    { t: "Rightsize Compute &amp; DB", icon: "⚙️" },
    { t: "Idle Resource Cleanup", icon: "🗑️" },
    { t: "Storage Lifecycle Policies", icon: "🗃️" },
    { t: "Savings Plans / CUD", icon: "💰" },
    { t: "Autoscaling &amp; Scheduling", icon: "⏱️" },
    { t: "Reserved IP / LB Opt", icon: "🌐" },
    { t: "Data Transfer Opt", icon: "🔄" },
    { t: "License &amp; SaaS Opt", icon: "📑" }
  ];
  optBoxes.forEach((ob, idx) => {
    const col = idx % 4;
    const row = Math.floor(idx / 4);
    const ox = 1124 + col * 110;
    const oy = 394 + row * 46;
    rect(`ob_${idx}`, `<div style='font-size:8px;font-weight:800;text-align:center;'><span style='font-size:12px;'>${ob.icon}</span><br/>${ob.t}</div>`, ox, oy, 104, 42, "fillColor=#F8FAFC;strokeColor=#E2E8F0;rounded=1;align=center;verticalAlign=middle;padding=2;");
  });

  // Anomaly Detection section (y=492)
  const anomHtml = `<div style='font-size:9.5px;font-weight:800;color:#DC2626;margin-bottom:2px;'>COST ANOMALY DETECTION (EXAMPLES)</div>
  <div style='font-size:8px;line-height:1.35;color:#0F172A;display:flex;justify-content:space-between;align-items:center;'>
    <div style='width:120px;height:50px;border:1px solid #CBD5E1;background:#F8FAFC;border-radius:4px;display:flex;align-items:center;justify-content:center;color:#DC2626;font-weight:900;'>📈 [Spike Wave]</div>
    <div style='font-size:7.5px;line-height:1.3;'>
      • Spike in compute GPU usage<br/>
      • Unusual data egress charges<br/>
      • Sudden increase in API calls<br/>
      • Orphaned resources running<br/>
      • Budget threshold breach
    </div>
  </div>`;
  rect("box_anomaly", anomHtml, 1124, 492, 442, 75, "fillColor=#FFFFFF;strokeColor=#E2E8F0;rounded=1;align=left;verticalAlign=top;padding=4;");

  // Budget & Alerting (y=574)
  const budHtml = `<div style='font-size:9.5px;font-weight:800;color:#16A34A;margin-bottom:2px;'>BUDGET &amp; ALERTING (EXAMPLE)</div>
  <div style='font-size:8px;display:flex;justify-content:space-around;align-items:center;margin-top:4px;'>
    <div style='text-align:center;'>
      <div style='width:48px;height:48px;border-radius:24px;background:#DCFCE7;border:2px solid #16A34A;display:inline-flex;align-items:center;justify-content:center;font-size:14px;font-weight:900;color:#16A34A;'>72%</div>
      <div style='font-size:7px;color:#64748B;margin-top:2px;'>$72K of $100K Monthly Budget</div>
    </div>
    <div style='font-size:7.5px;line-height:1.3;text-align:left;'>
      🔔 <b>Budget &gt; 80%</b><br/>
      🔔 <b>Daily spend increase &gt; 30% WoW</b><br/>
      🔔 <b>Anomaly detected (High)</b><br/>
      🔔 <b>Commitment utilization &lt; 60%</b>
    </div>
  </div>`;
  rect("box_budget", budHtml, 1124, 574, 442, 196, "fillColor=#FFFFFF;strokeColor=#E2E8F0;rounded=1;align=left;verticalAlign=top;padding=4;");

  // 5. ALLOCATION MODEL (EXAMPLES) (x=24, y=480, w=1080, h=118)
  rect("box_alloc_bg", "", 24, 480, 1080, 118, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.2;align=left;verticalAlign=top;");
  text("lbl_alloc", "<div style='font-size:10.5px;font-weight:800;color:#1E3A8A;text-align:center;'>ALLOCATION MODEL (EXAMPLES)</div>", 24, 484, 1080, 16, "align=center;");

  const allocModels = [
    { t: "Business Unit", sub: "Allocate cost by BU using tags or hierarchy", icon: "👥" },
    { t: "Project / App", sub: "Cost by project, app, or workload ownership", icon: "💻" },
    { t: "Environment", sub: "Prod / Non-Prod allocation separation", icon: "☁️" },
    { t: "Shared Services", sub: "Platform, Security, Network shared costs", icon: "🏢" },
    { t: "Cost Center", sub: "Finance cost centers mapping and roll-up", icon: "💳" },
    { t: "Customer / Product", sub: "Internal showback or chargeback by product", icon: "📦" },
    { t: "Region / Location", sub: "Allocate by region or data residency", icon: "🌐" },
    { t: "Allocation Method", sub: "• Tag-Based<br/>• Rule-Based<br/>• Driver-Based", icon: "📐" }
  ];
  allocModels.forEach((am, i) => {
    const ax = 36 + i * 133;
    rect(`am_${i}`, `<div style='font-size:14px;text-align:center;'>${am.icon}</div><div style='font-size:8px;font-weight:800;color:#1E3A8A;text-align:center;margin-top:2px;'>${am.t}</div><div style='font-size:7px;color:#64748B;text-align:center;line-height:1.2;margin-top:2px;'>${am.sub}</div>`, ax, 504, 122, 84, "fillColor=#F8FAFC;strokeColor=#E2E8F0;rounded=1;align=center;verticalAlign=top;padding=3;");
  });

  // 6. COST GOVERNANCE & FINOPS OPERATING MODEL (x=24, y=606, w=1080, h=174)
  rect("box_gov_bg", "", 24, 606, 1080, 174, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.2;align=left;verticalAlign=top;");
  text("lbl_gov", "<div style='font-size:10.5px;font-weight:800;color:#1E3A8A;text-align:center;'>COST GOVERNANCE &amp; FINOPS OPERATING MODEL</div>", 24, 610, 1080, 16, "align=center;");

  // RACI Table (x=34, w=470)
  const finRaciHtml = `<div style='font-size:9.5px;font-weight:800;color:#1E3A8A;margin-bottom:3px;'>RESPONSIBILITIES (RACI SUMMARY)</div>
  <table style='width:100%;border-collapse:collapse;font-size:7.5px;'>
    <tr style='font-weight:800;border-bottom:1px solid #CBD5E1;background:#F8FAFC;'>
      <td style='padding:2px;'>ROLE</td><td style='padding:2px;'>RESPONSIBILITIES</td><td style='padding:2px;'>R</td><td style='padding:2px;'>A</td><td style='padding:2px;'>C</td>
    </tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:2px;'>👤 FinOps Lead</td><td>Define policy, guardrails, model, reviews</td><td style='color:#16A34A;font-weight:800;'>R</td><td style='color:#2563EB;font-weight:800;'>A</td><td>C</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:2px;'>💳 Finance</td><td>Budgeting, forecasting, chargeback, reports</td><td style='color:#16A34A;font-weight:800;'>R</td><td style='color:#2563EB;font-weight:800;'>A</td><td>I</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:2px;'>⚙️ Engineering</td><td>Cost awareness, tagging, optimization</td><td style='color:#16A34A;font-weight:800;'>R</td><td>A</td><td style='color:#16A34A;font-weight:800;'>C</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:2px;'>📊 Data Platform</td><td>Data collection, pipeline reliability</td><td style='color:#16A34A;font-weight:800;'>R</td><td>C</td><td>I</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:2px;'>🛡️ Security</td><td>Guardrails, access control, anomaly alerts</td><td style='color:#16A34A;font-weight:800;'>R</td><td>C</td><td>I</td></tr>
    <tr><td style='padding:2px;'>🏢 BU Owner</td><td>Budget ownership, review, accountability</td><td style='color:#2563EB;font-weight:800;'>A</td><td style='color:#16A34A;font-weight:800;'>R</td><td>C</td></tr>
  </table>`;
  rect("box_fin_raci", finRaciHtml, 34, 630, 470, 140, "fillColor=#FFFFFF;strokeColor=#E2E8F0;rounded=1;align=left;verticalAlign=top;padding=4;");

  // FinOps Principles (x=514, w=280)
  const prinHtml = `<div style='font-size:9.5px;font-weight:800;color:#16A34A;margin-bottom:3px;'>FINOPS PRINCIPLES</div>
  <div style='font-size:7.5px;line-height:1.4;color:#0F172A;'>
    ☑ Teams collaborate across business, finance &amp; eng<br/>
    ☑ Everyone takes ownership for their cloud usage<br/>
    ☑ A centralized team drives FinOps<br/>
    ☑ Reports are accessible and timely<br/>
    ☑ Decisions are driven by business value<br/>
    ☑ Take advantage of variable cloud cost model
  </div>`;
  rect("box_fin_prin", prinHtml, 514, 630, 280, 140, "fillColor=#FFFFFF;strokeColor=#E2E8F0;rounded=1;align=left;verticalAlign=top;padding=4;");

  // FinOps Cadence (x=804, w=290)
  const cadHtml = `<div style='font-size:9.5px;font-weight:800;color:#2563EB;margin-bottom:3px;'>FINOPS CADENCE</div>
  <div style='font-size:7.5px;line-height:1.45;color:#0F172A;'>
    📅 <b>Weekly:</b> Cost review &amp; anomalies<br/>
    📅 <b>Bi-weekly:</b> Optimization review<br/>
    📅 <b>Monthly:</b> Executive report &amp; forecast<br/>
    📅 <b>Quarterly:</b> Business review<br/>
    📅 <b>Annually:</b> Strategy &amp; model update
  </div>`;
  rect("box_fin_cad", cadHtml, 804, 630, 290, 140, "fillColor=#FFFFFF;strokeColor=#E2E8F0;rounded=1;align=left;verticalAlign=top;padding=4;");

  // 7. BOTTOM ROW: DATA FLOW, METRICS, TAGS, SUCCESS, NOTES (y=788..960, h=172)
  // Data Flow (High Level) (x=24, w=340)
  const dfHtml = `<div style='font-size:10px;font-weight:800;color:#1E3A8A;margin-bottom:3px;'>DATA FLOW (HIGH LEVEL)</div>
  <div style='font-size:7.5px;display:flex;justify-content:space-around;text-align:center;align-items:center;margin-top:12px;'>
    <div>📄<br/><b>Billing Export</b><br/>(BigQuery)</div> <div>➔</div>
    <div>⚙️<br/><b>ETL &amp; Enrich</b><br/>(Dataflow)</div> <div>➔</div>
    <div>📊<br/><b>Curated Cost</b><br/>(BigQuery)</div> <div>➔</div>
    <div>📈<br/><b>Analytics</b><br/>(Looker Studio)</div>
  </div>`;
  rect("bot_df", dfHtml, 24, 788, 340, 172, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.2;align=left;verticalAlign=top;padding=5;");

  // Key Metrics (x=374, w=330)
  const kmHtml = `<div style='font-size:10px;font-weight:800;color:#1E3A8A;margin-bottom:3px;'>KEY METRICS (TRACK &amp; IMPROVE)</div>
  <div style='font-size:8px;line-height:1.45;color:#0F172A;'>
    💰 <b>Total Cloud Spend</b> &nbsp;|&nbsp; 📊 <b>Budget Variance %</b><br/>
    👤 <b>Cost per Active User</b> &nbsp;|&nbsp; 🤝 <b>Committed Use Savings %</b><br/>
    📦 <b>Unit Economics (per Case / Dossier)</b><br/>
    💵 <b>Cost Optimization Realized $</b>
  </div>`;
  rect("bot_km", kmHtml, 374, 788, 330, 172, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.2;align=left;verticalAlign=top;padding=5;");

  // Tags Strategy (x=714, w=270)
  const tagHtml = `<div style='font-size:10px;font-weight:800;color:#1E3A8A;margin-bottom:3px;'>TAGS &amp; LABELS STRATEGY</div>
  <div style='font-size:7.5px;line-height:1.35;color:#0F172A;'>
    🏷️ <b>env:</b> prod / nonprod<br/>
    🏷️ <b>app:</b> dossier-service<br/>
    🏷️ <b>owner:</b> data-platform<br/>
    🏷️ <b>cost_center:</b> R&amp;D<br/>
    🏷️ <b>business_unit:</b> Regulatory<br/>
    🏷️ <b>data_class:</b> Internal / Confidential
  </div>`;
  rect("bot_tag", tagHtml, 714, 788, 270, 172, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.2;align=left;verticalAlign=top;padding=5;");

  // Success Criteria (x=994, w=290)
  const succHtml = `<div style='font-size:10px;font-weight:800;color:#16A34A;margin-bottom:3px;'>SUCCESS CRITERIA</div>
  <div style='font-size:8px;line-height:1.4;color:#0F172A;'>
    🏆 <b>100% Budget Visibility</b><br/>
    ☑ <b>&gt; 90% Tagged Resources</b><br/>
    ☑ <b>&gt; 20% Cost Optimization Realized</b><br/>
    ☑ <b>Forecast Accuracy &gt; 85%</b><br/>
    ☑ <b>Anomalies Detected &lt; 24h</b>
  </div>`;
  rect("bot_succ", succHtml, 994, 788, 290, 172, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.2;align=left;verticalAlign=top;padding=5;");

  // Notes (x=1294, w=282)
  const notesHtml = `<div style='font-size:10px;font-weight:800;color:#1E3A8A;margin-bottom:3px;'>NOTES</div>
  <div style='font-size:7.5px;line-height:1.4;color:#64748B;'>
    • Use consistent tagging at source.<br/>
    • Review and refine allocation rules regularly.<br/>
    • Automate where possible.<br/>
    • Drive cost conversations with business context and value.
  </div>`;
  rect("bot_notes", notesHtml, 1294, 788, 282, 172, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.2;align=left;verticalAlign=top;padding=5;");

  // 8. FOOTER STATUS BAR (y=970, h=25)
  const footerHtml = `<div style='font-size:8.5px;color:#64748B;display:flex;justify-content:space-between;align-items:center;'>
    <div><b>CLASSIFICATION:</b> Confidential &nbsp;|&nbsp; NovaCura FinOps Framework v1.0</div>
    <div>Version: 1.0 &nbsp;|&nbsp; Enterprise Architecture Team</div>
  </div>`;
  rect("footer_status", footerHtml, 24, 970, 1552, 25, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=middle;padding=4;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_30_finops_cost_flow_architecture" name="Template 30: FinOps / Cost Flow Architecture">
    <mxGraphModel dx="1600" dy="1020" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="1020" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${c.join("\n        ")}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
