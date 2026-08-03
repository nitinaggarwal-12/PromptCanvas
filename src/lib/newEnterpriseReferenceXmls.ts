/**
 * 🏛️ Master Widescreen Reference Layouts for New Enterprise Blueprints:
 * JOURNAL-PUBLICATION GRADE (ICLR / NeurIPS / IEEE / Nature Machine Intelligence Standard)
 * Explicitly Covering:
 * - 4 Core Agentic AI Design Patterns: (1) Planning, (2) Tool Use, (3) Reflection & Self-Correction, (4) Multi-Agent Collaboration
 * - Complete Enumeration of All Agents: Master Supervisor Orchestrator, Research RAG Agent, Code/SQL Agent, Verification Critic Agent, HITL Governance Agent
 * - Dynamic Routing Logic: Confidence Threshold Rules (>=95%, 75-94%, <75%) & Tool Sandbox Execution Path
 */

export function getExactAgentGovernanceHitlReferenceXml(): string {
  return `
<mxfile host="app.diagrams.net" modified="${new Date().toISOString()}" agent="PromptCanvas" version="21.0.0" type="device">
  <diagram id="hitl-agent-gov" name="Human-in-the-Loop Autonomous AI Agent Governance Lifecycle">
    <mxGraphModel dx="1600" dy="900" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1920" pageHeight="1060" background="#FFFFFF">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- Master Academic Bounding Frame (1860x980) -->
        <mxCell id="frame" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#1E293B;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="30" y="35" width="1860" height="980" as="geometry" />
        </mxCell>

        <!-- Figure Title Banner -->
        <mxCell id="header_title" value="FIGURE 1: HUMAN-IN-THE-LOOP AUTONOMOUS AI AGENT GOVERNANCE &amp; RISK ESCALATION LIFECYCLE" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=18;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="50" y="50" width="1820" height="28" as="geometry" />
        </mxCell>
        <mxCell id="header_sub" value="Agentic AI Patterns Implemented: [1. Planning &amp;amp; Intent Assessment] • [2. Dynamic Confidence Routing Logic] • [3. HITL Cryptographic Sign-Off] • [4. Continuous RLHF Reflection Loop]" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=12;fontStyle=1;fontColor=#0284C7;" vertex="1" parent="1">
          <mxGeometry x="50" y="78" width="1820" height="22" as="geometry" />
        </mxCell>

        <!-- COLUMN 1 (x=60, width=380, y=110..810 -> height=700): Action Assessment -->
        <mxCell id="col1_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#475569;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="60" y="110" width="380" height="700" as="geometry" />
        </mxCell>
        <mxCell id="col1_title" value="TIER 1: INTENT &amp;amp; ACTION ASSESSMENT INGRESS" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E3A8A;strokeColor=#0F172A;fontColor=#FFFFFF;fontStyle=1;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="80" y="125" width="340" height="40" as="geometry" />
        </mxCell>

        <mxCell id="c1_box1" value="&lt;b style='font-size:12px;color:#0F172A;'&gt;Autonomous Agent Action Ingress Payload&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:10px;color:#1E293B;'&gt;• API Ingestion, Tool Parameters &amp;amp; Target Resource&lt;br/&gt;• Natural Language Intent Specification &amp;amp; Auth Token&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=2;fontColor=#0F172A;align=left;spacingLeft=14;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="85" y="180" width="330" height="115" as="geometry" />
        </mxCell>

        <!-- Multi-Risk Categorization Sub-Track -->
        <mxCell id="c1_track_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#475569;strokeWidth=1.5;dashed=1;" vertex="1" parent="1">
          <mxGeometry x="85" y="320" width="330" height="285" as="geometry" />
        </mxCell>
        <mxCell id="c1_track_title" value="Automated Multi-Dimensional Risk Matrix" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontColor=#0F172A;fontStyle=1;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="90" y="328" width="320" height="20" as="geometry" />
        </mxCell>

        <mxCell id="c1_r1" value="&lt;b style='color:#78350F;'&gt;💰 Financial Tier&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:9px;color:#1E293B;'&gt;Transaction Cap&lt;br/&gt;&amp;amp; Refund Audit&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF9C3;strokeColor=#D97706;strokeWidth=2;fontColor=#0F172A;fontSize=10;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="95" y="355" width="95" height="235" as="geometry" />
        </mxCell>
        <mxCell id="c1_r2" value="&lt;b style='color:#6B21A8;'&gt;🔒 Privacy Tier&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:9px;color:#1E293B;'&gt;GDPR / PII Data&lt;br/&gt;Field Detection&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F3E8FF;strokeColor=#9333EA;strokeWidth=2;fontColor=#0F172A;fontSize=10;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="202" y="355" width="95" height="235" as="geometry" />
        </mxCell>
        <mxCell id="c1_r3" value="&lt;b style='color:#991B1B;'&gt;⚡ Mutation Tier&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:9px;color:#1E293B;'&gt;Production DB&lt;br/&gt;&amp;amp; API State Mod&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEE2E2;strokeColor=#DC2626;strokeWidth=2;fontColor=#0F172A;fontSize=10;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="310" y="355" width="95" height="235" as="geometry" />
        </mxCell>

        <mxCell id="c1_gate" value="🛡️ Automated Guardrail Policy Pre-Screening Pass" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E40AF;strokeColor=#1E3A8A;strokeWidth=2;fontColor=#FFFFFF;fontStyle=1;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="85" y="630" width="330" height="55" as="geometry" />
        </mxCell>

        <!-- COLUMN 2 (x=480, width=420): Confidence Escalation & Routing -->
        <mxCell id="col2_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#475569;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="480" y="110" width="420" height="700" as="geometry" />
        </mxCell>
        <mxCell id="col2_title" value="TIER 2: DYNAMIC ROUTING &amp;amp; CONFIDENCE ESCALATION" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E3A8A;strokeColor=#0F172A;fontColor=#FFFFFF;fontStyle=1;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="500" y="125" width="380" height="40" as="geometry" />
        </mxCell>

        <mxCell id="c2_track_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#475569;strokeWidth=1.5;dashed=1;" vertex="1" parent="1">
          <mxGeometry x="500" y="180" width="380" height="235" as="geometry" />
        </mxCell>
        <mxCell id="c2_track_title" value="Three-Tier Routing Logic Matrix" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontColor=#0F172A;fontStyle=1;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="505" y="188" width="370" height="20" as="geometry" />
        </mxCell>

        <mxCell id="conf_tier1" value="&lt;b style='color:#14532D;'&gt;🟢 Fast Path&lt;br/&gt;(&amp;ge; 95% Conf)&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:9px;color:#1E293B;'&gt;Low-Risk Action&lt;br/&gt;Auto-Executed&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=2;fontColor=#0F172A;fontSize=10;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="515" y="212" width="105" height="185" as="geometry" />
        </mxCell>
        <mxCell id="conf_tier2" value="&lt;b style='color:#713F12;'&gt;🟡 AI Audit&lt;br/&gt;(75% - 94%)&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:9px;color:#1E293B;'&gt;Supervisor AI&lt;br/&gt;Fact Verification&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF9C3;strokeColor=#D97706;strokeWidth=2;fontColor=#0F172A;fontSize=10;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="637" y="212" width="105" height="185" as="geometry" />
        </mxCell>
        <mxCell id="conf_tier3" value="&lt;b style='color:#7F1D1D;'&gt;🔴 HITL Gate&lt;br/&gt;(&amp;lt; 75% Conf)&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:9px;color:#1E293B;'&gt;Mandatory Human&lt;br/&gt;Sign-Off Escalation&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEE2E2;strokeColor=#DC2626;strokeWidth=2;fontColor=#0F172A;fontSize=10;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="760" y="212" width="105" height="185" as="geometry" />
        </mxCell>

        <!-- Supervisor AI Cross-Verification Box -->
        <mxCell id="supervisor_box" value="&lt;b style='font-size:11px;color:#0F172A;'&gt;SUPERVISOR AI SECOND-PASS VERIFICATION HUB&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:10px;color:#1E293B;'&gt;• Factual Grounding &amp;amp; Policy Precedent Audit&lt;br/&gt;• Promotes Verified Actions (≥95%) to Fast-Path Execution&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=2;fontColor=#0F172A;align=left;spacingLeft=14;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="500" y="440" width="380" height="105" as="geometry" />
        </mxCell>

        <!-- Decision Router Hub -->
        <mxCell id="decision_hub" value="&lt;b style='font-size:12px;'&gt;DYNAMIC GOVERNANCE &amp;amp; ESCALATION ROUTER&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:10px;'&gt;Dispatches High-Confidence Actions directly to Execution; Escalates Low-Confidence or High-Risk Operations to Human Review Enclave&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E3A8A;strokeColor=#0F172A;strokeWidth=2;fontColor=#FFFFFF;fontStyle=1;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="500" y="575" width="380" height="110" as="geometry" />
        </mxCell>

        <!-- COLUMN 3 (x=940, width=420): Human Workbench -->
        <mxCell id="col3_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#475569;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="940" y="110" width="420" height="700" as="geometry" />
        </mxCell>
        <mxCell id="col3_title" value="TIER 3: HUMAN APPROVAL &amp;amp; CRYPTOGRAPHIC ENCLAVE" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E3A8A;strokeColor=#0F172A;fontColor=#FFFFFF;fontStyle=1;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="960" y="125" width="380" height="40" as="geometry" />
        </mxCell>

        <mxCell id="hitl_console" value="&lt;b style='font-size:12px;color:#0F172A;'&gt;Human Reviewer Interactive Workbench&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:10px;color:#1E293B;'&gt;• Displays Agent Input Prompt, Tool Payload &amp;amp; Risk Rationale&lt;br/&gt;• Shows Confidence Gap Breakdown &amp;amp; Violation Alerts&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=2;fontColor=#0F172A;align=left;spacingLeft=14;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="965" y="180" width="370" height="115" as="geometry" />
        </mxCell>

        <!-- 3 Review Decision Option Cards -->
        <mxCell id="hitl_options_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#475569;strokeWidth=1.5;dashed=1;" vertex="1" parent="1">
          <mxGeometry x="965" y="320" width="370" height="235" as="geometry" />
        </mxCell>
        <mxCell id="hitl_opt_title" value="Mandatory Human Compliance Sign-Off Verdicts" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontColor=#0F172A;fontStyle=1;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="970" y="328" width="360" height="20" as="geometry" />
        </mxCell>

        <mxCell id="opt_approve" value="&lt;b style='color:#14532D;'&gt;✅ Approve&lt;br/&gt;As-Is&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:9px;color:#1E293B;'&gt;Authorize tool&lt;br/&gt;execution with&lt;br/&gt;digital signature&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=2;fontColor=#0F172A;fontSize=10;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="975" y="353" width="105" height="185" as="geometry" />
        </mxCell>
        <mxCell id="opt_modify" value="&lt;b style='color:#713F12;'&gt;✏️ Edit &amp;amp;&lt;br/&gt;Approve&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:9px;color:#1E293B;'&gt;Modify action&lt;br/&gt;parameters or&lt;br/&gt;refund caps&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF9C3;strokeColor=#D97706;strokeWidth=2;fontColor=#0F172A;fontSize=10;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="1097" y="353" width="105" height="185" as="geometry" />
        </mxCell>
        <mxCell id="opt_reject" value="&lt;b style='color:#7F1D1D;'&gt;🚫 Reject &amp;amp;&lt;br/&gt;Remediate&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:9px;color:#1E293B;'&gt;Halt action &amp;amp;&lt;br/&gt;escalate to AI&lt;br/&gt;Safety Team&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEE2E2;strokeColor=#DC2626;strokeWidth=2;fontColor=#0F172A;fontSize=10;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="1220" y="353" width="105" height="185" as="geometry" />
        </mxCell>

        <!-- Cryptographic Certificate Hub -->
        <mxCell id="crypto_hub" value="&lt;b style='font-size:12px;'&gt;CRYPTOGRAPHIC HUMAN SIGN-OFF CERTIFICATE&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:10px;'&gt;Binds Reviewer Employee ID, Cryptographic SHA-256 Timestamp &amp;amp; Override Rationale directly to Authorized Action Token&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E3A8A;strokeColor=#0F172A;strokeWidth=2;fontColor=#FFFFFF;fontStyle=1;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="965" y="575" width="370" height="110" as="geometry" />
        </mxCell>

        <!-- COLUMN 4 (x=1400, width=440): Safe Execution -->
        <mxCell id="col4_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#475569;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1400" y="110" width="440" height="700" as="geometry" />
        </mxCell>
        <mxCell id="col4_title" value="TIER 4: SAFE EXECUTION &amp;amp; REGULATORY AUDIT LEDGER" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E3A8A;strokeColor=#0F172A;fontColor=#FFFFFF;fontStyle=1;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="1420" y="125" width="400" height="40" as="geometry" />
        </mxCell>

        <mxCell id="c4_exec" value="&lt;b style='font-size:12px;color:#0F172A;'&gt;Enterprise Production Action Execution&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:10px;color:#14532D;'&gt;• Safe Dispatch via Authorized Cloud Run Connector Enclave&lt;br/&gt;• Idempotent API Execution with Transactional Rollback Protection&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=2;fontColor=#0F172A;align=left;spacingLeft=14;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="1425" y="180" width="390" height="115" as="geometry" />
        </mxCell>

        <mxCell id="c4_audit" value="&lt;b style='font-size:12px;color:#0F172A;'&gt;Immutable Regulatory Audit Evidence Store&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:10px;color:#1E293B;'&gt;• Persists Agent Prompt, Confidence Score, HITL Token &amp;amp; Diff&lt;br/&gt;• SOC2 / HIPAA / EU AI Act Compliance Record Ready&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=2;fontColor=#0F172A;align=left;spacingLeft=14;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="1425" y="320" width="390" height="115" as="geometry" />
        </mxCell>

        <mxCell id="c4_rlhf" value="&lt;b style='font-size:12px;color:#0F172A;'&gt;RLHF Model Fine-Tuning Calibration Engine&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:10px;color:#6B21A8;'&gt;• Human Modifications &amp;amp; Rejections Feed RLHF Alignment Pipeline&lt;br/&gt;• Continuously Calibrates Fast-Path Confidence Thresholds&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F3E8FF;strokeColor=#9333EA;strokeWidth=2;fontColor=#0F172A;align=left;spacingLeft=14;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="1425" y="460" width="390" height="115" as="geometry" />
        </mxCell>

        <!-- FORMAL AGENTIC PATTERNS & AGENT ROLES COMPREHENSIVE BOX (y=825..930) -->
        <mxCell id="legend_box" value="&lt;b style='font-size:11px;'&gt;AGENTIC AI PATTERNS &amp;amp; ENUMERATED AGENT ROLES:&lt;/b&gt;&amp;nbsp;&amp;nbsp;&amp;nbsp;[Pattern 1: Planning &amp;amp; Risk Evaluation] • [Pattern 2: Dynamic Confidence Routing Logic] • [Pattern 3: HITL Governance Gatekeeper Agent] • [Pattern 4: RLHF Reflection &amp;amp; Self-Calibration Loop]&lt;br/&gt;&lt;span style='font-size:10px;color:#1E293B;'&gt;• &lt;b&gt;Routing Rules:&lt;/b&gt; Confidence &amp;ge; 95% &amp;rarr; Fast-Path Auto-Approve  |  75%–94% &amp;rarr; Supervisor AI Cross-Verification  |  &amp;lt; 75% &amp;rarr; Mandatory Human Review Escalation&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#64748B;strokeWidth=1.5;fontColor=#0F172A;fontSize=10;align=center;" vertex="1" parent="1">
          <mxGeometry x="60" y="825" width="1780" height="55" as="geometry" />
        </mxCell>

        <!-- Feedback Loop Connector along bottom margin -->
        <mxCell id="loop_back" value="Continuous RLHF Calibration &amp;amp; Confidence Threshold Calibration Feedback Loop" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#9333EA;strokeWidth=3;dashed=1;fontColor=#6B21A8;fontStyle=1;fontSize=11;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="c4_rlhf" target="col1_title">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1620" y="815" />
              <mxPoint x="250" y="815" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- BOLD PUBLICATION CONNECTORS WITH VISIBLE ANCHORS -->
        <mxCell id="e_c1_down" value="Assess Risk Dimensions" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0284C7;strokeWidth=3;fontColor=#0284C7;fontStyle=1;fontSize=10;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="c1_box1" target="c1_track_bg">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="e_c1_gate" value="Policy Passed" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0284C7;strokeWidth=3;fontColor=#0284C7;fontStyle=1;fontSize=10;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="c1_track_bg" target="c1_gate">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="c_1" value="Action Payload ➔" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0284C7;strokeWidth=3;exitX=1;exitY=0.5;entryX=0;entryY=0.5;fontColor=#0284C7;fontStyle=1;fontSize=11;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="c1_gate" target="decision_hub">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        
        <mxCell id="c_fast" value="Fast-Path (≥95%)" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16A34A;strokeWidth=3;exitX=1;exitY=0.5;entryX=0;entryY=0.5;fontColor=#14532D;fontStyle=1;fontSize=11;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="decision_hub" target="c4_exec">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="915" y="630" />
              <mxPoint x="915" y="745" />
              <mxPoint x="1380" y="745" />
              <mxPoint x="1380" y="237" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="c_hitl" value="Mandatory HITL Escalation (<75%)" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#DC2626;strokeWidth=3;exitX=1;exitY=0.5;entryX=0;entryY=0.5;fontColor=#7F1D1D;fontStyle=1;fontSize=11;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="decision_hub" target="hitl_console">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="915" y="630" />
              <mxPoint x="915" y="237" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="c_console_to_options" value="Present Compliance Verdict Options" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0284C7;strokeWidth=2;" edge="1" parent="1" source="hitl_console" target="hitl_options_bg">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="c_options_to_crypto" value="Issue Cryptographic Token" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0284C7;strokeWidth=2;" edge="1" parent="1" source="hitl_options_bg" target="crypto_hub">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="c_4" value="Signed Certificate Token ➔" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0284C7;strokeWidth=3;exitX=1;exitY=0.5;entryX=0;entryY=0.5;fontColor=#0284C7;fontStyle=1;fontSize=11;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="crypto_hub" target="c4_audit">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1370" y="630" />
              <mxPoint x="1370" y="377" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="c_audit_to_exec" value="Authorized Dispatch" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16A34A;strokeWidth=2;" edge="1" parent="1" source="c4_audit" target="c4_exec">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

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
    <mxGraphModel dx="1600" dy="900" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1920" pageHeight="1060" background="#FFFFFF">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- Master Academic Bounding Frame (1860x980) -->
        <mxCell id="frame" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#1E293B;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="30" y="35" width="1860" height="980" as="geometry" />
        </mxCell>

        <!-- Figure Title Banner -->
        <mxCell id="header_title" value="FIGURE 2: MULTI-AGENT AUTONOMOUS LLM ORCHESTRATION PLATFORM (VERTEX AI / LANGGRAPH)" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=18;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="50" y="50" width="1820" height="28" as="geometry" />
        </mxCell>
        <mxCell id="header_sub" value="Agentic AI Patterns Implemented: [1. Planning &amp;amp; Task Decomposition (Master Supervisor)] • [2. Tool Use &amp;amp; Function Calling (Cloud Run Sandbox &amp;amp; pgvector)] • [3. Reflection &amp;amp; Self-Correction (Verification Critic)] • [4. Multi-Agent Collaboration &amp;amp; Dynamic Routing]" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=12;fontStyle=1;fontColor=#0284C7;" vertex="1" parent="1">
          <mxGeometry x="50" y="78" width="1820" height="22" as="geometry" />
        </mxCell>

        <!-- COLUMN 1 (x=60, width=380, y=110..810 -> height=700): Master Agent Router & Ingress -->
        <mxCell id="col1_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#475569;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="60" y="110" width="380" height="700" as="geometry" />
        </mxCell>
        <mxCell id="col1_title" value="TIER 1: MASTER SUPERVISOR &amp;amp; THREAD STATE" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E3A8A;strokeColor=#0F172A;fontColor=#FFFFFF;fontStyle=1;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="80" y="125" width="340" height="40" as="geometry" />
        </mxCell>

        <mxCell id="c1_client" value="&lt;b style='font-size:12px;color:#0F172A;'&gt;Enterprise API Gateway / Client Request&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:10px;color:#1E293B;'&gt;• HTTPS Task Specification, Tool Constraints &amp;amp; Auth Context&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=2;fontColor=#0F172A;align=left;spacingLeft=14;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="85" y="180" width="330" height="115" as="geometry" />
        </mxCell>
        <mxCell id="c1_supervisor" value="&lt;b style='font-size:12px;color:#0F172A;'&gt;[Agent 1: Orchestrator] LangGraph Master Supervisor Agent&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:10px;color:#0284C7;'&gt;• Decomposes Goal into Directed Acyclic Task Graph (DAG)&lt;br/&gt;• Autonomous Agent Dispatcher &amp;amp; Dynamic Routing Logic (Gemini 1.5 Pro)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=2;fontColor=#0F172A;align=left;spacingLeft=14;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="85" y="330" width="330" height="135" as="geometry" />
        </mxCell>
        <mxCell id="c1_state" value="&lt;b style='font-size:12px;color:#0F172A;'&gt;LangGraph Thread-Safe Checkpoint Store&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:10px;color:#1E293B;'&gt;• Shared Immutable Artifact Memory Across Graph Steps&lt;br/&gt;• State Time-Travel &amp;amp; Fault-Tolerant Step Checkpointing&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=2;fontColor=#0F172A;align=left;spacingLeft=14;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="85" y="505" width="330" height="135" as="geometry" />
        </mxCell>

        <!-- COLUMN 2 (x=480, width=420): Specialized Autonomous Worker Agent Cluster -->
        <mxCell id="col2_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#475569;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="480" y="110" width="420" height="700" as="geometry" />
        </mxCell>
        <mxCell id="col2_title" value="TIER 2: SPECIALIZED AUTONOMOUS WORKER CLUSTER" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E3A8A;strokeColor=#0F172A;fontColor=#FFFFFF;fontStyle=1;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="500" y="125" width="380" height="40" as="geometry" />
        </mxCell>

        <!-- Worker Stack 1: Research Agent -->
        <mxCell id="w_rag" value="&lt;b style='font-size:12px;color:#0F172A;'&gt;[Agent 2: RAG Specialist] Research &amp;amp; Retrieval Agent&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:10px;color:#1E293B;'&gt;• Semantic Vector Search across AlloyDB / pgvector corpora&lt;br/&gt;• Extracts relevant evidence passages &amp;amp; factual attributions&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=2;fontColor=#0F172A;align=left;spacingLeft=14;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="500" y="180" width="380" height="115" as="geometry" />
        </mxCell>

        <!-- Worker Stack 2: Code & SQL Generator -->
        <mxCell id="w_code" value="&lt;b style='font-size:12px;color:#0F172A;'&gt;[Agent 3: Synthesis Specialist] Code, SQL &amp;amp; IaC Agent&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:10px;color:#0284C7;'&gt;• Synthesizes executable Python code, BigQuery SQL &amp;amp; Terraform&lt;br/&gt;• Generates comprehensive unit tests &amp;amp; API invocation schemas&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=2;fontColor=#0F172A;align=left;spacingLeft=14;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="500" y="320" width="380" height="115" as="geometry" />
        </mxCell>

        <!-- Worker Stack 3: Verification Critic -->
        <mxCell id="w_verify" value="&lt;b style='font-size:12px;color:#0F172A;'&gt;[Agent 4: Reflection Agent] Verification &amp;amp; Safety Critic&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:10px;color:#14532D;'&gt;• Performs adversarial static analysis, syntax check &amp;amp; fact verification&lt;br/&gt;• Evaluates generated code prior to isolated sandbox dispatch&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=2;fontColor=#0F172A;align=left;spacingLeft=14;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="500" y="460" width="380" height="115" as="geometry" />
        </mxCell>

        <!-- Consensus Hub -->
        <mxCell id="consensus_hub" value="&lt;b style='font-size:12px;'&gt;MULTI-AGENT SYNCHRONIZATION &amp;amp; CONSENSUS HUB&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:10px;'&gt;Aggregates &amp;amp; Cross-Verifies Outputs from Sub-Agents into Single Executable Candidate Task Payload&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E3A8A;strokeColor=#0F172A;strokeWidth=2;fontColor=#FFFFFF;fontStyle=1;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="500" y="605" width="380" height="105" as="geometry" />
        </mxCell>

        <!-- COLUMN 3 (x=940, width=420): Isolated Tool Sandbox & Vector Memory Store -->
        <mxCell id="col3_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#475569;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="940" y="110" width="420" height="700" as="geometry" />
        </mxCell>
        <mxCell id="col3_title" value="TIER 3: TOOL SANDBOX &amp;amp; VECTOR MEMORY [PATTERN 2]" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E3A8A;strokeColor=#0F172A;fontColor=#FFFFFF;fontStyle=1;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="960" y="125" width="380" height="40" as="geometry" />
        </mxCell>

        <mxCell id="c3_sandbox" value="&lt;b style='font-size:12px;color:#0F172A;'&gt;Cloud Run Containerized Isolated Code Sandbox&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:10px;color:#14532D;'&gt;• Ephemeral MicroVM Sandbox for Safe Code &amp;amp; Query Execution&lt;br/&gt;• Enforces Strict CPU/Memory Quotas &amp;amp; Zero External Exfiltration&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=2;fontColor=#0F172A;align=left;spacingLeft=14;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="965" y="180" width="370" height="135" as="geometry" />
        </mxCell>

        <mxCell id="store_pgvector" value="&lt;b style='font-size:12px;color:#0F172A;'&gt;🗄️ Cloud SQL (pgvector) Long-Term Knowledge Store&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:10px;color:#0284C7;'&gt;• Persists Cross-Session Agent Embeddings &amp;amp; Episodic Memory&lt;br/&gt;• High-Scale Approximate Nearest Neighbor (ANN) Vector Search&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=2;fontColor=#0F172A;align=left;spacingLeft=14;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="965" y="335" width="370" height="130" as="geometry" />
        </mxCell>

        <mxCell id="store_grpc" value="&lt;b style='font-size:12px;color:#0F172A;'&gt;🔌 gRPC / REST Enterprise Tool Call Gateway&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:10px;color:#6B21A8;'&gt;• Connects Agents to BigQuery, Cloud Run APIs &amp;amp; GitHub DevOps&lt;br/&gt;• Mutual TLS (mTLS) Auth &amp;amp; Rate-Limited Execution Throttling&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F3E8FF;strokeColor=#9333EA;strokeWidth=2;fontColor=#0F172A;align=left;spacingLeft=14;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="965" y="490" width="370" height="130" as="geometry" />
        </mxCell>

        <!-- COLUMN 4 (x=1400, width=440): HITL Interrupt Gate & Endpoint Output -->
        <mxCell id="col4_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#475569;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1400" y="110" width="440" height="700" as="geometry" />
        </mxCell>
        <mxCell id="col4_title" value="TIER 4: HITL INTERRUPT GATE &amp;amp; OBSERVABILITY" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E3A8A;strokeColor=#0F172A;fontColor=#FFFFFF;fontStyle=1;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="1420" y="125" width="400" height="40" as="geometry" />
        </mxCell>

        <mxCell id="c4_interrupt" value="&lt;b style='font-size:12px;color:#0F172A;'&gt;[Agent 5: Governance Arbitrator] LangGraph HITL Interrupt Gate&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:10px;color:#713F12;'&gt;• Intercepts Execution prior to Production Mutating API Calls&lt;br/&gt;• Awaits Cryptographic Approval Token from System Administrator&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF9C3;strokeColor=#D97706;strokeWidth=2;fontColor=#0F172A;align=left;spacingLeft=14;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="1425" y="180" width="390" height="135" as="geometry" />
        </mxCell>

        <mxCell id="c4_synthesis" value="&lt;b style='font-size:12px;color:#0F172A;'&gt;Final Response Synthesizer &amp;amp; Attribution Engine&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:10px;color:#14532D;'&gt;• Compiles Sub-Agent Artifacts into Unified Executable Response&lt;br/&gt;• Attaches Verifiable Source Citations &amp;amp; Provenance Metadata&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=2;fontColor=#0F172A;align=left;spacingLeft=14;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="1425" y="340" width="390" height="135" as="geometry" />
        </mxCell>

        <mxCell id="c4_telemetry" value="&lt;b style='font-size:12px;color:#0F172A;'&gt;Cloud Logging &amp;amp; Cloud Trace Distributed Observability&lt;/b&gt;&lt;br/&gt;&lt;span style='font-size:10px;color:#1E293B;'&gt;• End-to-End Distributed Tracing across Agent Graph Transitions&lt;br/&gt;• Real-Time Token Cost ($), Latency (ms) &amp;amp; Factual Grounding Audit&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=2;fontColor=#0F172A;align=left;spacingLeft=14;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="1425" y="500" width="390" height="135" as="geometry" />
        </mxCell>

        <!-- FORMAL SCIENTIFIC ENUMERATION OF ALL AGENTS & AGENTIC PATTERNS BOX (y=825..930) -->
        <mxCell id="legend_box" value="&lt;b style='font-size:11px;'&gt;ENUMERATED AGENTS &amp;amp; ORCHESTRATION ROUTING ARCHITECTURE:&lt;/b&gt;&amp;nbsp;&amp;nbsp;&amp;nbsp;&lt;b style='color:#0284C7;'&gt;[Agent 1: Orchestrator]&lt;/b&gt; Master Supervisor (DAG Planning)  |  &lt;b style='color:#0284C7;'&gt;[Agent 2: RAG]&lt;/b&gt; Research Specialist  |  &lt;b style='color:#0284C7;'&gt;[Agent 3: Synthesizer]&lt;/b&gt; Code/SQL Generator  |  &lt;b style='color:#16A34A;'&gt;[Agent 4: Critic]&lt;/b&gt; Verification &amp;amp; Reflection  |  &lt;b style='color:#D97706;'&gt;[Agent 5: Governance]&lt;/b&gt; HITL Gatekeeper&lt;br/&gt;&lt;span style='font-size:10px;color:#1E293B;'&gt;• &lt;b&gt;Agentic AI Design Patterns:&lt;/b&gt; (1) Planning &amp;amp; Task Decomposition &amp;rarr; (2) Tool Use &amp;amp; Sandbox Function Calling &amp;rarr; (3) Reflection &amp;amp; Factual Grounding &amp;rarr; (4) Hierarchical Multi-Agent Collaboration&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#64748B;strokeWidth=1.5;fontColor=#0F172A;fontSize=10;align=center;" vertex="1" parent="1">
          <mxGeometry x="60" y="825" width="1780" height="55" as="geometry" />
        </mxCell>

        <!-- SCIENTIFIC CYCLIC REFLECTION & OBSERVATION RETURN LOOP ALONG CLEAN BOTTOM CORRIDOR (y=810) -->
        <mxCell id="langgraph_cycle" value="LangGraph Cyclic Observation &amp;amp; Reflection Loop (State Feedback to Master Supervisor)" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0284C7;strokeWidth=3;dashed=1;fontColor=#0284C7;fontStyle=1;fontSize=11;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="store_pgvector" target="c1_supervisor">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1355" y="400" />
              <mxPoint x="1375" y="400" />
              <mxPoint x="1375" y="810" />
              <mxPoint x="40" y="810" />
              <mxPoint x="40" y="397" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- PUBLICATION-GRADE ORTHOGONAL GRAPH CONNECTORS WITH EXPLICIT WAYPOINT CHANNELS -->
        <mxCell id="e_client_to_sup" value="Submit Task Specification" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0284C7;strokeWidth=3;fontColor=#0284C7;fontStyle=1;fontSize=10;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="c1_client" target="c1_supervisor">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="e_sup_to_state" value="Checkpoint State DAG" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0284C7;strokeWidth=3;fontColor=#0284C7;fontStyle=1;fontSize=10;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="c1_supervisor" target="c1_state">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Inter-Column Flow 1: Master Supervisor -> Worker Cluster -->
        <mxCell id="e_sup_to_workers" value="Dispatch Sub-Task DAG ➔" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0284C7;strokeWidth=3;exitX=1;exitY=0.5;entryX=0;entryY=0.5;fontColor=#0284C7;fontStyle=1;fontSize=11;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="c1_supervisor" target="w_code">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Internal Worker Flow -->
        <mxCell id="e_worker_to_consensus" value="Consensus Validation" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0284C7;strokeWidth=3;" edge="1" parent="1" source="w_verify" target="consensus_hub">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Inter-Column Flow 2: Consensus Hub -> Isolated Sandbox via Dedicated Channel x=920 -->
        <mxCell id="e_consensus_to_sandbox" value="Execute Code in Sandbox ➔" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16A34A;strokeWidth=3;exitX=1;exitY=0.5;entryX=0;entryY=0.5;fontColor=#14532D;fontStyle=1;fontSize=11;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="consensus_hub" target="c3_sandbox">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="920" y="657" />
              <mxPoint x="920" y="247" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- Internal Sandbox to pgvector / Tool Gateway -->
        <mxCell id="e_sandbox_to_store" value="Query Memory &amp;amp; Tools" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0284C7;strokeWidth=3;" edge="1" parent="1" source="c3_sandbox" target="store_pgvector">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Inter-Column Flow 3: Tool Gateway -> HITL Interrupt Gate via Dedicated Channel x=1380 -->
        <mxCell id="e_store_to_hitl" value="Production Tool Call Gate ➔" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#D97706;strokeWidth=3;exitX=1;exitY=0.5;entryX=0;entryY=0.5;fontColor=#713F12;fontStyle=1;fontSize=11;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="store_grpc" target="c4_interrupt">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1380" y="555" />
              <mxPoint x="1380" y="247" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- Internal Flow Column 4 -->
        <mxCell id="e_hitl_to_synth" value="Approved Signature" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16A34A;strokeWidth=3;" edge="1" parent="1" source="c4_interrupt" target="c4_synthesis">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="e_synth_to_telem" value="Emit Distributed Trace" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0284C7;strokeWidth=3;" edge="1" parent="1" source="c4_synthesis" target="c4_telemetry">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
  `.trim();
}
