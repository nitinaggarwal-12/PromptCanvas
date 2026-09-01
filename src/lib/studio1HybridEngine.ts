import { GCP_OFFICIAL_ICONS } from './gcpIcons';
import { renderStudio1GoogleCloudXml } from './studio1GoogleRenderer';

export type Studio1NodeKind = 'actor' | 'service' | 'process' | 'decision' | 'datastore' | 'queue' | 'security' | 'observability' | 'external';
export type Studio1FlowType = 'synchronous' | 'asynchronous' | 'data' | 'network' | 'ai' | 'governance' | 'feedback';
export type Studio1RelationType = 'invokes' | 'routes' | 'protects' | 'publishes' | 'subscribes' | 'processes' | 'writes' | 'observes' | 'authorizes' | 'contains' | 'replicates' | 'feedback';
export type Studio1Pattern = 'layered' | 'event-driven' | 'hub-spoke' | 'network-topology' | 'swimlane' | 'sequence';

export interface Studio1SemanticNode {
  id: string;
  label: string;
  description: string;
  kind: Studio1NodeKind;
  stage: number;
  zone: string;
  provider?: string;
  serviceKey?: string;
  technology?: string;
}

export interface Studio1SemanticEdge {
  id: string;
  source: string;
  target: string;
  label: string;
  flowType: Studio1FlowType;
  step: number;
  condition?: string;
  relationType?: Studio1RelationType;
}

export interface Studio1SemanticGraph {
  title: string;
  subtitle: string;
  patterns: Studio1Pattern[];
  assumptions: string[];
  nodes: Studio1SemanticNode[];
  edges: Studio1SemanticEdge[];
}

export interface Studio1Certification {
  certified: boolean;
  score: number;
  violations: string[];
  nodeCount: number;
  edgeCount: number;
  decisionCount: number;
}

const NODE_KINDS = new Set<Studio1NodeKind>(['actor', 'service', 'process', 'decision', 'datastore', 'queue', 'security', 'observability', 'external']);
const FLOW_TYPES = new Set<Studio1FlowType>(['synchronous', 'asynchronous', 'data', 'network', 'ai', 'governance', 'feedback']);
const RELATION_TYPES = new Set<Studio1RelationType>(['invokes', 'routes', 'protects', 'publishes', 'subscribes', 'processes', 'writes', 'observes', 'authorizes', 'contains', 'replicates', 'feedback']);
const PATTERNS = new Set<Studio1Pattern>(['layered', 'event-driven', 'hub-spoke', 'network-topology', 'swimlane', 'sequence']);

function cleanText(value: unknown, fallback: string, max = 120): string {
  const text = typeof value === 'string' ? value.replace(/[\u0000-\u001f]/g, ' ').replace(/\s+/g, ' ').trim() : '';
  return (text || fallback).slice(0, max);
}

function cleanId(value: unknown, fallback: string): string {
  const id = cleanText(value, fallback, 60).toLowerCase().replace(/[^a-z0-9_-]+/g, '_').replace(/^_+|_+$/g, '');
  return id || fallback;
}

const SERVICE_KEY_ALIASES: Array<[RegExp, string]> = [
  [/\b(pub\/?sub|event bus|event backbone|topic|subscription)\b/i, 'pubsub'],
  [/\bdataflow\b/i, 'dataflow'],
  [/\bbigquery\b/i, 'bigquery'],
  [/\b(cloud storage|gcs|object storage)\b/i, 'cloud_storage'],
  [/\bspanner\b/i, 'spanner'],
  [/\bmemorystore|\bredis\b/i, 'memorystore'],
  [/\bcloud run\b/i, 'cloud_run'],
  [/\bcloud functions?\b/i, 'cloud_functions'],
  [/\bgke(?: autopilot)?|kubernetes/i, 'gke_autopilot'],
  [/\bcompute engine\b/i, 'compute_engine'],
  [/\bcloud (?:load balancing|load balancer)\b/i, 'cloud_load_balancing'],
  [/\bcloud armor\b/i, 'cloud_armor'],
  [/\b(identity-aware proxy|iap)\b/i, 'iap'],
  [/\b(?:cloud )?iam\b/i, 'cloud_iam'],
  [/\bvpc service controls?|vpc-sc\b/i, 'vpc_sc'],
  [/\bsecurity command center|\bscc\b/i, 'scc'],
  [/\bcloud monitoring\b/i, 'cloud_monitoring'],
  [/\bcloud logging\b/i, 'cloud_logging'],
  [/\bvertex ai\b/i, 'vertex_ai'],
  [/\bgemini\b/i, 'gemini'],
];

function inferServiceKey(...values: unknown[]): string | undefined {
  const haystack = values.filter(value => typeof value === 'string').join(' ');
  return SERVICE_KEY_ALIASES.find(([pattern]) => pattern.test(haystack))?.[1];
}

export function normalizeStudio1Graph(input: unknown, prompt: string): Studio1SemanticGraph {
  if (!input || typeof input !== 'object') throw new Error('The architecture model returned no semantic graph.');
  const raw = input as Record<string, unknown>;
  const rawNodes = (Array.isArray(raw.nodes) ? raw.nodes : []).slice(0, 36);
  const rawEdges = Array.isArray(raw.edges) ? raw.edges : [];
  if (rawNodes.length === 0) throw new Error('The architecture model returned no renderable components.');

  const seen = new Set<string>();
  const nodes: Studio1SemanticNode[] = rawNodes.map((item, index) => {
    const node = (item && typeof item === 'object' ? item : {}) as Record<string, unknown>;
    let id = cleanId(node.id, `node_${index + 1}`);
    while (seen.has(id)) id = `${id}_${index + 1}`;
    seen.add(id);
    const kind = NODE_KINDS.has(node.kind as Studio1NodeKind) ? node.kind as Studio1NodeKind : 'service';
    const requestedStage = Number(node.stage);
    const stage = Number.isFinite(requestedStage) ? Math.max(1, Math.min(6, Math.round(requestedStage))) : Math.min(6, index + 1);
    const labelSource = node.label ?? node.name ?? node.title ?? node.service ?? node.component;
    const descriptionSource = node.description ?? node.purpose ?? node.responsibility ?? node.role;
    const requestedKey = cleanId(node.serviceKey ?? node.service_key ?? node.icon, '');
    const inferredKey = inferServiceKey(labelSource, descriptionSource, node.technology);
    const serviceKey = requestedKey && GCP_OFFICIAL_ICONS[requestedKey]
      ? requestedKey
      : inferredKey && GCP_OFFICIAL_ICONS[inferredKey]
        ? inferredKey
        : undefined;
    return {
      id,
      label: cleanText(labelSource, `Architecture Component ${index + 1}`, 72),
      description: cleanText(descriptionSource, 'Prompt-derived architecture responsibility', 150),
      kind,
      stage,
      zone: cleanText(node.zone ?? node.domain ?? node.layer, `Stage ${stage}`, 48),
      provider: cleanText(node.provider, '', 32) || undefined,
      serviceKey,
      technology: cleanText(node.technology ?? node.product, '', 54) || undefined,
    };
  });

  const nodeIds = new Set(nodes.map(node => node.id));
  const edgeIds = new Set<string>();
  const edges: Studio1SemanticEdge[] = rawEdges.map((item, index) => {
    const edge = (item && typeof item === 'object' ? item : {}) as Record<string, unknown>;
    const source = cleanId(edge.source ?? edge.from ?? edge.sourceId, '');
    const target = cleanId(edge.target ?? edge.to ?? edge.targetId, '');
    const requestedFlowType = edge.flowType ?? edge.flow_type ?? edge.type;
    const flowType = FLOW_TYPES.has(requestedFlowType as Studio1FlowType) ? requestedFlowType as Studio1FlowType : 'synchronous';
    const requestedRelationType = edge.relationType ?? edge.relation_type ?? edge.relationship ?? edge.relation;
    const relationType = RELATION_TYPES.has(requestedRelationType as Studio1RelationType) ? requestedRelationType as Studio1RelationType : undefined;
    let id = cleanId(edge.id, `edge_${index + 1}`);
    while (edgeIds.has(id)) id = `${id}_${index + 1}`;
    edgeIds.add(id);
    return {
      id,
      source,
      target,
      label: cleanText(edge.label ?? edge.name ?? edge.protocol, flowType === 'asynchronous' ? 'Event' : 'Request', 44),
      flowType,
      step: Math.max(1, Math.min(99, Number(edge.step) || index + 1)),
      condition: cleanText(edge.condition ?? edge.when, '', 36) || undefined,
      relationType,
    };
  }).filter(edge => edge.source !== edge.target && nodeIds.has(edge.source) && nodeIds.has(edge.target));

  // Models commonly express a decision outcome as the edge label even when
  // the optional condition property is omitted. Preserve that meaning as an
  // explicit branch condition so a visually correct decision is also
  // semantically certifiable.
  const decisionIds = new Set(nodes.filter(node => node.kind === 'decision').map(node => node.id));
  for (const edge of edges) {
    if (decisionIds.has(edge.source) && !edge.condition && !/^(?:request|event)$/i.test(edge.label)) {
      edge.condition = edge.label;
    }
  }

  edges.sort((left, right) => left.step - right.step).forEach((edge, index) => {
    edge.step = index + 1;
  });

  const patterns = (Array.isArray(raw.patterns) ? raw.patterns : [])
    .filter((pattern): pattern is Studio1Pattern => PATTERNS.has(pattern as Studio1Pattern))
    .slice(0, 3);

  return {
    title: cleanText(raw.title, prompt.slice(0, 72) || 'Prompt-Generated Architecture', 96),
    subtitle: cleanText(raw.subtitle, 'Prompt-derived architecture with typed flows and deterministic layout', 170),
    patterns: patterns.length ? patterns : ['layered'],
    assumptions: (Array.isArray(raw.assumptions) ? raw.assumptions : []).map(item => cleanText(item, '', 140)).filter(Boolean).slice(0, 8),
    nodes,
    edges,
  };
}

export function certifyStudio1Graph(graph: Studio1SemanticGraph): Studio1Certification {
  const violations: string[] = [];
  const ids = new Set(graph.nodes.map(node => node.id));
  if (ids.size !== graph.nodes.length) violations.push('Component IDs must be unique');
  const degree = new Map(graph.nodes.map(node => [node.id, 0]));
  const edgeIds = new Set<string>();
  const relationshipKeys = new Set<string>();
  const decisions = graph.nodes.filter(node => node.kind === 'decision');
  const genericLabels = graph.nodes.filter(node => /^(?:architecture )?component\s+\d+$/i.test(node.label));
  if (genericLabels.length) violations.push(`Generic component labels: ${genericLabels.map(node => node.id).join(', ')}`);
  for (const edge of graph.edges) {
    if (!ids.has(edge.source) || !ids.has(edge.target)) violations.push(`Dangling connector ${edge.id}`);
    if (edgeIds.has(edge.id)) violations.push(`Duplicate connector ID ${edge.id}`);
    edgeIds.add(edge.id);
    const relationshipKey = `${edge.source}>${edge.target}:${edge.flowType}:${edge.label.toLowerCase()}`;
    if (relationshipKeys.has(relationshipKey)) violations.push(`Duplicate relationship ${edge.id}`);
    relationshipKeys.add(relationshipKey);
    degree.set(edge.source, (degree.get(edge.source) || 0) + 1);
    degree.set(edge.target, (degree.get(edge.target) || 0) + 1);
  }
  for (const [id, count] of degree) if (count === 0) violations.push(`Orphaned component ${id}`);
  for (const decision of decisions) {
    const outgoing = graph.edges.filter(edge => edge.source === decision.id);
    if (outgoing.length < 2) violations.push(`Decision ${decision.label} needs at least two outgoing branches`);
    if (outgoing.some(edge => !edge.condition)) violations.push(`Decision ${decision.label} has a branch without an explicit condition`);
  }
  const stages = new Set(graph.nodes.map(node => node.stage));
  if (stages.size < 2) violations.push('Architecture must span at least two stages');
  const orderedSteps = graph.edges.map(edge => edge.step).slice().sort((a, b) => a - b);
  if (!orderedSteps.every((step, index) => step === index + 1)) violations.push('Flows need a unique contiguous step sequence');
  const score = Math.max(0, 100 - violations.length * 10);
  return {
    certified: score >= 75 && violations.length === 0,
    score,
    violations,
    nodeCount: graph.nodes.length,
    edgeCount: graph.edges.length,
    decisionCount: decisions.length,
  };
}


export function renderStudio1GraphXml(graph: Studio1SemanticGraph, theme: 'light' | 'dark' = 'light'): { xml: string; certification: Studio1Certification } {
  return renderStudio1GoogleCloudXml(graph, certifyStudio1Graph(graph), theme);
}
