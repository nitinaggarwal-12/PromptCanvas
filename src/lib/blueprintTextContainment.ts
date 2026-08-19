const NOTATION_SENSITIVE_IDS = new Set([
  'erd',
  'sequence_diagram',
  'tech_c4_system_context',
  'c4_component_lld',
  'bpmn_process_workflow',
  'threat_modeling_stride',
  'data_lineage_provenance',
]);

function attr(source: string, name: string): string {
  return source.match(new RegExp(`\\b${name}="([^"]*)"`, 'i'))?.[1] || '';
}

function numberAttr(source: string, name: string): number | null {
  const raw = attr(source, name);
  if (!raw) return null;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : null;
}

function appendStyle(style: string, key: string, value: string): string {
  const re = new RegExp(`(?:^|;)${key}=`, 'i');
  return re.test(style)
    ? style
    : `${style}${style && !style.endsWith(';') ? ';' : ''}${key}=${value};`;
}

function setStyle(style: string, key: string, value: string): string {
  const re = new RegExp(`((?:^|;)${key}=)[^;]*`, 'i');
  if (re.test(style)) return style.replace(re, `$1${value}`);
  return appendStyle(style, key, value);
}

function plainText(value: string): { text: string; explicitLines: number } {
  const withBreaks = value
    .replace(/&lt;br\s*\/?&gt;/gi, '\n')
    .replace(/<br\s*\/?\s*>/gi, '\n');
  const stripped = withBreaks
    .replace(/&lt;[^&]*?&gt;/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s*\n\s*/g, '\n')
    .replace(/[ \t]+/g, ' ')
    .trim();
  return {
    text: stripped,
    explicitLines: Math.max(1, stripped.split('\n').length),
  };
}

function roundHalf(value: number): number {
  return Math.round(value * 2) / 2;
}

function fitFontScale(value: string, style: string, width: number, height: number): number {
  const { text, explicitLines } = plainText(value);
  if (!text || width < 55 || height < 26) return 1;

  const styleFont = Number(style.match(/fontSize=(\d+(?:\.\d+)?)/i)?.[1] || 11);
  const inlineFonts = Array.from(value.matchAll(/font-size:\s*(\d+(?:\.\d+)?)px/gi), m => Number(m[1]));
  const nominal = Math.max(styleFont, ...inlineFonts.filter(Number.isFinite), 10);
  const usableWidth = Math.max(35, width - 18);
  const usableHeight = Math.max(18, height - 12);
  const charsPerLine = Math.max(7, Math.floor(usableWidth / Math.max(5.2, nominal * 0.54)));
  const segments = text.split('\n');
  const wrappedLines = segments.reduce((sum, segment) => sum + Math.max(1, Math.ceil(segment.length / charsPerLine)), 0);
  const lines = Math.max(explicitLines, wrappedLines);
  const required = lines * nominal * 1.28;

  if (required <= usableHeight * 0.93) return 1;
  return Math.max(0.78, Math.min(1, Math.sqrt((usableHeight * 0.93) / required)));
}

/**
 * Catalog-wide containment guardrail.
 *
 * - wraps labels rather than letting them spill outside a node
 * - adds interior padding so labels do not touch borders
 * - proportionally reduces dense-card typography, with a readability floor
 * - leaves notation-sensitive diagrams structurally untouched
 */
export function applyBlueprintTextContainment(xml: string, architectureId?: string | null): string {
  if (!xml || xml.includes('pc-text-containment-v1')) return xml;

  const id = String(architectureId || '').toLowerCase();
  if (NOTATION_SENSITIVE_IDS.has(id)) return xml;

  const cellRe = /<mxCell\b([^>]*\bvertex="1"[^>]*)>([\s\S]*?)<\/mxCell>/gi;
  let next = xml.replace(cellRe, (full, attrs: string, body: string) => {
    const styleMatch = attrs.match(/style="([^"]*)"/i);
    if (!styleMatch) return full;

    const value = attr(attrs, 'value');
    if (!value) return full;

    const geometry = body.match(/<mxGeometry\b([^>]*)\/?\s*>/i)?.[1] || '';
    const width = numberAttr(geometry, 'width') ?? 0;
    const height = numberAttr(geometry, 'height') ?? 0;
    if (!width || !height) return full;

    let style = styleMatch[1];
    if (/(shape=image|shape=group|shape=line)/i.test(style)) return full;

    const isText = /(^|;)text;/i.test(style) || (/fillColor=none/i.test(style) && /strokeColor=none/i.test(style));
    const compact = height < 32;

    style = setStyle(style, 'whiteSpace', 'wrap');
    style = setStyle(style, 'html', '1');
    style = setStyle(style, 'overflow', 'hidden');
    style = setStyle(style, 'verticalAlign', 'middle');
    style = setStyle(style, 'spacing', compact ? '2' : isText ? '4' : '6');
    if (!compact) {
      style = setStyle(style, 'spacingLeft', isText ? '4' : '8');
      style = setStyle(style, 'spacingRight', isText ? '4' : '8');
      style = setStyle(style, 'spacingTop', isText ? '3' : '5');
      style = setStyle(style, 'spacingBottom', isText ? '3' : '5');
    }

    const scale = fitFontScale(value, style, width, height);
    if (scale < 0.995) {
      const styleFontMatch = style.match(/fontSize=(\d+(?:\.\d+)?)/i);
      if (styleFontMatch) {
        const current = Number(styleFontMatch[1]);
        const fitted = Math.max(9.5, roundHalf(current * scale));
        style = setStyle(style, 'fontSize', String(fitted));
      }
    }

    let nextAttrs = attrs.replace(styleMatch[0], `style="${style}"`);
    if (scale < 0.995) {
      nextAttrs = nextAttrs.replace(/font-size:\s*(\d+(?:\.\d+)?)px/gi, (_m, raw) => {
        const current = Number(raw);
        const fitted = Math.max(9.5, roundHalf(current * scale));
        return `font-size:${fitted}px`;
      });
    }

    return `<mxCell${nextAttrs}>${body}</mxCell>`;
  });

  next = next.replace(/(<mxGraphModel\b)/, '<!-- pc-text-containment-v1 -->\n$1');
  return next;
}
