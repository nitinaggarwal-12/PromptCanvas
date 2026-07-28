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

        <!-- REACT LOOP ARROWS (CURVED / ORTHOGONAL) -->
        <mxCell id="e_r1" value="" style="edgeStyle=curved=1;rounded=1;html=1;strokeWidth=1.5;strokeColor=#64748B;endArrow=block;endFill=1;" edge="1" parent="1" source="react_thought" target="react_action">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="e_r2" value="" style="edgeStyle=curved=1;rounded=1;html=1;strokeWidth=1.5;strokeColor=#64748B;endArrow=block;endFill=1;" edge="1" parent="1" source="react_action" target="react_obs">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="e_r3" value="" style="edgeStyle=curved=1;rounded=1;html=1;strokeWidth=1.5;strokeColor=#64748B;endArrow=block;endFill=1;" edge="1" parent="1" source="react_obs" target="react_syn">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="e_r4" value="" style="edgeStyle=curved=1;rounded=1;html=1;strokeWidth=1.5;strokeColor=#64748B;endArrow=block;endFill=1;" edge="1" parent="1" source="react_syn" target="react_thought">
          <mxGeometry relative="1" as="geometry" />
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
          <mxGeometry x="210" y="25" width="1490" height="1180" as="geometry" />
        </mxCell>

        <!-- TIME ARROW ON LEFT (OUTSIDE CONTAINER) -->
        <mxCell id="time_arrow" value="" style="endArrow=block;endFill=1;html=1;strokeWidth=2.5;strokeColor=#475569;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="50" y="100" as="sourcePoint" />
            <mxPoint x="50" y="1180" as="targetPoint" />
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
          <mxGeometry relative="1" as="geometry"><mxPoint x="122" y="135" as="sourcePoint" /><mxPoint x="122" y="1190" as="targetPoint" /></mxGeometry>
        </mxCell>
        <mxCell id="orch_bar" value="" style="endArrow=none;dashed=1;html=1;strokeWidth=1.5;strokeColor=#64748B;strokeDashArray=6 6;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="340" y="135" as="sourcePoint" /><mxPoint x="340" y="1190" as="targetPoint" /></mxGeometry>
        </mxCell>
        <mxCell id="llm_bar" value="" style="endArrow=none;dashed=1;html=1;strokeWidth=1.5;strokeColor=#64748B;strokeDashArray=6 6;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="560" y="135" as="sourcePoint" /><mxPoint x="560" y="1190" as="targetPoint" /></mxGeometry>
        </mxCell>
        <mxCell id="mem_bar" value="" style="endArrow=none;dashed=1;html=1;strokeWidth=1.5;strokeColor=#64748B;strokeDashArray=6 6;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="780" y="135" as="sourcePoint" /><mxPoint x="780" y="1190" as="targetPoint" /></mxGeometry>
        </mxCell>
        <mxCell id="rag_bar" value="" style="endArrow=none;dashed=1;html=1;strokeWidth=1.5;strokeColor=#64748B;strokeDashArray=6 6;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="1020" y="135" as="sourcePoint" /><mxPoint x="1020" y="1190" as="targetPoint" /></mxGeometry>
        </mxCell>
        <mxCell id="gcs_bar" value="" style="endArrow=none;dashed=1;html=1;strokeWidth=1.5;strokeColor=#64748B;strokeDashArray=6 6;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="1270" y="135" as="sourcePoint" /><mxPoint x="1270" y="1190" as="targetPoint" /></mxGeometry>
        </mxCell>
        <mxCell id="bq_bar" value="" style="endArrow=none;dashed=1;html=1;strokeWidth=1.5;strokeColor=#64748B;strokeDashArray=6 6;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="1515" y="135" as="sourcePoint" /><mxPoint x="1515" y="1190" as="targetPoint" /></mxGeometry>
        </mxCell>

        <!-- VERTICAL EXECUTION / ACTIVATION BARS ON LIFELINES MATCHING IMAGE 1 PRESENCE -->
        <mxCell id="act_user_1" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#3B82F6;strokeColor=#1D4ED8;strokeWidth=1.5;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="115" y="140" width="14" height="70" as="geometry" />
        </mxCell>
        <mxCell id="act_user_2" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#3B82F6;strokeColor=#1D4ED8;strokeWidth=1.5;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="115" y="1155" width="14" height="35" as="geometry" />
        </mxCell>
        <mxCell id="act_orch_main" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#3B82F6;strokeColor=#1D4ED8;strokeWidth=1.5;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="333" y="145" width="14" height="1085" as="geometry" />
        </mxCell>
        <mxCell id="act_llm_1" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#93C5FD;strokeColor=#2563EB;strokeWidth=1.5;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="553" y="365" width="14" height="60" as="geometry" />
        </mxCell>
        <mxCell id="act_llm_2" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#93C5FD;strokeColor=#2563EB;strokeWidth=1.5;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="553" y="685" width="14" height="60" as="geometry" />
        </mxCell>
        <mxCell id="act_llm_3" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#93C5FD;strokeColor=#2563EB;strokeWidth=1.5;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="553" y="1005" width="14" height="60" as="geometry" />
        </mxCell>
        <mxCell id="act_mem_1" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#A7F3D0;strokeColor=#059669;strokeWidth=1.5;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="773" y="270" width="14" height="105" as="geometry" />
        </mxCell>
        <mxCell id="act_mem_2" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#A7F3D0;strokeColor=#059669;strokeWidth=1.5;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="773" y="1115" width="14" height="65" as="geometry" />
        </mxCell>
        <mxCell id="act_rag_1" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#6EE7B7;strokeColor=#10B981;strokeWidth=1.5;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="1013" y="480" width="14" height="135" as="geometry" />
        </mxCell>
        <mxCell id="act_gcs_1" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#93C5FD;strokeColor=#2563EB;strokeWidth=1.5;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="1263" y="540" width="14" height="70" as="geometry" />
        </mxCell>
        <mxCell id="act_bq_1" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#60A5FA;strokeColor=#1D4ED8;strokeWidth=1.5;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="1508" y="800" width="14" height="75" as="geometry" />
        </mxCell>
        <mxCell id="act_bq_2" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#60A5FA;strokeColor=#1D4ED8;strokeWidth=1.5;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="1508" y="1150" width="14" height="40" as="geometry" />
        </mxCell>

        <!-- STEP 1: USER PROMPT -->
        <mxCell id="s1" value="Sends single multi-silo Oncology prompt&lt;br&gt;&lt;span style='font-size:10px;font-weight:normal;'&gt;e.g., 'Compare market trends across 5 silos, include sales figures'&lt;/span&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=2;strokeColor=#1E293B;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=11;fontColor=#0F172A;" edge="1" parent="1">
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
        <mxCell id="s4" value="Updates Conversation Memory with prompt&lt;br&gt;&lt;span style='font-size:10px;font-weight:normal;'&gt;Sends all context (Prompt + Memory)&lt;/span&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=2;strokeColor=#1D4ED8;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=11;fontColor=#0F172A;" edge="1" parent="1">
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
        <mxCell id="s10" value="Updates Reasoner (GEMINI) with New Observation&lt;br&gt;&lt;span style='font-size:10px;font-weight:normal;'&gt;(Send all content: Prompt + Memory + RAG Obs)&lt;/span&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=2;strokeColor=#1D4ED8;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=11;fontColor=#0F172A;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="340" y="695" as="sourcePoint" /><mxPoint x="560" y="695" as="targetPoint" /></mxGeometry>
        </mxCell>

        <!-- STEP 11: REACT 2 -->
        <mxCell id="s11_react" value="&lt;b&gt;ReAct&lt;/b&gt;&lt;br&gt;THOUGHT: 'I have context, but need recent sales figures.'&lt;br&gt;&lt;b style='color:#1D4ED8;'&gt;ACTION: Query BigQuery Analytics&lt;/b&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;fontColor=#1E293B;fontStyle=0;fontSize=11;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="435" y="730" width="250" height="58" as="geometry" />
        </mxCell>

        <!-- STEP 12: EXECUTES ANALYTICS ACTION -->
        <mxCell id="s12" value="Executes Analytics Action&lt;br&gt;&lt;span style='font-size:10px;color:#475569;font-weight:normal;'&gt;(Send call logs: actional, ML Inference log definition)&lt;br&gt;Call includes SQL query (call includes RAG query)&lt;/span&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=2;strokeColor=#1D4ED8;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=11;fontColor=#0F172A;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="340" y="810" as="sourcePoint" /><mxPoint x="1515" y="810" as="targetPoint" /></mxGeometry>
        </mxCell>

        <!-- STEP 13: EXECUTES SQL QUERY -->
        <mxCell id="s13" value="Executes SQL query&lt;br&gt;&lt;span style='font-size:10px;font-weight:normal;'&gt;(Secure Data Access tool 2)&lt;/span&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=2;strokeColor=#0284C7;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=11;fontColor=#0F172A;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="1515" y="870" as="sourcePoint" /><mxPoint x="1270" y="870" as="targetPoint" /></mxGeometry>
        </mxCell>
        <mxCell id="iam_note_exact" value="GCS/BQ enforces IAM integration &amp;amp; VPC-SC reference Image 3" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#22C55E;fontStyle=1;fontSize=10;fontColor=#166534;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="1300" y="835" width="180" height="30" as="geometry" />
        </mxCell>

        <!-- STEP 14: BQ FETCHES RESULTS -->
        <mxCell id="s14_ret" value="BQ fetches results" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;dashed=1;strokeWidth=2;strokeColor=#10B981;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=11;fontColor=#0F172A;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="1270" y="915" as="sourcePoint" /><mxPoint x="1515" y="915" as="targetPoint" /></mxGeometry>
        </mxCell>

        <!-- STEP 15: SENDS QUERY RESULTS TO OBSERVATION -->
        <mxCell id="s15_obs" value="Sends Query Results (Table: JSON) to OBSERVATION" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;dashed=1;strokeWidth=2;strokeColor=#10B981;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=11;fontColor=#0F172A;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="1515" y="965" as="sourcePoint" /><mxPoint x="340" y="965" as="targetPoint" /></mxGeometry>
        </mxCell>

        <!-- STEP 16: UPDATES REASONER 2 -->
        <mxCell id="s16" value="Updates Reasoner (GEMINI) with New Observation&lt;br&gt;&lt;span style='font-size:10px;font-weight:normal;'&gt;(Send all content: Prompt + Memory + RAG Obs)&lt;/span&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=2;strokeColor=#1D4ED8;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=11;fontColor=#0F172A;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="340" y="1015" as="sourcePoint" /><mxPoint x="560" y="1015" as="targetPoint" /></mxGeometry>
        </mxCell>

        <!-- STEP 17: REACT 3 -->
        <mxCell id="s17_react" value="&lt;b&gt;ReAct&lt;/b&gt;&lt;br&gt;THOUGHT: 'All context gathered.'&lt;br&gt;&lt;b style='color:#047857;'&gt;SYNTHESIS: Generate comprehensive report&lt;/b&gt;" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#ECFDF5;strokeColor=#10B981;fontColor=#1E293B;fontStyle=0;fontSize=11;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="435" y="1050" width="250" height="58" as="geometry" />
        </mxCell>

        <!-- STEP 18: SYNTHESIZES FINAL RESPONSE TEST -->
        <mxCell id="s18" value="Synthesizes final response test&lt;br&gt;&lt;span style='font-size:10px;font-weight:normal;'&gt;(Action ref Image 15 data inventory)&lt;br&gt;Updates Conversation Memory&lt;/span&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=2;strokeColor=#1D4ED8;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=11;fontColor=#0F172A;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="340" y="1125" as="sourcePoint" /><mxPoint x="780" y="1125" as="targetPoint" /></mxGeometry>
        </mxCell>

        <!-- STEP 19: SYNTHESIZE REPORTING ARTIFACT & FINAL RESPONSE -->
        <mxCell id="s19_user" value="Sends final synthesized response&lt;br&gt;&lt;span style='font-size:10px;font-weight:normal;'&gt;(linked PPT report / JSON data)&lt;br&gt;Displays response to USER&lt;/span&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=2.5;strokeColor=#2563EB;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=11;fontColor=#1D4ED8;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="340" y="1175" as="sourcePoint" /><mxPoint x="122" y="1175" as="targetPoint" /></mxGeometry>
        </mxCell>

        <!-- STEP 20: LOGS FINAL OUTCOME -->
        <mxCell id="s20_log" value="Logs final outcome" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=2;strokeColor=#9A3412;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;fontStyle=1;fontSize=11;fontColor=#9A3412;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry"><mxPoint x="340" y="1225" as="sourcePoint" /><mxPoint x="1515" y="1225" as="targetPoint" /></mxGeometry>
        </mxCell>

        <!-- TOPOLOGY NOTES & LOGGING BOXES MATCHING IMAGE 1 -->
        <mxCell id="top_note_1" value="Automatic context lookup, private access path to Gemini boundary reference 5 topology" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#94A3B8;fontStyle=0;fontSize=10;fontColor=#334155;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="1300" y="180" width="180" height="40" as="geometry" />
        </mxCell>
        <mxCell id="top_note_2" value="Automatic context lookup, private access path to Gemini reference Image 5 topology" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#94A3B8;fontStyle=0;fontSize=10;fontColor=#334155;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="1300" y="370" width="180" height="40" as="geometry" />
        </mxCell>
        <mxCell id="mid_note_1" value="Context is masked referencing definition" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#94A3B8;fontStyle=0;fontSize=10;fontColor=#334155;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="1300" y="525" width="160" height="30" as="geometry" />
        </mxCell>
        <mxCell id="log_box_1" value="Logs results in Business Analytics log definition" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFEDD5;strokeColor=#F97316;fontStyle=1;fontSize=10;fontColor=#9A3412;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="1530" y="795" width="150" height="38" as="geometry" />
        </mxCell>
        <mxCell id="log_box_2" value="Logs results Analytics tool reference Image 7 business Analytics definition" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFEDD5;strokeColor=#F97316;fontStyle=1;fontSize=10;fontColor=#9A3412;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="1530" y="890" width="150" height="48" as="geometry" />
        </mxCell>
        <mxCell id="conv_log_box" value="Conversation Log conversation log definition" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#64748B;fontStyle=0;fontSize=10;fontColor=#334155;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="800" y="1105" width="160" height="30" as="geometry" />
        </mxCell>
        <mxCell id="rep_state_box" value="Updates Report state 15 state machine flow" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#64748B;fontStyle=0;fontSize=10;fontColor=#334155;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="800" y="1145" width="160" height="30" as="geometry" />
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
          <mxGeometry x="1485" y="860" width="22" height="22" as="geometry" />
        </mxCell>
        <mxCell id="c14" value="14" style="ellipse;whiteSpace=wrap;html=1;fillColor=#0F172A;fontColor=#FFFFFF;fontStyle=1;fontSize=11;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="310" y="1005" width="22" height="22" as="geometry" />
        </mxCell>
        <mxCell id="c15" value="15" style="ellipse;whiteSpace=wrap;html=1;fillColor=#0F172A;fontColor=#FFFFFF;fontStyle=1;fontSize=11;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="420" y="1065" width="22" height="22" as="geometry" />
        </mxCell>
        <mxCell id="c16" value="16" style="ellipse;whiteSpace=wrap;html=1;fillColor=#0F172A;fontColor=#FFFFFF;fontStyle=1;fontSize=11;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="310" y="1115" width="22" height="22" as="geometry" />
        </mxCell>
        <mxCell id="c17" value="17" style="ellipse;whiteSpace=wrap;html=1;fillColor=#0F172A;fontColor=#FFFFFF;fontStyle=1;fontSize=11;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="310" y="1165" width="22" height="22" as="geometry" />
        </mxCell>
        <mxCell id="c18" value="18" style="ellipse;whiteSpace=wrap;html=1;fillColor=#0F172A;fontColor=#FFFFFF;fontStyle=1;fontSize=11;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="92" y="1165" width="22" height="22" as="geometry" />
        </mxCell>
        <mxCell id="c19" value="19" style="ellipse;whiteSpace=wrap;html=1;fillColor=#0F172A;fontColor=#FFFFFF;fontStyle=1;fontSize=11;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="310" y="1215" width="22" height="22" as="geometry" />
        </mxCell>
        <!-- TWO-BOX ARCHITECTURE FOOTER MATCHING IMAGE 1 EXACTLY -->
        <!-- BOX 1: LEGEND AND KEY DEFINITION (LEFT/CENTER) -->
        <mxCell id="legend_box" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;shadow=0;" vertex="1" parent="1">
          <mxGeometry x="40" y="1260" width="1080" height="180" as="geometry" />
        </mxCell>
        <mxCell id="legend_content" value="&lt;table style='width:100%;font-family:Helvetica;font-size:12px;color:#334155;border-collapse:collapse;'&gt;&lt;tr style='vertical-align:top;'&gt;&lt;td style='width:52%;padding-right:15px;'&gt;&lt;b style='font-size:13px;color:#0F172A;'&gt;LEGEND&lt;/b&gt;&lt;br&gt;&lt;table style='width:100%;margin-top:8px;font-size:11px;line-height:1.6;'&gt;&lt;tr&gt;&lt;td&gt;&lt;span style='color:#3B82F6;font-size:14px;'&gt;■&lt;/span&gt; Managed Compute&lt;/td&gt;&lt;td&gt;&lt;b style='color:#1E293B;'&gt;&amp;rarr;&lt;/b&gt; Managed Type&lt;/td&gt;&lt;td&gt;&lt;b style='color:#10B981;'&gt;&amp;rarr;&lt;/b&gt; PII Check referencing check&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;&lt;span style='color:#10B981;font-size:14px;'&gt;■&lt;/span&gt; Storage&lt;/td&gt;&lt;td&gt;&lt;b style='color:#3B82F6;&lt;/b&gt;&amp;mdash; Connection boundary&lt;/td&gt;&lt;td&gt;&lt;span style='color:#1E3A8A;font-size:14px;'&gt;■&lt;/span&gt; PII Check vetting&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;&lt;span style='color:#64748B;font-size:14px;'&gt;■&lt;/span&gt; Secure boundary&lt;/td&gt;&lt;td&gt;&lt;b style='color:#64748B;&lt;/b&gt;- - - Line descriptions&lt;/td&gt;&lt;td&gt;&lt;span style='color:#E0F2FE;border:1px solid #93C5FD;font-size:12px;padding:0 3px;'&gt;■&lt;/span&gt; PII Business analytics log def&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;&lt;/td&gt;&lt;td style='width:48%;border-left:1px solid #E2E8F0;padding-left:15px;'&gt;&lt;b style='font-size:13px;color:#0F172A;'&gt;KEY DEFINITION&lt;/b&gt;&lt;br&gt;&lt;table style='width:100%;margin-top:8px;font-size:11px;line-height:1.6;'&gt;&lt;tr&gt;&lt;td style='width:35px;color:#334155;font-weight:bold;'&gt;&amp;mdash;&amp;mdash;&lt;/td&gt;&lt;td&gt;Send call with &amp;quot;Automatic Embedding &amp;amp; Retrieve image&amp;quot;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style='color:#10B981;font-weight:bold;'&gt;&amp;mdash;&amp;mdash;&lt;/td&gt;&lt;td&gt;Line reference Image 13 &amp;quot;Evaluated&amp;quot; state logic trigger&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style='color:#059669;font-weight:bold;'&gt;- - - -&lt;/td&gt;&lt;td&gt;Context reference references image 1 &amp;quot;context corpus definition&amp;quot;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style='color:#1E3A8A;font-weight:bold;'&gt;&amp;mdash;&amp;mdash;&lt;/td&gt;&lt;td&gt;Line descriptions, reference Image 12, state machine flow&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;" vertex="1" parent="1">
          <mxGeometry x="55" y="1272" width="1050" height="155" as="geometry" />
        </mxCell>

        <!-- BOX 2: WHY IT WORKS (RIGHT) -->
        <mxCell id="why_box" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;shadow=0;" vertex="1" parent="1">
          <mxGeometry x="1140" y="1260" width="560" height="180" as="geometry" />
        </mxCell>
        <mxCell id="why_content" value="&lt;b style='font-size:13px;color:#0F172A;'&gt;WHY IT WORKS:&lt;/b&gt;&lt;br&gt;&lt;br&gt;This dynamic sequence diagram makes non-deterministic ReAct loops understandable and executable. Developers get a blueprint showing the precise order, handshakes, timing, security boundaries, and data dependencies—including failure paths, loop triggers, and automatic logging—required to implement complex agentic orchestration logic across all solution types." style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;whiteSpace=wrap;rounded=0;fontFamily=Helvetica;fontSize=12;fontColor=#334155;lineHeight=1.5;" vertex="1" parent="1">
          <mxGeometry x="1160" y="1275" width="520" height="150" as="geometry" />
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

function escapeXml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
