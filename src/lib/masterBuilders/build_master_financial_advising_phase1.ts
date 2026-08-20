/** Blueprint 38 — Automated Personalized Financial Advising (human-governed). */
const BASE='https://cdn.jsdelivr.net/npm/gcp-icons@1.0.6/dist/icons/';
const ICON={bigquery:`${BASE}bigquery-512-color.svg`,vertex:`${BASE}vertexai-512-color.svg`,looker:`${BASE}looker-512-color.svg`,salesforce:'https://cdn.simpleicons.org/salesforce'};
const esc=(s:string)=>s.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const v=(id:string,value:string,style:string,x:number,y:number,w:number,h:number)=>`<mxCell id="${id}" value="${esc(value)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`;
const img=(id:string,url:string,x:number,y:number,w:number,h:number)=>v(id,'',`shape=image;imageAspect=0;aspect=fixed;image=${url};align=center;verticalAlign=middle;`,x,y,w,h);
const zone=(id:string,n:number,title:string,sub:string,x:number,w:number,accent:string,fill:string)=>[
 v(id,'',`rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${accent};strokeWidth=1.4;`,x,70,w,620),
 v(`${id}_n`,String(n),`ellipse;whiteSpace=wrap;html=1;fillColor=${accent};strokeColor=${accent};fontColor=#FFFFFF;fontStyle=1;fontSize=12;align=center;verticalAlign=middle;`,x+14,84,30,30),
 v(`${id}_h`,`<b>${title}</b><br><span style="font-size:9.7px;color:#64748B">${sub}</span>`,'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=3;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=12.3;',x+55,78,w-68,46)
].join('\n');
const card=(id:string,title:string,body:string,x:number,y:number,w:number,h:number,accent:string,icon?:string,fill='#FFFFFF')=>{const i=icon?img(`${id}_icon`,icon,x+13,y+Math.max(10,(h-34)/2),34,34):'';const tx=icon?x+57:x+14,tw=icon?w-69:w-28;return [v(id,'',`rounded=1;arcSize=7;whiteSpace=wrap;html=1;overflow=hidden;fillColor=${fill};strokeColor=${accent};strokeWidth=1.05;`,x,y,w,h),i,v(`${id}_label`,`<b>${title}</b><br><span style="font-size:9.7px;color:#64748B">${body}</span>`,'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=4;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=10.9;',tx,y+6,tw,h-12)].filter(Boolean).join('\n');};
const edge=(id:string,s:string,t:string,label:string,color='#2563EB',dashed=false,exitX=1,exitY=.5,entryX=0,entryY=.5)=>`<mxCell id="${id}" value="${esc(label)}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${color};strokeWidth=1.8;${dashed?'dashed=1;dashPattern=6 4;':''}endArrow=block;endFill=1;fontSize=9.7;fontColor=#334155;labelBackgroundColor=#FFFFFF;exitX=${exitX};exitY=${exitY};entryX=${entryX};entryY=${entryY};" edge="1" parent="1" source="${s}" target="${t}"><mxGeometry relative="1" as="geometry"/></mxCell>`;

export function buildFinancialAdvisingPhase1Xml():string{
 const c:string[]=['<mxCell id="0"/>','<mxCell id="1" parent="0"/>'];
 c.push(v('purpose','<b>HUMAN-GOVERNED PERSONALIZED FINANCIAL ADVISING</b>   Client request → identity/consent → governed data → recommendation → suitability/compliance review → advisor approval → execution/audit. Regulatory applicability must be validated by the institution.','rounded=1;arcSize=7;whiteSpace=wrap;html=1;overflow=hidden;spacing=7;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.2;fontColor=#334155;fontSize=11.2;align=center;verticalAlign=middle;',30,20,1700,38));

 c.push(zone('client',1,'CLIENT EXPERIENCE','Capture goal and context without bypassing identity/consent',30,250,'#1A73E8','#EFF6FF'));
 c.push(card('channels','Web / mobile / advisor portal','Client or advisor enters financial goal, horizon, constraints and questions.',50,142,210,82,'#1A73E8'));
 c.push(card('identity','Identity, consent & entitlements','Authenticate client/advisor • consent/use purpose • account scope • role/authorization',50,246,210,94,'#1A73E8'));
 c.push(card('profile','Client profile','Risk tolerance • objectives • time horizon • liquidity needs • restrictions • household/account context',50,362,210,96,'#1A73E8'));
 c.push(card('request','Advice request','Explicit requested decision/problem; no hidden autonomous trading intent.',50,480,210,82,'#1A73E8'));
 c.push(card('crm','CRM / service context','Optional Salesforce or enterprise CRM context under approved access policy',50,584,210,70,'#1A73E8',ICON.salesforce));

 c.push(zone('data',2,'GOVERNED FINANCIAL DATA','Assemble facts with provenance and freshness',300,270,'#0F8B82','#ECFDF5'));
 c.push(card('portfolio','Portfolio & positions','Holdings • cost basis • transactions • cash • account/tax attributes from systems of record',320,142,230,94,'#0F8B82'));
 c.push(card('market','Market & product data','Approved pricing/reference feeds • product metadata • research/house views where licensed',320,258,230,90,'#0F8B82'));
 c.push(card('bq','BigQuery governed analytical layer','Curated historical/analytical features with source, timestamp and quality status',320,370,230,90,'#0F8B82',ICON.bigquery));
 c.push(card('quality','Data quality & freshness gate','Missing/stale/conflicting facts are surfaced; critical gaps stop recommendation generation.',320,482,230,88,'#D93025',undefined,'#FFF7F7'));
 c.push(card('lineage','Evidence package','Source IDs • timestamps • assumptions • calculation inputs • data-quality status',320,592,230,62,'#0F8B82'));

 c.push(zone('reason',3,'ADVICE & ANALYSIS','Generate explainable recommendation candidates—not an order',590,300,'#7B61A8','#F7F4FF'));
 c.push(card('model','Gemini / approved model','Summarize context, explain alternatives and draft rationale using institution-approved model/configuration.',610,142,260,92,'#7B61A8',ICON.vertex));
 c.push(card('quant','Deterministic / quantitative services','Portfolio analytics • risk/return calculations • tax-aware analysis • product constraints from controlled services',610,256,260,94,'#7B61A8'));
 c.push(card('recommend','Recommendation candidates','Alternatives • expected trade-offs • assumptions • confidence/limitations • evidence references',610,372,260,94,'#7B61A8'));
 c.push(card('tlh','Tax-loss harvesting recommendation','Identify candidate opportunities only; validate tax/legal/institutional rules and require advisor/client authorization before execution.',610,488,260,104,'#E87900','#FFF7ED'));
 c.push(card('explain','Explainability package','Why this recommendation • source/calculation references • model/tool versions • unresolved uncertainty',610,614,260,40,'#7B61A8'));

 c.push(zone('govern',4,'SUITABILITY, RISK & HUMAN AUTHORITY','Independent checks before any consequential action',910,300,'#D93025','#FEF2F2'));
 c.push(card('suitability','Suitability / policy rules','Risk profile • concentration • restricted products • conflicts • account/product eligibility • institutional policy',930,142,260,96,'#D93025'));
 c.push(card('compliance','Compliance / supervisory review','Applicable regulatory and supervisory controls are institution-defined; architecture does not imply certification.',930,260,260,94,'#D93025'));
 c.push(card('advisor','Human advisor approval','Advisor reviews data, recommendation, alternatives, limitations and suitability evidence. APPROVE / REVISE / REJECT.',930,376,260,104,'#D93025','#FFF7F7'));
 c.push(card('clientauth','Client authorization — when required','Capture required client consent/authorization for recommended transaction or account change.',930,502,260,90,'#D93025'));
 c.push(card('auditdecision','Decision record','Named reviewer • timestamp • policy results • rationale • exceptions • client authorization evidence',930,614,260,40,'#D93025'));

 c.push(zone('execute',5,'EXECUTION & RECORDS','Only approved instructions reach systems of record',1230,250,'#E87900','#FFF7ED'));
 c.push(card('order','Order / workflow API','Transmit only approved structured instruction to broker/custodian/workflow system through controlled API.',1250,142,210,94,'#E87900'));
 c.push(card('confirm','Execution confirmation','Capture accepted/rejected order status, fills/changes and reconciliation identifiers.',1250,258,210,90,'#E87900'));
 c.push(card('books','Books & records','Immutable/admissible records according to institutional retention and recordkeeping policy.',1250,370,210,90,'#E87900'));
 c.push(card('monitor','Post-advice monitoring','Drift, client changes, product changes and exceptions create review events—not silent portfolio changes.',1250,482,210,94,'#E87900'));
 c.push(card('feedback','Outcome feedback','Advisor/client outcome feeds controlled evaluation and policy/model improvement.',1250,598,210,56,'#E87900'));

 c.push(zone('oversight',6,'OVERSIGHT & OPERATIONS','Auditability, quality and model-risk evidence',1500,230,'#334155','#F8FAFC'));
 c.push(card('dashboard','Looker / oversight cockpit','Advice volume • approval/rejection • exceptions • data-quality failures • model/tool quality trends',1520,142,190,88,'#334155',ICON.looker));
 c.push(card('modelrisk','Model risk & evaluation','Regression tests • groundedness/factuality • policy adherence • approved model/prompt/tool versions',1520,252,190,96,'#334155'));
 c.push(card('security','Security & privacy','IAM • least privilege • encryption • audit • Sensitive Data Protection where applicable',1520,370,190,90,'#334155'));
 c.push(card('incident','Incident / complaint handling','Trace recommendation → evidence → reviewer → execution record; support investigation and remediation.',1520,482,190,94,'#334155'));
 c.push(card('kpi','KPIs are workload-defined','No universal compliance, performance, return or savings guarantees in the reference architecture.',1520,598,190,56,'#D93025','#FFF7F7'));

 c.push(edge('e1','request','portfolio','request + scope')); c.push(edge('e2','lineage','model','facts + evidence','#0F8B82')); c.push(edge('e3','recommend','suitability','candidate advice','#7B61A8')); c.push(edge('e4','suitability','advisor','policy evidence','#D93025')); c.push(edge('e5','advisor','order','approved instruction','#E87900')); c.push(edge('e6','confirm','feedback','outcome','#64748B',true)); c.push(edge('e7','feedback','modelrisk','evaluation signal','#64748B',true));
 c.push(v('footer','<b>CONTROL PRINCIPLE:</b> Generative AI can assemble evidence and draft explanations; deterministic services perform controlled calculations; suitability/compliance policy and authorized humans retain authority over consequential recommendations and execution.','rounded=1;arcSize=7;whiteSpace=wrap;html=1;overflow=hidden;spacing=7;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.1;fontColor=#475569;fontSize=10.5;align=center;verticalAlign=middle;',30,720,1700,56));
 return `<mxfile host="app.diagrams.net" modified="2026-08-20T00:00:00.000Z" agent="PromptCanvas" version="24.0.0" type="device"><diagram id="personalized_financial_advising_phase1" name="Automated Personalized Financial Advising"><mxGraphModel dx="1760" dy="830" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1760" pageHeight="820" background="#FFFFFF"><root>${c.join('\n')}</root></mxGraphModel></diagram></mxfile>`;
}
