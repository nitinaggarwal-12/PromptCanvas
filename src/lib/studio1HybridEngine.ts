import { GCP_OFFICIAL_ICONS, renderGcpIconHtml } from './gcpIcons';

export type Studio1NodeKind = 'actor' | 'service' | 'process' | 'decision' | 'datastore' | 'queue' | 'security' | 'observability' | 'external';
export type Studio1FlowType = 'synchronous' | 'asynchronous' | 'data' | 'network' | 'ai' | 'governance' | 'feedback';
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
    };
  }).filter(edge => edge.source !== edge.target && nodeIds.has(edge.source) && nodeIds.has(edge.target));

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

function escapeXml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

const FLOW_STYLE: Record<Studio1FlowType, string> = {
  synchronous: 'strokeColor=#2563EB;strokeWidth=2;',
  asynchronous: 'strokeColor=#EA580C;strokeWidth=2;dashed=1;dashPattern=6 4;',
  data: 'strokeColor=#0284C7;strokeWidth=2;',
  network: 'strokeColor=#16A34A;strokeWidth=2;',
  ai: 'strokeColor=#7C3AED;strokeWidth=2;dashed=1;dashPattern=4 4;',
  governance: 'strokeColor=#64748B;strokeWidth=2;dashed=1;dashPattern=2 4;',
  feedback: 'strokeColor=#0D9488;strokeWidth=2;dashed=1;dashPattern=5 5;',
};

interface PositionedNode extends Studio1SemanticNode {
  x: number;
  y: number;
  width: number;
  height: number;
  bandIndex: number;
  row: number;
  column: number;
}

interface LayoutBand {
  id: string;
  label: string;
  subtitle: string;
  accent: string;
  fill: string;
  x: number;
  y: number;
  width: number;
  height: number;
  nodes: PositionedNode[];
}

const DATA_SERVICE_KEYS = new Set(['bigquery', 'spanner', 'memorystore', 'cloud_storage']);
const CONTROL_SERVICE_KEYS = new Set(['cloud_armor', 'iap', 'cloud_iam', 'vpc_sc', 'scc', 'cloud_monitoring', 'cloud_logging']);

function classifyLayoutBand(node: Studio1SemanticNode): 'experience' | 'platform' | 'data' | 'controls' {
  if (node.kind === 'actor' || node.kind === 'external' || node.stage <= 1) return 'experience';
  if (node.kind === 'observability' || (node.serviceKey && CONTROL_SERVICE_KEYS.has(node.serviceKey)) || (node.kind === 'security' && node.stage >= 4)) return 'controls';
  if (node.kind === 'datastore' || (node.serviceKey && DATA_SERVICE_KEYS.has(node.serviceKey))) return 'data';
  return 'platform';
}

function buildBalancedBandLayout(graph: Studio1SemanticGraph): {
  positions: Map<string, PositionedNode>;
  bands: LayoutBand[];
  pageWidth: number;
  pageHeight: number;
  contentBottom: number;
  layoutViolations: string[];
} {
  const pageWidth = 1680;
  const canvasX = 60;
  const canvasWidth = pageWidth - 120;
  const innerX = canvasX + 28;
  const innerWidth = canvasWidth - 56;
  const maxColumns = 5;
  const cardHeight = 96;
  const gapX = 30;
  const gapY = 32;
  const bandGap = 26;
  const bandHeader = 48;
  const bandBottom = 44;
  const edgeOrder = new Map<string, number>();
  graph.edges.forEach((edge) => {
    edgeOrder.set(edge.source, Math.min(edgeOrder.get(edge.source) ?? Number.MAX_SAFE_INTEGER, edge.step - 0.25));
    edgeOrder.set(edge.target, Math.min(edgeOrder.get(edge.target) ?? Number.MAX_SAFE_INTEGER, edge.step));
  });
  const orderedNodes = graph.nodes.slice().sort((left, right) =>
    left.stage - right.stage ||
    (edgeOrder.get(left.id) ?? 999) - (edgeOrder.get(right.id) ?? 999) ||
    left.label.localeCompare(right.label)
  );
  const definitions = [
    { id: 'experience', label: 'CLIENTS, CHANNELS & SOURCES', subtitle: 'Actors, devices, partners and entry points', accent: '#2563EB', fill: '#EFF6FF' },
    { id: 'platform', label: 'APPLICATION, EVENT & PROCESSING PLATFORM', subtitle: 'Ingress, orchestration, messaging and workload execution', accent: '#7C3AED', fill: '#F5F3FF' },
    { id: 'data', label: 'DATA, ANALYTICS & STATE', subtitle: 'Durable records, streaming history and analytical consumption', accent: '#059669', fill: '#ECFDF5' },
    { id: 'controls', label: 'SECURITY, RELIABILITY & OPERATIONS', subtitle: 'Cross-cutting protection, telemetry, governance and recovery', accent: '#0D9488', fill: '#F0FDFA' },
  ] as const;
  const positions = new Map<string, PositionedNode>();
  const bands: LayoutBand[] = [];
  let currentY = 136;

  definitions.forEach((definition, bandIndex) => {
    const nodes = orderedNodes.filter(node => classifyLayoutBand(node) === definition.id);
    if (!nodes.length) return;
    const rows = Math.ceil(nodes.length / maxColumns);
    const height = bandHeader + rows * cardHeight + Math.max(0, rows - 1) * gapY + bandBottom;
    const positionedNodes: PositionedNode[] = [];
    for (let row = 0; row < rows; row += 1) {
      const rowNodes = nodes.slice(row * maxColumns, (row + 1) * maxColumns);
      const columns = rowNodes.length;
      const cardWidth = Math.min(280, Math.floor((innerWidth - Math.max(0, columns - 1) * gapX) / Math.max(1, columns)));
      const rowWidth = columns * cardWidth + Math.max(0, columns - 1) * gapX;
      const startX = innerX + Math.max(0, (innerWidth - rowWidth) / 2);
      rowNodes.forEach((node, column) => {
        const positioned: PositionedNode = {
          ...node,
          x: Math.round(startX + column * (cardWidth + gapX)),
          y: currentY + bandHeader + row * (cardHeight + gapY),
          width: cardWidth,
          height: cardHeight,
          bandIndex,
          row,
          column,
        };
        positions.set(node.id, positioned);
        positionedNodes.push(positioned);
      });
    }
    bands.push({ ...definition, x: canvasX, y: currentY, width: canvasWidth, height, nodes: positionedNodes });
    currentY += height + bandGap;
  });

  const contentBottom = currentY - bandGap;
  const assumptionsHeight = graph.assumptions.length ? Math.min(84, 34 + graph.assumptions.length * 12) : 0;
  const pageHeight = Math.max(1000, contentBottom + assumptionsHeight + 78);
  const layoutViolations: string[] = [];
  const positioned = [...positions.values()];
  for (let leftIndex = 0; leftIndex < positioned.length; leftIndex += 1) {
    for (let rightIndex = leftIndex + 1; rightIndex < positioned.length; rightIndex += 1) {
      const left = positioned[leftIndex];
      const right = positioned[rightIndex];
      const separated = left.x + left.width + 29 < right.x || right.x + right.width + 29 < left.x || left.y + left.height + 29 < right.y || right.y + right.height + 29 < left.y;
      if (!separated) layoutViolations.push(`Layout clearance below 30px between ${left.id} and ${right.id}`);
    }
  }
  return { positions, bands, pageWidth, pageHeight, contentBottom, layoutViolations };
}

export function renderStudio1GraphXml(graph: Studio1SemanticGraph, theme: 'light' | 'dark' = 'light'): { xml: string; certification: Studio1Certification } {
  const semanticCertification = certifyStudio1Graph(graph);
  const { positions, bands, pageWidth, pageHeight, contentBottom, layoutViolations } = buildBalancedBandLayout(graph);
  const certification: Studio1Certification = {
    ...semanticCertification,
    certified: semanticCertification.certified && layoutViolations.length === 0,
    score: Math.max(0, semanticCertification.score - layoutViolations.length * 10),
    violations: [...semanticCertification.violations, ...layoutViolations],
  };
  const bg = theme === 'dark' ? '#0F172A' : '#FFFFFF';
  const cardBg = theme === 'dark' ? '#1E293B' : '#FFFFFF';
  const text = theme === 'dark' ? '#F8FAFC' : '#0F172A';
  const muted = theme === 'dark' ? '#CBD5E1' : '#475569';
  const cells: string[] = ['<mxCell id="0"/>', '<mxCell id="1" parent="0"/>'];

  const vertex = (id: string, value: string, x: number, y: number, width: number, height: number, style: string) => {
    cells.push(`<mxCell id="${escapeXml(id)}" value="${escapeXml(value)}" style="html=1;whiteSpace=wrap;${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${width}" height="${height}" as="geometry"/></mxCell>`);
  };

  vertex('studio1_title', `<div style="font-family:Google Sans,Arial,sans-serif;text-align:left;"><div style="font-size:24px;font-weight:800;color:${text};">${graph.title}</div><div style="font-size:12px;font-weight:600;color:#4F46E5;margin-top:4px;">${graph.subtitle}</div></div>`, 40, 22, pageWidth - 80, 60, 'strokeColor=none;fillColor=none;align=left;verticalAlign=middle;');
  const qualityLabel = certification.certified ? `Quality checks passed ${certification.score}/100` : `Quality findings advisory • ${certification.violations.length} finding${certification.violations.length === 1 ? '' : 's'}`;
  vertex('studio1_meta', `Balanced domain layout v2  •  ${graph.patterns.join(' + ')}  •  ${graph.nodes.length} components  •  ${graph.edges.length} typed flows  •  ${qualityLabel}`, 40, 88, pageWidth - 80, 30, `rounded=1;arcSize=14;fillColor=${theme === 'dark' ? '#172554' : '#EFF6FF'};strokeColor=#93C5FD;fontColor=${theme === 'dark' ? '#BFDBFE' : '#1E3A8A'};fontSize=10;fontStyle=1;align=left;spacingLeft=12;`);

  bands.forEach((band, index) => {
    const bandFill = theme === 'dark' ? '#111827' : band.fill;
    vertex(`band_${band.id}`, '', band.x, band.y, band.width, band.height, `rounded=1;arcSize=14;fillColor=${bandFill};fillOpacity=${theme === 'dark' ? 88 : 72};strokeColor=${theme === 'dark' ? '#334155' : '#CBD5E1'};strokeWidth=1.2;`);
    vertex(`band_label_${band.id}`, `${index + 1}. ${band.label}  •  ${band.subtitle}`, band.x + 20, band.y + 10, band.width - 40, 26, `rounded=1;arcSize=12;fillColor=${band.accent};strokeColor=none;fontColor=#FFFFFF;fontSize=10;fontStyle=1;align=left;spacingLeft=12;verticalAlign=middle;`);
  });
  const edgeInsertIndex = cells.length;

  for (const node of positions.values()) {
    if (node.kind === 'decision') {
      vertex(node.id, `<div style="font-family:Google Sans,Arial,sans-serif;font-size:11px;font-weight:800;color:${text};text-align:center;">${node.label}</div><div style="font-size:8px;color:${muted};margin-top:3px;">${node.description}</div>`, node.x + 30, node.y, node.width - 60, node.height, `shape=rhombus;perimeter=rhombusPerimeter;fillColor=${theme === 'dark' ? '#3B0764' : '#FAF5FF'};strokeColor=#7C3AED;strokeWidth=2;align=center;verticalAlign=middle;spacing=8;`);
      continue;
    }
    const icon = node.serviceKey ? renderGcpIconHtml(node.serviceKey, 28) : '';
    const technology = node.technology ? `<div style="font-size:8px;font-weight:700;color:#2563EB;margin-top:4px;">${node.technology}</div>` : '';
    const label = `<div style="padding:8px;font-family:Google Sans,Arial,sans-serif;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;">${icon}<div style="font-size:11px;font-weight:800;color:${text};margin-top:${icon ? 4 : 0}px;">${node.label}</div><div style="font-size:8.5px;color:${muted};margin-top:2px;">${node.description}</div>${technology}</div>`;
    const shape = node.kind === 'datastore' ? 'shape=cylinder3;boundedLbl=1;backgroundOutline=1;' : node.kind === 'queue' ? 'shape=hexagon;perimeter=hexagonPerimeter2;' : '';
    const border = node.kind === 'security' ? '#DC2626' : node.kind === 'observability' ? '#0284C7' : '#94A3B8';
    vertex(node.id, label, node.x, node.y, node.width, node.height, `${shape}rounded=1;arcSize=10;fillColor=${cardBg};strokeColor=${border};strokeWidth=1.5;shadow=1;align=center;verticalAlign=middle;spacing=6;`);
  }

  let routedEdgeIndex = 0;
  let edgeCellCount = 0;
  graph.edges.sort((a, b) => a.step - b.step).forEach((edge, index) => {
    const source = positions.get(edge.source);
    const target = positions.get(edge.target);
    if (!source || !target) return;
    const sameBand = source.bandIndex === target.bandIndex;
    const sameRow = sameBand && source.row === target.row;
    const adjacent = sameRow && Math.abs(source.column - target.column) === 1;
    const forward = target.x >= source.x;
    const skipsBand = Math.abs(target.bandIndex - source.bandIndex) > 1;
    const isFeedback = edge.flowType === 'feedback' || target.bandIndex < source.bandIndex || (sameRow && !forward);
    const label = `${edge.step}. ${edge.condition || edge.label}`;
    const edgeStyle = `${FLOW_STYLE[edge.flowType]}endArrow=block;endFill=1;rounded=1;html=1;labelBackgroundColor=${theme === 'dark' ? '#0F172A' : '#FFFFFF'};labelBorderColor=${theme === 'dark' ? '#475569' : '#CBD5E1'};fontColor=${theme === 'dark' ? '#F8FAFC' : '#0F172A'};fontSize=9;fontStyle=1;spacing=3;`;
    let exitX = forward ? 1 : 0;
    let entryX = forward ? 0 : 1;
    let exitY = 0.5;
    let entryY = 0.5;
    let points = '';
    let routing = 'edgeStyle=orthogonalEdgeStyle;orthogonalLoop=1;jettySize=auto;';
    if (isFeedback || skipsBand) {
      // Long and return paths use dedicated rails outside every band, keeping
      // their vertical segments clear of component cards in intermediate bands.
      const routeX = pageWidth - 34 + (routedEdgeIndex % 3) * 7;
      routedEdgeIndex += 1;
      exitX = 1; entryX = 1; exitY = 0.72; entryY = 0.72;
      points = `<Array as="points"><mxPoint x="${routeX}" y="${source.y + source.height * 0.72}"/><mxPoint x="${routeX}" y="${target.y + target.height * 0.72}"/></Array>`;
    } else if (adjacent) {
      const sourceCenterY = source.y + source.height / 2;
      const targetCenterY = target.y + target.height / 2;
      const lineY = (sourceCenterY + targetCenterY) / 2;
      exitY = Math.max(0.1, Math.min(0.9, (lineY - source.y) / source.height));
      entryY = Math.max(0.1, Math.min(0.9, (lineY - target.y) / target.height));
      routing = 'edgeStyle=none;';
    } else if (sameBand) {
      const band = bands.find(item => item.nodes.some(node => node.id === source.id));
      if (sameRow) {
        const channelY = (band ? band.y + band.height : Math.max(source.y, target.y) + source.height + 44) - 18 - (index % 4) * 3;
        exitX = 0.5; entryX = 0.5; exitY = 1; entryY = 1;
        points = `<Array as="points"><mxPoint x="${source.x + source.width / 2}" y="${channelY}"/><mxPoint x="${target.x + target.width / 2}" y="${channelY}"/></Array>`;
      } else {
        const channelX = pageWidth - 34 + (index % 3) * 7;
        exitX = 1; entryX = 1; exitY = 0.5; entryY = 0.5;
        points = `<Array as="points"><mxPoint x="${channelX}" y="${source.y + source.height / 2}"/><mxPoint x="${channelX}" y="${target.y + target.height / 2}"/></Array>`;
      }
    } else {
      const sourceBelow = target.bandIndex > source.bandIndex;
      const corridorY = sourceBelow
        ? source.y + source.height + 14 + (index % 4) * 3
        : target.y + target.height + 14 + (index % 4) * 3;
      exitX = 0.5; entryX = 0.5; exitY = sourceBelow ? 1 : 0; entryY = sourceBelow ? 0 : 1;
      points = `<Array as="points"><mxPoint x="${source.x + source.width / 2}" y="${corridorY}"/><mxPoint x="${target.x + target.width / 2}" y="${corridorY}"/></Array>`;
    }
    cells.splice(edgeInsertIndex + edgeCellCount, 0, `<mxCell id="${escapeXml(edge.id || `edge_${index + 1}`)}" value="${escapeXml(label)}" edge="1" parent="1" source="${escapeXml(edge.source)}" target="${escapeXml(edge.target)}" style="${routing}exitX=${exitX};exitY=${exitY};entryX=${entryX};entryY=${entryY};exitPerimeter=1;entryPerimeter=1;${edgeStyle}"><mxGeometry relative="1" as="geometry">${points}</mxGeometry></mxCell>`);
    edgeCellCount += 1;
  });

  if (graph.assumptions.length) {
    const assumptionHeight = Math.min(84, 34 + graph.assumptions.length * 12);
    vertex('assumptions', `<div style="font-family:Google Sans,Arial,sans-serif;text-align:left;"><b>Assumptions</b><br/>${graph.assumptions.map((item, index) => `${index + 1}. ${item}`).join('<br/>')}</div>`, 40, contentBottom + 24, pageWidth - 80, assumptionHeight, `rounded=1;arcSize=8;fillColor=${theme === 'dark' ? '#1E293B' : '#FFFBEB'};strokeColor=#F59E0B;fontColor=${text};fontSize=8.5;align=left;verticalAlign=middle;spacingLeft=10;`);
  }

  const xml = `<mxfile host="embed.diagrams.net"><diagram id="studio1_hybrid" name="${escapeXml(graph.title)}"><mxGraphModel dx="${pageWidth}" dy="${pageHeight}" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="${pageWidth}" pageHeight="${pageHeight}" background="${bg}" math="0" shadow="0"><root>${cells.join('')}</root></mxGraphModel></diagram></mxfile>`;
  return { xml, certification };
}
