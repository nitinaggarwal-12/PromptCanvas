export function buildHaMultiRegionApplicationXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="ha_multi_region_app" name="Highly Available Multi-Region Application Architecture (NEW-REL-03)">
    <mxGraphModel dx="1600" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="950" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- Top Header Banner -->
        <mxCell id="title_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="16" width="1540" height="54" as="geometry"/>
        </mxCell>
        <mxCell id="main_title" value="&lt;b style=&quot;font-size:17px;color:#0F172A;&quot;&gt;Highly Available Multi-Region Active-Active Application Architecture (NEW-REL-03 / #53)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:11px;color:#475569;font-weight:600;&quot;&gt;Global External HTTPS LB (Anycast IP) • Dual-Region GKE Fleets • Cloud Spanner Multi-Region Replication • Sub-second Failover&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="45" y="18" width="1150" height="50" as="geometry"/>
        </mxCell>
        <mxCell id="top_badge" value="&lt;b style=&quot;font-size:12px;color:#16A34A;&quot;&gt;99.999% SLA Target&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#64748B;&quot;&gt;Multi-Region Active-Active&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#86EFAC;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1370" y="24" width="180" height="38" as="geometry"/>
        </mxCell>

        <!-- TIER 1: GLOBAL EDGE & TRAFFIC ROUTING -->
        <mxCell id="tier1_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="85" width="1540" height="120" as="geometry"/>
        </mxCell>
        <mxCell id="tier1_hdr" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;🌐 GLOBAL ANYCAST INGRESS &amp;amp; INTELLIGENT TRAFFIC STEERING&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="30" y="85" width="1540" height="28" as="geometry"/>
        </mxCell>
        <mxCell id="card_dns_geo" value="&lt;b style=&quot;font-size:10px;color:#1E40AF;&quot;&gt;🌍 Cloud DNS (Geo-Routing)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Proximity routing &amp;amp; latency-based DNS answers&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#60A5FA;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="60" y="125" width="320" height="65" as="geometry"/>
        </mxCell>
        <mxCell id="card_global_lb_ha" value="&lt;b style=&quot;font-size:10px;color:#1E40AF;&quot;&gt;⚖️ Global External HTTPS Load Balancer (Cloud Armor + Cloud CDN)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Single Anycast VIP, Instant Edge Failover, Backend Capacity Weighting &amp;amp; Health Checks&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#60A5FA;strokeWidth=1.5;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="420" y="125" width="760" height="65" as="geometry"/>
        </mxCell>
        <mxCell id="card_health_check_agent" value="&lt;b style=&quot;font-size:10px;color:#1E40AF;&quot;&gt;💓 Autonomous Health Check&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Continuous 5s HTTP Probes across Regions&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#60A5FA;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1220" y="125" width="320" height="65" as="geometry"/>
        </mxCell>

        <!-- REGION 1: PRIMARY ACTIVE REGION -->
        <mxCell id="r1_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#86EFAC;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="230" width="740" height="340" as="geometry"/>
        </mxCell>
        <mxCell id="r1_hdr" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;🇺🇸 REGION A: us-central1 (Active Primary Fleet)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#16A34A;strokeColor=#15803D;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="30" y="230" width="740" height="28" as="geometry"/>
        </mxCell>
        <mxCell id="card_r1_gke" value="&lt;b style=&quot;font-size:10px;color:#166534;&quot;&gt;☸️ GKE Cluster us-central1 (Autopilot)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Multi-Zone Pods (Zones a, b, c) • HPA Autoscale&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="50" y="275" width="320" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="card_r1_cache" value="&lt;b style=&quot;font-size:10px;color:#166534;&quot;&gt;⚡ Memorystore Redis Cluster&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;In-Region Low Latency Session Cache&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="410" y="275" width="330" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="card_r1_app_services" value="&lt;b style=&quot;font-size:9.5px;color:#166534;&quot;&gt;⚙️ Microservices &amp;amp; Agent Workers (us-central1)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#475569;&quot;&gt;Checkout API, Inventory Worker, Recommendation Agent Engine&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="50" y="365" width="690" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="card_r1_sqs" value="&lt;b style=&quot;font-size:9.5px;color:#166534;&quot;&gt;📬 Pub/Sub Regional Ingestion Topic&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#475569;&quot;&gt;Exact-once Regional Dead Letter Queue &amp;amp; Async Event Buffer&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#22C55E;strokeWidth=1;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="50" y="445" width="690" height="55" as="geometry"/>
        </mxCell>

        <!-- REGION 2: SECONDARY ACTIVE REGION -->
        <mxCell id="r2_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#86EFAC;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="830" y="230" width="740" height="340" as="geometry"/>
        </mxCell>
        <mxCell id="r2_hdr" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;🇺🇸 REGION B: us-east4 (Active Secondary Fleet)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#16A34A;strokeColor=#15803D;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="830" y="230" width="740" height="28" as="geometry"/>
        </mxCell>
        <mxCell id="card_r2_gke" value="&lt;b style=&quot;font-size:10px;color:#166534;&quot;&gt;☸️ GKE Cluster us-east4 (Autopilot)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Multi-Zone Pods (Zones a, b, c) • HPA Autoscale&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="850" y="275" width="320" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="card_r2_cache" value="&lt;b style=&quot;font-size:10px;color:#166534;&quot;&gt;⚡ Memorystore Redis Cluster&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;In-Region Low Latency Session Cache&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1210" y="275" width="330" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="card_r2_app_services" value="&lt;b style=&quot;font-size:9.5px;color:#166534;&quot;&gt;⚙️ Microservices &amp;amp; Agent Workers (us-east4)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#475569;&quot;&gt;Checkout API, Inventory Worker, Recommendation Agent Engine&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="850" y="365" width="690" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="card_r2_sqs" value="&lt;b style=&quot;font-size:9.5px;color:#166534;&quot;&gt;📬 Pub/Sub Regional Ingestion Topic&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#475569;&quot;&gt;Exact-once Regional Dead Letter Queue &amp;amp; Async Event Buffer&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#22C55E;strokeWidth=1;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="850" y="445" width="690" height="55" as="geometry"/>
        </mxCell>

        <!-- TIER 3: MULTI-REGION GLOBAL DATA LAYER -->
        <mxCell id="tier3_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#D8B4FE;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="600" width="1540" height="175" as="geometry"/>
        </mxCell>
        <mxCell id="tier3_hdr" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;🗄️ MULTI-REGION GLOBAL CONSISTENCY DATA FOUNDATION&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#7E22CE;strokeColor=#6B21A8;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="30" y="600" width="1540" height="28" as="geometry"/>
        </mxCell>
        <mxCell id="card_spanner" value="&lt;b style=&quot;font-size:11px;color:#6B21A8;&quot;&gt;🌐 Cloud Spanner Multi-Region Instance (nam3: us-central1 / us-east4 / us-east1)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Synchronous Multi-Region TrueTime Replication • Strong Consistency (External Consistency) • Zero-Downtime Schema Migrations&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D8B4FE;strokeWidth=1.5;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="50" y="640" width="950" height="65" as="geometry"/>
        </mxCell>
        <mxCell id="card_gcs_dual" value="&lt;b style=&quot;font-size:10px;color:#6B21A8;&quot;&gt;🪣 Cloud Storage Dual-Region Bucket&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Turbo Replication (15-min RPO SLA)&lt;br&gt;Automatic Cross-Region Failover&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D8B4FE;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1030" y="640" width="510" height="65" as="geometry"/>
        </mxCell>

        <!-- FLOW CONNECTORS -->
        <mxCell id="edge_lb_to_r1" value="Active Traffic (50%)" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#16A34A;fontColor=#166534;fontSize=10;fontStyle=1;labelBackgroundColor=none;" edge="1" parent="1" source="card_global_lb_ha" target="card_r1_gke"/>
        <mxCell id="edge_lb_to_r2" value="Active Traffic (50%)" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#16A34A;fontColor=#166534;fontSize=10;fontStyle=1;labelBackgroundColor=none;" edge="1" parent="1" source="card_global_lb_ha" target="card_r2_gke"/>
        <mxCell id="edge_r1_to_spanner" value="Synchronous Read/Write" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#7E22CE;fontColor=#6B21A8;fontSize=9.5;labelBackgroundColor=none;" edge="1" parent="1" source="card_r1_app_services" target="card_spanner"/>
        <mxCell id="edge_r2_to_spanner" value="Synchronous Read/Write" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#7E22CE;fontColor=#6B21A8;fontSize=9.5;labelBackgroundColor=none;" edge="1" parent="1" source="card_r2_app_services" target="card_spanner"/>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
