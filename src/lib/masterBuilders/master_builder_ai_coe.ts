/**
 * Blueprint 34 — Gemini Enterprise AI Center of Excellence Operating Model.
 * Phase 3.2 rebuild: capability portfolio, agent engineering, connector governance,
 * adoption/value flywheel, and explicit product-boundary/maturity controls.
 */

const GCP = 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2048%2048%22%3E%3Cpath%20fill%3D%22%23EA4335%22%20d%3D%22M24%209.5c3.54%200%206.71%201.22%209.21%203.6l6.85-6.85C35.9%202.38%2030.47%200%2024%200%2014.62%200%206.51%205.38%202.56%2013.22l7.98%206.19C12.43%2013.72%2017.74%209.5%2024%209.5z%22%2F%3E%3Cpath%20fill%3D%22%234285F4%22%20d%3D%22M46.98%2024.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58%202.96-2.26%205.48-4.78%207.18l7.73%206c4.51-4.18%207.09-10.36%207.09-17.65z%22%2F%3E%3Cpath%20fill%3D%22%23FBBC05%22%20d%3D%22M10.53%2028.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92%2016.46%200%2020.12%200%2024c0%203.88.92%207.54%202.56%2010.78l7.97-6.19z%22%2F%3E%3Cpath%20fill%3D%22%2334A853%22%20d%3D%22M24%2048c6.48%200%2011.93-2.13%2015.89-5.81l-7.73-6c-2.15%201.45-4.92%202.3-8.16%202.3-6.26%200-11.57-4.22-13.47-9.91l-7.98%206.19C6.51%2042.62%2014.62%2048%2024%2048z%22%2F%3E%3C%2Fsvg%3E';
const ICON = {
  microsoft: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/microsoft/default.svg',
  salesforce: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/salesforce/default.svg',
  servicenow: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/servicenow/default.svg',
  atlassian: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/atlassian/default.svg',
};
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const v = (id: string, value: string, style: string, x: number, y: number, w: number, h: number) => `<mxCell id="${id}" value="${esc(value)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`;
const img = (id: string, url: string, x: number, y: number, w: number, h: number) => v(id, '', `shape=image;imageAspect=0;aspect=fixed;image=${url};align=center;verticalAlign=middle;`, x, y, w, h);
const section = (id: string, n: number, title: string, sub: string, x: number, y: number, w: number, h: number, accent: string, fill: string) => [
  v(id, '', `rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${accent};strokeWidth=1.5;`, x, y, w, h),
  v(`${id}_n`, String(n), `ellipse;whiteSpace=wrap;html=1;fillColor=${accent};strokeColor=${accent};fontColor=#FFFFFF;fontStyle=1;fontSize=13;align=center;verticalAlign=middle;`, x + 14, y + 13, 30, 30),
  v(`${id}_h`, `<b>${title}</b><br><span style="font-size:9.5px;color:#64748B">${sub}</span>`, 'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=3;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=12.5;', x + 54, y + 8, w - 68, 44),
].join('\n');
const card = (id: string, title: string, body: string, x: number, y: number, w: number, h: number, accent: string, fill = '#FFFFFF') => v(id, `<b>${title}</b><br><span style="font-size:9.2px;color:#64748B">${body}</span>`, `rounded=1;arcSize=7;whiteSpace=wrap;html=1;overflow=hidden;spacing=6;fillColor=${fill};strokeColor=${accent};strokeWidth=1.05;fontColor=#0F172A;fontSize=10.9;align=left;verticalAlign=middle;`, x, y, w, h);
const edge = (id: string, s: string, t: string, label: string, color: string, dashed = false, exitX = 1, exitY = .5, entryX = 0, entryY = .5) => `<mxCell id="${id}" value="${esc(label)}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${color};strokeWidth=1.6;${dashed ? 'dashed=1;dashPattern=6 4;' : ''}endArrow=block;endFill=1;fontSize=9;fontColor=#334155;labelBackgroundColor=#FFFFFF;exitX=${exitX};exitY=${exitY};entryX=${entryX};entryY=${entryY};" edge="1" parent="1" source="${s}" target="${t}"><mxGeometry relative="1" as="geometry"/></mxCell>`;

export function buildPristineAiCoeXml(): string {
  const c: string[] = ['<mxCell id="0"/>', '<mxCell id="1" parent="0"/>'];

  // Top outcome banner.
  c.push(v('outcome', '<b>AI CoE MISSION</b>   Turn Gemini Enterprise capabilities into governed, adopted, measurable business outcomes—without confusing assistant features, employee-made agents, custom Agent Platform workloads, or connector control paths.', 'rounded=1;arcSize=7;whiteSpace=wrap;html=1;overflow=hidden;spacing=7;fillColor=#F8FBFF;strokeColor=#8AB4F8;strokeWidth=1.2;fontColor=#334155;fontSize=11;align=center;verticalAlign=middle;', 25, 20, 1710, 46));

  c.push(section('strategy', 1, 'STRATEGY & DEMAND', 'Choose outcomes before technology', 25, 90, 270, 610, '#1A73E8', '#EFF6FF'));
  c.push(card('northstar', 'North-star outcomes', 'Business value • employee experience • risk posture • operational efficiency', 45, 155, 230, 78, '#1A73E8'));
  c.push(card('intake', 'Use-case intake', 'Persona • job-to-be-done • frequency • data • action • expected outcome • owner', 45, 252, 230, 88, '#1A73E8'));
  c.push(card('readiness', 'Readiness assessment', 'Data/connectors • security • governance • integration • change readiness • technical dependencies', 45, 359, 230, 96, '#1A73E8'));
  c.push(card('prioritize', 'Portfolio prioritization', 'Value × feasibility × risk × time-to-learning; stop weak ideas early', 45, 474, 230, 80, '#1A73E8'));
  c.push(card('owners', 'Outcome ownership', 'Business sponsor • product owner • technical owner • adoption owner • risk owner', 45, 573, 230, 92, '#1A73E8'));

  c.push(section('experience', 2, 'GEMINI ENTERPRISE EXPERIENCE PORTFOLIO', 'Select the right end-user capability', 320, 90, 405, 610, '#B83280', '#FDF2F8'));
  c.push(card('assistant', 'Assistant & enterprise search', 'One-off/open-ended work grounded in connected enterprise/public data', 340, 155, 365, 72, '#B83280'));
  c.push(card('notebook', 'Gemini Notebook Enterprise', 'Curated-source research, synthesis, Q&A and reusable project/topic knowledge', 340, 245, 365, 72, '#B83280'));
  c.push(card('skills', 'Skills', 'Reusable assistant instructions for recurring domain tasks; separate from agent workflows', 340, 335, 365, 82, '#B83280', '#FFF7FC'));
  c.push(card('agent_designer', 'Agent Gallery & Agent Designer', 'Discover agents; create no-code/low-code single- or multi-step employee agents', 340, 435, 365, 82, '#B83280'));
  c.push(card('capability_rule', 'Selection rule', 'Assistant = one-off • Skill = repeatable instructions • Agent = autonomous/multistep process. Skills are not available for use with agents.', 340, 535, 365, 126, '#D93025', '#FFF7F7'));

  c.push(section('engineering', 3, 'CUSTOM AGENT ENGINEERING', 'Production agent lifecycle on Agent Platform', 750, 90, 405, 610, '#7B61A8', '#F7F4FF'));
  c.push(card('build', 'Build', 'Agent Studio • ADK • Agent Garden • Model Garden • approved frameworks', 770, 155, 365, 76, '#7B61A8'));
  c.push(card('scale', 'Scale', 'Agent Runtime • Sessions • Memory Bank • Code Execution where needed', 770, 249, 365, 76, '#7B61A8'));
  c.push(card('govern', 'Govern', 'Agent Registry • Agent Identity • Agent Gateway • Model Armor • policy/audit', 770, 343, 365, 84, '#7B61A8'));
  c.push(card('interop', 'Interoperate', 'MCP for tools/context • A2A for remote agent collaboration • explicit registered endpoints', 770, 445, 365, 84, '#7B61A8'));
  c.push(card('optimize', 'Optimize', 'Gen AI evaluation • Agent Observability • quality regression • SRE/capacity/cost', 770, 547, 365, 88, '#7B61A8'));

  c.push(section('connect', 4, 'DATA, CONNECTORS & TOOL ACCESS', 'Permissions and launch-stage aware integration', 1180, 90, 555, 610, '#0F8B82', '#ECFDF5'));
  c.push(v('vendor_strip', '', 'rounded=1;arcSize=7;fillColor=#FFFFFF;strokeColor=#A7D8D2;strokeWidth=1.05;', 1200, 155, 515, 92));
  c.push(img('ms', ICON.microsoft, 1220, 178, 40, 40));
  c.push(img('sf', ICON.salesforce, 1285, 178, 44, 40));
  c.push(img('sn', ICON.servicenow, 1355, 178, 42, 40));
  c.push(img('atl', ICON.atlassian, 1425, 178, 42, 40));
  c.push(img('gcp', GCP, 1495, 178, 42, 40));
  c.push(v('vendor_text', '<b>Connector ecosystem</b><br><span style="font-size:9px;color:#64748B">Microsoft 365 • Salesforce • ServiceNow • Jira/Confluence • Google/Cloud data • others by edition and launch stage</span>', 'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=3;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=10.5;', 1550, 164, 150, 72));
  c.push(card('connector_factory', 'Connector factory', 'Standard connector first • custom connector when needed • ACL/identity mapping • sync/federation choice • monitoring', 1200, 270, 515, 88, '#0F8B82'));
  c.push(card('mcp_paths', 'Two MCP governance paths', 'Agent Platform: Agent Gateway can govern registered MCP egress. Gemini Enterprise custom-MCP data-store traffic follows the connector path—do not assume Gateway policies apply.', 1200, 378, 515, 112, '#D93025', '#FFF7F7'));
  c.push(card('maturity', 'Feature maturity gate', 'Validate edition • region • preview/allowlist/GA status • connector mode • actions • quotas before committing to delivery dates.', 1200, 510, 515, 88, '#E87900', '#FFF7ED'));
  c.push(card('access', 'Identity & data access', 'SSO • permissions-aware retrieval • least privilege • data ownership • retention/residency • audit evidence', 1200, 618, 515, 56, '#0F8B82'));

  // Operating model + adoption/value flywheel.
  c.push(section('operating', 5, 'OPERATING MODEL, GOVERNANCE & ADOPTION', 'Decision rights plus a path out of the CoE', 25, 730, 1710, 205, '#334155', '#F8FAFC'));
  c.push(card('governance_board', 'Governance & architecture', 'Security • privacy • legal/regulatory • data • responsible AI • architecture review proportional to risk', 50, 795, 300, 88, '#334155'));
  c.push(card('enablement', 'Enablement & champions', 'Role-based training • office hours • Community of Practice • champions • reusable patterns', 370, 795, 285, 88, '#334155'));
  c.push(card('product_loop', 'Product / feature loop', 'Track blockers, connector maturity, preview features and enhancement requests with Product/AI specialists', 675, 795, 300, 88, '#334155'));
  c.push(card('value', 'Value realization', 'Activation • active usage • task success • quality • cycle-time impact • user satisfaction • validated business value', 995, 795, 300, 88, '#334155'));
  c.push(card('handoff', 'Exit & handoff', 'Graduate repeatable operations to product/platform owners, support, training or delivery teams; CoE retains standards and portfolio governance.', 1315, 795, 395, 88, '#334155'));

  // Lightweight flywheel connectors across the operating row.
  c.push(edge('f1', 'northstar', 'assistant', 'select capability', '#2563EB'));
  c.push(edge('f2', 'readiness', 'connector_factory', 'data / integration readiness', '#0F8B82', true));
  c.push(edge('f3', 'agent_designer', 'governance_board', 'govern by risk', '#D93025', true, .5, 1, .5, 0));
  c.push(edge('f4', 'optimize', 'value', 'quality + telemetry', '#7B61A8', true, .5, 1, .5, 0));
  c.push(edge('f5', 'enablement', 'value', 'adoption', '#334155'));
  c.push(edge('f6', 'value', 'handoff', 'scale / operationalize', '#334155'));

  c.push(v('footer', '<b>COE DECISION PRINCIPLE:</b> Do not force every use case into an agent. Start with the lightest capability that achieves the outcome, preserve the product boundary, validate current feature maturity, and only introduce custom Agent Platform engineering when autonomy, integration or production requirements justify it.', 'rounded=1;arcSize=6;whiteSpace=wrap;html=1;overflow=hidden;spacing=6;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;fontColor=#475569;fontSize=10.3;align=center;verticalAlign=middle;', 25, 950, 1710, 42));

  return `<mxfile host="app.diagrams.net" modified="2026-08-20T00:00:00.000Z" agent="PromptCanvas" version="24.0.0" type="device"><diagram id="ai_coe_operating_model" name="Gemini Enterprise AI Center of Excellence Operating Model"><mxGraphModel dx="1760" dy="1000" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1760" pageHeight="1010" background="#FFFFFF"><root>${c.join('\n')}</root></mxGraphModel></diagram></mxfile>`;
}
