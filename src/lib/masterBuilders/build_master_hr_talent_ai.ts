export function buildHrTalentAiXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="workforce_talent_ai" name="Google Cloud HR &amp; Talent Solution: WorkforceAI People Intelligence Platform (IND-HR-06)">
    <mxGraphModel dx="1600" dy="920" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="860" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- ==================== HEADER BANNER ==================== -->
        <mxCell id="top_logo" value="&lt;span style=&quot;font-size:24px;&quot;&gt;👔&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="10" width="35" height="35" as="geometry"/>
        </mxCell>
        <mxCell id="main_title" value="&lt;b style=&quot;font-size:17px;color:#0F172A;letter-spacing:-0.2px;&quot;&gt;GOOGLE CLOUD HR &amp;amp; TALENT SOLUTION: WORKFORCEAI PEOPLE INTELLIGENCE PLATFORM&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="65" y="10" width="1250" height="22" as="geometry"/>
        </mxCell>
        <mxCell id="main_subtitle" value="&lt;span style=&quot;font-size:9.5px;color:#475569;font-weight:700;letter-spacing:0.2px;&quot;&gt;Document AI Resume Parser, Cloud DLP PII Blind Screening, AlloyDB pgvector Enterprise Skills Graph, Gemini 3.7 Flash Match Evaluator &amp;amp; Looker Talent Cockpit.&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="65" y="32" width="1250" height="16" as="geometry"/>
        </mxCell>
        
        <!-- Gemini 3.7 Flash Badge -->
        <mxCell id="top_gemini_badge" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12.5px;font-weight:bold;color:#38BDF8;&quot;&gt;✨ Gemini 3.7 Flash&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#94A3B8;font-weight:600;&quot;&gt;People Intelligence&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=20;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#1E293B;strokeWidth=1.5;align=center;verticalAlign=middle;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="1380" y="8" width="195" height="42" as="geometry"/>
        </mxCell>


        <!-- ==================== TOP TIER: 3 COLUMN CONTAINERS ==================== -->

        <!-- CONTAINER 1: CANDIDATE & HRIS INGESTION -->
        <mxCell id="frame_c1_ingestion" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#FAFAFA;strokeColor=#CBD5E1;strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="25" y="62" width="360" height="275" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_c1_title" value="&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;Candidate &amp;amp; HRIS Ingestion (PII &amp;amp; Skills)&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="35" y="66" width="340" height="18" as="geometry"/>
        </mxCell>

        <!-- 1.1 ATS & HRIS Connectors -->
        <mxCell id="card_ats_connectors" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;🔄 ATS &amp;amp; HRIS Connectors&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:4px;&quot;&gt;• Workday, SAP SuccessFactors, Greenhouse&lt;br&gt;• Real-time Webhooks &amp;amp; Delta Sync&lt;br&gt;• Historical Data Import&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="35" y="88" width="340" height="95" as="geometry"/>
        </mxCell>

        <!-- 1.2 Document AI Resume Parser -->
        <mxCell id="card_doc_ai_parser" value="&lt;table style=&quot;width:100%;text-align:center;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#1D4ED8;&quot;&gt;Document AI Resume Parser&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:4px;&quot;&gt;OCR Extraction of Work History &amp;amp; Education&lt;br&gt;Skills, Certifications &amp;amp; Code Portfolios&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="shape=note;whiteSpace=wrap;html=1;size=14;verticalAlign=middle;fillColor=#DBEAFE;strokeColor=#2563EB;strokeWidth=1.5;align=center;" vertex="1" parent="1">
          <mxGeometry x="35" y="215" width="340" height="105" as="geometry"/>
        </mxCell>

        <mxCell id="edge_ats_to_docai" value="&lt;b style=&quot;font-size:6px;color:#1E40AF;&quot;&gt;[1] GenAI / OCR Import&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#2563EB;strokeWidth=1.2;html=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;labelBackgroundColor=#FFFFFF;labelBorderColor=#93C5FD;padding=1;" edge="1" parent="1" source="card_ats_connectors" target="card_doc_ai_parser">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>


        <!-- CONTAINER 2: SKILLS GRAPH & VECTOR TAXONOMY -->
        <mxCell id="frame_c2_skills" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#FAFAFA;strokeColor=#CBD5E1;strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="405" y="62" width="680" height="275" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_c2_title" value="&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;Skills Graph &amp;amp; Vector Taxonomy (AlloyDB)&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="415" y="66" width="330" height="18" as="geometry"/>
        </mxCell>

        <!-- 2.1 Vertex AI Embeddings API -->
        <mxCell id="card_vertex_embeddings" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;🧬 Vertex AI Embeddings API&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:4px;&quot;&gt;• Generating 768-dim Semantic Vectors for&lt;br&gt;Job Requirements &amp;amp; Candidate Competencies&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="420" y="88" width="320" height="95" as="geometry"/>
        </mxCell>

        <!-- 2.2 AlloyDB pgvector Enterprise Skills Graph -->
        <mxCell id="card_alloydb_skills" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;🗄️ AlloyDB pgvector Enterprise Skills Graph&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:4px;&quot;&gt;• Hierarchical Taxonomy (O*NET Aligned)&lt;br&gt;• Skill Proximity &amp;amp; Career Trajectory Vectors&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=6;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="420" y="215" width="320" height="105" as="geometry"/>
        </mxCell>

        <!-- 2.3 Internal Talent Mobility Engine -->
        <mxCell id="card_talent_mobility" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;🧠 Internal Talent Mobility Engine&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:4px;&quot;&gt;• AI-driven Career Pathing&lt;br&gt;• Predictive Internal Promotion Readiness&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="760" y="215" width="310" height="105" as="geometry"/>
        </mxCell>

        <mxCell id="edge_embed_to_skills" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#2563EB;strokeWidth=1.2;html=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="card_vertex_embeddings" target="card_alloydb_skills">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_skills_to_mobility" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#2563EB;strokeWidth=1.2;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="card_alloydb_skills" target="card_talent_mobility">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_ats_to_embed" value="&lt;b style=&quot;font-size:6px;color:#1E40AF;&quot;&gt;[1] REST / JSON / XML&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#2563EB;strokeWidth=1.2;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#93C5FD;padding=1;" edge="1" parent="1" source="card_ats_connectors" target="card_vertex_embeddings">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>


        <!-- CONTAINER 3: RECRUITER COCKPIT & TALENT LAKEHOUSE -->
        <mxCell id="frame_c3_cockpit" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#FAFAFA;strokeColor=#CBD5E1;strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="1105" y="62" width="470" height="275" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_c3_title" value="&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;Recruiter Cockpit &amp;amp; Talent Lakehouse (Looker &amp;amp; BigQuery)&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1115" y="66" width="380" height="18" as="geometry"/>
        </mxCell>

        <!-- 3.1 Looker Studio Recruiter Cockpit -->
        <mxCell id="card_looker_recruiter" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;📊 Looker Studio Recruiter Cockpit&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:4px;&quot;&gt;• Ranked Candidate Shortlists &amp;amp; Fit Radar Charts&lt;br&gt;• 1-Click Actions: Invite, Schedule, Advance, Reject&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1115" y="88" width="450" height="95" as="geometry"/>
        </mxCell>

        <!-- 3.2 BigQuery Workforce Data Lakehouse -->
        <mxCell id="card_bq_workforce" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;🔍 BigQuery Workforce Data Lakehouse&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:4px;&quot;&gt;• Time-to-Hire, Offer Acceptance Rate (OAR), Pipeline Velocity&lt;br&gt;• Cross-Departmental Workforce Analytics&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=6;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1115" y="215" width="450" height="105" as="geometry"/>
        </mxCell>

        <mxCell id="edge_looker_to_bq" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#2563EB;strokeWidth=1.2;html=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="card_looker_recruiter" target="card_bq_workforce">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>


        <!-- ==================== MIDDLE TIER: CANDIDATE MATCH & EVALUATION ==================== -->
        <mxCell id="frame_mid_eval" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#FAFAFA;strokeColor=#CBD5E1;strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="25" y="348" width="1550" height="230" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_mid_title" value="&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;Candidate Match &amp;amp; Evaluation (Gemini &amp;amp; Vertex AI)&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="35" y="352" width="400" height="18" as="geometry"/>
        </mxCell>

        <!-- 4.1 Gemini 3.7 Flash Match Evaluator -->
        <mxCell id="card_gemini_match_eval" value="&lt;table style=&quot;width:100%;text-align:left;padding:8px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11.5px;font-weight:bold;color:#0F172A;&quot;&gt;✨ Gemini 3.7 Flash Match Evaluator&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:6px;&quot;&gt;• Multi-Factor Fit Reasoning (Skills + Projects + Trajectory)&lt;br&gt;• Generates Objective Fit Summaries for Hiring Managers&lt;br&gt;• Contextual Match Scoring &amp;amp; Recommendation Explanations&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="35" y="378" width="360" height="185" as="geometry"/>
        </mxCell>

        <!-- 4.2 Structured Interview Kit Generator -->
        <mxCell id="card_interview_kit" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;Structured Interview Kit Generator&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:4px;&quot;&gt;• Candidate Match-Guided Interview Prompts&lt;br&gt;• Objective Scoring Rubrics &amp;amp; Bias Mitigations&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="425" y="378" width="460" height="88" as="geometry"/>
        </mxCell>

        <!-- 4.3 Cloud Tasks Automated Interview Dispatcher -->
        <mxCell id="card_interview_dispatcher" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;📅 Cloud Tasks Automated Interview Dispatcher&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:4px;&quot;&gt;• Google Workspace / Outlook Guided Interview Prompts&lt;br&gt;• Self-Service Candidate Timezone Slot Selection&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="425" y="475" width="460" height="88" as="geometry"/>
        </mxCell>

        <!-- 4.4 Chief People Officer (CPO) Executive View -->
        <mxCell id="card_cpo_view" value="&lt;table style=&quot;width:100%;text-align:left;padding:8px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11.5px;font-weight:bold;color:#0F172A;&quot;&gt;💼 Chief People Officer (CPO) Executive View&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:6px;&quot;&gt;• Strategic Headcount Forecasting &amp;amp; Skills Gap Budgeting&lt;br&gt;• Diversity &amp;amp; Inclusion (D&amp;amp;I) Metrics Dashboard&lt;br&gt;• Enterprise Talent Velocity &amp;amp; Attrition Early Warning&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="915" y="378" width="645" height="185" as="geometry"/>
        </mxCell>

        <!-- Middle Row Connectors -->
        <mxCell id="edge_docai_to_eval" value="&lt;b style=&quot;font-size:6px;color:#1E40AF;&quot;&gt;[1] GCS / Cipher Stream&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#2563EB;strokeWidth=1.2;html=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;labelBackgroundColor=#FFFFFF;labelBorderColor=#93C5FD;padding=1;" edge="1" parent="1" source="card_doc_ai_parser" target="card_gemini_match_eval">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_eval_to_kit" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#2563EB;strokeWidth=1.2;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="card_gemini_match_eval" target="card_interview_kit">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_kit_to_disp" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#2563EB;strokeWidth=1.2;html=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="card_interview_kit" target="card_interview_dispatcher">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_disp_to_cpo" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#2563EB;strokeWidth=1.2;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="card_interview_dispatcher" target="card_cpo_view">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_cpo_to_bq" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#2563EB;strokeWidth=1.2;html=1;exitX=0.5;exitY=0;entryX=0.5;entryY=1;" edge="1" parent="1" source="card_cpo_view" target="card_bq_workforce">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_skills_to_eval" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#2563EB;strokeWidth=1.2;html=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="card_alloydb_skills" target="card_interview_kit">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>


        <!-- ==================== BOTTOM TIER: TRUST, PRIVACY & GOVERNANCE ==================== -->
        <mxCell id="frame_bottom_trust" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#3B82F6;strokeColor=#1D4ED8;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="25" y="590" width="1550" height="150" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_hr_trust_hdr" value="&lt;b style=&quot;font-size:12px;color:#FFFFFF;letter-spacing:1px;&quot;&gt;TRUST, PRIVACY &amp;amp; GOVERNANCE&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="35" y="594" width="1530" height="22" as="geometry"/>
        </mxCell>

        <!-- 5.1 Cloud DLP -->
        <mxCell id="card_hr_dlp" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;&quot;&gt;🛡️ [Cloud DLP PII Blind Screening Shield]&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;color:#475569;padding-top:2px;&quot;&gt;Redacting Names, Gender, Photo &amp;amp; Age&lt;br&gt;EEOC &amp;amp; Hiring Compliance Intercept&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="35" y="622" width="365" height="100" as="geometry"/>
        </mxCell>

        <!-- 5.2 Cloud KMS HSM -->
        <mxCell id="card_hr_kms" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;&quot;&gt;🔑 [Cloud KMS HSM (Patient CMEK Keys)]&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;color:#475569;padding-top:2px;&quot;&gt;FIPS 140-2 Level 3 Hardware Key Custody&lt;br&gt;Granular Access Boundary for HR Data&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="425" y="622" width="365" height="100" as="geometry"/>
        </mxCell>

        <!-- 5.3 VPC Service Controls -->
        <mxCell id="card_hr_vpc_sc" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;&quot;&gt;🧱 [VPC Service Controls (VPC-SC)]&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;color:#475569;padding-top:2px;&quot;&gt;HR Data Residency Perimeter Control&lt;br&gt;Blocks External Data Exfiltration Vectors&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="815" y="622" width="365" height="100" as="geometry"/>
        </mxCell>

        <!-- 5.4 Cloud Audit Logs -->
        <mxCell id="card_hr_audit" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;&quot;&gt;📋 [Cloud Audit Logs &amp;amp; Access Transparency]&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;color:#475569;padding-top:2px;&quot;&gt;Immutable WORM Storage for 7 Years&lt;br&gt;Log Search &amp;amp; Compliance Reporting&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1205" y="622" width="355" height="100" as="geometry"/>
        </mxCell>


        <!-- ==================== FOOTER LEGEND ==================== -->
        <!-- x = 25 .. 1575 (width = 1550, height = 40) -->
        <mxCell id="footer_legend" value="&lt;table style=&quot;width:100%;font-size:7.5px;color:#334155;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td&gt;&lt;b style=&quot;color:#0F172A;&quot;&gt;Professional Legend:&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🔵 &lt;b&gt;Data&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🔷 &lt;b&gt;Compute&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🟢 &lt;b&gt;Security&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🔴 &lt;b&gt;Controls&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🔒 &lt;b&gt;Access Transparency&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🛡️ &lt;b&gt;EEOC &amp;amp; GDPR Guard&lt;/b&gt;&lt;/td&gt;&lt;td&gt;✨ &lt;b style=&quot;color:#1D4ED8;&quot;&gt;Gemini 3.7 Flash Engine&lt;/b&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
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
