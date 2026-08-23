/**
 * Blueprint 50 — Enterprise MCP Gateway on Google Cloud
 *
 * Phase 3.1C rebuild.
 * Visual contract: approved five-stage MCP gateway reference.
 * Technical contract:
 * - MCP clients invoke remote MCP servers over HTTP/Streamable HTTP.
 * - Custom remote MCP servers can run on authenticated Cloud Run services.
 * - Google/Google Cloud remote MCP endpoints may provide fine-grained authorization,
 *   audit logging, and optional Model Armor protection where supported.
 * - The gateway centralizes enterprise policy/routing; it does not become an LLM context bus.
 */

const esc = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const svg = (body: string): string =>
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">${body}</svg>`)}`;

const ICON = {
  gemini: svg('<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4285F4"/><stop offset=".55" stop-color="#7B61FF"/><stop offset="1" stop-color="#D965C5"/></linearGradient></defs><path fill="url(#g)" d="M24 4c2.2 10.2 9.6 17.6 20 20-10.4 2.4-17.8 9.8-20 20-2.2-10.2-9.6-17.6-20-20C14.4 21.6 21.8 14.2 24 4z"/>'),
  agent: svg('<path fill="#7456C2" d="M24 5 42 15v18L24 43 6 33V15z"/><path fill="#fff" d="M15 18h18v14H15z"/><circle cx="20" cy="24" r="2.5" fill="#7456C2"/><circle cx="28" cy="24" r="2.5" fill="#7456C2"/><path d="M20 29h8" stroke="#7456C2" stroke-width="2"/>'),
  app: svg('<rect x="7" y="8" width="34" height="32" rx="4" fill="#334155"/><path d="M13 15h22M13 21h22M13 27h15" stroke="#fff" stroke-width="2"/><circle cx="34" cy="32" r="4" fill="#60A5FA"/>'),
  search: svg('<circle cx="20" cy="20" r="11" fill="none" stroke="#1669C1" stroke-width="4"/><path d="m28 28 11 11" stroke="#1669C1" stroke-width="4" stroke-linecap="round"/>'),
  cache: svg('<ellipse cx="24" cy="12" rx="14" ry="6" fill="#1669C1"/><path d="M10 12v18c0 3.3 6.3 6 14 6s14-2.7 14-6V12" fill="#8CC0FF" stroke="#1669C1" stroke-width="2"/><ellipse cx="24" cy="30" rx="14" ry="6" fill="#1669C1"/>'),
  code: svg('<path d="M13 6h20l7 7v29H13z" fill="#1669C1"/><path d="M33 6v8h7" fill="#8CC0FF"/><path d="m22 20-6 5 6 5M29 20l6 5-6 5" fill="none" stroke="#fff" stroke-width="2.6"/>'),
  normalize: svg('<path d="M9 13h30v8H9zM9 28h30v8H9z" fill="#1669C1"/><path d="m17 24 7 6 7-6" fill="none" stroke="#fff" stroke-width="2.5"/>'),
  session: svg('<ellipse cx="22" cy="12" rx="12" ry="5" fill="#1669C1"/><path d="M10 12v20c0 3 5.4 5 12 5 2.5 0 4.7-.3 6.6-.9" fill="#8CC0FF" stroke="#1669C1" stroke-width="2"/><circle cx="34" cy="32" r="8" fill="#1669C1"/><path d="m30 32 3 3 5-7" fill="none" stroke="#fff" stroke-width="2"/>'),
  run: svg('<path d="M9 10 31 24 9 38l9-14z" fill="#4285F4"/><path d="M26 10 39 24 26 38l6-14z" fill="#7456C2"/>'),
  auth: svg('<circle cx="24" cy="15" r="8" fill="#188038"/><path d="M9 41c2-11 8-16 15-16s13 5 15 16" fill="#188038"/><rect x="28" y="28" width="12" height="10" rx="2" fill="#fff" stroke="#188038" stroke-width="2"/>'),
  shield: svg('<path d="M24 4 40 10v12c0 11-6.5 18-16 22C14.5 40 8 33 8 22V10z" fill="#188038"/><path d="m16 24 5 5 11-13" fill="none" stroke="#fff" stroke-width="3"/>'),
  route: svg('<circle cx="12" cy="13" r="5" fill="#188038"/><circle cx="36" cy="14" r="5" fill="#188038"/><circle cx="24" cy="37" r="5" fill="#188038"/><path d="m17 14 14 0M15 17l7 15M33 18l-7 14" stroke="#188038" stroke-width="3"/>'),
  db: svg('<ellipse cx="24" cy="11" rx="14" ry="6" fill="#7E57C2"/><path d="M10 11v24c0 3.3 6.3 6 14 6s14-2.7 14-6V11" fill="#B8A6E6"/><ellipse cx="24" cy="35" rx="14" ry="6" fill="#7E57C2"/>'),
  github: svg('<circle cx="24" cy="24" r="20" fill="#111827"/><path d="M15 34c2-6 6-8 9-8s7 2 9 8M16 21c0-7 4-11 8-11s8 4 8 11c0 5-3 8-8 8s-8-3-8-8z" fill="#fff"/>'),
  cloud: svg('<path d="M13 36a10 10 0 0 1 2-19 12 12 0 0 1 22 6 8 8 0 0 1-2 15H13z" fill="#4285F4"/><path d="M15 17a12 12 0 0 1 18-4" fill="none" stroke="#EA4335" stroke-width="5"/><path d="M10 28a10 10 0 0 1 5-10" fill="none" stroke="#FBBC05" stroke-width="5"/><path d="M15 38h20" stroke="#34A853" stroke-width="5"/>'),
  building: svg('<path d="M9 42V8h22v10h8v24z" fill="#64748B"/><path d="M14 14h5v5h-5zm9 0h5v5h-5zm-9 9h5v5h-5zm9 0h5v5h-5zm10 1h4v5h-4zm0 9h4v5h-4zM19 34h6v8h-6z" fill="#fff"/>'),
  log: svg('<rect x="10" y="6" width="28" height="36" rx="3" fill="#188038"/><path d="M16 15h16M16 23h16M16 31h10" stroke="#fff" stroke-width="2.5"/>'),
  monitor: svg('<rect x="6" y="8" width="36" height="26" rx="3" fill="#188038"/><path d="m11 28 7-7 5 4 8-11 6 6" fill="none" stroke="#fff" stroke-width="2.5"/><path d="M18 40h12M24 34v6" stroke="#188038" stroke-width="3"/>'),
  key: svg('<circle cx="17" cy="21" r="9" fill="none" stroke="#188038" stroke-width="5"/><path d="m24 25 15 15m-7-8 5-5m-10 0 5-5" stroke="#188038" stroke-width="4"/>'),
};

const cell = (
  id: string,
  value: string,
  style: string,
  x: number,
  y: number,
  width: number,
  height: number,
): string =>
  `<mxCell id="${id}" value="${esc(value)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${width}" height="${height}" as="geometry"/></mxCell>`;

const lane = (
  id: string,
  number: number,
  title: string,
  subtitle: string,
  x: number,
  y: number,
  width: number,
  height: number,
  accent: string,
  fill: string,
): string =>
  [
    cell(id, '', `rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${accent};strokeWidth=1.5;shadow=0;`, x, y, width, height),
    cell(`${id}_number`, String(number), `ellipse;whiteSpace=wrap;html=1;fillColor=${accent};strokeColor=${accent};fontColor=#FFFFFF;fontStyle=1;fontSize=13;align=center;verticalAlign=middle;`, x + 12, y + 12, 32, 32),
    cell(`${id}_title`, `<b>${title}</b><br><span style="font-size:10px;color:#64748B">${subtitle}</span>`, `text;html=1;whiteSpace=wrap;align=left;verticalAlign=middle;fontColor=${accent};fontSize=15;`, x + 54, y + 7, width - 64, 44),
  ].join('\n');

const card = (
  id: string,
  title: string,
  subtitle: string,
  icon: string,
  x: number,
  y: number,
  width: number,
  height: number,
  accent: string,
  fill = '#FFFFFF',
): string => {
  const html = `<table style="width:100%;height:100%;border-collapse:collapse"><tr><td style="width:42px;text-align:center;vertical-align:middle"><img src="${icon}" width="30" height="30"/></td><td style="text-align:left;vertical-align:middle"><b style="font-size:12px;color:#0F172A">${title}</b><br/><span style="font-size:10px;color:#475569">${subtitle}</span></td></tr></table>`;
  return cell(id, html, `rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${accent};strokeWidth=1.1;align=center;verticalAlign=middle;spacing=4;`, x, y, width, height);
};

const edge = (
  id: string,
  source: string,
  target: string,
  label: string,
  kind: 'request' | 'response' | 'governance',
  exitX = 1,
  exitY = 0.5,
  entryX = 0,
  entryY = 0.5,
  points: Array<[number, number]> = [],
): string => {
  const cfg =
    kind === 'request'
      ? { stroke: '#2563EB', dashed: 0, pattern: '6 4', arrow: 'block', width: 2 }
      : kind === 'response'
        ? { stroke: '#64748B', dashed: 1, pattern: '6 4', arrow: 'block', width: 1.7 }
        : { stroke: '#188038', dashed: 1, pattern: '2 4', arrow: 'open', width: 1.6 };
  const pts = points.length ? `<Array as="points">${points.map(([x, y]) => `<mxPoint x="${x}" y="${y}"/>`).join('')}</Array>` : '';
  return `<mxCell id="${id}" value="${esc(label)}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${cfg.stroke};strokeWidth=${cfg.width};dashed=${cfg.dashed};dashPattern=${cfg.pattern};endArrow=${cfg.arrow};endFill=${cfg.arrow === 'block' ? 1 : 0};fontColor=#334155;fontSize=10;labelBackgroundColor=#FFFFFF;labelBorderColor=none;exitX=${exitX};exitY=${exitY};exitDx=0;exitDy=0;entryX=${entryX};entryY=${entryY};entryDx=0;entryDy=0;" edge="1" parent="1" source="${source}" target="${target}"><mxGeometry relative="1" as="geometry">${pts}</mxGeometry></mxCell>`;
};

export function buildMcpContextGatewayXml(): string {
  const cells: string[] = [
    '<mxCell id="0"/>',
    '<mxCell id="1" parent="0"/>',

    lane('hosts', 1, 'AI HOSTS & AGENTS', 'MCP clients live in the host/agent runtime', 20, 20, 225, 685, '#6D28D9', '#FAF5FF'),
    lane('client', 2, 'MCP CLIENT LAYER', 'Discovery, request construction, normalization', 265, 20, 225, 685, '#1A73E8', '#EFF6FF'),
    lane('gateway', 3, 'ENTERPRISE MCP GATEWAY', 'Central policy, authentication, routing & audit', 510, 20, 430, 685, '#1669C1', '#F8FBFF'),
    lane('servers', 4, 'REMOTE MCP SERVERS', 'Google-managed or enterprise-hosted endpoints', 960, 20, 265, 685, '#7E57C2', '#FAF5FF'),
    lane('tools', 5, 'ENTERPRISE TOOLS & DATA', 'Systems reached through MCP tools/resources', 1245, 20, 315, 685, '#1A73E8', '#F8FBFF'),

    // Hosts
    card('host_gemini', 'Gemini Enterprise / Gemini App', 'Enterprise AI experience hosting MCP-capable clients where supported', ICON.gemini, 38, 85, 190, 86, '#6D28D9'),
    card('host_agent_engine', 'Vertex AI Agent Engine', 'Managed production agent runtime', ICON.agent, 38, 188, 190, 82, '#6D28D9'),
    card('host_adk', 'ADK / Custom Agents', 'Agent Development Kit or custom host', ICON.agent, 38, 287, 190, 82, '#6D28D9'),
    card('host_ide', 'IDE / Developer Assistants', 'Developer tools with remote MCP client support', ICON.code, 38, 386, 190, 82, '#6D28D9'),
    card('host_apps', 'Enterprise Applications', 'Business apps embedding MCP-enabled agents', ICON.app, 38, 485, 190, 82, '#6D28D9'),

    // Client
    card('client_discovery', 'Tool Discovery & Registry', 'list_tools / capabilities and endpoint configuration', ICON.search, 283, 85, 190, 82, '#1A73E8'),
    card('client_cache', 'Capability Cache & Metadata', 'Client-side capability metadata; do not centralize conversational state here', ICON.cache, 283, 184, 190, 82, '#1A73E8'),
    card('client_builder', 'MCP / JSON-RPC Request Builder', 'Streamable HTTP request construction and transport handling', ICON.code, 283, 283, 190, 90, '#1A73E8'),
    card('client_normalize', 'Response Normalization', 'Normalize tool results/errors into the host runtime', ICON.normalize, 283, 390, 190, 82, '#1A73E8'),
    card('client_context', 'Client-Owned Session Context', 'Conversation/session context remains with the host/client by default', ICON.session, 283, 489, 190, 90, '#1A73E8'),

    // Gateway front door
    card('gateway_ingress', 'Cloud Run Gateway Service / Optional Enterprise API Front Door', 'Authenticated HTTPS entry; preserve MCP Streamable HTTP semantics', ICON.run, 530, 80, 390, 76, '#1669C1', '#FFFFFF'),
    card('gateway_auth', 'OAuth / OIDC Authentication', 'Validate client identity and token audience; use supported MCP authorization patterns', ICON.auth, 530, 172, 185, 82, '#188038'),
    card('gateway_identity', 'IAM / Workload Identity Federation', 'Google Cloud IAM and federated workload identity for authorized callers', ICON.auth, 735, 172, 185, 82, '#188038'),
    card('gateway_policy', 'Policy / Tool Allowlist', 'Authorize server, tool, tenant, environment and action scope', ICON.shield, 530, 270, 185, 82, '#188038'),
    card('gateway_toolauth', 'Tenant / Tool Authorization', 'Least privilege and resource-level authorization before invocation', ICON.key, 735, 270, 185, 82, '#188038'),
    card('gateway_quota', 'Rate Limits / Quotas / Backpressure', 'Protect endpoints; handle retries, timeouts and overload deliberately', ICON.monitor, 530, 368, 185, 82, '#188038'),
    card('gateway_armor', 'Model Armor / Content Inspection', 'Optional prompt/tool-call/response protection where supported or explicitly integrated', ICON.shield, 735, 368, 185, 82, '#188038'),
    card('gateway_route', 'Request Routing & Orchestration', 'Route only to approved remote MCP endpoints; preserve protocol errors', ICON.route, 530, 466, 390, 72, '#1669C1'),
    card('gateway_audit', 'Protocol / Header Management + Audit', 'Correlation IDs, safe headers, structured logs and audit evidence', ICON.log, 530, 552, 390, 72, '#1669C1'),

    // Servers
    card('srv_google', 'Google / Google Cloud Remote MCP', 'Managed MCP endpoints where available', ICON.cloud, 978, 82, 228, 74, '#7E57C2'),
    card('srv_db', 'Database MCP Server', 'Enterprise-controlled data access facade', ICON.db, 978, 170, 228, 74, '#7E57C2'),
    card('srv_devops', 'GitHub / DevOps MCP Server', 'Repository, CI/CD and issue/tool access', ICON.github, 978, 258, 228, 74, '#7E57C2'),
    card('srv_saas', 'Enterprise SaaS MCP Servers', 'Salesforce, ServiceNow, SAP or approved SaaS endpoints', ICON.building, 978, 346, 228, 84, '#7E57C2'),
    card('srv_custom', 'Custom MCP Servers on Cloud Run', 'Authenticated remote MCP services using HTTP/Streamable HTTP', ICON.run, 978, 444, 228, 84, '#7E57C2'),
    card('srv_other', 'Other Approved MCP Endpoints', 'Regional/global endpoints registered through enterprise governance', ICON.route, 978, 542, 228, 74, '#7E57C2'),

    // Tools/data
    card('tool_bq', 'BigQuery / Analytics', 'Governed analytical queries and metadata', ICON.cloud, 1263, 82, 280, 68, '#1A73E8'),
    card('tool_db', 'AlloyDB / Cloud SQL / Databases', 'Transactional and relational tools through least-privilege interfaces', ICON.db, 1263, 163, 280, 74, '#1A73E8'),
    card('tool_storage', 'Cloud Storage / Content Repositories', 'Objects, documents and governed enterprise content', ICON.cloud, 1263, 250, 280, 74, '#1A73E8'),
    card('tool_github', 'GitHub / DevOps Platforms', 'Code, pull requests, issues and pipelines', ICON.github, 1263, 337, 280, 74, '#1A73E8'),
    card('tool_saas', 'Salesforce / ServiceNow / SAP', 'Business systems exposed only through approved tools', ICON.building, 1263, 424, 280, 82, '#1A73E8'),
    card('tool_gcp', 'Google Cloud APIs & Enterprise Apps', 'Managed APIs and custom internal business capabilities', ICON.cloud, 1263, 519, 280, 82, '#1A73E8'),

    // Stateless transport note
    cell('transport_note', '<b>STATELESS, STREAMABLE HTTP REQUEST / RESPONSE</b><br><span style="font-size:9.5px;color:#475569">Gateway nodes should not become a server-side memory store.</span>', 'rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.4;dashed=1;dashPattern=4 4;fontColor=#1D4ED8;fontSize=11;align=center;verticalAlign=middle;', 530, 634, 390, 56),

    // Governance band
    lane('governance', 0, 'CROSS-CUTTING GOVERNANCE & OPERATIONS', 'Apply across hosts, clients, gateway, servers and downstream tools', 20, 725, 1540, 180, '#188038', '#F0FDF4'),
    card('gov_iam', 'IAM & Least Privilege', 'Caller, server and downstream resource authorization', ICON.auth, 45, 790, 205, 86, '#188038'),
    card('gov_armor', 'Model Armor / Safety', 'Supported MCP sanitization or explicit custom integration', ICON.shield, 265, 790, 205, 86, '#188038'),
    card('gov_secret', 'Secret Manager / KMS', 'Credential and secret material stays out of prompts and logs', ICON.key, 485, 790, 205, 86, '#188038'),
    card('gov_logging', 'Cloud Logging & Audit', 'Invocation, policy decision, tool result status and correlation', ICON.log, 705, 790, 205, 86, '#188038'),
    card('gov_monitor', 'Cloud Monitoring & Alerting', 'Latency, errors, availability, saturation and abuse signals', ICON.monitor, 925, 790, 205, 86, '#188038'),
    card('gov_policy', 'Organization Policy / Guardrails', 'Approved endpoints, projects, regions and data-boundary controls', ICON.shield, 1145, 790, 185, 86, '#188038'),
    card('gov_resilience', 'Retries / Timeouts / Circuit Breakers', 'Bounded retries and resilient failure handling', ICON.monitor, 1345, 790, 190, 86, '#188038'),

    // Main request path
    edge('e_host_client', 'host_agent_engine', 'client_discovery', 'MCP client', 'request'),
    edge('e_client_gateway', 'client_builder', 'gateway_ingress', 'Streamable HTTP', 'request'),
    edge('e_gateway_server', 'gateway_route', 'srv_custom', 'Approved Tool', 'request'),
    edge('e_server_tool', 'srv_custom', 'tool_gcp', 'Backend API', 'request'),

    // Responses
    edge('e_tool_server_resp', 'tool_gcp', 'srv_custom', 'Tool Result', 'response', 0, 0.7, 1, 0.7),
    edge('e_server_gateway_resp', 'srv_custom', 'gateway_route', 'MCP Result', 'response', 0, 0.72, 1, 0.72),
    edge('e_gateway_client_resp', 'gateway_ingress', 'client_normalize', 'MCP response', 'response', 0, 0.72, 1, 0.72),
    edge('e_client_host_resp', 'client_normalize', 'host_agent_engine', 'Normalized result', 'response', 0, 0.72, 1, 0.72),

    // Additional mapped server/tool examples
    edge('e_srv_db_tool', 'srv_db', 'tool_db', '', 'request'),
    edge('e_srv_devops_tool', 'srv_devops', 'tool_github', '', 'request'),
    edge('e_srv_saas_tool', 'srv_saas', 'tool_saas', '', 'request'),
    edge('e_srv_google_tool', 'srv_google', 'tool_bq', '', 'request'),

    // Governance overlay - dotted green through major stages
    edge('e_gov_hosts', 'gov_iam', 'hosts', '', 'governance', 0.5, 0, 0.5, 1, [[148, 714]]),
    edge('e_gov_gateway', 'gov_policy', 'gateway', '', 'governance', 0.5, 0, 0.5, 1, [[1238, 714], [725, 714]]),
    edge('e_gov_servers', 'gov_logging', 'servers', '', 'governance', 0.5, 0, 0.5, 1, [[808, 714], [1092, 714]]),
    edge('e_gov_tools', 'gov_monitor', 'tools', '', 'governance', 0.5, 0, 0.5, 1, [[1028, 714], [1400, 714]]),

    // Legend
    cell('legend', '<b>FLOW LEGEND</b>&nbsp;&nbsp;&nbsp; <span style="color:#2563EB">━━▶ MCP request / tool invocation</span>&nbsp;&nbsp;&nbsp; <span style="color:#64748B">- - -▶ MCP response / result</span>&nbsp;&nbsp;&nbsp; <span style="color:#188038">····▷ governance / security / observability</span>', 'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;fontColor=#334155;fontSize=11;align=center;verticalAlign=middle;', 20, 928, 1540, 48),
  ];

  return `<mxfile host="app.diagrams.net" modified="2026-08-20T00:00:00.000Z" agent="PromptCanvas" version="24.0.0" type="device"><diagram id="enterprise_mcp_gateway" name="Enterprise MCP Gateway on Google Cloud"><mxGraphModel dx="1600" dy="1000" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1580" pageHeight="1000" background="#FFFFFF"><root>${cells.join('\n')}</root></mxGraphModel></diagram></mxfile>`;
}
