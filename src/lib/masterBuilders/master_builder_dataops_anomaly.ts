/**
 * 🏛️ MASTER BLUEPRINT 4: DATAOPS & ANOMALY DETECTION ARCHITECTURE
 * Pixel-Perfect Replica of DataOps & Anomaly Detection Architecture (To-Be State)
 */

export function buildDataOpsAnomalyDetectionXml(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="app.diagrams.net" modified="2026-04-01T00:00:00.000Z" agent="PromptCanvas" version="24.0.0" type="device">
  <diagram id="dataops_anomaly_detection" name="DataOps &amp; Anomaly Detection Architecture">
    <mxGraphModel dx="1600" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="950" background="#FFFFFF">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- MAIN TITLE (TOP LEFT) -->
        <mxCell id="main_title_box" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="16" width="860" height="54" as="geometry"/>
        </mxCell>
        <mxCell id="main_title" value="&lt;b style=&quot;font-size:18px;color:#0F172A;font-family:sans-serif;&quot;&gt;Enterprise DataOps &amp;amp; Anomaly Detection Architecture (To-Be State)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:12px;color:#475569;font-weight:600;&quot;&gt;Dataplex Quality Governance • Automated SODA/Monte Carlo Testing • Vertex AI Grounding Guard&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="45" y="18" width="830" height="50" as="geometry"/>
        </mxCell>


        <!-- ==================== TOP ZONE: STRATEGY & LOOKER OBSERVABILITY DASHBOARD ==================== -->
        <!-- x = 30 .. 1560, y = 85 .. 275 (height = 190) -->
        <mxCell id="tier1_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="85" width="1530" height="190" as="geometry"/>
        </mxCell>
        <mxCell id="tier1_bar" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;ZONE 1: DATA STRATEGY, EXECUTIVE GOVERNANCE &amp;amp; REAL-TIME QUALITY DASHBOARD&lt;/b&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="30" y="85" width="1530" height="30" as="geometry"/>
        </mxCell>

        <!-- CDO & Data Architect (Left) -->
        <mxCell id="top_cdo_box" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;👔 CDO &amp;amp; Data Architecture Board&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#475569;padding-top:2px;&quot;&gt;Enterprise Data Quality SLAs • Compliance Policies (SOC 2, HIPAA, CSV)&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="45" y="125" width="280" height="135" as="geometry"/>
        </mxCell>

        <!-- Looker Studio Dashboard Centerpiece -->
        <mxCell id="box_looker_dash" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td colspan=&quot;4&quot; style=&quot;font-size:11.5px;font-weight:bold;color:#1E40AF;border-bottom:1px solid #BFDBFE;padding-bottom:2px;&quot;&gt;📊 Looker Studio Enterprise Data Observability Dashboard&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;padding:4px;text-align:center;&quot;&gt;&lt;b style=&quot;font-size:9px;color:#0F172A;&quot;&gt;Data Freshness&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#16A34A;font-weight:bold;&quot;&gt;⚡ &amp;lt; 10s (Optimal)&lt;/span&gt;&lt;/td&gt;&lt;td style=&quot;padding:4px;text-align:center;&quot;&gt;&lt;b style=&quot;font-size:9px;color:#0F172A;&quot;&gt;Schema Drift&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#16A34A;font-weight:bold;&quot;&gt;🟢 0 Breaking Drifts&lt;/span&gt;&lt;/td&gt;&lt;td style=&quot;padding:4px;text-align:center;&quot;&gt;&lt;b style=&quot;font-size:9px;color:#0F172A;&quot;&gt;Volume Anomalies&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#16A34A;font-weight:bold;&quot;&gt;🟢 0 Active Alerts&lt;/span&gt;&lt;/td&gt;&lt;td style=&quot;padding:4px;text-align:center;&quot;&gt;&lt;b style=&quot;font-size:9px;color:#0F172A;&quot;&gt;Hallucination Prevention&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:11px;color:#16A34A;font-weight:bold;&quot;&gt;100% Validated&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.5;align=left;verticalAlign=top;padding=4;" vertex="1" parent="1">
          <mxGeometry x="340" y="125" width="860" height="135" as="geometry"/>
        </mxCell>

        <!-- SRE Ops Lead & Summary (Right) -->
        <mxCell id="top_sre_box" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;🎧 SRE &amp;amp; DataOps Leads&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#475569;padding-top:2px;&quot;&gt;24/7 Automated Pipeline Observability &amp;amp; Anomaly Triage&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1215" y="125" width="330" height="135" as="geometry"/>
        </mxCell>


        <!-- ==================== SECOND ZONE: INCIDENT MANAGEMENT & SRE VIEW ==================== -->
        <!-- x = 30 .. 1560, y = 290 .. 380 (height = 90) -->
        <mxCell id="tier2_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="290" width="1530" height="90" as="geometry"/>
        </mxCell>

        <mxCell id="inc_box_mon" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#1E40AF;&quot;&gt;📈 Cloud Monitoring Metric Alarms&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;Automated drift &amp;amp; latency threshold alarms&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="45" y="305" width="460" height="60" as="geometry"/>
        </mxCell>

        <mxCell id="inc_box_pd" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#991B1B;&quot;&gt;🚨 PagerDuty &amp;amp; War Room Escalation&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;Instant automated on-call paging for data corruption&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#EF4444;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="535" y="305" width="470" height="60" as="geometry"/>
        </mxCell>

        <mxCell id="inc_box_rca" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#166534;&quot;&gt;🔄 Root Cause Analysis (RCA) Feedback Loop&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;&quot;&gt;Auto-updates Dataplex validation rules upon resolution&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#22C55E;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1035" y="305" width="510" height="60" as="geometry"/>
        </mxCell>


        <!-- ==================== THIRD ZONE: DATAPLEX INTEGRATED DATAOPS CONTROL PLANE ==================== -->
        <!-- x = 30 .. 1060, y = 395 .. 630 (height = 235) -->
        <mxCell id="box_dataplex_dataops" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#1E293B;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="395" width="1030" height="235" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_dataplex_ops_title" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;🛡️ DATAPLEX INTEGRATED DATAOPS CONTROL PLANE &amp;amp; ANOMALY DETECTION ENGINE&lt;/b&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="30" y="395" width="1030" height="30" as="geometry"/>
        </mxCell>

        <!-- SODA Quality Testing -->
        <mxCell id="box_soda" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#1E40AF;&quot;&gt;🧪 SODA Automated Quality Testing&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#334155;line-height:1.3;padding-top:2px;&quot;&gt;• Declarative SQL-based validation assertions&lt;br&gt;• Null-check, uniqueness &amp;amp; schema contract tests&lt;br&gt;• Continuous scoring output to Dataplex catalog&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=top;padding=4;" vertex="1" parent="1">
          <mxGeometry x="45" y="435" width="310" height="135" as="geometry"/>
        </mxCell>

        <!-- Center Anomaly Engine & Drift Monitor -->
        <mxCell id="box_engine" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#991B1B;&quot;&gt;🧠 Statistical Anomaly Engine&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#334155;line-height:1.3;padding-top:2px;&quot;&gt;• Active Schema Drift &amp;amp; Type Morphing Alarms&lt;br&gt;• Distribution Shift &amp;amp; Variance Detection&lt;br&gt;• Prevents corrupted data reaching downstream AI&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#EF4444;strokeWidth=1.5;align=left;verticalAlign=top;padding=4;" vertex="1" parent="1">
          <mxGeometry x="375" y="435" width="330" height="135" as="geometry"/>
        </mxCell>

        <!-- CARLO Continuous Observability -->
        <mxCell id="box_carlo" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#1E40AF;&quot;&gt;📈 Monte Carlo Observability Mesh&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#334155;line-height:1.3;padding-top:2px;&quot;&gt;• End-to-End Automated Lineage Tracking&lt;br&gt;• Real-time volume change &amp;amp; freshness tracking&lt;br&gt;• Blast-radius visualization for upstream bugs&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=top;padding=4;" vertex="1" parent="1">
          <mxGeometry x="725" y="435" width="320" height="135" as="geometry"/>
        </mxCell>

        <!-- Dataplex CSV & Reliability Guardrails Bar -->
        <mxCell id="bar_csv" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9.5px;font-weight:bold;color:#0F172A;&quot;&gt;🛡️ Computer System Validation (CSV) Checkpoints • Regulated GxP &amp;amp; 21 CFR Part 11 Audit Trail&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="45" y="580" width="1000" height="38" as="geometry"/>
        </mxCell>


        <!-- ==================== FOURTH ZONE: ENFORCED PIPELINE & CONSUMPTION ==================== -->
        <!-- x = 1080 .. 1560, y = 395 .. 630 (height = 235) -->
        <mxCell id="box_consumption_zone" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1080" y="395" width="480" height="235" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_consumption_title" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;✨ ENFORCED PIPELINE CONSUMPTION &amp;amp; AI GROUNDING&lt;/b&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#94A3B8;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1080" y="395" width="480" height="30" as="geometry"/>
        </mxCell>

        <!-- Validated GCS Storage -->
        <mxCell id="box_gcs_val" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;🗄️ Validated Cloud Storage (GCS) Lakes&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#475569;padding-top:2px;&quot;&gt;SOC 2 / CSV Certified Gold Tier Parquet Datasets&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1095" y="435" width="450" height="65" as="geometry"/>
        </mxCell>

        <!-- Vertex AI Grounding & Hallucination Prevention -->
        <mxCell id="box_vertex_ground" value="&lt;table style=&quot;width:100%;padding:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#047857;&quot;&gt;🧠 Vertex AI Model Grounding &amp;amp; Vector Search&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8.5px;color:#334155;line-height:1.3;padding-top:2px;&quot;&gt;• Strict prevention of LLM hallucinations via verified grounding data&lt;br&gt;• 100% traceable embeddings linked directly to certified source lineage&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ECFDF5;strokeColor=#A7F3D0;strokeWidth=1.5;align=left;verticalAlign=top;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1095" y="510" width="450" height="108" as="geometry"/>
        </mxCell>


        <!-- ==================== BOTTOM ZONE: UNIFIED MODERN DATA STACK ==================== -->
        <!-- x = 30 .. 1560, y = 645 .. 835 (height = 190) -->
        <mxCell id="box_data_stack_outer" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="645" width="1530" height="190" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_lakehouse_title" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;🗄️ UNIFIED MODERN DATA STACK (SOURCE INGESTION &amp;amp; LAKEHOUSE TIER)&lt;/b&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="30" y="645" width="1530" height="30" as="geometry"/>
        </mxCell>

        <!-- 6 Data Stack Components across 1530px -->
        <mxCell id="ds_bq" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:20px;&quot;&gt;🔍&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9.5px;font-weight:bold;color:#0F172A;&quot;&gt;BigQuery&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#475569;font-weight:normal;&quot;&gt;Analytics Lake&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="45" y="685" width="235" height="135" as="geometry"/>
        </mxCell>
        <mxCell id="ds_gcs" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:20px;&quot;&gt;🗄️&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9.5px;font-weight:bold;color:#0F172A;&quot;&gt;Cloud Storage&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#475569;font-weight:normal;&quot;&gt;Raw Object Lake&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="295" y="685" width="235" height="135" as="geometry"/>
        </mxCell>
        <mxCell id="ds_sql" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:20px;&quot;&gt;🛢️&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9.5px;font-weight:bold;color:#0F172A;&quot;&gt;Cloud SQL&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#475569;font-weight:normal;&quot;&gt;OLTP Relational DB&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="545" y="685" width="235" height="135" as="geometry"/>
        </mxCell>
        <mxCell id="ds_df" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:20px;&quot;&gt;⚡&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9.5px;font-weight:bold;color:#0F172A;&quot;&gt;Cloud Dataflow&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#475569;font-weight:normal;&quot;&gt;Beam Streaming ETL&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="795" y="685" width="235" height="135" as="geometry"/>
        </mxCell>
        <mxCell id="ds_dp" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:20px;&quot;&gt;⚙️&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9.5px;font-weight:bold;color:#0F172A;&quot;&gt;Cloud Dataproc&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#475569;font-weight:normal;&quot;&gt;Managed Spark Clusters&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1045" y="685" width="235" height="135" as="geometry"/>
        </mxCell>
        <mxCell id="ds_saas" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:20px;&quot;&gt;☁️&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:9.5px;font-weight:bold;color:#0F172A;&quot;&gt;External SaaS&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#475569;font-weight:normal;&quot;&gt;Salesforce / Workday APIs&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1295" y="685" width="250" height="135" as="geometry"/>
        </mxCell>


        <!-- ==================== FLOW CONNECTORS ==================== -->
        <!-- Ingestion to Testing & Engines -->
        <mxCell id="e_ds_soda" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#2563EB;strokeWidth=1.2;endArrow=classic;" edge="1" parent="1" source="ds_bq" target="box_soda"/>
        <mxCell id="e_gcs_soda" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#2563EB;strokeWidth=1.2;endArrow=classic;" edge="1" parent="1" source="ds_gcs" target="box_soda"/>
        <mxCell id="e_sql_soda" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#2563EB;strokeWidth=1.2;endArrow=classic;" edge="1" parent="1" source="ds_sql" target="box_soda"/>
        <mxCell id="e_df_engine" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#2563EB;strokeWidth=1.2;endArrow=classic;" edge="1" parent="1" source="ds_df" target="box_engine"/>
        <mxCell id="e_dp_carlo" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#2563EB;strokeWidth=1.2;endArrow=classic;" edge="1" parent="1" source="ds_dp" target="box_carlo"/>
        <mxCell id="e_saas_carlo" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#2563EB;strokeWidth=1.2;endArrow=classic;" edge="1" parent="1" source="ds_saas" target="box_carlo"/>

        <!-- Control Plane Interconnections -->
        <mxCell id="e_soda_engine" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#1D4ED8;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="box_soda" target="box_engine"/>
        <mxCell id="e_engine_carlo" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#1D4ED8;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="box_engine" target="box_carlo"/>

        <!-- Control Plane to Incident Management -->
        <mxCell id="e_carlo_mon" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#2563EB;strokeWidth=1.2;endArrow=classic;" edge="1" parent="1" source="box_carlo" target="inc_box_mon"/>
        <mxCell id="e_engine_pd" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#DC2626;strokeWidth=1.2;endArrow=classic;" edge="1" parent="1" source="box_engine" target="inc_box_pd"/>
        <mxCell id="e_pd_rca" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#16A34A;strokeWidth=1.2;endArrow=classic;" edge="1" parent="1" source="inc_box_pd" target="inc_box_rca"/>
        <mxCell id="e_rca_dataplex" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#16A34A;strokeWidth=1.2;endArrow=classic;dashed=1;" edge="1" parent="1" source="inc_box_rca" target="box_dataplex_dataops"/>

        <!-- Observability to Governance -->
        <mxCell id="e_mon_looker" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#2563EB;strokeWidth=1.2;endArrow=classic;" edge="1" parent="1" source="inc_box_mon" target="box_looker_dash"/>
        <mxCell id="e_cdo_looker" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.2;endArrow=classic;" edge="1" parent="1" source="top_cdo_box" target="box_looker_dash"/>
        <mxCell id="e_looker_sre" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.2;endArrow=classic;" edge="1" parent="1" source="box_looker_dash" target="top_sre_box"/>

        <!-- Control Plane to Validated Consumption & Grounding -->
        <mxCell id="e_dataplex_val" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#16A34A;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="box_dataplex_dataops" target="box_gcs_val"/>
        <mxCell id="e_val_ground" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#047857;strokeWidth=1.5;endArrow=classic;" edge="1" parent="1" source="box_gcs_val" target="box_vertex_ground"/>


        <!-- ==================== FOOTER LEGEND ==================== -->
        <mxCell id="legend_box" value="&lt;table style=&quot;width:100%;font-size:9.5px;color:#334155;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td&gt;&lt;b style=&quot;color:#0F172A;&quot;&gt;DataOps Fabric:&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🔵 &lt;b&gt;Dataplex Governance Control Plane&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🔴 &lt;b&gt;Anomaly &amp;amp; Schema Drift Alarms&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🟢 &lt;b&gt;Vertex AI Grounding Guard&lt;/b&gt;&lt;/td&gt;&lt;td&gt;📊 &lt;b&gt;Looker Studio Observability&lt;/b&gt;&lt;/td&gt;&lt;td&gt;✨ &lt;b style=&quot;color:#1D4ED8;&quot;&gt;Enterprise Data Quality Standard&lt;/b&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="30" y="850" width="1530" height="38" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
