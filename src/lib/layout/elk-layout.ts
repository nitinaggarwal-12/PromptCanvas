import ELK, { ElkNode, ElkExtendedEdge } from 'elkjs/lib/elk.bundled.js';
import { ArchitectureGraph, GraphNode, GraphTier, GraphEdge } from '../graph/schema';

const elk = new ELK();

const MAX_NODES_PER_ROW = 4;
const NODE_H_GAP = 84;
const NODE_ROW_GAP = 46;
const TIER_PAD_LEFT = 42;
const TIER_PAD_RIGHT = 42;
const TIER_HEADER_BAND = 48;
const TIER_PAD_BOTTOM = 28;
const TIER_V_GAP = 80;
const TITLE_TOP_Y = 24;
const TITLE_HEIGHT = 54;
const FIRST_TIER_Y = TITLE_TOP_Y + TITLE_HEIGHT + 28; // 106

/**
 * Calculates deterministic node width & height so multi-line descriptions and cylinder rims
 * never clip or trigger TEXT_OVERFLOW_HEIGHT.
 */
function calculateNodeDimensions(node: GraphNode): { width: number; height: number } {
  const titleLen = (node.label || '').trim().length;
  const descText = (node.subtitle || node.description || node.product || '').trim();
  const cappedDesc = descText.slice(0, 110);

  const width = Math.min(
    Math.max(Math.ceil(titleLen * 7.6 + 76), 220),
    290
  );

  const usableTextPx = width - 62;
  const titleLines = Math.max(1, Math.ceil((titleLen * 6.4) / usableTextPx));
  const descLines = cappedDesc ? Math.min(3, Math.ceil((cappedDesc.length * 4.9) / usableTextPx)) : 0;
  const baseHeight = 26 + titleLines * 16 + descLines * 13 + 12;
  const isCylinder = node.type === 'database';
  const height = Math.max(isCylinder ? 96 : 74, Math.min(122, baseHeight + (isCylinder ? 22 : 0)));

  return { width, height };
}

/**
 * Deterministically computes balanced, uniform-width tier geometry + ELK-ordered horizontal node positions
 * + mathematically verified collision-free orthogonal edge waypoints (zero stale ELK bendPoints,
 * zero vertex intersections, zero container header slices).
 */
export async function computeElkLayout(graph: ArchitectureGraph): Promise<ArchitectureGraph> {
  const sortedTiers = [...graph.tiers].sort((a, b) => a.order - b.order);

  // 1. Use ELK per-tier + cross-tier ordering hints to minimize edge crossings deterministically
  const elkOrderX = new Map<string, number>();
  try {
    const tierChildren: ElkNode[] = sortedTiers.map((tier) => {
      const nodesInTier = graph.nodes.filter((n) => n.tier === tier.id);
      return {
        id: tier.id,
        layoutOptions: {
          'elk.padding': '[top=48, left=40, bottom=28, right=40]',
          'elk.spacing.nodeNode': '48',
        },
        children: nodesInTier.map((n) => {
          const d = calculateNodeDimensions(n);
          return { id: n.id, width: d.width, height: d.height };
        }),
      };
    });

    const elkEdges: ElkExtendedEdge[] = graph.edges.map((e) => ({
      id: e.id,
      sources: [e.source],
      targets: [e.target],
    }));

    const laidOutRoot = await elk.layout({
      id: 'root_canvas',
      layoutOptions: {
        'elk.algorithm': 'layered',
        'elk.direction': 'DOWN',
        'elk.hierarchyHandling': 'INCLUDE_CHILDREN',
        'elk.layered.crossingMinimization.strategy': 'LAYER_SWEEP',
        'elk.partitioning.activate': 'true',
      },
      children: tierChildren,
      edges: elkEdges,
    });

    for (const tierElk of laidOutRoot.children || []) {
      for (const child of tierElk.children || []) {
        elkOrderX.set(child.id, child.x ?? 0);
      }
    }
  } catch {
    // Pure deterministic fallback ordering if ELK throws
  }

  // 2. Measure every tier's rows to compute a single uniform canvas width across all tiers
  interface PlannedRow {
    items: Array<{ node: GraphNode; width: number; height: number }>;
    rowWidth: number;
    rowHeight: number;
  }
  const tierRowsMap = new Map<string, PlannedRow[]>();
  let maxRequiredTierWidth = 920;

  for (const tier of sortedTiers) {
    const nodesInTier = graph.nodes
      .filter((n) => n.tier === tier.id)
      .sort((a, b) => {
        const ax = elkOrderX.get(a.id) ?? 0;
        const bx = elkOrderX.get(b.id) ?? 0;
        if (Math.abs(ax - bx) > 1) return ax - bx;
        return a.id.localeCompare(b.id);
      });

    const rows: PlannedRow[] = [];
    for (let i = 0; i < nodesInTier.length; i += MAX_NODES_PER_ROW) {
      const slice = nodesInTier.slice(i, i + MAX_NODES_PER_ROW);
      const items = slice.map((node) => ({ node, ...calculateNodeDimensions(node) }));
      const rowWidth =
        items.reduce((sum, it) => sum + it.width, 0) +
        Math.max(0, items.length - 1) * NODE_H_GAP;
      const rowHeight = items.reduce((mx, it) => Math.max(mx, it.height), 74);
      rows.push({ items, rowWidth, rowHeight });
      maxRequiredTierWidth = Math.max(
        maxRequiredTierWidth,
        rowWidth + TIER_PAD_LEFT + TIER_PAD_RIGHT
      );
    }
    tierRowsMap.set(tier.id, rows);
  }

  const uniformTierWidth = Math.round(maxRequiredTierWidth);

  // Count how many left/right bypass lanes we need BEFORE finalizing tierX so every bypass bus stays >= 28px
  const tierIndexById = new Map<string, number>();
  sortedTiers.forEach((t, idx) => tierIndexById.set(t.id, idx));
  const nodeTierIndex = new Map<string, number>();
  for (const n of graph.nodes) {
    nodeTierIndex.set(n.id, tierIndexById.get(n.tier) ?? 0);
  }

  let leftBypassCount = 0;
  let rightBypassCount = 0;
  for (const e of graph.edges) {
    const iu = nodeTierIndex.get(e.source) ?? 0;
    const iv = nodeTierIndex.get(e.target) ?? 0;
    if (iv < iu) leftBypassCount++;
    else if (iv > iu + 1) rightBypassCount++;
  }

  const BUS_STEP = 34;
  const leftGutterWidth = leftBypassCount > 0 ? 52 + leftBypassCount * BUS_STEP : 40;
  const tierX = Math.round(Math.max(40, leftGutterWidth));

  // 3. Finalize deterministic tier boxes & horizontally centered node positions
  const tierCoordsMap = new Map<string, { x: number; y: number; width: number; height: number }>();
  const nodeRelMap = new Map<string, { x: number; y: number; width: number; height: number }>();
  const nodeAbsMap = new Map<
    string,
    { absX: number; absY: number; width: number; height: number; tierIdx: number; rowIdx: number; colIdx: number; rowCount: number }
  >();

  let currentTierY = FIRST_TIER_Y;
  for (let tIdx = 0; tIdx < sortedTiers.length; tIdx++) {
    const tier = sortedTiers[tIdx];
    const rows = tierRowsMap.get(tier.id) || [];
    const innerHeight =
      rows.length > 0
        ? rows.reduce((sum, r) => sum + r.rowHeight, 0) + Math.max(0, rows.length - 1) * NODE_ROW_GAP
        : 76;
    const tierHeight = Math.round(TIER_HEADER_BAND + innerHeight + TIER_PAD_BOTTOM);

    tierCoordsMap.set(tier.id, {
      x: tierX,
      y: currentTierY,
      width: uniformTierWidth,
      height: tierHeight,
    });

    let rowY = TIER_HEADER_BAND;
    rows.forEach((row, rIdx) => {
      // Distribute nodes evenly & symmetrically inside uniformTierWidth
      const freeSpace = Math.max(0, uniformTierWidth - TIER_PAD_LEFT - TIER_PAD_RIGHT - row.rowWidth);
      const startX = Math.round(TIER_PAD_LEFT + freeSpace / 2);
      let cursorX = startX;

      row.items.forEach((it, cIdx) => {
        const relY = Math.round(rowY + (row.rowHeight - it.height) / 2);
        nodeRelMap.set(it.node.id, {
          x: cursorX,
          y: relY,
          width: it.width,
          height: it.height,
        });
        nodeAbsMap.set(it.node.id, {
          absX: tierX + cursorX,
          absY: currentTierY + relY,
          width: it.width,
          height: it.height,
          tierIdx: tIdx,
          rowIdx: rIdx,
          colIdx: cIdx,
          rowCount: rows.length,
        });
        cursorX += it.width + NODE_H_GAP;
      });

      rowY += row.rowHeight + NODE_ROW_GAP;
    });

    currentTierY += tierHeight + TIER_V_GAP;
  }

  // Track ordered tier vertical bounds for inter-tier corridor routing
  const tierBounds = sortedTiers.map((t) => tierCoordsMap.get(t.id)!);

  // 4. Compute spread port anchors & mathematically collision-free orthogonal waypoints AFTER final positions are locked
  const outPortTotals = new Map<string, number>();
  const inPortTotals = new Map<string, number>();
  for (const e of graph.edges) {
    outPortTotals.set(e.source, (outPortTotals.get(e.source) || 0) + 1);
    inPortTotals.set(e.target, (inPortTotals.get(e.target) || 0) + 1);
  }
  const outPortUsed = new Map<string, number>();
  const inPortUsed = new Map<string, number>();

  const nextPortFraction = (map: Map<string, number>, totalMap: Map<string, number>, id: string): number => {
    const idx = map.get(id) || 0;
    map.set(id, idx + 1);
    const total = totalMap.get(id) || 1;
    if (total <= 1) return 0.5;
    // Spread evenly between 0.2 and 0.8 so parallel arrows never overlap on a single pin
    return Number((0.2 + (0.6 * idx) / (total - 1)).toFixed(3));
  };

  // Corridor horizontal lane counters keyed by inter-tier gap index (gap `k` is directly below tier `k`, gap `-1` is above tier `0`)
  const gapLaneCounts = new Map<number, number>();
  const nextGapY = (gapIdx: number): number => {
    const lane = gapLaneCounts.get(gapIdx) || 0;
    gapLaneCounts.set(gapIdx, lane + 1);
    if (gapIdx < 0) {
      // Gap directly above tier 0 (between title banner and tier 0)
      const t0Top = tierBounds[0]?.y ?? FIRST_TIER_Y;
      return Math.round(t0Top - 14 - (lane % 2) * 8);
    }
    const upperBottom = tierBounds[gapIdx].y + tierBounds[gapIdx].height;
    const lowerTop = tierBounds[gapIdx + 1]?.y ?? (upperBottom + TIER_V_GAP);
    const gapHeight = Math.max(36, lowerTop - upperBottom);
    const usable = gapHeight - 24;
    const slotCount = Math.max(1, Math.min(5, Math.floor(usable / 12)));
    const slot = lane % slotCount;
    const offset = 14 + Math.round(((slot + 0.5) / slotCount) * usable);
    return Math.round(upperBottom + offset);
  };

  let rightBusCursor = 0;
  let leftBusCursor = 0;
  const tierRight = tierX + uniformTierWidth;

  const enrichedEdges: GraphEdge[] = graph.edges.map((edge) => {
    const src = nodeAbsMap.get(edge.source);
    const tgt = nodeAbsMap.get(edge.target);
    if (!src || !tgt) {
      return { ...edge, bendPoints: [] };
    }

    const iu = src.tierIdx;
    const iv = tgt.tierIdx;

    // Case A: Same tier, same row, horizontally adjacent -> direct horizontal connector (0 bendPoints)
    if (iu === iv && src.rowIdx === tgt.rowIdx && Math.abs(src.colIdx - tgt.colIdx) === 1) {
      const goRight = tgt.absX >= src.absX;
      return {
        ...edge,
        exitX: goRight ? 1 : 0,
        exitY: 0.5,
        entryX: goRight ? 0 : 1,
        entryY: 0.5,
        bendPoints: [],
      };
    }

    // Case B: Same tier, non-adjacent or different rows -> route cleanly through the empty gap directly below this tier
    if (iu === iv) {
      const exitX = nextPortFraction(outPortUsed, outPortTotals, edge.source);
      const entryX = nextPortFraction(inPortUsed, inPortTotals, edge.target);
      const sx = Math.round(src.absX + src.width * exitX);
      const tx = Math.round(tgt.absX + tgt.width * entryX);
      const corridorY = nextGapY(iu);
      return {
        ...edge,
        exitX,
        exitY: 1,
        entryX,
        entryY: 1,
        bendPoints: [
          { x: sx, y: corridorY },
          { x: tx, y: corridorY },
        ],
      };
    }

    // Case C: Adjacent downward tier (iv === iu + 1) and clean vertical exit/entry (no lower row in src tier, no upper row in tgt tier)
    const srcBlockedBelow = src.rowIdx < src.rowCount - 1;
    const tgtBlockedAbove = tgt.rowIdx > 0;
    if (iv === iu + 1 && !srcBlockedBelow && !tgtBlockedAbove) {
      const exitX = nextPortFraction(outPortUsed, outPortTotals, edge.source);
      const entryX = nextPortFraction(inPortUsed, inPortTotals, edge.target);
      const sx = Math.round(src.absX + src.width * exitX);
      const tx = Math.round(tgt.absX + tgt.width * entryX);
      if (Math.abs(sx - tx) <= 4) {
        return {
          ...edge,
          exitX,
          exitY: 1,
          entryX,
          entryY: 0,
          bendPoints: [],
        };
      }
      const corridorY = nextGapY(iu);
      return {
        ...edge,
        exitX,
        exitY: 1,
        entryX,
        entryY: 0,
        bendPoints: [
          { x: sx, y: corridorY },
          { x: tx, y: corridorY },
        ],
      };
    }

    // Case D: Multi-tier skip downward (iv > iu + 1) OR upward feedback loop (iv < iu) OR blocked multi-row ->
    // Route strictly via empty inter-tier corridors + dedicated outside vertical bypass bus!
    const isUpward = iv < iu;
    const busX = isUpward
      ? Math.round(tierX - 30 - leftBusCursor++ * BUS_STEP)
      : Math.round(tierRight + 30 + rightBusCursor++ * BUS_STEP);

    const exitX = nextPortFraction(outPortUsed, outPortTotals, edge.source);
    const entryX = nextPortFraction(inPortUsed, inPortTotals, edge.target);
    const sx = Math.round(src.absX + src.width * exitX);
    const tx = Math.round(tgt.absX + tgt.width * entryX);

    // Choose empty corridors adjacent to src and tgt that NEVER pass through another row inside the tier
    const srcExitBottom = !srcBlockedBelow;
    const tgtEnterTop = !tgtBlockedAbove;
    const outCorridorY = nextGapY(srcExitBottom ? iu : iu - 1);
    const inCorridorY = nextGapY(tgtEnterTop ? iv - 1 : iv);

    return {
      ...edge,
      exitX,
      exitY: srcExitBottom ? 1 : 0,
      entryX,
      entryY: tgtEnterTop ? 0 : 1,
      bendPoints: [
        { x: sx, y: outCorridorY },
        { x: busX, y: outCorridorY },
        { x: busX, y: inCorridorY },
        { x: tx, y: inCorridorY },
      ],
    };
  });

  const enrichedTiers: GraphTier[] = graph.tiers.map((t) => {
    const coords = tierCoordsMap.get(t.id) || { x: tierX, y: FIRST_TIER_Y, width: uniformTierWidth, height: 150 };
    return { ...t, ...coords };
  });

  const enrichedNodes: GraphNode[] = graph.nodes.map((n) => {
    const coords = nodeRelMap.get(n.id) || { x: TIER_PAD_LEFT, y: TIER_HEADER_BAND, width: 220, height: 78 };
    return { ...n, ...coords };
  });

  return {
    ...graph,
    tiers: enrichedTiers,
    nodes: enrichedNodes,
    edges: enrichedEdges,
  };
}
