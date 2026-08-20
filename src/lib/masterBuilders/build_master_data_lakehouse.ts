/**
 * Blueprint 9 — Enterprise Open Lakehouse & AI Data Foundation on Google Cloud.
 * Phase 3.2 rebuild aligned to 2026 Lakehouse for Apache Iceberg, Lakehouse runtime
 * catalog, Knowledge Catalog, BigQuery and Managed Service for Apache Spark naming.
 */

const GCP = 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2048%2048%22%3E%3Cpath%20fill%3D%22%23EA4335%22%20d%3D%22M24%209.5c3.54%200%206.71%201.22%209.21%203.6l6.85-6.85C35.9%202.38%2030.47%200%2024%200%2014.62%200%206.51%205.38%202.56%2013.22l7.98%206.19C12.43%2013.72%2017.74%209.5%2024%209.5z%22%2F%3E%3Cpath%20fill%3D%22%234285F4%22%20d%3D%22M46.98%2024.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58%202.96-2.26%205.48-4.78%207.18l7.73%206c4.51-4.18%207.09-10.36%207.09-17.65z%22%2F%3E%3Cpath%20fill%3D%22%23FBBC05%22%20d%3D%22M10.53%2028.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92%2016.46%200%2020.12%200%2024c0%203.88.92%207.54%202.56%2010.78l7.97-6.19z%22%2F%3E%3Cpath%20fill%3D%22%2334A853%22%20d%3D%22M24%2048c6.48%200%2011.93-2.13%2015.89-5.81l-7.73-6c-2.15%201.45-4.92%202.3-8.16%202.3-6.26%200-11.57-4.22-13.47-9.91l-7.98%206.19C6.51%2042.62%2014.62%2048%2024%2048z%22%2F%3E%3C%2Fsvg%3E';

const ICON = {
  bigquery: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/google-bigquery/default.svg',
  gcs: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/google-cloud-storage/default.svg',
  microsoft: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/microsoft/default.svg',
  salesforce: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/salesforce/default.svg',
  sap: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/sap/default.svg',
  snowflake: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/snowflake/default.svg',
  databricks: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/databricks/default.svg',
  kafka: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/apache-kafka/default.svg',
};

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const v = (id: string, value: string, style: string, x: number, y: number, w: number, h: number) =>
  `<mxCell id="${id}" value="${esc(value)}" style="${style}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`;
const img = (id: string, url: string, x: number, y: number, w: number, h: number) =>
  v(id, '', `shape=image;imageAspect=0;aspect=fixed;image=${url};align=center;verticalAlign=middle;`, x, y, w, h);
const zone = (id: string, n: number, title: string, sub: string, x: number, a: number, b: string | number, c: string | number, d?: string, e?: string) => {
  const customGeometry = typeof b === 'number' && typeof c === 'number' && typeof d === 'string' && typeof e === 'string';
  const y = customGeometry ? a : 25;
  const w = customGeometry ? b as number : a;
  const h = customGeometry ? c as number : 625;
  const accent = customGeometry ? d! : b as string;
  const fill = customGeometry ? e! : c as string;
  return [
    v(id, '', `rounded=1;arcSize=8;whiteSpace=wrap;html=1;fillColor=${fill};strokeColor=${accent};strokeWidth=1.5;`, x, y, w, h),
    v(`${id}_n`, String(n), `ellipse;whiteSpace=wrap;html=1;fillColor=${accent};strokeColor=${accent};fontColor=#FFFFFF;fontStyle=1;fontSize=13;align=center;verticalAlign=middle;`, x + 14, y + 15, 30, 30),
    v(`${id}_h`, `<b>${title}</b><br><span style="font-size:9.5px;color:#64748B">${sub}</span>`, 'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=3;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=12.5;', x + 54, y + 10, w - 68, 45),
  ].join('\n');
};
const card = (id: string, title: string, body: string, x: number, y: number, w: number, h: number, accent: string, icon = GCP, fill = '#FFFFFF') => [
  v(id, '', `rounded=1;arcSize=8;whiteSpace=wrap;html=1;overflow=hidden;fillColor=${fill};strokeColor=${accent};strokeWidth=1.15;`, x, y, w, h),
  v(`${id}_bar`, '', `rounded=1;arcSize=4;fillColor=${accent};strokeColor=${accent};`, x, y, 5, h),
  img(`${id}_i`, icon, x + 14, y + Math.max(10, (h - 36) / 2), 36, 36),
  v(`${id}_t`, `<b>${title}</b><br><span style="font-size:9.3px;color:#64748B">${body}</span>`, 'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=4;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=11.2;', x + 60, y + 6, w - 70, h - 12),
].join('\n');
const mini = (id: string, title: string, body: string, x: number, y: number, w: number, h: number, accent: string, fill = '#FFFFFF') =>
  v(id, `<b>${title}</b><br><span style="font-size:9px;color:#64748B">${body}</span>`, `rounded=1;arcSize=7;whiteSpace=wrap;html=1;overflow=hidden;spacing=6;fillColor=${fill};strokeColor=${accent};strokeWidth=1.05;fontColor=#0F172A;fontSize=10.7;align=left;verticalAlign=middle;`, x, y, w, h);
const edge = (id: string, s: string, t: string, label: string, color: string, dashed = false, exitX = 1, exitY = .5, entryX = 0, entryY = .5) =>
  `<mxCell id="${id}" value="${esc(label)}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=${color};strokeWidth=1.8;${dashed ? 'dashed=1;dashPattern=6 4;' : ''}endArrow=block;endFill=1;fontSize=9.3;fontColor=#334155;labelBackgroundColor=#FFFFFF;exitX=${exitX};exitY=${exitY};entryX=${entryX};entryY=${entryY};" edge="1" parent="1" source="${s}" target="${t}"><mxGeometry relative="1" as="geometry"/></mxCell>`;

export function buildDataLakehouseXml(): string {
  const c: string[] = ['<mxCell id="0"/>', '<mxCell id="1" parent="0"/>'];

  c.push(zone('sources', 1, 'ENTERPRISE DATA ESTATE', 'Operational, SaaS, files, streams and cross-cloud sources', 25, 270, '#1A73E8', '#EFF6FF'));
  c.push(card('src_db', 'Operational databases', 'Cloud SQL • AlloyDB • Spanner • Oracle / SQL Server where connected', 45, 92, 230, 82, '#1A73E8'));
  c.push(v('src_saas_bg', '', 'rounded=1;arcSize=7;fillColor=#FFFFFF;strokeColor=#1A73E8;strokeWidth=1.05;', 45, 194, 230, 106));
  c.push(img('src_ms', ICON.microsoft, 62, 214, 34, 34));
  c.push(img('src_sf', ICON.salesforce, 108, 214, 38, 34));
  c.push(img('src_sap', ICON.sap, 160, 214, 42, 34));
  c.push(v('src_saas_t', '<b>Enterprise SaaS & ERP</b><br><span style="font-size:9px;color:#64748B">Microsoft • Salesforce • SAP • approved application sources</span>', 'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=4;align=center;verticalAlign=middle;fontColor=#0F172A;fontSize=10.5;', 55, 254, 210, 36));
  c.push(card('src_files', 'Files & object data', 'Documents • logs • images • semi-structured data • existing object stores', 45, 320, 230, 82, '#1A73E8', ICON.gcs));
  c.push(card('src_stream', 'Streaming events', 'Pub/Sub • Apache Kafka • device/application events', 45, 422, 230, 82, '#1A73E8', ICON.kafka));
  c.push(v('src_cross_bg', '', 'rounded=1;arcSize=7;fillColor=#FFFFFF;strokeColor=#1A73E8;strokeWidth=1.05;', 45, 524, 230, 88));
  c.push(img('src_sf2', ICON.snowflake, 62, 542, 34, 34));
  c.push(img('src_dbx', ICON.databricks, 108, 542, 34, 34));
  c.push(v('src_cross_t', '<b>Cross-cloud catalogs</b><br><span style="font-size:8.8px;color:#64748B">Federated Lakehouse patterns where currently supported; preview capabilities must be validated per provider/region.</span>', 'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=3;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=10.3;', 154, 532, 110, 66));

  c.push(zone('ingest', 2, 'INGEST & CHANGE CAPTURE', 'Land data with explicit batch, CDC and streaming paths', 320, 280, '#0F8B82', '#ECFDF5'));
  c.push(card('datastream', 'Datastream', 'Serverless change data capture for supported operational sources', 340, 92, 240, 82, '#0F8B82'));
  c.push(card('transfer', 'Storage Transfer Service', 'Bulk/object movement from supported filesystems and cloud object stores', 340, 194, 240, 82, '#0F8B82', ICON.gcs));
  c.push(card('pubsub', 'Pub/Sub', 'Durable event ingestion and decoupled streaming transport', 340, 296, 240, 82, '#0F8B82'));
  c.push(card('dataflow', 'Dataflow', 'Streaming/batch transformation, enrichment and event-time processing where required', 340, 398, 240, 88, '#0F8B82'));
  c.push(mini('quality_gate', 'Ingress data contract', 'Schema • event time • source identity • quality checks • classification • replay/idempotency strategy', 340, 508, 240, 90, '#0F8B82'));

  c.push(zone('lakehouse', 3, 'OPEN LAKEHOUSE STORAGE & CATALOG', 'One governed Iceberg foundation with interoperable engines', 625, 390, '#6554C0', '#F5F3FF'));
  c.push(v('lakehouse_shell', '', 'rounded=1;arcSize=10;fillColor=#FFFFFF;strokeColor=#6554C0;strokeWidth=1.6;', 645, 90, 350, 290));
  c.push(img('lakehouse_gcp', GCP, 664, 108, 46, 46));
  c.push(v('lakehouse_title', '<b>Lakehouse for Apache Iceberg</b><br><span style="font-size:9.5px;color:#64748B">Managed open lakehouse on Google Cloud</span>', 'text;html=1;whiteSpace=wrap;overflow=hidden;spacing=4;align=left;verticalAlign=middle;fontColor=#0F172A;fontSize=13;', 724, 101, 250, 58));
  c.push(card('iceberg_storage', 'Apache Iceberg tables', 'Managed Iceberg table data and metadata in Cloud Storage', 665, 182, 310, 78, '#6554C0', ICON.gcs, '#FAF7FF'));
  c.push(mini('runtime_catalog', 'Lakehouse runtime catalog', 'Serverless runtime catalog for shared schemas/metadata across supported BigQuery, Spark, Hive/Flink/Iceberg clients', 665, 278, 310, 84, '#6554C0', '#FAF7FF'));
  c.push(card('bq_native', 'BigQuery native storage', 'Use native BigQuery tables where warehouse semantics/performance and open-table interoperability are not required', 645, 405, 350, 86, '#6554C0', ICON.bigquery));
  c.push(mini('storage_rule', 'Storage design rule', 'Choose native BigQuery vs Iceberg deliberately. Do not duplicate every dataset across both without a workload reason.', 645, 511, 350, 86, '#6554C0'));

  c.push(zone('compute', 4, 'COMPUTE & TRANSFORMATION ENGINES', 'Use the right engine against governed shared data', 1040, 300, '#4285F4', '#EFF6FF'));
  c.push(card('bq', 'BigQuery', 'SQL analytics • ELT • advanced runtime for supported Iceberg workloads • ML/AI SQL features', 1060, 92, 260, 88, '#4285F4', ICON.bigquery));
  c.push(card('spark', 'Managed Service for Apache Spark', 'Managed Spark processing over lakehouse data and supported runtime catalog interfaces', 1060, 202, 260, 88, '#4285F4'));
  c.push(mini('oss', 'Open Iceberg engines', 'Supported Spark / Flink / Hive / Trino-compatible patterns according to catalog/interface support', 1060, 312, 260, 86, '#4285F4'));
  c.push(mini('transform', 'Data transformation', 'SQL/Spark pipelines • tested data contracts • incremental processing • orchestration through supported workflow services', 1060, 420, 260, 92, '#4285F4'));
  c.push(mini('share', 'Data sharing', 'BigQuery sharing / governed tables and views • cross-project/partner access with explicit policy', 1060, 534, 260, 64, '#4285F4'));

  c.push(zone('govern', 5, 'KNOWLEDGE, GOVERNANCE & SECURITY', 'Metadata, semantics and policy must travel with the data', 1365, 370, '#D93025', '#FEF2F2'));
  c.push(card('catalog', 'Knowledge Catalog', 'Central business, technical and operational metadata; discovery, semantics, lineage and governed context', 1385, 92, 330, 92, '#D93025'));
  c.push(card('sdp', 'Sensitive Data Protection', 'Discover/classify sensitive data and feed governance/privacy policy', 1385, 204, 330, 82, '#D93025'));
  c.push(mini('access', 'Access policy', 'IAM • table/dataset permissions • row/column policy where supported • least privilege • service identities', 1385, 306, 330, 88, '#D93025'));
  c.push(mini('credential', 'Connections & credential vending', 'Use short-lived scoped access for supported Lakehouse runtime catalog patterns instead of broad storage credentials', 1385, 414, 330, 92, '#D93025'));
  c.push(mini('perimeter', 'Data security controls', 'Encryption/KMS • audit logs • VPC Service Controls only around supported services • network controls as architecture requires', 1385, 526, 330, 72, '#D93025'));

  c.push(edge('e1', 'src_db', 'datastream', 'CDC', '#2563EB'));
  c.push(edge('e1b', 'src_files', 'transfer', 'bulk/object', '#2563EB'));
  c.push(edge('e1c', 'src_stream', 'pubsub', 'events', '#2563EB'));
  c.push(edge('e2', 'datastream', 'iceberg_storage', 'changes / landing', '#0F8B82'));
  c.push(edge('e2b', 'transfer', 'iceberg_storage', 'objects', '#0F8B82'));
  c.push(edge('e2c', 'pubsub', 'dataflow', 'stream', '#0F8B82'));
  c.push(edge('e2d', 'dataflow', 'iceberg_storage', 'curated stream', '#0F8B82'));
  c.push(edge('e3', 'runtime_catalog', 'bq', 'shared catalog/schema', '#6554C0'));
  c.push(edge('e3b', 'runtime_catalog', 'spark', 'shared catalog/schema', '#6554C0'));
  c.push(edge('e4', 'bq', 'catalog', 'metadata / lineage', '#D93025', true));
  c.push(edge('e4b', 'runtime_catalog', 'catalog', 'governed context', '#D93025', true));

  c.push(zone('consume', 6, 'ANALYTICS, AI & DATA PRODUCTS', 'Activate governed data without collapsing every use case into one tool', 25, 680, 1710, 245, '#334155', '#F8FAFC'));
  c.push(card('consume_bi', 'BI & semantic analytics', 'Looker / approved BI • governed metrics • curated data products', 50, 744, 300, 88, '#334155'));
  c.push(card('consume_ds', 'Data science & ML', 'Vertex AI / notebooks / feature engineering against governed analytical data', 370, 744, 300, 88, '#334155'));
  c.push(card('consume_ge', 'Gemini Enterprise', 'Enterprise search/assistant can consume governed enterprise knowledge through its configured connectors and supported data stores', 690, 744, 300, 88, '#B83280', GCP, '#FDF2F8'));
  c.push(card('consume_agents', 'Gemini Enterprise Agent Platform', 'Custom agents use explicit BigQuery, retrieval or tool/data paths; do not assume Gemini Enterprise connectors are inherited', 1010, 744, 320, 88, '#B83280', GCP, '#FDF2F8'));
  c.push(card('consume_api', 'Data products & APIs', 'Governed tables/views • APIs • event products • partner sharing according to contract', 1350, 744, 350, 88, '#334155'));

  c.push(v('legend', '<b>FLOW</b>  <span style="color:#2563EB">━━ source data</span>  <span style="color:#0F8B82">━━ ingest/transform</span>  <span style="color:#6554C0">━━ lakehouse catalog/compute</span>  <span style="color:#D93025">┄┄ governance/context</span>', 'rounded=1;arcSize=6;whiteSpace=wrap;html=1;overflow=hidden;spacing=5;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;fontColor=#334155;fontSize=10;align=center;verticalAlign=middle;', 50, 856, 770, 40));
  c.push(v('boundary', '<b>2026 NAMING & DESIGN RULE:</b> “BigLake” customer-facing architecture is now Lakehouse for Apache Iceberg; “BigLake metastore” is Lakehouse runtime catalog. Knowledge Catalog provides the governance/context layer. Use cross-cloud federation only where current provider/region support is validated.', 'rounded=1;arcSize=6;whiteSpace=wrap;html=1;overflow=hidden;spacing=6;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;fontColor=#475569;fontSize=10;align=left;verticalAlign=middle;', 840, 856, 860, 40));

  return `<mxfile host="app.diagrams.net" modified="2026-08-20T00:00:00.000Z" agent="PromptCanvas" version="24.0.0" type="device"><diagram id="modern_data_stack_lakehouse" name="Enterprise Open Lakehouse & AI Data Foundation on Google Cloud"><mxGraphModel dx="1760" dy="960" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1760" pageHeight="950" background="#FFFFFF"><root>${c.join('\n')}</root></mxGraphModel></diagram></mxfile>`;
}
