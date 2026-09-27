/**
 * Canonical Template #52 — Context + Harness + Loop + Graph (1:1 High-Precision Vector Clone of 52.png)
 *
 * Engineered on the exact 1075x1290 Portrait Poster Coordinate System matching `public/templates/52.png` (853x1024, aspect ratio 0.8333):
 * - Warm editorial cream canvas (`#FCFBF7`) with 42px bold display header (`Context + Harness + Loop +` in `#1E293B`, `Graph` in `#D96B38`) & peach 12-spoke starburst watermark
 * - Continuous vertical timeline spine (`x=44`) with 01, 02, 03, 04 rounded badges
 * - 4 full-width horizontal cards (`x=80, width=975, height=272` at `y=120, 410, 700, 990`) with 100% verbatim text & geometry parity with `52.png`.
 */
export function buildTemplate52ContextHarnessLoopGraphXml(customTitle?: string): string {
  const modelStarSvg = `<svg width="30" height="30" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke="#C2410C" stroke-width="2.4" stroke-linecap="round"><line x1="16" y1="3" x2="16" y2="29"/><line x1="3" y1="16" x2="29" y2="16"/><line x1="6.8" y1="6.8" x2="25.2" y2="25.2"/><line x1="25.2" y1="6.8" x2="6.8" y2="25.2"/><line x1="16" y1="3" x2="16" y2="29" transform="rotate(30 16 16)"/><line x1="16" y1="3" x2="16" y2="29" transform="rotate(60 16 16)"/></g><circle cx="16" cy="16" r="3.5" fill="#FCFBF7"/></svg>`;

  const attemptStarSvg = `<svg width="30" height="30" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke="#C2410C" stroke-width="2.4" stroke-linecap="round"><line x1="16" y1="3" x2="16" y2="29"/><line x1="3" y1="16" x2="29" y2="16"/><line x1="6.8" y1="6.8" x2="25.2" y2="25.2"/><line x1="25.2" y1="6.8" x2="6.8" y2="25.2"/><line x1="16" y1="3" x2="16" y2="29" transform="rotate(30 16 16)"/><line x1="16" y1="3" x2="16" y2="29" transform="rotate(60 16 16)"/></g><circle cx="16" cy="16" r="3.5" fill="#FCFBF7"/></svg>`;

  const watermarkStarSvg = `<svg width="105" height="105" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke="#FDBA74" stroke-opacity="0.38" stroke-width="6.5" stroke-linecap="round"><line x1="50" y1="6" x2="50" y2="94"/><line x1="6" y1="50" x2="94" y2="50"/><line x1="18.9" y1="18.9" x2="81.1" y2="81.1"/><line x1="81.1" y1="18.9" x2="18.9" y2="81.1"/><line x1="50" y1="6" x2="50" y2="94" transform="rotate(30 50 50)"/><line x1="50" y1="6" x2="50" y2="94" transform="rotate(60 50 50)"/></g><circle cx="50" cy="50" r="10" fill="#FCFBF7"/></svg>`;

  const upArrowSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>`;

  const checkboxSvg = `<span style="display:inline-block;width:13px;height:13px;border:1.8px solid #047857;border-radius:3px;vertical-align:-2px;margin-right:7px;background:#FFFFFF;"></span>`;

  const headerHtml = (customTitle && customTitle.trim())
    ? `<font color="#1E293B">${customTitle.trim()}</font>`
    : `<font color="#1E293B">Context </font><font color="#94A3B8">+</font><font color="#1E293B"> Harness </font><font color="#94A3B8">+</font><font color="#1E293B"> Loop </font><font color="#94A3B8">+</font><font color="#D96B38"> Graph</font>`;

  return `<mxfile host="embed.diagrams.net" modified="2026-04-17T12:00:00.000Z" agent="PromptCanvas Canonical Engine" version="24.0.0">
  <diagram id="canonical_52_context_harness_loop_graph" name="Context + Harness + Loop + Graph">
    <mxGraphModel dx="1075" dy="1290" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="0" pageScale="1" pageWidth="1075" pageHeight="1290" background="#FCFBF7" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- ==================== BACKGROUND POSTER CANVAS (1075 x 1290 = 0.8333 aspect ratio matching 853x1024) ==================== -->
        <mxCell id="poster_bg" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FCFBF7;strokeColor=#E2DDD3;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="0" y="0" width="1075" height="1290" as="geometry" />
        </mxCell>

        <!-- ==================== TOP HEADER & WATERMARK ==================== -->
        <mxCell id="header_title" value="${headerHtml.replace(/"/g, '&quot;')}" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontSize=42;fontStyle=1;fontColor=#1E293B;" vertex="1" parent="1">
          <mxGeometry x="25" y="16" width="920" height="54" as="geometry" />
        </mxCell>

        <mxCell id="header_subtitle" value="Four parts of your AI setup. &lt;b style=&quot;color:#1E293B;&quot;&gt;What each one does, with a prompt to try.&lt;/b&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontSize=18;fontColor=#57534E;" vertex="1" parent="1">
          <mxGeometry x="25" y="72" width="900" height="28" as="geometry" />
        </mxCell>

        <mxCell id="header_watermark" value="${watermarkStarSvg.replace(/"/g, '&quot;')}" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="945" y="8" width="110" height="105" as="geometry" />
        </mxCell>

        <!-- ==================== LEFT TIMELINE SPINE (01 -> 04) ==================== -->
        <mxCell id="timeline_spine" value="" style="endArrow=none;html=1;strokeColor=#D6D1C4;strokeWidth=2.5;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="44" y="150" as="sourcePoint" />
            <mxPoint x="44" y="1245" as="targetPoint" />
          </mxGeometry>
        </mxCell>

        <mxCell id="badge_01" value="01" style="rounded=1;arcSize=26;whiteSpace=wrap;html=1;fillColor=#FFFBEB;strokeColor=#D97706;strokeWidth=1.6;fontColor=#B45309;fontSize=15;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="25" y="135" width="38" height="34" as="geometry" />
        </mxCell>
        <mxCell id="badge_02" value="02" style="rounded=1;arcSize=26;whiteSpace=wrap;html=1;fillColor=#F5F3FF;strokeColor=#9333EA;strokeWidth=1.6;fontColor=#7E22CE;fontSize=15;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="25" y="425" width="38" height="34" as="geometry" />
        </mxCell>
        <mxCell id="badge_03" value="03" style="rounded=1;arcSize=26;whiteSpace=wrap;html=1;fillColor=#ECFDF5;strokeColor=#059669;strokeWidth=1.6;fontColor=#047857;fontSize=15;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="25" y="715" width="38" height="34" as="geometry" />
        </mxCell>
        <mxCell id="badge_04" value="04" style="rounded=1;arcSize=26;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=1.6;fontColor=#1D4ED8;fontSize=15;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="25" y="1005" width="38" height="34" as="geometry" />
        </mxCell>

        <!-- ========================================================================= -->
        <!-- SECTION 01: CONTEXT (y=120, h=272)                                        -->
        <!-- ========================================================================= -->
        <mxCell id="card_01_bg" value="" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#E2DDD3;strokeWidth=1.6;" vertex="1" parent="1">
          <mxGeometry x="80" y="120" width="975" height="272" as="geometry" />
        </mxCell>

        <mxCell id="card_01_title" value="Context" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontSize=24;fontStyle=1;fontColor=#1E293B;" vertex="1" parent="1">
          <mxGeometry x="100" y="132" width="110" height="30" as="geometry" />
        </mxCell>
        <mxCell id="card_01_desc" value="The information loaded for the model&amp;#39;s current answer." style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontSize=17;fontStyle=1;fontColor=#57534E;" vertex="1" parent="1">
          <mxGeometry x="206" y="133" width="700" height="28" as="geometry" />
        </mxCell>

        <!-- Left Dashed Box: LOADED CONTEXT -->
        <mxCell id="c01_loaded_box" value="" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FEF9E7;strokeColor=#D97706;strokeWidth=1.6;dashed=1;dashPattern=5 4;" vertex="1" parent="1">
          <mxGeometry x="100" y="170" width="360" height="140" as="geometry" />
        </mxCell>
        <mxCell id="c01_loaded_hdr" value="LOADED CONTEXT" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontSize=11.5;fontStyle=1;fontColor=#78716C;" vertex="1" parent="1">
          <mxGeometry x="114" y="175" width="220" height="20" as="geometry" />
        </mxCell>

        <!-- Pill 1: Your prompt | the current request -->
        <mxCell id="c01_pill_prompt" value="" style="rounded=1;arcSize=22;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#E7E2D8;strokeWidth=1.4;" vertex="1" parent="1">
          <mxGeometry x="114" y="200" width="332" height="32" as="geometry" />
        </mxCell>
        <mxCell id="c01_pill_prompt_l" value="Your prompt" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontSize=15;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="126" y="200" width="150" height="32" as="geometry" />
        </mxCell>
        <mxCell id="c01_pill_prompt_r" value="the current request" style="text;html=1;strokeColor=none;fillColor=none;align=right;verticalAlign=middle;fontSize=13.5;fontColor=#78716C;" vertex="1" parent="1">
          <mxGeometry x="266" y="200" width="168" height="32" as="geometry" />
        </mxCell>

        <!-- Pill 2a: Files + chat -->
        <mxCell id="c01_pill_files" value="Files + chat" style="rounded=1;arcSize=22;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#E7E2D8;strokeWidth=1.4;align=left;spacingLeft=12;fontSize=15;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="114" y="240" width="160" height="32" as="geometry" />
        </mxCell>

        <!-- Pill 2b: Tool results -->
        <mxCell id="c01_pill_tools" value="Tool results" style="rounded=1;arcSize=22;whiteSpace=wrap;html=1;fillColor=#F5F3FF;strokeColor=#C084FC;strokeWidth=1.5;align=left;spacingLeft=12;fontSize=15;fontStyle=1;fontColor=#6B21A8;" vertex="1" parent="1">
          <mxGeometry x="284" y="240" width="162" height="32" as="geometry" />
        </mxCell>

        <mxCell id="c01_loaded_note" value="More can be retrieved when needed" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontSize=13.5;fontColor=#57534E;" vertex="1" parent="1">
          <mxGeometry x="114" y="278" width="332" height="24" as="geometry" />
        </mxCell>

        <!-- Center Model Node -->
        <mxCell id="c01_model_circle" value="${modelStarSvg.replace(/"/g, '&quot;')}" style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#FCFBF7;strokeColor=#E7E2D8;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="515" y="206" width="54" height="54" as="geometry" />
        </mxCell>
        <mxCell id="c01_model_label" value="the model" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=top;fontSize=15;fontStyle=1;fontColor=#1E293B;" vertex="1" parent="1">
          <mxGeometry x="487" y="264" width="110" height="24" as="geometry" />
        </mxCell>

        <!-- Edges around C01 Model -->
        <mxCell id="c01_edge_uses_lbl" value="uses" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=bottom;fontSize=13;fontColor=#57534E;" vertex="1" parent="1">
          <mxGeometry x="460" y="210" width="55" height="20" as="geometry" />
        </mxCell>
        <mxCell id="c01_edge_1" value="" style="endArrow=block;endFill=1;html=1;strokeColor=#57534E;strokeWidth=1.6;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="460" y="233" as="sourcePoint" />
            <mxPoint x="513" y="233" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="c01_edge_2" value="" style="endArrow=block;endFill=1;html=1;strokeColor=#57534E;strokeWidth=1.6;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="569" y="233" as="sourcePoint" />
            <mxPoint x="622" y="233" as="targetPoint" />
          </mxGeometry>
        </mxCell>

        <!-- Right Blue Box: WHAT THE PROMPT ASKS FOR -->
        <mxCell id="c01_asks_box" value="" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#F0F7FF;strokeColor=#93C5FD;strokeWidth=1.6;" vertex="1" parent="1">
          <mxGeometry x="624" y="170" width="411" height="140" as="geometry" />
        </mxCell>
        <mxCell id="c01_asks_hdr" value="WHAT THE PROMPT ASKS FOR" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontSize=11.5;fontStyle=1;fontColor=#64748B;" vertex="1" parent="1">
          <mxGeometry x="638" y="175" width="300" height="20" as="geometry" />
        </mxCell>
        <mxCell id="c01_ask_1" value="Files and results being used" style="rounded=1;arcSize=24;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DBEAFE;strokeWidth=1.3;align=left;spacingLeft=12;fontSize=14.5;fontStyle=1;fontColor=#1E293B;" vertex="1" parent="1">
          <mxGeometry x="638" y="199" width="383" height="28" as="geometry" />
        </mxCell>
        <mxCell id="c01_ask_2" value="Missing inputs to name" style="rounded=1;arcSize=24;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DBEAFE;strokeWidth=1.3;align=left;spacingLeft=12;fontSize=14.5;fontStyle=1;fontColor=#1E293B;" vertex="1" parent="1">
          <mxGeometry x="638" y="233" width="383" height="28" as="geometry" />
        </mxCell>
        <mxCell id="c01_ask_3" value="Ask before filling in the gaps" style="rounded=1;arcSize=24;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DBEAFE;strokeWidth=1.3;align=left;spacingLeft=12;fontSize=14.5;fontStyle=1;fontColor=#1E293B;" vertex="1" parent="1">
          <mxGeometry x="638" y="267" width="383" height="28" as="geometry" />
        </mxCell>

        <!-- Section 01 Prompt Bar -->
        <mxCell id="c01_prompt_bar" value="" style="rounded=1;arcSize=18;whiteSpace=wrap;html=1;fillColor=#F8F6F0;strokeColor=#E2DDD3;strokeWidth=1.4;" vertex="1" parent="1">
          <mxGeometry x="100" y="324" width="935" height="52" as="geometry" />
        </mxCell>
        <mxCell id="c01_prompt_tag" value="PROMPT" style="rounded=1;arcSize=24;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D6D1C4;strokeWidth=1.2;fontColor=#64748B;fontSize=11.5;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="112" y="336" width="70" height="28" as="geometry" />
        </mxCell>
        <mxCell id="c01_prompt_text" value="List the files and tool results you are using for this job. If anything is missing, name it and ask before assuming what it says." style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;fontSize=15;fontColor=#475569;" vertex="1" parent="1">
          <mxGeometry x="194" y="328" width="785" height="44" as="geometry" />
        </mxCell>
        <mxCell id="c01_prompt_btn" value="${upArrowSvg.replace(/"/g, '&quot;')}" style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#1E293B;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="990" y="333" width="34" height="34" as="geometry" />
        </mxCell>

        <!-- ========================================================================= -->
        <!-- SECTION 02: HARNESS (y=410, h=272)                                        -->
        <!-- ========================================================================= -->
        <mxCell id="card_02_bg" value="" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#E2DDD3;strokeWidth=1.6;" vertex="1" parent="1">
          <mxGeometry x="80" y="410" width="975" height="272" as="geometry" />
        </mxCell>

        <mxCell id="card_02_title" value="Harness" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontSize=24;fontStyle=1;fontColor=#7E22CE;" vertex="1" parent="1">
          <mxGeometry x="100" y="422" width="110" height="30" as="geometry" />
        </mxCell>
        <mxCell id="card_02_desc" value="The system that gives the model instructions, tools and control." style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontSize=17;fontStyle=1;fontColor=#57534E;" vertex="1" parent="1">
          <mxGeometry x="208" y="423" width="700" height="28" as="geometry" />
        </mxCell>

        <!-- Dashed Purple Container: Encloses ONLY CLAUDE.md/Skills, the model, and CONNECTED TOOLS -->
        <mxCell id="c02_harness_box" value="" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#A855F7;strokeWidth=1.6;dashed=1;dashPattern=5 4;" vertex="1" parent="1">
          <mxGeometry x="100" y="460" width="680" height="140" as="geometry" />
        </mxCell>
        <mxCell id="c02_harness_hdr" value="HARNESS: THE SYSTEM AROUND THE MODEL" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontSize=11.5;fontStyle=1;fontColor=#64748B;" vertex="1" parent="1">
          <mxGeometry x="114" y="465" width="380" height="20" as="geometry" />
        </mxCell>

        <!-- Pill 1: CLAUDE.md | rules -->
        <mxCell id="c02_pill_claude" value="" style="rounded=1;arcSize=22;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#E9D5FF;strokeWidth=1.4;" vertex="1" parent="1">
          <mxGeometry x="114" y="492" width="220" height="34" as="geometry" />
        </mxCell>
        <mxCell id="c02_pill_claude_l" value="CLAUDE.md" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontSize=15;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="126" y="492" width="120" height="34" as="geometry" />
        </mxCell>
        <mxCell id="c02_pill_claude_r" value="rules" style="text;html=1;strokeColor=none;fillColor=none;align=right;verticalAlign=middle;fontSize=13.5;fontColor=#78716C;" vertex="1" parent="1">
          <mxGeometry x="246" y="492" width="76" height="34" as="geometry" />
        </mxCell>

        <!-- Pill 2: Skills | repeatable jobs -->
        <mxCell id="c02_pill_skills" value="" style="rounded=1;arcSize=22;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#E9D5FF;strokeWidth=1.4;" vertex="1" parent="1">
          <mxGeometry x="114" y="536" width="220" height="34" as="geometry" />
        </mxCell>
        <mxCell id="c02_pill_skills_l" value="Skills" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontSize=15;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="126" y="536" width="80" height="34" as="geometry" />
        </mxCell>
        <mxCell id="c02_pill_skills_r" value="repeatable jobs" style="text;html=1;strokeColor=none;fillColor=none;align=right;verticalAlign=middle;fontSize=13.5;fontColor=#78716C;" vertex="1" parent="1">
          <mxGeometry x="196" y="536" width="126" height="34" as="geometry" />
        </mxCell>

        <!-- Arrow from Pills to Model -->
        <mxCell id="c02_edge_in" value="" style="endArrow=block;endFill=1;html=1;strokeColor=#57534E;strokeWidth=1.6;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="334" y="520" as="sourcePoint" />
            <mxPoint x="378" y="520" as="targetPoint" />
          </mxGeometry>
        </mxCell>

        <!-- Center Model in Harness -->
        <mxCell id="c02_model_circle" value="${modelStarSvg.replace(/"/g, '&quot;')}" style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#FCFBF7;strokeColor=#E7E2D8;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="381" y="492" width="54" height="54" as="geometry" />
        </mxCell>
        <mxCell id="c02_model_label" value="the model" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=top;fontSize=15;fontStyle=1;fontColor=#1E293B;" vertex="1" parent="1">
          <mxGeometry x="353" y="548" width="110" height="22" as="geometry" />
        </mxCell>

        <!-- calls -> arrow -->
        <mxCell id="c02_calls_lbl" value="calls" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=bottom;fontSize=13;fontColor=#57534E;" vertex="1" parent="1">
          <mxGeometry x="440" y="495" width="74" height="20" as="geometry" />
        </mxCell>
        <mxCell id="c02_edge_calls" value="" style="endArrow=block;endFill=1;html=1;strokeColor=#57534E;strokeWidth=1.6;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="436" y="518" as="sourcePoint" />
            <mxPoint x="516" y="518" as="targetPoint" />
          </mxGeometry>
        </mxCell>

        <!-- CONNECTED TOOLS Box (Inside Purple Dashed Container) -->
        <mxCell id="c02_tools_box" value="" style="rounded=1;arcSize=12;whiteSpace=wrap;html=1;fillColor=#F3E8FF;strokeColor=#C084FC;strokeWidth=1.6;" vertex="1" parent="1">
          <mxGeometry x="518" y="490" width="246" height="68" as="geometry" />
        </mxCell>
        <mxCell id="c02_tools_hdr" value="CONNECTED TOOLS" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontSize=11.5;fontStyle=1;fontColor=#64748B;" vertex="1" parent="1">
          <mxGeometry x="532" y="496" width="200" height="20" as="geometry" />
        </mxCell>
        <mxCell id="c02_tools_val" value="Files &amp;middot; apps &amp;middot; commands" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontSize=15.5;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="532" y="520" width="220" height="26" as="geometry" />
        </mxCell>

        <!-- returns results loop (clean polyline from bottom of CONNECTED TOOLS to below 'the model' label) -->
        <mxCell id="c02_edge_return" value="" style="rounded=1;arcSize=12;html=1;strokeColor=#64748B;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="641" y="558" as="sourcePoint" />
            <mxPoint x="408" y="571" as="targetPoint" />
            <Array as="points">
              <mxPoint x="641" y="588" />
              <mxPoint x="408" y="588" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="c02_return_lbl" value="returns results" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontSize=12.5;fontColor=#57534E;" vertex="1" parent="1">
          <mxGeometry x="475" y="567" width="115" height="18" as="geometry" />
        </mxCell>

        <!-- Arrow from CONNECTED TOOLS out to YOUR CHECKS -->
        <mxCell id="c02_edge_checks" value="" style="endArrow=block;endFill=1;html=1;strokeColor=#57534E;strokeWidth=1.6;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="764" y="524" as="sourcePoint" />
            <mxPoint x="812" y="524" as="targetPoint" />
          </mxGeometry>
        </mxCell>

        <!-- YOUR CHECKS Box (Strictly OUTSIDE the Purple Dashed Container on the right!) -->
        <mxCell id="c02_checks_box" value="" style="rounded=1;arcSize=12;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D6D1C4;strokeWidth=1.6;" vertex="1" parent="1">
          <mxGeometry x="814" y="490" width="221" height="68" as="geometry" />
        </mxCell>
        <mxCell id="c02_checks_hdr" value="YOUR CHECKS" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontSize=11.5;fontStyle=1;fontColor=#64748B;" vertex="1" parent="1">
          <mxGeometry x="828" y="496" width="180" height="20" as="geometry" />
        </mxCell>
        <mxCell id="c02_checks_val" value="What counts as done" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontSize=15.5;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="828" y="520" width="195" height="26" as="geometry" />
        </mxCell>

        <!-- Section 02 Prompt Bar (Verbatim 52.png text) -->
        <mxCell id="c02_prompt_bar" value="" style="rounded=1;arcSize=18;whiteSpace=wrap;html=1;fillColor=#F8F6F0;strokeColor=#E2DDD3;strokeWidth=1.4;" vertex="1" parent="1">
          <mxGeometry x="100" y="614" width="935" height="52" as="geometry" />
        </mxCell>
        <mxCell id="c02_prompt_tag" value="PROMPT" style="rounded=1;arcSize=24;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D6D1C4;strokeWidth=1.2;fontColor=#64748B;fontSize=11.5;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="112" y="626" width="70" height="28" as="geometry" />
        </mxCell>
        <mxCell id="c02_prompt_text" value="Read CLAUDE.md. Use the connected tools and skills needed for this job. Flag any conflicting rules before you start work." style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;fontSize=15;fontColor=#475569;" vertex="1" parent="1">
          <mxGeometry x="194" y="618" width="785" height="44" as="geometry" />
        </mxCell>
        <mxCell id="c02_prompt_btn" value="${upArrowSvg.replace(/"/g, '&quot;')}" style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#1E293B;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="990" y="623" width="34" height="34" as="geometry" />
        </mxCell>

        <!-- ========================================================================= -->
        <!-- SECTION 03: LOOP (y=700, h=272)                                           -->
        <!-- ========================================================================= -->
        <mxCell id="card_03_bg" value="" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#E2DDD3;strokeWidth=1.6;" vertex="1" parent="1">
          <mxGeometry x="80" y="700" width="975" height="272" as="geometry" />
        </mxCell>

        <mxCell id="card_03_title" value="Loop" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontSize=24;fontStyle=1;fontColor=#047857;" vertex="1" parent="1">
          <mxGeometry x="100" y="712" width="80" height="30" as="geometry" />
        </mxCell>
        <mxCell id="card_03_desc" value="A check, fix and recheck cycle, with a clear rule for stopping." style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontSize=17;fontStyle=1;fontColor=#57534E;" vertex="1" parent="1">
          <mxGeometry x="172" y="713" width="700" height="28" as="geometry" />
        </mxCell>

        <!-- attempt Circle -->
        <mxCell id="c03_attempt_circle" value="${attemptStarSvg.replace(/"/g, '&quot;')}" style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#FCFBF7;strokeColor=#E7E2D8;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="124" y="766" width="54" height="54" as="geometry" />
        </mxCell>
        <mxCell id="c03_attempt_label" value="attempt" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=top;fontSize=15;fontStyle=1;fontColor=#1E293B;" vertex="1" parent="1">
          <mxGeometry x="96" y="822" width="110" height="22" as="geometry" />
        </mxCell>

        <mxCell id="c03_edge_1" value="" style="endArrow=block;endFill=1;html=1;strokeColor=#57534E;strokeWidth=1.6;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="178" y="793" as="sourcePoint" />
            <mxPoint x="218" y="793" as="targetPoint" />
          </mxGeometry>
        </mxCell>

        <!-- CHECK THE OUTPUT Box -->
        <mxCell id="c03_check_box" value="" style="rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=#ECFDF5;strokeColor=#6EE7B7;strokeWidth=1.6;" vertex="1" parent="1">
          <mxGeometry x="220" y="750" width="226" height="86" as="geometry" />
        </mxCell>
        <mxCell id="c03_check_hdr" value="CHECK THE OUTPUT" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontSize=11.5;fontStyle=1;fontColor=#64748B;" vertex="1" parent="1">
          <mxGeometry x="234" y="756" width="200" height="20" as="geometry" />
        </mxCell>
        <mxCell id="c03_check_1" value="${checkboxSvg.replace(/"/g, '&quot;')}Every box fits" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontSize=15;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="234" y="780" width="200" height="24" as="geometry" />
        </mxCell>
        <mxCell id="c03_check_2" value="${checkboxSvg.replace(/"/g, '&quot;')}Nothing is cut off" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontSize=15;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="234" y="805" width="200" height="24" as="geometry" />
        </mxCell>

        <mxCell id="c03_edge_2" value="" style="endArrow=block;endFill=1;html=1;strokeColor=#57534E;strokeWidth=1.6;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="446" y="793" as="sourcePoint" />
            <mxPoint x="516" y="793" as="targetPoint" />
          </mxGeometry>
        </mxCell>

        <!-- All checks pass? -->
        <mxCell id="c03_pass_box" value="All checks pass?" style="rounded=1;arcSize=18;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D6D1C4;strokeWidth=1.6;fontSize=15.5;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="518" y="772" width="192" height="42" as="geometry" />
        </mxCell>

        <!-- yes -> Done -->
        <mxCell id="c03_yes_top_lbl" value="yes" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=bottom;fontSize=13.5;fontStyle=1;fontColor=#047857;" vertex="1" parent="1">
          <mxGeometry x="760" y="770" width="50" height="20" as="geometry" />
        </mxCell>
        <mxCell id="c03_edge_done" value="" style="endArrow=block;endFill=1;html=1;strokeColor=#047857;strokeWidth=1.6;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="710" y="793" as="sourcePoint" />
            <mxPoint x="858" y="793" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="c03_done_box" value="Done" style="rounded=1;arcSize=18;whiteSpace=wrap;html=1;fillColor=#1E293B;strokeColor=#0F172A;strokeWidth=1.5;fontSize=16;fontStyle=1;fontColor=#FFFFFF;" vertex="1" parent="1">
          <mxGeometry x="860" y="772" width="175" height="42" as="geometry" />
        </mxCell>

        <!-- no (down) -> 3 tries used? -->
        <mxCell id="c03_no_down_lbl" value="no" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontSize=13.5;fontColor=#64748B;" vertex="1" parent="1">
          <mxGeometry x="622" y="818" width="40" height="20" as="geometry" />
        </mxCell>
        <mxCell id="c03_edge_tries" value="" style="endArrow=block;endFill=1;html=1;strokeColor=#64748B;strokeWidth=1.6;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="614" y="814" as="sourcePoint" />
            <mxPoint x="614" y="844" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="c03_tries_box" value="3 tries used?" style="rounded=1;arcSize=18;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D6D1C4;strokeWidth=1.6;fontSize=15.5;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="518" y="846" width="192" height="42" as="geometry" />
        </mxCell>

        <!-- yes -> Stop + report -->
        <mxCell id="c03_yes_bot_lbl" value="yes" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=bottom;fontSize=13.5;fontStyle=1;fontColor=#D96B38;" vertex="1" parent="1">
          <mxGeometry x="760" y="844" width="50" height="20" as="geometry" />
        </mxCell>
        <mxCell id="c03_edge_stop" value="" style="endArrow=block;endFill=1;html=1;strokeColor=#D96B38;strokeWidth=1.6;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="710" y="867" as="sourcePoint" />
            <mxPoint x="858" y="867" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="c03_stop_box" value="Stop + report" style="rounded=1;arcSize=18;whiteSpace=wrap;html=1;fillColor=#FFF7ED;strokeColor=#FDBA74;strokeWidth=1.6;fontSize=15.5;fontStyle=1;fontColor=#9A3412;" vertex="1" parent="1">
          <mxGeometry x="860" y="846" width="175" height="42" as="geometry" />
        </mxCell>

        <!-- no (left) -> Fix the failures -->
        <mxCell id="c03_no_left_lbl" value="no" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=bottom;fontSize=13.5;fontStyle=1;fontColor=#047857;" vertex="1" parent="1">
          <mxGeometry x="460" y="844" width="45" height="20" as="geometry" />
        </mxCell>
        <mxCell id="c03_edge_fix" value="" style="endArrow=block;endFill=1;html=1;strokeColor=#047857;strokeWidth=1.6;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="518" y="867" as="sourcePoint" />
            <mxPoint x="448" y="867" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="c03_fix_box" value="Fix the failures" style="rounded=1;arcSize=18;whiteSpace=wrap;html=1;fillColor=#ECFDF5;strokeColor=#6EE7B7;strokeWidth=1.6;fontSize=15.5;fontStyle=1;fontColor=#065F46;" vertex="1" parent="1">
          <mxGeometry x="220" y="846" width="226" height="42" as="geometry" />
        </mxCell>

        <!-- Loop back from Fix the failures to below 'attempt' label (matching 52.png) -->
        <mxCell id="c03_edge_loopback" value="" style="rounded=1;arcSize=12;html=1;strokeColor=#047857;strokeWidth=1.6;endArrow=block;endFill=1;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="220" y="867" as="sourcePoint" />
            <mxPoint x="151" y="844" as="targetPoint" />
            <Array as="points">
              <mxPoint x="151" y="867" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- Section 03 Prompt Bar (Verbatim 52.png text) -->
        <mxCell id="c03_prompt_bar" value="" style="rounded=1;arcSize=18;whiteSpace=wrap;html=1;fillColor=#F8F6F0;strokeColor=#E2DDD3;strokeWidth=1.4;" vertex="1" parent="1">
          <mxGeometry x="100" y="904" width="935" height="52" as="geometry" />
        </mxCell>
        <mxCell id="c03_prompt_tag" value="PROMPT" style="rounded=1;arcSize=24;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D6D1C4;strokeWidth=1.2;fontColor=#64748B;fontSize=11.5;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="112" y="916" width="70" height="28" as="geometry" />
        </mxCell>
        <mxCell id="c03_prompt_text" value="Check that every box fits and nothing is cut off. Fix failures and recheck. Stop after 3 tries and report what still fails." style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;fontSize=15;fontColor=#475569;" vertex="1" parent="1">
          <mxGeometry x="194" y="908" width="785" height="44" as="geometry" />
        </mxCell>
        <mxCell id="c03_prompt_btn" value="${upArrowSvg.replace(/"/g, '&quot;')}" style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#1E293B;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="990" y="913" width="34" height="34" as="geometry" />
        </mxCell>

        <!-- ========================================================================= -->
        <!-- SECTION 04: GRAPH (y=990, h=272)                                          -->
        <!-- ========================================================================= -->
        <mxCell id="card_04_bg" value="" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#E2DDD3;strokeWidth=1.6;" vertex="1" parent="1">
          <mxGeometry x="80" y="990" width="975" height="272" as="geometry" />
        </mxCell>

        <mxCell id="card_04_title" value="Graph" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontSize=24;fontStyle=1;fontColor=#2563EB;" vertex="1" parent="1">
          <mxGeometry x="100" y="1002" width="90" height="30" as="geometry" />
        </mxCell>
        <mxCell id="card_04_desc" value="A map of files and the relationships between them." style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontSize=17;fontStyle=1;fontColor=#57534E;" vertex="1" parent="1">
          <mxGeometry x="183" y="1003" width="700" height="28" as="geometry" />
        </mxCell>

        <!-- Left Dashed Box: EXAMPLE FOLDER -->
        <mxCell id="c04_folder_box" value="" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.6;dashed=1;dashPattern=5 4;" vertex="1" parent="1">
          <mxGeometry x="100" y="1040" width="498" height="140" as="geometry" />
        </mxCell>
        <mxCell id="c04_folder_hdr_l" value="EXAMPLE FOLDER" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontSize=11.5;fontStyle=1;fontColor=#64748B;" vertex="1" parent="1">
          <mxGeometry x="114" y="1045" width="180" height="20" as="geometry" />
        </mxCell>
        <mxCell id="c04_folder_hdr_r" value="Lines = file relationships" style="text;html=1;strokeColor=none;fillColor=none;align=right;verticalAlign=middle;fontSize=12.5;fontColor=#64748B;" vertex="1" parent="1">
          <mxGeometry x="390" y="1045" width="194" height="20" as="geometry" />
        </mxCell>

        <!-- Relationship Lines inside EXAMPLE FOLDER -->
        <mxCell id="c04_rel_1" value="" style="endArrow=none;html=1;strokeColor=#93C5FD;strokeWidth=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="240" y="1088" as="sourcePoint" />
            <mxPoint x="292" y="1086" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="c04_rel_2" value="" style="endArrow=none;html=1;strokeColor=#93C5FD;strokeWidth=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="179" y="1106" as="sourcePoint" />
            <mxPoint x="179" y="1132" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="c04_rel_3" value="" style="endArrow=none;html=1;strokeColor=#93C5FD;strokeWidth=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="240" y="1148" as="sourcePoint" />
            <mxPoint x="272" y="1148" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="c04_rel_4" value="" style="endArrow=none;html=1;strokeColor=#93C5FD;strokeWidth=2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="240" y="1096" as="sourcePoint" />
            <mxPoint x="283" y="1132" as="targetPoint" />
          </mxGeometry>
        </mxCell>

        <!-- File Nodes -->
        <mxCell id="c04_f_brief" value="brief.md" style="rounded=1;arcSize=24;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.6;fontSize=14.5;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="118" y="1074" width="122" height="32" as="geometry" />
        </mxCell>
        <mxCell id="c04_f_audience" value="audience.md" style="rounded=1;arcSize=24;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.6;fontSize=14.5;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="292" y="1070" width="132" height="32" as="geometry" />
        </mxCell>
        <mxCell id="c04_f_draft" value="draft.md" style="rounded=1;arcSize=24;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.6;fontSize=14.5;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="118" y="1132" width="122" height="32" as="geometry" />
        </mxCell>
        <mxCell id="c04_f_offer" value="offer.md" style="rounded=1;arcSize=24;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.6;fontSize=14.5;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="272" y="1132" width="122" height="32" as="geometry" />
        </mxCell>

        <!-- Unlinked notes.md -->
        <mxCell id="c04_f_notes" value="notes.md" style="rounded=1;arcSize=24;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.6;dashed=1;dashPattern=4 3;fontSize=14.5;fontStyle=1;fontColor=#57534E;" vertex="1" parent="1">
          <mxGeometry x="448" y="1110" width="136" height="32" as="geometry" />
        </mxCell>
        <mxCell id="c04_f_unlinked" value="unlinked" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=top;fontSize=12.5;fontColor=#78716C;" vertex="1" parent="1">
          <mxGeometry x="448" y="1144" width="136" height="20" as="geometry" />
        </mxCell>

        <!-- maps -> arrow -->
        <mxCell id="c04_maps_lbl" value="maps" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=bottom;fontSize=13;fontColor=#57534E;" vertex="1" parent="1">
          <mxGeometry x="598" y="1086" width="52" height="20" as="geometry" />
        </mxCell>
        <mxCell id="c04_edge_maps" value="" style="endArrow=block;endFill=1;html=1;strokeColor=#57534E;strokeWidth=1.6;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="598" y="1110" as="sourcePoint" />
            <mxPoint x="648" y="1110" as="targetPoint" />
          </mxGeometry>
        </mxCell>

        <!-- Right Blue Box: MAP.md · dated -->
        <mxCell id="c04_map_box" value="" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#F0F7FF;strokeColor=#93C5FD;strokeWidth=1.6;" vertex="1" parent="1">
          <mxGeometry x="650" y="1040" width="385" height="140" as="geometry" />
        </mxCell>
        <mxCell id="c04_map_hdr_l" value="MAP.md &amp;middot; dated" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontSize=11.5;fontStyle=1;fontColor=#64748B;" vertex="1" parent="1">
          <mxGeometry x="666" y="1045" width="200" height="20" as="geometry" />
        </mxCell>

        <!-- Inner White Table Card inside MAP.md -->
        <mxCell id="c04_map_inner" value="" style="rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DBEAFE;strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="662" y="1068" width="361" height="104" as="geometry" />
        </mxCell>

        <!-- Row 1: Topics | files grouped -->
        <mxCell id="c04_r1_l" value="Topics" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontSize=14;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="674" y="1070" width="140" height="24" as="geometry" />
        </mxCell>
        <mxCell id="c04_r1_r" value="files grouped" style="text;html=1;strokeColor=none;fillColor=none;align=right;verticalAlign=middle;fontSize=13.5;fontColor=#78716C;" vertex="1" parent="1">
          <mxGeometry x="823" y="1070" width="188" height="24" as="geometry" />
        </mxCell>
        <mxCell id="c04_div_1" value="" style="endArrow=none;html=1;strokeColor=#F1F5F9;strokeWidth=1.2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="674" y="1095" as="sourcePoint" />
            <mxPoint x="1011" y="1095" as="targetPoint" />
          </mxGeometry>
        </mxCell>

        <!-- Row 2: Connections | found / guessed -->
        <mxCell id="c04_r2_l" value="Connections" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontSize=14;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="674" y="1096" width="140" height="24" as="geometry" />
        </mxCell>
        <mxCell id="c04_r2_r" value="found / guessed" style="text;html=1;strokeColor=none;fillColor=none;align=right;verticalAlign=middle;fontSize=13.5;fontColor=#78716C;" vertex="1" parent="1">
          <mxGeometry x="823" y="1096" width="188" height="24" as="geometry" />
        </mxCell>
        <mxCell id="c04_div_2" value="" style="endArrow=none;html=1;strokeColor=#F1F5F9;strokeWidth=1.2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="674" y="1121" as="sourcePoint" />
            <mxPoint x="1011" y="1121" as="targetPoint" />
          </mxGeometry>
        </mxCell>

        <!-- Row 3: Unlinked files | still searchable -->
        <mxCell id="c04_r3_l" value="Unlinked files" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontSize=14;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="674" y="1122" width="140" height="24" as="geometry" />
        </mxCell>
        <mxCell id="c04_r3_r" value="still searchable" style="text;html=1;strokeColor=none;fillColor=none;align=right;verticalAlign=middle;fontSize=13.5;fontColor=#78716C;" vertex="1" parent="1">
          <mxGeometry x="823" y="1122" width="188" height="24" as="geometry" />
        </mxCell>
        <mxCell id="c04_div_3" value="" style="endArrow=none;html=1;strokeColor=#F1F5F9;strokeWidth=1.2;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="674" y="1147" as="sourcePoint" />
            <mxPoint x="1011" y="1147" as="targetPoint" />
          </mxGeometry>
        </mxCell>

        <!-- Row 4: Read status | read / unread -->
        <mxCell id="c04_r4_l" value="Read status" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontSize=14;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="674" y="1148" width="140" height="24" as="geometry" />
        </mxCell>
        <mxCell id="c04_r4_r" value="read / unread" style="text;html=1;strokeColor=none;fillColor=none;align=right;verticalAlign=middle;fontSize=13.5;fontColor=#78716C;" vertex="1" parent="1">
          <mxGeometry x="823" y="1148" width="188" height="24" as="geometry" />
        </mxCell>

        <!-- Section 04 Prompt Bar (Verbatim 52.png text) -->
        <mxCell id="c04_prompt_bar" value="" style="rounded=1;arcSize=18;whiteSpace=wrap;html=1;fillColor=#F8F6F0;strokeColor=#E2DDD3;strokeWidth=1.4;" vertex="1" parent="1">
          <mxGeometry x="100" y="1194" width="935" height="52" as="geometry" />
        </mxCell>
        <mxCell id="c04_prompt_tag" value="PROMPT" style="rounded=1;arcSize=24;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D6D1C4;strokeWidth=1.2;fontColor=#64748B;fontSize=11.5;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="112" y="1206" width="70" height="28" as="geometry" />
        </mxCell>
        <mxCell id="c04_prompt_text" value="Read this folder. Write MAP.md: topics, unlinked files, connections, date and files read. Mark links FOUND or GUESSED. List unread files." style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;fontSize=15;fontColor=#475569;" vertex="1" parent="1">
          <mxGeometry x="194" y="1198" width="785" height="44" as="geometry" />
        </mxCell>
        <mxCell id="c04_prompt_btn" value="${upArrowSvg.replace(/"/g, '&quot;')}" style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#1E293B;strokeColor=none;" vertex="1" parent="1">
          <mxGeometry x="990" y="1203" width="34" height="34" as="geometry" />
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}

export const generateTemplate52ContextHarnessLoopGraphXml = buildTemplate52ContextHarnessLoopGraphXml;
