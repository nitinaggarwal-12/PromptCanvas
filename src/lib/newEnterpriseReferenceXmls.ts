/**
 * 🏛️ Master Widescreen Reference Layouts for New Enterprise Blueprints:
 * 1. Human-in-the-Loop Autonomous AI Agent Governance Lifecycle (Business / Executive)
 * 2. Multi-Agent Autonomous LLM Orchestration Platform (Vertex AI / LangGraph + Tool Sandbox + pgvector)
 */

export function getExactAgentGovernanceHitlReferenceXml(): string {
  return `
<mxfile host="app.diagrams.net" modified="${new Date().toISOString()}" agent="PromptCanvas" version="21.0.0" type="device">
  <diagram id="hitl-agent-gov" name="Human-in-the-Loop Autonomous AI Agent Governance Lifecycle">
    <mxGraphModel dx="1600" dy="900" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1920" pageHeight="1080" background="#0F172A">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- Master Widescreen Frame (1920x1080) -->
        <mxCell id="frame" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#38BDF8;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="20" y="20" width="1880" height="1040" as="geometry" />
        </mxCell>

        <!-- Header -->
        <mxCell id="header_title" value="HUMAN-IN-THE-LOOP AUTONOMOUS AI AGENT GOVERNANCE LIFECYCLE" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=22;fontStyle=1;fontColor=#F8FAFC;" vertex="1" parent="1">
          <mxGeometry x="40" y="35" width="1840" height="35" as="geometry" />
        </mxCell>
        <mxCell id="header_sub" value="Enterprise Executive Governance Architecture: Autonomous Agent Intent Assessment, Multi-Tier Confidence Escalation, Interactive Human Approval Workbench &amp; Immutable Audit RLHF Loop" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=13;fontColor=#94A3B8;" vertex="1" parent="1">
          <mxGeometry x="40" y="70" width="1840" height="25" as="geometry" />
        </mxCell>

        <!-- COLUMN 1 (x=60, width=380): Enterprise Ingestion & Action Assessment -->
        <mxCell id="col1_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#334155;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="60" y="110" width="380" height="820" as="geometry" />
        </mxCell>
        <mxCell id="col1_title" value="1. ENTERPRISE INGESTION &amp; ACTION ASSESSMENT" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E3A8A;strokeColor=#3B82F6;fontColor=#FFFFFF;fontStyle=1;fontSize=12;spacingTop=4;" vertex="1" parent="1">
          <mxGeometry x="80" y="125" width="340" height="45" as="geometry" />
        </mxCell>

        <mxCell id="c1_box1" value="&lt;b&gt;Enterprise Action Portal / Trigger&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:10px;color:#94A3B8;'&gt;• Customer Service &amp;amp; API Ingestion&lt;br/&gt;• Automated Batch &amp;amp; Tool Workflows&lt;br/&gt;• Natural Language Agent Intent Payload&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#38BDF8;fontColor=#F8FAFC;fontSize=11;align=left;spacingLeft=14;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="85" y="190" width="330" height="135" as="geometry" />
        </mxCell>

        <!-- Multi-Risk Categorization Sub-Track -->
        <mxCell id="c1_track_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#475569;dashed=1;" vertex="1" parent="1">
          <mxGeometry x="85" y="345" width="330" height="320" as="geometry" />
        </mxCell>
        <mxCell id="c1_track_title" value="Automated Intent &amp;amp; Risk Categorization Engine" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontColor=#38BDF8;fontStyle=1;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="90" y="352" width="320" height="22" as="geometry" />
        </mxCell>

        <mxCell id="c1_r1" value="&lt;b&gt;💰 Financial&lt;br/&gt;Risk Tier&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:9px;color:#94A3B8;'&gt;Transaction Cap&lt;br/&gt;&amp;amp; Refund Audit&lt;br/&gt;Thresholds&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#F59E0B;fontColor=#F8FAFC;fontSize=11;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="95" y="380" width="95" height="265" as="geometry" />
        </mxCell>
        <mxCell id="c1_r2" value="&lt;b&gt;🔒 Data Privacy&lt;br/&gt;&amp;amp; PII Tier&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:9px;color:#94A3B8;'&gt;GDPR / HIPAA&lt;br/&gt;Sensitive Field&lt;br/&gt;Detection&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#A855F7;fontColor=#F8FAFC;fontSize=11;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="202" y="380" width="95" height="265" as="geometry" />
        </mxCell>
        <mxCell id="c1_r3" value="&lt;b&gt;⚡ System Mod&lt;br/&gt;Impact Tier&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:9px;color:#94A3B8;'&gt;Production DB&lt;br/&gt;Write / External&lt;br/&gt;API Mutation&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#EF4444;fontColor=#F8FAFC;fontSize=11;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="310" y="380" width="95" height="265" as="geometry" />
        </mxCell>

        <mxCell id="c1_gate" value="🛡️ Autonomous Guardrail Pre-Screening Passed ➔" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#3B82F6;fontColor=#FFFFFF;fontStyle=1;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="85" y="690" width="330" height="60" as="geometry" />
        </mxCell>

        <!-- COLUMN 2 (x=480, width=420): Confidence Escalation & Multi-Tier Routing -->
        <mxCell id="col2_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#334155;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="480" y="110" width="420" height="820" as="geometry" />
        </mxCell>
        <mxCell id="col2_title" value="2. CONFIDENCE ESCALATION &amp;amp; ROUTING" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E3A8A;strokeColor=#3B82F6;fontColor=#FFFFFF;fontStyle=1;fontSize=12;spacingTop=4;" vertex="1" parent="1">
          <mxGeometry x="500" y="125" width="380" height="45" as="geometry" />
        </mxCell>

        <mxCell id="c2_track_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#475569;dashed=1;" vertex="1" parent="1">
          <mxGeometry x="500" y="185" width="380" height="265" as="geometry" />
        </mxCell>
        <mxCell id="c2_track_title" value="Three-Tier Confidence Escalation Matrix" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontColor=#38BDF8;fontStyle=1;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="505" y="192" width="370" height="22" as="geometry" />
        </mxCell>

        <mxCell id="conf_tier1" value="&lt;b&gt;🟢 Fast Path&lt;br/&gt;(&amp;ge; 95% Conf)&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:9px;color:#4ADE80;'&gt;Low Risk / High&lt;br/&gt;Certainty Actions&lt;br/&gt;Auto-Executed&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#064E3B;strokeColor=#22C55E;fontColor=#F8FAFC;fontSize=11;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="515" y="225" width="105" height="205" as="geometry" />
        </mxCell>
        <mxCell id="conf_tier2" value="&lt;b&gt;🟡 AI Audit&lt;br/&gt;(75% - 94%)&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:9px;color:#FBBF24;'&gt;Supervisor AI&lt;br/&gt;Cross-Verification&lt;br/&gt;&amp;amp; Fact Check&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#78350F;strokeColor=#F59E0B;fontColor=#F8FAFC;fontSize=11;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="637" y="225" width="105" height="205" as="geometry" />
        </mxCell>
        <mxCell id="conf_tier3" value="&lt;b&gt;🔴 HITL Gate&lt;br/&gt;(&amp;lt; 75% Conf)&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:9px;color:#F87171;'&gt;Mandatory Human&lt;br/&gt;Review Escalation&lt;br/&gt;Triggered&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#7F1D1D;strokeColor=#EF4444;fontColor=#F8FAFC;fontSize=11;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="760" y="225" width="105" height="205" as="geometry" />
        </mxCell>

        <!-- Supervisor AI Cross-Verification Box -->
        <mxCell id="supervisor_box" value="&lt;b&gt;SUPERVISOR AI CROSS-VERIFICATION HUB&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:10px;color:#94A3B8;'&gt;• Second-Pass Semantic Consistency Check &amp;amp; Grounding Verdict&lt;br/&gt;• Automatic Promotion to Fast-Path if Verification Passes&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#38BDF8;fontColor=#F8FAFC;fontSize=11;align=left;spacingLeft=14;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="500" y="475" width="380" height="115" as="geometry" />
        </mxCell>

        <!-- Decision Router Hub -->
        <mxCell id="decision_hub" value="&lt;b&gt;DYNAMIC DECISION &amp;amp; ESCALATION ROUTER&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:10px;color:#E2E8F0;'&gt;Routes High-Confidence Actions directly to Execution; Escalates Suspicious / High-Risk / Low-Confidence to Human Review Workbench&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E3A8A;strokeColor=#3B82F6;fontColor=#FFFFFF;fontStyle=1;fontSize=12;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="500" y="620" width="380" height="130" as="geometry" />
        </mxCell>

        <!-- COLUMN 3 (x=940, width=420): Human-in-the-Loop (HITL) Workbench & Enclave -->
        <mxCell id="col3_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#334155;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="940" y="110" width="420" height="820" as="geometry" />
        </mxCell>
        <mxCell id="col3_title" value="3. HUMAN-IN-THE-LOOP (HITL) WORKBENCH" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E3A8A;strokeColor=#3B82F6;fontColor=#FFFFFF;fontStyle=1;fontSize=12;spacingTop=4;" vertex="1" parent="1">
          <mxGeometry x="960" y="125" width="380" height="45" as="geometry" />
        </mxCell>

        <mxCell id="hitl_console" value="&lt;b&gt;Human Reviewer Interactive Console&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:10px;color:#94A3B8;'&gt;• Displays Agent Prompt, Proposed Tool Call &amp;amp; Risk Rationale&lt;br/&gt;• Highlights Confidence Gaps &amp;amp; Compliance Policy Flag&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#38BDF8;fontColor=#F8FAFC;fontSize=11;align=left;spacingLeft=14;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="965" y="190" width="370" height="125" as="geometry" />
        </mxCell>

        <!-- 3 Review Decision Option Cards -->
        <mxCell id="hitl_options_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#475569;dashed=1;" vertex="1" parent="1">
          <mxGeometry x="965" y="335" width="370" height="260" as="geometry" />
        </mxCell>
        <mxCell id="hitl_opt_title" value="Mandatory Human Sign-Off Verdict Options" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontColor=#38BDF8;fontStyle=1;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="970" y="342" width="360" height="22" as="geometry" />
        </mxCell>

        <mxCell id="opt_approve" value="&lt;b&gt;✅ Approve&lt;br/&gt;As-Is&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:9px;color:#4ADE80;'&gt;Authorize tool&lt;br/&gt;execution with&lt;br/&gt;digital signature&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#064E3B;strokeColor=#22C55E;fontColor=#F8FAFC;fontSize=11;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="975" y="375" width="105" height="205" as="geometry" />
        </mxCell>
        <mxCell id="opt_modify" value="&lt;b&gt;✏️ Edit &amp;amp;&lt;br/&gt;Approve&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:9px;color:#FBBF24;'&gt;Modify action&lt;br/&gt;parameters or&lt;br/&gt;refund caps&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#78350F;strokeColor=#F59E0B;fontColor=#F8FAFC;fontSize=11;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="1097" y="375" width="105" height="205" as="geometry" />
        </mxCell>
        <mxCell id="opt_reject" value="&lt;b&gt;🚫 Reject &amp;amp;&lt;br/&gt;Remediate&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:9px;color:#F87171;'&gt;Halt action &amp;amp;&lt;br/&gt;escalate to AI&lt;br/&gt;Safety Team&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#7F1D1D;strokeColor=#EF4444;fontColor=#F8FAFC;fontSize=11;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="1220" y="375" width="105" height="205" as="geometry" />
        </mxCell>

        <!-- Cryptographic Certificate Hub -->
        <mxCell id="crypto_hub" value="&lt;b&gt;CRYPTOGRAPHIC HUMAN SIGN-OFF CERTIFICATE&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:10px;color:#E2E8F0;'&gt;Binds Compliance Officer Employee ID, Cryptographic SHA-256 Timestamp &amp;amp; Override Reason to Action Token&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E3A8A;strokeColor=#3B82F6;fontColor=#FFFFFF;fontStyle=1;fontSize=12;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="965" y="620" width="370" height="130" as="geometry" />
        </mxCell>

        <!-- COLUMN 4 (x=1400, width=440): Execution, Evidence & RLHF Feedback -->
        <mxCell id="col4_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#334155;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1400" y="110" width="440" height="820" as="geometry" />
        </mxCell>
        <mxCell id="col4_title" value="4. SAFE EXECUTION &amp;amp; AUDIT EVIDENCE LEDGER" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E3A8A;strokeColor=#3B82F6;fontColor=#FFFFFF;fontStyle=1;fontSize=12;spacingTop=4;" vertex="1" parent="1">
          <mxGeometry x="1420" y="125" width="400" height="45" as="geometry" />
        </mxCell>

        <mxCell id="c4_exec" value="&lt;b&gt;Enterprise Downstream Action Execution&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:10px;color:#4ADE80;'&gt;• Safe Dispatch via Authorized Cloud Run Connector&lt;br/&gt;• Idempotent API Execution with Rollback Protection&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#38BDF8;fontColor=#F8FAFC;fontSize=11;align=left;spacingLeft=14;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="1425" y="190" width="390" height="135" as="geometry" />
        </mxCell>

        <mxCell id="c4_audit" value="&lt;b&gt;Immutable Regulatory Audit Evidence Store&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:10px;color:#94A3B8;'&gt;• Stores Original Intent, Confidence Score &amp;amp; HITL Token&lt;br/&gt;• SOC2 / HIPAA Compliance Report Export Ready&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#38BDF8;fontColor=#F8FAFC;fontSize=11;align=left;spacingLeft=14;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="1425" y="355" width="390" height="135" as="geometry" />
        </mxCell>

        <mxCell id="c4_rlhf" value="&lt;b&gt;RLHF Model Fine-Tuning Calibration Engine&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:10px;color:#A855F7;'&gt;• Human Modifications &amp;amp; Rejections Feed RLHF Pipeline&lt;br/&gt;• Continuously Calibrates Fast-Path Confidence Thresholds&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#A855F7;fontColor=#F8FAFC;fontSize=11;align=left;spacingLeft=14;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="1425" y="520" width="390" height="135" as="geometry" />
        </mxCell>

        <!-- Feedback Loop Connector along bottom margin -->
        <mxCell id="loop_back" value="Continuous RLHF Calibration &amp;amp; Confidence Threshold Updating Loop" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#A855F7;strokeWidth=2;dashed=1;fontColor=#C084FC;fontSize=11;labelBackgroundColor=#0F172A;" edge="1" parent="1" source="c4_rlhf" target="col1_title">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1620" y="880" />
              <mxPoint x="250" y="880" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- Directional Connectors -->
        <mxCell id="c_1" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#38BDF8;strokeWidth=2;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="c1_gate" target="decision_hub" />
        <mxCell id="c_2" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#22C55E;strokeWidth=2;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="decision_hub" target="c4_exec" />
        <mxCell id="c_3" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#EF4444;strokeWidth=2;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="decision_hub" target="hitl_console" />
        <mxCell id="c_4" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#38BDF8;strokeWidth=2;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="crypto_hub" target="c4_audit" />

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
    <mxGraphModel dx="1600" dy="900" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1920" pageHeight="1080" background="#0F172A">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- Master Widescreen Frame (1920x1080) -->
        <mxCell id="frame" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#38BDF8;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="20" y="20" width="1880" height="1040" as="geometry" />
        </mxCell>

        <!-- Header -->
        <mxCell id="header_title" value="MULTI-AGENT AUTONOMOUS LLM ORCHESTRATION PLATFORM (VERTEX AI / LANGGRAPH)" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=22;fontStyle=1;fontColor=#F8FAFC;" vertex="1" parent="1">
          <mxGeometry x="40" y="35" width="1840" height="35" as="geometry" />
        </mxCell>
        <mxCell id="header_sub" value="Production LangGraph &amp; Vertex AI Multi-Agent Topology: Master Supervisor Router, Worker Agents, Isolated Container Sandbox, Vector Memory Store &amp; HITL Interrupt Gate" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=13;fontColor=#94A3B8;" vertex="1" parent="1">
          <mxGeometry x="40" y="70" width="1840" height="25" as="geometry" />
        </mxCell>

        <!-- COLUMN 1 (x=60, width=380): Master Agent Router & Ingress -->
        <mxCell id="col1_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#334155;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="60" y="110" width="380" height="820" as="geometry" />
        </mxCell>
        <mxCell id="col1_title" value="1. MASTER AGENT ROUTER &amp; INGRESS" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E3A8A;strokeColor=#3B82F6;fontColor=#FFFFFF;fontStyle=1;fontSize=12;spacingTop=4;" vertex="1" parent="1">
          <mxGeometry x="80" y="125" width="340" height="45" as="geometry" />
        </mxCell>

        <mxCell id="c1_client" value="&lt;b&gt;User Application / API Gateway&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:10px;color:#94A3B8;'&gt;• HTTPS Enterprise API / Web Portal Request&lt;br/&gt;• Task Automation Goal Payload &amp;amp; Credentials&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#38BDF8;fontColor=#F8FAFC;fontSize=11;align=left;spacingLeft=14;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="85" y="190" width="330" height="135" as="geometry" />
        </mxCell>
        <mxCell id="c1_supervisor" value="&lt;b&gt;LangGraph Master Supervisor Agent&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:10px;color:#38BDF8;'&gt;• Decomposes Complex Goal into Task DAG&lt;br/&gt;• Autonomous Agent Selection &amp;amp; Tool Dispatcher&lt;br/&gt;• Powered by Vertex AI Gemini 1.5 Pro Reasoner&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#38BDF8;fontColor=#F8FAFC;fontSize=11;align=left;spacingLeft=14;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="85" y="355" width="330" height="150" as="geometry" />
        </mxCell>
        <mxCell id="c1_state" value="&lt;b&gt;LangGraph Shared Thread-Safe State&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:10px;color:#94A3B8;'&gt;• Immutable Intermediate Agent Artifact Memory&lt;br/&gt;• Checkpointed Execution Graph &amp;amp; Tool History&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#38BDF8;fontColor=#F8FAFC;fontSize=11;align=left;spacingLeft=14;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="85" y="535" width="330" height="135" as="geometry" />
        </mxCell>

        <!-- COLUMN 2 (x=480, width=420): Specialized Autonomous Worker Agents -->
        <mxCell id="col2_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#334155;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="480" y="110" width="420" height="820" as="geometry" />
        </mxCell>
        <mxCell id="col2_title" value="2. SPECIALIZED WORKER AGENT CLUSTER" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E3A8A;strokeColor=#3B82F6;fontColor=#FFFFFF;fontStyle=1;fontSize=12;spacingTop=4;" vertex="1" parent="1">
          <mxGeometry x="500" y="125" width="380" height="45" as="geometry" />
        </mxCell>

        <!-- 3 Parallel Autonomous Worker Micro-Cards -->
        <mxCell id="worker_cluster_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#475569;dashed=1;" vertex="1" parent="1">
          <mxGeometry x="500" y="185" width="380" height="475" as="geometry" />
        </mxCell>
        <mxCell id="worker_cluster_title" value="Autonomous Multi-Agent Parallel Execution Cluster" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontColor=#38BDF8;fontStyle=1;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="505" y="192" width="370" height="22" as="geometry" />
        </mxCell>

        <mxCell id="w_rag" value="&lt;b&gt;🔍 Research &amp;amp;&lt;br/&gt;Retrieval Agent&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:9px;color:#94A3B8;'&gt;• Queries pgvector&lt;br/&gt;&amp;amp; Vector Search&lt;br/&gt;• Context Extraction&lt;br/&gt;• Factual Grounding&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#0EA5E9;fontColor=#F8FAFC;fontSize=11;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="515" y="225" width="105" height="415" as="geometry" />
        </mxCell>
        <mxCell id="w_code" value="&lt;b&gt;💻 Code &amp;amp; SQL&lt;br/&gt;Generator Agent&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:9px;color:#38BDF8;'&gt;• Synthesizes Python&lt;br/&gt;&amp;amp; SQL Queries&lt;br/&gt;• Terraform HCL&lt;br/&gt;• Unit Test Generation&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#38BDF8;fontColor=#F8FAFC;fontSize=11;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="637" y="225" width="105" height="415" as="geometry" />
        </mxCell>
        <mxCell id="w_verify" value="&lt;b&gt;⚖️ Verification &amp;amp;&lt;br/&gt;Test Critic Agent&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:9px;color:#4ADE80;'&gt;• Evaluates Factual&lt;br/&gt;Accuracy &amp;amp; Syntax&lt;br/&gt;• Code Safety Scan&lt;br/&gt;• Peer Review Pass&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#22C55E;fontColor=#F8FAFC;fontSize=11;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="760" y="225" width="105" height="415" as="geometry" />
        </mxCell>

        <!-- Consensus Hub -->
        <mxCell id="consensus_hub" value="&lt;b&gt;WORKER AGENT CONSENSUS &amp;amp; SYNCHRONIZATION HUB&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:10px;color:#E2E8F0;'&gt;Converges Output from Parallel Sub-Agents into Standardized Execution Payload&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E3A8A;strokeColor=#3B82F6;fontColor=#FFFFFF;fontStyle=1;fontSize=12;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="500" y="685" width="380" height="85" as="geometry" />
        </mxCell>

        <!-- COLUMN 3 (x=940, width=420): Isolated Tool Sandbox & Vector Memory Store -->
        <mxCell id="col3_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#334155;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="940" y="110" width="420" height="820" as="geometry" />
        </mxCell>
        <mxCell id="col3_title" value="3. ISOLATED TOOL SANDBOX &amp;amp; VECTOR MEMORY" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E3A8A;strokeColor=#3B82F6;fontColor=#FFFFFF;fontStyle=1;fontSize=12;spacingTop=4;" vertex="1" parent="1">
          <mxGeometry x="960" y="125" width="380" height="45" as="geometry" />
        </mxCell>

        <mxCell id="c3_sandbox" value="&lt;b&gt;Cloud Run Containerized Isolated Code Sandbox&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:10px;color:#4ADE80;'&gt;• Ephemeral MicroVM Sandbox for Safe Code Execution&lt;br/&gt;• CPU/Memory Resource Quotas &amp;amp; Zero Network Exfiltration&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#064E3B;strokeColor=#22C55E;fontColor=#F8FAFC;fontSize=11;align=left;spacingLeft=14;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="965" y="190" width="370" height="145" as="geometry" />
        </mxCell>

        <!-- Dual Backend Memory & Tool Stores -->
        <mxCell id="c3_dual_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#475569;dashed=1;" vertex="1" parent="1">
          <mxGeometry x="965" y="355" width="370" height="280" as="geometry" />
        </mxCell>
        <mxCell id="c3_dual_title" value="Persistence &amp;amp; Enterprise External Connector Layer" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontColor=#38BDF8;fontStyle=1;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="970" y="362" width="360" height="22" as="geometry" />
        </mxCell>

        <mxCell id="store_pgvector" value="&lt;b&gt;🗄️ Cloud SQL&lt;br/&gt;(pgvector)&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:9px;color:#38BDF8;'&gt;• Agent Long-Term&lt;br/&gt;Knowledge Memory&lt;br/&gt;• Cross-Session Recall&lt;br/&gt;• High-Scale ANN&lt;br/&gt;Similarity Search&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#38BDF8;fontColor=#F8FAFC;fontSize=11;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="975" y="395" width="170" height="225" as="geometry" />
        </mxCell>
        <mxCell id="store_grpc" value="&lt;b&gt;🔌 gRPC / REST&lt;br/&gt;Tool Call Gateway&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:9px;color:#A855F7;'&gt;• Enterprise APIs&lt;br/&gt;• BigQuery Warehouse&lt;br/&gt;• GitHub / GitLab CI&lt;br/&gt;• Terraform Engine&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#A855F7;fontColor=#F8FAFC;fontSize=11;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="1155" y="395" width="170" height="225" as="geometry" />
        </mxCell>

        <mxCell id="c3_safety_gate" value="🔒 VPC Service Controls Private Perimeter Enclave" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E3A8A;strokeColor=#3B82F6;fontColor=#FFFFFF;fontStyle=1;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="965" y="660" width="370" height="60" as="geometry" />
        </mxCell>

        <!-- COLUMN 4 (x=1400, width=440): HITL Interrupt Gate & Endpoint Output -->
        <mxCell id="col4_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#334155;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1400" y="110" width="440" height="820" as="geometry" />
        </mxCell>
        <mxCell id="col4_title" value="4. HITL INTERRUPT GATE &amp;amp; ENDPOINT OUTPUT" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E3A8A;strokeColor=#3B82F6;fontColor=#FFFFFF;fontStyle=1;fontSize=12;spacingTop=4;" vertex="1" parent="1">
          <mxGeometry x="1420" y="125" width="400" height="45" as="geometry" />
        </mxCell>

        <mxCell id="c4_interrupt" value="&lt;b&gt;LangGraph Human Interrupt Gate&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:10px;color:#FBBF24;'&gt;• Pauses Execution prior to Production Mutating API Calls&lt;br/&gt;• Awaits Cryptographic Approval Signature from Administrator&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#78350F;strokeColor=#F59E0B;fontColor=#F8FAFC;fontSize=11;align=left;spacingLeft=14;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="1425" y="190" width="390" height="145" as="geometry" />
        </mxCell>

        <mxCell id="c4_synthesis" value="&lt;b&gt;Final Output Synthesizer &amp;amp; Citation Engine&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:10px;color:#4ADE80;'&gt;• Compiles Sub-Agent Artifacts into Unified Executable Response&lt;br/&gt;• Attaches Verifiable Provenance &amp;amp; Document Source Citations&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#38BDF8;fontColor=#F8FAFC;fontSize=11;align=left;spacingLeft=14;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="1425" y="365" width="390" height="145" as="geometry" />
        </mxCell>

        <mxCell id="c4_telemetry" value="&lt;b&gt;Cloud Logging &amp;amp; Cloud Trace Observability&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:10px;color:#94A3B8;'&gt;• Distributed Tracing across Agent Sub-DAGs &amp;amp; Tool Calls&lt;br/&gt;• Live Token Cost ($), Latency (ms) &amp;amp; Hallucination Audit Logs&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#38BDF8;fontColor=#F8FAFC;fontSize=11;align=left;spacingLeft=14;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="1425" y="540" width="390" height="145" as="geometry" />
        </mxCell>

        <!-- Directional Connectors -->
        <mxCell id="e_1" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#38BDF8;strokeWidth=2;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="c1_supervisor" target="consensus_hub" />
        <mxCell id="e_2" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#22C55E;strokeWidth=2;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="consensus_hub" target="c3_sandbox" />
        <mxCell id="e_3" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#F59E0B;strokeWidth=2;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="c3_sandbox" target="c4_interrupt" />
        <mxCell id="e_4" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#38BDF8;strokeWidth=2;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="c4_interrupt" target="c4_synthesis" />

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
  `.trim();
}
