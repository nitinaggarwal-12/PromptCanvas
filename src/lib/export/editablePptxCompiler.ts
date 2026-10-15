/**
 * Draw.io XML to 100% Native Editable PowerPoint (.pptx) & Google Slides Compiler
 * Converts every Draw.io <mxCell> container, card, node, inline SVG icon, base64 style.image SVG icon,
 * text box, and connector edge into crisp presentation slides.
 *
 * Slide Deck Structure:
 * - Slide 1: 100% Native Editable Vector Shapes (#78 1:1 Uniform Aspect Ratio) + 4-Zone Architecture Center Guide
 * - Slides 2–6: Google Cloud Architecture Center Executive Cards & Tables (Architecture & Components,
 *   Agentic Flow & Products Used, Use Case & Design Alternatives, Well-Architected Framework, Deployment & What's Next)
 */

import PptxGenJS from 'pptxgenjs';
import JSZip from 'jszip';
import { XMLParser } from 'fast-xml-parser';
import {
  GOOGLE_CLOUD_DOCUMENTATION_SERIES,
  type CanonicalDocGuide,
  type DocSection,
} from '../blogs/googleCloudDocumentationSeries';

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

/**
 * Normalizes Draw.io HTML before text extraction so that:
 * 1. Multi-line `<br/>` tags inside `<b>...</b>` or `<strong>...</strong>` are collapsed into spaces
 *    (preventing wrapped bold titles from splitting into title + subtitle).
 * 2. Adjacent `</b><span` or `</strong><span` tags without an intervening `<br/>` receive an explicit `<br/>`
 *    (preventing run-on concatenation such as "Competing B2B TenantsFinVault...").
 */
export function normalizeDrawioHtmlForSlides(rawHtml: string | undefined): string {
  if (!rawHtml) return '';
  const decoded = rawHtml
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
  return decoded
    .replace(/<b\b([^>]*)>([\s\S]*?)<\/b>/gi, (_m, attrs, inner) => {
      const flat = String(inner).replace(/<br\s*\/?>/gi, ' ').replace(/\s+/g, ' ').trim();
      return `<b${attrs}>${flat}</b>`;
    })
    .replace(/<strong\b([^>]*)>([\s\S]*?)<\/strong>/gi, (_m, attrs, inner) => {
      const flat = String(inner).replace(/<br\s*\/?>/gi, ' ').replace(/\s+/g, ' ').trim();
      return `<strong${attrs}>${flat}</strong>`;
    })
    .replace(/<\/b>\s*(?!<br\b)(<span\b|<div\b|<font\b)/gi, '</b><br/>$1')
    .replace(/<\/strong>\s*(?!<br\b)(<span\b|<div\b|<font\b)/gi, '</strong><br/>$1');
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
  const decoded = normalizeDrawioHtmlForSlides(html);

  const svgRegex = /<svg[\s\S]*?<\/svg>/gi;
  let match;
  while ((match = svgRegex.exec(decoded)) !== null) {
    const candidate = match[0];
    if (!/display\s*:\s*none/i.test(candidate) && !/width\s*=\s*["']0["']/i.test(candidate)) {
      svgs.push(candidate);
    }
  }

  const imgDataRegex = /<img[^>]+src=["'](data:image\/[^"']+)["'][^>]*>/gi;
  let imgMatch;
  while ((imgMatch = imgDataRegex.exec(decoded)) !== null) {
    if (imgMatch[1]) {
      svgs.push(imgMatch[1]);
    }
  }

  const withoutSvg = decoded
    .replace(svgRegex, '')
    .replace(imgDataRegex, '')
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
  const decoded = normalizeDrawioHtmlForSlides(html);

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
      const width = ((bytes[16] << 24) | (bytes[17] << 16) | (bytes[18] << 8) | bytes[19]) >>> 0;
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

function extractFirstCssColor(fragment: string): string | undefined {
  const m = fragment.match(/(?:^|[;"'\s])color\s*:\s*(#[0-9a-fA-F]{3,6})/i);
  if (!m) return undefined;
  return normalizeHexColor(m[1], '');
}

function stripTagsToLines(fragment: string): string[] {
  return normalizeDrawioHtmlForSlides(fragment)
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
  const decoded = normalizeDrawioHtmlForSlides(rawHtml).replace(
    /<svg[^>]*(?:display\s*:\s*none|width\s*=\s*["']0["'])[^>]*>[\s\S]*?<\/svg>/gi,
    ''
  );
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
        const imgMatch = trBody.match(/<img[^>]+src=["'](data:image\/[^"']+)["'][^>]*>/i);
        const lines = stripTagsToLines(trBody);
        if (lines.length > 0) {
          iconRows.push({
            iconSvg: svgMatch ? svgMatch[0] : imgMatch ? imgMatch[1] : undefined,
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
          const content = normalizeDrawioHtmlForSlides(td[2] || '');
          const svgM = content.match(/<svg[\s\S]*?<\/svg>/i);
          const imgM = content.match(/<img[^>]+src=["'](data:image\/[^"']+)["'][^>]*>/i);
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
            svg: svgM ? svgM[0] : imgM ? imgM[1] : undefined,
            hasText: richLines.length > 0,
            richLines,
            align: alignMatch ? (alignMatch[1].toLowerCase() as 'left' | 'center' | 'right') : undefined,
          };
        });

        let leftIconSvg: string | undefined;
        let rightIconSvg: string | undefined;
        const textTd = parsedTds.find((t) => t.hasText) || parsedTds[0];

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

function resolveDocGuideForSlideDeck(
  blueprintId: string,
  diagramName: string,
  markdownContent?: string,
  docId?: string
): CanonicalDocGuide {
  const candidates = [docId, blueprintId, diagramName]
    .filter(Boolean)
    .map((s) => String(s).trim().toLowerCase());

  for (const c of candidates) {
    const exact = GOOGLE_CLOUD_DOCUMENTATION_SERIES.find(
      (d) =>
        d.docId.toLowerCase() === c ||
        d.slug.toLowerCase() === c ||
        d.useCasePresetId.toLowerCase() === c ||
        d.primaryBlueprintVariantId.toLowerCase() === c ||
        d.sections.some(
          (s) =>
            s.inlineDiagram?.blueprintVariantId.toLowerCase() === c ||
            s.secondaryInlineDiagram?.blueprintVariantId.toLowerCase() === c
        )
    );
    if (exact) return exact;
  }

  const bpUpper = String(blueprintId || '').trim().toUpperCase();
  const wsMap: Record<string, string> = {
    WS1: 'DOC-MT-01',
    WS2: 'DOC-MT-02',
    WS3: 'DOC-MT-03',
    WS4: 'DOC-MT-04',
    WS5: 'DOC-MT-06',
    ALL: 'DOC-MT-01',
    'BP-78': 'DOC-MT-01',
  };
  if (wsMap[bpUpper]) {
    const mapped = GOOGLE_CLOUD_DOCUMENTATION_SERIES.find((d) => d.docId === wsMap[bpUpper]);
    if (mapped) return mapped;
  }

  const wsPrefix = String(blueprintId || '').match(/^ws([1-5])/i);
  if (wsPrefix) {
    const wsKey = `WS${wsPrefix[1]}`;
    const mapped = GOOGLE_CLOUD_DOCUMENTATION_SERIES.find((d) => d.docId === wsMap[wsKey]);
    if (mapped) return mapped;
  }

  if (markdownContent) {
    const mdLower = markdownContent.toLowerCase();
    const byMd = GOOGLE_CLOUD_DOCUMENTATION_SERIES.find(
      (d) => mdLower.includes(d.docId.toLowerCase()) || mdLower.includes(d.title.toLowerCase().slice(0, 32))
    );
    if (byMd) return byMd;
  }

  const nameLower = String(diagramName || '').toLowerCase();
  const byTitle = GOOGLE_CLOUD_DOCUMENTATION_SERIES.find((d) =>
    nameLower.includes(d.title.toLowerCase().slice(0, 28))
  );
  return byTitle || GOOGLE_CLOUD_DOCUMENTATION_SERIES[0];
}

/**
 * Resolves a section from CanonicalDocGuide normalizing hyphens and underscores
 * so both 'products_used' and 'products-used' resolve with 100% reliability.
 */
export function findDocSection(docGuide: CanonicalDocGuide | undefined, ...candidateIds: string[]): DocSection | undefined {
  if (!docGuide) return undefined;
  const normalizedCandidates = candidateIds.map((id) => id.trim().toLowerCase().replace(/[-_]+/g, '_'));
  return docGuide.sections.find((sec) => {
    const normSecId = sec.id.trim().toLowerCase().replace(/[-_]+/g, '_');
    return normalizedCandidates.includes(normSecId);
  });
}

function truncateClean(text: string | undefined, maxLen: number): string {
  const clean = String(text || '').replace(/\s+/g, ' ').trim();
  if (clean.length <= maxLen) return clean;
  const cut = clean.slice(0, maxLen - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > maxLen * 0.65 ? cut.slice(0, lastSpace) : cut).replace(/[.,;:\-–—]+$/, '')}…`;
}

function extractInlineImgSrc(htmlValue: string | undefined): string | undefined {
  if (!htmlValue) return undefined;
  const decoded = htmlValue
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
  const m = decoded.match(/<img[^>]+src=["'](data:image\/[^"']+)["']/i);
  return m ? m[1] : undefined;
}

function addImagePreservingAspect(
  slide: PptxGenJS.Slide,
  dataUri: string,
  boxX: number,
  boxY: number,
  boxW: number,
  boxH: number
) {
  const dims = getImageDimensionsFromDataUri(dataUri);
  if (!dims) {
    slide.addImage({ data: dataUri, x: boxX, y: boxY, w: boxW, h: boxH });
    return;
  }
  const imgRatio = dims.width / dims.height;
  const boxRatio = boxW / boxH;
  let fitW = boxW;
  let fitH = boxH;
  if (imgRatio > boxRatio) {
    fitW = boxW;
    fitH = boxW / imgRatio;
  } else {
    fitH = boxH;
    fitW = boxH * imgRatio;
  }
  const fitX = Number((boxX + (boxW - fitW) / 2).toFixed(3));
  const fitY = Number((boxY + (boxH - fitH) / 2).toFixed(3));
  slide.addImage({
    data: dataUri,
    x: fitX,
    y: fitY,
    w: Number(fitW.toFixed(3)),
    h: Number(fitH.toFixed(3)),
  });
}

function renderArchitectureCenterDiagramSidebar(
  pptx: PptxGenJS,
  slide: PptxGenJS.Slide,
  sideX: number,
  sideY: number,
  sideW: number,
  sideH: number,
  figureLabel: string,
  diagramTitle: string,
  docGuide?: CanonicalDocGuide
) {
  const WHITE = 'FFFFFF';
  const SURFACE_BG = 'F8F9FA';
  const BORDER_GREY = 'DADCE0';
  const G_BLUE_DARK = '1967D2';
  const G_BLUE_DEEP = '174EA6';
  const G_BLUE_TINT = 'E8F0FE';
  const G_GREEN_DARK = '188038';
  const G_GREEN_DEEP = '137333';
  const G_GREEN_TINT = 'E6F4EA';
  const TEXT_DARK = '202124';
  const TEXT_BODY = '3C4043';

  // Outer Sidebar Container Card
  slide.addShape(pptx.ShapeType.roundRect, {
    x: sideX,
    y: sideY,
    w: sideW,
    h: sideH,
    rectRadius: 0.08,
    fill: { color: WHITE },
    line: { color: BORDER_GREY, width: 1 },
  });

  // Top Header Strip inside Sidebar
  slide.addShape(pptx.ShapeType.roundRect, {
    x: sideX,
    y: sideY,
    w: sideW,
    h: 0.36,
    rectRadius: 0.06,
    fill: { color: G_BLUE_TINT },
    line: { color: 'AECBFA', width: 0.75 },
  });
  slide.addText(`${figureLabel.toUpperCase()}  •  ARCHITECTURE CENTER GUIDE (#78)`, {
    x: Number((sideX + 0.12).toFixed(3)),
    y: Number((sideY + 0.03).toFixed(3)),
    w: Number((sideW - 0.24).toFixed(3)),
    h: 0.3,
    fontSize: 7.8,
    bold: true,
    color: G_BLUE_DEEP,
    align: 'center',
    valign: 'middle',
    fontFace: 'Arial',
  });

  // Section 1: Architectural Question & Scope
  const qY = Number((sideY + 0.42).toFixed(3));
  slide.addShape(pptx.ShapeType.roundRect, {
    x: Number((sideX + 0.12).toFixed(3)),
    y: qY,
    w: Number((sideW - 0.24).toFixed(3)),
    h: 0.72,
    rectRadius: 0.05,
    fill: { color: SURFACE_BG },
    line: { color: BORDER_GREY, width: 0.75 },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: Number((sideX + 0.12).toFixed(3)),
    y: qY,
    w: 0.07,
    h: 0.72,
    fill: { color: G_BLUE_DARK },
    line: { type: 'none' },
  });
  const questionText = truncateClean(
    docGuide?.subtitle ||
      `${diagramTitle} — Multi-tenant agentic AI isolation, cryptographic identity & FinOps governance on Google Cloud.`,
    165
  );
  slide.addText(
    [
      { text: 'ARCHITECTURAL SCOPE & DESIGN MANDATE\n', options: { fontSize: 6.3, bold: true, color: G_BLUE_DARK } },
      { text: questionText, options: { fontSize: 6.9, bold: true, color: TEXT_DARK } },
    ],
    {
      x: Number((sideX + 0.24).toFixed(3)),
      y: Number((qY + 0.04).toFixed(3)),
      w: Number((sideW - 0.42).toFixed(3)),
      h: 0.64,
      valign: 'middle',
      fontFace: 'Arial',
      wrap: true,
    }
  );

  // Section 2: 4-Zone Hub-and-Spoke Color Key
  const zHeaderY = Number((qY + 0.78).toFixed(3));
  slide.addText('4-ZONE HUB-AND-SPOKE TOPOLOGY KEY', {
    x: Number((sideX + 0.14).toFixed(3)),
    y: zHeaderY,
    w: Number((sideW - 0.28).toFixed(3)),
    h: 0.18,
    fontSize: 6.8,
    bold: true,
    color: G_BLUE_DEEP,
    fontFace: 'Arial',
  });

  const zones = [
    {
      zoneId: 'Zone 1',
      colorHex: 'AECBFA',
      borderHex: '174EA6',
      name: 'Routing Hub (#aecbfa)',
      role: 'Cloud Armor WAF, IAP & IAM STS verify OIDC identity and mint scoped OBO + DPoP tokens.',
    },
    {
      zoneId: 'Zone 2',
      colorHex: 'CEEAD6',
      borderHex: '137333',
      name: 'Governance Hub (#ceead6)',
      role: 'Security Command Center, Cloud KMS CMEK & BigQuery OTel govern encryption & FinOps.',
    },
    {
      zoneId: 'Zone 3',
      colorHex: 'FEEFC3',
      borderHex: 'B06000',
      name: 'Left Spoke (#feefc3)',
      role: 'Model Armor (4/6), Gemini 2.5 Pro 90% prefix cache (5) & Vertex AI Agent Engine runtime.',
    },
    {
      zoneId: 'Zone 4',
      colorHex: 'FAD2CF',
      borderHex: 'C5221F',
      name: 'Right Spoke (#fad2cf)',
      role: 'Scoped MCP servers, AlloyDB PostgreSQL RLS (`SET LOCAL`), Vector Search 2.0 & Silo vaults.',
    },
  ];

  let zy = Number((zHeaderY + 0.2).toFixed(3));
  for (const zn of zones) {
    slide.addShape(pptx.ShapeType.roundRect, {
      x: Number((sideX + 0.12).toFixed(3)),
      y: zy,
      w: Number((sideW - 0.24).toFixed(3)),
      h: 0.52,
      rectRadius: 0.05,
      fill: { color: WHITE },
      line: { color: zn.borderHex, width: 0.85 },
    });
    slide.addShape(pptx.ShapeType.roundRect, {
      x: Number((sideX + 0.18).toFixed(3)),
      y: Number((zy + 0.06).toFixed(3)),
      w: 0.68,
      h: 0.17,
      rectRadius: 0.03,
      fill: { color: zn.colorHex },
      line: { type: 'none' },
    });
    slide.addText(zn.zoneId.toUpperCase(), {
      x: Number((sideX + 0.18).toFixed(3)),
      y: Number((zy + 0.06).toFixed(3)),
      w: 0.68,
      h: 0.17,
      fontSize: 5.8,
      bold: true,
      color: zn.borderHex,
      align: 'center',
      valign: 'middle',
      fontFace: 'Arial',
    });
    slide.addText(zn.name, {
      x: Number((sideX + 0.9).toFixed(3)),
      y: Number((zy + 0.04).toFixed(3)),
      w: Number((sideW - 1.08).toFixed(3)),
      h: 0.2,
      fontSize: 6.9,
      bold: true,
      color: TEXT_DARK,
      valign: 'middle',
      fontFace: 'Arial',
    });
    slide.addText(zn.role, {
      x: Number((sideX + 0.18).toFixed(3)),
      y: Number((zy + 0.24).toFixed(3)),
      w: Number((sideW - 0.36).toFixed(3)),
      h: 0.25,
      fontSize: 6.2,
      color: TEXT_BODY,
      valign: 'top',
      fontFace: 'Arial',
      wrap: true,
    });
    zy = Number((zy + 0.56).toFixed(3));
  }

  // Section 3: Numbered Callout Steps ①–⑦ Quick Reference
  const sHeaderY = Number((zy + 0.02).toFixed(3));
  slide.addText('CALLOUT STEPS ①–⑦ QUICK WALKTHROUGH', {
    x: Number((sideX + 0.14).toFixed(3)),
    y: sHeaderY,
    w: Number((sideW - 0.28).toFixed(3)),
    h: 0.18,
    fontSize: 6.8,
    bold: true,
    color: G_BLUE_DEEP,
    fontFace: 'Arial',
  });

  const archSec = findDocSection(docGuide, 'architecture');
  const stepItems = (archSec?.agenticFlowSteps || []).slice(0, 7);
  const stepLines =
    stepItems.length > 0
      ? stepItems.map((st, idx) => {
          const s = truncateClean(
            st.step.split(/(?<!\d)\.(?!\d)\s+/)[0].replace(/\.$/, ''),
            126
          );
          return `${idx + 1}. ${/[.…]$/.test(s) ? s : `${s}.`}`;
        })
      : [
          '1. Request enters Global External ALB with Cloud Armor WAF.',
          '2. IAP & IAM STS mint tenant-scoped OBO + DPoP token.',
          '3. Cloud Run Tier Router dispatches to Pooled or Silo Spoke.',
          '4. Vertex AI Model Armor screens prompt & masks PII.',
          '5. Gemini 2.5 Pro executes reasoning with 90% prefix cache.',
          '6. Model Armor screens output; AlloyDB RLS & MCP execute.',
          '7. Sanitized response returns; BigQuery logs OTel FinOps.',
        ];

  const stepsBoxY = Number((sHeaderY + 0.2).toFixed(3));
  const stepsBoxH = 1.85;
  slide.addShape(pptx.ShapeType.roundRect, {
    x: Number((sideX + 0.12).toFixed(3)),
    y: stepsBoxY,
    w: Number((sideW - 0.24).toFixed(3)),
    h: stepsBoxH,
    rectRadius: 0.05,
    fill: { color: SURFACE_BG },
    line: { color: BORDER_GREY, width: 0.75 },
  });
  slide.addText(stepLines.join('\n'), {
    x: Number((sideX + 0.2).toFixed(3)),
    y: Number((stepsBoxY + 0.06).toFixed(3)),
    w: Number((sideW - 0.4).toFixed(3)),
    h: Number((stepsBoxH - 0.12).toFixed(3)),
    fontSize: 6.3,
    color: TEXT_BODY,
    valign: 'top',
    fontFace: 'Arial',
    lineSpacingMultiple: 1.05,
    wrap: true,
  });

  // Section 4: Bottom Verified Outcome Banner
  const outY = Number((sideY + sideH - 0.68).toFixed(3));
  slide.addShape(pptx.ShapeType.roundRect, {
    x: Number((sideX + 0.12).toFixed(3)),
    y: outY,
    w: Number((sideW - 0.24).toFixed(3)),
    h: 0.56,
    rectRadius: 0.05,
    fill: { color: G_GREEN_TINT },
    line: { color: G_GREEN_DARK, width: 0.85 },
  });
  slide.addText(
    [
      {
        text: `VERIFIED OUTCOME • ${docGuide?.docId || 'ARCH CENTER #78'}\n`,
        options: { fontSize: 6.3, bold: true, color: G_GREEN_DEEP },
      },
      {
        text: '56 Native Editable Shapes • 23 Connectors • Slides 2–6: Complete Architecture Center Blog Guide',
        options: { fontSize: 6.4, bold: true, color: TEXT_DARK },
      },
    ],
    {
      x: Number((sideX + 0.22).toFixed(3)),
      y: Number((outY + 0.04).toFixed(3)),
      w: Number((sideW - 0.44).toFixed(3)),
      h: 0.48,
      valign: 'middle',
      fontFace: 'Arial',
      wrap: true,
    }
  );
}

/**
 * Post-processes PPTX slide XML inside the ZIP container via JSZip so all connector
 * arrowheads (<a:headEnd> / <a:tailEnd>) carry w="sm" len="sm" for compact Google Slides rendering.
 */
async function postProcessPptxCompactArrowsBase64(rawBase64: string): Promise<string> {
  try {
    const zip = await JSZip.loadAsync(rawBase64, { base64: true });
    const slideFiles = Object.keys(zip.files).filter(
      (name) => name.startsWith('ppt/slides/slide') && name.endsWith('.xml')
    );
    for (const fileName of slideFiles) {
      const fileObj = zip.file(fileName);
      if (!fileObj) continue;
      let xmlStr = await fileObj.async('string');
      xmlStr = xmlStr
        .replace(/<a:headEnd type="triangle"\/>/g, '<a:headEnd type="triangle" w="sm" len="sm"/>')
        .replace(/<a:tailEnd type="triangle"\/>/g, '<a:tailEnd type="triangle" w="sm" len="sm"/>')
        .replace(/<a:headEnd type="arrow"\/>/g, '<a:headEnd type="arrow" w="sm" len="sm"/>')
        .replace(/<a:tailEnd type="arrow"\/>/g, '<a:tailEnd type="arrow" w="sm" len="sm"/>');
      zip.file(fileName, xmlStr);
    }
    return await zip.generateAsync({ type: 'base64', compression: 'DEFLATE' });
  } catch {
    return rawBase64;
  }
}

export const shrinkPptxArrowheadsInBase64 = postProcessPptxCompactArrowsBase64;

/**
 * Compiles Draw.io XML into a 100% Native Editable PowerPoint (.pptx) & Google Slides deck:
 * - Slide 1: Calibrated Google Cloud Architecture Center (#78) 100% Decomposed Native Vector Shapes,
 *   Aspect-Preserved Wordmark & Icons, Uniform 1:1 Scaling, Zero-Overlap Container Headers,
 *   Zone-Matched Callout Knockouts & Right-Hand 4-Zone Architecture Center Reference Sidebar
 * - Slides 2–6 (when includeArchCenterGuideSlides or markdownContent is provided):
 *   Associated Google Cloud Architecture Center Blog Content (Architecture & Components, Agentic Flow & Products Used,
 *   Use Case & Design Alternatives, Well-Architected Design Considerations, and Deployment Runbook & Contributors).
 */
export async function exportDrawioToEditablePptx(
  xmlContent: string,
  diagramName: string = 'Architecture Blueprint',
  blueprintId: string = 'VIS-MASTER',
  options?: {
    returnBlob?: boolean;
    returnBase64?: boolean;
    masterImageSrc?: string;
    includeArchCenterGuideSlides?: boolean;
    markdownContent?: string;
    docId?: string;
    editableOverrides?: Record<string, { title?: string; subtitle?: string; label?: string; role?: string }>;
  }
): Promise<Blob | string | void> {
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_WIDE'; // 13.333 x 7.5 inches widescreen 16:9
  pptx.author = 'Google Cloud Architecture Center • PromptCanvas Vision Decompiler';
  pptx.company = 'Google Cloud';
  pptx.title = `${diagramName} (${blueprintId})`;

  const SLIDE_W = 13.333;
  const SLIDE_H = 7.5;
  const HEADER_H = 0.68;

  const shouldIncludeGuide = Boolean(options?.includeArchCenterGuideSlides || options?.markdownContent);
  const docGuide = resolveDocGuideForSlideDeck(
    blueprintId,
    diagramName,
    options?.markdownContent,
    options?.docId
  );

  const addArchCenterChrome = (s: PptxGenJS.Slide, sectionBadge: string, slideNumLabel: string, customTitle?: string) => {
    s.background = { color: 'F8F9FA' };
    const segW = SLIDE_W / 4;
    s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: segW, h: 0.06, fill: { color: '4285F4' }, line: { type: 'none' } });
    s.addShape(pptx.ShapeType.rect, { x: segW, y: 0, w: segW, h: 0.06, fill: { color: 'EA4335' }, line: { type: 'none' } });
    s.addShape(pptx.ShapeType.rect, { x: segW * 2, y: 0, w: segW, h: 0.06, fill: { color: 'FBBC04' }, line: { type: 'none' } });
    s.addShape(pptx.ShapeType.rect, { x: segW * 3, y: 0, w: segW, h: 0.06, fill: { color: '34A853' }, line: { type: 'none' } });

    s.addShape(pptx.ShapeType.rect, {
      x: 0,
      y: 0.06,
      w: SLIDE_W,
      h: HEADER_H - 0.06,
      fill: { color: 'FFFFFF' },
      line: { color: 'DADCE0', width: 0.75 },
    });

    const docCrumb = docGuide ? `${docGuide.docId} (${docGuide.partBadge})` : blueprintId;
    s.addText(`Home › Documentation › Cloud Architecture Center › ${docCrumb} › ${sectionBadge}`, {
      x: 0.32,
      y: 0.09,
      w: 9.8,
      h: 0.2,
      fontSize: 7.8,
      bold: true,
      color: '1967D2',
      fontFace: 'Arial',
    });
    s.addText(customTitle || docGuide?.title || diagramName, {
      x: 0.32,
      y: 0.29,
      w: 9.8,
      h: 0.32,
      fontSize: 12.2,
      bold: true,
      color: '202124',
      fontFace: 'Arial',
      valign: 'middle',
    });

    s.addShape(pptx.ShapeType.roundRect, {
      x: 10.35,
      y: 0.16,
      w: 2.7,
      h: 0.38,
      rectRadius: 0.05,
      fill: { color: 'E6F4EA' },
      line: { color: 'CEEAD6', width: 0.75 },
    });
    s.addText(slideNumLabel, {
      x: 10.4,
      y: 0.16,
      w: 2.6,
      h: 0.38,
      fontSize: 7.8,
      bold: true,
      color: '137333',
      align: 'center',
      valign: 'middle',
      fontFace: 'Arial',
    });
  };

  // ============================================================================
  // SLIDE 1: CALIBRATED GOOGLE CLOUD ARCHITECTURE CENTER (#78) EDITABLE DIAGRAM
  // ============================================================================
  const { cells, minX, minY, maxX, maxY, isDarkDiagram, diagramBgHex } = parseDrawioXmlForPptx(xmlContent);
  const hasTopTitleBox = cells.some((c) => c.id === 'hdr_title_box');
  const isArchCenter78 =
    hasTopTitleBox ||
    cells.some(
      (c) => c.id === 'gcp_outer' || c.id === 'zone_routing_hub' || c.id === 'zone_gov_hub' || c.id === 'gcp_wordmark'
    );

  const effMinX = minX;
  const effMinY = hasTopTitleBox && minY < 45 ? 48 : minY;
  const effGraphW = Math.max(400, maxX - effMinX);
  const effGraphH = Math.max(300, maxY - effMinY);

  const slide2 = pptx.addSlide();
  if (isArchCenter78 || shouldIncludeGuide) {
    addArchCenterChrome(
      slide2,
      'Figure 1 • Editable Architecture Topology (#78)',
      shouldIncludeGuide ? 'Editable Diagram + Blog • Slide 1 / 6' : '100% Native Editable Shapes (#78)',
      diagramName
    );
  } else {
    slide2.background = { color: isDarkDiagram ? diagramBgHex : 'FFFFFF' };
  }

  // Left Editable Diagram Canvas + Right 4-Zone Architecture Center Reference Sidebar
  const useSplitArchCenterLayout = isArchCenter78 || shouldIncludeGuide;
  const CANVAS_X = useSplitArchCenterLayout ? 0.28 : 0.32;
  const CANVAS_Y = useSplitArchCenterLayout ? HEADER_H + 0.06 : 0.2;
  const CANVAS_W = useSplitArchCenterLayout ? 7.62 : SLIDE_W - 0.64;
  const CANVAS_H = useSplitArchCenterLayout ? SLIDE_H - HEADER_H - 0.14 : SLIDE_H - 0.4;

  if (useSplitArchCenterLayout) {
    slide2.addShape(pptx.ShapeType.roundRect, {
      x: CANVAS_X,
      y: CANVAS_Y,
      w: CANVAS_W,
      h: CANVAS_H,
      rectRadius: 0.08,
      fill: { color: 'FFFFFF' },
      line: { color: 'DADCE0', width: 1 },
    });

    const SIDEBAR_X = Number((CANVAS_X + CANVAS_W + 0.14).toFixed(3));
    const SIDEBAR_W = Number((SLIDE_W - SIDEBAR_X - 0.26).toFixed(3));
    renderArchitectureCenterDiagramSidebar(
      pptx,
      slide2,
      SIDEBAR_X,
      CANVAS_Y,
      SIDEBAR_W,
      CANVAS_H,
      'Figure 1',
      diagramName,
      docGuide
    );
  }

  const PAD_X = useSplitArchCenterLayout ? 0.14 : 0;
  const PAD_Y = useSplitArchCenterLayout ? 0.1 : 0;
  const availW = CANVAS_W - PAD_X * 2;
  const availH = CANVAS_H - PAD_Y * 2;

  // Enforce 1:1 uniform aspect-ratio scaling so portrait #78 (1200x1410) diagrams never stretch horizontally
  const uniformScale = Math.min(availW / effGraphW, availH / effGraphH);
  const scaleX = uniformScale;
  const scaleY = uniformScale;

  const renderedW = effGraphW * scaleX;
  const renderedH = effGraphH * scaleY;
  const offsetX = CANVAS_X + PAD_X + (availW - renderedW) / 2;
  const offsetY = CANVAS_Y + PAD_Y + (availH - renderedH) / 2;

  const toSlideX = (x: number) => Number((offsetX + (x - effMinX) * scaleX).toFixed(3));
  const toSlideY = (y: number) => Number((offsetY + (y - effMinY) * scaleY).toFixed(3));
  const toSlideW = (w: number) => Number(Math.max(0.06, w * scaleX).toFixed(3));
  const toSlideH = (h: number) => Number(Math.max(0.06, h * scaleY).toFixed(3));

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

  const renderVertexNode = async (node: ParsedMxCell) => {
    // Skip hdr_title_box inside the diagram canvas because the title is already in the top header bar
    if (node.id === 'hdr_title_box') {
      return;
    }
    // Skip full-bleed background canvas rectangle
    if ((node.id === 'bg' || node.id.includes('bg')) && node.width >= 700 && node.height >= 400) {
      return;
    }

    const style = node.style;
    const isCircleStepBadge =
      (style.ellipse === '1' || style.shape === 'ellipse') && node.width <= 55 && node.height <= 55;
    const bh = toSlideH(node.height);
    const bw = isCircleStepBadge ? bh : toSlideW(node.width);
    const bx = isCircleStepBadge
      ? Number((toSlideX(node.absX + node.width / 2) - bw / 2).toFixed(3))
      : toSlideX(node.absX);
    const by = isCircleStepBadge
      ? Number((toSlideY(node.absY + node.height / 2) - bh / 2).toFixed(3))
      : toSlideY(node.absY);

    const inlineImgDataUri = extractInlineImgSrc(node.value);
    const isImageShape =
      style.shape === 'image' || Boolean(node.imageDataUrl) || Boolean(inlineImgDataUri) || node.extractedSvgs.length > 0;
    const isTextCallout = node.id.startsWith('lbl_') || style.text === '1';
    const rawFill = style.fillColor;
    const rawStroke = style.strokeColor;

    const hasFill =
      !isTextCallout &&
      rawFill !== 'none' &&
      rawFill !== 'transparent' &&
      Boolean(rawFill) &&
      !(isImageShape && !isCircleStepBadge && node.width <= 55 && node.height <= 55);
    const hasStroke =
      !isTextCallout &&
      rawStroke !== 'none' &&
      rawStroke !== 'transparent' &&
      Boolean(rawStroke) &&
      !(isImageShape && !isCircleStepBadge && node.width <= 55 && node.height <= 55);

    const fillColor = normalizeHexColor(rawFill, isDarkDiagram ? '1E293B' : 'FFFFFF');
    const strokeColor = normalizeHexColor(rawStroke, isDarkDiagram ? '475569' : 'CBD5E1');
    const strokeWidth = Math.min(2.2, Math.max(0.75, parseFloat(style.strokeWidth || '1')));
    const isDashed = style.dashed === '1';

    let shapeType = pptx.ShapeType.rect;
    if (style.ellipse === '1' || style.shape === 'ellipse') {
      shapeType = pptx.ShapeType.ellipse;
    } else if (style.shape === 'cylinder3' || style.shape === 'cylinder') {
      shapeType = pptx.ShapeType.can;
    } else if (style.shape === 'hexagon') {
      shapeType = pptx.ShapeType.hexagon;
    } else if (style.shape === 'rhombus') {
      shapeType = pptx.ShapeType.diamond;
    } else if (style.rounded === '1') {
      shapeType = pptx.ShapeType.roundRect;
    }

    const layout = extractStructuredNodeLayout(normalizeDrawioHtmlForSlides(node.value));
    const override = options?.editableOverrides?.[node.id];
    if (override) {
      if (override.title) {
        layout.headerLines = [override.title];
        if (layout.bodyLines.length > 0) {
          layout.bodyLines[0].text = override.title;
        } else {
          layout.bodyLines = [{ text: override.title, bold: true }];
        }
      }
      if (override.subtitle !== undefined) {
        if (layout.bodyLines.length > 1) {
          layout.bodyLines[1].text = override.subtitle;
        } else if (override.subtitle) {
          layout.bodyLines.push({ text: override.subtitle, bold: false });
        }
      }
    }

    const isContainer =
      parentIds.has(node.id) ||
      style.verticalAlign === 'top' ||
      (node.width >= 260 && node.height >= 160 && layout.kind === 'standard');

    // 1. Render Native Editable Vector Box / Enclave / Card Background
    if (hasFill || hasStroke) {
      slide2.addShape(shapeType, {
        x: bx,
        y: by,
        w: bw,
        h: bh,
        rectRadius: shapeType === pptx.ShapeType.roundRect ? 0.05 : undefined,
        fill: hasFill ? { color: fillColor } : undefined,
        line: hasStroke
          ? {
              color: strokeColor,
              width: strokeWidth,
              dashType: isDashed ? 'dash' : 'solid',
            }
          : { type: 'none' },
      });
    }

    // 2. Render Standalone Icon / Image (Aspect-Ratio Preserved)
    if (
      layout.kind === 'standard' &&
      (node.extractedSvgs.length > 0 ||
        (node.imageDataUrl && !node.imageDataUrl.startsWith('data:image/svg+xml')) ||
        inlineImgDataUri)
    ) {
      let iconPngDataUrl: string | null = null;
      if (inlineImgDataUri && inlineImgDataUri.startsWith('data:image/png')) {
        iconPngDataUrl = inlineImgDataUri;
      } else if (inlineImgDataUri && inlineImgDataUri.startsWith('data:image/svg+xml')) {
        iconPngDataUrl = await renderInlineSvgToPngDataUrl(inlineImgDataUri, 256, 256);
      } else if (node.extractedSvgs.length > 0) {
        iconPngDataUrl = await renderInlineSvgToPngDataUrl(node.extractedSvgs[0], 192, 192);
      } else if (node.imageDataUrl) {
        iconPngDataUrl = node.imageDataUrl;
      }

      if (iconPngDataUrl) {
        if (node.id === 'gcp_wordmark') {
          addImagePreservingAspect(slide2, iconPngDataUrl, bx, by, bw, bh);
        } else {
          const isSmallStandaloneIcon = node.width <= 75 && node.height <= 75 && layout.bodyLines.length <= 1;
          const iconSize = isSmallStandaloneIcon
            ? Math.min(bw * 0.88, bh * 0.88, 0.52)
            : Math.min(0.16, bh * 0.44, bw * 0.22);
          const iconX = isSmallStandaloneIcon ? bx + (bw - iconSize) / 2 : bx + 0.045;
          const iconY =
            isSmallStandaloneIcon || isContainer
              ? by + (isSmallStandaloneIcon ? (bh - iconSize) / 2 : 0.05)
              : by + (bh - iconSize) / 2;

          addImagePreservingAspect(
            slide2,
            iconPngDataUrl,
            Number(iconX.toFixed(3)),
            Number(iconY.toFixed(3)),
            Number(iconSize.toFixed(3)),
            Number(iconSize.toFixed(3))
          );
        }
      }
    }

    // 3. Render Circular Step Badge if embedded in HTML
    if (layout.stepBadge) {
      const badgeSize = 0.16;
      const badgeX = Number((bx + 0.04).toFixed(3));
      const badgeY = Number((by + (isContainer ? 0.04 : (bh - badgeSize) / 2)).toFixed(3));
      slide2.addShape(pptx.ShapeType.ellipse, {
        x: badgeX,
        y: badgeY,
        w: badgeSize,
        h: badgeSize,
        fill: { color: layout.stepBadge.bgHex },
      });
      slide2.addText(layout.stepBadge.num, {
        x: badgeX,
        y: badgeY,
        w: badgeSize,
        h: badgeSize,
        fontSize: 6.5,
        bold: true,
        color: 'FFFFFF',
        align: 'center',
        valign: 'middle',
        margin: 0,
        fontFace: 'Arial',
      });
    }

    // 4A. Render Multi-Row Icon List (e.g., Observability / Governance Stack)
    if (layout.kind === 'multi-row-icon-list' && layout.iconRows && layout.iconRows.length > 0) {
      const headerOffset = layout.stepBadge ? 0.24 : 0.08;
      if (layout.headerLines.length > 0) {
        const hdrColor = normalizeHexColor(
          node.htmlTitleColor || style.fontColor,
          isDarkDiagram ? 'F8FAFC' : '1E293B'
        );
        slide2.addText(layout.headerLines.join(' '), {
          x: Number((bx + headerOffset).toFixed(3)),
          y: Number((by + 0.04).toFixed(3)),
          w: Number(Math.max(0.2, bw - headerOffset - 0.06).toFixed(3)),
          h: 0.22,
          fontSize: 7.0,
          bold: true,
          color: hdrColor,
          align: 'left',
          valign: 'middle',
          margin: 0,
          fontFace: 'Arial',
        });
      }

      const listTop = by + 0.28;
      const availListH = Math.max(0.3, bh - 0.32);
      const rowH = availListH / layout.iconRows.length;

      for (let rIdx = 0; rIdx < layout.iconRows.length; rIdx++) {
        const row = layout.iconRows[rIdx];
        const ry = listTop + rIdx * rowH;
        const rIconSize = Math.min(0.2, rowH * 0.76);
        let textLeft = bx + 0.08;

        if (row.iconSvg) {
          const rPng = await renderInlineSvgToPngDataUrl(row.iconSvg, 96, 96);
          if (rPng) {
            addImagePreservingAspect(
              slide2,
              rPng,
              Number((bx + 0.07).toFixed(3)),
              Number((ry + (rowH - rIconSize) / 2).toFixed(3)),
              Number(rIconSize.toFixed(3)),
              Number(rIconSize.toFixed(3))
            );
            textLeft = bx + 0.09 + rIconSize;
          }
        }

        const rowRuns: PptxGenJS.TextProps[] = [
          {
            text: row.title,
            options: {
              bold: true,
              fontSize: 6.2,
              color: isDarkDiagram ? 'F8FAFC' : '0F172A',
              breakLine: Boolean(row.subtitle),
            },
          },
        ];
        if (row.subtitle) {
          rowRuns.push({
            text: row.subtitle,
            options: {
              bold: false,
              fontSize: 5.4,
              color: isDarkDiagram ? 'CBD5E1' : '64748B',
            },
          });
        }

        slide2.addText(rowRuns, {
          x: Number(textLeft.toFixed(3)),
          y: Number(ry.toFixed(3)),
          w: Number(Math.max(0.2, bx + bw - textLeft - 0.05).toFixed(3)),
          h: Number(rowH.toFixed(3)),
          align: 'left',
          valign: 'middle',
          margin: 0,
          fontFace: 'Arial',
        });
      }
      return;
    }

    // 4B. Render Single-Row Table Card (e.g., Official #78 Service Card with Left Icon + Title/Subtitle)
    if (layout.kind === 'table-card') {
      let leftPad = layout.stepBadge ? 0.22 : 0.04;
      let rightPad = 0.04;
      const cardIconSize = Math.min(0.22, bh * 0.64, bw * 0.24);

      if (layout.leftIconSvg) {
        const lPng = await renderInlineSvgToPngDataUrl(layout.leftIconSvg, 128, 128);
        if (lPng) {
          const ix = bx + leftPad;
          const iy = by + (bh - cardIconSize) / 2;
          addImagePreservingAspect(
            slide2,
            lPng,
            Number(ix.toFixed(3)),
            Number(iy.toFixed(3)),
            Number(cardIconSize.toFixed(3)),
            Number(cardIconSize.toFixed(3))
          );
          leftPad += cardIconSize + 0.04;
        }
      }

      if (layout.rightIconSvg) {
        const rPng = await renderInlineSvgToPngDataUrl(layout.rightIconSvg, 128, 128);
        if (rPng) {
          const ix = bx + bw - rightPad - cardIconSize;
          const iy = by + (bh - cardIconSize) / 2;
          addImagePreservingAspect(
            slide2,
            rPng,
            Number(ix.toFixed(3)),
            Number(iy.toFixed(3)),
            Number(cardIconSize.toFixed(3)),
            Number(cardIconSize.toFixed(3))
          );
          rightPad += cardIconSize + 0.04;
        }
      }

      if (layout.bodyLines.length > 0) {
        const defaultTitleHex = normalizeHexColor(
          node.htmlTitleColor || style.fontColor,
          isDarkDiagram ? 'F8FAFC' : '0F172A'
        );
        const defaultSubHex = normalizeHexColor(node.htmlSubtitleColor, isDarkDiagram ? 'CBD5E1' : '475569');

        const effectiveBodyLines =
          layout.bodyLines.length > 2
            ? [
                layout.bodyLines[0],
                {
                  text: layout.bodyLines
                    .slice(1)
                    .map((l) => l.text)
                    .join(' • '),
                  color: layout.bodyLines[1].color,
                  bold: false,
                },
              ]
            : layout.bodyLines;

        const isCompactCard = bh <= 0.38 || bw <= 1.25;
        const cardTitlePt = isCompactCard ? 5.0 : 5.8;
        const cardSubPt = isCompactCard ? 4.3 : 4.9;

        const textRuns: PptxGenJS.TextProps[] = effectiveBodyLines.map((line, idx) => ({
          text: line.text,
          options: {
            bold: idx === 0 || Boolean(line.bold),
            fontSize: idx === 0 ? cardTitlePt : cardSubPt,
            color: line.color ? normalizeHexColor(line.color, defaultTitleHex) : idx === 0 ? defaultTitleHex : defaultSubHex,
            breakLine: idx < effectiveBodyLines.length - 1,
          },
        }));

        slide2.addText(textRuns, {
          x: Number((bx + leftPad).toFixed(3)),
          y: Number((by + 0.01).toFixed(3)),
          w: Number(Math.max(0.18, bw - leftPad - rightPad).toFixed(3)),
          h: Number(Math.max(0.14, bh - 0.02).toFixed(3)),
          align: layout.textAlign || 'left',
          valign: 'middle',
          margin: 0,
          fit: 'shrink',
          lineSpacingMultiple: 0.86,
          fontFace: 'Arial',
        });
      }
      return;
    }

    // 4C. Render Standard Enclave Header, Multi-Span Inline Header, Circle Badge, or Floating Callout Text
    if (layout.inlineSpans && layout.inlineSpans.length > 0) {
      const defaultColor = normalizeHexColor(style.fontColor, isDarkDiagram ? 'F8FAFC' : '1E293B');
      const leftOffset = layout.stepBadge ? 0.22 : 0.06;
      const runs: PptxGenJS.TextProps[] = layout.inlineSpans.map((sp, idx) => ({
        text: idx < layout.inlineSpans!.length - 1 ? `${sp.text} ` : sp.text,
        options: {
          bold: Boolean(sp.bold),
          fontSize: sp.isSmall ? 5.4 : 6.4,
          color: sp.color ? normalizeHexColor(sp.color, defaultColor) : defaultColor,
        },
      }));

      slide2.addText(runs, {
        x: Number((bx + leftOffset).toFixed(3)),
        y: Number((by + 0.03).toFixed(3)),
        w: Number(Math.max(0.2, bw - leftOffset - 0.06).toFixed(3)),
        h: Number((isContainer ? Math.min(0.26, bh * 0.28) : bh - 0.04).toFixed(3)),
        align: (style.align as 'left' | 'center' | 'right') || (isContainer ? 'left' : 'center'),
        valign: isContainer ? 'top' : 'middle',
        margin: 0,
        fontFace: 'Arial',
      });
      return;
    }

    if (layout.bodyLines.length === 0) return;

    const baseColor = normalizeHexColor(
      node.htmlTitleColor || style.fontColor,
      isDarkDiagram ? 'F8FAFC' : '0F172A'
    );
    const subColor = normalizeHexColor(node.htmlSubtitleColor, isDarkDiagram ? 'CBD5E1' : '475569');

    if (isCircleStepBadge) {
      slide2.addText(layout.bodyLines[0].text, {
        x: bx,
        y: by,
        w: bw,
        h: bh,
        fontSize: 6.2,
        bold: true,
        color: baseColor,
        align: 'center',
        valign: 'middle',
        margin: 0,
        fontFace: 'Arial',
      });
      return;
    }

    const hasStandaloneIcon =
      node.extractedSvgs.length > 0 || Boolean(node.imageDataUrl) || Boolean(inlineImgDataUri);
    const isSmallIconWithCaption = hasStandaloneIcon && node.width <= 75 && node.height <= 75;
    if (isSmallIconWithCaption) {
      slide2.addText(layout.bodyLines.map((l) => l.text).join(' '), {
        x: Number((bx - 0.22).toFixed(3)),
        y: Number((by + bh - 0.02).toFixed(3)),
        w: Number((bw + 0.44).toFixed(3)),
        h: 0.16,
        fontSize: 5.2,
        bold: true,
        color: baseColor,
        align: 'center',
        valign: 'top',
        margin: 0,
        fontFace: 'Arial',
      });
      return;
    }

    const leftTextPad = layout.stepBadge ? 0.22 : hasStandaloneIcon && !isContainer ? 0.24 : 0.05;

    const isTopFullWidthContainer =
      node.id === 'enclave_top_shared' || node.id === 'enclave_mid_vpc' || (isContainer && node.width >= 950);
    const isSpokeOuterWrapper =
      node.id === 'wrapper_left_pab' ||
      node.id === 'wrapper_right_pab' ||
      node.id === 'spoke_left_pool' ||
      node.id === 'spoke_right_silo';
    const isZone1RoutingHub = node.id === 'zone_routing_hub';
    const isZone2GovHub = node.id === 'zone_gov_hub';

    let effectiveContainerLines = layout.bodyLines;
    if (isTopFullWidthContainer || isSpokeOuterWrapper) {
      effectiveContainerLines = [layout.bodyLines[0]];
    }

    let containerTitlePt = 5.4;
    let containerSubPt = 4.5;
    if (isTopFullWidthContainer) {
      containerTitlePt = 4.6;
      containerSubPt = 4.1;
    } else if (isSpokeOuterWrapper) {
      containerTitlePt = 3.85;
      containerSubPt = 3.6;
    } else if (isZone1RoutingHub) {
      containerTitlePt = 4.8;
      containerSubPt = 4.1;
    } else if (isZone2GovHub) {
      containerTitlePt = 4.6;
      containerSubPt = 4.0;
    }

    const lblTitlePt = isContainer ? containerTitlePt : bh <= 0.32 ? 5.0 : 5.6;
    const lblSubPt = isContainer ? containerSubPt : bh <= 0.32 ? 4.4 : 4.8;

    const runs: PptxGenJS.TextProps[] = effectiveContainerLines.map((line, idx) => ({
      text: line.text,
      options: {
        bold: idx === 0 || Boolean(line.bold),
        fontSize: idx === 0 ? lblTitlePt : lblSubPt,
        color: line.color ? normalizeHexColor(line.color, baseColor) : idx === 0 ? baseColor : subColor,
        breakLine: idx < effectiveContainerLines.length - 1,
      },
    }));

    // Cap top full-width container header width and spoke outer wrapper header width so they never cross vertical trunk arrows
    const headerMaxW = isTopFullWidthContainer
      ? Math.min(bw * 0.44, 2.45)
      : isSpokeOuterWrapper
        ? Math.min(bw * 0.65, 1.92)
        : Math.max(0.18, bw - leftTextPad - 0.04);

    const headerBoxH = isContainer
      ? effectiveContainerLines.length === 1
        ? 0.16
        : Math.min(0.28, bh * 0.24)
      : Math.max(0.12, bh - 0.02);

    const textAlign: 'left' | 'center' | 'right' =
      hasStandaloneIcon && !isContainer
        ? 'left'
        : (style.align as 'left' | 'center' | 'right') || (isContainer ? 'left' : 'center');

    slide2.addText(runs, {
      x: Number((bx + leftTextPad).toFixed(3)),
      y: Number((by + (isContainer ? 0.02 : 0.01)).toFixed(3)),
      w: Number(headerMaxW.toFixed(3)),
      h: Number(headerBoxH.toFixed(3)),
      align: textAlign,
      valign: isContainer ? 'top' : 'middle',
      margin: 0,
      fit: 'shrink',
      lineSpacingMultiple: 0.88,
      fontFace: 'Arial',
    });
  };

  // Separate background/zone containers from foreground cards & callout badges so connector lines NEVER cross over cards or labels
  const backgroundVertices: ParsedMxCell[] = [];
  const foregroundVertices: ParsedMxCell[] = [];
  for (const node of vertices) {
    const isBgOrZone =
      parentIds.has(node.id) ||
      node.id.startsWith('gcp_') ||
      node.id.startsWith('enclave_') ||
      node.id.startsWith('zone_') ||
      node.id.startsWith('wrapper_') ||
      node.id.startsWith('spoke_') ||
      (node.width >= 260 && node.height >= 160);
    if (isBgOrZone) {
      backgroundVertices.push(node);
    } else {
      foregroundVertices.push(node);
    }
  }

  // PASS 1: Render Background Structural Boundaries & Color-Coded Hub/Spoke Zones
  for (const node of backgroundVertices) {
    await renderVertexNode(node);
  }

  // ============================================================================
  // PASS 2: RENDER ALL CONNECTOR EDGES & FREE-FLOATING ARROWS (BEHIND FOREGROUND CARDS & STEP CIRCLES)
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

    const strokeColor = normalizeHexColor(edge.style.strokeColor, isDarkDiagram ? '60A5FA' : '5F6368');
    const isDashed = edge.style.dashed === '1';
    const strokeWidth = Math.min(1.3, Math.max(0.85, parseFloat(edge.style.strokeWidth || '1.0')));

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
          beginArrowType: isFirstSeg && hasStartArrow ? 'triangle' : undefined,
          endArrowType: isLastSeg && hasEndArrow ? 'triangle' : undefined,
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
      const lblW = Math.max(0.32, Math.min(1.45, edgeLabel.length * 0.046 + 0.08));
      const lblH = 0.14;

      slide2.addText(edgeLabel, {
        x: Number((midX - lblW / 2).toFixed(3)),
        y: Number((midY - lblH / 2).toFixed(3)),
        w: Number(lblW.toFixed(3)),
        h: lblH,
        fill: { color: isDarkDiagram ? diagramBgHex : 'FFFFFF' },
        fontSize: 5.4,
        bold: true,
        color: isDarkDiagram ? 'F8FAFC' : '202124',
        align: 'center',
        valign: 'middle',
        margin: [0, 2, 0, 2],
        fontFace: 'Arial',
      });
    }
  }

  // PASS 3: Render Foreground Service Cards, Actor Cards, Blue Step Circles (1..7) & Floating Labels ON TOP OF Connectors
  for (const node of foregroundVertices) {
    await renderVertexNode(node);
  }

  // ============================================================================
  // ASSOCIATED GOOGLE CLOUD ARCHITECTURE CENTER BLOG CONTENT SLIDES (SLIDES 2–6)
  // ============================================================================
  if (docGuide) {
    const archSec = findDocSection(docGuide, 'architecture') || docGuide.sections[0];
    const prodSec = findDocSection(docGuide, 'products_used', 'products-used');
    const useCaseSec = findDocSection(docGuide, 'use_case', 'use-case');
    const designAltSec = findDocSection(docGuide, 'design_alternatives', 'design-alternatives');
    const designConsSec = findDocSection(docGuide, 'design_considerations', 'design-considerations');
    const deploySec = findDocSection(docGuide, 'deployment');
    const whatsNextSec = findDocSection(docGuide, 'whats_next', 'whats-next');
    const contribSec = findDocSection(docGuide, 'contributors');

    // -------------------------------------------------------------------------
    // Slide 2 / 6: Blog Overview & Architecture Components Table
    // -------------------------------------------------------------------------
    const slideArch = pptx.addSlide();
    addArchCenterChrome(slideArch, '1. Architecture & Components', 'Editable Diagram + Blog • Slide 2 / 6');

    // Left Column Card 1: Executive Overview Summary
    slideArch.addShape(pptx.ShapeType.roundRect, {
      x: 0.32,
      y: 0.78,
      w: 4.85,
      h: 3.18,
      rectRadius: 0.06,
      fill: { color: 'FFFFFF' },
      line: { color: 'DADCE0', width: 1 },
    });
    slideArch.addShape(pptx.ShapeType.rect, {
      x: 0.32,
      y: 0.78,
      w: 0.08,
      h: 3.18,
      fill: { color: '1967D2' },
      line: { type: 'none' },
    });
    slideArch.addText(`Architecture Overview (${docGuide.docId})`, {
      x: 0.48,
      y: 0.86,
      w: 4.58,
      h: 0.26,
      fontSize: 9.8,
      bold: true,
      color: '174EA6',
      fontFace: 'Arial',
    });

    const overviewParas = [
      ...docGuide.overviewParagraphs.slice(0, 2).map((p) => truncateClean(p, 290)),
      ...(archSec?.leadParagraphs?.slice(0, 1).map((p) => truncateClean(p, 250)) || []),
    ];
    slideArch.addText(overviewParas.map((p) => `• ${p}`).join('\n\n'), {
      x: 0.48,
      y: 1.16,
      w: 4.58,
      h: 2.68,
      fontSize: 7.7,
      color: '3C4043',
      valign: 'top',
      fontFace: 'Arial',
      wrap: true,
    });

    // Left Column Card 2: 5-Hop Defense-in-Depth Control Plane Summary
    slideArch.addShape(pptx.ShapeType.roundRect, {
      x: 0.32,
      y: 4.10,
      w: 4.85,
      h: 3.10,
      rectRadius: 0.06,
      fill: { color: 'F8FAFC' },
      line: { color: 'CBD5E1', width: 1 },
    });
    slideArch.addShape(pptx.ShapeType.rect, {
      x: 0.32,
      y: 4.10,
      w: 0.08,
      h: 3.10,
      fill: { color: '188038' },
      line: { type: 'none' },
    });
    slideArch.addText('5-Hop Defense-in-Depth Security Invariants', {
      x: 0.48,
      y: 4.18,
      w: 4.58,
      h: 0.24,
      fontSize: 9.2,
      bold: true,
      color: '137333',
      fontFace: 'Arial',
    });
    const hopBullets = [
      'Hop 1 (Edge & Identity): Cloud Armor WAF + Workforce Identity Federation OIDC (`tenant_id`).',
      'Hop 2 (Session & Quota): Memorystore for Valkey token-bucket rate limiter & session lock.',
      'Hop 3 (Orchestration & Guardrails): Google ADK Router + Model Armor prompt/output screening.',
      'Hop 4 (Delegated Tool Auth): Cloud KMS Asymmetric JWT (`adk-agent-signing-key`) + RFC 9449 DPoP.',
      'Hop 5 (Storage & Crypto Boundary): AlloyDB PostgreSQL RLS (`SET LOCAL`) + Cloud KMS CMEK.',
    ];
    slideArch.addText(hopBullets.map((b) => `✓ ${b}`).join('\n\n'), {
      x: 0.48,
      y: 4.46,
      w: 4.58,
      h: 2.64,
      fontSize: 7.4,
      color: '1E293B',
      valign: 'top',
      fontFace: 'Arial',
      wrap: true,
    });

    // Right Column: Concise, Scannable Architecture Components Table
    const compRows: PptxGenJS.TableRow[] = [
      [
        { text: 'Architectural Zone / Subsystem', options: { bold: true, fill: { color: '174EA6' }, color: 'FFFFFF', fontSize: 8.2 } },
        { text: 'Google Cloud Services & Key Responsibilities', options: { bold: true, fill: { color: '174EA6' }, color: 'FFFFFF', fontSize: 8.2 } },
      ],
    ];

    if (archSec?.componentGroupsTable?.length) {
      archSec.componentGroupsTable.slice(0, 6).forEach((grp, idx) => {
        const rowBg = idx % 2 === 0 ? 'FFFFFF' : 'F8F9FA';
        const conciseItems = grp.items
          .slice(0, 4)
          .map((it) => `• ${it.name}: ${truncateClean(it.description, 125)}`)
          .join('\n');
        compRows.push([
          {
            text: `${grp.groupTitle}\n(${truncateClean(grp.groupLead, 70)})`,
            options: { bold: true, color: '174EA6', fill: { color: rowBg }, fontSize: 7.4 },
          },
          {
            text: conciseItems || truncateClean(grp.groupLead, 180),
            options: { color: '3C4043', fill: { color: rowBg }, fontSize: 7.1 },
          },
        ]);
      });
    }

    slideArch.addTable(compRows, {
      x: 5.32,
      y: 0.78,
      w: 7.68,
      colW: [2.15, 5.53],
      border: { type: 'solid', pt: 0.75, color: 'DADCE0' },
      fontFace: 'Arial',
      valign: 'middle',
    });

    // -------------------------------------------------------------------------
    // Slide 3 / 6: Agentic Flow (Steps 1–7, 4a–4d) & Products Used Cards
    // -------------------------------------------------------------------------
    const slideFlow = pptx.addSlide();
    addArchCenterChrome(slideFlow, '2. Agentic Flow & Products Used', 'Editable Diagram + Blog • Slide 3 / 6');

    slideFlow.addText(archSec?.agenticFlowHeading || 'Agentic Execution Flow (Steps 1–7 & Sub-steps 4a–4d)', {
      x: 0.32,
      y: 0.76,
      w: 6.75,
      h: 0.26,
      fontSize: 9.8,
      bold: true,
      color: '174EA6',
      fontFace: 'Arial',
    });

    const flowSteps = (archSec?.agenticFlowSteps || []).slice(0, 7);
    const stepCardStartY = 1.06;
    const stepAvailH = 6.14;
    const stepGap = 0.06;
    const stepCardH = Number(
      ((stepAvailH - Math.max(0, flowSteps.length - 1) * stepGap) / Math.max(1, flowSteps.length)).toFixed(3)
    );

    flowSteps.forEach((st, idx) => {
      const sy = Number((stepCardStartY + idx * (stepCardH + stepGap)).toFixed(3));
      const isStep4 = idx === 3 || (st.subSteps && st.subSteps.length > 0);
      slideFlow.addShape(pptx.ShapeType.roundRect, {
        x: 0.32,
        y: sy,
        w: 6.75,
        h: stepCardH,
        rectRadius: 0.05,
        fill: { color: isStep4 ? 'FEF7E0' : 'FFFFFF' },
        line: { color: isStep4 ? 'F9AB00' : 'DADCE0', width: 0.9 },
      });
      const badgeD = 0.24;
      slideFlow.addShape(pptx.ShapeType.ellipse, {
        x: 0.42,
        y: Number((sy + (stepCardH - badgeD) / 2).toFixed(3)),
        w: badgeD,
        h: badgeD,
        fill: { color: isStep4 ? 'B06000' : '1967D2' },
        line: { type: 'none' },
      });
      slideFlow.addText(String(idx + 1), {
        x: 0.42,
        y: Number((sy + (stepCardH - badgeD) / 2).toFixed(3)),
        w: badgeD,
        h: badgeD,
        fontSize: 7.4,
        bold: true,
        color: 'FFFFFF',
        align: 'center',
        valign: 'middle',
        margin: 0,
        fontFace: 'Arial',
      });

      const stepMain = truncateClean(st.step, isStep4 ? 135 : 195);
      const subSummary =
        st.subSteps && st.subSteps.length > 0
          ? '\n' +
            st.subSteps
              .slice(0, 4)
              .map((sub, sIdx) => `${idx + 1}${String.fromCharCode(97 + sIdx)}: ${truncateClean(sub, 72)}`)
              .join(' • ')
          : '';

      slideFlow.addText(`${stepMain}${subSummary}`, {
        x: 0.74,
        y: Number((sy + 0.03).toFixed(3)),
        w: 6.24,
        h: Number((stepCardH - 0.06).toFixed(3)),
        fontSize: isStep4 ? 6.6 : 7.1,
        color: '202124',
        valign: 'middle',
        fontFace: 'Arial',
        wrap: true,
      });
    });

    // Right Column: Products Used Cards (Google Cloud)
    slideFlow.addText('Google Cloud Products Used', {
      x: 7.25,
      y: 0.76,
      w: 5.75,
      h: 0.26,
      fontSize: 9.8,
      bold: true,
      color: '137333',
      fontFace: 'Arial',
    });

    const prodItems = (prodSec?.productsUsedItems || []).slice(0, 8);
    const prodStartY = 1.06;
    const prodAvailH = 6.14;
    const prodGap = 0.06;
    const prodCardH = Number(
      ((prodAvailH - Math.max(0, prodItems.length - 1) * prodGap) / Math.max(1, prodItems.length)).toFixed(3)
    );

    prodItems.forEach((prod, idx) => {
      const py = Number((prodStartY + idx * (prodCardH + prodGap)).toFixed(3));
      slideFlow.addShape(pptx.ShapeType.roundRect, {
        x: 7.25,
        y: py,
        w: 5.75,
        h: prodCardH,
        rectRadius: 0.05,
        fill: { color: idx % 2 === 0 ? 'FFFFFF' : 'F8FAFC' },
        line: { color: 'DADCE0', width: 0.85 },
      });
      slideFlow.addShape(pptx.ShapeType.rect, {
        x: 7.25,
        y: py,
        w: 0.07,
        h: prodCardH,
        fill: { color: '188038' },
        line: { type: 'none' },
      });
      slideFlow.addText(
        [
          { text: `${prod.name}: `, options: { bold: true, color: '137333', fontSize: 7.4 } },
          { text: truncateClean(prod.description, 145), options: { bold: false, color: '3C4043', fontSize: 7.1 } },
        ],
        {
          x: 7.40,
          y: Number((py + 0.03).toFixed(3)),
          w: 5.50,
          h: Number((prodCardH - 0.06).toFixed(3)),
          valign: 'middle',
          fontFace: 'Arial',
          wrap: true,
        }
      );
    });

    // -------------------------------------------------------------------------
    // Slide 4 / 6: Use Case, Key Benefits Cards & Design Alternatives Cards
    // -------------------------------------------------------------------------
    const slideUseCase = pptx.addSlide();
    addArchCenterChrome(slideUseCase, '3. Use Case & Design Alternatives', 'Editable Diagram + Blog • Slide 4 / 6');

    // Left Column Header Banner (Use Case)
    slideUseCase.addShape(pptx.ShapeType.roundRect, {
      x: 0.32,
      y: 0.78,
      w: 6.24,
      h: 0.38,
      rectRadius: 0.05,
      fill: { color: 'E6F4EA' },
      line: { color: '188038', width: 0.9 },
    });
    slideUseCase.addText(
      `Use Case: ${truncateClean(useCaseSec?.useCaseSubHeading || docGuide.subtitle, 68)}`,
      {
        x: 0.44,
        y: 0.82,
        w: 6.00,
        h: 0.30,
        fontSize: 8.8,
        bold: true,
        color: '137333',
        valign: 'middle',
        fontFace: 'Arial',
      }
    );

    // Use Case Lead Summary Card
    const rawUseCaseLead = (useCaseSec?.leadParagraphs || [])
      .join(' ')
      .replace(/^This section describes a business use case[^.]*\.\s*(?:Second,\s*)?/i, '');
    const useCaseLeadSummary = truncateClean(
      rawUseCaseLead ? rawUseCaseLead.charAt(0).toUpperCase() + rawUseCaseLead.slice(1) : docGuide.subtitle,
      340
    );
    slideUseCase.addShape(pptx.ShapeType.roundRect, {
      x: 0.32,
      y: 1.24,
      w: 6.24,
      h: 1.38,
      rectRadius: 0.05,
      fill: { color: 'FFFFFF' },
      line: { color: 'DADCE0', width: 0.9 },
    });
    slideUseCase.addText(useCaseLeadSummary, {
      x: 0.44,
      y: 1.30,
      w: 6.00,
      h: 1.26,
      fontSize: 7.5,
      color: '3C4043',
      valign: 'middle',
      fontFace: 'Arial',
      wrap: true,
    });

    // 4 Individual Key Architecture Benefit Cards
    const benefits = (useCaseSec?.useCaseBenefits || []).slice(0, 4);
    const benStartY = 2.72;
    const benAvailH = 4.48;
    const benGap = 0.08;
    const benCardH = Number(
      ((benAvailH - Math.max(0, benefits.length - 1) * benGap) / Math.max(1, benefits.length)).toFixed(3)
    );

    benefits.forEach((b, idx) => {
      const byCard = Number((benStartY + idx * (benCardH + benGap)).toFixed(3));
      slideUseCase.addShape(pptx.ShapeType.roundRect, {
        x: 0.32,
        y: byCard,
        w: 6.24,
        h: benCardH,
        rectRadius: 0.05,
        fill: { color: idx % 2 === 0 ? 'F8FAFC' : 'FFFFFF' },
        line: { color: 'CBD5E1', width: 0.85 },
      });
      slideUseCase.addShape(pptx.ShapeType.rect, {
        x: 0.32,
        y: byCard,
        w: 0.07,
        h: benCardH,
        fill: { color: '188038' },
        line: { type: 'none' },
      });
      slideUseCase.addText(
        [
          { text: `✓ ${b.title}\n`, options: { bold: true, color: '137333', fontSize: 7.8 } },
          { text: truncateClean(b.detail, 195), options: { bold: false, color: '3C4043', fontSize: 7.1 } },
        ],
        {
          x: 0.48,
          y: Number((byCard + 0.04).toFixed(3)),
          w: 5.96,
          h: Number((benCardH - 0.08).toFixed(3)),
          valign: 'middle',
          fontFace: 'Arial',
          wrap: true,
        }
      );
    });

    // Right Column Header Banner (Design Alternatives)
    slideUseCase.addShape(pptx.ShapeType.roundRect, {
      x: 6.76,
      y: 0.78,
      w: 6.24,
      h: 0.38,
      rectRadius: 0.05,
      fill: { color: 'FEF7E0' },
      line: { color: 'F9AB00', width: 0.9 },
    });
    slideUseCase.addText('Design Alternatives (Networking, Compute & MCP Tooling)', {
      x: 6.88,
      y: 0.82,
      w: 6.00,
      h: 0.30,
      fontSize: 8.8,
      bold: true,
      color: 'B06000',
      valign: 'middle',
      fontFace: 'Arial',
    });

    const alts = (designAltSec?.designAlternativesSubSections || []).slice(0, 3);
    const altStartY = 1.24;
    const altAvailH = 5.96;
    const altGap = 0.10;
    const altCardH = Number(
      ((altAvailH - Math.max(0, alts.length - 1) * altGap) / Math.max(1, alts.length)).toFixed(3)
    );

    alts.forEach((alt, idx) => {
      const ayCard = Number((altStartY + idx * (altCardH + altGap)).toFixed(3));
      slideUseCase.addShape(pptx.ShapeType.roundRect, {
        x: 6.76,
        y: ayCard,
        w: 6.24,
        h: altCardH,
        rectRadius: 0.05,
        fill: { color: 'FFFFFF' },
        line: { color: 'DADCE0', width: 0.9 },
      });
      slideUseCase.addShape(pptx.ShapeType.rect, {
        x: 6.76,
        y: ayCard,
        w: 0.07,
        h: altCardH,
        fill: { color: 'F9AB00' },
        line: { type: 'none' },
      });
      const leadSummary = truncateClean((alt.leadParagraphs || [])[0] || '', 155);
      const subBullets = (alt.subBlocks || [])
        .slice(0, 2)
        .map((sb) => {
          const firstPara = (sb.paragraphs || [])[0];
          if (firstPara) return `• ${sb.subHeading}: ${truncateClean(firstPara, 115)}`;
          const bulletSummary = (sb.bullets || [])
            .slice(0, 2)
            .map((b) => `${b.label} (${truncateClean(b.detail.split('.')[0] || '', 55)})`)
            .join('; ');
          return `• ${sb.subHeading}: ${truncateClean(bulletSummary, 115)}`;
        })
        .join('\n');

      slideUseCase.addText(
        [
          { text: `${alt.heading}\n`, options: { bold: true, color: 'B06000', fontSize: 8.0 } },
          { text: `${leadSummary}${subBullets ? '\n' + subBullets : ''}`, options: { bold: false, color: '3C4043', fontSize: 7.0 } },
        ],
        {
          x: 6.92,
          y: Number((ayCard + 0.05).toFixed(3)),
          w: 5.96,
          h: Number((altCardH - 0.10).toFixed(3)),
          valign: 'middle',
          fontFace: 'Arial',
          wrap: true,
        }
      );
    });

    // -------------------------------------------------------------------------
    // Slide 5 / 6: Design Considerations (Google Cloud Well-Architected Framework)
    // -------------------------------------------------------------------------
    const slideConsiderations = pptx.addSlide();
    addArchCenterChrome(
      slideConsiderations,
      '4. Design Considerations (Well-Architected Framework)',
      'Editable Diagram + Blog • Slide 5 / 6'
    );

    const waRows: PptxGenJS.TableRow[] = [
      [
        { text: 'Well-Architected Pillar', options: { bold: true, fill: { color: '174EA6' }, color: 'FFFFFF', fontSize: 8.4 } },
        { text: 'Google Cloud Components', options: { bold: true, fill: { color: '174EA6' }, color: 'FFFFFF', fontSize: 8.4 } },
        { text: 'Design Considerations & Actionable Recommendations', options: { bold: true, fill: { color: '174EA6' }, color: 'FFFFFF', fontSize: 8.4 } },
      ],
    ];

    const pillarColors = ['174EA6', '137333', 'B06000', 'C5221F'];
    (designConsSec?.designConsiderationsSubSections || []).forEach((dc, pIdx) => {
      const rowBg = pIdx % 2 === 0 ? 'FFFFFF' : 'F8F9FA';
      const comps = dc.rows.map((r) => r.component).join(' • ');
      const recs = dc.rows
        .flatMap((r) => r.recommendations.slice(0, 1).map((rec) => `• ${truncateClean(rec, 145)}`))
        .slice(0, 3)
        .join('\n');
      waRows.push([
        {
          text: dc.heading,
          options: { bold: true, color: pillarColors[pIdx % pillarColors.length], fill: { color: rowBg }, fontSize: 7.8 },
        },
        { text: comps, options: { bold: true, color: '202124', fill: { color: rowBg }, fontSize: 7.4 } },
        { text: recs, options: { color: '3C4043', fill: { color: rowBg }, fontSize: 7.1 } },
      ]);
    });

    slideConsiderations.addTable(waRows, {
      x: 0.32,
      y: 0.78,
      w: 12.68,
      colW: [2.25, 2.55, 7.88],
      border: { type: 'solid', pt: 0.75, color: 'DADCE0' },
      fontFace: 'Arial',
      valign: 'middle',
    });

    // Bottom 3-Card Well-Architected Quantitative Proof Strip (eliminates empty bottom whitespace)
    const waCards = [
      {
        title: 'Security, Privacy & Compliance Proof',
        body: 'Enforces Hop 1–5 cryptographic defense-in-depth: RFC 8693 OBO + RFC 9449 DPoP, Model Armor prompt/output screening, AlloyDB PostgreSQL RLS (`SET LOCAL app.current_tenant_id`), and <60s Cloud KMS CMEK kill-switches.',
        badge: '10/10 Red-Team Attacks Blocked • 6/6 CMEK Gates PASS',
        bar: '1967D2',
        tint: 'E8F0FE',
        text: '174EA6',
      },
      {
        title: 'Reliability & Noisy-Neighbor Isolation',
        body: 'Eliminates cross-tenant starvation via Memorystore for Valkey per-tenant token-bucket bulkheads (120 vs. 600 RPM), bounded Gemini 2.5 Pro thinking budgets (4k/8k), and zero-downtime live Pattern C PSC migration.',
        badge: '0 Dropped Sessions • 4/4 Live Migration Gates PASS',
        bar: '188038',
        tint: 'E6F4EA',
        text: '137333',
      },
      {
        title: 'Cost Optimization & FinOps Attribution',
        body: 'Shares an immutable system prompt prefix across pooled tenants via Gemini 2.5 Pro `ContextCacheConfig` (90% input token discount) and streams zero-PII OpenTelemetry token spans directly to BigQuery chargeback.',
        badge: '84.7% Net Token Savings • $42/mo Pattern A Unit TCO',
        bar: 'F9AB00',
        tint: 'FEF7E0',
        text: 'B06000',
      },
    ];
    const waCardW = Number(((12.68 - 0.36) / 3).toFixed(3));
    waCards.forEach((wc, idx) => {
      const wx = Number((0.32 + idx * (waCardW + 0.18)).toFixed(3));
      const wy = 5.42;
      const wh = 1.78;
      slideConsiderations.addShape(pptx.ShapeType.roundRect, {
        x: wx,
        y: wy,
        w: waCardW,
        h: wh,
        rectRadius: 0.06,
        fill: { color: 'FFFFFF' },
        line: { color: 'DADCE0', width: 1 },
      });
      slideConsiderations.addShape(pptx.ShapeType.rect, {
        x: wx,
        y: wy,
        w: waCardW,
        h: 0.06,
        fill: { color: wc.bar },
        line: { type: 'none' },
      });
      slideConsiderations.addText(wc.title, {
        x: Number((wx + 0.14).toFixed(3)),
        y: Number((wy + 0.1).toFixed(3)),
        w: Number((waCardW - 0.28).toFixed(3)),
        h: 0.26,
        fontSize: 8.8,
        bold: true,
        color: wc.text,
        fontFace: 'Arial',
      });
      slideConsiderations.addText(wc.body, {
        x: Number((wx + 0.14).toFixed(3)),
        y: Number((wy + 0.38).toFixed(3)),
        w: Number((waCardW - 0.28).toFixed(3)),
        h: 1.02,
        fontSize: 7.3,
        color: '3C4043',
        valign: 'top',
        fontFace: 'Arial',
        wrap: true,
      });
      slideConsiderations.addShape(pptx.ShapeType.roundRect, {
        x: Number((wx + 0.14).toFixed(3)),
        y: Number((wy + wh - 0.3).toFixed(3)),
        w: Number((waCardW - 0.28).toFixed(3)),
        h: 0.22,
        rectRadius: 0.04,
        fill: { color: wc.tint },
        line: { type: 'none' },
      });
      slideConsiderations.addText(wc.badge, {
        x: Number((wx + 0.18).toFixed(3)),
        y: Number((wy + wh - 0.3).toFixed(3)),
        w: Number((waCardW - 0.36).toFixed(3)),
        h: 0.22,
        fontSize: 6.8,
        bold: true,
        color: wc.text,
        align: 'center',
        valign: 'middle',
        fontFace: 'Arial',
      });
    });

    // -------------------------------------------------------------------------
    // Slide 6 / 6: Deployment Runbook (Arial), Implementation Code (Monospace), What's Next & Contributors
    // -------------------------------------------------------------------------
    const slideDeploy = pptx.addSlide();
    addArchCenterChrome(
      slideDeploy,
      "5. Deployment, What's Next & Contributors",
      'Editable Diagram + Blog • Slide 6 / 6'
    );

    // Left Top Card: Deployment Runbook & Prerequisites (Clean Arial Typography)
    slideDeploy.addShape(pptx.ShapeType.roundRect, {
      x: 0.32,
      y: 0.78,
      w: 7.48,
      h: 2.24,
      rectRadius: 0.06,
      fill: { color: 'FFFFFF' },
      line: { color: 'DADCE0', width: 1 },
    });
    slideDeploy.addShape(pptx.ShapeType.rect, {
      x: 0.32,
      y: 0.78,
      w: 0.08,
      h: 2.24,
      fill: { color: '1967D2' },
      line: { type: 'none' },
    });
    slideDeploy.addText('Deployment Runbook & Live Cloud Verification', {
      x: 0.48,
      y: 0.86,
      w: 7.16,
      h: 0.26,
      fontSize: 9.6,
      bold: true,
      color: '174EA6',
      fontFace: 'Arial',
    });

    const deployParas = (deploySec?.leadParagraphs || [])
      .slice(0, 2)
      .map((p) => `• ${truncateClean(p, 290)}`)
      .join('\n\n');
    slideDeploy.addText(deployParas, {
      x: 0.48,
      y: 1.16,
      w: 7.16,
      h: 1.78,
      fontSize: 7.5,
      color: '3C4043',
      valign: 'top',
      fontFace: 'Arial',
      wrap: true,
    });

    // Left Bottom Card: Implementation Code Block (Dedicated Light-Slate Code Box in Courier New)
    slideDeploy.addShape(pptx.ShapeType.roundRect, {
      x: 0.32,
      y: 3.14,
      w: 7.48,
      h: 4.06,
      rectRadius: 0.06,
      fill: { color: 'F1F5F9' },
      line: { color: '94A3B8', width: 1 },
    });
    slideDeploy.addShape(pptx.ShapeType.rect, {
      x: 0.32,
      y: 3.14,
      w: 7.48,
      h: 0.32,
      fill: { color: 'E2E8F0' },
      line: { color: '94A3B8', width: 0.75 },
    });
    slideDeploy.addText(
      `Implementation Snippet: ${deploySec?.codeSnippet?.filename || 'cloud_run_adk_verify.py'}`,
      {
        x: 0.46,
        y: 3.18,
        w: 7.20,
        h: 0.24,
        fontSize: 8.0,
        bold: true,
        color: '0F172A',
        fontFace: 'Arial',
      }
    );

    const codeLines = (deploySec?.codeSnippet?.code || '')
      .split('\n')
      .filter((line) => line.trim().length > 0)
      .slice(0, 17)
      .map((line) => (line.length > 88 ? `${line.slice(0, 85)}...` : line))
      .join('\n');

    slideDeploy.addText(codeLines, {
      x: 0.46,
      y: 3.52,
      w: 7.20,
      h: 3.58,
      fontSize: 6.6,
      color: '0F172A',
      valign: 'top',
      fontFace: 'Courier New',
      wrap: true,
    });

    // Right Column Top: What's Next Reference Cards
    slideDeploy.addShape(pptx.ShapeType.roundRect, {
      x: 7.96,
      y: 0.78,
      w: 5.04,
      h: 4.18,
      rectRadius: 0.06,
      fill: { color: 'FFFFFF' },
      line: { color: 'DADCE0', width: 1 },
    });
    slideDeploy.addShape(pptx.ShapeType.rect, {
      x: 7.96,
      y: 0.78,
      w: 0.08,
      h: 4.18,
      fill: { color: '188038' },
      line: { type: 'none' },
    });
    slideDeploy.addText("What's Next (Architecture Center References)", {
      x: 8.12,
      y: 0.86,
      w: 4.74,
      h: 0.26,
      fontSize: 9.4,
      bold: true,
      color: '137333',
      fontFace: 'Arial',
    });

    const nextLinks = (whatsNextSec?.whatsNextLinks || []).slice(0, 5);
    const nextStartY = 1.18;
    const nextAvailH = 3.68;
    const nextGap = 0.06;
    const nextCardH = Number(
      ((nextAvailH - Math.max(0, nextLinks.length - 1) * nextGap) / Math.max(1, nextLinks.length)).toFixed(3)
    );

    nextLinks.forEach((wItem, idx) => {
      const ny = Number((nextStartY + idx * (nextCardH + nextGap)).toFixed(3));
      slideDeploy.addShape(pptx.ShapeType.roundRect, {
        x: 8.12,
        y: ny,
        w: 4.74,
        h: nextCardH,
        rectRadius: 0.04,
        fill: { color: idx % 2 === 0 ? 'F8FAFC' : 'FFFFFF' },
        line: { color: 'E2E8F0', width: 0.75 },
      });
      slideDeploy.addText(
        [
          { text: `→ ${wItem.label}\n`, options: { bold: true, color: '174EA6', fontSize: 7.2 } },
          { text: truncateClean(wItem.description, 115), options: { bold: false, color: '3C4043', fontSize: 6.7 } },
        ],
        {
          x: 8.22,
          y: Number((ny + 0.02).toFixed(3)),
          w: 4.54,
          h: Number((nextCardH - 0.04).toFixed(3)),
          valign: 'middle',
          fontFace: 'Arial',
          wrap: true,
        }
      );
    });

    // Right Column Bottom: Contributors & Verification Provenance Card
    slideDeploy.addShape(pptx.ShapeType.roundRect, {
      x: 7.96,
      y: 5.08,
      w: 5.04,
      h: 2.12,
      rectRadius: 0.06,
      fill: { color: 'F8FAFC' },
      line: { color: 'CBD5E1', width: 1 },
    });
    slideDeploy.addShape(pptx.ShapeType.rect, {
      x: 7.96,
      y: 5.08,
      w: 0.08,
      h: 2.12,
      fill: { color: '174EA6' },
      line: { type: 'none' },
    });
    slideDeploy.addText('Contributors & Verification Provenance', {
      x: 8.12,
      y: 5.16,
      w: 4.74,
      h: 0.24,
      fontSize: 9.0,
      bold: true,
      color: '174EA6',
      fontFace: 'Arial',
    });

    const authorsList = (contribSec?.contributorsInfo?.authors || docGuide.authors)
      .slice(0, 2)
      .map((a) => `• ${a}`)
      .join('\n');
    const contribList = (contribSec?.contributorsInfo?.otherContributors || [])
      .slice(0, 2)
      .map((c) => `• ${c}`)
      .join('\n');

    slideDeploy.addText(
      `Authors:\n${authorsList}\n\nContributors:\n${contribList}\n\nLast Verified: ${docGuide.lastVerifiedDate} • GCP: nitina-ggarwal-sandbox-647724`,
      {
        x: 8.12,
        y: 5.44,
        w: 4.74,
        h: 1.68,
        fontSize: 7.0,
        color: '334155',
        valign: 'top',
        fontFace: 'Arial',
        wrap: true,
      }
    );
  }

  const rawB64 = (await pptx.write({ outputType: 'base64' })) as string;
  const cleanB64 = await postProcessPptxCompactArrowsBase64(rawB64);

  if (options?.returnBase64) {
    return cleanB64;
  }

  if (options?.returnBlob) {
    if (typeof Buffer !== 'undefined') {
      const buf = Buffer.from(cleanB64, 'base64');
      return new Blob([buf], {
        type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      });
    }
    const binaryStr = atob(cleanB64);
    const bytes = new Uint8Array(binaryStr.length);
    for (let i = 0; i < binaryStr.length; i++) {
      bytes[i] = binaryStr.charCodeAt(i);
    }
    return new Blob([bytes], {
      type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    });
  }

  if (typeof Buffer !== 'undefined' && typeof window === 'undefined') {
    const fs = await import('fs');
    const safeName = diagramName.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
    fs.writeFileSync(`${safeName || 'architecture'}_editable_slides.pptx`, Buffer.from(cleanB64, 'base64'));
    return;
  }

  const safeName = diagramName.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
  await pptx.writeFile({ fileName: `${safeName || 'architecture'}_editable_slides.pptx` });
}


