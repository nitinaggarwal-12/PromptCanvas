export function buildEcommerceRetailXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="omnichannel_ecommerce_retail" name="Google Cloud Retail Platform: OmniChannel Intelligent Commerce &amp; Retail AI Architecture (IND-RETAIL-04)">
    <mxGraphModel dx="1600" dy="920" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="860" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- ==================== HEADER BANNER ==================== -->
        <mxCell id="top_logo" value="&lt;span style=&quot;font-size:24px;&quot;&gt;🛍️&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="10" width="35" height="35" as="geometry"/>
        </mxCell>
        <mxCell id="main_title" value="&lt;b style=&quot;font-size:16.5px;color:#0F172A;letter-spacing:-0.2px;&quot;&gt;GOOGLE CLOUD RETAIL PLATFORM: OMNICHANNEL INTELLIGENT COMMERCE &amp;amp; RETAIL AI (R-AI) ARCHITECTURE&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="65" y="10" width="1280" height="22" as="geometry"/>
        </mxCell>
        <mxCell id="main_subtitle" value="&lt;span style=&quot;font-size:9px;color:#475569;font-weight:700;letter-spacing:0.1px;&quot;&gt;Vertex AI Search &amp;amp; Recommendations for Retail, AlloyDB AI pgvector Product Discovery, Gemini 3.7 Pro Agentic Concierge, Multimodal Vision API, Multi-Region Cloud Spanner Global Cart, Pub/Sub Event Bus, &amp;amp; BigQuery Lakehouse&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="65" y="32" width="1280" height="16" as="geometry"/>
        </mxCell>
        
        <!-- Gemini 3.7 Flash Badge -->
        <mxCell id="top_gemini_badge" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12.5px;font-weight:bold;color:#38BDF8;&quot;&gt;✨ Gemini 3.7 Flash&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#94A3B8;font-weight:600;&quot;&gt;Retail AI Core Engine&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=20;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#1E293B;strokeWidth=1.5;align=center;verticalAlign=middle;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="1380" y="8" width="195" height="42" as="geometry"/>
        </mxCell>


        <!-- ==================== COLUMN 1: OMNICHANNEL SHOPPER INGRESS TIER ==================== -->
        <mxCell id="col1_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#60A5FA;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="25" y="60" width="365" height="715" as="geometry"/>
        </mxCell>
        <mxCell id="col1_title" value="&lt;b style=&quot;font-size:10.5px;color:#1D4ED8;&quot;&gt;📱 OmniChannel Shopper Ingress Tier (Global Edge)&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="35" y="64" width="345" height="20" as="geometry"/>
        </mxCell>

        <!-- 1.1 Shopper Touchpoints Interaction Card -->
        <mxCell id="card_shopper_interactions" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="35" y="88" width="345" height="150" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_shopper_hdr" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;Shopper Interactions&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="40" y="90" width="335" height="18" as="geometry"/>
        </mxCell>
        <!-- 4 Device Pills -->
        <mxCell id="pill_dev_pwa" value="&lt;b style=&quot;font-size:8px;color:#1E40AF;&quot;&gt;📱 Consumer PWA&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:6.5px;color:#64748B;&quot;&gt;Next.js App&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="42" y="112" width="75" height="80" as="geometry"/>
        </mxCell>
        <mxCell id="pill_dev_ios" value="&lt;b style=&quot;font-size:8px;color:#1E40AF;&quot;&gt;🍏 Native iOS&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:6.5px;color:#64748B;&quot;&gt;SwiftUI&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="124" y="112" width="75" height="80" as="geometry"/>
        </mxCell>
        <mxCell id="pill_dev_android" value="&lt;b style=&quot;font-size:8px;color:#1E40AF;&quot;&gt;🤖 Android App&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:6.5px;color:#64748B;&quot;&gt;Jetpack Compose&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="206" y="112" width="80" height="80" as="geometry"/>
        </mxCell>
        <mxCell id="pill_dev_kiosk" value="&lt;b style=&quot;font-size:8px;color:#1E40AF;&quot;&gt;🖥️ In-Store Kiosk&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:6.5px;color:#64748B;&quot;&gt;POS Terminal&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="293" y="112" width="80" height="80" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_touchpoints_sub" value="&lt;span style=&quot;font-size:7px;color:#475569;&quot;&gt;(Web, Mobile, IVR, In-Store, Smart Kiosks and Social Channels with loyalty merging)&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="38" y="200" width="338" height="32" as="geometry"/>
        </mxCell>

        <!-- 1.2 Cloud CDN & Media CDN -->
        <mxCell id="card_cloud_cdn" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;&quot;&gt;☁️ Cloud CDN &amp;amp; Media CDN&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:2px;&quot;&gt;• Global Edge Cache &amp;amp; Media Delivery&lt;br&gt;• Dynamic Asset Optimization for Product Imagery&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="35" y="250" width="345" height="74" as="geometry"/>
        </mxCell>

        <!-- 1.3 Apigee API Gateway & WAF -->
        <mxCell id="card_apigee_waf" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#1D4ED8;&quot;&gt;🛡️ Apigee API Gateway &amp;amp; WAF&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:2px;&quot;&gt;• OAuth2/OIDC Auth, Flash-Sale Surge Throttling&lt;br&gt;• Advanced DDoS &amp;amp; Bot Defense, Threat Protection for PII Data&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="shape=hexagon;perimeter=hexagonPerimeter2;whiteSpace=wrap;html=1;fixedSize=1;fillColor=#DBEAFE;strokeColor=#1D4ED8;strokeWidth=1.5;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="35" y="340" width="345" height="135" as="geometry"/>
        </mxCell>

        <!-- 1.4 Firebase Auth & Profile Store -->
        <mxCell id="card_firebase_auth" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;&quot;&gt;🔑 Firebase Auth &amp;amp; Profile Store&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:2px;&quot;&gt;• Social Login: Google, Apple, SMS OTP&lt;br&gt;• Unified Cross-Channel Customer Profile&lt;br&gt;• Consent Management &amp;amp; GDPR Preference Store&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="35" y="495" width="345" height="265" as="geometry"/>
        </mxCell>

        <!-- Mini Flow Inside Firebase Auth -->
        <mxCell id="sub_auth_box1" value="&lt;b style=&quot;font-size:7px;color:#334155;&quot;&gt;Google / Apple / SMS&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="45" y="585" width="130" height="42" as="geometry"/>
        </mxCell>
        <mxCell id="sub_auth_box2" value="&lt;b style=&quot;font-size:7px;color:#1E40AF;&quot;&gt;Unified Cross-Channel Profile&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#93C5FD;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="195" y="585" width="170" height="42" as="geometry"/>
        </mxCell>
        <mxCell id="sub_auth_box3" value="&lt;b style=&quot;font-size:7px;color:#334155;&quot;&gt;Consent Management Store&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="45" y="650" width="130" height="42" as="geometry"/>
        </mxCell>
        <mxCell id="sub_auth_box4" value="&lt;b style=&quot;font-size:7px;color:#15803D;&quot;&gt;User Identity Token&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#86EFAC;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="195" y="650" width="170" height="42" as="geometry"/>
        </mxCell>

        <!-- Column 1 Internal Connectors -->
        <mxCell id="edge_dev_to_cdn" value="&lt;b style=&quot;font-size:6.5px;color:#1E40AF;&quot;&gt;[1] HTTPS Ingress&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#2563EB;strokeWidth=1.2;html=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;labelBackgroundColor=#FFFFFF;labelBorderColor=#93C5FD;padding=1;" edge="1" parent="1" source="card_shopper_interactions" target="card_cloud_cdn">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_cdn_to_apigee" value="&lt;b style=&quot;font-size:6.5px;color:#1E40AF;&quot;&gt;[2] API Gateway Route&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#2563EB;strokeWidth=1.2;html=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;labelBackgroundColor=#FFFFFF;labelBorderColor=#93C5FD;padding=1;" edge="1" parent="1" source="card_cloud_cdn" target="card_apigee_waf">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_apigee_to_auth" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#2563EB;strokeWidth=1.2;html=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="card_apigee_waf" target="card_firebase_auth">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>


        <!-- ==================== COLUMN 2: RETAIL MICROSERVICES TIER ==================== -->
        <mxCell id="col2_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#22C55E;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="405" y="60" width="365" height="715" as="geometry"/>
        </mxCell>
        <mxCell id="col2_title" value="&lt;b style=&quot;font-size:10.5px;color:#15803D;&quot;&gt;🛒 Retail Microservices Tier (Cloud Run / Serverless)&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="415" y="64" width="345" height="20" as="geometry"/>
        </mxCell>

        <!-- 2.1 Catalog & Search Service -->
        <mxCell id="card_catalog_service" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;&quot;&gt;📦 Catalog &amp;amp; Search Service&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:2px;&quot;&gt;• Product catalog, inventory status&lt;br&gt;• Rich attributes, inventory and real-time pricing&lt;br&gt;• Multi-currency pricing&lt;br&gt;&lt;span style=&quot;color:#16A34A;font-weight:600;&quot;&gt;(gRPC internal APIs, dynamic schema support, localization)&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="415" y="88" width="345" height="120" as="geometry"/>
        </mxCell>

        <!-- 2.2 Cart & Checkout Microservice -->
        <mxCell id="card_cart_checkout" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#15803D;&quot;&gt;🛒 Cart &amp;amp; Checkout Microservice&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:2px;&quot;&gt;• Global cart, tax calculation&lt;br&gt;• PCI-DSS Tokenized Payments, Multi-region State&lt;br&gt;• Multi-region Cloud Spanner state&lt;br&gt;&lt;span style=&quot;color:#16A34A;font-weight:600;&quot;&gt;(Saga pattern, idempotent operations)&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#15803D;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="415" y="222" width="345" height="115" as="geometry"/>
        </mxCell>

        <!-- 2.3 Real-Time Inventory & BOPIS -->
        <mxCell id="card_inventory_bopis" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;&quot;&gt;🏢 Real-Time Inventory &amp;amp; BOPIS&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:2px;&quot;&gt;• Click-and-collect workflows&lt;br&gt;• Near real-time global availability, local store specifics&lt;br&gt;• Local store stock reservation, real-time demand signals&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="415" y="350" width="345" height="170" as="geometry"/>
        </mxCell>

        <!-- Mini Visual Inventory Chart inside BOPIS -->
        <mxCell id="sub_bopis_chart" value="&lt;table style=&quot;width:100%;text-align:center;font-size:7px;color:#475569;&quot;&gt;&lt;tr&gt;&lt;td&gt;📊 Store NYC: &lt;b style=&quot;color:#16A34A;&quot;&gt;98% In-Stock&lt;/b&gt;&lt;/td&gt;&lt;td&gt;📊 Store LA: &lt;b style=&quot;color:#16A34A;&quot;&gt;94% In-Stock&lt;/b&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td colspan=&quot;2&quot; style=&quot;padding-top:4px;&quot;&gt;📈 BOPIS Reserve Latency: &lt;b style=&quot;color:#2563EB;&quot;&gt;&amp;lt;15ms&lt;/b&gt; | Lock Duration: 30 mins&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="425" y="445" width="325" height="60" as="geometry"/>
        </mxCell>

        <!-- 2.4 Async Order Fulfillment Worker Pod -->
        <mxCell id="card_order_fulfillment" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;&quot;&gt;⚙️ Async Order Fulfillment Worker Pod&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:2px;&quot;&gt;• Distributed Job Queue&lt;br&gt;• Retry handler, order routing logic&lt;br&gt;• Order routing logic, ERP integration points&lt;br&gt;• ML-based stock allocation&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="415" y="535" width="345" height="225" as="geometry"/>
        </mxCell>

        <!-- Worker Queue diagram inside Fulfillment Card -->
        <mxCell id="sub_worker_inst" value="&lt;b style=&quot;font-size:7px;color:#1E40AF;&quot;&gt;Worker Instances&lt;br&gt;(Cloud Run Jobs)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="425" y="650" width="95" height="90" as="geometry"/>
        </mxCell>
        <mxCell id="sub_worker_queue" value="&lt;b style=&quot;font-size:7px;color:#9333EA;&quot;&gt;Cloud Tasks&lt;br&gt;Priority Queue&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#E9D5FF;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="535" y="650" width="100" height="90" as="geometry"/>
        </mxCell>
        <mxCell id="sub_worker_erp" value="&lt;b style=&quot;font-size:7px;color:#15803D;&quot;&gt;ERP Backend&lt;br&gt;(SAP / NetSuite)&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#BBF7D0;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="650" y="650" width="100" height="90" as="geometry"/>
        </mxCell>
        <mxCell id="arr_w1_w2" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#16A34A;strokeWidth=1;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="sub_worker_inst" target="sub_worker_queue">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="arr_w2_w3" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#16A34A;strokeWidth=1;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="sub_worker_queue" target="sub_worker_erp">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- Column 2 Internal Connectors -->
        <mxCell id="edge_cat_to_cart" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#16A34A;strokeWidth=1.2;html=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="card_catalog_service" target="card_cart_checkout">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_cart_to_inv" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#16A34A;strokeWidth=1.2;html=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="card_cart_checkout" target="card_inventory_bopis">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_inv_to_fulfill" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#16A34A;strokeWidth=1.2;html=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="card_inventory_bopis" target="card_order_fulfillment">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>


        <!-- ==================== COLUMN 3: RETAIL AI & GEMINI INTELLIGENCE CORE ==================== -->
        <mxCell id="col3_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#A855F7;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="785" y="60" width="375" height="715" as="geometry"/>
        </mxCell>
        <mxCell id="col3_title" value="&lt;b style=&quot;font-size:10.5px;color:#7E22CE;&quot;&gt;🧠 Retail AI &amp;amp; Gemini Intelligence Core (Gemini &amp;amp; Vertex AI)&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="795" y="64" width="355" height="20" as="geometry"/>
        </mxCell>

        <!-- 3.1 Vertex AI Retail Search -->
        <mxCell id="card_vertex_retail_search" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9333EA;strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="795" y="88" width="355" height="150" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_vertex_search_hdr" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;Vertex AI Retail Search&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#7E22CE;font-weight:600;&quot;&gt;AI-Powered Discovery | Visual Search With Multimodal Vision&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=top;padding=4;" vertex="1" parent="1">
          <mxGeometry x="800" y="90" width="345" height="28" as="geometry"/>
        </mxCell>
        <!-- Mock Search Bar + Image Upload -->
        <mxCell id="sub_search_bar" value="&lt;span style=&quot;font-size:7px;color:#64748B;&quot;&gt;🔍 Search silk dresses, leather boots, living room rugs...&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;align=left;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="805" y="122" width="220" height="22" as="geometry"/>
        </mxCell>
        <mxCell id="sub_img_upload" value="&lt;b style=&quot;font-size:6.5px;color:#7E22CE;&quot;&gt;📷 Image Upload&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#C084FC;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1035" y="122" width="105" height="22" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_search_bullets" value="&lt;span style=&quot;font-size:7px;color:#475569;&quot;&gt;• Product embeddings &amp;amp; semantic recall&lt;br&gt;• Multi-faceted filtering &amp;amp; query refinement&lt;br&gt;• Sub-50ms catalog retrieval&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="805" y="148" width="335" height="85" as="geometry"/>
        </mxCell>

        <!-- 3.2 Gemini Agentic Concierge & Personalized Shopping Advisor -->
        <mxCell id="card_gemini_concierge" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9333EA;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="795" y="250" width="355" height="150" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_concierge_hdr" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;✨ Gemini Agentic Concierge &amp;amp; Shopping Advisor&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="800" y="252" width="345" height="18" as="geometry"/>
        </mxCell>
        <!-- Mini Concierge Blocks -->
        <mxCell id="sub_chat_context" value="&lt;b style=&quot;font-size:7px;color:#334155;&quot;&gt;Session History&lt;br&gt;&amp;amp; Dialogue Context&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F1F5F9;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="805" y="275" width="100" height="75" as="geometry"/>
        </mxCell>
        <mxCell id="sub_gemini_brain" value="&lt;b style=&quot;font-size:8px;color:#9333EA;&quot;&gt;✨ Gemini 3.7 Pro&lt;br&gt;Reasoning Agent&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#A855F7;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="915" y="275" width="110" height="75" as="geometry"/>
        </mxCell>
        <mxCell id="sub_chat_output" value="&lt;b style=&quot;font-size:6.5px;color:#15803D;&quot;&gt;Personalized Advice:&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:6px;color:#475569;&quot;&gt;• Fit &amp;amp; Style Curation&lt;br&gt;• Cross-sell Suggestions&lt;br&gt;• Cart Optimization&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#86EFAC;strokeWidth=1;align=left;verticalAlign=middle;padding=2;" vertex="1" parent="1">
          <mxGeometry x="1035" y="275" width="105" height="75" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_concierge_footer" value="&lt;span style=&quot;font-size:7px;color:#7E22CE;&quot;&gt;Real-time Grounding via AlloyDB pgvector &amp;amp; Product Metadata&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="800" y="365" width="345" height="30" as="geometry"/>
        </mxCell>

        <!-- 3.3 Real-Time Recommendation AI Models -->
        <mxCell id="card_recommendation_models" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;&quot;&gt;🎯 Real-Time Recommendation AI Models&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:2px;&quot;&gt;• Frequently Bought Together with a Basket example&lt;br&gt;• Collaborative Filtering, Personalization based on session history&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9333EA;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="795" y="415" width="355" height="150" as="geometry"/>
        </mxCell>
        <!-- Mini Recommendation Sub-Diagram -->
        <mxCell id="sub_rec_basket" value="&lt;b style=&quot;font-size:7px;color:#334155;&quot;&gt;Active Cart Items&lt;br&gt;+ User History&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="805" y="490" width="100" height="65" as="geometry"/>
        </mxCell>
        <mxCell id="sub_rec_model" value="&lt;b style=&quot;font-size:7px;color:#7E22CE;&quot;&gt;Vertex AI Two-Tower&lt;br&gt;Ranking Model&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#C084FC;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="915" y="490" width="115" height="65" as="geometry"/>
        </mxCell>
        <mxCell id="sub_rec_infer" value="&lt;b style=&quot;font-size:7px;color:#15803D;&quot;&gt;Ranked Offers&lt;br&gt;&amp;lt;10ms Inferred&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#86EFAC;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1040" y="490" width="100" height="65" as="geometry"/>
        </mxCell>
        <mxCell id="arr_rec_1_2" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#7E22CE;strokeWidth=1;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="sub_rec_basket" target="sub_rec_model">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="arr_rec_2_3" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#7E22CE;strokeWidth=1;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="sub_rec_model" target="sub_rec_infer">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- 3.4 AlloyDB AI pgvector Product Index -->
        <mxCell id="card_alloydb_vector" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;&quot;&gt;🗄️ AlloyDB AI pgvector Product Index&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:2px;&quot;&gt;• 16K+ dimension embedding vector store&lt;br&gt;• 10ms Visual Similarity Lookup&lt;br&gt;• Advanced Indexing algorithms (HNSW)&lt;br&gt;• Full PostgreSQL SQL Interface&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=6;fillColor=#FFFFFF;strokeColor=#9333EA;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="795" y="580" width="355" height="180" as="geometry"/>
        </mxCell>

        <!-- Vector Scatter Visual inside AlloyDB -->
        <mxCell id="sub_vector_scatter" value="&lt;table style=&quot;width:100%;text-align:center;font-size:7px;color:#475569;&quot;&gt;&lt;tr&gt;&lt;td&gt;🔵 🟢 🟣 🟡 &lt;b style=&quot;color:#7E22CE;&quot;&gt;HNSW Vector Partitioning&lt;/b&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;padding-top:4px;&quot;&gt;Nearest Neighbor Query: &lt;b style=&quot;color:#16A34A;&quot;&gt;Cosine Distance &amp;lt;0.12&lt;/b&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#E9D5FF;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="805" y="685" width="335" height="65" as="geometry"/>
        </mxCell>

        <!-- Column 3 Internal Connectors -->
        <mxCell id="edge_search_to_concierge" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#7E22CE;strokeWidth=1.2;html=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="card_vertex_retail_search" target="card_gemini_concierge">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_concierge_to_rec" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#7E22CE;strokeWidth=1.2;html=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="card_gemini_concierge" target="card_recommendation_models">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_rec_to_alloy" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#7E22CE;strokeWidth=1.2;html=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="card_recommendation_models" target="card_alloydb_vector">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>


        <!-- ==================== COLUMN 4: GLOBAL DATABASE & BIGQUERY LAKEHOUSE ==================== -->
        <mxCell id="col4_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#FFFBEB;strokeColor=#F59E0B;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1185" y="60" width="390" height="715" as="geometry"/>
        </mxCell>
        <mxCell id="col4_title" value="&lt;b style=&quot;font-size:10.5px;color:#B45309;&quot;&gt;🗄️ Global Database &amp;amp; BigQuery Lakehouse (Multi-Region)&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1195" y="64" width="370" height="20" as="geometry"/>
        </mxCell>

        <!-- 4.1 Multi-Region Spanner (Global Cart) -->
        <mxCell id="card_spanner_cart" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;&quot;&gt;🌐 Multi-Region Spanner (Global Cart)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:2px;&quot;&gt;• Global ACID consistency&lt;br&gt;• Sub-10ms writes, auto-sharding&lt;br&gt;• 99.999% SLA availability&lt;br&gt;• Active-Active multi-region replication map&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=6;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1195" y="88" width="370" height="120" as="geometry"/>
        </mxCell>

        <!-- 4.2 Cloud Pub/Sub Event Bus -->
        <mxCell id="card_pubsub_bus" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;&quot;&gt;📡 Cloud Pub/Sub Event Bus&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:2px;&quot;&gt;• Kafka-compatible interface&lt;br&gt;• Topics for Clickstream, Add-to-Cart, Orders, Inventory Updates&lt;br&gt;• 100K+ TPS scaling capacity&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1195" y="222" width="370" height="98" as="geometry"/>
        </mxCell>

        <!-- 4.3 BigQuery Retail Data Lakehouse -->
        <mxCell id="card_bq_lakehouse" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;&quot;&gt;🔍 BigQuery Retail Data Lakehouse&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:2px;&quot;&gt;• Customer 360, Lifetime Value (LTV), Churn Prediction&lt;br&gt;• Product Analytics, Basket Analysis, Store Performance&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=6;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1195" y="335" width="370" height="175" as="geometry"/>
        </mxCell>

        <!-- Mini Star Schema Mockup inside BigQuery -->
        <mxCell id="sub_bq_schema" value="&lt;table style=&quot;width:100%;text-align:center;font-size:7px;color:#334155;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;background:#FEF3C7;padding:2px;&quot;&gt;Dim_Shopper&lt;/td&gt;&lt;td style=&quot;background:#DBEAFE;padding:2px;font-weight:bold;&quot;&gt;Fact_Retail_Sales&lt;/td&gt;&lt;td style=&quot;background:#DCFCE7;padding:2px;&quot;&gt;Dim_Store&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td colspan=&quot;3&quot; style=&quot;padding-top:4px;font-size:6.5px;color:#64748B;&quot;&gt;Partitioned by Event Date | Clustered by Store_ID, Shopper_Segment&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFBEB;strokeColor=#FDE68A;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1205" y="420" width="350" height="75" as="geometry"/>
        </mxCell>

        <!-- 4.4 Looker Merchandising & Business Intelligence Cockpit -->
        <mxCell id="card_looker_retail" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;&quot;&gt;📈 Looker Merchandising &amp;amp; BI Cockpit&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:2px;&quot;&gt;• Real-Time GMV, Stock-out Alerts, Conversion Funnel with stages&lt;br&gt;• Visual Heatmaps for store layouts and product popularity&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1195" y="525" width="370" height="235" as="geometry"/>
        </mxCell>

        <!-- Dashboard Mockup inside Looker -->
        <mxCell id="sub_dash_funnel" value="&lt;b style=&quot;font-size:7px;color:#1E40AF;&quot;&gt;Conversion Funnel&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:6px;color:#64748B;&quot;&gt;Search (100%) &amp;gt; Cart (32%) &amp;gt; Buy (14%)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#BFDBFE;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1205" y="615" width="165" height="130" as="geometry"/>
        </mxCell>
        <mxCell id="sub_dash_gmv" value="&lt;b style=&quot;font-size:7px;color:#15803D;&quot;&gt;Geo GMV Heatmap&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:6px;color:#64748B;&quot;&gt;Live Revenue: $4.2M/hr&lt;br&gt;Peak Spike: +180% Cyber Mon&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#BBF7D0;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1385" y="615" width="170" height="130" as="geometry"/>
        </mxCell>

        <!-- Column 4 Internal Connectors -->
        <mxCell id="edge_span_to_pubsub" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#D97706;strokeWidth=1.2;html=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="card_spanner_cart" target="card_pubsub_bus">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_pubsub_to_bq" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#D97706;strokeWidth=1.2;html=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="card_pubsub_bus" target="card_bq_lakehouse">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_bq_to_looker" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#D97706;strokeWidth=1.2;html=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="card_bq_lakehouse" target="card_looker_retail">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>


        <!-- ==================== CROSS-COLUMN INTER-TIER CONNECTORS ==================== -->
        <!-- Apigee -> Catalog Microservice -->
        <mxCell id="arr_apigee_to_catalog" value="&lt;b style=&quot;font-size:6.5px;color:#1E40AF;&quot;&gt;[3] API Route&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#2563EB;strokeWidth=1.2;html=1;exitX=1;exitY=0.3;entryX=0;entryY=0.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#93C5FD;padding=1;" edge="1" parent="1" source="card_apigee_waf" target="card_catalog_service">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- Cart Microservice -> Cloud Spanner -->
        <mxCell id="arr_cart_to_spanner" value="&lt;b style=&quot;font-size:6.5px;color:#15803D;&quot;&gt;[4] ACID Cart Sync&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#16A34A;strokeWidth=1.2;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#86EFAC;padding=1;" edge="1" parent="1" source="card_cart_checkout" target="card_spanner_cart">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="775" y="279"/>
              <mxPoint x="775" y="244"/>
              <mxPoint x="1170" y="244"/>
              <mxPoint x="1170" y="148"/>
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- Catalog Service -> Vertex AI Search -->
        <mxCell id="arr_catalog_to_search" value="&lt;b style=&quot;font-size:6.5px;color:#7E22CE;&quot;&gt;[5] AI Search / Embed&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#7E22CE;strokeWidth=1.2;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#E9D5FF;padding=1;" edge="1" parent="1" source="card_catalog_service" target="card_vertex_retail_search">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- Fulfillment Worker -> PubSub Bus -->
        <mxCell id="arr_fulfill_to_pubsub" value="&lt;b style=&quot;font-size:6.5px;color:#B45309;&quot;&gt;[6] Order Placed Event&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#D97706;strokeWidth=1.2;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#FDE68A;padding=1;" edge="1" parent="1" source="card_order_fulfillment" target="card_pubsub_bus">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="775" y="647"/>
              <mxPoint x="775" y="271"/>
            </Array>
          </mxGeometry>
        </mxCell>


        <!-- ==================== FOOTER LEGEND ==================== -->
        <!-- x = 25 .. 1575 (width = 1550, height = 36) -->
        <mxCell id="footer_legend" value="&lt;table style=&quot;width:100%;font-size:7.5px;color:#334155;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td&gt;&lt;b style=&quot;color:#0F172A;&quot;&gt;Retail Architecture Legend:&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🔵 &lt;b&gt;Omni-Channel Edge &amp;amp; Apigee&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🟢 &lt;b&gt;Serverless Microservices&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🟣 &lt;b&gt;Vertex AI &amp;amp; AlloyDB Vectors&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🟡 &lt;b&gt;Data Platform (Spanner / BigQuery)&lt;/b&gt;&lt;/td&gt;&lt;td&gt;── &lt;b&gt;10/10 Protocol Connectors&lt;/b&gt;&lt;/td&gt;&lt;td&gt;✨ &lt;b style=&quot;color:#1D4ED8;&quot;&gt;Gemini 3.7 Flash Engine&lt;/b&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="785" width="1550" height="36" as="geometry"/>
        </mxCell>

        <mxCell id="footer_copyright" value="&lt;span style=&quot;font-size:7px;color:#94A3B8;&quot;&gt;© 2026 Google LLC | Confidential &amp;amp; Proprietary&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="825" width="300" height="14" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
