export function buildSupplyChainXml(): string {
  return buildManufacturingOptimizationXml();
}

export function buildManufacturingOptimizationXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="industrial_fleet_optimization_gemini" name="Google Cloud Industry 4.0: Smart Factory IoT &amp; Predictive Maintenance Architecture (IND-MFG-02)">
    <mxGraphModel dx="1600" dy="920" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="860" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- ==================== HEADER BANNER ==================== -->
        <mxCell id="top_logo" value="&lt;span style=&quot;font-size:24px;&quot;&gt;🏭&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="10" width="35" height="35" as="geometry"/>
        </mxCell>
        <mxCell id="main_title" value="&lt;b style=&quot;font-size:16.5px;color:#0F172A;letter-spacing:-0.2px;&quot;&gt;GOOGLE CLOUD INDUSTRY 4.0: SMART FACTORY IoT &amp;amp; PREDICTIVE MAINTENANCE ARCHITECTURE&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="65" y="10" width="1050" height="22" as="geometry"/>
        </mxCell>
        <mxCell id="main_subtitle" value="&lt;span style=&quot;font-size:9px;color:#475569;font-weight:700;letter-spacing:0.1px;&quot;&gt;GDC Edge Gateway, MQTT/OPC-UA, Cloud Dataflow Streaming, Bigtable Time Series, Vertex AI Multimodal Anomaly &amp;amp; Looker OEE Cockpit&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="65" y="32" width="1050" height="16" as="geometry"/>
        </mxCell>
        
        <!-- Design Directive Badge -->
        <mxCell id="badge_design_directive" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;font-weight:bold;color:#1E40AF;&quot;&gt;⚙️ Design Directive: REFACTOR &amp;amp; REFINE&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;color:#64748B;&quot;&gt;Detailed, accurate, relevant, and polished.&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=16;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1140" y="8" width="225" height="42" as="geometry"/>
        </mxCell>

        <!-- Gemini 3.7 Flash Badge -->
        <mxCell id="top_gemini_badge" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12.5px;font-weight:bold;color:#38BDF8;&quot;&gt;✨ Gemini 3.7 Flash&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#94A3B8;font-weight:600;&quot;&gt;Industrial AI Engine&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=20;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#1E293B;strokeWidth=1.5;align=center;verticalAlign=middle;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="1380" y="8" width="195" height="42" as="geometry"/>
        </mxCell>


        <!-- ==================== COLUMN 1: FACTORY FLOOR & SCADA INGRESS ==================== -->
        <mxCell id="col1_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#FFFBEB;strokeColor=#F59E0B;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="25" y="60" width="360" height="715" as="geometry"/>
        </mxCell>
        <mxCell id="col1_title" value="&lt;b style=&quot;font-size:10.5px;color:#B45309;&quot;&gt;🏭 Factory Floor &amp;amp; SCADA Ingress&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="35" y="64" width="340" height="20" as="geometry"/>
        </mxCell>

        <!-- 1.1 Industrial Sensors & PLCs -->
        <mxCell id="card_industrial_sensors" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;&quot;&gt;📡 Industrial Sensors &amp;amp; PLCs&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:2px;&quot;&gt;• Siemens S7 | Allen-Bradley PLCs&lt;br&gt;• 15kHz Vibration, Thermal &amp;amp; Acoustic Probes&lt;br&gt;• High-Speed Optical Vision Cameras&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="35" y="88" width="340" height="135" as="geometry"/>
        </mxCell>

        <!-- 1.2 Google Distributed Cloud (GDC) Edge -->
        <mxCell id="card_gdc_edge_mfg" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;&quot;&gt;☁️ Google Distributed Cloud (GDC) Edge&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:2px;&quot;&gt;• GDC Edge Scaler, MQTT Protocol Gateway&lt;br&gt;• Sub-Millisecond Local Telemetry Ingestion&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="35" y="245" width="340" height="120" as="geometry"/>
        </mxCell>

        <!-- 1.3 Edge TPU Micro Inference -->
        <mxCell id="card_edge_tpu" value="&lt;table style=&quot;width:100%;text-align:center;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#B45309;&quot;&gt;⚡ Edge TPU Micro Inference&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:2px;&quot;&gt;• Edge TPU Micro Model Inference Engine&lt;br&gt;• Under 1ms Vibration FFT &amp;amp; Alert Safety Triggers&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="shape=hexagon;perimeter=hexagonPerimeter2;whiteSpace=wrap;html=1;fixedSize=1;fillColor=#FEF3C7;strokeColor=#D97706;strokeWidth=1.5;align=center;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="35" y="385" width="340" height="115" as="geometry"/>
        </mxCell>

        <!-- 1.4 Local Edge Buffer & Historian -->
        <mxCell id="card_local_buffer" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;&quot;&gt;🗄️ Local Edge Buffer &amp;amp; Historian&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:2px;&quot;&gt;• 72-Hour Offline Network Resilience Store&lt;br&gt;• Lossless Ingestion upon Cloud WAN Restoration&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=6;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="35" y="525" width="340" height="235" as="geometry"/>
        </mxCell>

        <!-- Column 1 Internal Connectors -->
        <mxCell id="edge_sens_to_gdc" value="&lt;b style=&quot;font-size:6.5px;color:#B45309;&quot;&gt;[1] OPC-UA / MQTT&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#D97706;strokeWidth=1.2;html=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;labelBackgroundColor=#FFFFFF;labelBorderColor=#FDE68A;padding=1;" edge="1" parent="1" source="card_industrial_sensors" target="card_gdc_edge_mfg">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_gdc_to_tpu" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#D97706;strokeWidth=1.2;html=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="card_gdc_edge_mfg" target="card_edge_tpu">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_tpu_to_buffer" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#D97706;strokeWidth=1.2;html=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="card_edge_tpu" target="card_local_buffer">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>


        <!-- ==================== COLUMN 2: CLOUD STREAMING & TIME-SERIES ==================== -->
        <mxCell id="col2_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="405" y="60" width="365" height="715" as="geometry"/>
        </mxCell>
        <mxCell id="col2_title" value="&lt;b style=&quot;font-size:10.5px;color:#1D4ED8;&quot;&gt;☁️ Cloud Streaming &amp;amp; Time-Series&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="415" y="64" width="345" height="20" as="geometry"/>
        </mxCell>

        <!-- 2.1 Cloud Pub/Sub IIoT Topics -->
        <mxCell id="card_pubsub_mfg" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;&quot;&gt;📡 Cloud Pub/Sub IIoT Topics&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:2px;&quot;&gt;• 500K+ Sensor Connections, Ingestion Hub&lt;br&gt;• Partitioned by Factory ID &amp;amp; Machine SKU&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="415" y="88" width="345" height="135" as="geometry"/>
        </mxCell>

        <!-- 2.2 Cloud Dataflow (Manufacturing Data Engine) -->
        <mxCell id="card_dataflow_mfg" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;&quot;&gt;⚡ Cloud Dataflow (Manufacturing Data Engine)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:2px;&quot;&gt;• Real-time High-Throughput Windowing Aggregate &amp;amp; Filter&lt;br&gt;• ISA-95 Telemetry Normalization &amp;amp; Outlier Cleansing&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="415" y="245" width="345" height="120" as="geometry"/>
        </mxCell>

        <!-- 2.3 Cloud Bigtable (Time-Series Store) -->
        <mxCell id="card_bigtable_ts" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;&quot;&gt;🗄️ Cloud Bigtable (Time-Series Store)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:2px;&quot;&gt;• Sub-10ms Read/Write Time-Series Latency&lt;br&gt;• Multi-Petabyte Telemetry Historical Archive&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=6;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="415" y="385" width="345" height="115" as="geometry"/>
        </mxCell>

        <!-- 2.4 Dataplex Manufacturing Data Mesh -->
        <mxCell id="card_dataplex_mesh" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;&quot;&gt;🌐 Dataplex Manufacturing Data Mesh&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:2px;&quot;&gt;• Central Data Governance &amp;amp; Lineage Tracking&lt;br&gt;• Data Quality Scans &amp;amp; Outlier Telemetry Profiling&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="415" y="525" width="345" height="235" as="geometry"/>
        </mxCell>

        <!-- Column 2 Internal Connectors -->
        <mxCell id="edge_pubsub_to_df" value="&lt;b style=&quot;font-size:6.5px;color:#1E40AF;&quot;&gt;[2] Real-time Streaming ETL&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#2563EB;strokeWidth=1.2;html=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;labelBackgroundColor=#FFFFFF;labelBorderColor=#93C5FD;padding=1;" edge="1" parent="1" source="card_pubsub_mfg" target="card_dataflow_mfg">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_df_to_bt" value="&lt;b style=&quot;font-size:6.5px;color:#1E40AF;&quot;&gt;[3] Time-Series Ingest&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#2563EB;strokeWidth=1.2;html=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;labelBackgroundColor=#FFFFFF;labelBorderColor=#93C5FD;padding=1;" edge="1" parent="1" source="card_dataflow_mfg" target="card_bigtable_ts">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_bt_to_dataplex" value="&lt;b style=&quot;font-size:6.5px;color:#1E40AF;&quot;&gt;[4] Data Lineage &amp;amp; Governance&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#2563EB;strokeWidth=1.2;html=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;labelBackgroundColor=#FFFFFF;labelBorderColor=#93C5FD;padding=1;" edge="1" parent="1" source="card_bigtable_ts" target="card_dataplex_mesh">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>


        <!-- ==================== COLUMN 3: VERTEX AI PREDICTIVE MAINTENANCE CORE ==================== -->
        <mxCell id="col3_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#A855F7;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="790" y="60" width="370" height="715" as="geometry"/>
        </mxCell>
        <mxCell id="col3_title" value="&lt;b style=&quot;font-size:10.5px;color:#7E22CE;&quot;&gt;🧠 Vertex AI Predictive Maintenance Core&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="800" y="64" width="350" height="20" as="geometry"/>
        </mxCell>

        <!-- 3.1 Gemini Anomaly Fuser -->
        <mxCell id="card_gemini_fuser" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;&quot;&gt;✨ Gemini Anomaly Fuser&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:2px;&quot;&gt;• Joint Thermal Video + Acoustic Waveforms&lt;br&gt;• Predicts Bearing Failure 14 Days Before Breakdown&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9333EA;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="800" y="88" width="350" height="135" as="geometry"/>
        </mxCell>

        <!-- 3.2 Physics-informed ML Models -->
        <mxCell id="card_physics_ml" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;&quot;&gt;📈 Physics-Informed ML Models&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:2px;&quot;&gt;• Complex Thermodynamic Finite Element Simulation&lt;br&gt;• Remaining Useful Life (RUL) Curve Estimation&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9333EA;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="800" y="245" width="350" height="120" as="geometry"/>
        </mxCell>

        <!-- 3.3 Autonomous Root-Cause Diagnostic Agent -->
        <mxCell id="card_root_cause_agent" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;&quot;&gt;🔍 Autonomous Root-Cause Diagnostic Agent&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:2px;&quot;&gt;• Correlates Raw Sensor Spikes with Historical FMEA Logs&lt;br&gt;• Generates Step-by-Step Repair Action Plans&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9333EA;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="800" y="385" width="350" height="115" as="geometry"/>
        </mxCell>

        <!-- 3.4 Closed-Loop Actuator Dispatcher -->
        <mxCell id="card_closed_actuator" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;&quot;&gt;⚙️ Closed-Loop Actuator Dispatcher&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:2px;&quot;&gt;• Automated Spindle Speed Throttling via MQTT&lt;br&gt;• Prevents Catastrophic Tool Overheating&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9333EA;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="800" y="525" width="350" height="235" as="geometry"/>
        </mxCell>

        <!-- Column 3 Internal Connectors with Pill Labels -->
        <mxCell id="edge_fuser_to_phys" value="&lt;b style=&quot;font-size:6.5px;color:#7E22CE;&quot;&gt;Critical Metrics&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#7E22CE;strokeWidth=1.2;html=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;labelBackgroundColor=#FFFFFF;labelBorderColor=#E9D5FF;padding=1;" edge="1" parent="1" source="card_gemini_fuser" target="card_physics_ml">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_phys_to_diag" value="&lt;b style=&quot;font-size:6.5px;color:#7E22CE;&quot;&gt;RUL Curve Estimation&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#7E22CE;strokeWidth=1.2;html=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;labelBackgroundColor=#FFFFFF;labelBorderColor=#E9D5FF;padding=1;" edge="1" parent="1" source="card_physics_ml" target="card_root_cause_agent">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_diag_to_act" value="&lt;b style=&quot;font-size:6.5px;color:#7E22CE;&quot;&gt;FMEA Correlation&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#7E22CE;strokeWidth=1.2;html=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;labelBackgroundColor=#FFFFFF;labelBorderColor=#E9D5FF;padding=1;" edge="1" parent="1" source="card_root_cause_agent" target="card_closed_actuator">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>


        <!-- ==================== COLUMN 4: LOOKER OEE COCKPIT & SAP MAINTENANCE ==================== -->
        <mxCell id="col4_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#10B981;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1180" y="60" width="395" height="715" as="geometry"/>
        </mxCell>
        <mxCell id="col4_title" value="&lt;b style=&quot;font-size:10.5px;color:#15803D;&quot;&gt;📊 Looker OEE Cockpit &amp;amp; SAP Maintenance&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1190" y="64" width="375" height="20" as="geometry"/>
        </mxCell>

        <!-- 4.1 Looker Studio OEE Executive Cockpit -->
        <mxCell id="card_looker_oee_exec" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;&quot;&gt;📈 Looker Studio OEE Executive Cockpit&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:2px;&quot;&gt;• Real-time Overall Equipment Effectiveness (OEE)&lt;br&gt;• Plant-wide Heatmaps &amp;amp; Bottleneck Diagnoses&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1190" y="88" width="375" height="135" as="geometry"/>
        </mxCell>

        <!-- 4.2 SAP Plant Maintenance (PM) Integration -->
        <mxCell id="card_sap_pm" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;&quot;&gt;🏭 SAP Plant Maintenance (PM) Integration&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:2px;&quot;&gt;• Auto-Generated Work Orders &amp;amp; Parts Reservation&lt;br&gt;• Direct to Field Mobile Dispatch via Cloud Tasks&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1190" y="245" width="375" height="120" as="geometry"/>
        </mxCell>

        <!-- 4.3 Manufacturing Lakehouse -->
        <mxCell id="card_mfg_lakehouse" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;&quot;&gt;🔍 Manufacturing Lakehouse&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:2px;&quot;&gt;• Long-Term OEE Trends, Scrap Rate Analysis &amp;amp; Supplier Quality Scoring&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=6;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1190" y="385" width="375" height="115" as="geometry"/>
        </mxCell>

        <!-- 4.4 Actionable Operator Controls -->
        <mxCell id="card_operator_controls" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;&quot;&gt;🎮 Actionable Operator Controls&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:2px;&quot;&gt;📅 Schedule PM &amp;nbsp;|&amp;nbsp; 🔄 Calibrate Machine &amp;nbsp;|&amp;nbsp; ⚙️ Maintain Model &amp;nbsp;|&amp;nbsp; 🔒 Lock Unit&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1190" y="525" width="375" height="235" as="geometry"/>
        </mxCell>

        <!-- Column 4 Internal Connectors -->
        <mxCell id="edge_looker_to_sap" value="&lt;b style=&quot;font-size:6.5px;color:#15803D;&quot;&gt;Data Linkage&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#16A34A;strokeWidth=1.2;html=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;labelBackgroundColor=#FFFFFF;labelBorderColor=#86EFAC;padding=1;" edge="1" parent="1" source="card_looker_oee_exec" target="card_sap_pm">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_sap_to_lake" value="&lt;b style=&quot;font-size:6.5px;color:#15803D;&quot;&gt;[5] Work Order Ingest&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#16A34A;strokeWidth=1.2;html=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;labelBackgroundColor=#FFFFFF;labelBorderColor=#86EFAC;padding=1;" edge="1" parent="1" source="card_sap_pm" target="card_mfg_lakehouse">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_lake_to_controls" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#16A34A;strokeWidth=1.2;html=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="card_mfg_lakehouse" target="card_operator_controls">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>


        <!-- ==================== CROSS-COLUMN INTER-TIER CONNECTORS ==================== -->
        <!-- GDC Edge -> Cloud Pub/Sub -->
        <mxCell id="arr_gdc_to_pubsub" value="&lt;b style=&quot;font-size:6.5px;color:#1E40AF;&quot;&gt;[2] Edge-to-Cloud Stream Ingest&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#2563EB;strokeWidth=1.2;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#93C5FD;padding=1;" edge="1" parent="1" source="card_gdc_edge_mfg" target="card_pubsub_mfg">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- Cloud Dataflow -> Gemini Anomaly Fuser -->
        <mxCell id="arr_df_to_fuser" value="&lt;b style=&quot;font-size:6.5px;color:#7E22CE;&quot;&gt;[3] Normalized Sensor Stream&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#7E22CE;strokeWidth=1.2;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#E9D5FF;padding=1;" edge="1" parent="1" source="card_dataflow_mfg" target="card_gemini_fuser">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- Root Cause Agent -> Looker Studio OEE Executive Cockpit -->
        <mxCell id="arr_diag_to_looker" value="&lt;b style=&quot;font-size:6.5px;color:#15803D;&quot;&gt;[4] Anomaly Feed&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#16A34A;strokeWidth=1.2;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#86EFAC;padding=1;" edge="1" parent="1" source="card_root_cause_agent" target="card_looker_oee_exec">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1165" y="442"/>
              <mxPoint x="1165" y="155"/>
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- Closed-Loop Actuator Dispatcher -> Factory Floor Ingress (Feedback Loop) -->
        <mxCell id="arr_act_to_floor" value="&lt;b style=&quot;font-size:6.5px;color:#B45309;&quot;&gt;[5] Closed-Loop MQTT Actuation&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#D97706;strokeWidth=1.2;html=1;exitX=0;exitY=0.5;entryX=1;entryY=0.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#FDE68A;padding=1;" edge="1" parent="1" source="card_closed_actuator" target="card_local_buffer">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="780" y="642"/>
              <mxPoint x="780" y="642"/>
            </Array>
          </mxGeometry>
        </mxCell>


        <!-- ==================== FOOTER LEGEND ==================== -->
        <!-- x = 25 .. 1575 (width = 1550, height = 36) -->
        <mxCell id="footer_legend" value="&lt;table style=&quot;width:100%;font-size:7.5px;color:#334155;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td&gt;&lt;b style=&quot;color:#0F172A;&quot;&gt;Refined Professional Legend:&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🟡 &lt;b&gt;Factory Floor &amp;amp; Ingress&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🔵 &lt;b&gt;Cloud Streaming &amp;amp; Bigtable&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🟣 &lt;b&gt;Gemini &amp;amp; Vertex AI&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🟢 &lt;b&gt;Looker OEE &amp;amp; SAP PM&lt;/b&gt;&lt;/td&gt;&lt;td&gt;── &lt;b&gt;MQTT Protocol Vectors&lt;/b&gt;&lt;/td&gt;&lt;td&gt;✨ &lt;b style=&quot;color:#1D4ED8;&quot;&gt;Gemini 3.7 Flash Engine&lt;/b&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="785" width="1550" height="36" as="geometry"/>
        </mxCell>

        <mxCell id="footer_copyright" value="&lt;span style=&quot;font-size:7px;color:#94A3B8;&quot;&gt;© 2026 Google LLC | Confidential &amp;amp; Proprietary&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="825" width="300" height="14" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
