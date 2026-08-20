// Approved Blueprint 24 master: Enterprise DevSecOps Polyrepo CI/CD Pipeline Flow
// Rebuilt from the user-approved visual as native mxGraph XML so it remains editable.

const ICON = {
  googleCloud: 'https://cdn.simpleicons.org/googlecloud',
  terraform: 'https://cdn.simpleicons.org/terraform',
  argo: 'https://cdn.simpleicons.org/argo',
  docker: 'https://cdn.simpleicons.org/docker',
  dbt: 'https://cdn.simpleicons.org/dbt',
  openapi: 'https://cdn.simpleicons.org/openapiinitiative',
  bigquery: 'https://cdn.jsdelivr.net/npm/gcp-icons@1.0.6/dist/icons/bigquery-512-color.svg',
  storage: 'https://cdn.jsdelivr.net/npm/gcp-icons@1.0.6/dist/icons/cloud-storage-512-color.svg',
  gke: 'https://cdn.jsdelivr.net/npm/gcp-icons@1.0.6/dist/icons/gke-512-color.svg',
  vertex: 'https://cdn.jsdelivr.net/npm/gcp-icons@1.0.6/dist/icons/vertexai-512-color.svg',
  scc: 'https://cdn.jsdelivr.net/npm/gcp-icons@1.0.6/dist/icons/securitycommandcenter-512-color.svg',
};

function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function rich(title: string, lines: string[] = [], align: 'left' | 'center' = 'left'): string {
  const bullets = lines.map((line) => `&lt;div style=&quot;margin-top:5px;font-size:12px;line-height:1.28;color:#172033;&quot;&gt;${esc(line)}&lt;/div&gt;`).join('');
  return `&lt;div style=&quot;font-family:Inter,Arial,sans-serif;text-align:${align};&quot;&gt;&lt;div style=&quot;font-size:14px;font-weight:800;color:#102a56;line-height:1.2;&quot;&gt;${esc(title)}&lt;/div&gt;${bullets}&lt;/div&gt;`;
}

function smallRich(title: string, subtitle: string, align: 'left' | 'center' = 'center'): string {
  return `&lt;div style=&quot;font-family:Inter,Arial,sans-serif;text-align:${align};&quot;&gt;&lt;div style=&quot;font-size:12px;font-weight:800;color:#11294f;&quot;&gt;${esc(title)}&lt;/div&gt;&lt;div style=&quot;margin-top:4px;font-size:10px;color:#48566e;line-height:1.22;&quot;&gt;${esc(subtitle)}&lt;/div&gt;&lt;/div&gt;`;
}

function cell(id: string, value: string, style: string, x: number, y: number, w: number, h: number): string {
  return `<mxCell id="${id}" value="${value}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`;
}

function image(id: string, url: string, x: number, y: number, w: number, h: number): string {
  return cell(id, '', `shape=image;imageAspect=0;aspect=fixed;image=${url};strokeColor=none;fillColor=none;`, x, y, w, h);
}

function edge(id: string, source: string, target: string, label = '', color = '#111827', dashed = false, width = 2): string {
  return `<mxCell id="${id}" value="${esc(label)}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;strokeColor=${color};strokeWidth=${width};${dashed ? 'dashed=1;dashPattern=6 4;' : ''}fontFamily=Inter;fontSize=10;fontStyle=1;fontColor=${color};labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="${source}" target="${target}"><mxGeometry relative="1" as="geometry"/></mxCell>`;
}

const baseBox = 'rounded=1;arcSize=10;whiteSpace=wrap;html=1;shadow=0;spacing=10;fontFamily=Inter;verticalAlign=middle;';
const titleText = 'text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;fontFamily=Inter;';

export function getApprovedDevopsCicdBlueprintXml(): string {
  const nodes: string[] = [];
  const edges: string[] = [];

  // Navy metadata ribbon
  nodes.push(cell('header', '', 'rounded=0;fillColor=#07142E;strokeColor=#07142E;', 0, 0, 1491, 55));
  const chip = (id: string, text: string, x: number, w: number, fill: string, stroke: string) =>
    nodes.push(cell(id, `<b>${esc(text)}</b>`, `${baseBox}fillColor=${fill};strokeColor=${stroke};strokeWidth=1;fontColor=#FFFFFF;fontSize=11;align=center;`, x, 14, w, 28));
  chip('phase_lbl', 'PHASE', 20, 68, '#17213A', '#8AA4D6');
  chip('phase_val', 'Phase 4 · Technical Deep-Dive & Security Validation', 92, 318, '#00657C', '#18C1D7');
  chip('abs_lbl', 'ABSTRACTION', 430, 110, '#3B257C', '#8668E8');
  chip('abs_val', 'Physical', 544, 78, '#253664', '#829BDF');
  chip('layer_lbl', 'LAYER', 642, 64, '#7A4900', '#DE970C');
  chip('layer_val', 'Layer 5 (Operations)', 710, 150, '#5B4120', '#C89443');
  chip('domain_lbl', 'DOMAIN', 880, 76, '#173757', '#68B8B7');
  chip('domain_val', 'DevSecOps & Reliability', 960, 175, '#08715E', '#41B99F');
  chip('bp_lbl', 'BLUEPRINT', 1300, 86, '#17213A', '#8AA4D6');
  chip('bp_val', '24 of 50', 1390, 80, '#17213A', '#8AA4D6');

  // Title area
  nodes.push(image('gcp_brand', ICON.googleCloud, 20, 78, 62, 48));
  nodes.push(cell('title', '<b>Enterprise DevSecOps Polyrepo CI/CD Pipeline Flow</b>', `${titleText}fontSize=30;fontColor=#0B1830;fontStyle=1;`, 100, 65, 960, 45));
  nodes.push(cell('subtitle', 'Cloud Build polyrepo CI/CD, Artifact Registry, Terraform, Binary Authorization, private VPC controls, governance gates, and GKE continuous deployment.', `${titleText}fontSize=15;fontColor=#4D5A72;`, 100, 108, 1030, 36));
  nodes.push(cell('master_badge', '<b>MASTER BLUEPRINT</b>', `${baseBox}fillColor=#FFFFFF;strokeColor=#2F78FF;strokeWidth=1.5;fontColor=#1559C7;fontSize=13;align=center;`, 1260, 78, 190, 34));

  // Left upstream lane
  nodes.push(cell('source_lane', '', `${baseBox}fillColor=#FCFDFE;strokeColor=#A9B5C7;strokeWidth=1.4;`, 20, 168, 170, 602));
  nodes.push(cell('source_hdr', '<b>UPSTREAM SOURCES</b><br><span style="font-size:10px">(Upstream / Design)</span>', `${titleText}align=center;fontSize=13;fontColor=#123E7A;fontStyle=1;`, 34, 178, 142, 42));

  const sourceCard = (id: string, title: string, iconText: string, x: number, y: number, fill = '#FFFFFF', stroke = '#AEBACA') => {
    nodes.push(cell(id, `<div style="font-family:Inter,Arial;text-align:center"><div style="font-size:24px">${iconText}</div><div style="font-size:12px;font-weight:800;color:#14213A;margin-top:5px">${esc(title)}</div></div>`, `${baseBox}fillColor=${fill};strokeColor=${stroke};strokeWidth=1.3;align=center;`, x, y, 142, 78));
  };
  sourceCard('src_planning', 'Project Planning', '▣', 34, 228);
  sourceCard('src_erd', 'Dimensional Data Modeling (ERD)', '◉', 34, 316);
  sourceCard('src_data', 'Data Engineering', '◈', 34, 416, '#EDF7FF', '#2D7CCB');
  sourceCard('src_app', 'Application Development', '〈/〉', 34, 510, '#EEFBF3', '#31A45C');
  sourceCard('src_ml', 'MLOps', '⚙', 34, 604, '#F4F0FF', '#7155C5');

  // Central trust boundary and track shells
  nodes.push(cell('secure_boundary', '', `${baseBox}fillColor=#FFFCF7;strokeColor=#F08A00;strokeWidth=1.8;`, 225, 168, 770, 602));
  nodes.push(cell('secure_hdr', '<b>◆ SECURE MANAGED GEMINI ENTERPRISE ECOSYSTEM BOUNDARY (VPC Service Controls)</b>', `${titleText}align=center;fontSize=14;fontColor=#D96B00;fontStyle=1;`, 246, 178, 728, 31));

  const track = (id: string, y: number, h: number, header: string, color: string) => {
    nodes.push(cell(`${id}_shell`, '', `${baseBox}fillColor=#FFFFFF;strokeColor=#B3BFCE;strokeWidth=1.2;`, 240, y, 740, h));
    nodes.push(cell(`${id}_hdr`, `<b>${esc(header)}</b>`, `${titleText}align=center;fontSize=13;fontColor=${color};fontStyle=1;`, 255, y + 7, 710, 28));
  };
  track('data_track', 208, 196, '1  DATA ENGINEERING & DIMENSIONAL MODEL BUILD FLOW (ERD / Informix)', '#0D4EA6');
  track('app_track', 416, 182, '2  APPLICATION DEVELOPMENT & COGNITIVE ARCHITECTURE FLOW (App Code Flow)', '#087D48');
  track('ml_track', 610, 146, '3  ML OPS LIFECYCLE FLOW / AI TRAINING FLOW', '#5C43C2');

  // CI/CD cards
  nodes.push(cell('data_ci', rich('CI – Cloud Build', ['• Automated unit tests on dbt models','• Data quality tests on BigQuery and GCS structures','• Security configuration scan']), `${baseBox}fillColor=#EAF5FF;strokeColor=#2D83D5;strokeWidth=1.4;align=left;`, 255, 246, 315, 142));
  nodes.push(image('data_ci_icon', ICON.googleCloud, 275, 278, 38, 38));
  nodes.push(image('data_bq_icon', ICON.bigquery, 345, 348, 26, 26));
  nodes.push(image('data_storage_icon', ICON.storage, 397, 348, 26, 26));
  nodes.push(image('data_dbt_icon', ICON.dbt, 450, 348, 26, 26));
  nodes.push(cell('data_cd', rich('CD – Terraform / ArgoCD', ['• Terraform / ArgoCD applies updates to BigQuery datasets','• GCS buckets','• dbt scheduler config']), `${baseBox}fillColor=#F2F8FF;strokeColor=#2D83D5;strokeWidth=1.4;align=left;`, 660, 246, 300, 142));
  nodes.push(image('data_tf_icon', ICON.terraform, 677, 286, 40, 40));
  nodes.push(cell('data_vpc', '<b>private VPC</b>', `${baseBox}fillColor=#FFFFFF;strokeColor=#5FA6F0;fontColor=#1D5EB0;fontSize=10;align=center;`, 873, 356, 76, 23));

  nodes.push(cell('app_ci', rich('CI – Cloud Build', ['• Building Docker images','• OpenAPI contract validation','• Security vulnerability dependency scan']), `${baseBox}fillColor=#F0FBF3;strokeColor=#68B26E;strokeWidth=1.4;align=left;`, 255, 450, 315, 135));
  nodes.push(image('app_cloud_icon', ICON.googleCloud, 275, 484, 38, 38));
  nodes.push(image('app_docker_icon', ICON.docker, 345, 548, 28, 28));
  nodes.push(image('app_openapi_icon', ICON.openapi, 405, 548, 28, 28));
  nodes.push(cell('app_shield', '✓', `${baseBox}fillColor=#EFF8FF;strokeColor=#2F69AA;fontColor=#1D5B9F;fontSize=19;fontStyle=1;align=center;`, 465, 548, 28, 28));
  nodes.push(cell('app_cd', rich('CD – Terraform', ['• Terraform applies updates to API gateway config','• GKE service','• Deployment config within private VPC']), `${baseBox}fillColor=#F0FBF3;strokeColor=#68B26E;strokeWidth=1.4;align=left;`, 660, 450, 300, 135));
  nodes.push(image('app_tf_icon', ICON.terraform, 677, 488, 40, 40));
  nodes.push(cell('app_vpc', '<b>private VPC</b>', `${baseBox}fillColor=#FFFFFF;strokeColor=#6BBE83;fontColor=#237742;fontSize=10;align=center;`, 873, 553, 76, 23));

  nodes.push(cell('ml_ci', rich('CI (ML) – Cloud Build', ['• Model training script test','• Validation of hyperparameter configs']), `${baseBox}fillColor=#F7F4FF;strokeColor=#8C72DD;strokeWidth=1.4;align=left;`, 255, 642, 315, 100));
  nodes.push(image('ml_cloud_icon', ICON.googleCloud, 275, 674, 36, 36));
  nodes.push(cell('ml_deploy', rich('Training Loop / Deployment', ['• Push ML training jobs to private Vertex AI','• Training executed on GPU clusters']), `${baseBox}fillColor=#F7F4FF;strokeColor=#8C72DD;strokeWidth=1.4;align=left;`, 660, 642, 300, 100));
  nodes.push(image('ml_vertex_icon', ICON.vertex, 678, 674, 38, 38));
  nodes.push(cell('ml_vpc', '<b>private VPC</b>', `${baseBox}fillColor=#FFFFFF;strokeColor=#8C72DD;fontColor=#5C43C2;fontSize=10;align=center;`, 873, 711, 76, 23));

  // Governance lane
  nodes.push(cell('gov_lane', '', `${baseBox}fillColor=#FFFFFF;strokeColor=#0877C9;strokeWidth=1.8;`, 1020, 160, 182, 610));
  nodes.push(cell('gov_hdr', '<b>◆ MODEL<br>GOVERNANCE</b>', `${titleText}align=center;fontSize=14;fontColor=#123E7A;fontStyle=1;`, 1034, 176, 154, 45));
  nodes.push(cell('eval_gate', smallRich('Evaluation Checkpoint','Policy + quality gate'), `${baseBox}fillColor=#EDFBF1;strokeColor=#4DB06A;strokeWidth=1.2;`, 1037, 238, 148, 62));
  nodes.push(cell('approved_gate', '<b>✓ Approved</b>', `${baseBox}fillColor=#EAF9EF;strokeColor=#4DB06A;strokeWidth=1.2;fontColor=#176F38;fontSize=12;align=center;`, 1037, 316, 148, 46));
  nodes.push(cell('registry_log', rich('Registry / Conversation Log', ['• Updates after each CI/CD cycle']), `${baseBox}fillColor=#FFFFFF;strokeColor=#8396AE;strokeWidth=1.2;dashed=1;dashPattern=4 3;align=left;`, 1032, 382, 158, 93));
  nodes.push(cell('offline_eval', rich('Offline Evaluation', ['• F1 score / bias tests','• Hallucination metrics for LLM prompts']), `${baseBox}fillColor=#FFFFFF;strokeColor=#A7B3C3;strokeWidth=1.1;align=left;`, 1032, 484, 158, 106));
  nodes.push(cell('promotion', rich('Promotion (Post-Approval)', ['• Promote artifacts / models to production registry']), `${baseBox}fillColor=#EDFBF1;strokeColor=#4DB06A;strokeWidth=1.2;align=left;`, 1032, 650, 158, 94));

  // Deployment toolchain
  nodes.push(cell('deploy_boundary', '', `${baseBox}fillColor=#FFFCF7;strokeColor=#F08A00;strokeWidth=1.7;dashed=1;dashPattern=7 4;`, 1225, 168, 242, 447));
  nodes.push(cell('deploy_hdr', '<b>VPC-SC</b><br><span style="font-size:13px">DEPLOYMENT TOOLCHAIN</span>', `${titleText}align=center;fontSize=15;fontColor=#E66D00;fontStyle=1;`, 1245, 180, 202, 48));
  nodes.push(cell('cloud_deploy', smallRich('Cloud Deploy','Approved CD'), `${baseBox}fillColor=#EEF7FF;strokeColor=#4B96E5;strokeWidth=1.3;`, 1242, 242, 208, 96));
  nodes.push(image('cloud_deploy_icon', ICON.googleCloud, 1260, 266, 40, 40));
  nodes.push(cell('gke_rollout', smallRich('GKE Rollout','Canary Deployment'), `${baseBox}fillColor=#EEF7FF;strokeColor=#4B96E5;strokeWidth=1.3;`, 1242, 370, 208, 96));
  nodes.push(image('gke_icon', ICON.gke, 1260, 397, 40, 40));
  nodes.push(cell('binary_auth', smallRich('Binary Authorization','Policy Enforced'), `${baseBox}fillColor=#EEF7FF;strokeColor=#4B96E5;strokeWidth=1.3;`, 1242, 498, 208, 96));
  nodes.push(cell('binary_icon', '◈✓', `${baseBox}fillColor=#F2F9FF;strokeColor=#3171B8;fontColor=#0E5597;fontSize=20;fontStyle=1;align=center;`, 1260, 524, 40, 40));
  nodes.push(cell('observe', rich('Continuous Observation & Alerting', ['• Monitoring / GCP Cloud Logging','• Prompt injection attack signals','• Application health']), `${baseBox}fillColor=#ECFBF1;strokeColor=#17944B;strokeWidth=1.4;align=left;`, 1225, 638, 242, 132));
  nodes.push(cell('bell', '●', `${baseBox}fillColor=#159147;strokeColor=#159147;fontColor=#FFFFFF;fontSize=20;align=center;`, 1243, 660, 31, 31));

  // Flow arrows: sources -> tracks -> governance -> deployment
  edges.push(edge('e_plan_data', 'src_planning', 'data_ci', '', '#111827', false, 2));
  edges.push(edge('e_erd_data', 'src_erd', 'data_ci', '', '#111827', false, 2));
  edges.push(edge('e_data_in', 'src_data', 'data_ci', '', '#1671C7', false, 3));
  edges.push(edge('e_app_in', 'src_app', 'app_ci', '', '#13934F', false, 3));
  edges.push(edge('e_ml_in', 'src_ml', 'ml_ci', '', '#6848D5', false, 3));
  edges.push(edge('e_data_ci_cd', 'data_ci', 'data_cd', 'CI Passed · Trigger', '#111827', false, 2));
  edges.push(edge('e_app_ci_cd', 'app_ci', 'app_cd', 'CI Passed · Trigger', '#111827', false, 2));
  edges.push(edge('e_ml_ci_cd', 'ml_ci', 'ml_deploy', 'CI Passed · Trigger', '#111827', false, 2));
  edges.push(edge('e_data_gov', 'data_cd', 'eval_gate', 'Evaluate', '#111827', false, 2));
  edges.push(edge('e_app_gov', 'app_cd', 'eval_gate', 'Evaluate', '#111827', false, 2));
  edges.push(edge('e_ml_gov', 'ml_deploy', 'eval_gate', 'Evaluate', '#111827', false, 2));
  edges.push(edge('e_eval_approved', 'eval_gate', 'approved_gate', '', '#24354D', false, 2));
  edges.push(edge('e_approved_log', 'approved_gate', 'registry_log', '', '#24354D', false, 2));
  edges.push(edge('e_log_eval', 'registry_log', 'offline_eval', '', '#24354D', true, 2));
  edges.push(edge('e_eval_promo', 'offline_eval', 'promotion', '', '#24354D', false, 2));
  edges.push(edge('e_promo_deploy', 'promotion', 'cloud_deploy', 'Approved artifact / model', '#111827', false, 2));
  edges.push(edge('e_deploy_gke', 'cloud_deploy', 'gke_rollout', '', '#111827', false, 2));
  edges.push(edge('e_gke_binary', 'gke_rollout', 'binary_auth', '', '#111827', false, 2));
  edges.push(edge('e_binary_obs', 'binary_auth', 'observe', '', '#111827', false, 2));

  // Legend and key services
  nodes.push(cell('legend_shell', '', `${baseBox}fillColor=#FFFFFF;strokeColor=#B5C0D0;strokeWidth=1.2;`, 20, 792, 1447, 158));
  nodes.push(cell('legend_title', '<b>LEGEND</b>', `${titleText}fontSize=13;fontColor=#123E7A;fontStyle=1;`, 38, 806, 120, 22));
  nodes.push(cell('legend_flow', '■  Data Engineering Flow&nbsp;&nbsp;&nbsp;&nbsp; ■  Application Flow&nbsp;&nbsp;&nbsp;&nbsp; ■  ML / AI Flow<br><br>▣  CI (Continuous Integration)&nbsp;&nbsp;&nbsp;&nbsp; ▣  CD (Continuous Deployment)&nbsp;&nbsp;&nbsp;&nbsp; ▣  Trust Boundary (VPC-SC)', `${titleText}fontSize=11;fontColor=#344258;`, 38, 832, 440, 91));
  nodes.push(cell('legend_arrows', '→  Control Flow (Process / Trigger)<br><br>⇢  Artifact Flow (Images / Models / Data)<br><br>····  Policy / Governance Boundary', `${titleText}fontSize=11;fontColor=#233048;`, 500, 820, 275, 105));
  nodes.push(cell('key_hdr', '<b>KEY SERVICES</b>', `${titleText}fontSize=13;fontColor=#123E7A;fontStyle=1;`, 805, 806, 150, 22));
  const keyServices = [
    ['ks_cloud','Cloud Build',ICON.googleCloud],['ks_artifact','Artifact Registry',ICON.googleCloud],['ks_tf','Terraform',ICON.terraform],['ks_argo','Argo CD',ICON.argo],
    ['ks_bq','BigQuery',ICON.bigquery],['ks_storage','Cloud Storage',ICON.storage],['ks_gke','GKE',ICON.gke],['ks_vertex','Vertex AI',ICON.vertex],
  ] as const;
  keyServices.forEach(([id, label, url], i) => {
    const x = 800 + i * 80;
    nodes.push(image(`${id}_i`, url, x + 18, 842, 38, 38));
    nodes.push(cell(`${id}_t`, `<b>${esc(label)}</b>`, `${titleText}align=center;fontSize=10;fontColor=#18263E;fontStyle=1;`, x, 885, 75, 36));
  });

  // Why it works footer
  nodes.push(cell('why_badge', '<b>WHY IT WORKS</b>', `${baseBox}fillColor=#0A2D66;strokeColor=#0A2D66;fontColor=#FFFFFF;fontSize=13;align=center;`, 20, 966, 150, 40));
  nodes.push(cell('why_text', 'This unified pipeline enables secure, scalable, and governable delivery of data, application, and ML workloads with policy-enforced VPC boundaries, automated quality and security gates, and continuous deployment to GKE with end-to-end observability and compliance.', `${titleText}fontSize=12;fontColor=#263349;`, 190, 960, 1260, 55));

  return `<mxfile host="embed.diagrams.net" modified="2026-08-20T00:00:00.000Z" agent="PromptCanvas" version="24.7.17">
  <diagram id="devops_cicd_pipeline_approved" name="Enterprise DevSecOps Polyrepo CI/CD Pipeline Flow">
    <mxGraphModel dx="1491" dy="1055" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1491" pageHeight="1055" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${nodes.join('\n        ')}
        ${edges.join('\n        ')}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
