export function buildAiAgentApprovalWorkflowXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="ai_agent_approval_workflow" name="AI Agent Approval &amp; Governance Gatekeeper Workflow (P4-GOV-L-05)">
    <mxGraphModel dx="1400" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1400" pageHeight="720" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- Header Banner -->
        <mxCell id="top_logo" value="&lt;span style=&quot;font-size:24px;&quot;&gt;⚖️&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="10" width="35" height="35" as="geometry"/>
        </mxCell>
        <mxCell id="main_title" value="&lt;b style=&quot;font-size:18px;color:#0F172A;&quot;&gt;Google Cloud GOVERNANCE: AI AGENT APPROVAL &amp;amp; GATEKEEPER WORKFLOW&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="65" y="10" width="1050" height="24" as="geometry"/>
        </mxCell>
        <mxCell id="main_subtitle" value="&lt;span style=&quot;font-size:11px;color:#475569;font-weight:600;&quot;&gt;Enterprise AI Review Pipeline: Automated Red-Teaming, Bias &amp;amp; Toxicity Screening, AppSec / Legal Sign-off &amp;amp; Binary Authorization Promotion&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="65" y="32" width="1050" height="18" as="geometry"/>
        </mxCell>
        <mxCell id="top_gemini_badge" value="&lt;b style=&quot;font-size:14px;color:#2563EB;&quot;&gt;Gemini 3.7 Flash&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Governance Evaluator&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1220" y="10" width="140" height="36" as="geometry"/>
        </mxCell>

        <!-- Stage 1: Agent Definition & Local Development -->
        <mxCell id="col1_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#60A5FA;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="25" y="65" width="280" height="580" as="geometry"/>
        </mxCell>
        <mxCell id="col1_title" value="&lt;b style=&quot;font-size:11px;color:#1D4ED8;&quot;&gt;📝 Stage 1: Agent Draft &amp;amp; Specification&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="35" y="72" width="260" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="node_agent_designer" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Vertex AI Agent Designer IDE&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;System Prompt, Few-Shot Demonstrations,&lt;br&gt;Tool Bindings &amp;amp; Grounding Datasets&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="115" width="250" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_git_pr" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Git Polyrepo Pull Request&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Agent Config as Code (YAML/JSON)&lt;br&gt;Branch Protection &amp;amp; Semantic Versioning&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="235" width="250" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_pre_commit_lint" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Pre-Commit Linter &amp;amp; Schema Check&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Validating MCP Tool Signatures&lt;br&gt;Secret Leak Scan (No Hardcoded API Keys)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="355" width="250" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_trigger_eval" value="&lt;b style=&quot;font-size:11px;color:#1D4ED8;&quot;&gt;Cloud Build CI Trigger&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Spawns Automated Testing Matrix&lt;br&gt;Locks Deployment Pipeline State&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#1D4ED8;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="475" width="250" height="75" as="geometry"/>
        </mxCell>

        <!-- Stage 2: Automated AI Evaluation & Red-Teaming -->
        <mxCell id="col2_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFBEB;strokeColor=#F59E0B;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="330" y="65" width="310" height="580" as="geometry"/>
        </mxCell>
        <mxCell id="col2_title" value="&lt;b style=&quot;font-size:11px;color:#B45309;&quot;&gt;🧪 Stage 2: Automated AI Benchmarking&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="340" y="72" width="290" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="node_eval_benchmarks" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Vertex AI Model Evaluation Service&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Golden Dataset Ground Truth Matching&lt;br&gt;BLEU, ROUGE, Exact Match &amp;amp; F1 Metrics&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="345" y="115" width="280" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_redteam_fuzzing" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Automated Red-Teaming &amp;amp; Fuzzing&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#B45309;&quot;&gt;10,000+ Synthetic Jailbreak Prompts&lt;br&gt;Atheris Fuzzing on Tool Input Parameters&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF3C7;strokeColor=#D97706;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="345" y="225" width="280" height="85" as="geometry"/>
        </mxCell>

        <mxCell id="node_bias_toxicity" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Model Armor Safety Gate&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Toxicity &amp;lt; 0.01% Strict Threshold&lt;br&gt;PII Leakage &amp;amp; Prompt Injection Guard&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="345" y="345" width="280" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_eval_scorecard" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Looker AI Evaluation Scorecard&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Pass: Score &amp;gt; 95% $\rightarrow$ Forward to Legal/Sec&lt;br&gt;Fail: Auto-Reject PR with Diagnostics&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="345" y="455" width="280" height="75" as="geometry"/>
        </mxCell>

        <!-- Stage 3: Human-in-the-Loop Review & Compliance Gates -->
        <mxCell id="col3_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#A855F7;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="665" y="65" width="330" height="580" as="geometry"/>
        </mxCell>
        <mxCell id="col3_title" value="&lt;b style=&quot;font-size:11px;color:#7E22CE;&quot;&gt;👥 Stage 3: Human Review &amp;amp; Ethics Gate&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="675" y="72" width="310" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="node_appsec_review" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;AppSec &amp;amp; IAM Review Gate&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Tool Scope Vetting (Least Privilege)&lt;br&gt;Egress Network Domain Allowlist Check&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9333EA;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="680" y="115" width="300" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_legal_ethics" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Legal &amp;amp; AI Ethics Board Approval&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#7E22CE;&quot;&gt;EU AI Act &amp;amp; Copyright Compliance Sign-off&lt;br&gt;21 CFR Part 11 Digital E-Signature Ledger&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F3E8FF;strokeColor=#7E22CE;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="680" y="225" width="300" height="85" as="geometry"/>
        </mxCell>

        <mxCell id="node_ciso_signoff" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;CISO / ARB Final Sign-Off&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Architecture Review Board (ARB) Vote&lt;br&gt;Token Cost &amp;amp; FinOps Budget Endorsement&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9333EA;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="680" y="345" width="300" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_binary_auth_sign" value="&lt;b style=&quot;font-size:11px;color:#7E22CE;&quot;&gt;Binary Authorization KMS Attestor&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Cloud KMS Cryptographic Signature Injection&lt;br&gt;Attestation: &quot;Certified Compliant &amp;amp; Safe&quot;&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9333EA;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="680" y="455" width="300" height="75" as="geometry"/>
        </mxCell>

        <!-- Stage 4: Secure Release & Production Serving -->
        <mxCell id="col4_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#22C55E;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1020" y="65" width="340" height="580" as="geometry"/>
        </mxCell>
        <mxCell id="col4_title" value="&lt;b style=&quot;font-size:11px;color:#15803D;&quot;&gt;🚀 Stage 4: Signed Production Deployment&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1030" y="72" width="320" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="node_artifact_reg_signed" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Artifact Registry (Certified Repo)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Immutably Tagged &amp;amp; Signed Container&lt;br&gt;SLSA Level 3 Supply Chain Compliance&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1035" y="115" width="310" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_cloud_deploy_canary" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Cloud Deploy Canary Rollout&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;10% Traffic Shadow Canary Deployment&lt;br&gt;Real-Time Latency &amp;amp; Error Budget Verification&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1035" y="225" width="310" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_gke_prod_serving" value="&lt;b style=&quot;font-size:11px;color:#15803D;&quot;&gt;Live GKE Autopilot Production Serving&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;100% Traffic Cutover with Auto-Rollback Guard&lt;br&gt;Binary Authorization Policy Enforced in Block Mode&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#15803D;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1035" y="345" width="310" height="85" as="geometry"/>
        </mxCell>

        <mxCell id="node_drift_monitor" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Continuous Drift &amp;amp; Hallucination Monitor&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Telemetry Streaming to BigQuery &amp;amp; SecOps&lt;br&gt;Automated Quarantine on Policy Breach&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1035" y="465" width="310" height="75" as="geometry"/>
        </mxCell>

        <!-- Connecting Edges -->
        <mxCell id="edge1" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=2;" edge="1" parent="1" source="node_agent_designer" target="node_git_pr">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge2" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=2;" edge="1" parent="1" source="node_trigger_eval" target="node_eval_benchmarks">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge3" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#D97706;strokeWidth=2;" edge="1" parent="1" source="node_eval_scorecard" target="node_appsec_review">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge4" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#9333EA;strokeWidth=2;" edge="1" parent="1" source="node_legal_ethics" target="node_ciso_signoff">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge5" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#9333EA;strokeWidth=2;" edge="1" parent="1" source="node_binary_auth_sign" target="node_artifact_reg_signed">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge6" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16A34A;strokeWidth=2;" edge="1" parent="1" source="node_cloud_deploy_canary" target="node_gke_prod_serving">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge7" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#15803D;strokeWidth=2;dashed=1;" edge="1" parent="1" source="node_drift_monitor" target="node_agent_designer">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1190" y="630"/>
              <mxPoint x="165" y="630"/>
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- Footer Legend -->
        <mxCell id="footer_legend" value="&lt;span style=&quot;font-size:9.5px;color:#475569;&quot;&gt;&lt;b&gt;Governance Pipeline:&lt;/b&gt; 🔵 IDE Draft &amp;amp; Git Check-In &amp;nbsp;|&amp;nbsp; 🟡 Automated Red-Teaming &amp;amp; Benchmarks &amp;nbsp;|&amp;nbsp; 🟣 Human Sign-Off &amp;amp; Binary Auth &amp;nbsp;|&amp;nbsp; 🟢 Signed GKE Production Serving &amp;nbsp;|&amp;nbsp; ⚡ Powered by Gemini 3.7 Flash&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="655" width="1335" height="30" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
