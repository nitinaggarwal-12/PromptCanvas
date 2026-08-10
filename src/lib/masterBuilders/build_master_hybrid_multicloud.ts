export function buildHybridMultiCloudXml(): string {
  return `
<mxfile host="app.diagrams.net" modified="2026-08-10T18:35:00.000Z" agent="PromptCanvas" version="21.0.0" type="device">
  <diagram id="hybrid_multicloud_networking" name="Hybrid Multi-Cloud Networking &amp; Gemini Enterprise">
    <mxGraphModel dx="1600" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1560" pageHeight="920" background="#FFFFFF">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- ========================================================================= -->
        <!-- OUTER CANVAS FRAME WITH 4-COLOR GOOGLE BRAND TOP STRIPE -->
        <!-- ========================================================================= -->
        <mxCell id="canvas_card" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CFD8DC;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="15" y="10" width="1530" height="895" as="geometry" />
        </mxCell>

        <!-- Google 4-Color Rainbow Stripe -->
        <mxCell id="stripe_red" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#EA4335;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="18" y="12" width="375" height="4" as="geometry" />
        </mxCell>
        <mxCell id="stripe_yellow" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FBBC04;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="393" y="12" width="375" height="4" as="geometry" />
        </mxCell>
        <mxCell id="stripe_green" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#34A853;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="768" y="12" width="375" height="4" as="geometry" />
        </mxCell>
        <mxCell id="stripe_blue" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#4285F4;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="1143" y="12" width="398" height="4" as="geometry" />
        </mxCell>

        <!-- ========================================================================= -->
        <!-- TOP HEADER: Google Cloud | Hybrid Multi-Cloud Networking & Gemini Enterprise -->
        <!-- ========================================================================= -->
        <mxCell id="hdr_logo" value="&lt;table style=&quot;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;vertical-align:middle;padding-right:10px;&quot;&gt;&lt;img src=&quot;https://api.iconify.design/logos:google-cloud.svg&quot; width=&quot;32&quot; height=&quot;26&quot;/&gt;&lt;/td&gt;&lt;td style=&quot;vertical-align:middle;font-size:22px;font-weight:500;color:#3C4043;font-family:Google Sans,Roboto,sans-serif;&quot;&gt;Google Cloud&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="35" y="24" width="195" height="35" as="geometry" />
        </mxCell>

        <mxCell id="hdr_sep" value="" style="shape=line;strokeColor=#B0BEC5;strokeWidth=1.5;direction=south;" vertex="1" parent="1">
          <mxGeometry x="235" y="24" width="10" height="34" as="geometry" />
        </mxCell>

        <mxCell id="hdr_title" value="&lt;b style=&quot;font-size:20px;color:#202124;font-family:Google Sans,Roboto,sans-serif;&quot;&gt;Hybrid Multi-Cloud Networking &amp;amp; Gemini Enterprise&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="255" y="24" width="580" height="35" as="geometry" />
        </mxCell>

        <!-- Top Header Technical Badges -->
        <mxCell id="hdr_tech_badges" value="&lt;div style=&quot;font-size:9.5px;color:#3C4043;font-family:Roboto,sans-serif;&quot;&gt;&lt;span style=&quot;background:#E8F0FE;color:#1A73E8;padding:2px 6px;border-radius:4px;font-weight:bold;&quot;&gt;BGP ASN: Google 16550 | On-Prem 65001 | AWS 64512&lt;/span&gt; &lt;span style=&quot;background:#E6F4EA;color:#137333;padding:2px 6px;border-radius:4px;font-weight:bold;&quot;&gt;100G Interconnect SLA 99.99%&lt;/span&gt; &lt;span style=&quot;background:#FEF7E0;color:#B06000;padding:2px 6px;border-radius:4px;font-weight:bold;&quot;&gt;NCC Hub-and-Spoke&lt;/span&gt;&lt;/div&gt;" style="text;html=1;align=right;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="840" y="24" width="690" height="35" as="geometry" />
        </mxCell>

        <!-- ========================================================================= -->
        <!-- ZONE 1: ON-PREMISES / PRIVATE CLOUD (LEFT: X: 35, Width: 290, Height: 795) -->
        <!-- ========================================================================= -->
        <mxCell id="zone_onprem_bg" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#ECEFF1;strokeColor=#CFD8DC;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="35" y="75" width="290" height="805" as="geometry" />
        </mxCell>
        <mxCell id="zone_onprem_title" value="&lt;b style=&quot;font-size:13.5px;color:#202124;font-family:Google Sans,Roboto,sans-serif;&quot;&gt;On-Premises / Private Cloud&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#546E7A;&quot;&gt;CIDR: 10.200.0.0/16 • Dual 100G Demarc&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="80" width="280" height="32" as="geometry" />
        </mxCell>

        <!-- On-Premises Data Center Building Shape (Gable Top + Body) -->
        <mxCell id="dc_roof" value="" style="triangle;whiteSpace=wrap;html=1;fillColor=#F8F9FA;strokeColor=#78909C;strokeWidth=1.5;direction=north;" vertex="1" parent="1">
          <mxGeometry x="50" y="118" width="260" height="60" as="geometry" />
        </mxCell>
        <mxCell id="dc_body" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#F8F9FA;strokeColor=#78909C;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="50" y="178" width="260" height="680" as="geometry" />
        </mxCell>

        <!-- Building Graphic & Title -->
        <mxCell id="node_dc_icon" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td align=&quot;center&quot;&gt;&lt;img src=&quot;https://api.iconify.design/lucide:building-2.svg&quot; width=&quot;42&quot; height=&quot;42&quot; style=&quot;color:#4285F4;&quot;/&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12.5px;font-weight:bold;color:#202124;padding-top:3px;&quot;&gt;On-Premises&lt;br&gt;Data Center&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#546E7A;&quot;&gt;Tier IV Enterprise Facility&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="90" y="190" width="180" height="95" as="geometry" />
        </mxCell>

        <!-- Customer Edge Router Box -->
        <mxCell id="node_cpe_card" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;vertical-align:middle;padding-right:6px;&quot;&gt;&lt;img src=&quot;https://api.iconify.design/lucide:move.svg&quot; width=&quot;20&quot; height=&quot;20&quot; style=&quot;color:#1A73E8;&quot;/&gt;&lt;/td&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#1A73E8;text-align:left;&quot;&gt;Customer&lt;br&gt;Edge Router&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#546E7A;font-weight:normal;&quot;&gt;BGP ASN 65001 • BFD 300ms&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#8AB4F8;strokeWidth=1.5;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="62" y="320" width="165" height="64" as="geometry" />
        </mxCell>

        <!-- Customer Edge Router Circular Port on Right Edge -->
        <mxCell id="port_cpe_circle" value="" style="shape=ellipse;whiteSpace=wrap;html=1;fillColor=#1A73E8;strokeColor=#FFFFFF;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="250" y="332" width="42" height="42" as="geometry" />
        </mxCell>
        <mxCell id="port_cpe_icon" value="&lt;img src=&quot;https://api.iconify.design/lucide:move.svg&quot; width=&quot;24&quot; height=&quot;24&quot; style=&quot;color:#FFFFFF;&quot;/&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="254" y="336" width="34" height="34" as="geometry" />
        </mxCell>

        <!-- Servers (VMs / Physical) -->
        <mxCell id="node_servers_stack" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td align=&quot;center&quot;&gt;&lt;img src=&quot;https://api.iconify.design/lucide:server.svg&quot; width=&quot;26&quot; height=&quot;26&quot; style=&quot;color:#37474F;&quot;/&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#202124;padding-top:2px;&quot;&gt;Servers&lt;br&gt;(VMs/Physical)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#546E7A;&quot;&gt;Core Apps • Subnet 10.200.10.0/24&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="75" y="420" width="210" height="75" as="geometry" />
        </mxCell>

        <!-- Gemini on Distributed Cloud Hosted Card -->
        <mxCell id="node_gdc_card" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;vertical-align:middle;padding-right:6px;&quot;&gt;&lt;img src=&quot;https://api.iconify.design/lucide:cloud.svg&quot; width=&quot;24&quot; height=&quot;24&quot; style=&quot;color:#1A73E8;&quot;/&gt;&lt;/td&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#1A73E8;text-align:left;&quot;&gt;Gemini on&lt;br&gt;Distributed Cloud&lt;br&gt;Hosted&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#546E7A;font-weight:normal;&quot;&gt;Air-Gapped TPU/GPU Rack&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#8AB4F8;strokeWidth=1.5;align=center;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="60" y="540" width="240" height="82" as="geometry" />
        </mxCell>
        <mxCell id="lbl_gdc_caption" value="&lt;span style=&quot;font-size:9.5px;color:#546E7A;&quot;&gt;A special on Distributed&lt;br&gt;On-prem deployment&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=top;" vertex="1" parent="1">
          <mxGeometry x="60" y="628" width="240" height="30" as="geometry" />
        </mxCell>

        <!-- ========================================================================= -->
        <!-- ZONE 2: GOOGLE CLOUD (GCP) (CENTER: X: 345, Width: 810, Height: 795) -->
        <!-- ========================================================================= -->
        <mxCell id="zone_gcp_bg" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#F1F3F4;strokeColor=#BCC1C6;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="345" y="75" width="810" height="805" as="geometry" />
        </mxCell>
        <mxCell id="zone_gcp_title" value="&lt;table style=&quot;display:inline-table;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;vertical-align:middle;padding-right:6px;&quot;&gt;&lt;img src=&quot;https://api.iconify.design/logos:google-cloud.svg&quot; width=&quot;22&quot; height=&quot;20&quot;/&gt;&lt;/td&gt;&lt;td style=&quot;vertical-align:middle;font-size:14.5px;font-weight:bold;color:#202124;font-family:Google Sans,Roboto,sans-serif;&quot;&gt;Google Cloud (GCP)&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="360" y="80" width="780" height="25" as="geometry" />
        </mxCell>

        <!-- ------------------------------------------------------------------------- -->
        <!-- SUB-BOX A: GLOBAL NETWORK (TOP BOX) -->
        <!-- ------------------------------------------------------------------------- -->
        <mxCell id="box_global_net" value="" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#BDC1C6;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="360" y="112" width="780" height="175" as="geometry" />
        </mxCell>
        <mxCell id="box_global_net_title" value="&lt;b style=&quot;font-size:13px;color:#202124;&quot;&gt;Global Network&lt;/b&gt;&lt;span style=&quot;font-size:9px;color:#5F6368;font-weight:normal;&quot;&gt; (187+ Anycast Edge PoPs • Terabit-Scale Andromeda SDN Backbone)&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="370" y="118" width="760" height="20" as="geometry" />
        </mxCell>

        <!-- 1. Points of Presence (PoPs) -->
        <mxCell id="node_pops" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td align=&quot;center&quot;&gt;&lt;img src=&quot;https://api.iconify.design/lucide:globe.svg&quot; width=&quot;34&quot; height=&quot;34&quot; style=&quot;color:#1A73E8;&quot;/&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11.5px;font-weight:bold;color:#202124;padding-top:3px;&quot;&gt;Points of&lt;br&gt;Presence (PoPs)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#5F6368;&quot;&gt;Anycast VIPs • DDoS Shield&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="390" y="148" width="180" height="105" as="geometry" />
        </mxCell>

        <!-- 2. Content Delivery Network (CDN) -->
        <mxCell id="node_cdn" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td align=&quot;center&quot;&gt;&lt;img src=&quot;https://api.iconify.design/lucide:share-2.svg&quot; width=&quot;34&quot; height=&quot;34&quot; style=&quot;color:#1A73E8;&quot;/&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11.5px;font-weight:bold;color:#202124;padding-top:3px;&quot;&gt;Content Delivery&lt;br&gt;Network (CDN)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#5F6368;&quot;&gt;Edge Cache • TLS 1.3 Term&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="660" y="148" width="180" height="105" as="geometry" />
        </mxCell>

        <!-- 3. Cloud Load Balancing -->
        <mxCell id="node_clb" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td align=&quot;center&quot;&gt;&lt;img src=&quot;https://api.iconify.design/lucide:network.svg&quot; width=&quot;34&quot; height=&quot;34&quot; style=&quot;color:#1A73E8;&quot;/&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11.5px;font-weight:bold;color:#202124;padding-top:3px;&quot;&gt;Cloud Load&lt;br&gt;Balancing&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#5F6368;&quot;&gt;Global L7 HTTPS / Envoy&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="930" y="148" width="180" height="105" as="geometry" />
        </mxCell>

        <!-- Global to Region Inter-Connect Annotations -->
        <mxCell id="lbl_global_to_region_1" value="&lt;span style=&quot;font-size:9px;color:#1A73E8;font-weight:500;&quot;&gt;Internal, high-speed&lt;br&gt;connections&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="470" y="295" width="140" height="25" as="geometry" />
        </mxCell>
        <mxCell id="lbl_global_to_region_2" value="&lt;span style=&quot;font-size:9px;color:#1A73E8;font-weight:500;&quot;&gt;Inter-speed private&lt;br&gt;high-speed connections&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="685" y="295" width="150" height="25" as="geometry" />
        </mxCell>

        <!-- ------------------------------------------------------------------------- -->
        <!-- SUB-BOX B: REGION: US-CENTRAL1 (BOTTOM BOX) -->
        <!-- ------------------------------------------------------------------------- -->
        <mxCell id="box_region" value="" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#E6F4EA;strokeColor=#81C995;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="360" y="325" width="780" height="540" as="geometry" />
        </mxCell>
        <mxCell id="box_region_title" value="&lt;b style=&quot;font-size:13.5px;color:#137333;&quot;&gt;Region: us-central1 (Iowa)&lt;/b&gt;&lt;span style=&quot;font-size:9px;color:#2E7D32;font-weight:normal;&quot;&gt; • Dual-Zone HA (us-central1-a / us-central1-b)&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;spacingLeft=8;" vertex="1" parent="1">
          <mxGeometry x="370" y="332" width="450" height="25" as="geometry" />
        </mxCell>

        <!-- VPC Network Container (Blue Border) -->
        <mxCell id="box_gcp_vpc" value="" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#F8FBFF;strokeColor=#4285F4;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="375" y="365" width="465" height="485" as="geometry" />
        </mxCell>
        <mxCell id="box_gcp_vpc_title" value="&lt;table style=&quot;display:inline-table;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;vertical-align:middle;padding-right:6px;&quot;&gt;&lt;img src=&quot;https://api.iconify.design/lucide:boxes.svg&quot; width=&quot;18&quot; height=&quot;18&quot; style=&quot;color:#1A73E8;&quot;/&gt;&lt;/td&gt;&lt;td style=&quot;vertical-align:middle;font-size:13px;font-weight:bold;color:#1A73E8;&quot;&gt;VPC Network: vpc-enterprise-prod (10.100.0.0/16)&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="text;html=1;align=left;verticalAlign=middle;spacingLeft=6;" vertex="1" parent="1">
          <mxGeometry x="385" y="372" width="440" height="22" as="geometry" />
        </mxCell>

        <!-- Subnet 1 Container -->
        <mxCell id="box_subnet1" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#E0E0E0;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="390" y="400" width="145" height="435" as="geometry" />
        </mxCell>
        <mxCell id="lbl_subnet1" value="&lt;b style=&quot;font-size:10.5px;color:#1A73E8;&quot;&gt;Subnet 1&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#5F6368;&quot;&gt;10.100.10.0/24&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="390" y="404" width="145" height="24" as="geometry" />
        </mxCell>

        <!-- Node GKE -->
        <mxCell id="node_gke" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td align=&quot;center&quot;&gt;&lt;img src=&quot;https://api.iconify.design/logos:kubernetes.svg&quot; width=&quot;30&quot; height=&quot;30&quot;/&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#202124;padding-top:2px;&quot;&gt;Google Kubernetes&lt;br&gt;Engine (GKE)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#5F6368;&quot;&gt;Autopilot Private Nodes&lt;br&gt;Istio mTLS Service Mesh&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="395" y="435" width="135" height="105" as="geometry" />
        </mxCell>

        <!-- Node Network Connectivity Center -->
        <mxCell id="node_ncc" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td align=&quot;center&quot;&gt;&lt;img src=&quot;https://api.iconify.design/lucide:split.svg&quot; width=&quot;26&quot; height=&quot;26&quot; style=&quot;color:#1A73E8;&quot;/&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#202124;padding-top:2px;&quot;&gt;Network&lt;br&gt;Connectivity&lt;br&gt;Center (NCC)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#5F6368;&quot;&gt;BGP Router Hub (ASN 16550)&lt;br&gt;Dynamic Spoke Mesh&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="395" y="605" width="135" height="100" as="geometry" />
        </mxCell>

        <!-- Subnet 2 Container -->
        <mxCell id="box_subnet2" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#E0E0E0;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="540" y="400" width="145" height="215" as="geometry" />
        </mxCell>
        <mxCell id="lbl_subnet2" value="&lt;b style=&quot;font-size:10.5px;color:#1A73E8;&quot;&gt;Subnet 2&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#5F6368;&quot;&gt;10.100.20.0/24&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="540" y="404" width="145" height="24" as="geometry" />
        </mxCell>

        <!-- Node Compute Engine (VMs) -->
        <mxCell id="node_gce" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td align=&quot;center&quot;&gt;&lt;img src=&quot;https://api.iconify.design/lucide:cpu.svg&quot; width=&quot;30&quot; height=&quot;30&quot; style=&quot;color:#1A73E8;&quot;/&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#202124;padding-top:2px;&quot;&gt;Compute&lt;br&gt;Engine (VMs)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#5F6368;&quot;&gt;C3 / N2 High-Mem Nodes&lt;br&gt;gVNIC 100Gbps Egress&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="545" y="435" width="135" height="105" as="geometry" />
        </mxCell>

        <!-- Subnet 3 Container -->
        <mxCell id="box_subnet3" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#E0E0E0;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="690" y="400" width="140" height="215" as="geometry" />
        </mxCell>
        <mxCell id="lbl_subnet3" value="&lt;b style=&quot;font-size:10.5px;color:#1A73E8;&quot;&gt;Subnet 3&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#5F6368;&quot;&gt;10.100.30.0/24&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="690" y="404" width="140" height="24" as="geometry" />
        </mxCell>

        <!-- Node Cloud SQL -->
        <mxCell id="node_cloudsql" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td align=&quot;center&quot;&gt;&lt;img src=&quot;https://api.iconify.design/lucide:database.svg&quot; width=&quot;30&quot; height=&quot;30&quot; style=&quot;color:#1A73E8;&quot;/&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#202124;padding-top:2px;&quot;&gt;Cloud SQL&lt;br&gt;(PostgreSQL 16)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#5F6368;&quot;&gt;Enterprise HA Failover&lt;br&gt;Private IP 10.100.30.15&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="695" y="435" width="130" height="105" as="geometry" />
        </mxCell>

        <!-- Gemini Enterprise Highlighted Box (Across Subnet 2 & 3) -->
        <mxCell id="box_gemini_enterprise" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;vertical-align:middle;text-align:center;&quot;&gt;&lt;img src=&quot;https://api.iconify.design/lucide:sparkles.svg&quot; width=&quot;28&quot; height=&quot;28&quot; style=&quot;color:#E37400;&quot;/&gt; &lt;b style=&quot;font-size:15px;color:#202124;font-family:Google Sans,Roboto,sans-serif;&quot;&gt;Gemini Enterprise&lt;/b&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;color:#B06000;font-weight:bold;padding-top:2px;&quot;&gt;AI-Powered Assistant &amp;amp; Network Operations&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#546E7A;padding-top:2px;&quot;&gt;Gemini 3.1 Pro Reasoning Core • Real-time BGP Flap &amp;amp; Route Anomaly Detection&lt;br&gt;Automated Multi-Cloud Failover Orchestration • Telemetry Graph Synthesizer&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFF8E1;strokeColor=#F9AB00;strokeWidth=2;align=center;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="540" y="625" width="290" height="170" as="geometry" />
        </mxCell>

        <!-- Google Services Container (White Box) -->
        <mxCell id="box_google_services" value="" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#81C995;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="860" y="365" width="165" height="485" as="geometry" />
        </mxCell>
        <mxCell id="box_google_services_title" value="&lt;b style=&quot;font-size:13.5px;color:#202124;&quot;&gt;Google&lt;br&gt;Services&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#5F6368;&quot;&gt;Private APIs&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="865" y="372" width="155" height="38" as="geometry" />
        </mxCell>

        <!-- BigQuery Node -->
        <mxCell id="node_bigquery" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td align=&quot;center&quot;&gt;&lt;img src=&quot;https://api.iconify.design/lucide:search.svg&quot; width=&quot;30&quot; height=&quot;30&quot; style=&quot;color:#1A73E8;&quot;/&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11.5px;font-weight:bold;color:#202124;padding-top:2px;&quot;&gt;BigQuery&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#5F6368;&quot;&gt;Petabyte Data Warehouse&lt;br&gt;BI Engine Acceleration&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="870" y="440" width="145" height="90" as="geometry" />
        </mxCell>

        <!-- Vertex AI Node -->
        <mxCell id="node_vertex_ai" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td align=&quot;center&quot;&gt;&lt;img src=&quot;https://api.iconify.design/lucide:cpu.svg&quot; width=&quot;30&quot; height=&quot;30&quot; style=&quot;color:#1A73E8;&quot;/&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11.5px;font-weight:bold;color:#202124;padding-top:2px;&quot;&gt;Vertex AI&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#5F6368;&quot;&gt;Vector Search Grounding&lt;br&gt;Model Armor Safety Gate&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="870" y="560" width="145" height="90" as="geometry" />
        </mxCell>

        <!-- Inter-Box Text Connectors (VPC to Google Services) -->
        <mxCell id="lbl_vpc_peering" value="&lt;span style=&quot;font-size:9.5px;color:#202124;font-weight:bold;&quot;&gt;VPC Peering&lt;br&gt;Google Access&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="815" y="420" width="60" height="60" as="geometry" />
        </mxCell>
        <mxCell id="lbl_private_google_access" value="&lt;span style=&quot;font-size:9.5px;color:#202124;font-weight:bold;&quot;&gt;Private Google&lt;br&gt;Access (PGA)&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="815" y="545" width="60" height="60" as="geometry" />
        </mxCell>
        <mxCell id="lbl_ai_powered_insights" value="&lt;b style=&quot;font-size:10.5px;color:#137333;&quot;&gt;AI-Powered&lt;br&gt;Insights&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#5F6368;&quot;&gt;gRPC Telemetry&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="870" y="700" width="145" height="40" as="geometry" />
        </mxCell>

        <!-- ========================================================================= -->
        <!-- ZONE 3: OTHER CLOUD (E.G., AWS) (RIGHT: X: 1175, Width: 370, Height: 795) -->
        <!-- ========================================================================= -->
        <mxCell id="zone_aws_bg" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#ECEFF1;strokeColor=#CFD8DC;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1175" y="75" width="370" height="805" as="geometry" />
        </mxCell>
        <mxCell id="zone_aws_title" value="&lt;b style=&quot;font-size:13.5px;color:#202124;font-family:Google Sans,Roboto,sans-serif;&quot;&gt;Other Cloud (e.g., AWS)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#546E7A;&quot;&gt;Region: us-east-1 • Account: 123456789012&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1180" y="80" width="360" height="32" as="geometry" />
        </mxCell>

        <!-- AWS Inner Container (Yellow/Amber) -->
        <mxCell id="box_aws_main" value="" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#FFF8E1;strokeColor=#FFB74D;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1190" y="115" width="340" height="615" as="geometry" />
        </mxCell>

        <!-- AWS Header Logo + Text -->
        <mxCell id="aws_hdr" value="&lt;table style=&quot;display:inline-table;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;vertical-align:middle;padding-right:6px;&quot;&gt;&lt;b style=&quot;font-size:22px;color:#E65100;font-family:Amazon Ember,sans-serif;&quot;&gt;aws&lt;/b&gt;&lt;/td&gt;&lt;td style=&quot;vertical-align:middle;font-size:13.5px;font-weight:bold;color:#202124;font-family:Google Sans,Roboto,sans-serif;&quot;&gt;(Amazon Web Services)&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#E65100;font-weight:normal;&quot;&gt;Direct Connect Gateway (ASN 64512)&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="text;html=1;align=left;verticalAlign=middle;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="1200" y="122" width="320" height="42" as="geometry" />
        </mxCell>

        <!-- AWS VPC Network Container (Purple/Lavender) -->
        <mxCell id="box_aws_vpc" value="" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#F3E8FF;strokeColor=#B388FF;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1205" y="175" width="310" height="540" as="geometry" />
        </mxCell>
        <mxCell id="box_aws_vpc_title" value="&lt;table style=&quot;display:inline-table;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;vertical-align:middle;padding-right:6px;&quot;&gt;&lt;img src=&quot;https://api.iconify.design/lucide:boxes.svg&quot; width=&quot;18&quot; height=&quot;18&quot; style=&quot;color:#6A1B9A;&quot;/&gt;&lt;/td&gt;&lt;td style=&quot;vertical-align:middle;font-size:12.5px;font-weight:bold;color:#4A148C;&quot;&gt;VPC Network (172.31.0.0/16)&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="text;html=1;align=left;verticalAlign=middle;spacingLeft=6;" vertex="1" parent="1">
          <mxGeometry x="1215" y="182" width="290" height="25" as="geometry" />
        </mxCell>

        <!-- 4 AWS Services (2x2 Grid) -->
        <!-- AWS EKS -->
        <mxCell id="node_aws_eks" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td align=&quot;center&quot;&gt;&lt;img src=&quot;https://api.iconify.design/logos:aws-eks.svg&quot; width=&quot;36&quot; height=&quot;36&quot;/&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#202124;padding-top:2px;&quot;&gt;Amazon EKS&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#5F6368;&quot;&gt;K8s v1.30 Managed Nodes&lt;br&gt;Subnet 172.31.10.0/24&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#FFCC80;strokeWidth=1;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1220" y="225" width="125" height="105" as="geometry" />
        </mxCell>

        <!-- AWS EC2 -->
        <mxCell id="node_aws_ec2" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td align=&quot;center&quot;&gt;&lt;img src=&quot;https://api.iconify.design/logos:aws-ec2.svg&quot; width=&quot;36&quot; height=&quot;36&quot;/&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#202124;padding-top:2px;&quot;&gt;Amazon EC2&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#5F6368;&quot;&gt;m6i.4xlarge Nitro Nodes&lt;br&gt;Subnet 172.31.20.0/24&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#FFCC80;strokeWidth=1;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1370" y="225" width="125" height="105" as="geometry" />
        </mxCell>

        <!-- AWS ECS -->
        <mxCell id="node_aws_ecs" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td align=&quot;center&quot;&gt;&lt;img src=&quot;https://api.iconify.design/logos:aws-ecs.svg&quot; width=&quot;36&quot; height=&quot;36&quot;/&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#202124;padding-top:2px;&quot;&gt;Amazon ECS&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#5F6368;&quot;&gt;AWS Fargate Microservices&lt;br&gt;Task Role IAM Identity&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#FFCC80;strokeWidth=1;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1220" y="365" width="125" height="105" as="geometry" />
        </mxCell>

        <!-- AWS RDS -->
        <mxCell id="node_aws_rds" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td align=&quot;center&quot;&gt;&lt;img src=&quot;https://api.iconify.design/logos:aws-rds.svg&quot; width=&quot;36&quot; height=&quot;36&quot;/&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#202124;padding-top:2px;&quot;&gt;Amazon RDS&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#5F6368;&quot;&gt;Aurora Multi-AZ Cluster&lt;br&gt;Subnet 172.31.30.0/24&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#FFCC80;strokeWidth=1;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1370" y="365" width="125" height="105" as="geometry" />
        </mxCell>

        <!-- AWS Direct Connect Location Box -->
        <mxCell id="node_aws_dx" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td align=&quot;center&quot;&gt;&lt;img src=&quot;https://api.iconify.design/lucide:radio.svg&quot; width=&quot;20&quot; height=&quot;20&quot; style=&quot;color:#7C3AED;&quot;/&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9.5px;font-weight:bold;color:#202124;&quot;&gt;AWS Direct&lt;br&gt;Connect Location&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;color:#5F6368;&quot;&gt;100G Hosted VIF&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#B388FF;strokeWidth=1.5;align=center;verticalAlign=middle;padding=3;" vertex="1" parent="1">
          <mxGeometry x="1180" y="540" width="105" height="75" as="geometry" />
        </mxCell>

        <!-- ========================================================================= -->
        <!-- INTERCONNECT BADGES & CONNECTORS (LEFT: ON-PREM TO GCP) -->
        <!-- ========================================================================= -->
        <!-- 1. Partner Interconnect (Red Line with Lock) -->
        <mxCell id="badge_partner_interconnect" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td align=&quot;center&quot;&gt;&lt;img src=&quot;https://api.iconify.design/lucide:lock.svg&quot; width=&quot;16&quot; height=&quot;16&quot; style=&quot;color:#EA4335;&quot;/&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9.5px;font-weight:bold;color:#202124;padding-top:2px;&quot;&gt;Partner&lt;br&gt;Interconnect&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#5F6368;&quot;&gt;802.1Q VLAN 102&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FCE8E6;strokeColor=#EA4335;strokeWidth=1.5;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="270" y="140" width="98" height="62" as="geometry" />
        </mxCell>

        <!-- Red Line: Customer Router -> Partner Interconnect -> Global Network (PoPs) -->
        <mxCell id="edge_partner_interconnect" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#EA4335;strokeWidth=3.5;startArrow=classic;endArrow=classic;startFill=1;endFill=1;" edge="1" parent="1" source="port_cpe_circle" target="node_pops">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="271" y="171" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- 2. Cloud VPN (Blue Line with Lock) -->
        <mxCell id="badge_cloud_vpn" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td align=&quot;center&quot;&gt;&lt;img src=&quot;https://api.iconify.design/lucide:lock.svg&quot; width=&quot;16&quot; height=&quot;16&quot; style=&quot;color:#1A73E8;&quot;/&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9.5px;font-weight:bold;color:#202124;padding-top:2px;&quot;&gt;Cloud VPN&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#5F6368;&quot;&gt;IPSec AES-256 GCM&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#E8F0FE;strokeColor=#1A73E8;strokeWidth=1.5;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="270" y="235" width="98" height="54" as="geometry" />
        </mxCell>

        <!-- Blue Line: Customer Router -> Cloud VPN -> Global Network (PoPs) -->
        <mxCell id="edge_cloud_vpn" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#1A73E8;strokeWidth=3.5;startArrow=classic;endArrow=classic;startFill=1;endFill=1;" edge="1" parent="1" source="port_cpe_circle" target="node_pops">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="271" y="262" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- 3. Dedicated Interconnect (Dark Blue Thick Line + Interconnect Location Circle) -->
        <mxCell id="badge_interconnect_location" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td align=&quot;center&quot;&gt;&lt;img src=&quot;https://api.iconify.design/lucide:globe.svg&quot; width=&quot;20&quot; height=&quot;20&quot; style=&quot;color:#1A73E8;&quot;/&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9px;font-weight:bold;color:#202124;&quot;&gt;Interconnect&lt;br&gt;Location&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;color:#5F6368;&quot;&gt;Equinix Metro PoP&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#1A73E8;strokeWidth=1.5;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="290" y="540" width="90" height="66" as="geometry" />
        </mxCell>
        <mxCell id="lbl_dedicated_interconnect" value="&lt;b style=&quot;font-size:10.5px;color:#1A237E;&quot;&gt;Dedicated&lt;br&gt;Interconnect&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#5F6368;&quot;&gt;100Gbps Dual Cross-Connect&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="250" y="475" width="135" height="32" as="geometry" />
        </mxCell>

        <!-- Dark Blue Line: Customer Edge Router -> Interconnect Location -> VPC Network (Subnet 1) -->
        <mxCell id="edge_dedicated_interconnect" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#1A237E;strokeWidth=4.5;startArrow=classic;endArrow=classic;startFill=1;endFill=1;" edge="1" parent="1" source="port_cpe_circle" target="box_subnet1">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="271" y="573" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- 4. Gemini Insights Loop (On-Prem GDC to Gemini Enterprise) -->
        <mxCell id="edge_gemini_insights_loop" value="Gemini Insights&lt;br&gt;(gRPC Model Sync)" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#4285F4;strokeWidth=2;fontColor=#1A73E8;fontSize=9.5;fontStyle=1;align=center;labelBackgroundColor=#FFFFFF;labelBorderColor=#BAE6FD;" edge="1" parent="1" source="node_gdc_card" target="box_gemini_enterprise">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="280" y="581" />
              <mxPoint x="280" y="845" />
              <mxPoint x="630" y="845" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- Google Global Network Traffic (Dashed Blue Arrow) -->
        <mxCell id="edge_global_traffic" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#4285F4;strokeWidth=2;dashed=1;startArrow=classic;endArrow=classic;" edge="1" parent="1" source="port_cpe_circle" target="box_global_net">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="330" y="353" />
              <mxPoint x="330" y="199" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- ========================================================================= -->
        <!-- CROSS-CLOUD INTERCONNECT (RIGHT: GCP REGION TO AWS) -->
        <!-- ========================================================================= -->
        <mxCell id="badge_cross_cloud" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td align=&quot;center&quot;&gt;&lt;img src=&quot;https://api.iconify.design/lucide:lock.svg&quot; width=&quot;16&quot; height=&quot;16&quot; style=&quot;color:#34A853;&quot;/&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9.5px;font-weight:bold;color:#202124;padding-top:2px;&quot;&gt;Cross-Cloud&lt;br&gt;Interconnect&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#2E7D32;&quot;&gt;Google ↔ AWS 100G&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#E6F4EA;strokeColor=#34A853;strokeWidth=1.5;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="1090" y="375" width="100" height="62" as="geometry" />
        </mxCell>
        <mxCell id="lbl_cross_cloud_sub" value="&lt;span style=&quot;font-size:8.5px;color:#202124;&quot;&gt;Private, low-latency,&lt;br&gt;SLA-backed connection&lt;br&gt;&lt;b style=&quot;color:#137333;&quot;&gt;Direct Cloud-to-Cloud&lt;/b&gt;&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1080" y="440" width="120" height="45" as="geometry" />
        </mxCell>

        <!-- Green Thick Line: GCP Region -> Cross-Cloud Interconnect -> AWS VPC -->
        <mxCell id="edge_cross_cloud_line" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#34A853;strokeWidth=4.5;startArrow=classic;endArrow=classic;startFill=1;endFill=1;" edge="1" parent="1" source="box_region" target="box_aws_vpc">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1150" y="406" />
              <mxPoint x="1150" y="406" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- Multi-Cloud Interconnect for AWS (Green Dashed Line to Gemini Enterprise) -->
        <mxCell id="edge_aws_to_gemini" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#34A853;strokeWidth=2;dashed=1;startArrow=classic;endArrow=classic;" edge="1" parent="1" source="node_aws_dx" target="box_gemini_enterprise">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1140" y="577" />
              <mxPoint x="1140" y="840" />
              <mxPoint x="750" y="840" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- Internal Connections between Global Network & Region -->
        <mxCell id="edge_internal_global_1" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#4285F4;strokeWidth=1.5;dashed=1;startArrow=classic;endArrow=classic;" edge="1" parent="1" source="node_pops" target="box_gcp_vpc">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_internal_global_2" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#4285F4;strokeWidth=1.5;dashed=1;startArrow=classic;endArrow=classic;" edge="1" parent="1" source="node_cdn" target="box_gcp_vpc">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_internal_global_3" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#4285F4;strokeWidth=1.5;dashed=1;startArrow=classic;endArrow=classic;" edge="1" parent="1" source="node_clb" target="box_google_services">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- ========================================================================= -->
        <!-- BOTTOM-RIGHT LEGEND BOX (X: 1175, Width: 370, Height: 130) -->
        <!-- ========================================================================= -->
        <mxCell id="box_legend" value="" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="1175" y="745" width="370" height="135" as="geometry" />
        </mxCell>

        <!-- Legend Item 1: Public Internet (Encrypted/VPN) -->
        <mxCell id="leg_item_1" value="&lt;table style=&quot;width:100%;font-size:9.5px;color:#202124;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:45px;text-align:center;&quot;&gt;&lt;span style=&quot;display:inline-block;width:30px;height:2px;border-top:2.5px dashed #EA4335;&quot;&gt;&lt;/span&gt;&lt;/td&gt;&lt;td style=&quot;width:20px;text-align:center;&quot;&gt;&lt;img src=&quot;https://api.iconify.design/lucide:lock.svg&quot; width=&quot;13&quot; height=&quot;13&quot; style=&quot;color:#EA4335;&quot;/&gt;&lt;/td&gt;&lt;td style=&quot;padding-left:6px;&quot;&gt;&lt;b&gt;Public Internet (Encrypted/VPN)&lt;/b&gt; &lt;span style=&quot;color:#5F6368;font-size:8px;&quot;&gt;IPSec AES-256 GCM&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1180" y="750" width="360" height="24" as="geometry" />
        </mxCell>

        <!-- Legend Item 2: Private Interconnect (Dedicated/Partner) -->
        <mxCell id="leg_item_2" value="&lt;table style=&quot;width:100%;font-size:9.5px;color:#202124;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:45px;text-align:center;&quot;&gt;&lt;span style=&quot;display:inline-block;width:30px;height:3px;background:#1A237E;&quot;&gt;&lt;/span&gt;&lt;/td&gt;&lt;td style=&quot;width:20px;&quot;&gt;&lt;/td&gt;&lt;td style=&quot;padding-left:6px;&quot;&gt;&lt;b&gt;Private Interconnect (Dedicated/Partner)&lt;/b&gt; &lt;span style=&quot;color:#5F6368;font-size:8px;&quot;&gt;100G BGP 802.1Q&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1180" y="778" width="360" height="24" as="geometry" />
        </mxCell>

        <!-- Legend Item 3: Google Global Network Traffic -->
        <mxCell id="leg_item_3" value="&lt;table style=&quot;width:100%;font-size:9.5px;color:#202124;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:45px;text-align:center;&quot;&gt;&lt;span style=&quot;display:inline-block;width:30px;height:2px;border-top:2.5px dashed #4285F4;&quot;&gt;&lt;/span&gt;&lt;/td&gt;&lt;td style=&quot;width:20px;&quot;&gt;&lt;/td&gt;&lt;td style=&quot;padding-left:6px;&quot;&gt;&lt;b&gt;Google Global Network Traffic&lt;/b&gt; &lt;span style=&quot;color:#5F6368;font-size:8px;&quot;&gt;Andromeda SDN Terabit Mesh&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1180" y="806" width="360" height="24" as="geometry" />
        </mxCell>

        <!-- Legend Item 4: Multi-Cloud Interconnect for AWS -->
        <mxCell id="leg_item_4" value="&lt;table style=&quot;width:100%;font-size:9.5px;color:#202124;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:45px;text-align:center;&quot;&gt;&lt;span style=&quot;display:inline-block;width:30px;height:2px;border-top:2.5px dashed #34A853;&quot;&gt;&lt;/span&gt;&lt;/td&gt;&lt;td style=&quot;width:20px;&quot;&gt;&lt;/td&gt;&lt;td style=&quot;padding-left:6px;&quot;&gt;&lt;b&gt;Multi-Cloud Interconnect for AWS&lt;/b&gt; &lt;span style=&quot;color:#5F6368;font-size:8px;&quot;&gt;Direct Cloud-to-Cloud 100G&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1180" y="834" width="360" height="24" as="geometry" />
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
  `.trim();
}
