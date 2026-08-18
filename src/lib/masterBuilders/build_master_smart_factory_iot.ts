export function buildSmartFactoryIotXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="smart_manufacturing_iot" name="Smart Factory Industry 4.0 IoT &amp; Predictive Maintenance (IND-MFG-05)">
    <mxGraphModel dx="1600" dy="720" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="720" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- ==================== HEADER BANNER ==================== -->
        <mxCell id="top_logo" value="&lt;span style=&quot;font-size:24px;&quot;&gt;🏭&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="8" width="35" height="35" as="geometry"/>
        </mxCell>
        <mxCell id="main_title" value="&lt;b style=&quot;font-size:18px;color:#0F172A;&quot;&gt;GOOGLE CLOUD INDUSTRY 4.0: SMART FACTORY IoT &amp;amp; PREDICTIVE MAINTENANCE ARCHITECTURE&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="65" y="8" width="1150" height="24" as="geometry"/>
        </mxCell>
        <mxCell id="main_subtitle" value="&lt;span style=&quot;font-size:10.5px;color:#475569;font-weight:600;&quot;&gt;GDC Edge Gateway, MQTT/OPC-UA, Cloud Dataflow Streaming, Bigtable Time-Series, Vertex AI Multimodal Anomaly &amp;amp; Looker OEE Cockpit&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="65" y="30" width="1150" height="18" as="geometry"/>
        </mxCell>
        <mxCell id="top_gemini_badge" value="&lt;b style=&quot;font-size:16px;color:#2563EB;&quot;&gt;✨ Gemini 3.7 Flash&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Industrial AIOps&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1420" y="8" width="150" height="38" as="geometry"/>
        </mxCell>

        <!-- ==================== COLUMN 1: SHOP FLOOR & SCADA INGRESS ==================== -->
        <mxCell id="col1_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFBEB;strokeColor=#F59E0B;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="25" y="60" width="340" height="585" as="geometry"/>
        </mxCell>
        <mxCell id="col1_title" value="&lt;b style=&quot;font-size:11px;color:#B45309;&quot;&gt;⚙️ Factory Floor &amp;amp; SCADA Ingress Tier&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="35" y="68" width="320" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="node_factory_sensors" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;Industrial Sensors &amp;amp; PLCs&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;• Siemens S7 / Allen-Bradley PLCs&lt;br&gt;• 10kHz Vibration, Thermal &amp;amp; Acoustic Probes&lt;br&gt;• High-Speed Optical Vision Cameras&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="98" width="310" height="74" as="geometry"/>
        </mxCell>

        <mxCell id="node_gdc_edge_gateway" value="&lt;b style=&quot;font-size:10.5px;color:#B45309;&quot;&gt;Google Distributed Cloud (GDC) Edge&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;OPC-UA / Modbus / MQTT Protocol Broker&lt;br&gt;Sub-Millisecond Local Anomaly Intercept&lt;/span&gt;" style="shape=hexagon;perimeter=hexagonPerimeter2;whiteSpace=wrap;html=1;fixedSize=1;fillColor=#FEF3C7;strokeColor=#D97706;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="210" width="310" height="80" as="geometry"/>
        </mxCell>

        <mxCell id="node_edge_ml_inference" value="&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;Edge TPU Micro-Inference&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#475569;&quot;&gt;Real-Time Spindle Vibration FFT Analysis&lt;br&gt;&amp;lt;1ms Emergency E-Stop Safety Interlock&lt;/span&gt;" style="shape=rhombus;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="325" width="310" height="80" as="geometry"/>
        </mxCell>

        <mxCell id="node_local_historian" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;Local Edge Buffer &amp;amp; Historian&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;72-Hour Offline Network Resilience Store&lt;br&gt;Lossless Replay upon Cloud WAN Reconnect&lt;/span&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=6;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="440" width="310" height="74" as="geometry"/>
        </mxCell>

        <!-- ==================== COLUMN 2: STREAMING & TIME-SERIES ==================== -->
        <mxCell id="col2_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#60A5FA;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="390" y="60" width="360" height="585" as="geometry"/>
        </mxCell>
        <mxCell id="col2_title" value="&lt;b style=&quot;font-size:11px;color:#1D4ED8;&quot;&gt;📡 Cloud Streaming &amp;amp; Time-Series Tier&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="400" y="68" width="340" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="node_pubsub_iot" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;Cloud Pub/Sub IoT Topics&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;500k+ Sensor Events/sec Ingestion Rate&lt;br&gt;Partitioned by Factory ID &amp;amp; Machine SKU&lt;/span&gt;" style="shape=mxgraph.flowchart.direct_data;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="405" y="98" width="330" height="66" as="geometry"/>
        </mxCell>

        <mxCell id="node_dataflow_mde" value="&lt;b style=&quot;font-size:10.5px;color:#1D4ED8;&quot;&gt;Cloud Dataflow (Manufacturing Data Engine)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Sliding Window Telemetry Aggregation (5s/1m)&lt;br&gt;ISA-95 Hierarchy Normalization &amp;amp; Outlier Cleaning&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#1D4ED8;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="405" y="210" width="330" height="74" as="geometry"/>
        </mxCell>

        <mxCell id="node_bigtable_timeseries" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;Cloud Bigtable (Time-Series Store)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Sub-10ms High-Throughput Read/Write Latency&lt;br&gt;Multi-Petabyte Telemetry Historical Archive&lt;/span&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=6;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="405" y="325" width="330" height="76" as="geometry"/>
        </mxCell>

        <mxCell id="node_dataplex_mfg_catalog" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;Dataplex Manufacturing Data Mesh&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Central Data Governance &amp;amp; Lineage Catalog&lt;br&gt;Data Quality Scans &amp;amp; Outlier Telemetry Profiling&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="405" y="440" width="330" height="70" as="geometry"/>
        </mxCell>

        <!-- ==================== COLUMN 3: VERTEX AI PREDICTIVE MAINTENANCE ==================== -->
        <mxCell id="col3_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#A855F7;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="775" y="60" width="380" height="585" as="geometry"/>
        </mxCell>
        <mxCell id="col3_title" value="&lt;b style=&quot;font-size:11px;color:#7E22CE;&quot;&gt;🔮 Vertex AI Predictive Maintenance Core&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="785" y="68" width="360" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="node_gemini_multimodal_anomaly" value="&lt;b style=&quot;font-size:10.5px;color:#7E22CE;&quot;&gt;✨ Gemini Multimodal Anomaly Fuser&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Joint Analysis: Thermal Video + Spindle Waveforms&lt;br&gt;Predicts Bearing Failure 14 Days Before Breakdown&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F3E8FF;strokeColor=#7E22CE;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="790" y="98" width="350" height="74" as="geometry"/>
        </mxCell>

        <mxCell id="node_digital_twin_physics" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;Digital Twin Physics-Informed ML Models&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Real-Time Component Stress &amp;amp; Wear Simulation&lt;br&gt;Remaining Useful Life (RUL) Curve Estimation&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9333EA;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="790" y="210" width="350" height="74" as="geometry"/>
        </mxCell>

        <mxCell id="node_root_cause_agent" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;Autonomous Root-Cause Diagnostic Agent&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Correlates Raw Sensor Spikes with Historical FMEA Logs&lt;br&gt;Generates Actionable Repair Procedures&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9333EA;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="790" y="325" width="350" height="74" as="geometry"/>
        </mxCell>

        <mxCell id="node_closed_loop_controller" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;Closed-Loop Actuator Dispatcher&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Automated Spindle Speed Throttling via MQTT&lt;br&gt;Prevents Catastrophic Tool Overheating&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9333EA;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="790" y="440" width="350" height="70" as="geometry"/>
        </mxCell>

        <!-- ==================== COLUMN 4: OEE COCKPIT & SAP ACTIONS ==================== -->
        <mxCell id="col4_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#22C55E;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1180" y="60" width="395" height="585" as="geometry"/>
        </mxCell>
        <mxCell id="col4_title" value="&lt;b style=&quot;font-size:11px;color:#15803D;&quot;&gt;📊 Looker OEE Cockpit &amp;amp; SAP Maintenance&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1190" y="68" width="375" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="node_looker_oee_cockpit" value="&lt;b style=&quot;font-size:10.5px;color:#15803D;&quot;&gt;Looker Studio OEE Executive Cockpit&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Real-Time Availability, Performance &amp;amp; Quality Metrics&lt;br&gt;Plant-Wide Heatmaps &amp;amp; Bottleneck Diagnostics&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#15803D;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1190" y="98" width="375" height="74" as="geometry"/>
        </mxCell>

        <mxCell id="node_sap_pm_workorders" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;SAP Plant Maintenance (PM) Integration&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Auto-Generated Work Orders &amp;amp; Parts Reservation&lt;br&gt;Technician Mobile Dispatch via Cloud Tasks&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1190" y="210" width="375" height="74" as="geometry"/>
        </mxCell>

        <mxCell id="node_bigquery_mfg_lakehouse" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;BigQuery Manufacturing Lakehouse&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Long-Term OEE Trends, Scrap Rate Analysis &amp;amp; Supplier Quality Scoring&lt;/span&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=6;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1190" y="325" width="375" height="76" as="geometry"/>
        </mxCell>

        <mxCell id="node_actionable_buttons" value="&lt;b style=&quot;font-size:10px;color:#15803D;&quot;&gt;Actionable Operator Controls&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#475569;&quot;&gt;[⚡ Schedule PM] &amp;nbsp; [📦 Order Parts] &amp;nbsp; [🔄 Retrain Model] &amp;nbsp; [🛡️ Lock Cell]&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1190" y="440" width="375" height="70" as="geometry"/>
        </mxCell>

        <!-- ==================== NUMBERED PROTOCOL CONNECTORS ==================== -->
        <!-- [1] Factory Sensors -> GDC Edge Gateway -->
        <mxCell id="edge1" value="&lt;b style=&quot;font-size:7px;color:#D97706;&quot;&gt;[1] OPC-UA :4840&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#D97706;strokeWidth=1.5;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;" edge="1" parent="1" source="node_factory_sensors" target="node_gdc_edge_gateway">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- [2] GDC Edge Gateway -> Pub/Sub IoT -->
        <mxCell id="edge2" value="&lt;b style=&quot;font-size:7px;color:#2563EB;&quot;&gt;[2] MQTT / TLS 1.3 :8883&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;" edge="1" parent="1" source="node_gdc_edge_gateway" target="node_pubsub_iot">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- [3] Pub/Sub -> Dataflow MDE -->
        <mxCell id="edge3" value="&lt;b style=&quot;font-size:7px;color:#2563EB;&quot;&gt;[3] 10kHz Stream ETL&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;" edge="1" parent="1" source="node_pubsub_iot" target="node_dataflow_mde">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- [4] Dataflow -> Bigtable Time-Series -->
        <mxCell id="edge4" value="&lt;b style=&quot;font-size:7px;color:#2563EB;&quot;&gt;[4] Sub-10ms Put&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;" edge="1" parent="1" source="node_dataflow_mde" target="node_bigtable_timeseries">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- [5] Dataflow -> Gemini Multimodal Anomaly -->
        <mxCell id="edge5" value="&lt;b style=&quot;font-size:7px;color:#7E22CE;&quot;&gt;[5] Joint Waveform Fusing&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#7E22CE;strokeWidth=1.5;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;" edge="1" parent="1" source="node_dataflow_mde" target="node_gemini_multimodal_anomaly">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- [6] Gemini Anomaly -> Looker OEE Cockpit -->
        <mxCell id="edge6" value="&lt;b style=&quot;font-size:7px;color:#16A34A;&quot;&gt;[6] OEE Metrics&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#16A34A;strokeWidth=1.5;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;" edge="1" parent="1" source="node_gemini_multimodal_anomaly" target="node_looker_oee_cockpit">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- [7] Diagnostic Agent -> SAP PM Work Orders -->
        <mxCell id="edge7" value="&lt;b style=&quot;font-size:7px;color:#16A34A;&quot;&gt;[7] Auto PM Dispatch&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#16A34A;strokeWidth=1.5;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;" edge="1" parent="1" source="node_root_cause_agent" target="node_sap_pm_workorders">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- ==================== FOOTER LEGEND ==================== -->
        <mxCell id="footer_legend" value="&lt;span style=&quot;font-size:9px;color:#475569;&quot;&gt;&lt;b&gt;Smart Factory Legend:&lt;/b&gt; 🟡 GDC Edge &amp;amp; TPU Rhombus &amp;nbsp;|&amp;nbsp; 🔵 Dataflow &amp;amp; Bigtable Cylinders &amp;nbsp;|&amp;nbsp; 🟣 Gemini Anomaly Core &amp;nbsp;|&amp;nbsp; 🟢 Looker OEE &amp;amp; SAP PM &amp;nbsp;|&amp;nbsp; ── [1]-[7] Protocol Vectors&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="658" width="1550" height="32" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
