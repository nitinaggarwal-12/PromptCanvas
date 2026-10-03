/**
 * Whiteboard Perspective — Hand-Drawn Dry-Erase Marker Architecture on Aluminum-Framed Whiteboard
 * Exact 1:1 High-Contrast Editable Draw.io Vector Replica of Uploaded Whiteboard Reference (Image 1).
 *
 * Visual Elements Replicated from Image 1:
 * - Brushed aluminum whiteboard frame with 4 dark charcoal corner mounting caps & bottom marker ledge holding 4 markers (2 black, 1 blue, 1 green)
 * - Handwritten dry-erase marker typography (Architects Daughter / Caveat / Comic Sans MS)
 * - Top blue marker box: PRESENTATION LAYER / USER EXPERIENCE (CHAT & CLIENT UI) + speech bubble doodle
 * - Left red double-underlined title: API & SECURITY / GATEWAY
 * - Tier 2 black marker container: EDGE LAYER with 3 blue marker boxes: API GATEWAY -> IDENTITY PLATFORM, MODEL ARMOR & SDP
 * - Left black double-border container: GOVERNANCE & OPERATIONS + 5-point star doodle ☆ + IAM + CLOUD OBSERVABILITY, AGENTOPS & FINOPS
 * - 2 striped double-headed block arrows <===> between GOVERNANCE & OPERATIONS and AI CLUSTER
 * - Center dashed container: AI CLUSTER / MULTI-AGENT INTELLIGENCE CORE (underlined) + green marker ORCHESTRATOR AGENT (COORDINATOR) + green ! exclamation mark
 * - 3 A2A bidirectional arrows to green marker boxes: ACCOUNTS AGENT, TRANSACTIONS AGENT, CUSTOMER SERVICE AGENT
 * - Right gold/ochre marker container: AI FOUNDATION & MODEL SERVING LAYER with LLM LAYER <-> VECTOR KNOWLEDGE SEARCH
 * - Bottom left label: DATA PERSISTENCE & CORE BANKING SERVICES
 * - 4 database cylinders: CLOUD SPANNER, BIGTABLE (+ TRANS. POSTGRES), FIRESTORE (+ DOCUMENT AI), DATABASES (VECTOR & SEARCH)
 * - 6 bottom banking capability cards: BALANCE ENQUIRY, TRANSACTION DETAILS, STATEMENT REQUEST, CHANGE OF ADDRESS, CHEQUE BOOK REQUEST, eKYC UPDATE
 */

export interface WhiteboardGcpArchitectureParams {
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

export function generateWhiteboardGcpAgentArchXml(
  params: WhiteboardGcpArchitectureParams = {}
): string {
  const font = 'fontFamily=Architects Daughter,Caveat,Comic Sans MS,cursive;';
  const blueInk = '#1E3A8A';
  const blueStroke = '#1D4ED8';
  const greenInk = '#14532D';
  const greenStroke = '#15803D';
  const goldInk = '#92400E';
  const goldStroke = '#B45309';
  const redInk = '#B91C1C';
  const blackInk = '#0F172A';
  const blackStroke = '#1E293B';

  const biArrow = (extra = '') =>
    `edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${blackStroke};strokeWidth=2.6;startArrow=classic;startFill=1;endArrow=classic;endFill=1;${font}fontSize=11;fontStyle=1;fontColor=${blackInk};labelBackgroundColor=#FFFFFF;${extra}`;

  const downArrow = (extra = '') =>
    `edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${blackStroke};strokeWidth=2.5;endArrow=classic;endFill=1;${extra}`;

  return `<mxfile host="PromptCanvas-Whiteboard-Engine" modified="2026-04-02T12:00:00.000Z" agent="PromptCanvas-Whiteboard-Replica" version="24.0.0" type="device">
  <diagram id="whiteboard-gcp-ge-multi-agent-2026" name="Whiteboard Architecture — Multi-Agent Intelligence Core">
    <mxGraphModel dx="1400" dy="840" grid="0" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="0" pageScale="1" pageWidth="1400" pageHeight="840" background="#F8FAFC" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- ========================================================================= -->
        <!-- 0. PHYSICAL ALUMINUM WHITEBOARD FRAME, CORNER CAPS & BOTTOM MARKER TRAY   -->
        <!-- ========================================================================= -->
        <!-- Outer Wall Backdrop -->
        <mxCell id="wb_wall_bg" value="" style="rounded=1;arcSize=1;whiteSpace=wrap;html=1;fillColor=#E2E8F0;strokeColor=#CBD5E1;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="0" y="0" width="1400" height="840" as="geometry" />
        </mxCell>

        <!-- Brushed Aluminum Whiteboard Frame -->
        <mxCell id="wb_aluminum_frame" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#CBD5E1;strokeColor=#64748B;strokeWidth=4;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="6" y="4" width="1388" height="818" as="geometry" />
        </mxCell>

        <!-- 4 Dark Charcoal Plastic Corner Caps (Authentic Whiteboard Hardware) -->
        <mxCell id="wb_corner_tl" value="" style="rounded=1;arcSize=15;whiteSpace=wrap;html=1;fillColor=#334155;strokeColor=#1E293B;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="6" y="4" width="34" height="34" as="geometry" />
        </mxCell>
        <mxCell id="wb_corner_tr" value="" style="rounded=1;arcSize=15;whiteSpace=wrap;html=1;fillColor=#334155;strokeColor=#1E293B;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="1360" y="4" width="34" height="34" as="geometry" />
        </mxCell>
        <mxCell id="wb_corner_bl" value="" style="rounded=1;arcSize=15;whiteSpace=wrap;html=1;fillColor=#334155;strokeColor=#1E293B;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="6" y="788" width="34" height="34" as="geometry" />
        </mxCell>
        <mxCell id="wb_corner_br" value="" style="rounded=1;arcSize=15;whiteSpace=wrap;html=1;fillColor=#334155;strokeColor=#1E293B;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="1360" y="788" width="34" height="34" as="geometry" />
        </mxCell>

        <!-- Inner Glossy Porcelain Whiteboard Surface -->
        <mxCell id="wb_frame_board" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="20" y="18" width="1360" height="790" as="geometry" />
        </mxCell>

        <!-- Bottom Aluminum Marker Ledge / Tray + 4 Dry-Erase Markers -->
        <mxCell id="wb_marker_tray" value="" style="rounded=1;arcSize=20;whiteSpace=wrap;html=1;fillColor=#94A3B8;strokeColor=#475569;strokeWidth=2;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="250" y="806" width="900" height="16" as="geometry" />
        </mxCell>
        <!-- Marker 1: Black Dry-Erase Marker -->
        <mxCell id="wb_marker_1_body" value="" style="rounded=1;arcSize=40;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#334155;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="340" y="797" width="82" height="9" as="geometry" />
        </mxCell>
        <mxCell id="wb_marker_1_cap" value="" style="rounded=1;arcSize=30;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#0F172A;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="418" y="796" width="26" height="10" as="geometry" />
        </mxCell>
        <!-- Marker 2: Black Dry-Erase Marker -->
        <mxCell id="wb_marker_2_body" value="" style="rounded=1;arcSize=40;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#334155;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="485" y="797" width="82" height="9" as="geometry" />
        </mxCell>
        <mxCell id="wb_marker_2_cap" value="" style="rounded=1;arcSize=30;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#0F172A;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="462" y="796" width="26" height="10" as="geometry" />
        </mxCell>
        <!-- Marker 3: Blue Dry-Erase Marker -->
        <mxCell id="wb_marker_3_body" value="" style="rounded=1;arcSize=40;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#334155;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="760" y="797" width="82" height="9" as="geometry" />
        </mxCell>
        <mxCell id="wb_marker_3_cap" value="" style="rounded=1;arcSize=30;whiteSpace=wrap;html=1;fillColor=#1D4ED8;strokeColor=#1E3A8A;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="838" y="796" width="26" height="10" as="geometry" />
        </mxCell>
        <!-- Marker 4: Green Dry-Erase Marker -->
        <mxCell id="wb_marker_4_body" value="" style="rounded=1;arcSize=40;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#334155;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="910" y="797" width="82" height="9" as="geometry" />
        </mxCell>
        <mxCell id="wb_marker_4_cap" value="" style="rounded=1;arcSize=30;whiteSpace=wrap;html=1;fillColor=#15803D;strokeColor=#14532D;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="988" y="796" width="26" height="10" as="geometry" />
        </mxCell>

        <!-- ========================================================================= -->
        <!-- 1. TIER 1: PRESENTATION LAYER (BLUE DRY-ERASE MARKER + SPEECH BUBBLE)     -->
        <!-- ========================================================================= -->
        <mxCell id="ui_chat" value="PRESENTATION LAYER&lt;br/&gt;&lt;font style=&quot;font-size:13px;&quot;&gt;USER EXPERIENCE (CHAT &amp;amp; CLIENT UI)&lt;/font&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=${blueStroke};strokeWidth=3.8;${font}fontSize=17;fontStyle=1;fontColor=${blueInk};align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="455" y="34" width="490" height="72" as="geometry" />
        </mxCell>

        <!-- Hand-Drawn Speech Bubble Icon inside Presentation Layer -->
        <mxCell id="wb_speech_bubble" value="" style="shape=callout;whiteSpace=wrap;html=1;perimeter=calloutPerimeter;size=10;position=0.25;position2=0.2;fillColor=#FFFFFF;strokeColor=${blueStroke};strokeWidth=2.6;rounded=1;" vertex="1" parent="1">
          <mxGeometry x="892" y="42" width="36" height="28" as="geometry" />
        </mxCell>

        <!-- Dual Vertical Arrows between PRESENTATION LAYER and EDGE LAYER -->
        <mxCell id="wb_edge_ui_1" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=${blackStroke};strokeWidth=2.6;startArrow=classic;startFill=1;endArrow=classic;endFill=1;exitX=0.47;exitY=1;exitDx=0;exitDy=0;entryX=0.45;entryY=0;entryDx=0;entryDy=0;" edge="1" parent="1" source="ui_chat" target="edge_layer">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="wb_edge_ui_2" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=${blackStroke};strokeWidth=2.6;startArrow=classic;startFill=1;endArrow=classic;endFill=1;exitX=0.53;exitY=1;exitDx=0;exitDy=0;entryX=0.50;entryY=0;entryDx=0;entryDy=0;" edge="1" parent="1" source="ui_chat" target="edge_layer">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- ========================================================================= -->
        <!-- 2. TIER 2: API & SECURITY GATEWAY (RED MARKER) + EDGE LAYER               -->
        <!-- ========================================================================= -->
        <!-- Left Red Marker Double-Underlined Title -->
        <mxCell id="wb_api_sec_title" value="&lt;u&gt;API &amp;amp; SECURITY&lt;/u&gt;&lt;br/&gt;&lt;u&gt;GATEWAY&lt;/u&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;${font}fontSize=17;fontStyle=1;fontColor=${redInk};" vertex="1" parent="1">
          <mxGeometry x="86" y="138" width="230" height="66" as="geometry" />
        </mxCell>

        <!-- Outer EDGE LAYER Container -->
        <mxCell id="edge_layer" value="" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=${blackStroke};strokeWidth=3.6;" vertex="1" parent="1">
          <mxGeometry x="355" y="136" width="760" height="78" as="geometry" />
        </mxCell>

        <!-- EDGE LAYER Left Label -->
        <mxCell id="wb_edge_layer_lbl" value="&lt;u&gt;EDGE LAYER&lt;/u&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;${font}fontSize=15.5;fontStyle=1;fontColor=${blueInk};" vertex="1" parent="1">
          <mxGeometry x="368" y="152" width="138" height="46" as="geometry" />
        </mxCell>

        <!-- Box 1: API GATEWAY -->
        <mxCell id="api_cloud_run" value="API GATEWAY" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=${blueStroke};strokeWidth=3.2;${font}fontSize=13.5;fontStyle=1;fontColor=${blueInk};" vertex="1" parent="1">
          <mxGeometry x="518" y="148" width="166" height="54" as="geometry" />
        </mxCell>

        <!-- Box 2: IDENTITY PLATFORM -->
        <mxCell id="identity_auth" value="IDENTITY&lt;br/&gt;PLATFORM" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=${blueStroke};strokeWidth=3.2;${font}fontSize=13;fontStyle=1;fontColor=${blueInk};" vertex="1" parent="1">
          <mxGeometry x="720" y="148" width="174" height="54" as="geometry" />
        </mxCell>

        <!-- Arrow: API GATEWAY -> IDENTITY PLATFORM -->
        <mxCell id="wb_edge_api_id" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=${blackStroke};strokeWidth=2.6;endArrow=classic;endFill=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;" edge="1" parent="1" source="api_cloud_run" target="identity_auth">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Box 3: MODEL ARMOR & SDP -->
        <mxCell id="dlp_model_armor" value="MODEL ARMOR&lt;br/&gt;&amp;amp; SDP" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=${blueStroke};strokeWidth=3.2;${font}fontSize=13;fontStyle=1;fontColor=${blueInk};" vertex="1" parent="1">
          <mxGeometry x="914" y="148" width="184" height="54" as="geometry" />
        </mxCell>

        <!-- Dual Vertical Arrows between EDGE LAYER and AI CLUSTER -->
        <mxCell id="wb_edge_tier2_1" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=${blackStroke};strokeWidth=2.6;startArrow=classic;startFill=1;endArrow=classic;endFill=1;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="688" y="214" as="sourcePoint" />
            <mxPoint x="688" y="252" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="wb_edge_tier2_2" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=${blackStroke};strokeWidth=2.6;startArrow=classic;startFill=1;endArrow=classic;endFill=1;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="712" y="214" as="sourcePoint" />
            <mxPoint x="712" y="252" as="targetPoint" />
          </mxGeometry>
        </mxCell>

        <!-- ========================================================================= -->
        <!-- 3. TIER 3 LEFT: GOVERNANCE & OPERATIONS + STAR DOODLE + IAM + FINOPS      -->
        <!-- ========================================================================= -->
        <!-- Outer Double-Stroke Marker Container -->
        <mxCell id="wb_gov_outer_ring" value="" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=${blackStroke};strokeWidth=3.5;" vertex="1" parent="1">
          <mxGeometry x="44" y="250" width="292" height="284" as="geometry" />
        </mxCell>
        <mxCell id="obs_container" value="" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=${blackStroke};strokeWidth=2.5;" vertex="1" parent="1">
          <mxGeometry x="50" y="256" width="280" height="272" as="geometry" />
        </mxCell>

        <!-- Header: GOVERNANCE & OPERATIONS -->
        <mxCell id="wb_gov_hdr" value="GOVERNANCE &amp;amp;&lt;br/&gt;OPERATIONS" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;${font}fontSize=15.5;fontStyle=1;fontColor=${blackInk};" vertex="1" parent="1">
          <mxGeometry x="66" y="264" width="215" height="48" as="geometry" />
        </mxCell>

        <!-- Hand-Drawn 5-Point Star Doodle ☆ in Top-Right of Governance Box -->
        <mxCell id="wb_star_doodle" value="☆" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;${font}fontSize=30;fontStyle=1;fontColor=${blackInk};" vertex="1" parent="1">
          <mxGeometry x="282" y="260" width="40" height="40" as="geometry" />
        </mxCell>

        <!-- Inner Box 1: IAM -->
        <mxCell id="iam_auth" value="&lt;u&gt;IAM&lt;/u&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=${blackStroke};strokeWidth=3.2;${font}fontSize=16;fontStyle=1;fontColor=${blackInk};" vertex="1" parent="1">
          <mxGeometry x="76" y="324" width="228" height="62" as="geometry" />
        </mxCell>

        <!-- Inner Box 2: CLOUD OBSERVABILITY, AGENTOPS & FINOPS -->
        <mxCell id="wb_obs_inner" value="CLOUD&lt;br/&gt;OBSERVABILITY,&lt;br/&gt;AGENTOPS &amp;amp;&lt;br/&gt;FINOPS" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=${blackStroke};strokeWidth=3.2;${font}fontSize=13;fontStyle=1;fontColor=${blackInk};" vertex="1" parent="1">
          <mxGeometry x="76" y="404" width="228" height="104" as="geometry" />
        </mxCell>

        <!-- 2 Striped Double-Headed Arrows <===> between GOVERNANCE and AI CLUSTER -->
        <mxCell id="wb_striped_arrow_1" value="|||" style="shape=flexArrow;endArrow=classic;startArrow=classic;html=1;strokeColor=${blackStroke};strokeWidth=2.2;fillColor=#F1F5F9;${font}fontSize=10;fontStyle=1;fontColor=${blackInk};width=12;endSize=5;startSize=5;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="336" y="355" as="sourcePoint" />
            <mxPoint x="394" y="355" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="wb_striped_arrow_2" value="|||" style="shape=flexArrow;endArrow=classic;startArrow=classic;html=1;strokeColor=${blackStroke};strokeWidth=2.2;fillColor=#F1F5F9;${font}fontSize=10;fontStyle=1;fontColor=${blackInk};width=12;endSize=5;startSize=5;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="336" y="456" as="sourcePoint" />
            <mxPoint x="394" y="456" as="targetPoint" />
          </mxGeometry>
        </mxCell>

        <!-- ========================================================================= -->
        <!-- 4. TIER 3 CENTER: AI CLUSTER / MULTI-AGENT INTELLIGENCE CORE              -->
        <!-- ========================================================================= -->
        <mxCell id="ai_cluster" value="" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=${blackStroke};strokeWidth=3.2;dashed=1;dashPattern=10 6;" vertex="1" parent="1">
          <mxGeometry x="396" y="252" width="558" height="280" as="geometry" />
        </mxCell>

        <!-- Header with Underlines: AI CLUSTER / MULTI-AGENT INTELLIGENCE CORE -->
        <mxCell id="wb_ai_cluster_hdr" value="AI CLUSTER / &lt;u&gt;MULTI-AGENT&lt;/u&gt;&lt;br/&gt;&lt;u&gt;INTELLIGENCE&lt;/u&gt; &lt;u&gt;CORE&lt;/u&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;${font}fontSize=15.5;fontStyle=1;fontColor=${blackInk};" vertex="1" parent="1">
          <mxGeometry x="420" y="260" width="510" height="48" as="geometry" />
        </mxCell>

        <!-- Green Marker Box: ORCHESTRATOR AGENT (COORDINATOR) -->
        <mxCell id="coordinator_agent" value="ORCHESTRATOR AGENT&lt;br/&gt;(COORDINATOR)" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=${greenStroke};strokeWidth=3.6;${font}fontSize=14;fontStyle=1;fontColor=${greenInk};" vertex="1" parent="1">
          <mxGeometry x="505" y="318" width="340" height="64" as="geometry" />
        </mxCell>

        <!-- Hand-Drawn Green Exclamation Mark ! Doodle right of Coordinator -->
        <mxCell id="wb_excl_doodle" value="!" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;${font}fontSize=36;fontStyle=1;fontColor=${greenStroke};" vertex="1" parent="1">
          <mxGeometry x="854" y="320" width="32" height="58" as="geometry" />
        </mxCell>

        <!-- 3 Specialized Green Marker Agent Boxes -->
        <mxCell id="accounts_agent" value="ACCOUNTS&lt;br/&gt;AGENT" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=${greenStroke};strokeWidth=3.4;${font}fontSize=13;fontStyle=1;fontColor=${greenInk};" vertex="1" parent="1">
          <mxGeometry x="412" y="432" width="164" height="78" as="geometry" />
        </mxCell>

        <mxCell id="transaction_agent" value="TRANSACTIONS&lt;br/&gt;AGENT" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=${greenStroke};strokeWidth=3.4;${font}fontSize=13;fontStyle=1;fontColor=${greenInk};" vertex="1" parent="1">
          <mxGeometry x="592" y="432" width="168" height="78" as="geometry" />
        </mxCell>

        <mxCell id="service_agent" value="CUSTOMER&lt;br/&gt;SERVICE&lt;br/&gt;AGENT" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=${greenStroke};strokeWidth=3.4;${font}fontSize=12.5;fontStyle=1;fontColor=${greenInk};" vertex="1" parent="1">
          <mxGeometry x="776" y="432" width="162" height="78" as="geometry" />
        </mxCell>

        <!-- A2A Arrows & Labels between Coordinator and 3 Agents -->
        <mxCell id="wb_a2a_1" value="A2A" style="${biArrow('exitX=0.2;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;')}" edge="1" parent="1" source="coordinator_agent" target="accounts_agent">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="wb_a2a_2" value="A2A" style="${biArrow('exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;')}" edge="1" parent="1" source="coordinator_agent" target="transaction_agent">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="wb_a2a_3" value="A2A" style="${biArrow('exitX=0.8;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;')}" edge="1" parent="1" source="coordinator_agent" target="service_agent">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- ========================================================================= -->
        <!-- 5. TIER 3 RIGHT: AI FOUNDATION & MODEL SERVING LAYER (GOLD MARKER)        -->
        <!-- ========================================================================= -->
        <mxCell id="llm_container" value="" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFBEB;strokeColor=${goldStroke};strokeWidth=3.8;" vertex="1" parent="1">
          <mxGeometry x="996" y="252" width="358" height="280" as="geometry" />
        </mxCell>

        <!-- Header: AI FOUNDATION & MODEL SERVING LAYER -->
        <mxCell id="wb_llm_hdr" value="AI FOUNDATION &amp;amp;&lt;br/&gt;MODEL SERVING&lt;br/&gt;LAYER" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;${font}fontSize=15;fontStyle=1;fontColor=${goldInk};" vertex="1" parent="1">
          <mxGeometry x="1014" y="262" width="322" height="66" as="geometry" />
        </mxCell>

        <!-- Inner Box 1: LLM LAYER -->
        <mxCell id="gemini_models" value="&lt;u&gt;LLM&lt;/u&gt;&lt;br/&gt;&lt;u&gt;LAYER&lt;/u&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=${goldStroke};strokeWidth=3.4;${font}fontSize=15;fontStyle=1;fontColor=${goldInk};" vertex="1" parent="1">
          <mxGeometry x="1014" y="348" width="140" height="142" as="geometry" />
        </mxCell>

        <!-- Inner Box 2: VECTOR KNOWLEDGE SEARCH -->
        <mxCell id="vector_memory" value="VECTOR&lt;br/&gt;KNOWLEDGE&lt;br/&gt;SEARCH" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=${blackStroke};strokeWidth=3.2;${font}fontSize=13.5;fontStyle=1;fontColor=${blackInk};" vertex="1" parent="1">
          <mxGeometry x="1184" y="348" width="152" height="142" as="geometry" />
        </mxCell>

        <!-- Bidirectional Arrow: LLM LAYER <-> VECTOR KNOWLEDGE SEARCH -->
        <mxCell id="wb_edge_llm_vec" value="" style="${biArrow('exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;')}" edge="1" parent="1" source="gemini_models" target="vector_memory">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Bidirectional Arrows between AI CLUSTER and AI FOUNDATION -->
        <mxCell id="wb_edge_cluster_llm_1" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=${blackStroke};strokeWidth=2.6;startArrow=classic;startFill=1;endArrow=classic;endFill=1;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="954" y="405" as="sourcePoint" />
            <mxPoint x="996" y="405" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="wb_edge_cluster_llm_2" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=${blackStroke};strokeWidth=2.6;startArrow=classic;startFill=1;endArrow=classic;endFill=1;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="954" y="435" as="sourcePoint" />
            <mxPoint x="996" y="435" as="targetPoint" />
          </mxGeometry>
        </mxCell>

        <!-- ========================================================================= -->
        <!-- 6. TIER 4: DATA PERSISTENCE & CORE BANKING SERVICES + 4 CYLINDERS         -->
        <!-- ========================================================================= -->
        <mxCell id="wb_data_title" value="DATA PERSISTENCE &amp;amp;&lt;br/&gt;CORE BANKING&lt;br/&gt;SERVICES" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;${font}fontSize=15.5;fontStyle=1;fontColor=${blackInk};" vertex="1" parent="1">
          <mxGeometry x="62" y="572" width="310" height="74" as="geometry" />
        </mxCell>

        <!-- Cylinder 1: CLOUD SPANNER -->
        <mxCell id="db_spanner" value="CLOUD&lt;br/&gt;SPANNER" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=11;fillColor=#FFFFFF;strokeColor=${blackStroke};strokeWidth=3.2;${font}fontSize=12.5;fontStyle=1;fontColor=${blackInk};" vertex="1" parent="1">
          <mxGeometry x="414" y="566" width="160" height="84" as="geometry" />
        </mxCell>

        <!-- Cylinder 2: BIGTABLE (+ TRANS. POSTGRES) -->
        <mxCell id="db_bigtable" value="BIGTABLE&lt;br/&gt;(+ TRANS.&lt;br/&gt;POSTGRES)" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=11;fillColor=#FFFFFF;strokeColor=${blackStroke};strokeWidth=3.2;${font}fontSize=11.5;fontStyle=1;fontColor=${blackInk};" vertex="1" parent="1">
          <mxGeometry x="594" y="566" width="164" height="84" as="geometry" />
        </mxCell>

        <!-- Cylinder 3: FIRESTORE (+ DOCUMENT AI) -->
        <mxCell id="db_firestore" value="FIRESTORE&lt;br/&gt;(+ DOCUMENT&lt;br/&gt;AI)" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=11;fillColor=#FFFFFF;strokeColor=${blackStroke};strokeWidth=3.2;${font}fontSize=11.5;fontStyle=1;fontColor=${blackInk};" vertex="1" parent="1">
          <mxGeometry x="778" y="566" width="160" height="84" as="geometry" />
        </mxCell>

        <!-- Cylinder 4: DATABASES (VECTOR & SEARCH) -->
        <mxCell id="db_vector_search" value="DATABASES&lt;br/&gt;(VECTOR &amp;amp; SEARCH)" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=12;fillColor=#FFFFFF;strokeColor=${blackStroke};strokeWidth=3.2;${font}fontSize=13;fontStyle=1;fontColor=${blackInk};" vertex="1" parent="1">
          <mxGeometry x="1055" y="566" width="265" height="84" as="geometry" />
        </mxCell>

        <!-- Vertical Bidirectional Arrows: Agents <-> Cylinders -->
        <mxCell id="wb_edge_ag_db_1" value="" style="${biArrow('exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;entryPerimeter=0;')}" edge="1" parent="1" source="accounts_agent" target="db_spanner">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="wb_edge_ag_db_2" value="" style="${biArrow('exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;entryPerimeter=0;')}" edge="1" parent="1" source="transaction_agent" target="db_bigtable">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="wb_edge_ag_db_3" value="" style="${biArrow('exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;entryPerimeter=0;')}" edge="1" parent="1" source="service_agent" target="db_firestore">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="wb_edge_vec_db_4" value="" style="${biArrow('exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.75;entryY=0;entryDx=0;entryDy=0;entryPerimeter=0;')}" edge="1" parent="1" source="vector_memory" target="db_vector_search">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- ========================================================================= -->
        <!-- 7. TIER 5: 6 BOTTOM CORE BANKING CAPABILITY CARDS                         -->
        <!-- ========================================================================= -->
        <mxCell id="wb_cap_1" value="BALANCE&lt;br/&gt;ENQUIRY" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=${blackStroke};strokeWidth=3;${font}fontSize=12;fontStyle=1;fontColor=${blackInk};" vertex="1" parent="1">
          <mxGeometry x="280" y="690" width="136" height="60" as="geometry" />
        </mxCell>
        <mxCell id="wb_cap_2" value="TRANSACTION&lt;br/&gt;DETAILS" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=${blackStroke};strokeWidth=3;${font}fontSize=12;fontStyle=1;fontColor=${blackInk};" vertex="1" parent="1">
          <mxGeometry x="428" y="690" width="144" height="60" as="geometry" />
        </mxCell>
        <mxCell id="wb_cap_3" value="STATEMENT&lt;br/&gt;REQUEST" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=${blackStroke};strokeWidth=3;${font}fontSize=12;fontStyle=1;fontColor=${blackInk};" vertex="1" parent="1">
          <mxGeometry x="584" y="690" width="140" height="60" as="geometry" />
        </mxCell>
        <mxCell id="wb_cap_4" value="CHANGE OF&lt;br/&gt;ADDRESS" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=${blackStroke};strokeWidth=3;${font}fontSize=12;fontStyle=1;fontColor=${blackInk};" vertex="1" parent="1">
          <mxGeometry x="736" y="690" width="140" height="60" as="geometry" />
        </mxCell>
        <mxCell id="wb_cap_5" value="CHEQUE BOOK&lt;br/&gt;REQUEST" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=${blackStroke};strokeWidth=3;${font}fontSize=12;fontStyle=1;fontColor=${blackInk};" vertex="1" parent="1">
          <mxGeometry x="888" y="690" width="148" height="60" as="geometry" />
        </mxCell>
        <mxCell id="wb_cap_6" value="eKYC&lt;br/&gt;UPDATE" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=${blackStroke};strokeWidth=3;${font}fontSize=12;fontStyle=1;fontColor=${blackInk};" vertex="1" parent="1">
          <mxGeometry x="1048" y="690" width="136" height="60" as="geometry" />
        </mxCell>

        <!-- Arrows from Cylinders to Bottom 6 Capability Cards -->
        <mxCell id="wb_edge_cap_1" value="" style="${downArrow('exitX=0.25;exitY=1;exitDx=0;exitDy=0;exitPerimeter=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;')}" edge="1" parent="1" source="db_spanner" target="wb_cap_1">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="wb_edge_cap_2" value="" style="${downArrow('exitX=0.75;exitY=1;exitDx=0;exitDy=0;exitPerimeter=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;')}" edge="1" parent="1" source="db_spanner" target="wb_cap_2">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="wb_edge_cap_3" value="" style="${downArrow('exitX=0.5;exitY=1;exitDx=0;exitDy=0;exitPerimeter=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;')}" edge="1" parent="1" source="db_bigtable" target="wb_cap_3">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="wb_edge_cap_4" value="" style="${downArrow('exitX=0.25;exitY=1;exitDx=0;exitDy=0;exitPerimeter=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;')}" edge="1" parent="1" source="db_firestore" target="wb_cap_4">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="wb_edge_cap_5" value="" style="${downArrow('exitX=0.5;exitY=1;exitDx=0;exitDy=0;exitPerimeter=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;')}" edge="1" parent="1" source="db_firestore" target="wb_cap_5">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="wb_edge_cap_6" value="" style="${downArrow('exitX=0.8;exitY=1;exitDx=0;exitDy=0;exitPerimeter=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;')}" edge="1" parent="1" source="db_firestore" target="wb_cap_6">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}

/**
 * Converts any arbitrary blueprint Draw.io XML into Whiteboard Sketch Mode
 * (or generates a tailored Whiteboard diagram if the blueprint is a reference template)
 */
export function convertXmlToWhiteboardMode(sourceXml: string, blueprintName: string): string {
  if (!sourceXml || sourceXml.includes('whiteboard-gcp-ge-multi-agent-2026')) {
    return sourceXml || generateWhiteboardGcpAgentArchXml({ projectTitle: blueprintName });
  }
  const base = generateWhiteboardGcpAgentArchXml({ projectTitle: blueprintName });
  if (!blueprintName || blueprintName.toLowerCase().includes('google cloud enterprise')) {
    return base;
  }
  const safeName = esc(blueprintName.toUpperCase());
  return base.replace(
    'AI CLUSTER / &lt;u&gt;MULTI-AGENT&lt;/u&gt;&lt;br/&gt;&lt;u&gt;INTELLIGENCE&lt;/u&gt; &lt;u&gt;CORE&lt;/u&gt;',
    `${safeName}&lt;br/&gt;&lt;u&gt;WHITEBOARD ARCHITECTURE&lt;/u&gt;`
  );
}
