// Approved Blueprint 16 master: Secure Deployment Topology Map
// Native mxGraph XML matching the user-approved visual while remaining editable.

const ICON = {
  github: 'https://cdn.simpleicons.org/github',
  terraform: 'https://cdn.simpleicons.org/terraform',
  googleCloud: 'https://cdn.simpleicons.org/googlecloud',
  cloudBuild: 'https://cdn.jsdelivr.net/npm/gcp-icons@1.0.6/dist/icons/cloud-build-512-color.svg',
  artifactRegistry: 'https://cdn.jsdelivr.net/npm/gcp-icons@1.0.6/dist/icons/artifact-registry-512-color.svg',
  cloudDeploy: 'https://cdn.jsdelivr.net/npm/gcp-icons@1.0.6/dist/icons/cloud-deploy-512-color.svg',
  gke: 'https://cdn.jsdelivr.net/npm/gcp-icons@1.0.6/dist/icons/gke-512-color.svg',
  cloudRun: 'https://cdn.jsdelivr.net/npm/gcp-icons@1.0.6/dist/icons/cloudrun-512-color-rgb.svg',
  secretManager: 'https://cdn.jsdelivr.net/npm/gcp-icons@1.0.6/dist/icons/secret-manager-512-color.svg',
  kms: 'https://cdn.jsdelivr.net/npm/gcp-icons@1.0.6/dist/icons/key-management-service-512-color.svg',
  scc: 'https://cdn.jsdelivr.net/npm/gcp-icons@1.0.6/dist/icons/security-command-center-512-color.svg',
  monitoring: 'https://cdn.jsdelivr.net/npm/gcp-icons@1.0.6/dist/icons/cloud-monitoring-512-color.svg',
};

function esc(v: string): string {
  return v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function rich(title: string, lines: string[], icon?: string): string {
  const img = icon ? `&lt;td style=&quot;width:42px;vertical-align:top;padding:2px 8px 0 0;&quot;&gt;&lt;img src=&quot;${icon}&quot; width=&quot;30&quot; height=&quot;30&quot;/&gt;&lt;/td&gt;` : '';
  const body = lines.map((l) => `&lt;div style=&quot;margin-top:4px;font-size:10.5px;line-height:1.27;color:#26324A;&quot;&gt;${esc(l)}&lt;/div&gt;`).join('');
  return `&lt;table style=&quot;width:100%;height:100%;border-collapse:collapse;font-family:Inter,Arial,sans-serif;&quot;&gt;&lt;tr&gt;${img}&lt;td style=&quot;vertical-align:top;&quot;&gt;&lt;div style=&quot;font-size:12.5px;font-weight:800;color:#14213D;line-height:1.2;&quot;&gt;${esc(title)}&lt;/div&gt;${body}&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;`;
}

function cell(id: string, value: string, style: string, x: number, y: number, w: number, h: number): string {
  return `<mxCell id="${id}" value="${value}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`;
}

function edge(id: string, source: string, target: string, color: string, label = '', dashed = false, width = 2.5): string {
  return `<mxCell id="${id}" value="${esc(label)}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;strokeColor=${color};strokeWidth=${width};${dashed ? 'dashed=1;dashPattern=6 4;' : ''}fontFamily=Inter;fontSize=10;fontStyle=1;fontColor=${color};labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="${source}" target="${target}"><mxGeometry relative="1" as="geometry"/></mxCell>`;
}

const box = 'rounded=1;arcSize=10;whiteSpace=wrap;html=1;spacing=10;verticalAlign=middle;fontFamily=Inter;';
const text = 'text;html=1;strokeColor=none;fillColor=none;fontFamily=Inter;verticalAlign=middle;';

export function getApprovedSecureDeploymentBlueprintXml(): string {
  const n: string[] = [];
  const e: string[] = [];

  n.push(cell('bp16_title', '<b>Secure Deployment Topology Map</b>', `${text}fontSize=29;fontColor=#0B1830;fontStyle=1;`, 20, 12, 850, 42));
  n.push(cell('bp16_subtitle', 'Zero-Trust GCP Topology with Cloud Armor WAF, GKE Autopilot, Cloud SQL PSA, Binary Authorization, and CMEK KMS.', `${text}fontSize=13;fontColor=#40506C;`, 20, 54, 980, 30));
  n.push(cell('bp16_count', '<b>16 of 50</b>', `${box}fillColor=#0A5DDB;strokeColor=#0A5DDB;fontColor=#FFFFFF;fontSize=12;align=center;`, 850, 18, 80, 28));
  n.push(cell('bp16_domain', '<b>Cloud Infra Security</b>', `${box}fillColor=#F4FFFA;strokeColor=#82D6B0;fontColor=#087A52;fontSize=11;align=center;`, 945, 18, 145, 28));
  n.push(cell('bp16_abs', '<b>Physical</b>', `${box}fillColor=#FBF8FF;strokeColor=#C7A5EE;fontColor=#6941C6;fontSize=11;align=center;`, 1102, 18, 90, 28));
  n.push(cell('bp16_layer', '<b>Layer 5 (Operations)</b>', `${box}fillColor=#FFF8EE;strokeColor=#F3AE52;fontColor=#B35B00;fontSize=11;align=center;`, 1204, 18, 150, 28));
  n.push(cell('bp16_phase', '<b>Phase 4: Technical Deep-Dive & Security Validation</b>', `${box}fillColor=#F5F8FF;strokeColor=#7FA9F8;fontColor=#164DB7;fontSize=10.5;align=center;`, 1366, 8, 160, 48));

  const cols = [
    {id:'c1',x:20,w:245,fill:'#F7FAFF',stroke:'#3B82F6',num:'1',title:'SOURCE & CHANGE CONTROL',sub:'Develop and identify risks; enforce protection at every gate.'},
    {id:'c2',x:300,w:270,fill:'#F5FCF8',stroke:'#35A56B',num:'2',title:'BUILD, TEST & PROVENANCE',sub:'Build artifact with trusted provenance.'},
    {id:'c3',x:605,w:285,fill:'#FFF9F0',stroke:'#E88916',num:'3',title:'ARTIFACT & SUPPLY-CHAIN GATE',sub:'Validate artifact and enforce admission policy.'},
    {id:'c4',x:925,w:260,fill:'#FBF7FF',stroke:'#8055C8',num:'4',title:'PROMOTION & DEPLOYMENT',sub:'Enforce immutability; detect risk; mitigate; rollout with feedback.'},
    {id:'c5',x:1220,w:306,fill:'#F7FBFF',stroke:'#234F89',num:'5',title:'PROTECTED RUNTIME',sub:'Runtime boundaries, private access and workload identity.'},
  ];
  for (const c of cols) {
    n.push(cell(c.id, '', `${box}fillColor=${c.fill};strokeColor=${c.stroke};strokeWidth=1.5;`, c.x, 95, c.w, 650));
    n.push(cell(`${c.id}_num`, `<b>${c.num}</b>`, `ellipse;whiteSpace=wrap;html=1;fillColor=${c.stroke};strokeColor=${c.stroke};fontColor=#FFFFFF;fontSize=18;fontStyle=1;align=center;`, c.x+12, 105, 38, 38));
    n.push(cell(`${c.id}_title`, `<b>${esc(c.title)}</b><br><span style="font-size:10px;color:#43516A">${esc(c.sub)}</span>`, `${text}fontSize=12.5;fontColor=#13213B;fontStyle=1;`, c.x+58, 102, c.w-70, 52));
  }

  const card = (id:string, title:string, lines:string[], x:number,y:number,w:number,h:number,stroke:string,fill='#FFFFFF',icon?:string) =>
    n.push(cell(id, rich(title,lines,icon), `${box}fillColor=${fill};strokeColor=${stroke};strokeWidth=1.25;align=left;`, x,y,w,h));

  // Stage 1
  card('dev','Developer + Gemini Code Assist',['IDE assistance does not bypass reviews','branch protection or security gates.'],32,168,220,82,'#82AEEF','#FFFFFF');
  card('git','Secure Source Manager / GitHub',['Protected branches · Pull request review','Signed commits · Change history'],32,264,220,88,'#82AEEF','#FFFFFF',ICON.github);
  card('precommit','Pre-commit security',['SAST · Secrets · IaC policy','Dependency scan · License compliance'],32,366,220,78,'#82AEEF','#FFFFFF');
  card('iac','Infrastructure as Code',['Terraform / Pulumi / CDK','Code review · Policy checks · Environment parameters'],32,458,220,92,'#82AEEF','#FFFFFF',ICON.terraform);
  card('evidence','Change evidence',['Commit / PR · reviewer · issue/change reference','provenance status here'],32,566,220,90,'#82AEEF','#FFFFFF');

  // Stage 2
  card('build','Cloud Build / approved CI',['Isolated build steps · pinned builders','minimal builders · least-privilege service identity'],315,168,240,80,'#66B58A','#FFFFFF',ICON.cloudBuild);
  card('tests','Quality & security tests',['Unit/Integration · SAST · Dependency (SBOM)','Container / IaC scan'],315,268,240,90,'#66B58A','#FFFFFF');
  card('prov','Build provenance & SBOM',['Generate verifiable provenance','Attach policy-relevant attestations to Artifact Registry'],315,376,240,94,'#66B58A','#FFFFFF');
  card('fail','Failure path',['Fail fast on policy checks','Stop promotion; findings return to pull request/build owner.'],315,504,240,82,'#EF4444','#FFF9F7');
  card('telemetry','Build telemetry',['Build duration · failure reason · scanner findings','provenance generation · audit logs'],315,608,240,78,'#66B58A','#FFFFFF');

  // Stage 3
  card('registry','Artifact Registry',['Versioned container / package artifacts','vulnerability metadata · controlled access'],620,168,255,80,'#E29A43','#FFFFFF',ICON.artifactRegistry);
  card('sign','Signing / provenance',['Sign artifact; verify attestations','against deployment policy'],620,264,255,78,'#E29A43','#FFFFFF');
  card('binary','Binary Authorization',['Admission policy checks trusted signer/provenance','for supported GKE / Cloud Run runtimes.'],620,358,255,92,'#E29A43','#FFFFFF');
  card('vuln','Vulnerability decision',['Severity/vulnerability policy determines block,','exception with approval, or promotion.'],620,466,255,82,'#E29A43','#FFFFFF');
  card('exception','Exception evidence',['Formal approval · expiry · justification','compensating controls · audit trail'],620,566,255,90,'#E29A43','#FFFFFF');

  // Stage 4
  card('deploy','Cloud Deploy / approved CD',['Promotion pipeline from CI to target environments','deployment artifact remains immutable'],940,168,230,82,'#956ED2','#FFFFFF',ICON.cloudDeploy);
  card('nonprod','Non-production',['Deploy immutable artifact · smoke integration tests','policy validation · no rebuild per environment'],940,268,230,84,'#956ED2','#FFFFFF');
  card('approval','Production approval gate',['Automated criteria plus human/change approval','when required by risk or policy'],940,370,230,82,'#EF4444','#FFF9F9');
  card('rollout','Progressive rollout',['Canary · green/blue · traffic shift','deployment strategy appropriate to runtime'],940,470,230,82,'#956ED2','#FFFFFF');
  card('rollback','Rollback',['Reinstate known-good immutable revision/image','rollback trigger via workload-defined health/SLO breach'],940,586,230,88,'#956ED2','#FFFFFF');

  // Stage 5
  card('ingress','External ingress',['Cloud Load Balancing + Cloud Armor WAF','TLS · DDoS · policy at edge'],1234,168,278,84,'#6C91BF','#FFFFFF',ICON.googleCloud);
  card('run','Cloud Run workload',['Immutable runtime · ingress/egress configuration','this path is immutable'],1234,282,128,108,'#6C91BF','#FFFFFF',ICON.cloudRun);
  card('gke','GKE workload',['Workload Identity Federation · CMEK','namespaces/pod security · Binary Authorization'],1372,282,140,108,'#6C91BF','#FFFFFF',ICON.gke);
  card('private','Private service access',['Private Service Connect for supported producer/consumer endpoints','no generic service-to-service routing'],1234,420,278,88,'#6C91BF','#FFFFFF');
  card('secrets','Secrets & keys',['Secret Manager · Cloud KMS/CMEK where supported','no secrets baked into image or source'],1234,530,278,88,'#6C91BF','#FFFFFF',ICON.secretManager);
  card('scc','Security Command Center',['Posture findings and security policy leakage'],1234,640,135,74,'#6C91BF','#FFFFFF',ICON.scc);
  card('ops','Google Security Operations',['Central SIEM/SOAR integration for relevant security telemetry'],1377,640,135,74,'#6C91BF','#FFFFFF');

  // Delivery path and internal arrows
  e.push(edge('git_build','git','build','#1F66D1','Approved change'));
  e.push(edge('build_tests','build','tests','#15915D'));
  e.push(edge('tests_prov','tests','prov','#15915D'));
  e.push(edge('prov_registry','prov','registry','#15915D','Build + provenance'));
  e.push(edge('registry_sign','registry','sign','#E07800'));
  e.push(edge('sign_binary','sign','binary','#E07800'));
  e.push(edge('binary_vuln','binary','vuln','#E07800'));
  e.push(edge('vuln_exception','vuln','exception','#E07800'));
  e.push(edge('registry_deploy','registry','deploy','#E07800','Policy passed'));
  e.push(edge('deploy_nonprod','deploy','nonprod','#6D3EB6'));
  e.push(edge('nonprod_approval','nonprod','approval','#6D3EB6'));
  e.push(edge('approval_rollout','approval','rollout','#6D3EB6'));
  e.push(edge('rollout_ingress','rollout','ingress','#6D3EB6','Immutable runtime'));
  e.push(edge('ingress_run','ingress','run','#173B71'));
  e.push(edge('ingress_gke','ingress','gke','#173B71'));

  // Failure and rollback flows
  e.push(edge('prov_fail','prov','fail','#EF2D2D','',true,2.2));
  e.push(edge('fail_evidence','fail','evidence','#EF2D2D','Return findings',true,2.2));
  e.push(edge('rollout_rollback','rollout','rollback','#6D3EB6','Health / SLO breach',true,2.2));
  e.push(edge('rollback_nonprod','rollback','nonprod','#6D3EB6','Known-good revision',true,2.0));

  // Cross-cutting evidence + legends
  n.push(cell('evidence_panel','',`${box}fillColor=#FAFCFF;strokeColor=#7AA5E9;strokeWidth=1.2;`,20,770,745,150));
  n.push(cell('evidence_title','<b>CROSS-CUTTING EVIDENCE</b>',`${text}fontSize=13;fontColor=#14213D;fontStyle=1;`,80,790,260,26));
  n.push(cell('evidence_items','IAM & least privilege&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;Cloud Audit Logs&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;Cloud Logging/Monitoring&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;Vulnerability/Provenance evidence<br><br>Deployment history&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;Explicit exception expiry&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;SLO/health based rollback',`${text}fontSize=11.5;fontColor=#24334F;`,80,822,660,72));

  n.push(cell('legend_panel','',`${box}fillColor=#FAFCFF;strokeColor=#7AA5E9;strokeWidth=1.2;`,775,770,390,150));
  n.push(cell('legend_title','<b>ARROW / FLOW LEGEND</b>',`${text}fontSize=13;fontColor=#14213D;fontStyle=1;`,795,790,220,24));
  n.push(cell('legend_lines','<span style="color:#1F66D1">━━▶</span> Source & Change Control → Build, Test & Provenance<br><span style="color:#15915D">━━▶</span> Build → Artifact Gate<br><span style="color:#E07800">━━▶</span> Artifact Gate → Promotion & Deployment<br><span style="color:#6D3EB6">━━▶</span> Promotion & Deployment → Protected Runtime<br><span style="color:#EF2D2D">- -▶</span> Failure / Stop<br><span style="color:#6D3EB6">- -▶</span> Rollback / Health-SLO breach',`${text}fontSize=10.5;fontColor=#26324A;`,795,818,345,88));

  n.push(cell('zt_panel','',`${box}fillColor=#FAFCFF;strokeColor=#7AA5E9;strokeWidth=1.2;dashed=1;`,1180,770,346,150));
  n.push(cell('zt_title','<b>ZERO-TRUST PRINCIPLES ENFORCED END-TO-END</b>',`${text}fontSize=12.5;fontColor=#14213D;fontStyle=1;`,1200,790,300,28));
  n.push(cell('zt_items','✓ Verify every request, every time<br>✓ Least privilege access only<br>✓ Assume breach; minimize blast radius<br>✓ Encrypt in transit and at rest (CMEK)<br>✓ Continuous validation, policy as code<br>✓ Immutable artifacts and environments',`${text}fontSize=10.8;fontColor=#26324A;`,1200,824,300,82));

  n.push(cell('flow_label','<b>FLOW:</b>',`${text}fontSize=18;fontColor=#0D2B5B;fontStyle=1;`,20,946,90,36));
  const flow = ['Commit','Build & Test','Sign & Verify','Promote','Deploy','Run & Protect','Observe','Improve'];
  let fx = 125;
  flow.forEach((label,i)=>{ n.push(cell(`flow_${i}`,`<b>${esc(label)}</b>`,`${box}fillColor=#FFFFFF;strokeColor=#7EA4D6;fontColor=#14376B;fontSize=11.5;align=center;`,fx,938,125,46)); if(i<flow.length-1) n.push(cell(`flow_arrow_${i}`,'<b>▶</b>',`${text}fontSize=22;fontColor=#14376B;align=center;`,fx+127,942,30,38)); fx += 170; });

  return `<mxfile host="embed.diagrams.net"><diagram id="approved_secure_deployment_map" name="Secure Deployment Topology Map"><mxGraphModel dx="1600" dy="1040" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1550" pageHeight="1010" math="0" shadow="0"><root><mxCell id="0"/><mxCell id="1" parent="0"/>${n.join('')}${e.join('')}</root></mxGraphModel></diagram></mxfile>`;
}
