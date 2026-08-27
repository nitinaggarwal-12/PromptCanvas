/**
 * Clean & Modern Top-Down Flowchart for GCP Agentic AI Platform
 * Simple, Elegant, Collision-Free, and Technically Precise
 * Master 16:9 Resolution (1600x960)
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

  const E = (s: string) =>
    (s || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');

  const cell = (id: string, val: string, x: number, y: number, w: number, h: number, style: string) => {
    c.push(`<mxCell id="${id}" value="${E(val)}" style="${style}" vertex="1" parent="1">
      <mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/>
    </mxCell>`);
  };

  const edge = (id: string, val: string, src: string, tgt: string, style: string, pts?: { x: number; y: number }[]) => {
    let ptsXml = '';
    if (pts && pts.length > 0) {
      ptsXml = `<mxGeometry relative="1" as="geometry"><Array as="points">${pts.map(p => `<mxPoint x="${p.x}" y="${p.y}"/>`).join('')}</Array></mxGeometry>`;
    } else {
      ptsXml = `<mxGeometry relative="1" as="geometry"/>`;
    }
    c.push(`<mxCell id="${id}" value="${E(val)}" style="${style}" edge="1" parent="1" source="${src}" target="${tgt}">${ptsXml}</mxCell>`);
  };

  // Header Title & Brand
  cell(
    'hdr_title',
    `<div style="display:flex;align-items:center;justify-content:space-between;width:100%;padding:4px 8px;">
      <div>
        <div style="font-size:24px;font-weight:900;color:${textDark};letter-spacing:-0.5px;">Google Cloud Agentic AI Architecture</div>
        <div style="font-size:13px;font-weight:600;color:#2563EB;margin-top:2px;">Top-Down Functional Flowchart: Ingress → Orchestration → Gemini Reasoning → Tools &amp; RAG → Response</div>
      </div>
      <div style="display:flex;align-items:center;gap:10px;background:#F8FAFC;padding:6px 16px;border-radius:9999px;border:1px solid #E2E8F0;">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" fill="#4285F4"/></svg>
        <span style="font-size:14px;font-weight:800;color:#1E293B;">Google Cloud</span>
      </div>
    </div>`,
    150,
    20,
    1300,
    50,
    'text;html=1;align=left;verticalAlign=middle;'
  );

  // =========================================================================
  // LEVEL 1: USER REQUEST & PERIMETER INGRESS (y=85, h=95)
  // =========================================================================
  cell(
    'lvl1_bg',
    '',
    150,
    85,
    1300,
    95,
    'rounded=1;arcSize=4;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.5;html=1;'
  );

  cell(
    'box_users',
    `<div style="display:flex;align-items:center;gap:10px;padding:8px 14px;">
      <div style="font-size:26px;">👥</div>
      <div>
        <div style="font-size:13px;font-weight:900;color:#1E293B;">Enterprise Users &amp; Apps</div>
        <div style="font-size:11px;color:#64748B;font-weight:600;">Web, Mobile, Slack, REST APIs</div>
      </div>
    </div>`,
    180,
    100,
    340,
    65,
    'rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.5;html=1;'
  );

  cell(
    'box_armor_gateway',
    `<div style="display:flex;align-items:center;gap:10px;padding:8px 14px;">
      <div style="font-size:26px;">🛡️</div>
      <div>
        <div style="font-size:13px;font-weight:900;color:#1E293B;">Cloud Armor &amp; API Gateway</div>
        <div style="font-size:11px;color:#64748B;font-weight:600;">DDoS Filtering • WAF • Rate Limiting</div>
      </div>
    </div>`,
    630,
    100,
    370,
    65,
    'rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.5;html=1;'
  );

  cell(
    'box_iap',
    `<div style="display:flex;align-items:center;gap:10px;padding:8px 14px;">
      <div style="font-size:26px;">🔑</div>
      <div>
        <div style="font-size:13px;font-weight:900;color:#1E293B;">Identity-Aware Proxy (IAP)</div>
        <div style="font-size:11px;color:#64748B;font-weight:600;">Zero-Trust OAuth2 &amp; IAM Token</div>
      </div>
    </div>`,
    1070,
    100,
    350,
    65,
    'rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.5;html=1;'
  );

  // =========================================================================
  // LEVEL 2: INTENT ROUTER & MULTI-AGENT ORCHESTRATION (y=225, h=155)
  // =========================================================================
  cell(
    'lvl2_bg',
    '',
    150,
    225,
    1300,
    155,
    'rounded=1;arcSize=4;fillColor=#FAF5FF;strokeColor=#DDD6FE;strokeWidth=1.5;html=1;'
  );

  // Decision Diamond: Complex Multi-Step Task?
  cell(
    'diamond_task_type',
    `<div style="font-size:11px;font-weight:900;color:#6B21A8;text-align:center;line-height:1.2;">Multi-Step<br/>Task Plan<br/>Needed?</div>`,
    690,
    240,
    130,
    120,
    'rhombus;fillColor=#F3E8FF;strokeColor=#A855F7;strokeWidth=2;html=1;'
  );

  // Left Branch: Fast Single-Turn Path
  cell(
    'box_fast_path',
    `<div style="padding:10px 14px;text-align:center;">
      <div style="font-size:22px;">⚡</div>
      <div style="font-size:12.5px;font-weight:900;color:#15803D;">Direct Query Handler</div>
      <div style="font-size:10.5px;color:#4B5563;font-weight:600;margin-top:2px;">Fast-path single turn response</div>
    </div>`,
    230,
    260,
    280,
    85,
    'rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.5;html=1;'
  );

  // Right Branch: Supervisor Multi-Agent Swarm
  cell(
    'box_supervisor_swarm',
    `<div style="padding:10px 14px;">
      <div style="display:flex;align-items:center;justify-content:space-between;">
        <div style="font-size:13px;font-weight:900;color:#5B21B6;display:flex;align-items:center;gap:6px;">
          <span>👑</span> Supervisor Agent (GKE / Cloud Run)
        </div>
        <span style="font-size:9.5px;font-weight:800;background:#E9D5FF;color:#581C87;padding:2px 8px;border-radius:4px;">Multi-Agent Swarm</span>
      </div>
      <div style="display:flex;gap:8px;margin-top:8px;">
        <div style="flex:1;background:#FAF5FF;border:1px solid #DDD6FE;border-radius:4px;padding:4px 6px;text-align:center;font-size:10px;font-weight:800;color:#6B21A8;">
          🔍 RAG Specialist
        </div>
        <div style="flex:1;background:#FAF5FF;border:1px solid #DDD6FE;border-radius:4px;padding:4px 6px;text-align:center;font-size:10px;font-weight:800;color:#6B21A8;">
          📊 SQL / Data Agent
        </div>
        <div style="flex:1;background:#FAF5FF;border:1px solid #DDD6FE;border-radius:4px;padding:4px 6px;text-align:center;font-size:10px;font-weight:800;color:#6B21A8;">
          ⚙️ Action / Tool Agent
        </div>
      </div>
    </div>`,
    940,
    250,
    480,
    105,
    'rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#A855F7;strokeWidth=2;html=1;'
  );

  // =========================================================================
  // LEVEL 3: VERTEX AI & GEMINI 3.1 REASONING ENGINE (y=425, h=115)
  // =========================================================================
  cell(
    'lvl3_bg',
    '',
    150,
    425,
    1300,
    115,
    'rounded=1;arcSize=4;fillColor=#F0FDF4;strokeColor=#BBF7D0;strokeWidth=1.5;html=1;'
  );

  cell(
    'box_gemini_core',
    `<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 20px;">
      <div style="display:flex;align-items:center;gap:14px;">
        <div style="font-size:36px;">✨</div>
        <div>
          <div style="font-size:16px;font-weight:900;color:#14532D;">Gemini 3.1 Pro / Flash Reasoning Engine</div>
          <div style="font-size:12px;color:#166534;font-weight:700;margin-top:2px;">Multimodal Reasoning • Chain-of-Thought Planning • Function Calling Protocol</div>
        </div>
      </div>
      <div style="display:flex;gap:10px;">
        <div style="background:#DCFCE7;border:1px solid #86EFAC;color:#14532D;padding:6px 12px;border-radius:6px;font-size:11px;font-weight:800;">
          🧠 2M Token Context
        </div>
        <div style="background:#DCFCE7;border:1px solid #86EFAC;color:#14532D;padding:6px 12px;border-radius:6px;font-size:11px;font-weight:800;">
          ⚡ Vertex Agent Builder
        </div>
      </div>
    </div>`,
    180,
    440,
    1240,
    85,
    'rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#22C55E;strokeWidth=2;html=1;'
  );

  // =========================================================================
  // LEVEL 4: KNOWLEDGE RETRIEVAL, TOOLS & DATA STORES (y=575, h=120)
  // =========================================================================
  cell(
    'lvl4_bg',
    '',
    150,
    575,
    1300,
    120,
    'rounded=1;arcSize=4;fillColor=#F0F9FF;strokeColor=#BAE6FD;strokeWidth=1.5;html=1;'
  );

  cell(
    'box_vector_search',
    `<div style="padding:10px 14px;text-align:center;">
      <div style="font-size:24px;">🎯</div>
      <div style="font-size:13px;font-weight:900;color:#0369A1;margin-top:2px;">Vertex AI Vector Search</div>
      <div style="font-size:11px;color:#64748B;font-weight:600;margin-top:2px;">ScaNN Semantic RAG Index (&lt;5ms)</div>
    </div>`,
    180,
    590,
    360,
    90,
    'rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.5;html=1;'
  );

  cell(
    'box_mcp_tools',
    `<div style="padding:10px 14px;text-align:center;">
      <div style="font-size:24px;">🔌</div>
      <div style="font-size:13px;font-weight:900;color:#0369A1;margin-top:2px;">MCP Tools &amp; Cloud Functions</div>
      <div style="font-size:11px;color:#64748B;font-weight:600;margin-top:2px;">OpenAPI Connectors • DB Mutators</div>
    </div>`,
    620,
    590,
    360,
    90,
    'rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.5;html=1;'
  );

  cell(
    'box_data_stores',
    `<div style="padding:10px 14px;text-align:center;">
      <div style="font-size:24px;">🗄️</div>
      <div style="font-size:13px;font-weight:900;color:#0369A1;margin-top:2px;">Cloud Spanner &amp; BigQuery</div>
      <div style="font-size:11px;color:#64748B;font-weight:600;margin-top:2px;">Operational State • Multimodal Data Lake</div>
    </div>`,
    1060,
    590,
    360,
    90,
    'rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.5;html=1;'
  );

  // =========================================================================
  // LEVEL 5: FACTUALITY GUARDRAIL GATE & RESPONSE DELIVERY (y=730, h=165)
  // =========================================================================
  cell(
    'lvl5_bg',
    '',
    150,
    730,
    1300,
    165,
    'rounded=1;arcSize=4;fillColor=#FFFFFF;strokeColor=#E2E8F0;strokeWidth=1.5;html=1;'
  );

  // Guardrail Decision Diamond
  cell(
    'diamond_guardrail',
    `<div style="font-size:11px;font-weight:900;color:#991B1B;text-align:center;line-height:1.2;">Passed<br/>Safety &amp;<br/>Citations?</div>`,
    690,
    745,
    130,
    120,
    'rhombus;fillColor=#FEF2F2;strokeColor=#EF4444;strokeWidth=2;html=1;'
  );

  // Response Box (Delivered to Users)
  cell(
    'box_final_response',
    `<div style="display:flex;align-items:center;gap:12px;padding:12px 18px;background:#F0FDF4;border-radius:8px;border:1.5px solid #22C55E;">
      <div style="font-size:30px;">✅</div>
      <div>
        <div style="font-size:14px;font-weight:900;color:#14532D;">Grounded Response Streamed to User</div>
        <div style="font-size:11.5px;color:#166534;font-weight:700;margin-top:2px;">Zero Hallucination • Verified Citations • Sub-Second TTFT</div>
      </div>
    </div>`,
    940,
    770,
    480,
    70,
    'rounded=1;arcSize=6;fillColor=#F0FDF4;strokeColor=#22C55E;strokeWidth=2;html=1;'
  );

  // Telemetry & Audit
  cell(
    'box_telemetry',
    `<div style="padding:10px 14px;text-align:center;">
      <div style="font-size:22px;">📊</div>
      <div style="font-size:12.5px;font-weight:900;color:#1E3A8A;">Cloud Logging &amp; Audit Trail</div>
      <div style="font-size:10.5px;color:#64748B;font-weight:600;margin-top:2px;">Token Telemetry • Latency Traces</div>
    </div>`,
    230,
    765,
    280,
    80,
    'rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#BFDBFE;strokeWidth=1.5;html=1;'
  );

  // =========================================================================
  // TOP-DOWN CONNECTORS & FLOW ARROWS
  // =========================================================================
  const pill = 'labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=4;fontSize=10;fontStyle=1;fontColor:#0F172A;';

  // L1: Users -> Gateway -> IAP
  edge('e_u_gw', '❶ Submit Prompt', 'box_users', 'box_armor_gateway', `strokeColor=#2563EB;strokeWidth=2;endArrow=block;endFill=1;${pill}`);
  edge('e_gw_iap', 'Secure Ingress', 'box_armor_gateway', 'box_iap', `strokeColor=#2563EB;strokeWidth=2;endArrow=block;endFill=1;${pill}`);

  // L1 IAP -> L2 Decision Diamond
  edge(
    'e_iap_decision',
    '❷ Ingress Request',
    'box_iap',
    'diamond_task_type',
    `strokeColor=#2563EB;strokeWidth=2.5;endArrow=block;endFill=1;edgeStyle=orthogonalEdgeStyle;${pill}`,
    [{ x: 1245, y: 200 }, { x: 755, y: 200 }]
  );

  // L2 Decision -> Left (No: Fast Path) & Right (Yes: Multi-Agent Swarm)
  edge('e_dec_fast', 'NO (Simple Q&A)', 'diamond_task_type', 'box_fast_path', `strokeColor=#15803D;strokeWidth=2;endArrow=block;endFill=1;${pill}`);
  edge('e_dec_swarm', 'YES (Multi-Step)', 'diamond_task_type', 'box_supervisor_swarm', `strokeColor=#7C3AED;strokeWidth=2.5;endArrow=block;endFill=1;${pill}`);

  // L2 -> L3 Gemini Reasoning Core
  edge('e_fast_gemini', 'Direct Prompt', 'box_fast_path', 'box_gemini_core', `strokeColor=#15803D;strokeWidth=2;endArrow=block;endFill=1;edgeStyle=orthogonalEdgeStyle;${pill}`, [{ x: 370, y: 390 }, { x: 500, y: 390 }]);
  edge('e_swarm_gemini', '❸ Decomposed Sub-Tasks', 'box_supervisor_swarm', 'box_gemini_core', `strokeColor=#7C3AED;strokeWidth=2.5;endArrow=block;endFill=1;edgeStyle=orthogonalEdgeStyle;${pill}`, [{ x: 1180, y: 390 }, { x: 1100, y: 390 }]);

  // L3 Gemini -> L4 Knowledge & Tools
  edge('e_gemini_vector', '❹ Semantic Search', 'box_gemini_core', 'box_vector_search', `strokeColor=#0284C7;strokeWidth=2;endArrow=block;endFill=1;edgeStyle=orthogonalEdgeStyle;${pill}`, [{ x: 360, y: 550 }, { x: 360, y: 590 }]);
  edge('e_gemini_mcp', 'Execute Function Call', 'box_gemini_core', 'box_mcp_tools', `strokeColor=#0284C7;strokeWidth=2;endArrow=block;endFill=1;edgeStyle=orthogonalEdgeStyle;${pill}`, [{ x: 800, y: 550 }, { x: 800, y: 590 }]);
  edge('e_gemini_db', 'Query State / Lake', 'box_gemini_core', 'box_data_stores', `strokeColor=#0284C7;strokeWidth=2;endArrow=block;endFill=1;edgeStyle=orthogonalEdgeStyle;${pill}`, [{ x: 1240, y: 550 }, { x: 1240, y: 590 }]);

  // L4 Tools -> L5 Guardrail Gate
  edge(
    'e_tools_guardrail',
    '❺ Retrieved Context & Action Results',
    'box_mcp_tools',
    'diamond_guardrail',
    `strokeColor=#0284C7;strokeWidth=2.5;endArrow=block;endFill=1;${pill}`
  );

  // L5 Guardrail -> Response (Yes)
  edge(
    'e_guard_pass',
    'YES (Grounded)',
    'diamond_guardrail',
    'box_final_response',
    `strokeColor=#15803D;strokeWidth=2.5;endArrow=block;endFill=1;${pill}`
  );

  // L5 Guardrail -> Retry / Self-Correction Loop (No: Redo)
  edge(
    'e_guard_fail',
    'NO (Self-Correction Loop)',
    'diamond_guardrail',
    'box_gemini_core',
    `strokeColor=#DC2626;strokeWidth=1.8;dashed=1;dashPattern=5 4;endArrow=block;endFill=1;edgeStyle=orthogonalEdgeStyle;${pill}`,
    [{ x: 755, y: 885 }, { x: 80, y: 885 }, { x: 80, y: 482 }]
  );

  // L5 Guardrail -> Telemetry Logging
  edge(
    'e_guard_log',
    'Audit & Telemetry',
    'diamond_guardrail',
    'box_telemetry',
    `strokeColor=#1E40AF;strokeWidth=1.5;dashed=1;dashPattern=4 4;endArrow=block;endFill=1;${pill}`
  );

  // Assemble full XML envelope
  return `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="embed.diagrams.net">
  <diagram id="gcp_agentic_ai_topdown" name="${E(projectTitle)}">
    <mxGraphModel dx="1600" dy="960" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="960" background="${bg}" math="0" shadow="0">
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
