/**
 * Blueprint 20 — Hybrid Multi-Cloud Networking & Gemini Enterprise
 *
 * Phase 3.1A rebuild.
 * Design principles:
 * - Google Cloud network architecture first; Gemini Enterprise is an application/experience consumer.
 * - Explicit primary, resilient/alternate, and governance/control paths.
 * - Editable semantic mxGraph cells; no external icon dependencies or emoji.
 * - Current Google Cloud terminology: Network Connectivity Center, Cloud Interconnect,
 *   HA VPN, Cloud Router, Cross-Cloud Interconnect, Private Service Connect,
 *   Cloud NGFW, Workforce/Workload Identity Federation, Network Intelligence Center.
 */

const GCP_LOGO =
  'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2048%2048%22%3E%3Cpath%20fill%3D%22%23EA4335%22%20d%3D%22M24%209.5c3.54%200%206.71%201.22%209.21%203.6l6.85-6.85C35.9%202.38%2030.47%200%2024%200%2014.62%200%206.51%205.38%202.56%2013.22l7.98%206.19C12.43%2013.72%2017.74%209.5%2024%209.5z%22%2F%3E%3Cpath%20fill%3D%22%234285F4%22%20d%3D%22M46.98%2024.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58%202.96-2.26%205.48-4.78%207.18l7.73%206c4.51-4.18%207.09-10.36%207.09-17.65z%22%2F%3E%3Cpath%20fill%3D%22%23FBBC05%22%20d%3D%22M10.53%2028.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92%2016.46%200%2020.12%200%2024c0%203.88.92%207.54%202.56%2010.78l7.97-6.19z%22%2F%3E%3Cpath%20fill%3D%22%2334A853%22%20d%3D%22M24%2048c6.48%200%2011.93-2.13%2015.89-5.81l-7.73-6c-2.15%201.45-4.92%202.3-8.16%202.3-6.26%200-11.57-4.22-13.47-9.91l-7.98%206.19C6.51%2042.62%2014.62%2048%2024%2048z%22%2F%3E%3C%2Fsvg%3E';

const GEMINI_MARK =
  'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%234285F4%22%2F%3E%3Cstop%20offset%3D%22.5%22%20stop-color%3D%22%237B61FF%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23D965C5%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Cpath%20fill%3D%22url(%23g)%22%20d%3D%22M32%204C35%2022%2042%2029%2060%2032C42%2035%2035%2042%2032%2060C29%2042%2022%2035%204%2032C22%2029%2029%2022%2032%204Z%22%2F%3E%3C%2Fsvg%3E';

const esc = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const vertex = (
  id: string,
  value: string,
  style: string,
  x: number,
  y: number,
  width: number,
  height: number,
): string =>
  `<mxCell id="${id}" value="${esc(value)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${width}" height="${height}" as="geometry"/></mxCell>`;

const imageVertex = (
  id: string,
  image: string,
  x: number,
  y: number,
  width: number,
  height: number,
): string =>
  `<mxCell id="${id}" value="" style="shape=image;image=${image};aspect=fixed;verticalLabelPosition=bottom;verticalAlign=top;" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${width}" height="${height}" as="geometry"/></mxCell>`;

const zone = (
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
    vertex(
      `${id}_bg`,
      '',
      `rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${stroke};strokeWidth=1.5;shadow=0;`,
      x,
      y,
      width,
      height,
    ),
    vertex(
      `${id}_title`,
      title,
      `rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=none;fontColor=${stroke};fontStyle=1;fontSize=15;align=center;verticalAlign=middle;spacing=4;`,
      x + 8,
      y + 8,
      width - 16,
      38,
    ),
  ].join('\n');

const card = (
  id: string,
  code: string,
  title: string,
  subtitle: string,
  x: number,
  y: number,
  width: number,
  height: number,
  accent = '#1A73E8',
  fill = '#FFFFFF',
): string => {
  const badgeW = 42;
  return [
    vertex(
      `${id}_bg`,
      '',
      `rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${accent};strokeWidth=1.2;shadow=0;`,
      x,
      y,
      width,
      height,
    ),
    vertex(
      `${id}_badge`,
      code,
      `ellipse;whiteSpace=wrap;html=1;fillColor=${accent};strokeColor=${accent};fontColor=#FFFFFF;fontStyle=1;fontSize=${code.length > 4 ? 8 : 10};align=center;verticalAlign=middle;`,
      x + 10,
      y + Math.max(8, (height - 32) / 2),
      32,
      32,
    ),
    vertex(
      `${id}_label`,
      `<b>${title}</b><br><span style="font-size:10px;color:#475569">${subtitle}</span>`,
      `text;html=1;whiteSpace=wrap;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=12;spacingLeft=4;`,
      x + badgeW + 8,
      y + 4,
      width - badgeW - 16,
      height - 8,
    ),
  ].join('\n');
};

const compact = (
  id: string,
  code: string,
  title: string,
  x: number,
  y: number,
  width: number,
  accent = '#1A73E8',
  fill = '#FFFFFF',
): string =>
  [
    vertex(
      `${id}_bg`,
      '',
      `rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${accent};strokeWidth=1.2;shadow=0;`,
      x,
      y,
      width,
      52,
    ),
    vertex(
      `${id}_badge`,
      code,
      `ellipse;whiteSpace=wrap;html=1;fillColor=${accent};strokeColor=${accent};fontColor=#FFFFFF;fontStyle=1;fontSize=${code.length > 4 ? 8 : 10};align=center;verticalAlign=middle;`,
      x + 8,
      y + 10,
      32,
      32,
    ),
    vertex(
      `${id}_label`,
      `<b>${title}</b>`,
      'text;html=1;whiteSpace=wrap;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=11;spacingLeft=3;',
      x + 46,
      y + 4,
      width - 52,
      44,
    ),
  ].join('\n');

const edge = (
  id: string,
  source: string,
  target: string,
  label: string,
  kind: 'primary' | 'backup' | 'control' = 'primary',
  exitX = 1,
  exitY = 0.5,
  entryX = 0,
  entryY = 0.5,
): string => {
  const spec =
    kind === 'primary'
      ? { stroke: '#2563EB', width: 2, dashed: 0, arrow: 'block' }
      : kind === 'backup'
        ? { stroke: '#2563EB', width: 1.8, dashed: 1, arrow: 'block' }
        : { stroke: '#188038', width: 1.6, dashed: 1, arrow: 'open' };
  return `<mxCell id="${id}" value="${esc(label)}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${spec.stroke};strokeWidth=${spec.width};dashed=${spec.dashed};dashPattern=${kind === 'control' ? '2 4' : '6 4'};endArrow=${spec.arrow};endFill=${spec.arrow === 'block' ? 1 : 0};fontColor=#334155;fontSize=10;labelBackgroundColor=#FFFFFF;labelBorderColor=none;exitX=${exitX};exitY=${exitY};exitDx=0;exitDy=0;entryX=${entryX};entryY=${entryY};entryDx=0;entryDy=0;" edge="1" parent="1" source="${source}" target="${target}"><mxGeometry relative="1" as="geometry"/></mxCell>`;
};

const routedEdge = (
  id: string,
  source: string,
  target: string,
  label: string,
  points: Array<[number, number]>,
  kind: 'primary' | 'backup' | 'control' = 'primary',
  exitX = 1,
  exitY = 0.5,
  entryX = 0,
  entryY = 0.5,
): string => {
  const spec =
    kind === 'primary'
      ? { stroke: '#2563EB', width: 2, dashed: 0, arrow: 'block' }
      : kind === 'backup'
        ? { stroke: '#2563EB', width: 1.8, dashed: 1, arrow: 'block' }
        : { stroke: '#188038', width: 1.6, dashed: 1, arrow: 'open' };
  const pointXml = points.map(([x, y]) => `<mxPoint x="${x}" y="${y}"/>`).join('');
  return `<mxCell id="${id}" value="${esc(label)}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${spec.stroke};strokeWidth=${spec.width};dashed=${spec.dashed};dashPattern=${kind === 'control' ? '2 4' : '6 4'};endArrow=${spec.arrow};endFill=${spec.arrow === 'block' ? 1 : 0};fontColor=#334155;fontSize=10;labelBackgroundColor=#FFFFFF;labelBorderColor=none;exitX=${exitX};exitY=${exitY};exitDx=0;exitDy=0;entryX=${entryX};entryY=${entryY};entryDx=0;entryDy=0;" edge="1" parent="1" source="${source}" target="${target}"><mxGeometry relative="1" as="geometry"><Array as="points">${pointXml}</Array></mxGeometry></mxCell>`;
};

const band = (
  id: string,
  title: string,
  x: number,
  y: number,
  width: number,
  height: number,
  accent: string,
): string =>
  [
    vertex(
      `${id}_bg`,
      '',
      `rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=${accent};strokeWidth=1.4;`,
      x,
      y,
      width,
      height,
    ),
    vertex(
      `${id}_title`,
      title,
      `text;html=1;whiteSpace=wrap;align=center;verticalAlign=middle;fontColor=${accent};fontStyle=1;fontSize=15;`,
      x + 12,
      y + 5,
      width - 24,
      28,
    ),
  ].join('\n');

export function buildHybridMultiCloudXml(): string {
  const cells: string[] = [];

  cells.push(zone('zone_onprem', '1. ON-PREMISES / ENTERPRISE', 25, 20, 250, 600, '#188038', '#F7FCF8'));
  cells.push(zone('zone_hybrid', '2. HYBRID CONNECTIVITY', 290, 20, 235, 600, '#188038', '#F7FCF8'));
  cells.push(zone('zone_gcp', '3. GOOGLE CLOUD NETWORK FOUNDATION', 540, 20, 620, 600, '#1A73E8', '#F7FAFF'));
  cells.push(zone('zone_multi', '4. MULTI-CLOUD CONNECTIVITY', 1175, 20, 260, 600, '#7E57C2', '#FBF8FF'));
  cells.push(zone('zone_sources', '5. ENTERPRISE / SAAS & DATA SOURCES', 1450, 20, 305, 600, '#188038', '#F7FCF8'));

  cells.push(card('onprem_users', 'USR', 'Corporate & Remote Users', 'Managed devices and enterprise access paths', 38, 78, 224, 78, '#334155'));
  cells.push(card('onprem_idp', 'IDP', 'Enterprise IdP', 'Microsoft Entra ID / Okta / AD-backed identity', 38, 168, 224, 78, '#188038'));
  cells.push(card('onprem_apps', 'APP', 'Data Center Applications', 'Private line-of-business and shared services', 38, 258, 224, 78, '#1A73E8'));
  cells.push(card('onprem_data', 'DB', 'Private Apps & Data', 'Databases, file services, internal APIs', 38, 348, 224, 78, '#475569'));
  cells.push(card('onprem_dns', 'DNS', 'Enterprise DNS', 'Conditional forwarding / private resolution', 38, 438, 224, 78, '#1A73E8'));
  cells.push(card('onprem_edge', 'CE', 'Customer Edge / SD-WAN', 'Redundant routers; BGP-capable enterprise edge', 38, 528, 224, 74, '#188038'));

  cells.push(card('hyb_interconnect', 'CI', 'Cloud Interconnect', 'Dedicated or Partner Interconnect for private hybrid transport', 303, 82, 209, 88, '#1A73E8'));
  cells.push(card('hyb_vpn', 'VPN', 'HA VPN (Cloud VPN)', 'Encrypted resilient / alternate connectivity path', 303, 184, 209, 84, '#1A73E8'));
  cells.push(card('hyb_router', 'CR', 'Cloud Router', 'Managed BGP route exchange for Interconnect and VPN', 303, 282, 209, 84, '#1A73E8'));
  cells.push(card('hyb_ncc', 'NCC', 'Network Connectivity Center', 'Central logical hub for VPC and hybrid/multicloud spokes', 303, 380, 209, 96, '#188038'));
  cells.push(card('hyb_dns', 'DNS', 'Hybrid DNS Integration', 'Cloud DNS forwarding / peering patterns as required', 303, 490, 209, 88, '#188038'));

  cells.push(imageVertex('gcp_logo', GCP_LOGO, 554, 63, 34, 34));
  cells.push(card('gcp_shared_vpc', 'VPC', 'Shared VPC / VPC Spoke Foundation', 'Host-project governance with workload VPCs and explicit trust boundaries', 596, 64, 548, 78, '#1A73E8'));

  cells.push(vertex('gcp_vpc_segment_bg', '', 'rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#93B4F5;strokeWidth=1.2;', 554, 156, 286, 260));
  cells.push(vertex('gcp_vpc_segment_title', 'SEGMENTED WORKLOAD NETWORKS', 'text;html=1;align=center;verticalAlign=middle;fontStyle=1;fontSize=12;fontColor=#1A73E8;', 566, 164, 262, 26));
  cells.push(card('gcp_app_spoke', 'APP', 'Application Spoke', 'Private application subnets / service projects', 568, 198, 258, 64, '#1A73E8'));
  cells.push(card('gcp_data_spoke', 'DATA', 'Data Spoke', 'Private data services and controlled service access', 568, 274, 258, 64, '#7E57C2'));
  cells.push(card('gcp_mgmt_spoke', 'MGMT', 'Shared Services / Management', 'Central tooling, DNS, security and administration', 568, 350, 258, 54, '#188038'));

  cells.push(vertex('gcp_network_services_bg', '', 'rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#93B4F5;strokeWidth=1.2;', 852, 156, 292, 260));
  cells.push(vertex('gcp_network_services_title', 'NETWORK & SECURITY SERVICES', 'text;html=1;align=center;verticalAlign=middle;fontStyle=1;fontSize=12;fontColor=#1A73E8;', 864, 164, 268, 26));
  cells.push(compact('gcp_dns', 'DNS', 'Cloud DNS', 866, 198, 128, '#1A73E8'));
  cells.push(compact('gcp_nat', 'NAT', 'Cloud NAT', 1004, 198, 126, '#1A73E8'));
  cells.push(compact('gcp_psc', 'PSC', 'Private Service Connect', 866, 260, 128, '#7E57C2'));
  cells.push(compact('gcp_lb', 'LB', 'Cloud Load Balancing', 1004, 260, 126, '#1A73E8'));
  cells.push(compact('gcp_ngfw', 'FW', 'Cloud NGFW / Firewall Policies', 866, 322, 128, '#188038'));
  cells.push(compact('gcp_cci', 'CCI', 'Cross-Cloud Interconnect', 1004, 322, 126, '#7E57C2'));

  cells.push(vertex('gcp_app_ai_bg', '', 'rounded=1;arcSize=6;fillColor=#FFFFFF;strokeColor=#93B4F5;strokeWidth=1.2;', 554, 430, 590, 172));
  cells.push(vertex('gcp_app_ai_title', 'APPLICATION & AI PLATFORMS', 'text;html=1;align=center;verticalAlign=middle;fontStyle=1;fontSize=13;fontColor=#1A73E8;', 566, 438, 566, 26));
  cells.push(compact('gcp_cloud_run', 'RUN', 'Cloud Run', 568, 474, 132, '#1A73E8'));
  cells.push(compact('gcp_gke', 'GKE', 'Google Kubernetes Engine', 710, 474, 150, '#1A73E8'));
  cells.push(compact('gcp_vertex', 'VAI', 'Vertex AI', 870, 474, 126, '#7E57C2'));
  cells.push(compact('gcp_gemini', 'GE', 'Gemini Enterprise', 1006, 474, 124, '#7E57C2', '#FCF9FF'));
  cells.push(card('gcp_api', 'API', 'Enterprise APIs & Connectors', 'Approved application/API access to enterprise systems', 568, 536, 276, 54, '#188038'));
  cells.push(card('gcp_private_access', 'PGA', 'Private Google Access / Private Endpoints', 'Use the access pattern supported by the target service', 856, 536, 274, 54, '#188038'));

  cells.push(vertex('aws_bg', '', 'rounded=1;arcSize=6;fillColor=#FFF9F1;strokeColor=#F59E0B;strokeWidth=1.2;', 1188, 72, 234, 242));
  cells.push(vertex('aws_title', 'AWS', 'text;html=1;align=center;verticalAlign=middle;fontStyle=1;fontSize=18;fontColor=#D97706;', 1200, 80, 210, 28));
  cells.push(card('aws_vpc', 'VPC', 'AWS VPC', 'Private workload networks', 1200, 116, 210, 58, '#D97706'));
  cells.push(card('aws_tgw', 'TGW', 'AWS Transit Gateway', 'AWS-side hub and route domains', 1200, 184, 210, 58, '#7E57C2'));
  cells.push(card('aws_dx_vpn', 'DX', 'Direct Connect / VPN Edge', 'CSP-side attachment or encrypted alternative', 1200, 252, 210, 50, '#7E57C2'));

  cells.push(vertex('azure_bg', '', 'rounded=1;arcSize=6;fillColor=#F4F9FF;strokeColor=#2563EB;strokeWidth=1.2;', 1188, 330, 234, 258));
  cells.push(vertex('azure_title', 'MICROSOFT AZURE', 'text;html=1;align=center;verticalAlign=middle;fontStyle=1;fontSize=16;fontColor=#0078D4;', 1200, 338, 210, 28));
  cells.push(card('azure_vnet', 'VNET', 'Azure VNet', 'Private workload networks', 1200, 374, 210, 58, '#0078D4'));
  cells.push(card('azure_wan', 'vWAN', 'Virtual WAN / Routing Hub', 'Azure-side routing and segmentation', 1200, 442, 210, 58, '#7E57C2'));
  cells.push(card('azure_er_vpn', 'ER', 'ExpressRoute / VPN Edge', 'CSP-side attachment or encrypted alternative', 1200, 510, 210, 62, '#7E57C2'));

  cells.push(card('src_saas', 'SaaS', 'Enterprise SaaS & Connectors', 'Workday, Salesforce, ServiceNow and approved SaaS', 1464, 88, 277, 96, '#188038'));
  cells.push(card('src_private_services', 'PRV', 'Private Producer / Partner Services', 'PSC or private partner connectivity where supported', 1464, 202, 277, 92, '#7E57C2'));
  cells.push(card('src_db_api', 'DB', 'Remote Databases & APIs', 'Oracle, SQL Server and managed/private APIs as applicable', 1464, 312, 277, 96, '#1A73E8'));
  cells.push(card('src_partners', 'B2B', 'Partners & Extranets', 'Approved B2B private or controlled external access', 1464, 426, 277, 78, '#188038'));
  cells.push(card('src_internet', 'NET', 'Public Internet / External APIs', 'Only through explicit ingress/egress security controls', 1464, 522, 277, 72, '#334155'));

  cells.push(edge('e_onprem_ci', 'onprem_edge_bg', 'hyb_interconnect_bg', 'Private hybrid transport', 'primary'));
  cells.push(edge('e_onprem_vpn', 'onprem_edge_bg', 'hyb_vpn_bg', 'Encrypted resilience', 'backup', 1, 0.7, 0, 0.5));
  cells.push(edge('e_ci_router', 'hyb_interconnect_bg', 'hyb_router_bg', 'VLAN attachment / BGP', 'primary', 0.5, 1, 0.5, 0));
  cells.push(edge('e_vpn_router', 'hyb_vpn_bg', 'hyb_router_bg', 'BGP over HA VPN', 'backup', 0.5, 1, 0.5, 0));
  cells.push(edge('e_router_ncc', 'hyb_router_bg', 'hyb_ncc_bg', 'Dynamic routes', 'primary', 0.5, 1, 0.5, 0));
  cells.push(edge('e_ncc_vpc', 'hyb_ncc_bg', 'gcp_shared_vpc_bg', 'NCC hub / VPC spokes', 'primary'));
  cells.push(edge('e_dns_hybrid', 'onprem_dns_bg', 'hyb_dns_bg', 'Private DNS forwarding', 'control'));
  cells.push(edge('e_hybdns_clouddns', 'hyb_dns_bg', 'gcp_dns_bg', 'Cloud DNS resolution', 'control'));

  cells.push(edge('e_shared_app', 'gcp_shared_vpc_bg', 'gcp_app_spoke_bg', 'Segmented workload routing', 'primary', 0.28, 1, 0.5, 0));
  cells.push(edge('e_shared_data', 'gcp_shared_vpc_bg', 'gcp_data_spoke_bg', 'Segmented workload routing', 'primary', 0.5, 1, 0.5, 0));
  cells.push(edge('e_shared_mgmt', 'gcp_shared_vpc_bg', 'gcp_mgmt_spoke_bg', 'Shared services', 'primary', 0.72, 1, 0.5, 0));
  cells.push(edge('e_vpc_platform', 'gcp_app_spoke_bg', 'gcp_cloud_run_bg', 'Private application traffic', 'primary', 0.5, 1, 0.5, 0));
  cells.push(edge('e_data_platform', 'gcp_data_spoke_bg', 'gcp_api_bg', 'Governed service/data access', 'primary', 0.6, 1, 0.3, 0));
  cells.push(edge('e_platform_gemini', 'gcp_api_bg', 'gcp_gemini_bg', 'Governed connectors / APIs', 'primary', 1, 0.45, 0, 0.65));

  cells.push(routedEdge('e_cci_aws', 'gcp_cci_bg', 'aws_dx_vpn_bg', 'Cross-Cloud Interconnect', [[1167, 348], [1167, 277]], 'primary'));
  cells.push(routedEdge('e_cci_azure', 'gcp_cci_bg', 'azure_er_vpn_bg', 'Cross-Cloud Interconnect', [[1167, 348], [1167, 541]], 'primary'));

  cells.push(routedEdge('e_psc_private', 'gcp_psc_bg', 'src_private_services_bg', 'Private service access where supported', [[1148, 612], [1440, 612], [1440, 248]], 'primary'));
  cells.push(routedEdge('e_nat_saas', 'gcp_nat_bg', 'src_saas_bg', 'Approved egress / SaaS access', [[1144, 606], [1444, 606], [1444, 136]], 'primary'));
  cells.push(routedEdge('e_api_db', 'gcp_api_bg', 'src_db_api_bg', 'Application / API access', [[1138, 616], [1436, 616], [1436, 360]], 'primary'));
  cells.push(routedEdge('e_lb_partners', 'gcp_lb_bg', 'src_partners_bg', 'Approved B2B ingress', [[1132, 602], [1432, 602], [1432, 465]], 'primary'));
  cells.push(routedEdge('e_nat_internet', 'gcp_nat_bg', 'src_internet_bg', 'Controlled outbound access', [[1126, 598], [1428, 598], [1428, 558]], 'primary'));

  cells.push(band('security', 'SECURITY & IDENTITY — CROSS-CUTTING', 25, 640, 1730, 122, '#1A73E8'));
  const sx = 42;
  const sw = 198;
  const sg = 12;
  const securityItems = [
    ['sec_iam', 'IAM', 'Cloud IAM', 'Least-privilege authorization'],
    ['sec_wif_user', 'WIF', 'Workforce Identity Federation', 'External workforce SSO / authorization'],
    ['sec_wif_workload', 'WLD', 'Workload Identity Federation', 'Short-lived external workload credentials'],
    ['sec_ngfw', 'FW', 'Cloud NGFW', 'Hierarchical / network firewall policies'],
    ['sec_kms', 'KMS', 'Cloud KMS & Secret Manager', 'Encryption keys and application secrets'],
    ['sec_vpcsc', 'VPC-SC', 'VPC Service Controls', 'Service perimeters for supported services'],
    ['sec_audit', 'AUD', 'Cloud Audit Logs', 'Administrative and data-access evidence'],
    ['sec_scc', 'SCC', 'Security Command Center', 'Security posture and findings'],
  ];
  securityItems.forEach(([id, code, title, subtitle], index) => {
    cells.push(card(id, code, title, subtitle, sx + index * (sw + sg), 679, sw, 66, index < 3 ? '#1A73E8' : '#188038', '#FFFFFF'));
  });

  cells.push(band('observability', 'OBSERVABILITY & NETWORK OPERATIONS — CROSS-CUTTING', 25, 776, 1730, 122, '#7E57C2'));
  const ox = 42;
  const ow = 222;
  const og = 17;
  const obsItems = [
    ['obs_nic', 'NIC', 'Network Intelligence Center', 'Topology, analysis and troubleshooting'],
    ['obs_cni', 'CNI', 'Cloud Network Insights', 'Hybrid / multicloud synthetic path health'],
    ['obs_mon', 'MON', 'Cloud Monitoring', 'Metrics, dashboards and alerting'],
    ['obs_log', 'LOG', 'Cloud Logging', 'Centralized operational logs'],
    ['obs_flow', 'FLOW', 'VPC Flow Logs / Flow Analyzer', 'Traffic visibility and investigation'],
    ['obs_test', 'TEST', 'Connectivity Tests', 'Configuration-aware path validation'],
    ['obs_route', 'RT', 'Routing & BGP Telemetry', 'Route state, advertisements and change review'],
  ];
  obsItems.forEach(([id, code, title, subtitle], index) => {
    cells.push(card(id, code, title, subtitle, ox + index * (ow + og), 815, ow, 66, '#7E57C2', '#FFFFFF'));
  });

  cells.push(vertex('control_spine', '', 'shape=line;strokeColor=#188038;strokeWidth=1.6;dashed=1;dashPattern=2 4;', 70, 628, 1640, 1));
  [150, 405, 850, 1305, 1600].forEach((x, index) => {
    cells.push(vertex(`control_up_${index}`, '', 'shape=line;direction=north;strokeColor=#188038;strokeWidth=1.6;dashed=1;dashPattern=2 4;endArrow=open;endFill=0;', x, 616, 1, 14));
  });

  cells.push(vertex('legend_bg', '', 'rounded=1;arcSize=5;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;', 80, 916, 1090, 50));
  cells.push(vertex('legend_title', 'LEGEND', 'text;html=1;align=left;verticalAlign=middle;fontStyle=1;fontSize=12;fontColor=#0F172A;', 96, 927, 80, 26));
  cells.push(vertex('legend_primary_line', '', 'shape=line;strokeColor=#2563EB;strokeWidth=2;endArrow=block;endFill=1;', 186, 937, 78, 1));
  cells.push(vertex('legend_primary_text', 'Primary private / application data path', 'text;html=1;align=left;verticalAlign=middle;fontSize=11;fontColor=#334155;', 272, 926, 256, 26));
  cells.push(vertex('legend_backup_line', '', 'shape=line;strokeColor=#2563EB;strokeWidth=1.8;dashed=1;dashPattern=6 4;endArrow=block;endFill=1;', 536, 937, 78, 1));
  cells.push(vertex('legend_backup_text', 'Resilient / alternate encrypted path', 'text;html=1;align=left;verticalAlign=middle;fontSize=11;fontColor=#334155;', 622, 926, 238, 26));
  cells.push(vertex('legend_control_line', '', 'shape=line;strokeColor=#188038;strokeWidth=1.6;dashed=1;dashPattern=2 4;endArrow=open;endFill=0;', 870, 937, 78, 1));
  cells.push(vertex('legend_control_text', 'Identity / policy / observability control plane', 'text;html=1;align=left;verticalAlign=middle;fontSize=11;fontColor=#334155;', 956, 926, 200, 30));

  cells.push(vertex('gemini_note1_bg', '', 'rounded=1;arcSize=6;fillColor=#FCF9FF;strokeColor=#7E57C2;strokeWidth=1.2;dashed=1;', 1190, 916, 565, 58));
  cells.push(imageVertex('gemini_note1_icon', GEMINI_MARK, 1206, 928, 32, 32));
  cells.push(vertex('gemini_note1_text', '<b>Gemini Enterprise:</b> application / experience layer that reaches governed enterprise data and APIs through approved connectors, identity controls, and source-specific connectivity.', 'text;html=1;whiteSpace=wrap;align=left;verticalAlign=middle;fontSize=11;fontColor=#334155;', 1248, 922, 490, 46));

  cells.push(vertex('gemini_note2_bg', '', 'rounded=1;arcSize=6;fillColor=#F7FAFF;strokeColor=#1A73E8;strokeWidth=1.2;dashed=1;', 80, 980, 1675, 46));
  cells.push(vertex('gemini_note2_text', '<b>Gemini-assisted operations:</b> advisory use of telemetry, topology, incidents and runbooks for troubleshooting, summarization and recommendations. It does <b>not</b> become the routing, BGP, firewall, or packet-forwarding data plane.', 'text;html=1;whiteSpace=wrap;align=center;verticalAlign=middle;fontSize=11;fontColor=#334155;', 100, 986, 1635, 34));

  return `<mxfile host="app.diagrams.net" agent="PromptCanvas" version="24.7.17" type="device">
  <diagram id="hybrid_multicloud_networking" name="Hybrid Multi-Cloud Networking &amp; Gemini Enterprise">
    <mxGraphModel dx="1780" dy="1030" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1780" pageHeight="1030" math="0" shadow="0" background="#FFFFFF">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${cells.join('\n        ')}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
