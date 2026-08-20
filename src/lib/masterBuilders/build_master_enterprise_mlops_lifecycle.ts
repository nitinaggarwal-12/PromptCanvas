/**
 * 🎨 Blueprint #57 (NEW-AI-07): Enterprise MLOps Lifecycle Architecture
 * Executive Light Theme Master Blueprint
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
  vertex: svg('<rect x="6" y="6" width="36" height="36" rx="8" fill="#2563EB"/><path d="m24 12 10 20-4 2-6-12-6 12-4-2z" fill="#fff"/>'),
  kubeflow: svg('<circle cx="24" cy="24" r="16" fill="none" stroke="#2563EB" stroke-width="3"/><circle cx="24" cy="12" r="4" fill="#2563EB"/><circle cx="14" cy="30" r="4" fill="#2563EB"/><circle cx="34" cy="30" r="4" fill="#2563EB"/>'),
  build: svg('<rect x="8" y="8" width="32" height="32" rx="6" fill="#1D4ED8"/><path d="M14 24l7 7 13-13" fill="none" stroke="#fff" stroke-width="3.5"/>'),
  chip: svg('<rect x="10" y="10" width="28" height="28" rx="4" fill="#EA580C"/><circle cx="24" cy="24" r="6" fill="#fff"/>'),
  shield: svg('<path d="M24 4 40 10v12c0 11-6.5 18-16 22C14.5 40 8 33 8 22V10z" fill="#059669"/><path d="m16 24 5 5 11-13" fill="none" stroke="#fff" stroke-width="3"/>'),
  monitor: svg('<rect x="6" y="8" width="36" height="26" rx="3" fill="#059669"/><path d="m11 28 7-7 5 4 8-11 6 6" fill="none" stroke="#fff" stroke-width="2.5"/><path d="M18 40h12M24 34v6" stroke="#059669" stroke-width="3"/>'),
  eventarc: svg('<circle cx="24" cy="24" r="16" fill="none" stroke="#7C3AED" stroke-width="3"/><path d="M24 12v12l8 8" stroke="#7C3AED" stroke-width="3"/>'),
  log: svg('<rect x="10" y="6" width="28" height="36" rx="3" fill="#059669"/><path d="M16 15h16M16 23h16M16 31h10" stroke="#fff" stroke-width="2.5"/>'),
};

const cell = (id: string, value: string, style: string, x: number, y: number, width: number, height: number): string =>
  `<mxCell id="${id}" value="${esc(value)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${width}" height="${height}" as="geometry"/></mxCell>`;

const lane = (id: string, number: number, title: string, subtitle: string, x: number, y: number, width: number, height: number, accent: string, fill: string): string =>
  [
    cell(id, '', `rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=#CBD5E1;strokeWidth=1.5;shadow=1;`, x, y, width, height),
    cell(`${id}_number`, String(number), `ellipse;whiteSpace=wrap;html=1;fillColor=${accent};strokeColor=${accent};fontColor=#FFFFFF;fontStyle=1;fontSize=13;align=center;verticalAlign=middle;`, x + 12, y + 12, 32, 32),
    cell(`${id}_title`, `<b>${title}</b><br><span style="font-size:10px;color:#64748B">${subtitle}</span>`, `text;html=1;whiteSpace=wrap;align=left;verticalAlign=middle;fontColor=${accent};fontSize=14;fontStyle=1;`, x + 54, y + 7, width - 64, 44),
  ].join('\n');

const card = (id: string, title: string, subtitle: string, icon: string, x: number, y: number, width: number, height: number, accent: string, fill = '#FFFFFF'): string => {
  const html = `<table style="width:100%;height:100%;border-collapse:collapse"><tr><td style="width:42px;text-align:center;vertical-align:middle"><img src="${icon}" width="30" height="30"/></td><td style="text-align:left;vertical-align:middle"><b style="font-size:11.5px;color:#0F172A">${title}</b><br/><span style="font-size:9.5px;color:#475569">${subtitle}</span></td></tr></table>`;
  return cell(id, html, `rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${accent};strokeWidth=1.3;align=center;verticalAlign=middle;spacing=4;`, x, y, width, height);
};

const edge = (id: string, source: string, target: string, label: string, kind: 'request' | 'response' | 'governance', exitX = 1, exitY = 0.5, entryX = 0, entryY = 0.5, points: Array<[number, number]> = []): string => {
  const cfg = kind === 'request'
    ? { stroke: '#2563EB', dashed: 0, pattern: '6 4', arrow: 'block', width: 2 }
    : kind === 'response'
      ? { stroke: '#64748B', dashed: 1, pattern: '6 4', arrow: 'block', width: 1.7 }
      : { stroke: '#059669', dashed: 1, pattern: '2 4', arrow: 'open', width: 1.6 };
  const pts = points.length ? `<Array as="points">${points.map(([x, y]) => `<mxPoint x="${x}" y="${y}"/>`).join('')}</Array>` : '';
  return `<mxCell id="${id}" value="${esc(label)}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${cfg.stroke};strokeWidth=${cfg.width};dashed=${cfg.dashed};dashPattern=${cfg.pattern};endArrow=${cfg.arrow};endFill=${cfg.arrow === 'block' ? 1 : 0};fontColor=#0F172A;fontSize=10;fontStyle=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;exitX=${exitX};exitY=${exitY};exitDx=0;exitDy=0;entryX=${entryX};entryY=${entryY};entryDx=0;entryDy=0;" edge="1" parent="1" source="${source}" target="${target}"><mxGeometry relative="1" as="geometry">${pts}</mxGeometry></mxCell>`;
};

export function buildMasterEnterpriseMlopsLifecycleXml(): string {
  const cells: string[] = [
    '<mxCell id="0"/>',
    '<mxCell id="1" parent="0"/>',

    // Lane 1: Data Ingestion & Feature Engineering
    lane('features', 1, 'FEATURE STORE & DATA FOUNDATION TIER', 'Managed offline/online feature store with time-travel joins', 20, 20, 1540, 140, '#1E3A8A', '#FFFFFF'),
    card('fea_bq', 'BigQuery Enterprise Lakehouse', 'Batch feature extraction with automated SQL data quality checks', ICON.bq, 45, 75, 450, 70, '#1D4ED8'),
    card('fea_store', 'Vertex AI Feature Store (Online & Offline)', 'Sub-10ms online low-latency lookup with Bigtable / Cloud BigQuery backend', ICON.vertex, 525, 75, 520, 70, '#2563EB'),
    card('fea_pit', 'Point-in-Time Accurate Retrieval', 'Zero-data-leakage historical training set generation', ICON.shield, 1075, 75, 460, 70, '#059669'),

    // Lane 2: CI/CD/CT Training & Experimentation
    lane('training', 2, 'CI / CD / CT TRAINING & EXPERIMENTATION PIPELINES', 'Declarative Kubeflow pipelines with hardware accelerator orchestration', 20, 180, 1540, 150, '#4C1D95', '#FFFFFF'),
    card('trn_build', 'Cloud Build CI/CD Trigger', 'Automated pipeline compilation upon git commit to main branch', ICON.build, 45, 235, 450, 75, '#1D4ED8'),
    card('trn_kfp', 'Vertex AI Pipelines (Kubeflow)', 'Orchestrated reusable components (Data prep -> Train -> Eval)', ICON.kubeflow, 525, 235, 450, 75, '#2563EB'),
    card('trn_tpu', 'GPU/TPU Training Accelerators', 'Distributed data-parallel training on NVIDIA H100 / TPU v5e', ICON.chip, 1005, 235, 530, 75, '#EA580C'),

    // Lane 3: Model Governance & Champion/Challenger Evaluation
    lane('governance', 3, 'MODEL GOVERNANCE & EVALUATION GATES', 'Automated model card generation, bias checks and version lineage', 20, 350, 1540, 150, '#047857', '#FFFFFF'),
    card('gov_eval', 'Vertex AI Model Evaluation', 'Automated ROC-AUC, F1-score & fairness metrics calculation', ICON.monitor, 45, 405, 450, 75, '#059669'),
    card('gov_reg', 'Vertex AI Model Registry', 'Model versioning, approval statuses & deployment aliases', ICON.vertex, 525, 405, 450, 75, '#2563EB'),
    card('gov_gate', 'Champion / Challenger Gate', 'Strict threshold: New model accuracy >= Champion baseline', ICON.shield, 1005, 405, 530, 75, '#D97706'),

    // Lane 4: Deployment & Production Inference Tier
    lane('serving', 4, 'PRODUCTION SERVING & DEPLOYMENT TIER', 'High-throughput autoscaling prediction endpoints with canary rollout', 20, 520, 1540, 150, '#1D4ED8', '#FFFFFF'),
    card('srv_online', 'Vertex AI Online Prediction Endpoint', 'Autoscaling endpoint behind Private Service Connect', ICON.vertex, 45, 575, 450, 75, '#2563EB'),
    card('srv_canary', '90 / 10 Canary Traffic Splitting', 'Gradual live production verification before 100% cutover', ICON.monitor, 525, 575, 450, 75, '#2563EB'),
    card('srv_batch', 'Vertex AI Batch Prediction', 'High-throughput parallel scoring for nightly downstream jobs', ICON.bq, 1005, 575, 530, 75, '#1D4ED8'),

    // Lane 5: Runtime Monitoring & Automated Retraining Loop
    lane('monitoring', 5, 'CONTINUOUS MODEL MONITORING & CT RETRAINING LOOP', 'Real-time drift detection triggering automated pipeline retraining', 20, 690, 1540, 140, '#D97706', '#FFFFFF'),
    card('mon_drift', 'Vertex AI Model Monitoring', 'Continuous Kolmogorov-Smirnov test for feature skew & drift', ICON.monitor, 45, 745, 460, 70, '#059669'),
    card('mon_alert', 'Cloud Monitoring & Alerting', 'Triggers P1 incident alert if prediction accuracy drops < 95%', ICON.log, 545, 745, 450, 70, '#EA580C'),
    card('mon_eventarc', 'Eventarc Automated Retraining Trigger', 'Pub/Sub event kickstarts Vertex AI Training Pipeline automatically', ICON.eventarc, 1035, 745, 500, 70, '#7C3AED'),

    // Edges
    edge('e_bq_fea', 'fea_bq', 'fea_store', 'Batch Feature Ingest', 'request'),
    edge('e_fea_pit', 'fea_store', 'fea_pit', 'Point-in-Time Join', 'request'),
    edge('e_build_kfp', 'trn_build', 'trn_kfp', 'Trigger Training DAG', 'request'),
    edge('e_kfp_tpu', 'trn_kfp', 'trn_tpu', 'Allocate Compute', 'request'),
    edge('e_tpu_eval', 'trn_tpu', 'gov_eval', 'Trained Artifact', 'request'),
    edge('e_eval_reg', 'gov_eval', 'gov_reg', 'Register Model', 'request'),
    edge('e_reg_gate', 'gov_reg', 'gov_gate', 'Evaluate Against Baseline', 'governance'),
    edge('e_gate_srv', 'gov_gate', 'srv_online', 'Deploy Approved Model', 'request'),
    edge('e_srv_canary', 'srv_online', 'srv_canary', 'Route 10% Canary', 'request'),
    edge('e_srv_mon', 'srv_online', 'mon_drift', 'Continuous Payload Logging', 'governance'),
    edge('e_drift_alert', 'mon_drift', 'mon_alert', 'Skew Detected (>0.05)', 'governance'),
    edge('e_alert_event', 'mon_alert', 'mon_eventarc', 'Trigger CT', 'governance'),
    edge('e_event_kfp', 'mon_eventarc', 'trn_kfp', 'Automated Retrain Loop', 'governance', 0.5, 0, 0.5, 1, [[1285, 680], [750, 680], [750, 315]]),
  ];

  return `<mxfile host="app.diagrams.net" modified="2026-08-21T00:35:00.000Z" agent="PromptCanvas Blueprint 57" version="24.7.17" type="device">
  <diagram id="catalog_enterprise_mlops_lifecycle" name="Enterprise MLOps Lifecycle Architecture">
    <mxGraphModel dx="1600" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="950" background="#F8FAFC">
      <root>
        ${cells.join('\n        ')}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}

export const MASTER_ENTERPRISE_MLOPS_LIFECYCLE_XML = buildMasterEnterpriseMlopsLifecycleXml();
