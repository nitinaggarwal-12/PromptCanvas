/** Blueprint 26 — Serverless Event-Driven Architecture on Google Cloud.
 * Exact product icons are used only for verified mappings; otherwise cards are text-first.
 */
const BASE='https://cdn.jsdelivr.net/npm/gcp-icons@1.0.6/dist/icons/';
const ICON={cloudRun:`${BASE}cloudrun-512-color-rgb.svg`,storage:`${BASE}cloud-storage-512-color.svg`,bigquery:`${BASE}bigquery-512-color.svg`,vertex:`${BASE}vertexai-512-color.svg`,looker:`${BASE}looker-512-color.svg`};
const esc=(s:string)=>s.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const v=(id:string,value:string,style:string,x:number,y:number,w:number,h:number)=>`<mxCell id="${id}" value="${esc(value)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`;
const img=(id:string,url:string,x:number,y:number,w:number,h:number)=>v(id,'',`shape=image;imageAspect=0;aspect=fixed;image=${url};align=center;verticalAlign=middle;`,x,y,w,h);
const zone=(id:string,n:number,title:string,sub:string,x:number,w:number,accent:string,fill:string)=>[
 v(id,'',`rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${accent};strokeWidth=1.4;`,x,70,w,590),
 v(`${id}_n`,String(n),`ellipse;whiteSpace=wrap;html=1;fillColor=${accent};strokeColor=${accent};fontColor=#FFFFFF;fontStyle=1;fontSize=12;align=center;verticalAlign=middle;`,x+14,84,30,30),
 v(`${id}_h`,`<b>${title}</b><br><span style="font-size:9.8px;color:#64748B">${sub}</span>`,'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=3;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=12.4;',x+55,78,w-68,46)
].join('\n');
const card=(id:string,title:string,body:string,x:number,y:number,w:number,h:number,accent:string,icon?:string,fill='#FFFFFF')=>{const i=icon?img(`${id}_icon`,icon,x+14,y+Math.max(10,(h-34)/2),34,34):'';const tx=icon?x+58:x+14,tw=icon?w-70:w-28;return [v(id,'',`rounded=1;arcSize=7;whiteSpace=wrap;html=1;overflow=hidden;fillColor=${fill};strokeColor=${accent};strokeWidth=1.05;`,x,y,w,h),i,v(`${id}_label`,`<b>${title}</b><br><span style="font-size:9.8px;color:#64748B">${body}</span>`,'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=4;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=11;',tx,y+6,tw,h-12)].filter(Boolean).join('\n');};
const edge=(id:string,s:string,t:string,label:string,color='#2563EB',dashed=false,exitX=1,exitY=.5,entryX=0,entryY=.5)=>`<mxCell id="${id}" value="${esc(label)}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${color};strokeWidth=1.8;${dashed?'dashed=1;dashPattern=6 4;':''}endArrow=block;endFill=1;fontSize=9.8;fontColor=#334155;labelBackgroundColor=#FFFFFF;exitX=${exitX};exitY=${exitY};entryX=${entryX};entryY=${entryY};" edge="1" parent="1" source="${s}" target="${t}"><mxGeometry relative="1" as="geometry"/></mxCell>`;

export function buildServerlessEdaPhase1Xml():string{
 const c:string[]=['<mxCell id="0"/>','<mxCell id="1" parent="0"/>'];
 c.push(v('purpose','<b>SERVERLESS EVENT-DRIVEN ARCHITECTURE</b>   Producers → Eventarc / Pub/Sub → stateless processing → governed data/AI → asynchronous actions. Delivery semantics, retries and idempotency are explicit.','rounded=1;arcSize=7;whiteSpace=wrap;html=1;overflow=hidden;spacing=7;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.2;fontColor=#334155;fontSize=11.4;align=center;verticalAlign=middle;',30,20,1700,36));
 c.push(zone('sources',1,'EVENT PRODUCERS','Applications, devices, enterprise systems and approved external sources',30,245,'#1A73E8','#EFF6FF'));
 c.push(card('apps','Applications','Web • mobile • SaaS • domain services emit business events',50,142,205,82,'#1A73E8'));
 c.push(card('iot','IoT / edge events','Device/edge telemetry where Pub/Sub or another approved ingestion path is appropriate',50,246,205,88,'#1A73E8'));
 c.push(card('enterprise','Enterprise systems','CRM • ERP • databases • integration platforms through governed adapters/APIs',50,356,205,92,'#1A73E8'));
 c.push(card('external','External / partner events','Approved APIs, partner feeds and third-party event sources',50,470,205,82,'#1A73E8'));
 c.push(card('contract','Event contract','Producer • schema/version • key/order needs • sensitivity • owner • retention/replay policy',50,574,205,62,'#1A73E8'));

 c.push(zone('ingress',2,'EVENT ROUTING & BUS','Route platform events and decouple producers from consumers',295,265,'#0F8B82','#ECFDF5'));
 c.push(card('eventarc','Eventarc','Route supported Google Cloud / application events to configured destinations; use filters and identities explicitly.',315,142,225,90,'#0F8B82'));
 c.push(card('pubsub','Pub/Sub','Durable asynchronous event bus • subscriptions • ordering only where configured/required • replay according to retention.',315,254,225,96,'#0F8B82'));
 c.push(card('dlq','Dead-letter handling','Subscription dead-letter topic / retry policy for poison messages; preserve failure reason and replay path.',315,372,225,92,'#D93025',undefined,'#FFF7F7'));
 c.push(card('schema','Schema & compatibility','Avro / Protobuf / JSON contract governance and compatibility validation in delivery lifecycle.',315,486,225,88,'#0F8B82'));
 c.push(card('identity','Publisher/subscriber identity','Least-privilege service identities and explicit topic/subscription permissions.',315,596,225,40,'#0F8B82'));

 c.push(zone('process',3,'SERVERLESS PROCESSING','Stateless/idempotent handlers and bounded asynchronous work',580,300,'#4285F4','#EFF6FF'));
 c.push(card('run','Cloud Run services','HTTP/event consumers for stateless business processing; autoscaling and concurrency tuned to workload.',600,142,260,92,'#4285F4',ICON.cloudRun));
 c.push(card('functions','Cloud Run functions','Event-driven function pattern where function packaging/lifecycle fits the workload.',600,256,260,86,'#4285F4',ICON.cloudRun));
 c.push(card('tasks','Cloud Tasks','Explicit asynchronous task queue for rate control, scheduled retries and work that should not block event handling.',600,364,260,96,'#4285F4'));
 c.push(card('idempotency','Idempotency & delivery semantics','Consumers tolerate at-least-once delivery, deduplicate where required and bound retries/timeouts.',600,482,260,96,'#D93025',undefined,'#FFF7F7'));
 c.push(card('observe_proc','Processing telemetry','Event age • handler latency • retries • errors • concurrency • backlog • cost/throughput signals',600,600,260,36,'#4285F4'));

 c.push(zone('data',4,'DATA & STATE','Persist only the state required by access pattern',900,255,'#6554C0','#F5F3FF'));
 c.push(card('storage','Cloud Storage','Raw/archive objects, payload offload or durable files as appropriate',920,142,215,84,'#6554C0',ICON.storage));
 c.push(card('bigquery','BigQuery','Analytical events, curated facts and operational/BI analysis',920,248,215,84,'#6554C0',ICON.bigquery));
 c.push(card('operational','Operational serving store','Bigtable / Firestore / Spanner / Cloud SQL only when the workload access model justifies it.',920,354,215,96,'#6554C0'));
 c.push(card('state_rule','State rule','Do not use an analytics warehouse or object store as a generic low-latency state service; choose by access/SLA needs.',920,472,215,96,'#D93025',undefined,'#FFF7F7'));
 c.push(card('lineage','Data ownership & lineage','Source event → handler/version → persisted output → downstream consumer provenance.',920,590,215,46,'#6554C0'));

 c.push(zone('ai',5,'AI & ANALYTICS','Analyze governed event data without hiding asynchronous boundaries',1175,250,'#B83280','#FDF2F8'));
 c.push(card('vertex','Vertex AI / approved models','Prediction or model endpoint only for use cases that require ML inference; capture model/version/evaluation evidence.',1195,142,210,94,'#B83280',ICON.vertex));
 c.push(card('gemini','Gemini / approved model','Grounded summarization, classification or explanation through an application/agent path; not the event bus itself.',1195,258,210,96,'#B83280'));
 c.push(card('looker','Looker','BI / operational dashboards over governed analytical data',1195,376,210,82,'#B83280',ICON.looker));
 c.push(card('ai_failure','AI failure handling','Timeout/fallback/queue policy is explicit; event processing does not silently lose data when inference is unavailable.',1195,480,210,96,'#D93025',undefined,'#FFF7F7'));
 c.push(card('eval','Quality & drift','Task/model quality thresholds are workload-defined and monitored with versioned evidence.',1195,598,210,38,'#B83280'));

 c.push(zone('actions',6,'ACTIONS & OPERATIONS','Authorized asynchronous outcomes and production controls',1445,285,'#E87900','#FFF7ED'));
 c.push(card('task_action','Cloud Tasks / workflow trigger','Rate-limited/retryable downstream work after successful event handling.',1465,142,245,88,'#E87900'));
 c.push(card('api_action','Cloud Run / enterprise API','Approved webhook/API/automation destination with identity, timeout and retry contract.',1465,252,245,92,'#E87900',ICON.cloudRun));
 c.push(card('notify','Notifications / ITSM','Cloud Monitoring alerting or approved notification/ITSM system; avoid treating email/SMS as the event backbone.',1465,366,245,94,'#E87900'));
 c.push(card('security','Security & governance','IAM • encryption • VPC Service Controls only where supported • audit logs • schema/data policy',1465,482,245,92,'#334155','#F8FAFC'));
 c.push(card('sre','Reliability & SRE','Backlog/age • DLQ • retry exhaustion • saturation • SLOs • rollback/runbook • ownership',1465,596,245,40,'#334155','#F8FAFC'));

 c.push(edge('e1','apps','eventarc','event')); c.push(edge('e2','eventarc','pubsub','route / publish','#0F8B82')); c.push(edge('e3','pubsub','run','subscription delivery','#2563EB')); c.push(edge('e4','run','bigquery','analytical output','#6554C0')); c.push(edge('e5','run','storage','object / archive','#6554C0',true)); c.push(edge('e6','bigquery','looker','analytics','#B83280')); c.push(edge('e7','run','vertex','inference request','#B83280')); c.push(edge('e8','vertex','task_action','approved outcome','#E87900')); c.push(edge('e9','pubsub','dlq','retry exhausted','#D93025',true,0.5,1,0.5,0)); c.push(edge('e10','tasks','api_action','bounded async work','#E87900'));
 c.push(v('footer','<b>FLOW SEMANTICS:</b> event routing/bus decouples producers and consumers; Cloud Run handles stateless work; Cloud Tasks handles controlled asynchronous tasks; data stores are selected by access pattern; AI is an optional governed consumer, not a substitute for delivery guarantees.','rounded=1;arcSize=7;whiteSpace=wrap;html=1;overflow=hidden;spacing=7;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.1;fontColor=#475569;fontSize=10.5;align=center;verticalAlign=middle;',30,700,1700,54));
 return `<mxfile host="app.diagrams.net" modified="2026-08-20T00:00:00.000Z" agent="PromptCanvas" version="24.0.0" type="device"><diagram id="serverless_eda_phase1" name="Serverless Event-Driven Architecture on Google Cloud"><mxGraphModel dx="1760" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1760" pageHeight="790" background="#FFFFFF"><root>${c.join('\n')}</root></mxGraphModel></diagram></mxfile>`;
}
