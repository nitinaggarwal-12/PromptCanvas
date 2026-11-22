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
  source: string;
  target: string;
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
      if (!source || !target) continue;
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
        source,
        target,
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

export function buildCardValueHtml(
  label: string,
  sublabel?: string,
  iconUri?: string | null,
  fontSize = 11
): string {
  const safeLabel = escapeHtmlText(label);
  const safeSub = sublabel ? escapeHtmlText(sublabel) : '';
  const textBlock = safeSub
    ? `<div style="line-height:1.2;"><div style="font-weight:700;font-size:${fontSize}px;color:#0F172A;">${safeLabel}</div><div style="font-size:${Math.max(9, fontSize - 2)}px;color:#475569;margin-top:2px;">${safeSub}</div></div>`
    : `<div style="font-weight:700;font-size:${fontSize}px;color:#0F172A;line-height:1.22;">${safeLabel}</div>`;

  if (iconUri) {
    return `<div style="display:flex;align-items:center;gap:7px;padding:2px 6px;text-align:left;"><img src="${iconUri}" width="20" height="20" style="flex-shrink:0;"/>${textBlock}</div>`;
  }
  return `<div style="padding:2px 6px;text-align:center;">${textBlock}</div>`;
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
  const containers = state.cells
    .filter((c) => c.isContainer)
    .sort((a, b) => b.w * b.h - a.w * a.h);
  const leaves = state.cells.filter((c) => !c.isContainer);

  const cellMap = new Map<string, SpatialCellRecord>();
  for (const c of state.cells) cellMap.set(c.id, c);

  const lines: string[] = [];
  lines.push(
    `<mxfile host="app.diagrams.net" agent="PromptCanvas-DirectSpatial" version="24.7.17" data-prompt-to-diagram="true">`
  );
  lines.push(
    `  <diagram id="p2d_canvas" name="${escapeXmlAttr(state.title)}">`
  );
  lines.push(
    `    <mxGraphModel dx="${state.canvasW}" dy="${state.canvasH}" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="${state.canvasW}" pageHeight="${state.canvasH}" background="#FFFFFF" math="0" shadow="0" data-prompt-to-diagram="true">`
  );
  lines.push(`      <root>`);
  lines.push(`        <mxCell id="0" />`);
  lines.push(`        <mxCell id="1" parent="0" />`);

  for (const c of [...containers, ...leaves]) {
    const parentCell = c.parent && c.parent !== '1' ? cellMap.get(c.parent) : undefined;
    const parentId = parentCell ? parentCell.id : '1';
    const relX = parentCell ? Math.round(c.absX - parentCell.absX) : Math.round(c.absX);
    const relY = parentCell ? Math.round(c.absY - parentCell.absY) : Math.round(c.absY);
    lines.push(
      `        <mxCell id="${escapeXmlAttr(c.id)}" value="${escapeXmlAttr(c.value)}" style="${escapeXmlAttr(c.style)}" vertex="1" parent="${escapeXmlAttr(parentId)}">`
    );
    lines.push(
      `          <mxGeometry x="${relX}" y="${relY}" width="${Math.round(c.w)}" height="${Math.round(c.h)}" as="geometry" />`
    );
    lines.push(`        </mxCell>`);
  }

  for (const e of state.edges) {
    if (!cellMap.has(e.source) || !cellMap.has(e.target)) continue;
    lines.push(
      `        <mxCell id="${escapeXmlAttr(e.id)}" value="${escapeXmlAttr(e.value)}" style="${escapeXmlAttr(e.style)}" edge="1" parent="1" source="${escapeXmlAttr(e.source)}" target="${escapeXmlAttr(e.target)}">`
    );
    if (e.points && e.points.length > 0) {
      lines.push(`          <mxGeometry relative="1" as="geometry">`);
      lines.push(`            <Array as="points">`);
      for (const pt of e.points) {
        lines.push(`              <mxPoint x="${Math.round(pt.x)}" y="${Math.round(pt.y)}" />`);
      }
      lines.push(`            </Array>`);
      if (e.plainLabel) {
        lines.push(`            <mxPoint x="0" y="-2" as="offset" />`);
      }
      lines.push(`          </mxGeometry>`);
    } else if (e.plainLabel) {
      lines.push(`          <mxGeometry relative="1" as="geometry">`);
      lines.push(`            <mxPoint x="0" y="-2" as="offset" />`);
      lines.push(`          </mxGeometry>`);
    } else {
      lines.push(`          <mxGeometry relative="1" as="geometry" />`);
    }
    lines.push(`        </mxCell>`);
  }

  lines.push(`      </root>`);
  lines.push(`    </mxGraphModel>`);
  lines.push(`  </diagram>`);
  lines.push(`</mxfile>`);
  return lines.join('\n');
}

function computeSimpleOrthogonalEdgeStyle(
  src: SpatialCellRecord,
  tgt: SpatialCellRecord,
  opts: { dashed?: boolean; bidirectional?: boolean; strokeHex?: string }
): { style: string; points: Array<{ x: number; y: number }> } {
  const sCx = src.absX + src.w / 2;
  const sCy = src.absY + src.h / 2;
  const tCx = tgt.absX + tgt.w / 2;
  const tCy = tgt.absY + tgt.h / 2;
  const dx = tCx - sCx;
  const dy = tCy - sCy;

  let exitX = 1;
  let exitY = 0.5;
  let entryX = 0;
  let entryY = 0.5;
  const points: Array<{ x: number; y: number }> = [];

  if (Math.abs(dx) >= Math.abs(dy)) {
    if (dx >= 0) {
      exitX = 1;
      exitY = 0.5;
      entryX = 0;
      entryY = 0.5;
      if (Math.abs(sCy - tCy) > 10) {
        const midX = Math.round((src.absX + src.w + tgt.absX) / 2);
        points.push({ x: midX, y: Math.round(sCy) }, { x: midX, y: Math.round(tCy) });
      }
    } else {
      exitX = 0;
      exitY = 0.5;
      entryX = 1;
      entryY = 0.5;
      if (Math.abs(sCy - tCy) > 10) {
        const midX = Math.round((src.absX + tgt.absX + tgt.w) / 2);
        points.push({ x: midX, y: Math.round(sCy) }, { x: midX, y: Math.round(tCy) });
      }
    }
  } else {
    if (dy >= 0) {
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
    'fontSize=10',
    'fontColor=#1E293B',
    'labelBackgroundColor=#FFFFFF',
  ];

  return { style: `${styleParts.join(';')};`, points };
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
  const containers = state.cells.filter((c) => c.isContainer);
  const leaves = state.cells.filter((c) => !c.isContainer);

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

  const compactZones = state.cells
    .filter((c) => c.isContainer)
    .map((z) => ({
      id: z.id,
      label: z.plainLabel,
      parent: z.parent,
      rect: [Math.round(z.absX), Math.round(z.absY), Math.round(z.w), Math.round(z.h)],
    }));

  const compactNodes = state.cells
    .filter((c) => !c.isContainer)
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
3. Never invent boilerplate subtitles or fake disconnected edges.`;

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
    edges: stateInput.edges.map((e) => ({ ...e, points: e.points.map((pt) => ({ ...pt })) })),
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
  for (const nOp of plan.addNodes || []) {
    const id = nOp.id || `n_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    if (findCell(id)) continue;
    const parentZone =
      nOp.parentZoneId && nOp.parentZoneId !== '1' ? findCell(nOp.parentZoneId) : undefined;
    const anchor = findCell(nOp.anchorId);
    const secondAnchor = findCell(nOp.secondAnchorId);

    // Match existing sibling dimensions in the same zone when available
    const siblings = state.cells.filter(
      (c) => !c.isContainer && c.parent === (parentZone ? parentZone.id : '1')
    );
    const refSibling = anchor && !anchor.isContainer ? anchor : siblings[0];
    const w = refSibling ? Math.round(refSibling.w) : 176;
    const h = refSibling ? Math.round(refSibling.h) : 48;

    let absX = parentZone ? parentZone.absX + 18 : 80;
    let absY = parentZone ? parentZone.absY + 44 : 100;

    if (nOp.placement === 'between' && anchor && secondAnchor) {
      absX = Math.round((anchor.absX + secondAnchor.absX) / 2);
      absY = Math.round((anchor.absY + secondAnchor.absY) / 2);
    } else if (anchor && !anchor.isContainer) {
      if (nOp.placement === 'above') {
        absX = anchor.absX;
        absY = Math.max(20, anchor.absY - h - 14);
      } else if (nOp.placement === 'right_of') {
        absX = anchor.absX + anchor.w + 18;
        absY = anchor.absY;
      } else if (nOp.placement === 'left_of') {
        absX = Math.max(20, anchor.absX - w - 18);
        absY = anchor.absY;
      } else {
        absX = anchor.absX;
        absY = anchor.absY + anchor.h + 14;
      }
    } else if (parentZone) {
      if (siblings.length > 0) {
        const lowest = siblings.reduce((acc, s) => (s.absY + s.h > acc.absY + acc.h ? s : acc), siblings[0]);
        absX = lowest.absX;
        absY = lowest.absY + lowest.h + 12;
      } else {
        absX = parentZone.absX + Math.max(14, Math.round((parentZone.w - w) / 2));
        absY = parentZone.absY + 42;
      }
    }

    // Nudge locally if overlapping an existing leaf node
    for (let guard = 0; guard < 8; guard++) {
      const hit = state.cells.find(
        (c) =>
          !c.isContainer &&
          absX < c.absX + c.w + 8 &&
          absX + w + 8 > c.absX &&
          absY < c.absY + c.h + 8 &&
          absY + h + 8 > c.absY
      );
      if (!hit) break;
      absY = hit.absY + hit.h + 12;
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
    const stroke = sanitizeHex(nOp.strokeHex, '#CBD5E1');
    const iconUri = resolveFreeformIconDataUri(nOp.label, nOp.iconKey);
    const style = [
      'rounded=1',
      'arcSize=10',
      'whiteSpace=wrap',
      'html=1',
      `fillColor=${fill}`,
      `strokeColor=${stroke}`,
      'strokeWidth=1.3',
      'verticalAlign=middle',
      'align=center',
    ].join(';') + ';';

    state.cells.push({
      id,
      parent: parentZone ? parentZone.id : '1',
      value: buildCardValueHtml(nOp.label, nOp.sublabel, iconUri, 11),
      plainLabel: nOp.label,
      style,
      isContainer: false,
      relX: parentZone ? absX - parentZone.absX : absX,
      relY: parentZone ? absY - parentZone.absY : absY,
      absX,
      absY,
      w,
      h,
    });
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
        const iconUri = resolveFreeformIconDataUri(target.plainLabel);
        target.value = buildCardValueHtml(target.plainLabel, mOp.newSublabel, iconUri, 11);
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
          const recomputed = computeSimpleOrthogonalEdgeStyle(src, tgt, {
            dashed: isDashed,
            bidirectional: isBidir,
            strokeHex: strokeMatch?.[1],
          });
          edge.style = recomputed.style;
          edge.points = recomputed.points;
        }
      }
    }
  }

  // 5. Add explicitly requested edges (ZERO synthetic auto-edges)
  for (const eOp of plan.addEdges || []) {
    const src = findCell(eOp.source);
    const tgt = findCell(eOp.target);
    if (!src || !tgt || src.id === tgt.id) continue;
    const id = eOp.id || `e_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    const { style, points } = computeSimpleOrthogonalEdgeStyle(src, tgt, {
      dashed: eOp.dashed,
      bidirectional: eOp.bidirectional,
      strokeHex: eOp.strokeHex,
    });
    const labelHtml = eOp.label?.trim()
      ? `<span style="padding:0 3px;background:#FFFFFF;">${escapeHtmlText(eOp.label.trim())}</span>`
      : '';
    state.edges.push({
      id,
      source: src.id,
      target: tgt.id,
      value: labelHtml,
      plainLabel: eOp.label?.trim() || '',
      style,
      points,
    });
  }

  // Ensure every cell's ancestor containers enclose it cleanly before serializing
  for (const c of state.cells) {
    if (c.parent && c.parent !== '1' && c.parent !== '0') {
      expandAncestorsToContain(c);
    }
  }

  // Expand canvas bounds if any added/moved cell exceeded pageWidth/pageHeight
  for (const c of state.cells) {
    if (c.absX + c.w + 32 > state.canvasW) state.canvasW = Math.ceil(c.absX + c.w + 32);
    if (c.absY + c.h + 32 > state.canvasH) state.canvasH = Math.ceil(c.absY + c.h + 32);
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
