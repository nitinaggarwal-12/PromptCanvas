export function buildHealthcareFhirXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="healthcare_fhir_hl7" name="Google Cloud Healthcare &amp; Life Sciences FHIR/HL7 Clinical AI Platform (IND-HLTH-07)">
    <mxGraphModel dx="1600" dy="920" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="860" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- ==================== HEADER BANNER ==================== -->
        <mxCell id="top_logo" value="&lt;span style=&quot;font-size:24px;&quot;&gt;🏥&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="10" width="35" height="35" as="geometry"/>
        </mxCell>
        <mxCell id="main_title" value="&lt;b style=&quot;font-size:17px;color:#0F172A;letter-spacing:-0.2px;&quot;&gt;GOOGLE CLOUD HEALTHCARE &amp;amp; LIFE SCIENCES FHIR/HL7 CLINICAL AI PLATFORM&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="65" y="10" width="1250" height="22" as="geometry"/>
        </mxCell>
        <mxCell id="main_subtitle" value="&lt;span style=&quot;font-size:9.5px;color:#475569;font-weight:700;letter-spacing:0.2px;&quot;&gt;Phase 6: Industry Specialized Solutions | ABSTRACTION: Industry | LAYER: Layer 4 (Application) | Security: HIPAA BAA &amp;amp; VPC-SC&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="65" y="32" width="1250" height="16" as="geometry"/>
        </mxCell>
        
        <!-- Gemini 3.7 Flash Badge -->
        <mxCell id="top_gemini_badge" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12.5px;font-weight:bold;color:#38BDF8;&quot;&gt;✨ Gemini 3.7 Flash&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#94A3B8;font-weight:600;&quot;&gt;Clinical Intelligence Engine&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=20;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#1E293B;strokeWidth=1.5;align=center;verticalAlign=middle;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="1380" y="8" width="195" height="42" as="geometry"/>
        </mxCell>


        <!-- ==================== ROW 1: PATIENT DATA INGESTION & STANDARDIZATION ==================== -->
        <!-- Tab Label -->
        <mxCell id="row1_tab" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;Patient Data&lt;br&gt;Ingestion &amp;amp;&lt;br&gt;Standardization&lt;br&gt;(HL7/FHIR)&lt;/b&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="62" width="150" height="130" as="geometry"/>
        </mxCell>
        <!-- Row 1 Frame -->
        <mxCell id="row1_frame" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="180" y="62" width="1395" height="130" as="geometry"/>
        </mxCell>

        <!-- 1.1 EHR Systems -->
        <mxCell id="card_ehr_systems" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;[EHR Systems] &lt;span style=&quot;color:#2563EB;&quot;&gt;Epic&lt;/span&gt;, &lt;span style=&quot;color:#0284C7;&quot;&gt;Cerner&lt;/span&gt;, &lt;span style=&quot;color:#64748B;&quot;&gt;Allscripts&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:4px;&quot;&gt;• HL7v2 ADT/ORU Feeds via MLLP&lt;br&gt;• FHIR R4 JSON Bundles&lt;br&gt;• DICOM Medical Imaging PACS Archive&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="195" y="77" width="310" height="100" as="geometry"/>
        </mxCell>

        <!-- 1.2 Cloud HA VPN & Interconnect -->
        <mxCell id="card_cloud_vpn" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;[Cloud HA VPN &amp;amp; Interconnect]&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:4px;&quot;&gt;• HIPAA BAA Compliant Transit&lt;br&gt;• AES-256 IPsec Tunnel Encryption&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="580" y="77" width="280" height="100" as="geometry"/>
        </mxCell>

        <!-- 1.3 Google Cloud Healthcare API -->
        <mxCell id="card_healthcare_api" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;☁️ [Google Cloud Healthcare API]&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:4px;&quot;&gt;• HL7v2 Store (Auto-Transformation to FHIR)&lt;br&gt;• FHIR R4 Store (Streaming BigQuery Export)&lt;br&gt;• DICOM Store (Web Viewer Integration)&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="960" y="77" width="380" height="100" as="geometry"/>
        </mxCell>

        <!-- Connectors Row 1 -->
        <mxCell id="edge_ehr_to_vpn" value="&lt;b style=&quot;font-size:6.5px;color:#1E40AF;&quot;&gt;[1] MLLP/FHIR&lt;br&gt;REST / TLS&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#2563EB;strokeWidth=1.2;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#93C5FD;padding=1;" edge="1" parent="1" source="card_ehr_systems" target="card_cloud_vpn">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_vpn_to_api" value="&lt;b style=&quot;font-size:6.5px;color:#1E40AF;&quot;&gt;[2] AES-256&lt;br&gt;IPsec Tunnel&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#2563EB;strokeWidth=1.2;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#93C5FD;padding=1;" edge="1" parent="1" source="card_cloud_vpn" target="card_healthcare_api">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>


        <!-- ==================== ROW 2: PATIENT DATA LAKE & ANALYTICS ==================== -->
        <!-- Tab Label -->
        <mxCell id="row2_tab" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;Patient Data&lt;br&gt;Lake &amp;amp; Analytics&lt;br&gt;(BigQuery)&lt;/b&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="202" width="150" height="120" as="geometry"/>
        </mxCell>
        <!-- Row 2 Frame -->
        <mxCell id="row2_frame" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="180" y="202" width="1395" height="120" as="geometry"/>
        </mxCell>

        <!-- 2.1 BigQuery FHIR & OMOP CDM Lakehouse -->
        <mxCell id="card_bigquery_omop" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;🔍 [BigQuery FHIR &amp;amp; OMOP CDM Lakehouse]&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:4px;&quot;&gt;• Partitioned by Patient &amp;amp; Encounter Date&lt;br&gt;• Clinical Cohort Queries&lt;br&gt;• ML-Ready Datasets&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="720" y="215" width="370" height="94" as="geometry"/>
        </mxCell>

        <!-- 2.2 BigQuery ML 30-Day Readmission Predictor -->
        <mxCell id="card_readmission_pred" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;[BigQuery ML 30-Day Readmission Predictor]&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:4px;&quot;&gt;• Calculates Sepsis &amp;amp; High-Risk Patient Scores&lt;br&gt;• Real-Time EHR Alert Delivery to Care Teams&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1170" y="215" width="380" height="94" as="geometry"/>
        </mxCell>

        <!-- Row 1 to Row 2 Ingestion Arrow -->
        <mxCell id="edge_api_to_bq" value="&lt;b style=&quot;font-size:6.5px;color:#1E40AF;&quot;&gt;[3] Streaming / Batch Ingest&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#2563EB;strokeWidth=1.2;html=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;labelBackgroundColor=#FFFFFF;labelBorderColor=#93C5FD;padding=1;" edge="1" parent="1" source="card_healthcare_api" target="card_bigquery_omop">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_bq_to_pred" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#2563EB;strokeWidth=1.2;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="card_bigquery_omop" target="card_readmission_pred">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>


        <!-- ==================== ROW 3: CLINICAL & BIOPHARMA AI HUB ==================== -->
        <!-- Tab Label -->
        <mxCell id="row3_tab" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;Clinical &amp;amp;&lt;br&gt;BioPharma AI Hub&lt;br&gt;(Vertex AI &amp;amp; Gemini)&lt;/b&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="332" width="150" height="120" as="geometry"/>
        </mxCell>
        <!-- Row 3 Frame -->
        <mxCell id="row3_frame" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="180" y="332" width="1395" height="120" as="geometry"/>
        </mxCell>

        <!-- 3.1 Vertex AI Search for Healthcare -->
        <mxCell id="card_vertex_search_health" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;🛡️ [Vertex AI Search for Healthcare]&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:4px;&quot;&gt;• Medical Semantic Search over PubMed &amp;amp; Guidelines&lt;br&gt;• SNOMED-CT, RxNorm &amp;amp; LOINC Ontology Mapping&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="195" y="345" width="370" height="94" as="geometry"/>
        </mxCell>

        <!-- 3.2 Vertex AI Medical Imaging Vision Model -->
        <mxCell id="card_medical_imaging" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;🧠 [Vertex AI Medical Imaging Vision Model]&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:4px;&quot;&gt;• Pre-Reads Findings for Radiologist Sign-Off&lt;br&gt;• Anomaly Detection in X-Rays &amp;amp; CTs&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="585" y="345" width="370" height="94" as="geometry"/>
        </mxCell>

        <!-- 3.3 Gemini 3.7 Flash Clinical Reasoner -->
        <mxCell id="card_gemini_clinical" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;✨ [Gemini 3.7 Flash Clinical Reasoner]&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:4px;&quot;&gt;• Synthesizes Discharge Summaries &amp;amp; Lab Trends&lt;br&gt;• Drug-Drug Interaction Risk Flagging&lt;br&gt;• Patient Journey Summarization&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="975" y="345" width="430" height="94" as="geometry"/>
        </mxCell>


        <!-- ==================== ROW 4: PHYSICIAN & RESEARCH COCKPIT ==================== -->
        <!-- Tab Label -->
        <mxCell id="row4_tab" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;Physician &amp;amp;&lt;br&gt;Research&lt;br&gt;Cockpit&lt;/b&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="462" width="150" height="120" as="geometry"/>
        </mxCell>
        <!-- Row 4 Frame -->
        <mxCell id="row4_frame" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="180" y="462" width="1395" height="120" as="geometry"/>
        </mxCell>

        <!-- 4.1 Looker Clinical Operations Cockpit -->
        <mxCell id="card_looker_cockpit" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;📊 [Looker Clinical Operations Cockpit]&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:4px;&quot;&gt;• Patient Timeline, Vital Signs Trajectory&lt;br&gt;• ICU Bed Availability &amp;amp; Nurse Staffing Heatmaps&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="195" y="475" width="370" height="94" as="geometry"/>
        </mxCell>

        <!-- 4.2 Automated Clinical Trial Matching Engine -->
        <mxCell id="card_trial_matching" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;👥 [Automated Clinical Trial Matching Engine]&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:4px;&quot;&gt;• Evaluates Inclusion/Exclusion Criteria&lt;br&gt;• Accelerates Oncology Trial Enrollment&lt;br&gt;• Patient Feasibility Study&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="610" y="475" width="370" height="94" as="geometry"/>
        </mxCell>

        <!-- 4.3 SMART on FHIR Patient Mobile Portal -->
        <mxCell id="card_patient_portal" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;📱 [SMART on FHIR Patient Mobile Portal]&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:4px;&quot;&gt;• OAuth2 Scoped Patient Health Record Access&lt;br&gt;• Doctor Chat&lt;br&gt;• Lab Result Viewing&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1035" y="475" width="380" height="94" as="geometry"/>
        </mxCell>

        <!-- Connectors Row 4 -->
        <mxCell id="edge_looker_to_trial" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#2563EB;strokeWidth=1.2;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="card_looker_cockpit" target="card_trial_matching">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <!-- AI to Cockpit Connector -->
        <mxCell id="edge_ai_to_cockpit" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#2563EB;strokeWidth=1.2;html=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="card_vertex_search_health" target="card_looker_cockpit">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>


        <!-- ==================== ROW 5: TRUST, PRIVACY & GOVERNANCE ==================== -->
        <!-- Tab Label -->
        <mxCell id="row5_tab" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;Trust, Privacy&lt;br&gt;&amp;amp; Governance&lt;/b&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="592" width="150" height="150" as="geometry"/>
        </mxCell>
        <!-- Row 5 Frame (Blue Header) -->
        <mxCell id="row5_frame" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#3B82F6;strokeColor=#1D4ED8;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="180" y="592" width="1395" height="150" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_trust_hdr" value="&lt;b style=&quot;font-size:12px;color:#FFFFFF;letter-spacing:1px;&quot;&gt;TRUST, PRIVACY &amp;amp; GOVERNANCE&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="190" y="596" width="1375" height="22" as="geometry"/>
        </mxCell>

        <!-- 5.1 Cloud DLP -->
        <mxCell id="card_dlp_phi" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;&quot;&gt;🔒 [Cloud DLP PHI&lt;br&gt;De-Identification Shield]&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;color:#475569;padding-top:2px;&quot;&gt;Redacts 18 HIPAA Safe Harbor PHI Identifiers&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="195" y="625" width="310" height="98" as="geometry"/>
        </mxCell>

        <!-- 5.2 Cloud KMS HSM -->
        <mxCell id="card_kms_hsm" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;&quot;&gt;🔑 [Cloud KMS HSM&lt;br&gt;(Patient CMEK Keys)]&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;color:#475569;padding-top:2px;&quot;&gt;FIPS 140-2 Level 3 Hardware Key Custody&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="525" y="625" width="300" height="98" as="geometry"/>
        </mxCell>

        <!-- 5.3 VPC Service Controls -->
        <mxCell id="card_vpc_sc" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;&quot;&gt;🧱 [VPC Service Controls&lt;br&gt;(VPC-SC)]&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;color:#475569;padding-top:2px;&quot;&gt;Zero-Trust Clinical Perimeter Isolation&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="845" y="625" width="300" height="98" as="geometry"/>
        </mxCell>

        <!-- 5.4 Cloud Audit Logs -->
        <mxCell id="card_audit_logs" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;&quot;&gt;📋 [Cloud Audit Logs &amp;amp;&lt;br&gt;Access Transparency]&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;color:#475569;padding-top:2px;&quot;&gt;Immutable WORM Storage for 7 Years (HIPAA)&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1165" y="625" width="390" height="98" as="geometry"/>
        </mxCell>

        <!-- Trust & Governance Arrows up to Cockpit and Ingress -->
        <mxCell id="edge_trust_to_cockpit" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#1E40AF;strokeWidth=1.2;html=1;exitX=0.5;exitY=0;entryX=0.5;entryY=1;" edge="1" parent="1" source="card_dlp_phi" target="card_looker_cockpit">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_trust_to_portal" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#1E40AF;strokeWidth=1.2;html=1;exitX=0.5;exitY=0;entryX=0.5;entryY=1;" edge="1" parent="1" source="card_audit_logs" target="card_patient_portal">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>


        <!-- ==================== FOOTER LEGEND ==================== -->
        <!-- x = 25 .. 1575 (width = 1550, height = 40) -->
        <mxCell id="footer_legend" value="&lt;table style=&quot;width:100%;font-size:7.5px;color:#334155;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td&gt;&lt;b style=&quot;color:#0F172A;&quot;&gt;Professional Legend:&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🔵 &lt;b&gt;Data&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🔷 &lt;b&gt;Compute&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🟢 &lt;b&gt;Security&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🔴 &lt;b&gt;Controls&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🔒 &lt;b&gt;Access Transparency&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🛡️ &lt;b&gt;HIPAA BAA Compliant&lt;/b&gt;&lt;/td&gt;&lt;td&gt;✨ &lt;b style=&quot;color:#1D4ED8;&quot;&gt;Gemini 3.7 Clinical Engine&lt;/b&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="755" width="1550" height="36" as="geometry"/>
        </mxCell>

        <mxCell id="footer_copyright" value="&lt;span style=&quot;font-size:7px;color:#94A3B8;&quot;&gt;© 2026 Google LLC | Confidential &amp;amp; Proprietary&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="796" width="300" height="14" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
