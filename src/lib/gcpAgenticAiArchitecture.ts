/**
 * GCP Agentic AI Architecture Blueprint Generator v2.0
 * Master 16:9 Ultra-Widescreen Calibrated Layout (1600x960)
 * Visually Polished, Beautiful, and Technically Accurate
 * Encompasses Multi-Agent Swarms, Vertex AI Vector Search ScaNN, Gemini 3.1 Pro Reasoning,
 * Real-Time RAG, Cloud Spanner Long-Term Memory, and Cross-Cutting Security Foundations.
 */

export interface GCPAgenticAiOptions {
  projectName?: string;
  useCaseName?: string;
  projectTitle?: string;
  prompt?: string;
  theme?: 'light' | 'dark';
}

export function generateGcpAgenticAiArchitectureXml(options: GCPAgenticAiOptions = {}): string {
  const {
    projectName = 'Enterprise GCP Agentic AI Platform',
    useCaseName = 'Autonomous Multi-Agent Swarm, Vector RAG & Vertex Reasoning',
    projectTitle = 'Enterprise GCP Agentic AI Platform: Multi-Agent Swarms, Vector RAG & Vertex Reasoning',
    theme = 'light'
  } = options;

  const isDark = theme === 'dark';
  const bg = isDark ? '#0F172A' : '#FFFFFF';

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

  // High-Contrast Vector SVG Icons (100% Offline, Zero HTTP dependencies)
  const ICONS = {
    gcpLogo: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" fill="#4285F4"/><path d="M19 14h-1.5v-2.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5V14H13v-4.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5V14H8.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h10.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z" fill="#FFFFFF"/></svg>`,
    users: `<svg width="24" height="24" viewBox="0 0 24 24" fill="#2563EB"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>`,
    agentBrain: `<svg width="22" height="22" viewBox="0 0 24 24" fill="#7C3AED"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>`,
    geminiSpark: `<svg width="22" height="22" viewBox="0 0 24 24" fill="#10B981"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"/></svg>`,
    vectorSearch: `<svg width="20" height="20" viewBox="0 0 24 24" fill="#0284C7"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>`,
    shieldLock: `<svg width="20" height="20" viewBox="0 0 24 24" fill="#2563EB"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>`,
    spannerDb: `<svg width="20" height="20" viewBox="0 0 24 24" fill="#0284C7"><path d="M12 2L2 7l10 5 10-5-10-5zm0 8.5L4.5 7 12 3.5 19.5 7 12 10.5zm0 3L2 8.5V17l10 5 10-5V8.5L12 13.5z"/></svg>`,
    redisCache: `<svg width="20" height="20" viewBox="0 0 24 24" fill="#DC2626"><path d="M12 2l9 4.5v11L12 22l-9-4.5v-11L12 2zm0 2.24L5.2 7.64 12 11.04l6.8-3.4L12 4.24z"/></svg>`,
    pubsubBus: `<svg width="20" height="20" viewBox="0 0 24 24" fill="#0284C7"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 17.93V18a1 1 0 0 1-2 0v-.07A8 8 0 0 1 4.07 13H6a1 1 0 0 1 0-2H4.07A8 8 0 0 1 11 4.07V6a1 1 0 0 1 2 0V4.07A8 8 0 0 1 19.93 11H18a1 1 0 0 1 0 2h1.93A8 8 0 0 1 13 19.93z"/></svg>`,
    bigqueryDw: `<svg width="20" height="20" viewBox="0 0 24 24" fill="#D97706"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>`,
    gcsBucket: `<svg width="20" height="20" viewBox="0 0 24 24" fill="#D97706"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/></svg>`,
    gpuMig: `<svg width="20" height="20" viewBox="0 0 24 24" fill="#16A34A"><path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm2 2h8v8H8V8z"/></svg>`
  };

  // Header Title & Brand Block
  cell(
    'hdr_brand_block',
    `<div style="display:flex;align-items:center;justify-content:space-between;width:100%;padding:4px 10px;">
      <div style="font-size:20px;font-weight:900;color:#0F172A;letter-spacing:-0.5px;">${E(projectTitle)}</div>
      <div style="font-size:12px;font-weight:800;color:#2563EB;">🧬 NOVACURA | Google Cloud Platform Enterprise Architecture</div>
    </div>`,
    140,
    15,
    1440,
    35,
    'text;html=1;align=left;verticalAlign=middle;'
  );

  // =========================================================================
  // MASTER ENVELOPE FRAMES
  // =========================================================================
  cell(
    'global_region_frame',
    `<div style="font-weight:900;font-size:11px;color:#475569;text-align:left;padding:6px 14px;letter-spacing:0.8px;">GLOBAL REGION • GOOGLE CLOUD NATIVE AI INFRASTRUCTURE</div>`,
    135,
    55,
    1450,
    880,
    'rounded=0;fillColor=#E2E8F0;strokeColor=#94A3B8;strokeWidth=2;html=1;align=left;verticalAlign=top;'
  );

  cell(
    'gcp_project_frame',
    `<div style="display:flex;align-items:center;gap:10px;padding:6px 14px;">
      ${ICONS.gcpLogo}
      <div style="font-weight:900;font-size:12px;color:#1E3A8A;letter-spacing:0.8px;">GOOGLE CLOUD ENTERPRISE AI PROJECT</div>
      <div style="font-size:9.5px;color:#64748B;font-weight:700;margin-left:14px;padding:2px 10px;background:#FFFFFF;border-radius:4px;border:1px solid #CBD5E1;">VPC: 10.10.0.0/16</div>
      <div style="font-size:8.5px;color:#0F766E;font-weight:800;padding:2px 10px;background:#CCFBF1;border-radius:4px;border:1px solid #99F6E4;">🛡️ VPC-SC + ZERO-TRUST CMEK PERIMETER</div>
    </div>`,
    148,
    85,
    1424,
    835,
    'rounded=1;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.5;html=1;align=left;verticalAlign=top;'
  );

  // =========================================================================
  // LEFT EXTERNAL CLIENTS & INTERNET INGRESS (x=10..135)
  // =========================================================================
  cell(
    'users_icon',
    `<div style="text-align:center;">
      ${ICONS.users}
      <div style="font-size:9px;font-weight:900;color:#1E293B;margin-top:2px;">ENTERPRISE USERS</div>
      <div style="font-size:7.5px;color:#64748B;font-weight:700;">Web • Mobile • SDK</div>
    </div>`,
    15,
    220,
    85,
    55,
    'text;html=1;align=center;verticalAlign=middle;'
  );

  cell(
    'chatbots_icon',
    `<div style="text-align:center;">
      ${ICONS.agentBrain}
      <div style="font-size:9px;font-weight:900;color:#7C3AED;margin-top:2px;">BOTS &amp; APIS</div>
      <div style="font-size:7.5px;color:#64748B;font-weight:700;">Slack • Teams • REST</div>
    </div>`,
    15,
    350,
    85,
    55,
    'text;html=1;align=center;verticalAlign=middle;'
  );

  cell(
    'vpn_gateway',
    `<div style="background:#2563EB;color:#FFFFFF;border-radius:8px;padding:8px 4px;text-align:center;box-shadow:0 2px 4px rgba(0,0,0,0.1);">
      <div style="font-size:8px;font-weight:900;">EXTERNAL</div>
      <div style="font-size:7.5px;font-weight:800;margin-top:1px;">VPN GATEWAY</div>
    </div>`,
    55,
    285,
    70,
    44,
    'text;html=1;align=center;verticalAlign=middle;'
  );

  cell(
    'public_internet',
    `<div style="text-align:center;">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="#0284C7"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
      <div style="font-size:8.5px;font-weight:900;color:#1E293B;margin-top:2px;">PUBLIC INTERNET</div>
    </div>`,
    20,
    455,
    75,
    45,
    'text;html=1;align=center;verticalAlign=middle;'
  );

  // =========================================================================
  // TIER 1: INGRESS, EDGE CACHE & ZERO-TRUST SECURITY (x=165..430, w=265)
  // =========================================================================
  cell(
    'tier1_ingress_frame',
    `<div style="font-weight:900;font-size:10px;color:#1E3A8A;letter-spacing:0.6px;">INGRESS &amp; EDGE PERIMETER SECURITY</div>`,
    165,
    130,
    265,
    675,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#BFDBFE;strokeWidth=1.5;html=1;align=center;verticalAlign=top;spacingTop=8;'
  );

  // Cloud Armor Card
  cell(
    'cloud_armor_card',
    `<div style="padding:4px 6px;text-align:center;">
      ${ICONS.shieldLock}
      <div style="font-size:9.5px;font-weight:900;color:#1E3A8A;margin-top:2px;">CLOUD ARMOR</div>
      <div style="font-size:7.5px;color:#475569;font-weight:600;">Adaptive DDoS &amp; WAF Defense</div>
      <div style="font-size:7px;color:#2563EB;font-weight:800;margin-top:2px;">OWASP Top 10 ML Rules</div>
    </div>`,
    178,
    435,
    108,
    75,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.5;html=1;'
  );

  // Global External HTTPS Load Balancer
  cell(
    'gclb_card',
    `<div style="padding:4px 6px;text-align:center;">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#2563EB"><path d="M4 4h4v4H4zm12 0h4v4h-4zM4 16h4v4H4zm12 0h4v4h-4zM6 8v8h2V8zm10 0v8h2V8zm-6 3h4v2h-4z"/></svg>
      <div style="font-size:9px;font-weight:900;color:#1E3A8A;margin-top:2px;">GLOBAL EXTERNAL</div>
      <div style="font-size:8px;font-weight:800;color:#2563EB;">HTTP(S) LOAD BALANCER</div>
      <div style="font-size:7px;color:#64748B;font-weight:600;">Anycast IP • SSL Offloading</div>
    </div>`,
    305,
    435,
    115,
    75,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.5;html=1;'
  );

  // CDN Decision Rhombus
  cell(
    'cdn_decision_diamond',
    `<div style="font-size:8px;font-weight:900;color:#0369A1;text-align:center;line-height:1.1;">CDN CACHE<br/>HIT?</div>`,
    250,
    240,
    75,
    50,
    'rhombus;fillColor=#E0F2FE;strokeColor=#0284C7;strokeWidth=1.5;html=1;'
  );

  // Edge CDN Cache Return Box
  cell(
    'cdn_delivered_box',
    `<div style="padding:4px 6px;text-align:center;background:#DCFCE7;border-radius:6px;">
      <div style="font-size:8.5px;font-weight:900;color:#15803D;">DELIVERED</div>
      <div style="font-size:7px;font-weight:700;color:#166534;">(Edge CDN Return)</div>
    </div>`,
    350,
    195,
    72,
    38,
    'rounded=1;fillColor=#DCFCE7;strokeColor=#22C55E;strokeWidth=1.5;html=1;'
  );

  // Path-Based Routing Decision Rhombus
  cell(
    'path_decision_diamond',
    `<div style="font-size:7.5px;font-weight:900;color:#0369A1;text-align:center;line-height:1.1;">PATH-BASED<br/>ROUTING?</div>`,
    250,
    335,
    75,
    50,
    'rhombus;fillColor=#E0F2FE;strokeColor=#0284C7;strokeWidth=1.5;html=1;'
  );

  // Identity-Aware Proxy (IAP) + Firebase Auth
  cell(
    'iap_card',
    `<div style="padding:4px 6px;text-align:center;">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#0284C7"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>
      <div style="font-size:9px;font-weight:900;color:#0369A1;margin-top:2px;">IDENTITY-AWARE</div>
      <div style="font-size:8px;font-weight:800;color:#0284C7;">PROXY (IAP)</div>
      <div style="font-size:7px;color:#64748B;font-weight:600;">Zero-Trust OAuth2 Context</div>
    </div>`,
    315,
    545,
    105,
    65,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.5;html=1;'
  );

  // API Gateway / Apigee Hub
  cell(
    'api_gateway_card',
    `<div style="padding:4px 6px;text-align:center;">
      <div style="font-size:9px;font-weight:900;color:#0F766E;">APIGEE / API GATEWAY</div>
      <div style="font-size:7.5px;color:#475569;font-weight:600;">Agent Function Calling Quotas</div>
      <div style="font-size:7px;color:#0D9488;font-weight:800;margin-top:2px;">Rate Limiting &amp; JWT Validation</div>
    </div>`,
    178,
    545,
    125,
    65,
    'rounded=1;fillColor=#F0FDFA;strokeColor=#0D9488;strokeWidth=1.5;html=1;'
  );

  // =========================================================================
  // TIER 2: MULTI-AGENT SWARM & COMPUTE SUBNETS (x=445..740, w=295)
  // =========================================================================
  cell(
    'tier2_agent_compute_frame',
    `<div style="font-weight:900;font-size:10px;color:#1E3A8A;letter-spacing:0.6px;">MULTI-AGENT SWARM &amp; COMPUTE SUBNETS</div>`,
    445,
    130,
    295,
    675,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#BFDBFE;strokeWidth=1.5;html=1;align=center;verticalAlign=top;spacingTop=8;'
  );

  // Regional Subnet A (GKE Autopilot / Agent Swarm)
  cell(
    'subnet_a_frame',
    `<div style="display:flex;align-items:center;justify-content:space-between;padding:4px 8px;">
      <div style="font-weight:900;font-size:9.5px;color:#0284C7;">REGIONAL SUBNET A (PRIMARY)</div>
      <div style="font-size:7.5px;font-weight:800;color:#0369A1;background:#E0F2FE;padding:1px 6px;border-radius:3px;">10.10.1.0/24</div>
    </div>`,
    455,
    165,
    275,
    335,
    'rounded=1;fillColor=#F0F9FF;strokeColor=#7DD3FC;strokeWidth=1.5;html=1;align=left;verticalAlign=top;'
  );

  // User Auth & Token Verifier
  cell(
    'user_auth_pod',
    `<div style="display:flex;align-items:center;gap:6px;padding:4px 8px;">
      <div style="font-size:13px;">🔑</div>
      <div>
        <div style="font-size:8.5px;font-weight:900;color:#1E293B;">AUTH &amp; SESSION CONTROLLER</div>
        <div style="font-size:7px;color:#64748B;font-weight:600;">Firebase Auth • IAM Workload Tokens</div>
      </div>
    </div>`,
    465,
    198,
    255,
    36,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;html=1;'
  );

  // Supervisor Orchestrator Agent
  cell(
    'supervisor_agent_card',
    `<div style="padding:6px 8px;background:#FAF5FF;border-radius:6px;border:1px solid #C084FC;">
      <div style="display:flex;align-items:center;justify-content:space-between;">
        <div style="font-size:9px;font-weight:900;color:#6B21A8;display:flex;align-items:center;gap:4px;">
          <span>👑</span> SUPERVISOR AGENT (ORCHESTRATOR)
        </div>
        <span style="font-size:7px;font-weight:800;background:#E9D5FF;color:#581C87;padding:1px 5px;border-radius:3px;">GKE Autopilot</span>
      </div>
      <div style="font-size:7px;color:#4B5563;margin-top:2px;font-weight:600;">Plan Decomposition • Tool Routing • Multi-Agent Synthesis</div>
    </div>`,
    465,
    242,
    255,
    52,
    'rounded=1;fillColor=#FAF5FF;strokeColor=#A855F7;strokeWidth=1.5;html=1;'
  );

  // Domain Specialist Agent Pods (Grid of 2 Specialist Pods)
  cell(
    'specialist_agent_sql',
    `<div style="padding:4px 6px;">
      <div style="font-size:8px;font-weight:900;color:#1E3A8A;display:flex;align-items:center;gap:3px;">
        <span>📊</span> DATA &amp; SQL AGENT
      </div>
      <div style="font-size:7px;color:#64748B;font-weight:600;">BigQuery / Spanner Gen</div>
    </div>`,
    465,
    302,
    124,
    42,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;html=1;'
  );

  cell(
    'specialist_agent_rag',
    `<div style="padding:4px 6px;">
      <div style="font-size:8px;font-weight:900;color:#0F766E;display:flex;align-items:center;gap:3px;">
        <span>🔍</span> RAG SEARCH AGENT
      </div>
      <div style="font-size:7px;color:#64748B;font-weight:600;">Vector Similarity ScaNN</div>
    </div>`,
    596,
    302,
    124,
    42,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#5EEAD4;strokeWidth=1.2;html=1;'
  );

  // Tool Execution & Function Calling Hub
  cell(
    'tool_execution_hub',
    `<div style="padding:4px 8px;display:flex;align-items:center;justify-content:space-between;">
      <div>
        <div style="font-size:8.5px;font-weight:900;color:#0369A1;display:flex;align-items:center;gap:4px;">
          <span>⚙️</span> TOOL EXECUTION &amp; FUNCTION CALLING HUB
        </div>
        <div style="font-size:7px;color:#64748B;font-weight:600;">ADK 2.0 • OpenAPI Schemas • Vertex Extensions</div>
      </div>
    </div>`,
    465,
    352,
    255,
    40,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.2;html=1;'
  );

  // Cloud Pub/Sub Streaming Bus
  cell(
    'pubsub_agent_bus',
    `<div style="padding:4px 8px;display:flex;align-items:center;justify-content:space-between;">
      <div style="display:flex;align-items:center;gap:6px;">
        ${ICONS.pubsubBus}
        <div>
          <div style="font-size:8.5px;font-weight:900;color:#0369A1;">CLOUD PUB/SUB AGENT EVENT BUS</div>
          <div style="font-size:7px;color:#64748B;font-weight:600;">Async Message Queueing • Dead-Letter Alerts</div>
        </div>
      </div>
      <span style="font-size:7px;font-weight:800;background:#E0F2FE;color:#0369A1;padding:1px 5px;border-radius:3px;">100k msg/s</span>
    </div>`,
    465,
    400,
    255,
    42,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.5;html=1;'
  );

  // Regional Subnet B (Secondary GPU Compute & Model Execution)
  cell(
    'subnet_b_frame',
    `<div style="display:flex;align-items:center;justify-content:space-between;padding:4px 8px;">
      <div style="font-weight:900;font-size:9.5px;color:#0284C7;">REGIONAL SUBNET B (SECONDARY)</div>
      <div style="font-size:7.5px;font-weight:800;color:#0369A1;background:#E0F2FE;padding:1px 6px;border-radius:3px;">10.10.2.0/24</div>
    </div>`,
    455,
    520,
    275,
    270,
    'rounded=1;fillColor=#F0F9FF;strokeColor=#7DD3FC;strokeWidth=1.5;html=1;align=left;verticalAlign=top;'
  );

  // GPU Managed Instance Group (NVIDIA H100/L4)
  cell(
    'gpu_mig_card',
    `<div style="padding:6px 8px;">
      <div style="display:flex;align-items:center;justify-content:space-between;">
        <div style="font-size:8.5px;font-weight:900;color:#15803D;display:flex;align-items:center;gap:4px;">
          ${ICONS.gpuMig} COMPUTE ENGINE GPU MIG
        </div>
        <span style="font-size:7px;font-weight:800;background:#DCFCE7;color:#166534;padding:1px 5px;border-radius:3px;">NVIDIA H100/L4</span>
      </div>
      <div style="font-size:7px;color:#4B5563;margin-top:2px;font-weight:600;">Autoscaling Model Workers • vLLM Inference</div>
    </div>`,
    465,
    555,
    255,
    48,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#22C55E;strokeWidth=1.5;html=1;'
  );

  // Cloud Run Serverless Inference Microservices
  cell(
    'cloud_run_card',
    `<div style="padding:6px 8px;">
      <div style="display:flex;align-items:center;justify-content:space-between;">
        <div style="font-size:8.5px;font-weight:900;color:#0F766E;display:flex;align-items:center;gap:4px;">
          <span>⚡</span> CLOUD RUN AGENT MICROSERVICES
        </div>
        <span style="font-size:7px;font-weight:800;background:#CCFBF1;color:#0F766E;padding:1px 5px;border-radius:3px;">Eventarc Trigger</span>
      </div>
      <div style="font-size:7px;color:#4B5563;margin-top:2px;font-weight:600;">Scale to Zero • Sub-Second Cold Starts</div>
    </div>`,
    465,
    615,
    255,
    48,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#14B8A6;strokeWidth=1.5;html=1;'
  );

  // Regional Internal Load Balancer
  cell(
    'internal_lb_card',
    `<div style="padding:6px 8px;text-align:center;">
      <div style="font-size:8.5px;font-weight:900;color:#0369A1;">REGIONAL INTERNAL APPLICATION LB</div>
      <div style="font-size:7px;color:#64748B;font-weight:600;">Private Service Connect (PSC) • Health Checks</div>
    </div>`,
    465,
    675,
    255,
    42,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.2;html=1;'
  );

  // =========================================================================
  // TIER 3: KNOWLEDGE, MEMORY & REAL-TIME RAG STORAGE (x=755..1055, w=300)
  // =========================================================================
  cell(
    'tier3_memory_storage_frame',
    `<div style="font-weight:900;font-size:10px;color:#1E3A8A;letter-spacing:0.6px;">KNOWLEDGE, MEMORY &amp; REAL-TIME DATA STORES</div>`,
    755,
    130,
    300,
    675,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#BFDBFE;strokeWidth=1.5;html=1;align=center;verticalAlign=top;spacingTop=8;'
  );

  // Working Memory & Session Cache (Memorystore Redis)
  cell(
    'redis_memory_card',
    `<div style="padding:6px 8px;">
      <div style="display:flex;align-items:center;justify-content:space-between;">
        <div style="font-size:8.5px;font-weight:900;color:#B91C1C;display:flex;align-items:center;gap:4px;">
          ${ICONS.redisCache} MEMORYSTORE FOR REDIS
        </div>
        <span style="font-size:7px;font-weight:800;background:#FEE2E2;color:#991B1B;padding:1px 5px;border-radius:3px;">&lt; 1ms Latency</span>
      </div>
      <div style="font-size:7px;color:#4B5563;margin-top:2px;font-weight:600;">Agent Conversation Scratchpad &amp; Active Session Context</div>
    </div>`,
    765,
    165,
    280,
    48,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#EF4444;strokeWidth=1.5;html=1;'
  );

  // Dataflow Streaming Ingestion Engine
  cell(
    'dataflow_card',
    `<div style="padding:6px 8px;">
      <div style="display:flex;align-items:center;justify-content:space-between;">
        <div style="font-size:8.5px;font-weight:900;color:#B45309;display:flex;align-items:center;gap:4px;">
          <span>🔄</span> DATAFLOW STREAMING PIPELINE
        </div>
        <span style="font-size:7px;font-weight:800;background:#FEF3C7;color:#92400E;padding:1px 5px;border-radius:3px;">Apache Beam</span>
      </div>
      <div style="font-size:7px;color:#4B5563;margin-top:2px;font-weight:600;">Continuous Document Chunking, Embedding &amp; CDC Sync</div>
    </div>`,
    765,
    225,
    280,
    48,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#F59E0B;strokeWidth=1.5;html=1;'
  );

  // Relational & Analytical State Stores (Spanner + BigQuery)
  cell(
    'relational_state_frame',
    `<div style="padding:4px 8px;font-weight:900;font-size:9px;color:#1E3A8A;">RELATIONAL &amp; OPERATIONAL STATE</div>`,
    765,
    285,
    280,
    185,
    'rounded=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.2;html=1;align=left;verticalAlign=top;'
  );

  // Cloud Spanner (Long-Term Agent Memory & Ledger)
  cell(
    'spanner_card',
    `<div style="padding:4px 6px;">
      <div style="display:flex;align-items:center;justify-content:space-between;">
        <div style="font-size:8.5px;font-weight:900;color:#0369A1;display:flex;align-items:center;gap:4px;">
          ${ICONS.spannerDb} CLOUD SPANNER
        </div>
        <span style="font-size:7px;font-weight:800;background:#E0F2FE;color:#0369A1;padding:1px 4px;border-radius:3px;">99.999% SLA</span>
      </div>
      <div style="font-size:7px;color:#4B5563;margin-top:1px;font-weight:600;">Multi-Region TrueTime • Agent State History</div>
    </div>`,
    775,
    312,
    260,
    45,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.5;html=1;'
  );

  // BigQuery Lakehouse & BigQuery ML
  cell(
    'bigquery_card',
    `<div style="padding:4px 6px;">
      <div style="display:flex;align-items:center;justify-content:space-between;">
        <div style="font-size:8.5px;font-weight:900;color:#B45309;display:flex;align-items:center;gap:4px;">
          ${ICONS.bigqueryDw} BIGQUERY LAKEHOUSE &amp; ML
        </div>
        <span style="font-size:7px;font-weight:800;background:#FEF3C7;color:#92400E;padding:1px 4px;border-radius:3px;">Petabyte Analytics</span>
      </div>
      <div style="font-size:7px;color:#4B5563;margin-top:1px;font-weight:600;">Agent Reasoning Telemetry • Vector Embeddings &amp; BI</div>
    </div>`,
    775,
    365,
    260,
    45,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#F59E0B;strokeWidth=1.5;html=1;'
  );

  // Cloud SQL (Postgres / MySQL)
  cell(
    'cloud_sql_card',
    `<div style="padding:4px 6px;text-align:center;">
      <div style="font-size:8px;font-weight:900;color:#1E3A8A;">CLOUD SQL (ENTERPRISE HA)</div>
      <div style="font-size:7px;color:#64748B;font-weight:600;">Relational App Catalog • Automatic Failover</div>
    </div>`,
    775,
    418,
    260,
    38,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;html=1;'
  );

  // Unstructured Multimodal Storage (GCS)
  cell(
    'unstructured_frame',
    `<div style="padding:4px 8px;font-weight:900;font-size:9px;color:#B45309;">UNSTRUCTURED MULTIMODAL STORAGE</div>`,
    765,
    485,
    280,
    145,
    'rounded=1;fillColor=#FFFBEB;strokeColor=#FDE68A;strokeWidth=1.2;html=1;align=left;verticalAlign=top;'
  );

  cell(
    'gcs_card',
    `<div style="padding:4px 6px;">
      <div style="display:flex;align-items:center;justify-content:space-between;">
        <div style="font-size:8.5px;font-weight:900;color:#B45309;display:flex;align-items:center;gap:4px;">
          ${ICONS.gcsBucket} CLOUD STORAGE (GCS MULTI-REGION)
        </div>
      </div>
      <div style="font-size:7px;color:#4B5563;margin-top:2px;font-weight:600;">Raw PDFs • Medical Images • Audio • Enterprise Data Lakes</div>
    </div>`,
    775,
    512,
    260,
    45,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#F59E0B;strokeWidth=1.5;html=1;'
  );

  cell(
    'lifecycle_card',
    `<div style="padding:4px 6px;text-align:center;">
      <div style="font-size:8px;font-weight:900;color:#B45309;">DATA LIFECYCLE &amp; COLDLINE ARCHIVE</div>
      <div style="font-size:7px;color:#64748B;font-weight:600;">Automated Retention Policies &amp; Immutable Audit Vault</div>
    </div>`,
    775,
    565,
    260,
    42,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#FCD34D;strokeWidth=1.2;html=1;'
  );

  // =========================================================================
  // TIER 4: VERTEX AI AGENT PLATFORM, VECTOR SEARCH & REASONING (x=1070..1550, w=480)
  // =========================================================================
  cell(
    'tier4_vertex_ai_frame',
    `<div style="font-weight:900;font-size:10px;color:#15803D;letter-spacing:0.6px;">VERTEX AI AGENT PLATFORM &amp; REASONING ENGINES</div>`,
    1070,
    130,
    480,
    675,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.5;html=1;align=center;verticalAlign=top;spacingTop=8;'
  );

  // Vertex AI Tooling Header Pods (3 Columns)
  cell(
    'agent_builder_card',
    `<div style="padding:4px 6px;text-align:center;">
      <div style="font-size:8.5px;font-weight:900;color:#15803D;">AGENT BUILDER</div>
      <div style="font-size:7px;color:#475569;font-weight:600;">DeepMind Studio</div>
    </div>`,
    1080,
    165,
    145,
    42,
    'rounded=1;fillColor=#F0FDF4;strokeColor=#86EFAC;strokeWidth=1.2;html=1;'
  );

  cell(
    'vertex_workbench_card',
    `<div style="padding:4px 6px;text-align:center;">
      <div style="font-size:8.5px;font-weight:900;color:#15803D;">VERTEX WORKBENCH</div>
      <div style="font-size:7px;color:#475569;font-weight:600;">Gemini Prompt Lab</div>
    </div>`,
    1237,
    165,
    145,
    42,
    'rounded=1;fillColor=#F0FDF4;strokeColor=#86EFAC;strokeWidth=1.2;html=1;'
  );

  cell(
    'adk_kit_card',
    `<div style="padding:4px 6px;text-align:center;">
      <div style="font-size:8.5px;font-weight:900;color:#15803D;">AGENT DEV KIT (ADK)</div>
      <div style="font-size:7px;color:#475569;font-weight:600;">Multi-Agent Protocol</div>
    </div>`,
    1395,
    165,
    145,
    42,
    'rounded=1;fillColor=#F0FDF4;strokeColor=#86EFAC;strokeWidth=1.2;html=1;'
  );

  // Gemini Agent Reasoning Platform (Gemini 3.1 Pro / Flash)
  cell(
    'gemini_reasoning_platform',
    `<div style="padding:8px 12px;background:#F0FDF4;border-radius:8px;border:1.5px solid #22C55E;">
      <div style="display:flex;align-items:center;justify-content:space-between;">
        <div style="display:flex;align-items:center;gap:6px;">
          ${ICONS.geminiSpark}
          <div>
            <div style="font-size:11px;font-weight:900;color:#14532D;">GEMINI 3.1 PRO / FLASH REASONING ENGINE</div>
            <div style="font-size:7.5px;color:#166534;font-weight:700;">Multimodal Chain-of-Thought • System Instruction Guardrails • Native Function Calling</div>
          </div>
        </div>
        <span style="font-size:8px;font-weight:800;background:#DCFCE7;color:#14532D;padding:2px 8px;border-radius:4px;border:1px solid #86EFAC;">2M Token Context</span>
      </div>
    </div>`,
    1080,
    220,
    460,
    65,
    'rounded=1;fillColor=#F0FDF4;strokeColor=#22C55E;strokeWidth=2;html=1;'
  );

  // Vertex AI Vector Search (ScaNN Index)
  cell(
    'vertex_vector_search_card',
    `<div style="padding:6px 10px;background:#F8FAFC;border-radius:6px;border:1.5px solid #0284C7;">
      <div style="display:flex;align-items:center;justify-content:space-between;">
        <div style="display:flex;align-items:center;gap:6px;">
          ${ICONS.vectorSearch}
          <div>
            <div style="font-size:9.5px;font-weight:900;color:#0369A1;">VERTEX AI VECTOR SEARCH (ScaNN INDEX)</div>
            <div style="font-size:7.5px;color:#475569;font-weight:600;">Sub-Millisecond Vector Similarity • Billion-Scale Semantic RAG Retrieval</div>
          </div>
        </div>
        <span style="font-size:7px;font-weight:800;background:#E0F2FE;color:#0369A1;padding:1px 6px;border-radius:3px;">&lt; 5ms Latency</span>
      </div>
    </div>`,
    1080,
    298,
    460,
    50,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.5;html=1;'
  );

  // Model Management, Guardrails & Serving Frame
  cell(
    'model_mgmt_frame',
    `<div style="padding:4px 8px;font-weight:900;font-size:9.5px;color:#B45309;">MODEL MANAGEMENT, EVALUATIONS &amp; SERVING</div>`,
    1080,
    360,
    460,
    305,
    'rounded=1;fillColor=#FFFBEB;strokeColor=#FDE68A;strokeWidth=1.2;html=1;align=left;verticalAlign=top;'
  );

  // Model Garden & Registry
  cell(
    'model_garden_card',
    `<div style="padding:4px 6px;text-align:center;">
      <div style="font-size:8.5px;font-weight:900;color:#B45309;">VERTEX MODEL GARDEN</div>
      <div style="font-size:7px;color:#64748B;font-weight:600;">Gemini 3.1 • Imagen 3 • Veo 2 • MedLM</div>
    </div>`,
    1090,
    390,
    215,
    42,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#F59E0B;strokeWidth=1.2;html=1;'
  );

  // Supervised Fine-Tuning & LoRA
  cell(
    'fine_tuning_card',
    `<div style="padding:4px 6px;text-align:center;">
      <div style="font-size:8.5px;font-weight:900;color:#B45309;">FINE-TUNING &amp; RLHF</div>
      <div style="font-size:7px;color:#64748B;font-weight:600;">Parameter-Efficient LoRA Adapters</div>
    </div>`,
    1315,
    390,
    215,
    42,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#F59E0B;strokeWidth=1.2;html=1;'
  );

  // Factuality, Citation & Safety Guardrails
  cell(
    'guardrails_eval_card',
    `<div style="padding:6px 8px;background:#FEF2F2;border-radius:6px;border:1px solid #F87171;">
      <div style="display:flex;align-items:center;justify-content:space-between;">
        <div style="font-size:8.5px;font-weight:900;color:#991B1B;display:flex;align-items:center;gap:4px;">
          <span>🛡️</span> VERTEX AI FACTUALITY &amp; SAFETY GUARDRAILS
        </div>
        <span style="font-size:7px;font-weight:800;background:#FEE2E2;color:#991B1B;padding:1px 5px;border-radius:3px;">Zero Hallucination</span>
      </div>
      <div style="font-size:7px;color:#4B5563;margin-top:2px;font-weight:600;">Citation Groundedness Verification • PII &amp; Prompt Injection Redaction</div>
    </div>`,
    1090,
    445,
    440,
    48,
    'rounded=1;fillColor=#FEF2F2;strokeColor=#EF4444;strokeWidth=1.2;html=1;'
  );

  // Online Prediction Serving Endpoints
  cell(
    'online_prediction_card',
    `<div style="padding:8px 10px;text-align:center;background:#FFFFFF;border-radius:6px;border:1.5px solid #F59E0B;">
      <div style="font-size:9.5px;font-weight:900;color:#B45309;display:flex;align-items:center;justify-content:center;gap:4px;">
        <span>⚡</span> ONLINE PREDICTION ENDPOINTS (LOW-LATENCY SERVING)
      </div>
      <div style="font-size:7.5px;color:#64748B;font-weight:600;margin-top:2px;">Autoscaling TPU v5e / GPU Worker Clusters • gRPC Streaming Protocol</div>
    </div>`,
    1090,
    505,
    440,
    48,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#F59E0B;strokeWidth=1.5;html=1;'
  );

  // Closed Feedback Loop to Ingress
  cell(
    'feedback_return_card',
    `<div style="padding:4px 6px;text-align:center;background:#ECFDF5;border-radius:4px;border:1px dashed #10B981;">
      <div style="font-size:7.5px;font-weight:800;color:#065F46;">CLOSED-LOOP FEEDBACK TO CLIENT APPLICATIONS</div>
    </div>`,
    1090,
    565,
    440,
    30,
    'rounded=1;fillColor=#ECFDF5;strokeColor=#10B981;strokeWidth=1;html=1;'
  );

  // =========================================================================
  // TIER 5: CROSS-CUTTING FOUNDATION (Bottom Full-Width Banner, y=740..805)
  // =========================================================================
  cell(
    'cross_cutting_title',
    `<div style="font-weight:900;font-size:9.5px;color:#1E3A8A;letter-spacing:0.6px;padding:2px 6px;">
      🛡️ CROSS-CUTTING ENTERPRISE GOVERNANCE, OBSERVABILITY &amp; SECURITY FOUNDATION
    </div>`,
    165,
    730,
    1385,
    20,
    'text;html=1;align=left;verticalAlign=middle;'
  );

  cell(
    'foundation_observability',
    `<div style="padding:4px 8px;display:flex;align-items:center;gap:6px;">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#0284C7"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-2.5l-1.5 4.5-3-9L8.5 13H7v-2h2.5l1.5-4.5 3 9 1.5-4.5H17v2z"/></svg>
      <div>
        <div style="font-size:8px;font-weight:900;color:#0369A1;">CLOUD MONITORING &amp; LOGGING</div>
        <div style="font-size:7px;color:#64748B;font-weight:600;">Agent Tracing, Token Telemetry, Latency SLOs</div>
      </div>
    </div>`,
    165,
    755,
    320,
    45,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#BFDBFE;strokeWidth=1.2;html=1;'
  );

  cell(
    'foundation_iam',
    `<div style="padding:4px 8px;display:flex;align-items:center;gap:6px;">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#0284C7"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>
      <div>
        <div style="font-size:8px;font-weight:900;color:#0369A1;">CLOUD IAM &amp; WORKLOAD IDENTITY</div>
        <div style="font-size:7px;color:#64748B;font-weight:600;">Least-Privilege RBAC &amp; Service Account Keys</div>
      </div>
    </div>`,
    495,
    755,
    320,
    45,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#BFDBFE;strokeWidth=1.2;html=1;'
  );

  cell(
    'foundation_vpc_sc',
    `<div style="padding:4px 8px;display:flex;align-items:center;gap:6px;">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#0D9488"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>
      <div>
        <div style="font-size:8px;font-weight:900;color:#0F766E;">VPC SERVICE CONTROLS &amp; CMEK</div>
        <div style="font-size:7px;color:#64748B;font-weight:600;">Data Exfiltration Mitigation &amp; KMS Key Rotation</div>
      </div>
    </div>`,
    825,
    755,
    335,
    45,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#99F6E4;strokeWidth=1.2;html=1;'
  );

  cell(
    'foundation_ai_evals',
    `<div style="padding:4px 8px;display:flex;align-items:center;gap:6px;">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#15803D"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-4-4 1.41-1.41L10 13.17l6.59-6.59L18 8l-8 9z"/></svg>
      <div>
        <div style="font-size:8px;font-weight:900;color:#14532D;">AI GOVERNANCE &amp; RED TEAMING</div>
        <div style="font-size:7px;color:#64748B;font-weight:600;">Vertex Model Monitoring &amp; Drift Detection</div>
      </div>
    </div>`,
    1170,
    755,
    380,
    45,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.2;html=1;'
  );

  // =========================================================================
  // HIGH-CONTRAST TYPED CONNECTORS & STEP-BY-STEP FLOW ROUTING
  // =========================================================================
  const pillStyle = 'labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=2.5;fontSize=7.5;fontStyle=1;fontColor=#0F172A;';

  // 1. Users -> VPN -> Cloud Armor
  edge(
    'e_user_vpn',
    '❶ VPN Ingress',
    'users_icon',
    'vpn_gateway',
    `strokeColor=#2563EB;strokeWidth=1.5;endArrow=block;endFill=1;${pillStyle}`
  );
  edge(
    'e_vpn_armor',
    'Secure Flow',
    'vpn_gateway',
    'cloud_armor_card',
    `strokeColor=#2563EB;strokeWidth=1.5;endArrow=block;endFill=1;${pillStyle}`
  );

  // Public Internet -> Cloud Armor
  edge(
    'e_internet_armor',
    '❷ Public Ingress',
    'public_internet',
    'cloud_armor_card',
    `strokeColor=#2563EB;strokeWidth=1.5;endArrow=block;endFill=1;${pillStyle}`
  );

  // Cloud Armor -> GCLB
  edge(
    'e_armor_gclb',
    'WAF Verified',
    'cloud_armor_card',
    'gclb_card',
    `strokeColor=#2563EB;strokeWidth=1.5;endArrow=block;endFill=1;${pillStyle}`
  );

  // GCLB -> CDN Decision Diamond
  edge(
    'e_gclb_cdn',
    'Route CDN',
    'gclb_card',
    'cdn_decision_diamond',
    `strokeColor=#0284C7;strokeWidth=1.5;endArrow=block;endFill=1;edgeStyle=orthogonalEdgeStyle;${pillStyle}`,
    [{ x: 362, y: 380 }, { x: 287, y: 380 }]
  );

  // CDN Hit -> Delivered
  edge(
    'e_cdn_hit',
    'YES (Cache Hit)',
    'cdn_decision_diamond',
    'cdn_delivered_box',
    `strokeColor=#16A34A;strokeWidth=1.5;endArrow=block;endFill=1;edgeStyle=orthogonalEdgeStyle;${pillStyle}`,
    [{ x: 386, y: 265 }]
  );

  // CDN Miss -> Path Decision
  edge(
    'e_cdn_miss',
    'NO (Miss)',
    'cdn_decision_diamond',
    'path_decision_diamond',
    `strokeColor=#0284C7;strokeWidth=1.5;endArrow=block;endFill=1;${pillStyle}`
  );

  // Path Decision -> IAP / Subnet A (Agent API)
  edge(
    'e_path_iap',
    'YES (/api/agent)',
    'path_decision_diamond',
    'iap_card',
    `strokeColor=#0284C7;strokeWidth=1.5;endArrow=block;endFill=1;edgeStyle=orthogonalEdgeStyle;${pillStyle}`,
    [{ x: 287, y: 400 }, { x: 367, y: 400 }]
  );

  // IAP -> Subnet A Auth Controller
  edge(
    'e_iap_auth',
    '❸ Authenticated Route',
    'iap_card',
    'user_auth_pod',
    `strokeColor=#2563EB;strokeWidth=1.5;endArrow=block;endFill=1;edgeStyle=orthogonalEdgeStyle;${pillStyle}`,
    [{ x: 440, y: 577 }, { x: 440, y: 216 }]
  );

  // User Auth -> Supervisor Agent
  edge(
    'e_auth_supervisor',
    'Dispatched Intent',
    'user_auth_pod',
    'supervisor_agent_card',
    `strokeColor=#7C3AED;strokeWidth=1.5;endArrow=block;endFill=1;${pillStyle}`
  );

  // Supervisor Agent -> Specialist Agents
  edge(
    'e_sup_sql',
    'Delegate SQL',
    'supervisor_agent_card',
    'specialist_agent_sql',
    `strokeColor=#7C3AED;strokeWidth=1.2;dashed=1;dashPattern=4 4;endArrow=block;endFill=1;${pillStyle}`
  );
  edge(
    'e_sup_rag',
    'Delegate RAG',
    'supervisor_agent_card',
    'specialist_agent_rag',
    `strokeColor=#7C3AED;strokeWidth=1.2;dashed=1;dashPattern=4 4;endArrow=block;endFill=1;${pillStyle}`
  );

  // Supervisor -> Tool Execution Hub
  edge(
    'e_sup_tools',
    'Invoke Tools',
    'supervisor_agent_card',
    'tool_execution_hub',
    `strokeColor=#0284C7;strokeWidth=1.5;endArrow=block;endFill=1;${pillStyle}`
  );

  // Supervisor -> Redis Working Memory
  edge(
    'e_sup_redis',
    '❹ Working Context',
    'supervisor_agent_card',
    'redis_memory_card',
    `strokeColor=#DC2626;strokeWidth=1.5;dashed=1;dashPattern=4 4;endArrow=block;endFill=1;edgeStyle=orthogonalEdgeStyle;${pillStyle}`,
    [{ x: 730, y: 255 }, { x: 730, y: 189 }]
  );

  // Specialist Agents -> Pub/Sub Bus
  edge(
    'e_tools_pubsub',
    'Queue Async Steps',
    'tool_execution_hub',
    'pubsub_agent_bus',
    `strokeColor=#0284C7;strokeWidth=1.5;endArrow=block;endFill=1;${pillStyle}`
  );

  // Pub/Sub -> Dataflow Stream
  edge(
    'e_pubsub_dataflow',
    '❺ Ingest Event Stream',
    'pubsub_agent_bus',
    'dataflow_card',
    `strokeColor=#EA580C;strokeWidth=1.5;dashed=1;dashPattern=6 4;endArrow=block;endFill=1;edgeStyle=orthogonalEdgeStyle;${pillStyle}`,
    [{ x: 735, y: 421 }, { x: 735, y: 249 }]
  );

  // Dataflow -> Spanner & BigQuery
  edge(
    'e_df_spanner',
    'Persist State',
    'dataflow_card',
    'spanner_card',
    `strokeColor=#0284C7;strokeWidth=1.2;endArrow=block;endFill=1;edgeStyle=orthogonalEdgeStyle;${pillStyle}`,
    [{ x: 905, y: 285 }]
  );
  edge(
    'e_df_bq',
    'Stream CDC / Analytics',
    'dataflow_card',
    'bigquery_card',
    `strokeColor=#D97706;strokeWidth=1.2;endArrow=block;endFill=1;edgeStyle=orthogonalEdgeStyle;${pillStyle}`,
    [{ x: 1050, y: 250 }, { x: 1050, y: 387 }]
  );

  // Specialist RAG Agent -> Vertex AI Vector Search
  edge(
    'e_rag_scann',
    '❻ Semantic Similarity Query',
    'specialist_agent_rag',
    'vertex_vector_search_card',
    `strokeColor=#0284C7;strokeWidth=1.8;endArrow=block;endFill=1;edgeStyle=orthogonalEdgeStyle;${pillStyle}`,
    [{ x: 720, y: 323 }, { x: 720, y: 323 }]
  );

  // Supervisor -> Gemini 3.1 Pro Reasoning Platform
  edge(
    'e_sup_gemini',
    '🧠 Gemini 3.1 Pro Multimodal Reasoning',
    'supervisor_agent_card',
    'gemini_reasoning_platform',
    `strokeColor=#15803D;strokeWidth=2;endArrow=block;endFill=1;edgeStyle=orthogonalEdgeStyle;${pillStyle}`,
    [{ x: 720, y: 268 }, { x: 720, y: 252 }]
  );

  // Vector Search -> Gemini Platform (Grounding)
  edge(
    'e_scann_gemini',
    'Grounding Context (Top K)',
    'vertex_vector_search_card',
    'gemini_reasoning_platform',
    `strokeColor=#0284C7;strokeWidth=1.5;dashed=1;dashPattern=4 4;endArrow=block;endFill=1;${pillStyle}`
  );

  // Gemini Platform -> Guardrails & Evals
  edge(
    'e_gemini_guardrails',
    'Safety & Factuality Audit',
    'gemini_reasoning_platform',
    'guardrails_eval_card',
    `strokeColor=#DC2626;strokeWidth=1.5;endArrow=block;endFill=1;edgeStyle=orthogonalEdgeStyle;${pillStyle}`,
    [{ x: 1310, y: 290 }, { x: 1310, y: 445 }]
  );

  // Guardrails -> Online Prediction / Feedback Return
  edge(
    'e_guardrails_serving',
    'Verified Token Output',
    'guardrails_eval_card',
    'online_prediction_card',
    `strokeColor=#15803D;strokeWidth=1.5;endArrow=block;endFill=1;${pillStyle}`
  );

  // Online Prediction -> Feedback Return Loop
  edge(
    'e_serving_feedback',
    '❼ Stream Response',
    'online_prediction_card',
    'feedback_return_card',
    `strokeColor=#10B981;strokeWidth=1.5;endArrow=block;endFill=1;${pillStyle}`
  );

  // Assemble full XML document envelope
  return `<?xml version="1.0" encoding="UTF-8"?>
<mxfile host="embed.diagrams.net">
  <diagram id="gcp_agentic_ai_master" name="${E(projectTitle)}">
    <mxGraphModel dx="1600" dy="1000" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="960" background="${bg}" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${c.join('\n        ')}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
