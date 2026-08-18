export function buildGcpLandingZoneVpcXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="gcp_landing_zone_vpc" name="Google Cloud Infrastructure: Landing Zone &amp; Shared VPC Topology (P4-SEC-P-02)">
    <mxGraphModel dx="1600" dy="920" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="860" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- ==================== HEADER BANNER ==================== -->
        <mxCell id="top_logo" value="&lt;span style=&quot;font-size:24px;&quot;&gt;🌐&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="10" width="35" height="35" as="geometry"/>
        </mxCell>
        <mxCell id="main_title" value="&lt;b style=&quot;font-size:18px;color:#0F172A;letter-spacing:-0.2px;&quot;&gt;Google Cloud Infrastructure: Landing Zone &amp;amp; Shared VPC Topology&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="65" y="8" width="1050" height="24" as="geometry"/>
        </mxCell>
        <mxCell id="main_subtitle" value="&lt;span style=&quot;font-size:11px;color:#475569;font-weight:600;&quot;&gt;Physical Zero-Trust Network Fabric: Hub-and-Spoke Shared VPC, 100G Interconnect, Cloud Router BGP, PSC &amp;amp; VPC Service Controls&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="65" y="32" width="1050" height="18" as="geometry"/>
        </mxCell>
        
        <!-- Gemini Engine Badge -->
        <mxCell id="top_gemini_badge" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12.5px;font-weight:bold;color:#38BDF8;&quot;&gt;Gemini Platform&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9px;color:#94A3B8;font-weight:600;&quot;&gt;Autonomous NetOps&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=20;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#1E293B;strokeWidth=1.5;align=center;verticalAlign=middle;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="1380" y="8" width="195" height="42" as="geometry"/>
        </mxCell>


        <!-- ==================== COLUMN 1: ON-PREMISE & TRANSIT INTERCONNECT ==================== -->
        <mxCell id="col1_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#94A3B8;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="25" y="60" width="280" height="715" as="geometry"/>
        </mxCell>
        <mxCell id="col1_title" value="&lt;b style=&quot;font-size:11px;color:#334155;&quot;&gt;🏢 On-Premise &amp;amp; Transit Interconnect&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:9px;color:#64748B;&quot;&gt;Carrier-Grade Dual Redundancy&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="35" y="64" width="260" height="24" as="geometry"/>
        </mxCell>

        <!-- 1.1 Corporate On-Premise DC -->
        <mxCell id="card_onprem_dc" value="&lt;table style=&quot;width:100%;text-align:left;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;🏢 Corporate On-Premise DC&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9.5px;color:#334155;line-height:1.3;padding-top:4px;&quot;&gt;• Arista 7060X Core Switches (ECMP)&lt;br&gt;• BGP ASN 65001 (Active/Active Routes)&lt;br&gt;• Primary Transit: 192.168.1.0/24&lt;br&gt;• Secondary Transit: 192.168.2.0/24&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#64748B;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="35" y="92" width="260" height="120" as="geometry"/>
        </mxCell>

        <!-- 1.2 Dedicated Cloud Interconnect 100G -->
        <mxCell id="card_dedicated_interconnect" value="&lt;table style=&quot;width:100%;text-align:left;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#1E40AF;&quot;&gt;⚡ Dedicated Interconnect 100G&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9.5px;color:#334155;line-height:1.3;padding-top:4px;&quot;&gt;• Dual 100Gbps Cross-Connects (Equinix)&lt;br&gt;• IEEE 802.1AE MACsec L2 Encryption&lt;br&gt;• Sub-1.5ms Latency SLA (99.99% Multi-Metro)&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="35" y="224" width="260" height="100" as="geometry"/>
        </mxCell>

        <!-- 1.3 Cloud HA VPN (IPsec Backup) -->
        <mxCell id="card_ha_vpn" value="&lt;table style=&quot;width:100%;text-align:left;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;🔒 Cloud HA VPN (IPsec Backup)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9.5px;color:#334155;line-height:1.3;padding-top:4px;&quot;&gt;• Dual Tunnel IPSec IKEv2 AES-256 GCM&lt;br&gt;• BGP Dynamic Failover (MED 200 vs 100)&lt;br&gt;• Automated Tunnel Health Checks&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#64748B;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="35" y="336" width="260" height="95" as="geometry"/>
        </mxCell>

        <!-- 1.4 Network Connectivity Center (NCC) -->
        <mxCell id="card_ncc" value="&lt;table style=&quot;width:100%;text-align:left;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;🌐 Network Connectivity Center (NCC)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9.5px;color:#334155;line-height:1.3;padding-top:4px;&quot;&gt;• Global Full-Mesh Transit Backbone&lt;br&gt;• Multi-Cloud WAN &amp;amp; Branch Office Spokes&lt;br&gt;• Automated Route Exchange &amp;amp; Filter Matrix&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#64748B;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="35" y="443" width="260" height="135" as="geometry"/>
        </mxCell>

        <!-- Co-Location Fabric Visual inside NCC -->
        <mxCell id="sub_rack_visual" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;font-weight:bold;color:#1E293B;&quot;&gt;Enterprise Multi-Cloud Interconnect Grid&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#475569;padding-top:2px;&quot;&gt;Equinix / CoreSite Co-Location Cross-Connects&lt;br&gt;BGP ASN 64512 • Dual P2P /30 Subnets&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="35" y="590" width="260" height="170" as="geometry"/>
        </mxCell>

        <!-- Column 1 Internal Connectors -->
        <mxCell id="edge_dc_to_interconnect" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#64748B;strokeWidth=1.2;html=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="card_onprem_dc" target="card_dedicated_interconnect">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_interconnect_to_vpn" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#64748B;strokeWidth=1.2;html=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="card_dedicated_interconnect" target="card_ha_vpn">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_vpn_to_ncc" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#64748B;strokeWidth=1.2;html=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="card_ha_vpn" target="card_ncc">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>


        <!-- ==================== COLUMN 2: SHARED VPC HOST PROJECT (HUB) ==================== -->
        <mxCell id="col2_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="320" y="60" width="310" height="715" as="geometry"/>
        </mxCell>
        <mxCell id="col2_title" value="&lt;b style=&quot;font-size:11px;color:#1D4ED8;&quot;&gt;🌐 Shared VPC Host Project (Hub)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:9px;color:#2563EB;&quot;&gt;Centralized Routing &amp;amp; Ingress Hub&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="330" y="64" width="290" height="24" as="geometry"/>
        </mxCell>

        <!-- 2.1 Cloud Router & BGP Engine -->
        <mxCell id="card_cloud_router" value="&lt;table style=&quot;width:100%;text-align:left;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;🔀 Cloud Router &amp;amp; BGP Engine&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9.5px;color:#334155;line-height:1.3;padding-top:4px;&quot;&gt;• Global Dynamic Routing (ASN 16550)&lt;br&gt;• Dual Redundant BGP Sessions (BFD 300ms)&lt;br&gt;• Custom Advertised Route Filters &amp;amp; MEDs&lt;br&gt;• Dynamic Spoke Propagation across Regions&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="330" y="92" width="290" height="120" as="geometry"/>
        </mxCell>

        <!-- 2.2 Cloud NAT & Cloud DNS -->
        <mxCell id="card_cloud_nat" value="&lt;table style=&quot;width:100%;text-align:left;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;🌐 Cloud NAT &amp;amp; Private Cloud DNS&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9.5px;color:#334155;line-height:1.3;padding-top:4px;&quot;&gt;• Port Reservation Gateway (High-Scale)&lt;br&gt;• Private DNS Zones &amp;amp; Inbound Forwarding&lt;br&gt;• Hybrid DNS Peering (*.corp &amp;amp; *.internal)&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="330" y="224" width="290" height="105" as="geometry"/>
        </mxCell>

        <!-- 2.3 Global External App LB & Cloud Armor -->
        <mxCell id="card_app_lb" value="&lt;table style=&quot;width:100%;text-align:left;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;🛡️ Global External App LB &amp;amp; Cloud Armor&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9.5px;color:#334155;line-height:1.3;padding-top:4px;&quot;&gt;• Anycast Global Ingress Virtual IP (IPv4/IPv6)&lt;br&gt;• DDoS Adaptive Protection &amp;amp; OWASP Top 10 WAF&lt;br&gt;• Strict mTLS 1.3 Edge Handshake Termination&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="330" y="340" width="290" height="135" as="geometry"/>
        </mxCell>

        <!-- Mini WAF Rules Mockup -->
        <mxCell id="sub_waf_rules" value="&lt;b style=&quot;font-size:8.5px;color:#1E40AF;&quot;&gt;Cloud Armor Rules: Rate-Limit (10K/s) | Bot Defense | Geo-Fence&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#93C5FD;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="338" y="420" width="274" height="45" as="geometry"/>
        </mxCell>

        <!-- 2.4 Private Service Connect (PSC) Hub -->
        <mxCell id="card_psc_hub" value="&lt;table style=&quot;width:100%;text-align:left;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#1D4ED8;&quot;&gt;🔌 Private Service Connect (PSC) Hub&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9.5px;color:#1E293B;line-height:1.35;padding-top:4px;&quot;&gt;&lt;b style=&quot;color:#1E40AF;&quot;&gt;Consumer Endpoints (10.100.0.0/24)&lt;/b&gt;&lt;br&gt;• Dedicated PSC IP for Vertex AI Inference&lt;br&gt;• Cloud SQL Private Endpoint (PostgreSQL)&lt;br&gt;• BigQuery &amp;amp; Storage Restricted VIPs&lt;br&gt;• Zero Public Egress • Internal SSL Peering&lt;br&gt;• Vertex AI Gemini 3.7 Endpoint Gateway&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#1D4ED8;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="330" y="488" width="290" height="272" as="geometry"/>
        </mxCell>

        <!-- Column 2 Internal Connectors -->
        <mxCell id="edge_router_to_nat" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#2563EB;strokeWidth=1.2;html=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="card_cloud_router" target="card_cloud_nat">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_nat_to_lb" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#2563EB;strokeWidth=1.2;html=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="card_cloud_nat" target="card_app_lb">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_lb_to_psc" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#2563EB;strokeWidth=1.2;html=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="card_app_lb" target="card_psc_hub">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>


        <!-- ==================== COLUMN 3: WORKLOAD SPOKE PROJECTS ==================== -->
        <mxCell id="col3_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#22C55E;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="645" y="60" width="315" height="715" as="geometry"/>
        </mxCell>
        <mxCell id="col3_title" value="&lt;b style=&quot;font-size:11px;color:#15803D;&quot;&gt;📦 Workload Spoke Projects (Production Workloads)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:9px;color:#16A34A;&quot;&gt;Multi-Tenant Isolated VPC Spokes&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="655" y="64" width="295" height="24" as="geometry"/>
        </mxCell>

        <!-- 3.1 GKE Autopilot Subnet -->
        <mxCell id="card_gke_spoke" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="655" y="92" width="295" height="205" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_gke_hdr" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;☸️ GKE Autopilot Subnet (10.10.0.0/20)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Pods: 10.20.0.0/16 • Services: 10.30.0.0/20&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=top;padding=4;" vertex="1" parent="1">
          <mxGeometry x="660" y="94" width="285" height="30" as="geometry"/>
        </mxCell>
        <!-- Mini Node Pools / Control Plane / DB inside GKE -->
        <mxCell id="sub_gke_nodepool" value="&lt;b style=&quot;font-size:9px;color:#15803D;&quot;&gt;Node Pools&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#64748B;&quot;&gt;System + User&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#86EFAC;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="665" y="132" width="85" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="sub_gke_control" value="&lt;b style=&quot;font-size:9px;color:#1E40AF;&quot;&gt;Control Plane&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#64748B;&quot;&gt;Private Master&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="760" y="132" width="85" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="sub_gke_db" value="&lt;b style=&quot;font-size:9px;color:#9333EA;&quot;&gt;Database&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#64748B;&quot;&gt;Cloud SQL PSC&lt;/span&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=6;fillColor=#FAF5FF;strokeColor=#E9D5FF;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="855" y="132" width="85" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_gke_desc" value="&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Shielded GKE Nodes with Workload Identity Federation &amp;amp; Datapath V2&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="660" y="248" width="285" height="36" as="geometry"/>
        </mxCell>

        <!-- 3.2 Serverless Direct VPC Egress Subnet -->
        <mxCell id="card_serverless_spoke" value="&lt;table style=&quot;width:100%;text-align:left;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;⚡ Serverless Direct VPC Egress Subnet&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9.5px;color:#334155;line-height:1.3;padding-top:4px;&quot;&gt;• Cloud Run Functions &amp;amp; Microservices&lt;br&gt;• Direct VPC Egress without Connector Bottlenecks&lt;br&gt;• Internal Load Balancing &amp;amp; Private DNS Resolution&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="655" y="310" width="295" height="120" as="geometry"/>
        </mxCell>

        <!-- 3.3 Private Services Access (PSA) -->
        <mxCell id="card_psa" value="&lt;table style=&quot;width:100%;text-align:left;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;🔗 Private Services Access (PSA)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9.5px;color:#334155;line-height:1.3;padding-top:4px;&quot;&gt;• Cloud SQL Multi-AZ PostgreSQL &amp;amp; Redis Mesh&lt;br&gt;• Allocated IP Range: &lt;b style=&quot;color:#15803D;&quot;&gt;10.20.0.0/16&lt;/b&gt;&lt;br&gt;• Zero Exposure to Public Internet&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="655" y="445" width="295" height="115" as="geometry"/>
        </mxCell>

        <!-- 3.4 Vertex AI Gemini 3.7 Endpoints -->
        <mxCell id="card_vertex_endpoints" value="&lt;table style=&quot;width:100%;text-align:left;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#7E22CE;&quot;&gt;✨ Vertex AI Gemini 3.7 Private Endpoints&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9.5px;color:#334155;line-height:1.3;padding-top:4px;&quot;&gt;• VPC-SC Protected Internal Peering Gateway&lt;br&gt;• Zero Public Internet Traversal (100% Private)&lt;br&gt;• Sub-50ms Foundation Model Inference Latency&lt;br&gt;• CMEK Hardware Encryption for Embeddings&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#A855F7;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="655" y="575" width="295" height="185" as="geometry"/>
        </mxCell>

        <!-- Column 3 Internal Connectors -->
        <mxCell id="edge_gke_to_serverless" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#16A34A;strokeWidth=1.2;html=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="card_gke_spoke" target="card_serverless_spoke">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_serverless_to_psa" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#16A34A;strokeWidth=1.2;html=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="card_serverless_spoke" target="card_psa">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_psa_to_vertex" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#16A34A;strokeWidth=1.2;html=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="card_psa" target="card_vertex_endpoints">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>


        <!-- ==================== COLUMN 4: ZERO-TRUST PERIMETER (VPC-SC & IAM) ==================== -->
        <mxCell id="col4_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#A855F7;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="975" y="60" width="315" height="715" as="geometry"/>
        </mxCell>
        <mxCell id="col4_title" value="&lt;b style=&quot;font-size:11px;color:#7E22CE;&quot;&gt;🔑 Zero-Trust Perimeter (VPC-SC &amp;amp; IAM)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:9px;color:#9333EA;&quot;&gt;Enforced Security &amp;amp; Boundary Controls&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="985" y="64" width="295" height="24" as="geometry"/>
        </mxCell>

        <!-- 4.1 VPC Service Controls (VPC-SC) -->
        <mxCell id="card_vpc_sc" value="&lt;table style=&quot;width:100%;text-align:left;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;🛡️ VPC Service Controls (VPC-SC)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9px;color:#334155;line-height:1.3;padding-top:4px;&quot;&gt;• Encapsulating Storage, BigQuery &amp;amp; Vertex AI&lt;br&gt;• Data Exfiltration &amp;amp; Token Hijacking Prevention&lt;br&gt;• Declarative Perimeter with Dual Ingress/Egress Rules&lt;br&gt;• Context-Aware Access Policies (IP, Identity, Cert)&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9333EA;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="985" y="92" width="295" height="150" as="geometry"/>
        </mxCell>

        <!-- 4.2 Cloud KMS HSM Dual Key Rings -->
        <mxCell id="card_kms_hsm" value="&lt;table style=&quot;width:100%;text-align:left;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;🔐 Cloud KMS HSM Dual Key Rings&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9.5px;color:#334155;line-height:1.3;padding-top:4px;&quot;&gt;• FIPS 140-2 Level 3 Hardware Security Modules&lt;br&gt;• Automated 90-Day Key Rotation &amp;amp; CMEK Policy&lt;br&gt;• Separation of Duties between SecOps and DevOps&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9333EA;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="985" y="256" width="295" height="115" as="geometry"/>
        </mxCell>

        <!-- 4.3 Security Command Center (SCC) -->
        <mxCell id="card_scc_net" value="&lt;table style=&quot;width:100%;text-align:left;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;🛡️ Security Command Center (SCC)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9.5px;color:#334155;line-height:1.3;padding-top:4px;&quot;&gt;• 19+ AI-Driven Threat Detectors &amp;amp; Attack Paths&lt;br&gt;• Continuous CIS Benchmark Compliance Audit&lt;br&gt;• Real-time Anomaly Alerts to Chronicle SIEM&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9333EA;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="985" y="384" width="295" height="120" as="geometry"/>
        </mxCell>

        <!-- 4.4 Organization Policy Guardrails -->
        <mxCell id="card_org_policies" value="&lt;table style=&quot;width:100%;text-align:left;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;📋 Organization Policy Guardrails&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9px;color:#334155;line-height:1.35;padding-top:4px;&quot;&gt;• &lt;b&gt;constraints/compute.restrictVpcPeering&lt;/b&gt;&lt;br&gt;• &lt;b&gt;constraints/compute.requireShieldedVm&lt;/b&gt;&lt;br&gt;• &lt;b&gt;constraints/gcp.resourceLocations&lt;/b&gt; (US Regions)&lt;br&gt;• &lt;b&gt;constraints/iam.disableServiceAccountKeyCreation&lt;/b&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9333EA;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="985" y="518" width="295" height="242" as="geometry"/>
        </mxCell>

        <!-- Column 4 Internal Connectors -->
        <mxCell id="edge_vpcsc_to_kms" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#9333EA;strokeWidth=1.2;html=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="card_vpc_sc" target="card_kms_hsm">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_kms_to_scc" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#9333EA;strokeWidth=1.2;html=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="card_kms_hsm" target="card_scc_net">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_scc_to_org" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#9333EA;strokeWidth=1.2;html=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="card_scc_net" target="card_org_policies">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>


        <!-- ==================== COLUMN 5: OBSERVABILITY & MANAGEMENT ==================== -->
        <mxCell id="col5_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#94A3B8;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1305" y="60" width="270" height="715" as="geometry"/>
        </mxCell>
        <mxCell id="col5_title" value="&lt;b style=&quot;font-size:11px;color:#334155;&quot;&gt;📊 Observability &amp;amp; Management&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:9px;color:#64748B;&quot;&gt;Real-Time Telemetry &amp;amp; Drift Guard&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1315" y="64" width="250" height="24" as="geometry"/>
        </mxCell>

        <!-- 5.1 Cloud Logging & Monitoring -->
        <mxCell id="card_cloud_ops" value="&lt;table style=&quot;width:100%;text-align:left;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;📈 Cloud Logging &amp;amp; Monitoring&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9.5px;color:#334155;line-height:1.3;padding-top:4px;&quot;&gt;• VPC Flow Logs Aggregation (100% Sample)&lt;br&gt;• Network Topology Latency Heatmaps&lt;br&gt;• Cloud Audit Logs with Tamper-Proof Storage&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#64748B;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1315" y="92" width="250" height="120" as="geometry"/>
        </mxCell>

        <!-- 5.2 Cloud Asset Inventory -->
        <mxCell id="card_asset_inventory" value="&lt;table style=&quot;width:100%;text-align:left;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;🗂️ Cloud Asset Inventory&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9.5px;color:#334155;line-height:1.3;padding-top:4px;&quot;&gt;• Real-time Resource Graph Analysis&lt;br&gt;• Drift Detection against Baseline State&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#64748B;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1315" y="224" width="250" height="240" as="geometry"/>
        </mxCell>

        <!-- Resource Graph Mesh inside Asset Inventory -->
        <mxCell id="sub_graph_node1" value="&lt;b style=&quot;font-size:8.5px;color:#1E40AF;&quot;&gt;VPC Hub&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1335" y="300" width="65" height="32" as="geometry"/>
        </mxCell>
        <mxCell id="sub_graph_node2" value="&lt;b style=&quot;font-size:8.5px;color:#15803D;&quot;&gt;GKE Spoke&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#86EFAC;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1435" y="300" width="75" height="32" as="geometry"/>
        </mxCell>
        <mxCell id="sub_graph_node3" value="&lt;b style=&quot;font-size:8.5px;color:#9333EA;&quot;&gt;PSC Endpoint&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#E9D5FF;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1335" y="370" width="85" height="32" as="geometry"/>
        </mxCell>
        <mxCell id="sub_graph_node4" value="&lt;b style=&quot;font-size:8.5px;color:#B45309;&quot;&gt;BigQuery&lt;/b&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=4;fillColor=#FFFBEB;strokeColor=#FDE68A;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1455" y="365" width="70" height="42" as="geometry"/>
        </mxCell>
        <mxCell id="sub_arr_g1" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;endArrow=none;strokeColor=#94A3B8;strokeWidth=1;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="sub_graph_node1" target="sub_graph_node2">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="sub_arr_g2" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;endArrow=none;strokeColor=#94A3B8;strokeWidth=1;html=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="sub_graph_node2" target="sub_graph_node4">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="sub_arr_g3" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;endArrow=none;strokeColor=#94A3B8;strokeWidth=1;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="sub_graph_node3" target="sub_graph_node4">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- 5.3 Config Sync & Policy Controller -->
        <mxCell id="card_config_sync" value="&lt;table style=&quot;width:100%;text-align:left;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;⚙️ Config Sync &amp;amp; Policy Controller&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9px;color:#334155;line-height:1.35;padding-top:4px;&quot;&gt;• GitOps Continuous Declarative Reconciliation&lt;br&gt;• OPA Gatekeeper Admission Webhooks&lt;br&gt;• Pre-deployment Guardrail Validation in CI/CD&lt;br&gt;• Automated Rollback upon Policy Violation&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#64748B;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1315" y="478" width="250" height="282" as="geometry"/>
        </mxCell>

        <!-- Column 5 Internal Connectors -->
        <mxCell id="edge_ops_to_asset" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#64748B;strokeWidth=1.2;html=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="card_cloud_ops" target="card_asset_inventory">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_asset_to_config" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#64748B;strokeWidth=1.2;html=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="card_asset_inventory" target="card_config_sync">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>


        <!-- ==================== CROSS-COLUMN INTER-TIER CONNECTORS ==================== -->
        <!-- Interconnect -> Cloud Router -->
        <mxCell id="arr_interconnect_to_router" value="&lt;b style=&quot;font-size:8.5px;color:#1E40AF;&quot;&gt;100G Line-Rate&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#2563EB;strokeWidth=1.5;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#93C5FD;padding=2;" edge="1" parent="1" source="card_dedicated_interconnect" target="card_cloud_router">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="308" y="274"/>
              <mxPoint x="308" y="152"/>
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- Cloud Router -> Workload Spoke Projects -->
        <mxCell id="arr_router_to_spoke" value="&lt;b style=&quot;font-size:8.5px;color:#15803D;&quot;&gt;Shared VPC Transit&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#16A34A;strokeWidth=1.2;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#86EFAC;padding=2;" edge="1" parent="1" source="card_cloud_router" target="card_gke_spoke">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="635" y="152"/>
              <mxPoint x="635" y="194"/>
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- PSC Hub -> Vertex Endpoints -->
        <mxCell id="arr_psc_to_vertex" value="&lt;b style=&quot;font-size:8.5px;color:#7E22CE;&quot;&gt;Private Service Connect&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#7E22CE;strokeWidth=1.2;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#E9D5FF;padding=2;" edge="1" parent="1" source="card_psc_hub" target="card_vertex_endpoints">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="635" y="624"/>
              <mxPoint x="635" y="667"/>
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- Spoke Projects -> VPC Service Controls -->
        <mxCell id="arr_spoke_to_vpcsc" value="&lt;b style=&quot;font-size:8.5px;color:#7E22CE;&quot;&gt;Perimeter Enforced&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#9333EA;strokeWidth=1.2;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#E9D5FF;padding=2;" edge="1" parent="1" source="card_serverless_spoke" target="card_vpc_sc">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="965" y="370"/>
              <mxPoint x="965" y="167"/>
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- VPC Service Controls -> Observability -->
        <mxCell id="arr_vpcsc_to_ops" value="&lt;b style=&quot;font-size:8.5px;color:#64748B;&quot;&gt;Telemetry Feed&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#64748B;strokeWidth=1.2;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=2;" edge="1" parent="1" source="card_vpc_sc" target="card_cloud_ops">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1295" y="167"/>
              <mxPoint x="1295" y="152"/>
            </Array>
          </mxGeometry>
        </mxCell>


        <!-- ==================== FOOTER LEGEND ==================== -->
        <mxCell id="footer_legend" value="&lt;table style=&quot;width:100%;font-size:9.5px;color:#334155;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td&gt;&lt;b style=&quot;color:#0F172A;&quot;&gt;Landing Zone Architecture:&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🔵 &lt;b&gt;Dedicated Interconnect 100G&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🔷 &lt;b&gt;Hub &amp;amp; Spoke Shared VPC&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🟢 &lt;b&gt;Microservices &amp;amp; AI Subnets&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🟣 &lt;b&gt;VPC Service Controls (VPC-SC) Perimeter&lt;/b&gt;&lt;/td&gt;&lt;td&gt;✨ &lt;b style=&quot;color:#1D4ED8;&quot;&gt;Powered by Gemini Platform&lt;/b&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="785" width="1550" height="36" as="geometry"/>
        </mxCell>

        <mxCell id="footer_copyright" value="&lt;span style=&quot;font-size:8px;color:#94A3B8;&quot;&gt;© 2026 Google LLC | Confidential &amp;amp; Proprietary Enterprise Architecture Blueprint&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="825" width="400" height="14" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
