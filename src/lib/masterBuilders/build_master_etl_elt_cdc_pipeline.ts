/**
 * 🎨 Blueprint #54 (NEW-DAT-04): Enterprise ETL/ELT & CDC Data Pipeline Architecture
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
  db: svg('<ellipse cx="24" cy="11" rx="14" ry="6" fill="#7E57C2"/><path d="M10 11v24c0 3.3 6.3 6 14 6s14-2.7 14-6V11" fill="#B8A6E6"/><ellipse cx="24" cy="35" rx="14" ry="6" fill="#7E57C2"/>'),
  datastream: svg('<circle cx="16" cy="24" r="8" fill="#2563EB"/><circle cx="32" cy="24" r="8" fill="#2563EB"/><path d="M16 24h16" stroke="#fff" stroke-width="3"/>'),
  composer: svg('<rect x="8" y="8" width="32" height="32" rx="6" fill="#2563EB"/><path d="M14 24h20M24 14v20" stroke="#fff" stroke-width="3.5"/>'),
  dataflow: svg('<circle cx="24" cy="24" r="16" fill="none" stroke="#2563EB" stroke-width="3"/><circle cx="24" cy="12" r="4" fill="#2563EB"/><circle cx="14" cy="30" r="4" fill="#2563EB"/><circle cx="34" cy="30" r="4" fill="#2563EB"/>'),
  bq: svg('<ellipse cx="24" cy="12" rx="14" ry="6" fill="#1D4ED8"/><path d="M10 12v18c0 3.3 6.3 6 14 6s14-2.7 14-6V12" fill="#93C5FD"/><ellipse cx="24" cy="30" rx="14" ry="6" fill="#1D4ED8"/>'),
  dataplex: svg('<circle cx="24" cy="24" r="6" fill="#7C3AED"/><circle cx="12" cy="14" r="4" fill="#7C3AED"/><circle cx="36" cy="14" r="4" fill="#7C3AED"/><circle cx="12" cy="34" r="4" fill="#7C3AED"/><circle cx="36" cy="34" r="4" fill="#7C3AED"/><path d="M12 14l12 10 12-10M12 34l12-10 12 10" stroke="#7C3AED" stroke-width="2"/>'),
  gcs: svg('<rect x="8" y="10" width="32" height="28" rx="4" fill="#0284C7"/><path d="M14 18h20M14 24h20M14 30h12" stroke="#fff" stroke-width="2"/>'),
  looker: svg('<circle cx="16" cy="24" r="6" fill="#9333EA"/><circle cx="32" cy="16" r="6" fill="#0284C7"/><circle cx="32" cy="32" r="6" fill="#16A34A"/><path d="M16 24l16-8M16 24l16 8" stroke="#64748B" stroke-width="2"/>'),
  shield: svg('<path d="M24 4 40 10v12c0 11-6.5 18-16 22C14.5 40 8 33 8 22V10z" fill="#059669"/><path d="m16 24 5 5 11-13" fill="none" stroke="#fff" stroke-width="3"/>'),
  app: svg('<rect x="7" y="8" width="34" height="32" rx="4" fill="#334155"/><path d="M13 15h22M13 21h22M13 27h15" stroke="#fff" stroke-width="2"/>')
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

export function buildMasterEtlEltCdcPipelineXml(): string {
  const cells: string[] = [
    '<mxCell id="0"/>',
    '<mxCell id="1" parent="0"/>',

    // Lane 1: Operational Sources
    lane('sources', 1, 'ENTERPRISE OPERATIONAL SOURCES', 'OLTP databases, enterprise SaaS platforms, and streaming event buses', 20, 20, 1540, 140, '#4C1D95', '#FFFFFF'),
    card('src_oracle', 'Oracle RAC / Exadata', 'LogMiner CDC stream via Private Service Connect', ICON.db, 45, 75, 340, 70, '#7C3AED'),
    card('src_sql', 'Cloud SQL (Postgres / MySQL)', 'WAL / binlog replication with sub-second replication latency', ICON.db, 415, 75, 360, 70, '#2563EB'),
    card('src_saas', 'Enterprise SaaS (Salesforce / SAP)', 'REST & GraphQL bulk ingestion connectors', ICON.app, 805, 75, 350, 70, '#D97706'),
    card('src_kafka', 'Confluent / Apache Kafka', 'High-throughput enterprise event streams (100k msg/sec)', ICON.dataflow, 1185, 75, 350, 70, '#DC2626'),

    // Lane 2: Real-Time Ingestion & CDC Tier
    lane('ingest', 2, 'REAL-TIME INGESTION & CDC TIER', 'Serverless log-based CDC replication and managed batch ingestion', 20, 180, 1540, 150, '#1E3A8A', '#FFFFFF'),
    card('ing_datastream', 'Google Cloud Datastream', 'Serverless CDC with minimal source database overhead', ICON.datastream, 45, 235, 450, 75, '#2563EB'),
    card('ing_dts', 'BigQuery Data Transfer Service (DTS)', 'Scheduled automated extraction for SaaS applications', ICON.datastream, 525, 235, 450, 75, '#2563EB'),
    card('ing_pubsub', 'Cloud Pub/Sub Message Bus', 'Exactly-once event ingest buffer with dead-letter queue', ICON.datastream, 1005, 235, 530, 75, '#2563EB'),

    // Lane 3: Orchestration & Stream Transformation
    lane('transform', 3, 'ORCHESTRATION & STREAM TRANSFORMATION TIER', 'Declarative data pipelines, ELT SQL transformations, and stream processing', 20, 350, 1540, 150, '#047857', '#FFFFFF'),
    card('trn_composer', 'Cloud Composer 2 (Airflow)', 'DAG orchestration, cross-system dependency management & SLA alerts', ICON.composer, 45, 405, 450, 75, '#059669'),
    card('trn_dataflow', 'Cloud Dataflow (Apache Beam)', 'Exactly-once sliding-window stream processing & sessionization', ICON.dataflow, 525, 405, 450, 75, '#2563EB'),
    card('trn_dataform', 'Dataform ELT Transformations', 'SQLX-based version-controlled dimensional modeling & CI/CD', ICON.composer, 1005, 405, 530, 75, '#7C3AED'),

    // Lane 4: BigQuery Medallion Lakehouse Architecture
    lane('lakehouse', 4, 'BIGQUERY MEDALLION LAKEHOUSE ARCHITECTURE', 'Multi-tier storage with column-level encryption and Iceberg federation', 20, 520, 1540, 150, '#1D4ED8', '#FFFFFF'),
    card('lh_bronze', 'Bronze Tier (Raw Ingestion)', 'Append-only CDC change log with Iceberg BigLake format', ICON.gcs, 45, 575, 450, 75, '#0284C7'),
    card('lh_silver', 'Silver Tier (Curated & SCD-2)', 'Deduplicated, schema-validated Slowly Changing Dimensions', ICON.bq, 525, 575, 450, 75, '#1D4ED8'),
    card('lh_gold', 'Gold Tier (Business Marts)', 'Aggregated star-schema data marts optimized for BI & ML', ICON.bq, 1005, 575, 530, 75, '#1D4ED8'),

    // Lane 5: Governance, Catalog & Lineage Plane
    lane('governance', 5, 'DATAPLEX GOVERNANCE, CATALOG & LINEAGE PLANE', 'Automated data profiling, column-level security tags, and BI consumption', 20, 690, 1540, 140, '#D97706', '#FFFFFF'),
    card('gov_dataplex', 'Dataplex Universal Catalog', 'Automated asset discovery, business glossary & column lineage', ICON.dataplex, 45, 745, 360, 70, '#7C3AED'),
    card('gov_quality', 'Dataplex Auto Data Quality', 'Declarative rule validation with automated anomaly alerts', ICON.shield, 435, 745, 360, 70, '#059669'),
    card('gov_dlp', 'Cloud DLP (PII Redaction)', 'Automatic de-identification & crypto-hashing of SSN/PCI fields', ICON.shield, 825, 745, 360, 70, '#059669'),
    card('gov_looker', 'Looker Studio & Vertex AI', 'Self-service enterprise dashboards and predictive ML features', ICON.looker, 1215, 745, 320, 70, '#9333EA'),

    // Edges
    edge('e_ora_data', 'src_oracle', 'ing_datastream', 'CDC Replication', 'request'),
    edge('e_sql_data', 'src_sql', 'ing_datastream', 'WAL Stream', 'request'),
    edge('e_saas_dts', 'src_saas', 'ing_dts', 'Batch Extract', 'request'),
    edge('e_kaf_pub', 'src_kafka', 'ing_pubsub', 'Event Mirror', 'request'),
    edge('e_data_lhb', 'ing_datastream', 'lh_bronze', 'Raw Append', 'request'),
    edge('e_dts_lhb', 'ing_dts', 'lh_bronze', 'Daily Load', 'request'),
    edge('e_pub_df', 'ing_pubsub', 'trn_dataflow', 'Window Stream', 'request'),
    edge('e_df_lhs', 'trn_dataflow', 'lh_silver', 'Clean Dedupe', 'request'),
    edge('e_comp_form', 'trn_composer', 'trn_dataform', 'Trigger SQLX', 'governance'),
    edge('e_form_lhg', 'trn_dataform', 'lh_gold', 'Transform Star Schema', 'request'),
    edge('e_lhg_look', 'lh_gold', 'gov_looker', 'Direct Query BI', 'request'),
    edge('e_dplx_scan', 'gov_dataplex', 'lh_silver', 'Continuous Lineage Scan', 'governance', 0.5, 0, 0.5, 1, [[225, 715], [750, 715]]),
  ];

  return `<mxfile host="app.diagrams.net" modified="2026-08-21T00:35:00.000Z" agent="PromptCanvas Blueprint 54" version="24.7.17" type="device">
  <diagram id="catalog_etl_elt_cdc_pipeline" name="Enterprise ETL/ELT &amp; CDC Data Pipeline Architecture">
    <mxGraphModel dx="1600" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="950" background="#F8FAFC">
      <root>
        ${cells.join('\n        ')}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}

export const MASTER_ETL_ELT_CDC_PIPELINE_XML = buildMasterEtlEltCdcPipelineXml();
