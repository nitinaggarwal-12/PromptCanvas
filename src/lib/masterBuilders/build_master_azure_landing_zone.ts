/**
 * 🏛️ Master Architecture Builder: Azure Application Landing Zone (VIS-5965)
 * 100% 1:1 Ground-Truth Visual Twin of Microsoft Azure Architecture Center Application Landing Zone
 * (Workload Resources, Agentic Subnet / Container Apps, Private Link, AI Foundry Hub, Subscription Vending & Yellow Connectivity Hub)
 */

export function generateAzureLandingZoneArchitectureXml(): string {
  return `<mxfile host="embed.diagrams.net" modified="${new Date().toISOString()}" agent="PromptCanvas Master Compiler" version="24.0.0">
  <diagram id="azure_app_landing_zone_master" name="Azure Application Landing Zone">
    <mxGraphModel dx="1600" dy="1000" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="1000" background="#FFFFFF">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>

        <!-- Top-Left Title Pill & Legend -->
        <mxCell id="title_pill" value="&lt;div style=&quot;display:flex;align-items:center;gap:8px;&quot;&gt;&lt;svg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;18&quot; height=&quot;18&quot; viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;#60A5FA&quot; stroke-width=&quot;2&quot;&gt;&lt;path d=&quot;M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z&quot;/&gt;&lt;/svg&gt;&lt;span style=&quot;color:#FFFFFF;font-weight:700;&quot;&gt;Application landing zone subscription&lt;/span&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#1E3A8A;strokeColor=#1D4ED8;fontColor=#FFFFFF;fontSize=13;fontStyle=1;align=center;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="115" y="22" width="290" height="38" as="geometry"/>
        </mxCell>

        <mxCell id="legend_box" value="&lt;div style=&quot;font-size:11px;color:#0F172A;text-align:left;padding:2px 6px;&quot;&gt;&lt;div&gt;&lt;b style=&quot;color:#1D4ED8;&quot;&gt;───►&lt;/b&gt; Provisioned resource&lt;/div&gt;&lt;div&gt;&lt;b style=&quot;color:#EA580C;&quot;&gt;- - -►&lt;/b&gt; Centralized resource&lt;/div&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;fontColor=#0F172A;fontSize=11;align=left;verticalAlign=middle;" vertex="1" parent="1">
          <mxGeometry x="420" y="20" width="210" height="42" as="geometry"/>
        </mxCell>

        <!-- External User Actor -->
        <mxCell id="actor_user" value="&lt;div style=&quot;display:flex;flex-direction:column;align-items:center;gap:4px;&quot;&gt;&lt;svg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;26&quot; height=&quot;26&quot; viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;#0284C7&quot; stroke-width=&quot;2&quot;&gt;&lt;path d=&quot;M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2&quot;/&gt;&lt;circle cx=&quot;12&quot; cy=&quot;7&quot; r=&quot;4&quot;/&gt;&lt;/svg&gt;&lt;span style=&quot;color:#0F172A;font-weight:700;&quot;&gt;Users&lt;/span&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0F9FF;strokeColor=#0284C7;fontColor=#0F172A;fontSize=12;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="25" y="145" width="70" height="70" as="geometry"/>
        </mxCell>

        <!-- MAIN UPPER BLUE ENCLAVE: Workload resources (Spoke Virtual Network) -->
        <mxCell id="zone_workload" value="&lt;div style=&quot;color:#1E3A8A;font-weight:700;font-size:14px;padding:4px 10px;&quot;&gt;Workload resources (Spoke Virtual Network - 10.1.0.0/16)&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=2;verticalAlign=top;align=left;spacingLeft=10;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="115" y="75" width="1445" height="555" as="geometry"/>
        </mxCell>

        <!-- Column 1: Left Ingress & Ops Subnets -->
        <mxCell id="sub_appgw" value="&lt;div style=&quot;color:#1E40AF;font-weight:700;font-size:11.5px;margin-bottom:4px;&quot;&gt;Application Gateway Subnet&lt;/div&gt;&lt;div style=&quot;color:#334155;font-size:10.5px;&quot;&gt;• &lt;b&gt;Application Gateway v2 WAF&lt;/b&gt;&lt;br/&gt;• OWASP 3.2 &amp;amp; TLS Offload&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#60A5FA;align=left;verticalAlign=middle;spacingLeft=8;" vertex="1" parent="1">
          <mxGeometry x="135" y="120" width="220" height="105" as="geometry"/>
        </mxCell>

        <mxCell id="sub_jumpbox" value="&lt;div style=&quot;color:#1E40AF;font-weight:700;font-size:11.5px;margin-bottom:4px;&quot;&gt;Jumpbox &amp;amp; Build Subnets&lt;/div&gt;&lt;div style=&quot;color:#334155;font-size:10.5px;&quot;&gt;• &lt;b&gt;Jumpbox VM&lt;/b&gt; (Admin Bastion)&lt;br/&gt;• &lt;b&gt;Build Agents&lt;/b&gt; (CI/CD Runners)&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#60A5FA;align=left;verticalAlign=middle;spacingLeft=8;" vertex="1" parent="1">
          <mxGeometry x="135" y="245" width="220" height="110" as="geometry"/>
        </mxCell>

        <mxCell id="sub_obs" value="&lt;div style=&quot;color:#1E40AF;font-weight:700;font-size:11.5px;margin-bottom:4px;&quot;&gt;Observability &amp;amp; Security&lt;/div&gt;&lt;div style=&quot;color:#334155;font-size:10.5px;&quot;&gt;• &lt;b&gt;Azure Monitor &amp;amp; Log Analytics&lt;/b&gt;&lt;br/&gt;• &lt;b&gt;Application Insights&lt;/b&gt; APM&lt;br/&gt;• &lt;b&gt;Microsoft Defender for Cloud&lt;/b&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#60A5FA;align=left;verticalAlign=middle;spacingLeft=8;" vertex="1" parent="1">
          <mxGeometry x="135" y="375" width="220" height="135" as="geometry"/>
        </mxCell>

        <!-- Column 2: API Management Subnet -->
        <mxCell id="sub_apim" value="&lt;div style=&quot;color:#1E40AF;font-weight:700;font-size:11.5px;margin-bottom:6px;&quot;&gt;API Management Subnet&lt;/div&gt;&lt;div style=&quot;color:#334155;font-size:10.5px;&quot;&gt;• &lt;b&gt;Azure API Management&lt;/b&gt;&lt;br/&gt;• Internal VNet Mode&lt;br/&gt;• OAuth2 / JWT Validation&lt;br/&gt;• AI Token Rate Limiting&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;align=left;verticalAlign=middle;spacingLeft=8;" vertex="1" parent="1">
          <mxGeometry x="375" y="210" width="160" height="165" as="geometry"/>
        </mxCell>

        <!-- Column 3 Top: Agentic Subnet (Azure Container Apps Environment) -->
        <mxCell id="zone_agentic" value="&lt;div style=&quot;color:#5B21B6;font-weight:700;font-size:12px;&quot;&gt;Agentic Subnet (Azure Container Apps Environment)&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F5F3FF;strokeColor=#8B5CF6;strokeWidth=1.5;verticalAlign=top;align=left;spacingLeft=8;spacingTop=4;" vertex="1" parent="1">
          <mxGeometry x="555" y="115" width="570" height="145" as="geometry"/>
        </mxCell>

        <mxCell id="agent_1" value="&lt;b style=&quot;color:#4C1D95;&quot;&gt;Agent 1 (Orchestrator)&lt;/b&gt;&lt;br/&gt;&lt;span style=&quot;font-size:9.5px;color:#6D28D9;&quot;&gt;Task Planner &amp;amp; Router&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#A78BFA;fontSize=10.5;" vertex="1" parent="1">
          <mxGeometry x="570" y="145" width="172" height="54" as="geometry"/>
        </mxCell>

        <mxCell id="agent_2" value="&lt;b style=&quot;color:#4C1D95;&quot;&gt;Agent 2 (Data Analyst)&lt;/b&gt;&lt;br/&gt;&lt;span style=&quot;font-size:9.5px;color:#6D28D9;&quot;&gt;RAG &amp;amp; SQL Synthesis&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#A78BFA;fontSize=10.5;" vertex="1" parent="1">
          <mxGeometry x="754" y="145" width="172" height="54" as="geometry"/>
        </mxCell>

        <mxCell id="agent_3" value="&lt;b style=&quot;color:#4C1D95;&quot;&gt;Agent 3 (Compliance)&lt;/b&gt;&lt;br/&gt;&lt;span style=&quot;font-size:9.5px;color:#6D28D9;&quot;&gt;Policy &amp;amp; Safety Guard&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#A78BFA;fontSize=10.5;" vertex="1" parent="1">
          <mxGeometry x="938" y="145" width="172" height="54" as="geometry"/>
        </mxCell>

        <mxCell id="agent_kernel" value="&lt;b style=&quot;color:#4C1D95;&quot;&gt;Agent Communication API &amp;amp; Semantic Kernel Orchestration Bus&lt;/b&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EDE9FE;strokeColor=#7C3AED;fontSize=10.5;" vertex="1" parent="1">
          <mxGeometry x="570" y="210" width="540" height="38" as="geometry"/>
        </mxCell>

        <!-- Column 3 Middle: Private Endpoints Subnet (Azure Private Link) -->
        <mxCell id="zone_pe" value="&lt;div style=&quot;color:#0F766E;font-weight:700;font-size:12px;&quot;&gt;Private Endpoints Subnet (Azure Private Link)&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDFA;strokeColor=#14B8A6;strokeWidth=1.5;verticalAlign=top;align=left;spacingLeft=8;spacingTop=4;" vertex="1" parent="1">
          <mxGeometry x="555" y="275" width="570" height="100" as="geometry"/>
        </mxCell>

        <mxCell id="pe_list" value="&lt;div style=&quot;display:flex;justify-content:space-around;color:#115E59;font-weight:700;font-size:10.5px;&quot;&gt;&lt;span&gt;🔒 Cosmos PE&lt;/span&gt; | &lt;span&gt;🔒 Storage PE&lt;/span&gt; | &lt;span&gt;🔒 Key Vault PE&lt;/span&gt; | &lt;span&gt;🔒 AI Search PE&lt;/span&gt; | &lt;span&gt;🔒 OpenAI PE&lt;/span&gt; | &lt;span&gt;🔒 ACR PE&lt;/span&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2DD4BF;fontSize=10.5;" vertex="1" parent="1">
          <mxGeometry x="570" y="310" width="540" height="50" as="geometry"/>
        </mxCell>

        <!-- Column 3 Bottom: App Service Environment v3 & Integration Subnets -->
        <mxCell id="zone_ase" value="&lt;div style=&quot;color:#1E40AF;font-weight:700;font-size:12px;&quot;&gt;App Service Environment v3 &amp;amp; Integration Subnets&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#60A5FA;strokeWidth=1.5;verticalAlign=top;align=left;spacingLeft=8;spacingTop=4;" vertex="1" parent="1">
          <mxGeometry x="555" y="390" width="570" height="215" as="geometry"/>
        </mxCell>

        <mxCell id="ase_1" value="&lt;b style=&quot;color:#1E3A8A;&quot;&gt;App Service Plan (Zone 1)&lt;/b&gt;&lt;br/&gt;&lt;br/&gt;&lt;span style=&quot;color:#334155;font-size:10px;&quot;&gt;Web App Frontend UI&lt;br/&gt;(React / Next.js SSR)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#93C5FD;fontSize=10.5;" vertex="1" parent="1">
          <mxGeometry x="570" y="430" width="172" height="155" as="geometry"/>
        </mxCell>

        <mxCell id="ase_2" value="&lt;b style=&quot;color:#1E3A8A;&quot;&gt;App Service Plan (Zone 2)&lt;/b&gt;&lt;br/&gt;&lt;br/&gt;&lt;span style=&quot;color:#334155;font-size:10px;&quot;&gt;API Backend Services&lt;br/&gt;(REST &amp;amp; GraphQL APIs)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#93C5FD;fontSize=10.5;" vertex="1" parent="1">
          <mxGeometry x="754" y="430" width="172" height="155" as="geometry"/>
        </mxCell>

        <mxCell id="ase_3" value="&lt;b style=&quot;color:#1E3A8A;&quot;&gt;App Service Plan (Zone 3)&lt;/b&gt;&lt;br/&gt;&lt;br/&gt;&lt;span style=&quot;color:#334155;font-size:10px;&quot;&gt;Worker &amp;amp; Webhook Processor&lt;br/&gt;(Async Event Consumers)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#93C5FD;fontSize=10.5;" vertex="1" parent="1">
          <mxGeometry x="938" y="430" width="172" height="155" as="geometry"/>
        </mxCell>

        <!-- Column 4 Top: Azure AI Foundry Hub (Managed VNet) -->
        <mxCell id="zone_aifoundry" value="&lt;div style=&quot;color:#065F46;font-weight:700;font-size:12px;&quot;&gt;Azure AI Foundry Hub (Managed VNet)&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ECFDF5;strokeColor=#10B981;strokeWidth=1.5;verticalAlign=top;align=left;spacingLeft=8;spacingTop=4;" vertex="1" parent="1">
          <mxGeometry x="1145" y="115" width="395" height="260" as="geometry"/>
        </mxCell>

        <mxCell id="ai_openai" value="&lt;b style=&quot;color:#065F46;&quot;&gt;Azure OpenAI Service&lt;/b&gt;&lt;br/&gt;&lt;span style=&quot;font-size:9.5px;color:#047857;&quot;&gt;GPT-4o / o3-mini / Embeddings Models&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#34D399;fontSize=10.5;" vertex="1" parent="1">
          <mxGeometry x="1165" y="150" width="355" height="62" as="geometry"/>
        </mxCell>

        <mxCell id="ai_search" value="&lt;b style=&quot;color:#065F46;&quot;&gt;Azure AI Search&lt;/b&gt;&lt;br/&gt;&lt;span style=&quot;font-size:9.5px;color:#047857;&quot;&gt;Vector &amp;amp; Hybrid Semantic Index (RAG)&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#34D399;fontSize=10.5;" vertex="1" parent="1">
          <mxGeometry x="1165" y="225" width="355" height="62" as="geometry"/>
        </mxCell>

        <mxCell id="ai_endpoints" value="&lt;b style=&quot;color:#065F46;&quot;&gt;Managed Online Endpoints &amp;amp; AI Services&lt;/b&gt;&lt;br/&gt;&lt;span style=&quot;font-size:9.5px;color:#047857;&quot;&gt;Custom Fine-Tuned Models &amp;amp; Content Safety&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#34D399;fontSize=10.5;" vertex="1" parent="1">
          <mxGeometry x="1165" y="300" width="355" height="62" as="geometry"/>
        </mxCell>

        <!-- Column 4 Bottom: Enterprise Data & Secrets Tier -->
        <mxCell id="zone_data" value="&lt;div style=&quot;color:#92400E;font-weight:700;font-size:12px;&quot;&gt;Enterprise Data &amp;amp; Secrets Tier&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFBEB;strokeColor=#F59E0B;strokeWidth=1.5;verticalAlign=top;align=left;spacingLeft=8;spacingTop=4;" vertex="1" parent="1">
          <mxGeometry x="1145" y="390" width="395" height="215" as="geometry"/>
        </mxCell>

        <mxCell id="data_cosmos" value="&lt;b style=&quot;color:#92400E;&quot;&gt;Azure Cosmos DB&lt;/b&gt;&lt;br/&gt;&lt;span style=&quot;font-size:9.5px;color:#B45309;&quot;&gt;NoSQL Multi-Region Write &amp;amp; Vector Store&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#FBBF24;fontSize=10.5;" vertex="1" parent="1">
          <mxGeometry x="1165" y="425" width="355" height="52" as="geometry"/>
        </mxCell>

        <mxCell id="data_kv" value="&lt;b style=&quot;color:#92400E;&quot;&gt;Azure Key Vault&lt;/b&gt;&lt;br/&gt;&lt;span style=&quot;font-size:9.5px;color:#B45309;&quot;&gt;HSM Secrets, Certificates &amp;amp; Encryption Keys&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#FBBF24;fontSize=10.5;" vertex="1" parent="1">
          <mxGeometry x="1165" y="485" width="355" height="52" as="geometry"/>
        </mxCell>

        <mxCell id="data_acr" value="&lt;b style=&quot;color:#92400E;&quot;&gt;Azure Container Registry &amp;amp; Storage&lt;/b&gt;&lt;br/&gt;&lt;span style=&quot;font-size:9.5px;color:#B45309;&quot;&gt;Geo-Replicated OCI Images &amp;amp; ADLS Gen2&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#FBBF24;fontSize=10.5;" vertex="1" parent="1">
          <mxGeometry x="1165" y="545" width="355" height="52" as="geometry"/>
        </mxCell>

        <!-- MIDDLE HORIZONTAL BAND: Subscription vending provisioned resources -->
        <mxCell id="zone_vending" value="&lt;div style=&quot;color:#334155;font-weight:700;font-size:13px;&quot;&gt;Subscription vending provisioned resources&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#64748B;strokeWidth=1.5;dashed=1;verticalAlign=top;align=left;spacingLeft=10;spacingTop=5;" vertex="1" parent="1">
          <mxGeometry x="115" y="645" width="1445" height="95" as="geometry"/>
        </mxCell>

        <mxCell id="vend_mg" value="&lt;b style=&quot;color:#0F172A;&quot;&gt;Management Group Hierarchy&lt;/b&gt;&lt;br/&gt;&lt;span style=&quot;font-size:9.5px;color:#475569;&quot;&gt;Corp / Online Landing Zone Placement&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;fontSize=10.5;" vertex="1" parent="1">
          <mxGeometry x="135" y="680" width="260" height="48" as="geometry"/>
        </mxCell>

        <mxCell id="vend_peer" value="&lt;b style=&quot;color:#0F172A;&quot;&gt;Spoke VNet Peering&lt;/b&gt;&lt;br/&gt;&lt;span style=&quot;font-size:9.5px;color:#475569;&quot;&gt;Hub-Spoke BGP &amp;amp; UDR Route Tables&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;fontSize=10.5;" vertex="1" parent="1">
          <mxGeometry x="415" y="680" width="260" height="48" as="geometry"/>
        </mxCell>

        <mxCell id="vend_rbac" value="&lt;b style=&quot;color:#0F172A;&quot;&gt;Managed Identities &amp;amp; RBAC&lt;/b&gt;&lt;br/&gt;&lt;span style=&quot;font-size:9.5px;color:#475569;&quot;&gt;Zero-Trust Workload Identity Federation&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;fontSize=10.5;" vertex="1" parent="1">
          <mxGeometry x="695" y="680" width="260" height="48" as="geometry"/>
        </mxCell>

        <mxCell id="vend_cost" value="&lt;b style=&quot;color:#0F172A;&quot;&gt;Cost Management &amp;amp; Policy&lt;/b&gt;&lt;br/&gt;&lt;span style=&quot;font-size:9.5px;color:#475569;&quot;&gt;Azure Policy Guardrails &amp;amp; Budgets&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;fontSize=10.5;" vertex="1" parent="1">
          <mxGeometry x="975" y="680" width="260" height="48" as="geometry"/>
        </mxCell>

        <mxCell id="vend_cae" value="&lt;b style=&quot;color:#0F172A;&quot;&gt;Container Apps Environment&lt;/b&gt;&lt;br/&gt;&lt;span style=&quot;font-size:9.5px;color:#475569;&quot;&gt;Dedicated Workload Profiles &amp;amp; VNet&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;fontSize=10.5;" vertex="1" parent="1">
          <mxGeometry x="1255" y="680" width="285" height="48" as="geometry"/>
        </mxCell>

        <!-- BOTTOM-LEFT YELLOW ENCLAVE: Platform landing zone subscription (Connectivity Hub) -->
        <mxCell id="zone_platform" value="&lt;div style=&quot;color:#854D0E;font-weight:700;font-size:13.5px;&quot;&gt;Platform landing zone subscription (Connectivity subscription / Hub)&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF9C3;strokeColor=#EAB308;strokeWidth=2;verticalAlign=top;align=left;spacingLeft=10;spacingTop=6;" vertex="1" parent="1">
          <mxGeometry x="115" y="755" width="840" height="215" as="geometry"/>
        </mxCell>

        <mxCell id="plat_hub_vnet" value="&lt;div style=&quot;color:#854D0E;font-weight:700;font-size:11.5px;margin-bottom:6px;&quot;&gt;Hub Virtual Network (Region 1 - 10.0.0.0/16)&lt;/div&gt;&lt;div style=&quot;color:#334155;font-size:10.5px;&quot;&gt;• &lt;b style=&quot;color:#DC2626;&quot;&gt;Azure Firewall Premium&lt;/b&gt; (Central Egress &amp;amp; IDPS)&lt;br/&gt;• &lt;b style=&quot;color:#2563EB;&quot;&gt;Azure Bastion Host&lt;/b&gt; (Secure SSH/RDP)&lt;br/&gt;• &lt;b style=&quot;color:#059669;&quot;&gt;VPN / ExpressRoute Gateway&lt;/b&gt; (Hybrid)&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CA8A04;align=left;verticalAlign=middle;spacingLeft=10;" vertex="1" parent="1">
          <mxGeometry x="135" y="795" width="380" height="155" as="geometry"/>
        </mxCell>

        <mxCell id="plat_dns" value="&lt;div style=&quot;color:#854D0E;font-weight:700;font-size:11.5px;margin-bottom:6px;&quot;&gt;Private DNS &amp;amp; Hybrid Connectivity&lt;/div&gt;&lt;div style=&quot;color:#334155;font-size:10.5px;&quot;&gt;• &lt;b&gt;Private DNS Zones&lt;/b&gt; (for Private Link Resolution)&lt;br/&gt;• &lt;b&gt;Azure DNS Private Resolver&lt;/b&gt; (Inbound/Outbound)&lt;br/&gt;• &lt;b&gt;Azure DDoS Protection Standard&lt;/b&gt;&lt;/div&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CA8A04;align=left;verticalAlign=middle;spacingLeft=10;" vertex="1" parent="1">
          <mxGeometry x="545" y="795" width="390" height="155" as="geometry"/>
        </mxCell>

        <!-- Typed Orthogonal Connectors -->
        <!-- 1. User -> Application Gateway v2 WAF -->
        <mxCell id="edge_user_appgw" value="HTTPS" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1D4ED8;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;fontSize=9;fontStyle=1;" edge="1" parent="1" source="actor_user" target="sub_appgw">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- 2. Application Gateway -> API Management -->
        <mxCell id="edge_appgw_apim" value="mTLS" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1D4ED8;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;fontSize=9;fontStyle=1;" edge="1" parent="1" source="sub_appgw" target="sub_apim">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- 3. API Management -> Agentic Subnet -->
        <mxCell id="edge_apim_agentic" value="Prompt / API" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#7C3AED;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;fontSize=9;fontStyle=1;" edge="1" parent="1" source="sub_apim" target="zone_agentic">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- 4. API Management -> App Service Environment v3 -->
        <mxCell id="edge_apim_ase" value="Internal VNet" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;fontSize=9;fontStyle=1;" edge="1" parent="1" source="sub_apim" target="zone_ase">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- 5. Agentic Subnet -> Private Endpoints Subnet -->
        <mxCell id="edge_agentic_pe" value="Private Link" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0D9488;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;fontSize=9;fontStyle=1;" edge="1" parent="1" source="zone_agentic" target="zone_pe">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- 6. Private Endpoints Subnet -> Azure AI Foundry Hub -->
        <mxCell id="edge_pe_aifoundry" value="Private Endpoints" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#10B981;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;fontSize=9;fontStyle=1;" edge="1" parent="1" source="zone_pe" target="zone_aifoundry">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- 7. Private Endpoints Subnet -> Enterprise Data & Secrets Tier -->
        <mxCell id="edge_pe_data" value="Private Endpoints" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#D97706;strokeWidth=2;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;fontSize=9;fontStyle=1;" edge="1" parent="1" source="zone_pe" target="zone_data">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <!-- 8. Centralized Resource Connectors (Dashed Orange) from Hub VNet & Private DNS to Workload VNet -->
        <mxCell id="edge_hub_spoke" value="VNet Peering &amp;amp; Central Egress" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#EA580C;strokeWidth=2;dashed=1;dashPattern=6 4;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;fontSize=9;fontStyle=1;" edge="1" parent="1" source="plat_hub_vnet" target="vend_peer">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>

        <mxCell id="edge_dns_pe" value="Private DNS Resolution" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#EA580C;strokeWidth=2;dashed=1;dashPattern=6 4;labelBackgroundColor=#FFFFFF;labelBorderColor=#CBD5E1;fontSize=9;fontStyle=1;" edge="1" parent="1" source="plat_dns" target="zone_pe">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
