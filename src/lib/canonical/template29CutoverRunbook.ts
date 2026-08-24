/**
 * Master 1:1 High-Craft Replica for Canonical Template 29: Cutover / Runbook Architecture
 * Matches 100% of images/29.png with solid chevron headers, colored icon badges,
 * rich RACI tables, 8 discrete step cards, and zero voids on 1640x1020 canvas.
 */

const E = (v?: string | null) =>
  (v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function generateTemplate29CutoverRunbookXml(
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

  const edge = (id: string, src: string, tgt: string, color = "#2563EB", s = "") =>
    c.push(
      `<mxCell id="${id}" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=${color};strokeWidth=1.5;endArrow=block;endFill=1;${s}" edge="1" parent="1" source="${src}" target="${tgt}"><mxGeometry relative="1" as="geometry"/></mxCell>`
    );

  // ==================== 1. TOP HEADER BANNER ====================
  rect("hdr_num", `<span style="font-size:28px;font-weight:900;color:#FFFFFF;">29</span>`, 20, 14, 76, 56, "fillColor=#1E3A8A;strokeColor=#1E3A8A;rounded=1;arcSize=15;align=center;verticalAlign=middle;");
  text(
    "hdr_title",
    `<div style='font-size:24px;font-weight:900;color:#0F172A;letter-spacing:0.5px;'>Cutover / Runbook Architecture</div>` +
    `<div style='font-size:12px;font-weight:700;color:#1E3A8A;margin-top:2px;'>Use Case: NovaCura – Production Go-Live &amp; Environment Cutover</div>` +
    `<div style='font-size:10px;color:#64748B;margin-top:1px;'>☁️ Environment: Production &nbsp;|&nbsp; 📍 Region: us-central1 &nbsp;|&nbsp; 📅 Last Updated: May 8, 2025</div>`,
    108,
    14,
    820,
    56,
    "align=left;"
  );

  const brandHtml = `<table style="width:100%;border-collapse:collapse;"><tr><td style="width:40px;vertical-align:middle;text-align:center;"><span style="font-size:28px;">🧬</span></td><td style="text-align:left;vertical-align:middle;padding-left:6px;"><div style="font-size:20px;font-weight:900;color:#0284C7;letter-spacing:1px;">NOVACURA</div><div style="font-size:9.5px;color:#64748B;font-weight:600;font-style:italic;">AI-Powered Regulatory Intelligence Platform</div></td></tr></table>`;
  rect("hdr_brand", brandHtml, 940, 14, 280, 56, "fillColor=none;strokeColor=none;align=left;");

  const objHtml = `<div style='font-size:9.5px;font-weight:900;color:#1E3A8A;margin-bottom:2px;'>OBJECTIVE</div><div style='font-size:8px;line-height:1.35;color:#0F172A;'>Execute a safe, controlled and verifiable cutover to production with minimal downtime, zero/low data loss and rapid rollback capability using a well-defined runbook.</div>`;
  rect("hdr_obj", objHtml, 1235, 14, 385, 56, "strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;padding=5;");

  // ==================== 2. LEFT COLUMN (x=20, w=200, y=84..520) ====================
  // Runbook Overview (y=84, h=240)
  rect("box_l_ov", "", 20, 84, 200, 240, "strokeColor=#1E3A8A;fillColor=#FFFFFF;strokeWidth=1.5;align=left;verticalAlign=top;");
  rect("lbl_ov", `<b style="font-size:10px;color:#FFFFFF;letter-spacing:0.5px;">RUNBOOK OVERVIEW</b>`, 20, 84, 200, 26, "fillColor=#1E3A8A;strokeColor=#1E3A8A;rounded=0;align=center;");
  const ovItems = [
    { t: "Application: NovaCura", icon: "💻" },
    { t: "Domain: Regulatory Intel", icon: "🏛️" },
    { t: "Platform: Google Cloud", icon: "☁️" },
    { t: "Cutover Type: Blue/Green", icon: "🔄" },
    { t: "Target: Prod (us-central1)", icon: "🎯" },
    { t: "RTO: ≤ 30 minutes", icon: "⏱️" },
    { t: "RPO: ≤ 5 minutes", icon: "⏱️" }
  ];
  ovItems.forEach((oi, idx) => {
    const oy = 116 + idx * 28;
    rect(`oi_${idx}`, `<div style='font-size:8.5px;font-weight:700;display:flex;align-items:center;gap:6px;'><span style='font-size:12px;'>${oi.icon}</span> ${oi.t}</div>`, 26, oy, 188, 24, "fillColor=#F8FAFC;strokeColor=#E2E8F0;rounded=1;align=left;verticalAlign=middle;padding=3;");
  });

  // Go / No-Go Criteria (y=334, h=190)
  rect("box_l_gng", "", 20, 334, 200, 190, "strokeColor=#16A34A;fillColor=#FFFFFF;strokeWidth=1.5;align=left;verticalAlign=top;");
  rect("lbl_gng", `<b style="font-size:10px;color:#FFFFFF;letter-spacing:0.5px;">GO / NO-GO CRITERIA</b>`, 20, 334, 200, 26, "fillColor=#16A34A;strokeColor=#16A34A;rounded=0;align=center;");
  const gngItems = [
    "All pre-cutover checks passed",
    "Critical defects = 0",
    "Performance tests successful",
    "Security &amp; compliance sign-off",
    "Business stakeholder approval"
  ];
  gngItems.forEach((gi, idx) => {
    const gy = 366 + idx * 30;
    rect(`gi_${idx}`, `<div style='font-size:8.5px;font-weight:700;color:#16A34A;display:flex;align-items:center;gap:6px;'>✔ <span style='color:#0F172A;'>${gi}</span></div>`, 26, gy, 188, 26, "fillColor=#F0FDF4;strokeColor=#BBF7D0;rounded=1;align=left;verticalAlign=middle;padding=4;");
  });

  // ==================== 3. TOP STAGE: CUTOVER LIFECYCLE (x=230, y=84, w=990, h=240) ====================
  rect("box_life_bg", "", 230, 84, 990, 240, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.2;align=left;verticalAlign=top;");
  text("lbl_life", "<div style='font-size:11px;font-weight:800;color:#1E3A8A;text-align:center;'>CUTOVER LIFECYCLE – PHASES</div>", 230, 88, 990, 18, "align=center;");

  const phases = [
    { n: "1. PLAN &amp; PREPARE", t: "(T-2 to T-14 Days)", col: "#1E3A8A", bg: "#EFF6FF", icon: "📋", sub: "• Finalize cutover approach<br/>• Validate readiness criteria<br/>• Complete DR &amp; rollback plan<br/>• Obtain business sign-off" },
    { n: "2. PRE-CUTOVER", t: "(T-24 to T-1 Hours)", col: "#2563EB", bg: "#EFF6FF", icon: "⚙️", sub: "• Deploy &amp; warm up prod<br/>• Sync / freeze data (if needed)<br/>• Run pre-cutover checks<br/>• Get final go/no-go approval" },
    { n: "3. CUTOVER", t: "(T-0 Window)", col: "#16A34A", bg: "#F0FDF4", icon: "🚀", sub: "• Switch traffic to production<br/>• Enable services / agents<br/>• Run smoke &amp; validation tests<br/>• Monitor in real-time" },
    { n: "4. STABILIZATION", t: "(T+0 to T+24 Hours)", col: "#EA580C", bg: "#FFFBEB", icon: "📈", sub: "• Hypercare monitoring<br/>• Resolve P1/P2 issues<br/>• Validate KPIs &amp; SLAs<br/>• Confirm business usage" },
    { n: "5. POST-CUTOVER", t: "(T+1 to T+7 Days)", col: "#0284C7", bg: "#F0F9FF", icon: "✔", sub: "• Performance optimization<br/>• Decommission old env<br/>• Documentation update<br/>• Formal go-live sign-off" },
    { n: "6. OPERATE", t: "(BAU)", col: "#7C3AED", bg: "#FAF5FF", icon: "📊", sub: "• Steady state operations<br/>• Continuous monitoring<br/>• Cost &amp; usage optimization<br/>• Ongoing improvements" }
  ];

  phases.forEach((p, idx) => {
    const px = 240 + idx * 162;
    // Outer phase container
    rect(`phase_box_${idx}`, "", px, 110, 154, 204, `fillColor=${p.bg};strokeColor=${p.col};strokeWidth=1.5;align=left;verticalAlign=top;`);
    // Solid Header Banner
    rect(`phase_hdr_${idx}`, `<div style="font-size:9.5px;font-weight:900;color:#FFFFFF;text-align:center;">${p.n}</div><div style="font-size:7.5px;color:#E0E7FF;text-align:center;">${p.t}</div>`, px, 110, 154, 34, `fillColor=${p.col};strokeColor=${p.col};rounded=0;align=center;verticalAlign=middle;`);
    // Body Text
    text(`phase_txt_${idx}`, `<div style="font-size:8px;line-height:1.4;color:#0F172A;padding:4px;">${p.sub}</div>`, px + 2, 148, 150, 120, "align=left;verticalAlign=top;");
    // Bottom Icon Circle
    rect(`phase_ico_${idx}`, `<span style="font-size:16px;">${p.icon}</span>`, px + 59, 272, 36, 36, `fillColor=#FFFFFF;strokeColor=${p.col};strokeWidth=1.5;rounded=1;arcSize=50;align=center;verticalAlign=middle;`);
  });

  // Top Right: Environment Topology (x=1235, y=84, w=385, h=240)
  rect("box_env_bg", "", 1235, 84, 385, 240, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.2;align=left;verticalAlign=top;");
  rect("lbl_env", `<b style="font-size:10px;color:#1E3A8A;">ENVIRONMENT TOPOLOGY (POST-CUTOVER)</b>`, 1235, 88, 385, 20, "fillColor=none;strokeColor=none;align=center;");
  text("env_gcp", `<div style="font-size:11px;font-weight:800;color:#475569;text-align:center;">☁️ Google Cloud</div>`, 1235, 108, 385, 20, "align=center;");

  // Topology Diagram Inside Box
  rect("env_users", `<div style="font-size:16px;">👥</div><div style="font-size:8px;font-weight:800;">Users / Apps</div>`, 1245, 150, 70, 60, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("env_lb", `<div style="font-size:16px;">⚖️</div><div style="font-size:7.5px;font-weight:800;">Cloud Load<br/>Balancing</div>`, 1330, 150, 75, 60, "fillColor=#EFF6FF;strokeColor=#BFDBFE;rounded=1;align=center;verticalAlign=middle;");
  rect("env_prod", `<div style="font-size:18px;">🧬</div><div style="font-size:8.5px;font-weight:900;color:#16A34A;">NovaCura<br/>(Prod)</div>`, 1420, 145, 85, 70, "fillColor=#F0FDF4;strokeColor=#16A34A;strokeWidth=1.5;rounded=1;align=center;verticalAlign=middle;");

  const gcpServices = [
    { n: "Vertex AI (Models)", icon: "🧠" },
    { n: "BigQuery (Data)", icon: "📊" },
    { n: "Cloud SQL (OLTP)", icon: "🗄️" },
    { n: "Cloud Storage (Docs)", icon: "🗃️" },
    { n: "Secret Manager", icon: "🔒" }
  ];
  gcpServices.forEach((gs, i) => {
    const gy = 135 + i * 22;
    rect(`env_svc_${i}`, `<div style="font-size:7px;font-weight:700;">${gs.icon} ${gs.n}</div>`, 1520, gy, 92, 20, "fillColor=#FAF5FF;strokeColor=#E9D5FF;rounded=1;align=left;verticalAlign=middle;padding=2;");
  });

  edge("e_env_1", "env_users", "env_lb");
  edge("e_env_2", "env_lb", "env_prod");

  // ==================== 4. DETAILED RUNBOOK – CUTOVER STEPS (x=230, y=334, w=1390, h=190) ====================
  rect("box_steps_bg", "", 230, 334, 1390, 190, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.2;align=left;verticalAlign=top;");
  text("lbl_steps", "<div style='font-size:11px;font-weight:800;color:#1E3A8A;text-align:center;'>DETAILED RUNBOOK – CUTOVER STEPS</div>", 230, 338, 1390, 18, "align=center;");

  const runbookSteps = [
    { n: "1. Freeze &amp; Validate", col: "#2563EB", icon: "🧊", sub: "• Freeze writes (if required)<br/>• Final data sync<br/>• Checksum validation" },
    { n: "2. Deploy Production", col: "#2563EB", icon: "🚀", sub: "• Deploy services<br/>• Run DB migrations<br/>• Verify infra health" },
    { n: "3. Enable Dependencies", col: "#2563EB", icon: "🔌", sub: "• Enable APIs<br/>• Activate connectors<br/>• Validate secrets &amp; IAM" },
    { n: "4. Switch Traffic", col: "#EA580C", icon: "🔄", sub: "• Update DNS / LB<br/>• Route to prod<br/>• Verify traffic flow" },
    { n: "5. Smoke Tests", col: "#16A34A", icon: "🧪", sub: "• Run automated test suite<br/>• Validate key user journeys" },
    { n: "6. Business Validation", col: "#2563EB", icon: "👥", sub: "• User acceptance checks<br/>• Confirm data accuracy" },
    { n: "7. Monitor &amp; Observe", col: "#0D9488", icon: "📈", sub: "• Track SLOs / SLIs<br/>• Watch error rates<br/>• Confirm stability" },
    { n: "8. Close Cutover", col: "#16A34A", icon: "✔", sub: "• Declare go-live<br/>• Lift data freeze (if applied)<br/>• Notify stakeholders" }
  ];

  runbookSteps.forEach((rs, idx) => {
    const rx = 240 + idx * 172;
    // Step Container
    rect(`step_c_${idx}`, "", rx, 362, 164, 152, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");
    // Header Bar
    rect(`step_hdr_${idx}`, `<div style="font-size:8.5px;font-weight:900;color:#FFFFFF;text-align:center;">${rs.n}</div>`, rx, 362, 164, 24, `fillColor=${rs.col};strokeColor=${rs.col};rounded=0;align=center;verticalAlign=middle;`);
    // Icon
    rect(`step_ico_${idx}`, `<span style="font-size:18px;">${rs.icon}</span>`, rx + 67, 392, 30, 30, "fillColor=#F8FAFC;strokeColor=#E2E8F0;rounded=1;arcSize=50;align=center;verticalAlign=middle;");
    // Bullets
    text(`step_txt_${idx}`, `<div style="font-size:7.5px;line-height:1.35;color:#0F172A;padding:4px;">${rs.sub}</div>`, rx + 2, 426, 160, 84, "align=left;verticalAlign=top;");

    if (idx < 7) {
      const nextRx = 240 + (idx + 1) * 172;
      c.push(`<mxCell id="step_arr_${idx}" style="edgeStyle=none;html=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="${rx + 164}" y="438" as="sourcePoint"/><mxPoint x="${nextRx}" y="438" as="targetPoint"/></mxGeometry></mxCell>`);
    }
  });

  // ==================== 5. LOWER SECTION (y=534..768, h=234) ====================
  // Rollback Plan (x=20, w=300)
  rect("box_rollback_bg", "", 20, 534, 300, 234, "strokeColor=#DC2626;fillColor=#FFFFFF;strokeWidth=1.5;align=left;verticalAlign=top;");
  rect("lbl_rollback", `<b style="font-size:10px;color:#FFFFFF;letter-spacing:0.5px;">⚠️ ROLLBACK PLAN</b>`, 20, 534, 300, 26, "fillColor=#DC2626;strokeColor=#DC2626;rounded=0;align=center;");
  const rollSteps = [
    "Revert DNS / LB to previous environment",
    "Disable new production services",
    "Restore data from last known good snapshot",
    "Validate application health in previous env",
    "Communicate status to stakeholders",
    "Perform root cause analysis"
  ];
  rollSteps.forEach((st, idx) => {
    const sy = 568 + idx * 24;
    text(`roll_st_${idx}`, `<div style="font-size:7.5px;line-height:1.2;display:flex;align-items:center;gap:6px;"><span style="background:#DC2626;color:#FFF;border-radius:8px;width:14px;height:14px;display:inline-flex;align-items:center;justify-content:center;font-weight:900;font-size:7px;">${idx + 1}</span> <b>${st}</b></div>`, 26, sy, 288, 22, "align=left;verticalAlign=middle;");
  });
  rect("roll_badge", `<b style="font-size:8.5px;color:#DC2626;">Target Rollback Time: ≤ 30 minutes</b>`, 50, 726, 240, 26, "fillColor=#FEF2F2;strokeColor=#DC2626;strokeWidth=1.5;rounded=1;align=center;verticalAlign=middle;");

  // RACI Table (x=330, w=440)
  rect("box_raci_bg", "", 330, 534, 440, 234, "strokeColor=#1E3A8A;fillColor=#FFFFFF;strokeWidth=1.5;align=left;verticalAlign=top;");
  rect("lbl_raci", `<b style="font-size:10px;color:#FFFFFF;letter-spacing:0.5px;">RACI – CUTOVER RESPONSIBILITIES</b>`, 330, 534, 440, 26, "fillColor=#1E3A8A;strokeColor=#1E3A8A;rounded=0;align=center;");
  const raciHtml = `<table style='width:100%;border-collapse:collapse;font-size:8px;text-align:center;'>
    <tr style='font-weight:800;border-bottom:1.5px solid #CBD5E1;background:#F8FAFC;'>
      <td style='text-align:left;padding:4px;'>Role</td><td>Plan</td><td>Execute</td><td>Monitor</td><td>Approve</td><td>Rollback</td>
    </tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='text-align:left;padding:3px;'><b>OCE / Program Lead</b></td><td><span style='background:#DCFCE7;color:#16A34A;padding:2px 6px;border-radius:3px;font-weight:900;'>R</span></td><td><span style='background:#FFEDD5;color:#EA580C;padding:2px 6px;border-radius:3px;font-weight:900;'>C</span></td><td><span style='background:#FFEDD5;color:#EA580C;padding:2px 6px;border-radius:3px;font-weight:900;'>C</span></td><td><span style='background:#DBEAFE;color:#2563EB;padding:2px 6px;border-radius:3px;font-weight:900;'>A</span></td><td><span style='background:#FEE2E2;color:#DC2626;padding:2px 6px;border-radius:3px;font-weight:900;'>R</span></td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='text-align:left;padding:3px;'><b>FDE / Engineering</b></td><td><span style='background:#DCFCE7;color:#16A34A;padding:2px 6px;border-radius:3px;font-weight:900;'>R</span></td><td><span style='background:#DCFCE7;color:#16A34A;padding:2px 6px;border-radius:3px;font-weight:900;'>R</span></td><td><span style='background:#FFEDD5;color:#EA580C;padding:2px 6px;border-radius:3px;font-weight:900;'>C</span></td><td><span style='background:#FFEDD5;color:#EA580C;padding:2px 6px;border-radius:3px;font-weight:900;'>C</span></td><td><span style='background:#FEE2E2;color:#DC2626;padding:2px 6px;border-radius:3px;font-weight:900;'>R</span></td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='text-align:left;padding:3px;'><b>SRE / DevOps</b></td><td><span style='background:#FFEDD5;color:#EA580C;padding:2px 6px;border-radius:3px;font-weight:900;'>C</span></td><td><span style='background:#DCFCE7;color:#16A34A;padding:2px 6px;border-radius:3px;font-weight:900;'>R</span></td><td><span style='background:#DCFCE7;color:#16A34A;padding:2px 6px;border-radius:3px;font-weight:900;'>R</span></td><td><span style='background:#FFEDD5;color:#EA580C;padding:2px 6px;border-radius:3px;font-weight:900;'>C</span></td><td><span style='background:#FEE2E2;color:#DC2626;padding:2px 6px;border-radius:3px;font-weight:900;'>R</span></td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='text-align:left;padding:3px;'><b>Security / Compliance</b></td><td><span style='background:#FFEDD5;color:#EA580C;padding:2px 6px;border-radius:3px;font-weight:900;'>C</span></td><td><span style='background:#FFEDD5;color:#EA580C;padding:2px 6px;border-radius:3px;font-weight:900;'>C</span></td><td><span style='background:#FFEDD5;color:#EA580C;padding:2px 6px;border-radius:3px;font-weight:900;'>C</span></td><td><span style='background:#DBEAFE;color:#2563EB;padding:2px 6px;border-radius:3px;font-weight:900;'>A</span></td><td><span style='background:#FFEDD5;color:#EA580C;padding:2px 6px;border-radius:3px;font-weight:900;'>C</span></td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='text-align:left;padding:3px;'><b>Business Owner</b></td><td><span style='background:#FFEDD5;color:#EA580C;padding:2px 6px;border-radius:3px;font-weight:900;'>C</span></td><td><span style='background:#FFEDD5;color:#EA580C;padding:2px 6px;border-radius:3px;font-weight:900;'>C</span></td><td><span style='background:#FFEDD5;color:#EA580C;padding:2px 6px;border-radius:3px;font-weight:900;'>C</span></td><td><span style='background:#DBEAFE;color:#2563EB;padding:2px 6px;border-radius:3px;font-weight:900;'>A</span></td><td><span style='background:#FFEDD5;color:#EA580C;padding:2px 6px;border-radius:3px;font-weight:900;'>C</span></td></tr>
    <tr><td style='text-align:left;padding:3px;'><b>Support / NOC</b></td><td><span style='background:#F3E8FF;color:#7C3AED;padding:2px 6px;border-radius:3px;font-weight:900;'>I</span></td><td><span style='background:#FFEDD5;color:#EA580C;padding:2px 6px;border-radius:3px;font-weight:900;'>C</span></td><td><span style='background:#DCFCE7;color:#16A34A;padding:2px 6px;border-radius:3px;font-weight:900;'>R</span></td><td><span style='background:#F3E8FF;color:#7C3AED;padding:2px 6px;border-radius:3px;font-weight:900;'>I</span></td><td><span style='background:#FEE2E2;color:#DC2626;padding:2px 6px;border-radius:3px;font-weight:900;'>R</span></td></tr>
  </table>
  <div style='font-size:7.5px;color:#64748B;text-align:center;margin-top:8px;'><b>R</b> = Responsible &nbsp;|&nbsp; <b>A</b> = Accountable &nbsp;|&nbsp; <b>C</b> = Consulted &nbsp;|&nbsp; <b>I</b> = Informed</div>`;
  rect("box_raci_table", raciHtml, 330, 560, 440, 208, "strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=6;");

  // Cutover Timeline (x=780, w=410)
  rect("box_time_bg", "", 780, 534, 410, 234, "strokeColor=#2563EB;fillColor=#FFFFFF;strokeWidth=1.5;align=left;verticalAlign=top;");
  rect("lbl_time", `<b style="font-size:10px;color:#FFFFFF;letter-spacing:0.5px;">CUTOVER TIMELINE (T-0 WINDOW EXAMPLE)</b>`, 780, 534, 410, 26, "fillColor=#2563EB;strokeColor=#2563EB;rounded=0;align=center;");
  const timeEvents = [
    { t: "18:00", d: "Change freeze begins", dot: "🔵" },
    { t: "19:00", d: "Final data sync &amp; pre-checks", dot: "🔵" },
    { t: "20:00", d: "Production deployment", dot: "🔵" },
    { t: "21:00", d: "Switch traffic (DNS / LB)", dot: "🟢" },
    { t: "21:15", d: "Smoke tests &amp; validation", dot: "🟢" },
    { t: "22:00", d: "Business sign-off", dot: "🟠" },
    { t: "22:30", d: "Go-live declared", dot: "🟠" }
  ];
  timeEvents.forEach((te, idx) => {
    const ty = 566 + idx * 24;
    text(`te_${idx}`, `<div style="font-size:8px;line-height:1.2;">${te.dot} <b>${te.t}</b> &nbsp; ${te.d}</div>`, 790, ty, 230, 22, "align=left;verticalAlign=middle;");
  });
  rect("time_callout", `<div style="font-size:8.5px;color:#64748B;">Total Cutover Window</div><div style="font-size:22px;font-weight:900;color:#1E40AF;margin-top:2px;">2.5 Hours</div>`, 1030, 600, 150, 80, "fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.5;rounded=1;align=center;verticalAlign=middle;");

  // Monitoring & Alerting (Hypercare) (x=1200, w=420)
  rect("box_mon_bg", "", 1200, 534, 420, 234, "strokeColor=#16A34A;fillColor=#FFFFFF;strokeWidth=1.5;align=left;verticalAlign=top;");
  rect("lbl_mon", `<b style="font-size:10px;color:#FFFFFF;letter-spacing:0.5px;">MONITORING &amp; ALERTING (HYPERCARE)</b>`, 1200, 534, 420, 26, "fillColor=#16A34A;strokeColor=#16A34A;rounded=0;align=center;");
  const hyperCards = [
    { t: "Cloud Monitoring", sub: "(Metrics)", icon: "📊" },
    { t: "Cloud Logging", sub: "(Logs)", icon: "📑" },
    { t: "Error Reporting", sub: "(Exceptions)", icon: "⚠️" },
    { t: "Uptime Checks", sub: "(Availability)", icon: "🩺" },
    { t: "PagerDuty", sub: "(On-call)", icon: "📟" },
    { t: "Slack / Email", sub: "(Notifications)", icon: "💬" }
  ];
  hyperCards.forEach((hc, idx) => {
    const col = idx % 3;
    const row = Math.floor(idx / 3);
    const hx = 1215 + col * 130;
    const hy = 574 + row * 84;
    rect(`hc_${idx}`, `<div style="font-size:22px;text-align:center;">${hc.icon}</div><div style="font-size:8.5px;font-weight:800;color:#1E3A8A;text-align:center;margin-top:2px;">${hc.t}</div><div style="font-size:7.5px;color:#64748B;text-align:center;">${hc.sub}</div>`, hx, hy, 122, 74, "fillColor=#F8FAFC;strokeColor=#E2E8F0;rounded=1;align=center;verticalAlign=middle;padding=3;");
  });

  // ==================== 6. BOTTOM ROW (y=778..960, h=182) ====================
  // Key Success Metrics (x=20, w=245)
  rect("box_ksm", "", 20, 778, 245, 182, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.2;align=left;verticalAlign=top;");
  rect("lbl_ksm", `<b style="font-size:9.5px;color:#1E3A8A;">KEY SUCCESS METRICS</b>`, 20, 778, 245, 22, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=0;align=center;");
  text("txt_ksm", `<div style="font-size:8px;line-height:1.45;color:#0F172A;padding:4px;">
    ✔ Service availability ≥ 99.9%<br/>
    ✔ Error rate ≤ 0.1%<br/>
    ✔ P95 latency within SLO (&lt; 2s)<br/>
    ✔ Zero data loss (RPO met)<br/>
    ✔ All critical business flows validated<br/>
    ✔ No P1 incidents in first 24 hours
  </div>`, 22, 802, 241, 150, "align=left;verticalAlign=top;");

  // Risk & Mitigation (x=275, w=445)
  rect("box_rkm", "", 275, 778, 445, 182, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.2;align=left;verticalAlign=top;");
  rect("lbl_rkm", `<b style="font-size:9.5px;color:#DC2626;">RISK &amp; MITIGATION</b>`, 275, 778, 445, 22, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=0;align=center;");
  const rkmTableHtml = `<table style='width:100%;border-collapse:collapse;font-size:7.5px;'>
    <tr style='font-weight:800;border-bottom:1px solid #CBD5E1;background:#F8FAFC;'>
      <td style='padding:2px;'>Risk</td><td>Impact</td><td>Mitigation</td>
    </tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:2px;'>Data Inconsistency</td><td style='color:#DC2626;font-weight:800;'>High</td><td>Pre-sync + checksum validation</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:2px;'>Service downtime</td><td style='color:#DC2626;font-weight:800;'>High</td><td>Blue/Green with instant rollback</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:2px;'>Performance degradation</td><td style='color:#EA580C;font-weight:800;'>Medium</td><td>Load testing + auto-scaling</td></tr>
    <tr style='border-bottom:1px solid #F1F5F9;'><td style='padding:2px;'>API / connector failure</td><td style='color:#EA580C;font-weight:800;'>Medium</td><td>Pre-validation + fallback</td></tr>
    <tr><td style='padding:2px;'>Security misconfiguration</td><td style='color:#DC2626;font-weight:800;'>High</td><td>Pre-deploy security review</td></tr>
  </table>`;
  text("txt_rkm", rkmTableHtml, 277, 802, 441, 150, "align=left;verticalAlign=top;padding=4;");

  // Checklist (x=730, w=245)
  rect("box_chk", "", 730, 778, 245, 182, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.2;align=left;verticalAlign=top;");
  rect("lbl_chk", `<b style="font-size:9.5px;color:#16A34A;">CHECKLIST (EXECUTION)</b>`, 730, 778, 245, 22, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=0;align=center;");
  text("txt_chk", `<div style="font-size:7.5px;line-height:1.4;color:#0F172A;padding:4px;">
    ☑ Pre-cutover sign-off obtained<br/>
    ☑ All runbook steps reviewed<br/>
    ☑ Rollback plan validated (dry run)<br/>
    ☑ Communication plan activated<br/>
    ☑ Hypercare team on standby<br/>
    ☑ Go-live confirmation recorded<br/>
    <div style="text-align:center;margin-top:6px;"><span style="background:#DCFCE7;border:1px solid #16A34A;color:#16A34A;font-size:8px;padding:2px 8px;border-radius:4px;font-weight:800;">✔ Ready for Cutover</span></div>
  </div>`, 732, 802, 241, 150, "align=left;verticalAlign=top;");

  // Communication Plan (x=985, w=225)
  rect("box_comm", "", 985, 778, 225, 182, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.2;align=left;verticalAlign=top;");
  rect("lbl_comm", `<b style="font-size:9.5px;color:#2563EB;">COMMUNICATION PLAN</b>`, 985, 778, 225, 22, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=0;align=center;");
  text("txt_comm", `<div style="font-size:7.5px;line-height:1.4;color:#0F172A;padding:4px;">
    👥 <b>Stakeholders:</b><br/>Execs, Business, OC<br/><br/>
    ✉️ <b>Channels:</b><br/>Email, Slack, War Room<br/><br/>
    ⏱️ <b>Cadence:</b><br/>Pre / During / Post
  </div>`, 987, 802, 221, 150, "align=left;verticalAlign=top;");

  // Legend (x=1220, w=150)
  rect("box_leg", "", 1220, 778, 150, 182, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.2;align=left;verticalAlign=top;");
  rect("lbl_leg", `<b style="font-size:9.5px;color:#1E3A8A;">LEGEND</b>`, 1220, 778, 150, 22, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=0;align=center;");
  text("txt_leg", `<div style="font-size:7.5px;line-height:1.4;color:#0F172A;padding:4px;">
    🟦 Plan / Prep<br/>
    🟩 Execution<br/>
    🟧 Stabilization<br/>
    🟪 Post Cutover<br/>
    🟫 Operations<br/>
    ── Flow / Sequence
  </div>`, 1222, 802, 146, 150, "align=left;verticalAlign=top;");

  // Notes (x=1380, w=240)
  rect("box_notes", "", 1380, 778, 240, 182, "strokeColor=#CBD5E1;fillColor=#FFFFFF;strokeWidth=1.2;align=left;verticalAlign=top;");
  rect("lbl_notes", `<b style="font-size:9.5px;color:#1E3A8A;">NOTES</b>`, 1380, 778, 240, 22, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=0;align=center;");
  text("txt_notes", `<div style="font-size:7.5px;line-height:1.4;color:#64748B;padding:4px;">
    • Runbook reviewed &amp; updated for each release.<br/>
    • Perform periodic cutover drills to validate readiness.<br/>
    • Maintain documentation in central knowledge base.<br/>
    • Ensure compliance with GxP / 21 CFR Part 11.
  </div>`, 1382, 802, 236, 150, "align=left;verticalAlign=top;");

  // ==================== 7. FOOTER STATUS BAR (y=970, h=25) ====================
  const footerHtml = `<div style='font-size:8.5px;color:#64748B;display:flex;justify-content:space-between;align-items:center;'>
    <div><b>NOTES:</b> All runbook executions require formal sign-off and post-mortem audit.</div>
    <div>Version: 1.0 &nbsp;|&nbsp; Enterprise Architecture Team</div>
  </div>`;
  rect("footer_status", footerHtml, 20, 970, 1600, 25, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=middle;padding=4;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_29_cutover_runbook_architecture" name="Template 29: Cutover / Runbook Architecture">
    <mxGraphModel dx="1680" dy="1020" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1680" pageHeight="1020" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${c.join("\n        ")}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
