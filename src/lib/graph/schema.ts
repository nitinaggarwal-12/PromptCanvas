import { z } from 'zod';

export const CloudEnumSchema = z.enum(['gcp', 'aws', 'azure', 'hybrid', 'generic']);
export type CloudEnum = z.infer<typeof CloudEnumSchema>;

export const NodeTypeEnumSchema = z.enum([
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
]);
export type NodeTypeEnum = z.infer<typeof NodeTypeEnumSchema>;

export const EdgeStyleEnumSchema = z.enum(['solid', 'dashed']);
export type EdgeStyleEnum = z.infer<typeof EdgeStyleEnumSchema>;

export const GraphTierSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  order: z.number().int().min(1).max(8),
});
export type GraphTier = z.infer<typeof GraphTierSchema>;

export const GraphNodeSchema = z.object({
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

export const GraphEdgeSchema = z.object({
  id: z.string().min(1),
  source: z.string().min(1),
  target: z.string().min(1),
  label: z.string().optional(),
  style: EdgeStyleEnumSchema,
  protocol: z.string().optional(),
  bendPoints: z.array(z.object({ x: z.number(), y: z.number() })).optional(),
});
export type GraphEdge = z.infer<typeof GraphEdgeSchema>;

export const NarrativeSchema = z.object({
  reasoning: z.string(),
  businessUsecase: z.string(),
  technicalUsecase: z.string(),
});
export type Narrative = z.infer<typeof NarrativeSchema>;

export const ArchitectureGraphSchema = z.object({
  title: z.string().min(1),
  cloud: CloudEnumSchema,
  tiers: z.array(GraphTierSchema).min(1).max(8),
  nodes: z.array(GraphNodeSchema).min(1).max(60),
  edges: z.array(GraphEdgeSchema),
  narrative: NarrativeSchema,
});
export type ArchitectureGraph = z.infer<typeof ArchitectureGraphSchema>;

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
