export function buildDataLineageXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="data_lineage_provenance" name="Enterprise Column-Level Data Lineage &amp; Provenance Graph">
    <mxGraphModel dx="1400" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1400" pageHeight="720" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- Header Banner -->
        <mxCell id="top_logo" value="&lt;span style=&quot;font-size:24px;&quot;&gt;🧬&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="10" width="35" height="35" as="geometry"/>
        </mxCell>
        <mxCell id="main_title" value="&lt;b style=&quot;font-size:18px;color:#0F172A;&quot;&gt;DATA GOVERNANCE: COLUMN-LEVEL DATA LINEAGE &amp;amp; PROVENANCE GRAPH&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="65" y="10" width="1050" height="24" as="geometry"/>
        </mxCell>
        <mxCell id="main_subtitle" value="&lt;span style=&quot;font-size:11px;color:#475569;font-weight:600;&quot;&gt;End-to-End Traceability: Ingestion Raw $\rightarrow$ Dataform / dbt Staging $\rightarrow$ Curated Marts $\rightarrow$ BigQuery Column Tracking $\rightarrow$ Looker BI Metrics&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="65" y="32" width="1050" height="18" as="geometry"/>
        </mxCell>
        <mxCell id="top_gemini_badge" value="&lt;b style=&quot;font-size:14px;color:#2563EB;&quot;&gt;Gemini 3.7 Flash&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Lineage Engine&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1220" y="10" width="140" height="36" as="geometry"/>
        </mxCell>

        <!-- Column 1: Source Ingestion & Raw Tables -->
        <mxCell id="col1_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#60A5FA;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="25" y="65" width="280" height="580" as="geometry"/>
        </mxCell>
        <mxCell id="col1_title" value="&lt;b style=&quot;font-size:11px;color:#1D4ED8;&quot;&gt;📥 Raw Ingestion (Bronze Layer)&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="35" y="72" width="260" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="table_raw_orders" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;raw_orders (GCS / BigQuery)&lt;/b&gt;&lt;hr style=&quot;margin:3px 0;&quot;&gt;&lt;table style=&quot;width:100%;font-size:8px;text-align:left;&quot;&gt;&lt;tr&gt;&lt;td&gt;🔑 order_id&lt;/td&gt;&lt;td&gt;STRING&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;👤 customer_raw_id&lt;/td&gt;&lt;td&gt;STRING&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;💰 total_amount_cents&lt;/td&gt;&lt;td&gt;INT64&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;⏱️ ingested_at&lt;/td&gt;&lt;td&gt;TIMESTAMP&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="40" y="115" width="250" height="105" as="geometry"/>
        </mxCell>

        <mxCell id="table_raw_customers" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;raw_customers (Salesforce Sync)&lt;/b&gt;&lt;hr style=&quot;margin:3px 0;&quot;&gt;&lt;table style=&quot;width:100%;font-size:8px;text-align:left;&quot;&gt;&lt;tr&gt;&lt;td&gt;🔑 sf_account_id&lt;/td&gt;&lt;td&gt;STRING&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;📧 email_unmasked&lt;/td&gt;&lt;td&gt;STRING (PII)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;🌍 country_code&lt;/td&gt;&lt;td&gt;STRING&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="40" y="255" width="250" height="95" as="geometry"/>
        </mxCell>

        <mxCell id="node_dataplex_discovery" value="&lt;b style=&quot;font-size:11px;color:#1D4ED8;&quot;&gt;Dataplex Lineage Auto-Discovery&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Parses GoogleSQL AST Query Plans&lt;br&gt;Auto-Extracts Source-to-Target Mappings&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#1D4ED8;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="385" width="250" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_dlp_profiler" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Sensitive Data Protection (DLP)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Auto-Tags PII Columns with Dataflow Masking&lt;br&gt;Cryptographic Deterministic Pseudonymization&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="495" width="250" height="75" as="geometry"/>
        </mxCell>

        <!-- Column 2: Staging & Cleaned Transformations (Dataform / dbt) -->
        <mxCell id="col2_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#22C55E;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="330" y="65" width="310" height="580" as="geometry"/>
        </mxCell>
        <mxCell id="col2_title" value="&lt;b style=&quot;font-size:11px;color:#15803D;&quot;&gt;🧹 Transformation (Silver Layer)&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="340" y="72" width="290" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="table_stg_orders" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;stg_orders (Dataform Model)&lt;/b&gt;&lt;hr style=&quot;margin:3px 0;&quot;&gt;&lt;table style=&quot;width:100%;font-size:8px;text-align:left;&quot;&gt;&lt;tr&gt;&lt;td&gt;🔑 order_id&lt;/td&gt;&lt;td&gt;STRING&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;🔗 customer_key&lt;/td&gt;&lt;td&gt;FARM_FINGERPRINT&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;💵 amount_usd&lt;/td&gt;&lt;td&gt;CAST(cents/100 AS NUMERIC)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;📅 order_date&lt;/td&gt;&lt;td&gt;DATE(ingested_at)&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="345" y="115" width="280" height="115" as="geometry"/>
        </mxCell>

        <mxCell id="table_stg_customers" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;stg_customers (dbt Cleaned)&lt;/b&gt;&lt;hr style=&quot;margin:3px 0;&quot;&gt;&lt;table style=&quot;width:100%;font-size:8px;text-align:left;&quot;&gt;&lt;tr&gt;&lt;td&gt;🔑 customer_key&lt;/td&gt;&lt;td&gt;FARM_FINGERPRINT&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;🔒 masked_email&lt;/td&gt;&lt;td&gt;SHA256(email_unmasked)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;🌍 region_tier&lt;/td&gt;&lt;td&gt;CASE WHEN country_code...&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="345" y="255" width="280" height="105" as="geometry"/>
        </mxCell>

        <mxCell id="node_data_contracts" value="&lt;b style=&quot;font-size:11px;color:#15803D;&quot;&gt;dbt / Dataform Schema Assertions&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Non-Null &amp;amp; Uniqueness Primary Key Verification&lt;br&gt;Automated CI Block on Upstream Schema Drift&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#15803D;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="345" y="385" width="280" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_data_quality_soda" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Dataplex Data Quality Scans&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Outlier Anomaly Detection on Order Totals&lt;br&gt;SLA Monitoring (Data Freshness &amp;lt; 15 mins)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="345" y="495" width="280" height="75" as="geometry"/>
        </mxCell>

        <!-- Column 3: Curated Dimension & Fact Tables (Gold Marts) -->
        <mxCell id="col3_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#A855F7;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="665" y="65" width="330" height="580" as="geometry"/>
        </mxCell>
        <mxCell id="col3_title" value="&lt;b style=&quot;font-size:11px;color:#7E22CE;&quot;&gt;🏛️ Curated Marts (Gold Layer)&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="675" y="72" width="310" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="table_fct_orders" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;fct_daily_orders (BigQuery Partitioned)&lt;/b&gt;&lt;hr style=&quot;margin:3px 0;&quot;&gt;&lt;table style=&quot;width:100%;font-size:8px;text-align:left;&quot;&gt;&lt;tr&gt;&lt;td&gt;🔑 order_key&lt;/td&gt;&lt;td&gt;stg_orders.order_id&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;🔗 customer_dim_key&lt;/td&gt;&lt;td&gt;stg_customers.customer_key&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;💰 net_revenue_usd&lt;/td&gt;&lt;td&gt;stg_orders.amount_usd&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;📅 partition_date&lt;/td&gt;&lt;td&gt;stg_orders.order_date&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9333EA;strokeWidth=1.5;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="680" y="115" width="300" height="115" as="geometry"/>
        </mxCell>

        <mxCell id="table_dim_customers" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;dim_customers (SCD Type 2)&lt;/b&gt;&lt;hr style=&quot;margin:3px 0;&quot;&gt;&lt;table style=&quot;width:100%;font-size:8px;text-align:left;&quot;&gt;&lt;tr&gt;&lt;td&gt;🔑 customer_dim_key&lt;/td&gt;&lt;td&gt;stg_customers.customer_key&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;🔒 masked_email&lt;/td&gt;&lt;td&gt;stg_customers.masked_email&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;⭐ customer_tier&lt;/td&gt;&lt;td&gt;VIP / Enterprise / Standard&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;⏳ is_current&lt;/td&gt;&lt;td&gt;BOOLEAN&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9333EA;strokeWidth=1.5;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="680" y="255" width="300" height="115" as="geometry"/>
        </mxCell>

        <mxCell id="node_bi_engine_accel" value="&lt;b style=&quot;font-size:11px;color:#7E22CE;&quot;&gt;BigQuery BI Engine In-Memory Cache&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Sub-Second SQL Acceleration for Looker&lt;br&gt;Zero Aggregation Lag on Billion-Row Fact Joins&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F3E8FF;strokeColor=#7E22CE;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="680" y="395" width="300" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_tag_policy_abac" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Dataplex ABAC / Column-Level Security&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Tag-Based IAM Policies (Finance vs Marketing)&lt;br&gt;Dynamic Column-Level Hashing / Masking at Query&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9333EA;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="680" y="495" width="300" height="75" as="geometry"/>
        </mxCell>

        <!-- Column 4: Downstream Consumers & Lineage Impact -->
        <mxCell id="col4_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFBEB;strokeColor=#F59E0B;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1020" y="65" width="340" height="580" as="geometry"/>
        </mxCell>
        <mxCell id="col4_title" value="&lt;b style=&quot;font-size:11px;color:#B45309;&quot;&gt;📊 Downstream BI &amp;amp; AI Impact&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1030" y="72" width="320" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="node_looker_executive_dashboard" value="&lt;b style=&quot;font-size:11px;color:#B45309;&quot;&gt;Looker Executive Revenue Dashboard&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Metric: Total Net Revenue &amp;amp; ARR Growth&lt;br&gt;&lt;b style=&quot;color:#1D4ED8;&quot;&gt;Lineage Trace:&lt;/b&gt; raw_orders.total_amount_cents&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF3C7;strokeColor=#D97706;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1035" y="115" width="310" height="85" as="geometry"/>
        </mxCell>

        <mxCell id="node_gemini_rag_grounding" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Gemini 3.7 Flash RAG Grounding Engine&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Natural Language Text-to-SQL Interface&lt;br&gt;&lt;b style=&quot;color:#1D4ED8;&quot;&gt;Lineage Trace:&lt;/b&gt; Verified against Dataplex Catalog&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1035" y="235" width="310" height="85" as="geometry"/>
        </mxCell>

        <mxCell id="node_dataplex_impact_graph" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Dataplex Upstream Impact Analysis UI&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Visualizes 14 Downstream Reports Impacted&lt;br&gt;Whenever raw_orders Schema is Altered&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1035" y="355" width="310" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_audit_lineage_export" value="&lt;b style=&quot;font-size:11px;color:#B45309;&quot;&gt;BCBS 239 / GDPR Regulatory Export&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Automated End-to-End Mathematical Proof of&lt;br&gt;Financial Report Lineage for External Auditors&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1035" y="465" width="310" height="75" as="geometry"/>
        </mxCell>

        <!-- Connecting Edges -->
        <mxCell id="edge1" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=2;" edge="1" parent="1" source="table_raw_orders" target="table_stg_orders">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge2" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=2;" edge="1" parent="1" source="table_raw_customers" target="table_stg_customers">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge3" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16A34A;strokeWidth=2;" edge="1" parent="1" source="table_stg_orders" target="table_fct_orders">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge4" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16A34A;strokeWidth=2;" edge="1" parent="1" source="table_stg_customers" target="table_dim_customers">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge5" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#9333EA;strokeWidth=2;" edge="1" parent="1" source="table_fct_orders" target="node_looker_executive_dashboard">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge6" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#9333EA;strokeWidth=2;" edge="1" parent="1" source="table_dim_customers" target="node_gemini_rag_grounding">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge7" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#D97706;strokeWidth=2;dashed=1;" edge="1" parent="1" source="node_dataplex_discovery" target="node_dataplex_impact_graph">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="165" y="600"/>
              <mxPoint x="1190" y="600"/>
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- Footer Legend -->
        <mxCell id="footer_legend" value="&lt;span style=&quot;font-size:9.5px;color:#475569;&quot;&gt;&lt;b&gt;Lineage Trace Matrix:&lt;/b&gt; 🔵 Raw Bronze Tables &amp;nbsp;|&amp;nbsp; 🟢 Dataform Cleaned Silver &amp;nbsp;|&amp;nbsp; 🟣 Curated Gold Marts &amp;nbsp;|&amp;nbsp; 🟡 Looker Metrics &amp;amp; Gemini 3.7 RAG &amp;nbsp;|&amp;nbsp; ⚡ Powered by Gemini 3.7 Flash&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="655" width="1335" height="30" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
