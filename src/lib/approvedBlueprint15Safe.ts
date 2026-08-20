// Approved Blueprint 15 master: Multi-Agent Execution Lifeline Sequence Diagram
// Native editable mxGraph XML, aligned to UML 2.x sequence semantics and enterprise agentic-AI patterns.

const GCP = 'https://cdn.jsdelivr.net/npm/gcp-icons@1.0.6/dist/icons/';
const ICON = {
  agents: `${GCP}agents-512-color.svg`,
  bigquery: `${GCP}bigquery-512-color.svg`,
  storage: `${GCP}cloud-storage-512-color.svg`,
};

function esc(v: string): string {
  return v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function html(title: string, subtitle = '', align: 'left' | 'center' = 'left'): string {
  return `&lt;div style=&quot;font-family:Inter,Arial,sans-serif;text-align:${align};&quot;&gt;` +
    `&lt;div style=&quot;font-size:12.5px;font-weight:800;color:#102A56;line-height:1.2;&quot;&gt;${esc(title)}&lt;/div&gt;` +
    (subtitle ? `&lt;div style=&quot;margin-top:4px;font-size:10.5px;color:#526079;line-height:1.25;&quot;&gt;${esc(subtitle)}&lt;/div&gt;` : '') +
    `&lt;/div&gt;`;
}

function cell(id: string, value: string, style: string, x: number, y: number, w: number, h: number): string {
  return `<mxCell id="${id}" value="${value}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`;
}

function pointEdge(id: string, value: string, x1: number, y1: number, x2: number, y2: number, style: string): string {
  return `<mxCell id="${id}" value="${esc(value)}" style="${style}" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="${x1}" y="${y1}" as="sourcePoint"/><mxPoint x="${x2}" y="${y2}" as="targetPoint"/><mxPoint x="0" y="-9" as="offset"/></mxGeometry></mxCell>`;
}

const BOX = 'rounded=1;arcSize=10;whiteSpace=wrap;html=1;spacing=8;verticalAlign=middle;fontFamily=Inter;';
const TEXT = 'text;html=1;strokeColor=none;fillColor=none;fontFamily=Inter;verticalAlign=middle;';

const X = {
  user: 95,
  gemini: 325,
  coordinator: 565,
  gateway: 805,
  retrieval: 1055,
  analytics: 1305,
  data: 1560,
} as const;

function participant(id: string, title: string, subtitle: string, x: number, accent: string, icon?: string): string[] {
  const out: string[] = [];
  out.push(cell(`${id}_card`, '', `${BOX}fillColor=#FFFFFF;strokeColor=${accent};strokeWidth=1.6;`, x - 90, 118, 180, 78));
  if (icon) out.push(cell(`${id}_icon`, '', `shape=image;imageAspect=0;aspect=fixed;image=${icon};strokeColor=none;fillColor=none;`, x - 76, 139, 30, 30));
  out.push(cell(`${id}_text`, html(title, subtitle), `${TEXT}align=left;`, x - (icon ? 38 : 72), 127, icon ? 118 : 144, 60));
  out.push(cell(`${id}_life`, '', `shape=line;html=1;strokeColor=${accent};strokeWidth=1.2;dashed=1;dashPattern=5 5;`, x, 197, 1, 662));
  return out;
}

function activation(id: string, x: number, y: number, h: number, fill: string, stroke: string): string {
  return cell(id, '', `rounded=0;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${stroke};strokeWidth=1;`, x - 6, y, 12, h);
}

function step(n: number, x: number, y: number): string {
  return cell(`step_${n}`, String(n), 'ellipse;whiteSpace=wrap;html=1;fillColor=#101828;strokeColor=#101828;fontColor=#FFFFFF;fontStyle=1;fontSize=10;align=center;verticalAlign=middle;', x, y - 11, 22, 22);
}

function message(id: string, n: number, from: number, to: number, y: number, label: string, kind: 'sync' | 'async' | 'return' | 'control' = 'sync'): string[] {
  const forward = to >= from;
  const sx = from + (forward ? 7 : -7);
  const tx = to + (forward ? -7 : 7);
  const min = Math.min(from, to);
  const color = kind === 'control' ? '#7C3AED' : kind === 'async' ? '#0F8B82' : kind === 'return' ? '#475467' : '#175CD3';
  const dashed = kind === 'return';
  const arrow = kind === 'async' || kind === 'return' ? 'open' : 'block';
  const style = `edgeStyle=none;html=1;strokeWidth=2;strokeColor=${color};${dashed ? 'dashed=1;dashPattern=7 5;' : ''}` +
    `endArrow=${arrow};endFill=${arrow === 'block' ? '1' : '0'};labelBackgroundColor=#FFFFFF;fontColor=#344054;fontSize=10.5;fontFamily=Inter;align=center;verticalAlign=bottom;`;
  return [step(n, min + 10, y), pointEdge(id, label, sx, y, tx, y, style)];
}

function fragment(id: string, label: string, x: number, y: number, w: number, h: number, stroke: string, fill: string): string[] {
  return [
    cell(id, '', `rounded=1;arcSize=7;whiteSpace=wrap;html=1;fillColor=${fill};opacity=35;strokeColor=${stroke};strokeWidth=1.2;dashed=1;dashPattern=6 4;`, x, y, w, h),
    cell(`${id}_tag`, `<b>${esc(label)}</b>`, `${BOX}fillColor=#FFFFFF;strokeColor=${stroke};strokeWidth=1.1;fontColor=${stroke};fontSize=10.5;align=center;`, x + 8, y + 8, 128, 24),
  ];
}

function note(id: string, title: string, body: string, x: number, y: number, w: number, h: number, stroke: string, fill: string): string {
  return cell(id, html(title, body), `${BOX}fillColor=${fill};strokeColor=${stroke};strokeWidth=1.2;align=left;`, x, y, w, h);
}

export function getApprovedMultiAgentSequenceBlueprintXml(): string {
  const n: string[] = ['<mxCell id="0"/>', '<mxCell id="1" parent="0"/>'];
  const e: string[] = [];

  // Publication header
  n.push(cell('title', '<b>Multi-Agent Execution Lifeline Sequence Diagram</b>', `${TEXT}fontSize=28;fontColor=#0B1830;fontStyle=1;`, 28, 18, 980, 38));
  n.push(cell('subtitle', 'UML-style governed agent orchestration: policy authorization, A2A delegation, permission-aware retrieval, approved analytics, provenance, audit context, and cited response.', `${TEXT}fontSize=13;fontColor=#526079;`, 28, 56, 1240, 34));
  n.push(cell('count', '<b>15 OF 50</b>', `${BOX}fillColor=#175CD3;strokeColor=#175CD3;fontColor=#FFFFFF;fontSize=12.5;align=center;`, 1375, 26, 92, 30));
  n.push(cell('master', '<b>MASTER BLUEPRINT</b>', `${BOX}fillColor=#FFFFFF;strokeColor=#175CD3;strokeWidth=1.4;fontColor=#175CD3;fontSize=12;align=center;`, 1482, 26, 190, 30));

  const chips = [
    ['App & Integration', 28, 150, '#EFF8FF', '#2E90FA'],
    ['Logical', 190, 105, '#F4F3FF', '#7F56D9'],
    ['Layer 4 (Application)', 310, 190, '#FFFAEB', '#F79009'],
    ['Phase 3: Target State Logical Architecture', 515, 310, '#ECFDF3', '#12B76A'],
  ] as const;
  for (const [txt, x, w, fill, stroke] of chips) n.push(cell(`chip_${x}`, `<b>${esc(txt)}</b>`, `${BOX}fillColor=${fill};strokeColor=${stroke};fontColor=#344054;fontSize=11;align=center;`, x, 92, w, 30));

  // Participants / lifelines
  n.push(...participant('user', 'User / Requestor', 'Human or calling application', X.user, '#2E90FA'));
  n.push(...participant('gemini', 'Gemini Enterprise', 'Assistant / agent experience', X.gemini, '#175CD3', ICON.agents));
  n.push(...participant('coordinator', 'Coordinator Agent', 'Intent, plan, specialist selection', X.coordinator, '#7F56D9', ICON.agents));
  n.push(...participant('gateway', 'Agent Gateway', 'Policy, identity, delegation control', X.gateway, '#D92D20', ICON.agents));
  n.push(...participant('retrieval', 'Retrieval Specialist', 'Registered agent / subagent', X.retrieval, '#0E9384', ICON.agents));
  n.push(...participant('analytics', 'Analytics Specialist', 'Registered agent / subagent', X.analytics, '#079455', ICON.agents));
  n.push(...participant('data', 'Enterprise Data & Tools', 'BigQuery, RAG corpus, APIs, connectors', X.data, '#E98317', ICON.bigquery));

  // Combined fragments communicate industry-standard control semantics.
  n.push(...fragment('retrieval_fragment', 'ref · grounded retrieval', 718, 294, 930, 250, '#0E9384', '#F0FDFA'));
  n.push(...fragment('analytics_fragment', 'ref · governed analytics', 478, 553, 1170, 206, '#175CD3', '#EFF8FF'));
  n.push(...fragment('hitl_fragment', 'opt · consequential action / low confidence', 44, 768, 1020, 104, '#D92D20', '#FFF5F5'));

  // Activation bars (execution periods)
  n.push(activation('act_gemini', X.gemini, 220, 532, '#D1E9FF', '#175CD3'));
  n.push(activation('act_coord', X.coordinator, 256, 472, '#E9D7FE', '#7F56D9'));
  n.push(activation('act_gateway', X.gateway, 294, 430, '#FEE4E2', '#D92D20'));
  n.push(activation('act_retrieval', X.retrieval, 347, 146, '#CCFBEF', '#0E9384'));
  n.push(activation('act_analytics', X.analytics, 604, 115, '#D1FADF', '#079455'));
  n.push(activation('act_data_r', X.data, 397, 47, '#FEF0C7', '#E98317'));
  n.push(activation('act_data_a', X.data, 649, 48, '#FEF0C7', '#E98317'));

  // Main 16-step sequence.
  for (const item of [
    ...message('m1', 1, X.user, X.gemini, 224, 'Submit task + user context', 'sync'),
    ...message('m2', 2, X.gemini, X.coordinator, 260, 'Invoke registered coordinator', 'sync'),
    ...message('m3', 3, X.coordinator, X.gateway, 300, 'Authorize delegation policy + scoped identity', 'control'),
    ...message('m4', 4, X.gateway, X.retrieval, 350, 'Delegate retrieval specialist [A2A if remote; local call if in-process]', 'async'),
    ...message('m5', 5, X.retrieval, X.data, 400, 'Permission-aware evidence request [connector / API / MCP tool]', 'sync'),
    ...message('m6', 6, X.data, X.retrieval, 447, 'Evidence + source provenance + access/audit context', 'return'),
    ...message('m7', 7, X.retrieval, X.gateway, 493, 'Grounded specialist result + citations + confidence signal', 'return'),
    ...message('m8', 8, X.gateway, X.coordinator, 538, 'Authorized retrieval result + policy outcome', 'return'),
    ...message('m9', 9, X.coordinator, X.gateway, 582, 'Request governed analytics task', 'control'),
    ...message('m10', 10, X.gateway, X.analytics, 608, 'Delegate analytics specialist [A2A if remote]', 'async'),
    ...message('m11', 11, X.analytics, X.data, 652, 'Execute approved BigQuery query / governed tool call', 'sync'),
    ...message('m12', 12, X.data, X.analytics, 699, 'Query result + audit context + lineage metadata', 'return'),
    ...message('m13', 13, X.analytics, X.gateway, 724, 'Validated analytics result + quality checks', 'return'),
    ...message('m14', 14, X.gateway, X.coordinator, 748, 'Return specialist results + policy decision record', 'return'),
    ...message('m15', 15, X.coordinator, X.gemini, 744, 'Compose grounded response + citations (no private chain-of-thought)', 'return'),
    ...message('m16', 16, X.gemini, X.user, 752, 'Deliver response / proposed action', 'return'),
  ]) {
    (item.startsWith('<mxCell') && item.includes(' edge="1"')) ? e.push(item) : n.push(item);
  }

  // Optional human authority path is deliberately outside the numbered baseline flow.
  e.push(pointEdge('hitl_request', 'If action is consequential: request explicit approval', X.gateway - 7, 805, X.user + 7, 805,
    'edgeStyle=none;html=1;strokeWidth=1.8;strokeColor=#D92D20;dashed=1;dashPattern=6 4;endArrow=open;endFill=0;labelBackgroundColor=#FFFFFF;fontColor=#D92D20;fontSize=10.5;fontFamily=Inter;'));
  e.push(pointEdge('hitl_return', 'Approve / Revise / Reject + reviewer identity', X.user + 7, 842, X.gateway - 7, 842,
    'edgeStyle=none;html=1;strokeWidth=1.8;strokeColor=#D92D20;endArrow=open;endFill=0;labelBackgroundColor=#FFFFFF;fontColor=#D92D20;fontSize=10.5;fontFamily=Inter;'));

  // Technical semantics and trust notes.
  n.push(note('a2a_note', 'A2A boundary', 'Use A2A only when the specialist is a separately deployed registered agent. In-process subagents can use local ADK/runtime calls.', 860, 873, 385, 64, '#0E9384', '#F0FDFA'));
  n.push(note('tool_note', 'Tool / data boundary', 'Specialists call governed tools and data sources via approved connectors/APIs/MCP. Tool calls carry scoped identity, policy context and audit metadata.', 1262, 873, 410, 64, '#E98317', '#FFFAEB'));
  n.push(note('audit_note', 'Observable by design', 'Persist decisions, selected tools/agents, policy outcomes, citations, provenance, confidence/quality signals and tool activity — never private model chain-of-thought.', 44, 889, 795, 48, '#175CD3', '#EFF8FF'));

  // Legend
  n.push(cell('legend', '', `${BOX}fillColor=#FFFFFF;strokeColor=#B8C5D6;strokeWidth=1.1;`, 44, 949, 1628, 72));
  n.push(cell('legend_title', '<b>UML / FLOW SEMANTICS</b>', `${TEXT}fontSize=11.5;fontColor=#102A56;fontStyle=1;`, 64, 967, 180, 24));
  e.push(pointEdge('lg_sync', '', 255, 977, 330, 977, 'edgeStyle=none;html=1;strokeWidth=2;strokeColor=#175CD3;endArrow=block;endFill=1;'));
  n.push(cell('lg_sync_t', 'Synchronous request / tool call', `${TEXT}fontSize=10.5;fontColor=#475467;`, 340, 964, 190, 26));
  e.push(pointEdge('lg_async', '', 540, 977, 615, 977, 'edgeStyle=none;html=1;strokeWidth=2;strokeColor=#0E9384;endArrow=open;endFill=0;'));
  n.push(cell('lg_async_t', 'Asynchronous / A2A delegation', `${TEXT}fontSize=10.5;fontColor=#475467;`, 625, 964, 205, 26));
  e.push(pointEdge('lg_ret', '', 840, 977, 915, 977, 'edgeStyle=none;html=1;strokeWidth=2;strokeColor=#475467;dashed=1;dashPattern=7 5;endArrow=open;endFill=0;'));
  n.push(cell('lg_ret_t', 'Return / evidence / response', `${TEXT}fontSize=10.5;fontColor=#475467;`, 925, 964, 190, 26));
  n.push(cell('lg_act', '', 'rounded=0;whiteSpace=wrap;html=1;fillColor=#D1E9FF;strokeColor=#175CD3;', 1130, 960, 12, 34));
  n.push(cell('lg_act_t', 'Activation / execution', `${TEXT}fontSize=10.5;fontColor=#475467;`, 1150, 964, 145, 26));
  n.push(cell('lg_frag', '<b>opt / ref</b>', `${BOX}fillColor=#FFF5F5;strokeColor=#D92D20;dashed=1;dashPattern=5 4;fontColor=#D92D20;fontSize=10;align=center;`, 1305, 961, 74, 30));
  n.push(cell('lg_frag_t', 'Combined fragment / governance branch', `${TEXT}fontSize=10.5;fontColor=#475467;`, 1388, 964, 250, 26));

  return `<mxfile host="app.diagrams.net" modified="2026-08-20T00:00:00.000Z" agent="PromptCanvas" version="24.0.0" type="device">` +
    `<diagram id="multi_agent_execution_sequence_approved" name="Multi-Agent Execution Lifeline Sequence Diagram">` +
    `<mxGraphModel dx="1740" dy="1040" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1740" pageHeight="1040" background="#FFFFFF">` +
    `<root>${n.join('\n')}${e.join('\n')}</root></mxGraphModel></diagram></mxfile>`;
}
