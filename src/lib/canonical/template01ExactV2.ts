const E = (v?: string | null) => (v ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function generateTemplate01ExactV2Xml(): string {
  const c: string[] = [];
  const rect = (id:string,v:string,x:number,y:number,w:number,h:number,s='') => c.push(`<mxCell id="${id}" value="${E(v)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#7E9BC8;strokeWidth=1;fontColor=#071632;fontSize=12;${s}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`);
  const text = (id:string,v:string,x:number,y:number,w:number,h:number,s='') => c.push(`<mxCell id="${id}" value="${E(v)}" style="text;html=1;strokeColor=none;fillColor=none;whiteSpace=wrap;fontColor=#071632;fontSize=12;verticalAlign=middle;${s}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`);
  const line = (id:string,source:string,target:string,label='',dash=false,s='') => c.push(`<mxCell id="${id}" value="${E(label)}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#071632;strokeWidth=2;endArrow=block;endFill=1;${dash?'dashed=1;dashPattern=6 5;':''}${s}" edge="1" parent="1" source="${source}" target="${target}"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  const hdr = (id:string,v:string,x:number,y:number,w:number,color='#0647B8') => rect(id,v,x,y,w,24,`fillColor=${color};strokeColor=${color};fontColor=#FFFFFF;fontStyle=1;fontSize=12;align=center;verticalAlign=middle;rounded=1;`);
  const tinyIcon = (id:string,label:string,x:number,y:number,color='#0D47B5') => rect(id,label,x,y,34,34,`shape=ellipse;fillColor=${color};strokeColor=${color};fontColor=#FFFFFF;fontStyle=1;fontSize=15;align=center;verticalAlign=middle;`);

  // Header — mapped to the 1536×1024 source canvas
  rect('badge','01',15,12,80,78,'fillColor=#0D47B5;strokeColor=#0D47B5;fontColor=#FFFFFF;fontSize=43;fontStyle=1;align=center;verticalAlign=middle;');
  text('title','System Context Diagram',108,10,440,44,'fontSize=31;fontStyle=1;align=left;');
  text('subtitle','NovaCura Integrated Healthcare Platform',108,51,445,34,'fontSize=22;fontStyle=1;align=left;');
  rect('divider','',557,20,2,64,'fillColor=#7D8AA6;strokeColor=none;rounded=0;');
  text('desc','This diagram shows NovaCura in its environment, the external\nactors and systems it interacts with, and the key flows.',571,18,505,68,'fontSize=15;align=left;verticalAlign=top;');
  rect('legend','',1124,12,396,86,'strokeColor=#315B9A;');
  text('legendTitle','LEGEND',1138,19,80,18,'fontStyle=1;fontSize=12;align=left;');
  text('leg1','────────▶   Primary Data Flow',1140,40,175,18,'fontSize=10;');
  text('leg2','- - - - - ▶   Async / Event Flow',1140,62,175,18,'fontSize=10;');
  text('leg3','··········▶   Optional / Reference Flow',1320,40,185,18,'fontSize=10;');
  text('leg4','🔒   Secure / Encrypted',1320,62,170,18,'fontSize=10;');

  // Left actors
  rect('actorsPanel','',15,118,208,622,'strokeColor=#315B9A;');
  hdr('actorsHdr','EXTERNAL ACTORS',15,118,208);
  const actors = [
    ['Patients','Access care, view\nrecords, schedule\nappointments,\nmake payments','#0D47B5','P'],
    ['Providers','Clinicians, nurses\nand care teams\nusing the system\nfor patient care','#0A7A68','MD'],
    ['Administrative\nUsers','Staff managing\noperations, billing,\nreports and\nconfigurations','#7A2D91','A'],
    ['Mobile Users','On-the-go access\nvia mobile app\nfor patients and\nproviders','#B47A00','M'],
  ];
  actors.forEach((a,i)=>{
    const y=160+i*145;
    tinyIcon(`actorIcon${i}`,a[3],34,y+14,a[2]);
    text(`actorName${i}`,a[0],108,y,102,38,'fontStyle=1;fontSize=14;align=left;');
    text(`actorDesc${i}`,a[1],108,y+39,100,88,'fontSize=11;align=left;verticalAlign=top;');
  });

  // Core system boundary
  rect('core','',370,118,700,622,'strokeColor=#0647B8;strokeWidth=2;rounded=1;');
  // logo approximation
  rect('heart','♥',455,137,64,64,'shape=ellipse;fillColor=#0D47B5;gradientColor=#0A7A68;strokeColor=none;fontColor=#FFFFFF;fontSize=35;fontStyle=1;align=center;verticalAlign=middle;');
  text('coreTitle','NovaCura Integrated Healthcare Platform',545,145,450,44,'fontStyle=1;fontSize=24;fontColor=#0647B8;align=left;');

  const cards = [
    ['Patient Engagement','Patient Portal\nMobile App\nCommunications\nEducation','PE'],
    ['Care Delivery','EHR / EMR\nClinical Workflows\nePrescribing\nCare Plans','CD'],
    ['Scheduling','Appointments\nResource Mgmt\nCalendar\nReminders','SC'],
    ['Billing & Revenue','Claims Mgmt\nInvoicing\nPayments\nAR / Collections','BR'],
    ['Clinical Data\nManagement','Clinical Notes\nDocuments\nLabs & Results\nImaging','DM'],
    ['Analytics & Reporting','Operational Reports\nClinical Analytics\nDashboards\nBI','AR'],
    ['AI & Decision Support','Risk Stratification\nCDS Rules\nPredictive Analytics\nGenAI Insights','AI'],
    ['Administration','User Mgmt\nRole Mgmt\nConfigurations\nAudit Logs','AD'],
  ];
  cards.forEach((k,i)=>{
    const row=Math.floor(i/4), col=i%4;
    const x=385+col*171, y=220+row*167;
    rect(`card${i}`,'',x,y,160,151,'strokeColor=#7E9BC8;');
    tinyIcon(`cardIcon${i}`,k[2],x+12,y+14,'#0D47B5');
    text(`cardTitle${i}`,k[0],x+52,y+11,97,47,'fontStyle=1;fontSize=11;fontColor=#0647B8;align=left;');
    text(`cardBody${i}`,k[1],x+36,y+60,112,80,'fontSize=11;align=left;verticalAlign=top;');
  });

  rect('integration','',385,557,664,70,'strokeColor=#7E9BC8;');
  tinyIcon('integrationIcon','↔',425,575,'#0D47B5');
  text('integrationTitle','Integration & API Layer',475,565,260,25,'fontStyle=1;fontSize=15;fontColor=#0647B8;align=left;');
  text('integrationBody','REST / FHIR APIs  |  GraphQL  |  Webhooks  |  API Gateway  |  Service Orchestration',475,591,540,25,'fontSize=10;align=left;');

  rect('data','',385,638,664,80,'strokeColor=#7E9BC8;');
  rect('dbIcon','DB',428,654,42,48,'shape=cylinder3;fillColor=#0D47B5;strokeColor=#0D47B5;fontColor=#FFFFFF;fontStyle=1;');
  text('dataTitle','Data Platform',500,650,250,25,'fontStyle=1;fontSize=15;fontColor=#0647B8;align=left;');
  text('dataBody','Operational DBs  |  Data Lake  |  Data Warehouse  |  Master Data Mgmt',500,678,510,25,'fontSize=10;align=left;');

  // External systems
  rect('systemsPanel','',1221,118,299,650,'strokeColor=#315B9A;');
  hdr('systemsHdr','EXTERNAL SYSTEMS',1221,118,299);
  const systems = [
    ['Epic','EHR Systems','Patient demographic, clinical\ndata, orders, results'],
    ['Labcorp','Laboratory Systems','Lab orders, results,\nstatus updates'],
    ['NUANCE','Imaging Systems','Imaging orders, images,\nreports'],
    ['Rx','Pharmacy Systems','Medication orders,\nstatus, interactions'],
    ['◈','Insurance Payers','Eligibility, benefits,\nclaims status'],
    ['stripe','Payment Gateways','Payment processing,\nrefunds'],
    ['okta','Identity Provider','SSO, MFA,\nuser identity'],
    ['❄','External Data Sources','Public Health, HIE,\nReference Data'],
  ];
  systems.forEach((s,i)=>{
    const y=144+i*79;
    rect(`sys${i}`,'',1232,y,278,72,'strokeColor=#A4B8D8;');
    rect(`logo${i}`,s[0],1244,y+10,90,52,`strokeColor=#E1E7F0;fillColor=#FAFBFD;fontStyle=1;fontSize=${i===0?20:16};fontColor=${i===5?'#635BFF':'#0B1739'};align=center;verticalAlign=middle;`);
    text(`sysName${i}`,s[1],1350,y+8,145,22,'fontStyle=1;fontSize=12;align=left;');
    text(`sysDesc${i}`,s[2],1350,y+29,145,36,'fontSize=10;align=left;verticalAlign=top;');
  });

  // Actor → NovaCura ingress arrows
  const actorTargets = ['card0','card1','card7','card0'];
  actorTargets.forEach((t,i)=> line(`actorFlow${i}`,`actorIcon${i}`,t,'HTTPS / TLS 1.3',false,'exitX=1;exitY=0.5;entryX=0;entryY=0.5;'));

  // NovaCura ↔ external systems flows
  const proto = ['HL7 FHIR / API','HL7 / FHIR','DICOM / HL7','NCPDP / FHIR','X12 / FHIR','HTTPS / API','SAML / OIDC','API / Files'];
  const source = ['card1','card4','card4','card1','card3','card3','card7','data'];
  proto.forEach((p,i)=> line(`sysFlow${i}`,source[i],`sys${i}`,p,i>=4,'exitX=1;exitY=0.5;entryX=0;entryY=0.5;'));

  // Bottom: Key flows
  rect('flowsPanel','',15,782,500,218,'strokeColor=#315B9A;');
  hdr('flowsHdr','KEY FLOWS',15,782,145);
  const flows=[
    'User Access: Actors access NovaCura via secure web/mobile (HTTPS/TLS 1.3).',
    'Clinical Data Exchange: Bidirectional exchange with EHR, Labs, Imaging, Pharmacy using HL7 FHIR / DICOM / NCPDP.',
    'Financial Transactions: Claims, eligibility and payments exchanged with Payers and Payment Gateways.',
    'Identity & Access: SSO/MFA via Identity Provider (SAML/OIDC).',
    'Data & Insights: Data aggregated for analytics, reporting and AI-driven insights.'
  ];
  flows.forEach((f,i)=>{ tinyIcon(`flowNum${i}`,String(i+1),28,818+i*34,'#0D47B5'); text(`flowText${i}`,f,70,811+i*34,430,31,'fontSize=10.5;align=left;'); });

  // Security & compliance
  rect('secPanel','',525,782,352,218,'strokeColor=#315B9A;');
  hdr('secHdr','SECURITY & COMPLIANCE',525,782,352,'#0F8A4B');
  const sec=[['🔒','Encrypt in Transit\nTLS 1.3'],['🛡','Encrypt at Rest\nAES-256'],['👥','Role-Based Access\nControl (RBAC)'],['▣','Audit Logging\n& Monitoring'],['⚕','HIPAA\nCompliant'],['☁','Data Backup\n& DR']];
  sec.forEach((s,i)=>{ const col=i%3,row=Math.floor(i/3); const x=540+col*108,y=821+row*82; text(`secIcon${i}`,s[0],x,y,30,34,'fontSize=22;align=center;'); text(`secText${i}`,s[1],x+32,y,72,42,'fontSize=9;align=left;'); if(col<2) rect(`secSep${i}`,'',x+104,y,1,44,'fillColor=#AFC0DA;strokeColor=none;rounded=0;'); });
  rect('secMid','',542,892,315,1,'fillColor=#315B9A;strokeColor=none;rounded=0;');

  // Notes
  rect('notesPanel','',899,782,290,218,'strokeColor=#315B9A;');
  hdr('notesHdr','NOTES',899,782,290,'#7B4BA7');
  const notes=['All connections are secure and encrypted.','FHIR is the primary integration standard.','Webhooks and event streams are used for async notifications.','NovaCura is cloud-native and highly scalable.','This is a Level 1 (Context) view.'];
  notes.forEach((n,i)=> text(`note${i}`,'•  '+n,920,821+i*34,245,30,'fontSize=10.5;align=left;'));

  // Diagram info
  rect('infoPanel','',1221,782,299,218,'strokeColor=#315B9A;');
  hdr('infoHdr','DIAGRAM INFO',1221,782,299);
  const info=[['Date:','May 20, 2025'],['Level:','1 (Context)'],['Owner:','Enterprise Architecture'],['Version:','1.0']];
  info.forEach((it,i)=>{ tinyIcon(`infoIcon${i}`,String(i+1),1240,820+i*43,'#0D47B5'); text(`info${i}`,`${it[0]}   ${it[1]}`,1283,818+i*43,215,32,'fontSize=10.5;align=left;'); });

  return `<mxGraphModel dx="1536" dy="1024" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1536" pageHeight="1024" background="#FFFFFF"><root><mxCell id="0"/><mxCell id="1" parent="0"/>${c.join('')}</root></mxGraphModel>`;
}
