/**
 * Blueprint 50 — Enterprise MCP Gateway on Google Cloud
 *
 * Visual contract: five-stage widescreen MCP gateway reference with clean gutters,
 * zero border-touching copy, aligned server-to-tool rows, and non-crossing governance connectors.
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
    cell(id, '', `rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${accent};strokeWidth=1.5;shadow=0;`, x, y, width, height),
    cell(`${id}_number`, String(number), `ellipse;whiteSpace=wrap;html=1;fillColor=${accent};strokeColor=${accent};fontColor=#FFFFFF;fontStyle=1;fontSize=13;align=center;verticalAlign=middle;`, x + 12, y + 14, 30, 30),
    cell(`${id}_title`, `<b>${title}</b><br><span style="font-size:9.5px;color:#64748B">${subtitle}</span>`, `text;html=1;whiteSpace=wrap;align=left;verticalAlign=middle;fontColor=${accent};fontSize=13.5;spacingLeft=2;spacingRight=4;`, x + 48, y + 8, width - 56, 54),
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
  const html = `<table style="width:100%;height:100%;border-collapse:collapse"><tr><td style="width:40px;text-align:center;vertical-align:middle;padding-right:4px"><img src="${icon}" width="28" height="28"/></td><td style="text-align:left;vertical-align:middle;line-height:1.25"><b style="font-size:11.5px;color:#0F172A">${title}</b><br/><span style="font-size:9.5px;color:#475569">${subtitle}</span></td></tr></table>`;
  return cell(id, html, `rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${accent};strokeWidth=1.1;align=center;verticalAlign=middle;spacing=6;`, x, y, width, height);
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
  labelOffset: { x?: number; y?: number } = {},
): string => {
  const cfg =
    kind === 'request'
      ? { stroke: '#2563EB', dashed: 0, pattern: '6 4', arrow: 'block', width: 2 }
      : kind === 'response'
        ? { stroke: '#64748B', dashed: 1, pattern: '6 4', arrow: 'block', width: 1.7 }
        : { stroke: '#188038', dashed: 1, pattern: '3 4', arrow: 'open', width: 1.6 };
  const pts = points.length ? `<Array as="points">${points.map(([x, y]) => `<mxPoint x="${x}" y="${y}"/>`).join('')}</Array>` : '';
  const geomAttrs = [
    labelOffset.x !== undefined ? `x="${labelOffset.x}"` : '',
    labelOffset.y !== undefined ? `y="${labelOffset.y}"` : '',
    'relative="1"',
    'as="geometry"',
  ].filter(Boolean).join(' ');
  const offsetXml = labelOffset.y !== undefined ? `<mxPoint as="offset"/>` : '';
  return `<mxCell id="${id}" value="${esc(label)}" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${cfg.stroke};strokeWidth=${cfg.width};dashed=${cfg.dashed};dashPattern=${cfg.pattern};endArrow=${cfg.arrow};endFill=${cfg.arrow === 'block' ? 1 : 0};fontColor=#334155;fontSize=9.5;fontStyle=1;labelBackgroundColor=#FFFFFF;labelBorderColor=none;exitX=${exitX};exitY=${exitY};exitDx=0;exitDy=0;entryX=${entryX};entryY=${entryY};entryDx=0;entryDy=0;" edge="1" parent="1" source="${source}" target="${target}"><mxGeometry ${geomAttrs}>${pts}${offsetXml}</mxGeometry></mxCell>`;
};

export function buildMcpContextGatewayXml(): string {
  const cells: string[] = [
    '<mxCell id="0"/>',
    '<mxCell id="1" parent="0"/>',

    // 5 Primary Architecture Lanes (generous 40px inter-lane gutters for clean edge labels)
    lane('hosts', 1, 'AI HOSTS & AGENTS', 'Host & agent runtimes embedding MCP clients', 20, 20, 236, 720, '#6D28D9', '#FAF5FF'),
    lane('client', 2, 'MCP CLIENT LAYER', 'Discovery, request framing & normalization', 296, 20, 236, 720, '#1A73E8', '#EFF6FF'),
    lane('gateway', 3, 'ENTERPRISE MCP GATEWAY', 'Central policy, auth, routing & audit plane', 574, 20, 456, 720, '#1669C1', '#F8FBFF'),
    lane('servers', 4, 'REMOTE MCP SERVERS', 'Google-managed & Cloud Run MCP endpoints', 1072, 20, 276, 720, '#7E57C2', '#FAF5FF'),
    lane('tools', 5, 'ENTERPRISE TOOLS & DATA', 'Downstream systems exposed via MCP tools', 1390, 20, 310, 720, '#1A73E8', '#F8FBFF'),

    // Lane 1: Hosts (5 evenly spaced cards filling y=96..686)
    card('host_gemini', 'Gemini Enterprise / App', 'Enterprise AI host with MCP client support', ICON.gemini, 36, 96, 204, 102, '#6D28D9'),
    card('host_agent_engine', 'Vertex AI Agent Engine', 'Managed production agent runtime', ICON.agent, 36, 218, 204, 102, '#6D28D9'),
    card('host_adk', 'ADK / Custom Agents', 'Agent Development Kit & custom hosts', ICON.agent, 36, 340, 204, 102, '#6D28D9'),
    card('host_ide', 'IDE / Dev Assistants', 'Developer tools with remote MCP clients', ICON.code, 36, 462, 204, 102, '#6D28D9'),
    card('host_apps', 'Enterprise Applications', 'Business apps embedding MCP agents', ICON.app, 36, 584, 204, 102, '#6D28D9'),

    // Lane 2: Client (5 evenly spaced cards filling y=96..686)
    card('client_discovery', 'Tool Discovery & Registry', 'list_tools capabilities & endpoint config', ICON.search, 312, 96, 204, 102, '#1A73E8'),
    card('client_cache', 'Capability Cache', 'Client-side schema cache (no shared state)', ICON.cache, 312, 218, 204, 102, '#1A73E8'),
    card('client_builder', 'MCP JSON-RPC Builder', 'Streamable HTTP transport & framing', ICON.code, 312, 340, 204, 102, '#1A73E8'),
    card('client_normalize', 'Response Normalization', 'Normalizes tool results & errors for host', ICON.normalize, 312, 462, 204, 102, '#1A73E8'),
    card('client_context', 'Client Session Context', 'Conversation state stays with host/client', ICON.session, 312, 584, 204, 102, '#1A73E8'),

    // Lane 3: Gateway Control Plane (generous heights, zero border-touching text)
    card('gateway_ingress', 'Cloud Run Gateway / Enterprise API Front Door', 'Authenticated HTTPS ingress preserving Streamable HTTP', ICON.run, 592, 92, 420, 74, '#1669C1', '#FFFFFF'),
    card('gateway_auth', 'OAuth / OIDC Auth', 'Validate caller identity & token audience', ICON.auth, 592, 180, 202, 90, '#188038'),
    card('gateway_identity', 'IAM & Workload Identity', 'Federated GCP IAM for authorized callers', ICON.auth, 810, 180, 202, 90, '#188038'),
    card('gateway_policy', 'Policy / Tool Allowlist', 'Authorize server, tool, tenant & action scope', ICON.shield, 592, 284, 202, 90, '#188038'),
    card('gateway_toolauth', 'Tenant / Tool AuthZ', 'Least-privilege resource checks pre-call', ICON.key, 810, 284, 202, 90, '#188038'),
    card('gateway_quota', 'Rate Limits & Quotas', 'Backpressure, retries & timeout guards', ICON.monitor, 592, 388, 202, 90, '#188038'),
    card('gateway_armor', 'Model Armor Inspection', 'Optional prompt & tool payload protection', ICON.shield, 810, 388, 202, 90, '#188038'),
    card('gateway_route', 'Request Routing & Orchestration', 'Route only to approved remote MCP endpoints; preserve protocol errors', ICON.route, 592, 496, 420, 74, '#1669C1'),
    card('gateway_audit', 'Protocol Headers & Structured Audit', 'Correlation IDs, safe headers, structured logs & audit evidence', ICON.log, 592, 580, 420, 74, '#1669C1'),
    cell('transport_note', '<b>STATELESS, STREAMABLE HTTP REQUEST / RESPONSE</b><br><span style="font-size:9.5px;color:#475569">Gateway nodes remain stateless and never act as a server-side memory store.</span>', 'rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.4;dashed=1;dashPattern=4 4;fontColor=#1D4ED8;fontSize=10.5;align=center;verticalAlign=middle;', 592, 666, 420, 56),

    // Lane 4: Remote MCP Servers (6 rows y=96..692 aligned 1:1 with Tools)
    card('srv_google', 'Google Cloud Remote MCP', 'Managed Google MCP endpoints where available', ICON.cloud, 1088, 96, 244, 86, '#7E57C2'),
    card('srv_db', 'Database MCP Server', 'Enterprise-controlled SQL & analytics facade', ICON.db, 1088, 198, 244, 86, '#7E57C2'),
    card('srv_devops', 'GitHub / DevOps MCP', 'Repository, CI/CD & issue tool access', ICON.github, 1088, 300, 244, 86, '#7E57C2'),
    card('srv_saas', 'Enterprise SaaS MCPs', 'Salesforce, ServiceNow & SAP endpoints', ICON.building, 1088, 402, 244, 86, '#7E57C2'),
    card('srv_custom', 'Custom MCP on Cloud Run', 'Authenticated Streamable HTTP MCP services', ICON.run, 1088, 504, 244, 86, '#7E57C2'),
    card('srv_other', 'Approved Partner MCPs', 'Governed regional & third-party endpoints', ICON.route, 1088, 606, 244, 86, '#7E57C2'),

    // Lane 5: Enterprise Tools & Data (aligned 1:1 horizontally with Lane 4 rows!)
    card('tool_bq', 'BigQuery / Analytics', 'Governed analytical queries & metadata', ICON.cloud, 1406, 96, 278, 86, '#1A73E8'),
    card('tool_db', 'AlloyDB / Cloud SQL', 'Transactional relational tools via least privilege', ICON.db, 1406, 198, 278, 86, '#1A73E8'),
    card('tool_github', 'GitHub / DevOps Platforms', 'Code, pull requests, issues & pipelines', ICON.github, 1406, 300, 278, 86, '#1A73E8'),
    card('tool_saas', 'Salesforce / ServiceNow / SAP', 'Business systems behind approved tools', ICON.building, 1406, 402, 278, 86, '#1A73E8'),
    card('tool_gcp', 'Google Cloud APIs & Apps', 'Managed APIs & internal enterprise services', ICON.cloud, 1406, 504, 278, 86, '#1A73E8'),
    card('tool_storage', 'Cloud Storage & Content', 'Objects, documents & governed knowledge', ICON.cloud, 1406, 606, 278, 86, '#1A73E8'),

    // Cross-Cutting Governance Band (y=776..972, leaving clean 36px bus corridor y=740..776)
    lane('governance', 0, 'CROSS-CUTTING GOVERNANCE & OPERATIONS', 'Applied continuously across hosts, clients, gateway, servers & downstream tools', 20, 776, 1680, 196, '#188038', '#F0FDF4'),
    card('gov_iam', 'IAM & Least Privilege', 'Caller, server & resource authorization', ICON.auth, 38, 848, 222, 104, '#188038'),
    card('gov_armor', 'Model Armor / Safety', 'Prompt & tool-payload sanitization', ICON.shield, 274, 848, 222, 104, '#188038'),
    card('gov_secret', 'Secret Manager / KMS', 'Credentials kept out of prompts & logs', ICON.key, 510, 848, 222, 104, '#188038'),
    card('gov_logging', 'Cloud Logging & Audit', 'Policy decisions & correlation traces', ICON.log, 746, 848, 222, 104, '#188038'),
    card('gov_monitor', 'Cloud Monitoring', 'Latency, error & saturation alerts', ICON.monitor, 982, 848, 222, 104, '#188038'),
    card('gov_policy', 'Org Policy Guardrails', 'Approved projects, regions & VPC-SC', ICON.shield, 1218, 848, 222, 104, '#188038'),
    card('gov_resilience', 'Retries & Circuit Breakers', 'Bounded retries & timeout budgets', ICON.monitor, 1454, 848, 228, 104, '#188038'),

    // Primary Request Path (clean staggered gutter routing, zero label overlap)
    edge('e_host_client', 'host_agent_engine', 'client_discovery', 'MCP client', 'request', 1, 0.35, 0, 0.5, [[274, 254], [274, 147]]),
    edge('e_client_gateway', 'client_builder', 'gateway_ingress', 'Streamable HTTP', 'request', 1, 0.35, 0, 0.4, [[548, 376], [548, 122]], { x: -0.15 }),
    edge('e_gateway_server', 'gateway_route', 'srv_custom', 'Approved Tool', 'request', 1, 0.38, 0, 0.23, [], { y: -12 }),
    edge('e_server_tool', 'srv_custom', 'tool_gcp', 'Backend API', 'request', 1, 0.30, 0, 0.30, [], { y: -12 }),

    // Response Path (cleanly separated from request lines)
    edge('e_tool_server_resp', 'tool_gcp', 'srv_custom', 'Tool Result', 'response', 0, 0.72, 1, 0.72, [], { y: 12 }),
    edge('e_server_gateway_resp', 'srv_custom', 'gateway_route', 'MCP Result', 'response', 0, 0.62, 1, 0.82, [], { y: 12 }),
    edge('e_gateway_client_resp', 'gateway_ingress', 'client_normalize', 'MCP response', 'response', 0, 0.80, 1, 0.5, [[558, 151], [558, 513]], { x: 0.25 }),
    edge('e_client_host_resp', 'client_normalize', 'host_agent_engine', 'Normalized result', 'response', 0, 0.5, 1, 0.75, [[278, 513], [278, 295]]),

    // Direct 1:1 horizontal server-to-tool mappings (zero crossings)
    edge('e_srv_google_tool', 'srv_google', 'tool_bq', '', 'request'),
    edge('e_srv_db_tool', 'srv_db', 'tool_db', '', 'request'),
    edge('e_srv_devops_tool', 'srv_devops', 'tool_github', '', 'request'),
    edge('e_srv_saas_tool', 'srv_saas', 'tool_saas', '', 'request'),
    edge('e_srv_other_tool', 'srv_other', 'tool_storage', '', 'request'),

    // Governance overlay — clean vertical arrows from TOP EDGE of governance band straight up into each lane (zero text crossing!)
    edge('e_gov_hosts', 'governance', 'hosts', '', 'governance', 0.070, 0, 0.5, 1),
    edge('e_gov_client', 'governance', 'client', '', 'governance', 0.235, 0, 0.5, 1),
    edge('e_gov_gateway', 'governance', 'gateway', '', 'governance', 0.465, 0, 0.5, 1),
    edge('e_gov_servers', 'governance', 'servers', '', 'governance', 0.708, 0, 0.5, 1),
    edge('e_gov_tools', 'governance', 'tools', '', 'governance', 0.908, 0, 0.5, 1),

    // Legend
    cell('legend', '<b>FLOW LEGEND</b>&nbsp;&nbsp;&nbsp; <span style="color:#2563EB">━━▶ MCP request / tool invocation</span>&nbsp;&nbsp;&nbsp; <span style="color:#64748B">- - -▶ MCP response / result</span>&nbsp;&nbsp;&nbsp; <span style="color:#188038">····▷ governance / security / observability</span>', 'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;fontColor=#334155;fontSize=11;align=center;verticalAlign=middle;', 20, 992, 1680, 48),
  ];

  return `<mxfile host="app.diagrams.net" modified="2026-11-23T00:00:00.000Z" agent="PromptCanvas" version="24.0.0" type="device"><diagram id="enterprise_mcp_gateway" name="Enterprise MCP Gateway on Google Cloud"><mxGraphModel dx="1740" dy="1060" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1720" pageHeight="1060" background="#FFFFFF"><root>${cells.join('\n')}</root></mxGraphModel></diagram></mxfile>`;
}
