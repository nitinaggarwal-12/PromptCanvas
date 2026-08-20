export function buildSaasMultiTenantXml(): string {
  return `<mxfile host="embed.diagrams.net">
  <diagram id="saas_multi_tenant_app" name="SaaS Multi-Tenant Application Architecture (NEW-APP-09)">
    <mxGraphModel dx="1600" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="950" background="#FFFFFF" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- Top Header Banner -->
        <mxCell id="title_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0F172A;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="16" width="1540" height="54" as="geometry"/>
        </mxCell>
        <mxCell id="main_title" value="&lt;b style=&quot;font-size:17px;color:#0F172A;&quot;&gt;SaaS Multi-Tenant Application Architecture (NEW-APP-09 / #59)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:11px;color:#475569;font-weight:600;&quot;&gt;Tenant Context Routing • Silo vs. Pool Database Isolation • Cloud KMS Envelope Encryption • Quota &amp;amp; Noisy-Neighbor Throttling&lt;/span&gt;" style="text;html=1;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="45" y="18" width="1150" height="50" as="geometry"/>
        </mxCell>
        <mxCell id="top_badge" value="&lt;b style=&quot;font-size:12px;color:#2563EB;&quot;&gt;SaaS Enterprise Tier&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8.5px;color:#64748B;&quot;&gt;Hybrid Silo/Pool Isolation&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1370" y="24" width="180" height="38" as="geometry"/>
        </mxCell>

        <!-- COLUMN 1: TENANT ENTRY & CUSTOM DOMAINS -->
        <mxCell id="col1_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="30" y="85" width="240" height="690" as="geometry"/>
        </mxCell>
        <mxCell id="col1_hdr" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;🌐 TENANT CLIENTS &amp;amp; DOMAINS&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#334155;strokeColor=#1E293B;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="30" y="85" width="240" height="32" as="geometry"/>
        </mxCell>
        <mxCell id="card_tenant_domains" value="&lt;b style=&quot;font-size:10px;color:#0F172A;&quot;&gt;🏢 Tenant Custom Domains&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;• tenant-a.saas-app.com&lt;br&gt;• tenant-b.saas-app.com&lt;br&gt;• custom.enterprise-corp.com&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#94A3B8;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="45" y="135" width="210" height="75" as="geometry"/>
        </mxCell>
        <mxCell id="card_identity_platform" value="&lt;b style=&quot;font-size:10px;color:#1E40AF;&quot;&gt;🔑 Cloud Identity Platform (Multi-Tenant)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#334155;&quot;&gt;• Per-tenant SAML/OIDC SSO (Okta, Azure AD)&lt;br&gt;• Injects tenant_id into signed JWT claims&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="45" y="230" width="210" height="75" as="geometry"/>
        </mxCell>

        <!-- COLUMN 2: INGRESS ROUTING & TENANT CONTEXT -->
        <mxCell id="col2_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#93C5FD;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="310" y="85" width="270" height="690" as="geometry"/>
        </mxCell>
        <mxCell id="col2_hdr" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;⚖️ TENANT ROUTING &amp;amp; WAF GATE&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#2563EB;strokeColor=#1D4ED8;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="310" y="85" width="270" height="32" as="geometry"/>
        </mxCell>
        <mxCell id="card_saas_router" value="&lt;b style=&quot;font-size:10px;color:#1E40AF;&quot;&gt;🌐 Envoy / Gateway API Ingress Router&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;• Extracts tenant_id header / JWT claim&lt;br&gt;• Enforces per-tenant Rate Limiting &amp;amp; Quotas&lt;br&gt;• Prevents Noisy-Neighbor CPU/RAM starvation&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#60A5FA;strokeWidth=1.5;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="325" y="135" width="240" height="85" as="geometry"/>
        </mxCell>
        <mxCell id="card_tenant_admin_plane" value="&lt;b style=&quot;font-size:10px;color:#1E40AF;&quot;&gt;🛠️ Control Plane (Tenant Onboarding)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;• Automated Provisioning (Terraform / API)&lt;br&gt;• Generates per-tenant KMS keys &amp;amp; schemas&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#60A5FA;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="325" y="240" width="240" height="75" as="geometry"/>
        </mxCell>

        <!-- COLUMN 3: COMPUTE TIER (SILO VS POOL) -->
        <mxCell id="col3_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#86EFAC;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="620" y="85" width="410" height="690" as="geometry"/>
        </mxCell>
        <mxCell id="col3_hdr" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;⚙️ COMPUTE TIERS: HYBRID SILO &amp;amp; POOL&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#16A34A;strokeColor=#15803D;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="620" y="85" width="410" height="32" as="geometry"/>
        </mxCell>
        <mxCell id="card_pool_compute" value="&lt;b style=&quot;font-size:10px;color:#166534;&quot;&gt;🏊 Shared Multi-Tenant Pool Tier (Standard Tier)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;• Shared GKE / Cloud Run microservices with thread-local TenantContext&lt;br&gt;• Dynamic resource multiplexing for cost optimization&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="635" y="135" width="380" height="75" as="geometry"/>
        </mxCell>
        <mxCell id="card_silo_compute" value="&lt;b style=&quot;font-size:10px;color:#166534;&quot;&gt;🏰 Dedicated Silo Tier (Enterprise VIP Tenants)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;• Dedicated GKE Autopilot node pool &amp;amp; isolated K8s namespace&lt;br&gt;• Strict physical hardware isolation (Sole-Tenant Nodes)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#86EFAC;strokeWidth=1.5;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="635" y="230" width="380" height="75" as="geometry"/>
        </mxCell>

        <!-- COLUMN 4: DATA PARTITIONING & ISOLATION -->
        <mxCell id="col4_bg" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#D8B4FE;strokeWidth=1.5;" vertex="1" parent="1">
          <mxGeometry x="1070" y="85" width="500" height="690" as="geometry"/>
        </mxCell>
        <mxCell id="col4_hdr" value="&lt;b style=&quot;font-size:11px;color:#FFFFFF;&quot;&gt;🗄️ TENANT DATA PARTITIONING &amp;amp; ENCRYPTION&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#7E22CE;strokeColor=#6B21A8;strokeWidth=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="1070" y="85" width="500" height="32" as="geometry"/>
        </mxCell>
        <mxCell id="card_pool_db" value="&lt;b style=&quot;font-size:10px;color:#6B21A8;&quot;&gt;🗄️ Pooled DB (Row-Level Security / RLS in Cloud SQL)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;• Shared PostgreSQL database with Postgres Row-Level Security (RLS)&lt;br&gt;• Session variable SET app.current_tenant_id = 'tenant-123'&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D8B4FE;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1090" y="135" width="460" height="75" as="geometry"/>
        </mxCell>
        <mxCell id="card_silo_db" value="&lt;b style=&quot;font-size:10px;color:#6B21A8;&quot;&gt;🏛️ Siloed Dedicated Databases (Cloud Spanner / Cloud SQL)&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;• Dedicated project/database instance per enterprise tenant&lt;br&gt;• Separate Cloud KMS Customer-Managed Encryption Key (CMEK) per tenant&lt;br&gt;• Full compliance with HIPAA, SOC2 &amp;amp; GDPR isolation mandates&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D8B4FE;strokeWidth=1.5;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1090" y="230" width="460" height="85" as="geometry"/>
        </mxCell>
        <mxCell id="card_tenant_metering" value="&lt;b style=&quot;font-size:10px;color:#6B21A8;&quot;&gt;📊 Tenant Cost Allocation &amp;amp; Metering Engine&lt;/b&gt;&lt;br&gt;&lt;span style=&quot;font-size:8px;color:#475569;&quot;&gt;• Fine-grained BigQuery export of compute, storage &amp;amp; AI token usage per tenant&lt;br&gt;• Automated invoicing &amp;amp; chargeback attribution&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D8B4FE;strokeWidth=1.2;align=left;verticalAlign=middle;padding=6;" vertex="1" parent="1">
          <mxGeometry x="1090" y="335" width="460" height="75" as="geometry"/>
        </mxCell>

        <!-- FLOW CONNECTORS -->
        <mxCell id="edge_domain_to_router" value="1. TLS + Tenant Host" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#2563EB;fontColor=#1E40AF;fontSize=10;fontStyle=1;labelBackgroundColor=none;" edge="1" parent="1" source="card_tenant_domains" target="card_saas_router"/>
        <mxCell id="edge_router_to_pool" value="2a. Standard Pool Route" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#16A34A;fontColor=#166534;fontSize=10;fontStyle=1;labelBackgroundColor=none;" edge="1" parent="1" source="card_saas_router" target="card_pool_compute"/>
        <mxCell id="edge_router_to_silo" value="2b. VIP Silo Route" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#16A34A;fontColor=#166534;fontSize=10;fontStyle=1;labelBackgroundColor=none;" edge="1" parent="1" source="card_saas_router" target="card_silo_compute"/>
        <mxCell id="edge_pool_to_rls" value="3a. RLS Filtered Queries" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#7E22CE;fontColor=#6B21A8;fontSize=9.5;labelBackgroundColor=none;" edge="1" parent="1" source="card_pool_compute" target="card_pool_db"/>
        <mxCell id="edge_silo_to_silo_db" value="3b. CMEK Encrypted Dedicated" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#7E22CE;fontColor=#6B21A8;fontSize=9.5;labelBackgroundColor=none;" edge="1" parent="1" source="card_silo_compute" target="card_silo_db"/>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
