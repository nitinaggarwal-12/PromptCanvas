export function buildEnterpriseAgentRuntimeXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="enterprise_agent_runtime_platform" name="Google Cloud Enterprise Agent Runtime Platform - End-to-End Architecture (P4-AI-P-04)">
    <mxGraphModel dx="1600" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="950" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- ==================== TOP TITLE BANNER ==================== -->
        <mxCell id="main_title_box" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="16" width="800" height="54" as="geometry"/>
        </mxCell>
        <mxCell id="main_title" value="&lt;b style=&quot;font-size:18px;color:#0F172A;&quot;&gt;Enterprise Agent Runtime Platform Architecture (P4-AI-P-04)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:12px;color:#475569;font-weight:600;&quot;&gt;Google Cloud Vertex AI Agent Builder • Cloud Run Orchestration • Apigee Enterprise Mesh&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="45" y="18" width="770" height="50" as="geometry"/>
        </mxCell>


        <!-- ==================== COLUMN 1: END USER & GE APP (EXTERNAL) ==================== -->
        <!-- x = 30 .. 280 (width = 250, height = 500) -->
        <mxCell id="col1_bg" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#60A5FA;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="85" width="250" height="490" as="geometry"/>
        </mxCell>
        <mxCell id="col1_hdr" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;💻 END USER &amp;amp; ENTERPRISE APP&lt;/b&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="30" y="85" width="250" height="34" as="geometry"/>
        </mxCell>

        <!-- Multi-modal Inputs Card -->
        <mxCell id="card_multimodal_in" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:18px;&quot;&gt;🎙️ ⌨️ 📷&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9.5px;font-weight:bold;color:#0F172A;padding-top:2px;&quot;&gt;Multi-modal User Input&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;Voice, Text &amp;amp; Image Uploads&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="45" y="130" width="220" height="75" as="geometry"/>
        </mxCell>

        <!-- User Persona + Portal Mockup Card -->
        <mxCell id="card_laptop_mockup" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td colspan=&quot;2&quot; style=&quot;font-size:10px;font-weight:bold;color:#1E40AF;border-bottom:1px solid #BFDBFE;padding-bottom:2px;&quot;&gt;🌐 Enterprise Web Portal&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:24px;width:36px;text-align:center;&quot;&gt;👩‍💼&lt;/td&gt;&lt;td style=&quot;font-size:8.5px;color:#334155;line-height:1.3;&quot;&gt;• Conversational Copilot UI&lt;br&gt;• Real-Time Asset Diagnostics&lt;br&gt;• Mobile &amp;amp; Field Ops Client&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="45" y="215" width="220" height="110" as="geometry"/>
        </mxCell>

        <mxCell id="card_action_req" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9.5px;font-weight:bold;color:#0F172A;&quot;&gt;⚡ Action &amp;amp; Intent Requests&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#64748B;&quot;&gt;Context-Aware Session JWT&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="45" y="335" width="220" height="55" as="geometry"/>
        </mxCell>


        <!-- ==================== INGRESS TRANSIT (x = 295 .. 385) ==================== -->
        <mxCell id="card_cloud_cdn" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:18px;color:#2563EB;&quot;&gt;💠&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;font-weight:bold;color:#0F172A;&quot;&gt;Cloud CDN&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="295" y="160" width="90" height="50" as="geometry"/>
        </mxCell>

        <mxCell id="card_clb" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:18px;color:#2563EB;&quot;&gt;⚖️&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;font-weight:bold;color:#0F172A;&quot;&gt;Cloud Global&lt;br&gt;Load Balancer&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.2;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="295" y="240" width="90" height="60" as="geometry"/>
        </mxCell>

        <!-- Flow arrows -->
        <mxCell id="wire_ge_to_clb" value="" style="edgeStyle=none;html=1;strokeWidth=1.5;strokeColor=#2563EB;endArrow=classic;" edge="1" parent="1" source="col1_bg" target="card_clb"/>


        <!-- ==================== COLUMN 2: GE APP CORE SERVICES (VPC / CLOUD RUN) ==================== -->
        <!-- x = 400 .. 720 (width = 320, height = 690) -->
        <mxCell id="col2_bg" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#86EFAC;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="400" y="85" width="320" height="690" as="geometry"/>
        </mxCell>
        <mxCell id="col2_hdr" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;⚙️ CORE SERVICES (VPC / CLOUD RUN)&lt;/b&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#16A34A;strokeColor=#15803D;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="400" y="85" width="320" height="34" as="geometry"/>
        </mxCell>

        <!-- 2.1 App Frontend Microservice -->
        <mxCell id="card_ge_frontend" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;🌐 App Frontend Gateway&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#475569;padding-top:2px;&quot;&gt;Cloud Run Container • Fastify / React SSR&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="415" y="130" width="290" height="65" as="geometry"/>
        </mxCell>

        <!-- 2.2 Enterprise Agent Runtime Microservice -->
        <mxCell id="card_agent_runtime_svc" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11.5px;font-weight:bold;color:#166534;&quot;&gt;🤖 Enterprise Agent Runtime Engine&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#334155;line-height:1.3;padding-top:2px;&quot;&gt;• Orchestrates Multi-Turn Dialog Loops&lt;br&gt;• Session Memory &amp;amp; Checkpointing Engine&lt;br&gt;• Asynchronous Event Dispatcher&lt;br&gt;&lt;b style=&quot;color:#16A34A;&quot;&gt;Autoscaling Cloud Run / GKE Enterprise&lt;/b&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="415" y="215" width="290" height="130" as="geometry"/>
        </mxCell>

        <!-- 2.3 Cloud Pub/Sub -->
        <mxCell id="card_pubsub_event" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;font-weight:bold;color:#0F172A;&quot;&gt;❄️ Cloud Pub/Sub Event Bus&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;Decoupled Async Workflows &amp;amp; Telemetry&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="415" y="360" width="290" height="55" as="geometry"/>
        </mxCell>

        <!-- 2.4 Structured Datastore -->
        <mxCell id="card_structured_ds" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;font-weight:bold;color:#0F172A;&quot;&gt;🗄️ Structured Store (Cloud SQL / Bigtable)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;Agent Session State, Checkpoints &amp;amp; Audits&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="415" y="430" width="290" height="55" as="geometry"/>
        </mxCell>

        <!-- Connectors inside Core Services -->
        <mxCell id="e_fe_runtime" value="" style="edgeStyle=none;html=1;strokeWidth=1.5;strokeColor=#16A34A;endArrow=classic;" edge="1" parent="1" source="card_ge_frontend" target="card_agent_runtime_svc"/>
        <mxCell id="e_runtime_pubsub" value="" style="edgeStyle=none;html=1;strokeWidth=1.2;strokeColor=#2563EB;endArrow=classic;" edge="1" parent="1" source="card_agent_runtime_svc" target="card_pubsub_event"/>
        <mxCell id="e_runtime_ds" value="" style="edgeStyle=none;html=1;strokeWidth=1.2;strokeColor=#64748B;endArrow=classic;" edge="1" parent="1" source="card_pubsub_event" target="card_structured_ds"/>


        <!-- ==================== COLUMN 3: GEMINI AGENT PLATFORM (VERTEX AI AGENT BUILDER) ==================== -->
        <!-- x = 740 .. 1140 (width = 400, height = 690) -->
        <mxCell id="col3_bg" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#FEF9C3;strokeColor=#FDE047;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="740" y="85" width="400" height="690" as="geometry"/>
        </mxCell>
        <mxCell id="col3_hdr" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;✨ VERTEX AI AGENT BUILDER PLATFORM&lt;/b&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#EAB308;strokeColor=#CA8A04;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="740" y="85" width="400" height="34" as="geometry"/>
        </mxCell>

        <!-- 3.1 Orchestration Agent -->
        <mxCell id="card_orch_agent" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;🧠 Multi-Agent Orchestrator (Reasoning &amp;amp; Planning)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#475569;padding-top:2px;&quot;&gt;Autonomous Plan Decomposition • ReAct Dynamic Routing&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#FDE047;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="755" y="130" width="370" height="60" as="geometry"/>
        </mxCell>

        <!-- 3.2 Intelligence Core -->
        <mxCell id="card_intel_core" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td colspan=&quot;3&quot; style=&quot;font-size:10.5px;font-weight:bold;color:#1E40AF;border-bottom:1px solid #FEF08A;padding-bottom:2px;&quot;&gt;✨ Intelligence Core (Foundation Models)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;padding:4px;text-align:center;&quot;&gt;&lt;b style=&quot;font-size:8.5px;color:#0F172A;&quot;&gt;Gemini 2.5 Pro&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7px;color:#475569;&quot;&gt;Deep Reasoning&lt;/span&gt;&lt;/td&gt;&lt;td style=&quot;padding:4px;text-align:center;&quot;&gt;&lt;b style=&quot;font-size:8.5px;color:#0F172A;&quot;&gt;Gemini 2.5 Flash&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7px;color:#475569;&quot;&gt;Sub-100ms Routing&lt;/span&gt;&lt;/td&gt;&lt;td style=&quot;padding:4px;text-align:center;&quot;&gt;&lt;b style=&quot;font-size:8.5px;color:#0F172A;&quot;&gt;Vertex Model Garden&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7px;color:#475569;&quot;&gt;Claude, Llama, OSS&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#FDE047;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="755" y="200" width="370" height="90" as="geometry"/>
        </mxCell>

        <!-- 3.3 Agent Tools Box -->
        <!-- Tool 1: Vertex AI Search -->
        <mxCell id="card_tool_vertex_search" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;&quot;&gt;🔍 Tool 1: Vertex AI Grounding &amp;amp; Search&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#2563EB;&quot;&gt;Vector Search over Technical Wikis &amp;amp; Service Manuals&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="755" y="300" width="370" height="60" as="geometry"/>
        </mxCell>

        <!-- Tool 2: Extensions & Function Calling -->
        <mxCell id="card_tool_extensions" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;&quot;&gt;🔧 Tool 2: OpenAPI Extensions &amp;amp; Function Calling&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Dynamic Tool Invocation across Apigee Gateway Mesh&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="755" y="370" width="370" height="60" as="geometry"/>
        </mxCell>

        <!-- Tool 3: BigQuery Analytics Sink -->
        <mxCell id="card_tool_analytics_sink" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;&quot;&gt;📊 Tool 3: Data Analytics Sink (BigQuery SQL)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Text-to-SQL Execution over Enterprise Data Lakehouse&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="755" y="440" width="370" height="60" as="geometry"/>
        </mxCell>


        <!-- ==================== COLUMN 4: DOWNSTREAM ENTERPRISE SYSTEMS (x = 1160 .. 1560) ==================== -->
        <!-- x = 1160 .. 1560 (width = 400, height = 690) -->
        <mxCell id="col4_bg" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#FEF2F2;strokeColor=#FCA5A5;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1160" y="85" width="400" height="690" as="geometry"/>
        </mxCell>
        <mxCell id="col4_hdr" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;🗄️ ENTERPRISE DATA &amp;amp; DOWNSTREAM MESH&lt;/b&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#EF4444;strokeColor=#DC2626;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1160" y="85" width="400" height="34" as="geometry"/>
        </mxCell>

        <!-- 4.1 Asset Database (Cloud SQL / Bigtable) -->
        <mxCell id="card_downstream_sql_bigtable" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;🛢️ Enterprise Asset DB (Cloud SQL / Bigtable)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#475569;padding-top:2px;&quot;&gt;• Real-time Machine Telemetry &amp;amp; Vibration Sensor Feeds&lt;br&gt;• Master Asset Catalog &amp;amp; Maintenance History&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#FCA5A5;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1175" y="130" width="370" height="75" as="geometry"/>
        </mxCell>

        <!-- 4.2 BigQuery Enterprise Data Lake -->
        <mxCell id="card_downstream_bq" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;📊 BigQuery Enterprise Analytics Lakehouse&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#475569;padding-top:2px;&quot;&gt;Petabyte-scale Historical Diagnostics &amp;amp; Predictive Models&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#FCA5A5;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1175" y="215" width="370" height="65" as="geometry"/>
        </mxCell>

        <!-- 4.3 Apigee API Management Gateway -->
        <mxCell id="card_apigee" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#EA580C;&quot;&gt;♾️ Apigee Enterprise API Gateway Mesh&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#475569;padding-top:2px;&quot;&gt;Rate Limiting • mTLS • OAuth2 • WAF Cloud Armor Policy&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFF7ED;strokeColor=#FDBA74;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1175" y="290" width="370" height="65" as="geometry"/>
        </mxCell>

        <!-- 4 Downstream Target APIs -->
        <mxCell id="card_api_maint" value="&lt;b style=&quot;font-size:9px;color:#0F172A;&quot;&gt;🔧 Automated Work Order &amp;amp; Maintenance API&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=left;verticalAlign=middle;padding=4;spacingLeft=8;" vertex="1" parent="1">
          <mxGeometry x="1175" y="365" width="370" height="38" as="geometry"/>
        </mxCell>
        <mxCell id="card_api_order_parts" value="&lt;b style=&quot;font-size:9px;color:#0F172A;&quot;&gt;📦 ERP Spare Parts Ordering API (SAP / Oracle)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=left;verticalAlign=middle;padding=4;spacingLeft=8;" vertex="1" parent="1">
          <mxGeometry x="1175" y="410" width="370" height="38" as="geometry"/>
        </mxCell>
        <mxCell id="card_api_ge_internal" value="&lt;b style=&quot;font-size:9px;color:#0F172A;&quot;&gt;🏭 SCADA &amp;amp; Industrial IoT Equipment Control System&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=left;verticalAlign=middle;padding=4;spacingLeft=8;" vertex="1" parent="1">
          <mxGeometry x="1175" y="455" width="370" height="38" as="geometry"/>
        </mxCell>
        <mxCell id="card_api_public" value="&lt;b style=&quot;font-size:9px;color:#0F172A;&quot;&gt;🌐 External Weather, Grid &amp;amp; Regulatory Compliance APIs&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=left;verticalAlign=middle;padding=4;spacingLeft=8;" vertex="1" parent="1">
          <mxGeometry x="1175" y="500" width="370" height="38" as="geometry"/>
        </mxCell>


        <!-- ==================== BOTTOM LEFT: PLATFORM GOVERNANCE (x = 30 .. 385) ==================== -->
        <mxCell id="gov_frame" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td colspan=&quot;2&quot; style=&quot;font-size:10.5px;font-weight:bold;color:#1E40AF;border-bottom:1px solid #BFDBFE;padding-bottom:2px;&quot;&gt;🛡️ Platform Governance &amp;amp; SRE&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#334155;line-height:1.3;&quot;&gt;• Cloud IAM RBAC&lt;br&gt;• Cloud KMS Secrets&lt;/td&gt;&lt;td style=&quot;font-size:8px;color:#334155;line-height:1.3;&quot;&gt;• Cloud Audit Logs&lt;br&gt;• Model Monitoring&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="30" y="590" width="355" height="85" as="geometry"/>
        </mxCell>

        <!-- Connectors between Columns -->
        <mxCell id="e_core_to_agent" value="" style="edgeStyle=none;html=1;strokeWidth=2;strokeColor=#2563EB;endArrow=classic;" edge="1" parent="1" source="col2_bg" target="col3_bg"/>
        <mxCell id="e_agent_to_downstream" value="" style="edgeStyle=none;html=1;strokeWidth=2;strokeColor=#2563EB;endArrow=classic;" edge="1" parent="1" source="col3_bg" target="col4_bg"/>


        <!-- ==================== FOOTER LEGEND ==================== -->
        <mxCell id="legend_box" value="&lt;table style=&quot;width:100%;font-size:9.5px;color:#334155;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td&gt;&lt;b style=&quot;color:#0F172A;&quot;&gt;Agent Runtime Fabric:&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🔵 &lt;b&gt;External User Ingress&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🟢 &lt;b&gt;VPC Cloud Run Microservices&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🟡 &lt;b&gt;Vertex AI Agent Builder Engine&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🔴 &lt;b&gt;Apigee &amp;amp; Enterprise Mesh&lt;/b&gt;&lt;/td&gt;&lt;td&gt;✨ &lt;b style=&quot;color:#1D4ED8;&quot;&gt;Powered by Google Cloud AI&lt;/b&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="30" y="870" width="1540" height="38" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
