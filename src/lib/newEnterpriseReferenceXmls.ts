/**
 * 🏛️ Master Widescreen Reference Layouts for New Enterprise Blueprints:
 * 1. Human-in-the-Loop Autonomous AI Agent Governance Lifecycle (Business / Executive)
 * 2. Multi-Agent Autonomous LLM Orchestration Platform (Vertex AI / LangGraph + Tool Sandbox + pgvector)
 */

export function getExactAgentGovernanceHitlReferenceXml(): string {
  return `
<mxfile host="app.diagrams.net" modified="${new Date().toISOString()}" agent="PromptCanvas" version="21.0.0" type="device">
  <diagram id="hitl-agent-gov" name="Human-in-the-Loop Autonomous AI Agent Governance Lifecycle">
    <mxGraphModel dx="0" dy="0" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="0" pageWidth="1920" pageHeight="1080" background="#0F172A">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- Master Widescreen Frame -->
        <mxCell id="frame" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#38BDF8;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="40" y="40" width="1840" height="1000" as="geometry" />
        </mxCell>

        <!-- Header Title & Subtitle -->
        <mxCell id="title" value="HUMAN-IN-THE-LOOP AUTONOMOUS AI AGENT GOVERNANCE LIFECYCLE" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=22;fontStyle=1;fontColor=#F8FAFC;" vertex="1" parent="1">
          <mxGeometry x="60" y="55" width="1800" height="35" as="geometry" />
        </mxCell>
        <mxCell id="subtitle" value="Executive Governance Architecture: Multi-Tier Agent Decision Routing, Confidence Escalation Rules, Mandatory Human Sign-Off Gates &amp; RLHF Feedback Audit" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=13;fontColor=#94A3B8;" vertex="1" parent="1">
          <mxGeometry x="60" y="90" width="1800" height="25" as="geometry" />
        </mxCell>

        <!-- TIER 1: Agent Request & Intent Classification -->
        <mxCell id="t1_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#334155;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="80" y="130" width="370" height="880" as="geometry" />
        </mxCell>
        <mxCell id="t1_title" value="1. AGENT REQUEST &amp; INTENT CLASSIFICATION" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E3A8A;strokeColor=#3B82F6;fontColor=#FFFFFF;fontStyle=1;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="100" y="145" width="330" height="45" as="geometry" />
        </mxCell>

        <mxCell id="node_req" value="&lt;b&gt;Enterprise Action Request&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:11px;color:#94A3B8;'&gt;Customer, API or Automated Workflow Trigger&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#38BDF8;fontColor=#F8FAFC;fontSize=13;align=left;spacingLeft=14;" vertex="1" parent="1">
          <mxGeometry x="105" y="230" width="320" height="140" as="geometry" />
        </mxCell>
        <mxCell id="node_intent" value="&lt;b&gt;Intent &amp; Risk Classification Engine&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:11px;color:#94A3B8;'&gt;Categorizes Action Risk (Low / Financial / PII / System Mod)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#38BDF8;fontColor=#F8FAFC;fontSize=13;align=left;spacingLeft=14;" vertex="1" parent="1">
          <mxGeometry x="105" y="440" width="320" height="140" as="geometry" />
        </mxCell>
        <mxCell id="node_policy" value="&lt;b&gt;Autonomous Policy Gate&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:11px;color:#94A3B8;'&gt;Checks Regulatory &amp; Safety Operational Guardrails&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#38BDF8;fontColor=#F8FAFC;fontSize=13;align=left;spacingLeft=14;" vertex="1" parent="1">
          <mxGeometry x="105" y="650" width="320" height="140" as="geometry" />
        </mxCell>

        <!-- TIER 2: Confidence Escalation & Routing -->
        <mxCell id="t2_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#334155;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="490" y="130" width="410" height="880" as="geometry" />
        </mxCell>
        <mxCell id="t2_title" value="2. CONFIDENCE ESCALATION &amp; DECISION ROUTER" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E3A8A;strokeColor=#3B82F6;fontColor=#FFFFFF;fontStyle=1;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="510" y="145" width="370" height="45" as="geometry" />
        </mxCell>

        <mxCell id="node_high_conf" value="&lt;b&gt;High Confidence Tier (&amp;ge; 95%)&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:11px;color:#4ADE80;'&gt;Fast-Path Autonomous Execution Approved&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#064E3B;strokeColor=#22C55E;fontColor=#F8FAFC;fontSize=13;align=left;spacingLeft=14;" vertex="1" parent="1">
          <mxGeometry x="515" y="230" width="360" height="140" as="geometry" />
        </mxCell>
        <mxCell id="node_med_conf" value="&lt;b&gt;Medium Confidence Tier (75% - 94%)&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:11px;color:#FBBF24;'&gt;Supervisor AI Cross-Verification &amp; Fact Check Required&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#78350F;strokeColor=#F59E0B;fontColor=#F8FAFC;fontSize=13;align=left;spacingLeft=14;" vertex="1" parent="1">
          <mxGeometry x="515" y="440" width="360" height="140" as="geometry" />
        </mxCell>
        <mxCell id="node_esc_gate" value="&lt;b&gt;Mandatory HITL Escalation Router&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:11px;color:#F87171;'&gt;Triggers when Confidence &amp;lt; 75% OR Financial &amp;gt; $10k&lt;/span&gt;" style="rhombus;whiteSpace=wrap;html=1;fillColor=#7F1D1D;strokeColor=#EF4444;fontColor=#F8FAFC;fontSize=12;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="545" y="640" width="300" height="160" as="geometry" />
        </mxCell>

        <!-- TIER 3: Human-in-the-Loop Approval Gate -->
        <mxCell id="t3_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#334155;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="940" y="130" width="410" height="880" as="geometry" />
        </mxCell>
        <mxCell id="t3_title" value="3. HUMAN-IN-THE-LOOP (HITL) WORKBENCH" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E3A8A;strokeColor=#3B82F6;fontColor=#FFFFFF;fontStyle=1;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="960" y="145" width="370" height="45" as="geometry" />
        </mxCell>

        <mxCell id="node_hitl_queue" value="&lt;b&gt;Human Review Queue &amp; Alert Panel&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:11px;color:#94A3B8;'&gt;Presents Context, Proposed Action &amp; Risk Score&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#38BDF8;fontColor=#F8FAFC;fontSize=13;align=left;spacingLeft=14;" vertex="1" parent="1">
          <mxGeometry x="965" y="230" width="360" height="140" as="geometry" />
        </mxCell>
        <mxCell id="node_human_action" value="&lt;b&gt;Human Compliance Officer Review&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:11px;color:#F8FAFC;'&gt;Options: Approve As-Is | Edit Action | Reject Action&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#38BDF8;fontColor=#F8FAFC;fontSize=13;align=left;spacingLeft=14;" vertex="1" parent="1">
          <mxGeometry x="965" y="440" width="360" height="140" as="geometry" />
        </mxCell>
        <mxCell id="node_signature" value="&lt;b&gt;Cryptographic Human Sign-Off Certificate&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:11px;color:#94A3B8;'&gt;Attaches Reviewer Identity, Timestamp &amp; Rationale&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#38BDF8;fontColor=#F8FAFC;fontSize=13;align=left;spacingLeft=14;" vertex="1" parent="1">
          <mxGeometry x="965" y="650" width="360" height="140" as="geometry" />
        </mxCell>

        <!-- TIER 4: Execution, Evidence & RLHF Feedback -->
        <mxCell id="t4_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#334155;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1390" y="130" width="450" height="880" as="geometry" />
        </mxCell>
        <mxCell id="t4_title" value="4. EXECUTION, AUDIT EVIDENCE &amp; RLHF LOOP" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E3A8A;strokeColor=#3B82F6;fontColor=#FFFFFF;fontStyle=1;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="1410" y="145" width="410" height="45" as="geometry" />
        </mxCell>

        <mxCell id="node_exec" value="&lt;b&gt;Enterprise Downstream Action Execution&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:11px;color:#4ADE80;'&gt;Safe Execution via Approved Tool Connectors&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#38BDF8;fontColor=#F8FAFC;fontSize=13;align=left;spacingLeft=14;" vertex="1" parent="1">
          <mxGeometry x="1415" y="230" width="400" height="140" as="geometry" />
        </mxCell>
        <mxCell id="node_audit_store" value="&lt;b&gt;Immutable Regulatory Audit Ledger&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:11px;color:#94A3B8;'&gt;Stores Prompt, Confidence Score, HITL Decision &amp; Output&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#38BDF8;fontColor=#F8FAFC;fontSize=13;align=left;spacingLeft=14;" vertex="1" parent="1">
          <mxGeometry x="1415" y="440" width="400" height="140" as="geometry" />
        </mxCell>
        <mxCell id="node_rlhf" value="&lt;b&gt;RLHF Model Fine-Tuning &amp; Calibration Loop&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:11px;color:#A855F7;'&gt;Human Corrections Feed Back to Calibrate Confidence Tiers&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#A855F7;fontColor=#F8FAFC;fontSize=13;align=left;spacingLeft=14;" vertex="1" parent="1">
          <mxGeometry x="1415" y="650" width="400" height="140" as="geometry" />
        </mxCell>

        <!-- Directional Connectors -->
        <mxCell id="c1" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#38BDF8;strokeWidth=2;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="node_req" target="node_high_conf" />
        <mxCell id="c2" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#38BDF8;strokeWidth=2;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="node_intent" target="node_med_conf" />
        <mxCell id="c3" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#EF4444;strokeWidth=2;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="node_policy" target="node_esc_gate" />

        <mxCell id="c4" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#22C55E;strokeWidth=2;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="node_high_conf" target="node_exec" />
        <mxCell id="c5" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#F59E0B;strokeWidth=2;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="node_med_conf" target="node_hitl_queue" />
        <mxCell id="c6" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#EF4444;strokeWidth=2;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="node_esc_gate" target="node_human_action" />

        <mxCell id="c7" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#38BDF8;strokeWidth=2;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="node_human_action" target="node_audit_store" />
        <mxCell id="c8" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#A855F7;strokeWidth=2;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="node_audit_store" target="node_rlhf" />

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
  `.trim();
}

export function getExactMultiAgentLangGraphReferenceXml(): string {
  return `
<mxfile host="app.diagrams.net" modified="${new Date().toISOString()}" agent="PromptCanvas" version="21.0.0" type="device">
  <diagram id="multi-agent-langgraph" name="Multi-Agent Autonomous LLM Orchestration Platform (Vertex AI / LangGraph)">
    <mxGraphModel dx="0" dy="0" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="0" pageWidth="1920" pageHeight="1080" background="#0F172A">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- Master Widescreen Frame -->
        <mxCell id="frame" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#38BDF8;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="40" y="40" width="1840" height="1000" as="geometry" />
        </mxCell>

        <!-- Header Title & Subtitle -->
        <mxCell id="title" value="MULTI-AGENT AUTONOMOUS LLM ORCHESTRATION PLATFORM (VERTEX AI / LANGGRAPH)" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=22;fontStyle=1;fontColor=#F8FAFC;" vertex="1" parent="1">
          <mxGeometry x="60" y="55" width="1800" height="35" as="geometry" />
        </mxCell>
        <mxCell id="subtitle" value="Production LangGraph &amp; Vertex AI Multi-Agent Topology: Master Supervisor Router, Worker Agents, Isolated Container Sandbox, Vector Memory Store &amp; HITL Interrupt Gate" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=13;fontColor=#94A3B8;" vertex="1" parent="1">
          <mxGeometry x="60" y="90" width="1800" height="25" as="geometry" />
        </mxCell>

        <!-- TIER 1: Master Agent Router & Ingress -->
        <mxCell id="t1_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#334155;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="80" y="130" width="370" height="880" as="geometry" />
        </mxCell>
        <mxCell id="t1_title" value="1. MASTER AGENT ROUTER &amp; INGRESS" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E3A8A;strokeColor=#3B82F6;fontColor=#FFFFFF;fontStyle=1;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="100" y="145" width="330" height="45" as="geometry" />
        </mxCell>

        <mxCell id="node_client" value="&lt;b&gt;User Application / API Gateway&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:11px;color:#94A3B8;'&gt;Complex Query, Task or Automation Request&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#38BDF8;fontColor=#F8FAFC;fontSize=13;align=left;spacingLeft=14;" vertex="1" parent="1">
          <mxGeometry x="105" y="230" width="320" height="140" as="geometry" />
        </mxCell>
        <mxCell id="node_supervisor" value="&lt;b&gt;LangGraph Master Supervisor Agent&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:11px;color:#38BDF8;'&gt;Decomposes Goals &amp; Routes Tasks to Sub-Agents&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#38BDF8;fontColor=#F8FAFC;fontSize=13;align=left;spacingLeft=14;" vertex="1" parent="1">
          <mxGeometry x="105" y="440" width="320" height="160" as="geometry" />
        </mxCell>
        <mxCell id="node_state" value="&lt;b&gt;LangGraph Shared State Channel&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:11px;color:#94A3B8;'&gt;Thread-Safe Memory &amp; Task Execution History&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#38BDF8;fontColor=#F8FAFC;fontSize=13;align=left;spacingLeft=14;" vertex="1" parent="1">
          <mxGeometry x="105" y="670" width="320" height="130" as="geometry" />
        </mxCell>

        <!-- TIER 2: Specialized Autonomous Worker Agents -->
        <mxCell id="t2_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#334155;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="490" y="130" width="410" height="880" as="geometry" />
        </mxCell>
        <mxCell id="t2_title" value="2. SPECIALIZED WORKER AGENT CLUSTER" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E3A8A;strokeColor=#3B82F6;fontColor=#FFFFFF;fontStyle=1;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="510" y="145" width="370" height="45" as="geometry" />
        </mxCell>

        <mxCell id="node_worker_research" value="&lt;b&gt;Research &amp; Retrieval Agent (RAG)&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:11px;color:#94A3B8;'&gt;Queries Vector Databases &amp; Enterprise Docs&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#38BDF8;fontColor=#F8FAFC;fontSize=13;align=left;spacingLeft=14;" vertex="1" parent="1">
          <mxGeometry x="515" y="230" width="360" height="130" as="geometry" />
        </mxCell>
        <mxCell id="node_worker_code" value="&lt;b&gt;Code Generation &amp; SQL Agent&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:11px;color:#38BDF8;'&gt;Synthesizes Executable Python, SQL &amp; Terraform Code&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#38BDF8;fontColor=#F8FAFC;fontSize=13;align=left;spacingLeft=14;" vertex="1" parent="1">
          <mxGeometry x="515" y="420" width="360" height="140" as="geometry" />
        </mxCell>
        <mxCell id="node_worker_verify" value="&lt;b&gt;Verification &amp; Test Critic Agent&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:11px;color:#4ADE80;'&gt;Evaluates Code Accuracy &amp; Factual Grounding&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#4ADE80;fontColor=#F8FAFC;fontSize=13;align=left;spacingLeft=14;" vertex="1" parent="1">
          <mxGeometry x="515" y="620" width="360" height="140" as="geometry" />
        </mxCell>

        <!-- TIER 3: Isolated Execution Sandbox & Vector Memory -->
        <mxCell id="t3_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#334155;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="940" y="130" width="410" height="880" as="geometry" />
        </mxCell>
        <mxCell id="t3_title" value="3. ISOLATED TOOL SANDBOX &amp; VECTOR MEMORY" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E3A8A;strokeColor=#3B82F6;fontColor=#FFFFFF;fontStyle=1;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="960" y="145" width="370" height="45" as="geometry" />
        </mxCell>

        <mxCell id="node_sandbox" value="&lt;b&gt;Cloud Run Isolated Code Sandbox&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:11px;color:#4ADE80;'&gt;Safe Execution of Generated Code &amp; Unit Tests&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#064E3B;strokeColor=#22C55E;fontColor=#F8FAFC;fontSize=13;align=left;spacingLeft=14;" vertex="1" parent="1">
          <mxGeometry x="965" y="230" width="360" height="140" as="geometry" />
        </mxCell>
        <mxCell id="node_tool_gw" value="&lt;b&gt;gRPC / REST Tool Call Gateway&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:11px;color:#94A3B8;'&gt;Connects to Cloud Run APIs, BigQuery &amp; GitHub&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#38BDF8;fontColor=#F8FAFC;fontSize=13;align=left;spacingLeft=14;" vertex="1" parent="1">
          <mxGeometry x="965" y="440" width="360" height="140" as="geometry" />
        </mxCell>
        <mxCell id="node_pgvector" value="&lt;b&gt;Cloud SQL (pgvector) Long-Term Memory&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:11px;color:#38BDF8;'&gt;Agent Knowledge Embeddings &amp; Cross-Session Recall&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#38BDF8;fontColor=#F8FAFC;fontSize=13;align=left;spacingLeft=14;" vertex="1" parent="1">
          <mxGeometry x="965" y="650" width="360" height="140" as="geometry" />
        </mxCell>

        <!-- TIER 4: Human-in-the-Loop Interrupt & Endpoint Output -->
        <mxCell id="t4_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#334155;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1390" y="130" width="450" height="880" as="geometry" />
        </mxCell>
        <mxCell id="t4_title" value="4. HITL INTERRUPT GATE &amp; ENDPOINT OUTPUT" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E3A8A;strokeColor=#3B82F6;fontColor=#FFFFFF;fontStyle=1;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="1410" y="145" width="410" height="45" as="geometry" />
        </mxCell>

        <mxCell id="node_interrupt" value="&lt;b&gt;LangGraph Human Interrupt Gate&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:11px;color:#FBBF24;'&gt;Pauses Execution for Production Mutating Actions&lt;/span&gt;" style="rhombus;whiteSpace=wrap;html=1;fillColor=#78350F;strokeColor=#F59E0B;fontColor=#F8FAFC;fontSize=12;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="1460" y="230" width="310" height="150" as="geometry" />
        </mxCell>
        <mxCell id="node_synthesis" value="&lt;b&gt;Final Output Synthesizer &amp; Citation Engine&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:11px;color:#4ADE80;'&gt;Aggregates Agent Artifacts with Full Attributions&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#38BDF8;fontColor=#F8FAFC;fontSize=13;align=left;spacingLeft=14;" vertex="1" parent="1">
          <mxGeometry x="1415" y="440" width="400" height="140" as="geometry" />
        </mxCell>
        <mxCell id="node_telemetry" value="&lt;b&gt;Cloud Logging &amp; Cloud Trace Observability&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:11px;color:#94A3B8;'&gt;Tracks Multi-Agent Latency, Token Cost &amp; Execution DAG&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#38BDF8;fontColor=#F8FAFC;fontSize=13;align=left;spacingLeft=14;" vertex="1" parent="1">
          <mxGeometry x="1415" y="650" width="400" height="140" as="geometry" />
        </mxCell>

        <!-- Directional Connectors -->
        <mxCell id="e1" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#38BDF8;strokeWidth=2;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="node_client" target="node_worker_research" />
        <mxCell id="e2" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#38BDF8;strokeWidth=2;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="node_supervisor" target="node_worker_code" />
        <mxCell id="e3" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#38BDF8;strokeWidth=2;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="node_worker_code" target="node_sandbox" />
        <mxCell id="e4" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#38BDF8;strokeWidth=2;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="node_worker_research" target="node_pgvector" />
        <mxCell id="e5" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#4ADE80;strokeWidth=2;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="node_sandbox" target="node_interrupt" />
        <mxCell id="e6" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#F59E0B;strokeWidth=2;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="node_interrupt" target="node_synthesis" />
        <mxCell id="e7" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#38BDF8;strokeWidth=2;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="node_synthesis" target="node_telemetry" />

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
  `.trim();
}
