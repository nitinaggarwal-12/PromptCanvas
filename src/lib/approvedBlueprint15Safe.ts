// Blueprint 15 — exact native reconstruction of the user-approved reference page.
// Multi-Agent Execution Lifeline Sequence Diagram
// Self-contained mxGraph XML: editable nodes/edges, inline SVG icons, UML lifelines,
// activation bars, ref/alt fragments, HITL outcomes, governance notes and legend.

type DiagramParts = { nodes: string[]; edges: string[] };
type MessageKind = 'sync' | 'async' | 'return' | 'policyReturn';

function esc(value: unknown): string {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function safeValue(value: unknown): string {
  const raw = String(value ?? '');
  if (raw.includes('&lt;') || raw.includes('&#')) return raw;
  return esc(raw).replace(/\n/g, '&lt;br&gt;');
}

function svgData(svg: string): string {
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

const ICON = {
  user: svgData('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><g fill="none" stroke="#175CD3" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><circle cx="32" cy="18" r="10"/><path d="M13 54c1-14 8-21 19-21s18 7 19 21z"/></g></svg>'),
  gemini: svgData('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path fill="#175CD3" d="M32 5c3 14 10 21 27 27-17 6-24 13-27 27-3-14-10-21-27-27C22 26 29 19 32 5z"/><circle cx="52" cy="12" r="3" fill="#53B1FD"/><circle cx="11" cy="50" r="3" fill="#53B1FD"/></svg>'),
  coordinator: svgData('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><g fill="#F4EBFF" stroke="#7F56D9" stroke-width="3"><circle cx="32" cy="15" r="8"/><circle cx="14" cy="42" r="8"/><circle cx="50" cy="42" r="8"/><circle cx="32" cy="48" r="8"/></g><g stroke="#7F56D9" stroke-width="3" fill="none"><path d="M28 22 18 35M36 22l10 13M21 43h22M32 40V23"/></g></svg>'),
  gateway: svgData('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M32 5 52 13v16c0 13-8 23-20 30C20 52 12 42 12 29V13z" fill="#FFF1F0" stroke="#D92D20" stroke-width="4"/><path d="M32 20v18M25 29h14" stroke="#D92D20" stroke-width="4" stroke-linecap="round"/></svg>'),
  retrieval: svgData('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><g fill="none" stroke="#0E9384" stroke-width="5" stroke-linecap="round"><circle cx="27" cy="27" r="16"/><path d="m39 39 17 17"/></g><circle cx="27" cy="27" r="5" fill="#CCFBEF"/></svg>'),
  analytics: svgData('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><g fill="none" stroke="#0E9384" stroke-width="4"><path d="M9 55h48"/><rect x="13" y="34" width="8" height="21" rx="1"/><rect x="28" y="23" width="8" height="32" rx="1"/><rect x="43" y="10" width="8" height="45" rx="1"/></g></svg>'),
  data: svgData('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><g fill="#FFF7E8" stroke="#E98317" stroke-width="3"><ellipse cx="25" cy="13" rx="17" ry="8"/><path d="M8 13v30c0 5 8 8 17 8s17-3 17-8V13"/><path d="M8 27c0 5 8 8 17 8s17-3 17-8M8 40c0 5 8 8 17 8s17-3 17-8"/><path d="M46 29h12v21H46z"/></g><path d="m49 39 3 3 5-7" stroke="#E98317" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>'),
  eye: svgData('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M5 32s9-17 27-17 27 17 27 17-9 17-27 17S5 32 5 32z" fill="none" stroke="#175CD3" stroke-width="4"/><circle cx="32" cy="32" r="8" fill="none" stroke="#175CD3" stroke-width="4"/></svg>'),
  a2a: svgData('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><g fill="#ECFDF3" stroke="#0E9384" stroke-width="3"><circle cx="12" cy="34" r="7"/><circle cx="32" cy="12" r="7"/><circle cx="52" cy="34" r="7"/><circle cx="32" cy="52" r="7"/></g><g stroke="#0E9384" stroke-width="3"><path d="m17 29 10-12M37 17l10 12M45 39 37 48M27 48l-8-9"/></g></svg>'),
  gear: svgData('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="m32 6 5 4 6-2 4 6 6 1v8l5 4-3 6 3 6-5 4v8l-6 1-4 6-6-2-5 4-5-4-6 2-4-6-6-1v-8l-5-4 3-6-3-6 5-4v-8l6-1 4-6 6 2z" fill="#F2F4F7" stroke="#344054" stroke-width="3"/><circle cx="32" cy="32" r="10" fill="none" stroke="#344054" stroke-width="3"/></svg>'),
} as const;

const BOX = 'rounded=1;arcSize=10;whiteSpace=wrap;html=1;verticalAlign=middle;fontFamily=Inter;';
const TEXT = 'text;html=1;strokeColor=none;fillColor=none;fontFamily=Inter;verticalAlign=middle;';

function cell(id: string, value: unknown, style: string, x: number, y: number, w: number, h: number): string {
  return `<mxCell id="${id}" value="${safeValue(value)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`;
}

function imageCell(id: string, url: string, x: number, y: number, w: number, h: number): string {
  return cell(id, '', `shape=image;imageAspect=0;aspect=fixed;image=${url};strokeColor=none;fillColor=none;`, x, y, w, h);
}

function lineEdge(id: string, x1: number, y1: number, x2: number, y2: number, color: string, width: number, dashed: boolean, arrow: string, arrowFill: boolean): string {
  return `<mxCell id="${id}" value="" style="edgeStyle=none;html=1;strokeColor=${color};strokeWidth=${width};${dashed ? 'dashed=1;dashPattern=7 5;' : ''}endArrow=${arrow};endFill=${arrowFill ? '1' : '0'};" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="${x1}" y="${y1}" as="sourcePoint"/><mxPoint x="${x2}" y="${y2}" as="targetPoint"/></mxGeometry></mxCell>`;
}

function rich(title: string, body: string, titleColor = '#101828', bodyColor = '#475467', titleSize = 12.5, bodySize = 10.2): string {
  return `&lt;div style=&quot;font-family:Inter,Arial,sans-serif;&quot;&gt;` +
    `&lt;div style=&quot;font-weight:800;font-size:${titleSize}px;color:${titleColor};line-height:1.15;&quot;&gt;${esc(title)}&lt;/div&gt;` +
    (body ? `&lt;div style=&quot;margin-top:4px;font-size:${bodySize}px;color:${bodyColor};line-height:1.25;&quot;&gt;${esc(body)}&lt;/div&gt;` : '') +
    `&lt;/div&gt;`;
}

function badge(id: string, value: string, x: number, y: number, w: number, h: number, fill: string, stroke: string, color: string, fontSize = 11.5): string {
  return cell(id, value, `${BOX}fillColor=${fill};strokeColor=${stroke};strokeWidth=1.3;fontColor=${color};fontStyle=1;fontSize=${fontSize};align=center;spacing=4;`, x, y, w, h);
}

function participant(id: string, x: number, w: number, title: string, subtitle: string, color: string, icon: string): string[] {
  return [
    cell(`${id}_card`, '', `${BOX}fillColor=#FFFFFF;strokeColor=${color};strokeWidth=1.5;shadow=0;`, x, 140, w, 70),
    imageCell(`${id}_icon`, icon, x + 13, 154, 38, 38),
    cell(`${id}_text`, rich(title, subtitle), `${TEXT}align=left;spacing=0;overflow=hidden;`, x + 58, 148, w - 68, 52),
  ];
}

function lifeline(id: string, x: number, color: string): string {
  return cell(id, '', `shape=line;html=1;strokeColor=${color};strokeWidth=1.2;dashed=1;dashPattern=5 5;opacity=70;`, x, 210, 1, 620);
}

function activation(id: string, x: number, y: number, h: number, fill: string, stroke: string): string {
  return cell(id, '', `rounded=0;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${stroke};strokeWidth=1.2;`, x - 5, y, 10, h);
}

function step(id: string, n: number, x: number, y: number, fill: string): string {
  return cell(id, String(n), `ellipse;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${fill};fontColor=#FFFFFF;fontStyle=1;fontSize=11;align=center;verticalAlign=middle;`, x, y - 11, 22, 22);
}

function message(parts: DiagramParts, id: string, n: number, fromX: number, toX: number, y: number, label: string, kind: MessageKind, color: string, labelX: number, labelY: number, labelW: number, labelH: number): void {
  const forward = toX >= fromX;
  const sx = fromX + (forward ? 7 : -7);
  const tx = toX + (forward ? -7 : 7);
  const dashed = kind === 'return' || kind === 'policyReturn';
  const arrow = kind === 'sync' ? 'block' : 'open';
  const fillArrow = kind === 'sync';
  parts.edges.push(lineEdge(`${id}_edge`, sx, y, tx, y, color, 2, dashed, arrow, fillArrow));
  parts.nodes.push(step(`${id}_step`, n, Math.min(fromX, toX) + 15, y, color));
  parts.nodes.push(cell(`${id}_label`, label, `${TEXT}align=center;fontSize=10.1;fontColor=#344054;whiteSpace=wrap;overflow=hidden;fillColor=#FFFFFF;opacity=96;`, labelX, labelY, labelW, labelH));
}

function frame(id: string, tag: string, x: number, y: number, w: number, h: number, stroke: string, fill: string): string[] {
  return [
    cell(id, '', `rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=${fill};opacity=18;strokeColor=${stroke};strokeWidth=1.3;dashed=1;dashPattern=6 4;`, x, y, w, h),
    badge(`${id}_tag`, tag, x + 8, y + 5, 152, 25, '#FFFFFF', stroke, stroke, 10.5),
  ];
}

function note(id: string, icon: string, title: string, body: string, x: number, y: number, w: number, stroke: string, fill: string, titleColor: string): string[] {
  return [
    cell(`${id}_box`, '', `${BOX}fillColor=${fill};strokeColor=${stroke};strokeWidth=1.25;`, x, y, w, 104),
    imageCell(`${id}_icon`, icon, x + 16, y + 18, 42, 42),
    cell(`${id}_text`, rich(title, body, titleColor), `${TEXT}align=left;whiteSpace=wrap;overflow=hidden;`, x + 70, y + 12, w - 82, 82),
  ];
}

export function getApprovedMultiAgentSequenceBlueprintXml(): string {
  const p: DiagramParts = { nodes: ['<mxCell id="0"/>', '<mxCell id="1" parent="0"/>'], edges: [] };

  // ===== PAGE HEADER — exact approved composition =====
  p.nodes.push(cell('bp_badge', '&lt;div style=&quot;font-size:22px;font-weight:900;line-height:1.05;&quot;&gt;15 OF 50&lt;/div&gt;&lt;div style=&quot;margin-top:6px;font-size:9px;font-weight:800;letter-spacing:2px;&quot;&gt;BLUEPRINT&lt;/div&gt;', `${BOX}fillColor=#175CD3;strokeColor=#175CD3;fontColor=#FFFFFF;align=center;spacing=4;`, 18, 22, 132, 60));
  p.nodes.push(badge('bp_code', 'P3-APP-L-10', 18, 92, 112, 28, '#FFFFFF', '#53B1FD', '#175CD3', 11.5));

  p.nodes.push(cell('title', '&lt;b&gt;Multi-Agent Execution Lifeline Sequence Diagram&lt;/b&gt;', `${TEXT}align=center;fontSize=31;fontColor=#0B1830;fontStyle=1;`, 305, 19, 910, 42));
  p.nodes.push(cell('subtitle', 'Micro Dynamic UML sequence diagram modeling end-user requests, agent orchestration, confidence gating, and HITL review.', `${TEXT}align=center;fontSize=13.2;fontColor=#526079;`, 330, 60, 860, 24));
  p.nodes.push(badge('master', 'MASTER BLUEPRINT', 1320, 23, 198, 38, '#FFFFFF', '#175CD3', '#175CD3', 12));

  p.nodes.push(badge('phase_chip', '✣  Phase 3: Target State Logical Architecture', 300, 92, 318, 28, '#EFF8FF', '#53B1FD', '#175CD3', 11));
  p.nodes.push(badge('abs_chip', '◉  ABSTRACTION: Logical', 628, 92, 207, 28, '#F9F5FF', '#B692F6', '#6941C6', 11));
  p.nodes.push(badge('layer_chip', '▣  LAYER: Layer 4 (Application)', 846, 92, 231, 28, '#FFFAEB', '#FEC84B', '#B54708', 11));
  p.nodes.push(badge('domain_chip', '▤  App & Integration', 1088, 92, 143, 28, '#F0FDF9', '#5FE9D0', '#0E9384', 11));

  // ===== PARTICIPANTS / LIFELINES =====
  const C = {
    blue: '#175CD3',
    purple: '#7F56D9',
    red: '#D92D20',
    teal: '#0E9384',
    orange: '#E98317',
    gray: '#344054',
  } as const;
  const X = {
    user: 82,
    gemini: 277,
    coordinator: 497,
    gateway: 715,
    retrieval: 975,
    analytics: 1167,
    data: 1396,
  } as const;

  p.nodes.push(...participant('user', 18, 180, 'User / Requestor', 'Human or calling application', C.blue, ICON.user));
  p.nodes.push(...participant('gemini', 225, 188, 'Gemini Enterprise', 'Assistant / agent experience', C.blue, ICON.gemini));
  p.nodes.push(...participant('coordinator', 442, 190, 'Coordinator Agent', 'Intent, plan, specialist selection', C.purple, ICON.coordinator));
  p.nodes.push(...participant('gateway', 661, 190, 'Agent Gateway', 'Policy, identity, delegation control', C.red, ICON.gateway));
  p.nodes.push(...participant('retrieval', 882, 183, 'Retrieval Specialist', 'Registered agent / subagent', C.teal, ICON.retrieval));
  p.nodes.push(...participant('analytics', 1087, 184, 'Analytics Specialist', 'Registered agent / subagent', C.teal, ICON.analytics));
  p.nodes.push(...participant('data', 1295, 222, 'Enterprise Data & Tools', 'BigQuery, RAG corpus, APIs, approved connectors', C.orange, ICON.data));

  p.nodes.push(lifeline('life_user', X.user, '#84ADFF'));
  p.nodes.push(lifeline('life_gemini', X.gemini, '#84ADFF'));
  p.nodes.push(lifeline('life_coord', X.coordinator, '#B692F6'));
  p.nodes.push(lifeline('life_gateway', X.gateway, '#FDA29B'));
  p.nodes.push(lifeline('life_retrieval', X.retrieval, '#5FE9D0'));
  p.nodes.push(lifeline('life_analytics', X.analytics, '#5FE9D0'));
  p.nodes.push(lifeline('life_data', X.data, '#FEC84B'));

  // UML combined fragments drawn behind all message arrows.
  p.nodes.push(...frame('retrieval_ref', 'ref:  grounded retrieval', 508, 382, 912, 126, C.teal, '#F0FDFA'));
  p.nodes.push(...frame('analytics_ref', 'ref:  governed analytics', 508, 555, 912, 112, C.teal, '#F0FDFA'));
  p.nodes.push(...frame('hitl_alt', 'alt:  HITL review (if action is consequential)', 430, 713, 718, 108, C.orange, '#FFF9F0'));

  // Activation bars.
  p.nodes.push(activation('act_gemini', X.gemini, 230, 574, '#D1E9FF', C.blue));
  p.nodes.push(activation('act_coord', X.coordinator, 263, 459, '#E9D7FE', C.purple));
  p.nodes.push(activation('act_gateway', X.gateway, 304, 408, '#FEE4E2', C.red));
  p.nodes.push(activation('act_retrieval', X.retrieval, 376, 115, '#CCFBEF', C.teal));
  p.nodes.push(activation('act_analytics', X.analytics, 565, 100, '#CCFBEF', C.teal));
  p.nodes.push(activation('act_data_r', X.data, 406, 62, '#FEF0C7', C.orange));
  p.nodes.push(activation('act_data_a', X.data, 592, 60, '#FEF0C7', C.orange));

  // ===== 16-STEP EXECUTION FLOW =====
  message(p, 'm1', 1, X.user, X.gemini, 236, 'Submit task + user context', 'sync', C.blue, 104, 213, 170, 30);
  message(p, 'm2', 2, X.gemini, X.coordinator, 268, 'Invoke registered coordinator', 'sync', C.blue, 304, 244, 178, 32);
  message(p, 'm3', 3, X.coordinator, X.gateway, 305, 'Request authorization / delegation policy', 'sync', C.purple, 523, 280, 184, 34);
  message(p, 'm4', 4, X.gateway, X.coordinator, 338, 'Authorize scoped identity and policy constraints', 'policyReturn', '#C4320A', 516, 312, 190, 36);
  message(p, 'm5', 5, X.gateway, X.retrieval, 378, 'Delegate retrieval specialist\n(A2A if remote; local call if in-process)', 'async', '#C4320A', 746, 347, 210, 42);
  message(p, 'm6', 6, X.retrieval, X.data, 414, 'Request permission-aware evidence\n(approved connector / API / MCP tool)', 'sync', C.teal, 1000, 385, 284, 42);
  message(p, 'm7', 7, X.data, X.retrieval, 452, 'Evidence + source provenance +\naccess / audit context', 'return', C.orange, 1008, 425, 262, 40);
  message(p, 'm8', 8, X.retrieval, X.gateway, 489, 'Grounded specialist result +\ncitations + confidence signal', 'return', C.teal, 760, 462, 202, 40);
  message(p, 'm9', 9, X.coordinator, X.gateway, 530, 'Request governed analytics\ntask through gateway', 'sync', C.purple, 516, 504, 190, 38);
  message(p, 'm10', 10, X.gateway, X.analytics, 564, 'Delegate analytics specialist\n(A2A if remote; local call if in-process)', 'async', '#C4320A', 770, 536, 262, 40);
  message(p, 'm11', 11, X.analytics, X.data, 602, 'Execute approved analytical query /\ngoverned tool call', 'sync', C.teal, 1180, 574, 202, 40);
  message(p, 'm12', 12, X.data, X.analytics, 640, 'Query result + audit context +\nlineage metadata', 'return', C.orange, 1180, 614, 200, 38);
  message(p, 'm13', 13, X.analytics, X.gateway, 676, 'Validated analytics result +\nquality checks', 'return', C.teal, 830, 649, 218, 38);
  message(p, 'm14', 14, X.gateway, X.coordinator, 708, 'Return validated specialist results + policy decision record; coordinator composes grounded response + citations\n(no private chain-of-thought exposed)', 'return', C.purple, 500, 674, 240, 46);

  // HITL: explicit conditional review with three auditable outcomes.
  p.nodes.push(step('m15_step', 15, 786, 742, '#E64A19'));
  p.nodes.push(cell('m15_label', 'Route through HITL review / approval', `${TEXT}align=center;fontSize=10.3;fontColor=#344054;`, 806, 726, 215, 28));
  p.edges.push(lineEdge('hitl_bus', 586, 758, 1044, 758, '#C4320A', 1.8, false, 'none', false));
  p.edges.push(lineEdge('hitl_approve_drop', 602, 758, 602, 780, '#C4320A', 1.6, false, 'open', false));
  p.edges.push(lineEdge('hitl_reject_drop', 754, 758, 754, 780, '#C4320A', 1.6, false, 'open', false));
  p.edges.push(lineEdge('hitl_revise_drop', 914, 758, 914, 780, '#C4320A', 1.6, false, 'open', false));

  p.nodes.push(cell('approve_box', '', `${BOX}fillColor=#FFFFFF;strokeColor=#FDB022;strokeWidth=1.1;`, 500, 776, 168, 38));
  p.nodes.push(cell('approve_icon', '✓', 'ellipse;whiteSpace=wrap;html=1;fillColor=#ECFDF3;strokeColor=#12B76A;strokeWidth=1.3;fontColor=#039855;fontStyle=1;fontSize=18;align=center;verticalAlign=middle;', 513, 783, 25, 25));
  p.nodes.push(cell('approve_text', rich('Approve', 'Proceed', '#101828', '#667085', 11.5, 9.5), `${TEXT}align=left;`, 547, 779, 105, 31));

  p.nodes.push(cell('reject_box', '', `${BOX}fillColor=#FFFFFF;strokeColor=#FDB022;strokeWidth=1.1;`, 670, 776, 168, 38));
  p.nodes.push(cell('reject_icon', '×', 'ellipse;whiteSpace=wrap;html=1;fillColor=#FFF1F0;strokeColor=#F04438;strokeWidth=1.3;fontColor=#D92D20;fontStyle=1;fontSize=18;align=center;verticalAlign=middle;', 683, 783, 25, 25));
  p.nodes.push(cell('reject_text', rich('Reject', 'Stop / notify', '#101828', '#667085', 11.5, 9.5), `${TEXT}align=left;`, 717, 779, 105, 31));

  p.nodes.push(cell('revise_box', '', `${BOX}fillColor=#FFFFFF;strokeColor=#FDB022;strokeWidth=1.1;`, 840, 776, 170, 38));
  p.nodes.push(cell('revise_icon', '✎', 'ellipse;whiteSpace=wrap;html=1;fillColor=#FFF9EB;strokeColor=#F79009;strokeWidth=1.3;fontColor=#B54708;fontStyle=1;fontSize=16;align=center;verticalAlign=middle;', 853, 783, 25, 25));
  p.nodes.push(cell('revise_text', rich('Revise', 'Update / refine', '#101828', '#667085', 11.5, 9.5), `${TEXT}align=left;`, 887, 779, 108, 31));

  // Final response after normal or approved HITL path.
  message(p, 'm16', 16, X.gemini, X.user, 808, 'Deliver final cited response /\nproposed action to user', 'return', C.blue, 110, 779, 170, 38);

  // ===== TECHNICAL / GOVERNANCE SEMANTICS =====
  p.nodes.push(...note('observability', ICON.eye, 'Observability by design', 'Persist decisions, selected tools/agents, policy outcomes, citations, provenance, confidence/quality signals and tool activity — never private model chain-of-thought.', 28, 836, 330, C.blue, '#F8FAFF', C.blue));
  p.nodes.push(...note('a2a', ICON.a2a, 'A2A boundary', 'Use A2A only when the specialist is a separately deployed registered agent. In-process subagents can use local ADK/runtime calls.', 378, 836, 330, C.teal, '#F6FEFC', C.teal));
  p.nodes.push(...note('tool', ICON.data, 'Tool / data boundary', 'Specialists call governed tools and data sources via approved connectors/APIs/MCP. Tool calls carry scoped identity, policy context and audit metadata.', 728, 836, 350, C.orange, '#FFFBF2', '#B54708'));
  p.nodes.push(...note('governance', ICON.gear, 'Security & governance', 'All actions are identity-scoped, policy-checked, and audit-logged. Evidence and results carry provenance and lineage for compliance and explainability.', 1098, 836, 410, '#667085', '#F9FAFB', '#344054'));

  // ===== LEGEND — exact semantics visible at normal zoom =====
  p.nodes.push(cell('legend_shell', '', `${BOX}fillColor=#FFFFFF;strokeColor=#98A2B3;strokeWidth=1.15;`, 18, 960, 1500, 52));
  p.nodes.push(cell('legend_title', '&lt;b&gt;LEGEND&lt;/b&gt;', `${TEXT}align=center;fontSize=15;fontColor=#101828;fontStyle=1;`, 30, 970, 90, 30));
  p.edges.push(lineEdge('legend_sync', 146, 982, 205, 982, C.blue, 2, false, 'block', true));
  p.nodes.push(cell('legend_sync_text', 'Synchronous call\n(Request / Delegation)', `${TEXT}fontSize=9.4;fontColor=#344054;align=left;`, 214, 966, 128, 34));
  p.edges.push(lineEdge('legend_return', 350, 982, 409, 982, C.blue, 2, true, 'open', false));
  p.nodes.push(cell('legend_return_text', 'Return / Response\n(Success)', `${TEXT}fontSize=9.4;fontColor=#344054;align=left;`, 418, 966, 112, 34));
  p.edges.push(lineEdge('legend_alt', 542, 982, 601, 982, '#E64A19', 2, true, 'open', false));
  p.nodes.push(cell('legend_alt_text', 'Alternative / Optional\n(ALT / HITL branch)', `${TEXT}fontSize=9.4;fontColor=#344054;align=left;`, 610, 966, 130, 34));
  p.nodes.push(cell('legend_frame', '', 'rounded=1;arcSize=4;whiteSpace=wrap;html=1;fillColor=#F0FDFA;opacity=25;strokeColor=#0E9384;strokeWidth=1.2;dashed=1;dashPattern=6 4;', 750, 970, 67, 28));
  p.nodes.push(cell('legend_frame_text', 'UML Fragment\n(ref)', `${TEXT}fontSize=9.4;fontColor=#344054;align=left;`, 827, 966, 85, 34));
  p.nodes.push(cell('legend_activation', '', 'rounded=0;whiteSpace=wrap;html=1;fillColor=#D1E9FF;strokeColor=#175CD3;strokeWidth=1;', 925, 971, 10, 27));
  p.nodes.push(cell('legend_activation_text', 'Activation\n(Processing)', `${TEXT}fontSize=9.4;fontColor=#344054;align=left;`, 945, 966, 85, 34));
  p.nodes.push(cell('legend_order', '#', 'ellipse;whiteSpace=wrap;html=1;fillColor=#344054;strokeColor=#344054;fontColor=#FFFFFF;fontStyle=1;fontSize=13;align=center;verticalAlign=middle;', 1044, 972, 25, 25));
  p.nodes.push(cell('legend_order_text', 'Interaction\nSequence Order', `${TEXT}fontSize=9.4;fontColor=#344054;align=left;`, 1078, 966, 94, 34));
  p.nodes.push(cell('legend_defs', 'A2A = Agent-to-Agent\nMCP = Model Context Protocol', `${TEXT}fontSize=9.4;fontColor=#344054;align=left;`, 1210, 966, 235, 34));

  return `<mxfile host="app.diagrams.net" modified="2026-08-20T13:06:00.000Z" agent="PromptCanvas" version="24.0.0" type="device"><diagram id="multi_agent_execution_sequence" name="Multi-Agent Execution Lifeline Sequence Diagram"><mxGraphModel dx="1536" dy="1024" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1536" pageHeight="1024" background="#FFFFFF"><root>${p.nodes.join('\n')}${p.edges.join('\n')}</root></mxGraphModel></diagram></mxfile>`;
}
