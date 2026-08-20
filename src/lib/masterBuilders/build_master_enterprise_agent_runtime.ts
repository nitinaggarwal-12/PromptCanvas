/** Blueprint 19 — Enterprise Agent Runtime on Gemini Enterprise Agent Platform. */
const GCP_ICON_BASE='https://cdn.jsdelivr.net/npm/gcp-icons@1.0.6/dist/icons/';
const ICON={agents:`${GCP_ICON_BASE}agents-512-color.svg`,bigquery:`${GCP_ICON_BASE}bigquery-512-color.svg`,gcs:`${GCP_ICON_BASE}cloud-storage-512-color.svg`,cloudRun:`${GCP_ICON_BASE}cloudrun-512-color-rgb.svg`,microsoft:'https://cdn.simpleicons.org/microsoft',salesforce:'https://cdn.simpleicons.org/salesforce',servicenow:'https://cdn.simpleicons.org/servicenow'};
const esc=(s:string)=>s.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const v=(id:string,value:string,style:string,x:number,y:number,w:number,h:number)=>`<mxCell id="${id}" value="${esc(value)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`;
const img=(id:string,url:string,x:number,y:number,w:number,h:number)=>v(id,'',`shape=image;imageAspect=0;aspect=fixed;image=${url};align=center;verticalAlign=middle;`,x,y,w,h);
const zone=(id:string,n:number,title:string,sub:string,x:number,y:number,w:number,h:number,accent:string,fill:string)=>[
 v(id,'',`rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${accent};strokeWidth=1.5;`,x,y,w,h),
 v(`${id}_n`,String(n),`ellipse;whiteSpace=wrap;html=1;fillColor=${accent};strokeColor=${accent};fontColor=#FFFFFF;fontStyle=1;fontSize=13;align=center;verticalAlign=middle;`,x+14,y+13,30,30),
 v(`${id}_h`,`<b>${title}</b><br><span style="font-size:10px;color:#64748B">${sub}</span>`,'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=3;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=13;',x+55,y+8,w-70,44)
].join('\n');
const card=(id:string,title:string,body:string,x:number,y:number,w:number,h:number,accent:string,icon?:string,fill='#FFFFFF')=>{
 const iconCell=icon?img(`${id}_icon`,icon,x+14,y+Math.max(10,(h-36)/2),36,36):'';
 const tx=icon?x+60:x+14, tw=icon?w-72:w-28;
 return [v(id,'',`rounded=1;arcSize=8;whiteSpace=wrap;html=1;overflow=hidden;fillColor=${fill};strokeColor=${accent};strokeWidth=1.15;`,x,y,w,h),v(`${id}_bar`,'',`rounded=1;arcSize=4;fillColor=${accent};strokeColor=${accent};`,x,y,5,h),iconCell,v(`${id}_label`,`<b>${title}</b><br><span style="font-size:9.8px;color:#64748B">${body}</span>`,'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=4;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=11.5;',tx,y+6,tw,h-12)].filter(Boolean).join('\n');
};
const mini=(id:string,title:string,body:string,x:number,y:number,w:number,h:number,accent:string,fill='#FFFFFF')=>v(id,`<b>${title}</b><br><span style="font-size:9.7px;color:#64748B">${body}</span>`,`rounded=1;arcSize=7;whiteSpace=wrap;html=1;overflow=hidden;spacing=6;fillColor=${fill};strokeColor=${accent};strokeWidth=1.1;fontColor=#0F172A;fontSize=10.8;align=left;verticalAlign=middle;`,x,y,w,h);
const edge=(id:string,s:string,t:string,label:string,color:string,dashed=false,exitX=1,exitY=.5,entryX=0,entryY=.5)=>`<mxCell id="${id}" value="${esc(label)}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${color};strokeWidth=1.8;${dashed?'dashed=1;dashPattern=6 4;':''}endArrow=block;endFill=1;fontSize=9.8;fontColor=#334155;labelBackgroundColor=#FFFFFF;exitX=${exitX};exitY=${exitY};entryX=${entryX};entryY=${entryY};" edge="1" parent="1" source="${s}" target="${t}"><mxGeometry relative="1" as="geometry"/></mxCell>`;

export function buildEnterpriseAgentRuntimeXml():string{
 const c:string[]=['<mxCell id="0"/>','<mxCell id="1" parent="0"/>'];
 c.push(zone('hosts',1,'AI HOSTS & EXPERIENCES','People and applications invoke a governed agent endpoint',25,25,285,585,'#1A73E8','#EFF6FF'));
 c.push(card('host_ge','Gemini Enterprise','Assistant • enterprise search • Agent Gallery / Agent Designer',45,92,245,86,'#1A73E8'));
 c.push(mini('host_cap','Gemini Enterprise capabilities','Connectors • Gemini Notebook Enterprise • Skills. These belong to the assistant experience and are not inherited by custom Agent Runtime agents.',45,198,245,106,'#B83280','#FDF2F8'));
 c.push(card('host_app','Custom application','Web, mobile, API or operational client',45,326,245,82,'#1A73E8',ICON.cloudRun));
 c.push(mini('host_identity','Caller identity & context','SSO / OAuth / OIDC • application identity • delegated user context where required',45,430,245,82,'#1A73E8'));
 c.push(mini('host_boundary','Boundary','Only registered, authorized agent endpoints are exposed to callers.',45,534,245,52,'#D93025','#FFF7F7'));

 c.push(zone('gateway',2,'AGENT GATEWAY','One logical policy enforcement layer for governed agent communications',335,25,285,585,'#D93025','#FEF2F2'));
 c.push(card('gateway_product','Agent Gateway','Uses Agent Registry and Agent Identity to govern communications',355,92,245,86,'#D93025',ICON.agents));
 c.push(mini('gw_client','Client → agent policy interface','Endpoint registration • IAM / IAP where applicable • authorization • audit context',355,198,245,84,'#D93025'));
 c.push(mini('gw_tool','Agent → anywhere policy interface','Registered tool/agent destinations • identity-aware authorization • protocol policy',355,302,245,84,'#0F8B82','#ECFDF5'));
 c.push(mini('gw_armor','Model Armor — optional','Inspect configured agent/model/MCP traffic for prompt injection, unsafe content and sensitive-data leakage.',355,406,245,94,'#D93025','#FFF7F7'));
 c.push(mini('gw_fail','Policy outcome','ALLOW → route to registered endpoint. DENY → return policy result. No silent bypass path.',355,522,245,64,'#D93025'));

 c.push(zone('platform',3,'GEMINI ENTERPRISE AGENT PLATFORM','Build, run, govern and observe production agents',645,25,585,585,'#7B61A8','#F7F4FF'));
 c.push(card('platform_brand','Gemini Enterprise Agent Platform','Agent Studio • ADK • Agent Runtime • Registry • Identity • evaluation',665,88,545,82,'#7B61A8',ICON.agents));
 c.push(mini('studio','Agent Studio','Low-code agent development',665,192,160,70,'#7B61A8'));
 c.push(mini('adk','Agent Development Kit','Code-first agent orchestration and tools',837,192,175,70,'#7B61A8'));
 c.push(mini('models','Model Garden / approved models','Select model configuration appropriate to the workload',1024,192,186,70,'#7B61A8'));
 c.push(v('runtime','', 'rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#4285F4;strokeWidth=1.5;',665,284,545,184));
 c.push(img('runtime_icon',ICON.agents,685,304,40,40));
 c.push(v('runtime_label','<b>Agent Runtime</b><br><span style="font-size:9.8px;color:#64748B">Managed deployment, operation and scaling for ADK and supported agent frameworks</span>','text;html=1;whiteSpace=wrap;overflow=hidden;spacing=4;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=12.5;',738,296,450,54));
 c.push(mini('sessions','Sessions','Conversation interaction history and context',685,374,150,72,'#4285F4','#EFF6FF'));
 c.push(mini('memory','Memory Bank — optional','Long-term memory only when intentionally configured',848,374,165,72,'#4285F4','#EFF6FF'));
 c.push(mini('code','Code Execution — optional','Managed isolated sandbox for agent-generated code',1026,374,162,72,'#4285F4','#EFF6FF'));
 c.push(mini('registry','Agent Registry','Catalog of agents, tools, MCP servers and endpoints',665,492,170,70,'#0F8B82','#ECFDF5'));
 c.push(mini('identity','Agent Identity','Unique IAM principal for authorization and audit',848,492,165,70,'#0F8B82','#ECFDF5'));
 c.push(mini('evaluation','Evaluation','Task quality and regression evidence',1026,492,184,70,'#0F8B82','#ECFDF5'));

 c.push(zone('resources',4,'TOOLS, AGENTS & ENTERPRISE DATA','Explicitly authorized destinations—never implicit access',1255,25,480,585,'#E87900','#FFF7ED'));
 c.push(mini('mcp','Remote MCP servers','Cloud Run or approved remote MCP servers',1275,92,205,76,'#E87900'));
 c.push(mini('a2a','A2A agents','Registered peer agents with explicit identity',1500,92,215,76,'#E87900'));
 c.push(card('bq','BigQuery','Governed analytical access through an approved tool/API path',1275,190,205,80,'#E87900',ICON.bigquery));
 c.push(card('gcs','Cloud Storage','Documents and object content through an approved access path',1500,190,215,80,'#E87900',ICON.gcs));
 c.push(v('saas','', 'rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#E87900;strokeWidth=1.1;',1275,292,440,116));
 c.push(img('saas_ms',ICON.microsoft,1300,315,34,34)); c.push(img('saas_sf',ICON.salesforce,1350,315,38,34)); c.push(img('saas_sn',ICON.servicenow,1404,315,36,34));
 c.push(v('saas_label','<b>Enterprise SaaS & APIs</b><br><span style="font-size:9.8px;color:#64748B">Microsoft • Salesforce • ServiceNow • approved enterprise APIs</span>','text;html=1;whiteSpace=wrap;overflow=hidden;spacing=4;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=11.5;',1460,304,235,78));
 c.push(mini('resource_rule','Destination contract','Purpose • identity • allowed operations • data scope • timeout/retry behavior • ownership',1275,430,440,76,'#E87900'));
 c.push(mini('human_action','Human authority','Consequential external actions require review/approval whenever policy or risk demands it.',1275,528,440,58,'#D93025','#FFF7F7'));

 // Primary path: labels live in open corridors between zones.
 c.push(edge('req1','host_ge','gw_client','request','#2563EB'));
 c.push(edge('req1b','host_app','gw_client','request','#2563EB'));
 c.push(edge('req2','gw_client','runtime','authorized','#2563EB'));
 c.push(edge('tool1','runtime','gw_tool','tool / agent call','#0F8B82',false,1,.62,0,.62));
 c.push(edge('tool2','gw_tool','mcp','allowed destination','#0F8B82'));
 c.push(edge('resp1','mcp','gw_tool','result','#64748B',true,0,.7,1,.7));
 c.push(edge('resp2','gw_tool','runtime','normalized result','#64748B',true,0,.75,1,.75));
 c.push(edge('resp3','runtime','gw_client','agent response','#64748B',true,0,.78,1,.78));
 c.push(edge('resp4','gw_client','host_ge','response','#64748B',true,0,.76,1,.76));

 c.push(zone('ops',5,'OPERATE, OBSERVE & AUTHORIZE','Cross-cutting production controls and evidence',25,640,1710,270,'#334155','#F8FAFC'));
 c.push(card('obs','Agent Observability','Agent/MCP health • OpenTelemetry traces • Cloud Logging / Trace • latency and failures',50,708,310,86,'#334155'));
 c.push(card('quality','Quality & Evaluation','Task success • grounded quality • regression suites • controlled improvement',380,708,310,86,'#334155'));
 c.push(card('security','Security & Data Protection','IAM • audit evidence • VPC Service Controls/CMEK/residency only where supported',710,708,310,86,'#334155'));
 c.push(card('approval','Human Authority','Named reviewer/approver before consequential or high-risk external actions',1040,708,310,86,'#D93025',undefined,'#FFF7F7'));
 c.push(card('sre','SRE & Capacity','Scaling • latency • quotas • bounded retries • rollback • incident ownership',1370,708,335,86,'#334155'));
 c.push(v('legend','<b>FLOW SEMANTICS</b>   <span style="color:#2563EB">━━ request</span>   <span style="color:#0F8B82">━━ governed tool/agent call</span>   <span style="color:#64748B">┄┄ response/result</span>','rounded=1;arcSize=7;whiteSpace=wrap;html=1;overflow=hidden;spacing=6;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;fontColor=#334155;fontSize=10.5;align=center;verticalAlign=middle;',50,816,680,48));
 c.push(v('boundary','<b>BOUNDARY:</b> Agent Gateway is one logical policy enforcement capability. Registry/Identity determine known destinations and principals. Gemini Enterprise Connectors, Notebook and Skills are not silently inherited by custom Agent Runtime agents.','rounded=1;arcSize=7;whiteSpace=wrap;html=1;overflow=hidden;spacing=7;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;fontColor=#475569;fontSize=10.5;align=left;verticalAlign=middle;',750,816,955,48));
 c.push(v('outcome','<b>PRODUCTION OUTCOME</b> — identity-aware agents • explicit destination authorization • managed runtime state • observable behavior • auditable human control','rounded=1;arcSize=7;whiteSpace=wrap;html=1;overflow=hidden;spacing=6;fillColor=#ECFDF5;strokeColor=#0F8B82;strokeWidth=1.2;fontColor=#0F172A;fontSize=11;align=center;verticalAlign=middle;',50,878,1655,24));
 return `<mxfile host="app.diagrams.net" modified="2026-08-20T00:00:00.000Z" agent="PromptCanvas" version="24.0.0" type="device"><diagram id="enterprise_agent_runtime_platform" name="Enterprise Agent Runtime on Gemini Enterprise Agent Platform"><mxGraphModel dx="1760" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1760" pageHeight="940" background="#FFFFFF"><root>${c.join('\n')}</root></mxGraphModel></diagram></mxfile>`;
}
