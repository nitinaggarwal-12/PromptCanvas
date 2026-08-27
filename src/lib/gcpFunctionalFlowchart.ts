/**
 * Master Enterprise Google Cloud Agentic AI Process Flow Diagram
 * Complete Production Reference Architecture preserving the Clean Floating Layout,
 * Decision Diamonds, 3 Parallel Execution Lanes, Fork/Join Synchronization,
 * Conversational Memory, Document Ingestion Pipeline, Cloud DLP, and Guardrails.
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
    projectTitle = 'Google Cloud Agentic AI — Enterprise Production Process Flow',
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
    const labelStyle = val ? `fontColor=#0F172A;fontStyle=1;fontSize=8;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=3;` : "";
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
  // 1. MASTER HEADER BANNER (NO BACKGROUND LAYER)
  // =========================================================================
  node(
    "hdr_main",
    `<div style="display:flex;align-items:center;justify-content:space-between;width:100%;padding:4px 8px;">
      <div>
        <div style="font-size:24px;font-weight:900;color:${textDark};letter-spacing:-0.5px;">Google Cloud Agentic AI — Enterprise Production Process Flow</div>
        <div style="font-size:12px;font-weight:700;color:#2563EB;margin-top:2px;">Cloud DLP Security • Episodic Memory • 3 Parallel Execution Paths • HITL Gate • Factuality Self-Correction</div>
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
  // 2. STAGE 1: INGRESS, SECURITY & CLOUD DLP (x=20..210)
  // =========================================================================
  node(
    "n_start_users",
    `<div style="text-align:center;padding:6px;">
      <div style="font-size:22px;">👥</div>
      <div style="font-size:11px;font-weight:900;color:#0F172A;margin-top:2px;">User / App Prompt</div>
      <div style="font-size:8px;color:#64748B;">Web, Slack, REST, Event Streams</div>
    </div>`,
    20,
    95,
    190,
    70,
    "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;rounded=1;shadow=0;"
  );

  node(
    "n_edge_armor",
    `<div style="text-align:center;padding:6px;">
      <div style="font-size:20px;">🛡️</div>
      <div style="font-size:10.5px;font-weight:900;color:#1E3A8A;margin-top:2px;">Cloud Armor &amp; LB</div>
      <div style="font-size:7.5px;color:#475569;">DDoS &amp; OWASP WAF Filter</div>
    </div>`,
    20,
    195,
    190,
    70,
    "fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.5;rounded=1;shadow=0;"
  );

  node(
    "n_edge_iap",
    `<div style="text-align:center;padding:6px;">
      <div style="font-size:20px;">🔑</div>
      <div style="font-size:10.5px;font-weight:900;color:#0369A1;margin-top:2px;">Identity-Aware Proxy</div>
      <div style="font-size:7.5px;color:#475569;">Zero-Trust OAuth2 &amp; IAM</div>
    </div>`,
    20,
    295,
    190,
    70,
    "fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.5;rounded=1;shadow=0;"
  );

  node(
    "n_cloud_dlp",
    `<div style="text-align:center;padding:6px;">
      <div style="font-size:20px;">🔒</div>
      <div style="font-size:10.5px;font-weight:900;color:#0F766E;margin-top:2px;">Sensitive Data Protection</div>
      <div style="font-size:7.5px;color:#0F766E;font-weight:700;">Cloud DLP PII Redaction</div>
    </div>`,
    20,
    395,
    190,
    70,
    "fillColor=#F0FDFA;strokeColor=#0D9488;strokeWidth=1.5;rounded=1;shadow=0;"
  );

  line(nid(), '❶ Submit', 115, 165, 115, 195, 'strokeColor=#2563EB;strokeWidth=1.8;endArrow=block;endSize=4;');
  line(nid(), '❷ WAF Pass', 115, 265, 115, 295, 'strokeColor=#2563EB;strokeWidth=1.8;endArrow=block;endSize=4;');
  line(nid(), '❸ Auth Verified', 115, 365, 115, 395, 'strokeColor=#0284C7;strokeWidth=1.8;endArrow=block;endSize=4;');

  // =========================================================================
  // 3. DECISION GATE 1: INTENT CLASSIFIER & TASK DECOMPOSITION (x=245..375, y=380)
  // =========================================================================
  node(
    "gate_task_type",
    `<div style="font-size:10px;font-weight:900;color:#6B21A8;text-align:center;line-height:1.2;">Multi-Step<br/>Task Plan<br/>Needed?</div>`,
    245,
    378,
    130,
    105,
    "shape=rhombus;fillColor=#FAF5FF;strokeColor=#A855F7;strokeWidth=2;align=center;verticalAlign=middle;"
  );

  line(nid(), '❹ PII Cleaned', 210, 430, 245, 430, 'strokeColor=#0D9488;strokeWidth=2;endArrow=block;endSize=4;');

  // FAST-PATH BRANCH: Direct Model Inference (Single-turn Q&A)
  node(
    "n_fast_path",
    `<div style="padding:8px 12px;text-align:center;">
      <div style="font-size:18px;">⚡</div>
      <div style="font-size:11px;font-weight:900;color:#15803D;margin-top:2px;">Fast-Path Inference</div>
      <div style="font-size:8px;color:#4B5563;">Direct Flash Model (&lt; 100ms TTFT)</div>
    </div>`,
    240,
    140,
    155,
    75,
    "fillColor=#F0FDF4;strokeColor=#86EFAC;strokeWidth=1.5;rounded=1;shadow=0;"
  );

  // NO (Simple Q&A) branches UP to Fast Path
  line(nid(), 'NO (Simple Q&A)', 310, 378, 310, 215, 'strokeColor=#16A34A;strokeWidth=1.8;endArrow=block;endSize=4;');

  // =========================================================================
  // 4. COMPLEX PATH: SUPERVISOR AGENT & MEMORY (x=415..595)
  // =========================================================================
  node(
    "n_supervisor",
    `<div style="padding:8px 10px;text-align:center;">
      <div style="font-size:22px;">👑</div>
      <div style="font-size:11.5px;font-weight:900;color:#5B21B6;margin-top:2px;">Supervisor Agent (GKE)</div>
      <div style="font-size:8px;color:#4B5563;font-weight:600;margin-top:2px;">Goal Decomposition • Sub-Task DAG Planner</div>
    </div>`,
    415,
    388,
    180,
    85,
    "fillColor=#FFFFFF;strokeColor=#A855F7;strokeWidth=2;rounded=1;shadow=0;"
  );

  // CONVERSATIONAL & EPISODIC MEMORY (Under Supervisor)
  node(
    "n_memory",
    `<div style="padding:6px 10px;text-align:center;">
      <div style="font-size:18px;">🧠</div>
      <div style="font-size:10px;font-weight:900;color:#B91C1C;margin-top:2px;">Episodic &amp; Working Memory</div>
      <div style="font-size:7.5px;color:#64748B;">Redis (&lt; 1ms Session) • Spanner (Long-Term)</div>
    </div>`,
    415,
    495,
    180,
    65,
    "fillColor=#FEF2F2;strokeColor=#F87171;strokeWidth=1.2;rounded=1;shadow=0;"
  );

  line(nid(), 'Read/Write State', 505, 473, 505, 495, 'strokeColor=#DC2626;strokeWidth=1.5;dashed=1;dashPattern=3 3;endArrow=classic;startArrow=classic;endSize=4;startSize=4;');

  // YES (Multi-Step Plan) branches RIGHT to Supervisor
  line(nid(), 'YES (Multi-Step)', 375, 430, 415, 430, 'strokeColor=#7C3AED;strokeWidth=2;endArrow=block;endSize=4;');

  // -------------------------------------------------------------------------
  // PARALLEL EXECUTION FORK BAR (x=625, y=140..560)
  // -------------------------------------------------------------------------
  node(
    "fork_bar",
    `<div style="text-align:center;font-size:8px;font-weight:900;color:#FFFFFF;writing-mode:vertical-rl;transform:rotate(180deg);">PARALLEL MULTI-AGENT EXECUTION FORK</div>`,
    625,
    140,
    14,
    420,
    "fillColor=#0F2A4A;strokeColor=#0F2A4A;rounded=1;"
  );

  line(nid(), '❺ Dispatch Sub-Tasks', 595, 430, 625, 430, 'strokeColor=#7C3AED;strokeWidth=2;endArrow=block;endSize=4;');

  // -------------------------------------------------------------------------
  // 3 PARALLEL EXECUTION LANES (TOP, MIDDLE, BOTTOM)
  // -------------------------------------------------------------------------

  // --- PARALLEL PATH A: KNOWLEDGE & VECTOR RAG + INGESTION PIPELINE (y=130..220) ---
  node(
    "n_rag_agent",
    `<div style="padding:6px 10px;">
      <div style="font-size:10.5px;font-weight:900;color:#0284C7;display:flex;align-items:center;gap:4px;">
        <span>🔍</span> RAG Specialist
      </div>
      <div style="font-size:8px;color:#64748B;margin-top:2px;">Hybrid Semantic Search</div>
    </div>`,
    655,
    140,
    150,
    65,
    "fillColor=#FFFFFF;strokeColor=#38BDF8;strokeWidth=1.5;rounded=1;shadow=0;"
  );

  node(
    "n_vector_search",
    `<div style="padding:6px 10px;">
      <div style="font-size:10.5px;font-weight:900;color:#0284C7;display:flex;align-items:center;gap:4px;">
        <span>🎯</span> Vertex Vector Search
      </div>
      <div style="font-size:8px;color:#64748B;margin-top:2px;">ScaNN Index (&lt; 5ms RAG)</div>
    </div>`,
    825,
    140,
    160,
    65,
    "fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.5;rounded=1;shadow=0;"
  );

  // Document Ingestion Source (Under Vector Search)
  node(
    "n_doc_ingestion",
    `<div style="padding:4px 8px;text-align:center;">
      <div style="font-size:9.5px;font-weight:900;color:#0369A1;">📑 GCS &amp; Document AI</div>
      <div style="font-size:7px;color:#64748B;">Automated Chunking &amp; Embeddings</div>
    </div>`,
    825,
    215,
    160,
    42,
    "fillColor=#F0F9FF;strokeColor=#BAE6FD;strokeWidth=1.2;rounded=1;shadow=0;"
  );

  line(nid(), 'Index Stream', 905, 215, 905, 205, 'strokeColor=#0284C7;strokeWidth=1.5;dashed=1;dashPattern=3 3;endArrow=block;endSize=4;');

  line(nid(), '', 639, 172, 655, 172, 'strokeColor=#0284C7;strokeWidth=1.8;endArrow=block;endSize=4;');
  line(nid(), 'Embedding', 805, 172, 825, 172, 'strokeColor=#0284C7;strokeWidth=1.8;endArrow=block;endSize=4;');

  // --- PARALLEL PATH B: STRUCTURED DATA & LAKEHOUSE (y=310..375) ---
  node(
    "n_sql_agent",
    `<div style="padding:6px 10px;">
      <div style="font-size:10.5px;font-weight:900;color:#D97706;display:flex;align-items:center;gap:4px;">
        <span>📊</span> SQL &amp; Data Agent
      </div>
      <div style="font-size:8px;color:#64748B;margin-top:2px;">Text-to-SQL Generator</div>
    </div>`,
    655,
    315,
    150,
    65,
    "fillColor=#FFFFFF;strokeColor=#FBBF24;strokeWidth=1.5;rounded=1;shadow=0;"
  );

  node(
    "n_bigquery_spanner",
    `<div style="padding:6px 10px;">
      <div style="font-size:10.5px;font-weight:900;color:#B45309;display:flex;align-items:center;gap:4px;">
        <span>🗄️</span> BigQuery &amp; Spanner
      </div>
      <div style="font-size:8px;color:#64748B;margin-top:2px;">Lakehouse &amp; TrueTime State</div>
    </div>`,
    825,
    315,
    160,
    65,
    "fillColor=#FFFFFF;strokeColor=#F59E0B;strokeWidth=1.5;rounded=1;shadow=0;"
  );

  line(nid(), '', 639, 347, 655, 347, 'strokeColor=#D97706;strokeWidth=1.8;endArrow=block;endSize=4;');
  line(nid(), 'Execute Query', 805, 347, 825, 347, 'strokeColor=#D97706;strokeWidth=1.8;endArrow=block;endSize=4;');

  // --- PARALLEL PATH C: MCP TOOLS & HITL MUTATION (y=475..540) ---
  node(
    "n_tool_agent",
    `<div style="padding:6px 10px;">
      <div style="font-size:10.5px;font-weight:900;color:#0F766E;display:flex;align-items:center;gap:4px;">
        <span>⚙️</span> Action &amp; Tool Agent
      </div>
      <div style="font-size:8px;color:#64748B;margin-top:2px;">MCP Function Calling</div>
    </div>`,
    655,
    475,
    150,
    65,
    "fillColor=#FFFFFF;strokeColor=#2DD4BF;strokeWidth=1.5;rounded=1;shadow=0;"
  );

  // DECISION GATE 2: HUMAN-IN-THE-LOOP (HITL) APPROVAL CHECK
  node(
    "gate_hitl",
    `<div style="font-size:9.5px;font-weight:900;color:#B91C1C;text-align:center;line-height:1.2;">Sensitive<br/>Mutation?</div>`,
    825,
    465,
    100,
    85,
    "shape=rhombus;fillColor=#FEF2F2;strokeColor=#EF4444;strokeWidth=1.8;align=center;verticalAlign=middle;"
  );

  line(nid(), '', 639, 507, 655, 507, 'strokeColor=#0F766E;strokeWidth=1.8;endArrow=block;endSize=4;');
  line(nid(), 'Tool Call', 805, 507, 825, 507, 'strokeColor=#0F766E;strokeWidth=1.8;endArrow=block;endSize=4;');

  // HITL Approval Box (Above Gate 2)
  node(
    "n_hitl_console",
    `<div style="padding:4px 6px;text-align:center;">
      <div style="font-size:10px;font-weight:900;color:#B91C1C;">👤 HITL Review Queue</div>
      <div style="font-size:7px;color:#64748B;">Dual Admin Sign-off</div>
    </div>`,
    810,
    405,
    130,
    45,
    "fillColor=#FFF1F2;strokeColor=#FDA4AF;strokeWidth=1.2;rounded=1;shadow=0;"
  );

  // YES (Sensitive Mutation) branches UP to HITL Review
  line(nid(), 'YES', 875, 465, 875, 450, 'strokeColor=#DC2626;strokeWidth=1.5;endArrow=block;endSize=4;');
  line(nid(), 'Approved', 940, 427, 965, 427, 'strokeColor=#16A34A;strokeWidth=1.5;endArrow=none;', [
    { x: 965, y: 427 },
    { x: 965, y: 507 }
  ]);

  // MCP Gateway Execution Node (Right of HITL Gate)
  node(
    "n_mcp_gateway",
    `<div style="padding:6px 10px;">
      <div style="font-size:10.5px;font-weight:900;color:#0F766E;display:flex;align-items:center;gap:4px;">
        <span>🔌</span> MCP Tool Gateway
      </div>
      <div style="font-size:8px;color:#64748B;margin-top:2px;">Salesforce, SAP, ServiceNow</div>
    </div>`,
    985,
    475,
    160,
    65,
    "fillColor=#FFFFFF;strokeColor=#0D9488;strokeWidth=1.5;rounded=1;shadow=0;"
  );

  // NO (Read-only / Safe) branches RIGHT directly to MCP Gateway
  line(nid(), 'NO (Safe)', 925, 507, 985, 507, 'strokeColor=#16A34A;strokeWidth=1.8;endArrow=block;endSize=4;');

  // -------------------------------------------------------------------------
  // PARALLEL EXECUTION JOIN BAR (x=1030, y=140..420)
  // -------------------------------------------------------------------------
  node(
    "join_bar",
    `<div style="text-align:center;font-size:8px;font-weight:900;color:#FFFFFF;writing-mode:vertical-rl;transform:rotate(180deg);">PARALLEL RESULTS CONVERGENCE &amp; SYNTHESIS</div>`,
    1035,
    140,
    14,
    260,
    "fillColor=#0F2A4A;strokeColor=#0F2A4A;rounded=1;"
  );

  line(nid(), 'Context', 985, 172, 1035, 172, 'strokeColor=#0284C7;strokeWidth=1.8;endArrow=block;endSize=4;');
  line(nid(), 'SQL Records', 985, 347, 1035, 347, 'strokeColor=#D97706;strokeWidth=1.8;endArrow=block;endSize=4;');
  line(nid(), 'Action Payload', 1065, 475, 1065, 400, 'strokeColor=#0F766E;strokeWidth=1.8;endArrow=block;endSize=4;');

  // =========================================================================
  // 5. STAGE 5: GEMINI 3.1 PRO / FLASH REASONING CORE (x=1085, y=205)
  // =========================================================================
  node(
    "n_gemini_core",
    `<div style="padding:12px 14px;text-align:center;">
      <div style="font-size:28px;">✨</div>
      <div style="font-size:13px;font-weight:900;color:#14532D;margin-top:2px;">GEMINI 3.1 PRO / FLASH</div>
      <div style="font-size:8.5px;color:#166534;font-weight:700;margin-top:2px;">Multimodal Reasoning &amp; Synthesis Core</div>
      <div style="font-size:7.5px;color:#4B5563;font-weight:600;margin-top:4px;">2M Token Context • CoT Self-Reflection</div>
    </div>`,
    1085,
    205,
    215,
    135,
    "fillColor=#FFFFFF;strokeColor=#22C55E;strokeWidth=2;rounded=1;shadow=0;"
  );

  // Fast-path inference connects cleanly above the parallel lanes into Gemini Core
  line(nid(), 'Direct Prompt', 395, 177, 1085, 235, 'strokeColor=#16A34A;strokeWidth=1.8;endArrow=block;endSize=4;', [
    { x: 395, y: 95 },
    { x: 1060, y: 95 },
    { x: 1060, y: 235 }
  ]);

  // Joined parallel results feed into Gemini Core
  line(nid(), '❻ Grounded Synthesis', 1049, 270, 1085, 270, 'strokeColor=#15803D;strokeWidth=2.2;endArrow=block;endSize=4;');

  // =========================================================================
  // 6. DECISION GATE 3: FACTUALITY & CITATION GUARDRAIL (x=1335, y=225)
  // =========================================================================
  node(
    "gate_factuality",
    `<div style="font-size:10px;font-weight:900;color:#991B1B;text-align:center;line-height:1.2;">Passed<br/>Factuality &amp;<br/>Safety Gate?</div>`,
    1335,
    222,
    130,
    100,
    "shape=rhombus;fillColor=#FEF2F2;strokeColor=#EF4444;strokeWidth=2;align=center;verticalAlign=middle;"
  );

  line(nid(), '❼ Verify', 1300, 272, 1335, 272, 'strokeColor=#DC2626;strokeWidth=2;endArrow=block;endSize=4;');

  // SELF-CORRECTION LOOP: If factuality fails, loop back to Gemini Core (with Max 3 Retries SLA)
  line(nid(), 'NO (Self-Correction • Max 3 Retries)', 1400, 222, 1192, 205, 'strokeColor=#DC2626;strokeWidth=1.5;dashed=1;dashPattern=4 4;endArrow=block;endSize=4;', [
    { x: 1400, y: 140 },
    { x: 1192, y: 140 }
  ]);

  // =========================================================================
  // 7. STAGE 7: GROUNDED DELIVERY & OBSERVABILITY (x=1335..1575)
  // =========================================================================
  node(
    "n_delivery",
    `<div style="padding:10px;text-align:center;">
      <div style="font-size:28px;">✅</div>
      <div style="font-size:12px;font-weight:900;color:#14532D;margin-top:2px;">Grounded Response Streamed</div>
      <div style="font-size:8px;color:#166534;font-weight:700;margin-top:2px;">Verified Citations • Sub-Second TTFT</div>
    </div>`,
    1335,
    370,
    240,
    95,
    "fillColor=#FFFFFF;strokeColor=#22C55E;strokeWidth=2;rounded=1;shadow=0;"
  );

  // YES (Verified Grounded) branches DOWN to Streamed Delivery
  line(nid(), 'YES (Grounded)', 1400, 322, 1400, 370, 'strokeColor=#16A34A;strokeWidth=2.2;endArrow=block;endSize=4;');

  node(
    "n_audit_logging",
    `<div style="padding:8px 10px;text-align:center;">
      <div style="font-size:20px;">📊</div>
      <div style="font-size:10.5px;font-weight:900;color:#1E3A8A;margin-top:2px;">Cloud Logging &amp; GenAI Eval</div>
      <div style="font-size:8px;color:#64748B;margin-top:2px;">Audit Trail • Token FinOps • Latency Telemetry</div>
    </div>`,
    1335,
    490,
    240,
    75,
    "fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;shadow=0;"
  );

  line(nid(), 'Log Audit & Telemetry', 1455, 465, 1455, 490, 'strokeColor=#1E40AF;strokeWidth=1.5;dashed=1;dashPattern=4 4;endArrow=block;endSize=4;');

  // =========================================================================
  // 8. BOTTOM OBSERVABILITY & GOVERNANCE BANNER (FLOATING, NO BOX LAYER)
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
    605,
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
    605,
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
    605,
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
    605,
    390,
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
    665,
    1555,
    38,
    "fillColor=#F0FDF4;strokeColor=#22C55E;strokeWidth=1.5;rounded=1;"
  );

  // Assemble full XML envelope
  return `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="embed.diagrams.net">
  <diagram id="gcp_enterprise_production_flow" name="${E(projectTitle)}">
    <mxGraphModel dx="1600" dy="740" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="740" background="${bg}" math="0" shadow="0">
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
