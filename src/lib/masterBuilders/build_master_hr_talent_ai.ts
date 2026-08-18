export function buildHrTalentAiXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="workforce_talent_ai" name="WorkforceAI Enterprise HR Talent &amp; People Intelligence (IND-HR-06)">
    <mxGraphModel dx="1600" dy="720" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="720" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- ==================== HEADER BANNER ==================== -->
        <mxCell id="top_logo" value="&lt;span style=&quot;font-size:24px;&quot;&gt;👔&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="8" width="35" height="35" as="geometry"/>
        </mxCell>
        <mxCell id="main_title" value="&lt;b style=&quot;font-size:18px;color:#0F172A;&quot;&gt;GOOGLE CLOUD HR &amp;amp; TALENT SOLUTION: WORKFORCEAI PEOPLE INTELLIGENCE PLATFORM&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="65" y="8" width="1150" height="24" as="geometry"/>
        </mxCell>
        <mxCell id="main_subtitle" value="&lt;span style=&quot;font-size:10.5px;color:#475569;font-weight:600;&quot;&gt;Document AI Resume Parser, Cloud DLP Anonymizer, AlloyDB pgvector Skills Graph, Gemini 3.7 Flash Match Evaluator &amp;amp; Looker Cockpit&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="65" y="30" width="1150" height="18" as="geometry"/>
        </mxCell>
        <mxCell id="top_gemini_badge" value="&lt;b style=&quot;font-size:16px;color:#2563EB;&quot;&gt;✨ Gemini 3.7 Flash&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Talent Intelligence&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1420" y="8" width="150" height="38" as="geometry"/>
        </mxCell>

        <!-- ==================== COLUMN 1: CANDIDATE & HRIS INGESTION ==================== -->
        <mxCell id="col1_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#60A5FA;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="25" y="60" width="340" height="585" as="geometry"/>
        </mxCell>
        <mxCell id="col1_title" value="&lt;b style=&quot;font-size:11px;color:#1D4ED8;&quot;&gt;📥 Candidate &amp;amp; HRIS Ingestion Tier&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="35" y="68" width="320" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="node_ats_connectors" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;ATS &amp;amp; HRIS Connectors&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Workday, SAP SuccessFactors, Greenhouse&lt;br&gt;Real-Time Webhooks &amp;amp; Delta Sync&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="98" width="310" height="74" as="geometry"/>
        </mxCell>

        <mxCell id="node_document_ai_parser" value="&lt;b style=&quot;font-size:10.5px;color:#1D4ED8;&quot;&gt;Document AI Resume Parser&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;OCR Extraction of Work History, Education,&lt;br&gt;Skills, Certifications &amp;amp; Code Portfolios&lt;/span&gt;" style="shape=note;whiteSpace=wrap;html=1;size=14;verticalAlign=middle;fillColor=#DBEAFE;strokeColor=#1D4ED8;strokeWidth=1.5;align=center;" vertex="1" parent="1">
          <mxGeometry x="40" y="210" width="310" height="80" as="geometry"/>
        </mxCell>

        <mxCell id="node_dlp_pii_anonymizer" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;Cloud DLP Blind Screening Shield&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Redacting Name, Gender, Photo &amp;amp; Age&lt;br&gt;EEOC &amp;amp; Blind Hiring Compliance Intercept&lt;/span&gt;" style="shape=hexagon;perimeter=hexagonPerimeter2;whiteSpace=wrap;html=1;fixedSize=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="325" width="310" height="80" as="geometry"/>
        </mxCell>

        <mxCell id="node_gcs_raw_resumes" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;Cloud Storage Resume Vault (CMEK)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Encrypted Raw PDF/DOCX Document Archive&lt;br&gt;SOC 2 Type II &amp;amp; GDPR Data Retention Policies&lt;/span&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=6;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="440" width="310" height="74" as="geometry"/>
        </mxCell>

        <!-- ==================== COLUMN 2: SKILLS GRAPH & VECTORS ==================== -->
        <mxCell id="col2_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#22C55E;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="390" y="60" width="360" height="585" as="geometry"/>
        </mxCell>
        <mxCell id="col2_title" value="&lt;b style=&quot;font-size:11px;color:#15803D;&quot;&gt;🧬 Skills Graph &amp;amp; Vector Taxonomy Tier&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="400" y="68" width="340" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="node_vertex_embedding_skills" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;Vertex AI Embeddings API&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Generating 768-dim Semantic Vectors for&lt;br&gt;Job Requirements &amp;amp; Candidate Competencies&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="405" y="98" width="330" height="74" as="geometry"/>
        </mxCell>

        <mxCell id="node_alloydb_skills_graph" value="&lt;b style=&quot;font-size:10.5px;color:#15803D;&quot;&gt;AlloyDB pgvector Enterprise Skills Graph&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Hierarchical Taxonomy (O*NET Aligned)&lt;br&gt;Skill Proximity &amp;amp; Career Trajectory Vectors&lt;/span&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=6;fillColor=#DCFCE7;strokeColor=#15803D;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="405" y="210" width="330" height="80" as="geometry"/>
        </mxCell>

        <mxCell id="node_internal_mobility" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;Internal Talent Mobility Engine&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Mapping Employee Upskilling Paths&lt;br&gt;Predictive Internal Promotion Readiness&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="405" y="325" width="330" height="74" as="geometry"/>
        </mxCell>

        <mxCell id="node_market_benchmarking" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;Compensation &amp;amp; Market Intelligence&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Salary Banding &amp;amp; Regional Cost Benchmarks&lt;br&gt;Retention Risk &amp;amp; Flight Risk Predictive Scoring&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="405" y="440" width="330" height="70" as="geometry"/>
        </mxCell>

        <!-- ==================== COLUMN 3: GEMINI REASONING CORE ==================== -->
        <mxCell id="col3_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#A855F7;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="775" y="60" width="380" height="585" as="geometry"/>
        </mxCell>
        <mxCell id="col3_title" value="&lt;b style=&quot;font-size:11px;color:#7E22CE;&quot;&gt;🤖 Gemini 3.7 Flash Recruiter Co-Pilot Core&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="785" y="68" width="360" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="node_gemini_candidate_matching" value="&lt;b style=&quot;font-size:10.5px;color:#7E22CE;&quot;&gt;✨ Gemini 3.7 Flash Match Evaluator&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Multi-Factor Fit Reasoning (Skills + Projects + Trajectory)&lt;br&gt;Generates Objective Fit Summaries for Hiring Managers&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F3E8FF;strokeColor=#7E22CE;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="790" y="98" width="350" height="74" as="geometry"/>
        </mxCell>

        <mxCell id="node_interview_question_gen" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;Structured Interview Kit Generator&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Role-Specific Technical &amp;amp; Behavioral Prompts&lt;br&gt;Objective Scoring Rubrics &amp;amp; Bias Mitigations&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9333EA;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="790" y="210" width="350" height="74" as="geometry"/>
        </mxCell>

        <mxCell id="node_auto_scheduler" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;Cloud Tasks Automated Interview Dispatcher&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Google Workspace / Outlook Calendar Integration&lt;br&gt;Self-Service Candidate Timezone Slot Selection&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9333EA;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="790" y="325" width="350" height="74" as="geometry"/>
        </mxCell>

        <mxCell id="node_bias_audit_service" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;Fairness &amp;amp; Disparate Impact Auditor&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Four-Fifths (80%) Rule Continuous Statistical Scan&lt;br&gt;Auditable Decision Lineage Logs in BigQuery&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9333EA;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="790" y="440" width="350" height="70" as="geometry"/>
        </mxCell>

        <!-- ==================== COLUMN 4: RECRUITER COCKPIT & LAKEHOUSE ==================== -->
        <mxCell id="col4_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFBEB;strokeColor=#F59E0B;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1180" y="60" width="395" height="585" as="geometry"/>
        </mxCell>
        <mxCell id="col4_title" value="&lt;b style=&quot;font-size:11px;color:#B45309;&quot;&gt;📊 Recruiter Cockpit &amp;amp; Talent Lakehouse&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1190" y="68" width="375" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="node_looker_recruiter_cockpit" value="&lt;b style=&quot;font-size:10.5px;color:#B45309;&quot;&gt;Looker Studio Recruiter Cockpit&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Ranked Candidate Shortlists &amp;amp; Fit Radar Radar&lt;br&gt;1-Click Actions: Invite, Schedule, Advance, Reject&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF3C7;strokeColor=#D97706;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1190" y="98" width="375" height="74" as="geometry"/>
        </mxCell>

        <mxCell id="node_bigquery_workforce" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;BigQuery Workforce Data Lakehouse&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Time-to-Hire, Offer Acceptance Rate (OAR), Pipeline Velocity&lt;/span&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=6;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1190" y="210" width="375" height="74" as="geometry"/>
        </mxCell>

        <mxCell id="node_chpo_dashboard" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;Chief People Officer (CPO) Executive View&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Strategic Headcount Forecasting &amp;amp; Skills Gap Budgeting&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1190" y="325" width="375" height="74" as="geometry"/>
        </mxCell>

        <mxCell id="node_audit_compliance_ledger" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;Immutable Audit &amp;amp; Compliance Ledger (CMEK)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Cloud Logging + KMS Encryption for EEOC Audit Defense&lt;/span&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=6;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1190" y="440" width="375" height="74" as="geometry"/>
        </mxCell>

        <!-- ==================== NUMBERED PROTOCOL CONNECTORS ==================== -->
        <!-- [1] ATS -> Document AI -->
        <mxCell id="edge1" value="&lt;b style=&quot;font-size:7px;color:#2563EB;&quot;&gt;[1] Webhook :443 (JSON)&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;" edge="1" parent="1" source="node_ats_connectors" target="node_document_ai_parser">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- [2] Document AI -> DLP Anonymizer -->
        <mxCell id="edge2" value="&lt;b style=&quot;font-size:7px;color:#2563EB;&quot;&gt;[2] OCR Entity Stream&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;" edge="1" parent="1" source="node_document_ai_parser" target="node_dlp_pii_anonymizer">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- [3] DLP -> Vertex Embeddings -->
        <mxCell id="edge3" value="&lt;b style=&quot;font-size:7px;color:#16A34A;&quot;&gt;[3] PII-Free Tokens&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#16A34A;strokeWidth=1.5;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;" edge="1" parent="1" source="node_dlp_pii_anonymizer" target="node_vertex_embedding_skills">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- [4] Embeddings -> AlloyDB Skills Graph -->
        <mxCell id="edge4" value="&lt;b style=&quot;font-size:7px;color:#16A34A;&quot;&gt;[4] 768-dim Vector Ingest&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#16A34A;strokeWidth=1.5;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;" edge="1" parent="1" source="node_vertex_embedding_skills" target="node_alloydb_skills_graph">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- [5] AlloyDB -> Gemini Matching -->
        <mxCell id="edge5" value="&lt;b style=&quot;font-size:7px;color:#7E22CE;&quot;&gt;[5] Candidate Match Query&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#7E22CE;strokeWidth=1.5;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;" edge="1" parent="1" source="node_alloydb_skills_graph" target="node_gemini_candidate_matching">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- [6] Gemini -> Looker Cockpit -->
        <mxCell id="edge6" value="&lt;b style=&quot;font-size:7px;color:#D97706;&quot;&gt;[6] Ranked Shortlist&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#D97706;strokeWidth=1.5;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;" edge="1" parent="1" source="node_gemini_candidate_matching" target="node_looker_recruiter_cockpit">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- [7] Looker -> BigQuery Workforce Lakehouse -->
        <mxCell id="edge7" value="&lt;b style=&quot;font-size:7px;color:#D97706;&quot;&gt;[7] Decision Event Audit&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#D97706;strokeWidth=1.5;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;" edge="1" parent="1" source="node_looker_recruiter_cockpit" target="node_bigquery_workforce">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- ==================== FOOTER LEGEND ==================== -->
        <mxCell id="footer_legend" value="&lt;span style=&quot;font-size:9px;color:#475569;&quot;&gt;&lt;b&gt;HR AI Platform Legend:&lt;/b&gt; 🔵 Document AI OCR &amp;amp; DLP Shield &amp;nbsp;|&amp;nbsp; 🟢 AlloyDB pgvector Skills Graph &amp;nbsp;|&amp;nbsp; 🟣 Gemini 3.7 Candidate Match Core &amp;nbsp;|&amp;nbsp; 🗄️ Cylinders (AlloyDB / GCS / BigQuery) &amp;nbsp;|&amp;nbsp; ── [1]-[7] Protocol Vectors&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="658" width="1550" height="32" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
