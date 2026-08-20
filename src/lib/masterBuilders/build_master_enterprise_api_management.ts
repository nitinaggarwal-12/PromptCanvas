export function buildEnterpriseApiManagementXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="enterprise_api_management" name="Enterprise API Management &amp; Integration Architecture (NEW-APP-01)">
    <mxGraphModel dx="1600" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="950" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- Top Header Banner -->
        <mxCell id="title_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="16" width="1540" height="54" as="geometry"/>
        </mxCell>
        <mxCell id="main_title" value="&lt;b style=&quot;font-size:17px;color:#0F172A;&quot;&gt;Enterprise API Management &amp;amp; Integration Architecture (NEW-APP-01 / #51)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:11px;color:#475569;font-weight:600;&quot;&gt;Google Cloud Apigee X Enterprise • Cloud Armor WAF • OAuth2/OIDC Token Mediation • Developer Portal &amp;amp; Advanced API Analytics&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="45" y="18" width="1150" height="50" as="geometry"/>
        </mxCell>
        <mxCell id="top_badge" value="&lt;b style=&quot;font-size:12px;color:#2563EB;&quot;&gt;Google Cloud Apigee X&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#64748B;&quot;&gt;Enterprise API Gateway Tier&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1370" y="24" width="180" height="38" as="geometry"/>
        </mxCell>

        <!-- COLUMN 1: CONSUMERS & CHANNELS -->
        <mxCell id="col1_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="85" width="240" height="690" as="geometry"/>
        </mxCell>
        <mxCell id="col1_hdr" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;📱 CONSUMERS &amp;amp; CHANNELS&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#334155;strokeColor=#1E293B;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="30" y="85" width="240" height="32" as="geometry"/>
        </mxCell>
        <mxCell id="card_web_mobile" value="&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;🌐 Single Page Apps &amp;amp; Mobile Clients&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;• React / iOS / Android Apps&lt;br&gt;• OAuth2 PKCE Authorization Code Flow&lt;br&gt;• Ephemeral Session Bearer Tokens&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="45" y="135" width="210" height="75" as="geometry"/>
        </mxCell>
        <mxCell id="card_b2b_partners" value="&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;🏢 B2B &amp;amp; Partner Ecosystem&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;• Dedicated Partner API Portals&lt;br&gt;• Mutual TLS (mTLS) &amp;amp; API Key Ingestion&lt;br&gt;• Contract-first SLAs &amp;amp; Quota Tiers&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="45" y="225" width="210" height="75" as="geometry"/>
        </mxCell>
        <mxCell id="card_internal_microservices" value="&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;⚡ Internal Services &amp;amp; Agent Tools&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;• Microservice-to-Microservice Calls&lt;br&gt;• MCP Tool Calls &amp;amp; GraphQL Clients&lt;br&gt;• gRPC &amp;amp; REST Service Invocations&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="45" y="315" width="210" height="75" as="geometry"/>
        </mxCell>
        <mxCell id="card_dev_portal" value="&lt;b style=&quot;font-size:10px;color:#1E40AF;&quot;&gt;📚 Integrated Developer Portal&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#334155;&quot;&gt;• OpenAPI 3.0 Documentation Hub&lt;br&gt;• Client SDK Generation &amp;amp; Mock Sandbox&lt;br&gt;• Self-service Key Lifecycle Management&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=1.5;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="45" y="405" width="210" height="85" as="geometry"/>
        </mxCell>

        <!-- COLUMN 2: EDGE INGRESS & CLOUD ARMOR -->
        <mxCell id="col2_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF2F2;strokeColor=#FCA5A5;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="310" y="85" width="240" height="690" as="geometry"/>
        </mxCell>
        <mxCell id="col2_hdr" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;🛡️ EDGE &amp;amp; PERIMETER INGRESS&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DC2626;strokeColor=#B91C1C;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="310" y="85" width="240" height="32" as="geometry"/>
        </mxCell>
        <mxCell id="card_cloud_armor" value="&lt;b style=&quot;font-size:10px;color:#991B1B;&quot;&gt;🛡️ Cloud Armor WAF &amp;amp; DDoS Shield&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;• OWASP Top 10 Preconfigured Rules&lt;br&gt;• Adaptive Rate Limiting &amp;amp; Geo-fencing&lt;br&gt;• Bot Management &amp;amp; reCAPTCHA Enterprise&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#F87171;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="325" y="135" width="210" height="80" as="geometry"/>
        </mxCell>
        <mxCell id="card_global_lb" value="&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;⚖️ Cloud External HTTPS Load Balancer&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;• Single Global Anycast VIP&lt;br&gt;• TLS 1.3 Termination &amp;amp; HTTP/3 (QUIC)&lt;br&gt;• Google-Managed SSL Certificates&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#F87171;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="325" y="235" width="210" height="80" as="geometry"/>
        </mxCell>
        <mxCell id="card_mig_psc" value="&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;🔗 Private Service Connect (PSC)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;• Non-routable Private Transit to Apigee&lt;br&gt;• Zero Public IP Exposure for Control Plane&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#F87171;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="325" y="335" width="210" height="70" as="geometry"/>
        </mxCell>

        <!-- COLUMN 3: APIGEE X API GATEWAY CORE -->
        <mxCell id="col3_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="590" y="85" width="380" height="690" as="geometry"/>
        </mxCell>
        <mxCell id="col3_hdr" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;⚡ APIGEE X POLICY &amp;amp; MEDIATION PLANE&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="590" y="85" width="380" height="32" as="geometry"/>
        </mxCell>
        <mxCell id="card_auth_policy" value="&lt;b style=&quot;font-size:9.5px;color:#1E3A8A;&quot;&gt;🔑 OAuth2 / JWT / OIDC Verification Policy&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#475569;&quot;&gt;Verify API Key, Token Introspection, Claims Extraction &amp;amp; Identity Exchange&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#60A5FA;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="605" y="130" width="350" height="55" as="geometry"/>
        </mxCell>
        <mxCell id="card_quota_policy" value="&lt;b style=&quot;font-size:9.5px;color:#1E3A8A;&quot;&gt;⏱️ Rate Limiting, Quotas &amp;amp; Spike Arrest Policy&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#475569;&quot;&gt;Per-client SLA Tiers, Burst Throttling, Monetization &amp;amp; Distributed Counters&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#60A5FA;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="605" y="195" width="350" height="55" as="geometry"/>
        </mxCell>
        <mxCell id="card_transform_policy" value="&lt;b style=&quot;font-size:9.5px;color:#1E3A8A;&quot;&gt;🔄 Data Transformation &amp;amp; Payload Mediation&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#475569;&quot;&gt;JSON-to-XML, SOAP Translation, Schema Validation &amp;amp; Field Masking (PII)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#60A5FA;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="605" y="260" width="350" height="55" as="geometry"/>
        </mxCell>
        <mxCell id="card_routing_policy" value="&lt;b style=&quot;font-size:9.5px;color:#1E3A8A;&quot;&gt;🔀 Dynamic Semantic Routing &amp;amp; Versioning&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#475569;&quot;&gt;Canary Releases, Semantic Path Routing (/v1 to /v2) &amp;amp; Automated Circuit Breaking&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#60A5FA;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="605" y="325" width="350" height="55" as="geometry"/>
        </mxCell>
        <mxCell id="card_caching_policy" value="&lt;b style=&quot;font-size:9.5px;color:#1E3A8A;&quot;&gt;⚡ High-Speed Response Cache &amp;amp; Mocking Plane&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:7.5px;color:#475569;&quot;&gt;In-Memory Microsecond Response Caching &amp;amp; Local Sandbox Mock Responses&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#60A5FA;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="605" y="390" width="350" height="55" as="geometry"/>
        </mxCell>

        <!-- COLUMN 4: BACKEND SERVICES & WORKLOADS -->
        <mxCell id="col4_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#86EFAC;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1010" y="85" width="270" height="690" as="geometry"/>
        </mxCell>
        <mxCell id="col4_hdr" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;⚙️ BACKEND WORKLOADS &amp;amp; APIS&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#16A34A;strokeColor=#15803D;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1010" y="85" width="270" height="32" as="geometry"/>
        </mxCell>
        <mxCell id="card_gke_services" value="&lt;b style=&quot;font-size:10px;color:#166534;&quot;&gt;☸️ GKE Microservice Fleet&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Order, Billing &amp;amp; Inventory APIs (mTLS)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1025" y="135" width="240" height="65" as="geometry"/>
        </mxCell>
        <mxCell id="card_cloud_run" value="&lt;b style=&quot;font-size:10px;color:#166534;&quot;&gt;🚀 Cloud Run Serverless Workloads&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Auto-scaling Event Endpoints &amp;amp; Webhooks&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1025" y="220" width="240" height="65" as="geometry"/>
        </mxCell>
        <mxCell id="card_legacy_erp" value="&lt;b style=&quot;font-size:10px;color:#166534;&quot;&gt;🏛️ On-Premises &amp;amp; Legacy ERP Systems&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Cloud Interconnect / VPN Transit&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1025" y="305" width="240" height="65" as="geometry"/>
        </mxCell>
        <mxCell id="card_ai_agent_mcp" value="&lt;b style=&quot;font-size:10px;color:#166534;&quot;&gt;🤖 Vertex AI &amp;amp; MCP Agent Tools&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Gemini Tool Invocation &amp;amp; RAG Endpoints&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.2;align=center;verticalAlign=middle;padding=4;" vertex="1" parent="1">
          <mxGeometry x="1025" y="390" width="240" height="65" as="geometry"/>
        </mxCell>

        <!-- COLUMN 5: OBSERVABILITY & GOVERNANCE -->
        <mxCell id="col5_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#D8B4FE;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1320" y="85" width="250" height="690" as="geometry"/>
        </mxCell>
        <mxCell id="col5_hdr" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;📊 ANALYTICS &amp;amp; GOVERNANCE&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#7E22CE;strokeColor=#6B21A8;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1320" y="85" width="250" height="32" as="geometry"/>
        </mxCell>
        <mxCell id="card_apigee_analytics" value="&lt;b style=&quot;font-size:10px;color:#6B21A8;&quot;&gt;📈 Apigee Advanced API Analytics&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Latency percentiles (p95/p99), error rates, traffic spikes &amp;amp; SLA reports&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D8B4FE;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1335" y="135" width="220" height="75" as="geometry"/>
        </mxCell>
        <mxCell id="card_cloud_monitoring" value="&lt;b style=&quot;font-size:10px;color:#6B21A8;&quot;&gt;👁️ Cloud Logging &amp;amp; OpenTelemetry&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Distributed traces, correlation IDs &amp;amp; audit trails to BigQuery&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D8B4FE;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1335" y="230" width="220" height="75" as="geometry"/>
        </mxCell>
        <mxCell id="card_api_security" value="&lt;b style=&quot;font-size:10px;color:#6B21A8;&quot;&gt;🔒 Advanced API Security&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;Anomaly detection, credential stuffing defense &amp;amp; bot scoring&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D8B4FE;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1335" y="325" width="220" height="75" as="geometry"/>
        </mxCell>

        <!-- FLOW CONNECTORS -->
        <mxCell id="edge_c1_to_c2" value="1. HTTPS / TLS 1.3" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#2563EB;fontColor=#1E40AF;fontSize=10;fontStyle=1;labelBackgroundColor=none;" edge="1" parent="1" source="card_web_mobile" target="card_cloud_armor"/>
        <mxCell id="edge_c2_to_c3" value="2. PSC Enclave" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#DC2626;fontColor=#991B1B;fontSize=10;fontStyle=1;labelBackgroundColor=none;" edge="1" parent="1" source="card_mig_psc" target="card_auth_policy"/>
        <mxCell id="edge_c3_to_c4" value="3. Secure mTLS Egress" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#16A34A;fontColor=#166534;fontSize=10;fontStyle=1;labelBackgroundColor=none;" edge="1" parent="1" source="card_routing_policy" target="card_gke_services"/>
        <mxCell id="edge_c3_to_c5" value="4. Real-time Telemetry" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=1.5;strokeColor=#7E22CE;fontColor=#6B21A8;fontSize=9.5;dashed=1;labelBackgroundColor=none;" edge="1" parent="1" source="card_caching_policy" target="card_apigee_analytics"/>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
