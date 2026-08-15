export function buildHrTalentAiXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="workforce_talent_ai" name="WorkforceAI Enterprise HR Talent &amp; People Intelligence (IND-HR-06)">
    <mxGraphModel dx="1400" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1400" pageHeight="720" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- Header Banner -->
        <mxCell id="top_logo" value="&lt;span style=&quot;font-size:24px;&quot;&gt;👔&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="10" width="35" height="35" as="geometry"/>
        </mxCell>
        <mxCell id="main_title" value="&lt;b style=&quot;font-size:18px;color:#0F172A;&quot;&gt;Google Cloud HR &amp;amp; TALENT SOLUTION: WORKFORCEAI PEOPLE INTELLIGENCE PLATFORM&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="65" y="10" width="1050" height="24" as="geometry"/>
        </mxCell>
        <mxCell id="main_subtitle" value="&lt;span style=&quot;font-size:11px;color:#475569;font-weight:600;&quot;&gt;Enterprise Human Capital AI: Document AI Resume Parser, AlloyDB pgvector Skills Graph, Gemini 3.7 Flash Matching &amp;amp; Bias-Free Audits&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="65" y="32" width="1050" height="18" as="geometry"/>
        </mxCell>
        <mxCell id="top_gemini_badge" value="&lt;b style=&quot;font-size:14px;color:#2563EB;&quot;&gt;Gemini 3.7 Flash&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Talent Intelligence&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1220" y="10" width="140" height="36" as="geometry"/>
        </mxCell>

        <!-- Column 1: Candidate & ATS Ingestion -->
        <mxCell id="col1_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#60A5FA;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="25" y="65" width="280" height="580" as="geometry"/>
        </mxCell>
        <mxCell id="col1_title" value="&lt;b style=&quot;font-size:11px;color:#1D4ED8;&quot;&gt;📥 Candidate &amp;amp; HRIS Ingestion Tier&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="35" y="72" width="260" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="node_ats_connectors" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;ATS &amp;amp; HRIS Connectors&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Workday, SAP SuccessFactors, Greenhouse&lt;br&gt;Real-Time Webhooks &amp;amp; Nightly Delta Sync&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="115" width="250" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_document_ai_parser" value="&lt;b style=&quot;font-size:11px;color:#1D4ED8;&quot;&gt;Document AI (Custom Resume Parser)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;OCR Extraction of Work History, Education,&lt;br&gt;Certifications &amp;amp; GitHub/LinkedIn Portfolios&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#1D4ED8;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="225" width="250" height="85" as="geometry"/>
        </mxCell>

        <mxCell id="node_dlp_pii_anonymizer" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Cloud DLP Blind Screening Filter&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Redacting Name, Gender, Photo &amp;amp; Age&lt;br&gt;EEOC &amp;amp; Blind Hiring Compliance Shield&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="345" width="250" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_gcs_raw_resumes" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Cloud Storage (CMEK Encrypted)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Encrypted Raw PDF/DOCX Resume Vault&lt;br&gt;SOC 2 Type II &amp;amp; GDPR Data Retention Policies&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="455" width="250" height="75" as="geometry"/>
        </mxCell>

        <!-- Column 2: Vector Embeddings & Enterprise Skills Graph -->
        <mxCell id="col2_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#22C55E;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="330" y="65" width="310" height="580" as="geometry"/>
        </mxCell>
        <mxCell id="col2_title" value="&lt;b style=&quot;font-size:11px;color:#15803D;&quot;&gt;🧬 Skills Graph &amp;amp; Vector Taxonomy&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="340" y="72" width="290" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="node_vertex_embedding_skills" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Vertex AI Embeddings API&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Generating 768-dim Semantic Vectors for&lt;br&gt;Job Requirements &amp;amp; Candidate Competencies&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="345" y="115" width="280" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_alloydb_skills_graph" value="&lt;b style=&quot;font-size:11px;color:#15803D;&quot;&gt;AlloyDB pgvector Enterprise Skills Graph&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Hierarchical Taxonomy (O*NET Aligned)&lt;br&gt;Skill Proximity &amp;amp; Career Trajectory Vectors&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#15803D;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="345" y="225" width="280" height="85" as="geometry"/>
        </mxCell>

        <mxCell id="node_internal_mobility" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Internal Talent Mobility Engine&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Mapping Employee Upskilling Paths&lt;br&gt;Predictive Internal Promotion Readiness&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="345" y="345" width="280" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_market_benchmarking" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Compensation &amp;amp; Market Intelligence&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Salary Banding &amp;amp; Regional Cost Benchmarks&lt;br&gt;Retention Risk &amp;amp; Flight Risk Predictive Scoring&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="345" y="455" width="280" height="75" as="geometry"/>
        </mxCell>

        <!-- Column 3: Gemini 3.7 Reasoning & Recruiter Co-Pilot -->
        <mxCell id="col3_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#A855F7;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="665" y="65" width="330" height="580" as="geometry"/>
        </mxCell>
        <mxCell id="col3_title" value="&lt;b style=&quot;font-size:11px;color:#7E22CE;&quot;&gt;🤖 Gemini 3.7 Flash Recruiter Co-Pilot&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="675" y="72" width="310" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="node_gemini_candidate_matching" value="&lt;b style=&quot;font-size:11px;color:#7E22CE;&quot;&gt;Gemini 3.7 Flash Match Evaluator&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Multi-Factor Fit Reasoning (Skills + Projects)&lt;br&gt;Generates Personalized Fit Summaries for Hiring Mgrs&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F3E8FF;strokeColor=#7E22CE;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="680" y="115" width="300" height="85" as="geometry"/>
        </mxCell>

        <mxCell id="node_interview_question_gen" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Structured Interview Kit Generator&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Role-Specific Technical &amp;amp; Behavioral Prompts&lt;br&gt;Objective Scoring Rubrics &amp;amp; Bias Mitigations&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9333EA;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="680" y="235" width="300" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_auto_scheduler" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Cloud Tasks Automated Interview Dispatcher&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Google Workspace / Outlook Calendar Integration&lt;br&gt;Self-Service Candidate Timezone Slot Selection&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9333EA;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="680" y="345" width="300" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_bias_audit_service" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Fairness &amp;amp; Disparate Impact Auditor&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Four-Fifths (80%) Rule Continuous Statistical Scan&lt;br&gt;Auditable Decision Lineage Logs in BigQuery&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9333EA;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="680" y="455" width="300" height="75" as="geometry"/>
        </mxCell>

        <!-- Column 4: HR Recruiter Cockpit & Workforce Lakehouse -->
        <mxCell id="col4_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFBEB;strokeColor=#F59E0B;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1020" y="65" width="340" height="580" as="geometry"/>
        </mxCell>
        <mxCell id="col4_title" value="&lt;b style=&quot;font-size:11px;color:#B45309;&quot;&gt;📊 Recruiter Cockpit &amp;amp; Talent Lakehouse&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1030" y="72" width="320" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="node_looker_recruiter_cockpit" value="&lt;b style=&quot;font-size:11px;color:#B45309;&quot;&gt;Looker Studio Recruiter Cockpit&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Ranked Candidate Shortlists &amp;amp; Fit Radar&lt;br&gt;Action Buttons: 1-Click Invite, Reject, Advance&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF3C7;strokeColor=#D97706;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1035" y="115" width="310" height="85" as="geometry"/>
        </mxCell>

        <mxCell id="node_bigquery_workforce" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;BigQuery Workforce Data Lakehouse&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Time-to-Hire, Offer Acceptance Rate (OAR),&lt;br&gt;Pipeline Velocity &amp;amp; Diversity Representation&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1035" y="235" width="310" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_chpo_dashboard" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Chief People Officer (CPO) Executive View&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Strategic Headcount Forecasting &amp;amp; Budgeting&lt;br&gt;Enterprise Skills Gap &amp;amp; Training ROI Scorecard&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1035" y="345" width="310" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_audit_compliance_ledger" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Immutable Audit &amp;amp; Compliance Ledger&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Cloud Logging + Cloud KMS CMEK Encryption&lt;br&gt;Full Regulatory Defense Dossiers for Audits&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1035" y="455" width="310" height="75" as="geometry"/>
        </mxCell>

        <!-- Connecting Edges -->
        <mxCell id="edge1" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=2;" edge="1" parent="1" source="node_ats_connectors" target="node_document_ai_parser">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge2" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=2;" edge="1" parent="1" source="node_document_ai_parser" target="node_dlp_pii_anonymizer">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge3" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16A34A;strokeWidth=2;" edge="1" parent="1" source="node_dlp_pii_anonymizer" target="node_vertex_embedding_skills">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge4" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16A34A;strokeWidth=2;" edge="1" parent="1" source="node_vertex_embedding_skills" target="node_alloydb_skills_graph">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge5" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#7E22CE;strokeWidth=2;" edge="1" parent="1" source="node_alloydb_skills_graph" target="node_gemini_candidate_matching">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge6" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#D97706;strokeWidth=2;" edge="1" parent="1" source="node_gemini_candidate_matching" target="node_looker_recruiter_cockpit">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge7" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#D97706;strokeWidth=2;" edge="1" parent="1" source="node_looker_recruiter_cockpit" target="node_bigquery_workforce">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- Footer Legend -->
        <mxCell id="footer_legend" value="&lt;span style=&quot;font-size:9.5px;color:#475569;&quot;&gt;&lt;b&gt;HR AI Platform:&lt;/b&gt; 🔵 Document AI Resume Parser &amp;nbsp;|&amp;nbsp; 🟢 AlloyDB pgvector Skills Graph &amp;nbsp;|&amp;nbsp; 🟣 Gemini 3.7 Candidate Matching &amp;nbsp;|&amp;nbsp; 🟡 Looker Recruiter Cockpit &amp;nbsp;|&amp;nbsp; ⚡ Powered by Gemini 3.7 Flash&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="655" width="1335" height="30" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
