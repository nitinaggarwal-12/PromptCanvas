/**
 * 🏛️ NEW BLUEPRINT 2: HUB-AND-SPOKE AGENT CONFIGURATION MAP
 * Exact High-Fidelity Replica of Hub-and-Spoke Agent Configuration Map Blueprint
 */

export function buildHubAndSpokeAgentConfigXml(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="app.diagrams.net" modified="2026-04-01T00:00:00.000Z" agent="PromptCanvas" version="24.0.0" type="device">
  <diagram id="hub_and_spoke_agent_config" name="Hub-and-Spoke Agent Configuration Map">
    <mxGraphModel dx="1600" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1620" pageHeight="950" background="#FFFFFF">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- MAIN HEADER BOX (TOP LEFT) -->
        <mxCell id="hdr_title_box" value="&lt;b style=&quot;font-size:16px;color:#0F172A;font-family:sans-serif;&quot;&gt;Hub-and-Spoke Agent Configuration Map (Logical AI Config Category)&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size:12.5px;color:#334155;font-weight:normal;&quot;&gt;(Workspace &amp;amp; Tenant Production Environment) (Gemini Platform in View)&lt;/font&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#475569;strokeWidth=1.5;align=left;verticalAlign=middle;spacingLeft=16;" vertex="1" parent="1">
          <mxGeometry x="20" y="16" width="940" height="54" as="geometry"/>
        </mxCell>

        <!-- STATUS & METADATA BOX (TOP RIGHT) -->
        <mxCell id="hdr_meta_box" value="&lt;table style=&quot;font-size:9.5px;color:#0F172A;width:100%;&quot;&gt;&lt;tr&gt;&lt;td&gt;&lt;b&gt;Status:&lt;/b&gt; Continuously Updated&lt;/td&gt;&lt;td&gt;&lt;b&gt;Classification:&lt;/b&gt; High&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;&lt;b&gt;Effort:&lt;/b&gt; High&lt;/td&gt;&lt;td&gt;&lt;b&gt;GCAF Pillar:&lt;/b&gt; Operational Excellence&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td colspan=&quot;2&quot;&gt;&lt;b&gt;Compliance:&lt;/b&gt; 21 CFR Part 11&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#475569;strokeWidth=1.5;align=left;verticalAlign=middle;spacingLeft=10;" vertex="1" parent="1">
          <mxGeometry x="980" y="16" width="460" height="54" as="geometry"/>
        </mxCell>

        <!-- MAIN OUTER CONTAINER: WORKSPACE X -->
        <mxCell id="box_workspace_outer" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#475569;strokeWidth=1.5;arcSize=2;" vertex="1" parent="1">
          <mxGeometry x="20" y="86" width="1420" height="740" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_ws_title" value="&lt;b style=&quot;font-size:12px;color:#0F172A;&quot;&gt;Workspace X (Tenant Y - Production Environment)&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=top;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="36" y="94" width="380" height="20" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_gemini_designer" value="&lt;b style=&quot;font-size:12px;color:#475569;&quot;&gt;Gemini Enterprise / Agent Designer&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=top;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="500" y="94" width="300" height="20" as="geometry"/>
        </mxCell>

        <!-- ==================== LEFT COLUMN: 3 SUB-AGENTS (SPOKES) ==================== -->

        <!-- SPOKE 1: CUSTOMER SUPPORT -->
        <mxCell id="spoke1_persona" value="&lt;font style=&quot;font-size:20px;&quot;&gt;👤&lt;/font&gt;&lt;br&gt;&lt;b style=&quot;font-size:8.5px;color:#0F172A;&quot;&gt;Sub-Agent 1&lt;br&gt;(Support Tickets)&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="30" y="210" width="85" height="50" as="geometry"/>
        </mxCell>
        <mxCell id="spoke1_container" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=1.2;arcSize=2;" vertex="1" parent="1">
          <mxGeometry x="120" y="130" width="300" height="175" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_spoke1_title" value="&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;Sub-Agent (Spoke) 1 - Customer Support&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Logical Configuration Matrix&lt;/font&gt;" style="text;html=1;align=center;verticalAlign=top;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="120" y="134" width="300" height="28" as="geometry"/>
        </mxCell>

        <!-- Spoke 1 Knowledge Section -->
        <mxCell id="spoke1_know_box" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1;arcSize=2;" vertex="1" parent="1">
          <mxGeometry x="128" y="166" width="284" height="66" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_spoke1_know" value="&lt;b style=&quot;font-size:8px;color:#1E40AF;&quot;&gt;Dedicated Knowledge Section (Grounding)&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=top;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="134" y="168" width="220" height="14" as="geometry"/>
        </mxCell>
        <mxCell id="spoke1_bq" value="&lt;font style=&quot;font-size:14px;&quot;&gt;🔍&lt;/font&gt;&lt;br&gt;&lt;b style=&quot;font-size:7px;color:#0F172A;&quot;&gt;BigQuery&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="134" y="184" width="50" height="42" as="geometry"/>
        </mxCell>
        <mxCell id="spoke1_vec" value="&lt;font style=&quot;font-size:14px;&quot;&gt;📊&lt;/font&gt;&lt;br&gt;&lt;b style=&quot;font-size:7px;color:#0F172A;&quot;&gt;Vector Search&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="190" y="184" width="65" height="42" as="geometry"/>
        </mxCell>
        <mxCell id="spoke1_ticket" value="&lt;font style=&quot;font-size:8px;color:#0F172A;&quot;&gt;Support SA to&lt;br&gt;(Support Tickets)&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="260" y="184" width="144" height="42" as="geometry"/>
        </mxCell>

        <!-- Spoke 1 Tool Proxies -->
        <mxCell id="spoke1_tool_box" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1;arcSize=2;" vertex="1" parent="1">
          <mxGeometry x="128" y="236" width="284" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_spoke1_tool" value="&lt;b style=&quot;font-size:8px;color:#1E40AF;&quot;&gt;Tool / MCP Proxies&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=top;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="134" y="238" width="120" height="14" as="geometry"/>
        </mxCell>
        <mxCell id="spoke1_api_cmd" value="&lt;font style=&quot;font-size:7.5px;color:#475569;&quot;&gt;API calls (standardized&lt;br&gt;Invoker commands)&lt;/font&gt;" style="text;html=1;align=left;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="134" y="254" width="105" height="36" as="geometry"/>
        </mxCell>
        <mxCell id="spoke1_zendesk" value="&lt;b style=&quot;font-size:8px;color:#0F172A;&quot;&gt;Support SA using&lt;br&gt;Zendesk API&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF3C7;strokeColor=#F59E0B;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="245" y="252" width="158" height="38" as="geometry"/>
        </mxCell>

        <!-- SPOKE 2: FULFILLMENT -->
        <mxCell id="spoke2_persona" value="&lt;font style=&quot;font-size:20px;&quot;&gt;👥&lt;/font&gt;&lt;br&gt;&lt;b style=&quot;font-size:8.5px;color:#0F172A;&quot;&gt;Fulfillment SA&lt;br&gt;(BigQuery)&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="30" y="440" width="85" height="50" as="geometry"/>
        </mxCell>
        <mxCell id="spoke2_container" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#16A34A;strokeWidth=1.2;arcSize=2;" vertex="1" parent="1">
          <mxGeometry x="120" y="325" width="300" height="175" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_spoke2_title" value="&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;Sub-Agent 2 - Fulfillment&lt;/b&gt;&amp;nbsp;&lt;font style=&quot;font-size:12px;&quot;&gt;🐍&lt;/font&gt;" style="text;html=1;align=center;verticalAlign=top;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="120" y="330" width="300" height="20" as="geometry"/>
        </mxCell>

        <!-- Spoke 2 Knowledge Section -->
        <mxCell id="spoke2_know_box" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1;arcSize=2;" vertex="1" parent="1">
          <mxGeometry x="128" y="352" width="284" height="74" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_spoke2_know" value="&lt;b style=&quot;font-size:8px;color:#15803D;&quot;&gt;Dedicated Knowledge Section (Grounding)&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=top;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="134" y="354" width="220" height="14" as="geometry"/>
        </mxCell>
        <mxCell id="spoke2_bq" value="&lt;font style=&quot;font-size:14px;&quot;&gt;🔍&lt;/font&gt;&lt;br&gt;&lt;b style=&quot;font-size:7px;color:#0F172A;&quot;&gt;BigQuery&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="134" y="372" width="50" height="42" as="geometry"/>
        </mxCell>
        <mxCell id="spoke2_gcs" value="&lt;font style=&quot;font-size:14px;&quot;&gt;🗄️&lt;/font&gt;&lt;br&gt;&lt;b style=&quot;font-size:7px;color:#0F172A;&quot;&gt;Cloud Storage&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="190" y="372" width="65" height="42" as="geometry"/>
        </mxCell>
        <mxCell id="spoke2_sap" value="&lt;font style=&quot;font-size:8px;color:#0F172A;&quot;&gt;Fulfillment SA using&lt;br&gt;SAP ERP API&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF3C7;strokeColor=#F59E0B;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="260" y="372" width="144" height="42" as="geometry"/>
        </mxCell>

        <!-- Spoke 2 Specific Config -->
        <mxCell id="spoke2_cfg_box" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1;arcSize=2;" vertex="1" parent="1">
          <mxGeometry x="128" y="432" width="284" height="58" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_spoke2_cfg" value="&lt;b style=&quot;font-size:8px;color:#15803D;&quot;&gt;Specific Config&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size:7.5px;color:#475569;&quot;&gt;Dedicated Gemini models and specialized&lt;br&gt;system instructions&lt;/font&gt;" style="text;html=1;align=center;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="134" y="436" width="270" height="48" as="geometry"/>
        </mxCell>

        <!-- SPOKE 3: KNOWLEDGE BASE -->
        <mxCell id="spoke3_persona" value="&lt;font style=&quot;font-size:20px;&quot;&gt;🗄️&lt;/font&gt;&lt;br&gt;&lt;b style=&quot;font-size:8px;color:#0F172A;&quot;&gt;Knowledge SA&lt;br&gt;to GCS (PDF/Doc)&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="30" y="680" width="85" height="50" as="geometry"/>
        </mxCell>
        <mxCell id="spoke3_container" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=1.2;arcSize=2;" vertex="1" parent="1">
          <mxGeometry x="120" y="520" width="300" height="190" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_spoke3_title" value="&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;Sub-Agent 3 - Knowledge Base&lt;/b&gt;&amp;nbsp;&lt;font style=&quot;font-size:12px;&quot;&gt;☁️&lt;/font&gt;" style="text;html=1;align=center;verticalAlign=top;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="120" y="525" width="300" height="20" as="geometry"/>
        </mxCell>

        <!-- Spoke 3 Knowledge Section -->
        <mxCell id="spoke3_know_box" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1;arcSize=2;" vertex="1" parent="1">
          <mxGeometry x="128" y="546" width="284" height="66" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_spoke3_know" value="&lt;b style=&quot;font-size:8px;color:#1E40AF;&quot;&gt;Dedicated Knowledge Section (Grounding)&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=top;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="134" y="548" width="220" height="14" as="geometry"/>
        </mxCell>
        <mxCell id="spoke3_gcs" value="&lt;font style=&quot;font-size:14px;&quot;&gt;🗄️&lt;/font&gt;&lt;br&gt;&lt;b style=&quot;font-size:7px;color:#0F172A;&quot;&gt;GCS Storage&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="134" y="564" width="60" height="42" as="geometry"/>
        </mxCell>
        <mxCell id="spoke3_vec" value="&lt;font style=&quot;font-size:14px;&quot;&gt;🔍&lt;/font&gt;&lt;br&gt;&lt;b style=&quot;font-size:7px;color:#0F172A;&quot;&gt;Vector Search&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="200" y="564" width="65" height="42" as="geometry"/>
        </mxCell>
        <mxCell id="spoke3_doc" value="&lt;font style=&quot;font-size:7.5px;color:#0F172A;&quot;&gt;Docs from&lt;br&gt;PDF/Doc docs&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="270" y="564" width="134" height="42" as="geometry"/>
        </mxCell>

        <!-- Spoke 3 Tool Proxies -->
        <mxCell id="spoke3_tool_box" value="&lt;b style=&quot;font-size:8px;color:#1E40AF;&quot;&gt;Tool / MCP Proxies (e.g. using Zendesk API)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1;align=center;verticalAlign=middle;arcSize=2;" vertex="1" parent="1">
          <mxGeometry x="128" y="618" width="284" height="26" as="geometry"/>
        </mxCell>

        <!-- Spoke 3 Specific Config -->
        <mxCell id="spoke3_cfg_box" value="&lt;b style=&quot;font-size:8px;color:#1E40AF;&quot;&gt;Specific Config&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size:7.5px;color:#475569;&quot;&gt;Dedicated Gemini models and specialized system instructions&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1;align=center;verticalAlign=middle;arcSize=2;" vertex="1" parent="1">
          <mxGeometry x="128" y="648" width="284" height="52" as="geometry"/>
        </mxCell>


        <!-- ==================== CENTER COLUMN: ORCHESTRATOR HUB ==================== -->
        <mxCell id="hub_container" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#0284C7;strokeWidth=1.5;arcSize=2;" vertex="1" parent="1">
          <mxGeometry x="460" y="130" width="310" height="520" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_hub_title" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Orchestrator (Parent Agent)&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size:9px;color:#334155;&quot;&gt;Hub - Logical UI Config Matrix&lt;/font&gt;" style="text;html=1;align=center;verticalAlign=top;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="460" y="136" width="310" height="30" as="geometry"/>
        </mxCell>
        <mxCell id="hub_logo" value="&lt;font style=&quot;font-size:16px;color:#0284C7;&quot;&gt;🌐&lt;/font&gt;" style="text;html=1;align=center;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="726" y="136" width="34" height="24" as="geometry"/>
        </mxCell>

        <!-- Center 1. General Configuration -->
        <mxCell id="hub_gen_box" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;arcSize=2;" vertex="1" parent="1">
          <mxGeometry x="470" y="174" width="290" height="106" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_hub_gen" value="&lt;b style=&quot;font-size:8.5px;color:#0F172A;&quot;&gt;1. General Configuration&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=top;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="476" y="178" width="160" height="14" as="geometry"/>
        </mxCell>
        <mxCell id="gen_form_ui" value="&lt;font style=&quot;font-size:7px;color:#94A3B8;&quot;&gt;General Form&lt;br&gt;[______]&lt;br&gt;[______]&lt;br&gt;[______]&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="476" y="196" width="90" height="76" as="geometry"/>
        </mxCell>
        <mxCell id="gen_item_model" value="&lt;b style=&quot;font-size:8px;color:#0F172A;&quot;&gt;Gemini 3.7 Flash&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;align=left;verticalAlign=middle;spacingLeft=6;" vertex="1" parent="1">
          <mxGeometry x="572" y="196" width="180" height="17" as="geometry"/>
        </mxCell>
        <mxCell id="gen_item_sys" value="&lt;font style=&quot;font-size:8px;color:#0F172A;&quot;&gt;Global System Instructions&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;align=left;verticalAlign=middle;spacingLeft=6;" vertex="1" parent="1">
          <mxGeometry x="572" y="216" width="180" height="17" as="geometry"/>
        </mxCell>
        <mxCell id="gen_item_ctx" value="&lt;font style=&quot;font-size:8px;color:#0F172A;&quot;&gt;Shared Context Window&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;align=left;verticalAlign=middle;spacingLeft=6;" vertex="1" parent="1">
          <mxGeometry x="572" y="236" width="180" height="17" as="geometry"/>
        </mxCell>
        <mxCell id="gen_item_ttl" value="&lt;font style=&quot;font-size:8px;color:#0F172A;&quot;&gt;Memory TTL&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;align=left;verticalAlign=middle;spacingLeft=6;" vertex="1" parent="1">
          <mxGeometry x="572" y="256" width="180" height="17" as="geometry"/>
        </mxCell>

        <!-- Center 2. Multi-Agent Router / Dispatcher Logic -->
        <mxCell id="hub_router_box" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;arcSize=2;" vertex="1" parent="1">
          <mxGeometry x="470" y="286" width="290" height="110" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_hub_router" value="&lt;b style=&quot;font-size:8.5px;color:#0F172A;&quot;&gt;Multi-Agent Router / Dispatcher Logic&lt;/b&gt;&amp;nbsp;&lt;font style=&quot;font-size:10px;&quot;&gt;⚙️&lt;/font&gt;" style="text;html=1;align=left;verticalAlign=top;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="476" y="290" width="260" height="14" as="geometry"/>
        </mxCell>
        <mxCell id="rule_row1" value="&lt;font style=&quot;font-size:7.5px;color:#0F172A;&quot;&gt;&lt;b&gt;if intent == &quot;customer_support&quot;&lt;/b&gt; ➔ Dispatch to Support Sub-Agent&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#BFDBFE;align=left;verticalAlign=middle;spacingLeft=4;" vertex="1" parent="1">
          <mxGeometry x="476" y="310" width="278" height="24" as="geometry"/>
        </mxCell>
        <mxCell id="rule_row2" value="&lt;font style=&quot;font-size:7.5px;color:#0F172A;&quot;&gt;&lt;b&gt;if intent == &quot;order_status&quot;&lt;/b&gt; ➔ Dispatch to Fulfillment Sub-Agent&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#BBF7D0;align=left;verticalAlign=middle;spacingLeft=4;" vertex="1" parent="1">
          <mxGeometry x="476" y="338" width="278" height="24" as="geometry"/>
        </mxCell>
        <mxCell id="rule_row3" value="&lt;font style=&quot;font-size:7.5px;color:#0F172A;&quot;&gt;&lt;b&gt;if intent == &quot;knowledge_query&quot;&lt;/b&gt; ➔ Dispatch to Knowledge Sub-Agent&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#BFDBFE;align=left;verticalAlign=middle;spacingLeft=4;" vertex="1" parent="1">
          <mxGeometry x="476" y="366" width="278" height="24" as="geometry"/>
        </mxCell>

        <!-- Center 3. Shared Memory & Vertex AI Runtime -->
        <mxCell id="hub_mem_box" value="&lt;font style=&quot;font-size:14px;&quot;&gt;🗄️&lt;/font&gt;&lt;br&gt;&lt;b style=&quot;font-size:8px;color:#0F172A;&quot;&gt;Shared Memory &amp;amp; State&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size:7px;color:#475569;&quot;&gt;Shared external state storage&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;align=center;verticalAlign=middle;arcSize=2;" vertex="1" parent="1">
          <mxGeometry x="470" y="404" width="140" height="66" as="geometry"/>
        </mxCell>
        <mxCell id="hub_runtime_box" value="&lt;font style=&quot;font-size:14px;&quot;&gt;🧠&lt;/font&gt;&lt;br&gt;&lt;b style=&quot;font-size:8px;color:#0F172A;&quot;&gt;Vertex AI Agent Runtime&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size:7px;color:#475569;&quot;&gt;Model invocation call pattern&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;align=center;verticalAlign=middle;arcSize=2;" vertex="1" parent="1">
          <mxGeometry x="620" y="404" width="140" height="66" as="geometry"/>
        </mxCell>
        <mxCell id="edge_mem_to_runtime" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#94A3B8;strokeWidth=1.2;dashed=1;endArrow=block;endFill=1;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="610" y="437" as="sourcePoint"/><mxPoint x="620" y="437" as="targetPoint"/></mxGeometry>
        </mxCell>

        <!-- Center 4. 21 CFR Part 11 Compliance Gate -->
        <mxCell id="hub_compliance_gate" value="&lt;font style=&quot;font-size:14px;&quot;&gt;🏛️&lt;/font&gt;&amp;nbsp;&lt;b style=&quot;font-size:8.5px;color:#15803D;&quot;&gt;21 CFR Part 11 Compliance Gate&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size:7.5px;color:#475569;&quot;&gt;All configuration updates are validated and signed.&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#16A34A;strokeWidth=1.2;align=center;verticalAlign=middle;arcSize=2;" vertex="1" parent="1">
          <mxGeometry x="470" y="478" width="290" height="50" as="geometry"/>
        </mxCell>

        <!-- Routing & Dispatch Flow Edges between Spokes and Hub -->
        <mxCell id="lbl_user_req" value="&lt;font style=&quot;font-size:7.5px;color:#0F172A;&quot;&gt;User Requests&lt;br&gt;Flow intent-based&lt;br&gt;dispatch&lt;/font&gt;" style="text;html=1;align=center;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="415" y="240" width="48" height="40" as="geometry"/>
        </mxCell>
        <mxCell id="edge_hub_to_spoke1" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#DC2626;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="470" y="322" as="sourcePoint"/><mxPoint x="420" y="220" as="targetPoint"/><Array as="points"><mxPoint x="440" y="322"/><mxPoint x="440" y="220"/></Array></mxGeometry>
        </mxCell>
        <mxCell id="edge_hub_to_spoke2" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#7C3AED;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="470" y="350" as="sourcePoint"/><mxPoint x="420" y="412" as="targetPoint"/><Array as="points"><mxPoint x="440" y="350"/><mxPoint x="440" y="412"/></Array></mxGeometry>
        </mxCell>
        <mxCell id="edge_hub_to_spoke3" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0284C7;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="470" y="378" as="sourcePoint"/><mxPoint x="420" y="615" as="targetPoint"/><Array as="points"><mxPoint x="440" y="378"/><mxPoint x="440" y="615"/></Array></mxGeometry>
        </mxCell>

        <!-- Grounding Flow Notes -->
        <mxCell id="lbl_grounding1" value="&lt;font style=&quot;font-size:7px;color:#475569;&quot;&gt;Spoke-to-Grounding&lt;/font&gt;" style="text;html=1;align=center;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="320" y="306" width="100" height="16" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_grounding2" value="&lt;font style=&quot;font-size:7px;color:#475569;&quot;&gt;Spoke-to-Grounding&lt;/font&gt;" style="text;html=1;align=center;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="320" y="502" width="100" height="16" as="geometry"/>
        </mxCell>

        <!-- Center Bottom: Immutable Audit Trail -->
        <mxCell id="hub_audit_box" value="&lt;font style=&quot;font-size:14px;&quot;&gt;📜&lt;/font&gt;&lt;br&gt;&lt;b style=&quot;font-size:9px;color:#0F172A;&quot;&gt;Immutable Audit Trail &amp;amp; E-Signature Ledger&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size:8px;color:#15803D;&quot;&gt;21 CFR Part 11&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;align=center;verticalAlign=middle;arcSize=2;" vertex="1" parent="1">
          <mxGeometry x="510" y="670" width="210" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="edge_gate_to_audit" value="&lt;font style=&quot;font-size:7.5px;color:#15803D;&quot;&gt;Compliance flows&lt;/font&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#16A34A;strokeWidth=1.2;dashed=1;endArrow=block;endFill=1;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="615" y="528" as="sourcePoint"/><mxPoint x="615" y="670" as="targetPoint"/></mxGeometry>
        </mxCell>


        <!-- ==================== TOP RIGHT: LOGICAL UI CONFIGURATION MATRIX ==================== -->
        <mxCell id="box_ui_matrix_outer" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;arcSize=2;" vertex="1" parent="1">
          <mxGeometry x="810" y="130" width="370" height="268" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_ui_matrix_title" value="&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;Logical UI Configuration Matrix&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size:8px;color:#475569;&quot;&gt;(Referenced from Logical Configuration's console)&lt;/font&gt;" style="text;html=1;align=center;verticalAlign=top;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="810" y="134" width="370" height="26" as="geometry"/>
        </mxCell>

        <!-- Matrix Item 1: Prompt editors -->
        <mxCell id="lbl_mat_prompt" value="&lt;b style=&quot;font-size:8px;color:#0F172A;&quot;&gt;Prompt editors&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="816" y="170" width="90" height="24" as="geometry"/>
        </mxCell>
        <mxCell id="ui_prompt_box" value="&lt;font style=&quot;font-size:7.5px;color:#94A3B8;&quot;&gt;Prompt editor&lt;br&gt;System: You are an enterprise AI assistant...&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;align=left;verticalAlign=middle;spacingLeft=6;" vertex="1" parent="1">
          <mxGeometry x="930" y="166" width="240" height="30" as="geometry"/>
        </mxCell>
        <mxCell id="edge_mat_p" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#94A3B8;strokeWidth=1;endArrow=block;endFill=1;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="906" y="181" as="sourcePoint"/><mxPoint x="930" y="181" as="targetPoint"/></mxGeometry></mxCell>

        <!-- Matrix Item 2: Rule editors -->
        <mxCell id="lbl_mat_rules" value="&lt;b style=&quot;font-size:8px;color:#0F172A;&quot;&gt;Rule editors/&lt;br&gt;Rule editors&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="816" y="208" width="90" height="30" as="geometry"/>
        </mxCell>
        <mxCell id="ui_rules_box" value="&lt;font style=&quot;font-size:7px;color:#0F172A;&quot;&gt;1: if intent == &quot;customer_support&quot;&lt;br&gt;2: if intent == &quot;order_status&quot;&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;align=left;verticalAlign=middle;spacingLeft=6;" vertex="1" parent="1">
          <mxGeometry x="930" y="204" width="140" height="40" as="geometry"/>
        </mxCell>
        <mxCell id="ui_rules_side" value="&lt;font style=&quot;font-size:7px;color:#94A3B8;&quot;&gt;Rule editors&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1080" y="204" width="90" height="40" as="geometry"/>
        </mxCell>
        <mxCell id="edge_mat_r" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#94A3B8;strokeWidth=1;endArrow=block;endFill=1;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="906" y="224" as="sourcePoint"/><mxPoint x="930" y="224" as="targetPoint"/></mxGeometry></mxCell>

        <!-- Matrix Item 3: Knowledge Source selectors -->
        <mxCell id="lbl_mat_know" value="&lt;b style=&quot;font-size:8px;color:#0F172A;&quot;&gt;Knowledge Source&lt;br&gt;selectors&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="816" y="256" width="110" height="26" as="geometry"/>
        </mxCell>
        <mxCell id="ui_know_select" value="&lt;font style=&quot;font-size:7.5px;color:#0F172A;&quot;&gt;🔍 Knowledge Source: BigQuery, GCS ▾&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;align=left;verticalAlign=middle;spacingLeft=6;" vertex="1" parent="1">
          <mxGeometry x="930" y="254" width="240" height="28" as="geometry"/>
        </mxCell>
        <mxCell id="edge_mat_k" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#94A3B8;strokeWidth=1;endArrow=block;endFill=1;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="916" y="268" as="sourcePoint"/><mxPoint x="930" y="268" as="targetPoint"/></mxGeometry></mxCell>

        <!-- Matrix Item 4: API Config panels -->
        <mxCell id="lbl_mat_api" value="&lt;b style=&quot;font-size:8px;color:#0F172A;&quot;&gt;API Config panels&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="816" y="298" width="110" height="24" as="geometry"/>
        </mxCell>
        <mxCell id="ui_api_box1" value="&lt;font style=&quot;font-size:7px;color:#0F172A;&quot;&gt;Support API ▾&lt;br&gt;&lt;i style=&quot;color:#94A3B8;&quot;&gt;Endpoint encryption&lt;/i&gt;&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;align=left;verticalAlign=middle;spacingLeft=4;" vertex="1" parent="1">
          <mxGeometry x="930" y="294" width="115" height="34" as="geometry"/>
        </mxCell>
        <mxCell id="ui_api_box2" value="&lt;font style=&quot;font-size:7px;color:#0F172A;&quot;&gt;API Config ▾&lt;br&gt;&lt;i style=&quot;color:#94A3B8;&quot;&gt;Activation...&lt;/i&gt;&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;align=left;verticalAlign=middle;spacingLeft=4;" vertex="1" parent="1">
          <mxGeometry x="1055" y="294" width="115" height="34" as="geometry"/>
        </mxCell>
        <mxCell id="edge_mat_a" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#94A3B8;strokeWidth=1;endArrow=block;endFill=1;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="916" y="311" as="sourcePoint"/><mxPoint x="930" y="311" as="targetPoint"/></mxGeometry></mxCell>

        <!-- Bidirectional Edge Hub to UI Matrix -->
        <mxCell id="edge_hub_to_matrix" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0284C7;strokeWidth=1.2;dashed=1;endArrow=block;endFill=1;startArrow=block;startFill=1;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="770" y="264" as="sourcePoint"/><mxPoint x="810" y="264" as="targetPoint"/></mxGeometry>
        </mxCell>


        <!-- ==================== BOTTOM RIGHT: MANAGEMENT CONSOLE & GOVERNANCE ==================== -->
        <mxCell id="box_console_gate" value="&lt;b style=&quot;font-size:9.5px;color:#0F172A;&quot;&gt;Logical UI Config&lt;br&gt;Management Console&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size:7.5px;color:#475569;&quot;&gt;(from Tenant Architecture)&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#475569;strokeWidth=1.2;align=center;verticalAlign=middle;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="810" y="420" width="140" height="60" as="geometry"/>
        </mxCell>

        <mxCell id="box_hitl_gate" value="&lt;font style=&quot;font-size:16px;&quot;&gt;🧑‍💼📱&lt;/font&gt;&lt;br&gt;&lt;b style=&quot;font-size:9px;color:#0F172A;&quot;&gt;Human-in-the-Loop&lt;br&gt;(HITL) Gate&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#0284C7;strokeWidth=1.2;align=center;verticalAlign=middle;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="900" y="520" width="130" height="60" as="geometry"/>
        </mxCell>

        <!-- Edges Console -> HITL -> Hub & Audit -->
        <mxCell id="edge_console_to_hitl" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0284C7;strokeWidth=1.2;endArrow=block;endFill=1;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="880" y="480" as="sourcePoint"/><mxPoint x="965" y="520" as="targetPoint"/><Array as="points"><mxPoint x="880" y="500"/><mxPoint x="965" y="500"/></Array></mxGeometry>
        </mxCell>
        <mxCell id="edge_hitl_to_hub" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0284C7;strokeWidth=1.2;endArrow=block;endFill=1;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="900" y="550" as="sourcePoint"/><mxPoint x="770" y="500" as="targetPoint"/><Array as="points"><mxPoint x="840" y="550"/><mxPoint x="840" y="500"/></Array></mxGeometry>
        </mxCell>
        <mxCell id="edge_hitl_to_audit" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#16A34A;strokeWidth=1.2;dashed=1;endArrow=block;endFill=1;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="965" y="580" as="sourcePoint"/><mxPoint x="720" y="700" as="targetPoint"/><Array as="points"><mxPoint x="965" y="700"/></Array></mxGeometry>
        </mxCell>

        <!-- Top Right Personas & Economic Dashboards -->
        <mxCell id="box_persona_gov_top" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;arcSize=2;" vertex="1" parent="1">
          <mxGeometry x="1060" y="420" width="200" height="110" as="geometry"/>
        </mxCell>
        <mxCell id="persona_ai_arch" value="&lt;font style=&quot;font-size:16px;&quot;&gt;👤&lt;/font&gt;&lt;br&gt;&lt;b style=&quot;font-size:7.5px;color:#0F172A;&quot;&gt;AI Architect&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="1070" y="426" width="60" height="36" as="geometry"/>
        </mxCell>
        <mxCell id="persona_wt_arch" value="&lt;font style=&quot;font-size:16px;&quot;&gt;👤&lt;/font&gt;&lt;br&gt;&lt;b style=&quot;font-size:7.5px;color:#0F172A;&quot;&gt;W&amp;amp;T Arch&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="1070" y="468" width="60" height="36" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_runtime_perf1" value="&lt;font style=&quot;font-size:8px;color:#0F172A;&quot;&gt;Runtime performance&lt;br&gt;&amp;amp; compliance&lt;/font&gt;" style="text;html=1;align=left;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="1136" y="428" width="115" height="24" as="geometry"/>
        </mxCell>
        <mxCell id="dash_economic" value="&lt;font style=&quot;font-size:14px;&quot;&gt;📊&lt;/font&gt;&lt;br&gt;&lt;b style=&quot;font-size:7.5px;color:#0F172A;&quot;&gt;Agent Economic&lt;br&gt;dashboards&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="1136" y="456" width="115" height="42" as="geometry"/>
        </mxCell>

        <!-- Persona Callouts Runtime Performance & Compliance -->
        <mxCell id="box_persona_gov_bot" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;arcSize=2;" vertex="1" parent="1">
          <mxGeometry x="810" y="640" width="220" height="90" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_persona_callouts" value="&lt;b style=&quot;font-size:8px;color:#15803D;&quot;&gt;Persona Callouts&lt;/b&gt;&lt;br&gt;&lt;font style=&quot;font-size:7.5px;color:#0F172A;&quot;&gt;Runtime Performance &amp;amp; compliance&lt;/font&gt;" style="text;html=1;align=left;verticalAlign=top;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="816" y="644" width="200" height="24" as="geometry"/>
        </mxCell>
        <mxCell id="persona_wt_bot" value="&lt;font style=&quot;font-size:16px;&quot;&gt;👤&lt;/font&gt;&lt;br&gt;&lt;b style=&quot;font-size:7.5px;color:#0F172A;&quot;&gt;W&amp;amp;T Arch&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="816" y="674" width="55" height="42" as="geometry"/>
        </mxCell>
        <mxCell id="dash_runtime_metrics" value="&lt;font style=&quot;font-size:14px;&quot;&gt;📈 📊&lt;/font&gt;&lt;br&gt;&lt;b style=&quot;font-size:7.5px;color:#0F172A;&quot;&gt;Agent Runtime Metrics&lt;br&gt;dashboards&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="874" y="670" width="145" height="46" as="geometry"/>
        </mxCell>

        <!-- ==================== LEGEND CONTAINER (BOTTOM RIGHT) ==================== -->
        <mxCell id="box_legend" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="1270" y="550" width="155" height="260" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_legend_title" value="&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;Legend&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=top;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="1280" y="556" width="100" height="16" as="geometry"/>
        </mxCell>

        <mxCell id="leg_sym_icon" value="&lt;font style=&quot;font-size:11px;&quot;&gt;🛡️ 🌐 ⚙️&lt;/font&gt;" style="text;html=1;align=left;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="1280" y="574" width="55" height="20" as="geometry"/>
        </mxCell>
        <mxCell id="leg_sym_txt" value="&lt;font style=&quot;font-size:8px;color:#0F172A;&quot;&gt;Symbol&lt;/font&gt;" style="text;html=1;align=left;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="1340" y="574" width="70" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="leg_syms_icon" value="&lt;font style=&quot;font-size:10px;&quot;&gt;👤 👥&lt;/font&gt;" style="text;html=1;align=left;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="1280" y="598" width="55" height="20" as="geometry"/>
        </mxCell>
        <mxCell id="leg_syms_txt" value="&lt;font style=&quot;font-size:8px;color:#0F172A;&quot;&gt;Symbols&lt;/font&gt;" style="text;html=1;align=left;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="1340" y="598" width="70" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="leg_arr_red" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#DC2626;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="1280" y="630" as="sourcePoint"/><mxPoint x="1330" y="630" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="leg_arr_red_txt" value="&lt;font style=&quot;font-size:8px;color:#0F172A;&quot;&gt;Routing flow&lt;/font&gt;" style="text;html=1;align=left;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="1340" y="620" width="80" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="leg_arr_blue" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0284C7;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="1280" y="654" as="sourcePoint"/><mxPoint x="1330" y="654" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="leg_arr_blue_txt" value="&lt;font style=&quot;font-size:8px;color:#0F172A;&quot;&gt;Data grounding flow&lt;/font&gt;" style="text;html=1;align=left;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="1340" y="644" width="80" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="leg_arr_green" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#16A34A;strokeWidth=1.2;dashed=1;endArrow=block;endFill=1;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="1280" y="678" as="sourcePoint"/><mxPoint x="1330" y="678" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="leg_arr_green_txt" value="&lt;font style=&quot;font-size:8px;color:#0F172A;&quot;&gt;Compliance flow&lt;/font&gt;" style="text;html=1;align=left;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="1340" y="668" width="80" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="leg_arr_grey" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#94A3B8;strokeWidth=1.2;dashed=1;endArrow=block;endFill=1;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="1280" y="702" as="sourcePoint"/><mxPoint x="1330" y="702" as="targetPoint"/></mxGeometry>
        </mxCell>
        <mxCell id="leg_arr_grey_txt" value="&lt;font style=&quot;font-size:8px;color:#0F172A;&quot;&gt;Configuration update&lt;/font&gt;" style="text;html=1;align=left;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="1340" y="692" width="80" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="leg_clr_blue" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#3B82F6;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="1280" y="726" width="45" height="10" as="geometry"/>
        </mxCell>
        <mxCell id="leg_clr_blue_txt" value="&lt;font style=&quot;font-size:8px;color:#0F172A;&quot;&gt;Color&lt;/font&gt;" style="text;html=1;align=left;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="1340" y="720" width="70" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="leg_clr_green" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#10B981;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="1280" y="750" width="45" height="10" as="geometry"/>
        </mxCell>
        <mxCell id="leg_clr_green_txt" value="&lt;font style=&quot;font-size:8px;color:#0F172A;&quot;&gt;Colors&lt;/font&gt;" style="text;html=1;align=left;verticalAlign=middle;fillColor=none;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="1340" y="744" width="70" height="20" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
