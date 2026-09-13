/**
 * 🎨 Vector Icon & Native Stencil Registry
 * 
 * Provides native mxGraph built-in shape stencils for cloud services (zero base64 bloat)
 * and high-contrast pill styling for domain concepts (biotech, enterprise, workflows).
 * Strictly avoids external HTTP icon dependencies.
 */

export interface VectorStencilDef {
  style: string;
  badgeEmoji?: string;
  svgIconKey?: string;
  isNativeShape: boolean;
  pillColor: string;
  textColor: string;
}

// Built-in mxGraph stencils recognized by embed.diagrams.net without external assets
export const NATIVE_CLOUD_SHAPES: Record<string, string> = {
  'google cloud': 'shape=mxgraph.gcp2.google_cloud_platform;',
  'gcp': 'shape=mxgraph.gcp2.google_cloud_platform;',
  'vertex ai': 'shape=mxgraph.gcp2.vertex_ai;',
  'bigquery': 'shape=mxgraph.gcp2.bigquery;',
  'kubernetes': 'shape=mxgraph.gcp2.container_engine;',
  'gke': 'shape=mxgraph.gcp2.container_engine;',
  'pubsub': 'shape=mxgraph.gcp2.cloud_pubsub;',
  'cloud pub/sub': 'shape=mxgraph.gcp2.cloud_pubsub;',
  'cloud storage': 'shape=mxgraph.gcp2.cloud_storage;',
  'gcs': 'shape=mxgraph.gcp2.cloud_storage;',
  'cloud run': 'shape=mxgraph.gcp2.cloud_run;',
  'cloud functions': 'shape=mxgraph.gcp2.cloud_functions;',
  'looker': 'shape=mxgraph.gcp2.looker;',
  'dataflow': 'shape=mxgraph.gcp2.dataflow;',
  'dataplex': 'shape=mxgraph.gcp2.dataplex;',
  'composer': 'shape=mxgraph.gcp2.cloud_composer;',
  'apigee': 'shape=mxgraph.gcp2.apigee;',
  'github': 'shape=mxgraph.mscae.general.github;',
  'docker': 'shape=mxgraph.mscae.general.docker;',
  'terraform': 'shape=mxgraph.mscae.general.terraform;',
  'kafka': 'shape=mxgraph.mscae.general.kafka;',
};

export const SVG_PATHS: Record<string, string> = {
  microscope: '<path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 1 0 0-14h-1"/><path d="M9 14h2"/><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"/><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/>',
  flask: '<path d="M10 2v4.5L4.2 18.5a2 2 0 0 0 1.8 2.5h12a2 2 0 0 0 1.8-2.5L14 6.5V2"/><line x1="8.5" y1="2" x2="15.5" y2="2"/><line x1="7" y1="14" x2="17" y2="14"/>',
  factory: '<path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 4V8l-7 4V4H2z"/><path d="M18 16h2"/><path d="M18 12h2"/>',
  megaphone: '<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
  heartUser: '<circle cx="12" cy="7" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/><path d="M12 17c-2 0-3-1-3-2s1-2 3-2 3 1 3 2-1 2-3 2z"/>',
  target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  users: '<circle cx="9" cy="7" r="3.5"/><path d="M3 20a6 6 0 0 1 12 0"/><circle cx="16.5" cy="8.5" r="2.5"/><path d="M15 20a5 5 0 0 1 6 0"/>',
  chart: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
  shieldCheck: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
  clipboardCheck: '<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>',
  trendUp: '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
  handshake: '<path d="m11 17 2 2a1 1 0 0 0 1.4 0l4.6-4.6a2 2 0 0 0 0-2.8l-3.2-3.2a2 2 0 0 0-2.8 0L7 14.4"/><path d="m21.5 7-3.5-3.5a2 2 0 0 0-2.8 0L9.4 9.3"/><path d="m2 14.5 4.5 4.5a2 2 0 0 0 2.8 0l3.7-3.7"/>',
  heartPulse: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M12 5v14"/>',
  refresh: '<path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21h5v-5"/>',
  lightbulb: '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',
  box: '<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
  globe: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  brain: '<path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04zM14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04z"/>',
  cloud: '<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>',
  network: '<rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><line x1="12" y1="12" x2="12" y2="8"/>',
  leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6 0-1.5 2-4 5-5"/>',
  timer: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  medal: '<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>',
  userCheck: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/>',
  dollar: '<line x1="12" y1="2" x2="12" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
  database: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>',
  sparkles: '<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  gitHub: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>',
  check: '<polyline points="20 6 9 17 4 12"/>',
  creditCard: '<rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>',
  lock: '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  brandNovacura: '<circle cx="8" cy="8" r="4" fill="#1D4ED8"/><circle cx="24" cy="8" r="4" fill="#1D4ED8"/><circle cx="8" cy="24" r="4" fill="#1D4ED8"/><circle cx="24" cy="24" r="4" fill="#1D4ED8"/><line x1="8" y1="8" x2="24" y2="24" stroke="#1D4ED8" stroke-width="2.5"/><line x1="24" y1="8" x2="8" y2="24" stroke="#1D4ED8" stroke-width="2.5"/>',
  brandNexusPay: '<rect x="3" y="6" width="26" height="20" rx="4" fill="#1D4ED8"/><line x1="3" y1="12" x2="29" y2="12" stroke="#FFFFFF" stroke-width="2.5"/><circle cx="9" cy="20" r="2.5" fill="#10B981"/><circle cx="16" cy="20" r="2.5" fill="#38BDF8"/>'
};

export function renderSvgIcon(key: string, color = '#2563EB', size = 18): string {
  let raw: string;
  if (key === 'brandNovacura') {
    raw = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 32 32" fill="none">${SVG_PATHS.brandNovacura}</svg>`;
  } else if (key === 'brandNexusPay') {
    raw = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 32 32" fill="none">${SVG_PATHS.brandNexusPay}</svg>`;
  } else {
    const pathD = SVG_PATHS[key] || SVG_PATHS.gear;
    raw = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${pathD}</svg>`;
  }
  return raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function inferSvgForKeyword(keyword: string): string {
  const clean = keyword.toLowerCase();
  if (/card|checkout|payment|credit|pay/i.test(clean)) return 'creditCard';
  if (/lock|security|encrypt|pci|vault|hsm/i.test(clean)) return 'lock';
  if (/microscope|discovery|assay|biology|screen/i.test(clean)) return 'microscope';
  if (/flask|lead|candidate|chemist|hit/i.test(clean)) return 'flask';
  if (/factory|manufactur|gmp|batch|scale/i.test(clean)) return 'factory';
  if (/megaphone|commercial|launch|sales|market/i.test(clean)) return 'megaphone';
  if (/patient|outcome|real-world|adherence/i.test(clean)) return 'heartUser';
  if (/target|success|accuracy|precision/i.test(clean)) return 'target';
  if (/trial|clinical|users|people|talent|team/i.test(clean)) return 'users';
  if (/chart|time|cycle|duration|speed|velocity/i.test(clean)) return 'chart';
  if (/shield|compliance|gxp|quality|regulatory|integrity|auth|fraud|risk/i.test(clean)) return 'shieldCheck';
  if (/clipboard|yield|pass|test|ledger|audit/i.test(clean)) return 'clipboardCheck';
  if (/trend|growth|market access|conversion|uplift/i.test(clean)) return 'trendUp';
  if (/handshake|partner|collaborat|ecosystem|acquirer/i.test(clean)) return 'handshake';
  if (/pulse|health|therapy/i.test(clean)) return 'heartPulse';
  if (/refresh|impact|evidence|rebalanc|cycle/i.test(clean)) return 'refresh';
  if (/lightbulb|idea|hypothes|innovat/i.test(clean)) return 'lightbulb';
  if (/box|product|package|terraform|payload/i.test(clean)) return 'box';
  if (/gear|process|operat|kubernetes/i.test(clean)) return 'gear';
  if (/globe|access|society|world|global|international/i.test(clean)) return 'globe';
  if (/brain|ai|ml|predict|model|advanced/i.test(clean)) return 'brain';
  if (/cloud|platform|digital|gcp/i.test(clean)) return 'cloud';
  if (/network|connect|mesh|interconnect|dataplex|dataflow|pubsub|pub\/sub|mcp|a2a|route|switch|routing/i.test(clean)) return 'network';
  if (/leaf|sustainab|environment/i.test(clean)) return 'leaf';
  if (/timer|fast|speed|time|latency/i.test(clean)) return 'timer';
  if (/medal|award|rank/i.test(clean)) return 'medal';
  if (/star|quality|excellence/i.test(clean)) return 'star';
  if (/dollar|financial|revenue|cost|payout|settle|money|interchange/i.test(clean)) return 'dollar';
  if (/database|data|storage|bigquery|spanner|ledger/i.test(clean)) return 'database';
  if (/sparkle|genai|gemini|vertex/i.test(clean)) return 'sparkles';
  if (/search|query/i.test(clean)) return 'search';
  if (/github|repo|code/i.test(clean)) return 'gitHub';
  return 'gear';
}

export function getVectorStencilForTech(keyword: string): VectorStencilDef {
  const clean = keyword.toLowerCase().trim();
  const iconKey = inferSvgForKeyword(clean);

  // Check native cloud stencils first
  for (const [key, shapeStyle] of Object.entries(NATIVE_CLOUD_SHAPES)) {
    if (clean.includes(key)) {
      return {
        style: `${shapeStyle}fillColor=#2563EB;strokeColor=none;`,
        isNativeShape: true,
        pillColor: '#EFF6FF',
        textColor: '#1E40AF',
        svgIconKey: iconKey
      };
    }
  }

  // Fallback clean enterprise pill badge
  return {
    style: 'rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;arcSize=12;',
    isNativeShape: false,
    pillColor: '#F8FAFC',
    textColor: '#334155',
    svgIconKey: iconKey
  };
}
