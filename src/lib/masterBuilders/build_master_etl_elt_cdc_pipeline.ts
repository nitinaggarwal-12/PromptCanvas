export function buildEtlEltCdcPipelineXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="etl_elt_cdc_pipeline" name="Enterprise ETL/ELT &amp; CDC Data Pipeline Architecture (NEW-DAT-04)">
    <mxGraphModel dx="1600" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="950" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- Top Header Banner -->
        <mxCell id="title_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="16" width="1540" height="54" as="geometry"/>
        </mxCell>
        <mxCell id="main_title" value="&lt;b style=&quot;font-size:17px;color:#0F172A;&quot;&gt;Enterprise ETL / ELT &amp;amp; CDC Data Pipeline Architecture (NEW-DAT-04 / #54)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:11px;color:#475569;font-weight:600;&quot;&gt;Google Cloud Datastream CDC • Apache Airflow (Cloud Composer) • Dataflow Stream/Batch • BigQuery Medallion Lakehouse &amp;amp; Dataplex&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="45" y="18" width="1150" height="50" as="geometry"/>
        </mxCell>
        <mxCell id="top_badge" value="&lt;b style=&quot;font-size:12px;color:#2563EB;&quot;&gt;Datastream + Composer&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#64748B;&quot;&gt;Modern CDC / ELT Pipeline&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1370" y="24" width="180" height="38" as="geometry"/>
        </mxCell>

        <!-- COLUMN 1: OPERATIONAL DATA SOURCES -->
        <mxCell id="col1_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="85" width="240" height="690" as="geometry"/>
        </mxCell>
        <mxCell id="col1_hdr" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;🗄️ OPERATIONAL SOURCES&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#334155;strokeColor=#1E293B;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="30" y="85" width="240" height="32" as="geometry"/>
        </mxCell>
        <mxCell id="card_oltp_db" value="&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;🏛️ Oracle / PostgreSQL / MySQL&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;OLTP Databases (WAL / Binlog CDC)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="45" y="135" width="210" height="65" as="geometry"/>
        </mxCell>
        <mxCell id="card_saas_sources" value="&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;☁️ Enterprise SaaS Apps&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Salesforce, SAP, Workday &amp;amp; ServiceNow&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="45" y="220" width="210" height="65" as="geometry"/>
        </mxCell>
        <mxCell id="card_event_sources" value="&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;⚡ Event Streams &amp;amp; Webhooks&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Kafka, Pub/Sub &amp;amp; IoT Core Feeds&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="45" y="305" width="210" height="65" as="geometry"/>
        </mxCell>

        <!-- COLUMN 2: INGESTION & CDC REPLICATION -->
        <mxCell id="col2_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="310" y="85" width="260" height="690" as="geometry"/>
        </mxCell>
        <mxCell id="col2_hdr" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;🔄 CDC &amp;amp; BATCH INGESTION&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="310" y="85" width="260" height="32" as="geometry"/>
        </mxCell>
        <mxCell id="card_datastream_cdc" value="&lt;b style=&quot;font-size:10px;color:#1E40AF;&quot;&gt;⚡ Google Cloud Datastream (CDC)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Serverless Real-Time Change Data Capture,&lt;br&gt;Sub-Second Transaction Replication&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#60A5FA;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="325" y="135" width="230" height="75" as="geometry"/>
        </mxCell>
        <mxCell id="card_bq_dts" value="&lt;b style=&quot;font-size:10px;color:#1E40AF;&quot;&gt;📥 BigQuery Data Transfer Service&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Scheduled automated bulk SaaS connectors&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#60A5FA;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="325" y="230" width="230" height="65" as="geometry"/>
        </mxCell>
        <mxCell id="card_raw_gcs" value="&lt;b style=&quot;font-size:10px;color:#1E40AF;&quot;&gt;🪣 Bronze Raw Landing (GCS Bucket)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Immutable Avro/Parquet Raw Event Lake&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#60A5FA;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="325" y="315" width="230" height="65" as="geometry"/>
        </mxCell>

        <!-- COLUMN 3: ORCHESTRATION & TRANSFORMATION -->
        <mxCell id="col3_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#86EFAC;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="610" y="85" width="370" height="690" as="geometry"/>
        </mxCell>
        <mxCell id="col3_hdr" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;⚙️ ORCHESTRATION &amp;amp; ELT ENGINE&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#16A34A;strokeColor=#15803D;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="610" y="85" width="370" height="32" as="geometry"/>
        </mxCell>
        <mxCell id="card_composer_dag" value="&lt;b style=&quot;font-size:10px;color:#166534;&quot;&gt;🎼 Cloud Composer (Managed Airflow)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;DAG Orchestrator, Sensor Triggers, Task Dependencies &amp;amp; SLA Alerts&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="625" y="135" width="340" height="65" as="geometry"/>
        </mxCell>
        <mxCell id="card_dataflow_elt" value="&lt;b style=&quot;font-size:10px;color:#166534;&quot;&gt;🚀 Cloud Dataflow (Apache Beam)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Streaming CDC De-duplication, Session Windowing &amp;amp; Schema Enforcement&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="625" y="220" width="340" height="65" as="geometry"/>
        </mxCell>
        <mxCell id="card_dbt_dataform" value="&lt;b style=&quot;font-size:10px;color:#166534;&quot;&gt;🛠️ Dataform / dbt Core in BigQuery&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;SQL-based Incremental Transformations, Data Quality Assertions &amp;amp; Testing&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="625" y="305" width="340" height="65" as="geometry"/>
        </mxCell>
        <mxCell id="card_quarantine_retry" value="&lt;b style=&quot;font-size:9.5px;color:#991B1B;&quot;&gt;🛑 Data Quality Quarantine &amp;amp; Dead Letter Queue&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#475569;&quot;&gt;Malformed Schema Rejection, Replay Mechanism &amp;amp; Alert Notifications&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEE2E2;strokeColor=#EF4444;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="625" y="390" width="340" height="60" as="geometry"/>
        </mxCell>

        <!-- COLUMN 4: BIGQUERY MEDALLION LAKEHOUSE -->
        <mxCell id="col4_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#D8B4FE;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1020" y="85" width="270" height="690" as="geometry"/>
        </mxCell>
        <mxCell id="col4_hdr" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;🏛️ BIGQUERY LAKEHOUSE&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#7E22CE;strokeColor=#6B21A8;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1020" y="85" width="270" height="32" as="geometry"/>
        </mxCell>
        <mxCell id="card_bronze_table" value="&lt;b style=&quot;font-size:10px;color:#6B21A8;&quot;&gt;🥉 Bronze (Raw Ingestion Tables)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Append-only raw CDC changelogs&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D8B4FE;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1035" y="135" width="240" height="65" as="geometry"/>
        </mxCell>
        <mxCell id="card_silver_table" value="&lt;b style=&quot;font-size:10px;color:#6B21A8;&quot;&gt;🥈 Silver (Cleansed &amp;amp; Conformed)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;De-duplicated, Type-casted &amp;amp; SCD Type 2&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D8B4FE;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1035" y="220" width="240" height="65" as="geometry"/>
        </mxCell>
        <mxCell id="card_gold_table" value="&lt;b style=&quot;font-size:10px;color:#6B21A8;&quot;&gt;🥇 Gold (Dimensional Data Marts)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Star Schema Fact/Dims &amp;amp; Looker semantic views&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D8B4FE;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1035" y="305" width="240" height="65" as="geometry"/>
        </mxCell>

        <!-- COLUMN 5: DATA GOVERNANCE & LINEAGE -->
        <mxCell id="col5_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF2F2;strokeColor=#FCA5A5;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1330" y="85" width="240" height="690" as="geometry"/>
        </mxCell>
        <mxCell id="col5_hdr" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;🛡️ DATAPLEX GOVERNANCE&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DC2626;strokeColor=#B91C1C;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1330" y="85" width="240" height="32" as="geometry"/>
        </mxCell>
        <mxCell id="card_dataplex_catalog" value="&lt;b style=&quot;font-size:10px;color:#991B1B;&quot;&gt;📚 Dataplex Universal Catalog&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Column-level Lineage, Glossary &amp;amp; Automatic Schema Discovery&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#F87171;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1345" y="135" width="210" height="75" as="geometry"/>
        </mxCell>
        <mxCell id="card_dataplex_security" value="&lt;b style=&quot;font-size:10px;color:#991B1B;&quot;&gt;🔒 Policy Tag Column-Level Security&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Dynamic PII Masking, Fine-grained IAM &amp;amp; Tag Propagation&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#F87171;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1345" y="230" width="210" height="75" as="geometry"/>
        </mxCell>

        <!-- FLOW CONNECTORS -->
        <mxCell id="edge_src_to_cdc" value="1. Binlog Stream" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#2563EB;fontColor=#1E40AF;fontSize=10;fontStyle=1;labelBackgroundColor=none;" edge="1" parent="1" source="card_oltp_db" target="card_datastream_cdc"/>
        <mxCell id="edge_cdc_to_dataflow" value="2. Continuous Ingest" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#16A34A;fontColor=#166534;fontSize=10;fontStyle=1;labelBackgroundColor=none;" edge="1" parent="1" source="card_datastream_cdc" target="card_dataflow_elt"/>
        <mxCell id="edge_dataflow_to_lake" value="3. Storage Write API" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#7E22CE;fontColor=#6B21A8;fontSize=10;fontStyle=1;labelBackgroundColor=none;" edge="1" parent="1" source="card_dataflow_elt" target="card_bronze_table"/>
        <mxCell id="edge_lake_to_dataplex" value="4. Automated Lineage" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=1.5;strokeColor=#DC2626;fontColor=#991B1B;fontSize=9.5;dashed=1;labelBackgroundColor=none;" edge="1" parent="1" source="card_gold_table" target="card_dataplex_catalog"/>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
