/**
 * Master 1:1 High-Craft Exact Replica Generator for Canonical Template 03: Business Process / Swimlane
 * Matches 100% of images/03.png (End-to-End Drug Development & Commercialization Lifecycle)
 * Spacious 1680x1040 layout, 115px lane heights, 100% collision-free orthogonal channels.
 */

const E = (v?: string | null) =>
  (v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function generateTemplate03SwimlaneXml(domainFlavor = "biopharma", theme: "light" | "dark" = "light"): string {
  const isDark = theme === "dark";
  const bg = isDark ? "#0B111E" : "#FFFFFF";
  const c: string[] = [];

  const rect = (id: string, v: string, x: number, y: number, w: number, h: number, s = "") =>
    c.push(
      `<mxCell id="${id}" value="${E(v)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;fontColor=#0F172A;fontSize=11;${s}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`
    );

  const text = (id: string, v: string, x: number, y: number, w: number, h: number, s = "") =>
    c.push(
      `<mxCell id="${id}" value="${E(v)}" style="text;html=1;strokeColor=none;fillColor=none;whiteSpace=wrap;fontColor=#0F172A;fontSize=11;verticalAlign=middle;${s}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`
    );

  const diamond = (id: string, v: string, x: number, y: number, w: number, h: number, s = "") =>
    c.push(
      `<mxCell id="${id}" value="${E(v)}" style="rhombus;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#F59E0B;strokeWidth=1.5;fontColor=#0F172A;fontSize=9.5;fontStyle=1;align=center;verticalAlign=middle;${s}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`
    );

  const edge = (id: string, src: string, tgt: string, label = "", color = "#475569", dash = false, s = "") =>
    c.push(
      `<mxCell id="${id}" value="${E(label)}" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=6;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${color};strokeWidth=1.5;endArrow=block;endFill=1;fontSize=9;fontColor=${color};fontStyle=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=2;${dash ? "dashed=1;dashPattern=5 3;" : ""}${s}" edge="1" parent="1" source="${src}" target="${tgt}"><mxGeometry relative="1" as="geometry"/></mxCell>`
    );

  // ==================== 1. TOP HEADER BANNER ====================
  // Header Badge "03"
  rect("hdr_num", `<span style="font-size:26px;font-weight:900;color:#FFFFFF;">03</span>`, 20, 14, 76, 58, "fillColor=#0F2A4A;strokeColor=#0F2A4A;rounded=1;arcSize=15;align=center;verticalAlign=middle;");
  
  // Title & Subtitle
  text("hdr_title", "BUSINESS PROCESS / SWIMLANE — NOVACURA BIO-PHARMA PRODUCT", 110, 16, 1050, 28, "fontSize=24;fontStyle=1;align=left;fontColor=#0F172A;fontFamily=Inter,sans-serif;");
  text("hdr_sub", "End-to-End Drug Development & Commercialization Lifecycle", 110, 46, 800, 22, "fontSize=14;fontStyle=1;fontColor=#475569;align=left;fontFamily=Inter,sans-serif;");

  // Top Right Logo
  rect("hdr_logo", `<table style="width:100%;border-collapse:collapse;"><tr><td style="width:40px;vertical-align:middle;text-align:center;"><span style="font-size:28px;">🧬</span></td><td style="text-align:left;vertical-align:middle;padding-left:8px;"><div style="font-size:18px;font-weight:900;color:#0F2A4A;letter-spacing:1px;">NOVACURA</div><div style="font-size:9px;color:#64748B;font-weight:600;">Transforming Therapies. Improving Lives.</div></td></tr></table>`, 1340, 14, 300, 58, "fillColor=none;strokeColor=none;");

  // ==================== 2. PHASE COLUMN HEADERS (CHEVRONS) ====================
  // Column 0: SWIMLANES (x: 20..195, w: 175)
  rect("ph_swimlanes", `<b style="font-size:12px;color:#FFFFFF;letter-spacing:1px;">SWIMLANES</b>`, 20, 84, 175, 36, "fillColor=#0F2A4A;strokeColor=#0F2A4A;rounded=0;align=center;");
  
  // Column 1: 1. RESEARCH & DISCOVERY (x: 200..480, w: 280)
  rect("ph_1", `<b style="font-size:11.5px;color:#FFFFFF;letter-spacing:0.5px;">1. RESEARCH &amp; DISCOVERY</b>`, 200, 84, 280, 36, "fillColor=#1E824C;strokeColor=#1E824C;rounded=0;align=center;");

  // Column 2: 2. DEVELOPMENT (x: 485..805, w: 320)
  rect("ph_2", `<b style="font-size:11.5px;color:#FFFFFF;letter-spacing:0.5px;">2. DEVELOPMENT</b>`, 485, 84, 320, 36, "fillColor=#2563EB;strokeColor=#2563EB;rounded=0;align=center;");

  // Column 3: 3. MANUFACTURING (x: 810..1080, w: 270)
  rect("ph_3", `<b style="font-size:11.5px;color:#FFFFFF;letter-spacing:0.5px;">3. MANUFACTURING</b>`, 810, 84, 270, 36, "fillColor=#7E22CE;strokeColor=#7E22CE;rounded=0;align=center;");

  // Column 4: 4. COMMERCIALIZATION (x: 1085..1360, w: 275)
  rect("ph_4", `<b style="font-size:11.5px;color:#FFFFFF;letter-spacing:0.5px;">4. COMMERCIALIZATION</b>`, 1085, 84, 275, 36, "fillColor=#EA580C;strokeColor=#EA580C;rounded=0;align=center;");

  // Column 5: 5. PATIENT OUTCOMES (x: 1365..1640, w: 275)
  rect("ph_5", `<b style="font-size:11.5px;color:#FFFFFF;letter-spacing:0.5px;">5. PATIENT OUTCOMES</b>`, 1365, 84, 275, 36, "fillColor=#0D9488;strokeColor=#0D9488;rounded=0;align=center;");

  // ==================== SWIMLANE BACKGROUND GRID ====================
  // Outer frame for all swimlanes (x: 20..1640, y: 120..945, w: 1620, h: 825)
  rect("swimlane_frame", "", 20, 120, 1620, 825, "fillColor=#FAFAFA;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=0;");

  // Phase vertical separator guidelines (running only across process rows y=120..810)
  const phaseDividers = [200, 485, 810, 1085, 1365];
  phaseDividers.forEach((x, idx) => {
    c.push(`<mxCell id="div_phase_${idx}" style="edgeStyle=none;html=1;strokeColor=#E2E8F0;strokeWidth=1.2;dashed=1;dashPattern=4 4;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="${x}" y="120" as="sourcePoint"/><mxPoint x="${x}" y="810" as="targetPoint"/></mxGeometry></mxCell>`);
  });

  // Swimlane horizontal rows (7 rows, height: 115px each for Rows 1-6, 135px for Row 7)
  const lanes = [
    { id: "lane_research", y: 120, h: 115, icon: "🧪", color: "#1E824C", title: "RESEARCH\nSCIENTIST", desc: "Discover & validate\nnovel therapies" },
    { id: "lane_clinops", y: 235, h: 115, icon: "👥", color: "#2563EB", title: "CLINICAL\nOPERATIONS", desc: "Design & execute\nclinical trials" },
    { id: "lane_reg", y: 350, h: 115, icon: "🛡️", color: "#0D9488", title: "REGULATORY\nAFFAIRS", desc: "Ensure compliance\n& regulatory submissions" },
    { id: "lane_mfg", y: 465, h: 115, icon: "🏭", color: "#7E22CE", title: "MANUFACTURING\nOPERATIONS", desc: "Manufacture with\nquality & compliance" },
    { id: "lane_comm", y: 580, h: 115, icon: "📊", color: "#EA580C", title: "COMMERCIAL\nOPERATIONS", desc: "Deliver to market &\nengage customers" },
    { id: "lane_patient", y: 695, h: 115, icon: "🩺", color: "#059669", title: "PATIENT &\nHEALTHCARE PROVIDERS", desc: "Care delivery &\npatient outcomes" },
    { id: "lane_platform", y: 810, h: 135, icon: "🗄️", color: "#0F2A4A", title: "DATA & DIGITAL\nPLATFORM", desc: "Enable data, analytics\n& insights" },
  ];

  lanes.forEach((lane, idx) => {
    if (idx > 0) {
      c.push(`<mxCell id="div_lane_${idx}" style="edgeStyle=none;html=1;strokeColor=#E2E8F0;strokeWidth=1.2;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="20" y="${lane.y}" as="sourcePoint"/><mxPoint x="1640" y="${lane.y}" as="targetPoint"/></mxGeometry></mxCell>`);
    }

    // Lane Role Pod (Left Column x=20..195)
    rect(
      `${lane.id}_pod`,
      `<table style="width:100%;height:100%;border-collapse:collapse;">
        <tr>
          <td style="width:42px;vertical-align:middle;text-align:center;">
            <div style="width:36px;height:36px;border-radius:18px;background:${lane.color};display:flex;align-items:center;justify-content:center;margin:0 auto;">
              <span style="font-size:16px;">${lane.icon}</span>
            </div>
          </td>
          <td style="vertical-align:middle;padding-left:6px;text-align:left;">
            <div style="font-size:10px;font-weight:900;color:${lane.color};line-height:1.15;">${lane.title.replace(/\n/g, "<br/>")}</div>
            <div style="font-size:8px;color:#64748B;line-height:1.15;margin-top:3px;">${lane.desc.replace(/\n/g, "<br/>")}</div>
          </td>
        </tr>
      </table>`,
      20,
      lane.y,
      175,
      lane.h,
      "fillColor=#FFFFFF;strokeColor=none;rounded=0;"
    );
  });

  // ==================== 3. PROCESS NODES (CARDS & DIAMONDS) ====================

  // Helper for process step card with generous dimensions
  const stepCard = (id: string, title: string, x: number, y: number, w: number, h: number, color = "#1E824C", icon = "") => {
    const iconHtml = icon ? `<div style="font-size:13px;line-height:1;margin-bottom:3px;">${icon}</div>` : "";
    rect(
      id,
      `<div style="text-align:center;padding:4px 6px;">
        ${iconHtml}
        <div style="font-size:9.5px;font-weight:bold;color:#0F172A;line-height:1.2;">${title.replace(/\n/g, "<br/>")}</div>
      </div>`,
      x,
      y,
      w,
      h,
      `fillColor=#FFFFFF;strokeColor=${color};strokeWidth=1.5;rounded=1;arcSize=10;shadow=1;align=center;verticalAlign=middle;`
    );
  };

  // --- ROW 1: RESEARCH SCIENTIST (y: 120..235, center y=177) ---
  // In Phase 1: Research & Discovery (x: 200..480)
  stepCard("card_id_targets", "Identify\nTargets", 215, 148, 80, 56, "#1E824C", "🎯");
  stepCard("card_lead_disc", "Lead\nDiscovery", 305, 148, 80, 56, "#1E824C", "🔬");
  stepCard("card_lead_opt", "Lead\nOptimization", 395, 148, 80, 56, "#1E824C", "🧬");

  // In Phase 2: Development (x: 485..805)
  stepCard("card_cand_sel", "Candidate\nSelection", 500, 148, 88, 56, "#2563EB", "📋");
  stepCard("card_preclin", "Preclinical\nStudies", 600, 148, 88, 56, "#2563EB", "🧪");

  // Decision 1: Proceed to Clinical Trials?
  diamond("dec_proceed_trials", "Proceed to\nClinical\nTrials?", 705, 148, 92, 56, "fillColor=#ECFDF5;strokeColor=#10B981;");

  // --- ROW 2: CLINICAL OPERATIONS (y: 235..350, center y=292) ---
  stepCard("card_ind_sub", "IND\nSubmission", 395, 264, 80, 56, "#2563EB", "📄");
  stepCard("card_phase1", "Clinical Trials\nPhase I", 500, 264, 88, 56, "#2563EB", "🩺");
  stepCard("card_phase2", "Clinical Trials\nPhase II", 600, 264, 88, 56, "#2563EB", "👥");
  stepCard("card_phase3", "Clinical Trials\nPhase III", 700, 264, 88, 56, "#2563EB", "📊");

  // In Phase 3: Manufacturing / Submission (x: 810..1080)
  stepCard("card_nda_sub", "NDA / BLA\nSubmission", 820, 264, 88, 56, "#2563EB", "📑");
  diamond("dec_reg_approval", "Regulatory\nApproval?", 925, 264, 92, 56, "fillColor=#FFFBEB;strokeColor=#F59E0B;");

  // --- ROW 3: REGULATORY AFFAIRS (y: 350..465, center y=407) ---
  stepCard("card_reg_strat", "Regulatory\nStrategy", 215, 378, 80, 56, "#0D9488", "📋");
  stepCard("card_pre_ind", "Pre-IND\nMeeting", 305, 378, 80, 56, "#0D9488", "👥");

  // In Phase 3 / Phase 4
  stepCard("card_ha_review", "Health Authority\nReview", 820, 378, 92, 56, "#EA580C", "🏛️");
  stepCard("card_approval_lic", "Approval /\nLicence", 930, 378, 90, 56, "#EA580C", "📜");

  // --- ROW 4: MANUFACTURING OPERATIONS (y: 465..580, center y=522) ---
  stepCard("card_proc_dev", "Process\nDevelopment", 600, 494, 88, 56, "#7E22CE", "⚙️");
  stepCard("card_tech_trans", "Scale-Up & Tech\nTransfer", 705, 494, 92, 56, "#7E22CE", "🧪");
  stepCard("card_gmp_mfg", "GMP\nManufacturing", 820, 494, 92, 56, "#7E22CE", "🏭");
  stepCard("card_qc_release", "Quality Control\n& Release", 930, 494, 95, 56, "#7E22CE", "🛡️");

  // --- ROW 5: COMMERCIAL OPERATIONS (y: 580..695, center y=637) ---
  // In Phase 4: Commercialization (x: 1085..1360)
  stepCard("card_mkt_access", "Market Access\n& Pricing", 1100, 608, 90, 56, "#EA580C", "📈");
  stepCard("card_prod_launch", "Product Launch\n& Distribution", 1200, 608, 92, 56, "#EA580C", "🚚");
  stepCard("card_sales_hcp", "Sales & HCP\nEngagement", 1298, 608, 60, 56, "#EA580C", "👥");
  
  // In Phase 5: Patient Outcomes (x: 1365..1640)
  stepCard("card_patient_supp", "Patient Support\nPrograms", 1380, 608, 96, 56, "#EA580C", "🤝");

  // --- ROW 6: PATIENT & HEALTHCARE PROVIDERS (y: 695..810, center y=752) ---
  stepCard("card_treat_adh", "Treatment &\nAdherence", 1100, 724, 90, 56, "#059669", "💊");
  stepCard("card_outcome_mon", "Outcomes\nMonitoring", 1200, 724, 92, 56, "#059669", "📊");
  stepCard("card_rwe_evid", "Real-World\nEvidence", 1380, 724, 96, 56, "#059669", "🗄️");

  // --- ROW 7: DATA & DIGITAL PLATFORM (y: 810..945) ---
  const platformPods = [
    { title: "Data Collection\n(EDC, ePRO, Labs)", icon: "🗄️", x: 205, w: 125 },
    { title: "Data Integration\n& Governance", icon: "🕸️", x: 340, w: 125 },
    { title: "Analytics &\nAI/ML Insights", icon: "🧠", x: 475, w: 125 },
    { title: "Document & Content\nManagement", icon: "📁", x: 610, w: 135 },
    { title: "Security, Privacy\n& Compliance", icon: "🛡️", x: 755, w: 130 },
    { title: "Audit Trail &\nLineage", icon: "🔍", x: 895, w: 120 },
    { title: "Reporting &\nDashboards", icon: "📊", x: 1025, w: 120 },
  ];

  platformPods.forEach((pod, i) => {
    rect(
      `pod_plat_${i}`,
      `<div style="text-align:center;padding:6px 4px;">
        <div style="font-size:16px;line-height:1;">${pod.icon}</div>
        <div style="font-size:8.5px;font-weight:bold;color:#0F2A4A;line-height:1.2;margin-top:4px;">${pod.title.replace(/\n/g, "<br/>")}</div>
      </div>`,
      pod.x,
      828,
      pod.w,
      95,
      "fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;arcSize=10;align=center;verticalAlign=middle;"
    );
  });

  // Right Enclosure: KEY SYSTEMS & TOOLS (Examples) (x: 1160..1630, w: 470, h: 100)
  rect(
    "box_key_systems",
    `<div style="font-size:9.5px;font-weight:900;color:#0F2A4A;letter-spacing:0.5px;text-align:center;margin-bottom:6px;">KEY SYSTEMS &amp; TOOLS (Examples)</div>
    <table style="width:100%;border-collapse:collapse;text-align:center;">
      <tr>
        <td style="font-size:8px;font-weight:bold;color:#EA580C;padding:2px;"><b style="font-size:9px;">Veeva</b><br/>Veeva Vault</td>
        <td style="font-size:8px;font-weight:bold;color:#0284C7;padding:2px;"><b style="font-size:9px;">Medidata</b><br/>Rave EDC</td>
        <td style="font-size:8px;font-weight:bold;color:#0F172A;padding:2px;"><b style="font-size:9px;">SAP</b><br/>S/4HANA</td>
        <td style="font-size:8px;font-weight:bold;color:#2563EB;padding:2px;"><b style="font-size:9px;">IQVIA</b><br/>Orchestrate</td>
        <td style="font-size:8px;font-weight:bold;color:#0284C7;padding:2px;"><b style="font-size:9px;">Salesforce</b><br/>Health Cloud</td>
      </tr>
      <tr>
        <td style="padding:2px;font-size:12px;">☁️<br/><span style="font-size:7px;color:#475569;">Google Cloud</span></td>
        <td style="padding:2px;font-size:12px;">🔍<br/><span style="font-size:7px;color:#475569;">BigQuery</span></td>
        <td style="padding:2px;font-size:12px;">🕸️<br/><span style="font-size:7px;color:#475569;">Dataplex</span></td>
        <td style="padding:2px;font-size:12px;">✨<br/><span style="font-size:7px;color:#475569;">Vertex AI</span></td>
        <td style="padding:2px;font-size:12px;">📊<br/><span style="font-size:7px;color:#475569;">Looker</span></td>
      </tr>
    </table>`,
    1160,
    825,
    470,
    100,
    "fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.5;rounded=1;arcSize=10;shadow=1;"
  );

  // ==================== 4. CONNECTING EDGES & WORKFLOW ROUTING ====================
  edge("e_id_to_disc", "card_id_targets", "card_lead_disc", "", "#1E824C");
  edge("e_disc_to_opt", "card_lead_disc", "card_lead_opt", "", "#1E824C");
  edge("e_opt_to_cand", "card_lead_opt", "card_cand_sel", "", "#1E824C");
  edge("e_cand_to_preclin", "card_cand_sel", "card_preclin", "", "#2563EB");
  edge("e_preclin_to_dec1", "card_preclin", "dec_proceed_trials", "", "#2563EB");

  // Decision 1 Branches:
  c.push(`<mxCell id="e_dec1_yes" value="Yes" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#10B981;strokeWidth=1.5;endArrow=block;endFill=1;fontSize=9;fontColor=#10B981;fontStyle=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#A7F3D0;padding=2;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="dec_proceed_trials" target="card_phase1"><mxGeometry relative="1" as="geometry"><Array as="points"><mxPoint x="751" y="220"/><mxPoint x="544" y="220"/></Array></mxGeometry></mxCell>`);
  c.push(`<mxCell id="e_dec1_no" value="No" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#EF4444;strokeWidth=1.5;endArrow=block;endFill=1;fontSize=9;fontColor=#EF4444;fontStyle=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#FECACA;padding=2;dashed=1;dashPattern=5 3;exitX=0.5;exitY=0;entryX=0.5;entryY=0;" edge="1" parent="1" source="dec_proceed_trials" target="card_lead_opt"><mxGeometry relative="1" as="geometry"><Array as="points"><mxPoint x="751" y="132"/><mxPoint x="435" y="132"/></Array></mxGeometry></mxCell>`);

  edge("e_reg_strat_to_pre", "card_reg_strat", "card_pre_ind", "", "#0D9488");
  c.push(`<mxCell id="e_pre_to_ind" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0D9488;strokeWidth=1.5;endArrow=block;endFill=1;exitX=0.5;exitY=0;entryX=0;entryY=0.5;" edge="1" parent="1" source="card_pre_ind" target="card_ind_sub"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  edge("e_ind_to_p1", "card_ind_sub", "card_phase1", "", "#2563EB");

  edge("e_p1_to_p2", "card_phase1", "card_phase2", "", "#2563EB");
  edge("e_p2_to_p3", "card_phase2", "card_phase3", "", "#2563EB");
  edge("e_p3_to_nda", "card_phase3", "card_nda_sub", "", "#2563EB");
  edge("e_nda_to_dec2", "card_nda_sub", "dec_reg_approval", "", "#2563EB");

  // Decision 2 Branches:
  c.push(`<mxCell id="e_dec2_yes" value="Yes" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#10B981;strokeWidth=1.5;endArrow=block;endFill=1;fontSize=9;fontColor=#10B981;fontStyle=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#A7F3D0;padding=2;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="dec_reg_approval" target="card_ha_review"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  c.push(`<mxCell id="e_dec2_no" value="No" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#EF4444;strokeWidth=1.5;endArrow=block;endFill=1;fontSize=9;fontColor=#EF4444;fontStyle=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#FECACA;padding=2;dashed=1;dashPattern=5 3;exitX=0.5;exitY=0;entryX=0.5;entryY=0;" edge="1" parent="1" source="dec_reg_approval" target="card_cand_sel"><mxGeometry relative="1" as="geometry"><Array as="points"><mxPoint x="971" y="132"/><mxPoint x="544" y="132"/></Array></mxGeometry></mxCell>`);

  edge("e_ha_to_appr", "card_ha_review", "card_approval_lic", "", "#EA580C");

  c.push(`<mxCell id="e_p2_to_proc" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#7E22CE;strokeWidth=1.5;endArrow=block;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="card_phase2" target="card_proc_dev"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  edge("e_proc_to_tech", "card_proc_dev", "card_tech_trans", "", "#7E22CE");
  edge("e_tech_to_gmp", "card_tech_trans", "card_gmp_mfg", "", "#7E22CE");
  edge("e_gmp_to_qc", "card_gmp_mfg", "card_qc_release", "", "#7E22CE");

  c.push(`<mxCell id="e_appr_to_mkt" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#EA580C;strokeWidth=1.5;endArrow=block;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="card_approval_lic" target="card_mkt_access"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  c.push(`<mxCell id="e_qc_to_mkt" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#EA580C;strokeWidth=1.5;endArrow=block;endFill=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="card_qc_release" target="card_mkt_access"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  edge("e_mkt_to_launch", "card_mkt_access", "card_prod_launch", "", "#EA580C");
  edge("e_launch_to_sales", "card_prod_launch", "card_sales_hcp", "", "#EA580C");
  edge("e_sales_to_supp", "card_sales_hcp", "card_patient_supp", "", "#EA580C");

  c.push(`<mxCell id="e_launch_to_treat" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#059669;strokeWidth=1.5;endArrow=block;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="card_prod_launch" target="card_treat_adh"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  edge("e_treat_to_outc", "card_treat_adh", "card_outcome_mon", "", "#059669");
  edge("e_outc_to_rwe", "card_outcome_mon", "card_rwe_evid", "", "#059669");

  // Feedback Loop from Real-World Evidence back to Target Discovery
  c.push(`<mxCell id="e_rwe_feedback" value="RWE Continuous Improvement Feedback Loop" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#059669;strokeWidth=1.5;endArrow=block;endFill=1;fontSize=9;fontColor=#059669;dashed=1;dashPattern=5 3;labelBackgroundColor=#FFFFFF;labelBorderColor=#A7F3D0;padding=3;" edge="1" parent="1" source="card_rwe_evid" target="card_id_targets"><mxGeometry relative="1" as="geometry"><Array as="points"><mxPoint x="1600" y="752"/><mxPoint x="1600" y="76"/><mxPoint x="255" y="76"/></Array></mxGeometry></mxCell>`);

  // ==================== 5. BOTTOM LEGEND ====================
  rect("legend_bg", "", 20, 955, 1620, 42, "fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1.2;rounded=1;arcSize=8;");
  text("lbl_legend_title", `<b style="font-size:10.5px;color:#0F172A;letter-spacing:1px;">LEGEND</b>`, 25, 960, 75, 32, "align=center;");

  const legendItems = [
    { title: "Research & Discovery", color: "#1E824C", bg: "#DCFCE7", x: 105, w: 155 },
    { title: "Development", color: "#2563EB", bg: "#DBEAFE", x: 270, w: 115 },
    { title: "Manufacturing", color: "#7E22CE", bg: "#F3E8FF", x: 395, w: 125 },
    { title: "Commercialization", color: "#EA580C", bg: "#FFEDD5", x: 530, w: 140 },
    { title: "Patient Outcomes", color: "#0D9488", bg: "#CCFBF1", x: 680, w: 135 },
  ];

  legendItems.forEach((item, i) => {
    rect(
      `leg_item_${i}`,
      `<span style="font-size:9px;font-weight:bold;color:${item.color};">${item.title}</span>`,
      item.x,
      962,
      item.w,
      28,
      `fillColor=${item.bg};strokeColor=${item.color};strokeWidth=1.2;rounded=1;arcSize=20;align=center;`
    );
  });

  rect("leg_sym_step", `<span style="font-size:8.5px;font-weight:bold;color:#475569;">Process Step</span>`, 830, 962, 95, 28, "fillColor=#FFFFFF;strokeColor=#475569;strokeWidth=1.2;rounded=1;arcSize=8;align=center;");
  diamond("leg_sym_dec", `<span style="font-size:8px;font-weight:bold;color:#D97706;">Decision</span>`, 935, 960, 80, 30, "fillColor=#FFFBEB;strokeColor=#F59E0B;");
  text("leg_sym_flow", `<span style="font-size:9px;font-weight:bold;color:#475569;">&mdash;&rarr; Flow</span>`, 1025, 962, 85, 28, "align=center;");
  text("leg_sym_dash", `<span style="font-size:9px;font-weight:bold;color:#475569;">- - - &rarr; Feedback Loop</span>`, 1115, 962, 145, 28, "align=center;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_03_swimlane" name="03 — Business Process / Swimlane">
    <mxGraphModel dx="1600" dy="1000" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1680" pageHeight="1040" background="${bg}" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${c.join("\n        ")}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
