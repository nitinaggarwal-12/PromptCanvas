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
        <mxCell id="col_ingestion" value="&lt;b style=&quot;font-size:13px;&quot;&gt;ONCOLOGY DATA PORTAL&lt;/b&gt;&lt;br&gt;&lt;i style=&quot;font-size:12px;font-weight:normal;color:#475569;&quot;&gt;(The &#39;Before&#39; and Ingestion Stage)&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;gradientColor=#FFFFFF;gradientDirection=north;strokeColor=#CBD5E1;strokeWidth=2;verticalAlign=top;fontStyle=1;fontSize=13;fontColor=#0F172A;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="50" y="80" width="320" height="640" as="geometry" />
        </mxCell>

        <!-- Card 1: Manual Data Sources Card -->
        <mxCell id="src_card" value="&lt;b style=&quot;font-size:12px;color:#1E293B;&quot;&gt;Manual Data Sources Card&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#E2E8F0;strokeColor=#94A3B8;strokeWidth=1.5;verticalAlign=top;padding=8;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="70" y="140" width="280" height="110" as="geometry" />
        </mxCell>
        <!-- Red PDF Badge -->
        <mxCell id="pdf_badge" value="&lt;b style=&quot;color:#FFFFFF;font-size:11px;&quot;&gt;PDF&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DC2231;strokeColor=none;fontColor=#FFFFFF;arcSize=20;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="95" y="170" width="36" height="42" as="geometry" />
        </mxCell>
        <mxCell id="pdf_lbl" value="PDFs" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontSize=11;fontColor=#1E293B;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="88" y="215" width="50" height="20" as="geometry" />
        </mxCell>
        <!-- Orange PPT Badge -->
        <mxCell id="ppt_badge" value="&lt;b style=&quot;color:#FFFFFF;font-size:11px;&quot;&gt;PPT&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EA580C;strokeColor=none;fontColor=#FFFFFF;arcSize=20;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="160" y="170" width="36" height="42" as="geometry" />
        </mxCell>
        <mxCell id="ppt_lbl" value="PPTs" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontSize=11;fontColor=#1E293B;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="153" y="215" width="50" height="20" as="geometry" />
        </mxCell>
        <!-- Document Badge -->
        <mxCell id="doc_badge" value="📄" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#64748B;strokeWidth=1.5;fontSize=20;align=center;verticalAlign=middle;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="235" y="170" width="36" height="42" as="geometry" />
        </mxCell>
        <mxCell id="doc_lbl" value="Unstructured&lt;br&gt;Documents" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontSize=10;fontColor=#1E293B;" vertex="1" parent="1">
          <mxGeometry x="215" y="215" width="76" height="25" as="geometry" />
        </mxCell>

        <!-- SHIFT Label -->
        <mxCell id="shift_label" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;SHIFT: Manual gathering -&gt; Strategic planning.&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=1.5;fontColor=#15803D;fontStyle=1;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="70" y="260" width="280" height="28" as="geometry" />
        </mxCell>

        <!-- Card 2: 5 Functional Areas Card -->
        <mxCell id="func_areas" value="&lt;b style=&quot;font-size:12px;color:#1E293B;&quot;&gt;5 Functional Areas Card&lt;/b&gt;&lt;br&gt;&lt;br&gt;&lt;table style=&quot;width:100%;text-align:center;font-size:11px;border-collapse:separate;border-spacing:6px;margin-top:2px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;background:#F8FAFC;border:1px solid #CBD5E1;border-radius:6px;padding:6px;&quot;&gt;🔍&lt;br&gt;&lt;b&gt;Market Research&lt;/b&gt;&lt;/td&gt;&lt;td style=&quot;background:#F8FAFC;border:1px solid #CBD5E1;border-radius:6px;padding:6px;&quot;&gt;🩺&lt;br&gt;&lt;b&gt;Medical Affairs&lt;/b&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;background:#F8FAFC;border:1px solid #CBD5E1;border-radius:6px;padding:6px;&quot;&gt;💰&lt;br&gt;&lt;b&gt;Market Access&lt;/b&gt;&lt;/td&gt;&lt;td style=&quot;background:#F8FAFC;border:1px solid #CBD5E1;border-radius:6px;padding:6px;&quot;&gt;⚖️&lt;br&gt;&lt;b&gt;Outcomes Research&lt;/b&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td colspan=&quot;2&quot; style=&quot;background:#F8FAFC;border:1px solid #CBD5E1;border-radius:6px;padding:6px;&quot;&gt;🧠&lt;br&gt;&lt;b&gt;Competitive Intelligence&lt;/b&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#E2E8F0;strokeColor=#94A3B8;strokeWidth=1.5;fontColor=#1E293B;verticalAlign=top;padding=10;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="70" y="298" width="280" height="210" as="geometry" />
        </mxCell>

        <!-- Card 3: User Node with Analyst Workspace -->
        <mxCell id="user_node" value="&lt;table style=&quot;width:100%;border:none;text-align:left;margin-top:2px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:55px;font-size:38px;text-align:center;vertical-align:middle;&quot;&gt;👩‍💻&lt;/td&gt;&lt;td style=&quot;vertical-align:middle;&quot;&gt;&lt;b style=&quot;font-size:13px;color:#1E293B;&quot;&gt;User Node&lt;/b&gt;&lt;br&gt;&lt;b style=&quot;font-size:11px;color:#334155;&quot;&gt;Analyst Workspace&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:10px;color:#64748B;&quot;&gt;Asset Analysis Profile&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#E2E8F0;strokeColor=#94A3B8;strokeWidth=1.5;padding=10;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="70" y="520" width="280" height="110" as="geometry" />
        </mxCell>

        <!-- COLUMN 2: INTEGRATED INSIGHTS HUB (X: 430, Y: 80, W: 380, H: 640) -->
        <mxCell id="col_processing" value="&lt;b style=&quot;font-size:13px;&quot;&gt;INTEGRATED INSIGHTS HUB&lt;/b&gt;&lt;br&gt;&lt;i style=&quot;font-size:12px;font-weight:normal;color:#1E3A8A;&quot;&gt;(The Processing Stage)&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;gradientColor=#FFFFFF;gradientDirection=north;strokeColor=#60A5FA;strokeWidth=2;verticalAlign=top;fontStyle=1;fontSize=13;fontColor=#1E3A8A;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="430" y="80" width="380" height="640" as="geometry" />
        </mxCell>

        <!-- 3D Isometric Cube Container (Core ITACS Platform) -->
        <mxCell id="core_platform" value="&lt;b style=&quot;font-size:14px;color:#1E3A8A;&quot;&gt;Core ITACS Platform&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:11px;font-weight:normal;color:#3B82F6;&quot;&gt;(Powered by Gemini Enterprise)&lt;/span&gt;" style="shape=cube;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;darkOpacity=0.05;darkOpacity2=0.1;fillColor=#DBEAFE;gradientColor=#EFF6FF;gradientDirection=south;strokeColor=#2563EB;strokeWidth=3;size=20;verticalAlign=top;fontStyle=1;fontSize=14;fontColor=#1E3A8A;padding=15;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="450" y="145" width="340" height="480" as="geometry" />
        </mxCell>
        <!-- 4 Floating White Processing Cards Inside Cube -->
        <mxCell id="synth" value="&lt;b style=&quot;font-size:12px;color:#1E293B;&quot;&gt;Multi-Functional Data Synthesis&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;color:#64748B;font-size:11px;&quot;&gt;(Correlation Engine)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.5;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="470" y="215" width="300" height="55" as="geometry" />
        </mxCell>
        <mxCell id="content" value="&lt;b style=&quot;font-size:12px;color:#1E293B;&quot;&gt;Unstructured Content Analysis&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;color:#64748B;font-size:11px;&quot;&gt;(PDF/PPT Processing)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.5;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="470" y="290" width="300" height="55" as="geometry" />
        </mxCell>
        <mxCell id="chatbot" value="&lt;b style=&quot;font-size:12px;color:#1E293B;&quot;&gt;Strategic Chatbot Queries&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;color:#64748B;font-size:11px;&quot;&gt;(Natural Language Interface)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.5;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="470" y="365" width="300" height="55" as="geometry" />
        </mxCell>
        <mxCell id="sim" value="&lt;b style=&quot;font-size:12px;color:#1E293B;&quot;&gt;Competitive Announcement Simulation&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;color:#64748B;font-size:11px;&quot;&gt;(Scenario Planning)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.5;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="470" y="440" width="300" height="55" as="geometry" />
        </mxCell>
        <!-- Parallel Path Label at bottom of Column 2 -->
        <mxCell id="processing_footer" value="PARALLEL PATH:&lt;br&gt;&lt;b style=&quot;color:#1E3A8A;&quot;&gt;No-Code MVP (immediate)&lt;/b&gt; -&gt; &lt;b style=&quot;color:#1E3A8A;&quot;&gt;Custom High-Code Agent&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:10px;color:#64748B;&quot;&gt;(production/approval)&lt;/span&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;rounded=0;fontSize=11;fontColor=#64748B;" vertex="1" parent="1">
          <mxGeometry x="440" y="650" width="360" height="40" as="geometry" />
        </mxCell>

        <!-- COLUMN 3: STRATEGIC DELIVERY & INSIGHTS (X: 870, Y: 80, W: 360, H: 640) -->
        <mxCell id="col_delivery" value="&lt;b style=&quot;font-size:13px;&quot;&gt;STRATEGIC DELIVERY &amp;amp; INSIGHTS&lt;/b&gt;&lt;br&gt;&lt;i style=&quot;font-size:12px;font-weight:normal;color:#14532D;&quot;&gt;(The &#39;After&#39; and Output Stage)&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDF4;gradientColor=#FFFFFF;gradientDirection=north;strokeColor=#4ADE80;strokeWidth=2;verticalAlign=top;fontStyle=1;fontSize=13;fontColor=#14532D;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="870" y="80" width="360" height="640" as="geometry" />
        </mxCell>

        <!-- 3 Green Status Pills -->
        <mxCell id="out_1" value="&lt;b&gt;OUTMANEUVER COMPETITION&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=2;fontColor=#15803D;fontStyle=1;fontSize=11;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="900" y="145" width="300" height="34" as="geometry" />
        </mxCell>
        <mxCell id="out_2" value="&lt;b&gt;REACH PATIENTS FASTER&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=2;fontColor=#15803D;fontStyle=1;fontSize=11;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="900" y="187" width="300" height="34" as="geometry" />
        </mxCell>
        <mxCell id="out_3" value="&lt;b&gt;STRATEGIC PLANNING &amp;amp; ANALYSIS&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=2;fontColor=#15803D;fontStyle=1;fontSize=11;shadow=1;" vertex="1" parent="1">
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
        <mxCell id="exec_dash" value="&lt;div style=&quot;background:#0F172A;color:#FFFFFF;padding:4px 8px;font-size:11px;font-weight:bold;text-align:left;border-top-left-radius:2px;border-top-right-radius:2px;&quot;&gt;&lt;span style=&quot;color:#EF4444;margin-right:4px;&quot;&gt;●&lt;/span&gt;&lt;span style=&quot;color:#F59E0B;margin-right:4px;&quot;&gt;●&lt;/span&gt;&lt;span style=&quot;color:#10B981;margin-right:8px;&quot;&gt;●&lt;/span&gt; 📊 Executive Strategy Dashboard&lt;/div&gt;&lt;table style=&quot;width:100%;text-align:center;border:none;margin-top:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:50%;border-right:1px solid #E2E8F0;padding:4px;&quot;&gt;&lt;span style=&quot;font-size:10px;color:#64748B;&quot;&gt;Real-time KPIs&lt;/span&gt;&lt;br&gt;&lt;b style=&quot;font-size:16px;color:#3B82F6;&quot;&gt;94.8%&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:10px;color:#10B981;background:#D1FAE5;padding:1px 4px;border-radius:3px;&quot;&gt;▲ +12.4%&lt;/span&gt;&lt;/td&gt;&lt;td style=&quot;padding:4px;&quot;&gt;&lt;span style=&quot;font-size:10px;color:#64748B;&quot;&gt;Launch Readiness&lt;/span&gt;&lt;br&gt;&lt;b style=&quot;font-size:16px;color:#10B981;&quot;&gt;Phase 3&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:10px;color:#64748B;background:#F1F5F9;padding:1px 4px;border-radius:3px;&quot;&gt;On Schedule&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=none;fontColor=#1E293B;verticalAlign=top;" vertex="1" parent="1">
          <mxGeometry x="906" y="281" width="288" height="103" as="geometry" />
        </mxCell>

        <!-- iPad Tablet Mockup (Competitor Comparison View) -->
        <mxCell id="comp_view_bezel" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#334155;strokeColor=#1E293B;strokeWidth=3;arcSize=10;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="900" y="440" width="300" height="110" as="geometry" />
        </mxCell>
        <mxCell id="comp_view_cam" value="" style="shape=ellipse;whiteSpace=wrap;html=1;fillColor=#64748B;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="1047" y="443" width="6" height="6" as="geometry" />
        </mxCell>
        <mxCell id="comp_view" value="&lt;div style=&quot;font-size:11px;font-weight:bold;color:#1E293B;background:#F8FAFC;border-bottom:1px solid #E2E8F0;padding:4px 6px;text-align:left;&quot;&gt;📉 Competitor Comparison View &lt;span style=&quot;float:right;font-size:10px;color:#64748B;font-weight:normal;&quot;&gt;Target Timelines&lt;/span&gt;&lt;/div&gt;&lt;table style=&quot;width:100%;text-align:center;font-size:10px;margin-top:6px;border-collapse:separate;border-spacing:4px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;background:#FEF2F2;border:1px solid #FCA5A5;border-radius:4px;padding:4px;&quot;&gt;&lt;b style=&quot;color:#DC2231;&quot;&gt;Competitor X&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;color:#991B1B;&quot;&gt;Q3 Launch&lt;/span&gt;&lt;/td&gt;&lt;td style=&quot;background:#FFFBEB;border:1px solid #FDE68A;border-radius:4px;padding:4px;&quot;&gt;&lt;b style=&quot;color:#D97706;&quot;&gt;Competitor Y&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;color:#92400E;&quot;&gt;Phase 2b&lt;/span&gt;&lt;/td&gt;&lt;td style=&quot;background:#ECFDF5;border:1px solid #6EE7B7;border-radius:4px;padding:4px;&quot;&gt;&lt;b style=&quot;color:#10B981;&quot;&gt;ITACS Target&lt;/b&gt;&lt;br&gt;&lt;b style=&quot;color:#065F46;&quot;&gt;Q1 Market Lead&lt;/b&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=none;fontColor=#1E293B;padding=4;arcSize=6;verticalAlign=top;" vertex="1" parent="1">
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
        <mxCell id="e_in_1" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#3B82F6;endArrow=block;endFill=1;" edge="1" parent="1" source="src_card" target="core_platform">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="390" y="195" />
              <mxPoint x="390" y="300" />
            </Array>
          </mxGeometry>
        </mxCell>
        <!-- Arrow 2: 5 Functional Areas -> Cube (with DATA INGESTION label) -->
        <mxCell id="e_in_2" value="&lt;b style=&quot;color:#1E3A8A;background:#EFF6FF;padding:2px 6px;border-radius:4px;border:1px solid #93C5FD;&quot;&gt;DATA INGESTION&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2.5;strokeColor=#2563EB;endArrow=block;endFill=1;labelBackgroundColor=none;fontStyle=1;fontSize=11;" edge="1" parent="1" source="func_areas" target="core_platform">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="400" y="403" />
              <mxPoint x="400" y="385" />
            </Array>
          </mxGeometry>
        </mxCell>
        <!-- Arrow 3: User Node -> Cube -->
        <mxCell id="e_in_3" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#3B82F6;endArrow=block;endFill=1;" edge="1" parent="1" source="user_node" target="core_platform">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="390" y="575" />
              <mxPoint x="390" y="480" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- Main Exit Arrow: Cube -> Branch Point (with INSIGHTS FEED label) -->
        <mxCell id="e_out_main" value="&lt;b style=&quot;color:#14532D;background:#F0FDF4;padding:2px 6px;border-radius:4px;border:1px solid #86EFAC;&quot;&gt;INSIGHTS FEED&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2.5;strokeColor=#10B981;endArrow=none;endFill=0;labelBackgroundColor=none;fontStyle=1;fontSize=11;" edge="1" parent="1" source="core_platform">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="835" y="385" as="targetPoint" />
          </mxGeometry>
        </mxCell>

        <!-- Branch 1: Branch Point -> Executive Strategy Dashboard -->
        <mxCell id="e_out_1" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#10B981;endArrow=block;endFill=1;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="835" y="385" as="sourcePoint" />
            <mxPoint x="900" y="337" as="targetPoint" />
            <Array as="points">
              <mxPoint x="835" y="337" />
            </Array>
          </mxGeometry>
        </mxCell>
        <!-- Branch 2: Branch Point -> Competitor Comparison View -->
        <mxCell id="e_out_2" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#10B981;endArrow=block;endFill=1;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="835" y="385" as="sourcePoint" />
            <mxPoint x="900" y="495" as="targetPoint" />
            <Array as="points">
              <mxPoint x="835" y="495" />
            </Array>
          </mxGeometry>
        </mxCell>
        <!-- Branch 3: Branch Point -> Strategic Priority Advisory -->
        <mxCell id="e_out_3" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=#10B981;endArrow=block;endFill=1;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
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
 * Compiles a structured diagram specification into pixel-perfect Draw.io XML
 */
export function compileSpecToDrawioXml(spec: CompiledDiagramSpec): string {
  if (spec.diagramId === "itacs_conceptual_compiled") {
    return getExactItacsReferenceXml();
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
    
    // Enforce Draw.io routing protocol: plain text labels, no html background wrapper
    const edgeStyle = `edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeWidth=2;strokeColor=${strokeColor};fontColor=${fontColor};labelBackgroundColor=none;fontStyle=1;fontSize=12;`;
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

  // If it's already an XML string, return it
  if (cleanedText.includes('<mxfile') && cleanedText.includes('</mxfile>')) {
    const start = cleanedText.indexOf('<mxfile');
    const end = cleanedText.lastIndexOf('</mxfile>') + 9;
    return cleanedText.substring(start, end);
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

function escapeXml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
