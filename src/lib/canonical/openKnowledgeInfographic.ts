/**
 * Master 4-Tier Architectural Infographic Generator for:
 * "Open Knowledge format Infographic" (Open Knowledge + Standards + Pipeline + Graph)
 * Demonstrates how PromptCanvas generates topic-specific 4-Tier Infographics
 * using the 01-04 vertical spine, dashed enclaves, decision loops, and principle/prompt bars.
 */
export function generateOpenKnowledgeInfographicXml(domainFlavor: string = 'general', theme: 'light' | 'dark' = 'light'): string {
  const isDark = theme === 'dark';
  const bgColor = isDark ? '#0F172A' : '#F8FAFC';
  const cardBg = isDark ? '#1E293B' : '#FFFFFF';
  const cardBorder = isDark ? '#334155' : '#CBD5E1';
  const textPrimary = isDark ? '#F8FAFC' : '#0F172A';
  const textMuted = isDark ? '#94A3B8' : '#475569';
  const promptBarBg = isDark ? '#090D16' : '#F1F5F9';
  const promptBarBorder = isDark ? '#1E293B' : '#E2E8F0';

  const escXml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  const starburstSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" width="28" height="28"><polygon points="18,4 30,11 30,25 18,32 6,25 6,11" fill="#EFF6FF" stroke="#2563EB" stroke-width="2.2" stroke-linejoin="round"/><circle cx="18" cy="18" r="5" fill="#2563EB"/><circle cx="18" cy="18" r="2" fill="#FFFFFF"/></svg>`;

  return `<mxfile host="embed.diagrams.net" modified="${new Date().toISOString()}" agent="PromptCanvas Infographic Engine" version="24.0.0" type="device">
  <diagram id="open_knowledge_infographic" name="Open Knowledge Format Infographic">
    <mxGraphModel dx="1020" dy="1040" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1020" pageHeight="1040" background="${bgColor}" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- ========================================================================= -->
        <!-- TOP HEADER                                                                -->
        <!-- ========================================================================= -->
        <mxCell id="header_title" value="&lt;div style=&quot;font-family:Inter,sans-serif;text-align:left;&quot;&gt;&lt;span style=&quot;font-size:30px;font-weight:900;color:${textPrimary};letter-spacing:-0.5px;&quot;&gt;Formats &lt;/span&gt;&lt;span style=&quot;font-size:25px;font-weight:400;color:#94A3B8;&quot;&gt;+&lt;/span&gt;&lt;span style=&quot;font-size:30px;font-weight:900;color:#7C3AED;letter-spacing:-0.5px;&quot;&gt; Schema &lt;/span&gt;&lt;span style=&quot;font-size:25px;font-weight:400;color:#94A3B8;&quot;&gt;+&lt;/span&gt;&lt;span style=&quot;font-size:30px;font-weight:900;color:#059669;letter-spacing:-0.5px;&quot;&gt; Validation &lt;/span&gt;&lt;span style=&quot;font-size:25px;font-weight:400;color:#94A3B8;&quot;&gt;+&lt;/span&gt;&lt;span style=&quot;font-size:30px;font-weight:900;color:#2563EB;letter-spacing:-0.5px;&quot;&gt; Knowledge Graph&lt;/span&gt;&lt;br/&gt;&lt;span style=&quot;font-size:14px;color:${textMuted};font-weight:500;&quot;&gt;Open Knowledge Format Architecture. &lt;/span&gt;&lt;b style=&quot;font-size:14px;color:${textPrimary};&quot;&gt;How open standards structure, validate, and federate knowledge.&lt;/b&gt;&lt;/div&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;" vertex="1" parent="1">
          <mxGeometry x="28" y="16" width="964" height="64" as="geometry" />
        </mxCell>

        <!-- ========================================================================= -->
        <!-- LEFT VERTICAL TIMELINE SPINE (01 -> 04)                                   -->
        <!-- ========================================================================= -->
        <mxCell id="spine_line" value="" style="endArrow=oval;endFill=1;endSize=6;html=1;strokeColor=#CBD5E1;strokeWidth=2;" edge="1" parent="1">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="47" y="114" as="sourcePoint" />
            <mxPoint x="47" y="954" as="targetPoint" />
          </mxGeometry>
        </mxCell>

        <mxCell id="badge_01" value="01" style="rounded=1;arcSize=24;whiteSpace=wrap;html=1;fillColor=#FEF3C7;strokeColor=#F59E0B;strokeWidth=1.5;fontStyle=1;fontSize=12;fontColor=#B45309;" vertex="1" parent="1">
          <mxGeometry x="28" y="100" width="38" height="28" as="geometry" />
        </mxCell>

        <mxCell id="badge_02" value="02" style="rounded=1;arcSize=24;whiteSpace=wrap;html=1;fillColor=#F3E8FF;strokeColor=#A855F7;strokeWidth=1.5;fontStyle=1;fontSize=12;fontColor=#7E22CE;" vertex="1" parent="1">
          <mxGeometry x="28" y="316" width="38" height="28" as="geometry" />
        </mxCell>

        <mxCell id="badge_03" value="03" style="rounded=1;arcSize=24;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#10B981;strokeWidth=1.5;fontStyle=1;fontSize=12;fontColor=#047857;" vertex="1" parent="1">
          <mxGeometry x="28" y="531" width="38" height="28" as="geometry" />
        </mxCell>

        <mxCell id="badge_04" value="04" style="rounded=1;arcSize=24;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#3B82F6;strokeWidth=1.5;fontStyle=1;fontSize=12;fontColor=#1D4ED8;" vertex="1" parent="1">
          <mxGeometry x="28" y="756" width="38" height="28" as="geometry" />
        </mxCell>

        <!-- ========================================================================= -->
        <!-- TIER 01: OPEN SERIALIZATION FORMATS                                       -->
        <!-- ========================================================================= -->
        <mxCell id="t1_card" value="" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="82" y="92" width="910" height="202" as="geometry" />
        </mxCell>

        <mxCell id="t1_title" value="&lt;div style=&quot;font-family:Inter,sans-serif;&quot;&gt;&lt;span style=&quot;font-size:20px;font-weight:800;color:${textPrimary};&quot;&gt;Open Formats&lt;/span&gt;&amp;nbsp;&amp;nbsp;&amp;nbsp;&lt;span style=&quot;font-size:14px;font-weight:700;color:${textMuted};&quot;&gt;The plain-text, human-readable and machine-parseable files that store raw knowledge.&lt;/span&gt;&lt;/div&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="104" y="100" width="866" height="28" as="geometry" />
        </mxCell>

        <!-- Dashed Enclave: OPEN SERIALIZATION -->
        <mxCell id="t1_loaded_box" value="" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFBEB;strokeColor=#F59E0B;strokeWidth=1.5;dashed=1;dashPattern=4 4;" vertex="1" parent="1">
          <mxGeometry x="104" y="134" width="332" height="104" as="geometry" />
        </mxCell>
        <mxCell id="t1_loaded_lbl" value="OPEN SERIALIZATION FORMATS" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontStyle=1;fontSize=10.5;fontColor=#92400E;" vertex="1" parent="1">
          <mxGeometry x="116" y="138" width="240" height="18" as="geometry" />
        </mxCell>

        <mxCell id="t1_prompt_pill" value="&lt;table style=&quot;width:288px;border-collapse:collapse;font-family:Inter,sans-serif;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;text-align:left;&quot;&gt;&lt;b style=&quot;color:#0F172A;font-size:11.5px;&quot;&gt;Markdown (.md) / MDX&lt;/b&gt;&lt;/td&gt;&lt;td style=&quot;text-align:right;color:#78350F;font-size:11px;font-weight:600;&quot;&gt;human docs &amp;amp; specs&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=20;whiteSpace=wrap;html=1;fillColor=#FEF3C7;strokeColor=#FCD34D;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="116" y="159" width="308" height="26" as="geometry" />
        </mxCell>

        <mxCell id="t1_files_pill" value="&lt;b style=&quot;color:#0F172A;font-size:11.5px;&quot;&gt;JSON-LD / RDF (Linked)&lt;/b&gt;" style="rounded=1;arcSize=20;whiteSpace=wrap;html=1;fillColor=#FEF3C7;strokeColor=#FCD34D;strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="116" y="190" width="150" height="26" as="geometry" />
        </mxCell>

        <mxCell id="t1_tools_pill" value="&lt;b style=&quot;color:#6B21A8;font-size:11.5px;&quot;&gt;CSV / Apache Parquet&lt;/b&gt;" style="rounded=1;arcSize=20;whiteSpace=wrap;html=1;fillColor=#F3E8FF;strokeColor=#D8B4FE;strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="274" y="190" width="150" height="26" as="geometry" />
        </mxCell>

        <mxCell id="t1_more_lbl" value="UTF-8 plain text • Git version-controlled • Zero lock-in" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontSize=10.5;fontColor=#475569;" vertex="1" parent="1">
          <mxGeometry x="116" y="218" width="308" height="16" as="geometry" />
        </mxCell>

        <!-- Center Parser Node 01 -->
        <mxCell id="t1_model_circle" value="&lt;div style=&quot;text-align:center;&quot;&gt;${escXml(starburstSvg)}&lt;/div&gt;" style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="512" y="159" width="54" height="54" as="geometry" />
        </mxCell>
        <mxCell id="t1_model_lbl" value="open parser" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=top;fontStyle=1;fontSize=11.5;fontColor=${textPrimary};" vertex="1" parent="1">
          <mxGeometry x="494" y="215" width="90" height="18" as="geometry" />
        </mxCell>

        <mxCell id="t1_edge_1" value="&lt;span style=&apos;padding:0 2px;&apos;&gt;parses&lt;/span&gt;" style="edgeStyle=none;html=1;strokeColor=#64748B;strokeWidth=1.6;endArrow=block;endFill=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;fontSize=10.5;fontColor=#475569;fontStyle=1;labelBackgroundColor=${cardBg};" edge="1" parent="1" source="t1_loaded_box" target="t1_model_circle">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="-5" y="-2" as="offset" />
          </mxGeometry>
        </mxCell>

        <!-- Right Enclave: WHAT OPEN FORMATS GUARANTEE -->
        <mxCell id="t1_right_box" value="" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="616" y="134" width="354" height="104" as="geometry" />
        </mxCell>
        <mxCell id="t1_right_lbl" value="WHAT OPEN FORMATS GUARANTEE" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontStyle=1;fontSize=10.5;fontColor=#1D4ED8;" vertex="1" parent="1">
          <mxGeometry x="628" y="138" width="260" height="18" as="geometry" />
        </mxCell>

        <mxCell id="t1_ask_1" value="&lt;b style=&quot;color:#0F172A;font-size:11.5px;&quot;&gt;100% Vendor Neutrality &amp;amp; Archival Durability&lt;/b&gt;" style="rounded=1;arcSize=20;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#BFDBFE;strokeWidth=1.2;align=left;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="628" y="158" width="330" height="25" as="geometry" />
        </mxCell>
        <mxCell id="t1_ask_2" value="&lt;b style=&quot;color:#0F172A;font-size:11.5px;&quot;&gt;Direct Ingestion by Humans &amp;amp; AI / LLM Agents&lt;/b&gt;" style="rounded=1;arcSize=20;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#BFDBFE;strokeWidth=1.2;align=left;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="628" y="187" width="330" height="25" as="geometry" />
        </mxCell>
        <mxCell id="t1_ask_3" value="Never lock knowledge inside proprietary binary blobs" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontSize=11;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="628" y="215" width="330" height="18" as="geometry" />
        </mxCell>

        <mxCell id="t1_edge_2" value="" style="edgeStyle=none;html=1;strokeColor=#64748B;strokeWidth=1.6;endArrow=block;endFill=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="t1_model_circle" target="t1_right_box">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Bottom Prompt Bar 01 -->
        <mxCell id="t1_prompt_bar" value="&lt;table style=&quot;width:842px;border-collapse:collapse;font-family:Inter,sans-serif;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:62px;text-align:left;vertical-align:middle;&quot;&gt;&lt;span style=&quot;font-size:10.5px;font-weight:800;color:#64748B;letter-spacing:0.5px;&quot;&gt;RULE 01&lt;/span&gt;&lt;/td&gt;&lt;td style=&quot;text-align:left;vertical-align:middle;font-size:11.5px;color:${textPrimary};font-weight:500;&quot;&gt;Store all primary documentation and datasets in open, plain-text formats (Markdown, JSON-LD, Parquet) with UTF-8 encoding.&lt;/td&gt;&lt;td style=&quot;width:30px;text-align:right;vertical-align:middle;&quot;&gt;&lt;span style=&quot;display:inline-block;width:22px;height:22px;line-height:22px;text-align:center;background:#0F172A;color:#FFFFFF;border-radius:999px;font-weight:800;font-size:12px;&quot;&gt;&amp;uarr;&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=16;whiteSpace=wrap;html=1;fillColor=${promptBarBg};strokeColor=${promptBarBorder};strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="104" y="246" width="866" height="36" as="geometry" />
        </mxCell>

        <!-- ========================================================================= -->
        <!-- TIER 02: SCHEMA & LICENSING HARNESS                                       -->
        <!-- ========================================================================= -->
        <mxCell id="t2_card" value="" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="82" y="308" width="910" height="206" as="geometry" />
        </mxCell>

        <mxCell id="t2_title" value="&lt;div style=&quot;font-family:Inter,sans-serif;&quot;&gt;&lt;span style=&quot;font-size:20px;font-weight:800;color:#9333EA;&quot;&gt;Schema Harness&lt;/span&gt;&amp;nbsp;&amp;nbsp;&amp;nbsp;&lt;span style=&quot;font-size:14px;font-weight:700;color:${textMuted};&quot;&gt;The semantic ontologies, URI identifiers, and open licenses wrapped around raw files.&lt;/span&gt;&lt;/div&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="104" y="316" width="866" height="28" as="geometry" />
        </mxCell>

        <!-- Dashed Enclave: HARNESS -->
        <mxCell id="t2_harness_box" value="" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#D8B4FE;strokeWidth=1.5;dashed=1;dashPattern=4 4;" vertex="1" parent="1">
          <mxGeometry x="104" y="350" width="866" height="108" as="geometry" />
        </mxCell>
        <mxCell id="t2_harness_lbl" value="HARNESS: SEMANTIC SCHEMA &amp; LICENSING" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontStyle=1;fontSize=10;fontColor=#6B21A8;" vertex="1" parent="1">
          <mxGeometry x="116" y="354" width="260" height="18" as="geometry" />
        </mxCell>

        <mxCell id="t2_claude_pill" value="&lt;table style=&quot;width:204px;border-collapse:collapse;font-family:Inter,sans-serif;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;text-align:left;&quot;&gt;&lt;b style=&quot;color:#0F172A;font-size:11.5px;&quot;&gt;Schema.org / W3C RDF&lt;/b&gt;&lt;/td&gt;&lt;td style=&quot;text-align:right;color:#6B21A8;font-size:11px;font-weight:600;&quot;&gt;ontologies&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=20;whiteSpace=wrap;html=1;fillColor=#F3E8FF;strokeColor=#C084FC;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="116" y="374" width="224" height="28" as="geometry" />
        </mxCell>

        <mxCell id="t2_skills_pill" value="&lt;table style=&quot;width:204px;border-collapse:collapse;font-family:Inter,sans-serif;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;text-align:left;&quot;&gt;&lt;b style=&quot;color:#0F172A;font-size:11.5px;&quot;&gt;SPDX / CC-BY-4.0 / MIT&lt;/b&gt;&lt;/td&gt;&lt;td style=&quot;text-align:right;color:#6B21A8;font-size:11px;font-weight:600;&quot;&gt;licenses&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=20;whiteSpace=wrap;html=1;fillColor=#F3E8FF;strokeColor=#C084FC;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="116" y="410" width="224" height="28" as="geometry" />
        </mxCell>

        <mxCell id="t2_model_circle" value="&lt;div style=&quot;text-align:center;&quot;&gt;${escXml(starburstSvg)}&lt;/div&gt;" style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="388" y="376" width="56" height="56" as="geometry" />
        </mxCell>
        <mxCell id="t2_model_lbl" value="validator" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=bottom;fontStyle=1;fontSize=11.5;fontColor=${textPrimary};" vertex="1" parent="1">
          <mxGeometry x="371" y="355" width="90" height="18" as="geometry" />
        </mxCell>

        <mxCell id="t2_tools_card" value="&lt;div style=&quot;text-align:left;padding-left:10px;&quot;&gt;&lt;span style=&quot;font-size:10px;font-weight:800;color:#6B21A8;&quot;&gt;METADATA ENRICHMENT&lt;/span&gt;&lt;br/&gt;&lt;b style=&quot;font-size:11.5px;color:#0F172A;&quot;&gt;Persistent URIs · DOI · Provenance&lt;/b&gt;&lt;/div&gt;" style="rounded=1;arcSize=12;whiteSpace=wrap;html=1;fillColor=#F3E8FF;strokeColor=#C084FC;strokeWidth=1.5;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="528" y="376" width="210" height="56" as="geometry" />
        </mxCell>

        <mxCell id="t2_checks_card" value="&lt;div style=&quot;text-align:left;padding-left:10px;&quot;&gt;&lt;span style=&quot;font-size:10px;font-weight:800;color:#475569;&quot;&gt;FAIR DATA COMPLIANCE&lt;/span&gt;&lt;br/&gt;&lt;b style=&quot;font-size:11.5px;color:#0F172A;&quot;&gt;Findable · Reusable · Open&lt;/b&gt;&lt;/div&gt;" style="rounded=1;arcSize=12;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="772" y="376" width="184" height="56" as="geometry" />
        </mxCell>

        <mxCell id="t2_edge_in" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#64748B;strokeWidth=1.6;endArrow=block;endFill=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="t2_claude_pill" target="t2_model_circle">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="364" y="388" />
              <mxPoint x="364" y="404" />
            </Array>
          </mxGeometry>
        </mxCell>

        <mxCell id="t2_edge_in2" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#64748B;strokeWidth=1.6;endArrow=block;endFill=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="t2_skills_pill" target="t2_model_circle">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="364" y="424" />
              <mxPoint x="364" y="404" />
            </Array>
          </mxGeometry>
        </mxCell>

        <mxCell id="t2_edge_calls" value="&lt;span style=&apos;padding:0 2px;&apos;&gt;enriches&lt;/span&gt;" style="edgeStyle=none;html=1;strokeColor=#64748B;strokeWidth=1.6;endArrow=block;endFill=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;fontSize=10;fontColor=#475569;fontStyle=1;labelBackgroundColor=#FAF5FF;" edge="1" parent="1" source="t2_model_circle" target="t2_tools_card">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="-5" y="-2" as="offset" />
          </mxGeometry>
        </mxCell>

        <mxCell id="t2_edge_returns" value="&lt;span style=&apos;padding:0 2px;&apos;&gt;verifies types&lt;/span&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#64748B;strokeWidth=1.5;endArrow=block;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=1;fontSize=10;fontColor=#475569;fontStyle=1;labelBackgroundColor=#FAF5FF;" edge="1" parent="1" source="t2_tools_card" target="t2_model_circle">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="0" y="-2" as="offset" />
            <Array as="points">
              <mxPoint x="633" y="449" />
              <mxPoint x="416" y="449" />
            </Array>
          </mxGeometry>
        </mxCell>

        <mxCell id="t2_edge_checks" value="" style="edgeStyle=none;html=1;strokeColor=#64748B;strokeWidth=1.6;endArrow=block;endFill=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="t2_tools_card" target="t2_checks_card">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Bottom Prompt Bar 02 -->
        <mxCell id="t2_prompt_bar" value="&lt;table style=&quot;width:842px;border-collapse:collapse;font-family:Inter,sans-serif;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:62px;text-align:left;vertical-align:middle;&quot;&gt;&lt;span style=&quot;font-size:10.5px;font-weight:800;color:#64748B;letter-spacing:0.5px;&quot;&gt;RULE 02&lt;/span&gt;&lt;/td&gt;&lt;td style=&quot;text-align:left;vertical-align:middle;font-size:11.5px;color:${textPrimary};font-weight:500;&quot;&gt;Attach explicit JSON-LD / Schema.org context headers and SPDX open licenses (CC-BY-4.0 / MIT) to every knowledge asset.&lt;/td&gt;&lt;td style=&quot;width:30px;text-align:right;vertical-align:middle;&quot;&gt;&lt;span style=&quot;display:inline-block;width:22px;height:22px;line-height:22px;text-align:center;background:#0F172A;color:#FFFFFF;border-radius:999px;font-weight:800;font-size:12px;&quot;&gt;&amp;uarr;&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=16;whiteSpace=wrap;html=1;fillColor=${promptBarBg};strokeColor=${promptBarBorder};strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="104" y="466" width="866" height="36" as="geometry" />
        </mxCell>

        <!-- ========================================================================= -->
        <!-- TIER 03: CONTINUOUS VALIDATION LOOP                                       -->
        <!-- ========================================================================= -->
        <mxCell id="t3_card" value="" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="82" y="528" width="910" height="206" as="geometry" />
        </mxCell>

        <mxCell id="t3_title" value="&lt;div style=&quot;font-family:Inter,sans-serif;&quot;&gt;&lt;span style=&quot;font-size:20px;font-weight:800;color:#059669;&quot;&gt;Validation Loop&lt;/span&gt;&amp;nbsp;&amp;nbsp;&amp;nbsp;&lt;span style=&quot;font-size:14px;font-weight:700;color:${textMuted};&quot;&gt;Automated schema linting, broken URI link checking, and self-healing pipeline.&lt;/span&gt;&lt;/div&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="104" y="531" width="866" height="28" as="geometry" />
        </mxCell>

        <mxCell id="t3_model_circle" value="&lt;div style=&quot;text-align:center;&quot;&gt;${escXml(starburstSvg)}&lt;/div&gt;" style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="130" y="562" width="52" height="52" as="geometry" />
        </mxCell>
        <mxCell id="t3_model_lbl" value="linter" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=top;fontStyle=1;fontSize=11.5;fontColor=${textPrimary};" vertex="1" parent="1">
          <mxGeometry x="121" y="616" width="70" height="18" as="geometry" />
        </mxCell>

        <mxCell id="t3_check_box" value="&lt;div style=&quot;text-align:left;padding-left:10px;&quot;&gt;&lt;span style=&quot;font-size:10px;font-weight:800;color:#065F46;&quot;&gt;VALIDATE KNOWLEDGE ASSET&lt;/span&gt;&lt;br/&gt;&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;&amp;#9745; JSON-LD &amp;amp; Markdown AST valid&lt;br/&gt;&amp;#9745; Zero broken citations or dead URIs&lt;/b&gt;&lt;/div&gt;" style="rounded=1;arcSize=14;whiteSpace=wrap;html=1;fillColor=#ECFDF5;strokeColor=#6EE7B7;strokeWidth=1.5;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="220" y="562" width="216" height="52" as="geometry" />
        </mxCell>

        <mxCell id="t3_fix_box" value="&lt;b style=&quot;font-size:11.5px;color:#065F46;&quot;&gt;Auto-heal formatting &amp;amp; URI links&lt;/b&gt;" style="rounded=1;arcSize=16;whiteSpace=wrap;html=1;fillColor=#D1FAE5;strokeColor=#34D399;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="220" y="648" width="216" height="30" as="geometry" />
        </mxCell>

        <mxCell id="t3_gate_pass" value="&lt;b style=&quot;font-size:12px;color:#0F172A;&quot;&gt;All schemas valid?&lt;/b&gt;" style="rounded=1;arcSize=16;whiteSpace=wrap;html=1;fillColor=#ECFDF5;strokeColor=#34D399;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="512" y="572" width="192" height="32" as="geometry" />
        </mxCell>

        <mxCell id="t3_gate_tries" value="&lt;b style=&quot;font-size:12px;color:#0F172A;&quot;&gt;3 retries exhausted?&lt;/b&gt;" style="rounded=1;arcSize=16;whiteSpace=wrap;html=1;fillColor=#ECFDF5;strokeColor=#34D399;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="512" y="648" width="192" height="30" as="geometry" />
        </mxCell>

        <mxCell id="t3_done_pill" value="&lt;b style=&quot;font-size:12px;color:#FFFFFF;&quot;&gt;Published to Commons&lt;/b&gt;" style="rounded=1;arcSize=20;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#0F172A;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="784" y="572" width="186" height="32" as="geometry" />
        </mxCell>

        <mxCell id="t3_stop_pill" value="&lt;b style=&quot;font-size:12px;color:#9A3412;&quot;&gt;Quarantine + Alert&lt;/b&gt;" style="rounded=1;arcSize=20;whiteSpace=wrap;html=1;fillColor=#FFF7ED;strokeColor=#FB923C;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="784" y="648" width="186" height="30" as="geometry" />
        </mxCell>

        <!-- Edges Tier 03 -->
        <mxCell id="t3_e1" value="" style="edgeStyle=none;html=1;strokeColor=#64748B;strokeWidth=1.6;endArrow=block;endFill=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="t3_model_circle" target="t3_check_box">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="t3_e2" value="" style="edgeStyle=none;html=1;strokeColor=#64748B;strokeWidth=1.6;endArrow=block;endFill=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="t3_check_box" target="t3_gate_pass">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="t3_e_yes1" value="&lt;span style=&apos;padding:0 2px;&apos;&gt;yes&lt;/span&gt;" style="edgeStyle=none;html=1;strokeColor=#10B981;strokeWidth=2;endArrow=block;endFill=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;fontSize=11;fontColor=#047857;fontStyle=1;labelBackgroundColor=${cardBg};" edge="1" parent="1" source="t3_gate_pass" target="t3_done_pill">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="-5" y="-1.5" as="offset" />
          </mxGeometry>
        </mxCell>
        <mxCell id="t3_e_no1" value="&lt;span style=&apos;padding:0 2px;line-height:0.9;&apos;&gt;no&lt;/span&gt;" style="edgeStyle=none;html=1;strokeColor=#64748B;strokeWidth=1.6;endArrow=block;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;fontSize=10.5;fontColor=#475569;fontStyle=1;labelBackgroundColor=${cardBg};" edge="1" parent="1" source="t3_gate_pass" target="t3_gate_tries">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="0" y="-6" as="offset" />
          </mxGeometry>
        </mxCell>
        <mxCell id="t3_e_yes2" value="&lt;span style=&apos;padding:0 2px;&apos;&gt;yes&lt;/span&gt;" style="edgeStyle=none;html=1;strokeColor=#EA580C;strokeWidth=2;endArrow=block;endFill=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;fontSize=11;fontColor=#C2410C;fontStyle=1;labelBackgroundColor=${cardBg};" edge="1" parent="1" source="t3_gate_tries" target="t3_stop_pill">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="-5" y="-1.5" as="offset" />
          </mxGeometry>
        </mxCell>
        <mxCell id="t3_e_no2" value="&lt;span style=&apos;padding:0 2px;&apos;&gt;no&lt;/span&gt;" style="edgeStyle=none;html=1;strokeColor=#10B981;strokeWidth=1.6;endArrow=block;endFill=1;exitX=0;exitY=0.5;entryX=1;entryY=0.5;fontSize=11;fontColor=#047857;fontStyle=1;labelBackgroundColor=${cardBg};" edge="1" parent="1" source="t3_gate_tries" target="t3_fix_box">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="5" y="-1.5" as="offset" />
          </mxGeometry>
        </mxCell>
        <mxCell id="t3_e_loop" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#10B981;strokeWidth=2;endArrow=block;endFill=1;exitX=0;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="t3_fix_box" target="t3_model_circle">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="106" y="663" />
              <mxPoint x="106" y="588" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- Bottom Prompt Bar 03 -->
        <mxCell id="t3_prompt_bar" value="&lt;table style=&quot;width:842px;border-collapse:collapse;font-family:Inter,sans-serif;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:62px;text-align:left;vertical-align:middle;&quot;&gt;&lt;span style=&quot;font-size:10.5px;font-weight:800;color:#64748B;letter-spacing:0.5px;&quot;&gt;RULE 03&lt;/span&gt;&lt;/td&gt;&lt;td style=&quot;text-align:left;vertical-align:middle;font-size:11.5px;color:${textPrimary};font-weight:500;&quot;&gt;Run automated CI schema validation and URI link verification on every commit. Auto-repair broken links or flag maintainers.&lt;/td&gt;&lt;td style=&quot;width:30px;text-align:right;vertical-align:middle;&quot;&gt;&lt;span style=&quot;display:inline-block;width:22px;height:22px;line-height:22px;text-align:center;background:#0F172A;color:#FFFFFF;border-radius:999px;font-weight:800;font-size:12px;&quot;&gt;&amp;uarr;&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=16;whiteSpace=wrap;html=1;fillColor=${promptBarBg};strokeColor=${promptBarBorder};strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="104" y="686" width="866" height="36" as="geometry" />
        </mxCell>

        <!-- ========================================================================= -->
        <!-- TIER 04: FEDERATED KNOWLEDGE GRAPH                                        -->
        <!-- ========================================================================= -->
        <mxCell id="t4_card" value="" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="82" y="748" width="910" height="206" as="geometry" />
        </mxCell>

        <mxCell id="t4_title" value="&lt;div style=&quot;font-family:Inter,sans-serif;&quot;&gt;&lt;span style=&quot;font-size:20px;font-weight:800;color:#2563EB;&quot;&gt;Federated Graph&lt;/span&gt;&amp;nbsp;&amp;nbsp;&amp;nbsp;&lt;span style=&quot;font-size:14px;font-weight:700;color:${textMuted};&quot;&gt;Decentralized network of linked open repositories and semantic discovery indexes.&lt;/span&gt;&lt;/div&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="104" y="756" width="866" height="28" as="geometry" />
        </mxCell>

        <!-- Dashed Enclave: EXAMPLE REPOSITORY -->
        <mxCell id="t4_folder_box" value="" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#93C5FD;strokeWidth=1.5;dashed=1;dashPattern=4 4;" vertex="1" parent="1">
          <mxGeometry x="104" y="790" width="432" height="104" as="geometry" />
        </mxCell>
        <mxCell id="t4_folder_lbl" value="OPEN KNOWLEDGE REPOSITORY" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontStyle=1;fontSize=10;fontColor=#1E3A8A;" vertex="1" parent="1">
          <mxGeometry x="116" y="794" width="210" height="18" as="geometry" />
        </mxCell>
        <mxCell id="t4_lines_lbl" value="Edges = RDF / URI links" style="text;html=1;strokeColor=none;fillColor=none;align=right;verticalAlign=middle;fontStyle=1;fontSize=10;fontColor=#475569;" vertex="1" parent="1">
          <mxGeometry x="322" y="794" width="200" height="18" as="geometry" />
        </mxCell>

        <mxCell id="t4_f_brief" value="&lt;b style=&quot;font-size:11.5px;color:#0F172A;&quot;&gt;concepts.md&lt;/b&gt;" style="rounded=1;arcSize=18;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#60A5FA;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="116" y="816" width="118" height="28" as="geometry" />
        </mxCell>
        <mxCell id="t4_f_draft" value="&lt;b style=&quot;font-size:11.5px;color:#0F172A;&quot;&gt;datasets.parquet&lt;/b&gt;" style="rounded=1;arcSize=18;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#60A5FA;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="116" y="856" width="118" height="28" as="geometry" />
        </mxCell>
        <mxCell id="t4_f_aud" value="&lt;b style=&quot;font-size:11.5px;color:#0F172A;&quot;&gt;ontology.jsonld&lt;/b&gt;" style="rounded=1;arcSize=18;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#60A5FA;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="260" y="816" width="118" height="28" as="geometry" />
        </mxCell>
        <mxCell id="t4_f_offer" value="&lt;b style=&quot;font-size:11.5px;color:#0F172A;&quot;&gt;citations.bib&lt;/b&gt;" style="rounded=1;arcSize=18;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#60A5FA;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="260" y="856" width="118" height="28" as="geometry" />
        </mxCell>

        <!-- Mesh connector lines -->
        <mxCell id="t4_m1" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#64748B;strokeWidth=1.4;endArrow=none;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="t4_f_brief" target="t4_f_aud">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="t4_m2" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#64748B;strokeWidth=1.4;endArrow=none;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="t4_f_brief" target="t4_f_draft">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="t4_m3" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#64748B;strokeWidth=1.4;endArrow=none;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="t4_f_draft" target="t4_f_offer">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="t4_m4" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#64748B;strokeWidth=1.4;endArrow=none;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="t4_f_aud" target="t4_f_offer">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="t4_m5" value="" style="edgeStyle=none;html=1;strokeColor=#64748B;strokeWidth=1.3;endArrow=none;exitX=1;exitY=1;entryX=0;entryY=0;" edge="1" parent="1" source="t4_f_brief" target="t4_f_offer">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="t4_m6" value="" style="edgeStyle=none;html=1;strokeColor=#64748B;strokeWidth=1.3;endArrow=none;exitX=1;exitY=0;entryX=0;entryY=1;" edge="1" parent="1" source="t4_f_draft" target="t4_f_aud">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="t4_f_notes" value="&lt;b style=&quot;font-size:11px;color:#475569;&quot;&gt;scratch_draft.md&lt;/b&gt;" style="rounded=1;arcSize=18;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.5;dashed=1;dashPattern=3 3;" vertex="1" parent="1">
          <mxGeometry x="396" y="824" width="126" height="28" as="geometry" />
        </mxCell>
        <mxCell id="t4_unlinked_lbl" value="orphan URI" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=top;fontSize=10.5;fontColor=#64748B;" vertex="1" parent="1">
          <mxGeometry x="409" y="856" width="100" height="18" as="geometry" />
        </mxCell>

        <mxCell id="t4_edge_maps" value="&lt;span style=&apos;padding:0 2px;&apos;&gt;federates&lt;/span&gt;" style="edgeStyle=none;html=1;strokeColor=#64748B;strokeWidth=1.6;endArrow=block;endFill=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;fontSize=10;fontColor=#475569;fontStyle=1;labelBackgroundColor=${cardBg};" edge="1" parent="1" source="t4_folder_box" target="t4_map_card">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="-5" y="-2" as="offset" />
          </mxGeometry>
        </mxCell>

        <!-- Right Map Card -->
        <mxCell id="t4_map_card" value="" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="626" y="790" width="344" height="104" as="geometry" />
        </mxCell>
        <mxCell id="t4_map_header" value="&lt;b style=&quot;color:#1E3A8A;font-size:11.5px;padding-left:12px;&quot;&gt;INDEX.jsonld · Federated Catalog&lt;/b&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#93C5FD;strokeWidth=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="626" y="790" width="344" height="23" as="geometry" />
        </mxCell>

        <mxCell id="t4_map_rows" value="&lt;table style=&quot;width:316px;font-family:Inter,sans-serif;font-size:11px;line-height:1.26;margin:0 14px;color:#0F172A;border-collapse:collapse;&quot;&gt;&lt;tr style=&quot;border-bottom:1px solid #F1F5F9;&quot;&gt;&lt;td style=&quot;padding:2px 0;text-align:left;&quot;&gt;&lt;b&gt;Semantic Entities&lt;/b&gt;&lt;/td&gt;&lt;td style=&quot;padding:2px 0;text-align:right;color:#475569;font-weight:500;&quot;&gt;URI / DOI indexed&lt;/td&gt;&lt;/tr&gt;&lt;tr style=&quot;border-bottom:1px solid #F1F5F9;&quot;&gt;&lt;td style=&quot;padding:2px 0;text-align:left;&quot;&gt;&lt;b&gt;Cross-Repo Graph&lt;/b&gt;&lt;/td&gt;&lt;td style=&quot;padding:2px 0;text-align:right;color:#475569;font-weight:500;&quot;&gt;verified RDF triples&lt;/td&gt;&lt;/tr&gt;&lt;tr style=&quot;border-bottom:1px solid #F1F5F9;&quot;&gt;&lt;td style=&quot;padding:2px 0;text-align:left;&quot;&gt;&lt;b&gt;Orphan Artifacts&lt;/b&gt;&lt;/td&gt;&lt;td style=&quot;padding:2px 0;text-align:right;color:#475569;font-weight:500;&quot;&gt;full-text searchable&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;padding:2px 0;text-align:left;&quot;&gt;&lt;b&gt;License Compliance&lt;/b&gt;&lt;/td&gt;&lt;td style=&quot;padding:2px 0;text-align:right;color:#059669;font-weight:700;&quot;&gt;100% Open (SPDX)&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="626" y="813" width="344" height="81" as="geometry" />
        </mxCell>

        <!-- Bottom Prompt Bar 04 -->
        <mxCell id="t4_prompt_bar" value="&lt;table style=&quot;width:842px;border-collapse:collapse;font-family:Inter,sans-serif;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:62px;text-align:left;vertical-align:middle;&quot;&gt;&lt;span style=&quot;font-size:10.5px;font-weight:800;color:#64748B;letter-spacing:0.5px;&quot;&gt;RULE 04&lt;/span&gt;&lt;/td&gt;&lt;td style=&quot;text-align:left;vertical-align:middle;font-size:11.5px;color:${textPrimary};font-weight:500;&quot;&gt;Publish a root INDEX.jsonld catalog mapping all semantic entities, citations, and open licenses for federated discovery.&lt;/td&gt;&lt;td style=&quot;width:30px;text-align:right;vertical-align:middle;&quot;&gt;&lt;span style=&quot;display:inline-block;width:22px;height:22px;line-height:22px;text-align:center;background:#0F172A;color:#FFFFFF;border-radius:999px;font-weight:800;font-size:12px;&quot;&gt;&amp;uarr;&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=16;whiteSpace=wrap;html=1;fillColor=${promptBarBg};strokeColor=${promptBarBorder};strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="104" y="906" width="866" height="36" as="geometry" />
        </mxCell>

        <!-- ========================================================================= -->
        <!-- FOOTER BRAND PILL                                                         -->
        <!-- ========================================================================= -->
        <mxCell id="footer_pill" value="&lt;div style=&quot;display:flex;align-items:center;justify-content:center;gap:10px;font-family:Inter,sans-serif;&quot;&gt;&lt;b style=&quot;color:#FFFFFF;font-size:12px;letter-spacing:0.8px;&quot;&gt;OPEN KNOWLEDGE ARCHITECTURE&lt;/b&gt;&lt;span style=&quot;color:#EA580C;font-size:14px;&quot;&gt;&amp;bull;&lt;/span&gt;&lt;span style=&quot;color:#E2E8F0;font-size:12px;&quot;&gt;w3c.org/RDF &amp;bull; okfn.org&lt;/span&gt;&lt;/div&gt;" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#1E293B;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="220" y="968" width="580" height="42" as="geometry" />
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
