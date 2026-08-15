export function buildEcommerceRetailXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="omnichannel_ecommerce_retail" name="OmniChannel Intelligent E-Commerce Commerce Platform (IND-RETAIL-04)">
    <mxGraphModel dx="1400" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1400" pageHeight="720" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- Header Banner -->
        <mxCell id="top_logo" value="&lt;span style=&quot;font-size:24px;&quot;&gt;🛍️&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="10" width="35" height="35" as="geometry"/>
        </mxCell>
        <mxCell id="main_title" value="&lt;b style=&quot;font-size:18px;color:#0F172A;&quot;&gt;Google Cloud RETAIL SOLUTION: OMNICHANNEL INTELLIGENT COMMERCE PLATFORM&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="65" y="10" width="1050" height="24" as="geometry"/>
        </mxCell>
        <mxCell id="main_subtitle" value="&lt;span style=&quot;font-size:11px;color:#475569;font-weight:600;&quot;&gt;Enterprise Retail Blueprint: Vertex AI Search for Retail, AlloyDB pgvector Discovery, Cloud Spanner Global Cart &amp;amp; BigQuery Lakehouse&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="65" y="32" width="1050" height="18" as="geometry"/>
        </mxCell>
        <mxCell id="top_gemini_badge" value="&lt;b style=&quot;font-size:14px;color:#2563EB;&quot;&gt;Gemini 3.7 Flash&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Retail AI Core&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1220" y="10" width="140" height="36" as="geometry"/>
        </mxCell>

        <!-- Column 1: Multi-Channel Shopper Ingress -->
        <mxCell id="col1_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#60A5FA;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="25" y="65" width="280" height="580" as="geometry"/>
        </mxCell>
        <mxCell id="col1_title" value="&lt;b style=&quot;font-size:11px;color:#1D4ED8;&quot;&gt;📱 OmniChannel Shopper Ingress&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="35" y="72" width="260" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="node_shopper_channels" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Consumer Touchpoints&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;• Next.js Progressive Web App (PWA)&lt;br&gt;• iOS / Android Mobile Apps&lt;br&gt;• In-Store POS &amp;amp; Smart Kiosks&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="115" width="250" height="85" as="geometry"/>
        </mxCell>

        <mxCell id="node_cloud_cdn_lb" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Cloud CDN &amp;amp; Media CDN&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Global Edge Cache (Static Assets &amp;amp; Video)&lt;br&gt;Sub-20ms Catalog Image Delivery&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="235" width="250" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_apigee_retail_gateway" value="&lt;b style=&quot;font-size:11px;color:#1D4ED8;&quot;&gt;Apigee API Management&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;OAuth2 / OpenID Connect Shopper Auth&lt;br&gt;Flash-Sale Surge Throttling &amp;amp; Bot Defense&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#1D4ED8;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="345" width="250" height="85" as="geometry"/>
        </mxCell>

        <mxCell id="node_firebase_auth" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Firebase Auth &amp;amp; Profile Store&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Social Login (Google, Apple, SMS OTP)&lt;br&gt;Unified Omni-Channel Loyalty ID&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="465" width="250" height="75" as="geometry"/>
        </mxCell>

        <!-- Column 2: Retail Microservices on Cloud Run -->
        <mxCell id="col2_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#22C55E;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="330" y="65" width="310" height="580" as="geometry"/>
        </mxCell>
        <mxCell id="col2_title" value="&lt;b style=&quot;font-size:11px;color:#15803D;&quot;&gt;🛒 Retail Microservices Tier (Cloud Run)&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="340" y="72" width="290" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="node_catalog_service" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Catalog &amp;amp; Search Microservice&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Product Faceting, Dynamic Attributes,&lt;br&gt;Multi-Currency Pricing &amp;amp; Localized Deals&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="345" y="115" width="280" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_cart_checkout" value="&lt;b style=&quot;font-size:11px;color:#15803D;&quot;&gt;Cart &amp;amp; Checkout Microservice&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;ACID Transactional Cart State Management&lt;br&gt;PCI-DSS Tokenized Stripe/Adyen Gateway&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#15803D;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="345" y="225" width="280" height="85" as="geometry"/>
        </mxCell>

        <mxCell id="node_inventory_service" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Real-Time Inventory &amp;amp; BOPIS&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Store-Level Stock Lock &amp;amp; Reservation&lt;br&gt;Buy Online, Pick Up In Store (BOPIS)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="345" y="345" width="280" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_promotion_engine" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Dynamic Pricing &amp;amp; Promo Engine&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Personalized Coupon Evaluation&lt;br&gt;Real-Time Margin &amp;amp; Basket Elasticity&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="345" y="455" width="280" height="75" as="geometry"/>
        </mxCell>

        <!-- Column 3: Vertex AI for Retail & Personalization -->
        <mxCell id="col3_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#A855F7;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="665" y="65" width="330" height="580" as="geometry"/>
        </mxCell>
        <mxCell id="col3_title" value="&lt;b style=&quot;font-size:11px;color:#7E22CE;&quot;&gt;🧠 Vertex AI Search &amp;amp; Recommendations&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="675" y="72" width="310" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="node_vertex_retail_search" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Vertex AI Search for Retail&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#7E22CE;&quot;&gt;Semantic Intent Search &amp;amp; Natural Query Parsing&lt;br&gt;Visual Search (Image Upload $\rightarrow$ Exact SKU Match)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F3E8FF;strokeColor=#7E22CE;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="680" y="115" width="300" height="85" as="geometry"/>
        </mxCell>

        <mxCell id="node_gemini_personalization" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Gemini 3.7 Flash Conversational Concierge&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Interactive Shopping Stylist &amp;amp; Gift Recommender&lt;br&gt;Multimodal Context (Chat + Product Images)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9333EA;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="680" y="235" width="300" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_recommendation_models" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Real-Time Recommendation AI Models&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;• &quot;Frequently Bought Together&quot; Bundle AI&lt;br&gt;• &quot;You May Also Like&quot; Collaborative Filtering&lt;br&gt;• Abandoned Cart Recovery Triggers&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9333EA;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="680" y="345" width="300" height="85" as="geometry"/>
        </mxCell>

        <mxCell id="node_alloydb_vectors" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;AlloyDB pgvector Product Index&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;1536-dim Embedding Search for 20M+ SKUs&lt;br&gt;Sub-10ms Visual Similarity Lookup&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9333EA;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="680" y="465" width="300" height="75" as="geometry"/>
        </mxCell>

        <!-- Column 4: Global Persistence & BigQuery Analytics Lakehouse -->
        <mxCell id="col4_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFBEB;strokeColor=#F59E0B;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1020" y="65" width="340" height="580" as="geometry"/>
        </mxCell>
        <mxCell id="col4_title" value="&lt;b style=&quot;font-size:11px;color:#B45309;&quot;&gt;💾 Global Database &amp;amp; BigQuery Lakehouse&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1030" y="72" width="320" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="node_spanner_orders" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Cloud Spanner Multi-Region&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#B45309;&quot;&gt;Global ACID Master for Orders &amp;amp; Inventory&lt;br&gt;Zero-Downtime Schema Updates &amp;amp; 99.999% SLA&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF3C7;strokeColor=#D97706;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1035" y="115" width="310" height="85" as="geometry"/>
        </mxCell>

        <mxCell id="node_pubsub_events" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Cloud Pub/Sub Event Backbone&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Clickstream, Add-to-Cart, &amp;amp; Order Placed Events&lt;br&gt;100k+ TPS Ingestion Throughput&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1035" y="235" width="310" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_bigquery_retail" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;BigQuery Retail Data Lakehouse&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Customer 360, Lifetime Value (LTV),&lt;br&gt;Churn Prediction &amp;amp; Merchandising Analytics&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1035" y="345" width="310" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_looker_cockpit" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Looker Merchandising Cockpit&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Real-Time GMV, Conversion Funnel, Stock-Out&lt;br&gt;Alerts &amp;amp; Return Rate Heatmaps&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1035" y="465" width="310" height="75" as="geometry"/>
        </mxCell>

        <!-- Connecting Edges -->
        <mxCell id="edge1" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=2;" edge="1" parent="1" source="node_shopper_channels" target="node_cloud_cdn_lb">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge2" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=2;" edge="1" parent="1" source="node_apigee_retail_gateway" target="node_catalog_service">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge3" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16A34A;strokeWidth=2;" edge="1" parent="1" source="node_catalog_service" target="node_vertex_retail_search">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge4" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16A34A;strokeWidth=2;" edge="1" parent="1" source="node_cart_checkout" target="node_spanner_orders">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge5" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16A34A;strokeWidth=2;" edge="1" parent="1" source="node_cart_checkout" target="node_pubsub_events">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge6" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#D97706;strokeWidth=2;" edge="1" parent="1" source="node_pubsub_events" target="node_bigquery_retail">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge7" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#D97706;strokeWidth=2;" edge="1" parent="1" source="node_bigquery_retail" target="node_looker_cockpit">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- Footer Legend -->
        <mxCell id="footer_legend" value="&lt;span style=&quot;font-size:9.5px;color:#475569;&quot;&gt;&lt;b&gt;Retail Solution Architecture:&lt;/b&gt; 🔵 Omni-Channel Edge &amp;amp; Apigee &amp;nbsp;|&amp;nbsp; 🟢 Serverless Microservices &amp;nbsp;|&amp;nbsp; 🟣 Vertex AI Retail Search &amp;amp; Gemini &amp;nbsp;|&amp;nbsp; 🟡 Cloud Spanner &amp;amp; BigQuery Lakehouse &amp;nbsp;|&amp;nbsp; ⚡ Powered by Gemini 3.7 Flash&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="655" width="1335" height="30" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
