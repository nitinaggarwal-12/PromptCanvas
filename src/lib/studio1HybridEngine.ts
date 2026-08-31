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

export function normalizeStudio1Graph(input: unknown, prompt: string): Studio1SemanticGraph {
  if (!input || typeof input !== 'object') throw new Error('The architecture model returned no semantic graph.');
  const raw = input as Record<string, unknown>;
  const rawNodes = Array.isArray(raw.nodes) ? raw.nodes : [];
  const rawEdges = Array.isArray(raw.edges) ? raw.edges : [];
  if (rawNodes.length < 3) throw new Error('The architecture model returned fewer than three components.');
  if (rawNodes.length > 36) throw new Error('The architecture model exceeded the 36-component test limit.');

  const seen = new Set<string>();
  const nodes: Studio1SemanticNode[] = rawNodes.map((item, index) => {
    const node = (item && typeof item === 'object' ? item : {}) as Record<string, unknown>;
    let id = cleanId(node.id, `node_${index + 1}`);
    while (seen.has(id)) id = `${id}_${index + 1}`;
    seen.add(id);
    const kind = NODE_KINDS.has(node.kind as Studio1NodeKind) ? node.kind as Studio1NodeKind : 'service';
    const requestedStage = Number(node.stage);
    const stage = Number.isFinite(requestedStage) ? Math.max(1, Math.min(6, Math.round(requestedStage))) : Math.min(6, index + 1);
    const requestedKey = cleanId(node.serviceKey, '');
    const serviceKey = requestedKey && GCP_OFFICIAL_ICONS[requestedKey] ? requestedKey : undefined;
    return {
      id,
      label: cleanText(node.label, `Component ${index + 1}`, 72),
      description: cleanText(node.description, 'Prompt-derived architecture component', 150),
      kind,
      stage,
      zone: cleanText(node.zone, `Stage ${stage}`, 48),
      provider: cleanText(node.provider, '', 32) || undefined,
      serviceKey,
      technology: cleanText(node.technology, '', 54) || undefined,
    };
  });

  const nodeIds = new Set(nodes.map(node => node.id));
  const edgeIds = new Set<string>();
  const edges: Studio1SemanticEdge[] = rawEdges.map((item, index) => {
    const edge = (item && typeof item === 'object' ? item : {}) as Record<string, unknown>;
    const source = cleanId(edge.source, '');
    const target = cleanId(edge.target, '');
    const flowType = FLOW_TYPES.has(edge.flowType as Studio1FlowType) ? edge.flowType as Studio1FlowType : 'synchronous';
    let id = cleanId(edge.id, `edge_${index + 1}`);
    while (edgeIds.has(id)) id = `${id}_${index + 1}`;
    edgeIds.add(id);
    return {
      id,
      source,
      target,
      label: cleanText(edge.label, flowType === 'asynchronous' ? 'Event' : 'Request', 44),
      flowType,
      step: Math.max(1, Math.min(99, Number(edge.step) || index + 1)),
      condition: cleanText(edge.condition, '', 36) || undefined,
    };
  }).filter(edge => edge.source !== edge.target && nodeIds.has(edge.source) && nodeIds.has(edge.target));

  edges.sort((left, right) => left.step - right.step).forEach((edge, index) => {
    edge.step = index + 1;
  });

  if (edges.length < 2) throw new Error('The architecture model returned insufficient component relationships.');

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

const STAGE_COLORS = ['#2563EB', '#0D9488', '#7C3AED', '#0284C7', '#059669', '#64748B'];

interface PositionedNode extends Studio1SemanticNode { x: number; y: number; width: number; height: number; row: number; }

export function renderStudio1GraphXml(graph: Studio1SemanticGraph, theme: 'light' | 'dark' = 'light'): { xml: string; certification: Studio1Certification } {
  const certification = certifyStudio1Graph(graph);
  if (!certification.certified) throw new Error(`Architecture graph failed certification: ${certification.violations.join('; ')}`);

  const activeStages = [...new Set(graph.nodes.map(node => node.stage))].sort((a, b) => a - b);
  const stageIndex = new Map(activeStages.map((stage, index) => [stage, index]));
  const columnWidth = 220;
  const gapX = 140;
  const left = 56;
  const top = 152;
  const nodeHeight = 92;
  const gapY = 80;
  const positions = new Map<string, PositionedNode>();
  const rowsByStage = new Map<number, number>();

  graph.nodes.forEach(node => {
    const row = rowsByStage.get(node.stage) || 0;
    rowsByStage.set(node.stage, row + 1);
    const column = stageIndex.get(node.stage) || 0;
    positions.set(node.id, {
      ...node,
      x: left + column * (columnWidth + gapX),
      y: top + row * (nodeHeight + gapY),
      width: columnWidth,
      height: node.kind === 'decision' ? 112 : nodeHeight,
      row,
    });
  });

  const maxRows = Math.max(...rowsByStage.values());
  const routingEdgeCount = graph.edges.filter(edge => {
    const source = positions.get(edge.source);
    const target = positions.get(edge.target);
    if (!source || !target) return false;
    const sourceColumn = stageIndex.get(source.stage) || 0;
    const targetColumn = stageIndex.get(target.stage) || 0;
    return edge.flowType === 'feedback' || targetColumn < sourceColumn || Math.abs(targetColumn - sourceColumn) > 1;
  }).length;
  const pageWidth = Math.max(1600, left * 2 + activeStages.length * columnWidth + Math.max(0, activeStages.length - 1) * gapX);
  const contentBottom = top + maxRows * (nodeHeight + gapY) - gapY;
  const pageHeight = Math.max(960, contentBottom + 190 + routingEdgeCount * 14);
  const bg = theme === 'dark' ? '#0F172A' : '#FFFFFF';
  const cardBg = theme === 'dark' ? '#1E293B' : '#FFFFFF';
  const text = theme === 'dark' ? '#F8FAFC' : '#0F172A';
  const muted = theme === 'dark' ? '#CBD5E1' : '#475569';
  const cells: string[] = ['<mxCell id="0"/>', '<mxCell id="1" parent="0"/>'];

  const vertex = (id: string, value: string, x: number, y: number, width: number, height: number, style: string) => {
    cells.push(`<mxCell id="${escapeXml(id)}" value="${escapeXml(value)}" style="html=1;whiteSpace=wrap;${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${width}" height="${height}" as="geometry"/></mxCell>`);
  };

  vertex('studio1_title', `<div style="font-family:Google Sans,Arial,sans-serif;text-align:left;"><div style="font-size:24px;font-weight:800;color:${text};">${graph.title}</div><div style="font-size:12px;font-weight:600;color:#4F46E5;margin-top:4px;">${graph.subtitle}</div></div>`, 40, 24, pageWidth - 80, 58, 'strokeColor=none;fillColor=none;align=left;verticalAlign=middle;');
  vertex('studio1_meta', `Patterns: ${graph.patterns.join(' + ')}  •  ${graph.nodes.length} components  •  ${graph.edges.length} typed flows  •  Certified ${certification.score}/100`, 40, 88, pageWidth - 80, 30, `rounded=1;arcSize=14;fillColor=${theme === 'dark' ? '#172554' : '#EFF6FF'};strokeColor=#93C5FD;fontColor=${theme === 'dark' ? '#BFDBFE' : '#1E3A8A'};fontSize=10;fontStyle=1;align=left;spacingLeft=12;`);

  activeStages.forEach((stage, index) => {
    const nodes = graph.nodes.filter(node => node.stage === stage);
    const label = nodes[0]?.zone || `Stage ${stage}`;
    const x = left + index * (columnWidth + gapX) - 18;
    const height = maxRows * (nodeHeight + gapY) - gapY + 48;
    vertex(`lane_${stage}`, '', x, 126, columnWidth + 36, height, `rounded=1;arcSize=12;fillColor=${theme === 'dark' ? '#111827' : '#F8FAFC'};fillOpacity=70;strokeColor=${theme === 'dark' ? '#334155' : '#CBD5E1'};dashed=1;dashPattern=3 3;`);
    vertex(`lane_label_${stage}`, `${stage}. ${label.toUpperCase()}`, x + 8, 132, columnWidth + 20, 24, `rounded=1;arcSize=12;fillColor=${STAGE_COLORS[index % STAGE_COLORS.length]};strokeColor=none;fontColor=#FFFFFF;fontSize=10;fontStyle=1;align=center;verticalAlign=middle;`);
  });

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

  const feedbackY = contentBottom + 42;
  let routedEdgeIndex = 0;
  graph.edges.sort((a, b) => a.step - b.step).forEach((edge, index) => {
    const source = positions.get(edge.source)!;
    const target = positions.get(edge.target)!;
    const sourceColumn = stageIndex.get(source.stage) || 0;
    const targetColumn = stageIndex.get(target.stage) || 0;
    const forward = targetColumn > sourceColumn;
    const sameColumn = targetColumn === sourceColumn;
    const isFeedback = edge.flowType === 'feedback' || targetColumn < sourceColumn;
    const skipsStage = Math.abs(targetColumn - sourceColumn) > 1;
    const label = `${edge.step}. ${edge.condition || edge.label}`;
    const edgeStyle = `${FLOW_STYLE[edge.flowType]}endArrow=block;endFill=1;rounded=1;html=1;labelBackgroundColor=${theme === 'dark' ? '#0F172A' : '#FFFFFF'};labelBorderColor=${theme === 'dark' ? '#475569' : '#CBD5E1'};fontColor=${theme === 'dark' ? '#F8FAFC' : '#0F172A'};fontSize=9;fontStyle=1;spacing=3;`;
    let exitX = forward ? 1 : 0;
    let entryX = forward ? 0 : 1;
    let exitY = 0.5;
    let entryY = 0.5;
    let points = '';
    let routing = 'edgeStyle=orthogonalEdgeStyle;orthogonalLoop=1;jettySize=auto;';
    if (isFeedback || skipsStage) {
      const routeY = feedbackY + routedEdgeIndex * 14;
      routedEdgeIndex += 1;
      exitX = 0.5; exitY = 1; entryX = 0.5; entryY = 1;
      points = `<Array as="points"><mxPoint x="${source.x + source.width / 2}" y="${routeY}"/><mxPoint x="${target.x + target.width / 2}" y="${routeY}"/></Array>`;
    } else if (sameColumn) {
      const channelX = source.x + source.width + 36 + index * 4;
      exitX = 1; entryX = 1;
      points = `<Array as="points"><mxPoint x="${channelX}" y="${source.y + source.height / 2}"/><mxPoint x="${channelX}" y="${target.y + target.height / 2}"/></Array>`;
    } else if (source.row === target.row) {
      const sourceCenterY = source.y + source.height / 2;
      const targetCenterY = target.y + target.height / 2;
      const lineY = (sourceCenterY + targetCenterY) / 2;
      exitY = Math.max(0.1, Math.min(0.9, (lineY - source.y) / source.height));
      entryY = Math.max(0.1, Math.min(0.9, (lineY - target.y) / target.height));
      routing = 'edgeStyle=none;';
    } else {
      const channelX = source.x + source.width + gapX / 2;
      points = `<Array as="points"><mxPoint x="${channelX}" y="${source.y + source.height / 2}"/><mxPoint x="${channelX}" y="${target.y + target.height / 2}"/></Array>`;
    }
    cells.push(`<mxCell id="${escapeXml(edge.id || `edge_${index + 1}`)}" value="${escapeXml(label)}" edge="1" parent="1" source="${escapeXml(edge.source)}" target="${escapeXml(edge.target)}" style="${routing}exitX=${exitX};exitY=${exitY};entryX=${entryX};entryY=${entryY};exitPerimeter=1;entryPerimeter=1;${edgeStyle}"><mxGeometry relative="1" as="geometry">${points}</mxGeometry></mxCell>`);
  });

  if (graph.assumptions.length) {
    vertex('assumptions', `<div style="font-family:Google Sans,Arial,sans-serif;text-align:left;"><b>Assumptions</b><br/>${graph.assumptions.map((item, index) => `${index + 1}. ${item}`).join('<br/>')}</div>`, 40, pageHeight - 54, pageWidth - 80, 42, `rounded=1;arcSize=8;fillColor=${theme === 'dark' ? '#1E293B' : '#FFFBEB'};strokeColor=#F59E0B;fontColor=${text};fontSize=8.5;align=left;verticalAlign=middle;spacingLeft=10;`);
  }

  const xml = `<mxfile host="embed.diagrams.net"><diagram id="studio1_hybrid" name="${escapeXml(graph.title)}"><mxGraphModel dx="${pageWidth}" dy="${pageHeight}" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="${pageWidth}" pageHeight="${pageHeight}" background="${bg}" math="0" shadow="0"><root>${cells.join('')}</root></mxGraphModel></diagram></mxfile>`;
  return { xml, certification };
}
