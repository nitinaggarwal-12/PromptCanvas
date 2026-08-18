/**
 * 🏛️ BLUEPRINT: WBS 0.1.2: 6Rs MIGRATION DISPOSITION MATRIX (ASSESSMENT PHASE)
 * Exact High-Fidelity Replica of 6Rs Migration Disposition Matrix Architecture Blueprint
 * Vertically compressed into 1600x720 widescreen viewport with zero dead space.
 */

export function build6RsMigrationMatrixXml(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="app.diagrams.net" modified="2026-04-01T00:00:00.000Z" agent="PromptCanvas" version="24.0.0" type="device">
  <diagram id="six_rs_migration_matrix" name="WBS 0.1.2: 6Rs Migration Disposition Matrix">
    <mxGraphModel dx="1600" dy="720" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="720" background="#FFFFFF">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- ================= MAIN HEADER ================= -->
        <mxCell id="hdr_title" value="&lt;b style=&quot;font-size:18px;color:#0F172A;font-family:sans-serif;&quot;&gt;WBS 0.1.2: 6Rs Migration Disposition Matrix (Assessment Phase)&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="30" y="10" width="700" height="26" as="geometry"/>
        </mxCell>

        <!-- ================= TOP-LEFT METADATA CARD (COMPRESSED) ================= -->
        <mxCell id="meta_card" value="&lt;div style=&quot;line-height:14px;font-size:9.5px;color:#334155;text-align:left;font-family:sans-serif;&quot;&gt;&lt;b style=&quot;color:#0F172A;&quot;&gt;GCAF Pillar:&lt;/b&gt; Cost Optimization &amp;amp; Operational Excellence &amp;nbsp;|&amp;nbsp; &lt;b style=&quot;color:#0F172A;&quot;&gt;Phase:&lt;/b&gt; Phase 0: Assessment &amp;amp; Planning&lt;br&gt;&lt;b style=&quot;color:#0F172A;&quot;&gt;Persona:&lt;/b&gt; 4. Cloud Infrastructure Lead &amp;amp; Data Architect &amp;nbsp;|&amp;nbsp; &lt;b style=&quot;color:#0F172A;&quot;&gt;Target Audience:&lt;/b&gt; C-Suite, PMO, Migration Teams&lt;br&gt;&lt;b style=&quot;color:#0F172A;&quot;&gt;Prerequisites:&lt;/b&gt; Legacy Data &amp;amp; System Dependency Map (WBS 0.1.1)&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#94A3B8;strokeWidth=1.2;align=left;verticalAlign=middle;spacingLeft=10;arcSize=4;" vertex="1" parent="1">
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
          <mxGeometry x="68" y="145" width="34" height="34" as="geometry"/>
        </mxCell>
        <mxCell id="cyl_vm_backing" value="" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=3;fillColor=#E0F2FE;strokeColor=#0284C7;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="92" y="158" width="18" height="20" as="geometry"/>
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
        <mxCell id="col_rehost" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#E0F2FE;strokeColor=#0284C7;strokeWidth=1.5;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="705" y="60" width="135" height="586" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_rehost_hdr" value="&lt;b style=&quot;font-size:11.5px;color:#0369A1;&quot;&gt;Rehost&lt;/b&gt;&lt;br&gt;&lt;b style=&quot;font-size:9.5px;color:#0F172A;&quot;&gt;(Lift &amp;amp; Shift)&lt;/b&gt;&lt;br&gt;&lt;i style=&quot;font-size:8px;color:#475569;&quot;&gt;Minimal change.&lt;br&gt;High speed, lower risk.&lt;/i&gt;" style="text;html=1;align=center;verticalAlign=top;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="705" y="66" width="135" height="56" as="geometry"/>
        </mxCell>
        <mxCell id="icon_rehost_vm" value="" style="sketch=0;outlineConnect=0;fontColor=#232F3E;gradientColor=none;strokeColor=none;fillColor=#0284C7;align=center;verticalAlign=top;shape=mxgraph.gcp2.compute_engine;" vertex="1" parent="1">
          <mxGeometry x="755" y="190" width="36" height="42" as="geometry"/>
        </mxCell>
        <mxCell id="edge_rehost_down" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0284C7;strokeWidth=2;endArrow=block;endFill=1;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="773" y="240" as="sourcePoint"/><mxPoint x="773" y="275" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="icon_rehost_cloud" value="" style="ellipse;shape=cloud;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="740" y="280" width="66" height="44" as="geometry"/>
        </mxCell>
        <mxCell id="card_rehost_examples" value="&lt;b style=&quot;font-size:9px;color:#0F172A;&quot;&gt;Examples:&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size:8px;color:#475569;&quot;&gt;Compute Engine (GCE),&lt;br&gt;Migrate for Anthos.&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="715" y="380" width="115" height="60" as="geometry"/>
        </mxCell>

        <!-- COLUMN 2: REPLATFORM (LIFT & RESHAPE) -->
        <mxCell id="col_replatform" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#2563EB;strokeWidth=1.5;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="850" y="60" width="135" height="586" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_replatform_hdr" value="&lt;b style=&quot;font-size:11.5px;color:#1D4ED8;&quot;&gt;Replatform&lt;/b&gt;&lt;br&gt;&lt;b style=&quot;font-size:9.5px;color:#0F172A;&quot;&gt;(Lift &amp;amp; Reshape)&lt;/b&gt;&lt;br&gt;&lt;i style=&quot;font-size:8px;color:#475569;&quot;&gt;Managed services.&lt;br&gt;Balance effort/value.&lt;/i&gt;" style="text;html=1;align=center;verticalAlign=top;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="850" y="66" width="135" height="56" as="geometry"/>
        </mxCell>
        <mxCell id="icon_repl_vm" value="" style="sketch=0;outlineConnect=0;fontColor=#232F3E;gradientColor=none;strokeColor=none;fillColor=#2563EB;align=center;verticalAlign=top;shape=mxgraph.gcp2.compute_engine;" vertex="1" parent="1">
          <mxGeometry x="865" y="215" width="26" height="34" as="geometry"/>
        </mxCell>
        <mxCell id="icon_repl_gke" value="" style="sketch=0;outlineConnect=0;fontColor=#232F3E;gradientColor=none;strokeColor=none;fillColor=#2563EB;align=center;verticalAlign=top;shape=mxgraph.gcp2.container_engine;" vertex="1" parent="1">
          <mxGeometry x="925" y="185" width="30" height="30" as="geometry"/>
        </mxCell>
        <mxCell id="cyl_repl_db" value="" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=4;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="926" y="255" width="28" height="34" as="geometry"/>
        </mxCell>
        <mxCell id="edge_vm_to_gke" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="891" y="225" as="sourcePoint"/><mxPoint x="920" y="200" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="edge_vm_to_db" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="891" y="240" as="sourcePoint"/><mxPoint x="924" y="272" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="card_repl_examples" value="&lt;b style=&quot;font-size:9px;color:#0F172A;&quot;&gt;Examples:&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size:8px;color:#475569;&quot;&gt;Google Kubernetes Engine (GKE), Cloud SQL.&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="860" y="380" width="115" height="60" as="geometry"/>
        </mxCell>

        <!-- COLUMN 3: REFACTOR (RE-ARCHITECT) -->
        <mxCell id="col_refactor" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=1.5;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="995" y="60" width="135" height="586" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_refactor_hdr" value="&lt;b style=&quot;font-size:11.5px;color:#1E40AF;&quot;&gt;Refactor&lt;/b&gt;&lt;br&gt;&lt;b style=&quot;font-size:9.5px;color:#0F172A;&quot;&gt;(Re-architect)&lt;/b&gt;&lt;br&gt;&lt;i style=&quot;font-size:8px;color:#475569;&quot;&gt;Cloud native.&lt;br&gt;High agility, high ROI.&lt;/i&gt;" style="text;html=1;align=center;verticalAlign=top;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="995" y="66" width="135" height="56" as="geometry"/>
        </mxCell>
        <mxCell id="icon_ref_cloud" value="" style="ellipse;shape=cloud;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1030" y="210" width="66" height="44" as="geometry"/>
        </mxCell>
        <mxCell id="card_ref_examples" value="&lt;b style=&quot;font-size:9px;color:#0F172A;&quot;&gt;Examples:&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size:8px;color:#475569;&quot;&gt;Cloud Run, Cloud Functions, BigQuery.&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1005" y="380" width="115" height="60" as="geometry"/>
        </mxCell>

        <!-- COLUMN 4: RETAIN (REVISIT) -->
        <mxCell id="col_retain" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#64748B;strokeWidth=1.5;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="1140" y="60" width="135" height="586" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_retain_hdr" value="&lt;b style=&quot;font-size:11.5px;color:#334155;&quot;&gt;Retain&lt;/b&gt;&lt;br&gt;&lt;b style=&quot;font-size:9.5px;color:#0F172A;&quot;&gt;(Revisit)&lt;/b&gt;&lt;br&gt;&lt;i style=&quot;font-size:8px;color:#475569;&quot;&gt;Keep as-is for now.&lt;br&gt;Re-evaluate later.&lt;/i&gt;" style="text;html=1;align=center;verticalAlign=top;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="1140" y="66" width="135" height="56" as="geometry"/>
        </mxCell>
        <mxCell id="icon_retain_box" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#64748B;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1180" y="215" width="55" height="40" as="geometry"/>
        </mxCell>
        <mxCell id="card_retain_examples" value="&lt;b style=&quot;font-size:9px;color:#0F172A;&quot;&gt;Examples:&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size:8px;color:#475569;&quot;&gt;Mainframes, Regulatory locked data.&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1150" y="380" width="115" height="60" as="geometry"/>
        </mxCell>

        <!-- COLUMN 5: RETIRE (DECOMMISSION) -->
        <mxCell id="col_retire" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF2F2;strokeColor=#EF4444;strokeWidth=1.5;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="1285" y="60" width="135" height="586" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_retire_hdr" value="&lt;b style=&quot;font-size:11.5px;color:#B91C1C;&quot;&gt;Retire&lt;/b&gt;&lt;br&gt;&lt;b style=&quot;font-size:9.5px;color:#0F172A;&quot;&gt;(Decommission)&lt;/b&gt;&lt;br&gt;&lt;i style=&quot;font-size:8px;color:#475569;&quot;&gt;Phase out redundant&lt;br&gt;or obsolete apps.&lt;/i&gt;" style="text;html=1;align=center;verticalAlign=top;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="1285" y="66" width="135" height="56" as="geometry"/>
        </mxCell>
        <mxCell id="icon_retire_x" value="&lt;span style=&quot;font-size:26px;color:#EF4444;&quot;&gt;🗑️&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1335" y="215" width="35" height="35" as="geometry"/>
        </mxCell>
        <mxCell id="card_retire_examples" value="&lt;b style=&quot;font-size:9px;color:#0F172A;&quot;&gt;Examples:&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size:8px;color:#475569;&quot;&gt;Legacy reporting, duplicate CRMs.&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1295" y="380" width="115" height="60" as="geometry"/>
        </mxCell>

        <!-- COLUMN 6: REPURCHASE (DROP & SHOP) -->
        <mxCell id="col_repurchase" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#A855F7;strokeWidth=1.5;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="1430" y="60" width="135" height="586" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_repurchase_hdr" value="&lt;b style=&quot;font-size:11.5px;color:#7E22CE;&quot;&gt;Repurchase&lt;/b&gt;&lt;br&gt;&lt;b style=&quot;font-size:9.5px;color:#0F172A;&quot;&gt;(Drop &amp;amp; Shop)&lt;/b&gt;&lt;br&gt;&lt;i style=&quot;font-size:8px;color:#475569;&quot;&gt;Move to SaaS.&lt;br&gt;Offload maintenance.&lt;/i&gt;" style="text;html=1;align=center;verticalAlign=top;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="1430" y="66" width="135" height="56" as="geometry"/>
        </mxCell>
        <mxCell id="icon_rep_saas" value="&lt;span style=&quot;font-size:26px;color:#7E22CE;&quot;&gt;🛍️ ☁️&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1465" y="215" width="65" height="35" as="geometry"/>
        </mxCell>
        <mxCell id="card_rep_examples" value="&lt;b style=&quot;font-size:9px;color:#0F172A;&quot;&gt;Examples:&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size:8px;color:#475569;&quot;&gt;Google Workspace, Salesforce, Workday.&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1440" y="380" width="115" height="60" as="geometry"/>
        </mxCell>

        <!-- ================= COMPACT HORIZONTAL FOOTER LEGEND ================= -->
        <mxCell id="footer_legend" value="&lt;span style=&quot;font-size:9px;color:#475569;&quot;&gt;&lt;b&gt;Legend:&lt;/b&gt; 🔵 On-Prem VM &amp;nbsp;|&amp;nbsp; 🗄️ Legacy DB &amp;nbsp;|&amp;nbsp; 🖥️ Mainframe &amp;nbsp;|&amp;nbsp; ☸️ Managed K8s (GKE) &amp;nbsp;|&amp;nbsp; ☁️ Cloud SQL / Spanner &amp;nbsp;|&amp;nbsp; ── Dependencies &amp;nbsp;|&amp;nbsp; - - Feedback Validation&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="30" y="658" width="1535" height="32" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
