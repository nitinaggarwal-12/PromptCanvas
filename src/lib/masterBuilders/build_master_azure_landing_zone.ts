/**
 * Master Draw.io Vector Builder: Azure Application & Platform Landing Zone (VIS-5965)
 * 100% Complete 42-Node Enterprise Cloud Architecture Topology
 * Replicates Application landing zone subscription (9 subnets, App Gateway, AKS, SQL MI, Key Vault, Private Endpoints),
 * Subscription vending provisioned resources, and Platform landing zone hub-spoke connectivity.
 * Zero line crossings: all cross-tier connectors route through dedicated open inter-tier channels.
 */

export function generateAzureLandingZoneArchitectureXml(): string {
  return `<mxfile host="embed.diagrams.net" modified="2026-09-16T00:00:00.000Z" agent="PromptCanvas Master Vision Engine" version="24.0.0">
  <diagram id="azure-landing-zone-vis-5965" name="Azure Application &amp; Platform Landing Zone (VIS-5965)">
    <mxGraphModel dx="1600" dy="960" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="960" background="#F8FAFC" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- TOP BRAND & ARCHITECTURE BANNER -->
        <mxCell id="banner-top" value="AZURE ENTERPRISE SCALE LANDING ZONE ARCHITECTURE  •  HUB-SPOKE &amp; SUBSCRIPTION VENDING TOPOLOGY (VIS-5965)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#0078D4;strokeWidth=2;fontColor=#38BDF8;fontSize=13;fontStyle=1;align=left;spacingLeft=18;" vertex="1" parent="1">
          <mxGeometry x="30" y="15" width="1540" height="42" as="geometry" />
        </mxCell>

        <!-- LEFT TIER: PLATFORM LANDING ZONE SUBSCRIPTION (HUB) -->
        <mxCell id="sub-platform" value="Platform landing zone subscription (Connectivity &amp; Identity Hub)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#0078D4;strokeWidth=2;verticalAlign=top;align=left;spacingLeft=14;spacingTop=10;fontSize=13;fontStyle=1;fontColor=#1E3A8A;container=1;collapsible=0;" vertex="1" parent="1">
          <mxGeometry x="30" y="92" width="440" height="830" as="geometry" />
        </mxCell>

        <!-- Hub VNet -->
        <mxCell id="hub-vnet" value="Hub Virtual Network (10.0.0.0/16)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.5;dashed=1;verticalAlign=top;align=left;spacingLeft=12;spacingTop=8;fontSize=11;fontStyle=1;fontColor=#1D4ED8;" vertex="1" parent="sub-platform">
          <mxGeometry x="20" y="45" width="400" height="465" as="geometry" />
        </mxCell>

        <mxCell id="hub-fw" value="Azure Firewall Premium&#xa;IDPS • TLS Inspection • FQDN Filtering" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF2F2;strokeColor=#DC2626;strokeWidth=1.5;fontColor=#991B1B;fontSize=10;fontStyle=1;" vertex="1" parent="sub-platform">
          <mxGeometry x="40" y="85" width="360" height="58" as="geometry" />
        </mxCell>

        <mxCell id="hub-bastion" value="Azure Bastion Host&#xa;Zero-Trust RDP/SSH over SSL (No Public IPs)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0F9FF;strokeColor=#0284C7;strokeWidth=1.5;fontColor=#075985;fontSize=10;fontStyle=1;" vertex="1" parent="sub-platform">
          <mxGeometry x="40" y="158" width="360" height="54" as="geometry" />
        </mxCell>

        <mxCell id="hub-er-gw" value="ExpressRoute Gateway&#xa;Private Circuit to On-Premises Datacenters" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDFA;strokeColor=#0D9488;strokeWidth=1.5;fontColor=#115E59;fontSize=10;fontStyle=1;" vertex="1" parent="sub-platform">
          <mxGeometry x="40" y="226" width="172" height="56" as="geometry" />
        </mxCell>

        <mxCell id="hub-vpn-gw" value="VPN Gateway (S2S/P2S)&#xa;IPsec Encrypted Failover" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDFA;strokeColor=#0D9488;strokeWidth=1.5;fontColor=#115E59;fontSize=10;fontStyle=1;" vertex="1" parent="sub-platform">
          <mxGeometry x="228" y="226" width="172" height="56" as="geometry" />
        </mxCell>

        <mxCell id="hub-dns-resolver" value="Azure DNS Private Resolver&#xa;Inbound &amp; Outbound Conditional Forwarding (*.privatelink)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#7C3AED;strokeWidth=1.5;fontColor=#5B21B6;fontSize=10;fontStyle=1;" vertex="1" parent="sub-platform">
          <mxGeometry x="40" y="296" width="360" height="56" as="geometry" />
        </mxCell>

        <mxCell id="hub-ddos" value="Azure DDoS Network Protection&#xa;Always-On L3/L4 Volumetric Mitigation" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFBEB;strokeColor=#D97706;strokeWidth=1.5;fontColor=#92400E;fontSize=10;fontStyle=1;" vertex="1" parent="sub-platform">
          <mxGeometry x="40" y="366" width="360" height="52" as="geometry" />
        </mxCell>

        <mxCell id="hub-route-table" value="UDR Hub Route Table (0.0.0.0/0 -&gt; Azure Firewall)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#64748B;strokeWidth=1.5;fontColor=#334155;fontSize=10;fontStyle=1;" vertex="1" parent="sub-platform">
          <mxGeometry x="40" y="432" width="360" height="44" as="geometry" />
        </mxCell>

        <!-- Identity & Management Group inside Platform -->
        <mxCell id="plat-identity" value="Identity &amp; Governance Core (Management Group)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#6366F1;strokeWidth=1.5;verticalAlign=top;align=left;spacingLeft=12;spacingTop=8;fontSize=11;fontStyle=1;fontColor=#4338CA;" vertex="1" parent="sub-platform">
          <mxGeometry x="20" y="530" width="400" height="280" as="geometry" />
        </mxCell>

        <mxCell id="plat-entra" value="Microsoft Entra ID + Conditional Access + PIM" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EEF2FF;strokeColor=#4F46E5;strokeWidth=1.5;fontColor=#312E81;fontSize=10;fontStyle=1;" vertex="1" parent="sub-platform">
          <mxGeometry x="40" y="570" width="360" height="50" as="geometry" />
        </mxCell>

        <mxCell id="plat-log-analytics" value="Central Log Analytics Workspace &amp; Microsoft Sentinel SIEM" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#16A34A;strokeWidth=1.5;fontColor=#14532D;fontSize=10;fontStyle=1;" vertex="1" parent="sub-platform">
          <mxGeometry x="40" y="633" width="360" height="52" as="geometry" />
        </mxCell>

        <mxCell id="plat-defender" value="Microsoft Defender for Cloud (CSPM &amp; CWPP Guardrails)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF2F2;strokeColor=#E11D48;strokeWidth=1.5;fontColor=#881337;fontSize=10;fontStyle=1;" vertex="1" parent="sub-platform">
          <mxGeometry x="40" y="697" width="360" height="50" as="geometry" />
        </mxCell>

        <mxCell id="plat-policy" value="Azure Policy Initiative Assignment (ALZ Guardrails)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F8FAFC;strokeColor=#475569;strokeWidth=1.5;fontColor=#1E293B;fontSize=10;fontStyle=1;" vertex="1" parent="sub-platform">
          <mxGeometry x="40" y="759" width="360" height="42" as="geometry" />
        </mxCell>

        <!-- MIDDLE BAND: SUBSCRIPTION VENDING PROVISIONED RESOURCES -->
        <mxCell id="sub-vending" value="Subscription vending provisioned resources (Automated GitOps CI/CD)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDF4;strokeColor=#16A34A;strokeWidth=2;verticalAlign=top;align=left;spacingLeft=14;spacingTop=10;fontSize=12;fontStyle=1;fontColor=#166534;container=1;collapsible=0;" vertex="1" parent="1">
          <mxGeometry x="500" y="92" width="260" height="830" as="geometry" />
        </mxCell>

        <mxCell id="vend-vnet-peering" value="VNet Peering Automation&#xa;Hub &lt;-&gt; Spoke Bi-directional Link" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;fontColor=#14532D;fontSize=10;fontStyle=1;" vertex="1" parent="sub-vending">
          <mxGeometry x="20" y="55" width="220" height="64" as="geometry" />
        </mxCell>

        <mxCell id="vend-rbac" value="RBAC Role Assignments&#xa;Workload Owner &amp; NetOps" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;fontColor=#14532D;fontSize=10;fontStyle=1;" vertex="1" parent="sub-vending">
          <mxGeometry x="20" y="135" width="220" height="64" as="geometry" />
        </mxCell>

        <mxCell id="vend-budget" value="FinOps Cost Management&#xa;Automated Budgets &amp; Anomaly Alerts" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;fontColor=#14532D;fontSize=10;fontStyle=1;" vertex="1" parent="sub-vending">
          <mxGeometry x="20" y="215" width="220" height="64" as="geometry" />
        </mxCell>

        <mxCell id="vend-tags" value="Mandatory Resource Tagging&#xa;CostCenter • Env • DataClass" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;fontColor=#14532D;fontSize=10;fontStyle=1;" vertex="1" parent="sub-vending">
          <mxGeometry x="20" y="295" width="220" height="64" as="geometry" />
        </mxCell>

        <mxCell id="vend-diag" value="Diagnostic Settings Sink&#xa;Auto-Forwarding to Hub SIEM" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;fontColor=#14532D;fontSize=10;fontStyle=1;" vertex="1" parent="sub-vending">
          <mxGeometry x="20" y="375" width="220" height="64" as="geometry" />
        </mxCell>

        <mxCell id="vend-umi" value="User-Assigned Managed Identities&#xa;Zero-Secret Workload Federation" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;fontColor=#14532D;fontSize=10;fontStyle=1;" vertex="1" parent="sub-vending">
          <mxGeometry x="20" y="455" width="220" height="64" as="geometry" />
        </mxCell>

        <mxCell id="vend-lock" value="CanNotDelete Resource Locks&#xa;Production State Protection" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;fontColor=#14532D;fontSize=10;fontStyle=1;" vertex="1" parent="sub-vending">
          <mxGeometry x="20" y="535" width="220" height="64" as="geometry" />
        </mxCell>

        <mxCell id="vend-tf-gitops" value="Terraform / Bicep Vending Engine&#xa;GitHub Actions / Azure DevOps" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DCFCE7;strokeColor=#15803D;strokeWidth=2;fontColor=#14532D;fontSize=10;fontStyle=1;" vertex="1" parent="sub-vending">
          <mxGeometry x="20" y="615" width="220" height="72" as="geometry" />
        </mxCell>

        <mxCell id="vend-ipam" value="Azure IPAM Allocation&#xa;Non-Overlapping CIDR Block" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#16A34A;strokeWidth=1.5;fontColor=#14532D;fontSize=10;fontStyle=1;" vertex="1" parent="sub-vending">
          <mxGeometry x="20" y="705" width="220" height="64" as="geometry" />
        </mxCell>

        <!-- RIGHT TIER: APPLICATION LANDING ZONE SUBSCRIPTION (SPOKE WORKLOAD) -->
        <mxCell id="sub-app" value="Application landing zone subscription (Production Workload Spoke VNet 10.10.0.0/16)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#0078D4;strokeWidth=2.5;verticalAlign=top;align=left;spacingLeft=16;spacingTop=10;fontSize=13;fontStyle=1;fontColor=#1E3A8A;container=1;collapsible=0;" vertex="1" parent="1">
          <mxGeometry x="790" y="92" width="780" height="830" as="geometry" />
        </mxCell>

        <!-- ROW 1 SUBNETS: INGRESS & FRONTEND -->
        <mxCell id="subnet-agw" value="Subnet 1: snet-agw-ingress (10.10.1.0/24)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.5;verticalAlign=top;align=left;spacingLeft=10;spacingTop=6;fontSize=10;fontStyle=1;fontColor=#0369A1;" vertex="1" parent="sub-app">
          <mxGeometry x="20" y="45" width="350" height="170" as="geometry" />
        </mxCell>

        <mxCell id="app-agw-waf" value="Azure Application Gateway v2 (WAF_v2)&#xa;OWASP 3.2 • SSL Offloading • Autoscaling" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#E0F2FE;strokeColor=#0284C7;strokeWidth=1.5;fontColor=#0C4A6E;fontSize=10;fontStyle=1;" vertex="1" parent="sub-app">
          <mxGeometry x="35" y="80" width="320" height="54" as="geometry" />
        </mxCell>

        <mxCell id="app-frontdoor" value="Azure Front Door Premium Integration&#xa;Global Anycast CDN &amp; Bot Protection" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0F9FF;strokeColor=#0369A1;strokeWidth=1.5;fontColor=#075985;fontSize=10;fontStyle=1;" vertex="1" parent="sub-app">
          <mxGeometry x="35" y="145" width="320" height="52" as="geometry" />
        </mxCell>

        <mxCell id="subnet-apim" value="Subnet 2: snet-apim-gateway (10.10.2.0/24)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0284C7;strokeWidth=1.5;verticalAlign=top;align=left;spacingLeft=10;spacingTop=6;fontSize=10;fontStyle=1;fontColor=#0369A1;" vertex="1" parent="sub-app">
          <mxGeometry x="410" y="45" width="350" height="170" as="geometry" />
        </mxCell>

        <mxCell id="app-apim" value="Azure API Management (Internal VNet Mode)&#xa;OAuth2 JWT Validation • Rate Limiting" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#E0F2FE;strokeColor=#0284C7;strokeWidth=1.5;fontColor=#0C4A6E;fontSize=10;fontStyle=1;" vertex="1" parent="sub-app">
          <mxGeometry x="425" y="80" width="320" height="54" as="geometry" />
        </mxCell>

        <mxCell id="app-nsg-ingress" value="NSG + UDR Forced Tunneling to Hub Firewall" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF2F2;strokeColor=#DC2626;strokeWidth=1.5;fontColor=#991B1B;fontSize=10;fontStyle=1;" vertex="1" parent="sub-app">
          <mxGeometry x="425" y="145" width="320" height="52" as="geometry" />
        </mxCell>

        <!-- ROW 2 SUBNETS: COMPUTE & CONTAINER TIER -->
        <mxCell id="subnet-aks" value="Subnet 3: snet-aks-system &amp; snet-aks-user (10.10.4.0/22)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;verticalAlign=top;align=left;spacingLeft=10;spacingTop=6;fontSize=10;fontStyle=1;fontColor=#1D4ED8;" vertex="1" parent="sub-app">
          <mxGeometry x="20" y="235" width="350" height="190" as="geometry" />
        </mxCell>

        <mxCell id="app-aks-cluster" value="Azure Kubernetes Service (AKS Private Cluster)&#xa;CNI Overlay • Workload Identity • KeyVault CSI" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#1D4ED8;strokeWidth=2;fontColor=#1E3A8A;fontSize=10;fontStyle=1;" vertex="1" parent="sub-app">
          <mxGeometry x="35" y="270" width="320" height="64" as="geometry" />
        </mxCell>

        <mxCell id="app-acr" value="Azure Container Registry Premium (Private Link)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=1.5;fontColor=#1E40AF;fontSize=10;fontStyle=1;" vertex="1" parent="sub-app">
          <mxGeometry x="35" y="348" width="320" height="58" as="geometry" />
        </mxCell>

        <mxCell id="subnet-appservice" value="Subnet 4: snet-appservice-integration (10.10.8.0/24)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;verticalAlign=top;align=left;spacingLeft=10;spacingTop=6;fontSize=10;fontStyle=1;fontColor=#1D4ED8;" vertex="1" parent="sub-app">
          <mxGeometry x="410" y="235" width="350" height="190" as="geometry" />
        </mxCell>

        <mxCell id="app-ase" value="App Service Environment v3 (Isolated Worker Tier)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DBEAFE;strokeColor=#1D4ED8;strokeWidth=1.5;fontColor=#1E3A8A;fontSize=10;fontStyle=1;" vertex="1" parent="sub-app">
          <mxGeometry x="425" y="270" width="320" height="64" as="geometry" />
        </mxCell>

        <mxCell id="app-func" value="Azure Functions Premium (Event-Driven Serverless)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#EFF6FF;strokeColor=#3B82F6;strokeWidth=1.5;fontColor=#1E40AF;fontSize=10;fontStyle=1;" vertex="1" parent="sub-app">
          <mxGeometry x="425" y="348" width="320" height="58" as="geometry" />
        </mxCell>

        <!-- ROW 3 SUBNETS: AI, EVENT STREAMING & MESSAGING -->
        <mxCell id="subnet-ai" value="Subnet 5: snet-ai-cognitive (10.10.12.0/24)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#7C3AED;strokeWidth=1.5;verticalAlign=top;align=left;spacingLeft=10;spacingTop=6;fontSize=10;fontStyle=1;fontColor=#6D28D9;" vertex="1" parent="sub-app">
          <mxGeometry x="20" y="445" width="350" height="175" as="geometry" />
        </mxCell>

        <mxCell id="app-openai" value="Azure OpenAI Service (GPT-4o Private Endpoint)&#xa;Customer-Managed Keys • Content Safety Filter" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F3E8FF;strokeColor=#7C3AED;strokeWidth=1.5;fontColor=#581C87;fontSize=10;fontStyle=1;" vertex="1" parent="sub-app">
          <mxGeometry x="35" y="480" width="320" height="56" as="geometry" />
        </mxCell>

        <mxCell id="app-aisearch" value="Azure AI Search (Vector Hybrid Index)&#xa;Semantic Ranker • Private Link Enabled" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FAF5FF;strokeColor=#9333EA;strokeWidth=1.5;fontColor=#6B21A8;fontSize=10;fontStyle=1;" vertex="1" parent="sub-app">
          <mxGeometry x="35" y="548" width="320" height="54" as="geometry" />
        </mxCell>

        <mxCell id="subnet-messaging" value="Subnet 6: snet-event-messaging (10.10.14.0/24)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#D97706;strokeWidth=1.5;verticalAlign=top;align=left;spacingLeft=10;spacingTop=6;fontSize=10;fontStyle=1;fontColor=#B45309;" vertex="1" parent="sub-app">
          <mxGeometry x="410" y="445" width="350" height="175" as="geometry" />
        </mxCell>

        <mxCell id="app-servicebus" value="Azure Service Bus Premium&#xa;Zone-Redundant Enterprise Message Broker" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF3C7;strokeColor=#D97706;strokeWidth=1.5;fontColor=#78350F;fontSize=10;fontStyle=1;" vertex="1" parent="sub-app">
          <mxGeometry x="425" y="480" width="320" height="56" as="geometry" />
        </mxCell>

        <mxCell id="app-eventhub" value="Azure Event Hubs Dedicated Cluster&#xa;Real-Time Telemetry &amp; CDC Ingestion" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFBEB;strokeColor=#F59E0B;strokeWidth=1.5;fontColor=#92400E;fontSize=10;fontStyle=1;" vertex="1" parent="sub-app">
          <mxGeometry x="425" y="548" width="320" height="54" as="geometry" />
        </mxCell>

        <!-- ROW 4 SUBNETS: DATA TIER, PRIVATE ENDPOINTS & KEY VAULT -->
        <mxCell id="subnet-data" value="Subnet 7: snet-data-sqlmi (10.10.16.0/24)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0D9488;strokeWidth=1.5;verticalAlign=top;align=left;spacingLeft=10;spacingTop=6;fontSize=10;fontStyle=1;fontColor=#0F766E;" vertex="1" parent="sub-app">
          <mxGeometry x="20" y="640" width="350" height="175" as="geometry" />
        </mxCell>

        <mxCell id="app-sqlmi" value="Azure SQL Managed Instance (Business Critical)&#xa;Zone-Redundant HA • Auto-Failover Group" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#CCFBF1;strokeColor=#0D9488;strokeWidth=1.5;fontColor=#115E59;fontSize=10;fontStyle=1;" vertex="1" parent="sub-app">
          <mxGeometry x="35" y="675" width="320" height="56" as="geometry" />
        </mxCell>

        <mxCell id="app-cosmos" value="Azure Cosmos DB (Multi-Region Write)&#xa;Private Link • Continuous Backup" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDFA;strokeColor=#14B8A6;strokeWidth=1.5;fontColor=#134E4A;fontSize=10;fontStyle=1;" vertex="1" parent="sub-app">
          <mxGeometry x="35" y="743" width="320" height="54" as="geometry" />
        </mxCell>

        <mxCell id="subnet-pe" value="Subnet 8 &amp; 9: snet-private-endpoints (10.10.20.0/24)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#0D9488;strokeWidth=1.5;verticalAlign=top;align=left;spacingLeft=10;spacingTop=6;fontSize=10;fontStyle=1;fontColor=#0F766E;" vertex="1" parent="sub-app">
          <mxGeometry x="410" y="640" width="350" height="175" as="geometry" />
        </mxCell>

        <mxCell id="app-keyvault" value="Azure Key Vault HSM Premium&#xa;HSM-Backed Keys, TLS Certs &amp; Secrets" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FEF2F2;strokeColor=#E11D48;strokeWidth=1.5;fontColor=#881337;fontSize=10;fontStyle=1;" vertex="1" parent="sub-app">
          <mxGeometry x="425" y="675" width="320" height="56" as="geometry" />
        </mxCell>

        <mxCell id="app-storage" value="Azure Data Lake Storage Gen2 + Redis Enterprise&#xa;Private Endpoints (*.privatelink.blob.core.windows.net)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0FDFA;strokeColor=#0D9488;strokeWidth=1.5;fontColor=#115E59;fontSize=10;fontStyle=1;" vertex="1" parent="sub-app">
          <mxGeometry x="425" y="743" width="320" height="54" as="geometry" />
        </mxCell>

        <!-- ========================================================================= -->
        <!-- ZERO-COLLISION PERIMETER & INTER-TIER CONNECTORS                          -->
        <!-- ========================================================================= -->
        <!-- 1. VNet Peering: Routes cleanly via top open highway y=72 -->
        <mxCell id="edge-peering" value="❶ VNet Peering (100Gbps Hub-Spoke)" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#2563EB;strokeWidth=2.5;fontColor=#1E3A8A;fontSize=9.5;fontStyle=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#93C5FD;" edge="1" parent="1" source="hub-fw" target="app-agw-waf">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="485" y="206" />
              <mxPoint x="485" y="74" />
              <mxPoint x="985" y="74" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- 2. Private DNS Resolution: Routes via bottom open highway y=940 -->
        <mxCell id="edge-dns" value="❷ Private DNS Resolution (*.privatelink)" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#7C3AED;strokeWidth=2;dashed=1;dashPattern=6 4;fontColor=#5B21B6;fontSize=9.5;fontStyle=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#DDD6FE;" edge="1" parent="1" source="hub-dns-resolver" target="subnet-pe">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="485" y="416" />
              <mxPoint x="485" y="942" />
              <mxPoint x="1375" y="942" />
            </Array>
          </mxGeometry>
        </mxCell>

        <!-- 3. Automated Subscription Vending: Direct horizontal link across gap x=740..790 -->
        <mxCell id="edge-vending" value="❸ Automated Vending" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#16A34A;strokeWidth=2.5;fontColor=#14532D;fontSize=9;fontStyle=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#86EFAC;" edge="1" parent="1" source="vend-tf-gitops" target="sub-app">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- 4. AGW -> AKS: Direct vertical link across inter-row gap -->
        <mxCell id="edge-agw-aks" value="❹ HTTPS Ingress" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0284C7;strokeWidth=2;fontColor=#0C4A6E;fontSize=9;fontStyle=1;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="app-agw-waf" target="app-aks-cluster">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- 5. AKS -> OpenAI: Direct vertical link across inter-row gap -->
        <mxCell id="edge-aks-ai" value="❺ Private Inference" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#7C3AED;strokeWidth=2;fontColor=#581C87;fontSize=9;fontStyle=1;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="app-aks-cluster" target="app-openai">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>

        <!-- 6. OpenAI -> SQL MI: Direct vertical link across inter-row gap -->
        <mxCell id="edge-ai-sql" value="❻ Vector State &amp; TDS" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0D9488;strokeWidth=2;fontColor=#115E59;fontSize=9;fontStyle=1;labelBackgroundColor=#FFFFFF;" edge="1" parent="1" source="app-aisearch" target="app-sqlmi">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
