/** Blueprint 15 — Multi-Agent Execution Lifeline Sequence Diagram. */
const BASE='https://cdn.jsdelivr.net/npm/gcp-icons@1.0.6/dist/icons/';
const ICON={agents:`${BASE}agents-512-color.svg`,bigquery:`${BASE}bigquery-512-color.svg`,storage:`${BASE}cloud-storage-512-color.svg`};
const esc=(s:string)=>s.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const v=(id:string,value:string,style:string,x:number,y:number,w:number,h:number)=>`<mxCell id="${id}" value="${esc(value)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`;
const img=(id:string,url:string,x:number,y:number,w:number,h:number)=>v(id,'',`shape=image;imageAspect=0;aspect=fixed;image=${url};align=center;verticalAlign=middle;`,x,y,w,h);
const actor=(id:string,title:string,sub:string,x:number,w:number,accent:string,icon?:string)=>[
 v(id,'',`rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=${accent};strokeWidth=1.4;`,x,70,w,64),
 icon?img(`${id}_icon`,icon,x+12,85,30,30):'',
 v(`${id}_label`,`<b>${title}</b><br><span style="font-size:9.8px;color:#64748B">${sub}</span>`,'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=3;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=11.5;',x+(icon?50:12),77,w-(icon?60:24),50),
 v(`${id}_life`,'',`shape=line;html=1;strokeColor=#94A3B8;strokeWidth=1;dashed=1;dashPattern=6 5;`,x+w/2,134,1,700)
].filter(Boolean).join('\n');
const activation=(id:string,x:number,y:number,h:number,color:string)=>v(id,'',`rounded=0;whiteSpace=wrap;html=1;fillColor=${color};strokeColor=${color};strokeWidth=1;`,x-5,y,10,h);
const msg=(id:string,label:string,x1:number,x2:number,y:number,color='#2563EB',dashed=false)=>`<mxCell id="${id}" value="${esc(label)}" style="edgeStyle=none;html=1;${dashed?'dashed=1;dashPattern=6 4;':''}strokeWidth=1.8;strokeColor=${color};endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;fontColor=#334155;fontSize=10.5;align=center;verticalAlign=bottom;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="${x1}" y="${y}" as="sourcePoint"/><mxPoint x="${x2}" y="${y}" as="targetPoint"/><mxPoint x="0" y="-8" as="offset"/></mxGeometry></mxCell>`;
const step=(n:number,x:number,y:number)=>v(`step_${n}`,String(n),'ellipse;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#0F172A;fontColor=#FFFFFF;fontStyle=1;fontSize=10;align=center;verticalAlign=middle;',x,y-10,20,20);
const note=(id:string,title:string,body:string,x:number,y:number,w:number,h:number,accent:string,fill='#FFFFFF')=>v(id,`<b>${title}</b><br><span style="font-size:9.8px;color:#475569">${body}</span>`,`rounded=1;arcSize=7;whiteSpace=wrap;html=1;overflow=hidden;spacing=6;fillColor=${fill};strokeColor=${accent};strokeWidth=1.1;fontColor=#0F172A;fontSize=10.8;align=left;verticalAlign=middle;`,x,y,w,h);

export function buildMultiAgentSequenceXml():string{
 const x={user:105,host:325,coord:565,gw:805,rag:1045,analytics:1285,data:1535};
 const c:string[]=['<mxCell id="0"/>','<mxCell id="1" parent="0"/>'];
 c.push(v('purpose','<b>MULTI-AGENT EXECUTION SEQUENCE</b>   Governed delegation, retrieval, analytics, human authority and cited response — architecture shows observable decisions and tool activity, not private chain-of-thought.','rounded=1;arcSize=7;whiteSpace=wrap;html=1;overflow=hidden;spacing=7;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.2;fontColor=#334155;fontSize=11.5;align=center;verticalAlign=middle;',35,18,1690,36));
 c.push(actor('user','User / Requestor','Human or calling application',35,140,'#64748B'));
 c.push(actor('host','Gemini Enterprise','Assistant / agent experience',245,160,'#1A73E8'));
 c.push(actor('coord','Coordinator Agent','Agent Runtime • ADK',485,160,'#7B61A8',ICON.agents));
 c.push(actor('gw','Agent Gateway','Policy enforcement',725,160,'#D93025',ICON.agents));
 c.push(actor('rag','Retrieval Specialist','Registered agent / subagent',965,160,'#0F8B82',ICON.agents));
 c.push(actor('analytics','Analytics Specialist','Registered agent / subagent',1205,160,'#0F8B82',ICON.agents));
 c.push(actor('data','Enterprise Data & Tools','RAG corpus • BigQuery',1450,170,'#E87900'));
 c.push(img('data_bq',ICON.bigquery,1465,84,28,28)); c.push(img('data_storage',ICON.storage,1498,84,28,28));

 c.push(activation('act_host',x.host,160,620,'#DBEAFE')); c.push(activation('act_coord',x.coord,205,555,'#EDE9FE')); c.push(activation('act_gw',x.gw,245,470,'#FEE2E2')); c.push(activation('act_rag',x.rag,320,150,'#CCFBF1')); c.push(activation('act_analytics',x.analytics,510,130,'#CCFBF1')); c.push(activation('act_data',x.data,365,310,'#FEF3C7'));

 const rows=[
  [1,'Submit task + user context',x.user,x.host,168,'#2563EB',false],
  [2,'Invoke registered coordinator',x.host,x.coord,210,'#2563EB',false],
  [3,'Authorize delegation policy',x.coord,x.gw,252,'#7B61A8',false],
  [4,'Delegate retrieval task (A2A when remote)',x.gw,x.rag,294,'#0F8B82',false],
  [5,'Retrieve permission-aware evidence',x.rag,x.data,336,'#0F8B82',false],
  [6,'Evidence + source provenance',x.data,x.rag,378,'#64748B',true],
  [7,'Grounded specialist result',x.rag,x.gw,420,'#64748B',true],
  [8,'Authorized result to coordinator',x.gw,x.coord,462,'#64748B',true],
  [9,'Request governed analytics task',x.coord,x.gw,504,'#7B61A8',false],
  [10,'Delegate analytics task',x.gw,x.analytics,546,'#0F8B82',false],
  [11,'Execute approved BigQuery query',x.analytics,x.data,588,'#0F8B82',false],
  [12,'Query result + audit context',x.data,x.analytics,630,'#64748B',true],
  [13,'Validated analytics result',x.analytics,x.gw,672,'#64748B',true],
  [14,'Return specialist result',x.gw,x.coord,714,'#64748B',true],
  [15,'Compose grounded response + citations',x.coord,x.host,756,'#2563EB',true],
  [16,'Deliver response / proposed action',x.host,x.user,798,'#2563EB',true],
 ] as const;
 for(const [n,label,a,b,y,color,dashed] of rows){c.push(step(n,Math.min(a,b)+8,y));c.push(msg(`m${n}`,label,a,b,y,color,dashed));}

 c.push(note('decision_note','Coordinator decision record','Record selected specialist/tool, policy result, evidence references and confidence/quality signals. Do not persist or display private model chain-of-thought.',450,850,430,66,'#7B61A8','#F7F4FF'));
 c.push(note('human_note','Human authority — conditional','Before consequential external actions, route the proposed action to an authorized reviewer. APPROVE continues; REVISE/REJECT returns to the coordinator with an auditable decision.',900,850,510,66,'#D93025','#FFF7F7'));
 c.push(note('legend','SEQUENCE SEMANTICS','Solid = request/delegation/tool call • Dashed = result/response • A2A only for separately deployed registered agents • local ADK subagents can remain in-process.',1430,850,295,66,'#334155','#F8FAFC'));

 return `<mxfile host="app.diagrams.net" modified="2026-08-20T00:00:00.000Z" agent="PromptCanvas" version="24.0.0" type="device"><diagram id="multi_agent_execution_sequence" name="Multi-Agent Execution Lifeline Sequence Diagram"><mxGraphModel dx="1760" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1760" pageHeight="940" background="#FFFFFF"><root>${c.join('\n')}</root></mxGraphModel></diagram></mxfile>`;
}
