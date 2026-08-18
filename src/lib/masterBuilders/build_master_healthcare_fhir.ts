export function buildHealthcareFhirXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="healthcare_fhir_hl7" name="Google Cloud Healthcare &amp; Life Sciences FHIR / HL7 Pipeline (IND-HLTH-07)">
    <mxGraphModel dx="1600" dy="720" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="720" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- ==================== HEADER BANNER ==================== -->
        <mxCell id="top_logo" value="&lt;span style=&quot;font-size:24px;&quot;&gt;🏥&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="8" width="35" height="35" as="geometry"/>
        </mxCell>
        <mxCell id="main_title" value="&lt;b style=&quot;font-size:18px;color:#0F172A;&quot;&gt;GOOGLE CLOUD HEALTHCARE SOLUTION: FHIR R4, HL7v2 &amp;amp; CLINICAL AI PLATFORM&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="65" y="8" width="1150" height="24" as="geometry"/>
        </mxCell>
        <mxCell id="main_subtitle" value="&lt;span style=&quot;font-size:10.5px;color:#475569;font-weight:600;&quot;&gt;Cloud Healthcare API, DLP PHI De-Identification Shield, OMOP BigQuery Lakehouse &amp;amp; Gemini 3.7 Clinical Reasoner&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="65" y="30" width="1150" height="18" as="geometry"/>
        </mxCell>
        <mxCell id="top_gemini_badge" value="&lt;b style=&quot;font-size:16px;color:#2563EB;&quot;&gt;✨ Gemini 3.7 Flash&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Clinical Intelligence&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1420" y="8" width="150" height="38" as="geometry"/>
        </mxCell>

        <!-- ==================== COLUMN 1: HOSPITAL EHR & INGRESS ==================== -->
        <mxCell id="col1_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#60A5FA;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="25" y="60" width="340" height="585" as="geometry"/>
        </mxCell>
        <mxCell id="col1_title" value="&lt;b style=&quot;font-size:11px;color:#1D4ED8;&quot;&gt;🏥 Hospital EHR &amp;amp; Clinical Ingress Tier&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="35" y="68" width="320" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="node_ehr_ingress" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;EHR Systems (Epic, Cerner)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;• HL7v2 ADT / ORU Feeds via MLLP&lt;br&gt;• FHIR R4 JSON RESTful Bundles&lt;br&gt;• DICOM Medical Imaging PACS Archive&lt;/span&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=6;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="98" width="310" height="74" as="geometry"/>
        </mxCell>

        <mxCell id="node_cloud_vpn_ipsec" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;Cloud HA VPN &amp;amp; Interconnect&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;HIPAA BAA Compliant Transit Enclave&lt;br&gt;AES-256 IPsec Tunnel Encryption&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="210" width="310" height="74" as="geometry"/>
        </mxCell>

        <mxCell id="node_healthcare_api_ingest" value="&lt;b style=&quot;font-size:10.5px;color:#1D4ED8;&quot;&gt;Google Cloud Healthcare API&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;• HL7v2 Store (Auto-Transformation to FHIR)&lt;br&gt;• FHIR R4 Store (Streaming BigQuery Export)&lt;br&gt;• DICOM Store (Web Viewer Integration)&lt;/span&gt;" style="shape=mxgraph.flowchart.direct_data;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#1D4ED8;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="325" width="310" height="80" as="geometry"/>
        </mxCell>

        <mxCell id="node_pubsub_health_events" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;Cloud Pub/Sub (Clinical Event Stream)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Real-Time Patient Admission &amp;amp; Vitals Stream&lt;br&gt;Sub-Second Care Team Alert Delivery&lt;/span&gt;" style="shape=mxgraph.flowchart.direct_data;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="440" width="310" height="74" as="geometry"/>
        </mxCell>

        <!-- ==================== COLUMN 2: DE-IDENTIFICATION & HIPAA ==================== -->
        <mxCell id="col2_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#A855F7;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="390" y="60" width="360" height="585" as="geometry"/>
        </mxCell>
        <mxCell id="col2_title" value="&lt;b style=&quot;font-size:11px;color:#7E22CE;&quot;&gt;🛡️ PHI De-Identification &amp;amp; HIPAA Shield&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="400" y="68" width="340" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="node_dlp_phi_redactor" value="&lt;b style=&quot;font-size:10.5px;color:#7E22CE;&quot;&gt;Cloud DLP PHI De-Identification Shield&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Redacts 18 HIPAA Safe Harbor PHI Identifiers&lt;br&gt;Date Shifting &amp;amp; Crypto-Hashing for Research&lt;/span&gt;" style="shape=hexagon;perimeter=hexagonPerimeter2;whiteSpace=wrap;html=1;fixedSize=1;fillColor=#F3E8FF;strokeColor=#7E22CE;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="405" y="98" width="330" height="80" as="geometry"/>
        </mxCell>

        <mxCell id="node_cmek_hsm_health" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;Cloud KMS HSM (Patient CMEK Keys)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;FIPS 140-2 Level 3 Hardware Key Custody&lt;br&gt;Granular Access Boundary per Research Pod&lt;/span&gt;" style="shape=hexagon;perimeter=hexagonPerimeter2;whiteSpace=wrap;html=1;fixedSize=1;fillColor=#FFFFFF;strokeColor=#9333EA;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="405" y="210" width="330" height="74" as="geometry"/>
        </mxCell>

        <mxCell id="node_vpc_sc_healthcare" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;VPC Service Controls (VPC-SC)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Zero-Trust Perimeter Isolating Patient Records&lt;br&gt;Blocks External Data Exfiltration Vectors&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9333EA;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="405" y="325" width="330" height="74" as="geometry"/>
        </mxCell>

        <mxCell id="node_audit_hipaa_logs" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;Cloud Audit Logs &amp;amp; Access Transparency&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Every PHI Query Logged with Practitioner ID&lt;br&gt;Immutable WORM Storage for 7 Years&lt;/span&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=6;fillColor=#FFFFFF;strokeColor=#9333EA;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="405" y="440" width="330" height="70" as="geometry"/>
        </mxCell>

        <!-- ==================== COLUMN 3: CLINICAL AI & GEMINI ==================== -->
        <mxCell id="col3_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#22C55E;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="775" y="60" width="380" height="585" as="geometry"/>
        </mxCell>
        <mxCell id="col3_title" value="&lt;b style=&quot;font-size:11px;color:#15803D;&quot;&gt;🧠 Vertex AI &amp;amp; Gemini Clinical Hub&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="785" y="68" width="360" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="node_gemini_clinical_reasoner" value="&lt;b style=&quot;font-size:10.5px;color:#15803D;&quot;&gt;✨ Gemini 3.7 Flash Clinical Reasoner&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Synthesizes Discharge Summaries &amp;amp; Lab Trends&lt;br&gt;Drug-Drug Interaction Risk Flagging&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#15803D;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="790" y="98" width="350" height="74" as="geometry"/>
        </mxCell>

        <mxCell id="node_vertex_search_clinical" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;Vertex AI Search for Healthcare&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Medical Semantic Search over PubMed &amp;amp; Guidelines&lt;br&gt;SNOMED-CT, RxNorm &amp;amp; LOINC Ontology Mapping&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="790" y="210" width="350" height="74" as="geometry"/>
        </mxCell>

        <mxCell id="node_radiology_vision_ai" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;Vertex AI Medical Imaging Vision Model&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Chest X-Ray / CT Scan Anomaly Heatmaps&lt;br&gt;Pre-Reads Findings for Radiologist Sign-Off&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="790" y="325" width="350" height="74" as="geometry"/>
        </mxCell>

        <mxCell id="node_readmission_risk_model" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;BigQuery ML 30-Day Readmission Predictor&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Calculates Sepsis &amp;amp; High-Risk Patient Scores&lt;br&gt;Real-Time EHR Alert Delivery to Care Teams&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="790" y="440" width="350" height="70" as="geometry"/>
        </mxCell>

        <!-- ==================== COLUMN 4: BIGQUERY OMOP & COCKPIT ==================== -->
        <mxCell id="col4_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFBEB;strokeColor=#F59E0B;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1180" y="60" width="395" height="585" as="geometry"/>
        </mxCell>
        <mxCell id="col4_title" value="&lt;b style=&quot;font-size:11px;color:#B45309;&quot;&gt;📊 Physician Cockpit &amp;amp; Health Lakehouse&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1190" y="68" width="375" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="node_looker_physician_cockpit" value="&lt;b style=&quot;font-size:10.5px;color:#B45309;&quot;&gt;Looker Clinical Operations Cockpit&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Patient Timeline, Vital Signs Trajectory,&lt;br&gt;ICU Bed Availability &amp;amp; Nurse Staffing Heatmaps&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF3C7;strokeColor=#D97706;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1190" y="98" width="375" height="74" as="geometry"/>
        </mxCell>

        <mxCell id="node_bigquery_omop_lake" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;BigQuery FHIR &amp;amp; OMOP CDM Lakehouse&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Partitioned by Patient &amp;amp; Encounter Date | Clinical Cohort Queries&lt;/span&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=6;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1190" y="210" width="375" height="74" as="geometry"/>
        </mxCell>

        <mxCell id="node_clinical_trial_matcher" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;Automated Clinical Trial Matching Engine&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Evaluates Inclusion/Exclusion Criteria for Oncology Trials&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1190" y="325" width="375" height="74" as="geometry"/>
        </mxCell>

        <mxCell id="node_smart_on_fhir_apps" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;SMART on FHIR Patient Mobile Portal&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;OAuth2 Scoped Patient Health Record Access &amp;amp; Doctor Chat&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1190" y="440" width="375" height="70" as="geometry"/>
        </mxCell>

        <!-- ==================== NUMBERED PROTOCOL CONNECTORS ==================== -->
        <!-- [1] EHR -> Cloud VPN -->
        <mxCell id="edge1" value="&lt;b style=&quot;font-size:7px;color:#2563EB;&quot;&gt;[1] MLLP / FHIR REST :443&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;" edge="1" parent="1" source="node_ehr_ingress" target="node_cloud_vpn_ipsec">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- [2] VPN -> Healthcare API -->
        <mxCell id="edge2" value="&lt;b style=&quot;font-size:7px;color:#2563EB;&quot;&gt;[2] AES-256 IPsec Tunnel&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;" edge="1" parent="1" source="node_cloud_vpn_ipsec" target="node_healthcare_api_ingest">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- [3] Healthcare API -> DLP Redactor -->
        <mxCell id="edge3" value="&lt;b style=&quot;font-size:7px;color:#7E22CE;&quot;&gt;[3] PHI De-Identification&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#7E22CE;strokeWidth=1.5;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;" edge="1" parent="1" source="node_healthcare_api_ingest" target="node_dlp_phi_redactor">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- [4] DLP -> Gemini Clinical Reasoner -->
        <mxCell id="edge4" value="&lt;b style=&quot;font-size:7px;color:#16A34A;&quot;&gt;[4] De-Identified Tokens&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#16A34A;strokeWidth=1.5;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;" edge="1" parent="1" source="node_dlp_phi_redactor" target="node_gemini_clinical_reasoner">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- [5] Gemini -> Physician Cockpit -->
        <mxCell id="edge5" value="&lt;b style=&quot;font-size:7px;color:#16A34A;&quot;&gt;[5] Clinical Syntheses&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#16A34A;strokeWidth=1.5;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;" edge="1" parent="1" source="node_gemini_clinical_reasoner" target="node_looker_physician_cockpit">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- [6] Healthcare API -> BigQuery OMOP -->
        <mxCell id="edge6" value="&lt;b style=&quot;font-size:7px;color:#D97706;&quot;&gt;[6] OMOP Streaming Export&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#D97706;strokeWidth=1.5;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;" edge="1" parent="1" source="node_healthcare_api_ingest" target="node_bigquery_omop_lake">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- [7] BigQuery -> Trial Matcher -->
        <mxCell id="edge7" value="&lt;b style=&quot;font-size:7px;color:#D97706;&quot;&gt;[7] Cohort Evaluation&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#D97706;strokeWidth=1.5;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;" edge="1" parent="1" source="node_bigquery_omop_lake" target="node_clinical_trial_matcher">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- ==================== FOOTER LEGEND ==================== -->
        <mxCell id="footer_legend" value="&lt;span style=&quot;font-size:9px;color:#475569;&quot;&gt;&lt;b&gt;Healthcare FHIR Legend:&lt;/b&gt; 🔵 Cloud Healthcare API &amp;amp; HL7/FHIR &amp;nbsp;|&amp;nbsp; 🟣 DLP PHI Shield &amp;amp; KMS HSM &amp;nbsp;|&amp;nbsp; 🟢 Gemini Clinical Reasoner &amp;nbsp;|&amp;nbsp; 🗄️ OMOP Lakehouse Cylinder &amp;nbsp;|&amp;nbsp; ── [1]-[7] Protocol Vectors&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="658" width="1550" height="32" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
