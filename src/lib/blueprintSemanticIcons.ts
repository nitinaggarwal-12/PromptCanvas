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

const ICONS = {
  googleCloud: GOOGLE_CLOUD_MARK,
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
  family: 'vendor' | 'platform';
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

  // Google Cloud family. The self-contained official brand mark is intentionally used
  // as the safe fallback instead of inventing product glyphs when no bundled product
  // artwork exists in the viewer.
  { pattern: /\bGoogle Cloud\b|\bGemini\b|\bVertex AI\b|\bAgent Runtime\b|\bAgent Gateway\b|\bAgent Registry\b|\bAgent Identity\b|\bModel Armor\b|\bBigQuery\b|\bCloud Storage\b|\bCloud Run\b|\bCloud SQL\b|\bAlloyDB\b|\bSpanner\b|\bBigtable\b|\bPub\/Sub\b|\bDataflow\b|\bApigee\b|\bCloud Build\b|\bArtifact Registry\b|\bCloud Deploy\b|\bCloud Armor\b|\bCloud Load Balancing\b|\bCloud Router\b|\bCloud Interconnect\b|\bNetwork Connectivity Center\b|\bPrivate Service Connect\b|\bCloud DNS\b|\bCloud NGFW\b|\bSecurity Command Center\b|\bCloud Monitoring\b|\bCloud Logging\b|\bSecret Manager\b|\bCloud KMS\b|\bWorkflows\b|\bEventarc\b|\bManufacturing Data Engine\b|\bManufacturing Connect\b|\bGoogle Distributed Cloud\b|\bKnowledge Catalog\b|\bSensitive Data Protection\b|\bVPC Service Controls\b/i, icon: ICONS.googleCloud, family: 'platform' },
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

/**
 * Phase 3.3 semantic-icon pass.
 *
 * - removes emoji placeholders from non-notation catalog diagrams
 * - adds recognizable vendor/cloud identity to sufficiently large semantic cards
 * - preserves original editable mxCell geometry and text
 * - avoids inventing Google Cloud product glyphs when a reliable bundled product icon
 *   is unavailable; those cards use the self-contained Google Cloud brand mark instead
 */
export function applyBlueprintSemanticIcons(xml: string, architectureId?: string | null): string {
  if (!xml || xml.includes('pc-semantic-icons-v1')) return xml;
  const id = String(architectureId || '').toLowerCase();
  if (NOTATION_SENSITIVE_IDS.has(id)) return xml;

  const cellRe = /<mxCell\b([^>]*\bvertex="1"[^>]*)>([\s\S]*?)<\/mxCell>/gi;
  let next = xml.replace(cellRe, (full, attrs: string, body: string) => {
    const valueMatch = attrs.match(/\bvalue="([^"]*)"/i);
    if (!valueMatch) return full;

    const originalValue = valueMatch[1];
    const cleanedValue = stripEmoji(originalValue);
    const style = attr(attrs, 'style');
    const geometry = body.match(/<mxGeometry\b([^>]*)\/?\s*>/i)?.[1] || '';
    const width = numericAttr(geometry, 'width');
    const height = numericAttr(geometry, 'height');

    let replacementValue = cleanedValue;
    const text = plainText(cleanedValue);
    const rule = selectIcon(text);
    const alreadyHasImage = /&lt;img\b/i.test(cleanedValue) || /shape=image/i.test(style);
    const isShapeThatShouldNotBeWrapped = /shape=(?:image|line|group)|ellipse|rhombus|hexagon|swimlane/i.test(style);
    const isHeaderLike = height <= 42 || (width >= 500 && height <= 70) || /fontSize=(?:1[5-9]|[2-9]\d)/i.test(style);
    const isUsefulCard = width >= 135 && height >= 52 && text.length >= 3 && text.length <= 520;

    if (rule && !alreadyHasImage && !isShapeThatShouldNotBeWrapped && !isHeaderLike && isUsefulCard) {
      replacementValue = iconHtml(rule.icon, cleanedValue, height < 70 || width < 190);
    }

    if (replacementValue === originalValue) return full;
    const nextAttrs = attrs.replace(valueMatch[0], `value="${replacementValue}"`);
    return `<mxCell${nextAttrs}>${body}</mxCell>`;
  });

  // Strip remaining emoji placeholders from non-cell XML text without touching URLs.
  next = next.replace(EMOJI_RE, '').replace(/\uFE0F/g, '').replace(/\u200D/g, '');
  next = next.replace(/(<mxGraphModel\b)/, '<!-- pc-semantic-icons-v1 -->\n$1');
  return next;
}
