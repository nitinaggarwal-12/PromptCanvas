/**
 * 🎨 Blueprint #54 (NEW-DAT-04): Enterprise ETL/ELT & CDC Data Pipeline Architecture
 * High-Craft Master Blueprint (Benchmark Pattern following Blueprint 50)
 * 
 * Featuring:
 * - Operational Sources (Oracle RAC, Cloud SQL PostgreSQL/MySQL, Salesforce SaaS, Kafka Streams)
 * - Real-Time Ingestion & CDC Tier (Google Cloud Datastream, BigQuery DTS, Pub/Sub, Bronze Landing GCS)
 * - Orchestration & Stream Transformation (Cloud Composer Airflow 2.10, Cloud Dataflow Beam, Dataform SQLX, DLQ)
 * - BigQuery Medallion Lakehouse (Bronze Raw, Silver Curated SCD-2, Gold Dimensional Marts)
 * - Governance, Catalog & Lineage Plane (Dataplex Universal Catalog, Column-Level Tags, DLP, Looker Studio)
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
  db: svg('<ellipse cx="24" cy="11" rx="14" ry="6" fill="#7E57C2"/><path d="M10 11v24c0 3.3 6.3 6 14 6s14-2.7 14-6V11" fill="#B8A6E6"/><ellipse cx="24" cy="35" rx="14" ry="6" fill="#7E57C2"/>'),
  datastream: svg('<circle cx="16" cy="24" r="8" fill="#0284C7"/><circle cx="32" cy="24" r="8" fill="#0284C7"/><path d="M16 24h16" stroke="#fff" stroke-width="3"/>'),
  composer: svg('<rect x="8" y="8" width="32" height="32" rx="6" fill="#0284C7"/><path d="M14 24h20M24 14v20" stroke="#fff" stroke-width="3.5"/>'),
  dataflow: svg('<circle cx="24" cy="24" r="16" fill="none" stroke="#0284C7" stroke-width="3"/><circle cx="24" cy="12" r="4" fill="#0284C7"/><circle cx="14" cy="30" r="4" fill="#0284C7"/><circle cx="34" cy="30" r="4" fill="#0284C7"/>'),
  bq: svg('<ellipse cx="24" cy="12" rx="14" ry="6" fill="#1D4ED8"/><path d="M10 12v18c0 3.3 6.3 6 14 6s14-2.7 14-6V12" fill="#93C5FD"/><ellipse cx="24" cy="30" rx="14" ry="6" fill="#1D4ED8"/>'),
  dataplex: svg('<circle cx="24" cy="24" r="6" fill="#0284C7"/><circle cx="12" cy="14" r="4" fill="#0284C7"/><circle cx="36" cy="14" r="4" fill="#0284C7"/><circle cx="12" cy="34" r="4" fill="#0284C7"/><circle cx="36" cy="34" r="4" fill="#0284C7"/><path d="M12 14l12 10 12-10M12 34l12-10 12 10" stroke="#0284C7" stroke-width="2"/>'),
  gcs: svg('<rect x="8" y="10" width="32" height="28" rx="4" fill="#0284C7"/><path d="M14 18h20M14 24h20M14 30h12" stroke="#fff" stroke-width="2"/>'),
  looker: svg('<circle cx="16" cy="24" r="6" fill="#9333EA"/><circle cx="32" cy="16" r="6" fill="#0284C7"/><circle cx="32" cy="32" r="6" fill="#16A34A"/><path d="M16 24l16-8M16 24l16 8" stroke="#64748B" stroke-width="2"/>'),
  shield: svg('<path d="M24 4 40 10v12c0 11-6.5 18-16 22C14.5 40 8 33 8 22V10z" fill="#16A34A"/><path d="m16 24 5 5 11-13" fill="none" stroke="#fff" stroke-width="3"/>'),
  app: svg('<rect x="7" y="8" width="34" height="32" rx="4" fill="#334155"/><path d="M13 15h22M13 21h22M13 27h15" stroke="#fff" stroke-width="2"/>')
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

export function buildMasterEtlEltCdcPipelineXml(): string {
  const cells: string[] = [
    '<mxCell id="0"/>',
    '<mxCell id="1" parent="0"/>',

    // Lane 1: Operational Sources
    lane('sources', 1, 'OPERATIONAL SOURCES', 'Transactional OLTP, SaaS applications, and streaming event buses', 20, 20, 260, 680, '#7E57C2', '#FAF5FF'),
    card('src_oracle', 'On-Premises Oracle RAC', 'Log-based CDC via Datastream private agent', ICON.db, 38, 85, 224, 76, '#7E57C2'),
    card('src_cloudsql', 'Cloud SQL PostgreSQL / MySQL', 'WAL replication / binary logs CDC stream', ICON.db, 38, 175, 224, 76, '#7E57C2'),
    card('src_saas', 'Salesforce & SaaS APIs', 'REST Webhooks & incremental bulk ingestion', ICON.app, 38, 265, 224, 76, '#7E57C2'),
    card('src_kafka', 'Kafka / Eventarc Topics', 'High-throughput real-time JSON/Avro streams', ICON.datastream, 38, 355, 224, 76, '#7E57C2'),

    // Lane 2: Ingestion & CDC Tier
    lane('ingest', 2, 'INGESTION & CDC TIER', 'Serverless real-time CDC replication and batch ingestion engines', 300, 20, 260, 680, '#0284C7', '#F0F9FF'),
    card('ing_datastream', 'Google Cloud Datastream', 'Serverless log-based CDC replication (sub-second)', ICON.datastream, 318, 85, 224, 85, '#0284C7'),
    card('ing_dts', 'BigQuery Data Transfer (DTS)', 'Automated SaaS & Cloud Storage recurring transfers', ICON.bq, 318, 190, 224, 85, '#0284C7'),
    card('ing_pubsub', 'Cloud Pub/Sub Streaming', 'Global ingestion buffer for event streams', ICON.datastream, 318, 295, 224, 85, '#0284C7'),
    card('ing_gcs', 'Bronze Landing Bucket (GCS)', 'Immutable raw landing zone with CMEK encryption', ICON.gcs, 318, 400, 224, 85, '#0284C7'),

    // Lane 3: Orchestration & Transformation
    lane('transform', 3, 'ORCHESTRATION & TRANSFORMATION', 'Apache Airflow DAGs, Apache Beam stream processing & Dataform', 580, 20, 310, 680, '#EA580C', '#FFFBEB'),
    card('tr_composer', 'Cloud Composer (Airflow 2.10)', 'Enterprise DAG scheduling, dependency management & sensors', ICON.composer, 598, 85, 274, 90, '#EA580C'),
    card('tr_dataflow', 'Cloud Dataflow (Apache Beam)', 'Exactly-once streaming deduplication & windowing', ICON.dataflow, 598, 195, 274, 90, '#0284C7'),
    card('tr_dataform', 'Dataform SQLX Pipelines', 'Declarative SQL transformations & incremental models', ICON.composer, 598, 305, 274, 90, '#EA580C'),
    card('tr_dlq', 'Dead-Letter Queue (DLQ)', 'Quarantine for schema errors & malformed payloads', ICON.db, 598, 415, 274, 80, '#DC2626'),

    // Lane 4: BigQuery Medallion Lakehouse
    lane('medallion', 4, 'BIGQUERY MEDALLION LAKEHOUSE', 'Multi-tier governed data architecture (Bronze -> Silver -> Gold)', 910, 20, 310, 680, '#1D4ED8', '#EFF6FF'),
    card('med_bronze', 'Bronze Tier (Raw Data Lake)', 'Raw schema-on-read JSON/Parquet tables', ICON.bq, 928, 85, 274, 90, '#1D4ED8'),
    card('med_silver', 'Silver Tier (Curated & SCD2)', 'Deduplicated, standardized & history-tracked tables', ICON.bq, 928, 205, 274, 95, '#1D4ED8'),
    card('med_gold', 'Gold Tier (Data Marts & BI)', 'Aggregated star-schemas, dimensional models & feature store', ICON.bq, 928, 330, 274, 95, '#1D4ED8'),

    // Lane 5: Governance & Lineage Plane
    lane('governance', 5, 'GOVERNANCE & LINEAGE PLANE', 'Metadata discovery, column policy tags, DLP masking & BI reports', 1240, 20, 320, 680, '#16A34A', '#F0FDF4'),
    card('gov_dataplex', 'Dataplex Universal Catalog', 'Automated data lineage, discovery & data quality SLA checks', ICON.dataplex, 1258, 85, 284, 90, '#16A34A'),
    card('gov_tags', 'Column-Level Policy Tags', 'Fine-grained access control on PII & financial columns', ICON.shield, 1258, 195, 284, 90, '#16A34A'),
    card('gov_dlp', 'Sensitive Data Protection (DLP)', 'Real-time de-identification, tokenization & PII masking', ICON.shield, 1258, 305, 284, 90, '#16A34A'),
    card('gov_looker', 'Looker Studio & PowerBI', 'Enterprise executive dashboards & real-time analytics', ICON.looker, 1258, 415, 284, 85, '#9333EA'),

    // Edges
    edge('e_ora_ds', 'src_oracle', 'ing_datastream', 'Binary CDC', 'request'),
    edge('e_sql_ds', 'src_cloudsql', 'ing_datastream', 'WAL Stream', 'request'),
    edge('e_saas_dts', 'src_saas', 'ing_dts', 'REST Ingest', 'request'),
    edge('e_kaf_ps', 'src_kafka', 'ing_pubsub', 'Event Stream', 'request'),
    edge('e_ds_gcs', 'ing_datastream', 'ing_gcs', 'Raw Avro/Parquet', 'request'),
    edge('e_comp_df', 'tr_composer', 'tr_dataflow', 'Orchestrate Beam', 'request', 0.5, 1, 0.5, 0),
    edge('e_gcs_df', 'ing_gcs', 'tr_dataflow', 'Stream Process', 'request'),
    edge('e_df_bronze', 'tr_dataflow', 'med_bronze', 'Ingest Raw', 'request'),
    edge('e_df_dlq', 'tr_dataflow', 'tr_dlq', 'Faulty Records', 'response', 0.5, 1, 0.5, 0),
    edge('e_comp_dform', 'tr_composer', 'tr_dataform', 'Trigger SQLX', 'request', 0.8, 1, 0.8, 0),
    edge('e_dform_silver', 'tr_dataform', 'med_silver', 'Curate & SCD-2', 'request'),
    edge('e_silver_gold', 'med_silver', 'med_gold', 'Aggregate Dimensions', 'request', 0.5, 1, 0.5, 0),
    edge('e_gold_looker', 'med_gold', 'gov_looker', 'BI Analytics Query', 'request'),
    edge('e_dplex_lineage', 'gov_dataplex', 'med_bronze', 'End-to-End Lineage Tracking', 'governance', 0, 0.5, 1, 0.5),
    edge('e_tags_silver', 'gov_tags', 'med_silver', 'Enforce Security Tags', 'governance', 0, 0.5, 1, 0.5),
  ];

  return `<mxfile host="embed.diagrams.net" modified="2026-08-20T22:00:00.000Z" agent="PromptCanvas" version="24.0.0" type="embed">
  <diagram id="catalog_etl_elt_cdc_pipeline" name="Enterprise ETL/ELT &amp; CDC Data Pipeline Architecture">
    <mxGraphModel dx="1600" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="950" background="#FFFFFF">
      <root>
        ${cells.join('\n        ')}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}

export const MASTER_ETL_ELT_CDC_PIPELINE_XML = buildMasterEtlEltCdcPipelineXml();
