export function buildStreamingAnalyticsXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="real_time_streaming_analytics_topology" name="Real-Time Streaming Analytics Topology (P4-DAT-P-10)">
    <mxGraphModel dx="1600" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="950" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- ==================== 1. TOP GLOBAL SUPPORT & MONITORING BAR ==================== -->
        <mxCell id="bar_support_bg" value="" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="30" y="16" width="1530" height="54" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_support_title" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;🛡️ Platform Support&lt;br&gt;&amp;amp; Governance&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="45" y="20" width="140" height="46" as="geometry"/>
        </mxCell>
        <mxCell id="card_sup_monitoring" value="&lt;table style=&quot;width:100%;border-collapse:collapse;font-size:8.5px;color:#0F172A;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:20px;font-size:16px;text-align:center;&quot;&gt;📈&lt;/td&gt;&lt;td&gt;&lt;b style=&quot;color:#0F172A;&quot;&gt;Cloud Monitoring&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#475569;&quot;&gt;Pipeline Latency &amp;amp; Backpressure&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=left;verticalAlign=middle;padding=3;" vertex="1" parent="1">
          <mxGeometry x="200" y="21" width="280" height="44" as="geometry"/>
        </mxCell>
        <mxCell id="card_sup_logging" value="&lt;table style=&quot;width:100%;border-collapse:collapse;font-size:8.5px;color:#0F172A;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:20px;font-size:16px;text-align:center;&quot;&gt;📑&lt;/td&gt;&lt;td&gt;&lt;b style=&quot;color:#0F172A;&quot;&gt;Cloud Logging&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#475569;&quot;&gt;Real-Time Diagnostic Traces&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=left;verticalAlign=middle;padding=3;" vertex="1" parent="1">
          <mxGeometry x="500" y="21" width="280" height="44" as="geometry"/>
        </mxCell>
        <mxCell id="card_sup_iam" value="&lt;table style=&quot;width:100%;border-collapse:collapse;font-size:8.5px;color:#0F172A;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:20px;font-size:16px;text-align:center;&quot;&gt;🛡️&lt;/td&gt;&lt;td&gt;&lt;b style=&quot;color:#0F172A;&quot;&gt;Cloud IAM&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#475569;&quot;&gt;Workload Identity Federation&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=left;verticalAlign=middle;padding=3;" vertex="1" parent="1">
          <mxGeometry x="800" y="21" width="320" height="44" as="geometry"/>
        </mxCell>
        <mxCell id="card_sup_kms" value="&lt;table style=&quot;width:100%;border-collapse:collapse;font-size:8.5px;color:#0F172A;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:20px;font-size:16px;text-align:center;&quot;&gt;🔒&lt;/td&gt;&lt;td&gt;&lt;b style=&quot;color:#0F172A;&quot;&gt;Cloud KMS&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#475569;&quot;&gt;CMEK Encryption in Flight &amp;amp; Rest&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=left;verticalAlign=middle;padding=3;" vertex="1" parent="1">
          <mxGeometry x="1140" y="21" width="400" height="44" as="geometry"/>
        </mxCell>


        <!-- ==================== ZONE 1: IoT DATA SOURCES & INGESTION (x = 30 .. 270) ==================== -->
        <!-- x = 30 .. 270 (width = 240) -->
        <mxCell id="col1_bg" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="85" width="240" height="740" as="geometry"/>
        </mxCell>
        <mxCell id="hdr_zone1" value="&lt;b style=&quot;font-size:11px;color:#1E3A8A;&quot;&gt;1. IoT SOURCES &amp;amp; INGESTION&lt;/b&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="30" y="85" width="240" height="34" as="geometry"/>
        </mxCell>

        <!-- 4 IoT Source Devices -->
        <mxCell id="dev_sensors" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:18px;&quot;&gt;🎛️&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;font-weight:bold;color:#0F172A;&quot;&gt;Smart Sensors&lt;br&gt;&lt;span style=&quot;font-size:7px;color:#475569;font-weight:normal;&quot;&gt;Vibration &amp;amp; Temperature&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="45" y="130" width="210" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="dev_vehicles" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:18px;&quot;&gt;🚗&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;font-weight:bold;color:#0F172A;&quot;&gt;Connected Fleet Vehicles&lt;br&gt;&lt;span style=&quot;font-size:7px;color:#475569;font-weight:normal;&quot;&gt;GPS Telematics &amp;amp; Diagnostics&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="45" y="200" width="210" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="dev_equipment" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:18px;&quot;&gt;🏭&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;font-weight:bold;color:#0F172A;&quot;&gt;Industrial Plant Equipment&lt;br&gt;&lt;span style=&quot;font-size:7px;color:#475569;font-weight:normal;&quot;&gt;Turbines, Pumps, Compressors&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="45" y="270" width="210" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="dev_meters" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:18px;&quot;&gt;⏱️&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;font-weight:bold;color:#0F172A;&quot;&gt;Smart Power &amp;amp; Flow Meters&lt;br&gt;&lt;span style=&quot;font-size:7px;color:#475569;font-weight:normal;&quot;&gt;High-Frequency Energy Streams&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="45" y="340" width="210" height="60" as="geometry"/>
        </mxCell>

        <!-- IoT Device Management Gateway -->
        <mxCell id="card_gateway" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#1E40AF;&quot;&gt;📡 IoT Device Gateway&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#334155;line-height:1.3;padding-top:2px;&quot;&gt;• MQTT / HTTP Ingress Bridge&lt;br&gt;• X.509 Device Certificate Auth&lt;br&gt;• Cloud Armor DDoS Mitigation&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;align=left;verticalAlign=top;padding=4;" vertex="1" parent="1">
          <mxGeometry x="45" y="420" width="210" height="120" as="geometry"/>
        </mxCell>


        <!-- ==================== ZONE 2: MESSAGING & TRANSPORT: GCP PUB/SUB (x = 290 .. 540) ==================== -->
        <!-- x = 290 .. 540 (width = 250) -->
        <mxCell id="col2_bg" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="290" y="85" width="250" height="740" as="geometry"/>
        </mxCell>
        <mxCell id="hdr_zone2" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;2. MESSAGING: GCP PUB/SUB&lt;/b&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="290" y="85" width="250" height="34" as="geometry"/>
        </mxCell>

        <!-- Pub/Sub Decouples Callout -->
        <mxCell id="callout_pubsub_top" value="&lt;div style=&quot;font-size:8px;color:#B45309;padding:4px;&quot;&gt;💡 &lt;b&gt;Decoupled Scalability:&lt;/b&gt;&lt;br&gt;Pub/Sub isolates high-velocity ingestion from stream processing workloads.&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF9C3;strokeColor=#CA8A04;strokeWidth=1;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="305" y="130" width="220" height="60" as="geometry"/>
        </mxCell>

        <!-- Main Pub/Sub Core Box -->
        <mxCell id="box_pubsub" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#1E40AF;border-bottom:1px solid #BFDBFE;padding-bottom:2px;&quot;&gt;💠 GCP Pub/Sub Core Mesh&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;padding-top:4px;&quot;&gt;&lt;b style=&quot;font-size:9px;color:#0F172A;&quot;&gt;Topic:&lt;/b&gt; &lt;span style=&quot;color:#2563EB;font-family:monospace;font-size:8.5px;font-weight:bold;&quot;&gt;iot-telemetry-events&lt;/span&gt;&lt;br&gt;&lt;b style=&quot;font-size:9px;color:#0F172A;&quot;&gt;Sub:&lt;/b&gt; &lt;span style=&quot;color:#2563EB;font-family:monospace;font-size:8px;font-weight:bold;&quot;&gt;dataflow-streaming-sub&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;padding-top:4px;&quot;&gt;• Millions QPS Autoscaling&lt;br&gt;• Multi-Zone HA Durability&lt;br&gt;• 100ms Ingestion Latency&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="305" y="205" width="220" height="170" as="geometry"/>
        </mxCell>

        <!-- Pub/Sub Dead-Letter Topic -->
        <mxCell id="badge_pubsub_dlq" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;font-weight:bold;color:#991B1B;&quot;&gt;📬 Dead-Letter Queue (DLQ)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;Poison pill quarantine &amp;amp; auto-replay&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#EF4444;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="305" y="390" width="220" height="60" as="geometry"/>
        </mxCell>


        <!-- ==================== ZONE 3: STREAM PROCESSING: GCP DATAFLOW (x = 560 .. 980) ==================== -->
        <!-- x = 560 .. 980 (width = 420) -->
        <mxCell id="col3_bg" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="560" y="85" width="420" height="740" as="geometry"/>
        </mxCell>
        <mxCell id="hdr_zone3" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;3. STREAM PROCESSING: GCP DATAFLOW (APACHE BEAM)&lt;/b&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="560" y="85" width="420" height="34" as="geometry"/>
        </mxCell>

        <!-- 6 Step Pipeline Cards Stacked -->
        <mxCell id="df_step1" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;font-weight:bold;color:#0F172A;&quot;&gt;📥 Step 1: Stream Ingest (Read from Pub/Sub)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;Exactly-once event extraction with watermark tracking&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="575" y="130" width="390" height="52" as="geometry"/>
        </mxCell>
        <mxCell id="df_step2" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;font-weight:bold;color:#0F172A;&quot;&gt;📄 Step 2: Parse, Validate &amp;amp; Schema Conform&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;JSON / Protobuf decoding, null sanitization &amp;amp; typing&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="575" y="190" width="390" height="52" as="geometry"/>
        </mxCell>
        <mxCell id="df_step3" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;font-weight:bold;color:#0F172A;&quot;&gt;🗄️ Step 3: Real-Time Data Enrichment&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;Sub-ms Cloud Bigtable lookups for asset specs &amp;amp; calibration&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="575" y="250" width="390" height="52" as="geometry"/>
        </mxCell>
        <mxCell id="df_step4" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;font-weight:bold;color:#0F172A;&quot;&gt;📊 Step 4: Sliding Windowing &amp;amp; Aggregation&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;10s / 60s sliding window metrics (Min, Max, Avg, Variance)&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="575" y="310" width="390" height="52" as="geometry"/>
        </mxCell>
        <mxCell id="df_step5" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;font-weight:bold;color:#1E40AF;&quot;&gt;🧠 Step 5: Inline Anomaly Inference (Vertex AI / ML)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;Real-time outlier prediction &amp;amp; threshold deviation scoring&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#3B82F6;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="575" y="370" width="390" height="52" as="geometry"/>
        </mxCell>
        <mxCell id="df_step6" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;font-weight:bold;color:#0F172A;&quot;&gt;🔀 Step 6: Multi-Sink Branch &amp;amp; Format&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;Dual emission: BigQuery Storage Write API + GCS Parquet Lake&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="575" y="430" width="390" height="52" as="geometry"/>
        </mxCell>


        <!-- ==================== ZONE 4: REAL-TIME STORAGE & ANALYTICS (x = 1000 .. 1270) ==================== -->
        <!-- x = 1000 .. 1270 (width = 270) -->
        <mxCell id="col4_bg" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1000" y="85" width="270" height="740" as="geometry"/>
        </mxCell>
        <mxCell id="hdr_zone4" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;4. STORAGE &amp;amp; ANALYTICS: BIGQUERY&lt;/b&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1000" y="85" width="270" height="34" as="geometry"/>
        </mxCell>

        <!-- BigQuery Real-Time Tables -->
        <mxCell id="card_bq_rt" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;🔍 BigQuery Real-Time Tables&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;padding-top:2px;&quot;&gt;Storage Write API streaming ingestion with zero latency&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1015" y="130" width="240" height="75" as="geometry"/>
        </mxCell>

        <!-- BigQuery Aggregated Views -->
        <mxCell id="card_bq_views" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;📊 Materialized Views &amp;amp; BI Engine&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;padding-top:2px;&quot;&gt;In-memory sub-second acceleration for Looker dashboards&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1015" y="220" width="240" height="75" as="geometry"/>
        </mxCell>

        <!-- BigQuery ML Inference -->
        <mxCell id="callout_bq_btm" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#1E40AF;&quot;&gt;🤖 BigQuery ML In-Place Models&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;padding-top:2px;&quot;&gt;ARIMA+ Time-Series Forecasting &amp;amp; Autoencoder Detection&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#3B82F6;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1015" y="310" width="240" height="75" as="geometry"/>
        </mxCell>

        <!-- Cloud Storage Cold Tier -->
        <mxCell id="card_gcs_archive" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;🛢️ GCS Parquet Lake (Archive &amp;amp; Replay)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;padding-top:2px;&quot;&gt;Immutable historical lakehouse storage for ML training&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1015" y="400" width="240" height="75" as="geometry"/>
        </mxCell>


        <!-- ==================== ZONE 5: VISUALIZATION & REAL-TIME DASHBOARDS (x = 1290 .. 1560) ==================== -->
        <!-- x = 1290 .. 1560 (width = 270) -->
        <mxCell id="col5_bg" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#334155;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1290" y="85" width="270" height="740" as="geometry"/>
        </mxCell>
        <mxCell id="hdr_zone5" value="&lt;b style=&quot;font-size:11px;color:#38BDF8;&quot;&gt;5. REAL-TIME DASHBOARDS &amp;amp; UI&lt;/b&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#475569;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1290" y="85" width="270" height="34" as="geometry"/>
        </mxCell>

        <!-- Widget 1: Time-Series Chart -->
        <mxCell id="w_timeseries" value="&lt;table style=&quot;width:100%;color:#FFFFFF;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;font-weight:bold;color:#38BDF8;&quot;&gt;📈 Real-Time Vibration &amp;amp; Temp&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#94A3B8;&quot;&gt;Live 1-sec refresh • Sub-ms anomaly markers&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#475569;strokeWidth=1;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1305" y="130" width="240" height="75" as="geometry"/>
        </mxCell>

        <!-- Widget 2: Gauge -->
        <mxCell id="w_gauge" value="&lt;table style=&quot;width:100%;color:#FFFFFF;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;font-weight:bold;color:#4ADE80;&quot;&gt;🟢 Plant Uptime &amp;amp; Health: 99.98%&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#94A3B8;&quot;&gt;Active Fleet: 4,820 / 4,825 units nominal&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#475569;strokeWidth=1;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1305" y="220" width="240" height="75" as="geometry"/>
        </mxCell>

        <!-- Widget 3: Histogram -->
        <mxCell id="w_histogram" value="&lt;table style=&quot;width:100%;color:#FFFFFF;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;font-weight:bold;color:#FBBF24;&quot;&gt;📊 Event Throughput: 1.2M EPS&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#94A3B8;&quot;&gt;Pub/Sub to Dataflow delivery delay: 42ms&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#475569;strokeWidth=1;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1305" y="310" width="240" height="75" as="geometry"/>
        </mxCell>

        <!-- Widget 4: Map View -->
        <mxCell id="w_map" value="&lt;table style=&quot;width:100%;color:#FFFFFF;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;font-weight:bold;color:#F87171;&quot;&gt;🗺️ Global Incident Map View&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#94A3B8;&quot;&gt;Geospatial clustering with Looker &amp;amp; Maps SDK&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#475569;strokeWidth=1;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1305" y="400" width="240" height="75" as="geometry"/>
        </mxCell>


        <!-- Connectors between Columns -->
        <mxCell id="e_c1_c2" value="" style="edgeStyle=none;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="col1_bg" target="col2_bg"/>
        <mxCell id="e_c2_c3" value="" style="edgeStyle=none;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="col2_bg" target="col3_bg"/>
        <mxCell id="e_c3_c4" value="" style="edgeStyle=none;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="col3_bg" target="col4_bg"/>
        <mxCell id="e_c4_c5" value="" style="edgeStyle=none;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="col4_bg" target="col5_bg"/>


        <!-- ==================== FOOTER LEGEND ==================== -->
        <mxCell id="legend_box" value="&lt;table style=&quot;width:100%;font-size:9.5px;color:#334155;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td&gt;&lt;b style=&quot;color:#0F172A;&quot;&gt;Real-Time Streaming Fabric:&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🔵 &lt;b&gt;IoT Ingress Gateway&lt;/b&gt;&lt;/td&gt;&lt;td&gt;💠 &lt;b&gt;Pub/Sub Buffer&lt;/b&gt;&lt;/td&gt;&lt;td&gt;⚡ &lt;b&gt;Dataflow Stream Analytics&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🔍 &lt;b&gt;BigQuery Analytics Lake&lt;/b&gt;&lt;/td&gt;&lt;td&gt;📊 &lt;b&gt;Looker BI&lt;/b&gt;&lt;/td&gt;&lt;td&gt;✨ &lt;b style=&quot;color:#1D4ED8;&quot;&gt;Powered by Google Cloud Dataflow&lt;/b&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="30" y="850" width="1530" height="38" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
