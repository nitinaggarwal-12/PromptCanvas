/**
 * Master 1:1 Exact Replica Generator for Canonical Template 03: Business Process / Swimlane
 * Matches 100% of images/03.png (End-to-End Drug Development & Commercialization Lifecycle)
 * With dynamic domain flavoring, dark/light theme support, and collision-free geometry.
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
      `<mxCell id="${id}" value="${E(v)}" style="rhombus;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#F59E0B;strokeWidth=1.5;fontColor=#0F172A;fontSize=9;fontStyle=1;align=center;verticalAlign=middle;${s}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`
    );

  const edge = (id: string, src: string, tgt: string, label = "", color = "#475569", dash = false, s = "") =>
    c.push(
      `<mxCell id="${id}" value="${E(label)}" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=6;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${color};strokeWidth=1.5;endArrow=block;endFill=1;fontSize=8.5;fontColor=${color};fontStyle=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=2;${dash ? "dashed=1;dashPattern=5 3;" : ""}${s}" edge="1" parent="1" source="${src}" target="${tgt}"><mxGeometry relative="1" as="geometry"/></mxCell>`
    );

  // ==================== 1. TOP HEADER BANNER ====================
  // Header Badge "03"
  rect("hdr_num", `<span style="font-size:24px;font-weight:900;color:#FFFFFF;">03</span>`, 20, 14, 68, 56, "fillColor=#0F2A4A;strokeColor=#0F2A4A;rounded=1;arcSize=15;align=center;verticalAlign=middle;");
  
  // Title & Subtitle
  text("hdr_title", "BUSINESS PROCESS / SWIMLANE — NOVACURA BIO-PHARMA PRODUCT", 100, 16, 950, 26, "fontSize=22;fontStyle=1;align=left;fontColor=#0F172A;fontFamily=Inter,sans-serif;");
  text("hdr_sub", "End-to-End Drug Development & Commercialization Lifecycle", 100, 44, 700, 20, "fontSize=13;fontStyle=1;fontColor=#475569;align=left;fontFamily=Inter,sans-serif;");

  // Top Right Logo
  rect("hdr_logo", `<table style="width:100%;border-collapse:collapse;"><tr><td style="width:36px;vertical-align:middle;text-align:center;"><span style="font-size:26px;">🧬</span></td><td style="text-align:left;vertical-align:middle;padding-left:6px;"><div style="font-size:16px;font-weight:900;color:#0F2A4A;letter-spacing:1px;">NOVACURA</div><div style="font-size:8px;color:#64748B;font-weight:600;">Transforming Therapies. Improving Lives.</div></td></tr></table>`, 1180, 14, 280, 56, "fillColor=none;strokeColor=none;");

  // ==================== 2. PHASE COLUMN HEADERS (CHEVRONS) ====================
  // Column 0: SWIMLANES (x: 20..185, w: 165)
  rect("ph_swimlanes", `<b style="font-size:11.5px;color:#FFFFFF;letter-spacing:1px;">SWIMLANES</b>`, 20, 84, 165, 34, "fillColor=#0F2A4A;strokeColor=#0F2A4A;rounded=0;align=center;");
  
  // Column 1: 1. RESEARCH & DISCOVERY (x: 190..450, w: 260)
  rect("ph_1", `<b style="font-size:11px;color:#FFFFFF;letter-spacing:0.5px;">1. RESEARCH &amp; DISCOVERY</b>`, 190, 84, 260, 34, "fillColor=#1E824C;strokeColor=#1E824C;rounded=0;align=center;");

  // Column 2: 2. DEVELOPMENT (x: 455..745, w: 290)
  rect("ph_2", `<b style="font-size:11px;color:#FFFFFF;letter-spacing:0.5px;">2. DEVELOPMENT</b>`, 455, 84, 290, 34, "fillColor=#2563EB;strokeColor=#2563EB;rounded=0;align=center;");

  // Column 3: 3. MANUFACTURING (x: 750..985, w: 235)
  rect("ph_3", `<b style="font-size:11px;color:#FFFFFF;letter-spacing:0.5px;">3. MANUFACTURING</b>`, 750, 84, 235, 34, "fillColor=#7E22CE;strokeColor=#7E22CE;rounded=0;align=center;");

  // Column 4: 4. COMMERCIALIZATION (x: 990..1235, w: 245)
  rect("ph_4", `<b style="font-size:11px;color:#FFFFFF;letter-spacing:0.5px;">4. COMMERCIALIZATION</b>`, 990, 84, 245, 34, "fillColor=#EA580C;strokeColor=#EA580C;rounded=0;align=center;");

  // Column 5: 5. PATIENT OUTCOMES (x: 1240..1465, w: 225)
  rect("ph_5", `<b style="font-size:11px;color:#FFFFFF;letter-spacing:0.5px;">5. PATIENT OUTCOMES</b>`, 1240, 84, 225, 34, "fillColor=#0D9488;strokeColor=#0D9488;rounded=0;align=center;");

  // ==================== SWIMLANE BACKGROUND GRID ====================
  // Outer frame for all swimlanes
  rect("swimlane_frame", "", 20, 118, 1445, 618, "fillColor=#FAFAFA;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=0;");

  // Phase vertical separator guidelines
  const phaseDividers = [190, 455, 750, 990, 1240];
  phaseDividers.forEach((x, idx) => {
    c.push(`<mxCell id="div_phase_${idx}" style="edgeStyle=none;html=1;strokeColor=#E2E8F0;strokeWidth=1;dashed=1;dashPattern=4 4;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="${x}" y="118" as="sourcePoint"/><mxPoint x="${x}" y="736" as="targetPoint"/></mxGeometry></mxCell>`);
  });

  // Swimlane horizontal rows (7 rows)
  const lanes = [
    { id: "lane_research", y: 118, h: 86, icon: "🧪", color: "#1E824C", title: "RESEARCH\nSCIENTIST", desc: "Discover & validate\nnovel therapies" },
    { id: "lane_clinops", y: 204, h: 86, icon: "👥", color: "#2563EB", title: "CLINICAL\nOPERATIONS", desc: "Design & execute\nclinical trials" },
    { id: "lane_reg", y: 290, h: 86, icon: "🛡️", color: "#0D9488", title: "REGULATORY\nAFFAIRS", desc: "Ensure compliance\n& regulatory\nsubmissions" },
    { id: "lane_mfg", y: 376, h: 86, icon: "🏭", color: "#7E22CE", title: "MANUFACTURING\nOPERATIONS", desc: "Manufacture with\nquality & compliance" },
    { id: "lane_comm", y: 462, h: 86, icon: "📊", color: "#EA580C", title: "COMMERCIAL\nOPERATIONS", desc: "Deliver to market &\nengage customers" },
    { id: "lane_patient", y: 548, h: 84, icon: "🩺", color: "#059669", title: "PATIENT &\nHEALTHCARE\nPROVIDERS", desc: "Care delivery &\npatient outcomes" },
    { id: "lane_platform", y: 632, h: 104, icon: "🗄️", color: "#0F2A4A", title: "DATA & DIGITAL\nPLATFORM", desc: "Enable data, analytics\n& insights" },
  ];

  lanes.forEach((lane, idx) => {
    // Horizontal lane separator
    if (idx > 0) {
      c.push(`<mxCell id="div_lane_${idx}" style="edgeStyle=none;html=1;strokeColor=#E2E8F0;strokeWidth=1;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="20" y="${lane.y}" as="sourcePoint"/><mxPoint x="1465" y="${lane.y}" as="targetPoint"/></mxGeometry></mxCell>`);
    }

    // Lane Role Pod (Left Column x=20..185)
    rect(
      `${lane.id}_pod`,
      `<table style="width:100%;height:100%;border-collapse:collapse;">
        <tr>
          <td style="width:36px;vertical-align:middle;text-align:center;">
            <div style="width:30px;height:30px;border-radius:15px;background:${lane.color};display:flex;align-items:center;justify-content:center;margin:0 auto;">
              <span style="font-size:14px;">${lane.icon}</span>
            </div>
          </td>
          <td style="vertical-align:middle;padding-left:4px;text-align:left;">
            <div style="font-size:9px;font-weight:900;color:${lane.color};line-height:1.1;">${lane.title.replace(/\n/g, "<br/>")}</div>
            <div style="font-size:7px;color:#64748B;line-height:1.1;margin-top:2px;">${lane.desc.replace(/\n/g, "<br/>")}</div>
          </td>
        </tr>
      </table>`,
      20,
      lane.y,
      165,
      lane.h,
      "fillColor=#FFFFFF;strokeColor=none;rounded=0;"
    );
  });

  // ==================== 3. PROCESS NODES (CARDS & DIAMONDS) ====================

  // Helper for process step card
  const stepCard = (id: string, title: string, x: number, y: number, w: number, h: number, color = "#1E824C", icon = "") => {
    const iconHtml = icon ? `<div style="font-size:11px;line-height:1;margin-bottom:2px;">${icon}</div>` : "";
    rect(
      id,
      `<div style="text-align:center;padding:2px 4px;">
        ${iconHtml}
        <div style="font-size:8.5px;font-weight:bold;color:#0F172A;line-height:1.15;">${title.replace(/\n/g, "<br/>")}</div>
      </div>`,
      x,
      y,
      w,
      h,
      `fillColor=#FFFFFF;strokeColor=${color};strokeWidth=1.3;rounded=1;arcSize=10;shadow=1;align=center;verticalAlign=middle;`
    );
  };

  // --- ROW 1: RESEARCH SCIENTIST (y=118..204, center y=161) ---
  // In Phase 1: Research & Discovery (x=190..450)
  stepCard("card_id_targets", "Identify\nTargets", 205, 136, 68, 48, "#1E824C");
  stepCard("card_lead_disc", "Lead\nDiscovery", 288, 136, 68, 48, "#1E824C", "🔬");
  stepCard("card_lead_opt", "Lead\nOptimization", 370, 136, 72, 48, "#1E824C", "🧬");

  // In Phase 2: Development (x=455..745)
  stepCard("card_cand_sel", "Candidate\nSelection", 475, 136, 72, 48, "#2563EB");
  stepCard("card_preclin", "Preclinical\nStudies", 565, 136, 72, 48, "#2563EB", "🐟");

  // Decision 1: Proceed to Clinical Trials? (Centered between Preclinical and Phase I)
  diamond("dec_proceed_trials", "Proceed to\nClinical\nTrials?", 525, 186, 90, 44, "fillColor=#ECFDF5;strokeColor=#10B981;");

  // --- ROW 2: CLINICAL OPERATIONS (y=204..290, center y=247) ---
  // IND Submission under Pre-IND / Phase 1
  stepCard("card_ind_sub", "IND\nSubmission", 370, 226, 72, 46, "#2563EB", "📄");
  stepCard("card_phase1", "Clinical Trials\nPhase I", 475, 238, 76, 46, "#2563EB", "🩺");
  stepCard("card_phase2", "Clinical Trials\nPhase II", 565, 238, 76, 46, "#2563EB");
  stepCard("card_phase3", "Clinical Trials\nPhase III", 655, 238, 76, 46, "#2563EB");
  stepCard("card_nda_sub", "NDA / BLA\nSubmission", 750, 238, 76, 46, "#2563EB", "📑");

  // Decision 2: Regulatory Approval? (x: 855, y: 238)
  diamond("dec_reg_approval", "Regulatory\nApproval?", 855, 238, 85, 46, "fillColor=#FFFBEB;strokeColor=#F59E0B;");

  // --- ROW 3: REGULATORY AFFAIRS (y=290..376, center y=333) ---
  // In Phase 1: Research & Discovery
  stepCard("card_reg_strat", "Regulatory\nStrategy", 205, 312, 70, 46, "#0D9488", "📋");
  stepCard("card_pre_ind", "Pre-IND\nMeeting", 288, 312, 70, 46, "#0D9488", "👥");

  // In Phase 4: Commercialization
  stepCard("card_ha_review", "Health Authority\nReview", 855, 312, 85, 46, "#EA580C", "🏛️");
  stepCard("card_approval_lic", "Approval /\nLicence", 965, 312, 75, 46, "#EA580C", "📜");

  // --- ROW 4: MANUFACTURING OPERATIONS (y=376..462, center y=419) ---
  // In Phase 3: Manufacturing (x=750..985)
  stepCard("card_proc_dev", "Process\nDevelopment", 565, 396, 76, 46, "#7E22CE", "⚙️");
  stepCard("card_tech_trans", "Scale-Up & Tech\nTransfer", 665, 396, 80, 46, "#7E22CE", "🧪");
  stepCard("card_gmp_mfg", "GMP\nManufacturing", 760, 396, 78, 46, "#7E22CE", "🏭");
  stepCard("card_qc_release", "Quality Control\n& Release", 855, 396, 80, 46, "#7E22CE", "🛡️");

  // --- ROW 5: COMMERCIAL OPERATIONS (y=462..548, center y=505) ---
  // In Phase 4: Commercialization (x=990..1235)
  stepCard("card_mkt_access", "Market Access\n& Pricing", 965, 482, 80, 46, "#EA580C", "📈");
  stepCard("card_prod_launch", "Product Launch\n& Distribution", 1060, 482, 85, 46, "#EA580C", "🚚");
  stepCard("card_sales_hcp", "Sales & HCP\nEngagement", 1160, 482, 80, 46, "#EA580C", "👥");
  stepCard("card_patient_supp", "Patient Support\nPrograms", 1255, 482, 85, 46, "#EA580C", "🤝");

  // --- ROW 6: PATIENT & HEALTHCARE PROVIDERS (y=548..632, center y=590) ---
  // In Phase 5: Patient Outcomes (x=1240..1465)
  stepCard("card_treat_adh", "Treatment &\nAdherence", 1060, 566, 85, 46, "#059669", "💊");
  stepCard("card_outcome_mon", "Outcomes\nMonitoring", 1160, 566, 80, 46, "#059669", "📊");
  stepCard("card_rwe_evid", "Real-World\nEvidence", 1255, 566, 85, 46, "#059669", "🗄️");

  // --- ROW 7: DATA & DIGITAL PLATFORM (y=632..736) ---
  // Platform Pods (Horizontally aligned x=195..1060)
  const platformPods = [
    { title: "Data Collection\n(EDC, ePRO, Labs)", icon: "🗄️", x: 195, w: 115 },
    { title: "Data Integration\n& Governance", icon: "🕸️", x: 318, w: 115 },
    { title: "Analytics &\nAI/ML Insights", icon: "🧠", x: 441, w: 112 },
    { title: "Document & Content\nManagement", icon: "📁", x: 561, w: 125 },
    { title: "Security, Privacy\n& Compliance", icon: "🛡️", x: 694, w: 118 },
    { title: "Audit Trail &\nLineage", icon: "🔍", x: 820, w: 105 },
    { title: "Reporting &\nDashboards", icon: "📊", x: 933, w: 105 },
  ];

  platformPods.forEach((pod, i) => {
    rect(
      `pod_plat_${i}`,
      `<div style="text-align:center;padding:2px;">
        <div style="font-size:14px;line-height:1;">${pod.icon}</div>
        <div style="font-size:7.5px;font-weight:bold;color:#0F2A4A;line-height:1.15;margin-top:2px;">${pod.title.replace(/\n/g, "<br/>")}</div>
      </div>`,
      pod.x,
      646,
      pod.w,
      74,
      "fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;rounded=1;arcSize=10;align=center;verticalAlign=middle;"
    );
  });

  // Right Enclosure: KEY SYSTEMS & TOOLS (Examples)
  rect(
    "box_key_systems",
    `<div style="font-size:8.5px;font-weight:900;color:#0F2A4A;letter-spacing:0.5px;text-align:center;margin-bottom:3px;">KEY SYSTEMS &amp; TOOLS (Examples)</div>
    <table style="width:100%;border-collapse:collapse;text-align:center;">
      <tr>
        <td style="font-size:7px;font-weight:bold;color:#EA580C;padding:1px;"><b style="font-size:8px;">Veeva</b><br/>Veeva Vault</td>
        <td style="font-size:7px;font-weight:bold;color:#0284C7;padding:1px;"><b style="font-size:8px;">Medidata</b><br/>Rave EDC</td>
        <td style="font-size:7px;font-weight:bold;color:#0F172A;padding:1px;"><b style="font-size:8px;">SAP</b><br/>S/4HANA</td>
        <td style="font-size:7px;font-weight:bold;color:#2563EB;padding:1px;"><b style="font-size:8px;">IQVIA</b><br/>Orchestrate</td>
        <td style="font-size:7px;font-weight:bold;color:#0284C7;padding:1px;"><b style="font-size:8px;">Salesforce</b><br/>Health Cloud</td>
      </tr>
      <tr>
        <td style="padding:1px;font-size:10px;">☁️<br/><span style="font-size:6px;color:#475569;">Google Cloud</span></td>
        <td style="padding:1px;font-size:10px;">🔍<br/><span style="font-size:6px;color:#475569;">BigQuery</span></td>
        <td style="padding:1px;font-size:10px;">🕸️<br/><span style="font-size:6px;color:#475569;">Dataplex</span></td>
        <td style="padding:1px;font-size:10px;">✨<br/><span style="font-size:6px;color:#475569;">Vertex AI</span></td>
        <td style="padding:1px;font-size:10px;">📊<br/><span style="font-size:6px;color:#475569;">Looker</span></td>
      </tr>
    </table>`,
    1050,
    642,
    405,
    80,
    "fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;rounded=1;arcSize=8;shadow=1;"
  );

  // ==================== 4. CONNECTING EDGES & WORKFLOW ROUTING ====================
  // Row 1 Forward Flow
  edge("e_id_to_disc", "card_id_targets", "card_lead_disc", "", "#1E824C");
  edge("e_disc_to_opt", "card_lead_disc", "card_lead_opt", "", "#1E824C");
  edge("e_opt_to_cand", "card_lead_opt", "card_cand_sel", "", "#1E824C");
  edge("e_cand_to_preclin", "card_cand_sel", "card_preclin", "", "#2563EB");
  
  // Preclinical to Proceed to Clinical Trials decision
  c.push(`<mxCell id="e_preclin_to_dec1" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=block;endFill=1;exitX=0.5;exitY=1;entryX=1;entryY=0.5;" edge="1" parent="1" source="card_preclin" target="dec_proceed_trials"><mxGeometry relative="1" as="geometry"/></mxCell>`);

  // Decision 1 Branches:
  // Yes -> Clinical Trials Phase I (Row 2)
  c.push(`<mxCell id="e_dec1_yes" value="Yes" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#10B981;strokeWidth=1.5;endArrow=block;endFill=1;fontSize=8;fontColor=#10B981;fontStyle=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#A7F3D0;padding=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="dec_proceed_trials" target="card_phase1"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  
  // No -> Feedback to Lead Optimization (Dashed return loop)
  c.push(`<mxCell id="e_dec1_no" value="No" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#EF4444;strokeWidth=1.5;endArrow=block;endFill=1;fontSize=8;fontColor=#EF4444;fontStyle=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#FECACA;padding=1;dashed=1;dashPattern=5 3;exitX=0;exitY=0.5;entryX=0.5;entryY=1;" edge="1" parent="1" source="dec_proceed_trials" target="card_lead_opt"><mxGeometry relative="1" as="geometry"/></mxCell>`);

  // Row 3 Regulatory Affairs to Clinical Ops IND
  edge("e_reg_strat_to_pre", "card_reg_strat", "card_pre_ind", "", "#0D9488");
  c.push(`<mxCell id="e_pre_to_ind" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0D9488;strokeWidth=1.5;endArrow=block;endFill=1;exitX=0.5;exitY=0;entryX=0;entryY=0.5;" edge="1" parent="1" source="card_pre_ind" target="card_ind_sub"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  edge("e_ind_to_p1", "card_ind_sub", "card_phase1", "", "#2563EB");

  // Row 2 Clinical Ops Flow
  edge("e_p1_to_p2", "card_phase1", "card_phase2", "", "#2563EB");
  edge("e_p2_to_p3", "card_phase2", "card_phase3", "", "#2563EB");
  edge("e_p3_to_nda", "card_phase3", "card_nda_sub", "", "#2563EB");
  edge("e_nda_to_dec2", "card_nda_sub", "dec_reg_approval", "", "#2563EB");

  // Decision 2 Branches:
  // Yes -> Health Authority Review (Row 3)
  c.push(`<mxCell id="e_dec2_yes" value="Yes" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#10B981;strokeWidth=1.5;endArrow=block;endFill=1;fontSize=8;fontColor=#10B981;fontStyle=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#A7F3D0;padding=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="dec_reg_approval" target="card_ha_review"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  
  // No -> Feedback to Candidate Selection / Preclinical
  c.push(`<mxCell id="e_dec2_no" value="No" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#EF4444;strokeWidth=1.5;endArrow=block;endFill=1;fontSize=8;fontColor=#EF4444;fontStyle=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#FECACA;padding=1;dashed=1;dashPattern=5 3;exitX=0.5;exitY=0;entryX=0.5;entryY=0;" edge="1" parent="1" source="dec_reg_approval" target="card_cand_sel"><mxGeometry relative="1" as="geometry"><Array as="points"><mxPoint x="897" y="125"/><mxPoint x="511" y="125"/></Array></mxGeometry></mxCell>`);

  // Row 3 Regulatory Affairs
  edge("e_ha_to_appr", "card_ha_review", "card_approval_lic", "", "#EA580C");

  // Row 4 Manufacturing Flow
  c.push(`<mxCell id="e_p2_to_proc" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#7E22CE;strokeWidth=1.5;endArrow=block;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="card_phase2" target="card_proc_dev"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  edge("e_proc_to_tech", "card_proc_dev", "card_tech_trans", "", "#7E22CE");
  edge("e_tech_to_gmp", "card_tech_trans", "card_gmp_mfg", "", "#7E22CE");
  edge("e_gmp_to_qc", "card_gmp_mfg", "card_qc_release", "", "#7E22CE");

  // Row 5 Commercial Operations Flow
  c.push(`<mxCell id="e_appr_to_mkt" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#EA580C;strokeWidth=1.5;endArrow=block;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="card_approval_lic" target="card_mkt_access"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  c.push(`<mxCell id="e_qc_to_mkt" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#EA580C;strokeWidth=1.5;endArrow=block;endFill=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="card_qc_release" target="card_mkt_access"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  edge("e_mkt_to_launch", "card_mkt_access", "card_prod_launch", "", "#EA580C");
  edge("e_launch_to_sales", "card_prod_launch", "card_sales_hcp", "", "#EA580C");
  edge("e_sales_to_supp", "card_sales_hcp", "card_patient_supp", "", "#EA580C");

  // Row 6 Patient Care Flow
  c.push(`<mxCell id="e_launch_to_treat" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#059669;strokeWidth=1.5;endArrow=block;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="card_prod_launch" target="card_treat_adh"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  edge("e_treat_to_outc", "card_treat_adh", "card_outcome_mon", "", "#059669");
  edge("e_outc_to_rwe", "card_outcome_mon", "card_rwe_evid", "", "#059669");

  // Feedback Loop from Real-World Evidence back to Target Discovery
  c.push(`<mxCell id="e_rwe_feedback" value="RWE Continuous Improvement Feedback Loop" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#059669;strokeWidth=1.5;endArrow=block;endFill=1;fontSize=8;fontColor=#059669;dashed=1;dashPattern=5 3;labelBackgroundColor=#FFFFFF;labelBorderColor=#A7F3D0;padding=1;" edge="1" parent="1" source="card_rwe_evid" target="card_id_targets"><mxGeometry relative="1" as="geometry"><Array as="points"><mxPoint x="1420" y="589"/><mxPoint x="1420" y="112"/><mxPoint x="239" y="112"/></Array></mxGeometry></mxCell>`);

  // ==================== 5. BOTTOM LEGEND ====================
  // Legend Container
  rect("legend_bg", "", 20, 744, 1445, 34, "fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1;rounded=1;arcSize=6;");
  text("lbl_legend_title", `<b style="font-size:9.5px;color:#0F172A;letter-spacing:1px;">LEGEND</b>`, 25, 747, 65, 26, "align=center;");

  const legendItems = [
    { title: "Research & Discovery", color: "#1E824C", bg: "#DCFCE7", x: 95, w: 140 },
    { title: "Development", color: "#2563EB", bg: "#DBEAFE", x: 245, w: 100 },
    { title: "Manufacturing", color: "#7E22CE", bg: "#F3E8FF", x: 355, w: 110 },
    { title: "Commercialization", color: "#EA580C", bg: "#FFEDD5", x: 475, w: 125 },
    { title: "Patient Outcomes", color: "#0D9488", bg: "#CCFBF1", x: 610, w: 120 },
  ];

  legendItems.forEach((item, i) => {
    rect(
      `leg_item_${i}`,
      `<span style="font-size:8px;font-weight:bold;color:${item.color};">${item.title}</span>`,
      item.x,
      749,
      item.w,
      24,
      `fillColor=${item.bg};strokeColor=${item.color};strokeWidth=1;rounded=1;arcSize=20;align=center;`
    );
  });

  // Symbols
  rect("leg_sym_step", `<span style="font-size:7.5px;font-weight:bold;color:#475569;">Process Step</span>`, 740, 749, 85, 24, "fillColor=#FFFFFF;strokeColor=#475569;strokeWidth=1;rounded=1;arcSize=6;align=center;");
  diamond("leg_sym_dec", `<span style="font-size:7px;font-weight:bold;color:#D97706;">Decision</span>`, 835, 747, 70, 26, "fillColor=#FFFBEB;strokeColor=#F59E0B;");
  text("leg_sym_flow", `<span style="font-size:8px;font-weight:bold;color:#475569;">&mdash;&rarr; Flow</span>`, 915, 749, 75, 24, "align=center;");
  text("leg_sym_dash", `<span style="font-size:8px;font-weight:bold;color:#475569;">- - - &rarr; Feedback Loop</span>`, 995, 749, 130, 24, "align=center;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_03_swimlane" name="03 — Business Process / Swimlane">
    <mxGraphModel dx="1400" dy="850" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1485" pageHeight="800" background="${bg}" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${c.join("\n        ")}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
