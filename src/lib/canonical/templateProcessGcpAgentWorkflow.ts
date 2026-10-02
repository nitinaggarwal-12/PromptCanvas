/**
 * Canonical Blueprint: Google Cloud Multi-Agent Process Workflow (BPMN Swimlanes)
 *
 * 1:1 pixel-accurate reproduction of the Multi-Agent Request Processing & Core Banking Integration Workflow:
 * - Swimlane 1: User / Client (User submits natural language request -> Deliver response to user)
 * - Swimlane 2: Ingress & Security (Authenticate & Validate Guardrails | Apply Output DLP / Safety Check)
 * - Swimlane 3: Multi-Agent Orchestration (Coordinator analyzes intent & formulates plan -> Decision: Which domain? -> Branch A: Account Agent / Branch B: Transaction Agent / Branch C: Service Agent -> Synthesize response via LLM)
 * - Swimlane 4: Tools & Data Services (Invoke Tool via MCP -> Query Knowledge / Database)
 * - Swimlane 5: Backend Core Banking (Optional integration parallel | Fetch Core Data & Transaction Status)
 */

export interface ProcessGcpAgentWorkflowOptions {
  projectTitle?: string;
  projectName?: string;
  useCaseName?: string;
  domain?: string;
  theme?: 'light' | 'dark';
}

export function generateProcessGcpAgentWorkflowXml(
  options?: ProcessGcpAgentWorkflowOptions | string,
  themeArg: 'light' | 'dark' = 'light'
): string {
  const opts: ProcessGcpAgentWorkflowOptions =
    typeof options === 'string'
      ? { domain: options, theme: themeArg }
      : options || { theme: themeArg };

  const isLight = opts.theme !== 'dark';

  // Theme palettes
  const canvasBg = isLight ? '#FFFFFF' : '#0F172A';
  const headerBg = '#334155'; // Slate-700
  const headerText = '#FFFFFF';
  const borderGrey = isLight ? '#CBD5E1' : '#475569';
  const textDark = isLight ? '#0F172A' : '#F8FAFC';
  const edgeStroke = isLight ? '#334155' : '#93C5FD';

  // Swimlane body fills
  const lane1Bg = isLight ? '#F1F5F9' : '#1E293B'; // User / Client
  const lane2Bg = isLight ? '#E0F2FE' : '#0C2D48'; // Ingress & Security
  const lane3Bg = isLight ? '#DCFCE7' : '#064E3B'; // Multi-Agent Orchestration
  const lane4Bg = isLight ? '#FEF3C7' : '#451A03'; // Tools & Data Services
  const lane5Bg = isLight ? '#E2E8F0' : '#1E293B'; // Backend Core Banking

  // Node fills & borders
  const nodeSecurityBg = isLight ? '#BAE6FD' : '#075985';
  const nodeSecurityBorder = isLight ? '#0284C7' : '#38BDF8';

  const nodeAgentBg = isLight ? '#DCFCE7' : '#065F46';
  const nodeAgentBorder = isLight ? '#16A34A' : '#34D399';

  const nodeToolBg = isLight ? '#FEF08A' : '#78350F';
  const nodeToolBorder = isLight ? '#D97706' : '#FBBF24';

  const nodeCoreBg = isLight ? '#E2E8F0' : '#334155';
  const nodeCoreBorder = isLight ? '#475569' : '#94A3B8';

  const diamondBg = isLight ? '#FFFFFF' : '#065F46';
  const diamondBorder = isLight ? '#16A34A' : '#34D399';

  return `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="app.diagrams.net" agent="PromptCanvas" version="24.0.0">
  <diagram name="Multi-Agent Process Workflow" id="multi_agent_process_workflow">
    <mxGraphModel dx="1422" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1400" pageHeight="950" background="${canvasBg}" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- ==================================================================== -->
        <!-- SWIMLANE 1: User / Client                                            -->
        <!-- ==================================================================== -->
        <!-- Left Header -->
        <mxCell id="lane1_header" value="&lt;div style=&quot;font-family:Inter,sans-serif;font-size:12px;font-weight:700;color:${headerText};text-align:center;line-height:1.3;&quot;&gt;User /&lt;br&gt;Client&lt;/div&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=${headerBg};strokeColor=${borderGrey};strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="40" width="80" height="135" as="geometry" />
        </mxCell>
        <!-- Body Lane -->
        <mxCell id="lane1_body" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=${lane1Bg};strokeColor=${borderGrey};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="120" y="40" width="1240" height="135" as="geometry" />
        </mxCell>

        <!-- Start Event Node (Circle) -->
        <mxCell id="start_event" value="" style="shape=ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#FFFFFF;strokeColor=#1E293B;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="180" y="65" width="44" height="44" as="geometry" />
        </mxCell>
        <mxCell id="start_event_label" value="&lt;div style=&quot;font-family:Inter,sans-serif;font-size:11px;font-weight:600;color:${textDark};text-align:center;line-height:1.25;&quot;&gt;User submits&lt;br&gt;natural language&lt;br&gt;request&lt;/div&gt;" style="text;html=1;align=center;verticalAlign=top;whiteSpace=wrap;strokeColor=none;fillColor=none;" vertex="1" parent="1">
          <mxGeometry x="135" y="115" width="134" height="45" as="geometry" />
        </mxCell>

        <!-- End Event Node (Double Circle) -->
        <mxCell id="end_event" value="" style="shape=doubleEllipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#FFFFFF;strokeColor=#1E293B;strokeWidth=2.5;" vertex="1" parent="1">
          <mxGeometry x="1190" y="65" width="44" height="44" as="geometry" />
        </mxCell>
        <mxCell id="end_event_label" value="&lt;div style=&quot;font-family:Inter,sans-serif;font-size:11px;font-weight:600;color:${textDark};text-align:center;line-height:1.25;&quot;&gt;Deliver response&lt;br&gt;to user&lt;/div&gt;" style="text;html=1;align=center;verticalAlign=top;whiteSpace=wrap;strokeColor=none;fillColor=none;" vertex="1" parent="1">
          <mxGeometry x="1145" y="115" width="134" height="40" as="geometry" />
        </mxCell>


        <!-- ==================================================================== -->
        <!-- SWIMLANE 2: Ingress & Security                                       -->
        <!-- ==================================================================== -->
        <!-- Left Header -->
        <mxCell id="lane2_header" value="&lt;div style=&quot;font-family:Inter,sans-serif;font-size:12px;font-weight:700;color:${headerText};text-align:center;line-height:1.3;&quot;&gt;Ingress &amp;&lt;br&gt;Security&lt;/div&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=${headerBg};strokeColor=${borderGrey};strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="175" width="80" height="135" as="geometry" />
        </mxCell>
        <!-- Body Lane -->
        <mxCell id="lane2_body" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=${lane2Bg};strokeColor=${borderGrey};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="120" y="175" width="1240" height="135" as="geometry" />
        </mxCell>

        <!-- Node: Authenticate & Validate Guardrails -->
        <mxCell id="node_auth" value="&lt;div style=&quot;font-family:Inter,sans-serif;font-size:12px;font-weight:700;color:${textDark};text-align:center;line-height:1.3;&quot;&gt;Authenticate &amp;&lt;br&gt;Validate Guardrails&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=18;fillColor=${nodeSecurityBg};strokeColor=${nodeSecurityBorder};strokeWidth=2;shadow=0;" vertex="1" parent="1">
          <mxGeometry x="250" y="210" width="175" height="65" as="geometry" />
        </mxCell>

        <!-- Node: Apply Output DLP / Safety Check -->
        <mxCell id="node_dlp" value="&lt;div style=&quot;font-family:Inter,sans-serif;font-size:12px;font-weight:700;color:${textDark};text-align:center;line-height:1.3;&quot;&gt;Apply Output DLP /&lt;br&gt;Safety Check&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=18;fillColor=${nodeSecurityBg};strokeColor=${nodeSecurityBorder};strokeWidth=2;shadow=0;" vertex="1" parent="1">
          <mxGeometry x="960" y="210" width="175" height="65" as="geometry" />
        </mxCell>


        <!-- ==================================================================== -->
        <!-- SWIMLANE 3: Multi-Agent Orchestration                                -->
        <!-- ==================================================================== -->
        <!-- Left Header -->
        <mxCell id="lane3_header" value="&lt;div style=&quot;font-family:Inter,sans-serif;font-size:12px;font-weight:700;color:${headerText};text-align:center;line-height:1.3;&quot;&gt;Multi-Agent&lt;br&gt;Orchestration&lt;/div&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=${headerBg};strokeColor=${borderGrey};strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="310" width="80" height="245" as="geometry" />
        </mxCell>
        <!-- Body Lane -->
        <mxCell id="lane3_body" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=${lane3Bg};strokeColor=${borderGrey};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="120" y="310" width="1240" height="245" as="geometry" />
        </mxCell>

        <!-- Node: Coordinator analyzes intent & formulates plan -->
        <mxCell id="node_coordinator" value="&lt;div style=&quot;font-family:Inter,sans-serif;font-size:12px;font-weight:700;color:${textDark};text-align:center;line-height:1.3;&quot;&gt;Coordinator&lt;br&gt;analyzes intent &amp;&lt;br&gt;formulates plan&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=18;fillColor=${nodeAgentBg};strokeColor=${nodeAgentBorder};strokeWidth=2;shadow=0;" vertex="1" parent="1">
          <mxGeometry x="250" y="390" width="175" height="75" as="geometry" />
        </mxCell>

        <!-- Decision Diamond: Which domain? -->
        <mxCell id="diamond_domain" value="" style="rhombus;whiteSpace=wrap;html=1;fillColor=${diamondBg};strokeColor=${diamondBorder};strokeWidth=2;shadow=0;" vertex="1" parent="1">
          <mxGeometry x="480" y="402" width="60" height="50" as="geometry" />
        </mxCell>
        <mxCell id="diamond_domain_label" value="&lt;div style=&quot;font-family:Inter,sans-serif;font-size:11px;font-weight:700;color:${textDark};text-align:center;&quot;&gt;Which domain?&lt;/div&gt;" style="text;html=1;align=center;verticalAlign=top;whiteSpace=wrap;strokeColor=none;fillColor=none;" vertex="1" parent="1">
          <mxGeometry x="450" y="460" width="120" height="24" as="geometry" />
        </mxCell>

        <!-- Branch Labels A, B, C -->
        <mxCell id="lbl_branch_a" value="&lt;div style=&quot;font-family:Inter,sans-serif;font-size:12px;font-weight:700;color:${textDark};text-align:center;&quot;&gt;A&lt;/div&gt;" style="text;html=1;align=center;verticalAlign=middle;whiteSpace=wrap;strokeColor=none;fillColor=none;" vertex="1" parent="1">
          <mxGeometry x="600" y="340" width="20" height="20" as="geometry" />
        </mxCell>
        <mxCell id="lbl_branch_b" value="&lt;div style=&quot;font-family:Inter,sans-serif;font-size:12px;font-weight:700;color:${textDark};text-align:center;&quot;&gt;B&lt;/div&gt;" style="text;html=1;align=center;verticalAlign=middle;whiteSpace=wrap;strokeColor=none;fillColor=none;" vertex="1" parent="1">
          <mxGeometry x="580" y="405" width="20" height="20" as="geometry" />
        </mxCell>
        <mxCell id="lbl_branch_c" value="&lt;div style=&quot;font-family:Inter,sans-serif;font-size:12px;font-weight:700;color:${textDark};text-align:center;&quot;&gt;C&lt;/div&gt;" style="text;html=1;align=center;verticalAlign=middle;whiteSpace=wrap;strokeColor=none;fillColor=none;" vertex="1" parent="1">
          <mxGeometry x="600" y="470" width="20" height="20" as="geometry" />
        </mxCell>

        <!-- Branch A: Account Agent -->
        <mxCell id="node_account_agent" value="&lt;div style=&quot;font-family:Inter,sans-serif;font-size:12px;font-weight:700;color:${textDark};text-align:center;&quot;&gt;Account Agent&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=24;fillColor=${nodeAgentBg};strokeColor=${nodeAgentBorder};strokeWidth=2;shadow=0;" vertex="1" parent="1">
          <mxGeometry x="640" y="340" width="165" height="48" as="geometry" />
        </mxCell>

        <!-- Branch B: Transaction Agent -->
        <mxCell id="node_transaction_agent" value="&lt;div style=&quot;font-family:Inter,sans-serif;font-size:12px;font-weight:700;color:${textDark};text-align:center;&quot;&gt;Transaction Agent&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=24;fillColor=${nodeAgentBg};strokeColor=${nodeAgentBorder};strokeWidth=2;shadow=0;" vertex="1" parent="1">
          <mxGeometry x="640" y="403" width="165" height="48" as="geometry" />
        </mxCell>

        <!-- Branch C: Service Agent -->
        <mxCell id="node_service_agent" value="&lt;div style=&quot;font-family:Inter,sans-serif;font-size:12px;font-weight:700;color:${textDark};text-align:center;&quot;&gt;Service Agent&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=24;fillColor=${nodeAgentBg};strokeColor=${nodeAgentBorder};strokeWidth=2;shadow=0;" vertex="1" parent="1">
          <mxGeometry x="640" y="465" width="165" height="48" as="geometry" />
        </mxCell>

        <!-- Node: Synthesize response via LLM -->
        <mxCell id="node_synthesize" value="&lt;div style=&quot;font-family:Inter,sans-serif;font-size:12px;font-weight:700;color:${textDark};text-align:center;line-height:1.3;&quot;&gt;Synthesize&lt;br&gt;response via LLM&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=18;fillColor=${nodeAgentBg};strokeColor=${nodeAgentBorder};strokeWidth=2;shadow=0;" vertex="1" parent="1">
          <mxGeometry x="960" y="390" width="175" height="75" as="geometry" />
        </mxCell>


        <!-- ==================================================================== -->
        <!-- SWIMLANE 4: Tools & Data Services                                    -->
        <!-- ==================================================================== -->
        <!-- Left Header -->
        <mxCell id="lane4_header" value="&lt;div style=&quot;font-family:Inter,sans-serif;font-size:12px;font-weight:700;color:${headerText};text-align:center;line-height:1.3;&quot;&gt;Tools &amp;&lt;br&gt;Data Services&lt;/div&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=${headerBg};strokeColor=${borderGrey};strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="555" width="80" height="145" as="geometry" />
        </mxCell>
        <!-- Body Lane -->
        <mxCell id="lane4_body" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=${lane4Bg};strokeColor=${borderGrey};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="120" y="555" width="1240" height="145" as="geometry" />
        </mxCell>

        <!-- Node: Invoke Tool via MCP -->
        <mxCell id="node_mcp" value="&lt;div style=&quot;font-family:Inter,sans-serif;font-size:12px;font-weight:700;color:${textDark};text-align:center;line-height:1.3;&quot;&gt;Invoke Tool via&lt;br&gt;MCP&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=18;fillColor=${nodeToolBg};strokeColor=${nodeToolBorder};strokeWidth=2;shadow=0;" vertex="1" parent="1">
          <mxGeometry x="560" y="590" width="175" height="68" as="geometry" />
        </mxCell>

        <!-- Node: Query Knowledge / Database -->
        <mxCell id="node_query_db" value="&lt;div style=&quot;font-family:Inter,sans-serif;font-size:12px;font-weight:700;color:${textDark};text-align:center;line-height:1.3;&quot;&gt;Query&lt;br&gt;Knowledge /&lt;br&gt;Database&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=18;fillColor=${nodeToolBg};strokeColor=${nodeToolBorder};strokeWidth=2;shadow=0;" vertex="1" parent="1">
          <mxGeometry x="800" y="590" width="175" height="68" as="geometry" />
        </mxCell>


        <!-- ==================================================================== -->
        <!-- SWIMLANE 5: Backend Core Banking                                     -->
        <!-- ==================================================================== -->
        <!-- Left Header -->
        <mxCell id="lane5_header" value="&lt;div style=&quot;font-family:Inter,sans-serif;font-size:12px;font-weight:700;color:${headerText};text-align:center;line-height:1.3;&quot;&gt;Backend Core&lt;br&gt;Banking&lt;/div&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=${headerBg};strokeColor=${borderGrey};strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="700" width="80" height="145" as="geometry" />
        </mxCell>
        <!-- Body Lane -->
        <mxCell id="lane5_body" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=${lane5Bg};strokeColor=${borderGrey};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="120" y="700" width="1240" height="145" as="geometry" />
        </mxCell>

        <!-- Annotation on left -->
        <mxCell id="lane5_annotation" value="&lt;div style=&quot;font-family:Inter,sans-serif;font-size:13px;font-weight:600;color:${textDark};text-align:left;line-height:1.3;&quot;&gt;Optional integration&lt;br&gt;parallel&lt;/div&gt;" style="text;html=1;align=left;verticalAlign=middle;whiteSpace=wrap;strokeColor=none;fillColor=none;" vertex="1" parent="1">
          <mxGeometry x="160" y="740" width="180" height="40" as="geometry" />
        </mxCell>

        <!-- Node: Fetch Core Data & Transaction Status -->
        <mxCell id="node_core_data" value="&lt;div style=&quot;font-family:Inter,sans-serif;font-size:12px;font-weight:700;color:${textDark};text-align:center;line-height:1.3;&quot;&gt;Fetch Core Data&lt;br&gt;&amp; Transaction&lt;br&gt;Status&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=18;fillColor=${nodeCoreBg};strokeColor=${nodeCoreBorder};strokeWidth=2;shadow=0;" vertex="1" parent="1">
          <mxGeometry x="800" y="735" width="175" height="70" as="geometry" />
        </mxCell>


        <!-- ==================================================================== -->
        <!-- CONNECTORS & FLOW EDGES                                              -->
        <!-- ==================================================================== -->
        <!-- 1. Start Event -> Authenticate & Validate Guardrails -->
        <mxCell id="edge_start_to_auth" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${edgeStroke};strokeWidth=2;endArrow=classic;endFill=1;" edge="1" parent="1" source="start_event" target="node_auth">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="337" y="87" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- 2. Authenticate -> Coordinator -->
        <mxCell id="edge_auth_to_coord" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${edgeStroke};strokeWidth=2;endArrow=classic;endFill=1;" edge="1" parent="1" source="node_auth" target="node_coordinator">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- 3. Coordinator -> Diamond (Which domain?) -->
        <mxCell id="edge_coord_to_diamond" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${edgeStroke};strokeWidth=2;endArrow=classic;endFill=1;" edge="1" parent="1" source="node_coordinator" target="diamond_domain">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- 4. Diamond -> Branch A (Account Agent) -->
        <mxCell id="edge_diamond_to_a" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${edgeStroke};strokeWidth=2;endArrow=classic;endFill=1;" edge="1" parent="1" source="diamond_domain" target="node_account_agent">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="585" y="427" />
              <mxPoint x="585" y="364" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- 5. Diamond -> Branch B (Transaction Agent) -->
        <mxCell id="edge_diamond_to_b" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${edgeStroke};strokeWidth=2;endArrow=classic;endFill=1;" edge="1" parent="1" source="diamond_domain" target="node_transaction_agent">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- 6. Diamond -> Branch C (Service Agent) -->
        <mxCell id="edge_diamond_to_c" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${edgeStroke};strokeWidth=2;endArrow=classic;endFill=1;" edge="1" parent="1" source="diamond_domain" target="node_service_agent">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="585" y="427" />
              <mxPoint x="585" y="489" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- 7. Subagents Converge to Synthesize response via LLM -->
        <mxCell id="edge_a_to_synth" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${edgeStroke};strokeWidth=2;endArrow=none;" edge="1" parent="1" source="node_account_agent">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="880" y="427" as="targetPoint" />
            <Array as="points">
              <mxPoint x="860" y="364" />
              <mxPoint x="860" y="427" />
            </Array>
          </mxGeometry>
        </mxCell>

        <mxCell id="edge_b_to_synth" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${edgeStroke};strokeWidth=2;endArrow=none;" edge="1" parent="1" source="node_transaction_agent">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="880" y="427" as="targetPoint" />
          </mxGeometry>
        </mxCell>

        <mxCell id="edge_c_to_synth" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${edgeStroke};strokeWidth=2;endArrow=none;" edge="1" parent="1" source="node_service_agent">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="880" y="427" as="targetPoint" />
            <Array as="points">
              <mxPoint x="860" y="489" />
              <mxPoint x="860" y="427" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- Main trunk into Synthesize response via LLM -->
        <mxCell id="edge_trunk_to_synth" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${edgeStroke};strokeWidth=2;endArrow=classic;endFill=1;" edge="1" parent="1" target="node_synthesize">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="860" y="427" as="sourcePoint" />
          </mxGeometry>
        </mxCell>

        <!-- 8. Branch from agent output down to Invoke Tool via MCP -->
        <mxCell id="edge_agent_to_mcp" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${edgeStroke};strokeWidth=2;endArrow=classic;endFill=1;" edge="1" parent="1" target="node_mcp">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="890" y="427" as="sourcePoint" />
            <Array as="points">
              <mxPoint x="890" y="535" />
              <mxPoint x="648" y="535" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- 9. Invoke Tool via MCP -> Query Knowledge / Database -->
        <mxCell id="edge_mcp_to_query" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${edgeStroke};strokeWidth=2;endArrow=classic;endFill=1;" edge="1" parent="1" source="node_mcp" target="node_query_db">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- 10. Query Knowledge / Database -> Fetch Core Data & Transaction Status -->
        <mxCell id="edge_query_to_core" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${edgeStroke};strokeWidth=2;endArrow=classic;endFill=1;" edge="1" parent="1" source="node_query_db" target="node_core_data">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- 11. Fetch Core Data & Transaction Status -> Synthesize response via LLM -->
        <mxCell id="edge_core_to_synth" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${edgeStroke};strokeWidth=2;endArrow=classic;endFill=1;" edge="1" parent="1" source="node_core_data" target="node_synthesize">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1047" y="770" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- 12. Synthesize response via LLM -> Apply Output DLP / Safety Check -->
        <mxCell id="edge_synth_to_dlp" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${edgeStroke};strokeWidth=2;endArrow=classic;endFill=1;" edge="1" parent="1" source="node_synthesize" target="node_dlp">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- 13. Apply Output DLP / Safety Check -> Deliver response to user (End Event) -->
        <mxCell id="edge_dlp_to_end" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${edgeStroke};strokeWidth=2;endArrow=classic;endFill=1;" edge="1" parent="1" source="node_dlp" target="end_event">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1047" y="87" />
            </Array>
          </mxGeometry>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
