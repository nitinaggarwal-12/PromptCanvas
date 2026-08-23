/**
 * 🏛️ CANONICAL MASTER BLUEPRINT 13 — DECISION FLOW / DECISION TREE
 * 
 * 1:1 Ground-Truth Master Reproduction of media_1787511500894.jpg
 * "NovaCura Bio-Pharma Platform — Decision Flow / Tree Diagram"
 * "Decisioning for medical, clinical, regulatory, safety, and quality workflows"
 * 
 * Includes:
 * - Left Panels: WHO INITIATES? & ENTERPRISE SOURCE SYSTEMS (Controlled & Governed)
 * - Numbered Step Sequence 0 through 8:
 *   - 0: User Request / Event
 *   - 1: Request Type? (Medical Information, Clinical Trial, Regulatory, Safety, Quality, Commercial Analytics)
 *   - 2: Contains regulated or sensitive data? (Cloud DLP / IAM checks)
 *   - 3: Need enterprise knowledge grounding? (RAG & Knowledge Retrieval Pipeline with 6 sources -> GCS -> BQ -> Vector -> Vertex AI)
 *   - 4: Action Type? (Answer Question, Summarize Content, Draft Document, Create Task/Ticket, Trigger Downstream Workflow)
 *   - 5: Risk Tier? (Low [Automated], Medium [Business Reviewer], High [Human Approval + Evidence Pack])
 *   - 6: Grounding & confidence threshold met? (Human Expert Review / Escalate)
 *   - 7: GxP / submission / safety-critical? (HITL Approval -> Versioned Output -> Electronic Signature / Audit Trail)
 *   - 8: Final Dispositions (Response, Regulatory Draft, Safety Case, QMS Task, Clinical Workflow, Analytics Insight) + End/Outcome Logged & Audited
 * - Right Panels: GOVERNANCE RULES, DECISION OUTCOMES, KPIs
 * - Bottom Panels: NOVACURA PLATFORM SERVICES (Google Cloud) & LEGEND
 * 
 * Resolution: 1600x1000px (16:9 Standard Master Geometry)
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
    const labelStyle = val ? `fontColor=#0F172A;fontStyle=1;fontSize=7.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=2;` : "";
    c.push(
      `<mxCell id="${id}" value="${E(val)}" edge="1" parent="1" source="${src}" target="${tgt}" style="rounded=1;html=1;${labelStyle}${style}">` +
      `<mxGeometry relative="1" as="geometry">${ptsXml}</mxGeometry>` +
      `</mxCell>`
    );
  };

  // =========================================================================
  // 1. MASTER HEADER & TOP-RIGHT BRAND BLOCK
  // =========================================================================
  // Top Left: NOVACURA Logo Block
  rect("logo_box", "<div style='font-family:Inter,sans-serif;text-align:left;line-height:1.1;'>" +
    "<div style='font-size:18px;font-weight:900;color:#0F2A4A;display:flex;align-items:center;gap:6px;'><span style='color:#1E40AF;font-size:22px;'>🧬</span> NOVACURA</div>" +
    "<div style='font-size:7.5px;font-weight:800;color:#475569;letter-spacing:1px;margin-top:2px;'>BIO-PHARMA INTELLIGENCE</div>" +
    "</div>", 20, 14, 180, 45, "strokeColor=none;fillColor=none;align=left;verticalAlign=middle;");

  // Center Main Title & Subtitle
  rect("hdr_title", "<div style='font-family:Inter,sans-serif;text-align:center;line-height:1.2;'>" +
    "<div style='font-size:21px;font-weight:900;color:#0F172A;letter-spacing:0.3px;'>NovaCura Bio-Pharma Platform — Decision Flow / Tree Diagram</div>" +
    "<div style='font-size:11px;font-style:italic;color:#1E3A8A;font-weight:600;margin-top:3px;'>Decisioning for medical, clinical, regulatory, safety, and quality workflows</div>" +
    "</div>", 220, 12, 1060, 48, "strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // Top Right: Google Cloud Platform Badge
  rect("hdr_gcp", "<div style='font-family:Inter,sans-serif;text-align:right;line-height:1.2;'>" +
    "<div style='font-size:14px;font-weight:800;color:#4285F4;display:flex;align-items:center;justify-content:flex-end;gap:5px;'>☁️ Google Cloud</div>" +
    "<div style='font-size:8px;color:#64748B;font-weight:600;'>Running on Google Cloud</div>" +
    "</div>", 1330, 14, 250, 45, "strokeColor=none;fillColor=none;align=right;verticalAlign=middle;");

  // =========================================================================
  // 2. LEFT SIDEBAR (x=20..185, w=165)
  // =========================================================================
  
  // Card 1: WHO INITIATES?
  rect("box_who", "", 20, 72, 165, 205, "fillColor=#FFFFFF;strokeColor=#1E3A8A;strokeWidth=1.5;rounded=1;");
  rect("lbl_who", "<span style='font-size:9px;font-weight:900;color:#FFFFFF;letter-spacing:0.5px;'>WHO INITIATES?</span>", 20, 72, 165, 22, "fillColor=#0F2A4A;strokeColor=#0F2A4A;rounded=0;align=center;verticalAlign=middle;");
  rect("who_sci", "<div style='font-size:7.5px;font-weight:700;color:#0F172A;'>🔬 Research Scientist</div>", 26, 100, 153, 28, "fillColor=#F8FAFC;strokeColor=#E2E8F0;rounded=1;align=left;verticalAlign=middle;spacingLeft=8;");
  rect("who_clin", "<div style='font-size:7.5px;font-weight:700;color:#0F172A;'>👩‍⚕️ Clinical Operations</div>", 26, 134, 153, 28, "fillColor=#F8FAFC;strokeColor=#E2E8F0;rounded=1;align=left;verticalAlign=middle;spacingLeft=8;");
  rect("who_reg", "<div style='font-size:7.5px;font-weight:700;color:#0F172A;'>📑 Regulatory Affairs</div>", 26, 168, 153, 28, "fillColor=#F8FAFC;strokeColor=#E2E8F0;rounded=1;align=left;verticalAlign=middle;spacingLeft=8;");
  rect("who_pv", "<div style='font-size:7.5px;font-weight:700;color:#0F172A;'>🛡️ Pharmacovigilance</div>", 26, 202, 153, 28, "fillColor=#F8FAFC;strokeColor=#E2E8F0;rounded=1;align=left;verticalAlign=middle;spacingLeft=8;");
  rect("who_qual", "<div style='font-size:7.5px;font-weight:700;color:#0F172A;'>✔ Quality</div>", 26, 236, 153, 28, "fillColor=#F8FAFC;strokeColor=#E2E8F0;rounded=1;align=left;verticalAlign=middle;spacingLeft=8;");

  // Card 2: ENTERPRISE SOURCE SYSTEMS (Controlled & Governed)
  rect("box_sources", "", 20, 290, 165, 320, "fillColor=#FFFFFF;strokeColor=#1E3A8A;strokeWidth=1.5;rounded=1;");
  rect("lbl_sources", "<div style='font-size:8px;font-weight:900;color:#FFFFFF;line-height:1.1;letter-spacing:0.3px;'>ENTERPRISE SOURCE SYSTEMS<br/><span style='font-size:6.5px;font-weight:600;opacity:0.9;'>(Controlled &amp; Governed)</span></div>", 20, 290, 165, 28, "fillColor=#0F2A4A;strokeColor=#0F2A4A;rounded=0;align=center;verticalAlign=middle;");
  rect("src_veeva", "<div style='font-size:7.2px;font-weight:700;color:#0F172A;'>🟧 Veeva (Vault)<br/><span style='font-size:5.8px;color:#64748B;'>Documents</span></div>", 26, 324, 153, 34, "fillColor=#F8FAFC;strokeColor=#E2E8F0;rounded=1;align=center;verticalAlign=middle;");
  rect("src_qms", "<div style='font-size:7.2px;font-weight:700;color:#0F172A;'>📋 QMS / SOP<br/><span style='font-size:5.8px;color:#64748B;'>Repository</span></div>", 26, 364, 153, 34, "fillColor=#F8FAFC;strokeColor=#E2E8F0;rounded=1;align=center;verticalAlign=middle;");
  rect("src_ctms", "<div style='font-size:7.2px;font-weight:700;color:#0F172A;'>🩺 Clinical Trial Data<br/><span style='font-size:5.8px;color:#64748B;'>(CTMS / EDC)</span></div>", 26, 404, 153, 34, "fillColor=#F8FAFC;strokeColor=#E2E8F0;rounded=1;align=center;verticalAlign=middle;");
  rect("src_lims", "<div style='font-size:7.2px;font-weight:700;color:#0F172A;'>🧪 LIMS<br/><span style='font-size:5.8px;color:#64748B;'>Laboratory Data</span></div>", 26, 444, 153, 34, "fillColor=#F8FAFC;strokeColor=#E2E8F0;rounded=1;align=center;verticalAlign=middle;");
  rect("src_sap", "<div style='font-size:7.2px;font-weight:700;color:#0F172A;'>🏢 SAP<br/><span style='font-size:5.8px;color:#64748B;'>Enterprise Data</span></div>", 26, 484, 153, 34, "fillColor=#F8FAFC;strokeColor=#E2E8F0;rounded=1;align=center;verticalAlign=middle;");
  rect("src_etmf", "<div style='font-size:7.2px;font-weight:700;color:#0F172A;'>📑 eTMF<br/><span style='font-size:5.8px;color:#64748B;'>Trial Master File</span></div>", 26, 524, 153, 34, "fillColor=#F8FAFC;strokeColor=#E2E8F0;rounded=1;align=center;verticalAlign=middle;");
  rect("src_lake", "<div style='font-size:7.2px;font-weight:700;color:#0F172A;'>🗄️ Data Lake<br/><span style='font-size:5.8px;color:#64748B;'>(Unstructured &amp; Raw)</span></div>", 26, 564, 153, 34, "fillColor=#F8FAFC;strokeColor=#E2E8F0;rounded=1;align=center;verticalAlign=middle;");

  // =========================================================================
  // 3. RIGHT SIDEBAR (x=1390..1580, w=190)
  // =========================================================================
  
  // Card 1: GOVERNANCE RULES
  rect("box_gov", "", 1390, 72, 190, 205, "fillColor=#FFFFFF;strokeColor=#1E3A8A;strokeWidth=1.5;rounded=1;");
  rect("lbl_gov", "<span style='font-size:9px;font-weight:900;color:#FFFFFF;letter-spacing:0.5px;'>GOVERNANCE RULES</span>", 1390, 72, 190, 22, "fillColor=#0F2A4A;strokeColor=#0F2A4A;rounded=0;align=center;verticalAlign=middle;");
  rect("gov_r1", "<div style='font-size:7.2px;font-weight:700;color:#0F172A;'>🛡️ Data Classification<br/><span style='font-size:5.8px;color:#64748B;'>&amp; Handling</span></div>", 1396, 100, 178, 28, "fillColor=#F8FAFC;strokeColor=#E2E8F0;rounded=1;align=left;verticalAlign=middle;spacingLeft=6;");
  rect("gov_r2", "<div style='font-size:7.2px;font-weight:700;color:#0F172A;'>🔒 Least Privilege<br/><span style='font-size:5.8px;color:#64748B;'>Access</span></div>", 1396, 134, 178, 28, "fillColor=#F8FAFC;strokeColor=#E2E8F0;rounded=1;align=left;verticalAlign=middle;spacingLeft=6;");
  rect("gov_r3", "<div style='font-size:7.2px;font-weight:700;color:#0F172A;'>🛡️ Prompt Guardrails<br/><span style='font-size:5.8px;color:#64748B;'>&amp; Safety Filters</span></div>", 1396, 168, 178, 28, "fillColor=#F8FAFC;strokeColor=#E2E8F0;rounded=1;align=left;verticalAlign=middle;spacingLeft=6;");
  rect("gov_r4", "<div style='font-size:7.2px;font-weight:700;color:#0F172A;'>🎯 Grounded Answers<br/><span style='font-size:5.8px;color:#64748B;'>Only</span></div>", 1396, 202, 178, 28, "fillColor=#F8FAFC;strokeColor=#E2E8F0;rounded=1;align=left;verticalAlign=middle;spacingLeft=6;");
  rect("gov_r5", "<div style='font-size:7.2px;font-weight:700;color:#0F172A;'>📑 Full Auditability<br/><span style='font-size:5.8px;color:#64748B;'>&amp; Traceability</span></div>", 1396, 236, 178, 28, "fillColor=#F8FAFC;strokeColor=#E2E8F0;rounded=1;align=left;verticalAlign=middle;spacingLeft=6;");

  // Card 2: DECISION OUTCOMES
  rect("box_outcomes", "", 1390, 286, 190, 190, "fillColor=#FFFFFF;strokeColor=#1E3A8A;strokeWidth=1.5;rounded=1;");
  rect("lbl_outcomes", "<span style='font-size:9px;font-weight:900;color:#FFFFFF;letter-spacing:0.5px;'>DECISION OUTCOMES</span>", 1390, 286, 190, 22, "fillColor=#0F2A4A;strokeColor=#0F2A4A;rounded=0;align=center;verticalAlign=middle;");
  rect("out_o1", "<div style='font-size:7px;font-weight:700;color:#16A34A;'>✔ Auto-Approve<br/><span style='font-size:5.6px;color:#64748B;'>(Automated Response)</span></div>", 1396, 313, 178, 28, "fillColor=#DCFCE7;strokeColor=#16A34A;rounded=1;align=left;verticalAlign=middle;spacingLeft=6;");
  rect("out_o2", "<div style='font-size:7px;font-weight:700;color:#D97706;'>⭐ Manual Review<br/><span style='font-size:5.6px;color:#64748B;'>(Secondary Check)</span></div>", 1396, 345, 178, 28, "fillColor=#FEF3C7;strokeColor=#D97706;rounded=1;align=left;verticalAlign=middle;spacingLeft=6;");
  rect("out_o3", "<div style='font-size:7px;font-weight:700;color:#DC2626;'>🛑 Escalation<br/><span style='font-size:5.6px;color:#64748B;'>(Expert / Safety)</span></div>", 1396, 377, 178, 28, "fillColor=#FEE2E2;strokeColor=#DC2626;rounded=1;align=left;verticalAlign=middle;spacingLeft=6;");
  rect("out_o4", "<div style='font-size:7px;font-weight:700;color:#0284C7;'>🔗 Workflow Trigger<br/><span style='font-size:5.6px;color:#64748B;'>(System Execution)</span></div>", 1396, 409, 178, 28, "fillColor=#E0F2FE;strokeColor=#0284C7;rounded=1;align=left;verticalAlign=middle;spacingLeft=6;");
  rect("out_o5", "<div style='font-size:7px;font-weight:700;color:#7C3AED;'>📑 Evidence Generation<br/><span style='font-size:5.6px;color:#64748B;'>(Audit / Reports)</span></div>", 1396, 441, 178, 28, "fillColor=#FAF5FF;strokeColor=#7C3AED;rounded=1;align=left;verticalAlign=middle;spacingLeft=6;");

  // Card 3: KPIs
  rect("box_kpis", "", 1390, 484, 190, 126, "fillColor=#FFFFFF;strokeColor=#1E3A8A;strokeWidth=1.5;rounded=1;");
  rect("lbl_kpis", "<span style='font-size:9px;font-weight:900;color:#FFFFFF;letter-spacing:0.5px;'>KPIs</span>", 1390, 484, 190, 20, "fillColor=#0F2A4A;strokeColor=#0F2A4A;rounded=0;align=center;verticalAlign=middle;");
  rect("kpi_1", "<div style='font-size:7px;font-weight:700;color:#0F172A;'>⏱️ Decision Latency<br/><span style='font-size:5.6px;color:#64748B;'>(P50 / P95)</span></div>", 1396, 508, 178, 22, "fillColor=#F8FAFC;strokeColor=none;align=left;verticalAlign=middle;spacingLeft=6;");
  rect("kpi_2", "<div style='font-size:7px;font-weight:700;color:#0F172A;'>👤 Approval Rate (%)</div>", 1396, 533, 178, 20, "fillColor=#F8FAFC;strokeColor=none;align=left;verticalAlign=middle;spacingLeft=6;");
  rect("kpi_3", "<div style='font-size:7px;font-weight:700;color:#0F172A;'>🎯 Grounding Score (Avg.)</div>", 1396, 556, 178, 20, "fillColor=#F8FAFC;strokeColor=none;align=left;verticalAlign=middle;spacingLeft=6;");
  rect("kpi_4", "<div style='font-size:7px;font-weight:700;color:#0F172A;'>⚠️ Exception Rate (%)</div>", 1396, 579, 178, 20, "fillColor=#F8FAFC;strokeColor=none;align=left;verticalAlign=middle;spacingLeft=6;");

  // =========================================================================
  // 4. MAIN CENTRAL FLOW (Numbered Sequence 0 to 8) (x=210..1365)
  // =========================================================================
  
  // Step 0: User Request / Event
  rect("seq_0", "<b style='color:#FFFFFF;font-size:9px;'>0</b>", 215, 78, 20, 20, "fillColor=#0F2A4A;strokeColor=none;ellipse;align=center;verticalAlign=middle;");
  rect("stg0_node", "<span style='font-size:8.5px;font-weight:800;color:#166534;'>User Request / Event</span>", 240, 75, 130, 26, "fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=1.2;rounded=1;align=center;verticalAlign=middle;");
  edge(nid(), "", "box_who", "stg0_node", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endSize=4;");

  // Step 1: Request Type?
  rect("seq_1", "<b style='color:#FFFFFF;font-size:9px;'>1</b>", 215, 130, 20, 20, "fillColor=#0F2A4A;strokeColor=none;ellipse;align=center;verticalAlign=middle;");
  rect("gate_1", "<div style='font-size:7.5px;font-weight:800;color:#0F172A;'>Request<br/>Type?</div>", 240, 115, 130, 52, "shape=rhombus;fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.5;align=center;verticalAlign=middle;");
  
  // Step 1 Category Pods (6 columns across x=410..1060)
  rect("cat_med", "<div style='font-size:7px;font-weight:700;'>Medical<br/>Information</div>", 410, 125, 95, 32, "fillColor=#FFFFFF;strokeColor=#0284C7;rounded=1;align=center;verticalAlign=middle;");
  rect("cat_clin", "<div style='font-size:7px;font-weight:700;'>Clinical Trial</div>", 520, 125, 95, 32, "fillColor=#FFFFFF;strokeColor=#0284C7;rounded=1;align=center;verticalAlign=middle;");
  rect("cat_reg", "<div style='font-size:7px;font-weight:700;'>Regulatory</div>", 630, 125, 95, 32, "fillColor=#FAF5FF;strokeColor=#7C3AED;rounded=1;align=center;verticalAlign=middle;");
  rect("cat_safe", "<div style='font-size:7px;font-weight:700;'>Safety</div>", 740, 125, 95, 32, "fillColor=#FFF7ED;strokeColor=#EA580C;rounded=1;align=center;verticalAlign=middle;");
  rect("cat_qual", "<div style='font-size:7px;font-weight:700;'>Quality</div>", 850, 125, 95, 32, "fillColor=#F0FDF4;strokeColor=#16A34A;rounded=1;align=center;verticalAlign=middle;");
  rect("cat_comm", "<div style='font-size:7px;font-weight:700;'>Commercial<br/>Analytics</div>", 960, 125, 95, 32, "fillColor=#FEF3C7;strokeColor=#D97706;rounded=1;align=center;verticalAlign=middle;");

  edge(nid(), "", "stg0_node", "gate_1", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endSize=4;");
  edge(nid(), "", "gate_1", "cat_med", "edgeStyle=orthogonalEdgeStyle;strokeColor=#0F172A;strokeWidth=1.2;endArrow=none;");
  edge(nid(), "", "cat_med", "cat_comm", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.2;endArrow=none;");
  edge(nid(), "", "cat_med", "cat_med", "edgeStyle=orthogonalEdgeStyle;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=3;", [{x: 457, y: 110}, {x: 457, y: 125}]);
  edge(nid(), "", "cat_clin", "cat_clin", "edgeStyle=orthogonalEdgeStyle;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=3;", [{x: 567, y: 110}, {x: 567, y: 125}]);
  edge(nid(), "", "cat_reg", "cat_reg", "edgeStyle=orthogonalEdgeStyle;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=3;", [{x: 677, y: 110}, {x: 677, y: 125}]);
  edge(nid(), "", "cat_safe", "cat_safe", "edgeStyle=orthogonalEdgeStyle;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=3;", [{x: 787, y: 110}, {x: 787, y: 125}]);
  edge(nid(), "", "cat_qual", "cat_qual", "edgeStyle=orthogonalEdgeStyle;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=3;", [{x: 897, y: 110}, {x: 897, y: 125}]);
  edge(nid(), "", "cat_comm", "cat_comm", "edgeStyle=orthogonalEdgeStyle;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=3;", [{x: 1007, y: 110}, {x: 1007, y: 125}]);

  // Step 2: Contains regulated or sensitive data?
  rect("seq_2", "<b style='color:#FFFFFF;font-size:9px;'>2</b>", 215, 205, 20, 20, "fillColor=#0F2A4A;strokeColor=none;ellipse;align=center;verticalAlign=middle;");
  rect("gate_2", "<div style='font-size:7px;font-weight:800;color:#0F172A;'>Contains<br/>regulated or<br/>sensitive data?</div>", 240, 185, 130, 60, "shape=rhombus;fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.5;align=center;verticalAlign=middle;");
  
  // Step 2 YES Branch: DLP & IAM
  rect("g2_dlp", "<div style='font-size:6.8px;font-weight:700;color:#0F172A;'>🛡️ Cloud DLP /<br/>de-identification /<br/>policy checks</div>", 445, 195, 135, 42, "fillColor=#F8FAFC;strokeColor=#0284C7;strokeWidth=1.2;rounded=1;align=center;verticalAlign=middle;");
  rect("g2_iam", "<div style='font-size:6.8px;font-weight:700;color:#0F172A;'>🔒 IAM / access<br/>validation /<br/>audit logging</div>", 610, 195, 135, 42, "fillColor=#F8FAFC;strokeColor=#0284C7;strokeWidth=1.2;rounded=1;align=center;verticalAlign=middle;");

  edge(nid(), "", "gate_1", "gate_2", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endSize=4;");
  edge(nid(), "YES", "gate_2", "g2_dlp", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=4;fontStyle=1;fontSize=7.5;");
  edge(nid(), "", "g2_dlp", "g2_iam", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=4;");

  // Step 3: Need enterprise knowledge grounding?
  rect("seq_3", "<b style='color:#FFFFFF;font-size:9px;'>3</b>", 215, 290, 20, 20, "fillColor=#0F2A4A;strokeColor=none;ellipse;align=center;verticalAlign=middle;");
  rect("gate_3", "<div style='font-size:7px;font-weight:800;color:#0F172A;'>Need enterprise<br/>knowledge<br/>grounding?</div>", 240, 270, 130, 60, "shape=rhombus;fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.5;align=center;verticalAlign=middle;");

  edge(nid(), "NO", "gate_2", "gate_3", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=4;fontStyle=1;fontSize=7.5;");

  // Step 3 YES Branch: RAG & KNOWLEDGE RETRIEVAL PIPELINE
  rect("box_rag_pipe", "", 445, 260, 680, 80, "fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.2;dashed=1;dashPattern=4 4;rounded=1;");
  rect("lbl_rag_pipe", "<span style='font-size:7.5px;font-weight:800;color:#0284C7;'>RAG &amp; KNOWLEDGE RETRIEVAL PIPELINE</span>", 560, 262, 350, 14, "strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  
  // Controlled Knowledge Sources subbox inside RAG
  rect("rag_sources", "<div style='font-size:6px;font-weight:700;color:#0F172A;'>Controlled Knowledge Sources<br/>" +
    "<span style='font-size:5.5px;color:#64748B;'>Veeva Docs | QMS/SOP | CTMS | LIMS | SAP | Data Lake</span></div>", 455, 280, 185, 48, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("rag_gcs", "<div style='font-size:6.8px;font-weight:700;'>🗃️ Cloud<br/>Storage</div>", 655, 284, 65, 42, "fillColor=#F8FAFC;strokeColor=#0284C7;rounded=1;align=center;verticalAlign=middle;");
  rect("rag_bq", "<div style='font-size:6.8px;font-weight:700;'>📊 BigQuery</div>", 735, 284, 65, 42, "fillColor=#F8FAFC;strokeColor=#0284C7;rounded=1;align=center;verticalAlign=middle;");
  rect("rag_vec", "<div style='font-size:6.8px;font-weight:700;'>🔍 Vector<br/>Index / Search</div>", 815, 284, 75, 42, "fillColor=#DCFCE7;strokeColor=#16A34A;rounded=1;align=center;verticalAlign=middle;");
  rect("rag_vertex", "<div style='font-size:6.8px;font-weight:700;'>🧠 Vertex AI<br/><span style='font-size:5.5px;color:#64748B;'>(LLM / RAG)</span></div>", 905, 284, 75, 42, "fillColor=#EFF6FF;strokeColor=#2563EB;rounded=1;align=center;verticalAlign=middle;");

  edge(nid(), "YES", "gate_3", "rag_sources", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=4;fontStyle=1;fontSize=7.5;");
  edge(nid(), "", "rag_sources", "rag_gcs", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=3;");
  edge(nid(), "", "rag_gcs", "rag_bq", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=3;");
  edge(nid(), "", "rag_bq", "rag_vec", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=3;");
  edge(nid(), "", "rag_vec", "rag_vertex", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=3;");

  // Step 4: Action Type?
  rect("seq_4", "<b style='color:#FFFFFF;font-size:9px;'>4</b>", 215, 375, 20, 20, "fillColor=#0F2A4A;strokeColor=none;ellipse;align=center;verticalAlign=middle;");
  rect("gate_4", "<div style='font-size:7.5px;font-weight:800;color:#0F172A;'>Action<br/>Type?</div>", 240, 360, 130, 52, "shape=rhombus;fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.5;align=center;verticalAlign=middle;");

  edge(nid(), "NO", "gate_3", "gate_4", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=4;fontStyle=1;fontSize=7.5;");
  edge(nid(), "", "rag_vertex", "gate_4", "edgeStyle=orthogonalEdgeStyle;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=4;", [{x: 942, y: 350}, {x: 305, y: 350}]);

  // Step 4 Action Pods (5 pods)
  rect("act_ans", "<div style='font-size:7px;font-weight:700;'>💬 Answer<br/>Question</div>", 410, 368, 95, 36, "fillColor=#EFF6FF;strokeColor=#0284C7;rounded=1;align=center;verticalAlign=middle;");
  rect("act_sum", "<div style='font-size:7px;font-weight:700;'>📄 Summarize<br/>Content</div>", 520, 368, 95, 36, "fillColor=#F0FDF4;strokeColor=#16A34A;rounded=1;align=center;verticalAlign=middle;");
  rect("act_doc", "<div style='font-size:7px;font-weight:700;'>📝 Draft<br/>Document</div>", 630, 368, 95, 36, "fillColor=#FAF5FF;strokeColor=#7C3AED;rounded=1;align=center;verticalAlign=middle;");
  rect("act_tsk", "<div style='font-size:7px;font-weight:700;'>☑️ Create<br/>Task / Ticket</div>", 740, 368, 95, 36, "fillColor=#FFF7ED;strokeColor=#EA580C;rounded=1;align=center;verticalAlign=middle;");
  rect("act_wf", "<div style='font-size:7px;font-weight:700;'>🔗 Trigger Downstream<br/>Workflow</div>", 850, 368, 120, 36, "fillColor=#F0FDF4;strokeColor=#16A34A;rounded=1;align=center;verticalAlign=middle;");

  edge(nid(), "", "gate_4", "act_ans", "edgeStyle=orthogonalEdgeStyle;strokeColor=#0F172A;strokeWidth=1.2;endArrow=none;");
  edge(nid(), "", "act_ans", "act_wf", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.2;endArrow=none;");

  // Step 5: Risk Tier?
  rect("seq_5", "<b style='color:#FFFFFF;font-size:9px;'>5</b>", 215, 450, 20, 20, "fillColor=#0F2A4A;strokeColor=none;ellipse;align=center;verticalAlign=middle;");
  rect("gate_5", "<div style='font-size:7.5px;font-weight:800;color:#0F172A;'>Risk<br/>Tier?</div>", 240, 435, 130, 52, "shape=rhombus;fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.5;align=center;verticalAlign=middle;");

  edge(nid(), "", "gate_4", "gate_5", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endSize=4;");

  // Step 5 Risk Tiers (3 cards)
  rect("risk_low", "<div style='font-size:7.2px;font-weight:700;color:#16A34A;'>✔ Low<br/><span style='font-size:5.8px;color:#64748B;'>(Automated)</span></div>", 410, 442, 105, 38, "fillColor=#DCFCE7;strokeColor=#16A34A;rounded=1;align=center;verticalAlign=middle;");
  rect("risk_med", "<div style='font-size:7.2px;font-weight:700;color:#D97706;'>👤 Medium<br/><span style='font-size:5.8px;color:#64748B;'>(Business Reviewer)</span></div>", 535, 442, 155, 38, "fillColor=#FEF3C7;strokeColor=#D97706;rounded=1;align=center;verticalAlign=middle;");
  rect("risk_high", "<div style='font-size:7.2px;font-weight:700;color:#DC2626;'>🛑 High<br/><span style='font-size:5.8px;color:#64748B;'>(Human Approval + Evidence Pack)</span></div>", 710, 442, 185, 38, "fillColor=#FEE2E2;strokeColor=#DC2626;rounded=1;align=center;verticalAlign=middle;");

  edge(nid(), "", "gate_5", "risk_low", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=3;");
  edge(nid(), "", "gate_5", "risk_med", "edgeStyle=orthogonalEdgeStyle;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=3;", [{x: 370, y: 461}, {x: 400, y: 461}]);
  edge(nid(), "", "gate_5", "risk_high", "edgeStyle=orthogonalEdgeStyle;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=3;", [{x: 370, y: 461}, {x: 700, y: 461}]);

  // Step 6: Grounding & confidence threshold met?
  rect("seq_6", "<b style='color:#FFFFFF;font-size:9px;'>6</b>", 305, 520, 20, 20, "fillColor=#0F2A4A;strokeColor=none;ellipse;align=center;verticalAlign=middle;");
  rect("gate_6", "<div style='font-size:6.8px;font-weight:800;color:#0F172A;'>Grounding &amp;<br/>confidence<br/>threshold met?</div>", 330, 502, 120, 56, "shape=rhombus;fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.5;align=center;verticalAlign=middle;");
  
  rect("g6_hitl", "<div style='font-size:7px;font-weight:700;color:#7C3AED;'>👤 Human Expert Review<br/>or Escalate</div>", 495, 510, 155, 40, "fillColor=#FAF5FF;strokeColor=#7C3AED;rounded=1;align=center;verticalAlign=middle;");

  edge(nid(), "", "risk_med", "gate_6", "edgeStyle=orthogonalEdgeStyle;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=3;", [{x: 612, y: 480}, {x: 390, y: 502}]);
  edge(nid(), "", "risk_high", "gate_6", "edgeStyle=orthogonalEdgeStyle;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=3;", [{x: 802, y: 480}, {x: 390, y: 502}]);
  edge(nid(), "NO", "gate_6", "g6_hitl", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=3;fontStyle=1;fontSize=7.5;");
  edge(nid(), "", "g6_hitl", "rag_vertex", "edgeStyle=orthogonalEdgeStyle;strokeColor=#0F172A;strokeWidth=1.2;dashed=1;dashPattern=3 3;endArrow=block;endSize=3;", [{x: 1040, y: 530}, {x: 1040, y: 305}, {x: 980, y: 305}]);

  // Step 7: GxP / submission / safety-critical?
  rect("seq_7", "<b style='color:#FFFFFF;font-size:9px;'>7</b>", 305, 595, 20, 20, "fillColor=#0F2A4A;strokeColor=none;ellipse;align=center;verticalAlign=middle;");
  rect("gate_7", "<div style='font-size:6.8px;font-weight:800;color:#0F172A;'>GxP / submission /<br/>safety-critical?</div>", 330, 577, 120, 56, "shape=rhombus;fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.5;align=center;verticalAlign=middle;");

  edge(nid(), "YES", "gate_6", "gate_7", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=4;fontStyle=1;fontSize=7.5;");

  // Step 7 YES Branch: HITL Approval -> Versioned Output -> Electronic Signature / Audit Trail
  rect("g7_hitl", "<div style='font-size:7px;font-weight:700;color:#0F172A;'>👤 Human-in-the-Loop<br/>Approval</div>", 495, 585, 120, 40, "fillColor=#EFF6FF;strokeColor=#0284C7;rounded=1;align=center;verticalAlign=middle;");
  rect("g7_vers", "<div style='font-size:7px;font-weight:700;color:#0F172A;'>📑 Versioned<br/>Output</div>", 635, 585, 95, 40, "fillColor=#EFF6FF;strokeColor=#0284C7;rounded=1;align=center;verticalAlign=middle;");
  rect("g7_esig", "<div style='font-size:7px;font-weight:700;color:#0F172A;'>✍️ Electronic Signature /<br/>Audit Trail</div>", 750, 585, 130, 40, "fillColor=#EFF6FF;strokeColor=#0284C7;rounded=1;align=center;verticalAlign=middle;");

  edge(nid(), "YES", "gate_7", "g7_hitl", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=3;fontStyle=1;fontSize=7.5;");
  edge(nid(), "", "g7_hitl", "g7_vers", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=3;");
  edge(nid(), "", "g7_vers", "g7_esig", "edgeStyle=none;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=3;");

  // Step 8: Outputs Row (7 colored boxes, x=240..1360)
  rect("seq_8", "<b style='color:#FFFFFF;font-size:9px;'>8</b>", 215, 680, 20, 20, "fillColor=#0F2A4A;strokeColor=none;ellipse;align=center;verticalAlign=middle;");
  rect("out_r_user", "<div style='font-size:7.2px;font-weight:700;color:#0F172A;'>💬 Response<br/>to User</div>", 240, 668, 120, 44, "fillColor=#EFF6FF;strokeColor=#0284C7;rounded=1;align=center;verticalAlign=middle;");
  rect("out_r_reg", "<div style='font-size:7.2px;font-weight:700;color:#7C3AED;'>📑 Regulatory Draft<br/>Generated</div>", 380, 668, 130, 44, "fillColor=#FAF5FF;strokeColor=#7C3AED;rounded=1;align=center;verticalAlign=middle;");
  rect("out_r_safe", "<div style='font-size:7.2px;font-weight:700;color:#DC2626;'>🛑 Safety Case<br/>Escalated</div>", 530, 668, 120, 44, "fillColor=#FEE2E2;strokeColor=#DC2626;rounded=1;align=center;verticalAlign=middle;");
  rect("out_r_qms", "<div style='font-size:7.2px;font-weight:700;color:#16A34A;'>📋 QMS Task<br/>Created</div>", 670, 668, 120, 44, "fillColor=#F0FDF4;strokeColor=#16A34A;rounded=1;align=center;verticalAlign=middle;");
  rect("out_r_clin", "<div style='font-size:7.2px;font-weight:700;color:#0284C7;'>🔗 Clinical Workflow<br/>Triggered</div>", 810, 668, 130, 44, "fillColor=#E0F2FE;strokeColor=#0284C7;rounded=1;align=center;verticalAlign=middle;");
  rect("out_r_bi", "<div style='font-size:7.2px;font-weight:700;color:#D97706;'>📊 Analytics Insight<br/>Delivered</div>", 960, 668, 130, 44, "fillColor=#FEF3C7;strokeColor=#D97706;rounded=1;align=center;verticalAlign=middle;");

  edge(nid(), "NO", "gate_7", "out_r_user", "edgeStyle=orthogonalEdgeStyle;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=4;fontStyle=1;fontSize=7.5;", [{x: 390, y: 645}, {x: 300, y: 645}]);
  edge(nid(), "", "g7_esig", "out_r_reg", "edgeStyle=orthogonalEdgeStyle;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endSize=4;", [{x: 815, y: 645}, {x: 445, y: 645}]);

  // Terminal Pill: End / Outcome Logged & Audited
  rect("out_final_pill", "<span style='font-size:8px;font-weight:800;color:#166534;'>✔ End / Outcome Logged &amp; Audited</span>", 520, 735, 280, 28, "fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=1.2;rounded=1;align=center;verticalAlign=middle;");
  edge(nid(), "", "out_r_user", "out_final_pill", "edgeStyle=orthogonalEdgeStyle;strokeColor=#16A34A;strokeWidth=1.2;endArrow=block;endSize=3;");
  edge(nid(), "", "out_r_clin", "out_final_pill", "edgeStyle=orthogonalEdgeStyle;strokeColor=#16A34A;strokeWidth=1.2;endArrow=block;endSize=3;");

  // =========================================================================
  // 5. BOTTOM PLATFORM SERVICES & LEGEND (y=780..960)
  // =========================================================================
  
  // Platform Services Container
  rect("box_gcp_svcs", "", 20, 780, 1560, 80, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;");
  rect("lbl_gcp_svcs", "<span style='font-size:8.5px;font-weight:800;color:#0F172A;letter-spacing:0.5px;'>NOVACURA PLATFORM SERVICES (Google Cloud)</span>", 580, 785, 440, 16, "strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  
  rect("gcp_vtx", "<div style='font-size:7.2px;font-weight:700;'>🧠 Vertex AI<br/><span style='font-size:5.8px;color:#64748B;'>(LLM / RAG)</span></div>", 40, 808, 145, 42, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("gcp_run", "<div style='font-size:7.2px;font-weight:700;'>🚀 Cloud Run<br/><span style='font-size:5.8px;color:#64748B;'>(Applications)</span></div>", 205, 808, 145, 42, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("gcp_bq", "<div style='font-size:7.2px;font-weight:700;'>📊 BigQuery<br/><span style='font-size:5.8px;color:#64748B;'>(Analytics)</span></div>", 370, 808, 145, 42, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("gcp_gcs", "<div style='font-size:7.2px;font-weight:700;'>🗃️ Cloud Storage<br/><span style='font-size:5.8px;color:#64748B;'>(Objects)</span></div>", 535, 808, 145, 42, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("gcp_pub", "<div style='font-size:7.2px;font-weight:700;'>📬 Pub/Sub<br/><span style='font-size:5.8px;color:#64748B;'>(Events)</span></div>", 700, 808, 145, 42, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("gcp_log", "<div style='font-size:7.2px;font-weight:700;'>📊 Cloud Logging<br/><span style='font-size:5.8px;color:#64748B;'>&amp; Monitoring</span></div>", 865, 808, 145, 42, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("gcp_sec", "<div style='font-size:7.2px;font-weight:700;'>🔒 Secret Manager<br/><span style='font-size:5.8px;color:#64748B;'>(Secrets)</span></div>", 1030, 808, 145, 42, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("gcp_iam", "<div style='font-size:7.2px;font-weight:700;'>🛡️ IAM<br/><span style='font-size:5.8px;color:#64748B;'>(Identity &amp; Access)</span></div>", 1195, 808, 145, 42, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");
  rect("gcp_dlp", "<div style='font-size:7.2px;font-weight:700;'>🛡️ Cloud DLP<br/><span style='font-size:5.8px;color:#64748B;'>(Data Protection)</span></div>", 1360, 808, 145, 42, "fillColor=#F8FAFC;strokeColor=#CBD5E1;rounded=1;align=center;verticalAlign=middle;");

  // Legend Bar
  rect("box_legend", "", 20, 875, 1560, 48, "fillColor=#FFFFFF;strokeColor=#0F2A4A;strokeWidth=1.5;rounded=1;");
  rect("lbl_leg", "<span style='font-size:9px;font-weight:900;color:#FFFFFF;letter-spacing:0.5px;'>LEGEND</span>", 20, 875, 90, 48, "fillColor=#0F2A4A;strokeColor=#0F2A4A;rounded=0;align=center;verticalAlign=middle;");

  rect("leg_start", "<div style='font-size:6.5px;font-weight:700;color:#166534;'>Start / End Node</div>", 125, 887, 105, 24, "fillColor=#DCFCE7;strokeColor=#16A34A;rounded=1;align=center;verticalAlign=middle;");
  rect("leg_dec", "<div style='font-size:6.5px;font-weight:700;'>Decision Point</div>", 245, 887, 100, 24, "shape=rhombus;fillColor=#FFFFFF;strokeColor=#0284C7;rounded=1;align=center;verticalAlign=middle;");
  rect("leg_proc", "<div style='font-size:6.5px;font-weight:700;'>Process / Action</div>", 360, 887, 105, 24, "fillColor=#FFFFFF;strokeColor=#0284C7;rounded=1;align=center;verticalAlign=middle;");
  rect("leg_hitl", "<div style='font-size:6.5px;font-weight:700;color:#D97706;'>Human Approval / Review</div>", 480, 887, 135, 24, "fillColor=#FEF3C7;strokeColor=#D97706;rounded=1;align=center;verticalAlign=middle;");
  rect("leg_sys", "<div style='font-size:6.5px;font-weight:700;color:#0284C7;'>System / Tool Integration</div>", 630, 887, 135, 24, "fillColor=#FFFFFF;strokeColor=#0284C7;dashed=1;dashPattern=3 3;rounded=1;align=center;verticalAlign=middle;");

  rect("leg_flow1", "<div style='font-size:6.8px;font-weight:700;color:#0F172A;'>➔ Primary Flow</div>", 780, 887, 120, 24, "strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  rect("leg_flow2", "<div style='font-size:6.8px;font-weight:700;color:#0F172A;'>⇢ Conditional / Escalation</div>", 915, 887, 160, 24, "strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");
  rect("leg_flow3", "<div style='font-size:6.8px;font-weight:700;color:#0284C7;'>⇢ Data / Knowledge Flow</div>", 1090, 887, 160, 24, "strokeColor=none;fillColor=none;align=center;verticalAlign=middle;");

  // Footer Metadata
  rect("footer_version", "<span style='font-size:9px;color:#64748B;font-weight:600;'>Version: 1.0</span>", 20, 935, 200, 18, "strokeColor=none;fillColor=none;align=left;");
  rect("footer_date", "<span style='font-size:9px;color:#64748B;font-weight:600;'>Date: May 2024</span>", 1425, 935, 135, 18, "strokeColor=none;fillColor=none;align=right;");

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
