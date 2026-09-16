/**
 * Master Draw.io Vector Builder: Agentic AI Architecture (bismart / VIS-AGENTIC-01)
 * 1:1 Spatial Fidelity with the bismart Agentic AI Architecture slide:
 * - Top Tier: Input / Perception Layer (Data Sources • APIs • User Prompts)
 * - Middle Tier (3 Columns): Memory (Short-Term & Long-Term • Vector Database) <-> Reasoning Core (LLM Brain) <-> Planning Module (Task Decomposition)
 * - Lower Middle Tier: External APIs • Code Execution
 * - Bottom Action Tier: Action / Execution Layer (Rocket Launch)
 * - Symmetrical Closed-Loop Reflection: Feedback / Reflection Loop looping back to Memory & Planning Module
 */

export function generateAgenticAiArchitectureXml(): string {
  return `<mxfile host="embed.diagrams.net" modified="2026-09-16T00:00:00.000Z" agent="PromptCanvas Master Vision Engine" version="24.0.0">
  <diagram id="agentic-ai-architecture-bismart" name="Agentic AI Architecture (VIS-AGENTIC-01)">
    <mxGraphModel dx="1600" dy="960" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="960" background="#070D19" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- TOP BRAND TITLE HEADER -->
        <mxCell id="title-banner" value="AGENTIC AI ARCHITECTURE" style="rounded=0;whiteSpace=wrap;html=1;fillColor=none;strokeColor=none;fontColor=#38BDF8;fontSize=24;fontStyle=1;align=center;letterSpacing=3;" vertex="1" parent="1">
          <mxGeometry x="400" y="20" width="800" height="40" as="geometry" />
        </mxCell>

        <mxCell id="title-divider" value="" style="line;strokeWidth=1.5;html=1;strokeColor=#0284C7;fillColor=none;" vertex="1" parent="1">
          <mxGeometry x="260" y="64" width="1080" height="10" as="geometry" />
        </mxCell>

        <mxCell id="brand-bismart" value="bismart  |  Enterprise Agentic Core" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F2547;strokeColor=#38BDF8;strokeWidth=1.5;fontColor=#FFFFFF;fontSize=12;fontStyle=1;align=center;" vertex="1" parent="1">
          <mxGeometry x="1310" y="880" width="230" height="40" as="geometry" />
        </mxCell>

        <!-- ========================================================================= -->
        <!-- TIER 1: INPUT / PERCEPTION LAYER (CENTERED TOP ENCLAVE)                   -->
        <!-- ========================================================================= -->
        <mxCell id="tier-perception" value="Input / Perception Layer" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F2547;gradientColor=#09152B;strokeColor=#38BDF8;strokeWidth=2;verticalAlign=top;align=center;spacingTop=10;fontSize=15;fontStyle=1;fontColor=#FFFFFF;container=1;collapsible=0;" vertex="1" parent="1">
          <mxGeometry x="360" y="90" width="880" height="130" as="geometry" />
        </mxCell>

        <mxCell id="in-datasources" value="Data Sources&#xa;Enterprise DBs &amp; Warehouses" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#132F5C;strokeColor=#38BDF8;strokeWidth=1.5;fontColor=#E2E8F0;fontSize=11;fontStyle=1;" vertex="1" parent="tier-perception">
          <mxGeometry x="40" y="48" width="240" height="62" as="geometry" />
        </mxCell>

        <mxCell id="in-apis" value="APIs &amp; Event Streams&#xa;REST • Webhooks • Telemetry" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#132F5C;strokeColor=#38BDF8;strokeWidth=1.5;fontColor=#38BDF8;fontSize=11;fontStyle=1;" vertex="1" parent="tier-perception">
          <mxGeometry x="320" y="48" width="240" height="62" as="geometry" />
        </mxCell>

        <mxCell id="in-prompts" value="User Prompts&#xa;Multimodal Natural Language Goals" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#132F5C;strokeColor=#38BDF8;strokeWidth=1.5;fontColor=#E2E8F0;fontSize=11;fontStyle=1;" vertex="1" parent="tier-perception">
          <mxGeometry x="600" y="48" width="240" height="62" as="geometry" />
        </mxCell>

        <!-- ========================================================================= -->
        <!-- TIER 2: COGNITIVE TRIAD (MEMORY <-> REASONING CORE <-> PLANNING MODULE)   -->
        <!-- ========================================================================= -->
        <!-- Left Pod: Memory -->
        <mxCell id="pod-memory" value="Memory" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F2547;gradientColor=#09152B;strokeColor=#38BDF8;strokeWidth=2;verticalAlign=top;align=center;spacingTop=12;fontSize=15;fontStyle=1;fontColor=#FFFFFF;container=1;collapsible=0;" vertex="1" parent="1">
          <mxGeometry x="140" y="280" width="360" height="230" as="geometry" />
        </mxCell>

        <mxCell id="mem-short-long" value="Short-Term &amp; Long-Term&#xa;Episodic Conversation &amp; Working Context" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#132F5C;strokeColor=#38BDF8;strokeWidth=1.5;fontColor=#FFFFFF;fontSize=11.5;fontStyle=1;" vertex="1" parent="pod-memory">
          <mxGeometry x="30" y="55" width="300" height="72" as="geometry" />
        </mxCell>

        <mxCell id="mem-vector-db" value="Vector Database&#xa;Semantic Embeddings &amp; Hybrid RAG" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#132F5C;strokeColor=#0284C7;strokeWidth=1.5;fontColor=#7DD3FC;fontSize=11.5;fontStyle=1;" vertex="1" parent="pod-memory">
          <mxGeometry x="30" y="140" width="300" height="68" as="geometry" />
        </mxCell>

        <!-- Center Pod: Reasoning Core -->
        <mxCell id="pod-reasoning" value="Reasoning Core" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#112A54;gradientColor=#0A1936;strokeColor=#38BDF8;strokeWidth=2.5;verticalAlign=top;align=center;spacingTop=12;fontSize=16;fontStyle=1;fontColor=#38BDF8;container=1;collapsible=0;" vertex="1" parent="1">
          <mxGeometry x="600" y="280" width="400" height="230" as="geometry" />
        </mxCell>

        <mxCell id="core-llm-brain" value="LLM Brain&#xa;Autonomous Foundation Model Orchestrator&#xa;Chain-of-Thought • ReAct Reasoning • Self-Critique" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E3A8A;strokeColor=#38BDF8;strokeWidth=2;fontColor=#FFFFFF;fontSize=13;fontStyle=1;" vertex="1" parent="pod-reasoning">
          <mxGeometry x="35" y="60" width="330" height="142" as="geometry" />
        </mxCell>

        <!-- Right Pod: Planning Module -->
        <mxCell id="pod-planning" value="Planning Module" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F2547;gradientColor=#09152B;strokeColor=#38BDF8;strokeWidth=2;verticalAlign=top;align=center;spacingTop=12;fontSize=15;fontStyle=1;fontColor=#FFFFFF;container=1;collapsible=0;" vertex="1" parent="1">
          <mxGeometry x="1100" y="280" width="360" height="230" as="geometry" />
        </mxCell>

        <mxCell id="plan-task-decomp" value="Task Decomposition&#xa;Sub-Goal Tree &amp; DAG Step Sequencing" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#132F5C;strokeColor=#38BDF8;strokeWidth=1.5;fontColor=#FFFFFF;fontSize=11.5;fontStyle=1;" vertex="1" parent="pod-planning">
          <mxGeometry x="30" y="55" width="300" height="72" as="geometry" />
        </mxCell>

        <mxCell id="plan-reflection" value="Goal Verification &amp; Re-Planning&#xa;Dynamic Fallback &amp; Strategy Adaptation" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#132F5C;strokeColor=#0284C7;strokeWidth=1.5;fontColor=#7DD3FC;fontSize=11.5;fontStyle=1;" vertex="1" parent="pod-planning">
          <mxGeometry x="30" y="140" width="300" height="68" as="geometry" />
        </mxCell>

        <!-- ========================================================================= -->
        <!-- TIER 3: EXTERNAL APIS • CODE EXECUTION (INTEGRATION RUNTIME BAR)          -->
        <!-- ========================================================================= -->
        <mxCell id="tier-external-runtime" value="External APIs  •  Code Execution  •  MCP Tooling Runtime" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F2547;gradientColor=#09152B;strokeColor=#38BDF8;strokeWidth=2;verticalAlign=top;align=center;spacingTop=10;fontSize=14;fontStyle=1;fontColor=#FFFFFF;container=1;collapsible=0;" vertex="1" parent="1">
          <mxGeometry x="440" y="575" width="720" height="105" as="geometry" />
        </mxCell>

        <mxCell id="ext-db-connectors" value="Enterprise Databases &amp; Connectors" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#132F5C;strokeColor=#38BDF8;strokeWidth=1.5;fontColor=#E2E8F0;fontSize=11;fontStyle=1;" vertex="1" parent="tier-external-runtime">
          <mxGeometry x="30" y="42" width="205" height="48" as="geometry" />
        </mxCell>

        <mxCell id="ext-api-gateway" value="External REST / GraphQL APIs" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#132F5C;strokeColor=#38BDF8;strokeWidth=1.5;fontColor=#38BDF8;fontSize=11;fontStyle=1;" vertex="1" parent="tier-external-runtime">
          <mxGeometry x="257" y="42" width="205" height="48" as="geometry" />
        </mxCell>

        <mxCell id="ext-code-sandbox" value="Sandboxed Code Execution" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#132F5C;strokeColor=#38BDF8;strokeWidth=1.5;fontColor=#E2E8F0;fontSize=11;fontStyle=1;" vertex="1" parent="tier-external-runtime">
          <mxGeometry x="485" y="42" width="205" height="48" as="geometry" />
        </mxCell>

        <!-- ========================================================================= -->
        <!-- TIER 4: ACTION / EXECUTION LAYER                                          -->
        <!-- ========================================================================= -->
        <mxCell id="tier-action-layer" value="Action / Execution Layer&#xa;Autonomous Task Dispatch • System Actuation • Output Delivery" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#132F5C;gradientColor=#0A1936;strokeColor=#38BDF8;strokeWidth=2.5;fontColor=#FFFFFF;fontSize=15;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="460" y="730" width="680" height="82" as="geometry" />
        </mxCell>

        <!-- ========================================================================= -->
        <!-- TIER 5: SYMMETRICAL CLOSED-LOOP FEEDBACK / REFLECTION PILL                -->
        <!-- ========================================================================= -->
        <mxCell id="pill-feedback-loop" value="Feedback / Reflection Loop  (Continuous Environment Observation &amp; Memory Update)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0A1936;strokeColor=#38BDF8;strokeWidth=2;fontColor=#38BDF8;fontSize=12;fontStyle=1;align=center;" vertex="1" parent="1">
          <mxGeometry x="520" y="855" width="560" height="46" as="geometry" />
        </mxCell>

        <!-- ========================================================================= -->
        <!-- CLEAN ORTHOGONAL & SYMMETRICAL CONNECTORS (ZERO LINE CROSSINGS)           -->
        <!-- ========================================================================= -->
        <!-- 1. Perception -> Reasoning Core -->
        <mxCell id="e-percept-reason" value="❶ Context &amp; Intent" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#38BDF8;strokeWidth=2.5;fontColor=#070D19;fontSize=9.5;fontStyle=1;labelBackgroundColor=#38BDF8;" edge="1" parent="1" source="tier-perception" target="pod-reasoning">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- 2. Memory <-> Reasoning Core (Bi-directional) -->
        <mxCell id="e-mem-reason" value="❷ Recall / Store" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;startArrow=classic;startFill=1;endArrow=classic;endFill=1;strokeColor=#38BDF8;strokeWidth=2.5;fontColor=#070D19;fontSize=9.5;fontStyle=1;labelBackgroundColor=#38BDF8;" edge="1" parent="1" source="pod-memory" target="pod-reasoning">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- 3. Reasoning Core <-> Planning Module (Bi-directional) -->
        <mxCell id="e-reason-plan" value="❸ Plan / Refine" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;startArrow=classic;startFill=1;endArrow=classic;endFill=1;strokeColor=#38BDF8;strokeWidth=2.5;fontColor=#070D19;fontSize=9.5;fontStyle=1;labelBackgroundColor=#38BDF8;" edge="1" parent="1" source="pod-reasoning" target="pod-planning">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- 4. Memory -> External APIs (Left Elbow) -->
        <mxCell id="e-mem-ext" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#38BDF8;strokeWidth=2;" edge="1" parent="1" source="pod-memory" target="tier-external-runtime">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="320" y="627" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- 5. Reasoning Core -> External APIs (Direct Center) -->
        <mxCell id="e-reason-ext" value="❹ Tool &amp; API Calls" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#38BDF8;strokeWidth=2.5;fontColor=#070D19;fontSize=9.5;fontStyle=1;labelBackgroundColor=#38BDF8;" edge="1" parent="1" source="pod-reasoning" target="tier-external-runtime">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- 6. Planning Module -> External APIs (Right Elbow) -->
        <mxCell id="e-plan-ext" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#38BDF8;strokeWidth=2;" edge="1" parent="1" source="pod-planning" target="tier-external-runtime">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1280" y="627" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- 7. External APIs -> Action Layer -->
        <mxCell id="e-ext-action" value="❺ Execution Dispatch" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#38BDF8;strokeWidth=2.5;fontColor=#070D19;fontSize=9.5;fontStyle=1;labelBackgroundColor=#38BDF8;" edge="1" parent="1" source="tier-external-runtime" target="tier-action-layer">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- 8. Symmetrical Left Feedback Arc: Action Layer -> Feedback Pill -> Memory -->
        <mxCell id="e-action-feedback-left" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#38BDF8;strokeWidth=2;dashed=1;dashPattern=6 4;" edge="1" parent="1" source="tier-action-layer" target="pill-feedback-loop">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="e-feedback-to-memory" value="❻ Memory Update" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#38BDF8;strokeWidth=2;dashed=1;dashPattern=6 4;fontColor=#38BDF8;fontSize=9.5;fontStyle=1;labelBackgroundColor=#070D19;" edge="1" parent="1" source="pill-feedback-loop" target="pod-memory">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="80" y="878" />
              <mxPoint x="80" y="395" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- 9. Symmetrical Right Feedback Arc: Feedback Pill -> Planning Module -->
        <mxCell id="e-feedback-to-planning" value="❼ Plan Adaptation" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#38BDF8;strokeWidth=2;dashed=1;dashPattern=6 4;fontColor=#38BDF8;fontSize=9.5;fontStyle=1;labelBackgroundColor=#070D19;" edge="1" parent="1" source="pill-feedback-loop" target="pod-planning">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1520" y="878" />
              <mxPoint x="1520" y="395" />
            </Array>
          </mxGeometry>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
