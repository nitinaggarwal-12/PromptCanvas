export function buildC4ComponentLldXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="c4_component_lld" name="C4 Level 3 Component Diagram &amp; Microservice Low-Level Design (LLD)">
    <mxGraphModel dx="1600" dy="720" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="720" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- ==================== HEADER BANNER ==================== -->
        <mxCell id="top_logo" value="&lt;span style=&quot;font-size:24px;&quot;&gt;🧩&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="8" width="35" height="35" as="geometry"/>
        </mxCell>
        <mxCell id="main_title" value="&lt;b style=&quot;font-size:18px;color:#0F172A;&quot;&gt;C4 MODEL LEVEL 3: COMPONENT DIAGRAM &amp;amp; MICROSERVICE LOW-LEVEL DESIGN (LLD)&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="65" y="8" width="1150" height="24" as="geometry"/>
        </mxCell>
        <mxCell id="main_subtitle" value="&lt;span style=&quot;font-size:10.5px;color:#475569;font-weight:600;&quot;&gt;Container Internals: REST/gRPC Controllers, Auth Interceptors, Domain Services, HikariCP Repositories, Redis Cache &amp;amp; Pub/Sub Outbox&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="65" y="30" width="1150" height="18" as="geometry"/>
        </mxCell>
        <mxCell id="top_gemini_badge" value="&lt;b style=&quot;font-size:16px;color:#2563EB;&quot;&gt;✨ Gemini 3.7 Flash&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Software Arch Engine&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1420" y="8" width="150" height="38" as="geometry"/>
        </mxCell>

        <!-- ==================== OUTER C4 CONTAINER BOUNDARY ==================== -->
        <mxCell id="c4_container_boundary" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#475569;strokeWidth=2;dashed=1;" vertex="1" parent="1">
          <mxGeometry x="25" y="60" width="1550" height="585" as="geometry"/>
        </mxCell>
        <mxCell id="c4_container_label" value="&lt;b style=&quot;font-size:11px;color:#334155;&quot;&gt;📦 [Container: Cloud Run / Node.js &amp;amp; Go Microservice Boundary]&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="35" y="66" width="600" height="18" as="geometry"/>
        </mxCell>

        <!-- ==================== COLUMN 1: INGRESS CONTROLLERS & MIDDLEWARE ==================== -->
        <mxCell id="col1_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#60A5FA;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="40" y="90" width="340" height="540" as="geometry"/>
        </mxCell>
        <mxCell id="col1_title" value="&lt;b style=&quot;font-size:11px;color:#1D4ED8;&quot;&gt;🌐 Ingress Controllers &amp;amp; Middleware Tier&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="50" y="96" width="320" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="node_rest_controller" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;OrderRestController&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;POST /api/v2/orders &amp;nbsp;|&amp;nbsp; GET /api/v2/orders/:id&lt;br&gt;Request DTO Validation (Zod / Joi Schema)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="45" y="125" width="330" height="74" as="geometry"/>
        </mxCell>

        <mxCell id="node_grpc_handler" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;PaymentGrpcServerHandler&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Protobuf v3 RPC Interface (:50051)&lt;br&gt;Low-Latency Internal Microservice Transit&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="45" y="235" width="330" height="74" as="geometry"/>
        </mxCell>

        <mxCell id="node_auth_interceptor" value="&lt;b style=&quot;font-size:10.5px;color:#1D4ED8;&quot;&gt;JwtAuthSecurityInterceptor&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;OAuth2 Bearer Token Extraction &amp;amp; RBAC Claims Check&lt;/span&gt;" style="shape=hexagon;perimeter=hexagonPerimeter2;whiteSpace=wrap;html=1;fixedSize=1;fillColor=#DBEAFE;strokeColor=#1D4ED8;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="45" y="345" width="330" height="76" as="geometry"/>
        </mxCell>

        <mxCell id="node_rate_limiter_middleware" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;RateLimitLoggingMiddleware&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;W3C Trace Context / Correlation ID Injection&lt;br&gt;Client IP Sliding-Window Quota Guard&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="45" y="455" width="330" height="70" as="geometry"/>
        </mxCell>

        <!-- ==================== COLUMN 2: DOMAIN SERVICES ==================== -->
        <mxCell id="col2_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#22C55E;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="410" y="90" width="360" height="540" as="geometry"/>
        </mxCell>
        <mxCell id="col2_title" value="&lt;b style=&quot;font-size:11px;color:#15803D;&quot;&gt;🧠 Core Domain Services Tier&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="420" y="96" width="340" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="node_order_domain_service" value="&lt;b style=&quot;font-size:10.5px;color:#15803D;&quot;&gt;OrderFulfillmentService&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Executes SAGA Distributed Transaction&lt;br&gt;Orchestrates Inventory Lock &amp;amp; Card Capture&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#15803D;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="415" y="125" width="350" height="74" as="geometry"/>
        </mxCell>

        <mxCell id="node_pricing_calc_service" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;DynamicPricingCalculator&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Applies Tax Rates (Vertex Tax API)&lt;br&gt;Evaluates Coupon Codes &amp;amp; Shipping Rules&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="415" y="235" width="350" height="74" as="geometry"/>
        </mxCell>

        <mxCell id="node_fraud_eval_service" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;FraudDetectionAiAdvisor&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;✨ Gemini 3.7 Flash Sub-Second Risk Scorer&lt;br&gt;Flags Suspicious Velocity &amp;amp; Stolen Cards&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="415" y="345" width="350" height="76" as="geometry"/>
        </mxCell>

        <mxCell id="node_event_publisher_service" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;DomainEventPublisher&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Publishes OrderCreatedEvent (Avro)&lt;br&gt;Transactional Outbox Pattern Implementation&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="415" y="455" width="350" height="70" as="geometry"/>
        </mxCell>

        <!-- ==================== COLUMN 3: REPOSITORIES & CACHE ==================== -->
        <mxCell id="col3_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#A855F7;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="795" y="90" width="365" height="540" as="geometry"/>
        </mxCell>
        <mxCell id="col3_title" value="&lt;b style=&quot;font-size:11px;color:#7E22CE;&quot;&gt;💾 Persistence &amp;amp; Repositories Tier&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="805" y="96" width="345" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="node_order_repo" value="&lt;b style=&quot;font-size:10.5px;color:#7E22CE;&quot;&gt;OrderPostgresRepository&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Prisma / TypeORM / Go GORM Client&lt;br&gt;HikariCP Pool (Max: 50, Timeout: 30s)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F3E8FF;strokeColor=#7E22CE;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="800" y="125" width="355" height="74" as="geometry"/>
        </mxCell>

        <mxCell id="node_redis_cache_mgr" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;RedisCacheManager&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Memorystore Read-Through Caching&lt;br&gt;TTL Expiration &amp;amp; Redlock Distributed Mutex&lt;/span&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=6;fillColor=#FFFFFF;strokeColor=#9333EA;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="800" y="235" width="355" height="74" as="geometry"/>
        </mxCell>

        <mxCell id="node_outbox_repo" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;OutboxTablePollerRepository&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Guarantees At-Least-Once Delivery&lt;br&gt;Atomically Writes Event with DB Record&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9333EA;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="800" y="345" width="355" height="76" as="geometry"/>
        </mxCell>

        <mxCell id="node_audit_repo" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;SecurityAuditRepository&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Async Immutable Audit Logging to Cloud Logging&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9333EA;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="800" y="455" width="355" height="70" as="geometry"/>
        </mxCell>

        <!-- ==================== COLUMN 4: EXTERNAL CLOUD INFRASTRUCTURE ==================== -->
        <mxCell id="col4_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFBEB;strokeColor=#F59E0B;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1185" y="90" width="375" height="540" as="geometry"/>
        </mxCell>
        <mxCell id="col4_title" value="&lt;b style=&quot;font-size:11px;color:#B45309;&quot;&gt;⚡ External Cloud Infrastructure Tier&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1195" y="96" width="355" height="20" as="geometry"/>
        </mxCell>

        <mxCell id="node_alloydb_db" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;AlloyDB for PostgreSQL HA Cluster&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#B45309;&quot;&gt;Primary ACID Relational Store (Orders/Items)&lt;br&gt;Private Service Connect (PSC 10.50.0.5)&lt;/span&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=6;fillColor=#FEF3C7;strokeColor=#D97706;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1190" y="125" width="365" height="74" as="geometry"/>
        </mxCell>

        <mxCell id="node_cloud_pubsub_topic" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;Cloud Pub/Sub (order.events topic)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Enterprise Asynchronous Message Broker (Avro)&lt;/span&gt;" style="shape=mxgraph.flowchart.direct_data;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1190" y="235" width="365" height="74" as="geometry"/>
        </mxCell>

        <mxCell id="node_gemini_vertex_api" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;Vertex AI Gemini 3.7 Flash API&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Real-Time Fraud Evaluation &amp;amp; Context Parsing&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1190" y="345" width="365" height="76" as="geometry"/>
        </mxCell>

        <mxCell id="node_payment_gateway_ext" value="&lt;b style=&quot;font-size:10.5px;color:#0F172A;&quot;&gt;External Payment Gateway (Stripe/Adyen)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;HTTPS mTLS Tokenized Credit Card Charge (PCI-DSS)&lt;/span&gt;" style="shape=hexagon;perimeter=hexagonPerimeter2;whiteSpace=wrap;html=1;fixedSize=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.2;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1190" y="455" width="365" height="70" as="geometry"/>
        </mxCell>

        <!-- ==================== NUMBERED PROTOCOL CONNECTORS ==================== -->
        <!-- [1] REST Controller -> Auth Interceptor -->
        <mxCell id="edge1" value="&lt;b style=&quot;font-size:7px;color:#2563EB;&quot;&gt;[1] HTTPS :443 (JSON)&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;" edge="1" parent="1" source="node_rest_controller" target="node_auth_interceptor">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- [2] Auth Interceptor -> Domain Service -->
        <mxCell id="edge2" value="&lt;b style=&quot;font-size:7px;color:#2563EB;&quot;&gt;[2] RBAC Claim Validated&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#2563EB;strokeWidth=1.5;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;" edge="1" parent="1" source="node_auth_interceptor" target="node_order_domain_service">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- [3] Domain Service -> Fraud AI -->
        <mxCell id="edge3" value="&lt;b style=&quot;font-size:7px;color:#16A34A;&quot;&gt;[3] Risk Assessment&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#16A34A;strokeWidth=1.5;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;" edge="1" parent="1" source="node_order_domain_service" target="node_fraud_eval_service">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- [4] Domain Service -> Order Repo -->
        <mxCell id="edge4" value="&lt;b style=&quot;font-size:7px;color:#16A34A;&quot;&gt;[4] Persist Entity&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#16A34A;strokeWidth=1.5;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;" edge="1" parent="1" source="node_order_domain_service" target="node_order_repo">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- [5] Order Repo -> AlloyDB -->
        <mxCell id="edge5" value="&lt;b style=&quot;font-size:7px;color:#7E22CE;&quot;&gt;[5] HikariCP Pool :5432&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#7E22CE;strokeWidth=1.5;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;" edge="1" parent="1" source="node_order_repo" target="node_alloydb_db">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- [6] Event Publisher -> Outbox Repo -->
        <mxCell id="edge6" value="&lt;b style=&quot;font-size:7px;color:#16A34A;&quot;&gt;[6] Outbox Write&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#16A34A;strokeWidth=1.5;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;" edge="1" parent="1" source="node_event_publisher_service" target="node_outbox_repo">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- [7] Outbox Repo -> Pub/Sub Topic -->
        <mxCell id="edge7" value="&lt;b style=&quot;font-size:7px;color:#D97706;&quot;&gt;[7] Avro Event Publish&lt;/b&gt;" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeColor=#D97706;strokeWidth=1.5;endArrow=block;endFill=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;" edge="1" parent="1" source="node_outbox_repo" target="node_cloud_pubsub_topic">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- ==================== FOOTER LEGEND ==================== -->
        <mxCell id="footer_legend" value="&lt;span style=&quot;font-size:9px;color:#475569;&quot;&gt;&lt;b&gt;C4 L3 LLD Legend:&lt;/b&gt; 🔵 Ingress &amp;amp; Auth Interceptors &amp;nbsp;|&amp;nbsp; 🟢 SAGA Domain Services &amp;nbsp;|&amp;nbsp; 🟣 Repositories &amp;amp; Redis Cylinder &amp;nbsp;|&amp;nbsp; 🗄️ AlloyDB Database Cylinder &amp;nbsp;|&amp;nbsp; ── [1]-[7] Protocol Vectors&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="25" y="658" width="1550" height="32" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
