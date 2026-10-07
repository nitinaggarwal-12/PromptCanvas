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

  const withoutSvg = decoded
    .replace(svgRegex, '')
    .replace(/<span[^>]*border-radius\s*:\s*(?:50%|999\d*px)[^>]*>[\s\S]*?<\/span>/gi, '');
  const colorMatches: string[] = [];
  const cssColorRegex = /(?:^|[;"'\s])color\s*:\s*(#[0-9a-fA-F]{3,6})/gi;
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

export function cleanHtmlToPlainText(html: string): {
  title: string;
  subtitle: string;
  fullText: string;
  lines: string[];
} {
  if (!html) return { title: '', subtitle: '', fullText: '', lines: [] };
  const decoded = html
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');

  // Remove inline <svg>...</svg> blocks completely so SVG paths don't leak into text
  const noSvg = decoded.replace(/<svg[\s\S]*?<\/svg>/gi, '');

  // Format circular/pill step badges (<span style="...border-radius:50%...">1</span>) with a clean ". " separator
  const withFormattedStepBadges = noSvg.replace(
    /<span[^>]*border-radius\s*:\s*(?:50%|999\d*px)[^>]*>\s*([0-9A-Za-z]+)\s*<\/span>\s*/gi,
    '$1. '
  );

  // Replace block tags, table rows, and line breaks with newlines
  const withNewlines = withFormattedStepBadges
    .replace(/<\/td>\s*<td[^>]*>/gi, ' ')
    .replace(/<\/tr>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/div>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<\/span>\s*<span/gi, '</span> <span')
    .replace(/<[^>]+>/g, '');

  const lines = withNewlines
    .split('\n')
    .map((l) => l.replace(/\s+/g, ' ').trim())
    .filter(Boolean);

  if (lines.length === 0) {
    return { title: '', subtitle: '', fullText: '', lines: [] };
  }

  // Merge wrapped multi-line titles ending in ",", "&", "/", or "-" (e.g., "GCP Observability,\nAgentOps & FinOps")
  if (lines.length >= 2 && /[,&/\-]$/.test(lines[0])) {
    const mergedTitle = `${lines[0]} ${lines[1]}`.replace(/\s+/g, ' ').trim();
    const rest = lines.slice(2);
    const mergedLines = [mergedTitle, ...rest];
    return {
      title: mergedTitle,
      subtitle: rest.join(' • '),
      fullText: mergedLines.join('\n'),
      lines: mergedLines,
    };
  }

  const title = lines[0];
  const subtitle = lines.slice(1).join(' • ');
  const fullText = lines.join('\n');
  return { title, subtitle, fullText, lines };
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

function normalizeSvgDimensions(svgStr: string, widthPx: number, heightPx: number): string {
  let clean = svgStr.trim();
  if (clean.startsWith('data:image/svg+xml')) {
    const commaIdx = clean.indexOf(',');
    if (commaIdx !== -1) {
      const header = clean.slice(0, commaIdx);
      const payload = clean.slice(commaIdx + 1);
      if (header.includes('base64')) {
        clean = typeof Buffer !== 'undefined'
          ? Buffer.from(payload, 'base64').toString('utf-8')
          : atob(payload);
      } else {
        try {
          clean = decodeURIComponent(payload);
        } catch {
          clean = payload;
        }
      }
    }
  }
  if (!clean.includes('xmlns=')) {
    clean = clean.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
  }
  clean = clean.replace(/<svg\b([^>]*)>/i, (_match, attrs) => {
    const cleanedAttrs = attrs
      .replace(/\s+width=["'][^"']*["']/gi, '')
      .replace(/\s+height=["'][^"']*["']/gi, '');
    return `<svg width="${widthPx}" height="${heightPx}"${cleanedAttrs}>`;
  });
  return clean;
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
  if (!svgOrDataUrl) return null;

  if (typeof window === 'undefined') {
    const nodeDynamicImport = async (modName: string) => {
      try {
        return await new Function('m', 'return import(m)')(modName);
      } catch {
        const req = new Function('return typeof require !== "undefined" ? require : null')();
        if (req) return req(modName);
        const { createRequire } = await import(/* webpackIgnore: true */ 'module');
        return createRequire(process.cwd() + '/package.json')(modName);
      }
    };
    const cleanSvg = normalizeSvgDimensions(svgOrDataUrl.trim(), widthPx, heightPx);
    try {
      const sharpMod = await nodeDynamicImport('sharp');
      const sharpFn = sharpMod.default || sharpMod;
      const svgBuf = Buffer.from(cleanSvg, 'utf-8');
      const pngBuf = await sharpFn(svgBuf).resize(widthPx, heightPx).png().toBuffer();
      return `data:image/png;base64,${pngBuf.toString('base64')}`;
    } catch {
      try {
        const { createCanvas, loadImage } = await nodeDynamicImport('canvas');
        let dataUriToLoad = svgOrDataUrl.trim();
        if (!dataUriToLoad.startsWith('data:image/png') && !dataUriToLoad.startsWith('data:image/jpeg')) {
          dataUriToLoad = `data:image/svg+xml;base64,${Buffer.from(cleanSvg, 'utf-8').toString('base64')}`;
        }
        const img = await loadImage(dataUriToLoad);
        const canvas = createCanvas(widthPx, heightPx);
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, widthPx, heightPx);
        ctx.drawImage(img, 0, 0, widthPx, heightPx);
        return canvas.toDataURL('image/png');
      } catch (err) {
        console.warn('Node SVG rasterization notice:', err);
        return null;
      }
    }
  }

  return new Promise((resolve) => {
    try {
      let url = '';
      let shouldRevoke = false;

      if (svgOrDataUrl.startsWith('data:image/png') || svgOrDataUrl.startsWith('data:image/jpeg')) {
        url = svgOrDataUrl;
      } else {
        const cleanSvg = normalizeSvgDimensions(svgOrDataUrl, widthPx, heightPx);
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

        const directPts = geo.mxPoint ? (Array.isArray(geo.mxPoint) ? geo.mxPoint : [geo.mxPoint]) : [];
        const arrayPts = geo.Array?.mxPoint
          ? Array.isArray(geo.Array.mxPoint)
            ? geo.Array.mxPoint
            : [geo.Array.mxPoint]
          : [];
        const pts = [...directPts, ...arrayPts];
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
    let parentOffsetX = 0;
    let parentOffsetY = 0;
    let depth = 0;
    let pId = cell.parent;

    while (pId && pId !== '1' && pId !== '0') {
      const parentCell = cellMap.get(pId);
      if (!parentCell) break;
      parentOffsetX += parentCell.x;
      parentOffsetY += parentCell.y;
      depth += 1;
      pId = parentCell.parent;
    }

    cell.absX = cell.x + parentOffsetX;
    cell.absY = cell.y + parentOffsetY;
    cell.depth = depth;

    if (parentOffsetX !== 0 || parentOffsetY !== 0) {
      if (cell.sourcePoint) {
        cell.sourcePoint = {
          x: cell.sourcePoint.x + parentOffsetX,
          y: cell.sourcePoint.y + parentOffsetY,
        };
      }
      if (cell.targetPoint) {
        cell.targetPoint = {
          x: cell.targetPoint.x + parentOffsetX,
          y: cell.targetPoint.y + parentOffsetY,
        };
      }
      if (cell.waypoints && cell.waypoints.length > 0) {
        cell.waypoints = cell.waypoints.map((wp) => ({
          x: wp.x + parentOffsetX,
          y: wp.y + parentOffsetY,
        }));
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

async function resolveImageSourceToDataUri(
  src?: string | null,
  blueprintId?: string
): Promise<string | null> {
  let targetSrc = src || null;
  if (!targetSrc || targetSrc.includes('azure-landing-zone.png') || targetSrc.startsWith('data:image/svg+xml')) {
    const idLower = (blueprintId || '').toLowerCase();
    if (idLower.includes('9745') || idLower.includes('azure') || targetSrc?.includes('azure')) {
      targetSrc = '/blueprints/azure_application_landing_zone.png';
    } else {
      const bpNumMatch = (blueprintId || '').replace(/^#/, '').match(/^(?:canonical_)?(\d{1,2})$/);
      if (bpNumMatch) {
        const num = parseInt(bpNumMatch[1], 10);
        if (num >= 0 && num <= 74) {
          targetSrc = `/templates/canonical_${String(num).padStart(2, '0')}.png`;
        }
      }
    }
  }
  if (!targetSrc) return null;
  if (targetSrc.startsWith('data:image/svg+xml')) {
    return await renderInlineSvgToPngDataUrl(targetSrc, 1600, 900);
  }
  if (targetSrc.startsWith('data:image/')) return targetSrc;

  if (typeof window !== 'undefined') {
    try {
      const res = await fetch(targetSrc);
      if (!res.ok) return null;
      const blob = await res.blob();
      return await new Promise<string | null>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(typeof reader.result === 'string' ? reader.result : null);
        reader.onerror = () => resolve(null);
        reader.readAsDataURL(blob);
      });
    } catch {
      return null;
    }
  }

  if (typeof Buffer !== 'undefined') {
    try {
      const nodeDynamicImport = new Function('m', 'return import(m)');
      const fs = await nodeDynamicImport('fs');
      const path = await nodeDynamicImport('path');
      const cleanRel = targetSrc.replace(/^\//, '');
      const fullPath = path.join(process.cwd(), 'public', cleanRel);
      if (fs.existsSync(fullPath)) {
        const buf = fs.readFileSync(fullPath);
        const ext = path.extname(fullPath).toLowerCase() === '.jpg' ? 'jpeg' : 'png';
        return `data:image/${ext};base64,${buf.toString('base64')}`;
      }
    } catch {
      return null;
    }
  }

  return null;
}

function getImageDimensionsFromDataUri(dataUrl: string): { width: number; height: number } | null {
  try {
    const base64Idx = dataUrl.indexOf(';base64,');
    if (base64Idx === -1) return null;
    const b64 = dataUrl.substring(base64Idx + 8);
    let bytes: Uint8Array;
    if (typeof Buffer !== 'undefined') {
      bytes = Buffer.from(b64, 'base64');
    } else if (typeof atob !== 'undefined') {
      const binStr = atob(b64.slice(0, 1024));
      bytes = new Uint8Array(binStr.length);
      for (let i = 0; i < binStr.length; i++) bytes[i] = binStr.charCodeAt(i);
    } else {
      return null;
    }

    // PNG signature: 89 50 4E 47
    if (bytes.length >= 24 && bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) {
      const width = ((bytes[16] << 24) | (bytes[17] << 16) | (bytes[18] << 8) | (bytes[19])) >>> 0;
      const height = ((bytes[20] << 24) | (bytes[21] << 16) | (bytes[22] << 8) | (bytes[23])) >>> 0;
      if (width > 0 && height > 0) return { width, height };
    }

    // JPEG signature: FF D8
    if (bytes.length > 4 && bytes[0] === 0xff && bytes[1] === 0xd8) {
      let offset = 2;
      while (offset < bytes.length - 8) {
        if (bytes[offset] !== 0xff) break;
        const marker = bytes[offset + 1];
        if (marker >= 0xc0 && marker <= 0xc2) {
          const height = (bytes[offset + 5] << 8) | bytes[offset + 6];
          const width = (bytes[offset + 7] << 8) | bytes[offset + 8];
          if (width > 0 && height > 0) return { width, height };
        }
        const len = (bytes[offset + 2] << 8) | bytes[offset + 3];
        offset += 2 + len;
      }
    }
  } catch {
    // ignore
  }
  return null;
}

export const CIRCLED_STEP_DIGITS: Record<string, string> = {
  '1': '❶',
  '2': '❷',
  '3': '❸',
  '4': '❹',
  '5': '❺',
  '6': '❻',
  '7': '➐',
  '8': '➑',
  '9': '➒',
  '10': '➓',
};

export interface StructuredIconRow {
  iconSvg?: string;
  title: string;
  subtitle?: string;
  titleColor?: string;
  subtitleColor?: string;
}

export interface StructuredInlineSpan {
  text: string;
  color?: string;
  bold?: boolean;
  isSmall?: boolean;
}

export interface StructuredNodeLayout {
  kind: 'multi-row-icon-list' | 'table-card' | 'standard';
  stepBadge?: { num: string; bgHex: string };
  leftIconSvg?: string;
  rightIconSvg?: string;
  headerLines: string[];
  bodyLines: { text: string; color?: string; bold?: boolean }[];
  inlineSpans?: StructuredInlineSpan[];
  iconRows?: StructuredIconRow[];
  textAlign?: 'left' | 'center' | 'right';
}

function decodeHtmlEntities(html: string): string {
  if (!html) return '';
  return html
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

function extractFirstCssColor(fragment: string): string | undefined {
  const m = fragment.match(/(?:^|[;"'\s])color\s*:\s*(#[0-9a-fA-F]{3,6})/i);
  if (!m) return undefined;
  return normalizeHexColor(m[1], '');
}

function stripTagsToLines(fragment: string): string[] {
  return fragment
    .replace(/<svg[\s\S]*?<\/svg>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/div>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<\/tr>/gi, '\n')
    .replace(/<\/span>\s*<span/gi, '</span> <span')
    .replace(/<[^>]+>/g, '')
    .split('\n')
    .map((l) => l.replace(/\s+/g, ' ').trim())
    .filter(Boolean);
}

export function extractStructuredNodeLayout(rawHtml: string): StructuredNodeLayout {
  const decoded = decodeHtmlEntities(rawHtml);
  if (!decoded.trim()) {
    return { kind: 'standard', headerLines: [], bodyLines: [] };
  }

  // 1. Extract circular step badge (<span style="...background:#1D4ED8...border-radius:50%...">1</span>)
  let stepBadge: { num: string; bgHex: string } | undefined;
  const badgeTagRegex =
    /<span([^>]*border-radius\s*:\s*(?:50%|999\d*px)[^>]*)>\s*([0-9A-Za-z]+)\s*<\/span>\s*/i;
  const badgeMatch = decoded.match(badgeTagRegex);
  if (badgeMatch) {
    const attrs = badgeMatch[1] || '';
    const num = badgeMatch[2].trim();
    const bgMatch = attrs.match(/background(?:-color)?\s*:\s*(#[0-9a-fA-F]{3,6})/i);
    const bgHex = normalizeHexColor(bgMatch ? bgMatch[1] : '1D4ED8', '1D4ED8');
    stepBadge = { num, bgHex };
  }

  const withoutBadge = decoded.replace(
    /<span[^>]*border-radius\s*:\s*(?:50%|999\d*px)[^>]*>\s*[0-9A-Za-z]+\s*<\/span>\s*/gi,
    ''
  );

  // 2. Check for <table> layout (multi-row icon list like Observability OR single-row compactNodeHtml card)
  const tableMatch = withoutBadge.match(/<table[\s\S]*?<\/table>/i);
  if (tableMatch && tableMatch.index !== undefined) {
    const preTableHtml = withoutBadge.slice(0, tableMatch.index);
    const tableHtml = tableMatch[0];
    const trMatches = Array.from(tableHtml.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi));

    if (trMatches.length >= 2) {
      const iconRows: StructuredIconRow[] = [];
      for (const tr of trMatches) {
        const trBody = tr[1];
        const svgMatch = trBody.match(/<svg[\s\S]*?<\/svg>/i);
        const lines = stripTagsToLines(trBody);
        if (lines.length > 0) {
          iconRows.push({
            iconSvg: svgMatch ? svgMatch[0] : undefined,
            title: lines[0],
            subtitle: lines.slice(1).join(' '),
          });
        }
      }
      if (iconRows.some((r) => Boolean(r.iconSvg))) {
        const headerLines = stripTagsToLines(preTableHtml);
        return {
          kind: 'multi-row-icon-list',
          stepBadge,
          headerLines,
          bodyLines: [],
          iconRows,
        };
      }
    }

    if (trMatches.length === 1) {
      const trBody = trMatches[0][1];
      const tdMatches = Array.from(trBody.matchAll(/<td\b([^>]*)>([\s\S]*?)<\/td>/gi));
      if (tdMatches.length >= 1) {
        const parsedTds = tdMatches.map((td) => {
          const attrs = td[1] || '';
          const content = td[2] || '';
          const svgM = content.match(/<svg[\s\S]*?<\/svg>/i);
          const lines = stripTagsToLines(content);
          const divMatches = Array.from(content.matchAll(/<div\b([^>]*)>([\s\S]*?)<\/div>/gi));
          const richLines: { text: string; color?: string; bold?: boolean }[] = [];
          if (divMatches.length > 0) {
            for (const dm of divMatches) {
              const dAttrs = dm[1] || '';
              const dText = stripTagsToLines(dm[2] || '').join(' ');
              if (!dText) continue;
              const dColor = extractFirstCssColor(dAttrs) || extractFirstCssColor(dm[2] || '');
              const isBold = /font-weight\s*:\s*(?:bold|[6789]00)/i.test(dAttrs);
              richLines.push({ text: dText, color: dColor, bold: isBold });
            }
          } else {
            lines.forEach((l, idx) => richLines.push({ text: l, bold: idx === 0 }));
          }
          const alignMatch = attrs.match(/text-align\s*:\s*(left|center|right)/i);
          return {
            svg: svgM ? svgM[0] : undefined,
            hasText: richLines.length > 0,
            richLines,
            align: alignMatch ? (alignMatch[1].toLowerCase() as 'left' | 'center' | 'right') : undefined,
          };
        });

        let leftIconSvg: string | undefined;
        let rightIconSvg: string | undefined;
        let textTd = parsedTds.find((t) => t.hasText) || parsedTds[0];

        if (parsedTds.length >= 2) {
          if (parsedTds[0].svg && !parsedTds[0].hasText) {
            leftIconSvg = parsedTds[0].svg;
          }
          const lastTd = parsedTds[parsedTds.length - 1];
          if (lastTd !== parsedTds[0] && lastTd.svg && !lastTd.hasText) {
            rightIconSvg = lastTd.svg;
          }
        }

        const headerLines = textTd.richLines.length > 0 ? [textTd.richLines[0].text] : [];
        const bodyLines = textTd.richLines;

        return {
          kind: 'table-card',
          stepBadge,
          leftIconSvg,
          rightIconSvg,
          headerLines,
          bodyLines,
          textAlign: textTd.align || 'center',
        };
      }
    }
  }

  // 3. Non-table HTML: check for multi-span single-line headers (e.g., AI Cluster "(GE • ADK • A2A)")
  //    or multi-line <br/> blocks with colored spans (e.g., Session State & Shared History)
  const noSvg = withoutBadge.replace(/<svg[\s\S]*?<\/svg>/gi, '');
  const hasExplicitLineBreaks = /<br\s*\/?>|<\/div>\s*<div|<\/p>\s*<p/i.test(noSvg);
  const spanMatches = Array.from(noSvg.matchAll(/<span\b([^>]*)>([\s\S]*?)<\/span>/gi));

  if (!hasExplicitLineBreaks && spanMatches.length >= 2) {
    const inlineSpans: StructuredInlineSpan[] = [];
    for (const sm of spanMatches) {
      const sAttrs = sm[1] || '';
      const sText = stripTagsToLines(sm[2] || '').join(' ');
      if (!sText) continue;
      const sColor = extractFirstCssColor(sAttrs);
      const isBold = /font-weight\s*:\s*(?:bold|[6789]00)/i.test(sAttrs);
      const isSmall = /font-size\s*:\s*(?:[789](?:\.\d+)?px)/i.test(sAttrs);
      inlineSpans.push({ text: sText, color: sColor, bold: isBold, isSmall });
    }
    if (inlineSpans.length >= 2) {
      return {
        kind: 'standard',
        stepBadge,
        headerLines: [inlineSpans.map((s) => s.text).join(' ')],
        bodyLines: [],
        inlineSpans,
      };
    }
  }

  // Split by <br/> or block boundaries while preserving per-line color
  const rawSegments = noSvg
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/div>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .split('\n');

  const outerColor = extractFirstCssColor(noSvg);
  const outerBold = /font-weight\s*:\s*(?:bold|[6789]00)/i.test(noSvg);
  const bodyLines: { text: string; color?: string; bold?: boolean }[] = [];

  for (const seg of rawSegments) {
    const cleanText = stripTagsToLines(seg).join(' ');
    if (!cleanText) continue;
    const segColor = extractFirstCssColor(seg) || outerColor;
    const segBold = /font-weight\s*:\s*(?:bold|[6789]00)|<b\b|<strong\b/i.test(seg) || outerBold;
    bodyLines.push({ text: cleanText, color: segColor, bold: segBold });
  }

  return {
    kind: 'standard',
    stepBadge,
    headerLines: bodyLines.length > 0 ? [bodyLines[0].text] : [],
    bodyLines,
  };
}

/**
 * Compiles Draw.io XML into a single-slide 100% Native Editable PowerPoint (.pptx) & Google Slides deck:
 * - Slide 1 (Only Slide): 100% Decomposed Native Editable Vector Shapes, Crisp Icons & Orthogonal Connectors
 *   matching the reference architecture diagram 1:1 with zero static image slide and zero object-ID table slide.
 */
export async function exportDrawioToEditablePptx(
  xmlContent: string,
  diagramName: string = 'Architecture Blueprint',
  blueprintId: string = 'VIS-MASTER',
  options?: {
    returnBlob?: boolean;
    returnBase64?: boolean;
    masterImageSrc?: string;
    editableOverrides?: Record<string, { title?: string; subtitle?: string; label?: string; role?: string }>;
  }
): Promise<Blob | string | void> {
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_WIDE'; // 13.333 x 7.5 inches widescreen 16:9
  pptx.author = 'PromptCanvas Vision Decompiler';
  pptx.company = 'PromptCanvas Enterprise';
  pptx.title = `${diagramName} (${blueprintId})`;

  const SLIDE_W = 13.333;
  const SLIDE_H = 7.5;
  const MARGIN_X = 0.32;
  const MARGIN_Y = 0.2;

  const { cells, minX, minY, maxX, maxY, isDarkDiagram, diagramBgHex } = parseDrawioXmlForPptx(xmlContent);
  const graphW = Math.max(400, maxX - minX);
  const graphH = Math.max(300, maxY - minY);

  // ============================================================================
  // SINGLE EDITABLE SLIDE: 100% DECOMPOSED NATIVE VECTOR SHAPES, ICONS & ARROWS
  // ============================================================================
  const availW = SLIDE_W - MARGIN_X * 2;
  const availH = SLIDE_H - MARGIN_Y * 2;

  const scaleX = availW / graphW;
  const scaleY = availH / graphH;

  const offsetX = MARGIN_X;
  const offsetY = MARGIN_Y;

  const toSlideX = (x: number) => Number((offsetX + (x - minX) * scaleX).toFixed(3));
  const toSlideY = (y: number) => Number((offsetY + (y - minY) * scaleY).toFixed(3));
  const toSlideW = (w: number) => Number(Math.max(0.08, w * scaleX).toFixed(3));
  const toSlideH = (h: number) => Number(Math.max(0.08, h * scaleY).toFixed(3));

  const slide2 = pptx.addSlide();
  slide2.background = { color: isDarkDiagram ? diagramBgHex : 'FFFFFF' };

  // Strict sorting: background enclaves & large containers first, child cards next, small badges & icons on top
  const vertices = cells
    .filter((c) => c.vertex && (c.width > 0 || c.height > 0))
    .sort((a, b) => {
      if (a.depth !== b.depth) return a.depth - b.depth;
      return b.width * b.height - a.width * a.height;
    });

  const cellMap = new Map<string, ParsedMxCell>();
  cells.forEach((c) => cellMap.set(c.id, c));

  // Identify which cells have children (either via parent attribute or geometric containment)
  const parentIds = new Set<string>();
  cells.forEach((c) => {
    if (c.parent && c.parent !== '0' && c.parent !== '1') {
      parentIds.add(c.parent);
    }
  });
  for (const outer of vertices) {
    if ((outer.id === 'bg' || outer.id.includes('bg')) && outer.width >= 700 && outer.height >= 400) continue;
    const outerArea = outer.width * outer.height;
    if (outerArea < 12000) continue;
    for (const inner of vertices) {
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
    const isCylinder =
      Boolean(style.shape && style.shape.toLowerCase().includes('cylinder')) || style.cylinder === '1';

    let shapeType = pptx.ShapeType.rect;
    if (isCylinder) {
      shapeType = pptx.ShapeType.can;
    } else if (style.ellipse === '1' || style.shape === 'ellipse') {
      shapeType = pptx.ShapeType.ellipse;
    } else if (style.rhombus === '1' || style.shape === 'rhombus') {
      shapeType = pptx.ShapeType.diamond;
    } else if (style.rounded === '1') {
      shapeType = pptx.ShapeType.roundRect;
    }

    const override = options?.editableOverrides?.[node.id];
    const { title: rawPlainTitle, subtitle: rawPlainSubtitle, lines: parsedLines } = cleanHtmlToPlainText(node.value);
    const title = override?.title ?? override?.label ?? rawPlainTitle;
    const subtitle = override?.subtitle ?? override?.role ?? rawPlainSubtitle;
    const structured = extractStructuredNodeLayout(node.value);

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
    } else if (!isDarkNodeFill && !isDarkColor(resolvedTitleColor)) {
      resolvedTitleColor = '0F172A';
    }

    let resolvedSubtitleColor = node.htmlSubtitleColor
      ? node.htmlSubtitleColor
      : isDarkNodeFill
      ? 'CBD5E1'
      : '334155';
    if (isDarkNodeFill && isDarkColor(resolvedSubtitleColor)) {
      resolvedSubtitleColor = 'CBD5E1';
    } else if (!isDarkNodeFill && !isDarkColor(resolvedSubtitleColor)) {
      resolvedSubtitleColor = '334155';
    }

    const rawFontSize = parseFloat(style.fontSize || '10.5');
    const scaledTitleSize = Math.min(9.5, Math.max(6.5, Number((rawFontSize * Math.sqrt(scaleY) * 0.82).toFixed(1))));
    const scaledSubSize = Math.max(6, Number((scaledTitleSize - 1.3).toFixed(1)));

    const isContainer = style.container === '1' || parentIds.has(node.id);
    const isMultiRowIconList = structured.kind === 'multi-row-icon-list' && (structured.iconRows?.length || 0) >= 2;
    const isTableCard = !isContainer && structured.kind === 'table-card';
    const isMultiRowCard = !isContainer && !isMultiRowIconList && !isTableCard && parsedLines.length > 4;

    const iconSource = node.extractedSvgs[0] || node.imageDataUrl;

    const isStandaloneIconWithBottomLabel =
      (!hasFill && !hasStroke && Boolean(iconSource)) ||
      style.verticalLabelPosition === 'bottom' ||
      (isImageShape && node.width <= 76 && node.height <= 76 && !isContainer && !isMultiRowCard && !isTableCard);

    // 1. Draw the vector background shape if it has fill or border
    if (hasFill || hasStroke) {
      slide2.addShape(shapeType, {
        x: bx,
        y: by,
        w: bw,
        h: bh,
        rectRadius: shapeType === pptx.ShapeType.roundRect ? (bw < 1.6 ? 0.06 : 0.08) : undefined,
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

    // 2A. Multi-Row Icon List Card (e.g., GCP Observability, AgentOps & FinOps)
    if (isMultiRowIconList && structured.iconRows) {
      const headerText = structured.headerLines.join('\n') || title;
      const headerH = Math.min(0.44, Math.max(0.3, bh * 0.17));
      if (headerText) {
        slide2.addText(headerText, {
          x: Number((bx + 0.04).toFixed(3)),
          y: Number((by + 0.05).toFixed(3)),
          w: Number(Math.max(0.4, bw - 0.08).toFixed(3)),
          h: Number(headerH.toFixed(3)),
          fontSize: scaledTitleSize,
          bold: true,
          color: resolvedTitleColor,
          align: 'center',
          valign: 'middle',
          margin: [1, 2, 1, 2],
          fontFace: 'Arial',
          wrap: true,
        });
      }

      const rowsStartY = by + headerH + 0.06;
      const availRowsH = Math.max(0.5, bh - headerH - 0.12);
      const rowSlotH = availRowsH / structured.iconRows.length;
      const rowIconSq = Number(Math.min(0.2, Math.max(0.14, rowSlotH * 0.62)).toFixed(3));

      for (let rIdx = 0; rIdx < structured.iconRows.length; rIdx++) {
        const row = structured.iconRows[rIdx];
        const rowY = rowsStartY + rIdx * rowSlotH;
        let textStartX = bx + 0.08;

        if (row.iconSvg) {
          const rowIconDataUrl = await renderInlineSvgToPngDataUrl(row.iconSvg, 128, 128);
          if (rowIconDataUrl) {
            const iconX = Number((bx + 0.08).toFixed(3));
            const iconY = Number((rowY + (rowSlotH - rowIconSq) / 2).toFixed(3));
            slide2.addImage({
              data: rowIconDataUrl,
              x: iconX,
              y: iconY,
              w: rowIconSq,
              h: rowIconSq,
            });
            textStartX = iconX + rowIconSq + 0.05;
          }
        }

        const rowRuns: PptxGenJS.TextProps[] = [
          {
            text: row.title,
            options: {
              fontSize: Math.max(6.5, Number((scaledTitleSize - 0.5).toFixed(1))),
              bold: true,
              color: resolvedTitleColor,
              breakLine: Boolean(row.subtitle),
            },
          },
        ];
        if (row.subtitle) {
          rowRuns.push({
            text: row.subtitle,
            options: {
              fontSize: Math.max(5.8, Number((scaledSubSize - 0.3).toFixed(1))),
              bold: false,
              color: resolvedSubtitleColor,
            },
          });
        }

        slide2.addText(rowRuns, {
          x: Number(textStartX.toFixed(3)),
          y: Number(rowY.toFixed(3)),
          w: Number(Math.max(0.3, bx + bw - textStartX - 0.04).toFixed(3)),
          h: Number(rowSlotH.toFixed(3)),
          align: 'left',
          valign: 'middle',
          margin: [0, 1, 0, 1],
          fontFace: 'Arial',
          wrap: true,
        });
      }
      continue;
    }

    // 2B. Single-Row Table Card with Left Icon, Centered Multi-Line Text & Optional Right Icon (compactNodeHtml)
    if (isTableCard) {
      const bodyVerticalOffset = isCylinder ? bh * 0.08 : 0;
      const effectiveBh = isCylinder ? bh * 0.88 : bh;
      const effectiveBy = by + bodyVerticalOffset;
      const iconSq = Number(
        Math.min(0.22, Math.max(0.14, Math.min(effectiveBh * 0.42, bw * 0.16))).toFixed(3)
      );

      let padLeft = 0.04;
      let padRight = 0.04;

      if (structured.leftIconSvg) {
        const leftDataUrl = await renderInlineSvgToPngDataUrl(structured.leftIconSvg, 128, 128);
        if (leftDataUrl) {
          const lx = Number((bx + 0.05).toFixed(3));
          const ly = Number((effectiveBy + (effectiveBh - iconSq) / 2).toFixed(3));
          slide2.addImage({
            data: leftDataUrl,
            x: lx,
            y: ly,
            w: iconSq,
            h: iconSq,
          });
          padLeft = iconSq + 0.06;
        }
      }

      if (structured.rightIconSvg) {
        const rightDataUrl = await renderInlineSvgToPngDataUrl(structured.rightIconSvg, 128, 128);
        if (rightDataUrl) {
          const rx = Number((bx + bw - iconSq - 0.05).toFixed(3));
          const ry = Number((effectiveBy + (effectiveBh - iconSq) / 2).toFixed(3));
          slide2.addImage({
            data: rightDataUrl,
            x: rx,
            y: ry,
            w: iconSq,
            h: iconSq,
          });
          padRight = iconSq + 0.06;
        }
      }

      const cardLines =
        override?.title || override?.subtitle
          ? [
              { text: title.replace(/^\d+\.\s*/, ''), color: resolvedTitleColor, bold: true },
              ...(subtitle ? [{ text: subtitle, color: resolvedSubtitleColor, bold: false }] : []),
            ]
          : structured.bodyLines;

      if (cardLines.length > 0) {
        const textRuns: PptxGenJS.TextProps[] = [];
        const hasSubLines = cardLines.length > 1;

        if (structured.stepBadge) {
          const badgeChar =
            CIRCLED_STEP_DIGITS[structured.stepBadge.num] || `${structured.stepBadge.num}.`;
          textRuns.push({
            text: `${badgeChar} `,
            options: {
              fontSize: Number((scaledTitleSize + 0.8).toFixed(1)),
              bold: true,
              color: structured.stepBadge.bgHex,
              breakLine: false,
            },
          });
        }

        cardLines.forEach((ln, idx) => {
          const isFirst = idx === 0;
          const isLast = idx === cardLines.length - 1;
          const lineColor = isFirst
            ? resolvedTitleColor
            : ln.color && !isDarkNodeFill
            ? ln.color
            : resolvedSubtitleColor;
          textRuns.push({
            text: ln.text,
            options: {
              fontSize: isFirst ? scaledTitleSize : scaledSubSize,
              bold: isFirst || Boolean(ln.bold),
              color: lineColor,
              breakLine: isFirst ? hasSubLines : !isLast,
            },
          });
        });

        // Keep centered text balanced; only inset where an icon is present
        const txtX = Number((bx + padLeft).toFixed(3));
        const txtW = Number(Math.max(0.25, bw - padLeft - padRight).toFixed(3));
        slide2.addText(textRuns, {
          x: txtX,
          y: Number(effectiveBy.toFixed(3)),
          w: txtW,
          h: Number(effectiveBh.toFixed(3)),
          align: structured.textAlign || 'center',
          valign: 'middle',
          margin: [1, 2, 1, 2],
          fontFace: 'Arial',
          wrap: true,
        });
      }
      continue;
    }

    // 2C. Standard Icon & Text Nodes (Standalone Icons, Containers, Text Callouts)
    const isVerticalCardWithIcon =
      !isStandaloneIconWithBottomLabel &&
      !isContainer &&
      !isMultiRowCard &&
      Boolean(iconSource) &&
      (node.value.includes('flex-direction:column') || bh >= bw * 0.65);

    const isHorizontalCardWithIcon =
      !isStandaloneIconWithBottomLabel &&
      !isContainer &&
      !isMultiRowCard &&
      Boolean(iconSource) &&
      !isVerticalCardWithIcon;

    let computedIconBottomY = by;
    let computedIconRightX = bx;

    if (iconSource && !isMultiRowCard) {
      const iconDataUrl = await renderInlineSvgToPngDataUrl(iconSource, 128, 128);
      if (iconDataUrl) {
        if (isStandaloneIconWithBottomLabel) {
          const iconSq = Number(
            Math.min(0.28, Math.max(0.14, Math.min(bw, bh))).toFixed(3)
          );
          const iconX = Number((bx + (bw - iconSq) / 2).toFixed(3));
          const iconY = Number(by.toFixed(3));
          computedIconBottomY = iconY + iconSq;
          slide2.addImage({
            data: iconDataUrl,
            x: iconX,
            y: iconY,
            w: iconSq,
            h: iconSq,
          });
        } else if (isVerticalCardWithIcon) {
          const iconSq = Number(
            Math.min(0.24, Math.max(0.14, Math.min(bw * 0.45, bh * 0.38))).toFixed(3)
          );
          const iconX = Number((bx + (bw - iconSq) / 2).toFixed(3));
          const iconY = Number((by + Math.min(0.05, bh * 0.08)).toFixed(3));
          computedIconBottomY = iconY + iconSq;
          slide2.addImage({
            data: iconDataUrl,
            x: iconX,
            y: iconY,
            w: iconSq,
            h: iconSq,
          });
        } else if (isHorizontalCardWithIcon) {
          const iconSq = Number(
            Math.min(0.22, Math.max(0.13, bh * 0.56)).toFixed(3)
          );
          const iconX = Number((bx + 0.04).toFixed(3));
          const iconY = Number((by + (bh - iconSq) / 2).toFixed(3));
          computedIconRightX = iconX + iconSq;
          slide2.addImage({
            data: iconDataUrl,
            x: iconX,
            y: iconY,
            w: iconSq,
            h: iconSq,
          });
        }
      }
    }

    // 3. Add crisp editable text overlay with accurate non-overlapping position
    if (title) {
      let textRuns: PptxGenJS.TextProps[] = [];

      if (structured.inlineSpans && structured.inlineSpans.length >= 2 && !override) {
        if (structured.stepBadge) {
          const badgeChar =
            CIRCLED_STEP_DIGITS[structured.stepBadge.num] || `${structured.stepBadge.num}.`;
          textRuns.push({
            text: `${badgeChar} `,
            options: {
              fontSize: Number((scaledTitleSize + 0.8).toFixed(1)),
              bold: true,
              color: structured.stepBadge.bgHex,
              breakLine: false,
            },
          });
        }
        structured.inlineSpans.forEach((sp, sIdx) => {
          textRuns.push({
            text: sIdx === 0 ? `${sp.text} ` : sp.text,
            options: {
              fontSize: sp.isSmall ? scaledSubSize : scaledTitleSize,
              bold: sp.bold ?? sIdx === 0,
              color: sp.color || resolvedTitleColor,
              breakLine: false,
            },
          });
        });
      } else if (structured.bodyLines.length >= 2 && !isMultiRowCard && !override) {
        if (structured.stepBadge) {
          const badgeChar =
            CIRCLED_STEP_DIGITS[structured.stepBadge.num] || `${structured.stepBadge.num}.`;
          textRuns.push({
            text: `${badgeChar} `,
            options: {
              fontSize: Number((scaledTitleSize + 0.8).toFixed(1)),
              bold: true,
              color: structured.stepBadge.bgHex,
              breakLine: false,
            },
          });
        }
        structured.bodyLines.forEach((ln, idx) => {
          const isFirst = idx === 0;
          const isLast = idx === structured.bodyLines.length - 1;
          textRuns.push({
            text: ln.text,
            options: {
              fontSize: isFirst || ln.bold ? scaledTitleSize : scaledSubSize,
              bold: isFirst || Boolean(ln.bold),
              color: ln.color || (isFirst ? resolvedTitleColor : resolvedSubtitleColor),
              breakLine: !isLast,
            },
          });
        });
      } else {
        let formattedSubtitle = subtitle;
        if (isMultiRowCard) {
          const bulletRows: string[] = [];
          for (let i = 1; i < parsedLines.length; i++) {
            const ln = parsedLines[i].trim();
            if (!ln) continue;
            if (ln.startsWith('(') && bulletRows.length > 0) {
              bulletRows[bulletRows.length - 1] += ` ${ln}`;
            } else {
              bulletRows.push(`• ${ln}`);
            }
          }
          formattedSubtitle = bulletRows.join('\n');
        }

        const cleanTitleText = structured.stepBadge ? title.replace(/^\d+\.\s*/, '') : title;
        if (structured.stepBadge) {
          const badgeChar =
            CIRCLED_STEP_DIGITS[structured.stepBadge.num] || `${structured.stepBadge.num}.`;
          textRuns.push({
            text: `${badgeChar} `,
            options: {
              fontSize: Number((scaledTitleSize + 0.8).toFixed(1)),
              bold: true,
              color: structured.stepBadge.bgHex,
              breakLine: false,
            },
          });
        }

        textRuns.push({
          text: cleanTitleText,
          options: {
            fontSize: scaledTitleSize,
            bold: true,
            color: resolvedTitleColor,
            breakLine: Boolean(formattedSubtitle),
          },
        });

        if (formattedSubtitle) {
          textRuns.push({
            text: (isMultiRowCard ? '\n' : '') + formattedSubtitle,
            options: {
              fontSize: scaledSubSize,
              bold: false,
              color: resolvedSubtitleColor,
            },
          });
        }
      }

      if (isStandaloneIconWithBottomLabel) {
        const lines = (title + (subtitle ? '\n' + subtitle : '')).split('\n');
        const maxLineChars = Math.max(...lines.map((l) => l.trim().length), 4);
        const charW = scaledTitleSize * 0.0072;
        const estTextW = maxLineChars * charW + 0.12;
        const maxAllowedW = maxLineChars >= 18 ? 1.38 : maxLineChars >= 10 ? 0.64 : 0.46;
        const lblW = Number(Math.min(maxAllowedW, Math.max(bw + 0.14, estTextW)).toFixed(3));
        const lblX = Number((bx + bw / 2 - lblW / 2).toFixed(3));
        const lblY = Number((computedIconBottomY + 0.008).toFixed(3));
        slide2.addText(textRuns, {
          x: lblX,
          y: lblY,
          w: lblW,
          h: 0.28,
          align: 'center',
          valign: 'top',
          margin: [0, 1, 0, 1],
          fontFace: 'Arial',
          wrap: true,
        });
      } else if (isContainer) {
        // Place container header cleanly inside the top banner strip
        slide2.addText(textRuns, {
          x: Number((bx + 0.05).toFixed(3)),
          y: Number((by + 0.02).toFixed(3)),
          w: Number(Math.max(0.4, bw - 0.1).toFixed(3)),
          h: 0.26,
          align: style.align === 'left' ? 'left' : style.align === 'right' ? 'right' : 'center',
          valign: 'top',
          margin: [2, 4, 2, 4],
          fontFace: 'Arial',
          wrap: true,
        });
      } else if (isMultiRowCard) {
        slide2.addText(textRuns, {
          x: Number((bx + 0.04).toFixed(3)),
          y: Number((by + 0.04).toFixed(3)),
          w: Number(Math.max(0.4, bw - 0.08).toFixed(3)),
          h: Number(Math.max(0.28, bh - 0.08).toFixed(3)),
          align: 'left',
          valign: 'top',
          margin: [3, 4, 3, 4],
          fontFace: 'Arial',
          wrap: true,
        });
      } else if (isVerticalCardWithIcon) {
        const txtY = Number((computedIconBottomY + 0.015).toFixed(3));
        const txtH = Number(Math.max(0.16, by + bh - txtY - 0.015).toFixed(3));
        slide2.addText(textRuns, {
          x: bx,
          y: txtY,
          w: bw,
          h: txtH,
          align: 'center',
          valign: 'top',
          margin: [1, 2, 1, 2],
          fontFace: 'Arial',
          wrap: true,
        });
      } else if (isHorizontalCardWithIcon) {
        const txtX = Number((computedIconRightX + 0.04).toFixed(3));
        const txtW = Number(Math.max(0.18, bx + bw - txtX - 0.03).toFixed(3));
        slide2.addText(textRuns, {
          x: txtX,
          y: by,
          w: txtW,
          h: bh,
          align: style.align === 'left' ? 'left' : 'center',
          valign: 'middle',
          margin: [1, 2, 1, 2],
          fontFace: 'Arial',
          wrap: true,
        });
      } else {
        // Standard card, pill, or text-only label without icon
        const isTextOnly = !hasFill && !hasStroke;
        const lines = (title + (subtitle ? '\n' + subtitle : '')).split('\n');
        const maxLineChars = Math.max(...lines.map((l) => l.trim().length), 4);
        const minReqW = isTextOnly ? maxLineChars * (scaledTitleSize * 0.0072) + 0.1 : bw;
        const finalW = isTextOnly && style.align !== 'left' && style.align !== 'right' ? Math.max(bw, minReqW) : bw;
        const finalX = isTextOnly && finalW > bw ? Number((bx - (finalW - bw) / 2).toFixed(3)) : bx;
        const textValign =
          style.verticalAlign === 'bottom'
            ? 'bottom'
            : style.verticalAlign === 'top'
              ? 'top'
              : 'middle';
        slide2.addText(textRuns, {
          x: finalX,
          y: by,
          w: Number(finalW.toFixed(3)),
          h: bh,
          align: style.align === 'left' ? 'left' : style.align === 'right' ? 'right' : 'center',
          valign: textValign,
          margin: isTextOnly ? [0, 1, 0, 1] : [2, 4, 2, 4],
          fontFace: 'Arial',
          wrap: true,
        });
      }
    }
  }

  // ============================================================================
  // RENDER ALL CONNECTOR EDGES & FREE-FLOATING ARROWS ON THE EDITABLE SLIDE
  // ============================================================================
  const edges = cells.filter((c) => c.edge);
  for (const edge of edges) {
    const src = cellMap.get(edge.source || '');
    const tgt = cellMap.get(edge.target || '');

    let ptStart: { x: number; y: number } | undefined;
    let ptEnd: { x: number; y: number } | undefined;

    let exitXVal = 0.5;
    let exitYVal = 0.5;
    let entryXVal = 0.5;
    let entryYVal = 0.5;

    if (src) {
      exitXVal = parseFloat(edge.style.exitX ?? '0.5');
      exitYVal = parseFloat(edge.style.exitY ?? '0.5');
      ptStart = {
        x: src.absX + src.width * exitXVal,
        y: src.absY + src.height * exitYVal,
      };
    } else if (edge.sourcePoint) {
      ptStart = edge.sourcePoint;
    }

    if (tgt) {
      entryXVal = parseFloat(edge.style.entryX ?? '0.5');
      entryYVal = parseFloat(edge.style.entryY ?? '0.5');
      ptEnd = {
        x: tgt.absX + tgt.width * entryXVal,
        y: tgt.absY + tgt.height * entryYVal,
      };
    } else if (edge.targetPoint) {
      ptEnd = edge.targetPoint;
    }

    if (!ptStart || !ptEnd) continue;

    // Snap near-collinear endpoints/waypoints (<= 8px drift) to prevent mini-staircase kinks
    const snappedWaypoints = edge.waypoints.map((wp) => ({ ...wp }));
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

    const strokeColor = normalizeHexColor(edge.style.strokeColor, isDarkDiagram ? '60A5FA' : '1E293B');
    const isDashed = edge.style.dashed === '1';
    const strokeWidth = Math.min(2.2, Math.max(1.0, parseFloat(edge.style.strokeWidth || '1.4')));

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
      const lineW = Number(Math.abs(x2 - x1).toFixed(3));
      const lineH = Number(Math.abs(y2 - y1).toFixed(3));
      if (lineW === 0 && lineH === 0) continue;

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

    const { fullText: rawEdgeText } = cleanHtmlToPlainText(edge.value);
    const edgeLabel = rawEdgeText.replace(/\s+/g, ' ').trim();
    if (edgeLabel) {
      const midIdx = Math.floor(allPoints.length / 2);
      const pA = allPoints[Math.max(0, midIdx - 1)];
      const pB = allPoints[midIdx];
      const midX = toSlideX((pA.x + pB.x) / 2);
      const midY = toSlideY((pA.y + pB.y) / 2);
      const lblW = Math.max(0.32, Math.min(1.65, edgeLabel.length * 0.052 + 0.08));
      const lblH = 0.16;

      // Borderless background knockout matching Draw.io labelBackgroundColor=#FFFFFF;labelBorderColor=none
      slide2.addText(edgeLabel, {
        x: Number((midX - lblW / 2).toFixed(3)),
        y: Number((midY - lblH / 2).toFixed(3)),
        w: Number(lblW.toFixed(3)),
        h: lblH,
        fill: { color: isDarkDiagram ? diagramBgHex : 'FFFFFF' },
        fontSize: 6.5,
        bold: true,
        color: isDarkDiagram ? 'F8FAFC' : '0F172A',
        align: 'center',
        valign: 'middle',
        margin: [0, 2, 0, 2],
        fontFace: 'Arial',
      });
    }
  }

  if (options?.returnBase64) {
    const b64 = (await pptx.write({ outputType: 'base64' })) as string;
    return b64;
  }

  if (options?.returnBlob) {
    const blob = (await pptx.write({ outputType: 'blob' })) as Blob;
    return blob;
  }

  const safeName = diagramName.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
  await pptx.writeFile({ fileName: `${safeName || 'architecture'}_editable_slides.pptx` });
}

