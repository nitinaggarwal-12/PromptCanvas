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

  const starburstSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" width="28" height="28"><g stroke="#EA580C" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="3" x2="18" y2="33"/><line x1="3" y1="18" x2="33" y2="18"/><line x1="7.4" y1="7.4" x2="28.6" y2="28.6"/><line x1="28.6" y1="7.4" x2="7.4" y2="28.6"/><line x1="12.3" y1="4.1" x2="23.7" y2="31.9"/><line x1="4.1" y1="12.3" x2="31.9" y2="23.7"/><line x1="4.1" y1="23.7" x2="31.9" y2="12.3"/><line x1="12.3" y1="31.9" x2="23.7" y2="4.1"/></g><circle cx="18" cy="18" r="3.5" fill="#FFFFFF"/></svg>`;

  const watermarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="64" height="64"><g stroke="#FDBA74" stroke-width="3.5" stroke-linecap="round" opacity="0.45"><line x1="40" y1="4" x2="40" y2="76"/><line x1="4" y1="40" x2="76" y2="40"/><line x1="14.5" y1="14.5" x2="65.5" y2="65.5"/><line x1="65.5" y1="14.5" x2="14.5" y2="65.5"/><line x1="26.2" y1="6.7" x2="53.8" y2="73.3"/><line x1="6.7" y1="26.2" x2="73.3" y2="53.8"/><line x1="6.7" y1="53.8" x2="73.3" y2="26.2"/><line x1="26.2" y1="73.3" x2="53.8" y2="6.7"/></g></svg>`;

  return `<mxfile host="embed.diagrams.net" modified="${new Date().toISOString()}" agent="PromptCanvas Infographic Engine" version="24.0.0" type="device">
  <diagram id="open_knowledge_infographic" name="Open Knowledge Format Infographic">
    <mxGraphModel dx="1600" dy="1050" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="1050" background="${bgColor}" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- ========================================================================= -->
        <!-- TOP HEADER & WATERMARK                                                    -->
        <!-- ========================================================================= -->
        <mxCell id="header_title" value="&lt;div style=&quot;font-family:Inter,sans-serif;text-align:left;&quot;&gt;&lt;span style=&quot;font-size:30px;font-weight:900;color:${textPrimary};letter-spacing:-0.5px;&quot;&gt;Formats &lt;/span&gt;&lt;span style=&quot;font-size:26px;font-weight:400;color:#94A3B8;&quot;&gt;+&lt;/span&gt;&lt;span style=&quot;font-size:30px;font-weight:900;color:${textPrimary};letter-spacing:-0.5px;&quot;&gt; Schema &lt;/span&gt;&lt;span style=&quot;font-size:26px;font-weight:400;color:#94A3B8;&quot;&gt;+&lt;/span&gt;&lt;span style=&quot;font-size:30px;font-weight:900;color:${textPrimary};letter-spacing:-0.5px;&quot;&gt; Validation &lt;/span&gt;&lt;span style=&quot;font-size:26px;font-weight:400;color:#94A3B8;&quot;&gt;+&lt;/span&gt;&lt;span style=&quot;font-size:30px;font-weight:900;color:#EA580C;letter-spacing:-0.5px;&quot;&gt; Knowledge Graph&lt;/span&gt;&lt;br/&gt;&lt;span style=&quot;font-size:14px;color:${textMuted};font-weight:500;&quot;&gt;Open Knowledge Format Architecture. &lt;/span&gt;&lt;b style=&quot;font-size:14px;color:${textPrimary};&quot;&gt;How open standards structure, validate, and federate knowledge.&lt;/b&gt;&lt;/div&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;" vertex="1" parent="1">
          <mxGeometry x="44" y="18" width="1150" height="62" as="geometry" />
        </mxCell>

        <mxCell id="header_watermark" value="&lt;div&gt;${watermarkSvg.replace(/"/g, '&quot;')}&lt;/div&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1460" y="14" width="70" height="70" as="geometry" />
        </mxCell>

        <!-- ========================================================================= -->
        <!-- LEFT VERTICAL TIMELINE SPINE (01 -> 04)                                   -->
        <!-- ========================================================================= -->
        <mxCell id="spine_line" value="" style="endArrow=oval;endFill=1;endSize=6;html=1;strokeColor=#CBD5E1;strokeWidth=2;" edge="1" parent="1">
          <mxGeometry width="50" height="50" relative="1" as="geometry">
            <mxPoint x="62" y="114" as="sourcePoint" />
            <mxPoint x="62" y="955" as="targetPoint" />
          </mxGeometry>
        </mxCell>

        <mxCell id="badge_01" value="01" style="rounded=1;arcSize=24;whiteSpace=wrap;html=1;fillColor=#FEF3C7;strokeColor=#F59E0B;strokeWidth=1.5;fontStyle=1;fontSize=12;fontColor=#B45309;" vertex="1" parent="1">
          <mxGeometry x="44" y="102" width="36" height="28" as="geometry" />
        </mxCell>

        <mxCell id="badge_02" value="02" style="rounded=1;arcSize=24;whiteSpace=wrap;html=1;fillColor=#F3E8FF;strokeColor=#A855F7;strokeWidth=1.5;fontStyle=1;fontSize=12;fontColor=#7E22CE;" vertex="1" parent="1">
          <mxGeometry x="44" y="318" width="36" height="28" as="geometry" />
        </mxCell>

        <mxCell id="badge_03" value="03" style="rounded=1;arcSize=24;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#10B981;strokeWidth=1.5;fontStyle=1;fontSize=12;fontColor=#047857;" vertex="1" parent="1">
          <mxGeometry x="44" y="534" width="36" height="28" as="geometry" />
        </mxCell>

        <mxCell id="badge_04" value="04" style="rounded=1;arcSize=24;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#3B82F6;strokeWidth=1.5;fontStyle=1;fontSize=12;fontColor=#1D4ED8;" vertex="1" parent="1">
          <mxGeometry x="44" y="750" width="36" height="28" as="geometry" />
        </mxCell>

        <!-- ========================================================================= -->
        <!-- TIER 01: OPEN SERIALIZATION FORMATS                                       -->
        <!-- ========================================================================= -->
        <mxCell id="t1_card" value="" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="104" y="92" width="1436" height="202" as="geometry" />
        </mxCell>

        <mxCell id="t1_title" value="&lt;div style=&quot;font-family:Inter,sans-serif;&quot;&gt;&lt;span style=&quot;font-size:20px;font-weight:800;color:${textPrimary};&quot;&gt;Open Formats&lt;/span&gt;&amp;nbsp;&amp;nbsp;&amp;nbsp;&lt;span style=&quot;font-size:14px;font-weight:700;color:${textMuted};&quot;&gt;The plain-text, human-readable and machine-parseable files that store raw knowledge.&lt;/span&gt;&lt;/div&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="128" y="100" width="900" height="30" as="geometry" />
        </mxCell>

        <!-- Dashed Enclave: OPEN SERIALIZATION -->
        <mxCell id="t1_loaded_box" value="" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFBEB;strokeColor=#F59E0B;strokeWidth=1.5;dashed=1;dashPattern=4 4;" vertex="1" parent="1">
          <mxGeometry x="128" y="134" width="510" height="104" as="geometry" />
        </mxCell>
        <mxCell id="t1_loaded_lbl" value="OPEN SERIALIZATION FORMATS" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontStyle=1;fontSize=10;fontColor=#92400E;" vertex="1" parent="1">
          <mxGeometry x="140" y="138" width="240" height="18" as="geometry" />
        </mxCell>

        <mxCell id="t1_prompt_pill" value="&lt;div style=&quot;display:flex;align-items:center;justify-content:space-between;padding:0 10px;&quot;&gt;&lt;b style=&quot;color:#0F172A;font-size:11.5px;&quot;&gt;Markdown (.md) / MDX&lt;/b&gt;&amp;nbsp;&amp;nbsp;&lt;span style=&quot;color:#78350F;font-size:11px;&quot;&gt;human documentation &amp;amp; specs&lt;/span&gt;&lt;/div&gt;" style="rounded=1;arcSize=20;whiteSpace=wrap;html=1;fillColor=#FEF3C7;strokeColor=#FCD34D;strokeWidth=1;align=left;spacingLeft=8;" vertex="1" parent="1">
          <mxGeometry x="142" y="160" width="482" height="26" as="geometry" />
        </mxCell>

        <mxCell id="t1_files_pill" value="&lt;b style=&quot;color:#0F172A;font-size:11.5px;&quot;&gt;JSON-LD / RDF (Linked Data)&lt;/b&gt;" style="rounded=1;arcSize=20;whiteSpace=wrap;html=1;fillColor=#FEF3C7;strokeColor=#FCD34D;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="142" y="192" width="235" height="26" as="geometry" />
        </mxCell>

        <mxCell id="t1_tools_pill" value="&lt;b style=&quot;color:#6B21A8;font-size:11.5px;&quot;&gt;CSV / Apache Parquet&lt;/b&gt;" style="rounded=1;arcSize=20;whiteSpace=wrap;html=1;fillColor=#F3E8FF;strokeColor=#D8B4FE;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="389" y="192" width="235" height="26" as="geometry" />
        </mxCell>

        <mxCell id="t1_more_lbl" value="UTF-8 plain text • Git version-controlled • Zero binary lock-in" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontSize=10.5;fontColor=#475569;" vertex="1" parent="1">
          <mxGeometry x="142" y="219" width="380" height="16" as="geometry" />
        </mxCell>

        <!-- Center Parser Node 01 -->
        <mxCell id="t1_model_circle" value="&lt;div style=&quot;text-align:center;&quot;&gt;${starburstSvg.replace(/"/g, '&quot;')}&lt;/div&gt;" style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="710" y="154" width="54" height="54" as="geometry" />
        </mxCell>
        <mxCell id="t1_model_lbl" value="open parser" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=top;fontStyle=1;fontSize=11;fontColor=${textPrimary};" vertex="1" parent="1">
          <mxGeometry x="692" y="212" width="90" height="20" as="geometry" />
        </mxCell>

        <mxCell id="t1_edge_1" value="parses" style="edgeStyle=none;html=1;strokeColor=#64748B;strokeWidth=1.5;endArrow=block;endFill=1;fontSize=10;fontColor=#475569;fontStyle=1;labelBackgroundColor=${cardBg};" edge="1" parent="1" source="t1_loaded_box" target="t1_model_circle">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Right Enclave: WHAT OPEN FORMATS GUARANTEE -->
        <mxCell id="t1_right_box" value="" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="830" y="134" width="684" height="104" as="geometry" />
        </mxCell>
        <mxCell id="t1_right_lbl" value="WHAT OPEN FORMATS GUARANTEE" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontStyle=1;fontSize=10;fontColor=#1D4ED8;" vertex="1" parent="1">
          <mxGeometry x="844" y="138" width="260" height="18" as="geometry" />
        </mxCell>

        <mxCell id="t1_ask_1" value="&lt;b style=&quot;color:#0F172A;font-size:11px;&quot;&gt;100% Vendor Neutrality &amp;amp; Long-Term Archival Durability&lt;/b&gt;" style="rounded=1;arcSize=20;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#BFDBFE;strokeWidth=1;align=left;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="844" y="156" width="656" height="25" as="geometry" />
        </mxCell>
        <mxCell id="t1_ask_2" value="&lt;b style=&quot;color:#0F172A;font-size:11px;&quot;&gt;Direct Ingestion by Both Humans &amp;amp; AI / LLM Agents&lt;/b&gt;" style="rounded=1;arcSize=20;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#BFDBFE;strokeWidth=1;align=left;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="844" y="186" width="656" height="25" as="geometry" />
        </mxCell>
        <mxCell id="t1_ask_3" value="Never lock knowledge inside proprietary binary blobs" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontSize=11;fontStyle=1;fontColor=#0F172A;" vertex="1" parent="1">
          <mxGeometry x="844" y="214" width="400" height="18" as="geometry" />
        </mxCell>

        <mxCell id="t1_edge_2" value="" style="edgeStyle=none;html=1;strokeColor=#64748B;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1" source="t1_model_circle" target="t1_right_box">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Bottom Prompt Bar 01 -->
        <mxCell id="t1_prompt_bar" value="&lt;div style=&quot;display:flex;align-items:center;justify-content:space-between;width:100%;padding:0 12px;font-family:Inter,sans-serif;&quot;&gt;&lt;div&gt;&lt;span style=&quot;font-size:10px;font-weight:800;color:#64748B;letter-spacing:0.5px;margin-right:12px;&quot;&gt;RULE 01&lt;/span&gt;&lt;span style=&quot;font-size:11.5px;color:${textPrimary};font-weight:500;&quot;&gt;Store all primary documentation and datasets in open, plain-text formats (Markdown, JSON-LD, Parquet) with UTF-8 encoding.&lt;/span&gt;&lt;/div&gt;&lt;span style=&quot;background:#0F172A;color:#FFFFFF;border-radius:999px;padding:2px 8px;font-weight:bold;font-size:12px;&quot;&gt;&amp;uarr;&lt;/span&gt;&lt;/div&gt;" style="rounded=1;arcSize=16;whiteSpace=wrap;html=1;fillColor=${promptBarBg};strokeColor=${promptBarBorder};strokeWidth=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="128" y="246" width="1386" height="36" as="geometry" />
        </mxCell>

        <!-- ========================================================================= -->
        <!-- TIER 02: SCHEMA & LICENSING HARNESS                                       -->
        <!-- ========================================================================= -->
        <mxCell id="t2_card" value="" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="104" y="308" width="1436" height="206" as="geometry" />
        </mxCell>

        <mxCell id="t2_title" value="&lt;div style=&quot;font-family:Inter,sans-serif;&quot;&gt;&lt;span style=&quot;font-size:20px;font-weight:800;color:#9333EA;&quot;&gt;Schema Harness&lt;/span&gt;&amp;nbsp;&amp;nbsp;&amp;nbsp;&lt;span style=&quot;font-size:14px;font-weight:700;color:${textMuted};&quot;&gt;The semantic ontologies, URI identifiers, and open licenses wrapped around raw files.&lt;/span&gt;&lt;/div&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="128" y="316" width="900" height="30" as="geometry" />
        </mxCell>

        <!-- Dashed Enclave: HARNESS -->
        <mxCell id="t2_harness_box" value="" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#D8B4FE;strokeWidth=1.5;dashed=1;dashPattern=4 4;" vertex="1" parent="1">
          <mxGeometry x="128" y="350" width="1386" height="108" as="geometry" />
        </mxCell>
        <mxCell id="t2_harness_lbl" value="GOVERNANCE: SEMANTIC SCHEMA &amp; OPEN LICENSING" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontStyle=1;fontSize=10;fontColor=#6B21A8;" vertex="1" parent="1">
          <mxGeometry x="142" y="354" width="380" height="18" as="geometry" />
        </mxCell>

        <mxCell id="t2_claude_pill" value="&lt;div style=&quot;display:flex;justify-content:space-between;width:100%;padding:0 10px;font-size:11.5px;&quot;&gt;&lt;b style=&quot;color:#0F172A;&quot;&gt;Schema.org / W3C RDF&lt;/b&gt;&lt;span style=&quot;color:#6B21A8;&quot;&gt;ontologies&lt;/span&gt;&lt;/div&gt;" style="rounded=1;arcSize=20;whiteSpace=wrap;html=1;fillColor=#F3E8FF;strokeColor=#C084FC;strokeWidth=1.5;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="142" y="378" width="290" height="28" as="geometry" />
        </mxCell>

        <mxCell id="t2_skills_pill" value="&lt;div style=&quot;display:flex;justify-content:space-between;width:100%;padding:0 10px;font-size:11.5px;&quot;&gt;&lt;b style=&quot;color:#0F172A;&quot;&gt;SPDX / CC-BY-4.0 / MIT&lt;/b&gt;&lt;span style=&quot;color:#6B21A8;&quot;&gt;open licenses&lt;/span&gt;&lt;/div&gt;" style="rounded=1;arcSize=20;whiteSpace=wrap;html=1;fillColor=#F3E8FF;strokeColor=#C084FC;strokeWidth=1.5;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="142" y="414" width="290" height="28" as="geometry" />
        </mxCell>

        <mxCell id="t2_model_circle" value="&lt;div style=&quot;text-align:center;&quot;&gt;${starburstSvg.replace(/"/g, '&quot;')}&lt;/div&gt;" style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="520" y="374" width="54" height="54" as="geometry" />
        </mxCell>
        <mxCell id="t2_model_lbl" value="validator" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=top;fontStyle=1;fontSize=11;fontColor=${textPrimary};" vertex="1" parent="1">
          <mxGeometry x="480" y="429" width="70" height="20" as="geometry" />
        </mxCell>

        <mxCell id="t2_tools_card" value="&lt;div style=&quot;text-align:left;padding-left:10px;&quot;&gt;&lt;span style=&quot;font-size:10.5px;font-weight:800;color:#6B21A8;&quot;&gt;METADATA ENRICHMENT&lt;/span&gt;&lt;br/&gt;&lt;b style=&quot;font-size:12px;color:#0F172A;&quot;&gt;Persistent URIs · DOI · Provenance&lt;/b&gt;&lt;/div&gt;" style="rounded=1;arcSize=12;whiteSpace=wrap;html=1;fillColor=#F3E8FF;strokeColor=#C084FC;strokeWidth=1.5;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="680" y="372" width="330" height="60" as="geometry" />
        </mxCell>

        <mxCell id="t2_checks_card" value="&lt;div style=&quot;text-align:left;padding-left:10px;&quot;&gt;&lt;span style=&quot;font-size:10.5px;font-weight:800;color:#475569;&quot;&gt;FAIR DATA COMPLIANCE&lt;/span&gt;&lt;br/&gt;&lt;b style=&quot;font-size:12px;color:#0F172A;&quot;&gt;Findable · Accessible · Interoperable · Reusable&lt;/b&gt;&lt;/div&gt;" style="rounded=1;arcSize=12;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1110" y="372" width="380" height="60" as="geometry" />
        </mxCell>

        <mxCell id="t2_edge_in" value="" style="edgeStyle=none;html=1;strokeColor=#64748B;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1" source="t2_claude_pill" target="t2_model_circle">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="t2_edge_calls" value="enriches" style="edgeStyle=none;html=1;strokeColor=#64748B;strokeWidth=1.5;endArrow=block;endFill=1;fontSize=10;fontColor=#475569;fontStyle=1;labelBackgroundColor=#FAF5FF;" edge="1" parent="1" source="t2_model_circle" target="t2_tools_card">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="t2_edge_returns" value="verifies types" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#64748B;strokeWidth=1.5;endArrow=block;endFill=1;exitX=0.5;exitY=1;entryX=0.82;entryY=0.88;fontSize=10;fontColor=#475569;fontStyle=1;labelBackgroundColor=#FAF5FF;" edge="1" parent="1" source="t2_tools_card" target="t2_model_circle">
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
        <mxCell id="t2_prompt_bar" value="&lt;div style=&quot;display:flex;align-items:center;justify-content:space-between;width:100%;padding:0 12px;font-family:Inter,sans-serif;&quot;&gt;&lt;div&gt;&lt;span style=&quot;font-size:10px;font-weight:800;color:#64748B;letter-spacing:0.5px;margin-right:12px;&quot;&gt;RULE 02&lt;/span&gt;&lt;span style=&quot;font-size:11.5px;color:${textPrimary};font-weight:500;&quot;&gt;Attach explicit JSON-LD / Schema.org context headers and SPDX open licenses (CC-BY-4.0 / MIT) to every knowledge asset.&lt;/span&gt;&lt;/div&gt;&lt;span style=&quot;background:#0F172A;color:#FFFFFF;border-radius:999px;padding:2px 8px;font-weight:bold;font-size:12px;&quot;&gt;&amp;uarr;&lt;/span&gt;&lt;/div&gt;" style="rounded=1;arcSize=16;whiteSpace=wrap;html=1;fillColor=${promptBarBg};strokeColor=${promptBarBorder};strokeWidth=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="128" y="466" width="1386" height="36" as="geometry" />
        </mxCell>

        <!-- ========================================================================= -->
        <!-- TIER 03: CONTINUOUS VALIDATION LOOP                                       -->
        <!-- ========================================================================= -->
        <mxCell id="t3_card" value="" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="104" y="528" width="1436" height="206" as="geometry" />
        </mxCell>

        <mxCell id="t3_title" value="&lt;div style=&quot;font-family:Inter,sans-serif;&quot;&gt;&lt;span style=&quot;font-size:20px;font-weight:800;color:#059669;&quot;&gt;Validation Loop&lt;/span&gt;&amp;nbsp;&amp;nbsp;&amp;nbsp;&lt;span style=&quot;font-size:14px;font-weight:700;color:${textMuted};&quot;&gt;Automated schema linting, broken URI link checking, and self-healing pipeline.&lt;/span&gt;&lt;/div&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="128" y="536" width="900" height="30" as="geometry" />
        </mxCell>

        <mxCell id="t3_model_circle" value="&lt;div style=&quot;text-align:center;&quot;&gt;${starburstSvg.replace(/"/g, '&quot;')}&lt;/div&gt;" style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="180" y="576" width="54" height="54" as="geometry" />
        </mxCell>
        <mxCell id="t3_model_lbl" value="linter" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=top;fontStyle=1;fontSize=11;fontColor=${textPrimary};" vertex="1" parent="1">
          <mxGeometry x="172" y="632" width="70" height="20" as="geometry" />
        </mxCell>

        <mxCell id="t3_check_box" value="&lt;div style=&quot;text-align:left;padding-left:12px;&quot;&gt;&lt;span style=&quot;font-size:10px;font-weight:800;color:#065F46;&quot;&gt;VALIDATE KNOWLEDGE ASSET&lt;/span&gt;&lt;br/&gt;&lt;b style=&quot;font-size:11.5px;color:#0F172A;&quot;&gt;&amp;#9745; JSON-LD &amp;amp; Markdown AST valid&lt;br/&gt;&amp;#9745; Zero broken citations or dead URIs&lt;/b&gt;&lt;/div&gt;" style="rounded=1;arcSize=14;whiteSpace=wrap;html=1;fillColor=#ECFDF5;strokeColor=#6EE7B7;strokeWidth=1.5;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="290" y="570" width="330" height="60" as="geometry" />
        </mxCell>

        <mxCell id="t3_fix_box" value="&lt;b style=&quot;font-size:12px;color:#065F46;&quot;&gt;Auto-heal formatting &amp;amp; URI links&lt;/b&gt;" style="rounded=1;arcSize=16;whiteSpace=wrap;html=1;fillColor=#D1FAE5;strokeColor=#34D399;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="290" y="640" width="330" height="32" as="geometry" />
        </mxCell>

        <mxCell id="t3_gate_pass" value="&lt;b style=&quot;font-size:12px;color:#0F172A;&quot;&gt;All schemas valid?&lt;/b&gt;" style="rounded=1;arcSize=16;whiteSpace=wrap;html=1;fillColor=#ECFDF5;strokeColor=#34D399;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="720" y="582" width="250" height="36" as="geometry" />
        </mxCell>

        <mxCell id="t3_gate_tries" value="&lt;b style=&quot;font-size:12px;color:#0F172A;&quot;&gt;3 retries exhausted?&lt;/b&gt;" style="rounded=1;arcSize=16;whiteSpace=wrap;html=1;fillColor=#ECFDF5;strokeColor=#34D399;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="720" y="638" width="250" height="36" as="geometry" />
        </mxCell>

        <mxCell id="t3_done_pill" value="&lt;b style=&quot;font-size:13px;color:#FFFFFF;&quot;&gt;Published to Commons&lt;/b&gt;" style="rounded=1;arcSize=20;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#0F172A;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1150" y="582" width="270" height="36" as="geometry" />
        </mxCell>

        <mxCell id="t3_stop_pill" value="&lt;b style=&quot;font-size:13px;color:#9A3412;&quot;&gt;Quarantine + Alert Maintainer&lt;/b&gt;" style="rounded=1;arcSize=20;whiteSpace=wrap;html=1;fillColor=#FFF7ED;strokeColor=#FB923C;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1150" y="638" width="270" height="36" as="geometry" />
        </mxCell>

        <!-- Edges Tier 03 -->
        <mxCell id="t3_e1" value="" style="edgeStyle=none;html=1;strokeColor=#64748B;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1" source="t3_model_circle" target="t3_check_box">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="t3_e2" value="" style="edgeStyle=none;html=1;strokeColor=#64748B;strokeWidth=1.5;endArrow=block;endFill=1;" edge="1" parent="1" source="t3_check_box" target="t3_gate_pass">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="t3_e_yes1" value="yes" style="edgeStyle=none;html=1;strokeColor=#10B981;strokeWidth=2;endArrow=block;endFill=1;fontSize=11;fontColor=#047857;fontStyle=1;labelBackgroundColor=${cardBg};" edge="1" parent="1" source="t3_gate_pass" target="t3_done_pill">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="t3_e_no1" value="no" style="edgeStyle=none;html=1;strokeColor=#64748B;strokeWidth=1.5;endArrow=block;endFill=1;fontSize=10;fontColor=#475569;fontStyle=1;labelBackgroundColor=${cardBg};" edge="1" parent="1" source="t3_gate_pass" target="t3_gate_tries">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="t3_e_yes2" value="yes" style="edgeStyle=none;html=1;strokeColor=#EA580C;strokeWidth=2;endArrow=block;endFill=1;fontSize=11;fontColor=#C2410C;fontStyle=1;labelBackgroundColor=${cardBg};" edge="1" parent="1" source="t3_gate_tries" target="t3_stop_pill">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="t3_e_no2" value="no" style="edgeStyle=none;html=1;strokeColor=#10B981;strokeWidth=1.5;endArrow=block;endFill=1;fontSize=11;fontColor=#047857;fontStyle=1;labelBackgroundColor=${cardBg};" edge="1" parent="1" source="t3_gate_tries" target="t3_fix_box">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="t3_e_loop" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#10B981;strokeWidth=2;endArrow=block;endFill=1;exitX=0;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="t3_fix_box" target="t3_model_circle">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="148" y="656" />
              <mxPoint x="148" y="603" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- Bottom Prompt Bar 03 -->
        <mxCell id="t3_prompt_bar" value="&lt;div style=&quot;display:flex;align-items:center;justify-content:space-between;width:100%;padding:0 12px;font-family:Inter,sans-serif;&quot;&gt;&lt;div&gt;&lt;span style=&quot;font-size:10px;font-weight:800;color:#64748B;letter-spacing:0.5px;margin-right:12px;&quot;&gt;RULE 03&lt;/span&gt;&lt;span style=&quot;font-size:11.5px;color:${textPrimary};font-weight:500;&quot;&gt;Run automated CI schema validation and URI link verification on every commit. Auto-repair broken links or flag maintainers.&lt;/span&gt;&lt;/div&gt;&lt;span style=&quot;background:#0F172A;color:#FFFFFF;border-radius:999px;padding:2px 8px;font-weight:bold;font-size:12px;&quot;&gt;&amp;uarr;&lt;/span&gt;&lt;/div&gt;" style="rounded=1;arcSize=16;whiteSpace=wrap;html=1;fillColor=${promptBarBg};strokeColor=${promptBarBorder};strokeWidth=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="128" y="686" width="1386" height="36" as="geometry" />
        </mxCell>

        <!-- ========================================================================= -->
        <!-- TIER 04: FEDERATED KNOWLEDGE GRAPH                                        -->
        <!-- ========================================================================= -->
        <mxCell id="t4_card" value="" style="rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="104" y="748" width="1436" height="206" as="geometry" />
        </mxCell>

        <mxCell id="t4_title" value="&lt;div style=&quot;font-family:Inter,sans-serif;&quot;&gt;&lt;span style=&quot;font-size:20px;font-weight:800;color:#2563EB;&quot;&gt;Federated Graph&lt;/span&gt;&amp;nbsp;&amp;nbsp;&amp;nbsp;&lt;span style=&quot;font-size:14px;font-weight:700;color:${textMuted};&quot;&gt;Decentralized network of linked open repositories and semantic discovery indexes.&lt;/span&gt;&lt;/div&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="128" y="756" width="900" height="30" as="geometry" />
        </mxCell>

        <!-- Dashed Enclave: EXAMPLE REPOSITORY -->
        <mxCell id="t4_folder_box" value="" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#93C5FD;strokeWidth=1.5;dashed=1;dashPattern=4 4;" vertex="1" parent="1">
          <mxGeometry x="128" y="790" width="680" height="102" as="geometry" />
        </mxCell>
        <mxCell id="t4_folder_lbl" value="OPEN KNOWLEDGE REPOSITORY" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontStyle=1;fontSize=10;fontColor=#1E3A8A;" vertex="1" parent="1">
          <mxGeometry x="142" y="794" width="220" height="18" as="geometry" />
        </mxCell>
        <mxCell id="t4_lines_lbl" value="Edges = RDF / URI semantic links" style="text;html=1;strokeColor=none;fillColor=none;align=right;verticalAlign=middle;fontStyle=1;fontSize=10;fontColor=#475569;" vertex="1" parent="1">
          <mxGeometry x="450" y="794" width="220" height="18" as="geometry" />
        </mxCell>

        <mxCell id="t4_f_brief" value="&lt;b style=&quot;font-size:11.5px;color:#0F172A;&quot;&gt;concepts.md&lt;/b&gt;" style="rounded=1;arcSize=18;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#60A5FA;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="144" y="818" width="160" height="28" as="geometry" />
        </mxCell>
        <mxCell id="t4_f_draft" value="&lt;b style=&quot;font-size:11.5px;color:#0F172A;&quot;&gt;datasets.parquet&lt;/b&gt;" style="rounded=1;arcSize=18;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#60A5FA;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="144" y="854" width="160" height="28" as="geometry" />
        </mxCell>
        <mxCell id="t4_f_aud" value="&lt;b style=&quot;font-size:11.5px;color:#0F172A;&quot;&gt;ontology.jsonld&lt;/b&gt;" style="rounded=1;arcSize=18;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#60A5FA;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="364" y="816" width="160" height="28" as="geometry" />
        </mxCell>
        <mxCell id="t4_f_offer" value="&lt;b style=&quot;font-size:11.5px;color:#0F172A;&quot;&gt;citations.bib&lt;/b&gt;" style="rounded=1;arcSize=18;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#60A5FA;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="364" y="854" width="160" height="28" as="geometry" />
        </mxCell>

        <!-- Mesh connector lines -->
        <mxCell id="t4_m1" value="" style="edgeStyle=none;html=1;strokeColor=#64748B;strokeWidth=1.2;endArrow=none;" edge="1" parent="1" source="t4_f_brief" target="t4_f_aud">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="t4_m2" value="" style="edgeStyle=none;html=1;strokeColor=#64748B;strokeWidth=1.2;endArrow=none;" edge="1" parent="1" source="t4_f_brief" target="t4_f_offer">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="t4_m3" value="" style="edgeStyle=none;html=1;strokeColor=#64748B;strokeWidth=1.2;endArrow=none;" edge="1" parent="1" source="t4_f_draft" target="t4_f_offer">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="t4_m4" value="" style="edgeStyle=none;html=1;strokeColor=#64748B;strokeWidth=1.2;endArrow=none;" edge="1" parent="1" source="t4_f_aud" target="t4_f_offer">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <mxCell id="t4_f_notes" value="&lt;b style=&quot;font-size:11.5px;color:#475569;&quot;&gt;scratch_draft.md&lt;/b&gt;" style="rounded=1;arcSize=18;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.5;dashed=1;dashPattern=3 3;" vertex="1" parent="1">
          <mxGeometry x="580" y="828" width="180" height="28" as="geometry" />
        </mxCell>
        <mxCell id="t4_unlinked_lbl" value="orphan URI" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=top;fontSize=10.5;fontColor=#64748B;" vertex="1" parent="1">
          <mxGeometry x="620" y="860" width="100" height="18" as="geometry" />
        </mxCell>

        <mxCell id="t4_edge_maps" value="federates" style="edgeStyle=none;html=1;strokeColor=#64748B;strokeWidth=1.5;endArrow=block;endFill=1;fontSize=10;fontColor=#475569;fontStyle=1;labelBackgroundColor=${cardBg};" edge="1" parent="1" source="t4_folder_box" target="t4_map_card">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- Right Map Card -->
        <mxCell id="t4_map_card" value="" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="910" y="790" width="604" height="102" as="geometry" />
        </mxCell>
        <mxCell id="t4_map_header" value="&lt;b style=&quot;color:#1E3A8A;font-size:11.5px;padding-left:12px;&quot;&gt;INDEX.jsonld · Federated Catalog&lt;/b&gt;" style="rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#93C5FD;strokeWidth=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="910" y="790" width="604" height="24" as="geometry" />
        </mxCell>

        <mxCell id="t4_map_rows" value="&lt;div style=&quot;font-family:Inter,sans-serif;font-size:11px;line-height:1.55;padding:4px 14px;color:#0F172A;&quot;&gt;&lt;div style=&quot;display:flex;justify-content:space-between;&quot;&gt;&lt;b&gt;Semantic Entities&lt;/b&gt;&lt;span style=&quot;color:#475569;&quot;&gt;URI / DOI indexed&lt;/span&gt;&lt;/div&gt;&lt;div style=&quot;display:flex;justify-content:space-between;&quot;&gt;&lt;b&gt;Cross-Repo Graph Edges&lt;/b&gt;&lt;span style=&quot;color:#475569;&quot;&gt;verified RDF triples&lt;/span&gt;&lt;/div&gt;&lt;div style=&quot;display:flex;justify-content:space-between;&quot;&gt;&lt;b&gt;Orphan Artifacts&lt;/b&gt;&lt;span style=&quot;color:#475569;&quot;&gt;discoverable via full-text&lt;/span&gt;&lt;/div&gt;&lt;div style=&quot;display:flex;justify-content:space-between;&quot;&gt;&lt;b&gt;License Compliance&lt;/b&gt;&lt;span style=&quot;color:#059669;font-weight:700;&quot;&gt;100% Open Access (SPDX)&lt;/span&gt;&lt;/div&gt;&lt;/div&gt;" style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=top;" vertex="1" parent="1">
          <mxGeometry x="910" y="814" width="604" height="78" as="geometry" />
        </mxCell>

        <!-- Bottom Prompt Bar 04 -->
        <mxCell id="t4_prompt_bar" value="&lt;div style=&quot;display:flex;align-items:center;justify-content:space-between;width:100%;padding:0 12px;font-family:Inter,sans-serif;&quot;&gt;&lt;div&gt;&lt;span style=&quot;font-size:10px;font-weight:800;color:#64748B;letter-spacing:0.5px;margin-right:12px;&quot;&gt;RULE 04&lt;/span&gt;&lt;span style=&quot;font-size:11.5px;color:${textPrimary};font-weight:500;&quot;&gt;Publish a root INDEX.jsonld catalog mapping all semantic entities, citations, and open licenses for federated discovery.&lt;/span&gt;&lt;/div&gt;&lt;span style=&quot;background:#0F172A;color:#FFFFFF;border-radius:999px;padding:2px 8px;font-weight:bold;font-size:12px;&quot;&gt;&amp;uarr;&lt;/span&gt;&lt;/div&gt;" style="rounded=1;arcSize=16;whiteSpace=wrap;html=1;fillColor=${promptBarBg};strokeColor=${promptBarBorder};strokeWidth=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="128" y="906" width="1386" height="36" as="geometry" />
        </mxCell>

        <!-- ========================================================================= -->
        <!-- FOOTER BRAND PILL                                                         -->
        <!-- ========================================================================= -->
        <mxCell id="footer_pill" value="&lt;div style=&quot;display:flex;align-items:center;justify-content:center;gap:10px;font-family:Inter,sans-serif;&quot;&gt;&lt;b style=&quot;color:#FFFFFF;font-size:12px;letter-spacing:0.8px;&quot;&gt;OPEN KNOWLEDGE ARCHITECTURE&lt;/b&gt;&lt;span style=&quot;color:#EA580C;font-size:14px;&quot;&gt;&amp;bull;&lt;/span&gt;&lt;span style=&quot;color:#E2E8F0;font-size:12px;&quot;&gt;w3c.org/RDF &amp;bull; okfn.org&lt;/span&gt;&lt;/div&gt;" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#1E293B;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="540" y="968" width="520" height="42" as="geometry" />
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
