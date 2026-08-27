/**
 * Pure Top-Down Flowchart for Google Cloud Agentic AI Platform
 * Clean, Direct, Zero Background Layers/Containers, Pure Standard Flowchart
 * Master 16:9 Resolution (1600x900)
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
    projectTitle = 'Google Cloud Agentic AI Flowchart',
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

  const line = (id: string, x1: number, y1: number, x2: number, y2: number, style: string, val: string = "", pts?: { x: number; y: number }[]) => {
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
  // HEADER BANNER (NO BACKGROUND LAYER)
  // =========================================================================
  node(
    "hdr_main",
    `<div style="display:flex;align-items:center;justify-content:space-between;width:100%;padding:4px 10px;">
      <div>
        <div style="font-size:24px;font-weight:900;color:${textDark};letter-spacing:-0.5px;">Google Cloud Agentic AI Flowchart</div>
        <div style="font-size:12.5px;font-weight:700;color:#2563EB;margin-top:2px;">Top-Down Process Flow: Request Ingestion → Multi-Agent Orchestration → Gemini Reasoning → Grounding &amp; Tools → Response</div>
      </div>
      <div style="display:flex;align-items:center;gap:8px;background:#F8FAFC;padding:6px 16px;border-radius:9999px;border:1px solid #CBD5E1;">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" fill="#4285F4"/></svg>
        <span style="font-size:13px;font-weight:900;color:#1E293B;">Google Cloud</span>
      </div>
    </div>`,
    150,
    15,
    1300,
    45,
    "strokeColor=none;fillColor=none;align=left;verticalAlign=middle;"
  );

  // =========================================================================
  // 1. START NODE (y=70, h=40)
  // =========================================================================
  node(
    "step_0_start",
    `<div style="display:flex;align-items:center;justify-content:center;gap:10px;">
      <span style="font-size:18px;">👥</span>
      <span style="font-size:13px;font-weight:900;color:#15803D;">START: User Prompt / Event Request Ingested</span>
    </div>`,
    500,
    70,
    600,
    40,
    "fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=2;rounded=1;arcSize=50;align=center;verticalAlign=middle;"
  );

  // =========================================================================
  // 2. INGRESS & SECURITY PERIMETER (y=135, h=60)
  // =========================================================================
  node(
    "step_1_ingress",
    `<div style="display:flex;align-items:center;justify-content:space-between;padding:8px 18px;width:100%;">
      <div style="display:flex;align-items:center;gap:10px;">
        <span style="font-size:22px;">🛡️</span>
        <div>
          <div style="font-size:12px;font-weight:900;color:#1E3A8A;">Cloud Armor &amp; API Gateway (Ingress)</div>
          <div style="font-size:9.5px;color:#64748B;font-weight:600;">DDoS Protection • WAF • Rate Limiting &amp; Quotas</div>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:8px;background:#EFF6FF;padding:4px 12px;border-radius:6px;border:1px solid #BFDBFE;">
        <span style="font-size:14px;">🔑</span>
        <span style="font-size:9.5px;font-weight:800;color:#1E40AF;">Identity-Aware Proxy (Zero-Trust OAuth2)</span>
      </div>
    </div>`,
    400,
    135,
    800,
    60,
    "fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.8;rounded=1;arcSize=6;align=center;verticalAlign=middle;"
  );

  line(nid(), 800, 110, 800, 135, "strokeColor=#2563EB;strokeWidth=2;endArrow=block;endSize=4;");

  // =========================================================================
  // 3. DECISION DIAMOND: MULTI-STEP TASK PLAN NEEDED? (y=225, h=95)
  // =========================================================================
  node(
    "step_2_decision",
    `<div style="font-size:10px;font-weight:900;color:#6B21A8;text-align:center;line-height:1.2;">Multi-Step<br/>Task Plan<br/>Needed?</div>`,
    725,
    225,
    150,
    95,
    "shape=rhombus;fillColor=#FAF5FF;strokeColor=#A855F7;strokeWidth=2;align=center;verticalAlign=middle;"
  );

  line(nid(), 800, 195, 800, 225, "strokeColor=#2563EB;strokeWidth=2;endArrow=block;endSize=4;", "Validated Token");

  // Left Branch: Fast-Path Single Turn (x=240, y=235, w=380, h=72)
  node(
    "step_2_fast_path",
    `<div style="padding:10px 14px;text-align:center;">
      <div style="display:flex;align-items:center;justify-content:center;gap:6px;">
        <span style="font-size:16px;">⚡</span>
        <span style="font-size:12px;font-weight:900;color:#15803D;">Direct Model Inference (Fast Path)</span>
      </div>
      <div style="font-size:9px;color:#4B5563;font-weight:600;margin-top:3px;">Single-turn queries, direct prompt completion, fast summaries</div>
    </div>`,
    240,
    235,
    380,
    72,
    "fillColor=#F0FDF4;strokeColor=#86EFAC;strokeWidth=1.5;rounded=1;arcSize=6;align=center;verticalAlign=middle;"
  );

  // Right Branch: Supervisor Multi-Agent Swarm (x=980, y=230, w=460, h=82)
  node(
    "step_2_supervisor",
    `<div style="padding:8px 14px;">
      <div style="display:flex;align-items:center;justify-content:space-between;">
        <div style="font-size:11.5px;font-weight:900;color:#5B21B6;display:flex;align-items:center;gap:6px;">
          <span>👑</span> Supervisor Agent (GKE / Cloud Run)
        </div>
        <span style="font-size:8px;font-weight:800;background:#E9D5FF;color:#581C87;padding:2px 8px;border-radius:4px;">Multi-Agent Swarm</span>
      </div>
      <div style="display:flex;gap:6px;margin-top:6px;">
        <div style="flex:1;background:#FAF5FF;border:1px solid #DDD6FE;border-radius:4px;padding:3px 6px;text-align:center;font-size:8.5px;font-weight:800;color:#6B21A8;">
          🔍 RAG Specialist
        </div>
        <div style="flex:1;background:#FAF5FF;border:1px solid #DDD6FE;border-radius:4px;padding:3px 6px;text-align:center;font-size:8.5px;font-weight:800;color:#6B21A8;">
          📊 SQL Agent
        </div>
        <div style="flex:1;background:#FAF5FF;border:1px solid #DDD6FE;border-radius:4px;padding:3px 6px;text-align:center;font-size:8.5px;font-weight:800;color:#6B21A8;">
          ⚙️ Action Agent
        </div>
      </div>
    </div>`,
    980,
    230,
    460,
    82,
    "fillColor=#FAF5FF;strokeColor=#A855F7;strokeWidth=2;rounded=1;arcSize=6;align=center;verticalAlign=middle;"
  );

  line(nid(), 725, 272, 620, 272, "strokeColor=#16A34A;strokeWidth=1.8;endArrow=block;endSize=4;", "NO (Simple Q&A)");
  line(nid(), 875, 272, 980, 272, "strokeColor=#7C3AED;strokeWidth=2;endArrow=block;endSize=4;", "YES (Multi-Step)");

  // =========================================================================
  // 4. REASONING CORE: GEMINI 3.1 PRO / FLASH (y=345, h=88)
  // =========================================================================
  node(
    "step_3_gemini_core",
    `<div style="display:flex;align-items:center;justify-content:space-between;padding:10px 24px;width:100%;">
      <div style="display:flex;align-items:center;gap:14px;">
        <span style="font-size:30px;">✨</span>
        <div>
          <div style="font-size:14.5px;font-weight:900;color:#14532D;">Gemini 3.1 Pro / Flash Multimodal Reasoning Core</div>
          <div style="font-size:10px;color:#166534;font-weight:700;margin-top:2px;">Chain-of-Thought Reasoning • Autonomous Sub-Goal Planning • Dynamic Tool Calling</div>
        </div>
      </div>
      <div style="display:flex;gap:8px;">
        <div style="background:#DCFCE7;border:1px solid #86EFAC;color:#14532D;padding:4px 10px;border-radius:6px;font-size:9.5px;font-weight:800;">
          🧠 2M Token Context
        </div>
        <div style="background:#DCFCE7;border:1px solid #86EFAC;color:#14532D;padding:4px 10px;border-radius:6px;font-size:9.5px;font-weight:800;">
          ⚡ Vertex Agent Builder
        </div>
      </div>
    </div>`,
    240,
    345,
    1200,
    88,
    "fillColor=#F0FDF4;strokeColor=#22C55E;strokeWidth=2;rounded=1;arcSize=6;align=center;verticalAlign=middle;"
  );

  line(nid(), 430, 307, 430, 345, "strokeColor=#16A34A;strokeWidth=1.5;endArrow=block;endSize=4;", "Direct Query");
  line(nid(), 1210, 312, 1210, 345, "strokeColor=#7C3AED;strokeWidth=2;endArrow=block;endSize=4;", "Decomposed Plan");

  // =========================================================================
  // 5. TOOLS, RAG & DATA EXECUTION BUS (y=465, h=88)
  // =========================================================================
  node(
    "step_4_rag",
    `<div style="padding:8px 14px;text-align:center;">
      <div style="font-size:20px;">🎯</div>
      <div style="font-size:11.5px;font-weight:900;color:#0369A1;margin-top:2px;">Vertex AI Vector Search</div>
      <div style="font-size:9px;color:#64748B;font-weight:600;margin-top:2px;">ScaNN Semantic Index (&lt; 5ms RAG)</div>
    </div>`,
    240,
    465,
    360,
    88,
    "fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.8;rounded=1;arcSize=6;align=center;verticalAlign=middle;"
  );

  node(
    "step_4_tools",
    `<div style="padding:8px 14px;text-align:center;">
      <div style="font-size:20px;">🔌</div>
      <div style="font-size:11.5px;font-weight:900;color:#0369A1;margin-top:2px;">Tool Execution &amp; MCP Hub</div>
      <div style="font-size:9px;color:#64748B;font-weight:600;margin-top:2px;">OpenAPI Connectors • Cloud Functions</div>
    </div>`,
    660,
    465,
    360,
    88,
    "fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.8;rounded=1;arcSize=6;align=center;verticalAlign=middle;"
  );

  node(
    "step_4_data",
    `<div style="padding:8px 14px;text-align:center;">
      <div style="font-size:20px;">🗄️</div>
      <div style="font-size:11.5px;font-weight:900;color:#0369A1;margin-top:2px;">Cloud Spanner &amp; BigQuery</div>
      <div style="font-size:9px;color:#64748B;font-weight:600;margin-top:2px;">State Store • Petabyte Data Lake</div>
    </div>`,
    1080,
    465,
    360,
    88,
    "fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.8;rounded=1;arcSize=6;align=center;verticalAlign=middle;"
  );

  line(nid(), 420, 433, 420, 465, "strokeColor=#0284C7;strokeWidth=1.8;endArrow=block;endSize=4;", "Vector Similarity");
  line(nid(), 840, 433, 840, 465, "strokeColor=#0284C7;strokeWidth=1.8;endArrow=block;endSize=4;", "Function Call");
  line(nid(), 1260, 433, 1260, 465, "strokeColor=#0284C7;strokeWidth=1.8;endArrow=block;endSize=4;", "Query Lakehouse");

  // =========================================================================
  // 6. VERIFICATION DECISION DIAMOND (y=585, h=95)
  // =========================================================================
  // Convergence lines from 3 bus nodes to Verification Diamond
  line(nid(), 420, 553, 420, 572, "strokeColor=#0284C7;strokeWidth=1.2;endArrow=none;");
  line(nid(), 1260, 553, 1260, 572, "strokeColor=#0284C7;strokeWidth=1.2;endArrow=none;");
  line(nid(), 420, 572, 1260, 572, "strokeColor=#0284C7;strokeWidth=1.2;endArrow=none;");
  line(nid(), 840, 572, 840, 585, "strokeColor=#0284C7;strokeWidth=2;endArrow=block;endSize=4;");

  node(
    "step_5_guardrail",
    `<div style="font-size:10px;font-weight:900;color:#991B1B;text-align:center;line-height:1.2;">Passed<br/>Factuality &amp;<br/>Safety Gate?</div>`,
    765,
    585,
    150,
    95,
    "shape=rhombus;fillColor=#FEF2F2;strokeColor=#EF4444;strokeWidth=2;align=center;verticalAlign=middle;"
  );

  // Left Branch: Self-Correction Loop (x=240, y=597, w=420, h=72)
  node(
    "step_5_self_correct",
    `<div style="padding:10px 14px;text-align:center;">
      <div style="display:flex;align-items:center;justify-content:center;gap:6px;">
        <span style="font-size:16px;">🔄</span>
        <span style="font-size:11.5px;font-weight:900;color:#991B1B;">Self-Correction Loop</span>
      </div>
      <div style="font-size:8.5px;color:#4B5563;font-weight:600;margin-top:3px;">Refine prompt, re-retrieve context, re-evaluate reasoning</div>
    </div>`,
    240,
    597,
    420,
    72,
    "fillColor=#FFF1F2;strokeColor=#FDA4AF;strokeWidth=1.5;rounded=1;arcSize=6;align=center;verticalAlign=middle;"
  );

  // Right Branch: Grounded Response Delivery (x=1020, y=597, w=420, h=72)
  node(
    "step_5_delivered",
    `<div style="padding:10px 16px;">
      <div style="display:flex;align-items:center;gap:10px;">
        <span style="font-size:24px;">✅</span>
        <div>
          <div style="font-size:12.5px;font-weight:900;color:#14532D;">Grounded Response Streamed to User</div>
          <div style="font-size:9px;color:#166534;font-weight:700;margin-top:2px;">Zero Hallucination • Verified Citations • Sub-Second TTFT</div>
        </div>
      </div>
    </div>`,
    1020,
    597,
    420,
    72,
    "fillColor=#F0FDF4;strokeColor=#22C55E;strokeWidth=2;rounded=1;arcSize=6;align=center;verticalAlign=middle;"
  );

  line(nid(), 765, 632, 660, 632, "strokeColor=#DC2626;strokeWidth=1.8;endArrow=block;endSize=4;", "NO (Refine)");
  line(nid(), 915, 632, 1020, 632, "strokeColor=#16A34A;strokeWidth=2;endArrow=block;endSize=4;", "YES (Grounded)");

  // Self-Correction Loop up to Gemini Core
  line(
    nid(),
    240,
    632,
    200,
    632,
    "strokeColor=#DC2626;strokeWidth=1.5;dashed=1;dashPattern=4 4;endArrow=none;",
    "",
    [{ x: 200, y: 632 }]
  );
  line(
    nid(),
    200,
    632,
    200,
    389,
    "strokeColor=#DC2626;strokeWidth=1.5;dashed=1;dashPattern=4 4;endArrow=none;"
  );
  line(
    nid(),
    200,
    389,
    240,
    389,
    "strokeColor=#DC2626;strokeWidth=1.5;dashed=1;dashPattern=4 4;endArrow=block;endSize=4;",
    "Retry Iteration"
  );

  // =========================================================================
  // 7. END NODE: OBSERVABILITY & AUDIT TELEMETRY (y=715, h=48)
  // =========================================================================
  node(
    "step_6_audit",
    `<div style="display:flex;align-items:center;justify-content:space-between;padding:6px 20px;width:100%;">
      <div style="display:flex;align-items:center;gap:8px;">
        <span style="font-size:16px;">📊</span>
        <span style="font-size:11px;font-weight:800;color:#1E3A8A;">Cloud Logging &amp; OpenTelemetry Traces</span>
      </div>
      <div style="display:flex;align-items:center;gap:8px;">
        <span style="font-size:16px;">🛡️</span>
        <span style="font-size:11px;font-weight:800;color:#1E3A8A;">VPC Service Controls &amp; CMEK</span>
      </div>
      <div style="display:flex;align-items:center;gap:8px;">
        <span style="font-size:16px;">⚖️</span>
        <span style="font-size:11px;font-weight:800;color:#1E3A8A;">Continuous Evaluation &amp; Drift Monitoring</span>
      </div>
    </div>`,
    400,
    715,
    800,
    48,
    "fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.2;rounded=1;arcSize=6;align=center;verticalAlign=middle;"
  );

  line(nid(), 1230, 669, 1230, 739, "strokeColor=#1E40AF;strokeWidth=1.5;dashed=1;dashPattern=4 4;endArrow=none;");
  line(nid(), 1230, 739, 1200, 739, "strokeColor=#1E40AF;strokeWidth=1.5;dashed=1;dashPattern=4 4;endArrow=block;endSize=4;", "Log Audit");

  // Assemble full XML envelope
  return `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="embed.diagrams.net">
  <diagram id="gcp_agentic_ai_pure_flowchart" name="${E(projectTitle)}">
    <mxGraphModel dx="1600" dy="850" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="850" background="${bg}" math="0" shadow="0">
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
