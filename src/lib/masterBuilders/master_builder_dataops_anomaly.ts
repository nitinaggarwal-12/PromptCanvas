/**
 * 🏛️ MASTER BLUEPRINT 4: WBS 3.1.7 DATAOPS & ANOMALY DETECTION ARCHITECTURE
 * Pixel-Perfect Replica of WBS 3.1.7 DataOps & Anomaly Detection Architecture (To-Be State)
 */

export function buildDataOpsAnomalyDetectionXml(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="app.diagrams.net" modified="2026-04-01T00:00:00.000Z" agent="PromptCanvas" version="24.0.0" type="device">
  <diagram id="dataops_anomaly_detection" name="WBS 3.1.7: DataOps &amp; Anomaly Detection Architecture">
    <mxGraphModel dx="1600" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1620" pageHeight="950" background="#FFFFFF">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- MAIN TITLE (TOP LEFT) -->
        <mxCell id="main_title" value="&lt;b style=&quot;font-size:24px;color:#0F172A;font-family:sans-serif;&quot;&gt;WBS 3.1.7: DataOps &amp;amp; Anomaly Detection Architecture (To-Be State)&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="30" y="16" width="1150" height="36" as="geometry"/>
        </mxCell>

        <!-- ==================== LEFT TIER SIDEBAR BARS ==================== -->
        <!-- Tier 1 Sidebar -->
        <mxCell id="tier1_bar" value="&lt;b style=&quot;font-size:11.5px;color:#0F172A;&quot;&gt;Top Zone:&lt;br&gt;Strategy &amp;amp; Observability&lt;br&gt;Dashboard&lt;/b&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=none;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="20" y="65" width="180" height="150" as="geometry"/>
        </mxCell>

        <!-- Tier 2 Sidebar -->
        <mxCell id="tier2_bar" value="&lt;b style=&quot;font-size:11.5px;color:#0F172A;&quot;&gt;Second Zone:&lt;br&gt;Incident Management&lt;br&gt;&amp;amp; SRE View&lt;/b&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=none;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="20" y="222" width="180" height="85" as="geometry"/>
        </mxCell>

        <!-- Tier 3 & 4 Sidebar -->
        <mxCell id="tier3_bar" value="&lt;b style=&quot;font-size:11.5px;color:#0F172A;&quot;&gt;Third Zone (The Core)&lt;br&gt;DataOps Control Plane&lt;br&gt;&amp;amp; Anomaly Detection&lt;br&gt;&lt;br&gt;Fourth Zone:&lt;br&gt;Enforced Pipeline&lt;br&gt;&amp;amp; Consumption&lt;/b&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=none;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="20" y="315" width="180" height="225" as="geometry"/>
        </mxCell>

        <!-- Tier 5 Sidebar -->
        <mxCell id="tier5_bar" value="&lt;b style=&quot;font-size:11.5px;color:#0F172A;&quot;&gt;Bottom Zone:&lt;br&gt;Unified Modern&lt;br&gt;Data Stack&lt;/b&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=none;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="20" y="548" width="180" height="180" as="geometry"/>
        </mxCell>

        <!-- Horizontal Tier Dividers -->
        <mxCell id="div_t1" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#CBD5E1;strokeWidth=1;dashed=1;endArrow=none;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="20" y="218" as="sourcePoint"/><mxPoint x="1450" y="218" as="targetPoint"/></mxGeometry></mxCell>
        <mxCell id="div_t2" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#CBD5E1;strokeWidth=1;dashed=1;endArrow=none;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="20" y="310" as="sourcePoint"/><mxPoint x="1450" y="310" as="targetPoint"/></mxGeometry></mxCell>
        <mxCell id="div_t3" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#CBD5E1;strokeWidth=1;dashed=1;endArrow=none;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="20" y="543" as="sourcePoint"/><mxPoint x="1450" y="543" as="targetPoint"/></mxGeometry></mxCell>


        <!-- ==================== TOP ZONE: STRATEGY & OBSERVABILITY ==================== -->
        <!-- CDO & Data Architect -->
        <mxCell id="top_cdo" value="&lt;font style=&quot;font-size:20px;&quot;&gt;👤&lt;/font&gt;&lt;br&gt;&lt;b style=&quot;font-size:9px;color:#0F172A;&quot;&gt;CDO&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="220" y="80" width="45" height="50" as="geometry"/>
        </mxCell>
        <mxCell id="top_arch" value="&lt;font style=&quot;font-size:20px;&quot;&gt;👥&lt;/font&gt;&lt;br&gt;&lt;b style=&quot;font-size:9px;color:#0F172A;&quot;&gt;Data&lt;br&gt;Architect&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="285" y="80" width="55" height="50" as="geometry"/>
        </mxCell>
        <mxCell id="edge_cdo_to_arch" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endFill=1;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="265" y="102" as="sourcePoint"/><mxPoint x="285" y="102" as="targetPoint"/></mxGeometry></mxCell>

        <!-- SRE Ops Lead Observe -->
        <mxCell id="top_sre" value="&lt;font style=&quot;font-size:20px;&quot;&gt;👤&lt;/font&gt;&lt;br&gt;&lt;b style=&quot;font-size:8px;color:#0F172A;&quot;&gt;SRE Ops Lead&lt;/b&gt;&amp;nbsp;&lt;font style=&quot;font-size:7.5px;color:#475569;&quot;&gt;Observe&lt;/font&gt;" style="text;html=1;align=center;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="220" y="150" width="125" height="40" as="geometry"/>
        </mxCell>

        <!-- Looker Studio Dashboard Centerpiece -->
        <mxCell id="box_looker_dash" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#475569;strokeWidth=1.2;arcSize=2;" vertex="1" parent="1">
          <mxGeometry x="365" y="68" width="370" height="142" as="geometry"/>
        </mxCell>
        <mxCell id="looker_dash_header" value="&lt;div style=&quot;font-size:8px;color:#334155;background:#F8FAFC;border-bottom:1px solid #E2E8F0;padding:2px 6px;display:flex;justify-content:space-between;&quot;&gt;&lt;span&gt;&lt;b&gt;📊 Looker Studio&lt;/b&gt;&lt;/span&gt;&lt;span style=&quot;color:#64748B;&quot;&gt;Search | Filter | Realtime&lt;/span&gt;&lt;/div&gt;" style="text;html=1;align=left;verticalAlign=top;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="365" y="68" width="370" height="20" as="geometry"/>
        </mxCell>

        <!-- Looker Top 4 Metrics -->
        <mxCell id="m_freshness" value="&lt;font style=&quot;font-size:6.5px;color:#0F172A;&quot;&gt;&lt;b&gt;Data Freshness&lt;/b&gt;&lt;br&gt;(per 24h)&lt;br&gt;📊 &lt;span style=&quot;color:#16A34A;&quot;&gt;Optimal&lt;/span&gt;&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="372" y="92" width="82" height="48" as="geometry"/>
        </mxCell>
        <mxCell id="m_schema" value="&lt;font style=&quot;font-size:6.5px;color:#0F172A;&quot;&gt;&lt;b&gt;Schema Evolution&lt;/b&gt;&lt;br&gt;(Drift logs)&lt;br&gt;📈 &lt;span style=&quot;color:#0284C7;&quot;&gt;Stable&lt;/span&gt;&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="460" y="92" width="82" height="48" as="geometry"/>
        </mxCell>
        <mxCell id="m_volume" value="&lt;font style=&quot;font-size:6.5px;color:#0F172A;&quot;&gt;&lt;b&gt;Volume Anomalies&lt;/b&gt;&lt;br&gt;(by stream)&lt;br&gt;📉 &lt;span style=&quot;color:#DC2626;&quot;&gt;0 Alerts&lt;/span&gt;&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="548" y="92" width="88" height="48" as="geometry"/>
        </mxCell>
        <mxCell id="m_dist" value="&lt;font style=&quot;font-size:6.5px;color:#0F172A;&quot;&gt;&lt;b&gt;Distribution Shifts&lt;/b&gt;&lt;br&gt;(key column)&lt;br&gt;📊 &lt;span style=&quot;color:#16A34A;&quot;&gt;99.8%&lt;/span&gt;&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="642" y="92" width="86" height="48" as="geometry"/>
        </mxCell>

        <!-- Looker Bottom 4 Metrics -->
        <mxCell id="m_vol_an" value="&lt;font style=&quot;font-size:6.5px;color:#0F172A;&quot;&gt;&lt;b&gt;Volume Analysis&lt;/b&gt;&lt;br&gt;(by doc/xml)&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="372" y="146" width="82" height="56" as="geometry"/>
        </mxCell>
        <mxCell id="m_data_ev" value="&lt;font style=&quot;font-size:6.5px;color:#0F172A;&quot;&gt;&lt;b&gt;Data Evolution&lt;/b&gt;&lt;br&gt;(key columns)&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="460" y="146" width="82" height="56" as="geometry"/>
        </mxCell>
        <mxCell id="m_dist_sh" value="&lt;font style=&quot;font-size:6.5px;color:#0F172A;&quot;&gt;&lt;b&gt;Distribution Shifts&lt;/b&gt;&lt;br&gt;(by volume)&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="548" y="146" width="88" height="56" as="geometry"/>
        </mxCell>
        <mxCell id="m_hallucination" value="&lt;font style=&quot;font-size:6.5px;color:#0F172A;&quot;&gt;&lt;b&gt;Hallucination&lt;br&gt;Prevention Score&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:13px;color:#16A34A;font-weight:bold;&quot;&gt;105&lt;/span&gt;&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#86EFAC;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="642" y="146" width="86" height="56" as="geometry"/>
        </mxCell>

        <!-- Looker Logo Callout -->
        <mxCell id="looker_brand" value="&lt;font style=&quot;font-size:22px;&quot;&gt;📊&lt;/font&gt;&lt;br&gt;&lt;b style=&quot;font-size:9.5px;color:#0F172A;&quot;&gt;Looker Studio&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size:8px;color:#475569;&quot;&gt;(Visualization &amp;amp;&lt;br&gt;Reporting)&lt;/font&gt;" style="text;html=1;align=center;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="750" y="100" width="105" height="70" as="geometry"/>
        </mxCell>

        <!-- Top Right Metadata Table -->
        <mxCell id="box_top_meta_table" value="&lt;table style=&quot;font-size:8.5px;color:#0F172A;width:100%;border-collapse:collapse;&quot; border=&quot;1&quot;&gt;&lt;tr&gt;&lt;td style=&quot;background:#F1F5F9;padding:2px 5px;&quot;&gt;&lt;b&gt;GCAF Pillar&lt;/b&gt;&lt;/td&gt;&lt;td style=&quot;padding:2px 5px;&quot;&gt;Reliability&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;background:#F1F5F9;padding:2px 5px;&quot;&gt;&lt;b&gt;Phase&lt;/b&gt;&lt;/td&gt;&lt;td style=&quot;padding:2px 5px;&quot;&gt;Project Plan Foundation&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;background:#F1F5F9;padding:2px 5px;&quot;&gt;&lt;b&gt;Creator&lt;/b&gt;&lt;/td&gt;&lt;td style=&quot;padding:2px 5px;&quot;&gt;3. Data Architect&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;background:#F1F5F9;padding:2px 5px;&quot;&gt;&lt;b&gt;Target Audience&lt;/b&gt;&lt;/td&gt;&lt;td style=&quot;padding:2px 5px;&quot;&gt;SREs, Data Engs&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;background:#F1F5F9;padding:2px 5px;&quot;&gt;&lt;b&gt;Tech Stack&lt;/b&gt;&lt;/td&gt;&lt;td style=&quot;padding:2px 5px;&quot;&gt;Modern Data Stack (Monte Carlo, Soda)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;background:#F1F5F9;padding:2px 5px;&quot;&gt;&lt;b&gt;Compliance&lt;/b&gt;&lt;/td&gt;&lt;td style=&quot;padding:2px 5px;&quot;&gt;SOC 2, CSV&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;background:#F1F5F9;padding:2px 5px;&quot;&gt;&lt;b&gt;Update Freq&lt;/b&gt;&lt;/td&gt;&lt;td style=&quot;padding:2px 5px;&quot;&gt;Quarterly&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;background:#F1F5F9;padding:2px 5px;&quot;&gt;&lt;b&gt;Purpose&lt;/b&gt;&lt;/td&gt;&lt;td style=&quot;padding:2px 5px;&quot;&gt;Quality testing, schema drift&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;background:#F1F5F9;padding:2px 5px;&quot;&gt;&lt;b&gt;Medium&lt;/b&gt;&lt;/td&gt;&lt;td style=&quot;padding:2px 5px;&quot;&gt;Quality testing, schema drift, prevents hallucination from bad data&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#475569;strokeWidth=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="870" y="68" width="410" height="142" as="geometry"/>
        </mxCell>


        <!-- ==================== SECOND ZONE: INCIDENT MANAGEMENT & SRE VIEW ==================== -->
        <mxCell id="sre_agent_icon" value="&lt;font style=&quot;font-size:22px;&quot;&gt;🎧👤&lt;/font&gt;&lt;br&gt;&lt;b style=&quot;font-size:9px;color:#0F172A;&quot;&gt;SRE&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="220" y="235" width="45" height="50" as="geometry"/>
        </mxCell>
        <mxCell id="sre_pose_lbl" value="&lt;font style=&quot;font-size:7.5px;color:#475569;&quot;&gt;Standard&lt;br&gt;Pose va&lt;br&gt;Data Eng&lt;/font&gt;" style="text;html=1;align=left;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="268" y="238" width="45" height="42" as="geometry"/>
        </mxCell>

        <!-- Incidents Row Boxes -->
        <mxCell id="inc_box_mon" value="&lt;b style=&quot;font-size:9px;color:#0F172A;&quot;&gt;Cloud Monitoring&lt;br&gt;Alerts&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#475569;strokeWidth=1;align=center;verticalAlign=middle;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="320" y="240" width="130" height="45" as="geometry"/>
        </mxCell>
        <mxCell id="inc_box_pd" value="&lt;b style=&quot;font-size:9px;color:#0F172A;&quot;&gt;PagerDuty/Incident&lt;br&gt;Management Integration&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#475569;strokeWidth=1;align=center;verticalAlign=middle;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="475" y="240" width="150" height="45" as="geometry"/>
        </mxCell>
        <mxCell id="inc_box_rca" value="&lt;b style=&quot;font-size:9px;color:#0F172A;&quot;&gt;Root Cause Analysis&lt;br&gt;Feedback Loop&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#475569;strokeWidth=1;align=center;verticalAlign=middle;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="650" y="240" width="140" height="45" as="geometry"/>
        </mxCell>

        <mxCell id="edge_sre_to_mon" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endFill=1;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="300" y="262" as="sourcePoint"/><mxPoint x="320" y="262" as="targetPoint"/></mxGeometry></mxCell>
        <mxCell id="edge_mon_to_pd" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endFill=1;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="450" y="262" as="sourcePoint"/><mxPoint x="475" y="262" as="targetPoint"/></mxGeometry></mxCell>
        <mxCell id="edge_pd_to_rca" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endFill=1;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="625" y="262" as="sourcePoint"/><mxPoint x="650" y="262" as="targetPoint"/></mxGeometry></mxCell>

        <!-- PagerDuty -> Looker Dash Anomalies Detected -->
        <mxCell id="edge_pd_to_dash" value="&lt;font style=&quot;font-size:7.5px;color:#0F172A;&quot;&gt;Anomalies Detected&lt;/font&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endFill=1;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="550" y="240" as="sourcePoint"/><mxPoint x="550" y="210" as="targetPoint"/></mxGeometry>
        </mxCell>


        <!-- ==================== THIRD ZONE: DATAPLEX INTEGRATED DATAOPS CONTROL PLANE ==================== -->
        <!-- Partner Box Left -->
        <mxCell id="box_partner" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#475569;strokeWidth=1.2;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="220" y="360" width="85" height="110" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_partner_top" value="&lt;b style=&quot;font-size:9px;color:#0F172A;&quot;&gt;Partner&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=top;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="220" y="364" width="85" height="16" as="geometry"/>
        </mxCell>
        <mxCell id="partner_icon" value="&lt;font style=&quot;font-size:18px;&quot;&gt;📈&lt;/font&gt;" style="text;html=1;align=center;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="220" y="386" width="85" height="30" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_partner_bot" value="&lt;font style=&quot;font-size:7.5px;color:#475569;&quot;&gt;Observability&lt;br&gt;Metrics&lt;/font&gt;" style="text;html=1;align=center;verticalAlign=bottom;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="220" y="424" width="85" height="38" as="geometry"/>
        </mxCell>

        <mxCell id="edge_partner_rules" value="&lt;font style=&quot;font-size:7.5px;color:#0F172A;&quot;&gt;Data Quality&lt;br&gt;Rules&lt;/font&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endFill=1;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="240" y="360" as="sourcePoint"/><mxPoint x="330" y="345" as="targetPoint"/><Array as="points"><mxPoint x="240" y="345"/></Array></mxGeometry>
        </mxCell>
        <mxCell id="edge_partner_scores" value="&lt;font style=&quot;font-size:7.5px;color:#0F172A;&quot;&gt;Validated Data&lt;br&gt;Quality Scores&lt;/font&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endFill=1;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="330" y="490" as="sourcePoint"/><mxPoint x="240" y="470" as="targetPoint"/><Array as="points"><mxPoint x="240" y="490"/></Array></mxGeometry>
        </mxCell>

        <!-- Dataplex Main Outer Frame -->
        <mxCell id="box_dataplex_dataops" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=1.5;arcSize=2;" vertex="1" parent="1">
          <mxGeometry x="330" y="325" width="490" height="205" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_dataplex_ops_title" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Dataplex Integrated DataOps Control Plane&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=top;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="330" y="328" width="490" height="18" as="geometry"/>
        </mxCell>

        <!-- SODA Container Left -->
        <mxCell id="box_soda" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1;arcSize=2;" vertex="1" parent="1">
          <mxGeometry x="340" y="350" width="165" height="105" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_soda_title" value="&lt;b style=&quot;font-size:8px;color:#0F172A;&quot;&gt;SODA (Quality testing&lt;br&gt;&amp;amp; Active Checks)&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=top;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="340" y="352" width="165" height="24" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_soda_body" value="&lt;font style=&quot;font-size:7px;color:#334155;&quot;&gt;SQL-based Quality Tests&lt;br&gt;&lt;b style=&quot;color:#0F172A;&quot;&gt;soda™&lt;/b&gt; User-defined Rules&lt;br&gt;Data Quality Scores&lt;/font&gt;" style="text;html=1;align=center;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="340" y="380" width="165" height="68" as="geometry"/>
        </mxCell>

        <!-- Center 1: Active Schema Drift Monitoring -->
        <mxCell id="box_drift" value="&lt;b style=&quot;font-size:8px;color:#0F172A;&quot;&gt;Active Schema&lt;br&gt;Drift Monitoring&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1;align=center;verticalAlign=middle;arcSize=2;" vertex="1" parent="1">
          <mxGeometry x="515" y="350" width="115" height="34" as="geometry"/>
        </mxCell>

        <!-- Center 2: Anomaly Detection Engine -->
        <mxCell id="box_engine" value="&lt;b style=&quot;font-size:8px;color:#0F172A;&quot;&gt;Anomaly&lt;br&gt;Detection Engine&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size:6.5px;color:#DC2626;&quot;&gt;prevents hallucination&lt;br&gt;from bad data&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1;align=center;verticalAlign=middle;arcSize=2;" vertex="1" parent="1">
          <mxGeometry x="515" y="390" width="115" height="65" as="geometry"/>
        </mxCell>

        <!-- CARLO Container Right -->
        <mxCell id="box_carlo" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1;arcSize=2;" vertex="1" parent="1">
          <mxGeometry x="640" y="350" width="170" height="105" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_carlo_title" value="&lt;b style=&quot;font-size:8px;color:#0F172A;&quot;&gt;CARLO (Data Observability&lt;br&gt;&amp;amp; Continuous Monitoring)&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=top;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="640" y="352" width="170" height="24" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_carlo_body" value="&lt;font style=&quot;font-size:7px;color:#334155;&quot;&gt;Freshness Anomalies 📈&lt;br&gt;Volume Changes&lt;br&gt;Schema Drift Indicators&lt;br&gt;Lineage anomalies&lt;/font&gt;" style="text;html=1;align=left;verticalAlign=middle;spacingLeft=8;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="640" y="380" width="170" height="68" as="geometry"/>
        </mxCell>

        <!-- Connecting Flows SODA -> Engine -> CARLO -->
        <mxCell id="edge_soda_to_engine" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endFill=1;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="505" y="420" as="sourcePoint"/><mxPoint x="515" y="420" as="targetPoint"/></mxGeometry></mxCell>
        <mxCell id="edge_engine_to_carlo" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endFill=1;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="630" y="420" as="sourcePoint"/><mxPoint x="640" y="420" as="targetPoint"/></mxGeometry></mxCell>
        <mxCell id="edge_drift_to_engine" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.2;endArrow=block;endFill=1;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="572" y="384" as="sourcePoint"/><mxPoint x="572" y="390" as="targetPoint"/></mxGeometry></mxCell>

        <!-- Dataplex Bottom Validation Bars -->
        <mxCell id="bar_csv" value="&lt;b style=&quot;font-size:8px;color:#0F172A;&quot;&gt;Computer System Validation (CSV) Checkpoints&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1;align=center;verticalAlign=middle;arcSize=2;" vertex="1" parent="1">
          <mxGeometry x="340" y="462" width="470" height="24" as="geometry"/>
        </mxCell>
        <mxCell id="bar_reliability" value="&lt;b style=&quot;font-size:8px;color:#0F172A;&quot;&gt;Reliability Guardrails&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1;align=center;verticalAlign=middle;arcSize=2;" vertex="1" parent="1">
          <mxGeometry x="340" y="492" width="470" height="24" as="geometry"/>
        </mxCell>

        <!-- Uplink to Incident Management Alerts -->
        <mxCell id="edge_engine_to_alerts" value="&lt;font style=&quot;font-size:7.5px;color:#DC2626;&quot;&gt;Anomalies Detected&lt;/font&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#DC2626;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="420" y="325" as="sourcePoint"/><mxPoint x="420" y="285" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="edge_rca_to_dataplex" value="&lt;font style=&quot;font-size:7.5px;color:#0F172A;&quot;&gt;Incident resolution feedback&lt;/font&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.2;dashed=1;endArrow=block;endFill=1;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="720" y="285" as="sourcePoint"/><mxPoint x="720" y="325" as="targetPoint"/></mxGeometry>
        </mxCell>


        <!-- ==================== FOURTH ZONE: ENFORCED PIPELINE & CONSUMPTION ==================== -->
        <!-- GCS Storage Top Right -->
        <mxCell id="box_gcs_val" value="&lt;font style=&quot;font-size:22px;&quot;&gt;🗄️&lt;/font&gt;&lt;br&gt;&lt;b style=&quot;font-size:9.5px;color:#0F172A;&quot;&gt;Cloud Storage&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size:7.5px;color:#475569;&quot;&gt;(Validated GCS Lakes)&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#475569;strokeWidth=1.2;align=center;verticalAlign=middle;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="970" y="335" width="135" height="75" as="geometry"/>
        </mxCell>
        <mxCell id="badge_soc_csv1" value="&lt;font style=&quot;font-size:7.5px;color:#FFFFFF;&quot;&gt;&lt;b&gt;SOC&lt;br&gt;CSV&lt;/b&gt;&lt;/font&gt;" style="ellipse;whiteSpace=wrap;html=1;fillColor=#0284C7;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="1115" y="342" width="38" height="38" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_soc2_txt" value="&lt;b style=&quot;font-size:8px;color:#0F172A;&quot;&gt;SOC 2&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=top;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="1110" y="384" width="48" height="16" as="geometry"/>
        </mxCell>

        <!-- Dataplex to GCS Edge -->
        <mxCell id="edge_dataplex_to_gcs" value="&lt;font style=&quot;font-size:7.5px;color:#0F172A;&quot;&gt;Clean, Validated&lt;br&gt;Data Flow&lt;/font&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="820" y="372" as="sourcePoint"/><mxPoint x="970" y="372" as="targetPoint"/></mxGeometry>
        </mxCell>

        <!-- Vertex AI & Hallucination Prevention Bottom Right -->
        <mxCell id="box_vertex_ground" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#475569;strokeWidth=1.2;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="970" y="440" width="180" height="85" as="geometry"/>
        </mxCell>
        <mxCell id="v_icon" value="&lt;font style=&quot;font-size:18px;&quot;&gt;🧠&lt;/font&gt;&lt;br&gt;&lt;b style=&quot;font-size:8.5px;color:#0F172A;&quot;&gt;Vertex AI&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size:7px;color:#475569;&quot;&gt;Model Grounding&lt;br&gt;with Vector Search&lt;/font&gt;" style="text;html=1;align=center;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="972" y="445" width="95" height="75" as="geometry"/>
        </mxCell>
        <mxCell id="v_cross_icon" value="&lt;b style=&quot;font-size:7.5px;color:#0F172A;&quot;&gt;PREVENTION OF AI /&lt;br&gt;LLM HALLUCINATION&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size:24px;color:#DC2626;&quot;&gt;🤖❌&lt;/font&gt;" style="text;html=1;align=center;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="1065" y="445" width="80" height="75" as="geometry"/>
        </mxCell>

        <!-- Dataplex to Vertex Edge -->
        <mxCell id="edge_dataplex_to_vertex" value="&lt;font style=&quot;font-size:7.5px;color:#0F172A;&quot;&gt;AI/ML Training Data&lt;br&gt;(SOC 2, CSV)&lt;/font&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="820" y="482" as="sourcePoint"/><mxPoint x="970" y="482" as="targetPoint"/></mxGeometry>
        </mxCell>


        <!-- ==================== BOTTOM ZONE: UNIFIED MODERN DATA STACK ==================== -->
        <mxCell id="box_data_stack_outer" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=1.2;arcSize=2;" vertex="1" parent="1">
          <mxGeometry x="310" y="565" width="530" height="110" as="geometry"/>
        </mxCell>

        <!-- 6 Data Stack Components -->
        <mxCell id="ds_bq" value="&lt;font style=&quot;font-size:18px;&quot;&gt;🔍&lt;/font&gt;&lt;br&gt;&lt;b style=&quot;font-size:8.5px;color:#0F172A;&quot;&gt;BigQuery&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="325" y="585" width="75" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="ds_gcs" value="&lt;font style=&quot;font-size:18px;&quot;&gt;🗄️&lt;/font&gt;&lt;br&gt;&lt;b style=&quot;font-size:8.5px;color:#0F172A;&quot;&gt;Cloud Storage&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="410" y="585" width="80" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="ds_sql" value="&lt;font style=&quot;font-size:18px;&quot;&gt;🛢️&lt;/font&gt;&lt;br&gt;&lt;b style=&quot;font-size:8.5px;color:#0F172A;&quot;&gt;Cloud SQL&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="500" y="585" width="75" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="ds_df" value="&lt;font style=&quot;font-size:18px;&quot;&gt;⚡&lt;/font&gt;&lt;br&gt;&lt;b style=&quot;font-size:8.5px;color:#0F172A;&quot;&gt;Dataflow&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="585" y="585" width="75" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="ds_dp" value="&lt;font style=&quot;font-size:18px;&quot;&gt;⚙️&lt;/font&gt;&lt;br&gt;&lt;b style=&quot;font-size:8.5px;color:#0F172A;&quot;&gt;Dataproc&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="670" y="585" width="75" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="ds_saas" value="&lt;font style=&quot;font-size:18px;&quot;&gt;☁️&lt;/font&gt;&lt;br&gt;&lt;b style=&quot;font-size:8.5px;color:#0F172A;&quot;&gt;External SaaS&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="755" y="585" width="75" height="60" as="geometry"/>
        </mxCell>

        <mxCell id="lbl_lakehouse_title" value="&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;Enterprise Data Lakehouse (Prerequisites)&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=top;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="310" y="680" width="530" height="20" as="geometry"/>
        </mxCell>

        <!-- Upward Ingestion Edge Stack -> Dataplex -->
        <mxCell id="edge_stack_to_dataplex" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="575" y="565" as="sourcePoint"/><mxPoint x="575" y="530" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="edge_dataplex_to_stack" value="&lt;font style=&quot;font-size:7.5px;color:#0F172A;&quot;&gt;Clean, Validated Data Flow&lt;/font&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.2;dashed=1;endArrow=block;endFill=1;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="670" y="530" as="sourcePoint"/><mxPoint x="670" y="565" as="targetPoint"/></mxGeometry>
        </mxCell>


        <!-- ==================== BOTTOM RIGHT: LEGEND ==================== -->
        <mxCell id="box_legend" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#475569;strokeWidth=1;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="960" y="555" width="240" height="165" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_legend_title" value="&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;Legend&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=top;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="960" y="559" width="240" height="16" as="geometry"/>
        </mxCell>

        <!-- Legend Left Icons -->
        <mxCell id="leg_ico_dp" value="&lt;font style=&quot;font-size:16px;&quot;&gt;❇️&lt;/font&gt;" style="text;html=1;align=center;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="970" y="576" width="30" height="24" as="geometry"/>
        </mxCell>
        <mxCell id="leg_ico_sync" value="&lt;font style=&quot;font-size:16px;&quot;&gt;🔄&lt;/font&gt;" style="text;html=1;align=center;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="970" y="608" width="30" height="24" as="geometry"/>
        </mxCell>
        <mxCell id="leg_ico_csv" value="&lt;b style=&quot;font-size:8px;color:#0F172A;&quot;&gt;CSV&lt;br&gt;&lt;span style=&quot;font-size:6.5px;color:#64748B;&quot;&gt;logos&lt;/span&gt;&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="968" y="640" width="35" height="34" as="geometry"/>
        </mxCell>

        <!-- Legend Flows -->
        <!-- Data Flow -->
        <mxCell id="leg_arr_data" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="1020" y="586" as="sourcePoint"/><mxPoint x="1065" y="586" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="leg_lbl_data" value="&lt;font style=&quot;font-size:7.5px;color:#0F172A;&quot;&gt;Data Flow&lt;/font&gt;" style="text;html=1;align=left;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="1075" y="576" width="115" height="20" as="geometry"/>
        </mxCell>

        <!-- Anomaly Alert -->
        <mxCell id="leg_arr_alert" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#DC2626;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="1020" y="610" as="sourcePoint"/><mxPoint x="1065" y="610" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="leg_lbl_alert" value="&lt;font style=&quot;font-size:7.5px;color:#DC2626;&quot;&gt;Anomaly Alert&lt;/font&gt;" style="text;html=1;align=left;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="1075" y="600" width="115" height="20" as="geometry"/>
        </mxCell>

        <!-- Quality Test -->
        <mxCell id="leg_arr_test" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0284C7;strokeWidth=1.2;endArrow=block;endFill=1;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="1020" y="634" as="sourcePoint"/><mxPoint x="1065" y="634" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="leg_lbl_test" value="&lt;font style=&quot;font-size:7.5px;color:#0F172A;&quot;&gt;Quality Test&lt;/font&gt;" style="text;html=1;align=left;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="1075" y="624" width="115" height="20" as="geometry"/>
        </mxCell>

        <!-- Schema Drift -->
        <mxCell id="leg_arr_drift" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#64748B;strokeWidth=1.2;dashed=1;endArrow=block;endFill=1;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="1020" y="658" as="sourcePoint"/><mxPoint x="1065" y="658" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="leg_lbl_drift" value="&lt;font style=&quot;font-size:7.5px;color:#0F172A;&quot;&gt;Schema Drift&lt;/font&gt;" style="text;html=1;align=left;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="1075" y="648" width="115" height="20" as="geometry"/>
        </mxCell>

        <!-- Hallucination Prevention -->
        <mxCell id="leg_arr_halluc" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0F172A;strokeWidth=1.5;endArrow=none;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="1020" y="682" as="sourcePoint"/><mxPoint x="1065" y="682" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="leg_lbl_halluc" value="&lt;font style=&quot;font-size:7.5px;color:#0F172A;&quot;&gt;Hallucination Prevention&lt;/font&gt;" style="text;html=1;align=left;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="1075" y="672" width="125" height="20" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
