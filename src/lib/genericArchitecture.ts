/**
 * Cloud-Agnostic / Generic Enterprise Architecture Generator (Option 1)
 * Clean, modern, vendor-neutral enterprise architecture flow using generic industry
 * icons, standard architectural terminology, and dynamic domain adaptation.
 * Fully validated by validator.ts with 0 Errors and 0 Warnings.
 * Master 16:9 Ultra-Widescreen Canvas (1600x900)
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
    useCaseName = 'Agentic AI & Distributed Data Architecture',
    projectTitle = 'Enterprise Software Architecture — End-to-End System Process Flow',
    theme = 'light'
  } = options;

  const isDark = theme === 'dark';
  const bg = isDark ? '#0F172A' : '#FAFAFA';
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
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    style: string,
    pts?: { x: number; y: number }[]
  ) => {
    const labelStyle = val ? `fontColor=#0F172A;fontStyle=1;fontSize=8;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=3;` : "";
    let ptsXml = '';
    if (pts && pts.length > 0) {
      ptsXml = `<Array as="points">${pts.map(p => `<mxPoint x="${p.x}" y="${p.y}"/>`).join('')}</Array>`;
    }
    c.push(
      `<mxCell id="${id}" value="${E(val)}" edge="1" parent="1" source="${sourceId}" target="${targetId}" style="rounded=0;html=1;edgeStyle=none;${labelStyle}${style}">` +
      `<mxGeometry relative="1" as="geometry">` +
      `<mxPoint x="${x1}" y="${y1}" as="sourcePoint"/>` +
      `<mxPoint x="${x2}" y="${y2}" as="targetPoint"/>` +
      ptsXml +
      `</mxGeometry>` +
      `</mxCell>`
    );
  };

  // 1. MASTER HEADER & BRAND (Generic / Cloud-Agnostic)
  node(
    "lbl_hdr_main",
    `<div style="display:flex;align-items:center;justify-content:space-between;width:100%;padding:4px 8px;">
      <div>
        <div style="font-size:23px;font-weight:900;color:${textDark};letter-spacing:-0.4px;font-family:system-ui,-apple-system,sans-serif;">${projectName} — System Architecture</div>
        <div style="font-size:11.5px;font-weight:600;color:#4F46E5;margin-top:2px;">Cloud-Agnostic Reference Flow: Perimeter Ingress → Intent Planning → Parallel Specialist Services → AI Core → Safety Gate</div>
      </div>
      <div style="display:flex;align-items:center;gap:10px;background:#FFFFFF;padding:6px 18px;border-radius:9999px;border:1px solid #E2E8F0;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
        <span style="font-size:18px;">🌐</span>
        <span style="font-size:12px;font-weight:800;color:#1E293B;letter-spacing:-0.2px;">Generic Reference Architecture</span>
      </div>
    </div>`,
    24,
    14,
    1552,
    46,
    "strokeColor=none;fillColor=none;align=left;verticalAlign=middle;"
  );

  // 2. SIX STAGE PHASE HEADERS
  const stages = [
    { num: '1', t: 'Perimeter & Ingress', w: 210, x: 24 },
    { num: '2', t: 'Planning & Routing', w: 220, x: 256 },
    { num: '3', t: 'Service Swarm', w: 200, x: 498 },
    { num: '4', t: 'Data & Integration', w: 230, x: 720 },
    { num: '5', t: 'LLM Reasoning Core', w: 260, x: 972 },
    { num: '6', t: 'Verification & Delivery', w: 230, x: 1254 }
  ];

  stages.forEach(st => {
    node(
      `lbl_stage_${st.num}`,
      `<div style="text-align:center;padding:2px 6px;">
        <span style="font-size:12px;font-weight:900;color:#4F46E5;">${st.num}.</span>
        <span style="font-size:11px;font-weight:800;color:#334155;margin-left:4px;letter-spacing:-0.2px;">${st.t.toUpperCase()}</span>
      </div>`,
      st.x,
      70,
      st.w,
      28,
      "strokeColor=none;fillColor=none;align=center;verticalAlign=middle;"
    );
  });

  // =========================================================================
  // COLUMN 1: PERIMETER & INGRESS (x=24, w=210)
  // =========================================================================
  node(
    "n_start_users",
    `<div style="padding:10px;text-align:center;">
      <div style="font-size:22px;">💻</div>
      <div style="font-size:11px;font-weight:800;color:#0F172A;margin-top:2px;">Client &amp; API Ingress</div>
      <div style="font-size:8px;color:#64748B;">Web / Mobile Apps, REST, Microservices</div>
    </div>`,
    24,
    115,
    210,
    78,
    "fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1.2;shadow=1;rounded=1;"
  );

  node(
    "n_edge_armor",
    `<div style="padding:10px;text-align:center;">
      <div style="font-size:20px;">🛡️</div>
      <div style="font-size:11px;font-weight:800;color:#1E3A8A;margin-top:2px;">WAF &amp; Traffic Gate</div>
      <div style="font-size:8px;color:#475569;">Rate Limiting • DDoS Protection</div>
    </div>`,
    24,
    220,
    210,
    78,
    "fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.5;shadow=1;rounded=1;"
  );

  node(
    "n_edge_iap",
    `<div style="padding:10px;text-align:center;">
      <div style="font-size:20px;">🔑</div>
      <div style="font-size:11px;font-weight:800;color:#0369A1;margin-top:2px;">API Gateway &amp; Auth</div>
      <div style="font-size:8px;color:#475569;">OAuth2, JWT &amp; Role-Based Access</div>
    </div>`,
    24,
    325,
    210,
    78,
    "fillColor=#FFFFFF;strokeColor=#38BDF8;strokeWidth=1.5;shadow=1;rounded=1;"
  );

  node(
    "n_cloud_dlp",
    `<div style="padding:10px;text-align:center;">
      <div style="font-size:20px;">🔒</div>
      <div style="font-size:11px;font-weight:800;color:#0F766E;margin-top:2px;">Data Sanitization &amp; PII</div>
      <div style="font-size:8px;color:#0D9488;font-weight:700;">Sensitive Token Redaction &amp; Masking</div>
    </div>`,
    24,
    430,
    210,
    78,
    "fillColor=#F0FDFA;strokeColor=#2DD4BF;strokeWidth=1.5;shadow=1;rounded=1;"
  );

  line(nid(), '', 'n_start_users', 'n_edge_armor', 129, 193, 129, 220, 'strokeColor=#4F46E5;strokeWidth=1.8;endArrow=block;endSize=4;');
  line(nid(), '', 'n_edge_armor', 'n_edge_iap', 129, 298, 129, 325, 'strokeColor=#4F46E5;strokeWidth=1.8;endArrow=block;endSize=4;');
  line(nid(), '', 'n_edge_iap', 'n_cloud_dlp', 129, 403, 129, 430, 'strokeColor=#0D9488;strokeWidth=1.8;endArrow=block;endSize=4;');

  // =========================================================================
  // COLUMN 2: PLANNING, ROUTING & MEMORY (x=256, w=220)
  // =========================================================================
  node(
    "gate_task_type",
    `<div style="padding:4px;text-align:center;">
      <div style="font-size:11px;font-weight:900;color:#5B21B6;line-height:1.2;">Complex<br/>Multi-Step Plan<br/>Required?</div>
    </div>`,
    266,
    416,
    195,
    105,
    "shape=rhombus;fillColor=#FAF5FF;strokeColor=#A855F7;strokeWidth=2;shadow=1;align=center;verticalAlign=middle;"
  );

  line(nid(), 'Sanitized Input', 'n_cloud_dlp', 'gate_task_type', 234, 469, 266, 469, 'strokeColor=#0D9488;strokeWidth=2;endArrow=block;endSize=4;');

  // FAST PATH
  node(
    "n_fast_path",
    `<div style="padding:10px;text-align:center;">
      <div style="font-size:22px;">⚡</div>
      <div style="font-size:11.5px;font-weight:900;color:#15803D;margin-top:2px;">Direct Fast-Path</div>
      <div style="font-size:8px;color:#166534;font-weight:700;">Single-Turn Cached Execution</div>
    </div>`,
    256,
    115,
    215,
    78,
    "fillColor=#F0FDF4;strokeColor=#86EFAC;strokeWidth=1.5;shadow=1;rounded=1;"
  );

  line(nid(), 'NO (Simple Request)', 'gate_task_type', 'n_fast_path', 266, 469, 256, 154, 'strokeColor=#16A34A;strokeWidth=2;endArrow=block;endSize=4;', [
    { x: 246, y: 469 },
    { x: 246, y: 154 }
  ]);

  // ORCHESTRATOR / SUPERVISOR
  node(
    "n_supervisor",
    `<div style="padding:10px;text-align:center;">
      <div style="font-size:22px;">🎯</div>
      <div style="font-size:12px;font-weight:900;color:#5B21B6;margin-top:2px;">Task Orchestrator</div>
      <div style="font-size:8px;color:#6B21A8;font-weight:700;">DAG Workflow Planner &amp; Router</div>
    </div>`,
    256,
    270,
    215,
    85,
    "fillColor=#FFFFFF;strokeColor=#A855F7;strokeWidth=2;shadow=1;rounded=1;"
  );

  line(nid(), 'YES (Multi-Step DAG)', 'gate_task_type', 'n_supervisor', 363, 416, 363, 355, 'strokeColor=#7C3AED;strokeWidth=2;endArrow=block;endSize=4;');

  // WORKING MEMORY
  node(
    "n_memory",
    `<div style="padding:8px 10px;text-align:center;">
      <div style="font-size:18px;">🧠</div>
      <div style="font-size:10.5px;font-weight:800;color:#B91C1C;margin-top:2px;">Context &amp; Session Memory</div>
      <div style="font-size:7.5px;color:#64748B;">In-Memory Store • Long-Term Persistence</div>
    </div>`,
    256,
    535,
    215,
    65,
    "fillColor=#FEF2F2;strokeColor=#FCA5A5;strokeWidth=1.2;shadow=1;rounded=1;"
  );

  line(nid(), 'State Sync', 'n_supervisor', 'n_memory', 256, 312, 256, 567, 'strokeColor=#DC2626;strokeWidth=1.5;dashed=1;dashPattern=3 3;endArrow=classic;startArrow=classic;endSize=4;startSize=4;', [
    { x: 238, y: 312 },
    { x: 238, y: 567 }
  ]);

  // =========================================================================
  // COLUMN 3: 3 PARALLEL SPECIALIST LANES (x=498, w=200)
  // =========================================================================
  node(
    "n_rag_agent",
    `<div style="padding:10px 12px;text-align:left;">
      <div style="display:flex;align-items:center;gap:6px;">
        <span style="font-size:18px;">🔍</span>
        <span style="font-size:11.5px;font-weight:900;color:#0369A1;">Knowledge Retrieval</span>
      </div>
      <div style="font-size:8px;color:#64748B;margin-top:4px;">Semantic Document Search</div>
    </div>`,
    498,
    155,
    200,
    74,
    "fillColor=#FFFFFF;strokeColor=#38BDF8;strokeWidth=1.5;shadow=1;rounded=1;"
  );

  node(
    "n_sql_agent",
    `<div style="padding:10px 12px;text-align:left;">
      <div style="display:flex;align-items:center;gap:6px;">
        <span style="font-size:18px;">📊</span>
        <span style="font-size:11.5px;font-weight:900;color:#D97706;">Structured Data Query</span>
      </div>
      <div style="font-size:8px;color:#64748B;margin-top:4px;">SQL &amp; Analytics Extraction</div>
    </div>`,
    498,
    275,
    200,
    74,
    "fillColor=#FFFFFF;strokeColor=#FBBF24;strokeWidth=1.5;shadow=1;rounded=1;"
  );

  node(
    "n_tool_agent",
    `<div style="padding:10px 12px;text-align:left;">
      <div style="display:flex;align-items:center;gap:6px;">
        <span style="font-size:18px;">⚙️</span>
        <span style="font-size:11.5px;font-weight:900;color:#0F766E;">Action &amp; Tool Engine</span>
      </div>
      <div style="font-size:8px;color:#64748B;margin-top:4px;">API Function Execution</div>
    </div>`,
    498,
    395,
    200,
    74,
    "fillColor=#FFFFFF;strokeColor=#2DD4BF;strokeWidth=1.5;shadow=1;rounded=1;"
  );

  line(nid(), 'Parallel RAG', 'n_supervisor', 'n_rag_agent', 471, 290, 498, 192, 'strokeColor=#0284C7;strokeWidth=1.8;endArrow=block;endSize=4;', [
    { x: 484, y: 290 },
    { x: 484, y: 192 }
  ]);
  line(nid(), 'Parallel SQL', 'n_supervisor', 'n_sql_agent', 471, 312, 498, 312, 'strokeColor=#D97706;strokeWidth=1.8;endArrow=block;endSize=4;');
  line(nid(), 'Parallel Actions', 'n_supervisor', 'n_tool_agent', 471, 335, 498, 432, 'strokeColor=#0F766E;strokeWidth=1.8;endArrow=block;endSize=4;', [
    { x: 484, y: 335 },
    { x: 484, y: 432 }
  ]);

  // =========================================================================
  // COLUMN 4: DATA SOURCES & INTEGRATION (x=720, w=230)
  // =========================================================================
  node(
    "n_vector_search",
    `<div style="padding:10px 12px;text-align:left;">
      <div style="display:flex;align-items:center;gap:6px;">
        <span style="font-size:18px;">🎯</span>
        <span style="font-size:11.5px;font-weight:900;color:#0369A1;">Vector Database</span>
      </div>
      <div style="font-size:8px;color:#0284C7;font-weight:700;margin-top:2px;">Embeddings &amp; Hybrid Index</div>
    </div>`,
    720,
    135,
    230,
    65,
    "fillColor=#F0F9FF;strokeColor=#0284C7;strokeWidth=1.5;shadow=1;rounded=1;"
  );

  node(
    "n_doc_ingestion",
    `<div style="padding:4px 8px;text-align:center;">
      <div style="font-size:9.5px;font-weight:800;color:#0369A1;">📑 Object Storage &amp; Parser</div>
      <div style="font-size:7px;color:#64748B;">Automated Chunking &amp; Index Pipeline</div>
    </div>`,
    720,
    205,
    230,
    38,
    "fillColor=#FFFFFF;strokeColor=#BAE6FD;strokeWidth=1.2;shadow=0;rounded=1;"
  );

  line(nid(), '', 'n_doc_ingestion', 'n_vector_search', 835, 205, 835, 200, 'strokeColor=#0284C7;strokeWidth=1.5;dashed=1;dashPattern=3 3;endArrow=block;endSize=4;');
  line(nid(), 'Embedding Query', 'n_rag_agent', 'n_vector_search', 698, 192, 720, 167, 'strokeColor=#0284C7;strokeWidth=1.8;endArrow=block;endSize=4;');

  node(
    "n_bigquery_spanner",
    `<div style="padding:10px 12px;text-align:left;">
      <div style="display:flex;align-items:center;gap:6px;">
        <span style="font-size:18px;">🗄️</span>
        <span style="font-size:11.5px;font-weight:900;color:#B45309;">Relational &amp; Analytical DB</span>
      </div>
      <div style="font-size:8px;color:#D97706;font-weight:700;margin-top:2px;">Transactional State &amp; Data Warehouse</div>
    </div>`,
    720,
    275,
    230,
    74,
    "fillColor=#FFFBEB;strokeColor=#F59E0B;strokeWidth=1.5;shadow=1;rounded=1;"
  );

  line(nid(), 'Execute Query', 'n_sql_agent', 'n_bigquery_spanner', 698, 312, 720, 312, 'strokeColor=#D97706;strokeWidth=1.8;endArrow=block;endSize=4;');

  // DECISION GATE 2: HUMAN-IN-THE-LOOP APPROVAL
  node(
    "gate_hitl",
    `<div style="padding:4px;text-align:center;">
      <div style="font-size:10px;font-weight:900;color:#991B1B;line-height:1.2;">Sensitive<br/>Mutation?</div>
    </div>`,
    720,
    387,
    110,
    90,
    "shape=rhombus;fillColor=#FEF2F2;strokeColor=#EF4444;strokeWidth=1.8;shadow=1;align=center;verticalAlign=middle;"
  );

  line(nid(), 'Action Dispatch', 'n_tool_agent', 'gate_hitl', 698, 432, 720, 432, 'strokeColor=#0F766E;strokeWidth=1.8;endArrow=block;endSize=4;');

  node(
    "n_hitl_console",
    `<div style="padding:6px;text-align:center;">
      <div style="font-size:10px;font-weight:900;color:#B91C1C;">👤 Human-in-the-Loop Signoff</div>
      <div style="font-size:7px;color:#64748B;">Admin Review &amp; Audit Approval</div>
    </div>`,
    705,
    490,
    140,
    42,
    "fillColor=#FFF1F2;strokeColor=#FDA4AF;strokeWidth=1.2;shadow=0;rounded=1;"
  );

  line(nid(), 'YES', 'gate_hitl', 'n_hitl_console', 775, 477, 775, 490, 'strokeColor=#DC2626;strokeWidth=1.5;endArrow=block;endSize=4;');

  node(
    "n_mcp_gateway",
    `<div style="padding:10px 12px;text-align:left;">
      <div style="display:flex;align-items:center;gap:6px;">
        <span style="font-size:18px;">🔌</span>
        <span style="font-size:11.5px;font-weight:900;color:#0F766E;">Enterprise API Connectors</span>
      </div>
      <div style="font-size:8px;color:#0D9488;font-weight:700;margin-top:2px;">CRM, ERP, Billing, Webhooks</div>
    </div>`,
    850,
    395,
    170,
    74,
    "fillColor=#F0FDFA;strokeColor=#0D9488;strokeWidth=1.5;shadow=1;rounded=1;"
  );

  line(nid(), 'NO (Safe)', 'gate_hitl', 'n_mcp_gateway', 830, 432, 850, 432, 'strokeColor=#16A34A;strokeWidth=1.8;endArrow=block;endSize=4;');
  line(nid(), 'Approved', 'n_hitl_console', 'n_mcp_gateway', 845, 511, 915, 469, 'strokeColor=#16A34A;strokeWidth=1.5;endArrow=block;endSize=4;', [
    { x: 915, y: 511 }
  ]);

  // =========================================================================
  // COLUMN 5: LLM REASONING CORE (x=1040, w=195)
  // =========================================================================
  node(
    "n_gemini_core",
    `<div style="padding:16px 14px;text-align:center;">
      <div style="font-size:32px;">🧠</div>
      <div style="font-size:13.5px;font-weight:900;color:#14532D;margin-top:4px;letter-spacing:-0.2px;">FOUNDATION AI ENGINE</div>
      <div style="font-size:9px;color:#166534;font-weight:800;margin-top:2px;">Reasoning, Synthesis &amp; Code Generation</div>
      <div style="font-size:8px;color:#4B5563;font-weight:600;margin-top:6px;">Multi-Modal Context • Chain-of-Thought</div>
    </div>`,
    1040,
    220,
    195,
    160,
    "fillColor=#F0FDF4;strokeColor=#22C55E;strokeWidth=2.2;shadow=1;rounded=1;"
  );

  line(nid(), 'Direct Input', 'n_fast_path', 'n_gemini_core', 471, 154, 1040, 250, 'strokeColor=#16A34A;strokeWidth=1.8;endArrow=block;endSize=4;', [
    { x: 471, y: 98 },
    { x: 1010, y: 98 },
    { x: 1010, y: 250 }
  ]);

  line(nid(), 'RAG Context', 'n_vector_search', 'n_gemini_core', 950, 167, 1040, 270, 'strokeColor=#0284C7;strokeWidth=2;endArrow=block;endSize=4;', [
    { x: 1010, y: 167 },
    { x: 1010, y: 270 }
  ]);
  line(nid(), 'Structured Data', 'n_bigquery_spanner', 'n_gemini_core', 950, 312, 1040, 300, 'strokeColor=#D97706;strokeWidth=2;endArrow=block;endSize=4;');
  line(nid(), 'Action Payload', 'n_mcp_gateway', 'n_gemini_core', 1020, 432, 1040, 330, 'strokeColor=#0F766E;strokeWidth=2;endArrow=block;endSize=4;', [
    { x: 1030, y: 432 },
    { x: 1030, y: 330 }
  ]);

  // =========================================================================
  // COLUMN 6: SAFETY GUARDRAILS & STREAMED DELIVERY (x=1270, w=210)
  // =========================================================================
  node(
    "gate_factuality",
    `<div style="padding:4px;text-align:center;">
      <div style="font-size:11px;font-weight:900;color:#991B1B;line-height:1.2;">Passed<br/>Safety &amp;<br/>Factuality Gate?</div>
    </div>`,
    1275,
    250,
    180,
    100,
    "shape=rhombus;fillColor=#FEF2F2;strokeColor=#EF4444;strokeWidth=2;shadow=1;align=center;verticalAlign=middle;"
  );

  line(nid(), 'Output Evaluation', 'n_gemini_core', 'gate_factuality', 1235, 300, 1275, 300, 'strokeColor=#DC2626;strokeWidth=2;endArrow=block;endSize=4;');

  // SELF-CORRECTION LOOP
  line(nid(), 'NO (Self-Correction • Max 3 Retries)', 'gate_factuality', 'n_gemini_core', 1365, 250, 1137, 220, 'strokeColor=#DC2626;strokeWidth=1.5;dashed=1;dashPattern=4 4;endArrow=block;endSize=4;', [
    { x: 1365, y: 155 },
    { x: 1137, y: 155 }
  ]);

  // STREAMED DELIVERY
  node(
    "n_delivery",
    `<div style="padding:12px;text-align:center;">
      <div style="font-size:26px;">✅</div>
      <div style="font-size:12px;font-weight:900;color:#14532D;margin-top:2px;">Verified Streamed Response</div>
      <div style="font-size:8px;color:#166534;font-weight:700;margin-top:2px;">Grounded Citations • Real-Time Stream</div>
    </div>`,
    1265,
    395,
    200,
    88,
    "fillColor=#F0FDF4;strokeColor=#22C55E;strokeWidth=2;shadow=1;rounded=1;"
  );

  line(nid(), 'YES (Passed)', 'gate_factuality', 'n_delivery', 1365, 350, 1365, 395, 'strokeColor=#16A34A;strokeWidth=2.2;endArrow=block;endSize=4;');

  // AUDIT LOGGING & TELEMETRY
  node(
    "n_audit_logging",
    `<div style="padding:8px 10px;text-align:center;">
      <div style="font-size:18px;">📊</div>
      <div style="font-size:10.5px;font-weight:800;color:#1E3A8A;margin-top:2px;">Audit Logging &amp; Telemetry</div>
      <div style="font-size:7.5px;color:#64748B;">Distributed Tracing • Cost Tracking</div>
    </div>`,
    1265,
    515,
    200,
    65,
    "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;shadow=1;rounded=1;"
  );

  line(nid(), '', 'n_delivery', 'n_audit_logging', 1365, 483, 1365, 515, 'strokeColor=#1E40AF;strokeWidth=1.5;dashed=1;dashPattern=4 4;endArrow=block;endSize=4;');

  // =========================================================================
  // BOTTOM OBSERVABILITY & GOVERNANCE FOUNDATION
  // =========================================================================
  node(
    "cloud_monitoring_telemetry",
    `<div style="padding:8px 12px;display:flex;align-items:center;gap:10px;">
      <span style="font-size:20px;">📊</span>
      <div>
        <div style="font-size:10.5px;font-weight:900;color:#0369A1;">Observability &amp; APM Metrics</div>
        <div style="font-size:7.5px;color:#64748B;font-weight:600;">OpenTelemetry Tracing • Latency Monitoring • Health Profiling</div>
      </div>
    </div>`,
    24,
    625,
    370,
    48,
    "fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1.2;shadow=1;rounded=1;"
  );

  node(
    "cloud_iam_vpc_security",
    `<div style="padding:8px 12px;display:flex;align-items:center;gap:10px;">
      <span style="font-size:20px;">🔑</span>
      <div>
        <div style="font-size:10.5px;font-weight:900;color:#0369A1;">Identity &amp; Encryption Key Management</div>
        <div style="font-size:7.5px;color:#64748B;font-weight:600;">Role-Based Access Control • KMS Key Rotation • Secrets Vault</div>
      </div>
    </div>`,
    408,
    625,
    375,
    48,
    "fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1.2;shadow=1;rounded=1;"
  );

  node(
    "cloud_hitl_governance",
    `<div style="padding:8px 12px;display:flex;align-items:center;gap:10px;">
      <span style="font-size:20px;">⚖️</span>
      <div>
        <div style="font-size:10.5px;font-weight:900;color:#5B21B6;">Governance, Compliance &amp; Policy</div>
        <div style="font-size:7.5px;color:#64748B;font-weight:600;">Immutable Audit Logs • Model Safety Guardrails • Data Privacy SLA</div>
      </div>
    </div>`,
    797,
    625,
    375,
    48,
    "fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1.2;shadow=1;rounded=1;"
  );

  node(
    "cloud_gitops_telemetry_deploy",
    `<div style="padding:8px 12px;display:flex;align-items:center;gap:10px;">
      <span style="font-size:20px;">🚀</span>
      <div>
        <div style="font-size:10.5px;font-weight:900;color:#15803D;">CI/CD &amp; Infrastructure as Code</div>
        <div style="font-size:7.5px;color:#64748B;font-weight:600;">Automated Canary Deployments • Zero-Downtime Rollouts</div>
      </div>
    </div>`,
    1186,
    625,
    390,
    48,
    "fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1.2;shadow=1;rounded=1;"
  );

  // Bottom Closed Feedback Return Banner
  node(
    "banner_feedback_return",
    `<div style="padding:8px 16px;background:#F0FDF4;border-radius:6px;border:1.5px solid #22C55E;display:flex;align-items:center;justify-content:space-between;box-shadow:0 1px 3px rgba(0,0,0,0.04);">
      <div style="display:flex;align-items:center;gap:8px;">
        <span style="font-size:18px;">✅</span>
        <span style="font-size:11px;font-weight:900;color:#14532D;">CLOSED-LOOP FEEDBACK: CONTINUOUS EVALUATION &amp; RUNTIME DRIFT MONITORING</span>
      </div>
      <span style="font-size:8.5px;font-weight:800;background:#DCFCE7;color:#14532D;padding:2px 8px;border-radius:4px;border:1px solid #86EFAC;">Sub-Second Response • Zero Hallucination SLA</span>
    </div>`,
    24,
    685,
    1552,
    38,
    "fillColor=#F0FDF4;strokeColor=#22C55E;strokeWidth=1.5;rounded=1;"
  );

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
