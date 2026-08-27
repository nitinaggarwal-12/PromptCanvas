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

// High-Craft Vector SVG Icons for GCP Services (Zero External URL dependencies)
const ICONS = {
  gcpLogo: `<svg width="22" height="18" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.35 8.04C18.67 4.59 15.64 2 12 2 9.11 2 6.6 3.64 5.35 6.04 2.34 6.36 0 8.91 0 12c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" fill="#4285F4"/><circle cx="12" cy="11" r="4" fill="#34A853"/><circle cx="16" cy="12" r="3" fill="#FBBC05"/><circle cx="8" cy="12" r="3" fill="#EA4335"/></svg>`,
  cloudArmor: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2L3 6v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6l-9-4z" fill="#1A73E8"/><path d="M10 15.5l-3.5-3.5 1.41-1.41L10 12.67l6.09-6.09L17.5 8 10 15.5z" fill="#FFFFFF"/></svg>`,
  iapLock: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="4" y="10" width="16" height="12" rx="2" fill="#1A73E8"/><path d="M7 10V7a5 5 0 0110 0v3" stroke="#1A73E8" stroke-width="2.5" stroke-linecap="round"/><circle cx="12" cy="15" r="2" fill="#FFFFFF"/></svg>`,
  loadBalancer: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="5" r="3" fill="#1A73E8"/><circle cx="5" cy="19" r="3" fill="#1A73E8"/><circle cx="19" cy="19" r="3" fill="#1A73E8"/><path d="M12 8v4m0 0H5v4m7-4h7v4" stroke="#1A73E8" stroke-width="2" stroke-linecap="round"/></svg>`,
  firebaseAuth: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4.5 18.5L8 3l3.5 6.5L4.5 18.5z" fill="#FFA000"/><path d="M19.5 18.5L16 8l-4.5 10.5h8z" fill="#F57C00"/><path d="M11.5 9.5l4.5 9h-8l3.5-9z" fill="#FFCA28"/></svg>`,
  kubernetes: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#326CE5"/><circle cx="12" cy="12" r="3" fill="#FFFFFF"/><path d="M12 2v4m0 12v4M2 12h4m12 0h4m-3.5-6.5l-2.8 2.8m-7.4 7.4l-2.8 2.8m0-13l2.8 2.8m7.4 7.4l2.8 2.8" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  pubsub: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" fill="#1A73E8"/><path d="M3 7l9 6 9-6" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="12" r="2" fill="#34A853"/></svg>`,
  computeEngine: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="2" fill="#1A73E8"/><path d="M7 8h10M7 12h10M7 16h4" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/><circle cx="17" cy="16" r="1.5" fill="#34A853"/></svg>`,
  cloudSql: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="6" rx="8" ry="3" fill="#1A73E8"/><path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" stroke="#1A73E8" stroke-width="2" fill="none"/><path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" stroke="#1A73E8" stroke-width="2" fill="none"/></svg>`,
  bigquery: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" fill="#1A73E8"/><rect x="6" y="13" width="3" height="5" rx="1" fill="#FFFFFF"/><rect x="10.5" y="9" width="3" height="9" rx="1" fill="#FFFFFF"/><rect x="15" y="6" width="3" height="12" rx="1" fill="#34A853"/></svg>`,
  cloudStorage: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 6h18v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6z" fill="#1A73E8"/><path d="M2 6a1 1 0 011-1h18a1 1 0 011 1v2H2V6z" fill="#4285F4"/><circle cx="12" cy="13" r="2" fill="#FFFFFF"/></svg>`,
  lifecycle: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#1A73E8" stroke-width="2.2" stroke-dasharray="4 2"/><path d="M12 7v5l3 3" stroke="#1A73E8" stroke-width="2" stroke-linecap="round"/><path d="M18 12l2-2-2-2" stroke="#1A73E8" stroke-width="2" stroke-linecap="round"/></svg>`,
  geminiAi: `<svg width="26" height="26" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="14" r="13" fill="#E0F2FE" stroke="#38BDF8" stroke-width="1.5"/><circle cx="14" cy="14" r="6" fill="#1A73E8"/><path d="M14 4v4m0 12v4M4 14h4m12 0h4" stroke="#0284C7" stroke-width="2"/></svg>`,
  monitoring: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" fill="#E0F2FE" stroke="#38BDF8" stroke-width="1.5"/><path d="M6 15l4-4 3 3 5-6" stroke="#0284C7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  iamShield: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2L4 6v6c0 5 3.5 9.5 8 10.5 4.5-1 8-5.5 8-10.5V6l-8-4z" fill="#E0F2FE" stroke="#38BDF8" stroke-width="1.5"/><circle cx="12" cy="10" r="2.5" fill="#0284C7"/><path d="M8 17c0-2 2-3 4-3s4 1 4 3" stroke="#0284C7" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  vpnGateway: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="20" height="14" rx="2" fill="#1D4ED8"/><path d="M6 12h12M14 8l4 4-4 4" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  userIcon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" fill="#475569"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6" fill="#475569"/></svg>`,
  globe: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#475569" stroke-width="2"/><ellipse cx="12" cy="12" rx="4" ry="9" stroke="#475569" stroke-width="1.5"/><path d="M3 12h18" stroke="#475569" stroke-width="1.5"/></svg>`,
  documentTask: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="4" y="2" width="16" height="20" rx="2" fill="#FDE68A"/><path d="M8 7h8M8 11h8M8 15h5" stroke="#92400E" stroke-width="2" stroke-linecap="round"/></svg>`,
  persistData: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="6" rx="7" ry="2.5" fill="#F59E0B"/><path d="M5 6v6c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V6" stroke="#F59E0B" stroke-width="1.8" fill="none"/><path d="M5 12v6c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-6" stroke="#F59E0B" stroke-width="1.8" fill="none"/></svg>`,
  adkBox: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="15" rx="2" fill="#86EFAC"/><path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" stroke="#15803D" stroke-width="2"/></svg>`,
  trainModel: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" fill="#FED7AA"/><path d="M8 12h8M12 8v8" stroke="#C2410C" stroke-width="2" stroke-linecap="round"/></svg>`,
  deployModel: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2l8 8h-5v10h-6V10H4l8-8z" fill="#F97316"/></svg>`,
  predictionZap: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="#EA580C"/></svg>`
};

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
    `<div style="font-size:20px;font-weight:900;color:${textPrimary};text-align:center;font-family:Inter,system-ui,sans-serif;letter-spacing:-0.5px;">${title}</div>`,
    20,
    15,
    1560,
    30,
    'text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;'
  );

  // Left Outer Column: External Actors & Legend
  cell(
    'users_icon',
    `<div style="text-align:center;">${ICONS.userIcon}<div style="font-size:10px;font-weight:800;color:#334155;margin-top:2px;letter-spacing:0.5px;">USERS</div></div>`,
    25,
    250,
    65,
    65,
    'text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;'
  );

  cell(
    'ext_vpn_gateway',
    `<div style="text-align:center;padding:4px;">${ICONS.vpnGateway}<div style="font-size:8.5px;font-weight:800;color:#FFFFFF;line-height:1.1;margin-top:2px;">EXTERNAL<br/>VPN GATEWAY</div></div>`,
    75,
    260,
    75,
    55,
    'rounded=1;fillColor=#1D4ED8;strokeColor=#1E40AF;strokeWidth=1.5;html=1;align=center;verticalAlign=middle;'
  );

  cell(
    'public_internet',
    `<div style="text-align:center;">${ICONS.globe}<div style="font-size:9.5px;font-weight:800;color:#334155;margin-top:2px;letter-spacing:0.5px;">PUBLIC<br/>INTERNET</div></div>`,
    25,
    440,
    65,
    65,
    'text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;'
  );

  // Legend Card
  cell(
    'legend_card',
    `<div style="font-family:Inter,sans-serif;font-size:9px;color:${textPrimary};padding:6px 8px;">
      <div style="font-weight:900;font-size:10px;margin-bottom:6px;border-bottom:1px solid #CBD5E1;padding-bottom:3px;letter-spacing:0.5px;">LEGEND</div>
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;"><span style="background:#0F172A;color:#FFF;border-radius:50%;width:14px;height:14px;display:inline-flex;align-items:center;justify-content:center;font-size:8px;font-weight:bold;">1</span> 1. External Request</div>
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;"><span style="background:#2563EB;color:#FFF;border-radius:50%;width:14px;height:14px;display:inline-flex;align-items:center;justify-content:center;font-size:8px;font-weight:bold;">2</span> 2. WAF &amp; Perimeter</div>
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;"><span style="background:#2563EB;color:#FFF;border-radius:50%;width:14px;height:14px;display:inline-flex;align-items:center;justify-content:center;font-size:8px;font-weight:bold;">3</span> 3. IAP Auth</div>
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;"><span style="background:#0284C7;color:#FFF;border-radius:50%;width:14px;height:14px;display:inline-flex;align-items:center;justify-content:center;font-size:8px;font-weight:bold;">4</span> 4. Subnet Routing</div>
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;"><span style="background:#059669;color:#FFF;border-radius:50%;width:14px;height:14px;display:inline-flex;align-items:center;justify-content:center;font-size:8px;font-weight:bold;">5</span> 5. Persist &amp; Query</div>
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;"><span style="background:#7C3AED;color:#FFF;border-radius:50%;width:14px;height:14px;display:inline-flex;align-items:center;justify-content:center;font-size:8px;font-weight:bold;">6</span> 6. AI Agent Loop</div>
      <div style="border-top:1px solid #E2E8F0;padding-top:4px;margin-top:6px;font-size:8px;color:${textSecondary};">
        <div>── Line Flow</div>
        <div>┄┄ Cross-Cutting Telemetry</div>
      </div>
    </div>`,
    15,
    580,
    140,
    270,
    `rounded=1;fillColor=${isDark ? '#111827' : '#FFFFFF'};strokeColor=${panelBorder};strokeWidth=1.5;html=1;align=left;verticalAlign=top;`
  );

  // Main Google Cloud Project Outer Canvas Frame
  cell(
    'gcp_project_frame',
    `<div style="font-weight:900;font-size:11px;color:${textPrimary};display:flex;align-items:center;gap:6px;padding:6px 12px;">
      <span>${ICONS.gcpLogo}</span> <span>GOOGLE CLOUD PROJECT</span>
      <span style="background:#E2E8F0;color:#334155;font-size:8.5px;font-weight:700;padding:2px 6px;border-radius:4px;margin-left:8px;">GLOBAL REGION</span>
    </div>`,
    165,
    55,
    1420,
    885,
    `rounded=1;fillColor=${isDark ? '#060B13' : '#F8FAFC'};strokeColor=#94A3B8;strokeWidth=2;html=1;align=left;verticalAlign=top;`
  );

  // Top Cross-Cutting Monitoring Box
  cell(
    'cloud_monitoring_box',
    `<div style="display:flex;align-items:center;justify-content:center;gap:6px;padding:4px;">
      ${ICONS.monitoring}
      <div style="text-align:left;">
        <div style="font-size:9px;font-weight:900;color:#1E3A8A;line-height:1.2;">CLOUD MONITORING</div>
        <div style="font-size:7.5px;font-weight:600;color:#3B82F6;">(Logging, Tracing, Alerts)</div>
      </div>
    </div>`,
    720,
    70,
    190,
    46,
    'rounded=1;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.5;html=1;align=center;verticalAlign=middle;'
  );

  // Bottom Left Cloud IAM Box
  cell(
    'cloud_iam_box',
    `<div style="display:flex;align-items:center;justify-content:center;gap:6px;padding:4px;">
      ${ICONS.iamShield}
      <div style="text-align:left;">
        <div style="font-size:9px;font-weight:900;color:#1E3A8A;line-height:1.2;">CLOUD IAM</div>
        <div style="font-size:7.5px;font-weight:600;color:#3B82F6;">(Identity &amp; Access Mgmt)</div>
      </div>
    </div>`,
    185,
    845,
    170,
    50,
    'rounded=1;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1.5;html=1;align=center;verticalAlign=middle;'
  );

  // =========================================================================
  // ZONE 1: INGRESS & SECURITY (x=185..505)
  // =========================================================================
  cell(
    'zone_ingress_frame',
    '<div style="font-weight:900;font-size:10.5px;color:#1E293B;text-align:center;padding-top:4px;letter-spacing:0.5px;">INGRESS &amp; SECURITY</div>',
    185,
    130,
    320,
    695,
    'rounded=1;fillColor=#EEF2F6;strokeColor=#CBD5E1;strokeWidth=1;html=1;align=center;verticalAlign=top;dashed=1;'
  );

  // Decision CON Top (WAF Check)
  cell(
    'decision_con_top',
    '<div style="text-align:center;font-size:9px;font-weight:900;color:#1E3A8A;">CON</div>',
    410,
    250,
    50,
    50,
    'shape=rhombus;html=1;strokeColor=#3B82F6;strokeWidth=1.5;fillColor=#EFF6FF;align=center;verticalAlign=middle;'
  );

  // Cloud Armor (WAF/DDoS)
  cell(
    'cloud_armor',
    `<div style="text-align:center;padding:4px;">
      ${ICONS.cloudArmor}
      <div style="font-size:9px;font-weight:900;color:#1E3A8A;line-height:1.1;margin-top:2px;">CLOUD ARMOR</div>
      <div style="font-size:7.5px;font-weight:600;color:#3B82F6;">(WAF / DDoS protection)</div>
    </div>`,
    200,
    440,
    90,
    75,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.5;html=1;align=center;verticalAlign=middle;'
  );

  // Identity-Aware Proxy (IAP)
  cell(
    'iap_proxy',
    `<div style="text-align:center;padding:4px;">
      ${ICONS.iapLock}
      <div style="font-size:9px;font-weight:900;color:#1E3A8A;line-height:1.1;margin-top:2px;">IDENTITY-AWARE<br/>PROXY (IAP)</div>
    </div>`,
    300,
    440,
    85,
    75,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.5;html=1;align=center;verticalAlign=middle;'
  );

  // Global External HTTP(S) Load Balancer
  cell(
    'gclb_load_balancer',
    `<div style="text-align:center;padding:4px;">
      ${ICONS.loadBalancer}
      <div style="font-size:8.5px;font-weight:900;color:#1E3A8A;line-height:1.1;margin-top:2px;">GLOBAL EXTERNAL<br/>HTTP(S) LOAD BALANCER</div>
    </div>`,
    395,
    440,
    95,
    75,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.5;html=1;align=center;verticalAlign=middle;'
  );

  // Path-Based Routing Decision
  cell(
    'decision_path_routing',
    '<div style="text-align:center;font-size:7.5px;font-weight:800;color:#0F172A;line-height:1.1;">PATH-BASED<br/>ROUTING?<br/><span style="color:#2563EB;font-weight:bold;">YES / NO</span></div>',
    375,
    570,
    65,
    55,
    'shape=rhombus;html=1;strokeColor=#94A3B8;fillColor=#FFFFFF;align=center;verticalAlign=middle;'
  );

  // CDN Cache Hit Decision
  cell(
    'decision_cdn_cache',
    '<div style="text-align:center;font-size:7.5px;font-weight:800;color:#0F172A;line-height:1.1;">CDN CACHE<br/>HIT?<br/><span style="color:#2563EB;font-weight:bold;">YES / NO</span></div>',
    445,
    570,
    65,
    55,
    'shape=rhombus;html=1;strokeColor=#94A3B8;fillColor=#FFFFFF;align=center;verticalAlign=middle;'
  );

  // Decision CON Bottom
  cell(
    'decision_con_bottom',
    '<div style="text-align:center;font-size:9px;font-weight:900;color:#1E3A8A;">CON</div>',
    380,
    690,
    50,
    50,
    'shape=rhombus;html=1;strokeColor=#3B82F6;strokeWidth=1.5;fillColor=#EFF6FF;align=center;verticalAlign=middle;'
  );

  // =========================================================================
  // ZONE 2: LOAD BALANCING & COMPUTE (x=520..805)
  // =========================================================================
  cell(
    'zone_compute_frame',
    '<div style="font-weight:900;font-size:10.5px;color:#1E293B;text-align:center;padding-top:4px;letter-spacing:0.5px;">LOAD BALANCING &amp; COMPUTE</div>',
    520,
    130,
    285,
    760,
    'rounded=1;fillColor=#E0F2FE;strokeColor=#BAE6FD;strokeWidth=1;html=1;align=center;verticalAlign=top;dashed=1;'
  );

  // Subnet A Primary (x=535..790, y=170..495)
  cell(
    'subnet_a_frame',
    '<div style="font-weight:900;font-size:9px;color:#0369A1;text-align:left;padding:4px 8px;letter-spacing:0.5px;">REGIONAL SUBNET A (PRIMARY)</div>',
    535,
    165,
    255,
    345,
    'rounded=1;fillColor=#F8FAFC;strokeColor=#7DD3FC;strokeWidth=1.5;html=1;align=left;verticalAlign=top;'
  );

  // User Auth (Firebase Auth)
  cell(
    'user_auth_box',
    `<div style="display:flex;align-items:center;gap:8px;padding:4px 8px;">
      ${ICONS.firebaseAuth}
      <div>
        <div style="font-size:8.5px;font-weight:900;color:#0F172A;">USER AUTHENTICATION</div>
        <div style="font-size:7.5px;color:#0284C7;font-weight:600;">(via Firebase Auth)</div>
      </div>
    </div>`,
    550,
    200,
    225,
    46,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#BAE6FD;strokeWidth=1.5;html=1;align=left;verticalAlign=middle;'
  );

  // Agentic Enterprise App (GKE Pods)
  cell(
    'agentic_app_box',
    `<div style="display:flex;align-items:center;gap:8px;padding:4px 8px;">
      ${ICONS.kubernetes}
      <div>
        <div style="font-size:8.5px;font-weight:900;color:#0F172A;">${appName}</div>
        <div style="font-size:7.5px;color:#0284C7;font-weight:600;">${appSub}</div>
      </div>
    </div>`,
    550,
    275,
    225,
    50,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.5;html=1;align=left;verticalAlign=middle;'
  );

  // Backend API (GKE Pods)
  cell(
    'backend_api_box',
    `<div style="display:flex;align-items:center;gap:8px;padding:4px 8px;">
      ${ICONS.kubernetes}
      <div>
        <div style="font-size:8.5px;font-weight:900;color:#0F172A;">${backendName}</div>
        <div style="font-size:7.5px;color:#0284C7;font-weight:600;">${backendSub}</div>
      </div>
    </div>`,
    550,
    355,
    225,
    50,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.5;html=1;align=left;verticalAlign=middle;'
  );

  // Message Queueing (Pub/Sub)
  cell(
    'pubsub_queue_box',
    `<div style="display:flex;align-items:center;gap:8px;padding:4px 8px;">
      ${ICONS.pubsub}
      <div>
        <div style="font-size:8.5px;font-weight:900;color:#0F172A;">${queueName}</div>
        <div style="font-size:7.5px;color:#0284C7;font-weight:600;">${queueSub}</div>
      </div>
    </div>`,
    550,
    435,
    225,
    50,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.5;html=1;align=left;verticalAlign=middle;'
  );

  // Subnet B Secondary (Auto-Scaling MIG)
  cell(
    'subnet_b_frame',
    '<div style="font-weight:900;font-size:9px;color:#0369A1;text-align:left;padding:4px 8px;letter-spacing:0.5px;">REGIONAL SUBNET B (SECONDARY)</div>',
    535,
    525,
    255,
    350,
    'rounded=1;fillColor=#F8FAFC;strokeColor=#7DD3FC;strokeWidth=1.5;html=1;align=left;verticalAlign=top;'
  );

  cell(
    'auto_scaling_pill',
    '<div style="text-align:center;font-size:8.5px;font-weight:900;color:#0284C7;letter-spacing:0.5px;">AUTO-SCALING</div>',
    595,
    550,
    135,
    24,
    'rounded=1;fillColor=#E0F2FE;strokeColor=#BAE6FD;html=1;align=center;verticalAlign=middle;'
  );

  // Compute Engine MIG
  cell(
    'gce_mig_box',
    `<div style="text-align:center;padding:4px;">
      ${ICONS.computeEngine}
      <div style="font-size:8px;font-weight:900;color:#0F172A;line-height:1.2;margin-top:2px;">COMPUTE ENGINE<br/>MANAGED INSTANCE<br/>GROUP (MIG)</div>
    </div>`,
    550,
    600,
    105,
    85,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.5;html=1;align=center;verticalAlign=middle;'
  );

  // Regional Internal LB
  cell(
    'regional_ilb_box',
    `<div style="text-align:center;padding:4px;">
      ${ICONS.loadBalancer}
      <div style="font-size:8px;font-weight:900;color:#0F172A;line-height:1.2;margin-top:2px;">REGIONAL<br/>INTERNAL LOAD<br/>BALANCER</div>
    </div>`,
    675,
    600,
    100,
    85,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.5;html=1;align=center;verticalAlign=middle;'
  );

  // =========================================================================
  // ZONE 3: APPLICATION & DATA (x=820..1105)
  // =========================================================================
  cell(
    'zone_data_frame',
    '<div style="font-weight:900;font-size:10.5px;color:#1E293B;text-align:center;padding-top:4px;letter-spacing:0.5px;">APPLICATION &amp; DATA</div>',
    820,
    130,
    285,
    760,
    'rounded=1;fillColor=#FEF3C7;strokeColor=#FDE68A;strokeWidth=1;html=1;align=center;verticalAlign=top;dashed=1;'
  );

  // Top Microservices: Process Async Tasks -> Persist Data
  cell(
    'async_tasks_box',
    `<div style="display:flex;align-items:center;justify-content:center;gap:6px;padding:3px 6px;">
      ${ICONS.documentTask}
      <div style="font-size:8px;font-weight:900;color:#0F172A;text-align:left;line-height:1.1;">PROCESS<br/>ASYNC TASKS</div>
    </div>`,
    840,
    200,
    110,
    44,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#F59E0B;strokeWidth=1.5;html=1;align=center;verticalAlign=middle;'
  );

  cell(
    'persist_data_box',
    `<div style="display:flex;align-items:center;justify-content:center;gap:6px;padding:3px 6px;">
      ${ICONS.persistData}
      <div style="font-size:8px;font-weight:900;color:#0F172A;text-align:left;line-height:1.1;">PERSIST<br/>DATA</div>
    </div>`,
    975,
    200,
    110,
    44,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#F59E0B;strokeWidth=1.5;html=1;align=center;verticalAlign=middle;'
  );

  // Relational Data Sub-Frame
  cell(
    'relational_data_frame',
    '<div style="font-weight:900;font-size:9px;color:#B45309;text-align:center;padding:4px;letter-spacing:0.5px;">RELATIONAL DATA</div>',
    835,
    295,
    255,
    220,
    'rounded=1;fillColor=#FFFBEB;strokeColor=#FCD34D;strokeWidth=1.5;html=1;align=center;verticalAlign=top;'
  );

  // Cloud SQL Primary
  cell(
    'cloud_sql_primary',
    `<div style="text-align:center;padding:4px;">
      ${ICONS.cloudSql}
      <div style="font-size:8.5px;font-weight:900;color:#0F172A;line-height:1.2;margin-top:2px;">${dbName}</div>
      <div style="font-size:7.5px;color:#D97706;font-weight:600;">${dbSub}</div>
    </div>`,
    850,
    345,
    100,
    75,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.5;html=1;align=center;verticalAlign=middle;'
  );

  // BigQuery Read Replica
  cell(
    'bigquery_replica',
    `<div style="text-align:center;padding:4px;">
      ${ICONS.bigquery}
      <div style="font-size:8.5px;font-weight:900;color:#0F172A;line-height:1.2;margin-top:2px;">${dwName}</div>
      <div style="font-size:7.5px;color:#D97706;font-weight:600;">${dwSub}</div>
    </div>`,
    975,
    345,
    100,
    75,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.5;html=1;align=center;verticalAlign=middle;'
  );

  // Unstructured Data Sub-Frame
  cell(
    'unstructured_data_frame',
    '<div style="font-weight:900;font-size:9px;color:#B45309;text-align:center;padding:4px;letter-spacing:0.5px;">UNSTRUCTURED DATA</div>',
    835,
    535,
    255,
    340,
    'rounded=1;fillColor=#FFFBEB;strokeColor=#FCD34D;strokeWidth=1.5;html=1;align=center;verticalAlign=top;'
  );

  // Cloud Storage (GCS)
  cell(
    'gcs_storage_box',
    `<div style="text-align:center;padding:4px;">
      ${ICONS.cloudStorage}
      <div style="font-size:8.5px;font-weight:900;color:#0F172A;line-height:1.2;margin-top:2px;">${storageName}</div>
      <div style="font-size:7.5px;color:#D97706;font-weight:600;">${storageSub}</div>
    </div>`,
    850,
    630,
    105,
    80,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.5;html=1;align=center;verticalAlign=middle;'
  );

  // Data Lifecycle Management
  cell(
    'gcs_lifecycle_box',
    `<div style="text-align:center;padding:4px;">
      ${ICONS.lifecycle}
      <div style="font-size:8px;font-weight:900;color:#0F172A;line-height:1.1;margin-top:2px;">DATA LIFE CYCLE<br/>MANAGEMENT</div>
      <div style="font-size:7px;color:#64748B;font-weight:600;">(e.g., ARCHIVE OLD FILES)</div>
    </div>`,
    970,
    630,
    105,
    80,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.5;html=1;align=center;verticalAlign=middle;'
  );

  // =========================================================================
  // ZONE 4: AGENTIC AI SERVICES (Vertex AI) (x=1120..1540)
  // =========================================================================
  cell(
    'zone_ai_frame',
    `<div style="display:flex;align-items:center;justify-content:center;gap:6px;padding-top:4px;">
      ${ICONS.geminiAi}
      <div style="text-align:left;">
        <div style="font-weight:900;font-size:10px;color:#15803D;letter-spacing:0.5px;">AGENTIC AI SERVICES</div>
        <div style="font-size:8px;font-weight:700;color:#16A34A;">(Vertex AI)</div>
      </div>
    </div>`,
    1120,
    130,
    245,
    315,
    'rounded=1;fillColor=#DCFCE7;strokeColor=#86EFAC;strokeWidth=1;html=1;align=center;verticalAlign=top;dashed=1;'
  );

  // Agent Designer
  cell(
    'ai_agent_designer',
    `<div style="text-align:center;padding:4px;">
      <div style="font-size:14px;">🎨</div>
      <div style="font-size:8px;font-weight:900;color:#0F172A;margin-top:2px;">AGENT DESIGNER</div>
    </div>`,
    1135,
    195,
    90,
    60,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;html=1;align=center;verticalAlign=middle;'
  );

  // Gemini Notebook
  cell(
    'ai_gemini_notebook',
    `<div style="text-align:center;padding:4px;">
      <div style="font-size:14px;">📓</div>
      <div style="font-size:8px;font-weight:900;color:#0F172A;margin-top:2px;">GEMINI<br/>NOTEBOOK</div>
    </div>`,
    1235,
    195,
    90,
    60,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;html=1;align=center;verticalAlign=middle;'
  );

  // ADK 2.0
  cell(
    'ai_adk_box',
    `<div style="text-align:center;padding:4px;">
      ${ICONS.adkBox}
      <div style="font-size:8px;font-weight:900;color:#0F172A;line-height:1.1;margin-top:2px;">ADK 2.0</div>
      <div style="font-size:7px;color:#16A34A;font-weight:600;">(Agent Development Kit)</div>
    </div>`,
    1230,
    285,
    95,
    60,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;html=1;align=center;verticalAlign=middle;'
  );

  // Gemini Agent Platform Hub
  cell(
    'ai_agent_platform_hub',
    `<div style="display:flex;align-items:center;justify-content:center;gap:8px;padding:6px;">
      ${ICONS.geminiAi}
      <div style="text-align:left;">
        <div style="font-size:9.5px;font-weight:900;color:#15803D;line-height:1.2;">${aiEngineName}</div>
        <div style="font-size:8px;color:#16A34A;font-weight:700;">${aiEngineSub}</div>
      </div>
    </div>`,
    1135,
    370,
    190,
    65,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#15803D;strokeWidth=2;html=1;align=center;verticalAlign=middle;'
  );

  // Model Management & Serving Sub-Frame
  cell(
    'model_mgmt_frame',
    `<div style="display:flex;align-items:center;justify-content:center;gap:6px;padding-top:4px;">
      ${ICONS.gcpLogo}
      <div style="text-align:left;">
        <div style="font-weight:900;font-size:9.5px;color:#B45309;">MODEL MANAGEMENT &amp; SERVING</div>
        <div style="font-size:8px;font-weight:700;color:#D97706;">(Vertex AI)</div>
      </div>
    </div>`,
    1120,
    465,
    245,
    410,
    'rounded=1;fillColor=#FFFBEB;strokeColor=#FDE68A;strokeWidth=1.5;html=1;align=center;verticalAlign=top;'
  );

  // Train Model
  cell(
    'train_model_box',
    `<div style="text-align:center;padding:4px;">
      ${ICONS.trainModel}
      <div style="font-size:8px;font-weight:900;color:#0F172A;margin-top:2px;">TRAIN MODEL</div>
      <div style="font-size:7px;color:#D97706;font-weight:600;">(Vertex AI)</div>
    </div>`,
    1180,
    530,
    125,
    60,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.5;html=1;align=center;verticalAlign=middle;'
  );

  // Deploy Model
  cell(
    'deploy_model_box',
    `<div style="text-align:center;padding:4px;">
      ${ICONS.deployModel}
      <div style="font-size:8px;font-weight:900;color:#0F172A;margin-top:2px;">DEPLOY<br/>MODEL</div>
    </div>`,
    1180,
    640,
    125,
    60,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.5;html=1;align=center;verticalAlign=middle;'
  );

  // Online Prediction
  cell(
    'online_prediction_box',
    `<div style="text-align:center;padding:4px;">
      ${ICONS.predictionZap}
      <div style="font-size:8px;font-weight:900;color:#0F172A;margin-top:2px;">ONLINE<br/>PREDICTION</div>
    </div>`,
    1180,
    750,
    125,
    60,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.5;html=1;align=center;verticalAlign=middle;'
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
  edge('e5', '❹ NO', 'decision_con_top', 'agentic_app_box', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#0284C7;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=2;fontSize=8;fontStyle=1;', [{ x: 510, y: 300 }]);

  // GCLB -> Path Based Routing & CDN Cache Hit
  edge('e6', 'NO', 'gclb_load_balancer', 'decision_path_routing', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#64748B;strokeWidth=1.5;labelBackgroundColor=#FFFFFF;');
  edge('e7', 'NO', 'gclb_load_balancer', 'decision_cdn_cache', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#64748B;strokeWidth=1.5;labelBackgroundColor=#FFFFFF;');
  edge('e8', '❼ YES', 'decision_path_routing', 'decision_con_bottom', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#0284C7;strokeWidth=1.5;labelBackgroundColor=#FFFFFF;');
  edge('e9', 'YES', 'decision_cdn_cache', 'decision_con_bottom', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#0284C7;strokeWidth=1.5;labelBackgroundColor=#FFFFFF;');

  // Decision CON Bottom -> Subnet B Compute MIG
  edge('e10', '⓲', 'decision_con_bottom', 'gce_mig_box', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#0284C7;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=2;fontSize=8;fontStyle=1;', [{ x: 505, y: 715 }, { x: 505, y: 642 }]);

  // Subnet A: App -> Backend API -> Pub/Sub
  edge('e11', '⓿', 'agentic_app_box', 'backend_api_box', 'edgeStyle=none;strokeColor=#0284C7;strokeWidth=1.5;');
  edge('e12', '', 'backend_api_box', 'pubsub_queue_box', 'edgeStyle=none;strokeColor=#0284C7;strokeWidth=1.5;');

  // Subnet A App -> Relational Data (Cloud SQL)
  edge('e13', '', 'agentic_app_box', 'async_tasks_box', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#059669;strokeWidth=2;');
  edge('e14', '', 'async_tasks_box', 'persist_data_box', 'edgeStyle=none;strokeColor=#059669;strokeWidth=2;');
  edge('e15', '❺ STORE &amp; SERVE', 'persist_data_box', 'cloud_sql_primary', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#059669;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=2;fontSize=8;fontStyle=1;', [{ x: 900, y: 222 }]);

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
  edge('e29', 'FEEDBACK LOOP', 'online_prediction_box', 'ai_agent_platform_hub', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#15803D;strokeWidth=2;dashed=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#86EFAC;padding=2;fontSize=7.5;fontStyle=1;', [{ x: 1395, y: 780 }, { x: 1395, y: 402 }]);

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
