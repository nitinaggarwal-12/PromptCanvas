import * as fs from 'fs';
import * as path from 'path';

export function buildDataLakehouseXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="aws_data_lakehouse" name="WBS 3.3.1: AWS Enterprise Data Lakehouse Architecture">
    <mxGraphModel dx="1600" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="950" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- TOP TITLE BANNER -->
        <mxCell id="main_title_box" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="16" width="600" height="64" as="geometry"/>
        </mxCell>
        <mxCell id="main_title_text" value="&lt;b style=&quot;font-size:18px;color:#0F172A;&quot;&gt;WBS 3.3.1: AWS Enterprise Data Lakehouse Platform&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:13.5px;color:#334155;&quot;&gt;(Amazon S3 Medallion, AWS Glue, Redshift Spectrum &amp;amp; Athena)&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="45" y="20" width="570" height="56" as="geometry"/>
        </mxCell>

        <!-- TOP RIGHT METADATA TABLE -->
        <mxCell id="meta_table" value="&lt;table style=&quot;width:100%;border-collapse:collapse;font-size:9.5px;color:#0F172A;font-family:sans-serif;&quot;&gt;
  &lt;tr style=&quot;border-bottom:1px solid #E2E8F0;&quot;&gt;
    &lt;td style=&quot;font-weight:bold;padding:3px 6px;width:34%;&quot;&gt;Diagram Name:&lt;/td&gt;
    &lt;td style=&quot;padding:3px 6px;width:66%;&quot;&gt;AWS Enterprise Data Lakehouse&lt;/td&gt;
  &lt;/tr&gt;
  &lt;tr style=&quot;border-bottom:1px solid #E2E8F0;&quot;&gt;
    &lt;td style=&quot;font-weight:bold;padding:3px 6px;&quot;&gt;GCAF Pillar:&lt;/td&gt;
    &lt;td style=&quot;padding:3px 6px;&quot;&gt;Data &amp;amp; Analytics Modernization&lt;/td&gt;
  &lt;/tr&gt;
  &lt;tr style=&quot;border-bottom:1px solid #E2E8F0;&quot;&gt;
    &lt;td style=&quot;font-weight:bold;padding:3px 6px;&quot;&gt;Architecture State:&lt;/td&gt;
    &lt;td style=&quot;padding:3px 6px;&quot;&gt;To-Be&lt;/td&gt;
  &lt;/tr&gt;
  &lt;tr style=&quot;border-bottom:1px solid #E2E8F0;&quot;&gt;
    &lt;td style=&quot;font-weight:bold;padding:3px 6px;&quot;&gt;Persona (Creator):&lt;/td&gt;
    &lt;td style=&quot;padding:3px 6px;&quot;&gt;4. Data Architect&lt;/td&gt;
  &lt;/tr&gt;
  &lt;tr style=&quot;border-bottom:1px solid #E2E8F0;&quot;&gt;
    &lt;td style=&quot;font-weight:bold;padding:3px 6px;&quot;&gt;Target Audience:&lt;/td&gt;
    &lt;td style=&quot;padding:3px 6px;&quot;&gt;Enterprise Architects, Data Engs&lt;/td&gt;
  &lt;/tr&gt;
  &lt;tr style=&quot;border-bottom:1px solid #E2E8F0;&quot;&gt;
    &lt;td style=&quot;font-weight:bold;padding:3px 6px;&quot;&gt;Effort:&lt;/td&gt;
    &lt;td style=&quot;padding:3px 6px;&quot;&gt;High&lt;/td&gt;
  &lt;/tr&gt;
  &lt;tr style=&quot;border-bottom:1px solid #E2E8F0;&quot;&gt;
    &lt;td style=&quot;font-weight:bold;padding:3px 6px;&quot;&gt;Tech Stack:&lt;/td&gt;
    &lt;td style=&quot;padding:3px 6px;&quot;&gt;S3, Glue, Redshift, Athena, QuickSight&lt;/td&gt;
  &lt;/tr&gt;
  &lt;tr style=&quot;border-bottom:1px solid #E2E8F0;&quot;&gt;
    &lt;td style=&quot;font-weight:bold;padding:3px 6px;&quot;&gt;Classification:&lt;/td&gt;
    &lt;td style=&quot;padding:3px 6px;&quot;&gt;Lakehouse Architecture&lt;/td&gt;
  &lt;/tr&gt;
  &lt;tr&gt;
    &lt;td style=&quot;font-weight:bold;padding:3px 6px;&quot;&gt;Blueprint ID:&lt;/td&gt;
    &lt;td style=&quot;padding:3px 6px;font-family:monospace;color:#D97706;font-weight:bold;&quot;&gt;tech_data_lakehouse&lt;/td&gt;
  &lt;/tr&gt;
&lt;/table&gt;" style="html=1;whiteSpace=wrap;rounded=0;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;overflow=hidden;" vertex="1" parent="1">
          <mxGeometry x="1150" y="16" width="410" height="230" as="geometry"/>
        </mxCell>

        <!-- LEFT TIER: INGESTION & DATA SOURCES (x = 30 .. 330) -->
        <mxCell id="box_ingress" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#D97706;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="120" width="300" height="740" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_ingress_hdr" value="&lt;b style=&quot;font-size:12.5px;color:#D97706;&quot;&gt;OPERATIONAL INGESTION TIER&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="130" width="280" height="25" as="geometry"/>
        </mxCell>

        <!-- Node 1: Operational OLTP & SaaS Sources -->
        <mxCell id="node_sources" value="&lt;b style=&quot;font-size:11.5px;color:#0F172A;&quot;&gt;Operational Data Sources&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:9px;color:#475569;&quot;&gt;Amazon RDS Aurora, DynamoDB Streams,&lt;br&gt;Salesforce &amp;amp; SaaS Webhook Feeds&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="50" y="175" width="260" height="85" as="geometry"/>
        </mxCell>

        <!-- Node 2: Kinesis Data Firehose + API Gateway -->
        <mxCell id="node_firehose" value="&lt;b style=&quot;font-size:11.5px;color:#0F172A;&quot;&gt;Amazon Kinesis Data Firehose&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:9px;color:#475569;&quot;&gt;Serverless streaming ingestion buffer&lt;br&gt;Dynamic data partitioning &amp;amp; gzip compression&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="50" y="310" width="260" height="85" as="geometry"/>
        </mxCell>

        <!-- Node 3: AWS Lake Formation & IAM Access Control -->
        <mxCell id="node_lakeformation" value="&lt;b style=&quot;font-size:11.5px;color:#0F172A;&quot;&gt;AWS Lake Formation &amp;amp; IAM Security&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:9px;color:#475569;&quot;&gt;Column &amp;amp; row-level access control filters&lt;br&gt;Automated PII data masking &amp;amp; audit trail&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFBEB;strokeColor=#D97706;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="50" y="450" width="260" height="90" as="geometry"/>
        </mxCell>

        <!-- Node 4: AWS Glue Data Catalog -->
        <mxCell id="node_glue_catalog" value="&lt;b style=&quot;font-size:11.5px;color:#0F172A;&quot;&gt;AWS Glue Data Catalog&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:9px;color:#475569;&quot;&gt;Centralized Hive metastore &amp;amp; schema crawler&lt;br&gt;Automated schema drift detection&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#16A34A;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="50" y="590" width="260" height="80" as="geometry"/>
        </mxCell>

        <!-- Persona Data Engineer Bottom Left -->
        <mxCell id="persona_data_eng" value="👨‍💻&lt;br&gt;&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Data Platform Lead&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:9px;color:#64748B;&quot;&gt;(Schema &amp;amp; Governance)&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;fontSize=20;" vertex="1" parent="1">
          <mxGeometry x="95" y="715" width="170" height="65" as="geometry"/>
        </mxCell>


        <!-- CENTER TIER: S3 MEDALLION LAKEHOUSE STORAGE (x = 370 .. 790) -->
        <mxCell id="box_storage" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#2563EB;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="370" y="120" width="410" height="740" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_storage_hdr" value="&lt;b style=&quot;font-size:12.5px;color:#2563EB;&quot;&gt;AMAZON S3 MEDALLION LAKEHOUSE TIER&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="380" y="130" width="390" height="25" as="geometry"/>
        </mxCell>

        <!-- Bronze S3 Bucket -->
        <mxCell id="node_s3_bronze" value="&lt;b style=&quot;font-size:12px;color:#0F172A;&quot;&gt;Bronze Zone (Raw Ingestion Bucket)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:9px;color:#475569;&quot;&gt;• Immutable raw JSON/CSV landing zone&lt;br&gt;• Lifecycle policy: Transition to S3 Glacier after 90 days&lt;/span&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.5;align=left;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="395" y="175" width="360" height="100" as="geometry"/>
        </mxCell>

        <!-- Glue ETL / Spark Processing -->
        <mxCell id="node_glue_etl" value="&lt;b style=&quot;font-size:12px;color:#0F172A;&quot;&gt;AWS Glue Serverless Spark ETL Jobs&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:9px;color:#475569;&quot;&gt;• Automated compaction, deduplication &amp;amp; cleansing&lt;br&gt;• Conversion to columnar Apache Parquet / Iceberg format&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#16A34A;strokeWidth=2;align=left;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="395" y="325" width="360" height="100" as="geometry"/>
        </mxCell>

        <!-- Silver S3 Bucket -->
        <mxCell id="node_s3_silver" value="&lt;b style=&quot;font-size:12px;color:#0F172A;&quot;&gt;Silver Zone (Cleansed Parquet Bucket)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:9px;color:#475569;&quot;&gt;• Conformed dimensions, enriched events, verified schemas&lt;br&gt;• Snappy-compressed columnar partitions&lt;/span&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=1.5;align=left;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="395" y="475" width="360" height="100" as="geometry"/>
        </mxCell>

        <!-- Gold S3 Bucket -->
        <mxCell id="node_s3_gold" value="&lt;b style=&quot;font-size:12px;color:#0F172A;&quot;&gt;Gold Zone (Curated Business Marts)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:9px;color:#475569;&quot;&gt;• High-value aggregated domain models &amp;amp; Star Schemas&lt;br&gt;• Ready for direct Redshift Spectrum &amp;amp; Athena SQL scans&lt;/span&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;fillColor=#FAF5FF;strokeColor=#7C3AED;strokeWidth=2;align=left;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="395" y="625" width="360" height="100" as="geometry"/>
        </mxCell>


        <!-- RIGHT TIER: QUERY ENGINES & CONSUMPTION (x = 830 .. 1560) -->
        <mxCell id="box_consumption" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#7C3AED;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="825" y="270" width="740" height="590" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_consumption_hdr" value="&lt;b style=&quot;font-size:12.5px;color:#7C3AED;&quot;&gt;ANALYTICS ENGINES &amp;amp; BUSINESS CONSUMPTION TIER&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="835" y="280" width="720" height="25" as="geometry"/>
        </mxCell>

        <!-- Amazon Redshift Serverless & Spectrum -->
        <mxCell id="node_redshift" value="&lt;b style=&quot;font-size:12.5px;color:#0F172A;&quot;&gt;Amazon Redshift Serverless &amp;amp; Spectrum&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:9px;color:#475569;&quot;&gt;• Petabyte-scale SQL data warehousing&lt;br&gt;• Redshift Spectrum direct zero-ETL querying of Gold S3 data&lt;br&gt;• Auto-scaling concurrency scaling clusters&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#2563EB;strokeWidth=2;align=left;spacingLeft=12;" vertex="1" parent="1">
          <mxGeometry x="850" y="325" width="440" height="115" as="geometry"/>
        </mxCell>

        <!-- Amazon Athena Ad-Hoc SQL -->
        <mxCell id="node_athena" value="&lt;b style=&quot;font-size:11.5px;color:#0F172A;&quot;&gt;Amazon Athena (Serverless SQL)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:9px;color:#475569;&quot;&gt;Interactive ad-hoc Presto/Trino SQL queries over Silver &amp;amp; Gold S3&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#16A34A;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="850" y="480" width="280" height="90" as="geometry"/>
        </mxCell>

        <!-- Amazon QuickSight BI -->
        <mxCell id="node_quicksight" value="&lt;b style=&quot;font-size:11.5px;color:#0F172A;&quot;&gt;Amazon QuickSight &amp;amp; Q AI&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:9px;color:#475569;&quot;&gt;SPICE in-memory dashboards,&lt;br&gt;executive KPIs, &amp;amp; generative Q&amp;amp;A&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1170" y="480" width="220" height="90" as="geometry"/>
        </mxCell>

        <!-- Persona Data Analyst -->
        <mxCell id="persona_analyst" value="👤&lt;br&gt;&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Analytics Engineer&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:9px;color:#64748B;&quot;&gt;(Data Mart &amp;amp; SQL Ops)&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;fontSize=20;" vertex="1" parent="1">
          <mxGeometry x="890" y="615" width="200" height="60" as="geometry"/>
        </mxCell>

        <!-- Persona BI Lead -->
        <mxCell id="persona_bi_lead" value="📊&lt;br&gt;&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;BI &amp;amp; Product Lead&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:9px;color:#64748B;&quot;&gt;(Executive Decisioning)&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;fontSize=20;" vertex="1" parent="1">
          <mxGeometry x="1180" y="615" width="200" height="60" as="geometry"/>
        </mxCell>


        <!-- CONNECTORS & FLOW ARROWS WITH WHITE BACKGROUND PILLS -->

        <!-- 1. Sources -> Firehose -->
        <mxCell id="e_sources_firehose" value="CDC &amp;amp; App Streams" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#0284C7;strokeWidth=1.5;endArrow=classic;fontSize=9;fontColor=#0F172A;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="node_sources" target="node_firehose">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- 2. Firehose -> Lake Formation -->
        <mxCell id="e_firehose_lf" value="IAM Tagged Delivery" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#D97706;strokeWidth=1.5;endArrow=classic;fontSize=9;fontColor=#0F172A;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="node_firehose" target="node_lakeformation">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- 3. Lake Formation -> Bronze S3 -->
        <mxCell id="e_lf_bronze" value="Raw Landing Ingestion" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#2563EB;strokeWidth=2;endArrow=classic;fontSize=9;fontColor=#0F172A;labelBackgroundColor=#FFFFFF;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="310" y="495" as="sourcePoint"/>
            <mxPoint x="395" y="225" as="targetPoint"/>
            <Array as="points">
              <mxPoint x="345" y="495"/>
              <mxPoint x="345" y="225"/>
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- 4. Bronze -> Glue ETL -->
        <mxCell id="e_bronze_glue" value="Batch / Streaming Transform" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#16A34A;strokeWidth=2;endArrow=classic;fontSize=9;fontColor=#0F172A;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="node_s3_bronze" target="node_glue_etl">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- 5. Glue ETL -> Silver S3 -->
        <mxCell id="e_glue_silver" value="Cleansed Columnar Output" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#2563EB;strokeWidth=2;endArrow=classic;fontSize=9;fontColor=#0F172A;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="node_glue_etl" target="node_s3_silver">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- 6. Silver S3 -> Gold S3 -->
        <mxCell id="e_silver_gold" value="Curated Star Schema Aggregation" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#7C3AED;strokeWidth=2;endArrow=classic;fontSize=9;fontColor=#0F172A;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="node_s3_silver" target="node_s3_gold">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- 7. Gold S3 -> Redshift Spectrum (Routes around Athena at x = 800 with label near Gold) -->
        <mxCell id="e_gold_redshift" value="Redshift Spectrum Direct Query" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#2563EB;strokeWidth=2;endArrow=classic;fontSize=9;fontColor=#0F172A;labelBackgroundColor=#FFFFFF;" edge="1" parent="1">
          <mxGeometry x="-0.75" y="-12" relative="1" as="geometry">
            <mxPoint x="755" y="675" as="sourcePoint"/>
            <mxPoint x="850" y="380" as="targetPoint"/>
            <Array as="points">
              <mxPoint x="800" y="675"/>
              <mxPoint x="800" y="380"/>
            </Array>
            <mxPoint as="offset"/>
          </mxGeometry>
        </mxCell>

        <!-- 8. Silver -> Athena (Direct horizontal connection with label near Athena) -->
        <mxCell id="e_silver_athena" value="Athena Ad-Hoc SQL" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#16A34A;strokeWidth=1.5;endArrow=classic;fontSize=9;fontColor=#0F172A;labelBackgroundColor=#FFFFFF;" edge="1" parent="1">
          <mxGeometry x="0.2" y="-12" relative="1" as="geometry">
            <mxPoint x="755" y="525" as="sourcePoint"/>
            <mxPoint x="850" y="525" as="targetPoint"/>
            <mxPoint as="offset"/>
          </mxGeometry>
        </mxCell>

        <!-- 9. Redshift -> QuickSight -->
        <mxCell id="e_redshift_qs" value="Direct SQL / SPICE" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#D97706;strokeWidth=1.5;endArrow=classic;fontSize=9;fontColor=#0F172A;labelBackgroundColor=#FFFFFF;" edge="1" parent="1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="1280" y="440" as="sourcePoint"/>
            <mxPoint x="1280" y="480" as="targetPoint"/>
          </mxGeometry>
        </mxCell>

        <!-- BOTTOM RIGHT LEGEND -->
        <mxCell id="legend_box" value="&lt;div style=&quot;font-weight:bold;font-size:11px;margin-bottom:4px;color:#0F172A;text-align:left;&quot;&gt;Legend&lt;/div&gt;
&lt;table style=&quot;width:100%;font-size:9.5px;color:#0F172A;font-family:sans-serif;&quot;&gt;
  &lt;tr&gt;
    &lt;td style=&quot;width:24px;&quot;&gt;▢&lt;/td&gt;&lt;td style=&quot;width:40%;&quot;&gt;Medallion Tier&lt;/td&gt;
    &lt;td style=&quot;width:24px;&quot;&gt;➔&lt;/td&gt;&lt;td&gt;ETL Pipeline&lt;/td&gt;
  &lt;/tr&gt;
  &lt;tr&gt;
    &lt;td&gt;⬚&lt;/td&gt;&lt;td&gt;S3 Object Store&lt;/td&gt;
    &lt;td&gt;⇢&lt;/td&gt;&lt;td&gt;IAM Tag Filter&lt;/td&gt;
  &lt;/tr&gt;
  &lt;tr&gt;
    &lt;td&gt;👤&lt;/td&gt;&lt;td&gt;Persona&lt;/td&gt;
    &lt;td&gt;↔&lt;/td&gt;&lt;td&gt;Interactive Query&lt;/td&gt;
  &lt;/tr&gt;
&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1270" y="720" width="280" height="130" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
`.trim();
}
