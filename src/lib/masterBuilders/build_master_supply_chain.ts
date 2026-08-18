export function buildSupplyChainXml(): string {
  return buildManufacturingOptimizationXml();
}

export function buildManufacturingOptimizationXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="industrial_fleet_optimization_gemini" name="Industrial Equipment Fleet Optimization &amp; Gemini AI Agents">
    <mxGraphModel dx="1600" dy="720" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="720" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- ==================== TOP TITLE BANNER & HEADER ==================== -->
        <mxCell id="top_cloud_logo" value="&lt;span style=&quot;font-size:26px;&quot;&gt;🏭&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="6" width="35" height="35" as="geometry"/>
        </mxCell>
        <mxCell id="main_title" value="&lt;b style=&quot;font-size:18px;color:#0F172A;letter-spacing:-0.2px;&quot;&gt;ENTERPRISE INDUSTRIAL AI: FLEET EQUIPMENT OPTIMIZATION &amp;amp; GEMINI MULTI-AGENT ARCHITECTURE&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="65" y="6" width="1100" height="24" as="geometry"/>
        </mxCell>
        <mxCell id="main_subtitle" value="&lt;span style=&quot;font-size:10.5px;color:#475569;font-weight:600;&quot;&gt;Manufacturing Data Engine (MDE), Multimodal Sensor Fusing, Predictive Maintenance, ISA-95 Plant Model &amp;amp; Autonomous Closed-Loop Control&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="65" y="28" width="1100" height="18" as="geometry"/>
        </mxCell>

        <!-- Top Right Gemini Platform Logo -->
        <mxCell id="top_gemini_brand" value="&lt;b style=&quot;font-size:18px;color:#2563EB;&quot;&gt;✨ Gemini&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Industrial Core&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1440" y="6" width="130" height="38" as="geometry"/>
        </mxCell>

        <!-- ==================== LEFT SIDEBAR: SECURITY & GOVERNANCE ==================== -->
        <mxCell id="sidebar_sec_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#94A3B8;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="20" y="52" width="110" height="600" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_sidebar_sec_title" value="&lt;b style=&quot;font-size:7px;color:#334155;letter-spacing:0.3px;&quot;&gt;SECURITY &amp;amp; GOVERNANCE&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="22" y="56" width="106" height="15" as="geometry"/>
        </mxCell>

        <mxCell id="side_card_iam" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:14px;color:#2563EB;&quot;&gt;👤&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;font-weight:bold;color:#0F172A;&quot;&gt;IAM / RBAC&lt;br&gt;&lt;span style=&quot;font-size:5.5px;color:#475569;&quot;&gt;OT/IT Role Access&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;padding=1;" vertex="1" parent="1">
          <mxGeometry x="25" y="76" width="100" height="52" as="geometry"/>
        </mxCell>

        <mxCell id="side_card_vpc_sc" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:14px;color:#2563EB;&quot;&gt;💠&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;font-weight:bold;color:#0F172A;&quot;&gt;VPC SERVICE CONTROLS&lt;br&gt;&lt;span style=&quot;font-size:5.5px;color:#475569;&quot;&gt;Zero-Trust Perimeter&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;padding=1;" vertex="1" parent="1">
          <mxGeometry x="25" y="136" width="100" height="56" as="geometry"/>
        </mxCell>

        <mxCell id="side_card_scc" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:14px;color:#2563EB;&quot;&gt;🛡️&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;font-weight:bold;color:#0F172A;&quot;&gt;SECURITY COMMAND CENTER&lt;br&gt;&lt;span style=&quot;font-size:5.5px;color:#475569;&quot;&gt;OT Threat Shield&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;padding=1;" vertex="1" parent="1">
          <mxGeometry x="25" y="200" width="100" height="56" as="geometry"/>
        </mxCell>

        <mxCell id="side_card_mfg_std" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:14px;color:#2563EB;&quot;&gt;📋 🔒&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;font-weight:bold;color:#0F172A;&quot;&gt;COMPLIANCE&lt;br&gt;&lt;span style=&quot;font-size:5.5px;color:#475569;&quot;&gt;ISO 9001 / IEC 62443&lt;br&gt;OSHA &amp;amp; ISA-95&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;padding=1;" vertex="1" parent="1">
          <mxGeometry x="25" y="264" width="100" height="66" as="geometry"/>
        </mxCell>

        <mxCell id="side_card_kms_hsm" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:14px;color:#2563EB;&quot;&gt;🔑&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;font-weight:bold;color:#0F172A;&quot;&gt;Cloud KMS HSM&lt;br&gt;&lt;span style=&quot;font-size:5.5px;color:#475569;&quot;&gt;Hardware Keys&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="shape=hexagon;perimeter=hexagonPerimeter2;whiteSpace=wrap;html=1;fixedSize=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;padding=1;" vertex="1" parent="1">
          <mxGeometry x="25" y="340" width="100" height="56" as="geometry"/>
        </mxCell>

        <mxCell id="side_card_audit_logs" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:14px;color:#2563EB;&quot;&gt;📜 📡&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;font-weight:bold;color:#0F172A;&quot;&gt;Cloud Audit Logs&lt;br&gt;&lt;span style=&quot;font-size:5.5px;color:#475569;&quot;&gt;Chronicle SIEM&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;padding=1;" vertex="1" parent="1">
          <mxGeometry x="25" y="406" width="100" height="52" as="geometry"/>
        </mxCell>

        <!-- ==================== MAIN PLATFORM CONTAINER ==================== -->
        <mxCell id="gcp_main_container" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="140" y="52" width="1440" height="600" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_gcp_title" value="&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;☁️ Google Cloud Industrial AI &amp;amp; Multi-Agent Foundation Platform&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="150" y="56" width="450" height="18" as="geometry"/>
        </mxCell>

        <!-- ==================== COLUMN 1: SHOP FLOOR & EDGE ASSETS ==================== -->
        <mxCell id="col1_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="150" y="78" width="270" height="560" as="geometry"/>
        </mxCell>
        <mxCell id="col1_hdr" value="&lt;b style=&quot;font-size:9px;color:#1E3A8A;&quot;&gt;SHOP FLOOR &amp;amp; EDGE INDUSTRIAL ASSETS&lt;br&gt;&lt;span style=&quot;font-size:7px;color:#475569;&quot;&gt;(HEAVY EQUIPMENT &amp;amp; SENSORY CAPTURE)&lt;/span&gt;&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="155" y="81" width="260" height="25" as="geometry"/>
        </mxCell>

        <!-- Heavy Turbines & Industrial Equipment -->
        <mxCell id="card_turbines" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:20px;&quot;&gt;💨 ⚙️ 🦾&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;font-weight:bold;color:#0F172A;&quot;&gt;Industrial Fleet Turbines &amp;amp; Heavy Assets&lt;br&gt;&lt;span style=&quot;font-size:5.5px;color:#475569;font-weight:normal;&quot;&gt;Wind Turbines, Generators, Multi-Axis CNC Lathes&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="158" y="110" width="254" height="62" as="geometry"/>
        </mxCell>

        <!-- 10kHz Sensors Badge -->
        <mxCell id="card_sensors_badge" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:16px;&quot;&gt;📶 ⚡ 🔬&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;font-weight:bold;color:#0F172A;&quot;&gt;High-Frequency Sensory Telemetry&lt;br&gt;&lt;span style=&quot;font-size:5.5px;color:#475569;&quot;&gt;10kHz Piezo Vibration, Acoustic, Thermal &amp;amp; Pressure&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#3B82F6;strokeWidth=1;align=center;verticalAlign=middle;padding=1;" vertex="1" parent="1">
          <mxGeometry x="158" y="180" width="254" height="52" as="geometry"/>
        </mxCell>

        <!-- Visual Inspection Cameras -->
        <mxCell id="card_cameras_badge" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:18px;&quot;&gt;📷 📹 🔬&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;font-weight:bold;color:#0F172A;&quot;&gt;Visual Inspection Stream (4K Cameras)&lt;br&gt;&lt;span style=&quot;font-size:5.5px;color:#475569;&quot;&gt;High-Speed Optical, Infrared Thermography &amp;amp; Profile Scanners&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1;align=center;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="158" y="240" width="254" height="54" as="geometry"/>
        </mxCell>

        <!-- Edge Gateway Normalizer -->
        <mxCell id="card_opcua_bridge" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:16px;&quot;&gt;🔌 📡 🎛️&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;font-weight:bold;color:#0F172A;&quot;&gt;Industrial Edge Protocol Normalizer&lt;br&gt;&lt;span style=&quot;font-size:5.5px;color:#475569;&quot;&gt;OPC-UA / Modbus TCP / Siemens S7 / MQTT Sparkplug B&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="shape=mxgraph.flowchart.direct_data;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#BFDBFE;strokeWidth=1;align=center;verticalAlign=middle;padding=1;" vertex="1" parent="1">
          <mxGeometry x="158" y="304" width="254" height="54" as="geometry"/>
        </mxCell>

        <!-- Coral Edge TPU Micro-Controller -->
        <mxCell id="card_edge_tpu_rejector" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:16px;color:#2563EB;&quot;&gt;⚡ 🛡️&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;font-weight:bold;color:#0F172A;&quot;&gt;Coral Edge TPU Micro-Inference&lt;br&gt;&lt;span style=&quot;font-size:5.5px;color:#475569;&quot;&gt;&amp;lt;1ms Real-Time Defect Ejection at Line Speed&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="shape=hexagon;perimeter=hexagonPerimeter2;whiteSpace=wrap;html=1;fixedSize=1;fillColor=#DBEAFE;strokeColor=#3B82F6;strokeWidth=1;align=center;verticalAlign=middle;padding=1;" vertex="1" parent="1">
          <mxGeometry x="158" y="370" width="254" height="60" as="geometry"/>
        </mxCell>

        <!-- PLC / SCADA Automated Tuning Receiver -->
        <mxCell id="card_plc_actuator_target" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:16px;color:#166534;&quot;&gt;🔄 ⚙️&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;font-weight:bold;color:#166534;&quot;&gt;PLC / SCADA Automated Tuning Receiver&lt;br&gt;&lt;span style=&quot;font-size:5.5px;color:#475569;&quot;&gt;Receives RPM, Feed-rate &amp;amp; Temperature Setpoints from Gemini Closed Loop&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#86EFAC;strokeWidth=1.2;align=center;verticalAlign=middle;padding=1;" vertex="1" parent="1">
          <mxGeometry x="158" y="442" width="254" height="64" as="geometry"/>
        </mxCell>

        <!-- ==================== COLUMN 2: DATA INGESTION & MDE LAKEHOUSE ==================== -->
        <mxCell id="col2_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#86EFAC;strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="435" y="78" width="260" height="560" as="geometry"/>
        </mxCell>
        <mxCell id="col2_hdr" value="&lt;b style=&quot;font-size:9px;color:#166534;&quot;&gt;INGESTION &amp;amp; MANUFACTURING DATA ENGINE (MDE)&lt;br&gt;&lt;span style=&quot;font-size:7px;color:#475569;&quot;&gt;(ISA-95 UNIFIED INDUSTRIAL LAKEHOUSE)&lt;/span&gt;&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="440" y="81" width="250" height="25" as="geometry"/>
        </mxCell>

        <!-- Pub/Sub Pipeline Shape -->
        <mxCell id="card_pubsub_mfg" value="&lt;b style=&quot;font-size:7.5px;color:#0F172A;&quot;&gt;Pub/Sub Telemetry Bus&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:6px;color:#475569;&quot;&gt;MQTT / Sparkplug B Broker&lt;/span&gt;" style="shape=mxgraph.flowchart.direct_data;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="445" y="110" width="240" height="48" as="geometry"/>
        </mxCell>

        <!-- Streaming ETL Dataflow -->
        <mxCell id="card_dataflow_mfg" value="&lt;b style=&quot;font-size:7.5px;color:#0F172A;&quot;&gt;Streaming ETL (Dataflow)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:6px;color:#475569;&quot;&gt;Sliding-Window Aggregation &amp;amp; Outlier Filter&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="445" y="166" width="240" height="48" as="geometry"/>
        </mxCell>

        <!-- BigQuery MDE Cylinder -->
        <mxCell id="card_bq_mfg" value="&lt;b style=&quot;font-size:8px;color:#0F172A;&quot;&gt;BigQuery MDE Lakehouse&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:6px;color:#475569;&quot;&gt;ISA-95 Plant Model, Golden Telemetry Records&lt;/span&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=6;fillColor=#DCFCE7;strokeColor=#22C55E;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="445" y="222" width="240" height="66" as="geometry"/>
        </mxCell>

        <!-- Cloud Storage Vault Cylinder -->
        <mxCell id="card_gcs_raw_vault" value="&lt;b style=&quot;font-size:7.5px;color:#0F172A;&quot;&gt;Cloud Storage Vault (GCS)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:6px;color:#475569;&quot;&gt;10-Year High-Frequency Waveform &amp;amp; 4K Video Archive&lt;/span&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=5;fillColor=#DBEAFE;strokeColor=#3B82F6;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="445" y="298" width="240" height="58" as="geometry"/>
        </mxCell>

        <!-- Dataplex Governance -->
        <mxCell id="card_dataplex_mfg" value="&lt;b style=&quot;font-size:7.5px;color:#0F172A;&quot;&gt;Dataplex Industrial Fabric&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:6px;color:#475569;&quot;&gt;Sensor Schema Drift Guard &amp;amp; Lineage Audit&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="445" y="366" width="240" height="48" as="geometry"/>
        </mxCell>

        <!-- Vertex AI Feature Store Cylinder -->
        <mxCell id="card_vertex_feat_store" value="&lt;b style=&quot;font-size:7.5px;color:#0F172A;&quot;&gt;Vertex AI Feature Store&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:6px;color:#475569;&quot;&gt;Pre-computed Machine Health Features &amp;amp; Embeddings&lt;/span&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=5;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="445" y="424" width="240" height="58" as="geometry"/>
        </mxCell>

        <!-- ==================== COLUMN 3: VERTEX AI & GEMINI CORE ==================== -->
        <mxCell id="col3_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#FEF3C7;strokeColor=#FDE68A;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="710" y="78" width="410" height="560" as="geometry"/>
        </mxCell>
        <mxCell id="col3_hdr" value="&lt;b style=&quot;font-size:9px;color:#92400E;&quot;&gt;VERTEX AI &amp;amp; GEMINI REASONING CORE&lt;br&gt;&lt;span style=&quot;font-size:7px;color:#475569;&quot;&gt;(MULTIMODAL ANOMALY DETECTION &amp;amp; PREDICTIVE MAINTENANCE)&lt;/span&gt;&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="715" y="81" width="400" height="25" as="geometry"/>
        </mxCell>

        <!-- Multimodal Anomaly Model Card -->
        <mxCell id="box_anomaly_gemini" value="&lt;b style=&quot;font-size:8px;color:#0F172A;&quot;&gt;✨ Gemini Multimodal Anomaly Detector&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:6.5px;color:#1E3A8A;&quot;&gt;📷 Optical Video + ⚡ 10kHz Vibration + 🌡️ Infrared Fusing&lt;/span&gt;&lt;br&gt;&lt;span style=&quot;font-size:5.5px;color:#475569;&quot;&gt;Micro-cracks, Bearing Heat, Friction Spikes &amp;amp; Cavitation&lt;/span&gt;" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="720" y="110" width="390" height="66" as="geometry"/>
        </mxCell>

        <!-- Agentic Orchestrator Card -->
        <mxCell id="card_agentic_orch" value="&lt;b style=&quot;font-size:8px;color:#92400E;&quot;&gt;🔶 Multi-Agent Orchestrator &amp;amp; Dispatcher&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:6px;color:#475569;&quot;&gt;Vertex AI Reasoning Engine / Autonomous Task Routing&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFBEB;strokeColor=#F59E0B;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="720" y="186" width="390" height="52" as="geometry"/>
        </mxCell>

        <!-- Predictive Maintenance Reasoning Agent -->
        <mxCell id="box_pred_maint_gemini" value="&lt;b style=&quot;font-size:8px;color:#0F172A;&quot;&gt;⚙️ Gemini Predictive Maintenance Agent&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:6.5px;color:#166534;&quot;&gt;Remaining Useful Life (RUL) &amp;amp; FMEA Root Cause Engine&lt;/span&gt;&lt;br&gt;&lt;span style=&quot;font-size:5.5px;color:#475569;&quot;&gt;Proactive Part Ordering &amp;amp; Mean Time To Failure (MTTF) Calculation&lt;/span&gt;" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#22C55E;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="720" y="248" width="390" height="66" as="geometry"/>
        </mxCell>

        <!-- Physics-Informed Digital Twin -->
        <mxCell id="card_digital_twin_sim" value="&lt;b style=&quot;font-size:7.5px;color:#0F172A;&quot;&gt;🌐 Physics-Informed Digital Twin (PINN Sandbox)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:6px;color:#475569;&quot;&gt;Simulates Turbine Blade Stress, Thermal Boundary Wear &amp;amp; Aerodynamic Load&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="720" y="324" width="390" height="52" as="geometry"/>
        </mxCell>

        <!-- Vertex Model Monitoring Loop -->
        <mxCell id="card_vertex_drift_guard" value="&lt;b style=&quot;font-size:7.5px;color:#166534;&quot;&gt;📈 Vertex AI Model Monitoring &amp;amp; Drift Guard&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:6px;color:#475569;&quot;&gt;Sensor Calibration Drift Detection &amp;amp; Self-Healing Retraining&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#86EFAC;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="720" y="386" width="390" height="50" as="geometry"/>
        </mxCell>

        <!-- Edge Compiler -->
        <mxCell id="card_tflite_edge_compiler" value="&lt;b style=&quot;font-size:7.5px;color:#0F172A;&quot;&gt;📦 Edge Compiler (TensorRT / TFLite)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:6px;color:#475569;&quot;&gt;Compiles fine-tuned vision models for Shop Floor Coral Edge TPUs&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="720" y="446" width="390" height="48" as="geometry"/>
        </mxCell>

        <!-- ==================== COLUMN 4: OPERATIONS COCKPIT & ACTIONS ==================== -->
        <mxCell id="col4_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#FFF1F2;strokeColor=#FECDD3;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1135" y="78" width="435" height="560" as="geometry"/>
        </mxCell>
        <mxCell id="col4_hdr" value="&lt;b style=&quot;font-size:9px;color:#9F1239;&quot;&gt;OPERATIONS COCKPIT &amp;amp; CLOSED-LOOP ACTION HUB&lt;br&gt;&lt;span style=&quot;font-size:7px;color:#475569;&quot;&gt;(CMMS DISPATCH, SAFETY INTERLOCKS &amp;amp; CLOSED-LOOP CONTROL)&lt;/span&gt;&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1140" y="81" width="425" height="25" as="geometry"/>
        </mxCell>

        <!-- Looker BI Cockpit -->
        <mxCell id="card_looker_mfg" value="&lt;b style=&quot;font-size:8px;color:#0F172A;&quot;&gt;📊 Looker BI Real-Time Industrial Cockpit&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:6px;color:#334155;&quot;&gt;• Plant OEE (Availability, Yield, Quality) &amp;nbsp;|&amp;nbsp; • MTTF / RUL Risk Gauges &amp;nbsp;|&amp;nbsp; • Real-time Anomaly Heatmaps&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#22C55E;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1145" y="110" width="415" height="56" as="geometry"/>
        </mxCell>

        <!-- Actionable Buttons Row -->
        <mxCell id="btn_sched_maint" value="&lt;b style=&quot;font-size:6.5px;color:#0F172A;&quot;&gt;🛠️ SCHEDULE PM&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:5px;color:#475569;&quot;&gt;Auto SAP PM Order&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1145" y="174" width="100" height="42" as="geometry"/>
        </mxCell>
        <mxCell id="btn_opt_speed" value="&lt;b style=&quot;font-size:6.5px;color:#0F172A;&quot;&gt;⏱️ OPTIMIZE RPM&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:5px;color:#475569;&quot;&gt;Push Setpoints to PLC&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1250" y="174" width="100" height="42" as="geometry"/>
        </mxCell>
        <mxCell id="btn_order_parts" value="&lt;b style=&quot;font-size:6.5px;color:#0F172A;&quot;&gt;💳 ORDER PARTS&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:5px;color:#475569;&quot;&gt;Auto ERP Procurement&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1355" y="174" width="100" height="42" as="geometry"/>
        </mxCell>
        <mxCell id="btn_retrain_model" value="&lt;b style=&quot;font-size:6.5px;color:#166534;&quot;&gt;🔄 CLOSED-LOOP&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:5px;color:#475569;&quot;&gt;Retrain &amp;amp; Tune PLC&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#86EFAC;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1460" y="174" width="100" height="42" as="geometry"/>
        </mxCell>

        <!-- SAP / IBM Maximo Connector -->
        <mxCell id="card_cmms_sap_bridge" value="&lt;b style=&quot;font-size:7.5px;color:#0F172A;&quot;&gt;🏛️ SAP S/4HANA &amp;amp; IBM Maximo CMMS Connector&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:5.5px;color:#475569;&quot;&gt;Automated Work Orders, Part Inventories &amp;amp; Field Technician Shift Rosters&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1145" y="226" width="415" height="46" as="geometry"/>
        </mxCell>

        <!-- Cloud Run Dispatcher -->
        <mxCell id="card_cloud_run_industrial_acts" value="&lt;b style=&quot;font-size:7.5px;color:#0F172A;&quot;&gt;🏃 Cloud Run Microservices &amp;amp; Eventarc Dispatcher&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:5.5px;color:#475569;&quot;&gt;Asynchronous Pub/Sub Event Handlers for Fast Machine Actions&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#3B82F6;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1145" y="280" width="415" height="46" as="geometry"/>
        </mxCell>

        <!-- Safety Interlock & E-Stop -->
        <mxCell id="card_emergency_stop_siren" value="&lt;b style=&quot;font-size:7.5px;color:#DC2626;&quot;&gt;🚨 Autonomous Safety Interlock &amp;amp; E-Stop Trigger&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:5.5px;color:#475569;&quot;&gt;Halts Line Conveyor within 15ms upon Critical Anomaly Detection&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF2F2;strokeColor=#F87171;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1145" y="334" width="415" height="46" as="geometry"/>
        </mxCell>

        <!-- Firebase Mobile Dispatch -->
        <mxCell id="card_field_tech_fcm" value="&lt;b style=&quot;font-size:7.5px;color:#0F172A;&quot;&gt;📱 Firebase Cloud Messaging (FCM) Field Technician Dispatch&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:5.5px;color:#475569;&quot;&gt;Sends Real-Time AR Maintenance Guides to Field Technicians' Tablets&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1145" y="388" width="415" height="46" as="geometry"/>
        </mxCell>

        <!-- Compliance Archive -->
        <mxCell id="card_compliance_archive_mfg" value="&lt;b style=&quot;font-size:7.5px;color:#0F172A;&quot;&gt;📜 Immutable Quality Audit Vault (Cloud Storage Bucket Lock)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:5.5px;color:#475569;&quot;&gt;Tamper-Proof FAA / FDA / ISO Calibration Records for Every Serial Number&lt;/span&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=4;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1145" y="442" width="415" height="52" as="geometry"/>
        </mxCell>

        <!-- ==================== NUMBERED PROTOCOL CONNECTORS ==================== -->
        <!-- [1] Col 1 OPC-UA Normalizer -> Col 2 Pub/Sub Telemetry Bus -->
        <mxCell id="e_col1_to_col2" value="&lt;b style=&quot;font-size:7px;color:#2563EB;&quot;&gt;[1] OPC-UA / MQTT :8883&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="412" y="331" as="sourcePoint"/>
            <mxPoint x="445" y="134" as="targetPoint"/>
            <Array as="points">
              <mxPoint x="428" y="331"/>
              <mxPoint x="428" y="134"/>
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- [2] Col 2 Pub/Sub -> Dataflow -> BigQuery MDE -->
        <mxCell id="e_pubsub_to_df" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#166534;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1" source="card_pubsub_mfg" target="card_dataflow_mfg">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="e_df_to_bq" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#166534;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1" source="card_dataflow_mfg" target="card_bq_mfg">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- [3] Col 2 BigQuery MDE -> Col 3 Multimodal Gemini -->
        <mxCell id="e_col2_to_col3" value="&lt;b style=&quot;font-size:7px;color:#166534;&quot;&gt;[3] ISA-95 Golden Record Ingest&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#166534;strokeWidth=1.5;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="685" y="255" as="sourcePoint"/>
            <mxPoint x="720" y="143" as="targetPoint"/>
            <Array as="points">
              <mxPoint x="702" y="255"/>
              <mxPoint x="702" y="143"/>
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- [4] Col 3 Gemini Reasoning -> Col 4 Cockpit Actions -->
        <mxCell id="e_col3_to_col4" value="&lt;b style=&quot;font-size:7px;color:#92400E;&quot;&gt;[4] Action Dispatch &amp;amp; SAP PM&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#92400E;strokeWidth=1.5;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="1110" y="212" as="sourcePoint"/>
            <mxPoint x="1145" y="249" as="targetPoint"/>
            <Array as="points">
              <mxPoint x="1127" y="212"/>
              <mxPoint x="1127" y="249"/>
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- [5] Closed Loop Re-Train Line from Col 4 to Col 1 PLC Receiver -->
        <mxCell id="e_retrain_loop" value="&lt;b style=&quot;font-size:7px;color:#166534;&quot;&gt;[5] Closed-Loop Retrain &amp;amp; PLC Tuning Setpoint Feedback&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#166534;strokeWidth=2;endArrow=classic;dashed=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#86EFAC;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="1510" y="216" as="sourcePoint"/>
            <mxPoint x="412" y="474" as="targetPoint"/>
            <Array as="points">
              <mxPoint x="1510" y="525"/>
              <mxPoint x="425" y="525"/>
              <mxPoint x="425" y="474"/>
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- ==================== BOTTOM FOOTER LEGEND ==================== -->
        <mxCell id="bar_btm_bg" value="&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;&lt;b&gt;Industrial Legend:&lt;/b&gt; 🏭 Shop Floor Assets &amp;nbsp;|&amp;nbsp; 🗄️ Cylinder Databases (BigQuery/GCS/Feature Store) &amp;nbsp;|&amp;nbsp; ⚡ Hexagon TPU Inference &amp;nbsp;|&amp;nbsp; ✨ Gemini Multi-Agent Core &amp;nbsp;|&amp;nbsp; ── [1]-[4] Dataflow Vectors &amp;nbsp;|&amp;nbsp; - - [5] Closed-Loop Control&lt;/span&gt;" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="20" y="660" width="1560" height="34" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
