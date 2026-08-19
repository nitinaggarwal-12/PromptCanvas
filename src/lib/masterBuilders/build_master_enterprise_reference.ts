/**
 * Blueprint 6 — Enterprise Reference Architecture
 * Phase 3.1D rebuild.
 *
 * Purpose: high-level orientation across enterprise architecture layers. It deliberately
 * avoids implementation-level topology; detailed network, IAM, DR, MCP, SRE, etc. are
 * separate blueprints in the catalog.
 */

const GCP_LOGO =
  'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2048%2048%22%3E%3Cpath%20fill%3D%22%23EA4335%22%20d%3D%22M24%209.5c3.54%200%206.71%201.22%209.21%203.6l6.85-6.85C35.9%202.38%2030.47%200%2024%200%2014.62%200%206.51%205.38%202.56%2013.22l7.98%206.19C12.43%2013.72%2017.74%209.5%2024%209.5z%22%2F%3E%3Cpath%20fill%3D%22%234285F4%22%20d%3D%22M46.98%2024.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58%202.96-2.26%205.48-4.78%207.18l7.73%206c4.51-4.18%207.09-10.36%207.09-17.65z%22%2F%3E%3Cpath%20fill%3D%22%23FBBC05%22%20d%3D%22M10.53%2028.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92%2016.46%200%2020.12%200%2024c0%203.88.92%207.54%202.56%2010.78l7.97-6.19z%22%2F%3E%3Cpath%20fill%3D%22%2334A853%22%20d%3D%22M24%2048c6.48%200%2011.93-2.13%2015.89-5.81l-7.73-6c-2.15%201.45-4.92%202.3-8.16%202.3-6.26%200-11.57-4.22-13.47-9.91l-7.98%206.19C6.51%2042.62%2014.62%2048%2024%2048z%22%2F%3E%3C%2Fsvg%3E';

const esc = (value: string): string =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

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

const layer = (
  id: string,
  n: number,
  title: string,
  verb: string,
  y: number,
  accent: string,
  fill: string,
): string =>
  [
    v(id, '', `rounded=1;arcSize=7;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${accent};strokeWidth=1.4;shadow=0;`, 25, y, 1190, 118),
    v(`${id}_rail`, '', `rounded=1;arcSize=7;whiteSpace=wrap;html=1;fillColor=${accent};strokeColor=${accent};strokeWidth=1;`, 25, y, 230, 118),
    v(`${id}_n`, String(n), 'ellipse;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#FFFFFF;fontColor=#334155;fontStyle=1;fontSize=14;align=center;verticalAlign=middle;', 42, y + 20, 34, 34),
    v(`${id}_label`, `<b>${title}</b><br><span style="font-size:11px">(${verb})</span>`, 'text;html=1;whiteSpace=wrap;align=left;verticalAlign=middle;fontColor=#FFFFFF;fontSize=15;', 90, y + 16, 150, 76),
  ].join('\n');

const card = (
  id: string,
  code: string,
  title: string,
  subtitle: string,
  x: number,
  y: number,
  width: number,
  accent: string,
  fill = '#FFFFFF',
): string =>
  [
    v(id, '', `rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${accent};strokeWidth=1.1;shadow=0;`, x, y, width, 76),
    v(`${id}_icon`, code, `ellipse;whiteSpace=wrap;html=1;fillColor=${accent};strokeColor=${accent};fontColor=#FFFFFF;fontStyle=1;fontSize=${code.length > 4 ? 8 : 10};align=center;verticalAlign=middle;`, x + 10, y + 18, 40, 40),
    v(`${id}_label`, `<b>${title}</b><br><span style="font-size:9.5px;color:#64748B">${subtitle}</span>`, 'text;html=1;whiteSpace=wrap;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=11.5;', x + 58, y + 7, width - 66, 62),
  ].join('\n');

const cross = (
  id: string,
  code: string,
  title: string,
  subtitle: string,
  y: number,
): string =>
  [
    v(id, '', 'rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#B8C7E6;strokeWidth=1.2;shadow=0;', 1245, y, 300, 104),
    v(`${id}_icon`, code, 'ellipse;whiteSpace=wrap;html=1;fillColor=#1A73E8;strokeColor=#1A73E8;fontColor=#FFFFFF;fontStyle=1;fontSize=9;align=center;verticalAlign=middle;', 1262, y + 30, 42, 42),
    v(`${id}_label`, `<b>${title}</b><br><span style="font-size:9.5px;color:#64748B">${subtitle}</span>`, 'text;html=1;whiteSpace=wrap;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=11.5;', 1318, y + 12, 208, 80),
  ].join('\n');

const e = (id: string, source: string, target: string, accent: string): string =>
  `<mxCell id="${id}" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${accent};strokeWidth=1.7;endArrow=block;endFill=1;exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;" edge="1" parent="1" source="${source}" target="${target}"><mxGeometry relative="1" as="geometry"/></mxCell>`;

export function buildEnterpriseReferenceArchitectureXml(): string {
  const cells: string[] = [
    '<mxCell id="0"/>',
    '<mxCell id="1" parent="0"/>',

    // Six orientation layers. The catalog chrome supplies the title/subtitle.
    layer('experience', 1, 'EXPERIENCE LAYER', 'Engage', 20, '#1565C0', '#EFF6FF'),
    layer('business', 2, 'BUSINESS APPLICATION LAYER', 'Operate', 150, '#E87900', '#FFF7ED'),
    layer('integration', 3, 'INTEGRATION LAYER', 'Connect', 280, '#0F8B82', '#ECFDF5'),
    layer('data', 4, 'DATA LAYER', 'Manage', 410, '#6554C0', '#F5F3FF'),
    layer('ai', 5, 'AI & INTELLIGENCE LAYER', 'Analyze & Decide', 540, '#B83280', '#FDF2F8'),
    layer('platform', 6, 'CLOUD PLATFORM LAYER', 'Build & Run', 670, '#C77B00', '#FFFBEB'),

    // Experience.
    card('exp_web', 'WEB', 'Web', 'Customer and partner web experiences', 275, 41, 165, '#1565C0'),
    card('exp_mobile', 'MOB', 'Mobile', 'Native and mobile web channels', 455, 41, 165, '#1565C0'),
    card('exp_employees', 'EMP', 'Employees', 'Internal workforce experiences', 635, 41, 165, '#1565C0'),
    card('exp_customers', 'CUS', 'Customers', 'External customer journeys', 815, 41, 165, '#1565C0'),
    card('exp_partners', 'B2B', 'Partners', 'B2B and ecosystem access', 995, 41, 165, '#1565C0'),

    // Business apps.
    card('biz_enterprise', 'ERP', 'Enterprise Applications', 'ERP, CRM, HCM and core systems of record', 275, 171, 205, '#E87900'),
    card('biz_saas', 'SaaS', 'SaaS Applications', 'Enterprise productivity and vertical SaaS', 500, 171, 205, '#E87900'),
    card('biz_micro', 'µSVC', 'Microservices', 'Domain services and product APIs', 725, 171, 205, '#E87900'),
    card('biz_workflow', 'BPM', 'Workflow / BPM', 'Business orchestration and human tasks', 950, 171, 210, '#E87900'),

    // Integration.
    card('int_api', 'API', 'APIs & Gateways', 'API management, mediation and synchronous integration', 275, 301, 205, '#0F8B82'),
    card('int_events', 'EVT', 'Event Streaming', 'Pub/Sub, Kafka and event-driven integration', 500, 301, 205, '#0F8B82'),
    card('int_workflows', 'WF', 'Workflows & Orchestration', 'Application and integration orchestration', 725, 301, 205, '#0F8B82'),
    card('int_mcp', 'MCP', 'MCP Gateway & Tools', 'Governed agent-to-tool and enterprise connector access', 950, 301, 210, '#0F8B82'),

    // Data.
    card('data_operational', 'DB', 'Operational Databases', 'Transactional systems and application state', 270, 431, 170, '#6554C0'),
    card('data_lake', 'LAKE', 'Data Lake / Lakehouse', 'Cloud Storage and open/lakehouse data patterns', 450, 431, 190, '#6554C0'),
    card('data_bq', 'BQ', 'BigQuery Analytics', 'Enterprise warehouse and analytical serving', 650, 431, 170, '#6554C0'),
    card('data_stream', 'RT', 'Streaming & Real-Time Data', 'Event-time processing and operational analytics', 830, 431, 170, '#6554C0'),
    card('data_gov', 'GOV', 'Data Governance & Catalog', 'Knowledge Catalog, lineage, quality and access policy', 1010, 431, 150, '#6554C0'),

    // AI & intelligence.
    card('ai_gemini', 'GE', 'Gemini Enterprise', 'Enterprise AI experience and governed knowledge access', 270, 561, 170, '#B83280'),
    card('ai_vertex', 'VAI', 'Vertex AI', 'Model development, inference and AI platform services', 450, 561, 170, '#B83280'),
    card('ai_agents', 'AGT', 'Agentic AI / ADK Agents', 'Agents, Agent Engine and tool orchestration', 630, 561, 180, '#B83280'),
    card('ai_rag', 'RAG', 'RAG & Knowledge', 'Grounding, retrieval and knowledge management', 820, 561, 170, '#B83280'),
    card('ai_eval', 'EVAL', 'Monitoring & Evaluation', 'Quality, safety, evaluation and operational feedback', 1000, 561, 160, '#B83280'),

    // Platform.
    card('plat_compute', 'VM', 'Compute', 'Compute Engine and workload compute', 270, 691, 170, '#C77B00'),
    card('plat_container', 'GKE', 'Containers', 'GKE and enterprise Kubernetes', 450, 691, 170, '#C77B00'),
    card('plat_serverless', 'RUN', 'Serverless', 'Cloud Run and serverless application patterns', 630, 691, 170, '#C77B00'),
    card('plat_storage', 'STOR', 'Storage', 'Object, file, block and managed data services', 810, 691, 170, '#C77B00'),
    card('plat_network', 'NET', 'Networking', 'VPC, NCC, PSC, load balancing and connectivity', 990, 691, 170, '#C77B00'),

    // Cross-cutting capabilities.
    v('cross_bg', '', 'rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#F8FBFF;strokeColor=#8AB4F8;strokeWidth=1.4;', 1230, 20, 330, 768),
    v('cross_title', '<b>CROSS-CUTTING CAPABILITIES</b><br><span style="font-size:10px;color:#64748B">Applied according to workload risk and requirements</span>', 'text;html=1;whiteSpace=wrap;align=center;verticalAlign=middle;fontColor=#1558B0;fontSize=14;', 1245, 32, 300, 52),
    cross('cross_security', 'IAM', 'Security & Identity', 'IAM, federation, zero trust, secrets, encryption and threat protection', 96),
    cross('cross_governance', 'GRC', 'Governance & Compliance', 'Policy, audit, privacy, sovereignty and data/AI governance', 212),
    cross('cross_observability', 'OBS', 'Observability', 'Metrics, logs, traces, SLOs and operational telemetry', 328),
    cross('cross_reliability', 'SRE', 'Reliability & Resilience', 'HA, backup, DR, capacity, incident response and recovery', 444),
    cross('cross_devsecops', 'CI/CD', 'DevSecOps', 'Source, build, test, supply chain, deploy and rollback controls', 560),
    cross('cross_finops', '$', 'FinOps', 'Allocation, budgets, chargeback/showback and optimization', 676),

    // Layer-to-layer orientation flow.
    e('e_exp_biz', 'experience', 'business', '#94A3B8'),
    e('e_biz_int', 'business', 'integration', '#94A3B8'),
    e('e_int_data', 'integration', 'data', '#94A3B8'),
    e('e_data_ai', 'data', 'ai', '#94A3B8'),
    e('e_ai_platform', 'ai', 'platform', '#94A3B8'),

    // Bottom foundation statement.
    v('foundation', '', 'rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#B8C7E6;strokeWidth=1.2;', 25, 820, 1535, 100),
    v('foundation_logo', `<img src="${GCP_LOGO}" width="52" height="52"/>`, 'text;html=1;align=center;verticalAlign=middle;', 55, 842, 70, 58),
    v('foundation_gcp', '<b>Built on Google Cloud</b>', 'text;html=1;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=15;', 140, 842, 245, 58),
    v('foundation_hybrid', '<b>Hybrid & Multi-Cloud Ready</b><br><span style="font-size:9.5px;color:#64748B">Connect existing enterprise environments without pretending every workload must move.</span>', 'text;html=1;whiteSpace=wrap;align=center;verticalAlign=middle;fontColor=#0F172A;fontSize=13;', 405, 835, 315, 70),
    v('foundation_secure', '<b>Secure by Design</b><br><span style="font-size:9.5px;color:#64748B">Identity, policy, encryption, audit and risk controls span every layer.</span>', 'text;html=1;whiteSpace=wrap;align=center;verticalAlign=middle;fontColor=#0F172A;fontSize=13;', 745, 835, 290, 70),
    v('foundation_aiops', '<b>AI-Powered Operations</b><br><span style="font-size:9.5px;color:#64748B">Gemini can assist users and operators; deterministic platform controls remain authoritative.</span>', 'text;html=1;whiteSpace=wrap;align=center;verticalAlign=middle;fontColor=#0F172A;fontSize=13;', 1060, 835, 445, 70),

    // Scope note.
    v('scope_note', '<b>REFERENCE VIEW:</b> This blueprint establishes enterprise orientation and layer boundaries. Use the specialized blueprints for implementation-level network, IAM, DR, MCP, data, SRE, CI/CD and threat-model details.', 'rounded=1;arcSize=6;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;fontColor=#475569;fontSize=10.5;align=center;verticalAlign=middle;', 25, 940, 1535, 42),
  ];

  return `<mxfile host="app.diagrams.net" modified="2026-08-20T00:00:00.000Z" agent="PromptCanvas" version="24.0.0" type="device"><diagram id="enterprise_reference_architecture" name="Enterprise Reference Architecture"><mxGraphModel dx="1600" dy="1000" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1580" pageHeight="1000" background="#FFFFFF"><root>${cells.join('\n')}</root></mxGraphModel></diagram></mxfile>`;
}
