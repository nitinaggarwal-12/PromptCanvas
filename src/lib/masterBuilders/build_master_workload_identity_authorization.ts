/**
 * 🎨 Blueprint #55 (NEW-SEC-05): Workload Identity & Service-to-Service Authorization
 * High-Craft Master Blueprint (Benchmark Pattern following Blueprint 50)
 * 
 * Featuring:
 * - External & Internal Caller Workloads (GitHub Actions, AWS IAM, On-Prem SPIFFE/SPIRE, GKE KSA)
 * - Security Token Service (STS) & Workload Identity Pool (OIDC/SAML token validation, Attribute Mappings)
 * - IAM Service Account Impersonation Engine (Short-lived 15-min tokens, zero static service account keys)
 * - Protected GCP Resource Targets (Cloud Storage, BigQuery, Secret Manager, Cloud Spanner)
 * - Security Governance & Audit Trail (Cloud Audit Logs, IAM Policy Analyzer, SCC)
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
  github: svg('<circle cx="24" cy="24" r="20" fill="#111827"/><path d="M15 34c2-6 6-8 9-8s7 2 9 8M16 21c0-7 4-11 8-11s8 4 8 11c0 5-3 8-8 8s-8-3-8-8z" fill="#fff"/>'),
  aws: svg('<rect x="8" y="8" width="32" height="32" rx="6" fill="#FF9900"/><path d="M14 28c4 4 16 4 20 0" stroke="#232F3E" stroke-width="3" fill="none"/>'),
  k8s: svg('<rect x="6" y="6" width="36" height="36" rx="8" fill="#326CE5"/><circle cx="24" cy="24" r="10" fill="none" stroke="#fff" stroke-width="2.5"/>'),
  auth: svg('<circle cx="24" cy="15" r="8" fill="#16A34A"/><path d="M9 41c2-11 8-16 15-16s13 5 15 16" fill="#16A34A"/><rect x="28" y="28" width="12" height="10" rx="2" fill="#fff" stroke="#16A34A" stroke-width="2"/>'),
  key: svg('<circle cx="17" cy="21" r="9" fill="none" stroke="#16A34A" stroke-width="5"/><path d="m24 25 15 15m-7-8 5-5m-10 0 5-5" stroke="#16A34A" stroke-width="4"/>'),
  shield: svg('<path d="M24 4 40 10v12c0 11-6.5 18-16 22C14.5 40 8 33 8 22V10z" fill="#16A34A"/><path d="m16 24 5 5 11-13" fill="none" stroke="#fff" stroke-width="3"/>'),
  gcs: svg('<rect x="8" y="10" width="32" height="28" rx="4" fill="#0284C7"/><path d="M14 18h20M14 24h20M14 30h12" stroke="#fff" stroke-width="2"/>'),
  bq: svg('<ellipse cx="24" cy="12" rx="14" ry="6" fill="#1D4ED8"/><path d="M10 12v18c0 3.3 6.3 6 14 6s14-2.7 14-6V12" fill="#93C5FD"/><ellipse cx="24" cy="30" rx="14" ry="6" fill="#1D4ED8"/>'),
  spanner: svg('<path d="M24 6 40 15v18L24 42 8 33V15z" fill="#1D4ED8"/><path d="M16 20h16v8H16z" fill="#fff"/>'),
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

export function buildMasterWorkloadIdentityAuthXml(): string {
  const cells: string[] = [
    '<mxCell id="0"/>',
    '<mxCell id="1" parent="0"/>',

    // Lane 1: External & Internal Caller Workloads
    lane('callers', 1, 'CALLER WORKLOAD IDENTITIES', 'External multi-cloud platforms and internal Kubernetes workloads', 20, 20, 280, 680, '#111827', '#F8FAFC'),
    card('caller_gh', 'GitHub Actions CI/CD', 'OIDC token with repository & ref assertions', ICON.github, 38, 85, 244, 85, '#111827'),
    card('caller_aws', 'AWS IAM Role (AssumeRoleWithWebIdentity)', 'AWS STS regional token with ARN claims', ICON.aws, 38, 195, 244, 85, '#EA580C'),
    card('caller_spiffe', 'On-Prem Kubernetes (SPIFFE/SPIRE)', 'mTLS SVID X.509 certificate exchange', ICON.k8s, 38, 305, 244, 85, '#326CE5'),
    card('caller_gke', 'GKE Kubernetes Service Account (KSA)', 'Namespace-scoped projected serviceaccount token', ICON.k8s, 38, 415, 244, 85, '#326CE5'),

    // Lane 2: STS & Workload Identity Pool
    lane('sts', 2, 'SECURITY TOKEN SERVICE (STS) & POOL', 'RFC 8693 token exchange, attribute mapping and condition checks', 320, 20, 360, 680, '#0284C7', '#F0F9FF'),
    card('sts_val', 'OIDC / SAML Token Validation', 'Cryptographic signature verification against IdP discovery keys', ICON.auth, 338, 85, 324, 90, '#0284C7'),
    card('sts_map', 'Attribute Mappings (Pool Config)', 'google.subject = assertion.sub\nattribute.repo = assertion.repository', ICON.key, 338, 200, 324, 95, '#0284C7'),
    card('sts_cond', 'Attribute Condition Filter Rules', 'assertion.repository_owner == "enterprise-org"\n&& assertion.ref == "refs/heads/main"', ICON.shield, 338, 320, 324, 95, '#16A34A'),
    card('sts_token', 'Federated STS Token Issuance', 'Short-lived federated token representing caller identity', ICON.auth, 338, 440, 324, 80, '#0284C7'),

    // Lane 3: IAM Service Account Impersonation Engine
    lane('engine', 3, 'IAM SA IMPERSONATION ENGINE', 'GenerateAccessToken API exchange with zero static private keys', 700, 20, 420, 680, '#16A34A', '#F0FDF4'),
    card('eng_api', 'IAM Credentials API (generateAccessToken)', 'Exchange federated token for Google OAuth2 access token', ICON.auth, 718, 85, 384, 90, '#16A34A'),
    card('eng_gsa', 'Target Google Service Account (GSA)', 'sa-data-pipeline@project.iam.gserviceaccount.com', ICON.auth, 718, 200, 384, 90, '#16A34A'),
    card('eng_keys', 'STRICTLY ZERO STATIC SA KEYS', 'Eliminates all long-lived service-account private keys (JSON)', ICON.shield, 718, 315, 384, 80, '#DC2626', '#FEF2F2'),
    card('eng_scoped', '15-Minute Scoped Access Token', 'Least-privilege OAuth2 token with strict time-to-live', ICON.key, 718, 420, 384, 85, '#16A34A'),

    // Lane 4: Protected GCP Resource Targets
    lane('targets', 4, 'PROTECTED GCP RESOURCE TARGETS', 'Cloud storage, analytics datasets, secret stores and databases', 1140, 20, 420, 680, '#1D4ED8', '#EFF6FF'),
    card('tgt_gcs', 'Cloud Storage Buckets (GCS)', 'roles/storage.objectViewer (Audit bucket landing)', ICON.gcs, 1158, 85, 384, 85, '#0284C7'),
    card('tgt_bq', 'BigQuery Analytics Datasets', 'roles/bigquery.dataEditor (ETL medallion warehouse)', ICON.bq, 1158, 195, 384, 85, '#1D4ED8'),
    card('tgt_sec', 'Secret Manager Secrets', 'roles/secretmanager.secretAccessor (DB credentials)', ICON.key, 1158, 305, 384, 85, '#16A34A'),
    card('tgt_span', 'Cloud Spanner Database', 'roles/spanner.databaseUser (OLTP transactions)', ICON.spanner, 1158, 415, 384, 85, '#1D4ED8'),

    // Lane 5: Security Governance & Audit Trail
    lane('governance', 5, 'SECURITY GOVERNANCE & AUDIT TRAIL', 'Full compliance visibility with Cloud Audit Logs and Policy Analyzer', 20, 720, 1540, 190, '#16A34A', '#F0FDF4'),
    card('gov_audit', 'Cloud Audit Logs (Data Access)', 'Immutably records every STS exchange & impersonation event', ICON.log, 45, 785, 470, 95, '#16A34A'),
    card('gov_analyzer', 'Cloud IAM Policy Analyzer', 'Continuous simulation of effective permissions & over-privilege', ICON.shield, 545, 785, 470, 95, '#16A34A'),
    card('gov_scc', 'Security Command Center (SCC)', 'Real-time alerting on anomalous service account usage patterns', ICON.shield, 1045, 785, 490, 95, '#16A34A'),

    // Edges
    edge('e_gh_val', 'caller_gh', 'sts_val', 'OIDC Token (JWT)', 'request'),
    edge('e_aws_val', 'caller_aws', 'sts_val', 'AWS STS Token', 'request'),
    edge('e_spiffe_val', 'caller_spiffe', 'sts_val', 'SPIFFE SVID', 'request'),
    edge('e_gke_val', 'caller_gke', 'sts_val', 'KSA Token', 'request'),
    edge('e_val_map', 'sts_val', 'sts_map', 'Map Claims', 'request', 0.5, 1, 0.5, 0),
    edge('e_map_cond', 'sts_map', 'sts_cond', 'Assert Condition', 'request', 0.5, 1, 0.5, 0),
    edge('e_cond_tok', 'sts_cond', 'sts_token', 'Mint STS Token', 'request', 0.5, 1, 0.5, 0),
    edge('e_tok_api', 'sts_token', 'eng_api', 'Impersonate GSA', 'request'),
    edge('e_api_gsa', 'eng_api', 'eng_gsa', 'Bind IAM Role', 'request', 0.5, 1, 0.5, 0),
    edge('e_gsa_scoped', 'eng_gsa', 'eng_scoped', 'Issue OAuth2 Token', 'request', 0.5, 1, 0.5, 0),
    edge('e_scoped_gcs', 'eng_scoped', 'tgt_gcs', 'Access Storage', 'request', 1, 0.25, 0, 0.5),
    edge('e_scoped_bq', 'eng_scoped', 'tgt_bq', 'Query BigQuery', 'request', 1, 0.5, 0, 0.5),
    edge('e_scoped_sec', 'eng_scoped', 'tgt_sec', 'Read Secret', 'request', 1, 0.75, 0, 0.5),
    edge('e_eng_audit', 'eng_api', 'gov_audit', 'Log Token Exchange', 'governance', 0.25, 1, 0.5, 0),
    edge('e_gsa_analyzer', 'eng_gsa', 'gov_analyzer', 'Audit Permissions', 'governance', 0.5, 1, 0.5, 0),
  ];

  return `<mxfile host="embed.diagrams.net" modified="2026-08-20T22:00:00.000Z" agent="PromptCanvas" version="24.0.0" type="embed">
  <diagram id="catalog_workload_identity_authorization" name="Workload Identity &amp; Service-to-Service Authorization">
    <mxGraphModel dx="1600" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="950" background="#FFFFFF">
      <root>
        ${cells.join('\n        ')}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}

export const MASTER_WORKLOAD_IDENTITY_AUTH_XML = buildMasterWorkloadIdentityAuthXml();
