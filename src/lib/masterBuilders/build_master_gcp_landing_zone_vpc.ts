export function buildGcpLandingZoneVpcXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="gcp_landing_zone_vpc" name="Google Cloud Infrastructure: Landing Zone &amp; Shared VPC Topology (P4-SEC-P-02)">
    <mxGraphModel dx="1760" dy="1050" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1780" pageHeight="1050" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- ==================== HEADER BANNER ==================== -->
        <mxCell id="top_logo" value="&lt;span style=&quot;font-size:26px;&quot;&gt;🌐 🔒&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="35" y="14" width="40" height="40" as="geometry"/>
        </mxCell>
        <mxCell id="main_title" value="&lt;b style=&quot;font-size:18px;color:#0F172A;letter-spacing:-0.2px;&quot;&gt;GOOGLE CLOUD INFRASTRUCTURE: ENTERPRISE LANDING ZONE &amp;amp; SHARED VPC (P4-SEC-P-02)&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="85" y="12" width="1350" height="24" as="geometry"/>
        </mxCell>
        <mxCell id="main_subtitle" value="&lt;span style=&quot;font-size:11.5px;color:#475569;font-weight:600;&quot;&gt;Zero-Trust Hub-and-Spoke Mesh: Dedicated 100G Interconnect, Cloud Router BGP, PSC Hub, Service Perimeters &amp;amp; Multi-Region Spokes&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="85" y="36" width="1350" height="20" as="geometry"/>
        </mxCell>
        
        <mxCell id="top_gemini_badge" value="&lt;b style=&quot;font-size:14px;color:#2563EB;&quot;&gt;Gemini Platform&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Autonomous NetOps&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1540" y="14" width="190" height="44" as="geometry"/>
        </mxCell>

        <!-- ==================== COLUMN 1: ON-PREMISE & INTERCONNECT ==================== -->
        <mxCell id="col1_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#94A3B8;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="35" y="75" width="380" height="910" as="geometry"/>
        </mxCell>
        <mxCell id="col1_title" value="&lt;b style=&quot;font-size:12px;color:#334155;&quot;&gt;🏢 On-Premise &amp;amp; Transit Interconnect&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;spacingLeft=10;" vertex="1" parent="1">
          <mxGeometry x="40" y="82" width="370" height="25" as="geometry"/>
        </mxCell>

        <mxCell id="card_onprem_dc" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#0F172A;&quot;&gt;🏢 Corporate On-Premise Data Center&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#334155;line-height:1.4;padding-top:4px;&quot;&gt;• Core Spine/Leaf Switches with ECMP Routing&lt;br&gt;• BGP ASN 65001 (Active/Active Dynamic Peering)&lt;br&gt;• Redundant IPsec VPN Backup Tunnels&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#64748B;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="55" y="125" width="340" height="110" as="geometry"/>
        </mxCell>

        <mxCell id="card_dedicated_interconnect" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#1E40AF;&quot;&gt;⚡ Dedicated Cloud Interconnect (100Gbps)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#334155;line-height:1.4;padding-top:4px;&quot;&gt;• Dual 100G Cross-Connects (Equinix / CoreSite)&lt;br&gt;• IEEE 802.1AE MACsec Layer-2 Wire Encryption&lt;br&gt;• Sub-2ms Low Latency SLA (99.99% Availability)&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="55" y="260" width="340" height="115" as="geometry"/>
        </mxCell>

        <mxCell id="card_ncc" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#0F172A;&quot;&gt;🌐 Network Connectivity Center (NCC Hub)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#334155;line-height:1.4;padding-top:4px;&quot;&gt;• Global Full-Mesh Transit Backbone&lt;br&gt;• Automated Route Exchange &amp;amp; Dynamic Filtering&lt;br&gt;• Multi-Cloud WAN &amp;amp; SD-WAN Spoke Aggregation&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#64748B;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="55" y="400" width="340" height="115" as="geometry"/>
        </mxCell>

        <!-- ==================== COLUMN 2: HUB PROJECT & EDGE SECURITY ==================== -->
        <mxCell id="col2_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="455" y="75" width="400" height="910" as="geometry"/>
        </mxCell>
        <mxCell id="col2_title" value="&lt;b style=&quot;font-size:12px;color:#1D4ED8;&quot;&gt;🌐 Shared VPC Hub &amp;amp; Ingress Security&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;spacingLeft=10;" vertex="1" parent="1">
          <mxGeometry x="460" y="82" width="390" height="25" as="geometry"/>
        </mxCell>

        <mxCell id="card_cloud_router" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#0F172A;&quot;&gt;🔀 Cloud Router &amp;amp; Dynamic BGP Engine&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#334155;line-height:1.4;padding-top:4px;&quot;&gt;• Global Routing Mode (Google ASN 16550)&lt;br&gt;• Bidirectional Forwarding Detection (BFD 300ms)&lt;br&gt;• Custom Advertised Prefix Policies &amp;amp; MED Values&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="475" y="125" width="360" height="110" as="geometry"/>
        </mxCell>

        <mxCell id="card_app_lb" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#1D4ED8;&quot;&gt;🛡️ Global External App LB &amp;amp; Cloud Armor&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#334155;line-height:1.4;padding-top:4px;&quot;&gt;• Anycast Ingress Virtual IP with TLS 1.3 Termination&lt;br&gt;• DDoS Adaptive Protection &amp;amp; OWASP Top 10 Rules&lt;br&gt;• Bot Defense with reCAPTCHA Enterprise Tokens&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="shape=hexagon;perimeter=hexagonPerimeter2;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#1D4ED8;strokeWidth=1.8;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="475" y="260" width="360" height="120" as="geometry"/>
        </mxCell>

        <mxCell id="card_psc_hub" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#1D4ED8;&quot;&gt;🔌 Private Service Connect (PSC) Hub&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#334155;line-height:1.4;padding-top:4px;&quot;&gt;• Private Restricted Endpoints for Google APIs&lt;br&gt;• Transitive Consumer-to-Producer Service Peering&lt;br&gt;• Zero Public IP Addresses on Compute Workloads&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="475" y="405" width="360" height="110" as="geometry"/>
        </mxCell>

        <!-- ==================== COLUMN 3: SERVICE PROJECT SPOKES (PROD & NON-PROD) ==================== -->
        <mxCell id="col3_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#4ADE80;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="895" y="75" width="410" height="910" as="geometry"/>
        </mxCell>
        <mxCell id="col3_title" value="&lt;b style=&quot;font-size:12px;color:#15803D;&quot;&gt;☸️ Production Service Spoke (GKE &amp;amp; Workloads)&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;spacingLeft=10;" vertex="1" parent="1">
          <mxGeometry x="900" y="82" width="400" height="25" as="geometry"/>
        </mxCell>

        <mxCell id="card_gke_prod" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#15803D;&quot;&gt;GKE Enterprise Autopilot (Private Cluster)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.4;padding-top:4px;&quot;&gt;• Pod Subnet: 10.104.0.0/14 (VPC Native Alias IPs)&lt;br&gt;• Anthos / Istio Service Mesh with Mutual TLS&lt;br&gt;• Workload Identity Federation &amp;amp; Binary Auth&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="915" y="125" width="370" height="115" as="geometry"/>
        </mxCell>

        <mxCell id="card_cloudsql_prod" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#15803D;&quot;&gt;Cloud SQL Enterprise Plus (Private IP)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.4;padding-top:4px;&quot;&gt;• PostgreSQL 16 Multi-AZ Automated Failover&lt;br&gt;• Private Services Access (PSA) Peering Subnet&lt;br&gt;• Customer-Managed Encryption Keys (Cloud KMS)&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="915" y="265" width="370" height="115" as="geometry"/>
        </mxCell>

        <!-- ==================== COLUMN 4: GOVERNANCE & VPC SERVICE CONTROLS ==================== -->
        <mxCell id="col4_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#D8B4FE;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1345" y="75" width="375" height="910" as="geometry"/>
        </mxCell>
        <mxCell id="col4_title" value="&lt;b style=&quot;font-size:12px;color:#6B21A8;&quot;&gt;🛡️ VPC Service Controls &amp;amp; Security Perimeter&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;spacingLeft=10;" vertex="1" parent="1">
          <mxGeometry x="1350" y="82" width="365" height="25" as="geometry"/>
        </mxCell>

        <mxCell id="card_vpc_sc" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#6B21A8;&quot;&gt;VPC Service Controls Perimeter (VPC-SC)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.4;padding-top:4px;&quot;&gt;• Prevents Data Exfiltration from Cloud Storage &amp;amp; BQ&lt;br&gt;• Ingress &amp;amp; Egress Security Rule Enforcement&lt;br&gt;• Access Context Manager (Device &amp;amp; IP Binding)&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#C084FC;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1360" y="125" width="345" height="115" as="geometry"/>
        </mxCell>

        <mxCell id="card_scc_premium" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#6B21A8;&quot;&gt;Security Command Center (SCC Enterprise)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.4;padding-top:4px;&quot;&gt;• Real-time Threat Detection &amp;amp; Container Anomaly Scans&lt;br&gt;• Automated Compliance Posture Auditing (CIS, NIST)&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F3E8FF;strokeColor=#7E22CE;strokeWidth=2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1360" y="265" width="345" height="115" as="geometry"/>
        </mxCell>

        <!-- Connectors -->
        <mxCell id="e1" value="1. 100G MACsec" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#2563EB;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#93C5FD;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="card_onprem_dc" target="card_dedicated_interconnect">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e2" value="2. BGP Peering" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#2563EB;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#93C5FD;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="card_dedicated_interconnect" target="card_cloud_router">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e3" value="3. Dynamic Routes" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#16A34A;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#86EFAC;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="card_cloud_router" target="card_gke_prod">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e4" value="4. Private Ingress" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#2563EB;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#93C5FD;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="card_app_lb" target="card_psc_hub">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e5" value="5. PSC Peering" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#16A34A;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#86EFAC;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="card_psc_hub" target="card_gke_prod">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e6" value="6. Enforce Perimeter" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#7E22CE;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#D8B4FE;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="card_gke_prod" target="card_vpc_sc">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
