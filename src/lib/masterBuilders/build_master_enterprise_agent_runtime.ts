/**
 * Blueprint 19 — Enterprise Agent Runtime on Gemini Enterprise Agent Platform.
 * Phase 3.2 rebuild: current product model, explicit ingress/egress governance,
 * managed runtime state, tool interoperability, observability and human authority.
 */

const GCP = 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2048%2048%22%3E%3Cpath%20fill%3D%22%23EA4335%22%20d%3D%22M24%209.5c3.54%200%206.71%201.22%209.21%203.6l6.85-6.85C35.9%202.38%2030.47%200%2024%200%2014.62%200%206.51%205.38%202.56%2013.22l7.98%206.19C12.43%2013.72%2017.74%209.5%2024%209.5z%22%2F%3E%3Cpath%20fill%3D%22%234285F4%22%20d%3D%22M46.98%2024.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58%202.96-2.26%205.48-4.78%207.18l7.73%206c4.51-4.18%207.09-10.36%207.09-17.65z%22%2F%3E%3Cpath%20fill%3D%22%23FBBC05%22%20d%3D%22M10.53%2028.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92%2016.46%200%2020.12%200%2024c0%203.88.92%207.54%202.56%2010.78l7.97-6.19z%22%2F%3E%3Cpath%20fill%3D%22%2334A853%22%20d%3D%22M24%2048c6.48%200%2011.93-2.13%2015.89-5.81l-7.73-6c-2.15%201.45-4.92%202.3-8.16%202.3-6.26%200-11.57-4.22-13.47-9.91l-7.98%206.19C6.51%2042.62%2014.62%2048%2024%2048z%22%2F%3E%3C%2Fsvg%3E';

const ICON = {
  bigquery: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/google-bigquery/default.svg',
  gcs: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/google-cloud-storage/default.svg',
  cloudRun: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/google-cloud-run/default.svg',
  microsoft: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/microsoft/default.svg',
  salesforce: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/salesforce/default.svg',
  servicenow: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/servicenow/default.svg',
};

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const v = (id: string, value: string, style: string, x: number, y: number, w: number, h: number) =>
  `<mxCell id="${id}" value="${esc(value)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`;
const img = (id: string, url: string, x: number, y: number, w: number, h: number) =>
  v(id, '', `shape=image;imageAspect=0;aspect=fixed;image=${url};align=center;verticalAlign=middle;`, x, y, w, h);

const zone = (id: string, n: number, title: string, subtitle: string, x: number, y: number, w: number, h: number, accent: string, fill: string) => [
  v(id, '', `rounded=1;arcSize=7;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${accent};strokeWidth=1.5;`, x, y, w, h),
  v(`${id}_num`, String(n), `ellipse;whiteSpace=wrap;html=1;fillColor=${accent};strokeColor=${accent};fontColor=#FFFFFF;fontStyle=1;fontSize=13;align=center;verticalAlign=middle;`, x + 14, y + 13, 30, 30),
  v(`${id}_hdr`, `<b>${title}</b><br><span style="font-size:10px;color:#64748B">${subtitle}</span>`, 'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=3;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=13;', x + 55, y + 9, w - 70, 42),
].join('\n');

const card = (id: string, title: string, body: string, x: number, y: number, w: number, h: number, accent: string, icon = GCP, fill = '#FFFFFF') => [
  v(id, '', `rounded=1;arcSize=8;whiteSpace=wrap;html=1;overflow=hidden;spacing=6;fillColor=${fill};strokeColor=${accent};strokeWidth=1.15;`, x, y, w, h),
  v(`${id}_accent`, '', `rounded=1;arcSize=4;fillColor=${accent};strokeColor=${accent};`, x, y, 5, h),
  img(`${id}_icon`, icon, x + 15, y + Math.max(12, (h - 38) / 2), 38, 38),
  v(`${id}_txt`, `<b>${title}</b><br><span style="font-size:9.5px;color:#64748B">${body}</span>`, 'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=4;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=11.5;', x + 65, y + 7, w - 78, h - 14),
].join('\n');

const mini = (id: string, title: string, body: string, x: number, y: number, w: number, h: number, accent: string, fill = '#FFFFFF') =>
  v(id, `<b>${title}</b><br><span style="font-size:9px;color:#64748B">${body}</span>`, `rounded=1;arcSize=7;whiteSpace=wrap;html=1;overflow=hidden;spacing=6;fillColor=${fill};strokeColor=${accent};strokeWidth=1.1;fontColor=#0F172A;fontSize=10.8;align=left;verticalAlign=middle;`, x, y, w, h);

const edge = (id: string, source: string, target: string, label: string, color: string, dashed = false, exitX = 1, exitY = 0.5, entryX = 0, entryY = 0.5) =>
  `<mxCell id="${id}" value="${esc(label)}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${color};strokeWidth=1.8;${dashed ? 'dashed=1;dashPattern=6 4;' : ''}endArrow=block;endFill=1;fontSize=9.5;fontColor=#334155;labelBackgroundColor=#FFFFFF;exitX=${exitX};exitY=${exitY};entryX=${entryX};entryY=${entryY};" edge="1" parent="1" source="${source}" target="${target}"><mxGeometry relative="1" as="geometry"/></mxCell>`;

export function buildEnterpriseAgentRuntimeXml(): string {
  const c: string[] = ['<mxCell id="0"/>', '<mxCell id="1" parent="0"/>'];

  // Main production path: hosts -> governed ingress -> runtime -> governed egress -> tools/data.
  c.push(zone('hosts', 1, 'AI HOSTS & EXPERIENCES', 'Where people and applications invoke agents', 25, 25, 300, 575, '#1A73E8', '#EFF6FF'));
  c.push(card('host_ge', 'Gemini Enterprise', 'Assistant • enterprise search • Agent Gallery • Agent Designer', 45, 88, 260, 92, '#1A73E8'));
  c.push(mini('host_ge_cap', '<span style="color:#7B1FA2">Assistant-only capabilities</span>', 'Connectors • Gemini Notebook Enterprise • Skills', 45, 192, 260, 68, '#B83280', '#FDF2F8'));
  c.push(card('host_apps', 'Custom Applications', 'Web, mobile, API and operational experiences', 45, 282, 260, 82, '#1A73E8', ICON.cloudRun));
  c.push(mini('host_identity', 'User identity & context', 'SSO / OAuth / OIDC • delegated identity when required', 45, 386, 260, 72, '#1A73E8'));
  c.push(mini('host_boundary_note', 'Boundary rule', 'Skills extend the Gemini Enterprise assistant; they are not an Agent Runtime dependency and are not used inside agents.', 45, 480, 260, 92, '#B83280', '#FDF2F8'));

  c.push(zone('gateway_in', 2, 'GOVERNED INGRESS', 'Authenticate, authorize and inspect', 350, 25, 260, 575, '#D93025', '#FEF2F2'));
  c.push(card('gw_ingress', 'Agent Gateway — ingress', 'Central policy enforcement for client-to-agent traffic', 370, 92, 220, 92, '#D93025'));
  c.push(mini('gw_iap', 'Identity-Aware Proxy + IAM', 'Validate client/agent identity and enforce access policy', 370, 206, 220, 76, '#D93025'));
  c.push(mini('gw_armor', 'Model Armor', 'Optional prompt/response inspection for injection, unsafe content and sensitive-data leakage', 370, 302, 220, 92, '#D93025', '#FFF7F7'));
  c.push(mini('gw_rate', 'Traffic policy', 'Registered endpoints • authorization policies • controlled exposure', 370, 414, 220, 76, '#D93025'));
  c.push(mini('gw_audit', 'Audit decision', 'ALLOW → runtime   •   BLOCK → caller with policy outcome', 370, 510, 220, 62, '#D93025'));

  c.push(zone('platform', 3, 'GEMINI ENTERPRISE AGENT PLATFORM', 'Build, govern, run and scale production agents', 635, 25, 610, 575, '#7B61A8', '#F7F4FF'));
  c.push(v('platform_brand', '', 'rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#C9B8EA;strokeWidth=1.2;', 655, 86, 570, 88));
  c.push(img('platform_brand_logo', GCP, 674, 106, 44, 44));
  c.push(v('platform_brand_txt', '<b>Gemini Enterprise Agent Platform</b><br><span style="font-size:10px;color:#64748B">Unified agent lifecycle: Build • Scale • Govern • Optimize</span>', 'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=4;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=14;', 733, 96, 468, 68));

  c.push(mini('build_studio', 'Agent Studio', 'Low-code agent development', 655, 190, 170, 72, '#7B61A8'));
  c.push(mini('build_adk', 'Agent Development Kit', 'Code-first orchestration and tools', 837, 190, 185, 72, '#7B61A8'));
  c.push(mini('build_garden', 'Agent Garden / Models', 'Samples and Model Garden', 1034, 190, 191, 72, '#7B61A8'));

  c.push(v('runtime_bg', '', 'rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#4285F4;strokeWidth=1.6;', 655, 282, 570, 204));
  c.push(img('runtime_icon', GCP, 675, 301, 42, 42));
  c.push(v('runtime_title', '<b>Agent Runtime</b><br><span style="font-size:9.5px;color:#64748B">Fully managed deployment, operation and scaling for ADK and supported agent frameworks</span>', 'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=4;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=13;', 730, 293, 470, 58));
  c.push(mini('runtime_sessions', 'Sessions', 'Conversation interaction history and context', 675, 365, 160, 88, '#4285F4', '#EFF6FF'));
  c.push(mini('runtime_memory', 'Memory Bank', 'Long-term memory derived from sessions when configured', 847, 365, 170, 88, '#4285F4', '#EFF6FF'));
  c.push(mini('runtime_code', 'Code Execution', 'Managed isolated sandbox for agent-generated code', 1029, 365, 176, 88, '#4285F4', '#EFF6FF'));

  c.push(mini('govern_registry', 'Agent Registry', 'Central catalog for agents, tools, MCP servers and endpoints', 655, 504, 180, 72, '#0F8B82', '#ECFDF5'));
  c.push(mini('govern_identity', 'Agent Identity', 'Unique IAM identity for permissions and audit', 847, 504, 170, 72, '#0F8B82', '#ECFDF5'));
  c.push(mini('govern_eval', 'Evaluation', 'Gen AI evaluation and quality feedback', 1029, 504, 196, 72, '#0F8B82', '#ECFDF5'));

  c.push(zone('gateway_out', 4, 'GOVERNED EGRESS', 'Agent-to-tool and agent-to-agent controls', 1270, 25, 245, 575, '#0F8B82', '#ECFDF5'));
  c.push(card('gw_egress', 'Agent Gateway — egress', 'Central route for governed outbound agent communications', 1290, 92, 205, 92, '#0F8B82'));
  c.push(mini('gw_allow', 'Registry allowlist', 'Unregistered destinations are denied by policy', 1290, 206, 205, 76, '#0F8B82'));
  c.push(mini('gw_auth', 'Agent Identity + IAM', 'Fine-grained authorization to registered tools and agents', 1290, 302, 205, 88, '#0F8B82'));
  c.push(mini('gw_ma_out', 'Model Armor', 'Optional inspection of agent-to-tool/model/MCP requests and responses', 1290, 410, 205, 92, '#0F8B82'));
  c.push(mini('gw_proto', 'Protocols', 'HTTPS APIs • MCP • A2A where supported by the target', 1290, 522, 205, 50, '#0F8B82'));

  c.push(zone('tools', 5, 'TOOLS, AGENTS & ENTERPRISE DATA', 'Authorized destinations, not implicit access', 1540, 25, 195, 575, '#E87900', '#FFF7ED'));
  c.push(mini('tool_mcp', 'Remote MCP servers', 'Cloud Run or approved remote servers', 1558, 88, 159, 76, '#E87900'));
  c.push(mini('tool_a2a', 'A2A agents', 'Registered peer agents with explicit identity', 1558, 180, 159, 72, '#E87900'));
  c.push(card('tool_bq', 'BigQuery', 'Governed analytical access', 1558, 268, 159, 70, '#E87900', ICON.bigquery));
  c.push(card('tool_gcs', 'Cloud Storage', 'Documents and object content', 1558, 352, 159, 70, '#E87900', ICON.gcs));
  c.push(v('tool_saas_bg', '', 'rounded=1;arcSize=7;fillColor=#FFFFFF;strokeColor=#E87900;strokeWidth=1.1;', 1558, 438, 159, 114));
  c.push(img('tool_ms', ICON.microsoft, 1572, 454, 30, 30));
  c.push(img('tool_sf', ICON.salesforce, 1613, 454, 35, 30));
  c.push(img('tool_sn', ICON.servicenow, 1658, 454, 32, 30));
  c.push(v('tool_saas_txt', '<b>Enterprise SaaS / APIs</b><br><span style="font-size:9px;color:#64748B">Microsoft • Salesforce • ServiceNow • custom APIs</span>', 'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=4;align=center;verticalAlign=middle;fontColor=#0F172A;fontSize=10.5;', 1568, 491, 139, 50));

  // Primary production path — deliberately routed through numbered zones.
  c.push(edge('e_host_ingress', 'host_ge', 'gw_ingress', 'invoke', '#2563EB'));
  c.push(edge('e_ingress_runtime', 'gw_ingress', 'runtime_bg', 'authorized request', '#2563EB'));
  c.push(edge('e_runtime_egress', 'runtime_bg', 'gw_egress', 'tool / agent call', '#0F8B82'));
  c.push(edge('e_egress_tools', 'gw_egress', 'tool_mcp', 'allowed destination', '#0F8B82'));
  c.push(edge('e_apps_ingress', 'host_apps', 'gw_ingress', 'API request', '#2563EB'));
  c.push(edge('e_tools_return', 'tool_bq', 'gw_egress', 'result', '#64748B', true, 0, 0.5, 1, 0.5));
  c.push(edge('e_egress_return', 'gw_egress', 'runtime_bg', 'normalized response', '#64748B', true, 0, 0.65, 1, 0.65));
  c.push(edge('e_runtime_return', 'runtime_bg', 'gw_ingress', 'agent response', '#64748B', true, 0, 0.68, 1, 0.68));
  c.push(edge('e_ingress_return', 'gw_ingress', 'host_ge', 'response', '#64748B', true, 0, 0.68, 1, 0.68));

  // Lifecycle path inside platform, visually separate from request path.
  c.push(edge('e_build_runtime', 'build_adk', 'runtime_bg', 'deploy', '#7B61A8', true, 0.5, 1, 0.5, 0));
  c.push(edge('e_runtime_registry', 'runtime_bg', 'govern_registry', 'auto-register / govern', '#0F8B82', true, 0.25, 1, 0.5, 0));

  // Operations / safety foundation.
  c.push(zone('ops', 6, 'OPERATE, OBSERVE & AUTHORIZE', 'Cross-cutting runtime controls and evidence', 25, 625, 1710, 310, '#334155', '#F8FAFC'));
  c.push(card('ops_obs', 'Agent Observability', 'Agent/MCP health, OpenTelemetry traces, Cloud Logging and Trace', 50, 694, 315, 86, '#334155'));
  c.push(card('ops_eval', 'Quality & Evaluation', 'Gen AI evaluation, grounded quality signals and regression checks', 385, 694, 315, 86, '#334155'));
  c.push(card('ops_security', 'Security & Data Protection', 'IAM • VPC Service Controls where supported • CMEK / residency options • audit evidence', 720, 694, 315, 86, '#334155'));
  c.push(card('ops_hitl', 'Human Authority', 'Require review/approval before consequential or high-risk external actions', 1055, 694, 315, 86, '#D93025', GCP, '#FFF7F7'));
  c.push(card('ops_sre', 'SRE & Capacity', 'Scaling, latency, quotas, failure handling, rollback and incident ownership', 1390, 694, 315, 86, '#334155'));

  c.push(v('flow_legend', '<b>FLOW SEMANTICS</b>   <span style="color:#2563EB">━━ request</span>   <span style="color:#64748B">┄┄ response</span>   <span style="color:#7B61A8">┄┄ lifecycle/deploy</span>   <span style="color:#0F8B82">━━ governed tool/agent call</span>', 'rounded=1;arcSize=7;whiteSpace=wrap;html=1;overflow=hidden;spacing=6;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;fontColor=#334155;fontSize=10.5;align=center;verticalAlign=middle;', 50, 806, 790, 48));
  c.push(v('tech_note', '<b>TECHNICAL BOUNDARY:</b> Agent Gateway is the policy enforcement path; Agent Registry/Identity determine what agents and destinations are known and authorized. Gemini Enterprise connectors and Skills are not silently inherited by a custom Agent Runtime.', 'rounded=1;arcSize=7;whiteSpace=wrap;html=1;overflow=hidden;spacing=7;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;fontColor=#475569;fontSize=10.5;align=left;verticalAlign=middle;', 860, 806, 845, 48));
  c.push(v('success', '<b>PRODUCTION OUTCOME</b><br><span style="font-size:10px;color:#64748B">Identity-aware agents • controlled ingress/egress • explicit tool authorization • managed session/memory • observable behavior • auditable human control</span>', 'rounded=1;arcSize=7;whiteSpace=wrap;html=1;overflow=hidden;spacing=7;fillColor=#ECFDF5;strokeColor=#0F8B82;strokeWidth=1.2;fontColor=#0F172A;fontSize=11.5;align=center;verticalAlign=middle;', 50, 874, 1655, 42));

  return `<mxfile host="app.diagrams.net" modified="2026-08-20T00:00:00.000Z" agent="PromptCanvas" version="24.0.0" type="device"><diagram id="enterprise_agent_runtime_platform" name="Enterprise Agent Runtime on Gemini Enterprise Agent Platform"><mxGraphModel dx="1760" dy="980" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1760" pageHeight="960" background="#FFFFFF" math="0" shadow="0"><root>${c.join('\n')}</root></mxGraphModel></diagram></mxfile>`;
}
