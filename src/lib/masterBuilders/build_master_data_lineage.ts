export function buildDataLineageXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="data_lineage_provenance" name="Enterprise Column-Level Data Lineage &amp; Provenance Graph">
    <mxGraphModel dx="1760" dy="1050" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1780" pageHeight="1050" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- Header Banner -->
        <mxCell id="top_logo" value="&lt;span style=&quot;font-size:26px;&quot;&gt;🧬&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="35" y="14" width="40" height="40" as="geometry"/>
        </mxCell>
        <mxCell id="main_title" value="&lt;b style=&quot;font-size:18px;color:#0F172A;&quot;&gt;DATA GOVERNANCE: COLUMN-LEVEL DATA LINEAGE &amp;amp; PROVENANCE GRAPH (P3-DAT-L-02)&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="85" y="12" width="1350" height="24" as="geometry"/>
        </mxCell>
        <mxCell id="main_subtitle" value="&lt;span style=&quot;font-size:11.5px;color:#475569;font-weight:600;&quot;&gt;End-to-End Traceability: Ingestion Raw $\rightarrow$ Dataform / dbt Staging $\rightarrow$ Curated Marts $\rightarrow$ BigQuery Column Tracking $\rightarrow$ Looker BI Metrics&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="85" y="36" width="1350" height="20" as="geometry"/>
        </mxCell>
        <mxCell id="top_gemini_badge" value="&lt;b style=&quot;font-size:14px;color:#2563EB;&quot;&gt;Gemini 3.7 Flash&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Lineage Engine&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1540" y="14" width="190" height="44" as="geometry"/>
        </mxCell>

        <!-- Column 1: Source Ingestion & Raw Tables -->
        <mxCell id="col1_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#60A5FA;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="35" y="75" width="380" height="910" as="geometry"/>
        </mxCell>
        <mxCell id="col1_title" value="&lt;b style=&quot;font-size:12px;color:#1D4ED8;&quot;&gt;📥 Raw Ingestion (Bronze Layer)&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;spacingLeft=10;" vertex="1" parent="1">
          <mxGeometry x="40" y="82" width="370" height="25" as="geometry"/>
        </mxCell>

        <mxCell id="table_raw_orders" value="&lt;b style=&quot;font-size:12px;color:#0F172A;&quot;&gt;raw_orders (GCS / BigQuery)&lt;/b&gt;&lt;hr style=&quot;margin:6px 0;&quot;&gt;&lt;table style=&quot;width:100%;font-size:10px;text-align:left;color:#334155;&quot;&gt;&lt;tr&gt;&lt;td&gt;🔑 &lt;b&gt;order_id&lt;/b&gt;&lt;/td&gt;&lt;td&gt;STRING&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;👤 &lt;b&gt;customer_raw_id&lt;/b&gt;&lt;/td&gt;&lt;td&gt;STRING&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;💰 &lt;b&gt;total_amount_cents&lt;/b&gt;&lt;/td&gt;&lt;td&gt;INT64&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;⏱️ &lt;b&gt;ingested_at&lt;/b&gt;&lt;/td&gt;&lt;td&gt;TIMESTAMP&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;align=center;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="55" y="125" width="340" height="130" as="geometry"/>
        </mxCell>

        <mxCell id="table_raw_customers" value="&lt;b style=&quot;font-size:12px;color:#0F172A;&quot;&gt;raw_customers (Salesforce Sync)&lt;/b&gt;&lt;hr style=&quot;margin:6px 0;&quot;&gt;&lt;table style=&quot;width:100%;font-size:10px;text-align:left;color:#334155;&quot;&gt;&lt;tr&gt;&lt;td&gt;🔑 &lt;b&gt;sf_account_id&lt;/b&gt;&lt;/td&gt;&lt;td&gt;STRING&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;📧 &lt;b&gt;email_unmasked&lt;/b&gt;&lt;/td&gt;&lt;td&gt;STRING (PII)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;🌍 &lt;b&gt;country_code&lt;/b&gt;&lt;/td&gt;&lt;td&gt;STRING&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;align=center;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="55" y="280" width="340" height="120" as="geometry"/>
        </mxCell>

        <mxCell id="node_dataplex_discovery" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#1D4ED8;&quot;&gt;Dataplex Lineage Auto-Discovery&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.4;padding-top:4px;&quot;&gt;• Parses GoogleSQL AST Query Execution Plans&lt;br&gt;• Auto-Extracts Source-to-Target Column Maps&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#1D4ED8;strokeWidth=2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="55" y="425" width="340" height="95" as="geometry"/>
        </mxCell>

        <mxCell id="node_dlp_profiler" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#0F172A;&quot;&gt;Sensitive Data Protection (DLP)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.4;padding-top:4px;&quot;&gt;• Auto-Tags PII Columns with Dataflow Masking&lt;br&gt;• Cryptographic Deterministic Pseudonymization&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="55" y="540" width="340" height="95" as="geometry"/>
        </mxCell>

        <!-- Column 2: Staging & Cleaned Transformations (Dataform / dbt) -->
        <mxCell id="col2_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#22C55E;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="455" y="75" width="400" height="910" as="geometry"/>
        </mxCell>
        <mxCell id="col2_title" value="&lt;b style=&quot;font-size:12px;color:#15803D;&quot;&gt;🧹 Transformation (Silver Layer)&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;spacingLeft=10;" vertex="1" parent="1">
          <mxGeometry x="460" y="82" width="390" height="25" as="geometry"/>
        </mxCell>

        <mxCell id="table_stg_orders" value="&lt;b style=&quot;font-size:12px;color:#0F172A;&quot;&gt;stg_orders (Dataform Model)&lt;/b&gt;&lt;hr style=&quot;margin:6px 0;&quot;&gt;&lt;table style=&quot;width:100%;font-size:10px;text-align:left;color:#334155;&quot;&gt;&lt;tr&gt;&lt;td&gt;🔑 &lt;b&gt;order_id&lt;/b&gt;&lt;/td&gt;&lt;td&gt;STRING&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;🔗 &lt;b&gt;customer_key&lt;/b&gt;&lt;/td&gt;&lt;td&gt;FARM_FINGERPRINT&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;💵 &lt;b&gt;amount_usd&lt;/b&gt;&lt;/td&gt;&lt;td&gt;CAST(cents/100 AS NUMERIC)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;📅 &lt;b&gt;order_date&lt;/b&gt;&lt;/td&gt;&lt;td&gt;DATE(ingested_at)&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;align=center;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="475" y="125" width="360" height="135" as="geometry"/>
        </mxCell>

        <mxCell id="table_stg_customers" value="&lt;b style=&quot;font-size:12px;color:#0F172A;&quot;&gt;stg_customers (dbt Cleaned)&lt;/b&gt;&lt;hr style=&quot;margin:6px 0;&quot;&gt;&lt;table style=&quot;width:100%;font-size:10px;text-align:left;color:#334155;&quot;&gt;&lt;tr&gt;&lt;td&gt;🔑 &lt;b&gt;customer_key&lt;/b&gt;&lt;/td&gt;&lt;td&gt;FARM_FINGERPRINT&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;🔒 &lt;b&gt;masked_email&lt;/b&gt;&lt;/td&gt;&lt;td&gt;SHA256(email_unmasked)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;🌍 &lt;b&gt;region_tier&lt;/b&gt;&lt;/td&gt;&lt;td&gt;CASE WHEN country_code...&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;align=center;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="475" y="280" width="360" height="120" as="geometry"/>
        </mxCell>

        <mxCell id="node_data_contracts" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#15803D;&quot;&gt;dbt / Dataform Schema Assertions&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.4;padding-top:4px;&quot;&gt;• Non-Null &amp;amp; Uniqueness Primary Key Verification&lt;br&gt;• Automated CI Block on Upstream Schema Drift&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#15803D;strokeWidth=2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="475" y="425" width="360" height="95" as="geometry"/>
        </mxCell>

        <mxCell id="node_data_quality_soda" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#0F172A;&quot;&gt;Dataplex Data Quality Scans&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.4;padding-top:4px;&quot;&gt;• Outlier Anomaly Detection on Order Totals&lt;br&gt;• SLA Monitoring (Data Freshness &amp;lt; 15 mins)&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="475" y="540" width="360" height="95" as="geometry"/>
        </mxCell>

        <!-- Column 3: Curated Dimension & Fact Tables (Gold Marts) -->
        <mxCell id="col3_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#A855F7;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="895" y="75" width="410" height="910" as="geometry"/>
        </mxCell>
        <mxCell id="col3_title" value="&lt;b style=&quot;font-size:12px;color:#7E22CE;&quot;&gt;🏛️ Curated Marts (Gold Layer)&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;spacingLeft=10;" vertex="1" parent="1">
          <mxGeometry x="900" y="82" width="400" height="25" as="geometry"/>
        </mxCell>

        <mxCell id="table_fct_orders" value="&lt;b style=&quot;font-size:12px;color:#0F172A;&quot;&gt;fct_daily_orders (BigQuery Partitioned)&lt;/b&gt;&lt;hr style=&quot;margin:6px 0;&quot;&gt;&lt;table style=&quot;width:100%;font-size:10px;text-align:left;color:#334155;&quot;&gt;&lt;tr&gt;&lt;td&gt;🔑 &lt;b&gt;order_key&lt;/b&gt;&lt;/td&gt;&lt;td&gt;stg_orders.order_id&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;🔗 &lt;b&gt;customer_dim_key&lt;/b&gt;&lt;/td&gt;&lt;td&gt;stg_customers.customer_key&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;💰 &lt;b&gt;net_revenue_usd&lt;/b&gt;&lt;/td&gt;&lt;td&gt;stg_orders.amount_usd&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;📅 &lt;b&gt;partition_date&lt;/b&gt;&lt;/td&gt;&lt;td&gt;stg_orders.order_date&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9333EA;strokeWidth=1.5;align=center;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="915" y="125" width="370" height="135" as="geometry"/>
        </mxCell>

        <mxCell id="table_dim_customers" value="&lt;b style=&quot;font-size:12px;color:#0F172A;&quot;&gt;dim_customers (SCD Type 2)&lt;/b&gt;&lt;hr style=&quot;margin:6px 0;&quot;&gt;&lt;table style=&quot;width:100%;font-size:10px;text-align:left;color:#334155;&quot;&gt;&lt;tr&gt;&lt;td&gt;🔑 &lt;b&gt;customer_dim_key&lt;/b&gt;&lt;/td&gt;&lt;td&gt;stg_customers.customer_key&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;🔒 &lt;b&gt;masked_email&lt;/b&gt;&lt;/td&gt;&lt;td&gt;stg_customers.masked_email&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;⭐ &lt;b&gt;customer_tier&lt;/b&gt;&lt;/td&gt;&lt;td&gt;VIP / Enterprise / Standard&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;⏳ &lt;b&gt;is_current&lt;/b&gt;&lt;/td&gt;&lt;td&gt;BOOLEAN&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9333EA;strokeWidth=1.5;align=center;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="915" y="280" width="370" height="135" as="geometry"/>
        </mxCell>

        <mxCell id="node_bi_engine_accel" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#7E22CE;&quot;&gt;BigQuery BI Engine In-Memory Cache&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.4;padding-top:4px;&quot;&gt;• Sub-Second SQL Acceleration for Looker&lt;br&gt;• Zero Aggregation Lag on Billion-Row Fact Joins&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F3E8FF;strokeColor=#7E22CE;strokeWidth=2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="915" y="435" width="370" height="95" as="geometry"/>
        </mxCell>

        <!-- Column 4: Downstream BI & AI Impact -->
        <mxCell id="col4_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFBEB;strokeColor=#F59E0B;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1345" y="75" width="375" height="910" as="geometry"/>
        </mxCell>
        <mxCell id="col4_title" value="&lt;b style=&quot;font-size:12px;color:#B45309;&quot;&gt;📊 Downstream BI &amp;amp; AI Impact&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;spacingLeft=10;" vertex="1" parent="1">
          <mxGeometry x="1350" y="82" width="365" height="25" as="geometry"/>
        </mxCell>

        <mxCell id="node_looker_dashboard" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#0F172A;&quot;&gt;Looker Executive KPI Dashboard&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.4;padding-top:4px;&quot;&gt;• Daily ARR &amp;amp; Customer Churn Metrics&lt;br&gt;• Lineage Drilldown: Click to Inspect Data Source&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1360" y="125" width="345" height="105" as="geometry"/>
        </mxCell>

        <mxCell id="node_vertex_feature_store" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#92400E;&quot;&gt;Vertex AI Feature Store (Online Serving)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.4;padding-top:4px;&quot;&gt;• Real-time Churn &amp;amp; LTV Inference Features&lt;br&gt;• Full Lineage-Grounded Model Training Datasets&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF3C7;strokeColor=#D97706;strokeWidth=2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1360" y="255" width="345" height="115" as="geometry"/>
        </mxCell>

        <!-- Connectors -->
        <mxCell id="e1" value="1. Dataform Clean" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#2563EB;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#93C5FD;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="table_raw_orders" target="table_stg_orders">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e2" value="2. dbt Transform" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#2563EB;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#93C5FD;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="table_raw_customers" target="table_stg_customers">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e3" value="3. Build Fact" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#16A34A;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#86EFAC;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="table_stg_orders" target="table_fct_orders">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e4" value="4. Build Dim" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#16A34A;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#86EFAC;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="table_stg_customers" target="table_dim_customers">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e5" value="5. Serve Looker" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#7E22CE;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#D8B4FE;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="table_fct_orders" target="node_looker_dashboard">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e6" value="6. Serve Features" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#7E22CE;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#D8B4FE;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="table_dim_customers" target="node_vertex_feature_store">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
