/**
 * GCP Cloud Architecture: Functional Flowchart Diagram
 * 100% Exact Ground-Truth Master Blueprint Replication + Latest DeepMind Tech
 *
 * Implements exact visual styling, layered container fills, decision diamonds,
 * cross-cutting monitoring/IAM, and Gemini 2.5 Agentic AI Platform from Google DeepMind.
 */

export interface GCPFlowchartProps {
  projectName?: string;
  useCaseName?: string;
  projectTitle?: string;
  theme?: 'light' | 'dark';
}

function escapeXml(unsafe: string): string {
  return (unsafe || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function generateGCPFunctionalFlowchart(props: GCPFlowchartProps = {}): string {
  const {
    projectName = 'Enterprise GCP Architecture',
    useCaseName = 'Agentic AI Functional Flowchart',
    projectTitle,
    theme = 'light',
  } = props;

  const isDark = theme === 'dark';
  const bg = isDark ? '#0F172A' : '#FFFFFF';
  const E = escapeXml;

  // Modern Vector SVG Icons (Zero external URL dependencies / 100% offline)
  const ICONS = {
    gcpLogo: `<svg width="20" height="16" viewBox="0 0 24 20" fill="none"><path d="M19.35 8.04C18.67 4.59 15.64 2 12 2 9.11 2 6.6 3.64 5.35 6.04 2.34 6.36 0 8.91 0 12c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" fill="#4285F4"/><path d="M19 18H6c-3.31 0-6-2.69-6-6 0-3.09 2.34-5.64 5.35-5.96C6.6 3.64 9.11 2 12 2c3.64 0 6.67 2.59 7.35 6.04C21.95 8.22 24 10.36 24 13c0 2.76-2.24 5-5 5z" fill="#4285F4" opacity="0.9"/></svg>`,
    users: `<svg width="20" height="20" viewBox="0 0 24 24" fill="#3B82F6"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>`,
    vpn: `<svg width="22" height="22" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/></svg>`,
    globe: `<svg width="22" height="22" viewBox="0 0 24 24" fill="#2563EB"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>`,
    cloudArmor: `<svg width="20" height="20" viewBox="0 0 24 24" fill="#2563EB"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>`,
    iapLock: `<svg width="20" height="20" viewBox="0 0 24 24" fill="#2563EB"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>`,
    gclb: `<svg width="22" height="22" viewBox="0 0 24 24" fill="#2563EB"><path d="M4 2v6h3v2H4v6h3v2H2V2h2zm16 0v16h-2v-2h3v-6h-3v-2h3V2h-2zM9 7h6v2H9V7zm0 8h6v2H9v-2z"/></svg>`,
    firebaseAuth: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#F59E0B"><path d="M4.65 18.23l1.83-11.45c.07-.44.57-.65.92-.38l3.1 2.45L4.65 18.23zm6.3-15.05c-.32-.47-.98-.44-1.24.05L7.2 8.35l3.75-5.17zm8.4 15.05L13.72 6.77c-.24-.45-.85-.5-1.15-.09l-3.32 4.54 10.1 7.01z"/></svg>`,
    kubernetes: `<svg width="20" height="20" viewBox="0 0 24 24" fill="#0284C7"><path d="M12 2L2 7.5v9L12 22l10-5.5v-9L12 2zm0 2.3l7.5 4.1-2.8 1.5-4.7-2.6v-3zm-1 3v3L6.3 9.4 9.1 7.9l1.9-.6zm-6.5 3.6l4.7 2.6v5.2L4.5 16v-5.1zm6.5 7.8v-3l4.7-2.6 2.8 1.5-7.5 4.1zm1-4.7V11l4.7-2.6 2.8 1.5-7.5 4.1z"/></svg>`,
    pubsub: `<svg width="20" height="20" viewBox="0 0 24 24" fill="#0284C7"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l7.59-7.59L21 8l-9 9z"/></svg>`,
    computeEngine: `<svg width="22" height="22" viewBox="0 0 24 24" fill="#0284C7"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1z"/></svg>`,
    loadBalancer: `<svg width="20" height="20" viewBox="0 0 24 24" fill="#0284C7"><path d="M4 11h6V5H4v6zm10 8h6v-6h-6v6zm-10 0h6v-6H4v6zm10-14v6h6V5h-6z"/></svg>`,
    cloudSql: `<svg width="22" height="22" viewBox="0 0 24 24" fill="#D97706"><path d="M12 2C6.48 2 2 3.79 2 6v12c0 2.21 4.48 4 10 4s10-1.79 10-4V6c0-2.21-4.48-4-10-4zm0 2c4.42 0 8 1.34 8 2s-3.58 2-8 2-8-1.34-8-2 3.58-2 8-2zm0 16c-4.42 0-8-1.34-8-2v-2.23c1.88 1.35 4.8 2.23 8 2.23s6.12-.88 8-2.23V18c0 .66-3.58 2-8 2z"/></svg>`,
    bigquery: `<svg width="22" height="22" viewBox="0 0 24 24" fill="#D97706"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>`,
    cloudStorage: `<svg width="22" height="22" viewBox="0 0 24 24" fill="#D97706"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3z"/></svg>`,
    lifecycle: `<svg width="20" height="20" viewBox="0 0 24 24" fill="#D97706"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg>`,
    deepmindGemini: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="url(#gemini_grad)"/><defs><linearGradient id="gemini_grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse"><stop stop-color="#1A73E8"/><stop offset="0.5" stop-color="#9333EA"/><stop offset="1" stop-color="#EA4335"/></linearGradient></defs></svg>`,
    agentDesigner: `<svg width="20" height="20" viewBox="0 0 24 24" fill="#16A34A"><path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 20.4c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l2.79-.62C10.09 21.64 11.02 22 12 22c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-.83 0-1.62-.22-2.31-.61l-.38-.22-1.8.4.4-1.8-.22-.38C7.22 15.62 7 14.83 7 14c0-2.76 2.24-5 5-5s5 2.24 5 5-2.24 5-5 5z"/></svg>`,
    notebook: `<svg width="20" height="20" viewBox="0 0 24 24" fill="#16A34A"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>`,
    adkKit: `<svg width="20" height="20" viewBox="0 0 24 24" fill="#16A34A"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg>`,
    trainModel: `<svg width="20" height="20" viewBox="0 0 24 24" fill="#D97706"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>`,
    deployModel: `<svg width="20" height="20" viewBox="0 0 24 24" fill="#D97706"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/></svg>`,
    predictionZap: `<svg width="20" height="20" viewBox="0 0 24 24" fill="#D97706"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>`,
    monitoringPulse: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#0284C7"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10l-2.5-4-3 6-2-3-2.5 3H5v-2h3l2-3 2 3 3.5-5 2.5 4h3v2h-4z"/></svg>`,
    iamShield: `<svg width="20" height="20" viewBox="0 0 24 24" fill="#0284C7"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>`,
    documentTask: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#D97706"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>`,
    persistData: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#D97706"><path d="M12 2C6.48 2 2 3.79 2 6v12c0 2.21 4.48 4 10 4s10-1.79 10-4V6c0-2.21-4.48-4-10-4zm0 4c-3.31 0-6-1.34-6-2s2.69-2 6-2 6 1.34 6 2-2.69 2-6 2z"/></svg>`,
  };

  const c: string[] = [];

  const cell = (
    id: string,
    value: string,
    x: number,
    y: number,
    w: number,
    h: number,
    style: string,
    parent = '1'
  ) => {
    c.push(
      `<mxCell id="${id}" value="${E(value)}" style="${style}" vertex="1" parent="${parent}"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`
    );
  };

  const edge = (
    id: string,
    value: string,
    source: string,
    target: string,
    style: string,
    points?: { x: number; y: number }[]
  ) => {
    let ptsXml = '';
    if (points && points.length > 0) {
      ptsXml = `<mxGeometry relative="1" as="geometry"><Array as="points">${points
        .map((p) => `<mxPoint x="${p.x}" y="${p.y}"/>`)
        .join('')}</Array></mxGeometry>`;
    } else {
      ptsXml = `<mxGeometry relative="1" as="geometry"/>`;
    }
    c.push(
      `<mxCell id="${id}" value="${E(value)}" style="${style}" edge="1" parent="1" source="${source}" target="${target}">${ptsXml}</mxCell>`
    );
  };

  // Main Master Title
  cell(
    'title_header',
    `<div style="font-size:22px;font-weight:900;color:#1E293B;letter-spacing:-0.5px;text-align:center;">GCP Cloud Architecture: Functional Flowchart Diagram</div>`,
    200,
    15,
    1200,
    35,
    'text;html=1;align=center;verticalAlign=middle;'
  );

  // =========================================================================
  // OUTER BOUNDARIES: GLOBAL REGION & GOOGLE CLOUD PROJECT
  // =========================================================================
  // 1. GLOBAL REGION Container (Thick slate border with layered light grey background)
  cell(
    'global_region_frame',
    `<div style="font-weight:900;font-size:10.5px;color:#475569;text-align:left;padding:6px 12px;letter-spacing:0.8px;">GLOBAL REGION</div>`,
    150,
    60,
    1430,
    880,
    'rounded=0;fillColor=#E5E7EB;strokeColor=#9CA3AF;strokeWidth=2;html=1;align=left;verticalAlign=top;'
  );

  // 2. GOOGLE CLOUD PROJECT Container (Distinct blue pastel fill)
  cell(
    'gcp_project_frame',
    `<div style="display:flex;align-items:center;gap:8px;padding:6px 12px;">
      ${ICONS.gcpLogo}
      <div style="font-weight:900;font-size:11px;color:#1E3A8A;letter-spacing:0.8px;">GOOGLE CLOUD PROJECT</div>
      <div style="font-size:9px;color:#64748B;font-weight:700;margin-left:12px;padding:2px 8px;background:#FFFFFF;border-radius:4px;border:1px solid #CBD5E1;">GLOBAL REGION</div>
    </div>`,
    165,
    95,
    1400,
    830,
    'rounded=1;fillColor=#DBEAFE;strokeColor=#93C5FD;strokeWidth=1.5;html=1;align=left;verticalAlign=top;'
  );

  // =========================================================================
  // LEFT EXTERNAL CLIENTS & INTERNET (x=10..140)
  // =========================================================================
  // Users Icon & Label
  cell(
    'users_icon',
    `<div style="text-align:center;">
      ${ICONS.users}
      <div style="font-size:8.5px;font-weight:900;color:#1E293B;margin-top:2px;letter-spacing:0.5px;">USERS</div>
    </div>`,
    20,
    260,
    55,
    55,
    'text;html=1;align=center;verticalAlign=middle;'
  );

  // External VPN Gateway
  cell(
    'ext_vpn_gateway',
    `<div style="text-align:center;padding:4px;">
      <div style="font-size:16px;">🌐</div>
      <div style="font-size:7.5px;font-weight:900;color:#FFFFFF;line-height:1.1;margin-top:2px;">EXTERNAL<br/>VPN GATEWAY</div>
    </div>`,
    80,
    260,
    60,
    55,
    'rounded=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1.5;html=1;align=center;verticalAlign=middle;'
  );

  // Public Internet Globe
  cell(
    'public_internet',
    `<div style="text-align:center;">
      ${ICONS.globe}
      <div style="font-size:8px;font-weight:900;color:#1E293B;margin-top:2px;line-height:1.1;">PUBLIC<br/>INTERNET</div>
    </div>`,
    25,
    440,
    55,
    55,
    'text;html=1;align=center;verticalAlign=middle;'
  );

  // Left Legend Box (Ground-Truth Replication)
  cell(
    'legend_box',
    `<div style="font-size:8px;line-height:1.4;color:#1E293B;padding:4px;">
      <div style="font-weight:900;font-size:9px;color:#0F172A;border-bottom:1px solid #CBD5E1;padding-bottom:3px;margin-bottom:4px;letter-spacing:0.5px;">LEGEND</div>
      <div style="display:flex;align-items:center;gap:4px;margin-bottom:2px;"><span style="color:#2563EB;font-weight:900;">❶</span> 1. External Request</div>
      <div style="display:flex;align-items:center;gap:4px;margin-bottom:2px;"><span style="color:#2563EB;font-weight:900;">❷</span> 2. WAF &amp; Perimeter</div>
      <div style="display:flex;align-items:center;gap:4px;margin-bottom:2px;"><span style="color:#2563EB;font-weight:900;">❸</span> 3. IAP Auth</div>
      <div style="display:flex;align-items:center;gap:4px;margin-bottom:2px;"><span style="color:#0284C7;font-weight:900;">❹</span> 4. Subnet Routing</div>
      <div style="display:flex;align-items:center;gap:4px;margin-bottom:2px;"><span style="color:#059669;font-weight:900;">❺</span> 5. Persist &amp; Query</div>
      <div style="display:flex;align-items:center;gap:4px;margin-bottom:2px;"><span style="color:#15803D;font-weight:900;">❻</span> 6. DeepMind Vertex AI</div>
      <div style="display:flex;align-items:center;gap:4px;"><span style="color:#D97706;font-weight:900;">❼</span> 7. Auto-Scale MIG</div>
    </div>`,
    10,
    570,
    135,
    210,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.5;html=1;align=left;verticalAlign=top;'
  );

  // =========================================================================
  // ZONE 1: INGRESS & SECURITY (x=185..505) - Soft Sage/Teal Fill
  // =========================================================================
  cell(
    'zone_ingress_frame',
    `<div style="font-weight:900;font-size:10.5px;color:#0F766E;text-align:center;padding-top:4px;letter-spacing:0.5px;">INGRESS &amp; SECURITY</div>`,
    185,
    130,
    320,
    780,
    'rounded=1;fillColor=#E2ECE9;strokeColor=#99F6E4;strokeWidth=1;html=1;align=center;verticalAlign=top;dashed=1;'
  );

  // Decision CON Node (Top)
  cell(
    'decision_con_top',
    `<div style="font-size:8px;font-weight:900;color:#1E3A8A;text-align:center;">CON</div>`,
    380,
    240,
    36,
    36,
    'rhombus;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=2;html=1;align=center;verticalAlign=middle;'
  );

  // Cloud Armor (WAF/DDoS Protection)
  cell(
    'cloud_armor',
    `<div style="text-align:center;padding:4px;">
      ${ICONS.cloudArmor}
      <div style="font-size:8px;font-weight:900;color:#0F172A;line-height:1.2;margin-top:2px;">CLOUD ARMOR</div>
      <div style="font-size:6.5px;color:#64748B;font-weight:600;">(WAF / DDoS protection)</div>
    </div>`,
    205,
    440,
    85,
    65,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=2;html=1;align=center;verticalAlign=middle;'
  );

  // Identity-Aware Proxy (IAP)
  cell(
    'iap_proxy',
    `<div style="text-align:center;padding:4px;">
      ${ICONS.iapLock}
      <div style="font-size:8px;font-weight:900;color:#0F172A;line-height:1.2;margin-top:2px;">IDENTITY-AWARE<br/>PROXY (IAP)</div>
    </div>`,
    305,
    440,
    85,
    65,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=2;html=1;align=center;verticalAlign=middle;'
  );

  // Global External HTTP(S) Load Balancer
  cell(
    'gclb_load_balancer',
    `<div style="text-align:center;padding:4px;">
      ${ICONS.gclb}
      <div style="font-size:8px;font-weight:900;color:#0F172A;line-height:1.2;margin-top:2px;">GLOBAL EXTERNAL<br/>HTTP(S) LOAD<br/>BALANCER</div>
    </div>`,
    405,
    430,
    95,
    80,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=2;html=1;align=center;verticalAlign=middle;'
  );

  // Decision Gate: Path-Based Routing?
  cell(
    'decision_path_routing',
    `<div style="font-size:7px;font-weight:800;color:#0F172A;text-align:center;line-height:1.1;">PATH-BASED<br/>ROUTING?<br/><span style="color:#0284C7;">YES/NO</span></div>`,
    350,
    570,
    65,
    50,
    'rhombus;fillColor=#FFFFFF;strokeColor=#64748B;strokeWidth=1.5;html=1;align=center;verticalAlign=middle;'
  );

  // Decision Gate: CDN Cache Hit?
  cell(
    'decision_cdn_cache',
    `<div style="font-size:7px;font-weight:800;color:#0F172A;text-align:center;line-height:1.1;">CDN CACHE<br/>HIT?<br/><span style="color:#0284C7;">YES/NO</span></div>`,
    435,
    570,
    65,
    50,
    'rhombus;fillColor=#FFFFFF;strokeColor=#64748B;strokeWidth=1.5;html=1;align=center;verticalAlign=middle;'
  );

  // Decision CON Node (Bottom)
  cell(
    'decision_con_bottom',
    `<div style="font-size:8px;font-weight:900;color:#1E3A8A;text-align:center;">CON</div>`,
    380,
    695,
    36,
    36,
    'rhombus;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=2;html=1;align=center;verticalAlign=middle;'
  );

  // Cross-Cutting Enablers in Ingress (Cloud Monitoring & Cloud IAM)
  cell(
    'cloud_monitoring_box',
    `<div style="display:flex;align-items:center;gap:6px;padding:3px 6px;">
      ${ICONS.monitoringPulse}
      <div>
        <div style="font-size:8px;font-weight:900;color:#0F172A;">CLOUD MONITORING</div>
        <div style="font-size:6.5px;color:#0284C7;font-weight:600;">(Logging, Tracing, Alerts)</div>
      </div>
    </div>`,
    720,
    102,
    170,
    36,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#BAE6FD;strokeWidth=1.5;html=1;align=left;verticalAlign=middle;'
  );

  cell(
    'cloud_iam_box',
    `<div style="display:flex;align-items:center;gap:6px;padding:4px 8px;">
      ${ICONS.iamShield}
      <div>
        <div style="font-size:8px;font-weight:900;color:#0F172A;">CLOUD IAM</div>
        <div style="font-size:6.5px;color:#0284C7;font-weight:600;">(Identity &amp; Access Management)</div>
      </div>
    </div>`,
    205,
    815,
    180,
    42,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#BAE6FD;strokeWidth=1.5;html=1;align=left;verticalAlign=middle;'
  );

  // =========================================================================
  // ZONE 2: LOAD BALANCING & COMPUTE (x=525..805) - Soft Sky Blue Fill
  // =========================================================================
  cell(
    'zone_compute_frame',
    `<div style="font-weight:900;font-size:10.5px;color:#0369A1;text-align:center;padding-top:4px;letter-spacing:0.5px;">LOAD BALANCING &amp; COMPUTE</div>`,
    525,
    130,
    280,
    780,
    'rounded=1;fillColor=#CFE2F3;strokeColor=#7DD3FC;strokeWidth=1;html=1;align=center;verticalAlign=top;dashed=1;'
  );

  // Subnet A Primary Frame
  cell(
    'subnet_a_frame',
    `<div style="font-weight:900;font-size:9px;color:#0369A1;text-align:left;padding:4px 8px;letter-spacing:0.5px;">REGIONAL SUBNET A (PRIMARY)</div>`,
    538,
    165,
    254,
    345,
    'rounded=1;fillColor=#EDF2F8;strokeColor=#7DD3FC;strokeWidth=1.5;html=1;align=left;verticalAlign=top;'
  );

  // User Auth (Firebase Auth)
  cell(
    'user_auth_box',
    `<div style="display:flex;align-items:center;gap:8px;padding:4px 8px;">
      ${ICONS.firebaseAuth}
      <div>
        <div style="font-size:8.5px;font-weight:900;color:#0F172A;">USER AUTHENTICATION</div>
        <div style="font-size:7px;color:#0284C7;font-weight:600;">(via Firebase Auth)</div>
      </div>
    </div>`,
    550,
    195,
    230,
    44,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#BAE6FD;strokeWidth=1.5;html=1;align=left;verticalAlign=middle;'
  );

  // Agentic Enterprise App (GKE Pods)
  cell(
    'agentic_app_box',
    `<div style="display:flex;align-items:center;gap:8px;padding:4px 8px;">
      ${ICONS.kubernetes}
      <div>
        <div style="font-size:8.5px;font-weight:900;color:#0F172A;">AGENTIC ENTERPRISE APP</div>
        <div style="font-size:7px;color:#0284C7;font-weight:600;">(GKE Pods / Autopilot)</div>
      </div>
    </div>`,
    550,
    265,
    230,
    48,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=2;html=1;align=left;verticalAlign=middle;'
  );

  // Backend API (GKE Pods)
  cell(
    'backend_api_box',
    `<div style="display:flex;align-items:center;gap:8px;padding:4px 8px;">
      ${ICONS.kubernetes}
      <div>
        <div style="font-size:8.5px;font-weight:900;color:#0F172A;">BACKEND API</div>
        <div style="font-size:7px;color:#0284C7;font-weight:600;">(GKE Pods / Microservices)</div>
      </div>
    </div>`,
    550,
    345,
    230,
    48,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=2;html=1;align=left;verticalAlign=middle;'
  );

  // Message Queueing (Pub/Sub)
  cell(
    'pubsub_queue_box',
    `<div style="display:flex;align-items:center;gap:8px;padding:4px 8px;">
      ${ICONS.pubsub}
      <div>
        <div style="font-size:8.5px;font-weight:900;color:#0F172A;">MESSAGE QUEUEING</div>
        <div style="font-size:7px;color:#0284C7;font-weight:600;">(Google Cloud Pub/Sub)</div>
      </div>
    </div>`,
    550,
    425,
    230,
    48,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=2;html=1;align=left;verticalAlign=middle;'
  );

  // Subnet B Secondary Frame
  cell(
    'subnet_b_frame',
    `<div style="font-weight:900;font-size:9px;color:#0369A1;text-align:left;padding:4px 8px;letter-spacing:0.5px;">REGIONAL SUBNET B (SECONDARY)</div>`,
    538,
    530,
    254,
    360,
    'rounded=1;fillColor=#EDF2F8;strokeColor=#7DD3FC;strokeWidth=1.5;html=1;align=left;verticalAlign=top;'
  );

  // Auto-Scaling Pill
  cell(
    'auto_scaling_pill',
    `<div style="text-align:center;font-size:8px;font-weight:900;color:#0284C7;letter-spacing:0.5px;">AUTO-SCALING</div>`,
    598,
    555,
    135,
    22,
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
    605,
    108,
    85,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=2;html=1;align=center;verticalAlign=middle;'
  );

  // Regional Internal LB
  cell(
    'regional_ilb_box',
    `<div style="text-align:center;padding:4px;">
      ${ICONS.loadBalancer}
      <div style="font-size:8px;font-weight:900;color:#0F172A;line-height:1.2;margin-top:2px;">REGIONAL<br/>INTERNAL LOAD<br/>BALANCER</div>
    </div>`,
    675,
    605,
    105,
    85,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=2;html=1;align=center;verticalAlign=middle;'
  );

  // =========================================================================
  // ZONE 3: APPLICATION & DATA (x=825..1105) - Soft Peach/Tan Fill
  // =========================================================================
  cell(
    'zone_data_frame',
    `<div style="font-weight:900;font-size:10.5px;color:#9A3412;text-align:center;padding-top:4px;letter-spacing:0.5px;">APPLICATION &amp; DATA</div>`,
    825,
    130,
    280,
    780,
    'rounded=1;fillColor=#EFE6D5;strokeColor=#FDE68A;strokeWidth=1;html=1;align=center;verticalAlign=top;dashed=1;'
  );

  // Top Microservices: Process Async Tasks -> Persist Data
  cell(
    'async_tasks_box',
    `<div style="display:flex;align-items:center;justify-content:center;gap:6px;padding:3px 6px;">
      ${ICONS.documentTask}
      <div style="font-size:8px;font-weight:900;color:#0F172A;text-align:left;line-height:1.1;">PROCESS<br/>ASYNC TASKS</div>
    </div>`,
    840,
    195,
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
    195,
    110,
    44,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#F59E0B;strokeWidth=1.5;html=1;align=center;verticalAlign=middle;'
  );

  // Relational Data Sub-Frame (Rich Orange Pastel Fill)
  cell(
    'relational_data_frame',
    `<div style="font-weight:900;font-size:9px;color:#B45309;text-align:center;padding:4px;letter-spacing:0.5px;">RELATIONAL DATA</div>`,
    835,
    295,
    260,
    220,
    'rounded=1;fillColor=#FCE5CD;strokeColor=#FCD34D;strokeWidth=1.5;html=1;align=center;verticalAlign=top;'
  );

  // Cloud SQL Primary
  cell(
    'cloud_sql_primary',
    `<div style="text-align:center;padding:4px;">
      ${ICONS.cloudSql}
      <div style="font-size:8.5px;font-weight:900;color:#0F172A;line-height:1.2;margin-top:2px;">CLOUD SQL</div>
      <div style="font-size:7px;color:#D97706;font-weight:600;">(Primary OLTP)</div>
    </div>`,
    848,
    345,
    105,
    75,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=2;html=1;align=center;verticalAlign=middle;'
  );

  // BigQuery Read Replica
  cell(
    'bigquery_replica',
    `<div style="text-align:center;padding:4px;">
      ${ICONS.bigquery}
      <div style="font-size:8.5px;font-weight:900;color:#0F172A;line-height:1.2;margin-top:2px;">BIGQUERY</div>
      <div style="font-size:7px;color:#D97706;font-weight:600;">(Read Replica / DW)</div>
    </div>`,
    975,
    345,
    105,
    75,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=2;html=1;align=center;verticalAlign=middle;'
  );

  // Unstructured Data Sub-Frame (Rich Orange Pastel Fill)
  cell(
    'unstructured_data_frame',
    `<div style="font-weight:900;font-size:9px;color:#B45309;text-align:center;padding:4px;letter-spacing:0.5px;">UNSTRUCTURED DATA</div>`,
    835,
    535,
    260,
    355,
    'rounded=1;fillColor=#FCE5CD;strokeColor=#FCD34D;strokeWidth=1.5;html=1;align=center;verticalAlign=top;'
  );

  // Cloud Storage (GCS Multi-Region)
  cell(
    'gcs_storage_box',
    `<div style="text-align:center;padding:4px;">
      ${ICONS.cloudStorage}
      <div style="font-size:8.5px;font-weight:900;color:#0F172A;line-height:1.2;margin-top:2px;">CLOUD STORAGE</div>
      <div style="font-size:7px;color:#D97706;font-weight:600;">(GCS Multi-Region)</div>
    </div>`,
    848,
    630,
    108,
    85,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=2;html=1;align=center;verticalAlign=middle;'
  );

  // Data Lifecycle Management
  cell(
    'gcs_lifecycle_box',
    `<div style="text-align:center;padding:4px;">
      ${ICONS.lifecycle}
      <div style="font-size:8px;font-weight:900;color:#0F172A;line-height:1.1;margin-top:2px;">DATA LIFE CYCLE<br/>MANAGEMENT</div>
      <div style="font-size:6.5px;color:#64748B;font-weight:600;">(e.g., ARCHIVE OLD FILES)</div>
    </div>`,
    972,
    630,
    108,
    85,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=2;html=1;align=center;verticalAlign=middle;'
  );

  // =========================================================================
  // ZONE 4: AGENTIC AI SERVICES (Vertex AI & DeepMind) (x=1125..1545)
  // =========================================================================
  cell(
    'zone_ai_frame',
    `<div style="display:flex;align-items:center;justify-content:center;gap:6px;padding-top:4px;">
      ${ICONS.deepmindGemini}
      <div style="text-align:left;">
        <div style="font-weight:900;font-size:10px;color:#15803D;letter-spacing:0.5px;">AGENTIC AI SERVICES</div>
        <div style="font-size:7.5px;font-weight:700;color:#16A34A;">(Vertex AI &amp; DeepMind)</div>
      </div>
    </div>`,
    1125,
    130,
    250,
    315,
    'rounded=1;fillColor=#D9EAD3;strokeColor=#86EFAC;strokeWidth=1;html=1;align=center;verticalAlign=top;dashed=1;'
  );

  // Agent Designer
  cell(
    'ai_agent_designer',
    `<div style="text-align:center;padding:4px;">
      ${ICONS.agentDesigner}
      <div style="font-size:8px;font-weight:900;color:#0F172A;margin-top:2px;">AGENT DESIGNER</div>
      <div style="font-size:6.5px;color:#15803D;font-weight:600;">(DeepMind Studio)</div>
    </div>`,
    1138,
    205,
    72,
    60,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;html=1;align=center;verticalAlign=middle;'
  );

  // Gemini Notebook
  cell(
    'ai_gemini_notebook',
    `<div style="text-align:center;padding:4px;">
      ${ICONS.notebook}
      <div style="font-size:8px;font-weight:900;color:#0F172A;margin-top:2px;">GEMINI<br/>NOTEBOOK</div>
    </div>`,
    1218,
    205,
    72,
    60,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;html=1;align=center;verticalAlign=middle;'
  );

  // ADK 2.0 (Agent Development Kit)
  cell(
    'ai_adk_box',
    `<div style="text-align:center;padding:4px;">
      ${ICONS.adkKit}
      <div style="font-size:8px;font-weight:900;color:#0F172A;margin-top:2px;">ADK 2.0</div>
      <div style="font-size:6.5px;color:#16A34A;font-weight:600;">(DeepMind Agent Kit)</div>
    </div>`,
    1298,
    205,
    68,
    60,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;html=1;align=center;verticalAlign=middle;'
  );

  // Gemini Agent Platform Hub (Central Brain with DeepMind Spark Logo)
  cell(
    'ai_agent_platform_hub',
    `<div style="display:flex;align-items:center;justify-content:center;gap:8px;padding:6px;">
      ${ICONS.deepmindGemini}
      <div style="text-align:left;">
        <div style="font-size:9.5px;font-weight:900;color:#15803D;line-height:1.2;">GEMINI AGENT PLATFORM</div>
        <div style="font-size:7.5px;color:#16A34A;font-weight:700;">(Gemini 2.5 Pro / Flash Reasoning)</div>
      </div>
    </div>`,
    1138,
    305,
    224,
    65,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#15803D;strokeWidth=2.5;html=1;align=center;verticalAlign=middle;'
  );

  // Model Management & Serving Sub-Frame
  cell(
    'model_mgmt_frame',
    `<div style="display:flex;align-items:center;justify-content:center;gap:6px;padding-top:4px;">
      ${ICONS.gcpLogo}
      <div style="text-align:left;">
        <div style="font-weight:900;font-size:9.5px;color:#B45309;">MODEL MANAGEMENT &amp; SERVING</div>
        <div style="font-size:7.5px;font-weight:700;color:#D97706;">(Vertex AI &amp; DeepMind)</div>
      </div>
    </div>`,
    1125,
    465,
    250,
    425,
    'rounded=1;fillColor=#FCE5CD;strokeColor=#FDE68A;strokeWidth=1.5;html=1;align=center;verticalAlign=top;'
  );

  // Train Model
  cell(
    'train_model_box',
    `<div style="text-align:center;padding:4px;">
      ${ICONS.trainModel}
      <div style="font-size:8px;font-weight:900;color:#0F172A;margin-top:2px;">TRAIN MODEL</div>
      <div style="font-size:6.5px;color:#D97706;font-weight:600;">(Vertex AI Fine-Tuning)</div>
    </div>`,
    1185,
    530,
    130,
    60,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=2;html=1;align=center;verticalAlign=middle;'
  );

  // Deploy Model
  cell(
    'deploy_model_box',
    `<div style="text-align:center;padding:4px;">
      ${ICONS.deployModel}
      <div style="font-size:8px;font-weight:900;color:#0F172A;margin-top:2px;">DEPLOY MODEL</div>
      <div style="font-size:6.5px;color:#D97706;font-weight:600;">(Model Garden Endpoints)</div>
    </div>`,
    1185,
    640,
    130,
    60,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=2;html=1;align=center;verticalAlign=middle;'
  );

  // Online Prediction
  cell(
    'online_prediction_box',
    `<div style="text-align:center;padding:4px;">
      ${ICONS.predictionZap}
      <div style="font-size:8px;font-weight:900;color:#0F172A;margin-top:2px;">ONLINE PREDICTION</div>
      <div style="font-size:6.5px;color:#D97706;font-weight:600;">(Low-Latency Real-Time Serving)</div>
    </div>`,
    1185,
    750,
    130,
    60,
    'rounded=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=2;html=1;align=center;verticalAlign=middle;'
  );

  // =========================================================================
  // CONNECTING FLOW ARROWS & PILL LABELS (Exact Master Replication)
  // =========================================================================
  // 1. Users & Public Internet -> Ingress
  edge('e1', '❶ INGRESS', 'public_internet', 'cloud_armor', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#2563EB;strokeWidth=2.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=3;fontSize=8;fontStyle=1;');
  edge('e1_vpn', '', 'users_icon', 'ext_vpn_gateway', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#64748B;strokeWidth=1.5;dashed=1;');
  edge('e1_vpn_iap', '', 'ext_vpn_gateway', 'iap_proxy', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#2563EB;strokeWidth=1.5;');

  // Cloud Armor -> IAP -> GCLB
  edge('e2', '❷', 'cloud_armor', 'iap_proxy', 'edgeStyle=none;strokeColor=#2563EB;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=2;fontSize=8;fontStyle=1;');
  edge('e3', '', 'iap_proxy', 'gclb_load_balancer', 'edgeStyle=none;strokeColor=#2563EB;strokeWidth=2;');

  // GCLB -> Decision CON Top
  edge('e4', '❸ YES', 'gclb_load_balancer', 'decision_con_top', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#2563EB;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=2;fontSize=8;fontStyle=1;');

  // Decision CON Top -> Subnet A Primary App
  edge('e5', '❹ NO', 'decision_con_top', 'agentic_app_box', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#0284C7;strokeWidth=2.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=2;fontSize=8;fontStyle=1;', [{ x: 510, y: 289 }]);

  // GCLB -> Path Based Routing & CDN Cache Hit
  edge('e6', 'NO', 'gclb_load_balancer', 'decision_path_routing', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#64748B;strokeWidth=1.5;labelBackgroundColor=#FFFFFF;');
  edge('e7', 'NO', 'gclb_load_balancer', 'decision_cdn_cache', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#64748B;strokeWidth=1.5;labelBackgroundColor=#FFFFFF;');
  edge('e8', '❼ YES', 'decision_path_routing', 'decision_con_bottom', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#0284C7;strokeWidth=1.5;labelBackgroundColor=#FFFFFF;');
  edge('e9', 'YES', 'decision_cdn_cache', 'decision_con_bottom', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#0284C7;strokeWidth=1.5;labelBackgroundColor=#FFFFFF;');

  // Decision CON Bottom -> Subnet B Compute MIG
  edge('e10', '⓲', 'decision_con_bottom', 'gce_mig_box', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#0284C7;strokeWidth=2.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=2;fontSize=8;fontStyle=1;', [{ x: 505, y: 713 }, { x: 505, y: 647 }]);

  // Subnet A: App -> Backend API -> Pub/Sub
  edge('e11', '⓿', 'agentic_app_box', 'backend_api_box', 'edgeStyle=none;strokeColor=#0284C7;strokeWidth=2;');
  edge('e12', '', 'backend_api_box', 'pubsub_queue_box', 'edgeStyle=none;strokeColor=#0284C7;strokeWidth=2;');

  // Subnet A App -> Relational Data (Cloud SQL)
  edge('e13', '', 'agentic_app_box', 'async_tasks_box', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#059669;strokeWidth=2;');
  edge('e14', '', 'async_tasks_box', 'persist_data_box', 'edgeStyle=none;strokeColor=#059669;strokeWidth=2;');
  edge('e15', '❺ STORE &amp; SERVE', 'persist_data_box', 'cloud_sql_primary', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#059669;strokeWidth=2.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;padding=2;fontSize=8;fontStyle=1;', [{ x: 900, y: 217 }]);

  // Cloud SQL -> BigQuery Replication
  edge('e16', 'REPLICATION', 'cloud_sql_primary', 'bigquery_replica', 'edgeStyle=none;strokeColor=#D97706;strokeWidth=1.5;dashed=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#FCD34D;padding=2;fontSize=7.5;fontStyle=1;');

  // Persist Data -> Cloud Storage & Lifecycle
  edge('e17', '', 'cloud_sql_primary', 'gcs_storage_box', 'edgeStyle=none;strokeColor=#059669;strokeWidth=2;');
  edge('e18', '', 'gcs_storage_box', 'gcs_lifecycle_box', 'edgeStyle=none;strokeColor=#D97706;strokeWidth=1.5;');

  // Subnet B MIG -> Internal LB -> Cloud Storage
  edge('e19', '', 'gce_mig_box', 'regional_ilb_box', 'edgeStyle=none;strokeColor=#0284C7;strokeWidth=1.5;');
  edge('e20', '', 'regional_ilb_box', 'gcs_storage_box', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#059669;strokeWidth=2;');

  // Relational Data & Backend -> Gemini Agent Platform Hub (DeepMind Reasoning)
  edge('e21', '', 'agentic_app_box', 'ai_agent_platform_hub', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#7C3AED;strokeWidth=2.5;');
  edge('e22', '', 'bigquery_replica', 'ai_agent_platform_hub', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#7C3AED;strokeWidth=2.5;');
  edge('e23', '', 'ai_agent_designer', 'ai_agent_platform_hub', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#16A34A;strokeWidth=1.5;');
  edge('e24', '', 'ai_gemini_notebook', 'ai_agent_platform_hub', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#16A34A;strokeWidth=1.5;');
  edge('e25', '', 'ai_adk_box', 'ai_agent_platform_hub', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#16A34A;strokeWidth=1.5;');

  // Agent Platform -> Model Management & Training Loop
  edge('e26', '', 'ai_agent_platform_hub', 'train_model_box', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#D97706;strokeWidth=2;');
  edge('e27', '', 'train_model_box', 'deploy_model_box', 'edgeStyle=none;strokeColor=#D97706;strokeWidth=1.5;');
  edge('e28', '', 'deploy_model_box', 'online_prediction_box', 'edgeStyle=none;strokeColor=#D97706;strokeWidth=1.5;');
  edge('e29', 'FEEDBACK LOOP', 'online_prediction_box', 'ai_agent_platform_hub', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#15803D;strokeWidth=2;dashed=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#86EFAC;padding=2;fontSize=7.5;fontStyle=1;', [{ x: 1395, y: 780 }, { x: 1395, y: 337 }]);

  // Cross-Cutting IAM & Monitoring Enablers
  edge('e_mon_ingress', '', 'cloud_monitoring_box', 'zone_ingress_frame', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#0284C7;strokeWidth=1;dashed=1;');
  edge('e_mon_compute', '', 'cloud_monitoring_box', 'zone_compute_frame', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#0284C7;strokeWidth=1;dashed=1;');
  edge('e_mon_ai', '', 'cloud_monitoring_box', 'zone_ai_frame', 'edgeStyle=orthogonalEdgeStyle;rounded=1;strokeColor=#0284C7;strokeWidth=1;dashed=1;');

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

