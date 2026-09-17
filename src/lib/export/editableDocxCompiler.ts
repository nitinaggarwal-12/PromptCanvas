/**
 * Draw.io XML to 100% Native Editable Word (.docx) & Google Docs Vector Diagram Compiler
 *
 * Generates a Widescreen Landscape (16:9 - 13.33" x 7.5") .docx document that opens on Page 1 / 1
 * in Google Docs (docs.google.com/viewer or Google Drive) and Microsoft Word containing:
 *  - A 100% Native Word DrawingML Vector Architecture Diagram (<wpg:wgp> containing <wps:wsp>
 *    shapes, enclave containers, service nodes, editable text boxes, and polyline connectors).
 *  - ZERO node information tables or multi-page inventory lists.
 *  - Every single diagram shape, enclave label, service card, and connector line is a native
 *    vector object inside the Word document.
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
import { parseDrawioXmlForPptx, ParsedMxCell } from './editablePptxCompiler';

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

function getTintHex(strokeHex: string, fillStr: string | undefined, isContainer: boolean): string {
  if (fillStr && fillStr !== 'none' && fillStr !== 'transparent') {
    const cleanedFill = cleanHex(fillStr, '');
    if (cleanedFill && cleanedFill !== 'FFFFFF') {
      return cleanedFill;
    }
  }
  const hex = cleanHex(strokeHex, '0284C7');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  if (isContainer) {
    if (b > r + 30 && b > g) return 'F0F9FF';
    if (g > r + 20 && b > r + 20) return 'F0FDFA';
    if (g > r + 20 && g > b) return 'F0FDF4';
    if (r > b + 40 && g > b + 20) return 'FFFBEB';
    if (r > g + 30 && b > g + 20) return 'FAF5FF';
    return 'F8FAFC';
  }
  return 'FFFFFF';
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
  const noSvg = decoded.replace(/<svg[\s\S]*?<\/svg>/gi, '');
  return noSvg
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/div>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
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
  wspChildren.push(
    new El('wps:bodyPr', {
      lIns: isZeroPad ? '0' : isContainer ? '36000' : '10000',
      tIns: isZeroPad ? '0' : isContainer ? '24000' : '6000',
      rIns: isZeroPad ? '0' : isContainer ? '36000' : '10000',
      bIns: isZeroPad ? '0' : isContainer ? '24000' : '6000',
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
    return { fillHex: '6366F1', badge: 'AGT', geom: 'roundRect' };
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
  if (lower.includes('log') || lower.includes('insight') || lower.includes('monitor')) {
    return { fillHex: '4F46E5', badge: 'MON', geom: 'roundRect' };
  }
  if (lower.includes('cost')) {
    return { fillHex: '16A34A', badge: 'CST', geom: 'roundRect' };
  }
  if (lower.includes('role') || lower.includes('rbac')) {
    return { fillHex: '059669', badge: 'IAM', geom: 'ellipse' };
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
  return { fillHex: '0284C7', badge: 'AZ', geom: 'roundRect' };
}

function makeWpsLine(params: {
  x1Emu: number;
  y1Emu: number;
  x2Emu: number;
  y2Emu: number;
  strokeHex?: string;
  strokeWidthEmu?: number;
  dashed?: boolean;
  hasArrow?: boolean;
}): El {
  const {
    x1Emu,
    y1Emu,
    x2Emu,
    y2Emu,
    strokeHex = '0284C7',
    strokeWidthEmu = 15875,
    dashed = false,
    hasArrow = false,
  } = params;

  const left = Math.max(0, Math.min(x1Emu, x2Emu));
  const top = Math.max(0, Math.min(y1Emu, y2Emu));
  const cx = Math.max(Math.abs(x2Emu - x1Emu), 12700);
  const cy = Math.max(Math.abs(y2Emu - y1Emu), 12700);

  const xfrmAttrs: Record<string, string> = {};
  if (x2Emu < x1Emu) xfrmAttrs.flipH = '1';
  if (y2Emu < y1Emu) xfrmAttrs.flipV = '1';

  const lnChildren: El[] = [new El('a:solidFill', {}, [new El('a:srgbClr', { val: cleanHex(strokeHex) })])];
  if (dashed) {
    lnChildren.push(new El('a:prstDash', { val: 'dash' }));
  }
  if (hasArrow) {
    lnChildren.push(new El('a:tailEnd', { type: 'triangle', w: 'med', len: 'med' }));
  }

  return new El('wps:wsp', {}, [
    new El('wps:cNvSpPr', {}),
    new El('wps:spPr', {}, [
      new El('a:xfrm', xfrmAttrs, [
        new El('a:off', { x: String(Math.round(left)), y: String(Math.round(top)) }),
        new El('a:ext', { cx: String(Math.round(cx)), cy: String(Math.round(cy)) }),
      ]),
      new El('a:prstGeom', { prst: 'line' }, [new El('a:avLst', {})]),
      new El('a:ln', { w: String(Math.round(strokeWidthEmu)) }, lnChildren),
    ]),
    new El('wps:bodyPr', {}),
  ]);
}

function buildNativeWordDrawingMlDiagram(
  vertices: ParsedMxCell[],
  edges: ParsedMxCell[],
  overrides: Record<string, { title: string; subtitle: string }>
): El {
  const cellMap = new Map<string, ParsedMxCell>();
  vertices.forEach((v) => cellMap.set(v.id, v));

  // Compute 2D bounding box across all vertices and edge coordinates
  const allXs = vertices.flatMap((v) => [v.absX, v.absX + v.width]);
  const allYs = vertices.flatMap((v) => [v.absY, v.absY + v.height]);
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
  const maxX = allXs.length > 0 ? Math.max(...allXs) : 1400;
  const maxY = allYs.length > 0 ? Math.max(...allYs) : 800;

  const diagramW = Math.max(maxX - minX, 400);
  const diagramH = Math.max(maxY - minY, 300);

  // Target canvas in EMUs: 12.8 inches wide x 6.55 inches high (fills 13.33" x 7.5" landscape page edge-to-edge)
  const canvasW = 11700000;
  const canvasH = 5980000;
  const padX = 120000;
  const padY = 100000;

  const usableW = canvasW - padX * 2;
  const usableH = canvasH - padY * 2;

  const scaleX = usableW / diagramW;
  const scaleY = usableH / diagramH;

  const toX = (x: number) => padX + (x - minX) * scaleX;
  const toY = (y: number) => padY + (y - minY) * scaleY;
  const toW = (w: number) => w * scaleX;
  const toH = (h: number) => h * scaleY;

  const groupShapes: El[] = [];

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
  // 2) SVG / Icon Nodes (hasSvg or image style) -> rendered as sleek colored Azure vector tiles + separate bottom labels
  // 3) Pure Transparent Text Labels (fill=none & stroke=none & !hasSvg) -> rendered on top with zero background/border
  const opaqueVertices: ParsedMxCell[] = [];
  const svgIconVertices: ParsedMxCell[] = [];
  const transparentLabelVertices: ParsedMxCell[] = [];

  for (const v of vertices) {
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

  // LAYER 1: Opaque Enclaves, Subnets, and Service Cards
  for (const v of opaqueVertices) {
    const ov = overrides[v.id];
    const rawLines = stripHtmlLines(v.value).map(sanitizeXmlText).filter(Boolean);
    const lines = ov
      ? [sanitizeXmlText(ov.title), sanitizeXmlText(ov.subtitle)].filter(Boolean)
      : rawLines;

    const hasFill = Boolean(v.style.fillColor && v.style.fillColor !== 'none' && v.style.fillColor !== 'transparent');
    const hasStroke = Boolean(v.style.strokeColor && v.style.strokeColor !== 'none' && v.style.strokeColor !== 'transparent');

    const fillHex = hasFill ? cleanHex(v.style.fillColor, 'FFFFFF') : 'none';
    const strokeHex = hasStroke ? cleanHex(v.style.strokeColor, 'CBD5E1') : 'none';
    const dark = fillHex !== 'none' && isDarkHex(fillHex);
    const dashed = v.style.dashed === '1';

    // Determine if this opaque box acts as a container for other vertices
    const isContainer =
      v.style.verticalAlign === 'top' ||
      v.style.container === '1' ||
      (v.width * v.height > 12000 && lines.length > 0 && v.height > 55);

    const paragraphs = lines.slice(0, 2).map((line, idx) =>
      new Paragraph({
        alignment: v.style.align === 'left' ? AlignmentType.LEFT : AlignmentType.CENTER,
        spacing: { after: 2 },
        children: [
          new TextRun({
            text: line,
            bold: idx === 0 || dark,
            size: v.height <= 26 ? 11 : v.height <= 42 ? 13 : 14,
            color: dark ? 'FFFFFF' : v.style.fontColor ? cleanHex(v.style.fontColor, '0F172A') : '0F172A',
            font: 'Arial',
          }),
        ],
      })
    );

    groupShapes.push(
      makeWpsShape({
        xEmu: toX(v.absX),
        yEmu: toY(v.absY),
        cxEmu: toW(v.width),
        cyEmu: toH(v.height),
        geom:
          v.style.shape === 'ellipse'
            ? 'ellipse'
            : v.style.rounded === '0'
              ? 'rect'
              : 'roundRect',
        fillHex,
        strokeHex,
        strokeWidthEmu: hasStroke ? 12700 : 0,
        dashed,
        paragraphs,
        isContainer,
      })
    );
  }

  // LAYER 2: Polyline & Orthogonal Connectors (drawn over containers, under icons/labels)
  for (const e of edges) {
    const strokeHex = cleanHex(e.style.strokeColor, '0284C7');
    const dashed = e.style.dashed === '1';
    const hasEndArrow = e.style.endArrow !== 'none';

    const src = e.source ? cellMap.get(e.source) : null;
    const tgt = e.target ? cellMap.get(e.target) : null;

    let startPt = e.sourcePoint ? { x: e.sourcePoint.x, y: e.sourcePoint.y } : null;
    let endPt = e.targetPoint ? { x: e.targetPoint.x, y: e.targetPoint.y } : null;

    if (!startPt && src) {
      const refX =
        e.waypoints && e.waypoints[0]
          ? e.waypoints[0].x
          : endPt
            ? endPt.x
            : tgt
              ? tgt.absX + tgt.width / 2
              : src.absX + src.width;
      const refY =
        e.waypoints && e.waypoints[0]
          ? e.waypoints[0].y
          : endPt
            ? endPt.y
            : tgt
              ? tgt.absY + tgt.height / 2
              : src.absY + src.height / 2;
      const sx = src.absX + src.width / 2;
      const sy = src.absY + src.height / 2;
      if (Math.abs(refX - sx) >= Math.abs(refY - sy)) {
        startPt = { x: refX >= sx ? src.absX + src.width : src.absX, y: sy };
      } else {
        startPt = { x: sx, y: refY >= sy ? src.absY + src.height : src.absY };
      }
    }

    if (!endPt && tgt) {
      const wps = e.waypoints || [];
      const refX = wps.length > 0 ? wps[wps.length - 1].x : startPt ? startPt.x : tgt.absX;
      const refY =
        wps.length > 0 ? wps[wps.length - 1].y : startPt ? startPt.y : tgt.absY + tgt.height / 2;
      const tx = tgt.absX + tgt.width / 2;
      const ty = tgt.absY + tgt.height / 2;
      if (Math.abs(refX - tx) >= Math.abs(refY - ty)) {
        endPt = { x: refX >= tx ? tgt.absX + tgt.width : tgt.absX, y: ty };
      } else {
        endPt = { x: tx, y: refY >= ty ? tgt.absY + tgt.height : tgt.absY };
      }
    }

    if (!startPt || !endPt) continue;

    const pts = [startPt];
    if (e.waypoints && e.waypoints.length > 0) {
      pts.push(...e.waypoints);
    } else if (Math.abs(startPt.x - endPt.x) > 15 && Math.abs(startPt.y - endPt.y) > 15) {
      if (Math.abs(endPt.x - startPt.x) >= Math.abs(endPt.y - startPt.y)) {
        const midX = (startPt.x + endPt.x) / 2;
        pts.push({ x: midX, y: startPt.y }, { x: midX, y: endPt.y });
      } else {
        const midY = (startPt.y + endPt.y) / 2;
        pts.push({ x: startPt.x, y: midY }, { x: endPt.x, y: midY });
      }
    }
    pts.push(endPt);

    for (let i = 0; i < pts.length - 1; i++) {
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const isLast = i === pts.length - 2;
      groupShapes.push(
        makeWpsLine({
          x1Emu: toX(p1.x),
          y1Emu: toY(p1.y),
          x2Emu: toX(p2.x),
          y2Emu: toY(p2.y),
          strokeHex,
          strokeWidthEmu: 15875,
          dashed,
          hasArrow: isLast && hasEndArrow,
        })
      );
    }
  }

  // LAYER 3: Native Vector Service Icon Badges + Separate Unclipped Bottom Labels
  const iconBottomLabels: El[] = [];

  for (const v of svgIconVertices) {
    const ov = overrides[v.id];
    const rawLines = stripHtmlLines(v.value).map(sanitizeXmlText).filter(Boolean);
    const lines = ov
      ? [sanitizeXmlText(ov.title), sanitizeXmlText(ov.subtitle)].filter(Boolean)
      : rawLines;

    const badgeInfo = getServiceBadgeInfo(lines.join(' '), v.id);

    // If vertex has text below it (e.g. 72x54 icon+label box), place 22x22 icon badge at top center
    // If vertex is a pure icon badge (e.g. 18x18 NSG shield or 26x26 orch icon), use its exact box
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
          size: iconH <= 18 ? 9 : 10, // 4.5pt or 5pt crisp white monogram
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
      })
    );

    // Separate Unclipped Bottom Label Box (drawn in Layer 4 so it is never covered)
    if (hasText) {
      const fullText = lines.join(' ');
      // Dynamically find nearest horizontal neighbor on the same row to prevent horizontal label overlap
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

      // Special corner adjustment for Spoke VNet icon so its label sits cleanly left of Managed Online Endpoint
      if (v.id === 'mvnet_spoke_icon') {
        labelW = 64;
        labelX = v.absX - 14;
        labelY = v.absY + 23;
      }

      const labelH = 42; // Generous height for 2-3 lines with zero vertical clipping
      const fontSizeHalfPt = labelW <= 62 || fullText.length > 24 ? 8 : 9; // 4pt or 4.5pt crisp font

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
          isContainer: true, // top-aligned with 0 padding
        })
      );
    }
  }

  // LAYER 4: Topmost Text Headers (e.g. Subnet titles, Workload resources, Orchestrator label) + Icon Bottom Labels
  for (const v of transparentLabelVertices) {
    const ov = overrides[v.id];
    const rawLines = stripHtmlLines(v.value).map(sanitizeXmlText).filter(Boolean);
    const lines = ov
      ? [sanitizeXmlText(ov.title), sanitizeXmlText(ov.subtitle)].filter(Boolean)
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

    // Render subnet headers as a single crisp line inside a white pill so they never wrap or clip vertically
    const displayLines = isSubnetOrSectionHeader ? [fullText] : lines.slice(0, 2);

    const labelW = isSubnetOrSectionHeader
      ? Math.min(Math.max(fullText.length * 4.8 + 14, 96), 152)
      : Math.max(v.width * 1.25, fullText.length * 5.0);
    const labelH = isSubnetOrSectionHeader ? 18 : Math.max(v.height + 12, 28);
    const labelX =
      v.style.align === 'left'
        ? v.absX
        : v.style.align === 'right'
          ? v.absX + v.width - labelW
          : v.absX + v.width / 2 - labelW / 2;
    const isCardTopHeader = v.id.includes('_hdr');
    const labelY = isCardTopHeader ? v.absY - 4 : v.absY;

    const fontHex = v.style.fontColor ? cleanHex(v.style.fontColor, '0F172A') : '0F172A';
    const fontSizeHalfPt = isSubnetOrSectionHeader
      ? fullText.length > 24
        ? 9
        : 10
      : fullText.length > 28
        ? 10
        : v.height >= 22
          ? 13
          : 11;

    const paragraphs = displayLines.map((line, idx) =>
      new Paragraph({
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
            bold: true,
            size: idx === 0 ? fontSizeHalfPt : Math.max(fontSizeHalfPt - 2, 9),
            color: fontHex,
            font: 'Arial',
          }),
        ],
      })
    );

    // Subnet headers get a crisp white pill background with zero padding (`isContainer: true` + `fillHex: 'FFFFFF'`)
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
        isContainer: true,
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
            margin: { top: 260, bottom: 260, left: 320, right: 320 },
          },
        },
        children: [
          new Paragraph({
            spacing: { after: 60 },
            children: [
              new TextRun({
                text: `${diagramName} — Editable Word Architecture Diagram (${blueprintId})`,
                bold: true,
                size: 24,
                color: '0F172A',
                font: 'Arial',
              }),
              new TextRun({
                text: `   •   100% Native Editable Word Vector Shapes (${vertices.length} Objects & ${edges.length} Connectors)`,
                size: 16,
                color: '475569',
                font: 'Arial',
              }),
            ],
          }),
          new Paragraph({
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
