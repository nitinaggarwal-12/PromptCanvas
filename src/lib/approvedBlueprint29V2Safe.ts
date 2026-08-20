// Blueprint 29 v2 — readability + decision-rule refinement.
// Native editable mxGraph; self-contained; no external icon dependencies.

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
const section=(id:string,n:number,title:string,sub:string,x:number,y:number,w:number)=>[
  cell(id,'',`${BOX}fillColor=#073B83;gradientColor=#0B2A60;gradientDirection=south;strokeColor=#073B83;`,x,y,w,46),
  cell(`${id}_n`,String(n),'ellipse;html=1;fillColor=#FFFFFF;strokeColor=#FFFFFF;fontColor=#073B83;fontStyle=1;fontSize=13;align=center;',x+10,y+8,26,26),
  cell(`${id}_t`,`&lt;b&gt;${esc(title)}&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:10px&quot;&gt;${esc(sub)}&lt;/span&gt;`,`${TEXT}fontColor=#FFFFFF;fontSize=12;align=left;`,x+45,y+4,w-52,38)
];

export function getApprovedSixRsMigrationMatrixV2Xml():string{
 const n:string[]=['<mxCell id="0"/>','<mxCell id="1" parent="0"/>']; const e:string[]=[]; const W=1760,H=1040;
 n.push(cell('count','&lt;b&gt;29 OF 50&lt;/b&gt;',`${BOX}fillColor=#175CD3;strokeColor=#175CD3;fontColor=#FFFFFF;fontStyle=1;fontSize=17;align=center;`,16,14,118,42));
 n.push(text('title','6Rs Migration Disposition Matrix',155,10,900,42,30,'#101828','left',true));
 n.push(text('sub','Assessment-driven 6R recommendation with explicit decision rules, constraints, dependencies, target architecture, value, risk and sequencing.',155,49,1130,34,12.5,'#475467'));
 n.push(cell('master','MASTER BLUEPRINT',`${BOX}fillColor=#FFFFFF;strokeColor=#175CD3;fontColor=#175CD3;fontStyle=1;fontSize=11;align=center;`,1560,14,180,30));
 ['App & Integration','Logical','Layer 4 (Application)','Phase 5: Transition Planning & Operational Readiness','Blueprint P5-APP-L-01'].forEach((v,i)=>n.push(cell(`chip${i}`,v,`${BOX}fillColor=#FFFFFF;strokeColor=#B4C8EA;fontColor=${i===4?'#175CD3':'#101828'};fontStyle=1;fontSize=10.5;align=center;`,16+[0,170,290,500,875][i],91,[160,110,200,365,190][i],28)));
 n.push(...section('s1',1,'CURRENT STATE / INVENTORY','Discover, classify and map dependencies',16,132,245));
 n.push(...section('s2',2,'ASSESSMENT & DECISION ENGINE','Score, constrain, explain and sequence',271,132,420));
 n.push(...section('s3',3,'6R DISPOSITION RECOMMENDATION','Compare all six options on one consistent scale',701,132,790));
 n.push(...section('s4',4,'TARGET OUTCOME & VALUE','Business outcome, roadmap and evidence',1501,132,243));

 n.push(cell('estate','',`${BOX}fillColor=#F8FAFF;strokeColor=#B4C8EA;`,16,184,245,600));
 const estate=[['Legacy databases','Oracle • SQL Server • DB2 • Sybase'],['Mainframe systems','CICS • IMS • VSAM'],['Custom applications','.NET • Java • PHP • COBOL'],['Packaged applications','SAP • PeopleSoft • JD Edwards'],['File/content','NAS • File servers • SharePoint'],['APIs & integrations','REST • SOAP • MQ • Kafka'],['Data & analytics','DW • ETL • Reporting • ML'],['Infrastructure','VMware • Physical • Network']];
 estate.forEach((r,i)=>n.push(...box(`est${i}`,r[0],r[1],30,204+i*58,217,50,'#D0D5DD','#FFFFFF','#073B83')));
 n.push(...box('snapshot','Inventory snapshot','318 applications • 842 databases • 156 TB data • 612 integrations',30,684,217,78,'#7AA7E8','#F4F8FF','#073B83'));

 n.push(cell('assess','',`${BOX}fillColor=#F8FAFF;strokeColor=#B4C8EA;`,271,184,420,600));
 const dims=[['Business 30%','Business value • strategic alignment • criticality • stakeholder impact','#1F9D62','#F2FBF6'],['Technical 40%','Technical debt • complexity • maintainability • performance • dependency count','#175CD3','#F4F8FF'],['Cloud readiness 30%','Platform fit • service availability • migration skill • effort/risk • operational maturity','#7F56D9','#F8F5FF']];
 dims.forEach((r,i)=>n.push(...box(`dim${i}`,r[0],r[1],288,205+i*93,220,82,r[2],r[3],r[2])));
 n.push(...box('score','Scoring model (0–100)','Business value • technical fit • cloud compatibility • effort ↓ • risk ↓ • TCO • time-to-value • compliance/data sensitivity',520,205,154,268,'#D0D5DD','#FFFFFF','#073B83'));
 n.push(...box('rules','Disposition rules','Scores do not choose alone. Apply hard constraints first, then modernization fit, then value/effort/risk trade-off.',288,500,386,82,'#175CD3','#EFF6FF','#073B83'));
 n.push(...box('constraints','Hard constraints','Regulatory/residency • unsupported platform • shared DB coupling • vendor lifecycle • licensing • latency • business blackout windows',288,594,386,76,'#D92D20','#FFF5F5','#B42318'));
 n.push(...box('dependencies','Dependency & wave logic','Upstream/downstream integrations • shared data • identity • network • cutover order • rollback • migration wave prerequisites',288,682,386,76,'#7F56D9','#F8F5FF','#6941C6'));
 e.push(edge('a1','estate','assess'));
 e.push(edge('a2','score','rules'));
 e.push(edge('a3','constraints','rules','#D92D20','gates',true));
 e.push(edge('a4','dependencies','rules','#7F56D9','sequence',true));

 const rs=[
  ['rehost','1 Rehost','Lift & Shift','Move with minimal change','Stable workloads; low debt; fast exit','Compute Engine / Migrate to VMs','Low','Low','Fast','Lower infra ops','30–60 d','#175CD3','#F4F8FF'],
  ['replatform','2 Replatform','Lift & Reshape','Optimize with managed services','Moderate change; reduce ops burden','Cloud Run/GKE; Cloud SQL/AlloyDB','Medium','Medium','Medium','Operational efficiency','60–120 d','#1F9D62','#F2FBF6'],
  ['refactor','3 Refactor','Re-architect','Redesign cloud-native','High debt; scale/agility strategic','Microservices; serverless; event-driven','High','High','Slow','Strategic modernization','120–360 d','#7F56D9','#F8F5FF'],
  ['retain','4 Retain','Revisit / Hybrid','Keep temporarily or strategically hybrid','Regulatory/latency/technical blockers','On-prem/private cloud + governed hybrid','Low','Low–Med','Fast','Avoid premature change','Review date','#0F8B82','#EFFCF9'],
  ['retire','5 Retire','Decommission','Remove unused/redundant workload','Low business value; duplicate capability','Archive • license closure • dependency cleanup','Low–Med','Low','Fast','Direct cost reduction','30–90 d','#D92D20','#FFF5F5'],
  ['repurchase','6 Repurchase','Replace with SaaS','Replace commodity capability with SaaS','Weak differentiation; strong SaaS fit','SaaS + data migration + identity/integration re-pointing','Medium','Medium','Medium','Lower maintenance burden','60–180 d','#E87900','#FFF7ED']
 ];
 const x0=711,cw=124,gap=5;
 rs.forEach((r,i)=>{const x=x0+i*(cw+gap); n.push(cell(`r_${r[0]}`,'',`${BOX}fillColor=${r[12]};strokeColor=${r[11]};strokeWidth=1.4;`,x,194,cw,526));
   n.push(cell(`r_${r[0]}_h`,`&lt;b&gt;${r[1]}&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:9.5px&quot;&gt;${r[2]}&lt;/span&gt;`,`${TEXT}fontSize=11.5;fontColor=${r[11]};align=center;`,x+4,204,cw-8,44));
   const rows=[['Definition',r[3]],['Best for',r[4]],['Target / example',r[5]],['Effort',r[6]],['Risk',r[7]],['Speed',r[8]],['Value',r[9]],['Timeline',r[10]]]; let yy=254;
   rows.forEach((rr,j)=>{const hh=j<3?73:45; n.push(cell(`r_${r[0]}_${j}`,`&lt;b&gt;${rr[0]}&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:9.4px;color:#475467&quot;&gt;${esc(rr[1])}&lt;/span&gt;`,`${TEXT}fontSize=10.2;fontColor=#101828;align=center;spacing=3;whiteSpace=wrap;overflow=hidden;`,x+4,yy,cw-8,hh)); yy+=hh;});
 });
 e.push(edge('a5','rules','r_rehost','#175CD3','recommend'));
 n.push(...box('rationale','Decision confidence & rationale','Confidence: High / Medium / Low • primary drivers • blocking constraints • dependencies • assumptions • recommended next action + owner',711,734,775,66,'#7AA7E8','#F8FBFF','#073B83'));
 n.push(...box('illustrative','Evidence note','Timelines and value statements are illustrative planning ranges, not guarantees. Replace with workload-specific estimates and validated business case.',711,808,775,52,'#E87900','#FFF7ED','#9A3412'));

 n.push(cell('outcomes','',`${BOX}fillColor=#F8FAFF;strokeColor=#B4C8EA;`,1501,184,243,676));
 const outs=[['Cost optimization','Reduce OpEx/licensing; improve efficiency'],['Risk reduction','Lower security and operational risk'],['Agility & innovation','Faster delivery and time-to-market'],['Operational excellence','Automate, standardize, improve reliability'],['Strategic alignment','Enable business goals and transformation']];
 outs.forEach((r,i)=>n.push(...box(`out${i}`,r[0],r[1],1515,202+i*86,215,74,['#1F9D62','#D92D20','#175CD3','#7F56D9','#E87900'][i],'#FFFFFF')));
 n.push(...box('artifacts','Reporting & execution artifacts','6R report • workload heatmap • dependency map • migration roadmap • business case/ROI • risk & compliance report • wave plan',1515,640,215,194,'#175CD3','#F8FBFF','#073B83'));
 e.push(edge('a6','r_repurchase','outcomes','#175CD3'));

 n.push(cell('cross','',`${BOX}fillColor=#F8FAFF;strokeColor=#B4C8EA;`,16,880,1728,112));
 n.push(text('crossh','CROSS-CUTTING CONTROLS — applied to every disposition',34,887,1690,24,11.5,'#073B83','center',true));
 const cc=[['Security & compliance','IAM • least privilege • encryption • data classification'],['Network & connectivity','VPC • firewall • private access • Interconnect/VPN/DNS'],['Data management','Backup • DR • retention • archival • lifecycle'],['Observability','Monitoring • logging • alerting • dashboards • SLOs'],['FinOps','TCO • budgets • rightsizing • commitments • chargeback'],['Operational readiness','Runbooks • automation • SRE • capacity • support']];
 cc.forEach((r,i)=>n.push(...box(`cc${i}`,r[0],r[1],28+i*281,919,268,60,'#D0D5DD','#FFFFFF','#073B83')));
 n.push(text('legend','Effort / Risk: Low → Medium → High    •    Speed: Fast → Medium → Slow    •    Decision order: constraints → fit → value/effort/risk → dependencies/wave',24,1000,1712,24,10.2,'#475467','center'));
 return `<mxfile host="app.diagrams.net" modified="2026-08-20T00:00:00.000Z" agent="PromptCanvas" version="24.7.17"><diagram id="approved_blueprint_29_v2" name="6Rs Migration Disposition Matrix — P5-APP-L-01"><mxGraphModel dx="${W}" dy="${H}" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageEnabled="0" pageScale="1" pageWidth="${W}" pageHeight="${H}" math="0" shadow="0"><root>${n.join('')}${e.join('')}</root></mxGraphModel></diagram></mxfile>`;
}
