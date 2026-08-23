/**
 * 🏛️ CANONICAL MASTER BLUEPRINT 12 — STATE MACHINE DIAGRAM
 * 
 * 1:1 Ground-Truth Reproduction of images/12.png
 * "12 STATE MACHINE DIAGRAM | NOVACURA AI Copilot – Study Protocol Intelligence Workflow"
 * Complete state machine lifecycle: S0..S9, S4a, S4b, ST, SE, SF, Alerting, 4 Bottom Panels
 * 
 * Geometric Coordinates: 1600x980px
 */

export function generateTemplate12StateMachineXml(domainFlavor = "biopharma", theme: "light" | "dark" = "light"): string {
  const E = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const c: string[] = [];

  const rect = (id: string, val: string, x: number, y: number, w: number, h: number, style: string) => {
    c.push(`<mxCell id="${id}" value="${E(val)}" style="rounded=1;whiteSpace=wrap;html=1;${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`);
  };

  const text = (id: string, val: string, x: number, y: number, w: number, h: number, style: string) => {
    c.push(`<mxCell id="${id}" value="${E(val)}" style="text;html=1;whiteSpace=wrap;overflow=hidden;strokeColor=none;fillColor=none;${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`);
  };

  const edge = (id: string, label: string, x1: number, y1: number, x2: number, y2: number, color = "#0F172A", dashed = false, arrow = "block", pts: [number, number][] = [], lblOffset = "") => {
    const dashStyle = dashed ? "dashed=1;dashPattern=5 4;" : "";
    const ptsXml = pts.length > 0 ? `<Array as="points">${pts.map(p => `<mxPoint x="${p[0]}" y="${p[1]}"/>`).join("")}</Array>` : "";
    const labelStyle = label ? `fontSize=8;fontStyle=1;fontColor=#0F172A;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=2.5;${lblOffset}` : "";
    c.push(`<mxCell id="${id}" value="${E(label)}" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;${dashStyle}strokeColor=${color};strokeWidth=1.5;endArrow=${arrow};endFill=1;${labelStyle}" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="${x1}" y="${y1}" as="sourcePoint"/><mxPoint x="${x2}" y="${y2}" as="targetPoint"/>${ptsXml}</mxGeometry></mxCell>`);
  };

  // =========================================================================
  // 1. MASTER HEADER & TOP-RIGHT BRAND BLOCK
  // =========================================================================
  // Number Badge "12"
  rect("badge_12", "<b style='font-size:24px;color:#FFFFFF;'>12</b>", 20, 14, 52, 40, "fillColor=#0F2A4A;strokeColor=#0F2A4A;rounded=0;arcSize=0;align=center;verticalAlign=middle;");

  // Title Block
  const titleHtml = `<div style="font-family:Inter,system-ui,sans-serif;">
    <div style="font-size:22px;font-weight:900;color:#0F2A4A;letter-spacing:1px;line-height:1.1;">STATE MACHINE DIAGRAM</div>
    <div style="font-size:12px;font-weight:700;color:#475569;margin-top:2px;">NOVACURA AI Copilot – Study Protocol Intelligence Workflow</div>
  </div>`;
  text("header_title", titleHtml, 82, 14, 750, 40, "align=left;verticalAlign=middle;");

  // Top-Right Brand Logo Block
  const brandHtml = `<div style="text-align:right;font-family:Inter,system-ui,sans-serif;">
    <div style="display:inline-flex;align-items:center;gap:6px;">
      <span style="font-size:20px;">🧬</span>
      <span style="font-size:20px;font-weight:900;color:#0284C7;letter-spacing:1px;">NOVACURA</span>
    </div>
    <div style="font-size:9.5px;font-style:italic;color:#64748B;margin-top:2px;">Transforming Therapies. Improving Lives.</div>
  </div>`;
  text("brand_block", brandHtml, 1260, 12, 320, 44, "align=right;verticalAlign=top;");

  // Scenario Card (Left)
  const scenarioHtml = `<div style="font-size:9.5px;color:#0F172A;font-weight:500;line-height:1.35;">
    This state machine represents the lifecycle of a user question in NOVACURA AI Copilot from submission to answer delivery, including human-in-the-loop review and guardrail enforcement.
  </div>`;
  rect("scenario_card", scenarioHtml, 20, 64, 580, 42, "fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.2;rounded=1;arcSize=4;align=left;spacingLeft=8;verticalAlign=middle;");

  // State Legend (Right)
  const legendHtml = `<div style="padding:4px 8px;text-align:center;">
    <div style="font-size:9px;font-weight:900;color:#0F2A4A;letter-spacing:0.5px;margin-bottom:4px;">STATE LEGEND</div>
    <div style="display:flex;align-items:center;justify-content:center;gap:14px;font-size:8px;font-weight:700;color:#334155;">
      <div style="display:flex;align-items:center;gap:4px;">
        <div style="width:12px;height:12px;border-radius:6px;background:#F0FDF4;border:1.5px solid #16A34A;"></div>
        <span>Start / Success States</span>
      </div>
      <div style="display:flex;align-items:center;gap:4px;">
        <div style="width:12px;height:12px;border-radius:6px;background:#EFF6FF;border:1.5px solid #2563EB;"></div>
        <span>Processing States</span>
      </div>
      <div style="display:flex;align-items:center;gap:4px;">
        <div style="width:12px;height:12px;border-radius:6px;background:#FFF7ED;border:1.5px solid #EA580C;"></div>
        <span>Decision / Guardrail States</span>
      </div>
      <div style="display:flex;align-items:center;gap:4px;">
        <div style="width:12px;height:12px;border-radius:6px;background:#FAF5FF;border:1.5px solid #7C3AED;"></div>
        <span>Waiting / Human States</span>
      </div>
      <div style="display:flex;align-items:center;gap:4px;">
        <div style="width:12px;height:12px;border-radius:6px;background:#FEF2F2;border:1.5px solid #DC2626;"></div>
        <span>Failure / Terminal States</span>
      </div>
    </div>
  </div>`;
  rect("legend_card", legendHtml, 615, 64, 735, 42, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;arcSize=4;verticalAlign=middle;");

  // =========================================================================
  // 2. LEFT SIDEBAR: EVENTS (TRIGGERS) & GUARDRAILS & RULES (x: 20, w: 190)
  // =========================================================================
  // Card 1: EVENTS (TRIGGERS) (y: 120, h: 290)
  const eventsHtml = `<div style="padding:6px;">
    <div style="background:#0F2A4A;color:#FFFFFF;font-size:9.5px;font-weight:900;text-align:center;padding:4px;border-radius:2px;margin-bottom:8px;letter-spacing:0.5px;">EVENTS (TRIGGERS)</div>
    <div style="font-size:8px;color:#1E293B;line-height:1.45;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">
        <span style="font-size:12px;">🚀</span>
        <span><b>E1</b> Question Submitted</span>
      </div>
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">
        <span style="font-size:12px;">📑</span>
        <span><b>E2</b> Context Retrieved</span>
      </div>
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">
        <span style="font-size:12px;">🧠</span>
        <span><b>E3</b> LLM Response Generated</span>
      </div>
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">
        <span style="font-size:12px;">🛡️</span>
        <span><b>E4</b> Guardrail Check Completed</span>
      </div>
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">
        <span style="font-size:12px;">👤</span>
        <span><b>E5</b> Human Review Completed</span>
      </div>
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">
        <span style="font-size:12px;">👍</span>
        <span><b>E6</b> User Feedback Provided</span>
      </div>
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">
        <span style="font-size:12px;">⏱️</span>
        <span><b>E7</b> Timeout / SLA Breach</span>
      </div>
      <div style="display:flex;align-items:center;gap:6px;">
        <span style="font-size:12px;">⚠️</span>
        <span><b>E8</b> System / Service Error</span>
      </div>
    </div>
  </div>`;
  rect("card_events", eventsHtml, 20, 120, 190, 290, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // Card 2: GUARDRAILS & RULES (y: 425, h: 290)
  const rulesHtml = `<div style="padding:6px;">
    <div style="background:#0F2A4A;color:#FFFFFF;font-size:9.5px;font-weight:900;text-align:center;padding:4px;border-radius:2px;margin-bottom:8px;letter-spacing:0.5px;">🛡️ GUARDRAILS &amp; RULES</div>
    <div style="font-size:8px;color:#1E293B;line-height:1.45;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:10px;">
        <span style="color:#0284C7;font-weight:900;">✔</span>
        <span>Toxicity / PII / PHI Detection</span>
      </div>
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:10px;">
        <span style="color:#0284C7;font-weight:900;">✔</span>
        <span>Hallucination Detection</span>
      </div>
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:10px;">
        <span style="color:#0284C7;font-weight:900;">✔</span>
        <span>Regulatory Compliance (GxP)</span>
      </div>
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:10px;">
        <span style="color:#0284C7;font-weight:900;">✔</span>
        <span>Source Attribution Required</span>
      </div>
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:10px;">
        <span style="color:#0284C7;font-weight:900;">✔</span>
        <span>Confidence Threshold Check</span>
      </div>
      <div style="display:flex;align-items:center;gap:6px;">
        <span style="color:#0284C7;font-weight:900;">✔</span>
        <span>Data Residency &amp; Access Policy</span>
      </div>
    </div>
  </div>`;
  rect("card_rules", rulesHtml, 20, 425, 190, 290, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // =========================================================================
  // 3. RIGHT SIDEBAR: STATES DESCRIPTION & KEY TRANSITIONS (x: 1370, w: 210)
  // =========================================================================
  // Card 1: STATES DESCRIPTION (y: 120, h: 420)
  const statesDescHtml = `<div style="padding:6px;">
    <div style="background:#0F2A4A;color:#FFFFFF;font-size:9.5px;font-weight:900;text-align:center;padding:4px;border-radius:2px;margin-bottom:6px;letter-spacing:0.5px;">STATES DESCRIPTION</div>
    <table style="width:100%;font-size:7.5px;color:#1E293B;line-height:1.35;">
      <tr style="font-weight:900;border-bottom:1px solid #CBD5E1;color:#64748B;">
        <td style="width:30px;padding-bottom:2px;">ID</td>
        <td style="padding-bottom:2px;">STATE</td>
      </tr>
      <tr><td style="font-weight:700;">S0</td><td>Start (Idle)</td></tr>
      <tr><td style="font-weight:700;">S1</td><td>Question Received</td></tr>
      <tr><td style="font-weight:700;">S2</td><td>Context Retrieval</td></tr>
      <tr><td style="font-weight:700;">S3</td><td>LLM Generation</td></tr>
      <tr><td style="font-weight:700;">S4</td><td>Guardrail Check</td></tr>
      <tr><td style="font-weight:700;">S4a</td><td>Guardrail Failed</td></tr>
      <tr><td style="font-weight:700;">S4b</td><td>Automated Action</td></tr>
      <tr><td style="font-weight:700;">S5</td><td>Human Review</td></tr>
      <tr><td style="font-weight:700;">S6</td><td>Review Decision</td></tr>
      <tr><td style="font-weight:700;">S7</td><td>Finalize Answer</td></tr>
      <tr><td style="font-weight:700;">S8</td><td>Answer Delivered</td></tr>
      <tr><td style="font-weight:700;">S9</td><td>Feedback Captured</td></tr>
      <tr style="border-top:1px solid #E2E8F0;"><td style="color:#DC2626;font-weight:900;">ST</td><td style="color:#DC2626;">Timeout (Terminal)</td></tr>
      <tr><td style="color:#DC2626;font-weight:900;">SE</td><td style="color:#DC2626;">Error (Terminal)</td></tr>
      <tr><td style="color:#DC2626;font-weight:900;">SF</td><td style="color:#DC2626;">Failed / Blocked (Terminal)</td></tr>
    </table>
  </div>`;
  rect("card_states_desc", statesDescHtml, 1370, 120, 210, 420, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // Card 2: KEY TRANSITIONS (y: 555, h: 160)
  const transitionsHtml = `<div style="padding:6px;">
    <div style="background:#0F2A4A;color:#FFFFFF;font-size:9.5px;font-weight:900;text-align:center;padding:4px;border-radius:2px;margin-bottom:6px;letter-spacing:0.5px;">KEY TRANSITIONS</div>
    <div style="font-size:8px;color:#1E293B;line-height:1.45;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">
        <span style="font-weight:900;color:#0F172A;font-size:12px;">➔</span>
        <span>Automatic Transition</span>
      </div>
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">
        <span style="font-weight:900;color:#0F172A;font-size:12px;">⇢</span>
        <span>Conditional Transition</span>
      </div>
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">
        <span style="font-weight:900;color:#16A34A;font-size:12px;">➔</span>
        <span>Success / Allowed Path</span>
      </div>
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">
        <span style="font-weight:900;color:#DC2626;font-size:12px;">➔</span>
        <span>Failure / Blocked Path</span>
      </div>
      <div style="display:flex;align-items:center;gap:6px;">
        <span style="font-weight:900;color:#7C3AED;font-size:12px;">➔</span>
        <span>Human Intervention</span>
      </div>
    </div>
  </div>`;
  rect("card_transitions", transitionsHtml, 1370, 555, 210, 160, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // =========================================================================
  // 4. MAIN CANVAS CONTAINER (x: 225, y: 120, w: 1130, h: 595)
  // =========================================================================
  rect("main_canvas_frame", "", 225, 120, 1130, 595, "fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.5;dashed=1;dashPattern=6 4;rounded=1;arcSize=3;");

  // -------------------------------------------------------------------------
  // TOP ROW STATES (y: 155, h: 65)
  // -------------------------------------------------------------------------
  // S0 START (x: 250, y: 155, w: 100, h: 65)
  const s0Html = `<div style="text-align:center;">
    <div style="font-size:9.5px;font-weight:900;color:#15803D;">S0</div>
    <div style="font-size:9.5px;font-weight:800;color:#0F172A;line-height:1.1;">START</div>
    <div style="font-size:7.5px;color:#64748B;margin-top:2px;">Idle / Ready</div>
  </div>`;
  rect("state_s0", s0Html, 250, 155, 100, 65, "fillColor=#F0FDF4;strokeColor=#16A34A;strokeWidth=1.5;align=center;verticalAlign=middle;");

  // S1 QUESTION RECEIVED (x: 450, y: 155, w: 125, h: 65)
  const s1Html = `<div style="text-align:center;">
    <div style="font-size:9.5px;font-weight:900;color:#1D4ED8;">S1</div>
    <div style="font-size:9px;font-weight:800;color:#0F172A;line-height:1.1;">QUESTION RECEIVED</div>
    <div style="font-size:7px;color:#64748B;margin-top:2px;">Validate &amp; Normalize<br>User Input</div>
  </div>`;
  rect("state_s1", s1Html, 450, 155, 125, 65, "fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=1.5;align=center;verticalAlign=middle;");

  // S2 CONTEXT RETRIEVAL (x: 675, y: 155, w: 125, h: 65)
  const s2Html = `<div style="text-align:center;">
    <div style="font-size:9.5px;font-weight:900;color:#1D4ED8;">S2</div>
    <div style="font-size:9px;font-weight:800;color:#0F172A;line-height:1.1;">CONTEXT RETRIEVAL</div>
    <div style="font-size:7px;color:#64748B;margin-top:2px;">RAG Search +<br>Knowledge Sources</div>
  </div>`;
  rect("state_s2", s2Html, 675, 155, 125, 65, "fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=1.5;align=center;verticalAlign=middle;");

  // S3 LLM GENERATION (x: 900, y: 155, w: 125, h: 65)
  const s3Html = `<div style="text-align:center;">
    <div style="font-size:9.5px;font-weight:900;color:#1D4ED8;">S3</div>
    <div style="font-size:9px;font-weight:800;color:#0F172A;line-height:1.1;">LLM GENERATION</div>
    <div style="font-size:7px;color:#64748B;margin-top:2px;">Generate Draft Answer<br>(With Citations)</div>
  </div>`;
  rect("state_s3", s3Html, 900, 155, 125, 65, "fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=1.5;align=center;verticalAlign=middle;");

  // S4 GUARDRAIL CHECK (x: 1115, y: 155, w: 125, h: 65)
  const s4Html = `<div style="text-align:center;">
    <div style="font-size:9.5px;font-weight:900;color:#C2410C;">S4</div>
    <div style="font-size:9px;font-weight:800;color:#0F172A;line-height:1.1;">GUARDRAIL CHECK</div>
    <div style="font-size:7px;color:#64748B;margin-top:2px;">Policy, Safety &amp; Quality<br>Validation</div>
  </div>`;
  rect("state_s4", s4Html, 1115, 155, 125, 65, "fillColor=#FFF7ED;strokeColor=#EA580C;strokeWidth=1.5;align=center;verticalAlign=middle;");

  // Top Row Connectors (Laser straight at y: 187)
  edge("e_s0_s1", "E1\nSubmit Question", 350, 187, 450, 187, "#0F172A");
  edge("e_s1_s2", "E2\nFetch Context", 575, 187, 675, 187, "#0F172A");
  edge("e_s2_s3", "E3\nGenerate Response", 800, 187, 900, 187, "#0F172A");
  edge("e_s3_s4", "E4\nRun Guardrails", 1025, 187, 1115, 187, "#0F172A");

  // -------------------------------------------------------------------------
  // GUARDRAIL BRANCHES (RIGHT COLUMN: S4a, S4b, SF)
  // -------------------------------------------------------------------------
  // S4a GUARDRAIL FAILED (x: 1115, y: 320, w: 125, h: 65)
  const s4aHtml = `<div style="text-align:center;">
    <div style="font-size:9.5px;font-weight:900;color:#C2410C;">S4a</div>
    <div style="font-size:9px;font-weight:800;color:#0F172A;line-height:1.1;">GUARDRAIL FAILED</div>
    <div style="font-size:7px;color:#64748B;margin-top:2px;">Violation Detected</div>
  </div>`;
  rect("state_s4a", s4aHtml, 1115, 320, 125, 65, "fillColor=#FFF7ED;strokeColor=#EA580C;strokeWidth=1.5;align=center;verticalAlign=middle;");

  // S4b AUTOMATED ACTION (x: 1115, y: 440, w: 125, h: 65)
  const s4bHtml = `<div style="text-align:center;">
    <div style="font-size:9.5px;font-weight:900;color:#6D28D9;">S4b</div>
    <div style="font-size:9px;font-weight:800;color:#0F172A;line-height:1.1;">AUTOMATED ACTION</div>
    <div style="font-size:7px;color:#64748B;margin-top:2px;">Redact / Block /<br>Suggest Revision</div>
  </div>`;
  rect("state_s4b", s4bHtml, 1115, 440, 125, 65, "fillColor=#FAF5FF;strokeColor=#7C3AED;strokeWidth=1.5;align=center;verticalAlign=middle;");

  // SF FAILED / BLOCKED (x: 1115, y: 560, w: 125, h: 60)
  const sfHtml = `<div style="text-align:center;">
    <div style="font-size:9.5px;font-weight:900;color:#B91C1C;">SF</div>
    <div style="font-size:9px;font-weight:800;color:#0F172A;line-height:1.1;">FAILED / BLOCKED</div>
    <div style="font-size:7px;color:#64748B;margin-top:2px;">Response Not Delivered<br>(To User)</div>
  </div>`;
  rect("state_sf", sfHtml, 1115, 560, 125, 60, "fillColor=#FEF2F2;strokeColor=#DC2626;strokeWidth=1.5;align=center;verticalAlign=middle;");

  // Connectors for Guardrail branch
  edge("e_s4_s4a", "Fail", 1177, 220, 1177, 320, "#DC2626");
  edge("e_s4a_s4b", "", 1177, 385, 1177, 440, "#0F172A");
  edge("e_s4b_sf", "", 1177, 505, 1177, 560, "#DC2626");

  // -------------------------------------------------------------------------
  // MIDDLE ROW: S7, S6, S5
  // -------------------------------------------------------------------------
  // S5 HUMAN REVIEW (x: 730, y: 320, w: 140, h: 65)
  const s5Html = `<div style="text-align:center;">
    <div style="font-size:9.5px;font-weight:900;color:#6D28D9;">S5</div>
    <div style="font-size:9px;font-weight:800;color:#0F172A;line-height:1.1;">HUMAN REVIEW</div>
    <div style="font-size:7px;color:#64748B;margin-top:2px;">Expert Review &amp;<br>Approval</div>
  </div>`;
  rect("state_s5", s5Html, 730, 320, 140, 65, "fillColor=#FAF5FF;strokeColor=#7C3AED;strokeWidth=1.5;align=center;verticalAlign=middle;");

  // S4 Pass -> S5 Human Review (Pass label positioned directly at exit x=1265)
  edge("e_s4_s5", "", 1240, 187, 800, 320, "#16A34A", false, "block", [[1290, 187], [1290, 265], [800, 265]]);
  text("lbl_pass", "<span style='font-size:8px;font-weight:900;color:#16A34A;background:#FFFFFF;border:1px solid #CBD5E1;padding:2px 4px;border-radius:2px;'>Pass</span>", 1250, 177, 36, 20, "align=center;verticalAlign=middle;");

  // S4b -> S5 Human Review (Dashed revision path through Open Channel 2 at y: 410)
  edge("e_s4b_s5", "", 1115, 460, 870, 355, "#64748B", true, "open", [[1050, 460], [1050, 355]]);

  // S6 REVIEW DECISION (Rhombus) (x: 515, y: 320, w: 110, h: 65)
  const s6Html = `<div style="text-align:center;">
    <div style="font-size:8.5px;font-weight:900;color:#C2410C;">S6</div>
    <div style="font-size:8px;font-weight:800;color:#0F172A;line-height:1.05;">REVIEW DECISION</div>
    <div style="font-size:6.5px;color:#64748B;">Approved?</div>
  </div>`;
  c.push(`<mxCell id="state_s6" value="${E(s6Html)}" style="shape=rhombus;perimeter=rhombusPerimeter;whiteSpace=wrap;html=1;fillColor=#FFF7ED;strokeColor=#EA580C;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="515" y="320" width="110" height="65" as="geometry"/></mxCell>`);

  // Connector S5 -> S6
  edge("e_s5_s6", "E5\nReview Completed", 730, 352, 625, 352, "#0F172A");

  // S7 FINALIZE ANSWER (x: 250, y: 320, w: 130, h: 65)
  const s7Html = `<div style="text-align:center;">
    <div style="font-size:9.5px;font-weight:900;color:#1D4ED8;">S7</div>
    <div style="font-size:9px;font-weight:800;color:#0F172A;line-height:1.1;">FINALIZE ANSWER</div>
    <div style="font-size:7px;color:#64748B;margin-top:2px;">Format, Add Citations,<br>Finalize</div>
  </div>`;
  rect("state_s7", s7Html, 250, 320, 130, 65, "fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=1.5;align=center;verticalAlign=middle;");

  // Connector S6 -> S7 (Yes)
  edge("e_s6_s7", "Yes", 515, 352, 380, 352, "#16A34A");

  // Connector S6 -> S1 (No / Request Changes)
  edge("e_s6_s1", "No\n(Request Changes)", 570, 320, 512, 220, "#DC2626", true, "open", [[570, 260], [512, 260]]);

  // -------------------------------------------------------------------------
  // LEFT COLUMN DOWNWARD FLOW: S7 -> S8 -> S9 -> METRICS & ANALYTICS
  // -------------------------------------------------------------------------
  // S8 ANSWER DELIVERED (x: 250, y: 440, w: 130, h: 65)
  const s8Html = `<div style="text-align:center;">
    <div style="font-size:9.5px;font-weight:900;color:#15803D;">S8</div>
    <div style="font-size:9px;font-weight:800;color:#0F172A;line-height:1.1;">ANSWER DELIVERED</div>
    <div style="font-size:7px;color:#64748B;margin-top:2px;">Displayed to User</div>
  </div>`;
  rect("state_s8", s8Html, 250, 440, 130, 65, "fillColor=#F0FDF4;strokeColor=#16A34A;strokeWidth=1.5;align=center;verticalAlign=middle;");

  // Connector S7 -> S8
  edge("e_s7_s8", "E6\nDeliver Answer", 315, 385, 315, 440, "#16A34A");

  // S9 FEEDBACK CAPTURED (x: 250, y: 560, w: 130, h: 65)
  const s9Html = `<div style="text-align:center;">
    <div style="font-size:9.5px;font-weight:900;color:#1D4ED8;">S9</div>
    <div style="font-size:9px;font-weight:800;color:#0F172A;line-height:1.1;">FEEDBACK CAPTURED</div>
    <div style="font-size:7px;color:#64748B;margin-top:2px;">User Feedback Logged<br>(Rating / Comments)</div>
  </div>`;
  rect("state_s9", s9Html, 250, 560, 130, 65, "fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=1.5;align=center;verticalAlign=middle;");

  // Connector S8 -> S9
  edge("e_s8_s9", "E6\nFeedback", 315, 505, 315, 560, "#0F172A");

  // METRICS & ANALYTICS Cylinder (x: 450, y: 565, w: 140, h: 55)
  const metricsHtml = `<div style="text-align:center;">
    <div style="font-size:8.5px;font-weight:900;color:#0F2A4A;">METRICS &amp; ANALYTICS</div>
    <div style="font-size:7px;color:#64748B;margin-top:2px;">Usage, Quality, Accuracy,<br>Latency, Feedback</div>
  </div>`;
  c.push(`<mxCell id="metrics_cylinder" value="${E(metricsHtml)}" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=10;fillColor=#EFF6FF;strokeColor=#0284C7;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1"><mxGeometry x="450" y="565" width="140" height="55" as="geometry"/></mxCell>`);

  // Connector S9 -> METRICS
  edge("e_s9_metrics", "", 380, 592, 450, 592, "#0F172A");

  // -------------------------------------------------------------------------
  // TIMEOUT & ERROR STATES (ST, SE)
  // -------------------------------------------------------------------------
  // ST TIMEOUT (x: 680, y: 460, w: 120, h: 55)
  const stHtml = `<div style="text-align:center;">
    <div style="font-size:9.5px;font-weight:900;color:#B91C1C;">ST</div>
    <div style="font-size:9px;font-weight:800;color:#0F172A;line-height:1.1;">TIMEOUT</div>
    <div style="font-size:7px;color:#64748B;margin-top:2px;">SLA Breach</div>
  </div>`;
  rect("state_st", stHtml, 680, 460, 120, 55, "fillColor=#FEF2F2;strokeColor=#DC2626;strokeWidth=1.5;align=center;verticalAlign=middle;");

  // SE ERROR (x: 885, y: 460, w: 120, h: 55)
  const seHtml = `<div style="text-align:center;">
    <div style="font-size:9.5px;font-weight:900;color:#B91C1C;">SE</div>
    <div style="font-size:9px;font-weight:800;color:#0F172A;line-height:1.1;">ERROR</div>
    <div style="font-size:7px;color:#64748B;margin-top:2px;">System / Service<br>Failure</div>
  </div>`;
  rect("state_se", seHtml, 885, 460, 120, 55, "fillColor=#FEF2F2;strokeColor=#DC2626;strokeWidth=1.5;align=center;verticalAlign=middle;");

  // Connectors S5 -> ST, S5 -> SE
  edge("e_s5_st", "E7\nNo Action in Time", 760, 385, 740, 460, "#64748B", true, "open");
  edge("e_s5_se", "E8\nService Error", 840, 385, 945, 460, "#64748B", true, "open");

  // ALERTING & MONITORING Box (x: 710, y: 565, w: 265, h: 55)
  const alertHtml = `<div style="padding:4px;text-align:center;">
    <div style="font-size:8.5px;font-weight:900;color:#0F2A4A;margin-bottom:4px;">ALERTING &amp; MONITORING</div>
    <div style="display:flex;align-items:center;justify-content:space-around;font-size:7.5px;font-weight:700;color:#334155;">
      <div>📈 Cloud Monitoring</div>
      <div>📑 Cloud Logging</div>
      <div>🔔 Alerting (PagerDuty)</div>
    </div>
  </div>`;
  rect("alerting_box", alertHtml, 710, 565, 265, 55, "fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.2;align=center;verticalAlign=middle;");

  // ST -> Alerting, SE -> Alerting
  edge("e_st_alert", "", 740, 515, 775, 565, "#DC2626");
  edge("e_se_alert", "", 945, 515, 875, 565, "#DC2626");

  // Alerting -> METRICS & ANALYTICS (Dashed)
  edge("e_alert_metrics", "", 710, 592, 590, 592, "#64748B", true, "open");

  // =========================================================================
  // 5. BOTTOM 4 ANALYTICAL CARDS (y: 735, h: 200)
  // =========================================================================
  // Card 1: DATA & CONTEXT SOURCES (x: 20, w: 380)
  const card1Html = `<div style="padding:8px 10px;">
    <div style="font-size:10px;font-weight:900;color:#0F2A4A;border-bottom:1.5px solid #E2E8F0;padding-bottom:4px;letter-spacing:0.5px;text-align:center;">DATA &amp; CONTEXT SOURCES</div>
    <table style="width:100%;text-align:center;font-size:8px;font-weight:700;color:#1E293B;margin-top:8px;">
      <tr>
        <td style="padding:4px;width:25%;">
          <div style="font-size:18px;margin-bottom:2px;">🗄️</div>
          <div>Clinical Trials<br>Database</div>
        </td>
        <td style="padding:4px;width:25%;">
          <div style="font-size:18px;margin-bottom:2px;">📑</div>
          <div>Regulatory<br>Documents</div>
        </td>
        <td style="padding:4px;width:25%;">
          <div style="font-size:18px;margin-bottom:2px;">📖</div>
          <div>Scientific<br>Literature</div>
        </td>
        <td style="padding:4px;width:25%;">
          <div style="font-size:18px;margin-bottom:2px;">🗄️</div>
          <div>Internal<br>Knowledge Base</div>
        </td>
      </tr>
      <tr>
        <td style="padding:4px;">
          <div style="font-size:18px;margin-bottom:2px;">📑</div>
          <div>Study Protocols</div>
        </td>
        <td style="padding:4px;">
          <div style="font-size:18px;margin-bottom:2px;">📑</div>
          <div>SOPs &amp; Policies</div>
        </td>
        <td style="padding:4px;">
          <div style="font-size:18px;margin-bottom:2px;">💬</div>
          <div>Historical Q&amp;A</div>
        </td>
        <td style="padding:4px;">
          <div style="font-size:18px;margin-bottom:2px;">🌐</div>
          <div>External APIs</div>
        </td>
      </tr>
    </table>
  </div>`;
  rect("card_data_sources", card1Html, 20, 735, 380, 200, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // Card 2: TECHNOLOGY STACK (GOOGLE CLOUD) (x: 415, w: 395)
  const card2Html = `<div style="padding:8px 10px;">
    <div style="font-size:10px;font-weight:900;color:#0F2A4A;border-bottom:1.5px solid #E2E8F0;padding-bottom:4px;letter-spacing:0.5px;text-align:center;">TECHNOLOGY STACK (GOOGLE CLOUD)</div>
    <table style="width:100%;text-align:center;font-size:8px;font-weight:700;color:#1E293B;margin-top:8px;">
      <tr>
        <td style="padding:4px;width:25%;">
          <div style="font-size:18px;margin-bottom:2px;">🧠</div>
          <div>Vertex AI<br>(LLM &amp; RAG)</div>
        </td>
        <td style="padding:4px;width:25%;">
          <div style="font-size:18px;margin-bottom:2px;">📊</div>
          <div>BigQuery<br>(Vector Search)</div>
        </td>
        <td style="padding:4px;width:25%;">
          <div style="font-size:18px;margin-bottom:2px;">⚙️</div>
          <div>Dataproc<br>(Spark)</div>
        </td>
        <td style="padding:4px;width:25%;">
          <div style="font-size:18px;margin-bottom:2px;">🗄️</div>
          <div>Cloud Storage<br>(Artifacts)</div>
        </td>
      </tr>
      <tr>
        <td style="padding:4px;">
          <div style="font-size:18px;margin-bottom:2px;">⚙️</div>
          <div>Cloud Functions<br>(Orchestration)</div>
        </td>
        <td style="padding:4px;">
          <div style="font-size:18px;margin-bottom:2px;">🚀</div>
          <div>Cloud Run<br>(Services)</div>
        </td>
        <td style="padding:4px;">
          <div style="font-size:18px;margin-bottom:2px;">📡</div>
          <div>Pub/Sub<br>(Events)</div>
        </td>
        <td style="padding:4px;">
          <div style="font-size:18px;margin-bottom:2px;">🛡️</div>
          <div>Cloud Armor<br>(Guardrails)</div>
        </td>
      </tr>
    </table>
  </div>`;
  rect("card_tech_stack", card2Html, 415, 735, 395, 200, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // Card 3: NOTES (x: 825, w: 345)
  const card3Html = `<div style="padding:8px 10px;">
    <div style="font-size:10px;font-weight:900;color:#0F2A4A;border-bottom:1.5px solid #E2E8F0;padding-bottom:4px;letter-spacing:0.5px;">NOTES</div>
    <div style="font-size:8px;color:#334155;line-height:1.6;margin-top:8px;">
      <div>• Human-in-the-loop ensures scientific accuracy and compliance.</div>
      <div>• Guardrails enforce safety, privacy, and regulatory policies.</div>
      <div>• All transitions are logged for auditability and traceability.</div>
      <div>• Metrics feed continuous improvement and model evaluation.</div>
      <div>• Designed for GxP compliance and enterprise-grade reliability.</div>
    </div>
  </div>`;
  rect("card_notes", card3Html, 825, 735, 345, 200, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // Card 4: ABBREVIATIONS (x: 1185, w: 395)
  const card4Html = `<div style="padding:8px 10px;">
    <div style="font-size:10px;font-weight:900;color:#0F2A4A;border-bottom:1.5px solid #E2E8F0;padding-bottom:4px;letter-spacing:0.5px;">ABBREVIATIONS</div>
    <table style="width:100%;font-size:8px;color:#1E293B;line-height:1.6;margin-top:8px;">
      <tr>
        <td style="font-weight:900;width:55px;">RAG</td>
        <td>Retrieval Augmented Generation</td>
      </tr>
      <tr>
        <td style="font-weight:900;">PII</td>
        <td>Personally Identifiable Information</td>
      </tr>
      <tr>
        <td style="font-weight:900;">PHI</td>
        <td>Protected Health Information</td>
      </tr>
      <tr>
        <td style="font-weight:900;">GxP</td>
        <td>Good Practice (GCP, GLP, GMP)</td>
      </tr>
      <tr>
        <td style="font-weight:900;">SLA</td>
        <td>Service Level Agreement</td>
      </tr>
    </table>
  </div>`;
  rect("card_abbreviations", card4Html, 1185, 735, 395, 200, "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;");

  // =========================================================================
  // 6. FOOTER METADATA
  // =========================================================================
  text("footer_version", "<span style='font-size:9px;color:#64748B;font-weight:600;'>Version: 1.0</span>", 20, 950, 200, 20, "align=left;");
  text("footer_date", "<span style='font-size:9px;color:#64748B;font-weight:600;'>Date: May 2024</span>", 1400, 950, 180, 20, "align=right;");

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_12_state_machine" name="Template 12: State Machine Diagram">
    <mxGraphModel dx="1600" dy="1000" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="980" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${c.join("\n        ")}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
