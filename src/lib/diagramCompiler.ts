/**
 * 📦 PromptCanvas Exact Reference XML Generator & Stencil Compiler
 * Generates pixel-for-pixel Draw.io XML matching reference architectural layouts
 * including exact branching connectors, custom badge shapes, and physical device bezels.
 */

import { 
  ColumnTheme, 
  StencilType, 
  getColumnContainerStyle, 
  getNodeStencilStyle, 
  generateStencilHtmlLabel 
} from './stencilLibrary';

export interface CompiledNodeSpec {
  id: string;
  stencil: StencilType;
  title: string;
  subtitle?: string;
  contentHtml?: string;
  icons?: string[];
  height?: number;
  children?: { id: string; title: string; subtitle?: string }[];
}

export interface CompiledColumnSpec {
  id: string;
  title: string;
  subtitle?: string;
  theme: ColumnTheme;
  nodes: CompiledNodeSpec[];
  footerText?: string;
}

export interface CompiledConnectionSpec {
  fromNodeId: string;
  toNodeId: string;
  label?: string;
  style?: 'orthogonal' | 'direct' | 'dashed';
  fontColor?: string;
}

export interface CompiledDiagramSpec {
  diagramId: string;
  title: string;
  columns: CompiledColumnSpec[];
  connections: CompiledConnectionSpec[];
}

/**
 * Returns the EXACT pixel-perfect Draw.io XML matching reference Image 2 (input_file_1.png)
 * Features exact 3-column container bounds (X:50, X:420, X:840), branching connectors,
 * physical PDF/PPT badges, iMac monitor with stand, iPad bezel, and iPhone alert card.
 */
export function getExactItacsReferenceXml(): string {
  return `
<mxfile host="embed.diagrams.net">
  <diagram id="itacs_conceptual_compiled" name="ITACS Oncology Platform Conceptual Diagram">
    <mxGraphModel dx="1400" dy="900" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1500" pageHeight="900" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- COLUMN 1: ONCOLOGY DATA PORTAL (X: 50, Y: 80, W: 320, H: 640) -->
        <mxCell id="col_ingestion" value="&lt;b style=&quot;font-size:13px;&quot;&gt;[STAGE 1] ONCOLOGY DATA PORTAL&lt;/b&gt;&lt;br&gt;&lt;i style=&quot;font-size:12px;font-weight:normal;color:#475569;&quot;&gt;(The Ingestion Stage)&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;gradientColor=#FFFFFF;gradientDirection=north;strokeColor=#CBD5E1;strokeWidth=2;verticalAlign=top;fontStyle=1;fontSize=13;fontColor=#0F172A;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="50" y="80" width="320" height="640" as="geometry" />
        </mxCell>

        <!-- Card 1: Manual Data Sources Card -->
        <mxCell id="src_card" value="&lt;b style=&quot;font-size:12px;color:#1E293B;&quot;&gt;[1a] Manual Data Sources Card&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:10.5px;color:#64748B;&quot;&gt;Raw Scientific Literature &amp; PPT Decks&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#E2E8F0;strokeColor=#94A3B8;strokeWidth=1.5;verticalAlign=top;padding=8;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="70" y="140" width="280" height="120" as="geometry" />
        </mxCell>
        <!-- Red PDF Badge -->
        <mxCell id="pdf_badge" value="&lt;b style=&quot;color:#FFFFFF;font-size:11px;&quot;&gt;PDF&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DC2231;strokeColor=none;fontColor=#FFFFFF;arcSize=20;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="95" y="188" width="36" height="42" as="geometry" />
        </mxCell>
        <mxCell id="pdf_lbl" value="PDFs" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontSize=11;fontColor=#1E293B;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="88" y="232" width="50" height="20" as="geometry" />
        </mxCell>
        <!-- Orange PPT Badge -->
        <mxCell id="ppt_badge" value="&lt;b style=&quot;color:#FFFFFF;font-size:11px;&quot;&gt;PPT&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EA580C;strokeColor=none;fontColor=#FFFFFF;arcSize=20;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="160" y="188" width="36" height="42" as="geometry" />
        </mxCell>
        <mxCell id="ppt_lbl" value="PPTs" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontSize=11;fontColor=#1E293B;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="153" y="232" width="50" height="20" as="geometry" />
        </mxCell>
        <!-- Document Badge -->
        <mxCell id="doc_badge" value="📄" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#64748B;strokeWidth=1.5;fontSize=20;align=center;verticalAlign=middle;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="235" y="188" width="36" height="42" as="geometry" />
        </mxCell>
        <mxCell id="doc_lbl" value="Unstructured&lt;br&gt;Documents" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontSize=10;fontColor=#1E293B;" vertex="1" parent="1">
          <mxGeometry x="215" y="232" width="76" height="25" as="geometry" />
        </mxCell>

        <!-- SHIFT Label -->
        <mxCell id="shift_label" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;SHIFT: Manual gathering -&gt; Strategic planning.&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=1.5;fontColor=#15803D;fontStyle=1;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="70" y="270" width="280" height="28" as="geometry" />
        </mxCell>

        <!-- Card 2: 5 Functional Areas Card -->
        <mxCell id="func_areas" value="&lt;b style=&quot;font-size:12px;color:#1E293B;&quot;&gt;[1b] 5 Functional Silos Ingestion&lt;/b&gt;&lt;br&gt;&lt;br&gt;&lt;table style=&quot;width:100%;text-align:center;font-size:11px;border-collapse:separate;border-spacing:6px;margin-top:2px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;background:#F8FAFC;border:1px solid #CBD5E1;border-radius:6px;padding:6px;&quot;&gt;🔍&lt;br&gt;&lt;b&gt;Market Research&lt;/b&gt;&lt;/td&gt;&lt;td style=&quot;background:#F8FAFC;border:1px solid #CBD5E1;border-radius:6px;padding:6px;&quot;&gt;🩺&lt;br&gt;&lt;b&gt;Medical Affairs&lt;/b&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;background:#F8FAFC;border:1px solid #CBD5E1;border-radius:6px;padding:6px;&quot;&gt;💰&lt;br&gt;&lt;b&gt;Market Access&lt;/b&gt;&lt;/td&gt;&lt;td style=&quot;background:#F8FAFC;border:1px solid #CBD5E1;border-radius:6px;padding:6px;&quot;&gt;⚖️&lt;br&gt;&lt;b&gt;Outcomes Research&lt;/b&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td colspan=&quot;2&quot; style=&quot;background:#F8FAFC;border:1px solid #CBD5E1;border-radius:6px;padding:6px;&quot;&gt;🧠&lt;br&gt;&lt;b&gt;Competitive Intelligence&lt;/b&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#E2E8F0;strokeColor=#94A3B8;strokeWidth=1.5;fontColor=#1E293B;verticalAlign=top;padding=10;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="70" y="308" width="280" height="210" as="geometry" />
        </mxCell>

        <!-- Card 3: User Node with Analyst Workspace -->
        <mxCell id="user_node" value="&lt;table style=&quot;width:100%;border:none;text-align:left;margin-top:2px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:55px;font-size:38px;text-align:center;vertical-align:middle;&quot;&gt;👩‍💻&lt;/td&gt;&lt;td style=&quot;vertical-align:middle;&quot;&gt;&lt;b style=&quot;font-size:13px;color:#1E293B;&quot;&gt;[1c] Researcher Node&lt;/b&gt;&lt;br&gt;&lt;b style=&quot;font-size:11px;color:#334155;&quot;&gt;Analyst Workspace Portal&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:10px;color:#64748B;&quot;&gt;Asset Analysis &amp; Query Interface&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#E2E8F0;strokeColor=#94A3B8;strokeWidth=1.5;padding=10;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="70" y="528" width="280" height="110" as="geometry" />
        </mxCell>

        <!-- COLUMN 2: INTEGRATED INSIGHTS HUB (X: 430, Y: 80, W: 380, H: 640) -->
        <mxCell id="col_processing" value="&lt;b style=&quot;font-size:13px;&quot;&gt;[STAGE 2] INTEGRATED INSIGHTS HUB&lt;/b&gt;&lt;br&gt;&lt;i style=&quot;font-size:12px;font-weight:normal;color:#1E3A8A;&quot;&gt;(The AI Processing Stage)&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;gradientColor=#FFFFFF;gradientDirection=north;strokeColor=#60A5FA;strokeWidth=2;verticalAlign=top;fontStyle=1;fontSize=13;fontColor=#1E3A8A;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="430" y="80" width="380" height="640" as="geometry" />
        </mxCell>

        <!-- 3D Isometric Cube Container (Core ITACS Platform) -->
        <mxCell id="core_platform" value="&lt;b style=&quot;font-size:14px;color:#1E3A8A;&quot;&gt;[2] Core ITACS Synthesis Engine&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:11px;font-weight:normal;color:#3B82F6;&quot;&gt;(Powered by Gemini Enterprise LLM)&lt;/span&gt;" style="shape=cube;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;darkOpacity=0.05;darkOpacity2=0.1;fillColor=#DBEAFE;gradientColor=#EFF6FF;gradientDirection=south;strokeColor=#2563EB;strokeWidth=3;size=20;verticalAlign=top;fontStyle=1;fontSize=14;fontColor=#1E3A8A;padding=15;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="450" y="145" width="340" height="480" as="geometry" />
        </mxCell>
        <!-- 4 Floating White Processing Cards Inside Cube -->
        <mxCell id="synth" value="&lt;b style=&quot;font-size:12px;color:#1E293B;&quot;&gt;[2a] Multi-Functional Data Synthesis&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;color:#64748B;font-size:11px;&quot;&gt;(Genomic &amp; Clinical Correlation Engine)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.5;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="470" y="215" width="300" height="55" as="geometry" />
        </mxCell>
        <mxCell id="content" value="&lt;b style=&quot;font-size:12px;color:#1E293B;&quot;&gt;[2b] Unstructured Content Analysis&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;color:#64748B;font-size:11px;&quot;&gt;(PubMed PDF &amp; PPT Chunking Engine)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.5;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="470" y="290" width="300" height="55" as="geometry" />
        </mxCell>
        <mxCell id="chatbot" value="&lt;b style=&quot;font-size:12px;color:#1E293B;&quot;&gt;[2c] Strategic Chatbot Reasoning&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;color:#64748B;font-size:11px;&quot;&gt;(ReAct Natural Language Agent Interface)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.5;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="470" y="365" width="300" height="55" as="geometry" />
        </mxCell>
        <mxCell id="sim" value="&lt;b style=&quot;font-size:12px;color:#1E293B;&quot;&gt;[2d] Competitive Launch Simulation&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;color:#64748B;font-size:11px;&quot;&gt;(Oncology Scenario Planning)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.5;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="470" y="440" width="300" height="55" as="geometry" />
        </mxCell>
        <!-- Parallel Path Label at bottom of Column 2 -->
        <mxCell id="processing_footer" value="PARALLEL EXECUTION PATH:&lt;br&gt;&lt;b style=&quot;color:#1E3A8A;&quot;&gt;No-Code MVP (immediate)&lt;/b&gt; -&gt; &lt;b style=&quot;color:#1E3A8A;&quot;&gt;Custom High-Code Agent&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:10px;color:#64748B;&quot;&gt;(production/approval)&lt;/span&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=11;fontColor=#64748B;" vertex="1" parent="1">
          <mxGeometry x="440" y="650" width="360" height="40" as="geometry" />
        </mxCell>

        <!-- COLUMN 3: STRATEGIC DELIVERY & INSIGHTS (X: 870, Y: 80, W: 360, H: 640) -->
        <mxCell id="col_delivery" value="&lt;b style=&quot;font-size:13px;&quot;&gt;[STAGE 3] STRATEGIC DELIVERY &amp;amp; INSIGHTS&lt;/b&gt;&lt;br&gt;&lt;i style=&quot;font-size:12px;font-weight:normal;color:#14532D;&quot;&gt;(The Output Stage)&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDF4;gradientColor=#FFFFFF;gradientDirection=north;strokeColor=#4ADE80;strokeWidth=2;verticalAlign=top;fontStyle=1;fontSize=13;fontColor=#14532D;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="870" y="80" width="360" height="640" as="geometry" />
        </mxCell>

        <!-- 3 Green Status Pills -->
        <mxCell id="out_1" value="&lt;b&gt;[3a] OUTMANEUVER COMPETITION&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=2;fontColor=#15803D;fontStyle=1;fontSize=11;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="900" y="145" width="300" height="34" as="geometry" />
        </mxCell>
        <mxCell id="out_2" value="&lt;b&gt;[3b] REACH PATIENTS FASTER&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=2;fontColor=#15803D;fontStyle=1;fontSize=11;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="900" y="187" width="300" height="34" as="geometry" />
        </mxCell>
        <mxCell id="out_3" value="&lt;b&gt;[3c] STRATEGIC PLANNING &amp;amp; ANALYSIS&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=2;fontColor=#15803D;fontStyle=1;fontSize=11;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="900" y="229" width="300" height="34" as="geometry" />
        </mxCell>

        <!-- iMac Monitor Mockup (Executive Strategy Dashboard) -->
        <mxCell id="exec_dash_foot" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#64748B;strokeColor=#475569;strokeWidth=1;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="1010" y="420" width="80" height="5" as="geometry" />
        </mxCell>
        <mxCell id="exec_dash_stand" value="" style="shape=trapezoid;perimeter=trapezoidPerimeter;whiteSpace=wrap;html=1;fillColor=#94A3B8;strokeColor=#64748B;direction=south;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="1035" y="400" width="30" height="20" as="geometry" />
        </mxCell>
        <mxCell id="exec_dash_bezel" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#0F172A;strokeWidth=2;arcSize=6;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="900" y="275" width="300" height="125" as="geometry" />
        </mxCell>
        <mxCell id="exec_dash_chin" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#E2E8F0;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="902" y="386" width="296" height="12" as="geometry" />
        </mxCell>
        <mxCell id="exec_dash" value="&lt;div style=&quot;background:#0F172A;color:#FFFFFF;padding:4px 8px;font-size:11px;font-weight:bold;text-align:left;border-top-left-radius:2px;border-top-right-radius:2px;&quot;&gt;&lt;span style=&quot;color:#EF4444;margin-right:4px;&quot;&gt;●&lt;/span&gt;&lt;span style=&quot;color:#F59E0B;margin-right:4px;&quot;&gt;●&lt;/span&gt;&lt;span style=&quot;color:#10B981;margin-right:8px;&quot;&gt;●&lt;/span&gt; [3d] Executive Strategy Dashboard&lt;/div&gt;&lt;table style=&quot;width:100%;text-align:center;border:none;margin-top:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:50%;border-right:1px solid #E2E8F0;padding:4px;&quot;&gt;&lt;span style=&quot;font-size:10px;color:#64748B;&quot;&gt;Real-time KPIs&lt;/span&gt;&lt;br&gt;&lt;b style=&quot;font-size:16px;color:#3B82F6;&quot;&gt;94.8%&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:10px;color:#10B981;background:#D1FAE5;padding:1px 4px;border-radius:3px;&quot;&gt;▲ +12.4%&lt;/span&gt;&lt;/td&gt;&lt;td style=&quot;padding:4px;&quot;&gt;&lt;span style=&quot;font-size:10px;color:#64748B;&quot;&gt;Launch Readiness&lt;/span&gt;&lt;br&gt;&lt;b style=&quot;font-size:16px;color:#10B981;&quot;&gt;Phase 3&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:10px;color:#64748B;background:#F1F5F9;padding:1px 4px;border-radius:3px;&quot;&gt;On Schedule&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=none;fontColor=#1E293B;verticalAlign=top;" vertex="1" parent="1">
          <mxGeometry x="906" y="281" width="288" height="103" as="geometry" />
        </mxCell>

        <!-- iPad Tablet Mockup (Competitor Comparison View) -->
        <mxCell id="comp_view_bezel" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#334155;strokeColor=#1E293B;strokeWidth=3;arcSize=10;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="900" y="440" width="300" height="110" as="geometry" />
        </mxCell>
        <mxCell id="comp_view_cam" value="" style="shape=ellipse;whiteSpace=wrap;html=1;fillColor=#64748B;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="1047" y="443" width="6" height="6" as="geometry" />
        </mxCell>
        <mxCell id="comp_view" value="&lt;div style=&quot;font-size:11px;font-weight:bold;color:#1E293B;background:#F8FAFC;border-bottom:1px solid #E2E8F0;padding:4px 6px;text-align:left;&quot;&gt;[3e] Competitor Comparison View &lt;span style=&quot;float:right;font-size:10px;color:#64748B;font-weight:normal;&quot;&gt;Target Timelines&lt;/span&gt;&lt;/div&gt;&lt;table style=&quot;width:100%;text-align:center;font-size:10px;margin-top:6px;border-collapse:separate;border-spacing:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;background:#FEF2F2;border:1px solid #FCA5A5;border-radius:4px;padding:4px;&quot;&gt;&lt;b style=&quot;color:#DC2231;&quot;&gt;Competitor X&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;color:#991B1B;&quot;&gt;Q3 Launch&lt;/span&gt;&lt;/td&gt;&lt;td style=&quot;background:#FFFBEB;border:1px solid #FDE68A;border-radius:4px;padding:4px;&quot;&gt;&lt;b style=&quot;color:#D97706;&quot;&gt;Competitor Y&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;color:#92400E;&quot;&gt;Phase 2b&lt;/span&gt;&lt;/td&gt;&lt;td style=&quot;background:#ECFDF5;border:1px solid #6EE7B7;border-radius:4px;padding:4px;&quot;&gt;&lt;b style=&quot;color:#10B981;&quot;&gt;ITACS Target&lt;/b&gt;&lt;br&gt;&lt;b style=&quot;color:#065F46;&quot;&gt;Q1 Market Lead&lt;/b&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=none;fontColor=#1E293B;padding=4;arcSize=6;verticalAlign=top;" vertex="1" parent="1">
          <mxGeometry x="908" y="452" width="284" height="90" as="geometry" />
        </mxCell>

        <!-- iPhone Smartphone Mockup (Strategic Priority Advisory) -->
        <mxCell id="advisory_bezel" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEFCF7;strokeColor=#DC2231;strokeWidth=4;arcSize=12;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="900" y="565" width="300" height="135" as="geometry" />
        </mxCell>
        <mxCell id="advisory_notch" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F87171;strokeColor=none;arcSize=50;" vertex="1" parent="1">
          <mxGeometry x="1025" y="571" width="50" height="5" as="geometry" />
        </mxCell>
        <mxCell id="advisory" value="&lt;div style=&quot;color:#DC2231;font-size:13px;line-height:1.4;text-align:center;&quot;&gt;&lt;div style=&quot;background:#FEE2E2;color:#991B1B;font-size:11px;font-weight:bold;padding:2px 6px;border-radius:4px;margin-bottom:6px;display:inline-block;&quot;&gt;🚨 STRATEGIC ADVISORY ALERT&lt;/div&gt;&lt;br&gt;&lt;b style=&quot;font-size:14px;color:#7F1D1D;&quot;&gt;Review Drug Launch Strategy&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:11px;color:#991B1B;background:#FEF2F2;padding:2px 8px;border-radius:999px;border:1px solid #F87171;display:inline-block;margin-top:4px;&quot;&gt;Alert ID: #T-731&lt;/span&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#FCA5A5;strokeWidth=1;fontColor=#7F1D1D;padding=8;arcSize=8;" vertex="1" parent="1">
          <mxGeometry x="910" y="583" width="280" height="107" as="geometry" />
        </mxCell>

        <!-- 5. BRANCHING CONNECTORS (Exact routing from cards to cube, and branching from cube to outputs) -->
        <!-- Arrow 1: Manual Data Sources -> Cube -->
        <mxCell id="e_in_1" value="&lt;b style=&quot;color:#1E3A8A;background:#EFF6FF;padding:2px 6px;border-radius:4px;border:1px solid #93C5FD;&quot;&gt;1. Raw Literature&lt;br&gt;PDF Stream&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#3B82F6;endArrow=block;endFill=1;labelBackgroundColor=none;fontStyle=1;fontSize=10;" edge="1" parent="1" source="src_card" target="core_platform">
          <mxGeometry relative="1" as="geometry">
            <mxPoint y="-10" as="offset" />
            <Array as="points">
              <mxPoint x="390" y="195" />
              <mxPoint x="390" y="300" />
            </Array>
          </mxGeometry>
        </mxCell>
        <!-- Arrow 2: 5 Functional Areas -> Cube (with DATA INGESTION label) -->
        <mxCell id="e_in_2" value="&lt;b style=&quot;color:#1E3A8A;background:#EFF6FF;padding:2px 6px;border-radius:4px;border:1px solid #93C5FD;&quot;&gt;2. DATA INGESTION&lt;br&gt;&amp;amp; EXTRACTION&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2.5;strokeColor=#2563EB;endArrow=block;endFill=1;labelBackgroundColor=none;fontStyle=1;fontSize=10;" edge="1" parent="1" source="func_areas" target="core_platform">
          <mxGeometry relative="1" as="geometry">
            <mxPoint y="-10" as="offset" />
            <Array as="points">
              <mxPoint x="400" y="413" />
              <mxPoint x="400" y="385" />
            </Array>
          </mxGeometry>
        </mxCell>
        <!-- Arrow 3: User Node -> Cube -->
        <mxCell id="e_in_3" value="&lt;b style=&quot;color:#1E3A8A;background:#EFF6FF;padding:2px 6px;border-radius:4px;border:1px solid #93C5FD;&quot;&gt;3. Researcher Query&lt;br&gt;Request&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#3B82F6;endArrow=block;endFill=1;labelBackgroundColor=none;fontStyle=1;fontSize=10;" edge="1" parent="1" source="user_node" target="core_platform">
          <mxGeometry relative="1" as="geometry">
            <mxPoint y="-10" as="offset" />
            <Array as="points">
              <mxPoint x="390" y="583" />
              <mxPoint x="390" y="480" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- Main Exit Arrow: Cube -> Branch Point (with INSIGHTS FEED label) -->
        <mxCell id="e_out_main" value="&lt;b style=&quot;color:#14532D;background:#F0FDF4;padding:2px 6px;border-radius:4px;border:1px solid #86EFAC;&quot;&gt;TARGET INSIGHTS FEED&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2.5;strokeColor=#10B981;endArrow=none;endFill=0;labelBackgroundColor=none;fontStyle=1;fontSize=11;" edge="1" parent="1" source="core_platform">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="835" y="385" as="targetPoint" />
          </mxGeometry>
        </mxCell>

        <!-- Branch 1: Branch Point -> Executive Strategy Dashboard -->
        <mxCell id="e_out_1" value="&lt;b style=&quot;color:#14532D;background:#F0FDF4;padding:2px 6px;border-radius:4px;border:1px solid #86EFAC;&quot;&gt;4. Synthesize Dashboard<br>KPIs &amp;amp; Metrics&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#10B981;endArrow=block;endFill=1;labelBackgroundColor=none;fontStyle=1;fontSize=10;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint y="-10" as="offset" />
            <mxPoint x="835" y="385" as="sourcePoint" />
            <mxPoint x="900" y="337" as="targetPoint" />
            <Array as="points">
              <mxPoint x="835" y="337" />
            </Array>
          </mxGeometry>
        </mxCell>
        <!-- Branch 2: Branch Point -> Competitor Comparison View -->
        <mxCell id="e_out_2" value="&lt;b style=&quot;color:#14532D;background:#F0FDF4;padding:2px 6px;border-radius:4px;border:1px solid #86EFAC;&quot;&gt;5. Rank Target Discovery<br>Timelines&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#10B981;endArrow=block;endFill=1;labelBackgroundColor=none;fontStyle=1;fontSize=10;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint y="-10" as="offset" />
            <mxPoint x="835" y="385" as="sourcePoint" />
            <mxPoint x="900" y="495" as="targetPoint" />
            <Array as="points">
              <mxPoint x="835" y="495" />
            </Array>
          </mxGeometry>
        </mxCell>
        <!-- Branch 3: Branch Point -> Strategic Priority Advisory -->
        <mxCell id="e_out_3" value="&lt;b style=&quot;color:#991B1B;background:#FEF2F2;padding:2px 6px;border-radius:4px;border:1px solid #FCA5A5;&quot;&gt;6. Strategic Advisory<br>Priority Alert&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#EF4444;endArrow=block;endFill=1;labelBackgroundColor=none;fontStyle=1;fontSize=10;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint y="-10" as="offset" />
            <mxPoint x="835" y="385" as="sourcePoint" />
            <mxPoint x="900" y="632" as="targetPoint" />
            <Array as="points">
              <mxPoint x="835" y="632" />
            </Array>
          </mxGeometry>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
  `.trim();
}

/**
 * Returns the EXACT pixel-perfect ERD Unified Database Schema XML matching reference ERD image
 * Features 3 Sub-Schemas, 17 composite ERD tables with styled headers, orange callout badges, and cardinality connectors.
 */
export function getExactErdReferenceXml(): string {
  const createTable = (id: string, title: string, x: number, y: number, w: number, h: number, bodyHtml: string, headerFill = '#DBEAFE', headerFont = '#1E3A8A'): string => {
    const hdrH = 28;
    return `
        <!-- Table: ${title} -->
        <mxCell id="${id}" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.5;shadow=1;arcSize=6;" vertex="1" parent="1">
          <mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry" />
        </mxCell>
        <mxCell id="${id}_hdr" value="${escapeXml(title)}" style="rounded=0;whiteSpace=wrap;html=1;fillColor=${headerFill};strokeColor=none;fontColor=${headerFont};fontStyle=1;fontSize=12;align=left;paddingLeft=10;" vertex="1" parent="1">
          <mxGeometry x="${x + 2}" y="${y + 2}" width="${w - 4}" height="${hdrH}" as="geometry" />
        </mxCell>
        <mxCell id="${id}_line" value="" style="line;strokeColor=#93C5FD;strokeWidth=1;html=1;" vertex="1" parent="1">
          <mxGeometry x="${x + 2}" y="${y + hdrH}" width="${w - 4}" height="2" as="geometry" />
        </mxCell>
        <mxCell id="${id}_body" value="${escapeXml(bodyHtml)}" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;fontSize=11;fontColor=${headerFont === '#1E3A8A' ? '#1E293B' : '#064E3B'};paddingLeft=10;lineHeight=1.4;" vertex="1" parent="1">
          <mxGeometry x="${x + 4}" y="${y + hdrH + 4}" width="${w - 8}" height="${h - hdrH - 8}" as="geometry" />
        </mxCell>`;
  };

  const createNote = (id: string, text: string, x: number, y: number, w = 240, h = 50): string => {
    return `
        <mxCell id="${id}" value="${escapeXml(text)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF3C7;strokeColor=#F59E0B;strokeWidth=1.5;fontColor=#92400E;fontSize=11;align=center;verticalAlign=middle;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry" />
        </mxCell>`;
  };

  let tables = '';
  // Top Sub-Schema 2 Tables
  tables += createTable('etl_src', '🗄️ <b>ETL_System_Data_Sources</b>', 400, 70, 230, 110, '<b>PK</b> Source ID<br>&nbsp;&nbsp;&nbsp;&nbsp;Source System Name<br>&nbsp;&nbsp;&nbsp;&nbsp;Connection String<br>&nbsp;&nbsp;&nbsp;&nbsp;Silo ID', '#DBEAFE', '#1E3A8A');
  tables += createTable('etl_log', '📑 <b>ETL_Job_Audit_Log</b>', 700, 70, 240, 135, '<b>PK/FK</b> Job Key<br>&nbsp;&nbsp;&nbsp;&nbsp;Job Name<br>&nbsp;&nbsp;&nbsp;&nbsp;Data Source ID<br>&nbsp;&nbsp;&nbsp;&nbsp;Start/End Time<br>&nbsp;&nbsp;&nbsp;&nbsp;Status<br>&nbsp;&nbsp;&nbsp;&nbsp;Number of Rows Processed<br>&nbsp;&nbsp;&nbsp;&nbsp;User ID', '#DBEAFE', '#1E3A8A');
  tables += createTable('etl_map', '🗺️ <b>Data_Lineage_Map</b>', 1010, 70, 230, 110, '<b>PK</b> Target Table/Column ID<br><b>PK</b> Source Table/Column ID<br><b>FK</b> ETL Job ID', '#DBEAFE', '#1E3A8A');

  // Central Sub-Schema 1 Tables (Widened 130px inter-column channel: Left at x=50 w=190, Center at x=370 w=220)
  tables += createTable('dim_pat', '👤 <b>Dim_Patient</b>', 50, 280, 190, 120, '<b>PK</b> Patient Key<br>&nbsp;&nbsp;&nbsp;&nbsp;Patient Type<br>&nbsp;&nbsp;&nbsp;&nbsp;Region<br>&nbsp;&nbsp;&nbsp;&nbsp;Age Group<br>&nbsp;&nbsp;&nbsp;&nbsp;Demographics<br>&nbsp;&nbsp;&nbsp;&nbsp;Disease History', '#DBEAFE', '#1E3A8A');
  tables += createTable('dim_phy', '🩺 <b>Dim_Physician</b>', 50, 430, 190, 110, '<b>PK</b> Physician Key<br>&nbsp;&nbsp;&nbsp;&nbsp;Specialization<br>&nbsp;&nbsp;&nbsp;&nbsp;Affiliation<br>&nbsp;&nbsp;&nbsp;&nbsp;Ranking<br>&nbsp;&nbsp;&nbsp;&nbsp;Location', '#DBEAFE', '#1E3A8A');
  tables += createTable('dim_prod', '💊 <b>Dim_Oncology_Product</b>', 50, 570, 190, 110, '<b>PK</b> Product Key<br>&nbsp;&nbsp;&nbsp;&nbsp;Product Name<br>&nbsp;&nbsp;&nbsp;&nbsp;Therapy Area<br>&nbsp;&nbsp;&nbsp;&nbsp;Status<br>&nbsp;&nbsp;&nbsp;&nbsp;Competing Products', '#DBEAFE', '#1E3A8A');
  tables += createTable('dim_silo', '🏢 <b>Dim_Functional_Silo</b>', 50, 710, 190, 120, '<b>PK</b> Silo Key<br>&nbsp;&nbsp;&nbsp;&nbsp;Silo Name<br>&nbsp;&nbsp;&nbsp;&nbsp;Silo Description<br>&nbsp;&nbsp;&nbsp;&nbsp;Owner', '#DBEAFE', '#1E3A8A');

  tables += createTable('fact_ins', '📊 <b>Fact_Oncology_Insights</b>', 370, 280, 220, 130, '<b>PK</b> Patient ID<br>&nbsp;&nbsp;&nbsp;&nbsp;Product ID<br>&nbsp;&nbsp;&nbsp;&nbsp;Date ID<br>&nbsp;&nbsp;&nbsp;&nbsp;Silo ID<br>&nbsp;&nbsp;&nbsp;&nbsp;Value Metric<br>&nbsp;&nbsp;&nbsp;&nbsp;Confidence Score<br>&nbsp;&nbsp;&nbsp;&nbsp;Confidence Interval', '#E0F2FE', '#0369A1');
  tables += createTable('fact_enc', '🏥 <b>Fact_Patient_Encounters</b>', 370, 450, 220, 140, '<b>PK</b> Patient ID<br>&nbsp;&nbsp;&nbsp;&nbsp;Encounter ID<br>&nbsp;&nbsp;&nbsp;&nbsp;Date ID<br>&nbsp;&nbsp;&nbsp;&nbsp;Diagnosis ID<br>&nbsp;&nbsp;&nbsp;&nbsp;Physician ID<br>&nbsp;&nbsp;&nbsp;&nbsp;Payer ID<br>&nbsp;&nbsp;&nbsp;&nbsp;Value Metric', '#E0F2FE', '#0369A1');
  tables += createTable('fact_comp', '⚔️ <b>Fact_Competitive_Intel</b>', 370, 620, 220, 125, '<b>PK</b> Intel ID<br>&nbsp;&nbsp;&nbsp;&nbsp;Product ID<br>&nbsp;&nbsp;&nbsp;&nbsp;Date ID<br>&nbsp;&nbsp;&nbsp;&nbsp;Source ID<br>&nbsp;&nbsp;&nbsp;&nbsp;Metric<br>&nbsp;&nbsp;&nbsp;&nbsp;Insight Type', '#E0F2FE', '#0369A1');

  tables += createTable('dim_center', '🔗 <b>Dim_Intel_Map</b>', 630, 490, 150, 65, '<b>PK</b> Intel ID<br><b>FK</b> Source ID', '#DBEAFE', '#1E3A8A');

  tables += createTable('dim_time', '📅 <b>Dim_Time</b>', 820, 280, 180, 120, '<b>PK</b> Time Key<br>&nbsp;&nbsp;&nbsp;&nbsp;Date<br>&nbsp;&nbsp;&nbsp;&nbsp;Week<br>&nbsp;&nbsp;&nbsp;&nbsp;Month<br>&nbsp;&nbsp;&nbsp;&nbsp;Quarter<br>&nbsp;&nbsp;&nbsp;&nbsp;Year', '#DBEAFE', '#1E3A8A');
  tables += createTable('dim_loc', '📍 <b>Dim_Location</b>', 820, 430, 180, 120, '<b>PK</b> Location Key<br>&nbsp;&nbsp;&nbsp;&nbsp;Facility Name<br>&nbsp;&nbsp;&nbsp;&nbsp;City<br>&nbsp;&nbsp;&nbsp;&nbsp;State<br>&nbsp;&nbsp;&nbsp;&nbsp;Country<br>&nbsp;&nbsp;&nbsp;&nbsp;Region', '#DBEAFE', '#1E3A8A');
  tables += createTable('dim_payer', '💳 <b>Dim_Payer</b>', 820, 580, 180, 100, '<b>PK</b> Payer Key<br>&nbsp;&nbsp;&nbsp;&nbsp;Payer Name<br>&nbsp;&nbsp;&nbsp;&nbsp;Type<br>&nbsp;&nbsp;&nbsp;&nbsp;Tier', '#DBEAFE', '#1E3A8A');
  tables += createTable('dim_src', '🌐 <b>Dim_Intel_Source</b>', 820, 710, 180, 100, '<b>PK</b> Source Key<br>&nbsp;&nbsp;&nbsp;&nbsp;Source Name<br>&nbsp;&nbsp;&nbsp;&nbsp;URL<br>&nbsp;&nbsp;&nbsp;&nbsp;Silo ID', '#DBEAFE', '#1E3A8A');

  // Right Sub-Schema 3 Tables
  tables += createTable('ml_feat', '📦 <b>ML_Feature_Store</b>', 1210, 310, 220, 150, '<b>P/FK</b> Feature Key<br>&nbsp;&nbsp;&nbsp;&nbsp;Feature Name<br>&nbsp;&nbsp;&nbsp;&nbsp;Feature Description<br>&nbsp;&nbsp;&nbsp;&nbsp;Version<br>&nbsp;&nbsp;&nbsp;&nbsp;Data Type<br>&nbsp;&nbsp;&nbsp;&nbsp;Aggregation<br>&nbsp;&nbsp;&nbsp;&nbsp;Source Table ID', '#D1FAE5', '#065F46');
  tables += createTable('ml_inf', '🧠 <b>ML_Inference_Log</b>', 1210, 560, 220, 155, '<b>PK</b> Inference Key<br>&nbsp;&nbsp;&nbsp;&nbsp;Model Used<br>&nbsp;&nbsp;&nbsp;&nbsp;Input Keys (Patient/Product)<br>&nbsp;&nbsp;&nbsp;&nbsp;Output Prediction<br>&nbsp;&nbsp;&nbsp;&nbsp;Probability Score<br>&nbsp;&nbsp;&nbsp;&nbsp;Actual Truth Label<br>&nbsp;&nbsp;&nbsp;&nbsp;Timestamp', '#D1FAE5', '#065F46');
  tables += createTable('gen_corp', '📚 <b>GenAI_Context_Corpus</b>', 1490, 310, 280, 135, '<b>PK</b> Corpus Key<br>&nbsp;&nbsp;&nbsp;&nbsp;Storage Path (GCS)<br>&nbsp;&nbsp;&nbsp;&nbsp;Doc Name<br>&nbsp;&nbsp;&nbsp;&nbsp;Doc Type<br>&nbsp;&nbsp;&nbsp;&nbsp;Functional Silo Tag<br>&nbsp;&nbsp;&nbsp;&nbsp;Chunk Count', '#D1FAE5', '#065F46');
  tables += createTable('gen_vec', '🔮 <b>GenAI_Vector_Index</b>', 1490, 480, 280, 85, '<b>PK</b> Chunk Key<br>&nbsp;&nbsp;&nbsp;&nbsp;Vector Embedding', '#D1FAE5', '#065F46');
  tables += createTable('gen_conv', '💬 <b>GenAI_Conversation_Log</b>', 1490, 600, 280, 175, '<b>PK</b> User Key<br>&nbsp;&nbsp;&nbsp;&nbsp;User<br>&nbsp;&nbsp;&nbsp;&nbsp;Prompt<br>&nbsp;&nbsp;&nbsp;&nbsp;Retrieved Context Chunks<br>&nbsp;&nbsp;&nbsp;&nbsp;Generated Response<br>&nbsp;&nbsp;&nbsp;&nbsp;Feedback Loop (e.g. Thumb Up/Down)<br>&nbsp;&nbsp;&nbsp;&nbsp;Token Usage<br>&nbsp;&nbsp;&nbsp;&nbsp;Latency<br>&nbsp;&nbsp;&nbsp;&nbsp;Timestamp', '#D1FAE5', '#065F46');

  let notes = '';
  // Exterior Callouts positioned 60px+ from container borders
  notes += createNote('note_iam', '<b>IAM Roles:</b><br>Row-Level Security on Patient Data', 20, 140, 230, 50);
  notes += createNote('note_vpc1', '<b>VPC Service Controls:</b><br>Secure Access to Gemini APIs', 1540, 140, 240, 50);
  notes += createNote('note_vpc2', '<b>VPC Service Controls:</b><br>Secure Access to Gemini APIs', 1540, 1050, 240, 50);
  notes += createNote('note_mil', '<b>MIL Service Controls:</b><br>Secure poundsdata', 1190, 1050, 240, 50);

  return `
<mxfile host="embed.diagrams.net">
  <diagram id="erd_compiled" name="Unified Database Schema &amp; ERD Semantic Layer">
    <mxGraphModel dx="1850" dy="1200" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1850" pageHeight="1200" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- 1. SUB-SCHEMA CONTAINERS -->
        <mxCell id="col_top" value="&lt;b style=&quot;font-size:14px;&quot;&gt;Sub-Schema 2: ETL &amp;amp; Data Lineage (Traceability) (Top)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;gradientColor=#FFFFFF;gradientDirection=north;strokeColor=#60A5FA;strokeWidth=2;verticalAlign=top;fontStyle=1;fontSize=14;fontColor=#1E3A8A;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="380" y="30" width="940" height="175" as="geometry" />
        </mxCell>
        <mxCell id="col_central" value="&lt;b style=&quot;font-size:14px;&quot;&gt;Sub-Schema 1: Core Business Intelligence (BI) Dimensions &amp;amp; Facts (Central)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFBEB;gradientColor=#FFFFFF;gradientDirection=north;strokeColor=#F59E0B;strokeWidth=2;verticalAlign=top;fontStyle=1;fontSize=14;fontColor=#92400E;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="30" y="230" width="990" height="760" as="geometry" />
        </mxCell>
        <mxCell id="col_right" value="&lt;b style=&quot;font-size:14px;&quot;&gt;Sub-Schema 3: The AI &amp;amp; GenAI Semantic Layer (Advanced)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDF4;gradientColor=#FFFFFF;gradientDirection=north;strokeColor=#4ADE80;strokeWidth=2;verticalAlign=top;fontStyle=1;fontSize=14;fontColor=#14532D;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="1160" y="230" width="670" height="760" as="geometry" />
        </mxCell>
        <!-- Inner Dashed Containers for Right Stage -->
        <mxCell id="box_mlops" value="&lt;b style=&quot;font-size:13px;color:#15803D;&quot;&gt;Structured AI (MLOps)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=none;strokeColor=#86EFAC;strokeWidth=1.5;dashed=1;verticalAlign=top;padding=12;" vertex="1" parent="1">
          <mxGeometry x="1180" y="270" width="280" height="690" as="geometry" />
        </mxCell>
        <mxCell id="box_rag" value="&lt;b style=&quot;font-size:13px;color:#15803D;&quot;&gt;Unstructured AI (GenAI/RAG)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=none;strokeColor=#86EFAC;strokeWidth=1.5;dashed=1;verticalAlign=top;padding=12;" vertex="1" parent="1">
          <mxGeometry x="1470" y="270" width="330" height="690" as="geometry" />
        </mxCell>

        <!-- 2. COMPOSITE ERD TABLES & CALLOUT NOTES -->
        ${tables}
        ${notes}

        <!-- 3. ALL 25 CONNECTING RELATIONSHIPS WITH CROW'S FOOT CARDINALITY & EXPLICIT CORRIDOR TRACK ROUTING -->
        <mxCell id="e_etl_1" value="&lt;b&gt;Audit Key&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=1.5;strokeColor=#2563EB;fontColor=#1E3A8A;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=11;startArrow=block;endArrow=block;startFill=1;endFill=1;" edge="1" parent="1" source="etl_src" target="etl_log">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="e_etl_2" value="&lt;b&gt;Audit Key&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=1.5;strokeColor=#2563EB;fontColor=#1E3A8A;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=11;startArrow=block;endArrow=block;startFill=1;endFill=1;" edge="1" parent="1" source="etl_log" target="etl_map">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="e_etl_time" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=1.5;strokeColor=#64748B;endArrow=open;endFill=0;" edge="1" parent="1" source="etl_log" target="dim_time">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="e_etl_gen" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=1.5;strokeColor=#64748B;endArrow=open;endFill=0;" edge="1" parent="1" source="etl_map" target="gen_corp">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Central Dimensions -> Facts with Dedicated Vertical Track Waypoints in the 130px Corridor -->
        <mxCell id="e_f1" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=1.5;strokeColor=#92400E;startArrow=ERmandOne;endArrow=ERoneToMany;" edge="1" parent="1" source="dim_pat" target="fact_ins">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="e_f2" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=1.5;strokeColor=#92400E;startArrow=ERmandOne;endArrow=ERoneToMany;" edge="1" parent="1" source="dim_pat" target="fact_enc">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="280" y="340" />
              <mxPoint x="280" y="520" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="e_f3" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=1.5;strokeColor=#92400E;startArrow=ERmandOne;endArrow=ERoneToMany;" edge="1" parent="1" source="dim_phy" target="fact_enc">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="e_f4" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=1.5;strokeColor=#92400E;startArrow=ERmandOne;endArrow=ERoneToMany;" edge="1" parent="1" source="dim_prod" target="fact_ins">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="300" y="625" />
              <mxPoint x="300" y="345" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="e_f5" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=1.5;strokeColor=#92400E;startArrow=ERmandOne;endArrow=ERoneToMany;" edge="1" parent="1" source="dim_prod" target="fact_enc">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="315" y="625" />
              <mxPoint x="315" y="530" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="e_f6" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=1.5;strokeColor=#92400E;startArrow=ERmandOne;endArrow=ERoneToMany;" edge="1" parent="1" source="dim_prod" target="fact_comp">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="e_f7" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=1.5;strokeColor=#92400E;startArrow=ERmandOne;endArrow=ERoneToMany;" edge="1" parent="1" source="dim_silo" target="fact_ins">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="260" y="770" />
              <mxPoint x="260" y="355" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="e_f8" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=1.5;strokeColor=#92400E;startArrow=ERmandOne;endArrow=ERoneToMany;" edge="1" parent="1" source="dim_silo" target="fact_comp">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="335" y="770" />
              <mxPoint x="335" y="680" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="e_f9" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=1.5;strokeColor=#92400E;startArrow=ERmandOne;endArrow=ERoneToMany;" edge="1" parent="1" source="dim_time" target="fact_ins">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="e_f10" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=1.5;strokeColor=#92400E;startArrow=ERmandOne;endArrow=ERoneToMany;" edge="1" parent="1" source="dim_time" target="fact_enc">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="790" y="380" />
              <mxPoint x="790" y="490" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="e_f11" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=1.5;strokeColor=#92400E;startArrow=ERmandOne;endArrow=ERoneToMany;" edge="1" parent="1" source="dim_loc" target="fact_enc">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="e_f12" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=1.5;strokeColor=#92400E;startArrow=ERmandOne;endArrow=ERoneToMany;" edge="1" parent="1" source="dim_payer" target="fact_enc">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="780" y="630" />
              <mxPoint x="780" y="520" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="e_f13" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=1.5;strokeColor=#92400E;startArrow=ERmandOne;endArrow=ERoneToMany;" edge="1" parent="1" source="dim_src" target="fact_comp">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="e_f14" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=1.5;strokeColor=#92400E;startArrow=ERmandOne;endArrow=ERoneToMany;" edge="1" parent="1" source="dim_center" target="fact_comp">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="e_ml_pull" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=1.5;strokeColor=#059669;endArrow=block;endFill=1;" edge="1" parent="1" source="dim_time" target="ml_feat">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <!-- EXPLICIT FLOATING BADGES IN THE 140PX GAP BETWEEN SUB-SCHEMA 1 AND 3 -->
        <mxCell id="gap_lbl_ml" value="&lt;b style=&quot;font-size:16px;color:#15803D;&quot;&gt;ML&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="1085" y="320" width="50" height="30" as="geometry" />
        </mxCell>
        <mxCell id="gap_lbl_pull" value="&lt;b style=&quot;font-size:11px;color:#065F46;&quot;&gt;Pull Data &amp;amp;&lt;br&gt;Business Variance&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#10B981;strokeWidth=1.5;fontColor=#065F46;align=center;verticalAlign=middle;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="1060" y="360" width="105" height="40" as="geometry" />
        </mxCell>
        <mxCell id="gap_lbl_query" value="&lt;b style=&quot;font-size:10px;color:#065F46;&quot;&gt;Query to&lt;br&gt;Conversation Log&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#10B981;strokeWidth=1.5;fontColor=#065F46;align=center;verticalAlign=middle;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="1695" y="520" width="105" height="36" as="geometry" />
        </mxCell>

        <mxCell id="e_ml_gen" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=1.5;strokeColor=#059669;endArrow=block;endFill=1;" edge="1" parent="1" source="ml_feat" target="gen_corp">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="e_inf_vec" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=1.5;strokeColor=#059669;endArrow=block;endFill=1;" edge="1" parent="1" source="ml_inf" target="gen_vec">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <!-- RAG lines routed inside container channel to prevent border slicing -->
        <mxCell id="e_rag_1" value="&lt;b&gt;RAG&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=1.5;strokeColor=#059669;fontColor=#065F46;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=11;endArrow=block;endFill=1;exitX=1;exitY=0.5;entryX=1;entryY=0.5;" edge="1" parent="1" source="gen_corp" target="gen_vec">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1785" y="377" />
              <mxPoint x="1785" y="522" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="e_rag_2" value="&lt;b&gt;Logic (Agent)&lt;br&gt;Generation&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=1.5;strokeColor=#059669;fontColor=#065F46;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=10;endArrow=block;endFill=1;" edge="1" parent="1" source="gen_vec" target="gen_conv">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="e_rag_loop" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=1.5;strokeColor=#059669;endArrow=block;endFill=1;exitX=1;exitY=0.2;entryX=1;entryY=0.8;" edge="1" parent="1" source="gen_conv" target="gen_corp">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1815" y="635" />
              <mxPoint x="1815" y="418" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- 4. NOTE ARROWS -->
        <mxCell id="e_note_1" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=1.5;strokeColor=#F59E0B;dashed=1;endArrow=classic;endFill=1;" edge="1" parent="1" source="note_iam" target="dim_pat">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="e_note_2" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=1.5;strokeColor=#F59E0B;dashed=1;endArrow=classic;endFill=1;" edge="1" parent="1" source="note_vpc1" target="gen_corp">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="e_note_3" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=1.5;strokeColor=#F59E0B;dashed=1;endArrow=classic;endFill=1;" edge="1" parent="1" source="note_vpc2" target="gen_conv">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="e_note_4" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=1.5;strokeColor=#F59E0B;dashed=1;endArrow=classic;endFill=1;" edge="1" parent="1" source="note_mil" target="ml_inf">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- 5. LEGEND & FOOTER -->
        <mxCell id="legend_box" value="&lt;b style=&quot;font-size:12px;color:#0F172A;&quot;&gt;Legend:&lt;/b&gt;&lt;br&gt;&lt;table style=&quot;width:100%;font-size:11px;border:none;margin-top:4px;&quot;&gt;&lt;tr&gt;&lt;td&gt;🟦 &lt;b&gt;Managed Compute&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🟩 &lt;b&gt;Storage&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🟨 &lt;b&gt;Secure boundary&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🔑 &lt;b&gt;Key Definition (PK)&lt;/b&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;🗝️ &lt;b&gt;Key Definition (FK)&lt;/b&gt;&lt;/td&gt;&lt;td&gt;longrightarrow &lt;b&gt;One-to-many&lt;/b&gt;&lt;/td&gt;&lt;td&gt;--- &lt;b&gt;Relationship&lt;/b&gt;&lt;/td&gt;&lt;td&gt;⏱️ &lt;b&gt;TimeRes&lt;/b&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;verticalAlign=top;padding=8;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="40" y="1030" width="600" height="110" as="geometry" />
        </mxCell>
        <mxCell id="why_box" value="&lt;div style=&quot;font-size:13px;color:#1E3A8A;line-height:1.5;text-align:center;&quot;&gt;&lt;b&gt;**WHY IT WORKS: This unified schema consolidates structured, unstructured, and derived AI data on a shared foundation. Business analysis, model training, and GenAI grounding all draw from a single, auditable semantic map, ensuring consistency and governance for any data solution.**&lt;/b&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;gradientColor=#FFFFFF;gradientDirection=north;strokeColor=#2563EB;strokeWidth=2;padding=12;shadow=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="670" y="1030" width="1110" height="110" as="geometry" />
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
  `.trim();
}

export function getExactAgenticRagReferenceXml(): string {
  return `
<mxfile host="embed.diagrams.net">
  <diagram id="agentic_rag_compiled" name="Cognitive Architecture (Agentic RAG)">
    <mxGraphModel dx="1600" dy="1000" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1650" pageHeight="980" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- 3 VERTICAL ZONES (SWIMLANES) -->
        <mxCell id="zone_1" value="&lt;b style=&quot;font-size:16px;color:#0F172A;&quot;&gt;Zone 1: The Interface&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:14px;color:#475569;&quot;&gt;(User Interaction)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;verticalAlign=top;align=center;spacingTop=15;fontFamily=Helvetica;shadow=0;" vertex="1" parent="1">
          <mxGeometry x="40" y="40" width="300" height="720" as="geometry" />
        </mxCell>

        <mxCell id="zone_2" value="&lt;b style=&quot;font-size:16px;color:#0F172A;&quot;&gt;Zone 2: The Agentic Core&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:14px;color:#475569;&quot;&gt;(Orchestration &amp;amp; Reasoning)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;verticalAlign=top;align=center;spacingTop=15;fontFamily=Helvetica;shadow=0;" vertex="1" parent="1">
          <mxGeometry x="380" y="40" width="600" height="720" as="geometry" />
        </mxCell>

        <mxCell id="zone_3" value="&lt;b style=&quot;font-size:16px;color:#0F172A;&quot;&gt;Zone 3: The Tool Ecosystem&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:14px;color:#475569;&quot;&gt;(Secured Environment)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;verticalAlign=top;align=center;spacingTop=15;fontFamily=Helvetica;shadow=0;" vertex="1" parent="1">
          <mxGeometry x="1020" y="40" width="580" height="720" as="geometry" />
        </mxCell>

        <!-- SECURE ENTERPRISE BOUNDARY (DASHED CONTAINER INSIDE ZONE 2) -->
        <mxCell id="sec_bound" value="Secure Managed Gemini Enterprise Ecosystem Boundary" style="rounded=0;whiteSpace=wrap;html=1;dashed=1;fillColor=none;strokeColor=#64748B;strokeWidth=2;strokeDashArray=6 6;verticalAlign=top;align=left;spacingLeft=18;spacingTop=12;fontFamily=Helvetica;fontSize=14;fontStyle=1;fontColor=#334155;" vertex="1" parent="1">
          <mxGeometry x="400" y="110" width="560" height="630" as="geometry" />
        </mxCell>

        <!-- ZONE 1 NODE: USER INTERFACE / CHAT APP -->
        <mxCell id="user_chat" value="&lt;img src='https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/google-messages.png' width='44' height='44'&gt;&lt;br&gt;&lt;br&gt;&lt;b style='font-size:16px;color:#1E293B;'&gt;User Interface /&lt;br&gt;Chat App&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=2;align=center;verticalAlign=middle;fontFamily=Helvetica;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="80" y="320" width="220" height="180" as="geometry" />
        </mxCell>

        <!-- ZONE 2 CONTAINERS AND NODES -->
        <mxCell id="orchestrator_box" value="&lt;img src='https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/google-cloud.png' width='24' height='24' style='vertical-align:middle;'&gt;&amp;nbsp;&amp;nbsp;Agent Orchestrator (Vertex AI)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=2;verticalAlign=top;align=left;spacingLeft=18;spacingTop=15;fontFamily=Helvetica;fontSize=16;fontStyle=1;fontColor=#1D4ED8;shadow=0;" vertex="1" parent="1">
          <mxGeometry x="430" y="150" width="520" height="560" as="geometry" />
        </mxCell>

        <mxCell id="sys_prompt" value="&lt;b style='font-size:15px;color:#1E293B;'&gt;System Prompt /&lt;br&gt;Persona&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:12px;color:#475569;'&gt;Guardrails and identity&lt;br&gt;(e.g., &amp;quot;Financial Analyst&amp;quot;)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=2;align=center;verticalAlign=middle;fontFamily=Helvetica;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="460" y="210" width="210" height="110" as="geometry" />
        </mxCell>

        <mxCell id="conv_mem" value="&lt;b style='font-size:15px;color:#1E293B;'&gt;Conversation&lt;br&gt;Memory&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:12px;color:#475569;'&gt;Persistent short-term&lt;br&gt;context&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#10B981;strokeWidth=2;align=center;verticalAlign=middle;fontFamily=Helvetica;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="710" y="210" width="210" height="110" as="geometry" />
        </mxCell>

        <!-- THE REASONER: GEMINI 1.5 PRO AND REACT LOOP -->
        <mxCell id="reasoner_box" value="The Reasoner: Gemini 1.5 Pro (LLM)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=2;verticalAlign=top;align=center;spacingTop=15;fontFamily=Helvetica;fontSize=16;fontStyle=1;fontColor=#0F172A;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="460" y="360" width="460" height="320" as="geometry" />
        </mxCell>

        <mxCell id="react_center" value="&lt;b style='font-size:16px;color:#1E293B;'&gt;ReAct&lt;br&gt;Loop&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="640" y="490" width="100" height="60" as="geometry" />
        </mxCell>
        <mxCell id="react_thought" value="Thought" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontStyle=1;fontSize=13;fontColor=#334155;" vertex="1" parent="1">
          <mxGeometry x="640" y="420" width="100" height="30" as="geometry" />
        </mxCell>
        <mxCell id="react_action" value="Action" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontStyle=1;fontSize=13;fontColor=#334155;" vertex="1" parent="1">
          <mxGeometry x="770" y="505" width="80" height="30" as="geometry" />
        </mxCell>
        <mxCell id="react_obs" value="Observation" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontStyle=1;fontSize=13;fontColor=#334155;" vertex="1" parent="1">
          <mxGeometry x="640" y="590" width="100" height="30" as="geometry" />
        </mxCell>
        <mxCell id="react_syn" value="Synthesis" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontStyle=1;fontSize=13;fontColor=#334155;" vertex="1" parent="1">
          <mxGeometry x="530" y="505" width="80" height="30" as="geometry" />
        </mxCell>

        <!-- REACT LOOP ARROWS (PERFECT CIRCULAR RING ARCS) -->
        <mxCell id="e_r1" value="" style="curved=1;html=1;strokeWidth=2;strokeColor=#475569;endArrow=block;endFill=1;exitX=1;exitY=0.5;entryX=0.5;entryY=0;" edge="1" parent="1" source="react_thought" target="react_action">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="815" y="435" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="e_r2" value="" style="curved=1;html=1;strokeWidth=2;strokeColor=#475569;endArrow=block;endFill=1;exitX=0.5;exitY=1;entryX=1;entryY=0.5;" edge="1" parent="1" source="react_action" target="react_obs">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="815" y="605" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="e_r3" value="" style="curved=1;html=1;strokeWidth=2;strokeColor=#475569;endArrow=block;endFill=1;exitX=0;exitY=0.5;entryX=0.5;entryY=1;" edge="1" parent="1" source="react_obs" target="react_syn">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="565" y="605" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="e_r4" value="" style="curved=1;html=1;strokeWidth=2;strokeColor=#475569;endArrow=block;endFill=1;exitX=0.5;exitY=0;entryX=0;entryY=0.5;" edge="1" parent="1" source="react_syn" target="react_thought">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="565" y="435" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- ZONE 3: TOOL ECOSYSTEM CONTAINERS AND NODES -->
        <mxCell id="tool_eco_box" value="Tool Ecosystem&lt;br&gt;&lt;span style='font-size:13px;font-weight:normal;color:#475569;'&gt;(Private Enterprise Environment)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=2;verticalAlign=top;align=center;spacingTop=15;fontFamily=Helvetica;fontSize=16;fontStyle=1;fontColor=#1D4ED8;shadow=0;" vertex="1" parent="1">
          <mxGeometry x="1050" y="150" width="500" height="560" as="geometry" />
        </mxCell>

        <!-- TOOL 1: ENTERPRISE KNOWLEDGE -->
        <mxCell id="tool_1_box" value="Tool 1: Enterprise Knowledge&lt;br&gt;&lt;span style='font-size:13px;font-weight:normal;color:#92400E;'&gt;(Managed RAG)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFBEB;strokeColor=#F59E0B;strokeWidth=2;verticalAlign=top;align=center;spacingTop=12;fontFamily=Helvetica;fontSize=15;fontStyle=1;fontColor=#B45309;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="1080" y="220" width="440" height="170" as="geometry" />
        </mxCell>
        <mxCell id="tool_1_icon" value="&lt;img src='https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/google-cloud.png' width='24' height='24'&gt;&lt;br&gt;&lt;br&gt;Vertex AI Search&lt;br&gt;and Conversation" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;align=center;verticalAlign=middle;fontFamily=Helvetica;fontSize=13;fontStyle=1;fontColor=#1E293B;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="1100" y="275" width="160" height="95" as="geometry" />
        </mxCell>
        <mxCell id="tool_1_list" value="&lt;ul style='margin:0;padding-left:18px;line-height:1.7;'&gt;&lt;li&gt;Queries secured GCS Data Corpus&lt;/li&gt;&lt;li&gt;Automatic Embedding &amp;amp; Retrieval&lt;/li&gt;&lt;/ul&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;fontSize=13;fontColor=#1E293B;" vertex="1" parent="1">
          <mxGeometry x="1275" y="280" width="230" height="85" as="geometry" />
        </mxCell>

        <!-- MIDDLE ITALIC QUOTE -->
        <mxCell id="tool_quote" value="&amp;apos;No custom RAG infrastructure.&amp;apos;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;fontSize=13;fontStyle=2;fontColor=#475569;" vertex="1" parent="1">
          <mxGeometry x="1080" y="405" width="440" height="30" as="geometry" />
        </mxCell>

        <!-- TOOL 2: BUSINESS ANALYTICS -->
        <mxCell id="tool_2_box" value="Tool 2: Business Analytics&lt;br&gt;&lt;span style='font-size:13px;font-weight:normal;color:#92400E;'&gt;(Analytics)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFBEB;strokeColor=#F59E0B;strokeWidth=2;verticalAlign=top;align=center;spacingTop=12;fontFamily=Helvetica;fontSize=15;fontStyle=1;fontColor=#B45309;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="1080" y="450" width="440" height="170" as="geometry" />
        </mxCell>
        <mxCell id="tool_2_icon" value="&lt;img src='https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/google-cloud.png' width='26' height='26'&gt;&lt;br&gt;&lt;br&gt;BigQuery" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;align=center;verticalAlign=middle;fontFamily=Helvetica;fontSize=14;fontStyle=1;fontColor=#1E293B;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="1100" y="505" width="160" height="95" as="geometry" />
        </mxCell>
        <mxCell id="tool_2_list" value="&lt;ul style='margin:0;padding-left:18px;line-height:1.7;'&gt;&lt;li&gt;Execute SQL Queries&lt;/li&gt;&lt;li&gt;Structured Data Access&lt;/li&gt;&lt;/ul&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;fontSize=13;fontColor=#1E293B;" vertex="1" parent="1">
          <mxGeometry x="1275" y="510" width="230" height="85" as="geometry" />
        </mxCell>

        <!-- CONNECTIONS & ARROWS -->
        <!-- 1. User Prompt (Chat -> Orchestrator) -->
        <mxCell id="e_user_1" value="&lt;b style='font-size:13px;color:#0F172A;'&gt;1. User Prompt&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:11px;color:#475569;'&gt;(e.g., &amp;quot;Compare market trends&lt;br&gt;across functional silos&amp;quot;)&lt;/span&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#475569;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="user_chat" target="orchestrator_box">
          <mxGeometry x="0.1" y="-20" relative="1" as="geometry">
            <mxPoint x="300" y="370" as="sourcePoint" />
            <mxPoint x="430" y="370" as="targetPoint" />
            <Array as="points">
              <mxPoint x="365" y="370" />
              <mxPoint x="365" y="370" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- 2. Synthesized Response (Orchestrator -> Chat) -->
        <mxCell id="e_user_2" value="&lt;b style='font-size:12px;color:#0F172A;'&gt;SYNTHESIZED&lt;br&gt;RESPONSE&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#475569;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="orchestrator_box" target="user_chat">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="430" y="450" as="sourcePoint" />
            <mxPoint x="300" y="450" as="targetPoint" />
            <Array as="points">
              <mxPoint x="365" y="450" />
              <mxPoint x="365" y="450" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- 3. System Prompt -> Memory -->
        <mxCell id="e_internal_1" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#64748B;endArrow=block;endFill=1;" edge="1" parent="1" source="sys_prompt" target="conv_mem">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- 4. System Prompt -> Reasoner -->
        <mxCell id="e_internal_2" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#64748B;endArrow=block;endFill=1;" edge="1" parent="1" source="sys_prompt" target="reasoner_box">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="565" y="340" />
              <mxPoint x="565" y="340" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- 5. Memory -> Reasoner -->
        <mxCell id="e_internal_3" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#64748B;endArrow=block;endFill=1;" edge="1" parent="1" source="conv_mem" target="reasoner_box">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="815" y="340" />
              <mxPoint x="815" y="340" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- 6. ACTION: RAG Query (Reasoner -> Tool 1) -->
        <mxCell id="e_tool_1a" value="&lt;b style='font-size:13px;color:#1D4ED8;'&gt;ACTION: RAG Query&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:11px;color:#475569;'&gt;(e.g., &amp;quot;Oncology Trends&amp;quot;)&lt;/span&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#2563EB;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="reasoner_box" target="tool_1_box">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="985" y="440" />
              <mxPoint x="985" y="280" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- 7. OBSERVATION: RAG Results (Tool 1 -> Reasoner) -->
        <mxCell id="e_tool_1b" value="&lt;b style='font-size:12px;color:#0F172A;'&gt;OBSERVATION:&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:11px;color:#475569;'&gt;Retrieved Context Chunks&lt;/span&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#475569;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="tool_1_box" target="reasoner_box">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="960" y="330" />
              <mxPoint x="960" y="480" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- 8. ACTION: SQL Query (Reasoner -> Tool 2) -->
        <mxCell id="e_tool_2a" value="&lt;b style='font-size:13px;color:#1D4ED8;'&gt;ACTION: SQL Query&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:11px;color:#475569;'&gt;(e.g., &amp;quot;Total Sales in Q1&amp;quot;)&lt;/span&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#2563EB;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="reasoner_box" target="tool_2_box">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="985" y="560" />
              <mxPoint x="985" y="510" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- 9. OBSERVATION: SQL Results (Tool 2 -> Reasoner) -->
        <mxCell id="e_tool_2b" value="&lt;b style='font-size:12px;color:#0F172A;'&gt;OBSERVATION:&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:11px;color:#475569;'&gt;Query Results (JSON/Table)&lt;/span&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#475569;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="tool_2_box" target="reasoner_box">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="960" y="580" />
              <mxPoint x="960" y="620" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- BOTTOM LEGEND & SECURITY ANNOTATIONS -->
        <mxCell id="legend_footer" value="&lt;b style=&quot;font-size:13px;color:#0F172A;&quot;&gt;Legend &amp;amp; Security Annotations&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;verticalAlign=top;align=left;spacingLeft=15;spacingTop=8;fontFamily=Helvetica;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="40" y="790" width="1560" height="130" as="geometry" />
        </mxCell>
        <mxCell id="leg_left" value="&lt;div style='line-height:1.8;font-size:12px;color:#334155;'&gt;&lt;b&gt;Legend:&lt;/b&gt;&lt;br&gt;&lt;span style='color:#3B82F6;'&gt;●&lt;/span&gt;&amp;nbsp;Google Cloud Managed Service&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&lt;span style='color:#10B981;'&gt;●&lt;/span&gt;&amp;nbsp;User / Session Data&lt;br&gt;&lt;span style='color:#F59E0B;'&gt;●&lt;/span&gt;&amp;nbsp;Secure Tool Boundary&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;&lt;span style='color:#64748B;'&gt;-----&lt;/span&gt;&amp;nbsp;Secure Enterprise Boundary&lt;/div&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="60" y="825" width="420" height="85" as="geometry" />
        </mxCell>
        <mxCell id="leg_mid" value="&lt;div style='line-height:1.8;font-size:12px;color:#334155;'&gt;&lt;b style='color:#1D4ED8;'&gt;➔ ACTION:&lt;/b&gt; RAG Query / SQL Query (Automatic embedding &amp;amp; retrieved context chunks)&lt;br&gt;&lt;b style='color:#0F172A;'&gt;➔ OBSERVATION:&lt;/b&gt; Query Results (JSON/Table data flow-consequent control data)&lt;/div&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="510" y="825" width="550" height="85" as="geometry" />
        </mxCell>
        <mxCell id="leg_right" value="&lt;div style='line-height:1.6;font-size:12px;color:#1E293B;'&gt;&lt;b&gt;Security annotations:&lt;/b&gt;&lt;ul style='margin:4px 0 0 0;padding-left:16px;'&gt;&lt;li&gt;Data masking: security access masking&lt;/li&gt;&lt;li&gt;IAM integration with security response networks&lt;/li&gt;&lt;li&gt;Private access paths to Gemini boundary&lt;/li&gt;&lt;/ul&gt;&lt;/div&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="1090" y="825" width="480" height="85" as="geometry" />
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
  `.trim();
}

export function getExactSequenceDiagramReferenceXml(): string {
  return `
<mxfile host="embed.diagrams.net">
  <diagram id="sequence_diagram_compiled" name="Micro Dynamic Sequence Diagram">
    <mxGraphModel dx="1750" dy="1500" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1750" pageHeight="1500" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- GOVERNED NETWORK CONTAINER (CREAM BACKGROUND THEME WITH BLUE BORDER EXACTLY MATCHING IMAGE 1) -->
        <mxCell id="gov_network" value="ITACS SECURE MANAGED GEMINI ENTERPRISE ECOSYSTEM (Governed Network)" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FEFCE8;strokeColor=#0284C7;strokeWidth=2.5;verticalAlign=top;align=center;spacingTop=12;fontFamily=Helvetica;fontSize=16;fontStyle=1;fontColor=#0F172A;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="210" y="25" width="1490" height="1330" as="geometry" />
        </mxCell>

        <!-- TIME ARROW ON LEFT (OUTSIDE CONTAINER) -->
        <mxCell id="time_arrow" value="" style="endArrow=block;endFill=1;html=1;strokeWidth=2.5;strokeColor=#475569;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="50" y="100" as="sourcePoint" />
            <mxPoint x="50" y="1330" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="time_label" value="&lt;b style='font-size:15px;color:#334155;'&gt;Time &amp;darr;&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;rotation=-90;" vertex="1" parent="1">
          <mxGeometry x="15" y="600" width="25" height="100" as="geometry" />
        </mxCell>

        <!-- 7 COLUMN HEADERS (WITH EXACT ICONS & STYLING MATCHING IMAGE 1) -->
        <mxCell id="user_col" value="&lt;b style='font-size:12px;color:#0F172A;'&gt;👤 External Actor:&lt;br&gt;User / Chat Interface&lt;/b&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#E2E8F0;strokeColor=#475569;strokeWidth=2;fontFamily=Helvetica;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="50" y="70" width="145" height="65" as="geometry" />
        </mxCell>
        <mxCell id="orch_col" value="&lt;b style='font-size:12px;color:#1E3A8A;'&gt;⚙️ Orchestrator:&lt;br&gt;Agent Orchestrator (GKE Pod)&lt;/b&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#2563EB;strokeWidth=2;fontFamily=Helvetica;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="240" y="70" width="200" height="65" as="geometry" />
        </mxCell>
        <mxCell id="llm_col" value="&lt;b style='font-size:12px;color:#1E3A8A;'&gt;🧠 Reasoner:&lt;br&gt;Gemini 1.5 Pro (LLM)&lt;/b&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#2563EB;strokeWidth=2;fontFamily=Helvetica;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="470" y="70" width="180" height="65" as="geometry" />
        </mxCell>
        <mxCell id="mem_col" value="&lt;b style='font-size:12px;color:#1E3A8A;'&gt;💬 Memory:&lt;br&gt;Conversation Memory&lt;br&gt;(Short-term context)&lt;/b&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#2563EB;strokeWidth=2;fontFamily=Helvetica;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="680" y="70" width="200" height="65" as="geometry" />
        </mxCell>
        <mxCell id="rag_col" value="&lt;b style='font-size:12px;color:#134E4A;'&gt;🔍 Tool 1: Managed RAG&lt;br&gt;(Vertex AI Search &amp;amp; Conv)&lt;/b&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#CCFBF1;strokeColor=#0D9488;strokeWidth=2;fontFamily=Helvetica;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="910" y="70" width="220" height="65" as="geometry" />
        </mxCell>
        <mxCell id="gcs_col" value="&lt;b style='font-size:12px;color:#1E3A8A;'&gt;🛢️ Data Lake:&lt;br&gt;GCS Secure Bucket&lt;br&gt;(Secure Data Corpus)&lt;/b&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#2563EB;strokeWidth=2;fontFamily=Helvetica;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="1160" y="70" width="220" height="65" as="geometry" />
        </mxCell>
        <mxCell id="bq_col" value="&lt;b style='font-size:12px;color:#1E3A8A;'&gt;📊 Tool 2:&lt;br&gt;BigQuery Analytics (SQL)&lt;/b&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#2563EB;strokeWidth=2;fontFamily=Helvetica;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="1410" y="70" width="210" height="65" as="geometry" />
        </mxCell>

        <!-- 7 VERTICAL DASHED LIFELINE BARS -->
        <mxCell id="user_bar" value="" style="endArrow=none;dashed=1;html=1;strokeWidth=1.5;strokeColor=#64748B;strokeDashArray=6 6;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="122" y="135" as="sourcePoint" /><mxPoint x="122" y="1330" as="targetPoint" /></mxGeometry>
        </mxCell>
        <mxCell id="orch_bar" value="" style="endArrow=none;dashed=1;html=1;strokeWidth=1.5;strokeColor=#64748B;strokeDashArray=6 6;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="340" y="135" as="sourcePoint" /><mxPoint x="340" y="1330" as="targetPoint" /></mxGeometry>
        </mxCell>
        <mxCell id="llm_bar" value="" style="endArrow=none;dashed=1;html=1;strokeWidth=1.5;strokeColor=#64748B;strokeDashArray=6 6;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="560" y="135" as="sourcePoint" /><mxPoint x="560" y="1330" as="targetPoint" /></mxGeometry>
        </mxCell>
        <mxCell id="mem_bar" value="" style="endArrow=none;dashed=1;html=1;strokeWidth=1.5;strokeColor=#64748B;strokeDashArray=6 6;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="780" y="135" as="sourcePoint" /><mxPoint x="780" y="1330" as="targetPoint" /></mxGeometry>
        </mxCell>
        <mxCell id="rag_bar" value="" style="endArrow=none;dashed=1;html=1;strokeWidth=1.5;strokeColor=#64748B;strokeDashArray=6 6;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="1020" y="135" as="sourcePoint" /><mxPoint x="1020" y="1330" as="targetPoint" /></mxGeometry>
        </mxCell>
        <mxCell id="gcs_bar" value="" style="endArrow=none;dashed=1;html=1;strokeWidth=1.5;strokeColor=#64748B;strokeDashArray=6 6;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="1270" y="135" as="sourcePoint" /><mxPoint x="1270" y="1330" as="targetPoint" /></mxGeometry>
        </mxCell>
        <mxCell id="bq_bar" value="" style="endArrow=none;dashed=1;html=1;strokeWidth=1.5;strokeColor=#64748B;strokeDashArray=6 6;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="1515" y="135" as="sourcePoint" /><mxPoint x="1515" y="1330" as="targetPoint" /></mxGeometry>
        </mxCell>

        <!-- VERTICAL EXECUTION / ACTIVATION BARS ON LIFELINES MATCHING IMAGE 1 PRESENCE -->
        <mxCell id="act_user_1" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#3B82F6;strokeColor=#1D4ED8;strokeWidth=1.5;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="115" y="140" width="14" height="70" as="geometry" />
        </mxCell>
        <mxCell id="act_user_2" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#3B82F6;strokeColor=#1D4ED8;strokeWidth=1.5;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="115" y="1225" width="14" height="35" as="geometry" />
        </mxCell>
        <mxCell id="act_orch_main" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#3B82F6;strokeColor=#1D4ED8;strokeWidth=1.5;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="333" y="145" width="14" height="1140" as="geometry" />
        </mxCell>
        <mxCell id="act_llm_1" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#93C5FD;strokeColor=#2563EB;strokeWidth=1.5;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="553" y="365" width="14" height="60" as="geometry" />
        </mxCell>
        <mxCell id="act_llm_2" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#93C5FD;strokeColor=#2563EB;strokeWidth=1.5;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="553" y="685" width="14" height="60" as="geometry" />
        </mxCell>
        <mxCell id="act_llm_3" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#93C5FD;strokeColor=#2563EB;strokeWidth=1.5;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="553" y="1035" width="14" height="60" as="geometry" />
        </mxCell>
        <mxCell id="act_mem_1" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#A7F3D0;strokeColor=#059669;strokeWidth=1.5;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="773" y="270" width="14" height="105" as="geometry" />
        </mxCell>
        <mxCell id="act_mem_2" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#A7F3D0;strokeColor=#059669;strokeWidth=1.5;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="773" y="1165" width="14" height="65" as="geometry" />
        </mxCell>
        <mxCell id="act_rag_1" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#6EE7B7;strokeColor=#10B981;strokeWidth=1.5;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="1013" y="480" width="14" height="135" as="geometry" />
        </mxCell>
        <mxCell id="act_gcs_1" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#93C5FD;strokeColor=#2563EB;strokeWidth=1.5;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="1263" y="540" width="14" height="70" as="geometry" />
        </mxCell>
        <mxCell id="act_bq_1" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#60A5FA;strokeColor=#1D4ED8;strokeWidth=1.5;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="1508" y="800" width="14" height="155" as="geometry" />
        </mxCell>
        <mxCell id="act_bq_2" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#60A5FA;strokeColor=#1D4ED8;strokeWidth=1.5;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="1508" y="1270" width="14" height="30" as="geometry" />
        </mxCell>

        <!-- STEP 1: USER PROMPT -->
        <mxCell id="s1" value="Sends single Oncology prompt:&lt;br&gt;&lt;span style='font-size:10px;font-weight:normal;'&gt;'Compare market trends across 5 silos,&lt;br&gt;include recent sales figures'&lt;/span&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=2;strokeColor=#1E293B;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=11;fontColor=#0F172A;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="122" y="160" as="sourcePoint" /><mxPoint x="340" y="160" as="targetPoint" /></mxGeometry>
        </mxCell>

        <!-- STEP 2: INTERFACE & PII BOXES -->
        <mxCell id="s2_lbl" value="&lt;b style='font-size:11px;color:#0F172A;'&gt;INTERFACE&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="150" y="195" width="80" height="22" as="geometry" />
        </mxCell>
        <mxCell id="pii_box_1" value="PII/Ethical sourcing check referencing image 15 vetting" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFEDD5;strokeColor=#F97316;fontColor=#9A3412;fontStyle=1;fontSize=11;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="145" y="225" width="180" height="32" as="geometry" />
        </mxCell>
        <mxCell id="pii_box_2" value="PII Check referencing image 15 vetting" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFEDD5;strokeColor=#F97316;fontColor=#9A3412;fontStyle=1;fontSize=10;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="145" y="440" width="160" height="28" as="geometry" />
        </mxCell>

        <!-- STEP 3: PERSONA & MEMORY CHECK -->
        <mxCell id="s3" value="Checks Persona &amp;amp; Memory&lt;br&gt;&lt;span style='font-size:10px;font-weight:normal;'&gt;(Query, Context reference image 7, context corpus definition)&lt;/span&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=2;strokeColor=#1D4ED8;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=11;fontColor=#0F172A;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="340" y="280" as="sourcePoint" /><mxPoint x="780" y="280" as="targetPoint" /></mxGeometry>
        </mxCell>
        <mxCell id="s3_ret" value="Context" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;dashed=1;strokeWidth=2;strokeColor=#10B981;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=11;fontColor=#0F172A;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="780" y="325" as="sourcePoint" /><mxPoint x="340" y="325" as="targetPoint" /></mxGeometry>
        </mxCell>

        <!-- STEP 4: MEMORY TO REASONER -->
        <mxCell id="s4" value="Updates Conversation Memory&lt;br&gt;&lt;span style='font-size:10px;font-weight:normal;'&gt;with new prompt&lt;br&gt;(Sends: Prompt + Memory)&lt;/span&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=2;strokeColor=#1D4ED8;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=11;fontColor=#0F172A;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="340" y="375" as="sourcePoint" /><mxPoint x="560" y="375" as="targetPoint" /></mxGeometry>
        </mxCell>

        <!-- STEP 5: REACT 1 -->
        <mxCell id="s5_react" value="&lt;b&gt;ReAct&lt;/b&gt;&lt;br&gt;THOUGHT: 'I need multi-silo context.'&lt;br&gt;&lt;b style='color:#1D4ED8;'&gt;ACTION: Call RAG Tool&lt;/b&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;fontColor=#1E293B;fontStyle=0;fontSize=11;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="435" y="410" width="250" height="58" as="geometry" />
        </mxCell>

        <!-- STEP 6: RAG ACTION WITH EXACT SUB-LABEL -->
        <mxCell id="s6" value="Executes RAG Action:&lt;br&gt;&lt;span style='font-size:10px;color:#475569;font-weight:normal;'&gt;(Send call with 'Automatic Embedding &amp;amp; Ret Tool', reference image 1 (tool 1))&lt;br&gt;Call includes prompt (est., Compare compani sale, centientext) (Axion reference image 15)&lt;/span&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=2;strokeColor=#1D4ED8;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=11;fontColor=#0F172A;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="340" y="490" as="sourcePoint" /><mxPoint x="1020" y="490" as="targetPoint" /></mxGeometry>
        </mxCell>

        <!-- STEP 7: SEARCH GCS CORPUS -->
        <mxCell id="s7" value="Search GCS Corpus&lt;br&gt;&lt;span style='font-size:10px;font-weight:normal;'&gt;(Automatic context lookup)&lt;/span&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=2;strokeColor=#0284C7;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=11;fontColor=#0F172A;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="1020" y="550" as="sourcePoint" /><mxPoint x="1270" y="550" as="targetPoint" /></mxGeometry>
        </mxCell>
        <mxCell id="action_ref_1" value="Action reference image 13s Inager" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFEDD5;strokeColor=#F97316;fontStyle=0;fontSize=10;fontColor=#9A3412;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="830" y="535" width="140" height="26" as="geometry" />
        </mxCell>

        <!-- STEP 8: RETURNS CHUNK LINKS -->
        <mxCell id="s8_ret" value="Returns chunk links &amp;amp; context corpus log definition&lt;br&gt;&lt;span style='font-size:10px;color:#15803D;font-weight:normal;'&gt;RAG logs action in Context Corpus reference image 7,&lt;br&gt;context corpus log definition&lt;/span&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;dashed=1;strokeWidth=2;strokeColor=#10B981;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=11;fontColor=#0F172A;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="1270" y="600" as="sourcePoint" /><mxPoint x="1020" y="600" as="targetPoint" /></mxGeometry>
        </mxCell>

        <!-- STEP 9: SENDS RETRIEVED CONTEXT CHUNKS -->
        <mxCell id="s9_obs" value="Sends Retrieved Context Chunks to OBSERVATION" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;dashed=1;strokeWidth=2;strokeColor=#10B981;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=11;fontColor=#0F172A;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="1020" y="645" as="sourcePoint" /><mxPoint x="340" y="645" as="targetPoint" /></mxGeometry>
        </mxCell>
        <mxCell id="action_ref_2" value="Action reference Image 1 observation" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFEDD5;strokeColor=#F97316;fontStyle=0;fontSize=10;fontColor=#9A3412;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="830" y="630" width="140" height="26" as="geometry" />
        </mxCell>

        <!-- STEP 10: UPDATES REASONER 1 -->
        <mxCell id="s10" value="Updates Reasoner (GEMINI)&lt;br&gt;&lt;span style='font-size:10px;font-weight:normal;'&gt;with New Observation&lt;br&gt;(Prompt + Memory + RAG Obs)&lt;/span&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=2;strokeColor=#1D4ED8;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=11;fontColor=#0F172A;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="340" y="695" as="sourcePoint" /><mxPoint x="560" y="695" as="targetPoint" /></mxGeometry>
        </mxCell>

        <!-- STEP 11: REACT 2 -->
        <mxCell id="s11_react" value="&lt;b&gt;ReAct&lt;/b&gt;&lt;br&gt;THOUGHT: 'I have context, but need recent sales figures.'&lt;br&gt;&lt;b style='color:#1D4ED8;'&gt;ACTION: Query BigQuery Analytics&lt;/b&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;fontColor=#1E293B;fontStyle=0;fontSize=11;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="435" y="730" width="250" height="58" as="geometry" />
        </mxCell>

        <!-- STEP 12: EXECUTES ANALYTICS ACTION -->
        <mxCell id="s12" value="Executes Analytics Action&lt;br&gt;&lt;span style='font-size:10px;color:#475569;font-weight:normal;'&gt;(Send call logs: ML Inference log def)&lt;br&gt;Call includes SQL query + RAG query&lt;/span&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=2;strokeColor=#1D4ED8;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=11;fontColor=#0F172A;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="340" y="810" as="sourcePoint" /><mxPoint x="1515" y="810" as="targetPoint" /></mxGeometry>
        </mxCell>

        <!-- STEP 13: EXECUTES SQL QUERY -->
        <mxCell id="s13" value="Executes SQL query&lt;br&gt;&lt;span style='font-size:10px;font-weight:normal;'&gt;(Secure Data Access tool 2)&lt;/span&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=2;strokeColor=#0284C7;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=11;fontColor=#0F172A;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="1515" y="895" as="sourcePoint" /><mxPoint x="1270" y="895" as="targetPoint" /></mxGeometry>
        </mxCell>
        <mxCell id="iam_note_exact" value="GCS/BQ enforces IAM integration &amp;amp; VPC-SC reference Image 3" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#22C55E;fontStyle=1;fontSize=10;fontColor=#166534;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="1300" y="822" width="180" height="28" as="geometry" />
        </mxCell>

        <!-- STEP 14: BQ FETCHES RESULTS -->
        <mxCell id="s14_ret" value="BQ fetches results" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;dashed=1;strokeWidth=2;strokeColor=#10B981;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=11;fontColor=#0F172A;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="1270" y="945" as="sourcePoint" /><mxPoint x="1515" y="945" as="targetPoint" /></mxGeometry>
        </mxCell>

        <!-- STEP 15: SENDS QUERY RESULTS TO OBSERVATION -->
        <mxCell id="s15_obs" value="Sends Query Results (Table: JSON) to OBSERVATION" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;dashed=1;strokeWidth=2;strokeColor=#10B981;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=11;fontColor=#0F172A;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="1515" y="995" as="sourcePoint" /><mxPoint x="340" y="995" as="targetPoint" /></mxGeometry>
        </mxCell>

        <!-- STEP 16: UPDATES REASONER 2 -->
        <mxCell id="s16" value="Updates Reasoner (GEMINI)&lt;br&gt;&lt;span style='font-size:10px;font-weight:normal;'&gt;with New Observation&lt;br&gt;(Prompt + Memory + RAG Obs)&lt;/span&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=2;strokeColor=#1D4ED8;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=11;fontColor=#0F172A;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="340" y="1045" as="sourcePoint" /><mxPoint x="560" y="1045" as="targetPoint" /></mxGeometry>
        </mxCell>

        <!-- STEP 17: REACT 3 -->
        <mxCell id="s17_react" value="&lt;b&gt;ReAct&lt;/b&gt;&lt;br&gt;THOUGHT: 'All context gathered.'&lt;br&gt;&lt;b style='color:#047857;'&gt;SYNTHESIS: Generate comprehensive report&lt;/b&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#ECFDF5;strokeColor=#10B981;fontColor=#1E293B;fontStyle=0;fontSize=11;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="435" y="1080" width="250" height="58" as="geometry" />
        </mxCell>

        <!-- STEP 18: SYNTHESIZES FINAL RESPONSE TEST -->
        <mxCell id="s18" value="Synthesizes final response test&lt;br&gt;&lt;span style='font-size:10px;font-weight:normal;'&gt;(Action ref Image 15 data inventory)&lt;br&gt;Updates Conversation Memory&lt;/span&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=2;strokeColor=#1D4ED8;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=11;fontColor=#0F172A;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="340" y="1180" as="sourcePoint" /><mxPoint x="780" y="1180" as="targetPoint" /></mxGeometry>
        </mxCell>

        <!-- STEP 19: SYNTHESIZE REPORTING ARTIFACT & FINAL RESPONSE -->
        <mxCell id="s19_user" value="Sends final synthesized response&lt;br&gt;&lt;span style='font-size:10px;font-weight:normal;'&gt;(linked PPT report / JSON data)&lt;br&gt;Displays response to USER&lt;/span&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=2.5;strokeColor=#2563EB;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=11;fontColor=#1D4ED8;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="340" y="1235" as="sourcePoint" /><mxPoint x="122" y="1235" as="targetPoint" /></mxGeometry>
        </mxCell>

        <!-- STEP 20: LOGS FINAL OUTCOME -->
        <mxCell id="s20_log" value="Logs final outcome" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=2;strokeColor=#9A3412;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=11;fontColor=#9A3412;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="340" y="1285" as="sourcePoint" /><mxPoint x="1515" y="1285" as="targetPoint" /></mxGeometry>
        </mxCell>

        <!-- TOPOLOGY NOTES & LOGGING BOXES MATCHING IMAGE 1 -->
        <mxCell id="top_note_1" value="Automatic context lookup, private access path to Gemini boundary reference 5 topology" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#94A3B8;fontStyle=0;fontSize=10;fontColor=#334155;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="1300" y="180" width="180" height="40" as="geometry" />
        </mxCell>
        <mxCell id="top_note_2" value="Automatic context lookup, private access path to Gemini reference Image 5 topology" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#94A3B8;fontStyle=0;fontSize=10;fontColor=#334155;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="1300" y="370" width="180" height="40" as="geometry" />
        </mxCell>
        <mxCell id="mid_note_1" value="Context is masked referencing definition" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#94A3B8;fontStyle=0;fontSize=10;fontColor=#334155;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="1300" y="525" width="160" height="30" as="geometry" />
        </mxCell>
        <mxCell id="log_box_1" value="Logs results in Business Analytics log definition" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFEDD5;strokeColor=#F97316;fontStyle=1;fontSize=10;fontColor=#9A3412;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="1530" y="795" width="150" height="38" as="geometry" />
        </mxCell>
        <mxCell id="log_box_2" value="Logs results Analytics tool reference Image 7 business Analytics definition" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFEDD5;strokeColor=#F97316;fontStyle=1;fontSize=10;fontColor=#9A3412;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="1530" y="915" width="150" height="48" as="geometry" />
        </mxCell>
        <mxCell id="conv_log_box" value="Conversation Log conversation log definition" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#64748B;fontStyle=0;fontSize=10;fontColor=#334155;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="800" y="1135" width="160" height="30" as="geometry" />
        </mxCell>
        <mxCell id="rep_state_box" value="Updates Report state 15 state machine flow" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#64748B;fontStyle=0;fontSize=10;fontColor=#334155;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="800" y="1175" width="160" height="30" as="geometry" />
        </mxCell>

        
        <!-- ALL 19 NUMBERED STEP CIRCLE BADGES (HIGHEST Z-ORDER AT END OF GRAPH, LOCATED BEFORE VERTICAL LIFELINE BARS TO PREVENT TEXT OVERLAP) -->
        <mxCell id="c1" value="1" style="ellipse;whiteSpace=wrap;html=1;fillColor=#0F172A;fontColor=#FFFFFF;fontStyle=1;fontSize=11;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="92" y="150" width="22" height="22" as="geometry" />
        </mxCell>
        <mxCell id="c2" value="2" style="ellipse;whiteSpace=wrap;html=1;fillColor=#0F172A;fontColor=#FFFFFF;fontStyle=1;fontSize=11;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="92" y="195" width="22" height="22" as="geometry" />
        </mxCell>
        <mxCell id="c3" value="3" style="ellipse;whiteSpace=wrap;html=1;fillColor=#0F172A;fontColor=#FFFFFF;fontStyle=1;fontSize=11;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="310" y="270" width="22" height="22" as="geometry" />
        </mxCell>
        <mxCell id="c4" value="4" style="ellipse;whiteSpace=wrap;html=1;fillColor=#0F172A;fontColor=#FFFFFF;fontStyle=1;fontSize=11;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="310" y="365" width="22" height="22" as="geometry" />
        </mxCell>
        <mxCell id="c5" value="5" style="ellipse;whiteSpace=wrap;html=1;fillColor=#0F172A;fontColor=#FFFFFF;fontStyle=1;fontSize=11;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="420" y="425" width="22" height="22" as="geometry" />
        </mxCell>
        <mxCell id="c6" value="6" style="ellipse;whiteSpace=wrap;html=1;fillColor=#0F172A;fontColor=#FFFFFF;fontStyle=1;fontSize=11;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="310" y="480" width="22" height="22" as="geometry" />
        </mxCell>
        <mxCell id="c7" value="7" style="ellipse;whiteSpace=wrap;html=1;fillColor=#0F172A;fontColor=#FFFFFF;fontStyle=1;fontSize=11;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="990" y="540" width="22" height="22" as="geometry" />
        </mxCell>
        <mxCell id="c8" value="8" style="ellipse;whiteSpace=wrap;html=1;fillColor=#0F172A;fontColor=#FFFFFF;fontStyle=1;fontSize=11;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="990" y="600" width="22" height="22" as="geometry" />
        </mxCell>
        <mxCell id="c9" value="9" style="ellipse;whiteSpace=wrap;html=1;fillColor=#0F172A;fontColor=#FFFFFF;fontStyle=1;fontSize=11;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="310" y="685" width="22" height="22" as="geometry" />
        </mxCell>
        <mxCell id="c10" value="10" style="ellipse;whiteSpace=wrap;html=1;fillColor=#0F172A;fontColor=#FFFFFF;fontStyle=1;fontSize=11;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="420" y="745" width="22" height="22" as="geometry" />
        </mxCell>
        <mxCell id="c11" value="11" style="ellipse;whiteSpace=wrap;html=1;fillColor=#0F172A;fontColor=#FFFFFF;fontStyle=1;fontSize=11;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="310" y="800" width="22" height="22" as="geometry" />
        </mxCell>
        <mxCell id="c12" value="12" style="ellipse;whiteSpace=wrap;html=1;fillColor=#0F172A;fontColor=#FFFFFF;fontStyle=1;fontSize=11;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="1485" y="820" width="22" height="22" as="geometry" />
        </mxCell>
        <mxCell id="c13" value="13" style="ellipse;whiteSpace=wrap;html=1;fillColor=#0F172A;fontColor=#FFFFFF;fontStyle=1;fontSize=11;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="1485" y="885" width="22" height="22" as="geometry" />
        </mxCell>
        <mxCell id="c14" value="14" style="ellipse;whiteSpace=wrap;html=1;fillColor=#0F172A;fontColor=#FFFFFF;fontStyle=1;fontSize=11;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="310" y="1035" width="22" height="22" as="geometry" />
        </mxCell>
        <mxCell id="c15" value="15" style="ellipse;whiteSpace=wrap;html=1;fillColor=#0F172A;fontColor=#FFFFFF;fontStyle=1;fontSize=11;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="420" y="1095" width="22" height="22" as="geometry" />
        </mxCell>
        <mxCell id="c16" value="16" style="ellipse;whiteSpace=wrap;html=1;fillColor=#0F172A;fontColor=#FFFFFF;fontStyle=1;fontSize=11;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="310" y="1170" width="22" height="22" as="geometry" />
        </mxCell>
        <mxCell id="c17" value="17" style="ellipse;whiteSpace=wrap;html=1;fillColor=#0F172A;fontColor=#FFFFFF;fontStyle=1;fontSize=11;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="310" y="1225" width="22" height="22" as="geometry" />
        </mxCell>
        <mxCell id="c18" value="18" style="ellipse;whiteSpace=wrap;html=1;fillColor=#0F172A;fontColor=#FFFFFF;fontStyle=1;fontSize=11;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="92" y="1225" width="22" height="22" as="geometry" />
        </mxCell>
        <mxCell id="c19" value="19" style="ellipse;whiteSpace=wrap;html=1;fillColor=#0F172A;fontColor=#FFFFFF;fontStyle=1;fontSize=11;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="310" y="1275" width="22" height="22" as="geometry" />
        </mxCell>
        <!-- TWO-BOX ARCHITECTURE FOOTER MATCHING IMAGE 1 EXACTLY -->
        <!-- BOX 1: LEGEND AND KEY DEFINITION (LEFT/CENTER) -->
        <mxCell id="legend_box" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;shadow=0;" vertex="1" parent="1">
          <mxGeometry x="40" y="1340" width="1080" height="180" as="geometry" />
        </mxCell>
        <mxCell id="legend_content" value="&lt;table style='width:100%;font-family:Helvetica;font-size:12px;color:#334155;border-collapse:collapse;'&gt;&lt;tr style='vertical-align:top;'&gt;&lt;td style='width:52%;padding-right:15px;'&gt;&lt;b style='font-size:13px;color:#0F172A;'&gt;LEGEND&lt;/b&gt;&lt;br&gt;&lt;table style='width:100%;margin-top:8px;font-size:11px;line-height:1.6;'&gt;&lt;tr&gt;&lt;td&gt;&lt;span style='color:#3B82F6;font-size:14px;'&gt;■&lt;/span&gt; Managed Compute&lt;/td&gt;&lt;td&gt;&lt;b style='color:#1E293B;'&gt;&amp;rarr;&lt;/b&gt; Managed Type&lt;/td&gt;&lt;td&gt;&lt;b style='color:#10B981;'&gt;&amp;rarr;&lt;/b&gt; PII Check referencing check&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;&lt;span style='color:#10B981;font-size:14px;'&gt;■&lt;/span&gt; Storage&lt;/td&gt;&lt;td&gt;&lt;b style='color:#3B82F6;&lt;/b&gt;&amp;mdash; Connection boundary&lt;/td&gt;&lt;td&gt;&lt;span style='color:#1E3A8A;font-size:14px;'&gt;■&lt;/span&gt; PII Check vetting&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;&lt;span style='color:#64748B;font-size:14px;'&gt;■&lt;/span&gt; Secure boundary&lt;/td&gt;&lt;td&gt;&lt;b style='color:#64748B;&lt;/b&gt;- - - Line descriptions&lt;/td&gt;&lt;td&gt;&lt;span style='color:#E0F2FE;border:1px solid #93C5FD;font-size:12px;padding:0 3px;'&gt;■&lt;/span&gt; PII Business analytics log def&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;&lt;/td&gt;&lt;td style='width:48%;border-left:1px solid #E2E8F0;padding-left:15px;'&gt;&lt;b style='font-size:13px;color:#0F172A;'&gt;KEY DEFINITION&lt;/b&gt;&lt;br&gt;&lt;table style='width:100%;margin-top:8px;font-size:11px;line-height:1.6;'&gt;&lt;tr&gt;&lt;td style='width:35px;color:#334155;font-weight:bold;'&gt;&amp;mdash;&amp;mdash;&lt;/td&gt;&lt;td&gt;Send call with &amp;quot;Automatic Embedding &amp;amp; Retrieve image&amp;quot;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style='color:#10B981;font-weight:bold;'&gt;&amp;mdash;&amp;mdash;&lt;/td&gt;&lt;td&gt;Line reference Image 13 &amp;quot;Evaluated&amp;quot; state logic trigger&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style='color:#059669;font-weight:bold;'&gt;- - - -&lt;/td&gt;&lt;td&gt;Context reference references image 1 &amp;quot;context corpus definition&amp;quot;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style='color:#1E3A8A;font-weight:bold;'&gt;&amp;mdash;&amp;mdash;&lt;/td&gt;&lt;td&gt;Line descriptions, reference Image 12, state machine flow&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="55" y="1352" width="1050" height="155" as="geometry" />
        </mxCell>

        <!-- BOX 2: WHY IT WORKS (RIGHT) -->
        <mxCell id="why_box" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;shadow=0;" vertex="1" parent="1">
          <mxGeometry x="1140" y="1340" width="560" height="180" as="geometry" />
        </mxCell>
        <mxCell id="why_content" value="&lt;b style='font-size:13px;color:#0F172A;'&gt;WHY IT WORKS:&lt;/b&gt;&lt;br&gt;&lt;br&gt;This dynamic sequence diagram makes non-deterministic ReAct loops understandable and executable. Developers get a blueprint showing the precise order, handshakes, timing, security boundaries, and data dependencies—including failure paths, loop triggers, and automatic logging—required to implement complex agentic orchestration logic across all solution types." style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;fontSize=12;fontColor=#334155;lineHeight=1.5;" vertex="1" parent="1">
          <mxGeometry x="1160" y="1355" width="520" height="150" as="geometry" />
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
  `.trim();
}



export function getExactMacroSequenceDiagramReferenceXml(): string {
  return `
<mxfile host="embed.diagrams.net">
  <diagram id="macro_sequence_diagram_compiled" name="COMPLETE END-TO-END DYNAMIC SEQUENCE DIAGRAM">
    <mxGraphModel dx="1920" dy="1450" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1920" pageHeight="1450" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- 1. Global Header Bar -->
        <mxCell id="macro_hdr_title" value="&lt;div style='text-align:center;color:#0F172A;'&gt;&lt;b style='font-size:16px;'&gt;ITACS Integrated Insights Platform - COMPLETE END-TO-END DYNAMIC SEQUENCE DIAGRAM.&lt;/b&gt;&lt;br&gt;&lt;font style='font-size:12px;font-weight:normal;color:#475569;'&gt;Mapping Data Flow, Orchestration, Time, and Governance across Data/AI Solutions.&lt;/font&gt;&lt;/div&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="15" y="15" width="1890" height="55" as="geometry" />
        </mxCell>
        <mxCell id="macro_gcp_logo" value="&lt;b style='color:#4285F4;font-size:18px;'&gt;G&lt;/b&gt;&lt;b style='color:#EA4335;font-size:18px;'&gt;C&lt;/b&gt;&lt;b style='color:#FBBC05;font-size:18px;'&gt;P&lt;/b&gt;" style="text;html=1;whiteSpace=wrap;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="30" y="27" width="40" height="30" as="geometry" />
        </mxCell>

        <!-- Security Boundary Container (Orange dashed) spanning Col 3 to Col 6 from Phase 1 through Phase 3 -->
        <mxCell id="macro_sec_bound" value="&lt;div style='text-align:right;color:#9A3412;'&gt;&lt;b style='font-size:11px;'&gt;SECURE MANAGED GEMINI ENTERPRISE ECOSYSTEM BOUNDARY&lt;/b&gt;&lt;br&gt;&lt;font style='font-size:10px;font-weight:normal;'&gt;Zones 2 &amp;amp; 3 from image 5&lt;/font&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEFCE8;fillOpacity=50;strokeColor=#F97316;strokeWidth=2;dashed=1;verticalAlign=top;align=right;paddingTop=8;paddingRight=12;" vertex="1" parent="1">
          <mxGeometry x="490" y="130" width="980" height="790" as="geometry" />
        </mxCell>

        <!-- ========================================== -->
        <!-- 2. Swimlane 1: PHASE 1 -->
        <!-- ========================================== -->
        <mxCell id="p1_lane" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#CBD5E1;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="185" y="80" width="1720" height="250" as="geometry" />
        </mxCell>
        <mxCell id="p1_tab" value="&lt;b style='font-size:11px;color:#0F172A;'&gt;PHASE 1:&lt;br&gt;DATA INGESTION,&lt;br&gt;FEATURE ENGINEERING &amp;amp;&lt;br&gt;LINEAGE LOGGING&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#E2E8F0;strokeColor=#64748B;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="15" y="80" width="160" height="250" as="geometry" />
        </mxCell>

        <!-- Phase 1 Headers -->
        <mxCell id="p1_h1" value="&lt;span style='font-size:16px;'&gt;👤&lt;/span&gt;&lt;br&gt;&lt;b style='font-size:10px;color:#0F172A;'&gt;Silo Analysts&lt;/b&gt;&lt;br&gt;&lt;font style='font-size:9px;color:#475569;'&gt;Functional Silos&lt;br&gt;e.g., Medical Affairs,&lt;br&gt;Competitive Intel&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#64748B;align=center;" vertex="1" parent="1">
          <mxGeometry x="210" y="95" width="120" height="50" as="geometry" />
        </mxCell>
        <mxCell id="p1_h2" value="&lt;b style='font-size:11px;color:#0F172A;'&gt;Google Workspace&lt;br&gt;Connectors&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#64748B;align=center;" vertex="1" parent="1">
          <mxGeometry x="400" y="95" width="140" height="50" as="geometry" />
        </mxCell>
        <mxCell id="p1_h3" value="&lt;span style='font-size:16px;'&gt;🛢️&lt;/span&gt;&lt;br&gt;&lt;b style='font-size:11px;color:#0369A1;'&gt;GCS Secure Bucket&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#BAE6FD;strokeColor=#0284C7;align=center;" vertex="1" parent="1">
          <mxGeometry x="610" y="95" width="160" height="50" as="geometry" />
        </mxCell>
        <mxCell id="p1_h4" value="&lt;span style='font-size:16px;'&gt;🎈&lt;/span&gt;&lt;br&gt;&lt;b style='font-size:11px;color:#0369A1;'&gt;Airflow&lt;br&gt;Scheduler&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#BAE6FD;strokeColor=#0284C7;align=center;" vertex="1" parent="1">
          <mxGeometry x="830" y="95" width="160" height="50" as="geometry" />
        </mxCell>
        <mxCell id="p1_h5" value="&lt;span style='font-size:16px;'&gt;⚡&lt;/span&gt;&lt;br&gt;&lt;b style='font-size:11px;color:#0369A1;'&gt;dbt Transformation&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#BAE6FD;strokeColor=#0284C7;align=center;" vertex="1" parent="1">
          <mxGeometry x="1050" y="95" width="180" height="50" as="geometry" />
        </mxCell>
        <mxCell id="p1_h6" value="&lt;span style='font-size:16px;'&gt;📊&lt;/span&gt;&lt;br&gt;&lt;b style='font-size:11px;color:#0369A1;'&gt;BigQuery Feature Store&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#BAE6FD;strokeColor=#0284C7;align=center;" vertex="1" parent="1">
          <mxGeometry x="1290" y="95" width="180" height="50" as="geometry" />
        </mxCell>

        <!-- Phase 1 Lifelines -->
        <mxCell id="p1_l1" value="" style="endArrow=none;dashed=1;html=1;strokeWidth=1.5;strokeColor=#64748B;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="270" y="145" as="sourcePoint" /><mxPoint x="270" y="330" as="targetPoint" /></mxGeometry></mxCell>
        <mxCell id="p1_l2" value="" style="endArrow=none;dashed=1;html=1;strokeWidth=1.5;strokeColor=#64748B;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="470" y="145" as="sourcePoint" /><mxPoint x="470" y="330" as="targetPoint" /></mxGeometry></mxCell>
        <mxCell id="p1_l3" value="" style="endArrow=none;dashed=1;html=1;strokeWidth=1.5;strokeColor=#64748B;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="690" y="145" as="sourcePoint" /><mxPoint x="690" y="330" as="targetPoint" /></mxGeometry></mxCell>
        <mxCell id="p1_l4" value="" style="endArrow=none;dashed=1;html=1;strokeWidth=1.5;strokeColor=#64748B;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="910" y="145" as="sourcePoint" /><mxPoint x="910" y="330" as="targetPoint" /></mxGeometry></mxCell>
        <mxCell id="p1_l5" value="" style="endArrow=none;dashed=1;html=1;strokeWidth=1.5;strokeColor=#64748B;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="1140" y="145" as="sourcePoint" /><mxPoint x="1140" y="330" as="targetPoint" /></mxGeometry></mxCell>
        <mxCell id="p1_l6" value="" style="endArrow=none;dashed=1;html=1;strokeWidth=1.5;strokeColor=#64748B;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="1380" y="145" as="sourcePoint" /><mxPoint x="1380" y="330" as="targetPoint" /></mxGeometry></mxCell>

        <!-- Phase 1 Arrows & Nodes -->
        <mxCell id="p1_arr1" value="Analysts upload raw docs (PDFs, PPTs)" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1.5;strokeColor=#475569;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=10;fontColor=#0F172A;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="270" y="180" as="sourcePoint" /><mxPoint x="470" y="180" as="targetPoint" /></mxGeometry></mxCell>
        <mxCell id="p1_arr2" value="Stream data" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1.5;strokeColor=#475569;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=10;fontColor=#0F172A;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="470" y="210" as="sourcePoint" /><mxPoint x="690" y="210" as="targetPoint" /></mxGeometry></mxCell>
        <mxCell id="p1_vpc_enf" value="&lt;span style='font-size:14px;'&gt;🛢️&lt;/span&gt; &lt;b style='font-size:10px;color:#15803D;'&gt;VPC-SC Enforcement&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#16A34A;align=center;" vertex="1" parent="1">
          <mxGeometry x="625" y="230" width="130" height="30" as="geometry" />
        </mxCell>
        <mxCell id="p1_arr3" value="Scheduler trigger" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1.5;strokeColor=#475569;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=10;fontColor=#0F172A;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="910" y="250" as="sourcePoint" /><mxPoint x="1140" y="250" as="targetPoint" /></mxGeometry></mxCell>
        <mxCell id="p1_arr4" value="Executes logic&lt;br&gt;(Clean, Normalize, Aggregate, Encode)" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1.5;strokeColor=#475569;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=10;fontColor=#0F172A;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="1140" y="280" as="sourcePoint" /><mxPoint x="1380" y="280" as="targetPoint" /></mxGeometry></mxCell>
        <mxCell id="p1_arr5" value="Stores model-ready features" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1.5;strokeColor=#475569;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=10;fontColor=#0F172A;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="1380" y="310" as="sourcePoint" /><mxPoint x="1710" y="310" as="targetPoint" /></mxGeometry></mxCell>

        <!-- Phase 1 Far Right -->
        <mxCell id="p1_iam" value="&lt;b style='font-size:10px;color:#9A3412;'&gt;IAM Integration &amp;amp; Data Masking&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFEDD5;strokeColor=#F97316;align=center;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="1710" y="155" width="170" height="35" as="geometry" />
        </mxCell>
        <mxCell id="p1_iam_arr" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=1.5;strokeColor=#F97316;curved=1;endArrow=block;endFill=1;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="1795" y="190" as="sourcePoint" /><mxPoint x="1600" y="240" as="targetPoint" /></mxGeometry></mxCell>
        <mxCell id="p1_meta_arr" value="Pushes metadata (lineage, job status, row counts)" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1.5;strokeColor=#475569;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=10;fontColor=#0F172A;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="1480" y="240" as="sourcePoint" /><mxPoint x="1720" y="240" as="targetPoint" /></mxGeometry></mxCell>
        <mxCell id="p1_audit" value="&lt;span style='font-size:16px;'&gt;📄&lt;/span&gt;&lt;br&gt;&lt;b style='font-size:10px;color:#1E3A8A;'&gt;ETL Audit Log&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#2563EB;align=center;" vertex="1" parent="1">
          <mxGeometry x="1730" y="220" width="120" height="40" as="geometry" />
        </mxCell>

        <!-- ========================================== -->
        <!-- 3. Swimlane 2: PHASE 2 -->
        <!-- ========================================== -->
        <mxCell id="p2_lane" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#CBD5E1;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="185" y="340" width="1720" height="250" as="geometry" />
        </mxCell>
        <mxCell id="p2_tab" value="&lt;b style='font-size:11px;color:#0F172A;'&gt;PHASE 2:&lt;br&gt;MLOps LIFECYCLE:&lt;br&gt;MODEL TRAINING,&lt;br&gt;EVALUATION, APPROVAL,&lt;br&gt;DEPLOYMENT &amp;amp; MONITORING&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#E2E8F0;strokeColor=#64748B;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="15" y="340" width="160" height="250" as="geometry" />
        </mxCell>

        <!-- Phase 2 Headers -->
        <mxCell id="p2_h1" value="&lt;span style='font-size:14px;'&gt;👤&lt;/span&gt; &lt;b style='font-size:11px;color:#0F172A;'&gt;ML Engineer&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#64748B;align=center;" vertex="1" parent="1">
          <mxGeometry x="210" y="355" width="120" height="45" as="geometry" />
        </mxCell>
        <mxCell id="p2_h2" value="&lt;span style='font-size:14px;'&gt;🎈&lt;/span&gt; &lt;b style='font-size:11px;color:#0369A1;'&gt;Airflow Scheduler&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#BAE6FD;strokeColor=#0284C7;align=center;" vertex="1" parent="1">
          <mxGeometry x="400" y="355" width="140" height="45" as="geometry" />
        </mxCell>
        <mxCell id="p2_h3" value="&lt;span style='font-size:14px;'&gt;🧠&lt;/span&gt; &lt;b style='font-size:11px;color:#0369A1;'&gt;Model Training (Vertex AI)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#BAE6FD;strokeColor=#0284C7;align=center;" vertex="1" parent="1">
          <mxGeometry x="610" y="355" width="160" height="45" as="geometry" />
        </mxCell>
        <mxCell id="p2_h4" value="&lt;span style='font-size:14px;'&gt;📦&lt;/span&gt; &lt;b style='font-size:11px;color:#0369A1;'&gt;Model Registry&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#BAE6FD;strokeColor=#0284C7;align=center;" vertex="1" parent="1">
          <mxGeometry x="830" y="355" width="160" height="45" as="geometry" />
        </mxCell>
        <mxCell id="p2_h5" value="&lt;span style='font-size:14px;'&gt;⚖️&lt;/span&gt; &lt;b style='font-size:10px;color:#9A3412;'&gt;Governance Board&lt;br&gt;(Human-in-the-Loop)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFEDD5;strokeColor=#F97316;align=center;" vertex="1" parent="1">
          <mxGeometry x="1050" y="355" width="180" height="45" as="geometry" />
        </mxCell>
        <mxCell id="p2_h6" value="&lt;span style='font-size:14px;'&gt;☸️&lt;/span&gt; &lt;b style='font-size:11px;color:#0369A1;'&gt;GKE Inference Endpoint&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#BAE6FD;strokeColor=#0284C7;align=center;" vertex="1" parent="1">
          <mxGeometry x="1290" y="355" width="180" height="45" as="geometry" />
        </mxCell>
        <mxCell id="p2_h7" value="&lt;span style='font-size:14px;'&gt;📈&lt;/span&gt; &lt;b style='font-size:11px;color:#15803D;'&gt;Monitoring&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#16A34A;align=center;" vertex="1" parent="1">
          <mxGeometry x="1510" y="355" width="160" height="45" as="geometry" />
        </mxCell>

        <!-- Phase 2 Lifelines -->
        <mxCell id="p2_l1" value="" style="endArrow=none;dashed=1;html=1;strokeWidth=1.5;strokeColor=#64748B;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="270" y="400" as="sourcePoint" /><mxPoint x="270" y="590" as="targetPoint" /></mxGeometry></mxCell>
        <mxCell id="p2_l2" value="" style="endArrow=none;dashed=1;html=1;strokeWidth=1.5;strokeColor=#64748B;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="470" y="400" as="sourcePoint" /><mxPoint x="470" y="590" as="targetPoint" /></mxGeometry></mxCell>
        <mxCell id="p2_l3" value="" style="endArrow=none;dashed=1;html=1;strokeWidth=1.5;strokeColor=#64748B;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="690" y="400" as="sourcePoint" /><mxPoint x="690" y="590" as="targetPoint" /></mxGeometry></mxCell>
        <mxCell id="p2_l4" value="" style="endArrow=none;dashed=1;html=1;strokeWidth=1.5;strokeColor=#64748B;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="910" y="400" as="sourcePoint" /><mxPoint x="910" y="590" as="targetPoint" /></mxGeometry></mxCell>
        <mxCell id="p2_l5" value="" style="endArrow=none;dashed=1;html=1;strokeWidth=1.5;strokeColor=#64748B;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="1140" y="400" as="sourcePoint" /><mxPoint x="1140" y="590" as="targetPoint" /></mxGeometry></mxCell>
        <mxCell id="p2_l6" value="" style="endArrow=none;dashed=1;html=1;strokeWidth=1.5;strokeColor=#64748B;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="1380" y="400" as="sourcePoint" /><mxPoint x="1380" y="590" as="targetPoint" /></mxGeometry></mxCell>
        <mxCell id="p2_l7" value="" style="endArrow=none;dashed=1;html=1;strokeWidth=1.5;strokeColor=#64748B;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="1590" y="400" as="sourcePoint" /><mxPoint x="1590" y="590" as="targetPoint" /></mxGeometry></mxCell>

        <!-- Phase 2 Arrows -->
        <mxCell id="p2_arr1" value="Initiates training" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1.5;strokeColor=#475569;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=10;fontColor=#0F172A;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="270" y="420" as="sourcePoint" /><mxPoint x="470" y="420" as="targetPoint" /></mxGeometry></mxCell>
        <mxCell id="p2_arr2" value="Pulls features from BigQuery" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1.5;strokeColor=#475569;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=10;fontColor=#0F172A;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="470" y="450" as="sourcePoint" /><mxPoint x="690" y="450" as="targetPoint" /></mxGeometry></mxCell>
        <mxCell id="p2_arr3" value="Executes training, generates Metrics" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1.5;strokeColor=#475569;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=10;fontColor=#0F172A;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="690" y="480" as="sourcePoint" /><mxPoint x="910" y="480" as="targetPoint" /></mxGeometry></mxCell>
        <mxCell id="p2_arr4" value="(Status: 'EVALUATED')&lt;br&gt;Provides Human-in-the-Loop Approval" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1.5;strokeColor=#475569;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=10;fontColor=#0F172A;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="910" y="515" as="sourcePoint" /><mxPoint x="1140" y="515" as="targetPoint" /></mxGeometry></mxCell>
        <mxCell id="p2_arr5" value="Deployment Pipeline pulls model&lt;br&gt;(Status: 'APPROVED')" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1.5;strokeColor=#475569;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=10;fontColor=#0F172A;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="1140" y="550" as="sourcePoint" /><mxPoint x="1380" y="550" as="targetPoint" /></mxGeometry></mxCell>
        <mxCell id="p2_arr6" value="Logs inference and drift" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1.5;strokeColor=#475569;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=10;fontColor=#0F172A;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="1380" y="575" as="sourcePoint" /><mxPoint x="1590" y="575" as="targetPoint" /></mxGeometry></mxCell>
        <mxCell id="p2_arr7" value="Pushes logs to" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1.5;strokeColor=#475569;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=10;fontColor=#0F172A;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="1590" y="575" as="sourcePoint" /><mxPoint x="1750" y="575" as="targetPoint" /></mxGeometry></mxCell>
        <mxCell id="p2_inf_log" value="&lt;span style='font-size:16px;'&gt;🛢️&lt;/span&gt;&lt;br&gt;&lt;b style='font-size:10px;color:#15803D;'&gt;ML Inference Log&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#16A34A;align=center;" vertex="1" parent="1">
          <mxGeometry x="1755" y="555" width="130" height="40" as="geometry" />
        </mxCell>

        <!-- ========================================== -->
        <!-- 4. Swimlane 3: PHASE 3 -->
        <!-- ========================================== -->
        <mxCell id="p3_lane" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#CBD5E1;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="185" y="600" width="1720" height="320" as="geometry" />
        </mxCell>
        <mxCell id="p3_tab" value="&lt;b style='font-size:11px;color:#0F172A;'&gt;PHASE 3:&lt;br&gt;GENAI / AGENTIC&lt;br&gt;RAG ORCHESTRATION &amp;amp;&lt;br&gt;ANALYTICS TOOLING&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#E2E8F0;strokeColor=#64748B;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="15" y="600" width="160" height="320" as="geometry" />
        </mxCell>

        <!-- Phase 3 Headers -->
        <mxCell id="p3_h1" value="&lt;span style='font-size:14px;'&gt;👤&lt;/span&gt; &lt;b style='font-size:10px;color:#0F172A;'&gt;Oncology Analyst (User)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#64748B;align=center;" vertex="1" parent="1">
          <mxGeometry x="210" y="615" width="120" height="45" as="geometry" />
        </mxCell>
        <mxCell id="p3_h2" value="&lt;span style='font-size:14px;'&gt;🖥️&lt;/span&gt; &lt;b style='font-size:11px;color:#0369A1;'&gt;User Interface&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#BAE6FD;strokeColor=#0284C7;align=center;" vertex="1" parent="1">
          <mxGeometry x="400" y="615" width="140" height="45" as="geometry" />
        </mxCell>
        <mxCell id="p3_h3" value="&lt;span style='font-size:14px;'&gt;⚙️&lt;/span&gt; &lt;b style='font-size:10px;color:#0369A1;'&gt;Agent Orchestrator (Vertex AI)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#BAE6FD;strokeColor=#0284C7;align=center;" vertex="1" parent="1">
          <mxGeometry x="610" y="615" width="160" height="45" as="geometry" />
        </mxCell>
        <mxCell id="p3_mem_h" value="&lt;span style='font-size:14px;'&gt;📁&lt;/span&gt; &lt;b style='font-size:9px;color:#0F172A;'&gt;Conversation Memory&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#64748B;align=center;" vertex="1" parent="1">
          <mxGeometry x="800" y="620" width="120" height="35" as="geometry" />
        </mxCell>
        <mxCell id="p3_h5" value="&lt;span style='font-size:14px;'&gt;🧠&lt;/span&gt; &lt;b style='font-size:11px;color:#0369A1;'&gt;Gemini LLM (Reasoner)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#BAE6FD;strokeColor=#0284C7;align=center;" vertex="1" parent="1">
          <mxGeometry x="1050" y="615" width="180" height="45" as="geometry" />
        </mxCell>
        <mxCell id="p3_h6" value="&lt;span style='font-size:14px;'&gt;🔍&lt;/span&gt; &lt;b style='font-size:10px;color:#0369A1;'&gt;RAG Tool (Vertex AI Search &amp;amp; Conversation)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#BAE6FD;strokeColor=#0284C7;align=center;" vertex="1" parent="1">
          <mxGeometry x="1290" y="615" width="180" height="45" as="geometry" />
        </mxCell>
        <mxCell id="p3_h7" value="&lt;span style='font-size:14px;'&gt;📊&lt;/span&gt; &lt;b style='font-size:11px;color:#0369A1;'&gt;BigQuery (Analytics)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#BAE6FD;strokeColor=#0284C7;align=center;" vertex="1" parent="1">
          <mxGeometry x="1510" y="615" width="160" height="45" as="geometry" />
        </mxCell>

        <!-- Phase 3 Lifelines -->
        <mxCell id="p3_l1" value="" style="endArrow=none;dashed=1;html=1;strokeWidth=1.5;strokeColor=#64748B;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="270" y="660" as="sourcePoint" /><mxPoint x="270" y="920" as="targetPoint" /></mxGeometry></mxCell>
        <mxCell id="p3_l2" value="" style="endArrow=none;dashed=1;html=1;strokeWidth=1.5;strokeColor=#64748B;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="470" y="660" as="sourcePoint" /><mxPoint x="470" y="920" as="targetPoint" /></mxGeometry></mxCell>
        <mxCell id="p3_l3" value="" style="endArrow=none;dashed=1;html=1;strokeWidth=1.5;strokeColor=#64748B;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="690" y="660" as="sourcePoint" /><mxPoint x="690" y="920" as="targetPoint" /></mxGeometry></mxCell>
        <mxCell id="p3_lmem" value="" style="endArrow=none;dashed=1;html=1;strokeWidth=1.5;strokeColor=#64748B;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="860" y="655" as="sourcePoint" /><mxPoint x="860" y="920" as="targetPoint" /></mxGeometry></mxCell>
        <mxCell id="p3_l5" value="" style="endArrow=none;dashed=1;html=1;strokeWidth=1.5;strokeColor=#64748B;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="1140" y="660" as="sourcePoint" /><mxPoint x="1140" y="920" as="targetPoint" /></mxGeometry></mxCell>
        <mxCell id="p3_l6" value="" style="endArrow=none;dashed=1;html=1;strokeWidth=1.5;strokeColor=#64748B;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="1380" y="660" as="sourcePoint" /><mxPoint x="1380" y="920" as="targetPoint" /></mxGeometry></mxCell>
        <mxCell id="p3_l7" value="" style="endArrow=none;dashed=1;html=1;strokeWidth=1.5;strokeColor=#64748B;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="1590" y="660" as="sourcePoint" /><mxPoint x="1590" y="920" as="targetPoint" /></mxGeometry></mxCell>

        <!-- Phase 3 Arrows & Action Box -->
        <mxCell id="p3_arr1" value="Enters multi-silo prompt in UI" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1.5;strokeColor=#475569;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=10;fontColor=#0F172A;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="270" y="670" as="sourcePoint" /><mxPoint x="470" y="670" as="targetPoint" /></mxGeometry></mxCell>
        <mxCell id="p3_arr2" value="Sends prompt" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1.5;strokeColor=#475569;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=10;fontColor=#0F172A;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="470" y="700" as="sourcePoint" /><mxPoint x="690" y="700" as="targetPoint" /></mxGeometry></mxCell>
        <mxCell id="p3_self" value="Checks Persona and Memory" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1.5;strokeColor=#475569;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=10;fontColor=#0F172A;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="690" y="715" as="sourcePoint" /><mxPoint x="690" y="735" as="targetPoint" /><Array as="points"><mxPoint x="740" y="715" /><mxPoint x="740" y="735" /></Array></mxGeometry></mxCell>
        <mxCell id="p3_iam" value="&lt;b style='font-size:10px;color:#9A3412;'&gt;IAM Integration &amp;amp; Data Masking&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFEDD5;strokeColor=#F97316;align=center;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="550" y="750" width="170" height="35" as="geometry" />
        </mxCell>
        <mxCell id="p3_iam_arr" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=1.5;strokeColor=#F97316;curved=1;endArrow=block;endFill=1;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="635" y="750" as="sourcePoint" /><mxPoint x="715" y="725" as="targetPoint" /></mxGeometry></mxCell>
        <mxCell id="p3_arr3" value="Sends prompt to Gemini LLM (LLm)" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1.5;strokeColor=#475569;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=10;fontColor=#0F172A;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="690" y="740" as="sourcePoint" /><mxPoint x="1140" y="740" as="targetPoint" /></mxGeometry></mxCell>

        <!-- Gemini ReAct Box -->
        <mxCell id="p3_react" value="&lt;b style='font-size:11px;color:#0F172A;'&gt;Gemi Reasoner executes ReAct Loop&lt;/b&gt;&lt;br&gt;&lt;font style='font-size:10px;color:#334155;'&gt;Thought: Need multi-silo context Sothesit&lt;br&gt;Action: Call RAG Tool (Vertex AI Search &amp;amp; Conversation)- Synthesis&lt;br&gt;Action: Call BigQuery Analytics, execute SQL&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#94A3B8;align=left;padding=6;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="960" y="755" width="360" height="75" as="geometry" />
        </mxCell>
        <mxCell id="p3_arr4" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1.5;strokeColor=#475569;endArrow=block;endFill=1;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="1320" y="780" as="sourcePoint" /><mxPoint x="1380" y="780" as="targetPoint" /></mxGeometry></mxCell>
        <mxCell id="p3_rag_txt" value="&lt;b style='font-size:9px;color:#0F172A;'&gt;RAG Tool searches secured GCS Data Corpus, returns context chunks, logs context in Context Corpus&lt;/b&gt;" style="text;whiteSpace=wrap;html=1;align=center;" vertex="1" parent="1">
          <mxGeometry x="1250" y="795" width="220" height="35" as="geometry" />
        </mxCell>
        <mxCell id="p3_arr5" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1.5;strokeColor=#475569;endArrow=block;endFill=1;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="1320" y="810" as="sourcePoint" /><mxPoint x="1590" y="810" as="targetPoint" /></mxGeometry></mxCell>
        <mxCell id="p3_bq_txt" value="&lt;b style='font-size:9px;color:#0F172A;'&gt;BigQuery fetches data, returns results Logs query in Business Analytics tool&lt;/b&gt;" style="text;whiteSpace=wrap;html=1;align=center;" vertex="1" parent="1">
          <mxGeometry x="1480" y="820" width="220" height="35" as="geometry" />
        </mxCell>
        <mxCell id="p3_arr6" value="Agent executes Thought: Need sales data" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1.5;strokeColor=#475569;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=10;fontColor=#0F172A;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="1140" y="845" as="sourcePoint" /><mxPoint x="690" y="845" as="targetPoint" /></mxGeometry></mxCell>
        <mxCell id="p3_arr7" value="Agent executes Thought: Snythesize report" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1.5;strokeColor=#475569;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=10;fontColor=#0F172A;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="1140" y="870" as="sourcePoint" /><mxPoint x="690" y="870" as="targetPoint" /></mxGeometry></mxCell>
        <mxCell id="p3_arr8" value="Pushes final report to interface" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1.5;strokeColor=#475569;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=10;fontColor=#0F172A;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="690" y="895" as="sourcePoint" /><mxPoint x="470" y="895" as="targetPoint" /></mxGeometry></mxCell>
        <mxCell id="p3_arr9" value="Updates Conversation Memory, logs interaction" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1.5;strokeColor=#475569;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=10;fontColor=#0F172A;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="690" y="905" as="sourcePoint" /><mxPoint x="860" y="905" as="targetPoint" /></mxGeometry></mxCell>
        <mxCell id="p3_conv_log" value="&lt;span style='font-size:16px;'&gt;📄&lt;/span&gt; &lt;b style='font-size:10px;color:#0F172A;'&gt;Conversation Log&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#64748B;align=center;" vertex="1" parent="1">
          <mxGeometry x="800" y="880" width="120" height="35" as="geometry" />
        </mxCell>
        <mxCell id="p3_vpc" value="&lt;b style='font-size:10px;color:#9A3412;'&gt;VPC Service Controls Enforcement&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFEDD5;strokeColor=#F97316;align=center;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="1730" y="770" width="160" height="45" as="geometry" />
        </mxCell>

        <!-- ========================================== -->
        <!-- 5. Swimlane 4: PHASE 4 -->
        <!-- ========================================== -->
        <mxCell id="p4_lane" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEFCE8;strokeColor=#CBD5E1;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="185" y="930" width="1720" height="250" as="geometry" />
        </mxCell>
        <mxCell id="p4_tab" value="&lt;b style='font-size:11px;color:#0F172A;'&gt;PHASE 4:&lt;br&gt;PROTOTYPE&lt;br&gt;DELIVERY &amp;amp;&lt;br&gt;LOGGING&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#E2E8F0;strokeColor=#64748B;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="15" y="930" width="160" height="250" as="geometry" />
        </mxCell>

        <!-- Phase 4 Headers -->
        <mxCell id="p4_h1" value="&lt;span style='font-size:14px;'&gt;👤&lt;/span&gt; &lt;b style='font-size:10px;color:#0F172A;'&gt;Oncology Analyst (User)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#64748B;align=center;" vertex="1" parent="1">
          <mxGeometry x="100" y="945" width="120" height="45" as="geometry" />
        </mxCell>
        <mxCell id="p4_h2" value="&lt;span style='font-size:14px;'&gt;🖥️&lt;/span&gt; &lt;b style='font-size:11px;color:#0369A1;'&gt;User Interface&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#BAE6FD;strokeColor=#0284C7;align=center;" vertex="1" parent="1">
          <mxGeometry x="300" y="945" width="140" height="45" as="geometry" />
        </mxCell>
        <mxCell id="p4_h3" value="&lt;span style='font-size:14px;'&gt;⚙️&lt;/span&gt; &lt;b style='font-size:10px;color:#0369A1;'&gt;Agent Orchestrator (Vertex AI)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#BAE6FD;strokeColor=#0284C7;align=center;" vertex="1" parent="1">
          <mxGeometry x="520" y="945" width="160" height="45" as="geometry" />
        </mxCell>
        <mxCell id="p4_h4" value="&lt;span style='font-size:14px;'&gt;🎨&lt;/span&gt; &lt;b style='font-size:11px;color:#0369A1;'&gt;Deck Studio API&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#BAE6FD;strokeColor=#0284C7;align=center;" vertex="1" parent="1">
          <mxGeometry x="760" y="945" width="160" height="45" as="geometry" />
        </mxCell>
        <mxCell id="p4_h5" value="&lt;span style='font-size:14px;'&gt;📡&lt;/span&gt; &lt;b style='font-size:11px;color:#0369A1;'&gt;Global Market Radar API&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#BAE6FD;strokeColor=#0284C7;align=center;" vertex="1" parent="1">
          <mxGeometry x="1000" y="945" width="180" height="45" as="geometry" />
        </mxCell>
        <mxCell id="p4_h6" value="&lt;b style='font-size:11px;color:#9A3412;'&gt;Delivery image 3)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFEDD5;strokeColor=#F97316;align=center;" vertex="1" parent="1">
          <mxGeometry x="1260" y="945" width="180" height="45" as="geometry" />
        </mxCell>

        <!-- Phase 4 Lifelines -->
        <mxCell id="p4_l1" value="" style="endArrow=none;dashed=1;html=1;strokeWidth=1.5;strokeColor=#64748B;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="160" y="990" as="sourcePoint" /><mxPoint x="160" y="1180" as="targetPoint" /></mxGeometry></mxCell>
        <mxCell id="p4_l2" value="" style="endArrow=none;dashed=1;html=1;strokeWidth=1.5;strokeColor=#64748B;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="370" y="990" as="sourcePoint" /><mxPoint x="370" y="1180" as="targetPoint" /></mxGeometry></mxCell>
        <mxCell id="p4_l3" value="" style="endArrow=none;dashed=1;html=1;strokeWidth=1.5;strokeColor=#64748B;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="600" y="990" as="sourcePoint" /><mxPoint x="600" y="1180" as="targetPoint" /></mxGeometry></mxCell>
        <mxCell id="p4_l4" value="" style="endArrow=none;dashed=1;html=1;strokeWidth=1.5;strokeColor=#64748B;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="840" y="990" as="sourcePoint" /><mxPoint x="840" y="1180" as="targetPoint" /></mxGeometry></mxCell>
        <mxCell id="p4_l5" value="" style="endArrow=none;dashed=1;html=1;strokeWidth=1.5;strokeColor=#64748B;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="1090" y="990" as="sourcePoint" /><mxPoint x="1090" y="1180" as="targetPoint" /></mxGeometry></mxCell>
        <mxCell id="p4_l6" value="" style="endArrow=none;dashed=1;html=1;strokeWidth=1.5;strokeColor=#64748B;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="1350" y="990" as="sourcePoint" /><mxPoint x="1350" y="1180" as="targetPoint" /></mxGeometry></mxCell>

        <!-- Phase 4 Arrows -->
        <mxCell id="p4_arr1" value="requests requests PPT deck" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1.5;strokeColor=#475569;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=10;fontColor=#0F172A;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="160" y="1015" as="sourcePoint" /><mxPoint x="370" y="1015" as="targetPoint" /></mxGeometry></mxCell>
        <mxCell id="p4_arr2" value="Requests request" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1.5;strokeColor=#475569;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=10;fontColor=#0F172A;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="370" y="1045" as="sourcePoint" /><mxPoint x="600" y="1045" as="targetPoint" /></mxGeometry></mxCell>
        <mxCell id="p4_arr3" value="Orchestrator calls Deck Studio API with synthesized report and request" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1.5;strokeColor=#475569;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=10;fontColor=#0F172A;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="600" y="1075" as="sourcePoint" /><mxPoint x="840" y="1075" as="targetPoint" /></mxGeometry></mxCell>
        <mxCell id="p4_arr4" value="Generates PPT deck, to interface" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1.5;strokeColor=#475569;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=10;fontColor=#0F172A;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="840" y="1105" as="sourcePoint" /><mxPoint x="370" y="1105" as="targetPoint" /></mxGeometry></mxCell>
        <mxCell id="p4_arr5" value="Orchestrator calls Global Market Radar API, generates interactive visualization, pushes to interface" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1.5;strokeColor=#475569;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=10;fontColor=#0F172A;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="600" y="1140" as="sourcePoint" /><mxPoint x="1090" y="1140" as="targetPoint" /></mxGeometry></mxCell>
        <mxCell id="p4_self" value="Logs actions" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1.5;strokeColor=#475569;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=10;fontColor=#0F172A;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="600" y="1155" as="sourcePoint" /><mxPoint x="600" y="1170" as="targetPoint" /><Array as="points"><mxPoint x="650" y="1155" /><mxPoint x="650" y="1170" /></Array></mxGeometry></mxCell>

        <!-- ========================================== -->
        <!-- 6. Bottom Footer Region -->
        <!-- ========================================== -->
        <mxCell id="foot_leg" value="&lt;table style='width:100%;font-family:Helvetica;font-size:10px;color:#0F172A;border-collapse:collapse;'&gt;&lt;tr&gt;&lt;td colspan='3' style='font-weight:bold;font-size:12px;padding-bottom:6px;'&gt;Legend&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;&lt;span style='color:#3B82F6;font-size:14px;'&gt;■&lt;/span&gt; Managed Compute&lt;/td&gt;&lt;td&gt;&lt;span style='color:#BAE6FD;font-size:14px;'&gt;■&lt;/span&gt; Managed Compute&lt;/td&gt;&lt;td&gt;&lt;b&gt;&amp;mdash;&lt;/b&gt; Line types&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;&lt;span style='color:#10B981;font-size:14px;'&gt;■&lt;/span&gt; Storage&lt;/td&gt;&lt;td&gt;&lt;span style='color:#DCFCE7;font-size:14px;'&gt;■&lt;/span&gt; Storage&lt;/td&gt;&lt;td&gt;&lt;b&gt;- - -&lt;/b&gt; VPC Service Cnfoeement&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;&lt;span style='color:#F59E0B;font-size:14px;'&gt;■&lt;/span&gt; Secure boundary&lt;/td&gt;&lt;td&gt;&lt;span style='color:#F97316;font-weight:bold;'&gt;&amp;mdash;&lt;/span&gt; Line description&lt;/td&gt;&lt;td&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.5;verticalAlign=top;padding=8;" vertex="1" parent="1">
          <mxGeometry x="15" y="1195" width="420" height="135" as="geometry" />
        </mxCell>
        <mxCell id="foot_key" value="&lt;div style='font-family:Helvetica;font-size:10px;color:#0F172A;line-height:1.6;'&gt;&lt;b style='font-size:12px;'&gt;Key&lt;/b&gt;&lt;br&gt;&lt;b&gt;Definiens:&lt;/b&gt; Need multi context&lt;br&gt;&lt;b&gt;Actioun:&lt;/b&gt; Personas and Memory&lt;br&gt;&lt;b&gt;Action:&lt;/b&gt; Call Cetears report&lt;br&gt;&lt;b&gt;Key osse:&lt;/b&gt; Betcher sesolu, execute SQL&lt;br&gt;&lt;b&gt;Deriquery:&lt;/b&gt; Business Analytics Analytics tool&lt;/div&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.5;verticalAlign=top;padding=8;" vertex="1" parent="1">
          <mxGeometry x="450" y="1195" width="380" height="135" as="geometry" />
        </mxCell>
        <mxCell id="foot_line" value="&lt;div style='font-family:Helvetica;font-size:10px;color:#0F172A;line-height:1.6;'&gt;&lt;b style='font-size:12px;'&gt;Line&lt;/b&gt;&lt;br&gt;&lt;b&gt;&amp;mdash;&lt;/b&gt; Bequest, requests, PPT deck&lt;br&gt;&lt;b&gt;&amp;mdash;&lt;/b&gt; Reguectaquest PPT necaes &amp;amp; request&lt;br&gt;&lt;b&gt;&amp;mdash;&lt;/b&gt; Generates tnocust APL generates interactive visualization&lt;br&gt;&lt;b&gt;&amp;mdash;&lt;/b&gt; Generates interactive visualisaiton, log interlace&lt;br&gt;&lt;b&gt;- - -&lt;/b&gt; Logs any logs actions&lt;/div&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.5;verticalAlign=top;padding=8;" vertex="1" parent="1">
          <mxGeometry x="845" y="1195" width="390" height="135" as="geometry" />
        </mxCell>
        <mxCell id="foot_val" value="&lt;div style='font-family:Helvetica;font-size:11px;color:#334155;line-height:1.6;padding:4px;'&gt;&lt;b style='color:#0F172A;'&gt;WHY IT WORKS:&lt;/b&gt; This unified sequence maps data movement, logical orchestration, human governance, and security across all solution types, providing a shareable map for Data Eng, ML Eng, GenAI Eng, and Analysts to execute without compromise.&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.5;verticalAlign=top;padding=8;" vertex="1" parent="1">
          <mxGeometry x="1250" y="1195" width="655" height="135" as="geometry" />
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
  `.trim();
}


export function getExactDataAiPipelineReferenceXml(): string {
  return `
<mxfile host="embed.diagrams.net">
  <diagram id="data_ai_pipeline_compiled" name="Combining Data Flow (DFD), MLOps Lifecycle, and Feature Engineering">
    <mxGraphModel dx="1850" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1850" pageHeight="950" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- Top Header & Cloud Tenant Container (Sharp rounded=0) -->
        <mxCell id="gcp_tenant" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#94A3B8;strokeWidth=2;strokeDashArray=6 6;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="20" y="40" width="1810" height="880" as="geometry" />
        </mxCell>

        <mxCell id="main_title" value="&lt;font style='font-size: 22px; font-weight: bold; color: #0F172A;'&gt;Combining Data Flow (DFD), MLOps Lifecycle, and Feature Engineering&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="350" y="10" width="1150" height="35" as="geometry" />
        </mxCell>

        <mxCell id="gcp_logo_text" value="&lt;b style='color:#4285F4;font-size:18px;'&gt;G&lt;/b&gt;&lt;b style='color:#EA4335;font-size:18px;'&gt;C&lt;/b&gt;&lt;b style='color:#FBBC05;font-size:18px;'&gt;P&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="45" y="52" width="60" height="25" as="geometry" />
        </mxCell>
        <mxCell id="tenant_subtitle" value="&lt;b style='font-size:15px;color:#334155;'&gt;ITACS SECURE GOVERNED CLOUD TENANT (Managed Services)&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="500" y="52" width="850" height="25" as="geometry" />
        </mxCell>

        <!-- Phase Timeline Arrow & Labels -->
        <mxCell id="timeline_arrow" value="" style="endArrow=block;endFill=1;strokeColor=#64748B;strokeWidth=2.5;html=1;" edge="1" parent="1">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="60" y="145" as="sourcePoint" />
            <mxPoint x="1790" y="145" as="targetPoint" />
          </mxGeometry>
        </mxCell>

        <!-- Timeline Dividers -->
        <mxCell id="div_1" value="" style="endArrow=none;strokeColor=#64748B;strokeWidth=2;html=1;" edge="1" parent="1">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="620" y="135" as="sourcePoint" />
            <mxPoint x="620" y="155" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="div_2" value="" style="endArrow=none;strokeColor=#64748B;strokeWidth=2;html=1;" edge="1" parent="1">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="1220" y="135" as="sourcePoint" />
            <mxPoint x="1220" y="155" as="targetPoint" />
          </mxGeometry>
        </mxCell>

        <!-- 10 Verbatim Phase Labels -->
        <mxCell id="ph_1" value="&lt;font style='font-size:12px;color:#334155;'&gt;Standard&lt;br&gt;Operations&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=bottom;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="40" y="85" width="110" height="50" as="geometry" />
        </mxCell>
        <mxCell id="ph_2" value="&lt;font style='font-size:11px;color:#334155;'&gt;Data Ingestion&lt;br&gt;(via Google Workspace /&lt;br&gt;Enterprise Connectors)&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=bottom;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="170" y="85" width="160" height="50" as="geometry" />
        </mxCell>
        <mxCell id="ph_3" value="&lt;font style='font-size:12px;color:#334155;'&gt;Combinize&lt;br&gt;Feature Engineering&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=bottom;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="345" y="85" width="145" height="50" as="geometry" />
        </mxCell>
        <mxCell id="ph_4" value="&lt;font style='font-size:12px;color:#334155;'&gt;Normalize&lt;br&gt;Transformtsaiton&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=bottom;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="505" y="85" width="145" height="50" as="geometry" />
        </mxCell>
        <mxCell id="ph_5" value="&lt;font style='font-size:12px;color:#334155;'&gt;Encode&lt;br&gt;Processing&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=bottom;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="665" y="85" width="120" height="50" as="geometry" />
        </mxCell>
        <mxCell id="ph_6" value="&lt;font style='font-size:12px;color:#334155;'&gt;Derived&lt;br&gt;Formas&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=bottom;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="800" y="85" width="120" height="50" as="geometry" />
        </mxCell>
        <mxCell id="ph_7" value="&lt;font style='font-size:12px;color:#334155;'&gt;Transformation&lt;br&gt;Transformation&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=bottom;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="935" y="85" width="140" height="50" as="geometry" />
        </mxCell>
        <mxCell id="ph_8" value="&lt;font style='font-size:12px;color:#334155;'&gt;ML Model&lt;br&gt;Transformation&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=bottom;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="1090" y="85" width="140" height="50" as="geometry" />
        </mxCell>
        <mxCell id="ph_9" value="&lt;font style='font-size:12px;color:#334155;'&gt;Specific&lt;br&gt;Operations&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=bottom;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="1245" y="85" width="120" height="50" as="geometry" />
        </mxCell>
        <mxCell id="ph_10" value="&lt;font style='font-size:12px;color:#334155;'&gt;Monitoring &amp;amp;&lt;br&gt;Alerting&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=bottom;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="1380" y="85" width="130" height="50" as="geometry" />
        </mxCell>

        <!-- Section 1 Header & Light Orange Dashed Container (Starts AFTER Raw Data Sources!) -->
        <mxCell id="sec_dfd_header" value="&lt;font color='#0F172A' style='font-size: 18px;'&gt;&lt;b&gt;DATA INGESTION (DFD)&lt;/b&gt;&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="195" y="170" width="410" height="30" as="geometry" />
        </mxCell>
        <mxCell id="sec_dfd" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFF7ED;strokeColor=#F97316;strokeWidth=2;strokeDashArray=6 6;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="185" y="210" width="430" height="520" as="geometry" />
        </mxCell>
        <mxCell id="dfd_lbl_bot" value="&lt;font color='#9A3412' style='font-size: 14px;'&gt;&lt;b&gt;GCS (Secure Managed Environment)&lt;/b&gt;&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="195" y="705" width="410" height="25" as="geometry" />
        </mxCell>

        <!-- Section 2 Header & Container -->
        <mxCell id="sec_fe_header" value="&lt;font color='#0F172A' style='font-size: 18px;'&gt;&lt;b&gt;FEATURE ENGINEERING FLOW&lt;/b&gt;&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="635" y="170" width="570" height="30" as="geometry" />
        </mxCell>
        <mxCell id="sec_fe" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFF7ED;strokeColor=#F97316;strokeWidth=2;strokeDashArray=6 6;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="635" y="210" width="570" height="520" as="geometry" />
        </mxCell>
        <mxCell id="fe_lbl_bot" value="&lt;font color='#9A3412' style='font-size: 14px;'&gt;&lt;b&gt;Security Boundary&lt;/b&gt;&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="650" y="705" width="540" height="25" as="geometry" />
        </mxCell>

        <!-- Section 3 Header & Container -->
        <mxCell id="sec_mlops_header" value="&lt;font color='#0F172A' style='font-size: 18px;'&gt;&lt;b&gt;MLOPS LIFECYCLE (Training &amp;amp; Serving)&lt;/b&gt;&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="1225" y="170" width="585" height="30" as="geometry" />
        </mxCell>
        <mxCell id="sec_mlops" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFF7ED;strokeColor=#F97316;strokeWidth=2;strokeDashArray=6 6;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="1225" y="210" width="585" height="520" as="geometry" />
        </mxCell>
        <mxCell id="mlops_lbl_bot" value="&lt;font color='#9A3412' style='font-size: 14px;'&gt;&lt;b&gt;Security Boundary&lt;/b&gt;&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="1245" y="705" width="545" height="25" as="geometry" />
        </mxCell>

        <!-- SECTION 1 NODES: Raw Sources OUTSIDE orange box on far left! -->
        <mxCell id="raw_sources_box" value="&lt;b style='font-size:15px;color:#0F172A;'&gt;Raw Data&lt;br&gt;Sources&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=2;strokeDashArray=4 4;fontFamily=Helvetica;verticalAlign=top;paddingTop=15;" vertex="1" parent="1">
          <mxGeometry x="35" y="225" width="135" height="480" as="geometry" />
        </mxCell>
        <mxCell id="raw_postgres" value="&lt;span style='font-size:32px;'&gt;🐘&lt;/span&gt;&lt;br&gt;&lt;b style='font-size:14px;color:#0F172A;'&gt;Postgres&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="raw_sources_box">
          <mxGeometry x="7" y="65" width="120" height="80" as="geometry" />
        </mxCell>
        <mxCell id="raw_salesforce" value="&lt;span style='font-size:32px;'&gt;☁️&lt;/span&gt;&lt;br&gt;&lt;b style='font-size:14px;color:#0F172A;'&gt;Salesforce&lt;br&gt;cloud App&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="raw_sources_box">
          <mxGeometry x="7" y="180" width="120" height="90" as="geometry" />
        </mxCell>
        <mxCell id="raw_unstruct" value="&lt;span style='font-size:26px;'&gt;📄 📑&lt;/span&gt;&lt;br&gt;&lt;font color='#DC2626' style='font-size:14px;'&gt;&lt;b&gt;PDF&lt;/b&gt;&lt;/font&gt; &amp;amp; &lt;font color='#D97706' style='font-size:14px;'&gt;&lt;b&gt;PPT&lt;/b&gt;&lt;/font&gt;&lt;br&gt;&lt;b style='font-size:14px;color:#0F172A;'&gt;Unstructured&lt;br&gt;Files&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="raw_sources_box">
          <mxGeometry x="7" y="305" width="120" height="110" as="geometry" />
        </mxCell>

        <!-- GCS Secure Bucket Cylinder INSIDE orange box -->
        <mxCell id="gcp_bucket" value="&lt;br&gt;&lt;br&gt;&lt;br&gt;&lt;br&gt;&lt;span style='font-size: 38px;'&gt;🔷&lt;/span&gt;&lt;br&gt;&lt;br&gt;&lt;b style='font-size:15px;color:#047857;'&gt;Google Cloud&lt;br&gt;Storage (GCS)&lt;br&gt;Secure Bucket&lt;br&gt;(Raw Data Lake)&lt;/b&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=15;fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=2;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="240" y="305" width="145" height="320" as="geometry" />
        </mxCell>

        <!-- Arrow 1: Raw Sources -> GCS -->
        <mxCell id="arr_1" value="&lt;font style='font-size: 11px; font-weight: bold; color: #334155;'&gt;Data Ingestion&lt;br&gt;(via Google&lt;br&gt;Workspace /&lt;br&gt;Enterprise&lt;br&gt;Connectors)&lt;/font&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#334155;strokeWidth=2;endArrow=block;endFill=1;fontFamily=Helvetica;" edge="1" parent="1" source="raw_sources_box" target="gcp_bucket">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Funcriogy Box with Exact Architectural Icons -->
        <mxCell id="funcriogy_box" value="&lt;b style='font-size:15px;color:#92400E;'&gt;Funcriogy&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFBEB;strokeColor=#F59E0B;strokeWidth=2;fontFamily=Helvetica;verticalAlign=top;paddingTop=15;" vertex="1" parent="1">
          <mxGeometry x="465" y="225" width="125" height="480" as="geometry" />
        </mxCell>
        <mxCell id="f_1" value="&lt;span style='font-size:22px;'&gt;🔍&lt;/span&gt;&lt;br&gt;&lt;font style='font-size:11px;color:#78350F;'&gt;&lt;b&gt;Market Research&lt;/b&gt;&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="funcriogy_box">
          <mxGeometry x="12" y="55" width="100" height="60" as="geometry" />
        </mxCell>
        <mxCell id="f_2" value="&lt;span style='font-size:22px;'&gt;🔀&lt;/span&gt;&lt;br&gt;&lt;font style='font-size:11px;color:#78350F;'&gt;&lt;b&gt;Access&lt;/b&gt;&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="funcriogy_box">
          <mxGeometry x="12" y="135" width="100" height="60" as="geometry" />
        </mxCell>
        <mxCell id="f_3" value="&lt;span style='font-size:22px;'&gt;💰&lt;/span&gt;&lt;br&gt;&lt;font style='font-size:11px;color:#78350F;'&gt;&lt;b&gt;Outcomes&lt;/b&gt;&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="funcriogy_box">
          <mxGeometry x="12" y="215" width="100" height="60" as="geometry" />
        </mxCell>
        <mxCell id="f_4" value="&lt;span style='font-size:22px;'&gt;🧠&lt;/span&gt;&lt;br&gt;&lt;font style='font-size:11px;color:#78350F;'&gt;&lt;b&gt;Medical Affairs&lt;/b&gt;&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="funcriogy_box">
          <mxGeometry x="12" y="295" width="100" height="60" as="geometry" />
        </mxCell>
        <mxCell id="f_5" value="&lt;span style='font-size:22px;'&gt;🏛️&lt;/span&gt;&lt;br&gt;&lt;font style='font-size:11px;color:#78350F;'&gt;&lt;b&gt;Competitive Intel&lt;/b&gt;&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="funcriogy_box">
          <mxGeometry x="12" y="375" width="100" height="60" as="geometry" />
        </mxCell>

        <!-- Arrow 2: GCS -> Funcriogy -->
        <mxCell id="arr_2" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#334155;strokeWidth=2;endArrow=block;endFill=1;" edge="1" parent="1" source="gcp_bucket" target="funcriogy_box">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- SECTION 2 NODES -->
        <!-- Feature Engineering Transformation Box -->
        <mxCell id="fe_trans_box" value="&lt;font color='#1D4ED8' style='font-size: 16px;'&gt;&lt;b&gt;Feature Engineering&lt;br&gt;Transformation (dbt/SQL)&lt;/b&gt;&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=2;fontFamily=Helvetica;verticalAlign=top;paddingTop=18;" vertex="1" parent="1">
          <mxGeometry x="655" y="235" width="355" height="460" as="geometry" />
        </mxCell>
        <!-- Arrow 3: Funcriogy -> Feature Engineering Transformation -->
        <mxCell id="arr_3" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#334155;strokeWidth=2;endArrow=block;endFill=1;" edge="1" parent="1" source="funcriogy_box" target="fe_trans_box">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Top DAG Bullet & Document Workflow -->
        <mxCell id="fe_dag_top" value="&lt;font style='font-size:16px;color:#3B82F6;'&gt;&lt;b&gt;&amp;bull;&amp;bull;&amp;bull;&amp;bull;&lt;/b&gt;&lt;/font&gt;&lt;br&gt;&lt;font style='font-size:11px;color:#1E40AF;'&gt;&lt;b&gt;DAG&lt;/b&gt;&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="670" y="315" width="50" height="45" as="geometry" />
        </mxCell>
        <mxCell id="fe_doc_1" value="&lt;font style='font-size:11px;color:#1E40AF;'&gt;&lt;b&gt;&amp;check;&amp;nbsp;---&lt;br&gt;&amp;check;&amp;nbsp;---&lt;br&gt;&amp;check;&amp;nbsp;---&lt;/b&gt;&lt;/font&gt;" style="shape=note;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.5;size=14;align=left;paddingLeft=8;" vertex="1" parent="1">
          <mxGeometry x="750" y="300" width="55" height="60" as="geometry" />
        </mxCell>
        <mxCell id="arr_dag_doc" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#1E40AF;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1" source="fe_dag_top" target="fe_doc_1">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="fe_doc_list" value="&lt;b style='font-size:13px;color:#1E40AF;'&gt;Clean&lt;br&gt;&lt;br&gt;Normalize&lt;br&gt;&lt;br&gt;Aggregate&lt;br&gt;&lt;br&gt;Encode&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="740" y="365" width="75" height="130" as="geometry" />
        </mxCell>

        <!-- Bottom DAG Bullet & Derived Fields Pill -->
        <mxCell id="fe_dag_bot" value="&lt;font style='font-size:16px;color:#3B82F6;'&gt;&lt;b&gt;&amp;bull;&amp;bull;&amp;bull;&amp;bull;&lt;/b&gt;&lt;/font&gt;&lt;br&gt;&lt;font style='font-size:11px;color:#1E40AF;'&gt;&lt;b&gt;DAG&lt;/b&gt;&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="670" y="525" width="50" height="45" as="geometry" />
        </mxCell>
        <mxCell id="fe_pill" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#CBD5E1;strokeColor=#94A3B8;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="750" y="535" width="55" height="15" as="geometry" />
        </mxCell>
        <mxCell id="arr_dag_pill" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#1E40AF;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1" source="fe_dag_bot" target="fe_pill">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="fe_pill_lbl" value="&lt;b style='font-size:13px;color:#1E40AF;'&gt;Derived&lt;br&gt;Fields&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="740" y="555" width="75" height="40" as="geometry" />
        </mxCell>

        <!-- Fork / Converging Arrows into dbt -->
        <mxCell id="arr_fork_top" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#1E40AF;strokeWidth=1.5;endArrow=none;endFill=0;" edge="1" parent="1" source="fe_doc_1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="835" y="330" as="sourcePoint" />
            <mxPoint x="835" y="450" as="targetPoint" />
            <Array as="points">
              <mxPoint x="835" y="330" />
              <mxPoint x="835" y="450" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="arr_fork_bot" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#1E40AF;strokeWidth=1.5;endArrow=none;endFill=0;" edge="1" parent="1" source="fe_pill">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="835" y="542" as="sourcePoint" />
            <mxPoint x="835" y="450" as="targetPoint" />
            <Array as="points">
              <mxPoint x="835" y="542" />
              <mxPoint x="835" y="450" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="arr_fork_mid" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#1E40AF;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="835" y="450" as="sourcePoint" />
            <mxPoint x="865" y="450" as="targetPoint" />
          </mxGeometry>
        </mxCell>

        <!-- dbt Section (Official Orange Propeller Logo + DAG Workflow Nodes) -->
        <mxCell id="fe_dbt_logo" value="&lt;span style='font-size:28px;'&gt;🔸&lt;/span&gt;&lt;font color='#F97316' style='font-size:26px;font-weight:bold;'&gt;dbt&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="860" y="390" width="105" height="40" as="geometry" />
        </mxCell>
        <mxCell id="fe_dbt_node_a" value="" style="rounded=1;fillColor=#DBEAFE;strokeColor=#3B82F6;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="870" y="440" width="22" height="18" as="geometry" />
        </mxCell>
        <mxCell id="fe_dbt_node_b" value="" style="rounded=1;fillColor=#DBEAFE;strokeColor=#3B82F6;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="905" y="455" width="22" height="18" as="geometry" />
        </mxCell>
        <mxCell id="fe_dbt_node_c" value="" style="rounded=1;fillColor=#DBEAFE;strokeColor=#3B82F6;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="935" y="475" width="22" height="18" as="geometry" />
        </mxCell>
        <mxCell id="arr_dbt_ab" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#3B82F6;strokeWidth=1.2;endArrow=block;endFill=1;" edge="1" parent="1" source="fe_dbt_node_a" target="fe_dbt_node_b">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="arr_dbt_bc" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#3B82F6;strokeWidth=1.2;endArrow=block;endFill=1;" edge="1" parent="1" source="fe_dbt_node_b" target="fe_dbt_node_c">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="fe_dbt_dag_lbl" value="&lt;font style='font-size:12px;color:#1E40AF;'&gt;&lt;b&gt;DAG&lt;/b&gt;&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="885" y="500" width="50" height="25" as="geometry" />
        </mxCell>

        <!-- Managed Feature Store Box (Exact Cylinder Replica with ZERO Overlap) -->
        <mxCell id="feat_store_box" value="&lt;font color='#047857' style='font-size: 16px;'&gt;&lt;b&gt;Managed&lt;br&gt;Feature Store&lt;/b&gt;&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ECFDF5;strokeColor=#10B981;strokeWidth=2;fontFamily=Helvetica;verticalAlign=top;paddingTop=18;" vertex="1" parent="1">
          <mxGeometry x="1035" y="235" width="165" height="460" as="geometry" />
        </mxCell>
        <!-- Arrow 4: Feature Engineering Transformation -> Managed Feature Store -->
        <mxCell id="arr_4" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#334155;strokeWidth=2;endArrow=block;endFill=1;" edge="1" parent="1" source="fe_trans_box" target="feat_store_box">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="fs_cylinder" value="&lt;b style='font-size:14px;color:#065F46;'&gt;Model-Ready&lt;br&gt;Features&lt;/b&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=15;fillColor=#D1FAE5;strokeColor=#059669;strokeWidth=2;fontFamily=Helvetica;verticalAlign=top;paddingTop=25;" vertex="1" parent="1">
          <mxGeometry x="1048" y="295" width="140" height="340" as="geometry" />
        </mxCell>
        <mxCell id="fs_inner_dash" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=none;strokeColor=#059669;strokeWidth=1.5;strokeDashArray=4 4;" vertex="1" parent="1">
          <mxGeometry x="1058" y="375" width="120" height="240" as="geometry" />
        </mxCell>
        <mxCell id="fs_churn" value="&lt;span style='font-size:26px;'&gt;👥&lt;/span&gt;&lt;br&gt;&lt;font style='font-size:12px;color:#065F46;'&gt;&lt;b&gt;Customer&lt;br&gt;Churn Features&lt;/b&gt;&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="1062" y="390" width="112" height="65" as="geometry" />
        </mxCell>
        <mxCell id="fs_sales" value="&lt;span style='font-size:26px;'&gt;📈&lt;/span&gt;&lt;br&gt;&lt;font style='font-size:12px;color:#065F46;'&gt;&lt;b&gt;Sales Prediction&lt;br&gt;Features&lt;/b&gt;&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="1062" y="485" width="112" height="65" as="geometry" />
        </mxCell>
        <mxCell id="fs_title_bot" value="&lt;font color='#047857' style='font-size: 15px;'&gt;&lt;b&gt;Managed&lt;br&gt;Feature Store&lt;/b&gt;&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="1045" y="640" width="145" height="45" as="geometry" />
        </mxCell>

        <!-- SECTION 3 NODES -->
        <!-- ML Model Training Box with Circular Loop Graphic -->
        <mxCell id="ml_train_box" value="&lt;font color='#1E40AF' style='font-size: 16px;'&gt;&lt;b&gt;ML Model&lt;br&gt;Training&lt;/b&gt;&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#2563EB;strokeWidth=2;fontFamily=Helvetica;verticalAlign=top;paddingTop=15;" vertex="1" parent="1">
          <mxGeometry x="1265" y="245" width="190" height="190" as="geometry" />
        </mxCell>
        <!-- Arrow 5: Managed Feature Store -> ML Model Training (Pull Features above arrow!) -->
        <mxCell id="arr_5" value="&lt;font style='font-size: 12px; font-weight: bold; color: #334155;'&gt;Pull&lt;br&gt;Features&lt;/font&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#334155;strokeWidth=2;endArrow=block;endFill=1;fontFamily=Helvetica;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="feat_store_box" target="ml_train_box">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="ml_train_loop" value="&lt;font style='font-size:13px;color:#1E40AF;'&gt;&lt;b&gt;Training Loop&lt;/b&gt;&lt;/font&gt;" style="shape=ellipse;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=2;fontFamily=Helvetica;display=flex;align=center;verticalAlign=middle;" vertex="1" parent="ml_train_box">
          <mxGeometry x="35" y="70" width="120" height="85" as="geometry" />
        </mxCell>

        <!-- Model Registry Box (Physical Safe / Vault Box Icon [o]) -->
        <mxCell id="model_reg_box" value="&lt;span style='font-size:38px;'&gt;🗄️&lt;/span&gt;&lt;br&gt;&lt;br&gt;&lt;b style='font-size:14px;color:#334155;'&gt;Model&lt;br&gt;Registry&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#64748B;strokeWidth=2;fontFamily=Helvetica;verticalAlign=bottom;paddingBottom=15;" vertex="1" parent="1">
          <mxGeometry x="1280" y="545" width="160" height="150" as="geometry" />
        </mxCell>
        <!-- Arrow 6: ML Model Training -> Model Registry -->
        <mxCell id="arr_6" value="&lt;font style='font-size: 12px; font-weight: bold; color: #334155;'&gt;Stores&lt;br&gt;trained&lt;br&gt;models&lt;/font&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#334155;strokeWidth=2;endArrow=block;endFill=1;fontFamily=Helvetica;" edge="1" parent="1" source="ml_train_box" target="model_reg_box">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Model Inference API Endpoint Box -->
        <mxCell id="inference_box" value="&lt;font color='#1D4ED8' style='font-size: 15px;'&gt;&lt;b&gt;Model&lt;br&gt;Inference&lt;br&gt;API&lt;br&gt;Endpoint&lt;br&gt;(Deployment)&lt;/b&gt;&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=2;fontFamily=Helvetica;display=flex;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1485" y="530" width="150" height="180" as="geometry" />
        </mxCell>
        <!-- Arrow 7: Model Registry -> Model Inference API Endpoint -->
        <mxCell id="arr_7" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#334155;strokeWidth=2;endArrow=block;endFill=1;" edge="1" parent="1" source="model_reg_box" target="inference_box">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- 3 Stacked Target Boxes -->
        <mxCell id="tgt_web" value="&lt;b style='font-size:12px;color:#334155;'&gt;Web App/&lt;br&gt;Dashboard&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.5;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="1680" y="490" width="110" height="55" as="geometry" />
        </mxCell>
        <mxCell id="tgt_mobile" value="&lt;b style='font-size:12px;color:#334155;'&gt;Mobile&lt;br&gt;App&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.5;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="1680" y="575" width="110" height="55" as="geometry" />
        </mxCell>
        <mxCell id="tgt_report" value="&lt;b style='font-size:12px;color:#334155;'&gt;Automated&lt;br&gt;Report&lt;br&gt;Generator&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.5;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="1680" y="660" width="110" height="60" as="geometry" />
        </mxCell>

        <!-- Arrow 8: Inference -> Stacked Boxes -->
        <mxCell id="arr_8a" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#334155;strokeWidth=2;endArrow=block;endFill=1;" edge="1" parent="1" source="inference_box" target="tgt_web">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="arr_8b" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#334155;strokeWidth=2;endArrow=block;endFill=1;" edge="1" parent="1" source="inference_box" target="tgt_mobile">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="arr_8c" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#334155;strokeWidth=2;endArrow=block;endFill=1;" edge="1" parent="1" source="inference_box" target="tgt_report">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Large Curved Monitoring & Alerting Feedback Loop STRICTLY INSIDE Section 3 (NEVER touching Web App!) -->
        <mxCell id="arr_curved_feedback" value="&lt;font style='font-size: 14px; font-weight: bold; color: #1E40AF;'&gt;Monitoring&lt;br&gt;&amp;amp; Alerting&lt;/font&gt;" style="edgeStyle=orthogonalEdgeStyle;curved=1;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=4;endArrow=block;endFill=1;fontFamily=Helvetica;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="inference_box" target="ml_train_box">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="1560" y="530" as="sourcePoint" />
            <mxPoint x="1455" y="340" as="targetPoint" />
            <Array as="points">
              <mxPoint x="1560" y="490" />
              <mxPoint x="1600" y="490" />
              <mxPoint x="1600" y="340" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- Footer & Legend -->
        <!-- Legend Box (Sharp rounded=0) INSIDE DASHED BORDER -->
        <mxCell id="legend_box_pipeline" value="&lt;b style='font-size:14px;color:#0F172A;'&gt;Legend&lt;/b&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;fontFamily=Helvetica;verticalAlign=top;paddingTop=8;" vertex="1" parent="1">
          <mxGeometry x="35" y="805" width="400" height="95" as="geometry" />
        </mxCell>
        <mxCell id="leg_1" value="&lt;font style='font-size:11px;color:#334155;'&gt;= Managed compute&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="legend_box_pipeline">
          <mxGeometry x="35" y="30" width="130" height="25" as="geometry" />
        </mxCell>
        <mxCell id="leg_1_icon" value="" style="shape=hexagon;fillColor=#3B82F6;strokeColor=#1D4ED8;strokeWidth=1.5;" vertex="1" parent="legend_box_pipeline">
          <mxGeometry x="12" y="32" width="20" height="20" as="geometry" />
        </mxCell>

        <mxCell id="leg_2" value="&lt;font style='font-size:11px;color:#334155;'&gt;Storage&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="legend_box_pipeline">
          <mxGeometry x="35" y="62" width="90" height="25" as="geometry" />
        </mxCell>
        <mxCell id="leg_2_icon" value="" style="shape=cylinder3;fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=1.5;" vertex="1" parent="legend_box_pipeline">
          <mxGeometry x="12" y="64" width="20" height="20" as="geometry" />
        </mxCell>

        <mxCell id="leg_3" value="&lt;font style='font-size:11px;color:#334155;'&gt;Secure boundary&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="legend_box_pipeline">
          <mxGeometry x="195" y="30" width="115" height="25" as="geometry" />
        </mxCell>
        <mxCell id="leg_3_icon" value="" style="rounded=1;fillColor=#FEF3C7;strokeColor=#D97706;strokeWidth=1.5;" vertex="1" parent="legend_box_pipeline">
          <mxGeometry x="170" y="32" width="20" height="20" as="geometry" />
        </mxCell>

        <mxCell id="leg_4" value="&lt;font style='font-size:11px;color:#334155;'&gt;Secure boundaries&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="legend_box_pipeline">
          <mxGeometry x="195" y="62" width="115" height="25" as="geometry" />
        </mxCell>
        <mxCell id="leg_4_icon" value="" style="shape=hexagon;fillColor=#E2E8F0;strokeColor=#64748B;strokeWidth=1.5;" vertex="1" parent="legend_box_pipeline">
          <mxGeometry x="170" y="64" width="20" height="20" as="geometry" />
        </mxCell>

        <!-- WHY IT WORKS Callout Banner (Sharp rounded=0) -->
        <mxCell id="why_works_pipeline" value="&lt;font color='#0F172A' style='font-size: 16px;'&gt;&lt;b&gt;WHY IT WORKS:&lt;/b&gt; Data engineers and ML engineers need to see how upstream data changes impact downstream model performance. This gives them a shared map.&lt;/font&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#94A3B8;strokeWidth=2;fontFamily=Helvetica;display=flex;align=center;verticalAlign=middle;padding=15;" vertex="1" parent="1">
          <mxGeometry x="460" y="810" width="1350" height="85" as="geometry" />
        </mxCell>

        <!-- Wide Horizontal Brace Spanning Across All 3 Sections -->
        <mxCell id="brace_line" value="&lt;span style='font-size: 42px; color: #64748B;'&gt;︸&lt;/span&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="185" y="770" width="1625" height="40" as="geometry" />
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
  `.trim();
}

export function getExactSecureDeploymentMapReferenceXml(): string {
  return `
<mxfile host="embed.diagrams.net">
  <diagram id="secure_deployment_map_compiled" name="Google Cloud Project (ITACS Platform Production)">
    <mxGraphModel dx="1800" dy="1000" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1800" pageHeight="1000" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- 1. Master Container (#F1F3F4 light gray, rounded corners approx 8px) -->
        <mxCell id="master_container" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8F9FA;strokeColor=#94A3B8;strokeWidth=1.5;arcSize=2;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="150" y="30" width="1380" height="740" as="geometry" />
        </mxCell>

        <!-- Top Header Left inside Master Container -->
        <mxCell id="top_header" value="&lt;span style='font-size:22px;'&gt;🔷&lt;/span&gt; &lt;font style='font-size:18px;font-weight:bold;color:#202124;'&gt;Google Cloud Project (ITACS Platform Production)&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="175" y="45" width="500" height="30" as="geometry" />
        </mxCell>

        <!-- 2. Far Left (Outside Master Container): Public Internet Traffic -->
        <mxCell id="public_internet" value="&lt;span style='font-size:38px;'&gt;👤&lt;/span&gt;&lt;br&gt;&lt;b style='font-size:14px;color:#202124;'&gt;Public Internet&lt;br&gt;Traffic&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.5;fontFamily=Helvetica;arcSize=8;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="20" y="325" width="110" height="110" as="geometry" />
        </mxCell>

        <!-- Zone 1: The Edge (External Traffic) -->
        <mxCell id="zone_1" value="&lt;font style='font-size:15px;color:#202124;'&gt;&lt;b&gt;Zone 1: The Edge (External Traffic)&lt;/b&gt;&lt;/font&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#F1F3F4;strokeColor=#94A3B8;strokeWidth=1.5;fontFamily=Helvetica;verticalAlign=top;paddingTop=15;" vertex="1" parent="1">
          <mxGeometry x="175" y="90" width="380" height="660" as="geometry" />
        </mxCell>

        <!-- External HTTP(S) Load Balancer (L7) Card -->
        <mxCell id="lb_card" value="&lt;span style='font-size:32px;'&gt;🖧 🛡️&lt;/span&gt;&lt;br&gt;&lt;br&gt;&lt;b style='font-size:14px;color:#202124;'&gt;External HTTP(S)&lt;br&gt;Load Balancer (L7)&lt;/b&gt;&lt;br&gt;&lt;font style='font-size:11px;color:#5F6368;'&gt;Cloud Armor WAF Rules&lt;br&gt;(Ingress filtering)&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.5;arcSize=8;shadow=1;fontFamily=Helvetica;verticalAlign=top;paddingTop=15;" vertex="1" parent="1">
          <mxGeometry x="195" y="295" width="160" height="160" as="geometry" />
        </mxCell>

        <!-- Google API Gateway Card -->
        <mxCell id="api_gateway" value="&lt;span style='font-size:36px;'&gt;🔀&lt;/span&gt;&lt;br&gt;&lt;br&gt;&lt;b style='font-size:14px;color:#202124;'&gt;Google API&lt;br&gt;Gateway&lt;/b&gt;&lt;br&gt;&lt;font style='font-size:11px;color:#5F6368;'&gt;Access key validation&lt;br&gt;and API rate limiting&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.5;arcSize=8;shadow=1;fontFamily=Helvetica;verticalAlign=top;paddingTop=15;" vertex="1" parent="1">
          <mxGeometry x="380" y="295" width="155" height="160" as="geometry" />
        </mxCell>

        <!-- Ingestion Arrows -->
        <mxCell id="arr_pub_lb" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1" source="public_internet" target="lb_card">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="arr_lb_api" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1" source="lb_card" target="api_gateway">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Zone 2: VPC Service Controls Perimeter (The Outer Security Shell) -->
        <mxCell id="perimeter_box" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFF8F0;strokeColor=#F6AD55;strokeWidth=1.5;arcSize=3;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="580" y="90" width="930" height="660" as="geometry" />
        </mxCell>
        <mxCell id="perim_header" value="&lt;span style='font-size:20px;'&gt;🛡️&lt;/span&gt; &lt;b style='font-size:15px;color:#202124;'&gt;VPC Service Controls Perimeter (Secure Managed Environment)&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="595" y="100" width="550" height="30" as="geometry" />
        </mxCell>
        <mxCell id="perim_sub" value="&lt;font style='font-size:15px;color:#202124;'&gt;Zone 2: The Private Network (VPC Inside)&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="780" y="135" width="400" height="25" as="geometry" />
        </mxCell>

        <!-- Ingress Connector (Zone 1 to Zone 2) -->
        <mxCell id="arr_ingress" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1" source="api_gateway" target="agent_orchestrator">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="ingress_lbl" value="&lt;font style='font-size:11px;color:#5F6368;line-height:1.2;'&gt;Secure&lt;br&gt;Private Call&lt;br&gt;via PSC&lt;br&gt;Endpoint&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="555" y="335" width="90" height="60" as="geometry" />
        </mxCell>

        <!-- ITACS Primary VPC Network -->
        <mxCell id="vpc_box" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#4285F4;strokeWidth=2;arcSize=3;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="615" y="170" width="875" height="560" as="geometry" />
        </mxCell>
        <mxCell id="vpc_header" value="&lt;b style='font-size:16px;color:#202124;'&gt;ITACS Primary VPC Network&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="635" y="185" width="300" height="25" as="geometry" />
        </mxCell>

        <!-- Subnet 1: Private Application Subnet -->
        <mxCell id="app_subnet" value="&lt;font style='font-size:14px;color:#202124;'&gt;Private Application Subnet (Isolated)&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#E8F0FE;strokeColor=#4285F4;strokeWidth=1.5;arcSize=3;fontFamily=Helvetica;verticalAlign=top;paddingTop=12;" vertex="1" parent="1">
          <mxGeometry x="640" y="225" width="320" height="480" as="geometry" />
        </mxCell>
        <!-- Central Card: ITACS Agent Orchestrator -->
        <mxCell id="agent_orchestrator" value="&lt;b style='font-size:15px;color:#202124;'&gt;ITACS Agent&lt;br&gt;Orchestrator&lt;br&gt;(GKE Pod)&lt;/b&gt;&lt;br&gt;&lt;br&gt;&lt;span style='font-size:32px;'&gt;🔷 🖧&lt;/span&gt;&lt;br&gt;&lt;font style='font-size:12px;color:#5F6368;'&gt;&lt;b&gt;Logic&lt;/b&gt;&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#4285F4;strokeWidth=1.5;arcSize=8;shadow=1;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="690" y="325" width="220" height="160" as="geometry" />
        </mxCell>

        <!-- Subnet 2: Private Data/AI Subnet -->
        <mxCell id="data_subnet" value="&lt;font style='font-size:14px;color:#202124;'&gt;Private Data/AI Subnet (Isolated)&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#E6F4EA;strokeColor=#34A853;strokeWidth=1.5;arcSize=3;fontFamily=Helvetica;verticalAlign=top;paddingTop=12;" vertex="1" parent="1">
          <mxGeometry x="1000" y="225" width="470" height="480" as="geometry" />
        </mxCell>
        <!-- Stacked Cards inside Data/AI Subnet -->
        <mxCell id="vector_search" value="&lt;div style='display:flex;align-items:center;padding:10px;'&gt;&lt;span style='font-size:38px;margin-right:15px;'&gt;🔣&lt;/span&gt;&lt;div&gt;&lt;b style='font-size:15px;color:#202124;'&gt;Vertex AI Vector&lt;br&gt;Search Index&lt;br&gt;(via PSC Endpoint)&lt;/b&gt;&lt;br&gt;&lt;font style='font-size:11px;color:#5F6368;'&gt;(Logical container/data part)&lt;/font&gt;&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#34A853;strokeWidth=1.5;arcSize=8;shadow=1;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="1030" y="265" width="410" height="120" as="geometry" />
        </mxCell>
        <mxCell id="training_cluster" value="&lt;div style='display:flex;align-items:center;padding:10px;'&gt;&lt;span style='font-size:38px;margin-right:15px;'&gt;🧠&lt;/span&gt;&lt;div&gt;&lt;b style='font-size:15px;color:#202124;'&gt;Vertex AI&lt;br&gt;Training Cluster&lt;br&gt;(via PSC Endpoint)&lt;/b&gt;&lt;br&gt;&lt;font style='font-size:11px;color:#5F6368;'&gt;(Logical container/ML)&lt;/font&gt;&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#34A853;strokeWidth=1.5;arcSize=8;shadow=1;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="1030" y="405" width="410" height="120" as="geometry" />
        </mxCell>
        <mxCell id="gemini_api" value="&lt;div style='display:flex;align-items:center;padding:10px;'&gt;&lt;span style='font-size:38px;margin-right:15px;'&gt;✨&lt;/span&gt;&lt;div&gt;&lt;b style='font-size:15px;color:#202124;'&gt;Vertex AI&lt;br&gt;Gemini API&lt;br&gt;(via PSC Endpoint)&lt;/b&gt;&lt;br&gt;&lt;font style='font-size:11px;color:#5F6368;'&gt;(Logical container/AI)&lt;/font&gt;&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#34A853;strokeWidth=1.5;arcSize=8;shadow=1;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="1030" y="555" width="410" height="120" as="geometry" />
        </mxCell>

        <!-- Bidirectional Internal VPC Connectors -->
        <mxCell id="arr_orch_vec" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1.5;endArrow=block;startArrow=block;endFill=1;startFill=1;" edge="1" parent="1" source="agent_orchestrator" target="vector_search">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="910" y="365" as="sourcePoint" />
            <mxPoint x="1030" y="325" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="lbl_orch_vec" value="&lt;font style='font-size:11px;color:#5F6368;'&gt;Private gRPC/&lt;br&gt;HTTP Endpoint&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="915" y="305" width="110" height="40" as="geometry" />
        </mxCell>

        <mxCell id="arr_orch_train" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1.5;endArrow=block;startArrow=block;endFill=1;startFill=1;" edge="1" parent="1" source="agent_orchestrator" target="training_cluster">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="910" y="445" as="sourcePoint" />
            <mxPoint x="1030" y="465" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="lbl_orch_train" value="&lt;font style='font-size:11px;color:#5F6368;'&gt;Private gRPC/&lt;br&gt;HTTP Endpoint&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="915" y="445" width="110" height="40" as="geometry" />
        </mxCell>

        <mxCell id="arr_orch_gemini" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1.5;endArrow=block;startArrow=block;endFill=1;startFill=1;" edge="1" parent="1" source="agent_orchestrator" target="gemini_api">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="800" y="485" as="sourcePoint" />
            <mxPoint x="1030" y="615" as="targetPoint" />
            <Array as="points">
              <mxPoint x="800" y="615" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="lbl_orch_gemini" value="&lt;font style='font-size:11px;color:#5F6368;'&gt;Private Private Call&lt;br&gt;via PSC Endpoint&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="820" y="575" width="130" height="40" as="geometry" />
        </mxCell>

        <!-- Right-Margin Pointer Annotations (External Callouts outside Master Container on far right) -->
        <mxCell id="callout_1" value="&lt;font style='font-size:12px;color:#202124;'&gt;&lt;b&gt;Private Service&lt;br&gt;Connect Endpoints&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;(Logical integration in VPC)&lt;/font&gt;&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="1560" y="260" width="180" height="60" as="geometry" />
        </mxCell>
        <mxCell id="arr_c1" value="" style="edgeStyle=orthogonalEdgeStyle;curved=1;rounded=1;html=1;strokeColor=#202124;strokeWidth=1.2;endArrow=block;endFill=1;" edge="1" parent="1" source="callout_1" target="vector_search">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="callout_2" value="&lt;font style='font-size:12px;color:#202124;'&gt;&lt;b&gt;Private Service&lt;br&gt;Connect Endpoints&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;(Logical integration in VPC)&lt;/font&gt;&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="1560" y="390" width="180" height="60" as="geometry" />
        </mxCell>
        <mxCell id="arr_c2" value="" style="edgeStyle=orthogonalEdgeStyle;curved=1;rounded=1;html=1;strokeColor=#202124;strokeWidth=1.2;endArrow=block;endFill=1;" edge="1" parent="1" source="callout_2" target="training_cluster">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="callout_3" value="&lt;font style='font-size:12px;color:#202124;'&gt;&lt;b&gt;VPC Service Controls&lt;br&gt;Perimeter&lt;/b&gt; &lt;font color='#5F6368'&gt;(Secures&lt;br&gt;managed services)&lt;/font&gt;&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="1560" y="500" width="180" height="60" as="geometry" />
        </mxCell>
        <mxCell id="arr_c3" value="" style="edgeStyle=orthogonalEdgeStyle;curved=1;rounded=1;html=1;strokeColor=#202124;strokeWidth=1.2;endArrow=block;endFill=1;" edge="1" parent="1" source="callout_3" target="perimeter_box">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="1510" y="530" as="targetPoint" />
          </mxGeometry>
        </mxCell>

        <mxCell id="callout_4" value="&lt;font style='font-size:12px;color:#202124;'&gt;&lt;b&gt;Cloud Armor WAF Rules&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;(Edge protection)&lt;/font&gt;&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="1560" y="595" width="180" height="45" as="geometry" />
        </mxCell>
        <mxCell id="arr_c4" value="" style="edgeStyle=orthogonalEdgeStyle;curved=1;rounded=1;html=1;strokeColor=#202124;strokeWidth=1.2;endArrow=block;endFill=1;" edge="1" parent="1" source="callout_4" target="master_container">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="1530" y="617" as="targetPoint" />
          </mxGeometry>
        </mxCell>

        <mxCell id="callout_5" value="&lt;font style='font-size:12px;color:#202124;'&gt;&lt;b&gt;Google Cloud IAM&lt;/b&gt;&lt;br&gt;&lt;font color='#5F6368'&gt;(Role-Based Access&lt;br&gt;Control) points to all&lt;br&gt;components&lt;/font&gt;&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="1560" y="660" width="180" height="75" as="geometry" />
        </mxCell>
        <mxCell id="arr_c5" value="" style="edgeStyle=orthogonalEdgeStyle;curved=1;rounded=1;html=1;strokeColor=#202124;strokeWidth=1.2;endArrow=block;endFill=1;" edge="1" parent="1" source="callout_5" target="gemini_api">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Bottom Footer Region -->
        <!-- Legend Box (Bottom Left) -->
        <mxCell id="legend_box_deploy" value="&lt;b style='font-size:14px;color:#202124;'&gt;Legend&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.5;fontFamily=Helvetica;verticalAlign=top;paddingTop=8;arcSize=4;" vertex="1" parent="1">
          <mxGeometry x="20" y="795" width="510" height="175" as="geometry" />
        </mxCell>
        <mxCell id="leg_d1" value="&lt;font style='font-size:11px;color:#202124;'&gt;Logical container&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="legend_box_deploy">
          <mxGeometry x="35" y="32" width="130" height="20" as="geometry" />
        </mxCell>
        <mxCell id="leg_d1_icon" value="" style="shape=cube;size=10;fillColor=#4285F4;strokeColor=#1A73E8;strokeWidth=1.2;" vertex="1" parent="legend_box_deploy">
          <mxGeometry x="12" y="32" width="18" height="18" as="geometry" />
        </mxCell>

        <mxCell id="leg_d2" value="&lt;font style='font-size:11px;color:#202124;'&gt;Software types&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="legend_box_deploy">
          <mxGeometry x="35" y="58" width="130" height="20" as="geometry" />
        </mxCell>
        <mxCell id="leg_d2_icon" value="&lt;span style='font-size:16px;'&gt;👤&lt;/span&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="legend_box_deploy">
          <mxGeometry x="10" y="57" width="22" height="22" as="geometry" />
        </mxCell>

        <mxCell id="leg_d3" value="&lt;font style='font-size:11px;color:#202124;'&gt;Line colors&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="legend_box_deploy">
          <mxGeometry x="35" y="84" width="130" height="20" as="geometry" />
        </mxCell>
        <mxCell id="leg_d3_icon" value="" style="endArrow=none;strokeColor=#202124;strokeWidth=1.5;html=1;" edge="1" parent="legend_box_deploy">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="12" y="94" as="sourcePoint" />
            <mxPoint x="30" y="94" as="targetPoint" />
          </mxGeometry>
        </mxCell>

        <mxCell id="leg_d4" value="&lt;font style='font-size:11px;color:#202124;'&gt;Security Boundaries&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="legend_box_deploy">
          <mxGeometry x="35" y="110" width="130" height="20" as="geometry" />
        </mxCell>
        <mxCell id="leg_d4_icon" value="" style="endArrow=none;strokeColor=#34A853;strokeWidth=1.5;html=1;" edge="1" parent="legend_box_deploy">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="12" y="120" as="sourcePoint" />
            <mxPoint x="30" y="120" as="targetPoint" />
          </mxGeometry>
        </mxCell>

        <mxCell id="leg_d5" value="&lt;font style='font-size:11px;color:#202124;'&gt;Security Controls&lt;br&gt;Boundaries&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="legend_box_deploy">
          <mxGeometry x="35" y="136" width="130" height="28" as="geometry" />
        </mxCell>
        <mxCell id="leg_d5_icon" value="" style="endArrow=none;strokeColor=#4285F4;strokeWidth=1.5;html=1;" edge="1" parent="legend_box_deploy">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="12" y="150" as="sourcePoint" />
            <mxPoint x="30" y="150" as="targetPoint" />
          </mxGeometry>
        </mxCell>

        <!-- Right Column of Legend Box -->
        <mxCell id="leg_r1" value="&lt;font style='font-size:11px;color:#202124;'&gt;Google Cloud Armor&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="legend_box_deploy">
          <mxGeometry x="245" y="32" width="160" height="20" as="geometry" />
        </mxCell>
        <mxCell id="leg_r1_icon" value="&lt;span style='font-size:18px;'&gt;🛡️&lt;/span&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="legend_box_deploy">
          <mxGeometry x="220" y="31" width="20" height="20" as="geometry" />
        </mxCell>

        <mxCell id="leg_r2" value="&lt;font style='font-size:11px;color:#202124;'&gt;Google Cloud IAM&lt;br&gt;(Role-Based Access Control)&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="legend_box_deploy">
          <mxGeometry x="245" y="58" width="200" height="28" as="geometry" />
        </mxCell>
        <mxCell id="leg_r2_icon" value="&lt;span style='font-size:18px;'&gt;👥&lt;/span&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="legend_box_deploy">
          <mxGeometry x="220" y="62" width="20" height="20" as="geometry" />
        </mxCell>

        <mxCell id="leg_r3" value="&lt;font style='font-size:11px;color:#202124;'&gt;Google Cloud IAM&lt;br&gt;(Role-Based Access Control)&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="legend_box_deploy">
          <mxGeometry x="245" y="96" width="200" height="28" as="geometry" />
        </mxCell>
        <mxCell id="leg_r3_icon" value="&lt;span style='font-size:18px;'&gt;🔐&lt;/span&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="legend_box_deploy">
          <mxGeometry x="220" y="100" width="20" height="20" as="geometry" />
        </mxCell>

        <mxCell id="leg_r4" value="&lt;font style='font-size:11px;color:#202124;'&gt;VPC Service Controls Perimeter&lt;br&gt;(Secure Managed Environment)&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="legend_box_deploy">
          <mxGeometry x="245" y="134" width="220" height="28" as="geometry" />
        </mxCell>
        <mxCell id="leg_r4_icon" value="" style="rounded=1;fillColor=#FFF8F0;strokeColor=#F6AD55;strokeWidth=1.5;" vertex="1" parent="legend_box_deploy">
          <mxGeometry x="220" y="138" width="20" height="20" as="geometry" />
        </mxCell>

        <!-- Value Proposition Callout (Bottom Right) -->
        <mxCell id="why_works_deploy" value="&lt;b style='font-size:15px;color:#202124;'&gt;WHY IT WORKS:&lt;/b&gt; &lt;font style='font-size:15px;color:#202124;'&gt;Security teams and DevOps teams can immediately see both what the software is and how it is protected from the public internet.&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F1F3F4;strokeColor=#94A3B8;strokeWidth=1.5;fontFamily=Helvetica;display=flex;align=center;verticalAlign=middle;padding=15;arcSize=4;" vertex="1" parent="1">
          <mxGeometry x="550" y="830" width="980" height="105" as="geometry" />
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
  `.trim();
}

export function getExactDevopsCicdPipelineReferenceXml(): string {
  return `
<mxfile host="embed.diagrams.net">
  <diagram id="devops_cicd_pipeline_compiled" name="Diagram: The Operational Flow">
    <mxGraphModel dx="1800" dy="1000" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1800" pageHeight="1000" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- 1. Top Canvas Title -->
        <mxCell id="master_title" value="&lt;font style='font-size:22px;color:#0F172A;'&gt;Diagram: The Operational Flow&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="600" y="5" width="600" height="30" as="geometry" />
        </mxCell>

        <!-- Master Container (#F8FAFC light gray, rounded corners approx 8px) -->
        <mxCell id="master_container" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#64748B;strokeWidth=1.5;arcSize=2;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="20" y="40" width="1760" height="840" as="geometry" />
        </mxCell>

        <!-- Top-Left Header inside Master Container -->
        <mxCell id="top_header" value="&lt;span style='font-size:20px;'&gt;🔷&lt;/span&gt; &lt;b style='font-size:16px;color:#202124;'&gt;ITACS Governing Cloud Tenant (Managed Services)&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="40" y="50" width="500" height="30" as="geometry" />
        </mxCell>

        <!-- 2. Column 1: PLAN & GOVERN -->
        <mxCell id="col_plan" value="&lt;b style='font-size:13px;color:#202124;'&gt;PLAN &amp;amp; GOVERN&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.5;arcSize=3;fontFamily=Helvetica;verticalAlign=top;paddingTop=12;" vertex="1" parent="1">
          <mxGeometry x="40" y="90" width="130" height="670" as="geometry" />
        </mxCell>
        <mxCell id="plan_proj" value="&lt;span style='font-size:32px;'&gt;📄&lt;/span&gt;&lt;br&gt;&lt;font style='font-size:12px;color:#202124;'&gt;Project&lt;br&gt;Planning&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.2;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="55" y="180" width="100" height="90" as="geometry" />
        </mxCell>
        <mxCell id="plan_erd" value="&lt;span style='font-size:32px;'&gt;🗂️&lt;/span&gt;&lt;br&gt;&lt;font style='font-size:12px;color:#202124;'&gt;Dimensional&lt;br&gt;Data Modeling&lt;br&gt;(ERD)&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.2;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="55" y="380" width="100" height="110" as="geometry" />
        </mxCell>
        <!-- Connectors from Plan & Govern to Git Source -->
        <mxCell id="arr_plan_merge1" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1.2;endArrow=none;" edge="1" parent="1" source="plan_proj">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="175" y="335" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="arr_plan_merge2" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1.2;endArrow=block;endFill=1;" edge="1" parent="1" source="plan_erd" target="col_git">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="185" y="335" as="targetPoint" />
            <Array as="points">
              <mxPoint x="175" y="435" />
              <mxPoint x="175" y="335" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- 3. Column 2: GIT SOURCE & IaC DEFINE -->
        <mxCell id="col_git" value="&lt;b style='font-size:13px;color:#202124;'&gt;GIT SOURCE &amp;amp; IaC DEFINE&lt;/b&gt;&lt;br&gt;&lt;font style='font-size:11px;color:#475569;'&gt;(Governance/Compliance)&lt;br&gt;(Polyrepo setup with explicit&lt;br&gt;PR/Branch Protection Rules)&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#94A3B8;strokeWidth=1.5;arcSize=3;fontFamily=Helvetica;verticalAlign=top;paddingTop=12;" vertex="1" parent="1">
          <mxGeometry x="185" y="90" width="220" height="670" as="geometry" />
        </mxCell>
        <mxCell id="git_cat" value="&lt;span style='font-size:32px;'&gt;🐱&lt;/span&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="275" y="180" width="40" height="40" as="geometry" />
        </mxCell>
        <mxCell id="git_card1" value="&lt;span style='font-size:20px;'&gt;{...}&lt;/span&gt;&lt;br&gt;&lt;b style='font-size:13px;color:#0369A1;'&gt;Data Engineering&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#E0F2FE;strokeColor=#0284C7;strokeWidth=1.2;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="205" y="235" width="180" height="70" as="geometry" />
        </mxCell>
        <mxCell id="git_card2" value="&lt;span style='font-size:20px;'&gt;&amp;lt;/&amp;gt;&lt;/span&gt;&lt;br&gt;&lt;b style='font-size:13px;color:#15803D;'&gt;Application&lt;br&gt;Development&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#16A085;strokeWidth=1.2;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="205" y="365" width="180" height="70" as="geometry" />
        </mxCell>
        <mxCell id="git_card3" value="&lt;span style='font-size:22px;'&gt;🧠&lt;/span&gt;&lt;br&gt;&lt;b style='font-size:13px;color:#0369A1;'&gt;MLOps&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#E0F2FE;strokeColor=#0284C7;strokeWidth=1.2;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="205" y="595" width="180" height="70" as="geometry" />
        </mxCell>
        <mxCell id="git_pr_rules" value="&lt;font style='font-size:12px;color:#334155;'&gt;PR/Branch&lt;br&gt;Protection Rules&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="225" y="485" width="140" height="45" as="geometry" />
        </mxCell>
        <mxCell id="arr_pr1" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1;endArrow=block;endFill=1;" edge="1" parent="1" source="git_pr_rules" target="git_card2">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="arr_pr2" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1;endArrow=block;endFill=1;" edge="1" parent="1" source="git_pr_rules" target="git_card3">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- 4. Central Ecosystem Boundary & The 3 Tracks -->
        <mxCell id="boundary_box" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFF8F0;strokeColor=#F6AD55;strokeWidth=2;arcSize=2;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="425" y="90" width="820" height="670" as="geometry" />
        </mxCell>
        <mxCell id="boundary_title" value="&lt;b style='font-size:14px;color:#B45309;'&gt;SECURE MANAGED GEMINI ENTERPRISE ECOSYSTEM BOUNDARY (VPC Service Controls)&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="445" y="100" width="780" height="25" as="geometry" />
        </mxCell>

        <!-- Ingress Connectors (Git to Tracks) with Red Diamond Badges -->
        <mxCell id="arr_in1" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1" source="git_card1" target="track1_ci">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="badge_in1" value="&lt;span style='font-size:16px;color:#DC2626;'&gt;♦&lt;/span&gt;&lt;br&gt;&lt;font style='font-size:10px;color:#333;'&gt;Git commit&lt;br&gt;(Data Eng)&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="425" y="245" width="80" height="40" as="geometry" />
        </mxCell>

        <mxCell id="arr_in2" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1" source="git_card2" target="track2_ci">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="badge_in2" value="&lt;span style='font-size:16px;color:#DC2626;'&gt;♦&lt;/span&gt;&lt;br&gt;&lt;font style='font-size:10px;color:#333;'&gt;Git commit&lt;br&gt;(App Dev)&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="425" y="375" width="80" height="40" as="geometry" />
        </mxCell>

        <mxCell id="arr_in3" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1" source="git_card3" target="track3_ci">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="badge_in3" value="&lt;span style='font-size:16px;color:#DC2626;'&gt;♦&lt;/span&gt;&lt;br&gt;&lt;font style='font-size:10px;color:#333;'&gt;ML Eng&lt;br&gt;Git commit&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="425" y="605" width="80" height="40" as="geometry" />
        </mxCell>

        <!-- Cross-Track Connector: Track 1 CI down to Track 2 CI -->
        <mxCell id="arr_cross_track" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1.2;endArrow=block;endFill=1;" edge="1" parent="1" source="track1_ci" target="track2_ci">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="500" y="240" />
              <mxPoint x="500" y="450" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="cross_lbl" value="&lt;font style='font-size:11px;color:#333;'&gt;Data&lt;br&gt;availability&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="450" y="325" width="60" height="30" as="geometry" />
        </mxCell>

        <!-- TRACK 1: DATA ENGINEERING & DIMENSIONAL MODELING FLOW -->
        <mxCell id="track1_box" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.2;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="510" y="135" width="720" height="195" as="geometry" />
        </mxCell>
        <mxCell id="track1_title" value="&lt;b style='font-size:13px;color:#202124;'&gt;TRACK 1: DATA ENGINEERING &amp;amp; DIMENSIONAL MODELING FLOW (DFD/ERD Lifecycle)&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="520" y="145" width="700" height="20" as="geometry" />
        </mxCell>
        <mxCell id="track1_ci" value="&lt;b style='font-size:13px;color:#0369A1;'&gt;CI&lt;/b&gt;&lt;div style='text-align:left;font-size:11px;color:#333;padding-left:10px;'&gt;• Automated unit tests on&lt;br&gt;&amp;nbsp;&amp;nbsp;dbt models&lt;br&gt;• Data quality tests on private&lt;br&gt;&amp;nbsp;&amp;nbsp;VPC-SC BigQuery and GCS structures&lt;br&gt;• Security config scan&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#E0F2FE;strokeColor=#0284C7;strokeWidth=1.2;fontFamily=Helvetica;verticalAlign=top;paddingTop=8;" vertex="1" parent="1">
          <mxGeometry x="530" y="180" width="300" height="115" as="geometry" />
        </mxCell>
        <mxCell id="track1_cd" value="&lt;b style='font-size:13px;color:#0369A1;'&gt;CD: Terraform/ArgoCD&lt;/b&gt;&lt;div style='text-align:left;font-size:11px;color:#333;padding-left:10px;'&gt;• Terraform/ArgoCD applies updates to&lt;br&gt;&amp;nbsp;&amp;nbsp;BigQuery datasets&lt;br&gt;• GCS buckets&lt;br&gt;• dbt scheduler config&lt;/div&gt;&lt;div style='text-align:right;font-size:10px;color:#64748B;font-style:italic;margin-top:5px;'&gt;private VPC&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#E0F2FE;strokeColor=#0284C7;strokeWidth=1.2;fontFamily=Helvetica;verticalAlign=top;paddingTop=8;" vertex="1" parent="1">
          <mxGeometry x="910" y="180" width="300" height="115" as="geometry" />
        </mxCell>
        <mxCell id="track1_icons" value="&lt;span style='font-size:20px;'&gt;🔍 🗄️&lt;/span&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=right;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="1145" y="220" width="55" height="30" as="geometry" />
        </mxCell>
        <mxCell id="arr_tr1" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1" source="track1_ci" target="track1_cd">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="lbl_tr1" value="&lt;font style='font-size:11px;color:#333;'&gt;CI Passed&lt;br&gt;Triggers&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="840" y="215" width="60" height="40" as="geometry" />
        </mxCell>
        <mxCell id="track1_fn" value="&lt;font style='font-size:10px;font-style:italic;color:#64748B;'&gt;*References image 3 (Data Pipeline) and 7 (ERD) operations here.&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="530" y="305" width="400" height="20" as="geometry" />
        </mxCell>

        <!-- TRACK 2: APPLICATION DEVELOPMENT & COGNITIVE ARCHITECTURE FLOW -->
        <mxCell id="track2_box" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.2;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="510" y="345" width="720" height="195" as="geometry" />
        </mxCell>
        <mxCell id="track2_title" value="&lt;b style='font-size:13px;color:#202124;'&gt;TRACK 2: APPLICATION DEVELOPMENT &amp;amp; COGNITIVE ARCHITECTURE FLOW (App Code Flow)&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="520" y="355" width="700" height="20" as="geometry" />
        </mxCell>
        <mxCell id="track2_ci" value="&lt;b style='font-size:13px;color:#0369A1;'&gt;CI&lt;/b&gt;&lt;div style='text-align:left;font-size:11px;color:#333;padding-left:10px;'&gt;• Building Docker images&lt;br&gt;• App unit tests&lt;br&gt;• Security vulnerability dependency scan&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#E0F2FE;strokeColor=#0284C7;strokeWidth=1.2;fontFamily=Helvetica;verticalAlign=top;paddingTop=8;" vertex="1" parent="1">
          <mxGeometry x="530" y="390" width="300" height="115" as="geometry" />
        </mxCell>
        <mxCell id="track2_cd" value="&lt;b style='font-size:13px;color:#0369A1;'&gt;CD: Terraform&lt;/b&gt;&lt;div style='text-align:left;font-size:11px;color:#333;padding-left:10px;'&gt;• Terraform applies updates to&lt;br&gt;• API Gateway config&lt;br&gt;• GKE manifest&lt;br&gt;• Deployment config within&lt;/div&gt;&lt;div style='text-align:right;font-size:10px;color:#64748B;font-style:italic;margin-top:2px;'&gt;private VPC&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#E0F2FE;strokeColor=#0284C7;strokeWidth=1.2;fontFamily=Helvetica;verticalAlign=top;paddingTop=8;" vertex="1" parent="1">
          <mxGeometry x="910" y="390" width="300" height="115" as="geometry" />
        </mxCell>
        <mxCell id="track2_icons" value="&lt;span style='font-size:22px;'&gt;⚙️&lt;/span&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=right;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="1155" y="430" width="45" height="30" as="geometry" />
        </mxCell>
        <mxCell id="arr_tr2" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1" source="track2_ci" target="track2_cd">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="lbl_tr2" value="&lt;font style='font-size:11px;color:#333;'&gt;CI Passed&lt;br&gt;Triggers&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="840" y="425" width="60" height="40" as="geometry" />
        </mxCell>
        <mxCell id="track2_fn" value="&lt;font style='font-size:10px;font-style:italic;color:#64748B;'&gt;*References image 5 (Cognitive Architecture) and 1 (Agent ReAct loop) operations here.&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="530" y="515" width="450" height="20" as="geometry" />
        </mxCell>

        <!-- TRACK 3: MLOps LIFECYCLE (ML/AI TRAINING FLOW) -->
        <mxCell id="track3_box" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.2;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="510" y="555" width="720" height="185" as="geometry" />
        </mxCell>
        <mxCell id="track3_title" value="&lt;b style='font-size:13px;color:#202124;'&gt;TRACK 3: MLOps LIFECYCLE (ML/AI TRAINING FLOW)&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="520" y="565" width="700" height="20" as="geometry" />
        </mxCell>
        <mxCell id="track3_ci" value="&lt;b style='font-size:13px;color:#0369A1;'&gt;CI (ML)&lt;/b&gt;&lt;div style='text-align:left;font-size:11px;color:#333;padding-left:10px;'&gt;• Model training script test&lt;br&gt;• Validation of hyperparameter configs&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#E0F2FE;strokeColor=#0284C7;strokeWidth=1.2;fontFamily=Helvetica;verticalAlign=top;paddingTop=8;" vertex="1" parent="1">
          <mxGeometry x="530" y="595" width="300" height="110" as="geometry" />
        </mxCell>
        <mxCell id="track3_cd" value="&lt;b style='font-size:13px;color:#0369A1;'&gt;Training Loop&lt;/b&gt;&lt;div style='text-align:left;font-size:11px;color:#333;padding-left:10px;'&gt;• Pushes ML training job to private Vertex AI Training executing on GPU clusters&lt;/div&gt;&lt;div style='text-align:right;font-size:10px;color:#64748B;font-style:italic;margin-top:10px;'&gt;private VPC&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#E0F2FE;strokeColor=#0284C7;strokeWidth=1.2;fontFamily=Helvetica;verticalAlign=top;paddingTop=8;" vertex="1" parent="1">
          <mxGeometry x="910" y="595" width="300" height="110" as="geometry" />
        </mxCell>
        <mxCell id="arr_tr3" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1" source="track3_ci" target="track3_cd">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="lbl_tr3" value="&lt;font style='font-size:11px;color:#333;'&gt;CI Passed&lt;br&gt;Triggers&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="840" y="625" width="60" height="40" as="geometry" />
        </mxCell>
        <mxCell id="track3_fn" value="&lt;font style='font-size:10px;font-style:italic;color:#64748B;'&gt;*References image 3 (Training loop) operations here.&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="530" y="715" width="350" height="20" as="geometry" />
        </mxCell>

        <!-- 5. Column 4: PHASE 4: EVALUATION, GOVERNANCE & PROMOTION FLOW -->
        <mxCell id="col_gov" value="&lt;b style='font-size:13px;color:#202124;'&gt;PHASE 4: EVALUATION, GOVERNANCE&lt;br&gt;&amp;amp; PROMOTION FLOW&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.5;arcSize=3;fontFamily=Helvetica;verticalAlign=top;paddingTop=12;" vertex="1" parent="1">
          <mxGeometry x="1255" y="90" width="235" height="670" as="geometry" />
        </mxCell>
        <mxCell id="gov_hil" value="&lt;b style='font-size:14px;color:#202124;'&gt;Human-in-the-Loop&lt;br&gt;Governance&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.2;fontFamily=Helvetica;verticalAlign=top;paddingTop=10;" vertex="1" parent="1">
          <mxGeometry x="1265" y="235" width="215" height="360" as="geometry" />
        </mxCell>
        <mxCell id="arr_cd1_gov" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1.2;endArrow=block;endFill=1;" edge="1" parent="1" source="track1_cd" target="gov_hil">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="1265" y="270" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="arr_cd2_gov" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1.2;endArrow=block;endFill=1;" edge="1" parent="1" source="track2_cd" target="gov_hil">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="arr_cd3_gov" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1.2;endArrow=block;endFill=1;" edge="1" parent="1" source="track3_cd" target="gov_hil">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="1265" y="560" as="targetPoint" />
          </mxGeometry>
        </mxCell>

        <!-- Internal Flow inside Human-in-the-Loop -->
        <mxCell id="hil_eval1" value="&lt;b style='font-size:11px;color:#15803D;'&gt;Evaluated&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#16A085;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="1280" y="290" width="70" height="30" as="geometry" />
        </mxCell>
        <mxCell id="hil_app1" value="&lt;b style='font-size:11px;color:#15803D;'&gt;Approved&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#16A085;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="1395" y="290" width="70" height="30" as="geometry" />
        </mxCell>
        <mxCell id="arr_e1_a1" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#16A085;strokeWidth=1;endArrow=block;endFill=1;" edge="1" parent="1" source="hil_eval1" target="hil_app1">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="hil_lbl" value="&lt;font style='font-size:11px;color:#333;'&gt;Registry/&lt;br&gt;Conversation&lt;br&gt;Log&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="1330" y="335" width="85" height="35" as="geometry" />
        </mxCell>

        <mxCell id="hil_eval2" value="&lt;b style='font-size:11px;color:#15803D;'&gt;Evaluated&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#16A085;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="1280" y="380" width="70" height="30" as="geometry" />
        </mxCell>
        <mxCell id="hil_app2" value="&lt;b style='font-size:11px;color:#15803D;'&gt;Approved&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#16A085;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="1395" y="380" width="70" height="30" as="geometry" />
        </mxCell>
        <mxCell id="arr_e2_a2" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#16A085;strokeWidth=1;endArrow=block;endFill=1;" edge="1" parent="1" source="hil_eval2" target="hil_app2">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="hil_out_lbl" value="&lt;font style='font-size:11px;color:#15803D;&gt;Conversation Log config&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=right;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="1335" y="425" width="135" height="20" as="geometry" />
        </mxCell>
        <mxCell id="hil_bullets" value="&lt;div style='text-align:left;font-size:11px;color:#333;padding:5px;'&gt;&lt;b&gt;Offline evaluation&lt;/b&gt;&lt;br&gt;• F1 scores, bias tests&lt;br&gt;• Hallucination metrics for&lt;br&gt;&amp;nbsp;&amp;nbsp;LLM prompts&lt;/div&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="1275" y="455" width="195" height="75" as="geometry" />
        </mxCell>

        <mxCell id="gov_promo" value="&lt;div style='text-align:left;font-size:11px;color:#15803D;padding:8px;'&gt;&lt;b&gt;Promotion:&lt;/b&gt;&lt;br&gt;Model pushed to production Model Registry and/or Conversation Log config updated&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#16A085;strokeWidth=1.2;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="1265" y="615" width="215" height="100" as="geometry" />
        </mxCell>

        <!-- 6. Column 5: PHASE 5: SECURED DEPLOYMENT & OBSERVATION FLOW -->
        <mxCell id="col_deploy" value="&lt;b style='font-size:13px;color:#202124;'&gt;PHASE 5: SECURED DEPLOYMENT &amp;amp;&lt;br&gt;OBSERVATION FLOW&lt;br&gt;&lt;font style='font-size:11px;font-weight:normal;'&gt;(Topology Flow)&lt;/font&gt;&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.5;arcSize=3;fontFamily=Helvetica;verticalAlign=top;paddingTop=12;" vertex="1" parent="1">
          <mxGeometry x="1505" y="90" width="260" height="670" as="geometry" />
        </mxCell>
        <mxCell id="deploy_badge" value="&lt;b style='font-size:10px;color:#B45309;'&gt;VPC-SC&lt;br&gt;Enforcement&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFF3E0;strokeColor=#FF9800;strokeWidth=1;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="1515" y="145" width="80" height="30" as="geometry" />
        </mxCell>
        <mxCell id="deploy_robot" value="&lt;span style='font-size:28px;'&gt;🤖&lt;/span&gt;&lt;br&gt;&lt;b style='font-size:11px;color:#B45309;'&gt;Continuous&lt;br&gt;Deployment&lt;br&gt;&lt;font style='font-size:9px;font-weight:normal;'&gt;(ArgoCD/GitOps)&lt;/font&gt;&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="1490" y="340" width="75" height="75" as="geometry" />
        </mxCell>
        <mxCell id="arr_hil_robot" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1" source="gov_hil" target="deploy_robot">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="arr_robot_topo" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1" source="deploy_robot" target="topo_box">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Deployment Topology Box (#FFF8F0 beige fill, orange outline) -->
        <mxCell id="topo_box" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFF8F0;strokeColor=#FF9800;strokeWidth=1.5;arcSize=4;" vertex="1" parent="1">
          <mxGeometry x="1560" y="170" width="190" height="360" as="geometry" />
        </mxCell>
        <mxCell id="topo_title_pill" value="&lt;b style='font-size:11px;color:#202124;'&gt;Deployment topology&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="1580" y="180" width="150" height="22" as="geometry" />
        </mxCell>
        <!-- Inner Blue Box (GKE Pods) -->
        <mxCell id="topo_gke" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#E0F2FE;strokeColor=#0284C7;strokeWidth=1.2;arcSize=4;" vertex="1" parent="1">
          <mxGeometry x="1572" y="215" width="166" height="240" as="geometry" />
        </mxCell>
        <mxCell id="gke_title" value="&lt;b style='font-size:12px;color:#0369A1;'&gt;GKE Pods&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="1580" y="222" width="150" height="20" as="geometry" />
        </mxCell>
        <!-- Dashed Nested Box -->
        <mxCell id="gke_nested" value="&lt;b style='font-size:11px;color:#0369A1;'&gt;GKE&lt;br&gt;Containers&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=none;strokeColor=#0284C7;strokeWidth=1;strokeDashArray=4 4;verticalAlign=top;paddingTop=5;" vertex="1" parent="1">
          <mxGeometry x="1582" y="248" width="146" height="190" as="geometry" />
        </mxCell>
        <mxCell id="gke_pod_icon" value="&lt;span style='font-size:24px;'&gt;🔷&lt;/span&gt;&lt;br&gt;&lt;font style='font-size:10px;color:#0369A1;'&gt;&lt;b&gt;GKE Pods&lt;/b&gt;&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="1595" y="295" width="55" height="55" as="geometry" />
        </mxCell>
        <mxCell id="api_gw_icon" value="&lt;span style='font-size:24px;'&gt;🔀&lt;/span&gt;&lt;br&gt;&lt;font style='font-size:10px;color:#0369A1;'&gt;&lt;b&gt;API Gateway&lt;/b&gt;&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="1660" y="295" width="55" height="55" as="geometry" />
        </mxCell>
        <mxCell id="waf_icon" value="&lt;span style='font-size:24px;'&gt;🛡️&lt;/span&gt;&lt;br&gt;&lt;font style='font-size:10px;color:#0369A1;'&gt;&lt;b&gt;WAF&lt;/b&gt;&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="1625" y="365" width="55" height="55" as="geometry" />
        </mxCell>
        <mxCell id="topo_canary" value="&lt;b style='font-size:12px;color:#202124;'&gt;Canary&lt;br&gt;deployment on GKE&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="1580" y="475" width="150" height="40" as="geometry" />
        </mxCell>

        <!-- Observation Box (Bottom, light green fill) -->
        <mxCell id="obs_box" value="&lt;b style='font-size:12px;color:#15803D;'&gt;Continuous Observation &amp;amp; Alerting&lt;br&gt;&lt;font style='font-size:11px;font-weight:normal;'&gt;(Datadog/Sentry/GCP Cloud Logging)&lt;/font&gt;&lt;/b&gt;&lt;div style='text-align:left;font-size:11px;color:#333;padding-left:15px;margin-top:5px;'&gt;• Inference drift&lt;br&gt;• Prompt injection attacks&lt;br&gt;• Application health&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#16A085;strokeWidth=1.2;fontFamily=Helvetica;verticalAlign=top;paddingTop=10;" vertex="1" parent="1">
          <mxGeometry x="1515" y="550" width="240" height="140" as="geometry" />
        </mxCell>

        <!-- 7. Footer Region -->
        <!-- Legend Box (Bottom inside Master Container, white box, gray border) -->
        <mxCell id="legend_box_ops" value="&lt;b style='font-size:14px;color:#202124;'&gt;Legend:&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.5;fontFamily=Helvetica;verticalAlign=top;paddingTop=8;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="40" y="775" width="1720" height="90" as="geometry" />
        </mxCell>
        <!-- Left block -->
        <mxCell id="leg_o1" value="&lt;font style='font-size:11px;color:#202124;'&gt;Managed Compute&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="legend_box_ops">
          <mxGeometry x="120" y="25" width="120" height="20" as="geometry" />
        </mxCell>
        <mxCell id="leg_o1_box" value="" style="rounded=1;fillColor=#E0F2FE;strokeColor=#0284C7;strokeWidth=1;" vertex="1" parent="legend_box_ops">
          <mxGeometry x="95" y="26" width="18" height="18" as="geometry" />
        </mxCell>

        <mxCell id="leg_o2" value="&lt;font style='font-size:11px;color:#202124;'&gt;Storage&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="legend_box_ops">
          <mxGeometry x="120" y="50" width="120" height="20" as="geometry" />
        </mxCell>
        <mxCell id="leg_o2_box" value="" style="rounded=1;fillColor=#DCFCE7;strokeColor=#16A085;strokeWidth=1;" vertex="1" parent="legend_box_ops">
          <mxGeometry x="95" y="51" width="18" height="18" as="geometry" />
        </mxCell>

        <mxCell id="leg_o3" value="&lt;font style='font-size:11px;color:#202124;'&gt;Secure boundary&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="legend_box_ops">
          <mxGeometry x="270" y="25" width="120" height="20" as="geometry" />
        </mxCell>
        <mxCell id="leg_o3_box" value="" style="rounded=1;fillColor=#FFF3E0;strokeColor=#FF9800;strokeWidth=1;" vertex="1" parent="legend_box_ops">
          <mxGeometry x="245" y="26" width="18" height="18" as="geometry" />
        </mxCell>

        <!-- Center block (Text block verbatim with exact mandated typos!) -->
        <mxCell id="leg_o_center" value="&lt;div style='font-size:11px;color:#202124;line-height:1.4;'&gt;&lt;b&gt;Key:&lt;/b&gt; CI: Automated unit tests on dbt models, data quality...&lt;br&gt;• Data quality tests - on private VPC-SC BigQuery and storage&lt;br&gt;CD: GCS, config config, updates updates and dbt sumuronts&lt;/div&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="legend_box_ops">
          <mxGeometry x="420" y="18" width="450" height="60" as="geometry" />
        </mxCell>

        <!-- Right block -->
        <mxCell id="leg_r_vpc" value="&lt;font style='font-size:11px;color:#202124;'&gt;VPC-SC Enforcement&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="legend_box_ops">
          <mxGeometry x="960" y="25" width="140" height="20" as="geometry" />
        </mxCell>
        <mxCell id="leg_r_vpc_line" value="" style="endArrow=none;strokeColor=#0284C7;strokeWidth=2;html=1;" edge="1" parent="legend_box_ops">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="920" y="35" as="sourcePoint" />
            <mxPoint x="950" y="35" as="targetPoint" />
          </mxGeometry>
        </mxCell>

        <mxCell id="leg_r_sec" value="&lt;font style='font-size:11px;color:#202124;'&gt;Securitive boundary type&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="legend_box_ops">
          <mxGeometry x="960" y="50" width="150" height="20" as="geometry" />
        </mxCell>
        <mxCell id="leg_r_sec_line" value="" style="endArrow=none;strokeColor=#FF9800;strokeWidth=2;html=1;" edge="1" parent="legend_box_ops">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="920" y="60" as="sourcePoint" />
            <mxPoint x="950" y="60" as="targetPoint" />
          </mxGeometry>
        </mxCell>

        <mxCell id="leg_r_iam" value="&lt;font style='font-size:11px;color:#202124;'&gt;IAM Roles (Role-Based Access Control)&lt;br&gt;(Model Registry and/or&lt;br&gt;Conversation Log config updated)&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="legend_box_ops">
          <mxGeometry x="1160" y="20" width="250" height="50" as="geometry" />
        </mxCell>
        <mxCell id="leg_r_iam_arr" value="" style="endArrow=block;endFill=1;strokeColor=#202124;strokeWidth=1.5;html=1;" edge="1" parent="legend_box_ops">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="1120" y="45" as="sourcePoint" />
            <mxPoint x="1150" y="45" as="targetPoint" />
          </mxGeometry>
        </mxCell>

        <!-- Bottom Banner (Outside Master Container, flush left, plain text) -->
        <mxCell id="why_works_ops" value="&lt;font style='font-size:12px;color:#202124;line-height:1.4;'&gt;&lt;b&gt;*WHY IT WORKS:&lt;/b&gt; This unified diagram allows security, SREs, and architects to immediately understand the entire operational lifecycle, dependencies, security boundaries, and human governance across all four diagram types (Data Flow, Cognitive Architecture, Topology, MLOps) ensuring total, uncompromised end-to-end design.&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="20" y="890" width="1760" height="50" as="geometry" />
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
  `.trim();
}

export function getExactGovernanceStateMachineReferenceXml(): string {
  return `
<mxfile host="embed.diagrams.net">
  <diagram id="governance_state_machine_compiled" name="UNIFIED GOVERNANCE &amp; STATE-MACHINE LIFECYCLE">
    <mxGraphModel dx="1850" dy="1050" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1850" pageHeight="1050" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- 1. Header Region -->
        <mxCell id="main_title_bar" value="&lt;div style='text-align:left;padding-left:20px;font-size:16px;color:#FFFFFF;'&gt;&lt;b&gt;UNIFIED GOVERNANCE &amp;amp; STATE-MACHINE LIFECYCLE:&lt;/b&gt; &lt;span style='color:#D37324;font-weight:bold;'&gt;THE &amp;quot;WHAT STATUS&amp;quot; TOTAL SYSTEM VIEW.&lt;/span&gt;&lt;/div&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#12385B;strokeColor=#12385B;strokeWidth=1;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="20" y="20" width="1810" height="45" as="geometry" />
        </mxCell>
        <mxCell id="subtitle_banner" value="&lt;font style='font-size:13px;color:#374151;'&gt;Total end-to-end flow from Vetting to Continuous Societal &amp;amp; Regulatory Monitoring.&lt;/font&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#F3F4F6;strokeColor=#E5E7EB;strokeWidth=1;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="20" y="65" width="1810" height="30" as="geometry" />
        </mxCell>

        <!-- 2. Column 1: Initial Vetting & Modeling -->
        <mxCell id="data_vetting" value="&lt;span style='font-size:28px;'&gt;🔍&lt;/span&gt;&lt;br&gt;&lt;b style='font-size:12px;color:#FFFFFF;'&gt;DATA VETTING&lt;/b&gt;&lt;br&gt;&lt;font style='font-size:10px;color:#E5E7EB;'&gt;(Ethical Sourcing&lt;br&gt;&amp;amp; PII Check)&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#12385B;strokeColor=#0F172A;strokeWidth=1.5;fontFamily=Helvetica;shadow=1;arcSize=6;" vertex="1" parent="1">
          <mxGeometry x="40" y="130" width="160" height="90" as="geometry" />
        </mxCell>
        <mxCell id="approval_badge" value="&lt;span style='font-size:20px;'&gt;🟢&lt;/span&gt;&lt;br&gt;&lt;font style='font-size:11px;color:#15803D;font-weight:bold;'&gt;Data Governance&lt;br&gt;Approval&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=top;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="70" y="230" width="100" height="55" as="geometry" />
        </mxCell>
        <mxCell id="dim_data_model" value="&lt;span style='font-size:28px;'&gt;🗂️&lt;/span&gt;&lt;br&gt;&lt;b style='font-size:11px;color:#FFFFFF;'&gt;DIMENSIONAL&lt;br&gt;DATA MODEL&lt;br&gt;(ERD) REFERENCE&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#12385B;strokeColor=#0F172A;strokeWidth=1.5;fontFamily=Helvetica;shadow=1;arcSize=6;" vertex="1" parent="1">
          <mxGeometry x="40" y="320" width="160" height="90" as="geometry" />
        </mxCell>
        <mxCell id="model_created" value="&lt;span style='font-size:28px;'&gt;📐&lt;/span&gt;&lt;br&gt;&lt;b style='font-size:11px;color:#FFFFFF;'&gt;MODEL CREATED&lt;br&gt;(or PROMPT DESIGNED)&lt;/b&gt;&lt;br&gt;&lt;font style='font-size:10px;color:#E5E7EB;'&gt;Now versioning labels&lt;br&gt;(e.g., Prompt labels,&lt;br&gt;e.g., v1.0)&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#12385B;strokeColor=#0F172A;strokeWidth=1.5;fontFamily=Helvetica;shadow=1;arcSize=6;" vertex="1" parent="1">
          <mxGeometry x="240" y="210" width="170" height="120" as="geometry" />
        </mxCell>
        <!-- Connectors Column 1 -->
        <mxCell id="arr_vet_model" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1" source="data_vetting" target="model_created">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="220" y="175" />
              <mxPoint x="220" y="250" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="arr_dim_model" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1" source="dim_data_model" target="model_created">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="220" y="365" />
              <mxPoint x="220" y="290" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- 3. Column 2: Training, Evaluation & Audits -->
        <mxCell id="in_training" value="&lt;span style='font-size:26px;'&gt;🧠&lt;/span&gt;&lt;br&gt;&lt;b style='font-size:12px;color:#FFFFFF;'&gt;IN TRAINING&lt;br&gt;(or DEVELOPMENT)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#2A7B9B;strokeColor=#1E5A72;strokeWidth=1.5;fontFamily=Helvetica;shadow=1;arcSize=6;" vertex="1" parent="1">
          <mxGeometry x="470" y="120" width="160" height="80" as="geometry" />
        </mxCell>
        <mxCell id="evaluated" value="&lt;span style='font-size:28px;'&gt;🖥️&lt;/span&gt;&lt;br&gt;&lt;b style='font-size:11px;color:#FFFFFF;'&gt;EVALUATED&lt;br&gt;(OFFLINE METRICS)&lt;/b&gt;&lt;br&gt;&lt;font style='font-size:10px;color:#E5E7EB;'&gt;Pre-deployment validation&lt;br&gt;(e.g., accuracy, bias,&lt;br&gt;hallucination scores)&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#12385B;strokeColor=#0F172A;strokeWidth=1.5;fontFamily=Helvetica;shadow=1;arcSize=6;" vertex="1" parent="1">
          <mxGeometry x="470" y="260" width="170" height="110" as="geometry" />
        </mxCell>
        <mxCell id="bias_audit" value="&lt;span style='font-size:28px;'&gt;⚖️&lt;/span&gt;&lt;br&gt;&lt;b style='font-size:12px;color:#FFFFFF;'&gt;Bias &amp;amp;&lt;br&gt;Fairness Audit&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#D37324;strokeColor=#9C531A;strokeWidth=1.5;fontFamily=Helvetica;shadow=1;arcSize=6;" vertex="1" parent="1">
          <mxGeometry x="470" y="440" width="170" height="85" as="geometry" />
        </mxCell>
        <mxCell id="explain_badge" value="&lt;span style='font-size:18px;'&gt;🟢✔&lt;/span&gt;&lt;br&gt;&lt;font style='font-size:11px;color:#15803D;font-weight:bold;'&gt;Explainability&lt;br&gt;Report (XAI)&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=top;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="490" y="535" width="130" height="40" as="geometry" />
        </mxCell>
        <!-- Connectors Column 2 -->
        <mxCell id="arr_mod_train" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1" source="model_created" target="in_training">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="440" y="250" />
              <mxPoint x="440" y="160" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="arr_mod_eval" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1" source="model_created" target="evaluated">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="lbl_mod_eval" value="&lt;font style='font-size:10px;color:#333;'&gt;Evaluation&lt;br&gt;Accuracy/F1&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="410" y="255" width="60" height="30" as="geometry" />
        </mxCell>
        <mxCell id="arr_train_eval" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1" source="in_training" target="evaluated">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="lbl_retrain" value="&lt;b style='font-size:10px;color:#202124;'&gt;RETRAINING/REFINEMENT&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="560" y="215" width="140" height="25" as="geometry" />
        </mxCell>
        <!-- Loop between EVALUATED and Bias Audit -->
        <mxCell id="arr_eval_bias" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1" source="evaluated" target="bias_audit">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="500" y="405" />
              <mxPoint x="500" y="405" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="lbl_hew" value="&lt;font style='font-size:10px;color:#333;'&gt;Hew&lt;br&gt;Robust&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="455" y="390" width="45" height="30" as="geometry" />
        </mxCell>
        <mxCell id="arr_bias_eval" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1" source="bias_audit" target="evaluated">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="610" y="405" />
              <mxPoint x="610" y="405" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="lbl_req" value="&lt;font style='font-size:10px;color:#333;'&gt;Required&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="610" y="395" width="55" height="20" as="geometry" />
        </mxCell>

        <!-- 4. Center Section: GOVERNANCE BOUNDARY -->
        <mxCell id="gov_boundary" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F9FAFB;strokeColor=#64748B;strokeWidth=1.5;strokeDashArray=6 6;arcSize=2;" vertex="1" parent="1">
          <mxGeometry x="700" y="110" width="440" height="500" as="geometry" />
        </mxCell>
        <mxCell id="gov_title" value="&lt;b style='font-size:14px;color:#1E293B;'&gt;GOVERNANCE BOUNDARY&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="720" y="125" width="400" height="25" as="geometry" />
        </mxCell>
        <!-- Internal Stack (4 components) -->
        <mxCell id="node_a" value="&lt;b style='font-size:13px;color:#FFFFFF;'&gt;a) Compliance Audit&lt;/b&gt; &lt;font style='font-size:12px;color:#FFF;'&gt;(Regulatory)&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#D37324;strokeColor=#9C531A;strokeWidth=1.5;arcSize=50;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="730" y="165" width="380" height="45" as="geometry" />
        </mxCell>
        <mxCell id="node_b" value="&lt;div style='display:flex;align-items:center;padding:8px;'&gt;&lt;span style='font-size:36px;margin-right:15px;'&gt;🛡️👤&lt;/span&gt;&lt;div style='text-align:left;color:#FFF;'&gt;b) &lt;b style='font-size:12px;'&gt;NEW: Adversarial Red Teaming &amp;amp; Security Verification&lt;/b&gt;&lt;br&gt;&lt;font style='font-size:10px;'&gt;(Checks, model inversion, prompt injection, and hallucination safety)&lt;/font&gt;&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#2A7B9B;strokeColor=#1E5A72;strokeWidth=1.5;arcSize=6;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="730" y="225" width="380" height="110" as="geometry" />
        </mxCell>
        <mxCell id="node_c" value="&lt;div style='display:flex;align-items:center;padding:8px;'&gt;&lt;span style='font-size:32px;margin-right:15px;'&gt;👥&lt;/span&gt;&lt;div style='text-align:left;color:#FFF;'&gt;c) &lt;b style='font-size:12px;'&gt;NEW: Societal Bias &amp;amp; Ethics Audit&lt;/b&gt;&lt;br&gt;&lt;font style='font-size:10px;'&gt;(Formal verification of fairness)&lt;/font&gt;&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#2A7B9B;strokeColor=#1E5A72;strokeWidth=1.5;arcSize=6;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="730" y="350" width="380" height="80" as="geometry" />
        </mxCell>
        <mxCell id="node_d" value="&lt;b style='font-size:13px;color:#FFFFFF;'&gt;d) SRE Approval&lt;/b&gt; &lt;font style='font-size:12px;color:#FFF;'&gt;(Operational readiness)&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#D37324;strokeColor=#9C531A;strokeWidth=1.5;arcSize=50;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="730" y="445" width="380" height="45" as="geometry" />
        </mxCell>
        <!-- Footer Badges -->
        <mxCell id="badge_ethics" value="&lt;b style='font-size:12px;color:#0369A1;'&gt;AI Ethics Board&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#E0F2FE;strokeColor=#0284C7;strokeWidth=1.2;arcSize=50;" vertex="1" parent="1">
          <mxGeometry x="760" y="520" width="150" height="35" as="geometry" />
        </mxCell>
        <mxCell id="badge_sec" value="&lt;b style='font-size:12px;color:#FFFFFF;'&gt;AI Security Lead&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#475569;strokeColor=#1E293B;strokeWidth=1.2;arcSize=50;" vertex="1" parent="1">
          <mxGeometry x="930" y="520" width="150" height="35" as="geometry" />
        </mxCell>
        <!-- Human-in-the-Loop Node straddling boundary right edge -->
        <mxCell id="human_loop" value="&lt;span style='font-size:28px;'&gt;🛡️✔&lt;/span&gt;&lt;br&gt;&lt;b style='font-size:11px;color:#FFFFFF;'&gt;Human-in-the-&lt;br&gt;(Unified&lt;br&gt;Governance&lt;br&gt;Board)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#12385B;strokeColor=#0F172A;strokeWidth=1.5;fontFamily=Helvetica;shadow=1;arcSize=6;" vertex="1" parent="1">
          <mxGeometry x="1100" y="280" width="130" height="100" as="geometry" />
        </mxCell>
        <!-- Input Connector splitting into 4 -->
        <mxCell id="arr_eval_split" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1" source="evaluated" target="node_a">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="670" y="315" />
              <mxPoint x="670" y="187" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="arr_eval_split_b" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1" source="evaluated" target="node_b">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="670" y="315" />
              <mxPoint x="670" y="280" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="arr_eval_split_c" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1" source="evaluated" target="node_c">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="670" y="315" />
              <mxPoint x="670" y="390" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="arr_eval_split_d" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1" source="evaluated" target="node_d">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="670" y="315" />
              <mxPoint x="670" y="467" />
            </Array>
          </mxGeometry>
        </mxCell>
        <!-- Output Connectors merging into Human-in-the-Loop -->
        <mxCell id="arr_merge_a" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1" source="node_a" target="human_loop">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1100" y="187" />
              <mxPoint x="1100" y="300" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="arr_merge_b" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1" source="node_b" target="human_loop">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="arr_merge_c" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1" source="node_c" target="human_loop">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="arr_merge_d" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1" source="node_d" target="human_loop">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1100" y="467" />
              <mxPoint x="1100" y="360" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- 5. Column 4: Deployment & Operations -->
        <mxCell id="canary_deploy" value="&lt;span style='font-size:24px;color:#FFFFFF;&gt;%&lt;/span&gt;&lt;br&gt;&lt;b style='font-size:11px;color:#FFFFFF;'&gt;CANARY&lt;br&gt;DEPLOYMENT&lt;/b&gt;&lt;br&gt;&lt;font style='font-size:10px;color:#E5E7EB;'&gt;Canary Failure&lt;br&gt;Rollback&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#2A7B9B;strokeColor=#1E5A72;strokeWidth=1.5;fontFamily=Helvetica;shadow=1;arcSize=6;" vertex="1" parent="1">
          <mxGeometry x="1280" y="160" width="160" height="80" as="geometry" />
        </mxCell>
        <mxCell id="promoted_prod" value="&lt;span style='font-size:28px;'&gt;🚀🏢&lt;/span&gt;&lt;br&gt;&lt;b style='font-size:11px;color:#FFFFFF;'&gt;PROMOTED TO&lt;br&gt;PRODUCTION&lt;/b&gt;&lt;br&gt;&lt;font style='font-size:10px;color:#E5E7EB;'&gt;Fully deployed state&lt;br&gt;serving live traffic&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#12385B;strokeColor=#0F172A;strokeWidth=1.5;fontFamily=Helvetica;shadow=1;arcSize=6;" vertex="1" parent="1">
          <mxGeometry x="1280" y="300" width="170" height="90" as="geometry" />
        </mxCell>
        <mxCell id="multi_silo" value="&lt;span style='font-size:28px;'&gt;🗄️&lt;/span&gt;&lt;br&gt;&lt;b style='font-size:11px;color:#FFFFFF;'&gt;Multi-Silo Agentic&lt;br&gt;Workflow Tooling&lt;br&gt;Vetting&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#2A7B9B;strokeColor=#1E5A72;strokeWidth=1.5;fontFamily=Helvetica;shadow=1;arcSize=6;" vertex="1" parent="1">
          <mxGeometry x="1280" y="450" width="160" height="80" as="geometry" />
        </mxCell>
        <!-- Connectors Column 4 -->
        <mxCell id="arr_hil_canary" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1" source="human_loop" target="canary_deploy">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1255" y="330" />
              <mxPoint x="1255" y="200" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="arr_hil_prod" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1" source="human_loop" target="promoted_prod">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1255" y="330" />
              <mxPoint x="1255" y="345" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="arr_canary_prod" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1" source="canary_deploy" target="promoted_prod">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="lbl_promo_path" value="&lt;font style='font-size:10px;color:#333;'&gt;Promotion&lt;br&gt;Path&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="1370" y="260" width="55" height="30" as="geometry" />
        </mxCell>
        <!-- Rollback Loop -->
        <mxCell id="arr_rollback" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#D37324;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1" source="canary_deploy" target="human_loop">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1360" y="110" />
              <mxPoint x="1165" y="110" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="pill_rollback" value="&lt;b style='font-size:10px;color:#FFFFFF;'&gt;Canary Failure&lt;br&gt;Rollback&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=50;fillColor=#D37324;strokeColor=#9C531A;padding=4;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1215" y="95" width="95" height="30" as="geometry" />
        </mxCell>

        <!-- 6. Column 5: Continuous Monitoring & Archival -->
        <mxCell id="cont_perf_lbl" value="&lt;b style='font-size:11px;color:#202124;'&gt;1) Continuous Online Performance &amp;amp; Bias Monitoring&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="1480" y="235" width="220" height="25" as="geometry" />
        </mxCell>
        <mxCell id="drift_detect" value="&lt;div style='text-align:left;font-size:10px;color:#E5E7EB;padding-left:5px;'&gt;2)&lt;/div&gt;&lt;span style='font-size:24px;'&gt;📈&lt;/span&gt;&lt;br&gt;&lt;b style='font-size:11px;color:#FFFFFF;'&gt;Drift Detection&lt;br&gt;Monitoring&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#2A7B9B;strokeColor=#1E5A72;strokeWidth=1.5;fontFamily=Helvetica;shadow=1;arcSize=6;" vertex="1" parent="1">
          <mxGeometry x="1520" y="270" width="160" height="80" as="geometry" />
        </mxCell>
        <mxCell id="soc_reg_mon" value="&lt;div style='text-align:left;font-size:10px;color:#E5E7EB;padding-left:5px;'&gt;3)&lt;/div&gt;&lt;span style='font-size:26px;'&gt;⚖️&lt;/span&gt;&lt;br&gt;&lt;b style='font-size:11px;color:#FFFFFF;'&gt;Societal &amp;amp; Regulatory&lt;br&gt;Monitoring&lt;/b&gt;&lt;br&gt;&lt;font style='font-size:9px;color:#E5E7EB;'&gt;Constantly checks against&lt;br&gt;external changes (... new&lt;br&gt;law, changing norms)&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#2A7B9B;strokeColor=#1E5A72;strokeWidth=1.5;fontFamily=Helvetica;shadow=1;arcSize=6;" vertex="1" parent="1">
          <mxGeometry x="1520" y="380" width="170" height="110" as="geometry" />
        </mxCell>
        <mxCell id="arr_prod_drift" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1" source="promoted_prod" target="drift_detect">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1485" y="345" />
              <mxPoint x="1485" y="310" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="arr_prod_soc" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1" source="promoted_prod" target="soc_reg_mon">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1485" y="345" />
              <mxPoint x="1485" y="435" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- Archival Nodes (Far Right Stack) -->
        <mxCell id="archival_top" value="&lt;span style='font-size:24px;'&gt;📦&lt;/span&gt;&lt;br&gt;&lt;b style='font-size:10px;color:#FFFFFF;'&gt;ARCHIVAL (RETIRED)&lt;br&gt;(Safety Incident)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#12385B;strokeColor=#0F172A;strokeWidth=1.5;fontFamily=Helvetica;shadow=1;arcSize=6;" vertex="1" parent="1">
          <mxGeometry x="1710" y="270" width="120" height="80" as="geometry" />
        </mxCell>
        <mxCell id="archival_bot" value="&lt;span style='font-size:24px;'&gt;📦&lt;/span&gt;&lt;br&gt;&lt;b style='font-size:10px;color:#FFFFFF;'&gt;ARCHIVAL (RETIRED)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#12385B;strokeColor=#0F172A;strokeWidth=1.5;fontFamily=Helvetica;shadow=1;arcSize=6;" vertex="1" parent="1">
          <mxGeometry x="1710" y="520" width="120" height="80" as="geometry" />
        </mxCell>
        <!-- Trigger Connectors (4 arrows with orange pills) -->
        <mxCell id="arr_trig1" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#202124;strokeWidth=1.2;endArrow=block;endFill=1;" edge="1" parent="1" source="soc_reg_mon" target="archival_bot">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1700" y="415" />
              <mxPoint x="1700" y="540" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="pill_trig1" value="&lt;b style='font-size:9px;color:#FFFFFF;'&gt;Model Obsolescence&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=50;fillColor=#D37324;strokeColor=#9C531A;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1695" y="490" width="110" height="20" as="geometry" />
        </mxCell>
        <mxCell id="pill_trig2" value="&lt;b style='font-size:9px;color:#FFFFFF;'&gt;Regulatory Change&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=50;fillColor=#D37324;strokeColor=#9C531A;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1695" y="515" width="110" height="20" as="geometry" />
        </mxCell>
        <mxCell id="pill_trig3" value="&lt;b style='font-size:9px;color:#FFFFFF;'&gt;Societal Drift (Harm Detected)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=50;fillColor=#D37324;strokeColor=#9C531A;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1695" y="540" width="140" height="20" as="geometry" />
        </mxCell>
        <mxCell id="pill_trig4" value="&lt;b style='font-size:9px;color:#FFFFFF;'&gt;Safety Incident (Recall triggered)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=50;fillColor=#D37324;strokeColor=#9C531A;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1695" y="565" width="150" height="20" as="geometry" />
        </mxCell>
        <!-- Incident Loop Connector -->
        <mxCell id="arr_inc_loop" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#D37324;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1" source="archival_bot" target="archival_top">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1770" y="450" />
              <mxPoint x="1770" y="450" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="lbl_trig_checks" value="&lt;font style='font-size:10px;color:#202124;'&gt;3) Trigger Checks&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=right;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="1640" y="420" width="95" height="20" as="geometry" />
        </mxCell>
        <mxCell id="lbl_architv" value="&lt;font style='font-size:10px;color:#202124;'&gt;4) Architv&lt;br&gt;(Safety Incident)&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="1780" y="420" width="85" height="30" as="geometry" />
        </mxCell>

        <!-- 7. Footer Region -->
        <!-- Legend Box -->
        <mxCell id="legend_box_statemachine" value="&lt;b style='font-size:14px;color:#202124;'&gt;Legend:&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.5;fontFamily=Helvetica;verticalAlign=top;paddingTop=8;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="20" y="660" width="1810" height="130" as="geometry" />
        </mxCell>
        <!-- Column 1 -->
        <mxCell id="leg_sm_c1_1" value="&lt;font style='font-size:11px;color:#202124;'&gt;Managed Compute&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="legend_box_statemachine">
          <mxGeometry x="100" y="28" width="120" height="20" as="geometry" />
        </mxCell>
        <mxCell id="leg_sm_c1_1_box" value="" style="rounded=0;fillColor=#12385B;strokeColor=#0F172A;strokeWidth=1;" vertex="1" parent="legend_box_statemachine">
          <mxGeometry x="75" y="29" width="18" height="18" as="geometry" />
        </mxCell>

        <mxCell id="leg_sm_c1_2" value="&lt;font style='font-size:11px;color:#202124;'&gt;Storage&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="legend_box_statemachine">
          <mxGeometry x="100" y="58" width="120" height="20" as="geometry" />
        </mxCell>
        <mxCell id="leg_sm_c1_2_box" value="" style="rounded=0;fillColor=#2A7B9B;strokeColor=#1E5A72;strokeWidth=1;" vertex="1" parent="legend_box_statemachine">
          <mxGeometry x="75" y="59" width="18" height="18" as="geometry" />
        </mxCell>

        <mxCell id="leg_sm_c1_3" value="&lt;font style='font-size:11px;color:#202124;'&gt;Secure boundary&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="legend_box_statemachine">
          <mxGeometry x="100" y="88" width="120" height="20" as="geometry" />
        </mxCell>
        <mxCell id="leg_sm_c1_3_box" value="" style="rounded=0;fillColor=#D37324;strokeColor=#9C531A;strokeWidth=1;" vertex="1" parent="legend_box_statemachine">
          <mxGeometry x="75" y="89" width="18" height="18" as="geometry" />
        </mxCell>

        <!-- Column 2 -->
        <mxCell id="leg_sm_c2_1" value="&lt;font style='font-size:11px;color:#202124;'&gt;Data Type&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="legend_box_statemachine">
          <mxGeometry x="350" y="28" width="120" height="20" as="geometry" />
        </mxCell>
        <mxCell id="leg_sm_c2_1_box" value="" style="rounded=0;fillColor=#FFFFFF;strokeColor=#64748B;strokeWidth=1;" vertex="1" parent="legend_box_statemachine">
          <mxGeometry x="325" y="29" width="18" height="18" as="geometry" />
        </mxCell>

        <mxCell id="leg_sm_c2_2" value="&lt;font style='font-size:11px;color:#202124;'&gt;Data Description&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="legend_box_statemachine">
          <mxGeometry x="350" y="58" width="120" height="20" as="geometry" />
        </mxCell>
        <mxCell id="leg_sm_c2_2_box" value="" style="rounded=0;fillColor=#FFFFFF;strokeColor=#64748B;strokeWidth=1;" vertex="1" parent="legend_box_statemachine">
          <mxGeometry x="325" y="59" width="18" height="18" as="geometry" />
        </mxCell>

        <mxCell id="leg_sm_c2_3" value="&lt;font style='font-size:11px;color:#202124;'&gt;TimeRes&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="legend_box_statemachine">
          <mxGeometry x="350" y="88" width="120" height="20" as="geometry" />
        </mxCell>
        <mxCell id="leg_sm_c2_3_box" value="" style="rounded=0;fillColor=none;strokeColor=#64748B;strokeWidth=1;strokeDashArray=3 3;" vertex="1" parent="legend_box_statemachine">
          <mxGeometry x="325" y="89" width="18" height="18" as="geometry" />
        </mxCell>

        <!-- Column 3 (Crucial: Replicate exact typos Demmondiate Demendiate Relationsins!) -->
        <mxCell id="leg_sm_c3_1" value="&lt;font style='font-size:11px;color:#202124;'&gt;Key Definition&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="legend_box_statemachine">
          <mxGeometry x="600" y="28" width="150" height="20" as="geometry" />
        </mxCell>
        <mxCell id="leg_sm_c3_1_icon" value="&lt;span style='font-size:16px;'&gt;🔑&lt;/span&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="legend_box_statemachine">
          <mxGeometry x="575" y="27" width="20" height="20" as="geometry" />
        </mxCell>

        <mxCell id="leg_sm_c3_2" value="&lt;font style='font-size:11px;color:#202124;'&gt;Key Definition (FK)&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="legend_box_statemachine">
          <mxGeometry x="600" y="58" width="150" height="20" as="geometry" />
        </mxCell>
        <mxCell id="leg_sm_c3_2_icon" value="&lt;span style='font-size:16px;'&gt;🔐&lt;/span&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="legend_box_statemachine">
          <mxGeometry x="575" y="57" width="20" height="20" as="geometry" />
        </mxCell>

        <mxCell id="leg_sm_c3_3" value="&lt;font style='font-size:11px;color:#202124;'&gt;Key Demmondiate&lt;br&gt;Demendiate Relationsins&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="legend_box_statemachine">
          <mxGeometry x="600" y="88" width="180" height="28" as="geometry" />
        </mxCell>
        <mxCell id="leg_sm_c3_3_icon" value="&lt;span style='font-size:16px;'&gt;🗝️&lt;/span&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="legend_box_statemachine">
          <mxGeometry x="575" y="92" width="20" height="20" as="geometry" />
        </mxCell>

        <!-- Column 4 (Crucial: Replicate typo One-to-mankey!) -->
        <mxCell id="leg_sm_c4_1" value="&lt;font style='font-size:11px;color:#202124;'&gt;One-to-mankey&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="legend_box_statemachine">
          <mxGeometry x="900" y="28" width="150" height="20" as="geometry" />
        </mxCell>
        <mxCell id="leg_sm_c4_1_arr" value="" style="endArrow=block;endFill=1;strokeColor=#202124;strokeWidth=1.5;html=1;" edge="1" parent="legend_box_statemachine">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="860" y="38" as="sourcePoint" />
            <mxPoint x="890" y="38" as="targetPoint" />
          </mxGeometry>
        </mxCell>

        <mxCell id="leg_sm_c4_2" value="&lt;font style='font-size:11px;color:#202124;'&gt;One-to-many Relationship&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="legend_box_statemachine">
          <mxGeometry x="900" y="58" width="180" height="20" as="geometry" />
        </mxCell>
        <mxCell id="leg_sm_c4_2_arr" value="" style="endArrow=open;endFill=0;strokeColor=#202124;strokeWidth=1.5;html=1;" edge="1" parent="legend_box_statemachine">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="860" y="68" as="sourcePoint" />
            <mxPoint x="890" y="68" as="targetPoint" />
          </mxGeometry>
        </mxCell>

        <mxCell id="leg_sm_c4_3" value="&lt;font style='font-size:11px;color:#202124;'&gt;Line Type: Relationship&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="legend_box_statemachine">
          <mxGeometry x="900" y="88" width="180" height="20" as="geometry" />
        </mxCell>
        <mxCell id="leg_sm_c4_3_arr" value="" style="endArrow=none;strokeColor=#64748B;strokeWidth=1.5;strokeDashArray=3 3;html=1;" edge="1" parent="legend_box_statemachine">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="860" y="98" as="sourcePoint" />
            <mxPoint x="890" y="98" as="targetPoint" />
          </mxGeometry>
        </mxCell>

        <!-- Why It Works Box (Bottom Right / Full Width below Legend) -->
        <mxCell id="why_works_statemachine" value="&lt;font style='font-size:13px;color:#0F172A;line-height:1.4;'&gt;&lt;b&gt;WHY IT WORKS:&lt;/b&gt; This total system view ensures uncompcompromised end-to-end design, integrating ethical data sourcing, adversarial security verification, proactive societal audits, and robust post-production drift monitoring for truly complete governance and safety.&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0F9FF;strokeColor=#94A3B8;strokeWidth=1.5;fontFamily=Helvetica;display=flex;align=center;verticalAlign=middle;padding=15;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="20" y="805" width="1810" height="75" as="geometry" />
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
  `.trim();
}

export function getExactUnifiedSystemViewReferenceXml(): string {
  return `
<mxfile host="embed.diagrams.net">
  <diagram id="unified_system_view_compiled" name="ITACS Integrated Insights Platform - TOTAL UNIFIED SYSTEM VIEW">
    <mxGraphModel dx="1920" dy="1150" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1920" pageHeight="1150" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- 1. Global Header Bar -->
        <mxCell id="main_title_bar_uv" value="&lt;div style='display:flex;align-items:center;padding:5px 15px;'&gt;&lt;span style='font-size:28px;margin-right:15px;'&gt;🌐☁️&lt;/span&gt;&lt;div style='text-align:left;color:#FFFFFF;'&gt;&lt;b style='font-size:16px;'&gt;ITACS Integrated Insights Platform - TOTAL UNIFIED SYSTEM VIEW: Data, Cognition, Deployment, &amp;amp; Governance (End-to-End without Compromise).&lt;/b&gt;&lt;br&gt;&lt;font style='font-size:12px;font-weight:normal;color:#E2E8F0;'&gt;Unified Logical Flow, Technology Stack, Security Boundaries, and Operational Lifecycles&lt;/font&gt;&lt;/div&gt;&lt;/div&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#12385B;strokeColor=#12385B;strokeWidth=1;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="15" y="15" width="1890" height="50" as="geometry" />
        </mxCell>

        <!-- Top Main Label across phases (with mandated typo ultra-diate) -->
        <mxCell id="top_main_lbl_uv" value="&lt;b style='font-size:13px;color:#1E293B;'&gt;Entire ultra-diate in organizing across major phases&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="400" y="70" width="1120" height="20" as="geometry" />
        </mxCell>

        <!-- 2. Swimlane 1: PLAN & DATA FOUNDATION -->
        <mxCell id="sw1_tab" value="&lt;b style='font-size:10px;color:#FFFFFF;'&gt;Poots &amp;amp;&lt;br&gt;Planninc&lt;br&gt;Phases&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#64748B;strokeColor=#475569;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="15" y="95" width="55" height="140" as="geometry" />
        </mxCell>
        <mxCell id="sw1_box" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="75" y="95" width="1830" height="140" as="geometry" />
        </mxCell>
        <mxCell id="sw1_header" value="&lt;b style='font-size:12px;color:#0F172A;'&gt;PLAN &amp;amp; DATA FOUNDATION (Vetting &amp;amp; ERD Integration)&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="90" y="100" width="450" height="20" as="geometry" />
        </mxCell>
        <!-- Left Icons -->
        <mxCell id="sw1_proj_plan" value="&lt;span style='font-size:26px;'&gt;📋&lt;/span&gt;&lt;br&gt;&lt;b style='font-size:11px;color:#0F172A;'&gt;Project&lt;br&gt;Planning&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="95" y="125" width="80" height="75" as="geometry" />
        </mxCell>
        <mxCell id="sw1_data_vet" value="&lt;span style='font-size:26px;'&gt;🗄️✔&lt;/span&gt;&lt;br&gt;&lt;b style='font-size:11px;color:#0F172A;'&gt;Data&lt;br&gt;Vetting&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="195" y="125" width="80" height="75" as="geometry" />
        </mxCell>
        <mxCell id="sw1_eth_src" value="&lt;span style='font-size:26px;'&gt;🌿&lt;/span&gt;&lt;br&gt;&lt;b style='font-size:11px;color:#0F172A;'&gt;Ethical&lt;br&gt;Sourcing&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="295" y="125" width="80" height="75" as="geometry" />
        </mxCell>
        <!-- ERD Section (with mandated typo 'and and') -->
        <mxCell id="sw1_erd_txt" value="&lt;b style='font-size:12px;color:#0F172A;'&gt;Dimensional Data Model (ERD)&lt;/b&gt;&lt;br&gt;&lt;font style='font-size:10px;color:#475569;'&gt;(Schema for all structured,&lt;br&gt;unstructured, and and derived&lt;br&gt;AI context (Image 7 definitions))&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="395" y="125" width="220" height="80" as="geometry" />
        </mxCell>
        <!-- Miniature unreadable ERD diagram -->
        <mxCell id="sw1_erd_mini_box" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1;strokeDashArray=3 3;" vertex="1" parent="1">
          <mxGeometry x="630" y="110" width="820" height="110" as="geometry" />
        </mxCell>
        <mxCell id="sw1_erd_t1" value="&lt;b style='font-size:8px;color:#1E3A8A;'&gt;Silence&lt;/b&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;" vertex="1" parent="1"><mxGeometry x="650" y="125" width="60" height="25" as="geometry" /></mxCell>
        <mxCell id="sw1_erd_t2" value="&lt;b style='font-size:8px;color:#1E3A8A;'&gt;Source&lt;/b&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;" vertex="1" parent="1"><mxGeometry x="740" y="125" width="60" height="25" as="geometry" /></mxCell>
        <mxCell id="sw1_erd_t3" value="&lt;b style='font-size:8px;color:#1E3A8A;'&gt;Staging&lt;/b&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;" vertex="1" parent="1"><mxGeometry x="830" y="125" width="60" height="25" as="geometry" /></mxCell>
        <mxCell id="sw1_erd_t4" value="&lt;b style='font-size:8px;color:#1E3A8A;'&gt;Transform&lt;/b&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;" vertex="1" parent="1"><mxGeometry x="920" y="125" width="65" height="25" as="geometry" /></mxCell>
        <mxCell id="sw1_erd_t5" value="&lt;b style='font-size:8px;color:#1E3A8A;'&gt;Dim_Patient&lt;/b&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;" vertex="1" parent="1"><mxGeometry x="1015" y="125" width="70" height="25" as="geometry" /></mxCell>
        <mxCell id="sw1_erd_t6" value="&lt;b style='font-size:8px;color:#1E3A8A;'&gt;Fact_Clinical&lt;/b&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;" vertex="1" parent="1"><mxGeometry x="1115" y="125" width="70" height="25" as="geometry" /></mxCell>
        <mxCell id="sw1_erd_t7" value="&lt;b style='font-size:8px;color:#1E3A8A;'&gt;Raw Data&lt;/b&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;" vertex="1" parent="1"><mxGeometry x="740" y="175" width="60" height="25" as="geometry" /></mxCell>
        <mxCell id="sw1_erd_t8" value="&lt;b style='font-size:8px;color:#1E3A8A;'&gt;Derived&lt;/b&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;" vertex="1" parent="1"><mxGeometry x="1015" y="175" width="70" height="25" as="geometry" /></mxCell>
        <mxCell id="arr_m1" value="" style="endArrow=none;strokeColor=#94A3B8;strokeWidth=1;html=1;" edge="1" parent="1" source="sw1_erd_t1" target="sw1_erd_t2"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="arr_m2" value="" style="endArrow=none;strokeColor=#94A3B8;strokeWidth=1;html=1;" edge="1" parent="1" source="sw1_erd_t2" target="sw1_erd_t3"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="arr_m3" value="" style="endArrow=none;strokeColor=#94A3B8;strokeWidth=1;html=1;" edge="1" parent="1" source="sw1_erd_t3" target="sw1_erd_t4"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="arr_m4" value="" style="endArrow=none;strokeColor=#94A3B8;strokeWidth=1;html=1;" edge="1" parent="1" source="sw1_erd_t4" target="sw1_erd_t5"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="arr_m5" value="" style="endArrow=none;strokeColor=#94A3B8;strokeWidth=1;html=1;" edge="1" parent="1" source="sw1_erd_t5" target="sw1_erd_t6"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="arr_m6" value="" style="endArrow=none;strokeColor=#94A3B8;strokeWidth=1;html=1;" edge="1" parent="1" source="sw1_erd_t2" target="sw1_erd_t7"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="arr_m7" value="" style="endArrow=none;strokeColor=#94A3B8;strokeWidth=1;html=1;" edge="1" parent="1" source="sw1_erd_t5" target="sw1_erd_t8"><mxGeometry relative="1" as="geometry" /></mxCell>

        <!-- VPC Boundary Anchor (Far Right) -->
        <mxCell id="sw1_vpc_anchor" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F3F4F6;strokeColor=#64748B;strokeWidth=1.5;strokeDashArray=6 6;" vertex="1" parent="1">
          <mxGeometry x="1480" y="98" width="415" height="135" as="geometry" />
        </mxCell>
        <mxCell id="sw1_vpc_anchor_lbl" value="&lt;b style='font-size:11px;color:#1E293B;'&gt;VPC Service Controls Perimeter&lt;br&gt;(Secure Managed Environment)&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=right;verticalAlign=top;whiteSpace=wrap;rounded=0;padding=8;" vertex="1" parent="1">
          <mxGeometry x="1630" y="105" width="250" height="40" as="geometry" />
        </mxCell>

        <!-- 3. Swimlane 2: DEVELOPMENT & AI LIFECYCLE -->
        <!-- Left Tab with mandated typos: insograto4 MLOps(L)MLOps State Machine & Pipalinos -->
        <mxCell id="sw2_tab" value="&lt;b style='font-size:9px;color:#FFFFFF;'&gt;DEVELOPMENT&lt;br&gt;&amp;amp; AI LIFECYCLE&lt;br&gt;(insograto4&lt;br&gt;MLOps(L)MLOps&lt;br&gt;State Machine &amp;amp;&lt;br&gt;Pipalinos)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#475569;strokeColor=#334155;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="15" y="245" width="55" height="295" as="geometry" />
        </mxCell>
        <mxCell id="sw2_box" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="75" y="245" width="1830" height="295" as="geometry" />
        </mxCell>

        <!-- Track 2a: DATA ENGINEERING & DFD -->
        <mxCell id="t2a_hdr" value="&lt;b style='font-size:11px;color:#0F172A;'&gt;Track 2a: DATA ENGINEERING &amp;amp; DFD&lt;/b&gt; &lt;font style='font-size:10px;color:#64748B;'&gt;(References image 3)&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="85" y="250" width="350" height="20" as="geometry" />
        </mxCell>
        <!-- Silo Stack (5 dark teal pills) -->
        <mxCell id="t2a_p1" value="&lt;b style='font-size:10px;color:#FFFFFF;'&gt;Market Research&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=50;fillColor=#0F766E;strokeColor=#115E59;" vertex="1" parent="1"><mxGeometry x="85" y="278" width="110" height="28" as="geometry" /></mxCell>
        <mxCell id="t2a_p2" value="&lt;b style='font-size:10px;color:#FFFFFF;'&gt;Access&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=50;fillColor=#0F766E;strokeColor=#115E59;" vertex="1" parent="1"><mxGeometry x="85" y="320" width="110" height="28" as="geometry" /></mxCell>
        <mxCell id="t2a_p3" value="&lt;b style='font-size:10px;color:#FFFFFF;'&gt;Outcomes&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=50;fillColor=#0F766E;strokeColor=#115E59;" vertex="1" parent="1"><mxGeometry x="85" y="362" width="110" height="28" as="geometry" /></mxCell>
        <mxCell id="t2a_p4" value="&lt;b style='font-size:10px;color:#FFFFFF;'&gt;Medical&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=50;fillColor=#0F766E;strokeColor=#115E59;" vertex="1" parent="1"><mxGeometry x="85" y="404" width="110" height="28" as="geometry" /></mxCell>
        <mxCell id="t2a_p5" value="&lt;b style='font-size:10px;color:#FFFFFF;'&gt;Competitive Intel&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=50;fillColor=#0F766E;strokeColor=#115E59;" vertex="1" parent="1"><mxGeometry x="85" y="446" width="110" height="28" as="geometry" /></mxCell>
        <!-- Raw Data Block -->
        <mxCell id="t2a_raw_box" value="&lt;b style='font-size:11px;color:#0F172A;'&gt;Raw Data&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.5;strokeDashArray=3 3;verticalAlign=top;paddingTop=5;" vertex="1" parent="1">
          <mxGeometry x="215" y="278" width="115" height="196" as="geometry" />
        </mxCell>
        <mxCell id="t2a_raw_sf" value="&lt;span style='font-size:20px;'&gt;☁️&lt;/span&gt;&lt;br&gt;&lt;font style='font-size:9px;color:#0369A1;'&gt;Salesforce&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1"><mxGeometry x="225" y="305" width="95" height="40" as="geometry" /></mxCell>
        <mxCell id="t2a_raw_pg" value="&lt;span style='font-size:20px;'&gt;🛢️&lt;/span&gt;&lt;br&gt;&lt;font style='font-size:9px;color:#0369A1;'&gt;Postgres&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1"><mxGeometry x="225" y="355" width="95" height="40" as="geometry" /></mxCell>
        <mxCell id="t2a_raw_uf" value="&lt;span style='font-size:20px;'&gt;📄&lt;/span&gt;&lt;br&gt;&lt;font style='font-size:9px;color:#0369A1;'&gt;Unstructured Files&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1"><mxGeometry x="225" y="405" width="95" height="40" as="geometry" /></mxCell>
        <!-- Connectors Track 2a -->
        <mxCell id="arr_silos_raw" value="" style="endArrow=block;endFill=1;strokeColor=#475569;strokeWidth=1.5;html=1;" edge="1" parent="1" source="t2a_p3" target="t2a_raw_box"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="arr_raw_lake" value="" style="endArrow=block;endFill=1;strokeColor=#475569;strokeWidth=1.5;html=1;" edge="1" parent="1" source="t2a_raw_box" target="t2a_lake"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="t2a_vpc_pill" value="&lt;b style='font-size:10px;color:#FFFFFF;'&gt;VPC-SC&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=50;fillColor=#F97316;strokeColor=#C2410C;padding=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="345" y="340" width="65" height="22" as="geometry" />
        </mxCell>
        <mxCell id="t2a_lake" value="&lt;span style='font-size:24px;'&gt;🪣&lt;/span&gt;&lt;br&gt;&lt;b style='font-size:11px;color:#0369A1;'&gt;GCS Secure Bucket&lt;br&gt;(Raw Data Lake)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="375" y="365" width="135" height="90" as="geometry" />
        </mxCell>

        <!-- Track 2b: FEATURE ENGINEERING FLOW -->
        <mxCell id="t2b_hdr" value="&lt;b style='font-size:11px;color:#0F172A;'&gt;Track 2b: FEATURE ENGINEERING FLOW&lt;/b&gt; &lt;font style='font-size:10px;color:#64748B;'&gt;(References image 3)&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="530" y="250" width="350" height="20" as="geometry" />
        </mxCell>
        <mxCell id="t2b_trans_box" value="&lt;b style='font-size:11px;color:#15803D;'&gt;Circular Transformation&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#22C55E;strokeWidth=1.5;verticalAlign=top;paddingTop=6;" vertex="1" parent="1">
          <mxGeometry x="530" y="278" width="190" height="220" as="geometry" />
        </mxCell>
        <mxCell id="t2b_c1" value="&lt;b style='font-size:10px;color:#15803D;'&gt;Clean&lt;/b&gt;" style="ellipse;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#16A34A;" vertex="1" parent="1"><mxGeometry x="545" y="310" width="65" height="50" as="geometry" /></mxCell>
        <mxCell id="t2b_c2" value="&lt;b style='font-size:10px;color:#15803D;'&gt;Normalize&lt;/b&gt;" style="ellipse;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#16A34A;" vertex="1" parent="1"><mxGeometry x="640" y="310" width="65" height="50" as="geometry" /></mxCell>
        <mxCell id="t2b_c3" value="&lt;b style='font-size:10px;color:#15803D;'&gt;Aggregate&lt;/b&gt;" style="ellipse;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#16A34A;" vertex="1" parent="1"><mxGeometry x="545" y="380" width="65" height="50" as="geometry" /></mxCell>
        <mxCell id="t2b_c4" value="&lt;b style='font-size:10px;color:#15803D;'&gt;Encode&lt;/b&gt;" style="ellipse;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#16A34A;" vertex="1" parent="1"><mxGeometry x="640" y="380" width="65" height="50" as="geometry" /></mxCell>
        <mxCell id="t2b_dbt" value="&lt;span style='font-size:16px;'&gt;❌🛢️&lt;/span&gt; &lt;b style='font-size:10px;color:#0F172A;'&gt;dbt models&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="550" y="450" width="150" height="30" as="geometry" />
        </mxCell>
        <!-- Connectors Track 2b -->
        <mxCell id="arr_lake_trans" value="" style="endArrow=block;endFill=1;strokeColor=#475569;strokeWidth=1.5;html=1;" edge="1" parent="1" source="t2a_lake" target="t2b_trans_box"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="arr_trans_feat" value="" style="endArrow=block;endFill=1;strokeColor=#475569;strokeWidth=1.5;html=1;" edge="1" parent="1" source="t2b_trans_box" target="t2b_feat_store"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="t2b_sql_lbl" value="&lt;b style='font-size:10px;color:#333;'&gt;dbt/SQL&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="725" y="365" width="60" height="20" as="geometry" />
        </mxCell>
        <mxCell id="t2b_feat_store" value="&lt;span style='font-size:24px;'&gt;🗃️&lt;/span&gt;&lt;br&gt;&lt;b style='font-size:11px;color:#15803D;'&gt;Managed&lt;br&gt;Feature Store&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="785" y="365" width="115" height="90" as="geometry" />
        </mxCell>

        <!-- Track 2c: AI MODEL & PROMPT DEVELOPMENT LIFECYCLE -->
        <mxCell id="t2c_hdr" value="&lt;b style='font-size:11px;color:#0F172A;'&gt;Track 2c: AI MODEL &amp;amp; PROMPT DEVELOPMENT LIFECYCLE&lt;/b&gt; &lt;font style='font-size:10px;color:#64748B;'&gt;(References image 15 &amp;amp; 3)&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="920" y="250" width="550" height="20" as="geometry" />
        </mxCell>
        <!-- Governance Boundary Box with mandated typo incogporating -->
        <mxCell id="t2c_gov_box" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=1.5;strokeDashArray=6 6;" vertex="1" parent="1">
          <mxGeometry x="920" y="278" width="810" height="240" as="geometry" />
        </mxCell>
        <mxCell id="t2c_gov_title" value="&lt;b style='font-size:11px;color:#1D4ED8;'&gt;Governance Boundary incogporating the full unified audits from Image 15&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;whiteSpace=wrap;rounded=0;padding=6;" vertex="1" parent="1">
          <mxGeometry x="935" y="285" width="600" height="25" as="geometry" />
        </mxCell>
        <!-- Internal Flow inside Governance Boundary -->
        <mxCell id="t2c_cyl_gcs" value="&lt;b style='font-size:9px;color:#0369A1;'&gt;GCS&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#E0F2FE;strokeColor=#0284C7;" vertex="1" parent="1"><mxGeometry x="935" y="325" width="65" height="35" as="geometry" /></mxCell>
        <mxCell id="t2c_cyl_bq" value="&lt;b style='font-size:9px;color:#15803D;'&gt;BigQuery&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#16A34A;" vertex="1" parent="1"><mxGeometry x="935" y="380" width="65" height="35" as="geometry" /></mxCell>
        <mxCell id="t2c_mod_reg" value="&lt;b style='font-size:10px;color:#0F172A;'&gt;Model Registry&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1"><mxGeometry x="915" y="430" width="105" height="25" as="geometry" /></mxCell>

        <mxCell id="t2c_vet" value="&lt;span style='font-size:24px;'&gt;🔍&lt;/span&gt;&lt;br&gt;&lt;b style='font-size:10px;color:#FFFFFF;'&gt;DATA&lt;br&gt;VETTING&lt;/b&gt;" style="ellipse;whiteSpace=wrap;html=1;fillColor=#1E3A8A;strokeColor=#172554;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1025" y="340" width="75" height="75" as="geometry" />
        </mxCell>
        <mxCell id="t2c_created" value="&lt;b style='font-size:11px;color:#0369A1;'&gt;CREATED&lt;br&gt;(Model/Prompt)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#E0F2FE;strokeColor=#0284C7;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1125" y="342" width="110" height="70" as="geometry" />
        </mxCell>
        <mxCell id="t2c_training" value="&lt;b style='font-size:11px;color:#FFFFFF;'&gt;TRAINING&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:20px;'&gt;🔄&lt;/span&gt;&lt;br&gt;&lt;font style='font-size:9px;color:#E0F2FE;'&gt;Retraining/&lt;br&gt;Refinement Loop&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E3A8A;strokeColor=#172554;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1265" y="325" width="130" height="105" as="geometry" />
        </mxCell>
        <mxCell id="t2c_eval" value="&lt;b style='font-size:11px;color:#0369A1;'&gt;EVALUATED&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#E0F2FE;strokeColor=#0284C7;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1425" y="342" width="105" height="70" as="geometry" />
        </mxCell>
        <!-- Bias & Fairness Audit with mandated gibberish Metripls metica -->
        <mxCell id="t2c_eval_sub" value="&lt;b style='font-size:10px;color:#0F172A;'&gt;Bias &amp;amp; Fairness Audit&lt;/b&gt;&lt;br&gt;&lt;font style='font-size:9px;color:#64748B;'&gt;Metripls metica&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="1410" y="420" width="135" height="35" as="geometry" />
        </mxCell>

        <mxCell id="t2c_hil" value="&lt;span style='font-size:22px;'&gt;🛡️👤&lt;/span&gt;&lt;br&gt;&lt;b style='font-size:10px;color:#0369A1;'&gt;Human-in-the-Loop&lt;br&gt;(Unified Governance&lt;br&gt;Board)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#E0F2FE;strokeColor=#0284C7;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1560" y="335" width="130" height="85" as="geometry" />
        </mxCell>
        <mxCell id="t2c_acc_lbl" value="&lt;b style='font-size:9px;color:#333;'&gt;Accuracy/F1&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="1525" y="355" width="40" height="20" as="geometry" />
        </mxCell>

        <mxCell id="t2c_appr" value="&lt;b style='font-size:12px;color:#FFFFFF;'&gt;APPROVED&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=50;fillColor=#15803D;strokeColor=#146C43;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1710" y="355" width="95" height="42" as="geometry" />
        </mxCell>
        <!-- 3 tiny floating badges above APPROVED -->
        <mxCell id="t2c_b_comp" value="&lt;b style='font-size:8px;color:#1E3A8A;'&gt;Compliance&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=50;fillColor=#DBEAFE;strokeColor=#3B82F6;padding=2;" vertex="1" parent="1"><mxGeometry x="1690" y="325" width="65" height="18" as="geometry" /></mxCell>
        <mxCell id="t2c_b_adv" value="&lt;b style='font-size:8px;color:#1E3A8A;'&gt;Adversarial&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=50;fillColor=#DBEAFE;strokeColor=#3B82F6;padding=2;" vertex="1" parent="1"><mxGeometry x="1758" y="325" width="65" height="18" as="geometry" /></mxCell>
        <mxCell id="t2c_b_bias" value="&lt;b style='font-size:8px;color:#1E3A8A;'&gt;Bias&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=50;fillColor=#DBEAFE;strokeColor=#3B82F6;padding=2;" vertex="1" parent="1"><mxGeometry x="1826" y="325" width="45" height="18" as="geometry" /></mxCell>
        <mxCell id="t2c_gke_inf" value="&lt;font style='font-size:10px;color:#0369A1;font-weight:bold;'&gt;GKE inference compute&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="1695" y="405" width="125" height="20" as="geometry" />
        </mxCell>

        <!-- Connectors inside Track 2c -->
        <mxCell id="arr_feat_vet" value="" style="endArrow=block;endFill=1;strokeColor=#475569;strokeWidth=1.5;html=1;" edge="1" parent="1" source="t2b_feat_store" target="t2c_vet"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="arr_vet_cre" value="" style="endArrow=block;endFill=1;strokeColor=#475569;strokeWidth=1.5;html=1;" edge="1" parent="1" source="t2c_vet" target="t2c_created"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="arr_cre_trn" value="" style="endArrow=block;endFill=1;strokeColor=#475569;strokeWidth=1.5;html=1;" edge="1" parent="1" source="t2c_created" target="t2c_training"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="arr_trn_evl" value="" style="endArrow=block;endFill=1;strokeColor=#475569;strokeWidth=1.5;html=1;" edge="1" parent="1" source="t2c_training" target="t2c_eval"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="arr_evl_hil" value="" style="endArrow=block;endFill=1;strokeColor=#475569;strokeWidth=1.5;html=1;" edge="1" parent="1" source="t2c_eval" target="t2c_hil"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="arr_hil_app" value="" style="endArrow=block;endFill=1;strokeColor=#475569;strokeWidth=1.5;html=1;" edge="1" parent="1" source="t2c_hil" target="t2c_appr"><mxGeometry relative="1" as="geometry" /></mxCell>
        <!-- Loop inside boundary -->
        <mxCell id="arr_evl_trn_loop" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#1E3A8A;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1" source="t2c_eval" target="t2c_training">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1475" y="475" />
              <mxPoint x="1330" y="475" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="t2c_off_lbl" value="&lt;font style='font-size:9px;color:#333;'&gt;Offline Metrics&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="1360" y="480" width="80" height="20" as="geometry" />
        </mxCell>

        <!-- Deployment outside dashed box (Canary & Promote) -->
        <mxCell id="t2c_canary" value="&lt;b style='font-size:11px;color:#FFFFFF;'&gt;Canary&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=50;fillColor=#0F766E;strokeColor=#115E59;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1745" y="450" width="70" height="35" as="geometry" />
        </mxCell>
        <mxCell id="t2c_promote" value="&lt;b style='font-size:11px;color:#FFFFFF;'&gt;Promote&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=50;fillColor=#0F766E;strokeColor=#115E59;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1825" y="450" width="70" height="35" as="geometry" />
        </mxCell>
        <mxCell id="arr_app_can" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#475569;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1" source="t2c_appr" target="t2c_canary"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="arr_can_pro" value="" style="endArrow=block;endFill=1;strokeColor=#475569;strokeWidth=1.5;html=1;" edge="1" parent="1" source="t2c_canary" target="t2c_promote"><mxGeometry relative="1" as="geometry" /></mxCell>
        <!-- Loops back -->
        <mxCell id="arr_pro_can_loop" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#D37324;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1" source="t2c_promote" target="t2c_canary">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1860" y="510" />
              <mxPoint x="1780" y="510" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="t2c_lbl_rb_pro" value="&lt;font style='font-size:9px;color:#C2410C;'&gt;Rollback Promotion&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="1775" y="512" width="95" height="20" as="geometry" />
        </mxCell>
        <mxCell id="arr_can_cre_loop" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#D37324;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1" source="t2c_canary" target="t2c_created">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="1780" y="530" />
              <mxPoint x="1180" y="530" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="t2c_lbl_exp_rb" value="&lt;font style='font-size:9px;color:#C2410C;'&gt;Explicit rollback&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="1440" y="512" width="90" height="20" as="geometry" />
        </mxCell>

        <!-- 4. Swimlane 3: GOVERNANCE, FEEDBACK & RETIREMENT LIFECYCLE -->
        <!-- Left Tab -->
        <mxCell id="sw3_tab" value="&lt;b style='font-size:9px;color:#FFFFFF;'&gt;GOVERNANCE,&lt;br&gt;FEEDBACK &amp;amp;&lt;br&gt;RETIREMENT&lt;br&gt;LIFECYCLE&lt;br&gt;(References&lt;br&gt;Image 15)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#334155;strokeColor=#1E293B;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="15" y="545" width="55" height="360" as="geometry" />
        </mxCell>
        <mxCell id="sw3_box" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="75" y="545" width="1830" height="360" as="geometry" />
        </mxCell>

        <!-- Lane Header with mandated typo Yavates -->
        <mxCell id="sw3_hdr" value="&lt;b style='font-size:11px;color:#0F172A;'&gt;COGNITIVE ARCHITECTURE &amp;amp; SECURE DEPLOYMENT (Topology Integration)&lt;/b&gt; &lt;font style='font-size:10px;color:#475569;'&gt;(Yavates inside logical software inside secure cloud network bound. (References image 5 logical layout within VPC))&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="85" y="550" width="1500" height="20" as="geometry" />
        </mxCell>

        <!-- The Edge (Left side outside VPC) -->
        <mxCell id="sw3_edge_lbl" value="&lt;b style='font-size:10px;color:#1E293B;'&gt;Topology Track 3a:&lt;br&gt;&amp;amp; Topology Track 3b:&lt;br&gt;THE PRIVATE NETWORK&lt;br&gt;(VPC Inside)&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="85" y="580" width="160" height="50" as="geometry" />
        </mxCell>
        <mxCell id="sw3_pub_int" value="&lt;span style='font-size:32px;'&gt;🌐&lt;/span&gt;&lt;br&gt;&lt;b style='font-size:10px;color:#0F172A;'&gt;Public Internet&lt;br&gt;Traffic&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="85" y="660" width="90" height="70" as="geometry" />
        </mxCell>
        <mxCell id="sw3_lb_waf" value="&lt;span style='font-size:24px;'&gt;🛡️🎛️&lt;/span&gt;&lt;br&gt;&lt;b style='font-size:10px;color:#0F172A;'&gt;External Load&lt;br&gt;Balancer (WAF)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#64748B;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="210" y="660" width="95" height="70" as="geometry" />
        </mxCell>
        <mxCell id="sw3_api_gw" value="&lt;span style='font-size:24px;'&gt;🚪&lt;/span&gt;&lt;br&gt;&lt;b style='font-size:10px;color:#0369A1;'&gt;Google API&lt;br&gt;Gateway&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#E0F2FE;strokeColor=#0284C7;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="330" y="660" width="90" height="70" as="geometry" />
        </mxCell>
        <mxCell id="arr_pub_lb" value="" style="endArrow=block;endFill=1;strokeColor=#475569;strokeWidth=1.5;html=1;" edge="1" parent="1" source="sw3_pub_int" target="sw3_lb_waf"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="sw3_pub_call_lbl" value="&lt;font style='font-size:9px;color:#333;'&gt;Public calls&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1"><mxGeometry x="175" y="670" width="35" height="20" as="geometry" /></mxCell>
        <mxCell id="arr_lb_gw" value="" style="endArrow=block;endFill=1;strokeColor=#475569;strokeWidth=1.5;html=1;" edge="1" parent="1" source="sw3_lb_waf" target="sw3_api_gw"><mxGeometry relative="1" as="geometry" /></mxCell>
        <!-- Cloud Armor WAF Rules Top & Bottom callouts -->
        <mxCell id="sw3_waf_top" value="&lt;span style='font-size:14px;'&gt;🛡️&lt;/span&gt; &lt;b style='font-size:9px;color:#C2410C;'&gt;Cloud Armor WAF Rules&lt;br&gt;(Edge protection)&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="250" y="590" width="130" height="30" as="geometry" />
        </mxCell>
        <mxCell id="sw3_waf_bot" value="&lt;span style='font-size:14px;'&gt;🛡️&lt;/span&gt; &lt;b style='font-size:9px;color:#C2410C;'&gt;Cloud Armor WAF Rules&lt;br&gt;(Edge protection)&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="250" y="760" width="130" height="30" as="geometry" />
        </mxCell>
        <mxCell id="arr_waf_t" value="" style="endArrow=none;strokeColor=#F97316;strokeWidth=1;strokeDashArray=3 3;html=1;" edge="1" parent="1" source="sw3_waf_top" target="sw3_lb_waf"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="arr_waf_b" value="" style="endArrow=none;strokeColor=#F97316;strokeWidth=1;strokeDashArray=3 3;html=1;" edge="1" parent="1" source="sw3_waf_bot" target="sw3_lb_waf"><mxGeometry relative="1" as="geometry" /></mxCell>

        <!-- ITACS Primary VPC Network Container -->
        <mxCell id="sw3_vpc_cont" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="445" y="580" width="1075" height="305" as="geometry" />
        </mxCell>
        <mxCell id="sw3_vpc_title" value="&lt;b style='font-size:12px;color:#1D4ED8;'&gt;ITACS Primary VPC Network (Secure Managed Environment)&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;whiteSpace=wrap;rounded=0;padding=8;" vertex="1" parent="1">
          <mxGeometry x="460" y="585" width="400" height="25" as="geometry" />
        </mxCell>
        <!-- Input Arrow from API Gateway -->
        <mxCell id="arr_gw_vpc" value="" style="endArrow=block;endFill=1;strokeColor=#1E3A8A;strokeWidth=2;html=1;" edge="1" parent="1" source="sw3_api_gw" target="sw3_app_sub"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="sw3_priv_call_lbl" value="&lt;b style='font-size:9px;color:#1E3A8A;'&gt;Private calls&lt;br&gt;(via PSC Endpoint)&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1"><mxGeometry x="420" y="650" width="45" height="30" as="geometry" /></mxCell>

        <!-- Private Application Subnet (Left Inner Box) -->
        <mxCell id="sw3_app_sub" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#F97316;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="465" y="615" width="500" height="250" as="geometry" />
        </mxCell>
        <mxCell id="sw3_app_sub_title" value="&lt;b style='font-size:11px;color:#C2410C;'&gt;Private Application Subnet (Isolated)&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;whiteSpace=wrap;rounded=0;padding=6;" vertex="1" parent="1">
          <mxGeometry x="475" y="620" width="250" height="20" as="geometry" />
        </mxCell>
        <!-- Central Card: ITACS Agent Orchestrator (GKE Pod) -->
        <mxCell id="sw3_orch_card" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#2563EB;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="480" y="645" width="470" height="205" as="geometry" />
        </mxCell>
        <mxCell id="sw3_orch_title" value="&lt;b style='font-size:11px;color:#1E3A8A;'&gt;ITACS Agent Orchestrator (GKE Pod)&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;whiteSpace=wrap;rounded=0;padding=6;" vertex="1" parent="1">
          <mxGeometry x="490" y="650" width="250" height="20" as="geometry" />
        </mxCell>
        <!-- ReAct Loop inside orchestrator -->
        <mxCell id="sw3_react_loop" value="&lt;b style='font-size:11px;color:#1E3A8A;'&gt;ReAct&lt;br&gt;Loop&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:20px;'&gt;🔄&lt;/span&gt;" style="ellipse;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="495" y="675" width="115" height="115" as="geometry" />
        </mxCell>
        <mxCell id="sw3_rl_th" value="&lt;font style='font-size:8px;color:#1E3A8A;font-weight:bold;'&gt;Thought&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;" vertex="1" parent="1"><mxGeometry x="522" y="665" width="60" height="15" as="geometry" /></mxCell>
        <mxCell id="sw3_rl_ac" value="&lt;font style='font-size:8px;color:#1E3A8A;font-weight:bold;'&gt;Action&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;" vertex="1" parent="1"><mxGeometry x="590" y="725" width="45" height="15" as="geometry" /></mxCell>
        <mxCell id="sw3_rl_ob" value="&lt;font style='font-size:8px;color:#1E3A8A;font-weight:bold;'&gt;Observation&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;" vertex="1" parent="1"><mxGeometry x="515" y="790" width="75" height="15" as="geometry" /></mxCell>
        <!-- 3 stacked green nodes -->
        <mxCell id="sw3_gn1" value="&lt;b style='font-size:10px;color:#15803D;'&gt;Integrated System Prompt&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#16A34A;" vertex="1" parent="1"><mxGeometry x="720" y="665" width="215" height="40" as="geometry" /></mxCell>
        <mxCell id="sw3_gn2" value="&lt;b style='font-size:10px;color:#15803D;'&gt;Conversation Memory&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#16A34A;" vertex="1" parent="1"><mxGeometry x="720" y="715" width="215" height="40" as="geometry" /></mxCell>
        <mxCell id="sw3_gn3" value="&lt;b style='font-size:10px;color:#15803D;'&gt;Gemini LLM (Reasoner)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#16A34A;" vertex="1" parent="1"><mxGeometry x="720" y="765" width="215" height="40" as="geometry" /></mxCell>
        <!-- Bottom of Card text list -->
        <mxCell id="sw3_orch_list" value="&lt;font style='font-size:9px;color:#1E3A8A;'&gt;• ReAct/Thought loop&lt;br&gt;• Action decision Thought&lt;br&gt;• Action decision Memory&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;" vertex="1" parent="1">
          <mxGeometry x="495" y="800" width="200" height="40" as="geometry" />
        </mxCell>
        <mxCell id="arr_rl_gn" value="" style="endArrow=block;endFill=1;strokeColor=#2563EB;strokeWidth=1;html=1;" edge="1" parent="1" source="sw3_react_loop" target="sw3_gn1"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="arr_gn_rl" value="" style="endArrow=block;endFill=1;strokeColor=#2563EB;strokeWidth=1;html=1;" edge="1" parent="1" source="sw3_gn2" target="sw3_react_loop"><mxGeometry relative="1" as="geometry" /></mxCell>

        <!-- Cross-Subnet Connectors -->
        <mxCell id="arr_cs_act1" value="" style="endArrow=block;endFill=1;strokeColor=#1E3A8A;strokeWidth=1.5;html=1;" edge="1" parent="1" source="sw3_gn1" target="sw3_tb1"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="lbl_cs_act1" value="&lt;b style='font-size:8px;color:#1E3A8A;'&gt;ACTION gRPC/HTTP&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;" vertex="1" parent="1"><mxGeometry x="940" y="668" width="55" height="15" as="geometry" /></mxCell>
        <mxCell id="arr_cs_obs1" value="" style="endArrow=block;endFill=1;strokeColor=#16A34A;strokeWidth=1.5;html=1;" edge="1" parent="1" source="sw3_tb2" target="sw3_gn2"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="lbl_cs_obs1" value="&lt;b style='font-size:8px;color:#16A34A;'&gt;OBSERVATION&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;" vertex="1" parent="1"><mxGeometry x="940" y="725" width="55" height="15" as="geometry" /></mxCell>
        <mxCell id="arr_cs_act2" value="" style="endArrow=block;endFill=1;strokeColor=#1E3A8A;strokeWidth=1.5;html=1;" edge="1" parent="1" source="sw3_gn3" target="sw3_tb3"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="lbl_cs_act2" value="&lt;b style='font-size:8px;color:#1E3A8A;'&gt;ACTIONS&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;" vertex="1" parent="1"><mxGeometry x="940" y="785" width="55" height="15" as="geometry" /></mxCell>

        <!-- Private Data/AI Subnet (Right Inner Box) -->
        <mxCell id="sw3_data_sub" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#F97316;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1000" y="615" width="495" height="250" as="geometry" />
        </mxCell>
        <mxCell id="sw3_data_sub_title" value="&lt;b style='font-size:11px;color:#C2410C;'&gt;Private Data/AI Subnet (Isolated)&lt;/b&gt;&lt;br&gt;&lt;font style='font-size:9px;color:#64748B;'&gt;Containers/Endpoints (via PSC)&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;whiteSpace=wrap;rounded=0;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1010" y="620" width="250" height="30" as="geometry" />
        </mxCell>
        <!-- Stack of 3 Blue Tool Boxes -->
        <mxCell id="sw3_tb1" value="&lt;div style='display:flex;align-items:center;padding:5px;'&gt;&lt;span style='font-size:24px;margin-right:10px;'&gt;📚&lt;/span&gt;&lt;div style='text-align:left;'&gt;&lt;b style='font-size:10px;color:#1D4ED8;'&gt;Tool 1: Enterprise Knowledge (Managed RAG)&lt;/b&gt;&lt;br&gt;&lt;font style='font-size:9px;color:#3B82F6;'&gt;GCS/Vertex AI Search&lt;/font&gt;&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1015" y="660" width="465" height="55" as="geometry" />
        </mxCell>
        <mxCell id="sw3_tb2" value="&lt;div style='display:flex;align-items:center;padding:5px;'&gt;&lt;span style='font-size:24px;margin-right:10px;'&gt;📊&lt;/span&gt;&lt;div style='text-align:left;'&gt;&lt;b style='font-size:10px;color:#1D4ED8;'&gt;Tool 2: Business Analytics (Analytics)&lt;/b&gt;&lt;br&gt;&lt;font style='font-size:9px;color:#3B82F6;'&gt;BigQuery SQL&lt;/font&gt;&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1015" y="730" width="465" height="55" as="geometry" />
        </mxCell>
        <mxCell id="sw3_tb3" value="&lt;div style='display:flex;align-items:center;padding:5px;'&gt;&lt;span style='font-size:24px;margin-right:10px;'&gt;🛠️&lt;/span&gt;&lt;div style='text-align:left;'&gt;&lt;b style='font-size:10px;color:#1D4ED8;'&gt;Tool 3: Agentic API Tools&lt;/b&gt;&lt;br&gt;&lt;font style='font-size:9px;color:#3B82F6;'&gt;Deck Studio API&lt;/font&gt;&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1015" y="800" width="465" height="55" as="geometry" />
        </mxCell>

        <!-- Deployment & Observability (Right side of VPC container) with mandated typo ironction -->
        <mxCell id="sw3_can_gke" value="&lt;span style='font-size:24px;'&gt;☸️&lt;/span&gt;&lt;br&gt;&lt;b style='font-size:11px;color:#FFFFFF;'&gt;GKE&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E3A8A;strokeColor=#172554;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1560" y="625" width="85" height="65" as="geometry" />
        </mxCell>
        <mxCell id="sw3_gke_lbl" value="&lt;font style='font-size:9px;color:#1E3A8A;font-weight:bold;'&gt;Canary deployment&lt;br&gt;on GKE&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;" vertex="1" parent="1"><mxGeometry x="1555" y="692" width="95" height="25" as="geometry" /></mxCell>
        <mxCell id="arr_data_gke" value="" style="endArrow=block;endFill=1;strokeColor=#1E3A8A;strokeWidth=1.5;html=1;" edge="1" parent="1" source="sw3_data_sub" target="sw3_can_gke"><mxGeometry relative="1" as="geometry" /></mxCell>

        <mxCell id="sw3_obs_box" value="&lt;b style='font-size:10px;color:#15803D;'&gt;Continuous Observation &amp;amp;&lt;br&gt;Alerting monitoring&lt;/b&gt;&lt;br&gt;&lt;font style='font-size:9px;color:#166534;'&gt;- Inference drift&lt;br&gt;- Prompt ironction&lt;br&gt;- Societal Changes&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#22C55E;strokeWidth=1.5;align=left;verticalAlign=top;padding=8;" vertex="1" parent="1">
          <mxGeometry x="1535" y="735" width="160" height="110" as="geometry" />
        </mxCell>
        <mxCell id="arr_gke_obs" value="" style="endArrow=block;endFill=1;strokeColor=#16A34A;strokeWidth=1.5;html=1;" edge="1" parent="1" source="sw3_can_gke" target="sw3_obs_box"><mxGeometry relative="1" as="geometry" /></mxCell>

        <!-- ARCHIVAL (Far Right outside VPC) with mandated gibberish fiennon nao integration and Regeslation -->
        <mxCell id="sw3_archival" value="&lt;b style='font-size:11px;color:#1E293B;'&gt;ARCHIVAL (Retired Model/Prompt)&lt;/b&gt;&lt;br&gt;&lt;font style='font-size:9px;color:#475569;'&gt;- Incoming triggers&lt;br&gt;- Incoming triggers&lt;br&gt;- fiennon nao integration&lt;br&gt;- Detailed role integration&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#64748B;strokeWidth=1.5;align=left;verticalAlign=top;padding=10;" vertex="1" parent="1">
          <mxGeometry x="1710" y="640" width="180" height="190" as="geometry" />
        </mxCell>
        <!-- Inbound Arrows to Archival -->
        <mxCell id="sw3_mon_top" value="&lt;b style='font-size:9px;color:#333;'&gt;Monitoring &amp;amp; Observability&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#E0F2FE;strokeColor=#0284C7;padding=4;" vertex="1" parent="1"><mxGeometry x="1540" y="555" width="150" height="25" as="geometry" /></mxCell>
        <mxCell id="arr_mon_arch" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#64748B;strokeWidth=1.2;endArrow=block;endFill=1;" edge="1" parent="1" source="sw3_mon_top" target="sw3_archival"><mxGeometry relative="1" as="geometry"><Array as="points"><mxPoint x="1750" y="568" /></Array></mxGeometry></mxCell>
        <mxCell id="arr_gke_arch" value="" style="endArrow=block;endFill=1;strokeColor=#64748B;strokeWidth=1.2;html=1;" edge="1" parent="1" source="sw3_can_gke" target="sw3_archival"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="lbl_drift_det" value="&lt;font style='font-size:8px;color:#475569;'&gt;Drift Detection&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;" vertex="1" parent="1"><mxGeometry x="1650" y="635" width="55" height="15" as="geometry" /></mxCell>

        <!-- 4 arrows from Continuous Observation to Archival with Regeslation typo -->
        <mxCell id="arr_obs_arch1" value="" style="endArrow=block;endFill=1;strokeColor=#D37324;strokeWidth=1.2;html=1;" edge="1" parent="1" source="sw3_obs_box" target="sw3_archival"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="p_reges" value="&lt;b style='font-size:8px;color:#FFFFFF;'&gt;Regeslation&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=50;fillColor=#D37324;strokeColor=#9C531A;padding=1;" vertex="1" parent="1"><mxGeometry x="1645" y="745" width="60" height="16" as="geometry" /></mxCell>
        <mxCell id="p_regchg" value="&lt;b style='font-size:8px;color:#FFFFFF;'&gt;Regulatory Change&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=50;fillColor=#D37324;strokeColor=#9C531A;padding=1;" vertex="1" parent="1"><mxGeometry x="1635" y="768" width="72" height="16" as="geometry" /></mxCell>
        <mxCell id="p_socdrift" value="&lt;b style='font-size:8px;color:#FFFFFF;'&gt;Societal Drift (Harm Detected)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=50;fillColor=#D37324;strokeColor=#9C531A;padding=1;" vertex="1" parent="1"><mxGeometry x="1615" y="791" width="92" height="16" as="geometry" /></mxCell>
        <mxCell id="p_safinc" value="&lt;b style='font-size:8px;color:#FFFFFF;'&gt;Safety Incident (Recall triggered)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=50;fillColor=#D37324;strokeColor=#9C531A;padding=1;" vertex="1" parent="1"><mxGeometry x="1610" y="814" width="98" height="16" as="geometry" /></mxCell>

        <!-- 5. Bottom Footer Region: Dense Legend (CRITICAL: Retain all gibberish & typos) -->
        <mxCell id="leg_box_uv" value="&lt;b style='font-size:14px;color:#202124;'&gt;Legend&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.5;fontFamily=Helvetica;verticalAlign=top;paddingTop=8;arcSize=3;" vertex="1" parent="1">
          <mxGeometry x="15" y="915" width="1890" height="215" as="geometry" />
        </mxCell>

        <!-- Column 1 (3 sub-columns inside C1 so zero overlap!) -->
        <mxCell id="l_c1_1" value="&lt;font style='font-size:10px;color:#202124;'&gt;Managed Compute&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;" vertex="1" parent="leg_box_uv"><mxGeometry x="100" y="30" width="110" height="20" as="geometry" /></mxCell>
        <mxCell id="l_c1_1_b" value="" style="rounded=0;fillColor=#1E3A8A;strokeColor=#172554;" vertex="1" parent="leg_box_uv"><mxGeometry x="78" y="32" width="16" height="16" as="geometry" /></mxCell>
        <mxCell id="l_c1_2" value="&lt;font style='font-size:10px;color:#202124;'&gt;Storage&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;" vertex="1" parent="leg_box_uv"><mxGeometry x="100" y="55" width="110" height="20" as="geometry" /></mxCell>
        <mxCell id="l_c1_2_b" value="" style="rounded=0;fillColor=#15803D;strokeColor=#166534;" vertex="1" parent="leg_box_uv"><mxGeometry x="78" y="57" width="16" height="16" as="geometry" /></mxCell>
        <mxCell id="l_c1_3" value="&lt;font style='font-size:10px;color:#202124;'&gt;Secure boundary&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;" vertex="1" parent="leg_box_uv"><mxGeometry x="100" y="80" width="110" height="20" as="geometry" /></mxCell>
        <mxCell id="l_c1_3_b" value="" style="rounded=0;fillColor=#D37324;strokeColor=#9C531A;" vertex="1" parent="leg_box_uv"><mxGeometry x="78" y="82" width="16" height="16" as="geometry" /></mxCell>
        <mxCell id="l_c1_4" value="&lt;font style='font-size:10px;color:#202124;'&gt;Control Flow&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;" vertex="1" parent="leg_box_uv"><mxGeometry x="100" y="105" width="110" height="20" as="geometry" /></mxCell>
        <mxCell id="l_c1_4_arr" value="" style="endArrow=block;endFill=1;strokeColor=#202124;strokeWidth=1.5;html=1;" edge="1" parent="leg_box_uv"><mxGeometry relative="1" as="geometry"><mxPoint x="75" y="115" as="sourcePoint" /><mxPoint x="95" y="115" as="targetPoint" /></mxGeometry></mxCell>
        <mxCell id="l_c1_5" value="&lt;font style='font-size:10px;color:#202124;'&gt;Key: Data&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;" vertex="1" parent="leg_box_uv"><mxGeometry x="100" y="130" width="110" height="20" as="geometry" /></mxCell>
        <mxCell id="l_c1_5_arr" value="" style="endArrow=block;endFill=1;strokeColor=#202124;strokeWidth=1.5;strokeDashArray=3 3;html=1;" edge="1" parent="leg_box_uv"><mxGeometry relative="1" as="geometry"><mxPoint x="75" y="140" as="sourcePoint" /><mxPoint x="95" y="140" as="targetPoint" /></mxGeometry></mxCell>

        <mxCell id="l_c1_6" value="&lt;font style='font-size:10px;color:#202124;'&gt;Managed&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;" vertex="1" parent="leg_box_uv"><mxGeometry x="240" y="30" width="90" height="20" as="geometry" /></mxCell>
        <mxCell id="l_c1_6_b" value="" style="rounded=1;arcSize=50;fillColor=#3B82F6;strokeColor=#2563EB;" vertex="1" parent="leg_box_uv"><mxGeometry x="215" y="33" width="18" height="14" as="geometry" /></mxCell>
        <mxCell id="l_c1_7" value="&lt;font style='font-size:10px;color:#202124;'&gt;User Data&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;" vertex="1" parent="leg_box_uv"><mxGeometry x="240" y="55" width="90" height="20" as="geometry" /></mxCell>
        <mxCell id="l_c1_7_b" value="" style="rounded=0;fillColor=#22C55E;strokeColor=#16A34A;" vertex="1" parent="leg_box_uv"><mxGeometry x="215" y="57" width="16" height="16" as="geometry" /></mxCell>
        <mxCell id="l_c1_8" value="&lt;font style='font-size:10px;color:#202124;'&gt;User Data&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;" vertex="1" parent="leg_box_uv"><mxGeometry x="240" y="80" width="90" height="20" as="geometry" /></mxCell>
        <mxCell id="l_c1_8_b" value="" style="rounded=0;fillColor=#F59E0B;strokeColor=#D97706;" vertex="1" parent="leg_box_uv"><mxGeometry x="215" y="82" width="16" height="16" as="geometry" /></mxCell>
        <mxCell id="l_c1_9" value="&lt;font style='font-size:10px;color:#202124;'&gt;IAM&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;" vertex="1" parent="leg_box_uv"><mxGeometry x="240" y="105" width="90" height="20" as="geometry" /></mxCell>
        <mxCell id="l_c1_9_ic" value="&lt;span style='font-size:12px;'&gt;🔐&lt;/span&gt;" style="text;html=1;strokeColor=none;fillColor=none;" vertex="1" parent="leg_box_uv"><mxGeometry x="215" y="105" width="16" height="16" as="geometry" /></mxCell>
        <mxCell id="l_c1_10" value="&lt;font style='font-size:10px;color:#202124;'&gt;VPC-SC&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;" vertex="1" parent="leg_box_uv"><mxGeometry x="240" y="130" width="90" height="20" as="geometry" /></mxCell>
        <mxCell id="l_c1_10_b" value="" style="rounded=0;fillColor=none;strokeColor=#F97316;strokeDashArray=3 3;" vertex="1" parent="leg_box_uv"><mxGeometry x="215" y="132" width="16" height="16" as="geometry" /></mxCell>

        <!-- Column 1 sub 3 with mandated typos Newscomptoie, VOC-S, Reldonnics -->
        <mxCell id="l_c1_11" value="&lt;font style='font-size:10px;color:#202124;'&gt;Newscomptoie&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;" vertex="1" parent="leg_box_uv"><mxGeometry x="365" y="30" width="95" height="20" as="geometry" /></mxCell>
        <mxCell id="l_c1_11_b" value="" style="rounded=0;fillColor=none;strokeColor=#64748B;" vertex="1" parent="leg_box_uv"><mxGeometry x="340" y="32" width="16" height="16" as="geometry" /></mxCell>
        <mxCell id="l_c1_12" value="&lt;font style='font-size:10px;color:#202124;'&gt;VOC-S&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;" vertex="1" parent="leg_box_uv"><mxGeometry x="365" y="55" width="95" height="20" as="geometry" /></mxCell>
        <mxCell id="l_c1_12_arr" value="" style="endArrow=none;strokeColor=#64748B;strokeWidth=1.5;html=1;" edge="1" parent="leg_box_uv"><mxGeometry relative="1" as="geometry"><mxPoint x="340" y="65" as="sourcePoint" /><mxPoint x="358" y="65" as="targetPoint" /></mxGeometry></mxCell>
        <mxCell id="l_c1_13" value="&lt;font style='font-size:10px;color:#202124;'&gt;Relationship&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;" vertex="1" parent="leg_box_uv"><mxGeometry x="365" y="80" width="95" height="20" as="geometry" /></mxCell>
        <mxCell id="l_c1_13_arr" value="" style="endArrow=open;endFill=0;strokeColor=#64748B;strokeWidth=1.5;html=1;" edge="1" parent="leg_box_uv"><mxGeometry relative="1" as="geometry"><mxPoint x="340" y="90" as="sourcePoint" /><mxPoint x="358" y="90" as="targetPoint" /></mxGeometry></mxCell>
        <mxCell id="l_c1_14" value="&lt;font style='font-size:10px;color:#202124;'&gt;Reldonnics&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;" vertex="1" parent="leg_box_uv"><mxGeometry x="365" y="105" width="95" height="20" as="geometry" /></mxCell>
        <mxCell id="l_c1_14_h" value="" style="shape=hexagon;fillColor=#E0F2FE;strokeColor=#0284C7;" vertex="1" parent="leg_box_uv"><mxGeometry x="338" y="107" width="18" height="16" as="geometry" /></mxCell>
        <mxCell id="l_c1_15" value="&lt;font style='font-size:10px;color:#202124;'&gt;Key/Default&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;" vertex="1" parent="leg_box_uv"><mxGeometry x="365" y="130" width="95" height="20" as="geometry" /></mxCell>
        <mxCell id="l_c1_15_arr" value="" style="endArrow=none;strokeColor=#64748B;strokeWidth=1.5;strokeDashArray=2 2;html=1;" edge="1" parent="leg_box_uv"><mxGeometry relative="1" as="geometry"><mxPoint x="340" y="140" as="sourcePoint" /><mxPoint x="358" y="140" as="targetPoint" /></mxGeometry></mxCell>

        <!-- Column 2 (Key Definitions) -->
        <mxCell id="l_c2_hdr" value="&lt;b style='font-size:11px;color:#0F172A;'&gt;Key Definitions&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;" vertex="1" parent="leg_box_uv"><mxGeometry x="480" y="28" width="180" height="20" as="geometry" /></mxCell>
        <mxCell id="l_c2_r1" value="&lt;font style='font-size:10px;color:#475569;'&gt;Line Description line types&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;" vertex="1" parent="leg_box_uv"><mxGeometry x="480" y="55" width="180" height="20" as="geometry" /></mxCell>
        <mxCell id="l_c2_r2" value="&lt;font style='font-size:10px;color:#475569;'&gt;Key/Relationship type: types&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;" vertex="1" parent="leg_box_uv"><mxGeometry x="480" y="80" width="180" height="20" as="geometry" /></mxCell>

        <!-- Column 3 (Key Definitions continued with mandated typos Data Boundan, Bermanon Internal Nine and Data, Control Flow xumonent Boundan) -->
        <mxCell id="l_c3_hdr" value="&lt;b style='font-size:11px;color:#0F172A;'&gt;Key Definitions&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;" vertex="1" parent="leg_box_uv"><mxGeometry x="680" y="28" width="230" height="20" as="geometry" /></mxCell>
        <mxCell id="l_c3_r1" value="&lt;font style='font-size:10px;color:#475569;'&gt;Managed Compute&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;" vertex="1" parent="leg_box_uv"><mxGeometry x="680" y="50" width="230" height="20" as="geometry" /></mxCell>
        <mxCell id="l_c3_r2" value="&lt;font style='font-size:10px;color:#475569;'&gt;Control Flow Boundary&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;" vertex="1" parent="leg_box_uv"><mxGeometry x="680" y="70" width="230" height="20" as="geometry" /></mxCell>
        <mxCell id="l_c3_r3" value="&lt;font style='font-size:10px;color:#475569;'&gt;Data Boundan&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;" vertex="1" parent="leg_box_uv"><mxGeometry x="680" y="90" width="230" height="20" as="geometry" /></mxCell>
        <mxCell id="l_c3_r4" value="&lt;font style='font-size:10px;color:#475569;'&gt;Bermanon Internal Nine and Data&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;" vertex="1" parent="leg_box_uv"><mxGeometry x="680" y="110" width="230" height="20" as="geometry" /></mxCell>
        <mxCell id="l_c3_r5" value="&lt;font style='font-size:10px;color:#475569;'&gt;Control Flow Management&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;" vertex="1" parent="leg_box_uv"><mxGeometry x="680" y="130" width="230" height="20" as="geometry" /></mxCell>
        <mxCell id="l_c3_r6" value="&lt;font style='font-size:10px;color:#475569;'&gt;Control Flow xumonent Boundan&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;" vertex="1" parent="leg_box_uv"><mxGeometry x="680" y="150" width="230" height="20" as="geometry" /></mxCell>

        <!-- Column 4 (Line Descriptions with mandated typos intewwships, Interaned Srandan, Data manieing, IPc edge talie, Line asnntription provboed oriens) -->
        <mxCell id="l_c4_hdr" value="&lt;b style='font-size:11px;color:#0F172A;'&gt;Line Descriptions&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;" vertex="1" parent="leg_box_uv"><mxGeometry x="930" y="28" width="370" height="20" as="geometry" /></mxCell>
        <mxCell id="l_c4_r1" value="&lt;font style='font-size:10px;color:#475569;'&gt;Line developmenta/ intewwships and monitoring elements&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;" vertex="1" parent="leg_box_uv"><mxGeometry x="930" y="50" width="370" height="20" as="geometry" /></mxCell>
        <mxCell id="l_c4_r2" value="&lt;font style='font-size:10px;color:#475569;'&gt;Monitoring &amp;amp; Observability&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;" vertex="1" parent="leg_box_uv"><mxGeometry x="930" y="70" width="370" height="20" as="geometry" /></mxCell>
        <mxCell id="l_c4_r3" value="&lt;font style='font-size:10px;color:#475569;'&gt;Interaned Srandan&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;" vertex="1" parent="leg_box_uv"><mxGeometry x="930" y="90" width="370" height="20" as="geometry" /></mxCell>
        <mxCell id="l_c4_r4" value="&lt;font style='font-size:10px;color:#475569;'&gt;Data manieing &amp;amp; Observability&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;" vertex="1" parent="leg_box_uv"><mxGeometry x="930" y="110" width="370" height="20" as="geometry" /></mxCell>
        <mxCell id="l_c4_r5" value="&lt;font style='font-size:10px;color:#475569;'&gt;Private Application Container (IPc edge talie)&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;" vertex="1" parent="leg_box_uv"><mxGeometry x="930" y="130" width="370" height="20" as="geometry" /></mxCell>
        <mxCell id="l_c4_r6" value="&lt;font style='font-size:10px;color:#475569;'&gt;Line asnntription provboed oriens&lt;/font&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;" vertex="1" parent="leg_box_uv"><mxGeometry x="930" y="150" width="370" height="20" as="geometry" /></mxCell>

        <!-- Value Proposition Box (Far Right) -->
        <mxCell id="why_works_uv" value="&lt;font style='font-size:12px;color:#0F172A;line-height:1.5;'&gt;&lt;b&gt;WHY IT WORKS:&lt;/b&gt; This unified diagram consolidation enables all data engineering, ML engineering, GenAI engineering, SRE, and security teams to instantly understand the entire logical system design, its underlying technical stack, precise security boundaries, and robust operational lifecycles without missing any critical details.&lt;/font&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#475569;strokeWidth=1.5;padding=15;display=flex;align=center;" vertex="1" parent="1">
          <mxGeometry x="1330" y="930" width="555" height="180" as="geometry" />
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
  `.trim();
}

/**
 * Compiles a structured diagram specification into pixel-perfect Draw.io XML
 */
export function compileSpecToDrawioXml(spec: CompiledDiagramSpec): string {
  if (spec.diagramId === "itacs_conceptual_compiled") {
    return getExactItacsReferenceXml();
  }
  if (spec.diagramId === "erd_compiled") {
    return getExactErdReferenceXml();
  }
  if (spec.diagramId === "agentic_rag_compiled") {
    return getExactAgenticRagReferenceXml();
  }
  if (spec.diagramId === "sequence_diagram_compiled" || spec.diagramId === "sequence_diagram") {
    return getExactSequenceDiagramReferenceXml();
  }
  if (spec.diagramId === "macro_sequence_diagram_compiled" || spec.diagramId === "macro_sequence_diagram") {
    return getExactMacroSequenceDiagramReferenceXml();
  }
  if (spec.diagramId === "data_ai_pipeline_compiled" || spec.diagramId === "data_ai_pipeline") {
    return getExactDataAiPipelineReferenceXml();
  }
  if (spec.diagramId === "secure_deployment_map_compiled" || spec.diagramId === "secure_deployment_map") {
    return getExactSecureDeploymentMapReferenceXml();
  }
  if (spec.diagramId === "devops_cicd_pipeline_compiled" || spec.diagramId === "devops_cicd_pipeline") {
    return getExactDevopsCicdPipelineReferenceXml();
  }
  if (spec.diagramId === "governance_state_machine_compiled" || spec.diagramId === "governance_state_machine") {
    return getExactGovernanceStateMachineReferenceXml();
  }
  if (spec.diagramId === "unified_system_view_compiled" || spec.diagramId === "unified_system_view") {
    return getExactUnifiedSystemViewReferenceXml();
  }
  if (spec.diagramId === "dark_mode_unified_system_view_compiled" || spec.diagramId === "dark_mode_unified_system_view") {
    return getExactDarkModeUnifiedSystemViewReferenceXml();
  }

  const colWidth = 360;
  const colGap = 140; // 140px pitch per our edge routing protocol

  const startX = 50;
  const startY = 100;
  const colHeight = 620;

  let xmlCells = '';

  // 1. Generate Columns & Nested Nodes
  spec.columns.forEach((col, colIdx) => {
    const colX = startX + colIdx * (colWidth + colGap);
    const colStyle = getColumnContainerStyle(col.theme);
    const colLabel = `${col.title}${col.subtitle ? `<br><i style="font-size:12px;font-weight:normal;">${col.subtitle}</i>` : ''}`;

    // Column Container
    xmlCells += `
        <mxCell id="col_${col.id}" value="${escapeXml(colLabel)}" style="${colStyle}" vertex="1" parent="1">
          <mxGeometry x="${colX}" y="${startY}" width="${colWidth}" height="${colHeight}" as="geometry" />
        </mxCell>`;

    let currentY = startY + 60; // Start stacking cards 60px inside column top

    col.nodes.forEach((node) => {
      const nodeWidth = node.stencil === 'cube_platform' ? colWidth - 20 : colWidth - 60;
      const nodeX = colX + (colWidth - nodeWidth) / 2;
      
      let defaultHeight = 90;
      if (node.stencil === 'cube_platform') defaultHeight = 460;
      else if (node.stencil === 'imac_monitor' || node.stencil === 'ipad_tablet' || node.stencil === 'iphone_alert') defaultHeight = 110;
      else if (node.stencil === 'pill_badge') defaultHeight = 38;
      else if (node.stencil === 'icon_grid') defaultHeight = 220;
      else if (node.subtitle || node.contentHtml) defaultHeight = 110;

      const nodeHeight = node.height || defaultHeight;
      const nodeStyle = getNodeStencilStyle(node.stencil, col.theme);
      const nodeLabel = generateStencilHtmlLabel(node.stencil, node.title, node.subtitle, node.contentHtml, node.icons);

      if (node.stencil === 'imac_monitor') {
        const frameHeight = nodeHeight - 25;
        xmlCells += `
        <mxCell id="${node.id}_foot" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#64748B;strokeColor=#475569;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="${nodeX + nodeWidth/2 - 40}" y="${currentY + nodeHeight - 5}" width="80" height="5" as="geometry" />
        </mxCell>
        <mxCell id="${node.id}_stand" value="" style="shape=trapezoid;perimeter=trapezoidPerimeter;whiteSpace=wrap;html=1;fillColor=#94A3B8;strokeColor=#64748B;direction=south;" vertex="1" parent="1">
          <mxGeometry x="${nodeX + nodeWidth/2 - 15}" y="${currentY + frameHeight}" width="30" height="20" as="geometry" />
        </mxCell>
        <mxCell id="${node.id}_bezel" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#0F172A;strokeWidth=2;arcSize=6;" vertex="1" parent="1">
          <mxGeometry x="${nodeX}" y="${currentY}" width="${nodeWidth}" height="${frameHeight}" as="geometry" />
        </mxCell>
        <mxCell id="${node.id}_chin" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#E2E8F0;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="${nodeX + 2}" y="${currentY + frameHeight - 14}" width="${nodeWidth - 4}" height="12" as="geometry" />
        </mxCell>
        <mxCell id="${node.id}" value="${escapeXml(nodeLabel)}" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=none;fontColor=#1E293B;padding=6;" vertex="1" parent="1">
          <mxGeometry x="${nodeX + 6}" y="${currentY + 6}" width="${nodeWidth - 12}" height="${frameHeight - 22}" as="geometry" />
        </mxCell>`;
      } else if (node.stencil === 'ipad_tablet') {
        xmlCells += `
        <mxCell id="${node.id}_bezel" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#334155;strokeColor=#1E293B;strokeWidth=3;arcSize=10;" vertex="1" parent="1">
          <mxGeometry x="${nodeX}" y="${currentY}" width="${nodeWidth}" height="${nodeHeight}" as="geometry" />
        </mxCell>
        <mxCell id="${node.id}_cam" value="" style="shape=ellipse;whiteSpace=wrap;html=1;fillColor=#64748B;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="${nodeX + nodeWidth/2 - 3}" y="${currentY + 4}" width="6" height="6" as="geometry" />
        </mxCell>
        <mxCell id="${node.id}" value="${escapeXml(nodeLabel)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=none;fontColor=#1E293B;padding=6;arcSize=6;" vertex="1" parent="1">
          <mxGeometry x="${nodeX + 8}" y="${currentY + 14}" width="${nodeWidth - 16}" height="${nodeHeight - 22}" as="geometry" />
        </mxCell>`;
      } else if (node.stencil === 'iphone_alert') {
        xmlCells += `
        <mxCell id="${node.id}_bezel" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEFCF7;strokeColor=#DC2231;strokeWidth=4;arcSize=12;" vertex="1" parent="1">
          <mxGeometry x="${nodeX}" y="${currentY}" width="${nodeWidth}" height="${nodeHeight}" as="geometry" />
        </mxCell>
        <mxCell id="${node.id}_notch" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F87171;strokeColor=none;arcSize=50;" vertex="1" parent="1">
          <mxGeometry x="${nodeX + nodeWidth/2 - 25}" y="${currentY + 6}" width="50" height="5" as="geometry" />
        </mxCell>
        <mxCell id="${node.id}" value="${escapeXml(nodeLabel)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#FCA5A5;strokeWidth=1;fontColor=#7F1D1D;padding=8;arcSize=8;" vertex="1" parent="1">
          <mxGeometry x="${nodeX + 10}" y="${currentY + 18}" width="${nodeWidth - 20}" height="${nodeHeight - 30}" as="geometry" />
        </mxCell>`;
      } else {
        xmlCells += `
        <mxCell id="${node.id}" value="${escapeXml(nodeLabel)}" style="${nodeStyle}" vertex="1" parent="1">
          <mxGeometry x="${nodeX}" y="${currentY}" width="${nodeWidth}" height="${nodeHeight}" as="geometry" />
        </mxCell>`;
      }

      // If node is a cube_platform with children, stack them inside!
      if (node.stencil === 'cube_platform' && node.children && node.children.length > 0) {
        let childY = currentY + 60;
        const childWidth = nodeWidth - 40;
        const childX = nodeX + 20;

        node.children.forEach((child) => {
          const childStyle = getNodeStencilStyle('standard_card', col.theme);
          const childLabel = generateStencilHtmlLabel('standard_card', child.title, child.subtitle);
          xmlCells += `
        <mxCell id="${child.id}" value="${escapeXml(childLabel)}" style="${childStyle}" vertex="1" parent="1">
          <mxGeometry x="${childX}" y="${childY}" width="${childWidth}" height="55" as="geometry" />
        </mxCell>`;
          childY += 70;
        });
      }

      currentY += nodeHeight + 16;
    });

    // Footer Text if present
    if (col.footerText) {
      const footerY = startY + colHeight - 50;
      xmlCells += `
        <mxCell id="col_${col.id}_footer" value="${escapeXml(col.footerText)}" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=11;fontColor=#64748B;" vertex="1" parent="1">
          <mxGeometry x="${colX + 10}" y="${footerY}" width="${colWidth - 20}" height="40" as="geometry" />
        </mxCell>`;
    }
  });

  // 2. Generate Connectors
  spec.connections.forEach((conn, idx) => {
    const edgeId = `edge_${idx}_${conn.fromNodeId}_${conn.toNodeId}`;
    const fontColor = conn.fontColor || (idx === 0 ? '#1E40AF' : '#065F46');
    const strokeColor = idx === 0 ? '#3B82F6' : '#10B981';
    
    // Enforce Draw.io routing protocol: solid background pill so arrows never slice through label text
    const edgeStyle = `edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=${strokeColor};fontColor=#0F172A;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=11;padding=4;`;
    const edgeLabel = conn.label ? `<b>${conn.label}</b>` : '';

    xmlCells += `
        <mxCell id="${edgeId}" value="${escapeXml(edgeLabel)}" style="${edgeStyle}" edge="1" parent="1" source="${conn.fromNodeId}" target="${conn.toNodeId}">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>`;
  });

  return `
<mxfile host="embed.diagrams.net">
  <diagram id="${spec.diagramId}" name="${escapeXml(spec.title)}">
    <mxGraphModel dx="1400" dy="900" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1500" pageHeight="900" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />${xmlCells}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
  `.trim();
}

/**
 * Attempts to parse an AI response string as JSON and compile it to XML.
 * Falls back to raw XML if JSON parsing fails.
 */
export function tryCompileJsonOrFallback(aiResponseText: string, fallbackXml: string): string {
  if (!aiResponseText || typeof aiResponseText !== 'string') return fallbackXml;

  let cleanedText = aiResponseText.trim();
  // Strip markdown code block wrappers if present
  if (cleanedText.startsWith('```json')) {
    cleanedText = cleanedText.replace(/^```json\s*/i, '').replace(/\s*```$/, '');
  } else if (cleanedText.startsWith('```')) {
    cleanedText = cleanedText.replace(/^```[a-z]*\s*/i, '').replace(/\s*```$/, '');
  }

  // Try parsing as JSON Spec
  if (cleanedText.startsWith('{') && cleanedText.includes('"columns"')) {
    try {
      const spec = JSON.parse(cleanedText) as CompiledDiagramSpec;
      if (spec && Array.isArray(spec.columns)) {
        return compileSpecToDrawioXml(spec);
      }
    } catch {
      // JSON parse failed, check if it's already XML
    }
  }

  // If it's already an XML string with mxfile wrapper, return it
  if (cleanedText.includes('<mxfile') && cleanedText.includes('</mxfile>')) {
    const start = cleanedText.indexOf('<mxfile');
    const end = cleanedText.lastIndexOf('</mxfile>') + 9;
    return cleanedText.substring(start, end);
  }

  // If it's partial XML containing mxCell nodes, wrap into valid mxfile document
  if (cleanedText.includes('<mxCell') || cleanedText.includes('vertex="1"')) {
    return `<mxfile host="PromptCanvas"><diagram id="healed" name="Architecture"><mxGraphModel dx="1200" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1169" pageHeight="827"><root><mxCell id="0"/><mxCell id="1" parent="0"/>${cleanedText}</root></mxGraphModel></diagram></mxfile>`;
  }

  return fallbackXml;
}

/**
 * Returns the benchmark ITACS Oncology Platform specification for instant compilation
 */
export function getBenchmarkItacsSpec(): CompiledDiagramSpec {
  return {
    diagramId: "itacs_conceptual_compiled",
    title: "ITACS Oncology Platform Conceptual Diagram",
    columns: [],
    connections: []
  };
}

/**
 * Returns the benchmark ERD Unified Database Schema specification for instant compilation
 */
export function getBenchmarkErdSpec(): CompiledDiagramSpec {
  return {
    diagramId: "erd_compiled",
    title: "Unified Database Schema & ERD Semantic Layer",
    columns: [],
    connections: []
  };
}

/**
 * Returns the benchmark Cognitive Architecture (Agentic RAG) specification for instant compilation
 */
export function getBenchmarkAgenticRagSpec(): CompiledDiagramSpec {
  return {
    diagramId: "agentic_rag_compiled",
    title: "Cognitive Architecture (Agentic RAG)",
    columns: [],
    connections: []
  };
}

/**
 * Returns the benchmark Micro Dynamic Sequence Diagram specification for instant compilation
 */
export function getBenchmarkSequenceDiagramSpec(): CompiledDiagramSpec {
  return {
    diagramId: "sequence_diagram_compiled",
    title: "Micro Dynamic Sequence Diagram (Governed Handshake)",
    columns: [],
    connections: []
  };
}

/**
 * Returns the benchmark Macro Dynamic Sequence Diagram specification for instant compilation
 */
export function getBenchmarkMacroSequenceDiagramSpec(): CompiledDiagramSpec {
  return {
    diagramId: "macro_sequence_diagram_compiled",
    title: "COMPLETE END-TO-END DYNAMIC SEQUENCE DIAGRAM",
    columns: [],
    connections: []
  };
}

/**
 * Returns the benchmark Data & AI Pipeline specification for instant compilation
 */
export function getBenchmarkDataAiPipelineSpec(): CompiledDiagramSpec {
  return {
    diagramId: "data_ai_pipeline_compiled",
    title: "Combining Data Flow (DFD), MLOps Lifecycle, and Feature Engineering",
    columns: [],
    connections: []
  };
}

/**
 * Returns the benchmark Secure Deployment Map specification for instant compilation
 */
export function getBenchmarkSecureDeploymentMapSpec(): CompiledDiagramSpec {
  return {
    diagramId: "secure_deployment_map_compiled",
    title: "Google Cloud Project (ITACS Platform Production)",
    columns: [],
    connections: []
  };
}

/**
 * Returns the benchmark DevOps & CI/CD Pipeline specification for instant compilation
 */
export function getBenchmarkDevopsCicdPipelineSpec(): CompiledDiagramSpec {
  return {
    diagramId: "devops_cicd_pipeline_compiled",
    title: "Diagram: The Operational Flow",
    columns: [],
    connections: []
  };
}

/**
 * Returns the benchmark Governance & State Machine specification for instant compilation
 */
export function getBenchmarkGovernanceStateMachineSpec(): CompiledDiagramSpec {
  return {
    diagramId: "governance_state_machine_compiled",
    title: 'UNIFIED GOVERNANCE & STATE-MACHINE LIFECYCLE: THE "WHAT STATUS" TOTAL SYSTEM VIEW.',
    columns: [],
    connections: []
  };
}

export function getBenchmarkUnifiedSystemViewSpec(): CompiledDiagramSpec {
  return {
    diagramId: "unified_system_view_compiled",
    title: "ITACS Integrated Insights Platform - TOTAL UNIFIED SYSTEM VIEW",
    columns: [],
    connections: []
  };
}

export function getBenchmarkDarkModeUnifiedSystemViewSpec(): CompiledDiagramSpec {
  return {
    diagramId: "dark_mode_unified_system_view_compiled",
    title: "ITACS Integrated Insights Platform - TOTAL UNIFIED SYSTEM VIEW (Dark Mode)",
    columns: [],
    connections: []
  };
}

export function getExactDarkModeUnifiedSystemViewReferenceXml(): string {
  return `
<mxfile host="embed.diagrams.net">
  <diagram id="dark_mode_unified_system_view_compiled" name="ITACS Integrated Insights Platform - TOTAL UNIFIED SYSTEM VIEW (Dark Mode)">
    <mxGraphModel dx="1920" dy="1150" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1920" pageHeight="1150" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- 1. Global Header Bar -->
        <mxCell id="dm_hdr_title" value="&lt;div style='text-align:center;color:#FFFFFF;'&gt;&lt;b style='font-size:16px;'&gt;ITACS Integrated Insights Platform - TOTAL UNIFIED SYSTEM VIEW: Data, Cognition, Deployment, &amp;amp; Governance (End-to-End without Compromise)&lt;/b&gt;&lt;br&gt;&lt;font style='font-size:12px;font-weight:normal;color:#A0AAB5;'&gt;Mapping Data Flow, Orchestration, Time, and Governance across Data/AI Solutions&lt;/font&gt;&lt;/div&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#0B111A;strokeColor=#1E293B;strokeWidth=1;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="15" y="15" width="1890" height="55" as="geometry" />
        </mxCell>

        <!-- 2. Swimlane 1: L1 (Top) -->
        <mxCell id="dm_l1_tab" value="&lt;b style='font-size:10px;color:#000000;'&gt;L1: Poots &amp;amp;&lt;br&gt;Plonning&lt;br&gt;Phases&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#A0AAB5;strokeColor=#64748B;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="15" y="80" width="55" height="150" as="geometry" />
        </mxCell>
        <mxCell id="dm_l1_lane" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0B111A;strokeColor=#334155;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="75" y="80" width="1830" height="150" as="geometry" />
        </mxCell>

        <!-- Box 1 -->
        <mxCell id="dm_l1_b1" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#111827;strokeColor=#FFFFFF;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="90" y="95" width="480" height="120" as="geometry" />
        </mxCell>
        <mxCell id="dm_l1_b1_title" value="&lt;b style='font-size:11px;color:#FFFFFF;'&gt;ITACS Governing Cloud Tenant (Mensged Services) &lt;font style='color:#A0AAB5;font-weight:normal;'&gt;(References image 15)&lt;/font&gt;&lt;/b&gt;" style="whiteSpace=wrap;text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1"><mxGeometry x="100" y="100" width="450" height="20" as="geometry" /></mxCell>
        <mxCell id="dm_l1_silo" value="&lt;span style='font-size:32px;'&gt;🧑‍💻&lt;/span&gt;&lt;br&gt;&lt;b style='font-size:10px;color:#FFFFFF;'&gt;Silo Analysts&lt;/b&gt;" style="whiteSpace=wrap;text;html=1;strokeColor=none;fillColor=none;align=center;" vertex="1" parent="1"><mxGeometry x="140" y="125" width="100" height="75" as="geometry" /></mxCell>
        <mxCell id="dm_l1_gcp" value="&lt;span style='font-size:32px;'&gt;☁️&lt;/span&gt;&lt;br&gt;&lt;b style='font-size:10px;color:#FFFFFF;'&gt;Google Workspace&lt;br&gt;Connectors&lt;/b&gt;" style="whiteSpace=wrap;text;html=1;strokeColor=none;fillColor=none;align=center;" vertex="1" parent="1"><mxGeometry x="320" y="125" width="130" height="75" as="geometry" /></mxCell>

        <!-- Connector between Box 1 and Box 2 -->
        <mxCell id="dm_l1_arr1" value="" style="endArrow=block;endFill=1;strokeColor=#22D3EE;strokeWidth=2;html=1;" edge="1" parent="1" source="dm_l1_b1" target="dm_l1_b2"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="dm_l1_lbl_up" value="&lt;font style='font-size:9px;color:#A0AAB5;'&gt;Analysts upload raw dacs&lt;br&gt;(POFS, PPTs)&lt;/font&gt;" style="whiteSpace=wrap;text;html=1;strokeColor=none;fillColor=none;align=center;" vertex="1" parent="1"><mxGeometry x="580" y="115" width="140" height="30" as="geometry" /></mxCell>
        <mxCell id="dm_l1_lbl_dn" value="&lt;font style='font-size:9px;color:#A0AAB5;'&gt;Stream data&lt;/font&gt;" style="whiteSpace=wrap;text;html=1;strokeColor=none;fillColor=none;align=center;" vertex="1" parent="1"><mxGeometry x="580" y="165" width="140" height="20" as="geometry" /></mxCell>

        <!-- Box 2 -->
        <mxCell id="dm_l1_b2" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#111827;strokeColor=#FFFFFF;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="730" y="95" width="340" height="120" as="geometry" />
        </mxCell>
        <mxCell id="dm_l1_b2_title" value="&lt;b style='font-size:11px;color:#FFFFFF;'&gt;Plan &amp;amp; Data Foundation &lt;font style='color:#A0AAB5;font-weight:normal;'&gt;(Vetting &amp;amp; ERD Integration)&lt;/font&gt;&lt;/b&gt;" style="whiteSpace=wrap;text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1"><mxGeometry x="740" y="100" width="320" height="20" as="geometry" /></mxCell>
        <mxCell id="dm_l1_lake" value="&lt;span style='font-size:28px;'&gt;🪣&lt;/span&gt;&lt;br&gt;&lt;b style='font-size:11px;color:#38BDF8;'&gt;GCS Secure Bucket&lt;br&gt;(Raw Data Lake)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#0284C7;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="830" y="125" width="140" height="75" as="geometry" /></mxCell>

        <!-- Connector between Box 2 and Box 3 -->
        <mxCell id="dm_l1_arr2" value="" style="endArrow=block;endFill=1;strokeColor=#22D3EE;strokeWidth=2;html=1;" edge="1" parent="1" source="dm_l1_b2" target="dm_l1_b3"><mxGeometry relative="1" as="geometry" /></mxCell>

        <!-- Box 3 -->
        <mxCell id="dm_l1_b3" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#111827;strokeColor=#FFFFFF;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1110" y="95" width="770" height="120" as="geometry" />
        </mxCell>
        <mxCell id="dm_l1_b3_title" value="&lt;b style='font-size:12px;color:#FFFFFF;'&gt;Entire ultre-diate in organizing across major phases&lt;/b&gt;" style="whiteSpace=wrap;text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1"><mxGeometry x="1125" y="100" width="400" height="20" as="geometry" /></mxCell>
        <mxCell id="dm_l1_erd_box" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0B111A;strokeColor=#38BDF8;strokeWidth=1;strokeDashArray=3 3;" vertex="1" parent="1"><mxGeometry x="1135" y="125" width="670" height="75" as="geometry" /></mxCell>
        <mxCell id="dm_l1_e1" value="&lt;b style='font-size:8px;color:#38BDF8;'&gt;Table A&lt;/b&gt;" style="whiteSpace=wrap;html=1;rounded=0;fillColor=#1E293B;strokeColor=#38BDF8;" vertex="1" parent="1"><mxGeometry x="1160" y="145" width="70" height="30" as="geometry" /></mxCell>
        <mxCell id="dm_l1_e2" value="&lt;b style='font-size:8px;color:#38BDF8;'&gt;Table B&lt;/b&gt;" style="whiteSpace=wrap;html=1;rounded=0;fillColor=#1E293B;strokeColor=#38BDF8;" vertex="1" parent="1"><mxGeometry x="1300" y="145" width="70" height="30" as="geometry" /></mxCell>
        <mxCell id="dm_l1_e3" value="&lt;b style='font-size:8px;color:#38BDF8;'&gt;Table C&lt;/b&gt;" style="whiteSpace=wrap;html=1;rounded=0;fillColor=#1E293B;strokeColor=#38BDF8;" vertex="1" parent="1"><mxGeometry x="1440" y="145" width="70" height="30" as="geometry" /></mxCell>
        <mxCell id="dm_l1_e4" value="&lt;b style='font-size:8px;color:#38BDF8;'&gt;Table D&lt;/b&gt;" style="whiteSpace=wrap;html=1;rounded=0;fillColor=#1E293B;strokeColor=#38BDF8;" vertex="1" parent="1"><mxGeometry x="1580" y="145" width="70" height="30" as="geometry" /></mxCell>
        <mxCell id="dm_l1_earr1" value="" style="endArrow=none;strokeColor=#64748B;html=1;" edge="1" parent="1" source="dm_l1_e1" target="dm_l1_e2"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="dm_l1_earr2" value="" style="endArrow=none;strokeColor=#64748B;html=1;" edge="1" parent="1" source="dm_l1_e2" target="dm_l1_e3"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="dm_l1_earr3" value="" style="endArrow=none;strokeColor=#64748B;html=1;" edge="1" parent="1" source="dm_l1_e3" target="dm_l1_e4"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="dm_l1_badge" value="&lt;font style='font-size:6px;color:#FFFFFF;'&gt;ERD&lt;br&gt;Schema&lt;br&gt;Enforcement&lt;/font&gt;" style="ellipse;whiteSpace=wrap;html=1;fillColor=#1D4ED8;strokeColor=#60A5FA;strokeWidth=1.5;align=center;" vertex="1" parent="1"><mxGeometry x="1820" y="105" width="45" height="45" as="geometry" /></mxCell>

        <!-- 3. Swimlane 2: L2 -->
        <mxCell id="dm_l2_tab" value="&lt;b style='font-size:9px;color:#000000;'&gt;L2. DEVELOPMENT&lt;br&gt;&amp;amp; AI LIFECYCLE&lt;br&gt;(iosograto4 MLOps...&lt;br&gt;(ocograto4 MLOps(L)MLOpa,&lt;br&gt;Stalo Machine &amp;amp;&lt;br&gt;Pipolinos)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#A0AAB5;strokeColor=#64748B;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="15" y="240" width="55" height="280" as="geometry" />
        </mxCell>
        <mxCell id="dm_l2_lane" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0B111A;strokeColor=#334155;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="75" y="240" width="1830" height="280" as="geometry" />
        </mxCell>

        <!-- Track 2a Container -->
        <mxCell id="dm_t2a_box" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#111827;strokeColor=#FFFFFF;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="90" y="250" width="370" height="260" as="geometry" />
        </mxCell>
        <mxCell id="dm_t2a_title" value="&lt;b style='font-size:11px;color:#FFFFFF;'&gt;DEVELOPMENT &amp;amp; AI LIFECYCLE (iosograto4 MLOps... &lt;font style='color:#A0AAB5;font-weight:normal;'&gt;(References image 15 &amp;amp; 5)&lt;/font&gt;&lt;/b&gt;" style="whiteSpace=wrap;text;html=1;strokeColor=none;fillColor=none;align=left;padding=6;" vertex="1" parent="1"><mxGeometry x="100" y="255" width="350" height="20" as="geometry" /></mxCell>
        <mxCell id="dm_t2a_p1" value="&lt;b style='font-size:10px;color:#FFFFFF;'&gt;Market Research&lt;/b&gt;" style="whiteSpace=wrap;html=1;rounded=1;fillColor=#0F766E;strokeColor=#2DD4BF;arcSize=50;" vertex="1" parent="1"><mxGeometry x="105" y="285" width="115" height="26" as="geometry" /></mxCell>
        <mxCell id="dm_t2a_p2" value="&lt;b style='font-size:10px;color:#FFFFFF;'&gt;Access&lt;/b&gt;" style="whiteSpace=wrap;html=1;rounded=1;fillColor=#0F766E;strokeColor=#2DD4BF;arcSize=50;" vertex="1" parent="1"><mxGeometry x="105" y="325" width="115" height="26" as="geometry" /></mxCell>
        <mxCell id="dm_t2a_p3" value="&lt;b style='font-size:10px;color:#FFFFFF;'&gt;Outcomes&lt;/b&gt;" style="whiteSpace=wrap;html=1;rounded=1;fillColor=#0F766E;strokeColor=#2DD4BF;arcSize=50;" vertex="1" parent="1"><mxGeometry x="105" y="365" width="115" height="26" as="geometry" /></mxCell>
        <mxCell id="dm_t2a_p4" value="&lt;b style='font-size:10px;color:#FFFFFF;'&gt;Medical&lt;/b&gt;" style="whiteSpace=wrap;html=1;rounded=1;fillColor=#0F766E;strokeColor=#2DD4BF;arcSize=50;" vertex="1" parent="1"><mxGeometry x="105" y="405" width="115" height="26" as="geometry" /></mxCell>
        <mxCell id="dm_t2a_p5" value="&lt;b style='font-size:10px;color:#FFFFFF;'&gt;Competitive Intel&lt;/b&gt;" style="whiteSpace=wrap;html=1;rounded=1;fillColor=#0F766E;strokeColor=#2DD4BF;arcSize=50;" vertex="1" parent="1"><mxGeometry x="105" y="445" width="115" height="26" as="geometry" /></mxCell>
        <mxCell id="dm_t2a_raw" value="&lt;b style='font-size:11px;color:#FFFFFF;'&gt;Raw&lt;br&gt;Data&lt;/b&gt;" style="whiteSpace=wrap;text;html=1;strokeColor=none;fillColor=none;align=center;" vertex="1" parent="1"><mxGeometry x="235" y="350" width="45" height="40" as="geometry" /></mxCell>
        <mxCell id="dm_t2a_sf" value="&lt;span style='font-size:20px;'&gt;☁️&lt;/span&gt;&lt;br&gt;&lt;font style='font-size:9px;color:#38BDF8;'&gt;Salesforce&lt;/font&gt;" style="whiteSpace=wrap;text;html=1;strokeColor=none;fillColor=none;align=center;" vertex="1" parent="1"><mxGeometry x="290" y="295" width="80" height="40" as="geometry" /></mxCell>
        <mxCell id="dm_t2a_pg" value="&lt;span style='font-size:20px;'&gt;🛢️&lt;/span&gt;&lt;br&gt;&lt;font style='font-size:9px;color:#38BDF8;'&gt;Postgres&lt;/font&gt;" style="whiteSpace=wrap;text;html=1;strokeColor=none;fillColor=none;align=center;" vertex="1" parent="1"><mxGeometry x="290" y="360" width="80" height="40" as="geometry" /></mxCell>
        <mxCell id="dm_t2a_uf" value="&lt;span style='font-size:20px;'&gt;📄&lt;/span&gt;&lt;br&gt;&lt;font style='font-size:9px;color:#38BDF8;'&gt;Unstructured Files&lt;/font&gt;" style="whiteSpace=wrap;text;html=1;strokeColor=none;fillColor=none;align=center;" vertex="1" parent="1"><mxGeometry x="290" y="425" width="80" height="40" as="geometry" /></mxCell>

        <!-- Connector out of Track 2a -->
        <mxCell id="dm_t2a_arr_out" value="" style="endArrow=block;endFill=1;strokeColor=#22D3EE;strokeWidth=2;html=1;" edge="1" parent="1" source="dm_t2a_box" target="dm_t2b_box"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="dm_vpc_sc_pill" value="&lt;b style='font-size:10px;color:#FFFFFF;'&gt;VPC-SC&lt;/b&gt;" style="whiteSpace=wrap;html=1;rounded=1;fillColor=#EA580C;strokeColor=#FB923C;arcSize=50;padding=2;align=center;" vertex="1" parent="1"><mxGeometry x="470" y="370" width="70" height="24" as="geometry" /></mxCell>

        <!-- Track 2b Container -->
        <mxCell id="dm_t2b_box" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#111827;strokeColor=#FFFFFF;strokeWidth=1.5;strokeDashArray=6 6;" vertex="1" parent="1">
          <mxGeometry x="550" y="250" width="410" height="260" as="geometry" />
        </mxCell>
        <mxCell id="dm_t2b_title" value="&lt;b style='font-size:11px;color:#FFFFFF;'&gt;Zones 2 &amp;amp; 5 from image 5&lt;/b&gt;" style="whiteSpace=wrap;text;html=1;strokeColor=none;fillColor=none;align=left;padding=6;" vertex="1" parent="1"><mxGeometry x="560" y="255" width="250" height="20" as="geometry" /></mxCell>
        <mxCell id="dm_trans_box" value="&lt;b style='font-size:11px;color:#38BDF8;'&gt;Transform&lt;/b&gt;" style="whiteSpace=wrap;html=1;rounded=1;fillColor=#0F172A;strokeColor=#38BDF8;strokeWidth=1.5;verticalAlign=top;paddingTop=6;" vertex="1" parent="1"><mxGeometry x="565" y="285" width="180" height="205" as="geometry" /></mxCell>
        <mxCell id="dm_tc1" value="&lt;b style='font-size:10px;color:#38BDF8;'&gt;Clean&lt;/b&gt;" style="whiteSpace=wrap;html=1;ellipse;fillColor=#1E293B;strokeColor=#38BDF8;" vertex="1" parent="1"><mxGeometry x="580" y="315" width="65" height="50" as="geometry" /></mxCell>
        <mxCell id="dm_tc2" value="&lt;b style='font-size:10px;color:#38BDF8;'&gt;Normalize&lt;/b&gt;" style="whiteSpace=wrap;html=1;ellipse;fillColor=#1E293B;strokeColor=#38BDF8;" vertex="1" parent="1"><mxGeometry x="665" y="315" width="65" height="50" as="geometry" /></mxCell>
        <mxCell id="dm_tc3" value="&lt;b style='font-size:10px;color:#38BDF8;'&gt;Aggregate&lt;/b&gt;" style="whiteSpace=wrap;html=1;ellipse;fillColor=#1E293B;strokeColor=#38BDF8;" vertex="1" parent="1"><mxGeometry x="580" y="390" width="65" height="50" as="geometry" /></mxCell>
        <mxCell id="dm_tc4" value="&lt;b style='font-size:10px;color:#38BDF8;'&gt;Encode&lt;/b&gt;" style="whiteSpace=wrap;html=1;ellipse;fillColor=#1E293B;strokeColor=#38BDF8;" vertex="1" parent="1"><mxGeometry x="665" y="390" width="65" height="50" as="geometry" /></mxCell>

        <mxCell id="dm_arr_tr_dbt" value="" style="endArrow=block;endFill=1;strokeColor=#22D3EE;strokeWidth=1.5;html=1;" edge="1" parent="1" source="dm_trans_box" target="dm_dbt_x"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="dm_dbt_x" value="&lt;span style='font-size:22px;'&gt;❌&lt;/span&gt;&lt;br&gt;&lt;b style='font-size:10px;color:#FFFFFF;'&gt;dbt models&lt;/b&gt;" style="whiteSpace=wrap;text;html=1;strokeColor=none;fillColor=none;align=center;" vertex="1" parent="1"><mxGeometry x="760" y="355" width="70" height="50" as="geometry" /></mxCell>
        <mxCell id="dm_arr_dbt_sql" value="" style="endArrow=block;endFill=1;strokeColor=#22D3EE;strokeWidth=1.5;html=1;" edge="1" parent="1" source="dm_dbt_x" target="dm_sql_sq"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="dm_sql_sq" value="&lt;b style='font-size:10px;color:#000000;'&gt;SQL&lt;br&gt;dbt/SQL&lt;/b&gt;" style="whiteSpace=wrap;html=1;rounded=0;fillColor=#A0AAB5;strokeColor=#FFFFFF;" vertex="1" parent="1"><mxGeometry x="845" y="360" width="60" height="40" as="geometry" /></mxCell>
        <mxCell id="dm_arr_sql_feat" value="" style="endArrow=block;endFill=1;strokeColor=#22D3EE;strokeWidth=1.5;html=1;" edge="1" parent="1" source="dm_sql_sq" target="dm_feat_st"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="dm_feat_st" value="&lt;span style='font-size:24px;'&gt;🗃️&lt;/span&gt;&lt;br&gt;&lt;b style='font-size:10px;color:#38BDF8;'&gt;Managed&lt;br&gt;Feature Store&lt;/b&gt;" style="whiteSpace=wrap;html=1;rounded=1;fillColor=#0F172A;strokeColor=#0284C7;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="925" y="340" width="100" height="80" as="geometry" /></mxCell>

        <!-- Track 2c Container -->
        <mxCell id="dm_t2c_box" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#111827;strokeColor=#38BDF8;strokeWidth=1.5;strokeDashArray=6 6;" vertex="1" parent="1">
          <mxGeometry x="980" y="250" width="910" height="260" as="geometry" />
        </mxCell>
        <mxCell id="dm_t2c_title" value="&lt;b style='font-size:11px;color:#38BDF8;'&gt;Governance Boundary incogporating the full unified audits from Image 15&lt;/b&gt;" style="whiteSpace=wrap;text;html=1;strokeColor=none;fillColor=none;align=left;padding=6;" vertex="1" parent="1"><mxGeometry x="990" y="255" width="550" height="20" as="geometry" /></mxCell>

        <!-- Internal Node Flow -->
        <mxCell id="dm_vet_node" value="&lt;span style='font-size:24px;'&gt;🔍&lt;/span&gt;&lt;br&gt;&lt;b style='font-size:10px;color:#FFFFFF;'&gt;DATA VETTING&lt;/b&gt;" style="whiteSpace=wrap;html=1;ellipse;fillColor=#1E3A8A;strokeColor=#60A5FA;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="1000" y="325" width="85" height="85" as="geometry" /></mxCell>
        <mxCell id="dm_arr_vet_cre" value="" style="endArrow=block;endFill=1;strokeColor=#22D3EE;strokeWidth=1.5;html=1;" edge="1" parent="1" source="dm_vet_node" target="dm_cre_node"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="dm_cre_node" value="&lt;b style='font-size:11px;color:#FFFFFF;'&gt;CREATED&lt;br&gt;&lt;font style='color:#A0AAB5;'&gt;(Modsl/Prompt)&lt;/font&gt;&lt;/b&gt;" style="whiteSpace=wrap;html=1;rounded=1;fillColor=#1E3A8A;strokeColor=#60A5FA;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="1115" y="335" width="115" height="65" as="geometry" /></mxCell>
        <mxCell id="dm_arr_cre_trn" value="" style="endArrow=block;endFill=1;strokeColor=#22D3EE;strokeWidth=1.5;html=1;" edge="1" parent="1" source="dm_cre_node" target="dm_trn_node"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="dm_trn_node" value="&lt;b style='font-size:11px;color:#FFFFFF;'&gt;TRAINING&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:18px;'&gt;🔄&lt;/span&gt;&lt;br&gt;&lt;font style='font-size:9px;color:#A0AAB5;'&gt;Retraining/&lt;br&gt;Refinement Loop&lt;/font&gt;" style="whiteSpace=wrap;html=1;rounded=1;fillColor=#1E3A8A;strokeColor=#60A5FA;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="1260" y="320" width="130" height="95" as="geometry" /></mxCell>
        <mxCell id="dm_arr_trn_evl" value="" style="endArrow=block;endFill=1;strokeColor=#22D3EE;strokeWidth=1.5;html=1;" edge="1" parent="1" source="dm_trn_node" target="dm_evl_node"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="dm_evl_node" value="&lt;b style='font-size:11px;color:#FFFFFF;'&gt;EVALUATED&lt;/b&gt;&lt;br&gt;&lt;font style='font-size:9px;color:#A0AAB5;'&gt;offhoe Metrics&lt;br&gt;Bias &amp;amp; Pairoess Audit&lt;br&gt;Metripls metics&lt;/font&gt;" style="whiteSpace=wrap;html=1;rounded=1;fillColor=#1E3A8A;strokeColor=#60A5FA;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="1420" y="325" width="140" height="85" as="geometry" /></mxCell>
        <mxCell id="dm_arr_evl_hil" value="" style="endArrow=block;endFill=1;strokeColor=#22D3EE;strokeWidth=1.5;html=1;" edge="1" parent="1" source="dm_evl_node" target="dm_hil_node"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="dm_lbl_acc" value="&lt;font style='font-size:9px;color:#FFFFFF;'&gt;Accursay/P1&lt;/font&gt;" style="whiteSpace=wrap;text;html=1;strokeColor=none;fillColor=none;align=center;" vertex="1" parent="1"><mxGeometry x="1565" y="340" width="65" height="20" as="geometry" /></mxCell>
        <mxCell id="dm_hil_node" value="&lt;span style='font-size:22px;'&gt;🛡️👤&lt;/span&gt;&lt;br&gt;&lt;b style='font-size:10px;color:#FFFFFF;'&gt;Noman-in-the-Loop&lt;br&gt;&lt;font style='color:#A0AAB5;'&gt;(dhified Soromance&lt;br&gt;Beant)&lt;/font&gt;&lt;/b&gt;" style="whiteSpace=wrap;html=1;rounded=1;fillColor=#1E3A8A;strokeColor=#60A5FA;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="1640" y="325" width="140" height="85" as="geometry" /></mxCell>

        <!-- Overlapping top-right of Noman: Green pill APPROVED -->
        <mxCell id="dm_app_pill" value="&lt;b style='font-size:11px;color:#FFFFFF;'&gt;APPROVED&lt;/b&gt;" style="whiteSpace=wrap;html=1;rounded=1;fillColor=#15803D;strokeColor=#22C55E;arcSize=50;" vertex="1" parent="1"><mxGeometry x="1750" y="305" width="90" height="30" as="geometry" /></mxCell>
        <mxCell id="dm_gke_inf" value="&lt;font style='font-size:9px;color:#22C55E;'&gt;GKE inference compute&lt;/font&gt;" style="whiteSpace=wrap;text;html=1;strokeColor=none;fillColor=none;align=center;" vertex="1" parent="1"><mxGeometry x="1745" y="338" width="100" height="20" as="geometry" /></mxCell>

        <mxCell id="dm_arr_hil_can" value="" style="endArrow=block;endFill=1;strokeColor=#22D3EE;strokeWidth=1.5;html=1;" edge="1" parent="1" source="dm_hil_node" target="dm_can_pill"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="dm_can_pill" value="&lt;b style='font-size:11px;color:#FFFFFF;'&gt;Canary&lt;/b&gt;" style="whiteSpace=wrap;html=1;rounded=1;fillColor=#1E3A8A;strokeColor=#60A5FA;arcSize=50;" vertex="1" parent="1"><mxGeometry x="1740" y="440" width="65" height="30" as="geometry" /></mxCell>
        <mxCell id="dm_arr_can_pro" value="" style="endArrow=block;endFill=1;strokeColor=#22D3EE;strokeWidth=1.5;html=1;" edge="1" parent="1" source="dm_can_pill" target="dm_pro_pill"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="dm_pro_pill" value="&lt;b style='font-size:11px;color:#FFFFFF;'&gt;Promote&lt;/b&gt;" style="whiteSpace=wrap;html=1;rounded=1;fillColor=#1E3A8A;strokeColor=#60A5FA;arcSize=50;" vertex="1" parent="1"><mxGeometry x="1820" y="440" width="65" height="30" as="geometry" /></mxCell>

        <!-- Return Arrows -->
        <mxCell id="dm_loop_exp" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;strokeColor=#F97316;strokeWidth=1.5;endArrow=block;endFill=1;html=1;" edge="1" parent="1" source="dm_pro_pill" target="dm_can_pill"><mxGeometry relative="1" as="geometry"><Array as="points"><mxPoint x="1852" y="495" /><mxPoint x="1772" y="495" /></Array></mxGeometry></mxCell>
        <mxCell id="dm_lbl_exp" value="&lt;font style='font-size:9px;color:#FB923C;'&gt;Explicit rollback&lt;/font&gt;" style="whiteSpace=wrap;text;html=1;strokeColor=none;fillColor=none;align=center;" vertex="1" parent="1"><mxGeometry x="1775" y="498" width="80" height="20" as="geometry" /></mxCell>
        <mxCell id="dm_loop_rb" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;strokeColor=#F97316;strokeWidth=1.5;endArrow=block;endFill=1;html=1;" edge="1" parent="1" source="dm_can_pill" target="dm_hil_node"><mxGeometry relative="1" as="geometry"><Array as="points"><mxPoint x="1772" y="485" /><mxPoint x="1710" y="485" /></Array></mxGeometry></mxCell>
        <mxCell id="dm_lbl_rb" value="&lt;font style='font-size:9px;color:#FB923C;'&gt;Rollback Promotion&lt;/font&gt;" style="whiteSpace=wrap;text;html=1;strokeColor=none;fillColor=none;align=center;" vertex="1" parent="1"><mxGeometry x="1695" y="488" width="90" height="20" as="geometry" /></mxCell>

        <!-- 4. Swimlane 3: L3 -->
        <mxCell id="dm_l3_tab" value="&lt;b style='font-size:9px;color:#000000;'&gt;L3. GOVERNANCE,&lt;br&gt;FEEDBACK &amp;amp;&lt;br&gt;RETIREMENT&lt;br&gt;LIFECYCLE&lt;br&gt;(Refeerence&lt;br&gt;irnago 15)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#A0AAB5;strokeColor=#64748B;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="15" y="530" width="55" height="340" as="geometry" />
        </mxCell>
        <mxCell id="dm_l3_lane" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0B111A;strokeColor=#334155;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="75" y="530" width="1830" height="340" as="geometry" />
        </mxCell>

        <!-- Box 1 -->
        <mxCell id="dm_l3_b1" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#111827;strokeColor=#FFFFFF;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="90" y="540" width="220" height="150" as="geometry" />
        </mxCell>
        <mxCell id="dm_l3_b1_title" value="&lt;b style='font-size:10px;color:#FFFFFF;'&gt;GOVERNANCE, FEEDBACK &amp;amp;&lt;br&gt;DEYIRBMENT LIFECYCLE &lt;font style='color:#A0AAB5;font-weight:normal;'&gt;(References Image 15)&lt;/font&gt;&lt;/b&gt;" style="whiteSpace=wrap;text;html=1;strokeColor=none;fillColor=none;align=left;padding=6;" vertex="1" parent="1"><mxGeometry x="95" y="545" width="210" height="30" as="geometry" /></mxCell>
        <mxCell id="dm_l3_pg_box" value="&lt;b style='font-size:10px;color:#FFFFFF;'&gt;Plan &amp;amp; Govern&lt;/b&gt;" style="whiteSpace=wrap;html=1;rounded=1;fillColor=#1E3A8A;strokeColor=#38BDF8;verticalAlign=top;paddingTop=5;" vertex="1" parent="1"><mxGeometry x="105" y="585" width="190" height="95" as="geometry" /></mxCell>
        <mxCell id="dm_l3_actor" value="&lt;span style='font-size:24px;'&gt;🧑‍💼&lt;/span&gt;&lt;br&gt;&lt;font style='font-size:9px;color:#FFFFFF;'&gt;actor&lt;/font&gt;" style="whiteSpace=wrap;text;html=1;strokeColor=none;fillColor=none;align=center;" vertex="1" parent="1"><mxGeometry x="115" y="615" width="60" height="55" as="geometry" /></mxCell>
        <mxCell id="dm_l3_gcpw" value="&lt;span style='font-size:24px;'&gt;☁️&lt;/span&gt;&lt;br&gt;&lt;font style='font-size:9px;color:#FFFFFF;'&gt;GCP Workapace&lt;br&gt;Connectors&lt;/font&gt;" style="whiteSpace=wrap;text;html=1;strokeColor=none;fillColor=none;align=center;" vertex="1" parent="1"><mxGeometry x="190" y="615" width="90" height="55" as="geometry" /></mxCell>

        <!-- Box 2 -->
        <mxCell id="dm_l3_b2" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#111827;strokeColor=#FFFFFF;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="325" y="540" width="700" height="150" as="geometry" />
        </mxCell>
        <mxCell id="dm_l3_b2_title" value="&lt;b style='font-size:11px;color:#FFFFFF;'&gt;MLOps Lifecycle: model, training, eval, approval, deployment &amp;amp; monitoring &lt;font style='color:#A0AAB5;font-weight:normal;'&gt;(References image 13)&lt;/font&gt;&lt;/b&gt;" style="whiteSpace=wrap;text;html=1;strokeColor=none;fillColor=none;align=left;padding=6;" vertex="1" parent="1"><mxGeometry x="335" y="545" width="650" height="20" as="geometry" /></mxCell>
        <mxCell id="dm_l3_mleng" value="&lt;span style='font-size:26px;'&gt;👨‍💻&lt;/span&gt;&lt;br&gt;&lt;font style='font-size:9px;color:#FFFFFF;'&gt;ML Enginaer&lt;/font&gt;" style="whiteSpace=wrap;text;html=1;strokeColor=none;fillColor=none;align=center;" vertex="1" parent="1"><mxGeometry x="340" y="590" width="70" height="60" as="geometry" /></mxCell>
        <mxCell id="dm_arr_ml_air" value="" style="endArrow=block;endFill=1;strokeColor=#22D3EE;strokeWidth=1.5;html=1;" edge="1" parent="1" source="dm_l3_mleng" target="dm_l3_air"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="dm_lbl_anal" value="&lt;font style='font-size:8px;color:#A0AAB5;'&gt;analists aplioad rao osss&lt;/font&gt;" style="whiteSpace=wrap;text;html=1;strokeColor=none;fillColor=none;align=center;" vertex="1" parent="1"><mxGeometry x="405" y="575" width="110" height="20" as="geometry" /></mxCell>
        <mxCell id="dm_l3_air" value="&lt;span style='font-size:22px;'&gt;🎈&lt;/span&gt;&lt;br&gt;&lt;b style='font-size:9px;color:#38BDF8;'&gt;Airflow&lt;br&gt;Scheduler&lt;/b&gt;" style="whiteSpace=wrap;html=1;rounded=1;fillColor=#0F172A;strokeColor=#38BDF8;" vertex="1" parent="1"><mxGeometry x="515" y="590" width="75" height="60" as="geometry" /></mxCell>
        <mxCell id="dm_arr_air_vtx" value="" style="endArrow=block;endFill=1;strokeColor=#22D3EE;strokeWidth=1.5;html=1;" edge="1" parent="1" source="dm_l3_air" target="dm_l3_vtx"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="dm_lbl_init" value="&lt;font style='font-size:8px;color:#A0AAB5;'&gt;initiates training, pulls features, executes training&lt;/font&gt;" style="whiteSpace=wrap;text;html=1;strokeColor=none;fillColor=none;align=center;" vertex="1" parent="1"><mxGeometry x="585" y="570" width="120" height="25" as="geometry" /></mxCell>
        <mxCell id="dm_l3_vtx" value="&lt;span style='font-size:22px;'&gt;🧠&lt;/span&gt;&lt;br&gt;&lt;b style='font-size:9px;color:#FFFFFF;'&gt;Model Traioing&lt;br&gt;&lt;font style='color:#A0AAB5;'&gt;(Vertex AI)&lt;/font&gt;&lt;/b&gt;" style="whiteSpace=wrap;html=1;rounded=1;fillColor=#1E3A8A;strokeColor=#60A5FA;" vertex="1" parent="1"><mxGeometry x="705" y="590" width="90" height="60" as="geometry" /></mxCell>
        <mxCell id="dm_arr_vtx_reg" value="" style="endArrow=block;endFill=1;strokeColor=#22D3EE;strokeWidth=1.5;html=1;" edge="1" parent="1" source="dm_l3_vtx" target="dm_l3_reg"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="dm_lbl_stat_ev" value="&lt;font style='font-size:8px;color:#22C55E;font-weight:bold;'&gt;Status: EVALUATED&lt;/font&gt;" style="whiteSpace=wrap;text;html=1;strokeColor=none;fillColor=none;align=center;" vertex="1" parent="1"><mxGeometry x="790" y="575" width="90" height="20" as="geometry" /></mxCell>
        <mxCell id="dm_l3_reg" value="&lt;span style='font-size:22px;'&gt;🗃️&lt;/span&gt;&lt;br&gt;&lt;b style='font-size:9px;color:#FFFFFF;'&gt;Model&lt;br&gt;Registry&lt;/b&gt;" style="whiteSpace=wrap;html=1;rounded=1;fillColor=#1E3A8A;strokeColor=#60A5FA;" vertex="1" parent="1"><mxGeometry x="875" y="590" width="75" height="60" as="geometry" /></mxCell>
        <mxCell id="dm_arr_reg_gov" value="" style="endArrow=block;endFill=1;strokeColor=#22D3EE;strokeWidth=1.5;html=1;" edge="1" parent="1" source="dm_l3_reg" target="dm_l3_gov"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="dm_l3_gov" value="&lt;span style='font-size:22px;'&gt;⚖️&lt;/span&gt;&lt;br&gt;&lt;b style='font-size:9px;color:#FFFFFF;'&gt;Governance Board&lt;br&gt;&lt;font style='color:#A0AAB5;'&gt;(Human-in-the-Loop)&lt;/font&gt;&lt;/b&gt;" style="whiteSpace=wrap;html=1;rounded=1;fillColor=#1E3A8A;strokeColor=#60A5FA;" vertex="1" parent="1"><mxGeometry x="965" y="585" width="115" height="65" as="geometry" /></mxCell>
        <mxCell id="dm_lbl_hil_app" value="&lt;font style='font-size:8px;color:#A0AAB5;'&gt;provides Human in-the-Loop approval&lt;/font&gt;" style="whiteSpace=wrap;text;html=1;strokeColor=none;fillColor=none;align=center;" vertex="1" parent="1"><mxGeometry x="960" y="655" width="125" height="20" as="geometry" /></mxCell>
        <mxCell id="dm_l3_dep" value="&lt;b style='font-size:9px;color:#38BDF8;'&gt;Deployment&lt;br&gt;Pipeline&lt;/b&gt;" style="whiteSpace=wrap;html=1;rounded=1;fillColor=#0F172A;strokeColor=#38BDF8;" vertex="1" parent="1"><mxGeometry x="980" y="680" width="85" height="35" as="geometry" /></mxCell>

        <!-- Box 3 -->
        <mxCell id="dm_l3_b3" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#111827;strokeColor=#FFFFFF;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1040" y="540" width="410" height="150" as="geometry" />
        </mxCell>
        <mxCell id="dm_l3_b3_title" value="&lt;b style='font-size:11px;color:#FFFFFF;'&gt;GenAI / Agenlic BAG Orchestratien 5 Analytics Tooling &lt;font style='color:#A0AAB5;font-weight:normal;'&gt;(References image 15)&lt;/font&gt;&lt;/b&gt;" style="whiteSpace=wrap;text;html=1;strokeColor=none;fillColor=none;align=left;padding=6;" vertex="1" parent="1"><mxGeometry x="1050" y="545" width="390" height="20" as="geometry" /></mxCell>
        <mxCell id="dm_l3_gke_end" value="&lt;span style='font-size:24px;'&gt;☸️&lt;/span&gt;&lt;br&gt;&lt;b style='font-size:10px;color:#FFFFFF;'&gt;GKE leference&lt;br&gt;Endpoint&lt;/b&gt;" style="whiteSpace=wrap;html=1;rounded=1;fillColor=#1E3A8A;strokeColor=#60A5FA;" vertex="1" parent="1"><mxGeometry x="1065" y="590" width="95" height="70" as="geometry" /></mxCell>
        <mxCell id="dm_arr_gke_mon" value="" style="endArrow=block;endFill=1;strokeColor=#22D3EE;strokeWidth=1.5;html=1;" edge="1" parent="1" source="dm_l3_gke_end" target="dm_l3_mon"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="dm_lbl_pull_log" value="&lt;font style='font-size:8px;color:#A0AAB5;'&gt;pulls model, logs inference and dirft&lt;/font&gt;&lt;br&gt;&lt;b style='font-size:8px;color:#22C55E;'&gt;Status: APPROVED&lt;/b&gt;" style="whiteSpace=wrap;text;html=1;strokeColor=none;fillColor=none;align=center;" vertex="1" parent="1"><mxGeometry x="1165" y="575" width="135" height="30" as="geometry" /></mxCell>
        <mxCell id="dm_l3_mon" value="&lt;span style='font-size:24px;'&gt;📈&lt;/span&gt;&lt;br&gt;&lt;b style='font-size:10px;color:#FFFFFF;'&gt;Monitoring&lt;/b&gt;" style="whiteSpace=wrap;html=1;rounded=1;fillColor=#1E3A8A;strokeColor=#60A5FA;" vertex="1" parent="1"><mxGeometry x="1305" y="590" width="85" height="70" as="geometry" /></mxCell>
        <mxCell id="dm_arr_mon_log" value="" style="endArrow=block;endFill=1;strokeColor=#22D3EE;strokeWidth=1.5;html=1;" edge="1" parent="1" source="dm_l3_mon" target="dm_l3_inf_log"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="dm_lbl_push_lag" value="&lt;font style='font-size:8px;color:#A0AAB5;'&gt;pushes lags to &amp;amp; dliift&lt;/font&gt;" style="whiteSpace=wrap;text;html=1;strokeColor=none;fillColor=none;align=center;" vertex="1" parent="1"><mxGeometry x="1300" y="665" width="95" height="20" as="geometry" /></mxCell>
        <mxCell id="dm_l3_inf_log" value="&lt;span style='font-size:24px;'&gt;🛢️&lt;/span&gt;&lt;br&gt;&lt;b style='font-size:10px;color:#22C55E;'&gt;ML lnference&lt;br&gt;Log&lt;/b&gt;" style="whiteSpace=wrap;html=1;rounded=1;fillColor=#0F172A;strokeColor=#22C55E;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="1355" y="685" width="85" height="70" as="geometry" /></mxCell>

        <!-- Box 4 - Main VPC -->
        <mxCell id="dm_l3_b4_vpc" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0B111A;strokeColor=#FACC15;strokeWidth=1.5;strokeDashArray=6 6;" vertex="1" parent="1">
          <mxGeometry x="440" y="705" width="1010" height="155" as="geometry" />
        </mxCell>
        <mxCell id="dm_l3_b4_title" value="&lt;b style='font-size:11px;color:#FACC15;'&gt;Zonss 2 &amp;amp; 5 from image 5&lt;/b&gt;" style="whiteSpace=wrap;text;html=1;strokeColor=none;fillColor=none;align=left;padding=6;" vertex="1" parent="1"><mxGeometry x="450" y="710" width="200" height="20" as="geometry" /></mxCell>

        <!-- Inner Box -->
        <mxCell id="dm_l3_inner_vpc" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#111827;strokeColor=#38BDF8;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="455" y="730" width="980" height="120" as="geometry" />
        </mxCell>
        <mxCell id="dm_l3_inner_title" value="&lt;b style='font-size:11px;color:#38BDF8;'&gt;ITACS Primary VPC Network &lt;font style='color:#FFFFFF;font-weight:normal;'&gt;(Secure Managed Environment)&lt;/font&gt;&lt;/b&gt;" style="whiteSpace=wrap;text;html=1;strokeColor=none;fillColor=none;align=left;padding=6;" vertex="1" parent="1"><mxGeometry x="465" y="732" width="400" height="20" as="geometry" /></mxCell>

        <!-- Left Subnet -->
        <mxCell id="dm_l3_lsub" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0B111A;strokeColor=#FB923C;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="470" y="750" width="440" height="95" as="geometry" />
        </mxCell>
        <mxCell id="dm_l3_lsub_title" value="&lt;b style='font-size:10px;color:#FB923C;'&gt;Private Application Subnet (Isolated) &amp;nbsp;|&amp;nbsp; ITACS Agent Orchestrator (GKE Pod)&lt;/b&gt;" style="whiteSpace=wrap;text;html=1;strokeColor=none;fillColor=none;align=left;padding=4;" vertex="1" parent="1"><mxGeometry x="475" y="752" width="420" height="20" as="geometry" /></mxCell>
        <mxCell id="dm_l3_react" value="&lt;b style='font-size:10px;color:#38BDF8;'&gt;ReAct&lt;br&gt;Loop&lt;/b&gt;&lt;br&gt;&lt;span style='font-size:16px;'&gt;🔄&lt;/span&gt;" style="whiteSpace=wrap;html=1;ellipse;fillColor=#1E293B;strokeColor=#38BDF8;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="485" y="772" width="70" height="70" as="geometry" /></mxCell>
        <mxCell id="dm_rl_t" value="&lt;font style='font-size:7px;color:#38BDF8;'&gt;Thought&lt;/font&gt;" style="whiteSpace=wrap;text;html=1;strokeColor=none;fillColor=none;align=center;" vertex="1" parent="1"><mxGeometry x="500" y="768" width="40" height="15" as="geometry" /></mxCell>
        <mxCell id="dm_rl_a" value="&lt;font style='font-size:7px;color:#38BDF8;'&gt;Action&lt;/font&gt;" style="whiteSpace=wrap;text;html=1;strokeColor=none;fillColor=none;align=center;" vertex="1" parent="1"><mxGeometry x="545" y="798" width="35" height="15" as="geometry" /></mxCell>
        <mxCell id="dm_rl_o" value="&lt;font style='font-size:7px;color:#38BDF8;'&gt;Observation&lt;/font&gt;" style="whiteSpace=wrap;text;html=1;strokeColor=none;fillColor=none;align=center;" vertex="1" parent="1"><mxGeometry x="495" y="835" width="50" height="15" as="geometry" /></mxCell>
        <mxCell id="dm_l3_st1" value="&lt;b style='font-size:9px;color:#FFFFFF;'&gt;Integrated System Prompf&lt;/b&gt;" style="whiteSpace=wrap;html=1;rounded=1;fillColor=#1E3A8A;strokeColor=#60A5FA;" vertex="1" parent="1"><mxGeometry x="575" y="772" width="145" height="20" as="geometry" /></mxCell>
        <mxCell id="dm_l3_st2" value="&lt;b style='font-size:9px;color:#FFFFFF;'&gt;Canversation Memory&lt;/b&gt;" style="whiteSpace=wrap;html=1;rounded=1;fillColor=#1E3A8A;strokeColor=#60A5FA;" vertex="1" parent="1"><mxGeometry x="575" y="797" width="145" height="20" as="geometry" /></mxCell>
        <mxCell id="dm_l3_st3" value="&lt;b style='font-size:9px;color:#FFFFFF;'&gt;Gemini LLM (Reasoner)&lt;/b&gt;" style="whiteSpace=wrap;html=1;rounded=1;fillColor=#1E3A8A;strokeColor=#60A5FA;" vertex="1" parent="1"><mxGeometry x="575" y="822" width="145" height="20" as="geometry" /></mxCell>
        <mxCell id="dm_l3_bullets" value="&lt;font style='font-size:8px;color:#A0AAB5;'&gt;• Betlict Theoghd loop&lt;br&gt;• Actien deoision Tbnoglt&lt;br&gt;• Actien deesion Memery&lt;/font&gt;" style="whiteSpace=wrap;text;html=1;strokeColor=none;fillColor=none;align=left;" vertex="1" parent="1"><mxGeometry x="730" y="778" width="170" height="45" as="geometry" /></mxCell>

        <!-- Right Subnet -->
        <mxCell id="dm_l3_rsub" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0B111A;strokeColor=#FB923C;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="980" y="750" width="445" height="95" as="geometry" />
        </mxCell>
        <mxCell id="dm_l3_rsub_title" value="&lt;b style='font-size:10px;color:#FB923C;'&gt;Private Dete/AI Subwet (Isolated) &amp;nbsp;|&amp;nbsp; Containers/Endpoints (via PSC)&lt;/b&gt;" style="whiteSpace=wrap;text;html=1;strokeColor=none;fillColor=none;align=left;padding=4;" vertex="1" parent="1"><mxGeometry x="985" y="752" width="420" height="20" as="geometry" /></mxCell>
        <mxCell id="dm_l3_t1" value="&lt;b style='font-size:9px;color:#38BDF8;'&gt;Tool 1: Eaterprise Nnowledge (Danaged RiAG)&lt;/b&gt; &lt;font style='font-size:8px;color:#A0AAB5;'&gt;GCS?Vertes A? Search&lt;/font&gt;" style="whiteSpace=wrap;html=1;rounded=1;fillColor=#0F172A;strokeColor=#38BDF8;" vertex="1" parent="1"><mxGeometry x="990" y="773" width="425" height="21" as="geometry" /></mxCell>
        <mxCell id="dm_l3_t2" value="&lt;b style='font-size:9px;color:#38BDF8;'&gt;Tool 2: Boslouss Avalytics (Auakehce)&lt;/b&gt; &lt;font style='font-size:8px;color:#A0AAB5;'&gt;BigQuery SQL&lt;/font&gt;" style="whiteSpace=wrap;html=1;rounded=1;fillColor=#0F172A;strokeColor=#38BDF8;" vertex="1" parent="1"><mxGeometry x="990" y="798" width="425" height="21" as="geometry" /></mxCell>
        <mxCell id="dm_l3_t3" value="&lt;b style='font-size:9px;color:#38BDF8;'&gt;Tool 3: Agentic API Tools&lt;/b&gt; &lt;font style='font-size:8px;color:#A0AAB5;'&gt;Deck Studio API&lt;/font&gt;" style="whiteSpace=wrap;html=1;rounded=1;fillColor=#0F172A;strokeColor=#38BDF8;" vertex="1" parent="1"><mxGeometry x="990" y="823" width="425" height="21" as="geometry" /></mxCell>

        <!-- Connectors between subnets -->
        <mxCell id="dm_arr_sub_act" value="" style="endArrow=block;endFill=1;strokeColor=#22D3EE;strokeWidth=1.5;html=1;" edge="1" parent="1" source="dm_l3_lsub" target="dm_l3_rsub"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="dm_lbl_act_grp" value="&lt;b style='font-size:8px;color:#22D3EE;'&gt;ACTION gRP/HTTP&lt;/b&gt;" style="whiteSpace=wrap;text;html=1;strokeColor=none;fillColor=none;align=center;" vertex="1" parent="1"><mxGeometry x="905" y="765" width="75" height="15" as="geometry" /></mxCell>
        <mxCell id="dm_lbl_prio" value="&lt;font style='font-size:8px;color:#A0AAB5;'&gt;Priocla call&lt;/font&gt;" style="whiteSpace=wrap;text;html=1;strokeColor=none;fillColor=none;align=center;" vertex="1" parent="1"><mxGeometry x="910" y="810" width="65" height="15" as="geometry" /></mxCell>

        <!-- Box 5 - The Edge -->
        <mxCell id="dm_l3_b5_edge" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#111827;strokeColor=#FFFFFF;strokeWidth=1.5;strokeDashArray=6 6;" vertex="1" parent="1">
          <mxGeometry x="1470" y="540" width="430" height="320" as="geometry" />
        </mxCell>
        <mxCell id="dm_l3_b5_title" value="&lt;b style='font-size:11px;color:#FFFFFF;'&gt;Zones 2 &amp;amp; 5 from image 5&lt;/b&gt;" style="whiteSpace=wrap;text;html=1;strokeColor=none;fillColor=none;align=left;padding=6;" vertex="1" parent="1"><mxGeometry x="1480" y="545" width="200" height="20" as="geometry" /></mxCell>
        <mxCell id="dm_waf_top" value="&lt;span style='font-size:18px;'&gt;🛡️&lt;/span&gt; &lt;b style='font-size:10px;color:#FB923C;'&gt;Cloud Armor WAF Rules&lt;/b&gt;" style="whiteSpace=wrap;html=1;rounded=1;fillColor=#0F172A;strokeColor=#EA580C;" vertex="1" parent="1"><mxGeometry x="1590" y="575" width="190" height="40" as="geometry" /></mxCell>
        <mxCell id="dm_pub_traf" value="&lt;span style='font-size:26px;'&gt;👤🌐&lt;/span&gt;&lt;br&gt;&lt;b style='font-size:10px;color:#FFFFFF;'&gt;Public Internet Traffic&lt;/b&gt;" style="whiteSpace=wrap;text;html=1;strokeColor=none;fillColor=none;align=center;" vertex="1" parent="1"><mxGeometry x="1490" y="630" width="110" height="60" as="geometry" /></mxCell>
        <mxCell id="dm_arr_pub_lb" value="" style="endArrow=block;endFill=1;strokeColor=#22D3EE;strokeWidth=1.5;html=1;" edge="1" parent="1" source="dm_pub_traf" target="dm_lb_waf"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="dm_lb_waf" value="&lt;span style='font-size:24px;'&gt;🎛️&lt;/span&gt;&lt;br&gt;&lt;b style='font-size:10px;color:#FFFFFF;'&gt;Loed Balencer (WAF)&lt;/b&gt;" style="whiteSpace=wrap;html=1;rounded=1;fillColor=#1E3A8A;strokeColor=#60A5FA;" vertex="1" parent="1"><mxGeometry x="1620" y="630" width="130" height="60" as="geometry" /></mxCell>
        <mxCell id="dm_arr_lb_gw" value="" style="endArrow=block;endFill=1;strokeColor=#22D3EE;strokeWidth=1.5;html=1;" edge="1" parent="1" source="dm_lb_waf" target="dm_api_gw"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="dm_api_gw" value="&lt;span style='font-size:24px;'&gt;🚪&lt;/span&gt;&lt;br&gt;&lt;b style='font-size:10px;color:#38BDF8;'&gt;Google API Gateway&lt;/b&gt;" style="whiteSpace=wrap;html=1;rounded=1;fillColor=#0F172A;strokeColor=#38BDF8;" vertex="1" parent="1"><mxGeometry x="1775" y="630" width="115" height="60" as="geometry" /></mxCell>
        <mxCell id="dm_waf_bot" value="&lt;span style='font-size:18px;'&gt;🛡️&lt;/span&gt; &lt;b style='font-size:10px;color:#FB923C;'&gt;Cloud Armor WAF Rules (Edge protection)&lt;/b&gt;" style="whiteSpace=wrap;html=1;rounded=1;fillColor=#0F172A;strokeColor=#EA580C;" vertex="1" parent="1"><mxGeometry x="1590" y="705" width="230" height="40" as="geometry" /></mxCell>

        <!-- 5. Swimlane 4: L4 -->
        <mxCell id="dm_l4_tab" value="&lt;b style='font-size:9px;color:#000000;'&gt;L4. PLAN &amp;amp;&lt;br&gt;DATA&lt;br&gt;FOUNDATION&lt;br&gt;(Vetting &amp;amp; EBG&lt;br&gt;Inliogallao)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#A0AAB5;strokeColor=#64748B;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="15" y="880" width="55" height="190" as="geometry" />
        </mxCell>
        <mxCell id="dm_l4_lane" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0B111A;strokeColor=#334155;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="75" y="880" width="1830" height="190" as="geometry" />
        </mxCell>

        <mxCell id="dm_l4_title" value="&lt;b style='font-size:12px;color:#FFFFFF;'&gt;PHASE 5: SECURED DEPLOYMENT &amp;amp; OBSERVATION FLOW (Topology Flow)&lt;/b&gt;" style="whiteSpace=wrap;text;html=1;strokeColor=none;fillColor=none;align=left;padding=6;" vertex="1" parent="1"><mxGeometry x="90" y="885" width="550" height="20" as="geometry" /></mxCell>
        <mxCell id="dm_vpc_enf" value="&lt;b style='font-size:9px;color:#FFFFFF;'&gt;VPC-SC Enforcement&lt;/b&gt;" style="whiteSpace=wrap;html=1;rounded=1;fillColor=#0284C7;strokeColor=#38BDF8;arcSize=50;padding=2;align=center;" vertex="1" parent="1"><mxGeometry x="650" y="883" width="130" height="22" as="geometry" /></mxCell>

        <!-- Topology Box -->
        <mxCell id="dm_topo_box" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#111827;strokeColor=#38BDF8;strokeWidth=1.5;strokeDashArray=6 6;" vertex="1" parent="1">
          <mxGeometry x="90" y="915" width="380" height="145" as="geometry" />
        </mxCell>
        <mxCell id="dm_topo_title" value="&lt;b style='font-size:11px;color:#38BDF8;'&gt;Deployment topology&lt;/b&gt;" style="whiteSpace=wrap;text;html=1;strokeColor=none;fillColor=none;align=left;padding=6;" vertex="1" parent="1"><mxGeometry x="100" y="920" width="180" height="20" as="geometry" /></mxCell>
        <mxCell id="dm_gke_pods_l" value="&lt;b style='font-size:11px;color:#FFFFFF;'&gt;GKE Pods&lt;/b&gt;" style="whiteSpace=wrap;html=1;rounded=1;fillColor=#1E3A8A;strokeColor=#60A5FA;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="105" y="950" width="90" height="75" as="geometry" /></mxCell>
        <mxCell id="dm_gke_cont_box" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#60A5FA;strokeDashArray=3 3;" vertex="1" parent="1"><mxGeometry x="210" y="945" width="250" height="90" as="geometry" /></mxCell>
        <mxCell id="dm_gke_cont_title" value="&lt;b style='font-size:10px;color:#60A5FA;'&gt;GKE Centainers&lt;/b&gt;" style="whiteSpace=wrap;text;html=1;strokeColor=none;fillColor=none;align=left;padding=4;" vertex="1" parent="1"><mxGeometry x="215" y="947" width="120" height="15" as="geometry" /></mxCell>
        <mxCell id="dm_hex_p" value="&lt;font style='font-size:8px;color:#FFFFFF;'&gt;GkE Pods&lt;/font&gt;" style="whiteSpace=wrap;html=1;shape=hexagon;fillColor=#1E3A8A;strokeColor=#60A5FA;" vertex="1" parent="1"><mxGeometry x="220" y="970" width="70" height="35" as="geometry" /></mxCell>
        <mxCell id="dm_hex_g" value="&lt;font style='font-size:8px;color:#FFFFFF;'&gt;API Goleway&lt;/font&gt;" style="whiteSpace=wrap;html=1;shape=hexagon;fillColor=#1E3A8A;strokeColor=#60A5FA;" vertex="1" parent="1"><mxGeometry x="300" y="970" width="75" height="35" as="geometry" /></mxCell>
        <mxCell id="dm_hex_w" value="&lt;font style='font-size:8px;color:#FFFFFF;'&gt;WkF&lt;/font&gt;" style="whiteSpace=wrap;html=1;shape=hexagon;fillColor=#1E3A8A;strokeColor=#60A5FA;" vertex="1" parent="1"><mxGeometry x="385" y="970" width="65" height="35" as="geometry" /></mxCell>
        <mxCell id="dm_can_lbl" value="&lt;font style='font-size:9px;color:#A0AAB5;'&gt;Canary deployment on GRE&lt;/font&gt;" style="whiteSpace=wrap;text;html=1;strokeColor=none;fillColor=none;align=center;" vertex="1" parent="1"><mxGeometry x="215" y="1038" width="160" height="20" as="geometry" /></mxCell>

        <!-- Action Flow -->
        <mxCell id="dm_act_user" value="&lt;span style='font-size:28px;'&gt;🧑‍💻&lt;/span&gt;&lt;br&gt;&lt;b style='font-size:9px;color:#FFFFFF;'&gt;Oncolngy Analyst&lt;br&gt;requeslareaquakts PPT deck&lt;/b&gt;" style="whiteSpace=wrap;text;html=1;strokeColor=none;fillColor=none;align=center;" vertex="1" parent="1"><mxGeometry x="485" y="930" width="150" height="65" as="geometry" /></mxCell>
        <mxCell id="dm_arr_u_ui" value="" style="endArrow=block;endFill=1;strokeColor=#22D3EE;strokeWidth=1.5;html=1;" edge="1" parent="1" source="dm_act_user" target="dm_act_ui"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="dm_lbl_req1" value="&lt;font style='font-size:8px;color:#A0AAB5;'&gt;Requests request, requeslzed request&lt;/font&gt;" style="whiteSpace=wrap;text;html=1;strokeColor=none;fillColor=none;align=center;" vertex="1" parent="1"><mxGeometry x="600" y="915" width="160" height="20" as="geometry" /></mxCell>
        <mxCell id="dm_act_ui" value="&lt;b style='font-size:11px;color:#FFFFFF;'&gt;UI&lt;/b&gt;" style="whiteSpace=wrap;html=1;rounded=1;fillColor=#1E3A8A;strokeColor=#60A5FA;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="645" y="940" width="55" height="45" as="geometry" /></mxCell>
        <mxCell id="dm_arr_ui_orch" value="" style="endArrow=block;endFill=1;strokeColor=#22D3EE;strokeWidth=1.5;html=1;" edge="1" parent="1" source="dm_act_ui" target="dm_act_orch"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="dm_lbl_req2" value="&lt;font style='font-size:8px;color:#A0AAB5;'&gt;Requests PPT dock, aynlhesized request and request flow&lt;/font&gt;" style="whiteSpace=wrap;text;html=1;strokeColor=none;fillColor=none;align=center;" vertex="1" parent="1"><mxGeometry x="705" y="915" width="220" height="20" as="geometry" /></mxCell>
        <mxCell id="dm_act_orch" value="&lt;b style='font-size:10px;color:#FFFFFF;'&gt;Agent&lt;br&gt;Orchestshator&lt;/b&gt;" style="whiteSpace=wrap;html=1;rounded=1;fillColor=#1E3A8A;strokeColor=#60A5FA;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="765" y="935" width="95" height="55" as="geometry" /></mxCell>
        <mxCell id="dm_arr_orch_deck" value="" style="endArrow=block;endFill=1;strokeColor=#22D3EE;strokeWidth=1.5;html=1;" edge="1" parent="1" source="dm_act_orch" target="dm_act_deck"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="dm_lbl_req3" value="&lt;font style='font-size:8px;color:#A0AAB5;'&gt;Generatee PPT deck, inlteractive visualizabcn, pushes to interface&lt;/font&gt;" style="whiteSpace=wrap;text;html=1;strokeColor=none;fillColor=none;align=center;" vertex="1" parent="1"><mxGeometry x="865" y="915" width="240" height="20" as="geometry" /></mxCell>
        <mxCell id="dm_lbl_push_dn" value="&lt;font style='font-size:8px;color:#A0AAB5;'&gt;pushes to interface&lt;/font&gt;" style="whiteSpace=wrap;text;html=1;strokeColor=none;fillColor=none;align=center;" vertex="1" parent="1"><mxGeometry x="875" y="995" width="100" height="15" as="geometry" /></mxCell>
        <mxCell id="dm_act_deck" value="&lt;b style='font-size:10px;color:#38BDF8;'&gt;Dock Studio&lt;br&gt;API&lt;/b&gt;" style="whiteSpace=wrap;html=1;rounded=1;fillColor=#0F172A;strokeColor=#38BDF8;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="930" y="935" width="90" height="55" as="geometry" /></mxCell>
        <mxCell id="dm_arr_deck_rad" value="" style="endArrow=block;endFill=1;strokeColor=#22D3EE;strokeWidth=1.5;html=1;" edge="1" parent="1" source="dm_act_deck" target="dm_act_radar"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="dm_lbl_logs_dn" value="&lt;font style='font-size:8px;color:#A0AAB5;'&gt;Logs actions&lt;/font&gt;" style="whiteSpace=wrap;text;html=1;strokeColor=none;fillColor=none;align=center;" vertex="1" parent="1"><mxGeometry x="1025" y="995" width="70" height="15" as="geometry" /></mxCell>
        <mxCell id="dm_act_radar" value="&lt;b style='font-size:10px;color:#38BDF8;'&gt;Global Market&lt;br&gt;Radar API&lt;/b&gt;" style="whiteSpace=wrap;html=1;rounded=1;fillColor=#0F172A;strokeColor=#38BDF8;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="1050" y="935" width="95" height="55" as="geometry" /></mxCell>
        <mxCell id="dm_arr_rad_arch" value="" style="endArrow=block;endFill=1;strokeColor=#22D3EE;strokeWidth=1.5;html=1;" edge="1" parent="1" source="dm_act_radar" target="dm_act_arch"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="dm_act_arch" value="&lt;b style='font-size:10px;color:#FFFFFF;'&gt;Archival&lt;/b&gt;" style="whiteSpace=wrap;html=1;rounded=1;fillColor=#1E293B;strokeColor=#64748B;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="1175" y="940" width="75" height="45" as="geometry" /></mxCell>
        <mxCell id="dm_arr_arch_del" value="" style="endArrow=block;endFill=1;strokeColor=#22D3EE;strokeWidth=1.5;html=1;" edge="1" parent="1" source="dm_act_arch" target="dm_act_del"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="dm_act_del" value="&lt;b style='font-size:10px;color:#FFFFFF;'&gt;Delivery&lt;br&gt;&lt;font style='color:#A0AAB5;'&gt;(ourvey)&lt;/font&gt;&lt;/b&gt;" style="whiteSpace=wrap;html=1;rounded=1;fillColor=#1E293B;strokeColor=#60A5FA;strokeWidth=1.5;" vertex="1" parent="1"><mxGeometry x="1280" y="935" width="80" height="55" as="geometry" /></mxCell>

        <!-- Observation Box -->
        <mxCell id="dm_obs_box" value="&lt;b style='font-size:10px;color:#22C55E;'&gt;Continuous Observelion &amp;amp;&lt;br&gt;Alerting menlioning&lt;/b&gt;&lt;br&gt;&lt;font style='font-size:8px;color:#A0AAB5;'&gt;(Datadog/Seonyr/DCP C&#39;laud Logging)&lt;/font&gt;&lt;br&gt;&lt;font style='font-size:9px;color:#FFFFFF;'&gt;- Inference drift&lt;br&gt;- Prompt irenction&lt;br&gt;- Socislal Changes&lt;/font&gt;" style="whiteSpace=wrap;html=1;rounded=1;fillColor=#0F172A;strokeColor=#22C55E;strokeWidth=1.5;align=left;padding=8;" vertex="1" parent="1">
          <mxGeometry x="1395" y="915" width="180" height="120" as="geometry" />
        </mxCell>

        <!-- Archival Box -->
        <mxCell id="dm_arch_box" value="&lt;b style='font-size:11px;color:#FFFFFF;'&gt;ARCHIVAL (Retired Medel/Prompt)&lt;/b&gt;&lt;br&gt;&lt;font style='font-size:9px;color:#A0AAB5;'&gt;- Imcaming triggers&lt;br&gt;- Incomimg triggers&lt;br&gt;- fienooe nae intagration&lt;br&gt;- Detailed role integration&lt;/font&gt;" style="whiteSpace=wrap;html=1;rounded=1;fillColor=#1E293B;strokeColor=#64748B;strokeWidth=1.5;align=left;padding=10;" vertex="1" parent="1">
          <mxGeometry x="1605" y="915" width="190" height="120" as="geometry" />
        </mxCell>
        <mxCell id="dm_arr_obs_arc" value="" style="endArrow=block;endFill=1;strokeColor=#22C55E;strokeWidth=1.5;html=1;" edge="1" parent="1" source="dm_obs_box" target="dm_arch_box"><mxGeometry relative="1" as="geometry" /></mxCell>
        <mxCell id="dm_lbl_drift_reg" value="&lt;font style='font-size:8px;color:#A0AAB5;'&gt;drift detection, regaclation, regulatory changes&lt;/font&gt;" style="whiteSpace=wrap;text;html=1;strokeColor=none;fillColor=none;align=center;" vertex="1" parent="1"><mxGeometry x="1565" y="1035" width="220" height="20" as="geometry" /></mxCell>
        <mxCell id="dm_far_ref" value="&lt;b style='font-size:14px;color:#FFFFFF;'&gt;References&lt;br&gt;image 15&lt;/b&gt;" style="whiteSpace=wrap;text;html=1;strokeColor=none;fillColor=none;align=center;" vertex="1" parent="1"><mxGeometry x="1805" y="945" width="95" height="50" as="geometry" /></mxCell>

        <!-- 6. Footer Region -->
        <!-- Legend Box -->
        <mxCell id="dm_leg_box" value="&lt;b style='font-size:12px;color:#FFFFFF;'&gt;Legend:&lt;/b&gt;" style="whiteSpace=wrap;html=1;rounded=1;fillColor=#0F172A;strokeColor=#64748B;strokeWidth=1.5;verticalAlign=top;paddingTop=6;" vertex="1" parent="1">
          <mxGeometry x="15" y="1080" width="620" height="60" as="geometry" />
        </mxCell>
        <mxCell id="dm_leg_grid" value="&lt;div style='font-size:8px;color:#A0AAB5;display:grid;grid-template-columns:repeat(5, 1fr);gap:4px;line-height:1.4;'&gt;&lt;span&gt;🟦 Managed Compute&lt;/span&gt;&lt;span&gt;🟩 Storage&lt;/span&gt;&lt;span&gt;🟨 Secure boundary&lt;/span&gt;&lt;span&gt;➡️ Control Flow&lt;/span&gt;&lt;span&gt;dashed Key: Data&lt;/span&gt;&lt;span&gt;⬜ Newscomptoie&lt;/span&gt;&lt;span&gt;— VGC S&lt;/span&gt;&lt;span&gt;--- Relationship&lt;/span&gt;&lt;span&gt;🔹 Managed&lt;/span&gt;&lt;span&gt;🔴 Relationship&lt;/span&gt;&lt;span&gt;🔷 Reldennics&lt;/span&gt;&lt;span&gt;🔒 Key/Sefault&lt;/span&gt;&lt;span&gt;☁️ GCP Workagace&lt;/span&gt;&lt;span&gt;🧑 actor&lt;/span&gt;&lt;span&gt;🤖 Gendhi&lt;/span&gt;&lt;span&gt;📦 GkE pod&lt;/span&gt;&lt;span&gt;☁️ private VPC&lt;/span&gt;&lt;span&gt;🛡️ cloud annor&lt;/span&gt;&lt;span&gt;♾️ Humps de-tile Loop&lt;/span&gt;&lt;/div&gt;" style="whiteSpace=wrap;text;html=1;strokeColor=none;fillColor=none;align=left;" vertex="1" parent="dm_leg_box"><mxGeometry x="10" y="20" width="600" height="35" as="geometry" /></mxCell>

        <!-- Key Refinitions Box -->
        <mxCell id="dm_key_ref_box" value="&lt;b style='font-size:10px;color:#FFFFFF;'&gt;Key Refinitions:&lt;/b&gt;&lt;br&gt;&lt;font style='font-size:8px;color:#A0AAB5;'&gt;• Eey 1 Aatemad unit tests...&lt;br&gt;• CO: GCS, config config....&lt;/font&gt;" style="whiteSpace=wrap;html=1;rounded=1;fillColor=#0F172A;strokeColor=#64748B;strokeWidth=1.5;align=left;padding=6;" vertex="1" parent="1">
          <mxGeometry x="645" y="1080" width="200" height="60" as="geometry" />
        </mxCell>

        <!-- Line Descriptions Box -->
        <mxCell id="dm_line_desc_box" value="&lt;b style='font-size:10px;color:#FFFFFF;'&gt;Line Descriptions&lt;/b&gt;&lt;br&gt;&lt;font style='font-size:8px;color:#A0AAB5;'&gt;Linn devoiopveenta/&lt;br&gt;Bete maineirg...&lt;br&gt;Pneate Application Container...&lt;/font&gt;" style="whiteSpace=wrap;html=1;rounded=1;fillColor=#0F172A;strokeColor=#64748B;strokeWidth=1.5;align=left;padding=6;" vertex="1" parent="1">
          <mxGeometry x="855" y="1080" width="220" height="60" as="geometry" />
        </mxCell>

        <!-- Value Proposition Boxes (Right) -->
        <mxCell id="dm_val_top" value="&lt;font style='font-size:8px;color:#FFFFFF;'&gt;&lt;b&gt;TECHNICAL ADVANTAGE:&lt;/b&gt; Unified architecture enables seamless data engineering, MLOps, and agentic RAG integration with end-to-end security and auditable governance.&lt;/font&gt;" style="whiteSpace=wrap;html=1;rounded=1;fillColor=#111827;strokeColor=#38BDF8;padding=4;align=left;" vertex="1" parent="1"><mxGeometry x="1085" y="1065" width="530" height="24" as="geometry" /></mxCell>
        <mxCell id="dm_val_mid" value="&lt;font style='font-size:8px;color:#FFFFFF;'&gt;&lt;b&gt;WHY IT WORKS:&lt;/b&gt; This unified diagram consolidation enables all data engineering, ML engineering, GenAI engineering, SRE, and security teams to instantly understand the entire operational lifecycle, dependencies, security boundaries, and robust operational lifecycles without missing any critical details.&lt;/font&gt;" style="whiteSpace=wrap;html=1;rounded=1;fillColor=#111827;strokeColor=#22C55E;padding=4;align=left;" vertex="1" parent="1"><mxGeometry x="1085" y="1091" width="530" height="26" as="geometry" /></mxCell>
        <mxCell id="dm_val_bot" value="&lt;font style='font-size:8px;color:#FFFFFF;'&gt;&lt;b&gt;PLATFORM VALUE:&lt;/b&gt; Unifying Data, MLOps, and GenAI to deliver faster, safer, and more accurate insights.&lt;/font&gt;" style="whiteSpace=wrap;html=1;rounded=1;fillColor=#111827;strokeColor=#FB923C;padding=4;align=left;" vertex="1" parent="1"><mxGeometry x="1085" y="1119" width="530" height="21" as="geometry" /></mxCell>
        <mxCell id="dm_val_right" value="&lt;font style='font-size:8px;color:#A0AAB5;'&gt;&lt;b style='color:#FFFFFF;'&gt;#Prggresslon Ratiooale:&lt;/b&gt; We visuulize the sequential process fow while misgrating technical components, data Rows, and secority lozers into a single, umfied arctinectoral ayitilecis.&lt;/font&gt;" style="whiteSpace=wrap;html=1;rounded=1;fillColor=#1E293B;strokeColor=#64748B;padding=6;align=left;" vertex="1" parent="1"><mxGeometry x="1625" y="1065" width="280" height="75" as="geometry" /></mxCell>

        <!-- Absolute Bottom Edge Text -->
        <mxCell id="dm_abs_bot" value="&lt;font style='font-size:10px;color:#A0AAB5;'&gt;&lt;b style='color:#FFFFFF;'&gt;ITACS Integrated Insights Platform...&lt;/b&gt; end-to-end without compromise... unified diagram allowed security, SREs, and architects, adncutred loeos... end-to-end design&lt;/font&gt;" style="whiteSpace=wrap;text;html=1;strokeColor=none;fillColor=none;align=center;" vertex="1" parent="1">
          <mxGeometry x="15" y="1142" width="1890" height="15" as="geometry" />
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
  `.trim();
}

function escapeXml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}


/**
 * Returns a tailored high-craft technical architecture specification for Technical Architecture types
 */
/**
 * Returns a tailored high-craft technical architecture specification for Technical Architecture types
 */
export function getBenchmarkTechnicalArchitectureSpec(archId: string): CompiledDiagramSpec {
  if (archId === 'tech_serverless_gcp' || archId === 'serverless_gcp') {
    return {
      diagramId: archId,
      title: "GCP Serverless Web Application Architecture",
      columns: [
        {
          id: "c1", title: "Ingress & Edge Security", theme: "blue",
          nodes: [
            { id: "n1", stencil: "standard_card", title: "Global HTTPS Load Balancer", subtitle: "Anycast IP & SSL Termination" },
            { id: "n2", stencil: "standard_card", title: "Cloud Armor WAF Rules", subtitle: "OWASP Top 10 & DDoS Defense" },
            { id: "n3", stencil: "standard_card", title: "Cloud CDN", subtitle: "Edge Static Asset Caching" }
          ]
        },
        {
          id: "c2", title: "Serverless Microservices", theme: "green",
          nodes: [
            { id: "n4", stencil: "cube_platform", title: "Cloud Run Frontend Service", subtitle: "Next.js SSR Auto-scaling Containers" },
            { id: "n5", stencil: "cube_platform", title: "Cloud Run Backend API", subtitle: "Node.js / Go REST & gRPC APIs" },
            { id: "n6", stencil: "standard_card", title: "Serverless VPC Access", subtitle: "Private Egress Connector" }
          ]
        },
        {
          id: "c3", title: "Managed Data & Storage", theme: "amber",
          nodes: [
            { id: "n7", stencil: "standard_card", title: "Cloud SQL for PostgreSQL", subtitle: "Multi-AZ Private IP Relational DB" },
            { id: "n8", stencil: "standard_card", title: "Cloud Storage Bucket", subtitle: "Static Media & Export Archives" },
            { id: "n9", stencil: "standard_card", title: "Secret Manager & KMS", subtitle: "Envelope Encryption at Rest" }
          ]
        }
      ],
      connections: [
        { fromNodeId: "n1", toNodeId: "n2", label: "Inspect Ingress", style: "direct" },
        { fromNodeId: "n2", toNodeId: "n4", label: "Route Traffic", style: "orthogonal" },
        { fromNodeId: "n4", toNodeId: "n5", label: "API Calls (gRPC)", style: "direct" },
        { fromNodeId: "n5", toNodeId: "n6", label: "Private Egress", style: "direct" },
        { fromNodeId: "n6", toNodeId: "n7", label: "Private SQL Query", style: "orthogonal" },
        { fromNodeId: "n5", toNodeId: "n8", label: "Put/Get Assets", style: "orthogonal" }
      ]
    };
  }

  if (archId === 'tech_streaming_analytics' || archId === 'streaming_pipeline') {
    return {
      diagramId: archId,
      title: "GCP Real-Time Streaming Analytics Pipeline",
      columns: [
        {
          id: "c1", title: "Streaming Ingestion", theme: "blue",
          nodes: [
            { id: "n1", stencil: "standard_card", title: "Pub/Sub Telemetry Topic", subtitle: "100k+ Events/sec Ingress" },
            { id: "n2", stencil: "standard_card", title: "IoT Core / MQTT Gateway", subtitle: "Edge Device Field Stream" },
            { id: "n3", stencil: "standard_card", title: "Pub/Sub Subscriptions", subtitle: "Push & Pull Event Fan-out" }
          ]
        },
        {
          id: "c2", title: "Stream ETL & Feature Engine", theme: "green",
          nodes: [
            { id: "n4", stencil: "cube_platform", title: "Cloud Dataflow (Beam)", subtitle: "Streaming Window ETL & Aggregations" },
            { id: "n5", stencil: "cube_platform", title: "Real-Time Anomaly Detector", subtitle: "Streaming Z-Score & Fraud Scoring" },
            { id: "n6", stencil: "standard_card", title: "Vertex AI Feature Store", subtitle: "Low-Latency Online Feature Serving" }
          ]
        },
        {
          id: "c3", title: "Analytical Data Warehouse", theme: "amber",
          nodes: [
            { id: "n7", stencil: "standard_card", title: "BigQuery Streaming Buffer", subtitle: "Real-Time Table Ingestion" },
            { id: "n8", stencil: "standard_card", title: "BigQuery Enterprise EDW", subtitle: "Partitioned & Clustered Tables" },
            { id: "n9", stencil: "cube_platform", title: "Looker Studio & BI Dashboards", subtitle: "Executive Operational Reporting" }
          ]
        }
      ],
      connections: [
        { fromNodeId: "n2", toNodeId: "n1", label: "Publish Telemetry", style: "direct" },
        { fromNodeId: "n1", toNodeId: "n3", label: "Fan-out", style: "direct" },
        { fromNodeId: "n3", toNodeId: "n4", label: "Stream Consume", style: "orthogonal" },
        { fromNodeId: "n4", toNodeId: "n5", label: "Windows", style: "direct" },
        { fromNodeId: "n4", toNodeId: "n6", label: "Sync Features", style: "orthogonal" },
        { fromNodeId: "n4", toNodeId: "n7", label: "Streaming Insert", style: "orthogonal" },
        { fromNodeId: "n7", toNodeId: "n8", label: "Table Commit", style: "direct" },
        { fromNodeId: "n8", toNodeId: "n9", label: "SQL Query", style: "orthogonal" }
      ]
    };
  }

  if (archId === 'tech_microservices_aws' || archId === 'k8s_mesh') {
    return {
      diagramId: archId,
      title: "AWS EKS Microservices Service Mesh Architecture",
      columns: [
        {
          id: "c1", title: "AWS Edge & Ingress", theme: "blue",
          nodes: [
            { id: "n1", stencil: "standard_card", title: "Amazon Route 53", subtitle: "DNS & Latency-Based Routing" },
            { id: "n2", stencil: "standard_card", title: "AWS Shield & WAF", subtitle: "L3/L4 DDoS & L7 WAF Shield" },
            { id: "n3", stencil: "standard_card", title: "ALB Ingress Controller", subtitle: "Application Load Balancer Ingress" }
          ]
        },
        {
          id: "c2", title: "EKS Kubernetes Service Mesh", theme: "green",
          nodes: [
            { id: "n4", stencil: "cube_platform", title: "Istio / AWS App Mesh", subtitle: "Zero-Trust mTLS & Traffic Splitting" },
            { id: "n5", stencil: "cube_platform", title: "EKS Microservices Pods", subtitle: "Multi-AZ Auto-Scaling ReplicaSets" },
            { id: "n6", stencil: "standard_card", title: "Amazon ECR Registry", subtitle: "Vulnerability Scanned Images" }
          ]
        },
        {
          id: "c3", title: "Persistence & Observability", theme: "amber",
          nodes: [
            { id: "n7", stencil: "standard_card", title: "Amazon Aurora PostgreSQL", subtitle: "Multi-AZ Highly Available Relational DB" },
            { id: "n8", stencil: "standard_card", title: "ElastiCache for Redis", subtitle: "Sub-millisecond Session Caching" },
            { id: "n9", stencil: "standard_card", title: "Prometheus & CloudWatch", subtitle: "Distributed Tracing & Metrics" }
          ]
        }
      ],
      connections: [
        { fromNodeId: "n1", toNodeId: "n2", label: "DNS Resolve", style: "direct" },
        { fromNodeId: "n2", toNodeId: "n3", label: "Inspect Ingress", style: "direct" },
        { fromNodeId: "n3", toNodeId: "n4", label: "Route Ingress", style: "orthogonal" },
        { fromNodeId: "n4", toNodeId: "n5", label: "mTLS Call", style: "direct" },
        { fromNodeId: "n6", toNodeId: "n5", label: "Pull Image", style: "dashed" },
        { fromNodeId: "n5", toNodeId: "n8", label: "Cache Read/Write", style: "direct" },
        { fromNodeId: "n5", toNodeId: "n7", label: "SQL Transaction", style: "orthogonal" },
        { fromNodeId: "n5", toNodeId: "n9", label: "Scrape Metrics", style: "dashed" }
      ]
    };
  }

  if (archId === 'tech_data_lakehouse' || archId === 'data_lakehouse') {
    return {
      diagramId: archId,
      title: "AWS Modern Data Lakehouse Architecture",
      columns: [
        {
          id: "c1", title: "Ingestion & Landing Zone", theme: "blue",
          nodes: [
            { id: "n1", stencil: "standard_card", title: "AWS Lake Formation", subtitle: "Centralized Governance & Permissions" },
            { id: "n2", stencil: "standard_card", title: "Amazon Kinesis Data Streams", subtitle: "High-Throughput Real-Time Streams" },
            { id: "n3", stencil: "standard_card", title: "Amazon S3 Raw Landing", subtitle: "Immutable Raw JSON/CSV Storage" }
          ]
        },
        {
          id: "c2", title: "Catalog & Transformation", theme: "green",
          nodes: [
            { id: "n4", stencil: "cube_platform", title: "AWS Glue Crawlers", subtitle: "Automated Schema Discovery" },
            { id: "n5", stencil: "standard_card", title: "AWS Glue Data Catalog", subtitle: "Enterprise Hive/Iceberg Metadata" },
            { id: "n6", stencil: "cube_platform", title: "AWS Glue ETL Jobs", subtitle: "Spark Transformation to Parquet" }
          ]
        },
        {
          id: "c3", title: "Query & Data Warehousing", theme: "amber",
          nodes: [
            { id: "n7", stencil: "standard_card", title: "Amazon S3 Curated Zone", subtitle: "Optimized Apache Iceberg / Parquet" },
            { id: "n8", stencil: "cube_platform", title: "Amazon Athena Serverless", subtitle: "Interactive Ad-Hoc SQL Queries" },
            { id: "n9", stencil: "standard_card", title: "Amazon Redshift Spectrum", subtitle: "Enterprise Data Warehousing" }
          ]
        }
      ],
      connections: [
        { fromNodeId: "n1", toNodeId: "n3", label: "Govern Access", style: "dashed" },
        { fromNodeId: "n2", toNodeId: "n3", label: "Stream Landing", style: "direct" },
        { fromNodeId: "n3", toNodeId: "n4", label: "Scan Raw", style: "direct" },
        { fromNodeId: "n4", toNodeId: "n5", label: "Update Catalog", style: "direct" },
        { fromNodeId: "n3", toNodeId: "n6", label: "Extract Raw", style: "orthogonal" },
        { fromNodeId: "n6", toNodeId: "n7", label: "Write Parquet", style: "direct" },
        { fromNodeId: "n5", toNodeId: "n8", label: "Schema Registry", style: "dashed" },
        { fromNodeId: "n7", toNodeId: "n8", label: "Serverless SQL", style: "orthogonal" },
        { fromNodeId: "n7", toNodeId: "n9", label: "Spectrum Query", style: "orthogonal" }
      ]
    };
  }

  if (archId === 'tech_event_driven_aws' || archId === 'event_driven_aws') {
    return {
      diagramId: archId,
      title: "AWS Serverless Event-Driven Microservices",
      columns: [
        {
          id: "c1", title: "Ingress & Event Bus", theme: "blue",
          nodes: [
            { id: "n1", stencil: "standard_card", title: "Amazon API Gateway", subtitle: "REST & WebSocket API Ingress" },
            { id: "n2", stencil: "standard_card", title: "Amazon EventBridge", subtitle: "Central Event Bus & Schema Registry" },
            { id: "n3", stencil: "standard_card", title: "Amazon SQS & SNS", subtitle: "Decoupled Queue & Topic Fan-out" }
          ]
        },
        {
          id: "c2", title: "Asynchronous Compute", theme: "green",
          nodes: [
            { id: "n4", stencil: "cube_platform", title: "AWS Lambda Event Handlers", subtitle: "Serverless Event-Driven Workers" },
            { id: "n5", stencil: "cube_platform", title: "AWS Step Functions", subtitle: "Serverless Saga State Machine" },
            { id: "n6", stencil: "standard_card", title: "AWS X-Ray Distributed Trace", subtitle: "End-to-End Latency & Tracing" }
          ]
        },
        {
          id: "c3", title: "NoSQL State & Archival", theme: "amber",
          nodes: [
            { id: "n7", stencil: "standard_card", title: "Amazon DynamoDB Store", subtitle: "Single-Table Fast Key-Value NoSQL" },
            { id: "n8", stencil: "standard_card", title: "DynamoDB Streams", subtitle: "Change Data Capture (CDC) Event Trigger" },
            { id: "n9", stencil: "standard_card", title: "Amazon S3 Cold Archive", subtitle: "Long-Term Event Audit Log" }
          ]
        }
      ],
      connections: [
        { fromNodeId: "n1", toNodeId: "n2", label: "Emit Event", style: "direct" },
        { fromNodeId: "n2", toNodeId: "n3", label: "Rule Filter", style: "direct" },
        { fromNodeId: "n3", toNodeId: "n4", label: "Trigger Worker", style: "orthogonal" },
        { fromNodeId: "n2", toNodeId: "n5", label: "Trigger Saga", style: "orthogonal" },
        { fromNodeId: "n4", toNodeId: "n7", label: "PutItem / UpdateItem", style: "direct" },
        { fromNodeId: "n5", toNodeId: "n7", label: "State Mutate", style: "orthogonal" },
        { fromNodeId: "n7", toNodeId: "n8", label: "Emit CDC", style: "direct" },
        { fromNodeId: "n8", toNodeId: "n9", label: "Archive CDC", style: "orthogonal" },
        { fromNodeId: "n4", toNodeId: "n6", label: "Trace Span", style: "dashed" }
      ]
    };
  }

  if (archId === 'tech_multi_region_dr' || archId === 'multi_region_dr') {
    return {
      diagramId: archId,
      title: "GCP Multi-Region Active-Passive Disaster Recovery",
      columns: [
        {
          id: "c1", title: "Global DNS & Failover", theme: "blue",
          nodes: [
            { id: "n1", stencil: "standard_card", title: "Cloud DNS Routing Policy", subtitle: "Geolocation & Failover Routing" },
            { id: "n2", stencil: "standard_card", title: "Global HTTPS Load Balancer", subtitle: "Cross-Region Health Checking" },
            { id: "n3", stencil: "standard_card", title: "Cloud Monitoring Alert Engine", subtitle: "Automated Failover Trigger" }
          ]
        },
        {
          id: "c2", title: "Primary Region (us-central1)", theme: "green",
          nodes: [
            { id: "n4", stencil: "cube_platform", title: "Primary GKE Production Cluster", subtitle: "Active Live Serving Workloads" },
            { id: "n5", stencil: "standard_card", title: "Cloud Spanner Active Leader", subtitle: "Global Synchronous Replication" },
            { id: "n6", stencil: "standard_card", title: "Primary GCS Regional Bucket", subtitle: "Live Application Asset Storage" }
          ]
        },
        {
          id: "c3", title: "Secondary Region (us-east4)", theme: "amber",
          nodes: [
            { id: "n7", stencil: "cube_platform", title: "Standby GKE Warm Cluster", subtitle: "Auto-Scaled Standby ReplicaSets" },
            { id: "n8", stencil: "standard_card", title: "Cloud Spanner Read Replica", subtitle: "Zero RPO Synchronous Mirror" },
            { id: "n9", stencil: "standard_card", title: "Secondary GCS Dual-Region", subtitle: "Automated Cross-Region Backup" }
          ]
        }
      ],
      connections: [
        { fromNodeId: "n1", toNodeId: "n2", label: "Resolve Anycast", style: "direct" },
        { fromNodeId: "n2", toNodeId: "n4", label: "Route Active Traffic", style: "orthogonal" },
        { fromNodeId: "n2", toNodeId: "n7", label: "Failover Route (Standby)", style: "dashed" },
        { fromNodeId: "n4", toNodeId: "n5", label: "Read/Write SQL", style: "direct" },
        { fromNodeId: "n5", toNodeId: "n8", label: "Sync Mirror (Zero RPO)", style: "orthogonal" },
        { fromNodeId: "n6", toNodeId: "n9", label: "Bucket Replication", style: "orthogonal" },
        { fromNodeId: "n3", toNodeId: "n1", label: "Mutate DNS Rule", style: "dashed" }
      ]
    };
  }

  if (archId === 'tech_vpc_infra' || archId === 'zero_trust') {
    return {
      diagramId: archId,
      title: "AWS Zero-Trust Secure VPC Network Infrastructure",
      columns: [
        {
          id: "c1", title: "Perimeter & Transit Hub", theme: "blue",
          nodes: [
            { id: "n1", stencil: "standard_card", title: "AWS Transit Gateway", subtitle: "Centralized VPC Interconnect Hub" },
            { id: "n2", stencil: "standard_card", title: "AWS Network Firewall", subtitle: "Surveillance & Inspection Subnet" },
            { id: "n3", stencil: "standard_card", title: "AWS GuardDuty & Shield", subtitle: "Continuous Threat Detection" }
          ]
        },
        {
          id: "c2", title: "Isolated Private VPC Tiers", theme: "green",
          nodes: [
            { id: "n4", stencil: "cube_platform", title: "Private Application Subnets", subtitle: "No Inbound Public Internet Access" },
            { id: "n5", stencil: "standard_card", title: "Private Database Subnets", subtitle: "Isolated Aurora & ElastiCache Tiers" },
            { id: "n6", stencil: "standard_card", title: "VPC Endpoints (PrivateLink)", subtitle: "Private AWS API Traffic Routing" }
          ]
        },
        {
          id: "c3", title: "Central Governance & KMS", theme: "amber",
          nodes: [
            { id: "n7", stencil: "standard_card", title: "AWS KMS KMS Encryption", subtitle: "Hardware Security Module (HSM) Keys" },
            { id: "n8", stencil: "standard_card", title: "AWS Organizations SCPs", subtitle: "Service Control Policy Enforcement" },
            { id: "n9", stencil: "standard_card", title: "VPC Flow Logs in S3", subtitle: "Immutable Network Traffic Audit Log" }
          ]
        }
      ],
      connections: [
        { fromNodeId: "n1", toNodeId: "n2", label: "Inspect Traffic", style: "direct" },
        { fromNodeId: "n2", toNodeId: "n4", label: "Clean Ingress", style: "orthogonal" },
        { fromNodeId: "n4", toNodeId: "n5", label: "Private DB Access", style: "direct" },
        { fromNodeId: "n4", toNodeId: "n6", label: "Route AWS APIs", style: "direct" },
        { fromNodeId: "n6", toNodeId: "n7", label: "Envelope Encrypt", style: "orthogonal" },
        { fromNodeId: "n8", toNodeId: "n4", label: "Enforce SCP", style: "dashed" },
        { fromNodeId: "n4", toNodeId: "n9", label: "Emit Flow Logs", style: "dashed" }
      ]
    };
  }

  if (archId === 'tech_iot_telemetry' || archId === 'hybrid_interconnect') {
    return {
      diagramId: archId,
      title: "GCP Industrial IoT Telemetry Ingestion Platform",
      columns: [
        {
          id: "c1", title: "Edge Gateways & Ingress", theme: "blue",
          nodes: [
            { id: "n1", stencil: "standard_card", title: "Industrial MQTT Gateways", subtitle: "Field Sensor & PLC Factory Edge" },
            { id: "n2", stencil: "standard_card", title: "Cloud Pub/Sub Telemetry Topic", subtitle: "Sub-millisecond Ingress Buffer" },
            { id: "n3", stencil: "standard_card", title: "Edge Device Identity Registry", subtitle: "X.509 Certificate Authentication" }
          ]
        },
        {
          id: "c2", title: "Real-Time Streaming Engine", theme: "green",
          nodes: [
            { id: "n4", stencil: "cube_platform", title: "Cloud Dataflow Streaming Engine", subtitle: "Time-Series Windowing & Cleanse" },
            { id: "n5", stencil: "cube_platform", title: "Vertex AI Anomaly Detection", subtitle: "Real-Time Equipment Failure ML" },
            { id: "n6", stencil: "standard_card", title: "Cloud Bigtable Time-Series Store", subtitle: "Low-Latency High-Write NoSQL" }
          ]
        },
        {
          id: "c3", title: "Analytics & Maintenance", theme: "amber",
          nodes: [
            { id: "n7", stencil: "standard_card", title: "BigQuery IoT Data Warehouse", subtitle: "Long-Term Historical Analytics" },
            { id: "n8", stencil: "cube_platform", title: "Predictive Maintenance Alerting", subtitle: "Automated Work Order Triggers" },
            { id: "n9", stencil: "cube_platform", title: "Looker Operational Command Center", subtitle: "Factory Floor Live Visualization" }
          ]
        }
      ],
      connections: [
        { fromNodeId: "n3", toNodeId: "n1", label: "Auth Certificate", style: "dashed" },
        { fromNodeId: "n1", toNodeId: "n2", label: "Publish Stream", style: "direct" },
        { fromNodeId: "n2", toNodeId: "n4", label: "Stream Consume", style: "orthogonal" },
        { fromNodeId: "n4", toNodeId: "n5", label: "Score Telemetry", style: "direct" },
        { fromNodeId: "n4", toNodeId: "n6", label: "Write Time-Series", style: "orthogonal" },
        { fromNodeId: "n6", toNodeId: "n7", label: "Batch Sync", style: "orthogonal" },
        { fromNodeId: "n5", toNodeId: "n8", label: "Trigger Alert", style: "orthogonal" },
        { fromNodeId: "n7", toNodeId: "n9", label: "SQL Analytical Query", style: "direct" }
      ]
    };
  }

  // Default fallback technical architecture
  return {
    diagramId: archId,
    title: `${archId.replace(/^tech_|^business_/, '').replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())} Architecture Blueprint`,
    columns: [
      {
        id: "c1", title: "Ingress & Edge Security", theme: "blue",
        nodes: [
          { id: "n1", stencil: "standard_card", title: "Enterprise API Gateway", subtitle: "Rate Limiting & Authentication" },
          { id: "n2", stencil: "standard_card", title: "Web Application Firewall", subtitle: "DDoS Protection & Traffic Scrubbing" }
        ]
      },
      {
        id: "c2", title: "Microservices Compute Mesh", theme: "green",
        nodes: [
          { id: "n3", stencil: "cube_platform", title: "Kubernetes Cluster Pods", subtitle: "Auto-Scaling Stateless Services" },
          { id: "n4", stencil: "cube_platform", title: "Asynchronous Event Bus", subtitle: "Decoupled Event Routing" }
        ]
      },
      {
        id: "c3", title: "Persistence & Observability", theme: "amber",
        nodes: [
          { id: "n5", stencil: "standard_card", title: "Relational Database Cluster", subtitle: "Multi-AZ High Availability" },
          { id: "n6", stencil: "standard_card", title: "Observability & Telemetry", subtitle: "Distributed Tracing & Logs" }
        ]
      }
    ],
    connections: [
      { fromNodeId: "n1", toNodeId: "n2", label: "Inspect", style: "direct" },
      { fromNodeId: "n2", toNodeId: "n3", label: "Route", style: "orthogonal" },
      { fromNodeId: "n3", toNodeId: "n4", label: "Publish", style: "direct" },
      { fromNodeId: "n3", toNodeId: "n5", label: "SQL Read/Write", style: "orthogonal" },
      { fromNodeId: "n3", toNodeId: "n6", label: "Telemetry", style: "dashed" }
    ]
  };
}
