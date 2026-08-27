/**
 * 🏛️ Google Cloud Architecture Center — Enterprise Agentic AI Platform
 * 
 * 100% Official Google Cloud Brand, Architectural & Routing Standards:
 * - Google Sans / Roboto typography hierarchy
 * - Official Google 4-Color Logo & Product Palette (#1A73E8, #EA4335, #FBBC04, #34A853)
 * - Clean White Google Material Architecture Cards with subtle #DADCE0 borders
 * - NO BACKTRACKING: Clean Ingress Fork (Fast-Path UP, Supervisor DOWN)
 * - DUAL DATABASE: Active BigQuery (OLAP) & Cloud Spanner (OLTP) connections
 * - GOVERNANCE: Standard Tool Execution + Privileged HITL Approval Gate
 * - ASYNC RAG: Clearly annotated Document AI knowledge ingestion pipeline
 * - CLOSED LOOP: Physical return vector from Cloud Logging & Eval -> Supervisor
 * - 100% Anchor-Locked Laser-Straight Orthogonal Manhattan Connectors
 */

import { renderGcpIconHtml, GCP_OFFICIAL_ICONS } from './gcpIcons';

export interface GCPFunctionalFlowchartOptions {
  projectName?: string;
  useCaseName?: string;
  projectTitle?: string;
  prompt?: string;
  theme?: 'light' | 'dark';
}

export function generateGCPFunctionalFlowchart(options: GCPFunctionalFlowchartOptions = {}): string {
  const {
    projectTitle = 'Google Cloud Agentic AI Platform — End-to-End Enterprise Architecture',
    theme = 'light'
  } = options;

  const isDark = theme === 'dark';
  const bg = isDark ? '#0F172A' : '#F8F9FA';
  const cardBg = isDark ? '#1E293B' : '#FFFFFF';
  const cardBorder = isDark ? '#334155' : '#DADCE0';
  const textDark = isDark ? '#F8FAFC' : '#202124';
  
  const c: string[] = [];
  let idCounter = 100;
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
    const labelStyle = val ? `fontColor=#202124;fontStyle=1;fontSize=8;fontFamily=Google Sans,Roboto,sans-serif;labelBackgroundColor=#FFFFFF;labelBorderColor=#DADCE0;padding=3;` : "";
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

  // Official Google 4-Color Cloud Mark
  const GOOGLE_CLOUD_LOGO = `<svg width="26" height="26" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
  </svg>`;

  // =========================================================================
  // 1. MASTER HEADER & GOOGLE BRAND (x=24, y=14..60)
  // =========================================================================
  node(
    "lbl_hdr_main",
    `<div style="display:flex;align-items:center;justify-content:space-between;width:100%;padding:4px 8px;font-family:'Google Sans',Roboto,Arial,sans-serif;">
      <div>
        <div style="font-size:22px;font-weight:700;color:${textDark};letter-spacing:-0.2px;">Google Cloud Agentic AI Platform</div>
        <div style="font-size:11.5px;font-weight:500;color:#1A73E8;margin-top:2px;">Enterprise Reference Architecture: Secure Ingress → Intent Fork → 3-Lane Parallel Execution → Gemini Reasoning → Closed Loop</div>
      </div>
      <div style="display:flex;align-items:center;gap:10px;background:#FFFFFF;padding:6px 18px;border-radius:8px;border:1px solid #DADCE0;box-shadow:0 1px 2px rgba(60,64,67,0.1);">
        ${GOOGLE_CLOUD_LOGO}
        <div>
          <div style="font-size:12px;font-weight:700;color:#202124;letter-spacing:-0.1px;">Google Cloud</div>
          <div style="font-size:9px;color:#5F6368;font-weight:500;">Architecture Center</div>
        </div>
      </div>
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
    { num: '1', t: 'Ingress & Security', w: 200, x: 24, c: '#1A73E8' },
    { num: '2', t: 'Planning & Memory', w: 215, x: 260, c: '#1A73E8' },
    { num: '3', t: 'Agent Swarm', w: 195, x: 510, c: '#1A73E8' },
    { num: '4', t: 'Data & Tools', w: 235, x: 735, c: '#1A73E8' },
    { num: '5', t: 'Gemini Reasoning', w: 230, x: 1000, c: '#1E8E3E' },
    { num: '6', t: 'Safety & Delivery', w: 230, x: 1265, c: '#1E8E3E' }
  ];

  stages.forEach(st => {
    node(
      `lbl_stage_${st.num}`,
      `<div style="text-align:center;padding:2px 6px;font-family:'Google Sans',Roboto,Arial,sans-serif;">
        <span style="font-size:11px;font-weight:700;color:${st.c};">${st.num}.</span>
        <span style="font-size:11px;font-weight:700;color:#3C4043;margin-left:4px;letter-spacing:0.3px;">${st.t.toUpperCase()}</span>
      </div>`,
      st.x,
      68,
      st.w,
      26,
      "strokeColor=none;fillColor=none;align=center;verticalAlign=middle;"
    );
  });

  // =========================================================================
  // 3. COLUMN 1: INGRESS & SECURITY (x=24, w=200)
  // =========================================================================
  node(
    "n_start_users",
    `<div style="padding:10px;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:'Google Sans',Roboto,Arial,sans-serif;">
      ${renderGcpIconHtml('user_ingress', 26)}
      <div style="font-size:11.5px;font-weight:700;color:#202124;margin-top:4px;">User &amp; System Ingress</div>
      <div style="font-size:8.5px;color:#5F6368;">Web UI, Slack Copilot, REST, Events</div>
    </div>`,
    24,
    105,
    200,
    72,
    `fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;shadow=1;rounded=1;arcSize=8;`
  );

  node(
    "n_edge_armor",
    `<div style="padding:10px;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:'Google Sans',Roboto,Arial,sans-serif;">
      ${renderGcpIconHtml('cloud_armor', 26)}
      <div style="font-size:11.5px;font-weight:700;color:#202124;margin-top:4px;">Cloud Armor &amp; GCLB</div>
      <div style="font-size:8.5px;color:#5F6368;">OWASP Top 10 • DDoS Mitigation</div>
    </div>`,
    24,
    205,
    200,
    72,
    `fillColor=${cardBg};strokeColor=#1A73E8;strokeWidth=1.5;shadow=1;rounded=1;arcSize=8;`
  );

  node(
    "n_edge_iap",
    `<div style="padding:10px;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:'Google Sans',Roboto,Arial,sans-serif;">
      ${renderGcpIconHtml('iap', 26)}
      <div style="font-size:11.5px;font-weight:700;color:#202124;margin-top:4px;">Identity-Aware Proxy</div>
      <div style="font-size:8.5px;color:#5F6368;">BeyondCorp Zero-Trust &amp; OAuth2</div>
    </div>`,
    24,
    305,
    200,
    72,
    `fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;shadow=1;rounded=1;arcSize=8;`
  );

  node(
    "n_cloud_dlp",
    `<div style="padding:10px;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:'Google Sans',Roboto,Arial,sans-serif;">
      ${renderGcpIconHtml('cloud_dlp', 26)}
      <div style="font-size:11.5px;font-weight:700;color:#202124;margin-top:4px;">Sensitive Data Protection</div>
      <div style="font-size:8.5px;color:#0D9488;font-weight:600;">Cloud DLP PII Redaction &amp; Masking</div>
    </div>`,
    24,
    405,
    200,
    72,
    `fillColor=${cardBg};strokeColor=#0D9488;strokeWidth=1.5;shadow=1;rounded=1;arcSize=8;`
  );

  line(nid(), '', 'n_start_users', 'n_edge_armor', 0.5, 1, 0.5, 0, 'strokeColor=#1A73E8;strokeWidth=1.5;endArrow=block;endSize=4;');
  line(nid(), '', 'n_edge_armor', 'n_edge_iap', 0.5, 1, 0.5, 0, 'strokeColor=#1A73E8;strokeWidth=1.5;endArrow=block;endSize=4;');
  line(nid(), '', 'n_edge_iap', 'n_cloud_dlp', 0.5, 1, 0.5, 0, 'strokeColor=#0D9488;strokeWidth=1.5;endArrow=block;endSize=4;');

  // =========================================================================
  // 4. COLUMN 2: PLANNING, ROUTING & MEMORY (x=260, w=215)
  // =========================================================================

  // FAST PATH INFERENCE CARD (Top-aligned, y=105)
  node(
    "n_fast_path",
    `<div style="padding:10px;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:'Google Sans',Roboto,Arial,sans-serif;">
      ${renderGcpIconHtml('gemini', 26)}
      <div style="font-size:11.5px;font-weight:700;color:#1E8E3E;margin-top:4px;">Gemini Flash Fast-Path</div>
      <div style="font-size:8.5px;color:#137333;font-weight:600;">Direct Low-Latency (&lt; 100ms TTFT)</div>
    </div>`,
    260,
    105,
    215,
    72,
    `fillColor=${cardBg};strokeColor=#1E8E3E;strokeWidth=1.5;shadow=1;rounded=1;arcSize=8;`
  );

  // TASK GRAPH ROUTER (Central Fork, y=225)
  node(
    "gate_task_type",
    `<div style="padding:10px;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:'Google Sans',Roboto,Arial,sans-serif;">
      ${renderGcpIconHtml('agent_builder', 24)}
      <div style="font-size:11.5px;font-weight:700;color:#202124;margin-top:3px;">Task Graph Router</div>
      <div style="font-size:8px;color:#5F6368;">Complexity &amp; Intent Classifier</div>
    </div>`,
    260,
    225,
    215,
    72,
    `fillColor=${cardBg};strokeColor=#1A73E8;strokeWidth=1.5;shadow=1;rounded=1;arcSize=8;`
  );

  // Sanitized Prompt routes cleanly into Router from DLP
  line(nid(), 'Sanitized Prompt', 'n_cloud_dlp', 'gate_task_type', 1, 0.5, 0, 0.5, 'strokeColor=#0D9488;strokeWidth=1.5;endArrow=block;endSize=4;', [
    { x: 238, y: 441 },
    { x: 238, y: 261 }
  ], -0.6, -10);

  // ROUTER FORK 1: Simple Prompt -> Steps UP into Fast-Path
  line(nid(), 'Simple Intent', 'gate_task_type', 'n_fast_path', 0.5, 0, 0.5, 1, 'strokeColor=#1E8E3E;strokeWidth=1.5;endArrow=block;endSize=4;');

  // SUPERVISOR AGENT CARD (Below Router, y=345)
  node(
    "n_supervisor",
    `<div style="padding:10px;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:'Google Sans',Roboto,Arial,sans-serif;">
      ${renderGcpIconHtml('gke_autopilot', 26)}
      <div style="font-size:12px;font-weight:700;color:#202124;margin-top:4px;">Supervisor Agent</div>
      <div style="font-size:8.5px;color:#1A73E8;font-weight:600;">GKE Autopilot • Task Graph Planner</div>
    </div>`,
    260,
    345,
    215,
    80,
    `fillColor=${cardBg};strokeColor=#1A73E8;strokeWidth=1.8;shadow=1;rounded=1;arcSize=8;`
  );

  // ROUTER FORK 2: Complex Task -> Steps DOWN into Supervisor
  line(nid(), 'Multi-Step Intent', 'gate_task_type', 'n_supervisor', 0.5, 1, 0.5, 0, 'strokeColor=#1A73E8;strokeWidth=1.5;endArrow=block;endSize=4;');

  // CONVERSATIONAL & EPISODIC MEMORY (Bottom, y=475)
  node(
    "n_memory",
    `<div style="padding:8px 10px;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:'Google Sans',Roboto,Arial,sans-serif;">
      ${renderGcpIconHtml('memorystore', 24)}
      <div style="font-size:10.5px;font-weight:700;color:#202124;margin-top:4px;">Episodic &amp; Working Memory</div>
      <div style="font-size:8px;color:#5F6368;">Cloud Memorystore (&lt; 1ms) • Cloud Spanner</div>
    </div>`,
    260,
    475,
    215,
    64,
    `fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;shadow=1;rounded=1;arcSize=8;`
  );

  line(nid(), 'State Sync', 'n_supervisor', 'n_memory', 0.5, 1, 0.5, 0, 'strokeColor=#EA4335;strokeWidth=1.5;dashed=1;dashPattern=3 3;endArrow=classic;startArrow=classic;endSize=4;startSize=4;');

  // =========================================================================
  // 5. COLUMN 3: 3 PARALLEL SPECIALIST AGENTS (x=510, w=195)
  // =========================================================================

  // LANE 1: RAG AGENT (y=155)
  node(
    "n_rag_agent",
    `<div style="padding:10px 12px;text-align:left;font-family:'Google Sans',Roboto,Arial,sans-serif;">
      <div style="display:flex;align-items:center;gap:8px;">
        ${renderGcpIconHtml('vertex_vector_search', 22)}
        <span style="font-size:11.5px;font-weight:700;color:#202124;">RAG Specialist</span>
      </div>
      <div style="font-size:8.5px;color:#5F6368;margin-top:4px;">Hybrid Semantic Retrieval</div>
    </div>`,
    510,
    155,
    195,
    72,
    `fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;shadow=1;rounded=1;arcSize=8;`
  );

  // LANE 2: SQL AGENT (y=285)
  node(
    "n_sql_agent",
    `<div style="padding:10px 12px;text-align:left;font-family:'Google Sans',Roboto,Arial,sans-serif;">
      <div style="display:flex;align-items:center;gap:8px;">
        ${renderGcpIconHtml('bigquery', 22)}
        <span style="font-size:11.5px;font-weight:700;color:#202124;">SQL &amp; Data Agent</span>
      </div>
      <div style="font-size:8.5px;color:#5F6368;margin-top:4px;">Text-to-SQL &amp; Multi-DB Router</div>
    </div>`,
    510,
    285,
    195,
    72,
    `fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;shadow=1;rounded=1;arcSize=8;`
  );

  // LANE 3: TOOL AGENT (y=415)
  node(
    "n_tool_agent",
    `<div style="padding:10px 12px;text-align:left;font-family:'Google Sans',Roboto,Arial,sans-serif;">
      <div style="display:flex;align-items:center;gap:8px;">
        ${renderGcpIconHtml('agent_builder', 22)}
        <span style="font-size:11.5px;font-weight:700;color:#202124;">Action &amp; Tool Agent</span>
      </div>
      <div style="font-size:8.5px;color:#5F6368;margin-top:4px;">Vertex AI Tool Execution</div>
    </div>`,
    510,
    415,
    195,
    72,
    `fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;shadow=1;rounded=1;arcSize=8;`
  );

  // Supervisor Dispatch Connectors
  line(nid(), 'Parallel RAG', 'n_supervisor', 'n_rag_agent', 1, 0.25, 0, 0.5, 'strokeColor=#1A73E8;strokeWidth=1.5;endArrow=block;endSize=4;', [
    { x: 492, y: 365 },
    { x: 492, y: 191 }
  ]);
  line(nid(), 'Parallel SQL', 'n_supervisor', 'n_sql_agent', 1, 0.5, 0, 0.5, 'strokeColor=#E37400;strokeWidth=1.5;endArrow=block;endSize=4;', [
    { x: 492, y: 385 },
    { x: 492, y: 321 }
  ]);
  line(nid(), 'Parallel Tools', 'n_supervisor', 'n_tool_agent', 1, 0.75, 0, 0.5, 'strokeColor=#0D9488;strokeWidth=1.5;endArrow=block;endSize=4;', [
    { x: 492, y: 405 },
    { x: 492, y: 451 }
  ]);

  // =========================================================================
  // 6. COLUMN 4: DATA SOURCES, DUAL DATABASES & GOVERNANCE (x=735, w=235)
  // =========================================================================

  // DATA SOURCE 1: VERTEX VECTOR SEARCH
  node(
    "n_vector_search",
    `<div style="padding:8px 12px;text-align:left;font-family:'Google Sans',Roboto,Arial,sans-serif;">
      <div style="display:flex;align-items:center;gap:8px;">
        ${renderGcpIconHtml('vertex_vector_search', 22)}
        <span style="font-size:11.5px;font-weight:700;color:#202124;">Vertex Vector Search</span>
      </div>
      <div style="font-size:8.5px;color:#1A73E8;font-weight:600;margin-top:2px;">ScaNN Semantic Index (&lt; 5ms)</div>
    </div>`,
    735,
    135,
    235,
    58,
    `fillColor=${cardBg};strokeColor=#1A73E8;strokeWidth=1.5;shadow=1;rounded=1;arcSize=8;`
  );

  // ASYNC INGESTION PIPELINE
  node(
    "n_doc_ingestion",
    `<div style="padding:4px 8px;text-align:center;display:flex;align-items:center;justify-content:center;gap:6px;font-family:'Google Sans',Roboto,Arial,sans-serif;">
      ${renderGcpIconHtml('document_ai', 18)}
      <div style="text-align:left;">
        <div style="font-size:8.5px;font-weight:700;color:#202124;">GCS &amp; Document AI OCR</div>
        <div style="font-size:7.5px;color:#1A73E8;font-weight:600;">[Async Ingestion &amp; Chunking]</div>
      </div>
    </div>`,
    735,
    201,
    235,
    36,
    `fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;shadow=0;rounded=1;arcSize=6;`
  );

  line(nid(), '', 'n_doc_ingestion', 'n_vector_search', 0.5, 0, 0.5, 1, 'strokeColor=#1A73E8;strokeWidth=1.5;dashed=1;dashPattern=3 3;endArrow=block;endSize=4;');
  line(nid(), 'Embedding', 'n_rag_agent', 'n_vector_search', 1, 0.5, 0, 0.5, 'strokeColor=#1A73E8;strokeWidth=1.5;endArrow=block;endSize=4;', [
    { x: 720, y: 191 },
    { x: 720, y: 164 }
  ]);

  // DATA SOURCE 2A: BIGQUERY STUDIO (OLAP Lakehouse)
  node(
    "n_bigquery_dw",
    `<div style="padding:6px 10px;text-align:left;font-family:'Google Sans',Roboto,Arial,sans-serif;">
      <div style="display:flex;align-items:center;gap:6px;">
        ${renderGcpIconHtml('bigquery', 18)}
        <span style="font-size:10.5px;font-weight:700;color:#202124;">BigQuery Studio (OLAP)</span>
      </div>
      <div style="font-size:7.5px;color:#E37400;font-weight:600;">Analytics Lakehouse &amp; Text-to-SQL</div>
    </div>`,
    735,
    260,
    235,
    44,
    `fillColor=${cardBg};strokeColor=#FBBC04;strokeWidth=1.5;shadow=1;rounded=1;arcSize=8;`
  );

  // DATA SOURCE 2B: CLOUD SPANNER (OLTP Transactional DB)
  node(
    "n_spanner_db",
    `<div style="padding:6px 10px;text-align:left;font-family:'Google Sans',Roboto,Arial,sans-serif;">
      <div style="display:flex;align-items:center;gap:6px;">
        ${renderGcpIconHtml('spanner', 18)}
        <span style="font-size:10.5px;font-weight:700;color:#202124;">Cloud Spanner (OLTP)</span>
      </div>
      <div style="font-size:7.5px;color:#1A73E8;font-weight:600;">TrueTime Globally Distributed DB</div>
    </div>`,
    735,
    312,
    235,
    44,
    `fillColor=${cardBg};strokeColor=#1A73E8;strokeWidth=1.5;shadow=1;rounded=1;arcSize=8;`
  );

  line(nid(), 'OLAP SQL', 'n_sql_agent', 'n_bigquery_dw', 1, 0.35, 0, 0.5, 'strokeColor=#E37400;strokeWidth=1.5;endArrow=block;endSize=4;', [
    { x: 720, y: 310 },
    { x: 720, y: 282 }
  ]);
  line(nid(), 'OLTP CRUD', 'n_sql_agent', 'n_spanner_db', 1, 0.65, 0, 0.5, 'strokeColor=#1A73E8;strokeWidth=1.5;endArrow=block;endSize=4;', [
    { x: 720, y: 332 },
    { x: 720, y: 334 }
  ]);

  // GOVERNANCE & PRIVILEGED HITL APPROVAL GATE
  node(
    "n_hitl_governance_node",
    `<div style="padding:6px 8px;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:'Google Sans',Roboto,Arial,sans-serif;">
      ${renderGcpIconHtml('cloud_iam', 18)}
      <div style="font-size:10px;font-weight:700;color:#202124;margin-top:2px;">HITL Approval Gate</div>
      <div style="font-size:7px;color:#D93025;font-weight:600;">Dual Admin Authorization</div>
    </div>`,
    735,
    385,
    115,
    65,
    `fillColor=${cardBg};strokeColor=#EA4335;strokeWidth=1.5;shadow=1;rounded=1;arcSize=8;`
  );

  // DATA SOURCE 3: VERTEX AI EXTENSIONS & TOOLS
  node(
    "n_vertex_extensions",
    `<div style="padding:8px 10px;text-align:left;font-family:'Google Sans',Roboto,Arial,sans-serif;">
      <div style="display:flex;align-items:center;gap:6px;">
        ${renderGcpIconHtml('agent_builder', 20)}
        <span style="font-size:10.5px;font-weight:700;color:#202124;">Vertex AI Extensions</span>
      </div>
      <div style="font-size:7.5px;color:#0D9488;font-weight:600;margin-top:1px;">Google Workspace, Salesforce, SAP</div>
    </div>`,
    865,
    385,
    140,
    65,
    `fillColor=${cardBg};strokeColor=#0D9488;strokeWidth=1.5;shadow=1;rounded=1;arcSize=8;`
  );

  // Tool Agent bifurcates: Privileged Mutation -> HITL, Standard Tool -> Direct
  line(nid(), 'Privileged', 'n_tool_agent', 'n_hitl_governance_node', 1, 0.35, 0, 0.5, 'strokeColor=#EA4335;strokeWidth=1.5;endArrow=block;endSize=4;', [
    { x: 720, y: 440 },
    { x: 720, y: 417 }
  ]);
  line(nid(), 'Approved', 'n_hitl_governance_node', 'n_vertex_extensions', 1, 0.5, 0, 0.5, 'strokeColor=#1E8E3E;strokeWidth=1.5;endArrow=block;endSize=4;');

  // Standard Direct Tool Call routes under HITL directly to Extensions via clear waypoint at x=855
  line(nid(), 'Standard API', 'n_tool_agent', 'n_vertex_extensions', 1, 0.75, 0, 0.85, 'strokeColor=#0D9488;strokeWidth=1.5;endArrow=block;endSize=4;', [
    { x: 720, y: 469 },
    { x: 855, y: 469 },
    { x: 855, y: 440 }
  ]);

  // =========================================================================
  // 7. COLUMN 5: GEMINI 3.1 PRO / FLASH REASONING PLATFORM (x=1050, w=185)
  // =========================================================================
  node(
    "n_gemini_core",
    `<div style="padding:14px 12px;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:'Google Sans',Roboto,Arial,sans-serif;">
      ${renderGcpIconHtml('gemini', 36)}
      <div style="font-size:13px;font-weight:700;color:#202124;margin-top:6px;letter-spacing:-0.2px;">Gemini 3.1 Pro / Flash</div>
      <div style="font-size:8.5px;color:#1E8E3E;font-weight:600;margin-top:2px;">Multimodal Reasoning &amp; Synthesis</div>
      <div style="font-size:7.5px;color:#5F6368;margin-top:4px;">2M Context • CoT Reflection</div>
    </div>`,
    1050,
    175,
    185,
    240,
    `fillColor=${cardBg};strokeColor=#1E8E3E;strokeWidth=2;shadow=1;rounded=1;arcSize=10;`
  );

  // 100% CLEAN DISCRETE HORIZONTAL CONNECTOR PORTS INTO GEMINI:
  
  // Port 1 (y=195 = 175 + 240*0.08): Fast Path Direct Prompt (routes through open top channel y=96)
  line(nid(), 'Direct Prompt', 'n_fast_path', 'n_gemini_core', 1, 0.5, 0, 0.08, 'strokeColor=#1E8E3E;strokeWidth=1.5;endArrow=block;endSize=4;', [
    { x: 485, y: 96 },
    { x: 1030, y: 96 },
    { x: 1030, y: 195 }
  ]);

  // Port 2 (y=235 = 175 + 240*0.25): Vector Search Context
  line(nid(), 'Vector Context', 'n_vector_search', 'n_gemini_core', 1, 0.5, 0, 0.25, 'strokeColor=#1A73E8;strokeWidth=1.5;endArrow=block;endSize=4;', [
    { x: 1020, y: 164 },
    { x: 1020, y: 235 }
  ]);

  // Port 3 (y=282 = 175 + 240*0.45): BigQuery SQL Records (OLAP)
  line(nid(), 'OLAP Records', 'n_bigquery_dw', 'n_gemini_core', 1, 0.5, 0, 0.45, 'strokeColor=#E37400;strokeWidth=1.5;endArrow=block;endSize=4;');

  // Port 4 (y=334 = 175 + 240*0.66): Cloud Spanner Records (OLTP)
  line(nid(), 'OLTP State', 'n_spanner_db', 'n_gemini_core', 1, 0.5, 0, 0.66, 'strokeColor=#1A73E8;strokeWidth=1.5;endArrow=block;endSize=4;');

  // Port 5 (y=385 = 175 + 240*0.88): Vertex Extensions Action Payload
  line(nid(), 'Action Payload', 'n_vertex_extensions', 'n_gemini_core', 1, 0.5, 0, 0.88, 'strokeColor=#0D9488;strokeWidth=1.5;endArrow=block;endSize=4;', [
    { x: 1030, y: 417 },
    { x: 1030, y: 385 }
  ]);

  // =========================================================================
  // 8. COLUMN 6: SAFETY GUARDRAILS & STREAMED DELIVERY (x=1275, w=200)
  // =========================================================================
  node(
    "gate_factuality",
    `<div style="padding:10px 12px;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:'Google Sans',Roboto,Arial,sans-serif;">
      ${renderGcpIconHtml('model_armor', 26)}
      <div style="font-size:11.5px;font-weight:700;color:#202124;margin-top:4px;">Vertex Model Armor</div>
      <div style="font-size:8px;color:#D93025;font-weight:600;">Factuality &amp; Grounding SLA Filter</div>
    </div>`,
    1275,
    255,
    200,
    80,
    `fillColor=${cardBg};strokeColor=#EA4335;strokeWidth=1.5;shadow=1;rounded=1;arcSize=8;`
  );

  // Gemini Output -> Model Armor: 100% straight horizontal line at y=295
  line(nid(), 'Verify Output', 'n_gemini_core', 'gate_factuality', 1, 0.5, 0, 0.5, 'strokeColor=#EA4335;strokeWidth=1.5;endArrow=block;endSize=4;');

  // Self-Correction Loop: Clean orthogonal loop exiting top of Model Armor (y=255) -> enters top of Gemini (y=175)
  line(nid(), 'Self-Correction Loop (Max 3)', 'gate_factuality', 'n_gemini_core', 0.5, 0, 0.5, 0, 'strokeColor=#EA4335;strokeWidth=1.5;dashed=1;dashPattern=4 4;endArrow=block;endSize=4;', [
    { x: 1375, y: 135 },
    { x: 1142, y: 135 }
  ]);

  // STREAMED GROUNDED RESPONSE
  node(
    "n_delivery",
    `<div style="padding:10px 12px;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:'Google Sans',Roboto,Arial,sans-serif;">
      ${renderGcpIconHtml('vertex_ai', 26)}
      <div style="font-size:12px;font-weight:700;color:#1E8E3E;margin-top:4px;">Grounded Stream to User</div>
      <div style="font-size:8.5px;color:#137333;font-weight:600;">Verified Citations • Sub-Second TTFT</div>
    </div>`,
    1275,
    380,
    200,
    76,
    `fillColor=${cardBg};strokeColor=#1E8E3E;strokeWidth=1.8;shadow=1;rounded=1;arcSize=8;`
  );

  // Grounded path DOWN to Streamed Delivery (100% straight vertical at x=1375)
  line(nid(), 'Grounded (Pass)', 'gate_factuality', 'n_delivery', 0.5, 1, 0.5, 0, 'strokeColor=#1E8E3E;strokeWidth=1.8;endArrow=block;endSize=4;');

  // CLOUD LOGGING & GENAI EVAL
  node(
    "n_audit_logging",
    `<div style="padding:8px 10px;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:'Google Sans',Roboto,Arial,sans-serif;">
      ${renderGcpIconHtml('cloud_logging', 20)}
      <div style="font-size:10.5px;font-weight:700;color:#202124;margin-top:3px;">Cloud Logging &amp; Eval</div>
      <div style="font-size:8px;color:#5F6368;">Audit Trail • Token FinOps • Latency Telemetry</div>
    </div>`,
    1275,
    490,
    200,
    60,
    `fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;shadow=1;rounded=1;arcSize=8;`
  );

  // Delivery -> Logging (100% straight vertical at x=1375)
  line(nid(), '', 'n_delivery', 'n_audit_logging', 0.5, 1, 0.5, 0, 'strokeColor=#1A73E8;strokeWidth=1.5;dashed=1;dashPattern=4 4;endArrow=block;endSize=4;');

  // CLOSED-LOOP PHYSICAL RETURN VECTOR (Cloud Logging & Eval -> Supervisor Agent via open bottom channel y=560)
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
    `<div style="padding:8px 12px;display:flex;align-items:center;gap:10px;font-family:'Google Sans',Roboto,Arial,sans-serif;">
      ${renderGcpIconHtml('cloud_monitoring', 24)}
      <div>
        <div style="font-size:10.5px;font-weight:700;color:#202124;">Cloud Monitoring &amp; OpenTelemetry</div>
        <div style="font-size:8px;color:#5F6368;">Distributed Agent Tracing • Token Metrics • Latency Profiles</div>
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
    `<div style="padding:8px 12px;display:flex;align-items:center;gap:10px;font-family:'Google Sans',Roboto,Arial,sans-serif;">
      ${renderGcpIconHtml('vpc_sc', 24)}
      <div>
        <div style="font-size:10.5px;font-weight:700;color:#202124;">Cloud IAM &amp; VPC Service Controls</div>
        <div style="font-size:8px;color:#5F6368;">Least-Privilege RBAC • Workload Identity Federation • CMEK</div>
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
    `<div style="padding:8px 12px;display:flex;align-items:center;gap:10px;font-family:'Google Sans',Roboto,Arial,sans-serif;">
      ${renderGcpIconHtml('scc', 24)}
      <div>
        <div style="font-size:10.5px;font-weight:700;color:#202124;">Security Command Center &amp; Policy</div>
        <div style="font-size:8px;color:#5F6368;">Dual-Admin Approval Gate • Model Armor Policies • SLA Guardrails</div>
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
    `<div style="padding:8px 12px;display:flex;align-items:center;gap:10px;font-family:'Google Sans',Roboto,Arial,sans-serif;">
      ${renderGcpIconHtml('cloud_deploy', 24)}
      <div>
        <div style="font-size:10.5px;font-weight:700;color:#202124;">Google Cloud Deploy &amp; Cloud Build</div>
        <div style="font-size:8px;color:#5F6368;">Automated Canary Rollouts • SLSA Level 3 Supply Chain Security</div>
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
    `<div style="padding:6px 16px;background:#FFFFFF;border-radius:6px;border:1px solid #DADCE0;display:flex;align-items:center;justify-content:space-between;box-shadow:0 1px 2px rgba(60,64,67,0.08);font-family:'Google Sans',Roboto,Arial,sans-serif;">
      <div style="display:flex;align-items:center;gap:8px;">
        ${renderGcpIconHtml('vertex_ai', 20)}
        <span style="font-size:11px;font-weight:700;color:#202124;">CLOSED-LOOP FEEDBACK: CONTINUOUS USER EVALUATION &amp; LIVE MODEL DRIFT MONITORING</span>
      </div>
      <span style="font-size:9px;font-weight:600;background:#E6F4EA;color:#137333;padding:3px 10px;border-radius:4px;border:1px solid #CEEAD6;">Sub-Second TTFT • Zero Hallucination SLA (99.999% Grounded)</span>
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
  <diagram id="gcp_enterprise_production_flow" name="${E(projectTitle)}">
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

export const generateGcpFunctionalFlowchartXml = generateGCPFunctionalFlowchart;
