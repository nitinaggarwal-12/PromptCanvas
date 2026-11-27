import { XMLParser } from 'fast-xml-parser';
import { findTopAlignedLeafCardIds } from '../leafVerticalAlignment';
import { findFosterParentedTableCells } from '../htmlTableSanitizer';

export type ErrorCode =
  | 'XML_INVALID'
  | 'EDGE_DANGLING'
  | 'GEOMETRY_MISSING'
  | 'OVERLAP'
  | 'OUT_OF_CONTAINER'
  | 'OUT_OF_BOUNDS'
  | 'ORPHAN_NODE'
  | 'DATA_STORE_DISCONNECTED'
  | 'FLOW_BACKTRACKING_DETECTED'
  | 'CLOSED_LOOP_MISSING_EDGE'
  | 'NON_ORTHOGONAL_EDGE_SEGMENT'
  | 'CONTAINER_HEADER_SLICED'
  | 'EDGE_INTERSECTS_VERTEX'
  | 'TEXT_OVERFLOW_HEIGHT'
  | 'DEAD_RIGHT_MARGIN'
  | 'EDGE_LABEL_MISSING_PILL'
  | 'DECISION_GATE_INCOMPLETE'
  | 'CDN_CACHE_INVERTED_ROUTING'
  | 'UNCONNECTED_LOAD_BALANCER'
  | 'RELATIONAL_REPLICATION_PIPELINE'
  | 'LEAF_TOP_ALIGNED_EMPTY_SPACE'
  | 'HTML_FOSTER_PARENTING_IN_TABLE'
  | 'BROKEN_IMAGE_ASSET'
  | 'UNESCAPED_PSEUDO_HTML_TAG'
  | 'LOW_COLOR_CONTRAST';

export interface ValidationError {
  code: ErrorCode;
  cells: string[];
  detail: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
}

interface ParsedVertex {
  id: string;
  parent: string;
  isContainer: boolean;
  isLabelOrHeader: boolean;
  isShadowOrAccent: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  absX: number;
  absY: number;
  label?: string;
  style?: string;
}

interface ParsedEdge {
  id: string;
  source: string;
  target: string;
  hasSourcePoint?: boolean;
  hasTargetPoint?: boolean;
  sourcePoint?: { x: number; y: number };
  targetPoint?: { x: number; y: number };
  label?: string;
  style?: string;
  points?: { x: number; y: number }[];
  exitX?: number;
  exitY?: number;
  entryX?: number;
  entryY?: number;
}

const VALID_HTML_SVG_TAGS = new Set([
  'div', 'span', 'b', 'strong', 'i', 'em', 'u', 's', 'sub', 'sup', 'br', 'hr',
  'p', 'ul', 'ol', 'li', 'table', 'thead', 'tbody', 'tfoot', 'tr', 'td', 'th',
  'colgroup', 'col', 'font', 'img', 'a', 'code', 'pre', 'small', 'blockquote',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'center', 'nobr', 'wbr',
  'svg', 'g', 'path', 'rect', 'circle', 'ellipse', 'line', 'polyline', 'polygon',
  'defs', 'lineargradient', 'radialgradient', 'stop', 'clippath', 'mask', 'text',
  'tspan', 'title', 'desc', 'style', 'use', 'symbol', 'pattern', 'filter',
  'fedropshadow', 'fegaussianblur', 'feoffset', 'femerge', 'femergenode',
]);

function parseHexRgb(hex: string): [number, number, number] | null {
  const cleaned = String(hex || '').trim().replace(/^#/, '');
  if (/^[0-9a-fA-F]{3}$/.test(cleaned)) {
    return [
      parseInt(cleaned[0] + cleaned[0], 16),
      parseInt(cleaned[1] + cleaned[1], 16),
      parseInt(cleaned[2] + cleaned[2], 16),
    ];
  }
  if (/^[0-9a-fA-F]{6}$/.test(cleaned)) {
    return [
      parseInt(cleaned.slice(0, 2), 16),
      parseInt(cleaned.slice(2, 4), 16),
      parseInt(cleaned.slice(4, 6), 16),
    ];
  }
  return null;
}

function relativeLuminance([r, g, b]: [number, number, number]): number {
  const chan = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * chan(r) + 0.7152 * chan(g) + 0.0722 * chan(b);
}

export function computeWcagContrastRatio(hexA: string, hexB: string): number | null {
  const rgbA = parseHexRgb(hexA);
  const rgbB = parseHexRgb(hexB);
  if (!rgbA || !rgbB) return null;
  const lA = relativeLuminance(rgbA);
  const lB = relativeLuminance(rgbB);
  const lighter = Math.max(lA, lB);
  const darker = Math.min(lA, lB);
  return (lighter + 0.05) / (darker + 0.05);
}

function isBrokenImageUrl(urlRaw: string): boolean {
  const u = String(urlRaw || '').trim();
  if (!u || u === 'none') return true;
  if (u.startsWith('data:image/')) {
    return u.length < 28 || (!u.includes(',') && !u.includes('%'));
  }
  if (u.startsWith('https://') || u.startsWith('http://')) {
    return false;
  }
  if (u.startsWith('/')) {
    return /\s/.test(u);
  }
  // Bare relative filenames like `relative-icon.svg` or `missing.png` 404 inside Draw.io viewer
  return true;
}

export function findUnescapedPseudoHtmlTags(rawValue: string): string[] {
  if (!rawValue || !rawValue.includes('<')) return [];
  const found: string[] = [];
  const tagRegex = /<\/?([a-zA-Z][a-zA-Z0-9_.-]*)\b[^>]*>/g;
  let m: RegExpExecArray | null;
  while ((m = tagRegex.exec(rawValue)) !== null) {
    const tagName = m[1].toLowerCase();
    if (!VALID_HTML_SVG_TAGS.has(tagName)) {
      found.push(`<${m[1]}>`);
    }
  }
  return Array.from(new Set(found));
}

export function validateDrawioXml(xmlString: string): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];

  if (!xmlString || typeof xmlString !== 'string' || xmlString.trim().length === 0) {
    return {
      valid: false,
      errors: [{ code: 'XML_INVALID', cells: [], detail: 'XML input is empty' }],
      warnings: [],
    };
  }

  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
  });

  let parsed: any;
  try {
    parsed = parser.parse(xmlString);
  } catch (err: any) {
    return {
      valid: false,
      errors: [{ code: 'XML_INVALID', cells: [], detail: `XML Parse Failure: ${err?.message}` }],
      warnings: [],
    };
  }

  const mxfile = parsed?.mxfile;
  let diagrams = mxfile?.diagram;
  if (diagrams && !Array.isArray(diagrams)) {
    diagrams = [diagrams];
  }
  const firstDiagram = Array.isArray(diagrams) && diagrams.length > 0 ? diagrams[0] : (diagrams || mxfile);
  const graphModel = firstDiagram?.mxGraphModel || parsed?.mxGraphModel || parsed?.root?.mxGraphModel;
  const root = graphModel?.root || parsed?.root;

  if (!root) {
    return {
      valid: false,
      errors: [{ code: 'XML_INVALID', cells: [], detail: 'Missing mxGraphModel or root element' }],
      warnings: [],
    };
  }

  let rawCells = root.mxCell;
  if (!rawCells) {
    return {
      valid: false,
      errors: [{ code: 'XML_INVALID', cells: [], detail: 'Missing mxCell elements inside root' }],
      warnings: [],
    };
  }

  if (!Array.isArray(rawCells)) {
    rawCells = [rawCells];
  }

  const parentIds = new Set<string>();
  for (const cell of rawCells) {
    const p = cell['@_parent'];
    if (p && p !== '0' && p !== '1') {
      parentIds.add(p);
    }
  }

  const cellIdSet = new Set<string>();
  const duplicateIds: string[] = [];

  let hasCell0 = false;
  let hasCell1 = false;

  const verticesMap = new Map<string, ParsedVertex>();
  const edgesMap = new Map<string, ParsedEdge>();

  for (const cell of rawCells) {
    const id = cell['@_id'];
    if (!id) {
      errors.push({ code: 'XML_INVALID', cells: [], detail: 'Cell missing id attribute' });
      continue;
    }

    if (id === '0') hasCell0 = true;
    if (id === '1') hasCell1 = true;

    if (cellIdSet.has(id)) {
      duplicateIds.push(id);
    }
    cellIdSet.add(id);

    const isVertex = cell['@_vertex'] === '1' || cell['@_vertex'] === 1;
    const isEdge = cell['@_edge'] === '1' || cell['@_edge'] === 1;

    if (isVertex) {
      const parent = cell['@_parent'] || '1';
      const style = cell['@_style'] || '';
      const rawVal = String(cell['@_value'] || '');
      const isContainer =
        style.includes('container=1') ||
        style.includes('swimlane') ||
        style.includes('group') ||
        parentIds.has(id) ||
        ((id.startsWith('container_') ||
          id.startsWith('swimlane_') ||
          id.startsWith('grp_') ||
          id.startsWith('group_') ||
          id.startsWith('tier_') ||
          id.startsWith('zone_') ||
          id.startsWith('vpc_') ||
          id.startsWith('subnet_') ||
          id.startsWith('boundary_') ||
          id.startsWith('cluster_') ||
          id.startsWith('network_') ||
          id.startsWith('env_') ||
          id.includes('container') ||
          id.includes('cluster') ||
          id.includes('frame') ||
          id.includes('panel')) &&
          !id.endsWith('_box') &&
          !id.endsWith('_pill'));

      const isShadowOrAccent =
        id.includes('shadow') ||
        id.endsWith('_sh') ||
        id.endsWith('_bar') ||
        id.endsWith('_stripe') ||
        id.endsWith('_accent') ||
        (!rawVal.trim() && /opacity=(?:[0-4]?\d)\b/.test(style));

      const isLabelOrHeader =
        id.startsWith('lbl_') ||
        id.endsWith('_lbl') ||
        id.includes('_lbl_') ||
        id.startsWith('title_') ||
        id.endsWith('_title') ||
        id.startsWith('banner_') ||
        id.includes('banner') ||
        id.includes('boundary') ||
        id.startsWith('legend_') ||
        id.startsWith('leg_') ||
        id.startsWith('enabler_') ||
        id.startsWith('tech_') ||
        id.startsWith('meta_') ||
        id.startsWith('footer_') ||
        id.startsWith('ftr_') ||
        id.startsWith('watermark_') ||
        id.startsWith('callout_') ||
        id.startsWith('why_') ||
        id.startsWith('desc_') ||
        id.startsWith('bar_') ||
        id.startsWith('stage_') ||
        id.includes('badge') ||
        id.includes('pill') ||
        id.includes('tag') ||
        id.includes('icon') ||
        id.endsWith('_i') ||
        id.startsWith('ic_') ||
        id.includes('label') ||
        id.includes('tab') ||
        id.includes('hdr') ||
        style.includes('shape=image') ||
        style.includes('shape=text') ||
        style.includes('text;') ||
        (style.includes('fillColor=none') && style.includes('strokeColor=none'));

      const geom = cell.mxGeometry;
      if (!geom) {
        errors.push({
          code: 'GEOMETRY_MISSING',
          cells: [id],
          detail: `Vertex "${id}" is missing mxGeometry`,
        });
        continue;
      }

      const x = parseFloat(geom['@_x'] || '0');
      const y = parseFloat(geom['@_y'] || '0');
      const width = parseFloat(geom['@_width'] || '0');
      const height = parseFloat(geom['@_height'] || '0');

      if (width <= 0 || height <= 0) {
        errors.push({
          code: 'GEOMETRY_MISSING',
          cells: [id],
          detail: `Vertex "${id}" has invalid zero or negative dimensions (${width}x${height})`,
        });
      }

      if ((parent === '1' || parent === '0') && (x < 0 || y < 0)) {
        errors.push({
          code: 'OUT_OF_BOUNDS',
          cells: [id],
          detail: `Top-level vertex "${id}" has negative relative coordinates (${x}, ${y})`,
        });
      }

      // Check broken image assets in style (`image=...`) or HTML `<img src="...">`
      const styleImgMatch = style.match(/(?:^|;)image=([^;]+)/);
      if (styleImgMatch && isBrokenImageUrl(styleImgMatch[1])) {
        errors.push({
          code: 'BROKEN_IMAGE_ASSET',
          cells: [id],
          detail: `Vertex "${id}" references broken or non-resolvable image asset "${styleImgMatch[1].slice(0, 80)}"`,
        });
      }
      const htmlImgRegex = /<img\b[^>]*\bsrc=["']([^"']*)["']/gi;
      let imgM: RegExpExecArray | null;
      while ((imgM = htmlImgRegex.exec(rawVal)) !== null) {
        if (isBrokenImageUrl(imgM[1])) {
          errors.push({
            code: 'BROKEN_IMAGE_ASSET',
            cells: [id],
            detail: `Vertex "${id}" embeds broken <img src="${imgM[1].slice(0, 80)}">`,
          });
        }
      }

      // Check unescaped pseudo-HTML tags in html=1 cells (`<ToolSpec>`, `<AgentId>`)
      if (style.includes('html=1') && rawVal.includes('<')) {
        const pseudoTags = findUnescapedPseudoHtmlTags(rawVal);
        if (pseudoTags.length > 0) {
          warnings.push({
            code: 'UNESCAPED_PSEUDO_HTML_TAG',
            cells: [id],
            detail: `Vertex "${id}" contains unescaped angle-bracket token(s) ${pseudoTags.join(', ')} inside html=1 label (swallowed by browser HTML parser). Escape as &lt;...&gt;.`,
          });
        }
      }

      // Check WCAG contrast when explicit hex fillColor and fontColor are both set on a labeled cell
      if (rawVal.replace(/<[^>]+>/g, '').trim().length > 0 && !rawVal.includes('color:')) {
        const fillHex = style.match(/(?:^|;)fillColor=(#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3})\b/)?.[1];
        const fontHex = style.match(/(?:^|;)fontColor=(#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3})\b/)?.[1];
        if (fillHex && fontHex) {
          const ratio = computeWcagContrastRatio(fillHex, fontHex);
          if (ratio !== null && ratio < 3.0) {
            errors.push({
              code: 'LOW_COLOR_CONTRAST',
              cells: [id],
              detail: `Vertex "${id}" has severe WCAG contrast failure (${ratio.toFixed(2)}:1 < 3.0:1) between fontColor=${fontHex} and fillColor=${fillHex}.`,
            });
          } else if (ratio !== null && ratio < 4.5) {
            warnings.push({
              code: 'LOW_COLOR_CONTRAST',
              cells: [id],
              detail: `Vertex "${id}" has below-AA contrast (${ratio.toFixed(2)}:1 < 4.5:1) between fontColor=${fontHex} and fillColor=${fillHex}.`,
            });
          }
        }
      }

      const isMicroBadgeOrPillShell =
        !rawVal.trim() &&
        ((width <= 54 && height <= 54) || height <= 28 || width <= 16 || style.includes('strokeColor=none'));
      const isCanvasFrameWrapper = width >= 1350 && height >= 700;

      verticesMap.set(id, {
        id,
        parent,
        isContainer: isContainer || isCanvasFrameWrapper,
        isLabelOrHeader,
        isShadowOrAccent: isShadowOrAccent || isMicroBadgeOrPillShell,
        x,
        y,
        width,
        height,
        absX: x,
        absY: y,
        label: rawVal,
        style,
      });
    } else if (isEdge) {
      const source = cell['@_source'] || '';
      const target = cell['@_target'] || '';
      const style = cell['@_style'] || '';
      const geom = cell.mxGeometry;
      const directPoints = geom?.mxPoint ? (Array.isArray(geom.mxPoint) ? geom.mxPoint : [geom.mxPoint]) : [];
      const arrayPoints = geom?.Array?.mxPoint ? (Array.isArray(geom.Array.mxPoint) ? geom.Array.mxPoint : [geom.Array.mxPoint]) : [];
      const points = [...directPoints, ...arrayPoints];
      let sourcePoint: { x: number; y: number } | undefined;
      let targetPoint: { x: number; y: number } | undefined;
      for (const pt of points) {
        if (pt?.['@_as'] === 'sourcePoint') {
          sourcePoint = { x: parseFloat(pt['@_x'] || '0'), y: parseFloat(pt['@_y'] || '0') };
        } else if (pt?.['@_as'] === 'targetPoint') {
          targetPoint = { x: parseFloat(pt['@_x'] || '0'), y: parseFloat(pt['@_y'] || '0') };
        }
      }
      const hasSourcePoint = Boolean(sourcePoint);
      const hasTargetPoint = Boolean(targetPoint);
      const waypoints = points
        .filter((pt: any) => !pt?.['@_as'])
        .map((pt: any) => ({ x: parseFloat(pt['@_x'] || '0'), y: parseFloat(pt['@_y'] || '0') }));

      const exitXMatch = style.match(/exitX=([0-9.]+)/);
      const exitYMatch = style.match(/exitY=([0-9.]+)/);
      const entryXMatch = style.match(/entryX=([0-9.]+)/);
      const entryYMatch = style.match(/entryY=([0-9.]+)/);

      edgesMap.set(id, {
        id,
        source,
        target,
        hasSourcePoint,
        hasTargetPoint,
        sourcePoint,
        targetPoint,
        label: cell['@_value'] || '',
        style,
        points: waypoints,
        exitX: exitXMatch ? parseFloat(exitXMatch[1]) : undefined,
        exitY: exitYMatch ? parseFloat(exitYMatch[1]) : undefined,
        entryX: entryXMatch ? parseFloat(entryXMatch[1]) : undefined,
        entryY: entryYMatch ? parseFloat(entryYMatch[1]) : undefined,
      });
    }
  }

  if (!hasCell0 || !hasCell1) {
    errors.push({
      code: 'XML_INVALID',
      cells: [],
      detail: 'Missing required root cells "0" or "1"',
    });
  }

  if (duplicateIds.length > 0) {
    errors.push({
      code: 'XML_INVALID',
      cells: duplicateIds,
      detail: `Duplicate cell IDs found: ${duplicateIds.join(', ')}`,
    });
  }

  // Compute recursive absolute coordinates on canvas across arbitrary nesting depths
  const absComputed = new Set<string>();
  function resolveAbsoluteCoords(v: ParsedVertex, visiting = new Set<string>()): { absX: number; absY: number } {
    if (absComputed.has(v.id)) {
      return { absX: v.absX, absY: v.absY };
    }
    if (visiting.has(v.id)) {
      return { absX: v.x, absY: v.y };
    }
    visiting.add(v.id);

    if (v.parent && v.parent !== '0' && v.parent !== '1' && verticesMap.has(v.parent)) {
      const parentV = verticesMap.get(v.parent)!;
      const pCoords = resolveAbsoluteCoords(parentV, visiting);
      v.absX = pCoords.absX + v.x;
      v.absY = pCoords.absY + v.y;
    } else {
      v.absX = v.x;
      v.absY = v.y;
    }

    absComputed.add(v.id);
    return { absX: v.absX, absY: v.absY };
  }

  for (const v of verticesMap.values()) {
    resolveAbsoluteCoords(v);
  }

  // Detect flat `parent="1"` visual zone frames (large rects enclosing >= 2 smaller cards) so they aren't treated as leaf cards
  const allVerticesArr = Array.from(verticesMap.values());
  for (const v of allVerticesArr) {
    if (v.isContainer || v.width < 240 || v.height < 180) continue;
    let enclosedCount = 0;
    for (const other of allVerticesArr) {
      if (
        other.id === v.id ||
        other.isContainer ||
        other.isLabelOrHeader ||
        other.isShadowOrAccent ||
        other.width >= v.width - 8 ||
        other.height >= v.height - 8 ||
        other.width < 60 ||
        other.height < 28
      ) {
        continue;
      }
      if (
        other.absX >= v.absX - 4 &&
        other.absX + other.width <= v.absX + v.width + 4 &&
        other.absY >= v.absY - 4 &&
        other.absY + other.height <= v.absY + v.height + 4
      ) {
        enclosedCount++;
        if (enclosedCount >= 2) {
          v.isContainer = true;
          break;
        }
      }
    }
  }

  // Check EDGE_DANGLING & collect connected nodes (including coordinate-bound touchpoints!)
  const connectedNodeIds = new Set<string>();
  const pointTouchesVertex = (pt: { x: number; y: number }, v: ParsedVertex, tol = 10): boolean =>
    pt.x >= v.absX - tol &&
    pt.x <= v.absX + v.width + tol &&
    pt.y >= v.absY - tol &&
    pt.y <= v.absY + v.height + tol;

  for (const [edgeId, edge] of edgesMap.entries()) {
    if (!edge.source || !verticesMap.has(edge.source)) {
      if (!edge.hasSourcePoint) {
        errors.push({
          code: 'EDGE_DANGLING',
          cells: [edgeId],
          detail: `Edge "${edgeId}" source "${edge.source}" is not a valid vertex and has no explicit sourcePoint`,
        });
      } else if (edge.sourcePoint) {
        for (const v of allVerticesArr) {
          if (!v.isContainer && pointTouchesVertex(edge.sourcePoint, v)) {
            connectedNodeIds.add(v.id);
          }
        }
      }
    } else {
      connectedNodeIds.add(edge.source);
    }

    if (!edge.target || !verticesMap.has(edge.target)) {
      if (!edge.hasTargetPoint) {
        errors.push({
          code: 'EDGE_DANGLING',
          cells: [edgeId],
          detail: `Edge "${edgeId}" target "${edge.target}" is not a valid vertex and has no explicit targetPoint`,
        });
      } else if (edge.targetPoint) {
        for (const v of allVerticesArr) {
          if (!v.isContainer && pointTouchesVertex(edge.targetPoint, v)) {
            connectedNodeIds.add(v.id);
          }
        }
      }
    } else {
      connectedNodeIds.add(edge.target);
    }
  }

  // Check OUT_OF_BOUNDS
  for (const [id, v] of verticesMap.entries()) {
    if (v.absX < 0 || v.absY < 0 || v.absX + v.width > 8000 || v.absY + v.height > 8000) {
      errors.push({
        code: 'OUT_OF_BOUNDS',
        cells: [id],
        detail: `Vertex "${id}" extends beyond 0..8000 canvas bounds (extent: [${v.absX}, ${v.absY}] -> [${v.absX + v.width}, ${v.absY + v.height}])`,
      });
    }
  }

  // Check OUT_OF_CONTAINER
  for (const [id, v] of verticesMap.entries()) {
    if (!v.isContainer && v.parent !== '1' && verticesMap.has(v.parent)) {
      const parentV = verticesMap.get(v.parent)!;
      if (!v.isLabelOrHeader && !v.isShadowOrAccent && v.y < 30) {
        errors.push({
          code: 'OUT_OF_CONTAINER',
          cells: [id, parentV.id],
          detail: `Child vertex "${id}" (y=${v.y}) overlaps container top-label band (top 30px) of parent "${parentV.id}"`,
        });
      }
      if (v.x + v.width > parentV.width + 10) {
        errors.push({
          code: 'OUT_OF_CONTAINER',
          cells: [id, parentV.id],
          detail: `Child vertex "${id}" right edge (${v.x + v.width}px) exceeds parent "${parentV.id}" width (${parentV.width}px)`,
        });
      }
      if (v.y + v.height > parentV.height + 10) {
        errors.push({
          code: 'OUT_OF_CONTAINER',
          cells: [id, parentV.id],
          detail: `Child vertex "${id}" bottom edge (${v.y + v.height}px) exceeds parent "${parentV.id}" height (${parentV.height}px)`,
        });
      }
    }
  }

  // Helper: check if one vertex is an ancestor of another
  const isAncestor = (ancId: string, desc: ParsedVertex): boolean => {
    let p = desc.parent;
    const seen = new Set<string>();
    while (p && p !== '0' && p !== '1' && !seen.has(p)) {
      if (p === ancId) return true;
      seen.add(p);
      p = verticesMap.get(p)?.parent || '';
    }
    return false;
  };

  // Check OVERLAP across ALL leaf cards in absolute canvas coordinates (including cross-parent overlaps!)
  const verticesList = allVerticesArr.filter(
    (v) => !v.isContainer && !v.isLabelOrHeader && !v.isShadowOrAccent
  );
  for (let i = 0; i < verticesList.length; i++) {
    for (let j = i + 1; j < verticesList.length; j++) {
      const v1 = verticesList[i];
      const v2 = verticesList[j];

      if (isAncestor(v1.id, v2) || isAncestor(v2.id, v1)) continue;

      // Skip intentional offset drop-shadow underlay pairs (`dx <= 10, dy <= 10` with matching width/height & empty value on one)
      if (
        (!v1.label?.trim() || !v2.label?.trim()) &&
        Math.abs(v1.width - v2.width) <= 8 &&
        Math.abs(v1.height - v2.height) <= 8 &&
        Math.abs(v1.absX - v2.absX) <= 10 &&
        Math.abs(v1.absY - v2.absY) <= 10
      ) {
        continue;
      }

      // Skip full geometric containment (inner sub-card/header strip placed deliberately inside a larger outer card)
      const v1EnclosesV2 =
        v1.width > v2.width + 6 &&
        v1.height > v2.height + 6 &&
        v1.absX <= v2.absX + 4 &&
        v1.absY <= v2.absY + 4 &&
        v1.absX + v1.width >= v2.absX + v2.width - 4 &&
        v1.absY + v1.height >= v2.absY + v2.height - 4;
      const v2EnclosesV1 =
        v2.width > v1.width + 6 &&
        v2.height > v1.height + 6 &&
        v2.absX <= v1.absX + 4 &&
        v2.absY <= v1.absY + 4 &&
        v2.absX + v2.width >= v1.absX + v1.width - 4 &&
        v2.absY + v2.height >= v1.absY + v1.height - 4;

      if (v1EnclosesV2 || v2EnclosesV1) {
        continue;
      }

      // Skip intentional left/top accent border strips (`w <= 12` or `h <= 28` flush with card edge)
      if (
        (!v1.label?.trim() && (v1.width <= 12 || v1.height <= 28)) ||
        (!v2.label?.trim() && (v2.width <= 12 || v2.height <= 28))
      ) {
        continue;
      }

      const ix = Math.max(0, Math.min(v1.absX + v1.width, v2.absX + v2.width) - Math.max(v1.absX, v2.absX));
      const iy = Math.max(0, Math.min(v1.absY + v1.height, v2.absY + v2.height) - Math.max(v1.absY, v2.absY));

      if (ix > 2 && iy > 2) {
        errors.push({
          code: 'OVERLAP',
          cells: [v1.id, v2.id],
          detail: `Direct geometric overlap (${Math.round(ix)}x${Math.round(iy)}px) between nodes "${v1.id}" and "${v2.id}"`,
        });
      }
    }
  }

  // Check EDGE_LABEL_MISSING_PILL
  for (const edge of edgesMap.values()) {
    const val = edge.label || '';
    const style = edge.style || '';
    if (val && val.trim().length > 0 && !style.includes('labelBackgroundColor=') && !val.includes('background:')) {
      warnings.push({
        code: 'EDGE_LABEL_MISSING_PILL',
        cells: [edge.id],
        detail: `Edge "${edge.id}" has label "${val.trim().slice(0, 50)}" but is missing high-contrast pill styling (labelBackgroundColor / inline background)`,
      });
    }
  }

  // Check EDGE_INTERSECTS_VERTEX & NON_ORTHOGONAL_EDGE_SEGMENT (both vertex-bound and coordinate-bound edges!)
  for (const [edgeId, edge] of edgesMap.entries()) {
    const hasSrcTgt = Boolean(edge.source && edge.target && verticesMap.has(edge.source) && verticesMap.has(edge.target));
    const hasPts = Boolean(edge.sourcePoint && edge.targetPoint);
    if (!hasSrcTgt && !hasPts) continue;

    const src = hasSrcTgt ? verticesMap.get(edge.source)! : undefined;
    const tgt = hasSrcTgt ? verticesMap.get(edge.target)! : undefined;

    const srcPt = src
      ? {
          x: edge.exitX !== undefined ? src.absX + src.width * edge.exitX : src.absX + src.width / 2,
          y: edge.exitY !== undefined ? src.absY + src.height * edge.exitY : src.absY + src.height / 2,
        }
      : edge.sourcePoint!;
    const tgtPt = tgt
      ? {
          x: edge.entryX !== undefined ? tgt.absX + tgt.width * edge.entryX : tgt.absX + tgt.width / 2,
          y: edge.entryY !== undefined ? tgt.absY + tgt.height * edge.entryY : tgt.absY + tgt.height / 2,
        }
      : edge.targetPoint!;

    const isOrthogonalRouted = Boolean(
      edge.style?.includes('orthogonalEdgeStyle') ||
        edge.style?.includes('edgeStyle=orthogonal') ||
        edge.style?.includes('entityRelationEdgeStyle')
    );

    let points: { x: number; y: number }[];
    if (edge.points && edge.points.length > 0) {
      points = [srcPt, ...edge.points, tgtPt];
    } else if (isOrthogonalRouted && Math.abs(srcPt.x - tgtPt.x) > 5 && Math.abs(srcPt.y - tgtPt.y) > 5) {
      // Simulate Draw.io's actual 90-degree Manhattan auto-router instead of treating [srcPt, tgtPt] as a diagonal!
      const horizFirst =
        edge.exitX === 0 ||
        edge.exitX === 1 ||
        (edge.exitY === undefined && Math.abs(tgtPt.x - srcPt.x) >= Math.abs(tgtPt.y - srcPt.y));
      if (horizFirst) {
        const midX = (srcPt.x + tgtPt.x) / 2;
        points = [srcPt, { x: midX, y: srcPt.y }, { x: midX, y: tgtPt.y }, tgtPt];
      } else {
        const midY = (srcPt.y + tgtPt.y) / 2;
        points = [srcPt, { x: srcPt.x, y: midY }, { x: tgtPt.x, y: midY }, tgtPt];
      }
    } else {
      points = [srcPt, tgtPt];
    }

    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];
      const dx = Math.abs(p1.x - p2.x);
      const dy = Math.abs(p1.y - p2.y);

      if (!isOrthogonalRouted && dx > 3 && dy > 3) {
        errors.push({
          code: 'NON_ORTHOGONAL_EDGE_SEGMENT',
          cells: [edgeId],
          detail: `Edge "${edgeId}" has a slanted diagonal segment from (${Math.round(p1.x)}, ${Math.round(p1.y)}) to (${Math.round(p2.x)}, ${Math.round(p2.y)}) (dx=${Math.round(dx)}px, dy=${Math.round(dy)}px). All architecture connectors must be strictly orthogonal.`,
        });
      }

      const isHoriz = dy < 5;
      const isVert = dx < 5;

      for (const [vId, v] of verticesMap.entries()) {
        if (vId === edge.source || vId === edge.target || v.isLabelOrHeader || v.isShadowOrAccent) continue;
        // Exclude coordinate-bound endpoint cards that this edge intentionally originates from or terminates on
        if (!hasSrcTgt && (pointTouchesVertex(srcPt, v, 8) || pointTouchesVertex(tgtPt, v, 8))) continue;

        if (v.isContainer) {
          const headerMinY = v.absY;
          const headerMaxY = v.absY + 20;
          if (isHoriz && p1.y >= headerMinY && p1.y <= headerMaxY) {
            const segMinX = Math.min(p1.x, p2.x);
            const segMaxX = Math.max(p1.x, p2.x);
            if (segMaxX > v.absX + 20 && segMinX < v.absX + v.width - 20) {
              errors.push({
                code: 'CONTAINER_HEADER_SLICED',
                cells: [edgeId, vId],
                detail: `Edge segment on "${edgeId}" slices directly through the header text zone of container "${vId}" (Y=${Math.round(p1.y)})`,
              });
            }
          }
          continue;
        }

        if (isHoriz) {
          const segMinX = Math.min(p1.x, p2.x);
          const segMaxX = Math.max(p1.x, p2.x);
          if (p1.y > v.absY + 2 && p1.y < v.absY + v.height - 2 && segMaxX > v.absX + 5 && segMinX < v.absX + v.width - 5) {
            errors.push({
              code: 'EDGE_INTERSECTS_VERTEX',
              cells: [edgeId, vId],
              detail: `Horizontal edge segment on "${edgeId}" (Y=${Math.round(p1.y)}) slices through vertex "${vId}"`,
            });
          }
        }

        if (isVert) {
          const segMinY = Math.min(p1.y, p2.y);
          const segMaxY = Math.max(p1.y, p2.y);
          if (p1.x > v.absX + 2 && p1.x < v.absX + v.width - 2 && segMaxY > v.absY + 5 && segMinY < v.absY + v.height - 5) {
            errors.push({
              code: 'EDGE_INTERSECTS_VERTEX',
              cells: [edgeId, vId],
              detail: `Vertical edge segment on "${edgeId}" (X=${Math.round(p1.x)}) slices through vertex "${vId}"`,
            });
          }
        }
      }
    }
  }

  // Check CARD_TEXT_OVERFLOW
  for (const [id, v] of verticesMap.entries()) {
    if (!v.isContainer && !v.isLabelOrHeader && !v.isShadowOrAccent && v.label) {
      const lineCount = (v.label.match(/<br\s*\/?>|<p>/gi) || []).length + 1;
      const hasIcon = v.label.includes('<svg') || v.label.includes('ICONS');
      const minRequiredHeight = (hasIcon ? 18 : 8) + lineCount * 8.5;
      if (v.height < minRequiredHeight) {
        errors.push({
          code: 'TEXT_OVERFLOW_HEIGHT',
          cells: [id],
          detail: `Node "${id}" height (${v.height}px) is insufficient for ${lineCount} text lines with icon (requires >= ${Math.round(minRequiredHeight)}px)`,
        });
      }
    }
  }

  // 1. HARD BLOCKING ORPHAN_NODE RULE
  for (const [id, v] of verticesMap.entries()) {
    const isFoundation =
      id.startsWith('cloud_') &&
      (id.includes('monitoring') ||
        id.includes('iam') ||
        id.includes('vpc') ||
        id.includes('telemetry') ||
        id.includes('governance'));
    const isEnclosedInConnectedContainer = allVerticesArr.some(
      (c) =>
        c.isContainer &&
        c.id !== id &&
        connectedNodeIds.has(c.id) &&
        v.absX >= c.absX - 2 &&
        v.absY >= c.absY - 2 &&
        v.absX + v.width <= c.absX + c.width + 2 &&
        v.absY + v.height <= c.absY + c.height + 2
    );
    if (
      !v.isContainer &&
      !v.isLabelOrHeader &&
      !v.isShadowOrAccent &&
      !isFoundation &&
      !connectedNodeIds.has(id) &&
      !isEnclosedInConnectedContainer
    ) {
      errors.push({
        code: 'ORPHAN_NODE',
        cells: [id],
        detail: `Critical architecture component "${id}" is completely disconnected from dataflow (0 connected edges).`,
      });
    }
  }

  // 2. HARD BLOCKING DATA_STORE_DISCONNECTED RULE
  for (const [id, v] of verticesMap.entries()) {
    const isDatabase =
      id.includes('db') ||
      id.includes('spanner') ||
      id.includes('bigquery') ||
      id.includes('sql') ||
      id.includes('vector_search') ||
      id.includes('redis') ||
      id.includes('memorystore');
    if (isDatabase && !v.isLabelOrHeader && !v.isShadowOrAccent && !v.isContainer) {
      const hasEdge = connectedNodeIds.has(id);
      if (!hasEdge) {
        errors.push({
          code: 'DATA_STORE_DISCONNECTED',
          cells: [id],
          detail: `Data store "${id}" is completely disconnected from dataflow (0 incoming and 0 outgoing edges).`,
        });
      }
    }
  }

  // 3. HARD BLOCKING FLOW_BACKTRACKING_DETECTED RULE
  for (const [edgeId, edge] of edgesMap.entries()) {
    if (edge.source && edge.target && verticesMap.has(edge.source) && verticesMap.has(edge.target)) {
      const src = verticesMap.get(edge.source)!;
      const tgt = verticesMap.get(edge.target)!;
      const isForwardCol = tgt.absX > src.absX + 50;
      const isUpwardBacktrack = src.absY - tgt.absY > 220;
      const labelLower = (edge.label || '').toLowerCase();
      const isFeedbackOrReturnLoop =
        /feedback|eval|retry|correction|return|respond|response|reply|callback|ack|alert|notify|status|token|redirect|refresh|sync|audit|telemetry|log|encrypt|decrypt|score|query|read/.test(
          labelLower
        ) || Boolean(edge.points && edge.points.length >= 4);

      if (isForwardCol && isUpwardBacktrack && !isFeedbackOrReturnLoop) {
        errors.push({
          code: 'FLOW_BACKTRACKING_DETECTED',
          cells: [edgeId, edge.source, edge.target],
          detail: `Forward edge "${edgeId}" backtracks upward by ${Math.round(src.absY - tgt.absY)}px from "${edge.source}" to "${edge.target}". Ingress flow must branch forward cleanly without backtracking.`,
        });
      }
    }
  }

  // 4. CLOSED_LOOP_MISSING_EDGE RULE
  const hasClosedLoopClaim = allVerticesArr.some(
    (v) =>
      v.label?.toLowerCase().includes('closed-loop') ||
      v.label?.toLowerCase().includes('continuous feedback')
  );
  if (hasClosedLoopClaim) {
    const hasReturnEdge = Array.from(edgesMap.values()).some((e) => {
      if (e.source && e.target && verticesMap.has(e.source) && verticesMap.has(e.target)) {
        const src = verticesMap.get(e.source)!;
        const tgt = verticesMap.get(e.target)!;
        return src.absX > tgt.absX + 200;
      }
      if (e.sourcePoint && e.targetPoint) {
        return e.sourcePoint.x > e.targetPoint.x + 200;
      }
      return false;
    });

    if (!hasReturnEdge) {
      errors.push({
        code: 'CLOSED_LOOP_MISSING_EDGE',
        cells: [],
        detail: `Diagram claims "Closed-Loop Feedback" in banner/title, but has no physical return connector vector in the graph model.`,
      });
    }
  }

  // 5. UNCONNECTED_LOAD_BALANCER RULE
  for (const [id, v] of verticesMap.entries()) {
    if ((id.includes('load_balancer') || id.includes('gclb')) && !v.isContainer && !v.isLabelOrHeader) {
      const hasIncoming = Array.from(edgesMap.values()).some(
        (e) => e.target === id || (e.targetPoint && pointTouchesVertex(e.targetPoint, v))
      );
      const hasOutgoing = Array.from(edgesMap.values()).some(
        (e) => e.source === id || (e.sourcePoint && pointTouchesVertex(e.sourcePoint, v))
      );
      if (!hasIncoming || !hasOutgoing) {
        errors.push({
          code: 'UNCONNECTED_LOAD_BALANCER',
          cells: [id],
          detail: `Load balancer "${id}" is disconnected from ingress flow (Incoming: ${hasIncoming}, Outgoing: ${hasOutgoing}).`,
        });
      }
    }
  }

  // 6. LEAF_TOP_ALIGNED_EMPTY_SPACE RULE
  const topAlignedLeafIds = findTopAlignedLeafCardIds(xmlString, 80);
  if (topAlignedLeafIds.length > 0) {
    warnings.push({
      code: 'LEAF_TOP_ALIGNED_EMPTY_SPACE',
      cells: topAlignedLeafIds,
      detail: `${topAlignedLeafIds.length} non-container leaf card(s) use verticalAlign=top (${topAlignedLeafIds.slice(0, 5).join(', ')}), leaving empty bottom space. Use verticalAlign=middle for leaf shapes.`,
    });
  }

  // 7. HTML_FOSTER_PARENTING_IN_TABLE RULE
  const fosterViolations = findFosterParentedTableCells(xmlString);
  if (fosterViolations.length > 0) {
    errors.push({
      code: 'HTML_FOSTER_PARENTING_IN_TABLE',
      cells: fosterViolations.map((v) => v.cellId),
      detail: `${fosterViolations.length} table cell(s) contain illegal elements directly inside <tr> outside <td>/<th>: ${fosterViolations
        .slice(0, 4)
        .map((v) => v.cellId)
        .join(', ')}`,
    });
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}
