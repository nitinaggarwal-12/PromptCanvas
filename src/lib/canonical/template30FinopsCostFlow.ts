/**
 * Canonical Architecture Template 30: FinOps / Cost Flow Architecture
 * Exact 1:1 High-Fidelity Master Blueprint of images/30.png
 */

export function generateTemplate30FinopsCostFlowXml(
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
  rect("num_badge", "30", 20, 20, 48, 48, "fillColor=#1E3A8A;fontColor=#FFFFFF;fontSize=24;fontStyle=1;rounded=1;align=center;verticalAlign=middle;");
  rect("hdr_title", "<div style='font-size:24px;font-weight:800;color:#0F172A;letter-spacing:0.5px;'>FINOPS / COST FLOW ARCHITECTURE</div><div style='font-size:11px;color:#1E3A8A;font-weight:700;margin-top:3px;'>Use Case: NovaCura – AI-Powered Regulatory Intelligence Platform &nbsp;|&nbsp; Environment: Production &nbsp;|&nbsp; Region: us-central1 &nbsp;|&nbsp; Last Updated: May 8, 2025</div>", 78, 16, 850, 56, "strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  rect("hdr_brand", "<div style='text-align:right;'><span style='font-size:20px;font-weight:800;color:#0284C7;'>🧬 NOVACURA</span><br/><span style='font-size:9.5px;color:#64748B;font-style:italic;'>AI-Powered Regulatory Intelligence Platform</span></div>", 940, 18, 280, 45, "strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

  // Objective Card
  rect("card_obj", "<div style='font-size:12px;font-weight:800;color:#1E3A8A;margin-bottom:3px;'>OBJECTIVE</div><div style='font-size:11.5px;line-height:1.4;color:#0F172A;'>Optimize cloud spend, drive accountability, and maximize business value through visibility, allocation, optimization, and continuous improvement.</div>", 1240, 18, 320, 52, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=6;");

  // 2. TOP OUTER CONTAINER: COST FLOW ARCHITECTURE (x=20..1120, y=78..260)
  rect("box_cf_top", "", 20, 78, 1100, 178, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;rounded=1;");
  rect("lbl_cf_top", "<span style='font-size:12px;font-weight:800;color:#2563EB;'>COST FLOW ARCHITECTURE</span>", 20, 82, 1100, 14, "strokeColor=none;fillColor=none;align=center;");

  const cfSteps = [
    { n: "1", t: "USAGE SOURCES", items: ["Compute (GCE, GKE)", "Databases (Cloud SQL)", "Storage (GCS, PD)", "Network (VPC, LB)", "AI/ML (Vertex AI)", "SaaS / Licenses"], x: 28, w: 175 },
    { n: "2", t: "INGEST &amp; COLLECT", items: ["Cloud Billing Export", "Cloud Asset Inventory", "Logging / Audit Logs", "Usage &amp; Metering APIs", "Marketplace Bills", "Currency &amp; FX Rates"], x: 211, w: 175 },
    { n: "3", t: "NORMALIZE &amp; ENRICH", items: ["Cost Normalization", "Resource Mapping", "Tags / Labels Enrichment", "Business Context Join", "Pricing Catalog", "RI/SP Adjustment"], x: 394, w: 175 },
    { n: "4", t: "ALLOCATE &amp; ASSIGN", items: ["Allocation Rules Engine", "Tag-Based Allocation", "Custom Allocation %", "Showback / Chargeback", "Shared Service Alloc", "Business Unit Map"], x: 577, w: 175 },
    { n: "5", t: "ANALYZE &amp; OPTIMIZE", items: ["Cost Analytics", "Trend &amp; Forecasting", "Anomaly Detection", "Rightsizing Recs", "Savings Opportunities", "Commitment Advisor"], x: 760, w: 175 },
    { n: "6", t: "REPORT &amp; ACT", items: ["Executive Dashboards", "BU / Project Reports", "Alerts &amp; Notifications", "Budget vs Actuals", "Cost Actions &amp; Tickets", "FinOps Reviews"], x: 943, w: 169 }
  ];

  cfSteps.forEach((cs, idx) => {
    rect(`cs_box_${idx}`, "", cs.x, 98, cs.w, 148, "fillColor=#EFF6FF;strokeColor=#CBD5E1;rounded=1;");
    rect(`cs_hdr_${idx}`, `<div style='font-size:10.5px;font-weight:800;color:#1E3A8A;'>${cs.n}. ${cs.t}</div>`, cs.x, 102, cs.w, 14, "strokeColor=none;fillColor=none;align=center;");
    rect(`cs_it_${idx}`, `<div style='font-size:8.5px;line-height:1.45;color:#0F172A;'>${cs.items.map(it => '• ' + it).join("<br/>")}</div>`, cs.x + 4, 118, cs.w - 8, 122, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");
  });

  // 3. MIDDLE LAYER 1: DATA & TOOLING LAYER (x=20..1120, y=262..340)
  rect("box_dt_layer", "<div style='font-size:11px;font-weight:800;color:#1E3A8A;margin-bottom:4px;text-align:center;'>DATA &amp; TOOLING LAYER</div>" +
    "<div style='font-size:9px;color:#0F172A;display:flex;justify-content:space-around;text-align:center;align-items:center;'>" +
    "<div>☁️<br/><b>Google Billing</b></div> <div>➔</div>" +
    "<div>📊<br/><b>BigQuery Export</b></div> <div>➔</div>" +
    "<div>🏢<br/><b>Asset Inventory</b></div> <div>➔</div>" +
    "<div>📑<br/><b>Cloud Logging</b></div> <div>➔</div>" +
    "<div>🔄<br/><b>Dataflow (ETL)</b></div> <div>➔</div>" +
    "<div>📊<br/><b>Curated Cost Data</b></div> <div>➔</div>" +
    "<div>📈<br/><b>Looker Studio</b></div> <div>➔</div>" +
    "<div>⚡<br/><b>Automations</b></div>" +
    "</div>", 20, 262, 1100, 74, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=4;");

  // 4. MIDDLE LAYER 2: ALLOCATION MODEL (EXAMPLES) (x=20..1120, y=342..465)
  rect("box_alloc_mod", "", 20, 342, 1100, 123, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;");
  rect("lbl_alloc_mod", "<span style='font-size:11.5px;font-weight:800;color:#1E3A8A;'>ALLOCATION MODEL (EXAMPLES)</span>", 20, 346, 1100, 12, "strokeColor=none;fillColor=none;align=center;");

  const allocs = [
    { icon: "👥", t: "Business Unit", d: "Allocate cost by BU using tags", x: 28, w: 125 },
    { icon: "💻", t: "Project / App", d: "Cost by project or workload", x: 161, w: 125 },
    { icon: "☁️", t: "Environment", d: "Prod / Non-Prod separation", x: 294, w: 125 },
    { icon: "🏢", t: "Shared Services", d: "Platform, network shared alloc", x: 427, w: 135 },
    { icon: "💰", t: "Cost Center", d: "Finance cost centers mapping", x: 570, w: 125 },
    { icon: "📦", t: "Customer / Product", d: "Internal showback by product", x: 703, w: 135 },
    { icon: "🌐", t: "Region / Location", d: "Allocate by cloud region", x: 846, w: 125 },
    { icon: "📋", t: "Method", d: "Tag, Rule, Driver, Hybrid", x: 979, w: 133 }
  ];
  allocs.forEach((al, idx) => {
    rect(`al_box_${idx}`, `<div style='font-size:9.5px;font-weight:800;color:#1E3A8A;'>${al.icon} ${al.t}</div><div style='font-size:8.5px;color:#0F172A;margin-top:2px;'>${al.d}</div>`, al.x, 362, al.w, 95, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=3;");
  });

  // 5. FAR RIGHT: COST CATEGORIES & OPTIMIZATION (x=1128..1560, y=78..465)
  rect("box_r_cost_cats", "<div style='font-size:11px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>COST CATEGORIES IN SCOPE</div>" +
    "<div style='font-size:8.5px;color:#0F172A;'>" +
    "<table style='width:100%;border-collapse:collapse;'>" +
    "<tr style='font-weight:800;color:#1E3A8A;'><td>CATEGORY</td><td>EXAMPLES</td><td>INC</td></tr>" +
    "<tr><td><b>Compute</b></td><td>GCE, GKE, Cloud Run, GPUs</td><td style='color:#16A34A;'>✔</td></tr>" +
    "<tr><td><b>Storage</b></td><td>GCS, Persistent Disk, Backup</td><td style='color:#16A34A;'>✔</td></tr>" +
    "<tr><td><b>Database</b></td><td>Cloud SQL, AlloyDB, BigQuery</td><td style='color:#16A34A;'>✔</td></tr>" +
    "<tr><td><b>Network</b></td><td>VPC, LB, CDN, Interconnect</td><td style='color:#16A34A;'>✔</td></tr>" +
    "<tr><td><b>AI / ML</b></td><td>Vertex AI, Model Serving, APIs</td><td style='color:#16A34A;'>✔</td></tr>" +
    "<tr><td><b>Data &amp; Int</b></td><td>Dataflow, Pub/Sub, DataProc</td><td style='color:#16A34A;'>✔</td></tr>" +
    "<tr><td><b>Security</b></td><td>SCC, IAM, KMS</td><td style='color:#16A34A;'>✔</td></tr>" +
    "<tr><td><b>Management</b></td><td>Cloud Monitoring, Logging</td><td style='color:#16A34A;'>✔</td></tr>" +
    "<tr><td><b>SaaS / 3rd</b></td><td>Snowflake, Datadog, GitHub</td><td style='color:#16A34A;'>✔</td></tr>" +
    "<tr><td><b>Licenses</b></td><td>Adobe, Microsoft, Splunk</td><td style='color:#16A34A;'>✔</td></tr>" +
    "</table></div>", 1128, 78, 432, 230, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  rect("box_r_opt_opps", "<div style='font-size:11px;font-weight:800;color:#2563EB;margin-bottom:2px;'>COST OPTIMIZATION OPPORTUNITIES</div><div style='font-size:8.5px;line-height:1.4;color:#0F172A;display:grid;grid-template-columns:repeat(2, 1fr);gap:2px;'><div>⚙️ Rightsize Compute &amp; DB</div> <div>🧹 Idle Resource Cleanup</div> <div>🗄️ Storage Lifecycle Policies</div> <div>💰 Savings Plans / CUDs</div> <div>⏱️ Autoscaling &amp; Scheduling</div> <div>🌐 Reserved IP / LB Opt</div> <div>🔄 Data Transfer Opt</div> <div>📑 License &amp; SaaS Review</div></div>", 1128, 314, 432, 151, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  // 6. LOWER ROW: GOVERNANCE, PRINCIPLES, CADENCE, ANOMALIES, BUDGET (x=20..1560, y=472..650)
  rect("low_raci", "<div style='font-size:11px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>COST GOVERNANCE (RACI SUMMARY)</div><div style='font-size:8.5px;color:#0F172A;'>" +
    "<table style='width:100%;border-collapse:collapse;'>" +
    "<tr style='font-weight:800;color:#1E3A8A;'><td>ROLE</td><td>RESPONSIBILITY</td><td>RACI</td></tr>" +
    "<tr><td><b>FinOps Lead</b></td><td>Define policy, guardrails, allocation</td><td style='color:#16A34A;font-weight:800;'>A</td></tr>" +
    "<tr><td><b>Finance</b></td><td>Budgeting, forecasting, chargeback</td><td style='color:#16A34A;font-weight:800;'>A</td></tr>" +
    "<tr><td><b>Engineering</b></td><td>Cost awareness, tagging, rightsize</td><td style='color:#2563EB;font-weight:800;'>R</td></tr>" +
    "<tr><td><b>Data/Platform</b></td><td>Data pipeline reliability, costs</td><td style='color:#2563EB;font-weight:800;'>R</td></tr>" +
    "<tr><td><b>Security</b></td><td>Guardrails, access, anomaly alerts</td><td style='color:#2563EB;font-weight:800;'>C</td></tr>" +
    "<tr><td><b>BU Owner</b></td><td>Budget ownership, review</td><td style='color:#16A34A;font-weight:800;'>A</td></tr>" +
    "</table></div>", 20, 472, 380, 178, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  rect("low_prin", "<div style='font-size:11px;font-weight:800;color:#16A34A;margin-bottom:2px;'>FINOPS PRINCIPLES</div><div style='font-size:8.5px;line-height:1.4;color:#0F172A;'>✔ Teams collaborate across business, finance &amp; eng<br/>✔ Everyone takes ownership for cloud usage<br/>✔ Centralized team drives FinOps<br/>✔ Reports are accessible and timely<br/>✔ Decisions are driven by business value<br/>✔ Take advantage of variable cloud cost model</div>", 408, 472, 360, 178, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  rect("low_cad", "<div style='font-size:11px;font-weight:800;color:#2563EB;margin-bottom:2px;'>FINOPS CADENCE</div><div style='font-size:8.5px;line-height:1.45;color:#0F172A;'>📅 <b>Weekly:</b> Cost review &amp; anomalies<br/>📅 <b>Bi-weekly:</b> Optimization review<br/>📅 <b>Monthly:</b> Exec report &amp; forecast<br/>📅 <b>Quarterly:</b> Business review<br/>📅 <b>Annually:</b> Strategy &amp; model update</div>", 776, 472, 344, 178, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  rect("low_anom", "<div style='font-size:11px;font-weight:800;color:#DC2626;margin-bottom:2px;'>COST ANOMALY DETECTION &amp; BUDGET</div><div style='font-size:8.5px;line-height:1.4;color:#0F172A;'>⚠️ Spike in compute GPU usage<br/>⚠️ Unusual data egress charges<br/>⚠️ Sudden increase in API calls<br/>⚠️ Orphaned resources running<br/><br/><b>Budget (Example):</b> 72% ($72K of $100K)<br/><b>Alerts:</b> Budget &gt; 80%, Daily spend &gt; 30% DoD</div>", 1128, 472, 432, 178, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  // 7. BOTTOM ROW: DATA FLOW, METRICS, LABELS, CRITERIA & NOTES (x=20..1560, y=652..775)
  rect("bot_p1", "<div style='font-size:11px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>DATA FLOW (HIGH LEVEL)</div><div style='font-size:8.5px;line-height:1.35;color:#0F172A;'>📥 Billing Export ➔ 🔄 Dataflow ETL ➔ 📊 BigQuery Curated ➔ 📈 Looker Studio</div>", 20, 652, 280, 120, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  rect("bot_p2", "<div style='font-size:11px;font-weight:800;color:#2563EB;margin-bottom:2px;'>KEY METRICS</div><div style='font-size:8.5px;line-height:1.35;color:#0F172A;'>💰 Total Cloud Spend<br/>📊 Budget Variance %<br/>👤 Cost per Active User<br/>📈 Committed Use Savings %<br/>💼 Cost Optimization Realized $</div>", 306, 652, 300, 120, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  rect("bot_p3", "<div style='font-size:11px;font-weight:800;color:#16A34A;margin-bottom:2px;'>TAGS &amp; LABELS STRATEGY</div><div style='font-size:8.5px;line-height:1.35;color:#0F172A;'>🏷️ env: prod / nonprod<br/>🏷️ app: dossier-service<br/>🏷️ owner: data-platform<br/>🏷️ cost_center: R&amp;D<br/>🏷️ business_unit: Regulatory</div>", 614, 652, 300, 120, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  rect("bot_p4", "<div style='font-size:11px;font-weight:800;color:#7C3AED;margin-bottom:2px;'>SUCCESS CRITERIA</div><div style='font-size:8.5px;line-height:1.35;color:#0F172A;'>✔ 100% Budget Visibility<br/>✔ &gt; 90% Tagged Resources<br/>✔ &gt; 20% Cost Optimization Realized<br/>✔ Forecast Accuracy &gt; 85%<br/>✔ Anomalies Detected &lt; 24h</div>", 922, 652, 300, 120, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  rect("bot_p5", "<div style='font-size:11px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>NOTES</div><div style='font-size:8.5px;line-height:1.35;color:#64748B;'>• Use consistent tagging at source.<br/>• Review and refine allocation rules regularly.<br/>• Automate where possible.<br/>• Drive cost conversations with business context.</div>", 1230, 652, 330, 120, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_30_finops_cost_flow" name="Template 30: FinOps / Cost Flow Architecture">
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
