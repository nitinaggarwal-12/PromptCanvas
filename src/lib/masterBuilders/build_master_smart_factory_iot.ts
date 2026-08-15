export function buildSmartFactoryIotXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="smart_manufacturing_iot" name="Smart Factory Industry 4.0 IoT &amp; Predictive Maintenance (IND-MFG-05)">
    <mxGraphModel dx="1400" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1400" pageHeight="720" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- Header Banner -->
        <mxCell id="top_logo" value="&lt;span style=&quot;font-size:24px;&quot;&gt;🏭&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="10" width="35" height="35" as="geometry"/>
        </mxCell>
        <mxCell id="main_title" value="&lt;b style=&quot;font-size:18px;color:#0F172A;&quot;&gt;Google Cloud INDUSTRY 4.0: SMART FACTORY IoT &amp;amp; PREDICTIVE MAINTENANCE&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="65" y="10" width="1050" height="24" as="geometry"/>
        </mxCell>
        <mxCell id="main_subtitle" value="&lt;span style=&quot;font-size:11px;color:#475569;font-weight:600;&quot;&gt;Industrial Edge-to-Cloud: GDC Edge Gateway, MQTT / OPC-UA, Cloud Dataflow Streaming, Bigtable Time-Series, Vertex AI Anomaly &amp;amp; Looker OEE Cockpit&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="65" y="32" width="1050" height="18" as="geometry"/>
        </mxCell>
        <mxCell id="top_gemini_badge" value="&lt;b style=&quot;font-size:14px;color:#2563EB;&quot;&gt;Gemini 3.7 Flash&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Industrial AIOps&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1220" y="10" width="140" height="36" as="geometry"/>
        </mxCell>

        <!-- Column 1: Shop Floor PLCs & Edge Ingress -->
        <mxCell id="col1_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFBEB;strokeColor=#F59E0B;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="25" y="65" width="280" height="580" as="geometry"/>
        </mxCell>
        <mxCell id="col1_title" value="&lt;b style=&quot;font-size:11px;color:#B45309;&quot;&gt;⚙️ Factory Floor &amp;amp; SCADA Ingress&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="35" y="72" width="260" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="node_factory_sensors" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Industrial Sensors &amp;amp; PLCs&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;• Siemens S7 / Allen-Bradley PLCs&lt;br&gt;• Vibration, Thermal &amp;amp; Acoustic Probes&lt;br&gt;• High-Resolution Vision Cameras&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="115" width="250" height="85" as="geometry"/>
        </mxCell>

        <mxCell id="node_gdc_edge_gateway" value="&lt;b style=&quot;font-size:11px;color:#B45309;&quot;&gt;Google Distributed Cloud (GDC) Edge&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;OPC-UA / Modbus / MQTT Protocol Broker&lt;br&gt;Sub-Millisecond Local Anomaly Intercept&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF3C7;strokeColor=#D97706;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="235" width="250" height="85" as="geometry"/>
        </mxCell>

        <mxCell id="node_edge_ml_inference" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Edge TPU Micro-Inference&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Real-Time Spindle Vibration FFT Analysis&lt;br&gt;Automated Emergency E-Stop Trigger&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="355" width="250" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_local_historian" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Local Edge Buffer &amp;amp; Historian&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;72-Hour Offline Network Resilience Store&lt;br&gt;Lossless Replay upon Cloud WAN Reconnect&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="465" width="250" height="75" as="geometry"/>
        </mxCell>

        <!-- Column 2: Streaming Ingestion & Bigtable Time-Series -->
        <mxCell id="col2_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#60A5FA;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="330" y="65" width="310" height="580" as="geometry"/>
        </mxCell>
        <mxCell id="col2_title" value="&lt;b style=&quot;font-size:11px;color:#1D4ED8;&quot;&gt;📡 Cloud Streaming &amp;amp; Time-Series Tier&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="340" y="72" width="290" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="node_pubsub_iot" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Cloud Pub/Sub IoT Topics&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;500k+ Sensor Events/sec Ingestion Rate&lt;br&gt;Partitioned by Factory ID &amp;amp; Machine SKU&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="345" y="115" width="280" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_dataflow_mde" value="&lt;b style=&quot;font-size:11px;color:#1D4ED8;&quot;&gt;Cloud Dataflow (Manufacturing Data Engine)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Sliding Window Telemetry Aggregation (5s/1m)&lt;br&gt;ISA-95 Hierarchy Normalization &amp;amp; Enrichment&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#1D4ED8;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="345" y="225" width="280" height="85" as="geometry"/>
        </mxCell>

        <mxCell id="node_bigtable_timeseries" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Cloud Bigtable (Time-Series Store)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Sub-10ms High-Throughput Read/Write Latency&lt;br&gt;Multi-Petabyte Telemetry Historical Archive&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="345" y="345" width="280" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_dataplex_mfg_catalog" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Dataplex Manufacturing Data Mesh&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Central Data Governance &amp;amp; Lineage Catalog&lt;br&gt;Data Quality Scans &amp;amp; Outlier Telemetry Profiling&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="345" y="455" width="280" height="75" as="geometry"/>
        </mxCell>

        <!-- Column 3: Vertex AI Anomaly Scoring & Digital Twin -->
        <mxCell id="col3_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#A855F7;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="665" y="65" width="330" height="580" as="geometry"/>
        </mxCell>
        <mxCell id="col3_title" value="&lt;b style=&quot;font-size:11px;color:#7E22CE;&quot;&gt;🔮 Vertex AI Predictive Maintenance Core&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="675" y="72" width="310" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="node_gemini_multimodal_anomaly" value="&lt;b style=&quot;font-size:11px;color:#7E22CE;&quot;&gt;Gemini 3.7 Flash Multimodal Anomaly Fuser&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Joint Analysis: Thermal Video + Spindle Waveforms&lt;br&gt;Predicts Bearing Failure 14 Days Before Breakdown&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F3E8FF;strokeColor=#7E22CE;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="680" y="115" width="300" height="85" as="geometry"/>
        </mxCell>

        <mxCell id="node_digital_twin_physics" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Digital Twin Physics-Informed ML Models&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Real-Time Component Stress &amp;amp; Wear Simulation&lt;br&gt;Remaining Useful Life (RUL) Curve Estimation&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9333EA;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="680" y="235" width="300" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_root_cause_agent" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Autonomous Root-Cause Diagnostic Agent&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Correlates Raw Sensor Spikes with Historical Logs&lt;br&gt;Generates Actionable Repair Manual Steps&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9333EA;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="680" y="345" width="300" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_closed_loop_controller" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Closed-Loop Actuator Dispatcher&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Automated Spindle Speed Throttling via MQTT&lt;br&gt;Prevents Catastrophic Tool Overheating&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9333EA;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="680" y="455" width="300" height="75" as="geometry"/>
        </mxCell>

        <!-- Column 4: Operational Cockpit & Enterprise ERP Actions -->
        <mxCell id="col4_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#22C55E;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1020" y="65" width="340" height="580" as="geometry"/>
        </mxCell>
        <mxCell id="col4_title" value="&lt;b style=&quot;font-size:11px;color:#15803D;&quot;&gt;📊 Looker OEE Cockpit &amp;amp; SAP Maintenance&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1030" y="72" width="320" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="node_looker_oee_cockpit" value="&lt;b style=&quot;font-size:11px;color:#15803D;&quot;&gt;Looker Studio OEE Executive Cockpit&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Real-Time Availability, Performance &amp;amp; Quality&lt;br&gt;Plant-Wide Heatmap &amp;amp; Bottleneck Diagnostics&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#15803D;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1035" y="115" width="310" height="85" as="geometry"/>
        </mxCell>

        <mxCell id="node_sap_pm_workorders" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;SAP Plant Maintenance (PM) Integration&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Auto-Generated Work Order &amp;amp; Parts Reservation&lt;br&gt;Technician Mobile Dispatch via Cloud Tasks&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1035" y="235" width="310" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_bigquery_mfg_lakehouse" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;BigQuery Manufacturing Lakehouse&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Long-Term OEE Trends, Scrap Rate Analysis,&lt;br&gt;Energy Consumption &amp;amp; Supplier Quality Scoring&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1035" y="345" width="310" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_actionable_buttons" value="&lt;b style=&quot;font-size:11px;color:#15803D;&quot;&gt;Actionable Operator Cockpit Controls&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;[⚡ Schedule Downtime] &amp;nbsp; [📦 Order Spindle Part]&lt;br&gt;[🔄 Retrain Digital Twin] &amp;nbsp; [🛡️ Lock Maintenance Zone]&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1035" y="455" width="310" height="85" as="geometry"/>
        </mxCell>

        <!-- Connecting Edges -->
        <mxCell id="edge1" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#D97706;strokeWidth=2;" edge="1" parent="1" source="node_factory_sensors" target="node_gdc_edge_gateway">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge2" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=2;" edge="1" parent="1" source="node_gdc_edge_gateway" target="node_pubsub_iot">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge3" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=2;" edge="1" parent="1" source="node_pubsub_iot" target="node_dataflow_mde">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge4" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=2;" edge="1" parent="1" source="node_dataflow_mde" target="node_bigtable_timeseries">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge5" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#7E22CE;strokeWidth=2;" edge="1" parent="1" source="node_dataflow_mde" target="node_gemini_multimodal_anomaly">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge6" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16A34A;strokeWidth=2;" edge="1" parent="1" source="node_gemini_multimodal_anomaly" target="node_looker_oee_cockpit">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge7" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16A34A;strokeWidth=2;" edge="1" parent="1" source="node_root_cause_agent" target="node_sap_pm_workorders">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- Footer Legend -->
        <mxCell id="footer_legend" value="&lt;span style=&quot;font-size:9.5px;color:#475569;&quot;&gt;&lt;b&gt;Smart Factory Architecture:&lt;/b&gt; 🟡 GDC Edge Gateway &amp;nbsp;|&amp;nbsp; 🔵 Dataflow &amp;amp; Bigtable Time-Series &amp;nbsp;|&amp;nbsp; 🟣 Gemini 3.7 Anomaly Detection &amp;nbsp;|&amp;nbsp; 🟢 Looker OEE Cockpit &amp;amp; SAP PM &amp;nbsp;|&amp;nbsp; ⚡ Powered by Gemini 3.7 Flash&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="655" width="1335" height="30" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
