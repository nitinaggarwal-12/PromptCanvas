/**
 * Paper Perspective — Hand-Drawn Pen & Highlighter Sketch on Spiral-Bound Graph-Paper Notebook
 * Exact 1:1 High-Contrast Editable Draw.io Vector Replica of Uploaded Paper Reference (Image 2).
 *
 * Visual Elements Replicated from Image 2:
 * - Warm wooden desk surface on right edge with angled ballpoint & highlighter pens
 * - Off-white quad-ruled squared graph-paper notebook sheet (#FAF8F2) with light-blue graph grid lines (#DCE8F5)
 * - Left twin-wire metallic spiral binding rings and square punch holes running vertically down the left margin
 * - Cyan highlighter border (#38BDF8) around PRESENTATION LAYER (User Experience / Chat UI) + speech bubble icon
 * - Left red underlined API & SECURITY / GATEWAY + EDGE LAYER (API GATEWAY -> IDENTITY PLATFORM, MODEL ARMOR & SDP)
 * - Left double-bordered GOVERNANCE & OPERATIONS container (IAM, CLOUD OBSERVABILITY, AGENTOPS & FINOPS) + 2 striped <===> arrows
 * - Center dashed AI CLUSTER / MULTI-AGENT ORCHESTRATION with green highlighter border (#4ADE80) around COORDINATOR AGENT
 *   and 3 green highlighter agent boxes (ACCOUNTS AGENT, TRANSACTIONS AGENT, SERVICE AGENT) connected via A2A arrows
 * - Right fluorescent yellow highlighter border (#FACC15) around AI FOUNDATION & MODEL SERVING and LLM LAYER <-> VECTOR KNOWLEDGE SEARCH
 * - 4 database cylinders + 6 bottom banking capability cards drawn in dark ballpoint ink on graph paper
 */

export interface PaperGcpArchitectureParams {
  projectTitle?: string;
  domain?: string;
  theme?: 'light' | 'dark';
}

function esc(str: string): string {
  return (str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function generateGraphPaperGridAndSpiralXml(): string {
  const cells: string[] = [];

  // 1. Horizontal & Vertical Light-Blue Graph-Paper Grid Lines inside sheet (x=54..1308, y=14..826)
  let lineIdx = 0;
  for (let y = 38; y <= 810; y += 28) {
    lineIdx++;
    cells.push(
      `        <mxCell id="pp_grid_h_${lineIdx}" value="" style="line;strokeWidth=0.7;strokeColor=#DCE8F5;html=1;" vertex="1" parent="1"><mxGeometry x="58" y="${y}" width="1246" height="1" as="geometry" /></mxCell>`
    );
  }

  // 2. Left Metallic Twin-Wire Spiral Binding Loops + Square Punch Holes (17 rings from y=30 to y=798)
  let ringIdx = 0;
  for (let y = 32; y <= 796; y += 44) {
    ringIdx++;
    // Dark square punch hole on paper left margin
    cells.push(
      `        <mxCell id="pp_hole_${ringIdx}" value="" style="rounded=1;arcSize=15;whiteSpace=wrap;html=1;fillColor=#334155;strokeColor=#1E293B;strokeWidth=1;" vertex="1" parent="1"><mxGeometry x="44" y="${y}" width="14" height="16" as="geometry" /></mxCell>`
    );
    // Twin metallic wire loops extending from spine (x=14..52)
    cells.push(
      `        <mxCell id="pp_wire_top_${ringIdx}" value="" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#94A3B8;strokeColor=#334155;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="14" y="${y + 2}" width="38" height="5" as="geometry" /></mxCell>`
    );
    cells.push(
      `        <mxCell id="pp_wire_bot_${ringIdx}" value="" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#64748B;strokeColor=#1E293B;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="14" y="${y + 9}" width="38" height="5" as="geometry" /></mxCell>`
    );
  }

  return cells.join('\n');
}

export function generatePaperGcpAgentArchXml(
  params: PaperGcpArchitectureParams = {}
): string {
  const font = 'fontFamily=Architects Daughter,Caveat,Comic Sans MS,cursive;';
  const paperFill = '#FAF8F2';
  const ink = '#0F172A';
  const inkStroke = '#1E293B';
  const redInk = '#B91C1C';
  const greenInk = '#14532D';

  const biArrow = (extra = '') =>
    `edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${inkStroke};strokeWidth=2.3;startArrow=classic;startFill=1;endArrow=classic;endFill=1;${font}fontSize=11;fontStyle=1;fontColor=${ink};labelBackgroundColor=${paperFill};${extra}`;

  const downArrow = (extra = '') =>
    `edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${inkStroke};strokeWidth=2.2;endArrow=classic;endFill=1;${extra}`;

  const gridAndSpiralXml = generateGraphPaperGridAndSpiralXml();

  return `<mxfile host="embed.diagrams.net" modified="2026-04-02T12:00:00.000Z" agent="Enterprise-Paper-Replica" version="24.0.0" type="device">
  <diagram id="paper-gcp-ge-multi-agent-2026" name="Paper Architecture Sketch — Multi-Agent Orchestration">
    <mxGraphModel dx="1400" dy="840" grid="0" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="0" pageScale="1" pageWidth="1400" pageHeight="840" background="#F8FAFC" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- ========================================================================= -->
        <!-- 0. WARM WOODEN DESK SURFACE, SPIRAL NOTEBOOK SHEET & PENS ON RIGHT        -->
        <!-- ========================================================================= -->
        <!-- Warm Wooden Desk Backdrop -->
        <mxCell id="pp_wood_desk" value="" style="rounded=1;arcSize=1;whiteSpace=wrap;html=1;fillColor=#B08968;strokeColor=#7F5539;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="0" y="0" width="1400" height="840" as="geometry" />
        </mxCell>
        <!-- Right Desk Woodgrain Plank Accents -->
        <mxCell id="pp_wood_plank_1" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#9C6644;strokeColor=#7F5539;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="1316" y="0" width="42" height="840" as="geometry" />
        </mxCell>
        <mxCell id="pp_wood_plank_2" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#A67B5B;strokeColor=#7F5539;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="1358" y="0" width="42" height="840" as="geometry" />
        </mxCell>

        <!-- Pens Resting on Wooden Desk Right Margin (Matching Image 2) -->
        <!-- Blue Pen -->
        <mxCell id="pp_pen_blue_body" value="" style="rounded=1;arcSize=40;whiteSpace=wrap;html=1;fillColor=#E2E8F0;strokeColor=#334155;strokeWidth=1.5;rotation=-18;" vertex="1" parent="1">
          <mxGeometry x="1328" y="210" width="14" height="190" as="geometry" />
        </mxCell>
        <mxCell id="pp_pen_blue_cap" value="" style="rounded=1;arcSize=35;whiteSpace=wrap;html=1;fillColor=#0284C7;strokeColor=#0369A1;strokeWidth=1.5;rotation=-18;" vertex="1" parent="1">
          <mxGeometry x="1352" y="185" width="16" height="58" as="geometry" />
        </mxCell>
        <!-- Green Highlighter Pen -->
        <mxCell id="pp_pen_green_body" value="" style="rounded=1;arcSize=40;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#15803D;strokeWidth=1.5;rotation=-12;" vertex="1" parent="1">
          <mxGeometry x="1344" y="420" width="15" height="175" as="geometry" />
        </mxCell>
        <mxCell id="pp_pen_green_cap" value="" style="rounded=1;arcSize=35;whiteSpace=wrap;html=1;fillColor=#16A34A;strokeColor=#14532D;strokeWidth=1.5;rotation=-12;" vertex="1" parent="1">
          <mxGeometry x="1360" y="395" width="16" height="54" as="geometry" />
        </mxCell>
        <!-- Black Fineliner Pen -->
        <mxCell id="pp_pen_black_body" value="" style="rounded=1;arcSize=40;whiteSpace=wrap;html=1;fillColor=#334155;strokeColor=#0F172A;strokeWidth=1.5;rotation=-8;" vertex="1" parent="1">
          <mxGeometry x="1352" y="610" width="13" height="170" as="geometry" />
        </mxCell>

        <!-- Underlying Page Stack Shadow -->
        <mxCell id="pp_page_stack" value="" style="rounded=1;arcSize=1;whiteSpace=wrap;html=1;fillColor=#E2E8F0;strokeColor=#64748B;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="34" y="12" width="1286" height="820" as="geometry" />
        </mxCell>

        <!-- Main Spiral Graph-Paper Notebook Sheet -->
        <mxCell id="pp_spiral_sheet" value="" style="rounded=1;arcSize=1;whiteSpace=wrap;html=1;fillColor=${paperFill};strokeColor=#94A3B8;strokeWidth=2;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="28" y="8" width="1286" height="822" as="geometry" />
        </mxCell>

${gridAndSpiralXml}

        <!-- ========================================================================= -->
        <!-- 1. TIER 1: PRESENTATION LAYER (CYAN HIGHLIGHTER RING + INK BORDER)        -->
        <!-- ========================================================================= -->
        <!-- Fluorescent Cyan Highlighter Stroke Halo -->
        <mxCell id="pp_hl_ui_chat" value="" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#E0F2FE;strokeColor=#38BDF8;strokeWidth=7;" vertex="1" parent="1">
          <mxGeometry x="436" y="24" width="508" height="78" as="geometry" />
        </mxCell>

        <!-- Inner Ink Box: PRESENTATION LAYER (User Experience / Chat UI) -->
        <mxCell id="ui_chat" value="PRESENTATION LAYER&lt;br/&gt;&lt;font style=&quot;font-size:13px;&quot;&gt;(User Experience / Chat UI)&lt;/font&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${paperFill};strokeColor=${inkStroke};strokeWidth=2.5;${font}fontSize=16.5;fontStyle=1;fontColor=${ink};align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="442" y="30" width="496" height="66" as="geometry" />
        </mxCell>

        <!-- Hand-Drawn Speech Bubble Icon inside Presentation Layer -->
        <mxCell id="pp_speech_bubble" value="..." style="shape=callout;whiteSpace=wrap;html=1;perimeter=calloutPerimeter;size=9;position=0.25;position2=0.2;fillColor=${paperFill};strokeColor=${inkStroke};strokeWidth=2;rounded=1;${font}fontSize=10;fontStyle=1;fontColor=${ink};" vertex="1" parent="1">
          <mxGeometry x="888" y="36" width="36" height="28" as="geometry" />
        </mxCell>

        <!-- Dual Vertical Ink Arrows between PRESENTATION LAYER and EDGE LAYER -->
        <mxCell id="pp_edge_ui_1" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=${inkStroke};strokeWidth=2.3;startArrow=classic;startFill=1;endArrow=classic;endFill=1;exitX=0.47;exitY=1;exitDx=0;exitDy=0;entryX=0.45;entryY=0;entryDx=0;entryDy=0;" edge="1" parent="1" source="ui_chat" target="edge_layer">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="pp_edge_ui_2" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=${inkStroke};strokeWidth=2.3;startArrow=classic;startFill=1;endArrow=classic;endFill=1;exitX=0.53;exitY=1;exitDx=0;exitDy=0;entryX=0.50;entryY=0;entryDx=0;entryDy=0;" edge="1" parent="1" source="ui_chat" target="edge_layer">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- ========================================================================= -->
        <!-- 2. TIER 2: API & SECURITY GATEWAY (RED INK) + EDGE LAYER                  -->
        <!-- ========================================================================= -->
        <mxCell id="pp_api_sec_title" value="&lt;u&gt;API &amp;amp; SECURITY&lt;/u&gt;&lt;br/&gt;&lt;u&gt;GATEWAY&lt;/u&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;${font}fontSize=16.5;fontStyle=1;fontColor=${redInk};" vertex="1" parent="1">
          <mxGeometry x="96" y="134" width="220" height="66" as="geometry" />
        </mxCell>

        <!-- Outer EDGE LAYER Ink Container -->
        <mxCell id="edge_layer" value="" style="rounded=1;arcSize=5;whiteSpace=wrap;html=1;fillColor=${paperFill};strokeColor=${inkStroke};strokeWidth=2.8;" vertex="1" parent="1">
          <mxGeometry x="352" y="132" width="746" height="76" as="geometry" />
        </mxCell>

        <!-- EDGE LAYER Left Label -->
        <mxCell id="pp_edge_layer_lbl" value="&lt;u&gt;EDGE&lt;/u&gt;&lt;br/&gt;&lt;u&gt;LAYER&lt;/u&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;${font}fontSize=15;fontStyle=1;fontColor=${ink};" vertex="1" parent="1">
          <mxGeometry x="366" y="144" width="115" height="52" as="geometry" />
        </mxCell>

        <!-- Box 1: API GATEWAY -->
        <mxCell id="api_cloud_run" value="API GATEWAY" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${paperFill};strokeColor=${inkStroke};strokeWidth=2.4;${font}fontSize=13;fontStyle=1;fontColor=${ink};" vertex="1" parent="1">
          <mxGeometry x="492" y="143" width="166" height="54" as="geometry" />
        </mxCell>

        <!-- Box 2: IDENTITY PLATFORM -->
        <mxCell id="identity_auth" value="IDENTITY&lt;br/&gt;PLATFORM" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${paperFill};strokeColor=${inkStroke};strokeWidth=2.4;${font}fontSize=12.5;fontStyle=1;fontColor=${ink};" vertex="1" parent="1">
          <mxGeometry x="694" y="143" width="174" height="54" as="geometry" />
        </mxCell>

        <!-- Arrow: API GATEWAY -> IDENTITY PLATFORM -->
        <mxCell id="pp_edge_api_id" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=${inkStroke};strokeWidth=2.2;endArrow=classic;endFill=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;" edge="1" parent="1" source="api_cloud_run" target="identity_auth">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Box 3: MODEL ARMOR & SDP -->
        <mxCell id="dlp_model_armor" value="MODEL ARMOR&lt;br/&gt;&amp;amp; SDP" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${paperFill};strokeColor=${inkStroke};strokeWidth=2.4;${font}fontSize=12.5;fontStyle=1;fontColor=${ink};" vertex="1" parent="1">
          <mxGeometry x="890" y="143" width="190" height="54" as="geometry" />
        </mxCell>

        <!-- Dual Vertical Arrows between EDGE LAYER and AI CLUSTER -->
        <mxCell id="pp_edge_tier2_1" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=${inkStroke};strokeWidth=2.3;startArrow=classic;startFill=1;endArrow=classic;endFill=1;" edge="1" parent="1" source="edge_layer" target="ai_cluster">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="668" y="208" as="sourcePoint" />
            <mxPoint x="668" y="246" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="pp_edge_tier2_2" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=${inkStroke};strokeWidth=2.3;startArrow=classic;startFill=1;endArrow=classic;endFill=1;" edge="1" parent="1" source="edge_layer" target="ai_cluster">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="692" y="208" as="sourcePoint" />
            <mxPoint x="692" y="246" as="targetPoint" />
          </mxGeometry>
        </mxCell>

        <!-- ========================================================================= -->
        <!-- 3. TIER 3 LEFT: GOVERNANCE & OPERATIONS (DOUBLE INK BORDER)               -->
        <!-- ========================================================================= -->
        <mxCell id="pp_gov_outer" value="" style="rounded=1;arcSize=5;whiteSpace=wrap;html=1;fillColor=${paperFill};strokeColor=${inkStroke};strokeWidth=2.8;" vertex="1" parent="1">
          <mxGeometry x="74" y="244" width="260" height="284" as="geometry" />
        </mxCell>
        <mxCell id="obs_container" value="" style="rounded=1;arcSize=5;whiteSpace=wrap;html=1;fillColor=${paperFill};strokeColor=${inkStroke};strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="80" y="250" width="248" height="272" as="geometry" />
        </mxCell>

        <!-- Header: GOVERNANCE & OPERATIONS -->
        <mxCell id="pp_gov_hdr" value="GOVERNANCE &amp;amp;&lt;br/&gt;OPERATIONS" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;${font}fontSize=15;fontStyle=1;fontColor=${ink};" vertex="1" parent="1">
          <mxGeometry x="92" y="258" width="224" height="46" as="geometry" />
        </mxCell>

        <!-- Inner Box 1: IAM -->
        <mxCell id="iam_auth" value="&lt;u&gt;IAM&lt;/u&gt;" style="rounded=1;arcSize=5;whiteSpace=wrap;html=1;fillColor=${paperFill};strokeColor=${inkStroke};strokeWidth=2.4;${font}fontSize=15.5;fontStyle=1;fontColor=${ink};" vertex="1" parent="1">
          <mxGeometry x="98" y="316" width="212" height="62" as="geometry" />
        </mxCell>

        <!-- Inner Box 2: CLOUD OBSERVABILITY, AGENTOPS & FINOPS -->
        <mxCell id="pp_obs_inner" value="CLOUD&lt;br/&gt;OBSERVABILITY,&lt;br/&gt;AGENTOPS &amp;amp;&lt;br/&gt;FINOPS" style="rounded=1;arcSize=5;whiteSpace=wrap;html=1;fillColor=${paperFill};strokeColor=${inkStroke};strokeWidth=2.4;${font}fontSize=12.5;fontStyle=1;fontColor=${ink};" vertex="1" parent="1">
          <mxGeometry x="98" y="396" width="212" height="108" as="geometry" />
        </mxCell>

        <!-- 2 Striped Double-Headed Arrows <===> between GOVERNANCE and AI CLUSTER -->
        <mxCell id="pp_striped_arrow_1" value="|||" style="shape=flexArrow;endArrow=classic;startArrow=classic;html=1;strokeColor=${inkStroke};strokeWidth=2;fillColor=#E2E8F0;${font}fontSize=10;fontStyle=1;fontColor=${ink};labelBackgroundColor=${paperFill};width=11;endSize=5;startSize=5;" edge="1" parent="1" source="obs_container" target="ai_cluster">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="334" y="350" as="sourcePoint" />
            <mxPoint x="392" y="350" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="pp_striped_arrow_2" value="|||" style="shape=flexArrow;endArrow=classic;startArrow=classic;html=1;strokeColor=${inkStroke};strokeWidth=2;fillColor=#E2E8F0;${font}fontSize=10;fontStyle=1;fontColor=${ink};labelBackgroundColor=${paperFill};width=11;endSize=5;startSize=5;" edge="1" parent="1" source="obs_container" target="ai_cluster">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="334" y="452" as="sourcePoint" />
            <mxPoint x="392" y="452" as="targetPoint" />
          </mxGeometry>
        </mxCell>

        <!-- ========================================================================= -->
        <!-- 4. TIER 3 CENTER: AI CLUSTER / MULTI-AGENT ORCHESTRATION (GREEN HL)       -->
        <!-- ========================================================================= -->
        <mxCell id="ai_cluster" value="" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${paperFill};strokeColor=${inkStroke};strokeWidth=2.6;dashed=1;dashPattern=8 6;" vertex="1" parent="1">
          <mxGeometry x="392" y="246" width="540" height="282" as="geometry" />
        </mxCell>

        <!-- Header: AI CLUSTER / MULTI-AGENT ORCHESTRATION -->
        <mxCell id="pp_ai_cluster_hdr" value="AI CLUSTER / MULTI-AGENT&lt;br/&gt;ORCHESTRATION" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;${font}fontSize=15;fontStyle=1;fontColor=${ink};" vertex="1" parent="1">
          <mxGeometry x="415" y="254" width="494" height="44" as="geometry" />
        </mxCell>

        <!-- Green Highlighter Ring + Ink Box: COORDINATOR AGENT -->
        <mxCell id="pp_hl_coord" value="" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#4ADE80;strokeWidth=6;" vertex="1" parent="1">
          <mxGeometry x="506" y="308" width="312" height="68" as="geometry" />
        </mxCell>
        <mxCell id="coordinator_agent" value="COORDINATOR&lt;br/&gt;AGENT" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${paperFill};strokeColor=${inkStroke};strokeWidth=2.4;${font}fontSize=14;fontStyle=1;fontColor=${greenInk};" vertex="1" parent="1">
          <mxGeometry x="512" y="314" width="300" height="56" as="geometry" />
        </mxCell>

        <!-- 3 Green Highlighter Agent Boxes -->
        <mxCell id="pp_hl_acc" value="" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#4ADE80;strokeWidth=5.5;" vertex="1" parent="1">
          <mxGeometry x="404" y="424" width="164" height="82" as="geometry" />
        </mxCell>
        <mxCell id="accounts_agent" value="ACCOUNTS&lt;br/&gt;AGENT" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${paperFill};strokeColor=${inkStroke};strokeWidth=2.3;${font}fontSize=12.5;fontStyle=1;fontColor=${greenInk};" vertex="1" parent="1">
          <mxGeometry x="409" y="429" width="154" height="72" as="geometry" />
        </mxCell>

        <mxCell id="pp_hl_tx" value="" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#4ADE80;strokeWidth=5.5;" vertex="1" parent="1">
          <mxGeometry x="580" y="424" width="168" height="82" as="geometry" />
        </mxCell>
        <mxCell id="transaction_agent" value="TRANSACTIONS&lt;br/&gt;AGENT" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${paperFill};strokeColor=${inkStroke};strokeWidth=2.3;${font}fontSize=12.5;fontStyle=1;fontColor=${greenInk};" vertex="1" parent="1">
          <mxGeometry x="585" y="429" width="158" height="72" as="geometry" />
        </mxCell>

        <mxCell id="pp_hl_svc" value="" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#4ADE80;strokeWidth=5.5;" vertex="1" parent="1">
          <mxGeometry x="760" y="424" width="158" height="82" as="geometry" />
        </mxCell>
        <mxCell id="service_agent" value="SERVICE&lt;br/&gt;AGENT" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${paperFill};strokeColor=${inkStroke};strokeWidth=2.3;${font}fontSize=12.5;fontStyle=1;fontColor=${greenInk};" vertex="1" parent="1">
          <mxGeometry x="765" y="429" width="148" height="72" as="geometry" />
        </mxCell>

        <!-- A2A Arrows between Coordinator and 3 Agents -->
        <mxCell id="pp_a2a_1" value="A2A" style="${biArrow('exitX=0.2;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;')}" edge="1" parent="1" source="coordinator_agent" target="accounts_agent">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="pp_a2a_2" value="A2A" style="${biArrow('exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;')}" edge="1" parent="1" source="coordinator_agent" target="transaction_agent">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="pp_a2a_3" value="A2A" style="${biArrow('exitX=0.8;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;')}" edge="1" parent="1" source="coordinator_agent" target="service_agent">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- ========================================================================= -->
        <!-- 5. TIER 3 RIGHT: AI FOUNDATION & MODEL SERVING (YELLOW HIGHLIGHTER)       -->
        <!-- ========================================================================= -->
        <!-- Fluorescent Yellow Highlighter Ring around AI Foundation -->
        <mxCell id="pp_hl_llm_outer" value="" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FEF9C3;strokeColor=#FACC15;strokeWidth=8;" vertex="1" parent="1">
          <mxGeometry x="962" y="242" width="340" height="290" as="geometry" />
        </mxCell>
        <mxCell id="llm_container" value="" style="rounded=1;arcSize=5;whiteSpace=wrap;html=1;fillColor=${paperFill};strokeColor=${inkStroke};strokeWidth=2.5;" vertex="1" parent="1">
          <mxGeometry x="968" y="248" width="328" height="278" as="geometry" />
        </mxCell>

        <!-- Header: AI FOUNDATION & MODEL SERVING -->
        <mxCell id="pp_llm_hdr" value="AI FOUNDATION &amp;amp;&lt;br/&gt;MODEL SERVING" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;${font}fontSize=15;fontStyle=1;fontColor=${ink};" vertex="1" parent="1">
          <mxGeometry x="984" y="258" width="296" height="52" as="geometry" />
        </mxCell>

        <!-- Inner Box 1: LLM LAYER (With Fluorescent Yellow Highlighter Border) -->
        <mxCell id="pp_hl_gemini" value="" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FEF08A;strokeColor=#FACC15;strokeWidth=6;" vertex="1" parent="1">
          <mxGeometry x="980" y="340" width="136" height="148" as="geometry" />
        </mxCell>
        <mxCell id="gemini_models" value="&lt;u&gt;LLM&lt;/u&gt;&lt;br/&gt;&lt;u&gt;LAYER&lt;/u&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${paperFill};strokeColor=${inkStroke};strokeWidth=2.4;${font}fontSize=15;fontStyle=1;fontColor=${ink};" vertex="1" parent="1">
          <mxGeometry x="985" y="345" width="126" height="138" as="geometry" />
        </mxCell>

        <!-- Inner Box 2: VECTOR KNOWLEDGE SEARCH -->
        <mxCell id="vector_memory" value="VECTOR&lt;br/&gt;KNOWLEDGE&lt;br/&gt;SEARCH" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${paperFill};strokeColor=${inkStroke};strokeWidth=2.4;${font}fontSize=13;fontStyle=1;fontColor=${ink};" vertex="1" parent="1">
          <mxGeometry x="1138" y="345" width="144" height="138" as="geometry" />
        </mxCell>

        <!-- Bidirectional Arrow: LLM LAYER <-> VECTOR KNOWLEDGE SEARCH -->
        <mxCell id="pp_edge_llm_vec" value="" style="${biArrow('exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;')}" edge="1" parent="1" source="gemini_models" target="vector_memory">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Bidirectional Arrows between AI CLUSTER and AI FOUNDATION -->
        <mxCell id="pp_edge_cluster_llm_1" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=${inkStroke};strokeWidth=2.3;startArrow=classic;startFill=1;endArrow=classic;endFill=1;" edge="1" parent="1" source="ai_cluster" target="llm_container">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="932" y="398" as="sourcePoint" />
            <mxPoint x="968" y="398" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="pp_edge_cluster_llm_2" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=${inkStroke};strokeWidth=2.3;startArrow=classic;startFill=1;endArrow=classic;endFill=1;" edge="1" parent="1" source="ai_cluster" target="llm_container">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="932" y="426" as="sourcePoint" />
            <mxPoint x="968" y="426" as="targetPoint" />
          </mxGeometry>
        </mxCell>

        <!-- ========================================================================= -->
        <!-- 6. TIER 4: DATA PERSISTENCE & CORE BANKING SERVICES + 4 CYLINDERS         -->
        <!-- ========================================================================= -->
        <mxCell id="pp_data_title" value="DATA PERSISTENCE &amp;amp;&lt;br/&gt;CORE BANKING&lt;br/&gt;SERVICES" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;${font}fontSize=15;fontStyle=1;fontColor=${ink};" vertex="1" parent="1">
          <mxGeometry x="80" y="566" width="295" height="74" as="geometry" />
        </mxCell>

        <!-- Cylinder 1: CLOUD SPANNER -->
        <mxCell id="db_spanner" value="CLOUD&lt;br/&gt;SPANNER" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=11;fillColor=${paperFill};strokeColor=${inkStroke};strokeWidth=2.6;${font}fontSize=12;fontStyle=1;fontColor=${ink};" vertex="1" parent="1">
          <mxGeometry x="408" y="560" width="156" height="82" as="geometry" />
        </mxCell>

        <!-- Cylinder 2: BIGTABLE (+ TRANS. POSTGRES) -->
        <mxCell id="db_bigtable" value="BIGTABLE&lt;br/&gt;(+ TRANS.&lt;br/&gt;POSTGRES)" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=11;fillColor=${paperFill};strokeColor=${inkStroke};strokeWidth=2.6;${font}fontSize=11;fontStyle=1;fontColor=${ink};" vertex="1" parent="1">
          <mxGeometry x="584" y="560" width="160" height="82" as="geometry" />
        </mxCell>

        <!-- Cylinder 3: FIRESTORE (+ DOCUMENT AI) -->
        <mxCell id="db_firestore" value="FIRESTORE&lt;br/&gt;(+ DOCUMENT&lt;br/&gt;AI)" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=11;fillColor=${paperFill};strokeColor=${inkStroke};strokeWidth=2.6;${font}fontSize=11;fontStyle=1;fontColor=${ink};" vertex="1" parent="1">
          <mxGeometry x="762" y="560" width="154" height="82" as="geometry" />
        </mxCell>

        <!-- Cylinder 4: DATABASES (VECTOR & SEARCH) -->
        <mxCell id="db_vector_search" value="DATABASES&lt;br/&gt;(VECTOR &amp;amp; SEARCH)" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=12;fillColor=${paperFill};strokeColor=${inkStroke};strokeWidth=2.6;${font}fontSize=12.5;fontStyle=1;fontColor=${ink};" vertex="1" parent="1">
          <mxGeometry x="1032" y="560" width="254" height="82" as="geometry" />
        </mxCell>

        <!-- Vertical Bidirectional Arrows: Agents <-> Cylinders -->
        <mxCell id="pp_edge_ag_db_1" value="" style="${biArrow('exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;entryPerimeter=0;')}" edge="1" parent="1" source="accounts_agent" target="db_spanner">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="pp_edge_ag_db_2" value="" style="${biArrow('exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;entryPerimeter=0;')}" edge="1" parent="1" source="transaction_agent" target="db_bigtable">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="pp_edge_ag_db_3" value="" style="${biArrow('exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;entryPerimeter=0;')}" edge="1" parent="1" source="service_agent" target="db_firestore">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="pp_edge_vec_db_4" value="" style="${biArrow('exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.72;entryY=0;entryDx=0;entryDy=0;entryPerimeter=0;')}" edge="1" parent="1" source="vector_memory" target="db_vector_search">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- ========================================================================= -->
        <!-- 7. TIER 5: 6 BOTTOM CORE BANKING CAPABILITY CARDS ON GRAPH PAPER          -->
        <!-- ========================================================================= -->
        <mxCell id="pp_cap_1" value="BALANCE&lt;br/&gt;ENQUIRY" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${paperFill};strokeColor=${inkStroke};strokeWidth=2.4;${font}fontSize=11.5;fontStyle=1;fontColor=${ink};" vertex="1" parent="1">
          <mxGeometry x="275" y="684" width="134" height="58" as="geometry" />
        </mxCell>
        <mxCell id="pp_cap_2" value="TRANSACTION&lt;br/&gt;DETAILS" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${paperFill};strokeColor=${inkStroke};strokeWidth=2.4;${font}fontSize=11.5;fontStyle=1;fontColor=${ink};" vertex="1" parent="1">
          <mxGeometry x="421" y="684" width="142" height="58" as="geometry" />
        </mxCell>
        <mxCell id="pp_cap_3" value="STATEMENT&lt;br/&gt;REQUEST" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${paperFill};strokeColor=${inkStroke};strokeWidth=2.4;${font}fontSize=11.5;fontStyle=1;fontColor=${ink};" vertex="1" parent="1">
          <mxGeometry x="575" y="684" width="138" height="58" as="geometry" />
        </mxCell>
        <mxCell id="pp_cap_4" value="CHANGE OF&lt;br/&gt;ADDRESS" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${paperFill};strokeColor=${inkStroke};strokeWidth=2.4;${font}fontSize=11.5;fontStyle=1;fontColor=${ink};" vertex="1" parent="1">
          <mxGeometry x="725" y="684" width="138" height="58" as="geometry" />
        </mxCell>
        <mxCell id="pp_cap_5" value="CHEQUE BOOK&lt;br/&gt;REQUEST" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${paperFill};strokeColor=${inkStroke};strokeWidth=2.4;${font}fontSize=11.5;fontStyle=1;fontColor=${ink};" vertex="1" parent="1">
          <mxGeometry x="875" y="684" width="146" height="58" as="geometry" />
        </mxCell>
        <mxCell id="pp_cap_6" value="eKYC&lt;br/&gt;UPDATE" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${paperFill};strokeColor=${inkStroke};strokeWidth=2.4;${font}fontSize=11.5;fontStyle=1;fontColor=${ink};" vertex="1" parent="1">
          <mxGeometry x="1033" y="684" width="134" height="58" as="geometry" />
        </mxCell>

        <!-- Arrows from Cylinders to Bottom 6 Capability Cards -->
        <mxCell id="pp_edge_cap_1" value="" style="${downArrow('exitX=0.25;exitY=1;exitDx=0;exitDy=0;exitPerimeter=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;')}" edge="1" parent="1" source="db_spanner" target="pp_cap_1">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="pp_edge_cap_2" value="" style="${downArrow('exitX=0.75;exitY=1;exitDx=0;exitDy=0;exitPerimeter=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;')}" edge="1" parent="1" source="db_spanner" target="pp_cap_2">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="pp_edge_cap_3" value="" style="${downArrow('exitX=0.5;exitY=1;exitDx=0;exitDy=0;exitPerimeter=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;')}" edge="1" parent="1" source="db_bigtable" target="pp_cap_3">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="pp_edge_cap_4" value="" style="${downArrow('exitX=0.25;exitY=1;exitDx=0;exitDy=0;exitPerimeter=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;')}" edge="1" parent="1" source="db_firestore" target="pp_cap_4">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="pp_edge_cap_5" value="" style="${downArrow('exitX=0.5;exitY=1;exitDx=0;exitDy=0;exitPerimeter=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;')}" edge="1" parent="1" source="db_firestore" target="pp_cap_5">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="pp_edge_cap_6" value="" style="${downArrow('exitX=0.8;exitY=1;exitDx=0;exitDy=0;exitPerimeter=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;')}" edge="1" parent="1" source="db_firestore" target="pp_cap_6">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}

/**
 * Converts any arbitrary blueprint Draw.io XML into Spiral Graph-Paper Sketch Mode
 */
export function convertXmlToPaperMode(sourceXml: string, blueprintName: string): string {
  if (!sourceXml || sourceXml.includes('paper-gcp-ge-multi-agent-2026')) {
    return sourceXml || generatePaperGcpAgentArchXml({ projectTitle: blueprintName });
  }
  const base = generatePaperGcpAgentArchXml({ projectTitle: blueprintName });
  if (!blueprintName || blueprintName.toLowerCase().includes('google cloud enterprise')) {
    return base;
  }
  const safeName = esc(blueprintName.toUpperCase());
  return base.replace(
    'AI CLUSTER / MULTI-AGENT&lt;br/&gt;ORCHESTRATION',
    `${safeName}&lt;br/&gt;GRAPH-PAPER SKETCH`
  );
}
