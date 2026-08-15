export function buildGcpLandingZoneVpcXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="gcp_landing_zone_vpc" name="GCP Landing Zone &amp; Shared VPC Network Map (P4-SEC-P-02)">
    <mxGraphModel dx="1400" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1400" pageHeight="720" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- Header Banner -->
        <mxCell id="top_logo" value="&lt;span style=&quot;font-size:24px;&quot;&gt;🌐&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="10" width="35" height="35" as="geometry"/>
        </mxCell>
        <mxCell id="main_title" value="&lt;b style=&quot;font-size:18px;color:#0F172A;&quot;&gt;Google Cloud INFRASTRUCTURE: LANDING ZONE &amp;amp; SHARED VPC TOPOLOGY&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="65" y="10" width="1050" height="24" as="geometry"/>
        </mxCell>
        <mxCell id="main_subtitle" value="&lt;span style=&quot;font-size:11px;color:#475569;font-weight:600;&quot;&gt;Physical Zero-Trust Network Fabric: Hub-and-Spoke Shared VPC, 100G Interconnect, Cloud Router BGP, PSC &amp;amp; VPC Service Controls&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="65" y="32" width="1050" height="18" as="geometry"/>
        </mxCell>
        <mxCell id="top_gemini_badge" value="&lt;b style=&quot;font-size:14px;color:#2563EB;&quot;&gt;Gemini 3.7 Flash&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;NetSec Engine&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1220" y="10" width="140" height="36" as="geometry"/>
        </mxCell>

        <!-- Column 1: On-Premises & Transit Interconnect -->
        <mxCell id="col1_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#94A3B8;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="25" y="65" width="280" height="580" as="geometry"/>
        </mxCell>
        <mxCell id="col1_title" value="&lt;b style=&quot;font-size:11px;color:#334155;&quot;&gt;🏢 Corporate DC &amp;amp; Transit Interconnect&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="35" y="72" width="260" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="node_onprem_edge" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Enterprise Edge Routers&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;BGP ASN: 65001 (Dual Active)&lt;br&gt;10.0.0.0/8 Corporate Subnets&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#64748B;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="115" width="250" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_dedicated_interconnect" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Dedicated Cloud Interconnect 100G&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#2563EB;&quot;&gt;Dual 100G Fiber Demarcation (Equinix)&lt;br&gt;MACsec Layer 2 Encryption &amp;amp; 99.99% SLA&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="235" width="250" height="85" as="geometry"/>
        </mxCell>

        <mxCell id="node_ha_vpn_backup" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Cloud HA VPN (IPsec Backup)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Dual Tunnels @ 3Gbps per Tunnel&lt;br&gt;Automated BGP Failover (MED: 200)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#64748B;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="365" width="250" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_sdwan_branch" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Network Connectivity Center (NCC)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Global Transit Hub &amp;amp; Branch Meshing&lt;br&gt;Multi-Cloud AWS/Azure Spokes&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#64748B;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="485" width="250" height="75" as="geometry"/>
        </mxCell>

        <!-- Column 2: Hub Project (Shared Networking Core) -->
        <mxCell id="col2_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="330" y="65" width="310" height="580" as="geometry"/>
        </mxCell>
        <mxCell id="col2_title" value="&lt;b style=&quot;font-size:11px;color:#1D4ED8;&quot;&gt;🌐 Shared VPC Host Project (Hub)&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="340" y="72" width="290" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="node_cloud_router" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Cloud Router &amp;amp; BGP Engine&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Google ASN: 16550 | Multi-NIC Transit&lt;br&gt;Dynamic Route Propagation to Spokes&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="345" y="115" width="280" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_cloud_nat" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Cloud NAT &amp;amp; Cloud DNS&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;High-Throughput Egress Gateway&lt;br&gt;Private DNS Peering &amp;amp; Forwarding Zones&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="345" y="225" width="280" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_cloud_armor_waf" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Global External App LB &amp;amp; Cloud Armor&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Anycast IP, DDoS Protection &amp;amp; WAF Rules&lt;br&gt;mTLS 1.3 Edge Termination&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="345" y="335" width="280" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_psc_gateway" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Private Service Connect (PSC) Hub&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#1D4ED8;&quot;&gt;10.100.0.0/24 Consumer Endpoints&lt;br&gt;Direct Private Transit to Google APIs&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#1D4ED8;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="345" y="445" width="280" height="75" as="geometry"/>
        </mxCell>

        <!-- Column 3: Service Project (Workloads & Compute Spokes) -->
        <mxCell id="col3_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#22C55E;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="665" y="65" width="330" height="580" as="geometry"/>
        </mxCell>
        <mxCell id="col3_title" value="&lt;b style=&quot;font-size:11px;color:#15803D;&quot;&gt;🚀 Service Project: Production Workloads&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="675" y="72" width="310" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="node_gke_subnet" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;GKE Autopilot Subnet (10.10.0.0/20)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Secondary Pod Range: 10.20.0.0/16&lt;br&gt;Secondary Service Range: 10.30.0.0/20&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="680" y="115" width="300" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_cloud_run_subnet" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Serverless Direct VPC Egress Subnet&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;10.8.0.0/28 Micro-Subnet&lt;br&gt;Cloud Run Functions &amp;amp; Agent Workers&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="680" y="225" width="300" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_data_psa_subnet" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Private Services Access (PSA) Peering&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;AlloyDB PostgreSQL &amp;amp; Cloud SQL HA&lt;br&gt;Allocated IP Range: 10.50.0.0/16&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="680" y="335" width="300" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_vertex_inference" value="&lt;b style=&quot;font-size:11px;color:#15803D;&quot;&gt;Vertex AI Gemini 3.7 Endpoints&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;VPC-SC Protected Internal Routing&lt;br&gt;Zero Public Internet Exposure&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#15803D;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="680" y="445" width="300" height="75" as="geometry"/>
        </mxCell>

        <!-- Column 4: Zero-Trust Security Perimeter & VPC-SC -->
        <mxCell id="col4_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#A855F7;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1020" y="65" width="340" height="580" as="geometry"/>
        </mxCell>
        <mxCell id="col4_title" value="&lt;b style=&quot;font-size:11px;color:#7E22CE;&quot;&gt;🛡️ Zero-Trust Perimeter (VPC-SC &amp;amp; IAM)&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1030" y="72" width="320" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="node_vpc_sc_perimeter" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;VPC Service Controls (VPC-SC)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Encapsulating Storage, BigQuery &amp;amp; Vertex AI&lt;br&gt;Data Exfiltration &amp;amp; Stolen Credential Block&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9333EA;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1035" y="115" width="310" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_cloud_kms_cmek" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Cloud KMS HSM Dual Key Rings&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;FIPS 140-2 Level 3 Hardware Security&lt;br&gt;Automated 90-Day Rotation Policy&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9333EA;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1035" y="225" width="310" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_scc_premium" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Security Command Center (SCC)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;AI Threat Detection &amp;amp; Attack Paths&lt;br&gt;Continuous CIS GCP Benchmark Scans&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9333EA;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1035" y="335" width="310" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_org_policies" value="&lt;b style=&quot;font-size:11px;color:#7E22CE;&quot;&gt;Organization Policy Guardrails&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Restrict Public IPs, Require Shielded VMs&lt;br&gt;Enforce CMEK &amp;amp; Regional Resource Locations&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F3E8FF;strokeColor=#7E22CE;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1035" y="445" width="310" height="75" as="geometry"/>
        </mxCell>

        <!-- Connecting Edges -->
        <mxCell id="edge1" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=2;" edge="1" parent="1" source="node_dedicated_interconnect" target="node_cloud_router">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge2" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=2;" edge="1" parent="1" source="node_cloud_router" target="node_gke_subnet">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge3" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=2;" edge="1" parent="1" source="node_cloud_armor_waf" target="node_cloud_run_subnet">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge4" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16A34A;strokeWidth=2;" edge="1" parent="1" source="node_gke_subnet" target="node_data_psa_subnet">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge5" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16A34A;strokeWidth=2;" edge="1" parent="1" source="node_cloud_run_subnet" target="node_vertex_inference">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge6" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#9333EA;strokeWidth=2;dashed=1;" edge="1" parent="1" source="node_vertex_inference" target="node_vpc_sc_perimeter">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge7" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#9333EA;strokeWidth=2;dashed=1;" edge="1" parent="1" source="node_data_psa_subnet" target="node_cloud_kms_cmek">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- Footer Legend -->
        <mxCell id="footer_legend" value="&lt;span style=&quot;font-size:9.5px;color:#475569;&quot;&gt;&lt;b&gt;Landing Zone Architecture:&lt;/b&gt; 🔵 Dedicated Interconnect 100G &amp;nbsp;|&amp;nbsp; 🌐 Hub-and-Spoke Shared VPC &amp;nbsp;|&amp;nbsp; 🟢 Microservice &amp;amp; AI Subnets &amp;nbsp;|&amp;nbsp; 🟣 VPC Service Controls (VPC-SC) Perimeter &amp;nbsp;|&amp;nbsp; ⚡ Powered by Gemini 3.7 Flash&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="655" width="1335" height="30" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
