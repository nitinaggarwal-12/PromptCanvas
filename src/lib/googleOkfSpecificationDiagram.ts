/**
 * 📘 Google Open Knowledge Format (OKF) Specification & Comparison Blueprint
 * 
 * 100% High-Craft Visual Parity with Google Cloud Official Infographic:
 * - Column 1: Fragmented Knowledge Before OKF (Unstable Links & Struggling AI Agents)
 * - Column 2: What is Google OKF? (Markdown, Files & Directories, YAML Frontmatter Spec)
 * - Column 3: Structured Knowledge After OKF (File System Graph & Traversable Knowledge Graph)
 * - Master Top Banner & Footer: "PRODUCER INDEPENDENCE | CONSUMER INDEPENDENCE | FORMAT, NOT PLATFORM"
 */

export interface GoogleOkfDiagramOptions {
  theme?: 'light' | 'dark';
}

export function generateGoogleOkfSpecificationXml(options: GoogleOkfDiagramOptions = {}): string {
  const isDark = options.theme === 'dark';
  const bg = isDark ? '#0F172A' : '#FFFFFF';
  const cardBg = isDark ? '#1E293B' : '#FFFFFF';
  const textDark = isDark ? '#F8FAFC' : '#0F172A';

  const c: string[] = [];
  let idCounter = 100;
  const nid = () => `okf_${idCounter++}`;

  const E = (s: string) =>
    (s || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');

  const node = (id: string, val: string, x: number, y: number, w: number, h: number, style: string) => {
    c.push(
      `<mxCell id="${id}" value="${E(val)}" style="rounded=1;whiteSpace=wrap;html=1;${style}" vertex="1" parent="1">` +
      `<mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/>` +
      `</mxCell>`
    );
  };

  const line = (
    id: string,
    val: string,
    sourceId: string,
    targetId: string,
    exitX: number,
    exitY: number,
    entryX: number,
    entryY: number,
    style: string,
    pts?: { x: number; y: number }[]
  ) => {
    let ptsXml = '';
    if (pts && pts.length > 0) {
      ptsXml = `<Array as="points">${pts.map(p => `<mxPoint x="${p.x}" y="${p.y}"/>`).join('')}</Array>`;
    }
    const geomXml = `<mxGeometry relative="1" as="geometry">${ptsXml}</mxGeometry>`;

    c.push(
      `<mxCell id="${id}" value="${E(val)}" edge="1" parent="1" source="${sourceId}" target="${targetId}" style="rounded=0;html=1;${style}">` +
      geomXml +
      `</mxCell>`
    );
  };

  // =========================================================================
  // 1. MASTER TOP HEADER BANNER (x=24, y=16, w=1552, h=56)
  // =========================================================================
  node(
    "hdr_banner",
    `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-family:'Google Sans',Roboto,system-ui,sans-serif;">
      <div style="font-size:26px;font-weight:900;color:#FFFFFF;letter-spacing:1px;text-transform:uppercase;">
        GOOGLE OKF: OPEN KNOWLEDGE FORMAT
      </div>
    </div>`,
    24,
    16,
    1552,
    56,
    "fillColor=#1D4ED8;strokeColor=#1E40AF;strokeWidth=1.5;rounded=1;arcSize=10;shadow=1;"
  );

  // =========================================================================
  // 2. THREE MAJOR SECTION HEADERS (y=84, h=42)
  // =========================================================================
  // Col 1 Header: FRAGMENTED KNOWLEDGE BEFORE OKF (x=24, w=490)
  node(
    "hdr_col1",
    `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-family:'Google Sans',Roboto,system-ui,sans-serif;">
      <div style="font-size:13px;font-weight:800;color:#FFFFFF;letter-spacing:0.5px;text-transform:uppercase;">
        FRAGMENTED KNOWLEDGE BEFORE OKF
      </div>
    </div>`,
    24,
    84,
    490,
    42,
    "fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;rounded=1;arcSize=6;"
  );

  // Col 2 Header: WHAT IS GOOGLE OKF? (x=530, w=540)
  node(
    "hdr_col2",
    `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-family:'Google Sans',Roboto,system-ui,sans-serif;">
      <div style="font-size:13px;font-weight:800;color:#FFFFFF;letter-spacing:0.5px;text-transform:uppercase;">
        WHAT IS GOOGLE OKF?
      </div>
    </div>`,
    530,
    84,
    540,
    42,
    "fillColor=#1D4ED8;strokeColor=#1E40AF;strokeWidth=1;rounded=1;arcSize=6;"
  );

  // Col 3 Header: STRUCTURED KNOWLEDGE AFTER OKF (x=1086, w=490)
  node(
    "hdr_col3",
    `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-family:'Google Sans',Roboto,system-ui,sans-serif;">
      <div style="font-size:13px;font-weight:800;color:#FFFFFF;letter-spacing:0.5px;text-transform:uppercase;">
        STRUCTURED KNOWLEDGE AFTER OKF
      </div>
    </div>`,
    1086,
    84,
    490,
    42,
    "fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;rounded=1;arcSize=6;"
  );

  // Chevron Connector Arrows between Column Headers
  node(
    "arr_ch1",
    `<div style="font-size:20px;color:#93C5FD;font-weight:bold;text-align:center;">▶</div>`,
    514,
    92,
    16,
    26,
    "strokeColor=none;fillColor=none;align=center;verticalAlign=middle;"
  );
  node(
    "arr_ch2",
    `<div style="font-size:20px;color:#93C5FD;font-weight:bold;text-align:center;">▶</div>`,
    1070,
    92,
    16,
    26,
    "strokeColor=none;fillColor=none;align=center;verticalAlign=middle;"
  );

  // =========================================================================
  // 3. COLUMN 1 CONTENT: FRAGMENTED SPRAWL (x=24, w=490, y=138..680)
  // =========================================================================
  // Container Frame
  node(
    "frame_col1",
    "",
    24,
    136,
    490,
    544,
    "fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1.5;rounded=1;arcSize=8;shadow=0;"
  );

  // Fragmented Sources Nodes
  node(
    "src_metadata",
    `<div style="padding:8px;text-align:center;font-family:'Google Sans',Roboto,sans-serif;">
      <div style="font-size:22px;">⚙️</div>
      <div style="font-size:10.5px;font-weight:800;color:#1E293B;">METADATA CATALOG</div>
    </div>`,
    44,
    155,
    115,
    64,
    "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;shadow=1;"
  );

  node(
    "src_apis",
    `<div style="padding:8px;text-align:center;font-family:'Google Sans',Roboto,sans-serif;">
      <div style="font-size:11px;font-weight:800;color:#1E293B;margin-top:8px;">PROPRIETARY<br/>APIS</div>
    </div>`,
    205,
    155,
    115,
    64,
    "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;shadow=1;"
  );

  node(
    "src_wiki",
    `<div style="padding:8px;text-align:center;font-family:'Google Sans',Roboto,sans-serif;">
      <div style="font-size:22px;">📂</div>
      <div style="font-size:10.5px;font-weight:800;color:#1E293B;">WIKI &amp; SHARED DRIVES</div>
    </div>`,
    365,
    155,
    125,
    64,
    "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;shadow=1;"
  );

  node(
    "src_code",
    `<div style="padding:8px;text-align:center;font-family:'Google Sans',Roboto,sans-serif;">
      <div style="font-size:18px;">💻</div>
      <div style="font-size:10.5px;font-weight:800;color:#1E293B;">CODE COMMENTS &amp; DOCSTRINGS</div>
    </div>`,
    44,
    275,
    135,
    68,
    "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;shadow=1;"
  );

  node(
    "src_tribal",
    `<div style="padding:8px;text-align:center;font-family:'Google Sans',Roboto,sans-serif;">
      <div style="font-size:22px;">👤❓</div>
      <div style="font-size:10.5px;font-weight:800;color:#1E293B;">TRIBAL KNOWLEDGE</div>
    </div>`,
    355,
    275,
    135,
    68,
    "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;shadow=1;"
  );

  // Tangled Unstable Links Knot (Center)
  node(
    "knot_unstable",
    `<div style="padding:8px;text-align:center;font-family:'Google Sans',Roboto,sans-serif;">
      <div style="font-size:20px;">🔗</div>
      <div style="font-size:10.5px;font-weight:800;color:#DC2626;">UNSTABLE LINKS</div>
    </div>`,
    195,
    275,
    135,
    64,
    "fillColor=#FEF2F2;strokeColor=#F87171;strokeWidth=1.5;rounded=1;shadow=1;"
  );

  // Tangled Connection Lines
  line(nid(), '', 'src_metadata', 'knot_unstable', 0.5, 1, 0.2, 0, 'strokeColor=#EF4444;strokeWidth=1.5;dashed=1;');
  line(nid(), '', 'src_apis', 'knot_unstable', 0.5, 1, 0.5, 0, 'strokeColor=#EF4444;strokeWidth=1.5;dashed=1;');
  line(nid(), '', 'src_wiki', 'knot_unstable', 0.5, 1, 0.8, 0, 'strokeColor=#EF4444;strokeWidth=1.5;dashed=1;');
  line(nid(), '', 'src_code', 'knot_unstable', 1, 0.5, 0, 0.5, 'strokeColor=#EF4444;strokeWidth=1.5;dashed=1;');
  line(nid(), '', 'src_tribal', 'knot_unstable', 0, 0.5, 1, 0.5, 'strokeColor=#EF4444;strokeWidth=1.5;dashed=1;');

  // Distressed AI Agent Card (Bottom of Col 1)
  node(
    "card_struggling_agent",
    `<div style="padding:12px;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:'Google Sans',Roboto,sans-serif;">
      <div style="font-size:32px;">🤖❓</div>
      <div style="font-size:13px;font-weight:800;color:#1E293B;margin-top:4px;">AI AGENT</div>
      <div style="font-size:10.5px;font-weight:700;color:#DC2626;margin-top:4px;">AI AGENTS struggle to find and connect information from incompatible sources</div>
    </div>`,
    44,
    440,
    450,
    110,
    "fillColor=#FFFFFF;strokeColor=#FCA5A5;strokeWidth=2;rounded=1;shadow=1;"
  );
  line(nid(), '', 'knot_unstable', 'card_struggling_agent', 0.5, 1, 0.5, 0, 'strokeColor=#DC2626;strokeWidth=2;dashed=1;');

  // Col 1 Caption
  node(
    "cap_col1",
    `<div style="text-align:center;font-size:10px;color:#64748B;font-family:'Google Sans',Roboto,sans-serif;font-weight:600;">
      Proprietary silos, broken URLs, unstructured PDFs and tribal docs cause context starvation
    </div>`,
    44,
    580,
    450,
    40,
    "strokeColor=none;fillColor=none;align=center;"
  );

  // =========================================================================
  // 4. COLUMN 2 CONTENT: WHAT IS GOOGLE OKF? (x=530, w=540, y=138..680)
  // =========================================================================
  // Container Frame
  node(
    "frame_col2",
    "",
    530,
    136,
    540,
    544,
    "fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.5;rounded=1;arcSize=8;shadow=0;"
  );

  // 3 Pill Badges (Left Column of Col 2)
  node(
    "pill_markdown",
    `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-family:'Google Sans',Roboto,sans-serif;">
      <div style="font-size:11.5px;font-weight:800;color:#FFFFFF;text-align:center;">
        JUST MARKDOWN<br/><span style="font-size:10px;opacity:0.9;">(.md)</span>
      </div>
    </div>`,
    550,
    170,
    130,
    64,
    "fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;rounded=1;arcSize=8;shadow=1;"
  );

  node(
    "pill_files",
    `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-family:'Google Sans',Roboto,sans-serif;">
      <div style="font-size:11.5px;font-weight:800;color:#FFFFFF;text-align:center;">
        JUST FILES &amp;<br/><span style="font-size:10px;opacity:0.9;">DIRECTORIES</span>
      </div>
    </div>`,
    550,
    255,
    130,
    64,
    "fillColor=#16A34A;strokeColor=#15803D;strokeWidth=1;rounded=1;arcSize=8;shadow=1;"
  );

  node(
    "pill_yaml",
    `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-family:'Google Sans',Roboto,sans-serif;">
      <div style="font-size:11.5px;font-weight:800;color:#FFFFFF;text-align:center;">
        JUST YAML<br/><span style="font-size:10px;opacity:0.9;">FRONTMATTER</span>
      </div>
    </div>`,
    550,
    340,
    130,
    64,
    "fillColor=#D97706;strokeColor=#B45309;strokeWidth=1;rounded=1;arcSize=8;shadow=1;"
  );

  // YAML Frontmatter Code Specification Card (Right of Col 2)
  node(
    "card_yaml_spec",
    `<div style="padding:10px;font-family:'SF Pro Text','Roboto Mono',Menlo,monospace;font-size:9.5px;line-height:1.45;color:#0F172A;text-align:left;">
      <div style="font-size:11px;font-weight:800;color:#1D4ED8;margin-bottom:6px;font-family:'Google Sans',Roboto,sans-serif;">
        CONCEPT: WEEKLY_ACTIVE_USERS.md
      </div>
      <div style="color:#64748B;">---</div>
      <div><span style="color:#2563EB;font-weight:700;">type:</span> metric</div>
      <div><span style="color:#2563EB;font-weight:700;">title:</span> Weekly Active Users</div>
      <div><span style="color:#2563EB;font-weight:700;">description:</span> Active users in last 7 days</div>
      <div><span style="color:#2563EB;font-weight:700;">resource:</span> <span style="color:#059669;">bigquery://project/dataset/users</span></div>
      <div><span style="color:#2563EB;font-weight:700;">tags:</span> [product, retention]</div>
      <div><span style="color:#2563EB;font-weight:700;">timestamp:</span> 2024-07-25T10:00:00Z</div>
      <div><span style="color:#2563EB;font-weight:700;">dependencies:</span> [<span style="color:#D97706;">tables/user_events.md</span>]</div>
      <div style="color:#64748B;">---</div>
      <div style="margin-top:4px;font-weight:800;color:#0F172A;"># Weekly Active Users</div>
      <div style="color:#475569;">This metric uses the \`user_events\` table...</div>
      <div style="font-weight:700;color:#1E293B;margin-top:2px;">## Business Logic</div>
      <div style="color:#64748B;">SELECT count(distinct user_id)...</div>
    </div>`,
    700,
    160,
    350,
    310,
    "fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.5;rounded=1;shadow=1;"
  );

  // Col 2 Bottom Value Proposition Box
  node(
    "box_col2_val",
    `<div style="padding:10px 14px;text-align:center;font-family:'Google Sans',Roboto,sans-serif;">
      <div style="font-size:12px;font-weight:800;color:#1E40AF;">
        A structured, portable format for representing context, accessible to both humans and machines
      </div>
      <div style="font-size:9.5px;color:#475569;margin-top:4px;">
        Zero vendor lock-in • Git version-controlled • Seamless LLM ingestion
      </div>
    </div>`,
    550,
    490,
    500,
    70,
    "fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.5;rounded=1;shadow=1;"
  );

  // =========================================================================
  // 5. COLUMN 3 CONTENT: STRUCTURED KNOWLEDGE AFTER OKF (x=1086, w=490)
  // =========================================================================
  // Container Frame
  node(
    "frame_col3",
    "",
    1086,
    136,
    490,
    544,
    "fillColor=#F0FDF4;strokeColor=#BBF7D0;strokeWidth=1.5;rounded=1;arcSize=8;shadow=0;"
  );

  // OKF Bundle File Tree (Top of Col 3)
  node(
    "card_okf_bundle",
    `<div style="padding:10px 14px;text-align:left;font-family:'Google Sans',Roboto,sans-serif;">
      <div style="display:flex;align-items:center;justify-content:space-between;">
        <span style="font-size:11.5px;font-weight:800;color:#166534;">📁 OKF BUNDLE</span>
        <span style="font-size:9px;font-weight:700;background:#DCFCE7;color:#15803D;padding:2px 6px;border-radius:4px;">FILE SYSTEM GRAPH</span>
      </div>
      <div style="font-family:'Roboto Mono',monospace;font-size:9px;color:#334155;margin-top:6px;line-height:1.5;">
        ├── 📁 tables/ (user_events.md, transactions.md)<br/>
        ├── 📁 metrics/ (weekly_active_users.md, ltv.md)<br/>
        ├── 📁 processes/ (retention_playbook.md)<br/>
        └── 📄 index.md
      </div>
    </div>`,
    1106,
    155,
    450,
    105,
    "fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.5;rounded=1;shadow=1;"
  );

  // Traversable Knowledge Graph Box (Bottom of Col 3)
  node(
    "card_graph_box",
    `<div style="padding:12px;text-align:center;font-family:'Google Sans',Roboto,sans-serif;">
      <div style="font-size:12px;font-weight:800;color:#15803D;">
        TRAVERSABLE KNOWLEDGE GRAPH
      </div>
    </div>`,
    1106,
    280,
    450,
    275,
    "fillColor=#FFFFFF;strokeColor=#4ADE80;strokeWidth=1.5;rounded=1;shadow=1;"
  );

  // Graph Nodes inside Col 3
  node(
    "gn_wau",
    `<div style="font-size:9px;font-weight:800;color:#1E40AF;padding:4px 6px;">Weekly<br/>Active Users</div>`,
    1120,
    325,
    85,
    40,
    "fillColor=#DBEAFE;strokeColor=#3B82F6;strokeWidth=1.2;rounded=1;shadow=1;"
  );

  node(
    "gn_events",
    `<div style="font-size:9px;font-weight:800;color:#166534;padding:4px 6px;">Tables/<br/>User Events</div>`,
    1240,
    325,
    95,
    40,
    "fillColor=#DCFCE7;strokeColor=#22C55E;strokeWidth=1.2;rounded=1;shadow=1;"
  );

  node(
    "gn_retention",
    `<div style="font-size:9px;font-weight:800;color:#92400E;padding:4px 6px;">Retention<br/>Playbook</div>`,
    1440,
    325,
    95,
    40,
    "fillColor=#FEF3C7;strokeColor=#F59E0B;strokeWidth=1.2;rounded=1;shadow=1;"
  );

  node(
    "gn_index",
    `<div style="font-size:9.5px;font-weight:800;color:#0F172A;padding:4px 6px;">Index.md</div>`,
    1245,
    385,
    85,
    36,
    "fillColor=#F1F5F9;strokeColor=#64748B;strokeWidth=1.2;rounded=1;shadow=1;"
  );

  node(
    "gn_api",
    `<div style="font-size:9px;font-weight:800;color:#6B21A8;padding:4px 6px;">Active<br/>Users API</div>`,
    1150,
    425,
    85,
    40,
    "fillColor=#F3E8FF;strokeColor=#A855F7;strokeWidth=1.2;rounded=1;shadow=1;"
  );

  // Graph Connectors
  line(nid(), '', 'gn_wau', 'gn_events', 1, 0.5, 0, 0.5, 'strokeColor=#22C55E;strokeWidth=1.5;endArrow=classic;');
  line(nid(), '', 'gn_events', 'gn_retention', 1, 0.5, 0, 0.5, 'strokeColor=#22C55E;strokeWidth=1.5;endArrow=classic;');
  line(nid(), '', 'gn_events', 'gn_index', 0.5, 1, 0.5, 0, 'strokeColor=#64748B;strokeWidth=1.5;endArrow=classic;');
  line(nid(), '', 'gn_index', 'gn_api', 0, 1, 1, 0, 'strokeColor=#A855F7;strokeWidth=1.5;endArrow=classic;');
  line(nid(), '', 'gn_wau', 'gn_api', 0.5, 1, 0.5, 0, 'strokeColor=#3B82F6;strokeWidth=1.5;endArrow=classic;');

  // Human & AI Agent Collaboration Card
  node(
    "card_collab",
    `<div style="padding:6px;display:flex;align-items:center;justify-content:center;gap:12px;font-family:'Google Sans',Roboto,sans-serif;">
      <span style="font-size:22px;">👤</span>
      <span style="font-size:11px;font-weight:800;color:#15803D;">EASY TRAVERSAL FOR HUMANS AND AI AGENTS</span>
      <span style="font-size:22px;">🤖🔍</span>
    </div>`,
    1120,
    485,
    420,
    48,
    "fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=1.5;rounded=1;shadow=1;"
  );

  // Col 3 Caption
  node(
    "cap_col3",
    `<div style="text-align:center;font-size:10.5px;color:#15803D;font-family:'Google Sans',Roboto,sans-serif;font-weight:700;">
      Cross-links form a traversable graph, enabling efficient context retrieval
    </div>`,
    1106,
    580,
    450,
    36,
    "strokeColor=none;fillColor=none;align=center;"
  );

  // =========================================================================
  // 6. MASTER BOTTOM FOOTER BAR (x=24, y=695, w=1552, h=42)
  // =========================================================================
  node(
    "ftr_banner",
    `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:space-between;padding:0 24px;box-sizing:border-box;font-family:'Google Sans',Roboto,system-ui,sans-serif;">
      <div style="font-size:13px;font-weight:800;color:#1E40AF;letter-spacing:0.8px;text-transform:uppercase;">
        PRODUCER INDEPENDENCE &nbsp;|&nbsp; CONSUMER INDEPENDENCE &nbsp;|&nbsp; FORMAT, NOT PLATFORM
      </div>
      <div style="display:flex;align-items:center;gap:8px;">
        <span style="font-size:13px;font-weight:800;color:#4285F4;">Google</span>
        <span style="font-size:13px;font-weight:700;color:#5F6368;">Cloud</span>
      </div>
    </div>`,
    24,
    695,
    1552,
    42,
    "fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.5;rounded=1;arcSize=6;shadow=0;"
  );

  return `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="embed.diagrams.net">
  <diagram id="google_okf_specification" name="Google OKF: Open Knowledge Format Specification">
    <mxGraphModel dx="1600" dy="750" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="750" background="${bg}" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${c.join('\n        ')}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
