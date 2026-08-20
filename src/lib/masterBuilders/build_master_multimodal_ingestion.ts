/**
 * Blueprint 27 — Multimodal Ingestion, Understanding & Grounding on Google Cloud.
 * Phase 3.2 rebuild: separates capture, parsing/understanding, normalization, indexing,
 * serving and governance. Uses configurable Gemini models rather than a pinned model.
 */

const GCP='data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2048%2048%22%3E%3Cpath%20fill%3D%22%23EA4335%22%20d%3D%22M24%209.5c3.54%200%206.71%201.22%209.21%203.6l6.85-6.85C35.9%202.38%2030.47%200%2024%200%2014.62%200%206.51%205.38%202.56%2013.22l7.98%206.19C12.43%2013.72%2017.74%209.5%2024%209.5z%22%2F%3E%3Cpath%20fill%3D%22%234285F4%22%20d%3D%22M46.98%2024.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58%202.96-2.26%205.48-4.78%207.18l7.73%206c4.51-4.18%207.09-10.36%207.09-17.65z%22%2F%3E%3Cpath%20fill%3D%22%23FBBC05%22%20d%3D%22M10.53%2028.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92%2016.46%200%2020.12%200%2024c0%203.88.92%207.54%202.56%2010.78l7.97-6.19z%22%2F%3E%3Cpath%20fill%3D%22%2334A853%22%20d%3D%22M24%2048c6.48%200%2011.93-2.13%2015.89-5.81l-7.73-6c-2.15%201.45-4.92%202.3-8.16%202.3-6.26%200-11.57-4.22-13.47-9.91l-7.98%206.19C6.51%2042.62%2014.62%2048%2024%2048z%22%2F%3E%3C%2Fsvg%3E';
const ICON={
 gcs:'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/google-cloud-storage/default.svg',
 bigquery:'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/google-bigquery/default.svg',
 cloudRun:'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/google-cloud-run/default.svg',
};
const esc=(s:string)=>s.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const v=(id:string,value:string,style:string,x:number,y:number,w:number,h:number)=>`<mxCell id="${id}" value="${esc(value)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`;
const img=(id:string,url:string,x:number,y:number,w:number,h:number)=>v(id,'',`shape=image;imageAspect=0;aspect=fixed;image=${url};align=center;verticalAlign=middle;`,x,y,w,h);
const zone=(id:string,n:number,title:string,sub:string,x:number,a:number,b:string|number,c:string|number,d?:string,e?:string)=>{
 const customGeometry=typeof b==='number'&&typeof c==='number'&&typeof d==='string'&&typeof e==='string';
 const y=customGeometry?a:45,w=customGeometry?b as number:a,h=customGeometry?c as number:600,accent=customGeometry?d!:b as string,fill=customGeometry?e!:c as string;
 return [
  v(id,'',`rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${accent};strokeWidth=1.5;`,x,y,w,h),
  v(`${id}_n`,String(n),`ellipse;whiteSpace=wrap;html=1;fillColor=${accent};strokeColor=${accent};fontColor=#FFFFFF;fontStyle=1;fontSize=13;align=center;verticalAlign=middle;`,x+14,y+15,30,30),
  v(`${id}_h`,`<b>${title}</b><br><span style="font-size:9.5px;color:#64748B">${sub}</span>`,'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=3;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=12.5;',x+54,y+10,w-68,44)
 ].join('\n');
};
const mini=(id:string,title:string,body:string,x:number,y:number,w:number,h:number,accent:string,fill='#FFFFFF')=>v(id,`<b>${title}</b><br><span style="font-size:9px;color:#64748B">${body}</span>`,`rounded=1;arcSize=7;whiteSpace=wrap;html=1;overflow=hidden;spacing=6;fillColor=${fill};strokeColor=${accent};strokeWidth=1.05;fontColor=#0F172A;fontSize=10.6;align=left;verticalAlign=middle;`,x,y,w,h);
const card=(id:string,title:string,body:string,x:number,y:number,w:number,h:number,accent:string,icon=GCP,fill='#FFFFFF')=>[
 v(id,'',`rounded=1;arcSize=8;whiteSpace=wrap;html=1;overflow=hidden;fillColor=${fill};strokeColor=${accent};strokeWidth=1.1;`,x,y,w,h),
 v(`${id}_bar`,'',`rounded=1;arcSize=4;fillColor=${accent};strokeColor=${accent};`,x,y,5,h),
 img(`${id}_i`,icon,x+14,y+Math.max(10,(h-36)/2),36,36),
 v(`${id}_t`,`<b>${title}</b><br><span style="font-size:9.2px;color:#64748B">${body}</span>`,'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=4;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=10.9;',x+60,y+6,w-70,h-12)
].join('\n');
const edge=(id:string,s:string,t:string,label:string,color:string,dashed=false,exitX=1,exitY=.5,entryX=0,entryY=.5)=>`<mxCell id="${id}" value="${esc(label)}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${color};strokeWidth=1.8;${dashed?'dashed=1;dashPattern=6 4;':''}endArrow=block;endFill=1;fontSize=9.2;fontColor=#334155;labelBackgroundColor=#FFFFFF;exitX=${exitX};exitY=${exitY};entryX=${entryX};entryY=${entryY};" edge="1" parent="1" source="${s}" target="${t}"><mxGeometry relative="1" as="geometry"/></mxCell>`;

export function buildMultimodalIngestionXml():string{
 const c:string[]=['<mxCell id="0"/>','<mxCell id="1" parent="0"/>'];
 c.push(v('purpose','<b>MULTIMODAL INGESTION, UNDERSTANDING & GROUNDING</b>   Preserve original assets, extract modality-specific evidence, normalize metadata/ACLs, and build retrieval-ready knowledge without forcing every modality through the same processor.','rounded=1;arcSize=7;whiteSpace=wrap;html=1;overflow=hidden;spacing=7;fillColor=#F8FBFF;strokeColor=#8AB4F8;strokeWidth=1.2;fontColor=#334155;fontSize=11;align=center;verticalAlign=middle;',25,10,1710,30));

 c.push(zone('sources',1,'MULTIMODAL SOURCES','Capture original content plus identity and provenance',25,280,'#1A73E8','#EFF6FF'));
 c.push(mini('docs','Documents & slides','PDF • DOCX • PPTX • HTML • scanned documents • reports',45,115,240,72,'#1A73E8'));
 c.push(mini('images','Images','Photos • diagrams • charts • medical/industrial imagery where policy permits',45,207,240,72,'#1A73E8'));
 c.push(mini('audio','Audio','Voice notes • calls • meetings • field recordings • streamed/batch audio',45,299,240,72,'#1A73E8'));
 c.push(mini('video','Video','Recorded video • clips • frames • associated audio/transcript metadata',45,391,240,72,'#1A73E8'));
 c.push(mini('geo','Geospatial / structured context','Coordinates • GIS features • telemetry • business metadata • reference tables',45,483,240,82,'#1A73E8'));
 c.push(mini('source_meta','Required source envelope','Source ID • owner • timestamps • MIME/type • ACL/security attributes • retention class',45,585,240,36,'#D93025','#FFF7F7'));

 c.push(zone('land',2,'LAND & ORCHESTRATE','Durable raw zone before expensive interpretation',330,300,'#0F8B82','#ECFDF5'));
 c.push(card('gcs','Cloud Storage raw zone','Immutable/original objects • versioning/retention policy as required • metadata sidecars',350,115,260,90,'#0F8B82',ICON.gcs));
 c.push(card('events','Pub/Sub / Eventarc','Event-driven notification and decoupling when new assets arrive',350,225,260,82,'#0F8B82'));
 c.push(card('orchestrate','Workflows / Cloud Run','Coordinate parser selection, retries, fan-out, idempotency and completion tracking',350,327,260,90,'#0F8B82',ICON.cloudRun));
 c.push(mini('malware','Pre-processing trust gate','File/type validation • malware/content policy where required • size/page limits • quarantine path',350,437,260,88,'#D93025','#FFF7F7'));
 c.push(mini('dlq','Failure handling','Retry transient failures • dead-letter/quarantine permanent failures • preserve source/evidence',350,545,260,76,'#0F8B82'));

 c.push(zone('understand',3,'PARSE & UNDERSTAND','Use the processor that preserves the modality’s meaning',655,410,'#7B61A8','#F7F4FF'));
 c.push(card('layout','Document AI Layout Parser','Layout-aware extraction of headings, tables, lists, figures and context-aware document chunks',675,115,370,86,'#7B61A8'));
 c.push(mini('speech','Speech-to-Text','Transcription / diarization for audio when a searchable transcript is required',675,221,175,82,'#7B61A8'));
 c.push(mini('gemini_mm','Gemini multimodal model','Configurable approved Gemini model for image/document/audio/video understanding where supported',870,221,175,82,'#7B61A8'));
 c.push(mini('specialized','Specialized processors — optional','Domain OCR/vision/video/geospatial processing only when accuracy, latency or domain semantics justify it',675,323,370,82,'#7B61A8'));
 c.push(mini('extract','Evidence extraction','Text/transcript • tables • entities • captions/descriptions • timestamps • coordinates • confidence/provenance',675,425,370,88,'#7B61A8'));
 c.push(mini('parser_choice','Parser policy','Choose by MIME/type and use case. Do not route all files through Gemini if deterministic/specialized parsing is better.',675,533,370,88,'#D93025','#FFF7F7'));

 c.push(zone('normalize',4,'NORMALIZE & ENRICH','Create retrieval-ready units with access metadata',1090,300,'#E87900','#FFF7ED'));
 c.push(mini('canonical','Canonical content model','Asset ID • derived artifact ID • modality • text/description • source URI • timestamps • lineage',1110,115,260,86,'#E87900'));
 c.push(mini('chunk','Semantic / layout-aware chunking','Preserve document hierarchy and modality anchors; tune chunking to retrieval use case',1110,221,260,86,'#E87900'));
 c.push(mini('acl','ACL & security propagation','Carry source identities/groups and policy metadata into searchable/indexed representations',1110,327,260,86,'#D93025','#FFF7F7'));
 c.push(card('bq','BigQuery metadata / analytics','Operational metadata, extraction results, QA metrics and analytical features where appropriate',1110,433,260,86,'#E87900',ICON.bigquery));
 c.push(mini('quality','Quality checks','Missing text • corrupt frames • low-confidence extraction • duplicate detection • schema validation',1110,539,260,82,'#E87900'));

 c.push(zone('index',5,'INDEX & SERVE','Select the knowledge-serving pattern for the consumer',1415,320,'#4285F4','#EFF6FF'));
 c.push(card('rag','RAG Engine corpus','Managed RAG ingestion and retrieval for Agent Platform applications; can use layout parser integration',1435,115,280,86,'#4285F4'));
 c.push(mini('agent_search','Agent Search / Gemini Enterprise data store','Search-oriented serving when the experience uses Agent Search or Gemini Enterprise app data stores',1435,221,280,92,'#4285F4'));
 c.push(mini('vector','Vector Search — optional','Dedicated vector index when the solution requires explicit vector retrieval behavior',1435,333,280,82,'#4285F4'));
 c.push(mini('consumer','Consumers','Gemini Enterprise • custom Agent Runtime • search/RAG apps • analytics • downstream workflows',1435,435,280,86,'#4285F4'));
 c.push(mini('serve_rule','Architecture rule','RAG Engine, Agent Search/data stores and Vector Search are selectable patterns—not mandatory duplicate indexes.',1435,541,280,80,'#D93025','#FFF7F7'));

 c.push(edge('e12','docs','gcs','asset + metadata','#2563EB')); c.push(edge('e12b','audio','gcs','asset + metadata','#2563EB')); c.push(edge('e23','gcs','events','object event','#0F8B82')); c.push(edge('e23b','events','orchestrate','dispatch','#0F8B82')); c.push(edge('e34','orchestrate','layout','document','#7B61A8')); c.push(edge('e34b','orchestrate','gemini_mm','multimodal asset','#7B61A8')); c.push(edge('e45','extract','canonical','derived evidence','#E87900')); c.push(edge('e56','canonical','rag','approved chunks','#4285F4')); c.push(edge('e5b','canonical','agent_search','search corpus','#4285F4',true)); c.push(edge('econsumer','rag','consumer','grounded retrieval','#64748B',true));

 c.push(zone('controls',6,'GOVERNANCE, OBSERVABILITY & QUALITY','Make every derived artifact attributable to its source',25,680,1710,245,'#334155','#F8FAFC'));
 c.push(mini('sec','Security & privacy','IAM • least-privilege service identities • encryption/CMEK where supported • Sensitive Data Protection where required',50,745,300,88,'#334155'));
 c.push(mini('lineage','Lineage & provenance','Original URI/version → parser/model/version → derived artifact/chunk → index/corpus → consumer response',370,745,300,88,'#334155'));
 c.push(mini('obs','Pipeline observability','Ingest lag • parse latency • errors/DLQ • throughput • cost • index freshness • connector/parser quota pressure',690,745,300,88,'#334155'));
 c.push(mini('qa','Extraction quality','Human/sample QA • modality-specific accuracy checks • low-confidence review • parser/model regression evaluation',1010,745,300,88,'#334155'));
 c.push(mini('retention','Lifecycle & deletion','Retention • legal hold • source deletion propagation • derived-artifact cleanup • re-index/reprocess controls',1330,745,370,88,'#334155'));
 c.push(v('legend','<b>FLOW</b>  <span style="color:#2563EB">━━ source asset</span>  <span style="color:#0F8B82">━━ orchestration</span>  <span style="color:#7B61A8">━━ parsing/understanding</span>  <span style="color:#E87900">━━ normalized evidence</span>  <span style="color:#4285F4">━━ indexing/serving</span>  <span style="color:#64748B">┄┄ retrieval</span>','rounded=1;arcSize=6;whiteSpace=wrap;html=1;overflow=hidden;spacing=5;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;fontColor=#334155;fontSize=10;align=center;verticalAlign=middle;',50,855,1650,42));
 return `<mxfile host="app.diagrams.net" modified="2026-08-20T00:00:00.000Z" agent="PromptCanvas" version="24.0.0" type="device"><diagram id="agentic_multimodal_ingestion" name="Multimodal Ingestion, Understanding & Grounding"><mxGraphModel dx="1760" dy="970" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1760" pageHeight="950" background="#FFFFFF" math="0" shadow="0"><root>${c.join('\n')}</root></mxGraphModel></diagram></mxfile>`;
}
