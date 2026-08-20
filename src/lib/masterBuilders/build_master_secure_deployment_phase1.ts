/** Blueprint 16 — Secure Deployment Topology Map. */
const BASE='https://cdn.jsdelivr.net/npm/gcp-icons@1.0.6/dist/icons/';
const ICON={cloudRun:`${BASE}cloudrun-512-color-rgb.svg`,gke:`${BASE}gke-512-color.svg`,scc:`${BASE}securitycommandcenter-512-color.svg`,github:'https://cdn.simpleicons.org/github',terraform:'https://cdn.simpleicons.org/terraform'};
const esc=(s:string)=>s.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const v=(id:string,value:string,style:string,x:number,y:number,w:number,h:number)=>`<mxCell id="${id}" value="${esc(value)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`;
const img=(id:string,url:string,x:number,y:number,w:number,h:number)=>v(id,'',`shape=image;imageAspect=0;aspect=fixed;image=${url};align=center;verticalAlign=middle;`,x,y,w,h);
const zone=(id:string,n:number,title:string,sub:string,x:number,w:number,accent:string,fill:string)=>[
 v(id,'',`rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${accent};strokeWidth=1.4;`,x,70,w,670),
 v(`${id}_n`,String(n),`ellipse;whiteSpace=wrap;html=1;fillColor=${accent};strokeColor=${accent};fontColor=#FFFFFF;fontStyle=1;fontSize=12;align=center;verticalAlign=middle;`,x+14,84,30,30),
 v(`${id}_h`,`<b>${title}</b><br><span style="font-size:9.8px;color:#64748B">${sub}</span>`,'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=3;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=12.5;',x+55,78,w-68,46)
].join('\n');
const card=(id:string,title:string,body:string,x:number,y:number,w:number,h:number,accent:string,icon?:string,fill='#FFFFFF')=>{
 const iconCell=icon?img(`${id}_icon`,icon,x+14,y+Math.max(10,(h-34)/2),34,34):'';const tx=icon?x+58:x+14,tw=icon?w-70:w-28;
 return [v(id,'',`rounded=1;arcSize=7;whiteSpace=wrap;html=1;overflow=hidden;fillColor=${fill};strokeColor=${accent};strokeWidth=1.05;`,x,y,w,h),iconCell,v(`${id}_label`,`<b>${title}</b><br><span style="font-size:9.7px;color:#64748B">${body}</span>`,'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=4;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=10.9;',tx,y+6,tw,h-12)].filter(Boolean).join('\n');
};
const edge=(id:string,s:string,t:string,label:string,color='#2563EB',dashed=false,exitX=1,exitY=.5,entryX=0,entryY=.5)=>`<mxCell id="${id}" value="${esc(label)}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${color};strokeWidth=1.8;${dashed?'dashed=1;dashPattern=6 4;':''}endArrow=block;endFill=1;fontSize=9.8;fontColor=#334155;labelBackgroundColor=#FFFFFF;exitX=${exitX};exitY=${exitY};entryX=${entryX};entryY=${entryY};" edge="1" parent="1" source="${s}" target="${t}"><mxGeometry relative="1" as="geometry"/></mxCell>`;

export function buildSecureDeploymentPhase1Xml():string{
 const c:string[]=['<mxCell id="0"/>','<mxCell id="1" parent="0"/>'];
 c.push(v('purpose','<b>SECURE SOFTWARE DELIVERY & DEPLOYMENT</b>   Source → build/test → signed artifact → policy gate → progressive deployment → protected runtime → evidence and rollback.','rounded=1;arcSize=7;whiteSpace=wrap;html=1;overflow=hidden;spacing=7;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.2;fontColor=#334155;fontSize=11.5;align=center;verticalAlign=middle;',30,20,1700,34));
 c.push(zone('source',1,'SOURCE & CHANGE CONTROL','Developer identity, review and protected source',30,280,'#1A73E8','#EFF6FF'));
 c.push(card('dev','Developer + Gemini Code Assist','IDE assistance does not bypass review, branch protection or security gates.',50,142,240,82,'#1A73E8'));
 c.push(card('repo','Secure Source Manager / GitHub','Protected branches • pull request review • signed/traceable change history',50,246,240,88,'#1A73E8',ICON.github));
 c.push(card('precommit','Pre-commit security','Secret scanning • linting • SAST where appropriate • dependency policy',50,356,240,82,'#1A73E8'));
 c.push(card('iac','Infrastructure as Code','Terraform / approved IaC • peer review • policy checks • environment parameters',50,460,240,86,'#1A73E8',ICON.terraform));
 c.push(card('source_evidence','Change evidence','Commit/PR • reviewer • issue/change reference • provenance starts here',50,568,240,82,'#1A73E8'));

 c.push(zone('build',2,'BUILD, TEST & PROVENANCE','Ephemeral build; test before promotion',330,300,'#0F8B82','#ECFDF5'));
 c.push(card('cloudbuild','Cloud Build / approved CI','Isolated build steps • pinned builders • least-privilege service identity',350,142,260,86,'#0F8B82'));
 c.push(card('tests','Quality & security tests','Unit/integration • SAST • dependency/SBOM • container/IaC scan as applicable',350,250,260,90,'#0F8B82'));
 c.push(card('provenance','Build provenance & attestations','Generate verifiable provenance and attach policy-relevant attestations to the artifact',350,362,260,88,'#0F8B82'));
 c.push(card('failbuild','Failure path','Failed tests or policy checks stop promotion; findings return to the pull request/build owner.',350,472,260,88,'#D93025',undefined,'#FFF7F7'));
 c.push(card('buildobs','Build telemetry','Build duration • failure reason • scanner findings • provenance generation • audit logs',350,582,260,68,'#0F8B82'));

 c.push(zone('supply',3,'ARTIFACT & SUPPLY-CHAIN GATE','Immutable artifact identity and admission policy',650,300,'#E87900','#FFF7ED'));
 c.push(card('registry','Artifact Registry','Versioned container/package artifacts • vulnerability metadata • controlled access',670,142,260,86,'#E87900'));
 c.push(card('sign','Signing / provenance','Cryptographic identity and provenance are verified against deployment policy.',670,250,260,86,'#E87900'));
 c.push(card('binauth','Binary Authorization','Admission policy checks trusted build/provenance/attestation requirements for supported GKE/Cloud Run patterns.',670,358,260,100,'#E87900'));
 c.push(card('vuln','Vulnerability decision','Severity/exploitability policy determines block, exception with approval, or promotion.',670,480,260,86,'#D93025',undefined,'#FFF7F7'));
 c.push(card('exception','Exception evidence','Named approver • expiry • justification • compensating control • audit trail',670,588,260,62,'#E87900'));

 c.push(zone('deploy',4,'PROMOTION & DEPLOYMENT','Environment-specific rollout with explicit rollback',970,300,'#7B61A8','#F7F4FF'));
 c.push(card('deploysvc','Cloud Deploy / approved CD','Promotion pipeline for dev → test/stage → production where supported by workload.',990,142,260,88,'#7B61A8'));
 c.push(card('devstage','Non-production','Deploy immutable artifact • smoke/integration tests • policy evidence • no rebuild per environment',990,252,260,86,'#7B61A8'));
 c.push(card('prodgate','Production approval gate','Automated criteria plus human/change approval when required by risk or policy.',990,360,260,90,'#D93025',undefined,'#FFF7F7'));
 c.push(card('progressive','Progressive rollout','Canary / gradual traffic shift / deployment strategy appropriate to Cloud Run, GKE or target runtime.',990,472,260,88,'#7B61A8'));
 c.push(card('rollback','Rollback','Restore known-good immutable revision/image; rollback trigger is workload-defined and observable.',990,582,260,68,'#7B61A8'));

 c.push(zone('runtime',5,'PROTECTED RUNTIME','Trust boundaries, private access and workload identity',1290,440,'#334155','#F8FAFC'));
 c.push(card('ingress','External ingress','Cloud Load Balancing + Cloud Armor where internet ingress is required; TLS and policy at approved edge.',1310,142,400,82,'#334155'));
 c.push(card('cloudrun','Cloud Run workload','Service identity • revisioned deployment • private ingress/egress configuration as required',1310,246,190,92,'#334155',ICON.cloudRun));
 c.push(card('gke','GKE workload','Workload Identity Federation for GKE • namespaces/policies • Binary Authorization where configured',1520,246,190,92,'#334155',ICON.gke));
 c.push(card('private','Private service access','Private Service Connect for supported producer/consumer service endpoints; not generic service-to-service routing.',1310,360,400,88,'#334155'));
 c.push(card('secrets','Secrets & keys','Secret Manager • Cloud KMS/CMEK where supported • no secrets baked into images or source',1310,470,400,82,'#334155'));
 c.push(card('scc','Security Command Center','Posture/findings and security signals where applicable',1310,574,195,76,'#334155',ICON.scc));
 c.push(card('secops','Google Security Operations','Central SIEM/SOAR integration where adopted; consume relevant security telemetry.',1515,574,195,76,'#334155'));

 // Main delivery spine, routed between columns and vertically aligned with the top cards.
 c.push(edge('e1','repo','cloudbuild','approved change'));
 c.push(edge('e2','cloudbuild','registry','build + provenance','#0F8B82'));
 c.push(edge('e3','registry','binauth','artifact identity','#E87900'));
 c.push(edge('e4','binauth','deploysvc','policy passed','#7B61A8'));
 c.push(edge('e5','deploysvc','cloudrun','immutable revision','#7B61A8'));
 c.push(edge('e5b','deploysvc','gke','immutable image','#7B61A8',true));
 c.push(edge('e_fail','tests','failbuild','failed gate','#D93025',true,0.5,1,0.5,0));
 c.push(edge('e_rb','progressive','rollback','health/SLO breach','#D93025',true,0.5,1,0.5,0));

 c.push(v('footer','<b>CROSS-CUTTING EVIDENCE:</b> IAM & least privilege • Cloud Audit Logs • Cloud Logging/Monitoring • vulnerability/provenance evidence • deployment history • explicit exception expiry • SLO/health-based rollback.','rounded=1;arcSize=7;whiteSpace=wrap;html=1;overflow=hidden;spacing=7;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.1;fontColor=#334155;fontSize=10.5;align=center;verticalAlign=middle;',30,770,1700,54));
 c.push(v('legend','<b>FLOW</b>   <span style="color:#2563EB">━━ delivery path</span>   <span style="color:#D93025">┄┄ failure / rollback</span>   Every environment deploys the same immutable artifact; controls may add evidence or block promotion, never silently bypass it.','rounded=1;arcSize=7;whiteSpace=wrap;html=1;overflow=hidden;spacing=7;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;fontColor=#475569;fontSize=10.3;align=center;verticalAlign=middle;',30,840,1700,48));
 return `<mxfile host="app.diagrams.net" modified="2026-08-20T00:00:00.000Z" agent="PromptCanvas" version="24.0.0" type="device"><diagram id="secure_deployment_topology" name="Secure Deployment Topology Map"><mxGraphModel dx="1760" dy="930" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1760" pageHeight="920" background="#FFFFFF"><root>${c.join('\n')}</root></mxGraphModel></diagram></mxfile>`;
}
