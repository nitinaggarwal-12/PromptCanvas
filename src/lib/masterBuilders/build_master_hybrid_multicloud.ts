export function buildHybridMultiCloudXml(): string {
  return `
<mxfile host="app.diagrams.net" modified="2026-08-10T18:45:00.000Z" agent="PromptCanvas" version="21.0.0" type="device">
  <diagram id="hybrid_multicloud_networking" name="Hybrid Multi-Cloud Networking &amp; Gemini Enterprise">
    <mxGraphModel dx="1600" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1560" pageHeight="920" background="#FFFFFF">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- ========================================================================= -->
        <!-- OUTER CANVAS FRAME WITH 4-COLOR GOOGLE BRAND TOP STRIPE -->
        <!-- ========================================================================= -->
        <mxCell id="canvas_card" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CFD8DC;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="15" y="8" width="1530" height="900" as="geometry" />
        </mxCell>

        <!-- Google 4-Color Rainbow Stripe -->
        <mxCell id="stripe_red" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#EA4335;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="18" y="10" width="375" height="4" as="geometry" />
        </mxCell>
        <mxCell id="stripe_yellow" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FBBC04;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="393" y="10" width="375" height="4" as="geometry" />
        </mxCell>
        <mxCell id="stripe_green" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#34A853;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="768" y="10" width="375" height="4" as="geometry" />
        </mxCell>
        <mxCell id="stripe_blue" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#4285F4;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="1143" y="10" width="398" height="4" as="geometry" />
        </mxCell>

        <!-- ========================================================================= -->
        <!-- TOP HEADER: Google Cloud | Hybrid Multi-Cloud Networking & Gemini Enterprise -->
        <!-- ========================================================================= -->
        <mxCell id="hdr_logo" value="&lt;table style=&quot;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;vertical-align:middle;padding-right:10px;&quot;&gt;&lt;img src=&quot;https://api.iconify.design/logos:google-cloud.svg&quot; width=&quot;32&quot; height=&quot;26&quot;/&gt;&lt;/td&gt;&lt;td style=&quot;vertical-align:middle;font-size:22px;font-weight:500;color:#3C4043;font-family:Google Sans,Roboto,sans-serif;&quot;&gt;Google Cloud&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="35" y="20" width="195" height="35" as="geometry" />
        </mxCell>

        <mxCell id="hdr_sep" value="" style="shape=line;strokeColor=#B0BEC5;strokeWidth=1.5;direction=south;" vertex="1" parent="1">
          <mxGeometry x="235" y="20" width="10" height="34" as="geometry" />
        </mxCell>

        <mxCell id="hdr_title" value="&lt;b style=&quot;font-size:20px;color:#202124;font-family:Google Sans,Roboto,sans-serif;&quot;&gt;Hybrid Multi-Cloud Networking &amp;amp; Gemini Enterprise&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="255" y="20" width="850" height="35" as="geometry" />
        </mxCell>

        <!-- ========================================================================= -->
        <!-- ZONE 1: ON-PREMISES / PRIVATE CLOUD (LEFT: X: 35, Width: 290, Height: 755) -->
        <!-- ========================================================================= -->
        <mxCell id="zone_onprem_bg" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#ECEFF1;strokeColor=#CFD8DC;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="35" y="68" width="290" height="760" as="geometry" />
        </mxCell>
        <mxCell id="zone_onprem_title" value="&lt;b style=&quot;font-size:13.5px;color:#202124;font-family:Google Sans,Roboto,sans-serif;&quot;&gt;On-Premises / Private Cloud&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#546E7A;&quot;&gt;CIDR: 10.200.0.0/16 • Dual 100G Demarc • Equinix MMR&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="73" width="280" height="32" as="geometry" />
        </mxCell>

        <!-- On-Premises Data Center Building Shape -->
        <mxCell id="dc_roof" value="" style="triangle;whiteSpace=wrap;html=1;fillColor=#F8F9FA;strokeColor=#78909C;strokeWidth=1.5;direction=north;" vertex="1" parent="1">
          <mxGeometry x="50" y="110" width="260" height="55" as="geometry" />
        </mxCell>
        <mxCell id="dc_body" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#F8F9FA;strokeColor=#78909C;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="50" y="165" width="260" height="650" as="geometry" />
        </mxCell>

        <!-- Building Graphic & Title -->
        <mxCell id="node_dc_icon" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td align=&quot;center&quot;&gt;&lt;img src=&quot;https://api.iconify.design/lucide:building-2.svg&quot; width=&quot;40&quot; height=&quot;40&quot; style=&quot;color:#4285F4;&quot;/&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12.5px;font-weight:bold;color:#202124;padding-top:2px;&quot;&gt;On-Premises Data Center&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#546E7A;&quot;&gt;Tier IV Enterprise Facility • BGP ASN 65001&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="70" y="175" width="220" height="88" as="geometry" />
        </mxCell>

        <!-- Customer Edge Router Box -->
        <mxCell id="node_cpe_card" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;vertical-align:middle;padding-right:6px;&quot;&gt;&lt;img src=&quot;https://api.iconify.design/lucide:move.svg&quot; width=&quot;20&quot; height=&quot;20&quot; style=&quot;color:#1A73E8;&quot;/&gt;&lt;/td&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#1A73E8;text-align:left;&quot;&gt;Customer Edge Router&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#546E7A;font-weight:normal;&quot;&gt;BGP ASN 65001 • BFD 300ms&lt;br&gt;Router ID: 10.200.0.1/32&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#8AB4F8;strokeWidth=1.5;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="60" y="300" width="180" height="66" as="geometry" />
        </mxCell>

        <!-- Customer Edge Router Port -->
        <mxCell id="port_cpe_circle" value="" style="shape=ellipse;whiteSpace=wrap;html=1;fillColor=#1A73E8;strokeColor=#FFFFFF;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="250" y="312" width="42" height="42" as="geometry" />
        </mxCell>
        <mxCell id="port_cpe_icon" value="&lt;img src=&quot;https://api.iconify.design/lucide:move.svg&quot; width=&quot;24&quot; height=&quot;24&quot; style=&quot;color:#FFFFFF;&quot;/&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="254" y="316" width="34" height="34" as="geometry" />
        </mxCell>

        <!-- Servers (VMs / Physical) -->
        <mxCell id="node_servers_stack" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td align=&quot;center&quot;&gt;&lt;img src=&quot;https://api.iconify.design/lucide:server.svg&quot; width=&quot;24&quot; height=&quot;24&quot; style=&quot;color:#37474F;&quot;/&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#202124;padding-top:2px;&quot;&gt;Servers (VMs / Bare Metal)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#546E7A;&quot;&gt;VMware ESXi • Subnet 10.200.10.0/24&lt;br&gt;LACP 802.3ad LAG (2x 100GbE)&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="70" y="395" width="220" height="75" as="geometry" />
        </mxCell>

        <!-- Gemini on Distributed Cloud Hosted Card -->
        <mxCell id="node_gdc_card" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;vertical-align:middle;padding-right:6px;&quot;&gt;&lt;img src=&quot;https://api.iconify.design/lucide:cloud.svg&quot; width=&quot;24&quot; height=&quot;24&quot; style=&quot;color:#1A73E8;&quot;/&gt;&lt;/td&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#1A73E8;text-align:left;&quot;&gt;Gemini on Distributed Cloud&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#546E7A;font-weight:normal;&quot;&gt;Air-Gapped TPU Rack • 10.200.50.0/24&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#8AB4F8;strokeWidth=1.5;align=center;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="58" y="515" width="244" height="80" as="geometry" />
        </mxCell>
        <mxCell id="lbl_gdc_caption" value="&lt;span style=&quot;font-size:9px;color:#546E7A;&quot;&gt;Specialized On-Premise Air-Gapped Deployment&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=top;" vertex="1" parent="1">
          <mxGeometry x="58" y="600" width="244" height="28" as="geometry" />
        </mxCell>

        <!-- ========================================================================= -->
        <!-- ZONE 2: GOOGLE CLOUD (GCP) (CENTER: X: 345, Width: 810, Height: 760) -->
        <!-- ========================================================================= -->
        <mxCell id="zone_gcp_bg" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#F1F3F4;strokeColor=#BCC1C6;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="345" y="68" width="810" height="760" as="geometry" />
        </mxCell>
        <mxCell id="zone_gcp_title" value="&lt;table style=&quot;display:inline-table;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;vertical-align:middle;padding-right:6px;&quot;&gt;&lt;img src=&quot;https://api.iconify.design/logos:google-cloud.svg&quot; width=&quot;22&quot; height=&quot;20&quot;/&gt;&lt;/td&gt;&lt;td style=&quot;vertical-align:middle;font-size:14.5px;font-weight:bold;color:#202124;font-family:Google Sans,Roboto,sans-serif;&quot;&gt;Google Cloud (GCP)&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="360" y="73" width="780" height="25" as="geometry" />
        </mxCell>

        <!-- SUB-BOX A: GLOBAL NETWORK -->
        <mxCell id="box_global_net" value="" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#BDC1C6;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="360" y="105" width="780" height="175" as="geometry" />
        </mxCell>
        <mxCell id="box_global_net_title" value="&lt;b style=&quot;font-size:13px;color:#202124;&quot;&gt;Global Network&lt;/b&gt;&lt;span style=&quot;font-size:9px;color:#5F6368;font-weight:normal;&quot;&gt; (187+ Anycast Edge PoPs • Terabit Andromeda SDN Backbone)&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="370" y="110" width="760" height="20" as="geometry" />
        </mxCell>

        <!-- 1. Points of Presence (PoPs) -->
        <mxCell id="node_pops" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td align=&quot;center&quot;&gt;&lt;img src=&quot;https://api.iconify.design/lucide:globe.svg&quot; width=&quot;32&quot; height=&quot;32&quot; style=&quot;color:#1A73E8;&quot;/&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#202124;padding-top:2px;&quot;&gt;Points of&lt;br&gt;Presence (PoPs)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#5F6368;&quot;&gt;Anycast BGP VIPs&lt;br&gt;Cloud Armor DDoS Shield&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="385" y="138" width="180" height="105" as="geometry" />
        </mxCell>

        <!-- 2. Content Delivery Network (CDN) -->
        <mxCell id="node_cdn" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td align=&quot;center&quot;&gt;&lt;img src=&quot;https://api.iconify.design/lucide:share-2.svg&quot; width=&quot;32&quot; height=&quot;32&quot; style=&quot;color:#1A73E8;&quot;/&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#202124;padding-top:2px;&quot;&gt;Content Delivery&lt;br&gt;Network (CDN)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#5F6368;&quot;&gt;Dynamic Edge Cache&lt;br&gt;TLS 1.3 Termination&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="660" y="138" width="180" height="105" as="geometry" />
        </mxCell>

        <!-- 3. Cloud Load Balancing -->
        <mxCell id="node_clb" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td align=&quot;center&quot;&gt;&lt;img src=&quot;https://api.iconify.design/lucide:network.svg&quot; width=&quot;32&quot; height=&quot;32&quot; style=&quot;color:#1A73E8;&quot;/&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#202124;padding-top:2px;&quot;&gt;Cloud Load&lt;br&gt;Balancing&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#5F6368;&quot;&gt;Global L7 HTTPS / Envoy&lt;br&gt;QUIC &amp;amp; HTTP/3 Support&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="930" y="138" width="180" height="105" as="geometry" />
        </mxCell>

        <!-- SUB-BOX B: REGION: US-CENTRAL1 -->
        <mxCell id="box_region" value="" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#E6F4EA;strokeColor=#81C995;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="360" y="315" width="780" height="505" as="geometry" />
        </mxCell>
        <mxCell id="box_region_title" value="&lt;b style=&quot;font-size:13.5px;color:#137333;&quot;&gt;Region: us-central1 (Iowa)&lt;/b&gt;&lt;span style=&quot;font-size:8.5px;color:#2E7D32;font-weight:normal;&quot;&gt; • Dual-Zone HA (us-central1-a / us-central1-b)&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;spacingLeft=8;" vertex="1" parent="1">
          <mxGeometry x="370" y="320" width="450" height="22" as="geometry" />
        </mxCell>

        <!-- VPC Network Container -->
        <mxCell id="box_gcp_vpc" value="" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#F8FBFF;strokeColor=#4285F4;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="372" y="348" width="470" height="462" as="geometry" />
        </mxCell>
        <mxCell id="box_gcp_vpc_title" value="&lt;table style=&quot;display:inline-table;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;vertical-align:middle;padding-right:6px;&quot;&gt;&lt;img src=&quot;https://api.iconify.design/lucide:boxes.svg&quot; width=&quot;16&quot; height=&quot;16&quot; style=&quot;color:#1A73E8;&quot;/&gt;&lt;/td&gt;&lt;td style=&quot;vertical-align:middle;font-size:12px;font-weight:bold;color:#1A73E8;&quot;&gt;VPC Network: vpc-enterprise-prod (10.100.0.0/16)&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="text;html=1;align=left;verticalAlign=middle;spacingLeft=6;" vertex="1" parent="1">
          <mxGeometry x="380" y="354" width="450" height="20" as="geometry" />
        </mxCell>

        <!-- Subnet 1 Container -->
        <mxCell id="box_subnet1" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#E0E0E0;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="385" y="378" width="145" height="422" as="geometry" />
        </mxCell>
        <mxCell id="lbl_subnet1" value="&lt;b style=&quot;font-size:10px;color:#1A73E8;&quot;&gt;Subnet 1&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#5F6368;&quot;&gt;10.100.10.0/24&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="385" y="382" width="145" height="22" as="geometry" />
        </mxCell>

        <!-- Node GKE -->
        <mxCell id="node_gke" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td align=&quot;center&quot;&gt;&lt;img src=&quot;https://api.iconify.design/logos:kubernetes.svg&quot; width=&quot;28&quot; height=&quot;28&quot;/&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;font-weight:bold;color:#202124;padding-top:2px;&quot;&gt;Google Kubernetes&lt;br&gt;Engine (GKE)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;color:#5F6368;&quot;&gt;Autopilot Private Nodes&lt;br&gt;Pods: 10.104.0.0/14&lt;br&gt;Istio mTLS 1.3 Service Mesh&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="390" y="410" width="135" height="105" as="geometry" />
        </mxCell>

        <!-- Node Network Connectivity Center -->
        <mxCell id="node_ncc" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td align=&quot;center&quot;&gt;&lt;img src=&quot;https://api.iconify.design/lucide:split.svg&quot; width=&quot;24&quot; height=&quot;24&quot; style=&quot;color:#1A73E8;&quot;/&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;font-weight:bold;color:#202124;padding-top:2px;&quot;&gt;Network&lt;br&gt;Connectivity&lt;br&gt;Center (NCC)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;color:#5F6368;&quot;&gt;BGP Router Hub (ASN 16550)&lt;br&gt;Dynamic Spoke Peering&lt;br&gt;Peering IP: 169.254.0.1/30&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="390" y="585" width="135" height="105" as="geometry" />
        </mxCell>

        <!-- Subnet 2 Container -->
        <mxCell id="box_subnet2" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#E0E0E0;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="538" y="378" width="145" height="205" as="geometry" />
        </mxCell>
        <mxCell id="lbl_subnet2" value="&lt;b style=&quot;font-size:10px;color:#1A73E8;&quot;&gt;Subnet 2&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#5F6368;&quot;&gt;10.100.20.0/24&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="538" y="382" width="145" height="22" as="geometry" />
        </mxCell>

        <!-- Node Compute Engine (VMs) -->
        <mxCell id="node_gce" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td align=&quot;center&quot;&gt;&lt;img src=&quot;https://api.iconify.design/lucide:cpu.svg&quot; width=&quot;28&quot; height=&quot;28&quot; style=&quot;color:#1A73E8;&quot;/&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;font-weight:bold;color:#202124;padding-top:2px;&quot;&gt;Compute&lt;br&gt;Engine (VMs)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;color:#5F6368;&quot;&gt;C3/N2 High-Mem Nodes&lt;br&gt;gVNIC 100Gbps Egress&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="543" y="410" width="135" height="95" as="geometry" />
        </mxCell>

        <!-- Subnet 3 Container -->
        <mxCell id="box_subnet3" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#E0E0E0;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="690" y="378" width="142" height="205" as="geometry" />
        </mxCell>
        <mxCell id="lbl_subnet3" value="&lt;b style=&quot;font-size:10px;color:#1A73E8;&quot;&gt;Subnet 3&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#5F6368;&quot;&gt;10.100.30.0/24 (PSA)&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="690" y="382" width="142" height="22" as="geometry" />
        </mxCell>

        <!-- Node Cloud SQL -->
        <mxCell id="node_cloudsql" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td align=&quot;center&quot;&gt;&lt;img src=&quot;https://api.iconify.design/lucide:database.svg&quot; width=&quot;28&quot; height=&quot;28&quot; style=&quot;color:#1A73E8;&quot;/&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;font-weight:bold;color:#202124;padding-top:2px;&quot;&gt;Cloud SQL&lt;br&gt;(PostgreSQL 16)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;color:#5F6368;&quot;&gt;Enterprise Multi-AZ HA&lt;br&gt;Private IP 10.100.30.15&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="695" y="410" width="132" height="95" as="geometry" />
        </mxCell>

        <!-- Gemini Enterprise Box -->
        <mxCell id="box_gemini_enterprise" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;vertical-align:middle;text-align:center;&quot;&gt;&lt;img src=&quot;https://api.iconify.design/lucide:sparkles.svg&quot; width=&quot;26&quot; height=&quot;26&quot; style=&quot;color:#E37400;&quot;/&gt; &lt;b style=&quot;font-size:14px;color:#202124;font-family:Google Sans,Roboto,sans-serif;&quot;&gt;Gemini Enterprise&lt;/b&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;color:#B06000;font-weight:bold;padding-top:2px;&quot;&gt;AI-Powered Assistant &amp;amp; Network Operations&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#546E7A;padding-top:2px;&quot;&gt;Gemini Reasoning Core • Real-time BGP Flap &amp;amp; Route Anomaly Auto-Remediation&lt;br&gt;Multi-Cloud Failover Orchestration • Telemetry Graph Synthesis (Subnet 10.100.40.0/24)&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFF8E1;strokeColor=#F9AB00;strokeWidth=2;align=center;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="538" y="598" width="294" height="190" as="geometry" />
        </mxCell>

        <!-- Google Services Container -->
        <mxCell id="box_google_services" value="" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#81C995;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="860" y="348" width="165" height="462" as="geometry" />
        </mxCell>
        <mxCell id="box_google_services_title" value="&lt;b style=&quot;font-size:13px;color:#202124;&quot;&gt;Google Services&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#5F6368;&quot;&gt;VPC-SC Perimeter&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="865" y="354" width="155" height="35" as="geometry" />
        </mxCell>

        <!-- BigQuery Node -->
        <mxCell id="node_bigquery" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td align=&quot;center&quot;&gt;&lt;img src=&quot;https://api.iconify.design/lucide:search.svg&quot; width=&quot;28&quot; height=&quot;28&quot; style=&quot;color:#1A73E8;&quot;/&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#202124;padding-top:2px;&quot;&gt;BigQuery&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;color:#5F6368;&quot;&gt;Petabyte Serverless DW&lt;br&gt;BI Engine In-Memory&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="870" y="415" width="145" height="85" as="geometry" />
        </mxCell>

        <!-- Vertex AI Node -->
        <mxCell id="node_vertex_ai" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td align=&quot;center&quot;&gt;&lt;img src=&quot;https://api.iconify.design/lucide:cpu.svg&quot; width=&quot;28&quot; height=&quot;28&quot; style=&quot;color:#1A73E8;&quot;/&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#202124;padding-top:2px;&quot;&gt;Vertex AI&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;color:#5F6368;&quot;&gt;Vector Search Grounding&lt;br&gt;Model Armor Safety Gate&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="870" y="525" width="145" height="85" as="geometry" />
        </mxCell>

        <!-- ========================================================================= -->
        <!-- ZONE 3: OTHER CLOUD (E.G., AWS) (RIGHT: X: 1175, Width: 370, Height: 760) -->
        <!-- ========================================================================= -->
        <mxCell id="zone_aws_bg" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#ECEFF1;strokeColor=#CFD8DC;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1175" y="68" width="370" height="760" as="geometry" />
        </mxCell>
        <mxCell id="zone_aws_title" value="&lt;b style=&quot;font-size:13.5px;color:#202124;font-family:Google Sans,Roboto,sans-serif;&quot;&gt;Other Cloud (e.g., AWS)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#546E7A;&quot;&gt;Region: us-east-1 • Account: 123456789012 • BGP ASN 64512&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1180" y="73" width="360" height="30" as="geometry" />
        </mxCell>

        <!-- AWS Inner Container -->
        <mxCell id="box_aws_main" value="" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#FFF8E1;strokeColor=#FFB74D;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1190" y="105" width="340" height="580" as="geometry" />
        </mxCell>

        <!-- AWS Header Logo + Text -->
        <mxCell id="aws_hdr" value="&lt;table style=&quot;display:inline-table;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;vertical-align:middle;padding-right:6px;&quot;&gt;&lt;b style=&quot;font-size:20px;color:#E65100;font-family:Amazon Ember,sans-serif;&quot;&gt;aws&lt;/b&gt;&lt;/td&gt;&lt;td style=&quot;vertical-align:middle;font-size:13px;font-weight:bold;color:#202124;font-family:Google Sans,Roboto,sans-serif;&quot;&gt;(Amazon Web Services)&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#E65100;font-weight:normal;&quot;&gt;DX Gateway (ASN 64512) • Hosted VIF 100G&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="text;html=1;align=left;verticalAlign=middle;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="1200" y="112" width="320" height="38" as="geometry" />
        </mxCell>

        <!-- AWS VPC Network Container -->
        <mxCell id="box_aws_vpc" value="" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#F3E8FF;strokeColor=#B388FF;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1205" y="158" width="310" height="515" as="geometry" />
        </mxCell>
        <mxCell id="box_aws_vpc_title" value="&lt;table style=&quot;display:inline-table;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;vertical-align:middle;padding-right:6px;&quot;&gt;&lt;img src=&quot;https://api.iconify.design/lucide:boxes.svg&quot; width=&quot;16&quot; height=&quot;16&quot; style=&quot;color:#6A1B9A;&quot;/&gt;&lt;/td&gt;&lt;td style=&quot;vertical-align:middle;font-size:12px;font-weight:bold;color:#4A148C;&quot;&gt;VPC Network: vpc-aws-prod (172.31.0.0/16)&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="text;html=1;align=left;verticalAlign=middle;spacingLeft=6;" vertex="1" parent="1">
          <mxGeometry x="1215" y="164" width="290" height="22" as="geometry" />
        </mxCell>

        <!-- 4 AWS Services (2x2 Grid) -->
        <mxCell id="node_aws_eks" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td align=&quot;center&quot;&gt;&lt;img src=&quot;https://api.iconify.design/logos:aws-eks.svg&quot; width=&quot;32&quot; height=&quot;32&quot;/&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#202124;padding-top:2px;&quot;&gt;Amazon EKS&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;color:#5F6368;&quot;&gt;K8s v1.30 Managed Nodes&lt;br&gt;Subnet 172.31.10.0/24&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#FFCC80;strokeWidth=1;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1220" y="200" width="125" height="100" as="geometry" />
        </mxCell>

        <mxCell id="node_aws_ec2" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td align=&quot;center&quot;&gt;&lt;img src=&quot;https://api.iconify.design/logos:aws-ec2.svg&quot; width=&quot;32&quot; height=&quot;32&quot;/&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#202124;padding-top:2px;&quot;&gt;Amazon EC2&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;color:#5F6368;&quot;&gt;m6i.4xlarge Nitro Nodes&lt;br&gt;Subnet 172.31.20.0/24&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#FFCC80;strokeWidth=1;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1370" y="200" width="125" height="100" as="geometry" />
        </mxCell>

        <mxCell id="node_aws_ecs" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td align=&quot;center&quot;&gt;&lt;img src=&quot;https://api.iconify.design/logos:aws-ecs.svg&quot; width=&quot;32&quot; height=&quot;32&quot;/&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#202124;padding-top:2px;&quot;&gt;Amazon ECS&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;color:#5F6368;&quot;&gt;AWS Fargate Microservices&lt;br&gt;Task Role IAM Identity&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#FFCC80;strokeWidth=1;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1220" y="325" width="125" height="100" as="geometry" />
        </mxCell>

        <mxCell id="node_aws_rds" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td align=&quot;center&quot;&gt;&lt;img src=&quot;https://api.iconify.design/logos:aws-rds.svg&quot; width=&quot;32&quot; height=&quot;32&quot;/&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#202124;padding-top:2px;&quot;&gt;Amazon RDS&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;color:#5F6368;&quot;&gt;Aurora Multi-AZ Cluster&lt;br&gt;Subnet 172.31.30.0/24&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#FFCC80;strokeWidth=1;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1370" y="325" width="125" height="100" as="geometry" />
        </mxCell>

        <!-- AWS Direct Connect Location Box -->
        <mxCell id="node_aws_dx" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td align=&quot;center&quot;&gt;&lt;img src=&quot;https://api.iconify.design/lucide:radio.svg&quot; width=&quot;20&quot; height=&quot;20&quot; style=&quot;color:#7C3AED;&quot;/&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9.5px;font-weight:bold;color:#202124;&quot;&gt;AWS Direct&lt;br&gt;Connect Location&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;color:#5F6368;&quot;&gt;100G Hosted VIF&lt;br&gt;P2P: 169.254.100.1/30&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#B388FF;strokeWidth=1.5;align=center;verticalAlign=middle;padding=3;" vertex="1" parent="1">
          <mxGeometry x="1220" y="480" width="125" height="85" as="geometry" />
        </mxCell>


        <!-- ========================================================================= -->
        <!-- SYNCHRONIZED INTERCONNECT BADGES & CONNECTORS (LEFT: ON-PREM TO GCP) -->
        <!-- ========================================================================= -->
        <!-- 1. Partner Interconnect Badge -->
        <mxCell id="badge_partner_interconnect" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td align=&quot;center&quot;&gt;&lt;img src=&quot;https://api.iconify.design/lucide:lock.svg&quot; width=&quot;16&quot; height=&quot;16&quot; style=&quot;color:#EA4335;&quot;/&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9.5px;font-weight:bold;color:#202124;padding-top:2px;&quot;&gt;Partner Interconnect&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;color:#5F6368;&quot;&gt;802.1Q VLAN 102 • MED 150&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FCE8E6;strokeColor=#EA4335;strokeWidth=1.5;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="250" y="145" width="120" height="58" as="geometry" />
        </mxCell>

        <!-- Red Line: Partner Interconnect Connector -->
        <mxCell id="edge_partner_interconnect" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#EA4335;strokeWidth=3;endArrow=classic;startArrow=classic;" edge="1" parent="1" source="badge_partner_interconnect" target="node_pops">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- 2. Cloud VPN Badge -->
        <mxCell id="badge_cloud_vpn" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td align=&quot;center&quot;&gt;&lt;img src=&quot;https://api.iconify.design/lucide:lock.svg&quot; width=&quot;16&quot; height=&quot;16&quot; style=&quot;color:#1A73E8;&quot;/&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9.5px;font-weight:bold;color:#202124;padding-top:2px;&quot;&gt;Cloud VPN (HA)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;color:#5F6368;&quot;&gt;IPSec AES-256 GCM • MED 200&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#E8F0FE;strokeColor=#1A73E8;strokeWidth=1.5;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="250" y="225" width="120" height="54" as="geometry" />
        </mxCell>

        <!-- Blue Line: Cloud VPN Connector -->
        <mxCell id="edge_cloud_vpn" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#1A73E8;strokeWidth=3;endArrow=classic;startArrow=classic;" edge="1" parent="1" source="badge_cloud_vpn" target="node_pops">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- 3. Dedicated Interconnect Badge -->
        <mxCell id="badge_interconnect_location" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td align=&quot;center&quot;&gt;&lt;img src=&quot;https://api.iconify.design/lucide:globe.svg&quot; width=&quot;18&quot; height=&quot;18&quot; style=&quot;color:#1A73E8;&quot;/&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9.5px;font-weight:bold;color:#202124;&quot;&gt;Dedicated Interconnect&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;color:#5F6368;&quot;&gt;100G Line-Rate • MED 100&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#1A237E;strokeWidth=2;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="250" y="610" width="120" height="60" as="geometry" />
        </mxCell>

        <!-- Dark Blue Line: Dedicated Interconnect Connector -->
        <mxCell id="edge_dedicated_interconnect" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#1A237E;strokeWidth=4;endArrow=classic;startArrow=classic;" edge="1" parent="1" source="badge_interconnect_location" target="node_ncc">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- On-Prem Edge to Interconnect Badges -->
        <mxCell id="edge_cpe_to_badges" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#1A73E8;strokeWidth=2;endArrow=classic;" edge="1" parent="1" source="port_cpe_circle" target="badge_partner_interconnect">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_cpe_to_vpn" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#1A73E8;strokeWidth=2;endArrow=classic;" edge="1" parent="1" source="port_cpe_circle" target="badge_cloud_vpn">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_cpe_to_dx" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#1A237E;strokeWidth=3;endArrow=classic;" edge="1" parent="1" source="port_cpe_circle" target="badge_interconnect_location">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>


        <!-- ========================================================================= -->
        <!-- CROSS-CLOUD INTERCONNECT (RIGHT: GCP REGION TO AWS) -->
        <!-- ========================================================================= -->
        <mxCell id="badge_cross_cloud" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td align=&quot;center&quot;&gt;&lt;img src=&quot;https://api.iconify.design/lucide:lock.svg&quot; width=&quot;16&quot; height=&quot;16&quot; style=&quot;color:#34A853;&quot;/&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9.5px;font-weight:bold;color:#202124;padding-top:2px;&quot;&gt;Cross-Cloud Interconnect&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;color:#2E7D32;&quot;&gt;Google ↔ AWS 100G Direct Demarc&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#E6F4EA;strokeColor=#34A853;strokeWidth=1.5;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="1050" y="380" width="135" height="66" as="geometry" />
        </mxCell>

        <!-- Green Thick Line: GCP Region -> Cross-Cloud Interconnect -> AWS VPC -->
        <mxCell id="edge_cross_cloud_gcp" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#34A853;strokeWidth=4;endArrow=classic;startArrow=classic;" edge="1" parent="1" source="box_google_services" target="badge_cross_cloud">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_cross_cloud_aws" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#34A853;strokeWidth=4;endArrow=classic;startArrow=classic;" edge="1" parent="1" source="badge_cross_cloud" target="box_aws_vpc">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>


        <!-- ========================================================================= -->
        <!-- BOTTOM-RIGHT LEGEND BOX -->
        <!-- ========================================================================= -->
        <mxCell id="box_legend" value="" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="1175" y="718" width="370" height="110" as="geometry" />
        </mxCell>

        <!-- Legend Item 1: Public Internet (Encrypted/VPN) -->
        <mxCell id="leg_item_1" value="&lt;table style=&quot;width:100%;font-size:9px;color:#202124;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:40px;text-align:center;&quot;&gt;&lt;span style=&quot;display:inline-block;width:26px;height:2px;border-top:2.5px dashed #EA4335;&quot;&gt;&lt;/span&gt;&lt;/td&gt;&lt;td style=&quot;width:18px;text-align:center;&quot;&gt;&lt;img src=&quot;https://api.iconify.design/lucide:lock.svg&quot; width=&quot;12&quot; height=&quot;12&quot; style=&quot;color:#EA4335;&quot;/&gt;&lt;/td&gt;&lt;td style=&quot;padding-left:4px;&quot;&gt;&lt;b&gt;Public Internet (Encrypted/VPN)&lt;/b&gt; &lt;span style=&quot;color:#5F6368;font-size:7.5px;&quot;&gt;IPSec AES-256 GCM&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1180" y="722" width="360" height="20" as="geometry" />
        </mxCell>

        <!-- Legend Item 2: Private Interconnect (Dedicated/Partner) -->
        <mxCell id="leg_item_2" value="&lt;table style=&quot;width:100%;font-size:9px;color:#202124;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:40px;text-align:center;&quot;&gt;&lt;span style=&quot;display:inline-block;width:26px;height:3px;background:#1A237E;&quot;&gt;&lt;/span&gt;&lt;/td&gt;&lt;td style=&quot;width:18px;&quot;&gt;&lt;/td&gt;&lt;td style=&quot;padding-left:4px;&quot;&gt;&lt;b&gt;Private Interconnect (Dedicated/Partner)&lt;/b&gt; &lt;span style=&quot;color:#5F6368;font-size:7.5px;&quot;&gt;100G BGP 802.1Q&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1180" y="746" width="360" height="20" as="geometry" />
        </mxCell>

        <!-- Legend Item 3: Google Global Network Traffic -->
        <mxCell id="leg_item_3" value="&lt;table style=&quot;width:100%;font-size:9px;color:#202124;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:40px;text-align:center;&quot;&gt;&lt;span style=&quot;display:inline-block;width:26px;height:2px;border-top:2.5px dashed #4285F4;&quot;&gt;&lt;/span&gt;&lt;/td&gt;&lt;td style=&quot;width:18px;&quot;&gt;&lt;/td&gt;&lt;td style=&quot;padding-left:4px;&quot;&gt;&lt;b&gt;Google Global Network Traffic&lt;/b&gt; &lt;span style=&quot;color:#5F6368;font-size:7.5px;&quot;&gt;Andromeda SDN Terabit Mesh&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1180" y="770" width="360" height="20" as="geometry" />
        </mxCell>

        <!-- Legend Item 4: Multi-Cloud Interconnect for AWS -->
        <mxCell id="leg_item_4" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:40px;text-align:center;&quot;&gt;&lt;span style=&quot;display:inline-block;width:26px;height:2px;border-top:2.5px dashed #34A853;&quot;&gt;&lt;/span&gt;&lt;/td&gt;&lt;td style=&quot;width:18px;&quot;&gt;&lt;/td&gt;&lt;td style=&quot;padding-left:4px;&quot;&gt;&lt;b&gt;Multi-Cloud Interconnect for AWS&lt;/b&gt; &lt;span style=&quot;color:#5F6368;font-size:7.5px;&quot;&gt;Direct Cloud-to-Cloud 100G&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1180" y="794" width="360" height="20" as="geometry" />
        </mxCell>

        <!-- ========================================================================= -->
        <!-- FULL-WIDTH BOTTOM TECHNICAL ENGINEERING & TELEMETRY STRIP -->
        <!-- ========================================================================= -->
        <mxCell id="strip_engineering_telemetry" value="&lt;table style=&quot;width:100%;font-size:9.5px;color:#202124;font-family:Roboto,sans-serif;&quot;&gt;&lt;tr&gt;&lt;td&gt;&lt;b style=&quot;color:#1A73E8;&quot;&gt;⚡ Multi-Cloud Transit &amp;amp; Failover Matrix:&lt;/b&gt; &lt;span style=&quot;color:#1A237E;&quot;&gt;Primary Dedicated Interconnect (MED 100 • 100Gbps Line-Rate)&lt;/span&gt; &amp;nbsp;➔&amp;nbsp; &lt;span style=&quot;color:#C5221F;&quot;&gt;Secondary Partner Interconnect (MED 150 • 802.1Q VLAN 102)&lt;/span&gt; &amp;nbsp;➔&amp;nbsp; &lt;span style=&quot;color:#1A73E8;&quot;&gt;Fallback Cloud VPN (MED 200 • BFD 300ms Sub-Second Failover)&lt;/span&gt; &amp;nbsp;|&amp;nbsp; &lt;b style=&quot;color:#137333;&quot;&gt;Cross-Cloud AWS Transit:&lt;/b&gt; Direct 100G Demarc (SLA 99.99%, Sub-2ms Latency) &amp;nbsp;|&amp;nbsp; &lt;b style=&quot;color:#B06000;&quot;&gt;Gemini AIOps:&lt;/b&gt; Autonomous BGP Flap Damping &amp;amp; Self-Healing Failover.&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#F8F9FA;strokeColor=#CFD8DC;strokeWidth=1;align=left;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="35" y="840" width="1510" height="42" as="geometry" />
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
  `.trim();
}
