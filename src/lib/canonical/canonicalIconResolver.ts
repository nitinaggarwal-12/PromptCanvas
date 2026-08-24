/**
 * Canonical Icon & Vector Logo Resolver for Enterprise Draw.io Blueprints
 * Maps semantic node identifiers to authentic vector SVGs, crisp inline glyphs, and brand tokens.
 * Zero external HTTP / CDN dependencies — 100% offline, headless, and sandbox safe.
 */

export interface CanonicalIconDefinition {
  key: string;
  name: string;
  category: 'cloud' | 'enterprise' | 'ai' | 'database' | 'security' | 'actor' | 'devops' | 'regulatory' | 'generic';
  primaryColor: string;
  bgColor: string;
  emojiFallback: string;
  svg: string; // Inline SVG markup (safe for embedding in Draw.io HTML labels)
}

const SVG_WRAPPERS = {
  // Renders a high-craft inline SVG icon box suitable for Draw.io tables and cards
  renderHtml: (def: CanonicalIconDefinition, size = 24): string => {
    return `<div style="display:inline-flex;align-items:center;justify-content:center;width:${size}px;height:${size}px;border-radius:4px;background:${def.bgColor};color:${def.primaryColor};flex-shrink:0;">${def.svg}</div>`;
  }
};

export const CANONICAL_ICON_REGISTRY: Record<string, CanonicalIconDefinition> = {
  // ==========================================
  // 1. ENTERPRISE & SAAS PLATFORMS
  // ==========================================
  'salesforce.health_cloud': {
    key: 'salesforce.health_cloud',
    name: 'Salesforce Health Cloud',
    category: 'enterprise',
    primaryColor: '#00A1E0',
    bgColor: '#E0F2FE',
    emojiFallback: '☁️',
    svg: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#00A1E0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>`
  },
  'sap.s4hana': {
    key: 'sap.s4hana',
    name: 'SAP S/4HANA',
    category: 'enterprise',
    primaryColor: '#0070F2',
    bgColor: '#DBEAFE',
    emojiFallback: '🏢',
    svg: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#0070F2" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 16V8h4a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H7"/><path d="M14 16v-5a2 2 0 0 1 2-2h1"/></svg>`
  },
  'veeva.vault': {
    key: 'veeva.vault',
    name: 'Veeva Vault',
    category: 'enterprise',
    primaryColor: '#EA580C',
    bgColor: '#FFEDD5',
    emojiFallback: '📁',
    svg: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#EA580C" stroke-width="2"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/><circle cx="12" cy="13" r="2"/></svg>`
  },
  'medidata.rave': {
    key: 'medidata.rave',
    name: 'Medidata Rave CTMS',
    category: 'enterprise',
    primaryColor: '#0284C7',
    bgColor: '#E0F2FE',
    emojiFallback: '📋',
    svg: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#0284C7" stroke-width="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><path d="m9 14 2 2 4-4"/></svg>`
  },

  // ==========================================
  // 2. GOOGLE CLOUD & PLATFORM SERVICES
  // ==========================================
  'google.vertex_ai': {
    key: 'google.vertex_ai',
    name: 'Google Vertex AI',
    category: 'ai',
    primaryColor: '#7C3AED',
    bgColor: '#FAF5FF',
    emojiFallback: '✨',
    svg: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#7C3AED" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polygon points="2 17 12 22 22 17"/><polygon points="2 12 12 17 22 12"/></svg>`
  },
  'ai.gemini': {
    key: 'ai.gemini',
    name: 'Gemini 2.5 Pro',
    category: 'ai',
    primaryColor: '#4338CA',
    bgColor: '#EEF2FF',
    emojiFallback: '🧠',
    svg: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#4338CA" stroke-width="2"><path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07 19.07 4.93"/></svg>`
  },
  'gcp.bigquery': {
    key: 'gcp.bigquery',
    name: 'Google BigQuery',
    category: 'database',
    primaryColor: '#2563EB',
    bgColor: '#EFF6FF',
    emojiFallback: '📊',
    svg: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#2563EB" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/></svg>`
  },
  'gcp.pubsub': {
    key: 'gcp.pubsub',
    name: 'Google Cloud Pub/Sub',
    category: 'cloud',
    primaryColor: '#0284C7',
    bgColor: '#F0F9FF',
    emojiFallback: '📡',
    svg: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#0284C7" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>`
  },
  'gcp.cloud_run': {
    key: 'gcp.cloud_run',
    name: 'Google Cloud Run',
    category: 'cloud',
    primaryColor: '#0D9488',
    bgColor: '#F0FDFA',
    emojiFallback: '⚡',
    svg: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#0D9488" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`
  },
  'kubernetes': {
    key: 'kubernetes',
    name: 'GKE / Kubernetes',
    category: 'cloud',
    primaryColor: '#326CE5',
    bgColor: '#EFF6FF',
    emojiFallback: '☸️',
    svg: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#326CE5" stroke-width="2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><path d="M12 3v6M12 15v6M3 12h6M15 12h6"/></svg>`
  },
  'gcp.cloud_armor': {
    key: 'gcp.cloud_armor',
    name: 'Google Cloud Armor',
    category: 'security',
    primaryColor: '#DC2626',
    bgColor: '#FEF2F2',
    emojiFallback: '🛡️',
    svg: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#DC2626" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`
  },

  // ==========================================
  // 3. DATABASES & STORAGE
  // ==========================================
  'db.alloydb': {
    key: 'db.alloydb',
    name: 'AlloyDB PostgreSQL',
    category: 'database',
    primaryColor: '#1E40AF',
    bgColor: '#DBEAFE',
    emojiFallback: '🗄️',
    svg: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#1E40AF" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>`
  },
  'db.redis': {
    key: 'db.redis',
    name: 'Memorystore Redis',
    category: 'database',
    primaryColor: '#DC2626',
    bgColor: '#FEE2E2',
    emojiFallback: '💾',
    svg: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#DC2626" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polygon points="2 17 12 22 22 17"/><polygon points="2 12 12 17 22 12"/></svg>`
  },

  // ==========================================
  // 4. SECURITY & IDENTITY
  // ==========================================
  'security.iam': {
    key: 'security.iam',
    name: 'Cloud IAM & Keycloak',
    category: 'security',
    primaryColor: '#1E3A8A',
    bgColor: '#EFF6FF',
    emojiFallback: '🔒',
    svg: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#1E3A8A" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`
  },

  // ==========================================
  // 5. ACTORS & PERSONAS
  // ==========================================
  'actor.scientist': {
    key: 'actor.scientist',
    name: 'Research Scientist',
    category: 'actor',
    primaryColor: '#16A34A',
    bgColor: '#DCFCE7',
    emojiFallback: '🔬',
    svg: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#16A34A" stroke-width="2"><path d="M10 2v7.31L4.2 19.5a2 2 0 0 0 1.7 2.5h12.2a2 2 0 0 0 1.7-2.5L14 9.31V2"/></svg>`
  },
  'actor.oncologist': {
    key: 'actor.oncologist',
    name: 'Clinical Oncologist / HCP',
    category: 'actor',
    primaryColor: '#0284C7',
    bgColor: '#E0F2FE',
    emojiFallback: '🩺',
    svg: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#0284C7" stroke-width="2"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></svg>`
  },
  'actor.regulatory': {
    key: 'actor.regulatory',
    name: 'Regulatory Affairs Officer',
    category: 'actor',
    primaryColor: '#7C3AED',
    bgColor: '#F3E8FF',
    emojiFallback: '📄',
    svg: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#7C3AED" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`
  },

  // ==========================================
  // 6. DEVOPS & INFRASTRUCTURE
  // ==========================================
  'devops.terraform': {
    key: 'devops.terraform',
    name: 'HashiCorp Terraform',
    category: 'devops',
    primaryColor: '#7B42BC',
    bgColor: '#FAF5FF',
    emojiFallback: '🏗️',
    svg: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#7B42BC" stroke-width="2"><polygon points="10 2 2 7 2 17 10 12 10 2"/><polygon points="22 7 14 2 14 12 22 17 22 7"/><polygon points="10 13 2 18 10 23 18 18 10 13"/></svg>`
  },
  'devops.github': {
    key: 'devops.github',
    name: 'GitHub Enterprise',
    category: 'devops',
    primaryColor: '#0F172A',
    bgColor: '#F1F5F9',
    emojiFallback: '🐙',
    svg: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#0F172A" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`
  }
};

/**
 * Resolves a semantic node or vendor identifier into an authentic vector definition.
 */
export function resolveCanonicalIcon(query: string): CanonicalIconDefinition {
  const norm = query.toLowerCase().trim().replace(/[\s\-_]+/g, '.');
  
  if (CANONICAL_ICON_REGISTRY[norm]) {
    return CANONICAL_ICON_REGISTRY[norm];
  }

  // Alias lookups
  if (norm.includes('salesforce') || norm === 'sf') return CANONICAL_ICON_REGISTRY['salesforce.health_cloud'];
  if (norm.includes('sap') || norm.includes('s4hana')) return CANONICAL_ICON_REGISTRY['sap.s4hana'];
  if (norm.includes('veeva') || norm.includes('vault')) return CANONICAL_ICON_REGISTRY['veeva.vault'];
  if (norm.includes('medidata') || norm.includes('ctms')) return CANONICAL_ICON_REGISTRY['medidata.rave'];
  if (norm.includes('vertex') || norm.includes('ai.platform')) return CANONICAL_ICON_REGISTRY['google.vertex_ai'];
  if (norm.includes('gemini') || norm.includes('llm')) return CANONICAL_ICON_REGISTRY['ai.gemini'];
  if (norm.includes('bigquery') || norm.includes('warehouse')) return CANONICAL_ICON_REGISTRY['gcp.bigquery'];
  if (norm.includes('pubsub') || norm.includes('event')) return CANONICAL_ICON_REGISTRY['gcp.pubsub'];
  if (norm.includes('cloudrun') || norm.includes('serverless')) return CANONICAL_ICON_REGISTRY['gcp.cloud_run'];
  if (norm.includes('k8s') || norm.includes('kubernetes') || norm.includes('gke')) return CANONICAL_ICON_REGISTRY['kubernetes'];
  if (norm.includes('armor') || norm.includes('waf') || norm.includes('ddos')) return CANONICAL_ICON_REGISTRY['gcp.cloud_armor'];
  if (norm.includes('alloy') || norm.includes('postgres')) return CANONICAL_ICON_REGISTRY['db.alloydb'];
  if (norm.includes('redis') || norm.includes('cache')) return CANONICAL_ICON_REGISTRY['db.redis'];
  if (norm.includes('iam') || norm.includes('auth') || norm.includes('oauth')) return CANONICAL_ICON_REGISTRY['security.iam'];
  if (norm.includes('scientist') || norm.includes('research')) return CANONICAL_ICON_REGISTRY['actor.scientist'];
  if (norm.includes('oncologist') || norm.includes('doctor') || norm.includes('hcp')) return CANONICAL_ICON_REGISTRY['actor.oncologist'];
  if (norm.includes('regulatory') || norm.includes('fda') || norm.includes('ema')) return CANONICAL_ICON_REGISTRY['actor.regulatory'];
  if (norm.includes('terraform') || norm.includes('iac')) return CANONICAL_ICON_REGISTRY['devops.terraform'];
  if (norm.includes('github') || norm.includes('git')) return CANONICAL_ICON_REGISTRY['devops.github'];

  // Generic fallback
  return {
    key: norm,
    name: query,
    category: 'generic',
    primaryColor: '#0284C7',
    bgColor: '#F0F9FF',
    emojiFallback: '⚙️',
    svg: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#0284C7" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`
  };
}

/**
 * Returns a high-craft HTML snippet for direct rendering inside Draw.io vertex labels.
 */
export function getCanonicalIconHtml(query: string, size = 24): string {
  const def = resolveCanonicalIcon(query);
  return SVG_WRAPPERS.renderHtml(def, size);
}
