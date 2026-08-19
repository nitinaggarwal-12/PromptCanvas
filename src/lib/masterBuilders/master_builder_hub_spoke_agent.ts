/**
 * Blueprint 8 — Governed Hub-and-Spoke Multi-Agent Architecture.
 * Phase 3.2 rebuild aligned to Gemini Enterprise Agent Platform.
 */

const GCP = 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2048%2048%22%3E%3Cpath%20fill%3D%22%23EA4335%22%20d%3D%22M24%209.5c3.54%200%206.71%201.22%209.21%203.6l6.85-6.85C35.9%202.38%2030.47%200%2024%200%2014.62%200%206.51%205.38%202.56%2013.22l7.98%206.19C12.43%2013.72%2017.74%209.5%2024%209.5z%22%2F%3E%3Cpath%20fill%3D%22%234285F4%22%20d%3D%22M46.98%2024.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58%202.96-2.26%205.48-4.78%207.18l7.73%206c4.51-4.18%207.09-10.36%207.09-17.65z%22%2F%3E%3Cpath%20fill%3D%22%23FBBC05%22%20d%3D%22M10.53%2028.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92%2016.46%200%2020.12%200%2024c0%203.88.92%207.54%202.56%2010.78l7.97-6.19z%22%2F%3E%3Cpath%20fill%3D%22%2334A853%22%20d%3D%22M24%2048c6.48%200%2011.93-2.13%2015.89-5.81l-7.73-6c-2.15%201.45-4.92%202.3-8.16%202.3-6.26%200-11.57-4.22-13.47-9.91l-7.98%206.19C6.51%2042.62%2014.62%2048%2024%2048z%22%2F%3E%3C%2Fsvg%3E';
const ICON = {
  bigquery: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/google-bigquery/default.svg',
  gcs: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/google-cloud-storage/default.svg',
  salesforce: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/salesforce/default.svg',
  sap: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/sap/default.svg',
  servicenow: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/servicenow/default.svg',
};

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const v = (id: string, value: string, style: string, x: number, y: number, w: number, h: number) =>
  `<mxCell id="${id}" value="${esc(value)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`;
const img = (id: string, url: string, x: number, y: number, w: number, h: number) =>
  v(id, '', `shape=image;imageAspect=0;aspect=fixed;image=${url};align=center;verticalAlign=middle;`, x, y, w, h);
const zone = (id: string, n: number, title: string, sub: string, x: number, y: number, w: number, h: number, accent: string, fill: string) => [
  v(id, '', `rounded=1;arcSize=7;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${accent};strokeWidth=1.5;`, x, y, w, h),
  v(`${id}_n`, String(n), `ellipse;whiteSpace=wrap;html=1;fillColor=${accent};strokeColor=${accent};fontColor=#FFFFFF;fontStyle=1;fontSize=13;align=center;verticalAlign=middle;`, x + 14, y + 13, 30, 30),
  v(`${id}_h`, `<b>${title}</b><br><span style="font-size:9.5px;color:#64748B">${sub}</span>`, 'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=3;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=12.5;', x + 54, y + 8, w - 66, 43),
].join('\n');
const card = (id: string, title: string, body: string, x: number, y: number, w: number, h: number, accent: string, icon = GCP, fill = '#FFFFFF') => [
  v(id, '', `rounded=1;arcSize=8;whiteSpace=wrap;html=1;overflow=hidden;fillColor=${fill};strokeColor=${accent};strokeWidth=1.15;`, x, y, w, h),
  v(`${id}_bar`, '', `rounded=1;arcSize=4;fillColor=${accent};strokeColor=${accent};`, x, y, 5, h),
  img(`${id}_i`, icon, x + 14, y + Math.max(10, (h - 36) / 2), 36, 36),
  v(`${id}_t`, `<b>${title}</b><br><span style="font-size:9.3px;color:#64748B">${body}</span>`, 'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=4;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=11.2;', x + 60, y + 6, w - 70, h - 12),
].join('\n');
const mini = (id: string, title: string, body: string, x: number, y: number, w: number, h: number, accent: string, fill = '#FFFFFF') =>
  v(id, `<b>${title}</b><br><span style="font-size:9px;color:#64748B">${body}</span>`, `rounded=1;arcSize=7;whiteSpace=wrap;html=1;overflow=hidden;spacing=6;fillColor=${fill};strokeColor=${accent};strokeWidth=1.05;fontColor=#0F172A;fontSize=10.7;align=left;verticalAlign=middle;`, x, y, w, h);
const edge = (id: string, s: string, t: string, label: string, color: string, dashed = false, exitX = 1, exitY = .5, entryX = 0, entryY = .5) =>
  `<mxCell id="${id}" value="${esc(label)}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${color};strokeWidth=1.8;${dashed ? 'dashed=1;dashPattern=6 4;' : ''}endArrow=block;endFill=1;fontSize=9.3;fontColor=#334155;labelBackgroundColor=#FFFFFF;exitX=${exitX};exitY=${exitY};entryX=${entryX};entryY=${entryY};" edge="1" parent="1" source="${s}" target="${t}"><mxGeometry relative="1" as="geometry"/></mxCell>`;

export function buildHubAndSpokeAgentConfigXml(): string {
  const c: string[] = ['<mxCell id="0"/>', '<mxCell id="1" parent="0"/>'];

  c.push(zone('host', 1, 'HOST & INVOCATION', 'Entry points to the governed agent system', 25, 25, 280, 610, '#1A73E8', '#EFF6FF'));
  c.push(card('host_ge', 'Gemini Enterprise', 'Agent Gallery / Agent Designer for employee-facing agent experiences', 45, 88, 240, 88, '#1A73E8'));
  c.push(mini('host_ge_context', 'Enterprise grounding', 'Gemini Enterprise connectors can provide permissions-aware enterprise context to the Gemini Enterprise experience.', 45, 196, 240, 104, '#1A73E8'));
  c.push(card('host_api', 'Custom application / API', 'Domain app invoking the coordinator through a governed production endpoint', 45, 324, 240, 82, '#1A73E8'));
  c.push(mini('host_boundary', 'Capability boundary', 'Skills are assistant instructions—not subagents. Multi-agent orchestration uses agents/subagents and registered tools.', 45, 430, 240, 108, '#B83280', '#FDF2F8'));
  c.push(mini('host_identity', 'Caller identity', 'SSO / application identity / delegated user context as required by the action', 45, 558, 240, 52, '#1A73E8'));

  c.push(zone('hub', 2, 'COORDINATOR / HUB', 'One accountable orchestrator decomposes and delegates work', 335, 25, 495, 610, '#7B61A8', '#F7F4FF'));
  c.push(v('hub_shell', '', 'rounded=1;arcSize=10;fillColor=#FFFFFF;strokeColor=#7B61A8;strokeWidth=1.7;', 365, 95, 435, 330));
  c.push(img('hub_logo', GCP, 390, 118, 50, 50));
  c.push(v('hub_title', '<b>Coordinator Agent</b><br><span style="font-size:10px;color:#64748B">ADK / supported framework on Agent Runtime</span>', 'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=4;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=14;', 458, 110, 315, 66));
  c.push(mini('hub_plan', 'Task decomposition & routing', 'Classify intent • choose specialist • define expected result contract', 390, 198, 360, 66, '#7B61A8'));
  c.push(mini('hub_state', 'Sessions & shared context', 'Maintain request/session state; pass only the context each specialist needs', 390, 282, 172, 94, '#7B61A8', '#FAF7FF'));
  c.push(mini('hub_policy', 'Delegation policy', 'Allowed agents • tools • timeouts • retries • confidence/escalation rules', 578, 282, 172, 94, '#7B61A8', '#FAF7FF'));
  c.push(mini('hub_compose', 'Result composition', 'Validate specialist outputs, resolve conflicts and build the user-facing response', 390, 392, 360, 62, '#7B61A8'));
  c.push(mini('hub_registry', 'Agent Registry + Agent Identity', 'Coordinator and remote specialists are discoverable and auditable principals', 365, 480, 435, 64, '#0F8B82', '#ECFDF5'));
  c.push(mini('hub_protocol', 'Delegation mode', 'In-process ADK subagents for local composition; A2A for registered remote agents when needed.', 365, 562, 435, 48, '#0F8B82', '#ECFDF5'));

  c.push(zone('control', 3, 'AGENT COMMUNICATION CONTROL', 'Policy enforcement between hub, spokes and tools', 855, 25, 255, 610, '#D93025', '#FEF2F2'));
  c.push(card('gateway', 'Agent Gateway', 'Govern agent-to-agent and agent-to-tool communications', 875, 92, 215, 90, '#D93025'));
  c.push(mini('control_identity', 'IAM / Agent Identity', 'Explicit authorization for each registered destination', 875, 205, 215, 78, '#D93025'));
  c.push(mini('control_armor', 'Model Armor', 'Optional screening of agent communications and tool/MCP payloads', 875, 305, 215, 92, '#D93025', '#FFF7F7'));
  c.push(mini('control_registry', 'Registry allowlist', 'Agents, tools, endpoints and MCP servers must be intentionally registered', 875, 419, 215, 82, '#D93025'));
  c.push(mini('control_fail', 'Failure policy', 'Timeout • retry budget • circuit-break/escalate • never silently fan out forever', 875, 523, 215, 84, '#D93025'));

  c.push(zone('spokes', 4, 'SPECIALIST SPOKES', 'Bounded responsibility, dedicated policy and evidence', 1135, 25, 600, 610, '#0F8B82', '#ECFDF5'));
  c.push(card('spoke_support', 'Customer Support Agent', 'Ticket triage • case summary • approved service actions', 1158, 88, 260, 98, '#0F8B82', ICON.servicenow));
  c.push(card('spoke_data', 'Data Analyst Agent', 'Governed SQL/analytics • evidence-backed calculations', 1440, 88, 270, 98, '#0F8B82', ICON.bigquery));
  c.push(card('spoke_fulfill', 'Fulfillment Agent', 'Order/supply workflow • bounded ERP operations', 1158, 212, 260, 98, '#0F8B82', ICON.sap));
  c.push(card('spoke_sales', 'Commercial Agent', 'CRM context • account tasks • controlled customer actions', 1440, 212, 270, 98, '#0F8B82', ICON.salesforce));
  c.push(mini('spoke_contract', 'Specialist contract', 'Each spoke declares purpose, accepted input, output schema, allowed tools/data and escalation conditions.', 1158, 338, 552, 74, '#0F8B82'));
  c.push(mini('spoke_context', 'Least-context delegation', 'Coordinator sends only the task-relevant context; specialists do not inherit unrestricted enterprise access.', 1158, 432, 552, 74, '#0F8B82'));
  c.push(mini('spoke_remote', 'Remote-agent interoperability', 'Use A2A for separately deployed registered agents; keep local subagents in-process when a network hop adds no value.', 1158, 526, 552, 76, '#0F8B82'));

  // Request/delegation paths.
  c.push(edge('e_host_hub', 'host_ge', 'hub_shell', 'invoke coordinator', '#2563EB'));
  c.push(edge('e_api_hub', 'host_api', 'hub_shell', 'invoke coordinator', '#2563EB'));
  c.push(edge('e_hub_gateway', 'hub_shell', 'gateway', 'delegate / tool call', '#7B61A8'));
  c.push(edge('e_gw_support', 'gateway', 'spoke_support', 'authorized task', '#0F8B82'));
  c.push(edge('e_gw_data', 'gateway', 'spoke_data', 'authorized task', '#0F8B82'));
  c.push(edge('e_gw_fulfill', 'gateway', 'spoke_fulfill', 'authorized task', '#0F8B82'));
  c.push(edge('e_gw_sales', 'gateway', 'spoke_sales', 'authorized task', '#0F8B82'));
  c.push(edge('e_support_return', 'spoke_support', 'gateway', 'result', '#64748B', true, 0, .7, 1, .7));
  c.push(edge('e_data_return', 'spoke_data', 'gateway', 'result', '#64748B', true, 0, .7, 1, .7));
  c.push(edge('e_gateway_hub_return', 'gateway', 'hub_compose', 'specialist results', '#64748B', true, 0, .65, 1, .65));
  c.push(edge('e_hub_host_return', 'hub_compose', 'host_ge', 'composed response', '#64748B', true, 0, .65, 1, .65));

  c.push(zone('ops', 5, 'TOOLS, HUMAN AUTHORITY & OPERATIONS', 'No specialist receives implicit power', 25, 665, 1710, 255, '#334155', '#F8FAFC'));
  c.push(card('ops_tools', 'Registered tools & MCP', 'Per-agent allowlists, endpoint registration and credential/identity boundaries', 50, 730, 315, 86, '#334155'));
  c.push(card('ops_human', 'Human approval / escalation', 'Require explicit approval before high-impact, irreversible or regulated actions', 385, 730, 315, 86, '#D93025', GCP, '#FFF7F7'));
  c.push(card('ops_obs', 'Agent Observability', 'Trace delegation tree • latency • failures • tool calls • specialist outcomes', 720, 730, 315, 86, '#334155'));
  c.push(card('ops_eval', 'Evaluation', 'Coordinator quality • routing accuracy • specialist task success • regression tests', 1055, 730, 315, 86, '#334155'));
  c.push(card('ops_sre', 'Reliability & cost', 'Concurrency • recursion/delegation limits • retry budgets • quotas • spend attribution', 1390, 730, 315, 86, '#334155'));

  c.push(v('legend', '<b>FLOW</b>   <span style="color:#2563EB">━━ user/app request</span>   <span style="color:#7B61A8">━━ delegation</span>   <span style="color:#0F8B82">━━ governed spoke call</span>   <span style="color:#64748B">┄┄ result/response</span>', 'rounded=1;arcSize=6;whiteSpace=wrap;html=1;overflow=hidden;spacing=5;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;fontColor=#334155;fontSize=10;align=center;verticalAlign=middle;', 50, 842, 780, 42));
  c.push(v('boundary', '<b>MULTI-AGENT RULE:</b> Prefer a small number of bounded specialists with explicit contracts. Add a remote A2A spoke only when independent deployment, ownership or scaling justifies it. Skills remain an assistant capability and are not modeled as subagents.', 'rounded=1;arcSize=6;whiteSpace=wrap;html=1;overflow=hidden;spacing=6;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;fontColor=#475569;fontSize=10;align=left;verticalAlign=middle;', 850, 842, 855, 42));

  return `<mxfile host="app.diagrams.net" modified="2026-08-20T00:00:00.000Z" agent="PromptCanvas" version="24.0.0" type="device"><diagram id="hub_and_spoke_agent_config" name="Governed Hub-and-Spoke Multi-Agent Architecture"><mxGraphModel dx="1760" dy="960" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1760" pageHeight="950" background="#FFFFFF"><root>${c.join('\n')}</root></mxGraphModel></diagram></mxfile>`;
}
