/**
 * Official Google Cloud Architecture Center Icon Registry & Title-First Icon Resolver (`Rule 53`)
 *
 * Strictly resolves official Google Cloud service icons for Blueprint #78
 * (`templateOfficialGcpArchCenterHubSpoke.ts`) by matching `EXTRA_GCP_ICONS[iconKey]`
 * and `titleLower` ONLY (never `sub`), ensuring card subtitles mentioning
 * `VPC-SC`, `PSC`, `CMEK`, or `Migrator` never hijack primary icons of
 * `Security Command Center`, `Cloud Run`, `Vertex AI Agent Engine`, or `MCP servers`.
 */

import officialAssetsRaw from './officialArchCenterAssets.json';

const OFFICIAL_ASSETS = officialAssetsRaw as Record<string, string>;

function svgToDataUri(svgStr: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgStr.trim())}`;
}

export const EXTRA_GCP_ICONS: Record<string, string> = {
  cloud_kms: svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
      <rect x="2" y="2" width="36" height="36" rx="8" fill="#e8f0fe" stroke="#1a73e8" stroke-width="2"/>
      <circle cx="15" cy="20" r="6" fill="none" stroke="#174ea6" stroke-width="2.6"/>
      <circle cx="15" cy="20" r="2" fill="#174ea6"/>
      <path d="M21 20 H32 M28 20 V25 M32 20 V26" stroke="#ea4335" stroke-width="2.6" stroke-linecap="round"/>
    </svg>
  `),
  vpc_sc: svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
      <rect x="3" y="3" width="34" height="34" rx="7" fill="#fce8e6" stroke="#d93025" stroke-width="2" stroke-dasharray="4,2"/>
      <path d="M20 8 L30 12 V20 C30 26.5 25.5 31 20 33 C14.5 31 10 26.5 10 20 V12 Z" fill="#ea4335" opacity="0.18"/>
      <path d="M20 8 L30 12 V20 C30 26.5 25.5 31 20 33 C14.5 31 10 26.5 10 20 V12 Z" fill="none" stroke="#c5221f" stroke-width="2.2"/>
      <rect x="17" y="18" width="6" height="6" rx="1" fill="#c5221f"/>
      <path d="M18 18 V15.5 A2 2 0 0 1 22 15.5 V18" fill="none" stroke="#c5221f" stroke-width="1.8"/>
    </svg>
  `),
  psc_bridge: svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
      <rect x="2" y="2" width="36" height="36" rx="8" fill="#e6f4ea" stroke="#137333" stroke-width="2"/>
      <circle cx="11" cy="20" r="4.5" fill="#1a73e8"/>
      <circle cx="29" cy="20" r="4.5" fill="#137333"/>
      <path d="M16 20 H24 M21 16 L25 20 L21 24" fill="none" stroke="#137333" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `),
  valkey_cache: svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
      <rect x="2" y="2" width="36" height="36" rx="8" fill="#fef7e0" stroke="#ea8600" stroke-width="2"/>
      <polygon points="22,7 11,22 19,22 17,33 29,18 21,18" fill="#f29900" stroke="#b06000" stroke-width="1.4" stroke-linejoin="round"/>
    </svg>
  `),
  firestore_db: svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
      <rect x="2" y="2" width="36" height="36" rx="8" fill="#fef7e0" stroke="#f29900" stroke-width="2"/>
      <path d="M20 8 L31 14 L20 20 L9 14 Z" fill="#fbbc04"/>
      <path d="M9 20 L20 26 L31 20" fill="none" stroke="#ea8600" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M9 26 L20 32 L31 26" fill="none" stroke="#b06000" stroke-width="2.4" stroke-linecap="round"/>
    </svg>
  `),
  spanner_graph: svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
      <rect x="2" y="2" width="36" height="36" rx="8" fill="#e8f0fe" stroke="#1a73e8" stroke-width="2"/>
      <line x1="12" y1="13" x2="28" y2="13" stroke="#174ea6" stroke-width="2.2"/>
      <line x1="12" y1="13" x2="20" y2="28" stroke="#174ea6" stroke-width="2.2"/>
      <line x1="28" y1="13" x2="20" y2="28" stroke="#174ea6" stroke-width="2.2"/>
      <circle cx="12" cy="13" r="4.5" fill="#1a73e8"/>
      <circle cx="28" cy="13" r="4.5" fill="#34a853"/>
      <circle cx="20" cy="28" r="4.5" fill="#fbbc04"/>
    </svg>
  `),
  bigquery_analytics: svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
      <rect x="2" y="2" width="36" height="36" rx="8" fill="#e8f0fe" stroke="#1a73e8" stroke-width="2"/>
      <circle cx="18" cy="18" r="9" fill="none" stroke="#1a73e8" stroke-width="2.5"/>
      <rect x="13" y="17" width="2.6" height="5" fill="#1a73e8"/>
      <rect x="16.8" y="13" width="2.6" height="9" fill="#34a853"/>
      <rect x="20.6" y="15" width="2.6" height="7" fill="#fbbc04"/>
      <line x1="24.5" y1="24.5" x2="31" y2="31" stroke="#174ea6" stroke-width="3" stroke-linecap="round"/>
    </svg>
  `),
  discovery_engine: svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
      <rect x="2" y="2" width="36" height="36" rx="8" fill="#f3e8fd" stroke="#8430ce" stroke-width="2"/>
      <path d="M20 7 L23.5 16.5 L33 20 L23.5 23.5 L20 33 L16.5 23.5 L7 20 L16.5 16.5 Z" fill="#9334e6"/>
      <circle cx="20" cy="20" r="3.2" fill="#ffffff"/>
    </svg>
  `),
  dms_migration: svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
      <rect x="2" y="2" width="36" height="36" rx="8" fill="#e6f4ea" stroke="#137333" stroke-width="2"/>
      <ellipse cx="13" cy="14" rx="6" ry="3" fill="#34a853"/>
      <path d="M7 14 V24 C7 25.7 9.7 27 13 27 C16.3 27 19 25.7 19 24 V14" fill="none" stroke="#137333" stroke-width="2"/>
      <path d="M21 20 H32 M28 16 L32 20 L28 24" fill="none" stroke="#1a73e8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `),
  cloud_armor: svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
      <rect x="2" y="2" width="36" height="36" rx="8" fill="#e8f0fe" stroke="#1a73e8" stroke-width="2"/>
      <path d="M20 6 L32 11 V20 C32 27.8 26.8 32.8 20 35 C13.2 32.8 8 27.8 8 20 V11 Z" fill="#4285f4"/>
      <path d="M20 6 V35 C26.8 32.8 32 27.8 32 20 V11 Z" fill="#1967d2"/>
      <path d="M20 11 L27 14 V19.5 C27 24.5 23.8 28 20 29.8 C16.2 28 13 24.5 13 19.5 V14 Z" fill="#ffffff"/>
      <path d="M20 14 L24 16 V19.5 C24 22.8 22.1 25.2 20 26.4 C17.9 25.2 16 22.8 16 19.5 V16 Z" fill="#1a73e8"/>
    </svg>
  `),
  gke: svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
      <rect x="2" y="2" width="36" height="36" rx="8" fill="#e8f0fe" stroke="#1a73e8" stroke-width="2"/>
      <polygon points="20,6 32,13 32,27 20,34 8,27 8,13" fill="#4285f4" stroke="#174ea6" stroke-width="1.8"/>
      <circle cx="20" cy="20" r="6.5" fill="none" stroke="#ffffff" stroke-width="2.2"/>
      <circle cx="20" cy="20" r="2.2" fill="#ffffff"/>
      <line x1="20" y1="10" x2="20" y2="13.5" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
      <line x1="20" y1="26.5" x2="20" y2="30" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
      <line x1="11.3" y1="15" x2="14.4" y2="16.8" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
      <line x1="25.6" y1="23.2" x2="28.7" y2="25" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
      <line x1="28.7" y1="15" x2="25.6" y2="16.8" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
      <line x1="14.4" y1="23.2" x2="11.3" y2="25" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `),
  vpc_network: svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
      <rect x="2" y="2" width="36" height="36" rx="8" fill="#e6f4ea" stroke="#137333" stroke-width="2"/>
      <line x1="12" y1="12" x2="28" y2="12" stroke="#137333" stroke-width="2.4"/>
      <line x1="12" y1="12" x2="12" y2="28" stroke="#137333" stroke-width="2.4"/>
      <line x1="28" y1="12" x2="28" y2="28" stroke="#137333" stroke-width="2.4"/>
      <line x1="12" y1="28" x2="28" y2="28" stroke="#137333" stroke-width="2.4"/>
      <rect x="8" y="8" width="8" height="8" rx="2" fill="#34a853" stroke="#137333" stroke-width="1.5"/>
      <rect x="24" y="8" width="8" height="8" rx="2" fill="#1a73e8" stroke="#174ea6" stroke-width="1.5"/>
      <rect x="8" y="24" width="8" height="8" rx="2" fill="#1a73e8" stroke="#174ea6" stroke-width="1.5"/>
      <rect x="24" y="24" width="8" height="8" rx="2" fill="#34a853" stroke="#137333" stroke-width="1.5"/>
    </svg>
  `),
  cloud_storage: svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
      <rect x="2" y="2" width="36" height="36" rx="8" fill="#e8f0fe" stroke="#1a73e8" stroke-width="2"/>
      <polygon points="8,11 32,11 29,31 11,31" fill="#4285f4" stroke="#174ea6" stroke-width="1.8" stroke-linejoin="round"/>
      <rect x="7" y="9" width="26" height="4" rx="1.5" fill="#174ea6"/>
      <line x1="14" y1="17" x2="26" y2="17" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round"/>
      <line x1="15" y1="23" x2="25" y2="23" stroke="#aecbfa" stroke-width="2.2" stroke-linecap="round"/>
    </svg>
  `),
  cloud_sdp_dlp: svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
      <rect x="2" y="2" width="36" height="36" rx="8" fill="#e8f0fe" stroke="#1a73e8" stroke-width="2"/>
      <path d="M20 6 L31 10.5 V19.5 C31 26.8 26.2 31.8 20 34 C13.8 31.8 9 26.8 9 19.5 V10.5 Z" fill="#1a73e8" opacity="0.16" stroke="#174ea6" stroke-width="2"/>
      <circle cx="19" cy="19" r="5.5" fill="none" stroke="#174ea6" stroke-width="2.4"/>
      <circle cx="19" cy="19" r="2" fill="#ea4335"/>
      <line x1="23" y1="23" x2="28" y2="28" stroke="#174ea6" stroke-width="2.6" stroke-linecap="round"/>
    </svg>
  `),
  terraform_iac: svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
      <rect x="2" y="2" width="36" height="36" rx="8" fill="#f3e8fd" stroke="#7c3aed" stroke-width="2"/>
      <polygon points="8,8 18,13.5 18,24.5 8,19" fill="#7c3aed"/>
      <polygon points="20,14.5 30,20 30,31 20,25.5" fill="#6d28d9"/>
      <polygon points="31.5,14.5 35,12.5 35,23.5 31.5,25.5" fill="#a78bfa"/>
      <polygon points="8,21.5 18,27 18,35 8,29.5" fill="#5b21b6"/>
    </svg>
  `),
  alloydb: svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
      <rect x="2" y="2" width="36" height="36" rx="8" fill="#e8f0fe" stroke="#1a73e8" stroke-width="2"/>
      <ellipse cx="20" cy="12" rx="10" ry="4" fill="#4285f4" stroke="#174ea6" stroke-width="1.8"/>
      <path d="M10 12 V20 C10 22.2 14.5 24 20 24 C25.5 24 30 22.2 30 20 V12" fill="none" stroke="#174ea6" stroke-width="2"/>
      <path d="M10 20 V28 C10 30.2 14.5 32 20 32 C25.5 32 30 30.2 30 28 V20" fill="none" stroke="#137333" stroke-width="2"/>
      <circle cx="20" cy="20" r="2.5" fill="#34a853"/>
    </svg>
  `),
  cloud_trace: svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
      <rect x="2" y="2" width="36" height="36" rx="8" fill="#fef7e0" stroke="#ea8600" stroke-width="2"/>
      <rect x="8" y="10" width="14" height="4" rx="2" fill="#1a73e8"/>
      <rect x="13" y="18" width="16" height="4" rx="2" fill="#f29900"/>
      <rect x="18" y="26" width="14" height="4" rx="2" fill="#34a853"/>
    </svg>
  `),
  apigee_gateway: svgToDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
      <rect x="2" y="2" width="36" height="36" rx="8" fill="#e6f4ea" stroke="#137333" stroke-width="2"/>
      <circle cx="20" cy="20" r="8" fill="none" stroke="#137333" stroke-width="2.4"/>
      <path d="M8 20 H12 M28 20 H32 M20 8 V12 M20 28 V32" stroke="#1a73e8" stroke-width="2.4" stroke-linecap="round"/>
      <circle cx="20" cy="20" r="3" fill="#34a853"/>
    </svg>
  `),
};

export function resolveArchIconUri(iconKey: string, title = '', _sub = ''): string {
  const titleLower = String(title || '').toLowerCase();
  if (
    titleLower.includes('cloud armor') ||
    (titleLower.includes('armor') && !titleLower.includes('model armor'))
  ) {
    return EXTRA_GCP_ICONS.cloud_armor;
  }
  if (titleLower.includes('gke') || titleLower.includes('kubernetes') || titleLower.includes('gvisor')) {
    return EXTRA_GCP_ICONS.gke;
  }
  if (
    titleLower.includes('kms') ||
    titleLower.includes('cmek') ||
    titleLower.includes('ekm') ||
    titleLower.includes('hsm') ||
    titleLower.includes('keyring')
  ) {
    return EXTRA_GCP_ICONS.cloud_kms;
  }
  if (
    titleLower.includes('vpc-sc') ||
    titleLower.includes('access_context') ||
    titleLower.includes('perimeter')
  ) {
    return EXTRA_GCP_ICONS.vpc_sc;
  }
  if (
    titleLower.includes('psc') ||
    titleLower.includes('private service connect') ||
    titleLower.includes('serviceattachment') ||
    titleLower.includes('service_attachment') ||
    titleLower.includes('forwarding_rule')
  ) {
    return EXTRA_GCP_ICONS.psc_bridge;
  }
  if (
    titleLower.includes('_vpc') ||
    titleLower.includes('_subnet') ||
    titleLower.includes('compute_network') ||
    titleLower.includes('compute_subnetwork') ||
    titleLower.includes('vpc & subnet')
  ) {
    return EXTRA_GCP_ICONS.vpc_network;
  }
  if (
    titleLower.includes('gcs') ||
    titleLower.includes('cloud storage') ||
    titleLower.includes('storage & container')
  ) {
    return EXTRA_GCP_ICONS.cloud_storage;
  }
  if (
    titleLower.includes('sdp') ||
    titleLower.includes('dlp') ||
    titleLower.includes('sensitive data protection')
  ) {
    return EXTRA_GCP_ICONS.cloud_sdp_dlp;
  }
  if (
    titleLower.includes('terraform') ||
    titleLower.includes('provider ') ||
    titleLower.includes('variables.tf') ||
    titleLower.includes('var.tenant_id')
  ) {
    return EXTRA_GCP_ICONS.terraform_iac;
  }
  if (
    titleLower.includes('redis') ||
    titleLower.includes('valkey') ||
    titleLower.includes('rate bulkhead') ||
    titleLower.includes('429')
  ) {
    return EXTRA_GCP_ICONS.valkey_cache;
  }
  if (titleLower.includes('firestore') || titleLower.includes('route table')) {
    return EXTRA_GCP_ICONS.firestore_db;
  }
  if (titleLower.includes('alloydb')) {
    return EXTRA_GCP_ICONS.alloydb;
  }
  if (
    titleLower.includes('spanner') ||
    titleLower.includes('graphrag') ||
    titleLower.includes('gql')
  ) {
    return EXTRA_GCP_ICONS.spanner_graph;
  }
  if (titleLower.includes('trace') || titleLower.includes('monitoring')) {
    return EXTRA_GCP_ICONS.cloud_trace;
  }
  if (titleLower.includes('apigee') || titleLower.includes('obo') || titleLower.includes('dpop')) {
    return EXTRA_GCP_ICONS.apigee_gateway;
  }
  if (
    titleLower.includes('bigquery') ||
    titleLower.includes('bq') ||
    titleLower.includes('otel') ||
    titleLower.includes('chargeback')
  ) {
    return EXTRA_GCP_ICONS.bigquery_analytics;
  }
  if (
    titleLower.includes('registry') ||
    titleLower.includes('discovery engine') ||
    titleLower.includes('catalog') ||
    titleLower.includes('agent card')
  ) {
    return EXTRA_GCP_ICONS.discovery_engine;
  }
  if (titleLower.includes('shadow_sync') || titleLower.includes('dms')) {
    return EXTRA_GCP_ICONS.dms_migration;
  }
  if (EXTRA_GCP_ICONS[iconKey]) return EXTRA_GCP_ICONS[iconKey];
  return OFFICIAL_ASSETS[iconKey] || OFFICIAL_ASSETS.gemini_agent_platform;
}


