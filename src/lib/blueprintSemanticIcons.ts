/**
 * 🎨 Blueprint Semantic Icons Engine (100% Offline & Self-Contained)
 * 
 * Embeds zero-network-dependency, inline SVG Data URIs across all cloud vendors
 * (GCP, AWS, Azure, OCI, Kubernetes, Kafka, Snowflake, Databricks, AI, DevOps).
 * Guarantees 100% offline, headless, and air-gapped rendering with zero CDN latency.
 */

const svgUri = (svg: string) => `data:image/svg+xml,${encodeURIComponent(svg.trim())}`;

// 1. Hyperscaler & Vendor Marks
const SVG_GCP = svgUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>`);

const SVG_AWS = svgUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="8" fill="#232F3E"/><path fill="#FF9900" d="M14 26.5c-2.4 0-4.3-.8-5.7-2.3l2.2-2.4c.9 1 2.2 1.6 3.5 1.6 1.8 0 2.8-1 2.8-2.6v-.3c-.8.5-1.9.8-3.1.8-3.2 0-5.5-1.8-5.5-4.8 0-3.3 2.6-5.1 6.1-5.1 1.7 0 3 .5 3.9 1.4v-1.1h3.3v10.8c0 2.5-.9 4.3-2.6 5.3-1.3.8-3.1 1.2-4.9 1.2zm1.7-8.8c0-1.6-1.1-2.6-2.9-2.6-1.8 0-2.8 1-2.8 2.3 0 1.3 1 2.2 2.7 2.2.9 0 1.8-.3 2.5-.7v-1.2zm10.7 8.5l-3.8-14.4h3.6l2.3 10.5 2.5-10.5h3.4l2.5 10.5 2.3-10.5h3.6l-3.8 14.4h-3.6l-2.7-10.7-2.7 10.7h-3.6zm-17 9.8c8.8 3.5 18.8 2.2 26.2-2.6.4-.3.9.2.6.6-7.8 5.6-18.8 6.9-27.4 2.8-.5-.2-.1-.9.6-.8zm27.4-1.3c.3-.4 1.9-1.2 2.3-.9.4.3-.2 2-1 2.8-.6.6-1.8.8-2.1.4-.3-.3.2-1.8.8-2.3z"/></svg>`);

const SVG_AZURE = svgUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="#0078D4" d="M17.4 4L4 39.5h10.2L27.6 4z"/><path fill="#50E6FF" d="M29.6 13.7L18.4 34.6 23.8 39.5h18.2L44 34z"/><path fill="#005BA1" d="M14.2 39.5l4.2-4.9 9.2-20.9 2-4.6z"/></svg>`);

const SVG_OCI = svgUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="8" fill="#C74634"/><path fill="#FFFFFF" d="M14.5 15C9.3 15 5 19 5 24s4.3 9 9.5 9h19c5.2 0 9.5-4 9.5-9s-4.3-9-9.5-9h-19zm0 5h19c2.5 0 4.5 1.8 4.5 4s-2 4-4.5 4h-19c-2.5 0-4.5-1.8-4.5-4s2-4 4.5-4z"/></svg>`);

// 2. Containers, Orchestration & DevOps
const SVG_KUBERNETES = svgUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><circle cx="24" cy="24" r="22" fill="#326CE5"/><path fill="#FFFFFF" d="M24 8l13 7.5v15L24 38 11 30.5v-15L24 8zm0 4.5L14.8 17.8v10.4L24 33.5l9.2-5.3V17.8L24 12.5z"/><circle cx="24" cy="24" r="4" fill="#FFFFFF"/></svg>`);

const SVG_DOCKER = svgUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="8" fill="#2496ED"/><path fill="#FFFFFF" d="M13 19h4v4h-4zm5 0h4v4h-4zm5 0h4v4h-4zm-10 5h4v4h-4zm5 0h4v4h-4zm5 0h4v4h-4zm5 0h4v4h-4zm-15 5h23c3 0 5-2 6-5 1 2 1 5-2 7-4 3-10 3-18 2-3-.5-6-2-9-4z"/></svg>`);

const SVG_TERRAFORM = svgUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="8" fill="#844FBA"/><path fill="#FFFFFF" d="M12 11h9v11h-9zm11 0h9v11h-9zm-11 13h9v11h-9zm11 0h9v11h-9zm11-7h9v11h-9z"/></svg>`);

const SVG_GITHUB = svgUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><circle cx="24" cy="24" r="22" fill="#181717"/><path fill="#FFFFFF" d="M24 10C16.3 10 10 16.3 10 24c0 6.2 4 11.4 9.6 13.3.7.1 1-.3 1-.7v-2.4c-3.9.8-4.7-1.9-4.7-1.9-.6-1.6-1.5-2.1-1.5-2.1-1.3-.9.1-.9.1-.9 1.4.1 2.2 1.5 2.2 1.5 1.3 2.2 3.3 1.5 4.1 1.2.1-.9.5-1.5.9-1.9-3.1-.4-6.4-1.6-6.4-7 0-1.5.5-2.8 1.4-3.8-.1-.4-.6-1.8.1-3.7 0 0 1.2-.4 3.9 1.5 1.1-.3 2.3-.5 3.5-.5s2.4.2 3.5.5c2.7-1.9 3.9-1.5 3.9-1.5.7 1.9.3 3.3.1 3.7.9 1 1.4 2.3 1.4 3.8 0 5.4-3.3 6.6-6.4 7 .5.4.9 1.3.9 2.6v3.9c0 .4.3.8 1 .7C34 35.4 38 30.2 38 24c0-7.7-6.3-14-14-14z"/></svg>`);

const SVG_GITLAB = svgUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="#E24329" d="M24 39.5L13.8 8.1l-6.2 19z"/><path fill="#FC6D26" d="M24 39.5L34.2 8.1l6.2 19z"/><path fill="#FCA326" d="M7.6 27.1L4.2 16.6c-.3-.9.8-1.7 1.5-1.1l8.1 6.2z"/><path fill="#FCA326" d="M40.4 27.1l3.4-10.5c.3-.9-.8-1.7-1.5-1.1l-8.1 6.2z"/></svg>`);

const SVG_ARGOCD = svgUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><circle cx="24" cy="24" r="22" fill="#EF6B48"/><path fill="#FFFFFF" d="M24 12c-6.6 0-12 5.4-12 12 0 4.4 2.4 8.2 6 10.3v-4.4c-1.8-1.5-3-3.8-3-6.4 0-4.7 3.8-8.5 8.5-8.5s8.5 3.8 8.5 8.5c0 2.6-1.2 4.9-3 6.4v4.4c3.6-2.1 6-5.9 6-10.3 0-6.6-5.4-12-12-12zm-3 10c0-1.7 1.3-3 3-3s3 1.3 3 3v6h-6v-6z"/></svg>`);

// 3. Data, Lakehouse, Streaming & Caching
const SVG_KAFKA = svgUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="8" fill="#231F20"/><circle cx="24" cy="14" r="4" fill="#FFFFFF"/><circle cx="16" cy="30" r="4" fill="#FFFFFF"/><circle cx="32" cy="30" r="4" fill="#FFFFFF"/><path stroke="#FFFFFF" stroke-width="2.5" d="M24 14L16 30M24 14L32 30"/></svg>`);

const SVG_POSTGRES = svgUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><circle cx="24" cy="24" r="22" fill="#336791"/><path fill="#FFFFFF" d="M24 10c-7.7 0-14 6.3-14 14 0 4.8 2.4 9 6.1 11.6l1.9-3.2c-2.8-2-4.5-5.2-4.5-8.9 0-5.8 4.7-10.5 10.5-10.5s10.5 4.7 10.5 10.5c0 3.7-1.7 6.9-4.5 8.9l1.9 3.2C33.6 33 36 28.8 36 24c0-7.7-6.3-14-14-14zm0 7c-3.9 0-7 3.1-7 7s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7z"/></svg>`);

const SVG_REDIS = svgUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="8" fill="#DC382D"/><path fill="#FFFFFF" d="M24 10l13 7.5v13L24 38 11 30.5v-13L24 10zm0 4.2L14.7 19 24 23.8l9.3-4.8L24 14.2z"/></svg>`);

const SVG_SNOWFLAKE = svgUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><circle cx="24" cy="24" r="22" fill="#29B5E8"/><path stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" d="M24 8v32M10 16l28 16M10 32l28-16M19 11l5 5 5-5M19 37l5-5 5 5M12 21l6 3-6 3M36 21l-6 3 6 3"/></svg>`);

const SVG_DATABRICKS = svgUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="8" fill="#FF3621"/><path fill="#FFFFFF" d="M24 10l12 7-12 7-12-7 12-7zm0 10l12 7-12 7-12-7 12-7zm0 10l12 7-12 7-12-7 12-7z"/></svg>`);

const SVG_DBT = svgUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="8" fill="#FF694B"/><path fill="#FFFFFF" d="M24 10l11 11-11 11-11-11 11-11zm0 6l-5 5 5 5 5-5-5-5zm-8 12l3 3-3 3-3-3 3-3zm16 0l3 3-3 3-3-3 3-3z"/></svg>`);

const SVG_SPARK = svgUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="8" fill="#E25A1C"/><path fill="#FFFFFF" d="M24 10l4 9 9 4-9 4-4 9-4-9-9-4 9-4 4-9zm8 17l2 4 4 2-4 2-2 4-2-4-4-2 4-2 2-4z"/></svg>`);

const SVG_MONGODB = svgUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><circle cx="24" cy="24" r="22" fill="#47A248"/><path fill="#FFFFFF" d="M24 8s-9 9.5-9 16.5c0 6.5 4.8 11.5 9 13.5 4.2-2 9-7 9-13.5C33 17.5 24 8 24 8zm0 25c-2.5-1.5-5-4.5-5-8.5 0-3.5 3.5-7.5 5-9.5 1.5 2 5 6 5 9.5 0 4-2.5 7-5 8.5z"/></svg>`);

const SVG_ELASTIC = svgUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><circle cx="24" cy="24" r="22" fill="#005571"/><circle cx="24" cy="16" r="5" fill="#FED100"/><circle cx="16" cy="30" r="5" fill="#00BFB3"/><circle cx="32" cy="30" r="5" fill="#F04E98"/></svg>`);

// 4. AI Models & Agents
const SVG_OPENAI = svgUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><circle cx="24" cy="24" r="22" fill="#000000"/><path fill="#FFFFFF" d="M24 12c-6.6 0-12 5.4-12 12 0 2.2.6 4.3 1.7 6.1l2.5-1.5C15.4 27.2 15 25.6 15 24c0-5 4-9 9-9 2.2 0 4.2.8 5.7 2.1l2-2C29.6 13.2 26.9 12 24 12zm8.3 5.9l-2.5 1.5c.8 1.4 1.2 3 1.2 4.6 0 5-4 9-9 9-2.2 0-4.2-.8-5.7-2.1l-2 2C18.4 34.8 21.1 36 24 36c6.6 0 12-5.4 12-12 0-2.2-.6-4.3-1.7-6.1z"/></svg>`);

const SVG_ANTHROPIC = svgUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><circle cx="24" cy="24" r="22" fill="#D97706"/><path stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" d="M24 12v24M12 24h24M15 15l18 18M15 33l18-18"/></svg>`);

const SVG_GEMINI = svgUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><circle cx="24" cy="24" r="22" fill="#1E293B"/><path fill="#38BDF8" d="M24 8c0 8.8-7.2 16-16 16 8.8 0 16 7.2 16 16 0-8.8 7.2-16 16-16-8.8 0-16-7.2-16-16z"/></svg>`);

// 5. SRE, Observability & Security
const SVG_DATADOG = svgUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="8" fill="#632CA6"/><path fill="#FFFFFF" d="M14 16c0-2.2 1.8-4 4-4h12c2.2 0 4 1.8 4 4v16c0 2.2-1.8 4-4 4H18c-2.2 0-4-1.8-4-4V16zm4 2v12h12V18H18z"/></svg>`);

const SVG_GRAFANA = svgUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><circle cx="24" cy="24" r="22" fill="#F46800"/><circle cx="24" cy="24" r="8" fill="#FFFFFF"/></svg>`);

const SVG_PROMETHEUS = svgUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><circle cx="24" cy="24" r="22" fill="#E6522C"/><path fill="#FFFFFF" d="M24 10s-8 9-8 15c0 4.4 3.6 8 8 8s8-3.6 8-8c0-6-8-15-8-15zm0 18c-1.7 0-3-1.3-3-3 0-2.2 3-5.5 3-5.5s3 3.3 3 5.5c0 1.7-1.3 3-3 3z"/></svg>`);

const SVG_VAULT = svgUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="8" fill="#000000"/><circle cx="24" cy="22" r="5" fill="#FFFFFF"/><path fill="#FFFFFF" d="M22 25h4v9h-4z"/></svg>`);

const SVG_CLOUDFLARE = svgUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="8" fill="#F38020"/><path fill="#FFFFFF" d="M31 19c-1.2-3.5-4.5-6-8.5-6-4.6 0-8.4 3.4-9 7.9-3.4.6-6 3.5-6 7.1 0 4 3.2 7 7.2 7h19.5c3.7 0 6.8-3 6.8-6.8 0-3.5-2.7-6.4-6-6.8-.2-.8-.6-1.6-1-2.4z"/></svg>`);

// 6. Enterprise SaaS
const SVG_SALESFORCE = svgUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><circle cx="24" cy="24" r="22" fill="#00A1E0"/><path fill="#FFFFFF" d="M21 16c1.5-2.4 4.1-4 7-4 4.4 0 8 3.6 8 8 0 .4 0 .7-.1 1.1 2.4.9 4.1 3.2 4.1 5.9 0 3.6-2.9 6.5-6.5 6.5h-19c-3 0-5.5-2.5-5.5-5.5 0-2.6 1.8-4.7 4.3-5.3.4-3.8 3.7-6.7 7.7-6.7z"/></svg>`);

const SVG_SAP = svgUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="8" fill="#008FD3"/><text x="24" y="30" font-family="Arial,sans-serif" font-size="16" font-weight="900" fill="#FFFFFF" text-anchor="middle">SAP</text></svg>`);

const SVG_SERVICENOW = svgUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><circle cx="24" cy="24" r="22" fill="#81B5A1"/><circle cx="24" cy="24" r="10" fill="#FFFFFF"/></svg>`);

const SVG_SLACK = svgUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="8" fill="#4A154B"/><circle cx="17" cy="17" r="4" fill="#E01E5A"/><circle cx="31" cy="17" r="4" fill="#36C5F0"/><circle cx="31" cy="31" r="4" fill="#2EB67D"/><circle cx="17" cy="31" r="4" fill="#ECB22E"/></svg>`);

const SVG_MICROSOFT = svgUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect x="6" y="6" width="16" height="16" fill="#F25022"/><rect x="26" y="6" width="16" height="16" fill="#7FBA00"/><rect x="6" y="26" width="16" height="16" fill="#00A4EF"/><rect x="26" y="26" width="16" height="16" fill="#FFB900"/></svg>`);

const SVG_JIRA = svgUri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="8" fill="#0052CC"/><path fill="#FFFFFF" d="M24 12l10 10-10 10-10-10 10-10z"/></svg>`);

// Full Offline Semantic Icon Map
const ICONS = {
  gcp: SVG_GCP,
  aws: SVG_AWS,
  azure: SVG_AZURE,
  oci: SVG_OCI,
  kubernetes: SVG_KUBERNETES,
  docker: SVG_DOCKER,
  terraform: SVG_TERRAFORM,
  github: SVG_GITHUB,
  gitlab: SVG_GITLAB,
  argocd: SVG_ARGOCD,
  kafka: SVG_KAFKA,
  postgres: SVG_POSTGRES,
  redis: SVG_REDIS,
  snowflake: SVG_SNOWFLAKE,
  databricks: SVG_DATABRICKS,
  dbt: SVG_DBT,
  spark: SVG_SPARK,
  mongodb: SVG_MONGODB,
  elastic: SVG_ELASTIC,
  openai: SVG_OPENAI,
  anthropic: SVG_ANTHROPIC,
  gemini: SVG_GEMINI,
  datadog: SVG_DATADOG,
  grafana: SVG_GRAFANA,
  prometheus: SVG_PROMETHEUS,
  vault: SVG_VAULT,
  cloudflare: SVG_CLOUDFLARE,
  salesforce: SVG_SALESFORCE,
  sap: SVG_SAP,
  servicenow: SVG_SERVICENOW,
  slack: SVG_SLACK,
  microsoft: SVG_MICROSOFT,
  jira: SVG_JIRA,
};

const NOTATION_SENSITIVE_IDS = new Set([
  'erd',
  'sequence_diagram',
  'tech_c4_system_context',
  'c4_component_lld',
  'bpmn_process_workflow',
  'threat_modeling_stride',
  'data_lineage_provenance'
]);

type IconRule = { pattern: RegExp; icon: string; family: 'vendor' | 'product' };

const ICON_RULES: IconRule[] = [
  { pattern: /\bMicrosoft(?:\s+365)?\b|\bSharePoint\b|\bOneDrive\b|\bOutlook\b|\bTeams\b/i, icon: ICONS.microsoft, family: 'vendor' },
  { pattern: /\bSalesforce\b/i, icon: ICONS.salesforce, family: 'vendor' },
  { pattern: /\bSAP\b/i, icon: ICONS.sap, family: 'vendor' },
  { pattern: /\bServiceNow\b/i, icon: ICONS.servicenow, family: 'vendor' },
  { pattern: /\bGitHub\b/i, icon: ICONS.github, family: 'vendor' },
  { pattern: /\bGitLab\b/i, icon: ICONS.gitlab, family: 'vendor' },
  { pattern: /\bJira\b/i, icon: ICONS.jira, family: 'vendor' },
  { pattern: /\bConfluence\b|\bAtlassian\b/i, icon: ICONS.jira, family: 'vendor' },
  { pattern: /\bSlack\b/i, icon: ICONS.slack, family: 'vendor' },
  { pattern: /\bAWS\b|Amazon Web Services|\bAmazon\b|\bEKS\b|\bS3\b|\bDynamoDB\b|\bLambda\b|\bRedshift\b/i, icon: ICONS.aws, family: 'vendor' },
  { pattern: /\bAzure\b|Microsoft Azure|\bAKS\b|\bCosmos\b|\bSynapse\b/i, icon: ICONS.azure, family: 'vendor' },
  { pattern: /\bOCI\b|Oracle Cloud/i, icon: ICONS.oci, family: 'vendor' },
  { pattern: /\bGoogle Cloud\b|\bGCP\b|\bBigQuery\b|\bVertex AI\b|\bSpanner\b|\bAlloyDB\b/i, icon: ICONS.gcp, family: 'vendor' },
  { pattern: /\bTerraform\b/i, icon: ICONS.terraform, family: 'vendor' },
  { pattern: /\bKubernetes\b|\bK8s\b/i, icon: ICONS.kubernetes, family: 'vendor' },
  { pattern: /\bDocker\b/i, icon: ICONS.docker, family: 'vendor' },
  { pattern: /\bArgoCD\b|\bArgo\b/i, icon: ICONS.argocd, family: 'vendor' },
  { pattern: /\bKafka\b|\bRedpanda\b/i, icon: ICONS.kafka, family: 'vendor' },
  { pattern: /\bPostgreSQL\b|\bPostgres\b|\bpgvector\b/i, icon: ICONS.postgres, family: 'vendor' },
  { pattern: /\bRedis\b/i, icon: ICONS.redis, family: 'vendor' },
  { pattern: /\bSnowflake\b/i, icon: ICONS.snowflake, family: 'vendor' },
  { pattern: /\bDatabricks\b|\bUnity Catalog\b/i, icon: ICONS.databricks, family: 'vendor' },
  { pattern: /\bdbt\b|\bdbt Transformation\b/i, icon: ICONS.dbt, family: 'vendor' },
  { pattern: /\bSpark\b|\bApache Spark\b/i, icon: ICONS.spark, family: 'vendor' },
  { pattern: /\bMongoDB\b/i, icon: ICONS.mongodb, family: 'vendor' },
  { pattern: /\bElasticsearch\b|\bElastic\b/i, icon: ICONS.elastic, family: 'vendor' },
  { pattern: /\bOpenAI\b|\bGPT-4\b|\bChatGPT\b/i, icon: ICONS.openai, family: 'vendor' },
  { pattern: /\bAnthropic\b|\bClaude\b/i, icon: ICONS.anthropic, family: 'vendor' },
  { pattern: /\bGemini\b|\bVertex AI\b|\bAgent Runtime\b/i, icon: ICONS.gemini, family: 'vendor' },
  { pattern: /\bDatadog\b/i, icon: ICONS.datadog, family: 'vendor' },
  { pattern: /\bGrafana\b/i, icon: ICONS.grafana, family: 'vendor' },
  { pattern: /\bPrometheus\b/i, icon: ICONS.prometheus, family: 'vendor' },
  { pattern: /\bVault\b|\bHashiCorp Vault\b/i, icon: ICONS.vault, family: 'vendor' },
  { pattern: /\bCloudflare\b/i, icon: ICONS.cloudflare, family: 'vendor' },
];

const EMOJI_RE = /(?:\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]|\uD83D[\uDE80-\uDEFF]|\uD83E[\uDD00-\uDDFF]|[\u2600-\u27BF])\uFE0F?/g;
const GENERIC_ICON_SUFFIX_RE = /_(?:i|icon|logo|mark)$/i;
const BRAND_ALLOWLIST = new Set(['footer_gcp_logo', 'google_cloud_brand_logo']);

function attr(s: string, n: string) {
  return s.match(new RegExp(`\\b${n}="([^"]*)"`, 'i'))?.[1] || '';
}

function numAttr(s: string, n: string) {
  const v = Number(attr(s, n));
  return Number.isFinite(v) ? v : 0;
}

function stripEmoji(v: string) {
  return v.replace(EMOJI_RE, '').replace(/\uFE0F/g, '').replace(/\u200D/g, '');
}

function plainText(v: string) {
  return stripEmoji(v)
    .replace(/&lt;br\s*\/?&gt;/gi, ' ')
    .replace(/&lt;[^&]*?&gt;/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi,'"').replace(/&#39;/gi,"'").replace(/\s+/g,' ').trim();
}

function selectIcon(t: string) {
  return ICON_RULES.find(r => r.pattern.test(t)) || null;
}

function iconHtml(url: string, body: string, compact: boolean) {
  const sz = compact ? 22 : 28;
  const col = compact ? 30 : 38;
  return `&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:${col}px;vertical-align:middle;text-align:center;padding:0 5px 0 0;&quot;&gt;&lt;img src=&quot;${url}&quot; width=&quot;${sz}&quot; height=&quot;${sz}&quot; style=&quot;object-fit:contain;&quot;/&gt;&lt;/td&gt;&lt;td style=&quot;vertical-align:middle;text-align:left;min-width:0;&quot;&gt;${body}&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;`;
}

function geom(xml: string, id: string) {
  const m = xml.match(new RegExp(`<mxCell\\b[^>]*\\bid="${id}"[^>]*>[\\s\\S]*?<mxGeometry\\b([^>]*)`, 'i'));
  if (!m) return null;
  const g = m[1] || '';
  return { x: numAttr(g, 'x'), y: numAttr(g, 'y'), width: numAttr(g, 'width'), height: numAttr(g, 'height') };
}

function setG(a: string, k: string, v: number) {
  const r = new RegExp(`(\\b${k}=")[^"]*(")`, 'i');
  return r.test(a) ? a.replace(r, (_m, p1: string, p2: string) => `${p1}${v}${p2}`) : `${a} ${k}="${v}"`;
}

function associatedText(xml: string, base: string): { id: string; value: string } | null {
  for (const id of [base, `${base}_t`, `${base}_txt`, `${base}_label`, `${base}_title`, `${base}_hdr`, `${base}_h`]) {
    const m = xml.match(new RegExp(`<mxCell\\b[^>]*\\bid="${id}"[^>]*\\bvalue="([^"]+)"`, 'i'));
    if (m?.[1]) return { id, value: m[1] };
  }
  const p = xml.match(new RegExp(`<mxCell\\b[^>]*\\bid="${base}_[^"]+"[^>]*\\bvalue="([^"]+)"`, 'i'));
  return p?.[1] ? { id: '', value: p[1] } : null;
}

function expandText(xml: string, base: string) {
  const card = geom(xml, base);
  const text = associatedText(xml, base);
  if (!card || !text?.id || text.id === base) return xml;
  const re = new RegExp(`(<mxCell\\b[^>]*\\bid="${text.id}"[^>]*>)([\\s\\S]*?)(<\\/mxCell>)`, 'i');
  return xml.replace(re, (_f, o: string, b: string, c: string) => {
    const gm = b.match(/<mxGeometry\b([^>]*?)(?:\/)?\s*>/i);
    if (!gm) return `${o}${b}${c}`;
    let a = (gm[1] || '').trimEnd();
    a = setG(a, 'x', card.x + 14);
    a = setG(a, 'width', Math.max(40, card.width - 28));
    return `${o}${b.replace(gm[0], `<mxGeometry ${a.trim()}/>`)}${c}`;
  });
}

function replaceImgStyle(style: string, url: string) {
  return style.replace(/image=[^;]+;/i, `image=${url};`);
}

function neutralStyle(style: string) {
  let n = style
    .replace(/shape=image;?/gi, '')
    .replace(/image=[^;]+;?/gi, '')
    .replace(/imageAspect=[^;]+;?/gi, '')
    .replace(/aspect=[^;]+;?/gi, '');
  if (!/whiteSpace=/i.test(n)) n += 'whiteSpace=wrap;';
  if (!/html=/i.test(n)) n += 'html=1;';
  if (!/rounded=/i.test(n)) n += 'rounded=1;arcSize=8;';
  if (!/fillColor=/i.test(n)) n += 'fillColor=#FFFFFF;';
  if (!/strokeColor=/i.test(n)) n += 'strokeColor=#AECBFA;';
  if (!/spacing=/i.test(n)) n += 'spacing=6;';
  return n;
}

/** Any inline placeholder image inside a component/service cell is stripped to allow clean semantic icon injection */
function normalizeInlineServiceSvg(xml: string) {
  const cellRe = /<mxCell\b([^>]*\bvertex="1"[^>]*)>([\s\S]*?)<\/mxCell>/gi;
  let next = xml;
  for (const match of Array.from(xml.matchAll(cellRe))) {
    const full = match[0];
    const attrs = match[1] || '';
    const body = match[2] || '';
    const id = attr(attrs, 'id');
    const sm = attrs.match(/style="([^"]*)"/i);
    if (!sm) continue;
    const style = sm[1];
    if (!/shape=image/i.test(style) || BRAND_ALLOWLIST.has(id)) continue;
    const own = attr(attrs, 'value');
    const base = GENERIC_ICON_SUFFIX_RE.test(id) ? id.replace(GENERIC_ICON_SUFFIX_RE, '') : id;
    if (!own && GENERIC_ICON_SUFFIX_RE.test(id)) {
      next = next.replace(full, '');
      next = expandText(next, base);
    } else {
      next = next.replace(full, `<mxCell${attrs.replace(sm[0], `style="${neutralStyle(style)}"`)}>${body}</mxCell>`);
    }
  }
  return next;
}

export function applyBlueprintSemanticIcons(xml: string, architectureId?: string | null): string {
  if (!xml || xml.includes('pc-semantic-icons-v2')) return xml;
  const id = String(architectureId || '').toLowerCase();
  if (NOTATION_SENSITIVE_IDS.has(id)) return xml;
  let next = normalizeInlineServiceSvg(xml);
  const cellRe = /<mxCell\b([^>]*\bvertex="1"[^>]*)>([\s\S]*?)<\/mxCell>/gi;
  next = next.replace(cellRe, (full, attrs: string, body: string) => {
    const vm = attrs.match(/\bvalue="([^"]*)"/i);
    if (!vm) return full;
    const original = vm[1];
    const clean = stripEmoji(original);
    const style = attr(attrs, 'style');
    const g = body.match(/<mxGeometry\b([^>]*)\/?\s*>/i)?.[1] || '';
    const w = numAttr(g, 'width');
    const h = numAttr(g, 'height');
    const cellId = attr(attrs, 'id');
    const text = plainText(clean);
    const rule = selectIcon(text);
    const already = /&lt;img\b/i.test(clean) || /shape=image/i.test(style);
    const split = /(?:_t|_txt|_label|_title|_hdr)$/i.test(cellId);
    const protectedShape = /shape=(?:image|line|group)|ellipse|rhombus|hexagon|swimlane/i.test(style);
    const header = h <= 42 || (w >= 500 && h <= 70) || /fontSize=(?:1[5-9]|[2-9]\d)/i.test(style);
    const useful = w >= 135 && h >= 52 && text.length >= 3 && text.length <= 520;
    let replacement = clean;
    if (rule && !already && !split && !protectedShape && !header && useful) {
      replacement = iconHtml(rule.icon, clean, h < 70 || w < 190);
    }
    return replacement === original ? full : `<mxCell${attrs.replace(vm[0], `value="${replacement}"`)}>${body}</mxCell>`;
  });
  next = normalizeInlineServiceSvg(next).replace(EMOJI_RE, '').replace(/\uFE0F/g, '').replace(/\u200D/g, '');
  next = next.replace(/(<mxGraphModel\b)/, '<!-- pc-semantic-icons-v1 -->\n<!-- pc-semantic-icons-v2 -->\n$1');
  return next;
}

export const GENERIC_GOOGLE_BRAND_MARK = SVG_GCP;
