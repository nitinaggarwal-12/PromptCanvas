export function buildAiAgentApprovalWorkflowXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="ai_agent_approval_workflow" name="AI Agent Approval &amp; Governance Gatekeeper Workflow (P4-GOV-L-05)">
    <mxGraphModel dx="1740" dy="1050" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1760" pageHeight="1050" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- Header Banner -->
        <mxCell id="top_logo" value="&lt;span style=&quot;font-size:26px;&quot;&gt;⚖️&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="35" y="14" width="40" height="40" as="geometry"/>
        </mxCell>
        <mxCell id="main_title" value="&lt;b style=&quot;font-size:18px;color:#0F172A;&quot;&gt;Google Cloud GOVERNANCE: AI AGENT APPROVAL &amp;amp; GATEKEEPER WORKFLOW (P4-GOV-L-05)&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="85" y="12" width="1350" height="24" as="geometry"/>
        </mxCell>
        <mxCell id="main_subtitle" value="&lt;span style=&quot;font-size:11.5px;color:#475569;font-weight:600;&quot;&gt;Enterprise AI Review Pipeline: Automated Red-Teaming, Bias Screening, Decision Gates, AppSec / Legal Sign-off &amp;amp; Binary Authorization Promotion&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="85" y="36" width="1350" height="20" as="geometry"/>
        </mxCell>
        <mxCell id="top_gemini_badge" value="&lt;b style=&quot;font-size:14px;color:#2563EB;&quot;&gt;Gemini 3.7 Flash&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Governance Evaluator&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1540" y="14" width="180" height="44" as="geometry"/>
        </mxCell>

        <!-- Stage 1: Agent Definition & Local Development -->
        <mxCell id="col1_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#60A5FA;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="35" y="75" width="380" height="910" as="geometry"/>
        </mxCell>
        <mxCell id="col1_title" value="&lt;b style=&quot;font-size:12px;color:#1D4ED8;&quot;&gt;📝 Stage 1: Agent Draft &amp;amp; Specification&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;spacingLeft=10;" vertex="1" parent="1">
          <mxGeometry x="40" y="82" width="370" height="25" as="geometry"/>
        </mxCell>

        <mxCell id="node_agent_designer" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#0F172A;&quot;&gt;Vertex AI Agent Designer IDE&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.4;padding-top:4px;&quot;&gt;• System Prompt &amp;amp; Multi-Shot Demonstrations&lt;br&gt;• Tool Bindings &amp;amp; Grounding Dataset Links&lt;br&gt;• Dynamic Parameter Validation Rules&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="55" y="125" width="340" height="100" as="geometry"/>
        </mxCell>

        <mxCell id="node_git_pr" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#0F172A;&quot;&gt;Git Polyrepo Pull Request&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.4;padding-top:4px;&quot;&gt;• Agent Config as Code (YAML/JSON)&lt;br&gt;• Branch Protection &amp;amp; Semantic Versioning&lt;br&gt;• Mandatory Peer Review Sign-offs&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="55" y="250" width="340" height="100" as="geometry"/>
        </mxCell>

        <mxCell id="node_pre_commit_lint" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#0F172A;&quot;&gt;Pre-Commit Linter &amp;amp; Schema Check&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.4;padding-top:4px;&quot;&gt;• Validating MCP Tool Signatures &amp;amp; AST&lt;br&gt;• Secret Leak Scan (No Hardcoded API Keys)&lt;br&gt;• Schema Drift Detection Guard&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="55" y="375" width="340" height="100" as="geometry"/>
        </mxCell>

        <mxCell id="node_trigger_eval" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#1D4ED8;&quot;&gt;🚀 Cloud Build CI Trigger&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.3;padding-top:2px;&quot;&gt;Spawns Automated Testing Matrix &amp;amp; Locks Pipeline State&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#1D4ED8;strokeWidth=2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="55" y="500" width="340" height="80" as="geometry"/>
        </mxCell>

        <!-- Stage 2: Automated AI Evaluation & Red-Teaming -->
        <mxCell id="col2_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFBEB;strokeColor=#F59E0B;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="455" y="75" width="400" height="910" as="geometry"/>
        </mxCell>
        <mxCell id="col2_title" value="&lt;b style=&quot;font-size:12px;color:#B45309;&quot;&gt;🧪 Stage 2: Automated AI Benchmarking&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;spacingLeft=10;" vertex="1" parent="1">
          <mxGeometry x="460" y="82" width="390" height="25" as="geometry"/>
        </mxCell>

        <mxCell id="node_eval_benchmarks" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#0F172A;&quot;&gt;Vertex AI Model Evaluation Service&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.4;padding-top:4px;&quot;&gt;• Golden Dataset Ground Truth Matching&lt;br&gt;• BLEU, ROUGE, Exact Match &amp;amp; F1 Metrics&lt;br&gt;• Grounding Attribution Verification&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="475" y="125" width="360" height="100" as="geometry"/>
        </mxCell>

        <mxCell id="node_redteam_fuzzing" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#92400E;&quot;&gt;🥊 Automated Red-Teaming &amp;amp; Fuzzing&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#78350F;line-height:1.4;padding-top:4px;&quot;&gt;• 10,000+ Synthetic Jailbreak &amp;amp; Injection Vectors&lt;br&gt;• Atheris Parameter Fuzzing on Tool Schemas&lt;br&gt;• Automated Hallucination Stress-Testing&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF3C7;strokeColor=#D97706;strokeWidth=2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="475" y="250" width="360" height="105" as="geometry"/>
        </mxCell>

        <mxCell id="node_bench_gate" value="&lt;b style=&quot;font-size:11px;color:#92400E;&quot;&gt;Score &amp;ge; 95% &amp;amp;&lt;br&gt;Toxicity &amp;lt; 0.01%?&lt;/b&gt;" style="shape=rhombus;perimeter=rhombusPerimeter;whiteSpace=wrap;html=1;fillColor=#FEF3C7;strokeColor=#D97706;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="535" y="380" width="240" height="95" as="geometry"/>
        </mxCell>

        <mxCell id="node_eval_scorecard" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Looker Evaluation Scorecard&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:9px;color:#475569;&quot;&gt;Benchmark Audit Logs &amp;amp; Test Evidence (BigQuery)&lt;/span&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=6;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="475" y="500" width="360" height="85" as="geometry"/>
        </mxCell>

        <!-- Stage 3: Human-in-the-Loop Review & Compliance Gates -->
        <mxCell id="col3_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#A855F7;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="895" y="75" width="410" height="910" as="geometry"/>
        </mxCell>
        <mxCell id="col3_title" value="&lt;b style=&quot;font-size:12px;color:#7E22CE;&quot;&gt;👥 Stage 3: Human Review &amp;amp; Ethics Gate&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;spacingLeft=10;" vertex="1" parent="1">
          <mxGeometry x="900" y="82" width="400" height="25" as="geometry"/>
        </mxCell>

        <mxCell id="node_appsec_review" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#0F172A;&quot;&gt;AppSec &amp;amp; IAM Review Gate&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.4;padding-top:4px;&quot;&gt;• Tool Scope Vetting (Least Privilege Principle)&lt;br&gt;• Egress Network Domain Allowlist &amp;amp; VPC-SC&lt;br&gt;• Secret Access Audit Sign-off&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9333EA;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="915" y="125" width="370" height="100" as="geometry"/>
        </mxCell>

        <mxCell id="node_legal_ethics" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#7E22CE;&quot;&gt;Legal &amp;amp; AI Ethics Board Approval&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.4;padding-top:4px;&quot;&gt;• EU AI Act &amp;amp; Copyright Compliance Clearance&lt;br&gt;• 21 CFR Part 11 Digital E-Signature Ledger&lt;br&gt;• Bias &amp;amp; Fair Lending Impact Assessment&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F3E8FF;strokeColor=#7E22CE;strokeWidth=2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="915" y="250" width="370" height="105" as="geometry"/>
        </mxCell>

        <mxCell id="node_arb_gate" value="&lt;b style=&quot;font-size:11px;color:#6B21A8;&quot;&gt;CISO &amp;amp; ARB Board&lt;br&gt;Approved?&lt;/b&gt;" style="shape=rhombus;perimeter=rhombusPerimeter;whiteSpace=wrap;html=1;fillColor=#F3E8FF;strokeColor=#7E22CE;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="980" y="380" width="240" height="95" as="geometry"/>
        </mxCell>

        <mxCell id="node_binary_auth_sign" value="&lt;b style=&quot;font-size:11.5px;color:#7E22CE;&quot;&gt;🛡️ Binary Authorization KMS Attestor&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:9.5px;color:#475569;&quot;&gt;Cloud KMS Cryptographic Signature Injection&lt;br&gt;Attestation: &quot;Certified Compliant &amp;amp; Safe for Production&quot;&lt;/span&gt;" style="shape=hexagon;perimeter=hexagonPerimeter2;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9333EA;strokeWidth=1.8;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="915" y="500" width="370" height="85" as="geometry"/>
        </mxCell>

        <!-- Stage 4: Secure Release & Production Serving -->
        <mxCell id="col4_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#22C55E;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1345" y="75" width="375" height="910" as="geometry"/>
        </mxCell>
        <mxCell id="col4_title" value="&lt;b style=&quot;font-size:12px;color:#15803D;&quot;&gt;🚀 Stage 4: Production Canary &amp;amp; Serving&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;spacingLeft=10;" vertex="1" parent="1">
          <mxGeometry x="1350" y="82" width="365" height="25" as="geometry"/>
        </mxCell>

        <mxCell id="node_cloud_deploy" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#0F172A;&quot;&gt;Google Cloud Deploy Pipeline&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.4;padding-top:4px;&quot;&gt;• Multi-Target Canary Promotion (10% -&gt; 50% -&gt; 100%)&lt;br&gt;• Automated Rollback on Error Spike (&amp;gt; 0.1%)&lt;br&gt;• Immutable Release Manifests&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1360" y="125" width="345" height="100" as="geometry"/>
        </mxCell>

        <mxCell id="node_prod_mesh" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#15803D;&quot;&gt;🌐 GKE Production Multi-Agent Mesh&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#334155;line-height:1.4;padding-top:4px;&quot;&gt;• Binary Authorization Enforcement Gate&lt;br&gt;• VPC Service Controls Perimeter Enforced&lt;br&gt;• OpenTelemetry Tracing &amp;amp; Real-time Audit Sink&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1360" y="250" width="345" height="105" as="geometry"/>
        </mxCell>

        <mxCell id="node_telemetry_loop" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#15803D;&quot;&gt;🔄 Continuous SRE Telemetry &amp;amp; Drift Guard&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.4;padding-top:4px;&quot;&gt;• Real-time Output Drift Detection&lt;br&gt;• Automated Incident Ticket Generation&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1360" y="380" width="345" height="95" as="geometry"/>
        </mxCell>

        <!-- Connectors -->
        <mxCell id="e1" value="1. Git Push" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#2563EB;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#93C5FD;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="node_agent_designer" target="node_git_pr">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e2" value="2. CI Lint Pass" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#2563EB;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#93C5FD;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="node_git_pr" target="node_pre_commit_lint">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e3" value="3. Trigger Matrix" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#2563EB;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#93C5FD;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="node_pre_commit_lint" target="node_trigger_eval">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e4" value="4. Benchmark" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#D97706;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#FDE68A;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="node_trigger_eval" target="node_eval_benchmarks">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e5" value="5. Red-Team" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#D97706;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#FDE68A;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="node_eval_benchmarks" target="node_redteam_fuzzing">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e6" value="6. Gate Check" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#D97706;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#FDE68A;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="node_redteam_fuzzing" target="node_bench_gate">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e7" value="Pass" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#16A34A;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#86EFAC;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="node_bench_gate" target="node_appsec_review">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e8" value="7. Legal Sign-off" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#7E22CE;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#D8B4FE;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="node_appsec_review" target="node_legal_ethics">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e9" value="8. ARB Gate" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#7E22CE;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#D8B4FE;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="node_legal_ethics" target="node_arb_gate">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e10" value="Pass &amp; Attest" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#16A34A;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#86EFAC;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="node_arb_gate" target="node_binary_auth_sign">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e11" value="9. Verified Deploy" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#16A34A;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#86EFAC;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="node_binary_auth_sign" target="node_cloud_deploy">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e12" value="10. Canary Mesh" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#16A34A;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#86EFAC;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="node_cloud_deploy" target="node_prod_mesh">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e13" value="11. SRE Telemetry" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#16A34A;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#86EFAC;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="node_prod_mesh" target="node_telemetry_loop">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
