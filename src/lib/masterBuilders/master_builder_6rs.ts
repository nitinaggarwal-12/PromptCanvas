/**
 * 🏛️ BLUEPRINT: 6Rs MIGRATION DISPOSITION MATRIX (ASSESSMENT PHASE)
 * Exact High-Fidelity Replica of 6Rs Migration Disposition Matrix Architecture Blueprint
 * Vertically compressed into 1600x720 widescreen viewport with zero dead space.
 */

export function build6RsMigrationMatrixXml(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="app.diagrams.net" modified="2026-04-01T00:00:00.000Z" agent="PromptCanvas" version="24.0.0" type="device">
  <diagram id="six_rs_migration_matrix" name="6Rs Migration Disposition Matrix">
    <mxGraphModel dx="1600" dy="720" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="720" background="#FFFFFF">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- ================= MAIN HEADER ================= -->
        <mxCell id="hdr_title" value="&lt;b style=&quot;font-size:18px;color:#0F172A;font-family:sans-serif;&quot;&gt;6Rs Migration Disposition Matrix (Assessment Phase)&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="30" y="10" width="700" height="26" as="geometry"/>
        </mxCell>

        <!-- ================= TOP-LEFT METADATA CARD (COMPRESSED) ================= -->
        <mxCell id="meta_card" value="&lt;div style=&quot;line-height:14px;font-size:9.5px;color:#334155;text-align:left;font-family:sans-serif;&quot;&gt;&lt;b style=&quot;color:#0F172A;&quot;&gt;GCAF Pillar:&lt;/b&gt; Cost Optimization &amp;amp; Operational Excellence &amp;nbsp;|&amp;nbsp; &lt;b style=&quot;color:#0F172A;&quot;&gt;Phase:&lt;/b&gt; Phase 0: Assessment &amp;amp; Planning&lt;br&gt;&lt;b style=&quot;color:#0F172A;&quot;&gt;Persona:&lt;/b&gt; 4. Cloud Infrastructure Lead &amp;amp; Data Architect &amp;nbsp;|&amp;nbsp; &lt;b style=&quot;color:#0F172A;&quot;&gt;Target Audience:&lt;/b&gt; C-Suite, PMO, Migration Teams&lt;br&gt;&lt;b style=&quot;color:#0F172A;&quot;&gt;Prerequisites:&lt;/b&gt; Legacy Data &amp;amp; System Dependency Map ()&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#94A3B8;strokeWidth=1.2;align=left;verticalAlign=middle;spacingLeft=10;arcSize=4;" vertex="1" parent="1">
          <mxGeometry x="30" y="40" width="460" height="64" as="geometry"/>
        </mxCell>

        <!-- ================= TOP CONTINUOUS VALIDATION CALLOUT ================= -->
        <mxCell id="lbl_top_val" value="&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;Validation &amp;amp; Optimization&lt;/b&gt;&lt;br&gt;&lt;font color=&quot;#475569&quot; style=&quot;font-size:8px;&quot;&gt;Reviewed vs Cost GCAF Pillar&lt;/font&gt;" style="text;html=1;align=center;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="505" y="44" width="175" height="38" as="geometry"/>
        </mxCell>
        <mxCell id="edge_top_feedback" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1E293B;strokeWidth=1.2;endArrow=block;endFill=1;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="592" y="82" as="sourcePoint"/>
            <mxPoint x="592" y="116" as="targetPoint"/>
          </mxGeometry>
        </mxCell>

        <!-- ================= LEFT: LEGACY COMPONENTS CONTAINER ================= -->
        <mxCell id="box_legacy_outer" value="" style="rounded=1;whiteSpace=wrap;html=1;dashed=1;dashPattern=3 3;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.2;arcSize=2;" vertex="1" parent="1">
          <mxGeometry x="30" y="116" width="120" height="530" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_legacy_header" value="&lt;b style=&quot;font-size:9.5px;color:#475569;&quot;&gt;Legacy Components&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="30" y="122" width="120" height="18" as="geometry"/>
        </mxCell>

        <!-- 1. On-Premise VMs -->
        <mxCell id="icon_onprem_vms" value="" style="sketch=0;outlineConnect=0;fontColor=#232F3E;gradientColor=none;strokeColor=none;fillColor=#0284C7;align=center;verticalAlign=top;shape=mxgraph.gcp2.compute_engine;" vertex="1" parent="1">
          <mxGeometry x="73" y="145" width="34" height="34" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_onprem_vms" value="&lt;font style=&quot;font-size:8.5px;color:#0F172A;&quot;&gt;On-Premise VMs&lt;/font&gt;" style="text;html=1;align=center;verticalAlign=top;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="38" y="184" width="104" height="18" as="geometry"/>
        </mxCell>

        <!-- 2. Legacy Databases (Oracle/SAP) -->
        <mxCell id="cyl_legacy_dbs" value="" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=6;fillColor=#E0F2FE;strokeColor=#0284C7;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="72" y="225" width="32" height="38" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_legacy_dbs" value="&lt;font style=&quot;font-size:8.5px;color:#0F172A;&quot;&gt;Legacy DBs&lt;br&gt;(Oracle/SAP)&lt;/font&gt;" style="text;html=1;align=center;verticalAlign=top;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="35" y="268" width="110" height="24" as="geometry"/>
        </mxCell>

        <!-- 3. Mainframe Systems -->
        <mxCell id="icon_mainframe_sys" value="" style="sketch=0;outlineConnect=0;fontColor=#232F3E;gradientColor=none;strokeColor=none;fillColor=#0284C7;align=center;verticalAlign=top;shape=mxgraph.gcp2.compute_engine;" vertex="1" parent="1">
          <mxGeometry x="68" y="320" width="34" height="38" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_mainframe_sys" value="&lt;font style=&quot;font-size:8.5px;color:#0F172A;&quot;&gt;Mainframe Systems&lt;/font&gt;" style="text;html=1;align=center;verticalAlign=top;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="38" y="362" width="104" height="20" as="geometry"/>
        </mxCell>

        <!-- 4. Custom Monolith Apps -->
        <mxCell id="icon_monolith_apps" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="66" y="415" width="46" height="28" as="geometry"/>
        </mxCell>
        <mxCell id="icon_monolith_inner" value="{...}" style="text;html=1;align=center;verticalAlign=middle;fontColor=#0284C7;fontSize=11;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="66" y="416" width="46" height="24" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_monolith_apps" value="&lt;font style=&quot;font-size:8.5px;color:#0F172A;&quot;&gt;Custom Monoliths&lt;/font&gt;" style="text;html=1;align=center;verticalAlign=top;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="38" y="448" width="104" height="20" as="geometry"/>
        </mxCell>

        <!-- 5. File Shares -->
        <mxCell id="icon_file_shares" value="" style="shape=folder;fontStyle=1;tabWidth=14;tabHeight=10;tabPosition=left;html=1;boundedLbl=1;backgroundOutline=1;fillColor=#0284C7;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="68" y="500" width="40" height="28" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_file_shares" value="&lt;font style=&quot;font-size:8.5px;color:#0F172A;&quot;&gt;File Shares&lt;/font&gt;" style="text;html=1;align=center;verticalAlign=top;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="38" y="534" width="104" height="20" as="geometry"/>
        </mxCell>

        <!-- Bus connectors merging into Legacy Assets Input -->
        <mxCell id="edge_merge_bus" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1E293B;strokeWidth=1.5;endArrow=none;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="160" y="162" as="sourcePoint"/>
            <mxPoint x="160" y="514" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
        <mxCell id="edge_vm_out" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#1E293B;strokeWidth=1.2;endArrow=none;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="110" y="162" as="sourcePoint"/><mxPoint x="160" y="162" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="edge_db_out" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#1E293B;strokeWidth=1.2;endArrow=none;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="110" y="244" as="sourcePoint"/><mxPoint x="160" y="244" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="edge_mf_out" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#1E293B;strokeWidth=1.2;endArrow=none;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="110" y="339" as="sourcePoint"/><mxPoint x="160" y="339" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="edge_mono_out" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#1E293B;strokeWidth=1.2;endArrow=none;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="110" y="429" as="sourcePoint"/><mxPoint x="160" y="429" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="edge_fs_out" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#1E293B;strokeWidth=1.2;endArrow=none;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="110" y="514" as="sourcePoint"/><mxPoint x="160" y="514" as="targetPoint"/></mxGeometry>
        </mxCell>

        <!-- Legacy Assets Input Box -->
        <mxCell id="box_legacy_assets_input" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;Legacy&lt;br&gt;Assets&lt;br&gt;Input&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#E0F2FE;strokeColor=#0284C7;strokeWidth=1.5;align=center;verticalAlign=middle;arcSize=6;" vertex="1" parent="1">
          <mxGeometry x="215" y="345" width="76" height="60" as="geometry"/>
        </mxCell>

        <!-- Data & Dependencies Connector from Bus to Input -->
        <mxCell id="edge_legacy_to_input" value="&lt;font style=&quot;font-size:8.5px;color:#1E293B;&quot;&gt;Data &amp;amp;&lt;br&gt;Deps&lt;/font&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1E293B;strokeWidth=1.5;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="160" y="375" as="sourcePoint"/>
            <mxPoint x="215" y="375" as="targetPoint"/>
          </mxGeometry>
        </mxCell>

        <!-- ================= MIDDLE: MIGRATION ASSESSMENT LOGIC ================= -->
        <mxCell id="box_assessment_logic" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#0284C7;strokeWidth=1.5;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="315" y="116" width="370" height="530" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_logic_hdr_top" value="&lt;b style=&quot;font-size:12px;color:#0F172A;&quot;&gt;Migration Assessment Logic Engine&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=top;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="315" y="122" width="370" height="20" as="geometry"/>
        </mxCell>

        <!-- Track 1: Business Value -->
        <mxCell id="box_tier_biz" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;Business&lt;br&gt;Value&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=center;verticalAlign=middle;arcSize=6;" vertex="1" parent="1">
          <mxGeometry x="335" y="165" width="96" height="42" as="geometry"/>
        </mxCell>
        <mxCell id="sub_biz_val" value="&lt;table style=&quot;width:100%;font-size:8.5px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;text-align:left;padding-left:4px;&quot;&gt;▷ &lt;b&gt;Business Value&lt;/b&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="480" y="155" width="180" height="26" as="geometry"/>
        </mxCell>
        <mxCell id="sub_biz_tech" value="&lt;table style=&quot;width:100%;font-size:8.5px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;text-align:left;padding-left:4px;&quot;&gt;○ &lt;b&gt;Technical Feasibility&lt;/b&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="480" y="188" width="180" height="26" as="geometry"/>
        </mxCell>
        <mxCell id="edge_biz_fork1" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#1E293B;strokeWidth=1.2;endArrow=block;endFill=1;" edge="1" parent="1" source="box_tier_biz" target="sub_biz_val"><mxGeometry relative="1" as="geometry"/></mxCell>
        <mxCell id="edge_biz_fork2" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#1E293B;strokeWidth=1.2;endArrow=block;endFill=1;" edge="1" parent="1" source="box_tier_biz" target="sub_biz_tech"><mxGeometry relative="1" as="geometry"/></mxCell>

        <!-- Track 2: Technical Feasibility -->
        <mxCell id="box_tier_tech" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;Technical&lt;br&gt;Feasibility&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=center;verticalAlign=middle;arcSize=6;" vertex="1" parent="1">
          <mxGeometry x="335" y="315" width="96" height="42" as="geometry"/>
        </mxCell>
        <mxCell id="sub_tech_feas" value="&lt;table style=&quot;width:100%;font-size:8.5px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;text-align:left;padding-left:4px;&quot;&gt;▷ &lt;b&gt;Technical Feasibility&lt;/b&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="480" y="305" width="180" height="26" as="geometry"/>
        </mxCell>
        <mxCell id="sub_tech_eval" value="&lt;table style=&quot;width:100%;font-size:8.5px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;text-align:left;padding-left:4px;&quot;&gt;○ &lt;b&gt;Evaluability&lt;/b&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="480" y="338" width="180" height="26" as="geometry"/>
        </mxCell>
        <mxCell id="edge_tech_fork1" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#1E293B;strokeWidth=1.2;endArrow=block;endFill=1;" edge="1" parent="1" source="box_tier_tech" target="sub_tech_feas"><mxGeometry relative="1" as="geometry"/></mxCell>
        <mxCell id="edge_tech_fork2" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#1E293B;strokeWidth=1.2;endArrow=block;endFill=1;" edge="1" parent="1" source="box_tier_tech" target="sub_tech_eval"><mxGeometry relative="1" as="geometry"/></mxCell>

        <!-- Track 3: Cloud Compatibility -->
        <mxCell id="box_tier_cloud" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;Cloud&lt;br&gt;Compatibility&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=center;verticalAlign=middle;arcSize=6;" vertex="1" parent="1">
          <mxGeometry x="335" y="465" width="96" height="42" as="geometry"/>
        </mxCell>
        <mxCell id="sub_cloud_biz" value="&lt;table style=&quot;width:100%;font-size:8.5px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;text-align:left;padding-left:4px;&quot;&gt;▷ &lt;b&gt;Business Feasibility&lt;/b&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="480" y="455" width="180" height="26" as="geometry"/>
        </mxCell>
        <mxCell id="sub_cloud_comp" value="&lt;table style=&quot;width:100%;font-size:8.5px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;text-align:left;padding-left:4px;&quot;&gt;○ &lt;b&gt;Compatibility&lt;/b&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="480" y="488" width="180" height="26" as="geometry"/>
        </mxCell>
        <mxCell id="edge_cloud_fork1" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#1E293B;strokeWidth=1.2;endArrow=block;endFill=1;" edge="1" parent="1" source="box_tier_cloud" target="sub_cloud_biz"><mxGeometry relative="1" as="geometry"/></mxCell>
        <mxCell id="edge_cloud_fork2" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#1E293B;strokeWidth=1.2;endArrow=block;endFill=1;" edge="1" parent="1" source="box_tier_cloud" target="sub_cloud_comp"><mxGeometry relative="1" as="geometry"/></mxCell>

        <!-- Input branching to 3 Logic Tiers -->
        <mxCell id="edge_input_to_biz" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1E293B;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="291" y="375" as="sourcePoint"/>
            <mxPoint x="335" y="186" as="targetPoint"/>
            <Array as="points">
              <mxPoint x="305" y="375"/>
              <mxPoint x="305" y="186"/>
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="edge_input_to_tech" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1E293B;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="291" y="375" as="sourcePoint"/>
            <mxPoint x="335" y="336" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
        <mxCell id="edge_input_to_cloud" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1E293B;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="291" y="375" as="sourcePoint"/>
            <mxPoint x="335" y="486" as="targetPoint"/>
            <Array as="points">
              <mxPoint x="305" y="375"/>
              <mxPoint x="305" y="486"/>
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- ================= THE 6Rs PILLARS (COLUMNS 1 TO 6) ================= -->

        <!-- COLUMN 1: REHOST (LIFT & SHIFT) -->
        <mxCell id="col_rehost" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0F9FF;strokeColor=#0284C7;strokeWidth=1.5;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="705" y="60" width="135" height="586" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_rehost_hdr" value="&lt;b style=&quot;font-size:12px;color:#0369A1;&quot;&gt;Rehost&lt;/b&gt;&lt;br&gt;&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;(Lift &amp;amp; Shift)&lt;/b&gt;&lt;br&gt;&lt;i style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Minimal change.&lt;br&gt;Fastest Time-to-Value.&lt;/i&gt;" style="text;html=1;align=center;verticalAlign=top;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="705" y="66" width="135" height="52" as="geometry"/>
        </mxCell>
        <mxCell id="card_rehost_target" value="&lt;b style=&quot;font-size:9.5px;color:#0369A1;&quot;&gt;GCP Target:&lt;/b&gt;&lt;br&gt;&lt;b style=&quot;font-size:9px;color:#0F172A;&quot;&gt;Compute Engine&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#64748B;&quot;&gt;Migrate for GCE / Anthos&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="713" y="125" width="119" height="52" as="geometry"/>
        </mxCell>
        <mxCell id="card_rehost_w1" value="&lt;div style=&quot;font-size:7.5px;background:#E0F2FE;color:#0369A1;font-weight:bold;padding:1px 4px;border-radius:3px;margin-bottom:2px;&quot;&gt;Wave 1 • Quick Win&lt;/div&gt;&lt;b style=&quot;font-size:8.5px;color:#0F172A;&quot;&gt;Legacy Web Tier&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Apache / IIS on RHEL&lt;br&gt;MIG Autohealing&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="713" y="185" width="119" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="card_rehost_w2" value="&lt;div style=&quot;font-size:7.5px;background:#E0F2FE;color:#0369A1;font-weight:bold;padding:1px 4px;border-radius:3px;margin-bottom:2px;&quot;&gt;Wave 1 • Batch&lt;/div&gt;&lt;b style=&quot;font-size:8.5px;color:#0F172A;&quot;&gt;Scheduled Jobs&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Cron &amp;amp; Backend Scripts&lt;br&gt;Cloud Scheduler + GCE&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="713" y="252" width="119" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="card_rehost_w3" value="&lt;div style=&quot;font-size:7.5px;background:#F1F5F9;color:#475569;font-weight:bold;padding:1px 4px;border-radius:3px;margin-bottom:2px;&quot;&gt;Storage Target&lt;/div&gt;&lt;b style=&quot;font-size:8.5px;color:#0F172A;&quot;&gt;NFS File Shares&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Filestore Enterprise&lt;br&gt;HA Multi-Zone Sync&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="713" y="320" width="119" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="card_rehost_roi" value="&lt;b style=&quot;font-size:8.5px;color:#0369A1;&quot;&gt;Expected ROI:&lt;/b&gt;&lt;br&gt;&lt;b style=&quot;font-size:11px;color:#16A34A;&quot;&gt;-28% OpEx&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#64748B;&quot;&gt;30-Day Lift Timeline&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#86EFAC;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="713" y="560" width="119" height="72" as="geometry"/>
        </mxCell>

        <!-- COLUMN 2: REPLATFORM (LIFT & RESHAPE) -->
        <mxCell id="col_replatform" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=1.5;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="850" y="60" width="135" height="586" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_replatform_hdr" value="&lt;b style=&quot;font-size:12px;color:#1D4ED8;&quot;&gt;Replatform&lt;/b&gt;&lt;br&gt;&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;(Lift &amp;amp; Reshape)&lt;/b&gt;&lt;br&gt;&lt;i style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Managed Services.&lt;br&gt;High availability boost.&lt;/i&gt;" style="text;html=1;align=center;verticalAlign=top;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="850" y="66" width="135" height="52" as="geometry"/>
        </mxCell>
        <mxCell id="card_repl_target" value="&lt;b style=&quot;font-size:9.5px;color:#1D4ED8;&quot;&gt;GCP Target:&lt;/b&gt;&lt;br&gt;&lt;b style=&quot;font-size:9px;color:#0F172A;&quot;&gt;GKE &amp;amp; Cloud SQL&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#64748B;&quot;&gt;Autopilot + DMS Tooling&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="858" y="125" width="119" height="52" as="geometry"/>
        </mxCell>
        <mxCell id="card_repl_w1" value="&lt;div style=&quot;font-size:7.5px;background:#DBEAFE;color:#1D4ED8;font-weight:bold;padding:1px 4px;border-radius:3px;margin-bottom:2px;&quot;&gt;Wave 2 • Database&lt;/div&gt;&lt;b style=&quot;font-size:8.5px;color:#0F172A;&quot;&gt;Oracle / SQL Server&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;DMS to Cloud SQL PG16&lt;br&gt;Automated HA &amp;amp; Backups&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="858" y="185" width="119" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="card_repl_w2" value="&lt;div style=&quot;font-size:7.5px;background:#DBEAFE;color:#1D4ED8;font-weight:bold;padding:1px 4px;border-radius:3px;margin-bottom:2px;&quot;&gt;Wave 2 • Apps&lt;/div&gt;&lt;b style=&quot;font-size:8.5px;color:#0F172A;&quot;&gt;Java Spring Monolith&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Containerized to GKE&lt;br&gt;Istio mTLS Service Mesh&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="858" y="252" width="119" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="card_repl_w3" value="&lt;div style=&quot;font-size:7.5px;background:#F1F5F9;color:#475569;font-weight:bold;padding:1px 4px;border-radius:3px;margin-bottom:2px;&quot;&gt;Caching Target&lt;/div&gt;&lt;b style=&quot;font-size:8.5px;color:#0F172A;&quot;&gt;Session State&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Memorystore for Redis&lt;br&gt;Zero-Downtime Patching&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="858" y="320" width="119" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="card_repl_roi" value="&lt;b style=&quot;font-size:8.5px;color:#1D4ED8;&quot;&gt;Expected ROI:&lt;/b&gt;&lt;br&gt;&lt;b style=&quot;font-size:11px;color:#16A34A;&quot;&gt;-44% Licenses&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#64748B;&quot;&gt;Zero DB Admin Burden&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#86EFAC;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="858" y="560" width="119" height="72" as="geometry"/>
        </mxCell>

        <!-- COLUMN 3: REFACTOR (RE-ARCHITECT) -->
        <mxCell id="col_refactor" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#7C3AED;strokeWidth=1.5;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="995" y="60" width="135" height="586" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_refactor_hdr" value="&lt;b style=&quot;font-size:12px;color:#6D28D9;&quot;&gt;Refactor&lt;/b&gt;&lt;br&gt;&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;(Re-architect)&lt;/b&gt;&lt;br&gt;&lt;i style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Cloud-Native AI.&lt;br&gt;Maximum Agility &amp;amp; ROI.&lt;/i&gt;" style="text;html=1;align=center;verticalAlign=top;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="995" y="66" width="135" height="52" as="geometry"/>
        </mxCell>
        <mxCell id="card_ref_target" value="&lt;b style=&quot;font-size:9.5px;color:#6D28D9;&quot;&gt;GCP Target:&lt;/b&gt;&lt;br&gt;&lt;b style=&quot;font-size:9px;color:#0F172A;&quot;&gt;Cloud Run + Vertex AI&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#64748B;&quot;&gt;Serverless &amp;amp; Gemini 3.7&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1003" y="125" width="119" height="52" as="geometry"/>
        </mxCell>
        <mxCell id="card_ref_w1" value="&lt;div style=&quot;font-size:7.5px;background:#F3E8FF;color:#6D28D9;font-weight:bold;padding:1px 4px;border-radius:3px;margin-bottom:2px;&quot;&gt;Wave 3 • Analytics&lt;/div&gt;&lt;b style=&quot;font-size:8.5px;color:#0F172A;&quot;&gt;Nightly ETL Batch&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Cloud Dataflow (Beam)&lt;br&gt;BigQuery BigLake Marts&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1003" y="185" width="119" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="card_ref_w2" value="&lt;div style=&quot;font-size:7.5px;background:#F3E8FF;color:#6D28D9;font-weight:bold;padding:1px 4px;border-radius:3px;margin-bottom:2px;&quot;&gt;Wave 3 • Core Micro&lt;/div&gt;&lt;b style=&quot;font-size:8.5px;color:#0F172A;&quot;&gt;Order &amp;amp; Payment API&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Cloud Run + Pub/Sub&lt;br&gt;AlloyDB pgvector SAGA&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1003" y="252" width="119" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="card_ref_w3" value="&lt;div style=&quot;font-size:7.5px;background:#F1F5F9;color:#475569;font-weight:bold;padding:1px 4px;border-radius:3px;margin-bottom:2px;&quot;&gt;AI Innovation&lt;/div&gt;&lt;b style=&quot;font-size:8.5px;color:#0F172A;&quot;&gt;Agentic RAG Engine&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Gemini 3.7 Flash + MCP&lt;br&gt;Real-Time Copilot Hub&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1003" y="320" width="119" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="card_ref_roi" value="&lt;b style=&quot;font-size:8.5px;color:#6D28D9;&quot;&gt;Expected ROI:&lt;/b&gt;&lt;br&gt;&lt;b style=&quot;font-size:11px;color:#16A34A;&quot;&gt;-62% OpEx&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#64748B;&quot;&gt;Instant Auto-Scaling&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#86EFAC;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1003" y="560" width="119" height="72" as="geometry"/>
        </mxCell>

        <!-- COLUMN 4: RETAIN (REVISIT / HYBRID) -->
        <mxCell id="col_retain" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#475569;strokeWidth=1.5;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="1140" y="60" width="135" height="586" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_retain_hdr" value="&lt;b style=&quot;font-size:12px;color:#334155;&quot;&gt;Retain&lt;/b&gt;&lt;br&gt;&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;(Revisit / Hybrid)&lt;/b&gt;&lt;br&gt;&lt;i style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Keep On-Prem for now.&lt;br&gt;Expose via Hybrid Mesh.&lt;/i&gt;" style="text;html=1;align=center;verticalAlign=top;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="1140" y="66" width="135" height="52" as="geometry"/>
        </mxCell>
        <mxCell id="card_retain_target" value="&lt;b style=&quot;font-size:9.5px;color:#334155;&quot;&gt;Integration:&lt;/b&gt;&lt;br&gt;&lt;b style=&quot;font-size:9px;color:#0F172A;&quot;&gt;Cloud Interconnect&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#64748B;&quot;&gt;100G BGP + Apigee Hub&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#475569;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1148" y="125" width="119" height="52" as="geometry"/>
        </mxCell>
        <mxCell id="card_retain_w1" value="&lt;div style=&quot;font-size:7.5px;background:#F1F5F9;color:#334155;font-weight:bold;padding:1px 4px;border-radius:3px;margin-bottom:2px;&quot;&gt;Retained Core&lt;/div&gt;&lt;b style=&quot;font-size:8.5px;color:#0F172A;&quot;&gt;Mainframe Banking&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;z/OS CICS Transactions&lt;br&gt;Apigee REST Facade&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1148" y="185" width="119" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="card_retain_w2" value="&lt;div style=&quot;font-size:7.5px;background:#F1F5F9;color:#334155;font-weight:bold;padding:1px 4px;border-radius:3px;margin-bottom:2px;&quot;&gt;Compliance Lock&lt;/div&gt;&lt;b style=&quot;font-size:8.5px;color:#0F172A;&quot;&gt;Hardware HSM Keys&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Physical Air-Gapped HSM&lt;br&gt;Cloud KMS Integration&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1148" y="252" width="119" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="card_retain_w3" value="&lt;div style=&quot;font-size:7.5px;background:#F1F5F9;color:#475569;font-weight:bold;padding:1px 4px;border-radius:3px;margin-bottom:2px;&quot;&gt;Scheduled Review&lt;/div&gt;&lt;b style=&quot;font-size:8.5px;color:#0F172A;&quot;&gt;Phase 2 Modernize&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Re-evaluating in Q4&lt;br&gt;Target GDC Edge / GKE&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1148" y="320" width="119" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="card_retain_roi" value="&lt;b style=&quot;font-size:8.5px;color:#334155;&quot;&gt;Risk Posture:&lt;/b&gt;&lt;br&gt;&lt;b style=&quot;font-size:11px;color:#0284C7;&quot;&gt;0% Disruption&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#64748B;&quot;&gt;Zero Critical Path Risk&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#94A3B8;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1148" y="560" width="119" height="72" as="geometry"/>
        </mxCell>

        <!-- COLUMN 5: RETIRE (DECOMMISSION) -->
        <mxCell id="col_retire" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF2F2;strokeColor=#DC2626;strokeWidth=1.5;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="1285" y="60" width="135" height="586" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_retire_hdr" value="&lt;b style=&quot;font-size:12px;color:#B91C1C;&quot;&gt;Retire&lt;/b&gt;&lt;br&gt;&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;(Decommission)&lt;/b&gt;&lt;br&gt;&lt;i style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Purge redundant apps.&lt;br&gt;Instant OpEx elimination.&lt;/i&gt;" style="text;html=1;align=center;verticalAlign=top;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="1285" y="66" width="135" height="52" as="geometry"/>
        </mxCell>
        <mxCell id="card_retire_target" value="&lt;b style=&quot;font-size:9.5px;color:#B91C1C;&quot;&gt;Decom Action:&lt;/b&gt;&lt;br&gt;&lt;b style=&quot;font-size:9px;color:#0F172A;&quot;&gt;Archive &amp;amp; Teardown&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#64748B;&quot;&gt;Coldline + License Cuts&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DC2626;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1293" y="125" width="119" height="52" as="geometry"/>
        </mxCell>
        <mxCell id="card_retire_w1" value="&lt;div style=&quot;font-size:7.5px;background:#FEE2E2;color:#B91C1C;font-weight:bold;padding:1px 4px;border-radius:3px;margin-bottom:2px;&quot;&gt;Sunset Workload&lt;/div&gt;&lt;b style=&quot;font-size:8.5px;color:#0F172A;&quot;&gt;Legacy Cognos BI&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Replaced by Looker&lt;br&gt;Data to GCS Coldline&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1293" y="185" width="119" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="card_retire_w2" value="&lt;div style=&quot;font-size:7.5px;background:#FEE2E2;color:#B91C1C;font-weight:bold;padding:1px 4px;border-radius:3px;margin-bottom:2px;&quot;&gt;Sunset Workload&lt;/div&gt;&lt;b style=&quot;font-size:8.5px;color:#0F172A;&quot;&gt;Shadow IT Silos&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Duplicate Sales DBs&lt;br&gt;Server Rack Recycling&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1293" y="252" width="119" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="card_retire_w3" value="&lt;div style=&quot;font-size:7.5px;background:#F1F5F9;color:#475569;font-weight:bold;padding:1px 4px;border-radius:3px;margin-bottom:2px;&quot;&gt;Compliance Retain&lt;/div&gt;&lt;b style=&quot;font-size:8.5px;color:#0F172A;&quot;&gt;7-Yr Audit Records&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;GCS Bucket Lock (WORM)&lt;br&gt;Zero Compute Cost&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1293" y="320" width="119" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="card_retire_roi" value="&lt;b style=&quot;font-size:8.5px;color:#B91C1C;&quot;&gt;Immediate Saving:&lt;/b&gt;&lt;br&gt;&lt;b style=&quot;font-size:11px;color:#16A34A;&quot;&gt;+$480k/yr&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#64748B;&quot;&gt;Direct License Cuts&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#86EFAC;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1293" y="560" width="119" height="72" as="geometry"/>
        </mxCell>

        <!-- COLUMN 6: REPURCHASE (DROP & SHOP) -->
        <mxCell id="col_repurchase" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#9333EA;strokeWidth=1.5;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="1430" y="60" width="135" height="586" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_repurchase_hdr" value="&lt;b style=&quot;font-size:12px;color:#7E22CE;&quot;&gt;Repurchase&lt;/b&gt;&lt;br&gt;&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;(Drop &amp;amp; Shop)&lt;/b&gt;&lt;br&gt;&lt;i style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Adopt SaaS solutions.&lt;br&gt;Zero Infra Overhead.&lt;/i&gt;" style="text;html=1;align=center;verticalAlign=top;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="1430" y="66" width="135" height="52" as="geometry"/>
        </mxCell>
        <mxCell id="card_rep_target" value="&lt;b style=&quot;font-size:9.5px;color:#7E22CE;&quot;&gt;SaaS Target:&lt;/b&gt;&lt;br&gt;&lt;b style=&quot;font-size:9px;color:#0F172A;&quot;&gt;Workspace / Workday&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#64748B;&quot;&gt;Evergreen Managed Cloud&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9333EA;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1438" y="125" width="119" height="52" as="geometry"/>
        </mxCell>
        <mxCell id="card_rep_w1" value="&lt;div style=&quot;font-size:7.5px;background:#F3E8FF;color:#7E22CE;font-weight:bold;padding:1px 4px;border-radius:3px;margin-bottom:2px;&quot;&gt;Collaboration&lt;/div&gt;&lt;b style=&quot;font-size:8.5px;color:#0F172A;&quot;&gt;On-Prem Exchange&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Google Workspace&lt;br&gt;Gemini AI Sidekick&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1438" y="185" width="119" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="card_rep_w2" value="&lt;div style=&quot;font-size:7.5px;background:#F3E8FF;color:#7E22CE;font-weight:bold;padding:1px 4px;border-radius:3px;margin-bottom:2px;&quot;&gt;HR &amp;amp; Payroll&lt;/div&gt;&lt;b style=&quot;font-size:8.5px;color:#0F172A;&quot;&gt;Custom HR Database&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Workday Cloud SaaS&lt;br&gt;Zero Patching Effort&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1438" y="252" width="119" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="card_rep_w3" value="&lt;div style=&quot;font-size:7.5px;background:#F1F5F9;color:#475569;font-weight:bold;padding:1px 4px;border-radius:3px;margin-bottom:2px;&quot;&gt;CRM SaaS&lt;/div&gt;&lt;b style=&quot;font-size:8.5px;color:#0F172A;&quot;&gt;Salesforce Cloud&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;BigQuery Data Sync&lt;br&gt;Real-Time Webhooks&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1438" y="320" width="119" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="card_rep_roi" value="&lt;b style=&quot;font-size:8.5px;color:#7E22CE;&quot;&gt;Strategic Value:&lt;/b&gt;&lt;br&gt;&lt;b style=&quot;font-size:11px;color:#16A34A;&quot;&gt;100% Up-to-Date&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#64748B;&quot;&gt;Zero Infra Maintenance&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#86EFAC;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1438" y="560" width="119" height="72" as="geometry"/>
        </mxCell>

        <!-- ================= COMPACT HORIZONTAL FOOTER LEGEND ================= -->
        <mxCell id="footer_legend" value="&lt;span style=&quot;font-size:9.5px;color:#334155;&quot;&gt;&lt;b&gt;6Rs Legend:&lt;/b&gt; 🔵 Rehost (GCE Lift) &amp;nbsp;|&amp;nbsp; 🟦 Replatform (GKE &amp;amp; Cloud SQL) &amp;nbsp;|&amp;nbsp; 🟪 Refactor (Serverless AI &amp;amp; BigQuery) &amp;nbsp;|&amp;nbsp; ⬛ Retain (Hybrid Interconnect) &amp;nbsp;|&amp;nbsp; 🟥 Retire (Decom &amp;amp; Coldline) &amp;nbsp;|&amp;nbsp; 🟪 Repurchase (SaaS)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="30" y="658" width="1535" height="32" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
