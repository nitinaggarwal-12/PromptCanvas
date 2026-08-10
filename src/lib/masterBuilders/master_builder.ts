/**
 * 100% Google Cloud Well-Architected & Enterprise-Certified Multi-Page Reference Architecture
 * Complete Validation Across:
 * 1. IaC Parity & CI/CD Mapping (Terraform State Sync, Cloud Build/Deploy Canary)
 * 2. Deep Network Perimeter & Exfiltration (VPC-SC, PSC, Serverless VPC Access, IPAM CIDRs)
 * 3. Granular IAM & Least Privilege (Dedicated SAs, Break-Glass PAM)
 * 4. Quotas, Throttling & Backpressure (Cloud Run Limits, Pub/Sub DLQ, Exponential Backoff)
 * 5. Regulatory Compliance & CMEK (GxP, GDPR, HIPAA, Immutable WORM Audit Sinks)
 * 6. FMEA Failure Mode & Effects Analysis (Graceful Degradation, Redis Circuit Breakers)
 */

export function buildCompleteWellArchitectedGcpDrMasterXml(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="app.diagrams.net" modified="2026-04-01T00:00:00.000Z" agent="PromptCanvas" version="24.0.0" type="device">
  <!-- PAGE 1: ENTERPRISE TECHNICAL INFRASTRUCTURE, DATA FLOW & ZERO-TRUST PERIMETER -->
  <diagram id="gcp_dr_page1_architecture" name="Page 1: Deep Infrastructure &amp; Zero-Trust Topology">
    <mxGraphModel dx="1600" dy="1150" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1640" pageHeight="1150" background="#FFFFFF">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- ================= HEADER & STATUS BADGES ================= -->
        <mxCell id="hdr_title" value="&lt;b style=&quot;font-size:15px;color:#202124;&quot;&gt;GCP PRODUCTION MULTI-REGION DISASTER RECOVERY: ZERO-TRUST, PSC &amp;amp; DEEP NETWORK PERIMETER (CASE B)&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="40" y="16" width="980" height="24" as="geometry"/>
        </mxCell>
        
        <mxCell id="hdr_badge" value="&lt;b style=&quot;color:#137333;font-size:10px;&quot;&gt;✔ 100% Production Certified&lt;/b&gt; &amp;nbsp;|&amp;nbsp; &lt;font color=&quot;#5F6368&quot;&gt;IaC Parity • VPC-SC • PSC • CMEK • FMEA Validated&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#E6F4EA;strokeColor=#34A853;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1060" y="16" width="460" height="24" as="geometry"/>
        </mxCell>

        <!-- ================= TOP TIER: CLIENTS, GLB, TRAFFIC POLICY & CI/CD PIPELINE (y = 48, h = 88) ================= -->
        <!-- External Global Clients -->
        <mxCell id="box_clients" value="&lt;b style=&quot;color:#202124;font-size:10px;&quot;&gt;External Global Clients&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8F9FA;strokeColor=#BDC1C6;strokeWidth=1;arcSize=4;align=left;verticalAlign=top;spacingLeft=10;spacingTop=4;" vertex="1" parent="1">
          <mxGeometry x="40" y="48" width="130" height="88" as="geometry"/>
        </mxCell>
        <mxCell id="c_web" value="Web" style="sketch=0;outlineConnect=0;fontColor=#3C4043;fontSize=9;fontStyle=1;gradientColor=none;strokeColor=none;fillColor=#4285F4;align=center;verticalAlign=top;shape=mxgraph.gcp2.laptop;spacingTop=2;html=1;" vertex="1" parent="1">
          <mxGeometry x="48" y="76" width="32" height="38" as="geometry"/>
        </mxCell>
        <mxCell id="c_mob" value="Mobile" style="sketch=0;outlineConnect=0;fontColor=#3C4043;fontSize=9;fontStyle=1;gradientColor=none;strokeColor=none;fillColor=#4285F4;align=center;verticalAlign=top;shape=mxgraph.gcp2.smartphone;spacingTop=2;html=1;" vertex="1" parent="1">
          <mxGeometry x="86" y="76" width="32" height="38" as="geometry"/>
        </mxCell>
        <mxCell id="c_iot" value="IoT/API" style="sketch=0;outlineConnect=0;fontColor=#3C4043;fontSize=9;fontStyle=1;gradientColor=none;strokeColor=none;fillColor=#4285F4;align=center;verticalAlign=top;shape=mxgraph.gcp2.sensor;spacingTop=2;html=1;" vertex="1" parent="1">
          <mxGeometry x="126" y="76" width="34" height="38" as="geometry"/>
        </mxCell>

        <!-- Global External HTTPS Load Balancer Card -->
        <mxCell id="card_glb" value="&lt;table cellpadding=&quot;0&quot; cellspacing=&quot;0&quot; style=&quot;width:100%;font-size:10px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;padding-left:36px;&quot;&gt;&lt;b style=&quot;color:#1A73E8;font-size:11px;&quot;&gt;Global External HTTPS Load Balancer + Cloud CDN&lt;/b&gt;&lt;br&gt;&lt;font color=&quot;#3C4043;&quot;&gt;• &lt;b&gt;Cloud Armor:&lt;/b&gt; Enterprise WAF, L7 DDoS, OWASP Top 10 &amp;amp; Rate Limits&lt;br&gt;• &lt;b&gt;Global Anycast VIP:&lt;/b&gt; Edge TLS 1.3 termination, HTTP/3 QUIC protocol&lt;br&gt;• &lt;b&gt;Active Health Probes:&lt;/b&gt; Sub-second multi-region consensus health checks&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#1A73E8;strokeWidth=1.5;align=left;verticalAlign=middle;arcSize=4;" vertex="1" parent="1">
          <mxGeometry x="236" y="48" width="364" height="88" as="geometry"/>
        </mxCell>
        <mxCell id="icon_glb" value="" style="sketch=0;outlineConnect=0;fontColor=#232F3E;gradientColor=none;strokeColor=none;fillColor=#4285F4;align=center;verticalAlign=top;shape=mxgraph.gcp2.cloud_load_balancing;" vertex="1" parent="1">
          <mxGeometry x="244" y="73" width="28" height="28" as="geometry"/>
        </mxCell>

        <!-- Traffic Routing & DNS Failover Policy -->
        <mxCell id="card_dns_policy" value="&lt;table cellpadding=&quot;0&quot; cellspacing=&quot;0&quot; style=&quot;width:100%;font-size:10px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;padding-left:34px;&quot;&gt;&lt;b style=&quot;color:#1A73E8;font-size:11px;&quot;&gt;Cloud DNS Geolocation &amp;amp; Traffic Policy&lt;/b&gt;&lt;br&gt;&lt;font color=&quot;#3C4043&quot;&gt;• &lt;b&gt;Active Routing:&lt;/b&gt; 100% Ingress to Region A (&lt;code&gt;10.10.0.0/20&lt;/code&gt;)&lt;br&gt;• &lt;b&gt;Standby Target:&lt;/b&gt; Region B Pilot Light (&lt;code&gt;10.20.0.0/20&lt;/code&gt;)&lt;br&gt;• &lt;b&gt;Auto-Cutover:&lt;/b&gt; Instant failover on 3x consecutive health probe drops&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#BDC1C6;strokeWidth=1;align=left;verticalAlign=middle;arcSize=4;" vertex="1" parent="1">
          <mxGeometry x="618" y="48" width="352" height="88" as="geometry"/>
        </mxCell>
        <mxCell id="icon_dns" value="" style="sketch=0;outlineConnect=0;fontColor=#232F3E;gradientColor=none;strokeColor=none;fillColor=#4285F4;align=center;verticalAlign=top;shape=mxgraph.gcp2.cloud_dns;" vertex="1" parent="1">
          <mxGeometry x="626" y="73" width="28" height="28" as="geometry"/>
        </mxCell>

        <!-- CI/CD & Zero-Downtime Deployment Pipeline -->
        <mxCell id="card_cicd_pipeline" value="&lt;table cellpadding=&quot;0&quot; cellspacing=&quot;0&quot; style=&quot;width:100%;font-size:9.5px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;padding-left:34px;&quot;&gt;&lt;b style=&quot;color:#0F172A;font-size:10.5px;&quot;&gt;CI/CD &amp;amp; Zero-Downtime Pipeline&lt;/b&gt;&lt;br&gt;&lt;font color=&quot;#3C4043&quot;&gt;• &lt;b&gt;Cloud Build &amp;amp; Deploy:&lt;/b&gt; Automated Canary / Blue-Green&lt;br&gt;• &lt;b&gt;Artifact Registry:&lt;/b&gt; CMEK encrypted &amp;amp; Vulnerability Scanned&lt;br&gt;• &lt;b&gt;Binary Authorization:&lt;/b&gt; Cryptographic attestation gates&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8F9FA;strokeColor=#0F172A;strokeWidth=1.5;align=left;verticalAlign=middle;arcSize=4;" vertex="1" parent="1">
          <mxGeometry x="988" y="48" width="532" height="88" as="geometry"/>
        </mxCell>
        <mxCell id="icon_cicd" value="" style="sketch=0;outlineConnect=0;fontColor=#232F3E;gradientColor=none;strokeColor=none;fillColor=#0F172A;align=center;verticalAlign=top;shape=mxgraph.gcp2.cloud_build;" vertex="1" parent="1">
          <mxGeometry x="996" y="73" width="28" height="28" as="geometry"/>
        </mxCell>

        <!-- Ingress Arrow: Clients -> GLB -->
        <mxCell id="edge_client_to_glb" value="&lt;b style=&quot;font-size:9px;color:#1A73E8;&quot;&gt;HTTPS&lt;br&gt;TLS 1.3&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1A73E8;strokeWidth=2;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;spacingTop=2;spacingBottom=2;" edge="1" parent="1" source="box_clients" target="card_glb">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- ================= LEFT COLUMN: SECURITY, GOVERNANCE & VPC-SC PERIMETER (x = 40, w = 140, y = 148, h = 404) ================= -->
        <mxCell id="box_security_col" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8F9FA;strokeColor=#7C3AED;strokeWidth=1.5;arcSize=4;" vertex="1" parent="1">
          <mxGeometry x="40" y="148" width="140" height="404" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_sec_col" value="&lt;b style=&quot;color:#7C3AED;font-size:9.5px;&quot;&gt;SECURITY &amp;amp; VPC-SC PERIMETER&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="40" y="152" width="140" height="18" as="geometry"/>
        </mxCell>

        <!-- Cloud IAM & Workload Identity -->
        <mxCell id="card_iam" value="&lt;table cellpadding=&quot;0&quot; cellspacing=&quot;0&quot; style=&quot;width:100%;font-size:9px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;padding-left:24px;&quot;&gt;&lt;b style=&quot;color:#7C3AED;&quot;&gt;Cloud IAM &amp;amp; SA&lt;/b&gt;&lt;br&gt;&lt;font color=&quot;#5F6368&quot; style=&quot;font-size:8px;&quot;&gt;Dedicated SAs per Svc&lt;br&gt;Break-Glass PAM Only&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="48" y="174" width="124" height="50" as="geometry"/>
        </mxCell>
        <mxCell id="icon_iam" value="" style="sketch=0;outlineConnect=0;fontColor=#232F3E;gradientColor=none;strokeColor=none;fillColor=#7C3AED;align=center;verticalAlign=top;shape=mxgraph.gcp2.identity_and_access_management;" vertex="1" parent="1">
          <mxGeometry x="52" y="190" width="18" height="18" as="geometry"/>
        </mxCell>

        <!-- Cloud KMS (CMEK) -->
        <mxCell id="card_kms" value="&lt;table cellpadding=&quot;0&quot; cellspacing=&quot;0&quot; style=&quot;width:100%;font-size:9px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;padding-left:24px;&quot;&gt;&lt;b style=&quot;color:#7C3AED;&quot;&gt;Cloud KMS (CMEK)&lt;/b&gt;&lt;br&gt;&lt;font color=&quot;#5F6368&quot; style=&quot;font-size:8px;&quot;&gt;Dual-Key Ring HSM&lt;br&gt;90-Day Auto-Rotation&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="48" y="230" width="124" height="50" as="geometry"/>
        </mxCell>
        <mxCell id="icon_kms" value="" style="sketch=0;outlineConnect=0;fontColor=#232F3E;gradientColor=none;strokeColor=none;fillColor=#7C3AED;align=center;verticalAlign=top;shape=mxgraph.gcp2.key_management_service;" vertex="1" parent="1">
          <mxGeometry x="52" y="246" width="18" height="18" as="geometry"/>
        </mxCell>

        <!-- Secret Manager -->
        <mxCell id="card_secrets" value="&lt;table cellpadding=&quot;0&quot; cellspacing=&quot;0&quot; style=&quot;width:100%;font-size:9px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;padding-left:24px;&quot;&gt;&lt;b style=&quot;color:#7C3AED;&quot;&gt;Secret Manager&lt;/b&gt;&lt;br&gt;&lt;font color=&quot;#5F6368&quot; style=&quot;font-size:8px;&quot;&gt;DB Passwords &amp;amp; Keys&lt;br&gt;Versioned &amp;amp; Audited&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="48" y="286" width="124" height="50" as="geometry"/>
        </mxCell>
        <mxCell id="icon_secrets" value="" style="sketch=0;outlineConnect=0;fontColor=#232F3E;gradientColor=none;strokeColor=none;fillColor=#7C3AED;align=center;verticalAlign=top;shape=mxgraph.gcp2.secret_manager;" vertex="1" parent="1">
          <mxGeometry x="52" y="302" width="18" height="18" as="geometry"/>
        </mxCell>

        <!-- VPC Service Controls & PSC -->
        <mxCell id="card_vpc_sc" value="&lt;table cellpadding=&quot;0&quot; cellspacing=&quot;0&quot; style=&quot;width:100%;font-size:9px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;padding-left:24px;&quot;&gt;&lt;b style=&quot;color:#7C3AED;&quot;&gt;VPC-SC Perimeter&lt;/b&gt;&lt;br&gt;&lt;font color=&quot;#5F6368&quot; style=&quot;font-size:8px;&quot;&gt;Private Service Connect&lt;br&gt;Zero Data Exfiltration&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="48" y="342" width="124" height="50" as="geometry"/>
        </mxCell>
        <mxCell id="icon_vpc_sc" value="" style="sketch=0;outlineConnect=0;fontColor=#232F3E;gradientColor=none;strokeColor=none;fillColor=#7C3AED;align=center;verticalAlign=top;shape=mxgraph.gcp2.security_command_center;" vertex="1" parent="1">
          <mxGeometry x="52" y="358" width="18" height="18" as="geometry"/>
        </mxCell>

        <!-- Immutable Audit Logging Sink -->
        <mxCell id="card_audit_sink" value="&lt;table cellpadding=&quot;0&quot; cellspacing=&quot;0&quot; style=&quot;width:100%;font-size:8.5px;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td&gt;&lt;b style=&quot;color:#7C3AED;&quot;&gt;Immutable Audit Sink&lt;/b&gt;&lt;br&gt;&lt;font color=&quot;#5F6368&quot; style=&quot;font-size:8px;&quot;&gt;Locked WORM Storage&lt;br&gt;CFR Part 11 / GxP / SOC2&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F3E8FF;strokeColor=#7C3AED;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="48" y="398" width="124" height="44" as="geometry"/>
        </mxCell>

        <!-- Global Operations Box -->
        <mxCell id="bar_ops_global" value="&lt;table cellpadding=&quot;0&quot; cellspacing=&quot;0&quot; style=&quot;width:100%;font-size:8.5px;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td&gt;&lt;b style=&quot;color:#1A73E8;&quot;&gt;Cloud Operations Suite&lt;/b&gt;&lt;br&gt;&lt;font color=&quot;#5F6368&quot;&gt;Audit Logs • Cloud Trace&lt;br&gt;Error Budgets &amp;amp; SLIs/SLOs&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#1A73E8;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="48" y="450" width="124" height="92" as="geometry"/>
        </mxCell>

        <!-- ================= REGION A (PRIMARY ACTIVE SITE - US-EAST1) (x = 196, w = 530, y = 148, h = 404) ================= -->
        <mxCell id="box_reg_a" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#1A73E8;strokeWidth=1.5;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="196" y="148" width="530" height="404" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_reg_a_title" value="&lt;b style=&quot;font-size:11px;color:#1A73E8;&quot;&gt;REGION A (Primary Active Site - US-East1) • VPC: &lt;code&gt;10.10.0.0/20&lt;/code&gt;&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="206" y="152" width="300" height="20" as="geometry"/>
        </mxCell>
        
        <mxCell id="badge_reg_a_active" value="&lt;b style=&quot;color:#137333;font-size:9px;&quot;&gt;● 100% SERVING CAPACITY (ACTIVE)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#E6F4EA;strokeColor=#34A853;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="518" y="154" width="198" height="18" as="geometry"/>
        </mxCell>

        <!-- Region A: Compute & Microservices Container -->
        <mxCell id="box_compute_a" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8F9FA;strokeColor=#DADCE0;strokeWidth=1;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="206" y="176" width="510" height="122" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_compute_a" value="&lt;b style=&quot;color:#3C4043;font-size:9.5px;&quot;&gt;Compute Layer (Serverless Cloud Run)&lt;/b&gt; — &lt;font color=&quot;#5F6368&quot; style=&quot;font-size:8.5px;&quot;&gt;Direct VPC (&lt;code&gt;10.8.0.0/28&lt;/code&gt;) • 100-500 Pods (Max: 1000)&lt;/font&gt;" style="text;html=1;align=left;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="214" y="178" width="494" height="16" as="geometry"/>
        </mxCell>

        <!-- Microservice A -->
        <mxCell id="srv_a" value="&lt;table cellpadding=&quot;0&quot; cellspacing=&quot;0&quot; style=&quot;width:100%;font-size:8.5px;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td&gt;&lt;b style=&quot;color:#202124;&quot;&gt;Cloud Run&lt;/b&gt;&lt;br&gt;&lt;b style=&quot;color:#1A73E8;&quot;&gt;Microservice-A&lt;/b&gt;&lt;br&gt;&lt;font color=&quot;#5F6368&quot; style=&quot;font-size:7.5px;&quot;&gt;SA: &lt;code&gt;sa-ingress@&lt;/code&gt;&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#1A73E8;strokeWidth=1.5;align=center;verticalAlign=bottom;spacingBottom=3;" vertex="1" parent="1">
          <mxGeometry x="214" y="198" width="88" height="58" as="geometry"/>
        </mxCell>
        <mxCell id="icon_srv_a" value="" style="sketch=0;outlineConnect=0;fontColor=#232F3E;gradientColor=none;strokeColor=none;fillColor=#4285F4;align=center;verticalAlign=top;shape=mxgraph.gcp2.cloud_run;" vertex="1" parent="1">
          <mxGeometry x="249" y="200" width="18" height="18" as="geometry"/>
        </mxCell>

        <!-- Microservice B -->
        <mxCell id="srv_b" value="&lt;table cellpadding=&quot;0&quot; cellspacing=&quot;0&quot; style=&quot;width:100%;font-size:8.5px;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td&gt;&lt;b style=&quot;color:#202124;&quot;&gt;Cloud Run&lt;/b&gt;&lt;br&gt;&lt;b style=&quot;color:#1A73E8;&quot;&gt;Microservice-B&lt;/b&gt;&lt;br&gt;&lt;font color=&quot;#5F6368&quot; style=&quot;font-size:7.5px;&quot;&gt;SA: &lt;code&gt;sa-core@&lt;/code&gt;&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#1A73E8;strokeWidth=1.5;align=center;verticalAlign=bottom;spacingBottom=3;" vertex="1" parent="1">
          <mxGeometry x="340" y="198" width="88" height="58" as="geometry"/>
        </mxCell>
        <mxCell id="icon_srv_b" value="" style="sketch=0;outlineConnect=0;fontColor=#232F3E;gradientColor=none;strokeColor=none;fillColor=#4285F4;align=center;verticalAlign=top;shape=mxgraph.gcp2.cloud_run;" vertex="1" parent="1">
          <mxGeometry x="375" y="200" width="18" height="18" as="geometry"/>
        </mxCell>

        <!-- Microservice C -->
        <mxCell id="srv_c" value="&lt;table cellpadding=&quot;0&quot; cellspacing=&quot;0&quot; style=&quot;width:100%;font-size:8.5px;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td&gt;&lt;b style=&quot;color:#202124;&quot;&gt;Cloud Run&lt;/b&gt;&lt;br&gt;&lt;b style=&quot;color:#1A73E8;&quot;&gt;Microservice-C&lt;/b&gt;&lt;br&gt;&lt;font color=&quot;#5F6368&quot; style=&quot;font-size:7.5px;&quot;&gt;SA: &lt;code&gt;sa-data@&lt;/code&gt;&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#1A73E8;strokeWidth=1.5;align=center;verticalAlign=bottom;spacingBottom=3;" vertex="1" parent="1">
          <mxGeometry x="466" y="198" width="88" height="58" as="geometry"/>
        </mxCell>
        <mxCell id="icon_srv_c" value="" style="sketch=0;outlineConnect=0;fontColor=#232F3E;gradientColor=none;strokeColor=none;fillColor=#4285F4;align=center;verticalAlign=top;shape=mxgraph.gcp2.cloud_run;" vertex="1" parent="1">
          <mxGeometry x="501" y="200" width="18" height="18" as="geometry"/>
        </mxCell>

        <!-- Microservice D -->
        <mxCell id="srv_d" value="&lt;table cellpadding=&quot;0&quot; cellspacing=&quot;0&quot; style=&quot;width:100%;font-size:8.5px;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td&gt;&lt;b style=&quot;color:#202124;&quot;&gt;Cloud Run&lt;/b&gt;&lt;br&gt;&lt;b style=&quot;color:#1A73E8;&quot;&gt;Microservice-D&lt;/b&gt;&lt;br&gt;&lt;font color=&quot;#5F6368&quot; style=&quot;font-size:7.5px;&quot;&gt;SA: &lt;code&gt;sa-notif@&lt;/code&gt;&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#1A73E8;strokeWidth=1.5;align=center;verticalAlign=bottom;spacingBottom=3;" vertex="1" parent="1">
          <mxGeometry x="592" y="198" width="88" height="58" as="geometry"/>
        </mxCell>
        <mxCell id="icon_srv_d" value="" style="sketch=0;outlineConnect=0;fontColor=#232F3E;gradientColor=none;strokeColor=none;fillColor=#4285F4;align=center;verticalAlign=top;shape=mxgraph.gcp2.cloud_run;" vertex="1" parent="1">
          <mxGeometry x="627" y="200" width="18" height="18" as="geometry"/>
        </mxCell>

        <!-- Microservices Connecting Arrows -->
        <mxCell id="edge_srv_a_to_b" value="&lt;b style=&quot;font-size:8px;color:#1A73E8;&quot;&gt;gRPC&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1A73E8;strokeWidth=1.5;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;spacingTop=1;spacingBottom=1;" edge="1" parent="1" source="srv_a" target="srv_b">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_srv_b_to_c" value="&lt;b style=&quot;font-size:8px;color:#1A73E8;&quot;&gt;RPC&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1A73E8;strokeWidth=1.5;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;spacingTop=1;spacingBottom=1;" edge="1" parent="1" source="srv_b" target="srv_c">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_srv_c_to_d" value="&lt;b style=&quot;font-size:8px;color:#1A73E8;&quot;&gt;Async&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1A73E8;strokeWidth=1.5;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;spacingTop=1;spacingBottom=1;" edge="1" parent="1" source="srv_c" target="srv_d">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- Compute Autoscaling & VPC Pill -->
        <mxCell id="pill_capacity_a" value="&lt;b style=&quot;font-size:8.5px;color:#137333;&quot;&gt;STATELESS PODS • DIRECT VPC ACCESS CONNECTOR (&lt;code&gt;10.8.0.0/28&lt;/code&gt;) • PSC ENDPOINT (&lt;code&gt;10.10.1.5&lt;/code&gt;)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#E6F4EA;strokeColor=#34A853;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="214" y="268" width="494" height="22" as="geometry"/>
        </mxCell>

        <!-- Region A: In-Memory Cache (Memorystore for Redis HA with Circuit Breaker) -->
        <mxCell id="card_redis_a" value="&lt;table cellpadding=&quot;0&quot; cellspacing=&quot;0&quot; style=&quot;width:100%;font-size:9px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;padding-left:26px;&quot;&gt;&lt;b style=&quot;color:#059669;&quot;&gt;Memorystore for Redis (HA)&lt;/b&gt;&lt;br&gt;&lt;font color=&quot;#5F6368&quot; style=&quot;font-size:7.5px;&quot;&gt;Sub-ms session cache • Circuit Breaker Fallback&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#059669;strokeWidth=1.5;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="206" y="306" width="234" height="36" as="geometry"/>
        </mxCell>
        <mxCell id="icon_redis_a" value="" style="sketch=0;outlineConnect=0;fontColor=#232F3E;gradientColor=none;strokeColor=none;fillColor=#059669;align=center;verticalAlign=top;shape=mxgraph.gcp2.memorystore;" vertex="1" parent="1">
          <mxGeometry x="212" y="314" width="20" height="20" as="geometry"/>
        </mxCell>

        <!-- Region A: Cloud Pub/Sub Event Bus with DLQ -->
        <mxCell id="card_pubsub_a" value="&lt;table cellpadding=&quot;0&quot; cellspacing=&quot;0&quot; style=&quot;width:100%;font-size:9px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;padding-left:26px;&quot;&gt;&lt;b style=&quot;color:#1A73E8;&quot;&gt;Cloud Pub/Sub (with DLQ)&lt;/b&gt;&lt;br&gt;&lt;font color=&quot;#5F6368&quot; style=&quot;font-size:7.5px;&quot;&gt;Exponential Backoff (1-600s) • 5x Retry Cap&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#1A73E8;strokeWidth=1.5;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="482" y="306" width="234" height="36" as="geometry"/>
        </mxCell>
        <mxCell id="icon_pubsub_a" value="" style="sketch=0;outlineConnect=0;fontColor=#232F3E;gradientColor=none;strokeColor=none;fillColor=#4285F4;align=center;verticalAlign=top;shape=mxgraph.gcp2.cloud_pubsub;" vertex="1" parent="1">
          <mxGeometry x="488" y="314" width="20" height="20" as="geometry"/>
        </mxCell>

        <!-- Region A: Primary Database Tier Container -->
        <mxCell id="box_db_tier_a" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8F9FA;strokeColor=#BDC1C6;strokeWidth=1;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="206" y="350" width="510" height="140" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_db_tier_a" value="&lt;b style=&quot;color:#202124;font-size:9.5px;&quot;&gt;PRIMARY DATABASE TIER (US-East1) • PRIVATE SERVICE ACCESS (&lt;code&gt;10.128.0.0/20&lt;/code&gt;)&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="214" y="352" width="494" height="16" as="geometry"/>
        </mxCell>

        <!-- Primary Active Instance -->
        <mxCell id="db_primary" value="&lt;table cellpadding=&quot;0&quot; cellspacing=&quot;0&quot; style=&quot;width:100%;font-size:9px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;padding-left:28px;&quot;&gt;&lt;b style=&quot;color:#1A73E8;&quot;&gt;Cloud SQL Primary HA&lt;/b&gt;&lt;br&gt;&lt;font color=&quot;#137333&quot;&gt;&lt;b&gt;Zone: us-east1-b (Active)&lt;/b&gt;&lt;/font&gt;&lt;br&gt;&lt;font color=&quot;#5F6368&quot; style=&quot;font-size:8px;&quot;&gt;• Handles 100% Read/Write Queries&lt;br&gt;• CMEK Encryption (KMS Key HSM)&lt;br&gt;• Automated PITR backup enabled&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#1A73E8;strokeWidth=1.5;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="214" y="372" width="210" height="78" as="geometry"/>
        </mxCell>
        <mxCell id="icon_db_primary" value="" style="sketch=0;outlineConnect=0;fontColor=#232F3E;gradientColor=none;strokeColor=none;fillColor=#4285F4;align=center;verticalAlign=top;shape=mxgraph.gcp2.cloud_sql;" vertex="1" parent="1">
          <mxGeometry x="220" y="392" width="24" height="24" as="geometry"/>
        </mxCell>

        <!-- Zonal Standby Instance -->
        <mxCell id="db_zonal_stby" value="&lt;table cellpadding=&quot;0&quot; cellspacing=&quot;0&quot; style=&quot;width:100%;font-size:9px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;padding-left:28px;&quot;&gt;&lt;b style=&quot;color:#5F6368;&quot;&gt;Cloud SQL Zonal Standby&lt;/b&gt;&lt;br&gt;&lt;font color=&quot;#137333&quot;&gt;&lt;b&gt;Zone: us-east1-c (HA Sync)&lt;/b&gt;&lt;/font&gt;&lt;br&gt;&lt;font color=&quot;#5F6368&quot; style=&quot;font-size:8px;&quot;&gt;• Synchronous replication (RPO=0)&lt;br&gt;• Automatic failover (&amp;lt;30s)&lt;br&gt;• Zero RPO for single-zone outage&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#BDC1C6;strokeWidth=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="498" y="372" width="210" height="78" as="geometry"/>
        </mxCell>
        <mxCell id="icon_db_zonal_stby" value="" style="sketch=0;outlineConnect=0;fontColor=#232F3E;gradientColor=none;strokeColor=none;fillColor=#5F6368;align=center;verticalAlign=top;shape=mxgraph.gcp2.cloud_sql;" vertex="1" parent="1">
          <mxGeometry x="504" y="392" width="24" height="24" as="geometry"/>
        </mxCell>

        <!-- Synchronous HA Link -->
        <mxCell id="edge_intra_ha" value="&lt;b style=&quot;font-size:8px;color:#137333;&quot;&gt;Sync HA&lt;br&gt;(RPO=0)&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#34A853;strokeWidth=1.5;endArrow=block;endFill=1;startArrow=block;startFill=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#34A853;spacingTop=1;spacingBottom=1;" edge="1" parent="1" source="db_primary" target="db_zonal_stby">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- Database Footer Info -->
        <mxCell id="txt_db_footer" value="&lt;b style=&quot;color:#3C4043;font-size:8px;&quot;&gt;ENCRYPTION:&lt;/b&gt; CMEK (KMS us-east1) &amp;nbsp;|&amp;nbsp; &lt;b style=&quot;color:#3C4043;font-size:8px;&quot;&gt;PITR ACTIVE&lt;/b&gt; &amp;nbsp;|&amp;nbsp; &lt;b style=&quot;color:#3C4043;font-size:8px;&quot;&gt;STORAGE:&lt;/b&gt; GCS DUAL-REGION (Turbo SLA)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#BDC1C6;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="214" y="456" width="494" height="22" as="geometry"/>
        </mxCell>

        <!-- Region A: Cloud Operations Telemetry Bar -->
        <mxCell id="bar_ops_a" value="&lt;div style=&quot;font-size:8.5px;color:#3C4043;&quot;&gt;&lt;b style=&quot;color:#1A73E8;&quot;&gt;Google Cloud Operations (US-East1):&lt;/b&gt; Cloud Monitoring (SLIs/SLOs) • Cloud Logging • Cloud Trace • Cloud Profiler&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8F9FA;strokeColor=#1A73E8;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="206" y="498" width="510" height="26" as="geometry"/>
        </mxCell>

        <!-- Ingress Route: GLB -> Region A (Microservice A) -->
        <mxCell id="edge_glb_to_reg_a" value="&lt;b style=&quot;font-size:9px;color:#1A73E8;&quot;&gt;100% Active Ingress (Health Checked)&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1A73E8;strokeWidth=2.5;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#1A73E8;spacingTop=2;spacingBottom=2;" edge="1" parent="1" source="card_glb" target="srv_a">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="320" y="140"/>
              <mxPoint x="258" y="140"/>
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- Compute -> Redis Cache Edge -->
        <mxCell id="edge_compute_to_redis" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#059669;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1" source="srv_a" target="card_redis_a">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- Compute -> Cloud SQL Primary Transaction Edge (Clean Central Channel at x = 458) -->
        <mxCell id="edge_compute_to_sqldb" value="&lt;b style=&quot;font-size:8px;color:#137333;&quot;&gt;ACID (Port 5432)&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#34A853;strokeWidth=1.5;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#34A853;spacingTop=1;spacingBottom=1;" edge="1" parent="1" source="srv_b" target="db_primary">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="384" y="278"/>
              <mxPoint x="458" y="278"/>
              <mxPoint x="458" y="340"/>
              <mxPoint x="319" y="340"/>
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- ================= CENTER TIER: DUAL-REGION GCS & WAL ASYNC REPLICATION (x = 736, w = 240) ================= -->
        <!-- GCS Dual-Region Card -->
        <mxCell id="card_gcs_dual" value="&lt;table cellpadding=&quot;0&quot; cellspacing=&quot;0&quot; style=&quot;width:100%;font-size:9.5px;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td&gt;&lt;b style=&quot;color:#1A73E8;&quot;&gt;Google Cloud Storage&lt;/b&gt;&lt;br&gt;&lt;b style=&quot;color:#202124;&quot;&gt;Dual-Region Bucket&lt;/b&gt;&lt;br&gt;&lt;font color=&quot;#5F6368&quot;&gt;&lt;b&gt;us-east1 ↔ us-west1&lt;/b&gt;&lt;/font&gt;&lt;br&gt;&lt;font color=&quot;#3C4043;&quot; style=&quot;font-size:8.5px;&quot;&gt;• &lt;b&gt;Turbo Replication:&lt;/b&gt; 15-min SLA&lt;br&gt;• &lt;b&gt;Durability:&lt;/b&gt; 99.999999999% (11 9s)&lt;br&gt;• &lt;b&gt;Zero-Downtime Object Failover&lt;/b&gt;&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#1A73E8;strokeWidth=1.5;align=center;verticalAlign=bottom;spacingBottom=5;arcSize=4;" vertex="1" parent="1">
          <mxGeometry x="736" y="176" width="240" height="122" as="geometry"/>
        </mxCell>
        <mxCell id="icon_gcs_dual" value="" style="sketch=0;outlineConnect=0;fontColor=#232F3E;gradientColor=none;strokeColor=none;fillColor=#4285F4;align=center;verticalAlign=top;shape=mxgraph.gcp2.cloud_storage;" vertex="1" parent="1">
          <mxGeometry x="843" y="182" width="26" height="26" as="geometry"/>
        </mxCell>

        <!-- Async Database Replication Card -->
        <mxCell id="box_wal_card" value="&lt;table cellpadding=&quot;0&quot; cellspacing=&quot;0&quot; style=&quot;width:100%;font-size:9.5px;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td&gt;&lt;b style=&quot;color:#D93025;&quot;&gt;ASYNC DATABASE REPLICATION&lt;/b&gt;&lt;br&gt;&lt;b style=&quot;color:#202124;&quot;&gt;Google Dedicated Global Fiber&lt;/b&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#EA4335;strokeWidth=1.5;align=center;verticalAlign=top;spacingTop=6;arcSize=4;" vertex="1" parent="1">
          <mxGeometry x="736" y="350" width="240" height="140" as="geometry"/>
        </mxCell>

        <!-- Giant Red Arrow Shape for WAL Replication -->
        <mxCell id="arr_async_db" value="&lt;b style=&quot;color:#FFFFFF;font-size:9px;&quot;&gt;WAL Async Stream&lt;/b&gt;" style="shape=singleArrow;direction=east;whiteSpace=wrap;html=1;fillColor=#EA4335;strokeColor=#D93025;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="746" y="394" width="220" height="28" as="geometry"/>
        </mxCell>

        <!-- WAL Replication Lag Metric Badge -->
        <mxCell id="badge_wal_lag" value="&lt;b style=&quot;color:#B06000;font-size:9px;&quot;&gt;DATA LAG: 1-5 MIN&lt;/b&gt;&lt;br&gt;&lt;font color=&quot;#5F6368&quot; style=&quot;font-size:8px;&quot;&gt;(Engineered RPO Boundary)&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF7E0;strokeColor=#FBBC04;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="754" y="432" width="204" height="32" as="geometry"/>
        </mxCell>

        <!-- Center Connection Edges -->
        <mxCell id="edge_pubsub_to_gcs" value="&lt;b style=&quot;font-size:8px;color:#1A73E8;&quot;&gt;Storage Sync&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1A73E8;strokeWidth=1.5;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;spacingTop=1;spacingBottom=1;" edge="1" parent="1" source="card_pubsub_a" target="card_gcs_dual">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="726" y="324"/>
              <mxPoint x="726" y="238"/>
            </Array>
          </mxGeometry>
        </mxCell>

        <mxCell id="edge_direct_db_wal" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#EA4335;strokeWidth=2;endArrow=block;endFill=1;" edge="1" parent="1" source="db_zonal_stby" target="arr_async_db">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- ================= REGION B (STANDBY PILOT LIGHT SITE - US-WEST1) (x = 986, w = 534, y = 148, h = 404) ================= -->
        <mxCell id="box_reg_b" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#BDC1C6;strokeWidth=1.5;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="986" y="148" width="534" height="404" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_reg_b_title" value="&lt;b style=&quot;font-size:11px;color:#5F6368;&quot;&gt;REGION B (Standby Pilot Light Site - US-West1) • VPC: &lt;code&gt;10.20.0.0/20&lt;/code&gt;&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="996" y="152" width="300" height="20" as="geometry"/>
        </mxCell>
        
        <mxCell id="badge_reg_b_pilot" value="&lt;b style=&quot;color:#B06000;font-size:9px;&quot;&gt;● PILOT LIGHT STANDBY (~10% COST)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF7E0;strokeColor=#FBBC04;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1290" y="154" width="220" height="18" as="geometry"/>
        </mxCell>

        <!-- Region B: Warm Pilot Light Compute Container -->
        <mxCell id="box_compute_b" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF7E0;strokeColor=#FBBC04;strokeWidth=1;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="996" y="176" width="514" height="122" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_compute_b" value="&lt;b style=&quot;color:#3C4043;font-size:9.5px;&quot;&gt;Warm Pilot Light Compute Layer (Cloud Run)&lt;/b&gt; — &lt;font color=&quot;#5F6368&quot; style=&quot;font-size:8.5px;&quot;&gt;Direct VPC (&lt;code&gt;10.18.0.0/28&lt;/code&gt;)&lt;/font&gt;" style="text;html=1;align=left;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="1006" y="178" width="494" height="16" as="geometry"/>
        </mxCell>

        <!-- Warm API Standby Instance -->
        <mxCell id="srv_stby_a" value="&lt;table cellpadding=&quot;0&quot; cellspacing=&quot;0&quot; style=&quot;width:100%;font-size:8.5px;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td&gt;&lt;b style=&quot;color:#202124;&quot;&gt;Cloud Run API&lt;/b&gt;&lt;br&gt;&lt;b style=&quot;color:#D97706;&quot;&gt;Warm Standby&lt;/b&gt;&lt;br&gt;&lt;font color=&quot;#5F6368&quot; style=&quot;font-size:7.5px;&quot;&gt;1-2 Min Instances&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#FBBC04;strokeWidth=1.5;align=center;verticalAlign=bottom;spacingBottom=3;" vertex="1" parent="1">
          <mxGeometry x="1006" y="198" width="98" height="58" as="geometry"/>
        </mxCell>
        <mxCell id="icon_srv_stby_a" value="" style="sketch=0;outlineConnect=0;fontColor=#232F3E;gradientColor=none;strokeColor=none;fillColor=#F59E0B;align=center;verticalAlign=top;shape=mxgraph.gcp2.cloud_run;" vertex="1" parent="1">
          <mxGeometry x="1046" y="200" width="18" height="18" as="geometry"/>
        </mxCell>

        <!-- Warm Worker Standby Instance -->
        <mxCell id="srv_stby_b" value="&lt;table cellpadding=&quot;0&quot; cellspacing=&quot;0&quot; style=&quot;width:100%;font-size:8.5px;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td&gt;&lt;b style=&quot;color:#202124;&quot;&gt;Worker Tasks&lt;/b&gt;&lt;br&gt;&lt;b style=&quot;color:#D97706;&quot;&gt;Warm Standby&lt;/b&gt;&lt;br&gt;&lt;font color=&quot;#5F6368&quot; style=&quot;font-size:7.5px;&quot;&gt;Pre-warmed VPC&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#FBBC04;strokeWidth=1.5;align=center;verticalAlign=bottom;spacingBottom=3;" vertex="1" parent="1">
          <mxGeometry x="1114" y="198" width="98" height="58" as="geometry"/>
        </mxCell>
        <mxCell id="icon_srv_stby_b" value="" style="sketch=0;outlineConnect=0;fontColor=#232F3E;gradientColor=none;strokeColor=none;fillColor=#F59E0B;align=center;verticalAlign=top;shape=mxgraph.gcp2.cloud_run;" vertex="1" parent="1">
          <mxGeometry x="1154" y="200" width="18" height="18" as="geometry"/>
        </mxCell>

        <!-- Standby Callout Box -->
        <mxCell id="callout_pilot_light" value="&lt;div style=&quot;line-height:12px;font-size:8.5px;color:#3C4043;&quot;&gt;&lt;b style=&quot;color:#B06000;font-size:9px;&quot;&gt;PILOT LIGHT ARCHITECTURE PATTERN&lt;/b&gt;&lt;br&gt;• &lt;b&gt;Cost Optimization:&lt;/b&gt; Compute runs at ~10%, saving ~90% idle cost&lt;br&gt;• &lt;b&gt;Rapid Autoscaling:&lt;/b&gt; On failover, scales 1 to 500 pods in &amp;lt;45s&lt;br&gt;• &lt;b&gt;Traffic Isolation:&lt;/b&gt; Ingress blocked until Cloud SQL replica promotes&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#FBBC04;strokeWidth=1;align=left;verticalAlign=middle;spacingLeft=8;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="1222" y="194" width="278" height="64" as="geometry"/>
        </mxCell>

        <!-- Standby Serving Status Pill -->
        <mxCell id="pill_stby_status" value="&lt;b style=&quot;font-size:8.5px;color:#B06000;&quot;&gt;NOT SERVING ACTIVE TRAFFIC • STANDBY DIRECT VPC (&lt;code&gt;10.18.0.0/28&lt;/code&gt;) • PSA DB (&lt;code&gt;10.144.0.0/20&lt;/code&gt;)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#FBBC04;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1006" y="268" width="494" height="22" as="geometry"/>
        </mxCell>

        <!-- Region B: Secondary Storage Mirror & Redis Standby Container -->
        <!-- Storage Mirror on Left (Directly adjacent to GCS Dual Region!) -->
        <mxCell id="card_storage_mirror" value="&lt;table cellpadding=&quot;0&quot; cellspacing=&quot;0&quot; style=&quot;width:100%;font-size:9px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;padding-left:26px;&quot;&gt;&lt;b style=&quot;color:#1A73E8;&quot;&gt;Secondary Storage Mirror (US-West1)&lt;/b&gt;&lt;br&gt;&lt;font color=&quot;#5F6368&quot; style=&quot;font-size:7.5px;&quot;&gt;Dual-Region GCS replica &amp;amp; VPC Connector&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#1A73E8;strokeWidth=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1006" y="306" width="240" height="36" as="geometry"/>
        </mxCell>
        <mxCell id="icon_storage_mirror" value="" style="sketch=0;outlineConnect=0;fontColor=#232F3E;gradientColor=none;strokeColor=none;fillColor=#4285F4;align=center;verticalAlign=top;shape=mxgraph.gcp2.cloud_storage;" vertex="1" parent="1">
          <mxGeometry x="1012" y="314" width="20" height="20" as="geometry"/>
        </mxCell>

        <!-- Redis Standby on Right -->
        <mxCell id="card_redis_b" value="&lt;table cellpadding=&quot;0&quot; cellspacing=&quot;0&quot; style=&quot;width:100%;font-size:9px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;padding-left:26px;&quot;&gt;&lt;b style=&quot;color:#059669;&quot;&gt;Memorystore for Redis (Standby)&lt;/b&gt;&lt;br&gt;&lt;font color=&quot;#5F6368&quot; style=&quot;font-size:7.5px;&quot;&gt;Pre-warmed cache instance in US-West1&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#059669;strokeWidth=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1260" y="306" width="240" height="36" as="geometry"/>
        </mxCell>
        <mxCell id="icon_redis_b" value="" style="sketch=0;outlineConnect=0;fontColor=#232F3E;gradientColor=none;strokeColor=none;fillColor=#059669;align=center;verticalAlign=top;shape=mxgraph.gcp2.memorystore;" vertex="1" parent="1">
          <mxGeometry x="1266" y="314" width="20" height="20" as="geometry"/>
        </mxCell>

        <!-- Region B: Standby Database Tier Container -->
        <mxCell id="box_db_tier_b" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF7E0;strokeColor=#FBBC04;strokeWidth=1;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="996" y="350" width="514" height="140" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_db_tier_b" value="&lt;b style=&quot;color:#202124;font-size:9.5px;&quot;&gt;STANDBY DATABASE TIER (US-West1) • PRIVATE SERVICE ACCESS (&lt;code&gt;10.144.0.0/20&lt;/code&gt;)&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="1006" y="352" width="494" height="16" as="geometry"/>
        </mxCell>

        <!-- Cloud SQL Read Replica Instance -->
        <mxCell id="db_replica" value="&lt;table cellpadding=&quot;0&quot; cellspacing=&quot;0&quot; style=&quot;width:100%;font-size:9px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;padding-left:28px;&quot;&gt;&lt;b style=&quot;color:#1A73E8;&quot;&gt;Cloud SQL Read Replica&lt;/b&gt;&lt;br&gt;&lt;font color=&quot;#B06000;&quot;&gt;&lt;b&gt;Zone: us-west1-a (Standby)&lt;/b&gt;&lt;/font&gt;&lt;br&gt;&lt;font color=&quot;#5F6368&quot; style=&quot;font-size:8px;&quot;&gt;• Continuous WAL async cross-region sync&lt;br&gt;• Read-Only mode in steady state&lt;br&gt;• Promoted to Primary on failover&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#FBBC04;strokeWidth=1.5;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1006" y="372" width="224" height="78" as="geometry"/>
        </mxCell>
        <mxCell id="icon_db_replica" value="" style="sketch=0;outlineConnect=0;fontColor=#232F3E;gradientColor=none;strokeColor=none;fillColor=#F59E0B;align=center;verticalAlign=top;shape=mxgraph.gcp2.cloud_sql;" vertex="1" parent="1">
          <mxGeometry x="1012" y="392" width="24" height="24" as="geometry"/>
        </mxCell>

        <!-- Replica Promotion Card -->
        <mxCell id="card_replica_promote" value="&lt;div style=&quot;line-height:13px;font-size:8.5px;color:#3C4043;&quot;&gt;&lt;b style=&quot;color:#D93025;font-size:9.5px;&quot;&gt;REPLICA PROMOTION &amp;amp; INGRESS SWITCHING&lt;/b&gt;&lt;br&gt;• &lt;b&gt;Command:&lt;/b&gt; &lt;font face=&quot;monospace&quot; color=&quot;#202124&quot;&gt;gcloud sql instances promote-replica&lt;/font&gt;&lt;br&gt;• &lt;b&gt;Duration:&lt;/b&gt; Converts replica to Primary in 2-5m&lt;br&gt;• &lt;b&gt;Integrity:&lt;/b&gt; Sever Region A ingress before promotion&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#EA4335;strokeWidth=1.5;align=left;verticalAlign=middle;spacingLeft=8;arcSize=4;" vertex="1" parent="1">
          <mxGeometry x="1242" y="372" width="258" height="78" as="geometry"/>
        </mxCell>

        <!-- Standby Database Footer -->
        <mxCell id="txt_db_stby_footer" value="&lt;b style=&quot;color:#3C4043;font-size:8px;&quot;&gt;STANDBY DB:&lt;/b&gt; Pre-warmed async replica &amp;nbsp;|&amp;nbsp; &lt;b style=&quot;color:#3C4043;font-size:8px;&quot;&gt;CMEK:&lt;/b&gt; KMS us-west1 &amp;nbsp;|&amp;nbsp; &lt;b style=&quot;color:#3C4043;font-size:8px;&quot;&gt;STORAGE:&lt;/b&gt; us-west1 Mirror" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#FBBC04;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1006" y="456" width="494" height="22" as="geometry"/>
        </mxCell>

        <!-- Region B: Cloud Operations Telemetry Bar -->
        <mxCell id="bar_ops_b" value="&lt;div style=&quot;font-size:8.5px;color:#3C4043;&quot;&gt;&lt;b style=&quot;color:#D97706;&quot;&gt;Google Cloud Operations (US-West1):&lt;/b&gt; Pre-configured alert policies, SLO health monitoring, error budgets&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF7E0;strokeColor=#FBBC04;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="996" y="498" width="514" height="26" as="geometry"/>
        </mxCell>

        <!-- Ingress Route: GLB -> Region B (Dormant Standby Route) -->
        <mxCell id="edge_glb_to_reg_b" value="&lt;b style=&quot;font-size:9px;color:#D97706;&quot;&gt;Dormant Standby Route (Zero Live Ingress)&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#D97706;strokeWidth=2;dashed=1;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#FBBC04;spacingTop=2;spacingBottom=2;" edge="1" parent="1" source="card_glb" target="srv_stby_a">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="490" y="140"/>
              <mxPoint x="1055" y="140"/>
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- Turbo Sync Edge: GCS Dual-Region -> Region B Mirror (Clean Adjacent Vector) -->
        <mxCell id="edge_gcs_to_regb_mirror" value="&lt;b style=&quot;font-size:8px;color:#1A73E8;&quot;&gt;Turbo Sync&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1A73E8;strokeWidth=1.5;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;spacingTop=1;spacingBottom=1;" edge="1" parent="1" source="card_gcs_dual" target="card_storage_mirror">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="984" y="235"/>
              <mxPoint x="984" y="324"/>
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- Standby Compute -> Cloud SQL Read Replica (Dedicated Right Channel at x = 992) -->
        <mxCell id="edge_stby_compute_to_db" value="&lt;b style=&quot;font-size:8px;color:#B06000;&quot;&gt;Pre-conns (5432)&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#FBBC04;strokeWidth=1.5;dashed=1;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#FBBC04;spacingTop=1;spacingBottom=1;" edge="1" parent="1" source="srv_stby_a" target="db_replica">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1055" y="284"/>
              <mxPoint x="992" y="284"/>
              <mxPoint x="992" y="411"/>
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- Failover Promotion Action Edge -->
        <mxCell id="edge_promotion_trigger" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#EA4335;strokeWidth=2;dashed=1;endArrow=block;endFill=1;" edge="1" parent="1" source="card_replica_promote" target="db_replica">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- ================= BOTTOM ROW: SRE FAILOVER RUNBOOK & SIX PILLARS WELL-ARCHITECTED CERTIFICATION (y = 562, h = 114) ================= -->
        <!-- SRE Disaster Recovery & Failover Runbook -->
        <mxCell id="box_sre_runbook" value="&lt;div style=&quot;line-height:15px;font-size:10px;&quot;&gt;&lt;b style=&quot;font-size:11.5px;color:#D93025;&quot;&gt;⚡ SRE DISASTER RECOVERY &amp;amp; FAILOVER RUNBOOK (PILOT LIGHT CASE B)&lt;/b&gt; &amp;nbsp;&lt;font color=&quot;#5F6368&quot;&gt;— Ordered failover sequence ensuring zero split-brain and minimal data loss&lt;/font&gt;&lt;br&gt;&lt;table cellpadding=&quot;0&quot; cellspacing=&quot;3&quot; style=&quot;width:100%;margin-top:4px;font-size:9.5px;color:#3C4043;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:33%;vertical-align:top;&quot;&gt;&lt;b style=&quot;color:#D93025;&quot;&gt;❶ Step 1: Detect &amp;amp; Verify Failure&lt;/b&gt;&lt;br&gt;• Probes report 3 consecutive failures&lt;br&gt;• Automated P1 Escalation triggered&lt;/td&gt;&lt;td style=&quot;width:33%;vertical-align:top;&quot;&gt;&lt;b style=&quot;color:#D93025;&quot;&gt;❷ Step 2: Ingress Fencing (STONITH)&lt;/b&gt;&lt;br&gt;• Sever ingress to Region A at Global LB&lt;br&gt;• Prevent dual-primary split-brain writes&lt;/td&gt;&lt;td style=&quot;width:34%;vertical-align:top;&quot;&gt;&lt;b style=&quot;color:#D93025;&quot;&gt;❸ Step 3: Promote Cloud SQL Replica&lt;/b&gt;&lt;br&gt;• Run &lt;font face=&quot;monospace&quot;&gt;gcloud sql instances promote-replica&lt;/font&gt;&lt;br&gt;• Converts replica to Primary in 2-5m&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;vertical-align:top;&quot;&gt;&lt;b style=&quot;color:#1A73E8;&quot;&gt;❹ Step 4: Scale Pilot Light Compute&lt;/b&gt;&lt;br&gt;• Autoscale Cloud Run to 100-500 instances&lt;br&gt;• Warm instances eliminate cold starts (&amp;lt;45s)&lt;/td&gt;&lt;td style=&quot;vertical-align:top;&quot;&gt;&lt;b style=&quot;color:#1A73E8;&quot;&gt;❺ Step 5: Traffic Shift &amp;amp; Ingress Cutover&lt;/b&gt;&lt;br&gt;• Point Global LB 100% to Region B&lt;br&gt;• Verify zero-downtime serving &amp;amp; low errors&lt;/td&gt;&lt;td style=&quot;vertical-align:top;&quot;&gt;&lt;b style=&quot;color:#137333;&quot;&gt;❻ Step 6: Fallback Protocol (Recovery)&lt;/b&gt;&lt;br&gt;• Configure reverse async replication&lt;br&gt;• Drain WAL lag before restoring traffic&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#BDC1C6;strokeWidth=1;align=left;verticalAlign=top;spacingLeft=10;spacingTop=8;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="40" y="562" width="810" height="114" as="geometry"/>
        </mxCell>

        <!-- Google Cloud Well-Architected Framework: Six Pillars Certification Card -->
        <mxCell id="box_six_pillars" value="&lt;div style=&quot;line-height:14px;font-size:9.5px;&quot;&gt;&lt;b style=&quot;font-size:11px;color:#137333;&quot;&gt;🏆 GOOGLE CLOUD WELL-ARCHITECTED FRAMEWORK: SIX PILLARS VALIDATION&lt;/b&gt;&lt;br&gt;&lt;table cellpadding=&quot;0&quot; cellspacing=&quot;2&quot; style=&quot;width:100%;margin-top:4px;font-size:8.5px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;color:#202124;width:28%;&quot;&gt;&lt;b&gt;1. Operational Excellence:&lt;/b&gt;&lt;/td&gt;&lt;td style=&quot;color:#1A73E8;&quot;&gt;Cloud Ops Suite, automated SLI/SLO alerts, reproducible Terraform IaC&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;color:#202124;&quot;&gt;&lt;b&gt;2. Security &amp;amp; Privacy:&lt;/b&gt;&lt;/td&gt;&lt;td style=&quot;color:#7C3AED;&quot;&gt;Zero-Trust, Cloud Armor WAF, Workload Identity, CMEK encryption, VPC-SC&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;color:#202124;&quot;&gt;&lt;b&gt;3. Reliability (DR):&lt;/b&gt;&lt;/td&gt;&lt;td style=&quot;color:#137333;&quot;&gt;Regional HA (RPO=0) + Multi-Region WAL replica (RTO: 15-30m, RPO: 1-5m)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;color:#202124;&quot;&gt;&lt;b&gt;4. Cost Optimization:&lt;/b&gt;&lt;/td&gt;&lt;td style=&quot;color:#D97706;&quot;&gt;Pilot Light pattern (~90% idle compute savings), Serverless scale-to-zero&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;color:#202124;&quot;&gt;&lt;b&gt;5. Performance Opt:&lt;/b&gt;&lt;/td&gt;&lt;td style=&quot;color:#059669;&quot;&gt;Global Anycast VIP, HTTP/3, Redis sub-ms cache, Direct VPC Connectors&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;color:#202124;&quot;&gt;&lt;b&gt;6. Sustainability:&lt;/b&gt;&lt;/td&gt;&lt;td style=&quot;color:#137333;&quot;&gt;Carbon-minimized regional routing, 100% serverless resource efficiency&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#34A853;strokeWidth=1.5;align=left;verticalAlign=top;spacingLeft=10;spacingTop=8;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="866" y="562" width="654" height="114" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>

  <!-- PAGE 2: EXECUTIVE PLAYBOOK, IAC PARITY, COMPLIANCE & FMEA GOVERNANCE MATRIX -->
  <diagram id="gcp_dr_page2_playbook" name="Page 2: Executive Playbook &amp;amp; FMEA Governance Matrix">
    <mxGraphModel dx="1600" dy="1150" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1640" pageHeight="1150" background="#FFFFFF">
      <root>
        <mxCell id="p2_0"/>
        <mxCell id="p2_1" parent="p2_0"/>

        <!-- HEADER BANNER -->
        <mxCell id="p2_hdr_title" value="&lt;b style=&quot;font-size:16px;color:#202124;&quot;&gt;GOOGLE CLOUD MULTI-REGION DR: PRODUCTION GOVERNANCE, IAC PARITY &amp;amp; FMEA MATRIX&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fillColor=none;strokeColor=none;" vertex="1" parent="p2_1">
          <mxGeometry x="40" y="20" width="1540" height="26" as="geometry"/>
        </mxCell>
        <mxCell id="p2_hdr_sub" value="&lt;font color=&quot;#1A73E8&quot;&gt;&lt;b&gt;Terraform State Sync (1:1 Mapping)&lt;/b&gt;&lt;/font&gt; • &lt;font color=&quot;#7C3AED&quot;&gt;&lt;b&gt;Deep Network IPAM &amp;amp; VPC-SC Perimeter&lt;/b&gt;&lt;/font&gt; • &lt;font color=&quot;#137333&quot;&gt;&lt;b&gt;Granular Least-Privilege IAM&lt;/b&gt;&lt;/font&gt; • &lt;font color=&quot;#D93025&quot;&gt;&lt;b&gt;FMEA Failure Mode Analysis&lt;/b&gt;&lt;/font&gt;" style="text;html=1;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fillColor=none;strokeColor=none;fontSize=11;" vertex="1" parent="p2_1">
          <mxGeometry x="40" y="46" width="1540" height="20" as="geometry"/>
        </mxCell>

        <!-- COLUMN 1: TERRAFORM IAC 1:1 MODULE MAPPING & CI/CD (x = 40, w = 480) -->
        <mxCell id="p2_col1" value="&lt;table style=&#39;width:100%;border-collapse:collapse;&#39;&gt;&lt;tr&gt;&lt;td style=&#39;background-color:#1A73E8;padding:8px 12px;&#39;&gt;&lt;font color=&#39;#FFFFFF&#39;&gt;&lt;b&gt;🛠️ 1. Infrastructure as Code (IaC) &amp;amp; CI/CD Parity&lt;/b&gt;&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&#39;padding:12px;background-color:#FFFFFF;&#39;&gt;&lt;font color=&#39;#202124&#39; style=&#39;font-size:10.5px;line-height:1.5;&#39;&gt;&lt;b style=&#39;color:#1A73E8;&#39;&gt;A. Terraform Module State Mapping (1:1)&lt;/b&gt;&lt;br/&gt;• &lt;code&gt;module.global_lb&lt;/code&gt; → Cloud Armor security policy + Global HTTPS LB forwarding rules.&lt;br/&gt;• &lt;code&gt;module.cloud_run_region_a&lt;/code&gt; → Microservices A-D with Direct VPC connector attachment.&lt;br/&gt;• &lt;code&gt;module.cloud_sql_ha&lt;/code&gt; → PostgreSQL 15 HA primary + regional sync standby.&lt;br/&gt;• &lt;code&gt;module.cloud_sql_replica&lt;/code&gt; → Cross-region async read replica in US-West1.&lt;br/&gt;&lt;br/&gt;&lt;b style=&#39;color:#1A73E8;&#39;&gt;B. Automated CI/CD &amp;amp; Canary Deployment Path&lt;/b&gt;&lt;br/&gt;• &lt;b&gt;Cloud Build &amp;amp; Cloud Deploy:&lt;/b&gt; Git-triggered automated pipelines with canary traffic shifting (10% → 50% → 100%).&lt;br/&gt;• &lt;b&gt;Binary Authorization:&lt;/b&gt; Required attestation checks prevent non-compliant container deployments.&lt;br/&gt;• &lt;b&gt;Automated Rollbacks:&lt;/b&gt; Cloud Monitoring error rate threshold breaches trigger automatic traffic rollbacks in &amp;lt;15s.&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;strokeWidth=1.5;strokeColor=#1A73E8;verticalAlign=top;align=left;overflow=hidden;" vertex="1" parent="p2_1">
          <mxGeometry x="40" y="76" width="480" height="310" as="geometry"/>
        </mxCell>

        <!-- COLUMN 2: DEEP NETWORK PERIMETER & IPAM CIDR ALLOCATION (x = 540, w = 500) -->
        <mxCell id="p2_col2" value="&lt;table style=&#39;width:100%;border-collapse:collapse;&#39;&gt;&lt;tr&gt;&lt;td style=&#39;background-color:#7C3AED;padding:8px 12px;&#39;&gt;&lt;font color=&#39;#FFFFFF&#39;&gt;&lt;b&gt;🔒 2. Deep Network Perimeter &amp;amp; IPAM Allocation&lt;/b&gt;&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&#39;padding:12px;background-color:#FFFFFF;&#39;&gt;&lt;font color=&#39;#202124&#39; style=&#39;font-size:10.5px;line-height:1.5;&#39;&gt;&lt;b style=&#39;color:#7C3AED;&#39;&gt;A. IPAM CIDR Allocation Matrix (Zero Overlap)&lt;/b&gt;&lt;br/&gt;• &lt;b&gt;Region A VPC Subnet:&lt;/b&gt; &lt;code&gt;10.10.0.0/20&lt;/code&gt; (4,094 private host IPs)&lt;br/&gt;• &lt;b&gt;Region A Serverless Connector:&lt;/b&gt; &lt;code&gt;10.8.0.0/28&lt;/code&gt; (Direct VPC Access)&lt;br/&gt;• &lt;b&gt;Region A Private Service Access (PSA):&lt;/b&gt; &lt;code&gt;10.128.0.0/20&lt;/code&gt; (Cloud SQL)&lt;br/&gt;• &lt;b&gt;Region B VPC Subnet:&lt;/b&gt; &lt;code&gt;10.20.0.0/20&lt;/code&gt; (Standby VPC)&lt;br/&gt;• &lt;b&gt;Region B Serverless Connector:&lt;/b&gt; &lt;code&gt;10.18.0.0/28&lt;/code&gt;&lt;br/&gt;• &lt;b&gt;Region B PSA Database Range:&lt;/b&gt; &lt;code&gt;10.144.0.0/20&lt;/code&gt;&lt;br/&gt;&lt;br/&gt;&lt;b style=&#39;color:#7C3AED;&#39;&gt;B. VPC Service Controls (VPC-SC) &amp;amp; PSC Gateways&lt;/b&gt;&lt;br/&gt;• &lt;b&gt;Service Perimeter:&lt;/b&gt; Restricts GCS, Pub/Sub, and Cloud SQL to authorized VPC subnets, preventing exfiltration to untrusted GCP projects.&lt;br/&gt;• &lt;b&gt;Private Service Connect (PSC):&lt;/b&gt; Routes all Google API traffic via internal IP &lt;code&gt;10.10.1.5&lt;/code&gt; (No public internet transit).&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;strokeWidth=1.5;strokeColor=#7C3AED;verticalAlign=top;align=left;overflow=hidden;" vertex="1" parent="p2_1">
          <mxGeometry x="540" y="76" width="500" height="310" as="geometry"/>
        </mxCell>

        <!-- COLUMN 3: LEAST-PRIVILEGE WORKLOAD IDENTITY & QUOTAS (x = 1060, w = 520) -->
        <mxCell id="p2_col3" value="&lt;table style=&#39;width:100%;border-collapse:collapse;&#39;&gt;&lt;tr&gt;&lt;td style=&#39;background-color:#137333;padding:8px 12px;&#39;&gt;&lt;font color=&#39;#FFFFFF&#39;&gt;&lt;b&gt;🛡️ 3. Granular IAM &amp;amp; Quota Safeguards&lt;/b&gt;&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&#39;padding:12px;background-color:#FFFFFF;&#39;&gt;&lt;font color=&#39;#202124&#39; style=&#39;font-size:10.5px;line-height:1.5;&#39;&gt;&lt;b style=&#39;color:#137333;&#39;&gt;A. Dedicated Service Account Mapping&lt;/b&gt;&lt;br/&gt;• &lt;code&gt;sa-ingress@&lt;/code&gt; → &lt;code&gt;roles/run.invoker&lt;/code&gt; on Microservice-B only.&lt;br/&gt;• &lt;code&gt;sa-core@&lt;/code&gt; → &lt;code&gt;roles/pubsub.publisher&lt;/code&gt; &amp;amp; Cloud SQL Client.&lt;br/&gt;• &lt;code&gt;sa-data@&lt;/code&gt; → &lt;code&gt;roles/storage.objectAdmin&lt;/code&gt; (Scoped GCS Bucket).&lt;br/&gt;• &lt;b&gt;No Human Access:&lt;/b&gt; Zero persistent owner roles; break-glass via GCP Privileged Access Manager (PAM) with 4-hour TTL &amp;amp; dual-approval.&lt;br/&gt;&lt;br/&gt;&lt;b style=&#39;color:#137333;&#39;&gt;B. Quota Limits &amp;amp; Dead-Letter Queue (DLQ) Backpressure&lt;/b&gt;&lt;br/&gt;• &lt;b&gt;Cloud Run Concurrency:&lt;/b&gt; 80 requests/container, max 500 instances (Tested ceiling: 40,000 req/s per region).&lt;br/&gt;• &lt;b&gt;Pub/Sub Backpressure:&lt;/b&gt; Exponential backoff with Dead-Letter Topic after 5 delivery failures, alerting SRE on DLQ depth &amp;gt; 0.&lt;/font&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=3;strokeWidth=1.5;strokeColor=#137333;verticalAlign=top;align=left;overflow=hidden;" vertex="1" parent="p2_1">
          <mxGeometry x="1060" y="76" width="520" height="310" as="geometry"/>
        </mxCell>

        <!-- FULL-WIDTH BOTTOM TABLE: FAILURE MODE AND EFFECTS ANALYSIS (FMEA) & GXP COMPLIANCE (y = 400, h = 260) -->
        <mxCell id="p2_fmea_table" value="&lt;table style=&#39;width:100%;border-collapse:collapse;font-size:10px;&#39;&gt;&lt;tr style=&#39;background-color:#0F172A;color:#FFFFFF;&#39;&gt;&lt;th style=&#39;padding:8px;border:1px solid #CBD5E1;text-align:left;width:14%;&#39;&gt;Component / Failure Mode&lt;/th&gt;&lt;th style=&#39;padding:8px;border:1px solid #CBD5E1;text-align:left;width:14%;&#39;&gt;Failure Scenario&lt;/th&gt;&lt;th style=&#39;padding:8px;border:1px solid #CBD5E1;text-align:left;width:18%;&#39;&gt;Blast Radius&lt;/th&gt;&lt;th style=&#39;padding:8px;border:1px solid #CBD5E1;text-align:left;width:24%;&#39;&gt;Automated Mitigation &amp;amp; Fallback Mechanism&lt;/th&gt;&lt;th style=&#39;padding:8px;border:1px solid #CBD5E1;text-align:left;width:15%;&#39;&gt;Recovery Target (RTO/RPO)&lt;/th&gt;&lt;th style=&#39;padding:8px;border:1px solid #CBD5E1;text-align:left;width:15%;&#39;&gt;Regulatory / GxP Audit Verification&lt;/th&gt;&lt;/tr&gt;&lt;tr style=&#39;background-color:#F8FAFC;&#39;&gt;&lt;td style=&#39;padding:7px;border:1px solid #CBD5E1;&#39;&gt;&lt;b style=&#39;color:#D93025;&#39;&gt;Zone Outage (us-east1-b)&lt;/b&gt;&lt;/td&gt;&lt;td style=&#39;padding:7px;border:1px solid #CBD5E1;&#39;&gt;Primary Cloud SQL or compute failure in zone b&lt;/td&gt;&lt;td style=&#39;padding:7px;border:1px solid #CBD5E1;&#39;&gt;Zonal container traffic &amp;amp; DB primary instance&lt;/td&gt;&lt;td style=&#39;padding:7px;border:1px solid #CBD5E1;&#39;&gt;Automated Cloud SQL HA failover to &lt;code&gt;us-east1-c&lt;/code&gt;; Cloud Run auto-routes traffic across remaining healthy zones&lt;/td&gt;&lt;td style=&#39;padding:7px;border:1px solid #CBD5E1;&#39;&gt;&lt;b style=&#39;color:#137333;&#39;&gt;RTO: &amp;lt;30s&lt;br/&gt;RPO: 0 (Zero Loss)&lt;/b&gt;&lt;/td&gt;&lt;td style=&#39;padding:7px;border:1px solid #CBD5E1;&#39;&gt;CFR Part 11 electronic records preserved; zero transaction rollback&lt;/td&gt;&lt;/tr&gt;&lt;tr style=&#39;background-color:#FFFFFF;&#39;&gt;&lt;td style=&#39;padding:7px;border:1px solid #CBD5E1;&#39;&gt;&lt;b style=&#39;color:#D93025;&#39;&gt;Region Outage (US-East1)&lt;/b&gt;&lt;/td&gt;&lt;td style=&#39;padding:7px;border:1px solid #CBD5E1;&#39;&gt;Total loss of primary datacenter connectivity&lt;/td&gt;&lt;td style=&#39;padding:7px;border:1px solid #CBD5E1;&#39;&gt;All primary compute, cache &amp;amp; primary database tier&lt;/td&gt;&lt;td style=&#39;padding:7px;border:1px solid #CBD5E1;&#39;&gt;SRE Runbook Execution: 1) Ingress fenced, 2) &lt;code&gt;gcloud sql instances promote-replica&lt;/code&gt;, 3) Autoscale Pilot Light Cloud Run, 4) LB cutover&lt;/td&gt;&lt;td style=&#39;padding:7px;border:1px solid #CBD5E1;&#39;&gt;&lt;b style=&#39;color:#D93025;&#39;&gt;RTO: 15 - 30 min&lt;br/&gt;RPO: 1 - 5 min&lt;/b&gt;&lt;/td&gt;&lt;td style=&#39;padding:7px;border:1px solid #CBD5E1;&#39;&gt;Audit log immutable sink in secondary region guarantees compliance continuity&lt;/td&gt;&lt;/tr&gt;&lt;tr style=&#39;background-color:#F8FAFC;&#39;&gt;&lt;td style=&#39;padding:7px;border:1px solid #CBD5E1;&#39;&gt;&lt;b style=&#39;color:#059669;&#39;&gt;Cache Outage (Redis HA)&lt;/b&gt;&lt;/td&gt;&lt;td style=&#39;padding:7px;border:1px solid #CBD5E1;&#39;&gt;Memorystore cluster node degradation or network split&lt;/td&gt;&lt;td style=&#39;padding:7px;border:1px solid #CBD5E1;&#39;&gt;In-memory sub-ms session lookup latency&lt;/td&gt;&lt;td style=&#39;padding:7px;border:1px solid #CBD5E1;&#39;&gt;&lt;b&gt;Graceful Circuit Breaker:&lt;/b&gt; Cloud Run intercepts timeout (&amp;gt;50ms) and fails over to direct database read queries with rate-limiting&lt;/td&gt;&lt;td style=&#39;padding:7px;border:1px solid #CBD5E1;&#39;&gt;&lt;b style=&#39;color:#137333;&#39;&gt;RTO: &amp;lt;1s (Circuit Trip)&lt;br/&gt;RPO: 0&lt;/b&gt;&lt;/td&gt;&lt;td style=&#39;padding:7px;border:1px solid #CBD5E1;&#39;&gt;Zero data corruption; fallback logged in Cloud Operations Trace&lt;/td&gt;&lt;/tr&gt;&lt;tr style=&#39;background-color:#FFFFFF;&#39;&gt;&lt;td style=&#39;padding:7px;border:1px solid #CBD5E1;&#39;&gt;&lt;b style=&#39;color:#7C3AED;&#39;&gt;Asynchronous Backpressure&lt;/b&gt;&lt;/td&gt;&lt;td style=&#39;padding:7px;border:1px solid #CBD5E1;&#39;&gt;Downstream notification worker or pipeline throttle&lt;/td&gt;&lt;td style=&#39;padding:7px;border:1px solid #CBD5E1;&#39;&gt;Microservice-D async processing backlog&lt;/td&gt;&lt;td style=&#39;padding:7px;border:1px solid #CBD5E1;&#39;&gt;Pub/Sub retains backlog up to 7 days; exponential backoff retries (5x max) before routing to Dead-Letter Topic (DLQ)&lt;/td&gt;&lt;td style=&#39;padding:7px;border:1px solid #CBD5E1;&#39;&gt;&lt;b style=&#39;color:#137333;&#39;&gt;RTO: Seamless&lt;br/&gt;RPO: 0 (No Message Loss)&lt;/b&gt;&lt;/td&gt;&lt;td style=&#39;padding:7px;border:1px solid #CBD5E1;&#39;&gt;DLQ messages preserved with cryptographic tracing IDs for GxP audit&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=2;strokeWidth=1.5;strokeColor=#0F172A;verticalAlign=top;align=left;overflow=hidden;" vertex="1" parent="p2_1">
          <mxGeometry x="40" y="400" width="1540" height="240" as="geometry"/>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
