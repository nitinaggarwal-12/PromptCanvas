// Blueprint 34 v2 — AI Center of Excellence Operating Model.
// Native editable mxGraph; self-contained; no external icon/CDN dependencies.

const BOX='rounded=1;arcSize=8;whiteSpace=wrap;html=1;verticalAlign=middle;fontFamily=Inter;';
const TEXT='text;html=1;strokeColor=none;fillColor=none;fontFamily=Inter;verticalAlign=middle;';
const esc=(v:unknown)=>String(v??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const cell=(id:string,value:string,style:string,x:number,y:number,w:number,h:number)=>`<mxCell id="${id}" value="${value.includes('&lt;')?value:esc(value)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`;
const edge=(id:string,s:string,t:string,color='#175CD3',label='',dashed=false)=>`<mxCell id="${id}" value="${esc(label)}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${color};strokeWidth=2;${dashed?'dashed=1;dashPattern=6 4;':''}endArrow=block;endFill=1;fontSize=10;fontColor=#344054;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="${s}" target="${t}"><mxGeometry relative="1" as="geometry"/></mxCell>`;
const text=(id:string,value:string,x:number,y:number,w:number,h:number,size=11,color='#101828',align='left',bold=false)=>cell(id,`${bold?'&lt;b&gt;':''}${esc(value).replace(/\n/g,'&lt;br&gt;')}${bold?'&lt;/b&gt;':''}`,`${TEXT}fontSize=${size};fontColor=${color};align=${align};whiteSpace=wrap;overflow=hidden;`,x,y,w,h);
const box=(id:string,title:string,body:string,x:number,y:number,w:number,h:number,stroke='#B4C8EA',fill='#FFFFFF',accent='#101828')=>[
 cell(id,'',`${BOX}fillColor=${fill};strokeColor=${stroke};strokeWidth=1.2;`,x,y,w,h),
 cell(`${id}_txt`,`&lt;b&gt;${esc(title)}&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:10px;color:#475467;line-height:1.3&quot;&gt;${esc(body).replace(/\n/g,'&lt;br&gt;')}&lt;/span&gt;`,`${TEXT}fontSize=11;fontColor=${accent};align=left;spacing=7;whiteSpace=wrap;overflow=hidden;`,x+6,y+4,w-12,h-8)
];
const section=(id:string,n:number,title:string,sub:string,x:number,y:number,w:number,h:number,stroke:string,fill:string)=>[
 cell(id,'',`${BOX}fillColor=${fill};strokeColor=${stroke};strokeWidth=1.5;`,x,y,w,h),
 cell(`${id}_n`,String(n),`ellipse;html=1;fillColor=${stroke};strokeColor=${stroke};fontColor=#FFFFFF;fontStyle=1;fontSize=13;align=center;`,x+12,y+12,28,28),
 cell(`${id}_t`,`&lt;b&gt;${esc(title)}&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:10px;color:#64748B&quot;&gt;${esc(sub)}&lt;/span&gt;`,`${TEXT}fontSize=12;fontColor=#101828;align=left;`,x+50,y+6,w-62,42)
];

export function getApprovedAiCoeOperatingModelV2Xml():string{
 const n:string[]=['<mxCell id="0"/>','<mxCell id="1" parent="0"/>']; const e:string[]=[]; const W=1760,H=1080;
 n.push(cell('count','&lt;b&gt;34 OF 50&lt;/b&gt;',`${BOX}fillColor=#175CD3;strokeColor=#175CD3;fontColor=#FFFFFF;fontStyle=1;fontSize=17;align=center;`,16,14,118,42));
 n.push(text('title','AI Center of Excellence (CoE) Operating Model',155,10,1020,42,29,'#101828','left',true));
 n.push(text('code','P5-AI-L-06',155,49,120,26,12,'#175CD3','left',true));
 n.push(text('sub','Govern Gemini Enterprise adoption and custom agent delivery with explicit capability boundaries, decision rights, maturity gates, value metrics and operational handoff.',280,49,1100,30,12,'#475467'));
 n.push(cell('master','MASTER BLUEPRINT',`${BOX}fillColor=#FFFFFF;strokeColor=#175CD3;fontColor=#175CD3;fontStyle=1;fontSize=11;align=center;`,1560,14,180,30));
 ['Strategy & Governance','Conceptual','Layer 1 (Foundation)','Phase 5: Transition Planning & Operational Readiness'].forEach((v,i)=>n.push(cell(`chip${i}`,v,`${BOX}fillColor=#FFFFFF;strokeColor=#B4C8EA;fontColor=#101828;fontStyle=1;fontSize=10.5;align=center;`,16+[0,175,305,510][i],86,[165,120,195,365][i],28)));
 n.push(cell('mission','&lt;b&gt;AI CoE MISSION&lt;/b&gt;  Turn Gemini Enterprise capabilities into governed, adopted, measurable business outcomes — with clear separation between end-user experience, custom Agent Platform workloads, connectors, tool access and operations.',`${BOX}fillColor=#F8FBFF;strokeColor=#8AB4F8;fontColor=#334155;fontSize=11.5;align=center;`,16,125,1728,44));

 const topY=184, topH=500;
 n.push(...section('strategy',1,'STRATEGY & DEMAND','Choose outcomes before technology',16,topY,265,topH,'#175CD3','#EFF6FF'));
 [['north','North-star outcomes','Business value • employee experience • risk posture • operational efficiency'],['intake','Use-case intake','Persona • job-to-be-done • frequency • data • action • expected outcome • accountable owner'],['ready','Readiness assessment','Data • security • governance • integration • change readiness • technical dependencies'],['prior','Portfolio prioritization','Value × feasibility × risk × time-to-learning • stop weak ideas early'],['owner','Outcome ownership','Business sponsor • product owner • technical owner • adoption owner • risk owner']].forEach((r,i)=>n.push(...box(r[0],r[1],r[2],34,245+i*82,229,68,'#7AA7E8','#FFFFFF','#073B83')));

 n.push(...section('experience',2,'GEMINI ENTERPRISE EXPERIENCE','End-user capabilities; not custom Agent Runtime',296,topY,315,topH,'#B83280','#FDF2F8'));
 [['assistant','Assistant & enterprise search','Open-ended work grounded in connected enterprise/public data'],['notebook','Gemini Notebook Enterprise','Curated-source research, synthesis, Q&A and reusable project/topic knowledge'],['skills','Skills','Reusable assistant instructions for recurring tasks; separate from agent workflows'],['designer','Agent Gallery & Agent Designer','Discover or create employee agents; no-code/low-code, bounded workflows'],['rule','Selection rule','Assistant = one-off • Skill = repeatable instruction • Agent = multi-step autonomous workflow. Do not model Skills as subagents.']].forEach((r,i)=>n.push(...box(r[0],r[1],r[2],314,245+i*82,279,68,i===4?'#D92D20':'#D99BC1',i===4?'#FFF5F5':'#FFFFFF','#8B1E5A')));

 n.push(...section('engineering',3,'CUSTOM AGENT ENGINEERING','Production lifecycle on Agent Platform / ADK',626,topY,315,topH,'#7F56D9','#F8F5FF'));
 [['build','Build','Agent Studio • ADK • Agent Garden • Model Garden • approved frameworks'],['scale','Scale','Agent Runtime • Sessions • Memory Bank • Code Execution when justified'],['govern','Govern','Agent Registry • Agent Identity • Agent Gateway • Model Armor • policy/audit'],['interop','Interoperate','MCP for tools/context • A2A for separately deployed remote agents • registered endpoints'],['opt','Optimize','Gen AI evaluation • Agent Observability • quality regression • SRE/capacity/cost']].forEach((r,i)=>n.push(...box(r[0],r[1],r[2],644,245+i*82,279,68,'#A48AE1','#FFFFFF','#6941C6')));

 n.push(...section('access',4,'DATA, CONNECTORS & TOOL ACCESS','Separate connector governance from custom-agent tool egress',956,topY,390,topH,'#0F8B82','#ECFDF5'));
 n.push(...box('ge_conn','Gemini Enterprise connectors','Microsoft 365 • Salesforce • ServiceNow • Jira/Confluence • Google/Cloud data • permissions-aware retrieval • ACL mapping',974,245,354,82,'#4AB3A8','#FFFFFF','#067A71'));
 n.push(...box('factory','Connector factory','Standard connector first • custom connector when needed • sync/federation choice • monitoring • ownership • data freshness',974,338,354,78,'#4AB3A8','#FFFFFF','#067A71'));
 n.push(...box('tool_access','Custom tool access (MCP / API / A2A)','Agent Platform: Agent Gateway can govern registered MCP/API egress. Gemini Enterprise connector/custom-MCP traffic follows its connector path; do not assume Agent Gateway policies apply.',974,427,354,98,'#D92D20','#FFF5F5','#B42318'));
 n.push(...box('maturity','Feature maturity gates','GA • Preview/allowlist • connector mode • region/edition • actions • quotas • unsupported/do-not-use. Validate before delivery dates.',974,536,170,120,'#E87900','#FFF7ED','#9A3412'));
 n.push(...box('risk_tier','Risk tier & human authority','Low = self-service • Medium = oversight • High = approval required • Critical = manual/human-in-the-loop. Policy defines thresholds.',1158,536,170,120,'#7F56D9','#F8F5FF','#6941C6'));

 n.push(...section('outcomes',5,'OPERATING OUTCOMES','Value delivery with guardrails',1361,topY,383,topH,'#E87900','#FFF7ED'));
 [['secure','Secure, compliant, trusted','Policy enforcement • data protection • auditability • privacy by design'],['adopt','Adoption & experience','Usable • intuitive • discoverable • measurable satisfaction'],['ops','Operational excellence','Reliable • observable • resilient • cost-optimized'],['align','Strategic alignment','Enable business goals and transformation'],['impact','Measurable impact','Realized value • productivity • risk reduction • cost savings']].forEach((r,i)=>n.push(...box(r[0],r[1],r[2],1379,245+i*82,347,68,'#E6A04F','#FFFFFF','#9A4A00')));

 e.push(edge('f1','north','assistant','#175CD3','select capability'));
 e.push(edge('f2','assistant','build','#7F56D9','custom path where needed'));
 e.push(edge('f3','build','ge_conn','#0F8B82','data / integration readiness'));
 e.push(edge('f4','ge_conn','secure','#E87900','deliver outcomes'));

 // Full-width operating model band: decision rights, adoption, metrics, feedback, guardrails, exit/handoff.
 n.push(cell('op_band','',`${BOX}fillColor=#F8FAFC;strokeColor=#334155;strokeWidth=1.4;`,16,706,1728,300));
 n.push(cell('op_head','&lt;b&gt;5  OPERATING MODEL, GOVERNANCE & ADOPTION&lt;/b&gt;   Decision rights + measurable value + explicit path out of the CoE',`${BOX}fillColor=#073B83;strokeColor=#073B83;fontColor=#FFFFFF;fontStyle=1;fontSize=12;align=left;spacingLeft=14;`,16,706,1728,42));
 const colX=[34,282,530,778,1026,1274], cw=230;
 n.push(...box('raci','Decision rights (RACI)','Business Sponsor = A for outcome • Product Owner = R for backlog • CoE/AI Platform = A/R for standards/platform • InfoSec/Risk = A for policy • Data Owner = A for data • IT Ops/SRE = A for operations • Finance = C for cost • Compliance = A for regulated controls',colX[0],762,cw,210,'#7AA7E8','#FFFFFF','#073B83'));
 n.push(...box('enable','Enablement & champions','Role-based training • onboarding • reusable playbooks • office hours • Community of Practice • champion network • change communications',colX[1],762,cw,210,'#7AA7E8','#FFFFFF','#073B83'));
 n.push(...box('metrics','Value realization metrics','Activation / active users • task success • cycle-time reduction • quality/accuracy • cost per outcome • user satisfaction • business KPI / ROI • risk reduction',colX[2],762,cw,210,'#7AA7E8','#FFFFFF','#073B83'));
 n.push(...box('feedback','Product / feature feedback loop','Usage insights + telemetry → feedback/ideas → prioritize/decide → backlog & roadmap → release/communicate → measure again. Track blockers and launch-stage maturity.',colX[3],762,cw,210,'#7AA7E8','#FFFFFF','#073B83'));
 n.push(...box('guard','Risk, compliance & guardrails','Policy library/enforcement • data classification • model/content safety • least privilege • audit evidence • access reviews • regulatory controls • red-team/adversarial tests proportional to risk',colX[4],762,cw,210,'#D92D20','#FFF5F5','#B42318'));
 n.push(...box('handoff','Exit & operational handoff','Production-readiness checklist • runbooks/SLOs • documentation/KT • baseline metrics • support model/escalation • change/release ownership • named operational owner • CoE exits day-to-day delivery and retains standards/portfolio governance',colX[5],762,cw,210,'#1F9D62','#F2FBF6','#067647'));
 e.push(edge('fb1','opt','metrics','#7F56D9','quality + telemetry',true));
 e.push(edge('fb2','metrics','feedback','#175CD3','insights'));
 e.push(edge('fb3','feedback','strategy','#175CD3','reprioritize',true));
 e.push(edge('gov1','risk_tier','guard','#D92D20','govern by risk',true));
 e.push(edge('hand1','impact','handoff','#1F9D62','operationalize',true));

 n.push(text('handoff_roles','Operational handoff model: Product Team (roadmap/features/quality) • FDE (production engineering where engaged) • PSO/SI (delivery/integration) • TAM (technical account continuity) • Support/Delivery teams (support + training) • IT Ops/SRE (run & operate).',34,980,1690,24,10.3,'#475467','center'));
 n.push(text('legend','Flow legend:  Blue = intake/selection  •  Purple = engineering/build  •  Green = integration/access  •  Orange = outcomes  •  Dashed = feedback/governance.  ADK = Agent Development Kit  •  MCP = Model Context Protocol  •  A2A = Agent-to-Agent.',24,1021,1712,30,10.2,'#475467','center'));
 return `<mxfile host="app.diagrams.net" modified="2026-08-20T00:00:00.000Z" agent="PromptCanvas" version="24.7.17"><diagram id="approved_blueprint_34_v2" name="AI Center of Excellence (CoE) Operating Model — P5-AI-L-06"><mxGraphModel dx="${W}" dy="${H}" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageEnabled="0" pageScale="1" pageWidth="${W}" pageHeight="${H}" math="0" shadow="0"><root>${n.join('')}${e.join('')}</root></mxGraphModel></diagram></mxfile>`;
}
