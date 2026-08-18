import * as fs from 'fs';
import * as path from 'path';

export function buildAiTrismGuardrailsXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="ai_trism_guardrails" name="AI TRiSM Security Guardrail Pipeline System">
    <mxGraphModel dx="1600" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="950" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- ==================== TOP TITLE BANNER ==================== -->
        <mxCell id="main_title_box" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="16" width="700" height="64" as="geometry"/>
        </mxCell>
        <mxCell id="main_title_text" value="&lt;b style=&quot;font-size:20px;color:#0F172A;&quot;&gt;AI TRiSM Security Guardrail Pipeline System&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:13px;color:#334155;font-weight:600;&quot;&gt;Trust, Risk &amp;amp; Security Management • Bidirectional Ingress/Egress Guardrails&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="45" y="20" width="670" height="56" as="geometry"/>
        </mxCell>

        <!-- ==================== LEFT CONTAINER: AGENT RUNTIME PLATFORM (PREREQUISITE) ==================== -->
        <mxCell id="agent_runtime_outer" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#64748B;strokeWidth=1.5;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="30" y="110" width="230" height="745" as="geometry"/>
        </mxCell>
        <mxCell id="agent_runtime_title" value="&lt;b style=&quot;font-size:12.5px;color:#0F172A;&quot;&gt;🤖 Agent Runtime Platform&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:9.5px;color:#475569;&quot;&gt;Prerequisite Core Runtime Context&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="35" y="118" width="220" height="34" as="geometry"/>
        </mxCell>

        <!-- Supervisor Agent Card -->
        <mxCell id="card_agent_supervisor" value="&lt;table style=&quot;width:100%;text-align:left;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;🧠 Reasoning Supervisor&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9.5px;color:#334155;line-height:1.3;padding-top:4px;&quot;&gt;• Chain-of-Thought Planner&lt;br&gt;• Intent Classification Engine&lt;br&gt;• Memory &amp;amp; Session State Store&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="45" y="165" width="200" height="110" as="geometry"/>
        </mxCell>

        <!-- Worker Subagents Grid -->
        <mxCell id="card_agent_workers" value="&lt;table style=&quot;width:100%;text-align:left;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;⚡ Specialized Tool Agents&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9.5px;color:#334155;line-height:1.3;padding-top:4px;&quot;&gt;• SQL Analytics Agent&lt;br&gt;• API &amp;amp; Retrieval Agent (RAG)&lt;br&gt;• Code Generation &amp;amp; Exec&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="45" y="295" width="200" height="110" as="geometry"/>
        </mxCell>

        <!-- Core Application Context Card -->
        <mxCell id="card_agent_context" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#1E293B;&quot;&gt;Core Application Context&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9px;color:#475569;padding-top:4px;&quot;&gt;Microservices Mesh • MCP Host&lt;br&gt;LangGraph / Vertex Agent Engine&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="45" y="425" width="200" height="75" as="geometry"/>
        </mxCell>

        <!-- Model Response Consumer Box -->
        <mxCell id="card_agent_sink" value="&lt;table style=&quot;width:100%;text-align:left;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#7E22CE;&quot;&gt;📥 Verified Output Consumer&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9.5px;color:#334155;line-height:1.3;padding-top:4px;&quot;&gt;• Sanitized Response Stream&lt;br&gt;• Audit Log Verification Token&lt;br&gt;• User Client Presentation&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#A855F7;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="45" y="660" width="200" height="110" as="geometry"/>
        </mxCell>


        <!-- ==================== MAIN GCP PLATFORM CONTAINER ==================== -->
        <mxCell id="gcp_platform_outer" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="280" y="110" width="810" height="745" as="geometry"/>
        </mxCell>
        <mxCell id="gcp_platform_logo" value="🌐 &lt;b style=&quot;font-size:14px;color:#1E293B;&quot;&gt;Google Cloud Platform — Security Perimeter&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="295" y="118" width="400" height="26" as="geometry"/>
        </mxCell>

        <!-- AI TRISM SECURITY GUARDRAIL PIPELINE SYSTEM CONTAINER -->
        <mxCell id="guardrail_box" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=1.5;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="295" y="155" width="490" height="685" as="geometry"/>
        </mxCell>
        <mxCell id="guardrail_title" value="&lt;b style=&quot;font-size:12.5px;color:#1D4ED8;&quot;&gt;🛡️ AI TRiSM Security Guardrail Pipeline System&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="310" y="160" width="450" height="25" as="geometry"/>
        </mxCell>

        <!-- INGRESS FLOW CONTAINER -->
        <mxCell id="ingress_box" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;arcSize=4;" vertex="1" parent="1">
          <mxGeometry x="310" y="190" width="460" height="375" as="geometry"/>
        </mxCell>
        <mxCell id="ingress_title" value="&lt;b style=&quot;font-size:12px;color:#0F172A;&quot;&gt;⬇️ Ingress Flow (Pre-Inference Sanitization)&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="320" y="194" width="300" height="22" as="geometry"/>
        </mxCell>

        <!-- 1. Input Guardrail (Adversarial Check & Defense) -->
        <mxCell id="input_guard_card" value="&lt;table style=&quot;width:100%;text-align:left;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;✨ Vertex AI Model Armor / Input Guardrail&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9.5px;color:#334155;line-height:1.3;padding-top:4px;&quot;&gt;• Prompt Injection &amp;amp; Jailbreak Detection&lt;br&gt;• Toxic Content &amp;amp; Malicious Payload Classifier&lt;br&gt;• System Prompt Leakage &amp;amp; Override Interceptor&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="325" y="222" width="280" height="120" as="geometry"/>
        </mxCell>

        <!-- Blocked Threat Path callout -->
        <mxCell id="lbl_blocked_path" value="&lt;b style=&quot;font-size:9.5px;color:#DC2626;&quot;&gt;⚠️ Blocked Threat Path&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#64748B;&quot;&gt;Auto-Quarantined &amp;amp; Dropped&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF2F2;strokeColor=#F87171;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="615" y="222" width="145" height="50" as="geometry"/>
        </mxCell>

        <!-- 2. PII Scrubbing & Data Masking -->
        <mxCell id="pii_card" value="&lt;table style=&quot;width:100%;text-align:left;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;🔍 Cloud Sensitive Data Protection (DLP)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9.5px;color:#334155;line-height:1.3;padding-top:4px;&quot;&gt;• Real-time PII Identification (SSN, Email, CC)&lt;br&gt;• Crypto-Tokenization &amp;amp; Synthetic Masking&lt;br&gt;• HIPAA &amp;amp; GDPR Compliance Redaction Gate&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="325" y="365" width="280" height="120" as="geometry"/>
        </mxCell>

        <!-- 3. TRiSM Threat Logging & Alerting Engine Box -->
        <mxCell id="trism_engine_box" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;🚨 TRiSM Threat&lt;br&gt;Logging Engine&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#475569;padding-top:2px;&quot;&gt;Chronicle SIEM&lt;br&gt;Cloud Audit Logs&lt;br&gt;Pub/Sub Alert Bus&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#64748B;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="615" y="365" width="145" height="120" as="geometry"/>
        </mxCell>

        <!-- Connectors inside Ingress Flow -->
        <mxCell id="e_input_to_pii" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="input_guard_card" target="pii_card">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="e_threats_top" value="Threat Alert" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#DC2626;strokeWidth=1.5;strokeDashed=1;endArrow=classic;fontSize=8.5;fontColor=#DC2626;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="input_guard_card" target="lbl_blocked_path">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="e_blocked_to_trism" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#DC2626;strokeWidth=1.2;strokeDashed=1;endArrow=classic;" edge="1" parent="1" source="lbl_blocked_path" target="trism_engine_box">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="e_pii_audit_log" value="Audit Log" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#16A34A;strokeWidth=1.2;strokeDashed=1;endArrow=classic;fontSize=8.5;fontColor=#16A34A;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="pii_card" target="trism_engine_box">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>


        <!-- EGRESS FLOW CONTAINER -->
        <mxCell id="egress_box" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;arcSize=4;" vertex="1" parent="1">
          <mxGeometry x="310" y="580" width="460" height="245" as="geometry"/>
        </mxCell>
        <mxCell id="egress_title" value="&lt;b style=&quot;font-size:12px;color:#0F172A;&quot;&gt;⬆️ Egress Flow (Post-Inference Verification)&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="320" y="585" width="320" height="22" as="geometry"/>
        </mxCell>

        <!-- Output Filter Card -->
        <mxCell id="output_filter_card" value="&lt;table style=&quot;width:100%;text-align:left;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;🛡️ Output Filter (Hallucination Defense &amp;amp; Safety)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9.5px;color:#334155;line-height:1.3;padding-top:4px;&quot;&gt;• Vertex AI Grounding Citation &amp;amp; Faithfulness Scorer&lt;br&gt;• Toxic, Hate &amp;amp; Bias Output Classifier&lt;br&gt;• Reverse-PII De-anonymization &amp;amp; Data Leak Defense&lt;br&gt;• Enforced Policy Compliance (EU AI Act &amp;amp; NIST AI RMF)&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#64748B;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="325" y="615" width="430" height="195" as="geometry"/>
        </mxCell>


        <!-- ==================== EXTERNAL AI MODELS & CLOUD FOUNDATION ==================== -->
        <!-- External AI Models Box -->
        <mxCell id="ext_ai_models_box" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;✨ Vertex AI Foundation Models&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#475569;padding-top:2px;&quot;&gt;Gemini 3.7 Pro / Flash (Zero-Data Retention)&lt;br&gt;Dedicated PSC Private Endpoint (VPC-SC)&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#A855F7;strokeWidth=1.5;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="810" y="190" width="265" height="65" as="geometry"/>
        </mxCell>

        <!-- External Provider / Anthropic / PaLM Box -->
        <mxCell id="ext_provider_box" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;🌐 Multi-Model Model Garden&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#475569;padding-top:2px;&quot;&gt;Claude 3.5 Sonnet • Llama 3 • Embeddings&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#64748B;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="810" y="275" width="265" height="55" as="geometry"/>
        </mxCell>

        <!-- Connectors into External AI Models -->
        <mxCell id="e_scrubbed_input" value="Scrubbed Prompt" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#16A34A;strokeWidth=1.5;endArrow=classic;fontSize=9;fontColor=#16A34A;labelBackgroundColor=#FFFFFF;padding=2;" edge="1" parent="1" source="pii_card" target="ext_ai_models_box">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="790" y="425"/>
              <mxPoint x="790" y="222"/>
            </Array>
          </mxGeometry>
        </mxCell>

        <mxCell id="e_raw_output" value="Raw Inference Stream" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#9333EA;strokeWidth=1.5;endArrow=classic;fontSize=9;fontColor=#9333EA;labelBackgroundColor=#FFFFFF;padding=2;" edge="1" parent="1" source="ext_provider_box" target="output_filter_card">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="790" y="302"/>
              <mxPoint x="790" y="650"/>
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- Ingress Arrow from Agent Runtime into Guardrail -->
        <mxCell id="e_agent_to_guardrail" value="Raw Agent Input" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#2563EB;strokeWidth=2;endArrow=classic;fontSize=9.5;fontColor=#1E40AF;labelBackgroundColor=#FFFFFF;padding=2;" edge="1" parent="1" source="card_agent_supervisor" target="input_guard_card">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- Egress Return Arrow from Output Filter back into Verified Output Consumer -->
        <mxCell id="e_guardrail_to_agent" value="Verified Model Output" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#16A34A;strokeWidth=2;endArrow=classic;fontSize=9.5;fontColor=#15803D;labelBackgroundColor=#FFFFFF;padding=2;" edge="1" parent="1" source="output_filter_card" target="card_agent_sink">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="300" y="715"/>
              <mxPoint x="300" y="715"/>
            </Array>
          </mxGeometry>
        </mxCell>


        <!-- ==================== LOOKER STUDIO (TRISM OBSERVABILITY DASHBOARD) ==================== -->
        <mxCell id="looker_outer" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=1.5;arcSize=4;" vertex="1" parent="1">
          <mxGeometry x="810" y="355" width="265" height="205" as="geometry"/>
        </mxCell>
        <mxCell id="looker_title" value="&lt;b style=&quot;font-size:12px;color:#1D4ED8;&quot;&gt;📊 Looker Studio TRiSM Dashboard&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Real-Time Security &amp;amp; Compliance Telemetry&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=top;" vertex="1" parent="1">
          <mxGeometry x="815" y="360" width="255" height="30" as="geometry"/>
        </mxCell>

        <!-- 3 Dashboard Metric Widgets -->
        <mxCell id="w1_box" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;font-weight:bold;color:#1E40AF;&quot;&gt;PII Scrubbed&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:14px;font-weight:bold;color:#2563EB;padding-top:2px;&quot;&gt;99.98%&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;color:#64748B;&quot;&gt;14.2M Tokens/day&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#BFDBFE;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="820" y="400" width="75" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="w2_box" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;font-weight:bold;color:#991B1B;&quot;&gt;Threats Deflected&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:14px;font-weight:bold;color:#DC2626;padding-top:2px;&quot;&gt;1,420&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;color:#64748B;&quot;&gt;Zero Injections&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#FECACA;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="905" y="400" width="75" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="w3_box" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;font-weight:bold;color:#15803D;&quot;&gt;EU AI Act Status&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:14px;font-weight:bold;color:#16A34A;padding-top:2px;&quot;&gt;100%&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;color:#64748B;&quot;&gt;Audit Ready&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#BBF7D0;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="990" y="400" width="75" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="lbl_looker_note" value="&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Automated SIEM aggregation via BigQuery BI Engine&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="820" y="490" width="245" height="20" as="geometry"/>
        </mxCell>

        <!-- Connectors between TRiSM engine and Looker -->
        <mxCell id="e_trism_to_looker" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#2563EB;strokeWidth=1.2;endArrow=classic;" edge="1" parent="1" source="trism_engine_box" target="looker_outer">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>


        <!-- ==================== BOTTOM CONFIGURATION & INFRASTRUCTURE CONTROLS ==================== -->
        <!-- Cloud IAM & VPC-SC Box -->
        <mxCell id="cloud_iam_box" value="&lt;table style=&quot;width:100%;text-align:left;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;🔐 Cloud IAM, VPC-SC &amp;amp; Secret Manager&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9px;color:#334155;line-height:1.25;padding-top:2px;&quot;&gt;• Least Privilege Service Accounts&lt;br&gt;• CMEK Automated Key Rotation (Cloud KMS)&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#64748B;strokeWidth=1.2;align=left;verticalAlign=top;padding=4;" vertex="1" parent="1">
          <mxGeometry x="810" y="580" width="265" height="85" as="geometry"/>
        </mxCell>

        <!-- Config Repository GitOps Box -->
        <mxCell id="config_repo_box" value="&lt;table style=&quot;width:100%;text-align:left;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#1E40AF;&quot;&gt;⚙️ GitOps Policy Repository&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9px;color:#334155;line-height:1.25;padding-top:2px;&quot;&gt;• Declarative OPA Guardrail Policies&lt;br&gt;• Automated CI/CD Regression Evaluation&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.5;align=left;verticalAlign=top;padding=4;" vertex="1" parent="1">
          <mxGeometry x="810" y="685" width="265" height="85" as="geometry"/>
        </mxCell>

        <mxCell id="e_sec_config" value="Policy Sync" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#7C3AED;strokeWidth=1.5;endArrow=classic;fontSize=8.5;fontColor=#7C3AED;labelBackgroundColor=#FFFFFF;padding=2;" edge="1" parent="1" source="config_repo_box" target="output_filter_card">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="e_iam_config" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#64748B;strokeWidth=1.2;endArrow=classic;" edge="1" parent="1" source="cloud_iam_box" target="config_repo_box">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>


        <!-- ==================== PERSONAS (RIGHT COLUMN) ==================== -->
        <!-- CISO & AI Sec Persona Card -->
        <mxCell id="persona_ciso" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:24px;&quot;&gt;🛡️👥&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;CISO &amp;amp; AI Sec Teams&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#64748B;&quot;&gt;Executive Security Oversight&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1130" y="385" width="200" height="90" as="geometry"/>
        </mxCell>

        <!-- DevSecOps Persona Card -->
        <mxCell id="persona_devsecops" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:24px;&quot;&gt;👨‍💻🐙&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;DevSecOps Engineer&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#64748B;&quot;&gt;Pipeline &amp;amp; Guardrail Maintainer&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1130" y="680" width="200" height="90" as="geometry"/>
        </mxCell>

        <!-- Persona Connectors -->
        <mxCell id="e_ciso_looker" value="Audit Security" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#16A34A;strokeWidth=1.2;strokeDashed=1;endArrow=classic;startArrow=classic;fontSize=8.5;fontColor=#16A34A;labelBackgroundColor=#FFFFFF;padding=2;" edge="1" parent="1" source="persona_ciso" target="looker_outer">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="e_devsecops_git" value="Defines Guardrail Rules" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#7C3AED;strokeWidth=1.5;endArrow=classic;fontSize=8.5;fontColor=#7C3AED;labelBackgroundColor=#FFFFFF;padding=2;" edge="1" parent="1" source="persona_devsecops" target="config_repo_box">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>


        <!-- ==================== FOOTER LEGEND ==================== -->
        <mxCell id="legend_box" value="&lt;table style=&quot;width:100%;font-size:9.5px;color:#334155;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td&gt;&lt;b style=&quot;color:#0F172A;&quot;&gt;AI TRiSM Fabric:&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🔵 &lt;b&gt;Bidirectional Guardrails&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🟢 &lt;b&gt;PII Cloud DLP Masking&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🔴 &lt;b&gt;Prompt Injection Interceptor&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🟣 &lt;b&gt;GitOps Policy Sync&lt;/b&gt;&lt;/td&gt;&lt;td&gt;✨ &lt;b style=&quot;color:#1D4ED8;&quot;&gt;Powered by Gemini Platform&lt;/b&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="30" y="870" width="1540" height="38" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
`.trim();
}

