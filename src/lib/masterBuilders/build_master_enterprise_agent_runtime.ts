export function buildEnterpriseAgentRuntimeXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="enterprise_agent_runtime_platform" name="Google Cloud Enterprise Agent Runtime Platform - End-to-End Architecture (P4-AI-P-04)">
    <mxGraphModel dx="1400" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1360" pageHeight="680" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- ==================== TOP TITLE BANNER & HEADER ==================== -->
        <mxCell id="top_cloud_logo" value="&lt;span style=&quot;font-size:24px;&quot;&gt;☁️&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="6" width="35" height="35" as="geometry"/>
        </mxCell>
        <mxCell id="main_title" value="&lt;b style=&quot;font-size:18px;color:#0F172A;letter-spacing:-0.2px;&quot;&gt;Google Cloud Enterprise Agent Runtime Platform - End-to-End Architecture&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="65" y="6" width="1050" height="24" as="geometry"/>
        </mxCell>
        <mxCell id="main_subtitle" value="&lt;span style=&quot;font-size:11px;color:#475569;font-weight:600;&quot;&gt;For Hypothetical App: &amp;quot;GE App&amp;quot; Integration&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="65" y="30" width="1050" height="18" as="geometry"/>
        </mxCell>

        <!-- Top Right GCP Brand Logo -->
        <mxCell id="top_gcp_brand" value="&lt;span style=&quot;font-size:26px;&quot;&gt;☁️&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1260" y="6" width="40" height="35" as="geometry"/>
        </mxCell>

        <!-- Top Center Conceptual Overview Banner -->
        <mxCell id="top_concept_banner" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;font-weight:bold;color:#475569;&quot;&gt;Conceptual Overview&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9.5px;font-weight:bold;color:#0F172A;&quot;&gt;🌐 GE &amp;nbsp; Enterprise Agent Runtime: Agent Runtime Platform&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="410" y="44" width="370" height="32" as="geometry"/>
        </mxCell>


        <!-- ==================== COLUMN 1: END USER & GE APP (EXTERNAL) ==================== -->
        <!-- x = 25 .. 250 (width = 225, height = 300) -->
        <mxCell id="col1_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#60A5FA;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="25" y="85" width="225" height="300" as="geometry"/>
        </mxCell>
        <mxCell id="col1_hdr" value="&lt;b style=&quot;font-size:9.5px;color:#FFFFFF;letter-spacing:0.3px;&quot;&gt;END USER &amp; GE APP&lt;br&gt;&lt;span style=&quot;font-size:8px;font-weight:normal;&quot;&gt;(EXTERNAL)&lt;/span&gt;&lt;/b&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#3B82F6;strokeColor=#2563EB;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="85" width="225" height="30" as="geometry"/>
        </mxCell>

        <!-- Top Input Context Boxes -->
        <mxCell id="card_multimodal_in" value="&lt;b style=&quot;font-size:6.5px;color:#0F172A;&quot;&gt;Multi-modal Input&lt;br&gt;&lt;span style=&quot;font-size:5.5px;color:#475569;font-weight:normal;&quot;&gt;(Voice, Text, Images)&lt;/span&gt;&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="35" y="122" width="105" height="34" as="geometry"/>
        </mxCell>

        <mxCell id="card_user_context" value="&lt;b style=&quot;font-size:6.5px;color:#0F172A;&quot;&gt;User Context&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="150" y="120" width="90" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="card_action_req" value="&lt;b style=&quot;font-size:6.5px;color:#0F172A;&quot;&gt;Action Requests&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="150" y="144" width="90" height="24" as="geometry"/>
        </mxCell>

        <!-- Center Visual Box: User Persona + Laptop Mockup -->
        <mxCell id="card_user_avatar" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:26px;&quot;&gt;👩‍💼&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:18px;&quot;&gt;📱&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="35" y="165" width="45" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="card_laptop_mockup" value="&lt;table style=&quot;width:100%;border-collapse:collapse;font-size:6.5px;background:#FFFFFF;border:1px solid #CBD5E1;border-radius:4px;&quot;&gt;&lt;tr style=&quot;background:#F8FAFC;&quot;&gt;&lt;td style=&quot;padding:2px 4px;font-size:7.5px;font-weight:bold;color:#0284C7;&quot;&gt;🌐 GE App&lt;/td&gt;&lt;td style=&quot;text-align:right;padding:2px 4px;font-size:6px;color:#64748B;&quot;&gt;Enterprise Portal&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td colspan=&quot;2&quot; style=&quot;padding:4px;&quot;&gt;&lt;div style=&quot;background:#EFF6FF;border:1px solid #BFDBFE;padding:2px;border-radius:2px;color:#1E40AF;font-size:6px;&quot;&gt;💬 Conversational Copilot&lt;/div&gt;&lt;div style=&quot;margin-top:2px;background:#F1F5F9;padding:2px;border-radius:2px;color:#475569;font-size:5.5px;&quot;&gt;📊 Operational Telemetry&lt;/div&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="85" y="170" width="155" height="85" as="geometry"/>
        </mxCell>

        <mxCell id="lbl_ge_app_main" value="&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;GE App&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="260" width="195" height="18" as="geometry"/>
        </mxCell>


        <!-- ==================== INGRESS / PUBLIC INTERNET TRANSIT ==================== -->
        <!-- x = 255 .. 330 -->
        <mxCell id="card_cloud_cdn" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:16px;color:#2563EB;&quot;&gt;💠&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:6.5px;font-weight:bold;color:#0F172A;&quot;&gt;Cloud CDN&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="255" y="115" width="70" height="38" as="geometry"/>
        </mxCell>

        <mxCell id="card_public_net" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;font-weight:bold;color:#475569;&quot;&gt;Public&lt;br&gt;Internet&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="shape=cloud;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="255" y="170" width="70" height="48" as="geometry"/>
        </mxCell>

        <mxCell id="card_clb" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:16px;color:#2563EB;&quot;&gt;⚖️&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:6.5px;font-weight:bold;color:#0F172A;&quot;&gt;Cloud Load&lt;br&gt;Balancing&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="255" y="235" width="70" height="42" as="geometry"/>
        </mxCell>

        <!-- Badge 2 -->
        <mxCell id="badge_step_2" value="&lt;b style=&quot;color:#FFFFFF;font-size:7px;&quot;&gt;2&lt;/b&gt;" style="ellipse;whiteSpace=wrap;html=1;fillColor=#22C55E;strokeColor=none;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="315" y="195" width="14" height="14" as="geometry"/>
        </mxCell>


        <!-- ==================== COLUMN 2: GE APP CORE SERVICES (GCP - VPC CLOUD RUN/GKE) ==================== -->
        <!-- x = 335 .. 585 (width = 250, height = 510) -->
        <mxCell id="col2_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#86EFAC;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="335" y="85" width="250" height="510" as="geometry"/>
        </mxCell>
        <mxCell id="col2_hdr" value="&lt;b style=&quot;font-size:9.5px;color:#FFFFFF;letter-spacing:0.3px;&quot;&gt;GE APP CORE SERVICES&lt;br&gt;&lt;span style=&quot;font-size:8px;font-weight:normal;&quot;&gt;(GCP - VPC CLOUD RUN/GKE)&lt;/span&gt;&lt;/b&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#16A34A;strokeColor=#15803D;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="335" y="85" width="250" height="30" as="geometry"/>
        </mxCell>

        <!-- Inner VPC Box -->
        <mxCell id="col2_vpc_box" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.2;dashed=1;" vertex="1" parent="1">
          <mxGeometry x="345" y="125" width="230" height="455" as="geometry"/>
        </mxCell>
        <mxCell id="col2_vpc_lbl" value="&lt;b style=&quot;font-size:7.5px;color:#16A34A;&quot;&gt;💠 Virtual Private Cloud (VPC)&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="350" y="128" width="200" height="15" as="geometry"/>
        </mxCell>

        <!-- 2.1 GE App Frontend Microservice -->
        <mxCell id="card_ge_frontend" value="&lt;table style=&quot;width:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:24px;font-size:18px;color:#2563EB;&quot;&gt;⏩&lt;/td&gt;&lt;td&gt;&lt;b style=&quot;font-size:7.5px;color:#0F172A;&quot;&gt;GE App Frontend&lt;br&gt;Microservice&lt;/b&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td colspan=&quot;2&quot; style=&quot;font-size:5.5px;color:#475569;padding-top:2px;&quot;&gt;Cloud Run / GKE&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1;align=left;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="355" y="150" width="145" height="52" as="geometry"/>
        </mxCell>

        <!-- Arrow: Performs initial validation -->
        <mxCell id="edge_fe_to_runtime" value="&lt;span style=&quot;font-size:5.5px;color:#475569;&quot;&gt;Performs initial&lt;br&gt;validation&lt;/span&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1;strokeColor=#64748B;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="427" y="202" as="sourcePoint"/><mxPoint x="427" y="235" as="targetPoint"/></mxGeometry>
        </mxCell>

        <!-- 2.2 Enterprise Agent Runtime Microservice -->
        <mxCell id="card_agent_runtime_svc" value="&lt;table style=&quot;width:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:24px;font-size:18px;color:#2563EB;&quot;&gt;⏩&lt;/td&gt;&lt;td&gt;&lt;b style=&quot;font-size:7.5px;color:#0F172A;&quot;&gt;Enterprise Agent&lt;br&gt;Runtime Microservice&lt;/b&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td colspan=&quot;2&quot; style=&quot;font-size:5.5px;color:#475569;padding-top:2px;&quot;&gt;• Orchestrates conversation,&lt;br&gt;• manages agent state,&lt;br&gt;• triggers events&lt;br&gt;&lt;span style=&quot;color:#16A34A;font-weight:bold;&quot;&gt;Cloud Run / GKE&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=1.2;align=left;verticalAlign=top;padding=2;" vertex="1" parent="1">
          <mxGeometry x="355" y="235" width="145" height="85" as="geometry"/>
        </mxCell>

        <!-- 2.3 Cloud Pub/Sub -->
        <mxCell id="card_pubsub_event" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:18px;color:#2563EB;&quot;&gt;❄️&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:6.5px;font-weight:bold;color:#0F172A;&quot;&gt;Cloud&lt;br&gt;Pub/Sub&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1;align=center;verticalAlign=middle;padding=1;" vertex="1" parent="1">
          <mxGeometry x="510" y="245" width="55" height="65" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_pubsub_desc" value="&lt;span style=&quot;font-size:5.5px;color:#475569;&quot;&gt;Agent triggers for eventing&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="500" y="222" width="75" height="20" as="geometry"/>
        </mxCell>

        <!-- Edge: Runtime -> PubSub -->
        <mxCell id="edge_runtime_pubsub" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1;strokeColor=#2563EB;endArrow=block;endFill=1;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="500" y="275" as="sourcePoint"/><mxPoint x="510" y="275" as="targetPoint"/></mxGeometry>
        </mxCell>

        <!-- 2.4 Structured Datastore -->
        <mxCell id="card_structured_ds" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:20px;color:#2563EB;&quot;&gt;🗄️&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;font-weight:bold;color:#0F172A;&quot;&gt;Structured&lt;br&gt;datastore&lt;br&gt;&lt;span style=&quot;font-size:5.5px;color:#475569;font-weight:normal;&quot;&gt;(Cloud SQL/Bigtable)&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="380" y="445" width="160" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_ds_orch" value="&lt;span style=&quot;font-size:5.5px;color:#475569;&quot;&gt;Orchestrates Conversation&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="390" y="420" width="140" height="20" as="geometry"/>
        </mxCell>

        <!-- Edge: Runtime -> Datastore -->
        <mxCell id="edge_runtime_ds" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1;strokeColor=#64748B;endArrow=classic;endFill=1;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="460" y="320" as="sourcePoint"/><mxPoint x="460" y="445" as="targetPoint"/></mxGeometry>
        </mxCell>


        <!-- ==================== COLUMN 3: GEMINI AGENT PLATFORM (GCP - VERTEX AI AGENT BUILDER) ==================== -->
        <!-- x = 600 .. 850 (width = 250, height = 510) -->
        <mxCell id="col3_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#FEF9C3;strokeColor=#FDE047;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="600" y="85" width="250" height="510" as="geometry"/>
        </mxCell>
        <mxCell id="col3_hdr" value="&lt;b style=&quot;font-size:9.5px;color:#FFFFFF;letter-spacing:0.3px;&quot;&gt;GEMINI AGENT PLATFORM&lt;br&gt;&lt;span style=&quot;font-size:8px;font-weight:normal;&quot;&gt;(GCP - VERTEX AI AGENT BUILDER)&lt;/span&gt;&lt;/b&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#EAB308;strokeColor=#CA8A04;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="600" y="85" width="250" height="30" as="geometry"/>
        </mxCell>

        <!-- 3.1 Orchestration Agent -->
        <mxCell id="card_orch_agent" value="&lt;table style=&quot;width:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:24px;font-size:20px;color:#2563EB;&quot;&gt;📊&lt;/td&gt;&lt;td&gt;&lt;b style=&quot;font-size:8px;color:#0F172A;&quot;&gt;Orchestration Agent&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:6px;color:#475569;&quot;&gt;Performs planning and reasoning&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#FDE047;strokeWidth=1.2;align=left;verticalAlign=middle;padding=3;" vertex="1" parent="1">
          <mxGeometry x="612" y="125" width="225" height="48" as="geometry"/>
        </mxCell>

        <!-- Prompt Management Wire -->
        <mxCell id="edge_orch_intel" value="&lt;span style=&quot;font-size:5.5px;color:#475569;font-weight:bold;&quot;&gt;Uses Prompt Management&lt;/span&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1;strokeColor=#64748B;endArrow=classic;startArrow=classic;labelBackgroundColor=#FFFFFF;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="724" y="173" as="sourcePoint"/><mxPoint x="724" y="195" as="targetPoint"/></mxGeometry>
        </mxCell>

        <!-- 3.2 Intelligence Core -->
        <mxCell id="card_intel_core" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#FDE047;strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="612" y="195" width="225" height="85" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_intel_title" value="&lt;b style=&quot;font-size:8px;color:#0F172A;&quot;&gt;Intelligence Core&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="615" y="198" width="220" height="14" as="geometry"/>
        </mxCell>
        <mxCell id="intel_model_row" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:14px;color:#2563EB;&quot;&gt;✨&lt;/td&gt;&lt;td style=&quot;font-size:14px;color:#4F46E5;&quot;&gt;✨&lt;/td&gt;&lt;td style=&quot;font-size:14px;color:#059669;&quot;&gt;📦&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:6px;font-weight:bold;color:#0F172A;&quot;&gt;Gemini Pro&lt;/td&gt;&lt;td style=&quot;font-size:6px;font-weight:bold;color:#0F172A;&quot;&gt;Gemini Ultra&lt;/td&gt;&lt;td style=&quot;font-size:6px;font-weight:bold;color:#0F172A;&quot;&gt;Model Garden&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="615" y="215" width="220" height="42" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_powered_gemini" value="&lt;span style=&quot;font-size:5.5px;color:#2563EB;font-weight:bold;&quot;&gt;Powered by Gemini&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="615" y="260" width="220" height="15" as="geometry"/>
        </mxCell>

        <!-- 3.3 Agent Tools Box -->
        <mxCell id="card_agent_tools_box" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#FDE047;strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="612" y="295" width="225" height="285" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_agent_tools_title" value="&lt;b style=&quot;font-size:8.5px;color:#0F172A;&quot;&gt;Agent Tools&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="615" y="298" width="220" height="15" as="geometry"/>
        </mxCell>

        <!-- Tool 1: Vertex AI Search -->
        <mxCell id="card_tool_vertex_search" value="&lt;table style=&quot;width:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:22px;font-size:18px;color:#2563EB;&quot;&gt;🔍&lt;/td&gt;&lt;td&gt;&lt;b style=&quot;font-size:7.5px;color:#0F172A;&quot;&gt;Vertex AI Search&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:5.5px;color:#2563EB;font-weight:bold;&quot;&gt;Vector Search over GE&lt;br&gt;Technical Wikis, Documentation&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1;align=left;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="622" y="325" width="150" height="52" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_retrieve_tech_doc" value="&lt;span style=&quot;font-size:5.5px;color:#475569;&quot;&gt;Retrieve specific&lt;br&gt;technical documents&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="772" y="325" width="60" height="50" as="geometry"/>
        </mxCell>

        <!-- Tool 2: Extensions & Function Calling -->
        <mxCell id="card_tool_extensions" value="&lt;table style=&quot;width:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:22px;font-size:18px;color:#2563EB;&quot;&gt;🔧&lt;/td&gt;&lt;td&gt;&lt;b style=&quot;font-size:7.5px;color:#0F172A;&quot;&gt;Extensions &amp; function calling&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:5.5px;color:#475569;&quot;&gt;To make external API calls.&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=left;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="622" y="415" width="205" height="48" as="geometry"/>
        </mxCell>

        <!-- Tool 3: Data Analytics Sink -->
        <mxCell id="card_tool_analytics_sink" value="&lt;table style=&quot;width:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:22px;font-size:18px;color:#2563EB;&quot;&gt;📊&lt;/td&gt;&lt;td&gt;&lt;b style=&quot;font-size:7.5px;color:#0F172A;&quot;&gt;Data Analytics Sink &amp;rarr;&lt;/b&gt;&lt;span style=&quot;font-size:6px;color:#475569;&quot;&gt; To Cloud BigQuery&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=left;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="622" y="505" width="205" height="45" as="geometry"/>
        </mxCell>


        <!-- ==================== SECURITY & CONNECTIVITY PERIMETER ==================== -->
        <!-- x = 855 .. 915 -->
        <mxCell id="card_hybrid_conn" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:16px;color:#2563EB;&quot;&gt;🌐&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:5.5px;font-weight:bold;color:#0F172A;&quot;&gt;Hybrid&lt;br&gt;Connectivity&lt;br&gt;&lt;span style=&quot;font-size:4.5px;color:#475569;font-weight:normal;&quot;&gt;(Interconnect / VPN)&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="855" y="145" width="60" height="48" as="geometry"/>
        </mxCell>

        <mxCell id="card_vpc_sc_badge" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:16px;color:#2563EB;&quot;&gt;🛡️&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:5.5px;font-weight:bold;color:#0F172A;&quot;&gt;VPC Service&lt;br&gt;Controls&lt;br&gt;&lt;span style=&quot;font-size:4.5px;color:#475569;font-weight:normal;&quot;&gt;(VPC SC)&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="855" y="240" width="60" height="48" as="geometry"/>
        </mxCell>

        <!-- Badges 3, 4, 5 -->
        <mxCell id="badge_step_3" value="&lt;b style=&quot;color:#FFFFFF;font-size:7px;&quot;&gt;3&lt;/b&gt;" style="ellipse;whiteSpace=wrap;html=1;fillColor=#EAB308;strokeColor=none;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="588" y="235" width="14" height="14" as="geometry"/>
        </mxCell>

        <mxCell id="badge_step_4" value="&lt;b style=&quot;color:#FFFFFF;font-size:6px;&quot;&gt;4 Agent calls&lt;br&gt;internal API&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EAB308;strokeColor=none;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="855" y="360" width="60" height="22" as="geometry"/>
        </mxCell>

        <mxCell id="badge_step_5" value="&lt;b style=&quot;color:#FFFFFF;font-size:7px;&quot;&gt;5&lt;/b&gt;" style="ellipse;whiteSpace=wrap;html=1;fillColor=#22C55E;strokeColor=none;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="800" y="160" width="14" height="14" as="geometry"/>
        </mxCell>


        <!-- ==================== COLUMN 4: GE ENTERPRISE DATA & EXTERNAL SYSTEMS (DOWNSTREAM) ==================== -->
        <!-- x = 920 .. 1145 (width = 225, height = 510) -->
        <mxCell id="col4_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#FEF2F2;strokeColor=#FCA5A5;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="920" y="85" width="225" height="510" as="geometry"/>
        </mxCell>
        <mxCell id="col4_hdr" value="&lt;b style=&quot;font-size:9px;color:#FFFFFF;letter-spacing:0.2px;&quot;&gt;GE ENTERPRISE DATA &amp;amp;&lt;br&gt;EXTERNAL SYSTEMS&lt;br&gt;&lt;span style=&quot;font-size:7.5px;font-weight:normal;&quot;&gt;(DOWNSTREAM)&lt;/span&gt;&lt;/b&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#EF4444;strokeColor=#DC2626;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="920" y="85" width="225" height="35" as="geometry"/>
        </mxCell>

        <!-- 4.1 Cloud SQL / Bigtable -->
        <mxCell id="card_downstream_sql_bigtable" value="&lt;table style=&quot;width:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:24px;font-size:20px;color:#2563EB;&quot;&gt;🗄️&lt;/td&gt;&lt;td&gt;&lt;b style=&quot;font-size:8px;color:#0F172A;&quot;&gt;Cloud SQL/Bigtable&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:6px;color:#475569;&quot;&gt;• GE Asset DB&lt;br&gt;• Equipment Telemetry&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#FCA5A5;strokeWidth=1;align=left;verticalAlign=middle;padding=3;" vertex="1" parent="1">
          <mxGeometry x="930" y="130" width="205" height="60" as="geometry"/>
        </mxCell>

        <!-- 4.2 BigQuery Data Lake -->
        <mxCell id="card_downstream_bq" value="&lt;table style=&quot;width:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:24px;font-size:20px;color:#2563EB;&quot;&gt;📊&lt;/td&gt;&lt;td&gt;&lt;b style=&quot;font-size:8px;color:#0F172A;&quot;&gt;BigQuery Data Lake&lt;/b&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#FCA5A5;strokeWidth=1;align=left;verticalAlign=middle;padding=3;" vertex="1" parent="1">
          <mxGeometry x="930" y="215" width="205" height="48" as="geometry"/>
        </mxCell>

        <!-- 4.3 External & GE Internal APIs Box -->
        <mxCell id="card_downstream_apis_box" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#FCA5A5;strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="930" y="295" width="205" height="285" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_apis_box_title" value="&lt;b style=&quot;font-size:7.5px;color:#0F172A;&quot;&gt;External &amp; GE Internal APIs&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="935" y="298" width="195" height="15" as="geometry"/>
        </mxCell>

        <!-- Apigee Icon Box -->
        <mxCell id="card_apigee" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:22px;color:#EA580C;&quot;&gt;♾️&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:6.5px;font-weight:bold;color:#0F172A;&quot;&gt;Apigee API&lt;br&gt;Management&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFF7ED;strokeColor=#FDBA74;strokeWidth=1;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="938" y="345" width="68" height="75" as="geometry"/>
        </mxCell>

        <!-- API Action Items on Right -->
        <mxCell id="card_api_maint" value="&lt;b style=&quot;font-size:6.5px;color:#0F172A;&quot;&gt;Call Maintenance&lt;br&gt;API&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1015" y="325" width="112" height="32" as="geometry"/>
        </mxCell>

        <mxCell id="card_api_order_parts" value="&lt;b style=&quot;font-size:6.5px;color:#0F172A;&quot;&gt;Order Parts&lt;br&gt;API&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1015" y="365" width="112" height="32" as="geometry"/>
        </mxCell>

        <mxCell id="card_api_ge_internal" value="&lt;b style=&quot;font-size:6px;color:#0F172A;&quot;&gt;Access GE internal&lt;br&gt;equipment systems&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1015" y="405" width="112" height="36" as="geometry"/>
        </mxCell>

        <mxCell id="card_api_public" value="&lt;b style=&quot;font-size:6.5px;color:#0F172A;&quot;&gt;Public APIs&lt;br&gt;&lt;span style=&quot;font-size:5px;color:#475569;font-weight:normal;&quot;&gt;Weather, News,&lt;/span&gt;&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1015" y="450" width="112" height="35" as="geometry"/>
        </mxCell>


        <!-- ==================== BOTTOM LEFT: PLATFORM GOVERNANCE & MONITORING ==================== -->
        <!-- x = 20 .. 250, y = 405 .. 600 -->
        <mxCell id="gov_tab" value="&lt;b style=&quot;font-size:6.5px;color:#0F172A;&quot;&gt;PLATFORM GOVERNANCE &amp;amp;&lt;br&gt;MONITORING&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#E2E8F0;strokeColor=#94A3B8;strokeWidth=1;align=center;verticalAlign=middle;rotation=-90;" vertex="1" parent="1">
          <mxGeometry x="-30" y="490" width="150" height="24" as="geometry"/>
        </mxCell>
        <mxCell id="gov_frame" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="50" y="405" width="200" height="190" as="geometry"/>
        </mxCell>

        <!-- Row 1: IAM & Secret Manager -->
        <mxCell id="gov_iam" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:14px;color:#2563EB;&quot;&gt;👤&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:6px;font-weight:bold;color:#0F172A;&quot;&gt;IAM&lt;br&gt;&lt;span style=&quot;font-size:4.5px;color:#475569;font-weight:normal;&quot;&gt;Identity &amp;amp; Access&lt;br&gt;Management&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="55" y="410" width="85" height="50" as="geometry"/>
        </mxCell>
        <mxCell id="gov_secret" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:14px;color:#2563EB;&quot;&gt;🔒&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:6px;font-weight:bold;color:#0F172A;&quot;&gt;Secret&lt;br&gt;Manager&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="150" y="410" width="85" height="50" as="geometry"/>
        </mxCell>

        <!-- Row 2: Cloud Audit Logs & Cloud Armor / Monitoring -->
        <mxCell id="gov_audit" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:14px;color:#2563EB;&quot;&gt;📄&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:6px;font-weight:bold;color:#0F172A;&quot;&gt;Cloud&lt;br&gt;Audit Logs&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="55" y="468" width="85" height="50" as="geometry"/>
        </mxCell>
        <mxCell id="gov_monitoring" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:14px;color:#2563EB;&quot;&gt;📈&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:6px;font-weight:bold;color:#0F172A;&quot;&gt;Cloud&lt;br&gt;Monitoring&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="150" y="468" width="85" height="50" as="geometry"/>
        </mxCell>

        <!-- Row 3: Assured Workloads & Vertex AI Model Monitoring -->
        <mxCell id="gov_assured" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:14px;color:#2563EB;&quot;&gt;🛡️&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:6px;font-weight:bold;color:#0F172A;&quot;&gt;Assured&lt;br&gt;Workloads&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="55" y="528" width="85" height="50" as="geometry"/>
        </mxCell>
        <mxCell id="gov_model_mon" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:14px;color:#2563EB;&quot;&gt;📊&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:6px;font-weight:bold;color:#0F172A;&quot;&gt;Vertex AI&lt;br&gt;Model Monitoring&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="150" y="528" width="95" height="50" as="geometry"/>
        </mxCell>


        <!-- ==================== BOTTOM CENTER: GOOGLE CLOUD PLATFORM PILL ==================== -->
        <mxCell id="pill_gcp_center" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;❄️ Google Cloud Platform&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="335" y="608" width="515" height="34" as="geometry"/>
        </mxCell>


        <!-- ==================== FLOW CONNECTORS & ARROWS ==================== -->
        <!-- GE App -> Cloud Load Balancing / CDN -->
        <mxCell id="wire_ge_to_clb" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1.5;strokeColor=#2563EB;endArrow=classic;endFill=1;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="240" y="210" as="sourcePoint"/><mxPoint x="255" y="210" as="targetPoint"/></mxGeometry>
        </mxCell>

        <!-- CLB -> VPC Ingress -->
        <mxCell id="wire_clb_to_vpc" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1.5;strokeColor=#2563EB;endArrow=classic;endFill=1;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="325" y="200" as="sourcePoint"/><mxPoint x="355" y="175" as="targetPoint"/></mxGeometry>
        </mxCell>

        <!-- PubSub -> Orchestration Agent -->
        <mxCell id="wire_pubsub_to_orch" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1.5;strokeColor=#2563EB;endArrow=classic;endFill=1;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="565" y="275" as="sourcePoint"/><mxPoint x="612" y="150" as="targetPoint"/></mxGeometry>
        </mxCell>

        <!-- Orchestration Agent -> Downstream Data & Systems -->
        <mxCell id="wire_orch_to_downstream" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1.5;strokeColor=#2563EB;endArrow=classic;endFill=1;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="837" y="150" as="sourcePoint"/><mxPoint x="930" y="160" as="targetPoint"/></mxGeometry>
        </mxCell>

        <!-- Agent Tools Extensions -> Apigee -->
        <mxCell id="wire_extensions_to_apigee" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1.5;strokeColor=#2563EB;endArrow=classic;endFill=1;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="827" y="440" as="sourcePoint"/><mxPoint x="938" y="380" as="targetPoint"/></mxGeometry>
        </mxCell>

        <!-- Data Analytics Sink -> BigQuery -->
        <mxCell id="wire_sink_to_bq" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1.5;strokeColor=#2563EB;endArrow=classic;endFill=1;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="827" y="525" as="sourcePoint"/><mxPoint x="930" y="240" as="targetPoint"/></mxGeometry>
        </mxCell>

        <!-- Apigee -> APIs -->
        <mxCell id="wire_apigee_to_apis" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1;strokeColor=#EA580C;endArrow=classic;endFill=1;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="1006" y="380" as="sourcePoint"/><mxPoint x="1015" y="340" as="targetPoint"/></mxGeometry>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
