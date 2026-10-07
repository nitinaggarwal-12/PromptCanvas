/**
 * Draw.io XML to 100% Native Editable Word (.docx) & Google Docs Vector Diagram Compiler
 *
 * Generates a Widescreen Landscape (16:9 - 13.33" x 7.5") .docx document that opens on Page 1 / 1
 * in Google Docs (docs.google.com/document/d/.../edit) and Microsoft Word containing:
 *  - A 100% Native Word DrawingML Vector Architecture Diagram (<wpg:wgp> containing <wps:wsp>
 *    shapes, 3D cylinders, enclave containers, service badges, multi-row icon cards, editable text
 *    boxes, and 100% orthogonal 90-degree connectors with edge labels).
 *  - ZERO static image banners, ZERO header clutter, and ZERO multi-page object-ID tables.
 */

import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  XmlComponent,
  XmlAttributeComponent,
  PageOrientation,
  AlignmentType,
} from 'docx';
import {
  parseDrawioXmlForPptx,
  cleanHtmlToPlainText,
  extractStructuredNodeLayout,
  CIRCLED_STEP_DIGITS,
  ParsedMxCell,
} from './editablePptxCompiler';

class Attrs extends XmlAttributeComponent<Record<string, string>> {}

class El extends XmlComponent {
  constructor(tag: string, attrs: Record<string, string | undefined> = {}, children: any[] = []) {
    super(tag);
    const cleanAttrs: Record<string, string> = {};
    for (const [k, v] of Object.entries(attrs)) {
      if (v !== undefined && v !== null) {
        cleanAttrs[k] = String(v);
      }
    }
    if (Object.keys(cleanAttrs).length > 0) {
      const a = new Attrs(cleanAttrs);
      (a as any).rootKey = '_attr';
      this.root.push(a);
    }
    children.forEach((c) => {
      if (c) this.root.push(c);
    });
  }
}

function cleanHex(colorStr: string | undefined, fallback: string = '0284C7'): string {
  if (!colorStr || colorStr === 'none' || colorStr === 'transparent') return fallback;
  let clean = colorStr.replace('#', '').trim().toUpperCase();
  if (clean.length === 3) {
    clean = clean[0] + clean[0] + clean[1] + clean[1] + clean[2] + clean[2];
  }
  return /^[0-9A-F]{6}$/.test(clean) ? clean : fallback;
}

function isDarkHex(hex: string): boolean {
  const clean = cleanHex(hex, 'FFFFFF');
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;
  return lum < 135;
}

function stripHtmlLines(html: string): string[] {
  if (!html) return [];
  const decoded = html
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
  const noSvg = decoded
    .replace(/<svg[\s\S]*?<\/svg>/gi, '')
    .replace(
      /<span[^>]*border-radius\s*:\s*(?:50%|999\d*px)[^>]*>\s*([0-9A-Za-z]+)\s*<\/span>\s*/gi,
      (_m, num) => `${CIRCLED_STEP_DIGITS[String(num).trim()] || `${num}.`} `
    );
  const lines = noSvg
    .replace(/<\/td>\s*<td[^>]*>/gi, ' ')
    .replace(/<\/tr>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/div>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<\/span>\s*<span/gi, '</span> <span')
    .replace(/<[^>]+>/g, '')
    .split('\n')
    .map((l) => l.replace(/\s+/g, ' ').trim())
    .filter(Boolean);
  return lines;
}

function sanitizeXmlText(str: string): string {
  if (!str) return '';
  return String(str)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    .trim();
}

function makeWpsShape(params: {
  xEmu: number;
  yEmu: number;
  cxEmu: number;
  cyEmu: number;
  geom?: string;
  fillHex?: string;
  strokeHex?: string;
  strokeWidthEmu?: number;
  dashed?: boolean;
  paragraphs?: Paragraph[];
  isContainer?: boolean;
  padLeftEmu?: number;
  padRightEmu?: number;
  padTopEmu?: number;
  padBottomEmu?: number;
}): El {
  const {
    xEmu,
    yEmu,
    cxEmu,
    cyEmu,
    geom = 'roundRect',
    fillHex = 'FFFFFF',
    strokeHex = '0284C7',
    strokeWidthEmu = 12700,
    dashed = false,
    paragraphs = [],
    isContainer = false,
    padLeftEmu,
    padRightEmu,
    padTopEmu,
    padBottomEmu,
  } = params;

  const spPrChildren: El[] = [
    new El('a:xfrm', {}, [
      new El('a:off', {
        x: String(Math.round(Math.max(0, xEmu))),
        y: String(Math.round(Math.max(0, yEmu))),
      }),
      new El('a:ext', {
        cx: String(Math.round(Math.max(cxEmu, 14000))),
        cy: String(Math.round(Math.max(cyEmu, 14000))),
      }),
    ]),
    new El('a:prstGeom', { prst: geom }, [new El('a:avLst', {})]),
  ];

  if (fillHex && fillHex !== 'none' && fillHex !== 'transparent') {
    spPrChildren.push(new El('a:solidFill', {}, [new El('a:srgbClr', { val: cleanHex(fillHex) })]));
  } else {
    spPrChildren.push(new El('a:noFill', {}));
  }

  if (strokeHex && strokeHex !== 'none' && strokeHex !== 'transparent' && strokeWidthEmu > 0) {
    const lnChildren: El[] = [new El('a:solidFill', {}, [new El('a:srgbClr', { val: cleanHex(strokeHex) })])];
    if (dashed) {
      lnChildren.push(new El('a:prstDash', { val: 'dash' }));
    }
    spPrChildren.push(new El('a:ln', { w: String(Math.round(strokeWidthEmu)) }, lnChildren));
  } else {
    spPrChildren.push(new El('a:ln', {}, [new El('a:noFill', {})]));
  }

  const wspChildren: any[] = [
    new El('wps:cNvSpPr', {}),
    new El('wps:spPr', {}, spPrChildren),
  ];

  if (paragraphs && paragraphs.length > 0) {
    wspChildren.push(new El('wps:txbx', {}, [new El('w:txbxContent', {}, paragraphs)]));
  }

  const isZeroPad = fillHex === 'none' || fillHex === 'transparent';
  const defaultL = isZeroPad ? 0 : isContainer ? 36000 : 12000;
  const defaultR = isZeroPad ? 0 : isContainer ? 36000 : 12000;
  const defaultT = isZeroPad ? 0 : isContainer ? 24000 : geom === 'can' ? 32000 : 8000;
  const defaultB = isZeroPad ? 0 : isContainer ? 24000 : 8000;

  wspChildren.push(
    new El('wps:bodyPr', {
      lIns: String(padLeftEmu ?? defaultL),
      tIns: String(padTopEmu ?? defaultT),
      rIns: String(padRightEmu ?? defaultR),
      bIns: String(padBottomEmu ?? defaultB),
      anchor: isContainer ? 't' : 'ctr',
    })
  );

  return new El('wps:wsp', {}, wspChildren);
}

function getServiceBadgeInfo(text: string, id: string): {
  fillHex: string;
  badge: string;
  geom: 'roundRect' | 'ellipse' | 'diamond' | 'hexagon' | 'pentagon';
} {
  const lower = `${id} ${text}`.toLowerCase();

  // Google Cloud & Agentic AI Services
  if (lower.includes('iam_icon') || lower.includes('iam_auth') || lower.includes('iam') || lower.includes('authorisation') || lower.includes('rbac') || lower.includes('role')) {
    return { fillHex: '2563EB', badge: 'IAM', geom: 'pentagon' };
  }
  if (lower.includes('ui_chat') || lower.includes('user interface') || lower.includes('gemini live')) {
    return { fillHex: '2563EB', badge: 'UI', geom: 'roundRect' };
  }
  if (lower.includes('edge_layer') || lower.includes('cloud armor') || lower.includes('apigee')) {
    return { fillHex: '1D4ED8', badge: 'EDG', geom: 'pentagon' };
  }
  if (lower.includes('identity_auth') || lower.includes('identity platform') || lower.includes('passkey')) {
    return { fillHex: '2563EB', badge: 'IDP', geom: 'pentagon' };
  }
  if (lower.includes('api_cloud_run') || lower.includes('cloud run') || lower.includes('api gateway')) {
    return { fillHex: '2563EB', badge: 'RUN', geom: 'hexagon' };
  }
  if (lower.includes('model_armor') || lower.includes('model armor') || lower.includes('sdp') || lower.includes('dlp')) {
    return { fillHex: '1D4ED8', badge: 'ARM', geom: 'pentagon' };
  }
  if (lower.includes('coordinator') || lower.includes('adk')) {
    return { fillHex: '15803D', badge: 'ADK', geom: 'hexagon' };
  }
  if (lower.includes('gemini_models') || lower.includes('gemini 3') || lower.includes('gemini 2') || lower.includes('vertex ai')) {
    return { fillHex: '0D9488', badge: 'GEM', geom: 'diamond' };
  }
  if (lower.includes('open_models') || lower.includes('gke') || lower.includes('gemma') || lower.includes('llama')) {
    return { fillHex: '2563EB', badge: 'GKE', geom: 'hexagon' };
  }
  if (lower.includes('vector_memory') || lower.includes('vector search') || lower.includes('scann')) {
    return { fillHex: '2563EB', badge: 'VEC', geom: 'ellipse' };
  }
  if (lower.includes('spanner')) {
    return { fillHex: '2563EB', badge: 'SPN', geom: 'hexagon' };
  }
  if (lower.includes('bigtable') || lower.includes('alloydb')) {
    return { fillHex: 'DC2626', badge: 'BT', geom: 'hexagon' };
  }
  if (lower.includes('firestore') || lower.includes('document ai')) {
    return { fillHex: '2563EB', badge: 'FS', geom: 'roundRect' };
  }
  if (lower.includes('evaluation') || lower.includes('phoenix') || lower.includes('langfuse')) {
    return { fillHex: '7C3AED', badge: 'EVL', geom: 'diamond' };
  }
  if (lower.includes('finops') || lower.includes('billing') || lower.includes('cost')) {
    return { fillHex: '16A34A', badge: 'FIN', geom: 'roundRect' };
  }
  if (lower.includes('logging') || lower.includes('otel')) {
    return { fillHex: '2563EB', badge: 'LOG', geom: 'roundRect' };
  }
  if (lower.includes('monitoring') || lower.includes('prometheus') || lower.includes('insight') || lower.includes('monitor')) {
    return { fillHex: '2563EB', badge: 'MON', geom: 'ellipse' };
  }

  // Azure & Multi-Cloud Services
  if (lower.includes('nsg') || lower.includes('security group')) {
    return { fillHex: '059669', badge: 'NSG', geom: 'pentagon' };
  }
  if (lower.includes('ddos')) {
    return { fillHex: 'DC2626', badge: 'DOS', geom: 'pentagon' };
  }
  if (lower.includes('defender')) {
    return { fillHex: 'DC2626', badge: 'DEF', geom: 'pentagon' };
  }
  if (lower.includes('firewall') || lower.includes('waf') || lower.includes('appgw') || lower.includes('application gateway')) {
    return { fillHex: '16A34A', badge: 'WAF', geom: 'roundRect' };
  }
  if (lower.includes('bastion')) {
    return { fillHex: 'EA580C', badge: 'BST', geom: 'roundRect' };
  }
  if (lower.includes('vpn')) {
    return { fillHex: 'EA580C', badge: 'VPN', geom: 'diamond' };
  }
  if (lower.includes('expressroute')) {
    return { fillHex: 'EA580C', badge: 'ER', geom: 'diamond' };
  }
  if (lower.includes('udr') || lower.includes('user-defined route') || lower.includes('route')) {
    return { fillHex: 'EA580C', badge: 'UDR', geom: 'diamond' };
  }
  if (lower.includes('key vault') || lower.includes('kv')) {
    return { fillHex: 'D97706', badge: 'KV', geom: 'roundRect' };
  }
  if (lower.includes('openai')) {
    return { fillHex: '7C3AED', badge: 'OAI', geom: 'roundRect' };
  }
  if (lower.includes('search')) {
    return { fillHex: '0284C7', badge: 'SRC', geom: 'roundRect' };
  }
  if (lower.includes('ai hub') || lower.includes('ai services') || lower.includes('semantic') || lower.includes('ai_')) {
    return { fillHex: '9333EA', badge: 'AI', geom: 'roundRect' };
  }
  if (lower.includes('orchestrator') || lower.includes('orch')) {
    return { fillHex: '4F46E5', badge: 'ORC', geom: 'hexagon' };
  }
  if (lower.includes('agent') || lower.includes('ag_')) {
    return { fillHex: '16A34A', badge: 'AGT', geom: 'hexagon' };
  }
  if (lower.includes('cosmos') || lower.includes('sql') || lower.includes('storage') || lower.includes('acr') || lower.includes('registry')) {
    return { fillHex: '0891B2', badge: 'DB', geom: 'roundRect' };
  }
  if (lower.includes('service bus') || lower.includes('event') || lower.includes('sb') || lower.includes('eg')) {
    return { fillHex: 'EA580C', badge: 'BUS', geom: 'roundRect' };
  }
  if (lower.includes('dns') || lower.includes('resolver')) {
    return { fillHex: '0284C7', badge: 'DNS', geom: 'diamond' };
  }
  if (lower.includes('private endpoint') || lower.includes('pe_') || lower.includes('endpoint')) {
    return { fillHex: '0284C7', badge: 'PE', geom: 'diamond' };
  }
  if (lower.includes('compute') || lower.includes('instance')) {
    return { fillHex: '2563EB', badge: 'VM', geom: 'hexagon' };
  }
  if (lower.includes('vnet') || lower.includes('virtual network') || lower.includes('spoke') || lower.includes('hub')) {
    return { fillHex: '0284C7', badge: 'VN', geom: 'diamond' };
  }
  if (lower.includes('subnet')) {
    return { fillHex: '0D9488', badge: 'SN', geom: 'roundRect' };
  }
  if (lower.includes('user') || lower.includes('actor')) {
    return { fillHex: '2563EB', badge: 'USR', geom: 'ellipse' };
  }
  if (lower.includes('watcher')) {
    return { fillHex: '7C3AED', badge: 'NW', geom: 'ellipse' };
  }
  if (lower.includes('policy')) {
    return { fillHex: '059669', badge: 'POL', geom: 'roundRect' };
  }
  if (lower.includes('management group') || lower.includes('management')) {
    return { fillHex: '0284C7', badge: 'MG', geom: 'roundRect' };
  }
  if (lower.includes('apim') || lower.includes('api management')) {
    return { fillHex: '7C3AED', badge: 'API', geom: 'roundRect' };
  }
  if (lower.includes('app service') || lower.includes('container') || lower.includes('jumpbox') || lower.includes('build') || lower.includes('code interpreter')) {
    return { fillHex: '2563EB', badge: 'APP', geom: 'roundRect' };
  }
  return { fillHex: '2563EB', badge: 'CLD', geom: 'roundRect' };
}

function makeWpsLine(params: {
  x1Emu: number;
  y1Emu: number;
  x2Emu: number;
  y2Emu: number;
  strokeHex?: string;
  strokeWidthEmu?: number;
  dashed?: boolean;
  hasStartArrow?: boolean;
  hasEndArrow?: boolean;
}): El {
  const {
    x1Emu,
    y1Emu,
    x2Emu,
    y2Emu,
    strokeHex = '1E293B',
    strokeWidthEmu = 15875,
    dashed = false,
    hasStartArrow = false,
    hasEndArrow = false,
  } = params;

  const left = Math.max(0, Math.min(x1Emu, x2Emu));
  const top = Math.max(0, Math.min(y1Emu, y2Emu));
  const rawCx = Math.abs(x2Emu - x1Emu);
  const rawCy = Math.abs(y2Emu - y1Emu);
  // Keep horizontal (cy=0) and vertical (cx=0) segments 100% orthogonal with zero tilt
  const cx = rawCx < 1500 ? 0 : Math.round(rawCx);
  const cy = rawCy < 1500 ? 0 : Math.round(rawCy);

  const xfrmAttrs: Record<string, string> = {};
  if (x2Emu < x1Emu && cx > 0) xfrmAttrs.flipH = '1';
  if (y2Emu < y1Emu && cy > 0) xfrmAttrs.flipV = '1';

  const lnChildren: El[] = [new El('a:solidFill', {}, [new El('a:srgbClr', { val: cleanHex(strokeHex) })])];
  if (dashed) {
    lnChildren.push(new El('a:prstDash', { val: 'dash' }));
  }
  if (hasStartArrow) {
    lnChildren.push(new El('a:headEnd', { type: 'triangle', w: 'med', len: 'med' }));
  }
  if (hasEndArrow) {
    lnChildren.push(new El('a:tailEnd', { type: 'triangle', w: 'med', len: 'med' }));
  }

  return new El('wps:wsp', {}, [
    new El('wps:cNvSpPr', {}),
    new El('wps:spPr', {}, [
      new El('a:xfrm', xfrmAttrs, [
        new El('a:off', { x: String(Math.round(left)), y: String(Math.round(top)) }),
        new El('a:ext', { cx: String(cx), cy: String(cy) }),
      ]),
      new El('a:prstGeom', { prst: 'line' }, [new El('a:avLst', {})]),
      new El('a:ln', { w: String(Math.round(strokeWidthEmu)) }, lnChildren),
    ]),
    new El('wps:bodyPr', {}),
  ]);
}

function makeBadgeShape(params: {
  xEmu: number;
  yEmu: number;
  wEmu: number;
  hEmu: number;
  badge: string;
  fillHex: string;
  geom: 'roundRect' | 'ellipse' | 'diamond' | 'hexagon' | 'pentagon';
  fontSizeHalfPt?: number;
}): El {
  const { xEmu, yEmu, wEmu, hEmu, badge, fillHex, geom, fontSizeHalfPt = 9 } = params;
  return makeWpsShape({
    xEmu,
    yEmu,
    cxEmu: wEmu,
    cyEmu: hEmu,
    geom,
    fillHex,
    strokeHex: 'FFFFFF',
    strokeWidthEmu: 6350,
    paragraphs: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 0 },
        children: [
          new TextRun({
            text: badge,
            bold: true,
            size: fontSizeHalfPt,
            color: 'FFFFFF',
            font: 'Arial',
          }),
        ],
      }),
    ],
    isContainer: false,
    padLeftEmu: 0,
    padRightEmu: 0,
    padTopEmu: 0,
    padBottomEmu: 0,
  });
}

function buildNativeWordDrawingMlDiagram(
  vertices: ParsedMxCell[],
  edges: ParsedMxCell[],
  overrides: Record<string, { title: string; subtitle: string }>
): El {
  const cellMap = new Map<string, ParsedMxCell>();
  vertices.forEach((v) => cellMap.set(v.id, v));

  // Filter out full-bleed background canvas cell from bounding box & duplicate rendering
  const renderableVertices = vertices.filter(
    (v) => !((v.id === 'bg' || v.id.includes('bg')) && v.width >= 700 && v.height >= 400)
  );

  // Identify container nodes via explicit parent attribute or geometric containment
  const parentIds = new Set<string>();
  vertices.forEach((c) => {
    if (c.parent && c.parent !== '0' && c.parent !== '1') {
      parentIds.add(c.parent);
    }
  });
  for (const outer of renderableVertices) {
    const outerArea = outer.width * outer.height;
    if (outerArea < 12000) continue;
    for (const inner of renderableVertices) {
      if (inner.id === outer.id) continue;
      const innerArea = inner.width * inner.height;
      if (innerArea >= outerArea * 0.85) continue;
      const cx = inner.absX + inner.width / 2;
      const cy = inner.absY + inner.height / 2;
      if (
        cx >= outer.absX + 4 &&
        cx <= outer.absX + outer.width - 4 &&
        cy >= outer.absY + 4 &&
        cy <= outer.absY + outer.height - 4
      ) {
        parentIds.add(outer.id);
        break;
      }
    }
  }

  // Compute 2D bounding box across all vertices and edge coordinates
  const allXs = renderableVertices.flatMap((v) => [v.absX, v.absX + v.width]);
  const allYs = renderableVertices.flatMap((v) => [v.absY, v.absY + v.height]);
  edges.forEach((e) => {
    if (e.sourcePoint) {
      allXs.push(e.sourcePoint.x);
      allYs.push(e.sourcePoint.y);
    }
    if (e.targetPoint) {
      allXs.push(e.targetPoint.x);
      allYs.push(e.targetPoint.y);
    }
    (e.waypoints || []).forEach((wp) => {
      allXs.push(wp.x);
      allYs.push(wp.y);
    });
  });

  const minX = allXs.length > 0 ? Math.min(...allXs) : 0;
  const minY = allYs.length > 0 ? Math.min(...allYs) : 0;
  const maxX = allXs.length > 0 ? Math.max(...allXs) : 1280;
  const maxY = allYs.length > 0 ? Math.max(...allYs) : 820;

  const diagramW = Math.max(maxX - minX, 400);
  const diagramH = Math.max(maxY - minY, 300);

  // Target canvas in EMUs: 12.8 inches wide x 6.84 inches high (fills 13.33" x 7.5" landscape page)
  const canvasW = 11700000;
  const canvasH = 6250000;
  const padX = 140000;
  const padY = 110000;

  const usableW = canvasW - padX * 2;
  const usableH = canvasH - padY * 2;

  const scaleX = usableW / diagramW;
  const scaleY = usableH / diagramH;

  const toX = (x: number) => padX + (x - minX) * scaleX;
  const toY = (y: number) => padY + (y - minY) * scaleY;
  const toW = (w: number) => w * scaleX;
  const toH = (h: number) => h * scaleY;

  const groupShapes: El[] = [];
  const cardOverlayShapes: El[] = [];
  const edgeLabelShapes: El[] = [];

  // 0. Outer Canvas Background Board
  groupShapes.push(
    makeWpsShape({
      xEmu: 0,
      yEmu: 0,
      cxEmu: canvasW,
      cyEmu: canvasH,
      geom: 'rect',
      fillHex: 'F8FAFC',
      strokeHex: 'CBD5E1',
      strokeWidthEmu: 12700,
      isContainer: true,
    })
  );

  // Separate vertices into 3 distinct visual layers:
  // 1) Opaque Boxes / Enclaves / Cards (has fill or border) -> sorted by area DESCENDING
  // 2) SVG / Icon Nodes (hasSvg or image style without fill/stroke) -> rendered as vector tiles + bottom labels
  // 3) Pure Transparent Text Labels (fill=none & stroke=none & !hasSvg) -> rendered on top with zero background/border
  const opaqueVertices: ParsedMxCell[] = [];
  const svgIconVertices: ParsedMxCell[] = [];
  const transparentLabelVertices: ParsedMxCell[] = [];

  for (const v of renderableVertices) {
    const hasSvg = v.value.includes('<svg') || Boolean(v.style.image);
    const hasFill = Boolean(v.style.fillColor && v.style.fillColor !== 'none' && v.style.fillColor !== 'transparent');
    const hasStroke = Boolean(v.style.strokeColor && v.style.strokeColor !== 'none' && v.style.strokeColor !== 'transparent');

    if (hasSvg && !hasFill && !hasStroke) {
      svgIconVertices.push(v);
    } else if (!hasFill && !hasStroke) {
      transparentLabelVertices.push(v);
    } else {
      opaqueVertices.push(v);
    }
  }

  // Sort opaque boxes strictly by area descending so larger enclaves/subnets never cover smaller inner cards
  opaqueVertices.sort((a, b) => b.width * b.height - a.width * a.height);

  // LAYER 1: Opaque Enclaves, Subnets, Cylinders, and Service Cards
  for (const v of opaqueVertices) {
    const ov = overrides[v.id];
    const structured = extractStructuredNodeLayout(v.value);
    const rawLines = stripHtmlLines(v.value).map(sanitizeXmlText).filter(Boolean);

    const hasFill = Boolean(v.style.fillColor && v.style.fillColor !== 'none' && v.style.fillColor !== 'transparent');
    const hasStroke = Boolean(v.style.strokeColor && v.style.strokeColor !== 'none' && v.style.strokeColor !== 'transparent');

    const fillHex = hasFill ? cleanHex(v.style.fillColor, 'FFFFFF') : 'none';
    const strokeHex = hasStroke ? cleanHex(v.style.strokeColor, 'CBD5E1') : 'none';
    const dark = fillHex !== 'none' && isDarkHex(fillHex);
    const dashed = v.style.dashed === '1';
    const isCylinder =
      Boolean(v.style.shape && v.style.shape.toLowerCase().includes('cylinder')) || v.style.cylinder === '1';

    const geom = isCylinder
      ? 'can'
      : v.style.shape === 'ellipse' || v.style.ellipse === '1'
        ? 'ellipse'
        : v.style.shape === 'rhombus' || v.style.rhombus === '1'
          ? 'diamond'
          : v.style.rounded === '0'
            ? 'rect'
            : 'roundRect';

    const isContainer = v.style.container === '1' || parentIds.has(v.id);
    const isMultiRowIconList =
      structured.kind === 'multi-row-icon-list' && (structured.iconRows?.length || 0) >= 2;
    const isTableCard = !isContainer && structured.kind === 'table-card';

    const defaultTitleColor = dark
      ? 'FFFFFF'
      : v.style.fontColor
        ? cleanHex(v.style.fontColor, '0F172A')
        : v.htmlTitleColor
          ? cleanHex(v.htmlTitleColor, '0F172A')
          : '0F172A';
    const defaultSubColor = dark
      ? 'CBD5E1'
      : v.htmlSubtitleColor
        ? cleanHex(v.htmlSubtitleColor, '334155')
        : '334155';

    // Case 1A: Multi-Row Icon List Card (e.g., GCP Observability, AgentOps & FinOps)
    if (isMultiRowIconList && structured.iconRows) {
      const headerText = ov?.title
        ? sanitizeXmlText(ov.title)
        : sanitizeXmlText(structured.headerLines.join(' ') || rawLines[0] || '');

      const headerParagraphs = headerText
        ? [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { after: 20 },
              children: [
                new TextRun({
                  text: headerText,
                  bold: true,
                  size: 15,
                  color: defaultTitleColor,
                  font: 'Arial',
                }),
              ],
            }),
          ]
        : [];

      groupShapes.push(
        makeWpsShape({
          xEmu: toX(v.absX),
          yEmu: toY(v.absY),
          cxEmu: toW(v.width),
          cyEmu: toH(v.height),
          geom,
          fillHex,
          strokeHex,
          strokeWidthEmu: hasStroke ? 15875 : 0,
          dashed,
          paragraphs: headerParagraphs,
          isContainer: true,
          padTopEmu: 36000,
          padLeftEmu: 24000,
          padRightEmu: 24000,
        })
      );

      // Render each row as a vector icon badge + left-aligned 2-line text block
      const headerOffsetPx = 48;
      const availRowsH = Math.max(80, v.height - headerOffsetPx - 12);
      const rowSlotH = availRowsH / structured.iconRows.length;

      structured.iconRows.forEach((row, rIdx) => {
        const rowY = v.absY + headerOffsetPx + rIdx * rowSlotH;
        const badgeSize = 20;
        const badgeX = v.absX + 10;
        const badgeY = rowY + (rowSlotH - badgeSize) / 2;
        const rowBadgeInfo = getServiceBadgeInfo(`${row.title} ${row.subtitle || ''}`, `${v.id}_row_${rIdx}`);

        cardOverlayShapes.push(
          makeBadgeShape({
            xEmu: toX(badgeX),
            yEmu: toY(badgeY),
            wEmu: toW(badgeSize),
            hEmu: toH(badgeSize),
            badge: rowBadgeInfo.badge,
            fillHex: rowBadgeInfo.fillHex,
            geom: rowBadgeInfo.geom,
            fontSizeHalfPt: 8,
          })
        );

        const rowParagraphs: Paragraph[] = [
          new Paragraph({
            alignment: AlignmentType.LEFT,
            spacing: { after: 0 },
            children: [
              new TextRun({
                text: sanitizeXmlText(row.title),
                bold: true,
                size: 13,
                color: defaultTitleColor,
                font: 'Arial',
              }),
            ],
          }),
        ];
        if (row.subtitle) {
          rowParagraphs.push(
            new Paragraph({
              alignment: AlignmentType.LEFT,
              spacing: { after: 0 },
              children: [
                new TextRun({
                  text: sanitizeXmlText(row.subtitle),
                  bold: false,
                  size: 11,
                  color: defaultSubColor,
                  font: 'Arial',
                }),
              ],
            })
          );
        }

        const txtX = badgeX + badgeSize + 6;
        const txtW = Math.max(40, v.width - (txtX - v.absX) - 6);
        cardOverlayShapes.push(
          makeWpsShape({
            xEmu: toX(txtX),
            yEmu: toY(rowY),
            cxEmu: toW(txtW),
            cyEmu: toH(rowSlotH),
            geom: 'rect',
            fillHex: 'none',
            strokeHex: 'none',
            strokeWidthEmu: 0,
            paragraphs: rowParagraphs,
            isContainer: false,
            padLeftEmu: 0,
            padRightEmu: 0,
            padTopEmu: 0,
            padBottomEmu: 0,
          })
        );
      });
      continue;
    }

    // Case 1B: Single-Row Table Card (compactNodeHtml) or Standard Card
    const hasLeftIcon = isTableCard && Boolean(structured.leftIconSvg);
    const hasRightIcon = isTableCard && Boolean(structured.rightIconSvg);
    const iconBadgePx = 19;

    const padLeftEmu = hasLeftIcon ? Math.round(toW(iconBadgePx + 10)) : undefined;
    const padRightEmu = hasRightIcon ? Math.round(toW(iconBadgePx + 10)) : undefined;
    const padTopEmu = isCylinder ? Math.round(toH(Math.max(10, v.height * 0.14))) : undefined;

    const titleFontSizeHalfPt = v.height <= 26 ? 11 : v.height <= 42 ? 13 : 14;
    const subFontSizeHalfPt = Math.max(10, titleFontSizeHalfPt - 2);

    let paragraphs: Paragraph[] = [];

    if (!ov && structured.inlineSpans && structured.inlineSpans.length >= 2) {
      const spanRuns: TextRun[] = [];
      if (structured.stepBadge) {
        const badgeChar =
          CIRCLED_STEP_DIGITS[structured.stepBadge.num] || `${structured.stepBadge.num}.`;
        spanRuns.push(
          new TextRun({
            text: `${badgeChar} `,
            bold: true,
            size: titleFontSizeHalfPt + 2,
            color: cleanHex(structured.stepBadge.bgHex, '1D4ED8'),
            font: 'Arial',
          })
        );
      }
      structured.inlineSpans.forEach((sp, idx) => {
        spanRuns.push(
          new TextRun({
            text: idx === 0 ? `${sanitizeXmlText(sp.text)} ` : sanitizeXmlText(sp.text),
            bold: sp.bold ?? idx === 0,
            size: sp.isSmall ? subFontSizeHalfPt : titleFontSizeHalfPt,
            color: sp.color ? cleanHex(sp.color, defaultTitleColor) : defaultTitleColor,
            font: 'Arial',
          })
        );
      });
      paragraphs.push(
        new Paragraph({
          alignment: v.style.align === 'left' ? AlignmentType.LEFT : AlignmentType.CENTER,
          spacing: { after: 0 },
          children: spanRuns,
        })
      );
    } else {
      const sourceLines: { text: string; color?: string; bold?: boolean }[] = ov
        ? [
            { text: sanitizeXmlText(ov.title), color: defaultTitleColor, bold: true },
            ...(ov.subtitle
              ? [{ text: sanitizeXmlText(ov.subtitle), color: defaultSubColor, bold: false }]
              : []),
          ].filter((l) => Boolean(l.text))
        : structured.bodyLines.length > 0
          ? structured.bodyLines.map((b, idx) => ({
              text: sanitizeXmlText(b.text),
              color: b.color ? cleanHex(b.color, idx === 0 ? defaultTitleColor : defaultSubColor) : undefined,
              bold: idx === 0 || b.bold,
            }))
          : rawLines.map((l, idx) => ({
              text: l,
              color: idx === 0 ? defaultTitleColor : defaultSubColor,
              bold: idx === 0,
            }));

      paragraphs = sourceLines.map((ln, idx) => {
        const isFirst = idx === 0;
        const children: TextRun[] = [];
        if (isFirst && structured.stepBadge) {
          const badgeChar =
            CIRCLED_STEP_DIGITS[structured.stepBadge.num] || `${structured.stepBadge.num}.`;
          children.push(
            new TextRun({
              text: `${badgeChar} `,
              bold: true,
              size: titleFontSizeHalfPt + 2,
              color: cleanHex(structured.stepBadge.bgHex, '1D4ED8'),
              font: 'Arial',
            })
          );
        }
        const cleanText =
          isFirst && structured.stepBadge ? ln.text.replace(/^\d+\.\s*/, '') : ln.text;
        children.push(
          new TextRun({
            text: cleanText,
            bold: isFirst || Boolean(ln.bold) || dark,
            size: isFirst ? titleFontSizeHalfPt : subFontSizeHalfPt,
            color: dark
              ? 'FFFFFF'
              : ln.color || (isFirst ? defaultTitleColor : defaultSubColor),
            font: 'Arial',
          })
        );
        return new Paragraph({
          alignment:
            v.style.align === 'left' || structured.textAlign === 'left'
              ? AlignmentType.LEFT
              : AlignmentType.CENTER,
          spacing: { after: 15 },
          children,
        });
      });
    }

    groupShapes.push(
      makeWpsShape({
        xEmu: toX(v.absX),
        yEmu: toY(v.absY),
        cxEmu: toW(v.width),
        cyEmu: toH(v.height),
        geom,
        fillHex,
        strokeHex,
        strokeWidthEmu: hasStroke ? 15875 : 0,
        dashed,
        paragraphs,
        isContainer,
        padLeftEmu,
        padRightEmu,
        padTopEmu,
      })
    );

    // Emit crisp left/right vector service icon badges on cards that contain inline icons
    if (hasLeftIcon || hasRightIcon) {
      const badgeInfo = getServiceBadgeInfo(rawLines.join(' '), v.id);
      const effectiveTop = isCylinder ? v.absY + v.height * 0.1 : v.absY;
      const effectiveH = isCylinder ? v.height * 0.88 : v.height;
      const badgeY = effectiveTop + (effectiveH - iconBadgePx) / 2;

      if (hasLeftIcon) {
        cardOverlayShapes.push(
          makeBadgeShape({
            xEmu: toX(v.absX + 7),
            yEmu: toY(badgeY),
            wEmu: toW(iconBadgePx),
            hEmu: toH(iconBadgePx),
            badge: badgeInfo.badge,
            fillHex: badgeInfo.fillHex,
            geom: badgeInfo.geom,
            fontSizeHalfPt: 8,
          })
        );
      }
      if (hasRightIcon) {
        cardOverlayShapes.push(
          makeBadgeShape({
            xEmu: toX(v.absX + v.width - iconBadgePx - 7),
            yEmu: toY(badgeY),
            wEmu: toW(iconBadgePx),
            hEmu: toH(iconBadgePx),
            badge: badgeInfo.badge,
            fillHex: badgeInfo.fillHex,
            geom: badgeInfo.geom,
            fontSizeHalfPt: 8,
          })
        );
      }
    }
  }

  // LAYER 2: 100% Orthogonal 90-Degree Connectors & Edge Labels
  for (const e of edges) {
    const strokeHex = cleanHex(e.style.strokeColor, '1E293B');
    const dashed = e.style.dashed === '1';
    const hasStartArrow = Boolean(e.style.startArrow) && e.style.startArrow !== 'none';
    const hasEndArrow = !e.style.endArrow || e.style.endArrow !== 'none';

    const src = e.source ? cellMap.get(e.source) : null;
    const tgt = e.target ? cellMap.get(e.target) : null;

    let ptStart: { x: number; y: number } | undefined;
    let ptEnd: { x: number; y: number } | undefined;

    let exitXVal = 0.5;
    let exitYVal = 0.5;
    let entryXVal = 0.5;
    let entryYVal = 0.5;

    if (src) {
      if (e.style.exitX !== undefined && e.style.exitY !== undefined) {
        exitXVal = parseFloat(e.style.exitX);
        exitYVal = parseFloat(e.style.exitY);
        ptStart = {
          x: src.absX + src.width * exitXVal,
          y: src.absY + src.height * exitYVal,
        };
      } else {
        const refX =
          e.waypoints && e.waypoints[0]
            ? e.waypoints[0].x
            : e.targetPoint
              ? e.targetPoint.x
              : tgt
                ? tgt.absX + tgt.width / 2
                : src.absX + src.width;
        const refY =
          e.waypoints && e.waypoints[0]
            ? e.waypoints[0].y
            : e.targetPoint
              ? e.targetPoint.y
              : tgt
                ? tgt.absY + tgt.height / 2
                : src.absY + src.height / 2;
        const sx = src.absX + src.width / 2;
        const sy = src.absY + src.height / 2;
        if (Math.abs(refX - sx) >= Math.abs(refY - sy)) {
          exitXVal = refX >= sx ? 1 : 0;
          exitYVal = 0.5;
          ptStart = { x: refX >= sx ? src.absX + src.width : src.absX, y: sy };
        } else {
          exitXVal = 0.5;
          exitYVal = refY >= sy ? 1 : 0;
          ptStart = { x: sx, y: refY >= sy ? src.absY + src.height : src.absY };
        }
      }
    } else if (e.sourcePoint) {
      ptStart = { x: e.sourcePoint.x, y: e.sourcePoint.y };
    }

    if (tgt) {
      if (e.style.entryX !== undefined && e.style.entryY !== undefined) {
        entryXVal = parseFloat(e.style.entryX);
        entryYVal = parseFloat(e.style.entryY);
        ptEnd = {
          x: tgt.absX + tgt.width * entryXVal,
          y: tgt.absY + tgt.height * entryYVal,
        };
      } else {
        const wps = e.waypoints || [];
        const refX = wps.length > 0 ? wps[wps.length - 1].x : ptStart ? ptStart.x : tgt.absX;
        const refY =
          wps.length > 0 ? wps[wps.length - 1].y : ptStart ? ptStart.y : tgt.absY + tgt.height / 2;
        const tx = tgt.absX + tgt.width / 2;
        const ty = tgt.absY + tgt.height / 2;
        if (Math.abs(refX - tx) >= Math.abs(refY - ty)) {
          entryXVal = refX >= tx ? 1 : 0;
          entryYVal = 0.5;
          ptEnd = { x: refX >= tx ? tgt.absX + tgt.width : tgt.absX, y: ty };
        } else {
          entryXVal = 0.5;
          entryYVal = refY >= ty ? 1 : 0;
          ptEnd = { x: tx, y: refY >= ty ? tgt.absY + tgt.height : tgt.absY };
        }
      }
    } else if (e.targetPoint) {
      ptEnd = { x: e.targetPoint.x, y: e.targetPoint.y };
    }

    if (!ptStart || !ptEnd) continue;

    // Snap near-collinear endpoints/waypoints (<= 8px drift) to prevent mini-staircase kinks
    const snappedWaypoints = (e.waypoints || []).map((wp) => ({ ...wp }));
    if (snappedWaypoints.length === 0) {
      if (Math.abs(ptEnd.y - ptStart.y) <= 8 && Math.abs(ptEnd.x - ptStart.x) > 16) {
        ptEnd = { x: ptEnd.x, y: ptStart.y };
      } else if (Math.abs(ptEnd.x - ptStart.x) <= 8 && Math.abs(ptEnd.y - ptStart.y) > 16) {
        ptEnd = { x: ptStart.x, y: ptEnd.y };
      }
    } else {
      const firstWp = snappedWaypoints[0];
      if (Math.abs(firstWp.y - ptStart.y) <= 8 && Math.abs(firstWp.x - ptStart.x) > 12) {
        firstWp.y = ptStart.y;
      } else if (Math.abs(firstWp.x - ptStart.x) <= 8 && Math.abs(firstWp.y - ptStart.y) > 12) {
        firstWp.x = ptStart.x;
      }
      const lastWp = snappedWaypoints[snappedWaypoints.length - 1];
      if (Math.abs(lastWp.y - ptEnd.y) <= 8 && Math.abs(lastWp.x - ptEnd.x) > 12) {
        lastWp.y = ptEnd.y;
      } else if (Math.abs(lastWp.x - ptEnd.x) <= 8 && Math.abs(lastWp.y - ptEnd.y) > 12) {
        lastWp.x = ptEnd.x;
      }
    }

    const rawPoints = [ptStart, ...snappedWaypoints, ptEnd];
    const allPoints: { x: number; y: number }[] = [];
    for (let i = 0; i < rawPoints.length; i++) {
      const curr = rawPoints[i];
      if (allPoints.length === 0) {
        allPoints.push(curr);
        continue;
      }
      const prev = allPoints[allPoints.length - 1];
      const dx = Math.abs(curr.x - prev.x);
      const dy = Math.abs(curr.y - prev.y);
      if (dx > 4 && dy > 4) {
        const exitHoriz = Math.abs(exitXVal - 0.5) >= Math.abs(exitYVal - 0.5);
        const entryHoriz = Math.abs(entryXVal - 0.5) >= Math.abs(entryYVal - 0.5);
        if (i === 1 && rawPoints.length === 2) {
          if (exitHoriz && !entryHoriz) {
            allPoints.push({ x: curr.x, y: prev.y });
          } else if (!exitHoriz && entryHoriz) {
            allPoints.push({ x: prev.x, y: curr.y });
          } else if (exitHoriz && entryHoriz) {
            const midX = (prev.x + curr.x) / 2;
            allPoints.push({ x: midX, y: prev.y });
            allPoints.push({ x: midX, y: curr.y });
          } else {
            const midY = (prev.y + curr.y) / 2;
            allPoints.push({ x: prev.x, y: midY });
            allPoints.push({ x: curr.x, y: midY });
          }
        } else {
          const midX = (prev.x + curr.x) / 2;
          allPoints.push({ x: midX, y: prev.y });
          allPoints.push({ x: midX, y: curr.y });
        }
      }
      allPoints.push(curr);
    }

    for (let i = 0; i < allPoints.length - 1; i++) {
      const p1 = allPoints[i];
      const p2 = allPoints[i + 1];
      const isFirst = i === 0;
      const isLast = i === allPoints.length - 2;

      groupShapes.push(
        makeWpsLine({
          x1Emu: toX(p1.x),
          y1Emu: toY(p1.y),
          x2Emu: toX(p2.x),
          y2Emu: toY(p2.y),
          strokeHex,
          strokeWidthEmu: 15875,
          dashed,
          hasStartArrow: isFirst && hasStartArrow,
          hasEndArrow: isLast && hasEndArrow,
        })
      );
    }

    // Edge Label Knockout Pill (e.g., A2A, MCP, OTel AI Tracing & Debugging)
    const { fullText: rawEdgeText } = cleanHtmlToPlainText(e.value);
    const edgeLabel = sanitizeXmlText(rawEdgeText.replace(/\s+/g, ' '));
    if (edgeLabel) {
      const midIdx = Math.floor(allPoints.length / 2);
      const pA = allPoints[Math.max(0, midIdx - 1)];
      const pB = allPoints[midIdx];
      const midX = (pA.x + pB.x) / 2;
      const midY = (pA.y + pB.y) / 2;
      const lblW = Math.max(28, Math.min(130, edgeLabel.length * 5.2 + 10));
      const lblH = 16;

      edgeLabelShapes.push(
        makeWpsShape({
          xEmu: toX(midX - lblW / 2),
          yEmu: toY(midY - lblH / 2),
          cxEmu: toW(lblW),
          cyEmu: toH(lblH),
          geom: 'roundRect',
          fillHex: 'FFFFFF',
          strokeHex: 'none',
          strokeWidthEmu: 0,
          paragraphs: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { after: 0 },
              children: [
                new TextRun({
                  text: edgeLabel,
                  bold: true,
                  size: 11,
                  color: '0F172A',
                  font: 'Arial',
                }),
              ],
            }),
          ],
          isContainer: false,
          padLeftEmu: 0,
          padRightEmu: 0,
          padTopEmu: 0,
          padBottomEmu: 0,
        })
      );
    }
  }

  // Append card inner badges and edge labels above lines
  groupShapes.push(...cardOverlayShapes);
  groupShapes.push(...edgeLabelShapes);

  // LAYER 3: Standalone Native Vector Service Icon Badges + Separate Unclipped Bottom Labels
  const iconBottomLabels: El[] = [];

  for (const v of svgIconVertices) {
    const ov = overrides[v.id];
    const rawLines = stripHtmlLines(v.value).map(sanitizeXmlText).filter(Boolean);
    const lines = ov
      ? [sanitizeXmlText(ov.title), sanitizeXmlText(ov.subtitle)].filter(Boolean)
      : rawLines;

    const badgeInfo = getServiceBadgeInfo(lines.join(' '), v.id);

    const hasText = lines.length > 0;
    const iconW = hasText ? 22 : Math.min(Math.max(v.width, 16), 26);
    const iconH = hasText ? 22 : Math.min(Math.max(v.height, 16), 26);
    const iconX = hasText ? v.absX + (v.width - iconW) / 2 : v.absX;
    const iconY = hasText ? v.absY + 1 : v.absY;

    const badgeParagraph = new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 0 },
      children: [
        new TextRun({
          text: badgeInfo.badge,
          bold: true,
          size: iconH <= 18 ? 9 : 10,
          color: 'FFFFFF',
          font: 'Arial',
        }),
      ],
    });

    groupShapes.push(
      makeWpsShape({
        xEmu: toX(iconX),
        yEmu: toY(iconY),
        cxEmu: toW(iconW),
        cyEmu: toH(iconH),
        geom: badgeInfo.geom,
        fillHex: badgeInfo.fillHex,
        strokeHex: 'FFFFFF',
        strokeWidthEmu: 6350,
        paragraphs: [badgeParagraph],
        isContainer: false,
        padLeftEmu: 0,
        padRightEmu: 0,
        padTopEmu: 0,
        padBottomEmu: 0,
      })
    );

    if (hasText) {
      const fullText = lines.join(' ');
      const centerX = v.absX + v.width / 2;
      const centerY = v.absY + v.height / 2;
      const sameRowNeighbors = svgIconVertices.filter(
        (o) =>
          o.id !== v.id &&
          Math.abs(o.absY + o.height / 2 - centerY) < 28 &&
          Math.abs(o.absX + o.width / 2 - centerX) > 12
      );
      const minNeighborDist =
        sameRowNeighbors.length > 0
          ? Math.min(...sameRowNeighbors.map((o) => Math.abs(o.absX + o.width / 2 - centerX)))
          : 115;

      const maxAllowedW = Math.max(minNeighborDist - 4, 54);
      let labelW = Math.min(
        Math.max(v.width * 1.45, fullText.length > 22 ? 102 : 88),
        maxAllowedW
      );
      let labelX = centerX - labelW / 2;
      let labelY = v.absY + 23;

      if (v.id === 'mvnet_spoke_icon') {
        labelW = 64;
        labelX = v.absX - 14;
        labelY = v.absY + 23;
      }

      const labelH = 42;
      const fontSizeHalfPt = labelW <= 62 || fullText.length > 24 ? 8 : 9;

      const labelParagraphs = lines.slice(0, 3).map((line, idx) =>
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 0 },
          children: [
            new TextRun({
              text: line,
              bold: idx === 0,
              size: idx === 0 ? fontSizeHalfPt : Math.max(fontSizeHalfPt - 1, 8),
              color: '0F172A',
              font: 'Arial',
            }),
          ],
        })
      );

      iconBottomLabels.push(
        makeWpsShape({
          xEmu: toX(labelX),
          yEmu: toY(labelY),
          cxEmu: toW(labelW),
          cyEmu: toH(labelH),
          geom: 'rect',
          fillHex: 'none',
          strokeHex: 'none',
          strokeWidthEmu: 0,
          paragraphs: labelParagraphs,
          isContainer: true,
        })
      );
    }
  }

  // LAYER 4: Topmost Text Headers & Callout Notes (e.g. Session State & Shared History) + Icon Bottom Labels
  for (const v of transparentLabelVertices) {
    const ov = overrides[v.id];
    const structured = extractStructuredNodeLayout(v.value);
    const rawLines = stripHtmlLines(v.value).map(sanitizeXmlText).filter(Boolean);
    const lines = ov
      ? [sanitizeXmlText(ov.title), sanitizeXmlText(ov.subtitle)].filter(Boolean)
      : structured.bodyLines.length > 0
        ? structured.bodyLines.map((b) => sanitizeXmlText(b.text)).filter(Boolean)
        : rawLines;
    if (lines.length === 0) continue;

    const fullText = lines.join(' ');
    const isSubnetOrSectionHeader =
      fullText.includes('Subnet') ||
      fullText.includes('Networking') ||
      fullText.includes('Monitoring') ||
      fullText.includes('Management') ||
      fullText.includes('Ingress') ||
      fullText.includes('Integration');

    const displayLines = isSubnetOrSectionHeader ? [fullText] : lines;
    const maxLineLen = Math.max(...displayLines.map((l) => l.length), 6);

    const rawLabelW = isSubnetOrSectionHeader
      ? Math.min(Math.max(fullText.length * 4.8 + 14, 96), 152)
      : Math.max(v.width, maxLineLen * 5.6 + 8);
    // Clamp width so right-aligned/right-edge callouts never overflow the canvas border
    const maxAvailRightW = Math.max(v.width, maxX - v.absX);
    const labelW = v.style.align === 'left' ? Math.min(rawLabelW, maxAvailRightW) : rawLabelW;
    const labelH = isSubnetOrSectionHeader ? 18 : Math.max(v.height + 8, displayLines.length * 16);
    const labelX =
      v.style.align === 'left'
        ? v.absX
        : v.style.align === 'right'
          ? v.absX + v.width - labelW
          : v.absX + v.width / 2 - labelW / 2;
    const isCardTopHeader = v.id.includes('_hdr');
    const labelY = isCardTopHeader ? v.absY - 4 : v.absY;

    const defaultFontHex = v.style.fontColor ? cleanHex(v.style.fontColor, '0F172A') : '0F172A';
    const fontSizeHalfPt = isSubnetOrSectionHeader
      ? fullText.length > 24
        ? 9
        : 10
      : maxLineLen > 24
        ? 11
        : 13;

    const paragraphs = displayLines.map((line, idx) => {
      const structLine = !ov ? structured.bodyLines[idx] : undefined;
      const lineColor = structLine?.color
        ? cleanHex(structLine.color, defaultFontHex)
        : defaultFontHex;
      return new Paragraph({
        alignment:
          v.style.align === 'left'
            ? AlignmentType.LEFT
            : v.style.align === 'right'
              ? AlignmentType.RIGHT
              : AlignmentType.CENTER,
        spacing: { after: 0 },
        children: [
          new TextRun({
            text: line,
            bold: idx === 0 || Boolean(structLine?.bold),
            size: idx === displayLines.length - 1 && displayLines.length >= 3 ? Math.max(fontSizeHalfPt - 2, 10) : fontSizeHalfPt,
            color: lineColor,
            font: 'Arial',
          }),
        ],
      });
    });

    groupShapes.push(
      makeWpsShape({
        xEmu: toX(labelX),
        yEmu: toY(labelY),
        cxEmu: toW(labelW),
        cyEmu: toH(labelH),
        geom: isSubnetOrSectionHeader ? 'roundRect' : 'rect',
        fillHex: isSubnetOrSectionHeader ? 'FFFFFF' : 'none',
        strokeHex: 'none',
        strokeWidthEmu: 0,
        paragraphs,
        isContainer: isSubnetOrSectionHeader,
      })
    );
  }

  groupShapes.push(...iconBottomLabels);

  return new El('w:r', {}, [
    new El('w:drawing', {}, [
      new El('wp:inline', { distT: '0', distB: '0', distL: '0', distR: '0' }, [
        new El('wp:extent', { cx: String(canvasW), cy: String(canvasH) }),
        new El('wp:docPr', { id: '1', name: 'FullArchitectureDiagram' }),
        new El(
          'a:graphic',
          { 'xmlns:a': 'http://schemas.openxmlformats.org/drawingml/2006/main' },
          [
            new El(
              'a:graphicData',
              { uri: 'http://schemas.microsoft.com/office/word/2010/wordprocessingGroup' },
              [
                new El(
                  'wpg:wgp',
                  {
                    'xmlns:wpg':
                      'http://schemas.microsoft.com/office/word/2010/wordprocessingGroup',
                    'xmlns:wps':
                      'http://schemas.microsoft.com/office/word/2010/wordprocessingShape',
                  },
                  [
                    new El('wpg:cNvGrpSpPr', {}),
                    new El('wpg:grpSpPr', {}, [
                      new El('a:xfrm', {}, [
                        new El('a:off', { x: '0', y: '0' }),
                        new El('a:ext', { cx: String(canvasW), cy: String(canvasH) }),
                        new El('a:chOff', { x: '0', y: '0' }),
                        new El('a:chExt', { cx: String(canvasW), cy: String(canvasH) }),
                      ]),
                    ]),
                    ...groupShapes,
                  ]
                ),
              ]
            ),
          ]
        ),
      ]),
    ]),
  ]);
}

export async function exportDrawioToEditableDocx(
  xmlContent: string,
  diagramName: string = 'Architecture Blueprint',
  blueprintId: string = 'VIS-MASTER',
  options?: {
    returnBlob?: boolean;
    returnBase64?: boolean;
    masterImageSrc?: string;
    bridgeId?: string;
    editableOverrides?: Record<string, { title: string; subtitle: string }>;
  }
): Promise<Blob | string | void> {
  const { cells } = parseDrawioXmlForPptx(xmlContent);
  const overrides = options?.editableOverrides || {};
  const vertices = cells.filter((c) => c.vertex && c.width > 5 && c.height > 5);
  const edges = cells.filter((c) => c.edge);

  const drawingGroup = buildNativeWordDrawingMlDiagram(vertices, edges, overrides);

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            size: {
              orientation: PageOrientation.LANDSCAPE,
              width: 10800, // 7.5 inches (swapped to height in landscape)
              height: 19200, // 13.33 inches (swapped to width in landscape)
            },
            margin: { top: 220, bottom: 220, left: 280, right: 280 },
          },
        },
        children: [
          new Paragraph({
            spacing: { before: 0, after: 0 },
            children: [drawingGroup],
          }),
        ],
      },
    ],
  });

  if (options?.returnBase64) {
    return await Packer.toBase64String(doc);
  }

  const blob = await Packer.toBlob(doc);

  if (options?.returnBlob) {
    return blob;
  }

  if (typeof window !== 'undefined') {
    const cleanName = diagramName.toLowerCase().replace(/[^a-z0-9]+/g, '_');
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${cleanName}_editable_word_diagram.docx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}
