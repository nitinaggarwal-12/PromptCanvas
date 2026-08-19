export function buildEvalSafetyXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="agentic_eval_safety_platform" name="Agentic AI Evaluation, Safety &amp; Optimization Platform (P4-GOV-L-04)">
    <mxGraphModel dx="1600" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="950" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- ==================== TOP TITLE BANNER ==================== -->
        <mxCell id="main_title_box" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="16" width="840" height="54" as="geometry"/>
        </mxCell>
        <mxCell id="main_title" value="&lt;b style=&quot;font-size:18px;color:#0F172A;&quot;&gt;Agentic AI Evaluation, Safety &amp;amp; Optimization Platform (P4-GOV-L-04)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:12px;color:#475569;font-weight:600;&quot;&gt;Continuous Safety Guardrails • Automated LLM-as-a-Judge • Closed-Loop Model Optimization&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="45" y="18" width="810" height="50" as="geometry"/>
        </mxCell>


        <!-- ==================== COLUMN 1: END USER & GE APP CONTEXT (EXTERNAL) ==================== -->
        <!-- x = 30 .. 270 (width = 240) -->
        <mxCell id="col1_bg" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="85" width="240" height="520" as="geometry"/>
        </mxCell>
        <mxCell id="col1_hdr" value="&lt;b style=&quot;font-size:11px;color:#1E3A8A;&quot;&gt;💻 USER &amp;amp; CLIENT CONTEXT&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="35" y="90" width="230" height="25" as="geometry"/>
        </mxCell>

        <!-- Multi-modal Input Card -->
        <mxCell id="card_multimodal_in" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:18px;&quot;&gt;🎙️ ⌨️ 📷&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9.5px;font-weight:bold;color:#0F172A;padding-top:2px;&quot;&gt;Multi-modal User Input&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;Voice, Text &amp;amp; Telemetry Data&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="45" y="125" width="210" height="75" as="geometry"/>
        </mxCell>

        <!-- User Client Device Mockup -->
        <mxCell id="card_ge_app_user" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td colspan=&quot;2&quot; style=&quot;font-size:10px;font-weight:bold;color:#1E40AF;border-bottom:1px solid #BFDBFE;padding-bottom:2px;&quot;&gt;🌐 Industrial &amp;amp; Field Client&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:24px;width:36px;text-align:center;&quot;&gt;👩‍💼&lt;/td&gt;&lt;td style=&quot;font-size:8.5px;color:#334155;line-height:1.3;&quot;&gt;• Field Ops Assistant&lt;br&gt;• Real-Time Edge Analytics&lt;br&gt;• Session Token Dispatch&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#60A5FA;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="45" y="215" width="210" height="110" as="geometry"/>
        </mxCell>

        <!-- User Context & WAF Ingress -->
        <mxCell id="card_user_context" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9.5px;font-weight:bold;color:#0F172A;&quot;&gt;🛡️ Cloud Armor &amp;amp; LB Ingress&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#64748B;&quot;&gt;DDoS Shield • TLS 1.3 Termination&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="45" y="340" width="210" height="60" as="geometry"/>
        </mxCell>

        <!-- Device Context Engine -->
        <mxCell id="card_col1_bottom_telemetry" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:16px;&quot;&gt;📶 🛡️&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;font-weight:bold;color:#0F172A;&quot;&gt;Device Context Engine&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;&quot;&gt;Location, Role &amp;amp; Ephemeral JWT&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="45" y="420" width="210" height="65" as="geometry"/>
        </mxCell>


        <!-- ==================== COLUMN 2: INGESTION & REGISTRATION (REGISTRY) ==================== -->
        <!-- x = 290 .. 540 (width = 250) -->
        <mxCell id="col2_bg" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#86EFAC;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="290" y="85" width="250" height="520" as="geometry"/>
        </mxCell>
        <mxCell id="col2_hdr" value="&lt;b style=&quot;font-size:11px;color:#166534;&quot;&gt;🗄️ AGENT REGISTRY &amp;amp; SCHEMAS&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="295" y="90" width="240" height="25" as="geometry"/>
        </mxCell>

        <!-- Data Sources & Datasets -->
        <mxCell id="box_data_sources" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;font-weight:bold;color:#166534;&quot;&gt;📁 Configs &amp;amp; Benchmark Datasets&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;line-height:1.3;&quot;&gt;• GCS Agent Specs &amp;amp; Manifests&lt;br&gt;• Golden Benchmark Eval Datasets&lt;br&gt;• External Schema Governance&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.2;align=left;verticalAlign=top;padding=4;" vertex="1" parent="1">
          <mxGeometry x="305" y="125" width="220" height="85" as="geometry"/>
        </mxCell>

        <!-- Agent Registry Core -->
        <mxCell id="box_agent_registry" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#166534;border-bottom:1px solid #BBF7D0;padding-bottom:2px;&quot;&gt;🗄️ Enterprise Agent Registry&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#334155;line-height:1.3;padding-top:4px;&quot;&gt;• Agent Semantic Definitions&lt;br&gt;• Declared Safety Policies &amp;amp; Rules&lt;br&gt;• Grounding Knowledge Graph Links&lt;br&gt;• Version Control &amp;amp; Rollback Manifest&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#22C55E;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="305" y="225" width="220" height="130" as="geometry"/>
        </mxCell>

        <!-- Closed Loop Update Target -->
        <mxCell id="card_reg_update" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;font-weight:bold;color:#166534;&quot;&gt;🔄 Version Sync &amp;amp; Dynamic Update&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;Automated Prompt / Tool Calibration&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#86EFAC;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="305" y="375" width="220" height="65" as="geometry"/>
        </mxCell>


        <!-- ==================== COLUMN 3: GEMINI AGENT PLATFORM (VERTEX AI) ==================== -->
        <!-- x = 560 .. 920 (width = 360) -->
        <mxCell id="col3_bg" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#FFFBEB;strokeColor=#FDE68A;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="560" y="85" width="360" height="520" as="geometry"/>
        </mxCell>
        <mxCell id="col3_hdr" value="&lt;b style=&quot;font-size:11px;color:#92400E;&quot;&gt;✨ VERTEX AI AGENT PLATFORM&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="565" y="90" width="350" height="25" as="geometry"/>
        </mxCell>

        <!-- Orchestration Agent -->
        <mxCell id="card_orchestrator" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;🎛️ Multi-Agent Orchestrator&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#475569;padding-top:2px;&quot;&gt;Planning, Reasoning &amp;amp; Plan Execution Engine&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#F59E0B;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="575" y="125" width="330" height="65" as="geometry"/>
        </mxCell>

        <!-- Intelligence Core -->
        <mxCell id="box_intel_core" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td colspan=&quot;3&quot; style=&quot;font-size:10px;font-weight:bold;color:#92400E;border-bottom:1px solid #FEF08A;padding-bottom:2px;&quot;&gt;✨ Intelligence Core (Gemini Platform)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;padding:4px;text-align:center;&quot;&gt;&lt;b style=&quot;font-size:8.5px;color:#0F172A;&quot;&gt;Gemini 2.5 Pro&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7px;color:#475569;&quot;&gt;Complex Reasoning&lt;/span&gt;&lt;/td&gt;&lt;td style=&quot;padding:4px;text-align:center;&quot;&gt;&lt;b style=&quot;font-size:8.5px;color:#0F172A;&quot;&gt;Gemini 2.5 Flash&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7px;color:#475569;&quot;&gt;Fast Execution&lt;/span&gt;&lt;/td&gt;&lt;td style=&quot;padding:4px;text-align:center;&quot;&gt;&lt;b style=&quot;font-size:8.5px;color:#0F172A;&quot;&gt;Model Garden&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7px;color:#475569;&quot;&gt;OSS Models&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#F59E0B;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="575" y="200" width="330" height="90" as="geometry"/>
        </mxCell>

        <!-- Grounding & Tools -->
        <mxCell id="card_vertex_search" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;font-weight:bold;color:#0F172A;&quot;&gt;🔍 Vertex AI Search &amp;amp; Function Calling&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#2563EB;&quot;&gt;Internal Docs Retrieval • External Tools &amp;amp; APIs&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#60A5FA;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="575" y="300" width="330" height="55" as="geometry"/>
        </mxCell>

        <!-- Execution Logs & Traces -->
        <mxCell id="card_exec_logs" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;font-weight:bold;color:#1E40AF;&quot;&gt;📋 Execution Traces &amp;amp; Interaction Logs&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#334155;&quot;&gt;Cloud Logging • OpenTelemetry Span Collectors&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#3B82F6;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="575" y="365" width="330" height="55" as="geometry"/>
        </mxCell>


        <!-- ==================== COLUMN 4: EVALUATION, SAFETY & GUARDRAILS ==================== -->
        <!-- x = 940 .. 1240 (width = 300) -->
        <mxCell id="col4_bg" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="940" y="85" width="300" height="520" as="geometry"/>
        </mxCell>
        <mxCell id="col4_hdr" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;🛡️ EVALUATION &amp;amp; GUARDRAILS&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="945" y="90" width="290" height="25" as="geometry"/>
        </mxCell>

        <!-- AI-Based Eval Box -->
        <mxCell id="box_ai_eval" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;&quot;&gt;📊 Vertex AI Model Evaluation&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;line-height:1.3;&quot;&gt;• Automated LLM-as-a-Judge Scoring&lt;br&gt;• Coherence, Groundedness &amp;amp; Relevance&lt;br&gt;• Hallucination Rate Profiling&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;padding=4;" vertex="1" parent="1">
          <mxGeometry x="955" y="125" width="270" height="85" as="geometry"/>
        </mxCell>

        <!-- Human-in-the-Loop Eval -->
        <mxCell id="box_hitl_eval" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;&quot;&gt;👤 Human-in-the-Loop (HITL) UI&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;line-height:1.3;&quot;&gt;• Expert Annotation &amp;amp; Review Queue&lt;br&gt;• Ground-Truth Benchmark Calibration&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="955" y="220" width="270" height="70" as="geometry"/>
        </mxCell>

        <!-- Safety Guardrails Checklist -->
        <mxCell id="box_safety_guardrails" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td colspan=&quot;2&quot; style=&quot;font-size:10.5px;font-weight:bold;color:#1E3A8A;border-bottom:1px solid #BFDBFE;padding-bottom:2px;&quot;&gt;🛡️ Real-Time Safety Filters&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#0F172A;&quot;&gt;☑️ Toxicity &amp;amp; Hate Filter&lt;br&gt;☑️ PII Redaction Engine&lt;/td&gt;&lt;td style=&quot;font-size:8px;color:#0F172A;&quot;&gt;☑️ Bias &amp;amp; Fairness Check&lt;br&gt;☑️ Policy Guardrails&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="955" y="300" width="270" height="75" as="geometry"/>
        </mxCell>

        <!-- Evaluation Results to BigQuery -->
        <mxCell id="badge_eval_res_bq" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9.5px;font-weight:bold;color:#0F172A;&quot;&gt;🔍 BigQuery Eval Warehouse&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#2563EB;&quot;&gt;Structured Test Runs &amp;amp; Regression History&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="955" y="385" width="270" height="55" as="geometry"/>
        </mxCell>


        <!-- ==================== COLUMN 5: ANALYSIS & OPTIMIZATION (x = 1260 .. 1560) ==================== -->
        <!-- x = 1260 .. 1560 (width = 300) -->
        <mxCell id="col5_bg" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#FFF1F2;strokeColor=#FECDD3;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1260" y="85" width="300" height="520" as="geometry"/>
        </mxCell>
        <mxCell id="col5_hdr" value="&lt;b style=&quot;font-size:11px;color:#9F1239;&quot;&gt;📈 OPTIMIZATION &amp;amp; REPORTING&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1265" y="90" width="290" height="25" as="geometry"/>
        </mxCell>

        <!-- Looker Dashboards -->
        <mxCell id="box_analysis_rep" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#9F1239;&quot;&gt;📊 Looker Executive Dashboards&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#334155;line-height:1.3;&quot;&gt;• Agent Comparison &amp;amp; Leaderboards&lt;br&gt;• Safety SLA Compliance Reports&lt;br&gt;• Latency &amp;amp; Cost vs Quality Trade-offs&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#FDA4AF;strokeWidth=1.2;align=left;verticalAlign=top;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1275" y="125" width="270" height="85" as="geometry"/>
        </mxCell>

        <!-- ML Optimization Engine -->
        <mxCell id="card_ml_opt" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;&quot;&gt;🔄 ML-Driven Optimization Engine&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;line-height:1.3;&quot;&gt;• Automated Few-Shot Prompt Tuning&lt;br&gt;• Direct Preference Optimization (DPO)&lt;br&gt;• Continuous Reinforcement Tuning&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#BE123C;strokeWidth=1.2;align=left;verticalAlign=top;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1275" y="220" width="270" height="90" as="geometry"/>
        </mxCell>

        <!-- Closed Loop Return Callout -->
        <mxCell id="card_closed_loop_badge" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9.5px;font-weight:bold;color:#BE123C;&quot;&gt;🔄 Continuous Feedback Loop&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;Auto-Registers Improved Prompts to Registry&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFF1F2;strokeColor=#FECDD3;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1275" y="325" width="270" height="60" as="geometry"/>
        </mxCell>


        <!-- Connectors between Columns -->
        <mxCell id="e_col1_col2" value="" style="edgeStyle=none;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="col1_bg" target="col2_bg"/>
        <mxCell id="e_col2_col3" value="" style="edgeStyle=none;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="col2_bg" target="col3_bg"/>
        <mxCell id="e_col3_col4" value="" style="edgeStyle=none;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="col3_bg" target="col4_bg"/>
        <mxCell id="e_col4_col5" value="" style="edgeStyle=none;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="col4_bg" target="col5_bg"/>


        <!-- ==================== BOTTOM HORIZONTAL BAR: PLATFORM GOVERNANCE & MONITORING ==================== -->
        <mxCell id="bar_gov_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="620" width="1530" height="95" as="geometry"/>
        </mxCell>

        <!-- 7 Governance Cards -->
        <mxCell id="gov_card_iam" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:16px;color:#2563EB;&quot;&gt;👤&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;font-weight:bold;color:#0F172A;&quot;&gt;Cloud IAM&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;color:#475569;&quot;&gt;Fine-Grained RBAC&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#BFDBFE;strokeWidth=1;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="45" y="635" width="195" height="65" as="geometry"/>
        </mxCell>

        <mxCell id="gov_card_secret" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:16px;color:#2563EB;&quot;&gt;🔐&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;font-weight:bold;color:#0F172A;&quot;&gt;Secret Manager&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;color:#475569;&quot;&gt;API Keys &amp;amp; CMEK&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#BFDBFE;strokeWidth=1;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="255" y="635" width="195" height="65" as="geometry"/>
        </mxCell>

        <mxCell id="gov_card_armor" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:16px;color:#2563EB;&quot;&gt;🛡️&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;font-weight:bold;color:#0F172A;&quot;&gt;Cloud Armor WAF&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;color:#475569;&quot;&gt;Prompt Injection Guard&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#BFDBFE;strokeWidth=1;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="465" y="635" width="195" height="65" as="geometry"/>
        </mxCell>

        <mxCell id="gov_card_audit" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:16px;color:#2563EB;&quot;&gt;📜&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;font-weight:bold;color:#0F172A;&quot;&gt;Cloud Audit Logs&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;color:#475569;&quot;&gt;Immutable Audit Trail&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#BFDBFE;strokeWidth=1;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="675" y="635" width="195" height="65" as="geometry"/>
        </mxCell>

        <mxCell id="gov_card_mon" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:16px;color:#2563EB;&quot;&gt;📈&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;font-weight:bold;color:#0F172A;&quot;&gt;Model Monitoring&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;color:#475569;&quot;&gt;Data Drift &amp;amp; Outliers&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#BFDBFE;strokeWidth=1;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="885" y="635" width="195" height="65" as="geometry"/>
        </mxCell>

        <mxCell id="gov_card_scc" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:16px;color:#2563EB;&quot;&gt;🛡️&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;font-weight:bold;color:#0F172A;&quot;&gt;Security Command Center&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;color:#475569;&quot;&gt;Continuous Posture&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#BFDBFE;strokeWidth=1;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="1095" y="635" width="215" height="65" as="geometry"/>
        </mxCell>

        <mxCell id="gov_card_assured" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:16px;color:#2563EB;&quot;&gt;🛡️&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;font-weight:bold;color:#0F172A;&quot;&gt;Assured Workloads&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;color:#475569;&quot;&gt;EU / US Sovereignty&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#BFDBFE;strokeWidth=1;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="1325" y="635" width="220" height="65" as="geometry"/>
        </mxCell>


        <!-- ==================== FOOTER LEGEND ==================== -->
        <mxCell id="legend_box" value="&lt;table style=&quot;width:100%;font-size:9.5px;color:#334155;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td&gt;&lt;b style=&quot;color:#0F172A;&quot;&gt;Eval Safety Fabric:&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🔵 &lt;b&gt;External User Traffic&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🟢 &lt;b&gt;Agent Registry &amp;amp; Manifests&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🟡 &lt;b&gt;Vertex AI Agent Execution&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🔴 &lt;b&gt;Continuous Closed-Loop Optimization&lt;/b&gt;&lt;/td&gt;&lt;td&gt;✨ &lt;b style=&quot;color:#1D4ED8;&quot;&gt;Powered by Google Cloud AI&lt;/b&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="30" y="870" width="1540" height="38" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}

export function buildAgenticEvalSafetyXml(): string {
  return buildEvalSafetyXml();
}
