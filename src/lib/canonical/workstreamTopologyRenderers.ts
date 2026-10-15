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
};

export function resolveArchIconUri(iconKey: string, title = '', _sub = ''): string {
  if (EXTRA_GCP_ICONS[iconKey]) return EXTRA_GCP_ICONS[iconKey];
  const titleLower = String(title || '').toLowerCase();
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
  if (
    titleLower.includes('spanner') ||
    titleLower.includes('graphrag') ||
    titleLower.includes('gql')
  ) {
    return EXTRA_GCP_ICONS.spanner_graph;
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
  return OFFICIAL_ASSETS[iconKey] || OFFICIAL_ASSETS.gemini_agent_platform;
}
