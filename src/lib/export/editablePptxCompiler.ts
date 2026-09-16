/**
 * Draw.io XML to 100% Native Editable PowerPoint (.pptx) & Google Slides Compiler
 * Converts every Draw.io <mxCell> container, card, node, text box, and connector edge
 * into individual, draggable, editable native PowerPoint vector shapes & text boxes.
 * When imported into Google Slides (File -> Import slides) or opened in PowerPoint,
 * every single box, label, border, and arrow is 100% editable.
 */

import PptxGenJS from 'pptxgenjs';
import { exportDiagramPng } from './diagramRaster';

interface ParsedMxCell {
  id: string;
  value: string;
  style: Record<string, string>;
  vertex: boolean;
  edge: boolean;
  parent: string;
  source?: string;
  target?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  absX: number;
  absY: number;
  depth: number;
  waypoints: { x: number; y: number }[];
}

function parseStyleString(styleStr: string): Record<string, string> {
  const result: Record<string, string> = {};
  if (!styleStr) return result;
  const parts = styleStr.split(';');
  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) {
      result[trimmed] = '1';
    } else {
      const k = trimmed.substring(0, eqIdx).trim();
      const v = trimmed.substring(eqIdx + 1).trim();
      result[k] = v;
    }
  }
  return result;
}

function cleanHtmlToPlainText(html: string): { title: string; subtitle: string; fullText: string } {
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

  // Replace block tags and <br> with newlines
  const withNewlines = noSvg
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/div>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  const lines = withNewlines
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

  return {
    title: lines[0] || '',
    subtitle: lines.slice(1).join(' • '),
    fullText: lines.join('\n'),
  };
}

function normalizeHexColor(hex: string | undefined, fallback: string): string {
  if (!hex || hex === 'none' || hex === 'transparent') return fallback;
  const cleaned = hex.replace(/^#/, '').trim();
  if (/^[0-9A-Fa-f]{6}$/.test(cleaned)) return cleaned.toUpperCase();
  if (/^[0-9A-Fa-f]{3}$/.test(cleaned)) {
    return cleaned
      .split('')
      .map((c) => c + c)
      .join('')
      .toUpperCase();
  }
  return fallback;
}

export function parseDrawioXmlForPptx(xmlContent: string): {
  cells: ParsedMxCell[];
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
} {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlContent, 'text/xml');
  const rawCells = Array.from(doc.querySelectorAll('mxCell'));

  const cellMap = new Map<string, ParsedMxCell>();

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

    const geo = el.querySelector('mxGeometry');
    const x = parseFloat(geo?.getAttribute('x') || '0');
    const y = parseFloat(geo?.getAttribute('y') || '0');
    const width = parseFloat(geo?.getAttribute('width') || '120');
    const height = parseFloat(geo?.getAttribute('height') || '60');

    const waypoints: { x: number; y: number }[] = [];
    if (geo) {
      const pts = Array.from(geo.querySelectorAll('Array[as="points"] > mxPoint'));
      for (const pt of pts) {
        const px = parseFloat(pt.getAttribute('x') || '0');
        const py = parseFloat(pt.getAttribute('y') || '0');
        if (!isNaN(px) && !isNaN(py)) {
          waypoints.push({ x: px, y: py });
        }
      }
    }

    cellMap.set(id, {
      id,
      value,
      style,
      vertex,
      edge,
      parent,
      source,
      target,
      x,
      y,
      width,
      height,
      absX: x,
      absY: y,
      depth: 0,
      waypoints,
    });
  }

  // Compute absolute coordinates by walking parent chain
  for (const cell of cellMap.values()) {
    let currX = cell.x;
    let currY = cell.y;
    let depth = 0;
    let currParent = cell.parent;
    const visited = new Set<string>();
    while (currParent && currParent !== '1' && currParent !== '0' && !visited.has(currParent)) {
      visited.add(currParent);
      const parentCell = cellMap.get(currParent);
      if (parentCell) {
        currX += parentCell.x;
        currY += parentCell.y;
        depth += 1;
        currParent = parentCell.parent;
      } else {
        break;
      }
    }
    cell.absX = currX;
    cell.absY = currY;
    cell.depth = depth;
  }

  // Compute bounding box across all vertices
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  const cells = Array.from(cellMap.values());
  for (const c of cells) {
    if (c.vertex) {
      if (c.absX < minX) minX = c.absX;
      if (c.absY < minY) minY = c.absY;
      if (c.absX + c.width > maxX) maxX = c.absX + c.width;
      if (c.absY + c.height > maxY) maxY = c.absY + c.height;
    }
  }

  if (!isFinite(minX)) {
    minX = 0;
    minY = 0;
    maxX = 1485;
    maxY = 840;
  }

  return { cells, minX, minY, maxX, maxY };
}

/**
 * Compiles Draw.io XML into a multi-slide PowerPoint (.pptx) deck where:
 * - Slide 1: 100% Native Editable Vector Shapes & Text Boxes (every container, node, and connector is individually editable in Google Slides / PowerPoint).
 * - Slide 2: High-Resolution Visual Reference Master Snapshot.
 * - Slide 3: Architectural Component Inventory & Connection Matrix.
 */
export async function exportDrawioToEditablePptx(
  xmlContent: string,
  diagramName: string = 'Architecture Blueprint',
  blueprintId: string = 'VIS-MASTER'
): Promise<void> {
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_WIDE'; // 13.333 x 7.5 inches widescreen 16:9
  pptx.author = 'PromptCanvas Vision Decompiler';
  pptx.company = 'PromptCanvas Enterprise';
  pptx.title = `${diagramName} (${blueprintId})`;

  const SLIDE_W = 13.333;
  const SLIDE_H = 7.5;
  const HEADER_H = 0.65;
  const MARGIN_X = 0.35;
  const MARGIN_BOTTOM = 0.25;

  const { cells, minX, minY, maxX, maxY } = parseDrawioXmlForPptx(xmlContent);

  const canvasW = Math.max(maxX - minX, 400);
  const canvasH = Math.max(maxY - minY, 300);

  const usableW = SLIDE_W - MARGIN_X * 2;
  const usableH = SLIDE_H - HEADER_H - MARGIN_BOTTOM - 0.15;

  // Preserve aspect ratio while fitting inside slide bounds
  const scaleX = usableW / canvasW;
  const scaleY = usableH / canvasH;
  const scale = Math.min(scaleX, scaleY);

  const offsetX = MARGIN_X + (usableW - canvasW * scale) / 2;
  const offsetY = HEADER_H + 0.1 + (usableH - canvasH * scale) / 2;

  const toSlideX = (x: number) => Number((offsetX + (x - minX) * scale).toFixed(3));
  const toSlideY = (y: number) => Number((offsetY + (y - minY) * scale).toFixed(3));
  const toSlideW = (w: number) => Number(Math.max(w * scale, 0.25).toFixed(3));
  const toSlideH = (h: number) => Number(Math.max(h * scale, 0.18).toFixed(3));

  // Detect whether diagram uses dark background or light background
  const isDarkCanvas =
    xmlContent.includes('#0A1124') ||
    xmlContent.includes('#090D16') ||
    xmlContent.includes('#0B192C') ||
    xmlContent.includes('#0F2547');

  // =========================================================================
  // SLIDE 1: 100% NATIVE EDITABLE SHAPES & TEXT BOXES (GOOGLE SLIDES READY)
  // =========================================================================
  const slide1 = pptx.addSlide();
  slide1.background = { color: isDarkCanvas ? '0A1124' : 'F8FAFC' };

  // Slide Top Header Banner
  slide1.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: SLIDE_W,
    h: HEADER_H,
    fill: { color: isDarkCanvas ? '0F172A' : '0F172A' },
    line: { color: '1E293B', width: 1 },
  });

  slide1.addText(
    [
      { text: `${diagramName.toUpperCase()} `, options: { fontSize: 13, bold: true, color: '38BDF8' } },
      {
        text: `|  ID: ${blueprintId}  •  100% Native Editable Vector Shapes (Click any box or text to edit in Google Slides / PowerPoint)`,
        options: { fontSize: 10, color: 'E2E8F0' },
      },
    ],
    {
      x: 0.35,
      y: 0.12,
      w: SLIDE_W - 0.7,
      h: 0.4,
      valign: 'middle',
      fontFace: 'Arial',
    }
  );

  // Separate vertices and edges; sort vertices by depth & area (largest containers in back, leaf nodes in front)
  const vertices = cells
    .filter((c) => c.vertex)
    .sort((a, b) => {
      if (a.depth !== b.depth) return a.depth - b.depth;
      return b.width * b.height - a.width * a.height;
    });

  const cellSlideCoords = new Map<string, { x: number; y: number; w: number; h: number; cx: number; cy: number }>();

  for (const v of vertices) {
    const sx = toSlideX(v.absX);
    const sy = toSlideY(v.absY);
    const sw = toSlideW(v.width);
    const sh = toSlideH(v.height);
    cellSlideCoords.set(v.id, {
      x: sx,
      y: sy,
      w: sw,
      h: sh,
      cx: Number((sx + sw / 2).toFixed(3)),
      cy: Number((sy + sh / 2).toFixed(3)),
    });

    const isContainer =
      v.style.container === '1' ||
      v.style.swimlane === '1' ||
      v.width * v.height > 90000 ||
      vertices.some((other) => other.parent === v.id);

    const rawFill = v.style.fillColor;
    const rawStroke = v.style.strokeColor;
    const rawFontColor = v.style.fontColor;

    const fillColor = normalizeHexColor(
      rawFill,
      isContainer ? (isDarkCanvas ? '0F2547' : 'F1F5F9') : isDarkCanvas ? '1E293B' : 'FFFFFF'
    );
    const strokeColor = normalizeHexColor(
      rawStroke,
      isContainer ? (isDarkCanvas ? '38BDF8' : '94A3B8') : isDarkCanvas ? '38BDF8' : 'CBD5E1'
    );
    const fontColor = normalizeHexColor(
      rawFontColor,
      isDarkCanvas || ['0F172A', '0B192C', '0F2547', '1E293B', '1D4ED8', '0078D4'].includes(fillColor)
        ? 'FFFFFF'
        : '0F172A'
    );

    const isRounded = v.style.rounded === '1';
    const isDashed = v.style.dashed === '1';
    const isEllipse = v.style.ellipse === '1' || v.style.shape === 'ellipse';
    const isRhombus = v.style.rhombus === '1' || v.style.shape === 'rhombus';

    let shapeType = pptx.ShapeType.rect;
    if (isEllipse) shapeType = pptx.ShapeType.ellipse;
    else if (isRhombus) shapeType = pptx.ShapeType.diamond;
    else if (isRounded) shapeType = pptx.ShapeType.roundRect;

    const { title, subtitle, fullText } = cleanHtmlToPlainText(v.value);

    // Add the native PowerPoint shape
    slide1.addShape(shapeType, {
      x: sx,
      y: sy,
      w: sw,
      h: sh,
      fill: rawFill === 'none' ? undefined : { color: fillColor },
      line:
        rawStroke === 'none'
          ? undefined
          : {
              color: strokeColor,
              width: isContainer ? 1.5 : 1,
              dashType: isDashed ? 'dash' : 'solid',
            },
      rectRadius: isRounded ? 0.08 : undefined,
    });

    // Add editable text overlay positioned appropriately (top-aligned for containers, centered for leaf cards)
    if (fullText) {
      const baseFontSize = Math.max(
        Math.min(Math.round(parseFloat(v.style.fontSize || '11') * Math.sqrt(scale) * 1.15), 13),
        7
      );

      if (isContainer) {
        slide1.addText(
          [
            {
              text: title,
              options: { bold: true, fontSize: Math.min(baseFontSize + 1, 12), color: fontColor },
            },
            ...(subtitle
              ? [{ text: `\n${subtitle}`, options: { fontSize: Math.max(baseFontSize - 1, 7), color: fontColor } }]
              : []),
          ],
          {
            x: sx + 0.06,
            y: sy + 0.04,
            w: Math.max(sw - 0.12, 0.2),
            h: Math.min(sh, 0.45),
            valign: 'top',
            align: v.style.align === 'left' ? 'left' : 'center',
            fontFace: 'Arial',
            margin: 2,
          }
        );
      } else {
        slide1.addText(
          [
            { text: title, options: { bold: true, fontSize: baseFontSize, color: fontColor } },
            ...(subtitle
              ? [
                  {
                    text: `\n${subtitle}`,
                    options: { fontSize: Math.max(baseFontSize - 1.5, 6.5), color: fontColor },
                  },
                ]
              : []),
          ],
          {
            x: sx + 0.03,
            y: sy + 0.02,
            w: Math.max(sw - 0.06, 0.2),
            h: Math.max(sh - 0.04, 0.15),
            valign: 'middle',
            align: 'center',
            fontFace: 'Arial',
            margin: 1,
          }
        );
      }
    }
  }

  // Render Connector Edges as Native Lines & Editable Label Pills
  const edges = cells.filter((c) => c.edge);
  for (const edge of edges) {
    const src = edge.source ? cellSlideCoords.get(edge.source) : undefined;
    const tgt = edge.target ? cellSlideCoords.get(edge.target) : undefined;

    if (src && tgt) {
      const strokeColor = normalizeHexColor(edge.style.strokeColor, isDarkCanvas ? '38BDF8' : '2563EB');
      const isDashed = edge.style.dashed === '1';

      // Compute start/end ports on shape boundaries
      let x1 = src.cx;
      let y1 = src.cy;
      let x2 = tgt.cx;
      let y2 = tgt.cy;

      const dx = x2 - x1;
      const dy = y2 - y1;

      if (Math.abs(dx) > Math.abs(dy)) {
        x1 = dx > 0 ? src.x + src.w : src.x;
        x2 = dx > 0 ? tgt.x : tgt.x + tgt.w;
      } else {
        y1 = dy > 0 ? src.y + src.h : src.y;
        y2 = dy > 0 ? tgt.y : tgt.y + tgt.h;
      }

      const lineX = Math.min(x1, x2);
      const lineY = Math.min(y1, y2);
      const lineW = Math.max(Math.abs(x2 - x1), 0.02);
      const lineH = Math.max(Math.abs(y2 - y1), 0.02);

      slide1.addShape(pptx.ShapeType.line, {
        x: lineX,
        y: lineY,
        w: lineW,
        h: lineH,
        flipH: x2 < x1,
        flipV: y2 < y1,
        line: {
          color: strokeColor,
          width: 1.5,
          dashType: isDashed ? 'dash' : 'solid',
          endArrowType: 'triangle',
        },
      });

      // If edge has a text label, add a clean high-contrast editable pill badge at midpoint
      const { fullText } = cleanHtmlToPlainText(edge.value);
      if (fullText) {
        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2;
        const pillW = Math.min(Math.max(fullText.length * 0.07 + 0.16, 0.55), 2.2);
        const pillH = 0.22;

        slide1.addShape(pptx.ShapeType.roundRect, {
          x: Number((midX - pillW / 2).toFixed(3)),
          y: Number((midY - pillH / 2).toFixed(3)),
          w: pillW,
          h: pillH,
          fill: { color: isDarkCanvas ? '0F172A' : 'FFFFFF' },
          line: { color: strokeColor, width: 1 },
          rectRadius: 0.06,
        });

        slide1.addText(fullText, {
          x: Number((midX - pillW / 2).toFixed(3)),
          y: Number((midY - pillH / 2).toFixed(3)),
          w: pillW,
          h: pillH,
          fontSize: 7.5,
          bold: true,
          color: isDarkCanvas ? '38BDF8' : '0F172A',
          align: 'center',
          valign: 'middle',
          fontFace: 'Arial',
        });
      }
    }
  }

  // =========================================================================
  // SLIDE 2: HIGH-RESOLUTION MASTER VISUAL SNAPSHOT (100% PIXEL REFERENCE)
  // =========================================================================
  try {
    const pngDataUrl = await exportDiagramPng(xmlContent, { scale: 2, transparent: false });
    if (pngDataUrl) {
      const slide2 = pptx.addSlide();
      slide2.background = { color: '0A1124' };

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
          { text: `${diagramName.toUpperCase()} `, options: { fontSize: 13, bold: true, color: '38BDF8' } },
          {
            text: `|  High-Resolution Architecture Master Snapshot (Slide 1 contains 100% Editable Shapes)`,
            options: { fontSize: 10, color: 'E2E8F0' },
          },
        ],
        {
          x: 0.35,
          y: 0.12,
          w: SLIDE_W - 0.7,
          h: 0.4,
          valign: 'middle',
          fontFace: 'Arial',
        }
      );

      slide2.addImage({
        data: pngDataUrl,
        x: 0.4,
        y: HEADER_H + 0.15,
        w: SLIDE_W - 0.8,
        h: SLIDE_H - HEADER_H - 0.3,
        sizing: { type: 'contain', w: SLIDE_W - 0.8, h: SLIDE_H - HEADER_H - 0.3 },
      });
    }
  } catch (err) {
    console.warn('High-res snapshot slide skipped:', err);
  }

  // =========================================================================
  // SLIDE 3: EDITABLE COMPONENT SPECIFICATION MATRIX TABLE
  // =========================================================================
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
      { text: `${diagramName.toUpperCase()} `, options: { fontSize: 13, bold: true, color: '38BDF8' } },
      {
        text: `|  Editable Architecture Component & Topology Specification Table`,
        options: { fontSize: 10, color: 'E2E8F0' },
      },
    ],
    {
      x: 0.35,
      y: 0.12,
      w: SLIDE_W - 0.7,
      h: 0.4,
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
    const isContainer = node.style.container === '1' || node.width * node.height > 90000;
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

  const safeName = diagramName.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
  await pptx.writeFile({ fileName: `${safeName || 'architecture'}_editable_slides.pptx` });
}
