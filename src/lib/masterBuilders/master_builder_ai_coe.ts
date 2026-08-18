import fs from "fs";
import path from "path";

function escapeXmlAttr(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function buildPristineAiCoeXml(): string {
  const userOnboardingSvg = `
<div style="position:relative;width:110px;height:110px;display:flex;align-items:center;justify-content:center;text-align:center;">
  <svg width="110" height="110" viewBox="0 0 110 110" style="position:absolute;top:0;left:0;">
    <path d="M 28,30 A 38,38 0 0,1 80,26" fill="none" stroke="#2563EB" stroke-width="2.2"/>
    <polygon points="80,20 89,27 80,33" fill="#2563EB"/>
    <path d="M 85,30 A 38,38 0 0,1 83,80" fill="none" stroke="#2563EB" stroke-width="2.2"/>
    <polygon points="90,80 83,89 78,81" fill="#2563EB"/>
    <path d="M 80,85 A 38,38 0 0,1 30,84" fill="none" stroke="#2563EB" stroke-width="2.2"/>
    <polygon points="31,90 22,83 31,78" fill="#2563EB"/>
    <path d="M 26,80 A 38,38 0 0,1 27,30" fill="none" stroke="#2563EB" stroke-width="2.2"/>
    <polygon points="21,31 28,22 33,31" fill="#2563EB"/>
  </svg>
  <div style="font-size:11.5px;font-weight:bold;color:#0F172A;line-height:1.2;z-index:2;">
    User<br>Onboarding
  </div>
</div>
`.trim();

  const promptCurationSvg = `
<div style="position:relative;width:110px;height:110px;display:flex;align-items:center;justify-content:center;text-align:center;">
  <svg width="110" height="110" viewBox="0 0 110 110" style="position:absolute;top:0;left:0;">
    <path d="M 28,30 A 38,38 0 0,1 80,26" fill="none" stroke="#2563EB" stroke-width="2.2"/>
    <polygon points="80,20 89,27 80,33" fill="#2563EB"/>
    <path d="M 85,30 A 38,38 0 0,1 83,80" fill="none" stroke="#2563EB" stroke-width="2.2"/>
    <polygon points="90,80 83,89 78,81" fill="#2563EB"/>
    <path d="M 80,85 A 38,38 0 0,1 30,84" fill="none" stroke="#2563EB" stroke-width="2.2"/>
    <polygon points="31,90 22,83 31,78" fill="#2563EB"/>
    <path d="M 26,80 A 38,38 0 0,1 27,30" fill="none" stroke="#2563EB" stroke-width="2.2"/>
    <polygon points="21,31 28,22 33,31" fill="#2563EB"/>
  </svg>
  <div style="font-size:11.5px;font-weight:bold;color:#0F172A;line-height:1.2;z-index:2;">
    Prompt<br>Curation
  </div>
</div>
`.trim();

  const feedbackLoopsSvg = `
<div style="position:relative;width:110px;height:110px;display:flex;align-items:center;justify-content:center;text-align:center;">
  <svg width="110" height="110" viewBox="0 0 110 110" style="position:absolute;top:0;left:0;">
    <path d="M 28,30 A 38,38 0 0,1 80,26" fill="none" stroke="#2563EB" stroke-width="2.2"/>
    <polygon points="80,20 89,27 80,33" fill="#2563EB"/>
    <path d="M 85,30 A 38,38 0 0,1 83,80" fill="none" stroke="#2563EB" stroke-width="2.2"/>
    <polygon points="90,80 83,89 78,81" fill="#2563EB"/>
    <path d="M 80,85 A 38,38 0 0,1 30,84" fill="none" stroke="#2563EB" stroke-width="2.2"/>
    <polygon points="31,90 22,83 31,78" fill="#2563EB"/>
    <path d="M 26,80 A 38,38 0 0,1 27,30" fill="none" stroke="#2563EB" stroke-width="2.2"/>
    <polygon points="21,31 28,22 33,31" fill="#2563EB"/>
  </svg>
  <div style="font-size:11.5px;font-weight:bold;color:#0F172A;line-height:1.2;z-index:2;">
    Feedback<br>Loops
  </div>
</div>
`.trim();

  return `
<mxfile host="app.diagrams.net" modified="2026-08-08T17:52:00.000Z" agent="PromptCanvas" version="21.0.0" type="device">
  <diagram id="ai_coe_operating_model" name="AI Center of Excellence (CoE) Operating Model">
    <mxGraphModel dx="1600" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="950" background="#FFFFFF">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- TOP TITLE BANNER -->
        <mxCell id="main_title_box" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="16" width="860" height="54" as="geometry"/>
        </mxCell>
        <mxCell id="hdr_box_left" value="&lt;b style=&quot;font-size:18px;color:#0F172A;font-family:sans-serif;&quot;&gt;Enterprise AI Center of Excellence (CoE) Operating Model (P5-GOV-M-01)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:12px;color:#475569;font-weight:600;&quot;&gt;Governance &amp;amp; Strategy • Continuous Prompt Curation • GAMP 5 Compliance &amp;amp; Value Capture&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="45" y="18" width="830" height="50" as="geometry"/>
        </mxCell>

        <mxCell id="hdr_box_right" value="&lt;div style=&quot;font-size:12px;color:#000000;font-family:sans-serif;&quot;&gt;&lt;b&gt;'To-Be'&lt;/b&gt; Operating State • &lt;b&gt;Cadence:&lt;/b&gt; Quarterly • &lt;b&gt;Classification:&lt;/b&gt; Confidential&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;strokeColor=#CBD5E1;strokeWidth=1;fillColor=#F8FAFC;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="910" y="16" width="650" height="54" as="geometry"/>
        </mxCell>


        <!-- ==================== LEFT INPUT ZONE (x = 30 .. 250) ==================== -->
        <mxCell id="node_exec_strategy" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;👔 Exec &amp;amp; Strategy&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Enterprise AI Vision &amp;amp; Priorities&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#1E293B;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="30" y="95" width="220" height="65" as="geometry"/>
        </mxCell>

        <mxCell id="node_business_plan" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;📑 Business AI Strategy&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#475569;&quot;&gt;PowerPoint &amp;amp; Confluence Roadmaps&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#1E293B;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="30" y="180" width="220" height="65" as="geometry"/>
        </mxCell>

        <mxCell id="node_cloud_plans" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;☁️ Cloud Infrastructure Plans&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#475569;&quot;&gt;GCP Vertex AI Resource Quotas&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#1E293B;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="30" y="265" width="220" height="65" as="geometry"/>
        </mxCell>

        <mxCell id="node_gamp5" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#1D4ED8;&quot;&gt;🛡️ GAMP 5 Compliance Framework&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Category 5 Validated Operational Guardrails&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#3B82F6;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="30" y="350" width="220" height="75" as="geometry"/>
        </mxCell>


        <!-- ==================== CENTER CONTAINER: AI CENTER OF EXCELLENCE (x = 280 .. 1060) ==================== -->
        <mxCell id="cont_ai_coe" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#1E293B;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="280" y="95" width="780" height="475" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_ai_coe_header" value="&lt;b style=&quot;font-size:12px;color:#FFFFFF;&quot;&gt;🏛️ AI CENTER OF EXCELLENCE (CoE) OPERATIONAL CORE&lt;/b&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="280" y="95" width="780" height="34" as="geometry"/>
        </mxCell>

        <!-- TIER 1: GOVERNANCE & STRATEGY -->
        <mxCell id="box_gov_strat" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#1E40AF;&quot;&gt;1. Governance &amp;amp; Strategy (Adoption Modeling)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#334155;line-height:1.3;padding-top:2px;&quot;&gt;• Enterprise AI Policy &amp;amp; Model Tiering Guidelines&lt;br&gt;• Business Unit Value Quantification &amp;amp; Adoption Scoring&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=top;padding=4;" vertex="1" parent="1">
          <mxGeometry x="295" y="140" width="750" height="75" as="geometry"/>
        </mxCell>

        <!-- TIER 2: PROCESS & OPERATIONS (3 Circular Loops) -->
        <mxCell id="box_proc_ops" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="295" y="225" width="750" height="180" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_proc_ops" value="&lt;b style=&quot;font-size:11px;color:#1E40AF;&quot;&gt;2. Continuous Process &amp;amp; Operations Engine (Jira &amp;amp; Confluence)&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="310" y="230" width="500" height="20" as="geometry"/>
        </mxCell>

        <!-- Tangential Circular Loops -->
        <mxCell id="loop_user_onboarding" value="&lt;div style=&quot;position:relative;width:110px;height:110px;display:flex;align-items:center;justify-content:center;text-align:center;&quot;&gt;
  &lt;svg width=&quot;110&quot; height=&quot;110&quot; viewBox=&quot;0 0 110 110&quot; style=&quot;position:absolute;top:0;left:0;&quot;&gt;
    &lt;path d=&quot;M 28,30 A 38,38 0 0,1 80,26&quot; fill=&quot;none&quot; stroke=&quot;#2563EB&quot; stroke-width=&quot;2.2&quot;/&gt;
    &lt;polygon points=&quot;80,20 89,27 80,33&quot; fill=&quot;#2563EB&quot;/&gt;
    &lt;path d=&quot;M 85,30 A 38,38 0 0,1 83,80&quot; fill=&quot;none&quot; stroke=&quot;#2563EB&quot; stroke-width=&quot;2.2&quot;/&gt;
    &lt;polygon points=&quot;90,80 83,89 78,81&quot; fill=&quot;#2563EB&quot;/&gt;
    &lt;path d=&quot;M 80,85 A 38,38 0 0,1 30,84&quot; fill=&quot;none&quot; stroke=&quot;#2563EB&quot; stroke-width=&quot;2.2&quot;/&gt;
    &lt;polygon points=&quot;31,90 22,83 31,78&quot; fill=&quot;#2563EB&quot;/&gt;
    &lt;path d=&quot;M 26,80 A 38,38 0 0,1 27,30&quot; fill=&quot;none&quot; stroke=&quot;#2563EB&quot; stroke-width=&quot;2.2&quot;/&gt;
    &lt;polygon points=&quot;21,31 28,22 33,31&quot; fill=&quot;#2563EB&quot;/&gt;
  &lt;/svg&gt;
  &lt;div style=&quot;font-size:11.5px;font-weight:bold;color:#0F172A;line-height:1.2;z-index:2;&quot;&gt;
    User&lt;br&gt;Onboarding
  &lt;/div&gt;
&lt;/div&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="340" y="260" width="130" height="130" as="geometry"/>
        </mxCell>
        <mxCell id="loop_prompt_curation" value="&lt;div style=&quot;position:relative;width:110px;height:110px;display:flex;align-items:center;justify-content:center;text-align:center;&quot;&gt;
  &lt;svg width=&quot;110&quot; height=&quot;110&quot; viewBox=&quot;0 0 110 110&quot; style=&quot;position:absolute;top:0;left:0;&quot;&gt;
    &lt;path d=&quot;M 28,30 A 38,38 0 0,1 80,26&quot; fill=&quot;none&quot; stroke=&quot;#2563EB&quot; stroke-width=&quot;2.2&quot;/&gt;
    &lt;polygon points=&quot;80,20 89,27 80,33&quot; fill=&quot;#2563EB&quot;/&gt;
    &lt;path d=&quot;M 85,30 A 38,38 0 0,1 83,80&quot; fill=&quot;none&quot; stroke=&quot;#2563EB&quot; stroke-width=&quot;2.2&quot;/&gt;
    &lt;polygon points=&quot;90,80 83,89 78,81&quot; fill=&quot;#2563EB&quot;/&gt;
    &lt;path d=&quot;M 80,85 A 38,38 0 0,1 30,84&quot; fill=&quot;none&quot; stroke=&quot;#2563EB&quot; stroke-width=&quot;2.2&quot;/&gt;
    &lt;polygon points=&quot;31,90 22,83 31,78&quot; fill=&quot;#2563EB&quot;/&gt;
    &lt;path d=&quot;M 26,80 A 38,38 0 0,1 27,30&quot; fill=&quot;none&quot; stroke=&quot;#2563EB&quot; stroke-width=&quot;2.2&quot;/&gt;
    &lt;polygon points=&quot;21,31 28,22 33,31&quot; fill=&quot;#2563EB&quot;/&gt;
  &lt;/svg&gt;
  &lt;div style=&quot;font-size:11.5px;font-weight:bold;color:#0F172A;line-height:1.2;z-index:2;&quot;&gt;
    Prompt&lt;br&gt;Curation
  &lt;/div&gt;
&lt;/div&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="605" y="260" width="130" height="130" as="geometry"/>
        </mxCell>
        <mxCell id="loop_feedback" value="&lt;div style=&quot;position:relative;width:110px;height:110px;display:flex;align-items:center;justify-content:center;text-align:center;&quot;&gt;
  &lt;svg width=&quot;110&quot; height=&quot;110&quot; viewBox=&quot;0 0 110 110&quot; style=&quot;position:absolute;top:0;left:0;&quot;&gt;
    &lt;path d=&quot;M 28,30 A 38,38 0 0,1 80,26&quot; fill=&quot;none&quot; stroke=&quot;#2563EB&quot; stroke-width=&quot;2.2&quot;/&gt;
    &lt;polygon points=&quot;80,20 89,27 80,33&quot; fill=&quot;#2563EB&quot;/&gt;
    &lt;path d=&quot;M 85,30 A 38,38 0 0,1 83,80&quot; fill=&quot;none&quot; stroke=&quot;#2563EB&quot; stroke-width=&quot;2.2&quot;/&gt;
    &lt;polygon points=&quot;90,80 83,89 78,81&quot; fill=&quot;#2563EB&quot;/&gt;
    &lt;path d=&quot;M 80,85 A 38,38 0 0,1 30,84&quot; fill=&quot;none&quot; stroke=&quot;#2563EB&quot; stroke-width=&quot;2.2&quot;/&gt;
    &lt;polygon points=&quot;31,90 22,83 31,78&quot; fill=&quot;#2563EB&quot;/&gt;
    &lt;path d=&quot;M 26,80 A 38,38 0 0,1 27,30&quot; fill=&quot;none&quot; stroke=&quot;#2563EB&quot; stroke-width=&quot;2.2&quot;/&gt;
    &lt;polygon points=&quot;21,31 28,22 33,31&quot; fill=&quot;#2563EB&quot;/&gt;
  &lt;/svg&gt;
  &lt;div style=&quot;font-size:11.5px;font-weight:bold;color:#0F172A;line-height:1.2;z-index:2;&quot;&gt;
    Feedback&lt;br&gt;Loops
  &lt;/div&gt;
&lt;/div&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="870" y="260" width="130" height="130" as="geometry"/>
        </mxCell>

        <!-- TIER 3: ANALYTICS & MEASUREMENT -->
        <mxCell id="box_analytics" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#166534;&quot;&gt;3. Analytics &amp;amp; Measurement (Looker BI Telemetry)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#334155;line-height:1.3;padding-top:2px;&quot;&gt;• Performance Metrics: Token Latency (p99), Cost per Inference &amp;amp; Error Rates&lt;br&gt;• Utilization Insights: BU Adoption Heatmaps, CSAT Scores &amp;amp; Prompt Drift Alerts&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.2;align=left;verticalAlign=top;padding=4;" vertex="1" parent="1">
          <mxGeometry x="295" y="415" width="750" height="75" as="geometry"/>
        </mxCell>


        <!-- ==================== RIGHT: UNIFIED SYSTEM & OUTPUT ARTIFACTS (x = 1090 .. 1560) ==================== -->
        <mxCell id="cont_system_view" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1090" y="95" width="470" height="475" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_system_view_title" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;📊 ENTERPRISE INTEGRATION &amp;amp; SCALING&lt;/b&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#94A3B8;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1090" y="95" width="470" height="34" as="geometry"/>
        </mxCell>

        <!-- AI CoE Operating Model Green Pill -->
        <mxCell id="node_coe_operating_model" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11.5px;font-weight:bold;color:#166534;&quot;&gt;✨ Certified AI CoE Operating Model&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#334155;line-height:1.3;padding-top:2px;&quot;&gt;Standardized enterprise architecture blueprint for scaling Generative AI&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=1.5;align=left;verticalAlign=top;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1105" y="140" width="440" height="75" as="geometry"/>
        </mxCell>

        <!-- Enterprise Platform Context View -->
        <mxCell id="node_wbs_platform" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;🏢 Enterprise Platform Architecture Context&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#334155;line-height:1.3;padding-top:2px;&quot;&gt;• Core ERP, CRM &amp;amp; Knowledge Base Connectors&lt;br&gt;• Centralized API Gateway &amp;amp; Identity Access Mesh&lt;br&gt;• Data Lakehouse Integration (BigQuery / Dataproc)&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1105" y="225" width="440" height="95" as="geometry"/>
        </mxCell>

        <!-- PSO Operations Support -->
        <mxCell id="node_pso_support" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;🛠️ Professional Services &amp;amp; Operations (PSO)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#475569;padding-top:2px;&quot;&gt;Enterprise implementation rollout, hypercare &amp;amp; SLA support&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#1E293B;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1105" y="330" width="440" height="65" as="geometry"/>
        </mxCell>


        <!-- ==================== BOTTOM GOVERNANCE & FUNDING LOOP (x = 30 .. 1560) ==================== -->
        <mxCell id="node_execs_leads" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;👥 Executive &amp;amp; Business Unit Leadership Board&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#334155;line-height:1.3;padding-top:2px;&quot;&gt;• Reviews quarterly Looker ROI dashboards &amp;amp; adoption velocity&lt;br&gt;• Approves strategy updates &amp;amp; expands CoE scope across new divisions&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#1E293B;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="30" y="590" width="500" height="125" as="geometry"/>
        </mxCell>

        <mxCell id="node_funding" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td align=&quot;center&quot;&gt;&lt;div style=&quot;width:34px;height:34px;background:#16A34A;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#FFFFFF;font-size:18px;font-weight:bold;margin:0 auto;&quot;&gt;$&lt;/div&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11.5px;font-weight:bold;color:#166534;padding-top:4px;&quot;&gt;Sequential Funding Tranches&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;Unlocks budget upon verified adoption milestones&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=1.5;align=center;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="560" y="590" width="500" height="125" as="geometry"/>
        </mxCell>

        <!-- Bottom Right Legend -->
        <mxCell id="box_legend" value="&lt;table style=&quot;width:100%;font-size:8.5px;color:#334155;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td colspan=&quot;2&quot; style=&quot;font-size:10px;font-weight:bold;color:#0F172A;border-bottom:1px solid #CBD5E1;padding-bottom:2px;&quot;&gt;Legend &amp;amp; Symbol Standards&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;padding-top:4px;&quot;&gt;🔵 &lt;b&gt;Core Governance &amp;amp; Tooling&lt;/b&gt;&lt;/td&gt;&lt;td style=&quot;padding-top:4px;&quot;&gt;🟢 &lt;b&gt;Funding &amp;amp; Financial Data&lt;/b&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;🛡️ &lt;b&gt;GAMP 5 Validated Gate&lt;/b&gt;&lt;/td&gt;&lt;td&gt;⚡ &lt;b&gt;Operational Telemetry Feed&lt;/b&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1090" y="590" width="470" height="125" as="geometry"/>
        </mxCell>


        <!-- Connectors between Columns -->
        <mxCell id="e_inp_coe" value="" style="edgeStyle=none;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="node_exec_strategy" target="cont_ai_coe"/>
        <mxCell id="e_coe_sys" value="" style="edgeStyle=none;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="cont_ai_coe" target="cont_system_view"/>


        <!-- ==================== FOOTER LEGEND ==================== -->
        <mxCell id="legend_box" value="&lt;table style=&quot;width:100%;font-size:9.5px;color:#334155;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td&gt;&lt;b style=&quot;color:#0F172A;&quot;&gt;AI Center of Excellence Framework:&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🔵 &lt;b&gt;Strategy &amp;amp; Ideation&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🔷 &lt;b&gt;Operational Prompt Loops&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🟢 &lt;b&gt;Verified GAMP 5 Model&lt;/b&gt;&lt;/td&gt;&lt;td&gt;📈 &lt;b&gt;Looker BI Insights&lt;/b&gt;&lt;/td&gt;&lt;td&gt;✨ &lt;b style=&quot;color:#1D4ED8;&quot;&gt;Operational Excellence Standard&lt;/b&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="30" y="735" width="1530" height="38" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>

  <diagram id="ai_coe_playbook" name="Page 2: Executive Playbook &amp; Governance Profile">
    <mxGraphModel dx="1600" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="950" background="#FFFFFF">
      <root>
        <mxCell id="0_p2" />
        <mxCell id="1_p2" parent="0_p2" />

        <!-- PAGE 2 HEADER BANNER -->
        <mxCell id="p2_hdr" value="&lt;b style=&quot;font-size:18px;color:#0F172A;&quot;&gt;EXECUTIVE AI CENTER OF EXCELLENCE (CoE) PLAYBOOK — GOVERNANCE PROFILE&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1_p2">
          <mxGeometry x="35" y="16" width="1530" height="30" as="geometry" />
        </mxCell>
        <mxCell id="p2_line" value="" style="line;strokeWidth=2;strokeColor=#0F172A;" vertex="1" parent="1_p2">
          <mxGeometry x="35" y="48" width="1530" height="4" as="geometry" />
        </mxCell>

        <!-- KPI SUMMARY BAR (4 Cards across 1530px) -->
        <mxCell id="kpi_1" value="&lt;font color=&quot;#0F172A&quot; style=&quot;font-size:11px;&quot;&gt;ARCHITECTURE ID&lt;/font&gt;&lt;br/&gt;&lt;font color=&quot;#0F172A&quot; style=&quot;font-size:14px;&quot;&gt;&lt;b&gt;AI CoE Operating Model&lt;/b&gt;&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=1.5;strokeColor=#0F172A;fillColor=#F8FAFC;align=center;" vertex="1" parent="1_p2">
          <mxGeometry x="35" y="65" width="360" height="60" as="geometry" />
        </mxCell>

        <mxCell id="kpi_2" value="&lt;font color=&quot;#0F172A&quot; style=&quot;font-size:11px;&quot;&gt;GAMP 5 COMPLIANCE LEVEL&lt;/font&gt;&lt;br/&gt;&lt;font color=&quot;#16A34A&quot; style=&quot;font-size:16px;&quot;&gt;&lt;b&gt;★★★★★ &amp;nbsp;Validated Category 5&lt;/b&gt;&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=2;strokeColor=#16A34A;fillColor=#F0FDF4;align=center;" vertex="1" parent="1_p2">
          <mxGeometry x="425" y="65" width="360" height="60" as="geometry" />
        </mxCell>

        <mxCell id="kpi_3" value="&lt;font color=&quot;#0F172A&quot; style=&quot;font-size:11px;&quot;&gt;AI COE OPERATING MATURITY&lt;/font&gt;&lt;br/&gt;&lt;font color=&quot;#0284C7&quot; style=&quot;font-size:14px;&quot;&gt;&lt;b&gt;Level 4 Managed &amp;amp; Continuous&lt;/b&gt;&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=1.5;strokeColor=#0284C7;fillColor=#F0F9FF;align=center;" vertex="1" parent="1_p2">
          <mxGeometry x="815" y="65" width="360" height="60" as="geometry" />
        </mxCell>

        <mxCell id="kpi_4" value="&lt;font color=&quot;#0F172A&quot; style=&quot;font-size:11px;&quot;&gt;BUSINESS VALUE TRACKING&lt;/font&gt;&lt;br/&gt;&lt;font color=&quot;#2563EB&quot; style=&quot;font-size:14px;&quot;&gt;&lt;b&gt;Real-Time Looker Telemetry&lt;/b&gt;&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=1.5;strokeColor=#2563EB;fillColor=#EFF6FF;align=center;" vertex="1" parent="1_p2">
          <mxGeometry x="1205" y="65" width="360" height="60" as="geometry" />
        </mxCell>

        <!-- PERSONA MATRIX ROW (2 Cards across 1530px) -->
        <mxCell id="per_card_1" value="&lt;table style=&quot;width:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;background-color:#0F172A;padding:8px 12px;&quot;&gt;&lt;font color=&quot;#FFFFFF&quot; style=&quot;font-size:13px;&quot;&gt;&lt;b&gt;👤 PRIMARY CREATOR PERSONA&lt;/b&gt;&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;padding:12px;background-color:#FFFFFF;&quot;&gt;&lt;font color=&quot;#0F172A&quot; style=&quot;font-size:12px;&quot;&gt;&lt;b&gt;Head of AI Center of Excellence &amp;amp; Chief AI Architect&lt;/b&gt;&lt;br/&gt;&lt;br/&gt;Responsible for enterprise prompt curation standards, developer onboarding academies, GAMP 5 compliance frameworks, adoption modeling, and multi-agent governance.&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;strokeWidth=2;strokeColor=#0F172A;verticalAlign=top;align=left;overflow=hidden;" vertex="1" parent="1_p2">
          <mxGeometry x="35" y="145" width="750" height="125" as="geometry" />
        </mxCell>

        <mxCell id="per_card_2" value="&lt;table style=&quot;width:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;background-color:#0284C7;padding:8px 12px;&quot;&gt;&lt;font color=&quot;#FFFFFF&quot; style=&quot;font-size:13px;&quot;&gt;&lt;b&gt;👔 PRIMARY CONSUMER PERSONA&lt;/b&gt;&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;padding:12px;background-color:#F0F9FF;&quot;&gt;&lt;font color=&quot;#0F172A&quot; style=&quot;font-size:12px;&quot;&gt;&lt;b&gt;Chief Digital Officer, VP of Engineering &amp;amp; BU GMs&lt;/b&gt;&lt;br/&gt;&lt;br/&gt;Reviews quarterly adoption progress, certifies GAMP 5 compliance sign-offs, tracks AI utilization insights, and approves sequential funding tranches for scaling AI use-cases.&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;strokeWidth=2;strokeColor=#0284C7;verticalAlign=top;align=left;overflow=hidden;" vertex="1" parent="1_p2">
          <mxGeometry x="815" y="145" width="750" height="125" as="geometry" />
        </mxCell>

        <!-- DUAL LENS COMPARISON (2 Cards across 1530px) -->
        <mxCell id="lens_google" value="&lt;table style=&quot;width:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;background-color:#1D4ED8;padding:10px 14px;&quot;&gt;&lt;font color=&quot;#FFFFFF&quot; style=&quot;font-size:14px;&quot;&gt;&lt;b&gt;🚀 BIG TECH &amp;amp; ENGINEERING PERSPECTIVE (Google / Meta / OpenAI)&lt;/b&gt;&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;padding:16px;background-color:#FFFFFF;&quot;&gt;&lt;font color=&quot;#0F172A&quot; style=&quot;font-size:12px;line-height:1.6;&quot;&gt;&lt;b style=&quot;color:#1D4ED8;&quot;&gt;1. Developer Velocity &amp;amp; Automated Sandboxes:&lt;/b&gt; Self-service developer onboarding with instant access to certified LLM gateways, playground environments, and automated evaluations.&lt;br/&gt;&lt;br/&gt;&lt;b style=&quot;color:#1D4ED8;&quot;&gt;2. Continuous GitOps Prompt Curation:&lt;/b&gt; Version-controlled prompt pipelines with automated regression testing, token efficiency benchmarks, and safety guardrails.&lt;br/&gt;&lt;br/&gt;&lt;b style=&quot;color:#1D4ED8;&quot;&gt;3. Real-Time Telemetry &amp;amp; User Feedback Loops:&lt;/b&gt; Live CSAT ratings and latency telemetry triaged directly into Jira for continuous prompt and model fine-tuning.&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;strokeWidth=2;strokeColor=#1D4ED8;verticalAlign=top;align=left;overflow=hidden;" vertex="1" parent="1_p2">
          <mxGeometry x="35" y="290" width="750" height="440" as="geometry" />
        </mxCell>

        <mxCell id="lens_mckinsey" value="&lt;table style=&quot;width:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;background-color:#0F172A;padding:10px 14px;&quot;&gt;&lt;font color=&quot;#FFFFFF&quot; style=&quot;font-size:14px;&quot;&gt;&lt;b&gt;💼 TIER-1 STRATEGY CONSULTING PERSPECTIVE (McKinsey / BCG / Bain)&lt;/b&gt;&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;padding:16px;background-color:#F8FAFC;&quot;&gt;&lt;font color=&quot;#0F172A&quot; style=&quot;font-size:12px;line-height:1.6;&quot;&gt;&lt;b style=&quot;color:#0F172A;&quot;&gt;1. Enterprise Adoption Modeling &amp;amp; Value Capture:&lt;/b&gt; Rigorous quantification of AI adoption velocity across business units, unlocking sequential funding gates based on verified ROI.&lt;br/&gt;&lt;br/&gt;&lt;b style=&quot;color:#0F172A;&quot;&gt;2. GAMP 5 &amp;amp; Regulated Industry Assurance:&lt;/b&gt; Validated operational framework ensuring 21 CFR Part 11 compliance, algorithmic audit trails, and risk-managed AI rollout in enterprise environments.&lt;br/&gt;&lt;br/&gt;&lt;b style=&quot;color:#0F172A;&quot;&gt;3. Operating Model Scalability (PSO Integration):&lt;/b&gt; Seamless hand-off from CoE ideation to Professional Services &amp;amp; Operations (PSO) for enterprise-wide industrialization.&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;strokeWidth=2;strokeColor=#0F172A;verticalAlign=top;align=left;overflow=hidden;" vertex="1" parent="1_p2">
          <mxGeometry x="815" y="290" width="750" height="440" as="geometry" />
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`.trim();
}
