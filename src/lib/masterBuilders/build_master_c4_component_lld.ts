export function buildC4ComponentLldXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="c4_component_lld" name="C4 Level 3.5: GKE Microservices LLD &amp; Gemini AI Deep Dive (ARCH-C4-02)">
    <mxGraphModel dx="1760" dy="1050" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1780" pageHeight="1050" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- ==================== HEADER BANNER ==================== -->
        <mxCell id="top_logo" value="&lt;span style=&quot;font-size:26px;&quot;&gt;📦&lt;/span&gt;" style="text;html=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="35" y="14" width="40" height="40" as="geometry"/>
        </mxCell>
        <mxCell id="main_title" value="&lt;b style=&quot;font-size:18px;color:#0F172A;letter-spacing:-0.2px;&quot;&gt;C4 MODEL LEVEL 3.5: GKE MICROSERVICES LLD &amp;amp; GEMINI AI DEEP DIVE (ARCH-C4-02)&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="85" y="12" width="1350" height="24" as="geometry"/>
        </mxCell>
        <mxCell id="main_subtitle" value="&lt;span style=&quot;font-size:11.5px;color:#475569;font-weight:600;&quot;&gt;Low-Level Component Design: Ingress Security Filters, SAGA Domain Services, Gemini Prediction Integration, Spanner Data Access &amp;amp; Async Eventing&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="85" y="36" width="1350" height="20" as="geometry"/>
        </mxCell>
        
        <mxCell id="top_gemini_badge" value="&lt;b style=&quot;font-size:14px;color:#2563EB;&quot;&gt;Gemini 3.7 Flash&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#475569;&quot;&gt;Software Arch Engine&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=1.5;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1540" y="14" width="190" height="44" as="geometry"/>
        </mxCell>

        <!-- ==================== OUTER C4 CONTAINER BOUNDARY ==================== -->
        <mxCell id="c4_container_boundary" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#FAFAFA;strokeColor=#475569;strokeWidth=1.5;dashed=1;" vertex="1" parent="1">
          <mxGeometry x="35" y="75" width="1700" height="910" as="geometry"/>
        </mxCell>
        <mxCell id="c4_container_label" value="&lt;b style=&quot;font-size:12px;color:#334155;&quot;&gt;GKE Cluster [Container: Order Management Microservice - Pod Boundary]&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="45" y="82" width="600" height="20" as="geometry"/>
        </mxCell>

        <!-- ==================== COLUMN 1: API INGRESS & SECURITY TIER ==================== -->
        <mxCell id="col1_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#FFF5F5;strokeColor=#F87171;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="50" y="115" width="370" height="850" as="geometry"/>
        </mxCell>
        <mxCell id="col1_title" value="&lt;b style=&quot;font-size:12px;color:#991B1B;&quot;&gt;🛡️ API INGRESS &amp;amp; SECURITY TIER&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;spacingLeft=8;" vertex="1" parent="1">
          <mxGeometry x="60" y="122" width="350" height="22" as="geometry"/>
        </mxCell>

        <mxCell id="box_rest_controller" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#0F172A;&quot;&gt;OrderRestController (Spring Boot / Micronaut)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.4;padding-top:4px;&quot;&gt;• OpenAPI 3.1 Contract &amp;amp; JSON Schema Validation&lt;br&gt;• Async Non-Blocking Reactor Pipeline&lt;br&gt;• Rate Limiting &amp;amp; Token Bucket Filter (Bucket4j)&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#FCA5A5;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="65" y="160" width="340" height="120" as="geometry"/>
        </mxCell>

        <mxCell id="box_iap_verifier" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#B91C1C;&quot;&gt;GeminiIAPTokenVerifier&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.4;padding-top:4px;&quot;&gt;• Identity-Aware Proxy (IAP) JWT Claim Assertion&lt;br&gt;• Google Public Key Cryptographic Signature Check&lt;br&gt;• Context-Aware Principal &amp;amp; RBAC Extraction&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#FCA5A5;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="65" y="300" width="340" height="120" as="geometry"/>
        </mxCell>

        <mxCell id="box_mtls_auth" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#B91C1C;&quot;&gt;mTLS Mesh Authenticator&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.4;padding-top:4px;&quot;&gt;• Istio / Anthos Service Mesh Mutual TLS 1.3&lt;br&gt;• SPIFFE/SPIRE Workload Identity Attestation&lt;br&gt;• Strict Zero-Trust Peer Authentication&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#FCA5A5;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="65" y="440" width="340" height="120" as="geometry"/>
        </mxCell>

        <!-- ==================== COLUMN 2: DOMAIN SERVICES & SAGA TIER ==================== -->
        <mxCell id="col2_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#4ADE80;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="450" y="115" width="410" height="850" as="geometry"/>
        </mxCell>
        <mxCell id="col2_title" value="&lt;b style=&quot;font-size:12px;color:#15803D;&quot;&gt;⚙️ DOMAIN SERVICES &amp;amp; SAGA LOGIC&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;spacingLeft=8;" vertex="1" parent="1">
          <mxGeometry x="460" y="122" width="390" height="22" as="geometry"/>
        </mxCell>

        <mxCell id="box_order_lifecycle" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#15803D;&quot;&gt;OrderLifecycleManager (SAGA Orchestrator)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.4;padding-top:4px;&quot;&gt;• Executes Distributed SAGA Transactions&lt;br&gt;• Evaluates Real-Time Inventory Reservation&lt;br&gt;• Orchestrates Compensating Rollbacks on Failure&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="470" y="160" width="370" height="120" as="geometry"/>
        </mxCell>

        <mxCell id="box_dynamic_pricing" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#15803D;&quot;&gt;DynamicPricingOptimizer&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.4;padding-top:4px;&quot;&gt;• Real-Time Margin &amp;amp; Coupon Rule Engine&lt;br&gt;• Sub-Millisecond Redis Memorystore Cache&lt;br&gt;• Vertex AI Prediction Client Integration&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="470" y="300" width="370" height="120" as="geometry"/>
        </mxCell>

        <mxCell id="box_payment_gateway_client" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#15803D;&quot;&gt;PaymentGatewayClient&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.4;padding-top:4px;&quot;&gt;• Idempotent Charge Submission Engine&lt;br&gt;• Exponential Backoff &amp;amp; Resilience4j Circuit Breaker&lt;br&gt;• PCI-DSS Tokenized Vault Integration&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="470" y="440" width="370" height="120" as="geometry"/>
        </mxCell>

        <!-- ==================== COLUMN 3: GEMINI AI INTEGRATION TIER ==================== -->
        <mxCell id="col3_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="890" y="115" width="410" height="850" as="geometry"/>
        </mxCell>
        <mxCell id="col3_title" value="&lt;b style=&quot;font-size:12px;color:#1D4ED8;&quot;&gt;✨ GEMINI AI &amp;amp; REASONING TIER&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;spacingLeft=8;" vertex="1" parent="1">
          <mxGeometry x="900" y="122" width="390" height="22" as="geometry"/>
        </mxCell>

        <mxCell id="box_gemini_prompt_engine" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#1D4ED8;&quot;&gt;✨ Gemini Prompt &amp;amp; Context Builder&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#334155;line-height:1.4;padding-top:4px;&quot;&gt;• User History &amp;amp; Cart Feature Vector Assembly&lt;br&gt;• Few-Shot Semantic Optimization Templates&lt;br&gt;• Guardrails &amp;amp; PII Scrubbing Interceptors&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="910" y="160" width="370" height="120" as="geometry"/>
        </mxCell>

        <mxCell id="box_vertex_prediction" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#1D4ED8;&quot;&gt;Vertex AI Gemini 3.7 Prediction API&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#334155;line-height:1.4;padding-top:4px;&quot;&gt;• Low-Latency Structured JSON Response Parsing&lt;br&gt;• Dynamic Discount Confidence Score (0.0 - 1.0)&lt;br&gt;• Real-time Churn Risk Mitigation Advice&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#1D4ED8;strokeWidth=2;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="910" y="300" width="370" height="120" as="geometry"/>
        </mxCell>

        <mxCell id="box_ai_audit_logger" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#1D4ED8;&quot;&gt;AI Governance &amp;amp; Explainability Logger&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#334155;line-height:1.4;padding-top:4px;&quot;&gt;• Prompt &amp;amp; Completion Cryptographic Attestation&lt;br&gt;• Model Drift &amp;amp; Toxicity Telemetry Metric Sink&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="910" y="440" width="370" height="120" as="geometry"/>
        </mxCell>

        <!-- ==================== COLUMN 4: DATA ACCESS & EVENTING TIER ==================== -->
        <mxCell id="col4_bg" value="" style="rounded=1;arcSize=2;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#C084FC;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1330" y="115" width="380" height="850" as="geometry"/>
        </mxCell>
        <mxCell id="col4_title" value="&lt;b style=&quot;font-size:12px;color:#6B21A8;&quot;&gt;🗄️ PERSISTENCE &amp;amp; EVENTING TIER&lt;/b&gt;" style="text;html=1;align=left;verticalAlign=middle;spacingLeft=8;" vertex="1" parent="1">
          <mxGeometry x="1340" y="122" width="360" height="22" as="geometry"/>
        </mxCell>

        <mxCell id="box_spanner_repo" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#6B21A8;&quot;&gt;OrderRepository (Cloud Spanner)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.4;padding-top:4px;&quot;&gt;• Globally Distributed ACID Transactions&lt;br&gt;• Mutex Lock Isolation &amp;amp; Schema Versioning&lt;br&gt;• 99.999% SLA High-Availability Storage&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#A855F7;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1350" y="160" width="340" height="120" as="geometry"/>
        </mxCell>

        <mxCell id="box_pubsub_publisher" value="&lt;table style=&quot;width:100%;padding:6px;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;font-size:12px;font-weight:bold;color:#6B21A8;&quot;&gt;OrderEventPublisher (Cloud Pub/Sub)&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-size:10px;color:#475569;line-height:1.4;padding-top:4px;&quot;&gt;• At-Least-Once Delivery Guarantees&lt;br&gt;• Publishes &lt;code&gt;OrderCreated&lt;/code&gt; &amp;amp; &lt;code&gt;OrderFulfilled&lt;/code&gt;&lt;br&gt;• Dead-Letter Topic (DLQ) Auto-Routing&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#A855F7;strokeWidth=1.5;align=left;verticalAlign=top;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1350" y="300" width="340" height="120" as="geometry"/>
        </mxCell>

        <!-- Connectors -->
        <mxCell id="e1" value="1. HTTP POST" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#2563EB;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#93C5FD;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="box_rest_controller" target="box_iap_verifier">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e2" value="2. Verify mTLS" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#2563EB;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#93C5FD;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="box_iap_verifier" target="box_mtls_auth">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e3" value="3. Invoke SAGA" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#16A34A;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#86EFAC;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="box_rest_controller" target="box_order_lifecycle">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e4" value="4. Price Optimization" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#16A34A;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#86EFAC;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="box_order_lifecycle" target="box_dynamic_pricing">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e5" value="5. Build Prompt" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#2563EB;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#93C5FD;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="box_dynamic_pricing" target="box_gemini_prompt_engine">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e6" value="6. Gemini Inference" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#2563EB;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#93C5FD;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="box_gemini_prompt_engine" target="box_vertex_prediction">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e7" value="7. Save State" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#7C3AED;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#D8B4FE;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="box_order_lifecycle" target="box_spanner_repo">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="e8" value="8. Publish Event" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;strokeColor=#7C3AED;strokeWidth=2;endArrow=block;labelBackgroundColor=#FFFFFF;labelBorderColor=#D8B4FE;fontStyle=1;fontSize=9.5;" edge="1" parent="1" source="box_order_lifecycle" target="box_pubsub_publisher">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
