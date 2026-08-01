import { XMLParser } from 'fast-xml-parser';
import { ArchitectureGraph, GraphTier, GraphNode, GraphEdge } from './schema';

export function xmlToGraph(xml: string): ArchitectureGraph | null {
  if (!xml || typeof xml !== 'string' || !xml.includes('<mxfile')) {
    return null;
  }

  try {
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
      textNodeName: '#text',
    });

    const parsed = parser.parse(xml);
    const model = parsed?.mxfile?.diagram?.mxGraphModel || parsed?.mxGraphModel;
    if (!model || !model.root) {
      return null;
    }

    const cells: any[] = Array.isArray(model.root.mxCell)
      ? model.root.mxCell
      : model.root.mxCell
      ? [model.root.mxCell]
      : [];

    if (cells.length === 0) {
      return null;
    }

    const tiers: GraphTier[] = [];
    const nodes: GraphNode[] = [];
    const edges: GraphEdge[] = [];

    const tierMap = new Map<string, GraphTier>();
    const nodeMap = new Map<string, GraphNode>();

    let tierCount = 0;

    // First pass: Find container vertices (tiers)
    for (const cell of cells) {
      const id = cell['@_id'];
      const value = cell['@_value'] || '';
      const style = cell['@_style'] || '';
      const vertex = cell['@_vertex'];

      if (vertex && (style.includes('container=1') || style.includes('swimlane'))) {
        tierCount++;
        const label = value.replace(/<[^>]*>/g, '').trim() || `Tier ${tierCount}`;
        const tier: GraphTier = {
          id: id || `tier_${tierCount}`,
          label,
          order: tierCount,
        };
        tierMap.set(id, tier);
        tiers.push(tier);
      }
    }

    // Default tier if no containers found
    if (tiers.length === 0) {
      const defaultTier: GraphTier = {
        id: 'tier_default',
        label: 'General Architecture Tier',
        order: 1,
      };
      tiers.push(defaultTier);
      tierMap.set('1', defaultTier);
    }

    // Second pass: Find node vertices
    for (const cell of cells) {
      const id = cell['@_id'];
      const value = cell['@_value'] || '';
      const style = cell['@_style'] || '';
      const vertex = cell['@_vertex'];
      const parent = cell['@_parent'] || '1';

      if (vertex && id && id !== '0' && id !== '1' && !tierMap.has(id)) {
        // Strip HTML tags for clean label
        const plainText = value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
        const labelParts = plainText.split(/\s+—\s+|\s+-\s+|\n/);
        const label = labelParts[0] || `Node ${id}`;
        const subtitle = labelParts.slice(1).join(' ') || undefined;

        const parentTier = tierMap.get(parent) || tiers[0];

        // Infer node type
        let type: GraphNode['type'] = 'compute';
        if (style.includes('cylinder') || style.includes('database') || style.includes('storage')) {
          type = 'database';
        } else if (style.includes('rhombus') || style.includes('gateway') || style.includes('ingress')) {
          type = 'gateway';
        } else if (style.includes('security') || style.includes('shield') || style.includes('armor')) {
          type = 'security';
        } else if (style.includes('ai') || style.includes('brain') || style.includes('vertex')) {
          type = 'ai';
        } else if (style.includes('queue') || style.includes('pubsub') || style.includes('kafka')) {
          type = 'queue';
        }

        const node: GraphNode = {
          id,
          label,
          subtitle,
          tier: parentTier.id,
          type,
        };
        nodeMap.set(id, node);
        nodes.push(node);
      }
    }

    // Third pass: Find edges
    for (const cell of cells) {
      const id = cell['@_id'];
      const value = cell['@_value'] || '';
      const style = cell['@_style'] || '';
      const edge = cell['@_edge'];
      const source = cell['@_source'];
      const target = cell['@_target'];

      if (edge && source && target && nodeMap.has(source) && nodeMap.has(target)) {
        const plainLabel = value.replace(/<[^>]*>/g, '').trim();
        const graphEdge: GraphEdge = {
          id: id || `edge_${edges.length + 1}`,
          source,
          target,
          label: plainLabel || undefined,
          style: style.includes('dashed') ? 'dashed' : 'solid',
        };
        edges.push(graphEdge);
      }
    }

    if (nodes.length === 0) {
      return null;
    }

    return {
      title: 'Extracted Architecture Graph',
      cloud: 'generic',
      tiers,
      nodes,
      edges,
      narrative: {
        reasoning: 'Extracted from mxGraph XML structure',
        businessUsecase: 'Template Architecture View',
        technicalUsecase: 'Extracted Node-Edge Topology',
      },
    };
  } catch (err) {
    return null;
  }
}
