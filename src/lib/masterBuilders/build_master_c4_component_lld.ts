export function buildC4ComponentLldXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="c4_component_lld" name="C4 Level 3.5: GKE Microservices LLD &amp; Gemini AI Deep Dive (ARCH-C4-02)">
    <mxGraphModel dx="1600" dy="920" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="900" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- ==================== HEADER BANNER ==================== -->
        <mxCell id="top_logo" value="&lt;span style=&quot;font-size:24px;&quot;&gt;📦&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="10" width="35" height="35" as="geometry"/>
        </mxCell>
        <mxCell id="main_title" value="&lt;b style=&quot;font-size:17px;color:#0F172A;letter-spacing:-0.2px;&quot;&gt;C4 MODEL LEVEL 3.5: GKE MICROSERVICES LLD &amp;amp; GEMINI AI DEEP DIVE&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="65" y="10" width="1250" height="22" as="geometry"/>
        </mxCell>
        <mxCell id="main_subtitle" value="&lt;span style=&quot;font-size:9.5px;color:#475569;font-weight:700;letter-spacing:0.2px;&quot;&gt;Blueprint v2.1 | GKE Autopilot Cluster | Gemini 1.5 Pro | Security: VPC-SC&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="65" y="32" width="1250" height="16" as="geometry"/>
        </mxCell>
        
        <!-- Gemini 3.7 Flash Badge (Dark HUD Glassmorphic Pill) -->
        <mxCell id="top_gemini_badge" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12.5px;font-weight:bold;color:#38BDF8;&quot;&gt;✨ Gemini 3.7 Flash&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#94A3B8;font-weight:600;&quot;&gt;Software Arch Engine&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=20;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#1E293B;strokeWidth=1.5;align=center;verticalAlign=middle;shadow=1;" vertex="1" parent="1">
          <mxGeometry x="1400" y="8" width="175" height="42" as="geometry"/>
        </mxCell>


        <!-- ==================== OUTER C4 CONTAINER BOUNDARY ==================== -->
        <!-- x = 25 .. 1575 (width = 1550, height = 705) -->
        <mxCell id="c4_container_boundary" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#FAFAFA;strokeColor=#475569;strokeWidth=1.5;dashed=1;" vertex="1" parent="1">
          <mxGeometry x="25" y="60" width="1550" height="705" as="geometry"/>
        </mxCell>
        <mxCell id="c4_container_label" value="&lt;b style=&quot;font-size:11px;color:#334155;&quot;&gt;GKE [Container: Order Management Service]&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="35" y="66" width="450" height="18" as="geometry"/>
        </mxCell>


        <!-- ==================== COLUMN 1: API INGRESS & SECURITY TIER ==================== -->
        <!-- x = 35 .. 315 (width = 280, height = 660) -->
        <mxCell id="col1_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#FFF5F5;strokeColor=#F87171;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="35" y="90" width="280" height="660" as="geometry"/>
        </mxCell>
        <mxCell id="col1_title" value="&lt;b style=&quot;font-size:10px;color:#991B1B;&quot;&gt;API INGRESS &amp;amp; SECURITY TIER (Re-Labeled)&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="45" y="96" width="260" height="18" as="geometry"/>
        </mxCell>

        <!-- 1. OrderRestController Box with Filters -->
        <mxCell id="box_rest_controller" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#FCA5A5;strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="45" y="120" width="260" height="135" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_rest_controller_hdr" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;OrderRestController&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#64748B;&quot;&gt;POST RestController&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=top;" vertex="1" parent="1">
          <mxGeometry x="50" y="124" width="250" height="26" as="geometry"/>
        </mxCell>
        <mxCell id="pill_val_filter" value="&lt;b style=&quot;font-size:9px;color:#991B1B;&quot;&gt;ValidationFilter&lt;/b&gt;" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#FEE2E2;strokeColor=#EF4444;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="60" y="154" width="230" height="32" as="geometry"/>
        </mxCell>
        <mxCell id="pill_rate_limiter" value="&lt;b style=&quot;font-size:9px;color:#991B1B;&quot;&gt;RateLimiter&lt;/b&gt;" style="rounded=1;arcSize=50;whiteSpace=wrap;html=1;fillColor=#FEE2E2;strokeColor=#EF4444;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="60" y="194" width="230" height="32" as="geometry"/>
        </mxCell>

        <!-- 2. GeminiIAPTokenVerifier Box -->
        <mxCell id="box_iap_verifier" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#B91C1C;&quot;&gt;GeminiIAPTokenVerifier&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:4px;&quot;&gt;• Token Validation DTO Logic&lt;br&gt;• Token Validation Logic&lt;br&gt;• Token Validation Logic Validation Logic&lt;br&gt;• IAP Claim Verification &amp;amp; Signature Auth&lt;br&gt;• Context-Aware Principal Extraction&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#FCA5A5;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="45" y="285" width="260" height="215" as="geometry"/>
        </mxCell>

        <!-- 3. mTLSAuthentication Box -->
        <mxCell id="box_mtls_auth" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#B91C1C;&quot;&gt;mTLSAuthentication&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:4px;&quot;&gt;• mTLS Authentication Validation Logic&lt;br&gt;• Istio / Anthos Service Mesh Mutual TLS&lt;br&gt;• Gemini IAP Validation &amp;amp; Token Validation&lt;br&gt;• Certificate Authority SPIFFE/SPIRE ID&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#FCA5A5;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="45" y="530" width="260" height="145" as="geometry"/>
        </mxCell>


        <!-- ==================== COLUMN 2: DOMAIN SERVICES & LOGIC TIER ==================== -->
        <!-- x = 330 .. 650 (width = 320, height = 660) -->
        <mxCell id="col2_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#4ADE80;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="330" y="90" width="320" height="660" as="geometry"/>
        </mxCell>
        <mxCell id="col2_title" value="&lt;b style=&quot;font-size:10.5px;color:#15803D;&quot;&gt;DOMAIN SERVICES &amp;amp; LOGIC TIER&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="340" y="96" width="300" height="18" as="geometry"/>
        </mxCell>

        <!-- 1. OrderLifecycleManager Card -->
        <mxCell id="box_order_lifecycle" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#15803D;&quot;&gt;OrderLifecycleManager&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#475569;padding-top:4px;&quot;&gt;Execute SAGA Details Manager&lt;br&gt;Evaluates Inventory Lock &amp;amp; Capture&lt;br&gt;Orchestrates Distributed Rollback &amp;amp; Compensations&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="340" y="120" width="300" height="100" as="geometry"/>
        </mxCell>

        <!-- 2. DynamicPricingOptimizer Card + Nested Gemini Prompt Engine -->
        <mxCell id="box_dynamic_pricing" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="340" y="240" width="300" height="165" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_dynamic_pricing_hdr" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;DynamicPricingOptimizer&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#475569;&quot;&gt;Applies HTTPS Prediction API | Evaluates Coupon &amp;amp; Shipping Rules&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=top;spacingLeft=6;" vertex="1" parent="1">
          <mxGeometry x="345" y="244" width="290" height="32" as="geometry"/>
        </mxCell>
        <!-- Inset Vertex AI Prediction API -->
        <mxCell id="box_vertex_pred_inset" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#16A34A;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="350" y="280" width="280" height="115" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_vertex_pred_hdr" value="&lt;b style=&quot;font-size:9.5px;color:#15803D;&quot;&gt;Vertex AI Prediction API&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=top;" vertex="1" parent="1">
          <mxGeometry x="355" y="284" width="270" height="18" as="geometry"/>
        </mxCell>
        <mxCell id="pill_gemini_prompt_engine" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;font-weight:bold;color:#1D4ED8;&quot;&gt;✨ Gemini Prompt Engine&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;arcSize=15;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#2563EB;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="365" y="318" width="250" height="65" as="geometry"/>
        </mxCell>

        <!-- 3. PaymentProcessor Card -->
        <mxCell id="box_payment_proc" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;&quot;&gt;PaymentProcessor&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:4px;&quot;&gt;Payment Gateway Integration with external API Specs.&lt;br&gt;Within Payment Gateway Integration External API Specs.&lt;br&gt;Idempotency-Key Handshake &amp;amp; PCI Tokenization&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="340" y="420" width="300" height="115" as="geometry"/>
        </mxCell>

        <!-- 4. EventPublisher Card -->
        <mxCell id="box_event_pub" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;&quot;&gt;EventPublisher&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:4px;&quot;&gt;Full Cloud Pub/Sub and Avro encoding / Async Cloud Pub/Sub&lt;br&gt;Transactions: IP Sliding Window encoding&lt;br&gt;Outbox Transaction Pattern Publisher&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="340" y="550" width="300" height="125" as="geometry"/>
        </mxCell>


        <!-- ==================== COLUMN 3: DATA & PERSISTENCE TIER ==================== -->
        <!-- x = 665 .. 985 (width = 320, height = 660) -->
        <mxCell id="col3_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#C084FC;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="665" y="90" width="320" height="660" as="geometry"/>
        </mxCell>
        <mxCell id="col3_title" value="&lt;b style=&quot;font-size:10.5px;color:#7E22CE;&quot;&gt;DATA &amp;amp; PERSISTENCE TIER&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="675" y="96" width="300" height="18" as="geometry"/>
        </mxCell>

        <!-- 1. OrderPersistenceGateway Card -->
        <mxCell id="box_order_persistence" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;OrderPersistenceGateway&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;&quot;&gt;Repository Interface &amp;amp; Schema Mapping&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D8B4FE;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="675" y="120" width="300" height="85" as="geometry"/>
        </mxCell>

        <!-- 2. ProductCacheManager Card -->
        <mxCell id="box_product_cache" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;&quot;&gt;ProductCacheManager&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:4px;&quot;&gt;Memorystore / TypeORM Redis Logic:&lt;br&gt;TTL, Eviction and Redis logic&lt;br&gt;TTL, Eviction policy, Read-Through Caching&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D8B4FE;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="675" y="228" width="300" height="110" as="geometry"/>
        </mxCell>

        <!-- 3. OutboxTablePoller Card -->
        <mxCell id="box_outbox_poller" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10.5px;font-weight:bold;color:#0F172A;&quot;&gt;OutboxTablePoller&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:4px;&quot;&gt;Quick New Async-Cache Delivery&lt;br&gt;Transaction Write row with Record&lt;br&gt;Guarantees At-Least-Once Delivery to Message Bus&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D8B4FE;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="675" y="358" width="300" height="115" as="geometry"/>
        </mxCell>

        <!-- 4. AlloyDB High-Availability Database Container -->
        <mxCell id="box_alloydb_cluster" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#F3E8FF;strokeColor=#9333EA;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="675" y="490" width="300" height="185" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_alloydb_hdr" value="&lt;b style=&quot;font-size:11px;color:#581C87;&quot;&gt;AlloyDB&lt;/b&gt;" style="text;html=1;align=center;verticalAlign=top;" vertex="1" parent="1">
          <mxGeometry x="680" y="494" width="290" height="18" as="geometry"/>
        </mxCell>
        <!-- AlloyDB Primary Instance -->
        <mxCell id="card_alloydb_primary" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;font-weight:bold;color:#0F172A;&quot;&gt;AlloyDB&lt;br&gt;Primary&lt;br&gt;Instance&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:18px;padding-top:4px;&quot;&gt;🗄️&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;color:#7E22CE;font-weight:bold;&quot;&gt;Primary Instance&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9333EA;strokeWidth=1;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="685" y="520" width="130" height="142" as="geometry"/>
        </mxCell>
        <!-- AlloyDB Standby Instance -->
        <mxCell id="card_alloydb_standby" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;font-weight:bold;color:#0F172A;&quot;&gt;AlloyDB&lt;br&gt;Standby&lt;br&gt;Instance&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:18px;padding-top:4px;&quot;&gt;🗄️&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7px;color:#7E22CE;font-weight:bold;&quot;&gt;High Availability&lt;br&gt;with replica&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9333EA;strokeWidth=1;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="835" y="520" width="130" height="142" as="geometry"/>
        </mxCell>
        <mxCell id="arr_alloydb_repl" value="&lt;b style=&quot;font-size:6.5px;color:#7E22CE;&quot;&gt;replica&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#9333EA;strokeWidth=1.2;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="card_alloydb_primary" target="card_alloydb_standby">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>


        <!-- ==================== COLUMN 4: GEMINI & VERTEX AI INTEGRATION ==================== -->
        <!-- x = 1000 .. 1265 (width = 265, height = 660) -->
        <mxCell id="col4_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#60A5FA;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1000" y="90" width="265" height="660" as="geometry"/>
        </mxCell>
        <mxCell id="col4_title" value="&lt;b style=&quot;font-size:9.5px;color:#1D4ED8;&quot;&gt;GEMINI &amp;amp; VERTEX AI INTEGRATION (NEW TIER)&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1005" y="96" width="255" height="18" as="geometry"/>
        </mxCell>

        <!-- 1. Vertex AI Model Garden Card -->
        <mxCell id="box_vertex_garden" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;Vertex AI Model Garden&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#64748B;padding-bottom:6px;&quot;&gt;Foundation models&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;&quot;&gt;• Vertex AI Model Garden&lt;br&gt;• Vertex AI Model (Gemini 1.5 Pro)&lt;br&gt;• Vertex AI Model (Gemini Flash)&lt;br&gt;• Vertex AI Embeddings (Text-Gecko)&lt;br&gt;• Vertex AI Custom Fine-Tuned Models&lt;br&gt;• Model Safety &amp;amp; Content Filtering&lt;br&gt;• ...&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1010" y="120" width="245" height="220" as="geometry"/>
        </mxCell>

        <!-- 2. Gemini API Gateway Card -->
        <mxCell id="box_gemini_gateway" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#1D4ED8;&quot;&gt;Gemini API Gateway&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:4px;&quot;&gt;Gemini API Gateway&lt;br&gt;Gemini AI Server / Router&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;align=center;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1010" y="360" width="245" height="120" as="geometry"/>
        </mxCell>

        <!-- 3. Vector Search Index Card -->
        <mxCell id="box_vector_search" value="&lt;table style=&quot;width:100%;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;Vector Search Index&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;padding-top:4px;&quot;&gt;Product embeddings for&lt;br&gt;product embeddings &amp;amp; semantic recall&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#93C5FD;strokeWidth=1.2;align=center;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1010" y="505" width="245" height="170" as="geometry"/>
        </mxCell>


        <!-- ==================== COLUMN 5: EXTERNAL SERVICES TIER ==================== -->
        <!-- x = 1280 .. 1570 (width = 290, height = 660) -->
        <mxCell id="col5_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#94A3B8;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1280" y="90" width="290" height="660" as="geometry"/>
        </mxCell>
        <mxCell id="col5_title" value="&lt;b style=&quot;font-size:10px;color:#334155;&quot;&gt;EXTERNAL SERVICES TIER (Re-Labeled)&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1290" y="96" width="270" height="18" as="geometry"/>
        </mxCell>

        <!-- 1. Stripe Payment Gateway API v3.0 Card -->
        <mxCell id="box_stripe_gateway" value="&lt;table style=&quot;width:100%;text-align:left;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:11px;font-weight:bold;color:#0F172A;&quot;&gt;Stripe Payment Gateway&lt;br&gt;API v3.0&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:8px;color:#64748B;padding-bottom:4px;&quot;&gt;connectors (&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:7.5px;color:#475569;&quot;&gt;• Stripe Payment Gateway&lt;br&gt;• Stripe Payment Server&lt;br&gt;• Stripe API v3.0&lt;br&gt;• HTTPS Schema /&lt;br&gt;• HTTPS Tokenization /&lt;br&gt;reserves&lt;br&gt;)&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1290" y="120" width="270" height="220" as="geometry"/>
        </mxCell>

        <!-- 2. Microservices Data Plane Card with Mesh Diagram -->
        <mxCell id="box_microservices_mesh" value="" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.2;" vertex="1" parent="1">
          <mxGeometry x="1290" y="360" width="270" height="315" as="geometry"/>
        </mxCell>
        <mxCell id="lbl_mesh_hdr" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;Microservices Data Plane&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7px;color:#64748B;&quot;&gt;Inter-service mesh gRPC/REST communication. Inter-service communication&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=top;spacingLeft=6;" vertex="1" parent="1">
          <mxGeometry x="1295" y="364" width="260" height="36" as="geometry"/>
        </mxCell>
        <!-- 4 Circular Microservice Nodes (A, B, C, D) in Square Topology -->
        <mxCell id="node_svc_a" value="&lt;b style=&quot;font-size:11px;color:#1E40AF;&quot;&gt;A&lt;/b&gt;" style="ellipse;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#2563EB;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1335" y="445" width="46" height="46" as="geometry"/>
        </mxCell>
        <mxCell id="node_svc_b" value="&lt;b style=&quot;font-size:11px;color:#1E40AF;&quot;&gt;B&lt;/b&gt;" style="ellipse;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#2563EB;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1475" y="445" width="46" height="46" as="geometry"/>
        </mxCell>
        <mxCell id="node_svc_c" value="&lt;b style=&quot;font-size:11px;color:#1E40AF;&quot;&gt;C&lt;/b&gt;" style="ellipse;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#2563EB;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1475" y="575" width="46" height="46" as="geometry"/>
        </mxCell>
        <mxCell id="node_svc_d" value="&lt;b style=&quot;font-size:11px;color:#1E40AF;&quot;&gt;B&lt;/b&gt;" style="ellipse;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#2563EB;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1335" y="575" width="46" height="46" as="geometry"/>
        </mxCell>
        <!-- Mesh Inter-service Edges -->
        <mxCell id="edge_mesh_ab" value="&lt;span style=&quot;font-size:6px;color:#1E40AF;&quot;&gt;gRPC/REST&lt;/span&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;endArrow=classic;startArrow=classic;strokeColor=#2563EB;strokeWidth=1;html=1;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="node_svc_a" target="node_svc_b">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_mesh_bc" value="&lt;span style=&quot;font-size:6px;color:#1E40AF;&quot;&gt;gRPC/&lt;br&gt;REST&lt;/span&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;endArrow=classic;startArrow=classic;strokeColor=#2563EB;strokeWidth=1;html=1;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="node_svc_b" target="node_svc_c">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_mesh_cd" value="&lt;span style=&quot;font-size:6px;color:#1E40AF;&quot;&gt;gRPC/REST&lt;/span&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;endArrow=classic;startArrow=classic;strokeColor=#2563EB;strokeWidth=1;html=1;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="node_svc_c" target="node_svc_d">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_mesh_da" value="&lt;span style=&quot;font-size:6px;color:#1E40AF;&quot;&gt;gRPC&lt;/span&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;endArrow=classic;startArrow=classic;strokeColor=#2563EB;strokeWidth=1;html=1;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="node_svc_d" target="node_svc_a">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge_mesh_diag" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=0;endArrow=classic;startArrow=classic;strokeColor=#93C5FD;strokeWidth=1;dashed=1;html=1;" edge="1" parent="1" source="node_svc_a" target="node_svc_c">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>


        <!-- ==================== INTER-TIER & INTRA-TIER CONNECTORS ==================== -->
        <!-- [1] OrderRestController -> OrderLifecycleManager -->
        <mxCell id="arr_c1_to_c2_top" value="&lt;b style=&quot;font-size:7px;color:#15803D;&quot;&gt;Validated DTO,&lt;br&gt;mTLS Auth&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#16A34A;strokeWidth=1.5;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#86EFAC;padding=2;" edge="1" parent="1" source="box_rest_controller" target="box_order_lifecycle">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- [2] GeminiIAPTokenVerifier -> OrderRestController (Internal Auth Chain) -->
        <mxCell id="arr_c1_iap_to_rest" value="&lt;b style=&quot;font-size:6.5px;color:#B91C1C;&quot;&gt;Validated DTO,&lt;br&gt;mTLS Auth&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#EF4444;strokeWidth=1.2;html=1;exitX=0.5;exitY=0;entryX=0.5;entryY=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#FCA5A5;padding=2;" edge="1" parent="1" source="box_iap_verifier" target="box_rest_controller">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- [3] mTLSAuthentication -> GeminiIAPTokenVerifier -->
        <mxCell id="arr_c1_mtls_to_iap" value="&lt;b style=&quot;font-size:6.5px;color:#B91C1C;&quot;&gt;Validated&lt;br&gt;mTLS, DTO&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#EF4444;strokeWidth=1.2;html=1;exitX=0.5;exitY=0;entryX=0.5;entryY=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#FCA5A5;padding=2;" edge="1" parent="1" source="box_mtls_auth" target="box_iap_verifier">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- [4] OrderLifecycleManager -> DynamicPricingOptimizer -->
        <mxCell id="arr_c2_lifecycle_to_pricing" value="&lt;b style=&quot;font-size:6.5px;color:#15803D;&quot;&gt;SAGA details&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#16A34A;strokeWidth=1.2;html=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="box_order_lifecycle" target="box_dynamic_pricing">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- [5] OrderLifecycleManager -> OrderPersistenceGateway -->
        <mxCell id="arr_c2_to_c3_top" value="&lt;b style=&quot;font-size:7px;color:#15803D;&quot;&gt;Persist Entity&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#16A34A;strokeWidth=1.5;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#86EFAC;padding=2;" edge="1" parent="1" source="box_order_lifecycle" target="box_order_persistence">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- [6] DynamicPricingOptimizer (Gemini Prompt Engine) -> ProductCacheManager -->
        <mxCell id="arr_c2_to_c3_cache" value="&lt;b style=&quot;font-size:6.5px;color:#15803D;&quot;&gt;Read-Through Cache&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#16A34A;strokeWidth=1.5;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;labelBackgroundColor=#FFFFFF;labelBorderColor=#86EFAC;padding=1;" edge="1" parent="1" source="box_dynamic_pricing" target="box_product_cache">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- [7] PaymentProcessor -> EventPublisher -->
        <mxCell id="arr_c2_payment_to_event" value="&lt;b style=&quot;font-size:6.5px;color:#15803D;&quot;&gt;Payment Gateways &amp;amp;&lt;br&gt;External API Specs&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#16A34A;strokeWidth=1.2;html=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="box_payment_proc" target="box_event_pub">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- [8] PaymentProcessor -> Stripe Payment Gateway (Route around top of Outbox) -->
        <mxCell id="arr_c2_to_c5_stripe" value="&lt;b style=&quot;font-size:7px;color:#1E40AF;&quot;&gt;Integrated API Specs&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#2563EB;strokeWidth=1.5;dashed=1;html=1;exitX=1;exitY=0.8;entryX=0;entryY=0.8;labelBackgroundColor=#FFFFFF;labelBorderColor=#93C5FD;padding=2;" edge="1" parent="1" source="box_payment_proc" target="box_stripe_gateway">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="655" y="512"/>
              <mxPoint x="655" y="482"/>
              <mxPoint x="990" y="482"/>
              <mxPoint x="990" y="348"/>
              <mxPoint x="1275" y="348"/>
              <mxPoint x="1275" y="296"/>
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- [9] OrderPersistenceGateway -> ProductCacheManager -->
        <mxCell id="arr_c3_gateway_to_cache" value="&lt;b style=&quot;font-size:6.5px;color:#7E22CE;&quot;&gt;Schema &amp;amp; SQL&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#9333EA;strokeWidth=1.2;html=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="box_order_persistence" target="box_product_cache">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- [10] ProductCacheManager -> OutboxTablePoller -->
        <mxCell id="arr_c3_cache_to_outbox" value="&lt;b style=&quot;font-size:6.5px;color:#7E22CE;&quot;&gt;Transaction Details,&lt;br&gt;SQL transaction&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#9333EA;strokeWidth=1.2;html=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="box_product_cache" target="box_outbox_poller">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- [11] OutboxTablePoller -> AlloyDB Cluster -->
        <mxCell id="arr_c3_outbox_to_alloydb" value="&lt;b style=&quot;font-size:6.5px;color:#7E22CE;&quot;&gt;Transaction Details,&lt;br&gt;SQL transaction, SQL&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#9333EA;strokeWidth=1.2;html=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="box_outbox_poller" target="box_alloydb_cluster">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- [12] OutboxTablePoller -> Gemini API Gateway -->
        <mxCell id="arr_c3_to_c4_gemini" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#2563EB;strokeWidth=1.5;html=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="box_outbox_poller" target="box_gemini_gateway">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- [13] Vertex AI Model Garden -> Gemini API Gateway -->
        <mxCell id="arr_c4_garden_to_gateway" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#2563EB;strokeWidth=1.2;html=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="box_vertex_garden" target="box_gemini_gateway">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- [14] Gemini API Gateway -> Vector Search Index -->
        <mxCell id="arr_c4_gateway_to_vector" value="" style="edgeStyle=orthogonalEdgeStyle;rounded=1;arcSize=10;endArrow=block;endFill=1;strokeColor=#2563EB;strokeWidth=1.2;html=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="box_gemini_gateway" target="box_vector_search">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>


        <!-- ==================== FOOTER PATTERN & TECHNOLOGY LEGEND ==================== -->
        <!-- x = 25 .. 1575 (width = 1550, height = 48) -->
        <mxCell id="footer_legend" value="&lt;table style=&quot;width:100%;font-size:7.5px;color:#334155;text-align:center;&quot;&gt;&lt;tr&gt;&lt;td&gt;&lt;b style=&quot;color:#0F172A;&quot;&gt;SAGA Saga-Mediator Pattern&lt;/b&gt;&lt;/td&gt;&lt;td&gt;✉️ &lt;b style=&quot;color:#0F172A;&quot;&gt;Outbox Transaction Pattern&lt;/b&gt;&lt;/td&gt;&lt;td&gt;⤏ &lt;b style=&quot;color:#2563EB;&quot;&gt;Gemini AI Prompt-Response Flow&lt;/b&gt;&lt;/td&gt;&lt;td&gt;☸️ &lt;b&gt;GKE Autopilot Cluster&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🔒 &lt;b&gt;VPC-SC Perimeter&lt;/b&gt;&lt;/td&gt;&lt;td&gt;☁️ &lt;b&gt;Google Cloud Platform&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🧠 &lt;b&gt;Vertex AI Embeddings&lt;/b&gt;&lt;/td&gt;&lt;td&gt;🗄️ &lt;b&gt;AlloyDB PostgreSQL&lt;/b&gt;&lt;/td&gt;&lt;td&gt;✨ &lt;b style=&quot;color:#1D4ED8;&quot;&gt;Gemini AI LLM Engine&lt;/b&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="780" width="1550" height="42" as="geometry"/>
        </mxCell>

        <mxCell id="footer_copyright" value="&lt;span style=&quot;font-size:7px;color:#94A3B8;&quot;&gt;© 2026 Google LLC | Confidential &amp;amp; Proprietary&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="826" width="300" height="14" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
