/**
 * Phase 3.2+ — high-confidence technical terminology corrections and narrowly-scoped
 * render repairs for known malformed blueprint geometry.
 */
const HIGH_CONFIDENCE_REPLACEMENTS: Array<[RegExp, string]> = [
  [/Cloud Source Repositories/gi, 'Secure Source Manager'],
  [/Cloud Source Repos/gi, 'Secure Source Manager'],
  [/Dataplex Universal Catalog/gi, 'Knowledge Catalog'],
  [/Dataplex Data Catalog/gi, 'Knowledge Catalog'],
  [/Cloud DLP/gi, 'Sensitive Data Protection'],
  [/Vertex AI Matching Engine/gi, 'Vertex AI Vector Search'],
  [/Anthos Service Mesh/gi, 'Cloud Service Mesh'],
  [/Cloud Functions/gi, 'Cloud Run functions'],
  [/Global L7 HTTPS Load Balancing/gi, 'Cloud Load Balancing'],
  [/Global HTTPS Load Balancer/gi, 'Cloud Load Balancing'],
  [/Global HTTP\(S\) Load Balancer/gi, 'Cloud Load Balancing'],
  [/Cloud Global Load Balancer/gi, 'Cloud Load Balancing'],
  [/Gemini 3\.7 Pro Vision/gi, 'Gemini multimodal model'],
  [/Gemini 3\.7 Flash\s*\/\s*Pro/gi, 'Gemini (approved model)'],
  [/Gemini 3\.7 Pro/gi, 'Gemini (approved model)'],
  [/Gemini 3\.7 Flash/gi, 'Gemini (approved model)'],
  [/Gemini 3\.7/gi, 'Gemini'],
];

type RenderPatch = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fillColor?: string;
  strokeColor?: string;
};

function setStyleValue(style: string, key: string, value: string): string {
  const re = new RegExp(`((?:^|;)${key}=)[^;]*`, 'i');
  if (re.test(style)) {
    return style.replace(re, (_full, prefix: string) => `${prefix}${value}`);
  }
  return `${style}${style && !style.endsWith(';') ? ';' : ''}${key}=${value};`;
}

function setGeometryValue(attrs: string, key: string, value: number): string {
  const re = new RegExp(`(\\b${key}=")[^"]*(")`, 'i');
  if (re.test(attrs)) {
    return attrs.replace(re, (_full, prefix: string, suffix: string) => `${prefix}${value}${suffix}`);
  }
  return `${attrs} ${key}="${value}"`;
}

function patchVertex(xml: string, patch: RenderPatch): string {
  const re = new RegExp(
    `<mxCell\\b([^>]*\\bid="${patch.id}"[^>]*\\bvertex="1"[^>]*)>([\\s\\S]*?)<\\/mxCell>`,
    'i',
  );

  return xml.replace(re, (_full, attrs: string, body: string) => {
    let nextAttrs = attrs;
    const styleMatch = nextAttrs.match(/style="([^"]*)"/i);
    if (styleMatch) {
      let style = styleMatch[1];
      if (patch.fillColor) style = setStyleValue(style, 'fillColor', patch.fillColor);
      if (patch.strokeColor) style = setStyleValue(style, 'strokeColor', patch.strokeColor);
      nextAttrs = nextAttrs.replace(styleMatch[0], `style="${style}"`);
    }

    // Non-greedy attribute capture deliberately excludes the self-closing slash.
    const geometryMatch = body.match(/<mxGeometry\b([^>]*?)(?:\/)?\s*>/i);
    if (!geometryMatch) return `<mxCell${nextAttrs}>${body}</mxCell>`;

    let geometryAttrs = (geometryMatch[1] || '').trimEnd();
    geometryAttrs = setGeometryValue(geometryAttrs, 'x', patch.x);
    geometryAttrs = setGeometryValue(geometryAttrs, 'y', patch.y);
    geometryAttrs = setGeometryValue(geometryAttrs, 'width', patch.width);
    geometryAttrs = setGeometryValue(geometryAttrs, 'height', patch.height);
    if (!/\bas="geometry"/i.test(geometryAttrs)) {
      geometryAttrs += ' as="geometry"';
    }

    const nextBody = body.replace(geometryMatch[0], `<mxGeometry ${geometryAttrs.trim()}/>`);
    return `<mxCell${nextAttrs}>${nextBody}</mxCell>`;
  });
}

const KNOWN_RENDER_REPAIRS: Record<string, RenderPatch[]> = {
  tech_ai_trism_guardrails: [
    { id: 'ops', x: 25, y: 680, width: 1710, height: 255, fillColor: '#F8FAFC', strokeColor: '#334155' },
    { id: 'ops_n', x: 39, y: 695, width: 30, height: 30, fillColor: '#334155', strokeColor: '#334155' },
    { id: 'ops_h', x: 79, y: 690, width: 1642, height: 45 },
  ],
  tech_llm_capacity_quota: [
    { id: 'patterns', x: 25, y: 660, width: 1710, height: 260, fillColor: '#F5F3FF', strokeColor: '#6554C0' },
    { id: 'patterns_n', x: 39, y: 675, width: 30, height: 30, fillColor: '#6554C0', strokeColor: '#6554C0' },
    { id: 'patterns_h', x: 79, y: 670, width: 1642, height: 44 },
  ],
  tech_supply_chain: [
    { id: 'ops', x: 25, y: 675, width: 1700, height: 235, fillColor: '#F8FAFC', strokeColor: '#334155' },
    { id: 'ops_n', x: 39, y: 690, width: 30, height: 30, fillColor: '#334155', strokeColor: '#334155' },
    { id: 'ops_h', x: 79, y: 685, width: 1632, height: 45 },
  ],
  smart_factory_iot: [
    { id: 'ops', x: 25, y: 690, width: 1700, height: 230, fillColor: '#F8FAFC', strokeColor: '#334155' },
    { id: 'ops_n', x: 39, y: 705, width: 30, height: 30, fillColor: '#334155', strokeColor: '#334155' },
    { id: 'ops_h', x: 79, y: 700, width: 1632, height: 45 },
  ],
};

export function applyKnownBlueprintRenderRepairs(xml: string, architectureId?: string | null): string {
  if (!xml) return xml;
  const id = String(architectureId || '').toLowerCase();
  const patches = KNOWN_RENDER_REPAIRS[id];
  if (!patches?.length) return xml;

  let next = patches.reduce((current, patch) => patchVertex(current, patch), xml);
  if (!next.includes(`pc-known-render-repair:${id}`)) {
    next = next.replace(/(<mxGraphModel\b)/, `<!-- pc-known-render-repair:${id} -->\n$1`);
  }
  return next;
}

export function findInvalidNumericDrawioColors(xml: string): string[] {
  return Array.from(
    xml.matchAll(/(?:fillColor|strokeColor)=([0-9]{2,6})(?=;|\")/gi),
    (match) => match[0],
  );
}

export function applyBlueprintTechnicalAccuracy(xml: string): string {
  if (!xml || xml.includes('pc-technical-accuracy-3-2')) return xml;

  let next = HIGH_CONFIDENCE_REPLACEMENTS.reduce(
    (current, [pattern, replacement]) => current.replace(pattern, replacement),
    xml,
  );

  const canonicalId = next.match(/pc-catalog-id:([a-z0-9_]+)/i)?.[1] || null;
  next = applyKnownBlueprintRenderRepairs(next, canonicalId);

  return next.replace(
    /(<mxGraphModel\b)/,
    '<!-- pc-technical-accuracy-3-2 -->\n$1',
  );
}
