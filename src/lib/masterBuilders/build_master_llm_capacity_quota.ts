export function buildLlmCapacityQuotaXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="llm_capacity_quota_management" name="Comprehensive Topology for (LLM) Capacity Quota Management (P5-AI-L-05)">
    <mxGraphModel dx="1600" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="950" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- ==================== TOP TITLE BANNER ==================== -->
        <mxCell id="main_title_box" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="16" width="700" height="54" as="geometry"/>
        </mxCell>
        <mxCell id="main_title" value="&lt;b style=&quot;font-size:18px;color:#0F172A;&quot;&gt;LLM Capacity &amp;amp; Quota Management Topology (P5-AI-L-05)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:12px;color:#475569;font-weight:600;&quot;&gt;Multi-Region Inference Routing • Distributed Rate Limiting • SRE Observability&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="45" y="18" width="670" height="50" as="geometry"/>
        </mxCell>


        <!-- ==================== LEFT: CONSUMER APPS & CLOUD INFRASTRUCTURE ==================== -->
        
        <!-- Consumer Applications Card -->
        <mxCell id="card_consumer_apps" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:28px;&quot;&gt;💻📱&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;padding-top:4px;&quot;&gt;Consumer Apps&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9px;color:#64748B;&quot;&gt;Web, Mobile &amp;amp; Internal APIs&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=center;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="30" y="270" width="120" height="110" as="geometry"/>
        </mxCell>

        <!-- Ingress API Calls Arrow -->
        <mxCell id="e_apps_gateway" value="API Calls" style="edgeStyle=none;html=1;strokeColor=#2563EB;strokeWidth=2;endArrow=classic;fontSize=9;fontStyle=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;padding=2;" edge="1" parent="1" source="card_consumer_apps" target="card_edge_gateway">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- Main Cloud Infrastructure Container (Spans x = 180 .. 1120) -->
        <mxCell id="box_cloud_infra" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="180" y="90" width="940" height="740" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_cloud_infra" value="🌐 &lt;b style=&quot;font-size:13px;color:#1E293B;&quot;&gt;Google Cloud Infrastructure — High Availability LLM Gateway Plane&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="195" y="98" width="500" height="24" as="geometry"/>
        </mxCell>

        <!-- Edge API Gateway -->
        <mxCell id="card_edge_gateway" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:24px;&quot;&gt;🚪&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;padding-top:2px;&quot;&gt;Apigee / GKE&lt;br&gt;API Gateway&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#475569;line-height:1.25;padding-top:4px;&quot;&gt;JWT Auth • TLS 1.3&lt;br&gt;WAF Cloud Armor&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.5;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="200" y="260" width="115" height="130" as="geometry"/>
        </mxCell>

        <!-- Quota Management Service Container -->
        <mxCell id="box_quota_section" value="" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="345" y="140" width="165" height="660" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_rate_limit_hdr" value="&lt;b style=&quot;font-size:10.5px;color:#1E40AF;&quot;&gt;⚡ Quota &amp;amp; Rate Limiter&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="350" y="146" width="155" height="22" as="geometry"/>
        </mxCell>

        <!-- Top Distributed Cache (Redis Tier 1) -->
        <mxCell id="card_redis_top" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:20px;&quot;&gt;🛢️&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9.5px;font-weight:bold;color:#991B1B;&quot;&gt;Memorystore Redis&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;padding-top:2px;&quot;&gt;Token Bucket Rate Limiter&lt;br&gt;Requests / Min / App&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FEF2F2;strokeColor=#EF4444;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="360" y="180" width="135" height="85" as="geometry"/>
        </mxCell>

        <!-- Quota Management Service Core Box -->
        <mxCell id="card_quota_service" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:24px;&quot;&gt;⚙️&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;padding-top:2px;&quot;&gt;Quota Governor&lt;br&gt;Microservice&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#475569;line-height:1.25;padding-top:4px;&quot;&gt;Dynamic Priority Queue&lt;br&gt;Pre-flight Token Estimation&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.5;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="360" y="280" width="135" height="110" as="geometry"/>
        </mxCell>

        <!-- Bottom Distributed Cache (Redis Tier 2) -->
        <mxCell id="card_redis_btm" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:20px;&quot;&gt;🛢️&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9.5px;font-weight:bold;color:#991B1B;&quot;&gt;Quota Budget Store&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;padding-top:2px;&quot;&gt;Monthly Token Allocations&lt;br&gt;Burst Credit Throttle&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FEF2F2;strokeColor=#EF4444;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="360" y="410" width="135" height="85" as="geometry"/>
        </mxCell>

        <!-- Edge Gateway -> Quota Service Connector -->
        <mxCell id="e_gw_quota" value="" style="edgeStyle=none;html=1;strokeColor=#2563EB;strokeWidth=2;endArrow=classic;" edge="1" parent="1" source="card_edge_gateway" target="card_quota_service"/>

        <!-- Quota Service <-> Redis Connectors -->
        <mxCell id="e_quota_redis_top" value="" style="edgeStyle=none;html=1;strokeColor=#0F172A;strokeWidth=1.2;startArrow=classic;endArrow=classic;" edge="1" parent="1" source="card_quota_service" target="card_redis_top"/>
        <mxCell id="e_quota_redis_btm" value="" style="edgeStyle=none;html=1;strokeColor=#0F172A;strokeWidth=1.2;startArrow=classic;endArrow=classic;" edge="1" parent="1" source="card_quota_service" target="card_redis_btm"/>


        <!-- Cross-Region Load Balancer -->
        <mxCell id="card_cslb" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:24px;&quot;&gt;⚖️&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;padding-top:2px;&quot;&gt;Cloud Global LB&lt;br&gt;(Cross-Region)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;line-height:1.25;padding-top:4px;&quot;&gt;Health Check Sensing&lt;br&gt;Capacity Aware Routing&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.5;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="535" y="270" width="125" height="110" as="geometry"/>
        </mxCell>

        <mxCell id="e_quota_cslb" value="" style="edgeStyle=none;html=1;strokeColor=#2563EB;strokeWidth=2;endArrow=classic;" edge="1" parent="1" source="card_quota_service" target="card_cslb"/>


        <!-- ==================== MULTI-REGION MANAGED GKE CLUSTERS ==================== -->

        <!-- Region 1: us-central1 Container -->
        <mxCell id="box_region1" value="" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="690" y="140" width="220" height="235" as="geometry"/>
        </mxCell>
        <mxCell id="hdr_region1" value="&lt;b style=&quot;font-size:10px;color:#1E40AF;&quot;&gt;🌐 Region 1 (us-central1)&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="700" y="145" width="200" height="20" as="geometry"/>
        </mxCell>

        <!-- LLM Serving Pod 1 -->
        <mxCell id="card_pod1" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;&quot;&gt;🧊 LLM Serving Pods (vLLM)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#334155;line-height:1.3;padding-top:2px;&quot;&gt;• Continuous Batching Engine&lt;br&gt;• KV-Cache PagedAttention&lt;br&gt;• Autoscaling HPA on P99 Latency&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=top;padding=4;" vertex="1" parent="1">
          <mxGeometry x="700" y="170" width="200" height="90" as="geometry"/>
        </mxCell>

        <!-- Vertex AI FinOps Agent 1 -->
        <mxCell id="card_finops_agent1" value="&lt;b style=&quot;font-size:9px;color:#166534;&quot;&gt;🤖 Vertex AI FinOps Sidecar Agent&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#15803D;&quot;&gt;Real-time Prompt Token Telemetry&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#22C55E;strokeWidth=1;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="700" y="270" width="200" height="42" as="geometry"/>
        </mxCell>

        <mxCell id="badge_hw1" value="&lt;span style=&quot;font-size:8px;font-weight:bold;color:#047857;&quot;&gt;🟩 NVIDIA H100 GPUs • TPU v5e&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ECFDF5;strokeColor=#A7F3D0;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="700" y="322" width="200" height="24" as="geometry"/>
        </mxCell>


        <!-- Region 2: europe-west1 Container -->
        <mxCell id="box_region2" value="" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="690" y="395" width="220" height="235" as="geometry"/>
        </mxCell>
        <mxCell id="hdr_region2" value="&lt;b style=&quot;font-size:10px;color:#1E40AF;&quot;&gt;🌐 Region 2 (europe-west1)&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="700" y="400" width="200" height="20" as="geometry"/>
        </mxCell>

        <!-- LLM Serving Pod 2 -->
        <mxCell id="card_pod2" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;&quot;&gt;🧊 LLM Serving Pods (TGI)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#334155;line-height:1.3;padding-top:2px;&quot;&gt;• FlashAttention 2 Inference&lt;br&gt;• Speculative Decoding Runtime&lt;br&gt;• Dynamic GPU Multi-Tenancy&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=top;padding=4;" vertex="1" parent="1">
          <mxGeometry x="700" y="425" width="200" height="90" as="geometry"/>
        </mxCell>

        <!-- Vertex AI FinOps Agent 2 -->
        <mxCell id="card_finops_agent2" value="&lt;b style=&quot;font-size:9px;color:#166534;&quot;&gt;🤖 Vertex AI FinOps Sidecar Agent&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#15803D;&quot;&gt;Real-time Prompt Token Telemetry&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#22C55E;strokeWidth=1;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="700" y="525" width="200" height="42" as="geometry"/>
        </mxCell>

        <mxCell id="badge_hw2" value="&lt;span style=&quot;font-size:8px;font-weight:bold;color:#047857;&quot;&gt;🟩 NVIDIA L4 GPUs • TPU v5p&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ECFDF5;strokeColor=#A7F3D0;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="700" y="577" width="200" height="24" as="geometry"/>
        </mxCell>

        <!-- Routing Connectors from LB -->
        <mxCell id="e_lb_reg1" value="Primary Route" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=classic;fontSize=8.5;fontStyle=1;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="card_cslb" target="box_region1"/>
        <mxCell id="e_lb_reg2" value="Failover / Spillage" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=classic;fontSize=8.5;fontStyle=1;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="card_cslb" target="box_region2"/>


        <!-- ==================== FINOPS COST & USAGE HUB ==================== -->
        <!-- FinOps API Gateway & BigQuery -->
        <mxCell id="card_finops_gateway" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:22px;&quot;&gt;📊&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;&quot;&gt;Vertex AI FinOps&lt;br&gt;Telemetry Ingestion&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;Cloud Pub/Sub Streaming Bus&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="935" y="170" width="165" height="90" as="geometry"/>
        </mxCell>

        <mxCell id="card_finops_db" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:22px;&quot;&gt;🔍&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;&quot;&gt;BigQuery FinOps Store&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;Partitioned by Tenant/Prompt&lt;br&gt;Token Cost Attribution&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="935" y="280" width="165" height="90" as="geometry"/>
        </mxCell>

        <!-- Looker FinOps Card (LIGHT THEME - NO BLACK BACKGROUND) -->
        <mxCell id="card_looker_finops" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td colspan=&quot;3&quot; style=&quot;font-size:10px;font-weight:bold;color:#1E40AF;border-bottom:1px solid #BFDBFE;padding-bottom:2px;&quot;&gt;📈 Looker FinOps Cost Dashboard&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;padding:4px;text-align:center;&quot;&gt;&lt;b style=&quot;font-size:8px;color:#0F172A;&quot;&gt;Token Usage&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:12px;font-weight:bold;color:#2563EB;&quot;&gt;42.8M&lt;/span&gt;&lt;/td&gt;&lt;td style=&quot;padding:4px;text-align:center;&quot;&gt;&lt;b style=&quot;font-size:8px;color:#0F172A;&quot;&gt;Cost / Team&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:12px;font-weight:bold;color:#16A34A;&quot;&gt;$1.42/k&lt;/span&gt;&lt;/td&gt;&lt;td style=&quot;padding:4px;text-align:center;&quot;&gt;&lt;b style=&quot;font-size:8px;color:#0F172A;&quot;&gt;Budget Alert&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:12px;font-weight:bold;color:#0284C7;&quot;&gt;Optimal&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="935" y="395" width="165" height="100" as="geometry"/>
        </mxCell>

        <!-- FinOps Telemetry Connectors -->
        <mxCell id="e_pod1_finops" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#16A34A;strokeWidth=1.2;dashed=1;endArrow=classic;" edge="1" parent="1" source="card_finops_agent1" target="card_finops_gateway"/>
        <mxCell id="e_pod2_finops" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#16A34A;strokeWidth=1.2;dashed=1;endArrow=classic;" edge="1" parent="1" source="card_finops_agent2" target="card_finops_gateway"/>
        <mxCell id="e_finops_gw_db" value="" style="edgeStyle=none;html=1;strokeColor=#0F172A;strokeWidth=1.2;endArrow=classic;" edge="1" parent="1" source="card_finops_gateway" target="card_finops_db"/>
        <mxCell id="e_finops_db_dash" value="" style="edgeStyle=none;html=1;strokeColor=#0F172A;strokeWidth=1.2;endArrow=classic;" edge="1" parent="1" source="card_finops_db" target="card_looker_finops"/>


        <!-- ==================== RIGHT: SRE OBSERVABILITY DASHBOARDS (LIGHT CLEAN THEME) ==================== -->
        <mxCell id="box_sre_dashboards" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="1150" y="90" width="420" height="740" as="geometry"/>
        </mxCell>
        <mxCell id="hdr_sre" value="&lt;b style=&quot;font-size:13px;color:#0F172A;&quot;&gt;📊 SRE Observability &amp;amp; Capacity Governance&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:9.5px;color:#475569;&quot;&gt;Real-Time Telemetry powered by Cloud Monitoring &amp;amp; Cloud Logging&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1160" y="98" width="400" height="30" as="geometry"/>
        </mxCell>

        <!-- 4 SRE Clean Light Dashboard Cards Stacked -->

        <!-- 1. Rate Limiting Dashboard -->
        <mxCell id="sre_dash1" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td colspan=&quot;3&quot; style=&quot;font-size:10.5px;font-weight:bold;color:#1E40AF;border-bottom:1px solid #E2E8F0;padding-bottom:3px;&quot;&gt;🚦 Rate Limiting &amp;amp; Throttling Dashboard&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;padding:4px;text-align:center;&quot;&gt;&lt;b style=&quot;font-size:8.5px;color:#64748B;&quot;&gt;Total RPS&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:14px;font-weight:bold;color:#2563EB;&quot;&gt;14,250&lt;/span&gt;&lt;/td&gt;&lt;td style=&quot;padding:4px;text-align:center;&quot;&gt;&lt;b style=&quot;font-size:8.5px;color:#64748B;&quot;&gt;Top Consumers&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:14px;font-weight:bold;color:#0F172A;&quot;&gt;BU-Finance&lt;/span&gt;&lt;/td&gt;&lt;td style=&quot;padding:4px;text-align:center;&quot;&gt;&lt;b style=&quot;font-size:8.5px;color:#64748B;&quot;&gt;Quota Drops&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:14px;font-weight:bold;color:#16A34A;&quot;&gt;0.00%&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#BFDBFE;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1165" y="140" width="390" height="105" as="geometry"/>
        </mxCell>

        <!-- 2. Cross-Region LB Dashboard -->
        <mxCell id="sre_dash2" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td colspan=&quot;3&quot; style=&quot;font-size:10.5px;font-weight:bold;color:#1E40AF;border-bottom:1px solid #E2E8F0;padding-bottom:3px;&quot;&gt;🌐 Global Traffic &amp;amp; Failover Routing&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;padding:4px;text-align:center;&quot;&gt;&lt;b style=&quot;font-size:8.5px;color:#64748B;&quot;&gt;us-central1&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:14px;font-weight:bold;color:#0284C7;&quot;&gt;68.4%&lt;/span&gt;&lt;/td&gt;&lt;td style=&quot;padding:4px;text-align:center;&quot;&gt;&lt;b style=&quot;font-size:8.5px;color:#64748B;&quot;&gt;europe-west1&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:14px;font-weight:bold;color:#0284C7;&quot;&gt;31.6%&lt;/span&gt;&lt;/td&gt;&lt;td style=&quot;padding:4px;text-align:center;&quot;&gt;&lt;b style=&quot;font-size:8.5px;color:#64748B;&quot;&gt;P95 Latency&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:14px;font-weight:bold;color:#16A34A;&quot;&gt;42ms&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#BFDBFE;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1165" y="260" width="390" height="105" as="geometry"/>
        </mxCell>

        <!-- 3. LLM Inference Health Dashboard -->
        <mxCell id="sre_dash3" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td colspan=&quot;3&quot; style=&quot;font-size:10.5px;font-weight:bold;color:#1E40AF;border-bottom:1px solid #E2E8F0;padding-bottom:3px;&quot;&gt;⚡ GPU / TPU Cluster Health &amp;amp; P99 Latency&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;padding:4px;text-align:center;&quot;&gt;&lt;b style=&quot;font-size:8.5px;color:#64748B;&quot;&gt;TTFT (First Token)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:14px;font-weight:bold;color:#16A34A;&quot;&gt;180ms&lt;/span&gt;&lt;/td&gt;&lt;td style=&quot;padding:4px;text-align:center;&quot;&gt;&lt;b style=&quot;font-size:8.5px;color:#64748B;&quot;&gt;GPU Utilization&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:14px;font-weight:bold;color:#2563EB;&quot;&gt;84.2%&lt;/span&gt;&lt;/td&gt;&lt;td style=&quot;padding:4px;text-align:center;&quot;&gt;&lt;b style=&quot;font-size:8.5px;color:#64748B;&quot;&gt;Error Rate&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:14px;font-weight:bold;color:#16A34A;&quot;&gt;&amp;lt; 0.01%&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#BFDBFE;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1165" y="380" width="390" height="105" as="geometry"/>
        </mxCell>

        <!-- 4. Capacity Planning Dashboard -->
        <mxCell id="sre_dash4" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td colspan=&quot;3&quot; style=&quot;font-size:10.5px;font-weight:bold;color:#1E40AF;border-bottom:1px solid #E2E8F0;padding-bottom:3px;&quot;&gt;🗄️ Capacity Forecast &amp;amp; Quota Reservation&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;padding:4px;text-align:center;&quot;&gt;&lt;b style=&quot;font-size:8.5px;color:#64748B;&quot;&gt;Reserved TPUs&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:14px;font-weight:bold;color:#0F172A;&quot;&gt;128 Nodes&lt;/span&gt;&lt;/td&gt;&lt;td style=&quot;padding:4px;text-align:center;&quot;&gt;&lt;b style=&quot;font-size:8.5px;color:#64748B;&quot;&gt;Queue Wait&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:14px;font-weight:bold;color:#16A34A;&quot;&gt;0 ms&lt;/span&gt;&lt;/td&gt;&lt;td style=&quot;padding:4px;text-align:center;&quot;&gt;&lt;b style=&quot;font-size:8.5px;color:#64748B;&quot;&gt;30-Day Forecast&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:14px;font-weight:bold;color:#2563EB;&quot;&gt;+18% Growth&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#BFDBFE;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1165" y="500" width="390" height="105" as="geometry"/>
        </mxCell>

        <!-- SRE Telemetry Connector -->
        <mxCell id="e_gw_sre" value="Real-time Metrics" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#2563EB;strokeWidth=1.2;dashed=1;endArrow=classic;fontSize=8.5;fontColor=#2563EB;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="card_finops_gateway" target="box_sre_dashboards"/>


        <!-- ==================== FOOTER LEGEND ==================== -->
        <mxCell id="legend_box" value="&lt;table style=&quot;width:100%;font-size:9.5px;color:#334155;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td&gt;&lt;b style=&quot;color:#0F172A;&quot;&gt;LLM Quota Fabric:&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🔵 &lt;b&gt;API Ingress &amp;amp; Rate Limits&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🔴 &lt;b&gt;Memorystore Redis Cache&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🟢 &lt;b&gt;FinOps Token Attribution&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🟣 &lt;b&gt;Multi-Region GKE Clusters&lt;/b&gt;&lt;/td&gt;&lt;td&gt;✨ &lt;b style=&quot;color:#1D4ED8;&quot;&gt;Powered by Google Cloud SRE&lt;/b&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="30" y="870" width="1540" height="38" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
