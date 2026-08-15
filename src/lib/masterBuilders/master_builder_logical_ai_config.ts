/**
 * 🏛️ NEW BLUEPRINT 1: PRODUCT PLAN - LOGICAL AI CONFIG (TENANT ARCHITECTURE)
 * Exact High-Fidelity Replica of Product Plan - Logical AI Config (Tenant Architecture) Blueprint
 */

export function buildLogicalAiConfigTenantXml(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="app.diagrams.net" modified="2026-04-01T00:00:00.000Z" agent="PromptCanvas" version="24.0.0" type="device">
  <diagram id="logical_ai_config_tenant" name="Product Plan - Logical AI Config (Tenant Architecture)">
    <mxGraphModel dx="1600" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1620" pageHeight="950" background="#FFFFFF">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- MAIN HEADER BOX -->
        <mxCell id="hdr_title_box" value="&lt;b style=&quot;font-size:18px;color:#0F172A;font-family:sans-serif;&quot;&gt;Product Plan - Logical AI Config (Tenant Architecture)&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size:13px;color:#334155;font-weight:normal;&quot;&gt;Logical AI Config | To-Be&lt;/font&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#475569;strokeWidth=1.5;align=left;verticalAlign=middle;spacingLeft=16;" vertex="1" parent="1">
          <mxGeometry x="20" y="16" width="620" height="54" as="geometry"/>
        </mxCell>

        <!-- OUTER CONTAINER: ENTERPRISE AI PLATFORM -->
        <mxCell id="box_platform_outer" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#475569;strokeWidth=1.5;arcSize=2;" vertex="1" parent="1">
          <mxGeometry x="170" y="80" width="1340" height="740" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_platform_outer" value="&lt;b style=&quot;font-size:12px;color:#334155;&quot;&gt;Enterprise AI Platform (within Total Unified System View)&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=top;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="170" y="86" width="1340" height="20" as="geometry"/>
        </mxCell>

        <!-- INNER CONTAINER: GEMINI ENTERPRISE -->
        <mxCell id="box_gemini_enterprise" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#0284C7;strokeWidth=1.2;arcSize=2;" vertex="1" parent="1">
          <mxGeometry x="240" y="114" width="1250" height="460" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_gemini_enterprise" value="&lt;b style=&quot;font-size:14px;color:#0F172A;&quot;&gt;Gemini Enterprise&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=top;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="240" y="120" width="1250" height="22" as="geometry"/>
        </mxCell>

        <!-- LEFT SECTION: ACTORS & CONFIG MANAGEMENT -->
        <!-- App Owners, Devs Persona -->
        <mxCell id="box_persona_devs" value="&lt;font style=&quot;font-size:22px;&quot;&gt;👥&lt;/font&gt;&lt;br&gt;&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;App Owners,&lt;br&gt;Devs&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="10" y="475" width="70" height="50" as="geometry"/>
        </mxCell>

        <!-- Logical AI Config Management Console Box -->
        <mxCell id="box_config_console" value="&lt;b style=&quot;font-size:9.5px;color:#0F172A;&quot;&gt;Logical AI&lt;br&gt;Config&lt;br&gt;Management&lt;br&gt;Console&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#475569;strokeWidth=1.2;align=center;verticalAlign=middle;arcSize=4;" vertex="1" parent="1">
          <mxGeometry x="78" y="468" width="84" height="66" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_config_apis" value="&lt;font style=&quot;font-size:8px;color:#475569;&quot;&gt;Logical AI&lt;br&gt;Config Updates&lt;br&gt;APIs&lt;/font&gt;" style="text;html=1;align=center;verticalAlign=top;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="78" y="538" width="84" height="30" as="geometry"/>
        </mxCell>

        <!-- Arrow Persona to Console -->
        <mxCell id="edge_devs_to_console" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#1E293B;strokeWidth=1.2;endArrow=block;endFill=1;" edge="1" parent="1" source="box_persona_devs" target="box_config_console">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- Enterprise IAM Box -->
        <mxCell id="box_iam" value="&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;Enterprise&lt;br&gt;IAM&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#475569;strokeWidth=1.2;align=center;verticalAlign=middle;arcSize=4;" vertex="1" parent="1">
          <mxGeometry x="135" y="474" width="70" height="54" as="geometry"/>
        </mxCell>
        <mxCell id="edge_console_to_iam" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#1E293B;strokeWidth=1.2;endArrow=block;endFill=1;" edge="1" parent="1" source="box_config_console" target="box_iam">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- Environment Segregation Label on Left Border -->
        <mxCell id="lbl_env_seg" value="&lt;b style=&quot;font-size:9.5px;color:#0F172A;&quot;&gt;Environment&lt;br&gt;Segregation&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="180" y="210" width="80" height="30" as="geometry"/>
        </mxCell>
        <mxCell id="edge_seg_arrow" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#94A3B8;strokeWidth=1;dashed=1;endArrow=open;endFill=0;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="200" y="244" as="sourcePoint"/>
            <mxPoint x="248" y="270" as="targetPoint"/>
          </mxGeometry>
        </mxCell>

        <!-- TIER 1: DEVELOPMENT ENVIRONMENT -->
        <mxCell id="box_dev_env" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.2;arcSize=2;" vertex="1" parent="1">
          <mxGeometry x="254" y="148" width="556" height="110" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_dev_hdr" value="&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;DEVELOPMENT ENVIRONMENT&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=top;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="264" y="152" width="200" height="16" as="geometry"/>
        </mxCell>

        <mxCell id="box_dev_boundary" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#94A3B8;strokeWidth=1;dashed=1;arcSize=2;" vertex="1" parent="1">
          <mxGeometry x="264" y="174" width="366" height="74" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_dev_boundary" value="&lt;font style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Tenant Boundary&lt;/font&gt;" style="text;html=1;align=left;verticalAlign=top;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="270" y="176" width="100" height="14" as="geometry"/>
        </mxCell>

        <mxCell id="dev_ws_a" value="&lt;b style=&quot;font-size:9.5px;color:#0F172A;&quot;&gt;Workspace A&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size:14px;color:#475569;&quot;&gt;...&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1;align=center;verticalAlign=middle;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="282" y="194" width="126" height="46" as="geometry"/>
        </mxCell>
        <mxCell id="dev_ws_b" value="&lt;b style=&quot;font-size:9.5px;color:#0F172A;&quot;&gt;Workspace B&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size:14px;color:#475569;&quot;&gt;...&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#86EFAC;strokeWidth=1;align=center;verticalAlign=middle;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="430" y="194" width="126" height="46" as="geometry"/>
        </mxCell>

        <!-- TIER 2: TESTING ENVIRONMENT -->
        <mxCell id="box_test_env" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.2;arcSize=2;" vertex="1" parent="1">
          <mxGeometry x="254" y="270" width="556" height="120" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_test_hdr" value="&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;TESTING ENVIRONMENT&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=top;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="264" y="274" width="200" height="16" as="geometry"/>
        </mxCell>

        <mxCell id="box_test_boundary" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#94A3B8;strokeWidth=1;dashed=1;arcSize=2;" vertex="1" parent="1">
          <mxGeometry x="264" y="296" width="366" height="84" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_test_boundary" value="&lt;font style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Tenant Boundary&lt;/font&gt;" style="text;html=1;align=left;verticalAlign=top;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="270" y="298" width="100" height="14" as="geometry"/>
        </mxCell>

        <mxCell id="test_ws_a" value="&lt;b style=&quot;font-size:9.5px;color:#0F172A;&quot;&gt;Workspace A&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size:14px;color:#475569;&quot;&gt;...&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1;align=center;verticalAlign=middle;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="282" y="320" width="126" height="50" as="geometry"/>
        </mxCell>
        <mxCell id="test_ws_b" value="&lt;b style=&quot;font-size:9.5px;color:#0F172A;&quot;&gt;Workspace B&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size:14px;color:#475569;&quot;&gt;...&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#86EFAC;strokeWidth=1;align=center;verticalAlign=middle;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="430" y="320" width="126" height="50" as="geometry"/>
        </mxCell>

        <!-- Platform Orchestrator Box -->
        <mxCell id="box_orchestrator" value="&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;Platform&lt;br&gt;Orchestrator&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.2;align=center;verticalAlign=middle;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="660" y="318" width="90" height="52" as="geometry"/>
        </mxCell>

        <!-- Edges from Dev/Test into Platform Orchestrator -->
        <mxCell id="edge_dev_to_orch" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#1E293B;strokeWidth=1.2;endArrow=block;endFill=1;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="630" y="210" as="sourcePoint"/>
            <mxPoint x="705" y="318" as="targetPoint"/>
            <Array as="points"><mxPoint x="705" y="210"/></Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="edge_test_to_orch" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#1E293B;strokeWidth=1.2;endArrow=block;endFill=1;" edge="1" parent="1" source="box_test_boundary" target="box_orchestrator">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- IAM Routing into Dev, Test, Prod Environments -->
        <mxCell id="edge_iam_to_dev" value="&lt;font style=&quot;font-size:7.5px;color:#475569;&quot;&gt;Logical AI&lt;br&gt;Config Updates&lt;/font&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#1E293B;strokeWidth=1.2;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="170" y="474" as="sourcePoint"/>
            <mxPoint x="282" y="217" as="targetPoint"/>
            <Array as="points"><mxPoint x="170" y="217"/></Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="edge_iam_to_test" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#1E293B;strokeWidth=1.2;endArrow=block;endFill=1;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="205" y="500" as="sourcePoint"/>
            <mxPoint x="282" y="345" as="targetPoint"/>
            <Array as="points"><mxPoint x="225" y="500"/><mxPoint x="225" y="345"/></Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="edge_iam_to_prod" value="&lt;font style=&quot;font-size:7.5px;color:#475569;&quot;&gt;Logical AI&lt;br&gt;Config Updates&lt;/font&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#1E293B;strokeWidth=1.2;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="170" y="528" as="sourcePoint"/>
            <mxPoint x="274" y="528" as="targetPoint"/>
          </mxGeometry>
        </mxCell>

        <!-- TOP RIGHT: LOGICAL AI CONFIG BLUEPRINT CONTAINER -->
        <mxCell id="box_top_config_outer" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.2;arcSize=2;" vertex="1" parent="1">
          <mxGeometry x="840" y="148" width="240" height="234" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_top_config_hdr" value="&lt;font style=&quot;font-size:13px;&quot;&gt;⚙️&lt;/font&gt;&amp;nbsp;&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;Logical AI Config&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=top;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="850" y="154" width="180" height="18" as="geometry"/>
        </mxCell>

        <!-- Stack of Config Components -->
        <mxCell id="cfg_model" value="&lt;b style=&quot;font-size:8.5px;color:#0F172A;&quot;&gt;Model Selection&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size:7.5px;color:#475569;&quot;&gt;(Gemini 3.7 Flash)&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;align=left;verticalAlign=middle;spacingLeft=8;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="852" y="178" width="180" height="32" as="geometry"/>
        </mxCell>
        <mxCell id="cfg_sys" value="&lt;b style=&quot;font-size:8.5px;color:#0F172A;&quot;&gt;System Instructions&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;align=left;verticalAlign=middle;spacingLeft=8;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="852" y="214" width="180" height="24" as="geometry"/>
        </mxCell>
        <mxCell id="cfg_mem" value="&lt;b style=&quot;font-size:8.5px;color:#0F172A;&quot;&gt;Memory &amp;amp; Context Management&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;align=left;verticalAlign=middle;spacingLeft=8;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="852" y="242" width="180" height="24" as="geometry"/>
        </mxCell>
        <mxCell id="cfg_tool" value="&lt;b style=&quot;font-size:8.5px;color:#0F172A;&quot;&gt;Tool Invocation Definitions&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;align=left;verticalAlign=middle;spacingLeft=8;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="852" y="270" width="180" height="24" as="geometry"/>
        </mxCell>

        <!-- Workspace Boundary Annotation on Right of Config -->
        <mxCell id="lbl_ws_boundary_annot" value="&lt;font style=&quot;font-size:8px;color:#475569;&quot;&gt;Workspace Boundary&lt;br&gt;defines logical configuration&lt;br&gt;isolation&lt;/font&gt;" style="text;html=1;align=left;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="1090" y="200" width="140" height="40" as="geometry"/>
        </mxCell>

        <!-- Gemini Enterprise Engine (instance) Top Box -->
        <mxCell id="box_gemini_engine_top" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;Gemini Enterprise Engine&lt;br&gt;(instance)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#0284C7;strokeWidth=1.2;align=center;verticalAlign=middle;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="860" y="318" width="200" height="46" as="geometry"/>
        </mxCell>
        <mxCell id="edge_orch_to_engine" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#1E293B;strokeWidth=1.2;endArrow=block;endFill=1;" edge="1" parent="1" source="box_orchestrator" target="box_gemini_engine_top">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- RIGHT SIDE: NETWORK SECURITY PERIMETERS & COMPLIANCE LABELS -->
        <mxCell id="lbl_net_sec1" value="&lt;b style=&quot;font-size:8.5px;color:#0F172A;&quot;&gt;Network Security Perimeters&lt;br&gt;(VPC, Firewalls)&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="1310" y="150" width="150" height="30" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_net_sec2" value="&lt;b style=&quot;font-size:8.5px;color:#0F172A;&quot;&gt;Network Security Perimeters&lt;br&gt;(VPC, Firewalls)&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="1310" y="270" width="150" height="30" as="geometry"/>
        </mxCell>

        <!-- Compliance Ribbon Banners on Right -->
        <mxCell id="ribbon_soc2_top" value="&lt;font style=&quot;font-size:12px;&quot;&gt;🛡️&lt;/font&gt;&amp;nbsp;&lt;b style=&quot;font-size:8.5px;color:#92400E;&quot;&gt;SOC 2 Compliant Guardrails&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF3C7;strokeColor=#F59E0B;strokeWidth=1;align=center;verticalAlign=middle;arcSize=4;" vertex="1" parent="1">
          <mxGeometry x="1280" y="320" width="170" height="24" as="geometry"/>
        </mxCell>
        <mxCell id="ribbon_gxp_top" value="&lt;font style=&quot;font-size:12px;&quot;&gt;📑&lt;/font&gt;&amp;nbsp;&lt;b style=&quot;font-size:8.5px;color:#1E40AF;&quot;&gt;GxP Compliance Requirements&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=1;align=center;verticalAlign=middle;arcSize=4;" vertex="1" parent="1">
          <mxGeometry x="1280" y="348" width="170" height="24" as="geometry"/>
        </mxCell>

        <!-- TIER 3: PRODUCTION ENVIRONMENT -->
        <mxCell id="box_prod_env" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#475569;strokeWidth=1.5;arcSize=2;" vertex="1" parent="1">
          <mxGeometry x="254" y="415" width="1230" height="195" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_prod_hdr" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;PRODUCTION ENVIRONMENT&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=top;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="264" y="420" width="220" height="18" as="geometry"/>
        </mxCell>

        <!-- Workspace A Container in Prod -->
        <mxCell id="box_prod_ws_a" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.2;arcSize=2;" vertex="1" parent="1">
          <mxGeometry x="264" y="442" width="490" height="156" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_prod_ws_title" value="&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;Workspace A&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=top;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="272" y="446" width="100" height="16" as="geometry"/>
        </mxCell>

        <!-- Inner Logical AI Config in Prod -->
        <mxCell id="box_prod_config" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;arcSize=2;" vertex="1" parent="1">
          <mxGeometry x="274" y="466" width="195" height="124" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_prod_config_title" value="&lt;b style=&quot;font-size:9px;color:#0F172A;&quot;&gt;Logical AI Config&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=top;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="280" y="470" width="120" height="14" as="geometry"/>
        </mxCell>
        <mxCell id="pcfg_model" value="&lt;font style=&quot;font-size:7.5px;color:#0F172A;&quot;&gt;Model Selection (Gemini 3.7 Flash)&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;align=left;verticalAlign=middle;spacingLeft=4;" vertex="1" parent="1">
          <mxGeometry x="280" y="488" width="182" height="20" as="geometry"/>
        </mxCell>
        <mxCell id="pcfg_sys" value="&lt;font style=&quot;font-size:7.5px;color:#0F172A;&quot;&gt;System Instructions&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;align=left;verticalAlign=middle;spacingLeft=4;" vertex="1" parent="1">
          <mxGeometry x="280" y="512" width="182" height="20" as="geometry"/>
        </mxCell>
        <mxCell id="pcfg_mem" value="&lt;font style=&quot;font-size:7.5px;color:#0F172A;&quot;&gt;Memory &amp;amp; Context Management&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;align=left;verticalAlign=middle;spacingLeft=4;" vertex="1" parent="1">
          <mxGeometry x="280" y="536" width="182" height="20" as="geometry"/>
        </mxCell>
        <mxCell id="pcfg_tool" value="&lt;font style=&quot;font-size:7.5px;color:#0F172A;&quot;&gt;Tool Invocation Definitions&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;align=left;verticalAlign=middle;spacingLeft=4;" vertex="1" parent="1">
          <mxGeometry x="280" y="560" width="182" height="20" as="geometry"/>
        </mxCell>

        <!-- Inner Agent Designer in Prod -->
        <mxCell id="box_prod_designer" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;arcSize=2;" vertex="1" parent="1">
          <mxGeometry x="478" y="466" width="268" height="124" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_prod_designer_title" value="&lt;b style=&quot;font-size:9px;color:#0F172A;&quot;&gt;Agent Designer&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=top;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="484" y="470" width="120" height="14" as="geometry"/>
        </mxCell>

        <!-- Topologies (Visual Clusters) -->
        <mxCell id="topo_single" value="&lt;font style=&quot;font-size:14px;&quot;&gt;🟢-🟢&lt;/font&gt;&lt;br&gt;&lt;b style=&quot;font-size:7px;color:#0F172A;&quot;&gt;Single-agent&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="484" y="492" width="68" height="42" as="geometry"/>
        </mxCell>
        <mxCell id="topo_multi" value="&lt;font style=&quot;font-size:14px;&quot;&gt;🟢-🟢-🟢&lt;/font&gt;&lt;br&gt;&lt;b style=&quot;font-size:7px;color:#0F172A;&quot;&gt;Multi-agent&lt;br&gt;chains&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="560" y="492" width="84" height="42" as="geometry"/>
        </mxCell>
        <mxCell id="topo_task" value="&lt;font style=&quot;font-size:14px;&quot;&gt;🟢-🔲-🟢&lt;/font&gt;&lt;br&gt;&lt;b style=&quot;font-size:7px;color:#0F172A;&quot;&gt;Task-based&lt;br&gt;sub-agents&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="652" y="492" width="84" height="42" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_agent_topos" value="&lt;b style=&quot;font-size:8px;color:#475569;&quot;&gt;Agent Topologies&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="478" y="564" width="268" height="16" as="geometry"/>
        </mxCell>

        <!-- Downward edge from Engine to Applications Call Endpoints -->
        <mxCell id="edge_engine_to_apps" value="&lt;font style=&quot;font-size:8px;color:#0F172A;&quot;&gt;Applications call&lt;br&gt;endpoints in and&lt;br&gt;invoke agents&lt;/font&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#1E293B;strokeWidth=1.2;dashed=1;endArrow=block;endFill=1;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="960" y="364" as="sourcePoint"/>
            <mxPoint x="960" y="475" as="targetPoint"/>
          </mxGeometry>
        </mxCell>

        <!-- Right Side Prod Logic: Endpoints & Application Logic -->
        <mxCell id="lbl_call_endpoints" value="&lt;font style=&quot;font-size:7.5px;color:#0F172A;&quot;&gt;Call ear&lt;br&gt;endpoints&lt;br&gt;to invoke&lt;br&gt;agents&lt;/font&gt;" style="text;html=1;align=center;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="758" y="495" width="55" height="45" as="geometry"/>
        </mxCell>
        <mxCell id="edge_ws_to_apps" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#1E293B;strokeWidth=1.2;endArrow=block;endFill=1;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="754" y="520" as="sourcePoint"/><mxPoint x="815" y="520" as="targetPoint"/></mxGeometry>
        </mxCell>

        <!-- Intermediate Endpoints Box -->
        <mxCell id="box_endpoints_dots" value="&lt;font style=&quot;font-size:16px;color:#475569;&quot;&gt;...&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="815" y="480" width="70" height="34" as="geometry"/>
        </mxCell>

        <mxCell id="box_app_logic_top" value="&lt;b style=&quot;font-size:9px;color:#0F172A;&quot;&gt;Application&lt;br&gt;Logic&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#475569;strokeWidth=1.2;align=center;verticalAlign=middle;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="930" y="475" width="90" height="40" as="geometry"/>
        </mxCell>

        <mxCell id="box_app_logic_bot" value="&lt;b style=&quot;font-size:9px;color:#0F172A;&quot;&gt;Application&lt;br&gt;Logic&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#475569;strokeWidth=1.2;align=center;verticalAlign=middle;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="815" y="540" width="90" height="36" as="geometry"/>
        </mxCell>

        <mxCell id="box_gemini_prod_engine" value="&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;Gemini Enterprise&lt;br&gt;Engine (instance)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#0284C7;strokeWidth=1.2;align=center;verticalAlign=middle;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="930" y="534" width="140" height="46" as="geometry"/>
        </mxCell>

        <mxCell id="edge_dots_to_app" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#1E293B;strokeWidth=1.2;endArrow=block;endFill=1;" edge="1" parent="1" source="box_endpoints_dots" target="box_app_logic_top">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_app_to_engine" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#1E293B;strokeWidth=1.2;endArrow=block;endFill=1;" edge="1" parent="1" source="box_app_logic_bot" target="box_gemini_prod_engine">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- Compliance Badges in Prod (Blue SOC 2 & GxP Circles) -->
        <mxCell id="badge_soc2_prod" value="&lt;b style=&quot;font-size:8px;color:#FFFFFF;&quot;&gt;SOC&lt;br&gt;2&lt;/b&gt;" style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#0284C7;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="1100" y="475" width="34" height="34" as="geometry"/>
        </mxCell>
        <mxCell id="badge_gxp_prod" value="&lt;b style=&quot;font-size:8px;color:#FFFFFF;&quot;&gt;GxP&lt;/b&gt;" style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#0284C7;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="1140" y="475" width="34" height="34" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_compliance_markers" value="&lt;b style=&quot;font-size:8.5px;color:#0F172A;&quot;&gt;Compliance Markers&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="1185" y="482" width="130" height="20" as="geometry"/>
        </mxCell>

        <!-- Prod Compliance Ribbons -->
        <mxCell id="ribbon_soc2_prod" value="&lt;font style=&quot;font-size:12px;&quot;&gt;🛡️&lt;/font&gt;&amp;nbsp;&lt;b style=&quot;font-size:8.5px;color:#92400E;&quot;&gt;SOC 2 Compliance Guardrails&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF3C7;strokeColor=#F59E0B;strokeWidth=1;align=center;verticalAlign=middle;arcSize=4;" vertex="1" parent="1">
          <mxGeometry x="1100" y="520" width="190" height="24" as="geometry"/>
        </mxCell>
        <mxCell id="ribbon_gxp_prod" value="&lt;font style=&quot;font-size:12px;&quot;&gt;📑&lt;/font&gt;&amp;nbsp;&lt;b style=&quot;font-size:8.5px;color:#1E40AF;&quot;&gt;GxP Compliance Requirements&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=1;align=center;verticalAlign=middle;arcSize=4;" vertex="1" parent="1">
          <mxGeometry x="1100" y="550" width="190" height="24" as="geometry"/>
        </mxCell>

        <mxCell id="lbl_net_sec3" value="&lt;b style=&quot;font-size:8.5px;color:#0F172A;&quot;&gt;Network Security Perimeters&lt;br&gt;(VPC, Firewalls)&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="1310" y="440" width="150" height="30" as="geometry"/>
        </mxCell>

        <!-- BOTTOM SECTION: NETWORK SECURITY PERIMETERS VPC & AUDIT/KMS -->
        <mxCell id="lbl_net_sec_vpc" value="&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;Network&lt;br&gt;Security&lt;br&gt;Perimeters&lt;/b&gt;&amp;nbsp;&lt;font style=&quot;font-size:14px;color:#0284C7;&quot;&gt;🛡️&lt;/font&gt;&amp;nbsp;&lt;font style=&quot;font-size:9px;color:#475569;&quot;&gt;VPC&lt;/font&gt;" style="text;html=1;align=left;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="250" y="635" width="150" height="40" as="geometry"/>
        </mxCell>

        <!-- Centralized Audit Logging Box -->
        <mxCell id="box_central_audit" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;Centralized Audit Logging &amp;amp; Monitoring&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size:8.5px;color:#475569;&quot;&gt;System connected to all monitoring&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#0284C7;strokeWidth=1.2;align=center;verticalAlign=middle;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="500" y="630" width="290" height="45" as="geometry"/>
        </mxCell>

        <!-- Key Management Service (KMS) Box -->
        <mxCell id="box_kms" value="&lt;font style=&quot;font-size:16px;color:#0284C7;&quot;&gt;🔑&lt;/font&gt;&amp;nbsp;&lt;b style=&quot;font-size:9.5px;color:#0F172A;&quot;&gt;Key Management Service (KMS)&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size:8px;color:#475569;&quot;&gt;Config encryption&lt;/font&gt;" style="text;html=1;align=left;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="830" y="630" width="230" height="45" as="geometry"/>
        </mxCell>

        <!-- Dashed Monitoring Line -->
        <mxCell id="edge_audit_dashed" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0284C7;strokeWidth=1.2;dashed=1;endArrow=none;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="790" y="652" as="sourcePoint"/><mxPoint x="830" y="652" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="edge_kms_to_right" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0284C7;strokeWidth=1.2;dashed=1;endArrow=block;endFill=1;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="1300" y="652" as="sourcePoint"/><mxPoint x="1060" y="652" as="targetPoint"/></mxGeometry>
        </mxCell>

        <!-- BOTTOM LEFT: LEGEND CONTAINER -->
        <mxCell id="box_legend" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="20" y="680" width="190" height="140" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_legend_title" value="&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;Legend&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=top;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="30" y="686" width="100" height="16" as="geometry"/>
        </mxCell>

        <mxCell id="leg_soc2_icon" value="&lt;b style=&quot;font-size:7px;color:#FFFFFF;&quot;&gt;SOC&lt;br&gt;2&lt;/b&gt;" style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#0284C7;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="30" y="708" width="20" height="20" as="geometry"/>
        </mxCell>
        <mxCell id="leg_soc2_txt" value="&lt;font style=&quot;font-size:8px;color:#0F172A;&quot;&gt;SOC 2 Compliance&lt;br&gt;Guardrails&lt;/font&gt;" style="text;html=1;align=left;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="58" y="706" width="140" height="24" as="geometry"/>
        </mxCell>

        <mxCell id="leg_ws_icon" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#0284C7;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="30" y="744" width="20" height="8" as="geometry"/>
        </mxCell>
        <mxCell id="leg_ws_txt" value="&lt;font style=&quot;font-size:8px;color:#0F172A;&quot;&gt;Workspaces Separation&lt;/font&gt;" style="text;html=1;align=left;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="58" y="738" width="140" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="leg_req_icon" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#F59E0B;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="30" y="774" width="20" height="8" as="geometry"/>
        </mxCell>
        <mxCell id="leg_req_txt" value="&lt;font style=&quot;font-size:8px;color:#0F172A;&quot;&gt;Compliance Requirements&lt;/font&gt;" style="text;html=1;align=left;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="58" y="768" width="140" height="20" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
