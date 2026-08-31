import type {
  Studio1Pattern,
  Studio1SemanticEdge,
  Studio1SemanticGraph,
  Studio1SemanticNode,
} from './studio1HybridEngine';

export type Studio1Action = 'auto' | 'create' | 'incremental_edit' | 'guided_refactor' | 'full_refactor';
export type Studio1Persona = 'auto' | 'executive' | 'product_manager' | 'solution_architect' | 'developer' | 'data_engineer' | 'network_engineer' | 'security_architect' | 'sre' | 'mixed';
export type Studio1Level = 'auto' | 'executive' | 'conceptual' | 'logical' | 'technical' | 'operational' | 'implementation';
export type Studio1Viewpoint = 'auto' | 'end_to_end' | 'user_flow' | 'application' | 'integration' | 'network' | 'security' | 'data' | 'ai_ml' | 'deployment' | 'observability' | 'migration';
export type Studio1Depth = 'auto' | 'standard' | 'detailed' | 'exhaustive';
export type Studio1ConversationIntent = 'discuss' | 'clarify' | 'propose_change' | 'apply_change' | 'refactor' | 'validate' | 'revert';

export interface Studio1GenerationContext {
  action: Studio1Action;
  persona: Studio1Persona;
  level: Studio1Level;
  viewpoint: Studio1Viewpoint;
  depth: Studio1Depth;
  lifecycleState: 'current' | 'transition' | 'target';
  platform: 'auto' | 'gcp' | 'aws' | 'azure' | 'hybrid' | 'vendor_neutral';
  purpose?: string;
  industry?: string;
}

export interface Studio1DecisionLedger {
  confirmedRequirements: string[];
  constraints: string[];
  lockedNodeIds: string[];
  rejectedOptions: string[];
  assumptions: string[];
  openQuestions: string[];
}

export type Studio1PatchOperation =
  | { op: 'add_node'; node: Studio1SemanticNode }
  | { op: 'update_node'; nodeId: string; changes: Partial<Omit<Studio1SemanticNode, 'id'>> }
  | { op: 'remove_node'; nodeId: string }
  | { op: 'add_edge'; edge: Studio1SemanticEdge }
  | { op: 'update_edge'; edgeId: string; changes: Partial<Omit<Studio1SemanticEdge, 'id'>> }
  | { op: 'remove_edge'; edgeId: string }
  | { op: 'insert_between'; edgeId: string; node: Studio1SemanticNode; inbound?: Partial<Studio1SemanticEdge>; outbound?: Partial<Studio1SemanticEdge> }
  | { op: 'change_patterns'; patterns: Studio1Pattern[] };

export interface Studio1ChangePlan {
  intent: Studio1ConversationIntent;
  summary: string;
  rationale: string;
  operations: Studio1PatchOperation[];
  preservedNodeIds: string[];
  requiresConfirmation: boolean;
  clarificationQuestion?: string;
  options?: Array<{ id: string; label: string; recommended?: boolean }>;
}

export interface Studio1GraphDiff {
  addedNodeIds: string[];
  removedNodeIds: string[];
  modifiedNodeIds: string[];
  addedEdgeIds: string[];
  removedEdgeIds: string[];
  modifiedEdgeIds: string[];
  patternsChanged: boolean;
  meaningfulChangeCount: number;
  blastRadiusPercent: number;
}

export interface Studio1ChangeValidation {
  valid: boolean;
  violations: string[];
  warnings: string[];
  diff: Studio1GraphDiff;
  risk: 'low' | 'medium' | 'high';
}

export interface Studio1EmbeddedState {
  schemaVersion: 1;
  graph: Studio1SemanticGraph;
  context: Studio1GenerationContext;
  decisionLedger: Studio1DecisionLedger;
}

const cloneGraph = (graph: Studio1SemanticGraph): Studio1SemanticGraph => JSON.parse(JSON.stringify(graph));

function canonical(value: unknown): string {
  if (!value || typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonical).join(',')}]`;
  const record = value as Record<string, unknown>;
  return `{${Object.keys(record).sort().map(key => `${JSON.stringify(key)}:${canonical(record[key])}`).join(',')}}`;
}

function uniqueId(requested: string, occupied: Set<string>, prefix: string): string {
  const base = (requested || prefix).toLowerCase().replace(/[^a-z0-9_-]+/g, '_').replace(/^_+|_+$/g, '') || prefix;
  if (!occupied.has(base)) return base;
  let suffix = 2;
  while (occupied.has(`${base}_${suffix}`)) suffix += 1;
  return `${base}_${suffix}`;
}

export function diffStudio1Graphs(before: Studio1SemanticGraph, after: Studio1SemanticGraph): Studio1GraphDiff {
  const beforeNodes = new Map(before.nodes.map(node => [node.id, node]));
  const afterNodes = new Map(after.nodes.map(node => [node.id, node]));
  const beforeEdges = new Map(before.edges.map(edge => [edge.id, edge]));
  const afterEdges = new Map(after.edges.map(edge => [edge.id, edge]));
  const addedNodeIds = [...afterNodes.keys()].filter(id => !beforeNodes.has(id));
  const removedNodeIds = [...beforeNodes.keys()].filter(id => !afterNodes.has(id));
  const modifiedNodeIds = [...afterNodes.keys()].filter(id => beforeNodes.has(id) && canonical(afterNodes.get(id)) !== canonical(beforeNodes.get(id)));
  const addedEdgeIds = [...afterEdges.keys()].filter(id => !beforeEdges.has(id));
  const removedEdgeIds = [...beforeEdges.keys()].filter(id => !afterEdges.has(id));
  const modifiedEdgeIds = [...afterEdges.keys()].filter(id => beforeEdges.has(id) && canonical(afterEdges.get(id)) !== canonical(beforeEdges.get(id)));
  const patternsChanged = canonical(before.patterns) !== canonical(after.patterns);
  const meaningfulChangeCount = addedNodeIds.length + removedNodeIds.length + modifiedNodeIds.length + addedEdgeIds.length + removedEdgeIds.length + modifiedEdgeIds.length + (patternsChanged ? 1 : 0);
  const baseline = Math.max(1, before.nodes.length + before.edges.length);
  return {
    addedNodeIds,
    removedNodeIds,
    modifiedNodeIds,
    addedEdgeIds,
    removedEdgeIds,
    modifiedEdgeIds,
    patternsChanged,
    meaningfulChangeCount,
    blastRadiusPercent: Math.min(100, Math.round((meaningfulChangeCount / baseline) * 100)),
  };
}

export function applyStudio1Patch(base: Studio1SemanticGraph, operations: Studio1PatchOperation[]): Studio1SemanticGraph {
  const graph = cloneGraph(base);
  const nodeIds = new Set(graph.nodes.map(node => node.id));
  const edgeIds = new Set(graph.edges.map(edge => edge.id));

  for (const operation of operations) {
    if (operation.op === 'add_node') {
      const id = uniqueId(operation.node.id, nodeIds, 'component');
      graph.nodes.push({ ...operation.node, id });
      nodeIds.add(id);
    } else if (operation.op === 'update_node') {
      const node = graph.nodes.find(item => item.id === operation.nodeId);
      if (!node) throw new Error(`Patch target node ${operation.nodeId} does not exist.`);
      Object.assign(node, operation.changes, { id: node.id });
    } else if (operation.op === 'remove_node') {
      if (!nodeIds.has(operation.nodeId)) throw new Error(`Patch target node ${operation.nodeId} does not exist.`);
      graph.nodes = graph.nodes.filter(node => node.id !== operation.nodeId);
      graph.edges = graph.edges.filter(edge => edge.source !== operation.nodeId && edge.target !== operation.nodeId);
      nodeIds.delete(operation.nodeId);
    } else if (operation.op === 'add_edge') {
      if (!nodeIds.has(operation.edge.source) || !nodeIds.has(operation.edge.target)) throw new Error(`Patch edge ${operation.edge.id} references a missing node.`);
      const id = uniqueId(operation.edge.id, edgeIds, 'flow');
      graph.edges.push({ ...operation.edge, id });
      edgeIds.add(id);
    } else if (operation.op === 'update_edge') {
      const edge = graph.edges.find(item => item.id === operation.edgeId);
      if (!edge) throw new Error(`Patch target edge ${operation.edgeId} does not exist.`);
      const updated = { ...edge, ...operation.changes, id: edge.id };
      if (!nodeIds.has(updated.source) || !nodeIds.has(updated.target)) throw new Error(`Updated edge ${edge.id} references a missing node.`);
      Object.assign(edge, updated);
    } else if (operation.op === 'remove_edge') {
      if (!edgeIds.has(operation.edgeId)) throw new Error(`Patch target edge ${operation.edgeId} does not exist.`);
      graph.edges = graph.edges.filter(edge => edge.id !== operation.edgeId);
      edgeIds.delete(operation.edgeId);
    } else if (operation.op === 'insert_between') {
      const existing = graph.edges.find(edge => edge.id === operation.edgeId);
      if (!existing) throw new Error(`Insert target edge ${operation.edgeId} does not exist.`);
      const nodeId = uniqueId(operation.node.id, nodeIds, 'inserted_component');
      graph.nodes.push({ ...operation.node, id: nodeId });
      nodeIds.add(nodeId);
      graph.edges = graph.edges.filter(edge => edge.id !== operation.edgeId);
      edgeIds.delete(operation.edgeId);
      const inboundId = uniqueId(operation.inbound?.id || `${existing.source}_to_${nodeId}`, edgeIds, 'inbound_flow');
      edgeIds.add(inboundId);
      const outboundId = uniqueId(operation.outbound?.id || `${nodeId}_to_${existing.target}`, edgeIds, 'outbound_flow');
      edgeIds.add(outboundId);
      graph.edges.push(
        { ...existing, ...operation.inbound, id: inboundId, source: existing.source, target: nodeId },
        { ...existing, ...operation.outbound, id: outboundId, source: nodeId, target: existing.target, step: Number(operation.outbound?.step) || existing.step + 1 },
      );
    } else if (operation.op === 'change_patterns') {
      graph.patterns = [...operation.patterns];
    }
  }

  graph.edges.sort((a, b) => a.step - b.step).forEach((edge, index) => { edge.step = index + 1; });
  return graph;
}

export function validateStudio1Change(
  before: Studio1SemanticGraph,
  after: Studio1SemanticGraph,
  plan: Studio1ChangePlan,
  ledger?: Studio1DecisionLedger,
): Studio1ChangeValidation {
  const violations: string[] = [];
  const warnings: string[] = [];
  const diff = diffStudio1Graphs(before, after);
  const afterNodeIds = new Set(after.nodes.map(node => node.id));
  const locked = new Set(ledger?.lockedNodeIds || []);
  const explicitlyRemovedNodes = new Set(plan.operations.filter(operation => operation.op === 'remove_node').map(operation => operation.op === 'remove_node' ? operation.nodeId : ''));
  if (diff.meaningfulChangeCount === 0) violations.push('The proposed edit produced no meaningful semantic change.');
  for (const id of diff.removedNodeIds) if (!explicitlyRemovedNodes.has(id)) violations.push(`Component ${id} was removed without an explicit remove operation.`);
  for (const id of plan.preservedNodeIds) if (!afterNodeIds.has(id)) violations.push(`Preserved component ${id} was removed.`);
  for (const id of locked) {
    if (diff.removedNodeIds.includes(id) || diff.modifiedNodeIds.includes(id)) violations.push(`Locked component ${id} was changed.`);
  }
  const nodeIds = new Set(after.nodes.map(node => node.id));
  for (const edge of after.edges) {
    if (!nodeIds.has(edge.source) || !nodeIds.has(edge.target)) violations.push(`Flow ${edge.id} references a missing component.`);
    if (edge.source === edge.target) violations.push(`Flow ${edge.id} cannot connect a component to itself.`);
  }
  if (diff.blastRadiusPercent > 60 && plan.intent === 'apply_change') warnings.push('The requested change exceeds the normal incremental-edit blast radius and should be reviewed as a guided refactor.');
  const risk = diff.blastRadiusPercent > 60 || diff.removedNodeIds.length > 0 ? 'high' : diff.blastRadiusPercent > 25 ? 'medium' : 'low';
  return { valid: violations.length === 0, violations, warnings, diff, risk };
}

export function studio1ContentDigest(value: string): string {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16).padStart(8, '0');
}

export function embedStudio1State(xml: string, graph: Studio1SemanticGraph, context: Studio1GenerationContext, decisionLedger: Studio1DecisionLedger): string {
  const payload: Studio1EmbeddedState = { schemaVersion: 1, graph, context, decisionLedger };
  const encoded = encodeURIComponent(JSON.stringify(payload));
  const withoutPrevious = xml.replace(/\sdata-studio1-state="[^"]*"/, '');
  return withoutPrevious.replace('<mxfile ', `<mxfile data-studio1-state="${encoded}" `);
}

export function extractStudio1State(xml: string): Studio1EmbeddedState | null {
  const match = xml.match(/\sdata-studio1-state="([^"]*)"/);
  if (!match) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(match[1])) as Studio1EmbeddedState;
    return parsed?.schemaVersion === 1 && parsed.graph && parsed.context && parsed.decisionLedger ? parsed : null;
  } catch {
    return null;
  }
}
