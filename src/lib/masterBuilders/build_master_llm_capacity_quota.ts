/**
 * Blueprint 33 — Gemini Capacity, Consumption & Resilience Architecture.
 * Phase 3.2 rebuild aligned to 2026 Gemini Enterprise Agent Platform consumption options.
 */

const GCP='data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2048%2048%22%3E%3Cpath%20fill%3D%22%23EA4335%22%20d%3D%22M24%209.5c3.54%200%206.71%201.22%209.21%203.6l6.85-6.85C35.9%202.38%2030.47%200%2024%200%2014.62%200%206.51%205.38%202.56%2013.22l7.98%206.19C12.43%2013.72%2017.74%209.5%2024%209.5z%22%2F%3E%3Cpath%20fill%3D%22%234285F4%22%20d%3D%22M46.98%2024.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58%202.96-2.26%205.48-4.78%207.18l7.73%206c4.51-4.18%207.09-10.36%207.09-17.65z%22%2F%3E%3Cpath%20fill%3D%22%23FBBC05%22%20d%3D%22M10.53%2028.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92%2016.46%200%2020.12%200%2024c0%203.88.92%207.54%202.56%2010.78l7.97-6.19z%22%2F%3E%3Cpath%20fill%3D%22%2334A853%22%20d%3D%22M24%2048c6.48%200%2011.93-2.13%2015.89-5.81l-7.73-6c-2.15%201.45-4.92%202.3-8.16%202.3-6.26%200-11.57-4.22-13.47-9.91l-7.98%206.19C6.51%2042.62%2014.62%2048%2024%2048z%22%2F%3E%3C%2Fsvg%3E';
const esc=(s:string)=>s.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const v=(id:string,value:string,style:string,x:number,y:number,w:number,h:number)=>`<mxCell id="${id}" value="${esc(value)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`;
const img=(id:string,url:string,x:number,y:number,w:number,h:number)=>v(id,'',`shape=image;imageAspect=0;aspect=fixed;image=${url};align=center;verticalAlign=middle;`,x,y,w,h);
const zone=(id:string,n:number,title:string,sub:string,x:number,w:number,accent:string,fill:string)=>[
 v(id,'',`rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${accent};strokeWidth=1.5;`,x,45,w,585),
 v(`${id}_n`,String(n),`ellipse;whiteSpace=wrap;html=1;fillColor=${accent};strokeColor=${accent};fontColor=#FFFFFF;fontStyle=1;fontSize=13;align=center;verticalAlign=middle;`,x+14,60,30,30),
 v(`${id}_h`,`<b>${title}</b><br><span style="font-size:9.5px;color:#64748B">${sub}</span>`,'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=3;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=12.5;',x+54,55,w-68,44)
].join('\n');
const mini=(id:string,title:string,body:string,x:number,y:number,w:number,h:number,accent:string,fill='#FFFFFF')=>v(id,`<b>${title}</b><br><span style="font-size:9px;color:#64748B">${body}</span>`,`rounded=1;arcSize=7;whiteSpace=wrap;html=1;overflow=hidden;spacing=6;fillColor=${fill};strokeColor=${accent};strokeWidth=1.05;fontColor=#0F172A;fontSize=10.6;align=left;verticalAlign=middle;`,x,y,w,h);
const card=(id:string,title:string,body:string,x:number,y:number,w:number,h:number,accent:string,fill='#FFFFFF')=>[
 v(id,'',`rounded=1;arcSize=8;whiteSpace=wrap;html=1;overflow=hidden;fillColor=${fill};strokeColor=${accent};strokeWidth=1.1;`,x,y,w,h),
 img(`${id}_i`,GCP,x+14,y+Math.max(10,(h-36)/2),36,36),
 v(`${id}_t`,`<b>${title}</b><br><span style="font-size:9.2px;color:#64748B">${body}</span>`,'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=4;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=10.9;',x+60,y+6,w-70,h-12)
].join('\n');
const edge=(id:string,s:string,t:string,label:string,color:string,dashed=false,exitX=1,exitY=.5,entryX=0,entryY=.5)=>`<mxCell id="${id}" value="${esc(label)}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${color};strokeWidth=1.8;${dashed?'dashed=1;dashPattern=6 4;':''}endArrow=block;endFill=1;fontSize=9.2;fontColor=#334155;labelBackgroundColor=#FFFFFF;exitX=${exitX};exitY=${exitY};entryX=${entryX};entryY=${entryY};" edge="1" parent="1" source="${s}" target="${t}"><mxGeometry relative="1" as="geometry"/></mxCell>`;

export function buildLlmCapacityQuotaXml():string{
 const c:string[]=['<mxCell id="0"/>','<mxCell id="1" parent="0"/>'];
 c.push(v('purpose','<b>GEMINI CAPACITY, CONSUMPTION & RESILIENCE</b>   Match workload criticality and traffic shape to the right Agent Platform consumption option. Treat shared-capacity 429s as a resilience signal—not as proof that a fixed quota was exhausted.','rounded=1;arcSize=7;whiteSpace=wrap;html=1;overflow=hidden;spacing=7;fillColor=#F8FBFF;strokeColor=#8AB4F8;strokeWidth=1.2;fontColor=#334155;fontSize=11;align=center;verticalAlign=middle;',25,10,1710,30));

 c.push(zone('demand',1,'WORKLOAD DEMAND','Characterize traffic before choosing capacity',25,290,'#1A73E8','#EFF6FF'));
 c.push(card('apps','Applications & agents','Interactive chat • APIs • batch tasks • multimodal agents • internal automation',45,115,250,82,'#1A73E8'));
 c.push(mini('traffic','Traffic profile','Requests/sec • input/output tokens • concurrency • burstiness • modality • geographic demand',45,217,250,86,'#1A73E8'));
 c.push(mini('slo','Service objective','Criticality • latency target • availability objective • peak-window tolerance • business impact',45,323,250,86,'#1A73E8'));
 c.push(mini('modelmix','Model portfolio','Approved Gemini / third-party / open models; direct model calls can have different capacity options',45,429,250,82,'#1A73E8'));
 c.push(mini('dependency','Separate dependencies','Grounding, Agent Search, tools and other services can have independent quotas/limits—capacity planning must include them.',45,531,250,74,'#D93025','#FFF7F7'));

 c.push(zone('choose',2,'CONSUMPTION OPTION','Choose predictability vs flexibility intentionally',340,370,'#7B61A8','#F7F4FF'));
 c.push(card('standard','Standard PayGo','Shared capacity with usage tiers; suitable for elastic workloads that can tolerate variable contention',360,115,330,82,'#7B61A8'));
 c.push(card('priority','Priority PayGo','Higher-priority consumption option for production workloads needing more predictable shared-capacity performance',360,217,330,82,'#7B61A8'));
 c.push(card('pt','Provisioned Throughput','Reserved throughput for supported direct model calls; fixed-term capacity for predictable critical baseload',360,319,330,90,'#7B61A8'));
 c.push(mini('pt_scope','PT scope boundary','Provisioned Throughput does not automatically cover Agent Search, Vertex AI Agents, grounding or unrelated service quotas.',360,429,330,92,'#D93025','#FFF7F7'));
 c.push(mini('portfolio','Portfolio strategy','Layer capacity: reserve predictable baseload where justified; use PayGo options for burst/less-critical demand.',360,541,330,64,'#7B61A8'));

 c.push(zone('route',3,'REQUEST PATH & RESILIENCE','Design the client to survive capacity contention',735,350,'#0F8B82','#ECFDF5'));
 c.push(card('global','Global endpoint — when supported','Dynamically routes requests across a larger multi-region capacity pool and can reduce shared-capacity 429 risk',755,115,310,86,'#0F8B82'));
 c.push(mini('smooth','Traffic smoothing','Avoid sharp second-level spikes; queue/buffer non-interactive work and shape concurrency to protect user traffic',755,221,310,88,'#0F8B82'));
 c.push(mini('retry','Truncated exponential backoff','Retry transient 429/5xx conditions with jitter, bounded attempts and end-to-end timeout budgets',755,329,310,88,'#0F8B82'));
 c.push(mini('priority_class','Workload priority classes','Separate interactive/critical traffic from batch/background work; use application-level admission control',755,437,310,82,'#0F8B82'));
 c.push(mini('degrade','Graceful degradation','Fallback model/feature, cached answer, asynchronous completion or clear retry UX only when product semantics allow it',755,539,310,66,'#0F8B82'));

 c.push(zone('serve',4,'GEMINI MODEL SERVING','Managed capacity—not a customer-operated GPU pod topology',1110,300,'#4285F4','#EFF6FF'));
 c.push(v('serve_shell','', 'rounded=1;arcSize=10;fillColor=#FFFFFF;strokeColor=#4285F4;strokeWidth=1.6;',1130,118,260,270));
 c.push(img('serve_logo',GCP,1148,139,45,45));
 c.push(v('serve_title','<b>Gemini Enterprise Agent Platform</b><br><span style="font-size:9.5px;color:#64748B">Managed model serving and consumption controls</span>','text;html=1;whiteSpace=wrap;overflow=hidden;spacing=4;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=12.5;',1205,130,165,62));
 c.push(mini('usage_tier','Usage tier / shared capacity','Standard PayGo baseline and shared-resource behavior are managed by the platform—not a custom Redis quota governor.',1150,217,220,72,'#4285F4'));
 c.push(mini('pt_measure','PT measurement','Purchased throughput is measured for the selected model/location and direct supported requests.',1150,307,220,62,'#4285F4'));
 c.push(mini('errors','Capacity outcomes','PayGo contention commonly surfaces as 429; PT behavior differs below/above purchased throughput and by configuration.',1130,416,260,84,'#D93025','#FFF7F7'));
 c.push(mini('no_fake','Architecture rule','Do not invent a “Vertex AI Quota Governor” product or imply Cloud Load Balancing routes Gemini model capacity.',1130,520,260,76,'#D93025','#FFF7F7'));

 c.push(zone('operate',5,'CAPACITY OPERATIONS','Measure, forecast and change consumption deliberately',1435,300,'#334155','#F8FAFC'));
 c.push(mini('telemetry','Application telemetry','Requests • tokens • concurrency • latency • 429/5xx • retry rate • fallback rate • task success',1455,115,260,88,'#334155'));
 c.push(mini('billing','Cloud Billing / usage','Spend trends • consumption-option cost • organization usage tier • project/workload attribution',1455,223,260,86,'#334155'));
 c.push(mini('forecast','Capacity forecast','Baseline vs peak • growth • seasonal events • model changes • multimodal expansion • headroom',1455,329,260,86,'#334155'));
 c.push(mini('alert','Operational alerts','Sustained contention • retry amplification • latency breach • PT saturation • dependency quota pressure',1455,435,260,82,'#D93025','#FFF7F7'));
 c.push(mini('decision','Capacity decision','Tune traffic → change consumption option → purchase/increase PT → optimize model/request shape as evidence requires',1455,537,260,68,'#334155'));

 c.push(edge('e12','apps','standard','demand profile','#2563EB'));
 c.push(edge('e23','standard','global','Standard PayGo','#7B61A8')); c.push(edge('e23b','priority','global','Priority PayGo','#7B61A8')); c.push(edge('e23c','pt','global','PT request','#7B61A8'));
 c.push(edge('e34','global','serve_shell','model request','#0F8B82'));
 c.push(edge('e45','serve_shell','telemetry','usage / errors','#334155'));
 c.push(edge('eback','alert','traffic','capacity feedback','#D93025',true,0,.5,0,.8));

 c.push(zone('patterns',6,'RESILIENCE PATTERNS & DECISION GUIDANCE','Use architecture controls that match the actual failure mode',25,660,1710,260,'#6554C0','#F5F3FF'));
 c.push(mini('p1','Shared-capacity contention','Global endpoint + smoothing + bounded exponential backoff; avoid unbounded retry storms.',50,725,300,88,'#6554C0'));
 c.push(mini('p2','Predictable critical baseload','Evaluate Provisioned Throughput for supported direct models and size GSUs from measured demand.',370,725,300,88,'#6554C0'));
 c.push(mini('p3','PT overage','Default behavior can spill eligible overage to PayGo; validate current request/header behavior for your workload.',690,725,300,88,'#6554C0'));
 c.push(mini('p4','Dependency bottleneck','Track grounding/search/tool quotas separately; model PT capacity does not eliminate downstream bottlenecks.',1010,725,300,88,'#6554C0'));
 c.push(mini('p5','Cost / abuse guardrail','Use application limits, budgets/alerts and supported quota controls where applicable—separate from platform capacity guarantees.',1330,725,370,88,'#6554C0'));
 c.push(v('legend','<b>FLOW</b>  <span style="color:#2563EB">━━ workload demand</span>  <span style="color:#7B61A8">━━ consumption choice</span>  <span style="color:#0F8B82">━━ resilient request path</span>  <span style="color:#334155">━━ operational telemetry</span>  <span style="color:#D93025">┄┄ feedback / exception</span>','rounded=1;arcSize=6;whiteSpace=wrap;html=1;overflow=hidden;spacing=5;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;fontColor=#334155;fontSize=10;align=center;verticalAlign=middle;',50,838,1650,42));
 return `<mxfile host="app.diagrams.net" modified="2026-08-20T00:00:00.000Z" agent="PromptCanvas" version="24.0.0" type="device"><diagram id="llm_capacity_quota_management" name="Gemini Capacity, Consumption & Resilience"><mxGraphModel dx="1760" dy="960" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1760" pageHeight="950" background="#FFFFFF" math="0" shadow="0"><root>${c.join('\n')}</root></mxGraphModel></diagram></mxfile>`;
}
