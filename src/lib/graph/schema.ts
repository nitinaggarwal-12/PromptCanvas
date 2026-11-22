import { z } from 'zod';

export const CLOUD_VALUES = ['gcp', 'aws', 'azure', 'hybrid', 'generic'] as const;
const CloudEnumSchema = z.enum(CLOUD_VALUES);
export type CloudEnum = z.infer<typeof CloudEnumSchema>;

/**
 * Single canonical NodeType vocabulary shared by Zod validation, Gemini responseSchema,
 * prompt instructions, and Draw.io/Slides renderers so schema drift is structurally impossible.
 */
export const NODE_TYPE_VALUES = [
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
  'gateway',
  'service',
] as const;

const NodeTypeEnumSchema = z.enum(NODE_TYPE_VALUES);
export type NodeTypeEnum = z.infer<typeof NodeTypeEnumSchema>;

const VALID_NODE_TYPE_SET = new Set<string>(NODE_TYPE_VALUES);
const VALID_CLOUD_SET = new Set<string>(CLOUD_VALUES);

const EdgeStyleEnumSchema = z.enum(['solid', 'dashed']);

const GraphTierSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  order: z.number().int().min(1).max(12),
  x: z.number().optional(),
  y: z.number().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
});
export type GraphTier = z.infer<typeof GraphTierSchema>;

const GraphNodeSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  subtitle: z.string().optional(),
  tier: z.string().min(1),
  type: NodeTypeEnumSchema,
  product: z.string().optional(),
  description: z.string().optional(),
  x: z.number().optional(),
  y: z.number().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
});
export type GraphNode = z.infer<typeof GraphNodeSchema>;

const GraphEdgeSchema = z.object({
  id: z.string().min(1),
  source: z.string().min(1),
  target: z.string().min(1),
  label: z.string().optional(),
  style: EdgeStyleEnumSchema,
  protocol: z.string().optional(),
  bendPoints: z.array(z.object({ x: z.number(), y: z.number() })).optional(),
  exitX: z.number().optional(),
  exitY: z.number().optional(),
  entryX: z.number().optional(),
  entryY: z.number().optional(),
});
export type GraphEdge = z.infer<typeof GraphEdgeSchema>;

const NarrativeSchema = z.object({
  reasoning: z.string(),
  businessUsecase: z.string(),
  technicalUsecase: z.string(),
});
type Narrative = z.infer<typeof NarrativeSchema>;

const ArchitectureGraphSchema = z.object({
  title: z.string().min(1),
  cloud: CloudEnumSchema,
  tiers: z.array(GraphTierSchema).min(1).max(12),
  nodes: z.array(GraphNodeSchema).min(1).max(60),
  edges: z.array(GraphEdgeSchema),
  narrative: NarrativeSchema.optional(),
});
export type ArchitectureGraph = z.infer<typeof ArchitectureGraphSchema>;

/**
 * Deterministically normalizes common LLM formatting quirks (0-based tier order, unknown node type
 * aliases, missing edge style, empty optional fields) BEFORE Zod validation, without hiding
 * genuinely invalid graphs (missing title, duplicate IDs, dangling edges, >60 nodes, 0 tiers).
 */
export function normalizeRawLlmGraphPayload(raw: unknown): unknown {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return raw;
  const obj = raw as Record<string, any>;
  const clone: Record<string, any> = { ...obj };

  // Normalize cloud enum
  if (typeof clone.cloud === 'string') {
    const c = clone.cloud.trim().toLowerCase();
    clone.cloud = VALID_CLOUD_SET.has(c)
      ? c
      : c.includes('aws') || c.includes('amazon')
        ? 'aws'
        : c.includes('azure') || c.includes('microsoft')
          ? 'azure'
          : c.includes('hybrid') || c.includes('multi')
            ? 'hybrid'
            : c.includes('gcp') || c.includes('google')
              ? 'gcp'
              : 'generic';
  }

  // Normalize 0-based or gapped tier orders strictly into 1..N while preserving relative order
  if (Array.isArray(clone.tiers) && clone.tiers.length > 0) {
    const minOrder = Math.min(
      ...clone.tiers.map((t: any) => (typeof t?.order === 'number' && Number.isFinite(t.order) ? t.order : 1))
    );
    const shift = minOrder < 1 ? 1 - minOrder : 0;
    clone.tiers = clone.tiers.map((t: any, idx: number) => {
      if (!t || typeof t !== 'object') return t;
      const rawOrder = typeof t.order === 'number' && Number.isFinite(t.order) ? Math.round(t.order) + shift : idx + 1;
      return {
        ...t,
        order: Math.max(1, Math.min(12, rawOrder)),
      };
    });
  }

  // Normalize node types (aliases like 'ml' -> 'ai', 'db' -> 'database', 'api' -> 'service')
  if (Array.isArray(clone.nodes)) {
    clone.nodes = clone.nodes.map((n: any) => {
      if (!n || typeof n !== 'object') return n;
      const rawType = typeof n.type === 'string' ? n.type.trim().toLowerCase() : 'service';
      let mappedType = rawType;
      if (!VALID_NODE_TYPE_SET.has(mappedType)) {
        if (/db|sql|nosql|warehouse|lake|ledger|dynamo|spanner|cosmos|postgres|mongo/.test(rawType)) mappedType = 'database';
        else if (/ml|llm|model|agent|inference|vector|embed/.test(rawType)) mappedType = 'ai';
        else if (/broker|stream|kafka|pubsub|event|bus|mq|sqs|kinesis/.test(rawType)) mappedType = 'queue';
        else if (/auth|iam|kms|waf|shield|dlp|firewall|vault|gov|observ|monitor|log/.test(rawType)) mappedType = 'security';
        else if (/bi|dashboard|report|metric|telemetry|analytics/.test(rawType)) mappedType = 'analytics';
        else if (/bucket|blob|object|file|s3|gcs/.test(rawType)) mappedType = 'storage';
        else if (/redis|memcache|cdn/.test(rawType)) mappedType = 'cache';
        else if (/client|browser|mobile|device|sensor|actor|operator/.test(rawType)) mappedType = 'user';
        else if (/lb|mesh|vpc|ingress|egress|router|dns/.test(rawType)) mappedType = 'network';
        else if (/proxy|gw|apigee|kong/.test(rawType)) mappedType = 'gateway';
        else mappedType = 'service';
      }
      return { ...n, type: mappedType };
    });
  }

  // Normalize edge styles (default missing/unknown style to 'solid')
  if (Array.isArray(clone.edges)) {
    clone.edges = clone.edges.map((e: any) => {
      if (!e || typeof e !== 'object') return e;
      const st = typeof e.style === 'string' ? e.style.trim().toLowerCase() : 'solid';
      return {
        ...e,
        style: st === 'dashed' || st === 'dotted' || st === 'async' ? 'dashed' : 'solid',
      };
    });
  }

  return clone;
}

/**
 * Strips physical layout coordinates (x, y, width, height, bendPoints) before sending a graph
 * to the LLM edit pass, cutting token count by ~50% and avoiding timeouts.
 */
export function stripLayoutFromGraph(graph: ArchitectureGraph): ArchitectureGraph {
  return {
    title: graph.title,
    cloud: graph.cloud,
    tiers: graph.tiers.map(({ id, label, order }) => ({ id, label, order })),
    nodes: graph.nodes.map(({ id, label, subtitle, tier, type, product, description }) => ({
      id,
      label,
      ...(subtitle ? { subtitle } : {}),
      tier,
      type,
      ...(product ? { product } : {}),
      ...(description ? { description } : {}),
    })),
    edges: graph.edges.map(({ id, source, target, label, style, protocol }) => ({
      id,
      source,
      target,
      ...(label ? { label } : {}),
      style,
      ...(protocol ? { protocol } : {}),
    })),
    ...(graph.narrative ? { narrative: graph.narrative } : {}),
  };
}

export function validateGraphJson(data: unknown): {
  valid: boolean;
  errors: string[];
  graph?: ArchitectureGraph;
} {
  const parseResult = ArchitectureGraphSchema.safeParse(data);
  if (!parseResult.success) {
    const errors = parseResult.error.issues.map(
      (issue) => `[${issue.path.join('.')}] ${issue.message}`
    );
    return { valid: false, errors };
  }

  const g = parseResult.data;
  const errors: string[] = [];

  const allIds = new Set<string>();
  const tierIds = new Set<string>();
  const nodeIds = new Set<string>();

  for (const tier of g.tiers) {
    if (allIds.has(tier.id)) {
      errors.push(`Duplicate ID found: "${tier.id}" in tiers`);
    }
    allIds.add(tier.id);
    tierIds.add(tier.id);
  }

  for (const node of g.nodes) {
    if (allIds.has(node.id)) {
      errors.push(`Duplicate ID found: "${node.id}" in nodes`);
    }
    allIds.add(node.id);
    nodeIds.add(node.id);

    if (!tierIds.has(node.tier)) {
      errors.push(`Node "${node.id}" references non-existent tier "${node.tier}"`);
    }
  }

  for (const edge of g.edges) {
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
