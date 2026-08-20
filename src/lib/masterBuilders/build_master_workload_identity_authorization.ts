/**
 * 🎨 Blueprint #55 (NEW-SEC-05): Workload Identity & Service-to-Service Authorization
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
  github: svg('<circle cx="24" cy="24" r="20" fill="#111827"/><path d="M15 34c2-6 6-8 9-8s7 2 9 8M16 21c0-7 4-11 8-11s8 4 8 11c0 5-3 8-8 8s-8-3-8-8z" fill="#fff"/>'),
  aws: svg('<rect x="8" y="8" width="32" height="32" rx="6" fill="#FF9900"/><path d="M14 28c4 4 16 4 20 0" stroke="#232F3E" stroke-width="3" fill="none"/>'),
  k8s: svg('<rect x="6" y="6" width="36" height="36" rx="8" fill="#326CE5"/><circle cx="24" cy="24" r="10" fill="none" stroke="#fff" stroke-width="2.5"/>'),
  auth: svg('<circle cx="24" cy="15" r="8" fill="#059669"/><path d="M9 41c2-11 8-16 15-16s13 5 15 16" fill="#059669"/><rect x="28" y="28" width="12" height="10" rx="2" fill="#fff" stroke="#059669" stroke-width="2"/>'),
  key: svg('<circle cx="17" cy="21" r="9" fill="none" stroke="#D97706" stroke-width="4"/><path d="m24 25 15 15m-7-8 5-5m-10 0 5-5" stroke="#D97706" stroke-width="3"/>'),
  shield: svg('<path d="M24 4 40 10v12c0 11-6.5 18-16 22C14.5 40 8 33 8 22V10z" fill="#059669"/><path d="m16 24 5 5 11-13" fill="none" stroke="#fff" stroke-width="3"/>'),
  gcs: svg('<rect x="8" y="10" width="32" height="28" rx="4" fill="#0284C7"/><path d="M14 18h20M14 24h20M14 30h12" stroke="#fff" stroke-width="2"/>'),
  bq: svg('<ellipse cx="24" cy="12" rx="14" ry="6" fill="#1D4ED8"/><path d="M10 12v18c0 3.3 6.3 6 14 6s14-2.7 14-6V12" fill="#93C5FD"/><ellipse cx="24" cy="30" rx="14" ry="6" fill="#1D4ED8"/>'),
  spanner: svg('<path d="M24 6 40 15v18L24 42 8 33V15z" fill="#1D4ED8"/><path d="M16 20h16v8H16z" fill="#fff"/>'),
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

export function buildMasterWorkloadIdentityAuthXml(): string {
  const cells: string[] = [
    '<mxCell id="0"/>',
    '<mxCell id="1" parent="0"/>',

    // Lane 1: External & Multi-Cloud Identity Providers
    lane('callers', 1, 'CALLER IDENTITY PROVIDERS (OIDC / SPIFFE)', 'External multi-cloud workloads, CI/CD runners & Kubernetes pods', 20, 20, 1540, 140, '#1E3A8A', '#FFFFFF'),
    card('id_gh', 'GitHub Actions OIDC', 'Ephemeral JWT with repository claim validation', ICON.github, 45, 75, 330, 70, '#111827'),
    card('id_aws', 'AWS IAM AssumeRoleWithWebIdentity', 'Signed AWS STS GetCallerIdentity token assertion', ICON.aws, 410, 75, 360, 70, '#D97706'),
    card('id_spiffe', 'On-Prem SPIFFE / SPIRE', 'Cryptographic X.509 SVID mTLS identity document', ICON.auth, 805, 75, 350, 70, '#7C3AED'),
    card('id_gke', 'GKE Kubernetes Service Account (KSA)', 'Projected ServiceAccountToken with audience binding', ICON.k8s, 1185, 75, 350, 70, '#2563EB'),

    // Lane 2: Google Cloud Security Token Service (STS) & Workload Identity Pool
    lane('sts', 2, 'SECURITY TOKEN SERVICE (STS) & POOL MAPPINGS', 'Federated identity verification, attribute conditions and principalSet assertions', 20, 180, 1540, 150, '#047857', '#FFFFFF'),
    card('sts_pool', 'Workload Identity Pool', 'Logical security boundary with attribute condition filters', ICON.shield, 45, 235, 460, 75, '#059669'),
    card('sts_sts', 'Google Cloud Security Token Service (STS)', 'Exchanges external JWT/SAML for federated GCP token', ICON.auth, 545, 235, 450, 75, '#2563EB'),
    card('sts_attr', 'Attribute Mapping & Conditions', 'attribute.repository == "enterprise/app" & assertion.aud', ICON.shield, 1035, 235, 500, 75, '#059669'),

    // Lane 3: IAM Service Account Impersonation Engine
    lane('impersonate', 3, 'IAM SERVICE ACCOUNT IMPERSONATION (ZERO STATIC KEYS)', 'Short-lived credentials with fine-grained Resource Manager condition tags', 20, 350, 1540, 150, '#D97706', '#FFFFFF'),
    card('gsa_sa', 'Target Google Service Account (GSA)', 'No permanent private keys; roles/iam.workloadIdentityUser', ICON.auth, 45, 405, 460, 75, '#D97706'),
    card('gsa_token', 'IAM Credentials API (generateAccessToken)', 'Issues short-lived (15 min) OAuth 2.0 / Downscoped token', ICON.key, 545, 405, 450, 75, '#059669'),
    card('gsa_cond', 'IAM Conditions & Tag Bindings', 'Restricted to VPC Service Controls & CMEK encryption keys', ICON.shield, 1035, 405, 500, 75, '#059669'),

    // Lane 4: Target Protected GCP Resources
    lane('resources', 4, 'TARGET GOOGLE CLOUD PROTECTED RESOURCES', 'Zero-Trust authorization across storage, analytics and secret management', 20, 520, 1540, 150, '#1D4ED8', '#FFFFFF'),
    card('res_gcs', 'Cloud Storage (CMEK Buckets)', 'Direct blob download/upload via authorized bearer token', ICON.gcs, 45, 575, 340, 75, '#0284C7'),
    card('res_bq', 'BigQuery Enterprise Warehouse', 'Authorized view execution & row/column-level access control', ICON.bq, 415, 575, 360, 75, '#1D4ED8'),
    card('res_spanner', 'Cloud Spanner Databases', 'Fine-grained database role execution for transactional data', ICON.spanner, 805, 575, 350, 75, '#1D4ED8'),
    card('res_sec', 'Secret Manager Secrets', 'Access payload version with hardware key validation', ICON.key, 1185, 575, 350, 75, '#D97706'),

    // Lane 5: Security Governance & Audit Trail
    lane('governance', 5, 'SECURITY GOVERNANCE & CONTINUOUS AUDIT TRAIL', 'Real-time telemetry, least-privilege analysis and automated key rotation', 20, 690, 1540, 140, '#047857', '#FFFFFF'),
    card('gov_audit', 'Cloud Audit Logs (Data Access)', 'Immutable recording of caller identity, principalSet and IP', ICON.log, 45, 745, 460, 70, '#059669'),
    card('gov_recommender', 'IAM Recommender & Policy Analyzer', 'Automated identification of over-privileged service accounts', ICON.shield, 545, 745, 450, 70, '#059669'),
    card('gov_scc', 'Security Command Center Premium', 'Real-time anomaly detection for token replay or exfiltration', ICON.shield, 1035, 745, 500, 70, '#059669'),

    // Edges
    edge('e_gh_sts', 'id_gh', 'sts_sts', '1. Send GitHub JWT', 'request'),
    edge('e_aws_sts', 'id_aws', 'sts_sts', '1. Send AWS Token', 'request'),
    edge('e_spiffe_sts', 'id_spiffe', 'sts_sts', '1. Send SVID', 'request'),
    edge('e_gke_gsa', 'id_gke', 'gsa_sa', 'Direct WIF Binding', 'request'),
    edge('e_sts_attr', 'sts_sts', 'sts_attr', 'Validate Claims', 'governance'),
    edge('e_attr_gsa', 'sts_attr', 'gsa_sa', '2. Match PrincipalSet', 'governance'),
    edge('e_gsa_token', 'gsa_sa', 'gsa_token', '3. Generate Token', 'request'),
    edge('e_token_gcs', 'gsa_token', 'res_gcs', '4. Authorized Access', 'request'),
    edge('e_token_bq', 'gsa_token', 'res_bq', '4. Authorized Access', 'request'),
    edge('e_token_span', 'gsa_token', 'res_spanner', '4. Authorized Access', 'request'),
    edge('e_token_sec', 'gsa_token', 'res_sec', '4. Authorized Access', 'request'),
    edge('e_gsa_audit', 'gsa_sa', 'gov_audit', 'Log Token Grant', 'governance', 0.5, 1, 0.5, 0),
  ];

  return `<mxfile host="app.diagrams.net" modified="2026-08-21T00:35:00.000Z" agent="PromptCanvas Blueprint 55" version="24.7.17" type="device">
  <diagram id="catalog_workload_identity_authorization" name="Workload Identity &amp; Service-to-Service Authorization Architecture">
    <mxGraphModel dx="1600" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="950" background="#F8FAFC">
      <root>
        ${cells.join('\n        ')}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}

export const MASTER_WORKLOAD_IDENTITY_AUTH_XML = buildMasterWorkloadIdentityAuthXml();
