/**
 * Universal Leaf-Card Vertical Alignment Normalizer
 *
 * Ensures non-container leaf shapes never pin their text to the top edge
 * (`verticalAlign=top`), which leaves tall shapes looking half-empty in Draw.io
 * and Google Slides.
 *
 * Safety invariants (zero false positives on structural containers or header banners):
 *  1. Preserves `verticalAlign=top` on explicit containers (`container=1`, `swimlane`, `group`, `shape=table`, `shape=umlFrame`).
 *  2. Preserves `verticalAlign=top` on any cell referenced as `parent="..."` by another cell.
 *  3. Preserves `verticalAlign=top` on flat unparented background zones that spatially enclose smaller vertices.
 *  4. Preserves `verticalAlign=top` on text-only labels (`text;`, `strokeColor=none` + `fillColor=none`), external-label icons (`verticalLabelPosition=bottom|top`), and pinned top-header banner cards whose HTML starts with a colored header strip.
 *  5. Preserves explicit opt-out `pcKeepTopAlign=1`.
 */

export interface LeafVerticalAlignmentResult {
  xml: string;
  normalizedCount: number;
  normalizedIds: string[];
}

interface ParsedCellMeta {
  id: string;
  parent: string;
  isVertex: boolean;
  style: string;
  value: string;
  x: number;
  y: number;
  width: number;
  height: number;
  hasGeometry: boolean;
  absX: number;
  absY: number;
  openTagStart: number;
  openTagEnd: number;
}

function decodeHtmlEntitiesShallow(raw: string): string {
  return raw
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&amp;/g, '&');
}

function stripHtmlToPlain(raw: string): string {
  return decodeHtmlEntitiesShallow(raw)
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function getAttr(tag: string, name: string): string {
  const re = new RegExp(`\\b${name}="([^"]*)"`, 'i');
  const m = tag.match(re);
  return m ? m[1] : '';
}

function hasPinnedTopHeaderBanner(rawValue: string): boolean {
  const decoded = decodeHtmlEntitiesShallow(rawValue).trim();
  if (!decoded) return false;
  // Detect explicit top-pinned header strip / colored banner bar / table header inside the cell HTML
  const headSlice = decoded.slice(0, 360);
  if (/<thead\b/i.test(headSlice)) return true;
  if (/border-top-left-radius|border-top-right-radius|border-radius:\s*\d+px\s+\d+px\s+0\s+0/i.test(headSlice)) {
    return true;
  }
  // A leading <div> or first <tr><td> with a solid background color or bottom divider rule acts as a top header bar
  if (/^<(?:div|p|header)\b[^>]*style=['"][^'"]*(?:background(?:-color)?\s*:\s*(?!none|transparent)|border-bottom\s*:\s*[1-9])/i.test(headSlice)) {
    return true;
  }
  if (/^<table\b[^>]*>[\s\S]{0,180}?<(?:tr|td|th)\b[^>]*style=['"][^'"]*(?:background(?:-color)?\s*:\s*(?!none|transparent)|border-bottom\s*:\s*[1-9])/i.test(headSlice)) {
    return true;
  }
  return false;
}

function isExplicitContainerStyle(style: string): boolean {
  return /(?:^|;)(?:container=1|swimlane(?:=1)?|group(?:=1)?|shape=swimlane|shape=table|shape=umlFrame|shape=partialRectangle|table=1|collapsible=1)(?:;|$)/i.test(
    style
  );
}

function isTextOrExternalLabelStyle(style: string): boolean {
  if (/(?:^|;)text(?:;|$)/i.test(style)) return true;
  if (/(?:^|;)verticalLabelPosition=(?:top|bottom)(?:;|$)/i.test(style)) return true;
  if (/(?:^|;)pcKeepTopAlign=1(?:;|$)/i.test(style)) return true;
  const noStroke = /(?:^|;)strokeColor=none(?:;|$)/i.test(style);
  const noFill = /(?:^|;)fillColor=none(?:;|$)/i.test(style);
  if (noStroke && noFill) return true;
  return false;
}

function parseCellsForAlignment(xml: string): {
  cells: ParsedCellMeta[];
  parentIds: Set<string>;
  spatiallyEnclosingIds: Set<string>;
} {
  const cells: ParsedCellMeta[] = [];
  const parentIds = new Set<string>();

  const cellRe = /<mxCell\b([^>]*?)(?:\/>|>([\s\S]*?)<\/mxCell>)/g;
  let m: RegExpExecArray | null;
  while ((m = cellRe.exec(xml)) !== null) {
    const attrs = m[1] || '';
    const inner = m[2] || '';
    const id = getAttr(attrs, 'id');
    const parent = getAttr(attrs, 'parent');
    if (parent && parent !== '0' && parent !== '1') {
      parentIds.add(parent);
    }
    const isVertex = getAttr(attrs, 'vertex') === '1';
    const style = getAttr(attrs, 'style');
    const value = getAttr(attrs, 'value');

    let x = 0;
    let y = 0;
    let width = 0;
    let height = 0;
    let hasGeometry = false;
    if (inner) {
      const geoMatch = inner.match(/<mxGeometry\b([^>]*?)(?:\/>|>)/i);
      if (geoMatch) {
        const gAttrs = geoMatch[1] || '';
        const gx = parseFloat(getAttr(gAttrs, 'x') || '0');
        const gy = parseFloat(getAttr(gAttrs, 'y') || '0');
        const gw = parseFloat(getAttr(gAttrs, 'width') || '0');
        const gh = parseFloat(getAttr(gAttrs, 'height') || '0');
        x = Number.isFinite(gx) ? gx : 0;
        y = Number.isFinite(gy) ? gy : 0;
        width = Number.isFinite(gw) ? gw : 0;
        height = Number.isFinite(gh) ? gh : 0;
        hasGeometry = width > 0 && height > 0;
      }
    }

    const openTagStart = m.index;
    const openTagEnd = m.index + '<mxCell'.length + attrs.length;

    cells.push({
      id,
      parent,
      isVertex,
      style,
      value,
      x,
      y,
      width,
      height,
      hasGeometry,
      absX: x,
      absY: y,
      openTagStart,
      openTagEnd,
    });
  }

  // Resolve absolute coordinates via parent chains (cycle-safe)
  const byId = new Map<string, ParsedCellMeta>();
  for (const c of cells) {
    if (c.id) byId.set(c.id, c);
  }
  const resolved = new Set<string>();
  const resolveAbs = (c: ParsedCellMeta, depth = 0): void => {
    if (!c.id || resolved.has(c.id) || depth > 16) return;
    resolved.add(c.id);
    if (c.parent && c.parent !== '0' && c.parent !== '1') {
      const p = byId.get(c.parent);
      if (p) {
        resolveAbs(p, depth + 1);
        c.absX = p.absX + c.x;
        c.absY = p.absY + c.y;
      }
    }
  };
  for (const c of cells) resolveAbs(c);

  // Detect flat background zones/frames that spatially enclose smaller vertices
  const verticesWithGeo = cells.filter((c) => c.isVertex && c.hasGeometry);
  const spatiallyEnclosingIds = new Set<string>();

  for (const a of verticesWithGeo) {
    if (!/(?:^|;)verticalAlign=top(?:;|$)/i.test(a.style)) continue;
    const areaA = a.width * a.height;
    if (areaA <= 0) continue;

    for (const b of verticesWithGeo) {
      if (b.id === a.id) continue;
      // Skip tiny overlay badges/dots/pills sitting on a border (< 24px height and outside interior)
      const areaB = b.width * b.height;
      if (areaB >= areaA * 0.92) continue;
      const bCx = b.absX + b.width / 2;
      const bCy = b.absY + b.height / 2;
      if (
        bCx > a.absX + 4 &&
        bCx < a.absX + a.width - 4 &&
        bCy > a.absY + 4 &&
        bCy < a.absY + a.height - 4
      ) {
        spatiallyEnclosingIds.add(a.id);
        break;
      }
    }
  }

  return { cells, parentIds, spatiallyEnclosingIds };
}

function isTopAlignedLeafCard(
  c: ParsedCellMeta,
  parentIds: Set<string>,
  spatiallyEnclosingIds: Set<string>,
  minHeight = 44
): boolean {
  if (!c.isVertex || !c.hasGeometry) return false;
  if (!/(?:^|;)verticalAlign=top(?:;|$)/i.test(c.style)) return false;
  if (c.height < minHeight) return false;
  if (isExplicitContainerStyle(c.style)) return false;
  if (isTextOrExternalLabelStyle(c.style)) return false;
  if (c.id && (parentIds.has(c.id) || spatiallyEnclosingIds.has(c.id))) return false;
  const plainText = stripHtmlToPlain(c.value);
  if (!plainText) return false;
  if (hasPinnedTopHeaderBanner(c.value)) return false;
  return true;
}

/**
 * Returns IDs of tall non-container leaf shapes whose text is pinned to the top edge (`verticalAlign=top`).
 */
export function findTopAlignedLeafCardIds(xml: string, minHeight = 80): string[] {
  if (!xml || !xml.includes('verticalAlign=top')) return [];
  const { cells, parentIds, spatiallyEnclosingIds } = parseCellsForAlignment(xml);
  return cells
    .filter((c) => isTopAlignedLeafCard(c, parentIds, spatiallyEnclosingIds, minHeight))
    .map((c) => c.id || 'unnamed');
}

/**
 * Surgically normalizes `verticalAlign=top` -> `verticalAlign=middle` (and removes asymmetric `spacingTop`)
 * on all non-container leaf shapes so text sits balanced in the vertical center of each box.
 */
export function normalizeLeafCardVerticalAlignment(xml: string): LeafVerticalAlignmentResult {
  if (!xml || typeof xml !== 'string' || !xml.includes('verticalAlign=top')) {
    return { xml, normalizedCount: 0, normalizedIds: [] };
  }

  const { cells, parentIds, spatiallyEnclosingIds } = parseCellsForAlignment(xml);
  const targets = cells.filter((c) => isTopAlignedLeafCard(c, parentIds, spatiallyEnclosingIds, 44));

  if (targets.length === 0) {
    return { xml, normalizedCount: 0, normalizedIds: [] };
  }

  // Apply replacements from back to front so character offsets stay exact
  let out = xml;
  const normalizedIds: string[] = [];

  for (let i = targets.length - 1; i >= 0; i--) {
    const c = targets[i];
    const openSlice = out.slice(c.openTagStart, c.openTagEnd);
    const updatedSlice = openSlice.replace(/\bstyle="([^"]*)"/i, (_full, styleVal: string) => {
      let nextStyle = styleVal.replace(/(^|;)verticalAlign=top(?=;|$)/gi, '$1verticalAlign=middle');
      // Strip asymmetric spacingTop only on non-cylinder shapes (cylinders use spacingTop to clear the 3D lid)
      if (!/shape=cylinder/i.test(nextStyle)) {
        nextStyle = nextStyle.replace(/(^|;)spacingTop=-?\d+(?:\.\d+)?;?/gi, '$1');
      }
      nextStyle = nextStyle.replace(/;;+/g, ';');
      return `style="${nextStyle}"`;
    });

    if (updatedSlice !== openSlice) {
      out = out.slice(0, c.openTagStart) + updatedSlice + out.slice(c.openTagEnd);
      normalizedIds.unshift(c.id || `cell_${i}`);
    }
  }

  return {
    xml: out,
    normalizedCount: normalizedIds.length,
    normalizedIds,
  };
}
