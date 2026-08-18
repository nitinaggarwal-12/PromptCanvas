export function buildSmartFactoryIotXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="smart_manufacturing_iot" name="Google Cloud Industry 4.0: Smart Factory IoT &amp; Predictive Maintenance Platform (IND-MFG-05)">
    <mxGraphModel dx="1600" dy="920" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="860" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- ==================== HEADER BANNER ==================== -->
        <mxCell id="top_logo" value="&lt;span style=&quot;font-size:24px;&quot;&gt;🏭&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="10" width="35" height="35" as="geometry"/>
        </mxCell>
        <mxCell id="main_title" value="&lt;b style=&quot;font-size:17px;color:#0F172A;letter-spacing:-0.2px;&quot;&gt;GOOGLE CLOUD INDUSTRY 4.0: SMART FACTORY IoT &amp;amp; PREDICTIVE MAINTENANCE PLATFORM&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="65" y="10" width="1250" height="22" as="geometry"/>
        </mxCell>
        <mxCell id="main_subtitle" value="&lt;span style=&quot;font-size:9.5px;color:#475569;font-weight:700;letter-spacing:0.2px;&quot;&gt;Asset Sensor Telemetry, Industrial IoT Edge Compute, AlloyDB Digital Twin, Gemini 3.7 Anomaly Fuser &amp;amp; Looker OEE Cockpit.&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="65" y="32" width="1250" height="16" as="geometry"/>
        </mxCell>
        
        <!-- Gemini 3.7 Flash Badge -->
        <mxCell id="top_gemini_badge" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12.5px;font-weight:bold;color:#38BDF8;&quot;&gt;✨ Gemini 3.7 Flash&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#94A3B8;font-weight:600;&quot;&gt;Software Architect Engine&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=20;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#1E293B;strokeWidth=1.5;align=center;verticalAlign=middle;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="1380" y="8" width="195" height="42" as="geometry"/>
        </mxCell>


        <!-- ==================== ROW 1: INDUSTRIAL IOT EDGE & INGESTION ==================== -->
        <!-- Tab Label -->
        <mxCell id="row1_tab" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;Industrial IoT&lt;br&gt;Edge &amp;amp; Ingestion&lt;br&gt;(IIoT &amp;amp; SCADA)&lt;/b&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="62" width="150" height="125" as="geometry"/>
        </mxCell>
        <!-- Row 1 Frame -->
        <mxCell id="row1_frame" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="180" y="62" width="1395" height="125" as="geometry"/>
        </mxCell>

        <!-- 1.1 Kepware, Siemens, OPC-UA Connectors -->
        <mxCell id="card_opc_connectors" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;🎛️ Kepware, Siemens S7, Allen-Bradley CIP, OPC-UA Connectors&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:4px;&quot;&gt;• Real-time Telemetry &amp;amp; Alarms&lt;br&gt;• Historical Data Batch Upload&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="195" y="75" width="310" height="98" as="geometry"/>
        </mxCell>

        <!-- 1.2 Google Distributed Cloud (GDC) Edge -->
        <mxCell id="card_gdc_edge" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;☁️ Google Distributed Cloud (GDC) Edge&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:4px;&quot;&gt;• Edge Compute &amp;amp; Local Processing&lt;br&gt;• Anomaly Inference Model (A.I.)&lt;br&gt;• Protocol Translation&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="545" y="75" width="295" height="98" as="geometry"/>
        </mxCell>

        <!-- 1.3 Industrial Data Buffer & Historian -->
        <mxCell id="card_historian_buffer" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;🗄️ Industrial Data Buffer &amp;amp; Historian (GDC)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:4px;&quot;&gt;• Short-term Historian Cache&lt;br&gt;• Disconnected Operation Buffer&lt;br&gt;• Local Tag Management&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=6;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="875" y="75" width="310" height="98" as="geometry"/>
        </mxCell>

        <!-- 1.4 Data Lake -->
        <mxCell id="card_edge_data_lake" value="&lt;table style=&quot;width:100%;text-align:center;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;🗄️ Data Lake&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=6;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.2;align=center;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1225" y="85" width="330" height="78" as="geometry"/>
        </mxCell>

        <!-- Row 1 Connectors -->
        <mxCell id="edge_opc_to_gdc" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#2563EB;strokeWidth=1.2;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="card_opc_connectors" target="card_gdc_edge">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_gdc_to_hist" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#2563EB;strokeWidth=1.2;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="card_gdc_edge" target="card_historian_buffer">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_hist_to_lake" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#2563EB;strokeWidth=1.2;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="card_historian_buffer" target="card_edge_data_lake">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>


        <!-- ==================== ROW 2: DATA PROCESSING & DIGITAL TWIN CORE ==================== -->
        <!-- Tab Label -->
        <mxCell id="row2_tab" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;Data Processing&lt;br&gt;&amp;amp; Digital Twin Core&lt;br&gt;(Google Cloud)&lt;/b&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="195" width="150" height="125" as="geometry"/>
        </mxCell>
        <!-- Row 2 Frame -->
        <mxCell id="row2_frame" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="180" y="195" width="1395" height="125" as="geometry"/>
        </mxCell>

        <!-- 2.1 Cloud Pub/Sub IIoT Topics -->
        <mxCell id="card_pubsub_iiot" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;📡 Cloud Pub/Sub IIoT Topics&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:4px;&quot;&gt;• High-Throughput Sensor Ingestion&lt;br&gt;• Partitioned by Factory &amp;amp; Machine&lt;br&gt;• Topic-Based Routing&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="195" y="208" width="370" height="98" as="geometry"/>
        </mxCell>

        <!-- 2.2 AlloyDB Enterprise Digital Twin Schema -->
        <mxCell id="card_alloydb_twin" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;🗄️ AlloyDB Enterprise Digital Twin Schema&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:4px;&quot;&gt;• Hierarchical Asset Model (ISA-95)&lt;br&gt;• Twin State &amp;amp; Configuration Data&lt;br&gt;• Asset Performance History&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=6;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="610" y="208" width="400" height="98" as="geometry"/>
        </mxCell>

        <!-- 2.3 Cloud Dataflow Streaming Engine -->
        <mxCell id="card_dataflow_streaming" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;⚡ Cloud Dataflow Streaming Engine&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:4px;&quot;&gt;• Stream Processing &amp;amp; Enrichment&lt;br&gt;• Anomaly Scoring Normalization&lt;br&gt;• Data Quality &amp;amp; Validation&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1060" y="208" width="495" height="98" as="geometry"/>
        </mxCell>

        <!-- Row 2 Connectors -->
        <mxCell id="edge_gdc_to_pubsub" value="&lt;b style=&quot;font-size:6.5px;color:#1E40AF;&quot;&gt;[3] Streaming / Batch Ingest&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#2563EB;strokeWidth=1.2;html=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;labelBackgroundColor=#FFFFFF;labelBorderColor=#93C5FD;padding=1;" edge="1" parent="1" source="card_gdc_edge" target="card_pubsub_iiot">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_pubsub_to_alloy" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#2563EB;strokeWidth=1.2;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="card_pubsub_iiot" target="card_alloydb_twin">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_alloy_to_dataflow" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#2563EB;strokeWidth=1.2;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="card_alloydb_twin" target="card_dataflow_streaming">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>


        <!-- ==================== ROW 3: PREDICTIVE ANALYTICS & CORE A.I. ==================== -->
        <!-- Tab Label -->
        <mxCell id="row3_tab" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;Predictive Analytics&lt;br&gt;&amp;amp; Core A.I.&lt;br&gt;(Gemini &amp;amp; Vertex AI)&lt;/b&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="328" width="150" height="125" as="geometry"/>
        </mxCell>
        <!-- Row 3 Frame -->
        <mxCell id="row3_frame" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="180" y="328" width="1395" height="125" as="geometry"/>
        </mxCell>

        <!-- 3.1 Gemini 3.7 Multimodal Anomaly Fuser -->
        <mxCell id="card_gemini_anomaly" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;✨ Gemini 3.7 Multimodal Anomaly Fuser&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:4px;&quot;&gt;• Combines Vibration, Thermal, Video&lt;br&gt;• Identifies Multi-Variate Failure Patterns&lt;br&gt;• Predicts Bearing Failure 14 Days Prior&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="195" y="341" width="380" height="98" as="geometry"/>
        </mxCell>

        <!-- 3.2 Vertex AI Predictive Maintenance Models -->
        <mxCell id="card_vertex_pred_maint" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;🔮 Vertex AI Predictive Maintenance Models&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:4px;&quot;&gt;• Physics-Informed Digital Twin Simulation&lt;br&gt;• Remaining Useful Life (RUL) Calculation&lt;br&gt;• Root Cause Analysis Engine&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="620" y="341" width="400" height="98" as="geometry"/>
        </mxCell>

        <!-- 3.3 Closed-Loop Actuator & CMMS Dispatcher -->
        <mxCell id="card_closed_loop" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;⚙️ Closed-Loop Actuator &amp;amp; CMMS Dispatcher&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:4px;&quot;&gt;• Automated Spindle Speed Throttling&lt;br&gt;• Work Order Generation (SAP/Maximo)&lt;br&gt;• Actionable Operator Controls&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1070" y="341" width="485" height="98" as="geometry"/>
        </mxCell>

        <!-- Row 3 Connectors -->
        <mxCell id="edge_anomaly_to_vertex" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#2563EB;strokeWidth=1.2;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="card_gemini_anomaly" target="card_vertex_pred_maint">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_vertex_to_actuator" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#2563EB;strokeWidth=1.2;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="card_vertex_pred_maint" target="card_closed_loop">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>


        <!-- ==================== ROW 4: OPERATIONS COCKPIT & EXECUTIVE LAKEHOUSE ==================== -->
        <!-- Tab Label -->
        <mxCell id="row4_tab" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;Operations Cockpit&lt;br&gt;&amp;amp; Executive Lakehouse&lt;br&gt;(Looker &amp;amp; BigQuery)&lt;/b&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="461" width="150" height="125" as="geometry"/>
        </mxCell>
        <!-- Row 4 Frame -->
        <mxCell id="row4_frame" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="180" y="461" width="1395" height="125" as="geometry"/>
        </mxCell>

        <!-- 4.1 Looker OEE Operations Cockpit -->
        <mxCell id="card_looker_oee" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;📊 Looker OEE Operations Cockpit&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:4px;&quot;&gt;• Overall Equipment Effectiveness (OEE)&lt;br&gt;• Plant-wide Heatmaps &amp;amp; Diagnostics&lt;br&gt;• Gemini 3.7 Insights Summary&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="195" y="474" width="380" height="98" as="geometry"/>
        </mxCell>

        <!-- 4.2 BigQuery Time-Series Data Lakehouse -->
        <mxCell id="card_bq_timeseries" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;🔍 BigQuery Time-Series Data Lakehouse&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:4px;&quot;&gt;• Multi-Petabyte Telemetry Store&lt;br&gt;• Tag Management &amp;amp; Trend Analysis&lt;br&gt;• Anomaly Result Storage&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=6;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="620" y="474" width="400" height="98" as="geometry"/>
        </mxCell>

        <!-- 4.3 Manufacturing Intelligence Executive Dashboard -->
        <mxCell id="card_mfg_executive" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;📈 Manufacturing Intelligence Executive Dashboard&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:4px;&quot;&gt;• Fleet-wide Asset Health &amp;amp; Availability&lt;br&gt;• KPI Reporting (Quality, Cost, Delivery)&lt;br&gt;• Energy Consumption &amp;amp; Sustainability&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1070" y="474" width="485" height="98" as="geometry"/>
        </mxCell>

        <!-- Row 4 Connectors -->
        <mxCell id="edge_oee_to_bq" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#2563EB;strokeWidth=1.2;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="card_looker_oee" target="card_bq_timeseries">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_bq_to_mfg" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#2563EB;strokeWidth=1.2;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="card_bq_timeseries" target="card_mfg_executive">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_anomaly_to_oee" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#2563EB;strokeWidth=1.2;html=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="card_gemini_anomaly" target="card_looker_oee">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>


        <!-- ==================== ROW 5: TRUST, PRIVACY & GOVERNANCE ==================== -->
        <!-- Tab Label -->
        <mxCell id="row5_tab" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;Trust, Privacy&lt;br&gt;&amp;amp; Governance&lt;/b&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="594" width="150" height="150" as="geometry"/>
        </mxCell>
        <!-- Row 5 Frame (Blue Header) -->
        <mxCell id="row5_frame" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#3B82F6;strokeColor=#1D4ED8;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="180" y="594" width="1395" height="150" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_mfg_trust_hdr" value="&lt;b style=&quot;font-size:12px;color:#FFFFFF;letter-spacing:1px;&quot;&gt;TRUST, PRIVACY &amp;amp; GOVERNANCE&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="190" y="598" width="1375" height="22" as="geometry"/>
        </mxCell>

        <!-- 5.1 Cloud DLP -->
        <mxCell id="card_mfg_dlp" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;&quot;&gt;🛡️ [Cloud DLP PII&lt;br&gt;Blind Screening Shield]&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;color:#475569;padding-top:2px;&quot;&gt;Redacts Operator PII &amp;amp; Machine Identifiers&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="195" y="626" width="310" height="98" as="geometry"/>
        </mxCell>

        <!-- 5.2 Cloud KMS HSM -->
        <mxCell id="card_mfg_kms" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;&quot;&gt;🔑 [Cloud KMS HSM&lt;br&gt;(Sensitive Asset Keys)]&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;color:#475569;padding-top:2px;&quot;&gt;FIPS 140-2 Level 3 Key Custody for OT &amp;amp; Secrets&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="525" y="626" width="300" height="98" as="geometry"/>
        </mxCell>

        <!-- 5.3 VPC Service Controls -->
        <mxCell id="card_mfg_vpc_sc" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;&quot;&gt;🧱 [VPC Service Controls&lt;br&gt;(VPC-SC)]&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;color:#475569;padding-top:2px;&quot;&gt;Zero-Trust Perimeter Isolating Plant Data &amp;amp; Models&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="845" y="626" width="300" height="98" as="geometry"/>
        </mxCell>

        <!-- 5.4 Cloud Audit Logs -->
        <mxCell id="card_mfg_audit" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;&quot;&gt;📋 [Cloud Audit Logs &amp;amp;&lt;br&gt;Access Transparency]&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;color:#475569;padding-top:2px;&quot;&gt;Immutable WORM Storage for 7 Years | Audit Defense&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1165" y="626" width="390" height="98" as="geometry"/>
        </mxCell>

        <!-- Trust & Governance Arrows up to Cockpits -->
        <mxCell id="edge_mfg_trust_to_oee" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#1E40AF;strokeWidth=1.2;html=1;exitX=0.5;exitY=0;entryX=0.5;entryY=1;" edge="1" parent="1" source="card_mfg_dlp" target="card_looker_oee">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_mfg_trust_to_exec" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#1E40AF;strokeWidth=1.2;html=1;exitX=0.5;exitY=0;entryX=0.5;entryY=1;" edge="1" parent="1" source="card_mfg_audit" target="card_mfg_executive">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>


        <!-- ==================== FOOTER LEGEND ==================== -->
        <!-- x = 25 .. 1575 (width = 1550, height = 40) -->
        <mxCell id="footer_legend" value="&lt;table style=&quot;width:100%;font-size:7.5px;color:#334155;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td&gt;&lt;b style=&quot;color:#0F172A;&quot;&gt;Professional Legend:&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🔵 &lt;b&gt;Data&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🔷 &lt;b&gt;Compute&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🟢 &lt;b&gt;Security&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🔴 &lt;b&gt;Controls&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🔒 &lt;b&gt;Access Transparency&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🏭 &lt;b&gt;Industry 4.0 OEE&lt;/b&gt;&lt;/td&gt;&lt;td&gt;✨ &lt;b style=&quot;color:#1D4ED8;&quot;&gt;Gemini 3.7 Multimodal Engine&lt;/b&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="755" width="1550" height="36" as="geometry"/>
        </mxCell>

        <mxCell id="footer_copyright" value="&lt;span style=&quot;font-size:7px;color:#94A3B8;&quot;&gt;© 2026 Google LLC | Confidential &amp;amp; Proprietary&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="796" width="300" height="14" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
