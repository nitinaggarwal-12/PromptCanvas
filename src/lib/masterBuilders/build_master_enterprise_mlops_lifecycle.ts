/**
 * 🎨 Blueprint #57 (NEW-AI-07): Enterprise MLOps Lifecycle Architecture
 * High-Craft Master Blueprint (Benchmark Pattern following Blueprint 50)
 * 
 * Featuring:
 * - Data Ingestion & Feature Engineering (Vertex AI Feature Store, BigQuery Lakehouse, Point-in-time retrieval)
 * - CI/CD/CT Training & Experimentation (Vertex AI Pipelines Kubeflow, Cloud Build, GPU/TPU, Vertex TensorBoard)
 * - Model Governance & Evaluation (Vertex AI Model Registry, Model Evaluation, Champion/Challenger Gate)
 * - Deployment & Production Inference (Vertex AI Online Endpoints, 90/10 Canary traffic splitting, Cloud Armor)
 * - Runtime Monitoring & Automated Retraining Loop (Vertex AI Model Monitoring, Cloud Monitoring, Eventarc)
 */

const esc = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const svg = (body: string): string =>
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">${body}</svg>`)}`;

const ICON = {
  bq: svg('<ellipse cx="24" cy="12" rx="14" ry="6" fill="#1D4ED8"/><path d="M10 12v18c0 3.3 6.3 6 14 6s14-2.7 14-6V12" fill="#93C5FD"/><ellipse cx="24" cy="30" rx="14" ry="6" fill="#1D4ED8"/>'),
  vertex: svg('<rect x="6" y="6" width="36" height="36" rx="8" fill="#0284C7"/><path d="m24 12 10 20-4 2-6-12-6 12-4-2z" fill="#fff"/>'),
  kubeflow: svg('<circle cx="24" cy="24" r="16" fill="none" stroke="#0284C7" stroke-width="3"/><circle cx="24" cy="12" r="4" fill="#0284C7"/><circle cx="14" cy="30" r="4" fill="#0284C7"/><circle cx="34" cy="30" r="4" fill="#0284C7"/>'),
  build: svg('<rect x="8" y="8" width="32" height="32" rx="6" fill="#1D4ED8"/><path d="M14 24l7 7 13-13" fill="none" stroke="#fff" stroke-width="3.5"/>'),
  chip: svg('<rect x="10" y="10" width="28" height="28" rx="4" fill="#EA580C"/><circle cx="24" cy="24" r="6" fill="#fff"/>'),
  shield: svg('<path d="M24 4 40 10v12c0 11-6.5 18-16 22C14.5 40 8 33 8 22V10z" fill="#16A34A"/><path d="m16 24 5 5 11-13" fill="none" stroke="#fff" stroke-width="3"/>'),
  monitor: svg('<rect x="6" y="8" width="36" height="26" rx="3" fill="#16A34A"/><path d="m11 28 7-7 5 4 8-11 6 6" fill="none" stroke="#fff" stroke-width="2.5"/><path d="M18 40h12M24 34v6" stroke="#16A34A" stroke-width="3"/>'),
  eventarc: svg('<circle cx="24" cy="24" r="16" fill="none" stroke="#9333EA" stroke-width="3"/><path d="M24 12v12l8 8" stroke="#9333EA" stroke-width="3"/>'),
  log: svg('<rect x="10" y="6" width="28" height="36" rx="3" fill="#16A34A"/><path d="M16 15h16M16 23h16M16 31h10" stroke="#fff" stroke-width="2.5"/>'),
};

const cell = (id: string, value: string, style: string, x: number, y: number, width: number, height: number): string =>
  `<mxCell id="${id}" value="${esc(value)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${width}" height="${height}" as="geometry"/></mxCell>`;

const lane = (id: string, number: number, title: string, subtitle: string, x: number, y: number, width: number, height: number, accent: string, fill: string): string =>
  [
    cell(id, '', `rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${accent};strokeWidth=1.5;shadow=0;`, x, y, width, height),
    cell(`${id}_number`, String(number), `ellipse;whiteSpace=wrap;html=1;fillColor=${accent};strokeColor=${accent};fontColor=#FFFFFF;fontStyle=1;fontSize=13;align=center;verticalAlign=middle;`, x + 12, y + 12, 32, 32),
    cell(`${id}_title`, `<b>${title}</b><br><span style="font-size:10px;color:#64748B">${subtitle}</span>`, `text;html=1;whiteSpace=wrap;align=left;verticalAlign=middle;fontColor=${accent};fontSize=15;`, x + 54, y + 7, width - 64, 44),
  ].join('\n');

const card = (id: string, title: string, subtitle: string, icon: string, x: number, y: number, width: number, height: number, accent: string, fill = '#FFFFFF'): string => {
  const html = `<table style="width:100%;height:100%;border-collapse:collapse"><tr><td style="width:42px;text-align:center;vertical-align:middle"><img src="${icon}" width="30" height="30"/></td><td style="text-align:left;vertical-align:middle"><b style="font-size:12px;color:#0F172A">${title}</b><br/><span style="font-size:10px;color:#475569">${subtitle}</span></td></tr></table>`;
  return cell(id, html, `rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${accent};strokeWidth=1.1;align=center;verticalAlign=middle;spacing=4;`, x, y, width, height);
};

const edge = (id: string, source: string, target: string, label: string, kind: 'request' | 'response' | 'governance', exitX = 1, exitY = 0.5, entryX = 0, entryY = 0.5, points: Array<[number, number]> = []): string => {
  const cfg = kind === 'request'
    ? { stroke: '#0284C7', dashed: 0, pattern: '6 4', arrow: 'block', width: 2 }
    : kind === 'response'
      ? { stroke: '#64748B', dashed: 1, pattern: '6 4', arrow: 'block', width: 1.7 }
      : { stroke: '#16A34A', dashed: 1, pattern: '2 4', arrow: 'open', width: 1.6 };
  const pts = points.length ? `<Array as="points">${points.map(([x, y]) => `<mxPoint x="${x}" y="${y}"/>`).join('')}</Array>` : '';
  return `<mxCell id="${id}" value="${esc(label)}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${cfg.stroke};strokeWidth=${cfg.width};dashed=${cfg.dashed};dashPattern=${cfg.pattern};endArrow=${cfg.arrow};endFill=${cfg.arrow === 'block' ? 1 : 0};fontColor=#0F172A;fontSize=10;fontStyle=1;labelBackgroundColor=#FFFFFF;labelBorderColor=none;exitX=${exitX};exitY=${exitY};exitDx=0;exitDy=0;entryX=${entryX};entryY=${entryY};entryDx=0;entryDy=0;" edge="1" parent="1" source="${source}" target="${target}"><mxGeometry relative="1" as="geometry">${pts}</mxGeometry></mxCell>`;
};

export function buildMasterEnterpriseMlopsLifecycleXml(): string {
  const cells: string[] = [
    '<mxCell id="0"/>',
    '<mxCell id="1" parent="0"/>',

    // Lane 1: Feature Engineering & Ingestion
    lane('data', 1, 'FEATURE STORE & DATA INGESTION', 'Point-in-time feature extraction and BigQuery feature store sync', 20, 20, 270, 680, '#0284C7', '#F0F9FF'),
    card('dt_bq', 'BigQuery Lakehouse', 'Silver/Gold curated analytical training sets', ICON.bq, 38, 85, 234, 90, '#1D4ED8'),
    card('dt_store', 'Vertex AI Feature Store', 'Online low-latency & offline batch feature retrieval', ICON.vertex, 38, 205, 234, 95, '#0284C7'),
    card('dt_point', 'Point-in-Time Correctness', 'Time-travel joins to prevent data leakage', ICON.bq, 38, 330, 234, 85, '#0284C7'),

    // Lane 2: CI/CD/CT Training & Experimentation
    lane('training', 2, 'TRAINING & EXPERIMENTATION', 'Vertex AI Pipelines, Kubeflow orchestration & hardware accelerators', 310, 20, 310, 680, '#EA580C', '#FFFBEB'),
    card('tr_build', 'Cloud Build CI/CD', 'Automated container build on git push / data change', ICON.build, 328, 85, 274, 85, '#1D4ED8'),
    card('tr_pipe', 'Vertex AI Pipelines (Kubeflow)', 'Reproducible DAG execution & artifact lineage', ICON.kubeflow, 328, 195, 274, 90, '#EA580C'),
    card('tr_hparam', 'Hyperparameter Tuning', 'Vizier black-box optimization algorithms', ICON.vertex, 328, 305, 274, 85, '#EA580C'),
    card('tr_gpu', 'GPU / TPU Accelerators', 'NVIDIA H100 / TPU v5p distributed clusters', ICON.chip, 328, 410, 274, 85, '#EA580C'),
    card('tr_board', 'Vertex TensorBoard', 'Live loss curves, weights & metrics tracking', ICON.monitor, 328, 515, 274, 85, '#EA580C'),

    // Lane 3: Model Governance & Evaluation Gate
    lane('gov_gate', 3, 'MODEL GOVERNANCE & EVALUATION', 'Model Registry versioning, Explainable AI & Champion/Challenger gate', 640, 20, 300, 680, '#9333EA', '#FAF5FF'),
    card('gv_registry', 'Vertex AI Model Registry', 'Centralized model metadata, schema & version tags', ICON.vertex, 658, 85, 264, 90, '#9333EA'),
    card('gv_eval', 'Model Evaluation & Explainability', 'Fairlearn fairness checks & Shapley feature attributions', ICON.shield, 658, 205, 264, 95, '#16A34A'),
    card('gv_champ', 'Champion vs Challenger Gate', 'Automated validation against production benchmark SLA', ICON.shield, 658, 330, 264, 95, '#16A34A'),

    // Lane 4: Deployment & Production Inference
    lane('deploy', 4, 'DEPLOYMENT & INFERENCE TIER', 'Vertex Online Prediction with 90/10 Canary traffic splitting', 960, 20, 300, 680, '#1D4ED8', '#EFF6FF'),
    card('dp_endpoint', 'Vertex AI Online Endpoints', 'Managed auto-scaling prediction cluster (p99 < 20ms)', ICON.vertex, 978, 85, 264, 90, '#1D4ED8'),
    card('dp_canary', 'Canary Traffic Splitting', '90% Champion / 10% Challenger traffic rollout', ICON.monitor, 978, 205, 264, 95, '#1D4ED8'),
    card('dp_payload', 'Payload Logging Sink', '100% request/response inference capture to BigQuery', ICON.log, 978, 330, 264, 95, '#16A34A'),

    // Lane 5: Monitoring & Retraining Loop
    lane('monitor_loop', 5, 'DRIFT MONITORING & CT LOOP', 'Continuous concept drift detection & Eventarc pipeline re-trigger', 1280, 20, 280, 680, '#16A34A', '#F0FDF4'),
    card('mon_drift', 'Vertex Model Monitoring', 'Real-time feature skew & prediction drift detection', ICON.monitor, 1298, 85, 244, 90, '#16A34A'),
    card('mon_alert', 'Cloud Monitoring Alert', 'Threshold breach alert on PSI > 0.2 drift score', ICON.monitor, 1298, 205, 244, 90, '#EA580C'),
    card('mon_eventarc', 'Eventarc Trigger', 'Automated invocation of retraining pipeline DAG', ICON.eventarc, 1298, 330, 244, 95, '#9333EA'),

    // Governance & Security Band
    lane('security_band', 0, 'CROSS-CUTTING ML SECURITY, CMEK & ARTIFACT LINEAGE PLANE', 'Full provenance tracking with Cloud KMS encryption & Artifact Registry', 20, 720, 1540, 190, '#16A34A', '#F0FDF4'),
    card('sb_artifact', 'Artifact Registry (Docker / OCI)', 'Immutable container images for training & serving', ICON.build, 45, 785, 470, 95, '#1D4ED8'),
    card('sb_kms', 'Cloud KMS (CMEK Encryption)', 'Customer-managed encryption for models & feature stores', ICON.shield, 545, 785, 470, 95, '#16A34A'),
    card('sb_audit', 'Cloud Audit Logs & Lineage', 'Complete audit trail from training dataset to model inference', ICON.log, 1045, 785, 490, 95, '#16A34A'),

    // Edges
    edge('e_bq_store', 'dt_bq', 'dt_store', 'Sync Features', 'request', 0.5, 1, 0.5, 0),
    edge('e_store_pipe', 'dt_store', 'tr_pipe', 'Fetch Training Batch', 'request'),
    edge('e_build_pipe', 'tr_build', 'tr_pipe', 'Trigger DAG', 'request', 0.5, 1, 0.5, 0),
    edge('e_pipe_hparam', 'tr_pipe', 'tr_hparam', 'HParam Search', 'request', 0.5, 1, 0.5, 0),
    edge('e_hparam_gpu', 'tr_hparam', 'tr_gpu', 'Train on TPU/GPU', 'request', 0.5, 1, 0.5, 0),
    edge('e_gpu_reg', 'tr_gpu', 'gv_registry', 'Register Model', 'request'),
    edge('e_reg_eval', 'gv_registry', 'gv_eval', 'Validate Quality', 'request', 0.5, 1, 0.5, 0),
    edge('e_eval_champ', 'gv_eval', 'gv_champ', 'Pass Benchmark', 'request', 0.5, 1, 0.5, 0),
    edge('e_champ_dp', 'gv_champ', 'dp_endpoint', 'Deploy to Endpoint', 'request'),
    edge('e_dp_canary', 'dp_endpoint', 'dp_canary', 'Route 10% Canary', 'request', 0.5, 1, 0.5, 0),
    edge('e_canary_pay', 'dp_canary', 'dp_payload', 'Log Inference', 'request', 0.5, 1, 0.5, 0),
    edge('e_pay_mon', 'dp_payload', 'mon_drift', 'Stream Real-Time Data', 'request'),
    edge('e_drift_alert', 'mon_drift', 'mon_alert', 'Drift Detected', 'response', 0.5, 1, 0.5, 0),
    edge('e_alert_event', 'mon_alert', 'mon_eventarc', 'Trigger Event', 'response', 0.5, 1, 0.5, 0),
    edge('e_event_pipe', 'mon_eventarc', 'tr_pipe', 'Automated Continuous Retraining (CT)', 'governance', 0.5, 0, 0.5, 0, [[1402, 60], [465, 60]]),
  ];

  return `<mxfile host="embed.diagrams.net" modified="2026-08-20T22:00:00.000Z" agent="PromptCanvas" version="24.0.0" type="embed">
  <diagram id="catalog_enterprise_mlops_lifecycle" name="Enterprise MLOps Lifecycle &amp; Continuous Training">
    <mxGraphModel dx="1600" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="950" background="#FFFFFF">
      <root>
        ${cells.join('\n        ')}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}

export const MASTER_ENTERPRISE_MLOPS_LIFECYCLE_XML = buildMasterEnterpriseMlopsLifecycleXml();
