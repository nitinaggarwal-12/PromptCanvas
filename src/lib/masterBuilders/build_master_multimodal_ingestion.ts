export function buildMultimodalIngestionXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="agentic_multimodal_ingestion" name="Agentic Multi-Modal Ingestion Flow (P4-DAT-P-09)">
    <mxGraphModel dx="1600" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="950" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- ==================== TOP TITLE BANNER ==================== -->
        <mxCell id="main_title_box" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="16" width="860" height="54" as="geometry"/>
        </mxCell>
        <mxCell id="main_title" value="&lt;b style=&quot;font-size:18px;color:#0F172A;&quot;&gt;Agentic Multi-Modal Ingestion Flow Architecture (P4-DAT-P-09)&lt;/b&gt;&lt;br&gt;&lt;span style="font-size:12px;color:#475569;font-weight:600;"&gt;Google Cloud Vertex AI • Gemini Multimodal Reasoning • Speech, Vision &amp;amp; Geo-Spatial Fusion&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="45" y="18" width="830" height="50" as="geometry"/>
        </mxCell>


        <!-- ==================== COLUMN 1: MULTI-MODAL INPUT SOURCES ==================== -->
        <!-- x = 30 .. 300 (width = 270) -->
        <mxCell id="col1_bg" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="85" width="270" height="720" as="geometry"/>
        </mxCell>
        <mxCell id="col1_hdr" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;📱 MULTI-MODAL CLIENT INGRESS&lt;/b&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#94A3B8;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="30" y="85" width="270" height="34" as="geometry"/>
        </mxCell>

        <!-- Custom User Client Card -->
        <mxCell id="card_user_app" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:24px;&quot;&gt;📱 💻&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;padding-top:2px;&quot;&gt;Enterprise Web &amp;amp; Mobile App&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;Voice Notes, Site Photos &amp;amp; Documents&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="45" y="130" width="240" height="130" as="geometry"/>
        </mxCell>

        <!-- Geo-Spatial Client Card -->
        <mxCell id="card_ge_app" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:24px;&quot;&gt;🌐 📍&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;padding-top:2px;&quot;&gt;Geo-Spatial Client (Earth / Maps)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;Satellite Imagery, GPS &amp;amp; Cadastral GIS Polygons&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="45" y="280" width="240" height="130" as="geometry"/>
        </mxCell>

        <!-- 4 Modalities Box -->
        <mxCell id="card_mod_text" value="&lt;b style=&quot;font-size:9px;color:#0F172A;&quot;&gt;📄 Text / PDFs / Structured Specs&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1;align=left;verticalAlign=middle;padding=4;spacingLeft=8;" vertex="1" parent="1">
          <mxGeometry x="45" y="430" width="240" height="38" as="geometry"/>
        </mxCell>
        <mxCell id="card_mod_voice" value="&lt;b style=&quot;font-size:9px;color:#0F172A;&quot;&gt;🎙️ Audio / Voice Feeds / Radio Streams&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1;align=left;verticalAlign=middle;padding=4;spacingLeft=8;" vertex="1" parent="1">
          <mxGeometry x="45" y="480" width="240" height="38" as="geometry"/>
        </mxCell>
        <mxCell id="card_mod_image" value="&lt;b style=&quot;font-size:9px;color:#0F172A;&quot;&gt;🖼️ Video / Camera Feeds / Scans&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1;align=left;verticalAlign=middle;padding=4;spacingLeft=8;" vertex="1" parent="1">
          <mxGeometry x="45" y="530" width="240" height="38" as="geometry"/>
        </mxCell>
        <mxCell id="card_mod_geo" value="&lt;b style=&quot;font-size:9px;color:#0F172A;&quot;&gt;📍 GIS Vector Layers &amp;amp; Point Clouds&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1;align=left;verticalAlign=middle;padding=4;spacingLeft=8;" vertex="1" parent="1">
          <mxGeometry x="45" y="580" width="240" height="38" as="geometry"/>
        </mxCell>


        <!-- ==================== COLUMN 2: CAPTURE & MULTI-MODAL PROCESSING ==================== -->
        <!-- x = 320 .. 580 (width = 260) -->
        <mxCell id="col2_bg" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="320" y="85" width="260" height="720" as="geometry"/>
        </mxCell>
        <mxCell id="col2_hdr" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;⚙️ GCP PRE-PROCESSING SERVICES&lt;/b&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#94A3B8;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="320" y="85" width="260" height="34" as="geometry"/>
        </mxCell>

        <!-- 1. GCS Object Store -->
        <mxCell id="card_gcs_proc" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;🗄️ Cloud Storage (GCS)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#475569;padding-top:2px;&quot;&gt;Raw Multi-Modal Data Lake • Auto-Tiering &amp;amp; Retention&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="335" y="130" width="230" height="80" as="geometry"/>
        </mxCell>

        <!-- 2. Speech-to-Text API -->
        <mxCell id="card_stt" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;🗣️ Speech-to-Text v2 API&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#475569;padding-top:2px;&quot;&gt;Multi-Language Audio Transcription &amp;amp; Diarization&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="335" y="230" width="230" height="80" as="geometry"/>
        </mxCell>

        <!-- 3. Vertex AI Vision & Video Intelligence -->
        <mxCell id="card_vision_video" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;👁️ Vision &amp;amp; Video Intelligence&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#475569;padding-top:2px;&quot;&gt;OCR Text Extraction • Object &amp;amp; Defect Detection&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="335" y="330" width="230" height="80" as="geometry"/>
        </mxCell>

        <!-- 4. Google Maps Platform APIs -->
        <mxCell id="card_maps_api" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;🗺️ Maps &amp;amp; Earth Engine APIs&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#475569;padding-top:2px;&quot;&gt;Geocoding, Spatial Indexing &amp;amp; Elevation Profiling&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="335" y="430" width="230" height="80" as="geometry"/>
        </mxCell>


        <!-- ==================== COLUMN 3: GEMINI-POWERED AGENTIC ORCHESTRATOR ==================== -->
        <!-- x = 600 .. 1080 (width = 480) -->
        <mxCell id="col3_bg" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="600" y="85" width="480" height="720" as="geometry"/>
        </mxCell>
        <mxCell id="col3_hdr" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;🧠 GEMINI AGENTIC ORCHESTRATION PLATFORM (VERTEX AI)&lt;/b&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="600" y="85" width="480" height="34" as="geometry"/>
        </mxCell>

        <!-- Orchestration Agent Top Card -->
        <mxCell id="box_orch_agent" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td colspan=&quot;3&quot; style=&quot;font-size:12px;font-weight:bold;color:#1E40AF;border-bottom:1px solid #BFDBFE;padding-bottom:2px;&quot;&gt;✨ Multi-Modal Orchestration Agent&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;padding:4px;text-align:center;&quot;&gt;&lt;b style=&quot;font-size:8.5px;color:#0F172A;&quot;&gt;Gemini 2.5 Flash&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7px;color:#475569;&quot;&gt;Cross-Modal Fusion&lt;/span&gt;&lt;/td&gt;&lt;td style=&quot;padding:4px;text-align:center;&quot;&gt;&lt;b style=&quot;font-size:8.5px;color:#0F172A;&quot;&gt;Agent Planning&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7px;color:#475569;&quot;&gt;ReAct Tool Routing&lt;/span&gt;&lt;/td&gt;&lt;td style=&quot;padding:4px;text-align:center;&quot;&gt;&lt;b style=&quot;font-size:8.5px;color:#0F172A;&quot;&gt;Function Calling&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7px;color:#475569;&quot;&gt;Dynamic API Execution&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.5;align=center;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="615" y="130" width="450" height="105" as="geometry"/>
        </mxCell>

        <!-- Vertex AI Embedding API -->
        <mxCell id="card_embed_api" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;&quot;&gt;🌐 Multimodal Embedding Generation API&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Unified Text, Image &amp;amp; Geo-Feature 1408-dim Vector Embeddings&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="615" y="255" width="450" height="65" as="geometry"/>
        </mxCell>

        <!-- Vertex AI Vector Search -->
        <mxCell id="card_vector_search" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;&quot;&gt;🕸️ Vertex AI Vector Search (ScaNN Index)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Billion-scale sub-10ms nearest neighbor semantic retrieval&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="615" y="335" width="450" height="65" as="geometry"/>
        </mxCell>

        <!-- Multimodal Reasoning Engine -->
        <mxCell id="card_reasoning_engine" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#1E40AF;&quot;&gt;✨ Gemini Multimodal Deep Reasoning Engine&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#334155;line-height:1.3;padding-top:2px;&quot;&gt;• Cross-Modal Temporal &amp;amp; Spatial Synthesizer&lt;br&gt;• Discrepancy &amp;amp; Outlier Resolution&lt;br&gt;• Structured JSON Output Generation&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#3B82F6;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="615" y="415" width="450" height="95" as="geometry"/>
        </mxCell>


        <!-- ==================== COLUMN 4: KNOWLEDGE REPRESENTATION & ACTIONS ==================== -->
        <!-- x = 1100 .. 1560 (width = 460) -->
        <mxCell id="col4_bg" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1100" y="85" width="460" height="720" as="geometry"/>
        </mxCell>
        <mxCell id="col4_hdr" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;📊 KNOWLEDGE, ACTION &amp;amp; CLIENT SYNC&lt;/b&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#94A3B8;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1100" y="85" width="460" height="34" as="geometry"/>
        </mxCell>

        <!-- BigQuery Knowledge Base -->
        <mxCell id="card_act_bq" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;🔍 BigQuery Multi-Modal Lakehouse&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#475569;padding-top:2px;&quot;&gt;SQL Analytics over Structured, Unstructured &amp;amp; Geospatial Entities&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1115" y="130" width="430" height="65" as="geometry"/>
        </mxCell>

        <!-- Knowledge Graph Storage -->
        <mxCell id="card_act_kg" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;🕸️ Enterprise Semantic Knowledge Graph (Spanner / Neo4j)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#475569;padding-top:2px;&quot;&gt;Ontology Relationships, Equipment Hierarchy &amp;amp; Spatial Links&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1115" y="205" width="430" height="65" as="geometry"/>
        </mxCell>

        <!-- Looker BI Reports -->
        <mxCell id="card_act_insights" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#166534;&quot;&gt;📊 Automated Looker Insights &amp;amp; Incident Reports&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#475569;padding-top:2px;&quot;&gt;Executive Summaries, Heatmaps &amp;amp; Risk Telemetry Dashboards&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1115" y="280" width="430" height="65" as="geometry"/>
        </mxCell>

        <!-- Alerting & Cloud Functions -->
        <mxCell id="card_act_alert" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#991B1B;&quot;&gt;⚡ Eventarc &amp;amp; Cloud Functions Real-Time Dispatcher&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#475569;padding-top:2px;&quot;&gt;Instant SMS, PagerDuty, Webhook &amp;amp; ERP Work Order Creation&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#FCA5A5;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1115" y="355" width="430" height="65" as="geometry"/>
        </mxCell>

        <!-- Client Annotations & Sync -->
        <mxCell id="card_act_ge" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;🌐 Client Annotations, 3D Layers &amp;amp; AR Overlay&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#475569;padding-top:2px;&quot;&gt;Real-Time 3D Vector Push directly to Field Mobile / Earth Client&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1115" y="430" width="430" height="65" as="geometry"/>
        </mxCell>


        <!-- Connectors between Columns -->
        <mxCell id="e_c1_c2" value="" style="edgeStyle=none;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="col1_bg" target="col2_bg"/>
        <mxCell id="e_c2_c3" value="" style="edgeStyle=none;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="col2_bg" target="col3_bg"/>
        <mxCell id="e_c3_c4" value="" style="edgeStyle=none;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="col3_bg" target="col4_bg"/>


        <!-- ==================== BOTTOM HORIZONTAL GOVERNANCE BAR ==================== -->
        <mxCell id="box_btm_gov" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="820" width="1530" height="75" as="geometry"/>
        </mxCell>

        <!-- 3 Governance Components -->
        <mxCell id="card_gov_iam" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:16px;color:#2563EB;&quot;&gt;🛡️&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;font-weight:bold;color:#0F172A;&quot;&gt;Cloud IAM &amp;amp; Policy Controller&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;color:#475569;&quot;&gt;Least Privilege RBAC • Workload Identity&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#BFDBFE;strokeWidth=1;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="45" y="830" width="480" height="55" as="geometry"/>
        </mxCell>

        <mxCell id="card_gov_model_mon" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:16px;color:#2563EB;&quot;&gt;📊&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;font-weight:bold;color:#0F172A;&quot;&gt;Vertex AI Model Monitoring&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;color:#475569;&quot;&gt;Cross-Modal Feature Drift &amp;amp; Hallucination Alerts&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#BFDBFE;strokeWidth=1;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="555" y="830" width="480" height="55" as="geometry"/>
        </mxCell>

        <mxCell id="card_gov_cloud_log" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:16px;color:#2563EB;&quot;&gt;📑&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;font-weight:bold;color:#0F172A;&quot;&gt;Cloud Logging &amp;amp; Trace&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;color:#475569;&quot;&gt;Immutable Audit Logs &amp;amp; OpenTelemetry Traces&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#BFDBFE;strokeWidth=1;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="1065" y="830" width="480" height="55" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
