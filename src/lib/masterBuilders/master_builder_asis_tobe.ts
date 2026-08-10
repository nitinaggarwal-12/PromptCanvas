export function buildAsIsToBeProcessFlowXml(): string {
  return `
<mxfile host="app.diagrams.net" modified="2026-08-10T16:15:00.000Z" agent="PromptCanvas" version="21.0.0" type="device">
  <diagram id="asis_vs_tobe_process_flow" name="WBS 0.1.1: As-Is vs. To-Be Process &amp; Architecture Flow">
    <mxGraphModel dx="1600" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1560" pageHeight="920" background="#FFFFFF">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- CANVAS BACKGROUND FRAME -->
        <mxCell id="frame_asis_tobe" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="0" y="0" width="1560" height="920" as="geometry" />
        </mxCell>

        <!-- TOP TITLE BANNER -->
        <mxCell id="hdr_box_left" value="&lt;div style=&quot;text-align:center;&quot;&gt;&lt;b style=&quot;font-size:15px;color:#0F172A;font-family:system-ui,-apple-system,sans-serif;&quot;&gt;WBS 0.1.1: Enterprise Modernization Process Flow (As-Is vs. To-Be)&lt;br&gt;&lt;span style=&quot;font-size:12px;color:#475569;font-weight:normal;&quot;&gt;(Cloud Migration &amp;amp; Gemini Enterprise Cognitive Transformation)&lt;/span&gt;&lt;/b&gt;&lt;/div&gt;" style="rounded=0;whiteSpace=wrap;html=1;strokeColor=#1E293B;strokeWidth=1.5;fillColor=#FFFFFF;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="20" y="15" width="560" height="52" as="geometry" />
        </mxCell>

        <mxCell id="hdr_box_right" value="&lt;div style=&quot;font-size:11.5px;color:#0F172A;font-family:system-ui,-apple-system,sans-serif;line-height:1.4;&quot;&gt;&lt;b style=&quot;color:#DC2626;&quot;&gt;As-Is:&lt;/b&gt; Legacy Siloed Batch DBs &amp;amp; Manual Review &amp;nbsp;|&amp;nbsp; &lt;b style=&quot;color:#16A34A;&quot;&gt;To-Be:&lt;/b&gt; Google Cloud Real-Time Lakehouse &amp;amp; Gemini 3.1 Pro&lt;br&gt;&lt;span style=&quot;background:#FEE2E2;color:#991B1B;padding:1px 6px;border-radius:4px;font-weight:bold;font-size:10px;&quot;&gt;Latency: 24h &amp;rarr; Sub-50ms&lt;/span&gt; &lt;span style=&quot;background:#DCFCE7;color:#15803D;padding:1px 6px;border-radius:4px;font-weight:bold;font-size:10px;&quot;&gt;OpEx Reduction: -68%&lt;/span&gt; &lt;span style=&quot;background:#E0F2FE;color:#0369A1;padding:1px 6px;border-radius:4px;font-weight:bold;font-size:10px;&quot;&gt;DORA High-Performer&lt;/span&gt;&lt;/div&gt;" style="rounded=0;whiteSpace=wrap;html=1;strokeColor=#CBD5E1;strokeWidth=1;fillColor=#F8FAFC;align=left;verticalAlign=middle;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="600" y="15" width="650" height="52" as="geometry" />
        </mxCell>

        <!-- GCAF METADATA TABLE -->
        <mxCell id="gcaf_table" value="&lt;table style=&quot;width:100%;font-size:9.5px;color:#0F172A;border-collapse:collapse;&quot;&gt;&lt;tr style=&quot;background:#F1F5F9;&quot;&gt;&lt;td style=&quot;padding:2px 4px;font-weight:bold;border-bottom:1px solid #CBD5E1;&quot;&gt;GCAF Pillar:&lt;/td&gt;&lt;td style=&quot;padding:2px 4px;border-bottom:1px solid #CBD5E1;&quot;&gt;Architecture Modernization&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;padding:2px 4px;font-weight:bold;border-bottom:1px solid #CBD5E1;&quot;&gt;Architecture State:&lt;/td&gt;&lt;td style=&quot;padding:2px 4px;border-bottom:1px solid #CBD5E1;&quot;&gt;Transition &amp;amp; Target State&lt;/td&gt;&lt;/tr&gt;&lt;tr style=&quot;background:#F1F5F9;&quot;&gt;&lt;td style=&quot;padding:2px 4px;font-weight:bold;border-bottom:1px solid #CBD5E1;&quot;&gt;Target Audience:&lt;/td&gt;&lt;td style=&quot;padding:2px 4px;border-bottom:1px solid #CBD5E1;&quot;&gt;CTO, Chief Architect, CDO&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;padding:2px 4px;font-weight:bold;&quot;&gt;Blueprint ID:&lt;/td&gt;&lt;td style=&quot;padding:2px 4px;&quot;&gt;asis_vs_tobe_process_flow&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1270" y="15" width="270" height="52" as="geometry" />
        </mxCell>

        <!-- ========================================================================= -->
        <!-- TOP ZONE: AS-IS (LEGACY ON-PREM & SILOED BATCH ARCHITECTURE) (Y: 78 to Y: 320) -->
        <!-- ========================================================================= -->
        <mxCell id="tab_asis" value="&lt;b style=&quot;font-size:12px;color:#991B1B;&quot;&gt;AS-IS&lt;br&gt;LEGACY&lt;br&gt;STATE&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:9.5px;color:#7F1D1D;&quot;&gt;(On-Prem / Siloed)&lt;/span&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FEE2E2;strokeColor=#EF4444;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="20" y="78" width="65" height="242" as="geometry" />
        </mxCell>

        <mxCell id="cont_asis" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFF5F5;strokeColor=#FCA5A5;strokeWidth=1;dashed=1;" vertex="1" parent="1">
          <mxGeometry x="85" y="78" width="1075" height="242" as="geometry" />
        </mxCell>

        <mxCell id="badge_asis_title" value="&lt;b style=&quot;color:#991B1B;font-size:11px;&quot;&gt;🔴 AS-IS: Fragile Monolithic Architecture &amp;amp; Multi-Week Human Bottlenecks&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="95" y="82" width="500" height="20" as="geometry" />
        </mxCell>

        <!-- As-Is Node 1: Legacy Mainframe & Monolith -->
        <mxCell id="node_legacy_ingress" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td align=&quot;center&quot;&gt;&lt;img src=&quot;https://api.iconify.design/lucide:server.svg&quot; width=&quot;24&quot; height=&quot;24&quot;/&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;padding-top:2px;&quot;&gt;Legacy Ingress&lt;br&gt;&lt;span style=&quot;font-size:9.5px;color:#7F1D1D;font-weight:normal;&quot;&gt;On-Prem VMs &amp;amp; Monolith&lt;br&gt;FTP / CSV File Drops&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#F87171;strokeWidth=1;align=center;verticalAlign=top;padding=4;" vertex="1" parent="1">
          <mxGeometry x="105" y="110" width="170" height="105" as="geometry" />
        </mxCell>

        <!-- As-Is Node 2: Overnight Batch ETL -->
        <mxCell id="node_legacy_etl" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td align=&quot;center&quot;&gt;&lt;img src=&quot;https://api.iconify.design/lucide:refresh-cw.svg&quot; width=&quot;24&quot; height=&quot;24&quot;/&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;padding-top:2px;&quot;&gt;Nightly Batch ETL&lt;br&gt;&lt;span style=&quot;font-size:9.5px;color:#7F1D1D;font-weight:normal;&quot;&gt;Informatica / SSIS Scripts&lt;br&gt;24-48h Data Lag • Fragile&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#F87171;strokeWidth=1;align=center;verticalAlign=top;padding=4;" vertex="1" parent="1">
          <mxGeometry x="325" y="110" width="175" height="105" as="geometry" />
        </mxCell>

        <!-- As-Is Node 3: Monolithic Relational DB -->
        <mxCell id="node_legacy_db" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td align=&quot;center&quot;&gt;&lt;img src=&quot;https://api.iconify.design/lucide:database.svg&quot; width=&quot;24&quot; height=&quot;24&quot;/&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;padding-top:2px;&quot;&gt;Legacy RDBMS Core&lt;br&gt;&lt;span style=&quot;font-size:9.5px;color:#7F1D1D;font-weight:normal;&quot;&gt;Oracle / Sybase DB&lt;br&gt;High Licensing • Single AZ&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=10;fillColor=#FFFFFF;strokeColor=#F87171;strokeWidth=1;align=center;verticalAlign=top;padding=4;" vertex="1" parent="1">
          <mxGeometry x="550" y="105" width="165" height="110" as="geometry" />
        </mxCell>

        <!-- As-Is Node 4: Manual Rules & Committee Reviews -->
        <mxCell id="node_legacy_review" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td align=&quot;center&quot;&gt;&lt;img src=&quot;https://api.iconify.design/lucide:users.svg&quot; width=&quot;24&quot; height=&quot;24&quot;/&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;padding-top:2px;&quot;&gt;Manual Review Gate&lt;br&gt;&lt;span style=&quot;font-size:9.5px;color:#7F1D1D;font-weight:normal;&quot;&gt;Static Spreadsheets &amp;amp; PDF&lt;br&gt;2-3 Weeks ARB Waiting&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#F87171;strokeWidth=1;align=center;verticalAlign=top;padding=4;" vertex="1" parent="1">
          <mxGeometry x="765" y="110" width="175" height="105" as="geometry" />
        </mxCell>

        <!-- As-Is Node 5: Legacy Static Reports -->
        <mxCell id="node_legacy_bi" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td align=&quot;center&quot;&gt;&lt;img src=&quot;https://api.iconify.design/lucide:file-bar-chart.svg&quot; width=&quot;24&quot; height=&quot;24&quot;/&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;padding-top:2px;&quot;&gt;Static BI Delivery&lt;br&gt;&lt;span style=&quot;font-size:9.5px;color:#7F1D1D;font-weight:normal;&quot;&gt;Cognos / SSRS Export&lt;br&gt;No AI Grounding • Stale&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#F87171;strokeWidth=1;align=center;verticalAlign=top;padding=4;" vertex="1" parent="1">
          <mxGeometry x="985" y="110" width="160" height="105" as="geometry" />
        </mxCell>

        <!-- As-Is Flow Arrows -->
        <mxCell id="edge_asis_1" value="Batch Dump&lt;br&gt;(Midnight)" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#EF4444;strokeWidth=1.5;fontColor=#B91C1C;fontSize=9;align=center;" edge="1" parent="1" source="node_legacy_ingress" target="node_legacy_etl">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_asis_2" value="Table Lock&lt;br&gt;ETL Load" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#EF4444;strokeWidth=1.5;fontColor=#B91C1C;fontSize=9;align=center;" edge="1" parent="1" source="node_legacy_etl" target="node_legacy_db">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_asis_3" value="Manual Ticket&lt;br&gt;Sign-off" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#EF4444;strokeWidth=1.5;fontColor=#B91C1C;fontSize=9;align=center;" edge="1" parent="1" source="node_legacy_db" target="node_legacy_review">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_asis_4" value="Manual Email&lt;br&gt;Distribution" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#EF4444;strokeWidth=1.5;fontColor=#B91C1C;fontSize=9;align=center;" edge="1" parent="1" source="node_legacy_review" target="node_legacy_bi">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- As-Is Bottom Pain Point Strip -->
        <mxCell id="asis_pain_points" value="&lt;table style=&quot;width:100%;font-size:9.5px;color:#7F1D1D;&quot;&gt;&lt;tr&gt;&lt;td&gt;&lt;b&gt;⚠️ Major Bottlenecks:&lt;/b&gt; Single point of failure • 100% manual ticket triage • No semantic grounding • Escalating license costs • 3-4 week lead times&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FEE2E2;strokeColor=#F87171;strokeWidth=1;align=left;spacingLeft=8;" vertex="1" parent="1">
          <mxGeometry x="105" y="235" width="1040" height="30" as="geometry" />
        </mxCell>

        <!-- ========================================================================= -->
        <!-- TRANSITION / MODERNIZATION STRANGLER BRIDGE (Y: 330 to Y: 375) -->
        <!-- ========================================================================= -->
        <mxCell id="bridge_bar" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#1E3A8A;&quot;&gt;⚡ GOOGLE CLOUD STRANGLER FIG MODERNIZATION BRIDGE &amp;nbsp;|&amp;nbsp; &lt;span style=&quot;font-weight:normal;color:#3B82F6;&quot;&gt;Apigee API Interceptor • Datastream CDC Ingestion • Gemini Enterprise AST Compiler&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#3B82F6;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="20" y="330" width="1140" height="38" as="geometry" />
        </mxCell>

        <!-- Transition Flow Downward Vectors with White Pills in Open Channel -->
        <mxCell id="down_vector_1" value="Strangler Proxy Ingress" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=1.5;dashed=1;fontColor=#1D4ED8;fontSize=9;align=center;labelBackgroundColor=#FFFFFF;labelBorderColor=#93C5FD;" edge="1" parent="1" source="asis_pain_points" target="node_tobe_ingress">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="190" y="300" />
              <mxPoint x="190" y="380" />
            </Array>
          </mxGeometry>
        </mxCell>

        <mxCell id="down_vector_2" value="Datastream CDC Sync" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=1.5;dashed=1;fontColor=#1D4ED8;fontSize=9;align=center;labelBackgroundColor=#FFFFFF;labelBorderColor=#93C5FD;" edge="1" parent="1" source="node_legacy_db" target="node_tobe_lakehouse">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="632" y="280" />
              <mxPoint x="632" y="340" />
              <mxPoint x="280" y="340" />
              <mxPoint x="280" y="560" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- ========================================================================= -->
        <!-- BOTTOM ZONE: TO-BE (GOOGLE CLOUD & GEMINI ENTERPRISE ARCHITECTURE) (Y: 380 to Y: 875) -->
        <!-- ========================================================================= -->
        <mxCell id="tab_tobe" value="&lt;b style=&quot;font-size:12px;color:#15803D;&quot;&gt;TO-BE&lt;br&gt;TARGET&lt;br&gt;STATE&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:9.5px;color:#166534;&quot;&gt;(GCP Native &amp;amp;&lt;br&gt;Gemini 3.1)&lt;/span&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="20" y="380" width="65" height="495" as="geometry" />
        </mxCell>

        <mxCell id="cont_tobe" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#86EFAC;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="85" y="380" width="1075" height="495" as="geometry" />
        </mxCell>

        <mxCell id="badge_tobe_title" value="&lt;b style=&quot;color:#15803D;font-size:11px;&quot;&gt;🟢 TO-BE: Autonomous Gemini Enterprise Cognitive Architecture &amp;amp; Real-Time Lakehouse Mesh&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="95" y="385" width="650" height="20" as="geometry" />
        </mxCell>

        <!-- To-Be Node 1: Cloud Pub/Sub & Edge Ingress -->
        <mxCell id="node_tobe_ingress" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td align=&quot;center&quot;&gt;&lt;img src=&quot;https://api.iconify.design/logos:google-cloud-pubsub.svg&quot; width=&quot;26&quot; height=&quot;26&quot;/&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;padding-top:2px;&quot;&gt;Real-Time Ingress&lt;br&gt;&lt;span style=&quot;font-size:9.5px;color:#166534;font-weight:normal;&quot;&gt;Cloud Pub/Sub Topics&lt;br&gt;Cloud Armor WAF &amp;amp; Apigee&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;align=center;verticalAlign=top;padding=4;" vertex="1" parent="1">
          <mxGeometry x="105" y="415" width="170" height="110" as="geometry" />
        </mxCell>

        <!-- To-Be Node 2: Cloud Dataflow Streaming Pipeline -->
        <mxCell id="node_tobe_stream" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td align=&quot;center&quot;&gt;&lt;img src=&quot;https://api.iconify.design/logos:google-cloud-dataflow.svg&quot; width=&quot;26&quot; height=&quot;26&quot;/&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;padding-top:2px;&quot;&gt;Streaming ETL Engine&lt;br&gt;&lt;span style=&quot;font-size:9.5px;color:#166534;font-weight:normal;&quot;&gt;Cloud Dataflow (Apache Beam)&lt;br&gt;Sub-50ms Exact-Once Windowing&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;align=center;verticalAlign=top;padding=4;" vertex="1" parent="1">
          <mxGeometry x="325" y="415" width="175" height="110" as="geometry" />
        </mxCell>

        <!-- To-Be Node 3: Gemini 3.1 Pro & Vertex AI Reasoning Hub -->
        <mxCell id="node_tobe_ai_hub" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td align=&quot;center&quot;&gt;&lt;img src=&quot;https://api.iconify.design/logos:google-gemini.svg&quot; width=&quot;28&quot; height=&quot;28&quot;/&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11.5px;font-weight:bold;color:#0F172A;padding-top:2px;&quot;&gt;Gemini 3.1 Pro Engine&lt;br&gt;&lt;span style=&quot;font-size:9.5px;color:#0284C7;font-weight:bold;&quot;&gt;Vertex AI Vector Search&lt;/span&gt;&lt;br&gt;&lt;span style=&quot;font-size:9px;color:#166534;&quot;&gt;Tangential Curved ReAct Loop&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=2;align=center;verticalAlign=top;padding=4;" vertex="1" parent="1">
          <mxGeometry x="550" y="415" width="175" height="110" as="geometry" />
        </mxCell>

        <!-- To-Be Node 4: Autonomous MCP & HITL Gate -->
        <mxCell id="node_tobe_gov" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td align=&quot;center&quot;&gt;&lt;img src=&quot;https://api.iconify.design/lucide:shield-check.svg&quot; width=&quot;26&quot; height=&quot;26&quot;/&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;padding-top:2px;&quot;&gt;AI TRiSM &amp;amp; HITL Gate&lt;br&gt;&lt;span style=&quot;font-size:9.5px;color:#15803D;font-weight:bold;&quot;&gt;&amp;gt;=95% Fast Path • &amp;lt;75% Escalation&lt;/span&gt;&lt;br&gt;&lt;span style=&quot;font-size:9px;color:#475569;&quot;&gt;21 CFR Part 11 Audit Trail&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;align=center;verticalAlign=top;padding=4;" vertex="1" parent="1">
          <mxGeometry x="775" y="415" width="175" height="110" as="geometry" />
        </mxCell>

        <!-- To-Be Node 5: Modern Serving & SRE Cockpit -->
        <mxCell id="node_tobe_serving" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td align=&quot;center&quot;&gt;&lt;img src=&quot;https://api.iconify.design/logos:google-cloud-run.svg&quot; width=&quot;26&quot; height=&quot;26&quot;/&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;padding-top:2px;&quot;&gt;Serverless Serving &amp;amp; BI&lt;br&gt;&lt;span style=&quot;font-size:9.5px;color:#166534;font-weight:normal;&quot;&gt;Cloud Run Microservices&lt;br&gt;Looker Studio SRE Cockpit&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;align=center;verticalAlign=top;padding=4;" vertex="1" parent="1">
          <mxGeometry x="990" y="415" width="160" height="110" as="geometry" />
        </mxCell>

        <!-- To-Be Flow Arrows (Horizontal Ingress Flow) -->
        <mxCell id="edge_tobe_1" value="Streaming Events&lt;br&gt;(Continuous)" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16A34A;strokeWidth=2;fontColor=#15803D;fontSize=9;align=center;" edge="1" parent="1" source="node_tobe_ingress" target="node_tobe_stream">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_tobe_2" value="Feature Vector&lt;br&gt;Extraction" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16A34A;strokeWidth=2;fontColor=#15803D;fontSize=9;align=center;" edge="1" parent="1" source="node_tobe_stream" target="node_tobe_ai_hub">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_tobe_3" value="Model Inference&lt;br&gt;&amp;amp; Grounding" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=2;fontColor=#1D4ED8;fontSize=9;align=center;" edge="1" parent="1" source="node_tobe_ai_hub" target="node_tobe_gov">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_tobe_4" value="Approved Action&lt;br&gt;&amp;amp; Dispatch" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16A34A;strokeWidth=2;fontColor=#15803D;fontSize=9;align=center;" edge="1" parent="1" source="node_tobe_gov" target="node_tobe_serving">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- TO-BE DATA LAKEHOUSE & ZERO-TRUST PERSISTENCE TIER (Sub-layer) -->
        <mxCell id="box_lakehouse_tier" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="105" y="555" width="1045" height="150" as="geometry" />
        </mxCell>
        <mxCell id="lbl_lakehouse_tier" value="&lt;b style=&quot;color:#0F172A;font-size:11px;&quot;&gt;🗄️ Unified Enterprise Lakehouse &amp;amp; Zero-Trust Data Mesh (VPC Service Controls Perimeter)&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="115" y="558" width="600" height="20" as="geometry" />
        </mxCell>

        <!-- BigQuery Lakehouse Card -->
        <mxCell id="node_tobe_lakehouse" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td align=&quot;center&quot;&gt;&lt;img src=&quot;https://api.iconify.design/logos:google-bigquery.svg&quot; width=&quot;26&quot; height=&quot;26&quot;/&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;padding-top:2px;&quot;&gt;BigQuery BigLake&lt;br&gt;&lt;span style=&quot;font-size:9px;color:#475569;font-weight:normal;&quot;&gt;Iceberg / Delta Tables&lt;br&gt;Storage Write API&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=8;fillColor=#F8FAFC;strokeColor=#0284C7;strokeWidth=1.5;align=center;verticalAlign=top;padding=4;" vertex="1" parent="1">
          <mxGeometry x="135" y="585" width="170" height="105" as="geometry" />
        </mxCell>

        <!-- AlloyDB HA Card -->
        <mxCell id="node_tobe_alloydb" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td align=&quot;center&quot;&gt;&lt;img src=&quot;https://api.iconify.design/logos:postgresql.svg&quot; width=&quot;24&quot; height=&quot;24&quot;/&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;padding-top:2px;&quot;&gt;AlloyDB for PostgreSQL&lt;br&gt;&lt;span style=&quot;font-size:9px;color:#475569;font-weight:normal;&quot;&gt;pgvector Vector Store&lt;br&gt;4x Faster OLTP • 99.99%&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#0284C7;strokeWidth=1;align=center;verticalAlign=top;padding=4;" vertex="1" parent="1">
          <mxGeometry x="345" y="585" width="175" height="105" as="geometry" />
        </mxCell>

        <!-- Dataplex Governance Card -->
        <mxCell id="node_tobe_dataplex" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td align=&quot;center&quot;&gt;&lt;img src=&quot;https://api.iconify.design/lucide:lock.svg&quot; width=&quot;24&quot; height=&quot;24&quot;/&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;padding-top:2px;&quot;&gt;Dataplex Data Fabric&lt;br&gt;&lt;span style=&quot;font-size:9px;color:#475569;font-weight:normal;&quot;&gt;ABAC Policy Control&lt;br&gt;Active Quality &amp;amp; Lineage&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#16A34A;strokeWidth=1;align=center;verticalAlign=top;padding=4;" vertex="1" parent="1">
          <mxGeometry x="560" y="585" width="175" height="105" as="geometry" />
        </mxCell>

        <!-- Cloud KMS & Secret Manager Card -->
        <mxCell id="node_tobe_kms" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td align=&quot;center&quot;&gt;&lt;img src=&quot;https://api.iconify.design/lucide:key.svg&quot; width=&quot;24&quot; height=&quot;24&quot;/&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;padding-top:2px;&quot;&gt;Cloud KMS &amp;amp; CMEK&lt;br&gt;&lt;span style=&quot;font-size:9px;color:#475569;font-weight:normal;&quot;&gt;Hardware HSM Keys&lt;br&gt;Envelope Encryption&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#7C3AED;strokeWidth=1;align=center;verticalAlign=top;padding=4;" vertex="1" parent="1">
          <mxGeometry x="775" y="585" width="165" height="105" as="geometry" />
        </mxCell>

        <!-- Cloud Operations Suite Card -->
        <mxCell id="node_tobe_monitoring" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td align=&quot;center&quot;&gt;&lt;img src=&quot;https://api.iconify.design/logos:google-cloud.svg&quot; width=&quot;24&quot; height=&quot;24&quot;/&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;padding-top:2px;&quot;&gt;Cloud Operations&lt;br&gt;&lt;span style=&quot;font-size:9px;color:#475569;font-weight:normal;&quot;&gt;Logging &amp;amp; Tracing&lt;br&gt;PagerDuty Integration&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#D97706;strokeWidth=1;align=center;verticalAlign=top;padding=4;" vertex="1" parent="1">
          <mxGeometry x="975" y="585" width="155" height="105" as="geometry" />
        </mxCell>

        <!-- Cross-Tier Bi-Directional Connectors -->
        <mxCell id="edge_lakehouse_sync" value="BigQuery Storage Write" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0284C7;strokeWidth=1.5;fontColor=#0369A1;fontSize=8.5;align=center;" edge="1" parent="1" source="node_tobe_stream" target="node_tobe_lakehouse">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="412" y="540" />
              <mxPoint x="220" y="540" />
            </Array>
          </mxGeometry>
        </mxCell>

        <mxCell id="edge_vector_sync" value="pgvector Grounding" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0284C7;strokeWidth=1.5;fontColor=#0369A1;fontSize=8.5;align=center;" edge="1" parent="1" source="node_tobe_ai_hub" target="node_tobe_alloydb">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="637" y="540" />
              <mxPoint x="432" y="540" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- To-Be Strategic Advantage Banner (Bottom) -->
        <mxCell id="tobe_advantages" value="&lt;table style=&quot;width:100%;font-size:9.5px;color:#15803D;&quot;&gt;&lt;tr&gt;&lt;td&gt;&lt;b&gt;🚀 Strategic Advantages:&lt;/b&gt; Real-time sub-second streaming • Gemini 3.1 Pro continuous reasoning • Automated HITL governance • 99.99% multi-region HA • 68% lower OpEx&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=1;align=left;spacingLeft=8;" vertex="1" parent="1">
          <mxGeometry x="105" y="830" width="1045" height="30" as="geometry" />
        </mxCell>

        <!-- ========================================================================= -->
        <!-- RIGHT PANEL: COMPREHENSIVE BUSINESS & TECHNICAL COMPARISON SCORECARD (X: 1170 to X: 1540) -->
        <!-- ========================================================================= -->
        <mxCell id="card_comparison_scorecard" value="&lt;table style=&quot;width:100%;font-size:10px;color:#0F172A;border-collapse:collapse;font-family:system-ui,-apple-system,sans-serif;&quot;&gt;&lt;tr style=&quot;background:#0F172A;color:#FFFFFF;&quot;&gt;&lt;td colspan=&quot;3&quot; style=&quot;padding:6px;font-weight:bold;text-align:center;&quot;&gt;Executive Transformation Scorecard&lt;/td&gt;&lt;/tr&gt;&lt;tr style=&quot;background:#F1F5F9;font-weight:bold;&quot;&gt;&lt;td style=&quot;padding:4px;border-bottom:1px solid #CBD5E1;&quot;&gt;Dimension&lt;/td&gt;&lt;td style=&quot;padding:4px;color:#991B1B;border-bottom:1px solid #CBD5E1;&quot;&gt;As-Is State&lt;/td&gt;&lt;td style=&quot;padding:4px;color:#15803D;border-bottom:1px solid #CBD5E1;&quot;&gt;To-Be State&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;padding:3px;font-weight:bold;border-bottom:1px solid #E2E8F0;&quot;&gt;Ingestion Latency&lt;/td&gt;&lt;td style=&quot;padding:3px;color:#DC2626;border-bottom:1px solid #E2E8F0;&quot;&gt;24-48h Batch&lt;/td&gt;&lt;td style=&quot;padding:3px;color:#16A34A;font-weight:bold;border-bottom:1px solid #E2E8F0;&quot;&gt;&amp;lt; 50ms Pub/Sub&lt;/td&gt;&lt;/tr&gt;&lt;tr style=&quot;background:#F8FAFC;&quot;&gt;&lt;td style=&quot;padding:3px;font-weight:bold;border-bottom:1px solid #E2E8F0;&quot;&gt;Processing Engine&lt;/td&gt;&lt;td style=&quot;padding:3px;color:#DC2626;border-bottom:1px solid #E2E8F0;&quot;&gt;Informatica ETL&lt;/td&gt;&lt;td style=&quot;padding:3px;color:#16A34A;font-weight:bold;border-bottom:1px solid #E2E8F0;&quot;&gt;Dataflow Beam&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;padding:3px;font-weight:bold;border-bottom:1px solid #E2E8F0;&quot;&gt;Intelligence / AI&lt;/td&gt;&lt;td style=&quot;padding:3px;color:#DC2626;border-bottom:1px solid #E2E8F0;&quot;&gt;None (Manual)&lt;/td&gt;&lt;td style=&quot;padding:3px;color:#16A34A;font-weight:bold;border-bottom:1px solid #E2E8F0;&quot;&gt;Gemini 3.1 Pro&lt;/td&gt;&lt;/tr&gt;&lt;tr style=&quot;background:#F8FAFC;&quot;&gt;&lt;td style=&quot;padding:3px;font-weight:bold;border-bottom:1px solid #E2E8F0;&quot;&gt;Data Storage&lt;/td&gt;&lt;td style=&quot;padding:3px;color:#DC2626;border-bottom:1px solid #E2E8F0;&quot;&gt;Oracle Monolith&lt;/td&gt;&lt;td style=&quot;padding:3px;color:#16A34A;font-weight:bold;border-bottom:1px solid #E2E8F0;&quot;&gt;BigQuery Lakehouse&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;padding:3px;font-weight:bold;border-bottom:1px solid #E2E8F0;&quot;&gt;Vector Search&lt;/td&gt;&lt;td style=&quot;padding:3px;color:#DC2626;border-bottom:1px solid #E2E8F0;&quot;&gt;Not Supported&lt;/td&gt;&lt;td style=&quot;padding:3px;color:#16A34A;font-weight:bold;border-bottom:1px solid #E2E8F0;&quot;&gt;Vertex AI Vector&lt;/td&gt;&lt;/tr&gt;&lt;tr style=&quot;background:#F8FAFC;&quot;&gt;&lt;td style=&quot;padding:3px;font-weight:bold;border-bottom:1px solid #E2E8F0;&quot;&gt;Governance &amp;amp; Trust&lt;/td&gt;&lt;td style=&quot;padding:3px;color:#DC2626;border-bottom:1px solid #E2E8F0;&quot;&gt;Spreadsheet Log&lt;/td&gt;&lt;td style=&quot;padding:3px;color:#16A34A;font-weight:bold;border-bottom:1px solid #E2E8F0;&quot;&gt;Dataplex + TRiSM&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;padding:3px;font-weight:bold;border-bottom:1px solid #E2E8F0;&quot;&gt;Compliance Proof&lt;/td&gt;&lt;td style=&quot;padding:3px;color:#DC2626;border-bottom:1px solid #E2E8F0;&quot;&gt;Manual Audit&lt;/td&gt;&lt;td style=&quot;padding:3px;color:#16A34A;font-weight:bold;border-bottom:1px solid #E2E8F0;&quot;&gt;21 CFR Part 11&lt;/td&gt;&lt;/tr&gt;&lt;tr style=&quot;background:#F8FAFC;&quot;&gt;&lt;td style=&quot;padding:3px;font-weight:bold;border-bottom:1px solid #E2E8F0;&quot;&gt;Deployment Lead Time&lt;/td&gt;&lt;td style=&quot;padding:3px;color:#DC2626;border-bottom:1px solid #E2E8F0;&quot;&gt;3-4 Weeks&lt;/td&gt;&lt;td style=&quot;padding:3px;color:#16A34A;font-weight:bold;border-bottom:1px solid #E2E8F0;&quot;&gt;&amp;lt; 30 Minutes&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;padding:3px;font-weight:bold;border-bottom:1px solid #E2E8F0;&quot;&gt;Service Availability&lt;/td&gt;&lt;td style=&quot;padding:3px;color:#DC2626;border-bottom:1px solid #E2E8F0;&quot;&gt;99.5% Single-AZ&lt;/td&gt;&lt;td style=&quot;padding:3px;color:#16A34A;font-weight:bold;border-bottom:1px solid #E2E8F0;&quot;&gt;99.99% Multi-Region&lt;/td&gt;&lt;/tr&gt;&lt;tr style=&quot;background:#DCFCE7;&quot;&gt;&lt;td style=&quot;padding:4px;font-weight:bold;color:#15803D;&quot;&gt;Total Annual OpEx&lt;/td&gt;&lt;td style=&quot;padding:4px;color:#DC2626;font-weight:bold;&quot;&gt;$1,240,000&lt;/td&gt;&lt;td style=&quot;padding:4px;color:#15803D;font-weight:bold;&quot;&gt;$395,000 (-68%)&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#1E293B;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1170" y="78" width="370" height="390" as="geometry" />
        </mxCell>

        <!-- COMPLIANCE & CERTIFICATION MEDALS -->
        <mxCell id="box_medals" value="&lt;table style=&quot;width:100%;text-align:center;font-size:9.5px;color:#0F172A;&quot;&gt;&lt;tr&gt;&lt;td align=&quot;center&quot;&gt;&lt;span style=&quot;background:#DCFCE7;color:#15803D;padding:3px 8px;border-radius:12px;font-weight:bold;&quot;&gt;🟢 SOC 2 Type II&lt;/span&gt;&lt;/td&gt;&lt;td align=&quot;center&quot;&gt;&lt;span style=&quot;background:#E0F2FE;color:#0369A1;padding:3px 8px;border-radius:12px;font-weight:bold;&quot;&gt;🔵 HIPAA &amp;amp; GDPR&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td align=&quot;center&quot; style=&quot;padding-top:6px;&quot;&gt;&lt;span style=&quot;background:#FEF3C7;color:#B45309;padding:3px 8px;border-radius:12px;font-weight:bold;&quot;&gt;🟡 ISO 27001&lt;/span&gt;&lt;/td&gt;&lt;td align=&quot;center&quot; style=&quot;padding-top:6px;&quot;&gt;&lt;span style=&quot;background:#F3E8FF;color:#7C3AED;padding:3px 8px;border-radius:12px;font-weight:bold;&quot;&gt;🟣 GxP Validated&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#94A3B8;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1170" y="480" width="370" height="90" as="geometry" />
        </mxCell>

        <!-- AS-IS VS TO-BE SYMBOLOGY LEGEND -->
        <mxCell id="box_legend" value="&lt;table style=&quot;width:100%;font-size:9px;color:#0F172A;border-collapse:collapse;&quot;&gt;&lt;tr style=&quot;background:#F1F5F9;&quot;&gt;&lt;td colspan=&quot;2&quot; style=&quot;padding:3px 6px;font-weight:bold;text-align:center;border-bottom:1px solid #CBD5E1;&quot;&gt;Legend &amp;amp; Connectors&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;padding:2px 4px;color:#DC2626;font-weight:bold;&quot;&gt;&amp;rarr; Red Vector:&lt;/td&gt;&lt;td style=&quot;padding:2px 4px;&quot;&gt;As-Is Fragile Batch Path&lt;/td&gt;&lt;/tr&gt;&lt;tr style=&quot;background:#F8FAFC;&quot;&gt;&lt;td style=&quot;padding:2px 4px;color:#2563EB;font-weight:bold;&quot;&gt;&amp;dash;&amp;dash;&amp;gt; Blue Vector:&lt;/td&gt;&lt;td style=&quot;padding:2px 4px;&quot;&gt;Strangler Transition Path&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;padding:2px 4px;color:#16A34A;font-weight:bold;&quot;&gt;&amp;rarr; Green Vector:&lt;/td&gt;&lt;td style=&quot;padding:2px 4px;&quot;&gt;To-Be Real-Time Mesh Path&lt;/td&gt;&lt;/tr&gt;&lt;tr style=&quot;background:#F8FAFC;&quot;&gt;&lt;td style=&quot;padding:2px 4px;color:#7C3AED;font-weight:bold;&quot;&gt;&amp;#9632; Purple Box:&lt;/td&gt;&lt;td style=&quot;padding:2px 4px;&quot;&gt;Gemini AI Reasoning Hub&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1170" y="580" width="370" height="120" as="geometry" />
        </mxCell>

        <!-- ROI & PAYBACK CALLOUT -->
        <mxCell id="box_roi_callout" value="&lt;div style=&quot;text-align:center;&quot;&gt;&lt;b style=&quot;font-size:12px;color:#15803D;&quot;&gt;💰 Modernization ROI: 310% in Year 1&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:9.5px;color:#334155;&quot;&gt;Payback Period: 3.8 Months &amp;bull; MTTR Cut by 82%&lt;br&gt;Zero-Downtime Migration via Apigee Strangler Fig&lt;/span&gt;&lt;/div&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1170" y="710" width="370" height="65" as="geometry" />
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
  `.trim();
}
