import Ajv, { JSONSchemaType } from 'ajv';

export type CloudEnum = 'gcp' | 'aws' | 'azure' | 'hybrid' | 'generic';

export type NodeTypeEnum =
  | 'compute'
  | 'database'
  | 'storage'
  | 'queue'
  | 'cache'
  | 'network'
  | 'security'
  | 'ai'
  | 'analytics'
  | 'user'
  | 'external';

export type EdgeStyleEnum = 'solid' | 'dashed';

export interface GraphTier {
  id: string;
  label: string;
  order: number;
}

export interface GraphNode {
  id: string;
  label: string;
  tier: string;
  type: NodeTypeEnum;
  product: string;
  description: string;
  // Optional layout attributes added in Phase 2
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

export interface GraphEdgeBendPoint {
  x: number;
  y: number;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  label: string;
  style: EdgeStyleEnum;
  protocol?: string;
  // Optional bend points from layout
  bendPoints?: GraphEdgeBendPoint[];
}

export interface ArchitectureGraph {
  title: string;
  cloud: CloudEnum;
  tiers: GraphTier[];
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export const ARCHITECTURE_GRAPH_JSON_SCHEMA: JSONSchemaType<ArchitectureGraph> = {
  type: 'object',
  properties: {
    title: { type: 'string', minLength: 1 },
    cloud: {
      type: 'string',
      enum: ['gcp', 'aws', 'azure', 'hybrid', 'generic'],
    },
    tiers: {
      type: 'array',
      minItems: 1,
      maxItems: 8,
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', minLength: 1 },
          label: { type: 'string', minLength: 1 },
          order: { type: 'integer' },
        },
        required: ['id', 'label', 'order'],
        additionalProperties: false,
      },
    },
    nodes: {
      type: 'array',
      minItems: 1,
      maxItems: 60,
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', minLength: 1 },
          label: { type: 'string', minLength: 1 },
          tier: { type: 'string', minLength: 1 },
          type: {
            type: 'string',
            enum: [
              'compute',
              'database',
              'storage',
              'queue',
              'cache',
              'network',
              'security',
              'ai',
              'analytics',
              'user',
              'external',
            ],
          },
          product: { type: 'string', minLength: 1 },
          description: { type: 'string', minLength: 1 },
          x: { type: 'number', nullable: true },
          y: { type: 'number', nullable: true },
          width: { type: 'number', nullable: true },
          height: { type: 'number', nullable: true },
        },
        required: ['id', 'label', 'tier', 'type', 'product', 'description'],
        additionalProperties: false,
      },
    },
    edges: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', minLength: 1 },
          source: { type: 'string', minLength: 1 },
          target: { type: 'string', minLength: 1 },
          label: { type: 'string' },
          style: { type: 'string', enum: ['solid', 'dashed'] },
          protocol: { type: 'string', nullable: true },
          bendPoints: {
            type: 'array',
            nullable: true,
            items: {
              type: 'object',
              properties: {
                x: { type: 'number' },
                y: { type: 'number' },
              },
              required: ['x', 'y'],
              additionalProperties: false,
            },
          },
        },
        required: ['id', 'source', 'target', 'label', 'style'],
        additionalProperties: false,
      },
    },
  },
  required: ['title', 'cloud', 'tiers', 'nodes', 'edges'],
  additionalProperties: false,
};

const ajv = new Ajv({ allErrors: true, useDefaults: true });
const compileValidator = ajv.compile(ARCHITECTURE_GRAPH_JSON_SCHEMA);

export function validateGraphJson(data: unknown): {
  valid: boolean;
  errors: string[];
  graph?: ArchitectureGraph;
} {
  const errors: string[] = [];

  if (!data || typeof data !== 'object') {
    return { valid: false, errors: ['Graph response must be a non-null JSON object'] };
  }

  const validStructure = compileValidator(data);
  if (!validStructure && compileValidator.errors) {
    for (const err of compileValidator.errors) {
      errors.push(`Schema Error at ${err.instancePath || '/'}: ${err.message}`);
    }
  }

  const g = data as ArchitectureGraph;
  if (!g.tiers || !g.nodes || !g.edges) {
    return { valid: false, errors: errors.length ? errors : ['Missing tiers, nodes, or edges'] };
  }

  // Check unique IDs
  const allIds = new Set<string>();
  const tierIds = new Set<string>();
  const nodeIds = new Set<string>();

  for (const tier of g.tiers || []) {
    if (allIds.has(tier.id)) {
      errors.push(`Duplicate ID found: "${tier.id}" in tiers`);
    }
    allIds.add(tier.id);
    tierIds.add(tier.id);
  }

  for (const node of g.nodes || []) {
    if (allIds.has(node.id)) {
      errors.push(`Duplicate ID found: "${node.id}" in nodes`);
    }
    allIds.add(node.id);
    nodeIds.add(node.id);

    if (!tierIds.has(node.tier)) {
      errors.push(`Node "${node.id}" references non-existent tier "${node.tier}"`);
    }
  }

  for (const edge of g.edges || []) {
    if (allIds.has(edge.id)) {
      errors.push(`Duplicate ID found: "${edge.id}" in edges`);
    }
    allIds.add(edge.id);

    if (!nodeIds.has(edge.source)) {
      errors.push(`Edge "${edge.id}" source references non-existent node "${edge.source}"`);
    }
    if (!nodeIds.has(edge.target)) {
      errors.push(`Edge "${edge.id}" target references non-existent node "${edge.target}"`);
    }
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return { valid: true, errors: [], graph: g };
}
