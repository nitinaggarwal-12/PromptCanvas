import { applyBlueprintSemanticIcons } from './blueprintSemanticIcons';

/**
 * 🏷️ Injects active Use-Case domain flavor (e.g. Prior Authorization, ITACS Oncology, Claims Engine)
 * into all titles, subtitles, headers, and component nodes across Technical & Business diagrams.
 * Prevents generic boilerplate titles in technical design documents.
 */
export function injectUseCaseFlavor(xml: string, useCaseTitle: string, userPrompt?: string): string {
  if (!xml || typeof xml !== 'string') return xml;

  let topic = useCaseTitle ? useCaseTitle.trim() : '';

  // Dynamically extract clean 2-4 word topic string from userPrompt or useCaseTitle
  if (!topic || topic === 'Architecture' || topic === 'Clean Architecture Workspace' || topic.toLowerCase().includes('act as')) {
    const rawText = userPrompt || topic;
    const cleanPrompt = rawText
      .replace(/\b(act as|chief|enterprise|architect|and|pharma|technology|lead|at|we|are|building|a|generative|ai|platform|to|automate|scientific|literature|mining|accelerate|therapeutic|target|discovery|for|non-small|cell|lung|cancer|design|build|create|system|architecture|diagram)\b/gi, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    const words = cleanPrompt.split(' ').filter(w => w.length > 2).slice(0, 4);
    topic = words.length > 0 
      ? words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ')
      : 'Enterprise Platform';
  }




  const topicUpper = topic.toUpperCase();

  let updatedXml = xml.replace(/&amp;amp;(?:amp;)*/g, '&amp;');

  // Dynamic Domain-Aware Topology Flavoring across all technical reference diagrams
  // Extract clean short brand name (1-2 words) for subtle branding without repeating full 50-char diagram title everywhere
  let topicClean = (topic || 'Enterprise').trim();
  if (topicClean.includes('\n') || topicClean.includes('**') || topicClean.startsWith('-')) {
    const firstLine = topicClean.split('\n')[0].replace(/^[-*#\s]+/, '').replace(/[*_]/g, '').replace(/:\s*$/, '').trim();
    topicClean = firstLine.length > 3 && firstLine.length < 50 ? firstLine : 'Enterprise System';
  }
  if (topicClean.length > 55) {
    topicClean = topicClean.slice(0, 52) + '...';
  }
  const brandWords = topicClean.split(' ').filter(w => w.length > 2);
  const shortBrand = brandWords.length > 0 ? brandWords[0] : 'Enterprise';
  const shortBrandUpper = shortBrand.toUpperCase();

  const escapeXml = (s: string) => (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const topicCleanXml = escapeXml(topicClean);
  const topicCleanUpperXml = escapeXml(topicClean.toUpperCase());
  const shortBrandXml = escapeXml(shortBrand);
  const shortBrandUpperXml = escapeXml(shortBrandUpper);

  // Universal Title & Use Case Header Injection across ALL diagrams
  updatedXml = updatedXml
    .replace(/(&lt;span[^>]*&gt;\s*❖?\s*USE CASE:\s*&lt;\/span&gt;)[^<]+/gi, `$1 ${topicCleanXml}`)
    .replace(/(<span[^>]*>\s*❖?\s*USE CASE:\s*<\/span>)[^<]+/gi, `$1 ${topicCleanXml}`)
    .replace(/(❖\s*USE CASE:\s*)[^<"&]+/gi, `$1${topicCleanXml}`)
    .replace(/(\bUSE CASE:\s*)[^<"&]+/gi, `$1${topicCleanXml}`)
    .replace(/(\bSYSTEM CONTEXT:\s*)[^<"&]+/gi, `$1${topicCleanXml}`)
    .replace(/BUSINESS PROCESS \/ SWIMLANE — [^<"&]+/gi, `BUSINESS PROCESS / SWIMLANE — ${topicCleanUpperXml}`)
    .replace(/BUSINESS PROCESS \/ SWIMLANE — [^<"]+/gi, `BUSINESS PROCESS / SWIMLANE — ${topicCleanUpperXml}`)
    .replace(/SYNACTIVE SMART GRID &amp; INDUSTRIAL IOT/gi, topicCleanUpperXml)
    .replace(/OMNIVUE RETAIL &amp; SUPPLY CHAIN/gi, topicCleanUpperXml)
    .replace(/NEXUSFIN WEALTH &amp; PAYMENTS/gi, topicCleanUpperXml)
    .replace(/ENTERPRISE ARCHITECTURE PLATFORM/gi, topicCleanUpperXml)
    .replace(/SYNACTIVE/gi, shortBrandUpperXml)
    .replace(/OMNIVUE/gi, shortBrandUpperXml)
    .replace(/NEXUSFIN/gi, shortBrandUpperXml)
    .replace(/Enterprise Governed Agentic AI Platform/gi, topicCleanXml)
    .replace(/Enterprise Technical System View/gi, `${topicCleanXml} System View`)
    .replace(/Enterprise DevSecOps Polyrepo CI\/CD Pipeline/gi, `${topicCleanXml} DevSecOps CI/CD Pipeline`)
    .replace(/The Operational Flow/gi, `${topicCleanXml} Operational Flow`)
    .replace(/Total Unified System View/gi, `${topicCleanXml} Total Unified System View`)
    .replace(/Enterprise Event-Driven Microservices Architecture/gi, `${topicCleanXml} Event-Driven Architecture`)
    .replace(/MODERN DATA STACK ARCHITECTURE BLUEPRINT/gi, `${topicCleanUpperXml} MODERN DATA STACK ARCHITECTURE`)
    .replace(/Agentic AI Harness/gi, topicCleanXml)
    .replace(/Production Reference Flow: Secure Ingress → Intent Fork → 3-Lane Parallel Execution → Gemini Reasoning → Closed Loop/gi, `${topicCleanXml} Reference Architecture Flow`)
    .replace(/Agent Harness Runtime Platform/gi, `${topicCleanXml} Agent Harness Runtime Platform`)
    .replace(/Enterprise Document Lake/gi, `[1] ${shortBrandXml} Document &amp; Telemetry Lake`)
    .replace(/Order &amp;amp; Checkout Microservices Pods/gi, `[1.1] ${shortBrandXml} Ingress Pods`)
    .replace(/Order &amp; Checkout Microservices Pods/gi, `[1.1] ${shortBrandXml} Ingress Pods`)
    .replace(/Production Operational OLTP Core/gi, `[1.1] ${shortBrandXml} DB Core`)
    .replace(/Ingress &amp;amp; Perimeter/gi, `${shortBrandXml} Ingress &amp;amp; Perimeter`)
    .replace(/Ingress &amp; Perimeter/gi, `${shortBrandXml} Ingress &amp; Perimeter`)
    .replace(/IoT Devices &amp; App Telemetry/gi, `IoT &amp; ${shortBrandXml} Telemetry`)
    .replace(/Route 53 DNS &amp; AWS WAF/gi, `Route 53 (${shortBrandXml} Ingress)`)
    .replace(/Batch &amp; Streaming Sources/gi, `Batch &amp; ${shortBrandXml} Streams`)
    .replace(/Cloud DNS &amp; Cloud CDN/gi, `Cloud DNS (${shortBrandXml} Edge)`)
    .replace(/Polyrepo Git Commits/gi, `${shortBrandXml} Git Commits`)
    .replace(/Cloud Run UI \(Private App Subnet\)/gi, `Cloud Run (${shortBrandXml} UI)`)
    .replace(/Cloud Run API Microservices/gi, `Cloud Run (${shortBrandXml} API)`)
    .replace(/Cloud SQL HA PostgreSQL/gi, `Cloud SQL (${shortBrandXml} DB)`)
    .replace(/Static Media Lake &amp; Private Assets/gi, `${shortBrandXml} Storage Lake`)
    .replace(/MQTT \/ HTTPS Edge Ingestion Gateway/gi, `[1] ${shortBrandXml} Edge Ingestion`)
    .replace(/Pub\/Sub High-Throughput Ingestion Topics/gi, `[2] ${shortBrandXml} Pub/Sub Topics`)
    .replace(/Frontend Envoy Mesh Pods/gi, `[1] ${shortBrandXml} Ingress Pods`)
    .replace(/Core API Business Logic Pods/gi, `[2] ${shortBrandXml} Core API Pods`)
    .replace(/Bronze Tier Raw Data Bucket/gi, `[3] Bronze (${shortBrandXml} Raw)`)
    .replace(/Gold Tier Curated Delta Lake/gi, `[5] Gold (${shortBrandXml} Metrics)`)
    .replace(/Vertex AI Matching Engine/gi, `[3] Vertex AI (${shortBrandXml} Vectors)`)
    .replace(/Gemini 1\.5 Pro Reasoning Agent/gi, `[4] Gemini (${shortBrandXml} AI Core)`)
    .replace(/Primary Application Cluster/gi, `[8] ${shortBrandXml} Cluster`)
    .replace(/Source Code Repository/gi, `[1] ${shortBrandXml} Polyrepo`)
    .replace(/Polyrepo Git Source/gi, `[1] ${shortBrandXml} Polyrepo`)
    .replace(/PostgreSQL \/ MySQL OLTP Core/gi, `[1] ${shortBrandXml} OLTP DB`)
    .replace(/Order &amp; Checkout Microservice/gi, `[1] ${shortBrandXml} Microservice`)
    .replace(/Multi-Modal Ingress &amp; Routing Gateway/gi, `[1] ${shortBrandXml} Gateway`)
    .replace(/FastAPI REST API Microservice/gi, `${shortBrandXml} API Service`)
    .replace(/Next\.js Frontend Web Application/gi, `${shortBrandXml} Web Portal`)
    .replace(/Cloud Run \(FastAPI Backend API\)/gi, `Cloud Run (${shortBrandXml} API)`)
    .replace(/Cloud Run \(Frontend SSR Microservice\)/gi, `Cloud Run (${shortBrandXml} UI)`)
    .replace(/Cloud SQL PostgreSQL 15/gi, `Cloud SQL (${shortBrandXml} DB)`)
    .replace(/REAL-TIME STREAMING &amp; EVENT-DRIVEN ENTERPRISE/gi, topicCleanUpperXml)
    .replace(/REAL-TIME STREAMING & EVENT-DRIVEN ENTERPRISE/gi, topicCleanUpperXml)
    .replace(/MODERN DATA LAKEHOUSE &amp; DATA MESH/gi, topicCleanUpperXml)
    .replace(/MODERN DATA LAKEHOUSE & DATA MESH/gi, topicCleanUpperXml)
    .replace(/ENTERPRISE GENAI &amp; MULTI-AGENT PLATFORM/gi, topicCleanUpperXml)
    .replace(/ENTERPRISE GENAI & MULTI-AGENT PLATFORM/gi, topicCleanUpperXml)
    .replace(/ZERO-TRUST CYBERSECURITY &amp; SOC PLATFORM/gi, topicCleanUpperXml)
    .replace(/ZERO-TRUST CYBERSECURITY & SOC PLATFORM/gi, topicCleanUpperXml)
    .replace(/ENTERPRISE API, INTEGRATION &amp; MCP GATEWAY/gi, topicCleanUpperXml)
    .replace(/ENTERPRISE API, INTEGRATION & MCP GATEWAY/gi, topicCleanUpperXml)
    .replace(/ENTERPRISE KUBERNETES &amp; PLATFORM ENGINEERING/gi, topicCleanUpperXml)
    .replace(/ENTERPRISE KUBERNETES & PLATFORM ENGINEERING/gi, topicCleanUpperXml)
    .replace(/Medallion Architecture/gi, `${topicCleanXml} Medallion Architecture`)
    .replace(/Raw Telemetry &amp; Field Ingestion/gi, `${topicCleanXml} Raw Telemetry &amp; Ingestion`)
    .replace(/Vertex AI Vector Search &amp; Reasoning Core/gi, `${topicCleanXml} Vertex AI Reasoning Core`);

  const isMedicineMfg = /medicine|pharma.*(?:plant|manufactur|design)|drug.*(?:plant|manufactur|design)|cleanroom|gxp|bioreactor|batch recipe/i.test(topicClean + ' ' + (userPrompt || ''));
  const isManufacturing = /manufactur|iot|scada|factory|sensor|twin|synactive|telemetry|plcs|opc|industrial/i.test(topicClean + ' ' + (userPrompt || ''));
  const isSupplyChain = /supply|logistics|warehouse|quantumflow|fleet|inventory|chain|drone/i.test(topicClean + ' ' + (userPrompt || ''));

  if (isMedicineMfg) {
    updatedXml = updatedXml
      .replace(/Smart Manufacturing &amp; Industrial IoT/gi, 'Pharmaceutical &amp; Medicine Manufacturing IT Platform')
      .replace(/Smart Manufacturing & Industrial IoT/gi, 'Pharmaceutical & Medicine Manufacturing IT Platform')
      .replace(/SHOP FLOOR \/\s*<br\s*\/?>OT CHANNELS/gi, 'CLEANROOM &amp;<br/>SHOP FLOOR OT')
      .replace(/Machines &amp; CNC/gi, 'Sterile Bioreactors &amp; Isolators')
      .replace(/Machines & CNC/gi, 'Sterile Bioreactors & Isolators')
      .replace(/Sensors &amp; IoT/gi, 'Cleanroom IoT Sensors')
      .replace(/Sensors & IoT/gi, 'Cleanroom IoT Sensors')
      .replace(/Quality Inspection/gi, 'GxP Analytical Testing')
      .replace(/Batch Recipe Mgmt/gi, 'Electronic Batch Records (EBR)')
      .replace(/Work Orders/gi, 'GxP Batch Dispensing')
      .replace(/Asset Maintenance/gi, 'Sterilization &amp; Calibration')
      .replace(/Fraud<br\s*\/?>Detection/gi, 'Batch Yield<br/>Optimization')
      .replace(/Order<br\s*\/?>Processing/gi, 'GxP Batch<br/>Release Engine')
      .replace(/Customer<br\s*\/?>360/gi, 'Cleanroom<br/>Environmental Sync')
      .replace(/Real-Time<br\s*\/?>Personalization/gi, 'Sterile Plant<br/>Digital Twin')
      .replace(/Industrial<br\s*\/?>Telemetry/gi, 'Bioreactor SCADA<br/>Historian Mesh')
      .replace(/End-to-end industrial IoT intelligence connecting plant floor OT telemetry to cloud AI, MES, and predictive analytics on Google Cloud\./gi, 'End-to-end pharmaceutical manufacturing IT architecture connecting cleanroom OT telemetry, GxP MES, and AI batch analytics on Google Cloud.');
  } else if (isManufacturing) {
    updatedXml = updatedXml
      .replace(/Fraud<br\s*\/?>Detection/gi, 'Factory Floor<br/>OEE')
      .replace(/Order<br\s*\/?>Processing/gi, 'Predictive<br/>Maintenance')
      .replace(/Customer<br\s*\/?>360/gi, 'Robotic Arm<br/>Telemetry')
      .replace(/Real-Time<br\s*\/?>Personalization/gi, 'Digital Twin<br/>Sync')
      .replace(/Supply Chain<br\s*\/?>Visibility/gi, 'Plant Supply<br/>Logistics')
      .replace(/Industrial<br\s*\/?>Telemetry/gi, 'Industrial<br/>SCADA Mesh')
      .replace(/Scalable • Event-Driven • Low-Latency • Resilient • Governed/gi, 'Smart Factory • Industrial IoT • Real-Time SCADA • Digital Twin • Governed')
      .replace(/Web &amp; Mobile Applications/gi, 'Smart Factory Floor &amp; Mobile Scanners')
      .replace(/Web & Mobile Applications/gi, 'Smart Factory Floor & Mobile Scanners')
      .replace(/Microservices &amp; Backend APIs/gi, 'PLC Controllers &amp; SCADA Historians')
      .replace(/Microservices & Backend APIs/gi, 'PLC Controllers & SCADA Historians')
      .replace(/IoT, Connected Devices &amp; Edge/gi, 'Industrial IoT Sensors &amp; Robotics Edge')
      .replace(/IoT, Connected Devices & Edge/gi, 'Industrial IoT Sensors & Robotics Edge')
      .replace(/Third-Party SaaS &amp; B2B Partners/gi, 'MES, ERP &amp; Supply Chain Integrations')
      .replace(/Third-Party SaaS & B2B Partners/gi, 'MES, ERP & Supply Chain Integrations')
      .replace(/Customer &amp; Account Master/gi, 'Plant Floor Asset Master &amp; Digital Twin')
      .replace(/Customer & Account Master/gi, 'Plant Floor Asset Master & Digital Twin')
      .replace(/Order &amp; Billing Ledger/gi, 'MES Production Orders &amp; Work-in-Progress')
      .replace(/Order & Billing Ledger/gi, 'MES Production Orders & Work-in-Progress')
      .replace(/Transaction &amp; Ledger Events/gi, 'Sensor Telemetry &amp; SCADA Streams')
      .replace(/Transaction & Ledger Events/gi, 'Sensor Telemetry & SCADA Streams')
      .replace(/\[1\] On-Premises Data Center/g, `[1] Smart Factory Floor (OT Network)`)
      .replace(/Enterprise Hybrid Connectivity/g, `Industrial IoT &amp; OPC-UA Gateways`)
      .replace(/\[2\] Google Global HTTP\(S\) LB/g, `[2] Factory Edge Gateway &amp; Load Balancer`)
      .replace(/Intelligent Traffic Routing/g, `Real-Time Telemetry &amp; Sensor Routing`)
      .replace(/\[3\] Cloud Interconnect/g, `[3] Dedicated OT-to-Cloud Interconnect`)
      .replace(/\[4\] Cloud Armor WAF/g, `[4] Industrial Perimeter &amp; WAF Gate`)
      .replace(/\[5\] Primary Shared VPC Network/g, `[5] Governed Smart Factory Cloud VPC`)
      .replace(/\[7\] DR Shared VPC Network/g, `[7] Standby Secondary Factory VPC`)
      .replace(/\[8\] Primary GKE Cluster/g, `[8] Digital Twin &amp; Edge Analytics (GKE)`)
      .replace(/Multi-Zone Application Deployment/g, `Real-Time OEE &amp; Vision Inspection`)
      .replace(/\[9\] DR GKE Cluster/g, `[9] Standby Plant Operations (GKE)`)
      .replace(/\[10\] Primary Cloud SQL/g, `[10] MES Operational Ledger (Cloud SQL)`)
      .replace(/\[11\] DR Cloud SQL/g, `[11] Replicated MES Ledger (Cloud SQL)`)
      .replace(/\[12\] DR Failover Orchestration/g, `[12] Autonomous Plant Failover Controller`);
  } else if (isSupplyChain) {
    updatedXml = updatedXml
      .replace(/\[1\] On-Premises Data Center/g, `[1] Regional Logistics &amp; Warehouse Hubs`)
      .replace(/Enterprise Hybrid Connectivity/g, `Real-Time Telemetry &amp; Fleet Connectivity`)
      .replace(/\[2\] Google Global HTTP\(S\) LB/g, `[2] Global Ingress &amp; Routing Load Balancer`)
      .replace(/Intelligent Traffic Routing/g, `Autonomous Supply Flow Routing`)
      .replace(/\[3\] Cloud Interconnect/g, `[3] Dedicated 10Gbps Fleet Depot Link`)
      .replace(/\[4\] Cloud Armor WAF/g, `[4] Edge Security &amp; WAF Gate`)
      .replace(/\[5\] Primary Shared VPC Network/g, `[5] Primary Governed Supply Chain VPC`)
      .replace(/\[7\] DR Shared VPC Network/g, `[7] Failover DR Supply Chain VPC`)
      .replace(/\[8\] Primary GKE Cluster/g, `[8] Primary Orchestrator Cluster (GKE)`)
      .replace(/Multi-Zone Application Deployment/g, `Autonomous Inventory &amp; Order Routing`)
      .replace(/\[9\] DR GKE Cluster/g, `[9] Failover Orchestrator Cluster (GKE)`)
      .replace(/DR Region Disaster Recovery Apps/g, `Standby Regional Supply Chain Engine`)
      .replace(/\[10\] Primary Cloud SQL/g, `[10] Primary Operational Ledger DB (Cloud SQL)`)
      .replace(/\[11\] DR Cloud SQL/g, `[11] Replicated DR Ledger DB (Cloud SQL)`)
      .replace(/\[12\] DR Failover Orchestration/g, `[12] Autonomous Logistics Failover Controller`)
      .replace(/\[1\] GitHub \/ GitLab Polyrepo/g, `[1] Source Code Repository (Polyrepo)`)
      .replace(/\[2\] Webhook Pipeline Trigger/g, `[2] Automated Order Dispatcher`)
      .replace(/\[3\] Cloud Build Runner/g, `[3] Automated CI\/CD Test Runner`)
      .replace(/\[4\] SonarQube &amp; Snyk SAST/g, `[4] Compliance &amp; SAST Audit Gate`)
      .replace(/\[5\] Docker Container Compiler/g, `[5] Multi-Arch Container Builder`)
      .replace(/\[6\] Artifact Registry Scanner/g, `[6] Artifact Registry &amp; Scanner`)
      .replace(/\[7\] ArgoCD \/ Flux Controller/g, `[7] GitOps Continuous Deployment`)
      .replace(/\[8\] Staging GKE Cluster/g, `[8] Production Kubernetes Cluster`);
  } else {
    updatedXml = updatedXml
      .replace(/\[1\] On-Premises Data Center/g, `[1] Enterprise Core Facility`)
      .replace(/\[2\] Google Global HTTP\(S\) LB/g, `[2] Global Traffic Load Balancer`)
      .replace(/\[4\] Cloud Armor WAF/g, `[4] Edge Security &amp; WAF Gate`)
      .replace(/\[5\] Primary Shared VPC Network/g, `[5] Primary Governed VPC Network`)
      .replace(/\[7\] DR Shared VPC Network/g, `[7] Failover DR VPC Network`)
      .replace(/\[8\] Primary GKE Cluster/g, `[8] Primary Application Cluster (GKE)`)
      .replace(/\[9\] DR GKE Cluster/g, `[9] Failover Application Cluster (GKE)`)
      .replace(/\[10\] Primary Cloud SQL/g, `[10] Primary Operational Database (SQL)`)
      .replace(/\[11\] DR Cloud SQL/g, `[11] Replicated DR Database (SQL)`)
      .replace(/\[12\] DR Failover Orchestration/g, `[12] Automated Failover Controller`)
      .replace(/\[1\] GitHub \/ GitLab Polyrepo/g, `[1] Polyrepo Source Repository`)
      .replace(/\[2\] Webhook Pipeline Trigger/g, `[2] Automated Event Trigger`)
      .replace(/\[3\] Cloud Build Runner/g, `[3] Automated Build &amp; Test Runner`)
      .replace(/\[4\] SonarQube &amp; Snyk SAST/g, `[4] SAST &amp; Security Compliance Gate`)
      .replace(/\[5\] Docker Container Compiler/g, `[5] Container Image Builder`)
      .replace(/\[6\] Artifact Registry Scanner/g, `[6] Registry &amp; Vulnerability Scanner`)
      .replace(/\[7\] ArgoCD \/ Flux Controller/g, `[7] GitOps Deployment Controller`)
      .replace(/\[8\] Staging GKE Cluster/g, `[8] Live Production Application Cluster`);
  }

  const topicXml = escapeXml(topic || 'Enterprise');
  const topicUpperXml = escapeXml((topic || 'Enterprise').toUpperCase());

  // 1. Replace generic titles, ITACS, and Oncology headers
  updatedXml = updatedXml
    .replace(/\[STAGE 1\]\s*ONCOLOGY DATA PORTAL/gi, `[STAGE 1] ${topicUpperXml} INGESTION PORTAL`)
    .replace(/ONCOLOGY DATA PORTAL/gi, `${topicUpperXml} INGESTION PORTAL`)
    .replace(/ITACS Oncology Platform Conceptual Diagram/gi, `${topicXml} Conceptual Diagram`)
    .replace(/ITACS Oncology Platform/gi, `${topicXml} Platform`)
    .replace(/Oncology Scenario Planning/gi, `${topicXml} Scenario Planning &amp; Operations`)
    .replace(/Oncology Trends/gi, `${topicXml} Trends`)
    .replace(/Oncology Analyst/gi, `${topicXml} Operations User`)
    .replace(/Dim_Oncology_Product/gi, `Dim_${topicClean.replace(/[^a-zA-Z0-9]/g, '_')}_Catalog`)
    .replace(/Fact_Oncology_Insights/gi, `Fact_${topicClean.replace(/[^a-zA-Z0-9]/g, '_')}_Transactions`)
    .replace(/PubMed PDF (?:&amp;|&amp;amp;|&) PPT Chunking Engine/gi, `${topicXml} Data &amp; Stream Processing Engine`)
    .replace(/ITACS Integrated Insights Platform - TOTAL UNIFIED SYSTEM VIEW: Data, Cognition, Deployment, (?:&amp;|&amp;amp;) Governance \(End-to-End without Compromise\)\./g, `${topicXml} - TOTAL UNIFIED SYSTEM VIEW: Data, Cognition, Deployment, &amp; Governance`)
    .replace(/ITACS Integrated Insights Platform - TOTAL UNIFIED SYSTEM VIEW/g, `${topicXml} - TOTAL UNIFIED SYSTEM VIEW`)
    .replace(/ITACS SECURE GOVERNED CLOUD TENANT/g, `${topicUpperXml} SECURE GOVERNED CLOUD TENANT`)
    .replace(/ITACS Integrated Insights Platform/g, `${topicXml} Platform`)
    .replace(/AWS Modern Data Lakehouse Architecture/g, `${topicXml} - AWS Data Lakehouse Architecture`)
    .replace(/GCP Serverless Web Application Architecture/g, `${topicXml} - GCP Serverless Architecture`)
    .replace(/AWS EKS Microservices Service Mesh Architecture/g, `${topicXml} - EKS Microservices Mesh`)
    .replace(/GCP Real-Time Streaming Analytics Pipeline/g, `${topicXml} - Streaming Analytics Pipeline`)
    .replace(/Combining Data Flow \(DFD\), MLOps Lifecycle, and Feature Engineering/g, `${topicXml} - Data &amp; AI Pipeline`)
    .replace(/Google Cloud Project \(ITACS Platform Production\)/g, `${topicCleanXml} Production Cloud Architecture`)
    .replace(/AWS Serverless Event-Driven Microservices/g, `${topicCleanXml} - Event-Driven Microservices`)
    .replace(/GCP Multi-Region Active-Passive Disaster Recovery/g, `${topicCleanXml} - Multi-Region DR Topology`)
    .replace(/GCP AI Cognitive Architecture \(Retrieval-Augmented Generation \/ RAG\)/g, `${topicCleanXml} - AI Agentic RAG Architecture`)
    .replace(/AWS Zero-Trust Secure VPC Network Infrastructure/g, `${topicCleanXml} - Zero-Trust Secure VPC Network`)
    .replace(/GCP Industrial IoT Telemetry Ingestion &amp; Analytics/g, `${topicCleanXml} - Industrial IoT Ingestion &amp; Analytics`)
    .replace(/Enterprise DevSecOps Polyrepo CI\/CD Pipeline Architecture/g, `${topicCleanXml} - DevSecOps Polyrepo CI/CD Pipeline`)
    .replace(/UNIFIED GOVERNANCE &amp; STATE-MACHINE LIFECYCLE/g, `${shortBrandUpperXml} UNIFIED GOVERNANCE &amp; STATE-MACHINE LIFECYCLE`)
    .replace(/TOTAL UNIFIED SYSTEM VIEW: Data, Cognition, Deployment, (?:&amp;|&amp;amp;) Governance/g, `${shortBrandUpperXml} TOTAL UNIFIED SYSTEM VIEW`)
    .replace(/COMPLETE END-TO-END DYNAMIC SEQUENCE DIAGRAM/g, `${shortBrandUpperXml} COMPLETE END-TO-END DYNAMIC SEQUENCE DIAGRAM`)
    .replace(/ITACS Governing Cloud Tenant/g, `${shortBrandUpperXml} Governing Cloud Tenant`)
    .replace(/ITACS Primary VPC Network/g, `Primary Governed VPC Network`)
    .replace(/ITACS Agent Orchestrator/g, `Core Agent Orchestrator (GKE Pod)`)
    .replace(/Core ITACS Synthesis Engine/g, `Core AI Synthesis Engine`)
    .replace(/ITACS SECURE MANAGED/g, `${topicUpperXml} SECURE MANAGED`)
    .replace(/ITACS Target/g, `${topicXml} Target`)
    .replace(/Review Drug Launch Strategy/gi, `Review ${topicXml} Operational Strategy`)
    .replace(/Alert ID: #T-731/gi, `Alert ID: #OPS-101`)
    .replace(/Competitor X/gi, `Primary Arterial Corridor`)
    .replace(/Competitor Y/gi, `Secondary Traffic Channel`)
    .replace(/Q3 Launch/gi, `Optimal Flow`)
    .replace(/Phase 2b/gi, `Active`)
    .replace(/Q1 Market Lead/gi, `Peak Efficiency`)
    .replace(/Launch Readiness/gi, `System Readiness`)
    .replace(/Phase 3/gi, `Operational`)
    .replace(/Real-time KPIs/gi, `Live Telemetry KPIs`)
    .replace(/PubMed/gi, `${topicXml} API`)
    .replace(/Oncology/gi, topicXml || 'Enterprise')
    .replace(/ITACS/gi, topicXml || 'Enterprise')
    .replace(/CLINICAL AI BIO-PHARMA PRODUCT/gi, topicCleanUpperXml)
    .replace(/NOVACURA BIO-PHARMA PRODUCT/gi, topicCleanUpperXml)
    .replace(/NOVACURA BIO-PHARMA/gi, `${shortBrandUpperXml} PLATFORM`)
    .replace(/Transforming Therapies\. Improving Lives\./gi, `${shortBrandXml} Autonomous Cloud Architecture`)
    .replace(/&amp;amp;/g, '&amp;');

  // 1a. Smart Prompt Component Hydration (Notebooks, Spanner, PubSub, Vector Search, etc.)
  const promptLower = ((userPrompt || '') + ' ' + (useCaseTitle || '')).toLowerCase();
  if (/notebook|workbench|colab|jupyter/i.test(promptLower)) {
    updatedXml = updatedXml
      .replace(/Vertex AI Reasoning Engine/gi, 'Vertex AI Reasoning Engine &amp; Gemini Notebooks (Workbench)')
      .replace(/Developer &amp; Platform Engineers/gi, 'Data Scientists, ML Engineers &amp; Gemini Notebooks')
      .replace(/Developer Workstations/gi, 'Vertex AI Gemini Notebooks &amp; Workstations')
      .replace(/Cloud Shell \/ Workstations/gi, 'Gemini Enterprise Notebooks (Vertex AI Workbench)')
      .replace(/Platform Engineering Portal/gi, 'Gemini Notebooks &amp; AI Platform Portal')
      .replace(/Data Science Workstation/gi, 'Vertex AI Gemini Enterprise Notebooks (Workbench)');
  }
  if (/spanner|truetime|active-active/i.test(promptLower)) {
    updatedXml = updatedXml
      .replace(/Cloud SQL \((?:DB Core|OLTP|PostgreSQL)[^)]*\)/gi, 'Cloud Spanner (Global TrueTime Active-Active)')
      .replace(/PostgreSQL \/ MySQL OLTP Core/gi, 'Cloud Spanner TrueTime Multi-Region Ledger')
      .replace(/Production Operational OLTP Core/gi, 'Cloud Spanner Distributed DB Core')
      .replace(/Cloud SQL PostgreSQL 15/gi, 'Cloud Spanner Multi-Region Instance');
  }
  if (/pubsub|kafka|event mesh|stream/i.test(promptLower)) {
    updatedXml = updatedXml
      .replace(/Cloud Pub\/Sub Topics/gi, 'Cloud Pub/Sub &amp; Kafka Event Stream Mesh')
      .replace(/Batch &amp; Stream Ingestion/gi, 'Pub/Sub Real-Time Streaming Mesh');
  }
  if (/vector|rag|scann|embedding/i.test(promptLower)) {
    updatedXml = updatedXml
      .replace(/Vertex AI Matching Engine/gi, 'Vertex AI Vector Search (ScaNN 768-dim)')
      .replace(/Vector Database/gi, 'Vertex AI Vector Search &amp; Knowledge Graph');
  }

  // 1b. Domain-Neutral Governance Header Metadata (derived directly from topic without regex industry spoofing)
  const dynPersonas = 'System Architect, Platform Engineer';
  const dynStakeholders = 'Architecture Review, Operations SRE';
  const dynDefinition = `${topic || 'Enterprise'} Logical Flow, Service Boundaries &amp; Operational Telemetry`;
  let dynSla = 'SLA: 99.99% Availability | Zero-Trust Perimeter';
  const dynArchName = `${topicClean || 'Enterprise'} Architecture`;

  // 1c. Dynamic CIDR Extraction & Network Topology Hydration Engine
  const cidrMatches = Array.from(((userPrompt || '') + ' ' + (topic || '')).matchAll(/\b(\d{1,3}\.\d{1,3})\.(\d{1,3})\.(\d{1,3})\/(\d{1,2})\b/g));
  if (cidrMatches.length > 0) {
    const octet1_2 = cidrMatches[0][1]; // e.g. "10.240" or "172.16"
    const prefix = cidrMatches[0][4]; // e.g. "16"
    const userVpcCidr = `${octet1_2}.0.0/${prefix}`;
    const userPublicSubnet = `${octet1_2}.1.0/24`;
    const userPubSubSubnet = `${octet1_2}.5.0/24`;
    const userVpcAccess = `${octet1_2}.8.0/28`;
    const userAppSubnet = `${octet1_2}.10.0/24`;
    const userWorkerSubnet = `${octet1_2}.15.0/24`;
    const userDataSubnet = `${octet1_2}.20.0/24`;
    const userDbIp = `${octet1_2}.20.5`;
    const userCacheIp = `${octet1_2}.25.5`;
    const userTenantSubnet = `${octet1_2}.180.1.0/24`;

    updatedXml = updatedXml
      .replace(/10\.128\.0\.0\/16/g, userVpcCidr)
      .replace(/10\.0\.0\.0\/16/g, userVpcCidr)
      .replace(/10\.150\.0\.0\/16/g, userVpcCidr)
      .replace(/10\.170\.0\.0\/16/g, userVpcCidr)
      .replace(/10\.180\.0\.0\/16/g, userVpcCidr)
      .replace(/10\.128\.1\.0\/24/g, userPublicSubnet)
      .replace(/10\.0\.1\.0\/24/g, userPublicSubnet)
      .replace(/10\.150\.1\.0\/24/g, userPublicSubnet)
      .replace(/10\.160\.1\.0\/24/g, userPublicSubnet)
      .replace(/10\.128\.5\.0\/24/g, userPubSubSubnet)
      .replace(/10\.8\.0\.0\/28/g, userVpcAccess)
      .replace(/10\.128\.10\.0\/24/g, userAppSubnet)
      .replace(/10\.0\.10\.0\/24/g, userAppSubnet)
      .replace(/10\.130\.10\.0\/24/g, userAppSubnet)
      .replace(/10\.140\.10\.0\/24/g, userAppSubnet)
      .replace(/10\.150\.10\.0\/24/g, userAppSubnet)
      .replace(/10\.160\.10\.0\/24/g, userAppSubnet)
      .replace(/10\.170\.10\.0\/24/g, userAppSubnet)
      .replace(/10\.180\.10\.0\/24/g, userAppSubnet)
      .replace(/10\.128\.15\.0\/24/g, userWorkerSubnet)
      .replace(/10\.128\.20\.0\/24/g, userDataSubnet)
      .replace(/10\.0\.20\.0\/24/g, userDataSubnet)
      .replace(/10\.150\.20\.0\/24/g, userDataSubnet)
      .replace(/10\.160\.20\.0\/24/g, userDataSubnet)
      .replace(/10\.170\.20\.0\/24/g, userDataSubnet)
      .replace(/10\.128\.20\.5/g, userDbIp)
      .replace(/10\.128\.25\.5/g, userCacheIp)
      .replace(/10\.180\.1\.0\/24/g, userTenantSubnet);

    dynSla = `${dynSla} &amp;nbsp;|&amp;nbsp; &lt;span style='color:#38BDF8;font-weight:bold;'&gt;🔒 VPC CIDR: ${userVpcCidr}&lt;/span&gt;`;
  }

  const dynDefinitionXml = escapeXml(dynDefinition);
  const dynPersonasXml = escapeXml(dynPersonas);
  const dynStakeholdersXml = escapeXml(dynStakeholders);

  const dynamicEnterpriseHeaderHtml = `&lt;table style='width:100%;border-collapse:collapse;color:#FFFFFF;font-family:Helvetica,Arial,sans-serif;padding:2px 8px;table-layout:fixed;'&gt;&lt;tr&gt;&lt;td style='text-align:left;font-size:14px;font-weight:bold;color:#F8FAFC;padding-bottom:5px;border-bottom:1px solid rgba(255,255,255,0.25);width:50%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;'&gt;&lt;span style='color:#38BDF8;margin-right:6px;'&gt;&#10070; USE CASE:&lt;/span&gt;${topicCleanXml}&lt;/td&gt;&lt;td style='text-align:right;font-size:13px;font-weight:bold;color:#F1F5F9;padding-bottom:5px;border-bottom:1px solid rgba(255,255,255,0.25);width:50%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;'&gt;${escapeXml(dynArchName)} &lt;span style='color:#93C5FD;font-weight:normal;'&gt;(v1.0.0)&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style='text-align:left;font-size:11px;color:#CBD5E1;padding-top:5px;width:50%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;'&gt;&lt;b style='color:#E2E8F0;'&gt;Scope:&lt;/b&gt; ${dynDefinitionXml}&lt;/td&gt;&lt;td style='text-align:right;font-size:11px;color:#CBD5E1;padding-top:5px;width:50%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;'&gt;&lt;b style='color:#E2E8F0;'&gt;Personas:&lt;/b&gt; ${dynPersonasXml}&amp;nbsp;&amp;nbsp;|&amp;nbsp;&amp;nbsp;&lt;b style='color:#E2E8F0;'&gt;Stakeholders:&lt;/b&gt; ${dynStakeholdersXml}&amp;nbsp;&amp;nbsp;|&amp;nbsp;&amp;nbsp;&lt;span style='color:#38BDF8;font-weight:bold;'&gt;${dynSla}&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;`;

  updatedXml = updatedXml
    .replace(/(<mxCell\s+id="(?:main_title_bar_uv|main_title_bar|macro_hdr_title|top_header|header_title|main_title|main_title_banner)"\s+value=")[\s\S]*?("\s+style="[^"]*"[^>]*vertex="1"[^>]*>)/gi, `$1${dynamicEnterpriseHeaderHtml}$2`);

  // 2. Domain-Neutral Legacy Template Placeholder Scrubber (zero hardcoded industry/vertical regex spoofing)
  const domainTitle = escapeXml(topic || 'Enterprise');
  const isHealthcareOrPharma = /\b(healthcare|patient|hospital|medical|pharma|oncology|clinical|biotech|drug discovery|clinical trial)\b/i.test(promptLower);
  if (!isHealthcareOrPharma) {
    updatedXml = updatedXml
      .replace(/Legacy SAP S\/4HANA/gi, `${domainTitle} Core Systems &amp; API Ingress`)
      .replace(/Veeva Vault Clinical/gi, `${domainTitle} Data Repository &amp; Storage`)
      .replace(/Ping Identity OAuth 2\.0/gi, `${domainTitle} Zero-Trust Identity &amp; Auth`)
      .replace(/Drug Discovery Cluster/gi, `${domainTitle} Core Processing &amp; AI Engine`)
      .replace(/Clinical Trial &amp; Regulatory Cluster/gi, `${domainTitle} Transaction &amp; Business Logic`)
      .replace(/Commercial &amp; Supply Chain Cluster/gi, `${domainTitle} Analytics &amp; Operations Service`)
      .replace(/On-Prem GxP ERP/g, `${domainTitle} Core ERP &amp; Database Systems`)
      .replace(/eTMF &amp; Submissions Gateway/g, `${domainTitle} Integration Gateway`)
      .replace(/GxP Part 11 Compliance Enforcement/g, `${domainTitle} Security &amp; Compliance Router`)
      .replace(/HIPAA\/PKCE Anonymization/g, `${domainTitle} Data Encryption Vault`)
      .replace(/Vertex AI, SAS 9\.4 Analytics/g, `${domainTitle} Analytics &amp; Reporting Engine`)
      .replace(/HealthLake, Veeva Connect/g, `${domainTitle} Integrations &amp; Connectors`)
      .replace(/SAP Batch Reconciler/g, `${domainTitle} Data Reconciler`)
      .replace(/Genomic Data Lake/g, `${domainTitle} Enterprise Data Lake`)
      .replace(/Clinical Data Warehouse/g, `${domainTitle} Enterprise Data Warehouse`)
      .replace(/PubMed REST API &amp; USPTO Patent Ingest/gi, `${domainTitle} External Data &amp; API Ingress`)
      .replace(/PubMed REST API/gi, `${domainTitle} Data Ingress API`)
      .replace(/PubMed &amp; Patent Data Lake/gi, `${domainTitle} Data Lake`)
      .replace(/NSCLC Clinical Target Repository/gi, `${domainTitle} Data Repository`)
      .replace(/Raw Scientific Literature &amp; PPT Decks/g, `${domainTitle} Data Ingress &amp; Client Docs`)
      .replace(/Manual Data Sources Card/g, `${domainTitle} Ingress Card`)
      .replace(/Market Research/g, 'Client Gateway')
      .replace(/Medical Affairs/g, 'Core Operations')
      .replace(/Market Access/g, 'Integration APIs')
      .replace(/Outcomes Research/g, 'Analytics &amp; Metrics')
      .replace(/Competitive Intelligence/g, 'Business Intelligence')
      .replace(/Researcher Node/g, 'User &amp; Operator Node')
      .replace(/Analyst Workspace Portal/g, `${domainTitle} Application Portal`)
      .replace(/Asset Analysis &amp; Query Interface/g, 'Data Analysis &amp; Query Interface')
      .replace(/Genomic &amp; Clinical Correlation Engine/g, 'Core Business Data Engine')
      .replace(/PubMed PDF &amp; PPT Chunking Engine/g, 'Document &amp; Stream Processing Engine')
      .replace(/Oncology Scenario Planning/gi, `${domainTitle} Scenario Planning &amp; Operations`)
      .replace(/Oncology Analyst/gi, `${domainTitle} Operations Analyst`)
      .replace(/Oncology Trends/gi, 'Performance Trends')
      .replace(/OUTMANEUVER COMPETITION/g, 'OPTIMIZE SYSTEM EFFICIENCY')
      .replace(/REACH PATIENTS FASTER/g, 'ACCELERATE TIME-TO-VALUE')
      .replace(/STRATEGIC PLANNING &amp; ANALYSIS/g, 'ENTERPRISE GOVERNANCE &amp; ANALYTICS')
      .replace(/Dim_Patient/g, `Dim_${shortBrand}_Entity`)
      .replace(/Patient Key/g, 'Entity Key (PK)')
      .replace(/Patient ID/g, 'Entity ID')
      .replace(/Patient Type/g, 'Entity Tier')
      .replace(/Disease History/g, 'Activity History')
      .replace(/Dim_Physician/g, `Dim_${shortBrand}_Service`)
      .replace(/Physician Key/g, 'Service Key (PK)')
      .replace(/Physician ID/g, 'Service ID')
      .replace(/Specialization/g, 'Service Category')
      .replace(/Dim_Payer/g, `Dim_${shortBrand}_Channel`)
      .replace(/Payer Key/g, 'Channel Key (PK)')
      .replace(/Payer ID/g, 'Channel ID')
      .replace(/Payer Name/g, 'Channel Provider')
      .replace(/Fact_Patient_Encounters/g, `Fact_${shortBrand}_Transactions`)
      .replace(/Fact_Oncology_Insights/g, `Fact_${shortBrand}_Insights`)
      .replace(/Fact_Competitive_Intel/g, `Fact_${shortBrand}_Metrics`)
      .replace(/Dim_Oncology_Product/g, `Dim_${shortBrand}_Catalog`)
      .replace(/Dim_Customer_Entity/g, `Dim_${shortBrand}_Entity`)
      .replace(/Dim_Provider_Service/g, `Dim_${shortBrand}_Service`)
      .replace(/Dim_Product_Catalog/g, `Dim_${shortBrand}_Catalog`)
      .replace(/Fact_Business_Insights/g, `Fact_${shortBrand}_Insights`)
      .replace(/Fact_System_Transactions/g, `Fact_${shortBrand}_Transactions`)
      .replace(/Row-Level Security on Patient Data/g, `Row-Level Security on ${domainTitle} Data`)
      .replace(/\bPatient\b/gi, 'Entity')
      .replace(/\bPhysician\b/gi, 'Provider')
      .replace(/\bPayer\b/gi, 'Partner')
      .replace(/Oncology/gi, domainTitle)
      .replace(/PubMed/gi, `${domainTitle} API`)
      .replace(/ITACS/gi, domainTitle);
  } else {
    updatedXml = updatedXml
      .replace(/ITACS Oncology Platform/g, `${domainTitle} Platform`)
      .replace(/ITACS/gi, domainTitle);
  }

  // Universal Dynamic Entity & Workflow Step Extractor
  // Parses explicit user prompt workflows ONLY if explicit sequence operators (->, =>, •, Step 1:) exist
  if (userPrompt && typeof userPrompt === 'string') {
    if (/(?:->|-->|=>|•|\bstep\s*\d+)/i.test(userPrompt)) {
      const sanitizeStep = (raw: string, fallback: string) => {
        if (!raw) return fallback;
        const clean = raw.replace(/<[^>]+>/g, '').replace(/^(?:Act as|Chief|Enterprise|Architect|Build|Create|Design|System details:|\d+[\.:\)]\s*)/gi, '').trim();
        if (!clean || clean.length < 3) return fallback;
        if (clean.length <= 26) return clean;
        const words = clean.split(/\s+/).filter(Boolean);
        const short = words.slice(0, 3).join(' ');
        return short.length <= 26 ? short : short.slice(0, 23) + '...';
      };

      const rawSteps = userPrompt
        .split(/(?:->|-->|=>|•|\n|;)/)
        .map(s => s.replace(/^(?:Act as|Chief|Enterprise|Architect|Build|Create|Design|System details:|\d+[\.:\)]\s*)/gi, '').trim())
        .filter(s => s.length > 3);

      if (rawSteps.length >= 2) {
        const step1 = sanitizeStep(rawSteps[0], 'Edge Ingress Gateway');
        const step2 = sanitizeStep(rawSteps[1], 'Event Stream Queue');
        const step3 = sanitizeStep(rawSteps[2], 'Real-Time Anomaly Engine');
        const step4 = sanitizeStep(rawSteps[3] || rawSteps[rawSteps.length - 1], 'Model Fine-Tuning Hub');

        updatedXml = updatedXml
          .replace(/External Multimodal Client Portal/g, step1)
          .replace(/Public Ingress Subnet/g, `${step1} Subnet`)
          .replace(/BA Safety Workbench/g, step2)
          .replace(/Managed PostgreSQL \/ pgvector/g, step3)
          .replace(/Ephemeral Prompt Cache Store/g, step4)
          .replace(/\[1\] Ingress \/ Client Portal/g, `[1] ${step1}`)
          .replace(/\[2\] Event Streaming Gateway/g, `[2] ${step2}`)
          .replace(/\[3\] AI Processing Cluster/g, `[3] ${step3}`)
          .replace(/\[4\] Deployment & Lifecycle Hub/g, `[4] ${step4}`);
      }
    }

    // Dynamic Purpose & Problem Statement card update
    if (useCaseTitle && !/^(Today|Yesterday|v\d+|Untitled|Design Canvas|Diagram)/i.test(useCaseTitle.trim())) {
      updatedXml = updatedXml
        .replace(/Purpose &amp; Problem Statement:[^<]*/g, `Purpose &amp; Problem Statement: ${useCaseTitle} — Automated Enterprise Architecture Topology`)
        .replace(/Purpose & Problem Statement:[^<]*/g, `Purpose &amp; Problem Statement: ${useCaseTitle} — Automated Enterprise Architecture Topology`);
    }

    // Dynamic Cloud Vendor Terminology Translation
    const promptLowerFull = userPrompt.toLowerCase();
    if (promptLowerFull.includes('aws') || promptLowerFull.includes('amazon') || promptLowerFull.includes('eks') || promptLowerFull.includes('lambda')) {
      updatedXml = updatedXml
        .replace(/Google Cloud Platform \(GCP\)/gi, 'Amazon Web Services (AWS)')
        .replace(/Google Cloud Platform/gi, 'Amazon Web Services (AWS)')
        .replace(/Google Cloud/gi, 'AWS')
        .replace(/GCP/g, 'AWS')
        .replace(/Cloud Pub\/Sub/gi, 'Amazon Kinesis &amp; SQS')
        .replace(/Pub\/Sub/gi, 'Amazon SQS / SNS')
        .replace(/Cloud KMS/gi, 'AWS KMS &amp; Secrets Manager')
        .replace(/Cloud Run/gi, 'AWS ECS Fargate')
        .replace(/GKE Autopilot/gi, 'Amazon EKS Cluster')
        .replace(/GKE/g, 'EKS')
        .replace(/BigQuery/gi, 'Amazon Redshift &amp; Athena')
        .replace(/Cloud Storage/gi, 'Amazon S3 Bucket')
        .replace(/Cloud Armor/gi, 'AWS WAF &amp; Shield')
        .replace(/Cloud Functions/gi, 'AWS Lambda')
        .replace(/Cloud SQL/gi, 'Amazon Aurora PostgreSQL')
        .replace(/Cloud Spanner/gi, 'Amazon DynamoDB Global Tables')
        .replace(/Vertex AI/gi, 'Amazon Bedrock &amp; SageMaker')
        .replace(/Cloud Logging/gi, 'Amazon CloudWatch');
    } else if (promptLowerFull.includes('azure') || promptLowerFull.includes('aks')) {
      updatedXml = updatedXml
        .replace(/Google Cloud Platform \(GCP\)/gi, 'Microsoft Azure Enterprise Cloud')
        .replace(/Google Cloud Platform/gi, 'Microsoft Azure Enterprise Cloud')
        .replace(/Google Cloud/gi, 'Microsoft Azure')
        .replace(/GCP/g, 'Azure')
        .replace(/Cloud Pub\/Sub/gi, 'Azure Event Hubs &amp; Service Bus')
        .replace(/Pub\/Sub/gi, 'Azure Service Bus / Event Grid')
        .replace(/Cloud KMS/gi, 'Azure Key Vault &amp; Managed HSM')
        .replace(/Cloud Run/gi, 'Azure Container Apps')
        .replace(/GKE Autopilot/gi, 'Azure Kubernetes Service (AKS)')
        .replace(/GKE/g, 'AKS')
        .replace(/BigQuery/gi, 'Azure Synapse Analytics &amp; Microsoft Fabric')
        .replace(/Cloud Storage/gi, 'Azure Blob Storage (ADLS Gen2)')
        .replace(/Cloud Armor/gi, 'Azure Front Door &amp; WAF')
        .replace(/Cloud Functions/gi, 'Azure Functions')
        .replace(/Cloud SQL/gi, 'Azure Database for PostgreSQL (Flexible)')
        .replace(/Cloud Spanner/gi, 'Azure Cosmos DB (Multi-Region Active-Active)')
        .replace(/Vertex AI/gi, 'Azure OpenAI Service &amp; AI Search')
        .replace(/Cloud Logging/gi, 'Azure Monitor &amp; Log Analytics');
    } else if (promptLowerFull.includes('oracle') || promptLowerFull.includes('oci')) {
      updatedXml = updatedXml
        .replace(/Google Cloud Platform \(GCP\)/gi, 'Oracle Cloud Infrastructure (OCI)')
        .replace(/GCP/g, 'OCI')
        .replace(/Cloud Pub\/Sub/gi, 'OCI Streaming Service')
        .replace(/Cloud KMS/gi, 'OCI Vault &amp; KMS')
        .replace(/Cloud Run/gi, 'OCI Container Instances')
        .replace(/BigQuery/gi, 'OCI Autonomous Database')
        .replace(/Cloud Storage/gi, 'OCI Object Storage');
    } else if (promptLowerFull.includes('databricks')) {
      updatedXml = updatedXml
        .replace(/Cloud Pub\/Sub/gi, 'Databricks Event Stream / Kafka')
        .replace(/BigQuery/gi, 'BigLake &amp; Apache Iceberg Lakehouse')
        .replace(/Cloud Storage/gi, 'Databricks Unity Catalog Storage');
    }
  }

  return sanitizeDrawioXmlAttributes(applyBlueprintSemanticIcons(updatedXml));
}

export function sanitizeDrawioXmlAttributes(xml: string): string {
  if (!xml) return xml;
  
  // 1. Convert non-ASCII unicode characters/emojis into safe numeric HTML entities using unicode surrogate mode to prevent invalid XML entities (e.g. &#55357;) and atob Latin1 failures
  let cleaned = xml.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\x00-\x7F]/gu, (char) => {
    const code = char.codePointAt(0);
    return code ? `&#${code};` : '';
  });

  // Clean any legacy invalid surrogate numeric character entities (&#55296; to &#57343;)
  cleaned = cleaned.replace(/&#(?:5[5-6][0-9]{3}|57[0-2][0-9]{2}|573[0-3][0-9]|5734[0-3]);/g, '');

  // 2. Fix unescaped raw '<' and '&quot;' inside value attributes without prematurely terminating on inner self-closing tags like <path ... />
  cleaned = cleaned.replace(/\bvalue="([\s\S]*?)"(?=\s+(?:style|vertex|edge|parent|source|target|id|visible|collapsed|connectable|as|geometry)=[^\n>]*|\s*\/?>\s*(?:<mxGeometry|<\/mxCell>|<mxCell|\s*$))/g, (match, valContent) => {
    const sanitized = valContent
      // Convert &quot; and inner double quotes to single quotes to prevent breaking out of attribute
      .replace(/&quot;/g, "'")
      .replace(/"/g, "'")
      // Replace raw HTML tags inside value attribute: <b>, </b>, <br>, <i>, </i>, <span>, </span>, <table>, etc.
      .replace(/<(\/?[a-zA-Z0-9]+(?:\s+[^>]*)?)>/g, '&lt;$1&gt;')
      // Fix unescaped < followed by numbers like <50ms, <75%
      .replace(/<([0-9]+)/g, '&lt;$1')
      // Replace any other raw '<'
      .replace(/<(?![a-zA-Z0-9/])/g, '&lt;');
    return `value="${sanitized}"`;
  });

  // Ensure all unescaped & characters are converted to &amp; entities
  cleaned = cleaned.replace(/&(?!(?:amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/g, '&amp;');

  // Ensure double-escaped &amp; entities are normalized
  cleaned = cleaned.replace(/&amp;amp;/g, '&amp;');

  // 3. XSS Sanitization: Neutralize <script>, javascript: pseudo-protocols, and inline DOM event attributes
  cleaned = cleaned
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript\s*:/gi, 'blocked_script:')
    .replace(/\son[a-zA-Z]+\s*=\s*(?:'[^']*'|"[^"]*"|[^\s>]+)/gi, '');

  return cleaned;
}
