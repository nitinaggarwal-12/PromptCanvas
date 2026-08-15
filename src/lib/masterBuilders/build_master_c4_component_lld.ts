export function buildC4ComponentLldXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="c4_component_lld" name="C4 Level 3 Component Diagram &amp; Microservice Low-Level Design (LLD)">
    <mxGraphModel dx="1400" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1400" pageHeight="720" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- Header Banner -->
        <mxCell id="top_logo" value="&lt;span style=&quot;font-size:24px;&quot;&gt;🧩&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="10" width="35" height="35" as="geometry"/>
        </mxCell>
        <mxCell id="main_title" value="&lt;b style=&quot;font-size:18px;color:#0F172A;&quot;&gt;C4 MODEL LEVEL 3: COMPONENT DIAGRAM &amp;amp; MICROSERVICE LOW-LEVEL DESIGN (LLD)&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="65" y="10" width="1050" height="24" as="geometry"/>
        </mxCell>
        <mxCell id="main_subtitle" value="&lt;span style=&quot;font-size:11px;color:#475569;font-weight:600;&quot;&gt;Detailed Container Internal Architecture: REST Controllers, Auth Interceptors, Domain Services, Repositories, Redis Cache &amp;amp; Event Sinks&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="65" y="32" width="1050" height="18" as="geometry"/>
        </mxCell>
        <mxCell id="top_gemini_badge" value="&lt;b style=&quot;font-size:14px;color:#2563EB;&quot;&gt;Gemini 3.7 Flash&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Software Arch Engine&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1220" y="10" width="140" height="36" as="geometry"/>
        </mxCell>

        <!-- Container Box (The Outer Microservice Boundary) -->
        <mxCell id="c4_container_boundary" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#475569;strokeWidth=2;dashed=1;" vertex="1" parent="1">
          <mxGeometry x="25" y="65" width="1335" height="580" as="geometry"/>
        </mxCell>
        <mxCell id="c4_container_label" value="&lt;b style=&quot;font-size:11px;color:#334155;&quot;&gt;📦 [Container: Cloud Run / Node.js &amp;amp; Go] Payment &amp;amp; Order Fulfillment Microservice&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="35" y="70" width="550" height="20" as="geometry"/>
        </mxCell>

        <!-- Column 1: API Controllers & Gateways -->
        <mxCell id="col1_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#60A5FA;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="40" y="95" width="280" height="535" as="geometry"/>
        </mxCell>
        <mxCell id="col1_title" value="&lt;b style=&quot;font-size:11px;color:#1D4ED8;&quot;&gt;🌐 Ingress Controllers &amp;amp; Middleware&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="50" y="102" width="260" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="node_rest_controller" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;OrderRestController&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;POST /api/v2/orders&lt;br&gt;GET /api/v2/orders/:id&lt;br&gt;Request DTO Validation (Zod / Joi)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="50" y="135" width="260" height="85" as="geometry"/>
        </mxCell>

        <mxCell id="node_grpc_handler" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;PaymentGrpcServerHandler&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Protobuf v3 RPC Interface&lt;br&gt;Low-Latency Internal Microservice Transit&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="50" y="245" width="260" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_auth_interceptor" value="&lt;b style=&quot;font-size:11px;color:#1D4ED8;&quot;&gt;JwtAuthSecurityInterceptor&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;OAuth2 Bearer Token Extraction&lt;br&gt;Role-Based Access Control (RBAC) Claim Check&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#1D4ED8;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="50" y="345" width="260" height="85" as="geometry"/>
        </mxCell>

        <mxCell id="node_rate_limiter_middleware" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;RateLimitLoggingMiddleware&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;W3C Trace Context / Correlator ID Injection&lt;br&gt;Client IP Sliding-Window Quota Guard&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="50" y="455" width="260" height="75" as="geometry"/>
        </mxCell>

        <!-- Column 2: Domain Services & Business Logic -->
        <mxCell id="col2_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#22C55E;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="345" y="95" width="310" height="535" as="geometry"/>
        </mxCell>
        <mxCell id="col2_title" value="&lt;b style=&quot;font-size:11px;color:#15803D;&quot;&gt;🧠 Core Domain Services Tier&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="355" y="102" width="290" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="node_order_domain_service" value="&lt;b style=&quot;font-size:11px;color:#15803D;&quot;&gt;OrderFulfillmentService&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Executes SAGA Distributed Transaction&lt;br&gt;Orchestrates Inventory Lock &amp;amp; Card Capture&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#15803D;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="355" y="135" width="290" height="85" as="geometry"/>
        </mxCell>

        <mxCell id="node_pricing_calc_service" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;DynamicPricingCalculator&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Applies Tax Rates (Vertex Tax API)&lt;br&gt;Evaluates Coupon Codes &amp;amp; Shipping Rules&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="355" y="245" width="290" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_fraud_eval_service" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;FraudDetectionAiAdvisor&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Gemini 3.7 Flash Sub-Second Risk Scorer&lt;br&gt;Flags Suspicious Velocity &amp;amp; Stolen Cards&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="355" y="345" width="290" height="85" as="geometry"/>
        </mxCell>

        <mxCell id="node_event_publisher_service" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;DomainEventPublisher&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Publishes OrderCreatedEvent (Avro)&lt;br&gt;Transactional Outbox Pattern Implementation&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="355" y="455" width="290" height="75" as="geometry"/>
        </mxCell>

        <!-- Column 3: Data Access, Caching & Repositories -->
        <mxCell id="col3_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#A855F7;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="680" y="95" width="310" height="535" as="geometry"/>
        </mxCell>
        <mxCell id="col3_title" value="&lt;b style=&quot;font-size:11px;color:#7E22CE;&quot;&gt;💾 Persistence &amp;amp; Repositories Tier&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="690" y="102" width="290" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="node_order_repo" value="&lt;b style=&quot;font-size:11px;color:#7E22CE;&quot;&gt;OrderPostgresRepository&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Prisma / TypeORM / Go GORM Client&lt;br&gt;Read/Write Split &amp;amp; Connection Pooling (HikariCP)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F3E8FF;strokeColor=#7E22CE;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="690" y="135" width="290" height="85" as="geometry"/>
        </mxCell>

        <mxCell id="node_redis_cache_mgr" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;RedisCacheManager&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Memorystore Read-Through Caching&lt;br&gt;TTL Expiration &amp;amp; Distributed Mutex Lock (Redlock)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9333EA;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="690" y="245" width="290" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_outbox_repo" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;OutboxTablePollerRepository&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Guarantees At-Least-Once Delivery&lt;br&gt;Atomically Writes Event with DB Record&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9333EA;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="690" y="345" width="290" height="85" as="geometry"/>
        </mxCell>

        <mxCell id="node_audit_repo" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;SecurityAuditRepository&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Async Immutable Audit Logging&lt;br&gt;Emits Structured JSON to stdout/Cloud Logging&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9333EA;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="690" y="455" width="290" height="75" as="geometry"/>
        </mxCell>

        <!-- Column 4: External Cloud Infrastructure & Downstream Targets -->
        <mxCell id="col4_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFBEB;strokeColor=#F59E0B;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1015" y="95" width="330" height="535" as="geometry"/>
        </mxCell>
        <mxCell id="col4_title" value="&lt;b style=&quot;font-size:11px;color:#B45309;&quot;&gt;⚡ External Infrastructure &amp;amp; Cloud DBs&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1025" y="102" width="310" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="node_alloydb_db" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;AlloyDB for PostgreSQL HA Cluster&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#B45309;&quot;&gt;Primary ACID Relational Store (Orders/Items)&lt;br&gt;Private Service Connect (PSC 10.50.0.5)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF3C7;strokeColor=#D97706;strokeWidth=2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1025" y="135" width="310" height="85" as="geometry"/>
        </mxCell>

        <mxCell id="node_cloud_pubsub_topic" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Cloud Pub/Sub (order.events topic)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Enterprise Asynchronous Message Broker&lt;br&gt;Schema Registry Validated Avro Payloads&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1025" y="245" width="310" height="75" as="geometry"/>
        </mxCell>

        <mxCell id="node_gemini_vertex_api" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;Vertex AI Gemini 3.7 Flash API&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Real-Time Fraud Evaluation &amp;amp; Context Parsing&lt;br&gt;Sub-100ms gRPC Private Endpoint&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1025" y="345" width="310" height="85" as="geometry"/>
        </mxCell>

        <mxCell id="node_payment_gateway_ext" value="&lt;b style=&quot;font-size:11px;color:#0F172A;&quot;&gt;External Payment Gateway (Stripe/Adyen)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;HTTPS mTLS Tokenized Credit Card Charge&lt;br&gt;PCI-DSS Level 1 Enclave&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1025" y="455" width="310" height="75" as="geometry"/>
        </mxCell>

        <!-- Connecting Edges -->
        <mxCell id="edge1" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=2;" edge="1" parent="1" source="node_rest_controller" target="node_auth_interceptor">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge2" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=2;" edge="1" parent="1" source="node_auth_interceptor" target="node_order_domain_service">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge3" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16A34A;strokeWidth=2;" edge="1" parent="1" source="node_order_domain_service" target="node_fraud_eval_service">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge4" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16A34A;strokeWidth=2;" edge="1" parent="1" source="node_order_domain_service" target="node_order_repo">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge5" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#7E22CE;strokeWidth=2;" edge="1" parent="1" source="node_order_repo" target="node_alloydb_db">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge6" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16A34A;strokeWidth=2;" edge="1" parent="1" source="node_event_publisher_service" target="node_outbox_repo">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge7" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#D97706;strokeWidth=2;" edge="1" parent="1" source="node_outbox_repo" target="node_cloud_pubsub_topic">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="edge8" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#D97706;strokeWidth=2;" edge="1" parent="1" source="node_fraud_eval_service" target="node_gemini_vertex_api">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="660" y="387"/>
              <mxPoint x="660" y="387"/>
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- Footer Legend -->
        <mxCell id="footer_legend" value="&lt;span style=&quot;font-size:9.5px;color:#475569;&quot;&gt;&lt;b&gt;C4 L3 LLD Architecture:&lt;/b&gt; 🔵 Ingress &amp;amp; Auth Interceptors &amp;nbsp;|&amp;nbsp; 🟢 SAGA Domain Services &amp;nbsp;|&amp;nbsp; 🟣 Repositories &amp;amp; Outbox &amp;nbsp;|&amp;nbsp; 🟡 Cloud DBs &amp;amp; Gemini 3.7 API &amp;nbsp;|&amp;nbsp; ⚡ Powered by Gemini 3.7 Flash&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="655" width="1335" height="30" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
