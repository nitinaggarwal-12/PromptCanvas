const GOOGLE_CLOUD_MARK = 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2078%2052%22%3E%3Cpath%20fill%3D%22%234285F4%22%20d%3D%22M30%2045h31a13%2013%200%200%200%201.8-25.9A20%2020%200%200%200%2025%2016.4%2014%2014%200%200%200%2030%2045z%22%2F%3E%3Cpath%20fill%3D%22%23EA4335%22%20d%3D%22M25%2016.4A20%2020%200%200%201%2042%206l5.7%2010H30z%22%2F%3E%3Cpath%20fill%3D%22%23FBBC05%22%20d%3D%22M25%2016.4A14%2014%200%200%200%2015%2030l11%202%208-13z%22%2F%3E%3Cpath%20fill%3D%22%2334A853%22%20d%3D%22M30%2045h13l-3-11-14-2z%22%2F%3E%3C%2Fsvg%3E';

const NOTATION_SENSITIVE_IDS = new Set([
  'erd',
  'sequence_diagram',
  'tech_c4_system_context',
  'c4_component_lld',
  'bpmn_process_workflow',
  'threat_modeling_stride',
  'data_lineage_provenance'
]);

const PRODUCT_NAME_REPLACEMENTS: Array<[RegExp, string]> = [
  [/Cloud DLP/g, 'Sensitive Data Protection'],
  [/Dataplex Universal Catalog/g, 'Knowledge Catalog'],
  [/Dataplex Data Catalog/g, 'Knowledge Catalog'],
  [/Cloud Source Repositories/g, 'Secure Source Manager'],
  [/Cloud Source Repos/g, 'Secure Source Manager'],
  [/Vertex AI Quota Governor/g, 'Vertex AI quotas & Provisioned Throughput'],
  [/Gemini Enterprise AIOps/g, 'Gemini-assisted AIOps'],
  [/Gemini 3\.7 Pro Vision/g, 'Gemini multimodal model'],
  [/Gemini 3\.7 Flash\s*\/\s*Pro/g, 'Gemini (approved model)'],
  [/Gemini 3\.7 Pro/g, 'Gemini (approved model)'],
  [/Gemini 3\.7 Flash/g, 'Gemini (approved model)'],
  [/Gemini 3\.7/g, 'Gemini'],
  [/AlphaFold Pro/g, 'AlphaFold workload']
];

function replaceLegacyProductNames(xml: string): string {
  return PRODUCT_NAME_REPLACEMENTS.reduce(
    (current, [pattern, replacement]) => current.replace(pattern, replacement),
    xml
  );
}

function applyFontFloor(xml: string, floor: number): string {
  const styleFont = xml.replace(/fontSize=(\d+(?:\.\d+)?)/gi, (full, raw) => {
    const size = Number(raw);
    return Number.isFinite(size) && size < floor ? `fontSize=${floor}` : full;
  });

  return styleFont.replace(/font-size:\s*(\d+(?:\.\d+)?)px/gi, (full, raw) => {
    const size = Number(raw);
    return Number.isFinite(size) && size < floor ? `font-size:${floor}px` : full;
  });
}

function applyStrokeFloor(xml: string, floor: number): string {
  return xml.replace(/strokeWidth=(\d+(?:\.\d+)?)/gi, (full, raw) => {
    const width = Number(raw);
    return Number.isFinite(width) && width < floor ? `strokeWidth=${floor}` : full;
  });
}

function appendStyle(style: string, key: string, value: string): string {
  const matcher = new RegExp(`(?:^|;)${key}=`, 'i');
  return matcher.test(style) ? style : `${style}${style.endsWith(';') || style.length === 0 ? '' : ';'}${key}=${value};`;
}

function makeGcpStencilsViewerSafe(xml: string): string {
  return xml.replace(
    /(<mxCell\b[^>]*\bstyle=")([^"]*?)(shape=mxgraph\.gcp2\.[^;"\s]+;?)([^"]*)(")/gi,
    (_full, open, before, _shape, after, close) => {
      const safeStyle = `${before}shape=image;image=${GOOGLE_CLOUD_MARK};imageAspect=0;aspect=fixed;${after}`;
      return `${open}${safeStyle}${close}`;
    }
  );
}

function polishVertices(xml: string, notationSensitive: boolean): string {
  if (notationSensitive) return xml;

  return xml.replace(/<mxCell\b([^>]*\bvertex="1"[^>]*)>/gi, (full, attrs) => {
    const styleMatch = attrs.match(/style="([^"]*)"/i);
    if (!styleMatch) return full;

    let style = styleMatch[1];
    const textCell = /(^|;)text;/i.test(style) || (/fillColor=none/i.test(style) && /strokeColor=none/i.test(style));
    const protectedShape = /(shape=image|shape=mxgraph\.|ellipse|rhombus|hexagon|swimlane|cylinder|actor|uml|bpmn|shape=line|shape=group)/i.test(style);

    if (textCell) {
      style = appendStyle(style, 'spacing', '4');
      const fontMatch = style.match(/fontSize=(\d+(?:\.\d+)?)/i);
      const fontSize = fontMatch ? Number(fontMatch[1]) : null;
      if (fontSize !== null && fontSize >= 14) {
        style = appendStyle(style, 'fontStyle', '1');
      }
      return full.replace(styleMatch[0], `style="${style}"`);
    }

    if (protectedShape) return full;

    style = appendStyle(style, 'whiteSpace', 'wrap');
    style = appendStyle(style, 'html', '1');
    style = appendStyle(style, 'shadow', '0');
    style = appendStyle(style, 'spacing', '6');
    style = appendStyle(style, 'verticalAlign', 'middle');
    style = appendStyle(style, 'strokeWidth', '1.2');
    if (/rounded=1/i.test(style)) {
      style = appendStyle(style, 'arcSize', '8');
    }

    return full.replace(styleMatch[0], `style="${style}"`);
  });
}

function polishEdges(xml: string, notationSensitive: boolean): string {
  return xml.replace(/<mxCell\b([^>]*\bedge="1"[^>]*)>/gi, (full, attrs) => {
    const styleMatch = attrs.match(/style="([^"]*)"/i);
    if (!styleMatch) return full;

    let style = styleMatch[1];
    const isDashed = /dashed=1/i.test(style);
    const isDotted = /dashPattern=(?:1\s+3|1\s+4|2\s+4)/i.test(style);

    style = appendStyle(style, 'labelBackgroundColor', '#FFFFFF');
    style = appendStyle(style, 'labelBorderColor', 'none');
    style = appendStyle(style, 'fontColor', '#334155');

    if (!/strokeWidth=/i.test(style)) {
      style += notationSensitive ? 'strokeWidth=1.2;' : isDashed ? 'strokeWidth=1.3;' : 'strokeWidth=1.6;';
    }

    if (!notationSensitive) {
      if (!/strokeColor=/i.test(style)) {
        style += isDotted
          ? 'strokeColor=#0F9D58;'
          : isDashed
            ? 'strokeColor=#64748B;'
            : 'strokeColor=#2563EB;';
      }
      style = appendStyle(style, 'endArrow', 'block');
      style = appendStyle(style, 'endFill', '1');
      if (!/edgeStyle=/i.test(style)) {
        style += 'edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;';
      }
    }

    return full.replace(styleMatch[0], `style="${style}"`);
  });
}

function normalizeCanvasDefaults(xml: string): string {
  return xml
    .replace(/<mxGraphModel\b([^>]*)background="#[0-9A-Fa-f]{6}"/g, '<mxGraphModel$1background="#FFFFFF"')
    .replace(/shadow="1"/g, 'shadow="0"');
}

export function applyBlueprintVisualSystem(xml: string, architectureId?: string | null): string {
  if (!xml) return xml;

  const id = (architectureId || '').toLowerCase();
  const notationSensitive = NOTATION_SENSITIVE_IDS.has(id);
  const fontFloor = notationSensitive ? 9 : 10;
  const strokeFloor = notationSensitive ? 1 : 1.2;

  let polished = replaceLegacyProductNames(xml);
  polished = applyFontFloor(polished, fontFloor);
  polished = applyStrokeFloor(polished, strokeFloor);
  polished = polishVertices(polished, notationSensitive);
  polished = polishEdges(polished, notationSensitive);
  polished = makeGcpStencilsViewerSafe(polished);
  polished = normalizeCanvasDefaults(polished);

  if (!polished.includes('pc-blueprint-visual-system-v2')) {
    polished = polished.replace(
      /(<mxGraphModel\b)/,
      '<!-- pc-blueprint-visual-system-v2 -->\n$1'
    );
  }

  return polished;
}

export type BlueprintVisualAudit = {
  minFontSize: number | null;
  unresolvedGcpStencilCount: number;
  legacyProductNameCount: number;
  edgeCount: number;
  polishedCardCount: number;
};

export function auditBlueprintVisualSystem(xml: string): BlueprintVisualAudit {
  const fontSizes = [
    ...Array.from(xml.matchAll(/fontSize=(\d+(?:\.\d+)?)/gi), match => Number(match[1])),
    ...Array.from(xml.matchAll(/font-size:\s*(\d+(?:\.\d+)?)px/gi), match => Number(match[1]))
  ].filter(Number.isFinite);

  const legacyProductNameCount = PRODUCT_NAME_REPLACEMENTS.reduce((count, [pattern]) => {
    const flags = pattern.flags.includes('g') ? pattern.flags : `${pattern.flags}g`;
    const globalPattern = new RegExp(pattern.source, flags);
    return count + Array.from(xml.matchAll(globalPattern)).length;
  }, 0);

  return {
    minFontSize: fontSizes.length > 0 ? Math.min(...fontSizes) : null,
    unresolvedGcpStencilCount: Array.from(xml.matchAll(/shape=mxgraph\.gcp2\./gi)).length,
    legacyProductNameCount,
    edgeCount: Array.from(xml.matchAll(/\bedge="1"/gi)).length,
    polishedCardCount: Array.from(xml.matchAll(/\bspacing=6;/gi)).length
  };
}
