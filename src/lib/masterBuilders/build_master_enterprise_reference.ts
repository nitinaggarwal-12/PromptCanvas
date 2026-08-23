import { generateTemplate06C4ContextXml } from "../canonical/template06C4Context";

export function buildEnterpriseReferenceArchitectureXml(): string {
  return buildOldEnterpriseReferenceArchitectureXmlInternal();
}

export function buildOldEnterpriseReferenceArchitectureXml(): string {
  return generateTemplate06C4ContextXml("biopharma", "light");
}

const GCP_BRAND =
  'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2048%2048%22%3E%3Cpath%20fill%3D%22%23EA4335%22%20d%3D%22M24%209.5c3.54%200%206.71%201.22%209.21%203.6l6.85-6.85C35.9%202.38%2030.47%200%2024%200%2014.62%200%206.51%205.38%202.56%2013.22l7.98%206.19C12.43%2013.72%2017.74%209.5%2024%209.5z%22%2F%3E%3Cpath%20fill%3D%22%234285F4%22%20d%3D%22M46.98%2024.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58%202.96-2.26%205.48-4.78%207.18l7.73%206c4.51-4.18%207.09-10.36%207.09-17.65z%22%2F%3E%3Cpath%20fill%3D%22%23FBBC05%22%20d%3D%22M10.53%2028.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92%2016.46%200%2020.12%200%2024c0%203.88.92%207.54%202.56%2010.78l7.97-6.19z%22%2F%3E%3Cpath%20fill%3D%22%2334A853%22%20d%3D%22M24%2048c6.48%200%2011.93-2.13%2015.89-5.81l-7.73-6c-2.15%201.45-4.92%202.3-8.16%202.3-6.26%200-11.57-4.22-13.47-9.91l-7.98%206.19C6.51%2042.62%2014.62%2048%2024%2048z%22%2F%3E%3C%2Fsvg%3E';
const GCP_ICON_BASE = 'https://cdn.jsdelivr.net/npm/gcp-icons@1.0.6/dist/icons/';
const ICONS = {
  agents: `${GCP_ICON_BASE}agents-512-color.svg`,
  bigquery: `${GCP_ICON_BASE}bigquery-512-color.svg`,
  gcs: `${GCP_ICON_BASE}cloud-storage-512-color.svg`,
  cloudRun: `${GCP_ICON_BASE}cloudrun-512-color-rgb.svg`,
  gke: `${GCP_ICON_BASE}gke-512-color.svg`,
  microsoft: 'https://cdn.simpleicons.org/microsoft',
  salesforce: 'https://cdn.simpleicons.org/salesforce',
  sap: 'https://cdn.simpleicons.org/sap',
  servicenow: 'https://cdn.simpleicons.org/servicenow',
  github: 'https://cdn.simpleicons.org/github',
};

const esc = (value: string): string => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const v = (id: string, value: string, style: string, x: number, y: number, width: number, height: number): string =>
  `<mxCell id="${id}" value="${esc(value)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${width}" height="${height}" as="geometry"/></mxCell>`;
const image = (id: string, url: string, x: number, y: number, width: number, height: number): string =>
  v(id, '', `shape=image;imageAspect=0;aspect=fixed;image=${url};verticalAlign=middle;align=center;`, x, y, width, height);

const layer = (id: string, n: number, title: string, verb: string, y: number, accent: string, fill: string): string => [
  v(id, '', `rounded=1;arcSize=7;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${accent};strokeWidth=1.4;shadow=0;`, 25, y, 1315, 126),
  v(`${id}_rail`, '', `rounded=1;arcSize=7;whiteSpace=wrap;html=1;fillColor=${accent};strokeColor=${accent};strokeWidth=1;`, 25, y, 230, 126),
  v(`${id}_n`, String(n), 'ellipse;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#FFFFFF;fontColor=#334155;fontStyle=1;fontSize=14;align=center;verticalAlign=middle;', 42, y + 22, 34, 34),
  v(`${id}_label`, `<b>${title}</b><br><span style="font-size:10.5px">${verb}</span>`, 'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=4;align=left;verticalAlign=middle;fontColor=#FFFFFF;fontSize=14.5;', 90, y + 17, 150, 82),
].join('\n');

const card = (id: string, title: string, subtitle: string, x: number, y: number, width: number, accent: string, iconUrl?: string, fill = '#FFFFFF'): string => {
  const icon = iconUrl ? image(`${id}_icon`, iconUrl, x + 14, y + 22, 38, 38) : '';
  const textX = iconUrl ? x + 62 : x + 16;
  const textWidth = iconUrl ? width - 74 : width - 28;
  return [
    v(id, '', `rounded=1;arcSize=8;whiteSpace=wrap;html=1;overflow=hidden;spacing=6;fillColor=${fill};strokeColor=${accent};strokeWidth=1.15;shadow=0;`, x, y, width, 86),
    v(`${id}_bar`, '', `rounded=1;arcSize=4;fillColor=${accent};strokeColor=${accent};`, x, y, 5, 86),
    icon,
    v(`${id}_label`, `<b>${title}</b><br><span style="font-size:9.8px;color:#64748B">${subtitle}</span>`, 'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=4;spacingLeft=3;spacingRight=3;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=11.7;', textX, y + 7, textWidth, 72),
  ].filter(Boolean).join('\n');
};

const chip = (id: string, label: string, x: number, y: number, width: number, accent: string, fill: string): string =>
  v(id, label, `rounded=1;arcSize=16;whiteSpace=wrap;html=1;overflow=hidden;spacing=3;fillColor=${fill};strokeColor=${accent};strokeWidth=1;fontColor=#334155;fontSize=9.8;fontStyle=1;align=center;verticalAlign=middle;`, x, y, width, 24);

const cross = (id: string, badge: string, title: string, subtitle: string, y: number, accent: string): string => [
  v(id, '', `rounded=1;arcSize=8;whiteSpace=wrap;html=1;overflow=hidden;fillColor=#FFFFFF;strokeColor=${accent};strokeWidth=1.2;`, 1383, y, 342, 100),
  v(`${id}_badge`, badge, `ellipse;whiteSpace=wrap;html=1;fillColor=${accent};strokeColor=${accent};fontColor=#FFFFFF;fontStyle=1;fontSize=9.5;align=center;verticalAlign=middle;`, 1400, y + 29, 42, 42),
  v(`${id}_label`, `<b>${title}</b><br><span style="font-size:9.8px;color:#64748B">${subtitle}</span>`, 'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=4;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=11.5;', 1454, y + 10, 250, 80),
].join('\n');

const flow = (id: string, source: string, target: string): string =>
  `<mxCell id="${id}" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#64748B;strokeWidth=1.5;endArrow=block;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="${source}" target="${target}"><mxGeometry relative="1" as="geometry"/></mxCell>`;

function buildOldEnterpriseReferenceArchitectureXmlInternal(): string {
  const cells: string[] = [
    '<mxCell id="0"/>', '<mxCell id="1" parent="0"/>',
    layer('experience', 1, 'EXPERIENCE LAYER', 'Engage users & channels', 20, '#1565C0', '#EFF6FF'),
    layer('business', 2, 'BUSINESS APPLICATION LAYER', 'Operate the enterprise', 158, '#E87900', '#FFF7ED'),
    layer('integration', 3, 'INTEGRATION LAYER', 'Connect APIs, events & tools', 296, '#0F8B82', '#ECFDF5'),
    layer('data', 4, 'DATA & KNOWLEDGE LAYER', 'Manage governed context', 434, '#6554C0', '#F5F3FF'),
    layer('ai', 5, 'AI & AGENTIC LAYER', 'Reason, assist & automate', 572, '#B83280', '#FDF2F8'),
    layer('platform', 6, 'CLOUD PLATFORM LAYER', 'Build, run & connect', 710, '#C77B00', '#FFFBEB'),

    card('exp_workforce', 'Workforce', 'Employees, analysts and operations teams', 280, 40, 245, '#1565C0'),
    card('exp_customer', 'Customers', 'Digital journeys, service and self-service', 537, 40, 245, '#1565C0'),
    card('exp_partner', 'Partners', 'B2B ecosystem and delegated access', 794, 40, 245, '#1565C0'),
    card('exp_channels', 'Web • Mobile • Chat', 'Omnichannel application and conversational entry points', 1051, 40, 245, '#1565C0'),

    card('biz_m365', 'Microsoft 365', 'SharePoint • OneDrive • Outlook • Teams', 280, 178, 245, '#E87900', ICONS.microsoft),
    card('biz_salesforce', 'Salesforce', 'CRM, service and commercial workflows', 537, 178, 245, '#E87900', ICONS.salesforce),
    card('biz_sap', 'SAP', 'ERP, supply chain and business operations', 794, 178, 245, '#E87900', ICONS.sap),
    card('biz_servicenow', 'ServiceNow', 'ITSM, workflows and enterprise service data', 1051, 178, 245, '#E87900', ICONS.servicenow),

    card('int_api', 'Apigee & API Management', 'Governed synchronous APIs, policies and mediation', 280, 316, 245, '#0F8B82'),
    card('int_events', 'Pub/Sub & Eventarc', 'Asynchronous events, fan-out and event routing', 537, 316, 245, '#0F8B82'),
    card('int_workflows', 'Workflows & Integration', 'Application orchestration and enterprise automation', 794, 316, 245, '#0F8B82'),
    card('int_mcp', 'Connectors & MCP', 'Gemini Enterprise connectors plus governed MCP tool access', 1051, 316, 245, '#0F8B82'),

    card('data_bq', 'BigQuery', 'Analytical data, governed SQL and enterprise insights', 280, 454, 245, '#6554C0', ICONS.bigquery),
    card('data_gcs', 'Cloud Storage', 'Documents, objects and multimodal source content', 537, 454, 245, '#6554C0', ICONS.gcs),
    card('data_operational', 'Operational Data', 'Cloud SQL • AlloyDB • Spanner • Bigtable', 794, 454, 245, '#6554C0'),
    card('data_catalog', 'Knowledge Catalog', 'Business context, metadata, lineage and governed discovery', 1051, 454, 245, '#6554C0'),

    v('ai_ge', '', 'rounded=1;arcSize=8;whiteSpace=wrap;html=1;overflow=hidden;fillColor=#FFFFFF;strokeColor=#B83280;strokeWidth=1.3;', 280, 590, 500, 90),
    v('ai_ge_title', '<b>Gemini Enterprise</b><br><span style="font-size:9.8px;color:#64748B">Employee AI hub for enterprise search, assistant experiences and governed no-code agents</span>', 'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=3;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=12;', 298, 595, 464, 40),
    chip('ai_ge_connectors', 'Connectors', 298, 642, 82, '#B83280', '#FDF2F8'),
    chip('ai_ge_notebook', 'Gemini Notebook Enterprise', 388, 642, 132, '#B83280', '#FDF2F8'),
    chip('ai_ge_skills', 'Skills', 528, 642, 58, '#B83280', '#FDF2F8'),
    chip('ai_ge_agents', 'Agent Gallery / Agent Designer', 594, 642, 168, '#B83280', '#FDF2F8'),

    v('ai_platform', '', 'rounded=1;arcSize=8;whiteSpace=wrap;html=1;overflow=hidden;fillColor=#FFFFFF;strokeColor=#B83280;strokeWidth=1.3;', 792, 590, 300, 90),
    image('ai_platform_icon', ICONS.agents, 808, 607, 40, 40),
    v('ai_platform_label', '<b>Gemini Enterprise Agent Platform</b><br><span style="font-size:9.8px;color:#64748B">Agent Studio / ADK • Agent Runtime • governed tools • custom agents</span>', 'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=4;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=11.5;', 858, 597, 216, 72),

    v('ai_trust', '', 'rounded=1;arcSize=8;whiteSpace=wrap;html=1;overflow=hidden;fillColor=#FFFFFF;strokeColor=#B83280;strokeWidth=1.3;', 1104, 590, 192, 90),
    v('ai_trust_label', '<b>AI Trust & Quality</b><br><span style="font-size:9.6px;color:#64748B">Grounding • evaluation • Model Armor • human authority where required</span>', 'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=5;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=11;', 1118, 597, 164, 72),

    card('plat_run', 'Cloud Run', 'Serverless services, APIs and remote MCP servers', 280, 730, 245, '#C77B00', ICONS.cloudRun),
    card('plat_gke', 'Google Kubernetes Engine', 'Container platform for portable and complex workloads', 537, 730, 245, '#C77B00', ICONS.gke),
    card('plat_compute', 'Compute & Managed Data', 'Compute Engine plus managed stateful services', 794, 730, 245, '#C77B00'),
    card('plat_network', 'VPC • NCC • PSC', 'Private networking, hybrid connectivity and service access', 1051, 730, 245, '#C77B00'),

    v('cross_bg', '', 'rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#F8FBFF;strokeColor=#8AB4F8;strokeWidth=1.4;', 1365, 20, 380, 816),
    v('cross_title', '<b>CROSS-CUTTING CAPABILITIES</b><br><span style="font-size:10px;color:#64748B">Controls span every applicable layer</span>', 'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=4;align=center;verticalAlign=middle;fontColor=#1558B0;fontSize=14;', 1383, 34, 342, 48),
    cross('cross_identity', 'IAM', 'Identity & Access', 'IAM • workforce/workload federation • least privilege', 96, '#1A73E8'),
    cross('cross_security', 'SEC', 'Security & AI Safety', 'Security Command Center • Cloud Armor • KMS • Secret Manager • Model Armor where applicable', 208, '#D93025'),
    cross('cross_governance', 'GOV', 'Governance & Audit', 'Org policy • VPC Service Controls • audit logs • data/AI policy • human approvals', 320, '#7B61A8'),
    cross('cross_observability', 'SRE', 'Observability & SRE', 'Cloud Monitoring • Logging • Trace • SLOs • alerting • incident response', 432, '#0F8B82'),
    cross('cross_delivery', 'CI', 'DevSecOps & IaC', 'GitHub or Secure Source Manager • Cloud Build • Artifact Registry • Terraform', 544, '#E87900'),
    cross('cross_finops', '$', 'FinOps & Capacity', 'Budgets • attribution • quotas • scaling • performance and cost optimization', 656, '#C77B00'),

    flow('f12', 'experience_n', 'business_n'), flow('f23', 'business_n', 'integration_n'), flow('f34', 'integration_n', 'data_n'), flow('f45', 'data_n', 'ai_n'), flow('f56', 'ai_n', 'platform_n'),

    v('footer_bg', '', 'rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#B8C7E6;strokeWidth=1.2;', 25, 860, 1720, 166),
    image('footer_gcp_logo', GCP_BRAND, 50, 888, 50, 50),
    v('footer_gcp', '<b>Google Cloud foundation</b><br><span style="font-size:9.8px;color:#64748B">Specialized blueprints provide implementation-level topology for network, IAM, DR, MCP, data, SRE, CI/CD and threat modeling.</span>', 'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=4;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=12;', 112, 878, 400, 70),
    image('footer_ms', ICONS.microsoft, 548, 886, 32, 32), image('footer_sf', ICONS.salesforce, 590, 886, 38, 32), image('footer_sap', ICONS.sap, 640, 886, 44, 32), image('footer_sn', ICONS.servicenow, 696, 886, 38, 32), image('footer_gh', ICONS.github, 746, 886, 32, 32),
    v('footer_ecosystem', '<b>Enterprise ecosystem</b><br><span style="font-size:9.8px;color:#64748B">Connect existing systems; do not imply forced migration or a single-vendor estate.</span>', 'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=4;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=11.5;', 548, 925, 280, 46),
    v('footer_ge_note', '<b>Gemini Enterprise capability boundary</b><br><span style="font-size:9.8px;color:#64748B">Connectors ground enterprise access. Gemini Notebook Enterprise supports research/knowledge workflows. Skills are reusable assistant instructions, not agent workflows. Agent Gallery / Agent Designer cover no-code agents; Agent Platform / ADK serve custom agent engineering.</span>', 'rounded=1;arcSize=7;whiteSpace=wrap;html=1;overflow=hidden;spacing=6;fillColor=#FDF2F8;strokeColor=#D89BC0;strokeWidth=1;fontColor=#334155;fontSize=10.5;align=left;verticalAlign=middle;', 850, 878, 520, 92),
    v('footer_legend', '<b>VIEW SEMANTICS</b><br><span style="font-size:9.8px;color:#64748B">Numbered rail = enterprise orientation flow<br>Colored layers = architecture responsibility boundaries<br>Right rail = cross-cutting controls, not a separate runtime path</span>', 'rounded=1;arcSize=7;whiteSpace=wrap;html=1;overflow=hidden;spacing=7;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;fontColor=#334155;fontSize=10.5;align=left;verticalAlign=middle;', 1390, 878, 330, 92),
    v('scope_note', '<b>REFERENCE VIEW — NOT A DEPLOYMENT TOPOLOGY:</b> This blueprint orients executives and architects across enterprise layers. Use specialized catalog blueprints for product wiring, trust/network boundaries, failover behavior, protocols and runbooks.', 'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=4;align=center;verticalAlign=middle;fontColor=#475569;fontSize=10.5;', 50, 982, 1670, 30),
  ];

  return `<mxfile host="app.diagrams.net" modified="2026-08-20T00:00:00.000Z" agent="PromptCanvas" version="24.0.0" type="device"><diagram id="enterprise_reference_architecture" name="Enterprise Reference Architecture"><mxGraphModel dx="1765" dy="1060" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1770" pageHeight="1060" background="#FFFFFF"><root>${cells.join('\n')}</root></mxGraphModel></diagram></mxfile>`;
}
