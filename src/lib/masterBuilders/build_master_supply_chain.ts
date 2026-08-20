/**
 * Blueprint 39 — Equipment Predictive Maintenance & Reliability Intelligence.
 * Phase 3.2 rebuild: equipment-centric condition monitoring and maintenance workflow.
 * Safety rule: AI recommends and prioritizes; deterministic PLC/SIS controls remain authoritative.
 */

const GCP='data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2048%2048%22%3E%3Cpath%20fill%3D%22%23EA4335%22%20d%3D%22M24%209.5c3.54%200%206.71%201.22%209.21%203.6l6.85-6.85C35.9%202.38%2030.47%200%2024%200%2014.62%200%206.51%205.38%202.56%2013.22l7.98%206.19C12.43%2013.72%2017.74%209.5%2024%209.5z%22%2F%3E%3Cpath%20fill%3D%22%234285F4%22%20d%3D%22M46.98%2024.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58%202.96-2.26%205.48-4.78%207.18l7.73%206c4.51-4.18%207.09-10.36%207.09-17.65z%22%2F%3E%3Cpath%20fill%3D%22%23FBBC05%22%20d%3D%22M10.53%2028.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92%2016.46%200%2020.12%200%2024c0%203.88.92%207.54%202.56%2010.78l7.97-6.19z%22%2F%3E%3Cpath%20fill%3D%22%2334A853%22%20d%3D%22M24%2048c6.48%200%2011.93-2.13%2015.89-5.81l-7.73-6c-2.15%201.45-4.92%202.3-8.16%202.3-6.26%200-11.57-4.22-13.47-9.91l-7.98%206.19C6.51%2042.62%2014.62%2048%2024%2048z%22%2F%3E%3C%2Fsvg%3E';
const ICON={bq:'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/google-bigquery/default.svg',gcs:'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/google-cloud-storage/default.svg',sap:'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/sap/default.svg',servicenow:'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/servicenow/default.svg'};
const esc=(s:string)=>s.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const v=(id:string,value:string,style:string,x:number,y:number,w:number,h:number)=>`<mxCell id="${id}" value="${esc(value)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`;
const img=(id:string,url:string,x:number,y:number,w:number,h:number)=>v(id,'',`shape=image;imageAspect=0;aspect=fixed;image=${url};align=center;verticalAlign=middle;`,x,y,w,h);
const zone=(id:string,n:number,title:string,sub:string,x:number,w:number,accent:string,fill:string)=>[
 v(id,'',`rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${accent};strokeWidth=1.5;`,x,25,w,620),
 v(`${id}_n`,String(n),`ellipse;whiteSpace=wrap;html=1;fillColor=${accent};strokeColor=${accent};fontColor=#FFFFFF;fontStyle=1;fontSize=13;align=center;verticalAlign=middle;`,x+14,40,30,30),
 v(`${id}_h`,`<b>${title}</b><br><span style="font-size:9.5px;color:#64748B">${sub}</span>`,'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=3;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=12.5;',x+54,35,w-68,45)
].join('\n');
const card=(id:string,title:string,body:string,x:number,y:number,w:number,h:number,accent:string,icon=GCP,fill='#FFFFFF')=>[
 v(id,'',`rounded=1;arcSize=8;whiteSpace=wrap;html=1;overflow=hidden;fillColor=${fill};strokeColor=${accent};strokeWidth=1.1;`,x,y,w,h),
 v(`${id}_bar`,'',`rounded=1;arcSize=4;fillColor=${accent};strokeColor=${accent};`,x,y,5,h),
 img(`${id}_i`,icon,x+14,y+Math.max(10,(h-36)/2),36,36),
 v(`${id}_t`,`<b>${title}</b><br><span style="font-size:9.2px;color:#64748B">${body}</span>`,'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=4;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=10.9;',x+60,y+6,w-70,h-12)
].join('\n');
const mini=(id:string,title:string,body:string,x:number,y:number,w:number,h:number,accent:string,fill='#FFFFFF')=>v(id,`<b>${title}</b><br><span style="font-size:9px;color:#64748B">${body}</span>`,`rounded=1;arcSize=7;whiteSpace=wrap;html=1;overflow=hidden;spacing=6;fillColor=${fill};strokeColor=${accent};strokeWidth=1.05;fontColor=#0F172A;fontSize=10.6;align=left;verticalAlign=middle;`,x,y,w,h);
const edge=(id:string,s:string,t:string,label:string,color:string,dashed=false,exitX=1,exitY=.5,entryX=0,entryY=.5)=>`<mxCell id="${id}" value="${esc(label)}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${color};strokeWidth=1.8;${dashed?'dashed=1;dashPattern=6 4;':''}endArrow=block;endFill=1;fontSize=9.2;fontColor=#334155;labelBackgroundColor=#FFFFFF;exitX=${exitX};exitY=${exitY};entryX=${entryX};entryY=${entryY};" edge="1" parent="1" source="${s}" target="${t}"><mxGeometry relative="1" as="geometry"/></mxCell>`;

export function buildSupplyChainXml():string{return buildManufacturingOptimizationXml();}
export function buildManufacturingOptimizationXml():string{
 const c:string[]=['<mxCell id="0"/>','<mxCell id="1" parent="0"/>'];
 c.push(zone('assets',1,'EQUIPMENT & CONDITION SIGNALS','Asset-centric telemetry and inspection evidence',25,285,'#1A73E8','#EFF6FF'));
 c.push(mini('equipment','Critical equipment','Rotating assets • pumps • compressors • motors • CNC/robotics • production equipment',45,95,245,82,'#1A73E8'));
 c.push(mini('telemetry','Condition telemetry','Vibration • temperature • pressure • current • acoustic • runtime counters',45,197,245,82,'#1A73E8'));
 c.push(mini('vision','Inspection evidence','Images/video • thermal inspection • technician observations • maintenance history',45,299,245,82,'#1A73E8'));
 c.push(mini('ot','OT systems','PLC / SCADA / historian / MES remain systems of operational control and source context',45,401,245,82,'#1A73E8'));
 c.push(mini('safety_boundary','Safety boundary','SIS/PLC interlocks and deterministic control loops remain authoritative; GenAI does not directly override setpoints.',45,503,245,112,'#D93025','#FFF7F7'));

 c.push(zone('connect',2,'FACTORY-TO-CLOUD DATA','Industrial connectivity and contextualization',335,300,'#0F8B82','#ECFDF5'));
 c.push(card('mc','Manufacturing Connect','Factory-edge connectivity across industrial protocols and automation sources',355,95,260,86,'#0F8B82'));
 c.push(card('mde','Manufacturing Data Engine','Ingest, contextualize and store factory data using the configured common model',355,201,260,86,'#0F8B82'));
 c.push(mini('stream','Pub/Sub + Dataflow','Event distribution and streaming transformation when the selected MDE/downstream design requires it',355,307,260,82,'#0F8B82'));
 c.push(mini('quality','Data quality & asset context','Asset identity • timestamps • units • operating mode • sensor quality • maintenance context',355,409,260,88,'#0F8B82'));
 c.push(mini('edge_ai','Optional edge AI','Google Distributed Cloud connected for latency-sensitive local inference/processing where justified',355,517,260,78,'#0F8B82'));

 c.push(zone('data',3,'RELIABILITY DATA FOUNDATION','Time-series, history and governed analytical context',660,285,'#6554C0','#F5F3FF'));
 c.push(card('bq','BigQuery','Fleet history • maintenance outcomes • reliability features • analytical marts',680,95,245,86,'#6554C0',ICON.bq));
 c.push(card('gcs','Cloud Storage','Inspection media • raw files • model artifacts/evidence as appropriate',680,201,245,82,'#6554C0',ICON.gcs));
 c.push(mini('timeseries','Bigtable / time-series serving','Optional low-latency high-volume condition signal serving when the workload needs it',680,303,245,82,'#6554C0'));
 c.push(mini('history','CMMS / ERP history','Work orders • failure codes • parts • technician notes • asset hierarchy',680,405,245,82,'#6554C0'));
 c.push(mini('governed','Governed features & provenance','Training/serving feature definition • source lineage • versioned labels • access controls',680,507,245,88,'#6554C0'));

 c.push(zone('ai',4,'PREDICTIVE & DIAGNOSTIC AI','Detect, predict and explain with evidence',970,330,'#B83280','#FDF2F8'));
 c.push(card('vertex','Vertex AI','Train/evaluate/deploy anomaly, classification or remaining-useful-life models as appropriate',990,95,290,86,'#B83280'));
 c.push(mini('detect','Condition & anomaly scoring','Combine engineered telemetry features and optional visual signals; output confidence and evidence',990,201,290,84,'#B83280'));
 c.push(mini('predict','Failure-risk / RUL estimate','Use only where labeled history and validation support predictive targets; preserve uncertainty',990,305,290,84,'#B83280'));
 c.push(mini('gemini','Gemini maintenance assistant','Ground technician summaries and recommended next steps in asset evidence, manuals and approved maintenance history',990,409,290,96,'#B83280'));
 c.push(mini('eval','Evaluation & drift','Backtest • false-positive/negative review • model monitoring • task-quality checks • threshold calibration',990,525,290,70,'#B83280'));

 c.push(zone('action',5,'MAINTENANCE DECISION & EXECUTION','Human-authorized action with measurable feedback',1325,410,'#E87900','#FFF7ED'));
 c.push(mini('priority','Prioritize maintenance','Risk × criticality × confidence × operating window → inspect / plan / monitor',1345,95,370,78,'#E87900'));
 c.push(mini('human','Reliability / technician review','Validate evidence, safety implications and action recommendation before consequential work',1345,193,370,86,'#D93025','#FFF7F7'));
 c.push(v('systems_bg','', 'rounded=1;arcSize=7;fillColor=#FFFFFF;strokeColor=#E87900;strokeWidth=1.1;',1345,299,370,104));
 c.push(img('sap',ICON.sap,1365,323,50,36)); c.push(img('sn',ICON.servicenow,1430,322,42,38));
 c.push(v('systems_t','<b>CMMS / EAM / ITSM execution</b><br><span style="font-size:9.2px;color:#64748B">SAP PM/EAM • ServiceNow or approved enterprise work-management system • parts/planning APIs</span>','text;html=1;whiteSpace=wrap;overflow=hidden;spacing=4;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=10.8;',1490,312,210,76));
 c.push(mini('workorder','Work order / inspection task','Create or enrich an authorized maintenance task; never treat an LLM recommendation as a safety command',1345,423,370,82,'#E87900'));
 c.push(mini('feedback','Outcome feedback','Failure confirmed? action taken? downtime avoided? parts replaced? feed validated outcomes back to analytics/evaluation',1345,525,370,70,'#0F8B82','#ECFDF5'));

 c.push(edge('f1','telemetry','mc','industrial data','#2563EB')); c.push(edge('f2','mc','mde','contextualize','#0F8B82')); c.push(edge('f3','mde','bq','curated history','#6554C0')); c.push(edge('f4','bq','vertex','train / score','#B83280')); c.push(edge('f5','vertex','priority','risk signal','#B83280')); c.push(edge('f6','priority','human','recommendation','#E87900')); c.push(edge('f7','human','workorder','approved action','#E87900')); c.push(edge('f8','feedback','bq','validated outcome','#0F8B82',true,0,.5,1,.75));

 c.push(zone('ops',6,'CROSS-CUTTING RELIABILITY, SECURITY & OPERATIONS','Controls apply according to data class, risk and plant architecture',25,675,1700,235,'#334155','#F8FAFC'));
 c.push(mini('sec','Security & identity','IAM • workload identity • encryption/KMS • network segmentation • VPC Service Controls only for supported cloud services',50,742,300,96,'#334155'));
 c.push(mini('obs','Observability','Cloud Monitoring/Logging • pipeline health • model endpoint health • data freshness • alert routing',370,742,300,96,'#334155'));
 c.push(mini('modelgov','Model governance','Versioned data/model/evaluation • approval evidence • rollback • retraining triggers • owner',690,742,300,96,'#334155'));
 c.push(mini('otsec','OT/IT boundary','Industrial DMZ / approved routes • no implicit cloud-to-PLC write path • plant safety and cyber policy dominate',1010,742,300,96,'#D93025','#FFF7F7'));
 c.push(mini('value','Reliability outcomes','Leading indicators: precision/recall at useful horizon, alert burden, planned-vs-unplanned work, downtime and maintenance effectiveness',1330,742,370,96,'#334155'));
 c.push(v('legend','<b>FLOW</b>  <span style="color:#2563EB">━━ factory signals</span>  <span style="color:#0F8B82">━━ contextualized/feedback data</span>  <span style="color:#6554C0">━━ analytical history</span>  <span style="color:#B83280">━━ AI evidence</span>  <span style="color:#E87900">━━ authorized maintenance action</span>','rounded=1;arcSize=6;whiteSpace=wrap;html=1;overflow=hidden;spacing=5;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;fontColor=#334155;fontSize=10;align=center;verticalAlign=middle;',50,858,1650,34));
 return `<mxfile host="app.diagrams.net" modified="2026-08-20T00:00:00.000Z" agent="PromptCanvas" version="24.0.0" type="device"><diagram id="equipment_predictive_maintenance" name="Equipment Predictive Maintenance and Reliability Intelligence"><mxGraphModel dx="1760" dy="940" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1760" pageHeight="940" background="#FFFFFF"><root>${c.join('\n')}</root></mxGraphModel></diagram></mxfile>`;
}
