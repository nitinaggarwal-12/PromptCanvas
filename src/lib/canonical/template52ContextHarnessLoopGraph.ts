/**
 * Canonical Template 52: Context + Harness + Loop + Graph (AI Engineering Setup Architecture)
 * 100% 1:1 Master Visual Twin & Editable Vector Infographic Blueprint
 */

export function generateTemplate52ContextHarnessLoopGraphXml(
  domainFlavor: string = 'general',
  theme: 'light' | 'dark' = 'light'
): string {
  const isDark = theme === 'dark';
  const canvasBg = isDark ? '#0F172A' : '#F8FAFC';
  const cardBg = isDark ? '#1E293B' : '#FFFFFF';
  const cardBorder = isDark ? '#334155' : '#CBD5E1';
  const textPrimary = isDark ? '#F8FAFC' : '#0F172A';
  const textMuted = isDark ? '#94A3B8' : '#475569';
  const promptBarBg = isDark ? '#0F172A' : '#F1F5F9';
  const promptBarBorder = isDark ? '#334155' : '#E2E8F0';

  const starburstSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" width="32" height="32"><g stroke="#EA580C" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="3" x2="18" y2="33"/><line x1="3" y1="18" x2="33" y2="18"/><line x1="7.4" y1="7.4" x2="28.6" y2="28.6"/><line x1="28.6" y1="7.4" x2="7.4" y2="28.6"/><line x1="10.5" y1="4.8" x2="25.5" y2="31.2"/><line x1="4.8" y1="10.5" x2="31.2" y2="25.5"/><line x1="4.8" y1="25.5" x2="31.2" y2="10.5"/><line x1="10.5" y1="31.2" x2="25.5" y2="4.8"/></g><circle cx="18" cy="18" r="4" fill="#FFFFFF" stroke="#EA580C" stroke-width="2"/></svg>`;
  const starburstWatermarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="90" height="90"><g stroke="#FED7AA" stroke-width="5" stroke-linecap="round" opacity="0.65"><line x1="50" y1="5" x2="50" y2="95"/><line x1="5" y1="50" x2="95" y2="50"/><line x1="18" y1="18" x2="82" y2="82"/><line x1="82" y1="18" x2="18" y2="82"/><line x1="28" y1="10" x2="72" y2="90"/><line x1="10" y1="28" x2="90" y2="72"/><line x1="10" y1="72" x2="90" y2="28"/><line x1="28" y1="90" x2="72" y2="10"/></g></svg>`;

  return `<mxfile host="embed.diagrams.net" modified="${new Date().toISOString()}" agent="PromptCanvas Master Engine" version="24.0.0" type="device">
  <diagram id="template_52_context_harness_loop_graph" name="Context + Harness + Loop + Graph (AI Engineering)">
    <mxGraphModel dx="1600" dy="1050" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="1050" background="${canvasBg}" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- ==================== TOP HEADER & WATERMARK ==================== -->
        <mxCell id="header_title" value="&lt;div style=&quot;text-align:left;font-family:Inter,sans-serif;&quot;&gt;&lt;span style=&quot;font-size:32px;font-weight:800;color:${textPrimary};letter-spacing:-0.5px;&quot;&gt;Context &lt;span style=&quot;color:#94A3B8;font-weight:400;&quot;&gt;+&lt;/span&gt; Harness &lt;span style=&quot;color:#94A3B8;font-weight:400;&quot;&gt;+&lt;/span&gt; Loop &lt;span style=&quot;color:#94A3B8;font-weight:400;&quot;&gt;+&lt;/span&gt; &lt;span style=&quot;color:#EA580C;&quot;&gt;Graph&lt;/span&gt;&lt;/span&gt;&lt;br/&gt;&lt;span style=&quot;font-size:14px;color:${textMuted};font-weight:600;&quot;&gt;Four parts of your AI setup. &lt;b style=&quot;color:${textPrimary};&quot;&gt;What each one does, with a prompt to try.&lt;/b&gt;&lt;/span&gt;&lt;/div&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;" vertex="1" parent="1">
          <mxGeometry x="60" y="18" width="1100" height="56" as="geometry" />
        </mxCell>

        <mxCell id="header_watermark" value="&lt;div&gt;${starburstWatermarkSvg.replace(/"/g, '&quot;')}&lt;/div&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1430" y="10" width="90" height="75" as="geometry" />
        </mxCell>

        <!-- ==================== LEFT TIMELINE RAIL ==================== -->
        <mxCell id="rail_spine" value="" style="endArrow=oval;endFill=1;startArrow=none;html=1;strokeColor=#CBD5E1;strokeWidth=3;" edge="1" parent="1">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="64" y="115" as="sourcePoint" />
            <mxPoint x="64" y="945" as="targetPoint" />
          </mxGeometry>
        </mxCell>

        <mxCell id="badge_01" value="01" style="rounded=1;arcSize=24;whiteSpace=wrap;html=1;fillColor=#FEF3C7;strokeColor=#F59E0B;strokeWidth=2;fontColor=#B45309;fontStyle=1;fontSize=13;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="44" y="100" width="40" height="30" as="geometry" />
        </mxCell>

        <mxCell id="badge_02" value="02" style="rounded=1;arcSize=24;whiteSpace=wrap;html=1;fillColor=#F3E8FF;strokeColor=#A855F7;strokeWidth=2;fontColor=#7E22CE;fontStyle=1;fontSize=13;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="44" y="320" width="40" height="30" as="geometry" />
        </mxCell>

        <mxCell id="badge_03" value="03" style="rounded=1;arcSize=24;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#10B981;strokeWidth=2;fontColor=#047857;fontStyle=1;fontSize=13;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="44" y="540" width="40" height="30" as="geometry" />
        </mxCell>

        <mxCell id="badge_04" value="04" style="rounded=1;arcSize=24;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#3B82F6;strokeWidth=2;fontColor=#1D4ED8;fontStyle=1;fontSize=13;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="44" y="760" width="40" height="30" as="geometry" />
        </mxCell>

        <!-- ========================================================================= -->
        <!-- TIER 01: CONTEXT                                                          -->
        <!-- ========================================================================= -->
        <mxCell id="t1_card" value="" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="104" y="88" width="1436" height="206" as="geometry" />
        </mxCell>

        <mxCell id="t1_title" value="&lt;div style=&quot;font-family:Inter,sans-serif;&quot;&gt;&lt;span style=&quot;font-size:20px;font-weight:800;color:${textPrimary};&quot;&gt;Context&lt;/span&gt;&amp;nbsp;&amp;nbsp;&amp;nbsp;&lt;span style=&quot;font-size:14px;font-weight:700;color:${textMuted};&quot;&gt;The information loaded for the model&apos;s current answer.&lt;/span&gt;&lt;/div&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="128" y="96" width="800" height="30" as="geometry" />
        </mxCell>

        <!-- Left Dashed Box: LOADED CONTEXT -->
        <mxCell id="t1_loaded_box" value="" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FEFCE8;strokeColor=#FACC15;strokeWidth=1.5;dashed=1;dashPattern=4 4;" vertex="1" parent="1">
          <mxGeometry x="128" y="130" width="480" height="108" as="geometry" />
        </mxCell>
        <mxCell id="t1_loaded_lbl" value="LOADED CONTEXT" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontStyle=1;fontSize=10;fontColor=#854D0E;" vertex="1" parent="1">
          <mxGeometry x="140" y="134" width="160" height="18" as="geometry" />
        </mxCell>

        <mxCell id="t1_prompt_pill" value="&lt;div style=&quot;display:flex;justify-content:space-between;width:100%;padding:0 8px;font-size:11px;&quot;&gt;&lt;b style=&quot;color:#0F172A;&quot;&gt;Your prompt&lt;/b&gt;&lt;span style=&quot;color:#64748B;&quot;&gt;the current request&lt;/span&gt;&lt;/div&gt;" style="rounded=1;arcSize=20;whiteSpace=wrap;html=1;fillColor=#FEF9C3;strokeColor=#FDE047;strokeWidth=1.5;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="142" y="156" width="450" height="26" as="geometry" />
        </mxCell>

        <mxCell id="t1_files_pill" value="&lt;b style=&quot;color:#0F172A;font-size:11px;&quot;&gt;Files + chat&lt;/b&gt;" style="rounded=1;arcSize=20;whiteSpace=wrap;html=1;fillColor=#FEF9C3;strokeColor=#FDE047;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="142" y="188" width="218" height="26" as="geometry" />
        </mxCell>

        <mxCell id="t1_tools_pill" value="&lt;b style=&quot;color:#581C87;font-size:11px;&quot;&gt;Tool results&lt;/b&gt;" style="rounded=1;arcSize=20;whiteSpace=wrap;html=1;fillColor=#F3E8FF;strokeColor=#D8B4FE;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="374" y="188" width="218" height="26" as="geometry" />
        </mxCell>

        <mxCell id="t1_more_lbl" value="More can be retrieved when needed" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontSize=10;fontColor=#64748B;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="142" y="216" width="300" height="18" as="geometry" />
        </mxCell>

        <!-- Center Model Node -->
        <mxCell id="t1_model_circle" value="&lt;div style=&quot;text-align:center;&quot;&gt;${starburstSvg.replace(/"/g, '&quot;')}&lt;/div&gt;" style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="692" y="152" width="54" height="54" as="geometry" />
        </mxCell>
        <mxCell id="t1_model_lbl" value="the model" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=top;fontStyle=1;fontSize=11;fontColor=${textPrimary};" vertex="1" parent="1">
          <mxGeometry x="679" y="208" width="80" height="20" as="geometry" />
        </mxCell>

        <mxCell id="t1_edge_1" value="uses" style="edgeStyle=none;html=1;strokeColor=#64748B;strokeWidth=1.5;endArrow=block;endFill=1;fontSize=10;fontColor=#475569;fontStyle=1;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="t1_loaded_box" target="t1_model_circle">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Right Solid Box: WHAT THE PROMPT ASKS FOR -->
        <mxCell id="t1_right_box" value="" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="830" y="130" width="684" height="108" as="geometry" />
        </mxCell>
        <mxCell id="t1_right_lbl" value="WHAT THE PROMPT ASKS FOR" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontStyle=1;fontSize=10;fontColor=#1E3A8A;" vertex="1" parent="1">
          <mxGeometry x="844" y="134" width="240" height="18" as="geometry" />
        </mxCell>

        <mxCell id="t1_ask_1" value="&lt;b style=&quot;color:#0F172A;font-size:11px;&quot;&gt;Files and results being used&lt;/b&gt;" style="rounded=1;arcSize=20;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#BFDBFE;strokeWidth=1;align=left;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="844" y="156" width="656" height="25" as="geometry" />
        </mxCell>
        <mxCell id="t1_ask_2" value="&lt;b style=&quot;color:#0F172A;font-size:11px;&quot;&gt;Missing inputs to name&lt;/b&gt;" style="rounded=1;arcSize=20;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#BFDBFE;strokeWidth=1;align=left;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="844" y="186" width="656" height="25" as="geometry" />
        </mxCell>
        <mxCell id="t1_ask_3" value="Ask before filling in the gaps" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontSize=11;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="844" y="214" width="300" height="18" as="geometry" />
        </mxCell>

        <mxCell id="t1_edge_2" value="" style="edgeStyle=none;html=1;strokeColor=#64748B;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1" source="t1_model_circle" target="t1_right_box">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Bottom Prompt Bar 01 -->
        <mxCell id="t1_prompt_bar" value="&lt;div style=&quot;display:flex;align-items:center;justify-content:space-between;width:100%;padding:0 12px;font-family:Inter,sans-serif;&quot;&gt;&lt;div&gt;&lt;span style=&quot;font-size:10px;font-weight:800;color:#64748B;letter-spacing:0.5px;margin-right:12px;&quot;&gt;PROMPT&lt;/span&gt;&lt;span style=&quot;font-size:11.5px;color:${textPrimary};font-weight:500;&quot;&gt;List the files and tool results you are using for this job. If anything is missing, name it and ask before assuming what it says.&lt;/span&gt;&lt;/div&gt;&lt;span style=&quot;background:#0F172A;color:#FFFFFF;border-radius:999px;padding:2px 8px;font-weight:bold;font-size:12px;&quot;&gt;&amp;uarr;&lt;/span&gt;&lt;/div&gt;" style="rounded=1;arcSize=16;whiteSpace=wrap;html=1;fillColor=${promptBarBg};strokeColor=${promptBarBorder};strokeWidth=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="128" y="246" width="1386" height="36" as="geometry" />
        </mxCell>

        <!-- ========================================================================= -->
        <!-- TIER 02: HARNESS                                                          -->
        <!-- ========================================================================= -->
        <mxCell id="t2_card" value="" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="104" y="308" width="1436" height="206" as="geometry" />
        </mxCell>

        <mxCell id="t2_title" value="&lt;div style=&quot;font-family:Inter,sans-serif;&quot;&gt;&lt;span style=&quot;font-size:20px;font-weight:800;color:#9333EA;&quot;&gt;Harness&lt;/span&gt;&amp;nbsp;&amp;nbsp;&amp;nbsp;&lt;span style=&quot;font-size:14px;font-weight:700;color:${textMuted};&quot;&gt;The system that gives the model instructions, tools and control.&lt;/span&gt;&lt;/div&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="128" y="316" width="820" height="30" as="geometry" />
        </mxCell>

        <!-- Dashed Enclave: HARNESS -->
        <mxCell id="t2_harness_box" value="" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#D8B4FE;strokeWidth=1.5;dashed=1;dashPattern=4 4;" vertex="1" parent="1">
          <mxGeometry x="128" y="350" width="1386" height="108" as="geometry" />
        </mxCell>
        <mxCell id="t2_harness_lbl" value="HARNESS: THE SYSTEM AROUND THE MODEL" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontStyle=1;fontSize=10;fontColor=#6B21A8;" vertex="1" parent="1">
          <mxGeometry x="142" y="354" width="320" height="18" as="geometry" />
        </mxCell>

        <mxCell id="t2_claude_pill" value="&lt;div style=&quot;display:flex;justify-content:space-between;width:100%;padding:0 10px;font-size:11.5px;&quot;&gt;&lt;b style=&quot;color:#0F172A;&quot;&gt;CLAUDE.md&lt;/b&gt;&lt;span style=&quot;color:#6B21A8;&quot;&gt;rules&lt;/span&gt;&lt;/div&gt;" style="rounded=1;arcSize=20;whiteSpace=wrap;html=1;fillColor=#F3E8FF;strokeColor=#C084FC;strokeWidth=1.5;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="142" y="378" width="290" height="28" as="geometry" />
        </mxCell>

        <mxCell id="t2_skills_pill" value="&lt;div style=&quot;display:flex;justify-content:space-between;width:100%;padding:0 10px;font-size:11.5px;&quot;&gt;&lt;b style=&quot;color:#0F172A;&quot;&gt;Skills&lt;/b&gt;&lt;span style=&quot;color:#6B21A8;&quot;&gt;repeatable jobs&lt;/span&gt;&lt;/div&gt;" style="rounded=1;arcSize=20;whiteSpace=wrap;html=1;fillColor=#F3E8FF;strokeColor=#C084FC;strokeWidth=1.5;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="142" y="414" width="290" height="28" as="geometry" />
        </mxCell>

        <mxCell id="t2_model_circle" value="&lt;div style=&quot;text-align:center;&quot;&gt;${starburstSvg.replace(/"/g, '&quot;')}&lt;/div&gt;" style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="520" y="374" width="54" height="54" as="geometry" />
        </mxCell>
        <mxCell id="t2_model_lbl" value="the model" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=top;fontStyle=1;fontSize=11;fontColor=${textPrimary};" vertex="1" parent="1">
          <mxGeometry x="480" y="429" width="70" height="20" as="geometry" />
        </mxCell>

        <mxCell id="t2_tools_card" value="&lt;div style=&quot;text-align:left;padding-left:10px;&quot;&gt;&lt;span style=&quot;font-size:10.5px;font-weight:800;color:#6B21A8;&quot;&gt;CONNECTED TOOLS&lt;/span&gt;&lt;br/&gt;&lt;b style=&quot;font-size:12px;color:#0F172A;&quot;&gt;Files · apps · commands&lt;/b&gt;&lt;/div&gt;" style="rounded=1;arcSize=12;whiteSpace=wrap;html=1;fillColor=#F3E8FF;strokeColor=#C084FC;strokeWidth=1.5;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="680" y="372" width="330" height="60" as="geometry" />
        </mxCell>

        <mxCell id="t2_checks_card" value="&lt;div style=&quot;text-align:left;padding-left:10px;&quot;&gt;&lt;span style=&quot;font-size:10.5px;font-weight:800;color:#475569;&quot;&gt;YOUR CHECKS&lt;/span&gt;&lt;br/&gt;&lt;b style=&quot;font-size:12px;color:#0F172A;&quot;&gt;What counts as done&lt;/b&gt;&lt;/div&gt;" style="rounded=1;arcSize=12;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1110" y="372" width="380" height="60" as="geometry" />
        </mxCell>

        <mxCell id="t2_edge_in" value="" style="edgeStyle=none;html=1;strokeColor=#64748B;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1" source="t2_claude_pill" target="t2_model_circle">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="t2_edge_calls" value="calls" style="edgeStyle=none;html=1;strokeColor=#64748B;strokeWidth=1.5;endArrow=block;endFill=1;fontSize=10;fontColor=#475569;fontStyle=1;labelBackgroundColor=#FAF5FF;" edge="1" parent="1" source="t2_model_circle" target="t2_tools_card">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="t2_edge_returns" value="returns results" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#64748B;strokeWidth=1.5;endArrow=block;endFill=1;exitX=0.5;exitY=1;entryX=0.82;entryY=0.88;fontSize=10;fontColor=#475569;fontStyle=1;labelBackgroundColor=#FAF5FF;" edge="1" parent="1" source="t2_tools_card" target="t2_model_circle">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="845" y="448" />
              <mxPoint x="564" y="448" />
            </Array>
          </mxGeometry>
        </mxCell>

        <mxCell id="t2_edge_checks" value="" style="edgeStyle=none;html=1;strokeColor=#64748B;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1" source="t2_tools_card" target="t2_checks_card">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Bottom Prompt Bar 02 -->
        <mxCell id="t2_prompt_bar" value="&lt;div style=&quot;display:flex;align-items:center;justify-content:space-between;width:100%;padding:0 12px;font-family:Inter,sans-serif;&quot;&gt;&lt;div&gt;&lt;span style=&quot;font-size:10px;font-weight:800;color:#64748B;letter-spacing:0.5px;margin-right:12px;&quot;&gt;PROMPT&lt;/span&gt;&lt;span style=&quot;font-size:11.5px;color:${textPrimary};font-weight:500;&quot;&gt;Read CLAUDE.md. Use the connected tools and skills needed for this job. Flag any conflicting rules before you start work.&lt;/span&gt;&lt;/div&gt;&lt;span style=&quot;background:#0F172A;color:#FFFFFF;border-radius:999px;padding:2px 8px;font-weight:bold;font-size:12px;&quot;&gt;&amp;uarr;&lt;/span&gt;&lt;/div&gt;" style="rounded=1;arcSize=16;whiteSpace=wrap;html=1;fillColor=${promptBarBg};strokeColor=${promptBarBorder};strokeWidth=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="128" y="466" width="1386" height="36" as="geometry" />
        </mxCell>

        <!-- ========================================================================= -->
        <!-- TIER 03: LOOP                                                             -->
        <!-- ========================================================================= -->
        <mxCell id="t3_card" value="" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="104" y="528" width="1436" height="206" as="geometry" />
        </mxCell>

        <mxCell id="t3_title" value="&lt;div style=&quot;font-family:Inter,sans-serif;&quot;&gt;&lt;span style=&quot;font-size:20px;font-weight:800;color:#059669;&quot;&gt;Loop&lt;/span&gt;&amp;nbsp;&amp;nbsp;&amp;nbsp;&lt;span style=&quot;font-size:14px;font-weight:700;color:${textMuted};&quot;&gt;A check, fix and recheck cycle, with a clear rule for stopping.&lt;/span&gt;&lt;/div&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="128" y="536" width="800" height="30" as="geometry" />
        </mxCell>

        <mxCell id="t3_attempt_circle" value="&lt;div style=&quot;text-align:center;&quot;&gt;${starburstSvg.replace(/"/g, '&quot;')}&lt;/div&gt;" style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="180" y="580" width="54" height="54" as="geometry" />
        </mxCell>
        <mxCell id="t3_attempt_lbl" value="attempt" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=top;fontStyle=1;fontSize=11;fontColor=${textPrimary};" vertex="1" parent="1">
          <mxGeometry x="167" y="636" width="80" height="20" as="geometry" />
        </mxCell>

        <mxCell id="t3_check_box" value="&lt;div style=&quot;text-align:left;padding-left:10px;&quot;&gt;&lt;span style=&quot;font-size:10px;font-weight:800;color:#065F46;&quot;&gt;CHECK THE OUTPUT&lt;/span&gt;&lt;br/&gt;&lt;span style=&quot;font-size:11.5px;font-weight:700;color:#0F172A;&quot;&gt;&#9745; Every box fits&lt;/span&gt;&lt;br/&gt;&lt;span style=&quot;font-size:11.5px;font-weight:700;color:#0F172A;&quot;&gt;&#9745; Nothing is cut off&lt;/span&gt;&lt;/div&gt;" style="rounded=1;arcSize=12;whiteSpace=wrap;html=1;fillColor=#ECFDF5;strokeColor=#6EE7B7;strokeWidth=1.5;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="290" y="572" width="330" height="66" as="geometry" />
        </mxCell>

        <mxCell id="t3_pass_gate" value="&lt;b style=&quot;font-size:12px;color:#0F172A;&quot;&gt;All checks pass?&lt;/b&gt;" style="rounded=1;arcSize=20;whiteSpace=wrap;html=1;fillColor=#ECFDF5;strokeColor=#34D399;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="710" y="586" width="230" height="38" as="geometry" />
        </mxCell>

        <mxCell id="t3_done_pill" value="&lt;b style=&quot;font-size:13px;color:#FFFFFF;&quot;&gt;Done&lt;/b&gt;" style="rounded=1;arcSize=20;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#0F172A;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1160" y="586" width="240" height="38" as="geometry" />
        </mxCell>

        <mxCell id="t3_tries_gate" value="&lt;b style=&quot;font-size:12px;color:#0F172A;&quot;&gt;3 tries used?&lt;/b&gt;" style="rounded=1;arcSize=20;whiteSpace=wrap;html=1;fillColor=#ECFDF5;strokeColor=#34D399;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="710" y="644" width="230" height="34" as="geometry" />
        </mxCell>

        <mxCell id="t3_stop_pill" value="&lt;b style=&quot;font-size:12px;color:#9A3412;&quot;&gt;Stop + report&lt;/b&gt;" style="rounded=1;arcSize=20;whiteSpace=wrap;html=1;fillColor=#FFF7ED;strokeColor=#FDBA74;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1160" y="644" width="240" height="34" as="geometry" />
        </mxCell>

        <mxCell id="t3_fix_pill" value="&lt;b style=&quot;font-size:12px;color:#065F46;&quot;&gt;Fix the failures&lt;/b&gt;" style="rounded=1;arcSize=20;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#6EE7B7;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="340" y="644" width="230" height="34" as="geometry" />
        </mxCell>

        <mxCell id="t3_e1" value="" style="edgeStyle=none;html=1;strokeColor=#64748B;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1" source="t3_attempt_circle" target="t3_check_box">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="t3_e2" value="" style="edgeStyle=none;html=1;strokeColor=#64748B;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1" source="t3_check_box" target="t3_pass_gate">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="t3_e_yes1" value="yes" style="edgeStyle=none;html=1;strokeColor=#10B981;strokeWidth=2;endArrow=block;endFill=1;fontSize=11;fontStyle=1;fontColor=#059669;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="t3_pass_gate" target="t3_done_pill">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="t3_e_no1" value="no" style="edgeStyle=none;html=1;strokeColor=#64748B;strokeWidth=1.5;endArrow=block;endFill=1;fontSize=10;fontStyle=1;fontColor=#475569;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="t3_pass_gate" target="t3_tries_gate">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="t3_e_yes2" value="yes" style="edgeStyle=none;html=1;strokeColor=#EA580C;strokeWidth=2;endArrow=block;endFill=1;fontSize=11;fontStyle=1;fontColor=#EA580C;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="t3_tries_gate" target="t3_stop_pill">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="t3_e_no2" value="no" style="edgeStyle=none;html=1;strokeColor=#10B981;strokeWidth=2;endArrow=block;endFill=1;fontSize=11;fontStyle=1;fontColor=#059669;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="t3_tries_gate" target="t3_fix_pill">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="t3_e_loop" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#10B981;strokeWidth=2;endArrow=block;endFill=1;exitX=0;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="t3_fix_pill" target="t3_attempt_circle">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="145" y="661" />
              <mxPoint x="145" y="607" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- Bottom Prompt Bar 03 -->
        <mxCell id="t3_prompt_bar" value="&lt;div style=&quot;display:flex;align-items:center;justify-content:space-between;width:100%;padding:0 12px;font-family:Inter,sans-serif;&quot;&gt;&lt;div&gt;&lt;span style=&quot;font-size:10px;font-weight:800;color:#64748B;letter-spacing:0.5px;margin-right:12px;&quot;&gt;PROMPT&lt;/span&gt;&lt;span style=&quot;font-size:11.5px;color:${textPrimary};font-weight:500;&quot;&gt;Check that every box fits and nothing is cut off. Fix failures and recheck. Stop after 3 tries and report what still fails.&lt;/span&gt;&lt;/div&gt;&lt;span style=&quot;background:#0F172A;color:#FFFFFF;border-radius:999px;padding:2px 8px;font-weight:bold;font-size:12px;&quot;&gt;&amp;uarr;&lt;/span&gt;&lt;/div&gt;" style="rounded=1;arcSize=16;whiteSpace=wrap;html=1;fillColor=${promptBarBg};strokeColor=${promptBarBorder};strokeWidth=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="128" y="686" width="1386" height="36" as="geometry" />
        </mxCell>

        <!-- ========================================================================= -->
        <!-- TIER 04: GRAPH                                                            -->
        <!-- ========================================================================= -->
        <mxCell id="t4_card" value="" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="104" y="748" width="1436" height="206" as="geometry" />
        </mxCell>

        <mxCell id="t4_title" value="&lt;div style=&quot;font-family:Inter,sans-serif;&quot;&gt;&lt;span style=&quot;font-size:20px;font-weight:800;color:#2563EB;&quot;&gt;Graph&lt;/span&gt;&amp;nbsp;&amp;nbsp;&amp;nbsp;&lt;span style=&quot;font-size:14px;font-weight:700;color:${textMuted};&quot;&gt;A map of files and the relationships between them.&lt;/span&gt;&lt;/div&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="128" y="756" width="800" height="30" as="geometry" />
        </mxCell>

        <!-- Left Dashed Box: EXAMPLE FOLDER -->
        <mxCell id="t4_folder_box" value="" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#93C5FD;strokeWidth=1.5;dashed=1;dashPattern=4 4;" vertex="1" parent="1">
          <mxGeometry x="128" y="790" width="710" height="108" as="geometry" />
        </mxCell>
        <mxCell id="t4_folder_lbl" value="EXAMPLE FOLDER" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontStyle=1;fontSize=10;fontColor=#1E3A8A;" vertex="1" parent="1">
          <mxGeometry x="142" y="794" width="150" height="18" as="geometry" />
        </mxCell>
        <mxCell id="t4_folder_sub" value="Lines = file relationships" style="text;html=1;strokeColor=none;fillColor=none;align=right;verticalAlign=middle;fontStyle=1;fontSize=10;fontColor=#64748B;" vertex="1" parent="1">
          <mxGeometry x="380" y="794" width="220" height="18" as="geometry" />
        </mxCell>

        <mxCell id="t4_f_brief" value="&lt;b style=&quot;font-size:11.5px;color:#0F172A;&quot;&gt;brief.md&lt;/b&gt;" style="rounded=1;arcSize=20;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#60A5FA;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="150" y="818" width="180" height="30" as="geometry" />
        </mxCell>
        <mxCell id="t4_f_audience" value="&lt;b style=&quot;font-size:11.5px;color:#0F172A;&quot;&gt;audience.md&lt;/b&gt;" style="rounded=1;arcSize=20;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#60A5FA;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="410" y="814" width="180" height="30" as="geometry" />
        </mxCell>
        <mxCell id="t4_f_draft" value="&lt;b style=&quot;font-size:11.5px;color:#0F172A;&quot;&gt;draft.md&lt;/b&gt;" style="rounded=1;arcSize=20;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#60A5FA;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="138" y="860" width="180" height="30" as="geometry" />
        </mxCell>
        <mxCell id="t4_f_offer" value="&lt;b style=&quot;font-size:11.5px;color:#0F172A;&quot;&gt;offer.md&lt;/b&gt;" style="rounded=1;arcSize=20;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#60A5FA;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="380" y="860" width="180" height="30" as="geometry" />
        </mxCell>

        <mxCell id="t4_f_notes" value="&lt;b style=&quot;font-size:11.5px;color:#334155;&quot;&gt;notes.md&lt;/b&gt;" style="rounded=1;arcSize=20;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.5;dashed=1;dashPattern=3 3;" vertex="1" parent="1">
          <mxGeometry x="640" y="838" width="170" height="30" as="geometry" />
        </mxCell>
        <mxCell id="t4_f_unlinked_lbl" value="unlinked" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=top;fontSize=10;fontColor=#64748B;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="685" y="870" width="80" height="18" as="geometry" />
        </mxCell>

        <!-- Graph Connectors -->
        <mxCell id="t4_ge1" value="" style="edgeStyle=none;html=1;strokeColor=#94A3B8;strokeWidth=1.5;endArrow=none;" edge="1" parent="1" source="t4_f_brief" target="t4_f_audience">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="t4_ge2" value="" style="edgeStyle=none;html=1;strokeColor=#94A3B8;strokeWidth=1.5;endArrow=none;" edge="1" parent="1" source="t4_f_brief" target="t4_f_draft">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="t4_ge3" value="" style="edgeStyle=none;html=1;strokeColor=#94A3B8;strokeWidth=1.5;endArrow=none;" edge="1" parent="1" source="t4_f_brief" target="t4_f_offer">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="t4_ge4" value="" style="edgeStyle=none;html=1;strokeColor=#94A3B8;strokeWidth=1.5;endArrow=none;" edge="1" parent="1" source="t4_f_audience" target="t4_f_offer">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="t4_ge5" value="" style="edgeStyle=none;html=1;strokeColor=#94A3B8;strokeWidth=1.5;endArrow=none;" edge="1" parent="1" source="t4_f_draft" target="t4_f_offer">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Right Index Card: MAP.md · dated -->
        <mxCell id="t4_map_card" value="&lt;div style=&quot;font-family:Inter,sans-serif;width:100%;text-align:left;&quot;&gt;&lt;div style=&quot;background:#DBEAFE;padding:4px 12px;font-weight:800;font-size:12px;color:#1E3A8A;border-bottom:1px solid #93C5FD;&quot;&gt;MAP.md · dated&lt;/div&gt;&lt;div style=&quot;padding:6px 12px;font-size:11px;line-height:1.6;&quot;&gt;&lt;div style=&quot;display:flex;justify-content:space-between;&quot;&gt;&lt;b style=&quot;color:#0F172A;&quot;&gt;Topics&lt;/b&gt;&lt;span style=&quot;color:#64748B;&quot;&gt;files grouped&lt;/span&gt;&lt;/div&gt;&lt;div style=&quot;display:flex;justify-content:space-between;&quot;&gt;&lt;b style=&quot;color:#0F172A;&quot;&gt;Connections&lt;/b&gt;&lt;span style=&quot;color:#64748B;&quot;&gt;found / guessed&lt;/span&gt;&lt;/div&gt;&lt;div style=&quot;display:flex;justify-content:space-between;&quot;&gt;&lt;b style=&quot;color:#0F172A;&quot;&gt;Unlinked files&lt;/b&gt;&lt;span style=&quot;color:#64748B;&quot;&gt;still searchable&lt;/span&gt;&lt;/div&gt;&lt;div style=&quot;display:flex;justify-content:space-between;&quot;&gt;&lt;b style=&quot;color:#0F172A;&quot;&gt;Read status&lt;/b&gt;&lt;span style=&quot;color:#64748B;&quot;&gt;read / unread&lt;/span&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#60A5FA;strokeWidth=1.5;align=left;verticalAlign=top;overflow=fill;" vertex="1" parent="1">
          <mxGeometry x="930" y="790" width="584" height="108" as="geometry" />
        </mxCell>

        <mxCell id="t4_edge_maps" value="maps" style="edgeStyle=none;html=1;strokeColor=#64748B;strokeWidth=1.5;endArrow=block;endFill=1;fontSize=10;fontStyle=1;fontColor=#475569;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="t4_folder_box" target="t4_map_card">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Bottom Prompt Bar 04 -->
        <mxCell id="t4_prompt_bar" value="&lt;div style=&quot;display:flex;align-items:center;justify-content:space-between;width:100%;padding:0 12px;font-family:Inter,sans-serif;&quot;&gt;&lt;div&gt;&lt;span style=&quot;font-size:10px;font-weight:800;color:#64748B;letter-spacing:0.5px;margin-right:12px;&quot;&gt;PROMPT&lt;/span&gt;&lt;span style=&quot;font-size:11.5px;color:${textPrimary};font-weight:500;&quot;&gt;Read this folder. Write MAP.md: topics, unlinked files, connections, date and files read. Mark links FOUND or GUESSED. List unread files.&lt;/span&gt;&lt;/div&gt;&lt;span style=&quot;background:#0F172A;color:#FFFFFF;border-radius:999px;padding:2px 8px;font-weight:bold;font-size:12px;&quot;&gt;&amp;uarr;&lt;/span&gt;&lt;/div&gt;" style="rounded=1;arcSize=16;whiteSpace=wrap;html=1;fillColor=${promptBarBg};strokeColor=${promptBarBorder};strokeWidth=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="128" y="906" width="1386" height="36" as="geometry" />
        </mxCell>

        <!-- ==================== FOOTER PILL ==================== -->
        <mxCell id="footer_pill" value="&lt;div style=&quot;display:flex;align-items:center;justify-content:center;gap:12px;font-family:Inter,sans-serif;&quot;&gt;&lt;span style=&quot;font-size:13px;font-weight:800;color:#FFFFFF;letter-spacing:0.5px;&quot;&gt;CHARLIE HILLS&lt;/span&gt;&lt;span style=&quot;color:#EA580C;font-size:14px;&quot;&gt;&#9679;&lt;/span&gt;&lt;span style=&quot;font-size:13px;font-weight:500;color:#CBD5E1;&quot;&gt;charliehills.substack.com&lt;/span&gt;&lt;/div&gt;" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#1E293B;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="540" y="968" width="520" height="44" as="geometry" />
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
