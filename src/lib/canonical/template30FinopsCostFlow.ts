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
  rect("num_badge", "30", 20, 16, 48, 48, "fillColor=#1E3A8A;fontColor=#FFFFFF;fontSize=24;fontStyle=1;rounded=1;align=center;verticalAlign=middle;");
  rect("hdr_title", "<div style='font-size:22px;font-weight:800;color:#0F172A;letter-spacing:0.5px;'>FINOPS / COST FLOW ARCHITECTURE</div><div style='font-size:11px;color:#1E3A8A;font-weight:700;margin-top:2px;'>Use Case: NovaCura – AI-Powered Regulatory Intelligence Platform &nbsp;|&nbsp; Environment: Production &nbsp;|&nbsp; Region: us-central1 &nbsp;|&nbsp; Last Updated: May 8, 2025</div>", 78, 16, 840, 48, "strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=10;");
  rect("hdr_brand", "<div style='text-align:right;'><span style='font-size:20px;font-weight:800;color:#0284C7;'>🧬 NOVACURA</span><br/><span style='font-size:9.5px;color:#64748B;font-style:italic;'>AI-Powered Regulatory Intelligence Platform</span></div>", 940, 16, 280, 48, "strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

  // Objective Card
  rect("card_obj", "<div style='font-size:8.5px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>OBJECTIVE</div><div style='font-size:10px;line-height:1.35;color:#0F172A;'>Optimize cloud spend, drive accountability, and maximize business value through visibility, allocation, optimization, and continuous improvement.</div>", 1240, 16, 320, 48, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=4;");

  // 2. MAIN COST FLOW ARCHITECTURE (x=20..1120, y=72..220)
  rect("box_flow_main", "", 20, 72, 1090, 148, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;rounded=1;");
  rect("lbl_flow_main", "<span style='font-size:10px;font-weight:800;color:#2563EB;'>COST FLOW ARCHITECTURE</span>", 20, 74, 1090, 12, "strokeColor=none;fillColor=none;align=center;");

  const fstages = [
    { n: "1. USAGE SOURCES", sub: "• Compute (GCE, GKE)<br/>• Databases (Cloud SQL)<br/>• Storage (GCS, PD)<br/>• Network (VPC, LB)<br/>• AI/ML (Vertex AI)<br/>• SaaS / Licenses", col: "#1E3A8A" },
    { n: "2. INGEST &amp; COLLECT", sub: "• Cloud Billing Export<br/>• Cloud Asset Inventory<br/>• Logging / Audit Logs<br/>• Usage &amp; Metering APIs<br/>• Marketplace Bills<br/>• Currency &amp; FX Rates", col: "#2563EB" },
    { n: "3. NORMALIZE &amp; ENRICH", sub: "• Cost Normalization<br/>• Resource Mapping<br/>• Tags / Labels Enrichment<br/>• Business Context Join<br/>• Pricing Catalog<br/>• RI/SP Adjustment", col: "#16A34A" },
    { n: "4. ALLOCATE &amp; ASSIGN", sub: "• Allocation Rules Engine<br/>• Tag-Based Allocation<br/>• Custom Allocation %<br/>• Showback / Chargeback<br/>• Shared Service Alloc<br/>• Business Unit Map", col: "#D97706" },
    { n: "5. ANALYZE &amp; OPTIMIZE", sub: "• Cost Analytics<br/>• Trend &amp; Forecasting<br/>• Anomaly Detection<br/>• Rightsizing Recs<br/>• Savings Opportunities<br/>• Commitment Advisor", col: "#7C3AED" },
    { n: "6. REPORT &amp; ACT", sub: "• Executive Dashboards<br/>• BU / Project Reports<br/>• Alerts &amp; Notifications<br/>• Budget vs Actuals<br/>• Cost Actions &amp; Tickets<br/>• FinOps Reviews", col: "#0284C7" }
  ];

  fstages.forEach((fs, idx) => {
    const fx = 28 + idx * 179;
    rect(`fs_${idx}`, `<div style='font-size:8px;font-weight:800;color:${fs.col};text-align:center;'>${fs.n}</div><div style='font-size:10px;line-height:1.25;color:#0F172A;margin-top:2px;'>${fs.sub}</div>`, fx, 88, 172, 108, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=2;");
  });

  rect("box_feedback", "<div style='font-size:8px;font-weight:700;color:#16A34A;text-align:center;'>🔄 FEEDBACK LOOP (CONTINUOUS IMPROVEMENT)</div>", 28, 200, 1074, 14, "fillColor=#F0FDF4;strokeColor=#16A34A;rounded=1;align=center;verticalAlign=middle;");

  // 3. TOP RIGHT: COST CATEGORIES IN SCOPE (x=1120..1560, y=72..220)
  rect("box_cats_scope", "<div style='font-size:9px;font-weight:800;color:#1E3A8A;margin-bottom:2px;text-align:center;'>COST CATEGORIES IN SCOPE</div><div style='font-size:10px;line-height:1.2;color:#0F172A;'><table style='width:100%;border-collapse:collapse;'><tr style='font-weight:700;border-bottom:1px solid #CBD5E1;'><td>CATEGORY</td><td>EXAMPLES</td><td style='text-align:center;'>INC</td></tr><tr><td><b>Compute</b></td><td>GCE, GKE, Cloud Run, GPUs</td><td style='text-align:center;color:#16A34A;'>✔</td></tr><tr><td><b>Storage</b></td><td>GCS, Persistent Disk, Backup</td><td style='text-align:center;color:#16A34A;'>✔</td></tr><tr><td><b>Database</b></td><td>Cloud SQL, AlloyDB, BigQuery</td><td style='text-align:center;color:#16A34A;'>✔</td></tr><tr><td><b>Network</b></td><td>VPC, LB, CDN, Interconnect</td><td style='text-align:center;color:#16A34A;'>✔</td></tr><tr><td><b>AI / ML</b></td><td>Vertex AI, Model Serving, APIs</td><td style='text-align:center;color:#16A34A;'>✔</td></tr><tr><td><b>Data &amp; Int</b></td><td>Dataflow, Pub/Sub, DataProc</td><td style='text-align:center;color:#16A34A;'>✔</td></tr><tr><td><b>Security</b></td><td>SCC, IAM, KMS</td><td style='text-align:center;color:#16A34A;'>✔</td></tr><tr><td><b>Management</b></td><td>Cloud Monitoring, Logging</td><td style='text-align:center;color:#16A34A;'>✔</td></tr><tr><td><b>SaaS / 3rd</b></td><td>Snowflake, Datadog, GitHub</td><td style='text-align:center;color:#16A34A;'>✔</td></tr></table></div>", 1120, 72, 440, 148, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  // 4. DATA & TOOLING LAYER (x=20..1120, y=226..286)
  rect("box_tooling_layer", "<div style='font-size:9px;font-weight:800;color:#1E3A8A;margin-bottom:2px;text-align:center;'>DATA &amp; TOOLING LAYER</div><div style='font-size:8px;display:flex;justify-content:space-around;text-align:center;align-items:center;'><div style='border:1px solid #CBD5E1;background:#FFF;padding:2px 4px;border-radius:3px;'>💳<br/><b>Google<br/>Cloud Billing</b></div> <div>➔</div> <div style='border:1px solid #CBD5E1;background:#FFF;padding:2px 4px;border-radius:3px;'>📊<br/><b>BigQuery<br/>(Cost Export)</b></div> <div>➔</div> <div style='border:1px solid #CBD5E1;background:#FFF;padding:2px 4px;border-radius:3px;'>☁️<br/><b>Cloud Asset<br/>Inventory</b></div> <div>➔</div> <div style='border:1px solid #CBD5E1;background:#FFF;padding:2px 4px;border-radius:3px;'>📑<br/><b>Cloud Logging<br/>&amp; Audit Logs</b></div> <div>➔</div> <div style='border:1px solid #CBD5E1;background:#FFF;padding:2px 4px;border-radius:3px;'>⚡<br/><b>Dataflow<br/>(ETL)</b></div> <div>➔</div> <div style='border:1px solid #CBD5E1;background:#FFF;padding:2px 4px;border-radius:3px;'>🗄️<br/><b>BigQuery<br/>(Curated Data)</b></div> <div>➔</div> <div style='border:1px solid #CBD5E1;background:#FFF;padding:2px 4px;border-radius:3px;'>📈<br/><b>Looker Studio<br/>(Dashboards)</b></div> <div>➔</div> <div style='border:1px solid #16A34A;background:#F0FDF4;padding:2px 4px;border-radius:3px;'>⚡<br/><b>Cloud Functions<br/>(Automations)</b></div></div>", 20, 226, 1090, 60, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=top;padding=2;");

  // Middle Right: Cost Optimization Opportunities (x=1120..1560, y=226..286)
  rect("box_opt_opps", "<div style='font-size:9px;font-weight:800;color:#16A34A;margin-bottom:1px;text-align:center;'>COST OPTIMIZATION OPPORTUNITIES</div><div style='font-size:10px;display:grid;grid-template-columns:repeat(4, 1fr);gap:2px;text-align:center;'><div>💻<br/><b>Rightsize Compute</b></div> <div>🧹<br/><b>Idle Cleanup</b></div> <div>📦<br/><b>Storage Lifecycle</b></div> <div>🏷️<br/><b>Savings Plans / CUD</b></div> <div>⚡<br/><b>Autoscale &amp; Sched</b></div> <div>🌐<br/><b>Reserved IP / LB</b></div> <div>🔄<br/><b>Data Transfer Opt</b></div> <div>📜<br/><b>License &amp; SaaS Rev</b></div></div>", 1120, 226, 440, 60, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=top;padding=2;");

  // 5. ALLOCATION MODEL (EXAMPLES) (x=20..1120, y=292..352)
  rect("box_alloc_main", "", 20, 292, 1090, 60, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;");
  rect("lbl_alloc_main", "<span style='font-size:9px;font-weight:800;color:#1E3A8A;'>ALLOCATION MODEL (EXAMPLES)</span>", 20, 294, 1090, 10, "strokeColor=none;fillColor=none;align=center;");

  const amodels = [
    { t: "Business Unit", sub: "Allocate cost by BU tags or hierarchy", icon: "👥" },
    { t: "Project / App", sub: "Cost by project, app, or workload", icon: "💻" },
    { t: "Environment", sub: "Prod / Non-Prod separation", icon: "☁️" },
    { t: "Shared Services", sub: "Platform, network shared costs", icon: "🏢" },
    { t: "Cost Center", sub: "Finance cost centers mapping", icon: "💰" },
    { t: "Customer / Prod", sub: "Internal showback by product", icon: "📦" },
    { t: "Region / Loc", sub: "Allocate by cloud region", icon: "🌐" },
    { t: "Allocation Method", sub: "Tag, Rule, Driver, Hybrid", icon: "🏷️" }
  ];
  amodels.forEach((am, idx) => {
    const ax = 26 + idx * 135;
    rect(`am_${idx}`, `<div style='font-size:8px;font-weight:700;text-align:center;'>${am.icon} ${am.t}</div><div style='font-size:10px;color:#64748B;text-align:center;line-height:1.2;margin-top:1px;'>${am.sub}</div>`, ax, 306, 130, 42, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=2;");
  });

  // Middle Right: Anomaly Detection & Budgets (x=1120..1560, y=292..410)
  rect("box_anomaly_budg", "<div style='font-size:9px;font-weight:800;color:#DC2626;margin-bottom:1px;'>COST ANOMALY DETECTION &amp; BUDGET</div><div style='font-size:10px;line-height:1.25;color:#0F172A;'>⚠️ Spike in compute GPU usage<br/>⚠️ Unusual data egress charges<br/>⚠️ Sudden increase in API calls<br/>⚠️ Orphaned resources running<br/><br/><b>Budget (Example):</b> 72% ($72K of $100K)<br/><b>Alerts:</b> Budget &gt; 80%, Daily spend &gt; 30% DoD</div>", 1120, 292, 440, 118, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");

  // 6. COST GOVERNANCE & FINOPS OPERATING MODEL (x=20..1120, y=358..410)
  rect("box_gov_model", "<div style='font-size:9px;font-weight:800;color:#1E3A8A;display:flex;justify-content:space-between;'><span>COST GOVERNANCE (RACI SUMMARY)</span> <span>FINOPS PRINCIPLES</span> <span>FINOPS CADENCE</span></div><div style='font-size:10px;display:flex;justify-content:space-between;gap:8px;margin-top:1px;'><table style='border-collapse:collapse;width:40%;'><tr style='font-weight:700;border-bottom:1px solid #CBD5E1;'><td>Role</td><td>Responsibility</td><td>RACI</td></tr><tr><td><b>FinOps Lead</b></td><td>Define policy, guardrails</td><td>A</td></tr><tr><td><b>Finance</b></td><td>Budgeting, chargeback</td><td>A</td></tr><tr><td><b>Engineering</b></td><td>Cost awareness, tag</td><td>R</td></tr><tr><td><b>Data/Platform</b></td><td>Pipeline reliability</td><td>R</td></tr><tr><td><b>Security</b></td><td>Guardrails, access alerts</td><td>C</td></tr></table><div style='width:30%;line-height:1.2;'>✔ Teams collaborate across biz, fin &amp; eng<br/>✔ Everyone takes ownership<br/>✔ Centralized team drives FinOps<br/>✔ Reports accessible &amp; timely<br/>✔ Decisions driven by biz value</div><div style='width:25%;line-height:1.2;'>📅 <b>Weekly:</b> Cost review<br/>📅 <b>Bi-weekly:</b> Opt review<br/>📅 <b>Monthly:</b> Exec report<br/>📅 <b>Quarterly:</b> Biz review<br/>📅 <b>Annually:</b> Strategy</div></div>", 20, 358, 1090, 52, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=2;");

  // 7. BOTTOM ROW: DATA FLOW, METRICS, TAGS STRATEGY, SUCCESS CRITERIA, NOTES (x=20..1560, y=546..740)
  rect("bot_dflow", "<div style='font-size:10px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>DATA FLOW (HIGH LEVEL)</div><div style='font-size:8px;line-height:1.35;color:#0F172A;'>💳 Billing Export ➔ ⚡ Dataflow ETL ➔ 🗄️ BigQuery Curated ➔ 📈 Looker Studio</div>", 20, 546, 260, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("bot_metrics", "<div style='font-size:10px;font-weight:800;color:#2563EB;margin-bottom:2px;'>KEY METRICS</div><div style='font-size:8px;line-height:1.35;color:#0F172A;'>💰 Total Cloud Spend<br/>📊 Budget Variance %<br/>👤 Cost per Active User<br/>🏷️ Committed Use Savings %<br/>💵 Cost Optimization Realized $</div>", 290, 546, 250, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("bot_tags", "<div style='font-size:10px;font-weight:800;color:#7C3AED;margin-bottom:2px;'>TAGS &amp; LABELS STRATEGY</div><div style='font-size:8px;line-height:1.35;color:#0F172A;'>🏷️ <b>env:</b> prod / nonprod<br/>🏷️ <b>app:</b> dossier-service<br/>🏷️ <b>owner:</b> data-platform<br/>🏷️ <b>cost_center:</b> R&amp;D<br/>🏷️ <b>business_unit:</b> Regulatory</div>", 550, 546, 260, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("bot_success", "<div style='font-size:10px;font-weight:800;color:#16A34A;margin-bottom:2px;'>SUCCESS CRITERIA</div><div style='font-size:8px;line-height:1.35;color:#0F172A;'>✔ 100% Budget Visibility<br/>✔ &gt; 90% Tagged Resources<br/>✔ &gt; 20% Cost Optimization Realized<br/>✔ Forecast Accuracy &gt; 85%<br/>✔ Anomalies Detected &lt; 24h</div>", 820, 546, 260, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("bot_notes", "<div style='font-size:10px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>NOTES</div><div style='font-size:8px;line-height:1.35;color:#64748B;'>• Use consistent tagging at source.<br/>• Review and refine allocation rules regularly.<br/>• Automate where possible.<br/>• Drive cost conversations with business context.</div>", 1090, 546, 470, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  // 8. FOOTER METADATA STRIP (x=20..1560, y=744..768)
  rect("footer_meta", "<div style='font-size:9px;color:#0F172A;display:flex;justify-content:space-between;align-items:center;'><div>Version: 1.0</div><div>Date: May 2024</div></div>", 20, 744, 1540, 24, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=middle;padding=3;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_30_finops_cost_flow_architecture" name="Template 30: FinOps / Cost Flow Architecture">
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
