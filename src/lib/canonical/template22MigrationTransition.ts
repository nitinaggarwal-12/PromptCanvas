/**
 * Canonical Architecture Template 22: Migration / Transition Architecture
 * Exact 1:1 High-Fidelity Master Blueprint of images/22.png
 */

export function generateTemplate22MigrationTransitionXml(
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
  rect("num_badge", "22", 20, 20, 48, 48, "fillColor=#1E3A8A;fontColor=#FFFFFF;fontSize=24;fontStyle=1;rounded=1;align=center;verticalAlign=middle;");
  rect("hdr_title", "<div style='font-size:24px;font-weight:800;color:#0F172A;letter-spacing:0.5px;'>Migration / Transition Architecture</div><div style='font-size:11px;color:#1E3A8A;font-weight:700;margin-top:3px;'>Use Case: NovaCura – Platform Modernization &amp; Migration &nbsp;|&nbsp; Environment: Production &nbsp;|&nbsp; Region: us-central1 &nbsp;|&nbsp; Last Updated: May 8, 2025</div>", 78, 16, 850, 56, "strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  rect("hdr_brand", "<div style='text-align:right;'><span style='font-size:20px;font-weight:800;color:#0284C7;'>🧬 NOVACURA</span><br/><span style='font-size:9.5px;color:#64748B;font-style:italic;'>AI-Powered Regulatory Intelligence Platform</span></div>", 940, 18, 280, 45, "strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

  // Objective Card
  rect("card_obj", "<div style='font-size:12px;font-weight:800;color:#1E3A8A;margin-bottom:3px;'>OBJECTIVE</div><div style='font-size:11.5px;line-height:1.4;color:#0F172A;'>Migrate applications, data, and integrations to the target cloud architecture with minimal risk, zero data loss, and measurable business value at every step.</div>", 1240, 18, 320, 52, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=6;");

  // 2. LEFT COLUMN: CURRENT STATE (x=20..190, y=78..500)
  rect("box_cur", "", 20, 78, 170, 422, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;rounded=1;");
  rect("lbl_cur", "<div style='font-size:12px;font-weight:800;color:#1E3A8A;'>CURRENT STATE<br/><span style='font-size:10.5px;color:#64748B;'>On-Prem &amp; Legacy</span></div>", 20, 84, 170, 20, "strokeColor=none;fillColor=none;align=center;");

  rect("cur_app", "<div style='font-size:11px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>Applications</div><div style='font-size:9.5px;color:#0F172A;'>🏢 Monolith Apps<br/>⚙️ Legacy Services<br/>⏱️ Batch Jobs</div>", 28, 110, 154, 85, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=5;");
  rect("cur_data", "<div style='font-size:11px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>Data Stores</div><div style='font-size:9.5px;color:#0F172A;'>🗄️ Oracle DB<br/>📁 File Shares (NAS)<br/>📑 Document Repos</div>", 28, 202, 154, 85, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=5;");
  rect("cur_int", "<div style='font-size:11px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>Integrations</div><div style='font-size:9.5px;color:#0F172A;'>🔌 FTP / SFTP<br/>🔗 Point-to-Point<br/>🔌 Legacy APIs</div>", 28, 294, 154, 85, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=5;");
  rect("cur_inf", "<div style='font-size:11px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>Infrastructure</div><div style='font-size:9.5px;color:#0F172A;'>🏢 On-Prem Data Center<br/>💻 VMware / Physical<br/>🌐 Legacy Network</div>", 28, 386, 154, 105, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=5;");

  // 3. CENTER OUTER CONTAINER: MIGRATION PHASES (x=200..1100, y=78..500)
  rect("box_phases", "", 200, 78, 900, 422, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;rounded=1;");
  rect("lbl_phases", "<span style='font-size:8.5px;font-weight:800;color:#2563EB;'>MIGRATION PHASES</span>", 200, 84, 900, 16, "strokeColor=none;fillColor=none;align=center;");

  const phases = [
    {
      num: "1", title: "Assess & Plan", col: "#1E3A8A", x: 210,
      tasks: [
        { icon: "🔍", t: "Discovery & Inventory", s: "Apps, data, infra, dependencies" },
        { icon: "💰", t: "TCO & Business Case", s: "Cost, effort, timeline, value" },
        { icon: "🛡️", t: "Risk & Dependency", s: "Technical, data, operational risks" },
        { icon: "📋", t: "Migration Strategy", s: "Approach, pattern, wave plan" }
      ],
      deliv: "• Migration Assessment Report<br/>• Target Architecture Blueprint<br/>• Migration Runbook (High Level)<br/>• Wave &amp; Cutover Plan"
    },
    {
      num: "2", title: "Ready & Build", col: "#2563EB", x: 388,
      tasks: [
        { icon: "🏗️", t: "Target Landing Zone", s: "Network, IAM, security, obs" },
        { icon: "⚙️", t: "Platform & Services", s: "Core platform and shared svcs" },
        { icon: "🔌", t: "Data Migration Setup", s: "Connectivity, tools, validation" },
        { icon: "🔄", t: "CI/CD & Automation", s: "Pipelines, IaC, guardrails" }
      ],
      deliv: "• Landing Zone Ready<br/>• Automation &amp; CI/CD Ready<br/>• Data Migration Plan<br/>• Validation Framework"
    },
    {
      num: "3", title: "Migrate & Validate", col: "#16A34A", x: 566,
      tasks: [
        { icon: "🌊", t: "Migrate in Waves", s: "Low risk → High risk (Iterative)" },
        { icon: "🗄️", t: "Data Migration", s: "Bulk + CDC/Sync Validation" },
        { icon: "🚀", t: "Application Cutover", s: "Blue/Green / Canary / Phased" },
        { icon: "🧪", t: "Validate & Test", s: "Functional, perf, sec, UAT" }
      ],
      deliv: "• Wave Completion Report<br/>• Data Reconciliation Report<br/>• Test Results &amp; Sign-off<br/>• Cutover Readiness Report"
    },
    {
      num: "4", title: "Optimize & Stabilize", col: "#7C3AED", x: 744,
      tasks: [
        { icon: "⏱️", t: "Performance Tuning", s: "Right size, caching, indexes" },
        { icon: "🛡️", t: "Resilience Hardening", s: "HA/DR, backup, failover test" },
        { icon: "👨‍💻", t: "Operational Handover", s: "Runbooks, monitoring, SRE" },
        { icon: "💰", t: "Cost Optimization", s: "Rightsizing, savings plans" }
      ],
      deliv: "• Performance &amp; Resilience Report<br/>• DR Test Report<br/>• Runbooks &amp; SOPs<br/>• Cost Optimization Plan"
    },
    {
      num: "5", title: "Decommission", col: "#059669", x: 922,
      tasks: [
        { icon: "🛑", t: "Legacy System Decom", s: "Quiet period &amp; sign-off" },
        { icon: "📑", t: "Data Retention", s: "Archive &amp; compliance check" },
        { icon: "🔒", t: "Access & Int Cleanup", s: "Remove old access, endpoints" },
        { icon: "👥", t: "Knowledge Transfer", s: "KT sessions &amp; documentation" }
      ],
      deliv: "• Decommission Sign-off<br/>• Archive &amp; Retention Report<br/>• Access Removal Report<br/>• Final Migration Report"
    }
  ];

  phases.forEach((p, idx) => {
    rect(`ph_col_${idx}`, "", p.x, 105, 170, 385, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;");
    rect(`ph_hdr_${idx}`, `<div style='font-size:11.5px;font-weight:800;color:${p.col};'>❶❷❸❹❺'[idx]} ${p.title}</div>`, p.x, 110, 170, 16, "strokeColor=none;fillColor=none;align=center;");
    
    p.tasks.forEach((t, tIdx) => {
      rect(`ph_${idx}_t${tIdx}`, `<div style='font-size:11px;font-weight:800;color:#0F172A;'>${t.icon} ${t.t}</div><div style='font-size:9px;color:#64748B;'>${t.s}</div>`, p.x + 6, 132 + tIdx * 54, 158, 48, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=middle;padding=4;");
    });

    rect(`ph_del_${idx}`, `<div style='font-size:11px;font-weight:800;color:${p.col};margin-bottom:2px;'>Key Deliverables</div><div style='font-size:9px;line-height:1.4;color:#0F172A;'>${p.deliv}</div>`, p.x + 6, 355, 158, 128, "fillColor=#EFF6FF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");
  });

  // Arrows
  edge(nid(), "", "box_cur", "box_phases", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=2;endArrow=block;endSize=5;");

  // 4. TARGET STATE CONTAINER (x=1110..1280, y=78..500)
  rect("box_tgt", "", 1110, 78, 170, 422, "fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;rounded=1;");
  rect("lbl_tgt", "<div style='font-size:12px;font-weight:800;color:#16A34A;'>TARGET STATE<br/><span style='font-size:10.5px;color:#64748B;'>Cloud-Native Platform</span></div>", 1110, 84, 170, 20, "strokeColor=none;fillColor=none;align=center;");

  rect("tgt_app", "<div style='font-size:11px;font-weight:800;color:#16A34A;margin-bottom:2px;'>Applications</div><div style='font-size:9.5px;color:#0F172A;'>⚙️ Microservices<br/>☁️ Managed Services<br/>⚡ Serverless</div>", 1118, 110, 154, 70, "fillColor=#F0FDF4;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");
  rect("tgt_data", "<div style='font-size:11px;font-weight:800;color:#16A34A;margin-bottom:2px;'>Data Layer</div><div style='font-size:9.5px;color:#0F172A;'>🗄️ Cloud SQL<br/>📊 BigQuery<br/>🗃️ Object Storage</div>", 1118, 186, 154, 70, "fillColor=#F0FDF4;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");
  rect("tgt_int", "<div style='font-size:11px;font-weight:800;color:#16A34A;margin-bottom:2px;'>Integrations</div><div style='font-size:9.5px;color:#0F172A;'>🔌 API Gateway<br/>📡 Event-Driven<br/>🌐 Standard APIs</div>", 1118, 262, 154, 70, "fillColor=#F0FDF4;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");
  rect("tgt_plt", "<div style='font-size:11px;font-weight:800;color:#16A34A;margin-bottom:2px;'>Platform</div><div style='font-size:9.5px;color:#0F172A;'>☸️ GKE / Cloud Run<br/>☁️ Cloud Services<br/>🌐 Global Network</div>", 1118, 338, 154, 70, "fillColor=#F0FDF4;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");
  rect("tgt_obs", "<div style='font-size:11px;font-weight:800;color:#16A34A;margin-bottom:2px;'>Observability &amp; Ops</div><div style='font-size:9.5px;color:#0F172A;'>📈 Cloud Monitoring<br/>📑 Logging<br/>🛡️ SCC / SIEM</div>", 1118, 414, 154, 76, "fillColor=#F0FDF4;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  edge(nid(), "", "box_phases", "box_tgt", "edgeStyle=none;strokeColor=#16A34A;strokeWidth=2;endArrow=block;endSize=5;");

  // 5. FAR RIGHT COLUMN: PRINCIPLES & RISKS (x=1290..1560, y=78..500)
  rect("box_right", "", 1290, 78, 270, 422, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;");
  
  rect("r_p1", "<div style='font-size:11px;font-weight:800;color:#1E3A8A;margin-bottom:3px;'>MIGRATION PRINCIPLES</div><div style='font-size:9px;line-height:1.45;color:#0F172A;'>✔ Business value driven<br/>✔ Security &amp; compliance by design<br/>✔ Data integrity &amp; zero data loss<br/>✔ Automate &amp; repeatable<br/>✔ Minimize downtime &amp; risk<br/>✔ Measure &amp; continuously improve</div>", 1296, 84, 258, 88, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");
  
  rect("r_p2", "<div style='font-size:11px;font-weight:800;color:#7C3AED;margin-bottom:3px;'>MIGRATION PATTERNS</div><div style='font-size:9px;line-height:1.45;color:#0F172A;'>📦 <b>Rehost</b> (Lift &amp; Shift)<br/>🔄 <b>Refactor / Replatform</b><br/>🏗️ <b>Rearchitect</b> (Cloud Native)<br/>🛑 <b>Retire / Decommission</b><br/>🔒 <b>Retain</b> (No Change)</div>", 1296, 178, 258, 88, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");
  
  rect("r_p3", "<div style='font-size:11px;font-weight:800;color:#DC2626;margin-bottom:3px;'>⚠️ KEY RISKS</div><div style='font-size:9px;line-height:1.45;color:#0F172A;'>🔴 Data migration complexity<br/>🔴 Application compatibility<br/>🔴 Downtime / SLA impact<br/>🔴 Security &amp; compliance gaps<br/>🔴 Cost overrun<br/>🔴 Parallel run inconsistency</div>", 1296, 272, 258, 98, "fillColor=#FEF2F2;strokeColor=#FECACA;rounded=1;align=left;verticalAlign=top;padding=4;");
  
  rect("r_p4", "<div style='font-size:11px;font-weight:800;color:#2563EB;margin-bottom:3px;'>MITIGATION STRATEGIES</div><div style='font-size:9px;line-height:1.45;color:#0F172A;'>✔ Wave-based approach<br/>✔ Thorough testing &amp; validation<br/>✔ Rollback &amp; fallback plans<br/>✔ Strong governance &amp; controls<br/>✔ Continuous monitoring</div>", 1296, 376, 258, 114, "fillColor=#EFF6FF;strokeColor=#BFDBFE;rounded=1;align=left;verticalAlign=top;padding=4;");

  // 6. MIDDLE STRIP: MIGRATION APPROACH OVERVIEW & WAVE EXAMPLE (x=20..1560, y=508..590)
  rect("mid_appr", "<div style='font-size:11.5px;font-weight:800;color:#1E3A8A;margin-bottom:4px;text-align:center;'>MIGRATION APPROACH OVERVIEW</div>" +
    "<div style='font-size:10.5px;color:#0F172A;display:flex;justify-content:space-around;text-align:center;align-items:center;'>" +
    "<div>🔍<br/><b>Discover &amp; Assess</b></div> <div>➔</div>" +
    "<div>📑<br/><b>Plan &amp; Design</b></div> <div>➔</div>" +
    "<div>🛠️<br/><b>Build &amp; Prepare</b></div> <div>➔</div>" +
    "<div>🌊<br/><b>Migrate in Waves</b></div> <div>➔</div>" +
    "<div>✔<br/><b>Cutover &amp; Validate</b></div> <div>➔</div>" +
    "<div>⏱️<br/><b>Optimize &amp; Stabilize</b></div> <div>➔</div>" +
    "<div>🛑<br/><b>Decommission &amp; Close</b></div>" +
    "</div>", 20, 508, 800, 75, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=4;");

  rect("mid_wave", "<div style='font-size:11.5px;font-weight:800;color:#2563EB;margin-bottom:4px;text-align:center;'>WAVE EXAMPLE</div>" +
    "<div style='font-size:10.5px;color:#0F172A;display:flex;justify-content:space-around;text-align:center;'>" +
    "<div><b>Wave 1</b><br/>Foundational<br/><span style='font-size:9px;color:#64748B;'>(Non-Critical)</span></div>" +
    "<div><b>Wave 2</b><br/>Business Support<br/><span style='font-size:9px;color:#64748B;'>(Important)</span></div>" +
    "<div><b>Wave 3</b><br/>Customer Facing<br/><span style='font-size:9px;color:#64748B;'>(Critical)</span></div>" +
    "<div><b>Wave 4</b><br/>Long Tail<br/><span style='font-size:9px;color:#64748B;'>(Residual)</span></div>" +
    "</div><div style='font-size:9px;color:#64748B;text-align:center;margin-top:2px;'>Iterative waves with feedback &amp; continuous improvement</div>", 830, 508, 730, 75, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;padding=4;");

  // 7. BOTTOM ROW: 6 PANELS (x=20..1560, y=590..775)
  rect("bot_p1", "<div style='font-size:12px;font-weight:800;color:#16A34A;margin-bottom:4px;'>KEY BENEFITS</div><div style='font-size:10px;line-height:1.5;color:#0F172A;'>✔ Reduced risk with iterative waves<br/>✔ Minimal downtime &amp; business impact<br/>✔ Improved scalability &amp; performance<br/>✔ Enhanced security &amp; compliance<br/>✔ Lower operational cost<br/>✔ Faster innovation &amp; agility</div>", 20, 590, 240, 185, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=5;");
  rect("bot_p2", "<div style='font-size:12px;font-weight:800;color:#1E3A8A;margin-bottom:4px;'>DATA MIGRATION STRATEGY</div><div style='font-size:10px;line-height:1.5;color:#0F172A;'>📊 Assessment &amp; Profiling<br/>📦 Initial Bulk Migration<br/>🔄 CDC / Incremental Sync<br/>✔ Validation &amp; Reconciliation<br/>🚀 Cutover &amp; Final Sync<br/>📈 Post-Cutover Monitoring</div>", 270, 590, 250, 185, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=5;");
  rect("bot_p3", "<div style='font-size:12px;font-weight:800;color:#2563EB;margin-bottom:4px;'>CUTOVER STRATEGIES</div><div style='font-size:10px;line-height:1.5;color:#0F172A;'>🔴 <b>Big Bang</b>: Single cutover (High risk)<br/>🔄 <b>Phased</b>: Module by module<br/>🟢 <b>Blue / Green</b>: Parallel run &amp; switch<br/>🐥 <b>Canary</b>: Limited users first</div>", 530, 590, 230, 185, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=5;");
  rect("bot_p4", "<div style='font-size:12px;font-weight:800;color:#16A34A;margin-bottom:4px;'>SUCCESS METRICS</div><div style='font-size:10px;line-height:1.5;color:#0F172A;'>✔ Zero data loss<br/>✔ Cutover success rate &gt; 98%<br/>✔ Downtime within planned window<br/>✔ Performance within SLA<br/>✔ Cost within target<br/>✔ Business sign-off</div>", 770, 590, 240, 185, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=5;");
  rect("bot_p5", "<div style='font-size:12px;font-weight:800;color:#7C3AED;margin-bottom:4px;'>STAKEHOLDERS</div><div style='font-size:10px;line-height:1.5;color:#0F172A;'>👥 Business Owners<br/>👥 Application Owners<br/>👥 Data Owners<br/>🏗️ Platform / Infrastructure<br/>🛡️ Security &amp; Compliance<br/>👨‍💻 Operations / SRE<br/>📋 PMO / Governance</div>", 1020, 590, 240, 185, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=5;");
  rect("bot_p6", "<div style='font-size:12px;font-weight:800;color:#1E3A8A;margin-bottom:4px;'>TOOLS &amp; TECHNOLOGIES</div><div style='font-size:10px;line-height:1.5;color:#0F172A;'>☁️ <b>Google Cloud (GCP)</b>: Landing Zone, GKE, Cloud SQL<br/>🔄 <b>Database Migration Service (DMS)</b><br/>📦 <b>Data Transfer Appliance</b><br/>🏗️ <b>Infrastructure as Code (Terraform)</b><br/>🚀 <b>CI/CD (Cloud Build / GitHub Actions)</b><br/>📈 <b>Monitoring (Cloud Monitoring, Logging)</b></div>", 1270, 590, 290, 185, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=5;");

  // 8. FOOTER LEGEND (x=20..1560, y=785..815)
  rect("footer_leg", "<div style='font-size:11px;color:#0F172A;display:flex;justify-content:space-around;text-align:center;align-items:center;'>" +
    "<div><b style='color:#1E3A8A;'>LEGEND:</b></div>" +
    "<div>─── Flow</div>" +
    "<div>- - - Data / Control Flow</div>" +
    "<div>··· Optional</div>" +
    "<div>🟦 Process / Phase</div>" +
    "<div>🟩 Target State</div>" +
    "<div>🟪 Supporting Area</div>" +
    "<div>🟥 Risk / Issue</div>" +
    "<div>🟨 Enabler</div>" +
    "</div>", 20, 785, 1540, 30, "fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;rounded=1;align=center;verticalAlign=middle;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_22_migration_transition" name="Template 22: Migration / Transition Architecture">
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
