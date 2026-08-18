export function buildSupplyChainXml(): string {
  return buildManufacturingOptimizationXml();
}

export function buildManufacturingOptimizationXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="ge_equipment_optimization_gemini" name="GE Equipment Optimization &amp; Gemini AI Agents (Manufacturing)">
    <mxGraphModel dx="1600" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="950" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- ==================== TOP TITLE BANNER & HEADER ==================== -->
        <mxCell id="main_title_box" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="16" width="860" height="54" as="geometry"/>
        </mxCell>
        <mxCell id="main_title" value="&lt;b style=&quot;font-size:18px;color:#0F172A;&quot;&gt;Enterprise Industrial AI &amp;amp; Predictive Maintenance Architecture (P4-MFG-L-01)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:12px;color:#475569;font-weight:600;&quot;&gt;Manufacturing Data Engine (MDE) • Gemini Multimodal Anomaly Detection • Closed-Loop PLC Control&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="45" y="18" width="830" height="50" as="geometry"/>
        </mxCell>


        <!-- ==================== LEFT SIDEBAR: SECURITY & GOVERNANCE ==================== -->
        <!-- x = 30 .. 160 (width = 130) -->
        <mxCell id="sidebar_sec_bg" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#94A3B8;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="85" width="130" height="740" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_sidebar_sec_title" value="&lt;b style=&quot;font-size:8.5px;color:#1E3A8A;&quot;&gt;🔒 SECURITY &amp;amp;&lt;br&gt;COMPLIANCE&lt;/b&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;align=center;verticalAlign=middle;color:#FFFFFF;" vertex="1" parent="1">
          <mxGeometry x="30" y="85" width="130" height="30" as="geometry"/>
        </mxCell>

        <!-- Sidebar Security Cards -->
        <mxCell id="side_card_iam" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:16px;color:#2563EB;&quot;&gt;👤&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;font-weight:bold;color:#0F172A;&quot;&gt;Cloud IAM&lt;br&gt;&lt;span style=&quot;font-size:6px;color:#475569;font-weight:normal;&quot;&gt;OT/IT RBAC&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;padding=1;" vertex="1" parent="1">
          <mxGeometry x="38" y="125" width="114" height="65" as="geometry"/>
        </mxCell>

        <mxCell id="side_card_vpc_sc" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:16px;color:#2563EB;&quot;&gt;💠&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;font-weight:bold;color:#0F172A;&quot;&gt;VPC Service&lt;br&gt;Controls&lt;br&gt;&lt;span style=&quot;font-size:6px;color:#475569;font-weight:normal;&quot;&gt;Zero-Trust DMZ&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;padding=1;" vertex="1" parent="1">
          <mxGeometry x="38" y="200" width="114" height="70" as="geometry"/>
        </mxCell>

        <mxCell id="side_card_mfg_std" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:16px;color:#2563EB;&quot;&gt;📋 🔒&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;font-weight:bold;color:#0F172A;&quot;&gt;Standards&lt;br&gt;&lt;span style=&quot;font-size:6px;color:#475569;font-weight:normal;&quot;&gt;IEC 62443&lt;br&gt;ISO 9001 / ISA-95&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;padding=1;" vertex="1" parent="1">
          <mxGeometry x="38" y="280" width="114" height="80" as="geometry"/>
        </mxCell>

        <mxCell id="side_card_kms_hsm" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:16px;color:#2563EB;&quot;&gt;🔑&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;font-weight:bold;color:#0F172A;&quot;&gt;Cloud KMS&lt;br&gt;&lt;span style=&quot;font-size:6px;color:#475569;font-weight:normal;&quot;&gt;Telemetry HSM Keys&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;padding=1;" vertex="1" parent="1">
          <mxGeometry x="38" y="370" width="114" height="65" as="geometry"/>
        </mxCell>

        <mxCell id="side_card_audit_logs" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:16px;color:#2563EB;&quot;&gt;📜 📡&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;font-weight:bold;color:#0F172A;&quot;&gt;Audit Logs&lt;br&gt;&lt;span style=&quot;font-size:6px;color:#475569;font-weight:normal;&quot;&gt;Chronicle SIEM&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;padding=1;" vertex="1" parent="1">
          <mxGeometry x="38" y="445" width="114" height="65" as="geometry"/>
        </mxCell>


        <!-- ==================== COLUMN 1: SHOP FLOOR & IOT ASSETS ==================== -->
        <!-- x = 180 .. 460 (width = 280) -->
        <mxCell id="col1_bg" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="180" y="85" width="280" height="740" as="geometry"/>
        </mxCell>
        <mxCell id="col1_hdr" value="&lt;b style=&quot;font-size:10px;color:#1E3A8A;&quot;&gt;🏭 SHOP FLOOR &amp;amp; INDUSTRIAL ASSETS&lt;/b&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;align=center;verticalAlign=middle;color:#FFFFFF;" vertex="1" parent="1">
          <mxGeometry x="180" y="85" width="280" height="30" as="geometry"/>
        </mxCell>

        <!-- Turbines -->
        <mxCell id="card_ge_turbines" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;💨 GE Gas &amp;amp; Wind Turbines&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#475569;&quot;&gt;10kHz High-Frequency Vibration &amp;amp; Thermal Telemetry&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="195" y="125" width="250" height="75" as="geometry"/>
        </mxCell>

        <!-- Visual Inspection Cameras -->
        <mxCell id="card_cameras_badge" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;📷 4K High-Speed Optical Inspection&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Infrared thermography &amp;amp; laser surface profile scans&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="195" y="210" width="250" height="75" as="geometry"/>
        </mxCell>

        <!-- CNC & Robotics -->
        <mxCell id="card_factory_machinery" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;🦾 6-Axis CNC &amp;amp; Assembly Robotics&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#475569;&quot;&gt;PLC / SCADA automated lines with Modbus/OPC-UA&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="195" y="295" width="250" height="75" as="geometry"/>
        </mxCell>

        <!-- Edge TPU -->
        <mxCell id="card_edge_tpu_rejector" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#1E40AF;&quot;&gt;⚡ Coral Edge TPU Micro-Controller&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#475569;&quot;&gt;&amp;lt; 1ms line-speed real-time defect ejection actuator&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#3B82F6;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="195" y="380" width="250" height="75" as="geometry"/>
        </mxCell>

        <!-- Closed Loop PLC Actuator Receiver -->
        <mxCell id="card_plc_actuator_target" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#166534;&quot;&gt;🔄 PLC / SCADA Automated Tuning Receiver&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Receives RPM &amp;amp; feed-rate setpoints from Gemini loop&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#86EFAC;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="195" y="465" width="250" height="75" as="geometry"/>
        </mxCell>


        <!-- ==================== COLUMN 2: DATA INGESTION & MANUFACTURING DATA ENGINE ==================== -->
        <!-- x = 480 .. 740 (width = 260) -->
        <mxCell id="col2_bg" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#86EFAC;strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="480" y="85" width="260" height="740" as="geometry"/>
        </mxCell>
        <mxCell id="col2_hdr" value="&lt;b style=&quot;font-size:10px;color:#166534;&quot;&gt;⚙️ MANUFACTURING DATA ENGINE (MDE)&lt;/b&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#16A34A;strokeColor=#15803D;strokeWidth=1;align=center;verticalAlign=middle;color:#FFFFFF;" vertex="1" parent="1">
          <mxGeometry x="480" y="85" width="260" height="30" as="geometry"/>
        </mxCell>

        <!-- Pub/Sub & Dataflow -->
        <mxCell id="card_pubsub_mfg" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#1E40AF;&quot;&gt;💠 Cloud Pub/Sub Telemetry Ingress&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;Millions messages/sec buffered IoT ingress&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="495" y="125" width="230" height="65" as="geometry"/>
        </mxCell>

        <mxCell id="card_dataflow_mfg" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#1E40AF;&quot;&gt;⚡ Dataflow Streaming Normalization&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;Sliding-window noise filtration &amp;amp; calibration&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="495" y="200" width="230" height="65" as="geometry"/>
        </mxCell>

        <!-- MDE Core Box -->
        <mxCell id="card_mde_engine" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11.5px;font-weight:bold;color:#166534;&quot;&gt;🏭 Manufacturing Data Engine (MDE)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#334155;line-height:1.3;padding-top:2px;&quot;&gt;• ISA-95 Asset Hierarchy Mapping&lt;br&gt;• Real-Time Overall Equipment Effectiveness (OEE)&lt;br&gt;• Sensor Calibration &amp;amp; Normalization Graph&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#22C55E;strokeWidth=1.5;align=left;verticalAlign=top;padding=4;" vertex="1" parent="1">
          <mxGeometry x="495" y="275" width="230" height="115" as="geometry"/>
        </mxCell>

        <!-- BigQuery Lakehouse -->
        <mxCell id="card_bq_mfg" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;🔍 BigQuery Industrial Lakehouse&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;Decade sensor history &amp;amp; digital twin telemetry&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="495" y="400" width="230" height="65" as="geometry"/>
        </mxCell>

        <!-- Feature Store -->
        <mxCell id="card_vertex_feat_store" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;⚡ Vertex AI Feature Store&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;Pre-computed vibration spectrum embeddings&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="495" y="475" width="230" height="65" as="geometry"/>
        </mxCell>


        <!-- ==================== COLUMN 3: VERTEX AI & GEMINI PLATFORM ==================== -->
        <!-- x = 760 .. 1120 (width = 360) -->
        <mxCell id="col3_bg" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#FEF3C7;strokeColor=#FDE68A;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="760" y="85" width="360" height="740" as="geometry"/>
        </mxCell>
        <mxCell id="col3_hdr" value="&lt;b style=&quot;font-size:10px;color:#92400E;&quot;&gt;🧠 VERTEX AI &amp;amp; GEMINI REASONING CORE&lt;/b&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#D97706;strokeColor=#B45309;strokeWidth=1;align=center;verticalAlign=middle;color:#FFFFFF;" vertex="1" parent="1">
          <mxGeometry x="760" y="85" width="360" height="30" as="geometry"/>
        </mxCell>

        <!-- Gemini Multimodal Anomaly Detection -->
        <mxCell id="box_anomaly_gemini" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#1E40AF;border-bottom:1px solid #BFDBFE;padding-bottom:2px;&quot;&gt;✨ Gemini Multimodal Anomaly Detection&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#334155;line-height:1.3;padding-top:4px;&quot;&gt;• Cross-fuzes 4K vision frames with 10kHz vibration signals&lt;br&gt;• Identifies micro-fractures, bearing friction &amp;amp; thermal hotspots&lt;br&gt;• Automated FMEA root-cause hypothesis generation&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.5;align=left;verticalAlign=top;padding=4;" vertex="1" parent="1">
          <mxGeometry x="775" y="125" width="330" height="115" as="geometry"/>
        </mxCell>

        <!-- Predictive Maintenance Reasoning Agent -->
        <mxCell id="box_pred_maint_gemini" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11.5px;font-weight:bold;color:#0F172A;&quot;&gt;⚙️ Predictive Maintenance Reasoning Agent&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#334155;line-height:1.3;padding-top:2px;&quot;&gt;• Remaining Useful Life (RUL) estimation curve&lt;br&gt;• Auto-calculates mean time to failure (MTBF/MTTF)&lt;br&gt;• Generates step-by-step repair runbooks for field technicians&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;padding=4;" vertex="1" parent="1">
          <mxGeometry x="775" y="250" width="330" height="105" as="geometry"/>
        </mxCell>

        <!-- Digital Twin PINN Sandbox -->
        <mxCell id="card_digital_twin_sim" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#1E40AF;&quot;&gt;🌐 Physics-Informed Digital Twin (PINN)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;Simulates stress aerodynamics &amp;amp; thermodynamics under load&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="775" y="365" width="330" height="65" as="geometry"/>
        </mxCell>

        <!-- Model Monitoring & Drift -->
        <mxCell id="card_vertex_drift_guard" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#166534;&quot;&gt;🔄 Continuous Model Monitoring &amp;amp; Retraining Loop&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;Self-healing automated pipeline updates on sensor drift&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#86EFAC;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="775" y="440" width="330" height="65" as="geometry"/>
        </mxCell>


        <!-- ==================== COLUMN 4: APPLICATION LAYER & BUSINESS ACTIONS ==================== -->
        <!-- x = 1140 .. 1545 (width = 405) -->
        <mxCell id="col4_bg" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#FFF1F2;strokeColor=#FECDD3;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1140" y="85" width="405" height="740" as="geometry"/>
        </mxCell>
        <mxCell id="col4_hdr" value="&lt;b style=&quot;font-size:10px;color:#9F1239;&quot;&gt;⚡ INDUSTRIAL ACTIONS &amp;amp; CLOSED-LOOP CONTROL&lt;/b&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#BE123C;strokeColor=#9F1239;strokeWidth=1;align=center;verticalAlign=middle;color:#FFFFFF;" vertex="1" parent="1">
          <mxGeometry x="1140" y="85" width="405" height="30" as="geometry"/>
        </mxCell>

        <!-- Looker BI Cockpit -->
        <mxCell id="card_looker_mfg" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#166534;&quot;&gt;📊 Looker Industrial OEE Cockpit&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;Real-time availability, performance, yield &amp;amp; risk heatmaps&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1155" y="125" width="375" height="65" as="geometry"/>
        </mxCell>

        <!-- 4 Action Buttons -->
        <mxCell id="btn_sched_maint" value="&lt;table style=&quot;width:100%;padding:2px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9.5px;font-weight:bold;color:#0F172A;&quot;&gt;🛠️ Schedule Maintenance (SAP PM / Maximo)&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=middle;padding=3;" vertex="1" parent="1">
          <mxGeometry x="1155" y="200" width="375" height="42" as="geometry"/>
        </mxCell>

        <mxCell id="btn_opt_speed" value="&lt;table style=&quot;width:100%;padding:2px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9.5px;font-weight:bold;color:#0F172A;&quot;&gt;⏱️ Push Optimal RPM / Feed Setpoint to PLC&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=middle;padding=3;" vertex="1" parent="1">
          <mxGeometry x="1155" y="250" width="375" height="42" as="geometry"/>
        </mxCell>

        <mxCell id="btn_order_parts" value="&lt;table style=&quot;width:100%;padding:2px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9.5px;font-weight:bold;color:#0F172A;&quot;&gt;💳 Automated ERP Parts Procurement&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=middle;padding=3;" vertex="1" parent="1">
          <mxGeometry x="1155" y="300" width="375" height="42" as="geometry"/>
        </mxCell>

        <mxCell id="btn_retrain_model" value="&lt;table style=&quot;width:100%;padding:2px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9.5px;font-weight:bold;color:#166534;&quot;&gt;🔄 Trigger Closed-Loop Fine-Tuning Retraining&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#86EFAC;strokeWidth=1.2;align=left;verticalAlign=middle;padding=3;" vertex="1" parent="1">
          <mxGeometry x="1155" y="350" width="375" height="42" as="geometry"/>
        </mxCell>

        <!-- Emergency Stop Interlock -->
        <mxCell id="card_emergency_stop_siren" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#991B1B;&quot;&gt;🚨 Autonomous E-Stop &amp;amp; Safety Interlock&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;Halts machinery within 15ms upon critical thermal runaway&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF2F2;strokeColor=#F87171;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1155" y="405" width="375" height="65" as="geometry"/>
        </mxCell>

        <!-- AR Field Tech Dispatch -->
        <mxCell id="card_field_tech_fcm" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;📱 FCM Real-Time AR Field Technician Dispatch&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;Interactive 3D repair guidance pushed directly to rugged tablets&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1155" y="480" width="375" height="65" as="geometry"/>
        </mxCell>


        <!-- Connectors between Columns -->
        <mxCell id="e_c1_c2" value="" style="edgeStyle=none;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="col1_bg" target="col2_bg"/>
        <mxCell id="e_c2_c3" value="" style="edgeStyle=none;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="col2_bg" target="col3_bg"/>
        <mxCell id="e_c3_c4" value="" style="edgeStyle=none;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="col3_bg" target="col4_bg"/>


        <!-- ==================== FOOTER LEGEND ==================== -->
        <mxCell id="legend_box" value="&lt;table style=&quot;width:100%;font-size:9.5px;color:#334155;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td&gt;&lt;b style=&quot;color:#0F172A;&quot;&gt;Industrial AI Mesh:&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🏭 &lt;b&gt;Shop Floor IoT Ingest&lt;/b&gt;&lt;/td&gt;&lt;td&gt;⚙️ &lt;b&gt;Manufacturing Data Engine&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🧠 &lt;b&gt;Gemini Multimodal Reasoner&lt;/b&gt;&lt;/td&gt;&lt;td&gt;⚡ &lt;b&gt;Closed-Loop PLC Control&lt;/b&gt;&lt;/td&gt;&lt;td&gt;✨ &lt;b style=&quot;color:#1D4ED8;&quot;&gt;Enterprise Manufacturing Standard&lt;/b&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="30" y="850" width="1530" height="38" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
