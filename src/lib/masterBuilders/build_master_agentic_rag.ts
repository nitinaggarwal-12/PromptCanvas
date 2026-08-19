/**
 * Blueprint 7 — Production Agentic RAG on Google Cloud.
 * Phase 3.2 rebuild: separates query runtime from ingestion/indexing, uses current
 * Gemini Enterprise Agent Platform grounding services, and makes safety/evaluation
 * and source attribution explicit without exposing model chain-of-thought.
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
const zone = (id: string, n: number, title: string, sub: string, x: number, y: number, w: number, h: number, accent: string, fill: string) => [
  v(id, '', `rounded=1;arcSize=7;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${accent};strokeWidth=1.5;`, x, y, w, h),
  v(`${id}_n`, String(n), `ellipse;whiteSpace=wrap;html=1;fillColor=${accent};strokeColor=${accent};fontColor=#FFFFFF;fontStyle=1;fontSize=13;align=center;verticalAlign=middle;`, x + 14, y + 13, 30, 30),
  v(`${id}_h`, `<b>${title}</b><br><span style="font-size:9.5px;color:#64748B">${sub}</span>`, 'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=3;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=12.5;', x + 54, y + 8, w - 66, 43),
].join('\n');
const card = (id: string, title: string, body: string, x: number, y: number, w: number, h: number, accent: string, icon = GCP, fill = '#FFFFFF') => [
  v(id, '', `rounded=1;arcSize=8;whiteSpace=wrap;html=1;overflow=hidden;spacing=6;fillColor=${fill};strokeColor=${accent};strokeWidth=1.15;`, x, y, w, h),
  v(`${id}_bar`, '', `rounded=1;arcSize=4;fillColor=${accent};strokeColor=${accent};`, x, y, 5, h),
  img(`${id}_i`, icon, x + 13, y + Math.max(10, (h - 36) / 2), 36, 36),
  v(`${id}_t`, `<b>${title}</b><br><span style="font-size:9.3px;color:#64748B">${body}</span>`, 'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=4;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=11.3;', x + 60, y + 6, w - 70, h - 12),
].join('\n');
const mini = (id: string, title: string, body: string, x: number, y: number, w: number, h: number, accent: string, fill = '#FFFFFF') =>
  v(id, `<b>${title}</b><br><span style="font-size:9px;color:#64748B">${body}</span>`, `rounded=1;arcSize=7;whiteSpace=wrap;html=1;overflow=hidden;spacing=6;fillColor=${fill};strokeColor=${accent};strokeWidth=1.05;fontColor=#0F172A;fontSize=10.7;align=left;verticalAlign=middle;`, x, y, w, h);
const edge = (id: string, s: string, t: string, label: string, color: string, dashed = false, exitX = 1, exitY = .5, entryX = 0, entryY = .5) =>
  `<mxCell id="${id}" value="${esc(label)}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${color};strokeWidth=1.8;${dashed ? 'dashed=1;dashPattern=6 4;' : ''}endArrow=block;endFill=1;fontSize=9.3;fontColor=#334155;labelBackgroundColor=#FFFFFF;exitX=${exitX};exitY=${exitY};entryX=${entryX};entryY=${entryY};" edge="1" parent="1" source="${s}" target="${t}"><mxGeometry relative="1" as="geometry"/></mxCell>`;

export function buildAgenticRagWidescreenXml(): string {
  const c: string[] = ['<mxCell id="0"/>', '<mxCell id="1" parent="0"/>'];

  // Runtime/query lane.
  c.push(zone('experience', 1, 'EXPERIENCE & QUERY', 'Permissions-aware user or application request', 25, 25, 275, 570, '#1A73E8', '#EFF6FF'));
  c.push(card('ge_app', 'Gemini Enterprise', 'Assistant/search experience; enterprise connectors when this is the chosen host', 45, 88, 235, 92, '#1A73E8'));
  c.push(card('custom_app', 'Custom AI Application', 'Web, API or domain copilot invoking a custom agent', 45, 202, 235, 82, '#1A73E8', ICON.cloudRun));
  c.push(mini('query_context', 'Request context', 'User identity • conversation/session • task intent • authorization context', 45, 308, 235, 82, '#1A73E8'));
  c.push(mini('ge_boundary', 'Gemini Enterprise boundary', 'Connectors ground Gemini Enterprise experiences. Skills extend the assistant and are not part of an agent workflow.', 45, 416, 235, 116, '#B83280', '#FDF2F8'));

  c.push(zone('trust', 2, 'INGRESS TRUST GATE', 'Security before reasoning', 325, 25, 245, 570, '#D93025', '#FEF2F2'));
  c.push(card('agent_gateway', 'Agent Gateway', 'Governed client-to-agent path for registered production agents', 345, 92, 205, 90, '#D93025'));
  c.push(mini('identity', 'Identity & authorization', 'IAM / Agent Identity / application identity as applicable', 345, 205, 205, 78, '#D93025'));
  c.push(mini('model_armor_in', 'Model Armor', 'Optional prompt screening for injection, unsafe content and sensitive-data leakage', 345, 305, 205, 98, '#D93025', '#FFF7F7'));
  c.push(mini('request_policy', 'Request policy', 'Rate/abuse controls • project/location policy • audit context', 345, 425, 205, 72, '#D93025'));
  c.push(mini('deny_path', 'Denied request', 'Policy violation ends the flow before the agent or retrieval plane.', 345, 519, 205, 50, '#D93025'));

  c.push(zone('agent', 3, 'AGENTIC REASONING', 'Policy-constrained planning and orchestration', 595, 25, 405, 570, '#7B61A8', '#F7F4FF'));
  c.push(v('runtime_shell', '', 'rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#7B61A8;strokeWidth=1.5;', 615, 86, 365, 420));
  c.push(img('runtime_logo', GCP, 632, 102, 42, 42));
  c.push(v('runtime_hdr', '<b>Agent Runtime</b><br><span style="font-size:9.5px;color:#64748B">Gemini Enterprise Agent Platform • ADK or supported framework</span>', 'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=4;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=12.5;', 686, 94, 275, 58));
  c.push(mini('agent_router', 'Planner / Router', 'Select retrieval, approved tools or delegated agents based on task and policy', 635, 169, 325, 74, '#7B61A8'));
  c.push(mini('agent_model', 'Gemini model', 'Approved model configuration • structured output • function/tool calling', 635, 259, 155, 88, '#7B61A8', '#FAF7FF'));
  c.push(mini('agent_state', 'Sessions & Memory', 'Managed session context; Memory Bank only when intentionally configured', 805, 259, 155, 88, '#7B61A8', '#FAF7FF'));
  c.push(mini('agent_policy', 'Tool & retrieval policy', 'Which corpus, tool or remote agent can be called for this request', 635, 363, 325, 72, '#7B61A8'));
  c.push(mini('reasoning_note', 'Design principle', 'Expose decisions, sources and tool activity—not private chain-of-thought.', 635, 451, 325, 42, '#0F8B82', '#ECFDF5'));
  c.push(mini('agent_registry', 'Agent Registry + Agent Identity', 'Discover governed agents/tools and establish auditable principal identity', 615, 522, 365, 50, '#0F8B82', '#ECFDF5'));

  c.push(zone('retrieval', 4, 'GROUNDING & RETRIEVAL', 'Retrieve evidence before generation', 1025, 25, 405, 570, '#0F8B82', '#ECFDF5'));
  c.push(card('rag_engine', 'RAG Engine', 'Configurable managed RAG over your corpus; retrieval source for grounded generation', 1045, 88, 365, 86, '#0F8B82'));
  c.push(mini('agent_search', 'Agent Search', 'Alternative managed search grounding over an Agent Search data store', 1045, 190, 175, 84, '#0F8B82'));
  c.push(mini('vector_search', 'Vector Search', 'High-performance vector retrieval when the architecture uses a vector index', 1235, 190, 175, 84, '#0F8B82'));
  c.push(mini('retrieval_pipeline', 'Retrieval pipeline', 'Query transform → search → rank/filter → permission-aware context assembly', 1045, 292, 365, 74, '#0F8B82'));
  c.push(mini('ground_check', 'Grounding verification', 'Check grounding / evidence validation where required before release', 1045, 384, 365, 68, '#0F8B82'));
  c.push(mini('citations', 'Source attribution', 'Return supporting passages, document IDs/links and provenance with the answer', 1045, 470, 365, 74, '#0F8B82', '#F0FDFA'));

  c.push(zone('actions', 5, 'TOOLS, ACTIONS & RESPONSE', 'Act only through governed interfaces', 1455, 25, 280, 570, '#E87900', '#FFF7ED'));
  c.push(mini('tool_gateway', 'Agent Gateway — egress', 'Govern calls to registered APIs, MCP servers and A2A agents', 1475, 88, 240, 82, '#E87900'));
  c.push(mini('mcp_tools', 'MCP / API tools', 'Registered remote MCP servers • enterprise APIs • Google Cloud APIs', 1475, 190, 240, 82, '#E87900'));
  c.push(mini('a2a_agents', 'A2A agents', 'Delegated specialist agents with identity and authorization', 1475, 292, 240, 72, '#E87900'));
  c.push(mini('human_gate', 'Human approval gate', 'Required before consequential actions when policy/risk demands human authority', 1475, 384, 240, 86, '#D93025', '#FFF7F7'));
  c.push(mini('response_gate', 'Response quality gate', 'Grounding result • citations • safety verdict • structured response contract', 1475, 490, 240, 72, '#E87900'));

  // Primary request/retrieval/response flow.
  c.push(edge('q1', 'ge_app', 'agent_gateway', 'query', '#2563EB'));
  c.push(edge('q1b', 'custom_app', 'agent_gateway', 'query', '#2563EB'));
  c.push(edge('q2', 'agent_gateway', 'runtime_shell', 'authorized request', '#2563EB'));
  c.push(edge('q3', 'agent_router', 'rag_engine', 'retrieve evidence', '#0F8B82'));
  c.push(edge('q3b', 'agent_router', 'agent_search', 'alternative grounding', '#0F8B82', true));
  c.push(edge('q4', 'citations', 'agent_model', 'grounded context + provenance', '#0F8B82', true, 0, .5, 1, .5));
  c.push(edge('q5', 'agent_router', 'tool_gateway', 'approved action/tool call', '#E87900'));
  c.push(edge('q6', 'response_gate', 'agent_gateway', 'grounded response', '#64748B', true, 0, .65, 1, .65));
  c.push(edge('q7', 'agent_gateway', 'ge_app', 'answer + citations', '#64748B', true, 0, .7, 1, .7));

  // Separate data-ingestion/indexing lane.
  c.push(zone('ingest', 6, 'KNOWLEDGE INGESTION & INDEXING', 'Asynchronous content lifecycle—separate from query runtime', 25, 625, 1125, 280, '#6554C0', '#F5F3FF'));
  c.push(v('sources_bg', '', 'rounded=1;arcSize=7;fillColor=#FFFFFF;strokeColor=#B8A7DE;strokeWidth=1.1;', 50, 690, 310, 132));
  c.push(img('src_ms', ICON.microsoft, 70, 710, 36, 36));
  c.push(img('src_sf', ICON.salesforce, 120, 710, 40, 36));
  c.push(img('src_sn', ICON.servicenow, 174, 710, 38, 36));
  c.push(img('src_gcs', ICON.gcs, 228, 710, 38, 36));
  c.push(img('src_bq', ICON.bigquery, 282, 710, 38, 36));
  c.push(v('sources_txt', '<b>Enterprise knowledge sources</b><br><span style="font-size:9.3px;color:#64748B">Microsoft 365 • Salesforce • ServiceNow • Cloud Storage • BigQuery • approved repositories</span>', 'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=4;align=center;verticalAlign=middle;fontColor=#0F172A;fontSize=11;', 65, 755, 280, 54));

  c.push(mini('parse', 'Parse & normalize', 'Layout-aware parsing • metadata • document identity • content normalization', 390, 690, 210, 132, '#6554C0'));
  c.push(mini('chunk', 'Chunk & enrich', 'Semantic chunking • metadata enrichment • ACL/security attributes', 625, 690, 210, 132, '#6554C0'));
  c.push(mini('index', 'Embed & index', 'RAG corpus / Agent Search data store / Vector Search index based on selected pattern', 860, 690, 265, 132, '#6554C0'));
  c.push(edge('i1', 'sources_bg', 'parse', 'content + metadata', '#6554C0'));
  c.push(edge('i2', 'parse', 'chunk', 'normalized documents', '#6554C0'));
  c.push(edge('i3', 'chunk', 'index', 'chunks + ACL metadata', '#6554C0'));
  c.push(edge('i4', 'index', 'rag_engine', 'corpus/index refresh', '#6554C0', true, .5, 0, .5, 1));

  // Trust / operations rail.
  c.push(zone('operate', 7, 'TRUST, EVALUATION & OPERATIONS', 'Controls that qualify the system for production', 1175, 625, 560, 280, '#334155', '#F8FAFC'));
  c.push(mini('obs', 'Agent Observability', 'Tracing • latency • tool calls • retrieval performance • errors', 1200, 690, 240, 82, '#334155'));
  c.push(mini('eval', 'Gen AI Evaluation', 'Groundedness • relevance • task success • regression suites', 1465, 690, 245, 82, '#334155'));
  c.push(mini('security', 'Security & governance', 'IAM • audit • VPC Service Controls where supported • data classification • retention', 1200, 794, 240, 82, '#334155'));
  c.push(mini('feedback', 'Feedback & improvement', 'User feedback • failure analysis • corpus/model/prompt changes through controlled lifecycle', 1465, 794, 245, 82, '#334155'));

  c.push(v('legend', '<b>FLOW</b>   <span style="color:#2563EB">━━ request</span>   <span style="color:#64748B">┄┄ response</span>   <span style="color:#0F8B82">━━ retrieval/tool</span>   <span style="color:#6554C0">━━ ingestion/indexing</span>', 'rounded=1;arcSize=6;whiteSpace=wrap;html=1;overflow=hidden;spacing=5;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;fontColor=#334155;fontSize=10;align=center;verticalAlign=middle;', 25, 925, 755, 36));
  c.push(v('boundary', '<b>ARCHITECTURE BOUNDARY:</b> RAG Engine and Agent Search are selectable grounding patterns—not mandatory duplicates. Gemini Enterprise connectors belong to the Gemini Enterprise experience; custom Agent Runtime retrieval must explicitly use its configured grounding/data path.', 'rounded=1;arcSize=6;whiteSpace=wrap;html=1;overflow=hidden;spacing=5;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;fontColor=#475569;fontSize=10;align=left;verticalAlign=middle;', 800, 925, 935, 36));

  return `<mxfile host="app.diagrams.net" modified="2026-08-20T00:00:00.000Z" agent="PromptCanvas" version="24.0.0" type="device"><diagram id="agentic_rag_master" name="Production Agentic RAG on Google Cloud"><mxGraphModel dx="1760" dy="980" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1760" pageHeight="980" background="#FFFFFF" math="0" shadow="0"><root>${c.join('\n')}</root></mxGraphModel></diagram></mxfile>`;
}
