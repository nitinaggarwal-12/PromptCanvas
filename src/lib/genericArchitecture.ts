/**
 * 🌐 Cloud-Agnostic / Generic Enterprise Architecture Generator (Option 1)
 * 
 * 100% Industry-Standard Architectural & Routing Standards:
 * - Vendor-neutral iconography & enterprise terminology
 * - NO BACKTRACKING: Clean Ingress Fork (Fast-Path UP, Orchestrator DOWN)
 * - DUAL DATA STORE: Analytical Lakehouse (OLAP) & Transactional DB (OLTP)
 * - GOVERNANCE: Standard Tool Execution + Privileged HITL Approval Gate
 * - ASYNC RAG: Clearly annotated Object Storage ingestion pipeline
 * - CLOSED LOOP: Physical return vector from Telemetry & Audit -> Orchestrator
 * - 100% Anchor-Locked Laser-Straight Orthogonal Manhattan Connectors (ZERO SLANTS)
 * - Master 16:9 Ultra-Widescreen Canvas (1600x750)
 */

export interface GenericArchitectureOptions {
  projectName?: string;
  useCaseName?: string;
  projectTitle?: string;
  prompt?: string;
  theme?: 'light' | 'dark';
}

export function generateGenericArchitecture(options: GenericArchitectureOptions = {}): string {
  const {
    projectName = 'Enterprise System',
    projectTitle = 'Enterprise System — System Architecture',
    theme = 'light'
  } = options;

  const isDark = theme === 'dark';
  const bg = isDark ? '#0F172A' : '#FAFAFA';
  const cardBg = isDark ? '#1E293B' : '#FFFFFF';
  const cardBorder = isDark ? '#334155' : '#E2E8F0';
  const textDark = isDark ? '#F8FAFC' : '#0F172A';
  
  const c: string[] = [];
  let idCounter = 300;
  const nid = () => `c_${idCounter++}`;

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
    pts?: { x: number; y: number }[],
    lblX?: number,
    lblY?: number
  ) => {
    const labelStyle = val ? `fontColor=#0F172A;fontStyle=1;fontSize=8;fontFamily=system-ui,-apple-system,sans-serif;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=3;` : "";
    let ptsXml = '';
    if (pts && pts.length > 0) {
      ptsXml = `<Array as="points">${pts.map(p => `<mxPoint x="${p.x}" y="${p.y}"/>`).join('')}</Array>`;
    }
    const geomXml = (lblX !== undefined && lblY !== undefined)
      ? `<mxGeometry x="${lblX}" y="${lblY}" relative="1" as="geometry">${ptsXml}</mxGeometry>`
      : `<mxGeometry relative="1" as="geometry">${ptsXml}</mxGeometry>`;

    c.push(
      `<mxCell id="${id}" value="${E(val)}" edge="1" parent="1" source="${sourceId}" target="${targetId}" style="rounded=0;html=1;edgeStyle=none;exitX=${exitX};exitY=${exitY};entryX=${entryX};entryY=${entryY};exitPerimeter=0;entryPerimeter=0;${labelStyle}${style}">` +
      geomXml +
      `</mxCell>`
    );
  };

  // =========================================================================
  // 1. MASTER HEADER & BRAND (x=24, y=14..60)
  // =========================================================================
  const mainTitle = projectName === "Enterprise System" ? "Agentic AI Harness" : `${projectName} — Agentic AI Harness`;
  node(
    "lbl_hdr_main",
    `<div style="width:100%;padding:4px 8px;font-family:system-ui,-apple-system,sans-serif;">
      <div style="font-size:22px;font-weight:800;color:${textDark};letter-spacing:-0.4px;">${mainTitle}</div>
      <div style="font-size:11.5px;font-weight:600;color:#4F46E5;margin-top:2px;">Cloud-Agnostic Reference Flow: Perimeter Ingress → Intent Planning → Parallel Specialist Services → AI Core → Safety Gate</div>
    </div>`,
    24,
    14,
    1552,
    46,
    "strokeColor=none;fillColor=none;align=left;verticalAlign=middle;"
  );

  // =========================================================================
  // 2. SIX STAGE PHASE HEADERS (x=24..1576, y=68..94)
  // =========================================================================
  const stages = [
    { num: '1', t: 'Perimeter & Ingress', w: 200, x: 24, c: '#4F46E5' },
    { num: '2', t: 'Planning & Memory', w: 215, x: 260, c: '#4F46E5' },
    { num: '3', t: 'Service Swarm', w: 195, x: 510, c: '#4F46E5' },
    { num: '4', t: 'Data & Integration', w: 235, x: 735, c: '#4F46E5' },
    { num: '5', t: 'LLM Reasoning Core', w: 230, x: 1000, c: '#16A34A' },
    { num: '6', t: 'Safety & Delivery', w: 230, x: 1265, c: '#16A34A' }
  ];

  stages.forEach(st => {
    node(
      `lbl_stage_${st.num}`,
      `<div style="text-align:center;padding:2px 6px;font-family:system-ui,-apple-system,sans-serif;">
        <span style="font-size:11px;font-weight:800;color:${st.c};">${st.num}.</span>
        <span style="font-size:11px;font-weight:800;color:#334155;margin-left:4px;letter-spacing:0.2px;">${st.t.toUpperCase()}</span>
      </div>`,
      st.x,
      68,
      st.w,
      26,
      "strokeColor=none;fillColor=none;align=center;verticalAlign=middle;"
    );
  });

  // =========================================================================
  // 3. COLUMN 1: PERIMETER & INGRESS (x=24, w=200)
  // =========================================================================
  node(
    "n_start_users",
    `<div style="padding:10px;text-align:center;font-family:system-ui,-apple-system,sans-serif;">
      <div style="font-size:22px;">💻</div>
      <div style="font-size:11.5px;font-weight:800;color:#0F172A;margin-top:2px;">Client &amp; API Ingress</div>
      <div style="font-size:8.5px;color:#64748B;">Web / Mobile Apps, REST, Microservices</div>
    </div>`,
    24,
    105,
    200,
    72,
    `fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1.2;shadow=1;rounded=1;arcSize=8;`
  );

  node(
    "n_edge_armor",
    `<div style="padding:10px;text-align:center;font-family:system-ui,-apple-system,sans-serif;">
      <div style="font-size:20px;">🛡️</div>
      <div style="font-size:11.5px;font-weight:800;color:#1E3A8A;margin-top:2px;">WAF &amp; Traffic Gate</div>
      <div style="font-size:8.5px;color:#475569;">Rate Limiting • DDoS Protection</div>
    </div>`,
    24,
    205,
    200,
    72,
    `fillColor=${cardBg};strokeColor=#93C5FD;strokeWidth=1.5;shadow=1;rounded=1;arcSize=8;`
  );

  node(
    "n_edge_iap",
    `<div style="padding:10px;text-align:center;font-family:system-ui,-apple-system,sans-serif;">
      <div style="font-size:20px;">🔑</div>
      <div style="font-size:11.5px;font-weight:800;color:#0369A1;margin-top:2px;">API Gateway &amp; Auth</div>
      <div style="font-size:8.5px;color:#475569;">OAuth2, JWT &amp; Role-Based Access</div>
    </div>`,
    24,
    305,
    200,
    72,
    `fillColor=${cardBg};strokeColor=#38BDF8;strokeWidth=1.5;shadow=1;rounded=1;arcSize=8;`
  );

  node(
    "n_cloud_dlp",
    `<div style="padding:10px;text-align:center;font-family:system-ui,-apple-system,sans-serif;">
      <div style="font-size:20px;">🔒</div>
      <div style="font-size:11.5px;font-weight:800;color:#0F766E;margin-top:2px;">Data Sanitization &amp; PII</div>
      <div style="font-size:8.5px;color:#0D9488;font-weight:700;">Sensitive Token Redaction &amp; Masking</div>
    </div>`,
    24,
    405,
    200,
    72,
    `fillColor=${cardBg};strokeColor=#2DD4BF;strokeWidth=1.5;shadow=1;rounded=1;arcSize=8;`
  );

  line(nid(), '', 'n_start_users', 'n_edge_armor', 0.5, 1, 0.5, 0, 'strokeColor=#4F46E5;strokeWidth=1.5;endArrow=block;endSize=4;');
  line(nid(), '', 'n_edge_armor', 'n_edge_iap', 0.5, 1, 0.5, 0, 'strokeColor=#4F46E5;strokeWidth=1.5;endArrow=block;endSize=4;');
  line(nid(), '', 'n_edge_iap', 'n_cloud_dlp', 0.5, 1, 0.5, 0, 'strokeColor=#0D9488;strokeWidth=1.5;endArrow=block;endSize=4;');

  // =========================================================================
  // 4. COLUMN 2: PLANNING, ROUTING & MEMORY (x=260, w=215)
  // =========================================================================

  // DIRECT FAST-PATH (Top, y=105)
  node(
    "n_fast_path",
    `<div style="padding:10px;text-align:center;font-family:system-ui,-apple-system,sans-serif;">
      <div style="font-size:22px;">⚡</div>
      <div style="font-size:11.5px;font-weight:800;color:#15803D;margin-top:2px;">Direct Fast-Path</div>
      <div style="font-size:8.5px;color:#166534;font-weight:700;">Single-Turn Cached Execution</div>
    </div>`,
    260,
    105,
    215,
    72,
    `fillColor=${cardBg};strokeColor=#86EFAC;strokeWidth=1.5;shadow=1;rounded=1;arcSize=8;`
  );

  // TASK GRAPH ROUTER (Central Fork, y=225)
  node(
    "gate_task_type",
    `<div style="padding:10px;text-align:center;font-family:system-ui,-apple-system,sans-serif;">
      <div style="font-size:20px;">🎯</div>
      <div style="font-size:11.5px;font-weight:800;color:#5B21B6;margin-top:2px;">Task Graph Router</div>
      <div style="font-size:8px;color:#6B21A8;font-weight:600;">Complexity &amp; Intent Classifier</div>
    </div>`,
    260,
    225,
    215,
    72,
    `fillColor=${cardBg};strokeColor=#A855F7;strokeWidth=1.5;shadow=1;rounded=1;arcSize=8;`
  );

  // Sanitized Prompt routes cleanly into Router from DLP
  line(nid(), 'Sanitized Prompt', 'n_cloud_dlp', 'gate_task_type', 1, 0.5, 0, 0.5, 'strokeColor=#0D9488;strokeWidth=1.5;endArrow=block;endSize=4;', [
    { x: 238, y: 441 },
    { x: 238, y: 261 }
  ], -0.6, -10);

  // ROUTER FORK 1: Simple Prompt -> Steps UP into Fast-Path
  line(nid(), 'Simple Intent', 'gate_task_type', 'n_fast_path', 0.5, 0, 0.5, 1, 'strokeColor=#16A34A;strokeWidth=1.5;endArrow=block;endSize=4;');

  // DAG WORKFLOW PLANNER / ORCHESTRATOR (Below Router, y=345)
  node(
    "n_supervisor",
    `<div style="padding:10px;text-align:center;font-family:system-ui,-apple-system,sans-serif;">
      <div style="font-size:22px;">🧩</div>
      <div style="font-size:12px;font-weight:800;color:#5B21B6;margin-top:2px;">Task Orchestrator</div>
      <div style="font-size:8.5px;color:#6B21A8;font-weight:700;">DAG Workflow Planner &amp; Router</div>
    </div>`,
    260,
    345,
    215,
    80,
    `fillColor=${cardBg};strokeColor=#A855F7;strokeWidth=1.8;shadow=1;rounded=1;arcSize=8;`
  );

  // ROUTER FORK 2: Complex Task -> Steps DOWN into Orchestrator
  line(nid(), 'Multi-Step Intent', 'gate_task_type', 'n_supervisor', 0.5, 1, 0.5, 0, 'strokeColor=#7C3AED;strokeWidth=1.5;endArrow=block;endSize=4;');

  // CONTEXT & SESSION MEMORY (Bottom, y=475)
  node(
    "n_memory",
    `<div style="padding:8px 10px;text-align:center;font-family:system-ui,-apple-system,sans-serif;">
      <div style="font-size:18px;">🧠</div>
      <div style="font-size:10.5px;font-weight:800;color:#B91C1C;margin-top:2px;">Context &amp; Session Memory</div>
      <div style="font-size:8px;color:#64748B;">In-Memory Store • Long-Term Persistence</div>
    </div>`,
    260,
    475,
    215,
    64,
    `fillColor=${cardBg};strokeColor=#FCA5A5;strokeWidth=1;shadow=1;rounded=1;arcSize=8;`
  );

  line(nid(), 'State Sync', 'n_supervisor', 'n_memory', 0.5, 1, 0.5, 0, 'strokeColor=#DC2626;strokeWidth=1.5;dashed=1;dashPattern=3 3;endArrow=classic;startArrow=classic;endSize=4;startSize=4;');

  // =========================================================================
  // 5. COLUMN 3: 3 PARALLEL SPECIALIST SERVICES (x=510, w=195)
  // =========================================================================

  // LANE 1: KNOWLEDGE RETRIEVAL (y=155)
  node(
    "n_rag_agent",
    `<div style="padding:10px 12px;text-align:left;font-family:system-ui,-apple-system,sans-serif;">
      <div style="display:flex;align-items:center;gap:6px;">
        <span style="font-size:18px;">🔍</span>
        <span style="font-size:11.5px;font-weight:800;color:#0369A1;">Knowledge Retrieval</span>
      </div>
      <div style="font-size:8.5px;color:#64748B;margin-top:4px;">Semantic Document Search</div>
    </div>`,
    510,
    155,
    195,
    72,
    `fillColor=${cardBg};strokeColor=#38BDF8;strokeWidth=1.5;shadow=1;rounded=1;arcSize=8;`
  );

  // LANE 2: STRUCTURED DATA QUERY (y=285)
  node(
    "n_sql_agent",
    `<div style="padding:10px 12px;text-align:left;font-family:system-ui,-apple-system,sans-serif;">
      <div style="display:flex;align-items:center;gap:6px;">
        <span style="font-size:18px;">📊</span>
        <span style="font-size:11.5px;font-weight:800;color:#D97706;">Structured Data Query</span>
      </div>
      <div style="font-size:8.5px;color:#64748B;margin-top:4px;">SQL &amp; Analytics Extraction</div>
    </div>`,
    510,
    285,
    195,
    72,
    `fillColor=${cardBg};strokeColor=#FBBF24;strokeWidth=1.5;shadow=1;rounded=1;arcSize=8;`
  );

  // LANE 3: ACTION & TOOL ENGINE (y=415)
  node(
    "n_tool_agent",
    `<div style="padding:10px 12px;text-align:left;font-family:system-ui,-apple-system,sans-serif;">
      <div style="display:flex;align-items:center;gap:6px;">
        <span style="font-size:18px;">⚙️</span>
        <span style="font-size:11.5px;font-weight:800;color:#0F766E;">Action &amp; Tool Engine</span>
      </div>
      <div style="font-size:8.5px;color:#64748B;margin-top:4px;">API Function Execution</div>
    </div>`,
    510,
    415,
    195,
    72,
    `fillColor=${cardBg};strokeColor=#2DD4BF;strokeWidth=1.5;shadow=1;rounded=1;arcSize=8;`
  );

  // Orchestrator Dispatch Connectors (100% strict orthogonal steps)
  line(nid(), 'Parallel RAG', 'n_supervisor', 'n_rag_agent', 1, 0.25, 0, 0.5, 'strokeColor=#0284C7;strokeWidth=1.5;endArrow=block;endSize=4;', [
    { x: 492, y: 365 },
    { x: 492, y: 191 }
  ]);
  line(nid(), 'Parallel SQL', 'n_supervisor', 'n_sql_agent', 1, 0.5, 0, 0.5, 'strokeColor=#D97706;strokeWidth=1.5;endArrow=block;endSize=4;', [
    { x: 492, y: 385 },
    { x: 492, y: 321 }
  ]);
  line(nid(), 'Parallel Actions', 'n_supervisor', 'n_tool_agent', 1, 0.75, 0, 0.5, 'strokeColor=#0F766E;strokeWidth=1.5;endArrow=block;endSize=4;', [
    { x: 492, y: 405 },
    { x: 492, y: 451 }
  ]);

  // =========================================================================
  // 6. COLUMN 4: DATA SOURCES, DUAL DATABASES & GOVERNANCE (x=735, w=235)
  // =========================================================================

  // DATA SOURCE 1: VECTOR DATABASE
  node(
    "n_vector_search",
    `<div style="padding:8px 12px;text-align:left;font-family:system-ui,-apple-system,sans-serif;">
      <div style="display:flex;align-items:center;gap:6px;">
        <span style="font-size:18px;">🎯</span>
        <span style="font-size:11.5px;font-weight:800;color:#0369A1;">Vector Database</span>
      </div>
      <div style="font-size:8.5px;color:#0284C7;font-weight:700;margin-top:2px;">Embeddings &amp; Hybrid Index</div>
    </div>`,
    735,
    135,
    235,
    58,
    `fillColor=${cardBg};strokeColor=#0284C7;strokeWidth=1.5;shadow=1;rounded=1;arcSize=8;`
  );

  // ASYNC OBJECT STORAGE INGESTION
  node(
    "n_doc_ingestion",
    `<div style="padding:4px 8px;text-align:center;display:flex;align-items:center;justify-content:center;gap:6px;font-family:system-ui,-apple-system,sans-serif;">
      <span style="font-size:16px;">📑</span>
      <div style="text-align:left;">
        <div style="font-size:8.5px;font-weight:800;color:#0369A1;">Object Storage &amp; Parser</div>
        <div style="font-size:7.5px;color:#0284C7;font-weight:700;">[Async Ingestion &amp; Chunking]</div>
      </div>
    </div>`,
    735,
    201,
    235,
    36,
    `fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;shadow=0;rounded=1;arcSize=6;`
  );

  line(nid(), '', 'n_doc_ingestion', 'n_vector_search', 0.5, 0, 0.5, 1, 'strokeColor=#0284C7;strokeWidth=1.5;dashed=1;dashPattern=3 3;endArrow=block;endSize=4;');
  line(nid(), 'Embedding Query', 'n_rag_agent', 'n_vector_search', 1, 0.5, 0, 0.5, 'strokeColor=#0284C7;strokeWidth=1.5;endArrow=block;endSize=4;', [
    { x: 720, y: 191 },
    { x: 720, y: 164 }
  ]);

  // DATA SOURCE 2A: ANALYTICAL DATA WAREHOUSE (OLAP)
  node(
    "n_bigquery_dw",
    `<div style="padding:6px 10px;text-align:left;font-family:system-ui,-apple-system,sans-serif;">
      <div style="display:flex;align-items:center;gap:6px;">
        <span style="font-size:16px;">🗄️</span>
        <span style="font-size:10.5px;font-weight:800;color:#B45309;">Analytical Data Warehouse (OLAP)</span>
      </div>
      <div style="font-size:7.5px;color:#D97706;font-weight:700;">Columnar Storage &amp; Text-to-SQL</div>
    </div>`,
    735,
    260,
    235,
    44,
    `fillColor=${cardBg};strokeColor=#F59E0B;strokeWidth=1.5;shadow=1;rounded=1;arcSize=8;`
  );

  // DATA SOURCE 2B: RELATIONAL TRANSACTIONAL DB (OLTP)
  node(
    "n_spanner_db",
    `<div style="padding:6px 10px;text-align:left;font-family:system-ui,-apple-system,sans-serif;">
      <div style="display:flex;align-items:center;gap:6px;">
        <span style="font-size:16px;">💾</span>
        <span style="font-size:10.5px;font-weight:800;color:#0369A1;">Relational Database (OLTP)</span>
      </div>
      <div style="font-size:7.5px;color:#0284C7;font-weight:700;">ACID Transactions &amp; Entity State</div>
    </div>`,
    735,
    312,
    235,
    44,
    `fillColor=${cardBg};strokeColor=#38BDF8;strokeWidth=1.5;shadow=1;rounded=1;arcSize=8;`
  );

  line(nid(), 'OLAP SQL', 'n_sql_agent', 'n_bigquery_dw', 1, 0.35, 0, 0.5, 'strokeColor=#D97706;strokeWidth=1.5;endArrow=block;endSize=4;', [
    { x: 720, y: 310 },
    { x: 720, y: 282 }
  ]);
  line(nid(), 'OLTP CRUD', 'n_sql_agent', 'n_spanner_db', 1, 0.68, 0, 0.5, 'strokeColor=#0284C7;strokeWidth=1.5;endArrow=block;endSize=4;');

  // GOVERNANCE & PRIVILEGED HITL APPROVAL GATE
  node(
    "n_hitl_governance_node",
    `<div style="padding:6px 8px;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:system-ui,-apple-system,sans-serif;">
      <span style="font-size:16px;">👤</span>
      <div style="font-size:10px;font-weight:800;color:#991B1B;margin-top:2px;">HITL Approval Gate</div>
      <div style="font-size:7px;color:#DC2626;font-weight:700;">Admin Review &amp; Signoff</div>
    </div>`,
    735,
    385,
    115,
    65,
    `fillColor=${cardBg};strokeColor=#EF4444;strokeWidth=1.5;shadow=1;rounded=1;arcSize=8;`
  );

  // DATA SOURCE 3: ENTERPRISE API CONNECTORS
  node(
    "n_vertex_extensions",
    `<div style="padding:8px 10px;text-align:left;font-family:system-ui,-apple-system,sans-serif;">
      <div style="display:flex;align-items:center;gap:6px;">
        <span style="font-size:18px;">🔌</span>
        <span style="font-size:10.5px;font-weight:800;color:#0F766E;">Enterprise API Connectors</span>
      </div>
      <div style="font-size:7.5px;color:#0D9488;font-weight:700;margin-top:1px;">CRM, ERP, Billing, Webhooks</div>
    </div>`,
    865,
    385,
    140,
    65,
    `fillColor=${cardBg};strokeColor=#0D9488;strokeWidth=1.5;shadow=1;rounded=1;arcSize=8;`
  );

  // Tool Agent bifurcates: Privileged Mutation -> HITL, Standard Tool -> Direct
  line(nid(), 'Privileged', 'n_tool_agent', 'n_hitl_governance_node', 1, 0.35, 0, 0.5, 'strokeColor=#DC2626;strokeWidth=1.5;endArrow=block;endSize=4;', [
    { x: 720, y: 440 },
    { x: 720, y: 417 }
  ]);
  line(nid(), 'Approved', 'n_hitl_governance_node', 'n_vertex_extensions', 1, 0.5, 0, 0.5, 'strokeColor=#16A34A;strokeWidth=1.5;endArrow=block;endSize=4;');

  // Standard Direct Tool Call routes under HITL directly to Connectors via clear waypoint at x=855
  line(nid(), 'Standard API', 'n_tool_agent', 'n_vertex_extensions', 1, 0.75, 0, 0.85, 'strokeColor=#0D9488;strokeWidth=1.5;endArrow=block;endSize=4;', [
    { x: 720, y: 469 },
    { x: 855, y: 469 },
    { x: 855, y: 440 }
  ]);

  // =========================================================================
  // 7. COLUMN 5: FOUNDATION AI ENGINE (x=1050, w=185)
  // =========================================================================
  node(
    "n_gemini_core",
    `<div style="padding:14px 12px;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:system-ui,-apple-system,sans-serif;">
      <div style="font-size:32px;">🧠</div>
      <div style="font-size:13px;font-weight:900;color:#14532D;margin-top:4px;letter-spacing:-0.2px;">FOUNDATION AI ENGINE</div>
      <div style="font-size:8.5px;color:#166534;font-weight:700;margin-top:2px;">Reasoning, Synthesis &amp; Code Generation</div>
      <div style="font-size:7.5px;color:#4B5563;font-weight:600;margin-top:4px;">Multi-Modal Context • Chain-of-Thought</div>
    </div>`,
    1050,
    175,
    185,
    240,
    `fillColor=${cardBg};strokeColor=#22C55E;strokeWidth=2;shadow=1;rounded=1;arcSize=10;`
  );

  // 100% STRICT ORTHOGONAL DISCRETE CONNECTOR PORTS INTO AI ENGINE:
  
  // Port 1 (y=195): Fast Path Direct Prompt (Strict 90-degree Manhattan routing)
  line(nid(), 'Direct Input', 'n_fast_path', 'n_gemini_core', 1, 0.5, 0, 0.08, 'strokeColor=#16A34A;strokeWidth=1.5;endArrow=block;endSize=4;', [
    { x: 490, y: 141 },
    { x: 490, y: 96 },
    { x: 1030, y: 96 },
    { x: 1030, y: 195 }
  ]);

  // Port 2 (y=235): Vector Search Context
  line(nid(), 'RAG Context', 'n_vector_search', 'n_gemini_core', 1, 0.5, 0, 0.25, 'strokeColor=#0284C7;strokeWidth=1.5;endArrow=block;endSize=4;', [
    { x: 1020, y: 164 },
    { x: 1020, y: 235 }
  ]);

  // Port 3 (y=282): Analytical Data Records (OLAP)
  line(nid(), 'OLAP Records', 'n_bigquery_dw', 'n_gemini_core', 1, 0.5, 0, 0.45, 'strokeColor=#D97706;strokeWidth=1.5;endArrow=block;endSize=4;');

  // Port 4 (y=334): Transactional State (OLTP)
  line(nid(), 'OLTP State', 'n_spanner_db', 'n_gemini_core', 1, 0.5, 0, 0.66, 'strokeColor=#0284C7;strokeWidth=1.5;endArrow=block;endSize=4;');

  // Port 5 (y=385): Enterprise Connectors Action Payload
  line(nid(), 'Action Payload', 'n_vertex_extensions', 'n_gemini_core', 1, 0.5, 0, 0.88, 'strokeColor=#0D9488;strokeWidth=1.5;endArrow=block;endSize=4;', [
    { x: 1030, y: 417 },
    { x: 1030, y: 385 }
  ]);

  // =========================================================================
  // 8. COLUMN 6: SAFETY GUARDRAILS & STREAMED DELIVERY (x=1275, w=200)
  // =========================================================================
  node(
    "gate_factuality",
    `<div style="padding:10px 12px;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:system-ui,-apple-system,sans-serif;">
      <div style="font-size:22px;">🛡️</div>
      <div style="font-size:11.5px;font-weight:900;color:#991B1B;margin-top:2px;">Safety &amp; Factuality Gate</div>
      <div style="font-size:8px;color:#DC2626;font-weight:700;">Hallucination Filter &amp; SLA Guardrail</div>
    </div>`,
    1275,
    255,
    200,
    80,
    `fillColor=${cardBg};strokeColor=#EF4444;strokeWidth=1.5;shadow=1;rounded=1;arcSize=8;`
  );

  // Engine Output -> Safety Gate: 100% straight horizontal line at y=295
  line(nid(), 'Output Evaluation', 'n_gemini_core', 'gate_factuality', 1, 0.5, 0, 0.5, 'strokeColor=#DC2626;strokeWidth=1.5;endArrow=block;endSize=4;');

  // Self-Correction Loop: Clean orthogonal loop exiting top of Safety Gate (y=255) -> enters top of Engine (y=175)
  line(nid(), 'NO (Self-Correction • Max 3)', 'gate_factuality', 'n_gemini_core', 0.5, 0, 0.5, 0, 'strokeColor=#DC2626;strokeWidth=1.5;dashed=1;dashPattern=4 4;endArrow=block;endSize=4;', [
    { x: 1375, y: 135 },
    { x: 1142, y: 135 }
  ]);

  // STREAMED GROUNDED RESPONSE
  node(
    "n_delivery",
    `<div style="padding:10px 12px;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:system-ui,-apple-system,sans-serif;">
      <div style="font-size:22px;">✅</div>
      <div style="font-size:12px;font-weight:900;color:#14532D;margin-top:2px;">Verified Streamed Response</div>
      <div style="font-size:8.5px;color:#166534;font-weight:700;">Grounded Citations • Sub-Second Stream</div>
    </div>`,
    1275,
    380,
    200,
    76,
    `fillColor=${cardBg};strokeColor=#22C55E;strokeWidth=1.8;shadow=1;rounded=1;arcSize=8;`
  );

  // Grounded path DOWN to Streamed Delivery (100% straight vertical at x=1375)
  line(nid(), 'YES (Passed)', 'gate_factuality', 'n_delivery', 0.5, 1, 0.5, 0, 'strokeColor=#16A34A;strokeWidth=1.8;endArrow=block;endSize=4;');

  // AUDIT LOGGING & TELEMETRY
  node(
    "n_audit_logging",
    `<div style="padding:8px 10px;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:system-ui,-apple-system,sans-serif;">
      <div style="font-size:18px;">📊</div>
      <div style="font-size:10.5px;font-weight:800;color:#1E3A8A;margin-top:2px;">Audit Logging &amp; Telemetry</div>
      <div style="font-size:8px;color:#64748B;">Distributed Tracing • Cost Tracking</div>
    </div>`,
    1275,
    490,
    200,
    60,
    `fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;shadow=1;rounded=1;arcSize=8;`
  );

  // Delivery -> Logging (100% straight vertical at x=1375)
  line(nid(), '', 'n_delivery', 'n_audit_logging', 0.5, 1, 0.5, 0, 'strokeColor=#1E40AF;strokeWidth=1.5;dashed=1;dashPattern=4 4;endArrow=block;endSize=4;');

  // CLOSED-LOOP PHYSICAL RETURN VECTOR (Audit Logging -> Orchestrator via open bottom channel y=560)
  line(nid(), 'Model Eval Feedback & Tuning Loop', 'n_audit_logging', 'n_supervisor', 0, 0.5, 0, 0.75, 'strokeColor=#0D9488;strokeWidth=1.5;dashed=1;dashPattern=5 5;endArrow=block;endSize=4;', [
    { x: 1250, y: 520 },
    { x: 1250, y: 560 },
    { x: 236, y: 560 },
    { x: 236, y: 405 }
  ]);

  // =========================================================================
  // 9. BOTTOM OBSERVABILITY & GOVERNANCE FOUNDATION (x=24..1576, y=605..655)
  // =========================================================================
  node(
    "cloud_monitoring_telemetry",
    `<div style="padding:8px 12px;display:flex;align-items:center;gap:10px;font-family:system-ui,-apple-system,sans-serif;">
      <span style="font-size:20px;">📊</span>
      <div>
        <div style="font-size:10.5px;font-weight:900;color:#0369A1;">Observability &amp; APM Metrics</div>
        <div style="font-size:8px;color:#64748B;">OpenTelemetry Tracing • Latency Monitoring • Health Profiling</div>
      </div>
    </div>`,
    24,
    605,
    370,
    46,
    `fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;shadow=1;rounded=1;arcSize=6;`
  );

  node(
    "cloud_iam_vpc_security",
    `<div style="padding:8px 12px;display:flex;align-items:center;gap:10px;font-family:system-ui,-apple-system,sans-serif;">
      <span style="font-size:20px;">🔑</span>
      <div>
        <div style="font-size:10.5px;font-weight:900;color:#0369A1;">Identity &amp; Encryption Key Management</div>
        <div style="font-size:8px;color:#64748B;">Role-Based Access Control • KMS Key Rotation • Secrets Vault</div>
      </div>
    </div>`,
    408,
    605,
    375,
    46,
    `fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;shadow=1;rounded=1;arcSize=6;`
  );

  node(
    "cloud_hitl_governance",
    `<div style="padding:8px 12px;display:flex;align-items:center;gap:10px;font-family:system-ui,-apple-system,sans-serif;">
      <span style="font-size:20px;">⚖️</span>
      <div>
        <div style="font-size:10.5px;font-weight:900;color:#5B21B6;">Governance, Compliance &amp; Policy</div>
        <div style="font-size:8px;color:#64748B;">Immutable Audit Logs • Model Safety Guardrails • Data Privacy SLA</div>
      </div>
    </div>`,
    797,
    605,
    375,
    46,
    `fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;shadow=1;rounded=1;arcSize=6;`
  );

  node(
    "cloud_gitops_telemetry_deploy",
    `<div style="padding:8px 12px;display:flex;align-items:center;gap:10px;font-family:system-ui,-apple-system,sans-serif;">
      <span style="font-size:20px;">🚀</span>
      <div>
        <div style="font-size:10.5px;font-weight:900;color:#15803D;">CI/CD &amp; Infrastructure as Code</div>
        <div style="font-size:8px;color:#64748B;">Automated Canary Deployments • Zero-Downtime Rollouts</div>
      </div>
    </div>`,
    1186,
    605,
    390,
    46,
    `fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;shadow=1;rounded=1;arcSize=6;`
  );

  // Bottom Closed Feedback Return Banner
  node(
    "banner_feedback_return",
    `<div style="padding:6px 16px;background:#F0FDF4;border-radius:6px;border:1px solid #86EFAC;display:flex;align-items:center;justify-content:space-between;box-shadow:0 1px 2px rgba(0,0,0,0.04);font-family:system-ui,-apple-system,sans-serif;">
      <div style="display:flex;align-items:center;gap:8px;">
        <span style="font-size:18px;">✅</span>
        <span style="font-size:11px;font-weight:900;color:#14532D;">CLOSED-LOOP FEEDBACK: CONTINUOUS EVALUATION &amp; RUNTIME DRIFT MONITORING</span>
      </div>
      <span style="font-size:9px;font-weight:800;background:#DCFCE7;color:#14532D;padding:3px 10px;border-radius:4px;border:1px solid #86EFAC;">Sub-Second Response • Zero Hallucination SLA</span>
    </div>`,
    24,
    662,
    1552,
    36,
    `fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;rounded=1;arcSize=6;`
  );

  // Assemble full XML envelope
  return `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="embed.diagrams.net">
  <diagram id="generic_enterprise_architecture" name="${E(projectTitle)}">
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

export const generateGenericArchitectureXml = generateGenericArchitecture;
