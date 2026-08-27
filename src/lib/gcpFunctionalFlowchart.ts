/**
 * 🏛️ GCP Cloud Architecture: Functional Flowchart Diagram Generator
 * High-contrast, production-grade 16:9 Google Cloud Architecture master flowchart matching:
 * - Left Column: Ingress & Security (Cloud Armor, IAP, Global External HTTP(S) LB, Routing/Cache Decision Diamonds, External VPN, Users)
 * - Center-Left: Load Balancing & Compute (Regional Subnet A Primary GKE/PubSub + Regional Subnet B Secondary MIG/ILB Auto-Scaling)
 * - Center-Right: Application & Data (Relational Cloud SQL / BigQuery + Unstructured Cloud Storage / Data Lifecycle Management)
 * - Right: Agentic AI Services (Vertex AI Agent Platform, Agent Designer, Gemini Notebook, ADK 2.0, Model Management & Serving)
 * - Cross-Cutting: Cloud Monitoring, Cloud IAM, Legend
 */

const E = (v?: string | null) =>
  (v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export interface GcpFunctionalFlowchartOptions {
  projectTitle?: string;
  projectName?: string;
  useCaseName?: string;
  domain?: string;
  prompt?: string;
  theme?: 'light' | 'dark';
}

export function generateGcpFunctionalFlowchartXml(options: GcpFunctionalFlowchartOptions = {}): string {
  const isDark = options.theme === 'dark';
  const bg = isDark ? '#0B111E' : '#FFFFFF';
  const panelBg = isDark ? '#111827' : '#FFFFFF';
  const panelBorder = isDark ? '#1F2937' : '#CBD5E1';
  const textPrimary = isDark ? '#F8FAFC' : '#0F172A';
  const textSecondary = isDark ? '#94A3B8' : '#475569';

  const title = options.projectTitle || (options.projectName && options.useCaseName ? `${options.projectName}: ${options.useCaseName}` : 'GCP Cloud Architecture: Functional Flowchart Diagram');
  const userPrompt = options.prompt || '';

  // Check prompt customizations
  const isPharma = /medicine|pharma|clinical|drug|cleanroom|gxp/i.test(userPrompt + ' ' + (options.projectName || '') + ' ' + (options.useCaseName || ''));
  const isEcommerce = /retail|ecommerce|shop|cart|checkout|order/i.test(userPrompt);
  const isFintech = /fintech|bank|payment|fraud|trading|ledger/i.test(userPrompt);
  const isMfg = /manufactur|plant|factory|scada|iot|sensor|robot/i.test(userPrompt);

  let appName = 'AGENTIC ENTERPRISE APP';
  let appSub = '(GKE Pods)';
  let backendName = 'BACKEND API';
  let backendSub = '(GKE Pods)';
  let queueName = 'MESSAGE QUEUEING';
  let queueSub = '(Pub/Sub)';
  let dbName = 'CLOUD SQL';
  let dbSub = '(Primary)';
  let dwName = 'BIGQUERY';
  let dwSub = '(Read Replica / DW)';
  let storageName = 'CLOUD STORAGE';
  let storageSub = '(GCS Multi-Region)';
  let aiEngineName = 'GEMINI AGENT PLATFORM';
  let aiEngineSub = '(Vertex AI Reasoning)';

  if (isPharma) {
    appName = 'GXP BATCH APP';
    appSub = '(Sterile Cleanroom GKE)';
    backendName = 'EBR & MES API';
    backendSub = '(Validated GKE)';
    dbName = 'CLOUD SQL (HA)';
    dbSub = '(GxP Audit Ledger)';
    dwName = 'BIGQUERY CLINICAL';
    dwSub = '(Analytical Warehouse)';
    aiEngineName = 'GENOMICS & BATCH AI';
    aiEngineSub = '(Vertex AI Compliance)';
  } else if (isMfg) {
    appName = 'SMART FACTORY MES';
    appSub = '(Plant Edge GKE)';
    backendName = 'SCADA & OPC-UA API';
    backendSub = '(Historian Gateway)';
    queueName = 'SENSOR TELEMETRY';
    queueSub = '(Pub/Sub & Dataflow)';
    dbName = 'CLOUD SPANNER';
    dbSub = '(TrueTime MES)';
    dwName = 'BIGQUERY OEE';
    dwSub = '(Industrial DW)';
    aiEngineName = 'PREDICTIVE DIGITAL TWIN';
    aiEngineSub = '(Vertex AI Industrial)';
  } else if (isFintech) {
    appName = 'TRANSACTION ENGINE';
    appSub = '(Zero-Trust GKE)';
    backendName = 'PAYMENTS CORE API';
    backendSub = '(PCI-DSS Validated)';
    dbName = 'CLOUD SPANNER';
    dbSub = '(Global Ledger)';
    dwName = 'BIGQUERY AML';
    dwSub = '(Real-Time Fraud DW)';
    aiEngineName = 'FRAUD & RISK AI';
    aiEngineSub = '(Vertex AI Real-Time)';
  } else if (isEcommerce) {
    appName = 'STOREFRONT APP';
    appSub = '(Next.js on Cloud Run)';
    backendName = 'COMMERCE API';
    backendSub = '(Microservices GKE)';
    dbName = 'ALLOYDB / POSTGRES';
    dbSub = '(Product Catalog)';
    dwName = 'BIGQUERY RETAIL';
    dwSub = '(Customer 360 Lakehouse)';
    aiEngineName = 'PERSONALIZATION AI';
    aiEngineSub = '(Vertex AI Search)';
  }

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

  // Top Title Bar
  cell(
    'title_header',
    `<div style="font-size:18px;font-weight:800;color:${textPrimary};text-align:center;font-family:Inter,system-ui,sans-serif;">${title}</div>`,
    20,
    15,
    1560,
    30,
    'text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;'
  );

  // Left Outer Column: External Actors & Legend
  cell(
    'users_icon',
    '<div style="text-align:center;"><div style="font-size:24px;">👤</div><div style="font-size:10px;font-weight:700;color:#0F172A;margin-top:2px;">USERS</div></div>',
    20,
    260,
    70,
    60,
    'text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;'
  );

  cell(
    'ext_vpn_gateway',
    '<div style="text-align:center;padding:4px;"><div style="font-size:18px;">🔀</div><div style="font-size:8.5px;font-weight:800;color:#FFFFFF;line-height:1.1;margin-top:2px;">EXTERNAL<br/>VPN GATEWAY</div></div>',
    80,
    270,
    80,
    55,
    'rounded=1;fillColor=#2563EB;strokeColor=#1D4ED8;html=1;align=center;verticalAlign=middle;'
  );

  cell(
    'public_internet',
    '<div style="text-align:center;"><div style="font-size:24px;">🌐</div><div style="font-size:9.5px;font-weight:800;color:#0F172A;margin-top:2px;">PUBLIC<br/>INTERNET</div></div>',
    20,
    440,
    70,
    60,
    'text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;'
  );

  // Legend Card
  cell(
    'legend_card',
    `<div style="font-family:Inter,sans-serif;font-size:9px;color:${textPrimary};padding:4px 6px;">
      <div style="font-weight:800;font-size:10.5px;margin-bottom:4px;border-bottom:1px solid #CBD5E1;padding-bottom:2px;">LEGEND</div>
      <div style="display:flex;align-items:center;gap:4px;margin-bottom:3px;"><span style="background:#0F172A;color:#FFF;border-radius:50%;width:14px;height:14px;display:inline-flex;align-items:center;justify-content:center;font-size:8px;font-weight:bold;">1</span> 1. External Request</div>
      <div style="display:flex;align-items:center;gap:4px;margin-bottom:3px;"><span style="color:#2563EB;font-weight:bold;">🛡️</span> 2. WAF &amp; Perimeter</div>
      <div style="display:flex;align-items:center;gap:4px;margin-bottom:3px;"><span style="color:#2563EB;font-weight:bold;">🔒</span> 3. IAP Auth</div>
      <div style="display:flex;align-items:center;gap:4px;margin-bottom:3px;"><span style="color:#0284C7;font-weight:bold;">⚖️</span> 3. LB &amp; Routing</div>
      <div style="display:flex;align-items:center;gap:4px;margin-bottom:3px;"><span style="color:#0284C7;font-weight:bold;">➔</span> 4. Subnet Routing</div>
      <div style="display:flex;align-items:center;gap:4px;margin-bottom:3px;"><span style="color:#059669;font-weight:bold;">➔</span> 5. Persist &amp; Query</div>
      <div style="display:flex;align-items:center;gap:4px;margin-bottom:3px;"><span style="color:#7C3AED;font-weight:bold;">➔</span> 6. AI Agent Loop</div>
      <div style="border-top:1px solid #E2E8F0;padding-top:3px;margin-top:3px;font-size:8px;color:${textSecondary};">
        <div>── Line Flow</div>
        <div>┄┄ Cross-Cutting Telemetry</div>
      </div>
    </div>`,
    15,
    580,
    145,
    280,
    `rounded=1;fillColor=${isDark ? '#111827' : '#FFFFFF'};strokeColor=${panelBorder};strokeWidth=1.5;html=1;align=left;verticalAlign=top;`
  );

  // Main Google Cloud Project Outer Canvas Frame
  cell(
    'gcp_project_frame',
    `<div style="font-weight:800;font-size:11px;color:${textPrimary};display:flex;align-items:center;gap:6px;padding:6px 12px;">
      <span>☁️</span> <span>GOOGLE CLOUD PROJECT</span>
      <span style="background:#E2E8F0;color:#334155;font-size:9px;padding:2px 6px;border-radius:4px;margin-left:8px;">GLOBAL REGION</span>
    </div>`,
    170,
    60,
    1410,
    880,
    `rounded=1;fillColor=${isDark ? '#060B13' : '#F1F5F9'};strokeColor=#94A3B8;strokeWidth=2;html=1;align=left;verticalAlign=top;`
  );

  // Top Cross-Cutting Monitoring Box
  cell(
    'cloud_monitoring_box',
    '<div style="text-align:center;padding:4px;"><div style="font-size:14px;">📊</div><div style="font-size:9px;font-weight:800;color:#1E3A8A;line-height:1.2;">CLOUD MONITORING<br/><span style="font-size:7.5px;font-weight:600;color:#3B82F6;">(Logging, Tracing, Alerts)</span></div></div>',
    700,
    75,
    180,
    48,
    'rounded=1;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.5;html=1;align=center;verticalAlign=middle;'
  );

  // Bottom Left Cloud IAM Box
  cell(
    'cloud_iam_box',
    '<div style="text-align:center;padding:4px;"><div style="font-size:16px;">🛡️</div><div style="font-size:9px;font-weight:800;color:#1E3A8A;line-height:1.2;">CLOUD IAM<br/><span style="font-size:7.5px;font-weight:600;color:#3B82F6;">(Identity &amp; Access Mgmt)</span></div></div>',
    190,
    830,
    160,
    55,
    'rounded=1;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.5;html=1;align=center;verticalAlign=middle;'
  );

  // =========================================================================
  // ZONE 1: INGRESS & SECURITY (x=190..510)
  // =========================================================================
  cell(
    'zone_ingress_frame',
    '<div style="font-weight:800;font-size:10.5px;color:#1E293B;text-align:center;padding-top:4px;">INGRESS &amp; SECURITY</div>',
    190,
    135,
    320,
    675,
    'rounded=1;fillColor=#E2E8F0;strokeColor=#CBD5E1;strokeWidth=1;html=1;align=center;verticalAlign=top;dashed=1;'
  );

  // Cloud Armor (WAF/DDoS)
  cell(
    'cloud_armor',
    '<div style="text-align:center;padding:4px;"><div style="font-size:20px;">🛡️</div><div style="font-size:9.5px;font-weight:800;color:#1E3A8A;line-height:1.2;margin-top:2px;">CLOUD ARMOR<br/><span style="font-size:8px;font-weight:600;color:#3B82F6;">(WAF / DDoS protection)</span></div></div>',
    205,
    440,
    85,
    75,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.5;html=1;align=center;verticalAlign=middle;'
  );

  // Identity-Aware Proxy (IAP)
  cell(
    'iap_proxy',
    '<div style="text-align:center;padding:4px;"><div style="font-size:20px;">🔒</div><div style="font-size:9px;font-weight:800;color:#1E3A8A;line-height:1.2;margin-top:2px;">IDENTITY-AWARE<br/>PROXY (IAP)</div></div>',
    305,
    440,
    85,
    75,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.5;html=1;align=center;verticalAlign=middle;'
  );

  // Decision CON Top (WAF Check)
  cell(
    'decision_con_top',
    '<div style="text-align:center;font-size:9px;font-weight:800;color:#1E3A8A;">CON</div>',
    400,
    250,
    55,
    55,
    'shape=rhombus;html=1;strokeColor=#3B82F6;strokeWidth=1.5;fillColor=#EFF6FF;align=center;verticalAlign=middle;'
  );

  // Global External HTTP(S) Load Balancer
  cell(
    'gclb_load_balancer',
    '<div style="text-align:center;padding:4px;"><div style="font-size:18px;">⚖️</div><div style="font-size:9px;font-weight:800;color:#1E3A8A;line-height:1.2;margin-top:2px;">GLOBAL EXTERNAL<br/>HTTP(S) LOAD BALANCER</div></div>',
    400,
    440,
    95,
    75,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.5;html=1;align=center;verticalAlign=middle;'
  );

  // Path-Based Routing Decision
  cell(
    'decision_path_routing',
    '<div style="text-align:center;font-size:7.5px;font-weight:800;color:#0F172A;line-height:1.1;">PATH-BASED<br/>ROUTING?<br/><span style="color:#2563EB;">YES / NO</span></div>',
    375,
    570,
    65,
    55,
    'shape=rhombus;html=1;strokeColor=#94A3B8;fillColor=#FFFFFF;align=center;verticalAlign=middle;'
  );

  // CDN Cache Hit Decision
  cell(
    'decision_cdn_cache',
    '<div style="text-align:center;font-size:7.5px;font-weight:800;color:#0F172A;line-height:1.1;">CDN CACHE<br/>HIT?<br/><span style="color:#2563EB;">YES / NO</span></div>',
    445,
    570,
    65,
    55,
    'shape=rhombus;html=1;strokeColor=#94A3B8;fillColor=#FFFFFF;align=center;verticalAlign=middle;'
  );

  // Decision CON Bottom
  cell(
    'decision_con_bottom',
    '<div style="text-align:center;font-size:9px;font-weight:800;color:#1E3A8A;">CON</div>',
    380,
    690,
    55,
    55,
    'shape=rhombus;html=1;strokeColor=#3B82F6;strokeWidth=1.5;fillColor=#EFF6FF;align=center;verticalAlign=middle;'
  );

  // =========================================================================
  // ZONE 2: LOAD BALANCING & COMPUTE (x=530..810)
  // =========================================================================
  cell(
    'zone_compute_frame',
    '<div style="font-weight:800;font-size:10.5px;color:#1E293B;text-align:center;padding-top:4px;">LOAD BALANCING &amp; COMPUTE</div>',
    530,
    135,
    275,
    745,
    'rounded=1;fillColor=#E0F2FE;strokeColor=#BAE6FD;strokeWidth=1;html=1;align=center;verticalAlign=top;dashed=1;'
  );

  // Subnet A Primary (x=545..790, y=170..495)
  cell(
    'subnet_a_frame',
    '<div style="font-weight:800;font-size:9.5px;color:#0369A1;text-align:left;padding:4px 8px;">REGIONAL SUBNET A (PRIMARY)</div>',
    545,
    170,
    245,
    335,
    'rounded=1;fillColor=#F0F9FF;strokeColor=#7DD3FC;strokeWidth=1.5;html=1;align=left;verticalAlign=top;'
  );

  // User Auth (Firebase Auth)
  cell(
    'user_auth_box',
    '<div style="display:flex;align-items:center;gap:6px;padding:4px 8px;"><div style="font-size:16px;">🔥</div><div><div style="font-size:8.5px;font-weight:800;color:#0F172A;">USER AUTHENTICATION</div><div style="font-size:7.5px;color:#0284C7;">(via Firebase Auth)</div></div></div>',
    565,
    205,
    205,
    45,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#BAE6FD;html=1;align=left;verticalAlign=middle;'
  );

  // Agentic Enterprise App (GKE Pods)
  cell(
    'agentic_app_box',
    `<div style="display:flex;align-items:center;gap:6px;padding:4px 8px;"><div style="font-size:16px;">☸️</div><div><div style="font-size:8.5px;font-weight:800;color:#0F172A;">${appName}</div><div style="font-size:7.5px;color:#0284C7;">${appSub}</div></div></div>`,
    565,
    280,
    205,
    50,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.5;html=1;align=left;verticalAlign=middle;'
  );

  // Backend API (GKE Pods)
  cell(
    'backend_api_box',
    `<div style="display:flex;align-items:center;gap:6px;padding:4px 8px;"><div style="font-size:16px;">⚙️</div><div><div style="font-size:8.5px;font-weight:800;color:#0F172A;">${backendName}</div><div style="font-size:7.5px;color:#0284C7;">${backendSub}</div></div></div>`,
    565,
    360,
    205,
    48,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.5;html=1;align=left;verticalAlign=middle;'
  );

  // Message Queueing (Pub/Sub)
  cell(
    'pubsub_queue_box',
    `<div style="display:flex;align-items:center;gap:6px;padding:4px 8px;"><div style="font-size:16px;">📬</div><div><div style="font-size:8.5px;font-weight:800;color:#0F172A;">${queueName}</div><div style="font-size:7.5px;color:#0284C7;">${queueSub}</div></div></div>`,
    565,
    435,
    205,
    48,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.5;html=1;align=left;verticalAlign=middle;'
  );

  // Subnet B Secondary (Auto-Scaling MIG) (x=545..790, y=520..860)
  cell(
    'subnet_b_frame',
    '<div style="font-weight:800;font-size:9.5px;color:#0369A1;text-align:left;padding:4px 8px;">REGIONAL SUBNET B (SECONDARY)</div>',
    545,
    520,
    245,
    345,
    'rounded=1;fillColor=#F0F9FF;strokeColor=#7DD3FC;strokeWidth=1.5;html=1;align=left;verticalAlign=top;'
  );

  cell(
    'auto_scaling_pill',
    '<div style="text-align:center;font-size:8.5px;font-weight:800;color:#0284C7;letter-spacing:0.5px;">AUTO-SCALING</div>',
    600,
    550,
    135,
    24,
    'rounded=1;fillColor=#E0F2FE;strokeColor=#BAE6FD;html=1;align=center;verticalAlign=middle;'
  );

  // Compute Engine MIG
  cell(
    'gce_mig_box',
    '<div style="text-align:center;padding:4px;"><div style="font-size:18px;">🖥️</div><div style="font-size:8px;font-weight:800;color:#0F172A;line-height:1.2;margin-top:2px;">COMPUTE ENGINE<br/>MANAGED INSTANCE<br/>GROUP (MIG)</div></div>',
    560,
    600,
    100,
    85,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#0284C7;html=1;align=center;verticalAlign=middle;'
  );

  // Regional Internal LB
  cell(
    'regional_ilb_box',
    '<div style="text-align:center;padding:4px;"><div style="font-size:18px;">⚖️</div><div style="font-size:8px;font-weight:800;color:#0F172A;line-height:1.2;margin-top:2px;">REGIONAL<br/>INTERNAL LOAD<br/>BALANCER</div></div>',
    680,
    600,
    95,
    85,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#0284C7;html=1;align=center;verticalAlign=middle;'
  );

  // =========================================================================
  // ZONE 3: APPLICATION & DATA (x=825..1105)
  // =========================================================================
  cell(
    'zone_data_frame',
    '<div style="font-weight:800;font-size:10.5px;color:#1E293B;text-align:center;padding-top:4px;">APPLICATION &amp; DATA</div>',
    825,
    135,
    275,
    745,
    'rounded=1;fillColor=#FEF3C7;strokeColor=#FDE68A;strokeWidth=1;html=1;align=center;verticalAlign=top;dashed=1;'
  );

  // Top Microservices: Process Async Tasks -> Persist Data
  cell(
    'async_tasks_box',
    '<div style="display:flex;align-items:center;gap:4px;padding:3px 6px;"><div style="font-size:14px;">📄</div><div style="font-size:8px;font-weight:800;color:#0F172A;">PROCESS<br/>ASYNC TASKS</div></div>',
    845,
    205,
    105,
    42,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#F59E0B;html=1;align=center;verticalAlign=middle;'
  );

  cell(
    'persist_data_box',
    '<div style="display:flex;align-items:center;gap:4px;padding:3px 6px;"><div style="font-size:14px;">🗄️</div><div style="font-size:8px;font-weight:800;color:#0F172A;">PERSIST<br/>DATA</div></div>',
    975,
    205,
    105,
    42,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#F59E0B;html=1;align=center;verticalAlign=middle;'
  );

  // Relational Data Sub-Frame (x=845..1085, y=275..495)
  cell(
    'relational_data_frame',
    '<div style="font-weight:800;font-size:9.5px;color:#B45309;text-align:center;padding:4px;">RELATIONAL DATA</div>',
    845,
    275,
    235,
    230,
    'rounded=1;fillColor=#FFFBEB;strokeColor=#FCD34D;strokeWidth=1.5;html=1;align=center;verticalAlign=top;'
  );

  // Cloud SQL Primary
  cell(
    'cloud_sql_primary',
    `<div style="text-align:center;padding:4px;"><div style="font-size:18px;">🗄️</div><div style="font-size:8.5px;font-weight:800;color:#0F172A;line-height:1.2;margin-top:2px;">${dbName}<br/><span style="font-size:7.5px;color:#D97706;">${dbSub}</span></div></div>`,
    860,
    335,
    95,
    75,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.5;html=1;align=center;verticalAlign=middle;'
  );

  // BigQuery Read Replica
  cell(
    'bigquery_replica',
    `<div style="text-align:center;padding:4px;"><div style="font-size:18px;">📊</div><div style="font-size:8.5px;font-weight:800;color:#0F172A;line-height:1.2;margin-top:2px;">${dwName}<br/><span style="font-size:7.5px;color:#D97706;">${dwSub}</span></div></div>`,
    975,
    335,
    95,
    75,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.5;html=1;align=center;verticalAlign=middle;'
  );

  // Unstructured Data Sub-Frame (x=845..1085, y=525..860)
  cell(
    'unstructured_data_frame',
    '<div style="font-weight:800;font-size:9.5px;color:#B45309;text-align:center;padding:4px;">UNSTRUCTURED DATA</div>',
    845,
    525,
    235,
    335,
    'rounded=1;fillColor=#FFFBEB;strokeColor=#FCD34D;strokeWidth=1.5;html=1;align=center;verticalAlign=top;'
  );

  // Cloud Storage (GCS)
  cell(
    'gcs_storage_box',
    `<div style="text-align:center;padding:4px;"><div style="font-size:18px;">🪣</div><div style="font-size:8.5px;font-weight:800;color:#0F172A;line-height:1.2;margin-top:2px;">${storageName}<br/><span style="font-size:7.5px;color:#D97706;">${storageSub}</span></div></div>`,
    860,
    630,
    100,
    80,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.5;html=1;align=center;verticalAlign=middle;'
  );

  // Data Lifecycle Management
  cell(
    'gcs_lifecycle_box',
    '<div style="text-align:center;padding:4px;"><div style="font-size:18px;">⏱️</div><div style="font-size:8px;font-weight:800;color:#0F172A;line-height:1.2;margin-top:2px;">DATA LIFE CYCLE<br/>MANAGEMENT<br/><span style="font-size:7px;color:#64748B;">(e.g., ARCHIVE OLD FILES)</span></div></div>',
    970,
    630,
    100,
    80,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.5;html=1;align=center;verticalAlign=middle;'
  );

  // =========================================================================
  // ZONE 4: AGENTIC AI SERVICES (Vertex AI) (x=1120..1550)
  // =========================================================================
  cell(
    'zone_ai_frame',
    '<div style="font-weight:800;font-size:10.5px;color:#15803D;text-align:center;padding-top:4px;">AGENTIC AI SERVICES<br/><span style="font-size:8.5px;font-weight:600;color:#16A34A;">(Vertex AI)</span></div>',
    1120,
    135,
    220,
    305,
    'rounded=1;fillColor=#DCFCE7;strokeColor=#86EFAC;strokeWidth=1;html=1;align=center;verticalAlign=top;dashed=1;'
  );

  // Agent Designer
  cell(
    'ai_agent_designer',
    '<div style="text-align:center;padding:4px;"><div style="font-size:18px;">🧠</div><div style="font-size:8px;font-weight:800;color:#0F172A;margin-top:2px;">AGENT DESIGNER</div></div>',
    1140,
    195,
    85,
    60,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#16A34A;html=1;align=center;verticalAlign=middle;'
  );

  // Gemini Notebook
  cell(
    'ai_gemini_notebook',
    '<div style="text-align:center;padding:4px;"><div style="font-size:18px;">💻</div><div style="font-size:8px;font-weight:800;color:#0F172A;margin-top:2px;">GEMINI<br/>NOTEBOOK</div></div>',
    1240,
    195,
    85,
    60,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#16A34A;html=1;align=center;verticalAlign=middle;'
  );

  // ADK 2.0
  cell(
    'ai_adk_box',
    '<div style="text-align:center;padding:4px;"><div style="font-size:16px;">💼</div><div style="font-size:8px;font-weight:800;color:#0F172A;line-height:1.1;margin-top:2px;">ADK 2.0<br/><span style="font-size:7px;color:#16A34A;">(Agent Development Kit)</span></div></div>',
    1235,
    285,
    95,
    60,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#16A34A;html=1;align=center;verticalAlign=middle;'
  );

  // Gemini Agent Platform Hub
  cell(
    'ai_agent_platform_hub',
    `<div style="text-align:center;padding:6px;"><div style="font-size:22px;">✨ 🧠</div><div style="font-size:9.5px;font-weight:800;color:#15803D;line-height:1.2;margin-top:2px;">${aiEngineName}<br/><span style="font-size:8px;color:#16A34A;">${aiEngineSub}</span></div></div>`,
    1140,
    370,
    185,
    65,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#15803D;strokeWidth=2;html=1;align=center;verticalAlign=middle;'
  );

  // Model Management & Serving Sub-Frame (x=1120..1550, y=460..860)
  cell(
    'model_mgmt_frame',
    '<div style="font-weight:800;font-size:9.5px;color:#B45309;text-align:center;padding:4px;">MODEL MANAGEMENT<br/>&amp; SERVING <span style="font-size:8px;">(Vertex AI)</span></div>',
    1120,
    460,
    220,
    400,
    'rounded=1;fillColor=#FFFBEB;strokeColor=#FDE68A;strokeWidth=1.5;html=1;align=center;verticalAlign=top;'
  );

  // Train Model
  cell(
    'train_model_box',
    '<div style="text-align:center;padding:4px;"><div style="font-size:18px;">📊</div><div style="font-size:8px;font-weight:800;color:#0F172A;margin-top:2px;">TRAIN MODEL<br/><span style="font-size:7px;color:#D97706;">(Vertex AI)</span></div></div>',
    1170,
    520,
    115,
    60,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#D97706;html=1;align=center;verticalAlign=middle;'
  );

  // Deploy Model
  cell(
    'deploy_model_box',
    '<div style="text-align:center;padding:4px;"><div style="font-size:18px;">🧠</div><div style="font-size:8px;font-weight:800;color:#0F172A;margin-top:2px;">DEPLOY<br/>MODEL</div></div>',
    1170,
    630,
    115,
    60,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#D97706;html=1;align=center;verticalAlign=middle;'
  );

  // Online Prediction
  cell(
    'online_prediction_box',
    '<div style="text-align:center;padding:4px;"><div style="font-size:18px;">⚡</div><div style="font-size:8px;font-weight:800;color:#0F172A;margin-top:2px;">ONLINE<br/>PREDICTION</div></div>',
    1170,
    740,
    115,
    60,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#D97706;html=1;align=center;verticalAlign=middle;'
  );

  // =========================================================================
  // CONNECTING FLOW ARROWS & PILL LABELS
  // =========================================================================
  // 1. Users & Public Internet -> Ingress
  edge('e1', '❶ INGRESS', 'public_internet', 'cloud_armor', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#2563EB;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=2;fontSize=8;fontStyle=1;');
  edge('e1_vpn', '', 'users_icon', 'ext_vpn_gateway', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#64748B;strokeWidth=1.5;dashed=1;');
  edge('e1_vpn_iap', '', 'ext_vpn_gateway', 'iap_proxy', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#2563EB;strokeWidth=1.5;');

  // Cloud Armor -> IAP
  edge('e2', '❷', 'cloud_armor', 'iap_proxy', 'edgeStyle=none;strokeColor=#2563EB;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=2;fontSize=8;fontStyle=1;');

  // IAP -> GCLB
  edge('e3', '', 'iap_proxy', 'gclb_load_balancer', 'edgeStyle=none;strokeColor=#2563EB;strokeWidth=2;');

  // GCLB -> Decision CON Top
  edge('e4', '❸ YES', 'gclb_load_balancer', 'decision_con_top', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#2563EB;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=2;fontSize=8;fontStyle=1;');

  // Decision CON Top -> Subnet A Primary App
  edge('e5', '❹ NO', 'decision_con_top', 'agentic_app_box', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#0284C7;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=2;fontSize=8;fontStyle=1;', [{ x: 500, y: 305 }]);

  // GCLB -> Path Based Routing & CDN Cache Hit
  edge('e6', 'NO', 'gclb_load_balancer', 'decision_path_routing', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#64748B;strokeWidth=1.5;labelBackgroundColor=#FFFFFF;');
  edge('e7', 'NO', 'gclb_load_balancer', 'decision_cdn_cache', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#64748B;strokeWidth=1.5;labelBackgroundColor=#FFFFFF;');
  edge('e8', '❼ YES', 'decision_path_routing', 'decision_con_bottom', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#0284C7;strokeWidth=1.5;labelBackgroundColor=#FFFFFF;');
  edge('e9', 'YES', 'decision_cdn_cache', 'decision_con_bottom', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#0284C7;strokeWidth=1.5;labelBackgroundColor=#FFFFFF;');

  // Decision CON Bottom -> Subnet B Compute MIG
  edge('e10', '⓲', 'decision_con_bottom', 'gce_mig_box', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#0284C7;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=2;fontSize=8;fontStyle=1;', [{ x: 500, y: 715 }, { x: 500, y: 642 }]);

  // Subnet A: App -> Backend API -> Pub/Sub
  edge('e11', '⓿', 'agentic_app_box', 'backend_api_box', 'edgeStyle=none;strokeColor=#0284C7;strokeWidth=1.5;');
  edge('e12', '', 'backend_api_box', 'pubsub_queue_box', 'edgeStyle=none;strokeColor=#0284C7;strokeWidth=1.5;');

  // Subnet A App -> Relational Data (Cloud SQL)
  edge('e13', '', 'agentic_app_box', 'async_tasks_box', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#059669;strokeWidth=2;');
  edge('e14', '', 'async_tasks_box', 'persist_data_box', 'edgeStyle=none;strokeColor=#059669;strokeWidth=2;');
  edge('e15', '❺ STORE &amp; SERVE', 'async_tasks_box', 'cloud_sql_primary', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#059669;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=2;fontSize=8;fontStyle=1;');

  // Cloud SQL -> BigQuery Replication
  edge('e16', 'REPLICATION', 'cloud_sql_primary', 'bigquery_replica', 'edgeStyle=none;strokeColor=#D97706;strokeWidth=1.5;dashed=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#FCD34D;padding=2;fontSize=7.5;fontStyle=1;');

  // Persist Data -> Cloud Storage & Lifecycle
  edge('e17', '', 'cloud_sql_primary', 'gcs_storage_box', 'edgeStyle=none;strokeColor=#059669;strokeWidth=2;');
  edge('e18', '', 'gcs_storage_box', 'gcs_lifecycle_box', 'edgeStyle=none;strokeColor=#D97706;strokeWidth=1.5;');

  // Subnet B MIG -> Internal LB
  edge('e19', '', 'gce_mig_box', 'regional_ilb_box', 'edgeStyle=none;strokeColor=#0284C7;strokeWidth=1.5;');
  edge('e20', '', 'regional_ilb_box', 'gcs_storage_box', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#059669;strokeWidth=2;');

  // Relational Data & Backend -> Gemini Agent Platform
  edge('e21', '', 'agentic_app_box', 'ai_agent_platform_hub', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#7C3AED;strokeWidth=2;');
  edge('e22', '', 'bigquery_replica', 'ai_agent_platform_hub', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#7C3AED;strokeWidth=2;');
  edge('e23', '', 'ai_agent_designer', 'ai_agent_platform_hub', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#16A34A;strokeWidth=1.5;');
  edge('e24', '', 'ai_gemini_notebook', 'ai_agent_platform_hub', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#16A34A;strokeWidth=1.5;');
  edge('e25', '', 'ai_adk_box', 'ai_agent_platform_hub', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#16A34A;strokeWidth=1.5;');

  // Agent Platform -> Model Management & Training Loop
  edge('e26', '', 'ai_agent_platform_hub', 'train_model_box', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#D97706;strokeWidth=2;');
  edge('e27', '', 'train_model_box', 'deploy_model_box', 'edgeStyle=none;strokeColor=#D97706;strokeWidth=1.5;');
  edge('e28', '', 'deploy_model_box', 'online_prediction_box', 'edgeStyle=none;strokeColor=#D97706;strokeWidth=1.5;');
  edge('e29', 'FEEDBACK LOOP', 'online_prediction_box', 'ai_agent_platform_hub', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#15803D;strokeWidth=2;dashed=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#86EFAC;padding=2;fontSize=7.5;fontStyle=1;', [{ x: 1360, y: 770 }, { x: 1360, y: 402 }]);

  return `<mxfile host="embed.diagrams.net">
  <diagram id="gcp_functional_flowchart" name="${E(title)}">
    <mxGraphModel dx="1600" dy="1000" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="1000" background="${bg}">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${c.join('\n        ')}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
