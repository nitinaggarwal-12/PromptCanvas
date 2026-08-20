/**
 * Blueprint 20 — Hybrid & Multi-Cloud Connectivity on Google Cloud.
 * Phase 3.2 rebuild based on current NCC, Cloud Interconnect, HA VPN,
 * Cross-Cloud Interconnect, Cloud NGFW, PSC and federated-identity patterns.
 */

const GCP='data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2048%2048%22%3E%3Cpath%20fill%3D%22%23EA4335%22%20d%3D%22M24%209.5c3.54%200%206.71%201.22%209.21%203.6l6.85-6.85C35.9%202.38%2030.47%200%2024%200%2014.62%200%206.51%205.38%202.56%2013.22l7.98%206.19C12.43%2013.72%2017.74%209.5%2024%209.5z%22%2F%3E%3Cpath%20fill%3D%22%234285F4%22%20d%3D%22M46.98%2024.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58%202.96-2.26%205.48-4.78%207.18l7.73%206c4.51-4.18%207.09-10.36%207.09-17.65z%22%2F%3E%3Cpath%20fill%3D%22%23FBBC05%22%20d%3D%22M10.53%2028.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92%2016.46%200%2020.12%200%2024c0%203.88.92%207.54%202.56%2010.78l7.97-6.19z%22%2F%3E%3Cpath%20fill%3D%22%2334A853%22%20d%3D%22M24%2048c6.48%200%2011.93-2.13%2015.89-5.81l-7.73-6c-2.15%201.45-4.92%202.3-8.16%202.3-6.26%200-11.57-4.22-13.47-9.91l-7.98%206.19C6.51%2042.62%2014.62%2048%2024%2048z%22%2F%3E%3C%2Fsvg%3E';
const ICON={aws:'https://cdn.simpleicons.org/amazonwebservices/232F3E',azure:'https://cdn.simpleicons.org/microsoftazure/0078D4',terraform:'https://cdn.simpleicons.org/terraform/844FBA',gke:'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/google-kubernetes-engine/default.svg',run:'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/google-cloud-run/default.svg',bq:'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/google-bigquery/default.svg'};
const esc=(s:string)=>s.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const v=(id:string,value:string,style:string,x:number,y:number,w:number,h:number)=>`<mxCell id="${id}" value="${esc(value)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`;
const img=(id:string,url:string,x:number,y:number,w:number,h:number)=>v(id,'',`shape=image;imageAspect=0;aspect=fixed;image=${url};align=center;verticalAlign=middle;`,x,y,w,h);
const zone=(id:string,n:number,title:string,sub:string,x:number,y:number,w:number,h:number,accent:string,fill:string)=>[
 v(id,'',`rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${accent};strokeWidth=1.5;`,x,y,w,h),
 v(`${id}_n`,String(n),`ellipse;whiteSpace=wrap;html=1;fillColor=${accent};strokeColor=${accent};fontColor=#FFFFFF;fontStyle=1;fontSize=13;align=center;verticalAlign=middle;`,x+14,y+13,30,30),
 v(`${id}_h`,`<b>${title}</b><br><span style="font-size:9.5px;color:#64748B">${sub}</span>`,'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=3;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=12.5;',x+54,y+8,w-68,45)
].join('\n');
const mini=(id:string,title:string,body:string,x:number,y:number,w:number,h:number,accent:string,fill='#FFFFFF')=>v(id,`<b>${title}</b><br><span style="font-size:9px;color:#64748B">${body}</span>`,`rounded=1;arcSize=7;whiteSpace=wrap;html=1;overflow=hidden;spacing=6;fillColor=${fill};strokeColor=${accent};strokeWidth=1.05;fontColor=#0F172A;fontSize=10.6;align=left;verticalAlign=middle;`,x,y,w,h);
const card=(id:string,title:string,body:string,x:number,y:number,w:number,h:number,accent:string,icon=GCP,fill='#FFFFFF')=>[
 v(id,'',`rounded=1;arcSize=8;whiteSpace=wrap;html=1;overflow=hidden;fillColor=${fill};strokeColor=${accent};strokeWidth=1.1;`,x,y,w,h),
 img(`${id}_i`,icon,x+14,y+Math.max(10,(h-36)/2),36,36),
 v(`${id}_t`,`<b>${title}</b><br><span style="font-size:9.2px;color:#64748B">${body}</span>`,'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=4;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=10.9;',x+60,y+6,w-70,h-12)
].join('\n');
const edge=(id:string,s:string,t:string,label:string,color:string,dashed=false,exitX=1,exitY=.5,entryX=0,entryY=.5)=>`<mxCell id="${id}" value="${esc(label)}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${color};strokeWidth=1.9;${dashed?'dashed=1;dashPattern=6 4;':''}endArrow=block;endFill=1;fontSize=9.3;fontColor=#334155;labelBackgroundColor=#FFFFFF;exitX=${exitX};exitY=${exitY};entryX=${entryX};entryY=${entryY};" edge="1" parent="1" source="${s}" target="${t}"><mxGeometry relative="1" as="geometry"/></mxCell>`;

export function buildHybridMultiCloudXml():string{
 const c:string[]=['<mxCell id="0"/>','<mxCell id="1" parent="0"/>'];
 c.push(v('intent','<b>HYBRID & MULTI-CLOUD CONNECTIVITY</b>   Private, resilient routing across enterprise sites, Google Cloud VPCs, AWS and Azure with centralized connectivity orchestration, explicit security boundaries and federated identity.','rounded=1;arcSize=7;whiteSpace=wrap;html=1;overflow=hidden;spacing=7;fillColor=#F8FBFF;strokeColor=#8AB4F8;strokeWidth=1.2;fontColor=#334155;fontSize=11;align=center;verticalAlign=middle;',25,15,1710,40));

 c.push(zone('sites',1,'ENTERPRISE SITES','On-premises, branch and edge environments',25,80,275,560,'#475569','#F8FAFC'));
 c.push(mini('dc','Primary data center','Enterprise networks • private services • identity infrastructure • legacy and modern workloads',45,145,235,88,'#475569'));
 c.push(mini('branch','Branch / plant / edge','Sites requiring controlled connectivity to cloud/shared services',45,253,235,76,'#475569'));
 c.push(mini('corp_dns','Enterprise DNS','Authoritative/forwarding design integrated with Cloud DNS according to namespace ownership',45,349,235,82,'#475569'));
 c.push(mini('sdwan','Optional SD-WAN / NVA','Use router-appliance/hybrid-spoke patterns only when enterprise routing/security requirements justify an NVA',45,451,235,84,'#475569'));
 c.push(mini('site_identity','Enterprise IdP','Workforce identities and workload identity providers remain external trust sources',45,555,235,58,'#475569'));

 c.push(zone('hybrid',2,'HYBRID CONNECTIVITY EDGE','Primary private path plus encrypted resilient alternative',325,80,300,560,'#1A73E8','#EFF6FF'));
 c.push(card('interconnect','Dedicated / Partner Cloud Interconnect','Private high-bandwidth connectivity; design redundant connections/VLAN attachments for production resilience',345,145,260,92,'#1A73E8'));
 c.push(card('router','Cloud Router','Dynamic BGP route exchange for Interconnect, HA VPN and supported hybrid connectivity',345,257,260,82,'#1A73E8'));
 c.push(card('havpn','HA VPN','IPsec-based hybrid path; can be primary for smaller use cases or a resilience path by design',345,359,260,86,'#1A73E8'));
 c.push(mini('routing_policy','Routing policy','Explicit prefixes • route advertisement/import • BGP priorities • asymmetric-route avoidance • failure testing',345,465,260,92,'#1A73E8'));
 c.push(mini('dns_hybrid','Cloud DNS hybrid resolution','Forwarding/peering/inbound-outbound DNS patterns chosen for the enterprise namespace model',345,577,260,36,'#1A73E8'));

 c.push(zone('ncc',3,'GOOGLE CLOUD CONNECTIVITY CORE','Network Connectivity Center hub-and-spoke orchestration',650,80,440,560,'#0F8B82','#ECFDF5'));
 c.push(v('ncc_hub','<b>Network Connectivity Center hub</b><br><span style="font-size:9.5px;color:#64748B">Global connectivity-management resource • VPC spokes + hybrid spokes • star/mesh design chosen intentionally</span>','rounded=1;arcSize=10;whiteSpace=wrap;html=1;overflow=hidden;spacing=7;fillColor=#FFFFFF;strokeColor=#0F8B82;strokeWidth=1.8;fontColor=#0F172A;fontSize=12.5;align=center;verticalAlign=middle;',680,145,380,86));
 c.push(mini('shared','Shared-services VPC spoke','DNS • egress/shared services • platform tooling; route exchange scoped by topology',680,261,180,90,'#0F8B82'));
 c.push(mini('prod','Production VPC spoke','Application/data subnets • private service access • production policy',880,261,180,90,'#0F8B82'));
 c.push(mini('nonprod','Non-production VPC spoke','Development/test isolation with controlled shared-service reachability',680,371,180,90,'#0F8B82'));
 c.push(mini('partner','Partner / integration VPC spoke','Dedicated blast radius for third-party/private integration where required',880,371,180,90,'#0F8B82'));
 c.push(mini('ngfw','Cloud NGFW / hierarchical firewall policies','Distributed network enforcement; advanced inspection only when selected edition/design requires it',680,481,380,86,'#D93025','#FFF7F7'));
 c.push(mini('ncc_rule','Topology rule','NCC provides connectivity orchestration and route exchange—not automatic application authorization or transitive service access.',680,587,380,26,'#0F8B82'));

 c.push(zone('clouds',4,'CROSS-CLOUD CONNECTIVITY','Private cloud-to-cloud transport with explicit redundancy',1115,80,300,560,'#7B61A8','#F7F4FF'));
 c.push(v('aws_box','', 'rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#7B61A8;strokeWidth=1.1;',1135,145,260,100)); c.push(img('aws_i',ICON.aws,1155,174,45,45)); c.push(v('aws_t','<b>AWS VPCs</b><br><span style="font-size:9px;color:#64748B">Private AWS networks / Transit Gateway architecture as selected</span>','text;html=1;whiteSpace=wrap;overflow=hidden;spacing=4;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=10.8;',1215,158,165,70));
 c.push(v('az_box','', 'rounded=1;arcSize=8;fillColor=#FFFFFF;strokeColor=#7B61A8;strokeWidth=1.1;',1135,265,260,100)); c.push(img('az_i',ICON.azure,1155,294,45,45)); c.push(v('az_t','<b>Azure VNets</b><br><span style="font-size:9px;color:#64748B">Private Azure networks / hub-spoke architecture as selected</span>','text;html=1;whiteSpace=wrap;overflow=hidden;spacing=4;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=10.8;',1215,278,165,70));
 c.push(card('cci','Cross-Cloud Interconnect','Dedicated private cross-cloud transport for supported providers/locations; order redundant connections for resilient production designs',1135,385,260,100,'#7B61A8'));
 c.push(mini('cloudvpn_alt','HA VPN alternative','Use encrypted VPN where Cross-Cloud Interconnect is unavailable, unnecessary or used as a backup path',1135,505,260,86,'#7B61A8'));

 c.push(zone('services',5,'PRIVATE SERVICES & WORKLOADS','Application access stays explicit even when networks are connected',1440,80,295,560,'#E87900','#FFF7ED'));
 c.push(card('psc','Private Service Connect','Private endpoints/service attachments for supported Google, producer and third-party services',1460,145,255,88,'#E87900'));
 c.push(card('gke','GKE workloads','Private/container workloads inside selected VPC/subnet and identity model',1460,253,255,82,'#E87900',ICON.gke));
 c.push(card('run','Cloud Run services','Serverless application/services with explicit ingress, VPC connectivity and IAM policy',1460,355,255,82,'#E87900',ICON.run));
 c.push(card('data','Data services','BigQuery / Cloud Storage / Cloud SQL / AlloyDB etc.; use each service’s supported private-access option',1460,457,255,92,'#E87900',ICON.bq));
 c.push(mini('lb','Cloud Load Balancing + Cloud Armor','Approved internet/application ingress where public exposure is required; separate from private east-west connectivity',1460,569,255,44,'#E87900'));

 // Network paths.
 c.push(edge('p1','dc','interconnect','primary private path','#2563EB')); c.push(edge('p2','interconnect','router','VLAN attachment / BGP','#2563EB')); c.push(edge('p3','router','ncc_hub','hybrid spoke','#2563EB')); c.push(edge('p4','dc','havpn','encrypted resilience path','#2563EB',true)); c.push(edge('p5','havpn','ncc_hub','hybrid spoke','#2563EB',true));
 c.push(edge('p6','ncc_hub','prod','route exchange','#0F8B82')); c.push(edge('p7','prod','psc','private application/service traffic','#E87900')); c.push(edge('p8','aws_box','cci','cross-cloud private transport','#7B61A8',false,0,.5,1,.35)); c.push(edge('p9','az_box','cci','cross-cloud private transport','#7B61A8',false,0,.5,1,.65)); c.push(edge('p10','cci','ncc_hub','Cross-Cloud Interconnect hybrid spoke','#7B61A8',false,0,.5,1,.75));

 c.push(zone('controls',6,'IDENTITY, SECURITY, OBSERVABILITY & GOVERNANCE','Control plane spans all transport paths',25,675,1710,250,'#334155','#F8FAFC'));
 c.push(mini('workforce','Workforce Identity Federation','External workforce users authenticate with enterprise IdP and receive IAM authorization without synchronized Google accounts',50,744,300,94,'#334155'));
 c.push(mini('workload','Workload Identity Federation','AWS/Azure/on-prem or CI workloads use external workload identities/short-lived credentials instead of static service-account keys',370,744,300,94,'#334155'));
 c.push(mini('security','Security controls','Cloud NGFW • Cloud Armor for approved ingress • Security Command Center • KMS • Secret Manager • least privilege',690,744,300,94,'#334155'));
 c.push(mini('vpcsc','Data exfiltration controls','VPC Service Controls only around supported Google Cloud services/methods; do not treat it as a generic VPC firewall',1010,744,300,94,'#334155'));
 c.push(mini('netops','Network operations','Network Intelligence Center • Connectivity Tests • Flow Analyzer/VPC Flow Logs • Cloud Logging/Monitoring • BGP/tunnel/attachment health',1330,744,370,94,'#334155'));
 c.push(img('tf_i',ICON.terraform,55,857,30,30)); c.push(v('tf_t','<b>Infrastructure as Code:</b> Terraform / approved automation • versioned route/firewall/DNS changes • peer-cloud change coordination • tested failover runbooks','text;html=1;whiteSpace=wrap;overflow=hidden;spacing=3;align=left;verticalAlign=middle;fontColor=#475569;fontSize=10;',95,851,760,42));
 c.push(v('legend','<b>FLOW</b>  <span style="color:#2563EB">━━ primary hybrid/private</span>  <span style="color:#2563EB">┄┄ VPN resilience</span>  <span style="color:#7B61A8">━━ cross-cloud</span>  <span style="color:#0F8B82">━━ NCC route exchange</span>  <span style="color:#E87900">━━ application/service traffic</span>','rounded=1;arcSize=6;whiteSpace=wrap;html=1;overflow=hidden;spacing=5;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;fontColor=#334155;fontSize=10;align=center;verticalAlign=middle;',880,852,820,38));

 return `<mxfile host="app.diagrams.net" modified="2026-08-20T00:00:00.000Z" agent="PromptCanvas" version="24.0.0" type="device"><diagram id="hybrid_multicloud_connectivity" name="Hybrid and Multi-Cloud Connectivity on Google Cloud"><mxGraphModel dx="1760" dy="960" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1760" pageHeight="950" background="#FFFFFF"><root>${c.join('\n')}</root></mxGraphModel></diagram></mxfile>`;
}
