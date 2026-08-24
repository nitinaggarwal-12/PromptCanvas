const E=(v?:string|null)=>(v??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const SVG=(svg:string)=>`data:image/svg+xml,${encodeURIComponent(svg)}`;

export function generateTemplate40EnterpriseGenAIMultiAgentXml():string{
  const c:string[]=[];
  const rect=(id:string,v:string,x:number,y:number,w:number,h:number,s='')=>c.push(`<mxCell id="${id}" value="${E(v)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#91A7CF;strokeWidth=1.1;fontColor=#10224A;fontSize=10;${s}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`);
  const text=(id:string,v:string,x:number,y:number,w:number,h:number,s='')=>c.push(`<mxCell id="${id}" value="${E(v)}" style="text;html=1;strokeColor=none;fillColor=none;whiteSpace=wrap;fontColor=#10224A;fontSize=10;verticalAlign=middle;${s}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`);
  const image=(id:string,svg:string,x:number,y:number,w:number,h:number,s='')=>c.push(`<mxCell id="${id}" value="" style="shape=image;verticalLabelPosition=bottom;verticalAlign=top;imageAspect=0;aspect=fixed;image=${SVG(svg)};${s}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`);
  const edge=(id:string,src:string,tgt:string,color='#2E6AC7',dash=false,s='')=>c.push(`<mxCell id="${id}" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${color};strokeWidth=1.4;endArrow=block;endFill=1;${dash?'dashed=1;dashPattern=5 4;':''}${s}" edge="1" parent="1" source="${src}" target="${tgt}"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  const section=(n:string,title:string,x:number,y:number,w:number,h:number,color='#1E55A6')=>{rect(`sec${n}`,'',x,y,w,h,`strokeColor=${color};strokeWidth=1.4;`);rect(`badge${n}`,n,x-36,y,28,28,`shape=ellipse;fillColor=${color};strokeColor=${color};fontColor=#FFFFFF;fontStyle=1;fontSize=15;align=center;verticalAlign=middle;`);text(`sect${n}`,title,x-2,y+4,w-4,22,`fontStyle=1;fontSize=12;fontColor=${color};align=left;verticalAlign=top;`)};
  const card=(id:string,title:string,body:string,x:number,y:number,w:number,h:number,color='#2E6AC7',icon='●')=>{rect(id,'',x,y,w,h,`strokeColor=${color};`);text(`${id}i`,icon,x+8,y+8,26,26,`fontSize=17;fontColor=${color};align=center;fontStyle=1;`);text(`${id}t`,title,x+38,y+6,w-44,22,`fontStyle=1;fontSize=9.5;align=left;`);text(`${id}b`,body,x+38,y+27,w-44,h-32,`fontSize=7.6;align=left;verticalAlign=top;`)};
  const mini=(id:string,title:string,x:number,y:number,w:number,h:number,color='#2E6AC7',icon='●')=>{rect(id,'',x,y,w,h,`strokeColor=${color};`);text(`${id}i`,icon,x+4,y+4,20,20,`fontSize=14;fontColor=${color};align=center;fontStyle=1;`);text(`${id}t`,title,x+26,y+3,w-30,h-6,`fontStyle=1;fontSize=7.2;align=left;`)};

  // Header
  text('title','40. Enterprise GenAI & Multi-Agent Platform',18,8,650,40,'fontSize=27;fontStyle=1;align=left;fontColor=#10224A;');
  text('subtitle','End-to-End, Secure, Governed, and Observable Multi-Agent AI Platform on Google Cloud',697,14,535,30,'fontSize=11;fontStyle=1;align=left;');
  image('gcp',`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 34'><text x='0' y='24' font-family='Arial' font-size='24' font-weight='700' fill='#4285F4'>G</text><text x='22' y='24' font-family='Arial' font-size='19' fill='#5f6368'>Google Cloud</text></svg>`,1234,10,190,34);

  // 1 User & Channels
  section('1','USER & CHANNELS LAYER',175,48,1010,82,'#1E55A6');
  const users=[['Business\nUsers','👩'],['Analysts','👨'],['Developers','🧑'],['Operations','👩'],['External\nPartners','👨']];
  users.forEach((u,i)=>{text(`uicon${i}`,u[1],200+i*78,59,50,34,'fontSize=23;align=center;');text(`ul${i}`,u[0],197+i*78,93,56,28,'fontSize=7.6;fontStyle=1;align=center;');});
  text('channelsTitle','CHANNELS',698,52,390,18,'fontSize=11;fontStyle=1;align=center;fontColor=#1E55A6;');
  const channels=['Web App','Mobile App','Teams / Slack','API / SDK','Contact Center'];
  channels.forEach((v,i)=>mini(`ch${i}`,v,605+i*105,72,96,42,'#1E55A6',['◎','▯','✣','</>','◉'][i]));
  rect('copilot','Enterprise Copilots / Chat UI / Portal',1080,61,100,57,'strokeColor=#8A52C2;dashed=1;dashPattern=4 3;fontColor=#6C31A4;fontStyle=1;fontSize=8.5;align=center;verticalAlign=middle;');

  // 2 Experience & Access
  section('2','EXPERIENCE & ACCESS LAYER',175,145,1010,85,'#168C92');
  ['Identity & Access','Edge & Access Management','Tenant / Workspace Isolation'].forEach((v,i)=>text(`ea${i}`,v,190+i*330,150,310,18,'fontSize=9;fontStyle=1;align=center;fontColor=#168C92;'));
  const e1=['SSO\n(SAML/OIDC)','IAM','MFA','RBAC / ABAC']; e1.forEach((v,i)=>mini(`e1${i}`,v,188+i*68,173,62,45,'#168C92',['◎','⬢','▣','👥'][i]));
  const e2=['API Gateway','Cloud Load\nBalancing','Cloud Armor\n(WAF)','OAuth 2.0\n/OIDC','Rate Limiting\n& Quotas'];e2.forEach((v,i)=>mini(`e2${i}`,v,485+i*72,173,66,45,'#168C92',['⬡','▤','🛡','◉','◌'][i]));
  ['Tenant A','Tenant B','Tenant N'].forEach((v,i)=>mini(`tenant${i}`,v,850+i*105,173,96,45,'#168C92','👥'));

  // 3 Agent orchestration
  section('3','AGENT EXPERIENCE & ORCHESTRATION LAYER',175,245,1010,190,'#6C31A4');
  rect('agentLeft','',190,266,136,150,'strokeColor=#B28BD1;');
  ['Session Manager','State Manager','Conversation Manager','Identity Propagation','Context Assembler'].forEach((v,i)=>mini(`al${i}`,v,198,276+i*26,120,23,'#6C31A4',['▱','◫','◉','◎','≋'][i]));
  rect('supervisor','🤖  Supervisor / Orchestrator Agent',350,261,662,28,'strokeColor=#8A52C2;fillColor=#F7F1FC;fontStyle=1;fontSize=12;fontColor=#6C31A4;align=center;');
  rect('router','Agent Router / Planner / Task Decomposer',350,294,662,24,'strokeColor=#8A52C2;fillColor=#FBF7FE;fontStyle=1;fontSize=10;align=center;');
  const agents=[['Research\nAgent','Web research,\nmarket intel'],['Analytics\nAgent','Data analysis,\nBI, insight'],['Workflow\nAgent','Process\nautomation'],['Support\nAgent','Customer\nsupport'],['Retrieval\nAgent','Semantic search,\nRAG'],['Code\nAgent','Code gen,\nreview'],['Compliance\nAgent','Policy check,\nPII, regulatory']];
  agents.forEach((a,i)=>card(`ag${i}`,a[0],a[1],347+i*95,326,88,90,'#8A52C2','🤖'));
  rect('agentGov','',1024,261,146,155,'strokeColor=#B28BD1;');
  text('agtg','Agent Governance',1034,267,126,18,'fontSize=9;fontStyle=1;align=center;fontColor=#6C31A4;');
  ['Prompt Templates','Skill Library','Policy-Based Routing','Guardrails','A2A Protocol'].forEach((v,i)=>mini(`g${i}`,v,1034,289+i*24,126,21,'#6C31A4',['▱','✣','⌘','🛡','⇄'][i]));

  // 4 Model & Reasoning
  section('4','MODEL & REASONING LAYER',175,452,1010,103,'#2E6AC7');
  rect('safety','',190,469,157,72,'strokeColor=#6AA1E8;');text('st','Safety & Grounding Controls',196,473,145,16,'fontSize=8.6;fontStyle=1;align=center;fontColor=#1E55A6;');
  ['Input / Output Filters','PII / DLP Checks','Content Safety','Prompt Injection Guard','Grounding Enforcement'].forEach((v,i)=>text(`s${i}`,v,201,490+i*10,136,10,'fontSize=6.5;align=left;'));
  rect('gateway','Model Gateway / LLM Router\nRoute • Select • Ensemble • Fallback • Cost / Latency Optimization',380,466,585,35,'strokeColor=#6AA1E8;fontStyle=1;fontSize=8.2;align=center;');
  ['Gemini 1.5 Pro','Gemini 1.5 Flash','Gemma','Other Foundation Models','Smaller Models'].forEach((v,i)=>mini(`m${i}`,v,378+i*117,505,108,37,'#2E6AC7',['✦','✦','◈','⬡','≋'][i]));
  rect('modelops','',989,466,180,78,'strokeColor=#6AA1E8;');text('mot','Model Ops',995,469,168,15,'fontSize=8.6;fontStyle=1;align=center;');['Model Registry','Versioning','A/B Testing','Canary / Rollout','Cost Controls'].forEach((v,i)=>text(`mo${i}`,`▣  ${v}`,1000,486+i*11,157,10,'fontSize=6.8;align=left;'));

  // 5 Memory / Knowledge
  section('5','MEMORY, KNOWLEDGE & CONTEXT LAYER',175,575,1010,105,'#6C31A4');
  const mem=[['Short-Term / Conversation Memory','Recent turns, session state'],['Long-Term Memory / Profile Store','User preferences, history'],['Vector Index / Semantic Search','Embeddings, vector store'],['Knowledge Graph / Taxonomy','Entities, relations, ontology'],['Cache / Prompt-Context Store','Frequently used contexts']];
  mem.forEach((a,i)=>card(`mem${i}`,a[0],a[1],190+i*195,592,185,57,'#5F7FD7',['▱','👤','✣','◇','▤'][i]));
  rect('ragpipe','RAG Pipeline     1 Retrieve   →   2 Rerank   →   3 Ground   →   4 Cite   →   5 Context to Model',350,654,650,20,'strokeColor=#8A52C2;dashed=1;fontStyle=1;fontSize=7.5;align=center;');

  // 6 Tool / Protocol
  section('6','TOOL / PROTOCOL INTEGRATION LAYER',175,697,1010,70,'#168C92');
  const tools=[['MCP Tool Gateway','MCP Server'],['Tool Registry','Tools, Functions, APIs'],['Connectors / Adapters','Prebuilt Connectors'],['Execution Services','Function Calling / Jobs'],['Integration & Protocols','MCP • A2A • REST • gRPC • Webhooks']];
  tools.forEach((a,i)=>card(`tool${i}`,a[0],a[1],190+i*194,713,184,42,'#168C92',['⌘','◆','🔌','⌁','⇄'][i]));

  // 7 Enterprise systems and data sources
  section('7','ENTERPRISE SYSTEMS & DATA SOURCES LAYER',175,785,1010,94,'#2E6AC7');
  const srcs=[['Enterprise Applications','Salesforce • SAP • ServiceNow • Workday'],['Collaboration & Content','SharePoint • Drive • Confluence • Docs'],['Databases & Data Stores','AlloyDB • Cloud SQL • Spanner • Bigtable'],['Analytics & Data Platform','BigQuery • Dataplex • Data Catalog • Looker']];
  srcs.forEach((a,i)=>card(`src${i}`,a[0],a[1],190+i*245,801,232,58,'#5F7FD7',['◆','▱','▤','◉'][i]));
  text('formats','Documents • Email & Calendar • Chat • Images • Logs • APIs • Object Storage • Pub/Sub • Dataflow • Datastream • Structured / Unstructured / Streaming',190,862,960,14,'fontSize=6.5;align=center;fontColor=#4B5563;');

  // 8 Network security foundation
  section('8','NETWORK / SECURITY FOUNDATION (Zero-Trust)',45,903,1140,60,'#1E55A6');
  const net=['VPC Network / Private Subnets','Private Google Access / PSC','Cloud NAT / Egress Control','Firewall Rules / Least Privilege','Encryption in Transit','Encryption at Rest / CMEK','Secret Manager','Identity-Aware Proxy','Multi-Region & Resilience'];
  net.forEach((v,i)=>mini(`net${i}`,v,58+i*124,920,116,32,'#1E55A6',['▦','☁','↗','▥','🔒','🔐','▣','◉','🌐'][i]));

  // Right-side panels 8/9/10
  rect('govPanel','',1203,47,218,291,'strokeColor=#8A52C2;strokeWidth=1.4;');text('govpt','8  GOVERNANCE / HITL / COMPLIANCE',1215,53,194,20,'fontSize=10;fontStyle=1;fontColor=#6C31A4;align=left;');
  ['Human Approval Queue\nReview Console / Escalation','Prompt & Policy Governance\nPolicies, Guardrails, Standards','Audit Trail & Evidence Logging\nImmutable Logs, Traceability','PII / DLP Checks\nDetection, Masking, Redaction','Responsible AI\nRed Teaming, Bias, Safety','Compliance Controls\nHIPAA • GDPR • SOC2 • ISO27001'].forEach((v,i)=>mini(`gp${i}`,v,1216,78+i*41,190,36,'#8A52C2',['👥','▱','▣','⌕','🛡','▤'][i]));
  rect('obsPanel','',1203,351,218,246,'strokeColor=#2E6AC7;strokeWidth=1.4;');text('obspt','9  OBSERVABILITY / EVALUATION / FINOPS',1215,358,194,20,'fontSize=9.5;fontStyle=1;fontColor=#1E55A6;align=left;');
  ['Logs, Metrics, Traces','Model Monitoring\nLatency, Errors, Drift, Quality','Agent & Prompt Evaluation\nQuality, Safety, Groundedness','Feedback Loop','Cost & Token Tracking','SLOs / Alerts / Dashboards'].forEach((v,i)=>mini(`ob${i}`,v,1216,385+i*33,190,29,'#2E6AC7',['▤','◉','✓','↻','$','▣'][i]));
  rect('opsPanel','',1203,611,218,258,'strokeColor=#168C92;strokeWidth=1.4;');text('opspt','10  PLATFORM OPERATIONS / DELIVERY',1215,618,194,20,'fontSize=9.5;fontStyle=1;fontColor=#168C92;align=left;');
  ['CI/CD / GitOps\nCloud Build • ArgoCD','Prompt Management\nTemplates, Versioning, A/B Test','Model Registry & Pipeline','Runtime & Compute\nGKE • Cloud Run • Functions','Artifacts & Secrets\nRegistry • Secret Manager'].forEach((v,i)=>mini(`opx${i}`,v,1216,645+i*42,190,37,'#168C92',['↻','▱','▤','⬡','🔐'][i]));

  // Legend + end-to-end flow
  rect('legend','',18,978,220,37,'strokeColor=#91A7CF;');text('legt','LEGEND (Arrow Types)',28,980,85,13,'fontSize=7;fontStyle=1;align=left;');text('legb','→ User Interaction   ⇢ Agent-to-Agent   → Data Flow   ⇢ Control / Policy   ⇢ Async Events',28,994,200,16,'fontSize=6.3;align=left;');
  rect('flow','',252,977,945,39,'strokeColor=#C99A55;dashed=1;');text('flowt','END-TO-END FLOW (Example)',536,978,280,12,'fontSize=7.5;fontStyle=1;align=center;');
  const fs=['1 User Query','2 Orchestration','3 Retrieve & Tool Use','4 Model Inference','5 Human Approval','6 Response & Learn'];fs.forEach((v,i)=>text(`fs${i}`,v,270+i*150,994,140,16,'fontSize=6.7;fontStyle=1;align=center;'));

  // Major flows
  edge('f1','ch2','e22','#2E6AC7',false,'exitX=0.5;exitY=1;entryX=0.5;entryY=0;');
  edge('f2','e22','supervisor','#2E6AC7',false,'exitX=0.5;exitY=1;entryX=0.5;entryY=0;');
  agents.forEach((_,i)=>edge(`fa${i}`,'router',`ag${i}`,'#6C31A4',false,'exitX=0.5;exitY=1;entryX=0.5;entryY=0;'));
  edge('fgw','supervisor','gateway','#6C31A4',true,'exitX=0.5;exitY=1;entryX=0.5;entryY=0;');
  edge('fmem','ag4','mem2','#6C31A4',true,'exitX=0.5;exitY=1;entryX=0.5;entryY=0;');
  edge('ftool','ag2','tool0','#168C92',false,'exitX=0.5;exitY=1;entryX=0.5;entryY=0;');
  edge('fsrc','tool2','src0','#168C92',false,'exitX=0.5;exitY=1;entryX=0.5;entryY=0;');
  edge('fgov','supervisor','govPanel','#6C31A4',true,'exitX=1;exitY=0.5;entryX=0;entryY=0.4;');
  edge('fobs','gateway','obsPanel','#2E6AC7',true,'exitX=1;exitY=0.5;entryX=0;entryY=0.5;');
  edge('fops','tool3','opsPanel','#168C92',true,'exitX=1;exitY=0.5;entryX=0;entryY=0.5;');

  return `<mxGraphModel dx="1456" dy="1024" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1456" pageHeight="1024" background="#FFFFFF"><root><mxCell id="0"/><mxCell id="1" parent="0"/>${c.join('')}</root></mxGraphModel>`;
}
