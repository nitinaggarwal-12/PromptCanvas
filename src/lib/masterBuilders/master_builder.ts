/**
 * Blueprint 37 — Multi-Region Active-Passive Disaster Recovery
 *
 * Phase 3.1B rebuild.
 * - One explicit active region and one passive/warm DR region.
 * - Cross-region data replication is asynchronous where the selected service uses async DR.
 * - Failover is a governed operational decision, not an invented universal "instant auto-failover".
 * - RTO/RPO values are workload-defined targets, never platform guarantees.
 * - Editable semantic mxGraph cells; no emoji or external icon dependencies.
 */

const esc = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const v = (
  id: string,
  value: string,
  style: string,
  x: number,
  y: number,
  width: number,
  height: number,
): string =>
  `<mxCell id="${id}" value="${esc(value)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${width}" height="${height}" as="geometry"/></mxCell>`;

const card = (
  id: string,
  code: string,
  title: string,
  subtitle: string,
  x: number,
  y: number,
  width: number,
  height: number,
  accent: string,
  fill = '#FFFFFF',
): string =>
  [
    v(
      `${id}_bg`,
      '',
      `rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${accent};strokeWidth=1.2;shadow=0;`,
      x,
      y,
      width,
      height,
    ),
    v(
      `${id}_badge`,
      code,
      `ellipse;whiteSpace=wrap;html=1;fillColor=${accent};strokeColor=${accent};fontColor=#FFFFFF;fontStyle=1;fontSize=${code.length > 3 ? 8 : 10};align=center;verticalAlign=middle;`,
      x + 10,
      y + Math.max(8, (height - 30) / 2),
      30,
      30,
    ),
    v(
      `${id}_label`,
      `<b>${title}</b><br><span style="font-size:10px;color:#475569">${subtitle}</span>`,
      'text;html=1;whiteSpace=wrap;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=12;spacingLeft=3;',
      x + 48,
      y + 4,
      width - 56,
      height - 8,
    ),
  ].join('\n');

const section = (
  id: string,
  title: string,
  x: number,
  y: number,
  width: number,
  height: number,
  stroke: string,
  fill: string,
): string =>
  [
    v(
      `${id}_bg`,
      '',
      `rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${stroke};strokeWidth=1.5;shadow=0;`,
      x,
      y,
      width,
      height,
    ),
    v(
      `${id}_title`,
      title,
      `rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=none;fontColor=${stroke};fontStyle=1;fontSize=15;align=center;verticalAlign=middle;`,
      x + 8,
      y + 8,
      width - 16,
      34,
    ),
  ].join('\n');

const e = (
  id: string,
  source: string,
  target: string,
  label: string,
  kind: 'normal' | 'replication' | 'failover',
  exitX = 1,
  exitY = 0.5,
  entryX = 0,
  entryY = 0.5,
  points: Array<[number, number]> = [],
): string => {
  const cfg =
    kind === 'normal'
      ? { stroke: '#2563EB', dash: 0, pattern: '6 4', width: 2, arrow: 'block' }
      : kind === 'replication'
        ? { stroke: '#188038', dash: 1, pattern: '4 4', width: 1.8, arrow: 'block' }
        : { stroke: '#6D28D9', dash: 1, pattern: '6 4', width: 1.8, arrow: 'block' };
  const pointXml = points.length
    ? `<Array as="points">${points.map(([x, y]) => `<mxPoint x="${x}" y="${y}"/>`).join('')}</Array>`
    : '';
  return `<mxCell id="${id}" value="${esc(label)}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${cfg.stroke};strokeWidth=${cfg.width};dashed=${cfg.dash};dashPattern=${cfg.pattern};endArrow=${cfg.arrow};endFill=1;fontColor=#334155;fontSize=10;labelBackgroundColor=#FFFFFF;labelBorderColor=none;exitX=${exitX};exitY=${exitY};exitDx=0;exitDy=0;entryX=${entryX};entryY=${entryY};entryDx=0;entryDy=0;" edge="1" parent="1" source="${source}" target="${target}"><mxGeometry relative="1" as="geometry">${pointXml}</mxGeometry></mxCell>`;
};

export function buildCompleteWellArchitectedGcpDrMasterXml(): string {
  const cells: string[] = [
    '<mxCell id="0"/>',
    '<mxCell id="1" parent="0"/>',

    // Main regions and center replication rail.
    section('primary_region', 'PRIMARY REGION — ACTIVE', 30, 20, 390, 660, '#188038', '#F0FDF4'),
    section('replication', 'REPLICATION & BACKUP', 450, 20, 300, 660, '#1A73E8', '#EFF6FF'),
    section('secondary_region', 'SECONDARY REGION — PASSIVE / WARM STANDBY', 780, 20, 390, 660, '#1A73E8', '#EFF6FF'),
    section('failover_flow', 'FAILOVER PROCESS FLOW', 1200, 20, 350, 660, '#6D28D9', '#FAF5FF'),

    // Primary region.
    card('user_traffic', '1', 'User Traffic', 'Normal-state production traffic', 55, 70, 340, 58, '#188038'),
    card('traffic_mgr', '2', 'Cloud Load Balancing / Cloud DNS', 'Health-aware routing; DNS failover policy only when the chosen design uses DNS steering', 55, 145, 340, 78, '#188038'),
    v('primary_app_hdr', 'APPLICATION TIER', 'text;html=1;align=center;verticalAlign=middle;fontColor=#166534;fontStyle=1;fontSize=13;', 70, 244, 310, 24),
    card('primary_web', 'APP', 'Web / API Services', 'Cloud Run, GKE, or Compute Engine — workload-specific', 65, 278, 320, 68, '#188038'),
    card('primary_services', 'SVC', 'Microservices / Background Workers', 'Production service tier and scheduled/event workers', 65, 358, 320, 68, '#188038'),
    v('primary_data_hdr', 'DATA TIER', 'text;html=1;align=center;verticalAlign=middle;fontColor=#166534;fontStyle=1;fontSize=13;', 70, 446, 310, 24),
    card('primary_db', 'SQL', 'Primary Database — READ / WRITE', 'Cloud SQL example: regional HA primary with cross-region DR replica', 65, 480, 320, 78, '#188038'),
    card('primary_state', 'DATA', 'Object / Cache / Messaging State', 'Cloud Storage, cache, and messaging use service-specific regional/DR patterns', 65, 570, 320, 78, '#188038'),

    // Replication / backup rail.
    card('db_replication', 'DB', 'Database Replication', 'Cloud SQL example: asynchronous cross-region DR replica; replica lag can make RPO non-zero', 475, 88, 250, 92, '#1A73E8'),
    card('object_replication', 'OBJ', 'Object / Data Protection', 'Dual-region, cross-region copy, backup, or service-native replication according to workload design', 475, 198, 250, 92, '#1A73E8'),
    card('iac_sync', 'IaC', 'Infrastructure & Configuration Sync', 'Terraform / deployment configuration keeps the DR region reproducible and ready', 475, 308, 250, 92, '#1A73E8'),
    card('artifact_sync', 'ART', 'Application Artifacts', 'Artifact Registry / signed releases available to both regions', 475, 418, 250, 82, '#1A73E8'),
    card('secret_sync', 'SEC', 'Secrets & Runtime Configuration', 'Secret Manager / KMS strategy and application configuration prepared for DR activation', 475, 518, 250, 92, '#1A73E8'),

    // Secondary region.
    v('secondary_app_hdr', 'STANDBY / WARM APPLICATION TIER', 'text;html=1;align=center;verticalAlign=middle;fontColor=#1D4ED8;fontStyle=1;fontSize=13;', 805, 70, 340, 28),
    card('secondary_web', 'APP', 'Web / API Services — STANDBY', 'Scaled-to-minimum, warm, or pre-provisioned according to the DR tier', 805, 110, 340, 76, '#1A73E8'),
    card('secondary_services', 'SVC', 'Microservices / Workers — STANDBY', 'Activated or scaled as part of the governed failover procedure', 805, 202, 340, 76, '#1A73E8'),
    v('secondary_data_hdr', 'STANDBY DATA TIER', 'text;html=1;align=center;verticalAlign=middle;fontColor=#1D4ED8;fontStyle=1;fontSize=13;', 805, 300, 340, 28),
    card('secondary_db', 'SQL', 'Cross-Region DR Replica — READ ONLY', 'Cloud SQL example: designated DR replica until failover/promotion', 805, 340, 340, 86, '#1A73E8'),
    card('secondary_state', 'DATA', 'Protected Object / Cache / Messaging State', 'State reconstructed, replicated, or reconnected using service-specific procedures', 805, 444, 340, 88, '#1A73E8'),
    card('secondary_ready', 'READY', 'DR Readiness Baseline', 'Health probes, dependencies, network, IAM, quotas, configuration, and smoke tests validated', 805, 550, 340, 92, '#1A73E8', '#F8FAFC'),

    // Failover process.
    card('fo1', '1', 'Detect Regional Failure', 'Monitoring / service health identifies a sustained regional-impact condition', 1225, 68, 300, 54, '#6D28D9'),
    card('fo2', '2', 'Validate Trigger', 'Incident / DR team confirms scope, data state, and runbook entry criteria', 1225, 130, 300, 54, '#6D28D9'),
    card('fo3', '3', 'DR Decision Gate', 'Authorized incident commander / business owner approves failover', 1225, 192, 300, 54, '#6D28D9'),
    card('fo4', '4', 'Promote / Fail Over Data Service', 'For Cloud SQL: fail over or promote the designated cross-region DR replica', 1225, 254, 300, 60, '#6D28D9'),
    card('fo5', '5', 'Activate Secondary Application', 'Scale or enable the standby application tier and dependencies', 1225, 322, 300, 54, '#6D28D9'),
    card('fo6', '6', 'Shift Client Traffic', 'Update load-balancing, DNS, endpoint, or connection configuration as designed', 1225, 384, 300, 60, '#6D28D9'),
    card('fo7', '7', 'Validate Application & Data', 'Run smoke tests, critical journeys, data-integrity checks, and business validation', 1225, 452, 300, 60, '#6D28D9'),
    card('fo8', '8', 'Operate from DR Region', 'Monitor SLOs, replication topology, security controls, and business KPIs', 1225, 520, 300, 54, '#6D28D9'),
    card('fo9', '9', 'Plan Controlled Failback', 'After recovery, re-establish replication and perform a scheduled return when appropriate', 1225, 582, 300, 60, '#6D28D9'),

    // Bottom management and targets.
    section('governance', 'GOVERNANCE & DR MANAGEMENT', 30, 710, 1010, 190, '#1A73E8', '#FFFFFF'),
    card('gov_rto', 'RTO', 'RTO / RPO Targets', 'Defined per workload and dependency; measure actual drill results', 55, 760, 145, 110, '#1A73E8'),
    card('gov_runbook', 'RUN', 'DR Runbooks & Automation', 'Versioned procedures, approvals, automation, rollback and evidence', 220, 760, 145, 110, '#1A73E8'),
    card('gov_access', 'IAM', 'Access Control', 'Least privilege, break-glass / PAM, service identities and audit', 385, 760, 145, 110, '#1A73E8'),
    card('gov_audit', 'LOG', 'Audit & Compliance', 'Cloud Audit Logs, change evidence, incident timeline and control validation', 550, 760, 145, 110, '#1A73E8'),
    card('gov_test', 'TEST', 'DR Testing', 'Scheduled tabletop, failover, data-recovery and failback exercises', 715, 760, 145, 110, '#1A73E8'),
    card('gov_comms', 'COM', 'Communications', 'Incident bridge, stakeholder updates, customer communications and status', 880, 760, 135, 110, '#1A73E8'),

    section('targets', 'EXAMPLE TARGETS — WORKLOAD-DEFINED', 1070, 710, 480, 190, '#6D28D9', '#FFFFFF'),
    card('target_rto', 'RTO', 'Example RTO Target', 'e.g., 4 hours — illustrative only; validate by testing', 1100, 770, 200, 92, '#6D28D9', '#FAF5FF'),
    card('target_rpo', 'RPO', 'Example RPO Target', 'e.g., 15 minutes — illustrative only; async replication can have lag', 1320, 770, 200, 92, '#6D28D9', '#FAF5FF'),
    v('target_note', '<b>Targets are design objectives, not Google Cloud guarantees.</b>', 'text;html=1;whiteSpace=wrap;align=center;verticalAlign=middle;fontColor=#6D28D9;fontSize=11;', 1095, 866, 430, 24),

    // Legend.
    v('legend_bg', '', 'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;', 30, 925, 1520, 58),
    v('legend_title', '<b>LEGEND</b>', 'text;html=1;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=12;', 55, 939, 90, 30),
    v('legend_normal', 'Normal Operation', 'text;html=1;align=left;verticalAlign=middle;fontColor=#2563EB;fontStyle=1;fontSize=11;', 210, 939, 170, 30),
    v('legend_replication', 'Replication / Protection', 'text;html=1;align=left;verticalAlign=middle;fontColor=#188038;fontStyle=1;fontSize=11;', 540, 939, 210, 30),
    v('legend_failover', 'Failover / Operational Action', 'text;html=1;align=left;verticalAlign=middle;fontColor=#6D28D9;fontStyle=1;fontSize=11;', 900, 939, 250, 30),
    v('legend_note', 'Cloud SQL is an implementation example; other data services use their own supported HA/DR mechanisms.', 'text;html=1;whiteSpace=wrap;align=right;verticalAlign=middle;fontColor=#475569;fontSize=10;', 1160, 937, 360, 34),

    // Normal-state flow.
    e('e_user_lb', 'user_traffic_bg', 'traffic_mgr_bg', 'Normal production traffic', 'normal', 0.5, 1, 0.5, 0),
    e('e_lb_app', 'traffic_mgr_bg', 'primary_web_bg', 'Healthy primary route', 'normal', 0.5, 1, 0.5, 0),
    e('e_app_services', 'primary_web_bg', 'primary_services_bg', 'Service calls / work', 'normal', 0.5, 1, 0.5, 0),
    e('e_services_db', 'primary_services_bg', 'primary_db_bg', 'Reads / writes', 'normal', 0.5, 1, 0.5, 0),
    e('e_db_state', 'primary_db_bg', 'primary_state_bg', 'Object / event state', 'normal', 0.5, 1, 0.5, 0),

    // Replication / protection paths.
    e('e_db_repl_in', 'primary_db_bg', 'db_replication_bg', 'Async cross-region replication', 'replication'),
    e('e_db_repl_out', 'db_replication_bg', 'secondary_db_bg', 'DR replica', 'replication'),
    e('e_obj_repl_in', 'primary_state_bg', 'object_replication_bg', 'Service-specific data protection', 'replication'),
    e('e_obj_repl_out', 'object_replication_bg', 'secondary_state_bg', 'Protected copy / state', 'replication'),
    e('e_iac_out', 'iac_sync_bg', 'secondary_ready_bg', 'Reproducible infrastructure', 'replication'),
    e('e_artifact_out', 'artifact_sync_bg', 'secondary_web_bg', 'Release artifacts', 'replication'),
    e('e_secret_out', 'secret_sync_bg', 'secondary_services_bg', 'Runtime config / secret readiness', 'replication'),

    // Governed failover sequence.
    e('e_fo12', 'fo1_bg', 'fo2_bg', '', 'failover', 0.5, 1, 0.5, 0),
    e('e_fo23', 'fo2_bg', 'fo3_bg', '', 'failover', 0.5, 1, 0.5, 0),
    e('e_fo34', 'fo3_bg', 'fo4_bg', '', 'failover', 0.5, 1, 0.5, 0),
    e('e_fo45', 'fo4_bg', 'fo5_bg', '', 'failover', 0.5, 1, 0.5, 0),
    e('e_fo56', 'fo5_bg', 'fo6_bg', '', 'failover', 0.5, 1, 0.5, 0),
    e('e_fo67', 'fo6_bg', 'fo7_bg', '', 'failover', 0.5, 1, 0.5, 0),
    e('e_fo78', 'fo7_bg', 'fo8_bg', '', 'failover', 0.5, 1, 0.5, 0),
    e('e_fo89', 'fo8_bg', 'fo9_bg', '', 'failover', 0.5, 1, 0.5, 0),

    // Explicit operational actions from runbook into secondary region.
    e('e_promote_db', 'fo4_bg', 'secondary_db_bg', 'Promote / fail over', 'failover', 0, 0.5, 1, 0.5, [[1180, 284], [1180, 383]]),
    e('e_activate_app', 'fo5_bg', 'secondary_web_bg', 'Activate / scale', 'failover', 0, 0.5, 1, 0.5, [[1178, 349], [1178, 148]]),
    e('e_shift_traffic', 'fo6_bg', 'traffic_mgr_bg', 'Shift client routing', 'failover', 0, 0.5, 1, 0.5, [[1190, 414], [1190, 230], [430, 230], [430, 184]]),
    e('e_validate', 'fo7_bg', 'secondary_ready_bg', 'Validation gate', 'failover', 0, 0.5, 1, 0.5, [[1180, 482], [1180, 596]]),

    // Legend line samples.
    v('legend_line_normal', '', 'shape=line;strokeColor=#2563EB;strokeWidth=2;endArrow=block;endFill=1;', 155, 953, 42, 1),
    v('legend_line_repl', '', 'shape=line;strokeColor=#188038;strokeWidth=1.8;dashed=1;dashPattern=4 4;endArrow=block;endFill=1;', 485, 953, 42, 1),
    v('legend_line_fo', '', 'shape=line;strokeColor=#6D28D9;strokeWidth=1.8;dashed=1;dashPattern=6 4;endArrow=block;endFill=1;', 845, 953, 42, 1),
  ];

  return `<mxfile host="app.diagrams.net" modified="2026-08-20T00:00:00.000Z" agent="PromptCanvas" version="24.0.0" type="device"><diagram id="blueprint37_active_passive_dr" name="Multi-Region Active-Passive Disaster Recovery"><mxGraphModel dx="1600" dy="1000" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1580" pageHeight="1000" background="#FFFFFF"><root>${cells.join('\n')}</root></mxGraphModel></diagram></mxfile>`;
}
