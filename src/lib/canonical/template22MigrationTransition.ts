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
  rect("num_badge", "22", 20, 16, 48, 48, "fillColor=#1E3A8A;fontColor=#FFFFFF;fontSize=24;fontStyle=1;rounded=1;align=center;verticalAlign=middle;");
  rect("hdr_title", "<div style='font-size:22px;font-weight:800;color:#0F172A;letter-spacing:0.5px;'>Migration / Transition Architecture</div><div style='font-size:11px;color:#1E3A8A;font-weight:700;margin-top:2px;'>Use Case: NovaCura – Platform Modernization &amp; Migration &nbsp;|&nbsp; Environment: Production &nbsp;|&nbsp; Region: us-central1 &nbsp;|&nbsp; Last Updated: May 8, 2025</div>", 78, 16, 840, 48, "strokeColor=none;fillColor=none;align=left;verticalAlign=middle;spacingLeft=10;");
  rect("hdr_brand", "<div style='text-align:right;'><span style='font-size:20px;font-weight:800;color:#0284C7;'>🧬 NOVACURA</span><br/><span style='font-size:9.5px;color:#64748B;font-style:italic;'>AI-Powered Regulatory Intelligence Platform</span></div>", 940, 16, 280, 48, "strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

  // Objective Card
  rect("card_obj", "<div style='font-size:8.5px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>OBJECTIVE</div><div style='font-size:10px;line-height:1.35;color:#0F172A;'>Migrate applications, data, and integrations to the target cloud architecture with minimal risk, zero data loss, and measurable business value at every step.</div>", 1240, 16, 320, 48, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=4;");

  // 2. CURRENT STATE (On-Prem & Legacy) (x=20..115, y=72..410)
  rect("box_current", "", 20, 72, 95, 338, "fillColor=#FFFFFF;strokeColor=#64748B;strokeWidth=1.2;rounded=1;");
  rect("lbl_current", "<span style='font-size:9px;font-weight:800;color:#64748B;'>CURRENT STATE<br/><span style='font-size:8px;'>(On-Prem &amp; Legacy)</span></span>", 20, 75, 95, 18, "strokeColor=none;fillColor=none;align=center;");

  const curBlocks = [
    { t: "Applications", sub: "• Monolith Apps<br/>• Legacy Services<br/>• Batch Jobs", icon: "💻" },
    { t: "Data Stores", sub: "• Oracle DB<br/>• File Shares (NAS)<br/>• Document Repos", icon: "🗄️" },
    { t: "Integrations", sub: "• FTP / SFTP<br/>• Point-to-Point<br/>• Legacy APIs", icon: "🔌" },
    { t: "Infrastructure", sub: "• On-Prem Data Center<br/>• VMware / Physical<br/>• Legacy Network", icon: "🏢" }
  ];
  curBlocks.forEach((cb, idx) => {
    const cy = 96 + idx * 76;
    rect(`cur_${idx}`, `<div style='font-size:9px;font-weight:800;color:#1E3A8A;'>${cb.icon} ${cb.t}</div><div style='font-size:8px;line-height:1.3;color:#0F172A;margin-top:2px;'>${cb.sub}</div>`, 25, cy, 85, 70, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");
  });

  // 3. MIGRATION PHASES 1..5 (x=122..1130, y=72..410)
  rect("box_phases_main", "", 122, 72, 1008, 338, "fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;rounded=1;");
  rect("lbl_phases_main", "<span style='font-size:10px;font-weight:800;color:#2563EB;'>MIGRATION PHASES</span>", 122, 75, 1008, 14, "strokeColor=none;fillColor=none;align=center;");

  const phases = [
    {
      n: "1", t: "Assess & Plan", col: "#1E3A8A", bg: "#F8FAFC",
      items: [
        "🔍 <b>Discovery &amp; Inventory</b><br/><span style='color:#64748B;font-size:8px;'>Apps, data, infra, deps</span>",
        "💰 <b>TCO &amp; Business Case</b><br/><span style='color:#64748B;font-size:8px;'>Cost, effort, timeline</span>",
        "⚠️ <b>Risk &amp; Dependency</b><br/><span style='color:#64748B;font-size:8px;'>Technical, operational</span>",
        "📋 <b>Migration Strategy</b><br/><span style='color:#64748B;font-size:8px;'>Approach, wave plan</span>"
      ],
      deliv: "<b>Key Deliverables</b><br/>• Assessment Report<br/>• Target Arch Blueprint<br/>• Migration Runbook<br/>• Wave &amp; Cutover Plan"
    },
    {
      n: "2", t: "Ready & Build", col: "#2563EB", bg: "#EFF6FF",
      items: [
        "☁️ <b>Target Landing Zone</b><br/><span style='color:#64748B;font-size:8px;'>Network, IAM, security</span>",
        "⚙️ <b>Platform &amp; Services</b><br/><span style='color:#64748B;font-size:8px;'>Core platform &amp; svcs</span>",
        "🗄️ <b>Data Migration Setup</b><br/><span style='color:#64748B;font-size:8px;'>Tools, validation rules</span>",
        "⚡ <b>CI/CD &amp; Automation</b><br/><span style='color:#64748B;font-size:8px;'>Pipelines, IaC</span>"
      ],
      deliv: "<b>Key Deliverables</b><br/>• Landing Zone Ready<br/>• CI/CD Ready<br/>• Data Migration Plan<br/>• Validation Framework"
    },
    {
      n: "3", t: "Migrate & Validate", col: "#16A34A", bg: "#F0FDF4",
      items: [
        "🚀 <b>Migrate in Waves</b><br/><span style='color:#64748B;font-size:8px;'>Low risk → High risk</span>",
        "🗃️ <b>Data Migration</b><br/><span style='color:#64748B;font-size:8px;'>Bulk + CDC/Sync</span>",
        "🔄 <b>Application Cutover</b><br/><span style='color:#64748B;font-size:8px;'>Blue/Green / Phased</span>",
        "🩺 <b>Validate &amp; Test</b><br/><span style='color:#64748B;font-size:8px;'>Functional, perf, sec</span>"
      ],
      deliv: "<b>Key Deliverables</b><br/>• Wave Report<br/>• Data Recon Report<br/>• Test Results &amp; Sign-off<br/>• Cutover Readiness"
    },
    {
      n: "4", t: "Optimize & Stabilize", col: "#7C3AED", bg: "#FAF5FF",
      items: [
        "⚡ <b>Performance Tuning</b><br/><span style='color:#64748B;font-size:8px;'>Right size, caching</span>",
        "🛡️ <b>Resilience Hardening</b><br/><span style='color:#64748B;font-size:8px;'>HA/DR, failover test</span>",
        "👥 <b>Operational Handover</b><br/><span style='color:#64748B;font-size:8px;'>Runbooks, SRE</span>",
        "💰 <b>Cost Optimization</b><br/><span style='color:#64748B;font-size:8px;'>Rightsizing, savings</span>"
      ],
      deliv: "<b>Key Deliverables</b><br/>• Resilience Report<br/>• DR Test Report<br/>• Runbooks &amp; SOPs<br/>• Cost Plan"
    },
    {
      n: "5", t: "Decommission", col: "#DC2626", bg: "#FEF2F2",
      items: [
        "⛔ <b>Legacy Decom</b><br/><span style='color:#64748B;font-size:8px;'>Quiet period &amp; sign-off</span>",
        "📑 <b>Data Retention</b><br/><span style='color:#64748B;font-size:8px;'>Archive &amp; compliance</span>",
        "🔒 <b>Access Cleanup</b><br/><span style='color:#64748B;font-size:8px;'>Remove old access</span>",
        "📚 <b>Knowledge Transfer</b><br/><span style='color:#64748B;font-size:8px;'>KT sessions &amp; docs</span>"
      ],
      deliv: "<b>Key Deliverables</b><br/>• Decommission Sign-off<br/>• Archive Report<br/>• Access Removal Report<br/>• Final Report"
    }
  ];

  phases.forEach((ph, idx) => {
    const px = 130 + idx * 199;
    rect(`ph_box_${idx}`, "", px, 94, 193, 308, `fillColor=${ph.bg};strokeColor=${ph.col};rounded=1;`);
    rect(`ph_lbl_${idx}`, `<div style='font-size:9px;font-weight:800;color:${ph.col};'>${ph.n} &nbsp; ${ph.t}</div>`, px, 96, 193, 14, "strokeColor=none;fillColor=none;align=center;");

    ph.items.forEach((it, itIdx) => {
      const iy = 112 + itIdx * 45;
      rect(`ph_${idx}_it_${itIdx}`, `<div style='font-size:8px;color:#0F172A;'>${it}</div>`, px + 5, iy, 183, 40, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=middle;padding=2;");
    });

    rect(`ph_${idx}_deliv`, `<div style='font-size:8px;color:#0F172A;line-height:1.2;'>${ph.deliv}</div>`, px + 5, 296, 183, 100, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=3;");
  });

  // 4. TARGET STATE (Cloud-Native Platform) (x=1138..1285, y=72..410)
  rect("box_target", "", 1138, 72, 147, 338, "fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;rounded=1;");
  rect("lbl_target", "<span style='font-size:9px;font-weight:800;color:#16A34A;'>TARGET STATE<br/><span style='font-size:8px;'>(Cloud-Native Platform)</span></span>", 1138, 75, 147, 18, "strokeColor=none;fillColor=none;align=center;");

  const tgtBlocks = [
    { t: "Applications", sub: "• Microservices<br/>• Managed Services<br/>• Serverless", icon: "⚙️" },
    { t: "Data Layer", sub: "• Cloud SQL<br/>• BigQuery<br/>• Object Storage", icon: "🗄️" },
    { t: "Integrations", sub: "• API Gateway<br/>• Event-Driven<br/>• Standard APIs", icon: "🔌" },
    { t: "Platform", sub: "• GKE / Cloud Run<br/>• Cloud Services<br/>• Global Network", icon: "☁️" },
    { t: "Observability &amp; Ops", sub: "• Cloud Monitoring<br/>• Logging<br/>• SCC / SIEM", icon: "📑" }
  ];
  tgtBlocks.forEach((tb, idx) => {
    const ty = 96 + idx * 61;
    rect(`tgt_${idx}`, `<div style='font-size:9px;font-weight:800;color:#16A34A;'>${tb.icon} ${tb.t}</div><div style='font-size:8px;line-height:1.2;color:#0F172A;margin-top:1px;'>${tb.sub}</div>`, 1143, ty, 137, 56, "fillColor=#F0FDF4;strokeColor=#16A34A;rounded=1;align=left;verticalAlign=top;padding=2;");
  });

  // 5. FAR RIGHT: PRINCIPLES, PATTERNS, RISKS, MITIGATIONS (x=1292..1560, y=72..410)
  rect("box_r_principles", "<div style='font-size:9px;font-weight:800;color:#1E3A8A;margin-bottom:1px;'>MIGRATION PRINCIPLES</div><div style='font-size:8px;line-height:1.3;color:#0F172A;'>✔ Business value driven<br/>✔ Security &amp; compliance by design<br/>✔ Data integrity &amp; zero data loss<br/>✔ Automate &amp; repeatable<br/>✔ Minimize downtime &amp; risk<br/>✔ Measure &amp; continuously improve</div>", 1292, 72, 268, 76, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=2;");

  rect("box_r_patterns", "<div style='font-size:9px;font-weight:800;color:#2563EB;margin-bottom:1px;'>MIGRATION PATTERNS</div><div style='font-size:8px;line-height:1.3;color:#0F172A;'>📦 <b>Rehost</b> (Lift &amp; Shift) &nbsp;|&nbsp; ⚙️ <b>Refactor / Replatform</b><br/>🏗️ <b>Rearchitect</b> (Cloud Native) &nbsp;|&nbsp; ⛔ <b>Retire / Decom</b><br/>🔒 <b>Retain</b> (No Change)</div>", 1292, 152, 268, 62, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=2;");

  rect("box_r_risks", "<div style='font-size:9px;font-weight:800;color:#DC2626;margin-bottom:1px;'>KEY RISKS</div><div style='font-size:8px;line-height:1.3;color:#0F172A;'>⚠️ Data migration complexity &nbsp;|&nbsp; ⚠️ App compatibility<br/>⚠️ Downtime / SLA impact &nbsp;|&nbsp; ⚠️ Security gaps<br/>⚠️ Cost overrun &nbsp;|&nbsp; ⚠️ Parallel run inconsistency</div>", 1292, 218, 268, 58, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=2;");

  rect("box_r_mitig", "<div style='font-size:9px;font-weight:800;color:#16A34A;margin-bottom:1px;'>MITIGATION STRATEGIES</div><div style='font-size:8px;line-height:1.3;color:#0F172A;'>✔ Wave-based approach &nbsp;|&nbsp; ✔ Thorough testing<br/>✔ Rollback &amp; fallback plans &nbsp;|&nbsp; ✔ Strong governance<br/>✔ Continuous monitoring</div>", 1292, 280, 268, 130, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=2;");

  // 6. MIDDLE STRIP: APPROACH OVERVIEW & WAVE EXAMPLE (x=20..1560, y=416..540)
  rect("box_approach", "<div style='font-size:10px;font-weight:800;color:#1E3A8A;margin-bottom:4px;text-align:center;'>MIGRATION APPROACH OVERVIEW</div><div style='font-size:8px;color:#0F172A;display:flex;justify-content:space-around;text-align:center;align-items:center;'><div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:3px;border-radius:3px;'>🔍<br/><b>Discover &amp; Assess</b></div> <div>➔</div> <div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:3px;border-radius:3px;'>📋<br/><b>Plan &amp; Design</b></div> <div>➔</div> <div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:3px;border-radius:3px;'>🏗️<br/><b>Build &amp; Prepare</b></div> <div>➔</div> <div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:3px;border-radius:3px;'>🚀<br/><b>Migrate in Waves</b></div> <div>➔</div> <div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:3px;border-radius:3px;'>🔄<br/><b>Cutover &amp; Validate</b></div> <div>➔</div> <div style='border:1px solid #CBD5E1;background:#F8FAFC;padding:3px;border-radius:3px;'>⚡<br/><b>Optimize &amp; Stabilize</b></div> <div>➔</div> <div style='border:1px solid #DC2626;background:#FEF2F2;padding:3px;border-radius:3px;'>⛔<br/><b>Decommission &amp; Close</b></div></div>", 20, 416, 950, 120, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=top;padding=4;");

  rect("box_waves", "<div style='font-size:10px;font-weight:800;color:#2563EB;margin-bottom:4px;text-align:center;'>WAVE EXAMPLE</div><div style='font-size:8px;color:#0F172A;display:flex;justify-content:space-around;text-align:center;align-items:center;'><div style='border:1px solid #16A34A;background:#F0FDF4;padding:3px;border-radius:3px;'><b>Wave 1</b><br/>Foundational<br/>(Non-Critical)</div> <div style='border:1px solid #2563EB;background:#EFF6FF;padding:3px;border-radius:3px;'><b>Wave 2</b><br/>Business Support<br/>(Important)</div> <div style='border:1px solid #D97706;background:#FFFBEB;padding:3px;border-radius:3px;'><b>Wave 3</b><br/>Customer Facing<br/>(Critical)</div> <div style='border:1px solid #64748B;background:#F8FAFC;padding:3px;border-radius:3px;'><b>Wave 4</b><br/>Long Tail<br/>(Residual)</div></div><div style='font-size:8px;color:#64748B;text-align:center;margin-top:8px;'>Iterative waves with feedback &amp; continuous improvement</div>", 980, 416, 580, 120, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=top;padding=4;");

  // 7. BOTTOM ROW: BENEFITS, DATA STRAT, CUTOVER, SUCCESS, STAKEHOLDERS, TOOLS (x=20..1560, y=546..740)
  rect("bot_benefits", "<div style='font-size:10px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>KEY BENEFITS</div><div style='font-size:8px;line-height:1.35;color:#0F172A;'>✔ Reduced risk with iterative waves<br/>✔ Minimal downtime &amp; business impact<br/>✔ Improved scalability &amp; performance<br/>✔ Enhanced security &amp; compliance<br/>✔ Lower operational cost<br/>✔ Faster innovation &amp; agility</div>", 20, 546, 250, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("bot_data_strat", "<div style='font-size:10px;font-weight:800;color:#2563EB;margin-bottom:2px;'>DATA MIGRATION STRATEGY</div><div style='font-size:8px;line-height:1.35;color:#0F172A;'>🔍 <b>Assessment &amp; Profiling</b><br/>📦 <b>Initial Bulk Migration</b><br/>🔄 <b>CDC / Incremental Sync</b><br/>✔ <b>Validation &amp; Reconciliation</b><br/>⚡ <b>Cutover &amp; Final Sync</b><br/>📈 <b>Post-Cutover Monitoring</b></div>", 280, 546, 250, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("bot_cutover_strat", "<div style='font-size:10px;font-weight:800;color:#D97706;margin-bottom:2px;'>CUTOVER STRATEGIES</div><div style='font-size:8px;line-height:1.35;color:#0F172A;'>🔴 <b>Big Bang:</b> Single cutover (High risk)<br/>📦 <b>Phased:</b> Module by module<br/>🔄 <b>Blue / Green:</b> Parallel run &amp; switch<br/>👥 <b>Canary:</b> Limited users first</div>", 540, 546, 240, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("bot_metrics", "<div style='font-size:10px;font-weight:800;color:#16A34A;margin-bottom:2px;'>SUCCESS METRICS</div><div style='font-size:8px;line-height:1.35;color:#0F172A;'>✔ <b>Zero data loss</b><br/>✔ <b>Cutover success rate &gt; 98%</b><br/>✔ <b>Downtime within planned window</b><br/>✔ <b>Performance within SLA</b><br/>✔ <b>Cost within target</b><br/>✔ <b>Business sign-off</b></div>", 790, 546, 240, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("bot_stakeholders", "<div style='font-size:10px;font-weight:800;color:#7C3AED;margin-bottom:2px;'>STAKEHOLDERS</div><div style='font-size:8px;line-height:1.35;color:#0F172A;'>👥 <b>Business Owners</b><br/>💻 <b>Application Owners</b><br/>🗄️ <b>Data Owners</b><br/>☁️ <b>Platform / Infrastructure</b><br/>🛡️ <b>Security &amp; Compliance</b><br/>⚙️ <b>Operations / SRE</b><br/>📋 <b>PMO / Governance</b></div>", 1040, 546, 240, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  rect("bot_tools", "<div style='font-size:10px;font-weight:800;color:#1E3A8A;margin-bottom:2px;'>TOOLS &amp; TECHNOLOGIES</div><div style='font-size:8px;line-height:1.35;color:#0F172A;'>☁️ <b>Google Cloud (GCP)</b><br/>🗄️ <b>Database Migration Service (DMS)</b><br/>📦 <b>Data Transfer Appliance</b><br/>🏗️ <b>IaC (Terraform)</b><br/>⚡ <b>CI/CD (Cloud Build / GitHub)</b><br/>📑 <b>Monitoring (Cloud Monitoring)</b></div>", 1290, 546, 270, 190, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=4;");

  // 8. FOOTER METADATA STRIP (x=20..1560, y=744..768)
  rect("footer_meta", "<div style='font-size:9px;color:#0F172A;display:flex;justify-content:space-between;align-items:center;'><div>Version: 1.0</div><div>Date: May 2024</div></div>", 20, 744, 1540, 24, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=middle;padding=3;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_22_migration_transition_architecture" name="Template 22: Migration / Transition Architecture">
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
