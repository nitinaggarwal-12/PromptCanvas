const GOOGLE_CLOUD_MARK = 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2078%2052%22%3E%3Cpath%20fill%3D%22%234285F4%22%20d%3D%22M30%2045h31a13%2013%200%200%200%201.8-25.9A20%2020%200%200%200%2025%2016.4%2014%2014%200%200%200%2030%2045z%22%2F%3E%3Cpath%20fill%3D%22%23EA4335%22%20d%3D%22M25%2016.4A20%2020%200%200%201%2042%206l5.7%2010H30z%22%2F%3E%3Cpath%20fill%3D%22%23FBBC05%22%20d%3D%22M25%2016.4A14%2014%200%200%200%2015%2030l11%202%208-13z%22%2F%3E%3Cpath%20fill%3D%22%2334A853%22%20d%3D%22M30%2045h13l-3-11-14-2z%22%2F%3E%3C%2Fsvg%3E';

const NOTATION_SENSITIVE_IDS = new Set([
  'erd',
  'sequence_diagram',
  'tech_c4_system_context',
  'c4_component_lld',
  'bpmn_process_workflow',
  'threat_modeling_stride',
  'data_lineage_provenance',
]);

// Google Cloud product icons below come from the official, unmodified Google Cloud
// icon library packaged by gcp-icons. Only verified product keys are used. If an exact
// product icon is not available, the card remains text-first rather than receiving a
// misleading generic Google mark.
const GCP_ICON_BASE = 'https://cdn.jsdelivr.net/npm/gcp-icons@1.0.6/dist/icons/';
const ICONS = {
  googleCloud: GOOGLE_CLOUD_MARK,
  agents: `${GCP_ICON_BASE}agents-512-color.svg`,
  alloydb: `${GCP_ICON_BASE}alloydb-512-color.svg`,
  apigee: `${GCP_ICON_BASE}apigee-512-color-rgb.svg`,
  bigquery: `${GCP_ICON_BASE}bigquery-512-color.svg`,
  cloudStorage: `${GCP_ICON_BASE}cloud-storage-512-color.svg`,
  cloudRun: `${GCP_ICON_BASE}cloudrun-512-color-rgb.svg`,
  spanner: `${GCP_ICON_BASE}cloudspanner-512-color.svg`,
  cloudSql: `${GCP_ICON_BASE}cloudsql-512-color.svg`,
  distributedCloud: `${GCP_ICON_BASE}distributedcloud-512-color.svg`,
  gke: `${GCP_ICON_BASE}gke-512-color.svg`,
  looker: `${GCP_ICON_BASE}looker-512-color.svg`,
  securityCommandCenter: `${GCP_ICON_BASE}securitycommandcenter-512-color.svg`,
  vertexAi: `${GCP_ICON_BASE}vertexai-512-color.svg`,
  microsoft: 'https://cdn.simpleicons.org/microsoft',
  salesforce: 'https://cdn.simpleicons.org/salesforce',
  sap: 'https://cdn.simpleicons.org/sap',
  servicenow: 'https://cdn.simpleicons.org/servicenow',
  github: 'https://cdn.simpleicons.org/github',
  gitlab: 'https://cdn.simpleicons.org/gitlab',
  atlassian: 'https://cdn.simpleicons.org/atlassian',
  jira: 'https://cdn.simpleicons.org/jira',
  confluence: 'https://cdn.simpleicons.org/confluence',
  slack: 'https://cdn.simpleicons.org/slack',
  aws: 'https://cdn.simpleicons.org/amazonwebservices',
  azure: 'https://cdn.simpleicons.org/microsoftazure',
  terraform: 'https://cdn.simpleicons.org/terraform',
  kubernetes: 'https://cdn.simpleicons.org/kubernetes',
  docker: 'https://cdn.simpleicons.org/docker',
  kafka: 'https://cdn.simpleicons.org/apachekafka',
  postgres: 'https://cdn.simpleicons.org/postgresql',
  redis: 'https://cdn.simpleicons.org/redis',
  snowflake: 'https://cdn.simpleicons.org/snowflake',
  databricks: 'https://cdn.simpleicons.org/databricks',
  react: 'https://cdn.simpleicons.org/react',
  nextjs: 'https://cdn.simpleicons.org/nextdotjs',
};

type IconRule = {
  pattern: RegExp;
  icon: string;
  family: 'vendor' | 'gcp-product';
};

const ICON_RULES: IconRule[] = [
  { pattern: /\bMicrosoft(?:\s+365)?\b|\bSharePoint\b|\bOneDrive\b|\bOutlook\b|\bTeams\b/i, icon: ICONS.microsoft, family: 'vendor' },
  { pattern: /\bSalesforce\b/i, icon: ICONS.salesforce, family: 'vendor' },
  { pattern: /\bSAP\b/i, icon: ICONS.sap, family: 'vendor' },
  { pattern: /\bServiceNow\b/i, icon: ICONS.servicenow, family: 'vendor' },
  { pattern: /\bGitHub\b/i, icon: ICONS.github, family: 'vendor' },
  { pattern: /\bGitLab\b/i, icon: ICONS.gitlab, family: 'vendor' },
  { pattern: /\bJira\b/i, icon: ICONS.jira, family: 'vendor' },
  { pattern: /\bConfluence\b/i, icon: ICONS.confluence, family: 'vendor' },
  { pattern: /\bAtlassian\b/i, icon: ICONS.atlassian, family: 'vendor' },
  { pattern: /\bSlack\b/i, icon: ICONS.slack, family: 'vendor' },
  { pattern: /\bAWS\b|Amazon Web Services/i, icon: ICONS.aws, family: 'vendor' },
  { pattern: /\bAzure\b/i, icon: ICONS.azure, family: 'vendor' },
  { pattern: /\bTerraform\b/i, icon: ICONS.terraform, family: 'vendor' },
  { pattern: /\bKubernetes\b/i, icon: ICONS.kubernetes, family: 'vendor' },
  { pattern: /\bDocker\b/i, icon: ICONS.docker, family: 'vendor' },
  { pattern: /\bKafka\b/i, icon: ICONS.kafka, family: 'vendor' },
  { pattern: /\bPostgreSQL\b|\bPostgres\b/i, icon: ICONS.postgres, family: 'vendor' },
  { pattern: /\bRedis\b/i, icon: ICONS.redis, family: 'vendor' },
  { pattern: /\bSnowflake\b/i, icon: ICONS.snowflake, family: 'vendor' },
  { pattern: /\bDatabricks\b/i, icon: ICONS.databricks, family: 'vendor' },
  { pattern: /\bReact\b/i, icon: ICONS.react, family: 'vendor' },
  { pattern: /\bNext\.?(?:js)?\b/i, icon: ICONS.nextjs, family: 'vendor' },

  // Exact Google Cloud product identities only. No generic "Google" fallback.
  { pattern: /\bGemini Enterprise Agent Platform\b|\bAgent Runtime\b|\bAgent Gateway\b|\bAgent Registry\b|\bAgent Identity\b/i, icon: ICONS.agents, family: 'gcp-product' },
  { pattern: /\bVertex AI\b/i, icon: ICONS.vertexAi, family: 'gcp-product' },
  { pattern: /\bBigQuery\b/i, icon: ICONS.bigquery, family: 'gcp-product' },
  { pattern: /\bCloud Storage\b/i, icon: ICONS.cloudStorage, family: 'gcp-product' },
  { pattern: /\bCloud Run\b/i, icon: ICONS.cloudRun, family: 'gcp-product' },
  { pattern: /\bAlloyDB\b/i, icon: ICONS.alloydb, family: 'gcp-product' },
  { pattern: /\bCloud SQL\b/i, icon: ICONS.cloudSql, family: 'gcp-product' },
  { pattern: /\bSpanner\b/i, icon: ICONS.spanner, family: 'gcp-product' },
  { pattern: /\bApigee\b/i, icon: ICONS.apigee, family: 'gcp-product' },
  { pattern: /\bGoogle Kubernetes Engine\b|\bGKE\b/i, icon: ICONS.gke, family: 'gcp-product' },
  { pattern: /\bGoogle Distributed Cloud\b/i, icon: ICONS.distributedCloud, family: 'gcp-product' },
  { pattern: /\bLooker\b/i, icon: ICONS.looker, family: 'gcp-product' },
  { pattern: /\bSecurity Command Center\b/i, icon: ICONS.securityCommandCenter, family: 'gcp-product' },
];

const EMOJI_RE = /(?:\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]|\uD83D[\uDE80-\uDEFF]|\uD83E[\uDD00-\uDDFF]|[\u2600-\u27BF])\uFE0F?/g;

function attr(source: string, name: string): string {
  return source.match(new RegExp(`\\b${name}="([^"]*)"`, 'i'))?.[1] || '';
}

function numericAttr(source: string, name: string): number {
  const value = Number(attr(source, name));
  return Number.isFinite(value) ? value : 0;
}

function stripEmoji(value: string): string {
  return value
    .replace(EMOJI_RE, '')
    .replace(/\uFE0F/g, '')
    .replace(/\u200D/g, '')
    .replace(/(?:&nbsp;\s*){2,}/gi, '&nbsp;');
}

function plainText(value: string): string {
  return stripEmoji(value)
    .replace(/&lt;br\s*\/?&gt;/gi, ' ')
    .replace(/&lt;[^&]*?&gt;/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function selectIcon(text: string): IconRule | null {
  return ICON_RULES.find(rule => rule.pattern.test(text)) || null;
}

function iconHtml(iconUrl: string, body: string, compact: boolean): string {
  const iconSize = compact ? 22 : 28;
  const iconColumn = compact ? 30 : 38;
  return `&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse;&quot;&gt;` +
    `&lt;tr&gt;` +
    `&lt;td style=&quot;width:${iconColumn}px;vertical-align:middle;text-align:center;padding:0 5px 0 0;&quot;&gt;` +
    `&lt;img src=&quot;${iconUrl}&quot; width=&quot;${iconSize}&quot; height=&quot;${iconSize}&quot; style=&quot;object-fit:contain;&quot;/&gt;` +
    `&lt;/td&gt;` +
    `&lt;td style=&quot;vertical-align:middle;text-align:left;min-width:0;&quot;&gt;${body}&lt;/td&gt;` +
    `&lt;/tr&gt;&lt;/table&gt;`;
}

function getCellGeometry(xml: string, id: string): { x: number; y: number; width: number; height: number } | null {
  const match = xml.match(new RegExp(`<mxCell\\b[^>]*\\bid="${id}"[^>]*>[\\s\\S]*?<mxGeometry\\b([^>]*)`, 'i'));
  if (!match) return null;
  const g = match[1] || '';
  return {
    x: numericAttr(g, 'x'),
    y: numericAttr(g, 'y'),
    width: numericAttr(g, 'width'),
    height: numericAttr(g, 'height'),
  };
}

function setGeometryAttr(attrs: string, key: string, value: number): string {
  const re = new RegExp(`(\\b${key}=")[^"]*(")`, 'i');
  return re.test(attrs)
    ? attrs.replace(re, (_m, p1: string, p2: string) => `${p1}${value}${p2}`)
    : `${attrs} ${key}="${value}"`;
}

function expandGeneratedCardText(xml: string, baseId: string): string {
  const card = getCellGeometry(xml, baseId);
  if (!card) return xml;
  const textId = `${baseId}_t`;
  const re = new RegExp(`(<mxCell\\b[^>]*\\bid="${textId}"[^>]*>)([\\s\\S]*?)(<\\/mxCell>)`, 'i');
  return xml.replace(re, (_full, open: string, body: string, close: string) => {
    const gm = body.match(/<mxGeometry\b([^>]*?)(?:\/)?\s*>/i);
    if (!gm) return `${open}${body}${close}`;
    let ga = (gm[1] || '').trimEnd();
    ga = setGeometryAttr(ga, 'x', card.x + 14);
    ga = setGeometryAttr(ga, 'width', Math.max(40, card.width - 28));
    const nextBody = body.replace(gm[0], `<mxGeometry ${ga.trim()}/>`);
    return `${open}${nextBody}${close}`;
  });
}

/**
 * Builders created during the rebuild sometimes emitted the same embedded GCP mark for
 * every generated card. Upgrade those placeholders to an exact icon when we have one;
 * otherwise remove the placeholder and let the text use the full card width.
 */
function normalizeGeneratedCardIcons(xml: string): string {
  const iconCellRe = /<mxCell\b([^>]*\bid="([^"]+)_i"[^>]*\bvertex="1"[^>]*)>([\s\S]*?)<\/mxCell>/gi;
  let next = xml;
  const matches = Array.from(xml.matchAll(iconCellRe));

  for (const match of matches) {
    const full = match[0];
    const attrs = match[1] || '';
    const baseId = match[2] || '';
    const styleMatch = attrs.match(/style="([^"]*)"/i);
    if (!styleMatch) continue;
    const style = styleMatch[1];
    if (!/shape=image/i.test(style) || !/image=data:image\/svg\+xml/i.test(style)) continue;

    const textCell = next.match(new RegExp(`<mxCell\\b[^>]*\\bid="${baseId}_t"[^>]*\\bvalue="([^"]*)"`, 'i'));
    const text = plainText(textCell?.[1] || '');
    const rule = selectIcon(text);

    if (rule) {
      const newStyle = style.replace(/image=data:image\/svg\+xml[^;]*;/i, `image=${rule.icon};`);
      next = next.replace(full, full.replace(styleMatch[0], `style="${newStyle}"`));
    } else {
      next = next.replace(full, '');
      next = expandGeneratedCardText(next, baseId);
    }
  }
  return next;
}

/**
 * Semantic icon pass:
 * - removes emoji placeholders
 * - uses authentic vendor icons and verified Google Cloud product icons
 * - never paints a generic Google/GCP logo onto every cloud-service card
 * - preserves notation-sensitive diagrams and editable mxCell geometry
 */
export function applyBlueprintSemanticIcons(xml: string, architectureId?: string | null): string {
  if (!xml || xml.includes('pc-semantic-icons-v1')) return xml;
  const id = String(architectureId || '').toLowerCase();
  if (NOTATION_SENSITIVE_IDS.has(id)) return xml;

  let next = normalizeGeneratedCardIcons(xml);
  const cellRe = /<mxCell\b([^>]*\bvertex="1"[^>]*)>([\s\S]*?)<\/mxCell>/gi;
  next = next.replace(cellRe, (full, attrs: string, body: string) => {
    const valueMatch = attrs.match(/\bvalue="([^"]*)"/i);
    if (!valueMatch) return full;

    const originalValue = valueMatch[1];
    const cleanedValue = stripEmoji(originalValue);
    const style = attr(attrs, 'style');
    const geometry = body.match(/<mxGeometry\b([^>]*)\/?\s*>/i)?.[1] || '';
    const width = numericAttr(geometry, 'width');
    const height = numericAttr(geometry, 'height');
    const cellId = attr(attrs, 'id');

    let replacementValue = cleanedValue;
    const text = plainText(cleanedValue);
    const rule = selectIcon(text);
    const alreadyHasImage = /&lt;img\b/i.test(cleanedValue) || /shape=image/i.test(style);
    const isGeneratedCardText = /_t$/i.test(cellId);
    const isShapeThatShouldNotBeWrapped = /shape=(?:image|line|group)|ellipse|rhombus|hexagon|swimlane/i.test(style);
    const isHeaderLike = height <= 42 || (width >= 500 && height <= 70) || /fontSize=(?:1[5-9]|[2-9]\d)/i.test(style);
    const isUsefulCard = width >= 135 && height >= 52 && text.length >= 3 && text.length <= 520;

    if (rule && !alreadyHasImage && !isGeneratedCardText && !isShapeThatShouldNotBeWrapped && !isHeaderLike && isUsefulCard) {
      replacementValue = iconHtml(rule.icon, cleanedValue, height < 70 || width < 190);
    }

    if (replacementValue === originalValue) return full;
    const nextAttrs = attrs.replace(valueMatch[0], `value="${replacementValue}"`);
    return `<mxCell${nextAttrs}>${body}</mxCell>`;
  });

  next = next.replace(EMOJI_RE, '').replace(/\uFE0F/g, '').replace(/\u200D/g, '');
  next = next.replace(/(<mxGraphModel\b)/, '<!-- pc-semantic-icons-v1 -->\n$1');
  return next;
}
