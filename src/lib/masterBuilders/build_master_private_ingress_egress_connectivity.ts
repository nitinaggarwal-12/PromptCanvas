export function buildPrivateIngressEgressConnectivityXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="private_ingress_egress_conn" name="Private Ingress, Egress &amp; Service Connectivity Architecture (NEW-NET-06)">
    <mxGraphModel dx="1600" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="950" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- Top Header Banner -->
        <mxCell id="title_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="16" width="1540" height="54" as="geometry"/>
        </mxCell>
        <mxCell id="main_title" value="&lt;b style=&quot;font-size:17px;color:#0F172A;&quot;&gt;Private Ingress, Egress &amp;amp; Service Connectivity Architecture (NEW-NET-06 / #56)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:11px;color:#475569;font-weight:600;&quot;&gt;Cloud Armor WAF • Internal Application Load Balancer • Cloud NAT Gateway • Private Service Connect (PSC) &amp;amp; DNS Firewall&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="45" y="18" width="1150" height="50" as="geometry"/>
        </mxCell>
        <mxCell id="top_badge" value="&lt;b style=&quot;font-size:12px;color:#2563EB;&quot;&gt;Zero Public Exposure&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#64748B;&quot;&gt;PSC &amp;amp; Cloud NAT Egress&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1370" y="24" width="180" height="38" as="geometry"/>
        </mxCell>

        <!-- COLUMN 1: PUBLIC & HYBRID INGRESS -->
        <mxCell id="col1_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF2F2;strokeColor=#FCA5A5;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="85" width="240" height="690" as="geometry"/>
        </mxCell>
        <mxCell id="col1_hdr" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;🛡️ INGRESS PERIMETER&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DC2626;strokeColor=#B91C1C;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="30" y="85" width="240" height="32" as="geometry"/>
        </mxCell>
        <mxCell id="card_ext_lb" value="&lt;b style=&quot;font-size:10px;color:#991B1B;&quot;&gt;⚖️ External HTTPS Load Balancer&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;• Global Anycast IP Entrypoint&lt;br&gt;• Cloud Armor WAF &amp;amp; DDoS Shield&lt;br&gt;• SSL Policy (TLS 1.3 Strict)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#F87171;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="45" y="135" width="210" height="80" as="geometry"/>
        </mxCell>
        <mxCell id="card_interconnect_ingress" value="&lt;b style=&quot;font-size:10px;color:#991B1B;&quot;&gt;🏢 Dedicated Interconnect (100G)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;• On-Premises BGP Peering&lt;br&gt;• MACsec L2 Hardware Encryption&lt;br&gt;• Cloud Router High Availability&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#F87171;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="45" y="235" width="210" height="80" as="geometry"/>
        </mxCell>
        <mxCell id="card_dns_firewall" value="&lt;b style=&quot;font-size:10px;color:#991B1B;&quot;&gt;🛡️ Cloud DNS Firewall Rules&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;• C2 Threat Domain Filtering&lt;br&gt;• Internal Split-Horizon Resolution&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#F87171;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="45" y="335" width="210" height="70" as="geometry"/>
        </mxCell>

        <!-- COLUMN 2: INTERNAL SERVICE TRANSIT & PSC -->
        <mxCell id="col2_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="310" y="85" width="370" height="690" as="geometry"/>
        </mxCell>
        <mxCell id="col2_hdr" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;🔗 PRIVATE SERVICE CONNECT (PSC) TRANSIT&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="310" y="85" width="370" height="32" as="geometry"/>
        </mxCell>
        <mxCell id="card_psc_endpoints" value="&lt;b style=&quot;font-size:10px;color:#1E40AF;&quot;&gt;🔌 PSC Consumer Endpoints (10.100.x.x)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;• Private IP bridge to Vertex AI, BigQuery &amp;amp; Cloud Storage APIs&lt;br&gt;• Eliminates NAT traversing for Google Cloud API traffic&lt;br&gt;• Service Directory automatic DNS record provisioning&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#60A5FA;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="325" y="135" width="340" height="80" as="geometry"/>
        </mxCell>
        <mxCell id="card_psc_producers" value="&lt;b style=&quot;font-size:10px;color:#1E40AF;&quot;&gt;🏢 PSC Published Producer Services&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;• Multi-tenant Core Banking API published to Partner VPCs&lt;br&gt;• Service Attachment with Project Accept/Reject Allowlist&lt;br&gt;• Overlapping CIDR support without RFC 1918 subnet clashes&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#60A5FA;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="325" y="235" width="340" height="80" as="geometry"/>
        </mxCell>
        <mxCell id="card_ilb_proxy" value="&lt;b style=&quot;font-size:10px;color:#1E40AF;&quot;&gt;⚖️ Internal Regional Application Load Balancer&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;• L7 Content-based routing across GKE fleets &amp;amp; Cloud Run&lt;br&gt;• Envoy Proxy Subnet (10.128.0.0/24)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#60A5FA;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="325" y="335" width="340" height="70" as="geometry"/>
        </mxCell>

        <!-- COLUMN 3: PRIVATE WORKLOAD VPC NETWORK -->
        <mxCell id="col3_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#86EFAC;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="720" y="85" width="400" height="690" as="geometry"/>
        </mxCell>
        <mxCell id="col3_hdr" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;☸️ PRIVATE APPLICATION VPC SUBNETS&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#16A34A;strokeColor=#15803D;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="720" y="85" width="400" height="32" as="geometry"/>
        </mxCell>
        <mxCell id="card_gke_private_nodes" value="&lt;b style=&quot;font-size:10px;color:#166534;&quot;&gt;☸️ GKE Private Cluster Node Pools (10.10.0.0/20)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;• Private Nodes (Zero Public IPs) &amp;amp; Private Control Plane Endpoint&lt;br&gt;• Alias IP Secondary Subnets for Pods (10.20.0.0/16) &amp;amp; Services&lt;br&gt;• Hierarchical Firewall Policies: Deny-all Ingress Default&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="735" y="135" width="370" height="80" as="geometry"/>
        </mxCell>
        <mxCell id="card_cloud_run_vpc_connector" value="&lt;b style=&quot;font-size:10px;color:#166534;&quot;&gt;🚀 Serverless VPC Access Connector&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;• Cloud Run &amp;amp; Cloud Functions direct private egress route&lt;br&gt;• Direct VPC Egress mode (High-throughput 10Gbps+)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="735" y="235" width="370" height="75" as="geometry"/>
        </mxCell>
        <mxCell id="card_cloud_sql_private" value="&lt;b style=&quot;font-size:10px;color:#166534;&quot;&gt;🗄️ Cloud SQL / Spanner via Private IP Peering&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;• Service Networking VPC Peering for relational databases&lt;br&gt;• Automatic IAM Database Authentication&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="735" y="330" width="370" height="70" as="geometry"/>
        </mxCell>

        <!-- COLUMN 4: CONTROLLED EGRESS & CLOUD NAT -->
        <mxCell id="col4_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#D8B4FE;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1160" y="85" width="410" height="690" as="geometry"/>
        </mxCell>
        <mxCell id="col4_hdr" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;🚀 CONTROLLED EGRESS &amp;amp; OUTBOUND NAT&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#7E22CE;strokeColor=#6B21A8;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1160" y="85" width="410" height="32" as="geometry"/>
        </mxCell>
        <mxCell id="card_cloud_nat" value="&lt;b style=&quot;font-size:10px;color:#6B21A8;&quot;&gt;🌐 Cloud NAT Gateway (Managed Egress)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;• Static Egress Public IPs for 3rd-party SaaS Allowlisting&lt;br&gt;• Endpoint-Independent Mapping &amp;amp; Dynamic Port Allocation&lt;br&gt;• Zero Inbound connections permitted&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D8B4FE;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1180" y="135" width="370" height="80" as="geometry"/>
        </mxCell>
        <mxCell id="card_secure_web_proxy" value="&lt;b style=&quot;font-size:10px;color:#6B21A8;&quot;&gt;🛡️ Secure Web Proxy (SWP)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;• TLS Inspection &amp;amp; URL Category Filtering&lt;br&gt;• Enforces outbound domain allowlists (e.g. *.github.com, *.pypi.org)&lt;br&gt;• Blocks data exfiltration vectors to unapproved buckets&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D8B4FE;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1180" y="235" width="370" height="80" as="geometry"/>
        </mxCell>
        <mxCell id="card_packet_mirroring" value="&lt;b style=&quot;font-size:10px;color:#6B21A8;&quot;&gt;🔍 Packet Mirroring &amp;amp; VPC Flow Logs&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;• 100% Flow Log sampling to Cloud Logging / BigQuery&lt;br&gt;• Intrusion Detection System (Cloud IDS) deep packet inspection&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D8B4FE;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1180" y="335" width="370" height="70" as="geometry"/>
        </mxCell>

        <!-- FLOW CONNECTORS -->
        <mxCell id="edge_ingress_to_psc" value="1. L7 Filtered Ingress" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#DC2626;fontColor=#991B1B;fontSize=10;fontStyle=1;labelBackgroundColor=none;" edge="1" parent="1" source="card_ext_lb" target="card_psc_endpoints"/>
        <mxCell id="edge_psc_to_gke" value="2. Private VPC Routing" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#2563EB;fontColor=#1E40AF;fontSize=10;fontStyle=1;labelBackgroundColor=none;" edge="1" parent="1" source="card_ilb_proxy" target="card_gke_private_nodes"/>
        <mxCell id="edge_gke_to_nat" value="3. Regulated Outbound" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#7E22CE;fontColor=#6B21A8;fontSize=10;fontStyle=1;labelBackgroundColor=none;" edge="1" parent="1" source="card_gke_private_nodes" target="card_cloud_nat"/>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
