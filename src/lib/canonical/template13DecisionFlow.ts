/**
 * Canonical Architecture Template 13: Decision Flow / Decision Tree
 * High-fidelity 16:9 full-width reproduction for Autonomous Clinical Decision Rules & AI Policy Gates
 */

export function generateTemplate13DecisionFlowXml(
  flavor: string = "biopharma",
  theme: "dark" | "light" = "light"
): string {
  const isDark = theme === "dark";
  const E = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
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

  // 1. BRAND HEADER & METADATA (Full 1540px width)
  rect("num_badge", "13", 20, 20, 48, 48, "fillColor=#1E3A8A;fontColor=#FFFFFF;fontSize=24;fontStyle=1;rounded=1;align=center;verticalAlign=middle;");
  rect("hdr_title", "<div style='font-size:22px;font-weight:800;color:#0F172A;letter-spacing:0.5px;'>Decision Flow / Decision Tree</div><div style='font-size:11px;color:#1E3A8A;font-weight:700;margin-top:2px;'>Use Case: NovaCura – Autonomous Clinical Trial Eligibility &amp; AI Safety Policy Gate | Environment: Production | Last Updated: May 8, 2025</div>", 78, 18, 900, 50, "strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  
  // Right Objective Block
  rect("card_obj", "<div style='font-size:8px;font-weight:800;color:#1E3A8A;margin-bottom:3px;'>DECISION ENGINE OBJECTIVE</div><div style='font-size:7.2px;line-height:1.4;color:#0F172A;'>Automate, standardize, and audit multi-stage clinical trial eligibility determination, genomic biomarker filtering, toxicity risk gates, and human-in-the-loop escalation paths with full 21 CFR Part 11 traceability.</div>", 1000, 16, 260, 54, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=6;");
  
  rect("hdr_brand", "<div style='text-align:right;'><span style='font-size:18px;font-weight:800;color:#1E3A8A;'>🧬 NOVACURA</span><br/><span style='font-size:9.5px;color:#64748B;font-style:italic;'>Transforming Therapies. Improving Lives.</span></div>", 1270, 18, 290, 45, "strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

  // 2. MAIN DECISION TREE STAGES (COLUMNS 1 TO 6 SPANNING 20px to 1560px)
  
  // Column 1: Ingestion & Clinical Input Extraction (x=20..220, w=200)
  rect("box_stg1", "", 20, 85, 200, 525, "fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=1.2;rounded=1;");
  rect("lbl_stg1", "<span style='font-size:8.5px;font-weight:800;color:#1E3A8A;'>❶ INGESTION &amp; EXTRACTION</span>", 20, 92, 200, 16, "strokeColor=none;fillColor=none;align=center;");
  rect("c_ehr", "<div style='font-size:7.5px;font-weight:700;'>🏥 Patient EHR Ingestion<br/><span style='font-size:6px;color:#64748B;'>FHIR R4 / HL7 Clinical Feeds</span></div>", 30, 125, 180, 55, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("c_genomic", "<div style='font-size:7.5px;font-weight:700;'>🧬 FastQ / BAM Variants<br/><span style='font-size:6px;color:#64748B;'>High-Depth NGS Biomarkers</span></div>", 30, 195, 180, 55, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("c_protocol", "<div style='font-size:7.5px;font-weight:700;'>📑 Study Protocol Specs<br/><span style='font-size:6px;color:#64748B;'>Inclusion / Exclusion Rules</span></div>", 30, 265, 180, 55, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("c_labs", "<div style='font-size:7.5px;font-weight:700;'>🧪 Prior Labs &amp; Meds<br/><span style='font-size:6px;color:#64748B;'>eGFR, ALT/AST, QT Intervals</span></div>", 30, 335, 180, 55, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("c_docai", "<div style='font-size:7.5px;font-weight:700;'>🤖 Document AI Parser<br/><span style='font-size:6px;color:#64748B;'>Clinical NLP Entity Extraction</span></div>", 30, 405, 180, 55, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("c_val_chk", "<div style='font-size:7.2px;font-weight:700;color:#16A34A;'>✔ Schema &amp; PHI Sanitization<br/><span style='font-size:5.5px;color:#64748B;'>HIPAA Safe Harbor De-ID</span></div>", 30, 480, 180, 42, "fillColor=#DCFCE7;strokeColor=#16A34A;rounded=1;align=center;");

  // Column 2: Gate 1 (Primary Inclusion / Exclusion) (x=235..485, w=250)
  rect("box_stg2", "", 235, 85, 250, 525, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;");
  rect("lbl_stg2", "<span style='font-size:8.5px;font-weight:800;color:#1E3A8A;'>❷ INCLUSION CRITERIA GATE</span>", 235, 92, 250, 16, "strokeColor=none;fillColor=none;align=center;");
  rect("d_gate1", "<div style='font-size:7.5px;font-weight:800;color:#0F172A;text-align:center;'>Gate 1:<br/>Primary Inclusion<br/>Criteria Met?</div>", 295, 135, 130, 95, "shape=rhombus;fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=1.5;align=center;verticalAlign=middle;");
  rect("out_inelig1", "<div style='font-size:7.2px;font-weight:700;color:#DC2626;'>❌ Ineligible Disposition<br/><span style='font-size:5.8px;color:#0F172A;'>Route to Observational Registry &amp;<br/>Log Exclusion Reason Code</span></div>", 250, 275, 220, 55, "fillColor=#FEE2E2;strokeColor=#DC2626;rounded=1;align=center;");
  rect("g1_criteria", "<div style='font-size:6.8px;line-height:1.4;color:#0F172A;'><b>Rules Evaluated:</b><br/>• Age ≥ 18 years<br/>• ECOG Performance: 0 – 1<br/>• Confirmed Solid Tumor<br/>• Measurable Disease (RECIST 1.1)</div>", 250, 360, 220, 75, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=6;");

  edge(nid(), "", "c_ehr", "d_gate1", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endSize=4;");
  edge(nid(), "No (Failed)", "d_gate1", "out_inelig1", "edgeStyle=none;strokeColor=#DC2626;strokeWidth=1.5;endArrow=block;endSize=4;fontColor=#DC2626;fontStyle=1;fontSize=7.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#DC2626;padding=2.5;");

  // Column 3: Gate 2 (Genomic & Biomarker Validation) (x=500..750, w=250)
  rect("box_stg3", "", 500, 85, 250, 525, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;");
  rect("lbl_stg3", "<span style='font-size:8.5px;font-weight:800;color:#1E3A8A;'>❸ BIOMARKER &amp; GENOMIC GATE</span>", 500, 92, 250, 16, "strokeColor=none;fillColor=none;align=center;");
  rect("d_gate2", "<div style='font-size:7.5px;font-weight:800;color:#0F172A;text-align:center;'>Gate 2:<br/>Actionable Variant<br/>Match Valid?</div>", 560, 135, 130, 95, "shape=rhombus;fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=1.5;align=center;verticalAlign=middle;");
  rect("out_seq2", "<div style='font-size:7.2px;font-weight:700;color:#D97706;'>⚠️ High-Depth Re-Sequencing<br/><span style='font-size:5.8px;color:#0F172A;'>Trigger 500-Gene Pan-Cancer Panel<br/>or Basket Trial Matching Engine</span></div>", 515, 275, 220, 55, "fillColor=#FEF3C7;strokeColor=#D97706;rounded=1;align=center;");
  rect("g2_criteria", "<div style='font-size:6.8px;line-height:1.4;color:#0F172A;'><b>Biomarkers Tested:</b><br/>• HER2+ Overexpression (IHC 3+)<br/>• BRCA1 / BRCA2 Pathogenic<br/>• EGFR Exon 19/21 Deletions<br/>• PD-L1 TPS ≥ 50% / MSI-H</div>", 515, 360, 220, 75, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=6;");

  edge(nid(), "Yes (Passed)", "d_gate1", "d_gate2", "edgeStyle=none;strokeColor=#16A34A;strokeWidth=1.5;endArrow=block;endSize=4;fontColor=#16A34A;fontStyle=1;fontSize=7.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#16A34A;padding=2.5;");
  edge(nid(), "No (Unmatched)", "d_gate2", "out_seq2", "edgeStyle=none;strokeColor=#D97706;strokeWidth=1.5;endArrow=block;endSize=4;fontColor=#D97706;fontStyle=1;fontSize=7.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#D97706;padding=2.5;");

  // Column 4: Gate 3 (Toxicity & Pharmacogenomic DDI Gate) (x=765..1015, w=250)
  rect("box_stg4", "", 765, 85, 250, 525, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;");
  rect("lbl_stg4", "<span style='font-size:8.5px;font-weight:800;color:#1E3A8A;'>❹ TOXICITY &amp; DDI SAFETY GATE</span>", 765, 92, 250, 16, "strokeColor=none;fillColor=none;align=center;");
  rect("d_gate3", "<div style='font-size:7.5px;font-weight:800;color:#0F172A;text-align:center;'>Gate 3:<br/>DDI / Toxicity Risk<br/>Acceptable?</div>", 825, 135, 130, 95, "shape=rhombus;fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=1.5;align=center;verticalAlign=middle;");
  rect("out_tox3", "<div style='font-size:7.2px;font-weight:700;color:#DC2626;'>🛑 Safety Alert &amp; Intercept<br/><span style='font-size:5.8px;color:#0F172A;'>Escalate to Clinical Pharmacologist<br/>&amp; Drug Safety Committee</span></div>", 780, 275, 220, 55, "fillColor=#FEE2E2;strokeColor=#DC2626;rounded=1;align=center;");
  rect("g3_criteria", "<div style='font-size:6.8px;line-height:1.4;color:#0F172A;'><b>Safety Checks:</b><br/>• CYP450 DDI Inhibition Matrix<br/>• Hepatic Clearance: ALT/AST &lt; 2.5x<br/>• Renal Clearance: eGFR ≥ 60<br/>• QTcF Interval &lt; 470 ms</div>", 780, 360, 220, 75, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=6;");

  edge(nid(), "Yes (Match)", "d_gate2", "d_gate3", "edgeStyle=none;strokeColor=#16A34A;strokeWidth=1.5;endArrow=block;endSize=4;fontColor=#16A34A;fontStyle=1;fontSize=7.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#16A34A;padding=2.5;");
  edge(nid(), "High Risk (DDI)", "d_gate3", "out_tox3", "edgeStyle=none;strokeColor=#DC2626;strokeWidth=1.5;endArrow=block;endSize=4;fontColor=#DC2626;fontStyle=1;fontSize=7.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#DC2626;padding=2.5;");

  // Column 5: Gate 4 (AI Confidence & Safety Policy Gate) (x=1030..1285, w=255)
  rect("box_stg5", "", 1030, 85, 255, 525, "fillColor=#FAF5FF;strokeColor=#7C3AED;strokeWidth=1.2;rounded=1;");
  rect("lbl_stg5", "<span style='font-size:8.5px;font-weight:800;color:#7C3AED;'>❺ AI CONFIDENCE &amp; POLICY GATE</span>", 1030, 92, 255, 16, "strokeColor=none;fillColor=none;align=center;");
  rect("d_gate4", "<div style='font-size:7.5px;font-weight:800;color:#0F172A;text-align:center;'>Gate 4:<br/>AI Confidence<br/>Score S ≥ 0.92?</div>", 1092, 135, 130, 95, "shape=rhombus;fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=1.5;align=center;verticalAlign=middle;");
  rect("out_hitl_mid", "<div style='font-size:7.2px;font-weight:700;color:#7C3AED;'>👥 HITL Medical Review<br/><span style='font-size:5.8px;color:#0F172A;'>Score S &lt; 0.92: Escalate to<br/>Principal Investigator Cockpit</span></div>", 1048, 275, 220, 55, "fillColor=#FAF5FF;strokeColor=#7C3AED;rounded=1;align=center;");
  rect("g4_criteria", "<div style='font-size:6.8px;line-height:1.4;color:#0F172A;'><b>AI Guardrail Engine:</b><br/>• Gemini 2.5 Pro ReAct reasoning<br/>• Model Armor Hallucination Shield<br/>• Triad Faithfulness Index &gt; 0.98<br/>• Confidence Metric S: [0.00 – 1.00]</div>", 1048, 360, 220, 75, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=6;");

  edge(nid(), "Low Risk", "d_gate3", "d_gate4", "edgeStyle=none;strokeColor=#16A34A;strokeWidth=1.5;endArrow=block;endSize=4;fontColor=#16A34A;fontStyle=1;fontSize=7.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#16A34A;padding=2.5;");
  edge(nid(), "Score S &lt; 0.92", "d_gate4", "out_hitl_mid", "edgeStyle=none;strokeColor=#7C3AED;strokeWidth=1.5;dashed=1;dashPattern=4 4;endArrow=block;endSize=4;fontColor=#7C3AED;fontStyle=1;fontSize=7.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#7C3AED;padding=2.5;");

  // Column 6: Right Terminal Dispositions & 21 CFR Part 11 Audit (x=1300..1560, w=260)
  rect("box_stg6", "", 1300, 85, 260, 525, "fillColor=#F8FAFC;strokeColor=#0F172A;strokeWidth=1.2;rounded=1;");
  rect("lbl_stg6", "<span style='font-size:8.5px;font-weight:800;color:#0F172A;'>❻ TERMINAL AUDIT &amp; DISPOSITION</span>", 1300, 92, 260, 16, "strokeColor=none;fillColor=none;align=center;");

  rect("out_approve_final", "<div style='font-size:7.8px;font-weight:800;color:#16A34A;'>🎉 Cohort Enrollment Confirmed<br/><span style='font-size:6.2px;color:#0F172A;font-weight:600;'>Auto-Approved | Protocol Signed<br/>SHA-256 e-Signature Generated</span></div>", 1312, 140, 236, 68, "fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=1.5;rounded=1;align=center;");
  rect("out_hitl_final", "<div style='font-size:7.8px;font-weight:800;color:#7C3AED;'>📋 Multidisciplinary Tumor Board<br/><span style='font-size:6.2px;color:#0F172A;font-weight:600;'>Oncologist Dual-Signoff Cockpit<br/>Review Queue: SLA ≤ 4 hours</span></div>", 1312, 235, 236, 68, "fillColor=#FAF5FF;strokeColor=#7C3AED;strokeWidth=1.5;rounded=1;align=center;");
  rect("out_audit_final", "<div style='font-size:7.8px;font-weight:800;color:#1E3A8A;'>📑 Immutable Audit Ledger<br/><span style='font-size:6.2px;color:#0F172A;font-weight:600;'>BigQuery GxP Sink + Cloud KMS<br/>400-Day WORM Retention Enforced</span></div>", 1312, 330, 236, 68, "fillColor=#EFF6FF;strokeColor=#1E3A8A;strokeWidth=1.5;rounded=1;align=center;");
  rect("out_metrics", "<div style='font-size:7px;line-height:1.5;color:#0F172A;'><b>Real-Time Decision Telemetry:</b><br/>• Auto-Approval Rate: <b>78.4%</b><br/>• HITL Escalation Rate: <b>14.2%</b><br/>• Rule Exclusion Rate: <b>7.4%</b><br/>• Decision Latency: <b>142 ms</b></div>", 1312, 425, 236, 80, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=left;verticalAlign=top;padding=6;");

  edge(nid(), "Score S ≥ 0.92", "d_gate4", "out_approve_final", "edgeStyle=none;strokeColor=#16A34A;strokeWidth=1.5;endArrow=block;endSize=4;fontColor=#16A34A;fontStyle=1;fontSize=7.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#16A34A;padding=2.5;");
  edge(nid(), "", "out_hitl_mid", "out_hitl_final", "edgeStyle=orthogonalEdgeStyle;strokeColor=#7C3AED;strokeWidth=1.5;dashed=1;dashPattern=4 4;endArrow=block;endSize=4;");
  edge(nid(), "", "out_approve_final", "out_audit_final", "edgeStyle=orthogonalEdgeStyle;strokeColor=#16A34A;strokeWidth=1.2;dashed=1;dashPattern=3 3;endArrow=block;endSize=3;");
  edge(nid(), "", "out_hitl_final", "out_audit_final", "edgeStyle=none;strokeColor=#7C3AED;strokeWidth=1.2;dashed=1;dashPattern=3 3;endArrow=block;endSize=3;");

  // 3. BOTTOM ROW: 4 WIDE ANALYTICAL PANELS (SPANS 20px to 1560px)
  rect("bot_p1", "<div style='font-size:8.5px;font-weight:800;color:#1E3A8A;margin-bottom:6px;'>DECISION LOGIC &amp; ELIGIBILITY CRITERIA</div>" +
    "<div style='font-size:7px;line-height:1.6;color:#0F172A;'>" +
    "• <b>Primary Eligibility Rules:</b> Age ≥ 18, ECOG 0-1, Confirmed Solid Tumor, RECIST 1.1 measurable lesion.<br/>" +
    "• <b>Genomic Variant Matching:</b> HER2+ (IHC 3+), BRCA1/2 pathogenic mutations, EGFR exon 19/21 deletions.<br/>" +
    "• <b>Exclusion Triggers:</b> Central nervous system active metastases, uncontrolled cardiovascular disease.<br/>" +
    "• <b>Mathematical Formulation:</b> Decision score $S = \sum w_i \cdot C_i$ calibrated against clinical registry ground truth." +
    "</div>", 20, 630, 370, 140, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=8;");

  rect("bot_p2", "<div style='font-size:8.5px;font-weight:800;color:#16A34A;margin-bottom:6px;'>PHARMACOGENOMIC SAFETY &amp; DDI POLICIES</div>" +
    "<div style='font-size:7px;line-height:1.6;color:#0F172A;'>" +
    "✔ <b>CYP450 Enzyme Clearance:</b> Real-time check of CYP3A4, CYP2D6, CYP2C19 substrate &amp; inhibitor interactions.<br/>" +
    "✔ <b>Organ Function Thresholds:</b> eGFR ≥ 60 mL/min/1.73m², Total Bilirubin ≤ 1.5x ULN, ALT/AST ≤ 2.5x ULN.<br/>" +
    "✔ <b>Cardiac Safety:</b> Automated ECG QTcF interval analysis with hard cutoff at 470 ms.<br/>" +
    "✔ <b>Pharmacist Intercept:</b> Automated routing to Clinical Pharmacology Board on Tier 2+ drug interaction." +
    "</div>", 400, 630, 380, 140, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=8;");

  rect("bot_p3", "<div style='font-size:8.5px;font-weight:800;color:#7C3AED;margin-bottom:6px;'>GOVERNANCE, AUDIT &amp; REGULATORY COMPLIANCE</div>" +
    "<div style='font-size:7px;line-height:1.6;color:#0F172A;'>" +
    "🛡️ <b>FDA 21 CFR Part 11:</b> Cryptographic SHA-256 e-signatures binding decision, input payload, and timestamp.<br/>" +
    "⚖️ <b>HITL Medical Oversight:</b> Mandatory oncologist review on borderline score ($S &lt; 0.92$) or high-risk variant.<br/>" +
    "🔒 <b>Audit Immutability:</b> 400-day WORM object locking in GCS and partitioned BigQuery compliance tables.<br/>" +
    "📑 <b>Explainability:</b> Decision engine automatically compiles citations to published FDA package inserts &amp; NCCN." +
    "</div>", 790, 630, 380, 140, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=8;");

  rect("bot_p4", "<div style='font-size:8.5px;font-weight:800;color:#1E3A8A;margin-bottom:6px;'>AI TECHNOLOGIES &amp; SLA TARGETS</div>" +
    "<div style='font-size:7px;line-height:1.6;color:#0F172A;'>" +
    "⚡ <b>Engine Stack:</b> Gemini 2.5 Pro ReAct + Vertex AI Model Armor + Cloud Rules Engine + Spanner Graph.<br/>" +
    "⏱️ <b>Decision Latency:</b> p95 ≤ 180 ms for automated paths; p99 ≤ 350 ms for complex multi-omic RAG queries.<br/>" +
    "🎯 <b>Accuracy &amp; Consistency:</b> 99.98% deterministic rule execution with zero hallucinations on ground-truth evals.<br/>" +
    "🌐 <b>Availability SLA:</b> 99.99% multi-region active-active deployment across Google Cloud Platform." +
    "</div>", 1180, 630, 380, 140, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=8;");

  // Footer Metadata
  rect("footer_version", "<span style='font-size:9px;color:#64748B;font-weight:600;'>Version: 1.0</span>", 20, 780, 200, 18, "strokeColor=none;fillColor=none;align=left;");
  rect("footer_date", "<span style='font-size:9px;color:#64748B;font-weight:600;'>Date: May 2024</span>", 1425, 780, 135, 18, "strokeColor=none;fillColor=none;align=right;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_13_decision_flow" name="Template 13: Decision Flow / Decision Tree">
    <mxGraphModel dx="1600" dy="1000" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="1000" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${c.join("\n        ")}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
