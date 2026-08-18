export function buildDataResidencySovereignMapXml(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="app.diagrams.net" modified="2026-04-01T00:00:00.000Z" agent="PromptCanvas" version="24.0.0" type="device">
  <diagram id="data_residency_sovereign_map" name="Data Residency &amp; Sovereign Cloud Map">
    <mxGraphModel dx="1600" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="950" background="#FFFFFF">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- ==================== HEADER (TOP LEFT) ==================== -->
        <mxCell id="main_title_box" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="16" width="720" height="56" as="geometry"/>
        </mxCell>
        <mxCell id="main_title" value="&lt;b style=&quot;font-size:18px;color:#0F172A;&quot;&gt;Data Residency &amp;amp; Sovereign Cloud Map (P4-SEC-P-03)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:12px;color:#475569;font-weight:600;&quot;&gt;VPC Service Controls • Multi-Region Sovereign Boundaries • Real-time Compliance Lineage&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="45" y="18" width="690" height="52" as="geometry"/>
        </mxCell>

        <!-- Compliance Badges -->
        <mxCell id="badge_gdpr" value="&lt;font style=&quot;font-size:8.5px;color:#FFFFFF;&quot;&gt;&lt;b&gt;GDPR&lt;/b&gt;&lt;/font&gt;" style="ellipse;whiteSpace=wrap;html=1;fillColor=#0284C7;strokeColor=none;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="770" y="26" width="36" height="36" as="geometry"/>
        </mxCell>
        <mxCell id="badge_eu_ai" value="&lt;font style=&quot;font-size:8px;color:#FFFFFF;&quot;&gt;&lt;b&gt;EU AI&lt;br&gt;Act&lt;/b&gt;&lt;/font&gt;" style="ellipse;whiteSpace=wrap;html=1;fillColor=#0284C7;strokeColor=none;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="815" y="26" width="36" height="36" as="geometry"/>
        </mxCell>
        <mxCell id="badge_hipaa" value="&lt;font style=&quot;font-size:8px;color:#FFFFFF;&quot;&gt;&lt;b&gt;HIPAA&lt;/b&gt;&lt;/font&gt;" style="ellipse;whiteSpace=wrap;html=1;fillColor=#0284C7;strokeColor=none;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="860" y="26" width="36" height="36" as="geometry"/>
        </mxCell>


        <!-- ==================== LEFT INGRESS & PERSONAS (x = 30 .. 270) ==================== -->
        <!-- Ingress Personas Container -->
        <mxCell id="box_personas_left" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="30" y="90" width="240" height="150" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_personas_hdr" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Governance &amp;amp; SecOps Personas&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=top;" vertex="1" parent="1">
          <mxGeometry x="35" y="96" width="230" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="ico_sre_lead" value="&lt;font style=&quot;font-size:22px;&quot;&gt;👤&lt;/font&gt;&lt;br&gt;&lt;b style=&quot;font-size:8.5px;color:#0F172A;&quot;&gt;SRE Lead&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="130" width="65" height="55" as="geometry"/>
        </mxCell>
        <mxCell id="ico_legal_lead" value="&lt;font style=&quot;font-size:22px;&quot;&gt;👩‍💼&lt;/font&gt;&lt;br&gt;&lt;b style=&quot;font-size:8.5px;color:#0F172A;&quot;&gt;Legal Lead&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="115" y="130" width="65" height="55" as="geometry"/>
        </mxCell>
        <mxCell id="ico_ciso_lead" value="&lt;font style=&quot;font-size:22px;&quot;&gt;👨‍💼&lt;/font&gt;&lt;br&gt;&lt;b style=&quot;font-size:8.5px;color:#0F172A;&quot;&gt;CISO&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="190" y="130" width="65" height="55" as="geometry"/>
        </mxCell>

        <!-- End Users & Ingress Traffic Card -->
        <mxCell id="card_end_users" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:26px;&quot;&gt;👥💻&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;padding-top:2px;&quot;&gt;End Users &amp;amp; Patients&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#64748B;&quot;&gt;Regional Data Ingestion Source&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="30" y="270" width="240" height="110" as="geometry"/>
        </mxCell>

        <!-- Cloud Load Balancing (Global/Regional) -->
        <mxCell id="box_glb" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:22px;&quot;&gt;🔀&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;&quot;&gt;Cloud Load Balancing&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;Geo-Fencing &amp;amp; TLS Termination&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.5;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="30" y="420" width="240" height="90" as="geometry"/>
        </mxCell>

        <mxCell id="edge_users_to_glb" value="Patient Data Stream" style="edgeStyle=none;html=1;strokeColor=#2563EB;strokeWidth=2;endArrow=classic;fontSize=8.5;fontColor=#1E40AF;labelBackgroundColor=#FFFFFF;padding=2;" edge="1" parent="1" source="card_end_users" target="box_glb">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>


        <!-- ==================== CENTER: CORE SOVEREIGN CLOUD (x = 300 .. 910) ==================== -->
        <mxCell id="box_sovereign_container" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#94A3B8;strokeWidth=1.5;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="300" y="90" width="620" height="740" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_sovereign_hdr" value="☁️ &lt;b style=&quot;font-size:13px;color:#1E293B;&quot;&gt;Google Cloud Core Sovereign Architecture&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="315" y="98" width="450" height="24" as="geometry"/>
        </mxCell>

        <!-- REGION 1: EU-WEST4 (THE NETHERLANDS) -->
        <mxCell id="box_region_eu" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#334155;strokeWidth=1.2;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="320" y="135" width="580" height="315" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_region_eu_title" value="🇳🇱 &lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;GCP Sovereign Region: EU-West4 (The Netherlands)&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="335" y="140" width="400" height="22" as="geometry"/>
        </mxCell>

        <!-- EU VPC SC Perimeter (Red Dashed Box) -->
        <mxCell id="box_vpc_sc_eu" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFF1F2;strokeColor=#E11D48;strokeWidth=1.2;dashed=1;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="335" y="165" width="550" height="270" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_vpc_sc_eu_title" value="&lt;b style=&quot;font-size:9.5px;color:#BE123C;&quot;&gt;🛡️ VPC Service Controls (VPC-SC) EU Security Perimeter&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="345" y="170" width="380" height="18" as="geometry"/>
        </mxCell>

        <!-- EU Restricted GCP APIs & Vertex AI -->
        <mxCell id="box_restricted_api_eu" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;🧠 Vertex AI Local Sovereign Inference&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#334155;line-height:1.3;padding-top:2px;&quot;&gt;• Gemini 3.7 In-Region Execution&lt;br&gt;• Zero-Data Retention SLA&lt;br&gt;• EU Customer-Managed Keys (CMEK)&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=top;padding=4;" vertex="1" parent="1">
          <mxGeometry x="350" y="195" width="250" height="110" as="geometry"/>
        </mxCell>

        <!-- EU Storage & DB Services -->
        <mxCell id="box_gcs_eu" value="&lt;table style=&quot;width:100%;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;font-weight:bold;color:#0F172A;&quot;&gt;🗄️ Cloud Storage (EU-West4)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#64748B;&quot;&gt;Patient Raw &amp;amp; Encrypted EHR Blobs&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="615" y="195" width="255" height="48" as="geometry"/>
        </mxCell>
        <mxCell id="box_sql_eu" value="&lt;table style=&quot;width:100%;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;font-weight:bold;color:#0F172A;&quot;&gt;🛢️ Cloud SQL (PostgreSQL EU)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#64748B;&quot;&gt;GxP Validated • Sovereign Keys&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="615" y="255" width="255" height="48" as="geometry"/>
        </mxCell>
        <mxCell id="box_vector_eu" value="&lt;table style=&quot;width:100%;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;font-weight:bold;color:#0F172A;&quot;&gt;🌐 Vertex AI Vector Search (EU)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#64748B;&quot;&gt;In-Region Embedding Index&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="615" y="315" width="255" height="48" as="geometry"/>
        </mxCell>

        <!-- GLB into EU West -->
        <mxCell id="arr_glb_to_eu" value="EU Ingress" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endFill=1;fontSize=8.5;fontColor:#0F172A;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="box_glb" target="box_restricted_api_eu">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>


        <!-- REGION 2: US-CENTRAL1 (IOWA) -->
        <mxCell id="box_region_us" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#334155;strokeWidth=1.2;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="320" y="475" width="580" height="335" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_region_us_title" value="🇺🇸 &lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;GCP Sovereign Region: US-Central1 (Iowa)&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="335" y="480" width="400" height="22" as="geometry"/>
        </mxCell>

        <!-- US VPC SC Perimeter (Red Dashed Box) -->
        <mxCell id="box_vpc_sc_us" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFF1F2;strokeColor=#E11D48;strokeWidth=1.2;dashed=1;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="335" y="505" width="550" height="290" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_vpc_sc_us_title" value="&lt;b style=&quot;font-size:9.5px;color:#BE123C;&quot;&gt;🛡️ VPC Service Controls (VPC-SC) US Security Perimeter&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="345" y="510" width="380" height="18" as="geometry"/>
        </mxCell>

        <!-- US Restricted GCP APIs & Vertex AI -->
        <mxCell id="box_restricted_api_us" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;🧠 Vertex AI Local Sovereign Inference&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#334155;line-height:1.3;padding-top:2px;&quot;&gt;• Gemini 3.7 US Local Execution&lt;br&gt;• HIPAA Enforced BAA Perimeter&lt;br&gt;• US Cloud KMS CMEK Isolation&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=top;padding=4;" vertex="1" parent="1">
          <mxGeometry x="350" y="535" width="250" height="110" as="geometry"/>
        </mxCell>

        <!-- US Storage & DB Services -->
        <mxCell id="box_gcs_us" value="&lt;table style=&quot;width:100%;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;font-weight:bold;color:#0F172A;&quot;&gt;🗄️ Cloud Storage (US-Central1)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#64748B;&quot;&gt;HIPAA Encrypted Patient Archives&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="615" y="535" width="255" height="48" as="geometry"/>
        </mxCell>
        <mxCell id="box_sql_us" value="&lt;table style=&quot;width:100%;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;font-weight:bold;color:#0F172A;&quot;&gt;🛢️ Cloud SQL (PostgreSQL US)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#64748B;&quot;&gt;High Availability Failover Replica&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="615" y="595" width="255" height="48" as="geometry"/>
        </mxCell>
        <mxCell id="box_vector_us" value="&lt;table style=&quot;width:100%;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;font-weight:bold;color:#0F172A;&quot;&gt;🌐 Vertex AI Vector Search (US)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#64748B;&quot;&gt;US-Scoped RAG Embedding Index&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="615" y="655" width="255" height="48" as="geometry"/>
        </mxCell>


        <!-- ==================== RIGHT: OBSERVABILITY & CENTRAL COMPLIANCE (x = 940 .. 1570) ==================== -->
        <mxCell id="box_observability_container" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#94A3B8;strokeWidth=1.5;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="940" y="90" width="630" height="740" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_observability_title" value="📊 &lt;b style=&quot;font-size:13px;color:#1E293B;&quot;&gt;Central Observability &amp;amp; Sovereign Compliance Plane&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="955" y="98" width="550" height="24" as="geometry"/>
        </mxCell>

        <!-- Looker Studio Dashboard Sub-Container -->
        <mxCell id="box_looker_card" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td colspan=&quot;3&quot; style=&quot;font-size:11.5px;font-weight:bold;color:#1E40AF;border-bottom:1px solid #BFDBFE;padding-bottom:4px;&quot;&gt;📊 Looker Studio — Sovereign Compliance Cockpit&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;padding:6px;text-align:center;&quot;&gt;&lt;b style=&quot;font-size:9px;color:#64748B;&quot;&gt;Regional Data Score&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:16px;font-weight:bold;color:#16A34A;&quot;&gt;100% Compliant&lt;/span&gt;&lt;/td&gt;&lt;td style=&quot;padding:6px;text-align:center;&quot;&gt;&lt;b style=&quot;font-size:9px;color:#64748B;&quot;&gt;Cross-Border Leaks&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:16px;font-weight:bold;color:#2563EB;&quot;&gt;0 Incidents&lt;/span&gt;&lt;/td&gt;&lt;td style=&quot;padding:6px;text-align:center;&quot;&gt;&lt;b style=&quot;font-size:9px;color:#64748B;&quot;&gt;VPC-SC Violations&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:16px;font-weight:bold;color:#16A34A;&quot;&gt;0 Blocked&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#BFDBFE;strokeWidth=1.2;align=center;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="960" y="135" width="590" height="120" as="geometry"/>
        </mxCell>

        <!-- BigQuery & Central Logging Stack -->
        <mxCell id="box_central_logging" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;📑 Central Audit Logging &amp;amp; BigQuery Analytics&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9px;color:#334155;line-height:1.3;padding-top:2px;&quot;&gt;• Cloud Logging Aggregation Sink with CMEK Encryption&lt;br&gt;• BigQuery Audit Log Analytics Engine for Forensics&lt;br&gt;• Dataplex Data Governance &amp;amp; Column-Level Policy Tags&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="960" y="275" width="590" height="110" as="geometry"/>
        </mxCell>

        <!-- Management Plane Async Section -->
        <mxCell id="box_management_container" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;⚙️ Management Plane &amp;amp; Policy Automation (GitOps)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9px;color:#334155;line-height:1.3;padding-top:2px;&quot;&gt;• Terraform &amp;amp; Config Connector Sovereign Infrastructure as Code&lt;br&gt;• Automated Policy Validation Gates for GDPR, HIPAA &amp;amp; EU AI Act&lt;br&gt;• Continuous Compliance Drift Detection &amp;amp; Auto-Remediation&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="960" y="405" width="590" height="110" as="geometry"/>
        </mxCell>

        <!-- Security & SecOps Persona Review Card -->
        <mxCell id="card_secops_review" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#7C3AED;&quot;&gt;🔐 Security &amp;amp; Compliance Review Feed&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9px;color:#334155;line-height:1.3;padding-top:2px;&quot;&gt;• Daily Automated Compliance Sign-Off for Legal &amp;amp; CISO Teams&lt;br&gt;• Real-time Telemetry Alerts dispatched to PagerDuty &amp;amp; Slack&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#A855F7;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="960" y="535" width="590" height="85" as="geometry"/>
        </mxCell>

        <!-- Sovereign Telemetry Connectors -->
        <mxCell id="e_eu_to_log" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0284C7;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="box_region_eu" target="box_looker_card"/>
        <mxCell id="e_us_to_log" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0284C7;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="box_region_us" target="box_central_logging"/>


        <!-- ==================== FOOTER LEGEND ==================== -->
        <mxCell id="legend_box" value="&lt;table style=&quot;width:100%;font-size:9.5px;color:#334155;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td&gt;&lt;b style=&quot;color:#0F172A;&quot;&gt;Sovereign Cloud Fabric:&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🔵 &lt;b&gt;In-Region Sovereign Boundary&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🔴 &lt;b&gt;VPC-SC Security Perimeter&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🟢 &lt;b&gt;Zero-Data Retention Compliance&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🟣 &lt;b&gt;GitOps Policy Automation&lt;/b&gt;&lt;/td&gt;&lt;td&gt;✨ &lt;b style=&quot;color:#1D4ED8;&quot;&gt;Powered by Google Cloud Security&lt;/b&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="30" y="870" width="1540" height="38" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
