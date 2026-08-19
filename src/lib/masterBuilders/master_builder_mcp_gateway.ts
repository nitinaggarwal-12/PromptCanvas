/**
 * BLUEPRINT 50: ENTERPRISE MCP GATEWAY ON GOOGLE CLOUD
 * High-fidelity editable mxGraph master.
 * Visual contract: approved Blueprint 50 reference image.
 */
export function buildMcpContextGatewayXml(): string {
  const esc = (s: string) => s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

  const svgData = (svg: string) => `data:image/svg+xml,${encodeURIComponent(svg)}`;
  const icon = (body: string, bg = '#FFFFFF') => svgData(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="10" fill="${bg}"/>${body}</svg>`
  );

  const I = {
    gemini: icon('<path d="M24 5c2.3 9.4 9.2 16.3 18.6 18.6C33.2 25.9 26.3 32.8 24 42.2 21.7 32.8 14.8 25.9 5.4 23.6 14.8 21.3 21.7 14.4 24 5z" fill="#4285F4"/><path d="M24 5c1.6 6.7 5.7 12.2 11.4 15.6-5.7 3.4-9.8 8.9-11.4 15.6-1.6-6.7-5.7-12.2-11.4-15.6C18.3 17.2 22.4 11.7 24 5z" fill="#A142F4" opacity=".65"/>'),
    vertex: icon('<path d="M24 5 42 17v14L24 43 6 31V17z" fill="#1A73E8"/><path d="m24 11 10 7-10 7-10-7z" fill="#fff"/><path d="m14 22 10 7 10-7v7l-10 7-10-7z" fill="#B3D4FC"/>'),
    adk: icon('<path d="M24 5 41 14v20L24 43 7 34V14z" fill="#0F6CBD"/><path d="M18 16h12v16H18z" fill="#fff"/><circle cx="24" cy="14" r="4" fill="#fff"/><path d="M14 24h20" stroke="#0F6CBD" stroke-width="2"/>'),
    cli: icon('<rect x="7" y="9" width="34" height="30" rx="4" fill="#263238"/><path d="m14 18 7 6-7 6M24 30h10" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>'),
    search: icon('<circle cx="20" cy="20" r="10" fill="none" stroke="#1669C1" stroke-width="4"/><path d="m28 28 10 10" stroke="#1669C1" stroke-width="4" stroke-linecap="round"/>'),
    cache: icon('<ellipse cx="24" cy="13" rx="13" ry="6" fill="#1669C1"/><path d="M11 13v9c0 3.3 5.8 6 13 6s13-2.7 13-6v-9M11 22v9c0 3.3 5.8 6 13 6s13-2.7 13-6v-9" fill="#58A6FF" stroke="#1669C1" stroke-width="2"/>'),
    code: icon('<path d="M14 8h16l7 7v25H14z" fill="#1669C1"/><path d="M30 8v8h7" fill="#8CC0FF"/><path d="m21 23-5 5 5 5M29 23l5 5-5 5" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>'),
    normalize: icon('<path d="M11 12h26v8H11zM11 28h26v8H11z" fill="#1669C1"/><path d="m18 24 6 6 6-6" fill="none" stroke="#fff" stroke-width="2.5"/>'),
    lock: icon('<rect x="11" y="21" width="26" height="20" rx="3" fill="#188038"/><path d="M17 21v-5a7 7 0 0 1 14 0v5" fill="none" stroke="#188038" stroke-width="4"/><circle cx="24" cy="30" r="3" fill="#fff"/>'),
    identity: icon('<circle cx="24" cy="16" r="8" fill="#188038"/><path d="M10 40c2-10 8-15 14-15s12 5 14 15" fill="#188038"/><rect x="27" y="27" width="12" height="10" rx="2" fill="#fff" stroke="#188038" stroke-width="2"/>'),
    policy: icon('<rect x="11" y="8" width="26" height="32" rx="3" fill="#188038"/><path d="M17 17h14M17 24h14M17 31h8" stroke="#fff" stroke-width="2.5"/><path d="m29 31 3 3 6-7" fill="none" stroke="#fff" stroke-width="2.5"/>'),
    quota: icon('<path d="M8 32a16 16 0 0 1 32 0" fill="none" stroke="#188038" stroke-width="5"/><path d="m24 31 9-10" stroke="#188038" stroke-width="4" stroke-linecap="round"/><circle cx="24" cy="31" r="4" fill="#188038"/>'),
    armor: icon('<path d="M24 5 39 11v11c0 10-6 17-15 21C15 39 9 32 9 22V11z" fill="#188038"/><path d="m17 24 5 5 10-12" fill="none" stroke="#fff" stroke-width="3"/>'),
    route: icon('<circle cx="13" cy="13" r="5" fill="#188038"/><circle cx="35" cy="14" r="5" fill="#188038"/><circle cx="24" cy="36" r="5" fill="#188038"/><path d="M17 15l13-1M15 17l7 14M33 18l-7 13" stroke="#188038" stroke-width="3"/>'),
    audit: icon('<rect x="12" y="8" width="24" height="32" rx="2" fill="#188038"/><path d="M17 16h14M17 23h14M17 30h10" stroke="#fff" stroke-width="2.5"/>'),
    session: icon('<ellipse cx="22" cy="13" rx="12" ry="5" fill="#188038"/><path d="M10 13v17c0 3 5 5 12 5 2 0 4-.2 5.5-.7" fill="#59B875" stroke="#188038" stroke-width="2"/><circle cx="33" cy="32" r="8" fill="#188038"/><path d="m29 32 3 3 5-6" fill="none" stroke="#fff" stroke-width="2"/>'),
    cloudrun: icon('<path d="m11 10 18 14-18 14 8-14z" fill="#7456C2"/><path d="m25 10 12 14-12 14 5-14z" fill="#B19FE0"/>'),
    bigquery: icon('<circle cx="21" cy="20" r="11" fill="#F57C00"/><path d="m29 28 9 9" stroke="#F57C00" stroke-width="4"/><path d="M16 24v-8M21 24V12M26 24v-5" stroke="#fff" stroke-width="2.5"/>'),
    db: icon('<ellipse cx="24" cy="12" rx="13" ry="6" fill="#F57C00"/><path d="M11 12v20c0 3.3 5.8 6 13 6s13-2.7 13-6V12" fill="#FFAD42"/><ellipse cx="24" cy="32" rx="13" ry="6" fill="#F57C00"/>'),
    storage: icon('<path d="M8 14h32v24H8z" fill="#F57C00"/><path d="M12 10h24v8H12z" fill="#FFAD42"/><path d="M16 24h16" stroke="#fff" stroke-width="3"/>'),
    github: icon('<circle cx="24" cy="24" r="18" fill="#111"/><path d="M15 33c1-4 4-6 9-6s8 2 9 6M16 22c0-7 4-11 8-11s8 4 8 11c0 5-3 8-8 8s-8-3-8-8z" fill="#fff"/>'),
    saas: icon('<path d="M12 18h24v22H12z" fill="#F57C00"/><path d="M15 18v-4a9 9 0 0 1 18 0v4" fill="none" stroke="#F57C00" stroke-width="4"/>'),
    gcp: icon('<path d="M14 33a10 10 0 0 1 2-19 12 12 0 0 1 22 6 8 8 0 0 1-2 15H14z" fill="#4285F4"/><path d="M16 14a12 12 0 0 1 18-3" fill="none" stroke="#EA4335" stroke-width="5"/><path d="M11 25a10 10 0 0 1 5-10" fill="none" stroke="#FBBC05" stroke-width="5"/><path d="M16 35h20" stroke="#34A853" stroke-width="5"/>'),
    shield: icon('<path d="M24 5 39 11v11c0 10-6 17-15 21C15 39 9 32 9 22V11z" fill="#1669C1"/><path d="M24 13v20M16 23h16" stroke="#fff" stroke-width="2.5"/>'),
    observe: icon('<path d="M8 38V23h6v15zm10 0V13h6v25zm10 0V19h6v19zm10 0V8h4v30z" fill="#1669C1"/>'),
    govern: icon('<rect x="12" y="9" width="24" height="31" rx="3" fill="#188038"/><path d="M17 17h14M17 24h14M17 31h9" stroke="#fff" stroke-width="2.5"/>'),
    reliability: icon('<path d="M24 5 39 11v11c0 10-6 17-15 21C15 39 9 32 9 22V11z" fill="#7456C2"/><path d="m17 24 5 5 10-12" fill="none" stroke="#fff" stroke-width="3"/>')
  };

  const parts: string[] = [];
  const cell = (id: string, value: string, style: string, x: number, y: number, w: number, h: number) => {
    parts.push(`<mxCell id="${id}" value="${esc(value)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`);
  };
  const edge = (id: string, source: string, target: string, value: string, color: string, dashed = false, exitY = 0.5, entryY = 0.5) => {
    parts.push(`<mxCell id="${id}" value="${esc(value)}" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${color};strokeWidth=3;${dashed ? 'dashed=1;dashPattern=8 6;' : ''}endArrow=block;endFill=1;fontColor=#0F172A;fontSize=12;fontStyle=1;labelBackgroundColor=#FFFFFF;exitX=1;exitY=${exitY};entryX=0;entryY=${entryY};" edge="1" parent="1" source="${source}" target="${target}"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  };
  const htmlCard = (title: string, sub: string, img: string, accent: string) =>
    `<table style="width:100%;height:100%;border-collapse:collapse"><tr><td style="width:42px;text-align:center;vertical-align:middle"><img src="${img}" width="30" height="30"/></td><td style="text-align:left;vertical-align:middle"><b style="font-size:14px;color:${accent}">${title}</b><br/><span style="font-size:11px;color:#475569">${sub}</span></td></tr></table>`;
  const plainCard = (title: string, sub: string, img: string, accent: string) => htmlCard(title, sub, img, accent);
  const cardStyle = (stroke: string, fill = '#FFFFFF') => `rounded=1;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${stroke};strokeWidth=1.4;align=center;verticalAlign=middle;arcSize=10;spacing=5;`;
  const laneStyle = (head: string, body: string, stroke: string, fs = 16) => `swimlane;html=1;rounded=1;startSize=46;horizontal=1;fillColor=${head};swimlaneFillColor=${body};strokeColor=${stroke};strokeWidth=1.5;fontColor=#FFFFFF;fontStyle=1;fontSize=${fs};align=center;arcSize=8;`;

  parts.push(`<?xml version="1.0" encoding="UTF-8"?><mxfile host="app.diagrams.net" modified="2026-08-19T21:14:00.000Z" agent="PromptCanvas" version="24.7.17" type="device"><diagram id="mcp_context_gateway" name="Blueprint 50 - Enterprise MCP Gateway on Google Cloud"><mxGraphModel dx="1780" dy="980" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1780" pageHeight="980" background="#FFFFFF" math="0" shadow="0"><root><mxCell id="0"/><mxCell id="1" parent="0"/>`);

  cell('bp50', '<b>50</b>', 'rounded=1;whiteSpace=wrap;html=1;fillColor=#0B3B75;strokeColor=#0B3B75;fontColor=#FFFFFF;fontSize=34;fontStyle=1;align=center;verticalAlign=middle;arcSize=12;', 16, 14, 80, 78);
  cell('title', '<b>ENTERPRISE MCP GATEWAY ON GOOGLE CLOUD</b><br/><span style="font-size:17px;color:#334155">Secure, Stateless Remote MCP Access for AI Hosts, Agents, and Enterprise Tools</span>', 'text;html=1;align=left;verticalAlign=middle;fontSize=30;fontColor=#102A43;', 112, 8, 940, 84);
  cell('brand', `<table style="width:100%"><tr><td style="width:56px"><img src="${I.gcp}" width="44" height="44"/></td><td><b style="font-size:25px;color:#475569">Google Cloud</b></td></tr></table>`, 'text;html=1;align=right;verticalAlign=middle;', 1440, 12, 310, 60);
  cell('traits', '<b>☁ Serverless</b>  |  <b>≋ Streamable HTTP</b>  |  <b>▣ Stateless</b>  |  <b>✦ Agentic AI</b>  |  <b>⬟ Secure</b>  |  <b>▤ Auditable</b>', 'rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#B5C8DE;strokeWidth=1.2;fontColor=#24415E;fontSize=13;align=center;verticalAlign=middle;', 410, 82, 900, 38);

  cell('hosts_bg', '①  AI HOSTS & AGENTS', laneStyle('#2F74D0','#F7FAFF','#77A6E8'), 18, 132, 250, 462);
  cell('client_bg', '②  MCP CLIENT LAYER', laneStyle('#5795E6','#F7FAFF','#8CB3E8'), 292, 132, 288, 462);
  cell('gateway_bg', '③  ENTERPRISE MCP GATEWAY', laneStyle('#159447','#F4FBF6','#5BAE78',17), 606, 132, 450, 462);
  cell('servers_bg', '④  REMOTE MCP SERVERS<br/>ON CLOUD RUN', laneStyle('#7456C2','#FAF8FF','#9C88D1',15), 1082, 132, 300, 462);
  cell('tools_bg', '⑤  ENTERPRISE TOOLS & DATA', laneStyle('#F59E0B','#FFFBF4','#E7B460'), 1408, 132, 354, 462);

  const hostXs = 36, hostW = 214, hostYs = [192,280,368,456];
  [
    ['host_gemini','Gemini Enterprise','Gemini app / enterprise copilot',I.gemini],
    ['host_vertex','Vertex AI Agent Engine','Managed agent runtime',I.vertex],
    ['host_adk','ADK-based Copilot','Internal / custom domain agent',I.adk],
    ['host_ide','IDE / CLI Agent','Developer or operations agent',I.cli],
  ].forEach((r, i) => cell(r[0], plainCard(r[1],r[2],r[3],'#173F73'), cardStyle('#86AEE4'), hostXs, hostYs[i], hostW, 68));
  cell('host_note', 'Hosts embed MCP clients; gateway is not the model runtime.', 'text;html=1;align=center;verticalAlign=middle;fontSize=11;fontColor=#64748B;fontStyle=2;', 36, 538, 214, 34);

  const clientYs = [192,280,368,456];
  [
    ['client_discovery','Tool Discovery','List tools, prompts, resources',I.search],
    ['client_cache','Capability Cache','Fast local catalog / metadata',I.cache],
    ['client_request','Request Builder','JSON-RPC / MCP envelopes',I.code],
    ['client_response','Response Normalizer','Tool results → host-friendly output',I.normalize],
  ].forEach((r,i)=>cell(r[0], plainCard(r[1],r[2],r[3],'#173F73'), cardStyle('#8EB4E7'), 310, clientYs[i], 252, 68));

  cell('gateway_subtitle', '<b>Cloud Run / API Gateway front door</b> — stateless, horizontally scalable routing', 'text;html=1;align=center;verticalAlign=middle;fontSize=12;fontColor=#176A39;', 626, 180, 410, 26);
  const gw: Array<[string,string,string,string,number,number]> = [
    ['gw_auth','OAuth 2.1 / OIDC','Authentication & token validation',I.lock,628,216],
    ['gw_iam','Cloud IAM / WIF','Workload identity & service auth',I.identity,836,216],
    ['gw_policy','Policy & Allowlist Engine','Tool / tenant / method / server policies',I.policy,628,300],
    ['gw_rate','Rate Limiting / Quotas','Per client, tenant, tool',I.quota,836,300],
    ['gw_armor','Model Armor / Inspection','Prompt, context & tool input',I.armor,628,384],
    ['gw_routing','Header Routing','Mcp-Method • Mcp-Name • session/version',I.route,836,384],
    ['gw_audit','Audit & Request Logging','Principal • method • tool • result • latency',I.audit,628,468],
    ['gw_session','Session Context','Stateless routing metadata only',I.session,836,468],
  ];
  gw.forEach(r=>cell(r[0], plainCard(r[1],r[2],r[3],'#155A31'), cardStyle('#69AD7C'), r[4], r[5], 190, 68));
  cell('gw_stateless','<b>Stateless request routing</b> • MCP security boundary • clean separation of hosts, gateway, servers, and tools','rounded=1;whiteSpace=wrap;html=1;fillColor=#ECF9F0;strokeColor=#70B989;strokeWidth=1.4;fontColor=#176A39;fontSize=11;align=center;verticalAlign=middle;',628,548,398,32);

  const sy=[192,280,368,456];
  [
    ['srv_db','Database MCP Server','BigQuery • AlloyDB • Cloud SQL',I.cloudrun],
    ['srv_gcp','Google Cloud MCP Server','GCS • BigQuery • Pub/Sub • Vertex AI APIs',I.cloudrun],
    ['srv_git','GitHub / DevOps MCP Server','Repos • Issues • Pull Requests • CI/CD',I.github],
    ['srv_saas','Enterprise SaaS MCP Server','Salesforce • ServiceNow • SAP',I.saas],
  ].forEach((r,i)=>cell(r[0], plainCard(r[1],r[2],r[3],'#5B3D99'), cardStyle('#A48FD2'), 1102, sy[i], 260, 68));
  cell('srv_note','<b>All servers are stateless Cloud Run services</b><br/>Independent scale-out • no sticky session dependency','rounded=1;whiteSpace=wrap;html=1;fillColor=#F7F3FF;strokeColor=#7456C2;dashed=1;fontColor=#5B3D99;fontSize=11;align=center;verticalAlign=middle;',1102,536,260,40);

  const ty=[184,255,326,397,468,539];
  [
    ['tool_bq','BigQuery','Analytics & governed data',I.bigquery],
    ['tool_db','AlloyDB / Cloud SQL','Transactional data',I.db],
    ['tool_storage','Cloud Storage','Documents, objects, artifacts',I.storage],
    ['tool_git','GitHub / DevOps','Repos, issues, PRs, actions',I.github],
    ['tool_saas','Salesforce / ServiceNow / SAP','Enterprise systems of record',I.saas],
    ['tool_gcp','Google Cloud APIs','Managed service operations',I.gcp],
  ].forEach((r,i)=>cell(r[0], plainCard(r[1],r[2],r[3],'#7A4A00'), cardStyle('#E9B461'), 1428, ty[i], 314, 56));

  edge('e1','hosts_bg','client_bg','1  Host → MCP client','#0B56B6',false,.30,.30);
  edge('e2','client_request','gateway_bg','2  Streamable HTTP request','#0B56B6',false,.50,.42);
  edge('e3','gateway_bg','servers_bg','3  Authorized invoke','#0B56B6',false,.42,.42);
  edge('e4','servers_bg','tools_bg','4  Tool / API call','#0B56B6',false,.42,.42);
  edge('e5','tools_bg','servers_bg','5  Tool result','#5B48B5',true,.60,.60);
  edge('e6','servers_bg','client_response','5  MCP response / result','#5B48B5',true,.72,.72);
  edge('e7','client_response','hosts_bg','6  Normalized result','#5B48B5',true,.72,.72);

  cell('cross_lbl','CROSS-CUTTING<br/><b>CAPABILITIES</b>','rounded=1;whiteSpace=wrap;html=1;fillColor=#0B3B75;strokeColor=#0B3B75;fontColor=#FFFFFF;fontSize=15;align=center;verticalAlign=middle;',18,618,150,96);
  const caps=[
    ['cap_sec','Security & Identity','Secret Manager • Cloud KMS • IAM • WIF • VPC-SC',I.shield,'#1669C1'],
    ['cap_obs','Observability','Cloud Logging • Cloud Monitoring • Trace • Error Reporting',I.observe,'#1669C1'],
    ['cap_gov','Governance & Audit','Cloud Audit Logs • approvals • DLP / retention • policy evidence',I.govern,'#188038'],
    ['cap_rel','Reliability','Cloud Run autoscaling • retries • multi-region option • idempotency',I.reliability,'#7456C2'],
  ];
  const capX=[184,488,792,1096];
  caps.forEach((r,i)=>cell(r[0], plainCard(r[1],r[2],r[3],r[4]), cardStyle('#B7C9DE'), capX[i],630,288,72));
  cell('legend','<b>LEGEND</b><br/>━━ Request / Invoke<br/>┄┄ MCP Response / Result<br/>···· Control / Audit / Policy','rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#8FB0D7;strokeWidth=1.2;fontColor=#24415E;fontSize=11;align=left;verticalAlign=middle;spacingLeft=12;',1400,630,160,72);
  cell('benefits','<b>KEY BENEFITS</b><br/>✓ Secure centralized tool access<br/>✓ Stateless scalable remote MCP<br/>✓ Auditable policy-governed execution<br/>✓ Clean host/gateway/server/tool separation','rounded=1;whiteSpace=wrap;html=1;fillColor=#F4FBF6;strokeColor=#70B989;strokeWidth=1.2;fontColor=#176A39;fontSize=11;align=left;verticalAlign=middle;spacingLeft=12;',1570,630,192,72);

  cell('flow_lbl','REQUEST FLOW<br/><b>(END-TO-END)</b>','rounded=1;whiteSpace=wrap;html=1;fillColor=#0B3B75;strokeColor=#0B3B75;fontColor=#FFFFFF;fontSize=15;align=center;verticalAlign=middle;',18,728,150,82);
  const flow=[
    ['1','Host selects tool and discovers capabilities'],
    ['2','MCP client builds a Streamable HTTP request'],
    ['3','Gateway authenticates, authorizes, inspects, and routes'],
    ['4','Remote MCP server invokes the target enterprise system'],
    ['5','Tool result returns as an MCP response / result'],
    ['6','Host agent reasons over the result and responds or acts'],
  ];
  flow.forEach((r,i)=>cell(`flow_${i+1}`,`<b style="font-size:20px;color:#0B56B6">${r[0]}</b><br/><span style="font-size:10px;color:#334155">${r[1]}</span>`,'rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#8FB0D7;strokeWidth=1.2;align=center;verticalAlign=middle;',184+i*258,738,244,62));

  cell('benefit_bar','<b>KEY BENEFITS</b>   |   Secure centralized tool access   |   Stateless scalable remote MCP   |   Auditable policy-governed execution   |   Clean separation of hosts / gateway / servers / tools','rounded=1;whiteSpace=wrap;html=1;fillColor=#F4FBF6;strokeColor=#70B989;strokeWidth=1.2;fontColor=#176A39;fontSize=13;align=center;verticalAlign=middle;',18,826,1744,42);
  cell('foundation',`<table style="width:100%;height:100%"><tr><td style="width:54px;text-align:center"><img src="${I.gcp}" width="38" height="38"/></td><td style="text-align:left"><b style="font-size:15px;color:#FFFFFF">BUILT ON GOOGLE CLOUD:</b>&nbsp;&nbsp;<span style="font-size:12px;color:#E7F0FA">Cloud Run • API Gateway • HTTPS LB • IAM • Workload Identity Federation • Secret Manager • Cloud KMS • Model Armor • Cloud Logging • Cloud Monitoring • BigQuery • AlloyDB • Cloud SQL • Cloud Storage</span></td></tr></table>`,'rounded=1;whiteSpace=wrap;html=1;fillColor=#0B4A86;strokeColor=#0B4A86;strokeWidth=1.2;align=left;verticalAlign=middle;',18,884,1744,64);

  parts.push('</root></mxGraphModel></diagram></mxfile>');
  return parts.join('');
}