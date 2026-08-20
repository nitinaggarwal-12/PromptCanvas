/** Blueprint 18 — Data Residency & Sovereign Cloud Map. */
const BASE='https://cdn.jsdelivr.net/npm/gcp-icons@1.0.6/dist/icons/';
const ICON={bigquery:`${BASE}bigquery-512-color.svg`,storage:`${BASE}cloud-storage-512-color.svg`,vertex:`${BASE}vertexai-512-color.svg`,scc:`${BASE}securitycommandcenter-512-color.svg`};
const esc=(s:string)=>s.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const v=(id:string,value:string,style:string,x:number,y:number,w:number,h:number)=>`<mxCell id="${id}" value="${esc(value)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`;
const img=(id:string,url:string,x:number,y:number,w:number,h:number)=>v(id,'',`shape=image;imageAspect=0;aspect=fixed;image=${url};align=center;verticalAlign=middle;`,x,y,w,h);
const box=(id:string,title:string,body:string,x:number,y:number,w:number,h:number,accent:string,fill='#FFFFFF',icon?:string)=>{
 const i=icon?img(`${id}_icon`,icon,x+14,y+Math.max(10,(h-34)/2),34,34):''; const tx=icon?x+58:x+14,tw=icon?w-70:w-28;
 return [v(id,'',`rounded=1;arcSize=7;whiteSpace=wrap;html=1;overflow=hidden;fillColor=${fill};strokeColor=${accent};strokeWidth=1.1;`,x,y,w,h),i,v(`${id}_label`,`<b>${title}</b><br><span style="font-size:9.8px;color:#64748B">${body}</span>`,'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=4;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=11;',tx,y+6,tw,h-12)].filter(Boolean).join('\n');
};
const edge=(id:string,s:string,t:string,label:string,color='#2563EB',dashed=false,exitX=1,exitY=.5,entryX=0,entryY=.5)=>`<mxCell id="${id}" value="${esc(label)}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${color};strokeWidth=1.8;${dashed?'dashed=1;dashPattern=6 4;':''}endArrow=block;endFill=1;fontSize=9.8;fontColor=#334155;labelBackgroundColor=#FFFFFF;exitX=${exitX};exitY=${exitY};entryX=${entryX};entryY=${entryY};" edge="1" parent="1" source="${s}" target="${t}"><mxGeometry relative="1" as="geometry"/></mxCell>`;

export function buildDataResidencyPhase1Xml():string{
 const c:string[]=['<mxCell id="0"/>','<mxCell id="1" parent="0"/>'];
 c.push(v('purpose','<b>DATA RESIDENCY & SOVEREIGN CONTROLS</b>   Apply regional/regulatory/sovereign control packages to defined Assured Workloads boundaries; validate service, region and control-package support before deployment.','rounded=1;arcSize=7;whiteSpace=wrap;html=1;overflow=hidden;spacing=7;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.2;fontColor=#334155;fontSize=11.4;align=center;verticalAlign=middle;',30,20,1700,38));

 // Governance entry plane.
 c.push(v('govern','', 'rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#334155;strokeWidth=1.4;',30,80,330,690));
 c.push(v('govern_h','<b>1  GOVERNANCE & CONTROL PACKAGE</b><br><span style="font-size:9.8px;color:#64748B">Define what must be sovereign/resident before choosing services</span>','text;html=1;whiteSpace=wrap;overflow=hidden;spacing=4;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=12.5;',50,96,290,48));
 c.push(box('requirements','Residency / sovereignty requirements','Data-at-rest location • support/personnel constraints • cryptographic control • regulatory scope • allowed cross-boundary movement',50,166,290,92,'#334155'));
 c.push(box('assured','Assured Workloads folder','Top-level regulated boundary containing in-scope projects/resources and continuously monitored controls.',50,280,290,88,'#7B61A8','#F7F4FF'));
 c.push(box('package','Selected control package','Regional data boundary, regulatory data boundary, or sovereign controls according to business/legal requirements.',50,390,290,92,'#7B61A8','#F7F4FF'));
 c.push(box('orgpolicy','Organization Policy guardrails','Restrict permitted resource locations/services/configurations according to the chosen package and enterprise policy.',50,504,290,90,'#334155'));
 c.push(box('identity','IAM + administrative access controls','Least privilege • Access Approval/Transparency or personnel/support controls when required and supported.',50,616,290,90,'#334155'));

 // EU boundary.
 c.push(v('eu','', 'rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#1A73E8;strokeWidth=1.5;',390,80,540,690));
 c.push(v('eu_h','<b>2  EU-BOUND WORKLOAD EXAMPLE</b><br><span style="font-size:9.8px;color:#64748B">Google Cloud EU region(s) permitted by the selected control package</span>','text;html=1;whiteSpace=wrap;overflow=hidden;spacing=4;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=12.5;',412,96,495,48));
 c.push(box('eu_project','Assured Workloads in-scope project','Resources inherit folder/control-package guardrails; use only supported products/configurations.',415,166,490,76,'#1A73E8','#FFFFFF'));
 c.push(box('eu_storage','Cloud Storage — approved EU location','Resident object/document data when the service/location is supported by the selected control package.',415,264,230,90,'#1A73E8','#FFFFFF',ICON.storage));
 c.push(box('eu_bq','BigQuery — approved EU location','Analytics data and jobs configured according to residency and control-package requirements.',665,264,240,90,'#1A73E8','#FFFFFF',ICON.bigquery));
 c.push(box('eu_vertex','Vertex AI — approved EU location','AI inference/training only where the required model/service/location and sovereign controls are supported.',415,376,230,104,'#1A73E8','#FFFFFF',ICON.vertex));
 c.push(box('eu_keys','Cloud KMS / Cloud EKM','Customer-managed or external key controls when required and supported by the selected package.',665,376,240,104,'#1A73E8'));
 c.push(box('eu_kaj','Key Access Justifications — package-dependent','View/approve/deny key access using justification codes for supported sovereign/regional packages and services.',415,502,490,94,'#7B61A8','#F7F4FF'));
 c.push(box('eu_logs','Audit & compliance evidence','Cloud Audit Logs • Access Transparency/Approval evidence where applicable • Assured Workloads monitoring.',415,618,490,82,'#334155'));

 // US boundary.
 c.push(v('us','', 'rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=#ECFDF5;strokeColor=#0F8B82;strokeWidth=1.5;',960,80,480,690));
 c.push(v('us_h','<b>3  US-BOUND WORKLOAD EXAMPLE</b><br><span style="font-size:9.8px;color:#64748B">US-only regions/support controls when required by selected package</span>','text;html=1;whiteSpace=wrap;overflow=hidden;spacing=4;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=12.5;',982,96,435,48));
 c.push(box('us_project','Assured Workloads in-scope project','Separate regulated boundary when US location/support requirements differ from EU requirements.',985,166,430,76,'#0F8B82'));
 c.push(box('us_storage','Cloud Storage — approved US location','Resident object/document data; validate exact service support and location constraints.',985,264,200,90,'#0F8B82','#FFFFFF',ICON.storage));
 c.push(box('us_bq','BigQuery — approved US location','Resident analytical data/jobs under the selected US data-boundary requirements.',1205,264,210,90,'#0F8B82','#FFFFFF',ICON.bigquery));
 c.push(box('us_vertex','Vertex AI — approved US location','Use only supported AI services/models/locations that satisfy the workload control package.',985,376,200,104,'#0F8B82','#FFFFFF',ICON.vertex));
 c.push(box('us_keys','Cloud KMS / key controls','Key location and customer/external key requirements follow the selected package and workload policy.',1205,376,210,104,'#0F8B82'));
 c.push(box('us_support','Support/personnel controls','Selected packages can constrain support personnel/location; validate entitlement and package requirements.',985,502,430,94,'#0F8B82'));
 c.push(box('us_logs','Audit & compliance evidence','Audit logs + Assured Workloads monitoring; violations require investigation/remediation—not a “100% compliant” badge.',985,618,430,82,'#334155'));

 // Cross-boundary policy rail.
 c.push(v('movement','', 'rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFF7ED;strokeColor=#E87900;strokeWidth=1.4;',1470,80,260,690));
 c.push(v('movement_h','<b>4  CROSS-BOUNDARY POLICY</b><br><span style="font-size:9.8px;color:#64748B">Movement is explicit, reviewed and requirement-driven</span>','text;html=1;whiteSpace=wrap;overflow=hidden;spacing=4;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=12.5;',1490,96,220,50));
 c.push(box('deny','Default posture','Do not replicate/copy regulated data across boundaries unless policy and legal requirements explicitly allow it.',1490,168,220,96,'#D93025','#FFF7F7'));
 c.push(box('classification','Classification & purpose','Classify dataset • owner • lawful/business purpose • permitted destinations • retention/deletion requirements.',1490,286,220,94,'#E87900'));
 c.push(box('transfer','Approved movement path','Use an explicitly approved transfer/API pattern with identity, encryption, logging and destination controls.',1490,402,220,94,'#E87900'));
 c.push(box('review','Human / governance approval','Required for exceptions or material cross-boundary movement according to organizational policy.',1490,518,220,86,'#D93025','#FFF7F7'));
 c.push(box('monitor','Monitor & remediate','Assured Workloads monitoring + audit evidence; investigate violations and remediate configuration drift.',1490,626,220,76,'#334155',undefined,ICON.scc));

 c.push(edge('e_req','requirements','assured','requirements'));
 c.push(edge('e_assured','assured','eu_project','apply controls','#7B61A8'));
 c.push(edge('e_assured_us','assured','us_project','separate boundary','#7B61A8'));
 c.push(edge('e_eu_move','eu_project','deny','cross-boundary request','#E87900',true));
 c.push(edge('e_us_move','us_project','deny','cross-boundary request','#E87900',true));
 c.push(v('footer','<b>DESIGN RULE:</b> A Google Cloud region is not automatically a “sovereign region.” Sovereignty comes from the selected Assured Workloads control package plus supported product/location configuration, identity/personnel controls, cryptographic controls and auditable policy enforcement.','rounded=1;arcSize=7;whiteSpace=wrap;html=1;overflow=hidden;spacing=7;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.1;fontColor=#475569;fontSize=10.5;align=center;verticalAlign=middle;',30,795,1700,58));
 return `<mxfile host="app.diagrams.net" modified="2026-08-20T00:00:00.000Z" agent="PromptCanvas" version="24.0.0" type="device"><diagram id="data_residency_sovereign_controls" name="Data Residency & Sovereign Cloud Map"><mxGraphModel dx="1760" dy="900" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1760" pageHeight="890" background="#FFFFFF"><root>${c.join('\n')}</root></mxGraphModel></diagram></mxfile>`;
}
