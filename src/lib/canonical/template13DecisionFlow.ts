/**
 * Canonical Architecture Template 13: Decision Flow / Decision Tree
 * High-fidelity 16:9 reproduction for Autonomous Clinical Decision Rules & AI Policy Gates
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

  // 1. BRAND HEADER & METADATA
  rect("num_badge", "13", 20, 20, 48, 48, "fillColor=#1E3A8A;fontColor=#FFFFFF;fontSize=24;fontStyle=1;rounded=1;align=center;verticalAlign=middle;");
  rect("hdr_title", "<div style='font-size:22px;font-weight:800;color:#0F172A;letter-spacing:0.5px;'>Decision Flow / Decision Tree</div><div style='font-size:11px;color:#1E3A8A;font-weight:700;margin-top:2px;'>Use Case: NovaCura – Autonomous Clinical Trial Eligibility &amp; AI Safety Policy Gate | Environment: Production | Last Updated: May 8, 2025</div>", 78, 18, 900, 50, "strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");
  rect("hdr_brand", "<div style='text-align:right;'><span style='font-size:18px;font-weight:800;color:#1E3A8A;'>🧬 NOVACURA</span><br/><span style='font-size:9.5px;color:#64748B;font-style:italic;'>AI-Powered Regulatory Intelligence Platform</span></div>", 1180, 18, 350, 45, "strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

  // Objective Card
  rect("card_obj", "<div style='font-size:8px;font-weight:800;color:#1E3A8A;margin-bottom:4px;'>OBJECTIVE</div><div style='font-size:7.5px;line-height:1.5;color:#0F172A;'>Automate, standardize, and audit multi-stage clinical trial eligibility determination, genomic biomarker filtering, toxicity risk gates, and human-in-the-loop escalation paths with full 21 CFR Part 11 traceability.</div>", 1000, 18, 280, 50, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=6;");

  // 2. MAIN DECISION TREE STAGES (COLUMNS 1 TO 5)
  // Stage 1: Ingress
  rect("box_stg1", "", 20, 85, 170, 525, "fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=1.2;rounded=1;");
  rect("lbl_stg1", "<span style='font-size:8.5px;font-weight:800;color:#1E3A8A;'>❶ INGESTION &amp; EXTRACTION</span>", 20, 92, 170, 16, "strokeColor=none;fillColor=none;align=center;");
  rect("c_ehr", "<div style='font-size:7.2px;font-weight:700;'>🏥 Patient EHR Ingestion<br/><span style='font-size:5.5px;color:#64748B;'>(FHIR R4 / HL7)</span></div>", 30, 120, 150, 48, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("c_genomic", "<div style='font-size:7.2px;font-weight:700;'>🧬 FastQ / BAM Variants<br/><span style='font-size:5.5px;color:#64748B;'>(Genomic Biomarker Profile)</span></div>", 30, 180, 150, 48, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("c_protocol", "<div style='font-size:7.2px;font-weight:700;'>📑 Study Protocol Criteria<br/><span style='font-size:5.5px;color:#64748B;'>(Inclusion / Exclusion Rules)</span></div>", 30, 240, 150, 48, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");
  rect("c_docai", "<div style='font-size:7.2px;font-weight:700;'>🤖 Document AI Parser<br/><span style='font-size:5.5px;color:#64748B;'>(Clinical NLP Entity Extraction)</span></div>", 30, 300, 150, 48, "fillColor=#FFFFFF;strokeColor=#CBD5E1;rounded=1;align=center;");

  // Stage 2: Gate 1 (Inclusion Criteria)
  rect("box_stg2", "", 210, 85, 210, 525, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;");
  rect("lbl_stg2", "<span style='font-size:8.5px;font-weight:800;color:#1E3A8A;'>❷ INCLUSION CRITERIA GATE</span>", 210, 92, 210, 16, "strokeColor=none;fillColor=none;align=center;");
  rect("d_gate1", "<div style='font-size:7px;font-weight:800;color:#0F172A;text-align:center;'>Gate 1:<br/>Primary Inclusion<br/>Criteria Met?</div>", 260, 160, 110, 90, "shape=rhombus;fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=1.5;align=center;verticalAlign=middle;");
  rect("out_inelig1", "<div style='font-size:6.8px;font-weight:700;color:#DC2626;'>❌ Ineligible<br/><span style='font-size:5.5px;color:#64748B;'>Route to Alternate Registry &amp;<br/>Log Reason</span></div>", 230, 360, 170, 50, "fillColor=#FEE2E2;strokeColor=#DC2626;rounded=1;align=center;");

  edge(nid(), "", "c_docai", "d_gate1", "edgeStyle=orthogonalEdgeStyle;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endSize=4;");
  edge(nid(), "No (Failed)", "d_gate1", "out_inelig1", "edgeStyle=none;strokeColor=#DC2626;strokeWidth=1.5;endArrow=block;endSize=4;fontColor=#DC2626;fontStyle=1;fontSize=7.5;");

  // Stage 3: Gate 2 (Genomic & Biomarker Validation)
  rect("box_stg3", "", 440, 85, 220, 525, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;");
  rect("lbl_stg3", "<span style='font-size:8.5px;font-weight:800;color:#1E3A8A;'>❸ BIOMARKER &amp; GENOMIC GATE</span>", 440, 92, 220, 16, "strokeColor=none;fillColor=none;align=center;");
  rect("d_gate2", "<div style='font-size:7px;font-weight:800;color:#0F172A;text-align:center;'>Gate 2:<br/>Biomarker / Mutation<br/>Match Valid?</div>", 495, 160, 110, 90, "shape=rhombus;fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=1.5;align=center;verticalAlign=middle;");
  rect("out_seq2", "<div style='font-size:6.8px;font-weight:700;color:#D97706;'>⚠️ Re-Sequencing<br/><span style='font-size:5.5px;color:#64748B;'>Trigger High-Depth Panel<br/>or NGS Validation</span></div>", 465, 360, 170, 50, "fillColor=#FEF3C7;strokeColor=#D97706;rounded=1;align=center;");

  edge(nid(), "Yes (Passed)", "d_gate1", "d_gate2", "edgeStyle=none;strokeColor=#16A34A;strokeWidth=1.5;endArrow=block;endSize=4;fontColor=#16A34A;fontStyle=1;fontSize=7.5;");
  edge(nid(), "No (Unmatched)", "d_gate2", "out_seq2", "edgeStyle=none;strokeColor=#D97706;strokeWidth=1.5;endArrow=block;endSize=4;fontColor=#D97706;fontStyle=1;fontSize=7.5;");

  // Stage 4: Gate 3 (Toxicity & DDI Risk Analysis)
  rect("box_stg4", "", 680, 85, 230, 525, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;");
  rect("lbl_stg4", "<span style='font-size:8.5px;font-weight:800;color:#1E3A8A;'>❹ TOXICITY &amp; DDI SAFETY GATE</span>", 680, 92, 230, 16, "strokeColor=none;fillColor=none;align=center;");
  rect("d_gate3", "<div style='font-size:7px;font-weight:800;color:#0F172A;text-align:center;'>Gate 3:<br/>DDI / Toxicity Risk<br/>Acceptable?</div>", 740, 160, 110, 90, "shape=rhombus;fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=1.5;align=center;verticalAlign=middle;");
  rect("out_tox3", "<div style='font-size:6.8px;font-weight:700;color:#DC2626;'>🛑 Safety Escalation<br/><span style='font-size:5.5px;color:#64748B;'>Clinical Safety Advisory<br/>&amp; Pharmacist Review</span></div>", 710, 360, 170, 50, "fillColor=#FEE2E2;strokeColor=#DC2626;rounded=1;align=center;");

  edge(nid(), "Yes (Match)", "d_gate2", "d_gate3", "edgeStyle=none;strokeColor=#16A34A;strokeWidth=1.5;endArrow=block;endSize=4;fontColor=#16A34A;fontStyle=1;fontSize=7.5;");
  edge(nid(), "High Risk (DDI)", "d_gate3", "out_tox3", "edgeStyle=none;strokeColor=#DC2626;strokeWidth=1.5;endArrow=block;endSize=4;fontColor=#DC2626;fontStyle=1;fontSize=7.5;");

  // Stage 5: Gate 4 (AI Confidence & HITL Routing)
  rect("box_stg5", "", 930, 85, 345, 525, "fillColor=#FAF5FF;strokeColor=#7C3AED;strokeWidth=1.2;rounded=1;");
  rect("lbl_stg5", "<span style='font-size:8.5px;font-weight:800;color:#7C3AED;'>❺ AI CONFIDENCE &amp; FINAL DISPOSITION</span>", 930, 92, 345, 16, "strokeColor=none;fillColor=none;align=center;");
  rect("d_gate4", "<div style='font-size:7px;font-weight:800;color:#0F172A;text-align:center;'>Gate 4:<br/>AI Confidence<br/>Score ≥ 0.95?</div>", 1045, 160, 115, 90, "shape=rhombus;fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=1.5;align=center;verticalAlign=middle;");

  // Final Terminal Outcomes
  rect("out_approve", "<div style='font-size:7.5px;font-weight:800;color:#16A34A;'>🎉 Cohort Enrollment Confirmed<br/><span style='font-size:6px;color:#0F172A;font-weight:600;'>Auto-Approved | 21 CFR Part 11 Electronic Signature Generated</span></div>", 955, 290, 295, 50, "fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=1.5;rounded=1;align=center;");
  rect("out_hitl", "<div style='font-size:7.5px;font-weight:800;color:#7C3AED;'>👥 HITL Medical Board Review<br/><span style='font-size:6px;color:#0F172A;font-weight:600;'>Escalated to Principal Investigator &amp; Oncologist Cockpit</span></div>", 955, 370, 295, 50, "fillColor=#FAF5FF;strokeColor=#7C3AED;strokeWidth=1.5;rounded=1;align=center;");
  rect("out_audit", "<div style='font-size:7.2px;font-weight:700;color:#0F172A;'>📑 Immutable Audit Ledger<br/><span style='font-size:6px;color:#64748B;'>BigQuery + Cloud Audit Logs (400-day GxP Retention)</span></div>", 955, 450, 295, 45, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;");

  edge(nid(), "Low Risk", "d_gate3", "d_gate4", "edgeStyle=none;strokeColor=#16A34A;strokeWidth=1.5;endArrow=block;endSize=4;fontColor=#16A34A;fontStyle=1;fontSize=7.5;");
  edge(nid(), "Score ≥ 0.95 (High)", "d_gate4", "out_approve", "edgeStyle=none;strokeColor=#16A34A;strokeWidth=1.5;endArrow=block;endSize=4;fontColor=#16A34A;fontStyle=1;fontSize=7.5;");
  edge(nid(), "Score &lt; 0.95 (Low/Med)", "d_gate4", "out_hitl", "edgeStyle=orthogonalEdgeStyle;strokeColor=#7C3AED;strokeWidth=1.5;dashed=1;dashPattern=4 4;endArrow=block;endSize=4;fontColor=#7C3AED;fontStyle=1;fontSize=7.5;", [{x: 1260, y: 205}, {x: 1260, y: 395}]);
  edge(nid(), "", "out_approve", "out_audit", "edgeStyle=none;strokeColor=#64748B;strokeWidth=1.2;dashed=1;dashPattern=3 3;endArrow=block;endSize=3;");
  edge(nid(), "", "out_hitl", "out_audit", "edgeStyle=none;strokeColor=#64748B;strokeWidth=1.2;dashed=1;dashPattern=3 3;endArrow=block;endSize=3;");

  // 3. BOTTOM ROW: 4 ANALYTICAL PANELS
  rect("bot_p1", "<div style='font-size:8px;font-weight:800;color:#1E3A8A;margin-bottom:6px;'>DECISION LOGIC CRITERIA</div>" +
    "<div style='font-size:7px;line-height:1.6;color:#0F172A;'>" +
    "• <b>Inclusion Rules:</b> Age ≥ 18, ECOG 0-1, Confirmed Solid Tumor<br/>" +
    "• <b>Genomic Rules:</b> HER2+, BRCA1/2, EGFR exon 19/21 mutations<br/>" +
    "• <b>Toxicity Filter:</b> Cytochrome P450 DDI risk &lt; Tier 2 threshold<br/>" +
    "• <b>Confidence Metric:</b> Calibrated probabilistic ensemble score" +
    "</div>", 20, 630, 290, 140, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=6;");

  rect("bot_p2", "<div style='font-size:8px;font-weight:800;color:#16A34A;margin-bottom:6px;'>GOVERNANCE &amp; AUDIT GATES</div>" +
    "<div style='font-size:7px;line-height:1.6;color:#0F172A;'>" +
    "✔ <b>FDA 21 CFR Part 11:</b> Dual-electronic cryptographic signatures<br/>" +
    "✔ <b>HITL Escalation:</b> Mandatory oncologist review on borderline score<br/>" +
    "✔ <b>Lineage Tracking:</b> Input clinical record hash bound to decision<br/>" +
    "✔ <b>Audit Retention:</b> 400-day immutable WORM storage in GCS" +
    "</div>", 320, 630, 310, 140, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=6;");

  rect("bot_p3", "<div style='font-size:8px;font-weight:800;color:#7C3AED;margin-bottom:6px;'>TECHNOLOGIES</div>" +
    "<div style='font-size:6.8px;line-height:1.6;color:#0F172A;'>" +
    "🧠 <b>Gemini 2.5 Pro ReAct:</b> Multi-step clinical reasoning<br/>" +
    "🛡️ <b>Vertex AI Model Armor:</b> Clinical prompt &amp; safety shields<br/>" +
    "⚡ <b>Cloud Rules Engine:</b> Deterministic rule evaluation (&lt;50ms)<br/>" +
    "📊 <b>BigQuery Feature Store:</b> Patient biomarker historical vectors<br/>" +
    "📑 <b>Cloud Audit Logs:</b> Tamper-proof compliance ledger" +
    "</div>", 640, 630, 320, 140, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=6;");

  rect("bot_p4", "<div style='font-size:8px;font-weight:800;color:#1E3A8A;margin-bottom:6px;'>NOTES &amp; SLAS</div>" +
    "<div style='font-size:7px;line-height:1.6;color:#0F172A;'>" +
    "• <b>Decision Latency:</b> p99 &lt; 250ms for automated rule paths.<br/>" +
    "• <b>Explainability:</b> Every decision outputs cited clinical rationale.<br/>" +
    "• <b>Fallback:</b> Any API outage routes traffic to manual triage.<br/>" +
    "• <b>Compliance:</b> ISO/IEC 42001 AI Management &amp; HIPAA BAA." +
    "</div>", 970, 630, 310, 140, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;align=left;verticalAlign=top;padding=6;");

  // Footer Metadata
  rect("footer_version", "<span style='font-size:9px;color:#64748B;font-weight:600;'>Version: 1.0</span>", 20, 780, 200, 18, "strokeColor=none;fillColor=none;align=left;");
  rect("footer_date", "<span style='font-size:9px;color:#64748B;font-weight:600;'>Date: May 2024</span>", 1145, 780, 135, 18, "strokeColor=none;fillColor=none;align=right;");

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
