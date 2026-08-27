/**
 * GCP Functional Flowchart Architecture Blueprint Generator
 * Full 16:9 Widescreen Calibrated Master Layout (1600x960)
 * Strict 2-Tier Horizontal Alignment + Cross-Cutting Foundation Bar
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
    projectName = 'Enterprise GCP Architecture',
    useCaseName = 'GCP Cloud Native Architecture',
    projectTitle = 'GCP Cloud Architecture: Functional Flowchart Diagram',
    prompt = '',
    theme = 'light'
  } = options;

  const isDark = theme === 'dark';
  const bg = isDark ? '#0F172A' : '#FFFFFF';

  // Keyword analyzers for dynamic prompt-driven architectural mutations
  const pLower = (prompt || '').toLowerCase();
  const isCmek = pLower.includes('cmek') || pLower.includes('encryption') || pLower.includes('kms') || pLower.includes('perimeter') || pLower.includes('vpc-sc') || pLower.includes('security');
  const isSpanner = pLower.includes('spanner') || pLower.includes('multi-region') || pLower.includes('truetime') || pLower.includes('active-active') || pLower.includes('acid');
  const isGpu = pLower.includes('gpu') || pLower.includes('mig') || pLower.includes('h100') || pLower.includes('accelerator') || pLower.includes('a100') || pLower.includes('nvidia') || pLower.includes('cluster');
  const isRag = pLower.includes('rag') || pLower.includes('retrieval') || pLower.includes('vector') || pLower.includes('scann') || pLower.includes('knowledge') || pLower.includes('grounding') || pLower.includes('embeddings');
  const isStream = pLower.includes('stream') || pLower.includes('dataflow') || pLower.includes('pubsub') || pLower.includes('realtime') || pLower.includes('event') || pLower.includes('kafka');
  const isPharma = pLower.includes('pharma') || pLower.includes('bio') || pLower.includes('clinical') || pLower.includes('gxp') || pLower.includes('drug') || pLower.includes('genomics');

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

  // High-Contrast Vector SVG Icons (Zero external HTTP dependencies)
  const ICONS = {
    gcpLogo: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" fill="#4285F4"/><path d="M19 14h-1.5v-2.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5V14H13v-4.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5V14H8.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h10.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z" fill="#FFFFFF"/></svg>`,
    users: `<svg width="22" height="22" viewBox="0 0 24 24" fill="#2563EB"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>`,
    globe: `<svg width="22" height="22" viewBox="0 0 24 24" fill="#0284C7"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>`,
    cloudArmor: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#2563EB"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>`,
    iapLock: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#0284C7"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>`,
    gclb: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#2563EB"><path d="M4 4h4v4H4zm12 0h4v4h-4zM4 16h4v4H4zm12 0h4v4h-4zM6 8v8h2V8zm10 0v8h2V8zm-6 3h4v2h-4z"/></svg>`,
    firebaseAuth: `<svg width="16" height="16" viewBox="0 0 24 24" fill="#D97706"><path d="M3.89 15.67L6.15.71a.5.5 0 0 1 .94-.14l2.84 5.34 2.82-5.34a.5.5 0 0 1 .94.14l2.26 14.96-5.46 3.1a1 1 0 0 1-.98 0l-5.62-3.1z"/></svg>`,
    kubernetes: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#0284C7"><path d="M12 2l8.5 4.9v9.8L12 21.6l-8.5-4.9V6.9L12 2zm0 2.3L5.5 7.9v8.2l6.5 3.7 6.5-3.7V7.9L12 4.3zm0 3.7a4 4 0 1 1 0 8 4 4 0 0 1 0-8z"/></svg>`,
    pubsub: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#0284C7"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 17.93V18a1 1 0 0 1-2 0v-.07A8 8 0 0 1 4.07 13H6a1 1 0 0 1 0-2H4.07A8 8 0 0 1 11 4.07V6a1 1 0 0 1 2 0V4.07A8 8 0 0 1 19.93 11H18a1 1 0 0 1 0 2h1.93A8 8 0 0 1 13 19.93z"/></svg>`,
    computeEngine: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#0284C7"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>`,
    loadBalancer: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#0284C7"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>`,
    cloudSql: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#D97706"><path d="M12 2C6.48 2 2 4.24 2 7v10c0 2.76 4.48 5 10 5s10-2.24 10-5V7c0-2.76-4.48-5-10-5zm0 2c4.42 0 8 1.79 8 3s-3.58 3-8 3-8-1.79-8-3 3.58-3 8-3zm8 13c0 1.21-3.58 3-8 3s-8-1.79-8-3v-2.12c1.84 1.31 4.79 2.12 8 2.12s6.16-.81 8-2.12V17zm0-4c0 1.21-3.58 3-8 3s-8-1.79-8-3v-2.12c1.84 1.31 4.79 2.12 8 2.12s6.16-.81 8-2.12V13z"/></svg>`,
    bigquery: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#D97706"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>`,
    cloudStorage: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#D97706"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3z"/></svg>`,
    lifecycle: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#D97706"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg>`,
    deepmindGemini: `<svg width="20" height="20" viewBox="0 0 24 24" fill="#15803D"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>`,
    agentDesigner: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#16A34A"><path d="M12 2l8.5 4.9v9.8L12 21.6l-8.5-4.9V6.9L12 2zm0 2.3L5.5 7.9v8.2l6.5 3.7 6.5-3.7V7.9L12 4.3zm0 3.7a4 4 0 1 1 0 8 4 4 0 0 1 0-8z"/></svg>`,
    notebook: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#16A34A"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>`,
    adkKit: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#16A34A"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg>`,
    trainModel: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#D97706"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 17.93V18a1 1 0 0 1-2 0v-.07A8 8 0 0 1 4.07 13H6a1 1 0 0 1 0-2H4.07A8 8 0 0 1 11 4.07V6a1 1 0 0 1 2 0V4.07A8 8 0 0 1 19.93 11H18a1 1 0 0 1 0 2h1.93A8 8 0 0 1 13 19.93z"/></svg>`,
    deployModel: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#D97706"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/></svg>`,
    predictionZap: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#D97706"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>`,
    monitoringPulse: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#0284C7"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-2.5l-1.5 4.5-3-9L8.5 13H7v-2h2.5l1.5-4.5 3 9 1.5-4.5H17v2z"/></svg>`,
    iamShield: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#0284C7"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>`,
    documentTask: `<svg width="16" height="16" viewBox="0 0 24 24" fill="#D97706"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>`,
    persistData: `<svg width="16" height="16" viewBox="0 0 24 24" fill="#D97706"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>`
  };

  // Header Title & Brand Block
  cell(
    'hdr_brand_block',
    `<div style="display:flex;align-items:center;justify-content:space-between;width:100%;padding:4px 10px;">
      <div style="font-size:18px;font-weight:900;color:#0F172A;letter-spacing:-0.4px;">${E(projectTitle)}</div>
      <div style="font-size:11px;font-weight:800;color:#2563EB;">🧬 NOVACURA | Google Cloud Platform Enterprise Architecture</div>
    </div>`,
    150,
    15,
    1390,
    35,
    'text;html=1;align=left;verticalAlign=middle;'
  );

  // =========================================================================
  // 1. GLOBAL REGION & GOOGLE CLOUD PROJECT MASTER FRAMES
  // =========================================================================
  cell(
    'global_region_frame',
    `<div style="font-weight:900;font-size:10px;color:#475569;text-align:left;padding:6px 12px;letter-spacing:0.8px;">GLOBAL REGION</div>`,
    135,
    55,
    1420,
    880,
    'rounded=0;fillColor=#E5E7EB;strokeColor=#9CA3AF;strokeWidth=2;html=1;align=left;verticalAlign=top;'
  );

  cell(
    'gcp_project_frame',
    `<div style="display:flex;align-items:center;gap:8px;padding:6px 12px;">
      ${ICONS.gcpLogo}
      <div style="font-weight:900;font-size:11px;color:#1E3A8A;letter-spacing:0.8px;">GOOGLE CLOUD PROJECT</div>
      <div style="font-size:9px;color:#64748B;font-weight:700;margin-left:12px;padding:2px 8px;background:#FFFFFF;border-radius:4px;border:1px solid #CBD5E1;">GLOBAL REGION</div>
      ${isCmek ? `<div style="font-size:8px;color:#0F766E;font-weight:800;padding:2px 8px;background:#CCFBF1;border-radius:4px;border:1px solid #99F6E4;">🛡️ VPC-SC + CMEK PERIMETER</div>` : ''}
    </div>`,
    150,
    85,
    1390,
    835,
    'rounded=1;fillColor=#DBEAFE;strokeColor=#93C5FD;strokeWidth=1.5;html=1;align=left;verticalAlign=top;'
  );

  // =========================================================================
  // 2. LEFT EXTERNAL ENTITIES & LEGEND (x=10..140)
  // =========================================================================
  cell(
    'users_icon',
    `<div style="text-align:center;">
      ${ICONS.users}
      <div style="font-size:8.5px;font-weight:900;color:#1E293B;margin-top:2px;">USERS</div>
    </div>`,
    15,
    250,
    50,
    50,
    'text;html=1;align=center;verticalAlign=middle;'
  );

  cell(
    'ext_vpn_gateway',
    `<div style="text-align:center;padding:4px;">
      <div style="font-size:16px;">🌐</div>
      <div style="font-size:7.5px;font-weight:900;color:#FFFFFF;line-height:1.1;margin-top:2px;">EXTERNAL<br/>VPN GATEWAY</div>
    </div>`,
    72,
    250,
    58,
    52,
    'rounded=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1.5;html=1;align=center;verticalAlign=middle;'
  );

  cell(
    'public_internet',
    `<div style="text-align:center;">
      ${ICONS.globe}
      <div style="font-size:8px;font-weight:900;color:#1E293B;margin-top:2px;line-height:1.1;">PUBLIC<br/>INTERNET</div>
    </div>`,
    20,
    420,
    50,
    50,
    'text;html=1;align=center;verticalAlign=middle;'
  );

  cell(
    'legend_box',
    `<div style="font-size:7.5px;line-height:1.35;color:#1E293B;padding:4px;">
      <div style="font-weight:900;font-size:8.5px;color:#0F172A;border-bottom:1px solid #CBD5E1;padding-bottom:2px;margin-bottom:3px;letter-spacing:0.5px;">LEGEND</div>
      <div style="margin-bottom:2px;"><span style="color:#2563EB;font-weight:900;">❶</span> 1. External Request</div>
      <div style="margin-bottom:2px;"><span style="color:#2563EB;font-weight:900;">❷</span> 2. WAF &amp; Perimeter</div>
      <div style="margin-bottom:2px;"><span style="color:#2563EB;font-weight:900;">❸</span> 3. IAP Auth</div>
      <div style="margin-bottom:2px;"><span style="color:#0284C7;font-weight:900;">❹</span> 4. Subnet Routing</div>
      <div style="margin-bottom:2px;"><span style="color:#059669;font-weight:900;">❺</span> 5. Persist &amp; Store</div>
      <div style="margin-bottom:2px;"><span style="color:#15803D;font-weight:900;">❻</span> 6. DeepMind Vertex AI</div>
      <div style="margin-bottom:4px;"><span style="color:#D97706;font-weight:900;">❼</span> 7. Auto-Scale MIG</div>
      ${isCmek ? `<div style="margin-bottom:3px;padding:2px;background:#CCFBF1;border-radius:3px;color:#0F766E;font-weight:800;">🛡️ CMEK Encrypted</div>` : ''}
      <div style="font-weight:800;font-size:7.5px;color:#64748B;border-top:1px dashed #CBD5E1;padding-top:3px;margin-top:2px;">Line Types:</div>
      <div style="color:#2563EB;">— Direct API / Ingress</div>
      <div style="color:#D97706;">--- Async / Event Stream</div>
      <div style="color:#7C3AED;">- - DeepMind Reasoning</div>
      <div style="color:#15803D;">--- AI Feedback Loop</div>
    </div>`,
    10,
    495,
    120,
    275,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.5;html=1;align=left;verticalAlign=top;'
  );

  // =========================================================================
  // ZONE 1: INGRESS & SECURITY (x=165..440, y=120..760, h=640)
  // =========================================================================
  const ingressZoneTitle = isCmek ? 'INGRESS &amp; PERIMETER SECURITY (VPC-SC + CMEK)' : 'INGRESS &amp; SECURITY';
  cell(
    'zone_ingress_frame',
    `<div style="font-weight:900;font-size:10px;color:#0F766E;text-align:center;padding-top:4px;letter-spacing:0.5px;">${ingressZoneTitle}</div>`,
    165,
    120,
    275,
    640,
    'rounded=1;fillColor=#E2ECE9;strokeColor=#99F6E4;strokeWidth=1;html=1;align=center;verticalAlign=top;dashed=1;'
  );

  // Decision CON Node (Top - perfectly aligned above GCLB)
  cell(
    'decision_con_top',
    `<div style="font-size:8px;font-weight:900;color:#1E3A8A;text-align:center;">CON</div>`,
    380,
    235,
    34,
    34,
    'rhombus;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=2;html=1;align=center;verticalAlign=middle;'
  );

  // Cloud Armor (WAF/DDoS Protection)
  const cloudArmorSubtitle = isCmek ? '(WAF / CMEK Key Encrypted)' : '(WAF / DDoS protection)';
  cell(
    'cloud_armor',
    `<div style="text-align:center;padding:3px;">
      ${ICONS.cloudArmor}
      <div style="font-size:8px;font-weight:900;color:#0F172A;line-height:1.2;margin-top:2px;">CLOUD ARMOR</div>
      <div style="font-size:6.5px;color:#64748B;font-weight:600;">${cloudArmorSubtitle}</div>
    </div>`,
    180,
    415,
    80,
    62,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=2;html=1;align=center;verticalAlign=middle;'
  );

  // Identity-Aware Proxy (IAP)
  const iapSubtitle = isCmek ? 'IDENTITY-AWARE<br/>PROXY (IAP + VPC-SC)' : 'IDENTITY-AWARE<br/>PROXY (IAP)';
  cell(
    'iap_proxy',
    `<div style="text-align:center;padding:3px;">
      ${ICONS.iapLock}
      <div style="font-size:8px;font-weight:900;color:#0F172A;line-height:1.2;margin-top:2px;">${iapSubtitle}</div>
    </div>`,
    270,
    415,
    80,
    62,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=2;html=1;align=center;verticalAlign=middle;'
  );

  // Global External HTTP(S) Load Balancer
  cell(
    'gclb_load_balancer',
    `<div style="text-align:center;padding:3px;">
      ${ICONS.gclb}
      <div style="font-size:8px;font-weight:900;color:#0F172A;line-height:1.2;margin-top:2px;">GLOBAL EXTERNAL<br/>HTTP(S) LOAD<br/>BALANCER</div>
    </div>`,
    360,
    405,
    75,
    78,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=2;html=1;align=center;verticalAlign=middle;'
  );

  // Decision Gate: Path-Based Routing?
  cell(
    'decision_path_routing',
    `<div style="font-size:6.5px;font-weight:800;color:#0F172A;text-align:center;line-height:1.1;">PATH-BASED<br/>ROUTING?<br/><span style="color:#0284C7;">YES/NO</span></div>`,
    325,
    530,
    58,
    44,
    'rhombus;fillColor=#FFFFFF;strokeColor=#64748B;strokeWidth=1.5;html=1;align=center;verticalAlign=middle;'
  );

  // Decision Gate: CDN Cache Hit?
  cell(
    'decision_cdn_cache',
    `<div style="font-size:6.5px;font-weight:800;color:#0F172A;text-align:center;line-height:1.1;">CDN CACHE<br/>HIT?<br/><span style="color:#0284C7;">YES/NO</span></div>`,
    395,
    530,
    58,
    44,
    'rhombus;fillColor=#FFFFFF;strokeColor=#64748B;strokeWidth=1.5;html=1;align=center;verticalAlign=middle;'
  );

  // Decision CON Node (Bottom)
  cell(
    'decision_con_bottom',
    `<div style="font-size:8px;font-weight:900;color:#1E3A8A;text-align:center;">CON</div>`,
    360,
    630,
    34,
    34,
    'rhombus;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=2;html=1;align=center;verticalAlign=middle;'
  );

  // =========================================================================
  // ZONE 2: LOAD BALANCING & COMPUTE (x=455..720, y=120..760, h=640)
  // =========================================================================
  cell(
    'zone_compute_frame',
    `<div style="font-weight:900;font-size:10px;color:#0369A1;text-align:center;padding-top:4px;letter-spacing:0.5px;">LOAD BALANCING &amp; COMPUTE</div>`,
    455,
    120,
    265,
    640,
    'rounded=1;fillColor=#CFE2F3;strokeColor=#7DD3FC;strokeWidth=1;html=1;align=center;verticalAlign=top;dashed=1;'
  );

  // Tier 1: Subnet A Primary Frame (y=150..480, h=330)
  cell(
    'subnet_a_frame',
    `<div style="font-weight:900;font-size:8.5px;color:#0369A1;text-align:left;padding:3px 6px;letter-spacing:0.5px;">REGIONAL SUBNET A (PRIMARY)</div>`,
    468,
    150,
    240,
    330,
    'rounded=1;fillColor=#EDF2F8;strokeColor=#7DD3FC;strokeWidth=1.5;html=1;align=left;verticalAlign=top;'
  );

  // User Auth (Firebase Auth / IAP Linked)
  cell(
    'user_auth_box',
    `<div style="display:flex;align-items:center;gap:6px;padding:3px 6px;">
      ${ICONS.firebaseAuth}
      <div>
        <div style="font-size:8px;font-weight:900;color:#0F172A;">USER AUTHENTICATION</div>
        <div style="font-size:6.5px;color:#0284C7;font-weight:600;">(Firebase Auth &amp; IAP Identity)</div>
      </div>
    </div>`,
    478,
    180,
    220,
    42,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#BAE6FD;strokeWidth=1.5;html=1;align=left;verticalAlign=middle;'
  );

  // Agentic Enterprise App (GKE Pods)
  const appTitle = isPharma ? 'GXP BATCH MANUFACTURING APP' : 'AGENTIC ENTERPRISE APP';
  cell(
    'agentic_app_box',
    `<div style="display:flex;align-items:center;gap:6px;padding:3px 6px;">
      ${ICONS.kubernetes}
      <div>
        <div style="font-size:8px;font-weight:900;color:#0F172A;">${appTitle}</div>
        <div style="font-size:6.5px;color:#0284C7;font-weight:600;">(GKE Pods / Autopilot)</div>
      </div>
    </div>`,
    478,
    255,
    220,
    44,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=2;html=1;align=left;verticalAlign=middle;'
  );

  // Backend API (GKE Pods)
  const apiTitle = isPharma ? 'EBR &amp; MES COMPLIANCE API' : 'BACKEND API';
  cell(
    'backend_api_box',
    `<div style="display:flex;align-items:center;gap:6px;padding:3px 6px;">
      ${ICONS.kubernetes}
      <div>
        <div style="font-size:8px;font-weight:900;color:#0F172A;">${apiTitle}</div>
        <div style="font-size:6.5px;color:#0284C7;font-weight:600;">(GKE Pods / Microservices)</div>
      </div>
    </div>`,
    478,
    330,
    220,
    44,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=2;html=1;align=left;verticalAlign=middle;'
  );

  // Message Queueing (Pub/Sub)
  const pubsubTitle = isStream ? 'CLOUD PUB/SUB STREAMING BUS' : 'MESSAGE QUEUEING';
  const pubsubSub = isStream ? '(High-Throughput Ingestion Bus)' : '(Google Cloud Pub/Sub)';
  cell(
    'pubsub_queue_box',
    `<div style="display:flex;align-items:center;gap:6px;padding:3px 6px;">
      ${ICONS.pubsub}
      <div>
        <div style="font-size:8px;font-weight:900;color:#0F172A;">${pubsubTitle}</div>
        <div style="font-size:6.5px;color:#0284C7;font-weight:600;">${pubsubSub}</div>
      </div>
    </div>`,
    478,
    405,
    220,
    44,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=2;html=1;align=left;verticalAlign=middle;'
  );

  // Tier 2: Subnet B Secondary Frame (y=500..755, h=255, Zero empty voids)
  const subnetBTitle = isGpu ? 'REGIONAL SUBNET B (GPU ACCELERATOR MIG)' : 'REGIONAL SUBNET B (SECONDARY)';
  cell(
    'subnet_b_frame',
    `<div style="font-weight:900;font-size:8.5px;color:#0369A1;text-align:left;padding:3px 6px;letter-spacing:0.5px;">${subnetBTitle}</div>`,
    468,
    500,
    240,
    255,
    'rounded=1;fillColor=#EDF2F8;strokeColor=#7DD3FC;strokeWidth=1.5;html=1;align=left;verticalAlign=top;'
  );

  // Auto-Scaling Pill
  const autoScalingText = isGpu ? 'GPU AUTO-SCALING (H100)' : 'AUTO-SCALING';
  cell(
    'auto_scaling_pill',
    `<div style="text-align:center;font-size:7.5px;font-weight:900;color:#0284C7;letter-spacing:0.5px;">${autoScalingText}</div>`,
    523,
    525,
    130,
    22,
    'rounded=1;fillColor=#E0F2FE;strokeColor=#BAE6FD;html=1;align=center;verticalAlign=middle;'
  );

  // Compute Engine MIG
  const migTitle = isGpu ? 'COMPUTE ENGINE<br/>GPU MIG CLUSTER<br/><span style="font-size:6px;color:#0284C7;">(NVIDIA H100)</span>' : 'COMPUTE ENGINE<br/>MANAGED INSTANCE<br/>GROUP (MIG)';
  cell(
    'gce_mig_box',
    `<div style="text-align:center;padding:4px;">
      ${ICONS.computeEngine}
      <div style="font-size:8px;font-weight:900;color:#0F172A;line-height:1.2;margin-top:2px;">${migTitle}</div>
    </div>`,
    480,
    570,
    102,
    95,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=2;html=1;align=center;verticalAlign=middle;'
  );

  // Regional Internal LB
  cell(
    'regional_ilb_box',
    `<div style="text-align:center;padding:4px;">
      ${ICONS.loadBalancer}
      <div style="font-size:8px;font-weight:900;color:#0F172A;line-height:1.2;margin-top:2px;">REGIONAL<br/>INTERNAL LOAD<br/>BALANCER</div>
    </div>`,
    596,
    570,
    102,
    95,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=2;html=1;align=center;verticalAlign=middle;'
  );

  // =========================================================================
  // ZONE 3: APPLICATION & DATA (x=735..1000, y=120..760, h=640)
  // =========================================================================
  cell(
    'zone_data_frame',
    `<div style="font-weight:900;font-size:10px;color:#9A3412;text-align:center;padding-top:4px;letter-spacing:0.5px;">APPLICATION &amp; DATA</div>`,
    735,
    120,
    265,
    640,
    'rounded=1;fillColor=#EFE6D5;strokeColor=#FDE68A;strokeWidth=1;html=1;align=center;verticalAlign=top;dashed=1;'
  );

  // Tier 1 Top Sub-Frame: Async Ingestion & Tasks (y=150..250, h=100)
  cell(
    'async_ingestion_frame',
    `<div style="font-weight:900;font-size:8px;color:#B45309;text-align:left;padding:2px 6px;letter-spacing:0.4px;">ASYNC INGESTION &amp; PERSISTENCE</div>`,
    745,
    150,
    245,
    100,
    'rounded=1;fillColor=#FDF6EC;strokeColor=#FCD34D;strokeWidth=1;html=1;align=left;verticalAlign=top;'
  );

  const asyncTaskText = isStream ? 'DATAFLOW<br/>STREAM PIPELINE' : 'PROCESS<br/>ASYNC TASKS';
  cell(
    'async_tasks_box',
    `<div style="display:flex;align-items:center;justify-content:center;gap:4px;padding:2px 4px;">
      ${ICONS.documentTask}
      <div style="font-size:7.5px;font-weight:900;color:#0F172A;line-height:1.1;">${asyncTaskText}</div>
    </div>`,
    755,
    185,
    105,
    45,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#F59E0B;strokeWidth=1.5;html=1;align=center;verticalAlign=middle;'
  );

  cell(
    'persist_data_box',
    `<div style="display:flex;align-items:center;justify-content:center;gap:4px;padding:2px 4px;">
      ${ICONS.persistData}
      <div style="font-size:7.5px;font-weight:900;color:#0F172A;line-height:1.1;">PERSIST<br/>DATA</div>
    </div>`,
    870,
    185,
    105,
    45,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#F59E0B;strokeWidth=1.5;html=1;align=center;verticalAlign=middle;'
  );

  // Tier 1 Middle Sub-Frame: Relational Data (y=265..480, h=215)
  const relTitle = isSpanner ? 'RELATIONAL DATA (SPANNER MULTI-REGION)' : 'RELATIONAL DATA';
  cell(
    'relational_data_frame',
    `<div style="font-weight:900;font-size:8.5px;color:#B45309;text-align:center;padding:3px;letter-spacing:0.5px;">${relTitle}</div>`,
    745,
    265,
    245,
    215,
    'rounded=1;fillColor=#FCE5CD;strokeColor=#FCD34D;strokeWidth=1.5;html=1;align=center;verticalAlign=top;'
  );

  const dbTitle = isSpanner ? 'CLOUD SPANNER' : 'CLOUD SQL';
  const dbSub = isSpanner ? '(TrueTime Active-Active)' : isCmek ? '(CMEK Encrypted OLTP)' : '(Primary OLTP)';
  cell(
    'cloud_sql_primary',
    `<div style="text-align:center;padding:3px;">
      ${ICONS.cloudSql}
      <div style="font-size:8px;font-weight:900;color:#0F172A;line-height:1.2;margin-top:2px;">${dbTitle}</div>
      <div style="font-size:6.5px;color:#D97706;font-weight:600;">${dbSub}</div>
    </div>`,
    755,
    325,
    100,
    75,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=2;html=1;align=center;verticalAlign=middle;'
  );

  const bqSub = isCmek ? '(CMEK Encrypted DW)' : '(Read Replica / DW)';
  cell(
    'bigquery_replica',
    `<div style="text-align:center;padding:3px;">
      ${ICONS.bigquery}
      <div style="font-size:8px;font-weight:900;color:#0F172A;line-height:1.2;margin-top:2px;">BIGQUERY</div>
      <div style="font-size:6.5px;color:#D97706;font-weight:600;">${bqSub}</div>
    </div>`,
    870,
    325,
    100,
    75,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=2;html=1;align=center;verticalAlign=middle;'
  );

  // Tier 2: Unstructured Data Sub-Frame (y=500..755, h=255, Zero empty voids)
  cell(
    'unstructured_data_frame',
    `<div style="font-weight:900;font-size:8.5px;color:#B45309;text-align:center;padding:3px;letter-spacing:0.5px;">UNSTRUCTURED DATA</div>`,
    745,
    500,
    245,
    255,
    'rounded=1;fillColor=#FCE5CD;strokeColor=#FCD34D;strokeWidth=1.5;html=1;align=center;verticalAlign=top;'
  );

  const gcsSub = isCmek ? '(CMEK Dual-Region Bucket)' : '(GCS Multi-Region)';
  cell(
    'gcs_storage_box',
    `<div style="text-align:center;padding:4px;">
      ${ICONS.cloudStorage}
      <div style="font-size:8px;font-weight:900;color:#0F172A;line-height:1.2;margin-top:2px;">CLOUD STORAGE</div>
      <div style="font-size:6.5px;color:#D97706;font-weight:600;">${gcsSub}</div>
    </div>`,
    755,
    570,
    102,
    95,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=2;html=1;align=center;verticalAlign=middle;'
  );

  cell(
    'gcs_lifecycle_box',
    `<div style="text-align:center;padding:4px;">
      ${ICONS.lifecycle}
      <div style="font-size:8px;font-weight:900;color:#0F172A;line-height:1.2;margin-top:2px;">DATA LIFE CYCLE<br/>MANAGEMENT</div>
      <div style="font-size:6.5px;color:#64748B;font-weight:600;">(e.g., ARCHIVE OLD FILES)</div>
    </div>`,
    870,
    570,
    102,
    95,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=2;html=1;align=center;verticalAlign=middle;'
  );

  // =========================================================================
  // ZONE 4: AGENTIC AI & MODEL MANAGEMENT (x=1015..1280, y=120..760, h=640)
  // =========================================================================
  const aiZoneTitle = isRag ? 'AGENTIC AI &amp; VERTEX RAG' : 'AGENTIC AI SERVICES';
  cell(
    'zone_ai_frame',
    `<div style="display:flex;align-items:center;justify-content:center;gap:6px;padding-top:4px;">
      ${ICONS.deepmindGemini}
      <div style="text-align:left;">
        <div style="font-weight:900;font-size:9.5px;color:#15803D;letter-spacing:0.5px;">${aiZoneTitle}</div>
        <div style="font-size:7.5px;font-weight:700;color:#16A34A;">(Vertex AI &amp; DeepMind)</div>
      </div>
    </div>`,
    1015,
    120,
    265,
    360,
    'rounded=1;fillColor=#D9EAD3;strokeColor=#86EFAC;strokeWidth=1;html=1;align=center;verticalAlign=top;dashed=1;'
  );

  // Agent Designer
  cell(
    'ai_agent_designer',
    `<div style="text-align:center;padding:3px;">
      ${ICONS.agentDesigner}
      <div style="font-size:7.5px;font-weight:900;color:#0F172A;margin-top:2px;">AGENT DESIGNER</div>
      <div style="font-size:6.5px;color:#15803D;font-weight:600;">(DeepMind Studio)</div>
    </div>`,
    1028,
    185,
    72,
    60,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;html=1;align=center;verticalAlign=middle;'
  );

  // Gemini Notebook / ScaNN Vector Search
  const notebookTitle = isRag ? 'VERTEX VECTOR<br/>SEARCH' : 'GEMINI<br/>NOTEBOOK';
  const notebookSub = isRag ? '(ScaNN Knowledge)' : '(Vertex AI Workbench)';
  cell(
    'ai_gemini_notebook',
    `<div style="text-align:center;padding:3px;">
      ${ICONS.notebook}
      <div style="font-size:7.5px;font-weight:900;color:#0F172A;margin-top:2px;">${notebookTitle}</div>
      <div style="font-size:6px;color:#16A34A;font-weight:600;">${notebookSub}</div>
    </div>`,
    1112,
    185,
    72,
    60,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;html=1;align=center;verticalAlign=middle;'
  );

  // ADK 2.0
  cell(
    'ai_adk_box',
    `<div style="text-align:center;padding:3px;">
      ${ICONS.adkKit}
      <div style="font-size:7.5px;font-weight:900;color:#0F172A;margin-top:2px;">ADK 2.0</div>
      <div style="font-size:6.5px;color:#16A34A;font-weight:600;">(DeepMind Agent Kit)</div>
    </div>`,
    1195,
    185,
    72,
    60,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;html=1;align=center;verticalAlign=middle;'
  );

  // Gemini Agent Platform Hub
  const platformTitle = 'GEMINI AGENT PLATFORM';
  const platformSub = isRag ? '(Gemini 2.5 Pro + Vertex RAG Grounding)' : '(Gemini 2.5 Pro / Flash Reasoning)';
  cell(
    'ai_agent_platform_hub',
    `<div style="display:flex;align-items:center;justify-content:center;gap:8px;padding:4px;">
      ${ICONS.deepmindGemini}
      <div style="text-align:left;">
        <div style="font-size:9.5px;font-weight:900;color:#15803D;line-height:1.2;">${platformTitle}</div>
        <div style="font-size:7px;color:#16A34A;font-weight:700;">${platformSub}</div>
      </div>
    </div>`,
    1028,
    280,
    240,
    65,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#15803D;strokeWidth=2.5;html=1;align=center;verticalAlign=middle;'
  );

  // Tier 2: Model Management & Serving (y=500..755, perfectly aligned with Subnet B and Unstructured Data!)
  cell(
    'model_mgmt_frame',
    `<div style="display:flex;align-items:center;justify-content:center;gap:6px;padding-top:4px;">
      ${ICONS.gcpLogo}
      <div style="text-align:left;">
        <div style="font-weight:900;font-size:9px;color:#B45309;">MODEL MANAGEMENT &amp; SERVING</div>
        <div style="font-size:7px;font-weight:700;color:#D97706;">(Vertex AI &amp; DeepMind)</div>
      </div>
    </div>`,
    1015,
    500,
    265,
    255,
    'rounded=1;fillColor=#FCE5CD;strokeColor=#FDE68A;strokeWidth=1.5;html=1;align=center;verticalAlign=top;'
  );

  // Train Model
  cell(
    'train_model_box',
    `<div style="text-align:center;padding:3px;">
      ${ICONS.trainModel}
      <div style="font-size:7.5px;font-weight:900;color:#0F172A;margin-top:2px;">TRAIN MODEL</div>
      <div style="font-size:6.5px;color:#D97706;font-weight:600;">(Vertex AI Fine-Tuning)</div>
    </div>`,
    1035,
    555,
    105,
    58,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=2;html=1;align=center;verticalAlign=middle;'
  );

  // Deploy Model
  cell(
    'deploy_model_box',
    `<div style="text-align:center;padding:3px;">
      ${ICONS.deployModel}
      <div style="font-size:7.5px;font-weight:900;color:#0F172A;margin-top:2px;">DEPLOY MODEL</div>
      <div style="font-size:6.5px;color:#D97706;font-weight:600;">(Model Garden Endpoints)</div>
    </div>`,
    1155,
    555,
    105,
    58,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=2;html=1;align=center;verticalAlign=middle;'
  );

  // Online Prediction
  cell(
    'online_prediction_box',
    `<div style="text-align:center;padding:3px;">
      ${ICONS.predictionZap}
      <div style="font-size:8px;font-weight:900;color:#0F172A;margin-top:2px;">ONLINE PREDICTION</div>
      <div style="font-size:6.5px;color:#D97706;font-weight:600;">(Low-Latency Real-Time Serving)</div>
    </div>`,
    1075,
    645,
    145,
    60,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=2;html=1;align=center;verticalAlign=middle;'
  );

  // =========================================================================
  // 3. CROSS-CUTTING ENTERPRISE FOUNDATION BAR (x=165..1280, y=775..845)
  // =========================================================================
  cell(
    'cross_cutting_frame',
    `<div style="font-weight:900;font-size:9.5px;color:#1E3A8A;text-align:left;padding:3px 10px;letter-spacing:0.6px;">🛡️ CROSS-CUTTING ENTERPRISE GOVERNANCE, OBSERVABILITY &amp; SECURITY FOUNDATION</div>`,
    165,
    775,
    1115,
    75,
    'rounded=1;fillColor=#EDF4FC;strokeColor=#93C5FD;strokeWidth=1.5;html=1;align=left;verticalAlign=top;'
  );

  // Cloud Monitoring
  cell(
    'cloud_monitoring_box',
    `<div style="display:flex;align-items:center;gap:6px;padding:3px 8px;">
      ${ICONS.monitoringPulse}
      <div>
        <div style="font-size:8px;font-weight:900;color:#0F172A;">CLOUD MONITORING &amp; LOGGING</div>
        <div style="font-size:6.5px;color:#0284C7;font-weight:600;">(Cloud Trace, Metric Alerts, SLO Dashboards)</div>
      </div>
    </div>`,
    180,
    800,
    250,
    40,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#BAE6FD;strokeWidth=1.5;html=1;align=left;verticalAlign=middle;'
  );

  // Cloud KMS & IAM
  const iamTitle = isCmek ? 'CLOUD KMS &amp; IAM (CMEK &amp; VPC-SC)' : 'CLOUD IAM &amp; ACCESS CONTROL';
  const iamSub = isCmek ? '(Customer-Managed Keys &amp; Least Privilege RBAC)' : '(Least Privilege RBAC &amp; Workload Identity)';
  cell(
    'cloud_iam_box',
    `<div style="display:flex;align-items:center;gap:6px;padding:3px 8px;">
      ${ICONS.iamShield}
      <div>
        <div style="font-size:8px;font-weight:900;color:#0F172A;">${iamTitle}</div>
        <div style="font-size:6.5px;color:#0284C7;font-weight:600;">${iamSub}</div>
      </div>
    </div>`,
    450,
    800,
    285,
    40,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#BAE6FD;strokeWidth=1.5;html=1;align=left;verticalAlign=middle;'
  );

  // VPC Service Controls
  cell(
    'cloud_vpc_sc_box',
    `<div style="display:flex;align-items:center;gap:6px;padding:3px 8px;">
      ${ICONS.cloudArmor}
      <div>
        <div style="font-size:8px;font-weight:900;color:#0F172A;">VPC SERVICE CONTROLS</div>
        <div style="font-size:6.5px;color:#0F766E;font-weight:600;">(Data Exfiltration Mitigation &amp; Private Perimeters)</div>
      </div>
    </div>`,
    755,
    800,
    265,
    40,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#99F6E4;strokeWidth=1.5;html=1;align=left;verticalAlign=middle;'
  );

  // AI Governance & Model Telemetry
  cell(
    'cloud_ai_telemetry_box',
    `<div style="display:flex;align-items:center;gap:6px;padding:3px 8px;">
      ${ICONS.deepmindGemini}
      <div>
        <div style="font-size:8px;font-weight:900;color:#0F172A;">AI GOVERNANCE &amp; EVALS</div>
        <div style="font-size:6.5px;color:#15803D;font-weight:600;">(Vertex AI Model Evaluation &amp; Safety Filters)</div>
      </div>
    </div>`,
    1040,
    800,
    225,
    40,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.5;html=1;align=left;verticalAlign=middle;'
  );

  // =========================================================================
  // 4. CONNECTING FLOW ARROWS & PILL LABELS (100% Collision-Free Routing)
  // =========================================================================
  // 1. Users & Public Internet -> Ingress
  edge('e1', '❶ INGRESS', 'public_internet', 'cloud_armor', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#2563EB;strokeWidth=2.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=3;fontSize=8;fontStyle=1;');
  edge('e1_vpn', '', 'users_icon', 'ext_vpn_gateway', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#64748B;strokeWidth=1.5;dashed=1;');
  edge('e1_vpn_iap', '', 'ext_vpn_gateway', 'iap_proxy', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#2563EB;strokeWidth=1.5;');

  // Cloud Armor -> IAP -> GCLB
  edge('e2', '❷', 'cloud_armor', 'iap_proxy', 'edgeStyle=none;strokeColor=#2563EB;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=2;fontSize=8;fontStyle=1;');
  edge('e3', '', 'iap_proxy', 'gclb_load_balancer', 'edgeStyle=none;strokeColor=#2563EB;strokeWidth=2;');

  // IAP -> User Auth (Direct Connected Ingress Authentication)
  edge('e_iap_auth', '❸ AUTH', 'iap_proxy', 'user_auth_box', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#2563EB;strokeWidth=1.5;dashed=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=2;fontSize=7.5;fontStyle=1;', [{ x: 310, y: 200 }]);
  edge('e_auth_app', '', 'user_auth_box', 'agentic_app_box', 'edgeStyle=none;strokeColor=#0284C7;strokeWidth=1.5;');

  // GCLB -> Decision CON Top (Direct straight vertical link with zero IAP overlap)
  edge('e4', 'YES', 'gclb_load_balancer', 'decision_con_top', 'edgeStyle=none;strokeColor=#2563EB;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=2;fontSize=8;fontStyle=1;');

  // Decision CON Top -> Subnet A Primary App
  edge('e5', '❹ ROUTE', 'decision_con_top', 'agentic_app_box', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#0284C7;strokeWidth=2.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=2;fontSize=8;fontStyle=1;', [{ x: 440, y: 252 }]);

  // GCLB -> Path Based Routing & CDN Cache Hit
  edge('e6', 'NO', 'gclb_load_balancer', 'decision_path_routing', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#64748B;strokeWidth=1.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=2;fontSize=7.5;fontStyle=1;');
  edge('e7', 'NO', 'gclb_load_balancer', 'decision_cdn_cache', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#64748B;strokeWidth=1.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=2;fontSize=7.5;fontStyle=1;');
  edge('e8', '❼ YES', 'decision_path_routing', 'decision_con_bottom', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#0284C7;strokeWidth=1.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#93C5FD;padding=2;fontSize=7.5;fontStyle=1;');
  edge('e9', 'YES', 'decision_cdn_cache', 'decision_con_bottom', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#0284C7;strokeWidth=1.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#93C5FD;padding=2;fontSize=7.5;fontStyle=1;');

  // Decision CON Bottom -> Subnet B Compute MIG
  edge('e10', '⓲', 'decision_con_bottom', 'gce_mig_box', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#0284C7;strokeWidth=2.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=2;fontSize=8;fontStyle=1;', [{ x: 440, y: 647 }, { x: 440, y: 617 }]);

  // Subnet A: App -> Backend API -> Pub/Sub
  edge('e11', '⓿', 'agentic_app_box', 'backend_api_box', 'edgeStyle=none;strokeColor=#0284C7;strokeWidth=2;');
  edge('e12', '', 'backend_api_box', 'pubsub_queue_box', 'edgeStyle=none;strokeColor=#0284C7;strokeWidth=2;');

  // Subnet A App -> Async Tasks / Ingestion
  edge('e13', '', 'agentic_app_box', 'async_tasks_box', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#059669;strokeWidth=2;');
  edge('e14', '', 'async_tasks_box', 'persist_data_box', 'edgeStyle=none;strokeColor=#059669;strokeWidth=2;');
  edge('e15', '❺ STORE &amp; SERVE', 'persist_data_box', 'cloud_sql_primary', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#059669;strokeWidth=2.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=2;fontSize=8;fontStyle=1;', [{ x: 805, y: 207 }]);

  // Cloud SQL / Spanner -> BigQuery Replication
  const repLabel = isSpanner ? 'TRUETIME SYNC' : 'REPLICATION';
  edge('e16', repLabel, 'cloud_sql_primary', 'bigquery_replica', 'edgeStyle=none;strokeColor=#D97706;strokeWidth=1.5;dashed=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#FCD34D;padding=2;fontSize=7.5;fontStyle=1;');

  // Persist Data -> Cloud Storage & Lifecycle
  edge('e17', '', 'cloud_sql_primary', 'gcs_storage_box', 'edgeStyle=none;strokeColor=#059669;strokeWidth=2;');
  edge('e18', '', 'gcs_storage_box', 'gcs_lifecycle_box', 'edgeStyle=none;strokeColor=#D97706;strokeWidth=1.5;');

  // Subnet B MIG -> Internal LB -> Cloud Storage
  edge('e19', '', 'gce_mig_box', 'regional_ilb_box', 'edgeStyle=none;strokeColor=#0284C7;strokeWidth=1.5;');
  edge('e20', '', 'regional_ilb_box', 'gcs_storage_box', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#059669;strokeWidth=2;');

  // Relational Data & Backend -> Gemini Agent Platform Hub (DeepMind Reasoning via clear open corridor)
  edge('e21', '', 'agentic_app_box', 'ai_agent_platform_hub', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#7C3AED;strokeWidth=2.5;', [{ x: 710, y: 277 }, { x: 1010, y: 277 }]);
  edge('e22', '', 'bigquery_replica', 'ai_agent_platform_hub', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#7C3AED;strokeWidth=2.5;');
  edge('e23', '', 'ai_agent_designer', 'ai_agent_platform_hub', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#16A34A;strokeWidth=1.5;');
  edge('e24', '', 'ai_gemini_notebook', 'ai_agent_platform_hub', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#16A34A;strokeWidth=1.5;');
  edge('e25', '', 'ai_adk_box', 'ai_agent_platform_hub', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#16A34A;strokeWidth=1.5;');

  // Agent Platform -> Model Management & Training Loop
  edge('e26', '', 'ai_agent_platform_hub', 'train_model_box', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#D97706;strokeWidth=2;');
  edge('e27', '', 'train_model_box', 'deploy_model_box', 'edgeStyle=none;strokeColor=#D97706;strokeWidth=1.5;');
  edge('e28', '', 'deploy_model_box', 'online_prediction_box', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#D97706;strokeWidth=1.5;');
  edge('e29', 'FEEDBACK LOOP', 'online_prediction_box', 'ai_agent_platform_hub', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#15803D;strokeWidth=2;dashed=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#86EFAC;padding=2;fontSize=7.5;fontStyle=1;', [{ x: 1240, y: 675 }, { x: 1240, y: 312 }]);

  return `<mxfile host="embed.diagrams.net">
  <diagram id="gcp_functional_flowchart" name="${E(projectName)} - ${E(useCaseName)}">
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

export const generateGcpFunctionalFlowchartXml = generateGCPFunctionalFlowchart;
