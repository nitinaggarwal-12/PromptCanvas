/** Blueprint 36 — DataOps & Anomaly Detection Architecture. */
const BASE='https://cdn.jsdelivr.net/npm/gcp-icons@1.0.6/dist/icons/';
const ICON={bigquery:`${BASE}bigquery-512-color.svg`,storage:`${BASE}cloud-storage-512-color.svg`,vertex:`${BASE}vertexai-512-color.svg`,slack:'https://cdn.simpleicons.org/slack'};
const esc=(s:string)=>s.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const v=(id:string,value:string,style:string,x:number,y:number,w:number,h:number)=>`<mxCell id="${id}" value="${esc(value)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`;
const img=(id:string,url:string,x:number,y:number,w:number,h:number)=>v(id,'',`shape=image;imageAspect=0;aspect=fixed;image=${url};align=center;verticalAlign=middle;`,x,y,w,h);
const zone=(id:string,n:number,title:string,sub:string,x:number,w:number,accent:string,fill:string)=>[
 v(id,'',`rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${accent};strokeWidth=1.4;`,x,70,w,610),
 v(`${id}_n`,String(n),`ellipse;whiteSpace=wrap;html=1;fillColor=${accent};strokeColor=${accent};fontColor=#FFFFFF;fontStyle=1;fontSize=12;align=center;verticalAlign=middle;`,x+14,84,30,30),
 v(`${id}_h`,`<b>${title}</b><br><span style="font-size:9.7px;color:#64748B">${sub}</span>`,'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=3;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=12.3;',x+55,78,w-68,46)
].join('\n');
const card=(id:string,title:string,body:string,x:number,y:number,w:number,h:number,accent:string,icon?:string,fill='#FFFFFF')=>{const i=icon?img(`${id}_icon`,icon,x+13,y+Math.max(10,(h-34)/2),34,34):'';const tx=icon?x+57:x+14,tw=icon?w-69:w-28;return [v(id,'',`rounded=1;arcSize=7;whiteSpace=wrap;html=1;overflow=hidden;fillColor=${fill};strokeColor=${accent};strokeWidth=1.05;`,x,y,w,h),i,v(`${id}_label`,`<b>${title}</b><br><span style="font-size:9.6px;color:#64748B">${body}</span>`,'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=4;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=10.8;',tx,y+6,tw,h-12)].filter(Boolean).join('\n');};
const edge=(id:string,s:string,t:string,label:string,color='#2563EB',dashed=false,exitX=1,exitY=.5,entryX=0,entryY=.5)=>`<mxCell id="${id}" value="${esc(label)}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${color};strokeWidth=1.8;${dashed?'dashed=1;dashPattern=6 4;':''}endArrow=block;endFill=1;fontSize=9.6;fontColor=#334155;labelBackgroundColor=#FFFFFF;exitX=${exitX};exitY=${exitY};entryX=${entryX};entryY=${entryY};" edge="1" parent="1" source="${s}" target="${t}"><mxGeometry relative="1" as="geometry"/></mxCell>`;

export function buildDataOpsPhase1Xml():string{
 const c:string[]=['<mxCell id="0"/>','<mxCell id="1" parent="0"/>'];
 c.push(v('purpose','<b>DATAOPS & ANOMALY DETECTION</b>   Pipeline data → quality/profile/lineage checks → anomaly signals → incident/remediation → governed consumption. Targets and thresholds are workload-defined.','rounded=1;arcSize=7;whiteSpace=wrap;html=1;overflow=hidden;spacing=7;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.2;fontColor=#334155;fontSize=11.4;align=center;verticalAlign=middle;',30,20,1700,36));
 c.push(zone('sources',1,'DATA SOURCES','Operational, lakehouse, SaaS and event sources',30,250,'#1A73E8','#EFF6FF'));
 c.push(card('bqsrc','BigQuery / Iceberg tables','Analytical and open-table datasets under governed ownership',50,142,210,82,'#1A73E8',ICON.bigquery));
 c.push(card('gcssrc','Cloud Storage','Files, extracts and governed object data',50,246,210,80,'#1A73E8',ICON.storage));
 c.push(card('dbsrc','Operational & SaaS sources','Databases • application APIs • approved external sources',50,348,210,82,'#1A73E8'));
 c.push(card('eventsrc','Streaming events','Pub/Sub / application events where data arrives continuously',50,452,210,80,'#1A73E8'));
 c.push(card('contract','Data contract / ownership','Owner • schema • freshness • quality SLO • classification • downstream consumers',50,554,210,86,'#1A73E8'));

 c.push(zone('pipeline',2,'PIPELINE & TRANSFORMATION','Produce data with explicit contracts and observability',300,270,'#0F8B82','#ECFDF5'));
 c.push(card('ingest','Ingest / CDC / streaming','Datastream • Pub/Sub • Dataflow or workload-appropriate ingestion pattern',320,142,230,84,'#0F8B82'));
 c.push(card('transform','Transform & publish','BigQuery SQL / Dataflow / approved orchestration • idempotent processing where required',320,248,230,88,'#0F8B82'));
 c.push(card('pipeline_obs','Pipeline telemetry','Row/event counts • latency • freshness • failures • retries/DLQ • cost/throughput signals',320,358,230,92,'#0F8B82'));
 c.push(card('quarantine','Failure / quarantine path','Bad records or failed contracts are isolated with reason, owner and replay/remediation path.',320,472,230,92,'#D93025',undefined,'#FFF7F7'));
 c.push(card('publish','Published data product','Versioned table/view/object/event with owner, contract and quality status',320,586,230,54,'#0F8B82'));

 c.push(zone('quality',3,'KNOWLEDGE CATALOG & DATA QUALITY','Govern context, lineage, profiling and quality checks',590,300,'#6554C0','#F5F3FF'));
 c.push(card('catalog','Knowledge Catalog','Business/technical context • ownership • discovery • lineage • governed semantics',610,142,260,86,'#6554C0'));
 c.push(card('dq','Automatic data quality','Built-in rules/custom SQL • completeness • validity • uniqueness • consistency • alerts',610,250,260,90,'#6554C0'));
 c.push(card('profile','Data profiling & anomaly signals','Profile distributions and generate/maintain quality rules appropriate to the dataset.',610,362,260,90,'#6554C0'));
 c.push(card('lineage','Lineage & change impact','Source → transformation → data product → consumer lineage and schema-change impact.',610,474,260,88,'#6554C0'));
 c.push(card('quality_status','Quality status','Pass / warn / fail with actual evidence; no universal “100% validated” claims.',610,584,260,56,'#D93025',undefined,'#FFF7F7'));

 c.push(zone('detect',4,'ANOMALY & OBSERVABILITY','Correlate data and pipeline health signals',910,260,'#E87900','#FFF7ED'));
 c.push(card('stat','Statistical / rule anomalies','Distribution shift • volume/freshness deviation • null/schema change • domain-specific checks',930,142,220,90,'#E87900'));
 c.push(card('thirdparty','Optional data observability','Soda / Monte Carlo / approved third-party tooling where adopted; integrate, do not duplicate ownership.',930,254,220,90,'#E87900'));
 c.push(card('monitoring','Cloud Monitoring & Logging','Pipeline/service metrics, logs and alert policies with links to affected dataset/job.',930,366,220,88,'#E87900'));
 c.push(card('correlate','Correlation & severity','Combine data-quality + pipeline + schema/change signals; assign severity/owner based on impact.',930,476,220,92,'#E87900'));
 c.push(card('alert','Actionable alert','Dataset/job • failing rule • evidence • affected consumers • owner • runbook link',930,590,220,50,'#E87900'));

 c.push(zone('respond',5,'INCIDENT & REMEDIATION','Human-owned response with controlled automation',1190,250,'#D93025','#FEF2F2'));
 c.push(card('notify','Incident notification','PagerDuty / Slack / approved ITSM routing according to severity and ownership',1210,142,210,84,'#D93025',ICON.slack));
 c.push(card('triage','Triage & impact assessment','Confirm signal • identify affected data products/consumers • stop unsafe downstream propagation if needed',1210,248,210,94,'#D93025'));
 c.push(card('remediate','Remediation','Correct source/transformation/config • backfill/replay when safe • document root cause and prevention',1210,364,210,94,'#D93025'));
 c.push(card('validate','Post-fix validation','Re-run quality checks • validate freshness/lineage • reopen consumers only when evidence passes',1210,480,210,88,'#D93025'));
 c.push(card('learn','Problem management','Update rule/contract/runbook; track recurring failure modes and ownership actions',1210,590,210,50,'#D93025'));

 c.push(zone('consume',6,'GOVERNED CONSUMPTION','Expose only data with known quality and provenance',1460,270,'#334155','#F8FAFC'));
 c.push(card('bi','BI / reporting','Curated views/semantic models with quality and freshness status',1480,142,230,82,'#334155'));
 c.push(card('ai','Vertex AI / agentic consumers','Use governed data through explicit BigQuery/retrieval/tool paths and preserve provenance.',1480,246,230,90,'#334155',ICON.vertex));
 c.push(card('api','Data products & APIs','Contracted tables/views/events/APIs with ownership and quality SLOs',1480,358,230,86,'#334155'));
 c.push(card('block','Consumption policy','Critical failed datasets can be quarantined/blocked according to policy; warnings remain visible to consumers.',1480,466,230,96,'#D93025',undefined,'#FFF7F7'));
 c.push(card('feedback','Consumer feedback','Capture incorrect/stale-data reports and feed them into quality rules and backlog.',1480,584,230,56,'#334155'));

 c.push(edge('e1','contract','ingest','contract + data')); c.push(edge('e2','publish','catalog','metadata + product','#0F8B82')); c.push(edge('e3','catalog','dq','governed context','#6554C0')); c.push(edge('e4','dq','stat','quality/profile signals','#E87900')); c.push(edge('e5','alert','notify','incident','#D93025')); c.push(edge('e6','validate','bi','reopen / publish','#334155')); c.push(edge('e6b','validate','ai','reopen / publish','#334155',true));
 c.push(v('footer','<b>OPERATING PRINCIPLE:</b> data quality is evidence, not a badge. Every failed rule has an owner and remediation path; every published data product exposes freshness/quality/lineage appropriate to its consumers.','rounded=1;arcSize=7;whiteSpace=wrap;html=1;overflow=hidden;spacing=7;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.1;fontColor=#475569;fontSize=10.5;align=center;verticalAlign=middle;',30,710,1700,56));
 return `<mxfile host="app.diagrams.net" modified="2026-08-20T00:00:00.000Z" agent="PromptCanvas" version="24.0.0" type="device"><diagram id="dataops_anomaly_detection_phase1" name="DataOps & Anomaly Detection Architecture"><mxGraphModel dx="1760" dy="820" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1760" pageHeight="810" background="#FFFFFF"><root>${c.join('\n')}</root></mxGraphModel></diagram></mxfile>`;
}
