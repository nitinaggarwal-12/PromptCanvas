export function buildServerlessEdaXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="serverless_eda_architecture" name="Serverless EDA Architecture (P4-APP-L-08)">
    <mxGraphModel dx="1600" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="950" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- ==================== TOP TITLE BANNER ==================== -->
        <mxCell id="main_title_box" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="16" width="860" height="54" as="geometry"/>
        </mxCell>
        <mxCell id="main_title" value="&lt;b style=&quot;font-size:18px;color:#0F172A;&quot;&gt;Serverless EDA Event Mesh Architecture (P4-APP-L-08)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:12px;color:#475569;font-weight:600;&quot;&gt;Google Cloud Pub/Sub • Cloud Run • Vertex AI Gemini Intelligence • Real-Time IoT Ingestion&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="45" y="18" width="830" height="50" as="geometry"/>
        </mxCell>


        <!-- ==================== COLUMN 1: EXTERNAL SOURCES & EVENT TRIGGERS ==================== -->
        <!-- x = 30 .. 240 (width = 210) -->
        <mxCell id="col1_bg" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="85" width="210" height="750" as="geometry"/>
        </mxCell>
        <mxCell id="col1_hdr" value="&lt;b style=&quot;font-size:11px;color:#1E3A8A;&quot;&gt;📱 SOURCES &amp;amp; TRIGGERS&lt;/b&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="30" y="85" width="210" height="34" as="geometry"/>
        </mxCell>

        <!-- Top Card: App Client / User Devices -->
        <mxCell id="card_ge_app_dev" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:24px;&quot;&gt;📱 💻&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;font-weight:bold;color:#0F172A;padding-top:2px;&quot;&gt;Enterprise Web &amp;amp; Mobile App&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;User Actions, Media Uploads &amp;amp; Clicks&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="42" y="130" width="186" height="150" as="geometry"/>
        </mxCell>

        <!-- Bottom Card: IoT Industrial Sensors -->
        <mxCell id="card_iot_sensors" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:24px;&quot;&gt;🏭 🌡️ 📶&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;font-weight:bold;color:#0F172A;padding-top:2px;&quot;&gt;Industrial IoT Sensors&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;MQTT / OPC-UA Streaming Telemetry&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="42" y="300" width="186" height="200" as="geometry"/>
        </mxCell>

        <!-- Ingress Payload Badge -->
        <mxCell id="badge_iot_telem" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9.5px;font-weight:bold;color:#0F172A;&quot;&gt;📡 Real-Time Telemetry Stream&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#64748B;&quot;&gt;JSON / Protobuf Stream Payloads&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="42" y="520" width="186" height="75" as="geometry"/>
        </mxCell>


        <!-- ==================== COLUMN 2: INGESTION & LOAD BALANCING ==================== -->
        <!-- x = 260 .. 470 (width = 210) -->
        <mxCell id="col2_bg" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#FEE2E2;strokeColor=#FECACA;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="260" y="85" width="210" height="750" as="geometry"/>
        </mxCell>
        <mxCell id="col2_hdr_top" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;⚖️ INGESTION &amp;amp; GATEWAY&lt;/b&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#EF4444;strokeColor=#DC2626;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="260" y="85" width="210" height="34" as="geometry"/>
        </mxCell>

        <!-- Cloud Load Balancing / CDN -->
        <mxCell id="card_lb_cdn" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;⚖️ Cloud Load Balancer / CDN&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#475569;padding-top:2px;&quot;&gt;Global Anycast IP • SSL Offload • Cloud Armor WAF DDoS Protection&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="272" y="130" width="186" height="95" as="geometry"/>
        </mxCell>

        <!-- Cloud Run Ingestion Microservice -->
        <mxCell id="card_crun_ingest" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#991B1B;&quot;&gt;🏃 Cloud Run Ingest Proxy&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#334155;line-height:1.3;padding-top:2px;&quot;&gt;• Fast Payload Schema Validation&lt;br&gt;• JWT Auth Token Check&lt;br&gt;• Metadata Enrichment&lt;br&gt;• Zero-Cold-Start Serverless&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#EF4444;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="272" y="240" width="186" height="145" as="geometry"/>
        </mxCell>

        <!-- Schema Registry Card -->
        <mxCell id="card_ingest_dlq" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;font-weight:bold;color:#0F172A;&quot;&gt;🛡️ Schema Registry Guard&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;padding-top:2px;&quot;&gt;Protobuf &amp;amp; JSON Contract Validation with Automated Dead-Letter Routing&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#EF4444;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="272" y="400" width="186" height="95" as="geometry"/>
        </mxCell>


        <!-- ==================== COLUMN 3: DISTRIBUTED ASYNC MESSAGING (PUB/SUB) ==================== -->
        <!-- x = 490 .. 700 (width = 210) -->
        <mxCell id="col3_bg" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="490" y="85" width="210" height="750" as="geometry"/>
        </mxCell>
        <mxCell id="col3_hdr" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;💠 PUB/SUB EVENT MESH&lt;/b&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="490" y="85" width="210" height="34" as="geometry"/>
        </mxCell>

        <!-- Pub/Sub Core Bus -->
        <mxCell id="card_pubsub_core" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11.5px;font-weight:bold;color:#1E40AF;&quot;&gt;💠 Cloud Pub/Sub Core Mesh&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#334155;line-height:1.3;padding-top:2px;&quot;&gt;• Millions QPS Ingestion Buffer&lt;br&gt;• At-Least-Once Delivery SLA&lt;br&gt;• Content-Based Filtering&lt;br&gt;• Regional Multi-Zone HA&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="502" y="130" width="186" height="145" as="geometry"/>
        </mxCell>

        <!-- User Actions Topic -->
        <mxCell id="badge_pubsub_user_ev" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;font-weight:bold;color:#0F172A;&quot;&gt;👤 User Actions Topic&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;Session &amp;amp; Interactive State Stream&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="502" y="290" width="186" height="65" as="geometry"/>
        </mxCell>

        <!-- Dead Letter Queue Topic -->
        <mxCell id="badge_pubsub_dlq" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;font-weight:bold;color:#991B1B;&quot;&gt;📬 Dead-Letter Queue (DLQ)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;Automated Poison Pill Isolation &amp;amp; SRE Alerting&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#EF4444;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="502" y="370" width="186" height="75" as="geometry"/>
        </mxCell>


        <!-- ==================== COLUMN 4: PROCESSING (EVENT-DRIVEN MICROSERVICES) ==================== -->
        <!-- x = 720 .. 970 (width = 250) -->
        <mxCell id="col4_bg" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#DCFCE7;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="720" y="85" width="250" height="750" as="geometry"/>
        </mxCell>
        <mxCell id="col4_hdr" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;⚡ EVENT PROCESSING WORKERS&lt;/b&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#16A34A;strokeColor=#15803D;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="720" y="85" width="250" height="34" as="geometry"/>
        </mxCell>

        <!-- 1. Cloud Run Telemetry Analysis -->
        <mxCell id="card_crun_telem" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#166534;&quot;&gt;🏃 Cloud Run Telemetry Analyzer&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;Real-time sliding window aggregation&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#22C55E;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="732" y="130" width="226" height="65" as="geometry"/>
        </mxCell>

        <!-- 2. Cloud Functions Validate Event -->
        <mxCell id="card_cfunc_val" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#D97706;&quot;&gt;⚡ Cloud Functions Validator&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;Serverless business rule checks&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#22C55E;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="732" y="205" width="226" height="65" as="geometry"/>
        </mxCell>

        <!-- 3. Cloud Run Anomaly Interpretation -->
        <mxCell id="card_crun_anomaly" value="&lt;table style="width:100%;padding:4px;"&gt;&lt;tr&gt;&lt;td style="font-size:10.5px;font-weight:bold;color:#166534;"&gt;🏃 Anomaly Detector Microservice&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style="font-size:8px;color:#475569;"&gt;Statistical outlier scoring &amp;amp; thresholding&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#22C55E;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="732" y="280" width="226" height="65" as="geometry"/>
        </mxCell>

        <!-- 4. Cloud Functions Route Action -->
        <mxCell id="card_cfunc_route" value="&lt;table style="width:100%;padding:4px;"&gt;&lt;tr&gt;&lt;td style="font-size:10.5px;font-weight:bold;color:#D97706;"&gt;⚡ Action Router Cloud Function&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style="font-size:8px;color:#475569;"&gt;Dynamic dispatch to tasks &amp;amp; downstream queues&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#22C55E;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="732" y="355" width="226" height="65" as="geometry"/>
        </mxCell>

        <!-- 5. Eventarc Router -->
        <mxCell id="card_eventarc" value="&lt;table style="width:100%;padding:4px;"&gt;&lt;tr&gt;&lt;td style="font-size:10.5px;font-weight:bold;color:#1E40AF;"&gt;🔄 Eventarc Standardized Router&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style="font-size:8px;color:#475569;"&gt;CloudEvents 1.0 Spec routing directly to Cloud Run&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#22C55E;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="732" y="430" width="226" height="65" as="geometry"/>
        </mxCell>


        <!-- ==================== COLUMN 5: VERTEX AI & GEMINI PLATFORM ==================== -->
        <!-- x = 990 .. 1260 (width = 270) -->
        <mxCell id="col5_bg" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#ECFDF5;strokeColor=#A7F3D0;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="990" y="85" width="270" height="750" as="geometry"/>
        </mxCell>
        <mxCell id="col5_hdr_mesh" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;✨ VERTEX AI INTELLIGENCE&lt;/b&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#059669;strokeColor=#047857;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="990" y="85" width="270" height="34" as="geometry"/>
        </mxCell>

        <!-- Gemini Reasoning Engine -->
        <mxCell id="box_gemini_container" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#047857;border-bottom:1px solid #A7F3D0;padding-bottom:2px;&quot;&gt;✨ Gemini Foundation Engine&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9px;color:#334155;line-height:1.3;padding-top:4px;&quot;&gt;• Gemini 2.5 Pro Multimodal Reasoning&lt;br&gt;• Root Cause Analysis &amp;amp; Failure Prediction&lt;br&gt;• Natural Language Diagnostic Generation&lt;br&gt;• Automated Incident Severity Classification&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#6EE7B7;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1002" y="130" width="246" height="160" as="geometry"/>
        </mxCell>

        <!-- Automated Maintenance Order Action -->
        <mxCell id="badge_maint_order" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;font-weight:bold;color:#B45309;&quot;&gt;🛠️ Automated Maintenance Order&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;Generates Work Order Specs with Part Numbers&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF3C7;strokeColor=#FDE68A;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1002" y="305" width="246" height="65" as="geometry"/>
        </mxCell>

        <!-- Vertex AI GenAI Evaluation -->
        <mxCell id="card_model_eval" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;font-weight:bold;color:#0F172A;&quot;&gt;📈 Vertex AI Model Evaluation&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;Confidence Score 99.4% • Hallucination Safety Guard&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#A7F3D0;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1002" y="380" width="246" height="65" as="geometry"/>
        </mxCell>


        <!-- ==================== COLUMN 6: STORAGE & ANALYTICS & VISIBILITY ==================== -->
        <!-- x = 1280 .. 1560 (width = 280) -->
        <mxCell id="col6_bg" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1280" y="85" width="280" height="750" as="geometry"/>
        </mxCell>
        <mxCell id="col6_hdr" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;📊 STORAGE, ANALYTICS &amp;amp; ACTIONS&lt;/b&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1280" y="85" width="280" height="34" as="geometry"/>
        </mxCell>

        <!-- Bigtable Time Series -->
        <mxCell id="card_bigtable" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;&quot;&gt;🗄️ Cloud Bigtable (Sub-10ms Time Series)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;High-throughput sensor history &amp;amp; telemetry archive&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1292" y="130" width="256" height="60" as="geometry"/>
        </mxCell>

        <!-- Cloud SQL Metadata -->
        <mxCell id="card_cloudsql" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;&quot;&gt;🛢️ Cloud SQL (Relational Metadata)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;Asset catalogs, user roles &amp;amp; permissions&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1292" y="200" width="256" height="60" as="geometry"/>
        </mxCell>

        <!-- BigQuery Analytics Lake -->
        <mxCell id="card_bq_lake" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;&quot;&gt;🔍 BigQuery Enterprise Analytics Lakehouse&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;Serverless Petabyte-scale SQL Analytics &amp;amp; ML&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1292" y="270" width="256" height="60" as="geometry"/>
        </mxCell>

        <!-- Looker BI Visuals -->
        <mxCell id="card_looker" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#166534;&quot;&gt;📊 Looker BI &amp;amp; Executive Dashboards&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;Real-Time Plant Diagnostics &amp;amp; Operational Metrics&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#22C55E;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1292" y="340" width="256" height="60" as="geometry"/>
        </mxCell>

        <!-- External APIs -->
        <mxCell id="card_ext_apis" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#991B1B;&quot;&gt;⚙️ External APIs &amp;amp; ERP Systems&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;SAP Work Order Creation • FCM Mobile Push Alerts&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#EF4444;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1292" y="410" width="256" height="60" as="geometry"/>
        </mxCell>


        <!-- Connectors between Columns -->
        <mxCell id="e_c1_c2" value="" style="edgeStyle=none;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="col1_bg" target="col2_bg"/>
        <mxCell id="e_c2_c3" value="" style="edgeStyle=none;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="col2_bg" target="col3_bg"/>
        <mxCell id="e_c3_c4" value="" style="edgeStyle=none;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="col3_bg" target="col4_bg"/>
        <mxCell id="e_c4_c5" value="" style="edgeStyle=none;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="col4_bg" target="col5_bg"/>
        <mxCell id="e_c5_c6" value="" style="edgeStyle=none;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="col5_bg" target="col6_bg"/>


        <!-- ==================== FOOTER LEGEND ==================== -->
        <mxCell id="legend_box" value="&lt;table style=&quot;width:100%;font-size:9.5px;color:#334155;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td&gt;&lt;b style=&quot;color:#0F172A;&quot;&gt;Serverless EDA Event Mesh:&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🔵 &lt;b&gt;Edge &amp;amp; Ingress Clients&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🔴 &lt;b&gt;Cloud Run Gateway &amp;amp; Schema Registry&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🔵 &lt;b&gt;Pub/Sub Core Mesh&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🟢 &lt;b&gt;Vertex AI Gemini Intelligence&lt;/b&gt;&lt;/td&gt;&lt;td&gt;✨ &lt;b style=&quot;color:#1D4ED8;&quot;&gt;Powered by Google Cloud Serverless&lt;/b&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="30" y="860" width="1530" height="38" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
