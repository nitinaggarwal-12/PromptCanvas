export function buildFintechPaymentsXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="fintech_automated_advising" name="Automated Personalized Financial Advising (Fintech)">
    <mxGraphModel dx="1600" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="950" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- ==================== TOP TITLE BANNER & HEADER ==================== -->
        <mxCell id="main_title_box" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="16" width="860" height="54" as="geometry"/>
        </mxCell>
        <mxCell id="main_title" value="&lt;b style=&quot;font-size:18px;color:#0F172A;&quot;&gt;Enterprise Fintech Automated Advisory Architecture (P4-FIN-L-01)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:12px;color:#475569;font-weight:600;&quot;&gt;Google Cloud Vertex AI • Multimodal Gemini Advisory • Tax-Loss Harvesting &amp;amp; FINRA Compliance&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="45" y="18" width="830" height="50" as="geometry"/>
        </mxCell>


        <!-- ==================== OUTER SECURITY, GOVERNANCE & COMPLIANCE FRAME ==================== -->
        <!-- x = 30 .. 1560 (width = 1530, height = 750) -->
        <mxCell id="outer_sec_frame" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#94A3B8;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="85" width="1530" height="740" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_sec_top" value="&lt;b style=&quot;font-size:10.5px;color:#1E3A8A;letter-spacing:0.5px;&quot;&gt;🔒 Google Cloud Security, Governance &amp;amp; Regulatory Compliance Perimeter (PCI-DSS Level 1, SEC Rule 204A, FINRA Rule 2111, SOC 2 Type II)&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="35" y="88" width="1520" height="22" as="geometry"/>
        </mxCell>


        <!-- ==================== COLUMN 1: USERS & MULTI-MODAL INGRESS ==================== -->
        <!-- x = 45 .. 225 (width = 180) -->
        <mxCell id="col0_bg" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="45" y="115" width="180" height="695" as="geometry"/>
        </mxCell>
        <mxCell id="col0_hdr" value="&lt;b style=&quot;font-size:10px;color:#1E3A8A;&quot;&gt;📱 CLIENT INGRESS &amp;amp; INPUTS&lt;/b&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;align=center;verticalAlign=middle;color:#FFFFFF;" vertex="1" parent="1">
          <mxGeometry x="45" y="115" width="180" height="30" as="geometry"/>
        </mxCell>

        <mxCell id="card_users_persona" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:22px;&quot;&gt;👤 💼 👨‍👩‍👧&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9.5px;font-weight:bold;color:#0F172A;&quot;&gt;Retail &amp;amp; Wealth Clients&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;&quot;&gt;Investors, Family Offices&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1;align=center;verticalAlign=middle;padding=3;" vertex="1" parent="1">
          <mxGeometry x="55" y="155" width="160" height="75" as="geometry"/>
        </mxCell>

        <!-- Voice Input -->
        <mxCell id="card_voice_in" value="&lt;table style=&quot;width:100%;padding:2px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:16px;&quot;&gt;🎙️&lt;/td&gt;&lt;td style=&quot;font-size:8.5px;font-weight:bold;color:#0F172A;&quot;&gt;Voice Notes / Audio Stream&lt;br&gt;&lt;span style=&quot;font-size:7px;color:#475569;font-weight:normal;&quot;&gt;Real-Time Speech-to-Text v2&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=left;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="55" y="240" width="160" height="60" as="geometry"/>
        </mxCell>

        <!-- Text Input -->
        <mxCell id="card_text_in" value="&lt;table style=&quot;width:100%;padding:2px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:16px;&quot;&gt;💬&lt;/td&gt;&lt;td style=&quot;font-size:8.5px;font-weight:bold;color:#0F172A;&quot;&gt;Natural Language Chat&lt;br&gt;&lt;span style=&quot;font-size:7px;color:#475569;font-weight:normal;&quot;&gt;Tax &amp;amp; Portfolio Queries&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=left;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="55" y="310" width="160" height="60" as="geometry"/>
        </mxCell>

        <!-- Upload Documents -->
        <mxCell id="card_doc_upload" value="&lt;table style=&quot;width:100%;padding:2px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:16px;&quot;&gt;📄&lt;/td&gt;&lt;td style=&quot;font-size:8.5px;font-weight:bold;color:#0F172A;&quot;&gt;Financial Documents&lt;br&gt;&lt;span style=&quot;font-size:7px;color:#475569;font-weight:normal;&quot;&gt;W-2, 1099, Brokerage PDFs&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=left;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="55" y="380" width="160" height="60" as="geometry"/>
        </mxCell>

        <!-- Market Feeds -->
        <mxCell id="card_market_feed_in" value="&lt;table style=&quot;width:100%;padding:2px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:16px;&quot;&gt;📈&lt;/td&gt;&lt;td style=&quot;font-size:8.5px;font-weight:bold;color:#0F172A;&quot;&gt;Live Market Feeds&lt;br&gt;&lt;span style=&quot;font-size:7px;color:#475569;font-weight:normal;&quot;&gt;NASDAQ, OPRA, FIX Streams&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=left;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="55" y="450" width="160" height="60" as="geometry"/>
        </mxCell>

        <!-- Open Banking & Plaid -->
        <mxCell id="card_open_banking_in" value="&lt;table style=&quot;width:100%;padding:2px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:16px;&quot;&gt;🏦&lt;/td&gt;&lt;td style=&quot;font-size:8.5px;font-weight:bold;color:#0F172A;&quot;&gt;Open Banking APIs&lt;br&gt;&lt;span style=&quot;font-size:7px;color:#475569;font-weight:normal;&quot;&gt;Plaid, MX, Custodian Feeds&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=left;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="55" y="520" width="160" height="60" as="geometry"/>
        </mxCell>


        <!-- ==================== COLUMN 2: USER INTERFACE LAYER ==================== -->
        <!-- x = 240 .. 430 (width = 190) -->
        <mxCell id="col1_bg" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#86EFAC;strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="240" y="115" width="190" height="695" as="geometry"/>
        </mxCell>
        <mxCell id="col1_hdr" value="&lt;b style=&quot;font-size:10px;color:#166534;&quot;&gt;💻 USER INTERFACE LAYER&lt;/b&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#16A34A;strokeColor=#15803D;strokeWidth=1;align=center;verticalAlign=middle;color:#FFFFFF;" vertex="1" parent="1">
          <mxGeometry x="240" y="115" width="190" height="30" as="geometry"/>
        </mxCell>

        <mxCell id="card_mobile_g" value="&lt;table style=&quot;width:100%;padding:2px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:18px;&quot;&gt;📱&lt;/td&gt;&lt;td style=&quot;font-size:8.5px;font-weight:bold;color:#0F172A;&quot;&gt;Native Mobile App&lt;br&gt;&lt;span style=&quot;font-size:7px;color:#475569;&quot;&gt;iOS &amp;amp; Android Biometric Auth&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=left;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="250" y="155" width="170" height="65" as="geometry"/>
        </mxCell>

        <mxCell id="card_ge_laptop" value="&lt;table style=&quot;width:100%;padding:2px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:18px;&quot;&gt;💻&lt;/td&gt;&lt;td style=&quot;font-size:8.5px;font-weight:bold;color:#0F172A;&quot;&gt;Web Advisor Portal&lt;br&gt;&lt;span style=&quot;font-size:7px;color:#475569;&quot;&gt;React 19 Widescreen Cockpit&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=left;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="250" y="230" width="170" height="65" as="geometry"/>
        </mxCell>

        <mxCell id="card_firebase_auth" value="&lt;table style=&quot;width:100%;padding:2px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:18px;&quot;&gt;🔥&lt;/td&gt;&lt;td style=&quot;font-size:8.5px;font-weight:bold;color:#0F172A;&quot;&gt;Identity Platform / Auth&lt;br&gt;&lt;span style=&quot;font-size:7px;color:#475569;&quot;&gt;MFA, WebAuthn, OAuth2 Keys&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF3C7;strokeColor=#F59E0B;strokeWidth=1;align=left;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="250" y="305" width="170" height="65" as="geometry"/>
        </mxCell>

        <mxCell id="card_advisor_copilot" value="&lt;table style=&quot;width:100%;padding:2px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:18px;&quot;&gt;🧑‍💼&lt;/td&gt;&lt;td style=&quot;font-size:8.5px;font-weight:bold;color:#0F172A;&quot;&gt;Advisor Copilot Workspace&lt;br&gt;&lt;span style=&quot;font-size:7px;color:#475569;&quot;&gt;Client Goal Simulator &amp;amp; CRM&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1;align=left;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="250" y="380" width="170" height="65" as="geometry"/>
        </mxCell>

        <mxCell id="card_fcm_listener" value="&lt;table style=&quot;width:100%;padding:2px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:18px;&quot;&gt;⚡&lt;/td&gt;&lt;td style=&quot;font-size:8.5px;font-weight:bold;color:#0F172A;&quot;&gt;Real-Time Advisory Stream&lt;br&gt;&lt;span style=&quot;font-size:7px;color:#475569;&quot;&gt;gRPC &amp;amp; WebSocket Push&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1;align=left;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="250" y="455" width="170" height="65" as="geometry"/>
        </mxCell>


        <!-- ==================== COLUMN 3: INGESTION & DATA MANAGEMENT LAYER ==================== -->
        <!-- x = 445 .. 695 (width = 250) -->
        <mxCell id="col2_bg" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="445" y="115" width="250" height="695" as="geometry"/>
        </mxCell>
        <mxCell id="col2_hdr" value="&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;🗄️ INGESTION &amp;amp; LAKEHOUSE LAYER&lt;/b&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#94A3B8;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="445" y="115" width="250" height="30" as="geometry"/>
        </mxCell>

        <!-- Unstructured GCS -->
        <mxCell id="card_gcs_docs" value="&lt;table style=&quot;width:100%;padding:3px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;🗄️ Cloud Storage (CMEK Encrypted)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;Raw audio recordings, IRS PDF returns &amp;amp; scans&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=middle;padding=3;" vertex="1" parent="1">
          <mxGeometry x="455" y="155" width="230" height="65" as="geometry"/>
        </mxCell>

        <!-- BigQuery & Spanner -->
        <mxCell id="card_bq_dw" value="&lt;table style=&quot;width:100%;padding:3px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;🔍 BigQuery Financial Lakehouse&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;Historical trades, positions, tax basis &amp;amp; ledgers&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=middle;padding=3;" vertex="1" parent="1">
          <mxGeometry x="455" y="230" width="230" height="65" as="geometry"/>
        </mxCell>

        <!-- Pub/Sub Event Mesh -->
        <mxCell id="card_pubsub_ingest" value="&lt;table style=&quot;width:100%;padding:3px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#1E40AF;&quot;&gt;💠 Cloud Pub/Sub Financial Event Bus&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;Ordered transaction stream with sub-100ms latency&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#3B82F6;strokeWidth=1.2;align=left;verticalAlign=middle;padding=3;" vertex="1" parent="1">
          <mxGeometry x="455" y="305" width="230" height="65" as="geometry"/>
        </mxCell>

        <!-- Vertex AI Vector Search -->
        <mxCell id="card_vector_search_db" value="&lt;table style=&quot;width:100%;padding:3px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;⚡ Vertex AI Vector Search&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;SEC 10-K filings, tax codes &amp;amp; research index&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=middle;padding=3;" vertex="1" parent="1">
          <mxGeometry x="455" y="380" width="230" height="65" as="geometry"/>
        </mxCell>

        <!-- Dataplex Governance -->
        <mxCell id="card_dataplex_fin" value="&lt;table style=&quot;width:100%;padding:3px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;🛡️ Dataplex Policy Controller&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;Automated PII masking &amp;amp; data quality scoring&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=middle;padding=3;" vertex="1" parent="1">
          <mxGeometry x="455" y="455" width="230" height="65" as="geometry"/>
        </mxCell>


        <!-- ==================== COLUMN 4: VERTEX AI & GEMINI PLATFORM ==================== -->
        <!-- x = 710 .. 1080 (width = 370) -->
        <mxCell id="col3_bg" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="710" y="115" width="370" height="695" as="geometry"/>
        </mxCell>
        <mxCell id="col3_hdr" value="&lt;b style=&quot;font-size:10px;color:#FFFFFF;&quot;&gt;🧠 VERTEX AI &amp;amp; GEMINI REASONING CORE&lt;/b&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="710" y="115" width="370" height="30" as="geometry"/>
        </mxCell>

        <!-- Gemini Reasoning Engine Top -->
        <mxCell id="box_gemini_synthesis" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#1E40AF;border-bottom:1px solid #BFDBFE;padding-bottom:2px;&quot;&gt;✨ Gemini 2.5 Pro Multimodal Synthesizer&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#334155;line-height:1.3;padding-top:4px;&quot;&gt;• Cross-modal analysis across voice, PDFs, and ledger transactions&lt;br&gt;• Generates personalized long-form wealth advisory &amp;amp; tax plans&lt;br&gt;• Real-Time Function Calling to Portfolio Rebalancing APIs&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.5;align=left;verticalAlign=top;padding=4;" vertex="1" parent="1">
          <mxGeometry x="725" y="155" width="340" height="115" as="geometry"/>
        </mxCell>

        <!-- Dialogflow CX Chat Agent -->
        <mxCell id="card_dialogflow" value="&lt;table style=&quot;width:100%;padding:3px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#92400E;&quot;&gt;💬 Dialogflow CX Conversational Agent&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;Natural dialogue flow with intent routing &amp;amp; human-in-the-loop fallback&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF3C7;strokeColor=#F59E0B;strokeWidth=1.2;align=left;verticalAlign=middle;padding=3;" vertex="1" parent="1">
          <mxGeometry x="725" y="280" width="340" height="60" as="geometry"/>
        </mxCell>

        <!-- Portfolio Optimizer & Tax Harvester -->
        <mxCell id="card_mpt_optimizer" value="&lt;table style=&quot;width:100%;padding:3px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#166534;&quot;&gt;⚖️ Modern Portfolio Theory (MPT) Optimizer&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;Mean-variance frontier &amp;amp; Black-Litterman allocation model&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#86EFAC;strokeWidth=1.2;align=left;verticalAlign=middle;padding=3;" vertex="1" parent="1">
          <mxGeometry x="725" y="350" width="340" height="60" as="geometry"/>
        </mxCell>

        <mxCell id="card_tax_loss_engine" value="&lt;table style=&quot;width:100%;padding:3px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#92400E;&quot;&gt;✂️ Automated Tax-Loss Harvester&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;30-day wash-sale avoidance algorithm with ETF proxy swaps&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF9C3;strokeColor=#CA8A04;strokeWidth=1.2;align=left;verticalAlign=middle;padding=3;" vertex="1" parent="1">
          <mxGeometry x="725" y="420" width="340" height="60" as="geometry"/>
        </mxCell>

        <!-- Vertex Explainable AI -->
        <mxCell id="card_fin_eval_xai" value="&lt;table style=&quot;width:100%;padding:3px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#1E40AF;&quot;&gt;🔍 Explainable AI &amp;amp; Fiduciary Audit&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;Integrated Gradients feature attribution for regulatory auditability&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=middle;padding=3;" vertex="1" parent="1">
          <mxGeometry x="725" y="490" width="340" height="60" as="geometry"/>
        </mxCell>


        <!-- ==================== COLUMN 5: ANALYTICS & ACTIONS LAYER ==================== -->
        <!-- x = 1095 .. 1335 (width = 240) -->
        <mxCell id="col4_bg" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="1095" y="115" width="240" height="695" as="geometry"/>
        </mxCell>
        <mxCell id="col4_hdr" value="&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;📊 ACTIONS &amp;amp; SETTLEMENT&lt;/b&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#94A3B8;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1095" y="115" width="240" height="30" as="geometry"/>
        </mxCell>

        <!-- Custodian Order Router -->
        <mxCell id="card_custodian_dispatch" value="&lt;table style=&quot;width:100%;padding:3px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#1E40AF;&quot;&gt;⚡ Custodian Order Router&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;Direct FIX API trade execution with Schwab / Alpaca / Fidelity&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#3B82F6;strokeWidth=1.2;align=left;verticalAlign=middle;padding=3;" vertex="1" parent="1">
          <mxGeometry x="1105" y="155" width="220" height="65" as="geometry"/>
        </mxCell>

        <!-- Looker BI Cockpit -->
        <mxCell id="card_looker_analytics" value="&lt;table style=&quot;width:100%;padding:3px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#166534;&quot;&gt;📊 Looker BI Portfolio Cockpit&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;Executive analytics on strategy yield &amp;amp; client lifetime value&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.2;align=left;verticalAlign=middle;padding=3;" vertex="1" parent="1">
          <mxGeometry x="1105" y="230" width="220" height="65" as="geometry"/>
        </mxCell>

        <!-- Automated Notifications -->
        <mxCell id="card_auto_act_box" value="&lt;table style=&quot;width:100%;padding:3px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;🔔 FCM Real-Time Dispatcher&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;1-Click in-app rebalance authorization push directly to mobile&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=middle;padding=3;" vertex="1" parent="1">
          <mxGeometry x="1105" y="305" width="220" height="65" as="geometry"/>
        </mxCell>

        <!-- Tax Export -->
        <mxCell id="card_tax_filing_export" value="&lt;table style=&quot;width:100%;padding:3px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#166534;&quot;&gt;📑 CPA &amp;amp; TurboTax Export&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;Schedule D &amp;amp; Form 8949 CSV report generator&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#86EFAC;strokeWidth=1.2;align=left;verticalAlign=middle;padding=3;" vertex="1" parent="1">
          <mxGeometry x="1105" y="380" width="220" height="65" as="geometry"/>
        </mxCell>


        <!-- ==================== COLUMN 6: REGULATORY & SECURITY SIDEBAR ==================== -->
        <!-- x = 1350 .. 1545 (width = 195) -->
        <mxCell id="col5_bg" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="1350" y="115" width="195" height="695" as="geometry"/>
        </mxCell>
        <mxCell id="col5_hdr" value="&lt;b style=&quot;font-size:10px;color:#1E3A8A;&quot;&gt;📜 BANK-GRADE GOVERNANCE&lt;/b&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;align=center;verticalAlign=middle;color:#FFFFFF;" vertex="1" parent="1">
          <mxGeometry x="1350" y="115" width="195" height="30" as="geometry"/>
        </mxCell>

        <mxCell id="sec_card_iam" value="&lt;table style=&quot;width:100%;padding:2px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:14px;&quot;&gt;🛡️&lt;/td&gt;&lt;td style=&quot;font-size:8px;font-weight:bold;color:#0F172A;&quot;&gt;Cloud IAM &amp;amp; ABAC&lt;br&gt;&lt;span style=&quot;font-size:6.5px;color:#475569;&quot;&gt;Fiduciary Separation of Duties&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=left;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="1360" y="155" width="175" height="55" as="geometry"/>
        </mxCell>

        <mxCell id="sec_card_vpc_sc" value="&lt;table style=&quot;width:100%;padding:2px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:14px;&quot;&gt;💠&lt;/td&gt;&lt;td style=&quot;font-size:8px;font-weight:bold;color:#0F172A;&quot;&gt;VPC Service Controls&lt;br&gt;&lt;span style=&quot;font-size:6.5px;color:#475569;&quot;&gt;Zero-Trust Exfiltration Guard&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=left;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="1360" y="220" width="175" height="55" as="geometry"/>
        </mxCell>

        <mxCell id="sec_card_hsm_kms" value="&lt;table style=&quot;width:100%;padding:2px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:14px;&quot;&gt;🔑&lt;/td&gt;&lt;td style=&quot;font-size:8px;font-weight:bold;color:#0F172A;&quot;&gt;Cloud KMS (FIPS 140-3 HSM)&lt;br&gt;&lt;span style=&quot;font-size:6.5px;color:#475569;&quot;&gt;Hardware Encryption Keys&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=left;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="1360" y="285" width="175" height="55" as="geometry"/>
        </mxCell>

        <mxCell id="sec_card_fintech_std" value="&lt;table style=&quot;width:100%;padding:2px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:14px;&quot;&gt;📜&lt;/td&gt;&lt;td style=&quot;font-size:8px;font-weight:bold;color:#0F172A;&quot;&gt;SEC 17a-4 WORM Lock&lt;br&gt;&lt;span style=&quot;font-size:6.5px;color:#475569;&quot;&gt;7-Year Immutable Audit Vault&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=left;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="1360" y="350" width="175" height="55" as="geometry"/>
        </mxCell>


        <!-- Connectors between Columns -->
        <mxCell id="e_c0_c1" value="" style="edgeStyle=none;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="col0_bg" target="col1_bg"/>
        <mxCell id="e_c1_c2" value="" style="edgeStyle=none;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="col1_bg" target="col2_bg"/>
        <mxCell id="e_c2_c3" value="" style="edgeStyle=none;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="col2_bg" target="col3_bg"/>
        <mxCell id="e_c3_c4" value="" style="edgeStyle=none;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="col3_bg" target="col4_bg"/>


        <!-- ==================== FOOTER LEGEND ==================== -->
        <mxCell id="legend_box" value="&lt;table style=&quot;width:100%;font-size:9.5px;color:#334155;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td&gt;&lt;b style=&quot;color:#0F172A;&quot;&gt;Fintech Advisory Mesh:&lt;/b&gt;&lt;/td&gt;&lt;td&gt;📱 &lt;b&gt;Client Ingress&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🗄️ &lt;b&gt;Financial Lakehouse&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🧠 &lt;b&gt;Gemini Advisory Core&lt;/b&gt;&lt;/td&gt;&lt;td&gt;⚡ &lt;b&gt;FIX Custodian Router&lt;/b&gt;&lt;/td&gt;&lt;td&gt;📜 &lt;b&gt;SEC/FINRA Compliant&lt;/b&gt;&lt;/td&gt;&lt;td&gt;✨ &lt;b style=&quot;color:#1D4ED8;&quot;&gt;Enterprise Fintech Standard&lt;/b&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="30" y="850" width="1530" height="38" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
