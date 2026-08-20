// Blueprint 16 — approved Secure Deployment Topology Map
// Native editable mxGraph XML reconstructed from the user-approved reference image.
// Self-contained icons, 12-step request flow, trust boundaries, security/compliance and cross-cutting controls.

type Parts = { nodes: string[]; edges: string[] };

function esc(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function safe(value: string): string {
  return value.includes('&lt;') || value.includes('&#') ? value : esc(value).replace(/\n/g, '&lt;br&gt;');
}
function svgData(svg: string): string { return `data:image/svg+xml,${encodeURIComponent(svg)}`; }

const I = {
  cloud: svgData('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path fill="#4285F4" d="M25 50H16C7 50 2 44 2 36c0-7 5-13 12-14 2-10 10-17 20-17 11 0 20 8 21 19 5 2 7 6 7 11 0 8-6 15-15 15z"/><path fill="#34A853" d="M22 20h18v9H22z"/><path fill="#FBBC05" d="M31 12h9v17h-9z"/><path fill="#EA4335" d="M22 20h9v9h-9z"/></svg>'),
  user: svgData('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><g fill="none" stroke="#175CD3" stroke-width="4" stroke-linecap="round"><circle cx="32" cy="18" r="9"/><path d="M13 53c2-13 8-19 19-19s17 6 19 19"/></g></svg>'),
  api: svgData('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M12 31h40M20 20l-8 11 8 11M44 20l8 11-8 11" fill="none" stroke="#175CD3" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>'),
  dns: svgData('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="24" fill="#175CD3"/><text x="32" y="37" font-size="16" font-family="Arial" font-weight="700" text-anchor="middle" fill="white">DNS</text></svg>'),
  lb: svgData('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><g fill="#7F56D9"><rect x="7" y="11" width="14" height="14" rx="2"/><rect x="43" y="11" width="14" height="14" rx="2"/><rect x="25" y="40" width="14" height="14" rx="2"/></g><path d="M14 25v7h36v-7M32 32v8" fill="none" stroke="#7F56D9" stroke-width="4"/></svg>'),
  shield: svgData('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M32 5 53 14v15c0 14-8 24-21 30C19 53 11 43 11 29V14z" fill="#EAF2FF" stroke="#175CD3" stroke-width="4"/><path d="M23 31l6 6 12-14" fill="none" stroke="#175CD3" stroke-width="4" stroke-linecap="round"/></svg>'),
  kube: svgData('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M32 4 56 18v28L32 60 8 46V18z" fill="#326CE5"/><g stroke="white" stroke-width="3" fill="none"><circle cx="32" cy="32" r="11"/><path d="M32 13v8M32 43v8M13 32h8M43 32h8M19 19l6 6M39 39l6 6M45 19l-6 6M25 39l-6 6"/></g></svg>'),
  db: svgData('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><g fill="#EAF2FF" stroke="#175CD3" stroke-width="3"><ellipse cx="32" cy="13" rx="21" ry="8"/><path d="M11 13v35c0 5 10 8 21 8s21-3 21-8V13"/><path d="M11 27c0 5 10 8 21 8s21-3 21-8M11 41c0 5 10 8 21 8s21-3 21-8"/></g></svg>'),
  storage: svgData('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><g fill="#175CD3"><rect x="10" y="10" width="44" height="13" rx="2"/><rect x="10" y="27" width="44" height="13" rx="2"/><rect x="10" y="44" width="44" height="10" rx="2"/></g><g fill="white"><circle cx="47" cy="16.5" r="2"/><circle cx="47" cy="33.5" r="2"/><circle cx="47" cy="49" r="2"/></g></svg>'),
  cache: svgData('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect x="13" y="13" width="38" height="38" rx="5" fill="#175CD3"/><path d="M22 22h20v20H22zM8 24h5M8 32h5M8 40h5M51 24h5M51 32h5M51 40h5M24 8v5M32 8v5M40 8v5M24 51v5M32 51v5M40 51v5" fill="none" stroke="white" stroke-width="3"/></svg>'),
  repo: svgData('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M14 13h36v38H14z" fill="#EEF4FF" stroke="#175CD3" stroke-width="3"/><path d="M21 22h22M21 31h22M21 40h14" stroke="#175CD3" stroke-width="3"/></svg>'),
  key: svgData('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="23" cy="24" r="10" fill="none" stroke="#175CD3" stroke-width="5"/><path d="m30 31 23 23M42 43l6-6M48 49l6-6" fill="none" stroke="#175CD3" stroke-width="5" stroke-linecap="round"/></svg>'),
  chart: svgData('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect x="8" y="36" width="9" height="20" fill="#175CD3"/><rect x="25" y="24" width="9" height="32" fill="#175CD3"/><rect x="42" y="10" width="9" height="46" fill="#175CD3"/></svg>'),
  log: svgData('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M14 8h36v48H14z" fill="#EEF4FF" stroke="#175CD3" stroke-width="3"/><path d="M22 19h20M22 29h20M22 39h20M22 49h13" stroke="#175CD3" stroke-width="3"/></svg>'),
  check: svgData('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="24" fill="#12B76A"/><path d="m20 33 8 8 17-20" fill="none" stroke="white" stroke-width="5" stroke-linecap="round"/></svg>'),
  lock: svgData('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect x="13" y="28" width="38" height="28" rx="4" fill="#175CD3"/><path d="M22 28V18c0-7 4-11 10-11s10 4 10 11v10" fill="none" stroke="#175CD3" stroke-width="4"/><circle cx="32" cy="41" r="4" fill="white"/></svg>'),
};

const BOX='rounded=1;arcSize=9;whiteSpace=wrap;html=1;fontFamily=Inter;verticalAlign=middle;';
const TXT='text;html=1;strokeColor=none;fillColor=none;fontFamily=Inter;verticalAlign=middle;';
function cell(id:string,value:string,style:string,x:number,y:number,w:number,h:number):string{return `<mxCell id="${id}" value="${safe(value)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`;}
function img(id:string,url:string,x:number,y:number,w:number,h:number):string{return cell(id,'',`shape=image;imageAspect=0;aspect=fixed;image=${url};strokeColor=none;fillColor=none;`,x,y,w,h);}
function label(title:string,body:string):string{return `&lt;div style=&quot;font-family:Inter,Arial,sans-serif;&quot;&gt;&lt;div style=&quot;font-weight:800;font-size:11.5px;color:#102A56;line-height:1.15;&quot;&gt;${esc(title)}&lt;/div&gt;&lt;div style=&quot;margin-top:4px;font-size:9.8px;color:#526079;line-height:1.25;&quot;&gt;${esc(body)}&lt;/div&gt;&lt;/div&gt;`;}
function card(p:Parts,id:string,title:string,body:string,x:number,y:number,w:number,h:number,stroke='#AFC7F8',fill='#FFFFFF',icon?:string):void{p.nodes.push(cell(id,'',`${BOX}fillColor=${fill};strokeColor=${stroke};strokeWidth=1.2;`,x,y,w,h));if(icon)p.nodes.push(img(`${id}_icon`,icon,x+12,y+Math.max(11,(h-34)/2),34,34));p.nodes.push(cell(`${id}_txt`,label(title,body),`${TXT}align=left;whiteSpace=wrap;overflow=hidden;`,x+(icon?56:14),y+7,w-(icon?68:28),h-14));}
function section(p:Parts,id:string,title:string,x:number,y:number,w:number,h:number,stroke:string,fill:string):void{p.nodes.push(cell(id,'',`${BOX}fillColor=${fill};strokeColor=${stroke};strokeWidth=1.35;`,x,y,w,h));p.nodes.push(cell(`${id}_title`,`&lt;b&gt;${esc(title)}&lt;/b&gt;`,`${TXT}align=left;fontSize=13;fontColor=#102A56;fontStyle=1;`,x+14,y+7,w-28,24));}
function edge(p:Parts,id:string,x1:number,y1:number,x2:number,y2:number,color:string,dashed=false,labelText=''):void{p.edges.push(`<mxCell id="${id}" value="${esc(labelText)}" style="edgeStyle=none;html=1;strokeColor=${color};strokeWidth=2;${dashed?'dashed=1;dashPattern=6 4;':''}endArrow=block;endFill=1;fontSize=9.5;fontColor=#344054;labelBackgroundColor=#FFFFFF;" edge="1" parent="1"><mxGeometry relative="1" as="geometry"><mxPoint x="${x1}" y="${y1}" as="sourcePoint"/><mxPoint x="${x2}" y="${y2}" as="targetPoint"/></mxGeometry></mxCell>`);}
function step(p:Parts,n:number,x:number,y:number):void{p.nodes.push(cell(`step_${n}`,String(n),'ellipse;whiteSpace=wrap;html=1;fillColor=#175CD3;strokeColor=#175CD3;fontColor=#FFFFFF;fontStyle=1;fontSize=10;align=center;verticalAlign=middle;',x-11,y-11,22,22));}
function chip(p:Parts,id:string,text:string,x:number,w:number,stroke:string,fill:string):void{p.nodes.push(cell(id,text,`${BOX}fillColor=${fill};strokeColor=${stroke};strokeWidth=1.2;fontColor=#102A56;fontStyle=1;fontSize=10.5;align=center;`,x,72,w,34));}

export function getApprovedSecureDeploymentTopologyXml():string{
  const p:Parts={nodes:['<mxCell id="0"/>','<mxCell id="1" parent="0"/>'],edges:[]};
  // Header
  p.nodes.push(cell('count','&lt;b&gt;16 OF 50&lt;/b&gt;',`${BOX}fillColor=#175CD3;strokeColor=#175CD3;fontColor=#FFFFFF;fontSize=16;align=center;`,15,14,112,36));
  p.nodes.push(cell('title','&lt;b&gt;Secure Deployment Topology Map&lt;/b&gt;',`${TXT}fontSize=28;fontColor=#0B1830;fontStyle=1;align=left;`,146,10,790,42));
  p.nodes.push(cell('subtitle','Zero-Trust GCP Network Topology with Cloud Armor WAF, GKE Autopilot, Cloud SQL PSA, Binary Authorization, and CMEK KMS.',`${TXT}fontSize=12.5;fontColor=#526079;align=left;`,146,47,900,24));
  p.nodes.push(cell('master','&lt;b&gt;MASTER BLUEPRINT&lt;/b&gt;',`${BOX}fillColor=#FFFFFF;strokeColor=#175CD3;strokeWidth=1.4;fontColor=#175CD3;fontSize=11.5;align=center;`,1342,12,176,38));
  chip(p,'chip1','◉  Cloud Infra Security',15,175,'#84ADFF','#F8FAFF');chip(p,'chip2','⚙  Layer 5 (Operations)',197,180,'#FEC84B','#FFFAEB');chip(p,'chip3','★  Production-Grade',390,170,'#86D29A','#F4FBF6');chip(p,'chip4','▥  Highly Available',575,160,'#84ADFF','#F8FAFF');chip(p,'chip5','♜  Scalable & Compliant',748,184,'#86D29A','#F4FBF6');

  // Left users + developer columns
  section(p,'users','Users & Clients',16,122,166,314,'#84ADFF','#F7FAFF');
  card(p,'web','Web / Mobile','Users',30,174,138,72,'#AFC7F8','#FFFFFF',I.user);card(p,'workforce','Workforce /','Partners',30,257,138,72,'#AFC7F8','#FFFFFF',I.user);card(p,'apis','APIs / Services','',30,340,138,72,'#AFC7F8','#FFFFFF',I.api);
  section(p,'devops','Developer & Ops',16,480,166,286,'#84ADFF','#F7FAFF');
  card(p,'dev','Developers','',30,532,138,64,'#AFC7F8','#FFFFFF',I.user);card(p,'git','GitHub /','Artifact Registry',30,605,138,72,'#AFC7F8','#FFFFFF',I.repo);card(p,'sre','Security / SRE','',30,686,138,64,'#AFC7F8','#FFFFFF',I.shield);

  section(p,'edgezone','Edge & Network Security',203,122,204,644,'#84ADFF','#F8FAFF');
  card(p,'dns','Cloud DNS','Global DNS',220,174,170,80,'#AFC7F8','#FFFFFF',I.dns);card(p,'lb','Cloud Load Balancing','Global HTTPS LB\nSSL termination • L7 routing',220,290,170,90,'#AFC7F8','#FFFFFF',I.lb);card(p,'armor','Cloud Armor','WAF / DDoS Protection\nOWASP, bot mgmt, rate limiting',220,400,170,94,'#AFC7F8','#FFFFFF',I.shield);card(p,'iap','Identity Aware Proxy','(IAP) / Cloud VPN\nSecure admin access\n(no public IPs)',220,572,170,102,'#AFC7F8','#FFFFFF',I.shield);
  edge(p,'dns_lb',305,254,305,290,'#175CD3');edge(p,'lb_armor',305,380,305,400,'#175CD3');

  // VPC body
  section(p,'vpc','',427,122,642,644,'#84ADFF','#FFFFFF');
  p.nodes.push(img('gcp_logo',I.cloud,444,138,38,38));p.nodes.push(cell('vpc_title','&lt;b&gt;Google Cloud - VPC (Custom Mode)&lt;/b&gt;',`${TXT}fontSize=18;fontColor=#0B1830;fontStyle=1;align=left;`,488,135,420,35));p.nodes.push(cell('region','us-central1 (Primary Region)',`${TXT}fontSize=10.5;fontColor=#175CD3;fontStyle=1;align=right;`,865,140,180,28));
  p.nodes.push(cell('trust','',`${BOX}fillColor=#FFFFFF;opacity=8;strokeColor=#175CD3;strokeWidth=1.5;dashed=1;dashPattern=6 4;`,444,177,607,568));

  section(p,'appTier','GKE Autopilot (Private) - Application Tier',464,196,566,214,'#7BC995','#F5FCF7');
  p.nodes.push(img('kube_logo',I.kube,480,214,42,42));p.nodes.push(cell('app_sub','Zero-trust management • Auto-scale • Built-in security',`${TXT}fontSize=10.2;fontColor=#475467;align=left;`,532,230,330,24));
  card(p,'webpods','Web Pods','(frontend)',487,265,112,90,'#AFC7F8','#FFFFFF',I.kube);card(p,'apipods','API Pods','(backend)',610,265,112,90,'#AFC7F8','#FFFFFF',I.kube);card(p,'workerpods','Worker Pods','(async jobs)',733,265,112,90,'#AFC7F8','#FFFFFF',I.kube);
  card(p,'policies','NetworkPolicies','Pod Security Standards\nWorkload Identity\nGKE Sandbox',860,246,150,128,'#7BC995','#FBFFFC',I.check);

  section(p,'dataTier','Data & Integration Tier (Private Services Access)',464,428,566,194,'#AFC7F8','#F8FAFF');
  card(p,'sql','Cloud SQL','(PostgreSQL)\n• Private IP (PSA)\n• HA / Automated backups\n• CMEK encryption\n• Point-in-time recovery',481,471,170,130,'#AFC7F8','#FFFFFF',I.db);card(p,'storage','Cloud Storage','• Private access\n• CMEK encryption\n• Versioning\n• Lifecycle mgmt',663,471,170,130,'#AFC7F8','#FFFFFF',I.storage);card(p,'redis','Memorystore','(Redis)\n• Private IP\n• In-memory cache\n• HA / Failover',845,471,170,130,'#AFC7F8','#FFFFFF',I.cache);

  section(p,'supply','Control & Supply Chain Security',464,640,566,88,'#AFC7F8','#F8FAFF');
  card(p,'registry','Artifact Registry','(immutable images)',481,674,155,45,'#AFC7F8','#FFFFFF',I.repo);card(p,'binauth','Binary Authorization','(policy enforcement)',674,674,164,45,'#AFC7F8','#FFFFFF',I.shield);card(p,'kms','Cloud KMS','(CMEK keys)',877,674,138,45,'#AFC7F8','#FFFFFF',I.key);
  edge(p,'reg_ba',636,696,674,696,'#175CD3',false,'verify');edge(p,'ba_kms',838,696,877,696,'#175CD3',false,'sign');

  // Main request/control routes and steps
  step(p,1,192,317);edge(p,'f1',168,317,220,317,'#175CD3');
  step(p,2,416,317);edge(p,'f2',390,317,464,317,'#175CD3');
  step(p,3,416,446);edge(p,'f3',390,446,464,446,'#175CD3');
  step(p,4,1066,316);edge(p,'f4',1030,316,1079,316,'#175CD3');
  step(p,5,746,430);edge(p,'f5',746,410,746,471,'#0E9384');
  step(p,6,1066,316);edge(p,'f6',1079,316,1030,316,'#175CD3');
  step(p,10,746,640);edge(p,'f10',746,640,746,622,'#175CD3');
  step(p,11,438,696);edge(p,'f11',407,696,481,696,'#175CD3');
  step(p,12,192,623);edge(p,'f12',168,623,220,623,'#175CD3');

  // Observability + compliance
  section(p,'obs','Observability & Operations',1080,122,214,350,'#84ADFF','#F8FAFF');
  card(p,'monitor','Cloud Monitoring','Metrics • SLOs • Alerts',1096,174,182,68,'#AFC7F8','#FFFFFF',I.chart);card(p,'logging','Cloud Logging','Centralized logs',1096,254,182,68,'#AFC7F8','#FFFFFF',I.log);card(p,'scc','Security Command Center','Threat detection • Posture',1096,334,182,68,'#AFC7F8','#FFFFFF',I.shield);card(p,'chronicle','Chronicle / SIEM','Security analytics',1096,414,182,44,'#AFC7F8','#FFFFFF',I.chart);
  step(p,7,1303,317);edge(p,'f7',1278,317,1316,317,'#175CD3');

  section(p,'comp','Security & Compliance',1313,122,207,350,'#F6C764','#FFFBF0');
  const checks=[['Zero Public IPs','(Private Google Access)'],['Least Privilege IAM','(Security groups)'],['CMEK everywhere','(Cloud SQL, GCS, ART)'],['Policy as Code','(Org Policies, Validator)'],['Vulnerability Mgmt','(Container / OS scanning)'],['Audit & Forensics','(Immutable logs)'],['Multi-region DR','(Backups & tested)']];
  checks.forEach((c,i)=>card(p,`c${i}`,c[0],c[1],1327,165+i*42,178,35,'#F6C764','#FFFFFF',I.check));

  // Legend + request flow
  section(p,'legend','Legend',1080,492,142,158,'#AFC7F8','#FFFFFF');
  edge(p,'leg1',1093,530,1127,530,'#175CD3');p.nodes.push(cell('leg1t','Data / Request Flow',`${TXT}fontSize=8.8;fontColor=#344054;align=left;`,1135,518,76,22));edge(p,'leg2',1093,555,1127,555,'#175CD3',true);p.nodes.push(cell('leg2t','Control / Policy Flow',`${TXT}fontSize=8.8;fontColor=#344054;align=left;`,1135,543,76,22));edge(p,'leg3',1093,580,1127,580,'#12B76A');p.nodes.push(cell('leg3t','Private Google Access',`${TXT}fontSize=8.8;fontColor=#344054;align=left;`,1135,568,76,22));p.nodes.push(cell('leg4','',`${BOX}fillColor=#FFFFFF;opacity=8;strokeColor=#175CD3;strokeWidth=1.2;dashed=1;dashPattern=6 4;`,1093,606,35,20));p.nodes.push(cell('leg4t','Trust Boundary',`${TXT}fontSize=8.8;fontColor=#344054;align=left;`,1135,600,76,22));

  section(p,'request','End-to-End Request Flow',1234,492,286,274,'#AFC7F8','#FFFFFF');
  const flow=['User sends HTTPS request','Global Load Balancer routes traffic','Cloud Armor WAF inspects & filters','Request goes to GKE Autopilot (private)','Application accesses data tier via private IP','Metrics & logs sent to Cloud Monitoring/Logging','Findings to SCC / Chronicle for threat detection','Data encrypted with CMEK (at rest)','Outbound access via Private Google Access','Binary Authorization enforces trusted images','Images stored & versioned in Artifact Registry','Secure admin access via IAP / VPN (no public IPs)'];
  flow.forEach((t,i)=>{p.nodes.push(cell(`rf_n${i+1}`,String(i+1),'ellipse;whiteSpace=wrap;html=1;fillColor=#175CD3;strokeColor=#175CD3;fontColor=#FFFFFF;fontStyle=1;fontSize=8.5;align=center;verticalAlign=middle;',1249,530+i*18,18,18));p.nodes.push(cell(`rf_t${i+1}`,t,`${TXT}fontSize=9.1;fontColor=#344054;align=left;`,1274,526+i*18,232,24));});

  // Cross-cutting controls strip
  section(p,'cross','Cross-Cutting Controls',16,788,1504,182,'#AFC7F8','#FFFFFF');
  const controls=[
    ['Identity & Access','Workload Identity\nBeyondCorp / IAP',I.user],
    ['Network Security','VPC, Firewall, Private Google Access\nNo direct public IPs',I.api],
    ['Data Protection','CMEK, DLP, Encryption\nin transit & at rest',I.lock],
    ['Supply Chain Security','Artifact Registry, Binary Auth\nPolicy-based deployment',I.shield],
    ['Compliance','HIPAA / SOC 2 / ISO 27001\nAudit trails & retention',I.shield],
    ['Resilience','Multi-zone / Multi-region\nBackups & DR tested',I.check],
  ];
  controls.forEach((c,i)=>{const x=28+i*246;if(i>0)p.nodes.push(cell(`sep${i}`,'','shape=line;html=1;strokeColor=#D0D5DD;strokeWidth=1;',x-8,830,1,108));p.nodes.push(img(`cc_i${i}`,c[2],x,842,48,48));p.nodes.push(cell(`cc_t${i}`,label(c[0],c[1]),`${TXT}align=left;whiteSpace=wrap;overflow=hidden;`,x+58,836,176,82));});

  // More explicit connectivity to match approved visual storytelling
  edge(p,'app_obs',1030,317,1096,317,'#175CD3');
  edge(p,'app_data1',590,410,590,471,'#12B76A');edge(p,'app_data2',722,410,722,471,'#12B76A');edge(p,'app_data3',918,374,918,471,'#12B76A');
  edge(p,'dev_iap',168,623,220,623,'#175CD3');edge(p,'iap_supply',390,623,464,696,'#175CD3',true);
  edge(p,'binauth_app',756,674,756,410,'#175CD3');

  return `<mxfile host="app.diagrams.net" modified="2026-08-20T16:35:00.000Z" agent="PromptCanvas" version="24.0.0" type="device"><diagram id="secure_deployment_topology_approved" name="Secure Deployment Topology Map"><mxGraphModel dx="1536" dy="1024" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1536" pageHeight="1024" background="#FFFFFF"><root>${p.nodes.join('\n')}${p.edges.join('\n')}</root></mxGraphModel></diagram></mxfile>`;
}
