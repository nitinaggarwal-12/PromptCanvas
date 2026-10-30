import { GOOGLE_CLOUD_OFFICIAL_SVG } from '@/lib/gcpOfficialSvgAssets';
import { AWS_AND_VENDOR_OFFICIAL_SVG } from '@/lib/awsOfficialSvgAssets';

function svgToDrawioDataUri(rawSvg: string): string {
  const cleaned = rawSvg
    .replace(/<\?xml[^>]*\?>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  const b64 = Buffer.from(cleaned, 'utf8').toString('base64');
  // Draw.io style strings delimit properties with `;`, so `data:image/svg+xml,<urlencoded>` or base64?
  // Wait: in Draw.io `image=data:image/svg+xml,...`, `data:image/svg+xml;base64,...` has a semicolon `;` which Draw.io's style parser splits on unless URL-encoded (`data:image/svg+xml,`)!
  void b64;
  return `data:image/svg+xml,${encodeURIComponent(cleaned)}`;
}

const GENERIC_OFFLINE_SVGS: Record<string, string> = {
  open_table: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="2.5" fill="#EFF6FF" stroke="#2563EB" stroke-width="1.8"/><line x1="3" y1="9.5" x2="21" y2="9.5" stroke="#2563EB" stroke-width="1.6"/><line x1="9" y1="9.5" x2="9" y2="20" stroke="#60A5FA" stroke-width="1.4"/><line x1="15" y1="9.5" x2="15" y2="20" stroke="#60A5FA" stroke-width="1.4"/><line x1="3" y1="14.8" x2="21" y2="14.8" stroke="#60A5FA" stroke-width="1.4"/></svg>`,
  catalog: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z" fill="#F3E8FF" stroke="#7C3AED" stroke-width="1.8"/><circle cx="12" cy="12" r="3" fill="#7C3AED"/></svg>`,
  spark: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><polygon points="12,2 14.9,8.6 22,9.3 16.6,14 18.2,21 12,17.3 5.8,21 7.4,14 2,9.3 9.1,8.6" fill="#FEF3C7" stroke="#D97706" stroke-width="1.7" stroke-linejoin="round"/></svg>`,
  stream: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><circle cx="6" cy="7" r="2.5" fill="#DBEAFE" stroke="#1D4ED8" stroke-width="1.7"/><circle cx="6" cy="17" r="2.5" fill="#DBEAFE" stroke="#1D4ED8" stroke-width="1.7"/><circle cx="18" cy="12" r="2.8" fill="#DBEAFE" stroke="#1D4ED8" stroke-width="1.7"/><path d="M8.5 7.8L15.3 11M8.5 16.2L15.3 13" stroke="#1D4ED8" stroke-width="1.7" stroke-linecap="round"/></svg>`,
  database: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="6" rx="7.5" ry="3" fill="#E0F2FE" stroke="#0284C7" stroke-width="1.7"/><path d="M4.5 6V18C4.5 19.66 7.86 21 12 21C16.14 21 19.5 19.66 19.5 18V6" stroke="#0284C7" stroke-width="1.7"/><path d="M4.5 12C4.5 13.66 7.86 15 12 15C16.14 15 19.5 13.66 19.5 12" stroke="#0284C7" stroke-width="1.5"/></svg>`,
  analytics_bi: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" fill="#ECFDF5" stroke="#059669" stroke-width="1.7"/><rect x="7" y="12" width="2.5" height="5.5" rx="0.8" fill="#059669"/><rect x="11" y="9" width="2.5" height="8.5" rx="0.8" fill="#10B981"/><rect x="15" y="6.5" width="2.5" height="11" rx="0.8" fill="#34D399"/></svg>`,
  user_actor: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3.8" fill="#F1F5F9" stroke="#334155" stroke-width="1.8"/><path d="M5 19.5C5 16.2 8.13 14 12 14C15.87 14 19 16.2 19 19.5" stroke="#334155" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  security_shield: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path d="M12 3L19 6V11.5C19 16.1 15.9 19.9 12 21C8.1 19.9 5 16.1 5 11.5V6L12 3Z" fill="#FEF2F2" stroke="#DC2626" stroke-width="1.7"/></svg>`,
  gateway: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="16" height="16" rx="3" fill="#EEF2FF" stroke="#4F46E5" stroke-width="1.7"/><path d="M8 12H16M13 9L16 12L13 15" stroke="#4F46E5" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  compute: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><rect x="6" y="6" width="12" height="12" rx="2" fill="#EFF6FF" stroke="#2563EB" stroke-width="1.7"/><rect x="9.5" y="9.5" width="5" height="5" rx="1" fill="#2563EB"/></svg>`,
};

/**
 * Resolves a clean, offline Draw.io-safe `data:image/svg+xml,...` icon URI from a label and/or semantic icon key.
 * Zero external network URLs and zero dependency on legacy poster/template decompilers.
 */
export function resolveFreeformIconDataUri(label: string, iconKey?: string): string | null {
  const hay = `${iconKey || ''} ${label || ''}`.toLowerCase();

  // Official Google Cloud icons
  if (/\bbigquery\b|\bbiglake\b/.test(hay) && GOOGLE_CLOUD_OFFICIAL_SVG.bigquery) {
    return svgToDrawioDataUri(GOOGLE_CLOUD_OFFICIAL_SVG.bigquery);
  }
  if (/\bcloud\s*storage\b|\bgcs\b|\bobject\s*storage\b/.test(hay) && GOOGLE_CLOUD_OFFICIAL_SVG.cloud_storage) {
    return svgToDrawioDataUri(GOOGLE_CLOUD_OFFICIAL_SVG.cloud_storage);
  }
  if (/\bvertex\b|\bgemini\b|\badk\b|\bmodel\s*garden\b/.test(hay) && GOOGLE_CLOUD_OFFICIAL_SVG.vertex_ai) {
    return svgToDrawioDataUri(GOOGLE_CLOUD_OFFICIAL_SVG.vertex_ai);
  }
  if (/\bcloud\s*run\b/.test(hay) && GOOGLE_CLOUD_OFFICIAL_SVG.cloud_run) {
    return svgToDrawioDataUri(GOOGLE_CLOUD_OFFICIAL_SVG.cloud_run);
  }
  if (/\bspanner\b/.test(hay) && GOOGLE_CLOUD_OFFICIAL_SVG.spanner) {
    return svgToDrawioDataUri(GOOGLE_CLOUD_OFFICIAL_SVG.spanner);
  }
  if (/\bgke\b|\bkubernetes\b/.test(hay) && GOOGLE_CLOUD_OFFICIAL_SVG.gke) {
    return svgToDrawioDataUri(GOOGLE_CLOUD_OFFICIAL_SVG.gke);
  }
  if (/\bpub\/?sub\b/.test(hay) && GOOGLE_CLOUD_OFFICIAL_SVG.pubsub) {
    return svgToDrawioDataUri(GOOGLE_CLOUD_OFFICIAL_SVG.pubsub);
  }
  if (/\bdataflow\b|\bdataproc\b|\bcomposer\b/.test(hay) && GOOGLE_CLOUD_OFFICIAL_SVG.dataflow) {
    return svgToDrawioDataUri(GOOGLE_CLOUD_OFFICIAL_SVG.dataflow);
  }
  if (/\bcloud\s*armor\b|\bmodel\s*armor\b/.test(hay) && GOOGLE_CLOUD_OFFICIAL_SVG.cloud_armor) {
    return svgToDrawioDataUri(GOOGLE_CLOUD_OFFICIAL_SVG.cloud_armor);
  }
  if (/\biam\b|\bidentity\b/.test(hay) && GOOGLE_CLOUD_OFFICIAL_SVG.cloud_iam) {
    return svgToDrawioDataUri(GOOGLE_CLOUD_OFFICIAL_SVG.cloud_iam);
  }
  if (/\biap\b|\bbeyondcorp\b/.test(hay) && GOOGLE_CLOUD_OFFICIAL_SVG.iap) {
    return svgToDrawioDataUri(GOOGLE_CLOUD_OFFICIAL_SVG.iap);
  }
  if (/\bload\s*balanc|\balb\b|\bingress\b/.test(hay) && GOOGLE_CLOUD_OFFICIAL_SVG.cloud_load_balancing) {
    return svgToDrawioDataUri(GOOGLE_CLOUD_OFFICIAL_SVG.cloud_load_balancing);
  }
  if (/\bcdn\b/.test(hay) && GOOGLE_CLOUD_OFFICIAL_SVG.cloud_cdn) {
    return svgToDrawioDataUri(GOOGLE_CLOUD_OFFICIAL_SVG.cloud_cdn);
  }
  if (/\bmonitoring\b|\bprometheus\b|\bobservability\b|\btelemetry\b/.test(hay) && GOOGLE_CLOUD_OFFICIAL_SVG.cloud_monitoring) {
    return svgToDrawioDataUri(GOOGLE_CLOUD_OFFICIAL_SVG.cloud_monitoring);
  }
  if (/\blogging\b|\baudit\s*log/.test(hay) && GOOGLE_CLOUD_OFFICIAL_SVG.cloud_logging) {
    return svgToDrawioDataUri(GOOGLE_CLOUD_OFFICIAL_SVG.cloud_logging);
  }
  if (/\bmemorystore\b/.test(hay) && GOOGLE_CLOUD_OFFICIAL_SVG.memorystore) {
    return svgToDrawioDataUri(GOOGLE_CLOUD_OFFICIAL_SVG.memorystore);
  }

  // Official AWS & Multi-Cloud / Open-Source Vendor icons
  if (/\bdatabricks\b|\bdelta\s*lake\b|\bdelta\s*sharing\b|\bphoton\b|\bdbsql\b|\bmosaic\b/.test(hay) && AWS_AND_VENDOR_OFFICIAL_SVG['databricks-icon']) {
    return svgToDrawioDataUri(AWS_AND_VENDOR_OFFICIAL_SVG['databricks-icon']);
  }
  if (/\bpostgres|\balloydb\b|\bcloud\s*sql\b/.test(hay) && AWS_AND_VENDOR_OFFICIAL_SVG.postgresql) {
    return svgToDrawioDataUri(AWS_AND_VENDOR_OFFICIAL_SVG.postgresql);
  }
  if (/\bredis\b|\bcache\b/.test(hay) && AWS_AND_VENDOR_OFFICIAL_SVG.redis) {
    return svgToDrawioDataUri(AWS_AND_VENDOR_OFFICIAL_SVG.redis);
  }
  if (/\breact\b|\bfrontend\b|\bspa\b|\bweb\s*app\b/.test(hay) && AWS_AND_VENDOR_OFFICIAL_SVG.react) {
    return svgToDrawioDataUri(AWS_AND_VENDOR_OFFICIAL_SVG.react);
  }
  if (/\bnode\.?js\b|\bexpress\b/.test(hay) && AWS_AND_VENDOR_OFFICIAL_SVG['nodejs-icon']) {
    return svgToDrawioDataUri(AWS_AND_VENDOR_OFFICIAL_SVG['nodejs-icon']);
  }
  if (/\bs3\b/.test(hay) && AWS_AND_VENDOR_OFFICIAL_SVG['aws-s3']) {
    return svgToDrawioDataUri(AWS_AND_VENDOR_OFFICIAL_SVG['aws-s3']);
  }
  if (/\blambda\b/.test(hay) && AWS_AND_VENDOR_OFFICIAL_SVG['aws-lambda']) {
    return svgToDrawioDataUri(AWS_AND_VENDOR_OFFICIAL_SVG['aws-lambda']);
  }
  if (/\beks\b/.test(hay) && AWS_AND_VENDOR_OFFICIAL_SVG['aws-eks']) {
    return svgToDrawioDataUri(AWS_AND_VENDOR_OFFICIAL_SVG['aws-eks']);
  }
  if (/\bkinesis\b/.test(hay) && AWS_AND_VENDOR_OFFICIAL_SVG['aws-kinesis']) {
    return svgToDrawioDataUri(AWS_AND_VENDOR_OFFICIAL_SVG['aws-kinesis']);
  }
  if (/\bmsk\b/.test(hay) && AWS_AND_VENDOR_OFFICIAL_SVG['aws-msk']) {
    return svgToDrawioDataUri(AWS_AND_VENDOR_OFFICIAL_SVG['aws-msk']);
  }
  if (/\bdynamodb\b/.test(hay) && AWS_AND_VENDOR_OFFICIAL_SVG['aws-dynamodb']) {
    return svgToDrawioDataUri(AWS_AND_VENDOR_OFFICIAL_SVG['aws-dynamodb']);
  }
  if (/\bredshift\b/.test(hay) && AWS_AND_VENDOR_OFFICIAL_SVG['aws-redshift']) {
    return svgToDrawioDataUri(AWS_AND_VENDOR_OFFICIAL_SVG['aws-redshift']);
  }
  if (/\bglue\b/.test(hay) && AWS_AND_VENDOR_OFFICIAL_SVG['aws-glue']) {
    return svgToDrawioDataUri(AWS_AND_VENDOR_OFFICIAL_SVG['aws-glue']);
  }
  if (/\bsagemaker\b/.test(hay) && AWS_AND_VENDOR_OFFICIAL_SVG.sagemaker) {
    return svgToDrawioDataUri(AWS_AND_VENDOR_OFFICIAL_SVG.sagemaker);
  }

  // Clean vector fallback icons by semantic category
  if (/\biceberg\b|\bparquet\b|\bhudi\b|\bopen\s*table\b/.test(hay)) {
    return svgToDrawioDataUri(GENERIC_OFFLINE_SVGS.open_table);
  }
  if (/\bunity\s*catalog\b|\bmetastore\b|\bdataplex\b|\bcatalog\b|\bgovernance\b|\blineage\b/.test(hay)) {
    return svgToDrawioDataUri(GENERIC_OFFLINE_SVGS.catalog);
  }
  if (/\bspark\b|\bmlflow\b|\bfeature\s*store\b/.test(hay)) {
    return svgToDrawioDataUri(GENERIC_OFFLINE_SVGS.spark);
  }
  if (/\bkafka\b|\bcd[cc]\b|\bstream|\bevent/.test(hay)) {
    return svgToDrawioDataUri(GENERIC_OFFLINE_SVGS.stream);
  }
  if (/\blooker\b|\btableau\b|\bgrafana\b|\bbi\b|\bdashboard\b|\banalytics\b/.test(hay)) {
    return svgToDrawioDataUri(GENERIC_OFFLINE_SVGS.analytics_bi);
  }
  if (/\buser\b|\bactor\b|\bclient\b|\banalyst\b|\bengineer\b|\bscientist\b/.test(hay)) {
    return svgToDrawioDataUri(GENERIC_OFFLINE_SVGS.user_actor);
  }
  if (/\bkms\b|\bvpc-sc\b|\bfirewall\b|\bwaf\b|\bsecurity\b|\bpolicy\b/.test(hay)) {
    return svgToDrawioDataUri(GENERIC_OFFLINE_SVGS.security_shield);
  }
  if (/\bgateway\b|\bproxy\b|\bapi\b|\binterconnect\b|\brouter\b/.test(hay)) {
    return svgToDrawioDataUri(GENERIC_OFFLINE_SVGS.gateway);
  }
  if (/\bdb\b|\bdatabase\b|\boltp\b|\berp\b|\bcrm\b|\bsql\b/.test(hay)) {
    return svgToDrawioDataUri(GENERIC_OFFLINE_SVGS.database);
  }
  if (iconKey) {
    return svgToDrawioDataUri(GENERIC_OFFLINE_SVGS.compute);
  }
  return null;
}
