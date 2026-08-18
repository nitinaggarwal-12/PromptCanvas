export function buildEcommerceRetailXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="omnichannel_ecommerce_retail" name="OmniChannel Intelligent E-Commerce Commerce Platform (IND-RETAIL-04)">
    <mxGraphModel dx="1600" dy="720" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="720" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- ==================== HEADER BANNER ==================== -->
        <mxCell id="top_logo" value="&lt;span style=&quot;font-size:24px;&quot;&gt;🛍️&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="8" width="35" height="35" as="geometry"/>
        </mxCell>
        <mxCell id="main_title" value="&lt;b style=&quot;font-size:18px;color:#0F172A;&quot;&gt;GOOGLE CLOUD RETAIL PLATFORM: OMNICHANNEL INTELLIGENT COMMERCE ARCHITECTURE&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="65" y="8" width="1150" height="24" as="geometry"/>
        </mxCell>
        <mxCell id="main_subtitle" value="&lt;span style=&quot;font-size:10.5px;color:#475569;font-weight:600;&quot;&gt;Vertex AI Search for Retail, AlloyDB pgvector Discovery, Multi-Region Cloud Spanner Global Cart, Pub/Sub &amp;amp; BigQuery Lakehouse&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="65" y="30" width="1150" height="18" as="geometry"/>
        </mxCell>
        <mxCell id="top_gemini_badge" value="&lt;b style=&quot;font-size:16px;color:#2563EB;&quot;&gt;✨ Gemini 3.7 Flash&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Retail AI Engine&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1420" y="8" width="150" height="38" as="geometry"/>
        </mxCell>

        <!-- ==================== COLUMN 1: OMNICHANNEL SHOPPER INGRESS ==================== -->
        <mxCell id="col1_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#60A5FA;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="25" y="60" width="340" height="585" as="geometry"/>
        </mxCell>
        <mxCell id="col1_title" value="&lt;b style=&quot;font-size:11px;color:#1D4ED8;&quot;&gt;📱 OmniChannel Shopper Ingress Tier&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="35" y="68" width="320" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="node_shopper_channels" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;Consumer Touchpoints&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;• Next.js Progressive Web App (PWA)&lt;br&gt;• iOS / Android Native Mobile Apps&lt;br&gt;• In-Store POS &amp;amp; Smart Kiosks&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="100" width="310" height="74" as="geometry"/>
        </mxCell>

        <mxCell id="node_cloud_cdn_lb" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;Cloud CDN &amp;amp; Media CDN&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Global Anycast Edge Cache &amp;amp; Media Delivery&lt;br&gt;Sub-20ms Catalog Imagery &amp;amp; Product Videos&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="215" width="310" height="70" as="geometry"/>
        </mxCell>

        <mxCell id="node_apigee_retail_gateway" value="&lt;b style=&quot;font-size:10.5px;color:#1D4ED8;&quot;&gt;Apigee API Gateway &amp;amp; WAF&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;OAuth2 / OpenID Connect Shopper Auth&lt;br&gt;Flash-Sale Surge Throttling &amp;amp; Bot Defense&lt;/span&gt;" style="shape=hexagon;perimeter=hexagonPerimeter2;whiteSpace=wrap;html=1;fixedSize=1;fillColor=#DBEAFE;strokeColor=#1D4ED8;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="325" width="310" height="80" as="geometry"/>
        </mxCell>

        <mxCell id="node_firebase_auth" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;Firebase Auth &amp;amp; Profile Store&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Social Login (Google, Apple, SMS OTP)&lt;br&gt;Unified Omni-Channel Loyalty Identity&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="445" width="310" height="70" as="geometry"/>
        </mxCell>

        <!-- ==================== COLUMN 2: RETAIL MICROSERVICES ==================== -->
        <mxCell id="col2_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#22C55E;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="390" y="60" width="360" height="585" as="geometry"/>
        </mxCell>
        <mxCell id="col2_title" value="&lt;b style=&quot;font-size:11px;color:#15803D;&quot;&gt;🛒 Retail Microservices Tier (Cloud Run)&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="400" y="68" width="340" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="node_catalog_service" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;Catalog &amp;amp; Search Microservice&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Product Faceting, Dynamic Attributes,&lt;br&gt;Multi-Currency Pricing &amp;amp; Localized Deals&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="405" y="100" width="330" height="74" as="geometry"/>
        </mxCell>

        <mxCell id="node_cart_checkout" value="&lt;b style=&quot;font-size:10.5px;color:#15803D;&quot;&gt;Cart &amp;amp; Checkout Microservice&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;ACID Transactional Cart State Management&lt;br&gt;PCI-DSS Tokenized Stripe/Adyen Gateway&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#15803D;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="405" y="215" width="330" height="74" as="geometry"/>
        </mxCell>

        <mxCell id="node_inventory_service" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;Real-Time Inventory &amp;amp; BOPIS&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Store-Level Stock Lock &amp;amp; Reservation&lt;br&gt;Buy Online, Pick Up In Store (BOPIS)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="405" y="325" width="330" height="74" as="geometry"/>
        </mxCell>

        <mxCell id="node_order_worker" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;Async Order Fulfillment Worker Pod&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Warehouse Dispatch, ERP Sync &amp;amp; DLQ Retry Handler&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="405" y="445" width="330" height="70" as="geometry"/>
        </mxCell>

        <!-- ==================== COLUMN 3: VERTEX AI & PERSONALIZATION ==================== -->
        <mxCell id="col3_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#A855F7;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="775" y="60" width="380" height="585" as="geometry"/>
        </mxCell>
        <mxCell id="col3_title" value="&lt;b style=&quot;font-size:11px;color:#7E22CE;&quot;&gt;🧠 Vertex AI Retail Search &amp;amp; Recommendations&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="785" y="68" width="360" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="node_vertex_retail_search" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;Vertex AI Search for Retail&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#7E22CE;&quot;&gt;Semantic Intent Search &amp;amp; Natural Query Parsing&lt;br&gt;Visual Search (Image Upload $\rightarrow$ Exact SKU Match)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F3E8FF;strokeColor=#7E22CE;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="790" y="100" width="350" height="74" as="geometry"/>
        </mxCell>

        <mxCell id="node_gemini_personalization" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;✨ Gemini Conversational Shopping Concierge&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Interactive Shopping Stylist &amp;amp; Gift Recommender&lt;br&gt;Multimodal Context (Chat + Product Images)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9333EA;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="790" y="215" width="350" height="74" as="geometry"/>
        </mxCell>

        <mxCell id="node_recommendation_models" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;Real-Time Recommendation AI Models&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;• &quot;Frequently Bought Together&quot; Bundle AI&lt;br&gt;• Collaborative Filtering &amp;amp; Basket Elasticity&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9333EA;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="790" y="325" width="350" height="74" as="geometry"/>
        </mxCell>

        <mxCell id="node_alloydb_vectors" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;AlloyDB pgvector Product Index&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;1536-dim Embedding Vector Search for 20M+ SKUs&lt;br&gt;Sub-10ms Visual Similarity Lookup&lt;/span&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=6;fillColor=#FFFFFF;strokeColor=#9333EA;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="790" y="435" width="350" height="80" as="geometry"/>
        </mxCell>

        <!-- ==================== COLUMN 4: DATA PERSISTENCE & ANALYTICS ==================== -->
        <mxCell id="col4_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFBEB;strokeColor=#F59E0B;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1180" y="60" width="395" height="585" as="geometry"/>
        </mxCell>
        <mxCell id="col4_title" value="&lt;b style=&quot;font-size:11px;color:#B45309;&quot;&gt;💾 Global Database &amp;amp; BigQuery Lakehouse&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1190" y="68" width="375" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="node_spanner_orders" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;Cloud Spanner Multi-Region&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#B45309;&quot;&gt;Global ACID Master for Orders &amp;amp; Inventory&lt;br&gt;Zero-Downtime Schema Updates &amp;amp; 99.999% SLA&lt;/span&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=6;fillColor=#FEF3C7;strokeColor=#D97706;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1190" y="100" width="375" height="80" as="geometry"/>
        </mxCell>

        <mxCell id="node_pubsub_events" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;Cloud Pub/Sub Event Bus&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Clickstream, Add-to-Cart &amp;amp; Order Events (100k+ TPS)&lt;/span&gt;" style="shape=mxgraph.flowchart.direct_data;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1190" y="222" width="375" height="58" as="geometry"/>
        </mxCell>

        <mxCell id="node_bigquery_retail" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;BigQuery Retail Data Lakehouse&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Customer 360, Lifetime Value (LTV), Churn Prediction &amp;amp; Basket Analytics&lt;/span&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=6;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1190" y="325" width="375" height="80" as="geometry"/>
        </mxCell>

        <mxCell id="node_looker_cockpit" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;Looker Merchandising Cockpit&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Real-Time GMV, Conversion Funnel, Stock-Out Alerts &amp;amp; Return Heatmaps&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1190" y="445" width="375" height="70" as="geometry"/>
        </mxCell>

        <!-- ==================== NUMBERED PROTOCOL CONNECTORS ==================== -->
        <!-- [1] Shopper -> CDN / API Gateway -->
        <mxCell id="edge1" value="&lt;b style=&quot;font-size:7px;color:#2563EB;&quot;&gt;[1] HTTPS :443&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;" edge="1" parent="1" source="node_shopper_channels" target="node_cloud_cdn_lb">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge1b" value="&lt;b style=&quot;font-size:7px;color:#2563EB;&quot;&gt;[2] mTLS :8443&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;" edge="1" parent="1" source="node_cloud_cdn_lb" target="node_apigee_retail_gateway">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- [3] Apigee -> Catalog Service -->
        <mxCell id="edge2" value="&lt;b style=&quot;font-size:7px;color:#2563EB;&quot;&gt;[3] REST / GraphQL&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;" edge="1" parent="1" source="node_apigee_retail_gateway" target="node_catalog_service">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- [4] Catalog -> Vertex AI Retail Search -->
        <mxCell id="edge3" value="&lt;b style=&quot;font-size:7px;color:#7E22CE;&quot;&gt;[4] Semantic Search&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#7E22CE;strokeWidth=1.5;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;" edge="1" parent="1" source="node_catalog_service" target="node_vertex_retail_search">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- [5] Cart Checkout -> Cloud Spanner (ACID 2PC) -->
        <mxCell id="edge4" value="&lt;b style=&quot;font-size:7px;color:#D97706;&quot;&gt;[5] ACID 2PC (gRPC)&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;exitX=1;exitY=0.25;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;strokeColor=#D97706;strokeWidth=1.5;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;" edge="1" parent="1" source="node_cart_checkout" target="node_spanner_orders">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- [6] Cart Checkout -> Pub/Sub Event Backbone -->
        <mxCell id="edge5" value="&lt;b style=&quot;font-size:7px;color:#16A34A;&quot;&gt;[6] 100k TPS Events&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;exitX=0.5;exitY=1;exitDx=0;exitDy=0;entryX=0.5;entryY=0;entryDx=0;entryDy=0;strokeColor=#16A34A;strokeWidth=1.5;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;" edge="1" parent="1" source="node_cart_checkout" target="node_pubsub_events">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- [7] Pub/Sub -> BigQuery Data Lakehouse -->
        <mxCell id="edge6" value="&lt;b style=&quot;font-size:7px;color:#D97706;&quot;&gt;[7] Customer 360 ELT&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#D97706;strokeWidth=1.5;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;" edge="1" parent="1" source="node_pubsub_events" target="node_bigquery_retail">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- [8] BigQuery -> Looker Cockpit -->
        <mxCell id="edge7" value="&lt;b style=&quot;font-size:7px;color:#D97706;&quot;&gt;[8] SQL Direct&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#D97706;strokeWidth=1.5;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;" edge="1" parent="1" source="node_bigquery_retail" target="node_looker_cockpit">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- ==================== FOOTER LEGEND ==================== -->
        <mxCell id="footer_legend" value="&lt;span style=&quot;font-size:9px;color:#475569;&quot;&gt;&lt;b&gt;Retail Architecture Legend:&lt;/b&gt; 🔵 Omni-Channel Edge &amp;amp; Apigee &amp;nbsp;|&amp;nbsp; 🟢 Serverless Microservices &amp;nbsp;|&amp;nbsp; 🟣 Vertex AI &amp;amp; AlloyDB Vectors &amp;nbsp;|&amp;nbsp; 🗄️ Cylinders (Spanner / AlloyDB / BigQuery) &amp;nbsp;|&amp;nbsp; ── [1]-[8] Protocol Connectors&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="658" width="1550" height="32" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
