import { hasOfficialGoogleCloudIcon, renderGcpIconHtml } from './gcpIcons';
import type {
  Studio1Certification,
  Studio1RelationType,
  Studio1SemanticEdge,
  Studio1SemanticGraph,
  Studio1SemanticNode,
} from './studio1HybridEngine';

type GroupId = 'external' | 'ingress' | 'messaging' | 'processing' | 'data' | 'controls';

interface PositionedNode extends Studio1SemanticNode {
  x: number;
  y: number;
  width: number;
  height: number;
  groupId: GroupId;
  groupIndex: number;
  row: number;
}

interface FunctionalGroup {
  id: Exclude<GroupId, 'external' | 'controls'>;
  label: string;
  description: string;
  x: number;
  y: number;
  width: number;
  height: number;
  nodes: PositionedNode[];
}

const GOOGLE = {
  blue: '#1A73E8',
  red: '#D93025',
  yellow: '#F9AB00',
  green: '#188038',
  ink: '#202124',
  muted: '#5F6368',
  border: '#DADCE0',
  surface: '#F8F9FA',
  paleBlue: '#F6FAFE',
};

const OFFICIAL_SERVICE_NAMES: Record<string, string> = {
  bigquery: 'BigQuery',
  cloud_armor: 'Cloud Armor',
  cloud_cdn: 'Cloud CDN',
  cloud_deploy: 'Cloud Deploy',
  cloud_functions: 'Cloud Run functions',
  cloud_iam: 'Identity and Access Management',
  cloud_load_balancing: 'Cloud Load Balancing',
  cloud_logging: 'Cloud Logging',
  cloud_monitoring: 'Cloud Monitoring',
  cloud_run: 'Cloud Run',
  cloud_storage: 'Cloud Storage',
  compute_engine: 'Compute Engine',
  dataflow: 'Dataflow',
  document_ai: 'Document AI',
  gke: 'Google Kubernetes Engine',
  gke_autopilot: 'GKE Autopilot',
  iap: 'Identity-Aware Proxy',
  memorystore: 'Memorystore',
  pubsub: 'Pub/Sub',
  scc: 'Security Command Center',
  spanner: 'Spanner',
  vertex_ai: 'Vertex AI',
};

const EXEMPT_FROM_OFFICIAL_ASSET = new Set(['user_ingress']);
const CONTROL_KEYS = new Set(['cloud_armor', 'cloud_iam', 'cloud_logging', 'cloud_monitoring', 'iap', 'scc', 'vpc_sc', 'cloud_dlp']);
const DATA_KEYS = new Set(['bigquery', 'cloud_storage', 'spanner', 'memorystore']);

function escapeXml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

function groupFor(node: Studio1SemanticNode): GroupId {
  const text = `${node.label} ${node.description} ${node.zone}`.toLowerCase();
  if (node.kind === 'actor' || node.kind === 'external') return 'external';
  if (node.kind === 'observability' || (node.kind === 'security' && node.serviceKey !== 'cloud_armor') || (node.serviceKey && CONTROL_KEYS.has(node.serviceKey) && node.serviceKey !== 'cloud_armor')) return 'controls';
  if (node.kind === 'datastore' || (node.serviceKey && DATA_KEYS.has(node.serviceKey))) return 'data';
  if (node.serviceKey === 'cloud_armor' || node.serviceKey === 'cloud_load_balancing' || node.serviceKey === 'cloud_cdn' || node.serviceKey === 'iap' || /ingress|ingest|admission|api gateway|load balanc|edge/.test(text)) return 'ingress';
  if (node.kind === 'queue' || node.serviceKey === 'pubsub' || /topic|subscription|messag|event bus|queue/.test(text)) return 'messaging';
  return 'processing';
}

function relationFor(edge: Studio1SemanticEdge, source: Studio1SemanticNode, target: Studio1SemanticNode): Studio1RelationType {
  if (edge.relationType) return edge.relationType;
  const text = `${edge.label} ${edge.condition || ''}`.toLowerCase();
  if (source.serviceKey === 'cloud_armor' || /protect|filter|waf|policy/.test(text)) return 'protects';
  if (source.kind === 'observability' || target.kind === 'observability' || /metric|log|trace|telemetry|observe/.test(text)) return 'observes';
  if (source.serviceKey === 'cloud_iam' || target.serviceKey === 'cloud_iam' || /authoriz|identity|permission|least privilege/.test(text)) return 'authorizes';
  if (/publish|enqueue/.test(text)) return 'publishes';
  if (/subscribe|consume|pull|deliver/.test(text)) return 'subscribes';
  if (/write|persist|store|archive|load/.test(text)) return 'writes';
  if (edge.flowType === 'feedback' || /replay|retry|requeue|republish/.test(text)) return 'feedback';
  if (/route|forward|proxy/.test(text)) return 'routes';
  return edge.flowType === 'data' ? 'writes' : 'invokes';
}

function canonicalizeEdges(graph: Studio1SemanticGraph): Studio1SemanticEdge[] {
  const nodes = new Map(graph.nodes.map(node => [node.id, node]));
  const armor = graph.nodes.find(node => node.serviceKey === 'cloud_armor');
  const loadBalancer = graph.nodes.find(node => node.serviceKey === 'cloud_load_balancing');
  const edges = graph.edges.map(edge => ({ ...edge }));

  if (armor && loadBalancer) {
    for (const edge of edges) {
      if (edge.target === armor.id && edge.source !== loadBalancer.id) edge.target = loadBalancer.id;
      if (edge.source === loadBalancer.id && edge.target === armor.id) {
        edge.source = armor.id;
        edge.target = loadBalancer.id;
        edge.flowType = 'governance';
        edge.relationType = 'protects';
        edge.label = 'Applies security policy';
      }
      if (edge.source === armor.id && edge.target !== loadBalancer.id && edge.flowType !== 'governance') edge.source = loadBalancer.id;
      if (edge.source === armor.id && edge.target === loadBalancer.id) {
        edge.flowType = 'governance';
        edge.relationType = 'protects';
        edge.label = 'Applies security policy';
      }
    }
    if (!edges.some(edge => edge.source === armor.id && edge.target === loadBalancer.id)) {
      edges.push({
        id: 'cloud_armor_protects_load_balancer',
        source: armor.id,
        target: loadBalancer.id,
        label: 'Applies security policy',
        flowType: 'governance',
        relationType: 'protects',
        step: edges.length + 1,
      });
    }
  }

  const unique = new Map<string, Studio1SemanticEdge>();
  for (const edge of edges) {
    const source = nodes.get(edge.source);
    const target = nodes.get(edge.target);
    if (!source || !target || source.id === target.id) continue;
    edge.relationType = relationFor(edge, source, target);
    const key = `${edge.source}>${edge.target}:${edge.relationType}`;
    if (!unique.has(key)) unique.set(key, edge);
  }
  return [...unique.values()].sort((a, b) => a.step - b.step).map((edge, index) => ({ ...edge, step: index + 1 }));
}

function displayName(node: Studio1SemanticNode): string {
  if (!node.serviceKey || !OFFICIAL_SERVICE_NAMES[node.serviceKey]) return node.label;
  const official = OFFICIAL_SERVICE_NAMES[node.serviceKey];
  if (node.serviceKey === 'pubsub') {
    const text = `${node.label} ${node.description}`.toLowerCase();
    if (/dead.?letter|dlt|dlq/.test(text) && /subscription/.test(text)) return 'Pub/Sub dead-letter subscription';
    if (/dead.?letter|dlt|dlq/.test(text)) return 'Pub/Sub dead-letter topic';
    if (/subscription/.test(text)) return 'Pub/Sub subscription';
    if (/topic/.test(text)) return 'Pub/Sub topic';
  }
  return official;
}

function orderWithinGroup(node: Studio1SemanticNode, groupId: GroupId): number {
  const text = `${node.label} ${node.description}`.toLowerCase();
  if (groupId === 'messaging') {
    if (/dead[- ]?letter|dlq/.test(text)) return 2;
    if (/subscription/.test(text)) return 1;
    if (/topic/.test(text) || node.serviceKey === 'pubsub') return 0;
  }
  if (groupId === 'processing') {
    if (node.serviceKey === 'dataflow' || /processor|transform|enrich/.test(text)) return 0;
    if (node.kind === 'decision' || /valid|quality|schema/.test(text)) return 1;
  }
  if (groupId === 'data') {
    if (node.serviceKey === 'bigquery') return 0;
    if (node.serviceKey === 'cloud_storage') return 1;
  }
  return 0;
}

function layoutGraph(graph: Studio1SemanticGraph): {
  positions: Map<string, PositionedNode>;
  groups: FunctionalGroup[];
  externalBox: { x: number; y: number; width: number; height: number };
  controlsBox: { x: number; y: number; width: number; height: number };
  cloudBox: { x: number; y: number; width: number; height: number };
  projectBox: { x: number; y: number; width: number; height: number };
  regionBox: { x: number; y: number; width: number; height: number };
  pageWidth: number;
  pageHeight: number;
  layoutViolations: string[];
} {
  const pageWidth = 1500;
  const externalBox = { x: 30, y: 218, width: 190, height: 520 };
  const cloudBox = { x: 242, y: 132, width: 1228, height: 0 };
  const projectBox = { x: 264, y: 180, width: 1184, height: 0 };
  const regionBox = { x: 286, y: 232, width: 1140, height: 0 };
  const groupDefinitions = [
    { id: 'ingress', label: 'Edge and ingress', description: 'Global entry point and application admission' },
    { id: 'messaging', label: 'Messaging', description: 'Topics, subscriptions, delivery and retry' },
    { id: 'processing', label: 'Application and processing', description: 'Runtime, orchestration and transformations' },
    { id: 'data', label: 'Data and analytics', description: 'Durable operational and analytical state' },
  ] as const;
  const positions = new Map<string, PositionedNode>();
  const controls = graph.nodes.filter(node => groupFor(node) === 'controls');
  const external = graph.nodes.filter(node => groupFor(node) === 'external');
  const activeDefinitions = groupDefinitions.filter(definition => graph.nodes.some(node => groupFor(node) === definition.id));
  const groupGap = 30;
  const groupAreaWidth = regionBox.width - 40;
  const groupWidth = Math.floor((groupAreaWidth - Math.max(0, activeDefinitions.length - 1) * groupGap) / Math.max(1, activeDefinitions.length));
  const maxGroupNodes = Math.max(1, ...activeDefinitions.map(definition => graph.nodes.filter(node => groupFor(node) === definition.id).length));
  const groupHeight = 64 + maxGroupNodes * 96 + Math.max(0, maxGroupNodes - 1) * 32 + 24;
  regionBox.height = groupHeight + 44;
  const groups: FunctionalGroup[] = [];
  activeDefinitions.forEach((definition, groupIndex) => {
    const x = regionBox.x + 20 + groupIndex * (groupWidth + groupGap);
    const nodes = graph.nodes
      .filter(node => groupFor(node) === definition.id)
      .sort((left, right) => orderWithinGroup(left, definition.id) - orderWithinGroup(right, definition.id) || left.stage - right.stage || left.label.localeCompare(right.label));
    const positionedNodes = nodes.map((node, row): PositionedNode => ({
      ...node,
      x: x + 16,
      y: regionBox.y + 72 + row * 128,
      width: groupWidth - 32,
      height: 96,
      groupId: definition.id,
      groupIndex,
      row,
    }));
    positionedNodes.forEach(node => positions.set(node.id, node));
    groups.push({ ...definition, x, y: regionBox.y + 36, width: groupWidth, height: groupHeight, nodes: positionedNodes });
  });

  externalBox.height = Math.max(280, 74 + external.length * 96 + Math.max(0, external.length - 1) * 32 + 28);
  external.forEach((node, row) => positions.set(node.id, {
    ...node,
    x: externalBox.x + 16,
    y: externalBox.y + 58 + row * 128,
    width: externalBox.width - 32,
    height: 96,
    groupId: 'external',
    groupIndex: -1,
    row,
  }));

  const controlsY = regionBox.y + regionBox.height + 28;
  const controlColumns = Math.min(5, controls.length);
  const controlRows = controls.length ? Math.ceil(controls.length / controlColumns) : 0;
  const controlsBox = { x: regionBox.x, y: controlsY, width: regionBox.width, height: controls.length ? 74 + controlRows * 78 + Math.max(0, controlRows - 1) * 32 : 0 };
  const controlWidth = controlColumns ? Math.min(236, Math.floor((controlsBox.width - 44 - (controlColumns - 1) * 30) / controlColumns)) : 0;
  controls.forEach((node, index) => {
    const row = Math.floor(index / controlColumns);
    const column = index % controlColumns;
    const nodesInRow = Math.min(controlColumns, controls.length - row * controlColumns);
    const rowWidth = nodesInRow * controlWidth + Math.max(0, nodesInRow - 1) * 30;
    const rowStartX = controlsBox.x + Math.max(22, (controlsBox.width - rowWidth) / 2);
    positions.set(node.id, {
    ...node,
    x: Math.round(rowStartX + column * (controlWidth + 30)),
    y: controlsBox.y + 50 + row * 110,
    width: controlWidth,
    height: 78,
    groupId: 'controls',
    groupIndex: activeDefinitions.length,
    row,
    });
  });

  projectBox.height = regionBox.height + (controlsBox.height ? controlsBox.height + 52 : 28) + 76;
  cloudBox.height = projectBox.height + 72;
  const pageHeight = Math.max(760, cloudBox.y + cloudBox.height + (graph.assumptions.length ? 104 : 44), externalBox.y + externalBox.height + 44);
  const layoutViolations: string[] = [];
  const cards = [...positions.values()];
  for (let i = 0; i < cards.length; i += 1) {
    for (let j = i + 1; j < cards.length; j += 1) {
      const left = cards[i];
      const right = cards[j];
      const separated = left.x + left.width + 29 < right.x || right.x + right.width + 29 < left.x || left.y + left.height + 29 < right.y || right.y + right.height + 29 < left.y;
      if (!separated) layoutViolations.push(`Card clearance below 30px between ${left.id} and ${right.id}`);
    }
  }
  return { positions, groups, externalBox, controlsBox, cloudBox, projectBox, regionBox, pageWidth, pageHeight, layoutViolations };
}

function conformanceViolations(graph: Studio1SemanticGraph, edges: Studio1SemanticEdge[], layoutViolations: string[]): string[] {
  const violations = [...layoutViolations];
  const generic = graph.nodes.filter(node => /^(?:component|service|process|data warehouse|main event stream|central logging|metrics\s*(?:&|and)\s*alerts)(?:\s+\d+)?$/i.test(node.label));
  if (generic.length) violations.push(`Non-product or generic labels: ${generic.map(node => node.id).join(', ')}`);
  const missingAssets = graph.nodes.filter(node => node.provider?.toLowerCase() === 'gcp' && node.serviceKey && !EXEMPT_FROM_OFFICIAL_ASSET.has(node.serviceKey) && !hasOfficialGoogleCloudIcon(node.serviceKey));
  if (missingAssets.length) violations.push(`Official Google Cloud icon unavailable: ${missingAssets.map(node => node.serviceKey).join(', ')}`);
  const armor = graph.nodes.find(node => node.serviceKey === 'cloud_armor');
  const loadBalancer = graph.nodes.find(node => node.serviceKey === 'cloud_load_balancing');
  if (armor && loadBalancer && !edges.some(edge => edge.source === armor.id && edge.target === loadBalancer.id && edge.relationType === 'protects')) {
    violations.push('Cloud Armor must protect Cloud Load Balancing through a policy relationship');
  }
  const operational = graph.nodes.filter(node => node.kind === 'observability');
  if (operational.some(node => groupFor(node) !== 'controls')) violations.push('Observability must be rendered as a cross-cutting control');
  if (!graph.nodes.some(node => node.provider?.toLowerCase() === 'gcp' || node.serviceKey)) violations.push('Google Cloud profile requires at least one Google Cloud product');
  return violations;
}

function edgeStyle(edge: Studio1SemanticEdge, relation: Studio1RelationType): string {
  if (relation === 'protects') return `strokeColor=${GOOGLE.red};strokeWidth=1.8;dashed=1;dashPattern=4 3;endArrow=none;`;
  if (relation === 'observes' || relation === 'authorizes') return `strokeColor=${GOOGLE.yellow};strokeWidth=1.7;dashed=1;dashPattern=3 3;endArrow=open;endFill=0;`;
  if (relation === 'feedback') return `strokeColor=${GOOGLE.red};strokeWidth=1.8;dashed=1;dashPattern=6 4;endArrow=block;endFill=1;`;
  if (relation === 'writes') return `strokeColor=${GOOGLE.green};strokeWidth=2;endArrow=block;endFill=1;`;
  if (relation === 'publishes' || relation === 'subscribes' || edge.flowType === 'asynchronous') return `strokeColor=${GOOGLE.blue};strokeWidth=1.9;dashed=1;dashPattern=7 4;endArrow=block;endFill=1;`;
  return `strokeColor=${GOOGLE.blue};strokeWidth=2;endArrow=block;endFill=1;`;
}

export function renderStudio1GoogleCloudXml(
  graph: Studio1SemanticGraph,
  semanticCertification: Studio1Certification,
  theme: 'light' | 'dark' = 'light',
): { xml: string; certification: Studio1Certification } {
  const edges = canonicalizeEdges(graph);
  const layout = layoutGraph(graph);
  const googleViolations = conformanceViolations(graph, edges, layout.layoutViolations);
  const violations = [...semanticCertification.violations, ...googleViolations];
  const certification: Studio1Certification = {
    ...semanticCertification,
    certified: violations.length === 0,
    score: Math.max(0, 100 - violations.length * 10),
    violations,
    edgeCount: edges.length,
  };
  const cells: string[] = ['<mxCell id="0"/>', '<mxCell id="1" parent="0"/>'];
  const vertex = (id: string, value: string, x: number, y: number, width: number, height: number, style: string) => {
    cells.push(`<mxCell id="${escapeXml(id)}" value="${escapeXml(value)}" style="html=1;whiteSpace=wrap;${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${width}" height="${height}" as="geometry"/></mxCell>`);
  };

  vertex('google_title', `<div style="font-family:Google Sans,Arial,sans-serif;text-align:left;"><div style="font-size:25px;font-weight:700;color:${GOOGLE.ink};">${graph.title}</div><div style="font-size:12px;color:${GOOGLE.muted};margin-top:5px;">${graph.subtitle}</div></div>`, 42, 24, 1180, 64, 'strokeColor=none;fillColor=none;align=left;verticalAlign=middle;');
  vertex('google_profile', `Google Cloud visual profile  •  ${graph.nodes.length} components  •  ${edges.length} relationships  •  ${certification.certified ? `Conformance checks passed ${certification.score}/100` : `${certification.violations.length} conformance finding${certification.violations.length === 1 ? '' : 's'}`}`, 42, 92, layout.pageWidth - 84, 28, `rounded=1;arcSize=10;fillColor=${GOOGLE.surface};strokeColor=${GOOGLE.border};fontColor=${GOOGLE.muted};fontSize=9.5;fontStyle=1;align=left;spacingLeft=10;`);

  vertex('external_scope', '', layout.externalBox.x, layout.externalBox.y, layout.externalBox.width, layout.externalBox.height, `rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=${GOOGLE.border};strokeWidth=1.2;`);
  vertex('external_scope_label', 'External systems and producers', layout.externalBox.x + 14, layout.externalBox.y + 12, layout.externalBox.width - 28, 28, `fillColor=none;strokeColor=none;fontColor=${GOOGLE.muted};fontSize=10;fontStyle=1;align=left;`);
  vertex('google_cloud_scope', '', layout.cloudBox.x, layout.cloudBox.y, layout.cloudBox.width, layout.cloudBox.height, `rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=${GOOGLE.blue};strokeWidth=2;`);
  vertex('google_cloud_label', 'Google Cloud', layout.cloudBox.x + 18, layout.cloudBox.y + 10, 180, 30, `fillColor=none;strokeColor=none;fontColor=${GOOGLE.blue};fontSize=14;fontStyle=1;align=left;`);
  vertex('project_scope', '', layout.projectBox.x, layout.projectBox.y, layout.projectBox.width, layout.projectBox.height, `rounded=1;arcSize=6;fillColor=${GOOGLE.paleBlue};fillOpacity=38;strokeColor=${GOOGLE.border};strokeWidth=1.4;`);
  vertex('project_label', 'Workload project', layout.projectBox.x + 16, layout.projectBox.y + 8, 210, 26, `fillColor=none;strokeColor=none;fontColor=${GOOGLE.ink};fontSize=10.5;fontStyle=1;align=left;`);
  const needsVpc = graph.nodes.some(node => ['gke', 'gke_autopilot', 'compute_engine'].includes(node.serviceKey || '') || /\bvpc\b|subnet/i.test(`${node.zone} ${node.description}`));
  vertex('region_scope', '', layout.regionBox.x, layout.regionBox.y, layout.regionBox.width, layout.regionBox.height, `rounded=1;arcSize=5;fillColor=#FFFFFF;strokeColor=#BDC1C6;strokeWidth=1.2;dashed=1;dashPattern=8 4;`);
  vertex('region_label', needsVpc ? 'Region  •  VPC-connected workload and managed services' : 'Region  •  Google-managed services', layout.regionBox.x + 16, layout.regionBox.y + 7, 440, 24, `fillColor=none;strokeColor=none;fontColor=${GOOGLE.muted};fontSize=9.5;fontStyle=1;align=left;`);

  layout.groups.forEach(group => {
    vertex(`group_${group.id}`, '', group.x, group.y, group.width, group.height, `rounded=1;arcSize=5;fillColor=${GOOGLE.surface};fillOpacity=70;strokeColor=${GOOGLE.border};strokeWidth=1;`);
    vertex(`group_label_${group.id}`, `<b>${group.label}</b><br/><span style="font-size:8px;color:${GOOGLE.muted};">${group.description}</span>`, group.x + 12, group.y + 10, group.width - 24, 40, `fillColor=none;strokeColor=none;fontColor=${GOOGLE.ink};fontSize=10;align=left;verticalAlign=top;`);
  });
  if (layout.controlsBox.height) {
    vertex('cross_cutting_controls', '', layout.controlsBox.x, layout.controlsBox.y, layout.controlsBox.width, layout.controlsBox.height, `rounded=1;arcSize=5;fillColor=#FFFDF5;strokeColor=#F6C344;strokeWidth=1.2;dashed=1;dashPattern=5 3;`);
    vertex('cross_cutting_label', 'Cross-cutting security, identity and operations', layout.controlsBox.x + 16, layout.controlsBox.y + 10, 440, 28, `fillColor=none;strokeColor=none;fontColor=#7A4F01;fontSize=10;fontStyle=1;align=left;`);
  }

  const edgeInsertIndex = cells.length;
  for (const node of layout.positions.values()) {
    const title = displayName(node);
    const subtitle = node.label !== title && !/^component/i.test(node.label) ? `${node.label} • ${node.description}` : node.description;
    const icon = node.serviceKey ? renderGcpIconHtml(node.serviceKey, 36, node.id) : '';
    if (node.kind === 'decision') {
      vertex(node.id, `<div style="font-family:Google Sans,Arial,sans-serif;text-align:center;"><div style="font-size:12px;font-weight:700;color:${GOOGLE.ink};">${title}</div><div style="font-size:9px;color:${GOOGLE.muted};margin-top:3px;">${node.description}</div></div>`, node.x + 18, node.y, node.width - 36, node.height, `shape=rhombus;perimeter=rhombusPerimeter;fillColor=#FFFFFF;strokeColor=${GOOGLE.yellow};strokeWidth=1.7;align=center;verticalAlign=middle;spacing=7;`);
      continue;
    }
    const html = `<div style="font-family:Google Sans,Arial,sans-serif;padding:9px;text-align:left;display:flex;align-items:center;gap:10px;">${icon}<div><div style="font-size:12px;font-weight:700;color:${GOOGLE.ink};">${title}</div><div style="font-size:9px;color:${GOOGLE.muted};line-height:1.3;margin-top:3px;">${subtitle}</div>${node.technology ? `<div style="font-size:8.5px;color:${GOOGLE.blue};margin-top:3px;">${node.technology}</div>` : ''}</div></div>`;
    const isPolicy = node.serviceKey === 'cloud_armor' || node.serviceKey === 'cloud_iam' || node.kind === 'security';
    vertex(node.id, html, node.x, node.y, node.width, node.height, `rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=${isPolicy ? GOOGLE.red : GOOGLE.border};strokeWidth=${isPolicy ? 1.6 : 1.2};align=left;verticalAlign=middle;spacing=5;`);
  }

  let edgeCount = 0;
  let mainFlowNumber = 0;
  let controlFlowNumber = 0;
  edges.forEach((edge, index) => {
    const source = layout.positions.get(edge.source);
    const target = layout.positions.get(edge.target);
    if (!source || !target) return;
    const relation = edge.relationType || relationFor(edge, source, target);
    const isControl = ['protects', 'observes', 'authorizes'].includes(relation);
    const isFeedback = relation === 'feedback' || target.groupIndex < source.groupIndex;
    let exitX = target.x >= source.x ? 1 : 0;
    let entryX = target.x >= source.x ? 0 : 1;
    let exitY = 0.5;
    let entryY = 0.5;
    let points = '';
    if (relation === 'protects' && source.groupId !== 'controls' && target.groupId !== 'controls') {
      const railY = Math.min(source.y, target.y) - 14;
      exitX = 0.5; entryX = 0.5; exitY = 0; entryY = 0;
      points = `<Array as="points"><mxPoint x="${source.x + source.width / 2}" y="${railY}"/><mxPoint x="${target.x + target.width / 2}" y="${railY}"/></Array>`;
    } else if (isControl) {
      const mainNode = source.groupId === 'controls' ? target : source;
      const railX = mainNode.groupId === 'external' ? layout.cloudBox.x - 14 : Math.min(layout.projectBox.x + layout.projectBox.width - 16, mainNode.x + mainNode.width + 12);
      const railY = layout.controlsBox.height ? layout.controlsBox.y - 14 : layout.regionBox.y + layout.regionBox.height + 12;
      exitX = source.groupId === 'controls' ? 0.5 : 1;
      entryX = target.groupId === 'controls' ? 0.5 : 1;
      exitY = source.groupId === 'controls' ? 0 : 0.65;
      entryY = target.groupId === 'controls' ? 0 : 0.65;
      points = `<Array as="points"><mxPoint x="${railX}" y="${source.y + source.height * exitY}"/><mxPoint x="${railX}" y="${railY}"/><mxPoint x="${target.x + target.width * entryX}" y="${railY}"/></Array>`;
    } else if (isFeedback) {
      const railY = layout.regionBox.y + layout.regionBox.height - 16 - (index % 3) * 7;
      exitX = 0.5; entryX = 0.5; exitY = 1; entryY = 1;
      points = `<Array as="points"><mxPoint x="${source.x + source.width / 2}" y="${railY}"/><mxPoint x="${target.x + target.width / 2}" y="${railY}"/></Array>`;
    } else if (source.groupId === target.groupId) {
      exitX = 0.5; entryX = 0.5; exitY = source.y <= target.y ? 1 : 0; entryY = source.y <= target.y ? 0 : 1;
    } else if (Math.abs(source.groupIndex - target.groupIndex) > 1) {
      const railY = layout.regionBox.y + 28 + (index % 3) * 7;
      exitX = 0.5; entryX = 0.5; exitY = 0; entryY = 0;
      points = `<Array as="points"><mxPoint x="${source.x + source.width / 2}" y="${railY}"/><mxPoint x="${target.x + target.width / 2}" y="${railY}"/></Array>`;
    }
    const mainNumber = isControl ? `C${++controlFlowNumber}` : String(++mainFlowNumber);
    const label = `${mainNumber}. ${edge.condition || edge.label}`;
    const style = `edgeStyle=orthogonalEdgeStyle;orthogonalLoop=1;jettySize=14;rounded=1;html=1;exitX=${exitX};exitY=${exitY};entryX=${entryX};entryY=${entryY};exitPerimeter=1;entryPerimeter=1;${edgeStyle(edge, relation)}labelBackgroundColor=#FFFFFF;labelBorderColor=${GOOGLE.border};fontColor=${GOOGLE.ink};fontSize=9.5;fontStyle=1;spacing=3;`;
    cells.splice(edgeInsertIndex + edgeCount, 0, `<mxCell id="${escapeXml(edge.id)}" value="${escapeXml(label)}" edge="1" parent="1" source="${escapeXml(edge.source)}" target="${escapeXml(edge.target)}" style="${style}"><mxGeometry relative="1" as="geometry">${points}</mxGeometry></mxCell>`);
    edgeCount += 1;
  });

  if (graph.assumptions.length) {
    vertex('assumptions', `<div style="font-family:Google Sans,Arial,sans-serif;text-align:left;"><b>Assumptions</b><br/>${graph.assumptions.map((item, index) => `${index + 1}. ${item}`).join('<br/>')}</div>`, 42, layout.cloudBox.y + layout.cloudBox.height + 18, layout.pageWidth - 84, Math.min(82, 34 + graph.assumptions.length * 12), `rounded=1;arcSize=6;fillColor=#FFFBEB;strokeColor=#F6C344;fontColor=${GOOGLE.ink};fontSize=8.5;align=left;verticalAlign=middle;spacingLeft=10;`);
  }
  vertex('google_asset_note', 'Product icon assets: official Google Cloud icon library • Diagram generated by PromptCanvas; not a Google endorsement', 42, layout.pageHeight - 36, layout.pageWidth - 84, 20, `fillColor=none;strokeColor=none;fontColor=${GOOGLE.muted};fontSize=7.5;align=right;`);

  const xml = `<mxfile host="embed.diagrams.net"><diagram id="studio1_google_cloud" name="${escapeXml(graph.title)}"><mxGraphModel dx="${layout.pageWidth}" dy="${layout.pageHeight}" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="${layout.pageWidth}" pageHeight="${layout.pageHeight}" background="${theme === 'dark' ? '#FFFFFF' : '#FFFFFF'}" math="0" shadow="0"><root>${cells.join('')}</root></mxGraphModel></diagram></mxfile>`;
  return { xml, certification };
}
