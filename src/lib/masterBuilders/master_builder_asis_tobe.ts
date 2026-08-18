export function buildAsIsToBeProcessFlowXml(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="app.diagrams.net" modified="2026-08-10T16:35:00.000Z" agent="PromptCanvas" version="21.0.0" type="device">
  <diagram id="asis_vs_tobe_process_flow" name="As-Is vs. To-Be Process &amp; Architecture Flow">
    <mxGraphModel dx="1760" dy="1050" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1780" pageHeight="1050" background="#FFFFFF">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- ==================== TOP TITLE & METRICS BANNER ==================== -->
        <mxCell id="top_logo" value="&lt;span style=&quot;font-size:26px;&quot;&gt;🔄 🚀&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="35" y="14" width="40" height="40" as="geometry"/>
        </mxCell>
        <mxCell id="hdr_box_left" value="&lt;b style=&quot;font-size:18px;color:#0F172A;&quot;&gt;ENTERPRISE ARCHITECTURE MODERNIZATION FLOW (AS-IS vs. TO-BE PROCESS)&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="85" y="12" width="1350" height="24" as="geometry"/>
        </mxCell>
        <mxCell id="main_subtitle" value="&lt;span style=&quot;font-size:11.5px;color:#475569;font-weight:600;&quot;&gt;On-Premises Monolithic Batch Pipeline $\rightarrow$ Google Cloud Lakehouse &amp;amp; Gemini Enterprise Real-Time Cognitive Mesh (Latency -99.9%, OpEx -68%)&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="85" y="36" width="1350" height="20" as="geometry"/>
        </mxCell>
        <mxCell id="top_gemini_badge" value="&lt;b style=&quot;font-size:14px;color:#2563EB;&quot;&gt;To-Be Architecture&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Modern Cloud State&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1540" y="14" width="190" height="44" as="geometry"/>
        </mxCell>

        <!-- ==================== TOP SWIMLANE: AS-IS CURRENT STATE ==================== -->
        <mxCell id="cont_asis" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#FFFBFB;strokeColor=#F87171;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="35" y="75" width="1685" height="380" as="geometry"/>
        </mxCell>
        <mxCell id="badge_asis_title" value="&lt;b style=&quot;color:#991B1B;font-size:12px;&quot;&gt;🔴 AS-IS CURRENT STATE: Fragile On-Prem Monolith &amp;amp; 24-48h Nightly Batch ETL Latency&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEE2E2;strokeColor=#EF4444;strokeWidth=1.2;align=left;verticalAlign=middle;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="45" y="85" width="1665" height="32" as="geometry"/>
        </mxCell>

        <mxCell id="node_legacy_ingress" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#0F172A;&quot;&gt;1. Legacy Ingress (On-Prem VMs)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#7F1D1D;line-height:1.4;padding-top:4px;&quot;&gt;• Manual SFTP / FTP File Drops&lt;br&gt;• Siloed Data Sources (No Global View)&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#EF4444;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="60" y="140" width="340" height="110" as="geometry"/>
        </mxCell>

        <mxCell id="node_legacy_etl" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#0F172A;&quot;&gt;2. Nightly Batch ETL Scripts&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#7F1D1D;line-height:1.4;padding-top:4px;&quot;&gt;• Informatica / SSIS 8-Hour Execution Window&lt;br&gt;• Frequent Job Failures &amp;amp; Production DB Locks&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#EF4444;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="460" y="140" width="360" height="110" as="geometry"/>
        </mxCell>

        <mxCell id="node_legacy_db" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#0F172A;&quot;&gt;3. Legacy RDBMS Core Monolith&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#7F1D1D;line-height:1.4;padding-top:4px;&quot;&gt;• Oracle 11g / Sybase Single-AZ Cluster&lt;br&gt;• Escalating License Fees ($1.24M/yr)&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=6;fillColor=#FFFFFF;strokeColor=#EF4444;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="880" y="135" width="340" height="120" as="geometry"/>
        </mxCell>

        <mxCell id="node_legacy_review" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#0F172A;&quot;&gt;4. Manual Spreadsheet Reviews&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#7F1D1D;line-height:1.4;padding-top:4px;&quot;&gt;• Static SSRS / Cognos PDF Reports&lt;br&gt;• 2-3 Week Lead Time for Ad-hoc Insights&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#EF4444;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1300" y="140" width="340" height="110" as="geometry"/>
        </mxCell>

        <!-- As-Is Connectors -->
        <mxCell id="edge_asis_1" value="Midnight Dump" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#EF4444;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#FCA5A5;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="node_legacy_ingress" target="node_legacy_etl">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="edge_asis_2" value="Table Lock Load" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#EF4444;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#FCA5A5;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="node_legacy_etl" target="node_legacy_db">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="edge_asis_3" value="Manual Export" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#EF4444;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#FCA5A5;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="node_legacy_db" target="node_legacy_review">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- As-Is Pain Point Strip -->
        <mxCell id="asis_pain_points" value="&lt;table style=&quot;width:100%;font-size:10.5px;color:#7F1D1D;&quot;&gt;&lt;tr&gt;&lt;td&gt;⚠️ &lt;b&gt;As-Is Bottlenecks:&lt;/b&gt; Single point of failure • 100% manual ticket triage • No semantic AI grounding • Escalating license costs ($1.24M/yr) • 3-4 week lead times&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEE2E2;strokeColor=#F87171;strokeWidth=1;align=left;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="60" y="280" width="1580" height="40" as="geometry"/>
        </mxCell>

        <!-- ==================== STRANGLER BRIDGE DIVIDER ==================== -->
        <mxCell id="bridge_bar" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12.5px;font-weight:bold;color:#1E3A8A;&quot;&gt;⚡ GOOGLE CLOUD STRANGLER FIG MODERNIZATION BRIDGE: Apigee Edge Proxy • Datastream CDC Ingestion • Gemini Code Assist&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#3B82F6;strokeWidth=1.8;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="35" y="475" width="1685" height="40" as="geometry"/>
        </mxCell>

        <!-- ==================== BOTTOM SWIMLANE: TO-BE MODERN STATE ==================== -->
        <mxCell id="cont_tobe" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#22C55E;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="35" y="535" width="1685" height="430" as="geometry"/>
        </mxCell>
        <mxCell id="badge_tobe_title" value="&lt;b style=&quot;color:#15803D;font-size:12px;&quot;&gt;🟢 TO-BE MODERN CLOUD ARCHITECTURE: Real-Time Pub/Sub Streaming, BigQuery Lakehouse &amp;amp; Gemini 3.7 Cognitive Copilot&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=1.2;align=left;verticalAlign=middle;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="45" y="545" width="1665" height="32" as="geometry"/>
        </mxCell>

        <mxCell id="node_tobe_ingress" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#15803D;&quot;&gt;1. Apigee &amp;amp; Cloud Pub/Sub&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#166534;line-height:1.4;padding-top:4px;&quot;&gt;• Real-time Streaming Event Ingestion&lt;br&gt;• Millions QPS Autoscaling Buffer&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="60" y="605" width="340" height="110" as="geometry"/>
        </mxCell>

        <mxCell id="node_tobe_dataflow" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#15803D;&quot;&gt;2. Serverless Cloud Dataflow&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#166534;line-height:1.4;padding-top:4px;&quot;&gt;• Exactly-Once Stream Processing (Beam)&lt;br&gt;• Sub-50ms Processing Latency&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="460" y="605" width="360" height="110" as="geometry"/>
        </mxCell>

        <mxCell id="node_tobe_lakehouse" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#15803D;&quot;&gt;3. BigQuery &amp;amp; AlloyDB Lakehouse&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#166534;line-height:1.4;padding-top:4px;&quot;&gt;• Unified Storage &amp;amp; Analytical Layer&lt;br&gt;• 99.99% Multi-Region SLA&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=6;fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="880" y="600" width="340" height="120" as="geometry"/>
        </mxCell>

        <mxCell id="node_tobe_gemini" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#854D0E;&quot;&gt;4. Gemini 3.7 Pro Cognitive Agent&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#713F12;line-height:1.4;padding-top:4px;&quot;&gt;• Automated Real-time Reasoning &amp;amp; Triage&lt;br&gt;• Looker Interactive Conversational BI&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF08A;strokeColor=#EAB308;strokeWidth=2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1300" y="605" width="340" height="110" as="geometry"/>
        </mxCell>

        <!-- To-Be Connectors -->
        <mxCell id="edge_tobe_1" value="Stream Ingest" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#16A34A;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#86EFAC;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="node_tobe_ingress" target="node_tobe_dataflow">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="edge_tobe_2" value="Storage Write API" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#16A34A;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#86EFAC;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="node_tobe_dataflow" target="node_tobe_lakehouse">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="edge_tobe_3" value="Cognitive Analysis" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#D97706;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#FDE68A;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="node_tobe_lakehouse" target="node_tobe_gemini">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- To-Be Value Strip -->
        <mxCell id="tobe_value_points" value="&lt;table style=&quot;width:100%;font-size:10.5px;color:#15803D;&quot;&gt;&lt;tr&gt;&lt;td&gt;✨ &lt;b&gt;To-Be Business Value:&lt;/b&gt; -99.9% latency reduction • Real-time stream processing • Autonomous AI incident triage • -68% OpEx cost reduction ($395k/yr) • Instant decision-making&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#86EFAC;strokeWidth=1;align=left;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="60" y="745" width="1580" height="40" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
