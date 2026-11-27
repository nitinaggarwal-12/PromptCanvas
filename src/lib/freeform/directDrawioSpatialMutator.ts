import { XMLParser } from 'fast-xml-parser';
import {
  createGeminiClient,
  getGenConfigForModel,
  resolveLatestGeminiModelChain,
} from '@/lib/geminiConfig';
import { generateContentWithRetry } from '@/lib/geminiRetryHelper';
import { resolveFreeformIconDataUri } from './freeformIconRegistry';

export interface SpatialCellRecord {
  id: string;
  parent: string;
  value: string;
  plainLabel: string;
  style: string;
  isContainer: boolean;
  relX: number;
  relY: number;
  absX: number;
  absY: number;
  w: number;
  h: number;
}

export interface SpatialEdgeRecord {
  id: string;
  parent?: string;
  source: string;
  target: string;
  sourcePoint?: { x: number; y: number };
  targetPoint?: { x: number; y: number };
  offsetPoint?: { x: number; y: number };
  value: string;
  plainLabel: string;
  style: string;
  points: Array<{ x: number; y: number }>;
}

export interface ParsedDrawioSpatialState {
  canvasW: number;
  canvasH: number;
  title: string;
  cells: SpatialCellRecord[];
  edges: SpatialEdgeRecord[];
}

interface AddZoneOp {
  id: string;
  label: string;
  parentId?: string | null;
  placement?: 'right_of' | 'left_of' | 'below' | 'above' | 'inside';
  anchorId?: string;
  fillHex?: string;
  strokeHex?: string;
  dashed?: boolean;
}

interface AddNodeOp {
  id: string;
  label: string;
  sublabel?: string;
  parentZoneId?: string | null;
  placement?: 'below' | 'above' | 'right_of' | 'left_of' | 'between' | 'inside';
  anchorId?: string;
  secondAnchorId?: string;
  iconKey?: string;
  fillHex?: string;
  strokeHex?: string;
}

interface ModifyCellOp {
  id: string;
  newLabel?: string;
  newSublabel?: string;
  fillHex?: string;
  strokeHex?: string;
  movePlacement?: 'below' | 'above' | 'right_of' | 'left_of' | 'inside';
  moveAnchorId?: string;
}

interface AddEdgeOp {
  id?: string;
  source: string;
  target: string;
  label?: string;
  dashed?: boolean;
  bidirectional?: boolean;
  strokeHex?: string;
}

export interface SpatialMutationPlan {
  title?: string;
  summaryOfChanges: string;
  removeCellIds?: string[];
  removeEdgeIds?: string[];
  addZones?: AddZoneOp[];
  addNodes?: AddNodeOp[];
  modifyCells?: ModifyCellOp[];
  addEdges?: AddEdgeOp[];
}

function escapeXmlAttr(str: string): string {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeHtmlText(str: string): string {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function stripHtmlTags(raw: string): string {
  return String(raw || '')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function sanitizeHex(raw: string | undefined, fallback: string): string {
  const m = String(raw || '').trim().match(/^#?[0-9a-fA-F]{6}$/);
  if (!m) return fallback;
  const h = m[0].startsWith('#') ? m[0] : `#${m[0]}`;
  return h.toUpperCase();
}

/**
 * Parses live `<mxCell>` coordinates, styles, containers, leaf cards, and edges directly from Draw.io XML
 * without altering or discarding any existing colors, dimensions, or connectors.
 */
export function parseDrawioXmlSpatialState(xml: string): ParsedDrawioSpatialState {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
  });
  const doc = parser.parse(xml || '');
  const diagramNode = doc?.mxfile?.diagram;
  const dObj = Array.isArray(diagramNode) ? diagramNode[0] : diagramNode;
  const title = String(dObj?.['@_name'] || 'Architecture Diagram');
  const model = dObj?.mxGraphModel || doc?.mxGraphModel || {};
  const canvasW = Number(model?.['@_pageWidth'] || model?.['@_dx'] || 1600) || 1600;
  const canvasH = Number(model?.['@_pageHeight'] || model?.['@_dy'] || 900) || 900;

  const rawCellsNode = model?.root?.mxCell;
  const rawCells: any[] = Array.isArray(rawCellsNode)
    ? rawCellsNode
    : rawCellsNode
      ? [rawCellsNode]
      : [];

  const tempVertices = new Map<
    string,
    {
      id: string;
      parent: string;
      value: string;
      style: string;
      relX: number;
      relY: number;
      w: number;
      h: number;
    }
  >();
  const parentRefs = new Set<string>();
  const edges: SpatialEdgeRecord[] = [];

  for (const c of rawCells) {
    const id = String(c?.['@_id'] || '');
    if (!id || id === '0' || id === '1') continue;
    const isVertex = String(c?.['@_vertex'] || '') === '1';
    const isEdge = String(c?.['@_edge'] || '') === '1';
    const parent = String(c?.['@_parent'] || '1');
    const style = String(c?.['@_style'] || '');
    const value = String(c?.['@_value'] ?? '');

    if (isVertex) {
      const g = c?.mxGeometry || {};
      const relX = Number(g?.['@_x'] || 0) || 0;
      const relY = Number(g?.['@_y'] || 0) || 0;
      const w = Number(g?.['@_width'] || 160) || 160;
      const h = Number(g?.['@_height'] || 52) || 52;
      tempVertices.set(id, { id, parent, value, style, relX, relY, w, h });
      if (parent && parent !== '0' && parent !== '1') {
        parentRefs.add(parent);
      }
    } else if (isEdge) {
      const source = String(c?.['@_source'] || '');
      const target = String(c?.['@_target'] || '');
      const directPtsRaw = c?.mxGeometry?.mxPoint;
      const directPts = Array.isArray(directPtsRaw)
        ? directPtsRaw
        : directPtsRaw
          ? [directPtsRaw]
          : [];
      let sourcePoint: { x: number; y: number } | undefined;
      let targetPoint: { x: number; y: number } | undefined;
      let offsetPoint: { x: number; y: number } | undefined;
      for (const dp of directPts) {
        const px = Number(dp?.['@_x']);
        const py = Number(dp?.['@_y']);
        const role = String(dp?.['@_as'] || '');
        if (!Number.isFinite(px) || !Number.isFinite(py)) continue;
        if (role === 'sourcePoint') sourcePoint = { x: px, y: py };
        else if (role === 'targetPoint') targetPoint = { x: px, y: py };
        else if (role === 'offset') offsetPoint = { x: px, y: py };
      }
      if ((!source || !target) && (!sourcePoint || !targetPoint)) continue;
      const pts: Array<{ x: number; y: number }> = [];
      const arrNode = c?.mxGeometry?.Array;
      const arrays = Array.isArray(arrNode) ? arrNode : arrNode ? [arrNode] : [];
      for (const a of arrays) {
        if (a?.['@_as'] === 'points') {
          const mp = a?.mxPoint;
          const mpList = Array.isArray(mp) ? mp : mp ? [mp] : [];
          for (const p of mpList) {
            const px = Number(p?.['@_x']);
            const py = Number(p?.['@_y']);
            if (Number.isFinite(px) && Number.isFinite(py)) {
              pts.push({ x: px, y: py });
            }
          }
        }
      }
      edges.push({
        id,
        parent,
        source,
        target,
        sourcePoint,
        targetPoint,
        offsetPoint,
        value,
        plainLabel: stripHtmlTags(value),
        style,
        points: pts,
      });
    }
  }

  const resolveAbs = (id: string, visited = new Set<string>()): { x: number; y: number } => {
    const v = tempVertices.get(id);
    if (!v) return { x: 0, y: 0 };
    if (!v.parent || v.parent === '1' || v.parent === '0' || visited.has(id)) {
      return { x: v.relX, y: v.relY };
    }
    visited.add(id);
    const pAbs = resolveAbs(v.parent, visited);
    return { x: pAbs.x + v.relX, y: pAbs.y + v.relY };
  };

  const cells: SpatialCellRecord[] = [];
  for (const v of tempVertices.values()) {
    const abs = resolveAbs(v.id);
    const isContainer =
      parentRefs.has(v.id) ||
      /\bcontainer=1\b|\bswimlane\b/i.test(v.style) ||
      v.id.startsWith('z_') ||
      v.id.startsWith('zone_');
    cells.push({
      id: v.id,
      parent: v.parent,
      value: v.value,
      plainLabel: stripHtmlTags(v.value),
      style: v.style,
      isContainer,
      relX: v.relX,
      relY: v.relY,
      absX: abs.x,
      absY: abs.y,
      w: v.w,
      h: v.h,
    });
  }

  return { canvasW, canvasH, title, cells, edges };
}

export function isFullCanvasWrapperCell(
  c: SpatialCellRecord,
  canvasW: number,
  canvasH: number
): boolean {
  return (
    c.id === 'bg_frame' ||
    c.id === 'canvas_frame' ||
    (c.w >= canvasW * 0.85 && c.h >= canvasH * 0.76)
  );
}

export function isFooterBarCell(
  c: SpatialCellRecord,
  canvasW: number,
  canvasH: number
): boolean {
  return (
    c.id.startsWith('ftr') ||
    (c.w >= canvasW * 0.65 && c.h <= 72 && c.absY >= canvasH * 0.78)
  );
}

export function isIconOverlayBadgeCell(c: SpatialCellRecord): boolean {
  return !c.plainLabel && c.w <= 48 && c.h <= 48;
}

export function isHeaderBannerOrPillCell(c: SpatialCellRecord): boolean {
  if (/^(top_title|hdr|mid_gcp|.*_hdr|.*_lbl|.*_pill|.*_vtab)$/i.test(c.id)) return true;
  if (/^p_[a-z0-9_]+$/i.test(c.id) && c.w <= 132 && c.h <= 46) return true;
  return false;
}

export function isVisualZoneFrameCell(
  c: SpatialCellRecord,
  allCells: SpatialCellRecord[],
  canvasW: number,
  canvasH: number
): boolean {
  if (isFullCanvasWrapperCell(c, canvasW, canvasH) || isFooterBarCell(c, canvasW, canvasH)) {
    return false;
  }
  if (c.isContainer) return true;
  if (c.w < 250 || c.h < 200) return false;
  let enclosedLeaves = 0;
  for (const other of allCells) {
    if (
      other.id === c.id ||
      other.isContainer ||
      isIconOverlayBadgeCell(other) ||
      isHeaderBannerOrPillCell(other) ||
      other.w >= c.w - 8 ||
      other.h >= c.h - 8 ||
      other.w < 72 ||
      other.h < 34
    ) {
      continue;
    }
    if (
      other.absX >= c.absX - 4 &&
      other.absX + other.w <= c.absX + c.w + 4 &&
      other.absY >= c.absY - 4 &&
      other.absY + other.h <= c.absY + c.h + 4
    ) {
      enclosedLeaves++;
      if (enclosedLeaves >= 2) return true;
    }
  }
  return false;
}

export function inferVisualZoneLabel(
  zone: SpatialCellRecord,
  allCells: SpatialCellRecord[]
): string {
  if (zone.plainLabel.trim()) return zone.plainLabel.trim();
  const candidates = allCells
    .filter(
      (c) =>
        c.id !== zone.id &&
        c.plainLabel.trim().length > 0 &&
        c.h <= 68 &&
        c.absX >= zone.absX - 6 &&
        c.absX + c.w <= zone.absX + zone.w + 6 &&
        c.absY >= zone.absY - 2 &&
        c.absY <= zone.absY + 76
    )
    .sort((a, b) => a.absY - b.absY || b.w - a.w);
  return candidates[0]?.plainLabel.trim() || zone.id;
}

export function buildCardValueHtml(
  label: string,
  sublabel?: string,
  iconUri?: string | null,
  fontSize = 12,
  overlayIconLayout?: 'none' | 'left' | 'top' | 'native_spacing'
): string {
  const safeLabel = escapeHtmlText(label);
  const safeSub = sublabel ? escapeHtmlText(sublabel) : '';
  const subSize = fontSize >= 13.5 ? 11 : Math.max(9.5, fontSize - 2);
  const textBlock = safeSub
    ? `<div style="font-size:${fontSize}px;font-weight:800;color:#0F172A;line-height:1.25;">${safeLabel}</div><div style="font-size:${subSize}px;font-weight:500;color:#334155;margin-top:4px;line-height:1.3;">${safeSub}</div>`
    : `<div style="font-size:${fontSize}px;font-weight:800;color:#0F172A;line-height:1.25;">${safeLabel}</div>`;

  if (overlayIconLayout === 'native_spacing') {
    return textBlock;
  }
  if (overlayIconLayout === 'left') {
    return `<div style="padding:2px 10px 2px 58px;text-align:left;">${textBlock}</div>`;
  }
  if (overlayIconLayout === 'top') {
    return `<div style="padding:32px 8px 4px 8px;text-align:center;">${textBlock}</div>`;
  }
  if (iconUri) {
    return `<div style="display:flex;align-items:center;gap:10px;padding:4px 12px;text-align:left;"><img src="${iconUri}" width="26" height="26" style="flex-shrink:0;"/><div>${textBlock}</div></div>`;
  }
  return `<div style="padding:4px 10px;text-align:center;">${textBlock}</div>`;
}

export function buildZoneHeaderHtml(label: string, strokeHex: string): string {
  if (!label.trim()) return '';
  return `<div style="font-weight:700;font-size:12px;color:#0F172A;padding:4px 8px;letter-spacing:0.01em;border-bottom:1px solid ${strokeHex}33;">${escapeHtmlText(label)}</div>`;
}

function extractJsonBlock(rawText: string): any {
  const cleaned = String(rawText || '')
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    const start = cleaned.indexOf('{');
    const end = cleaned.lastIndexOf('}');
    if (start >= 0 && end > start) {
      return JSON.parse(cleaned.slice(start, end + 1));
    }
    throw new Error('Failed to parse JSON mutation plan from model response.');
  }
}

export function serializeSpatialStateToDrawioXml(state: ParsedDrawioSpatialState): string {
  const fullWrappers = state.cells.filter((c) =>
    isFullCanvasWrapperCell(c, state.canvasW, state.canvasH)
  );
  const fullWrapperIds = new Set(fullWrappers.map((c) => c.id));

  const zoneFrames = state.cells
    .filter(
      (c) =>
        !fullWrapperIds.has(c.id) &&
        isVisualZoneFrameCell(c, state.cells, state.canvasW, state.canvasH)
    )
    .sort((a, b) => b.w * b.h - a.w * a.h);
  const zoneFrameIds = new Set(zoneFrames.map((c) => c.id));

  const iconBadges = state.cells.filter(
    (c) => !fullWrapperIds.has(c.id) && !zoneFrameIds.has(c.id) && isIconOverlayBadgeCell(c)
  );
  const iconBadgeIds = new Set(iconBadges.map((c) => c.id));

  const leaves = state.cells.filter(
    (c) => !fullWrapperIds.has(c.id) && !zoneFrameIds.has(c.id) && !iconBadgeIds.has(c.id)
  );

  const cellMap = new Map<string, SpatialCellRecord>();
  for (const c of state.cells) cellMap.set(c.id, c);

  const lines: string[] = [];
  // Zero whitespace text nodes between <mxfile>, <diagram>, and <mxGraphModel> so viewer-static.min.js
  // never mistakes <diagram> text content for base64-deflated data.
  lines.push(
    `<mxfile host="app.diagrams.net" agent="PromptCanvas-DirectSpatial" version="24.7.17" data-prompt-to-diagram="true"><diagram id="p2d_canvas" name="${escapeXmlAttr(state.title)}"><mxGraphModel dx="${state.canvasW}" dy="${state.canvasH}" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="${state.canvasW}" pageHeight="${state.canvasH}" background="#FFFFFF" math="0" shadow="0" data-prompt-to-diagram="true"><root><mxCell id="0"/><mxCell id="1" parent="0"/>`
  );

  for (const c of [...fullWrappers, ...zoneFrames, ...leaves, ...iconBadges]) {
    const parentCell = c.parent && c.parent !== '1' ? cellMap.get(c.parent) : undefined;
    const parentId = parentCell ? parentCell.id : '1';
    const relX = parentCell ? Math.round(c.absX - parentCell.absX) : Math.round(c.absX);
    const relY = parentCell ? Math.round(c.absY - parentCell.absY) : Math.round(c.absY);
    lines.push(
      `<mxCell id="${escapeXmlAttr(c.id)}" value="${escapeXmlAttr(c.value)}" style="${escapeXmlAttr(c.style)}" vertex="1" parent="${escapeXmlAttr(parentId)}"><mxGeometry x="${relX}" y="${relY}" width="${Math.round(c.w)}" height="${Math.round(c.h)}" as="geometry"/></mxCell>`
    );
  }

  for (const e of state.edges) {
    const hasVertices = Boolean(e.source && e.target && cellMap.has(e.source) && cellMap.has(e.target));
    const hasPointPair = Boolean(e.sourcePoint && e.targetPoint);
    if (!hasVertices && !hasPointPair) continue;
    const srcTgtAttr = hasVertices
      ? ` source="${escapeXmlAttr(e.source)}" target="${escapeXmlAttr(e.target)}"`
      : '';
    const edgeParent = e.parent && (e.parent === '1' || cellMap.has(e.parent)) ? e.parent : '1';

    const geoChildren: string[] = [];
    if (e.sourcePoint) {
      geoChildren.push(`<mxPoint x="${Math.round(e.sourcePoint.x)}" y="${Math.round(e.sourcePoint.y)}" as="sourcePoint"/>`);
    }
    if (e.targetPoint) {
      geoChildren.push(`<mxPoint x="${Math.round(e.targetPoint.x)}" y="${Math.round(e.targetPoint.y)}" as="targetPoint"/>`);
    }
    if (e.points && e.points.length > 0) {
      const ptsXml = e.points
        .map((pt) => `<mxPoint x="${Math.round(pt.x)}" y="${Math.round(pt.y)}"/>`)
        .join('');
      geoChildren.push(`<Array as="points">${ptsXml}</Array>`);
    }
    if (e.offsetPoint) {
      geoChildren.push(`<mxPoint x="${Math.round(e.offsetPoint.x)}" y="${Math.round(e.offsetPoint.y)}" as="offset"/>`);
    } else if (e.plainLabel) {
      geoChildren.push(`<mxPoint x="0" y="-2" as="offset"/>`);
    }

    const geoXml =
      geoChildren.length > 0
        ? `<mxGeometry relative="1" as="geometry">${geoChildren.join('')}</mxGeometry>`
        : `<mxGeometry relative="1" as="geometry"/>`;

    lines.push(
      `<mxCell id="${escapeXmlAttr(e.id)}" value="${escapeXmlAttr(e.value)}" style="${escapeXmlAttr(e.style)}" edge="1" parent="${escapeXmlAttr(edgeParent)}"${srcTgtAttr}>${geoXml}</mxCell>`
    );
  }

  lines.push(`</root></mxGraphModel></diagram></mxfile>`);
  return lines.join('\n');
}

function findCleanVerticalCorridorX(
  defaultMidX: number,
  minBoundX: number,
  maxBoundX: number,
  segMinY: number,
  segMaxY: number,
  obstacles: SpatialCellRecord[]
): number {
  const hitsAt = (x: number) =>
    obstacles.some(
      (obs) =>
        x >= obs.absX - 6 &&
        x <= obs.absX + obs.w + 6 &&
        obs.absY + obs.h > segMinY - 4 &&
        obs.absY < segMaxY + 4
    );

  if (!hitsAt(defaultMidX)) return defaultMidX;

  const candidates: number[] = [];
  for (const obs of obstacles) {
    if (obs.absY + obs.h > segMinY - 4 && obs.absY < segMaxY + 4) {
      candidates.push(Math.round(obs.absX - 12));
      candidates.push(Math.round(obs.absX + obs.w + 12));
    }
  }
  for (let delta = 14; delta <= 180; delta += 14) {
    candidates.push(defaultMidX - delta, defaultMidX + delta);
  }

  for (const cand of candidates) {
    if (cand >= minBoundX + 8 && cand <= maxBoundX - 8 && !hitsAt(cand)) {
      return cand;
    }
  }
  return defaultMidX;
}

function computeSimpleOrthogonalEdgeStyle(
  src: SpatialCellRecord,
  tgt: SpatialCellRecord,
  opts: { dashed?: boolean; bidirectional?: boolean; strokeHex?: string; hasLabel?: boolean; laneIndex?: number },
  allCells: SpatialCellRecord[] = [],
  canvasW = 1600,
  canvasH = 900
): { style: string; points: Array<{ x: number; y: number }>; offsetPoint?: { x: number; y: number } } {
  const sCx = src.absX + src.w / 2;
  const sCy = src.absY + src.h / 2;
  const tCx = tgt.absX + tgt.w / 2;
  const tCy = tgt.absY + tgt.h / 2;
  const dx = tCx - sCx;
  const dy = tCy - sCy;

  const leafObstacles = allCells.filter(
    (obs) =>
      obs.id !== src.id &&
      obs.id !== tgt.id &&
      !isFullCanvasWrapperCell(obs, canvasW, canvasH) &&
      !isVisualZoneFrameCell(obs, allCells, canvasW, canvasH) &&
      !isFooterBarCell(obs, canvasW, canvasH) &&
      !isIconOverlayBadgeCell(obs) &&
      obs.w >= 44 &&
      obs.w < 700 &&
      obs.h >= 28 &&
      obs.h < 240
  );

  let exitX = 1;
  let exitY = 0.5;
  let entryX = 0;
  let entryY = 0.5;
  const points: Array<{ x: number; y: number }> = [];
  let offsetPoint: { x: number; y: number } | undefined;

  if (Math.abs(dx) >= Math.abs(dy)) {
    const segMinY = Math.min(sCy, tCy);
    const segMaxY = Math.max(sCy, tCy);
    if (dx >= 0) {
      exitX = 1;
      exitY = 0.5;
      entryX = 0;
      entryY = 0.5;
      if (Math.abs(sCy - tCy) > 10) {
        const minGapX = Math.min(src.absX + src.w, tgt.absX);
        const maxGapX = Math.max(src.absX + src.w, tgt.absX);
        const rawMidX = Math.round((src.absX + src.w + tgt.absX) / 2);
        const midX = findCleanVerticalCorridorX(rawMidX, minGapX, maxGapX, segMinY, segMaxY, leafObstacles);
        points.push({ x: midX, y: Math.round(sCy) }, { x: midX, y: Math.round(tCy) });
      }
    } else {
      exitX = 0;
      exitY = 0.5;
      entryX = 1;
      entryY = 0.5;
      if (Math.abs(sCy - tCy) > 10) {
        const minGapX = Math.min(tgt.absX + tgt.w, src.absX);
        const maxGapX = Math.max(tgt.absX + tgt.w, src.absX);
        const rawMidX = Math.round((src.absX + tgt.absX + tgt.w) / 2);
        const midX = findCleanVerticalCorridorX(rawMidX, minGapX, maxGapX, segMinY, segMaxY, leafObstacles);
        points.push({ x: midX, y: Math.round(sCy) }, { x: midX, y: Math.round(tCy) });
      }
    }
  } else {
    const minY = Math.min(src.absY + src.h, tgt.absY + tgt.h);
    const maxY = Math.max(src.absY, tgt.absY);
    const verticalGap = maxY - minY;
    const midXCheck = (sCx + tCx) / 2;
    const blockingCard = leafObstacles.find(
      (obs) =>
        midXCheck >= obs.absX - 8 &&
        midXCheck <= obs.absX + obs.w + 8 &&
        obs.absY + obs.h > minY + 4 &&
        obs.absY < maxY - 4
    );

    if (blockingCard || (opts.hasLabel && verticalGap < 42)) {
      // Route cleanly around the right gutter instead of slicing vertically through cards or cramping a label into a <42px gap
      const laneOffset = (opts.laneIndex || 0) * 18;
      const baseRight = Math.max(
        src.absX + src.w,
        tgt.absX + tgt.w,
        blockingCard ? blockingCard.absX + blockingCard.w : 0
      );
      const gutterX = Math.round(baseRight + 16 + laneOffset);
      exitX = 1;
      exitY = 0.5;
      entryX = 1;
      entryY = 0.5;
      points.push({ x: gutterX, y: Math.round(sCy) }, { x: gutterX, y: Math.round(tCy) });
    } else if (dy >= 0) {
      exitX = 0.5;
      exitY = 1;
      entryX = 0.5;
      entryY = 0;
      if (Math.abs(sCx - tCx) > 10) {
        const midY = Math.round((src.absY + src.h + tgt.absY) / 2);
        points.push({ x: Math.round(sCx), y: midY }, { x: Math.round(tCx), y: midY });
      }
    } else {
      exitX = 0.5;
      exitY = 0;
      entryX = 0.5;
      entryY = 1;
      if (Math.abs(sCx - tCx) > 10) {
        const midY = Math.round((src.absY + tgt.absY + tgt.h) / 2);
        points.push({ x: Math.round(sCx), y: midY }, { x: Math.round(tCx), y: midY });
      }
    }
  }

  const stroke = sanitizeHex(opts.strokeHex, '#475569');
  const routingParts =
    points.length > 0
      ? ['edgeStyle=none', 'rounded=1']
      : ['edgeStyle=orthogonalEdgeStyle', 'rounded=1', 'orthogonalLoop=1', 'jettySize=auto'];
  const styleParts = [
    ...routingParts,
    'html=1',
    `strokeColor=${stroke}`,
    'strokeWidth=1.6',
    `exitX=${exitX}`,
    `exitY=${exitY}`,
    'exitDx=0',
    'exitDy=0',
    `entryX=${entryX}`,
    `entryY=${entryY}`,
    'entryDx=0',
    'entryDy=0',
    'endArrow=blockThin',
    'endFill=1',
    opts.bidirectional ? 'startArrow=blockThin' : 'startArrow=none',
    opts.bidirectional ? 'startFill=1' : 'startFill=0',
    opts.dashed ? 'dashed=1;dashPattern=6 4' : 'dashed=0',
    'fontFamily=Inter, Helvetica, Arial, sans-serif',
    'fontSize=9.5',
    'fontColor=#1E293B',
    'labelBackgroundColor=none',
  ];

  return { style: `${styleParts.join(';')};`, points, offsetPoint };
}

export function computeSpatialAuditMetrics(state: ParsedDrawioSpatialState): {
  groupCount: number;
  nodeCount: number;
  edgeCount: number;
  maxNestingDepth: number;
  siblingOverlaps: number;
  childContainmentViolations: number;
} {
  const byId = new Map(state.cells.map((c) => [c.id, c]));
  const containers = state.cells.filter((c) =>
    isVisualZoneFrameCell(c, state.cells, state.canvasW, state.canvasH)
  );
  const zoneIds = new Set(containers.map((c) => c.id));
  const leaves = state.cells.filter(
    (c) =>
      !zoneIds.has(c.id) &&
      !isFullCanvasWrapperCell(c, state.canvasW, state.canvasH) &&
      !isFooterBarCell(c, state.canvasW, state.canvasH) &&
      !isIconOverlayBadgeCell(c) &&
      !isHeaderBannerOrPillCell(c)
  );

  let siblingOverlaps = 0;
  for (let i = 0; i < leaves.length; i++) {
    for (let j = i + 1; j < leaves.length; j++) {
      const a = leaves[i];
      const b = leaves[j];
      const ix = Math.max(0, Math.min(a.absX + a.w, b.absX + b.w) - Math.max(a.absX, b.absX));
      const iy = Math.max(0, Math.min(a.absY + a.h, b.absY + b.h) - Math.max(a.absY, b.absY));
      if (ix * iy > 16) siblingOverlaps++;
    }
  }

  let childContainmentViolations = 0;
  for (const c of state.cells) {
    if (!c.parent || c.parent === '1' || c.parent === '0') continue;
    const p = byId.get(c.parent);
    if (!p) continue;
    if (
      c.absX < p.absX - 2 ||
      c.absY < p.absY - 2 ||
      c.absX + c.w > p.absX + p.w + 2 ||
      c.absY + c.h > p.absY + p.h + 2
    ) {
      childContainmentViolations++;
    }
  }

  const depthOf = (c: SpatialCellRecord, seen = new Set<string>()): number => {
    if (!c.parent || c.parent === '1' || c.parent === '0' || seen.has(c.id)) return 1;
    seen.add(c.id);
    const p = byId.get(c.parent);
    return p ? 1 + depthOf(p, seen) : 1;
  };
  const maxNestingDepth = containers.reduce(
    (mx, c) => Math.max(mx, depthOf(c)),
    containers.length > 0 ? 1 : 0
  );

  return {
    groupCount: containers.length,
    nodeCount: leaves.length,
    edgeCount: state.edges.length,
    maxNestingDepth,
    siblingOverlaps,
    childContainmentViolations,
  };
}

/**
 * Surgically mutates an existing Draw.io XML diagram in place (`action: 'modify'`)
 * while preserving 100% of untouched `<mxCell>` styles, colors, dimensions, and connectors.
 * Zero `e_auto_*` synthetic edges and zero `#FFFFFF` nested zone color wipes.
 */
export async function mutateDrawioXmlDirectly(params: {
  currentXml: string;
  userPrompt: string;
  modificationPrompt: string;
  modificationHistory?: string[];
  explicitApiKey?: string;
}): Promise<{
  xml: string;
  title: string;
  summaryOfChanges: string;
  modelUsed: string;
  stats: {
    groupCount: number;
    nodeCount: number;
    edgeCount: number;
    maxNestingDepth: number;
    siblingOverlaps: number;
    childContainmentViolations: number;
  };
}> {
  const ai = createGeminiClient(params.explicitApiKey);
  if (!ai) {
    throw new Error('Missing Gemini API key or Vertex AI credentials for direct Draw.io spatial update.');
  }

  const state = parseDrawioXmlSpatialState(params.currentXml);
  const modelChain = await resolveLatestGeminiModelChain(ai, 'chat');
  const modelToUse = modelChain[0] || 'gemini-2.5-flash';

  const visualZones = state.cells.filter((c) =>
    isVisualZoneFrameCell(c, state.cells, state.canvasW, state.canvasH)
  );
  const visualZoneIds = new Set(visualZones.map((z) => z.id));

  const compactZones = visualZones.map((z) => ({
    id: z.id,
    label: inferVisualZoneLabel(z, state.cells),
    parent: z.parent,
    rect: [Math.round(z.absX), Math.round(z.absY), Math.round(z.w), Math.round(z.h)],
  }));

  const compactNodes = state.cells
    .filter(
      (c) =>
        !visualZoneIds.has(c.id) &&
        !isFullCanvasWrapperCell(c, state.canvasW, state.canvasH) &&
        !isFooterBarCell(c, state.canvasW, state.canvasH) &&
        !isIconOverlayBadgeCell(c) &&
        !isHeaderBannerOrPillCell(c) &&
        c.plainLabel.trim().length > 0
    )
    .map((n) => ({
      id: n.id,
      label: n.plainLabel,
      parent: n.parent,
      rect: [Math.round(n.absX), Math.round(n.absY), Math.round(n.w), Math.round(n.h)],
    }));

  const compactEdges = state.edges.map((e) => ({
    id: e.id,
    source: e.source,
    target: e.target,
    label: e.plainLabel,
  }));

  const systemPrompt = `You are a surgical Draw.io XML Spatial Architect.
Given the live Draw.io canvas inventory (containers, leaf nodes, edges with exact [x, y, w, h] coordinates) and a user's follow-up change instruction, return ONLY a JSON object matching SpatialMutationPlan:
{
  "title": "Optional updated diagram title if scope changed",
  "summaryOfChanges": "1-2 sentence factual summary of what was added, modified, connected, or removed",
  "removeCellIds": ["ids of zones or nodes to delete"],
  "removeEdgeIds": ["ids of edges to delete"],
  "addZones": [
    {
      "id": "z_new_slug",
      "label": "Zone Title",
      "parentId": "1 or existing zone id",
      "placement": "right_of | left_of | below | above | inside",
      "anchorId": "existing zone id",
      "fillHex": "#E8F0FE",
      "strokeHex": "#4285F4",
      "dashed": false
    }
  ],
  "addNodes": [
    {
      "id": "n_new_slug",
      "label": "Exact Component Name",
      "sublabel": "",
      "parentZoneId": "existing or newly added zone id, or '1'",
      "placement": "below | above | right_of | left_of | between | inside",
      "anchorId": "existing node or zone id",
      "secondAnchorId": "optional second node id when placement='between'",
      "iconKey": "short product/tech token e.g. cloud_armor, redis, kafka, bigquery",
      "fillHex": "#FFFFFF",
      "strokeHex": "#CBD5E1"
    }
  ],
  "modifyCells": [
    {
      "id": "existing cell id",
      "newLabel": "optional renamed label",
      "newSublabel": "optional sublabel",
      "fillHex": "optional #RRGGBB",
      "strokeHex": "optional #RRGGBB",
      "movePlacement": "optional: below | above | right_of | left_of | inside",
      "moveAnchorId": "optional target node or zone id when moving this cell"
    }
  ],
  "addEdges": [
    {
      "source": "source node or zone id",
      "target": "target node or zone id",
      "label": "optional short protocol/flow label",
      "dashed": false,
      "bidirectional": false,
      "strokeHex": "#475569"
    }
  ]
}
STRICT RULES:
1. Do NOT touch, recreate, or delete existing zones/nodes/edges unless requested by the user's change instruction.
2. When inserting a component "between A and B", remove the old direct A->B edge in removeEdgeIds and add A->New and New->B in addEdges.
3. VERTICAL STACK DISCIPLINE: When adding a node inside a vertical stack of cards, add AT MOST ONE clean vertical step edge from its immediate adjacent stack neighbor (with label="" if existing stack arrows are unlabelled) — NEVER add multiple skip-level internal cross-edges across the same stack.
4. Keep any external edge label concise (<= 3 words) and never invent fake disconnected edges.`;

  const userPayload = JSON.stringify(
    {
      originalPrompt: params.userPrompt,
      previousModifications: params.modificationHistory || [],
      currentCanvas: {
        width: state.canvasW,
        height: state.canvasH,
        title: state.title,
        zones: compactZones,
        nodes: compactNodes,
        edges: compactEdges,
      },
      modificationInstruction: params.modificationPrompt,
    },
    null,
    2
  );

  const response = await generateContentWithRetry(
    ai,
    {
      model: modelToUse,
      contents: userPayload,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
        temperature: 0.15,
        maxOutputTokens: 16384,
        thinkingConfig: getGenConfigForModel('edit', modelToUse).thinkingConfig,
      },
    },
    { label: 'Stage Modify: Direct Spatial Draw.io Mutation', perAttemptTimeoutMs: 45_000, totalBudgetMs: 65_000 }
  );

  const rawText = String(response?.text || '').trim();
  const plan: SpatialMutationPlan = extractJsonBlock(rawText);
  const actualModel = String((response as any)?.__resolvedModelId || modelToUse);

  return applySpatialMutationPlan(state, plan, actualModel, params.modificationPrompt);
}

export function applySpatialMutationPlan(
  stateInput: ParsedDrawioSpatialState,
  plan: SpatialMutationPlan,
  actualModel = 'deterministic-spatial-mutator',
  modificationPrompt = ''
): {
  xml: string;
  title: string;
  summaryOfChanges: string;
  modelUsed: string;
  stats: {
    groupCount: number;
    nodeCount: number;
    edgeCount: number;
    maxNestingDepth: number;
    siblingOverlaps: number;
    childContainmentViolations: number;
  };
} {
  const state: ParsedDrawioSpatialState = {
    canvasW: stateInput.canvasW,
    canvasH: stateInput.canvasH,
    title: stateInput.title,
    cells: stateInput.cells.map((c) => ({ ...c })),
    edges: stateInput.edges.map((e) => ({
      ...e,
      sourcePoint: e.sourcePoint ? { ...e.sourcePoint } : undefined,
      targetPoint: e.targetPoint ? { ...e.targetPoint } : undefined,
      offsetPoint: e.offsetPoint ? { ...e.offsetPoint } : undefined,
      points: e.points.map((pt) => ({ ...pt })),
    })),
  };

  if (plan.title && plan.title.trim()) {
    state.title = plan.title.trim();
  }

  // 1. Removals (cascade children if a container is removed)
  const removeSet = new Set<string>(plan.removeCellIds || []);
  let cascaded = true;
  while (cascaded) {
    cascaded = false;
    for (const c of state.cells) {
      if (!removeSet.has(c.id) && removeSet.has(c.parent)) {
        removeSet.add(c.id);
        cascaded = true;
      }
    }
  }
  const removeEdgeSet = new Set<string>(plan.removeEdgeIds || []);
  state.cells = state.cells.filter((c) => !removeSet.has(c.id));
  state.edges = state.edges.filter(
    (e) => !removeEdgeSet.has(e.id) && !removeSet.has(e.source) && !removeSet.has(e.target)
  );

  const findCell = (id?: string | null) =>
    id ? state.cells.find((c) => c.id === id) : undefined;

  // 2. Add new zones
  for (const zOp of plan.addZones || []) {
    const id = zOp.id || `z_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    if (findCell(id)) continue;
    const anchor = findCell(zOp.anchorId);
    const parentZone = zOp.parentId && zOp.parentId !== '1' ? findCell(zOp.parentId) : undefined;
    let absX = 60;
    let absY = 80;
    const w = 260;
    const h = 190;

    if (anchor) {
      if (zOp.placement === 'left_of') {
        absX = Math.max(20, anchor.absX - w - 24);
        absY = anchor.absY;
      } else if (zOp.placement === 'below') {
        absX = anchor.absX;
        absY = anchor.absY + anchor.h + 24;
      } else if (zOp.placement === 'above') {
        absX = anchor.absX;
        absY = Math.max(20, anchor.absY - h - 24);
      } else if (zOp.placement === 'inside') {
        absX = anchor.absX + 18;
        absY = anchor.absY + 42;
      } else {
        absX = anchor.absX + anchor.w + 24;
        absY = anchor.absY;
      }
    } else if (parentZone) {
      absX = parentZone.absX + 18;
      absY = parentZone.absY + 42;
    }

    const fill = sanitizeHex(zOp.fillHex, '#F1F5F9');
    const stroke = sanitizeHex(zOp.strokeHex, '#64748B');
    const style = [
      'rounded=1',
      'arcSize=4',
      'whiteSpace=wrap',
      'html=1',
      'container=1',
      'collapsible=0',
      'verticalAlign=top',
      'align=left',
      `fillColor=${fill}`,
      `strokeColor=${stroke}`,
      'strokeWidth=1.5',
      zOp.dashed ? 'dashed=1;dashPattern=6 4' : 'dashed=0',
    ].join(';') + ';';

    state.cells.push({
      id,
      parent: parentZone ? parentZone.id : '1',
      value: buildZoneHeaderHtml(zOp.label, stroke),
      plainLabel: zOp.label,
      style,
      isContainer: true,
      relX: parentZone ? absX - parentZone.absX : absX,
      relY: parentZone ? absY - parentZone.absY : absY,
      absX,
      absY,
      w,
      h,
    });
  }

  // 3. Add new leaf nodes
  const origCanvasW = state.canvasW;
  const origCanvasH = state.canvasH;

  for (const nOp of plan.addNodes || []) {
    const id = nOp.id || `n_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    if (findCell(id)) continue;
    const rawZone =
      nOp.parentZoneId && nOp.parentZoneId !== '1' ? findCell(nOp.parentZoneId) : undefined;
    const rawAnchor = findCell(nOp.anchorId);
    const anchorIsZone = rawAnchor
      ? isVisualZoneFrameCell(rawAnchor, state.cells, origCanvasW, origCanvasH)
      : false;

    const effectiveZone = rawZone || (anchorIsZone ? rawAnchor : undefined);
    // Only bind Draw.io `parent` to true container=1 / swimlane cells; flat background zones keep parent='1'
    const parentZone =
      effectiveZone && /\bcontainer=1\b|\bswimlane\b/i.test(effectiveZone.style)
        ? effectiveZone
        : undefined;
    const visualZone =
      !parentZone && effectiveZone && !isFullCanvasWrapperCell(effectiveZone, origCanvasW, origCanvasH)
        ? effectiveZone
        : undefined;
    const anchor = anchorIsZone ? undefined : rawAnchor;
    const secondAnchor = findCell(nOp.secondAnchorId);

    // Match existing sibling dimensions in the same zone when available
    const siblings = state.cells.filter((c) => {
      if (
        c.isContainer ||
        isFullCanvasWrapperCell(c, origCanvasW, origCanvasH) ||
        isVisualZoneFrameCell(c, state.cells, origCanvasW, origCanvasH) ||
        isFooterBarCell(c, origCanvasW, origCanvasH) ||
        isIconOverlayBadgeCell(c) ||
        isHeaderBannerOrPillCell(c) ||
        c.w >= 700 ||
        c.h >= 240
      ) {
        return false;
      }
      if (parentZone) return c.parent === parentZone.id;
      if (visualZone) {
        return (
          c.absX >= visualZone.absX - 4 &&
          c.absX + c.w <= visualZone.absX + visualZone.w + 4 &&
          c.absY >= visualZone.absY - 4 &&
          c.absY + c.h <= visualZone.absY + visualZone.h + 4
        );
      }
      return c.parent === '1';
    });
    const refSibling = anchor && !anchor.isContainer && anchor.w < 700 ? anchor : siblings[0];
    const w = refSibling ? Math.min(540, Math.round(refSibling.w)) : 220;
    const h = refSibling
      ? refSibling.h >= 100
        ? Math.min(120, Math.max(104, Math.round(refSibling.h)))
        : Math.min(96, Math.max(54, Math.round(refSibling.h)))
      : 68;
    const stackGap = w >= 340 ? 24 : 18;

    // Detect inner flat parent="1" visual background frames enclosing `anchor` or `visualZone` (excluding full-canvas wrappers)
    const refBox = anchor && anchor.w < 700 ? anchor : visualZone;
    const innerEnclosingFrames =
      !parentZone && refBox
        ? state.cells.filter(
            (c) =>
              c.id !== id &&
              !isFullCanvasWrapperCell(c, origCanvasW, origCanvasH) &&
              !isFooterBarCell(c, origCanvasW, origCanvasH) &&
              (c.id === visualZone?.id ||
                (c.id !== refBox.id &&
                  c.w >= 250 &&
                  c.h >= 200 &&
                  refBox.absX >= c.absX - 4 &&
                  refBox.absX + refBox.w <= c.absX + c.w + 4 &&
                  refBox.absY >= c.absY - 4 &&
                  refBox.absY + refBox.h <= c.absY + c.h + 4))
          )
        : [];

    let absX = parentZone
      ? parentZone.absX + 18
      : visualZone
      ? visualZone.absX + Math.max(16, Math.round((visualZone.w - w) / 2))
      : 80;
    let absY = parentZone ? parentZone.absY + 44 : visualZone ? visualZone.absY + 56 : 100;

    if (nOp.placement === 'between' && anchor && secondAnchor) {
      absX = Math.round((anchor.absX + secondAnchor.absX) / 2);
      absY = Math.round((anchor.absY + secondAnchor.absY) / 2);
    } else if (anchor && !anchor.isContainer && anchor.w < 700 && nOp.placement !== 'inside') {
      if (nOp.placement === 'above') {
        absX = anchor.absX;
        absY = Math.max(20, anchor.absY - h - stackGap);
      } else if (nOp.placement === 'right_of') {
        absX = anchor.absX + anchor.w + 18;
        absY = anchor.absY;
      } else if (nOp.placement === 'left_of') {
        absX = Math.max(20, anchor.absX - w - 18);
        absY = anchor.absY;
      } else {
        absX = anchor.absX;
        absY = anchor.absY + anchor.h + stackGap;
      }
    } else if (parentZone || visualZone) {
      const z = (parentZone || visualZone)!;
      if (siblings.length > 0) {
        const lowest = siblings.reduce(
          (acc, s) => (s.absY + s.h > acc.absY + acc.h ? s : acc),
          siblings[0]
        );
        absX = lowest.absX;
        absY = lowest.absY + lowest.h + stackGap;
      } else {
        absX = z.absX + Math.max(14, Math.round((z.w - w) / 2));
        absY = z.absY + 52;
      }
    }

    // Nudge locally if overlapping an existing sibling leaf card (ignoring visual zone frames, wrappers & footers)
    const innerEnclosingIds = new Set(innerEnclosingFrames.map((f) => f.id));
    for (let guard = 0; guard < 12; guard++) {
      const hit = state.cells.find(
        (c) =>
          !c.isContainer &&
          !innerEnclosingIds.has(c.id) &&
          !isFullCanvasWrapperCell(c, origCanvasW, origCanvasH) &&
          !isVisualZoneFrameCell(c, state.cells, origCanvasW, origCanvasH) &&
          !isFooterBarCell(c, origCanvasW, origCanvasH) &&
          !isIconOverlayBadgeCell(c) &&
          absX < c.absX + c.w + 8 &&
          absX + w + 8 > c.absX &&
          absY < c.absY + c.h + 8 &&
          absY + h + 8 > c.absY
      );
      if (!hit) break;
      absY = hit.absY + hit.h + stackGap;
    }

    // Expand inner enclosing flat visual frames (innermost -> outermost), keep parallel columns aligned,
    // push footer bars cleanly below them, and then expand full-canvas wrapper frames around everything.
    if (innerEnclosingFrames.length > 0) {
      const sortedInner = [...innerEnclosingFrames].sort((a, b) => a.w * a.h - b.w * b.h);
      const prevInnerBottom = Math.max(...sortedInner.map((f) => f.absY + f.h));
      let runningRequiredBottom = absY + h;

      for (const frame of sortedInner) {
        const origTop = frame.absY;
        const origH = frame.h;
        const neededBottom = runningRequiredBottom + 18;
        if (neededBottom > frame.absY + frame.h) {
          const newH = Math.ceil(neededBottom - frame.absY);
          frame.h = newH;
          // Keep parallel sibling column frames with identical [absY, h] aligned flush
          for (const sibCol of state.cells) {
            if (
              sibCol.id !== frame.id &&
              !innerEnclosingIds.has(sibCol.id) &&
              !isFullCanvasWrapperCell(sibCol, origCanvasW, origCanvasH) &&
              sibCol.h >= 240 &&
              Math.abs(sibCol.absY - origTop) <= 4 &&
              Math.abs(sibCol.h - origH) <= 4
            ) {
              sibCol.h = newH;
            }
          }
        }
        runningRequiredBottom = frame.absY + frame.h;
      }

      const newInnerBottom = Math.max(...sortedInner.map((f) => f.absY + f.h));
      const innerGrow = Math.max(0, newInnerBottom - prevInnerBottom);
      if (innerGrow > 0) {
        for (const c of state.cells) {
          if (
            !innerEnclosingIds.has(c.id) &&
            !isFullCanvasWrapperCell(c, origCanvasW, origCanvasH) &&
            (isFooterBarCell(c, origCanvasW, origCanvasH) || c.absY >= prevInnerBottom - 4)
          ) {
            c.absY += innerGrow;
            if (c.parent === '1') c.relY = c.absY;
          }
        }
      }
    }

    // Expand immediate parent container if the new node extends below/right of its bounds
    if (parentZone) {
      if (absX + w + 14 > parentZone.absX + parentZone.w) {
        parentZone.w = absX + w + 14 - parentZone.absX;
      }
      if (absY + h + 14 > parentZone.absY + parentZone.h) {
        parentZone.h = absY + h + 14 - parentZone.absY;
      }
    }

    const fill = sanitizeHex(nOp.fillHex, '#FFFFFF');
    const stroke = sanitizeHex(nOp.strokeHex, '#0F172A');
    const iconUri = resolveFreeformIconDataUri(nOp.label, nOp.iconKey);
    const useNativeOverlaidBadge = Boolean(!parentZone && w >= 340 && h >= 88 && iconUri);
    const fontSize = w >= 340 ? 13.5 : 12;

    const styleParts = [
      'rounded=1',
      'arcSize=8',
      'whiteSpace=wrap',
      'html=1',
      `fillColor=${fill}`,
      `strokeColor=${stroke}`,
      'strokeWidth=1.5',
      'fontFamily=Inter,Arial,sans-serif',
      'verticalAlign=middle',
      'align=center',
    ];
    if (useNativeOverlaidBadge) {
      styleParts.push('spacingLeft=62', 'spacingRight=12');
    }

    state.cells.push({
      id,
      parent: parentZone ? parentZone.id : '1',
      value: buildCardValueHtml(
        nOp.label,
        nOp.sublabel,
        useNativeOverlaidBadge ? null : iconUri,
        fontSize,
        useNativeOverlaidBadge ? 'native_spacing' : 'none'
      ),
      plainLabel: nOp.label,
      style: `${styleParts.join(';')};`,
      isContainer: false,
      relX: parentZone ? absX - parentZone.absX : absX,
      relY: parentZone ? absY - parentZone.absY : absY,
      absX,
      absY,
      w,
      h,
    });

    if (useNativeOverlaidBadge && iconUri) {
      const iconSize = 38;
      const iconX = absX + 16;
      const iconY = absY + Math.round((h - iconSize) / 2);
      state.cells.push({
        id: `${id}_i`,
        parent: '1',
        value: '',
        plainLabel: '',
        style: `shape=image;verticalLabelPosition=bottom;verticalAlign=top;imageAspect=0;aspect=fixed;image=${iconUri};`,
        isContainer: false,
        relX: iconX,
        relY: iconY,
        absX: iconX,
        absY: iconY,
        w: iconSize,
        h: iconSize,
      });
    }
  }

  // Helper to recursively expand ancestor containers so child moves/additions never escape parent bounds
  const expandAncestorsToContain = (cell: SpatialCellRecord) => {
    let curr: SpatialCellRecord | undefined = cell;
    const visited = new Set<string>();
    while (curr && curr.parent && curr.parent !== '1' && curr.parent !== '0' && !visited.has(curr.parent)) {
      visited.add(curr.parent);
      const p = findCell(curr.parent);
      if (!p) break;
      const neededRight = curr.absX + curr.w + 18;
      const neededBottom = curr.absY + curr.h + 18;
      if (curr.absX < p.absX + 12) {
        const shiftLeft = p.absX + 12 - curr.absX;
        p.absX = Math.max(16, p.absX - shiftLeft);
        p.relX = p.parent === '1' ? p.absX : p.relX - shiftLeft;
        p.w += shiftLeft;
      }
      if (curr.absY < p.absY + 38) {
        curr.absY = p.absY + 40;
      }
      if (neededRight > p.absX + p.w) {
        p.w = Math.ceil(neededRight - p.absX);
      }
      if (neededBottom > p.absY + p.h) {
        p.h = Math.ceil(neededBottom - p.absY);
      }
      curr.relX = Math.round(curr.absX - p.absX);
      curr.relY = Math.round(curr.absY - p.absY);
      curr = p;
    }
  };

  // 4. Modify existing cells in place (including movePlacement / moveAnchorId + edge waypoint refresh!)
  const movedCellIds = new Set<string>();
  for (const mOp of plan.modifyCells || []) {
    const target = findCell(mOp.id);
    if (!target) continue;
    if (mOp.newLabel && mOp.newLabel.trim()) {
      target.plainLabel = mOp.newLabel.trim();
      if (target.isContainer) {
        const strokeMatch = target.style.match(/strokeColor=(#[0-9a-fA-F]{6})/);
        const stroke = mOp.strokeHex || strokeMatch?.[1] || '#64748B';
        target.value = buildZoneHeaderHtml(target.plainLabel, stroke);
      } else {
        // Detect if target already has a dedicated overlaid icon badge (`sys_gov_i`, `mc1_i`, `l1_i`, `ic_*`)
        const overlaidIcon = state.cells.find(
          (b) =>
            b.id !== target.id &&
            isIconOverlayBadgeCell(b) &&
            b.absX >= target.absX - 2 &&
            b.absX + b.w <= target.absX + target.w + 2 &&
            b.absY >= target.absY - 2 &&
            b.absY + b.h <= target.absY + target.h + 2
        );
        const hasNativeSpacingLeft = /\bspacingLeft=[1-9]\d*/.test(target.style);
        let overlayLayout: 'none' | 'left' | 'top' | 'native_spacing' = 'none';
        if (overlaidIcon) {
          if (hasNativeSpacingLeft) {
            overlayLayout = 'native_spacing';
          } else {
            overlayLayout =
              overlaidIcon.absX - target.absX < target.w * 0.28 ? 'left' : 'top';
          }
        }
        const iconUri = overlaidIcon ? null : resolveFreeformIconDataUri(target.plainLabel);
        target.value = buildCardValueHtml(
          target.plainLabel,
          mOp.newSublabel,
          iconUri,
          target.w >= 340 ? 13.5 : 12,
          overlayLayout
        );
      }
    }
    if (mOp.fillHex) {
      const f = sanitizeHex(mOp.fillHex, '#FFFFFF');
      target.style = /fillColor=[^;]+/.test(target.style)
        ? target.style.replace(/fillColor=[^;]+/, `fillColor=${f}`)
        : `${target.style}fillColor=${f};`;
    }
    if (mOp.strokeHex) {
      const s = sanitizeHex(mOp.strokeHex, '#64748B');
      target.style = /strokeColor=[^;]+/.test(target.style)
        ? target.style.replace(/strokeColor=[^;]+/, `strokeColor=${s}`)
        : `${target.style}strokeColor=${s};`;
    }

    // Spatial movePlacement / moveAnchorId implementation
    if (mOp.movePlacement) {
      const anchor = mOp.moveAnchorId ? findCell(mOp.moveAnchorId) : undefined;
      const gap = 28;
      let newAbsX = target.absX;
      let newAbsY = target.absY;
      let newParentId = target.parent;

      if (anchor && anchor.id !== target.id) {
        if (mOp.movePlacement === 'right_of') {
          newAbsX = Math.round(anchor.absX + anchor.w + gap);
          newAbsY = Math.round(anchor.absY + (anchor.h - target.h) / 2);
          if (!target.isContainer && anchor.parent && anchor.parent !== '0') {
            newParentId = anchor.parent;
          }
        } else if (mOp.movePlacement === 'left_of') {
          newAbsX = Math.max(24, Math.round(anchor.absX - target.w - gap));
          newAbsY = Math.round(anchor.absY + (anchor.h - target.h) / 2);
          if (!target.isContainer && anchor.parent && anchor.parent !== '0') {
            newParentId = anchor.parent;
          }
        } else if (mOp.movePlacement === 'below') {
          newAbsX = Math.round(anchor.absX + (anchor.w - target.w) / 2);
          newAbsY = Math.round(anchor.absY + anchor.h + gap);
          if (!target.isContainer && anchor.parent && anchor.parent !== '0') {
            newParentId = anchor.parent;
          }
        } else if (mOp.movePlacement === 'above') {
          newAbsX = Math.round(anchor.absX + (anchor.w - target.w) / 2);
          newAbsY = Math.max(24, Math.round(anchor.absY - target.h - gap));
          if (!target.isContainer && anchor.parent && anchor.parent !== '0') {
            newParentId = anchor.parent;
          }
        } else if (mOp.movePlacement === 'inside') {
          newParentId = anchor.id;
          const existingKids = state.cells.filter((c) => c.parent === anchor.id && c.id !== target.id && !c.isContainer);
          if (existingKids.length > 0) {
            const rightmost = existingKids.reduce((best, k) => (k.absX + k.w > best.absX + best.w ? k : best), existingKids[0]);
            newAbsX = Math.round(rightmost.absX + rightmost.w + 22);
            newAbsY = Math.round(rightmost.absY);
          } else {
            newAbsX = Math.round(anchor.absX + 20);
            newAbsY = Math.round(anchor.absY + 46);
          }
        }
      } else {
        // Fallback directional shift when anchor is omitted
        if (mOp.movePlacement === 'right_of') newAbsX += target.w + gap;
        else if (mOp.movePlacement === 'left_of') newAbsX = Math.max(24, newAbsX - target.w - gap);
        else if (mOp.movePlacement === 'below') newAbsY += target.h + gap;
        else if (mOp.movePlacement === 'above') newAbsY = Math.max(24, newAbsY - target.h - gap);
      }

      // Collision-avoidance nudge against other leaf cells
      if (!target.isContainer) {
        for (let guard = 0; guard < 10; guard++) {
          const hit = state.cells.find(
            (c) =>
              c.id !== target.id &&
              !c.isContainer &&
              newAbsX < c.absX + c.w + 10 &&
              newAbsX + target.w + 10 > c.absX &&
              newAbsY < c.absY + c.h + 10 &&
              newAbsY + target.h + 10 > c.absY
          );
          if (!hit) break;
          newAbsX = Math.round(hit.absX + hit.w + 18);
        }
      }

      const deltaX = newAbsX - target.absX;
      const deltaY = newAbsY - target.absY;
      target.absX = newAbsX;
      target.absY = newAbsY;
      target.parent = newParentId;
      const parentObj = newParentId && newParentId !== '1' ? findCell(newParentId) : undefined;
      target.relX = parentObj ? Math.round(target.absX - parentObj.absX) : target.absX;
      target.relY = parentObj ? Math.round(target.absY - parentObj.absY) : target.absY;

      // If moving a container, translate its descendants' absolute coordinates in lockstep
      if (target.isContainer && (deltaX !== 0 || deltaY !== 0)) {
        const shiftDescendants = (parentId: string) => {
          for (const kid of state.cells) {
            if (kid.parent === parentId) {
              kid.absX += deltaX;
              kid.absY += deltaY;
              movedCellIds.add(kid.id);
              if (kid.isContainer) shiftDescendants(kid.id);
            }
          }
        };
        shiftDescendants(target.id);
      }

      movedCellIds.add(target.id);
      expandAncestorsToContain(target);
    }
  }

  // Re-route any edges incident to moved cells so waypoints never point to stale coordinates
  if (movedCellIds.size > 0) {
    for (const edge of state.edges) {
      if (movedCellIds.has(edge.source) || movedCellIds.has(edge.target)) {
        const src = findCell(edge.source);
        const tgt = findCell(edge.target);
        if (src && tgt) {
          const isDashed = edge.style.includes('dashed=1');
          const isBidir = edge.style.includes('startArrow=') && !edge.style.includes('startArrow=none');
          const strokeMatch = edge.style.match(/strokeColor=(#[0-9a-fA-F]{6})/);
          const recomputed = computeSimpleOrthogonalEdgeStyle(
            src,
            tgt,
            {
              dashed: isDashed,
              bidirectional: isBidir,
              strokeHex: strokeMatch?.[1],
              hasLabel: Boolean(edge.plainLabel),
            },
            state.cells,
            origCanvasW,
            origCanvasH
          );
          edge.style = recomputed.style;
          edge.points = recomputed.points;
        }
      }
    }
  }

  // 5. Add explicitly requested edges — mechanically normalizing vertical-stack skip-loops
  // into single clean adjacent stack connectors (zero right-border spaghetti or piled-up labels!)
  let rightGutterLane = 0;
  const seenDirectedPairs = new Set<string>(
    state.edges
      .filter((e) => e.source && e.target)
      .map((e) => `${e.source}->${e.target}`)
  );

  for (const eOp of plan.addEdges || []) {
    let src = findCell(eOp.source);
    let tgt = findCell(eOp.target);
    if (!src || !tgt || src.id === tgt.id) continue;

    const sCx = src.absX + src.w / 2;
    const tCx = tgt.absX + tgt.w / 2;

    // Vertical stack normalization: if src & tgt sit in the same vertical column,
    // snap any skip-level loop (`mc2 -> eu_ai_act`) to the immediate adjacent neighbor (`sys_gov -> eu_ai_act`)
    // and draw a clean straight center-line vertical arrow matching native C4 stack connectors!
    if (Math.abs(sCx - tCx) < 60 && Math.abs(src.w - tgt.w) < 80) {
      const colCards = state.cells
        .filter(
          (c) =>
            !c.isContainer &&
            !isFullCanvasWrapperCell(c, origCanvasW, origCanvasH) &&
            !isVisualZoneFrameCell(c, state.cells, origCanvasW, origCanvasH) &&
            !isFooterBarCell(c, origCanvasW, origCanvasH) &&
            !isIconOverlayBadgeCell(c) &&
            !isHeaderBannerOrPillCell(c) &&
            Math.abs(c.absX + c.w / 2 - sCx) < 60 &&
            Math.abs(c.w - src!.w) < 80
        )
        .sort((a, b) => a.absY - b.absY);

      const lower = src.absY > tgt.absY ? src : tgt;
      const lowerIdx = colCards.findIndex((c) => c.id === lower.id);
      if (lowerIdx > 0) {
        const adjUpper = colCards[lowerIdx - 1];
        src = adjUpper;
        tgt = lower;
      }

      const pairKey = `${src.id}->${tgt.id}`;
      const revKey = `${tgt.id}->${src.id}`;
      if (seenDirectedPairs.has(pairKey) || seenDirectedPairs.has(revKey)) {
        continue;
      }
      seenDirectedPairs.add(pairKey);

      // Detect if stack sits inside a dark/saturated blue container (`#2563EB`, `#1D4ED8`, `#1E40AF`)
      const darkBlueFrame = state.cells.find(
        (f) =>
          f.id !== src!.id &&
          f.id !== tgt!.id &&
          /fillColor=#(2563EB|1D4ED8|1E40AF|1E3A8A|0284C7)/i.test(f.style) &&
          src!.absX >= f.absX - 4 &&
          src!.absX + src!.w <= f.absX + f.w + 4 &&
          src!.absY >= f.absY - 4 &&
          tgt!.absY + tgt!.h <= f.absY + f.h + 4
      );
      const stackStroke = darkBlueFrame ? '#FFFFFF' : sanitizeHex(eOp.strokeHex, '#334155');
      const vGap = Math.max(0, tgt.absY - (src.absY + src.h));
      const keepShortLabel = vGap >= 48 && Boolean(eOp.label?.trim());
      const id = eOp.id || `e_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;

      state.edges.push({
        id,
        source: src.id,
        target: tgt.id,
        value: keepShortLabel
          ? `<div style="display:inline-block;max-width:110px;white-space:normal;text-align:center;line-height:1.15;padding:2px 5px;background:#FFFFFF;border:1px solid #CBD5E1;border-radius:4px;font-size:9.5px;font-weight:600;color:#1E293B;">${escapeHtmlText(
              eOp.label!.trim()
            )}</div>`
          : '',
        plainLabel: keepShortLabel ? eOp.label!.trim() : '',
        style: `edgeStyle=none;html=1;strokeColor=${stackStroke};strokeWidth=2;exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;endArrow=block;endFill=1;`,
        points: [],
      });
      continue;
    }

    // Skip redundant cross-column connector if either endpoint is an external C4 actor/sink that
    // ALREADY has a dedicated point-to-point C4 boundary interface arrow (`e_l1..e_l4`, `e_r1..e_r3`)
    const alreadyWiredViaPointBoundary = [src, tgt].some((card) =>
      state.edges.some((pe) => {
        if (!pe.sourcePoint || !pe.targetPoint) return false;
        const srcTouches =
          (Math.abs(pe.sourcePoint.x - card.absX) <= 8 ||
            Math.abs(pe.sourcePoint.x - (card.absX + card.w)) <= 8) &&
          pe.sourcePoint.y >= card.absY - 6 &&
          pe.sourcePoint.y <= card.absY + card.h + 6;
        const tgtTouches =
          (Math.abs(pe.targetPoint.x - card.absX) <= 8 ||
            Math.abs(pe.targetPoint.x - (card.absX + card.w)) <= 8) &&
          pe.targetPoint.y >= card.absY - 6 &&
          pe.targetPoint.y <= card.absY + card.h + 6;
        return srcTouches || tgtTouches;
      })
    );
    if (alreadyWiredViaPointBoundary) {
      continue;
    }

    const pairKey = `${src.id}->${tgt.id}`;
    if (seenDirectedPairs.has(pairKey)) continue;
    seenDirectedPairs.add(pairKey);

    const id = eOp.id || `e_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    const rawLbl = (eOp.label || '').trim();
    const compactLbl =
      rawLbl.split(/\s+/).length > 4
        ? rawLbl.split(/\s+/).slice(0, 4).join(' ')
        : rawLbl;
    const hasLabel = Boolean(compactLbl);
    const { style, points, offsetPoint } = computeSimpleOrthogonalEdgeStyle(
      src,
      tgt,
      {
        dashed: eOp.dashed,
        bidirectional: eOp.bidirectional,
        strokeHex: eOp.strokeHex,
        hasLabel,
        laneIndex: rightGutterLane,
      },
      state.cells,
      origCanvasW,
      origCanvasH
    );
    if (points.length === 2 && points[0].x === points[1].x && points[0].x > Math.max(src.absX + src.w, tgt.absX + tgt.w)) {
      rightGutterLane++;
    }
    const labelHtml = hasLabel
      ? `<div style="display:inline-block;max-width:112px;white-space:normal;text-align:center;line-height:1.15;padding:2px 5px;background:#FFFFFF;border:1px solid #CBD5E1;border-radius:4px;font-size:9.5px;font-weight:600;color:#1E293B;">${escapeHtmlText(compactLbl)}</div>`
      : '';
    state.edges.push({
      id,
      source: src.id,
      target: tgt.id,
      value: labelHtml,
      plainLabel: compactLbl,
      style,
      points,
      offsetPoint,
    });
  }

  // Ensure every cell's ancestor containers enclose it cleanly before serializing
  for (const c of state.cells) {
    if (c.parent && c.parent !== '1' && c.parent !== '0') {
      expandAncestorsToContain(c);
    }
  }

  // Expand full-canvas wrapper frames (`bg_frame`, `canvas_frame`) around all content + shifted footers
  const fullWrappers = state.cells.filter((c) =>
    isFullCanvasWrapperCell(c, origCanvasW, origCanvasH)
  );
  if (fullWrappers.length > 0) {
    const wrapperIds = new Set(fullWrappers.map((w) => w.id));
    let maxContentRight = 0;
    let maxContentBottom = 0;
    for (const c of state.cells) {
      if (wrapperIds.has(c.id)) continue;
      maxContentRight = Math.max(maxContentRight, c.absX + c.w);
      maxContentBottom = Math.max(maxContentBottom, c.absY + c.h);
    }
    for (const wrapper of fullWrappers) {
      if (maxContentRight + 16 > wrapper.absX + wrapper.w) {
        wrapper.w = Math.ceil(maxContentRight + 16 - wrapper.absX);
      }
      if (maxContentBottom + 14 > wrapper.absY + wrapper.h) {
        wrapper.h = Math.ceil(maxContentBottom + 14 - wrapper.absY);
      }
    }
  }

  // Expand canvas bounds if any added/moved cell or wrapper exceeded pageWidth/pageHeight
  for (const c of state.cells) {
    if (c.absX + c.w + 16 > state.canvasW) state.canvasW = Math.ceil(c.absX + c.w + 16);
    if (c.absY + c.h + 16 > state.canvasH) state.canvasH = Math.ceil(c.absY + c.h + 16);
  }

  const updatedXml = serializeSpatialStateToDrawioXml(state);
  const stats = computeSpatialAuditMetrics(state);

  return {
    xml: updatedXml,
    title: state.title,
    summaryOfChanges:
      plan.summaryOfChanges || `Updated Draw.io diagram directly for: "${modificationPrompt}"`,
    modelUsed: actualModel,
    stats,
  };
}
