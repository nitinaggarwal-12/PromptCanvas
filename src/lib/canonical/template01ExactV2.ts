const E=(v?:string|null)=>(v??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

export function generateTemplate01ExactV2Xml():string{
  const c:string[]=[];
  const rect=(id:string,v:string,x:number,y:number,w:number,h:number,s='')=>c.push(`<mxCell id="${id}" value="${E(v)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#8EA6CF;strokeWidth=1;fontColor=#10224A;fontSize=11;${s}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`);
  const text=(id:string,v:string,x:number,y:number,w:number,h:number,s='')=>c.push(`<mxCell id="${id}" value="${E(v)}" style="text;html=1;strokeColor=none;fillColor=none;whiteSpace=wrap;fontColor=#10224A;fontSize=11;verticalAlign=middle;${s}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`);
  const edge=(id:string,src:string,tgt:string,label='',color='#244C93',dash=false,s='')=>c.push(`<mxCell id="${id}" value="${E(label)}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${color};strokeWidth=1.6;endArrow=block;endFill=1;${dash?'dashed=1;dashPattern=6 4;':''}${s}" edge="1" parent="1" source="${src}" target="${tgt}"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  const hdr=(id:string,v:string,x:number,y:number,w:number,color='#233E8B')=>rect(id,v,x,y,w,24,`fillColor=${color};strokeColor=${color};fontColor=#FFFFFF;fontStyle=1;fontSize=11;align=center;verticalAlign=middle;`);
  const icon=(id:string,v:string,x:number,y:number,color='#244C93')=>rect(id,v,x,y,34,34,`shape=ellipse;fillColor=${color};strokeColor=${color};fontColor=#FFFFFF;fontStyle=1;fontSize=12;align=center;verticalAlign=middle;`);

  // Header / source identity
  text('t1','01 — System Context | NOVACURA Bio-Pharma Platform',24,15,850,38,'fontSize=27;fontStyle=1;align=left;');
  text('t2','Core Architecture Family | Bio-Pharma Product',24,52,560,26,'fontSize=15;fontStyle=1;fontColor=#4B5563;align=left;');

  // Governance & oversight
  rect('gov','',430,74,620,108,'strokeColor=#8B73B4;strokeWidth=1.5;');
  text('govtitle','Governance & Oversight',610,76,260,24,'fontSize=15;fontStyle=1;fontColor=#5B2A86;align=center;');
  const govs=[['Executive Leadership','Strategic Direction\nPortfolio Oversight\nValue Realization','EL'],['Compliance / Legal','Policy & Compliance\nRisk Management\nAudit & eDiscovery','CL'],['Data Governance Board','Data Standards\nQuality & Lineage\nAccess & Ethics','DG']];
  govs.forEach((g,i)=>{const x=448+i*194;rect(`g${i}`,'',x,108,180,58,'strokeColor=#A896C5;');icon(`gi${i}`,g[2],x+10,120,'#263F89');text(`gt${i}`,g[0],x+52,111,118,18,'fontStyle=1;fontSize=10;align=left;');text(`gb${i}`,g[1],x+52,130,118,33,'fontSize=8.5;align=left;verticalAlign=top;');});

  // Internal users panel
  rect('users','',20,155,260,595,'strokeColor=#6689C2;strokeWidth=1.5;');
  text('usersTitle','Internal Business Users',43,160,220,24,'fontSize=15;fontStyle=1;fontColor=#233E8B;align=left;');
  const users=[
    ['Research Scientists','Design studies, manage laboratory & preclinical data, experiment insights','RS'],
    ['Clinical Operations','Run trials, monitor sites, manage participants and activities','CO'],
    ['Regulatory Affairs Team','Prepare submissions, track commitments, manage variations','RA'],
    ['Safety / PV Specialists','Detect, evaluate, report adverse events and safety signals','PV'],
    ['Quality Assurance','Manage quality events, CAPA, audits, deviations','QA'],
    ['Medical Affairs','Respond to inquiries, medical content and evidence','MA'],
    ['Commercial Analytics','Market insights, forecasting, performance & customer analytics','CA']
  ];
  users.forEach((u,i)=>{const y=190+i*76;rect(`u${i}`,'',31,y,236,68,'strokeColor=#B5C5DF;');icon(`ui${i}`,u[2],43,y+14,'#233E8B');text(`ut${i}`,u[0],88,y+8,164,20,'fontStyle=1;fontSize=10.5;align=left;');text(`ub${i}`,u[1],88,y+28,164,35,'fontSize=8.5;align=left;verticalAlign=top;');});

  // Core NovaCura boundary
  rect('core','',445,195,615,515,'strokeColor=#233E8B;strokeWidth=2.2;');
  text('logo','NOVACURA',555,205,390,34,'fontSize=27;fontStyle=1;fontColor=#1D3F8C;align=center;');
  text('coreSub','Bio-Pharma Platform',585,238,330,26,'fontSize=18;fontStyle=1;fontColor=#1D3F8C;align=center;');

  const caps=[
    ['R&D & Clinical','Program Mgmt\nProtocols & Studies\nTrial Oversight','R&D'],
    ['Regulatory Affairs','Submissions\nCommitments\nVariations','REG'],
    ['Pharmacovigilance','Case Mgmt\nSignal Detection\nRisk Mgmt','PV'],
    ['Quality & Manufacturing','Quality Events\nCAPA & Change\nBatch & Release','Q&M'],
    ['Medical Information','Inquiry Mgmt\nMedical Content\nEvidence Library','MI'],
    ['Commercial Insights','Market Analytics\nForecasting\nPerformance KPIs','CI'],
    ['Document & Knowledge Hub','Document Mgmt\nVersion Control\nCollaboration','DK'],
    ['AI Copilot & Workflow Automation','Intelligent Assistance\nWorkflow Orchestration\nDecision Support','AI']
  ];
  caps.forEach((a,i)=>{const col=i%2,row=Math.floor(i/2);const x=465+col*288,y=278+row*86;rect(`cap${i}`,'',x,y,270,74,'strokeColor=#9BB0D2;');icon(`capi${i}`,a[2],x+10,y+18,i===7?'#5B2A86':'#233E8B');text(`capt${i}`,a[0],x+54,y+6,202,20,'fontStyle=1;fontSize=10.5;fontColor=#233E8B;align=left;');text(`capb${i}`,a[1],x+54,y+27,202,40,'fontSize=8.5;align=left;verticalAlign=top;');});

  // Core cross-cutting strip
  const cross=[['Security & Privacy','Zero Trust'],['Audit & Compliance','21 CFR Part 11'],['Data Lineage & Quality','End-to-End'],['Interoperability','Standards & APIs']];
  cross.forEach((a,i)=>{const x=466+i*145;rect(`cross${i}`,'',x,630,138,58,'strokeColor=#9BB0D2;fillColor=#F8FAFF;');text(`crossT${i}`,a[0],x+6,637,126,18,'fontStyle=1;fontSize=9;align=center;');text(`crossB${i}`,a[1],x+6,657,126,18,'fontSize=8;align=center;');});

  // External ecosystem
  rect('ext','',1265,170,250,495,'strokeColor=#6A9C6A;strokeWidth=1.5;');
  text('extTitle','External Ecosystem',1300,175,180,24,'fontSize=15;fontStyle=1;fontColor=#2E6B34;align=center;');
  const exts=[
    ['CRO / CDMO Partners','Study execution, data management, manufacturing & supply partners','CRO'],
    ['Healthcare Providers / Investigators','Site collaboration, patient enrollment, study conduct, clinical data','HCP'],
    ['Regulatory Authorities','eSubmissions, responses, queries, safety reports, compliance status','RA'],
    ['Patients / Patient Programs','Study participation, PROs, support programs, communications','PT']
  ];
  exts.forEach((a,i)=>{const y=215+i*107;rect(`ext${i}`,'',1280,y,220,92,'strokeColor=#A7C8AA;');icon(`exti${i}`,a[2],1292,y+26,'#2E6B34');text(`extt${i}`,a[0],1334,y+8,155,24,'fontStyle=1;fontSize=10;align=left;');text(`extb${i}`,a[1],1334,y+33,155,50,'fontSize=8.5;align=left;verticalAlign=top;');});

  // Enterprise systems bottom
  rect('ent','',25,765,920,160,'strokeColor=#6689C2;strokeWidth=1.5;');
  text('entTitle','Enterprise Systems (Upstream / Downstream)',310,931,420,20,'fontSize=11;fontStyle=1;fontColor=#233E8B;align=center;');
  const systems=[['Veeva Vault','Regulatory / Quality\nDocuments','VV'],['Salesforce\nHealth Cloud','CRM / HCP / Patient\nEngagement','SF'],['SAP S/4HANA','ERP / Supply Chain /\nFinance','SAP'],['Laboratory /\nLIMS Systems','Lab Data, Results,\nSamples','LAB'],['Clinical Trial Systems\n(EDC / CTMS)','Study Data, Sites,\nSubjects','CTS'],['Safety Database\n(Argus-like)','Safety Cases,\nReports, Signals','SAFE'],['Data Lake /\nWarehouse','Analytics, Reporting,\nData Sharing','DL']];
  systems.forEach((s,i)=>{const x=38+i*128;rect(`sys${i}`,'',x,785,116,122,'strokeColor=#A7B9D6;');text(`slogo${i}`,s[2],x+8,802,100,28,'fontStyle=1;fontSize=14;fontColor=#233E8B;align=center;');text(`st${i}`,s[0],x+7,834,102,27,'fontStyle=1;fontSize=8.5;align=center;');text(`sb${i}`,s[1],x+7,865,102,34,'fontSize=7.5;align=center;');});

  // AI / Knowledge services bottom-right
  rect('ai','',960,765,555,160,'strokeColor=#7657A4;strokeWidth=1.5;');
  text('aiTitle','AI / Knowledge Services',1110,931,260,20,'fontSize=11;fontStyle=1;fontColor=#5B2A86;align=center;');
  const ais=[['Enterprise Search /\nKnowledge Base','Search, Taxonomy,\nKnowledge Articles','ES'],['Vector Index /\nSemantic Search','Embeddings Store,\nSemantic Retrieval','VS'],['Approved LLM Service\n(GCP Vertex AI)','Secure, Governed\nGenAI Service','LLM']];
  ais.forEach((s,i)=>{const x=978+i*172;rect(`ai${i}`,'',x,785,156,122,'strokeColor=#B7A7CF;');icon(`aii${i}`,s[2],x+58,799,'#5B2A86');text(`ait${i}`,s[0],x+8,838,140,28,'fontStyle=1;fontSize=8.7;align=center;');text(`aib${i}`,s[1],x+8,869,140,30,'fontSize=7.7;align=center;');});

  // Platform admin / security / support
  rect('ops','',85,942,635,64,'strokeColor=#6689C2;strokeWidth=1.3;');
  const ops=[['Platform Admins','Tenant & Configuration Mgmt\nRelease & Change Mgmt','PA'],['Security / IAM Team','Identity & Access Mgmt\nThreat Detection & Response','IAM'],['Support / Operations','Incident & Problem Mgmt\nAvailability & Performance','OPS']];
  ops.forEach((o,i)=>{const x=98+i*205;rect(`op${i}`,'',x,949,190,50,'strokeColor=#A7B9D6;');icon(`opi${i}`,o[2],x+8,957,'#233E8B');text(`opt${i}`,o[0],x+50,952,132,18,'fontStyle=1;fontSize=9;align=left;');text(`opb${i}`,o[1],x+50,970,132,24,'fontSize=7.5;align=left;');});

  // Legend
  rect('legend','',785,942,730,64,'strokeColor=#9AA8BA;');
  text('legendTitle','Legend',802,947,70,16,'fontStyle=1;fontSize=9;align=left;');
  text('legendTxt','User / Actor     Application / Service     Data Source / System     AI Service     External Partner     Governance / Control',802,965,500,22,'fontSize=7.5;align=left;');
  text('legendFlows','→ Data / Information Flow     ⇢ Control / Governance Flow     → External Exchange / Collaboration',1300,948,205,42,'fontSize=7.5;align=left;');

  // Main user access and governance flows
  edge('uaccess','users','core','Secure Web Portal\n(Single Experience)','#244C93',false,'exitX=1;exitY=0.45;entryX=0;entryY=0.45;');
  text('rbac','Role-Based Access\n& Workflows',315,390,110,42,'fontSize=9;align=center;');
  edge('govcore','gov','core','','#5B2A86',true,'exitX=0.5;exitY=1;entryX=0.5;entryY=0;');

  // External exchanges
  edge('e0','core','ext0','Collaboration Packages & Data\nExchange (APIs / SFTP)','#2E6B34',false,'exitX=1;exitY=0.20;entryX=0;entryY=0.5;');
  edge('e1','core','ext1','Clinical Data & Documents\n(HTTPS / APIs)','#2E6B34',false,'exitX=1;exitY=0.38;entryX=0;entryY=0.5;');
  edge('e2','core','ext2','Submissions & Responses\n(IDMP / eCTD)','#2E6B34',false,'exitX=1;exitY=0.58;entryX=0;entryY=0.5;');
  edge('e3','core','ext3','Programs & Communications\n(Secure Portal / APIs)','#2E6B34',false,'exitX=1;exitY=0.78;entryX=0;entryY=0.5;');

  // Downstream enterprise / AI flows
  systems.forEach((_,i)=>edge(`d${i}`,'core',`sys${i}`,'','#244C93',false,'exitX=0.15;exitY=1;entryX=0.5;entryY=0;'));
  ais.forEach((_,i)=>edge(`a${i}`,'core',`ai${i}`,'','#5B2A86',true,'exitX=0.82;exitY=1;entryX=0.5;entryY=0;'));
  text('flows1','Documents Sync\n(REST / Bulk API)',45,736,120,28,'fontSize=7.5;align=center;');
  text('flows2','Customer & HCP\nData Exchange\n(REST / APIs)',180,731,125,34,'fontSize=7.5;align=center;');
  text('flows3','Product, Finance &\nManufacturing Data\n(IDoc / OData)',322,731,125,34,'fontSize=7.5;align=center;');
  text('flows4','Lab Results &\nData Ingestion\n(HL7 / FHIR / APIs)',455,731,125,34,'fontSize=7.5;align=center;');
  text('flows5','Trial Data Ingestion\n(EDC / CTMS APIs)',585,731,125,34,'fontSize=7.5;align=center;');
  text('flows6','Safety Cases &\nReports Exchange\n(REST / ICH E2B)',708,731,125,34,'fontSize=7.5;align=center;');
  text('flows7','Curated Analytics\n& Reporting\n(SQL / APIs)',833,731,118,34,'fontSize=7.5;align=center;');
  text('flows8','Enterprise Content\nIndexing & Sync\n(APIs)',978,731,125,34,'fontSize=7.5;align=center;');
  text('flows9','Semantic Search\nQueries & Results\n(REST / Graph)',1138,731,125,34,'fontSize=7.5;align=center;');
  text('flows10','Grounded AI\nRequests / Responses\n(Private Endpoint)',1302,731,125,34,'fontSize=7.5;align=center;');

  text('foot','Conceptual context view — not deployment topology',24,1003,420,15,'fontSize=8.5;fontStyle=2;fontColor=#5B6473;align=left;');

  return `<mxGraphModel dx="1536" dy="1024" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1536" pageHeight="1024" background="#FFFFFF"><root><mxCell id="0"/><mxCell id="1" parent="0"/>${c.join('')}</root></mxGraphModel>`;
}
