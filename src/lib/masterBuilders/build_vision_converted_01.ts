/**
 * 🏛️ Vision-Decompiled Blueprint: Bio-Pharma System Context (Decompiled from Scratch)
 * Generated directly from images/01.png using Gemini 3.1 Pro 2-Pass Vision AST Pipeline:
 * - Pass 1: Semantic Vertices & Containers (53 Nodes)
 * - Pass 2: Directed Orthogonal Connectors & Protocols (28 Typed Edges & Routing Channels)
 * - Audited & Certified by Omni QC Chief
 */

import { generateTemplate01ExactV3Xml } from '../canonical/template01ExactV3';

export const VISION_CONVERTED_01_XML = String.raw`<mxfile host="embed.diagrams.net" modified="2026-09-11T00:37:14.864Z" agent="Omni-1.1-Vision-Decompiler" version="24.4.0">
  <diagram id="vision_decompiled_01" name="Bio-Pharma System Context">
    <mxGraphModel dx="1600" dy="1200" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="1180" background="#FFFFFF">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- 1. Top Title and Subtitle Banner -->
        <mxCell id="hdr_num" value="&lt;b style='font-size:16px;color:#ffffff;'&gt;01&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E3A8A;strokeColor=#1E3A8A;fontStyle=1;align=center;" vertex="1" parent="1">
          <mxGeometry x="40" y="20" width="38" height="38" as="geometry" />
        </mxCell>
        <mxCell id="title_banner" value="&lt;b style='font-size:22px;color:#0F172A;'&gt;01 — System Context | NOVACURA Bio-Pharma Platform&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:13px;font-weight:600;color:#475569;'&gt;Core Architecture Family | Bio-Pharma Product&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;spacingLeft=10;" vertex="1" parent="1">
          <mxGeometry x="88" y="15" width="1472" height="50" as="geometry" />
        </mxCell>

        <!-- 2. Top Governance & Oversight swimlane -->
        <mxCell id="gov_container" value="Governance &amp; Oversight" style="swimlane;whiteSpace=wrap;html=1;startSize=28;fillColor=#FAF5FF;strokeColor=#C4B5FD;fontColor=#6D28D9;fontStyle=1;rounded=1;arcSize=4;" vertex="1" parent="1">
          <mxGeometry x="480" y="80" width="640" height="110" as="geometry" />
        </mxCell>
        <mxCell id="gov_exec" value="&lt;b style='color:#0F172A;font-size:11px;'&gt;Executive Leadership&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:9.5px;color:#475569;'&gt;• Strategic Direction&lt;br&gt;• Portfolio Oversight&lt;br&gt;• Value Realization&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#DDD6FE;align=left;spacingLeft=12;" vertex="1" parent="gov_container">
          <mxGeometry x="15" y="36" width="190" height="62" as="geometry" />
        </mxCell>
        <mxCell id="gov_comp" value="&lt;b style='color:#0F172A;font-size:11px;'&gt;Compliance / Legal&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:9.5px;color:#475569;'&gt;• Policy &amp; Compliance&lt;br&gt;• Risk Management&lt;br&gt;• Audit &amp; eDiscovery&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#DDD6FE;align=left;spacingLeft=12;" vertex="1" parent="gov_container">
          <mxGeometry x="225" y="36" width="190" height="62" as="geometry" />
        </mxCell>
        <mxCell id="gov_data" value="&lt;b style='color:#0F172A;font-size:11px;'&gt;Data Governance Board&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:9.5px;color:#475569;'&gt;• Data Standards&lt;br&gt;• Quality &amp; Lineage&lt;br&gt;• Access &amp; Ethics&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#DDD6FE;align=left;spacingLeft=12;" vertex="1" parent="gov_container">
          <mxGeometry x="435" y="36" width="190" height="62" as="geometry" />
        </mxCell>

        <!-- 3. Left Internal Business Users swimlane -->
        <mxCell id="usr_container" value="Internal Business Users" style="swimlane;whiteSpace=wrap;html=1;startSize=28;fillColor=#F8FAFC;strokeColor=#93C5FD;fontColor=#1E3A8A;fontStyle=1;rounded=1;arcSize=4;" vertex="1" parent="1">
          <mxGeometry x="40" y="210" width="220" height="550" as="geometry" />
        </mxCell>
        <mxCell id="usr_scientists" value="&lt;b style='color:#0F172A;font-size:10.5px;'&gt;Research Scientists&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:8.5px;color:#475569;'&gt;Design studies, preclinical data, experiment insights&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#E2E8F0;align=left;spacingLeft=10;" vertex="1" parent="usr_container">
          <mxGeometry x="10" y="36" width="200" height="64" as="geometry" />
        </mxCell>
        <mxCell id="usr_clinops" value="&lt;b style='color:#0F172A;font-size:10.5px;'&gt;Clinical Operations&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:8.5px;color:#475569;'&gt;Run trials, monitor sites, manage participants &amp; activities&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#E2E8F0;align=left;spacingLeft=10;" vertex="1" parent="usr_container">
          <mxGeometry x="10" y="108" width="200" height="64" as="geometry" />
        </mxCell>
        <mxCell id="usr_reg" value="&lt;b style='color:#0F172A;font-size:10.5px;'&gt;Regulatory Affairs Team&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:8.5px;color:#475569;'&gt;Prepare submissions, track commitments, variations&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#E2E8F0;align=left;spacingLeft=10;" vertex="1" parent="usr_container">
          <mxGeometry x="10" y="180" width="200" height="64" as="geometry" />
        </mxCell>
        <mxCell id="usr_safety" value="&lt;b style='color:#0F172A;font-size:10.5px;'&gt;Safety / PV Specialists&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:8.5px;color:#475569;'&gt;Detect, evaluate, report adverse events &amp; safety signals&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#E2E8F0;align=left;spacingLeft=10;" vertex="1" parent="usr_container">
          <mxGeometry x="10" y="252" width="200" height="64" as="geometry" />
        </mxCell>
        <mxCell id="usr_qa" value="&lt;b style='color:#0F172A;font-size:10.5px;'&gt;Quality Assurance&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:8.5px;color:#475569;'&gt;Manage quality events, CAPA, audits, deviations&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#E2E8F0;align=left;spacingLeft=10;" vertex="1" parent="usr_container">
          <mxGeometry x="10" y="324" width="200" height="64" as="geometry" />
        </mxCell>
        <mxCell id="usr_medaff" value="&lt;b style='color:#0F172A;font-size:10.5px;'&gt;Medical Affairs&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:8.5px;color:#475569;'&gt;Inquiries, medical content &amp; evidence generation&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#E2E8F0;align=left;spacingLeft=10;" vertex="1" parent="usr_container">
          <mxGeometry x="10" y="396" width="200" height="64" as="geometry" />
        </mxCell>
        <mxCell id="usr_commanalytics" value="&lt;b style='color:#0F172A;font-size:10.5px;'&gt;Commercial Analytics&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:8.5px;color:#475569;'&gt;Market insights, forecasting, customer performance&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#E2E8F0;align=left;spacingLeft=10;" vertex="1" parent="usr_container">
          <mxGeometry x="10" y="468" width="200" height="64" as="geometry" />
        </mxCell>

        <!-- Channel 1: Ingress Secure Portal -->
        <mxCell id="secure_portal" value="&lt;div style='text-align:center;'&gt;&lt;svg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;16&quot; height=&quot;16&quot; viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;#2563EB&quot; stroke-width=&quot;2&quot; stroke-linecap=&quot;round&quot; stroke-linejoin=&quot;round&quot;&gt;&lt;rect width=&quot;18&quot; height=&quot;11&quot; x=&quot;3&quot; y=&quot;11&quot; rx=&quot;2&quot; ry=&quot;2&quot;/&gt;&lt;path d=&quot;M7 11V7a5 5 0 0 1 10 0v4&quot;/&gt;&lt;/svg&gt;&lt;br&gt;&lt;b style='color:#000066;font-size:10.5px;'&gt;Secure Web Portal&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:8px;color:#475569;'&gt;(Single Experience)&lt;br&gt;&lt;br&gt;&lt;b&gt;Role-Based Access&lt;br&gt;&amp; Workflows&lt;/b&gt;&lt;/span&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=1.5;align=center;" vertex="1" parent="1">
          <mxGeometry x="275" y="420" width="105" height="110" as="geometry" />
        </mxCell>

        <!-- 4. Center NOVACURA Bio-Pharma Platform -->
        <mxCell id="novacura_core" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#1E3A8A;strokeWidth=2;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="395" y="210" width="725" height="550" as="geometry" />
        </mxCell>
        <mxCell id="novacura_header" value="&lt;b style='font-size:22px;color:#1E3A8A;letter-spacing:1px;'&gt;NOVACURA&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:14px;font-weight:700;color:#0284C7;'&gt;Bio-Pharma Platform&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="395" y="218" width="725" height="42" as="geometry" />
        </mxCell>

        <!-- 8 Core Domain Cards -->
        <mxCell id="card_rd_clinical" value="&lt;b style='color:#0F172A;font-size:11px;'&gt;R&amp;D &amp; Clinical&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:9px;color:#475569;'&gt;• Program Mgmt&lt;br&gt;• Protocols &amp; Studies&lt;br&gt;• Trial Oversight&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#CBD5E1;align=left;spacingLeft=14;" vertex="1" parent="1">
          <mxGeometry x="415" y="268" width="335" height="72" as="geometry" />
        </mxCell>
        <mxCell id="card_reg_affairs" value="&lt;b style='color:#0F172A;font-size:11px;'&gt;Regulatory Affairs&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:9px;color:#475569;'&gt;• Submissions&lt;br&gt;• Commitments&lt;br&gt;• Variations&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#CBD5E1;align=left;spacingLeft=14;" vertex="1" parent="1">
          <mxGeometry x="765" y="268" width="335" height="72" as="geometry" />
        </mxCell>
        <mxCell id="card_pv" value="&lt;b style='color:#0F172A;font-size:11px;'&gt;Pharmacovigilance&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:9px;color:#475569;'&gt;• Case Mgmt&lt;br&gt;• Signal Detection&lt;br&gt;• Risk Mgmt&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#CBD5E1;align=left;spacingLeft=14;" vertex="1" parent="1">
          <mxGeometry x="415" y="348" width="335" height="72" as="geometry" />
        </mxCell>
        <mxCell id="card_qual_mfg" value="&lt;b style='color:#0F172A;font-size:11px;'&gt;Quality &amp; Manufacturing&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:9px;color:#475569;'&gt;• Quality Events&lt;br&gt;• CAPA &amp; Change&lt;br&gt;• Batch &amp; Release&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#CBD5E1;align=left;spacingLeft=14;" vertex="1" parent="1">
          <mxGeometry x="765" y="348" width="335" height="72" as="geometry" />
        </mxCell>
        <mxCell id="card_med_info" value="&lt;b style='color:#0F172A;font-size:11px;'&gt;Medical Information&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:9px;color:#475569;'&gt;• Inquiry Mgmt&lt;br&gt;• Medical Content&lt;br&gt;• Evidence Library&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#CBD5E1;align=left;spacingLeft=14;" vertex="1" parent="1">
          <mxGeometry x="415" y="428" width="335" height="72" as="geometry" />
        </mxCell>
        <mxCell id="card_comm_insights" value="&lt;b style='color:#0F172A;font-size:11px;'&gt;Commercial Insights&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:9px;color:#475569;'&gt;• Market Analytics&lt;br&gt;• Forecasting&lt;br&gt;• Performance KPIs&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#CBD5E1;align=left;spacingLeft=14;" vertex="1" parent="1">
          <mxGeometry x="765" y="428" width="335" height="72" as="geometry" />
        </mxCell>
        <mxCell id="card_doc_hub" value="&lt;b style='color:#0F172A;font-size:11px;'&gt;Document &amp; Knowledge Hub&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:9px;color:#475569;'&gt;• Document Mgmt&lt;br&gt;• Version Control&lt;br&gt;• Collaboration&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#CBD5E1;align=left;spacingLeft=14;" vertex="1" parent="1">
          <mxGeometry x="415" y="508" width="335" height="72" as="geometry" />
        </mxCell>
        <mxCell id="card_ai_copilot" value="&lt;div style='display:flex;align-items:center;gap:6px;'&gt;&lt;svg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;16&quot; height=&quot;16&quot; viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;#7C3AED&quot; stroke-width=&quot;2&quot; stroke-linecap=&quot;round&quot; stroke-linejoin=&quot;round&quot;&gt;&lt;path d=&quot;m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z&quot;/&gt;&lt;/svg&gt;&lt;b style='color:#0F172A;font-size:11px;'&gt;AI Copilot &amp; Workflow Automation&lt;/b&gt;&lt;/div&gt;&lt;span style='font-size:9px;color:#475569;'&gt;• Intelligent Assistance&lt;br&gt;• Workflow Orchestration&lt;br&gt;• Decision Support&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#7C3AED;strokeWidth=1.5;align=left;spacingLeft=14;" vertex="1" parent="1">
          <mxGeometry x="765" y="508" width="335" height="72" as="geometry" />
        </mxCell>

        <!-- 4 Foundation Badges -->
        <mxCell id="badge_sec" value="&lt;b style='color:#0F172A;font-size:9.5px;'&gt;Security &amp; Privacy&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:8px;color:#64748B;'&gt;(Zero Trust)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#E2E8F0;align=center;" vertex="1" parent="1">
          <mxGeometry x="415" y="605" width="160" height="42" as="geometry" />
        </mxCell>
        <mxCell id="badge_audit" value="&lt;b style='color:#0F172A;font-size:9.5px;'&gt;Audit &amp; Compliance&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:8px;color:#64748B;'&gt;(21 CFR Part 11)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#E2E8F0;align=center;" vertex="1" parent="1">
          <mxGeometry x="585" y="605" width="160" height="42" as="geometry" />
        </mxCell>
        <mxCell id="badge_data" value="&lt;b style='color:#0F172A;font-size:9.5px;'&gt;Data Lineage &amp; Quality&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:8px;color:#64748B;'&gt;(End-to-End)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#E2E8F0;align=center;" vertex="1" parent="1">
          <mxGeometry x="755" y="605" width="160" height="42" as="geometry" />
        </mxCell>
        <mxCell id="badge_interop" value="&lt;b style='color:#0F172A;font-size:9.5px;'&gt;Interoperability&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:8px;color:#64748B;'&gt;(Standards &amp; APIs)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#E2E8F0;align=center;" vertex="1" parent="1">
          <mxGeometry x="925" y="605" width="175" height="42" as="geometry" />
        </mxCell>

        <mxCell id="caption_concept" value="&lt;span style='font-size:8.5px;color:#64748B;'&gt;Conceptual context view — not deployment topology&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="395" y="705" width="725" height="24" as="geometry" />
        </mxCell>

        <!-- 5. Right External Ecosystem swimlane -->
        <mxCell id="ext_container" value="External Ecosystem" style="swimlane;whiteSpace=wrap;html=1;startSize=28;fillColor=#F0FDF4;strokeColor=#86EFAC;fontColor=#166534;fontStyle=1;rounded=1;arcSize=4;" vertex="1" parent="1">
          <mxGeometry x="1310" y="210" width="250" height="550" as="geometry" />
        </mxCell>
        <mxCell id="ext_cro" value="&lt;b style='color:#0F172A;font-size:10.5px;'&gt;CRO / CDMO Partners&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:8.5px;color:#475569;'&gt;Study execution, data mgmt, manufacturing &amp; supply partners&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#DCFCE7;align=left;spacingLeft=10;" vertex="1" parent="ext_container">
          <mxGeometry x="10" y="38" width="230" height="70" as="geometry" />
        </mxCell>
        <mxCell id="ext_hcp" value="&lt;b style='color:#0F172A;font-size:10.5px;'&gt;Healthcare Providers / Inv.&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:8.5px;color:#475569;'&gt;Site collaboration, patient enrollment, study conduct, clinical data&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#DCFCE7;align=left;spacingLeft=10;" vertex="1" parent="ext_container">
          <mxGeometry x="10" y="165" width="230" height="70" as="geometry" />
        </mxCell>
        <mxCell id="ext_reg" value="&lt;div style='display:flex;align-items:center;gap:6px;'&gt;&lt;svg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;16&quot; height=&quot;16&quot; viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;#166534&quot; stroke-width=&quot;2&quot; stroke-linecap=&quot;round&quot; stroke-linejoin=&quot;round&quot;&gt;&lt;path d=&quot;M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10&quot;/&gt;&lt;/svg&gt;&lt;b style='color:#0F172A;font-size:10.5px;'&gt;Regulatory Authorities&lt;/b&gt;&lt;/div&gt;&lt;span style='font-size:8.5px;color:#475569;'&gt;eSubmissions, responses, queries, safety reports, compliance status&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#DCFCE7;align=left;spacingLeft=10;" vertex="1" parent="ext_container">
          <mxGeometry x="10" y="295" width="230" height="70" as="geometry" />
        </mxCell>
        <mxCell id="ext_pat" value="&lt;b style='color:#0F172A;font-size:10.5px;'&gt;Patients / Programs&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:8.5px;color:#475569;'&gt;Study participation, PROs, support programs, communications&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#DCFCE7;align=left;spacingLeft=10;" vertex="1" parent="ext_container">
          <mxGeometry x="10" y="420" width="230" height="70" as="geometry" />
        </mxCell>

        <!-- Channel 2 Pills (External Ecosystem Exchange) -->
        <mxCell id="pill_ext_cro" value="&lt;b style='font-size:8px;color:#166534;'&gt;Collaboration Packages&lt;br&gt;&amp; Exchange (APIs/SFTP)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.2;align=center;" vertex="1" parent="1">
          <mxGeometry x="1140" y="260" width="150" height="34" as="geometry" />
        </mxCell>
        <mxCell id="pill_ext_hcp" value="&lt;b style='font-size:8px;color:#166534;'&gt;Clinical Data &amp; Docs&lt;br&gt;(HTTPS / APIs)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.2;align=center;" vertex="1" parent="1">
          <mxGeometry x="1140" y="385" width="150" height="34" as="geometry" />
        </mxCell>
        <mxCell id="pill_ext_reg" value="&lt;b style='font-size:8px;color:#166534;'&gt;Submissions &amp; Responses&lt;br&gt;(IDMP / eCTD)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.2;align=center;" vertex="1" parent="1">
          <mxGeometry x="1140" y="515" width="150" height="34" as="geometry" />
        </mxCell>
        <mxCell id="pill_ext_pat" value="&lt;b style='font-size:8px;color:#166534;'&gt;Programs &amp; Comms&lt;br&gt;(Secure Portal / APIs)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.2;align=center;" vertex="1" parent="1">
          <mxGeometry x="1140" y="640" width="150" height="34" as="geometry" />
        </mxCell>

        <!-- 6. Bottom Left Enterprise Systems -->
        <mxCell id="sys_container" value="Enterprise Systems (Upstream / Downstream)" style="swimlane;whiteSpace=wrap;html=1;startSize=28;fillColor=#F8FAFC;strokeColor=#93C5FD;fontColor=#1E3A8A;fontStyle=1;rounded=1;arcSize=4;" vertex="1" parent="1">
          <mxGeometry x="40" y="860" width="820" height="175" as="geometry" />
        </mxCell>
        <mxCell id="sys_veeva" value="&lt;b style='color:#0F172A;font-size:10px;'&gt;Veeva Vault&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:8px;color:#475569;'&gt;Regulatory / Quality&lt;br&gt;Documents&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#E2E8F0;align=center;" vertex="1" parent="sys_container">
          <mxGeometry x="10" y="38" width="105" height="74" as="geometry" />
        </mxCell>
        <mxCell id="sys_sfdc" value="&lt;b style='color:#0F172A;font-size:10px;'&gt;Salesforce Health&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:8px;color:#475569;'&gt;CRM / HCP / Patient&lt;br&gt;Engagement&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#E2E8F0;align=center;" vertex="1" parent="sys_container">
          <mxGeometry x="125" y="38" width="105" height="74" as="geometry" />
        </mxCell>
        <mxCell id="sys_sap" value="&lt;b style='color:#0F172A;font-size:10px;'&gt;SAP S/4HANA&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:8px;color:#475569;'&gt;ERP / Supply Chain&lt;br&gt;/ Finance&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#E2E8F0;align=center;" vertex="1" parent="sys_container">
          <mxGeometry x="240" y="38" width="105" height="74" as="geometry" />
        </mxCell>
        <mxCell id="sys_lims" value="&lt;b style='color:#0F172A;font-size:10px;'&gt;LIMS Systems&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:8px;color:#475569;'&gt;Lab Data, Results,&lt;br&gt;Samples&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#E2E8F0;align=center;" vertex="1" parent="sys_container">
          <mxGeometry x="355" y="38" width="105" height="74" as="geometry" />
        </mxCell>
        <mxCell id="sys_ctms" value="&lt;b style='color:#0F172A;font-size:10px;'&gt;Clinical (EDC/CTMS)&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:8px;color:#475569;'&gt;Study Data, Sites,&lt;br&gt;Subjects&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#E2E8F0;align=center;" vertex="1" parent="sys_container">
          <mxGeometry x="470" y="38" width="105" height="74" as="geometry" />
        </mxCell>
        <mxCell id="sys_safety" value="&lt;b style='color:#0F172A;font-size:10px;'&gt;Safety Database&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:8px;color:#475569;'&gt;Safety Cases,&lt;br&gt;Reports, Signals&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#E2E8F0;align=center;" vertex="1" parent="sys_container">
          <mxGeometry x="585" y="38" width="105" height="74" as="geometry" />
        </mxCell>
        <mxCell id="sys_dw" value="&lt;div style='display:flex;flex-direction:column;align-items:center;gap:3px;'&gt;&lt;svg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;16&quot; height=&quot;16&quot; viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;#2563EB&quot; stroke-width=&quot;2&quot; stroke-linecap=&quot;round&quot; stroke-linejoin=&quot;round&quot;&gt;&lt;ellipse cx=&quot;12&quot; cy=&quot;5&quot; rx=&quot;9&quot; ry=&quot;3&quot;/&gt;&lt;path d=&quot;M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5&quot;/&gt;&lt;path d=&quot;M3 12c0 1.66 4 3 9 3s9-1.34 9-3&quot;/&gt;&lt;/svg&gt;&lt;b style='color:#0F172A;font-size:10px;'&gt;Data Lake / DW&lt;/b&gt;&lt;span style='font-size:7.5px;color:#475569;'&gt;Analytics, Reporting&lt;/span&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#E2E8F0;align=center;" vertex="1" parent="sys_container">
          <mxGeometry x="700" y="38" width="105" height="74" as="geometry" />
        </mxCell>
        <mxCell id="sys_integration" value="&lt;b style='font-size:8.5px;color:#1E3A8A;'&gt;Integration Patterns:&lt;/b&gt; APIs | Events | Batch | File Exchange &amp;nbsp;&amp;nbsp;|&amp;nbsp;&amp;nbsp; &lt;b style='font-size:8.5px;color:#1E3A8A;'&gt;Standards:&lt;/b&gt; HL7 FHIR | IDMP | CDISC | ICH | ISO IDMP | GS1 &amp;nbsp;&amp;nbsp;|&amp;nbsp;&amp;nbsp; &lt;b style='font-size:8.5px;color:#1E3A8A;'&gt;Connectivity:&lt;/b&gt; Private Endpoints | VPN | SFTP | MQ | Pub/Sub" style="text;html=1;align=center;verticalAlign=middle;fontSize=8.5;fontColor=#475569;" vertex="1" parent="sys_container">
          <mxGeometry x="10" y="125" width="800" height="35" as="geometry" />
        </mxCell>

        <!-- Vertical Channel Pills (Enterprise Ingestion) -->
        <mxCell id="pill_veeva" value="&lt;b style='font-size:7.5px;color:#1E3A8A;'&gt;Documents Sync&lt;br&gt;(REST / Bulk API)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;align=center;" vertex="1" parent="1">
          <mxGeometry x="48" y="785" width="95" height="32" as="geometry" />
        </mxCell>
        <mxCell id="pill_sfdc" value="&lt;b style='font-size:7.5px;color:#1E3A8A;'&gt;Customer &amp; HCP&lt;br&gt;Exchange (APIs)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;align=center;" vertex="1" parent="1">
          <mxGeometry x="163" y="785" width="95" height="32" as="geometry" />
        </mxCell>
        <mxCell id="pill_sap" value="&lt;b style='font-size:7.5px;color:#1E3A8A;'&gt;Product &amp; Mfg&lt;br&gt;(OData / IDoc)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;align=center;" vertex="1" parent="1">
          <mxGeometry x="278" y="785" width="95" height="32" as="geometry" />
        </mxCell>
        <mxCell id="pill_lims" value="&lt;b style='font-size:7.5px;color:#1E3A8A;'&gt;Lab Data Ingest&lt;br&gt;(HL7 / FHIR / API)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;align=center;" vertex="1" parent="1">
          <mxGeometry x="393" y="785" width="95" height="32" as="geometry" />
        </mxCell>
        <mxCell id="pill_ctms" value="&lt;b style='font-size:7.5px;color:#1E3A8A;'&gt;Trial Ingestion&lt;br&gt;(EDC / CTMS)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;align=center;" vertex="1" parent="1">
          <mxGeometry x="508" y="785" width="95" height="32" as="geometry" />
        </mxCell>
        <mxCell id="pill_safety" value="&lt;b style='font-size:7.5px;color:#1E3A8A;'&gt;Safety Cases&lt;br&gt;(REST / ICH E2B)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;align=center;" vertex="1" parent="1">
          <mxGeometry x="623" y="785" width="95" height="32" as="geometry" />
        </mxCell>
        <mxCell id="pill_dw" value="&lt;b style='font-size:7.5px;color:#1E3A8A;'&gt;Curated Analytics&lt;br&gt;&amp; SQL Reporting&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;align=center;" vertex="1" parent="1">
          <mxGeometry x="738" y="785" width="95" height="32" as="geometry" />
        </mxCell>

        <!-- 7. Bottom Right AI / Knowledge Services -->
        <mxCell id="ai_container" value="AI / Knowledge Services" style="swimlane;whiteSpace=wrap;html=1;startSize=28;fillColor=#FAF5FF;strokeColor=#C4B5FD;fontColor=#6D28D9;fontStyle=1;rounded=1;arcSize=4;" vertex="1" parent="1">
          <mxGeometry x="880" y="860" width="410" height="175" as="geometry" />
        </mxCell>
        <mxCell id="ai_search" value="&lt;b style='color:#0F172A;font-size:10px;'&gt;Enterprise Search&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:8px;color:#475569;'&gt;Taxonomy, Articles,&lt;br&gt;Knowledge Base&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#DDD6FE;align=center;" vertex="1" parent="ai_container">
          <mxGeometry x="15" y="38" width="115" height="74" as="geometry" />
        </mxCell>
        <mxCell id="ai_vector" value="&lt;b style='color:#0F172A;font-size:10px;'&gt;Vector Index&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:8px;color:#475569;'&gt;Semantic Search,&lt;br&gt;Embeddings Store&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#DDD6FE;align=center;" vertex="1" parent="ai_container">
          <mxGeometry x="145" y="38" width="115" height="74" as="geometry" />
        </mxCell>
        <mxCell id="ai_llm" value="&lt;b style='color:#0F172A;font-size:10px;'&gt;Approved LLM Service&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:8px;color:#475569;'&gt;(GCP Vertex AI)&lt;br&gt;Governed GenAI&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffffff;strokeColor=#DDD6FE;align=center;" vertex="1" parent="ai_container">
          <mxGeometry x="275" y="38" width="115" height="74" as="geometry" />
        </mxCell>

        <!-- AI Channel Pills -->
        <mxCell id="pill_ai_search" value="&lt;b style='font-size:7.5px;color:#6D28D9;'&gt;Content Indexing&lt;br&gt;&amp; Sync&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#C4B5FD;align=center;" vertex="1" parent="1">
          <mxGeometry x="895" y="785" width="105" height="32" as="geometry" />
        </mxCell>
        <mxCell id="pill_ai_vector" value="&lt;b style='font-size:7.5px;color:#6D28D9;'&gt;Semantic Queries&lt;br&gt;&amp; Results&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#C4B5FD;align=center;" vertex="1" parent="1">
          <mxGeometry x="1025" y="785" width="105" height="32" as="geometry" />
        </mxCell>
        <mxCell id="pill_ai_llm" value="&lt;b style='font-size:7.5px;color:#6D28D9;'&gt;Grounded AI&lt;br&gt;Requests/Responses&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#C4B5FD;align=center;" vertex="1" parent="1">
          <mxGeometry x="1155" y="785" width="105" height="32" as="geometry" />
        </mxCell>

        <!-- AI Callout Note -->
        <mxCell id="ai_note" value="&lt;b style='font-size:8.5px;color:#1E3A8A;'&gt;AI Copilot&lt;/b&gt; uses enterprise content and governed LLM to deliver grounded, compliant assistance within workflows." style="shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;darkOpacity=0.05;fillColor=#FEF9C3;strokeColor=#CA8A04;align=left;fontSize=8.5;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1310" y="860" width="140" height="90" as="geometry" />
        </mxCell>

        <!-- 8. Bottom Platform Operations -->
        <mxCell id="ops_container" value="Platform Operations" style="swimlane;whiteSpace=wrap;html=1;startSize=24;fillColor=#F8FAFC;strokeColor=#93C5FD;fontColor=#1E3A8A;fontStyle=1;rounded=1;arcSize=4;" vertex="1" parent="1">
          <mxGeometry x="40" y="1055" width="760" height="95" as="geometry" />
        </mxCell>
        <mxCell id="ops_admins" value="&lt;b style='color:#0F172A;font-size:10px;'&gt;Platform Admins&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:8px;color:#475569;'&gt;• Tenant &amp; Config Mgmt&lt;br&gt;• Release &amp; Change Mgmt&lt;br&gt;• Monitoring &amp; Health&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="ops_container">
          <mxGeometry x="15" y="28" width="220" height="58" as="geometry" />
        </mxCell>
        <mxCell id="ops_sec" value="&lt;b style='color:#0F172A;font-size:10px;'&gt;Security / IAM Team&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:8px;color:#475569;'&gt;• Identity &amp; Access Mgmt&lt;br&gt;• Privileged Access&lt;br&gt;• Threat Detection &amp; Response&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="ops_container">
          <mxGeometry x="270" y="28" width="220" height="58" as="geometry" />
        </mxCell>
        <mxCell id="ops_support" value="&lt;b style='color:#0F172A;font-size:10px;'&gt;Support / Operations&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:8px;color:#475569;'&gt;• Service Desk &amp; Support&lt;br&gt;• Incident &amp; Problem Mgmt&lt;br&gt;• Availability &amp; Performance&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="ops_container">
          <mxGeometry x="525" y="28" width="220" height="58" as="geometry" />
        </mxCell>

        <!-- 9. Bottom Architecture Legend -->
        <mxCell id="box_legend" value="&lt;div style=&quot;font-weight:bold;font-size:10px;color:#0F172A;text-align:left;padding:2px 4px;&quot;&gt;Architecture Legend &amp; Flow Types&lt;/div&gt;&lt;table style=&quot;width:100%;border-collapse:collapse;font-size:8px;color:#334155;&quot;&gt;&lt;tr&gt;&lt;td&gt;&lt;b style=&quot;color:#1E3A8A;&quot;&gt;—— Blue Solid:&lt;/b&gt; Ingress &amp; Core Data / API Flow&lt;/td&gt;&lt;td&gt;&lt;b style=&quot;color:#16A34A;&quot;&gt;—— Green Solid:&lt;/b&gt; External Ecosystem Exchange&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;&lt;b style=&quot;color:#64748B;&quot;&gt;- - Slate Dashed:&lt;/b&gt; Governance &amp; Policy Control&lt;/td&gt;&lt;td&gt;&lt;b style=&quot;color:#7C3AED;&quot;&gt;- - Purple Dashed:&lt;/b&gt; Grounded Vertex AI / Semantic Link&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;fontColor:#0F172A;fontStyle=1;align=left;verticalAlign=top;padding=4;" vertex="1" parent="1">
          <mxGeometry x="820" y="1055" width="740" height="95" as="geometry" />
        </mxCell>

        <!-- CONNECTOR EDGES -->
        <!-- Ingress from Users to Secure Web Portal -->
        <mxCell id="edge_usr_to_portal" value="" edge="1" parent="1" source="usr_container" target="secure_portal" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#2563EB;strokeWidth=2;endArrow=classic;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <!-- Portal to Novacura Core -->
        <mxCell id="edge_portal_to_nova" value="" edge="1" parent="1" source="secure_portal" target="novacura_core" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#2563EB;strokeWidth=2;endArrow=classic;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <!-- Governance down to Novacura Core -->
        <mxCell id="edge_gov_to_nova" value="" edge="1" parent="1" source="gov_container" target="novacura_core" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#64748B;strokeWidth=2;dashed=1;endArrow=classic;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Right External Connectors passing through Pills -->
        <mxCell id="edge_ext_cro_1" value="" edge="1" parent="1" source="ext_cro" target="pill_ext_cro" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#16A34A;strokeWidth=2;startArrow=classic;endArrow=none;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_ext_cro_2" value="" edge="1" parent="1" source="pill_ext_cro" target="novacura_core" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#16A34A;strokeWidth=2;startArrow=none;endArrow=classic;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="edge_ext_hcp_1" value="" edge="1" parent="1" source="ext_hcp" target="pill_ext_hcp" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#16A34A;strokeWidth=2;startArrow=classic;endArrow=none;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_ext_hcp_2" value="" edge="1" parent="1" source="pill_ext_hcp" target="novacura_core" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#16A34A;strokeWidth=2;startArrow=none;endArrow=classic;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="edge_ext_reg_1" value="" edge="1" parent="1" source="ext_reg" target="pill_ext_reg" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#16A34A;strokeWidth=2;startArrow=classic;endArrow=none;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_ext_reg_2" value="" edge="1" parent="1" source="pill_ext_reg" target="novacura_core" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#16A34A;strokeWidth=2;startArrow=none;endArrow=classic;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="edge_ext_pat_1" value="" edge="1" parent="1" source="ext_pat" target="pill_ext_pat" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#16A34A;strokeWidth=2;startArrow=classic;endArrow=none;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_ext_pat_2" value="" edge="1" parent="1" source="pill_ext_pat" target="novacura_core" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#16A34A;strokeWidth=2;startArrow=none;endArrow=classic;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Bottom Enterprise Connectors -->
        <mxCell id="edge_sys_veeva" value="" edge="1" parent="1" source="sys_veeva" target="pill_veeva" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=classic;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_sys_sfdc" value="" edge="1" parent="1" source="sys_sfdc" target="pill_sfdc" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=classic;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_sys_sap" value="" edge="1" parent="1" source="sys_sap" target="pill_sap" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=classic;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_sys_lims" value="" edge="1" parent="1" source="sys_lims" target="pill_lims" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=classic;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_sys_ctms" value="" edge="1" parent="1" source="sys_ctms" target="pill_ctms" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=classic;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_sys_safety" value="" edge="1" parent="1" source="sys_safety" target="pill_safety" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=classic;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_sys_dw" value="" edge="1" parent="1" source="sys_dw" target="pill_dw" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=classic;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Up from Ingestion Pills to Novacura Core -->
        <mxCell id="edge_veeva_up" value="" edge="1" parent="1" source="pill_veeva" target="novacura_core" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=classic;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_sfdc_up" value="" edge="1" parent="1" source="pill_sfdc" target="novacura_core" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=classic;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_sap_up" value="" edge="1" parent="1" source="pill_sap" target="novacura_core" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=classic;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_lims_up" value="" edge="1" parent="1" source="pill_lims" target="novacura_core" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=classic;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_ctms_up" value="" edge="1" parent="1" source="pill_ctms" target="novacura_core" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=classic;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_safety_up" value="" edge="1" parent="1" source="pill_safety" target="novacura_core" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=classic;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_dw_up" value="" edge="1" parent="1" source="pill_dw" target="novacura_core" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=classic;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- AI Connectors -->
        <mxCell id="edge_ai_search_up" value="" edge="1" parent="1" source="ai_search" target="pill_ai_search" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#7C3AED;strokeWidth=1.5;dashed=1;endArrow=classic;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_ai_search_to_copilot" value="" edge="1" parent="1" source="pill_ai_search" target="card_ai_copilot" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#7C3AED;strokeWidth=1.5;dashed=1;endArrow=classic;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="edge_ai_vector_up" value="" edge="1" parent="1" source="ai_vector" target="pill_ai_vector" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#7C3AED;strokeWidth=1.5;dashed=1;endArrow=classic;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_ai_vector_to_copilot" value="" edge="1" parent="1" source="pill_ai_vector" target="card_ai_copilot" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#7C3AED;strokeWidth=1.5;dashed=1;endArrow=classic;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="edge_ai_llm_up" value="" edge="1" parent="1" source="ai_llm" target="pill_ai_llm" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#7C3AED;strokeWidth=1.5;dashed=1;endArrow=classic;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="edge_ai_llm_to_copilot" value="" edge="1" parent="1" source="pill_ai_llm" target="card_ai_copilot" style="edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#7C3AED;strokeWidth=1.5;dashed=1;endArrow=classic;">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`.trim();

export function getVisionConverted01Xml(): string {
  return generateTemplate01ExactV3Xml('biopharma', 'light');
}
