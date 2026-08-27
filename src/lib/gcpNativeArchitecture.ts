/**
 * Brand-New GCP Native Multi-Tier Enterprise Cloud Architecture Generator
 * Pure Google Cloud Platform native topology with 6 dedicated tiers:
 * 1. Global Edge & Perimeter Ingress (Cloud Armor, Cloud CDN, External HTTPS GCLB, IAP, DNSSEC)
 * 2. API Gateway & Workload Compute (Apigee, GKE Autopilot, Cloud Run, Cloud Functions Gen2, Cloud Tasks)
 * 3. Vertex AI & GenAI Platform (Gemini 2.5 Flash/Pro, ScaNN Vector Search, Model Armor, Agent Builder)
 * 4. Event Mesh & Streaming (Cloud Pub/Sub, Cloud Dataflow, Eventarc, Datastream CDC)
 * 5. Unified Lakehouse & Multi-Region Storage (Cloud Spanner TrueTime, BigQuery Studio, AlloyDB, GCS CMEK)
 * 6. Zero-Trust Security, Sovereign Governance & Observability (VPC-SC, Cloud KMS, Workload Identity, Dataplex, Operations Suite, SCC)
 */

const E = (v?: string | null) =>
  (v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export interface GcpNativeArchOptions {
  projectTitle?: string;
  projectName?: string;
  useCaseName?: string;
  domain?: string;
  theme?: 'light' | 'dark';
}

export function generateGcpNativeArchitectureXml(options: GcpNativeArchOptions = {}): string {
  const isDark = options.theme === 'dark';
  const bg = isDark ? '#0B111E' : '#FFFFFF';
  const cardBg = isDark ? '#111827' : '#FFFFFF';
  const cardBorder = isDark ? '#1F2937' : '#E2E8F0';
  const textPrimary = isDark ? '#F9FAFB' : '#0F172A';
  const textSecondary = isDark ? '#9CA3AF' : '#64748B';
  const pillBg = isDark ? '#1E293B' : '#F1F5F9';

  const title = options.projectTitle || (options.projectName && options.useCaseName ? `${options.projectName} — ${options.useCaseName}` : 'Enterprise Google Cloud Native Architecture');
  const subtitle = options.useCaseName ? `${options.useCaseName} • Production-Grade GCP Reference Topology` : 'Multi-Region Microservices, Vertex AI GenAI Studio & Unified BigQuery Lakehouse';
  const domainLabel = options.domain ? options.domain.toUpperCase() : 'ENTERPRISE PRODUCTION';

  const c: string[] = [];

  const cell = (id: string, v: string, x: number, y: number, w: number, h: number, style: string) =>
    c.push(`<mxCell id="${id}" value="${E(v)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`);

  const edge = (id: string, v: string, s: string, t: string, style: string, extraPts?: { x: number; y: number }[]) => {
    let ptsXml = '';
    if (extraPts && extraPts.length > 0) {
      ptsXml = `\n            <Array as="points">\n              ${extraPts.map((p) => `<mxPoint x="${p.x}" y="${p.y}"/>`).join('\n              ')}\n            </Array>`;
    }
    c.push(
      `<mxCell id="${id}" value="${E(v)}" edge="1" parent="1" source="${s}" target="${t}" style="${style}">\n          <mxGeometry relative="1" as="geometry">${ptsXml}\n          </mxGeometry>\n        </mxCell>`
    );
  };

  // Outer Canvas Backdrop
  cell(
    'canvas_bg',
    '',
    20,
    20,
    1560,
    920,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${isDark ? '#060B13' : '#F8FAFC'};strokeColor=${isDark ? '#1E293B' : '#E2E8F0'};strokeWidth=2;`
  );

  // Top Header Banner
  cell(
    'header_banner',
    `<div style="display:flex;align-items:center;justify-content:space-between;width:100%;">
      <div>
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
          <span style="background:#1A73E8;color:#FFFFFF;font-size:10px;font-weight:800;padding:3px 8px;border-radius:4px;letter-spacing:0.5px;">GCP REFERENCE TOPOLOGY</span>
          <span style="background:${pillBg};color:${isDark ? '#60A5FA' : '#1D4ED8'};font-size:10px;font-weight:700;padding:3px 8px;border-radius:4px;">${domainLabel}</span>
          <span style="color:${textSecondary};font-size:10px;font-weight:600;">ACTIVE-ACTIVE MULTI-ZONE (99.999% SLA)</span>
        </div>
        <div style="font-size:19px;font-weight:800;color:${textPrimary};letter-spacing:-0.3px;">${title}</div>
        <div style="font-size:11px;color:${textSecondary};margin-top:2px;">${subtitle}</div>
      </div>
    </div>`,
    50,
    35,
    1100,
    65,
    'text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;rounded=0;'
  );

  // Top Right Google Cloud Brand Capsule
  cell(
    'brand_capsule',
    `<div style="display:flex;align-items:center;gap:10px;padding:4px 8px;">
      <div style="width:36px;height:36px;background:${isDark ? '#1E293B' : '#EFF6FF'};border-radius:8px;border:1px solid #1A73E8;display:flex;align-items:center;justify-content:center;font-size:18px;">☁️</div>
      <div style="text-align:left;">
        <div style="font-size:12px;font-weight:800;color:${isDark ? '#93C5FD' : '#1A73E8'};">Google Cloud Platform</div>
        <div style="font-size:9.5px;color:${textSecondary};">Zero-Trust Enterprise Architecture</div>
      </div>
    </div>`,
    1240,
    35,
    310,
    65,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${isDark ? '#1E3A8A' : '#BFDBFE'};strokeWidth=1.5;align=center;verticalAlign=middle;`
  );

  // -------------------------------------------------------------------------------------------------------------------
  // 5 MAIN VERTICAL ARCHITECTURE TIERS (Y: 115 to 735, Height: 605px)
  // -------------------------------------------------------------------------------------------------------------------

  // TIER 1: GLOBAL EDGE & INGRESS (X: 50, W: 275)
  cell(
    'col_edge',
    `<div style="font-size:12px;font-weight:800;color:#1D4ED8;margin-bottom:2px;">🌐 1. GLOBAL EDGE &amp; INGRESS</div>
     <div style="font-size:9px;color:${textSecondary};">Anycast Routing, DDoS &amp; Perimeter Defense</div>`,
    50,
    115,
    275,
    610,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${isDark ? '#0B1528' : '#EFF6FF'};strokeColor=#3B82F6;strokeWidth=1.5;align=left;verticalAlign=top;spacingLeft=12;spacingTop=10;`
  );

  // Pod 1.1: Cloud Armor
  cell(
    'pod_armor',
    `<div style="padding:4px 6px;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
        <span style="font-size:13px;">🛡️</span>
        <span style="font-size:11px;font-weight:800;color:${textPrimary};">Cloud Armor (WAF &amp; DDoS)</span>
      </div>
      <div style="font-size:9px;color:${textSecondary};line-height:1.3;">Adaptive ML Threat Protection, OWASP Top 10 mitigation &amp; geographic rate limiting.</div>
      <div style="margin-top:4px;display:flex;gap:4px;flex-wrap:wrap;">
        <span style="background:${pillBg};color:#2563EB;font-size:8px;font-weight:700;padding:1px 5px;border-radius:3px;">ML Filtering</span>
        <span style="background:${pillBg};color:#2563EB;font-size:8px;font-weight:700;padding:1px 5px;border-radius:3px;">DDoS Defense</span>
      </div>
    </div>`,
    62,
    165,
    250,
    95,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;align=left;verticalAlign=middle;`
  );

  // Pod 1.2: Cloud CDN
  cell(
    'pod_cdn',
    `<div style="padding:4px 6px;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
        <span style="font-size:13px;">⚡</span>
        <span style="font-size:11px;font-weight:800;color:${textPrimary};">Cloud CDN &amp; Media Edge</span>
      </div>
      <div style="font-size:9px;color:${textSecondary};line-height:1.3;">Global Anycast edge caching with HTTP/3 &amp; TLS 1.3 sub-millisecond static offload.</div>
      <div style="margin-top:4px;display:flex;gap:4px;flex-wrap:wrap;">
        <span style="background:${pillBg};color:#0284C7;font-size:8px;font-weight:700;padding:1px 5px;border-radius:3px;">HTTP/3</span>
        <span style="background:${pillBg};color:#0284C7;font-size:8px;font-weight:700;padding:1px 5px;border-radius:3px;">Anycast IP</span>
      </div>
    </div>`,
    62,
    275,
    250,
    95,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;align=left;verticalAlign=middle;`
  );

  // Pod 1.3: External Application Load Balancer
  cell(
    'pod_gclb',
    `<div style="padding:4px 6px;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
        <span style="font-size:13px;">🔀</span>
        <span style="font-size:11px;font-weight:800;color:${textPrimary};">Global External Load Balancer</span>
      </div>
      <div style="font-size:9px;color:${textSecondary};line-height:1.3;">Multi-region HTTPS Anycast proxy with cross-region backend failover &amp; Serverless NEGs.</div>
      <div style="margin-top:4px;display:flex;gap:4px;flex-wrap:wrap;">
        <span style="background:${pillBg};color:#1D4ED8;font-size:8px;font-weight:700;padding:1px 5px;border-radius:3px;">Serverless NEGs</span>
        <span style="background:${pillBg};color:#1D4ED8;font-size:8px;font-weight:700;padding:1px 5px;border-radius:3px;">Cross-Region</span>
      </div>
    </div>`,
    62,
    385,
    250,
    100,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;align=left;verticalAlign=middle;`
  );

  // Pod 1.4: Identity-Aware Proxy (IAP)
  cell(
    'pod_iap',
    `<div style="padding:4px 6px;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
        <span style="font-size:13px;">🔐</span>
        <span style="font-size:11px;font-weight:800;color:${textPrimary};">Identity-Aware Proxy (IAP)</span>
      </div>
      <div style="font-size:9px;color:${textSecondary};line-height:1.3;">Zero-Trust context-aware user authorization without client VPN overhead.</div>
      <div style="margin-top:4px;display:flex;gap:4px;flex-wrap:wrap;">
        <span style="background:${pillBg};color:#7C3AED;font-size:8px;font-weight:700;padding:1px 5px;border-radius:3px;">Zero-Trust</span>
        <span style="background:${pillBg};color:#7C3AED;font-size:8px;font-weight:700;padding:1px 5px;border-radius:3px;">Context-Aware</span>
      </div>
    </div>`,
    62,
    500,
    250,
    95,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;align=left;verticalAlign=middle;`
  );

  // Pod 1.5: Cloud DNSSEC
  cell(
    'pod_dns',
    `<div style="padding:4px 6px;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
        <span style="font-size:13px;">🌐</span>
        <span style="font-size:11px;font-weight:800;color:${textPrimary};">Cloud DNS &amp; Traffic Director</span>
      </div>
      <div style="font-size:9px;color:${textSecondary};line-height:1.3;">100% SLA authoritative DNSSEC resolution with geo-fenced split-horizon routing.</div>
    </div>`,
    62,
    610,
    250,
    85,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;align=left;verticalAlign=middle;`
  );

  // TIER 2: API GATEWAY & WORKLOAD COMPUTE (X: 350, W: 285)
  cell(
    'col_compute',
    `<div style="font-size:12px;font-weight:800;color:#7C3AED;margin-bottom:2px;">⚡ 2. API &amp; WORKLOAD COMPUTE</div>
     <div style="font-size:9px;color:${textSecondary};">Apigee, Autopilot GKE &amp; Serverless Mesh</div>`,
    350,
    115,
    285,
    610,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${isDark ? '#140E26' : '#FAF5FF'};strokeColor=#8B5CF6;strokeWidth=1.5;align=left;verticalAlign=top;spacingLeft=12;spacingTop=10;`
  );

  // Pod 2.1: Apigee API Management
  cell(
    'pod_apigee',
    `<div style="padding:4px 6px;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
        <span style="font-size:13px;">🚪</span>
        <span style="font-size:11px;font-weight:800;color:${textPrimary};">Apigee Enterprise Gateway</span>
      </div>
      <div style="font-size:9px;color:${textSecondary};line-height:1.3;">OAuth2 token mediation, rate-limiting quotas, developer portal &amp; mTLS mutual auth.</div>
      <div style="margin-top:4px;display:flex;gap:4px;flex-wrap:wrap;">
        <span style="background:${pillBg};color:#9333EA;font-size:8px;font-weight:700;padding:1px 5px;border-radius:3px;">OAuth2 / mTLS</span>
        <span style="background:${pillBg};color:#9333EA;font-size:8px;font-weight:700;padding:1px 5px;border-radius:3px;">Rate Limiting</span>
      </div>
    </div>`,
    365,
    165,
    255,
    100,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;align=left;verticalAlign=middle;`
  );

  // Pod 2.2: GKE Autopilot Cluster
  cell(
    'pod_gke',
    `<div style="padding:4px 6px;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
        <span style="font-size:13px;">☸️</span>
        <span style="font-size:11px;font-weight:800;color:${textPrimary};">GKE Autopilot Private Cluster</span>
      </div>
      <div style="font-size:9px;color:${textSecondary};line-height:1.3;">Fully managed multi-zone Kubernetes with hardened nodes, Workload Identity &amp; Envoy mesh.</div>
      <div style="margin-top:4px;display:flex;gap:4px;flex-wrap:wrap;">
        <span style="background:${pillBg};color:#6D28D9;font-size:8px;font-weight:700;padding:1px 5px;border-radius:3px;">Multi-Zone HA</span>
        <span style="background:${pillBg};color:#6D28D9;font-size:8px;font-weight:700;padding:1px 5px;border-radius:3px;">Workload Identity</span>
      </div>
    </div>`,
    365,
    280,
    255,
    105,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;align=left;verticalAlign=middle;`
  );

  // Pod 2.3: Cloud Run Serverless
  cell(
    'pod_cloudrun',
    `<div style="padding:4px 6px;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
        <span style="font-size:13px;">🏃</span>
        <span style="font-size:11px;font-weight:800;color:${textPrimary};">Cloud Run Microservices</span>
      </div>
      <div style="font-size:9px;color:${textSecondary};line-height:1.3;">Serverless containers scaling 0-to-10K instances with internal VPC egress &amp; gRPC endpoints.</div>
      <div style="margin-top:4px;display:flex;gap:4px;flex-wrap:wrap;">
        <span style="background:${pillBg};color:#7C3AED;font-size:8px;font-weight:700;padding:1px 5px;border-radius:3px;">Scale to 0</span>
        <span style="background:${pillBg};color:#7C3AED;font-size:8px;font-weight:700;padding:1px 5px;border-radius:3px;">gRPC / HTTP</span>
      </div>
    </div>`,
    365,
    400,
    255,
    100,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;align=left;verticalAlign=middle;`
  );

  // Pod 2.4: Cloud Functions Gen2
  cell(
    'pod_functions',
    `<div style="padding:4px 6px;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
        <span style="font-size:13px;">⚡</span>
        <span style="font-size:11px;font-weight:800;color:${textPrimary};">Cloud Functions Gen2</span>
      </div>
      <div style="font-size:9px;color:${textSecondary};line-height:1.3;">Event-driven serverless runtime triggered by Cloud Storage, Pub/Sub &amp; Eventarc bus.</div>
    </div>`,
    365,
    515,
    255,
    85,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;align=left;verticalAlign=middle;`
  );

  // Pod 2.5: Cloud Tasks & Scheduler
  cell(
    'pod_tasks',
    `<div style="padding:4px 6px;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
        <span style="font-size:13px;">📋</span>
        <span style="font-size:11px;font-weight:800;color:${textPrimary};">Cloud Tasks &amp; Scheduler</span>
      </div>
      <div style="font-size:9px;color:${textSecondary};line-height:1.3;">Asynchronous background worker queue with exponential backoff &amp; rate limiting.</div>
    </div>`,
    365,
    615,
    255,
    80,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;align=left;verticalAlign=middle;`
  );

  // TIER 3: VERTEX AI & GENAI PLATFORM (X: 660, W: 290)
  cell(
    'col_ai',
    `<div style="font-size:12px;font-weight:800;color:#D97706;margin-bottom:2px;">🧠 3. VERTEX AI &amp; GENAI STUDIO</div>
     <div style="font-size:9px;color:${textSecondary};">Gemini 2.5, ScaNN Vector Search &amp; Guardrails</div>`,
    660,
    115,
    290,
    610,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${isDark ? '#231506' : '#FFFBEB'};strokeColor=#F59E0B;strokeWidth=1.5;align=left;verticalAlign=top;spacingLeft=12;spacingTop=10;`
  );

  // Pod 3.1: Gemini 2.5 Flash / Pro
  cell(
    'pod_gemini',
    `<div style="padding:4px 6px;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
        <span style="font-size:13px;">✨</span>
        <span style="font-size:11px;font-weight:800;color:${textPrimary};">Gemini 2.5 Flash / Pro</span>
      </div>
      <div style="font-size:9px;color:${textSecondary};line-height:1.3;">Multimodal foundation models with 2M token context window &amp; structured JSON output.</div>
      <div style="margin-top:4px;display:flex;gap:4px;flex-wrap:wrap;">
        <span style="background:${pillBg};color:#B45309;font-size:8px;font-weight:700;padding:1px 5px;border-radius:3px;">2M Context</span>
        <span style="background:${pillBg};color:#B45309;font-size:8px;font-weight:700;padding:1px 5px;border-radius:3px;">Multimodal</span>
      </div>
    </div>`,
    675,
    165,
    260,
    100,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;align=left;verticalAlign=middle;`
  );

  // Pod 3.2: Vertex AI Vector Search
  cell(
    'pod_vector',
    `<div style="padding:4px 6px;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
        <span style="font-size:13px;">🔍</span>
        <span style="font-size:11px;font-weight:800;color:${textPrimary};">Vertex AI Vector Search</span>
      </div>
      <div style="font-size:9px;color:${textSecondary};line-height:1.3;">ScaNN dense vector index delivering sub-millisecond RAG similarity retrieval across billions of vectors.</div>
      <div style="margin-top:4px;display:flex;gap:4px;flex-wrap:wrap;">
        <span style="background:${pillBg};color:#D97706;font-size:8px;font-weight:700;padding:1px 5px;border-radius:3px;">ScaNN RAG</span>
        <span style="background:${pillBg};color:#D97706;font-size:8px;font-weight:700;padding:1px 5px;border-radius:3px;">&lt;2ms Latency</span>
      </div>
    </div>`,
    675,
    280,
    260,
    105,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;align=left;verticalAlign=middle;`
  );

  // Pod 3.3: Model Armor & Guardrails
  cell(
    'pod_armor_ai',
    `<div style="padding:4px 6px;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
        <span style="font-size:13px;">🛡️</span>
        <span style="font-size:11px;font-weight:800;color:${textPrimary};">Vertex Model Armor</span>
      </div>
      <div style="font-size:9px;color:${textSecondary};line-height:1.3;">Prompt injection detection, hallucination filters &amp; automated PII redaction guardrails.</div>
      <div style="margin-top:4px;display:flex;gap:4px;flex-wrap:wrap;">
        <span style="background:${pillBg};color:#B45309;font-size:8px;font-weight:700;padding:1px 5px;border-radius:3px;">Prompt Shield</span>
        <span style="background:${pillBg};color:#B45309;font-size:8px;font-weight:700;padding:1px 5px;border-radius:3px;">PII Redact</span>
      </div>
    </div>`,
    675,
    400,
    260,
    95,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;align=left;verticalAlign=middle;`
  );

  // Pod 3.4: Agent Builder & LangChain
  cell(
    'pod_agent',
    `<div style="padding:4px 6px;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
        <span style="font-size:13px;">🤖</span>
        <span style="font-size:11px;font-weight:800;color:${textPrimary};">Vertex AI Agent Builder</span>
      </div>
      <div style="font-size:9px;color:${textSecondary};line-height:1.3;">Autonomous multi-agent orchestration, function calling &amp; enterprise tool routing.</div>
    </div>`,
    675,
    510,
    260,
    90,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;align=left;verticalAlign=middle;`
  );

  // Pod 3.5: Feature Store & MLOps
  cell(
    'pod_mlops',
    `<div style="padding:4px 6px;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
        <span style="font-size:13px;">📊</span>
        <span style="font-size:11px;font-weight:800;color:${textPrimary};">Feature Store &amp; MLOps Registry</span>
      </div>
      <div style="font-size:9px;color:${textSecondary};line-height:1.3;">Centralized feature repository with Vertex Pipelines continuous model evaluation.</div>
    </div>`,
    675,
    615,
    260,
    80,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;align=left;verticalAlign=middle;`
  );

  // TIER 4: REAL-TIME EVENT STREAMING & INGESTION (X: 975, W: 265)
  cell(
    'col_event',
    `<div style="font-size:12px;font-weight:800;color:#0D9488;margin-bottom:2px;">🔄 4. EVENT MESH &amp; PIPELINES</div>
     <div style="font-size:9px;color:${textSecondary};">Pub/Sub, Dataflow &amp; Datastream CDC</div>`,
    975,
    115,
    265,
    610,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${isDark ? '#061C19' : '#F0FDFA'};strokeColor=#14B8A6;strokeWidth=1.5;align=left;verticalAlign=top;spacingLeft=12;spacingTop=10;`
  );

  // Pod 4.1: Cloud Pub/Sub
  cell(
    'pod_pubsub',
    `<div style="padding:4px 6px;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
        <span style="font-size:13px;">📬</span>
        <span style="font-size:11px;font-weight:800;color:${textPrimary};">Cloud Pub/Sub Event Mesh</span>
      </div>
      <div style="font-size:9px;color:${textSecondary};line-height:1.3;">Global 10M+ msg/sec distributed event bus with automatic partitioning &amp; dead-letter topics.</div>
      <div style="margin-top:4px;display:flex;gap:4px;flex-wrap:wrap;">
        <span style="background:${pillBg};color:#0F766E;font-size:8px;font-weight:700;padding:1px 5px;border-radius:3px;">10M+ msg/s</span>
        <span style="background:${pillBg};color:#0F766E;font-size:8px;font-weight:700;padding:1px 5px;border-radius:3px;">Dead Letter</span>
      </div>
    </div>`,
    988,
    165,
    240,
    105,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;align=left;verticalAlign=middle;`
  );

  // Pod 4.2: Cloud Dataflow
  cell(
    'pod_dataflow',
    `<div style="padding:4px 6px;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
        <span style="font-size:13px;">🌊</span>
        <span style="font-size:11px;font-weight:800;color:${textPrimary};">Cloud Dataflow (Apache Beam)</span>
      </div>
      <div style="font-size:9px;color:${textSecondary};line-height:1.3;">Serverless real-time streaming ETL, exactly-once semantics &amp; windowing transformations.</div>
      <div style="margin-top:4px;display:flex;gap:4px;flex-wrap:wrap;">
        <span style="background:${pillBg};color:#0D9488;font-size:8px;font-weight:700;padding:1px 5px;border-radius:3px;">Exactly-Once</span>
        <span style="background:${pillBg};color:#0D9488;font-size:8px;font-weight:700;padding:1px 5px;border-radius:3px;">Streaming ETL</span>
      </div>
    </div>`,
    988,
    285,
    240,
    105,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;align=left;verticalAlign=middle;`
  );

  // Pod 4.3: Datastream CDC
  cell(
    'pod_datastream',
    `<div style="padding:4px 6px;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
        <span style="font-size:13px;">🔄</span>
        <span style="font-size:11px;font-weight:800;color:${textPrimary};">Datastream (Serverless CDC)</span>
      </div>
      <div style="font-size:9px;color:${textSecondary};line-height:1.3;">Change data capture synchronizing operational DBs to BigQuery &amp; GCS with low latency.</div>
    </div>`,
    988,
    405,
    240,
    95,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;align=left;verticalAlign=middle;`
  );

  // Pod 4.4: Managed Kafka
  cell(
    'pod_kafka',
    `<div style="padding:4px 6px;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
        <span style="font-size:13px;">📦</span>
        <span style="font-size:11px;font-weight:800;color:${textPrimary};">Managed Service for Apache Kafka</span>
      </div>
      <div style="font-size:9px;color:${textSecondary};line-height:1.3;">Seamless enterprise messaging interoperability for Kafka producers &amp; consumers.</div>
    </div>`,
    988,
    515,
    240,
    85,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;align=left;verticalAlign=middle;`
  );

  // Pod 4.5: Eventarc
  cell(
    'pod_eventarc',
    `<div style="padding:4px 6px;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
        <span style="font-size:13px;">⚡</span>
        <span style="font-size:11px;font-weight:800;color:${textPrimary};">Eventarc Bus Broker</span>
      </div>
      <div style="font-size:9px;color:${textSecondary};line-height:1.3;">Standard CloudEvents routing across 130+ Google Cloud infrastructure events.</div>
    </div>`,
    988,
    615,
    240,
    80,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;align=left;verticalAlign=middle;`
  );

  // TIER 5: UNIFIED LAKEHOUSE & MULTI-REGION DATA (X: 1265, W: 285)
  cell(
    'col_data',
    `<div style="font-size:12px;font-weight:800;color:#059669;margin-bottom:2px;">🗄️ 5. LAKEHOUSE &amp; MULTI-REGION DB</div>
     <div style="font-size:9px;color:${textSecondary};">Cloud Spanner, BigQuery &amp; GCS CMEK</div>`,
    1265,
    115,
    285,
    610,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${isDark ? '#041B12' : '#ECFDF5'};strokeColor=#10B981;strokeWidth=1.5;align=left;verticalAlign=top;spacingLeft=12;spacingTop=10;`
  );

  // Pod 5.1: Cloud Spanner
  cell(
    'pod_spanner',
    `<div style="padding:4px 6px;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
        <span style="font-size:13px;">🌐</span>
        <span style="font-size:11px;font-weight:800;color:${textPrimary};">Cloud Spanner (TrueTime)</span>
      </div>
      <div style="font-size:9px;color:${textSecondary};line-height:1.3;">Global multi-region active-active relational ACID database with 99.999% SLA &amp; zero downtime.</div>
      <div style="margin-top:4px;display:flex;gap:4px;flex-wrap:wrap;">
        <span style="background:${pillBg};color:#047857;font-size:8px;font-weight:700;padding:1px 5px;border-radius:3px;">99.999% SLA</span>
        <span style="background:${pillBg};color:#047857;font-size:8px;font-weight:700;padding:1px 5px;border-radius:3px;">TrueTime ACID</span>
      </div>
    </div>`,
    1278,
    165,
    260,
    105,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;align=left;verticalAlign=middle;`
  );

  // Pod 5.2: BigQuery Studio
  cell(
    'pod_bigquery',
    `<div style="padding:4px 6px;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
        <span style="font-size:13px;">📊</span>
        <span style="font-size:11px;font-weight:800;color:${textPrimary};">BigQuery Studio &amp; BigLake</span>
      </div>
      <div style="font-size:9px;color:${textSecondary};line-height:1.3;">Petabyte serverless analytics, SQL ML forecasting, Apache Iceberg open table format &amp; Omni federation.</div>
      <div style="margin-top:4px;display:flex;gap:4px;flex-wrap:wrap;">
        <span style="background:${pillBg};color:#059669;font-size:8px;font-weight:700;padding:1px 5px;border-radius:3px;">BigLake Iceberg</span>
        <span style="background:${pillBg};color:#059669;font-size:8px;font-weight:700;padding:1px 5px;border-radius:3px;">SQL GenAI</span>
      </div>
    </div>`,
    1278,
    285,
    260,
    105,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;align=left;verticalAlign=middle;`
  );

  // Pod 5.3: AlloyDB for PostgreSQL
  cell(
    'pod_alloydb',
    `<div style="padding:4px 6px;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
        <span style="font-size:13px;">🐘</span>
        <span style="font-size:11px;font-weight:800;color:${textPrimary};">AlloyDB for PostgreSQL</span>
      </div>
      <div style="font-size:9px;color:${textSecondary};line-height:1.3;">Fully managed PostgreSQL-compatible DB with 4x transactional throughput &amp; integrated columnar engine.</div>
      <div style="margin-top:4px;display:flex;gap:4px;flex-wrap:wrap;">
        <span style="background:${pillBg};color:#047857;font-size:8px;font-weight:700;padding:1px 5px;border-radius:3px;">4x Postgres</span>
        <span style="background:${pillBg};color:#047857;font-size:8px;font-weight:700;padding:1px 5px;border-radius:3px;">Columnar Engine</span>
      </div>
    </div>`,
    1278,
    405,
    260,
    100,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;align=left;verticalAlign=middle;`
  );

  // Pod 5.4: Cloud Storage (CMEK)
  cell(
    'pod_gcs',
    `<div style="padding:4px 6px;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
        <span style="font-size:13px;">🗂️</span>
        <span style="font-size:11px;font-weight:800;color:${textPrimary};">Cloud Storage (Dual-Region)</span>
      </div>
      <div style="font-size:9px;color:${textSecondary};line-height:1.3;">11 9s durability with Autoclass lifecycle management, CMEK encryption &amp; Bucket Lock.</div>
    </div>`,
    1278,
    520,
    260,
    85,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;align=left;verticalAlign=middle;`
  );

  // Pod 5.5: Memorystore for Redis
  cell(
    'pod_redis',
    `<div style="padding:4px 6px;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
        <span style="font-size:13px;">⚡</span>
        <span style="font-size:11px;font-weight:800;color:${textPrimary};">Memorystore for Redis / Valkey</span>
      </div>
      <div style="font-size:9px;color:${textSecondary};line-height:1.3;">Sub-millisecond in-memory caching cluster for ultra-fast session persistence.</div>
    </div>`,
    1278,
    620,
    260,
    75,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;align=left;verticalAlign=middle;`
  );

  // -------------------------------------------------------------------------------------------------------------------
  // TIER 6: BOTTOM ZERO-TRUST SECURITY, GOVERNANCE & OBSERVABILITY (Y: 745, Height: 165px)
  // -------------------------------------------------------------------------------------------------------------------
  cell(
    'col_security',
    `<div style="font-size:12px;font-weight:800;color:${isDark ? '#E2E8F0' : '#1E293B'};margin-bottom:2px;">🛡️ 6. ZERO-TRUST SECURITY FOUNDATION, SOVEREIGN GOVERNANCE &amp; CLOUD OPERATIONS</div>
     <div style="font-size:9px;color:${textSecondary};">VPC Service Perimeters, Workload Identity, Cloud KMS &amp; Security Command Center</div>`,
    50,
    745,
    1500,
    165,
    `rounded=1;whiteSpace=wrap;html=1;fillColor=${isDark ? '#0A0F1D' : '#F1F5F9'};strokeColor=${isDark ? '#334155' : '#CBD5E1'};strokeWidth=1.5;align=left;verticalAlign=top;spacingLeft=14;spacingTop=10;`
  );

  // 6 Control Cards Inside Security Tier
  const secCards = [
    {
      id: 'sec_vpcsc',
      icon: '🛡️',
      title: 'VPC Service Perimeters',
      desc: 'Zero-Trust data boundary blocking unauthorized data exfiltration.',
      tag: 'VPC-SC Perimeter',
      x: 65,
      w: 235
    },
    {
      id: 'sec_iam',
      icon: '🔑',
      title: 'Workload Identity',
      desc: 'Short-lived cryptographic token authentication without static keys.',
      tag: 'OIDC / SPIFFE',
      x: 315,
      w: 235
    },
    {
      id: 'sec_kms',
      icon: '🔒',
      title: 'Cloud KMS / HSM',
      desc: 'Customer-Managed Encryption Keys (CMEK) with automated rotation.',
      tag: 'FIPS 140-3 HSM',
      x: 565,
      w: 235
    },
    {
      id: 'sec_secrets',
      icon: '🗄️',
      title: 'Secret Manager',
      desc: 'Centralized API secret vault & Certificate Manager automated TLS.',
      tag: 'Auto-Rotation',
      x: 815,
      w: 235
    },
    {
      id: 'sec_dataplex',
      icon: '📑',
      title: 'Dataplex Governance',
      desc: 'Automated data discovery, lineage catalog & fine-grained policy tags.',
      tag: 'Data Lineage',
      x: 1065,
      w: 235
    },
    {
      id: 'sec_ops',
      icon: '📈',
      title: 'Cloud Operations & SCC',
      desc: 'Cloud Logging, Trace, Monitoring & Security Command Center threat intel.',
      tag: 'OpenTelemetry / SCC',
      x: 1315,
      w: 220
    }
  ];

  secCards.forEach((sc) => {
    cell(
      sc.id,
      `<div style="padding:4px 6px;">
        <div style="display:flex;align-items:center;gap:5px;margin-bottom:2px;">
          <span style="font-size:12px;">${sc.icon}</span>
          <span style="font-size:10px;font-weight:800;color:${textPrimary};">${sc.title}</span>
        </div>
        <div style="font-size:8.5px;color:${textSecondary};line-height:1.25;">${sc.desc}</div>
        <div style="margin-top:4px;">
          <span style="background:${pillBg};color:${isDark ? '#94A3B8' : '#475569'};font-size:7.5px;font-weight:700;padding:1px 4px;border-radius:2px;">${sc.tag}</span>
        </div>
      </div>`,
      sc.x,
      790,
      sc.w,
      105,
      `rounded=1;whiteSpace=wrap;html=1;fillColor=${cardBg};strokeColor=${cardBorder};strokeWidth=1;align=left;verticalAlign=middle;`
    );
  });

  // -------------------------------------------------------------------------------------------------------------------
  // TYPED CONNECTORS & FLOW STEP BADGES (❶..❻)
  // -------------------------------------------------------------------------------------------------------------------

  // 1. GCLB to Apigee (TLS 1.3 / Ingress)
  edge(
    'conn_ingress',
    '❶ HTTPS / TLS 1.3',
    'pod_gclb',
    'pod_apigee',
    `edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1D4ED8;strokeWidth=2;fontSize=9;fontStyle=1;fontColor=#1D4ED8;labelBackgroundColor=${cardBg};labelBorderColor=#93C5FD;`
  );

  // 2. Apigee to GKE Autopilot (mTLS / API Dispatch)
  edge(
    'conn_api_gke',
    '❷ API Mesh Dispatch',
    'pod_apigee',
    'pod_gke',
    `edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#7C3AED;strokeWidth=2;fontSize=9;fontStyle=1;fontColor=#7C3AED;labelBackgroundColor=${cardBg};labelBorderColor=#C4B5FD;`
  );

  // 3. GKE to Vertex AI Gemini (GenAI RAG Inference)
  edge(
    'conn_gke_ai',
    '❸ Gemini 2.5 Inference & RAG',
    'pod_gke',
    'pod_gemini',
    `edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#D97706;strokeWidth=2;dashed=1;dashPattern=4 4;fontSize=9;fontStyle=1;fontColor=#D97706;labelBackgroundColor=${cardBg};labelBorderColor=#FDE68A;`
  );

  // 4. Cloud Run to Pub/Sub (Async Event Publish)
  edge(
    'conn_compute_pubsub',
    '❹ Async Event Stream',
    'pod_cloudrun',
    'pod_pubsub',
    `edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0D9488;strokeWidth=2;dashed=1;dashPattern=6 4;fontSize=9;fontStyle=1;fontColor=#0D9488;labelBackgroundColor=${cardBg};labelBorderColor=#99F6E4;`
  );

  // 5. Pub/Sub to Dataflow to BigQuery (Streaming ETL)
  edge(
    'conn_stream_bq',
    '❺ Real-Time Beam ETL',
    'pod_dataflow',
    'pod_bigquery',
    `edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#059669;strokeWidth=2;fontSize=9;fontStyle=1;fontColor=#059669;labelBackgroundColor=${cardBg};labelBorderColor=#A7F3D0;`
  );

  // 6. GKE Autopilot to Cloud Spanner (ACID TrueTime Transact)
  edge(
    'conn_gke_spanner',
    '❻ Multi-Region ACID Transact',
    'pod_gke',
    'pod_spanner',
    `edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#059669;strokeWidth=2;fontSize=9;fontStyle=1;fontColor=#059669;labelBackgroundColor=${cardBg};labelBorderColor=#A7F3D0;`
  );

  return `<mxfile host="embed.diagrams.net">
  <diagram id="gcp_native_master" name="${E(title)}">
    <mxGraphModel dx="1600" dy="1000" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="1000" background="${bg}" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${c.join('\n        ')}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
