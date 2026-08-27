/**
 * Master Minimalist Google Cloud Agentic AI Process Flow
 * Zero Colored Layer Boxes, Zero Container Rectangles, Pure Clean Floating Architecture
 * Master 16:9 Ultra-Widescreen Canvas (1600x900)
 */

export interface GCPFunctionalFlowchartOptions {
  projectName?: string;
  useCaseName?: string;
  projectTitle?: string;
  prompt?: string;
  theme?: 'light' | 'dark';
}

export function generateGCPFunctionalFlowchart(options: GCPFunctionalFlowchartOptions = {}): string {
  const {
    projectTitle = 'Google Cloud Agentic AI — Process Flow',
    theme = 'light'
  } = options;

  const isDark = theme === 'dark';
  const bg = isDark ? '#0F172A' : '#FFFFFF';
  const textDark = isDark ? '#F8FAFC' : '#0F172A';
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

  const line = (id: string, val: string, x1: number, y1: number, x2: number, y2: number, style: string, pts?: { x: number; y: number }[]) => {
    const labelStyle = val ? `fontColor=#0F172A;fontStyle=1;fontSize=8.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=3;` : "";
    let ptsXml = '';
    if (pts && pts.length > 0) {
      ptsXml = `<Array as="points">${pts.map(p => `<mxPoint x="${p.x}" y="${p.y}"/>`).join('')}</Array>`;
    }
    c.push(
      `<mxCell id="${id}" value="${E(val)}" edge="1" parent="1" style="rounded=0;html=1;edgeStyle=none;${labelStyle}${style}">` +
      `<mxGeometry relative="1" as="geometry">` +
      `<mxPoint x="${x1}" y="${y1}" as="sourcePoint"/>` +
      `<mxPoint x="${x2}" y="${y2}" as="targetPoint"/>` +
      ptsXml +
      `</mxGeometry>` +
      `</mxCell>`
    );
  };

  // =========================================================================
  // 1. MINIMALIST TOP HEADER (NO BACKGROUND BOX)
  // =========================================================================
  node(
    "hdr_main",
    `<div style="display:flex;align-items:center;justify-content:space-between;width:100%;padding:4px 8px;">
      <div>
        <div style="font-size:24px;font-weight:900;color:${textDark};letter-spacing:-0.5px;">Google Cloud Agentic AI — Process Flow</div>
        <div style="font-size:12px;font-weight:700;color:#2563EB;margin-top:2px;">Step-by-Step Flow: Ingress → Zero-Trust Security → Multi-Agent Orchestration → Vector RAG → Gemini 3.1 Reasoning → MCP Tools → Guardrails → Streamed Output</div>
      </div>
      <div style="display:flex;align-items:center;gap:8px;background:#F8FAFC;padding:6px 16px;border-radius:9999px;border:1px solid #CBD5E1;">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" fill="#4285F4"/></svg>
        <span style="font-size:13px;font-weight:900;color:#1E293B;">Google Cloud Reference Architecture</span>
      </div>
    </div>`,
    20,
    14,
    1560,
    44,
    "strokeColor=none;fillColor=none;align=left;verticalAlign=middle;"
  );

  // =========================================================================
  // 2. SEVEN CLEAN FLOATING STEP COLUMNS (NO COLORED BACKGROUND CONTAINERS)
  // =========================================================================
  // Total width: 1560px. 7 columns with width=210px each and gap=15px.
  // Col 0: x=20
  // Col 1: x=245
  // Col 2: x=470
  // Col 3: x=695
  // Col 4: x=920
  // Col 5: x=1145
  // Col 6: x=1370

  // -------------------------------------------------------------------------
  // COLUMN 1: STEP ❶ INGESTION & CLIENTS (x=20, w=210)
  // -------------------------------------------------------------------------
  node(
    "col1_hdr",
    `<div style="text-align:center;">
      <div style="font-size:16px;font-weight:900;color:#1D4ED8;">❶ INGESTION</div>
      <div style="font-size:8.5px;color:#64748B;font-weight:700;margin-top:2px;">Omnichannel Ingress</div>
    </div>`,
    20,
    75,
    210,
    36,
    "strokeColor=none;fillColor=none;align=center;verticalAlign=middle;"
  );

  node(
    "s1_users",
    `<div style="text-align:center;padding:6px;">
      <div style="font-size:24px;">👥</div>
      <div style="font-size:11px;font-weight:900;color:#0F172A;margin-top:4px;">Web &amp; Mobile Users</div>
      <div style="font-size:8px;color:#64748B;margin-top:2px;">React / Flutter SDK</div>
    </div>`,
    20,
    125,
    210,
    88,
    "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;rounded=1;shadow=0;"
  );

  node(
    "s1_chatbots",
    `<div style="text-align:center;padding:6px;">
      <div style="font-size:22px;">💬</div>
      <div style="font-size:11px;font-weight:900;color:#0F172A;margin-top:4px;">Slack &amp; Teams Bots</div>
      <div style="font-size:8px;color:#64748B;margin-top:2px;">Interactive Copilot UI</div>
    </div>`,
    20,
    230,
    210,
    88,
    "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;rounded=1;shadow=0;"
  );

  node(
    "s1_apis",
    `<div style="text-align:center;padding:6px;">
      <div style="font-size:22px;">🔌</div>
      <div style="font-size:11px;font-weight:900;color:#0F172A;margin-top:4px;">Enterprise APIs</div>
      <div style="font-size:8px;color:#64748B;margin-top:2px;">REST &amp; gRPC Endpoints</div>
    </div>`,
    20,
    335,
    210,
    88,
    "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;rounded=1;shadow=0;"
  );

  node(
    "s1_events",
    `<div style="text-align:center;padding:6px;">
      <div style="font-size:22px;">⚡</div>
      <div style="font-size:11px;font-weight:900;color:#0F172A;margin-top:4px;">Event Streams</div>
      <div style="font-size:8px;color:#64748B;margin-top:2px;">Pub/Sub &amp; Eventarc</div>
    </div>`,
    20,
    440,
    210,
    88,
    "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;rounded=1;shadow=0;"
  );

  // -------------------------------------------------------------------------
  // COLUMN 2: STEP ❷ ZERO-TRUST SECURITY (x=245, w=210)
  // -------------------------------------------------------------------------
  node(
    "col2_hdr",
    `<div style="text-align:center;">
      <div style="font-size:16px;font-weight:900;color:#1D4ED8;">❷ SECURITY</div>
      <div style="font-size:8.5px;color:#64748B;font-weight:700;margin-top:2px;">Zero-Trust Edge Gate</div>
    </div>`,
    245,
    75,
    210,
    36,
    "strokeColor=none;fillColor=none;align=center;verticalAlign=middle;"
  );

  node(
    "s2_armor",
    `<div style="padding:8px;text-align:center;">
      <div style="font-size:22px;">🛡️</div>
      <div style="font-size:11px;font-weight:900;color:#1E3A8A;margin-top:2px;">Cloud Armor (WAF)</div>
      <div style="font-size:8px;color:#475569;font-weight:600;margin-top:2px;">Adaptive DDoS &amp; ML Defense</div>
    </div>`,
    245,
    125,
    210,
    95,
    "fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.5;rounded=1;shadow=0;"
  );

  node(
    "s2_gclb",
    `<div style="padding:8px;text-align:center;">
      <div style="font-size:22px;">🔀</div>
      <div style="font-size:11px;font-weight:900;color:#1E3A8A;margin-top:2px;">External HTTP(S) LB</div>
      <div style="font-size:8px;color:#475569;font-weight:600;margin-top:2px;">Global Anycast IP • SSL</div>
    </div>`,
    245,
    235,
    210,
    95,
    "fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.5;rounded=1;shadow=0;"
  );

  node(
    "s2_iap",
    `<div style="padding:8px;text-align:center;">
      <div style="font-size:22px;">🔑</div>
      <div style="font-size:11px;font-weight:900;color:#0369A1;margin-top:2px;">Identity-Aware Proxy</div>
      <div style="font-size:8px;color:#475569;font-weight:600;margin-top:2px;">BeyondCorp Zero-Trust Auth</div>
    </div>`,
    245,
    345,
    210,
    95,
    "fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.5;rounded=1;shadow=0;"
  );

  node(
    "s2_apigee",
    `<div style="padding:6px;text-align:center;">
      <div style="font-size:20px;">⚡</div>
      <div style="font-size:11px;font-weight:900;color:#0F766E;margin-top:2px;">Apigee API Hub</div>
      <div style="font-size:8px;color:#475569;margin-top:2px;">Rate Limiting &amp; Quotas</div>
    </div>`,
    245,
    455,
    210,
    73,
    "fillColor=#FFFFFF;strokeColor=#0D9488;strokeWidth=1.2;rounded=1;shadow=0;"
  );

  // -------------------------------------------------------------------------
  // COLUMN 3: STEP ❸ ORCHESTRATION & SWARM (x=470, w=210)
  // -------------------------------------------------------------------------
  node(
    "col3_hdr",
    `<div style="text-align:center;">
      <div style="font-size:16px;font-weight:900;color:#1D4ED8;">❸ ORCHESTRATION</div>
      <div style="font-size:8.5px;color:#64748B;font-weight:700;margin-top:2px;">Supervisor &amp; Swarm</div>
    </div>`,
    470,
    75,
    210,
    36,
    "strokeColor=none;fillColor=none;align=center;verticalAlign=middle;"
  );

  node(
    "s3_supervisor",
    `<div style="padding:8px 10px;text-align:center;">
      <div style="font-size:22px;">👑</div>
      <div style="font-size:11.5px;font-weight:900;color:#5B21B6;margin-top:2px;">Supervisor Agent</div>
      <div style="font-size:8px;color:#4B5563;font-weight:600;margin-top:2px;">GKE Autopilot • Task Graph</div>
    </div>`,
    470,
    125,
    210,
    88,
    "fillColor=#FFFFFF;strokeColor=#A855F7;strokeWidth=2;rounded=1;shadow=0;"
  );

  node(
    "s3_rag_agent",
    `<div style="padding:6px 10px;">
      <div style="font-size:10px;font-weight:900;color:#0284C7;display:flex;align-items:center;gap:4px;">
        <span>🔍</span> RAG Specialist
      </div>
      <div style="font-size:7.5px;color:#64748B;margin-top:2px;">Semantic Context Retrieval</div>
    </div>`,
    470,
    225,
    210,
    50,
    "fillColor=#FFFFFF;strokeColor=#38BDF8;strokeWidth=1.2;rounded=1;shadow=0;"
  );

  node(
    "s3_sql_agent",
    `<div style="padding:6px 10px;">
      <div style="font-size:10px;font-weight:900;color:#D97706;display:flex;align-items:center;gap:4px;">
        <span>📊</span> SQL &amp; Data Agent
      </div>
      <div style="font-size:7.5px;color:#64748B;margin-top:2px;">BigQuery / Spanner Queries</div>
    </div>`,
    470,
    285,
    210,
    50,
    "fillColor=#FFFFFF;strokeColor=#FBBF24;strokeWidth=1.2;rounded=1;shadow=0;"
  );

  node(
    "s3_tool_agent",
    `<div style="padding:6px 10px;">
      <div style="font-size:10px;font-weight:900;color:#0F766E;display:flex;align-items:center;gap:4px;">
        <span>⚙️</span> Tool &amp; Action Agent
      </div>
      <div style="font-size:7.5px;color:#64748B;margin-top:2px;">OpenAPI Function Calls</div>
    </div>`,
    470,
    345,
    210,
    50,
    "fillColor=#FFFFFF;strokeColor=#2DD4BF;strokeWidth=1.2;rounded=1;shadow=0;"
  );

  node(
    "s3_cloud_run",
    `<div style="padding:6px 10px;">
      <div style="font-size:10px;font-weight:900;color:#0F766E;">⚡ Cloud Run Workers</div>
      <div style="font-size:7.5px;color:#64748B;margin-top:2px;">Serverless (Scale to 0)</div>
    </div>`,
    470,
    405,
    210,
    55,
    "fillColor=#FFFFFF;strokeColor=#14B8A6;strokeWidth=1.2;rounded=1;shadow=0;"
  );

  node(
    "s3_redis",
    `<div style="padding:6px 10px;">
      <div style="font-size:10px;font-weight:900;color:#B91C1C;">🧠 Memorystore Redis</div>
      <div style="font-size:7.5px;color:#64748B;margin-top:2px;">Active Session Working Memory</div>
    </div>`,
    470,
    470,
    210,
    58,
    "fillColor=#FFFFFF;strokeColor=#EF4444;strokeWidth=1.2;rounded=1;shadow=0;"
  );

  // -------------------------------------------------------------------------
  // COLUMN 4: STEP ❹ VECTOR RAG & KNOWLEDGE (x=695, w=210)
  // -------------------------------------------------------------------------
  node(
    "col4_hdr",
    `<div style="text-align:center;">
      <div style="font-size:16px;font-weight:900;color:#1D4ED8;">❹ VECTOR RAG</div>
      <div style="font-size:8.5px;color:#64748B;font-weight:700;margin-top:2px;">Knowledge Retrieval</div>
    </div>`,
    695,
    75,
    210,
    36,
    "strokeColor=none;fillColor=none;align=center;verticalAlign=middle;"
  );

  node(
    "s4_vector_search",
    `<div style="padding:8px 10px;text-align:center;">
      <div style="font-size:24px;">🎯</div>
      <div style="font-size:11px;font-weight:900;color:#0369A1;margin-top:2px;">Vertex Vector Search</div>
      <div style="font-size:8px;color:#64748B;font-weight:600;margin-top:2px;">ScaNN Semantic Index (&lt; 5ms)</div>
    </div>`,
    695,
    125,
    210,
    95,
    "fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.5;rounded=1;shadow=0;"
  );

  node(
    "s4_doc_ai",
    `<div style="padding:8px 10px;text-align:center;">
      <div style="font-size:22px;">📑</div>
      <div style="font-size:11px;font-weight:900;color:#0369A1;margin-top:2px;">Document AI &amp; OCR</div>
      <div style="font-size:8px;color:#64748B;margin-top:2px;">Layout Parser • Semantic Chunking</div>
    </div>`,
    695,
    235,
    210,
    95,
    "fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.2;rounded=1;shadow=0;"
  );

  node(
    "s4_gcs",
    `<div style="padding:8px 10px;text-align:center;">
      <div style="font-size:22px;">🪣</div>
      <div style="font-size:11px;font-weight:900;color:#B45309;margin-top:2px;">Cloud Storage (GCS)</div>
      <div style="font-size:8px;color:#64748B;margin-top:2px;">PDFs • Audio • Medical Imaging</div>
    </div>`,
    695,
    345,
    210,
    95,
    "fillColor=#FFFFFF;strokeColor=#F59E0B;strokeWidth=1.2;rounded=1;shadow=0;"
  );

  // -------------------------------------------------------------------------
  // COLUMN 5: STEP ❺ GEMINI 3.1 REASONING (x=920, w=210)
  // -------------------------------------------------------------------------
  node(
    "col5_hdr",
    `<div style="text-align:center;">
      <div style="font-size:16px;font-weight:900;color:#1D4ED8;">❺ REASONING</div>
      <div style="font-size:8.5px;color:#64748B;font-weight:700;margin-top:2px;">Gemini 3.1 Platform</div>
    </div>`,
    920,
    75,
    210,
    36,
    "strokeColor=none;fillColor=none;align=center;verticalAlign=middle;"
  );

  node(
    "s5_gemini_core",
    `<div style="padding:10px 8px;text-align:center;">
      <div style="font-size:28px;">✨</div>
      <div style="font-size:12.5px;font-weight:900;color:#14532D;margin-top:2px;">GEMINI 3.1 PRO / FLASH</div>
      <div style="font-size:8.5px;color:#166534;font-weight:700;margin-top:2px;">Multimodal Reasoning Core</div>
      <div style="font-size:7.5px;color:#4B5563;font-weight:600;margin-top:4px;">2M Context • Tool Calling</div>
    </div>`,
    920,
    125,
    210,
    130,
    "fillColor=#FFFFFF;strokeColor=#22C55E;strokeWidth=2;rounded=1;shadow=0;"
  );

  node(
    "s5_agent_builder",
    `<div style="padding:8px 10px;">
      <div style="font-size:10.5px;font-weight:900;color:#15803D;">⚡ Vertex Agent Builder</div>
      <div style="font-size:8px;color:#64748B;margin-top:2px;">Prompt Studio &amp; ADK 2.0</div>
    </div>`,
    920,
    270,
    210,
    55,
    "fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.2;rounded=1;shadow=0;"
  );

  node(
    "s5_model_garden",
    `<div style="padding:8px 10px;">
      <div style="font-size:10.5px;font-weight:900;color:#B45309;">💎 Vertex Model Garden</div>
      <div style="font-size:8px;color:#64748B;margin-top:2px;">Gemma, Imagen 3, LoRA</div>
    </div>`,
    920,
    340,
    210,
    55,
    "fillColor=#FFFFFF;strokeColor=#F59E0B;strokeWidth=1.2;rounded=1;shadow=0;"
  );

  node(
    "s5_tpu_serving",
    `<div style="padding:8px 10px;">
      <div style="font-size:10.5px;font-weight:900;color:#15803D;">🚀 Cloud TPU v5e Serving</div>
      <div style="font-size:8px;color:#64748B;margin-top:2px;">Low-Latency gRPC Streaming</div>
    </div>`,
    920,
    410,
    210,
    55,
    "fillColor=#FFFFFF;strokeColor=#22C55E;strokeWidth=1.2;rounded=1;shadow=0;"
  );

  // -------------------------------------------------------------------------
  // COLUMN 6: STEP ❻ MCP TOOLS & DATA LAKE (x=1145, w=210)
  // -------------------------------------------------------------------------
  node(
    "col6_hdr",
    `<div style="text-align:center;">
      <div style="font-size:16px;font-weight:900;color:#1D4ED8;">❻ MCP TOOLS</div>
      <div style="font-size:8.5px;color:#64748B;font-weight:700;margin-top:2px;">Enterprise Mutation</div>
    </div>`,
    1145,
    75,
    210,
    36,
    "strokeColor=none;fillColor=none;align=center;verticalAlign=middle;"
  );

  node(
    "s6_mcp_hub",
    `<div style="padding:8px 10px;text-align:center;">
      <div style="font-size:22px;">🔌</div>
      <div style="font-size:11px;font-weight:900;color:#0369A1;margin-top:2px;">MCP Tool Gateway</div>
      <div style="font-size:8px;color:#64748B;font-weight:600;margin-top:2px;">OpenAPI &amp; Function Calling</div>
    </div>`,
    1145,
    125,
    210,
    95,
    "fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.5;rounded=1;shadow=0;"
  );

  node(
    "s6_spanner",
    `<div style="padding:8px 10px;">
      <div style="font-size:10.5px;font-weight:900;color:#0369A1;">🗄️ Cloud Spanner</div>
      <div style="font-size:8px;color:#64748B;margin-top:2px;">TrueTime State (99.999% SLA)</div>
    </div>`,
    1145,
    235,
    210,
    60,
    "fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.2;rounded=1;shadow=0;"
  );

  node(
    "s6_bigquery",
    `<div style="padding:8px 10px;">
      <div style="font-size:10.5px;font-weight:900;color:#B45309;">📊 BigQuery Lakehouse</div>
      <div style="font-size:8px;color:#64748B;margin-top:2px;">Petabyte Analytics &amp; Vector SQL</div>
    </div>`,
    1145,
    310,
    210,
    60,
    "fillColor=#FFFFFF;strokeColor=#F59E0B;strokeWidth=1.2;rounded=1;shadow=0;"
  );

  node(
    "s6_dataflow",
    `<div style="padding:8px 10px;">
      <div style="font-size:10.5px;font-weight:900;color:#B45309;">🔄 Cloud Dataflow</div>
      <div style="font-size:8px;color:#64748B;margin-top:2px;">Streaming CDC &amp; Embeddings</div>
    </div>`,
    1145,
    385,
    210,
    60,
    "fillColor=#FFFFFF;strokeColor=#F59E0B;strokeWidth=1.2;rounded=1;shadow=0;"
  );

  // -------------------------------------------------------------------------
  // COLUMN 7: STEP ❼ GUARDRAILS & STREAMED DELIVERY (x=1370, w=210)
  // -------------------------------------------------------------------------
  node(
    "col7_hdr",
    `<div style="text-align:center;">
      <div style="font-size:16px;font-weight:900;color:#15803D;">❼ DELIVERY</div>
      <div style="font-size:8.5px;color:#64748B;font-weight:700;margin-top:2px;">Zero Hallucination</div>
    </div>`,
    1370,
    75,
    210,
    36,
    "strokeColor=none;fillColor=none;align=center;verticalAlign=middle;"
  );

  node(
    "s7_guardrails",
    `<div style="padding:8px 10px;text-align:center;">
      <div style="font-size:24px;">🛡️</div>
      <div style="font-size:11px;font-weight:900;color:#991B1B;margin-top:2px;">Model Armor &amp; Safety</div>
      <div style="font-size:8px;color:#4B5563;font-weight:600;margin-top:2px;">Factuality &amp; Grounding Verification</div>
    </div>`,
    1370,
    125,
    210,
    95,
    "fillColor=#FFFFFF;strokeColor=#EF4444;strokeWidth=1.5;rounded=1;shadow=0;"
  );

  node(
    "s7_delivery",
    `<div style="padding:10px;text-align:center;">
      <div style="font-size:28px;">✅</div>
      <div style="font-size:11.5px;font-weight:900;color:#14532D;margin-top:2px;">Grounded Stream to User</div>
      <div style="font-size:8px;color:#166534;font-weight:700;margin-top:2px;">Verified Citations • Sub-Second TTFT</div>
    </div>`,
    1370,
    235,
    210,
    115,
    "fillColor=#FFFFFF;strokeColor=#22C55E;strokeWidth=2;rounded=1;shadow=0;"
  );

  node(
    "s7_audit",
    `<div style="padding:8px 10px;text-align:center;">
      <div style="font-size:20px;">📊</div>
      <div style="font-size:10.5px;font-weight:900;color:#1E3A8A;margin-top:2px;">Cloud Logging &amp; Trace</div>
      <div style="font-size:8px;color:#64748B;margin-top:2px;">Audit Trail &amp; Token Telemetry</div>
    </div>`,
    1370,
    365,
    210,
    80,
    "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;shadow=0;"
  );

  // =========================================================================
  // 3. BOTTOM CROSS-CUTTING FOUNDATION (FLOATING CARDS, NO BIG LAYER BOX)
  // =========================================================================
  node(
    "fnd_monitoring",
    `<div style="padding:6px 12px;display:flex;align-items:center;gap:10px;">
      <span style="font-size:20px;">📊</span>
      <div>
        <div style="font-size:10px;font-weight:900;color:#0369A1;">Cloud Monitoring &amp; OpenTelemetry</div>
        <div style="font-size:7.5px;color:#64748B;font-weight:600;">Agent Tracing • Token Telemetry • Latency Profiles</div>
      </div>
    </div>`,
    20,
    570,
    370,
    48,
    "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;"
  );

  node(
    "fnd_iam_security",
    `<div style="padding:6px 12px;display:flex;align-items:center;gap:10px;">
      <span style="font-size:20px;">🔑</span>
      <div>
        <div style="font-size:10px;font-weight:900;color:#0369A1;">Cloud IAM &amp; VPC Service Controls</div>
        <div style="font-size:7.5px;color:#64748B;font-weight:600;">Least-Privilege RBAC • Workload Identity • Cloud KMS</div>
      </div>
    </div>`,
    405,
    570,
    375,
    48,
    "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;"
  );

  node(
    "fnd_hitl_governance",
    `<div style="padding:6px 12px;display:flex;align-items:center;gap:10px;">
      <span style="font-size:20px;">⚖️</span>
      <div>
        <div style="font-size:10px;font-weight:900;color:#5B21B6;">Human-in-the-Loop Approval Console</div>
        <div style="font-size:7.5px;color:#64748B;font-weight:600;">Dual-Signoff on Mutation • Governance Policies</div>
      </div>
    </div>`,
    795,
    570,
    375,
    48,
    "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;"
  );

  node(
    "fnd_gitops_deploy",
    `<div style="padding:6px 12px;display:flex;align-items:center;gap:10px;">
      <span style="font-size:20px;">🚀</span>
      <div>
        <div style="font-size:10px;font-weight:900;color:#15803D;">Cloud Deploy &amp; ArgoCD GitOps</div>
        <div style="font-size:7.5px;color:#64748B;font-weight:600;">Automated Canary Rollout • SLSA L3 Supply Chain</div>
      </div>
    </div>`,
    1185,
    570,
    395,
    48,
    "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;"
  );

  // Bottom Closed Feedback Return Banner
  node(
    "feedback_return_banner",
    `<div style="padding:6px 16px;background:#F0FDF4;border-radius:6px;border:1.5px solid #22C55E;display:flex;align-items:center;justify-content:space-between;">
      <div style="display:flex;align-items:center;gap:8px;">
        <span style="font-size:18px;">✅</span>
        <span style="font-size:11px;font-weight:900;color:#14532D;">CLOSED-LOOP FEEDBACK: CONTINUOUS USER EVALUATION &amp; DRIFT MONITORING</span>
      </div>
      <span style="font-size:8.5px;font-weight:800;background:#DCFCE7;color:#14532D;padding:2px 8px;border-radius:4px;border:1px solid #86EFAC;">Sub-Second TTFT • Zero Hallucination SLA</span>
    </div>`,
    20,
    630,
    1560,
    38,
    "fillColor=#F0FDF4;strokeColor=#22C55E;strokeWidth=1.5;rounded=1;"
  );

  // =========================================================================
  // 4. CLEAN STEPPED PROCESS CONNECTORS (NO CLASHING DIAGONALS)
  // =========================================================================
  
  // Step 1 -> Step 2: Users -> Cloud Armor (y=170)
  line(nid(), '❶ Submit Prompt', 230, 170, 245, 170, 'strokeColor=#2563EB;strokeWidth=2;endArrow=block;endSize=4;');

  // Step 2 -> Step 3: IAP -> Supervisor (y=392 -> y=170)
  line(nid(), '❷ Auth Token', 455, 392, 470, 170, 'strokeColor=#2563EB;strokeWidth=2.2;endArrow=block;endSize=4;', [
    { x: 462, y: 392 },
    { x: 462, y: 170 }
  ]);

  // Step 3 -> Step 4: RAG Specialist -> Vector Search (y=250 -> y=170)
  line(nid(), '❸ Vector Similarity', 680, 250, 695, 170, 'strokeColor=#0284C7;strokeWidth=2;endArrow=block;endSize=4;', [
    { x: 687, y: 250 },
    { x: 687, y: 170 }
  ]);

  // Step 4 -> Step 5: Vector Search -> Gemini Core (y=170)
  line(nid(), '❹ Grounded Context', 905, 170, 920, 170, 'strokeColor=#15803D;strokeWidth=2.2;endArrow=block;endSize=4;');

  // Step 5 -> Step 6: Gemini Core -> MCP Tool Hub (y=170)
  line(nid(), '❺ Function Calling', 1130, 170, 1145, 170, 'strokeColor=#0284C7;strokeWidth=2.2;endArrow=block;endSize=4;');

  // Step 6 -> Step 7: MCP Hub -> Guardrails (y=170)
  line(nid(), '❻ Action Results', 1355, 170, 1370, 170, 'strokeColor=#DC2626;strokeWidth=2.2;endArrow=block;endSize=4;');

  // Step 7: Guardrails -> Final Streamed Delivery (y=220 -> y=235)
  line(nid(), '❼ Verified Grounded', 1475, 220, 1475, 235, 'strokeColor=#16A34A;strokeWidth=2.5;endArrow=block;endSize=4;');

  // Self-Correction Loop (from Guardrails back to Gemini Core)
  line(nid(), 'NO (Self-Correction Loop)', 1370, 195, 1130, 195, 'strokeColor=#DC2626;strokeWidth=1.5;dashed=1;dashPattern=4 4;endArrow=block;endSize=4;');

  // Assemble full XML envelope
  return `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="embed.diagrams.net">
  <diagram id="gcp_clean_process_flow" name="${E(projectTitle)}">
    <mxGraphModel dx="1600" dy="720" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="720" background="${bg}" math="0" shadow="0">
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
