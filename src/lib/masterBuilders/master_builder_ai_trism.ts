import * as fs from 'fs';
import * as path from 'path';

export function buildAiTrismGuardrailsXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="ai_trism_guardrails" name="WBS 4.3.1: AI TRiSM Security Guardrail Pipeline System">
    <mxGraphModel dx="1600" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="950" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- TOP TITLE BANNER -->
        <mxCell id="main_title_box" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="16" width="620" height="64" as="geometry"/>
        </mxCell>
        <mxCell id="main_title_text" value="&lt;b style=&quot;font-size:20px;color:#0F172A;&quot;&gt;WBS 4.3.1: AI TRiSM Security Guardrail Pipeline System&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:15px;color:#334155;&quot;&gt;(Bespoke Security Solution)&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="45" y="20" width="590" height="56" as="geometry"/>
        </mxCell>

        <!-- TOP RIGHT METADATA TABLE -->
        <mxCell id="meta_table" value="&lt;table style=&quot;width:100%;border-collapse:collapse;font-size:9.5px;color:#0F172A;font-family:sans-serif;&quot;&gt;
  &lt;tr style=&quot;border-bottom:1px solid #E2E8F0;&quot;&gt;
    &lt;td style=&quot;font-weight:bold;padding:2px 6px;width:32%;&quot;&gt;Diagram Name:&lt;/td&gt;
    &lt;td style=&quot;padding:2px 6px;width:68%;&quot;&gt;AI TRiSM Security Guardrail&lt;/td&gt;
  &lt;/tr&gt;
  &lt;tr style=&quot;border-bottom:1px solid #E2E8F0;&quot;&gt;
    &lt;td style=&quot;font-weight:bold;padding:2px 6px;&quot;&gt;GCAF Pillar:&lt;/td&gt;
    &lt;td style=&quot;padding:2px 6px;&quot;&gt;Security, Privacy &amp;amp; Compliance&lt;/td&gt;
  &lt;/tr&gt;
  &lt;tr style=&quot;border-bottom:1px solid #E2E8F0;&quot;&gt;
    &lt;td style=&quot;font-weight:bold;padding:2px 6px;&quot;&gt;Architecture State:&lt;/td&gt;
    &lt;td style=&quot;padding:2px 6px;&quot;&gt;To-Be&lt;/td&gt;
  &lt;/tr&gt;
  &lt;tr style=&quot;border-bottom:1px solid #E2E8F0;&quot;&gt;
    &lt;td style=&quot;font-weight:bold;padding:2px 6px;&quot;&gt;Persona (Creator):&lt;/td&gt;
    &lt;td style=&quot;padding:2px 6px;&quot;&gt;6. DevSecOps&lt;/td&gt;
  &lt;/tr&gt;
  &lt;tr style=&quot;border-bottom:1px solid #E2E8F0;&quot;&gt;
    &lt;td style=&quot;font-weight:bold;padding:2px 6px;&quot;&gt;Target Audience:&lt;/td&gt;
    &lt;td style=&quot;padding:2px 6px;&quot;&gt;CISO, AI Sec&lt;/td&gt;
  &lt;/tr&gt;
  &lt;tr style=&quot;border-bottom:1px solid #E2E8F0;&quot;&gt;
    &lt;td style=&quot;font-weight:bold;padding:2px 6px;&quot;&gt;Effort:&lt;/td&gt;
    &lt;td style=&quot;padding:2px 6px;&quot;&gt;High&lt;/td&gt;
  &lt;/tr&gt;
  &lt;tr style=&quot;border-bottom:1px solid #E2E8F0;&quot;&gt;
    &lt;td style=&quot;font-weight:bold;padding:2px 6px;&quot;&gt;Tech Stack:&lt;/td&gt;
    &lt;td style=&quot;padding:2px 6px;&quot;&gt;Cloud DLP, Vertex AI Guardrails&lt;/td&gt;
  &lt;/tr&gt;
  &lt;tr style=&quot;border-bottom:1px solid #E2E8F0;&quot;&gt;
    &lt;td style=&quot;font-weight:bold;padding:2px 6px;&quot;&gt;Compliance:&lt;/td&gt;
    &lt;td style=&quot;padding:2px 6px;&quot;&gt;EU AI Act&lt;/td&gt;
  &lt;/tr&gt;
  &lt;tr style=&quot;border-bottom:1px solid #E2E8F0;&quot;&gt;
    &lt;td style=&quot;font-weight:bold;padding:2px 6px;&quot;&gt;Update Freq:&lt;/td&gt;
    &lt;td style=&quot;padding:2px 6px;&quot;&gt;Continuously&lt;/td&gt;
  &lt;/tr&gt;
  &lt;tr style=&quot;border-bottom:1px solid #E2E8F0;&quot;&gt;
    &lt;td style=&quot;font-weight:bold;padding:2px 6px;vertical-align:top;&quot;&gt;Classification Reasoning:&lt;/td&gt;
    &lt;td style=&quot;padding:2px 6px;line-height:1.2;&quot;&gt;High (Likely due to critical dependency for threat defense, data sovereignty, and regulatory compliance)&lt;/td&gt;
  &lt;/tr&gt;
  &lt;tr&gt;
    &lt;td style=&quot;font-weight:bold;padding:2px 6px;&quot;&gt;Blueprint ID:&lt;/td&gt;
    &lt;td style=&quot;padding:2px 6px;font-family:monospace;color:#0284C7;font-weight:bold;&quot;&gt;tech_ai_trism_guardrails&lt;/td&gt;
  &lt;/tr&gt;
&lt;/table&gt;" style="html=1;whiteSpace=wrap;rounded=0;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;overflow=hidden;" vertex="1" parent="1">
          <mxGeometry x="1080" y="16" width="480" height="270" as="geometry"/>
        </mxCell>

        <!-- LEFT CONTAINER: AGENT RUNTIME PLATFORM (PREREQUISITE) -->
        <mxCell id="agent_runtime_outer" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#64748B;strokeWidth=1.5;arcSize=4;" vertex="1" parent="1">
          <mxGeometry x="30" y="195" width="200" height="535" as="geometry"/>
        </mxCell>
        <mxCell id="agent_runtime_title" value="&lt;b style=&quot;font-size:12.5px;color:#0F172A;&quot;&gt;Agent Runtime Platform&lt;br&gt;(Prerequisite)&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="35" y="200" width="190" height="35" as="geometry"/>
        </mxCell>

        <!-- Inner Agent Card -->
        <mxCell id="agent_runtime_inner" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#86EFAC;strokeWidth=1.2;arcSize=6;" vertex="1" parent="1">
          <mxGeometry x="42" y="250" width="176" height="395" as="geometry"/>
        </mxCell>

        <!-- Top Agent Group Icons -->
        <mxCell id="ag_top_icon1" value="⚙️🤖" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#3B82F6;fontSize=16;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="58" y="280" width="60" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="ag_top_icon2" value="⚡👥" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#3B82F6;fontSize=16;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="138" y="280" width="60" height="60" as="geometry"/>
        </mxCell>

        <mxCell id="ag_ellipsis1" value="•••" style="text;html=1;align=center;verticalAlign=middle;fontSize=16;fontColor=#64748B;" vertex="1" parent="1">
          <mxGeometry x="100" y="380" width="60" height="24" as="geometry"/>
        </mxCell>

        <!-- Bottom Agent Group Icons -->
        <mxCell id="ag_bot_icon1" value="⚙️🤖" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#3B82F6;fontSize=16;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="58" y="445" width="60" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="ag_bot_icon2" value="⚡👥" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#3B82F6;fontSize=16;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="138" y="445" width="60" height="60" as="geometry"/>
        </mxCell>

        <mxCell id="ag_core_label" value="&lt;span style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;Core Application Logic,&lt;br&gt;Agent Execution Context&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="45" y="575" width="170" height="30" as="geometry"/>
        </mxCell>
        <mxCell id="ag_ellipsis2" value="•••" style="text;html=1;align=center;verticalAlign=middle;fontSize=16;fontColor=#64748B;" vertex="1" parent="1">
          <mxGeometry x="100" y="665" width="60" height="24" as="geometry"/>
        </mxCell>

        <!-- MAIN GCP PLATFORM CONTAINER -->
        <mxCell id="gcp_platform_outer" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#CBD5E1;strokeWidth=1.5;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="250" y="110" width="840" height="745" as="geometry"/>
        </mxCell>
        <mxCell id="gcp_platform_logo" value="🌐 &lt;b style=&quot;font-size:14px;color:#475569;&quot;&gt;Google Cloud Platform&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="265" y="120" width="260" height="30" as="geometry"/>
        </mxCell>

        <!-- WBS 4.3.1 AI TRISM SECURITY GUARDRAIL PIPELINE SYSTEM CONTAINER -->
        <mxCell id="guardrail_box" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=1.5;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="320" y="170" width="465" height="660" as="geometry"/>
        </mxCell>
        <mxCell id="guardrail_title" value="&lt;b style=&quot;font-size:12.5px;color:#0F172A;&quot;&gt;WBS 4.3.1 AI TRiSM Security Guardrail Pipeline System&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="335" y="175" width="430" height="25" as="geometry"/>
        </mxCell>

        <!-- INGRESS FLOW CONTAINER -->
        <mxCell id="ingress_box" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1;arcSize=4;" vertex="1" parent="1">
          <mxGeometry x="335" y="205" width="435" height="365" as="geometry"/>
        </mxCell>
        <mxCell id="ingress_title" value="&lt;b style=&quot;font-size:12px;color:#0F172A;&quot;&gt;Ingress Flow&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="345" y="210" width="120" height="20" as="geometry"/>
        </mxCell>

        <!-- 1. Input Guardrail (Adversarial Check & Defense) -->
        <mxCell id="input_guard_card" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#64748B;strokeWidth=1;arcSize=6;" vertex="1" parent="1">
          <mxGeometry x="350" y="240" width="255" height="135" as="geometry"/>
        </mxCell>
        <mxCell id="input_guard_title" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Input Guardrail&lt;br&gt;(Adversarial Check &amp;amp; Defense)&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=top;" vertex="1" parent="1">
          <mxGeometry x="355" y="245" width="245" height="30" as="geometry"/>
        </mxCell>
        <mxCell id="icon_vertex_input" value="✨&lt;br&gt;&lt;span style=&quot;font-size:9px;&quot;&gt;Vertex AI&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;fontSize=18;" vertex="1" parent="1">
          <mxGeometry x="355" y="295" width="60" height="40" as="geometry"/>
        </mxCell>
        <mxCell id="input_guard_text" value="&lt;b style=&quot;font-size:9.5px;color:#0F172A;&quot;&gt;Vertex AI Guardrails / Custom Logic&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:9px;color:#475569;line-height:1.3;&quot;&gt;• Check for prompt injection&lt;br&gt;• Jailbreaks&lt;br&gt;• Adversarial attacks&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="415" y="280" width="185" height="60" as="geometry"/>
        </mxCell>

        <!-- Blocked Threat Path alert icon -->
        <mxCell id="threat_alert1" value="⚠️" style="text;html=1;align=center;verticalAlign=middle;fontSize=16;" vertex="1" parent="1">
          <mxGeometry x="640" y="325" width="25" height="25" as="geometry"/>
        </mxCell>
        <mxCell id="threat_alert2" value="⚠️" style="text;html=1;align=center;verticalAlign=middle;fontSize=16;" vertex="1" parent="1">
          <mxGeometry x="675" y="350" width="25" height="25" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_blocked_path" value="⚠️ &lt;b style=&quot;font-size:9.5px;color:#991B1B;&quot;&gt;Blocked Threat Path&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="430" y="405" width="150" height="20" as="geometry"/>
        </mxCell>

        <!-- 2. PII Scrubbing & Data Masking -->
        <mxCell id="pii_card" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=1;arcSize=6;" vertex="1" parent="1">
          <mxGeometry x="350" y="435" width="255" height="115" as="geometry"/>
        </mxCell>
        <mxCell id="pii_title" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;PII Scrubbing &amp;amp;&lt;br&gt;Data Masking&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=top;" vertex="1" parent="1">
          <mxGeometry x="415" y="440" width="185" height="30" as="geometry"/>
        </mxCell>
        <mxCell id="icon_dlp" value="🛡️🔍&lt;br&gt;&lt;span style=&quot;font-size:8.5px;&quot;&gt;Cloud DLP&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;fontSize=16;" vertex="1" parent="1">
          <mxGeometry x="355" y="455" width="60" height="40" as="geometry"/>
        </mxCell>
        <mxCell id="pii_desc" value="&lt;b style=&quot;font-size:9.5px;color:#0F172A;&quot;&gt;Cloud DLP&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:9px;color:#475569;line-height:1.2;&quot;&gt;Detects and replacements PII&lt;br&gt;(emails, names, dates, etc.)&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="415" y="475" width="185" height="40" as="geometry"/>
        </mxCell>

        <!-- 3. TRiSM Threat Logging & Alerting Engine Box -->
        <mxCell id="trism_engine_box" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;TRiSM Threat&lt;br&gt;Logging &amp;amp;&lt;br&gt;Alerting Engine&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#64748B;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="625" y="450" width="125" height="110" as="geometry"/>
        </mxCell>
        <mxCell id="threat_alert_dlp" value="⚠️&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#DC2626;&quot;&gt;Audit&lt;br&gt;gRPC&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;fontSize=14;" vertex="1" parent="1">
          <mxGeometry x="605" y="475" width="40" height="35" as="geometry"/>
        </mxCell>

        <!-- Connectors inside Ingress Flow -->
        <mxCell id="e_input_to_pii" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="input_guard_card" target="pii_card">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="e_threats_top" value="Threats" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#DC2626;strokeWidth=1.5;strokeDashed=1;endArrow=classic;fontSize=9;fontColor=#DC2626;labelBackgroundColor=#FFFFFF;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="605" y="300" as="sourcePoint"/>
            <mxPoint x="685" y="450" as="targetPoint"/>
            <Array as="points">
              <mxPoint x="685" y="300"/>
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="e_pii_audit_log" value="Audit logging" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#16A34A;strokeWidth=1.2;strokeDashed=1;endArrow=classic;fontSize=8.5;fontColor=#16A34A;labelBackgroundColor=#FFFFFF;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="480" y="550" as="sourcePoint"/>
            <mxPoint x="685" y="560" as="targetPoint"/>
            <Array as="points">
              <mxPoint x="480" y="580"/>
              <mxPoint x="685" y="580"/>
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- EGRESS FLOW CONTAINER -->
        <mxCell id="egress_box" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1;arcSize=4;" vertex="1" parent="1">
          <mxGeometry x="335" y="600" width="435" height="215" as="geometry"/>
        </mxCell>
        <mxCell id="egress_title" value="&lt;b style=&quot;font-size:12px;color:#0F172A;&quot;&gt;Egress Flow&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="345" y="605" width="120" height="20" as="geometry"/>
        </mxCell>

        <!-- Output Filter Card -->
        <mxCell id="output_filter_card" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#64748B;strokeWidth=1;arcSize=6;" vertex="1" parent="1">
          <mxGeometry x="350" y="635" width="410" height="165" as="geometry"/>
        </mxCell>
        <mxCell id="output_filter_title" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Output Filter (hallucination&lt;br&gt;defense &amp;amp; safety check)&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=top;" vertex="1" parent="1">
          <mxGeometry x="380" y="640" width="220" height="30" as="geometry"/>
        </mxCell>
        <mxCell id="icon_vertex_output" value="✨&lt;br&gt;&lt;span style=&quot;font-size:8.5px;&quot;&gt;Vertex AI&lt;br&gt;Guardrails&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;fontSize=18;" vertex="1" parent="1">
          <mxGeometry x="355" y="695" width="70" height="45" as="geometry"/>
        </mxCell>
        <mxCell id="output_filter_desc" value="&lt;b style=&quot;font-size:9.5px;color:#0F172A;&quot;&gt;Vertex AI Guardrails&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:9px;color:#475569;line-height:1.3;&quot;&gt;• Checks model responses for&lt;br&gt;• Hallucinations, offensive content&lt;br&gt;• PII leakage&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="430" y="685" width="190" height="60" as="geometry"/>
        </mxCell>

        <!-- Red PII Scrubbing badge inside Egress -->
        <mxCell id="badge_pii_scrub" value="&lt;b style=&quot;color:#FFFFFF;font-size:10px;&quot;&gt;PII Scrubbing&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DC2626;strokeColor=none;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="640" y="695" width="105" height="32" as="geometry"/>
        </mxCell>
        <mxCell id="threat_alert_egress" value="⚠️" style="text;html=1;align=center;verticalAlign=middle;fontSize=16;" vertex="1" parent="1">
          <mxGeometry x="680" y="668" width="25" height="25" as="geometry"/>
        </mxCell>

        <!-- Prompt Injection Defense Callout (Red Bubble) -->
        <mxCell id="callout_prompt_inj" value="&lt;b style=&quot;color:#FFFFFF;font-size:10.5px;&quot;&gt;Prompt Injection&lt;br&gt;Defense&lt;/b&gt;" style="shape=callout;whiteSpace=wrap;html=1;perimeter=calloutPerimeter;position2=0.5;size=16;position=0.3;fillColor=#B91C1C;strokeColor=none;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="585" y="775" width="125" height="60" as="geometry"/>
        </mxCell>

        <!-- EXTERNAL AI MODELS & PROVIDERS -->
        <mxCell id="ext_ai_models_box" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;External AI Models&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:10px;color:#475569;&quot;&gt;(GCP Vertex AI, etc.)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#64748B;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="840" y="240" width="165" height="50" as="geometry"/>
        </mxCell>
        <mxCell id="ext_provider_box" value="&lt;span style=&quot;font-size:11px;color:#0F172A;&quot;&gt;External provider&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#64748B;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="840" y="315" width="165" height="40" as="geometry"/>
        </mxCell>

        <!-- Connectors into External AI Models -->
        <mxCell id="e_scrubbed_input" value="Scrubbed/&lt;br&gt;Masked&lt;br&gt;Agent Input" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;fontSize=9;fontColor=#0F172A;labelBackgroundColor=#FFFFFF;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="605" y="265" as="sourcePoint"/>
            <mxPoint x="840" y="265" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
        <mxCell id="e_raw_output" value="Raw Model&lt;br&gt;Output" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;fontSize=9;fontColor=#0F172A;labelBackgroundColor=#FFFFFF;labelPosition=left;spacingRight=8;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="840" y="335" as="sourcePoint"/>
            <mxPoint x="770" y="675" as="targetPoint"/>
            <Array as="points">
              <mxPoint x="815" y="335"/>
              <mxPoint x="815" y="675"/>
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- Raw Agent Input connector from Agent Runtime Platform -->
        <mxCell id="e_agent_to_guardrail" value="Raw Agent Input&lt;br&gt;(Prompts/&lt;br&gt;Commands)" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;fontSize=9;fontColor=#0F172A;labelBackgroundColor=#FFFFFF;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="230" y="325" as="sourcePoint"/>
            <mxPoint x="350" y="325" as="targetPoint"/>
          </mxGeometry>
        </mxCell>

        <!-- Scrubbed/Validated Model Output back to Agent Runtime Platform -->
        <mxCell id="e_guardrail_to_agent" value="Scrubbed/&lt;br&gt;Validated&lt;br&gt;&lt;br&gt;Model&lt;br&gt;Output" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;fontSize=9;fontColor=#0F172A;labelBackgroundColor=#FFFFFF;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="350" y="718" as="sourcePoint"/>
            <mxPoint x="130" y="645" as="targetPoint"/>
            <Array as="points">
              <mxPoint x="230" y="718"/>
              <mxPoint x="230" y="718"/>
              <mxPoint x="130" y="718"/>
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- LOOKER STUDIO (TRISM OBSERVABILITY DASHBOARD) -->
        <mxCell id="looker_outer" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=1.5;arcSize=4;" vertex="1" parent="1">
          <mxGeometry x="840" y="415" width="270" height="170" as="geometry"/>
        </mxCell>
        <mxCell id="looker_title" value="&lt;b style=&quot;font-size:12px;color:#0F172A;&quot;&gt;Looker Studio&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:10px;color:#475569;&quot;&gt;(TRiSM Observability Dashboard)&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=top;" vertex="1" parent="1">
          <mxGeometry x="850" y="420" width="250" height="30" as="geometry"/>
        </mxCell>

        <!-- Mini Dashboard Widgets -->
        <mxCell id="looker_widgets_box" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="848" y="462" width="254" height="110" as="geometry"/>
        </mxCell>
        <mxCell id="looker_widgets_title" value="&lt;span style=&quot;font-size:9px;color:#64748B;&quot;&gt;Widgets&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="852" y="465" width="60" height="15" as="geometry"/>
        </mxCell>

        <!-- Widget 1: PII Scrubbing Rates -->
        <mxCell id="w1_box" value="&lt;div style=&quot;font-size:7.5px;color:#0F172A;font-weight:bold;margin-bottom:2px;&quot;&gt;PII Scrubbing&lt;br&gt;Rates&lt;/div&gt;
&lt;div style=&quot;height:24px;display:flex;align-items:flex-end;gap:2px;justify-content:center;&quot;&gt;
  &lt;div style=&quot;width:6px;height:12px;background:#3B82F6;&quot;&gt;&lt;/div&gt;
  &lt;div style=&quot;width:6px;height:18px;background:#3B82F6;&quot;&gt;&lt;/div&gt;
  &lt;div style=&quot;width:6px;height:10px;background:#3B82F6;&quot;&gt;&lt;/div&gt;
  &lt;div style=&quot;width:6px;height:22px;background:#3B82F6;&quot;&gt;&lt;/div&gt;
&lt;/div&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#E2E8F0;align=center;verticalAlign=top;padding=2;" vertex="1" parent="1">
          <mxGeometry x="854" y="482" width="75" height="80" as="geometry"/>
        </mxCell>

        <!-- Widget 2: Threat Deflections -->
        <mxCell id="w2_box" value="&lt;div style=&quot;font-size:7.5px;color:#0F172A;font-weight:bold;margin-bottom:2px;&quot;&gt;Threat&lt;br&gt;Deflections&lt;/div&gt;
&lt;div style=&quot;height:24px;border-bottom:1px solid #CBD5E1;display:flex;align-items:center;justify-content:center;&quot;&gt;
  &lt;span style=&quot;color:#DC2626;font-size:14px;&quot;&gt;📉&lt;/span&gt;
&lt;/div&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#E2E8F0;align=center;verticalAlign=top;padding=2;" vertex="1" parent="1">
          <mxGeometry x="937" y="482" width="75" height="80" as="geometry"/>
        </mxCell>

        <!-- Widget 3: Compliance Status -->
        <mxCell id="w3_box" value="&lt;div style=&quot;font-size:7.5px;color:#0F172A;font-weight:bold;margin-bottom:2px;&quot;&gt;Compliance&lt;br&gt;Status&lt;/div&gt;
&lt;div style=&quot;height:24px;border-bottom:1px solid #CBD5E1;display:flex;align-items:center;justify-content:center;&quot;&gt;
  &lt;span style=&quot;color:#16A34A;font-size:14px;&quot;&gt;📈&lt;/span&gt;
&lt;/div&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#E2E8F0;align=center;verticalAlign=top;padding=2;" vertex="1" parent="1">
          <mxGeometry x="1020" y="482" width="75" height="80" as="geometry"/>
        </mxCell>

        <!-- Connectors to/from Looker Studio & Threat Engine -->
        <mxCell id="e_trism_to_looker" value="EU AI Act&lt;br&gt;Compliance&lt;br&gt;Engine" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;fontSize=9;fontColor=#0F172A;labelBackgroundColor=#FFFFFF;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="750" y="475" as="sourcePoint"/>
            <mxPoint x="840" y="475" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
        <mxCell id="e_pull_compliance" value="Pull active&lt;br&gt;Compliance&lt;br&gt;Enforcement" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#16A34A;strokeWidth=1.2;strokeDashed=1;endArrow=classic;fontSize=8.5;fontColor=#16A34A;labelBackgroundColor=#FFFFFF;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="840" y="550" as="sourcePoint"/>
            <mxPoint x="750" y="550" as="targetPoint"/>
          </mxGeometry>
        </mxCell>

        <!-- BOTTOM CONFIGURATION & INFRASTRUCTURE CONTROLS -->
        <mxCell id="cloud_iam_box" value="🛡️ 🌐 🔒&lt;br&gt;&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;Cloud IAM, VPC-SC, Secret&lt;br&gt;Secret Manager&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#64748B;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="840" y="730" width="200" height="65" as="geometry"/>
        </mxCell>

        <mxCell id="config_repo_box" value="⚙️📁&lt;br&gt;&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;Config&lt;br&gt;Repository&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="898" y="635" width="85" height="55" as="geometry"/>
        </mxCell>

        <mxCell id="e_sec_config" value="gRPC&lt;br&gt;Secure&lt;br&gt;Configuration&lt;br&gt;Flow" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#7C3AED;strokeWidth=1.5;endArrow=classic;fontSize=8.5;fontColor=#7C3AED;labelBackgroundColor=#FFFFFF;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="898" y="660" as="sourcePoint"/>
            <mxPoint x="770" y="660" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
        <mxCell id="e_iam_config" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#7C3AED;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="cloud_iam_box" target="config_repo_box">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- PERSONAS (RIGHT SIDE) -->
        <!-- CISO & AI Sec Personas -->
        <mxCell id="persona_ciso" value="👥🛡️&lt;br&gt;&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;CISO &amp;amp; AI Sec&lt;br&gt;Personas&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;fontSize=20;" vertex="1" parent="1">
          <mxGeometry x="1170" y="445" width="130" height="60" as="geometry"/>
        </mxCell>

        <!-- DevSecOps Persona -->
        <mxCell id="git_icon" value="🐙&lt;br&gt;&lt;span style=&quot;font-size:9.5px;color:#0F172A;&quot;&gt;DevSecOps&lt;br&gt;(e.g., Git)&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;fontSize=24;" vertex="1" parent="1">
          <mxGeometry x="1035" y="625" width="80" height="55" as="geometry"/>
        </mxCell>
        <mxCell id="persona_devsecops" value="👨‍💻&lt;br&gt;&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;DevSecOps&lt;br&gt;Persona&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:9.5px;color:#64748B;&quot;&gt;(Creator)&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;fontSize=20;" vertex="1" parent="1">
          <mxGeometry x="1225" y="615" width="115" height="75" as="geometry"/>
        </mxCell>

        <!-- Persona Connectors -->
        <mxCell id="e_ciso_looker" value="Review Security&lt;br&gt;Posture" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#16A34A;strokeWidth=1.2;strokeDashed=1;endArrow=classic;startArrow=classic;fontSize=9;fontColor=#16A34A;labelBackgroundColor=#FFFFFF;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="1110" y="475" as="sourcePoint"/>
            <mxPoint x="1170" y="475" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
        <mxCell id="e_devsecops_ciso" value="Review Security&lt;br&gt;Posture &amp;amp; Compliance" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#64748B;strokeWidth=1.2;strokeDashed=1;endArrow=classic;fontSize=8.5;fontColor=#475569;labelBackgroundColor=#FFFFFF;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="1280" y="615" as="sourcePoint"/>
            <mxPoint x="1245" y="515" as="targetPoint"/>
            <Array as="points">
              <mxPoint x="1280" y="565"/>
              <mxPoint x="1245" y="565"/>
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="e_devsecops_git" value="Defines DLP Rules,&lt;br&gt;Configures&lt;br&gt;Guardrails Policies" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#7C3AED;strokeWidth=1.5;endArrow=classic;fontSize=9;fontColor=#7C3AED;labelBackgroundColor=#FFFFFF;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="1225" y="650" as="sourcePoint"/>
            <mxPoint x="1115" y="650" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
        <mxCell id="e_git_config" value="Config" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#7C3AED;strokeWidth=1.5;endArrow=classic;fontSize=9;fontColor=#7C3AED;labelBackgroundColor=#FFFFFF;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="1035" y="650" as="sourcePoint"/>
            <mxPoint x="983" y="650" as="targetPoint"/>
          </mxGeometry>
        </mxCell>

        <!-- BOTTOM RIGHT LEGEND -->
        <mxCell id="legend_box" value="&lt;div style=&quot;font-weight:bold;font-size:11px;margin-bottom:4px;color:#0F172A;text-align:left;&quot;&gt;Legend&lt;/div&gt;
&lt;table style=&quot;width:100%;font-size:9.5px;color:#0F172A;font-family:sans-serif;&quot;&gt;
  &lt;tr&gt;
    &lt;td style=&quot;width:24px;&quot;&gt;🔍&lt;/td&gt;&lt;td style=&quot;width:35%;&quot;&gt;DLP&lt;/td&gt;
    &lt;td style=&quot;width:24px;&quot;&gt;➔&lt;/td&gt;&lt;td&gt;Symbols&lt;/td&gt;
  &lt;/tr&gt;
  &lt;tr&gt;
    &lt;td&gt;✨&lt;/td&gt;&lt;td&gt;Vertex AI&lt;/td&gt;
    &lt;td&gt;➔&lt;/td&gt;&lt;td&gt;Financial data&lt;/td&gt;
  &lt;/tr&gt;
  &lt;tr&gt;
    &lt;td&gt;⚠️&lt;/td&gt;&lt;td&gt;Threats&lt;/td&gt;
    &lt;td&gt;⇢&lt;/td&gt;&lt;td&gt;Usage metrics&lt;/td&gt;
  &lt;/tr&gt;
  &lt;tr&gt;
    &lt;td&gt;⇢&lt;/td&gt;&lt;td&gt;Compliance&lt;/td&gt;
    &lt;td&gt;🟦&lt;/td&gt;&lt;td&gt;Financial&lt;/td&gt;
  &lt;/tr&gt;
  &lt;tr&gt;
    &lt;td&gt;➔&lt;/td&gt;&lt;td&gt;Secure Config&lt;/td&gt;
    &lt;td&gt;🟩&lt;/td&gt;&lt;td&gt;Colors&lt;/td&gt;
  &lt;/tr&gt;
&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1100" y="715" width="310" height="145" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
`.trim();
}
