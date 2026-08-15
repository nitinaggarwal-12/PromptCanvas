export function buildFintechPaymentsXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="fintech_automated_advising" name="Automated Personalized Financial Advising (Fintech)">
    <mxGraphModel dx="1400" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1360" pageHeight="690" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- ==================== TOP TITLE BANNER & HEADER ==================== -->
        <mxCell id="top_cloud_logo" value="&lt;span style=&quot;font-size:26px;&quot;&gt;☁️&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="8" width="35" height="35" as="geometry"/>
        </mxCell>
        <mxCell id="main_title" value="&lt;b style=&quot;font-size:19px;color:#0F172A;letter-spacing:-0.2px;&quot;&gt;GOOGLE CLOUD ARCHITECTURE: FINTECH USE CASE - AUTOMATED PERSONALIZED FINANCIAL ADVISING&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="65" y="8" width="1260" height="24" as="geometry"/>
        </mxCell>
        <mxCell id="main_subtitle" value="&lt;span style=&quot;font-size:11px;color:#475569;font-weight:600;&quot;&gt;Enterprise Fintech Platform: Wealth Management, Tax-Loss Harvesting, Portfolio Optimization, Multimodal Gemini Advisory &amp;amp; SEC/FINRA Compliance&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="65" y="32" width="1260" height="18" as="geometry"/>
        </mxCell>


        <!-- ==================== OUTER SECURITY, GOVERNANCE & COMPLIANCE FRAME ==================== -->
        <!-- x = 20 .. 1340 (width = 1320, height = 635) -->
        <mxCell id="outer_sec_frame" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#94A3B8;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="20" y="55" width="1320" height="625" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_sec_top" value="&lt;b style=&quot;font-size:9.5px;color:#1E3A8A;letter-spacing:0.5px;&quot;&gt;🔒 Google Cloud Security, Governance, and Bank-Grade Regulatory Compliance Perimeter (PCI-DSS Level 1, SEC Rule 204A, FINRA Rule 2111)&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="58" width="1120" height="18" as="geometry"/>
        </mxCell>


        <!-- ==================== COLUMN 1: USERS & MULTI-MODAL INGRESS ==================== -->
        <!-- x = 30 .. 170 (width = 140) -->
        <mxCell id="col0_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="30" y="80" width="140" height="585" as="geometry"/>
        </mxCell>
        <mxCell id="col0_hdr" value="&lt;b style=&quot;font-size:8.5px;color:#1E3A8A;&quot;&gt;CLIENT INGRESS &amp;amp;&lt;br&gt;MULTIMODAL INPUTS&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="35" y="83" width="130" height="25" as="geometry"/>
        </mxCell>

        <mxCell id="card_users_persona" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:24px;&quot;&gt;👤 💼 👨‍👩‍👧&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;font-weight:bold;color:#0F172A;&quot;&gt;Retail &amp;amp; Wealth Clients&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:5.5px;color:#475569;&quot;&gt;Investors, Family Offices&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="35" y="112" width="130" height="65" as="geometry"/>
        </mxCell>

        <!-- Voice Input -->
        <mxCell id="card_voice_in" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:16px;&quot;&gt;🎙️ 🗣️&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;font-weight:bold;color:#0F172A;&quot;&gt;Voice Stream&lt;br&gt;&lt;span style=&quot;font-size:5.5px;color:#475569;font-weight:normal;&quot;&gt;(Real-Time Speech-to-Text)&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="35" y="185" width="130" height="52" as="geometry"/>
        </mxCell>

        <!-- Text Input -->
        <mxCell id="card_text_in" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:16px;&quot;&gt;💬 ⌨️&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;font-weight:bold;color:#0F172A;&quot;&gt;Natural Language Chat&lt;br&gt;&lt;span style=&quot;font-size:5.5px;color:#475569;font-weight:normal;&quot;&gt;Portfolio &amp;amp; Tax Queries&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="35" y="245" width="130" height="52" as="geometry"/>
        </mxCell>

        <!-- Upload Documents -->
        <mxCell id="card_doc_upload" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:16px;&quot;&gt;📄 📑&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;font-weight:bold;color:#0F172A;&quot;&gt;Financial Documents&lt;br&gt;&lt;span style=&quot;font-size:5.5px;color:#475569;font-weight:normal;&quot;&gt;IRS W-2, 1099, Brokerage PDFs,&lt;br&gt;Bank Statements, Trust Deeds&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="35" y="305" width="130" height="75" as="geometry"/>
        </mxCell>

        <!-- Market Feeds & Ingress Stream -->
        <mxCell id="card_market_feed_in" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:16px;&quot;&gt;📈 📡&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;font-weight:bold;color:#0F172A;&quot;&gt;Live Market Feeds&lt;br&gt;&lt;span style=&quot;font-size:5.5px;color:#475569;font-weight:normal;&quot;&gt;NASDAQ, NYSE, OPRA Options,&lt;br&gt;FIX Protocol Real-Time Ticks&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="35" y="388" width="130" height="75" as="geometry"/>
        </mxCell>

        <!-- Custodian & Open Banking API Ingress -->
        <mxCell id="card_open_banking_in" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:16px;&quot;&gt;🏦 🔗&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;font-weight:bold;color:#0F172A;&quot;&gt;Open Banking &amp;amp; Plaid APIs&lt;br&gt;&lt;span style=&quot;font-size:5.5px;color:#475569;font-weight:normal;&quot;&gt;Plaid, MX, Yodlee Aggregator,&lt;br&gt;Direct Custodian Core Feeds&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="35" y="470" width="130" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="lbl_col0_status" value="&lt;span style=&quot;font-size:6px;color:#1E3A8A;font-weight:bold;&quot;&gt;✅ Multimodal Ingress Gated&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="35" y="648" width="130" height="14" as="geometry"/>
        </mxCell>


        <!-- ==================== COLUMN 2: USER INTERFACE LAYER (GE APP) ==================== -->
        <!-- x = 178 .. 318 (width = 140) -->
        <mxCell id="col1_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#86EFAC;strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="178" y="80" width="140" height="585" as="geometry"/>
        </mxCell>
        <mxCell id="col1_hdr" value="&lt;b style=&quot;font-size:8.5px;color:#166534;&quot;&gt;USER INTERFACE LAYER&lt;br&gt;&lt;span style=&quot;font-size:7px;color:#475569;&quot;&gt;(GE FINTECH ASSISTANT)&lt;/span&gt;&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="183" y="83" width="130" height="25" as="geometry"/>
        </mxCell>

        <!-- Mobile App -->
        <mxCell id="card_mobile_g" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:20px;&quot;&gt;📱 &lt;span style=&quot;font-size:12px;color:#2563EB;font-weight:bold;&quot;&gt;G&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:6.5px;font-weight:bold;color:#0F172A;&quot;&gt;Google Native Mobile App&lt;br&gt;&lt;span style=&quot;font-size:5.5px;color:#475569;font-weight:normal;&quot;&gt;(iOS &amp;amp; Android Biometric)&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;padding=1;" vertex="1" parent="1">
          <mxGeometry x="183" y="112" width="130" height="52" as="geometry"/>
        </mxCell>
        <mxCell id="card_app_engine1" value="&lt;b style=&quot;font-size:6px;color:#0F172A;&quot;&gt;⚙️ Google App Engine (Mobile BFF)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#3B82F6;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="183" y="168" width="130" height="24" as="geometry"/>
        </mxCell>

        <!-- Center GE Fintech Assistant Laptop Cockpit -->
        <mxCell id="card_ge_laptop" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:22px;&quot;&gt;💻 &lt;span style=&quot;color:#0284C7;font-size:12px;font-weight:bold;&quot;&gt;GE&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;font-weight:bold;color:#0F172A;&quot;&gt;GE FINTECH ASSISTANT&lt;br&gt;&lt;span style=&quot;font-size:5.5px;color:#475569;&quot;&gt;(GE ADVISOR APP)&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#60A5FA;strokeWidth=1.2;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="183" y="200" width="130" height="75" as="geometry"/>
        </mxCell>
        <mxCell id="card_app_engine2" value="&lt;b style=&quot;font-size:6px;color:#0F172A;&quot;&gt;⚙️ Google App Engine (Web App)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#3B82F6;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="183" y="280" width="130" height="24" as="geometry"/>
        </mxCell>

        <!-- Firebase Auth & Session Security -->
        <mxCell id="card_firebase_auth" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:16px;&quot;&gt;🔥 🔐&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:6.5px;font-weight:bold;color:#0F172A;&quot;&gt;Firebase Authentication&lt;br&gt;&lt;span style=&quot;font-size:5.5px;color:#475569;font-weight:normal;&quot;&gt;MFA, OAuth2, WebAuthn Keys&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF3C7;strokeColor=#F59E0B;strokeWidth=1;align=center;verticalAlign=middle;padding=1;" vertex="1" parent="1">
          <mxGeometry x="183" y="312" width="130" height="50" as="geometry"/>
        </mxCell>

        <!-- Cloud Load Balancing & Cloud Armor -->
        <mxCell id="card_clb_ui" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:16px;&quot;&gt;⚖️ 🛡️&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:6.5px;font-weight:bold;color:#0F172A;&quot;&gt;Cloud Load Balancing (Global)&lt;br&gt;&lt;span style=&quot;font-size:5.5px;color:#475569;font-weight:normal;&quot;&gt;Cloud Armor Layer 7 WAF DDoS&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#3B82F6;strokeWidth=1;align=center;verticalAlign=middle;padding=1;" vertex="1" parent="1">
          <mxGeometry x="183" y="370" width="130" height="50" as="geometry"/>
        </mxCell>

        <!-- Advisor Co-Pilot Workspace Screen -->
        <mxCell id="card_advisor_copilot" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:16px;&quot;&gt;🧑‍💼 💡&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:6.5px;font-weight:bold;color:#0F172A;&quot;&gt;Advisor Copilot Workspace&lt;br&gt;&lt;span style=&quot;font-size:5.5px;color:#475569;font-weight:normal;&quot;&gt;Client Goal Simulator &amp;amp; CRM Sync&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1;align=center;verticalAlign=middle;padding=1;" vertex="1" parent="1">
          <mxGeometry x="183" y="428" width="130" height="55" as="geometry"/>
        </mxCell>

        <!-- Real-Time Notification Listener -->
        <mxCell id="card_fcm_listener" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:16px;&quot;&gt;🔔 ⚡&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:6.5px;font-weight:bold;color:#0F172A;&quot;&gt;Real-Time Advisory Stream&lt;br&gt;&lt;span style=&quot;font-size:5.5px;color:#475569;font-weight:normal;&quot;&gt;WebSockets / gRPC Client Push&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1;align=center;verticalAlign=middle;padding=1;" vertex="1" parent="1">
          <mxGeometry x="183" y="490" width="130" height="55" as="geometry"/>
        </mxCell>

        <mxCell id="lbl_ui_secure" value="&lt;span style=&quot;font-size:6px;color:#166534;font-weight:bold;&quot;&gt;Sub-10ms Interactive UX&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="183" y="648" width="130" height="14" as="geometry"/>
        </mxCell>


        <!-- ==================== COLUMN 3: INGESTION & DATA MANAGEMENT LAYER ==================== -->
        <!-- x = 326 .. 476 (width = 150) -->
        <mxCell id="col2_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="326" y="80" width="150" height="585" as="geometry"/>
        </mxCell>
        <mxCell id="col2_hdr" value="&lt;b style=&quot;font-size:8.5px;color:#0F172A;&quot;&gt;INGESTION &amp;amp; DATA&lt;br&gt;MANAGEMENT LAYER&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="331" y="83" width="140" height="25" as="geometry"/>
        </mxCell>

        <!-- Track 1: Unstructured Recordings & Documents -> GCS -->
        <mxCell id="card_unstruct_badge" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:16px;&quot;&gt;📄 🎙️&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:6px;font-weight:bold;color:#0F172A;&quot;&gt;Unstructured&lt;br&gt;&lt;span style=&quot;font-size:5px;color:#475569;&quot;&gt;(audio, scanned PDFs)&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;padding=1;" vertex="1" parent="1">
          <mxGeometry x="332" y="112" width="60" height="52" as="geometry"/>
        </mxCell>
        <mxCell id="card_gcs_docs" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:18px;color:#2563EB;&quot;&gt;🗄️&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:6.5px;font-weight:bold;color:#0F172A;&quot;&gt;Cloud Storage&lt;br&gt;&lt;span style=&quot;font-size:5px;color:#475569;&quot;&gt;(GCS CMEK Encrypted)&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#3B82F6;strokeWidth=1.2;align=center;verticalAlign=middle;padding=1;" vertex="1" parent="1">
          <mxGeometry x="398" y="112" width="72" height="52" as="geometry"/>
        </mxCell>
        <mxCell id="e_unstruct_gcs" value="" style="edgeStyle=none;html=1;strokeColor=#0F172A;strokeWidth=1.2;endArrow=classic;" edge="1" parent="1" source="card_unstruct_badge" target="card_gcs_docs"/>

        <!-- Track 2: Structured Core Data -> BigQuery & Cloud SQL -->
        <mxCell id="card_struct_badge" value="&lt;b style=&quot;font-size:6px;color:#0F172A;&quot;&gt;Structured Data&lt;br&gt;&lt;span style=&quot;font-size:5px;color:#475569;font-weight:normal;&quot;&gt;Transactions,&lt;br&gt;Ledgers, Accounts&lt;/span&gt;&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;padding=1;" vertex="1" parent="1">
          <mxGeometry x="332" y="178" width="60" height="75" as="geometry"/>
        </mxCell>
        <mxCell id="card_bq_dw" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:16px;color:#2563EB;&quot;&gt;🔍&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:6.5px;font-weight:bold;color:#0F172A;&quot;&gt;BigQuery&lt;br&gt;&lt;span style=&quot;font-size:5px;color:#475569;&quot;&gt;(Data Warehouse)&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#3B82F6;strokeWidth=1.2;align=center;verticalAlign=middle;padding=1;" vertex="1" parent="1">
          <mxGeometry x="398" y="172" width="72" height="42" as="geometry"/>
        </mxCell>
        <mxCell id="card_cloud_sql" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:16px;color:#2563EB;&quot;&gt;🗄️&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:6.5px;font-weight:bold;color:#0F172A;&quot;&gt;Cloud SQL / Spanner&lt;br&gt;&lt;span style=&quot;font-size:5px;color:#475569;&quot;&gt;(ACID Core Ledger)&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#3B82F6;strokeWidth=1;align=center;verticalAlign=middle;padding=1;" vertex="1" parent="1">
          <mxGeometry x="398" y="218" width="72" height="42" as="geometry"/>
        </mxCell>

        <!-- Track 3: Real-Time Transaction Streams & Change Data Capture -->
        <mxCell id="card_realtime_streams" value="&lt;b style=&quot;font-size:6px;color:#0F172A;&quot;&gt;Real-Time Streams&lt;br&gt;&lt;span style=&quot;font-size:5px;color:#475569;&quot;&gt;Card Swipes, ACH,&lt;br&gt;Wire Transfers&lt;/span&gt;&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;padding=1;" vertex="1" parent="1">
          <mxGeometry x="332" y="268" width="60" height="52" as="geometry"/>
        </mxCell>
        <mxCell id="card_pubsub_ingest" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:18px;color:#2563EB;&quot;&gt;💠&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:6.5px;font-weight:bold;color:#0F172A;&quot;&gt;Cloud Pub/Sub&lt;br&gt;&lt;span style=&quot;font-size:5px;color:#475569;&quot;&gt;(Ordered Event Bus)&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#2563EB;strokeWidth=1.2;align=center;verticalAlign=middle;padding=1;" vertex="1" parent="1">
          <mxGeometry x="398" y="268" width="72" height="52" as="geometry"/>
        </mxCell>

        <!-- Track 4: Vector Embeddings & Financial Knowledge Base -->
        <mxCell id="card_vector_search_db" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:16px;color:#2563EB;&quot;&gt;⚡ 📚&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:6.5px;font-weight:bold;color:#0F172A;&quot;&gt;Vertex AI Vector Search&lt;br&gt;&lt;span style=&quot;font-size:5.5px;color:#475569;font-weight:normal;&quot;&gt;IRS Tax Codes, SEC Filings,&lt;br&gt;Equity Research &amp;amp; Fund Prospectuses&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="332" y="335" width="138" height="70" as="geometry"/>
        </mxCell>

        <!-- Track 5: Dataplex FinTech Data Governance & Lineage -->
        <mxCell id="card_dataplex_fin" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:16px;color:#2563EB;&quot;&gt;🛡️ 📊&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:6.5px;font-weight:bold;color:#0F172A;&quot;&gt;Dataplex Data Fabric&lt;br&gt;&lt;span style=&quot;font-size:5.5px;color:#475569;font-weight:normal;&quot;&gt;Automated Data Quality Checks &amp;amp;&lt;br&gt;PII Column Masking Policy&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="332" y="415" width="138" height="65" as="geometry"/>
        </mxCell>

        <!-- Track 6: Real-Time Fraud & Anomaly Ingest -->
        <mxCell id="card_fraud_rule_engine" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:16px;color:#DC2626;&quot;&gt;🚨 🛡️&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:6.5px;font-weight:bold;color:#0F172A;&quot;&gt;Sub-10ms Fraud Filter&lt;br&gt;&lt;span style=&quot;font-size:5.5px;color:#475569;font-weight:normal;&quot;&gt;AML Screening &amp;amp; Sanctions List&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#EF4444;strokeWidth=1;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="332" y="490" width="138" height="60" as="geometry"/>
        </mxCell>

        <mxCell id="lbl_col2_status" value="&lt;span style=&quot;font-size:6px;color:#1E3A8A;font-weight:bold;&quot;&gt;Unified Lakehouse &amp;amp; CMEK Encrypted&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="332" y="648" width="138" height="14" as="geometry"/>
        </mxCell>


        <!-- ==================== COLUMN 4: VERTEX AI & GEMINI PLATFORM (PROCESSING LAYER) ==================== -->
        <!-- x = 484 .. 794 (width = 310) -->
        <mxCell id="col3_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="484" y="80" width="310" height="585" as="geometry"/>
        </mxCell>
        <mxCell id="col3_hdr" value="&lt;b style=&quot;font-size:9.5px;color:#1E3A8A;&quot;&gt;VERTEX AI &amp;amp; GEMINI PLATFORM&lt;br&gt;&lt;span style=&quot;font-size:7px;color:#475569;&quot;&gt;(INTELLIGENCE &amp;amp; REASONING CORE)&lt;/span&gt;&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="490" y="83" width="300" height="25" as="geometry"/>
        </mxCell>

        <!-- Inner Light Card Container -->
        <mxCell id="box_vertex_gemini_inner" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#BFDBFE;strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="490" y="112" width="298" height="435" as="geometry"/>
        </mxCell>

        <!-- Top Gemini Logo -->
        <mxCell id="lbl_gemini_brand" value="&lt;b style=&quot;font-size:22px;color:#2563EB;font-family:sans-serif;&quot;&gt;Gemini&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="585" y="115" width="110" height="26" as="geometry"/>
        </mxCell>

        <!-- Left Node: Gemini Pro Vision -->
        <mxCell id="card_gemini_pro_vision" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:18px;color:#2563EB;&quot;&gt;👁️ ✨&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;font-weight:bold;color:#0F172A;&quot;&gt;Gemini Pro Vision&lt;br&gt;&lt;span style=&quot;font-size:5.5px;color:#475569;font-weight:normal;&quot;&gt;OCR &amp;amp; Tax Entity Parsing&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.2;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="498" y="148" width="85" height="65" as="geometry"/>
        </mxCell>

        <!-- Dialogflow CX Box on Right -->
        <mxCell id="card_dialogflow" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:20px;color:#D97706;&quot;&gt;🔶&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;font-weight:bold;color:#0F172A;&quot;&gt;Dialogflow CX&lt;br&gt;&lt;span style=&quot;font-size:5.5px;color:#475569;font-weight:normal;&quot;&gt;Conversational Chat Agent&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF3C7;strokeColor=#F59E0B;strokeWidth=1.2;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="690" y="148" width="90" height="65" as="geometry"/>
        </mxCell>

        <!-- Bidirectional Vertex AI with Gemini Pro -->
        <mxCell id="lbl_chat_agent" value="&lt;span style=&quot;font-size:5.5px;color:#0F172A;font-weight:bold;&quot;&gt;Vertex AI with Gemini Pro&lt;br&gt;&lt;span style=&quot;color:#475569;font-weight:normal;&quot;&gt;Conversational chat agent&lt;/span&gt;&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="585" y="152" width="102" height="30" as="geometry"/>
        </mxCell>
        <mxCell id="e_vis_dflow" value="" style="edgeStyle=none;html=1;strokeColor=#0F172A;strokeWidth=1.2;startArrow=classic;endArrow=classic;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="583" y="180" as="sourcePoint"/><mxPoint x="690" y="180" as="targetPoint"/></mxGeometry>
        </mxCell>

        <!-- Vertex AI Core Router -->
        <mxCell id="card_vertex_ai_core" value="&lt;b style=&quot;font-size:7px;color:#0F172A;&quot;&gt;💠 Vertex AI Orchestrator&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="495" y="222" width="90" height="20" as="geometry"/>
        </mxCell>
        <mxCell id="e_vis_vertex" value="" style="edgeStyle=none;html=1;strokeColor=#0F172A;strokeWidth=1.2;startArrow=classic;endArrow=classic;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="540" y="213" as="sourcePoint"/><mxPoint x="540" y="222" as="targetPoint"/></mxGeometry>
        </mxCell>

        <!-- Gemini High-Capability Synthesis Model Box -->
        <mxCell id="box_gemini_synthesis" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="585" y="222" width="195" height="135" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_gemini_high_cap" value="&lt;b style=&quot;font-size:16px;color:#2563EB;font-family:sans-serif;&quot;&gt;Gemini&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:6px;color:#475569;&quot;&gt;(High-Capability Model: Gemini 3.7 Flash)&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="590" y="225" width="185" height="28" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_synth_text" value="&lt;span style=&quot;font-size:6px;color:#334155;line-height:1.3;&quot;&gt;Synthesize analysis customer data from customer data.&lt;br&gt;&lt;b style=&quot;color:#1E3A8A;&quot;&gt;• Synthesize long-term insights to Generate long-form personalized financial reports and tailored investment strategies&lt;/b&gt;&lt;br&gt;• Real-time Tax-Loss Harvesting &amp;amp; Risk Scoring&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;whiteSpace=wrap;" vertex="1" parent="1">
          <mxGeometry x="590" y="255" width="185" height="98" as="geometry"/>
        </mxCell>

        <!-- 3 Industry Sub-Engines inside Vertex AI -->
        <!-- 1. Portfolio Optimizer -->
        <mxCell id="card_mpt_optimizer" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:14px;color:#166534;&quot;&gt;⚖️ 📈&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:6px;font-weight:bold;color:#0F172A;&quot;&gt;Portfolio Rebalancing Engine&lt;br&gt;&lt;span style=&quot;font-size:5px;color:#475569;&quot;&gt;Mean-Variance / Sharpe Optimizer&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#86EFAC;strokeWidth=1;align=center;verticalAlign=middle;padding=1;" vertex="1" parent="1">
          <mxGeometry x="498" y="250" width="85" height="50" as="geometry"/>
        </mxCell>

        <!-- 2. Tax Loss Harvesting -->
        <mxCell id="card_tax_loss_engine" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:14px;color:#92400E;&quot;&gt;✂️ 💵&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:6px;font-weight:bold;color:#0F172A;&quot;&gt;Tax-Loss Harvester&lt;br&gt;&lt;span style=&quot;font-size:5px;color:#475569;&quot;&gt;Wash-Sale Avoidance Engine&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF3C7;strokeColor=#FDE68A;strokeWidth=1;align=center;verticalAlign=middle;padding=1;" vertex="1" parent="1">
          <mxGeometry x="498" y="305" width="85" height="50" as="geometry"/>
        </mxCell>

        <!-- Cloud Dataflow ETL -->
        <mxCell id="card_dataflow_etl" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:18px;color:#2563EB;&quot;&gt;💠&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:6.5px;font-weight:bold;color:#0F172A;&quot;&gt;Dataflow ETL&lt;br&gt;&lt;span style=&quot;font-size:5px;color:#475569;&quot;&gt;Streaming Sessionization&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#2563EB;strokeWidth=1.2;align=center;verticalAlign=middle;padding=1;" vertex="1" parent="1">
          <mxGeometry x="498" y="365" width="85" height="50" as="geometry"/>
        </mxCell>

        <!-- Vertex AI Model Evaluation & Explainable AI (XAI) -->
        <mxCell id="card_fin_eval_xai" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:14px;color:#2563EB;&quot;&gt;🔍 ⚖️&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:6px;font-weight:bold;color:#0F172A;&quot;&gt;Explainable AI (Vertex XAI)&lt;br&gt;&lt;span style=&quot;font-size:5px;color:#475569;&quot;&gt;Feature Attributions &amp;amp; Fiduciary Audit&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#BFDBFE;strokeWidth=1;align=center;verticalAlign=middle;padding=1;" vertex="1" parent="1">
          <mxGeometry x="498" y="425" width="282" height="42" as="geometry"/>
        </mxCell>

        <!-- Continuous Learning / RLHF Feedback Loop -->
        <mxCell id="card_rlhf_loop_box" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:14px;color:#166534;&quot;&gt;🔄 ✨&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:6px;font-weight:bold;color:#166534;&quot;&gt;Continuous Fine-Tuning &amp;amp; RLHF Feedback Loop&lt;br&gt;&lt;span style=&quot;font-size:5px;color:#475569;&quot;&gt;Advisor corrections update prompt templates &amp;amp; policy constraints&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#86EFAC;strokeWidth=1;align=center;verticalAlign=middle;padding=1;" vertex="1" parent="1">
          <mxGeometry x="498" y="475" width="282" height="40" as="geometry"/>
        </mxCell>

        <!-- Sub-Column 4 Footnote -->
        <mxCell id="lbl_col3_status" value="&lt;span style=&quot;font-size:6px;color:#1E3A8A;font-weight:bold;&quot;&gt;Gemini Multi-Modal Reasoning Engine&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="490" y="648" width="300" height="14" as="geometry"/>
        </mxCell>


        <!-- ==================== COLUMN 5: ANALYTICS, ACTIONS, AND STORAGE LAYER ==================== -->
        <!-- x = 802 .. 1072 (width = 270) -->
        <mxCell id="col4_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="802" y="80" width="270" height="585" as="geometry"/>
        </mxCell>
        <mxCell id="col4_hdr" value="&lt;b style=&quot;font-size:8.5px;color:#0F172A;&quot;&gt;ANALYTICS, ACTIONS &amp;amp;&lt;br&gt;DOWNSTREAM STORAGE LAYER&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="807" y="83" width="260" height="25" as="geometry"/>
        </mxCell>

        <!-- Row 1: Processed Strategies -> BigQuery -->
        <mxCell id="card_strategies_badge" value="&lt;b style=&quot;font-size:6px;color:#0F172A;&quot;&gt;Processed&lt;br&gt;strategies &amp;amp;&lt;br&gt;insights&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="807" y="115" width="75" height="35" as="geometry"/>
        </mxCell>
        <mxCell id="card_bq_analytics" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:18px;color:#2563EB;&quot;&gt;🔍&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:6.5px;font-weight:bold;color:#0F172A;&quot;&gt;BigQuery&lt;br&gt;&lt;span style=&quot;font-size:5px;color:#475569;&quot;&gt;Strategy Mart&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#3B82F6;strokeWidth=1.2;align=center;verticalAlign=middle;padding=1;" vertex="1" parent="1">
          <mxGeometry x="888" y="112" width="70" height="42" as="geometry"/>
        </mxCell>
        <mxCell id="e_strat_bq" value="" style="edgeStyle=none;html=1;strokeColor=#0F172A;strokeWidth=1.2;endArrow=classic;" edge="1" parent="1" source="card_strategies_badge" target="card_bq_analytics"/>

        <!-- Row 2: Generated Financial Reports (PDFs) -> Cloud Storage -->
        <mxCell id="card_reports_badge" value="&lt;b style=&quot;font-size:6px;color:#0F172A;&quot;&gt;Generated&lt;br&gt;financial&lt;br&gt;reports (PDFs)&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="807" y="165" width="75" height="35" as="geometry"/>
        </mxCell>
        <mxCell id="card_gcs_reports" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:18px;color:#2563EB;&quot;&gt;🗄️&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:6.5px;font-weight:bold;color:#0F172A;&quot;&gt;Cloud Storage&lt;br&gt;&lt;span style=&quot;font-size:5px;color:#475569;&quot;&gt;Signed PDF Vault&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#3B82F6;strokeWidth=1.2;align=center;verticalAlign=middle;padding=1;" vertex="1" parent="1">
          <mxGeometry x="888" y="162" width="70" height="42" as="geometry"/>
        </mxCell>
        <mxCell id="e_rep_gcs" value="" style="edgeStyle=none;html=1;strokeColor=#0F172A;strokeWidth=1.2;endArrow=classic;" edge="1" parent="1" source="card_reports_badge" target="card_gcs_reports"/>

        <!-- Row 3: Looker Visual Analytics -->
        <mxCell id="card_looker_badge" value="&lt;b style=&quot;font-size:6px;color:#0F172A;&quot;&gt;Analytics on&lt;br&gt;customer behavior&lt;br&gt;&amp;amp; strategy yield&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="807" y="215" width="75" height="38" as="geometry"/>
        </mxCell>
        <mxCell id="card_looker_analytics" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:16px;&quot;&gt;📊 &lt;b style=&quot;font-size:8.5px;color:#0F172A;&quot;&gt;Looker&lt;/b&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:5px;color:#475569;&quot;&gt;Portfolio BI Cockpit&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#22C55E;strokeWidth=1.2;align=center;verticalAlign=middle;padding=1;" vertex="1" parent="1">
          <mxGeometry x="888" y="212" width="70" height="42" as="geometry"/>
        </mxCell>

        <!-- Custodian Order Routing Box -->
        <mxCell id="card_custodian_dispatch" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:16px;color:#1E40AF;&quot;&gt;⚡ 🏛️&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:6.5px;font-weight:bold;color:#0F172A;&quot;&gt;Custodian Order Router&lt;br&gt;&lt;span style=&quot;font-size:5px;color:#475569;&quot;&gt;Alpaca / Schwab / Fidelity API Execution&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#3B82F6;strokeWidth=1;align=center;verticalAlign=middle;padding=1;" vertex="1" parent="1">
          <mxGeometry x="965" y="112" width="100" height="92" as="geometry"/>
        </mxCell>

        <mxCell id="card_tax_filing_export" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:16px;color:#059669;&quot;&gt;📑 💼&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:6.5px;font-weight:bold;color:#0F172A;&quot;&gt;TurboTax / CPA Export&lt;br&gt;&lt;span style=&quot;font-size:5px;color:#475569;&quot;&gt;Schedule D &amp;amp; 8949 CSVs&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#86EFAC;strokeWidth=1;align=center;verticalAlign=middle;padding=1;" vertex="1" parent="1">
          <mxGeometry x="965" y="212" width="100" height="42" as="geometry"/>
        </mxCell>

        <!-- Row 4: Automated Actions (FCM, Cloud Run, Cloud Functions) -->
        <mxCell id="card_auto_act_box" value="&lt;b style=&quot;font-size:6.5px;color:#0F172A;&quot;&gt;Automated Actions Engine&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:5.5px;color:#475569;&quot;&gt;Send personalized investment alerts,&lt;br&gt;tax rebalance suggestions &amp;amp;&lt;br&gt;report links back to GE app&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="807" y="265" width="258" height="50" as="geometry"/>
        </mxCell>

        <mxCell id="card_fcm_notif" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:18px;color:#2563EB;&quot;&gt;☁️&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:6px;font-weight:bold;color:#0F172A;&quot;&gt;Firebase Cloud&lt;br&gt;Messaging (FCM)&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#3B82F6;strokeWidth=1;align=center;verticalAlign=middle;padding=1;" vertex="1" parent="1">
          <mxGeometry x="807" y="325" width="80" height="55" as="geometry"/>
        </mxCell>

        <mxCell id="card_cloud_run_act" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:18px;color:#2563EB;&quot;&gt;🏃&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:6.5px;font-weight:bold;color:#0F172A;&quot;&gt;Cloud Run&lt;br&gt;&lt;span style=&quot;font-size:5px;color:#475569;&quot;&gt;Microservices&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#3B82F6;strokeWidth=1;align=center;verticalAlign=middle;padding=1;" vertex="1" parent="1">
          <mxGeometry x="896" y="325" width="80" height="55" as="geometry"/>
        </mxCell>

        <mxCell id="card_cloud_funcs_act" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:18px;color:#2563EB;&quot;&gt;⚡&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:6px;font-weight:bold;color:#0F172A;&quot;&gt;Cloud Functions&lt;br&gt;&lt;span style=&quot;font-size:5px;color:#475569;&quot;&gt;Webhook Hooks&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#3B82F6;strokeWidth=1;align=center;verticalAlign=middle;padding=1;" vertex="1" parent="1">
          <mxGeometry x="985" y="325" width="80" height="55" as="geometry"/>
        </mxCell>

        <!-- Downstream Push Back into Client UI -->
        <mxCell id="card_return_action_sync" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:16px;color:#166534;&quot;&gt;🔄 📱&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:6.5px;font-weight:bold;color:#166534;&quot;&gt;Push Notifications &amp;amp; In-App Trade Approvals&lt;br&gt;&lt;span style=&quot;font-size:5px;color:#475569;&quot;&gt;Client 1-Click Buy/Sell Confirmation via GE App&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#86EFAC;strokeWidth=1.2;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="807" y="390" width="258" height="55" as="geometry"/>
        </mxCell>

        <!-- Continuous Audit Trail Vault -->
        <mxCell id="card_fintech_audit_vault" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:16px;color:#1E3A8A;&quot;&gt;📜 🔒&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:6.5px;font-weight:bold;color:#0F172A;&quot;&gt;WORM Immutability Vault (Cloud Storage)&lt;br&gt;&lt;span style=&quot;font-size:5px;color:#475569;&quot;&gt;7-Year SEC Rule 17a-4 Regulatory Retention Lock&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="807" y="455" width="258" height="50" as="geometry"/>
        </mxCell>

        <!-- Multi-Channel Brokerage Clearing Gateway -->
        <mxCell id="card_clearing_gateway" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:16px;&quot;&gt;🌐 🏛️&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:6.5px;font-weight:bold;color:#0F172A;&quot;&gt;FIX Protocol Gateway &amp;amp; Settlement Clearing&lt;br&gt;&lt;span style=&quot;font-size:5px;color:#475569;&quot;&gt;DTCC / NSCC Automated Clearing House Integrator&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="807" y="515" width="258" height="50" as="geometry"/>
        </mxCell>

        <mxCell id="lbl_col4_status" value="&lt;span style=&quot;font-size:6px;color:#1E3A8A;font-weight:bold;&quot;&gt;Real-Time Client Action Execution&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="807" y="648" width="258" height="14" as="geometry"/>
        </mxCell>


        <!-- ==================== COLUMN 6: SECURITY, GOVERNANCE & COMPLIANCE SIDEBAR ==================== -->
        <!-- x = 1080 .. 1330 (width = 250) -->
        <mxCell id="col5_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="1080" y="80" width="250" height="585" as="geometry"/>
        </mxCell>
        <mxCell id="col5_hdr" value="&lt;b style=&quot;font-size:8.5px;color:#1E3A8A;&quot;&gt;SECURITY, GOVERNANCE &amp;amp;&lt;br&gt;REGULATORY COMPLIANCE&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1085" y="83" width="240" height="25" as="geometry"/>
        </mxCell>

        <mxCell id="sec_card_iam" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:18px;color:#2563EB;&quot;&gt;👤&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;font-weight:bold;color:#0F172A;&quot;&gt;Cloud IAM &amp;amp; Workforce Identity&lt;br&gt;&lt;span style=&quot;font-size:5.5px;color:#475569;font-weight:normal;&quot;&gt;Role-Based ABAC &amp;amp; Fiduciary Separation of Duties&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="1088" y="112" width="234" height="60" as="geometry"/>
        </mxCell>

        <mxCell id="sec_card_vpc_sc" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:18px;color:#2563EB;&quot;&gt;💠&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;font-weight:bold;color:#0F172A;&quot;&gt;VPC Service Controls (VPC SC)&lt;br&gt;&lt;span style=&quot;font-size:5.5px;color:#475569;font-weight:normal;&quot;&gt;Data Exfiltration Protection &amp;amp; Zero-Trust Perimeter&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="1088" y="180" width="234" height="60" as="geometry"/>
        </mxCell>

        <mxCell id="sec_card_scc" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:18px;color:#2563EB;&quot;&gt;🛡️&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;font-weight:bold;color:#0F172A;&quot;&gt;Security Command Center (SCC)&lt;br&gt;&lt;span style=&quot;font-size:5.5px;color:#475569;font-weight:normal;&quot;&gt;Gemini Threat Intel &amp;amp; Real-Time Vulnerability Scans&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="1088" y="248" width="234" height="60" as="geometry"/>
        </mxCell>

        <mxCell id="sec_card_fintech_std" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:18px;color:#2563EB;&quot;&gt;📜 🔒&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;font-weight:bold;color:#0F172A;&quot;&gt;Fintech Compliance Standards&lt;br&gt;&lt;span style=&quot;font-size:5.5px;color:#475569;font-weight:normal;&quot;&gt;PCI-DSS Level 1, SOC 2 Type II, FINRA, SEC Rule 204A&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="1088" y="316" width="234" height="60" as="geometry"/>
        </mxCell>

        <mxCell id="sec_card_hsm_kms" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:18px;color:#2563EB;&quot;&gt;🔑&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;font-weight:bold;color:#0F172A;&quot;&gt;Cloud Key Management (KMS HSM)&lt;br&gt;&lt;span style=&quot;font-size:5.5px;color:#475569;font-weight:normal;&quot;&gt;FIPS 140-2 Level 3 Hardware Security Modules&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="1088" y="384" width="234" height="60" as="geometry"/>
        </mxCell>

        <mxCell id="sec_card_assured_sovereign" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:18px;color:#2563EB;&quot;&gt;🌐 🛡️&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;font-weight:bold;color:#0F172A;&quot;&gt;Assured Workloads &amp;amp; Data Residency&lt;br&gt;&lt;span style=&quot;font-size:5.5px;color:#475569;font-weight:normal;&quot;&gt;Sovereign Jurisdiction &amp;amp; Personnel Access Controls&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="1088" y="452" width="234" height="60" as="geometry"/>
        </mxCell>

        <mxCell id="sec_card_audit_logging" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:18px;color:#2563EB;&quot;&gt;📋 📡&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;font-weight:bold;color:#0F172A;&quot;&gt;Cloud Audit Logs &amp;amp; SIEM Stream&lt;br&gt;&lt;span style=&quot;font-size:5.5px;color:#475569;font-weight:normal;&quot;&gt;Chronicle SIEM &amp;amp; BigQuery Security Analytics&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="1088" y="520" width="234" height="60" as="geometry"/>
        </mxCell>

        <mxCell id="lbl_sec_status" value="&lt;span style=&quot;font-size:6.5px;color:#1E3A8A;font-weight:bold;&quot;&gt;Continuous Bank-Grade Security &amp;amp; Compliance&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1088" y="648" width="234" height="14" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
