// Blueprint 29 — user-approved 6Rs Migration Disposition Matrix.
// Native editable mxGraph master; self-contained, no external icon/CDN dependencies.

const BOX = 'rounded=1;arcSize=8;whiteSpace=wrap;html=1;verticalAlign=middle;fontFamily=Inter;';
const TEXT = 'text;html=1;strokeColor=none;fillColor=none;fontFamily=Inter;verticalAlign=middle;';

function esc(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
function safe(value: unknown): string {
  const raw = String(value ?? '');
  if (raw.includes('&lt;') || raw.includes('&#')) return raw;
  return esc(raw).replace(/\n/g, '&lt;br&gt;');
}
function v(id:string,value:string,style:string,x:number,y:number,w:number,h:number):string {
  return `<mxCell id="${id}" value="${safe(value)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`;
}
function e(id:string,source:string,target:string,color='#175CD3',dashed=false,label=''):string {
  return `<mxCell id="${id}" value="${safe(label)}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${color};strokeWidth=2;${dashed?'dashed=1;dashPattern=6 4;':''}endArrow=block;endFill=1;fontSize=9.5;fontColor=#344054;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="${source}" target="${target}"><mxGeometry relative="1" as="geometry"/></mxCell>`;
}
function badge(id:string,value:string,x:number,y:number,w:number,fill:string,stroke:string,color:string):string {
  return v(id,value,`${BOX}fillColor=${fill};strokeColor=${stroke};strokeWidth=1.2;fontColor=${color};fontStyle=1;fontSize=11;align=center;spacing=4;`,x,y,w,28);
}
function section(id:string,n:number,title:string,subtitle:string,x:number,y:number,w:number):string[] {
  return [
    v(id,'',`${BOX}fillColor=#073B83;gradientColor=#0B2A60;gradientDirection=south;strokeColor=#073B83;`,x,y,w,46),
    v(`${id}_n`,String(n),'ellipse;html=1;fillColor=#FFFFFF;strokeColor=#FFFFFF;fontColor=#073B83;fontStyle=1;fontSize=12;align=center;',x+9,y+8,25,25),
    v(`${id}_title`,`&lt;b&gt;${esc(title)}&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:10px;font-weight:400&quot;&gt;${esc(subtitle)}&lt;/span&gt;`,`${TEXT}fontColor=#FFFFFF;fontSize=12.5;align=left;`,x+42,y+3,w-50,39)
  ];
}
function card(id:string,title:string,body:string,x:number,y:number,w:number,h:number,stroke='#B4C8EA',fill='#FFFFFF',titleColor='#101828'):string[] {
  return [
    v(id,'',`${BOX}fillColor=${fill};strokeColor=${stroke};strokeWidth=1.1;`,x,y,w,h),
    v(`${id}_txt`,`&lt;b&gt;${esc(title)}&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:9.4px;color:#475467;line-height:1.3&quot;&gt;${esc(body)}&lt;/span&gt;`,`${TEXT}fontColor=${titleColor};fontSize=10.4;align=left;spacing=6;whiteSpace=wrap;overflow=hidden;`,x+7,y+4,w-14,h-8)
  ];
}
function metric(id:string,label:string,value:string,x:number,y:number,w:number,color='#175CD3'):string[] {
  return [
    v(id,'',`${BOX}fillColor=#FFFFFF;strokeColor=#D0D5DD;strokeWidth=1;`,x,y,w,31),
    v(`${id}_l`,`&lt;b&gt;${esc(label)}&lt;/b&gt;`,`${TEXT}fontSize=9.2;fontColor=#475467;align=left;`,x+6,y+3,42,24),
    v(`${id}_v`,`&lt;b&gt;${esc(value)}&lt;/b&gt;`,`${TEXT}fontSize=9.2;fontColor=${color};align=right;`,x+48,y+3,w-54,24)
  ];
}

const ICONS: Record<string,string> = {
  db:'◉', mainframe:'▥', app:'▣', package:'⬡', folder:'■', api:'✣', analytics:'▥', infra:'⬢',
  business:'▰', technical:'&lt;/&gt;', cloud:'☁', decision:'⚙', rehost:'☁', replatform:'▤', refactor:'◇', retain:'▣', retire:'⌫', repurchase:'▱',
  value:'↗', risk:'◇', agility:'➤', ops:'⚙', strategy:'✣', shield:'◆'
};
function iconRow(id:string,icon:string,title:string,sub:string,x:number,y:number,w:number):string[] {
  return [
    v(`${id}_icon`,icon,'ellipse;html=1;fillColor=#EFF6FF;strokeColor=#B4C8EA;fontColor=#175CD3;fontStyle=1;fontSize=16;align=center;',x,y+8,32,32),
    v(`${id}_txt`,`&lt;b&gt;${esc(title)}&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:9px;color:#475467&quot;&gt;${esc(sub)}&lt;/span&gt;`,`${TEXT}fontSize=10.2;fontColor=#101828;align=left;`,x+42,y,w-42,48)
  ];
}

export function getApprovedSixRsMigrationMatrixXml(): string {
  const n:string[]=['<mxCell id="0"/>','<mxCell id="1" parent="0"/>'];
  const edges:string[]=[];
  const W=1760,H=1040;

  // Header
  n.push(v('count','&lt;b&gt;29 OF 50&lt;/b&gt;',`${BOX}fillColor=#175CD3;strokeColor=#175CD3;fontColor=#FFFFFF;fontStyle=1;fontSize=18;align=center;`,16,14,118,42));
  n.push(v('title','&lt;b&gt;6Rs Migration Disposition Matrix&lt;/b&gt;',`${TEXT}fontColor=#101828;fontSize=31;fontStyle=1;align=left;`,155,10,870,42));
  n.push(v('subtitle','6 cloud migration disposition matrix: Rehost, Replatform, Refactor, Retain, Retire, Repurchase — assessment-driven recommendations with target architecture, value, risk and timelines.',`${TEXT}fontColor=#475467;fontSize=12.5;align=left;`,155,50,1080,34));
  n.push(badge('master','MASTER BLUEPRINT',1565,14,175,'#FFFFFF','#175CD3','#175CD3'));
  n.push(badge('chip1','App & Integration',16,92,160,'#FFFFFF','#B4C8EA','#101828'));
  n.push(badge('chip2','Logical',186,92,105,'#FFFFFF','#B4C8EA','#101828'));
  n.push(badge('chip3','Layer 4 (Application)',301,92,190,'#FFFFFF','#B4C8EA','#101828'));
  n.push(badge('chip4','Phase 5: Transition Planning & Operational Readiness',501,92,360,'#FFFFFF','#B4C8EA','#101828'));
  n.push(badge('chip5','Blueprint P5-APP-L-01',871,92,190,'#FFFFFF','#B4C8EA','#175CD3'));

  // Macro sections
  n.push(...section('s1',1,'CURRENT ESTATE (INVENTORY)','Discover & classify workload estate',16,132,255));
  n.push(...section('s2',2,'ASSESSMENT ENGINE','Evaluate & score across key dimensions',281,132,440));
  n.push(...section('s3',3,'6R DISPOSITION RECOMMENDATION','Select the optimal path for each workload',731,132,770));
  n.push(...section('s4',4,'TARGET OUTCOME & VALUE','Business outcomes & benefits',1511,132,233));

  // Current estate
  n.push(v('estate_shell','',`${BOX}fillColor=#F8FAFF;strokeColor=#B4C8EA;strokeWidth=1;`,16,184,255,620));
  n.push(v('estate_h','&lt;b&gt;Source Systems & Assets&lt;/b&gt;',`${TEXT}fontSize=11.5;fontColor=#073B83;align=center;`,30,190,225,24));
  const estate=[
    ['legacy_db',ICONS.db,'Legacy Databases','Oracle, SQL Server, DB2, Sybase'],
    ['mainframe',ICONS.mainframe,'Mainframe Systems','CICS, IMS, VSAM'],
    ['custom_apps',ICONS.app,'Custom Applications','.NET, Java, PHP, COBOL'],
    ['packaged',ICONS.package,'Packaged Applications','SAP, PeopleSoft, JD Edwards'],
    ['files',ICONS.folder,'File Shares & Content','NAS, File Servers, SharePoint'],
    ['apis',ICONS.api,'APIs & Integrations','REST, SOAP, MQ, Kafka'],
    ['data',ICONS.analytics,'Data & Analytics','DW, ETL, Reports, ML'],
    ['infra',ICONS.infra,'Infrastructure','VMware, Physical, Network']
  ];
  estate.forEach((r,i)=>n.push(...iconRow(r[0],r[1],r[2],r[3],33,220+i*58,215)));
  n.push(v('snapshot','',`${BOX}fillColor=#FFFFFF;strokeColor=#7AA7E8;strokeWidth=1.1;`,29,691,229,94));
  n.push(v('snapshot_h','&lt;b&gt;Inventory Snapshot&lt;/b&gt;',`${TEXT}fontSize=10.5;fontColor=#073B83;align=center;`,38,696,210,20));
  [['Applications','318'],['Databases','842'],['Data','156 TB'],['Integrations','612']].forEach((r,i)=>{
    n.push(v(`snap_${i}`,`&lt;b&gt;${r[1]}&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px&quot;&gt;${r[0]}&lt;/span&gt;`,`${TEXT}fontSize=12;fontColor=#101828;align=center;`,38+i*52,722,50,50));
  });

  // Assessment engine
  n.push(v('assess_shell','',`${BOX}fillColor=#F8FAFF;strokeColor=#B4C8EA;strokeWidth=1;`,281,184,440,620));
  n.push(v('dims_h','&lt;b&gt;Assessment Dimensions (Weighted Scoring)&lt;/b&gt;',`${TEXT}fontSize=11.5;fontColor=#073B83;align=center;`,294,190,280,24));
  n.push(v('score_h','&lt;b&gt;Scoring Model (0–100)&lt;/b&gt;',`${TEXT}fontSize=11.5;fontColor=#073B83;align=center;`,585,190,125,24));

  const dims=[
    ['biz_dim',ICONS.business,'Business','Business Value\nStrategic Alignment\nCriticality\nStakeholder Impact','30%','#1F9D62','#F2FBF6'],
    ['tech_dim',ICONS.technical,'Technical','Technical Debt\nComplexity\nMaintainability\nPerformance\nDependency Count','40%','#175CD3','#F4F8FF'],
    ['cloud_dim',ICONS.cloud,'Cloud Readiness','Lift Capability\nPlatform Fit\nService Availability\nEffort & Risk\nOperational Maturity','30%','#7F56D9','#F8F5FF']
  ];
  dims.forEach((d,i)=>{
    const y=224+i*134;
    n.push(v(d[0],'',`${BOX}fillColor=${d[6]};strokeColor=${d[5]};strokeWidth=1.2;`,296,y,270,124));
    n.push(v(`${d[0]}_icon`,d[1],'ellipse;html=1;fillColor=#FFFFFF;strokeColor=#D0D5DD;fontColor='+d[5]+';fontSize=17;fontStyle=1;align=center;',309,y+12,34,34));
    n.push(v(`${d[0]}_txt`,`&lt;b&gt;${d[2]}&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:9.3px;color:#344054&quot;&gt;• ${esc(d[3]).replace(/\n/g,'&lt;br&gt;• ')}&lt;/span&gt;`,`${TEXT}fontSize=11;fontColor=${d[5]};align=left;`,352,y+8,155,104));
    n.push(v(`${d[0]}_weight`,`&lt;b&gt;Weight&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:17px&quot;&gt;${d[4]}&lt;/span&gt;`,`${BOX}fillColor=#FFFFFF;strokeColor=${d[5]};strokeWidth=1.2;fontColor=${d[5]};fontSize=8.5;align=center;`,508,y+28,48,58));
  });
  const scores=[['Business Value','briefcase'],['Technical Fit','code'],['Cloud Compatibility','cloud'],['Effort (Lower is Better)','effort'],['Risk (Lower is Better)','risk'],['Cost (TCO)','cost'],['Time to Value','time'],['Compliance & Data Sensitivity','compliance']];
  scores.forEach((s,i)=>n.push(...card(`score_${i}`,s[0],'',584,222+i*43,126,35,'#D0D5DD','#FFFFFF')));
  n.push(v('decision_engine','&lt;b&gt;Disposition Engine&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:9px;color:#475467&quot;&gt;Weighted score + rules + constraints + dependencies&lt;/span&gt;',`${BOX}fillColor=#F4F8FF;strokeColor=#7AA7E8;strokeWidth=1.2;fontColor=#175CD3;fontSize=11;align=center;`,584,580,126,70));
  edges.push(e('score_to_decision','score_7','decision_engine','#175CD3',false,''));
  n.push(v('process_h','&lt;b&gt;Assessment Process&lt;/b&gt;',`${TEXT}fontSize=10.5;fontColor=#073B83;align=center;`,300,636,265,22));
  const proc=[['Discover','Inventory & Classification'],['Analyze','Score & Evaluate'],['Decide','Apply Rules & Constraints'],['Recommend','6R Disposition & Target State']];
  proc.forEach((p,i)=>n.push(v(`proc_${i}`,`&lt;b&gt;${p[0]}&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px&quot;&gt;${p[1]}&lt;/span&gt;`,`${BOX}fillColor=#FFFFFF;strokeColor=#B4C8EA;strokeWidth=1;fontColor=#073B83;fontSize=9.5;align=center;`,296+i*101,666,92,76)));
  for(let i=0;i<3;i++) edges.push(e(`proc_e${i}`,`proc_${i}`,`proc_${i+1}`,'#175CD3',false,''));
  edges.push(e('estate_assess','estate_shell','assess_shell','#175CD3',false,''));
  edges.push(e('decision_reco','decision_engine','r_rehost','#175CD3',false,''));

  // 6R disposition columns — all six are mandatory.
  const rs=[
    {id:'rehost',name:'1 Rehost',sub:'(Lift & Shift)',color:'#175CD3',fill:'#F4F8FF',desc:'Move to cloud with minimal changes.',best:'Stable workloads\nLow technical debt\nShort-term cloud adoption',target:'Compute Engine / Migrate to Virtual Machines\nPersistent Disk',eff:'Low',risk:'Low',speed:'Fast',value:'Lower infra ops',timeline:'30–60 days'},
    {id:'replatform',name:'2 Replatform',sub:'(Lift & Reshape)',color:'#0E9384',fill:'#F2FBF9',desc:'Optimize with managed services without full rewrite.',best:'Moderate change tolerance\nImprove scalability\nReduce ops burden',target:'GKE / Cloud Run\nCloud SQL / AlloyDB\nMemorystore',eff:'Medium',risk:'Medium',speed:'Medium',value:'Managed-service savings',timeline:'60–120 days'},
    {id:'refactor',name:'3 Refactor',sub:'(Re-architect)',color:'#7F56D9',fill:'#F8F5FF',desc:'Redesign to cloud-native architecture.',best:'High technical debt\nNeed scalability\nImprove agility',target:'GKE / Cloud Run / GCF\nPub/Sub / Eventarc\nCloud SQL / Spanner',eff:'High',risk:'Med–High',speed:'Slow',value:'Strategic modernization',timeline:'120–360 days'},
    {id:'retain',name:'4 Retain',sub:'(Revisit / Hybrid)',color:'#667085',fill:'#F9FAFB',desc:'Keep on-prem or non-cloud for now.',best:'Regulatory constraints\nTechnical limitations\nCloud value not compelling',target:'Hybrid connectivity\nInterconnect / VPN\nRevisit trigger date',eff:'Low',risk:'Low–Med',speed:'Fast',value:'Avoid premature migration',timeline:'Ongoing review'},
    {id:'retire',name:'5 Retire',sub:'(Decommission)',color:'#D92D20',fill:'#FFF7F7',desc:'Decommission unused or obsolete workloads.',best:'Redundant systems\nLow business value\nHigh cost to run',target:'Archive / retain required data\nDecommission infra\nClose licenses & integrations',eff:'Low–Med',risk:'Low',speed:'Fast',value:'Direct cost elimination',timeline:'30–90 days'},
    {id:'repurchase',name:'6 Repurchase',sub:'(Replace with SaaS)',color:'#B54708',fill:'#FFF9ED',desc:'Replace custom/legacy capability with SaaS or managed solution.',best:'Commodity capability\nHigh maintenance burden\nStrong SaaS fit',target:'SaaS product\nIdentity + data migration\nIntegration replacement',eff:'Medium',risk:'Medium',speed:'Medium',value:'Faster feature velocity',timeline:'60–180 days'}
  ];
  const startX=736,colW=121,gap=6;
  rs.forEach((r,i)=>{
    const x=startX+i*(colW+gap);
    n.push(v(`r_${r.id}`,'',`${BOX}fillColor=${r.fill};strokeColor=${r.color};strokeWidth=1.25;`,x,184,colW,500));
    n.push(v(`r_${r.id}_h`,`&lt;b&gt;${esc(r.name)}&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:9px&quot;&gt;${esc(r.sub)}&lt;/span&gt;`,`${TEXT}fontColor=${r.color};fontSize=11.2;align=center;`,x+6,193,colW-12,38));
    n.push(v(`r_${r.id}_desc`,r.desc,`${TEXT}fontColor=#344054;fontSize=9.4;align=center;whiteSpace=wrap;`,x+8,237,colW-16,45));
    n.push(...card(`r_${r.id}_best`,'Best For',r.best,x+7,291,colW-14,105,r.color,'#FFFFFF',r.color));
    n.push(...card(`r_${r.id}_target`,'Target / Example',r.target,x+7,404,colW-14,115,r.color,'#FFFFFF','#101828'));
    n.push(...metric(`r_${r.id}_eff`,'Effort',r.eff,x+7,527,colW-14,r.color));
    n.push(...metric(`r_${r.id}_risk`,'Risk',r.risk,x+7,560,colW-14,r.color));
    n.push(...metric(`r_${r.id}_speed`,'Speed',r.speed,x+7,593,colW-14,r.color));
    n.push(v(`r_${r.id}_value`,`&lt;b&gt;Value&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.7px&quot;&gt;${esc(r.value)}&lt;/span&gt;`,`${BOX}fillColor=#FFFFFF;strokeColor=${r.color};strokeWidth=1;fontColor=${r.color};fontSize=9.2;align=center;`,x+7,627,colW-14,43));
    n.push(v(`r_${r.id}_timeline`,`&lt;b&gt;Timeline&lt;/b&gt;&lt;br&gt;${esc(r.timeline)}`,`${BOX}fillColor=${r.fill};strokeColor=${r.color};strokeWidth=1.1;fontColor=${r.color};fontSize=9.4;align=center;`,x+7,692,colW-14,52));
  });

  // Confidence / rationale layer
  n.push(v('confidence','',`${BOX}fillColor=#FFFFFF;strokeColor=#B4C8EA;strokeWidth=1.1;`,731,754,770,70));
  n.push(v('confidence_h','&lt;b&gt;Decision Confidence & Rationale&lt;/b&gt;',`${TEXT}fontSize=10.7;fontColor=#073B83;align=center;`,740,758,750,20));
  const conf=[['Confidence Score','High / Medium / Low'],['Primary Drivers','Top 3 factors'],['Constraints','Blocking factors'],['Dependencies','Upstream / Downstream'],['Assumptions','Key assumptions'],['Next Step','Action & Owner']];
  conf.forEach((c,i)=>n.push(v(`conf_${i}`,`&lt;b&gt;${c[0]}&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.4px&quot;&gt;${c[1]}&lt;/span&gt;`,`${TEXT}fontSize=9.3;fontColor=#344054;align=center;`,744+i*122,785,115,32)));

  // Target outcomes and reporting
  n.push(v('outcome_shell','',`${BOX}fillColor=#F8FAFF;strokeColor=#B4C8EA;strokeWidth=1;`,1511,184,233,620));
  const outcomes=[
    ['cost',ICONS.value,'Cost Optimization','Reduce OpEx & licensing\nIncrease efficiency','#039855','#F2FBF6'],
    ['riskv',ICONS.risk,'Risk Reduction','Lower security &\noperational risk','#D92D20','#FFF7F7'],
    ['agility',ICONS.agility,'Agility & Innovation','Faster delivery &\ntime to market','#175CD3','#F4F8FF'],
    ['opsex',ICONS.ops,'Operational Excellence','Automate, standardize\nimprove reliability','#7F56D9','#F8F5FF'],
    ['strategy',ICONS.strategy,'Strategic Alignment','Enable business goals\n& transformation','#B54708','#FFF9ED']
  ];
  outcomes.forEach((o,i)=>{
    const y=198+i*76;
    n.push(v(`out_${o[0]}`,'',`${BOX}fillColor=${o[5]};strokeColor=${o[4]};strokeWidth=1;`,1523,y,209,68));
    n.push(v(`out_${o[0]}_icon`,o[1],`ellipse;html=1;fillColor=#FFFFFF;strokeColor=${o[4]};fontColor=${o[4]};fontSize=16;fontStyle=1;align=center;`,1533,y+17,32,32));
    n.push(v(`out_${o[0]}_txt`,`&lt;b&gt;${esc(o[2])}&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:9px&quot;&gt;${esc(o[3])}&lt;/span&gt;`,`${TEXT}fontSize=10.4;fontColor=${o[4]};align=left;`,1574,y+7,148,54));
  });
  n.push(v('reports','',`${BOX}fillColor=#FFFFFF;strokeColor=#7AA7E8;strokeWidth=1.1;`,1523,590,209,197));
  n.push(v('reports_h','&lt;b&gt;Reporting & Artifacts&lt;/b&gt;',`${TEXT}fontSize=10.8;fontColor=#073B83;align=center;`,1532,596,190,23));
  const reports=['6R Disposition Report','Workload Heatmap','Dependency Map','Migration Roadmap','Business Case & ROI','Risk & Compliance Report'];
  reports.forEach((r,i)=>n.push(v(`rep_${i}`,'▣  '+r,`${TEXT}fontSize=9.3;fontColor=#344054;align=left;`,1542,625+i*25,178,22)));

  // Cross-cutting considerations
  n.push(v('cross','',`${BOX}fillColor=#F8FAFF;strokeColor=#B4C8EA;strokeWidth=1.1;`,16,835,1728,95));
  n.push(v('cross_h','&lt;b&gt;CROSS-CUTTING CONSIDERATIONS (Applied to all Dispositions)&lt;/b&gt;',`${TEXT}fontSize=10.7;fontColor=#073B83;align=center;`,30,839,1700,22));
  const cross=[
    ['Security & Compliance','IAM, least privilege, CMEK\nVPC-SC, data classification'],['Network & Connectivity','VPC, firewall, Private Google Access\nInterconnect, Cloud VPN, DNS'],['Data Management','Backup, DR, retention\nArchival, lifecycle policies'],['Observability','Cloud Monitoring, Logging\nAlerting, dashboards, SLOs'],['FinOps & Cost Governance','TCO, budgets, rightsizing\nCommitments, chargeback'],['Operational Readiness','Runbooks, automation\nSRE, capacity, support']
  ];
  cross.forEach((c,i)=>n.push(v(`cross_${i}`,`&lt;b&gt;${esc(c[0])}&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.8px&quot;&gt;${esc(c[1])}&lt;/span&gt;`,`${BOX}fillColor=#FFFFFF;strokeColor=#D0D5DD;strokeWidth=0.8;fontColor=#344054;fontSize=9.6;align=center;`,29+i*283,868,270,51)));

  // Legend / definitions / score bands
  n.push(v('footer_shell','',`${BOX}fillColor=#FFFFFF;strokeColor=#B4C8EA;strokeWidth=1;`,16,940,1728,82));
  n.push(v('legend','&lt;b&gt;LEGEND&lt;/b&gt;&lt;br&gt;━━ Data / Artifact Flow &nbsp;&nbsp; ┄┄ Decision Flow &nbsp;&nbsp; ··· Dependency / Reference Flow',`${TEXT}fontSize=9.2;fontColor=#344054;align=left;`,30,948,330,54));
  n.push(v('defs','&lt;b&gt;6R DEFINITIONS&lt;/b&gt;&lt;br&gt;1 Rehost — lift & shift &nbsp; | &nbsp; 2 Replatform — lift & optimize &nbsp; | &nbsp; 3 Refactor — re-architect &nbsp; | &nbsp; 4 Retain — revisit/hybrid &nbsp; | &nbsp; 5 Retire — decommission &nbsp; | &nbsp; 6 Repurchase — replace with SaaS',`${TEXT}fontSize=8.8;fontColor=#344054;align=left;`,375,948,800,54));
  n.push(v('scoreband','&lt;b&gt;SCORE RANGE (0–100)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;color:#039855&quot;&gt;80–100 Strong Fit / Low Risk&lt;/span&gt;&lt;br&gt;&lt;span style=&quot;color:#B54708&quot;&gt;50–79 Moderate Fit / Moderate Risk&lt;/span&gt;&lt;br&gt;&lt;span style=&quot;color:#D92D20&quot;&gt;0–49 Weak Fit / High Risk&lt;/span&gt;',`${TEXT}fontSize=8.8;fontColor=#344054;align=left;`,1190,948,260,62));
  n.push(v('confband','&lt;b&gt;CONFIDENCE&lt;/b&gt;&lt;br&gt;High &gt;75% &nbsp;&nbsp; Medium 40–75% &nbsp;&nbsp; Low &lt;40%',`${TEXT}fontSize=9;fontColor=#344054;align=left;`,1460,948,260,54));
  n.push(v('framework','Framework references: Google Cloud Well-Architected Framework | Cloud Adoption Framework | FinOps | NIST | CIS Controls | organizational policy & risk standards',`${TEXT}fontSize=8.6;fontColor=#667085;align=center;`,390,1018,980,18));

  // Decision/reference flows across the recommendation surface.
  for (let i=0;i<rs.length;i++) edges.push(e(`decision_to_${rs[i].id}`,'decision_engine',`r_${rs[i].id}`,'#175CD3',true,''));
  rs.forEach((r,i)=>edges.push(e(`outflow_${i}`,`r_${r.id}`,`out_${outcomes[Math.min(i,outcomes.length-1)][0]}`,'#0E9384',true,'')));

  return `<mxfile host="app.diagrams.net" modified="2026-08-20T15:55:00.000Z" agent="PromptCanvas" version="24.0.0" type="device"><diagram id="six_rs_migration_disposition_matrix" name="6Rs Migration Disposition Matrix"><mxGraphModel dx="${W}" dy="${H}" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="${W}" pageHeight="${H}" background="#FFFFFF"><root>${n.join('\n')}${edges.join('\n')}</root></mxGraphModel></diagram></mxfile>`;
}
