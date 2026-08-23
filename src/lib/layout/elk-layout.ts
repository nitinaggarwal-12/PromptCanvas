import ELK, { ElkNode, ElkExtendedEdge } from 'elkjs/lib/elk.bundled.js';
import { ArchitectureGraph, GraphNode, GraphTier, GraphEdge } from '../graph/schema';

const elk = new ELK();

/**
 * Calculates node width dynamically based on label length heuristic.
 * Min width 190, capped at 280.
 */
export function calculateNodeWidth(label: string): number {
  const charWidth = 8.0;
  const padding = 50;
  const computed = Math.ceil((label || '').length * charWidth + padding);
  return Math.min(Math.max(computed, 190), 280);
}

/**
 * 2D Collision Auto-Healer:
 * Sweeps nodes within a tier to ensure strict non-overlapping bounds with minimum 30px horizontal clearance.
 */
function healTierNodeCollisions(
  nodes: { id: string; x: number; y: number; width: number; height: number }[],
  minMargin = 30
): { nodes: { id: string; x: number; y: number; width: number; height: number }[]; requiredWidth: number } {
  if (!nodes || nodes.length === 0) return { nodes: [], requiredWidth: 800 };

  // Sort nodes by X coordinate within the tier
  const sorted = [...nodes].sort((a, b) => a.x - b.x);

  let currentX = Math.max(sorted[0].x, 30);
  let maxRight = 0;

  for (let i = 0; i < sorted.length; i++) {
    const node = sorted[i];
    if (node.x < currentX) {
      node.x = currentX;
    }
    currentX = node.x + node.width + minMargin;
    maxRight = Math.max(maxRight, node.x + node.width + 30);
  }

  return {
    nodes: sorted,
    requiredWidth: Math.max(maxRight + 30, 800),
  };
}

export async function computeElkLayout(graph: ArchitectureGraph): Promise<ArchitectureGraph> {
  const sortedTiers = [...graph.tiers].sort((a, b) => a.order - b.order);

  // Build ELK parent nodes for each tier
  const tierChildren: ElkNode[] = sortedTiers.map((tier) => {
    const nodesInTier = graph.nodes.filter((n) => n.tier === tier.id);
    const children: ElkNode[] = nodesInTier.map((node) => {
      const w = calculateNodeWidth(node.label);
      const h = 64;
      return {
        id: node.id,
        width: w,
        height: h,
      };
    });

    return {
      id: tier.id,
      layoutOptions: {
        'elk.padding': '[top=45, left=30, bottom=25, right=30]',
        'elk.spacing.nodeNode': '50',
        'elk.layered.spacing.nodeNodeBetweenLayers': '60',
      },
      children,
    };
  });

  // Map edges
  const elkEdges: ElkExtendedEdge[] = graph.edges.map((edge) => ({
    id: edge.id,
    sources: [edge.source],
    targets: [edge.target],
  }));

  const rootElkNode: ElkNode = {
    id: 'root_canvas',
    layoutOptions: {
      'elk.algorithm': 'layered',
      'elk.direction': 'DOWN',
      'elk.layered.spacing.nodeNodeBetweenLayers': '60',
      'elk.spacing.nodeNode': '50',
      'elk.hierarchyHandling': 'INCLUDE_CHILDREN',
      'elk.layered.crossingMinimization.strategy': 'LAYER_SWEEP',
      'elk.edgeRouting': 'ORTHOGONAL',
      'elk.partitioning.activate': 'true',
    },
    children: tierChildren,
    edges: elkEdges,
  };

  const laidOutRoot = await elk.layout(rootElkNode);

  // Map calculated coordinates back to graph
  const nodeMap = new Map<string, { x: number; y: number; width: number; height: number }>();
  const tierMap = new Map<string, { x: number; y: number; width: number; height: number }>();

  let currentTierY = 40;
  const canvasX = 40;

  for (const tierElkNode of laidOutRoot.children || []) {
    const rawTierNodes: { id: string; x: number; y: number; width: number; height: number }[] = [];

    // Process child nodes of tier
    for (const childNode of tierElkNode.children || []) {
      const relX = childNode.x || 30;
      const relY = childNode.y || 45;
      rawTierNodes.push({
        id: childNode.id,
        x: Math.round(relX),
        y: Math.round(relY),
        width: Math.round(childNode.width || 190),
        height: Math.round(childNode.height || 64),
      });
    }

    // Apply 2D collision auto-healer
    const healed = healTierNodeCollisions(rawTierNodes, 30);
    healed.nodes.forEach((n) => {
      nodeMap.set(n.id, {
        x: n.x,
        y: n.y,
        width: n.width,
        height: n.height,
      });
    });

    const tierWidth = Math.max(tierElkNode.width || 800, healed.requiredWidth, 800);
    const tierHeight = Math.max(tierElkNode.height || 140, 130);
    const tierX = canvasX;
    const tierY = currentTierY;

    tierMap.set(tierElkNode.id, {
      x: tierX,
      y: tierY,
      width: tierWidth,
      height: tierHeight,
    });

    currentTierY += tierHeight + 45; // 45px vertical gap between tier containers
  }

  // Enrich tiers with x, y, width, height
  const enrichedTiers: GraphTier[] = graph.tiers.map((t) => {
    const coords = tierMap.get(t.id) || { x: 40, y: 40, width: 800, height: 140 };
    return {
      ...t,
      ...coords,
    };
  });

  // Enrich nodes with relative coordinates & dimensions
  const enrichedNodes: GraphNode[] = graph.nodes.map((n) => {
    const coords = nodeMap.get(n.id) || { x: 30, y: 45, width: 190, height: 64 };
    return {
      ...n,
      ...coords,
    };
  });

  // Map edge bend points
  const edgeMap = new Map<string, { x: number; y: number }[]>();
  if (laidOutRoot.edges) {
    for (const elkEdge of laidOutRoot.edges) {
      const bendPoints: { x: number; y: number }[] = [];
      if (elkEdge.sections) {
        for (const sec of elkEdge.sections) {
          if (sec.bendPoints) {
            for (const bp of sec.bendPoints) {
              bendPoints.push({ x: Math.round(bp.x), y: Math.round(bp.y) });
            }
          }
        }
      }
      edgeMap.set(elkEdge.id, bendPoints);
    }
  }

  const enrichedEdges: GraphEdge[] = graph.edges.map((e) => ({
    ...e,
    bendPoints: edgeMap.get(e.id) || [],
  }));

  return {
    ...graph,
    tiers: enrichedTiers,
    nodes: enrichedNodes,
    edges: enrichedEdges,
  };
}

