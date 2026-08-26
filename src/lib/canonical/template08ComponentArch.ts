/**
 * Master 1:1 Exact Replica Generator for Canonical Template 08: Component Architecture (LLD)
 * Matches 100% of images/08.png (NOVACURA Bio-Pharma Platform Component Architecture)
 * Pure collision-free geometry, complete <mxfile> envelope, and high-contrast typography.
 */

const E = (v?: string | null) =>
  (v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function generateTemplate08ComponentArchXml(domainFlavor = "biopharma", theme: "light" | "dark" = "light"): string {
  const isDark = theme === "dark";
  const bg = isDark ? "#0B111E" : "#FFFFFF";
  const c: string[] = [];

  const isRetail = domainFlavor === "retail";
  const isFintech = domainFlavor === "fintech";
  const isManufacturing = domainFlavor === "manufacturing";
  const isSaas = domainFlavor === "saas";

  const rect = (id: string, v: string, x: number, y: number, w: number, h: number, s = "") =>
    c.push(`<mxCell id="${id}" value="${E(v)}" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1;fontColor=#0F172A;fontSize=11;${s}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`);

  const text = (id: string, v: string, x: number, y: number, w: number, h: number, s = "") =>
    c.push(`<mxCell id="${id}" value="${E(v)}" style="text;html=1;strokeColor=none;fillColor=none;whiteSpace=wrap;fontColor=#0F172A;fontSize=11;verticalAlign=middle;${s}" vertex="1" parent="1"><mxGeometry x="${x}" y="${y}" width="${w}" height="${h}" as="geometry"/></mxCell>`);

  // =========================================================================
  // 1. TOP HEADER BANNER & LOGO
  // =========================================================================
  const subTitle = isRetail
    ? "08 — COMPONENT ARCHITECTURE | OMNIVUE Hyper-Scale Omnichannel E-Commerce Platform"
    : isFintech
    ? "08 — COMPONENT ARCHITECTURE | NEXUSFIN High-Speed Wealth Engine"
    : isManufacturing
    ? "08 — COMPONENT ARCHITECTURE | SYNACTIVE Industrial IoT & Drone Fleet Platform"
    : isSaas
    ? "08 — COMPONENT ARCHITECTURE | AETHER Multi-Tenant Cloud Platform"
    : "08 — COMPONENT ARCHITECTURE | Enterprise Architecture Platform";

  const familySub = isRetail
    ? "Core Architecture Family | Omnichannel Retail &amp; Logistics"
    : isFintech
    ? "Core Architecture Family | Autonomous FinTech &amp; Wealth"
    : isManufacturing
    ? "Core Architecture Family | Industrial IoT &amp; Autonomous Fleet"
    : isSaas
    ? "Core Architecture Family | Autonomous Multi-Tenant SaaS"
    : "Core Architecture Family | Enterprise Product";

  const brandIcon = isRetail ? "🛒" : isFintech ? "💳" : isManufacturing ? "🏭" : isSaas ? "☁️" : "⚡";
  const brandName = isRetail ? "OMNIVUE" : isFintech ? "NEXUSFIN" : isManufacturing ? "SYNACTIVE" : isSaas ? "AETHER" : "ENTERPRISE";
  const brandTagline = isRetail
    ? "Hyper-Scale Commerce. Intelligent Fulfillment."
    : isFintech
    ? "Autonomous Wealth. Zero-Latency Execution."
    : isManufacturing
    ? "Industrial IoT. Real-Time Telemetry."
    : isSaas
    ? "Autonomous Multi-Tenant Cloud Scale."
    : "Scalable. Resilient. Secure.";

  const titleHtml = `<table style="border-collapse:collapse;">
    <tr>
      <td style="width:46px;height:46px;background:#0F2A4A;border-radius:6px;text-align:center;vertical-align:middle;">
        <span style="font-size:24px;font-weight:900;color:#FFFFFF;font-family:sans-serif;">08</span>
      </td>
      <td style="padding-left:14px;vertical-align:middle;">
        <div style="font-size:22px;font-weight:900;color:#0F2A4A;letter-spacing:1px;font-family:sans-serif;">${subTitle}</div>
        <div style="font-size:12.5px;font-weight:600;color:#64748B;margin-top:2px;">${familySub}</div>
      </td>
    </tr>
  </table>`;
  text("header_title", titleHtml, 20, 14, 950, 52, "align=left;");

  const logoHtml = `<table style="text-align:right;float:right;">
    <tr>
      <td style="vertical-align:middle;padding-right:6px;"><span style="font-size:26px;">${brandIcon}</span></td>
      <td style="vertical-align:middle;text-align:left;">
        <div style="font-size:20px;font-weight:900;color:#0284C7;letter-spacing:1.5px;line-height:1;">${brandName}</div>
        <div style="font-size:8px;font-weight:700;color:#64748B;line-height:1;margin-top:2px;">${brandTagline}</div>
      </td>
    </tr>
  </table>`;
  text("header_logo", logoHtml, 1260, 14, 280, 48, "align=right;");

  // =========================================================================
  // 2. PRIMARY USERS TOP BAR (x: 210 to 1330, y: 70 to 118)
  // =========================================================================
  rect("users_top_frame", "", 210, 70, 1120, 48, "rounded=1;strokeColor=#1E3A8A;strokeWidth=1.2;fillColor=#FFFFFF;shadow=0;");
  text("users_top_title", "<b>PRIMARY USERS</b>", 210, 72, 1120, 14, "fontSize=8.5;fontColor=#1E3A8A;align=center;");

  const primaryUsers = isRetail
    ? [
        { title: "Global\nShoppers", icon: "🛒" },
        { title: "3P Marketplace\nMerchants", icon: "🏪" },
        { title: "Warehouse\nLogistics", icon: "📦" },
        { title: "Fraud & Risk\nSpecialists", icon: "🛡️" },
        { title: "Catalog & SKU\nQA Teams", icon: "🏅" },
        { title: "Customer\nSupport", icon: "🎧" },
        { title: "E-Commerce\nAnalytics", icon: "📊" },
        { title: "Platform\nAdmins", icon: "⚙️" },
      ]
    : isFintech
    ? [
        { title: "Institutional\nTraders", icon: "💼" },
        { title: "Retail\nInvestors", icon: "📱" },
        { title: "Compliance &\nAML Officers", icon: "🛡️" },
        { title: "Risk & Quant\nAnalysts", icon: "📈" },
        { title: "Portfolio\nManagers", icon: "🏦" },
        { title: "Custody &\nClearing Teams", icon: "🏛️" },
        { title: "FinOps &\nSettlement Ops", icon: "📊" },
        { title: "Platform\nAdmins", icon: "⚙️" },
      ]
    : isManufacturing
    ? [
        { title: "Fleet\nControllers", icon: "🛸" },
        { title: "Drone Hub\nEngineers", icon: "🔧" },
        { title: "Airspace\nOperators", icon: "🌐" },
        { title: "Safety & FAA\nOfficers", icon: "🛡️" },
        { title: "Maintenance\nCrew", icon: "🏅" },
        { title: "Dispatch &\nRouting Ops", icon: "🎧" },
        { title: "Telemetry\nAnalysts", icon: "📊" },
        { title: "Platform\nAdmins", icon: "⚙️" },
      ]
    : isSaas
    ? [
        { title: "Platform\nAdmins", icon: "⚙️" },
        { title: "Workspace\nOwners", icon: "🏢" },
        { title: "Tenant\nDevelopers", icon: "💻" },
        { title: "Security &\nCompliance", icon: "🛡️" },
        { title: "Billing &\nFinOps Ops", icon: "💳" },
        { title: "Customer\nSuccess", icon: "🎧" },
        { title: "SaaS Product\nAnalytics", icon: "📊" },
        { title: "DevOps\nEngineers", icon: "🚀" },
      ]
    : [
        { title: "Research\nScientists", icon: "🔬" },
        { title: "Clinical\nOperations", icon: "👥" },
        { title: "Regulatory\nAffairs", icon: "📄" },
        { title: "Safety/PV\nSpecialists", icon: "🛡️" },
        { title: "Quality\nTeams", icon: "🏅" },
        { title: "Medical\nAffairs", icon: "🩺" },
        { title: "Commercial\nAnalytics", icon: "📊" },
        { title: "Platform\nAdmins", icon: "⚙️" },
      ];

  primaryUsers.forEach((u, i) => {
    const ux = 218 + i * 138;
    const html = `<div style="text-align:center;padding:1px;"><span style="font-size:11px;">${u.icon}</span><div style="font-size:8px;font-weight:800;color:#0F2A4A;line-height:1.15;">${u.title.replace(/\n/g, "<br/>")}</div></div>`;
    rect(`user_pod_${i}`, html, ux, 86, 130, 28, "rounded=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;");
  });

  // =========================================================================
  // 3. LEFT PANEL: SYSTEMS OF RECORD / DATA SOURCES (x: 20 to 175, y: 130 to 650)
  // =========================================================================
  rect("sor_box", "", 20, 130, 155, 520, "rounded=1;strokeColor=#1E3A8A;strokeWidth=1.5;fillColor=#FFFFFF;shadow=0;");
  rect("sor_hdr", "<b style='font-size:9px;color:#FFFFFF;'>SYSTEMS OF RECORD /<br/>DATA SOURCES</b>", 20, 130, 155, 28, "rounded=0;fillColor=#1E3A8A;strokeColor=#1E3A8A;align=center;");

  const sorList = isRetail
    ? [
        { title: "Enterprise Product Catalog", sub: "SKUs, Pricing,\nMedia Assets", icon: "📁" },
        { title: "Warehouse WMS", sub: "Inventory, Bins,\nCross-Dock", icon: "📦" },
        { title: "Stripe / Adyen Vault", sub: "PCI CDE, Cards,\nWallets", icon: "💳" },
        { title: "SAP S/4HANA Supply Chain", sub: "Procurement, ERP,\nPO Tracking", icon: "🏢" },
        { title: "Salesforce Commerce", sub: "Loyalty, Prime,\nCustomer CRM", icon: "☁️" },
        { title: "Carrier Fleet & 3PL", sub: "FedEx, UPS,\nLast-Mile Routing", icon: "🚚" },
        { title: "Customs & Tax Gateways", sub: "Avalara, Vertex,\nCross-Border Duties", icon: "🏛️" },
      ]
    : isFintech
    ? [
        { title: "Bloomberg Core Feed", sub: "Tickers, Order Books,\nQuotes", icon: "📈" },
        { title: "FIX Protocol 4.4 Engine", sub: "DMA, OMS Ingress,\nExecution Routing", icon: "⚡" },
        { title: "Core Banking Ledger", sub: "Double-Entry, DDA,\nBalance Ledger", icon: "🗄️" },
        { title: "Plaid Open Banking", sub: "ACH, Fast Transfers,\nAccount Linking", icon: "🏢" },
        { title: "Stripe / Adyen Vault", sub: "PCI CDE, Cards,\nWallets", icon: "💳" },
        { title: "FedNow / Swift Network", sub: "ISO 20022, Wire Rails,\nRTGS Settlement", icon: "🏛️" },
        { title: "OFAC & FinCEN Watchlist", sub: "PEP Screening, Sanctions,\nSAR Filing", icon: "🛡️" },
      ]
    : isManufacturing
    ? [
        { title: "SCADA PLCs / Sensors", sub: "Edge Telemetry,\nSensors, Motor RPM", icon: "⚙️" },
        { title: "UTM Airspace Gateway", sub: "Corridors, ADS-B,\nAltitude Feeds", icon: "🌐" },
        { title: "Flight Mission Blackbox", sub: "Flight Logs, Lat/Lon,\nBattery Health", icon: "🗄️" },
        { title: "SAP Plant Maintenance", sub: "Spares, Asset Ledger,\nWork Orders", icon: "🏢" },
        { title: "Weather Radar Feeds", sub: "NOAA, Wind Vectors,\nTurbulence Model", icon: "☁️" },
        { title: "Vertiport Hub Stations", sub: "Pad Allocation,\nFast Charging Units", icon: "🛸" },
        { title: "FAA / EASA Registries", sub: "Airworthiness Certs,\nRemote ID Tokens", icon: "🏛️" },
      ]
    : isSaas
    ? [
        { title: "Stripe Billing & Meter", sub: "Usage Invoicing,\nCards, MRR Ledger", icon: "💳" },
        { title: "Multi-Cloud K8s Mesh", sub: "GCP, AWS EKS,\nCluster Telemetry", icon: "☁️" },
        { title: "Auth0 / Okta OIDC", sub: "SAML, SSO, MFA,\nTenant Identity", icon: "🔒" },
        { title: "Salesforce CRM", sub: "Accounts, Deals,\nCSM Health Scores", icon: "🏢" },
        { title: "HubSpot Marketing Hub", sub: "Leads, Events,\nEmail Campaigns", icon: "📊" },
        { title: "Snowflake Usage Vault", sub: "Egress Analytics,\nQuery Log Lake", icon: "🗄️" },
        { title: "Compliance Registry", sub: "SOC 2, ISO 27001,\nGDPR Evidence", icon: "🛡️" },
      ]
    : [
        { title: "Veeva Vault", sub: "Documents, Quality,\nRegistrations", icon: "📁" },
        { title: "CTMS / Medidata Rave", sub: "Clinical Trials,\nSubject Data", icon: "👥" },
        { title: "Argus Safety", sub: "Safety Cases,\nICSRs, Signals", icon: "🛡️" },
        { title: "SAP S/4HANA", sub: "Finance, Supply Chain,\nProcurement", icon: "🏢" },
        { title: "Salesforce Health Cloud", sub: "HCP Engagement,\nPatient Insights", icon: "☁️" },
        { title: "Laboratory / LIMS", sub: "Lab Data, Results,\nCertificates", icon: "⚗️" },
        { title: "Regulatory Gateways", sub: "eSubmissions, Queries,\nResponses", icon: "🏛️" },
      ];

  sorList.forEach((s, i) => {
    const sy = 162 + i * 69;
    const html = `<table style="width:100%;height:100%;border-collapse:collapse;">
      <tr>
        <td style="width:22px;text-align:center;vertical-align:top;padding-top:4px;"><span style="font-size:13px;">${s.icon}</span></td>
        <td style="text-align:left;vertical-align:top;padding-left:4px;">
          <div style="font-size:7px;font-weight:800;color:#0F2A4A;line-height:1.15;">${s.title}</div>
          <div style="font-size:8px;color:#64748B;line-height:1.1;margin-top:1px;">${s.sub.replace(/\n/g, "<br/>")}</div>
        </td>
      </tr>
    </table>`;
    rect(`sor_card_${i}`, html, 24, sy, 147, 63, "rounded=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;");
  });

  // =========================================================================
  // 4. CENTRAL BOUNDARY: 7 TIERS A TO G (x: 210 to 1330, y: 130 to 650)
  // =========================================================================
  const platformTitle = isRetail
    ? "OMNIVUE RETAIL &amp; MARKETPLACE PLATFORM — COMPONENT ARCHITECTURE"
    : isFintech
    ? "NEXUSFIN HIGH-SPEED WEALTH &amp; PAYMENTS PLATFORM — COMPONENT ARCHITECTURE"
    : "ENTERPRISE PLATFORM — COMPONENT ARCHITECTURE";

  rect("platform_frame", "", 210, 130, 1120, 520, "rounded=1;strokeColor=#0F2A4A;strokeWidth=2;fillColor=#FFFFFF;shadow=0;");
  rect("platform_hdr", `<b style='font-size:10.5px;color:#FFFFFF;letter-spacing:1px;'>${platformTitle}</b>`, 210, 130, 1120, 22, "rounded=0;fillColor=#0F2A4A;strokeColor=#0F2A4A;align=center;");

  const layers = isRetail
    ? [
        {
          code: "A",
          name: "EXPERIENCE & ACCESS LAYER",
          y: 156,
          h: 66,
          color: "#1E3A8A",
          items: [
            { title: "Next.js Storefront /\nMobile iOS App", icon: "🌐" },
            { title: "Merchant Seller\nCentral Dashboard", icon: "📊" },
            { title: "Customer Order\nTracking & Alerts", icon: "🔔" },
            { title: "GraphQL API &\nPartner Ingress", icon: "⚡" },
          ]
        },
        {
          code: "B",
          name: "PROCESS & ORCHESTRATION LAYER",
          y: 226,
          h: 68,
          color: "#1E40AF",
          items: [
            { title: "Temporal Order\nSaga Orchestrator", icon: "🔄" },
            { title: "Dynamic Pricing &\nPromotion Rules", icon: "⚙️" },
            { title: "Returns & Dispute\nWorkflow Service", icon: "📋" },
            { title: "Fulfillment &\nCarrier Router", icon: "📦" },
            { title: "Fraud Assessment\nPipeline Service", icon: "🛡️" },
          ]
        },
        {
          code: "C",
          name: "DOMAIN BUSINESS SERVICES LAYER",
          y: 298,
          h: 70,
          color: "#0369A1",
          items: [
            { title: "Product & SKU\nCatalog Service", icon: "📁" },
            { title: "Shopping Cart &\nSession Mesh", icon: "🛒" },
            { title: "Order Management\nSystem (OMS)", icon: "📑" },
            { title: "Inventory Allocation\n& WMS Hold Engine", icon: "📦" },
            { title: "Payment Vault &\nSettlement Gateway", icon: "💳" },
            { title: "Customer Profile &\nLoyalty Service", icon: "👤" },
          ]
        },
        {
          code: "D",
          name: "AI & INTELLIGENT CAPABILITIES LAYER",
          y: 372,
          h: 70,
          color: "#0284C7",
          items: [
            { title: "Vertex AI Product\nRecommender Engine", icon: "🧠" },
            { title: "OpenSearch Semantic\nCatalog Search", icon: "🔍" },
            { title: "Dynamic Real-Time\nPricing Optimizer", icon: "🏷️" },
            { title: "Fraud & Anomaly\nDetection ML", icon: "🛡️" },
            { title: "Conversational AI\nShopping Assistant", icon: "💬" },
          ]
        },
        {
          code: "E",
          name: "DATA & ANALYTICS PLATFORM LAYER",
          y: 446,
          h: 66,
          color: "#0D9488",
          items: [
            { title: "Kafka Real-Time\nEvent Streaming Bus", icon: "⚡" },
            { title: "BigQuery Enterprise\nData Lakehouse", icon: "🗄️" },
            { title: "Search Index\nCDC Pipeline", icon: "🔄" },
            { title: "Real-Time GMV &\nSales Analytics", icon: "📊" },
            { title: "Customer Data\nPlatform (CDP)", icon: "👥" },
          ]
        },
        {
          code: "F",
          name: "INTEGRATION, PLATFORM & SECURITY LAYER",
          y: 516,
          h: 64,
          color: "#0F766E",
          items: [
            { title: "Apigee API Gateway\n& Rate Limiter", icon: "🌐" },
            { title: "Cloud Identity &\nOAuth2/OIDC Auth", icon: "🔒" },
            { title: "OpenTelemetry APM\n& Cloud Logging", icon: "📊" },
            { title: "Vault Secrets &\nPCI Tokenization", icon: "🛡️" },
            { title: "GitOps CI/CD &\nArgoCD Deployer", icon: "🚀" },
          ]
        },
        {
          code: "G",
          name: "FOUNDATION & INFRASTRUCTURE LAYER",
          y: 584,
          h: 60,
          color: "#047857",
          items: [
            { title: "GKE Multi-AZ\nKubernetes Mesh", icon: "☁️" },
            { title: "Cloud Storage CDN\n& Media Bucket", icon: "📦" },
            { title: "Cloud Spanner Multi-\nRegion Database", icon: "🗄️" },
            { title: "Memorystore Redis\nDistributed Cache", icon: "⚡" },
            { title: "Cloud Armor DDoS\n& WAF Security", icon: "🛡️" },
          ]
        }
      ]
    : isFintech
    ? [
        {
          code: "A",
          name: "EXPERIENCE & ACCESS LAYER",
          y: 156,
          h: 66,
          color: "#1E3A8A",
          items: [
            { title: "Trader Web Terminal /\nMobile FinApp", icon: "🌐" },
            { title: "Wealth Management\nAdvisor Dashboard", icon: "📊" },
            { title: "Real-Time Market\nAlerts & Notifications", icon: "🔔" },
            { title: "FIX Protocol & High-Speed\nREST/gRPC Ingress", icon: "⚡" },
          ]
        },
        {
          code: "B",
          name: "PROCESS & ORCHESTRATION LAYER",
          y: 226,
          h: 68,
          color: "#1E40AF",
          items: [
            { title: "Payment Saga &\n2PC Orchestrator", icon: "🔄" },
            { title: "Sub-Millisecond Pre-Trade\nRisk Rules Engine", icon: "⚙️" },
            { title: "Automated SAR Filing &\nAML Investigation", icon: "📋" },
            { title: "Smart Order Router (SOR)\n& Execution Allocator", icon: "📄" },
            { title: "Custody & Escrow\nSettlement Pipeline", icon: "🛡️" },
          ]
        },
        {
          code: "C",
          name: "DOMAIN BUSINESS SERVICES LAYER",
          y: 298,
          h: 70,
          color: "#0369A1",
          items: [
            { title: "Trade Order Matching\n& Execution Engine", icon: "⚡" },
            { title: "Double-Entry General\nLedger (Spanner)", icon: "🗄️" },
            { title: "Portfolio Valuation &\nReal-Time P&L Engine", icon: "📊" },
            { title: "Payment Vault & ISO\n20022 Swift Router", icon: "💳" },
            { title: "AML & OFAC Sanctions\nScreening Service", icon: "🛡️" },
            { title: "Account & Margin\nManagement Service", icon: "👤" },
          ]
        },
        {
          code: "D",
          name: "AI & INTELLIGENT CAPABILITIES LAYER",
          y: 372,
          h: 70,
          color: "#0284C7",
          items: [
            { title: "Vertex AI Real-Time\nFraud Anomaly ML", icon: "🧠" },
            { title: "Graph Neural Network\nfor Money Mules", icon: "🤖" },
            { title: "Algorithmic Market\nRegime Classifier", icon: "📈" },
            { title: "Sub-Millisecond Volatility\n& VaR Predictor", icon: "💡" },
            { title: "Conversational Wealth\nAI Copilot Assistant", icon: "💬" },
          ]
        },
        {
          code: "E",
          name: "DATA & ANALYTICS PLATFORM LAYER",
          y: 446,
          h: 66,
          color: "#0D9488",
          items: [
            { title: "Kafka / Flink Real-Time\nEvent Stream Mesh", icon: "⚡" },
            { title: "BigQuery Financial\nData Lakehouse", icon: "🗄️" },
            { title: "Real-Time Ticks &\nOrder Book CDC", icon: "🔄" },
            { title: "Real-Time P&L, Risk\n& Exposure Telemetry", icon: "📊" },
            { title: "Audit Vault & Immutable\nTransaction Ledger", icon: "🛡️" },
          ]
        },
        {
          code: "F",
          name: "INTEGRATION, PLATFORM & SECURITY LAYER",
          y: 516,
          h: 64,
          color: "#0F766E",
          items: [
            { title: "Apigee mTLS API Gateway\n& Token Vault", icon: "🌐" },
            { title: "Cloud Identity &\nHSM Key Management", icon: "🔒" },
            { title: "SEC 15c3-5 Compliance &\nAudit Observability", icon: "📊" },
            { title: "Core Banking & Clearing\nHouse Adapters", icon: "🔌" },
            { title: "Zero-Trust Network &\nPCI Tokenizer", icon: "🔑" },
          ]
        },
        {
          code: "G",
          name: "FOUNDATION & INFRASTRUCTURE LAYER",
          y: 584,
          h: 60,
          color: "#047857",
          items: [
            { title: "GKE Ultra-Low Latency\nKubernetes Mesh", icon: "☁️" },
            { title: "Cloud Spanner Multi-Region\nActive-Active Ledger", icon: "🗄️" },
            { title: "Memorystore Redis\nSub-ms Risk Cache", icon: "⚡" },
            { title: "Cloud Armor DDoS &\nFinTech WAF Perimeter", icon: "🛡️" },
            { title: "Multi-Region Failover &\nHot-Standby Node", icon: "🔄" },
          ]
        }
      ]
    : isManufacturing
    ? [
        {
          code: "A",
          name: "EXPERIENCE & ACCESS LAYER",
          y: 156,
          h: 66,
          color: "#1E3A8A",
          items: [
            { title: "Flight Operations UI /\nMobile Field App", icon: "🌐" },
            { title: "Fleet Telemetry &\nStatus Dashboard", icon: "📊" },
            { title: "Waypoint Dispatch &\nCollision Alerts", icon: "🔔" },
            { title: "gRPC & MQTT Ingress\nfor Drone Nodes", icon: "⚡" },
          ]
        },
        {
          code: "B",
          name: "PROCESS & ORCHESTRATION LAYER",
          y: 226,
          h: 68,
          color: "#1E40AF",
          items: [
            { title: "Mission Saga &\nWaypoint Orchestrator", icon: "🔄" },
            { title: "Airspace Conflict &\nCorridor Rules Engine", icon: "⚙️" },
            { title: "Auto-RTH & Emergency\nSafety Interlock", icon: "📋" },
            { title: "Vertiport Pad &\nCharger Router", icon: "🛸" },
            { title: "Geofence Enforcement\nPipeline Service", icon: "🛡️" },
          ]
        },
        {
          code: "C",
          name: "DOMAIN BUSINESS SERVICES LAYER",
          y: 298,
          h: 70,
          color: "#0369A1",
          items: [
            { title: "Drone Fleet Registry\n& OTA Firmware Mesh", icon: "🛸" },
            { title: "Battery Health &\nCharging State Service", icon: "⚡" },
            { title: "Flight Path Vector\n& ADS-B Tracker", icon: "📊" },
            { title: "SCADA & Telemetry\nIngestion Streamer", icon: "⚙️" },
            { title: "Airspace Policy &\nFAA Guard Service", icon: "🛡️" },
            { title: "Operator Roster &\nShift Manager", icon: "👤" },
          ]
        },
        {
          code: "D",
          name: "AI & INTELLIGENT CAPABILITIES LAYER",
          y: 372,
          h: 70,
          color: "#0284C7",
          items: [
            { title: "Vertex AI Collision\nAvoidance ML", icon: "🧠" },
            { title: "Wind Vector &\nTurbulence Predictor", icon: "🤖" },
            { title: "Battery Degradation\n& Range AI Model", icon: "📈" },
            { title: "Autonomous Flight Plan\nOptimizer Engine", icon: "💡" },
            { title: "Conversational Fleet\nCopilot Assistant", icon: "💬" },
          ]
        },
        {
          code: "E",
          name: "DATA & ANALYTICS PLATFORM LAYER",
          y: 446,
          h: 66,
          color: "#0D9488",
          items: [
            { title: "Kafka / MQTT Real-Time\nTelemetry Stream", icon: "⚡" },
            { title: "BigQuery Industrial\nData Lakehouse", icon: "🗄️" },
            { title: "Spatial GIS Index &\nAltitude CDC Pipeline", icon: "🔄" },
            { title: "Real-Time Fleet Latency\n& Motor RPM Telemetry", icon: "📊" },
            { title: "Flight Blackbox Ledger\n& Tamper-Proof Logs", icon: "🛡️" },
          ]
        },
        {
          code: "F",
          name: "INTEGRATION, PLATFORM & SECURITY LAYER",
          y: 516,
          h: 64,
          color: "#0F766E",
          items: [
            { title: "Apigee mTLS Drone Gateway\n& Device Token Vault", icon: "🌐" },
            { title: "KMS Remote ID &\nDevice Hardware TPM", icon: "🔒" },
            { title: "FAA Part 107 Compliance\n& Audit Telemetry", icon: "📊" },
            { title: "SCADA Modbus & PLC\nHardware Adapters", icon: "🔌" },
            { title: "Zero-Trust Firmware &\nOTA Image Signer", icon: "🔑" },
          ]
        },
        {
          code: "G",
          name: "FOUNDATION & INFRASTRUCTURE LAYER",
          y: 584,
          h: 60,
          color: "#047857",
          items: [
            { title: "GKE Low-Latency Edge\nKubernetes Mesh", icon: "☁️" },
            { title: "Cloud Spanner Multi-Region\nMission Database", icon: "🗄️" },
            { title: "Memorystore Redis\nSub-ms GPS Cache", icon: "⚡" },
            { title: "Cloud Armor DDoS &\nDrone WAF Perimeter", icon: "🛡️" },
            { title: "Multi-Hub Failover &\nHot-Standby Node", icon: "🔄" },
          ]
        }
      ]
    : isSaas
    ? [
        {
          code: "A",
          name: "EXPERIENCE & ACCESS LAYER",
          y: 156,
          h: 66,
          color: "#1E3A8A",
          items: [
            { title: "Multi-Tenant Web Console\n/ Developer Portal", icon: "🌐" },
            { title: "Tenant Admin &\nWorkspace Dashboard", icon: "📊" },
            { title: "Usage Quota Alerts &\nSystem Notifications", icon: "🔔" },
            { title: "GraphQL & REST Ingress\nGateway Mesh", icon: "⚡" },
          ]
        },
        {
          code: "B",
          name: "PROCESS & ORCHESTRATION LAYER",
          y: 226,
          h: 68,
          color: "#1E40AF",
          items: [
            { title: "Tenant Provisioning\nSaga Orchestrator", icon: "🔄" },
            { title: "Dynamic Rate Limiting\n& QPS Rules Engine", icon: "⚙️" },
            { title: "Subscription Renewal &\nBilling Workflow", icon: "📋" },
            { title: "Tenant Shard Router &\nDatabase Allocator", icon: "🏢" },
            { title: "Quota Breach Mitigation\nPipeline Service", icon: "🛡️" },
          ]
        },
        {
          code: "C",
          name: "DOMAIN BUSINESS SERVICES LAYER",
          y: 298,
          h: 70,
          color: "#0369A1",
          items: [
            { title: "Tenant Registry &\nOrganization Service", icon: "🏢" },
            { title: "Workspace RBAC &\nAccess Engine", icon: "🔒" },
            { title: "API Key Vault &\nToken Quota Mesh", icon: "🔑" },
            { title: "Usage Invoicing &\nStripe Metering Core", icon: "💳" },
            { title: "Compliance & Audit\nLogging Service", icon: "🛡️" },
            { title: "User Roster & Team\nProvisioning Service", icon: "👤" },
          ]
        },
        {
          code: "D",
          name: "AI & INTELLIGENT CAPABILITIES LAYER",
          y: 372,
          h: 70,
          color: "#0284C7",
          items: [
            { title: "Vertex AI Tenant\nCopilot Framework", icon: "🧠" },
            { title: "Semantic Log Search\n& Anomaly Detector", icon: "🤖" },
            { title: "Predictive Churn &\nSeat Expansion AI", icon: "📈" },
            { title: "Adaptive Rate Limit\nOptimizer Engine", icon: "💡" },
            { title: "Conversational Admin\nAI Assistant", icon: "💬" },
          ]
        },
        {
          code: "E",
          name: "DATA & ANALYTICS PLATFORM LAYER",
          y: 446,
          h: 66,
          color: "#0D9488",
          items: [
            { title: "Kafka Multi-Tenant\nEvent Streaming Bus", icon: "⚡" },
            { title: "BigQuery Enterprise\nSaaS Lakehouse", icon: "🗄️" },
            { title: "Tenant Isolation CDC\n& Replication Bus", icon: "🔄" },
            { title: "Real-Time MRR, QPS\n& Latency Telemetry", icon: "📊" },
            { title: "Audit Trail Vault &\nImmutable Event Log", icon: "🛡️" },
          ]
        },
        {
          code: "F",
          name: "INTEGRATION, PLATFORM & SECURITY LAYER",
          y: 516,
          h: 64,
          color: "#0F766E",
          items: [
            { title: "Apigee API Gateway\n& Rate Limiter Mesh", icon: "🌐" },
            { title: "Cloud Identity & OIDC\nTenant Key Vault", icon: "🔒" },
            { title: "SOC 2 Type II & GDPR\nAudit Observability", icon: "📊" },
            { title: "Third-Party SaaS\nWebhook Connectors", icon: "🔌" },
            { title: "Zero-Trust Encryption\n& Shard Tokenizer", icon: "🔑" },
          ]
        },
        {
          code: "G",
          name: "FOUNDATION & INFRASTRUCTURE LAYER",
          y: 584,
          h: 60,
          color: "#047857",
          items: [
            { title: "GKE Multi-Tenant\nKubernetes Mesh", icon: "☁️" },
            { title: "Cloud Spanner Sharded\nMulti-Region Database", icon: "🗄️" },
            { title: "Memorystore Redis\nDistributed Token Cache", icon: "⚡" },
            { title: "Cloud Armor DDoS &\nWAF Enterprise Shield", icon: "🛡️" },
            { title: "Multi-Region Active-Active\nHigh Availability", icon: "🔄" },
          ]
        }
      ]
    : [
        {
          code: "A",
          name: "EXPERIENCE & ACCESS LAYER",
          y: 156,
          h: 66,
          color: "#1E3A8A",
          items: [
            { title: "Web Portal /\nWorkspace UI", icon: "🌐" },
            { title: "Role-Based\nDashboards", icon: "📊" },
            { title: "Task Inbox &\nNotifications", icon: "🔔" },
            { title: "API / Partner\nAccess Channel", icon: "⚡" },
          ]
        },
        {
          code: "B",
          name: "PROCESS & ORCHESTRATION LAYER",
          y: 226,
          h: 68,
          color: "#1E40AF",
          items: [
            { title: "Workflow\nOrchestrator", icon: "🔄" },
            { title: "Business Rules\nEngine", icon: "⚙️" },
            { title: "Case / Task\nManagement Service", icon: "📋" },
            { title: "Submission\nOrchestration Service", icon: "📄" },
            { title: "CAPA / Quality\nWorkflow Service", icon: "🛡️" },
          ]
        },
        {
          code: "C",
          name: "DOMAIN BUSINESS SERVICES LAYER",
          y: 298,
          h: 70,
          color: "#0369A1",
          items: [
            { title: "R&D / Clinical\nStudy Service", icon: "🔬" },
            { title: "Regulatory Operations\n& Submissions", icon: "📄" },
            { title: "Safety & Pharmacovigilance\nService", icon: "🛡️" },
            { title: "Quality & Compliance\nManagement Service", icon: "🏅" },
            { title: "Medical Affairs &\nMSL Service", icon: "🩺" },
            { title: "Supply Chain &\nSerialization", icon: "📦" },
          ]
        },
        {
          code: "D",
          name: "AI & INTELLIGENT CAPABILITIES LAYER",
          y: 372,
          h: 70,
          color: "#0284C7",
          items: [
            { title: "Vertex AI LLM\nFoundation Service", icon: "🧠" },
            { title: "Domain Specific\nAgents Framework", icon: "🤖" },
            { title: "Document Intelligence\n& Extraction Service", icon: "📄" },
            { title: "Regulatory Intelligence\n& Insights Service", icon: "💡" },
            { title: "Safety Signal Detection\n& Prediction Engine", icon: "📈" },
          ]
        },
        {
          code: "E",
          name: "DATA & ANALYTICS PLATFORM LAYER",
          y: 446,
          h: 66,
          color: "#0D9488",
          items: [
            { title: "Enterprise Knowledge\nGraph & Ontologies", icon: "🔗" },
            { title: "Vector Database &\nSemantic Search", icon: "🔍" },
            { title: "Clinical Data\nRepository (CDR)", icon: "🗄️" },
            { title: "Data Lakehouse &\nAnalytics Engine", icon: "📊" },
            { title: "Data Governance &\nLineage Service", icon: "🛡️" },
          ]
        },
        {
          code: "F",
          name: "INTEGRATION, PLATFORM & SECURITY LAYER",
          y: 516,
          h: 64,
          color: "#0F766E",
          items: [
            { title: "API Gateway &\nService Mesh", icon: "🌐" },
            { title: "Identity & Access\nManagement (IAM)", icon: "🔒" },
            { title: "Audit Trail, Logging &\nObservability", icon: "📊" },
            { title: "Integration Adapters &\nConnectors", icon: "🔌" },
            { title: "Secrets & Key\nManagement Service", icon: "🔑" },
          ]
        },
        {
          code: "G",
          name: "FOUNDATION & INFRASTRUCTURE LAYER",
          y: 584,
          h: 60,
          color: "#047857",
          items: [
            { title: "Hybrid Multi-Cloud\nDeployment (GCP/AWS)", icon: "☁️" },
            { title: "Enterprise Network &\nPerimeter Security", icon: "🛡️" },
            { title: "High Availability &\nDisaster Recovery", icon: "🔄" },
            { title: "Container Runtime &\nKubernetes (GKE/EKS)", icon: "⚙️" },
            { title: "Storage, Database &\nCompute Infrastructure", icon: "🗄️" },
          ]
        }
      ];

  layers.forEach((ly) => {
    rect(`ly_box_${ly.code}`, "", 214, ly.y, 1112, ly.h, `rounded=1;strokeColor=${ly.color};strokeWidth=1;fillColor=#FFFFFF;`);
    rect(`ly_badge_${ly.code}`, `<div style="text-align:center;"><b style="font-size:11px;color:#FFFFFF;">${ly.code}</b></div>`, 218, ly.y + 4, 22, ly.h - 8, `rounded=1;fillColor=${ly.color};strokeColor=${ly.color};align=center;`);
    rect(`ly_lbl_${ly.code}`, `<div style="text-align:left;padding-left:4px;"><b style="font-size:7px;color:${ly.color};">${ly.name}</b></div>`, 244, ly.y + 2, 160, 14, "strokeColor=none;fillColor=none;");

    const count = ly.items.length;
    const itemW = (1080 - 44) / count;
    ly.items.forEach((it, i) => {
      const ix = 244 + i * itemW;
      const html = `<table style="width:100%;height:100%;text-align:center;">
        <tr>
          <td style="width:18px;"><span style="font-size:11px;">${it.icon}</span></td>
          <td style="text-align:left;font-size:8px;font-weight:700;color:#0F2A4A;line-height:1.15;">${it.title.replace(/\n/g, "<br/>")}</td>
        </tr>
      </table>`;
      rect(`it_${ly.code}_${i}`, html, ix, ly.y + 14, itemW - 6, ly.h - 18, "rounded=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;");
    });
  });

  // =========================================================================
  // 5. RIGHT PANEL: EXTERNAL PARTICIPANTS (x: 1365 to 1540, y: 130 to 650)
  // =========================================================================
  rect("ext_part_box", "", 1365, 130, 175, 520, "rounded=1;strokeColor=#0D9488;strokeWidth=1.5;fillColor=#FFFFFF;shadow=0;");
  rect("ext_part_hdr", "<b style='font-size:9px;color:#FFFFFF;'>EXTERNAL PARTICIPANTS</b>", 1365, 130, 175, 28, "rounded=0;fillColor=#0D9488;strokeColor=#0D9488;align=center;");

  const extList = isRetail
    ? [
        { title: "3P Marketplace Sellers", sub: "Catalog feeds, inventory sync\n& fulfillment updates", icon: "🏪" },
        { title: "Carrier Logistics & 3PL", sub: "FedEx, UPS, DHL last-mile\nrouting & tracking", icon: "🚚" },
        { title: "Payment Gateways & Banks", sub: "Stripe, Adyen, Apple Pay\ntokenized settlement", icon: "💳" },
        { title: "Global Shoppers & Prime", sub: "Storefront sessions, 1-Click\n& order alerts", icon: "🛒" },
        { title: "Tax & Customs Authorities", sub: "Avalara, Vertex, Cross-border\nduties clearing", icon: "🏛️" },
      ]
    : isFintech
    ? [
        { title: "Liquidity Providers / Exchanges", sub: "NYSE, NASDAQ, CME, FIX\n4.4 DMA Gateways", icon: "🏛️" },
        { title: "Clearing Houses & Custodians", sub: "DTCC, Euroclear, Apex,\nSwift RTGS rails", icon: "🏦" },
        { title: "Financial Regulators", sub: "SEC, FINRA, CFTC automated\nCAT/SAR auditing", icon: "⚖️" },
        { title: "Institutional Clients", sub: "Hedge Funds, Family Offices\ndirect API ingress", icon: "💼" },
        { title: "Payment Networks & Banks", sub: "FedNow, Visa, Mastercard,\nACH settlement", icon: "💳" },
      ]
    : isManufacturing
    ? [
        { title: "FAA / UTM Regulators", sub: "Flight plans, remote ID\n& airspace clearance", icon: "🏛️" },
        { title: "Vertiport Base Stations", sub: "Pad allocation, power\n& weather radar", icon: "🛸" },
        { title: "Ground Delivery Couriers", sub: "Last-mile handoff &\npackage lockers", icon: "🚚" },
        { title: "Maintenance & Field Hubs", sub: "Battery swap, motor QA\n& airframe repair", icon: "🔧" },
        { title: "Emergency Response Units", sub: "First responders, live\nincident coordinates", icon: "🚨" },
      ]
    : isSaas
    ? [
        { title: "Third-Party SaaS Apps", sub: "Webhooks, REST APIs\n& Zapier automations", icon: "🔌" },
        { title: "Identity Providers (IdP)", sub: "Okta, Azure AD, Google\nSAML/SSO tokens", icon: "🔒" },
        { title: "Payment Processors", sub: "Stripe, Chargebee usage\n& subscription webhooks", icon: "💳" },
        { title: "Multi-Cloud Infrastructure", sub: "GCP, AWS, Azure multi-\nregion VPC peering", icon: "☁️" },
        { title: "Compliance Auditors", sub: "SOC 2 Type II, ISO\n27001 evidence logs", icon: "🛡️" },
      ]
    : [
        { title: "CRO / CDMO Partners", sub: "Collaborate on studies, data\n& supply chain", icon: "👥" },
        { title: "Investigators / Sites", sub: "Study conduct, data capture\n& updates", icon: "🏥" },
        { title: "Regulatory Authorities", sub: "eSubmissions, queries,\ncompliance comms", icon: "🏛️" },
        { title: "Patients / Patient Programs", sub: "Access programs, support\n& communications", icon: "👥" },
        { title: "HCPs / Healthcare Providers", sub: "Engage with medical content\n& communications", icon: "🩺" },
      ];
  extList.forEach((ep, i) => {
    const epy = 166 + i * 96;
    const html = `<table style="width:100%;height:100%;border-collapse:collapse;">
      <tr>
        <td style="width:26px;text-align:center;vertical-align:top;padding-top:4px;"><span style="font-size:15px;">${ep.icon}</span></td>
        <td style="text-align:left;vertical-align:top;padding-left:4px;">
          <div style="font-size:7.5px;font-weight:800;color:#0F2A4A;line-height:1.2;">${ep.title}</div>
          <div style="font-size:8px;color:#64748B;line-height:1.15;margin-top:2px;">${ep.sub.replace(/\n/g, "<br/>")}</div>
        </td>
      </tr>
    </table>`;
    rect(`ext_card_${i}`, html, 1370, epy, 165, 88, "rounded=1;fillColor=#F0FDFA;strokeColor=#CCFBF1;");
  });

  // =========================================================================
  // 6. LEGEND BAR (x: 210 to 1330, y: 656 to 678)
  // =========================================================================
  rect("legend_box", "", 210, 656, 1120, 22, "rounded=1;strokeColor=#CBD5E1;fillColor=#F8FAFC;shadow=0;");
  const legendHtml = `<table style="width:100%;height:100%;border-collapse:collapse;font-size:7px;color:#334155;">
    <tr>
      <td style="font-weight:900;color:#0F2A4A;padding-left:8px;width:70px;">LEGEND:</td>
      <td><span style="color:#1D4ED8;font-weight:bold;">&harr;</span> User Interaction</td>
      <td><span style="color:#1D4ED8;font-weight:bold;">&rarr;</span> Synchronous Service Call</td>
      <td><span style="color:#EA580C;font-weight:bold;">- - &rarr;</span> Async Event Flow</td>
      <td><span style="color:#0D9488;font-weight:bold;">&rarr;</span> External Integration</td>
      <td><span style="color:#7C3AED;font-weight:bold;">- - &rarr;</span> AI / Knowledge Flow</td>
      <td style="padding-right:8px;"><span style="color:#64748B;font-weight:bold;">- - &rarr;</span> Governance / Control Flow</td>
    </tr>
  </table>`;
  text("legend_txt", legendHtml, 210, 656, 1120, 22, "align=center;");

  // =========================================================================
  // 7. BOTTOM: GOOGLE CLOUD TECH MAPPING & CONNECTED APPS (y: 686 to 818)
  // =========================================================================
  rect("tech_map_box", "", 20, 686, 1140, 128, "rounded=1;strokeColor=#0284C7;strokeWidth=1.2;fillColor=#FFFFFF;shadow=0;");
  text("tech_map_title", "<b>GOOGLE CLOUD TECHNOLOGY MAPPING</b>", 20, 690, 1140, 14, "fontSize=8;fontColor=#0369A1;align=center;");

  const gcpTech = [
    { name: "Compute", tech: "Cloud Run / GKE", icon: "☸️" },
    { name: "API Mgmt", tech: "Apigee", icon: "⚡" },
    { name: "Eventing", tech: "Pub/Sub", icon: "📡" },
    { name: "Processing", tech: "Dataflow", icon: "🌊" },
    { name: "Data Warehouse", tech: "BigQuery", icon: "🔍" },
    { name: "Object Storage", tech: "Cloud Storage", icon: "🗄️" },
    { name: "AI Platform", tech: "Vertex AI", icon: "✨" },
    { name: "Transactional", tech: "AlloyDB / Spanner", icon: "🗄️" },
    { name: "Data Governance", tech: "Dataplex", icon: "🕸️" },
    { name: "Analytics & BI", tech: "Looker", icon: "📊" },
    { name: "Secrets & Keys", tech: "Secret Manager", icon: "🔒" },
    { name: "Logs & Metrics", tech: "Cloud Logging", icon: "📈" },
    { name: "IAM", tech: "Identity Mgmt", icon: "👤" },
  ];
  gcpTech.forEach((gt, i) => {
    const gtx = 26 + i * 86;
    const html = `<div style="text-align:center;padding:2px;"><span style="font-size:14px;">${gt.icon}</span><div style="font-size:8px;font-weight:800;color:#0F2A4A;margin-top:2px;">${gt.name}</div><div style="font-size:7.5px;color:#64748B;">${gt.tech}</div></div>`;
    rect(`gcp_tech_${i}`, html, gtx, 708, 80, 98, "rounded=1;fillColor=#F8FAFC;strokeColor=#E2E8F0;");
  });

  // Connected Apps on Right
  rect("conn_apps_box", "", 1170, 686, 370, 128, "rounded=1;strokeColor=#1E3A8A;strokeWidth=1.2;fillColor=#FFFFFF;shadow=0;");
  text("conn_apps_title", "<b>ENTERPRISE APPLICATIONS (CONNECTED)</b>", 1170, 690, 370, 14, "fontSize=8;fontColor=#1E3A8A;align=center;");

  const connApps = isRetail
    ? [
        { title: "Salesforce\nCommerce Cloud", icon: "☁️" },
        { title: "SAP S/4HANA\nSupply Chain", icon: "🏢" },
        { title: "Stripe / Adyen\nPCI Vault", icon: "💳" },
        { title: "FedEx / UPS\nLogistics Mesh", icon: "🚚" },
      ]
    : isFintech
    ? [
        { title: "Bloomberg Core\n& Reuters Feed", icon: "📈" },
        { title: "Core Banking\nLedger (Spanner)", icon: "🗄️" },
        { title: "FedNow / Swift\nISO 20022 Network", icon: "🏛️" },
        { title: "DTCC / Apex\nClearing Gateway", icon: "🏦" },
      ]
    : isManufacturing
    ? [
        { title: "SCADA / PLC\nPlant Controllers", icon: "⚙️" },
        { title: "SAP Plant\nMaintenance", icon: "🏢" },
        { title: "FAA UTM\nAirspace Radar", icon: "🌐" },
        { title: "Vertiport Pad\nCharging Network", icon: "🛸" },
      ]
    : isSaas
    ? [
        { title: "Stripe Billing\n& Metering API", icon: "💳" },
        { title: "Salesforce CRM\n& Deal Desk", icon: "🏢" },
        { title: "Auth0 / Okta\nIdentity Cloud", icon: "🔒" },
        { title: "Snowflake Usage\n& Query Vault", icon: "🗄️" },
      ]
    : [
        { title: "Salesforce\nHealth Cloud", icon: "☁️" },
        { title: "SAP\nS/4HANA", icon: "🏢" },
        { title: "Veeva\nVault", icon: "📁" },
        { title: "Medidata\nRave", icon: "👥" },
      ];
  connApps.forEach((ca, i) => {
    const cax = 1178 + i * 89;
    const html = `<div style="text-align:center;padding:2px;"><span style="font-size:15px;">${ca.icon}</span><div style="font-size:7px;font-weight:800;color:#0F2A4A;line-height:1.15;margin-top:3px;">${ca.title.replace(/\n/g, "<br/>")}</div></div>`;
    rect(`conn_app_${i}`, html, cax, 708, 82, 98, "rounded=1;fillColor=#F8FAFC;strokeColor=#CBD5E1;");
  });

  // =========================================================================
  // 8. KEY ARCHITECTURAL CHARACTERISTICS (y: 824 to 884)
  // =========================================================================
  rect("arch_char_box", "", 20, 824, 1520, 56, "rounded=1;strokeColor=#15803D;strokeWidth=1.2;fillColor=#F0FDF4;shadow=0;");
  text("arch_char_title", "<b>KEY ARCHITECTURAL CHARACTERISTICS</b>", 20, 826, 1520, 14, "fontSize=8;fontColor=#15803D;align=center;");

  const chars = isRetail
    ? [
        { title: "Omnichannel Elasticity", desc: "Sub-50ms catalog search & 100k TPS flash sale auto-scaling", icon: "🚀" },
        { title: "PCI-DSS Level 1 CDE", desc: "Tokenized payment vault with zero PAN plaintext storage", icon: "🛡️" },
        { title: "Sub-Second WMS Hold", desc: "Two-phase commit inventory reservation with 900s TTL lock", icon: "📦" },
        { title: "Cloud Spanner ACID", desc: "Multi-region strict serializability for order transactions", icon: "🗄️" },
        { title: "Real-Time Fraud Graph", desc: "Vertex AI streaming risk scoring on checkout ingress", icon: "🧠" },
        { title: "Global CDN & Edge Cache", desc: "Edge SSR storefront with 99.999% SLA availability", icon: "🌐" },
      ]
    : isFintech
    ? [
        { title: "Sub-Millisecond Risk", desc: "Pre-trade risk budget check < 5ms on Redis cluster", icon: "⚡" },
        { title: "SOC 2 & SEC 15c3-5", desc: "FINRA CAT / OATS compliant tamper-evident audit ledger", icon: "🛡️" },
        { title: "Cloud Spanner Ledger", desc: "Multi-region double-entry active-active financial ledger", icon: "🗄️" },
        { title: "ISO 20022 Messaging", desc: "End-to-end Swift MX and FedNow wire messaging interoperability", icon: "🏛️" },
        { title: "Graph Fraud ML Anomaly", desc: "Vertex AI money-mule and anomaly detection under 20ms", icon: "🧠" },
        { title: "Zero-Trust mTLS Mesh", desc: "Hardware Security Module (HSM) keys and mutual TLS", icon: "🔒" },
      ]
    : isManufacturing
    ? [
        { title: "Sub-10ms Telemetry Stream", desc: "Real-time MQTT telemetry stream & edge collision guard", icon: "⚡" },
        { title: "FAA Part 107 & ISO 27001", desc: "Strict airspace regulation, tamper-evident blackbox audit", icon: "🛡️" },
        { title: "Cloud Spanner Mission State", desc: "Multi-region active-active drone state and fleet mesh", icon: "🗄️" },
        { title: "Vertex AI Collision ML", desc: "Predictive spatial corridor & weather vector routing", icon: "🧠" },
        { title: "Multi-Hub Active Failover", desc: "Seamless vertiport failover & automated RTH interlock", icon: "🔄" },
        { title: "Encrypted GPS & Remote ID", desc: "Hardware TPM keys and authenticated Remote ID beacons", icon: "🔒" },
      ]
    : isSaas
    ? [
        { title: "Strict Multi-Tenant Isolation", desc: "Row-level security, isolated DB schemas & KMS encryption", icon: "🔒" },
        { title: "SOC 2 Type II & GDPR", desc: "Immutable audit logs, SCIM identity & automated compliance", icon: "🛡️" },
        { title: "Sub-Millisecond Quota Check", desc: "Distributed Redis token bucket with burst tolerance", icon: "⚡" },
        { title: "Cloud Spanner ACID Scale", desc: "Multi-region horizontal scaling with zero maintenance downtime", icon: "🗄️" },
        { title: "Vertex AI Tenant Copilot", desc: "Isolated RAG models and tenant-specific knowledge grounding", icon: "🧠" },
        { title: "99.999% SLA High Availability", desc: "Multi-region active-active cluster mesh & auto-healing pods", icon: "🌐" },
      ]
    : [
        { title: "Compliant by Design", desc: "Built-in compliance with GxP, 21 CFR Part 11, EU Annex 11, HIPAA", icon: "🛡️" },
        { title: "Traceable & Auditable", desc: "End-to-end traceability, audit logging & evidence management", icon: "📑" },
        { title: "AI-Grounded Knowledge", desc: "AI Copilot with governed guardrails & trusted RAG", icon: "🧠" },
        { title: "Scalable Cloud-Native", desc: "Microservices, containers & serverless elasticity", icon: "☁️" },
        { title: "Secure Integration", desc: "API-first, zero trust, encryption at scale", icon: "🔒" },
        { title: "Reusable Shared Services", desc: "Common capabilities reused globally to accelerate delivery", icon: "⚙️" },
      ];
  chars.forEach((ch, i) => {
    const chx = 28 + i * 252;
    const html = `<table style="width:100%;height:100%;"><tr><td style="width:20px;text-align:center;"><span style="font-size:12px;">${ch.icon}</span></td><td style="text-align:left;padding-left:4px;"><div style="font-size:7px;font-weight:800;color:#14532D;">${ch.title}</div><div style="font-size:8px;color:#64748B;line-height:1.1;">${ch.desc}</div></td></tr></table>`;
    rect(`ch_pod_${i}`, html, chx, 842, 244, 32, "rounded=1;fillColor=#FFFFFF;strokeColor=#BBF7D0;");
  });

  // =========================================================================
  // 9. EXPLICIT ARROWS & CONNECTORS (Exact match to images/08.png)
  // =========================================================================

  // 1. Top Primary Users <-> Layer A (8 double-headed blue arrows)
  for (let i = 0; i < 8; i++) {
    c.push(`<mxCell id="arr_user_to_tierA_${i}" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1D4ED8;strokeWidth=1.5;startArrow=classic;startFill=1;endArrow=classic;endFill=1;exitX=0.5;exitY=1;entryX=${0.07 + i * 0.122};entryY=0;" edge="1" parent="1" source="user_pod_${i}" target="ly_box_A"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  }

  // 2. Left SORs <-> Central Platform (7 double-headed blue horizontal arrows)
  c.push(`<mxCell id="arr_sor_0_to_lyA" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1D4ED8;strokeWidth=1.5;startArrow=classic;startFill=1;endArrow=classic;endFill=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="sor_card_0" target="ly_box_A"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  c.push(`<mxCell id="arr_sor_1_to_lyB" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1D4ED8;strokeWidth=1.5;startArrow=classic;startFill=1;endArrow=classic;endFill=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="sor_card_1" target="ly_box_B"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  c.push(`<mxCell id="arr_sor_2_to_lyC" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1D4ED8;strokeWidth=1.5;startArrow=classic;startFill=1;endArrow=classic;endFill=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="sor_card_2" target="ly_box_C"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  c.push(`<mxCell id="arr_sor_3_to_lyD" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1D4ED8;strokeWidth=1.5;startArrow=classic;startFill=1;endArrow=classic;endFill=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="sor_card_3" target="ly_box_D"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  c.push(`<mxCell id="arr_sor_4_to_lyE" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1D4ED8;strokeWidth=1.5;startArrow=classic;startFill=1;endArrow=classic;endFill=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="sor_card_4" target="ly_box_E"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  c.push(`<mxCell id="arr_sor_5_to_lyF" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1D4ED8;strokeWidth=1.5;startArrow=classic;startFill=1;endArrow=classic;endFill=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="sor_card_5" target="ly_box_F"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  c.push(`<mxCell id="arr_sor_6_to_lyG" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1D4ED8;strokeWidth=1.5;startArrow=classic;startFill=1;endArrow=classic;endFill=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="sor_card_6" target="ly_box_G"><mxGeometry relative="1" as="geometry"/></mxCell>`);

  // 3. Central Platform <-> Right External Participants (5 horizontal arrows)
  c.push(`<mxCell id="arr_lyA_to_ext0" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0D9488;strokeWidth=1.5;startArrow=classic;startFill=1;endArrow=classic;endFill=1;exitX=1;exitY=0.5;entryX=0;entryY=0.3;" edge="1" parent="1" source="ly_box_A" target="ext_card_0"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  c.push(`<mxCell id="arr_lyB_to_ext1" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0D9488;strokeWidth=1.5;startArrow=classic;startFill=1;endArrow=classic;endFill=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="ly_box_B" target="ext_card_1"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  c.push(`<mxCell id="arr_lyC_to_ext2" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0D9488;strokeWidth=1.5;dashed=1;dashPattern=5 5;startArrow=classic;startFill=1;endArrow=classic;endFill=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="ly_box_C" target="ext_card_2"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  c.push(`<mxCell id="arr_lyD_to_ext3" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0D9488;strokeWidth=1.5;startArrow=classic;startFill=1;endArrow=classic;endFill=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="ly_box_D" target="ext_card_3"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  c.push(`<mxCell id="arr_lyE_to_ext4" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#0D9488;strokeWidth=1.5;startArrow=classic;startFill=1;endArrow=classic;endFill=1;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="ly_box_E" target="ext_card_4"><mxGeometry relative="1" as="geometry"/></mxCell>`);

  // 4. Inter-Tier Vertical Arrows between Layer Components (A <-> B <-> C <-> D <-> E <-> F <-> G)
  // Layer A <-> B (Synchronous Solid Blue)
  c.push(`<mxCell id="arr_ly_A_to_B_1" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1D4ED8;strokeWidth=1.5;startArrow=classic;startFill=1;endArrow=classic;endFill=1;exitX=0.5;exitY=1;entryX=0.2;entryY=0;" edge="1" parent="1" source="it_A_0" target="it_B_0"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  c.push(`<mxCell id="arr_ly_A_to_B_2" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1D4ED8;strokeWidth=1.5;startArrow=classic;startFill=1;endArrow=classic;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="it_A_1" target="it_B_2"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  c.push(`<mxCell id="arr_ly_A_to_B_3" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1D4ED8;strokeWidth=1.5;startArrow=classic;startFill=1;endArrow=classic;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="it_A_3" target="it_B_4"><mxGeometry relative="1" as="geometry"/></mxCell>`);

  // Layer B <-> C (Synchronous Solid Blue)
  c.push(`<mxCell id="arr_ly_B_to_C_1" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1D4ED8;strokeWidth=1.5;startArrow=classic;startFill=1;endArrow=classic;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="it_B_0" target="it_C_0"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  c.push(`<mxCell id="arr_ly_B_to_C_2" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1D4ED8;strokeWidth=1.5;startArrow=classic;startFill=1;endArrow=classic;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="it_B_3" target="it_C_1"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  c.push(`<mxCell id="arr_ly_B_to_C_3" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#1D4ED8;strokeWidth=1.5;startArrow=classic;startFill=1;endArrow=classic;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="it_B_4" target="it_C_3"><mxGeometry relative="1" as="geometry"/></mxCell>`);

  // Layer C <-> D (AI & Knowledge Purple Dashed)
  c.push(`<mxCell id="arr_ly_C_to_D_1" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#7C3AED;strokeWidth=1.5;dashed=1;dashPattern=4 4;startArrow=classic;startFill=1;endArrow=classic;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="it_C_0" target="it_D_0"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  c.push(`<mxCell id="arr_ly_C_to_D_2" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#7C3AED;strokeWidth=1.5;dashed=1;dashPattern=4 4;startArrow=classic;startFill=1;endArrow=classic;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="it_C_4" target="it_D_2"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  c.push(`<mxCell id="arr_ly_C_to_D_3" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#7C3AED;strokeWidth=1.5;dashed=1;dashPattern=4 4;startArrow=classic;startFill=1;endArrow=classic;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="it_C_5" target="it_D_4"><mxGeometry relative="1" as="geometry"/></mxCell>`);

  // Layer D <-> E (AI & Knowledge Purple Dashed / Blue)
  c.push(`<mxCell id="arr_ly_D_to_E_1" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#7C3AED;strokeWidth=1.5;dashed=1;dashPattern=4 4;startArrow=classic;startFill=1;endArrow=classic;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="it_D_0" target="it_E_0"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  c.push(`<mxCell id="arr_ly_D_to_E_2" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#7C3AED;strokeWidth=1.5;dashed=1;dashPattern=4 4;startArrow=classic;startFill=1;endArrow=classic;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="it_D_3" target="it_E_3"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  c.push(`<mxCell id="arr_ly_D_to_E_3" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#7C3AED;strokeWidth=1.5;dashed=1;dashPattern=4 4;startArrow=classic;startFill=1;endArrow=classic;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="it_D_4" target="it_E_4"><mxGeometry relative="1" as="geometry"/></mxCell>`);

  // Layer E <-> F (Async Event Orange Dashed)
  c.push(`<mxCell id="arr_ly_E_to_F_1" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#EA580C;strokeWidth=1.5;dashed=1;dashPattern=6 4;startArrow=classic;startFill=1;endArrow=classic;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="it_E_0" target="it_F_0"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  c.push(`<mxCell id="arr_ly_E_to_F_2" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#EA580C;strokeWidth=1.5;dashed=1;dashPattern=6 4;startArrow=classic;startFill=1;endArrow=classic;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="it_E_1" target="it_F_1"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  c.push(`<mxCell id="arr_ly_E_to_F_3" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#EA580C;strokeWidth=1.5;dashed=1;dashPattern=6 4;startArrow=classic;startFill=1;endArrow=classic;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="it_E_3" target="it_F_2"><mxGeometry relative="1" as="geometry"/></mxCell>`);

  // Layer F <-> G (Cross-cutting / Control Slate Dashed)
  c.push(`<mxCell id="arr_ly_F_to_G_1" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#475569;strokeWidth=1.5;startArrow=classic;startFill=1;endArrow=classic;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="it_F_0" target="it_G_0"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  c.push(`<mxCell id="arr_ly_F_to_G_2" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#475569;strokeWidth=1.5;startArrow=classic;startFill=1;endArrow=classic;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="it_F_2" target="it_G_3"><mxGeometry relative="1" as="geometry"/></mxCell>`);
  c.push(`<mxCell id="arr_ly_F_to_G_3" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeColor=#475569;strokeWidth=1.5;startArrow=classic;startFill=1;endArrow=classic;endFill=1;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="it_F_4" target="it_G_4"><mxGeometry relative="1" as="geometry"/></mxCell>`);

  return `<mxfile host="embed.diagrams.net">
  <diagram id="template_08_component_arch" name="08 — Component Architecture">
    <mxGraphModel dx="1600" dy="900" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1560" pageHeight="900" background="${bg}" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        ${c.join("\n        ")}
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
