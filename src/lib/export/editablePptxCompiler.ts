/**
 * Draw.io XML to 100% Native Editable PowerPoint (.pptx) & Google Slides Compiler
 * Converts every Draw.io <mxCell> container, card, node, inline SVG icon, base64 style.image SVG icon,
 * text box, and connector edge into crisp presentation slides.
 *
 * Slide Deck Structure:
 * - Slide 1: 100% 1:1 Master High-Resolution Widescreen Architecture Slide (Zero Deformity Guarantee)
 * - Slide 2: 100% Decomposed Native Editable Vector Shapes, Crisp Icons & Connectors Slide
 * - Slide 3: Editable Architectural Component & Role Specification Table
 */

import PptxGenJS from 'pptxgenjs';
import { XMLParser } from 'fast-xml-parser';
import { exportDiagramPng } from './diagramRaster';

export interface ParsedMxCell {
  id: string;
  value: string;
  style: Record<string, string>;
  vertex: boolean;
  edge: boolean;
  parent: string;
  source?: string;
  target?: string;
  sourcePoint?: { x: number; y: number };
  targetPoint?: { x: number; y: number };
  x: number;
  y: number;
  width: number;
  height: number;
  absX: number;
  absY: number;
  depth: number;
  waypoints: { x: number; y: number }[];
  extractedSvgs: string[];
  imageDataUrl?: string;
  htmlTitleColor?: string;
  htmlSubtitleColor?: string;
}

function parseStyleString(styleStr: string): Record<string, string> {
  const result: Record<string, string> = {};
  if (!styleStr) return result;
  const protectedStr = styleStr
    .replace(/data:([^;]+);base64,/g, 'data:$1__SEMI_BASE64__')
    .replace(/data:([^;]+);utf8,/g, 'data:$1__SEMI_UTF8__');
  const parts = protectedStr.split(';');
  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) {
      result[trimmed] = '1';
    } else {
      const k = trimmed.substring(0, eqIdx).trim();
      const v = trimmed
        .substring(eqIdx + 1)
        .trim()
        .replace(/__SEMI_BASE64__/g, ';base64,')
        .replace(/__SEMI_UTF8__/g, ';utf8,');
      result[k] = v;
    }
  }
  return result;
}

function decodeStyleImageToSvg(styleImage?: string): string | null {
  if (!styleImage) return null;
  try {
    if (styleImage.startsWith('data:image/svg+xml;base64,')) {
      const b64 = styleImage.substring('data:image/svg+xml;base64,'.length);
      if (typeof window !== 'undefined' && typeof window.atob === 'function') {
        return decodeURIComponent(escape(window.atob(b64)));
      } else if (typeof Buffer !== 'undefined') {
        return Buffer.from(b64, 'base64').toString('utf-8');
      }
    } else if (styleImage.startsWith('data:image/svg+xml;utf8,')) {
      return decodeURIComponent(styleImage.substring('data:image/svg+xml;utf8,'.length));
    } else if (styleImage.startsWith('data:image/svg+xml,')) {
      return decodeURIComponent(styleImage.substring('data:image/svg+xml,'.length));
    }
  } catch (e) {
    console.warn('Failed to decode style.image SVG:', e);
  }
  return null;
}

function extractHtmlColorsAndSvgs(
  html: string,
  styleImage?: string
): {
  svgs: string[];
  titleColor?: string;
  subtitleColor?: string;
} {
  const svgs: string[] = [];

  // 1. Check style.image first (used by Azure Landing Zone & GCP stencils)
  const decodedStyleSvg = decodeStyleImageToSvg(styleImage);
  if (decodedStyleSvg && decodedStyleSvg.includes('<svg')) {
    svgs.push(decodedStyleSvg);
  }

  if (!html) return { svgs };
  const decoded = html
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');

  const svgRegex = /<svg[\s\S]*?<\/svg>/gi;
  let match;
  while ((match = svgRegex.exec(decoded)) !== null) {
    svgs.push(match[0]);
  }

  const withoutSvg = decoded.replace(svgRegex, '');
  const colorMatches: string[] = [];
  const cssColorRegex = /(?:color\s*:\s*|color\s*=\s*["'])(#[0-9a-fA-F]{3,6})/gi;
  let cm;
  while ((cm = cssColorRegex.exec(withoutSvg)) !== null) {
    let hex = cm[1].replace('#', '').trim().toUpperCase();
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (/^[0-9A-F]{6}$/.test(hex)) {
      colorMatches.push(hex);
    }
  }

  return {
    svgs,
    titleColor: colorMatches[0],
    subtitleColor: colorMatches[1] || colorMatches[0],
  };
}

export function cleanHtmlToPlainText(html: string): { title: string; subtitle: string; fullText: string } {
  if (!html) return { title: '', subtitle: '', fullText: '' };
  const decoded = html
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');

  // Remove inline <svg>...</svg> blocks completely so SVG paths don't leak into text
  const noSvg = decoded.replace(/<svg[\s\S]*?<\/svg>/gi, '');

  // Replace block tags and line breaks with newlines
  const withNewlines = noSvg
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/div>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<[^>]+>/g, '');

  const lines = withNewlines
    .split('\n')
    .map((l) => l.replace(/\s+/g, ' ').trim())
    .filter(Boolean);

  if (lines.length === 0) {
    return { title: '', subtitle: '', fullText: '' };
  }

  const title = lines[0];
  const subtitle = lines.slice(1).join(' • ');
  const fullText = lines.join('\n');
  return { title, subtitle, fullText };
}

function normalizeHexColor(colorStr: string | undefined, fallback: string): string {
  if (!colorStr || colorStr === 'none' || colorStr === 'transparent') return fallback;
  let clean = colorStr.replace('#', '').trim().toUpperCase();
  if (clean.length === 3) {
    clean = clean[0] + clean[0] + clean[1] + clean[1] + clean[2] + clean[2];
  }
  if (/^[0-9A-F]{6}$/.test(clean)) {
    return clean;
  }
  return fallback;
}

function isDarkColor(hex: string): boolean {
  const clean = normalizeHexColor(hex, 'FFFFFF');
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.52;
}

/**
 * Renders an inline <svg> string OR data:image URL into a high-resolution transparent PNG data URL
 * so PowerPoint / Google Slides can display crisp vector icons on every card.
 */
export async function renderInlineSvgToPngDataUrl(
  svgOrDataUrl: string,
  widthPx: number = 128,
  heightPx: number = 128
): Promise<string | null> {
  if (typeof window === 'undefined' || !svgOrDataUrl) return null;
  return new Promise((resolve) => {
    try {
      let url = '';
      let shouldRevoke = false;

      if (svgOrDataUrl.startsWith('data:image/')) {
        url = svgOrDataUrl;
      } else {
        let cleanSvg = svgOrDataUrl.trim();
        if (!cleanSvg.includes('xmlns=')) {
          cleanSvg = cleanSvg.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
        }
        if (!/width=["']\d+/.test(cleanSvg)) {
          cleanSvg = cleanSvg.replace('<svg', `<svg width="${widthPx}" height="${heightPx}"`);
        }
        const svgBlob = new Blob([cleanSvg], { type: 'image/svg+xml;charset=utf-8' });
        url = URL.createObjectURL(svgBlob);
        shouldRevoke = true;
      }

      const img = new Image();
      img.crossOrigin = 'anonymous';

      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = widthPx;
          canvas.height = heightPx;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.clearRect(0, 0, widthPx, heightPx);
            ctx.drawImage(img, 0, 0, widthPx, heightPx);
            const dataUrl = canvas.toDataURL('image/png');
            if (shouldRevoke) URL.revokeObjectURL(url);
            resolve(dataUrl);
            return;
          }
        } catch (err) {
          console.warn('SVG canvas draw error:', err);
        }
        if (shouldRevoke) URL.revokeObjectURL(url);
        resolve(null);
      };

      img.onerror = () => {
        if (shouldRevoke) URL.revokeObjectURL(url);
        resolve(null);
      };

      img.src = url;
    } catch {
      resolve(null);
    }
  });
}

export function parseDrawioXmlForPptx(xmlContent: string): {
  cells: ParsedMxCell[];
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  isDarkDiagram: boolean;
  diagramBgHex: string;
} {
  const cellMap = new Map<string, ParsedMxCell>();
  let detectedBgHex = '';

  if (typeof DOMParser !== 'undefined') {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlContent, 'text/xml');
    const graphModel = doc.querySelector('mxGraphModel');
    const modelBgAttr = graphModel?.getAttribute('background');
    if (modelBgAttr) detectedBgHex = normalizeHexColor(modelBgAttr, 'F8FAFC');

    const rawCells = Array.from(doc.getElementsByTagName('mxCell'));
    for (const el of rawCells) {
      const id = el.getAttribute('id') || '';
      if (id === '0' || id === '1') continue;

      const value = el.getAttribute('value') || '';
      const styleStr = el.getAttribute('style') || '';
      const style = parseStyleString(styleStr);
      const vertex = el.getAttribute('vertex') === '1';
      const edge = el.getAttribute('edge') === '1';
      const parent = el.getAttribute('parent') || '1';
      const source = el.getAttribute('source') || undefined;
      const target = el.getAttribute('target') || undefined;

      let x = 0;
      let y = 0;
      let width = 0;
      let height = 0;
      let sourcePoint: { x: number; y: number } | undefined;
      let targetPoint: { x: number; y: number } | undefined;
      const waypoints: { x: number; y: number }[] = [];

      const geo = el.getElementsByTagName('mxGeometry')[0];
      if (geo) {
        x = parseFloat(geo.getAttribute('x') || '0');
        y = parseFloat(geo.getAttribute('y') || '0');
        width = parseFloat(geo.getAttribute('width') || '0');
        height = parseFloat(geo.getAttribute('height') || '0');

        const childPoints = Array.from(geo.getElementsByTagName('mxPoint'));
        for (const pt of childPoints) {
          const asAttr = pt.getAttribute('as');
          const px = parseFloat(pt.getAttribute('x') || '0');
          const py = parseFloat(pt.getAttribute('y') || '0');
          if (asAttr === 'sourcePoint') {
            sourcePoint = { x: px, y: py };
          } else if (asAttr === 'targetPoint') {
            targetPoint = { x: px, y: py };
          } else if (!asAttr && !isNaN(px) && !isNaN(py)) {
            waypoints.push({ x: px, y: py });
          }
        }
      }

      if (vertex && width >= 700 && height >= 400 && style.fillColor && style.fillColor !== 'none') {
        const candidateHex = normalizeHexColor(style.fillColor, 'FFFFFF');
        if (!detectedBgHex) {
          detectedBgHex = candidateHex;
        }
      }

      const { svgs, titleColor, subtitleColor } = extractHtmlColorsAndSvgs(value, style.image);

      cellMap.set(id, {
        id,
        value,
        style,
        vertex,
        edge,
        parent,
        source,
        target,
        sourcePoint,
        targetPoint,
        x,
        y,
        width,
        height,
        absX: x,
        absY: y,
        depth: 0,
        waypoints,
        extractedSvgs: svgs,
        imageDataUrl: style.image,
        htmlTitleColor: titleColor,
        htmlSubtitleColor: subtitleColor,
      });
    }
  } else {
    // Node.js server / CLI quality gate parser using fast-xml-parser
    const xmlParser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '@_' });
    const parsedObj = xmlParser.parse(xmlContent);
    const diagramNode = parsedObj?.mxfile?.diagram || parsedObj?.diagram || parsedObj;
    const graphModel = diagramNode?.mxGraphModel || parsedObj?.mxGraphModel || diagramNode;
    const modelBgAttr = graphModel?.['@_background'];
    if (modelBgAttr) detectedBgHex = normalizeHexColor(modelBgAttr, 'F8FAFC');

    const rootNode = graphModel?.root || graphModel;
    const rawCellsObj = rootNode?.mxCell || [];
    const rawCells = Array.isArray(rawCellsObj) ? rawCellsObj : [rawCellsObj];

    for (const el of rawCells) {
      if (!el) continue;
      const id = String(el['@_id'] || '');
      if (id === '0' || id === '1') continue;

      const value = String(el['@_value'] || '');
      const styleStr = String(el['@_style'] || '');
      const style = parseStyleString(styleStr);
      const vertex = String(el['@_vertex']) === '1';
      const edge = String(el['@_edge']) === '1';
      const parent = String(el['@_parent'] || '1');
      const source = el['@_source'] ? String(el['@_source']) : undefined;
      const target = el['@_target'] ? String(el['@_target']) : undefined;

      let x = 0;
      let y = 0;
      let width = 0;
      let height = 0;
      let sourcePoint: { x: number; y: number } | undefined;
      let targetPoint: { x: number; y: number } | undefined;
      const waypoints: { x: number; y: number }[] = [];

      const geo = el.mxGeometry;
      if (geo) {
        x = parseFloat(geo['@_x'] || '0');
        y = parseFloat(geo['@_y'] || '0');
        width = parseFloat(geo['@_width'] || '0');
        height = parseFloat(geo['@_height'] || '0');

        const ptsRaw = geo.mxPoint || (geo.Array?.mxPoint ? geo.Array.mxPoint : []);
        const pts = Array.isArray(ptsRaw) ? ptsRaw : [ptsRaw];
        for (const pt of pts) {
          if (!pt) continue;
          const asAttr = pt['@_as'];
          const px = parseFloat(pt['@_x'] || '0');
          const py = parseFloat(pt['@_y'] || '0');
          if (asAttr === 'sourcePoint') {
            sourcePoint = { x: px, y: py };
          } else if (asAttr === 'targetPoint') {
            targetPoint = { x: px, y: py };
          } else if (!asAttr && !isNaN(px) && !isNaN(py)) {
            waypoints.push({ x: px, y: py });
          }
        }
      }

      if (vertex && width >= 700 && height >= 400 && style.fillColor && style.fillColor !== 'none') {
        const candidateHex = normalizeHexColor(style.fillColor, 'FFFFFF');
        if (!detectedBgHex) {
          detectedBgHex = candidateHex;
        }
      }

      const { svgs, titleColor, subtitleColor } = extractHtmlColorsAndSvgs(value, style.image);

      cellMap.set(id, {
        id,
        value,
        style,
        vertex,
        edge,
        parent,
        source,
        target,
        sourcePoint,
        targetPoint,
        x,
        y,
        width,
        height,
        absX: x,
        absY: y,
        depth: 0,
        waypoints,
        extractedSvgs: svgs,
        imageDataUrl: style.image,
        htmlTitleColor: titleColor,
        htmlSubtitleColor: subtitleColor,
      });
    }
  }

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  const cells: ParsedMxCell[] = [];
  for (const cell of cellMap.values()) {
    let curX = cell.x;
    let curY = cell.y;
    let depth = 0;
    let pId = cell.parent;

    while (pId && pId !== '1' && pId !== '0') {
      const parentCell = cellMap.get(pId);
      if (!parentCell) break;
      curX += parentCell.x;
      curY += parentCell.y;
      depth += 1;
      pId = parentCell.parent;
    }

    cell.absX = curX;
    cell.absY = curY;
    cell.depth = depth;

    if (cell.sourcePoint && cell.parent !== '1' && cell.parent !== '0') {
      const parentCell = cellMap.get(cell.parent);
      if (parentCell) {
        cell.sourcePoint.x += parentCell.absX;
        cell.sourcePoint.y += parentCell.absY;
      }
    }
    if (cell.targetPoint && cell.parent !== '1' && cell.parent !== '0') {
      const parentCell = cellMap.get(cell.parent);
      if (parentCell) {
        cell.targetPoint.x += parentCell.absX;
        cell.targetPoint.y += parentCell.absY;
      }
    }

    cells.push(cell);

    if (cell.vertex && (cell.width > 0 || cell.height > 0)) {
      minX = Math.min(minX, cell.absX);
      minY = Math.min(minY, cell.absY);
      maxX = Math.max(maxX, cell.absX + cell.width);
      maxY = Math.max(maxY, cell.absY + cell.height);
    }
    if (cell.edge) {
      if (cell.sourcePoint) {
        minX = Math.min(minX, cell.sourcePoint.x);
        minY = Math.min(minY, cell.sourcePoint.y);
        maxX = Math.max(maxX, cell.sourcePoint.x);
        maxY = Math.max(maxY, cell.sourcePoint.y);
      }
      if (cell.targetPoint) {
        minX = Math.min(minX, cell.targetPoint.x);
        minY = Math.min(minY, cell.targetPoint.y);
        maxX = Math.max(maxX, cell.targetPoint.x);
        maxY = Math.max(maxY, cell.targetPoint.y);
      }
    }
  }

  if (!isFinite(minX)) {
    minX = 0;
    minY = 0;
    maxX = 1280;
    maxY = 760;
  }

  const finalBgHex = detectedBgHex || 'FFFFFF';
  const isDarkDiagram = isDarkColor(finalBgHex);

  return { cells, minX, minY, maxX, maxY, isDarkDiagram, diagramBgHex: finalBgHex };
}

/**
 * Compiles Draw.io XML into a multi-slide PowerPoint (.pptx) deck:
 * - Slide 1: 100% 1:1 Master High-Resolution Widescreen Architecture Slide (Zero Deformity Guarantee)
 * - Slide 2: 100% Decomposed Native Editable Vector Shapes, Crisp Icons & Connectors Slide
 * - Slide 3: Architectural Component Inventory & Specification Matrix
 */
export async function exportDrawioToEditablePptx(
  xmlContent: string,
  diagramName: string = 'Architecture Blueprint',
  blueprintId: string = 'VIS-MASTER',
  options?: { returnBlob?: boolean; masterImageSrc?: string }
): Promise<Blob | void> {
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_WIDE'; // 13.333 x 7.5 inches widescreen 16:9
  pptx.author = 'PromptCanvas Vision Decompiler';
  pptx.company = 'PromptCanvas Enterprise';
  pptx.title = `${diagramName} (${blueprintId})`;

  const SLIDE_W = 13.333;
  const SLIDE_H = 7.5;
  const HEADER_H = 0.52;
  const MARGIN_X = 0.28;
  const MARGIN_Y = 0.14;

  const { cells, minX, minY, maxX, maxY, isDarkDiagram, diagramBgHex } = parseDrawioXmlForPptx(xmlContent);
  const graphW = Math.max(400, maxX - minX);
  const graphH = Math.max(300, maxY - minY);

  // ============================================================================
  // SLIDE 1: 100% 1:1 HIGH-RESOLUTION MASTER ARCHITECTURE SLIDE (ZERO DEFORMITY)
  // ============================================================================
  try {
    let pngDataUrl = options?.masterImageSrc || null;
    if (!pngDataUrl || !pngDataUrl.startsWith('data:image/')) {
      pngDataUrl = await exportDiagramPng(xmlContent, { scale: 2.5, transparent: false });
    }
    if (pngDataUrl) {
      const slide1Master = pptx.addSlide();
      slide1Master.background = { color: isDarkDiagram ? '090D16' : 'FFFFFF' };

      slide1Master.addShape(pptx.ShapeType.rect, {
        x: 0,
        y: 0,
        w: SLIDE_W,
        h: HEADER_H,
        fill: { color: '0F172A' },
      });

      slide1Master.addText(
        [
          { text: `${diagramName.toUpperCase()} `, options: { fontSize: 12, bold: true, color: '38BDF8' } },
          {
            text: `|  ID: ${blueprintId}  •  1:1 Master High-Resolution Widescreen Architecture (Slide 2 contains Decomposed Vector Shapes)`,
            options: { fontSize: 9.5, color: 'E2E8F0' },
          },
        ],
        {
          x: 0.35,
          y: 0.08,
          w: SLIDE_W - 0.7,
          h: 0.36,
          valign: 'middle',
          fontFace: 'Arial',
        }
      );

      slide1Master.addImage({
        data: pngDataUrl,
        x: 0.35,
        y: HEADER_H + 0.12,
        w: SLIDE_W - 0.7,
        h: SLIDE_H - HEADER_H - 0.24,
        sizing: { type: 'contain', w: SLIDE_W - 0.7, h: SLIDE_H - HEADER_H - 0.24 },
      });
    }
  } catch (err) {
    console.warn('Slide 1 master image snapshot warning:', err);
  }

  // ============================================================================
  // SLIDE 2: 100% DECOMPOSED NATIVE EDITABLE VECTOR SHAPES, ICONS & CONNECTORS
  // ============================================================================
  const availW = SLIDE_W - MARGIN_X * 2;
  const availH = SLIDE_H - HEADER_H - MARGIN_Y * 2;

  const scaleX = availW / graphW;
  const scaleY = availH / graphH;
  const scale = Math.min(scaleX, scaleY);

  const offsetX = MARGIN_X + (availW - graphW * scale) / 2;
  const offsetY = HEADER_H + MARGIN_Y + (availH - graphH * scale) / 2;

  const toSlideX = (x: number) => Number((offsetX + (x - minX) * scale).toFixed(3));
  const toSlideY = (y: number) => Number((offsetY + (y - minY) * scale).toFixed(3));
  const toSlideW = (w: number) => Number(Math.max(0.08, w * scale).toFixed(3));
  const toSlideH = (h: number) => Number(Math.max(0.08, h * scale).toFixed(3));

  const slide2 = pptx.addSlide();
  slide2.background = { color: isDarkDiagram ? diagramBgHex : 'FFFFFF' };

  slide2.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: SLIDE_W,
    h: HEADER_H,
    fill: { color: '0F172A' },
    line: { color: '1E293B', width: 1 },
  });

  slide2.addText(
    [
      { text: `${diagramName.toUpperCase()} `, options: { fontSize: 12, bold: true, color: '38BDF8' } },
      {
        text: `|  ID: ${blueprintId}  •  100% Decomposed Native Editable Vector Shapes, Icons & Arrows (Click any element to move or edit)`,
        options: { fontSize: 9.5, color: 'E2E8F0' },
      },
    ],
    {
      x: 0.3,
      y: 0.08,
      w: SLIDE_W - 0.6,
      h: 0.36,
      valign: 'middle',
      fontFace: 'Arial',
    }
  );

  // Strict sorting: background enclaves & large containers first, child cards next, small badges & icons on top
  const vertices = cells
    .filter((c) => c.vertex && (c.width > 0 || c.height > 0))
    .sort((a, b) => {
      if (a.depth !== b.depth) return a.depth - b.depth;
      return b.width * b.height - a.width * a.height;
    });

  const cellMap = new Map<string, ParsedMxCell>();
  cells.forEach((c) => cellMap.set(c.id, c));

  // Identify which cells have children so we treat them as containers
  const parentIds = new Set<string>();
  cells.forEach((c) => {
    if (c.parent && c.parent !== '0' && c.parent !== '1') {
      parentIds.add(c.parent);
    }
  });

  for (const node of vertices) {
    const bx = toSlideX(node.absX);
    const by = toSlideY(node.absY);
    const bw = toSlideW(node.width);
    const bh = toSlideH(node.height);

    // Skip full-bleed background canvas rectangle
    if ((node.id === 'bg' || node.id.includes('bg')) && node.width >= 700 && node.height >= 400) {
      continue;
    }

    const style = node.style;
    const isImageShape = style.shape === 'image' || Boolean(node.imageDataUrl) || node.extractedSvgs.length > 0;
    const rawFill = style.fillColor;
    const rawStroke = style.strokeColor;

    // For standalone image shapes (like Azure icons), default fill is transparent unless explicitly colored
    const hasFill =
      rawFill !== 'none' &&
      rawFill !== 'transparent' &&
      Boolean(rawFill) &&
      !(isImageShape && node.width <= 55 && node.height <= 55);
    const hasStroke =
      rawStroke !== 'none' &&
      rawStroke !== 'transparent' &&
      Boolean(rawStroke) &&
      !(isImageShape && node.width <= 55 && node.height <= 55);

    const fillColor = normalizeHexColor(rawFill, isDarkDiagram ? '1E293B' : 'FFFFFF');
    const strokeColor = normalizeHexColor(rawStroke, isDarkDiagram ? '3B82F6' : 'CBD5E1');
    const strokeWidth = Math.min(2.5, Math.max(0.75, parseFloat(style.strokeWidth || '1.25')));
    const isDashed = style.dashed === '1';

    let shapeType = pptx.ShapeType.rect;
    if (style.ellipse === '1' || style.shape === 'ellipse') {
      shapeType = pptx.ShapeType.ellipse;
    } else if (style.rhombus === '1' || style.shape === 'rhombus') {
      shapeType = pptx.ShapeType.diamond;
    } else if (style.rounded === '1') {
      shapeType = pptx.ShapeType.roundRect;
    }

    const { title, subtitle } = cleanHtmlToPlainText(node.value);

    const isDarkNodeFill = hasFill ? isDarkColor(fillColor) : isDarkDiagram;
    let resolvedTitleColor = style.fontColor
      ? normalizeHexColor(style.fontColor, isDarkNodeFill ? 'FFFFFF' : '0F172A')
      : node.htmlTitleColor
      ? node.htmlTitleColor
      : isDarkNodeFill
      ? 'FFFFFF'
      : '0F172A';

    if (isDarkNodeFill && isDarkColor(resolvedTitleColor)) {
      resolvedTitleColor = 'FFFFFF';
    }

    let resolvedSubtitleColor = node.htmlSubtitleColor
      ? node.htmlSubtitleColor
      : isDarkNodeFill
      ? 'CBD5E1'
      : '475569';
    if (isDarkNodeFill && isDarkColor(resolvedSubtitleColor)) {
      resolvedSubtitleColor = 'CBD5E1';
    }

    const rawFontSize = parseFloat(style.fontSize || '10');
    const scaledTitleSize = Math.min(13, Math.max(6.5, Math.round(rawFontSize * Math.sqrt(scale) * 0.88)));
    const scaledSubSize = Math.max(6, scaledTitleSize - 1);

    const isContainer =
      style.container === '1' ||
      parentIds.has(node.id) ||
      (style.verticalAlign === 'top' && node.width * node.height > 18000) ||
      (node.width > 240 && node.height > 120 && !isImageShape);

    const isStandaloneIconWithBottomLabel =
      (style.verticalLabelPosition === 'bottom' || (isImageShape && node.width <= 56 && node.height <= 56)) &&
      !isContainer;

    // 1. Draw the vector background shape if it has fill or border
    if (hasFill || hasStroke) {
      slide2.addShape(shapeType, {
        x: bx,
        y: by,
        w: bw,
        h: bh,
        rectRadius: shapeType === pptx.ShapeType.roundRect ? 0.04 : undefined,
        fill: hasFill ? { color: fillColor } : undefined,
        line: hasStroke
          ? {
              color: strokeColor,
              width: strokeWidth,
              dashType: isDashed ? 'dash' : 'solid',
            }
          : undefined,
      });
    }

    // 2. Render vector icon if present (either inline SVG or style.image data URL)
    const iconSource = node.extractedSvgs[0] || node.imageDataUrl;
    if (iconSource) {
      const iconDataUrl = await renderInlineSvgToPngDataUrl(iconSource, 128, 128);
      if (iconDataUrl) {
        if (isStandaloneIconWithBottomLabel) {
          // Draw the icon cleanly filling its exact bounding box
          slide2.addImage({
            data: iconDataUrl,
            x: bx,
            y: by,
            w: bw,
            h: bh,
          });
        } else {
          // Card with icon inside
          const iconSize = Math.min(0.28, Math.max(0.16, Math.min(bw, bh) * 0.45));
          const iconX = Number((bx + 0.05).toFixed(3));
          const iconY = Number((by + (bh - iconSize) / 2).toFixed(3));
          slide2.addImage({
            data: iconDataUrl,
            x: iconX,
            y: iconY,
            w: iconSize,
            h: iconSize,
          });
        }
      }
    }

    // 3. Add crisp editable text overlay with accurate position
    if (title) {
      const textRuns: PptxGenJS.TextProps[] = [
        {
          text: title,
          options: {
            fontSize: scaledTitleSize,
            bold: true,
            color: resolvedTitleColor,
            breakLine: Boolean(subtitle),
          },
        },
      ];

      if (subtitle) {
        textRuns.push({
          text: subtitle,
          options: {
            fontSize: scaledSubSize,
            bold: false,
            color: resolvedSubtitleColor,
          },
        });
      }

      if (isStandaloneIconWithBottomLabel) {
        // Place label BELOW the icon so it never crams inside the 36x36 icon box
        const lblW = Number(Math.max(bw + 0.55, 0.92).toFixed(3));
        const lblX = Number((bx + bw / 2 - lblW / 2).toFixed(3));
        const lblY = Number((by + bh + 0.015).toFixed(3));
        slide2.addText(textRuns, {
          x: lblX,
          y: lblY,
          w: lblW,
          h: 0.28,
          align: 'center',
          valign: 'top',
          margin: [1, 2, 1, 2],
          fontFace: 'Arial',
          wrap: true,
        });
      } else if (isContainer) {
        // Place container header strictly in the top banner strip (never middle-centered over children)
        slide2.addText(textRuns, {
          x: Number((bx + 0.04).toFixed(3)),
          y: Number((by + 0.02).toFixed(3)),
          w: Number(Math.max(0.4, bw - 0.08).toFixed(3)),
          h: 0.28,
          align: style.align === 'left' ? 'left' : style.align === 'right' ? 'right' : 'center',
          valign: 'top',
          margin: [2, 4, 2, 4],
          fontFace: 'Arial',
          wrap: true,
        });
      } else {
        // Standard card or pill
        slide2.addText(textRuns, {
          x: bx,
          y: by,
          w: bw,
          h: bh,
          align: style.align === 'left' ? 'left' : style.align === 'right' ? 'right' : 'center',
          valign: 'middle',
          margin: [2, 4, 2, 4],
          fontFace: 'Arial',
          wrap: true,
        });
      }
    }
  }

  // ============================================================================
  // RENDER ALL CONNECTOR EDGES & FREE-FLOATING ARROWS ON SLIDE 2
  // ============================================================================
  const edges = cells.filter((c) => c.edge);
  for (const edge of edges) {
    const src = cellMap.get(edge.source || '');
    const tgt = cellMap.get(edge.target || '');

    let ptStart: { x: number; y: number } | undefined;
    let ptEnd: { x: number; y: number } | undefined;

    if (src) {
      const exitX = parseFloat(edge.style.exitX ?? '0.5');
      const exitY = parseFloat(edge.style.exitY ?? '0.5');
      ptStart = {
        x: src.absX + src.width * exitX,
        y: src.absY + src.height * exitY,
      };
    } else if (edge.sourcePoint) {
      ptStart = edge.sourcePoint;
    }

    if (tgt) {
      const entryX = parseFloat(edge.style.entryX ?? '0.5');
      const entryY = parseFloat(edge.style.entryY ?? '0.5');
      ptEnd = {
        x: tgt.absX + tgt.width * entryX,
        y: tgt.absY + tgt.height * entryY,
      };
    } else if (edge.targetPoint) {
      ptEnd = edge.targetPoint;
    }

    if (!ptStart || !ptEnd) continue;

    const allPoints = [ptStart, ...edge.waypoints, ptEnd];
    const strokeColor = normalizeHexColor(edge.style.strokeColor, isDarkDiagram ? '60A5FA' : '2563EB');
    const isDashed = edge.style.dashed === '1';
    const strokeWidth = Math.min(2.5, Math.max(1.0, parseFloat(edge.style.strokeWidth || '1.5')));

    const hasStartArrow = Boolean(edge.style.startArrow) && edge.style.startArrow !== 'none';
    const hasEndArrow = !edge.style.endArrow || edge.style.endArrow !== 'none';

    for (let i = 0; i < allPoints.length - 1; i++) {
      const p1 = allPoints[i];
      const p2 = allPoints[i + 1];

      const x1 = toSlideX(p1.x);
      const y1 = toSlideY(p1.y);
      const x2 = toSlideX(p2.x);
      const y2 = toSlideY(p2.y);

      const lineX = Math.min(x1, x2);
      const lineY = Math.min(y1, y2);
      const lineW = Math.max(0.01, Math.abs(x2 - x1));
      const lineH = Math.max(0.01, Math.abs(y2 - y1));

      const isFirstSeg = i === 0;
      const isLastSeg = i === allPoints.length - 2;

      slide2.addShape(pptx.ShapeType.line, {
        x: lineX,
        y: lineY,
        w: lineW,
        h: lineH,
        flipH: x2 < x1,
        flipV: y2 < y1,
        line: {
          color: strokeColor,
          width: strokeWidth,
          dashType: isDashed ? 'dash' : 'solid',
          beginArrowType: isFirstSeg && hasStartArrow ? 'arrow' : undefined,
          endArrowType: isLastSeg && hasEndArrow ? 'arrow' : undefined,
        },
      });
    }

    const { title: edgeLabel } = cleanHtmlToPlainText(edge.value);
    if (edgeLabel) {
      const midIdx = Math.floor(allPoints.length / 2);
      const pA = allPoints[Math.max(0, midIdx - 1)];
      const pB = allPoints[midIdx];
      const midX = toSlideX((pA.x + pB.x) / 2);
      const midY = toSlideY((pA.y + pB.y) / 2);
      const lblW = Math.max(0.85, Math.min(2.2, edgeLabel.length * 0.06 + 0.18));
      const lblH = 0.2;

      slide2.addShape(pptx.ShapeType.roundRect, {
        x: Number((midX - lblW / 2).toFixed(3)),
        y: Number((midY - lblH / 2).toFixed(3)),
        w: lblW,
        h: lblH,
        rectRadius: 0.06,
        fill: { color: isDarkDiagram ? '1E293B' : 'FFFFFF' },
        line: { color: strokeColor, width: 0.75 },
      });

      slide2.addText(edgeLabel, {
        x: Number((midX - lblW / 2).toFixed(3)),
        y: Number((midY - lblH / 2).toFixed(3)),
        w: lblW,
        h: lblH,
        fontSize: 7,
        bold: true,
        color: isDarkDiagram ? 'F8FAFC' : '0F172A',
        align: 'center',
        valign: 'middle',
        fontFace: 'Arial',
      });
    }
  }

  // ============================================================================
  // SLIDE 3: ARCHITECTURAL COMPONENT SPECIFICATION TABLE
  // ============================================================================
  const slide3 = pptx.addSlide();
  slide3.background = { color: 'F8FAFC' };

  slide3.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: SLIDE_W,
    h: HEADER_H,
    fill: { color: '0F172A' },
  });

  slide3.addText(
    [
      { text: `${diagramName.toUpperCase()} `, options: { fontSize: 12, bold: true, color: '38BDF8' } },
      {
        text: `|  Editable Architecture Component & Topology Specification Table`,
        options: { fontSize: 9.5, color: 'E2E8F0' },
      },
    ],
    {
      x: 0.35,
      y: 0.08,
      w: SLIDE_W - 0.7,
      h: 0.36,
      valign: 'middle',
      fontFace: 'Arial',
    }
  );

  const tableRows: any[][] = [
    [
      { text: 'Object ID', options: { bold: true, fill: { color: '0F172A' }, color: 'FFFFFF', fontSize: 9 } },
      { text: 'Component Name', options: { bold: true, fill: { color: '0F172A' }, color: 'FFFFFF', fontSize: 9 } },
      { text: 'Architectural Role / Details', options: { bold: true, fill: { color: '0F172A' }, color: 'FFFFFF', fontSize: 9 } },
      { text: 'Type', options: { bold: true, fill: { color: '0F172A' }, color: 'FFFFFF', fontSize: 9 } },
    ],
  ];

  const displayNodes = vertices.filter((v) => cleanHtmlToPlainText(v.value).title.length > 0).slice(0, 16);
  displayNodes.forEach((node, idx) => {
    const { title, subtitle } = cleanHtmlToPlainText(node.value);
    const isContainer = node.style.container === '1' || parentIds.has(node.id) || node.width * node.height > 90000;
    tableRows.push([
      { text: `OBJ-${String(idx + 1).padStart(2, '0')}`, options: { fontSize: 8.5, color: '0F172A', bold: true } },
      { text: title, options: { fontSize: 8.5, color: '0F172A', bold: true } },
      { text: subtitle || 'Core Architecture Node', options: { fontSize: 8, color: '475569' } },
      { text: isContainer ? 'Enclave / Tier' : 'Service Node', options: { fontSize: 8, color: '2563EB' } },
    ]);
  });

  slide3.addTable(tableRows, {
    x: 0.4,
    y: HEADER_H + 0.2,
    w: SLIDE_W - 0.8,
    colW: [1.5, 3.5, 5.7, 1.833],
    border: { type: 'solid', color: 'CBD5E1', pt: 0.5 },
    fill: { color: 'FFFFFF' },
    fontFace: 'Arial',
  });

  if (options?.returnBlob) {
    const blob = (await pptx.write({ outputType: 'blob' })) as Blob;
    return blob;
  }

  const safeName = diagramName.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
  await pptx.writeFile({ fileName: `${safeName || 'architecture'}_editable_slides.pptx` });
}
