/**
 * Blueprint 22 — AI TRiSM Runtime Guardrail Architecture.
 * Phase 3.2 rebuild aligned to Gemini Enterprise Agent Platform governance.
 * TRiSM is represented as an operating/control model; enforcement is provided by
 * concrete Google Cloud services such as Agent Gateway, IAM/Agent Identity and Model Armor.
 */

const GCP='data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2048%2048%22%3E%3Cpath%20fill%3D%22%23EA4335%22%20d%3D%22M24%209.5c3.54%200%206.71%201.22%209.21%203.6l6.85-6.85C35.9%202.38%2030.47%200%2024%200%2014.62%200%206.51%205.38%202.56%2013.22l7.98%206.19C12.43%2013.72%2017.74%209.5%2024%209.5z%22%2F%3E%3Cpath%20fill%3D%22%234285F4%22%20d%3D%22M46.98%2024.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58%202.96-2.26%205.48-4.78%207.18l7.73%206c4.51-4.18%207.09-10.36%207.09-17.65z%22%2F%3E%3Cpath%20fill%3D%22%23FBBC05%22%20d%3D%22M10.53%2028.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92%2016.46%200%2020.12%200%2024c0%203.88.92%207.54%202.56%2010.78l7.97-6.19z%22%2F%3E%3Cpath%20fill%3D%22%2334A853%22%20d%3D%22M24%2048c6.48%200%2011.93-2.13%2015.89-5.81l-7.73-6c-2.15%201.45-4.92%202.3-8.16%202.3-6.26%200-11.57-4.22-13.47-9.91l-7.98%206.19C6.51%2042.62%2014.62%2048%2024%2048z%22%2F%3E%3C%2Fsvg%3E';
const esc=(s:string)=>s.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const v=(id:string,value:string,style:string,x:number,y:number,w:number,h:number)=>`<mxCell id="${id}" value="${esc(value)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`;
const img=(id:string,url:string,x:number,y:number,w:number,h:number)=>v(id,'',`shape=image;imageAspect=0;aspect=fixed;image=${url};align=center;verticalAlign=middle;`,x,y,w,h);
const zone=(id:string,n:number,title:string,sub:string,x:number,a:number,b:string|number,c:string|number,d?:string,e?:string)=>{
 const customGeometry=typeof b==='number'&&typeof c==='number'&&typeof d==='string'&&typeof e==='string';
 const y=customGeometry?a:25,w=customGeometry?b as number:a,h=customGeometry?c as number:625,accent=customGeometry?d!:b as string,fill=customGeometry?e!:c as string;
 return [
  v(id,'',`rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${accent};strokeWidth=1.5;`,x,y,w,h),
  v(`${id}_n`,String(n),`ellipse;whiteSpace=wrap;html=1;fillColor=${accent};strokeColor=${accent};fontColor=#FFFFFF;fontStyle=1;fontSize=13;align=center;verticalAlign=middle;`,x+14,y+15,30,30),
  v(`${id}_h`,`<b>${title}</b><br><span style="font-size:9.5px;color:#64748B">${sub}</span>`,'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=3;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=12.5;',x+54,y+10,w-68,45)
 ].join('\n');
};
const mini=(id:string,title:string,body:string,x:number,y:number,w:number,h:number,accent:string,fill='#FFFFFF')=>v(id,`<b>${title}</b><br><span style="font-size:9px;color:#64748B">${body}</span>`,`rounded=1;arcSize=7;whiteSpace=wrap;html=1;overflow=hidden;spacing=6;fillColor=${fill};strokeColor=${accent};strokeWidth=1.05;fontColor=#0F172A;fontSize=10.6;align=left;verticalAlign=middle;`,x,y,w,h);
const card=(id:string,title:string,body:string,x:number,y:number,w:number,h:number,accent:string,fill='#FFFFFF')=>[
 v(id,'',`rounded=1;arcSize=8;whiteSpace=wrap;html=1;overflow=hidden;fillColor=${fill};strokeColor=${accent};strokeWidth=1.1;`,x,y,w,h),
 img(`${id}_i`,GCP,x+14,y+Math.max(10,(h-36)/2),36,36),
 v(`${id}_t`,`<b>${title}</b><br><span style="font-size:9.2px;color:#64748B">${body}</span>`,'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=4;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=10.9;',x+60,y+6,w-70,h-12)
].join('\n');
const edge=(id:string,s:string,t:string,label:string,color:string,dashed=false,exitX=1,exitY=.5,entryX=0,entryY=.5)=>`<mxCell id="${id}" value="${esc(label)}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${color};strokeWidth=1.8;${dashed?'dashed=1;dashPattern=6 4;':''}endArrow=block;endFill=1;fontSize=9.2;fontColor=#334155;labelBackgroundColor=#FFFFFF;exitX=${exitX};exitY=${exitY};entryX=${entryX};entryY=${entryY};" edge="1" parent="1" source="${s}" target="${t}"><mxGeometry relative="1" as="geometry"/></mxCell>`;

export function buildAiTrismGuardrailsXml():string{
 const c:string[]=['<mxCell id="0"/>','<mxCell id="1" parent="0"/>'];
 c.push(v('principle','<b>AI TRiSM RUNTIME GUARDRAILS</b>   Trust, risk and security are an operating model. Runtime enforcement is implemented through explicit identity, authorization, content-security and observability controls—not a fictional all-in-one “TRiSM engine.”','rounded=1;arcSize=7;whiteSpace=wrap;html=1;overflow=hidden;spacing=7;fillColor=#F8FBFF;strokeColor=#8AB4F8;strokeWidth=1.2;fontColor=#334155;fontSize=11;align=center;verticalAlign=middle;',25,15,1710,40));

 c.push(zone('host',1,'CLIENTS & AGENT HOSTS','Requests enter with identity and application context',25,285,'#1A73E8','#EFF6FF'));
 c.push(card('ge','Gemini Enterprise / Agent Platform','Employee or custom agent experience using governed runtime paths',45,95,245,86,'#1A73E8'));
 c.push(mini('apps','Calling applications','Web/API/mobile/automation callers with authenticated application or user context',45,201,245,82,'#1A73E8'));
 c.push(mini('context','Security context','Caller identity • agent identity • tenant/project • task • data class • requested destination',45,303,245,82,'#1A73E8'));
 c.push(mini('risk','Risk classification','Autonomy • external action • sensitive data • regulated process • consequence of error',45,405,245,92,'#1A73E8'));
 c.push(mini('boundary','Scope boundary','Do not expose or log private chain-of-thought. Capture decisions, tool calls, sources, policy outcomes and audit evidence instead.',45,517,245,98,'#D93025','#FFF7F7'));

 c.push(zone('ingress',2,'CLIENT-TO-AGENT GUARDRAILS','Authenticate path and screen live content before execution',335,300,'#D93025','#FEF2F2'));
 c.push(card('ingress_gateway','Agent Gateway — ingress','Managed ingress path for governed client-to-agent interactions',355,95,260,82,'#D93025'));
 c.push(mini('ingress_auth','Ingress authorization policy','Apply supported gateway authorization configuration; validate the caller/application path separately from agent egress IAM.',355,197,260,90,'#D93025'));
 c.push(card('armor_in','Model Armor — ingress','Configured prompt injection/jailbreak • harmful content • malicious URL/file • sensitive-data screening',355,307,260,96,'#D93025','#FFF7F7'));
 c.push(mini('template_in','Policy template','Organization-specific filters, thresholds and block/redact behavior; template/version is part of release evidence',355,423,260,86,'#D93025'));
 c.push(mini('blocked','Blocked / sanitized path','Return a controlled policy outcome; do not send rejected content to the agent runtime.',355,529,260,70,'#D93025','#FFF7F7'));

 c.push(zone('runtime',3,'AGENT RUNTIME & MODEL EXECUTION','Only policy-qualified requests proceed',660,355,'#7B61A8','#F7F4FF'));
 c.push(card('runtime_core','Agent Runtime','Managed execution for ADK/supported agents with sessions and configured memory/tool behavior',680,95,315,86,'#7B61A8'));
 c.push(mini('model','Approved model configuration','Configured Gemini/approved model • tool/function calling • structured response contract',680,201,315,82,'#7B61A8'));
 c.push(mini('grounding','Grounding & evidence','Use configured enterprise search/RAG/data path; preserve citations/provenance where the use case requires it',680,303,315,86,'#7B61A8'));
 c.push(mini('action_policy','Agent decision policy','Select approved tool/agent/data call based on purpose and delegated authorization; no implicit unrestricted access',680,409,315,88,'#7B61A8'));
 c.push(mini('human','Human authority','Pause for approval before consequential, irreversible or regulated actions when policy requires it',680,517,315,82,'#D93025','#FFF7F7'));

 c.push(zone('egress',4,'AGENT-TO-ANYWHERE GUARDRAILS','Authorize destinations and inspect outbound interactions',1040,335,'#0F8B82','#ECFDF5'));
 c.push(card('egress_gateway','Agent Gateway — egress','Central enforcement path for registered agent-to-tool, model, API, MCP and agent traffic',1060,95,295,88,'#0F8B82'));
 c.push(mini('registry','Agent Registry allowlist','Register intended tools, MCP servers, API endpoints and peer agents; unknown outbound hosts are denied by gateway policy.',1060,203,295,92,'#0F8B82'));
 c.push(mini('identity','Agent Identity + IAP/IAM','Use the agent principal and supported authorization policy to grant least-privilege destination access',1060,315,295,92,'#0F8B82'));
 c.push(card('armor_out','Model Armor — egress','Optional inspection of tool/MCP/model requests and responses for leakage, injection and unsafe content',1060,427,295,96,'#0F8B82','#F0FDFA'));
 c.push(mini('destinations','Authorized destinations','Enterprise APIs • remote MCP • A2A agents • Google Cloud services • model endpoints as registered and allowed',1060,543,295,56,'#0F8B82'));

 c.push(zone('response',5,'RESPONSE & ACTION RELEASE','Validate what leaves the governed agent system',1400,335,'#E87900','#FFF7ED'));
 c.push(mini('response_policy','Response policy','Required citations/evidence • structured schema • safety verdict • no secrets/credentials in user-visible output',1420,95,295,88,'#E87900'));
 c.push(mini('action_gate','Action release gate','For high-impact actions: human approval / deterministic business rule / transaction controls as defined by the application',1420,203,295,94,'#D93025','#FFF7F7'));
 c.push(mini('consumer','Verified consumer response','Return answer, tool result or workflow status with policy/audit context appropriate to the experience',1420,317,295,88,'#E87900'));
 c.push(mini('denial','Denied response/action','Fail closed when required authorization or content-security conditions are not satisfied',1420,425,295,80,'#D93025','#FFF7F7'));
 c.push(mini('experience_rule','Experience-specific controls','Gemini Enterprise connector/assistant paths and custom Agent Platform paths can have different enforcement surfaces—model them explicitly.',1420,525,295,74,'#E87900'));

 c.push(edge('r1','ge','ingress_gateway','request','#2563EB')); c.push(edge('r2','ingress_gateway','armor_in','screen','#D93025')); c.push(edge('r3','armor_in','runtime_core','allowed / sanitized','#7B61A8')); c.push(edge('r4','action_policy','egress_gateway','tool / agent / model call','#0F8B82')); c.push(edge('r5','egress_gateway','destinations','authorized destination','#0F8B82')); c.push(edge('r6','destinations','armor_out','result','#64748B',true,0,.7,1,.7)); c.push(edge('r7','armor_out','response_policy','screened result','#E87900')); c.push(edge('r8','response_policy','consumer','release','#E87900')); c.push(edge('r9','consumer','ingress_gateway','response','#64748B',true,0,.7,1,.75)); c.push(edge('r10','ingress_gateway','ge','response','#64748B',true,0,.75,1,.75));

 c.push(zone('ops',6,'TRUST, RISK & SECURITY OPERATING PLANE','Evidence, monitoring, incident response and controlled change',25,680,1710,255,'#334155','#F8FAFC'));
 c.push(mini('content_monitor','Content security monitoring','Model Armor findings/spans • blocked/redacted outcomes • false-positive review • template effectiveness',50,750,300,94,'#334155'));
 c.push(mini('agent_obs','Agent Observability','Agent/tool/MCP traces • dependencies • latency • errors • authorization outcomes • anomalous behavior',370,750,300,94,'#334155'));
 c.push(mini('audit','Audit & evidence','Cloud Audit Logs / platform telemetry • policy versions • release version • approval evidence • incident timeline',690,750,300,94,'#334155'));
 c.push(mini('incident','Incident response','Limit/disable agent • revoke permission • block destination • update guardrail template • preserve evidence • restore known-good state',1010,750,300,94,'#D93025','#FFF7F7'));
 c.push(mini('governance','Governance loop','Security/privacy/data/AI owners review material changes, exceptions, new tools/data, new jurisdictions and recurring incidents',1330,750,370,94,'#334155'));
 c.push(v('legend','<b>FLOW</b>  <span style="color:#2563EB">━━ client request</span>  <span style="color:#D93025">━━ ingress screening</span>  <span style="color:#7B61A8">━━ qualified runtime</span>  <span style="color:#0F8B82">━━ governed egress</span>  <span style="color:#E87900">━━ response/action release</span>  <span style="color:#64748B">┄┄ return</span>','rounded=1;arcSize=6;whiteSpace=wrap;html=1;overflow=hidden;spacing=5;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;fontColor=#334155;fontSize=10;align=center;verticalAlign=middle;',50,867,1650,38));
 return `<mxfile host="app.diagrams.net" modified="2026-08-20T00:00:00.000Z" agent="PromptCanvas" version="24.0.0" type="device"><diagram id="ai_trism_runtime_guardrails" name="AI TRiSM Runtime Guardrail Architecture"><mxGraphModel dx="1760" dy="960" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1760" pageHeight="960" background="#FFFFFF"><root>${c.join('\n')}</root></mxGraphModel></diagram></mxfile>`;
}
