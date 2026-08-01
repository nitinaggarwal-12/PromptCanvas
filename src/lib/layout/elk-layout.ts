import ELK, { ElkNode, ElkExtendedEdge } from 'elkjs';
import { ArchitectureGraph, GraphNode, GraphTier, GraphEdge } from '../graph/schema';

const elk = new ELK();

/**
 * Calculates node width dynamically based on label length heuristic.
 * Min width 180, capped at 260.
 */
export function calculateNodeWidth(label: string): number {
  const charWidth = 7.5;
  const padding = 40;
  const computed = Math.ceil(label.length * charWidth + padding);
  return Math.min(Math.max(computed, 180), 260);
}

export async function computeElkLayout(graph: ArchitectureGraph): Promise<ArchitectureGraph> {
  const sortedTiers = [...graph.tiers].sort((a, b) => a.order - b.order);

  // Build ELK parent nodes for each tier
  const tierChildren: ElkNode[] = sortedTiers.map((tier) => {
    const nodesInTier = graph.nodes.filter((n) => n.tier === tier.id);
    const children: ElkNode[] = nodesInTier.map((node) => {
      const w = calculateNodeWidth(node.label);
      const h = 72;
      return {
        id: node.id,
        width: w,
        height: h,
      };
    });

    return {
      id: tier.id,
      layoutOptions: {
        'elk.padding': '[top=50, left=30, bottom=30, right=30]',
        'elk.spacing.nodeNode': '60',
        'elk.layered.spacing.nodeNodeBetweenLayers': '70',
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
      'elk.layered.spacing.nodeNodeBetweenLayers': '70',
      'elk.spacing.nodeNode': '60',
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
    const tierWidth = Math.max(tierElkNode.width || 800, 600);
    const tierHeight = Math.max(tierElkNode.height || 160, 120);
    const tierX = canvasX;
    const tierY = currentTierY;

    tierMap.set(tierElkNode.id, {
      x: tierX,
      y: tierY,
      width: tierWidth,
      height: tierHeight,
    });

    // Process child nodes of tier
    for (const childNode of tierElkNode.children || []) {
      // Child coordinates inside ELK are relative to parent tier container
      const relX = childNode.x || 30;
      const relY = childNode.y || 50;

      nodeMap.set(childNode.id, {
        x: Math.round(relX),
        y: Math.round(relY),
        width: Math.round(childNode.width || 180),
        height: Math.round(childNode.height || 72),
      });
    }

    currentTierY += tierHeight + 40; // 40px vertical gap between tier containers
  }

  // Enrich tiers with x, y, width, height
  const enrichedTiers: GraphTier[] = graph.tiers.map((t) => {
    const coords = tierMap.get(t.id) || { x: 40, y: 40, width: 800, height: 160 };
    return {
      ...t,
      ...coords,
    };
  });

  // Enrich nodes with relative coordinates & dimensions
  const enrichedNodes: GraphNode[] = graph.nodes.map((n) => {
    const coords = nodeMap.get(n.id) || { x: 30, y: 50, width: 180, height: 72 };
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
