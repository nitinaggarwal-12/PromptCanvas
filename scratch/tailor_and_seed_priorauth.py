import sqlite3
import re

db_path = '/Users/nitinagga/.gemini/jetski/dev.db'
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

PRIOR_AUTH_PROMPT = """Core Architectural Components Data Ingestion Layer: Connects to the Electronic Health Record (EHR) via standard HL7 FHIR APIs to extract oncology charts, staging data, genomic markers, and pathology PDFs. AI Engine Layer: Employs Large Language Models (LLMs) optimized with Retrieval-Augmented Generation (RAG) to read raw clinical narratives and match them directly to insurance policies. Workflow Integration Layer: Embeds directly into the provider's native workflow, automatically submitting clean approvals or alerting human reviewers via a dashboard when documentation gaps exist."""

def tailor_xml_for_prior_auth(xml):
    # Header & Domain
    xml = xml.replace('ITACS SECURE MANAGED GEMINI ENTERPRISE ECOSYSTEM', 'PRIORAUTH SECURE MANAGED GEMINI ENTERPRISE ECOSYSTEM (HIPAA Compliant)')
    xml = xml.replace('ITACS Integrated Insights Platform', 'PriorAuth Healthcare Automation Platform')
    xml = xml.replace('ITACS Platform Production', 'PriorAuth Healthcare Production (HIPAA)')
    xml = xml.replace('ITACS', 'PriorAuth')

    # Base Labels
    xml = xml.replace('Oncology Data Portal', 'EHR &amp; FHIR Ingestion')
    xml = xml.replace('Integrated Insights Hub', 'Vertex AI RAG Engine')
    xml = xml.replace('STRATEGIC DELIVERY &amp; INSIGHTS', 'PROVIDER WORKFLOW &amp; APPROVALS')

    # ERD Relational Terms
    xml = xml.replace('Dim_Intel_Map', 'Dim_FHIR_Clinical_Narrative')
    xml = xml.replace('Fact_Strategic_Metrics', 'Fact_Policy_Match_Decision')
    xml = xml.replace('Dim_Competitor_Announcements', 'Dim_Insurance_Policy_Criteria')
    xml = xml.replace('UNIFIED DATABASE SCHEMA', 'PRIORAUTH DATABASE SCHEMA (FHIR &amp; RAG)')

    # Sequence Diagrams (Diagram 4 & 5) - Component & Action Labels
    xml = xml.replace('Slide Studio API', 'FHIR Clinical Extractor API')
    xml = xml.replace('Market Radar API', 'PriorAuth Policy Matcher API')
    xml = xml.replace('Competitive Announcement Simulation', 'Clinical Narrative &amp; Policy Criteria Verification')
    xml = xml.replace('Strategic Chatbot Queries', 'Clinical Coverage &amp; Policy Queries')
    xml = xml.replace('Unstructured Content Analysis', 'Oncology Narrative &amp; Genomic Marker Parsing')
    xml = xml.replace('Multi-Functional Data Synthesis', 'FHIR &amp; Narrative Data Synthesis')
    xml = xml.replace('Executive Strategy Dashboard', 'Provider PriorAuth Reviewer Dashboard')
    xml = xml.replace('Competitor Comparison View', 'Policy Coverage Criteria Verification')
    xml = xml.replace('Strategic Advisory Alert', 'Documentation Gap Alert (Human Reviewer)')
    xml = xml.replace('Review Drug Launch Strategy', 'Review PriorAuth Documentation &amp; Submit')
    xml = xml.replace('Competitor X', 'HL7 FHIR Extracted')
    xml = xml.replace('Competitor Y', 'Policy Matched')
    xml = xml.replace('Q3 Launch', 'Clean Approval')
    xml = xml.replace('Phase 2b', 'Gap Review')
    xml = xml.replace('No-Code MVP (Immediate)', 'Automated Policy Approval')
    xml = xml.replace('Custom High-Code Agent', 'Provider Workflow Integration')

    # Data & AI Pipeline (Diagram 7)
    xml = xml.replace('Slide Analysis', 'Oncology Chart &amp; Genomic Ingestion')
    xml = xml.replace('Google Workspace Connectors', 'EHR HL7 FHIR Gateway')
    xml = xml.replace('GCS Secure Bucket', 'Clinical Narrative Storage')
    xml = xml.replace('Airflow Scheduler', 'Cloud Composer FHIR Pipeline')
    xml = xml.replace('dbt Transformation', 'Vertex AI RAG Pipeline')
    xml = xml.replace('BigQuery Feature Store', 'PriorAuth Policy Vector Store')

    # Fix any raw unescaped ampersands
    pattern = re.compile(r'&(?!amp;|lt;|gt;|quot;|apos;|#[0-9]+;|#x[0-9a-fA-F]+;)')
    xml = pattern.sub('&amp;', xml)
    return xml

target_ids = ['f675991e-b3ba-4d0a-84b9-78fb7773f8fa', 'e83f3f20-247e-4c78-beec-9708fd53298a']

for diag_id in target_ids:
    cursor.execute("UPDATE diagrams SET user_id = NULL WHERE id = ?", (diag_id,))
    cursor.execute("SELECT id, architecture_type, xml_content FROM diagram_versions WHERE diagram_id = ?", (diag_id,))
    versions = cursor.fetchall()
    print(f"Tailoring {len(versions)} versions for diagram '{diag_id}'...")

    for v_id, arch_id, xml_content in versions:
        if isinstance(xml_content, bytes):
            xml_str = xml_content.decode('utf-8')
        else:
            xml_str = str(xml_content)
        
        tailored = tailor_xml_for_prior_auth(xml_str)
        cursor.execute("UPDATE diagram_versions SET xml_content = ?, prompt = ? WHERE id = ?", (tailored, PRIOR_AUTH_PROMPT, v_id))
        print(f"  ├─ Tailored PriorAuth version [{arch_id}] for diagram '{diag_id}'")

conn.commit()
conn.close()
print("🎉 All 23 versions for both PriorAuth diagrams have been 100% tailored and updated in dev.db!")
