/**
 * Blueprint 14 — Gemini Enterprise App & Tenant Isolation Architecture.
 * Phase 3.2 rebuild: current app/data-store model, app-level IAM, connector ACLs,
 * identity-provider boundaries, agent capabilities, and explicit environment promotion.
 */

const GCP = 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2048%2048%22%3E%3Cpath%20fill%3D%22%23EA4335%22%20d%3D%22M24%209.5c3.54%200%206.71%201.22%209.21%203.6l6.85-6.85C35.9%202.38%2030.47%200%2024%200%2014.62%200%206.51%205.38%202.56%2013.22l7.98%206.19C12.43%2013.72%2017.74%209.5%2024%209.5z%22%2F%3E%3Cpath%20fill%3D%22%234285F4%22%20d%3D%22M46.98%2024.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58%202.96-2.26%205.48-4.78%207.18l7.73%206c4.51-4.18%207.09-10.36%207.09-17.65z%22%2F%3E%3Cpath%20fill%3D%22%23FBBC05%22%20d%3D%22M10.53%2028.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92%2016.46%200%2020.12%200%2024c0%203.88.92%207.54%202.56%2010.78l7.97-6.19z%22%2F%3E%3Cpath%20fill%3D%22%2334A853%22%20d%3D%22M24%2048c6.48%200%2011.93-2.13%2015.89-5.81l-7.73-6c-2.15%201.45-4.92%202.3-8.16%202.3-6.26%200-11.57-4.22-13.47-9.91l-7.98%206.19C6.51%2042.62%2014.62%2048%2024%2048z%22%2F%3E%3C%2Fsvg%3E';
const ICON = {
  microsoft: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/microsoft/default.svg',
  salesforce: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/salesforce/default.svg',
  servicenow: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/servicenow/default.svg',
  bigquery: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/google-bigquery/default.svg',
  gcs: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/google-cloud-storage/default.svg',
};

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const v = (id: string, value: string, style: string, x: number, y: number, w: number, h: number) =>
  `<mxCell id="${id}" value="${esc(value)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`;
const img = (id: string, url: string, x: number, y: number, w: number, h: number) =>
  v(id, '', `shape=image;imageAspect=0;aspect=fixed;image=${url};align=center;verticalAlign=middle;`, x, y, w, h);
const zone = (id: string, n: number, title: string, sub: string, x: number, y: number, w: number, h: number, accent: string, fill: string) => [
  v(id, '', `rounded=1;arcSize=7;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${accent};strokeWidth=1.5;`, x, y, w, h),
  v(`${id}_n`, String(n), `ellipse;whiteSpace=wrap;html=1;fillColor=${accent};strokeColor=${accent};fontColor=#FFFFFF;fontStyle=1;fontSize=13;align=center;verticalAlign=middle;`, x + 14, y + 13, 30, 30),
  v(`${id}_h`, `<b>${title}</b><br><span style="font-size:9.5px;color:#64748B">${sub}</span>`, 'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=3;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=12.5;', x + 54, y + 8, w - 66, 43),
].join('\n');
const card = (id: string, title: string, body: string, x: number, y: number, w: number, h: number, accent: string, icon = GCP, fill = '#FFFFFF') => [
  v(id, '', `rounded=1;arcSize=8;whiteSpace=wrap;html=1;overflow=hidden;fillColor=${fill};strokeColor=${accent};strokeWidth=1.15;`, x, y, w, h),
  v(`${id}_bar`, '', `rounded=1;arcSize=4;fillColor=${accent};strokeColor=${accent};`, x, y, 5, h),
  img(`${id}_i`, icon, x + 13, y + Math.max(10, (h - 36) / 2), 36, 36),
  v(`${id}_t`, `<b>${title}</b><br><span style="font-size:9.3px;color:#64748B">${body}</span>`, 'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=4;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=11.2;', x + 59, y + 6, w - 69, h - 12),
].join('\n');
const mini = (id: string, title: string, body: string, x: number, y: number, w: number, h: number, accent: string, fill = '#FFFFFF') =>
  v(id, `<b>${title}</b><br><span style="font-size:9px;color:#64748B">${body}</span>`, `rounded=1;arcSize=7;whiteSpace=wrap;html=1;overflow=hidden;spacing=6;fillColor=${fill};strokeColor=${accent};strokeWidth=1.05;fontColor=#0F172A;fontSize=10.7;align=left;verticalAlign=middle;`, x, y, w, h);
const edge = (id: string, s: string, t: string, label: string, color: string, dashed = false, exitX = 1, exitY = .5, entryX = 0, entryY = .5) =>
  `<mxCell id="${id}" value="${esc(label)}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${color};strokeWidth=1.8;${dashed ? 'dashed=1;dashPattern=6 4;' : ''}endArrow=block;endFill=1;fontSize=9.3;fontColor=#334155;labelBackgroundColor=#FFFFFF;exitX=${exitX};exitY=${exitY};entryX=${entryX};entryY=${entryY};" edge="1" parent="1" source="${s}" target="${t}"><mxGeometry relative="1" as="geometry"/></mxCell>`;

export function buildLogicalAiConfigTenantXml(): string {
  const c: string[] = ['<mxCell id="0"/>', '<mxCell id="1" parent="0"/>'];

  c.push(zone('admin', 1, 'IDENTITY & ADMINISTRATION', 'Establish who can use, administer and configure each app', 25, 25, 300, 625, '#1A73E8', '#EFF6FF'));
  c.push(card('idp', 'Enterprise Identity Provider', 'Google Identity or third-party IdP through Workforce Identity Federation', 45, 92, 260, 94, '#1A73E8'));
  c.push(mini('iam_project', 'Project IAM', 'Admin/editor roles and intentionally scoped platform permissions', 45, 210, 260, 78, '#1A73E8'));
  c.push(mini('iam_app', 'App-level IAM', 'Restrict users to specific Gemini Enterprise apps when project-wide user role is not granted', 45, 310, 260, 102, '#1A73E8'));
  c.push(mini('config_admin', 'Gemini Enterprise Admin', 'Create apps/data stores • configure authentication • connectors • feature management • agents', 45, 434, 260, 92, '#1A73E8'));
  c.push(mini('admin_rule', 'Isolation rule', 'Do not use project-level Gemini Enterprise User role when the requirement is app-specific isolation.', 45, 548, 260, 74, '#D93025', '#FFF7F7'));

  c.push(zone('apps', 2, 'APP / TENANT BOUNDARY', 'Separate experiences by business domain, audience and policy', 350, 25, 620, 625, '#7B61A8', '#F7F4FF'));
  c.push(v('app_a', '', 'rounded=1;arcSize=9;fillColor=#FFFFFF;strokeColor=#7B61A8;strokeWidth=1.5;', 375, 92, 270, 450));
  c.push(img('app_a_logo', GCP, 394, 111, 42, 42));
  c.push(v('app_a_title', '<b>Gemini Enterprise App A</b><br><span style="font-size:9.5px;color:#64748B">Example: Commercial / Customer Operations</span>', 'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=4;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=12.5;', 450, 102, 175, 60));
  c.push(mini('app_a_users', 'Audience', 'Commercial users / approved groups', 395, 180, 230, 62, '#7B61A8', '#FAF7FF'));
  c.push(mini('app_a_search', 'Assistant & Search', 'Answers and actions grounded only in data stores connected to App A', 395, 258, 230, 76, '#7B61A8'));
  c.push(mini('app_a_agents', 'Agent Designer', 'Single or multi-step agents using approved App A sources and tools', 395, 350, 230, 76, '#7B61A8'));
  c.push(mini('app_a_features', 'Feature policy', 'Skills / Notebook / sharing enabled only according to tenant governance', 395, 442, 230, 76, '#7B61A8', '#FDF2F8'));

  c.push(v('app_b', '', 'rounded=1;arcSize=9;fillColor=#FFFFFF;strokeColor=#0F8B82;strokeWidth=1.5;', 675, 92, 270, 450));
  c.push(img('app_b_logo', GCP, 694, 111, 42, 42));
  c.push(v('app_b_title', '<b>Gemini Enterprise App B</b><br><span style="font-size:9.5px;color:#64748B">Example: R&D / Regulated Knowledge</span>', 'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=4;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=12.5;', 750, 102, 175, 60));
  c.push(mini('app_b_users', 'Audience', 'R&D users / approved regulated groups', 695, 180, 230, 62, '#0F8B82', '#F0FDFA'));
  c.push(mini('app_b_search', 'Assistant & Search', 'Separate blend of App B data stores with its own permissions boundary', 695, 258, 230, 76, '#0F8B82'));
  c.push(mini('app_b_agents', 'Agent Designer', 'Domain agents limited to App B-approved data and tools', 695, 350, 230, 76, '#0F8B82'));
  c.push(mini('app_b_features', 'Feature policy', 'Different agent/skill/notebook/sharing policy can be governed for this audience', 695, 442, 230, 76, '#0F8B82', '#F0FDFA'));
  c.push(mini('many_many', 'App ↔ data-store model', 'Apps can connect to multiple data stores; a data store can be reused by multiple apps only when policy permits.', 375, 565, 570, 58, '#7B61A8'));

  c.push(zone('data', 3, 'CONNECTORS & DATA STORES', 'Permissions-aware enterprise grounding', 995, 25, 470, 625, '#0F8B82', '#ECFDF5'));
  c.push(card('ds_m365', 'Microsoft 365', 'SharePoint • OneDrive • Outlook connector entities / data stores', 1015, 90, 205, 88, '#0F8B82', ICON.microsoft));
  c.push(card('ds_sf', 'Salesforce', 'CRM objects / entities synchronized into connector data stores', 1238, 90, 205, 88, '#0F8B82', ICON.salesforce));
  c.push(card('ds_sn', 'ServiceNow', 'Service data and knowledge through configured connector data stores', 1015, 196, 205, 88, '#0F8B82', ICON.servicenow));
  c.push(card('ds_bq', 'BigQuery', 'First-party structured data with access-control configuration as required', 1238, 196, 205, 88, '#0F8B82', ICON.bigquery));
  c.push(card('ds_gcs', 'Cloud Storage', 'Unstructured or structured content with metadata and ACL information', 1015, 302, 205, 88, '#0F8B82', ICON.gcs));
  c.push(card('ds_custom', 'Custom Connector', 'Fetch → transform → sync into standardized documents and data stores', 1238, 302, 205, 88, '#0F8B82'));
  c.push(mini('acl', 'Document-level ACLs', 'Source permissions / ACL metadata determine which indexed documents each user can retrieve.', 1015, 416, 428, 72, '#D93025', '#FFF7F7'));
  c.push(mini('identity_map', 'Identity mapping', 'Map external users/groups when connector identities differ from the configured Gemini Enterprise identity provider.', 1015, 504, 428, 76, '#0F8B82'));
  c.push(mini('sync_policy', 'Data lifecycle', 'Federate or ingest as supported • choose sync cadence • monitor connector health and authorization drift', 1015, 596, 428, 34, '#0F8B82'));

  c.push(zone('lifecycle', 4, 'ENVIRONMENTS & CHANGE CONTROL', 'Promote configuration deliberately; do not share production state accidentally', 1490, 25, 245, 625, '#E87900', '#FFF7ED'));
  c.push(mini('dev', 'DEV', 'App/config experiments • non-production sources • test identities', 1510, 92, 205, 82, '#E87900'));
  c.push(mini('test', 'TEST / UAT', 'Representative connectors • ACL validation • agent/skill evaluation', 1510, 194, 205, 82, '#E87900'));
  c.push(mini('prod', 'PRODUCTION', 'Approved app IAM • connector credentials • production data stores • user groups', 1510, 296, 205, 90, '#E87900'));
  c.push(mini('promotion', 'Promotion package', 'Versioned app/agent instructions • connector config references • policy • evaluation evidence', 1510, 408, 205, 88, '#E87900'));
  c.push(mini('separation', 'Separation of duties', 'Admin changes reviewed independently; production connector and IAM changes are auditable.', 1510, 518, 205, 88, '#E87900'));

  // Logical access / grounding paths.
  c.push(edge('e_idp_a', 'idp', 'app_a', 'authenticate', '#2563EB'));
  c.push(edge('e_idp_b', 'idp', 'app_b', 'authenticate', '#2563EB'));
  c.push(edge('e_iama_a', 'iam_app', 'app_a_users', 'authorize App A', '#2563EB', true));
  c.push(edge('e_iamb_b', 'iam_app', 'app_b_users', 'authorize App B', '#2563EB', true));
  c.push(edge('e_appa_m365', 'app_a_search', 'ds_m365', 'connected data store', '#0F8B82'));
  c.push(edge('e_appa_sf', 'app_a_search', 'ds_sf', 'connected data store', '#0F8B82'));
  c.push(edge('e_appb_sn', 'app_b_search', 'ds_sn', 'connected data store', '#0F8B82'));
  c.push(edge('e_appb_bq', 'app_b_search', 'ds_bq', 'connected data store', '#0F8B82'));
  c.push(edge('e_acl_a', 'acl', 'app_a_search', 'permission-filtered results', '#64748B', true, 0, .45, 1, .45));
  c.push(edge('e_acl_b', 'acl', 'app_b_search', 'permission-filtered results', '#64748B', true, 0, .72, 1, .72));
  c.push(edge('e_dev_test', 'dev', 'test', 'promote', '#E87900', true, .5, 1, .5, 0));
  c.push(edge('e_test_prod', 'test', 'prod', 'approve & promote', '#E87900', true, .5, 1, .5, 0));

  c.push(zone('controls', 5, 'CROSS-CUTTING TENANT CONTROLS', 'Prevent privilege bleed, stale permissions and unsafe feature exposure', 25, 680, 1710, 235, '#334155', '#F8FAFC'));
  c.push(card('ctl_identity', 'Identity & Access', 'One identity-provider type per supported location • group claims • app-level IAM where isolation requires it', 50, 745, 315, 86, '#334155'));
  c.push(card('ctl_data', 'Data Access', 'ACL-enabled stores at creation • source permissions • identity mapping • minimum connector scopes', 385, 745, 315, 86, '#334155'));
  c.push(card('ctl_agents', 'Agents & Skills Governance', 'Agent sharing • tool permissions • skill sharing/approval • Notebook/feature policy by audience', 720, 745, 315, 86, '#334155'));
  c.push(card('ctl_security', 'Security & Privacy', 'VPC Service Controls where supported • encryption/CMEK options • audit logs • data residency requirements', 1055, 745, 315, 86, '#334155'));
  c.push(card('ctl_ops', 'Operational Assurance', 'Connector sync health • broken ACL detection • access reviews • agent evaluation • change evidence', 1390, 745, 315, 86, '#334155'));
  c.push(v('rule', '<b>CORE ISOLATION PRINCIPLE:</b> A Gemini Enterprise app is the user-facing boundary for search, actions and agents; data stores/connectors supply the grounded content. Isolation is achieved with intentionally scoped app IAM, connector/data-store ACLs, identity mapping and environment controls—not by drawing arbitrary “tenant databases.”', 'rounded=1;arcSize=6;whiteSpace=wrap;html=1;overflow=hidden;spacing=6;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;fontColor=#475569;fontSize=10.2;align=center;verticalAlign=middle;', 50, 852, 1655, 42));

  return `<mxfile host="app.diagrams.net" modified="2026-08-20T00:00:00.000Z" agent="PromptCanvas" version="24.0.0" type="device"><diagram id="logical_ai_config_tenant" name="Gemini Enterprise App & Tenant Isolation Architecture"><mxGraphModel dx="1760" dy="960" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1760" pageHeight="940" background="#FFFFFF"><root>${c.join('\n')}</root></mxGraphModel></diagram></mxfile>`;
}
