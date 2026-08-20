/**
 * Blueprint 42 — Smart Factory Digital Twin & Operations Platform.
 * Phase 3.2 rebuild: plant-wide ISA-95 aligned operational visibility, digital-twin
 * application pattern, quality/throughput/energy intelligence, and governed actions.
 */

const GCP='data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2048%2048%22%3E%3Cpath%20fill%3D%22%23EA4335%22%20d%3D%22M24%209.5c3.54%200%206.71%201.22%209.21%203.6l6.85-6.85C35.9%202.38%2030.47%200%2024%200%2014.62%200%206.51%205.38%202.56%2013.22l7.98%206.19C12.43%2013.72%2017.74%209.5%2024%209.5z%22%2F%3E%3Cpath%20fill%3D%22%234285F4%22%20d%3D%22M46.98%2024.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58%202.96-2.26%205.48-4.78%207.18l7.73%206c4.51-4.18%207.09-10.36%207.09-17.65z%22%2F%3E%3Cpath%20fill%3D%22%23FBBC05%22%20d%3D%22M10.53%2028.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92%2016.46%200%2020.12%200%2024c0%203.88.92%207.54%202.56%2010.78l7.97-6.19z%22%2F%3E%3Cpath%20fill%3D%22%2334A853%22%20d%3D%22M24%2048c6.48%200%2011.93-2.13%2015.89-5.81l-7.73-6c-2.15%201.45-4.92%202.3-8.16%202.3-6.26%200-11.57-4.22-13.47-9.91l-7.98%206.19C6.51%2042.62%2014.62%2048%2024%2048z%22%2F%3E%3C%2Fsvg%3E';
const ICON={bq:'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/google-bigquery/default.svg',gcs:'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/google-cloud-storage/default.svg',run:'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/google-cloud-run/default.svg',sap:'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/sap/default.svg'};
const esc=(s:string)=>s.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const v=(id:string,value:string,style:string,x:number,y:number,w:number,h:number)=>`<mxCell id="${id}" value="${esc(value)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`;
const img=(id:string,url:string,x:number,y:number,w:number,h:number)=>v(id,'',`shape=image;imageAspect=0;aspect=fixed;image=${url};align=center;verticalAlign=middle;`,x,y,w,h);
const zone=(id:string,n:number,title:string,sub:string,x:number,a:number,b:string|number,c:string|number,d?:string,e?:string)=>{
 const customGeometry=typeof b==='number'&&typeof c==='number'&&typeof d==='string'&&typeof e==='string';
 const y=customGeometry?a:25,w=customGeometry?b as number:a,h=customGeometry?c as number:635,accent=customGeometry?d!:b as string,fill=customGeometry?e!:c as string;
 return [
  v(id,'',`rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${accent};strokeWidth=1.5;`,x,y,w,h),
  v(`${id}_n`,String(n),`ellipse;whiteSpace=wrap;html=1;fillColor=${accent};strokeColor=${accent};fontColor=#FFFFFF;fontStyle=1;fontSize=13;align=center;verticalAlign=middle;`,x+14,y+15,30,30),
  v(`${id}_h`,`<b>${title}</b><br><span style="font-size:9.5px;color:#64748B">${sub}</span>`,'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=3;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=12.5;',x+54,y+10,w-68,45)
 ].join('\n');
};
const mini=(id:string,title:string,body:string,x:number,y:number,w:number,h:number,accent:string,fill='#FFFFFF')=>v(id,`<b>${title}</b><br><span style="font-size:9px;color:#64748B">${body}</span>`,`rounded=1;arcSize=7;whiteSpace=wrap;html=1;overflow=hidden;spacing=6;fillColor=${fill};strokeColor=${accent};strokeWidth=1.05;fontColor=#0F172A;fontSize=10.6;align=left;verticalAlign=middle;`,x,y,w,h);
const card=(id:string,title:string,body:string,x:number,y:number,w:number,h:number,accent:string,icon=GCP,fill='#FFFFFF')=>[
 v(id,'',`rounded=1;arcSize=8;whiteSpace=wrap;html=1;overflow=hidden;fillColor=${fill};strokeColor=${accent};strokeWidth=1.1;`,x,y,w,h),
 img(`${id}_i`,icon,x+14,y+Math.max(10,(h-36)/2),36,36),
 v(`${id}_t`,`<b>${title}</b><br><span style="font-size:9.2px;color:#64748B">${body}</span>`,'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=4;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=10.9;',x+60,y+6,w-70,h-12)
].join('\n');
const edge=(id:string,s:string,t:string,label:string,color:string,dashed=false,exitX=1,exitY=.5,entryX=0,entryY=.5)=>`<mxCell id="${id}" value="${esc(label)}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${color};strokeWidth=1.8;${dashed?'dashed=1;dashPattern=6 4;':''}endArrow=block;endFill=1;fontSize=9.2;fontColor=#334155;labelBackgroundColor=#FFFFFF;exitX=${exitX};exitY=${exitY};entryX=${entryX};entryY=${entryY};" edge="1" parent="1" source="${s}" target="${t}"><mxGeometry relative="1" as="geometry"/></mxCell>`;

export function buildSmartFactoryIotXml():string{
 const c:string[]=['<mxCell id="0"/>','<mxCell id="1" parent="0"/>'];
 c.push(zone('ot',1,'ISA-95 FACTORY OPERATIONS','Plant-wide operational sources; deterministic control remains local',25,285,'#1A73E8','#EFF6FF'));
 c.push(mini('l01','Levels 0–1: process & control','Sensors • actuators • PLCs • safety instrumented systems • robot/cell controllers',45,95,245,82,'#1A73E8'));
 c.push(mini('l2','Level 2: supervisory','SCADA • historians • alarms • machine/operator HMI • quality inspection systems',45,197,245,82,'#1A73E8'));
 c.push(mini('l3','Level 3: operations','MES • production orders • genealogy • recipes • quality • maintenance • warehouse execution',45,299,245,92,'#1A73E8'));
 c.push(mini('l4','Level 4: enterprise','ERP • EAM/CMMS • supply chain • planning • product lifecycle • business master data',45,411,245,92,'#1A73E8'));
 c.push(mini('ot_rule','OT authority boundary','Cloud/AI insights may recommend or orchestrate approved business workflows; PLC/SIS safety and millisecond control loops are not delegated to GenAI.',45,523,245,104,'#D93025','#FFF7F7'));

 c.push(zone('edge',2,'EDGE & INDUSTRIAL CONNECTIVITY','Connect, contextualize and optionally process locally',335,300,'#0F8B82','#ECFDF5'));
 c.push(card('mc','Manufacturing Connect','Industrial edge connectivity for factory assets and automation protocols',355,95,260,82,'#0F8B82'));
 c.push(card('mde','Manufacturing Data Engine','Configured factory-to-cloud ingestion, context enrichment and manufacturing common model',355,197,260,86,'#0F8B82'));
 c.push(mini('gdc','Google Distributed Cloud connected','Optional on-prem/edge Kubernetes and AI inference for latency, resilience or data-locality needs',355,303,260,94,'#0F8B82'));
 c.push(mini('edge_rules','Edge processing','Filter/aggregate low-value telemetry • local computer vision • store/forward • plant-approved protocol translation',355,417,260,86,'#0F8B82'));
 c.push(mini('northbound','Northbound events','Contextualized equipment/line state, quality events, alarms, energy, production and maintenance signals',355,523,260,84,'#0F8B82'));

 c.push(zone('cloud',3,'CLOUD DATA & EVENT FOUNDATION','Unified OT + IT data products at plant/fleet scale',660,320,'#6554C0','#F5F3FF'));
 c.push(mini('pubsub','Pub/Sub','Event distribution and decoupling for selected streaming/event workloads',680,95,280,72,'#6554C0'));
 c.push(mini('dataflow','Dataflow','Streaming/batch transformation, enrichment and routing where required',680,187,280,72,'#6554C0'));
 c.push(card('bq','BigQuery manufacturing lakehouse','Production • quality • maintenance • energy • genealogy • enterprise context',680,279,280,86,'#6554C0',ICON.bq));
 c.push(mini('ts','Bigtable / operational serving','Optional high-throughput low-latency time-series/state serving for operational applications',680,385,280,82,'#6554C0'));
 c.push(card('gcs','Cloud Storage','Images/video • engineering documents • raw archives • model and inspection artifacts',680,487,280,82,'#6554C0',ICON.gcs));
 c.push(mini('govern','Governance & lineage','Knowledge Catalog / metadata • source lineage • asset identity • data quality • access policy',680,589,280,46,'#6554C0'));

 c.push(zone('twin',4,'DIGITAL TWIN & OPERATIONS SERVICES','Application pattern for current plant state and relationships',1005,350,'#7B61A8','#F7F4FF'));
 c.push(card('twin_service','Digital Twin service','Custom domain service on Cloud Run/GKE—asset hierarchy, line/work-center relationships and current operational state',1025,95,310,92,'#7B61A8',ICON.run));
 c.push(mini('twin_store','Operational twin store','AlloyDB/Cloud SQL/other selected operational database for state, relationships and application transactions',1025,207,310,86,'#7B61A8'));
 c.push(mini('state_updates','State materialization','Consume contextualized events; update equipment/line/order state with idempotency and event-time semantics',1025,313,310,86,'#7B61A8'));
 c.push(mini('api','Operations APIs','Expose plant/fleet state to dashboards, planning apps, agents and approved enterprise integrations',1025,419,310,82,'#7B61A8'));
 c.push(mini('twin_rule','Naming rule','“Digital twin” here is an application architecture pattern, not an implied managed Google Cloud Digital Twin product.',1025,521,310,86,'#D93025','#FFF7F7'));

 c.push(zone('intelligence',5,'FACTORY INTELLIGENCE & ACTIONS','Cross-line optimization with evidence and human/OT guardrails',1400,325,'#E87900','#FFF7ED'));
 c.push(mini('oee','OEE / throughput / bottleneck analytics','BigQuery + Looker for availability, performance, quality, flow and loss analysis',1420,95,285,82,'#E87900'));
 c.push(mini('quality','Quality intelligence','Vertex AI visual/anomaly models and statistical signals for inspection and process-quality support',1420,197,285,82,'#E87900'));
 c.push(mini('energy','Energy & sustainability','Metered energy/carbon/utilities context correlated with product, line, shift and operating state',1420,299,285,82,'#E87900'));
 c.push(mini('gemini','Gemini operations assistant','Grounded explanation, troubleshooting, shift handoff and SOP/manual synthesis; cite plant evidence',1420,401,285,92,'#B83280','#FDF2F8'));
 c.push(v('sap_box','', 'rounded=1;arcSize=7;fillColor=#FFFFFF;strokeColor=#E87900;strokeWidth=1.1;',1420,513,285,94)); c.push(img('sap',ICON.sap,1440,542,48,34)); c.push(v('sap_t','<b>Enterprise workflow</b><br><span style="font-size:9px;color:#64748B">ERP / EAM / MES / quality systems • approved work orders • planning changes • notifications</span>','text;html=1;whiteSpace=wrap;overflow=hidden;spacing=4;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=10.5;',1503,525,185,68));

 c.push(edge('e1','l2','mc','industrial data','#2563EB')); c.push(edge('e2','mc','mde','contextualize','#0F8B82')); c.push(edge('e3','mde','pubsub','northbound events','#6554C0')); c.push(edge('e4','dataflow','bq','curated data','#6554C0')); c.push(edge('e5','pubsub','state_updates','state event','#7B61A8')); c.push(edge('e6','state_updates','twin_service','current state','#7B61A8')); c.push(edge('e7','twin_service','oee','operations context','#E87900')); c.push(edge('e8','gemini','sap_box','approved workflow intent','#E87900')); c.push(edge('e9','sap_box','l3','business/operations update','#64748B',true,0,.6,1,.7));

 c.push(zone('ops',6,'CROSS-CUTTING PLATFORM & GOVERNANCE','Plant cyber boundaries, data governance, observability and reliability',25,690,1700,230,'#334155','#F8FAFC'));
 c.push(mini('sec','Security segmentation','IAM/workload identity • plant DMZ • private connectivity • firewall policy • encryption/KMS • supported VPC-SC services',50,756,300,92,'#334155'));
 c.push(mini('obs','Observability','Cloud Monitoring/Logging • MDE/edge connectivity health • event lag • data freshness • twin/API SLOs',370,756,300,92,'#334155'));
 c.push(mini('res','Resilience','Store-and-forward at edge • idempotent event processing • retry/DLQ patterns • disconnected-mode behavior where required',690,756,300,92,'#334155'));
 c.push(mini('gov','Data & AI governance','Asset/data ownership • model/evaluation evidence • access boundaries • retention • change approval • audit',1010,756,300,92,'#334155'));
 c.push(mini('outcomes','Plant outcomes','OEE • yield • first-pass quality • schedule adherence • energy intensity • downtime • safe time-to-action',1330,756,370,92,'#334155'));
 c.push(v('legend','<b>FLOW</b>  <span style="color:#2563EB">━━ OT source</span>  <span style="color:#0F8B82">━━ edge/context</span>  <span style="color:#6554C0">━━ data/event</span>  <span style="color:#7B61A8">━━ twin state/API</span>  <span style="color:#E87900">━━ governed operation</span>  <span style="color:#64748B">┄┄ enterprise feedback</span>','rounded=1;arcSize=6;whiteSpace=wrap;html=1;overflow=hidden;spacing=5;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;fontColor=#334155;fontSize=10;align=center;verticalAlign=middle;',50,866,1650,34));
 return `<mxfile host="app.diagrams.net" modified="2026-08-20T00:00:00.000Z" agent="PromptCanvas" version="24.0.0" type="device"><diagram id="smart_factory_digital_twin_operations" name="Smart Factory Digital Twin and Operations Platform"><mxGraphModel dx="1760" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1760" pageHeight="950" background="#FFFFFF"><root>${c.join('\n')}</root></mxGraphModel></diagram></mxfile>`;
}
