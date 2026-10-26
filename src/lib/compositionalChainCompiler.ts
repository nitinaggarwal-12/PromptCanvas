/**
 * Stateful Compositional Multi-Turn Architecture Graph Compiler
 *
 * Pre-validates and compiles cumulative multi-turn architecture evolution chains (Steps 1..10+)
 * with deterministic 2D AABB collision safety, topological insertions, node splitting,
 * container wrapping (Kubernetes, Private/Public Subnets, 3-Zone Grouping), closed-loop
 * feedback edges, and layout/theme transformations (Dark Neon + Dashed Arrows, Vertical Flow,
 * Continuous Infinity Loop, and Red Command vs. Green Telemetry color-coding).
 */

import {
  NANO_BANANA_3TIER_VISION_DECOMPILED_SPEC,
  NANO_BANANA_ECOMMERCE_MICROSERVICES_VISION_DECOMPILED_SPEC,
  normalizedBoxToCanvasRect,
} from './visionPosterToDrawioDecompiler';
import { synthesizeOfficialGcpArchCenter78FromPrompt } from './canonical/templateOfficialGcpArchCenterHubSpoke';

type ChainDomainId =
  | 'cloud_native_web'
  | 'ecommerce_microservices'
  | 'realtime_data_analytics'
  | 'mlops_model_deployment'
  | 'iot_smart_home'
  | 'universal_dynamic_topology';

interface CustomDynamicNodeSpec {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  shape: 'rect' | 'cylinder' | 'rhombus' | 'hexagon';
  tier: 1 | 2 | 3;
  protocolLabel: string;
}

interface CompositionalChainState {
  domain: ChainDomainId;
  step: number;
  promptHistory: string[];
  extractedWarehouseBrand?: string;
  universalTitle?: string;
  universalClauses?: string[];
  customDynamicNodes?: CustomDynamicNodeSpec[];
  removedNodeTerms?: string[];
  nodeReplacements?: Array<{ from: string; to: string }>;
  flags: {
    // Chain 1: Cloud-Native Web Application
    c1_redis?: boolean;
    c1_loadBalancer?: boolean;
    c1_splitAuthCore?: boolean;
    c1_cdn?: boolean;
    c1_prometheusGrafana?: boolean;
    c1_kubernetesCluster?: boolean;
    c1_objectStorageS3?: boolean;
    c1_rabbitMqWorker?: boolean;
    c1_darkNeonDashed?: boolean;

    // Chain 2: E-Commerce Microservices
    c2_nextjsPolyglotStorefront?: boolean;
    c2_apiGateway?: boolean;
    c2_paymentGateway?: boolean;
    c2_inventoryService?: boolean;
    c2_kafkaEventBus?: boolean;
    c2_dbPerService?: boolean;
    c2_notificationService?: boolean;
    c2_identityProvider?: boolean;
    c2_privatePublicSubnets?: boolean;
    c2_verticalLayout?: boolean;

    // Chain 3: Real-Time Data Analytics Pipeline
    c3_kafkaIngestion?: boolean;
    c3_flinkStreamProc?: boolean;
    c3_timeseriesDashboard?: boolean;
    c3_airflowBatchEtl?: boolean;
    c3_dataWarehouse?: boolean;
    c3_mlTrainingModule?: boolean;
    c3_dataCatalog?: boolean;
    c3_iamKmsSecurity?: boolean;
    c3_threeZonesAgnostic?: boolean;

    // Chain 4: MLOps & Model Deployment
    c4_splitStagingProd?: boolean;
    c4_featureStore?: boolean;
    c4_modelRegistryMlflow?: boolean;
    c4_cicdGithubActions?: boolean;
    c4_modelMonitoring?: boolean;
    c4_driftFeedbackLoop?: boolean;
    c4_abTestingRouter?: boolean;
    c4_gpuComputeCluster?: boolean;
    c4_infinityLoopLayout?: boolean;

    // Chain 5: IoT Event-Driven Smart Home System
    c5_cloudIotMqtt?: boolean;
    c5_rulesEngine?: boolean;
    c5_mobileAppRestApi?: boolean;
    c5_edgeComputingOffline?: boolean;
    c5_voiceAssistant?: boolean;
    c5_deviceProvisioning?: boolean;
    c5_otaUpdateServer?: boolean;
    c5_coldStorageArchive?: boolean;
    c5_redGreenArrows?: boolean;
  };
}

interface NodeSpec {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  x: number;
  y: number;
  w: number;
  h: number;
  shape?: 'rect' | 'cylinder' | 'rhombus' | 'hexagon';
  fill: string;
  stroke: string;
  badgeColor: string;
  textColor?: string;
  heroLogo?: boolean;
  verticalAlignTop?: boolean;
  cleanPosterCard?: boolean;
}

interface ContainerSpec {
  id: string;
  title: string;
  subtitle?: string;
  x: number;
  y: number;
  w: number;
  h: number;
  fill: string;
  stroke: string;
  headerColor: string;
  dashed?: boolean;
}

interface EdgeSpec {
  id: string;
  source: string;
  target: string;
  label: string;
  stroke: string;
  dashed?: boolean;
  strokeWidth?: number;
  labelBg?: string;
  labelBorder?: string;
  labelColor?: string;
  exitX?: number;
  exitY?: number;
  entryX?: number;
  entryY?: number;
  waypoints?: Array<{ x: number; y: number }>;
}

function esc(text: string): string {
  return String(text || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function extractRuntimeWarehouseBrand(promptText: string, existing?: string): string {
  const m =
    promptText.match(/\blike\s+([A-Za-z][A-Za-z0-9_-]{2,20})\b/i) ||
    promptText.match(/\b(?:using|with|into)\s+([A-Za-z][A-Za-z0-9_-]{2,20})\b/i);
  if (
    m &&
    m[1] &&
    !/^(aws|gcp|apache|structured|data|cloud|time|batch|real|three|distinct|icons)$/i.test(m[1])
  ) {
    return m[1].charAt(0).toUpperCase() + m[1].slice(1);
  }
  return existing || 'Cloud EDW';
}

function detectInitialChainDomain(promptText: string): ChainDomainId | null {
  const lower = (promptText || '').toLowerCase();

  // Chain 1: Classic 3-tier web application with React frontend, Node.js backend, PostgreSQL
  if (
    (lower.includes('3-tier') || lower.includes('three-tier') || lower.includes('web application')) &&
    (lower.includes('react') || lower.includes('node.js') || lower.includes('nodejs') || lower.includes('postgresql'))
  ) {
    return 'cloud_native_web';
  }

  // Chain 2: E-Commerce Microservices (User/Catalog/Order OR Next.js Storefront + Catalog/Cart/Checkout + Polyglot DB-per-Service)
  if (
    (lower.includes('e-commerce') || lower.includes('ecommerce') || lower.includes('microservices')) &&
    (lower.includes('user service') ||
      lower.includes('catalog service') ||
      lower.includes('order service') ||
      lower.includes('next.js') ||
      lower.includes('nextjs') ||
      lower.includes('storefront') ||
      (lower.includes('catalog') && (lower.includes('cart') || lower.includes('checkout'))))
  ) {
    return 'ecommerce_microservices';
  }

  // Chain 3: Real-Time Data Analytics Pipeline (telemetry data from mobile devices into Cloud Storage Data Lake)
  if (
    (lower.includes('data pipeline') || lower.includes('telemetry')) &&
    (lower.includes('mobile device') || lower.includes('data lake') || lower.includes('cloud storage'))
  ) {
    return 'realtime_data_analytics';
  }

  // Chain 4: MLOps & Model Deployment (Data Preparation, Model Training, Model Deployment as a REST API)
  if (
    lower.includes('mlops') ||
    (lower.includes('data preparation') && lower.includes('model training') && lower.includes('model deployment'))
  ) {
    return 'mlops_model_deployment';
  }

  // Chain 5: IoT Event-Driven Smart Home System (smart thermostats and lights sending data to local Central Hub)
  if (
    lower.includes('smart home') ||
    ((lower.includes('thermostat') || lower.includes('lights')) && lower.includes('central hub'))
  ) {
    return 'iot_smart_home';
  }

  // Chain 6: Universal Dynamic Topology for explicit multi-component architecture prompts (non-NASA/non-Oracle)
  if (
    /^(?:please\s+)?(?:create|design|build|draw|architect|generate)\s+(?:a\s+|an\s+|the\s+)?(?:architecture\s+diagram|diagram|architecture)\b/i.test(
      promptText.trim()
    ) &&
    /\b(?:with|using|including|featuring)\b.+,.+\band\b/i.test(promptText) &&
    !/\b(nasa|satellite|satellight|universe|multiverse|orbital|rocket|aerospace|constellation|closed[- ]loop|digital[- ]twin|counterfactual|oracle|exadata|ebusiness|e-business|\bebs\b)\b/i.test(
      lower
    )
  ) {
    return 'universal_dynamic_topology';
  }

  return null;
}

function extractChainStateFromXml(xml: string): CompositionalChainState | null {
  if (!xml || !xml.includes('data-chain-state-json="')) return null;
  const match = xml.match(/data-chain-state-json="([^"]+)"/);
  if (!match || !match[1]) return null;
  try {
    const decoded = match[1]
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>');
    const parsed = JSON.parse(decoded);
    if (parsed && parsed.domain && typeof parsed.step === 'number') {
      return parsed as CompositionalChainState;
    }
  } catch {}
  return null;
}

export function shouldUseCompositionalChainCompiler(currentXml: string, promptText: string): boolean {
  const existingState = extractChainStateFromXml(currentXml);
  if (existingState) return true;
  const domain = detectInitialChainDomain(promptText);
  if (!domain) return false;
  if (domain === 'universal_dynamic_topology') {
    const existingVertexCount = (currentXml?.match(/vertex="1"/g) || []).length;
    const isBlankOrStub =
      !currentXml ||
      currentXml.includes('data-blank-canvas="true"') ||
      existingVertexCount < 6;
    if (!isBlankOrStub) {
      return false;
    }
  }
  return true;
}

function parseUniversalArchitectureFromPrompt(promptText: string): {
  title: string;
  clauses: string[];
} {
  const strippedLead = promptText
    .replace(
      /^(?:please\s+)?(?:create|design|build|draw|architect|generate|show(?:\s+me)?)\s+(?:a\s+|an\s+|the\s+)?(?:[a-z0-9-]+\s+){0,3}?(?:diagram|architecture|system|pipeline|platform|topology|workflow|application|app)\s*(?:for|of|showing)?\s*/i,
      ''
    )
    .trim();

  // Check if there is a "<Subject> with/using/including/featuring <Component List>" split
  const subjectSplit = strippedLead.match(
    /^([A-Za-z0-9_. /()-]{3,52}?)\s+\b(?:with|using|including|featuring|comprising|consisting\s+of|connecting)\b\s+(.+)$/i
  );

  const rawSubject = (subjectSplit?.[1] || strippedLead)
    .replace(/^(?:a|an|the)\s+/i, '')
    .replace(/[.;,:]+$/, '')
    .trim();

  const rawComponentPart = subjectSplit?.[2] || strippedLead;
  const parsedClauses = rawComponentPart
    .split(/,|->|→|\band\b|\bconnected\s+to\b|\bcommunicating\s+with\b|\bwith\b|\busing\b|\bincluding\b|\bfeaturing\b/i)
    .map((s) =>
      s
        .replace(/^(?:a|an|the)\s+/i, '')
        .replace(/[.;:]+$/, '')
        .trim()
    )
    .filter((s) => s.length >= 3 && s.length <= 58);

  if (parsedClauses.length >= 2) {
    const cleanTitle =
      rawSubject && rawSubject.length >= 4 && !parsedClauses[0].toLowerCase().includes(rawSubject.toLowerCase())
        ? `${rawSubject} Architecture`
        : `${parsedClauses.slice(0, 3).join(' • ')} Architecture`;
    return {
      title: cleanTitle,
      clauses: parsedClauses.slice(0, 9),
    };
  }

  // Domain-intelligent synthesis when user provides a high-level domain prompt without a comma-separated component list
  const lower = promptText.toLowerCase();
  const domainPrefix = rawSubject && rawSubject.length >= 3 && rawSubject.length <= 36 ? rawSubject : 'Enterprise';
  if (/\b(rag|llm|genai|agent|chatbot|vector|embedding)\b/i.test(lower)) {
    return {
      title: `${domainPrefix} GenAI & Agentic RAG Architecture`,
      clauses: [
        'Web & Mobile Chat Client UI',
        'Edge API Gateway & Auth Guardrails',
        'LLM Agent & Orchestration Engine',
        'Embedding & Semantic Retrieval Service',
        'Vector Database & Hybrid Index',
        'Enterprise Knowledge Corpus & Audit Store',
      ],
    };
  }
  if (/\b(uber|ride|mobility|delivery|dispatch|driver|fleet)\b/i.test(lower)) {
    return {
      title: `${domainPrefix} Real-Time Mobility & Dispatch Architecture`,
      clauses: [
        'Rider & Driver Mobile Apps',
        'Edge API Gateway & Geo Load Balancer',
        'Real-Time Geospatial Matching Engine',
        'Trip, Pricing & Payment Microservice',
        'Apache Kafka Location Telemetry Stream',
        'Distributed Geospatial & Trip Database',
      ],
    };
  }
  if (/\b(netflix|video|streaming|media|vod|transcod)\b/i.test(lower)) {
    return {
      title: `${domainPrefix} Global Media & Video Streaming Architecture`,
      clauses: [
        'Global Edge CDN & Smart TV / Mobile Clients',
        'API Gateway & BFF Playback Router',
        'Adaptive Bitrate Transcoding Engine',
        'Personalization & Recommendation Service',
        'Object Storage Media Vault',
        'Distributed User & Viewing State Database',
      ],
    };
  }

  return {
    title: `${domainPrefix} Multi-Tier Architecture`,
    clauses: [
      `${domainPrefix} Client & Edge API Gateway`,
      `${domainPrefix} Core Application Service`,
      `${domainPrefix} Event & Policy Processing Engine`,
      `${domainPrefix} Primary Transactional Database`,
      `${domainPrefix} Telemetry & Audit Store`,
    ],
  };
}

export function isStyleOrFormattingPrompt(promptText: string): boolean {
  const lower = String(promptText || '').toLowerCase().trim();
  if (!lower) return false;
  if (/^(?:please\s+)?(?:add|insert|include|introduce|integrate|connect|attach|deploy|remove|delete|drop|replace|swap|separate|split)\b/i.test(lower)) {
    return false;
  }
  const hasStyleKeyword =
    /\b(beautiful|neat|formatted|format|clean(?!\s+data)|pretty|gorgeous|gcp\s+standards?|google\s+cloud\s+standards?|google\s+gcp\s+standards?|official\s+style|reformat|redesign|tidy|polish|better\s+layout|fix\s+layout|align|professional)\b/i.test(
      lower
    );
  const hasSpecificComponentVerb =
    /\b(add|insert|remove|delete|drop|replace|swap)\s+(a\s+|an\s+|the\s+)?(redis|postgres|mysql|mongo|kafka|pubsub|pub\/sub|spanner|alloydb|bigquery|vertex|gke|load\s+balancer|cdn|waf|armor|kms|iap|prometheus|grafana|datadog|structured\s+data\s+warehouse|data\s+warehouse)\b/i.test(
      lower
    );
  return hasStyleKeyword && !hasSpecificComponentVerb;
}

function applyPromptToChainState(state: CompositionalChainState, promptText: string): {
  canvasDiff: string;
  specDiff: string;
  persona: string;
} {
  const lower = (promptText || '').toLowerCase();
  const isRemoval = /\b(remove|delete|drop|eliminate|strip\s+out)\b/i.test(lower);
  let canvasDiff = '';
  let specDiff = '';
  let persona = 'Principal Google Cloud Architect';

  if (isStyleOrFormattingPrompt(promptText)) {
    state.customDynamicNodes = [];
    state.domain = 'universal_dynamic_topology';
    canvasDiff =
      'Re-formatted architecture into the Official Google Cloud Architecture Center (#78 Hub-and-Spoke) standard with 18 Google Cloud service cards, numbered flow badges (①–⑦), 52px spoke connector channels, and zero overlapping labels.';
    specDiff =
      'Upgraded Visual & Topological Standard to Official Google Cloud Architecture Center (#78 Hub-and-Spoke Reference Architecture).';
    return { canvasDiff, specDiff, persona };
  }

  if (state.domain === 'universal_dynamic_topology' && state.step === 1) {
    const parsed = parseUniversalArchitectureFromPrompt(promptText);
    state.universalTitle = parsed.title;
    state.universalClauses = parsed.clauses;
    canvasDiff = `Synthesized Official Google Cloud Architecture Center (#78 Hub-and-Spoke) 18-card reference topology for ${state.universalTitle}.`;
    specDiff = `Initialized Official Google Cloud Architecture Center (#78 Hub-and-Spoke) Reference Specification (v1.0.1).`;
  } else if (state.domain === 'universal_dynamic_topology' && state.step > 1 && !isRemoval) {
    canvasDiff = `Updated Official Google Cloud Architecture Center (#78 Hub-and-Spoke) topology with "${promptText.slice(0, 72)}".`;
    specDiff = `Updated cumulative Official #78 Hub-and-Spoke architecture specification for Step ${state.step}.`;
  }

  if (!isRemoval && state.domain === 'cloud_native_web') {
    persona = 'Principal Cloud-Native Web Architect';
    if (lower.includes('redis') || lower.includes('caching')) {
      state.flags.c1_redis = true;
      canvasDiff = 'Added Redis Caching Layer between Node.js Backend and PostgreSQL Database for sub-millisecond read caching.';
      specDiff = 'Updated Data & Caching Tier Contract (Redis RESP3 Cache-Aside & TTL Invalidation).';
    }
    if (lower.includes('load balancer')) {
      state.flags.c1_loadBalancer = true;
      canvasDiff = 'Inserted L7 Application Load Balancer in front of backend servers to distribute incoming traffic.';
      specDiff = 'Updated Ingress & Traffic Distribution Specification (Round-Robin & Health Checks).';
    }
    if (lower.includes('authentication service') || lower.includes('core api') || lower.includes('separate the node')) {
      state.flags.c1_splitAuthCore = true;
      canvasDiff = 'Separated monolithic Node.js backend into distinct Authentication Service and Core API Service.';
      specDiff = 'Updated Application Microservice Boundary (JWT Auth Service + Core Business API Service).';
    }
    if (lower.includes('cdn') || lower.includes('content delivery network')) {
      state.flags.c1_cdn = true;
      canvasDiff = 'Added global Content Delivery Network (CDN) in front of React Frontend to serve static assets at the edge.';
      specDiff = 'Updated Edge Delivery & Static Asset Caching Contract (Global Anycast CDN PoPs).';
    }
    if (lower.includes('prometheus') || lower.includes('grafana') || lower.includes('monitoring')) {
      state.flags.c1_prometheusGrafana = true;
      canvasDiff = 'Added Prometheus & Grafana Monitoring and Logging Stack connected to all backend services.';
      specDiff = 'Updated SRE Observability & Telemetry Contract (Prometheus /metrics Scrape & Grafana Dashboards).';
    }
    if (lower.includes('kubernetes') || lower.includes('k8s')) {
      state.flags.c1_kubernetesCluster = true;
      canvasDiff = 'Enclosed Authentication Service and Core API Service inside a Kubernetes Cluster deployment boundary.';
      specDiff = 'Updated Compute Orchestration Specification (Kubernetes Cluster Pod Autoscaling & Service Discovery).';
    }
    if (lower.includes('object storage') || lower.includes('s3') || lower.includes('media')) {
      state.flags.c1_objectStorageS3 = true;
      canvasDiff = 'Added Object Storage Service (AWS S3) connected to Core API Service for user-uploaded media files.';
      specDiff = 'Updated Unstructured Media Persistence Contract (S3 Multipart Upload & Presigned URLs).';
    }
    if (lower.includes('worker') || lower.includes('rabbitmq') || lower.includes('queue')) {
      state.flags.c1_rabbitMqWorker = true;
      canvasDiff = 'Added RabbitMQ Message Queue and Background Worker Process consuming async tasks from Core API Service.';
      specDiff = 'Updated Asynchronous Task Offloading Contract (AMQP RabbitMQ Queue & Worker Pool).';
    }
    if (lower.includes('dark theme') || lower.includes('neon') || lower.includes('dashed')) {
      state.flags.c1_darkNeonDashed = true;
      canvasDiff = 'Updated diagram style to Dark Theme (#0F172A) with Neon Blue (#00F0FF) & Neon Green (#00FF66) accents and dashed data flow arrows.';
      specDiff = 'Updated Visual Design System to High-Contrast Dark Neon Palette with Dashed Data-Flow Connectors.';
    }
  } else if (state.domain === 'ecommerce_microservices') {
    persona = 'Principal Microservices & Domain Architect';
    if (
      lower.includes('next.js') ||
      lower.includes('nextjs') ||
      lower.includes('storefront') ||
      (lower.includes('catalog') && lower.includes('cart') && lower.includes('checkout')) ||
      (lower.includes('mongodb') && lower.includes('redis') && lower.includes('postgresql'))
    ) {
      state.flags.c2_nextjsPolyglotStorefront = true;
      state.flags.c2_apiGateway = true;
      state.flags.c2_dbPerService = true;
      canvasDiff =
        'Decompiled Nano Banana 2.1 E-Commerce Microservices Architecture with Next.js 15 Storefront, Edge API Gateway, Catalog/Cart/Checkout Microservices, and 1:1 Database-per-Service Persistence (MongoDB, Redis, PostgreSQL 16).';
      specDiff =
        'Initialized Polyglot Database-per-Service E-Commerce Specification (Next.js 15 SSR/RSC -> API Gateway -> Catalog/MongoDB :27017, Cart/Redis :6379, Checkout/PostgreSQL :5432).';
    }
    if (lower.includes('api gateway')) {
      state.flags.c2_apiGateway = true;
      if (!canvasDiff) {
        canvasDiff = 'Added Edge API Gateway routing external client requests to User, Catalog, and Order microservices.';
        specDiff = 'Updated Edge Routing & North-South API Gateway Contract.';
      }
    }
    if (lower.includes('payment gateway')) {
      state.flags.c2_paymentGateway = true;
      canvasDiff = 'Integrated Third-Party Payment Gateway communicating directly with Order Service.';
      specDiff = 'Updated PCI-DSS External Payment Settlement Integration Contract.';
    }
    if (lower.includes('inventory')) {
      state.flags.c2_inventoryService = true;
      canvasDiff = 'Added dedicated Inventory Microservice communicating with Order Service for stock reservation.';
      specDiff = 'Updated Order-to-Inventory Stock Verification Contract.';
    }
    if (lower.includes('kafka') || lower.includes('event bus') || lower.includes('publish/subscribe')) {
      state.flags.c2_kafkaEventBus = true;
      canvasDiff = 'Implemented Apache Kafka Event Bus for asynchronous pub/sub communication between Order and Inventory services.';
      specDiff = 'Updated Event-Driven Architecture Contract (Apache Kafka OrderEvents Topic).';
    }
    if (lower.includes('database-per-service') || lower.includes('isolated database') || lower.includes('own isolated')) {
      state.flags.c2_dbPerService = true;
      canvasDiff = 'Applied Database-per-Service pattern giving User, Catalog, Order, and Inventory their own isolated databases.';
      specDiff = 'Updated Data Sovereignty Contract (Dedicated User DB, Catalog DB, Order DB, Inventory DB).';
    }
    if (lower.includes('notification service') || lower.includes('emails')) {
      state.flags.c2_notificationService = true;
      canvasDiff = 'Added Notification Service subscribed to Apache Kafka event bus to dispatch order update emails to users.';
      specDiff = 'Updated Async Customer Notification & Email Dispatch Contract.';
    }
    if (lower.includes('identity provider') || lower.includes('keycloak') || lower.includes('auth0')) {
      state.flags.c2_identityProvider = true;
      canvasDiff = 'Incorporated Central Identity Provider (Keycloak / Auth0) connected to API Gateway for OAuth2/JWT token validation.';
      specDiff = 'Updated Zero-Trust OIDC/OAuth2 Token Validation Contract.';
    }
    if (lower.includes('private subnet') || lower.includes('public subnet') || lower.includes('security boundary')) {
      state.flags.c2_privatePublicSubnets = true;
      canvasDiff = 'Enclosed internal microservices, Kafka event bus, and databases in a Private Subnet boundary, leaving API Gateway in Public Subnet.';
      specDiff = 'Updated Network Segmentation & VPC Subnet Isolation Contract (Public DMZ vs. Private Subnet).';
    }
    if (lower.includes('vertical flow') || (lower.includes('top') && lower.includes('bottom'))) {
      state.flags.c2_verticalLayout = true;
      canvasDiff = 'Re-architected layout from horizontal flow to top-to-bottom vertical flow (Client Apps at top -> API Gateway -> Microservices & Kafka -> Databases at bottom).';
      specDiff = 'Updated Topological Orientation to Stratified Top-to-Bottom Vertical Flow.';
    }
  } else if (state.domain === 'realtime_data_analytics') {
    persona = 'Principal Data & Streaming Lakehouse Architect';
    if (lower.includes('kafka') || lower.includes('streaming ingestion')) {
      state.flags.c3_kafkaIngestion = true;
      canvasDiff = 'Inserted Apache Kafka high-throughput streaming ingestion layer before Cloud Storage Data Lake.';
      specDiff = 'Updated Real-Time Event Ingestion Contract (Apache Kafka Partitioned Topics).';
    }
    if (lower.includes('flink') || lower.includes('stream processing')) {
      state.flags.c3_flinkStreamProc = true;
      canvasDiff = 'Added Apache Flink real-time stream processing engine consuming from Apache Kafka.';
      specDiff = 'Updated Stateful Stream Processing Contract (Apache Flink Event-Time Windowing).';
    }
    if (lower.includes('time-series') || lower.includes('real-time analytics dashboard')) {
      state.flags.c3_timeseriesDashboard = true;
      canvasDiff = 'Connected Apache Flink stream processor to Time-Series Database feeding a Real-Time Analytics Dashboard.';
      specDiff = 'Updated Sub-Second Telemetry Serving & Live Dashboard Contract.';
    }
    if (lower.includes('airflow') || lower.includes('nightly etl') || lower.includes('batch-processing')) {
      state.flags.c3_airflowBatchEtl = true;
      canvasDiff = 'Added parallel batch-processing path running nightly ETL jobs with Apache Airflow pulling from Cloud Storage Data Lake.';
      specDiff = 'Updated Batch DAG Orchestration Contract (Apache Airflow Nightly ETL).';
    }
    if (lower.includes('data warehouse') || lower.includes('transformed, clean data')) {
      state.flags.c3_dataWarehouse = true;
      state.extractedWarehouseBrand = extractRuntimeWarehouseBrand(promptText, state.extractedWarehouseBrand);
      canvasDiff = `Added Structured Data Warehouse (${state.extractedWarehouseBrand}) receiving transformed batch data from Apache Airflow.`;
      specDiff = 'Updated Enterprise Dimensional Data Warehouse Loading Contract.';
    }
    if (lower.includes('machine learning') || lower.includes('predictive models')) {
      state.flags.c3_mlTrainingModule = true;
      canvasDiff = 'Added Machine Learning Training Module pulling historical batch data from the Data Warehouse to train predictive models.';
      specDiff = 'Updated Predictive ML Feature Extraction & Model Training Contract.';
    }
    if (lower.includes('data catalog') || lower.includes('metadata management')) {
      state.flags.c3_dataCatalog = true;
      canvasDiff = 'Attached Data Catalog to both Cloud Storage Data Lake and Structured Data Warehouse for metadata management & governance.';
      specDiff = 'Updated Unified Data Governance, Lineage & Metadata Catalog Contract.';
    }
    if (lower.includes('iam') || lower.includes('kms') || lower.includes('key management')) {
      state.flags.c3_iamKmsSecurity = true;
      canvasDiff = 'Added IAM (Identity & Access Management) and KMS (Key Management Service) security layer governing all storage components.';
      specDiff = 'Updated Storage Encryption (CMEK KMS) & Least-Privilege IAM Governance Contract.';
    }
    if (lower.includes('three distinct zones') || (lower.includes('ingestion') && lower.includes('processing') && lower.includes('serving'))) {
      state.flags.c3_threeZonesAgnostic = true;
      canvasDiff = 'Redrew diagram with cloud-agnostic vector icons and grouped all components into three distinct architectural zones: Ingestion, Processing, and Serving.';
      specDiff = 'Updated 3-Zone Cloud-Agnostic Reference Topology (Ingestion Zone, Processing & Governance Zone, Serving & ML Zone).';
    }
  } else if (state.domain === 'mlops_model_deployment') {
    persona = 'Principal MLOps & AI Systems Architect';
    if (lower.includes('staging') && lower.includes('production')) {
      state.flags.c4_splitStagingProd = true;
      canvasDiff = 'Split Model Deployment stage into two isolated environments: Staging REST API and Production REST API.';
      specDiff = 'Updated Environment Promotion Contract (Staging Validation vs. Production Serving).';
    }
    if (lower.includes('feature store')) {
      state.flags.c4_featureStore = true;
      canvasDiff = 'Added Feature Store between Data Preparation and Model Training for reusable engineered features.';
      specDiff = 'Updated Offline/Online Feature Store Contract.';
    }
    if (lower.includes('model registry') || lower.includes('mlflow')) {
      state.flags.c4_modelRegistryMlflow = true;
      canvasDiff = 'Inserted MLflow Model Registry between Model Training and Deployment stages to version-control trained models.';
      specDiff = 'Updated Model Artifact Versioning & Stage Transition Contract (MLflow Registry).';
    }
    if (lower.includes('ci/cd') || lower.includes('github actions')) {
      state.flags.c4_cicdGithubActions = true;
      canvasDiff = 'Added CI/CD Pipeline (GitHub Actions) automatically triggering Model Training on code push.';
      specDiff = 'Updated Automated CT/CI/CD Training Trigger Contract (GitHub Actions Workflow).';
    }
    if (lower.includes('model monitoring') || lower.includes('data drift')) {
      state.flags.c4_modelMonitoring = true;
      canvasDiff = 'Attached Model Monitoring Service to Production API tracking data drift and prediction accuracy.';
      specDiff = 'Updated Production Drift Detection & Accuracy Telemetry Contract.';
    }
    if (lower.includes('feedback loop') || lower.includes('trigger retraining')) {
      state.flags.c4_driftFeedbackLoop = true;
      canvasDiff = 'Created closed-loop feedback arrow connecting Model Monitoring Service back to CI/CD Pipeline to trigger automated retraining on drift.';
      specDiff = 'Updated Closed-Loop Automated Retraining Feedback Contract.';
    }
    if (lower.includes('a/b testing') || lower.includes('model version a') || lower.includes('split user traffic')) {
      state.flags.c4_abTestingRouter = true;
      canvasDiff = 'Inserted A/B Testing Routing Infrastructure in front of Production API splitting live traffic between Model Version A and Model Version B.';
      specDiff = 'Updated Canary / A-B Traffic Splitting Contract (Model Version A vs. Model Version B).';
    }
    if (lower.includes('gpu compute cluster') || lower.includes('gpu')) {
      state.flags.c4_gpuComputeCluster = true;
      canvasDiff = 'Detailed Model Training stage with a dedicated GPU Compute Cluster executing distributed training jobs.';
      specDiff = 'Updated Distributed GPU Compute Cluster Specification.';
    }
    if (lower.includes('infinity loop')) {
      state.flags.c4_infinityLoopLayout = true;
      canvasDiff = 'Reorganized entire MLOps lifecycle into a continuous Infinity Loop (∞) topology joining Continuous Build/Training (Left Loop) and Production Serving/Drift Feedback (Right Loop) at the central Model Registry & CI/CD nexus.';
      specDiff = 'Updated Topological Layout to Continuous MLOps Infinity Loop (∞) Lifecycle.';
    }
  } else if (state.domain === 'iot_smart_home') {
    persona = 'Principal IoT & Edge-to-Cloud Architect';
    if (lower.includes('iot gateway') || lower.includes('mqtt')) {
      state.flags.c5_cloudIotMqtt = true;
      canvasDiff = 'Connected Local Central Hub to Cloud-Based IoT Gateway using the MQTT protocol.';
      specDiff = 'Updated Edge-to-Cloud MQTT QoS 1/2 Telemetry & Command Bridge Contract.';
    }
    if (lower.includes('rules engine')) {
      state.flags.c5_rulesEngine = true;
      canvasDiff = 'Added Cloud Rules Engine evaluating incoming sensor telemetry from IoT Gateway against user preferences.';
      specDiff = 'Updated Cloud Event Rules Engine & Scene Evaluation Contract.';
    }
    if (lower.includes('mobile app') || lower.includes('cloud rest api')) {
      state.flags.c5_mobileAppRestApi = true;
      canvasDiff = 'Added Mobile App communicating with Cloud REST API to read device states and dispatch remote control commands.';
      specDiff = 'Updated Mobile Client & Cloud REST Control API Contract.';
    }
    if (lower.includes('edge computing') || lower.includes('internet goes down')) {
      state.flags.c5_edgeComputingOffline = true;
      canvasDiff = 'Added Edge Computing Module on Local Central Hub to process critical alerts locally during internet outages.';
      specDiff = 'Updated Offline-Resilient Local Edge Computing & Failover Alert Contract.';
    }
    if (lower.includes('voice assistant') || lower.includes('alexa') || lower.includes('google home')) {
      state.flags.c5_voiceAssistant = true;
      canvasDiff = 'Added Voice Assistant Integration (Alexa / Google Home) interacting directly with Cloud REST API.';
      specDiff = 'Updated Smart Home Voice Assistant Webhook & Intent Fulfillment Contract.';
    }
    if (lower.includes('device provisioning') || lower.includes('certificate')) {
      state.flags.c5_deviceProvisioning = true;
      canvasDiff = 'Added Cloud Device Provisioning Service for secure X.509 certificate generation and smart device onboarding.';
      specDiff = 'Updated Zero-Trust X.509 Device Provisioning & Mutual TLS Onboarding Contract.';
    }
    if (lower.includes('ota') || lower.includes('over-the-air') || lower.includes('firmware')) {
      state.flags.c5_otaUpdateServer = true;
      canvasDiff = 'Added OTA (Over-The-Air) Firmware Update Server connected to local smart devices to push signed firmware patches.';
      specDiff = 'Updated Cryptographically Signed OTA Firmware Rollout Contract.';
    }
    if (lower.includes('cold storage') || lower.includes('archiving')) {
      state.flags.c5_coldStorageArchive = true;
      canvasDiff = 'Added Cloud Cold Storage Database archiving multi-year temperature and energy usage logs cost-effectively.';
      specDiff = 'Updated Long-Term Telemetry Archival & Cold Storage Retention Contract.';
    }
    if (lower.includes('color-code') || (lower.includes('red arrows') && lower.includes('green arrows'))) {
      state.flags.c5_redGreenArrows = true;
      canvasDiff = 'Color-coded all connectors: Red arrows (#DC2626) for Command/Control flows (App/Cloud to Device) and Green arrows (#16A34A) for Telemetry/Data flows (Device to Cloud).';
      specDiff = 'Updated Semantic Connector Color-Coding Standard (Red #DC2626 Command Flows vs. Green #16A34A Telemetry Flows).';
    }
  }

  // Universal Negative Removal, Node Replacement, and Arbitrary Dynamic Component Addition
  const replaceMatch = promptText.match(/\b(?:replace|swap|switch)\s+([A-Za-z0-9_. /()-]{2,36}?)\s+with\s+([A-Za-z0-9_. /()-]{2,42})(?:[.,;]|$)/i);

  if (replaceMatch && replaceMatch[1] && replaceMatch[2]) {
    const fromTerm = replaceMatch[1].replace(/^(the|a|an)\s+/i, '').trim();
    const toTerm = replaceMatch[2].replace(/^(the|a|an)\s+/i, '').trim();
    state.nodeReplacements = [...(state.nodeReplacements || []), { from: fromTerm, to: toTerm }];
    canvasDiff = `Replaced "${fromTerm}" with "${toTerm}" in the active architecture topology.`;
    specDiff = `Updated Component Substitution Contract (${fromTerm} -> ${toTerm}).`;
  } else if (isRemoval && !canvasDiff) {
    const remMatch = promptText.match(/\b(?:remove|delete|drop|eliminate|strip\s+out)\s+(?:the\s+|a\s+|an\s+)?([A-Za-z0-9_. /()-]{3,42})(?:[.,;]|$)/i);
    const removedTerm = (remMatch?.[1] || promptText).trim();
    if (lower.includes('redis')) state.flags.c1_redis = false;
    if (lower.includes('cdn')) state.flags.c1_cdn = false;
    if (lower.includes('notification')) state.flags.c2_notificationService = false;
    state.removedNodeTerms = [...(state.removedNodeTerms || []), removedTerm];
    canvasDiff = `Removed "${removedTerm}" and re-healed incident connectors.`;
    specDiff = `Updated Topology Decommissioning Contract (Removed ${removedTerm}).`;
  } else if (!canvasDiff && state.step > 1) {
    // Arbitrary Follow-Up Component Addition (handles ANY 1 or more components outside the 45 pre-configured flags)
    const cleaned = promptText
      .replace(/^(please\s+)?(add|insert|include|introduce|integrate|connect|attach|deploy|create|show|wire)\s+(a\s+|an\s+|the\s+)?/i, '')
      .replace(/\s+(connected to|communicating with|in front of|behind|between|for|that|which|to improve|to handle)\b.*$/i, '')
      .replace(/[.;,]+$/, '')
      .trim();
    const candidateParts = cleaned
      .split(/,|\s+\band\b\s+/i)
      .map((p) => p.replace(/^(a|an|the)\s+/i, '').trim())
      .filter((p) => p.length >= 3 && p.length <= 54);
    const partsToAdd = candidateParts.length >= 1 ? candidateParts.slice(0, 4) : [promptText.slice(0, 46).trim()];
    const dynNodes = [...(state.customDynamicNodes || [])];
    const addedLabels: string[] = [];

    for (const compTitle of partsToAdd) {
      const cLower = compTitle.toLowerCase();
      const shape: CustomDynamicNodeSpec['shape'] =
        /\b(db|database|redis|cache|postgres|mysql|mongo|dynamo|warehouse|lake|s3|storage|store|vault|archive|pinecone|vector)\b/i.test(cLower)
          ? 'cylinder'
          : /\b(router|gateway|load balancer|firewall|waf|gate|proxy|ingress|cdn)\b/i.test(cLower)
            ? 'rhombus'
            : /\b(engine|agent|processor|flink|spark|airflow|cluster|gpu|ml|model|worker|rules|kafka|queue)\b/i.test(cLower)
              ? 'hexagon'
              : 'rect';
      const tier: 1 | 2 | 3 =
        shape === 'rhombus' || /\b(cdn|client|app|portal|ui|frontend|edge|gateway)\b/i.test(cLower)
          ? 1
          : shape === 'cylinder' || /\b(prometheus|grafana|datadog|telemetry|log|monitor|kms|iam|catalog)\b/i.test(cLower)
            ? 3
            : 2;
      const badge =
        shape === 'cylinder'
          ? 'STATEFUL DATA & STORAGE'
          : shape === 'rhombus'
            ? 'TRAFFIC & POLICY GATE'
            : shape === 'hexagon'
              ? 'COMPUTE & PROCESSING ENGINE'
              : 'ENTERPRISE SERVICE MODULE';
      const protocolLabel =
        shape === 'cylinder'
          ? 'TLS 1.3 Read/Write Query'
          : shape === 'rhombus'
            ? 'mTLS Policy & Routing'
            : 'gRPC / REST Event Flow';
      const formattedTitle = compTitle.charAt(0).toUpperCase() + compTitle.slice(1);
      dynNodes.push({
        id: `dyn_node_step_${state.step}_${dynNodes.length + 1}`,
        badge,
        title: formattedTitle,
        subtitle: `Dynamically Synthesized Component (Step ${state.step} • ${protocolLabel})`,
        shape,
        tier,
        protocolLabel,
      });
      addedLabels.push(`${formattedTitle} (${shape.toUpperCase()} Tier ${tier})`);
    }
    state.customDynamicNodes = dynNodes;
    canvasDiff = `Added custom component(s): ${addedLabels.join(', ')} with orthogonal protocol connectors.`;
    specDiff = `Updated Dynamic Component Extension Contract (+${partsToAdd.join(', +')}).`;
  }

  if (!canvasDiff) {
    canvasDiff = `Synthesized Step ${state.step} architectural evolution for ${state.domain}: "${promptText.slice(0, 90)}".`;
    specDiff = `Updated cumulative architecture topology and data contracts for Step ${state.step}.`;
  }

  return { canvasDiff, specDiff, persona };
}

function renderChainNodeHeroSvgLogo(n: NodeSpec, isDarkTheme: boolean): string {
  const t = `${n.title} ${n.badge} ${n.subtitle}`.toLowerCase();
  const stroke = isDarkTheme ? '#00F0FF' : n.badgeColor || n.stroke || '#1A73E8';
  const sz = n.h && n.h < 120 ? 30 : 46;
  if (/\bnext\.?js\b/.test(t)) {
    const circleFill = isDarkTheme ? '#000000' : '#0F172A';
    const ringStroke = isDarkTheme ? '#00F0FF' : '#0F172A';
    return `<svg width="50" height="50" viewBox="0 0 48 48" fill="none" style="display:block;margin:0 auto 6px auto;"><circle cx="24" cy="24" r="21" fill="${circleFill}" stroke="${ringStroke}" stroke-width="1.5"/><path d="M16.5 32.5V15.5L34.5 38.5" stroke="#FFFFFF" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/><line x1="31.5" y1="15.5" x2="31.5" y2="26.5" stroke="#FFFFFF" stroke-width="3.4" stroke-linecap="round"/></svg>`;
  }
  if (/\breact\b/.test(t)) {
    const cyan = isDarkTheme ? '#00F0FF' : '#00B4D8';
    return `<svg width="${sz}" height="${sz}" viewBox="0 0 48 48" fill="none" style="display:block;margin:0 auto 5px auto;"><circle cx="24" cy="24" r="4.4" fill="${cyan}"/><ellipse cx="24" cy="24" rx="20" ry="7.8" stroke="${cyan}" stroke-width="2.6"/><ellipse cx="24" cy="24" rx="20" ry="7.8" stroke="${cyan}" stroke-width="2.6" transform="rotate(60 24 24)"/><ellipse cx="24" cy="24" rx="20" ry="7.8" stroke="${cyan}" stroke-width="2.6" transform="rotate(120 24 24)"/></svg>`;
  }
  if (/\b(browser|web & mobile|web\/mobile|client|mobile app|shopper)\b/.test(t)) {
    const blue = isDarkTheme ? '#00F0FF' : '#3B82F6';
    const screenFill = isDarkTheme ? '#0F172A' : '#DBEAFE';
    return `<svg width="50" height="44" viewBox="0 0 48 44" fill="none" style="display:block;margin:0 auto 6px auto;"><rect x="3" y="8" width="27" height="22" rx="2.5" fill="${screenFill}" stroke="${blue}" stroke-width="2.4"/><line x1="3" y1="14" x2="30" y2="14" stroke="${blue}" stroke-width="2.2"/><circle cx="7" cy="11" r="1.1" fill="${blue}"/><circle cx="10.5" cy="11" r="1.1" fill="${blue}"/><rect x="33" y="8" width="12" height="23" rx="2.2" fill="${blue}"/><rect x="35" y="11.5" width="8" height="14.5" rx="1" fill="#FFFFFF"/><circle cx="39" cy="28.5" r="1" fill="#FFFFFF"/></svg>`;
  }
  if (/\bmongodb\b/.test(t)) {
    const purple = isDarkTheme ? '#00F0FF' : '#7C3AED';
    const cylFill = isDarkTheme ? '#1E1B4B' : '#A78BFA';
    const cylTop = isDarkTheme ? '#312E81' : '#DDD6FE';
    return (
      `<div style="position:relative;width:190px;height:42px;margin:0 auto 2px auto;">` +
      `<svg width="32" height="52" viewBox="0 0 34 54" fill="none" style="position:absolute;left:-8px;top:8px;"><path d="M3 10v34c0 3.6 6.3 6.5 14 6.5s14-2.9 14-6.5V10" fill="${cylFill}" stroke="${purple}" stroke-width="2"/><ellipse cx="17" cy="10" rx="14" ry="5.5" fill="${cylTop}" stroke="${purple}" stroke-width="2"/><path d="M3 21c0 3.3 6.3 6 14 6s14-2.7 14-6" stroke="${purple}" stroke-width="1.8"/><path d="M3 32c0 3.3 6.3 6 14 6s14-2.7 14-6" stroke="${purple}" stroke-width="1.8"/></svg>` +
      `<svg width="42" height="42" viewBox="0 0 44 44" fill="none" style="display:block;margin:0 auto;transform:translateX(12px);"><path d="M22 2C14.8 9.6 12 17.6 12 24.2c0 6.8 4.2 12.2 10 14.6 5.8-2.4 10-7.8 10-14.6 0-6.6-2.8-14.6-10-22.2z" fill="#16A34A"/><path d="M22 2v36.8c5.8-2.4 10-7.8 10-14.6 0-6.6-2.8-14.6-10-22.2z" fill="#22C55E"/><line x1="22" y1="36" x2="22" y2="42.5" stroke="#15803D" stroke-width="2.8" stroke-linecap="round"/></svg>` +
      `</div>`
    );
  }
  if (/\bredis in-memory\b/.test(t)) {
    const purple = isDarkTheme ? '#00F0FF' : '#7C3AED';
    const cylFill = isDarkTheme ? '#1E1B4B' : '#A78BFA';
    const cylTop = isDarkTheme ? '#312E81' : '#DDD6FE';
    return (
      `<div style="position:relative;width:190px;height:42px;margin:0 auto 2px auto;">` +
      `<svg width="32" height="52" viewBox="0 0 34 54" fill="none" style="position:absolute;left:-8px;top:8px;"><path d="M3 10v34c0 3.6 6.3 6.5 14 6.5s14-2.9 14-6.5V10" fill="${cylFill}" stroke="${purple}" stroke-width="2"/><ellipse cx="17" cy="10" rx="14" ry="5.5" fill="${cylTop}" stroke="${purple}" stroke-width="2"/><path d="M3 21c0 3.3 6.3 6 14 6s14-2.7 14-6" stroke="${purple}" stroke-width="1.8"/><path d="M3 32c0 3.3 6.3 6 14 6s14-2.7 14-6" stroke="${purple}" stroke-width="1.8"/></svg>` +
      `<svg width="44" height="40" viewBox="0 0 46 42" fill="none" style="display:block;margin:0 auto;transform:translateX(12px);"><polygon points="23 23 40 30 23 37 6 30 23 23" fill="#991B1B" stroke="#FFFFFF" stroke-width="0.9"/><polygon points="23 15.5 40 22.5 23 29.5 6 22.5 23 15.5" fill="#B91C1C" stroke="#FFFFFF" stroke-width="0.9"/><polygon points="23 7.5 40 14.5 23 21.5 6 14.5 23 7.5" fill="#DC2626" stroke="#FFFFFF" stroke-width="0.9"/><circle cx="18" cy="14.5" r="1.8" fill="#FFFFFF"/><polygon points="25.5 11.5 28 14.5 25.5 17.5 23 14.5 25.5 11.5" fill="#FFFFFF"/></svg>` +
      `</div>`
    );
  }
  if (/\bpostgresql 16 relational\b/.test(t)) {
    const blueStroke = isDarkTheme ? '#00F0FF' : '#2563EB';
    const cylFill = isDarkTheme ? '#1E293B' : '#60A5FA';
    const cylTop = isDarkTheme ? '#334155' : '#93C5FD';
    const pgBlue = '#336791';
    const pgLight = '#E0F2FE';
    return (
      `<div style="position:relative;width:190px;height:42px;margin:0 auto 2px auto;">` +
      `<svg width="32" height="52" viewBox="0 0 34 54" fill="none" style="position:absolute;left:-8px;top:8px;"><path d="M3 10v34c0 3.6 6.3 6.5 14 6.5s14-2.9 14-6.5V10" fill="${cylFill}" stroke="${blueStroke}" stroke-width="2"/><ellipse cx="17" cy="10" rx="14" ry="5.5" fill="${cylTop}" stroke="${blueStroke}" stroke-width="2"/><path d="M3 21c0 3.3 6.3 6 14 6s14-2.7 14-6" stroke="${blueStroke}" stroke-width="1.8"/><path d="M3 32c0 3.3 6.3 6 14 6s14-2.7 14-6" stroke="${blueStroke}" stroke-width="1.8"/></svg>` +
      `<svg width="44" height="42" viewBox="0 0 52 44" fill="none" style="display:block;margin:0 auto;transform:translateX(12px);"><ellipse cx="16" cy="20" rx="7.5" ry="10.5" fill="${pgBlue}" stroke="#FFFFFF" stroke-width="1.5"/><ellipse cx="36" cy="20" rx="7.5" ry="10.5" fill="${pgBlue}" stroke="#FFFFFF" stroke-width="1.5"/><path d="M18 11c3-3 13-3 16 0 2.5 2.5 2.8 10 0.8 15-1.6 3.5-4.4 6.5-7.6 6.5v5c0 2.2-2.8 2.5-3.6 0.5l-1.4-5.5c-3-0.8-5.5-3.5-6.2-7.2-1.2-5 0-11.8 2-14.3z" fill="${pgBlue}" stroke="#FFFFFF" stroke-width="1.6"/><circle cx="22.5" cy="19.5" r="1.8" fill="${pgLight}"/><circle cx="29.5" cy="19.5" r="1.8" fill="${pgLight}"/></svg>` +
      `</div>`
    );
  }
  if (/\b(node\.js|nodejs|backend api)\b/.test(t)) {
    const green = isDarkTheme ? '#00FF66' : '#16A34A';
    const darkSlate = isDarkTheme ? '#F8FAFC' : '#334155';
    const wSz = n.h && n.h < 120 ? 48 : 60;
    return `<svg width="${wSz}" height="42" viewBox="0 0 68 48" fill="none" style="display:block;margin:0 auto 3px auto;"><text x="34" y="18" text-anchor="middle" fill="${darkSlate}" font-family="Inter,system-ui,sans-serif" font-size="18" font-weight="900" letter-spacing="-0.5">node</text><polygon points="34 22 46 28.5 46 40.5 34 46.5 22 40.5 22 28.5 34 22" fill="${green}"/><text x="34" y="37.5" text-anchor="middle" fill="#FFFFFF" font-family="Inter,system-ui,sans-serif" font-size="10" font-weight="900">JS</text></svg>`;
  }
  if (/\b(prisma|pgbouncer|connection pool|orm)\b/.test(t)) {
    const navy = isDarkTheme ? '#00FF66' : '#0F172A';
    const teal = isDarkTheme ? '#0D9488' : '#0D9488';
    const facetFill = isDarkTheme ? '#1E293B' : '#CCFBF1';
    return `<svg width="${sz}" height="${sz}" viewBox="0 0 48 48" fill="none" style="display:block;margin:0 auto 5px auto;"><polygon points="24 4 41 35 20 43 7 35 24 4" fill="${facetFill}" stroke="${navy}" stroke-width="2.8" stroke-linejoin="round"/><polygon points="24 4 41 35 20 43 24 4" fill="${teal}" fill-opacity="0.28"/><line x1="24" y1="4" x2="20" y2="43" stroke="${navy}" stroke-width="2.6"/></svg>`;
  }
  if (/\b(postgresql 16|postgresql streaming|primary relational|read replica)\b/.test(t) && !/\b(wal archive|pitr)\b/.test(t)) {
    // Purple 3D Cylinder with the Blue-Teal PostgreSQL Elephant emblem on the front (matching Nano Banana Image 2)
    const purple = isDarkTheme ? '#00F0FF' : '#7C3AED';
    const topFill = isDarkTheme ? '#1E1B4B' : '#DDD6FE';
    const bodyFill = isDarkTheme ? '#0F172A' : '#EDE9FE';
    const pgBlue = '#336791';
    const pgLight = '#E0F2FE';
    const pgSz = n.h && n.h < 120 ? 34 : 52;
    return `<svg width="${pgSz}" height="${pgSz}" viewBox="0 0 52 52" fill="none" style="display:block;margin:0 auto 5px auto;"><path d="M10 11v28c0 4.1 7.16 7.4 16 7.4s16-3.3 16-7.4V11" fill="${bodyFill}" stroke="${purple}" stroke-width="2.5"/><ellipse cx="26" cy="11" rx="16" ry="6.5" fill="${topFill}" stroke="${purple}" stroke-width="2.5"/><path d="M10 20c0 3.8 7.16 6.8 16 6.8s16-3 16-6.8" stroke="${purple}" stroke-width="2"/><ellipse cx="18.5" cy="29" rx="5.2" ry="6.8" fill="${pgBlue}" stroke="#FFFFFF" stroke-width="1.3"/><ellipse cx="33.5" cy="29" rx="5.2" ry="6.8" fill="${pgBlue}" stroke="#FFFFFF" stroke-width="1.3"/><path d="M20 23c2-2 10-2 12 0 1.8 1.8 2 7.5 0.5 11-1.2 2.5-3.2 4.8-5.5 4.8v3.5c0 1.6-2 1.8-2.6 0.3l-1-3.8c-2.2-0.5-4-2.5-4.6-5.2-0.8-3.5 0-8.8 1.2-10.6z" fill="${pgBlue}" stroke="#FFFFFF" stroke-width="1.4"/><circle cx="23.5" cy="28.5" r="1.3" fill="${pgLight}"/><circle cx="28.5" cy="28.5" r="1.3" fill="${pgLight}"/></svg>`;
  }
  if (n.shape === 'cylinder' || /\b(postgres|database|db|replica|wal|pitr|backup|warehouse|timeseries|time-series|cold storage|feature store|data lake)\b/.test(t)) {
    const purple = isDarkTheme ? '#00F0FF' : '#7C3AED';
    const topFill = isDarkTheme ? '#1E1B4B' : '#DDD6FE';
    const bodyFill = isDarkTheme ? '#0F172A' : '#EDE9FE';
    return `<svg width="34" height="34" viewBox="0 0 48 48" fill="none" style="display:block;margin:0 auto 4px auto;"><path d="M10 11v26c0 3.8 6.27 6.8 14 6.8s14-3 14-6.8V11" fill="${bodyFill}" stroke="${purple}" stroke-width="2.5"/><ellipse cx="24" cy="11" rx="14" ry="6.2" fill="${topFill}" stroke="${purple}" stroke-width="2.5"/><path d="M10 19.5c0 3.6 6.27 6.5 14 6.5s14-2.9 14-6.5" stroke="${purple}" stroke-width="2.2"/><path d="M10 28c0 3.6 6.27 6.5 14 6.5s14-2.9 14-6.5" stroke="${purple}" stroke-width="2.2"/></svg>`;
  }
  if (/\b(redis|cache|caching|edge computing|tanstack|axios)\b/.test(t)) {
    return `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="2.2" style="display:block;margin:0 auto 4px auto;"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`;
  }
  if (/\b(kafka|rabbitmq|mqtt|queue|event bus|stream)\b/.test(t)) {
    return `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="2.2" style="display:block;margin:0 auto 4px auto;"><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><circle cx="12" cy="18" r="3"/><line x1="8.7" y1="7.5" x2="10.5" y2="15.5"/><line x1="15.3" y1="7.5" x2="13.5" y2="15.5"/><line x1="9" y1="6" x2="15" y2="6"/></svg>`;
  }
  if (/\b(auth|identity|keycloak|auth0|iam|kms|provisioning|certificate|lock)\b/.test(t)) {
    return `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="2.2" style="display:block;margin:0 auto 4px auto;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`;
  }
  if (/\b(load balancer|api gateway|router|rate limiter|a\/b|cdn|cloudfront)\b/.test(t)) {
    return `<svg width="46" height="44" viewBox="0 0 48 44" fill="none" style="display:block;margin:0 auto 6px auto;"><rect x="15" y="13" width="18" height="18" rx="4" fill="#DCFCE7" stroke="${stroke}" stroke-width="2.4"/><circle cx="24" cy="22" r="3.5" fill="${stroke}"/><line x1="4" y1="22" x2="15" y2="22" stroke="${stroke}" stroke-width="2.4"/><circle cx="4" cy="22" r="2.5" fill="${stroke}"/><line x1="33" y1="16" x2="43" y2="9" stroke="${stroke}" stroke-width="2.2"/><circle cx="43" cy="9" r="2.5" fill="${stroke}"/><line x1="33" y1="22" x2="44" y2="22" stroke="${stroke}" stroke-width="2.2"/><circle cx="44" cy="22" r="2.5" fill="${stroke}"/><line x1="33" y1="28" x2="43" y2="35" stroke="${stroke}" stroke-width="2.2"/><circle cx="43" cy="35" r="2.5" fill="${stroke}"/></svg>`;
  }
  if (/\b(prometheus|grafana|monitoring|dashboard|catalog)\b/.test(t)) {
    return `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="2.2" style="display:block;margin:0 auto 4px auto;"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`;
  }
  if (/\b(mlflow|training|gpu|flink|airflow|rules engine|worker)\b/.test(t)) {
    return `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="${stroke}" stroke-width="2.2" style="display:block;margin:0 auto 4px auto;"><rect x="5" y="5" width="14" height="14" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="2" x2="9" y2="5"/><line x1="15" y1="2" x2="15" y2="5"/><line x1="9" y1="19" x2="9" y2="22"/><line x1="15" y1="19" x2="15" y2="22"/></svg>`;
  }
  return `<svg width="32" height="32" viewBox="0 0 48 48" fill="none" style="display:block;margin:0 auto 4px auto;"><polygon points="24 4 40 14 40 34 24 44 8 34 8 14 24 4" stroke="${stroke}" stroke-width="2.6"/><circle cx="24" cy="24" r="6" fill="${stroke}"/></svg>`;
}

function renderDrawioFromSpecs(params: {
  diagramId: string;
  diagramName: string;
  state: CompositionalChainState;
  headerTitle: string;
  headerSubtitle: string;
  isDarkTheme: boolean;
  containers: ContainerSpec[];
  nodes: NodeSpec[];
  edges: EdgeSpec[];
  pageWidth?: number;
  pageHeight?: number;
}): string {
  const dynList = params.state.customDynamicNodes || [];
  const pw = params.pageWidth || 1600;
  const requestedPh = params.pageHeight || 960;
  const ph = dynList.length > 0 ? Math.max(requestedPh, 1020) : requestedPh;
  const bg = params.isDarkTheme ? '#0F172A' : '#FFFFFF';
  const stateJsonEsc = esc(JSON.stringify(params.state));
  const cells: string[] = [];

  // Apply dynamic removals & replacements if present
  const removedTerms = (params.state.removedNodeTerms || []).map((t) => t.toLowerCase());
  const activeNodes: NodeSpec[] = params.nodes
    .filter((n) => {
      if (removedTerms.length === 0) return true;
      const tLower = `${n.title} ${n.badge}`.toLowerCase();
      return !removedTerms.some((rem) => {
        const tokens = rem.split(/\s+/).filter((tok) => tok.length >= 3);
        return tokens.length > 0 && tokens.every((tok) => tLower.includes(tok));
      });
    })
    .map((n) => {
      let updatedTitle = n.title;
      const matchTarget = `${n.title} ${n.badge}`.toLowerCase();
      for (const rep of params.state.nodeReplacements || []) {
        const fromTokens = rep.from
          .toLowerCase()
          .split(/\s+/)
          .filter((tok) => tok.length >= 3);
        if (fromTokens.length > 0 && fromTokens.every((tok) => matchTarget.includes(tok))) {
          updatedTitle = `${rep.to} (Replaced ${rep.from})`;
        }
      }
      return { ...n, title: updatedTitle };
    });

  const activeEdges: EdgeSpec[] = [...params.edges];

  // Append any arbitrary follow-up customDynamicNodes in a collision-free expansion row
  if (dynList.length > 0) {
    const baseExpansionY = (params.pageHeight || 960) >= 980 ? 885 : 845;
    dynList.forEach((dyn, idx) => {
      const colIdx = idx % 4;
      const rowIdx = Math.floor(idx / 4);
      const dx = 45 + colIdx * 385;
      const dy = baseExpansionY + rowIdx * 115;
      const stroke = dyn.tier === 1 ? '#2563EB' : dyn.tier === 3 ? '#059669' : '#7C3AED';
      activeNodes.push({
        id: dyn.id,
        badge: dyn.badge,
        title: dyn.title,
        subtitle: dyn.subtitle,
        x: dx,
        y: dy,
        w: 355,
        h: 96,
        shape: dyn.shape,
        fill: params.isDarkTheme ? '#1E293B' : '#FFFFFF',
        stroke: params.isDarkTheme ? '#00F0FF' : stroke,
        badgeColor: params.isDarkTheme ? '#00FF66' : stroke,
      });
      const anchorNode = activeNodes[Math.min(1, activeNodes.length - 2)] || activeNodes[0];
      if (anchorNode && anchorNode.id !== dyn.id) {
        activeEdges.push({
          id: `e_${dyn.id}`,
          source: anchorNode.id,
          target: dyn.id,
          label: dyn.protocolLabel,
          stroke: params.isDarkTheme ? '#00FF66' : stroke,
          dashed: dyn.tier === 3,
        });
      }
    });
  }

  const validNodeIds = new Set(activeNodes.map((n) => n.id));
  const filteredEdges = activeEdges.filter((e) => validNodeIds.has(e.source) && validNodeIds.has(e.target));
  const nodeMap = new Map(activeNodes.map((n) => [n.id, n]));

  // Optional dark background canvas card so SVG exports also preserve dark background
  if (params.isDarkTheme) {
    cells.push(
      `        <mxCell id="chain_dark_bg_frame" value="" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#0F172A;strokeColor=#00F0FF;strokeWidth=2;" vertex="1" parent="1"><mxGeometry x="12" y="10" width="${pw - 24}" height="${ph - 20}" as="geometry"/></mxCell>`
    );
  }

  // Clean Google Cloud Architecture Poster Top Lockup (Matching Reference Poster 1:1)
  const hdrFill = params.isDarkTheme ? '#111827' : '#FFFFFF';
  const hdrStroke = params.isDarkTheme ? '#00F0FF' : 'none';
  const hdrTitleColor = params.isDarkTheme ? '#00F0FF' : '#0F172A';
  const hdrSubColor = params.isDarkTheme ? '#00FF66' : '#475569';
  const gcpCloudLogoSvg =
    `<svg width="34" height="26" viewBox="0 0 32 24" fill="none" style="vertical-align:middle;margin-right:10px;">` +
    `<path d="M25.2 10.2C24.4 5.6 20.4 2 15.5 2c-4.2 0-7.9 2.6-9.3 6.3C2.7 9 0 12.1 0 15.8 0 20 3.4 23.4 7.6 23.4h17.2c3.9 0 7.2-3.2 7.2-7.1 0-3.6-2.8-6.6-6.8-6.1z" fill="#E8F0FE"/>` +
    `<circle cx="10" cy="13" r="4.2" fill="#EA4335"/>` +
    `<circle cx="16.5" cy="10" r="4.8" fill="#4285F4"/>` +
    `<circle cx="22.5" cy="14" r="4.2" fill="#34A853"/>` +
    `<circle cx="15.5" cy="16.5" r="3.8" fill="#FBBC05"/>` +
    `</svg>`;

  const resolvedHeaderTitle = params.headerTitle || params.diagramName;
  const hdrHtml =
    `<div style="width:${pw - 44}px;box-sizing:border-box;display:flex;align-items:center;justify-content:flex-start;padding:4px 12px;font-family:Inter,system-ui,sans-serif;">` +
    `<div style="display:flex;align-items:center;flex-wrap:nowrap;">` +
    gcpCloudLogoSvg +
    `<span style="font-size:21px;font-weight:700;color:${hdrSubColor};letter-spacing:-0.2px;">Google Cloud</span>` +
    `<span style="font-size:24px;font-weight:300;color:#CBD5E1;margin:0 14px;">|</span>` +
    `<span style="font-size:21px;font-weight:800;color:${hdrTitleColor};letter-spacing:-0.3px;">${esc(resolvedHeaderTitle)}</span>` +
    `</div>` +
    (params.state.step >= 10
      ? `<div style="margin-left:14px;font-size:9.5px;font-weight:600;color:${hdrSubColor};">${esc(params.headerSubtitle)}</div>`
      : '') +
    `</div>`;

  cells.push(
    `        <mxCell id="hdr_title" value="${esc(hdrHtml)}" style="rounded=0;whiteSpace=wrap;html=1;fillColor=${hdrFill};strokeColor=${hdrStroke};verticalAlign=middle;align=left;" vertex="1" parent="1"><mxGeometry x="22" y="14" width="${pw - 44}" height="52" as="geometry"/></mxCell>`
  );

  // Containers (100% Full-Width Edge-to-Edge Solid Architecture-Center Header Bars with 2-Line Bold Headers Matching Reference Poster)
  for (const c of params.containers) {
    const dashStyle = c.dashed ? 'dashed=1;dashPattern=8 4;' : '';
    const isSolidHeaderTier = !c.dashed && !params.isDarkTheme;
    const cHtml = isSolidHeaderTier
      ? `<div style="width:${c.w - 4}px;box-sizing:border-box;font-family:Inter,system-ui,sans-serif;text-align:center;">` +
        `<div style="width:100%;box-sizing:border-box;background:${c.stroke};color:#FFFFFF;padding:10px 14px;border-radius:6px 6px 0 0;">` +
        `<div style="font-size:15.5px;font-weight:800;line-height:1.25;letter-spacing:0.1px;max-width:265px;margin:0 auto;">${esc(c.title)}</div>` +
        (c.subtitle
          ? `<div style="font-size:9.5px;font-weight:500;color:#F1F5F9;margin-top:2px;">${esc(c.subtitle)}</div>`
          : '') +
        `</div>` +
        `</div>`
      : `<div style="width:${c.w - 8}px;box-sizing:border-box;padding:6px 10px;text-align:left;font-family:Inter,system-ui,sans-serif;">` +
        `<div style="font-size:10.5px;font-weight:800;color:${c.headerColor};letter-spacing:0.4px;text-transform:uppercase;">${esc(c.title)}</div>` +
        (c.subtitle
          ? `<div style="font-size:9px;font-weight:600;color:${params.isDarkTheme ? '#94A3B8' : '#64748B'};margin-top:1px;">${esc(c.subtitle)}</div>`
          : '') +
        `</div>`;
    cells.push(
      `        <mxCell id="${c.id}" value="${esc(cHtml)}" style="rounded=1;arcSize=3;whiteSpace=wrap;html=1;fillColor=${c.fill};strokeColor=${c.stroke};strokeWidth=2.2;${dashStyle}verticalAlign=top;align=center;spacing=0;spacingTop=0;" vertex="1" parent="1"><mxGeometry x="${c.x}" y="${c.y}" width="${c.w}" height="${c.h}" as="geometry"/></mxCell>`
    );
  }

  // Component Nodes (100% Clean Poster Cards & True 3D Cylinder3 Databases with Centered Hero Brand SVGs)
  for (const n of activeNodes) {
    const titleColor = n.textColor || (params.isDarkTheme ? '#F8FAFC' : '#0F172A');
    const subColor = params.isDarkTheme ? '#CBD5E1' : '#1E293B';
    let shapeStyle = 'rounded=1;arcSize=8;';
    if (n.shape === 'rhombus') {
      shapeStyle = 'shape=rhombus;perimeter=rhombusPerimeter;whiteSpace=wrap;html=1;';
    } else if (n.shape === 'hexagon') {
      shapeStyle = 'shape=hexagon;perimeter=hexagonPerimeter2;whiteSpace=wrap;html=1;fixedSize=1;size=14;';
    } else if (n.shape === 'cylinder') {
      shapeStyle = 'shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=14;';
    }

    const showHeroLogo = n.heroLogo !== false && !(n.cleanPosterCard && !n.heroLogo);
    const vAlign = n.verticalAlignTop ? 'top' : 'middle';
    const topPad = n.shape === 'cylinder' ? '18px' : n.verticalAlignTop ? '16px' : '8px';
    const titleFontSize = n.cleanPosterCard
      ? n.shape === 'cylinder'
        ? '14.5px'
        : !showHeroLogo && n.h < 110
          ? '13.5px'
          : !showHeroLogo && n.h >= 200
            ? '17px'
            : !showHeroLogo
              ? '16px'
              : n.h >= 200
                ? '16px'
                : '14.5px'
      : '12.5px';
    const titleMaxWidth = n.cleanPosterCard
      ? n.shape === 'cylinder'
        ? 135
        : n.verticalAlignTop
          ? 112
          : !showHeroLogo && n.h < 110
            ? 122
            : !showHeroLogo && n.h >= 200
              ? 95
              : n.w <= 155
                ? 105
                : 138
      : Math.max(120, n.w - 20);
    const subFontSize = n.cleanPosterCard ? '12.5px' : '9.5px';
    const subMaxWidth = n.cleanPosterCard ? Math.min(130, n.w - 18) : Math.max(120, n.w - 20);
    const subHtml = n.subtitle
      ? `<div style="font-size:${subFontSize};font-weight:500;color:${subColor};margin:3px auto 0 auto;max-width:${subMaxWidth}px;line-height:1.22;">${esc(n.subtitle)}</div>`
      : '';

    const cylinderShiftStyle = n.cleanPosterCard && n.shape === 'cylinder' ? 'transform:translateX(12px);' : '';
    const nodeHtml = showHeroLogo
      ? `<div style="padding:${topPad} 8px 6px 8px;text-align:center;font-family:Inter,system-ui,sans-serif;line-height:1.2;">` +
        renderChainNodeHeroSvgLogo(n, params.isDarkTheme) +
        `<div style="font-size:${titleFontSize};font-weight:800;color:${titleColor};margin:3px auto 0 auto;max-width:${titleMaxWidth}px;${cylinderShiftStyle}">${esc(n.title)}</div>` +
        subHtml +
        `</div>`
      : `<div style="padding:${topPad} 8px 8px 8px;text-align:center;font-family:Inter,system-ui,sans-serif;line-height:1.22;">` +
        `<div style="font-size:${titleFontSize};font-weight:800;color:${titleColor};margin:0 auto;max-width:${titleMaxWidth}px;">${esc(n.title)}</div>` +
        subHtml +
        `</div>`;

    cells.push(
      `        <mxCell id="${n.id}" value="${esc(nodeHtml)}" style="${shapeStyle}whiteSpace=wrap;html=1;fillColor=${n.fill};strokeColor=${n.stroke};strokeWidth=2.2;verticalAlign=${vAlign};align=center;spacingTop=0;" vertex="1" parent="1"><mxGeometry x="${n.x}" y="${n.y}" width="${n.w}" height="${n.h}" as="geometry"/></mxCell>`
    );
  }

  // Group parallel/bidirectional edges by undirected node pair to spread exit/entry ports (0.32 vs 0.68)
  const pairGroups = new Map<string, EdgeSpec[]>();
  for (const e of filteredEdges) {
    const pairKey = [e.source, e.target].sort().join('::');
    const list = pairGroups.get(pairKey) || [];
    list.push(e);
    pairGroups.set(pairKey, list);
  }

  // Edges (Rounded Pill Capsules Matching Reference Poster with Clean 2-Line Stacking)
  for (const e of filteredEdges) {
    const dashPart = e.dashed ? 'dashed=1;dashPattern=6 4;' : '';
    const sw = e.strokeWidth || 2.2;
    const lblBg = e.labelBg || (params.isDarkTheme ? '#0F172A' : '#FFFFFF');
    const lblBorder = e.labelBorder || e.stroke;
    const lblColor = e.labelColor || (params.isDarkTheme ? '#00FF66' : '#0F172A');
    const edgeStylePart = 'edgeStyle=orthogonalEdgeStyle;rounded=1;';

    let portPart = '';
    if (typeof e.exitX === 'number' && typeof e.exitY === 'number') {
      portPart += `exitX=${e.exitX};exitY=${e.exitY};exitDx=0;exitDy=0;`;
    }
    if (typeof e.entryX === 'number' && typeof e.entryY === 'number') {
      portPart += `entryX=${e.entryX};entryY=${e.entryY};entryDx=0;entryDy=0;`;
    }
    const sNode = nodeMap.get(e.source);
    const tNode = nodeMap.get(e.target);
    if (!portPart && (!e.waypoints || e.waypoints.length === 0)) {
      const pairKey = [e.source, e.target].sort().join('::');
      const siblings = pairGroups.get(pairKey) || [];
      if (siblings.length > 1 && sNode && tNode) {
        const idx = siblings.indexOf(e);
        const offset = idx === 0 ? 0.32 : 0.68;
        const dx = Math.abs(sNode.x + sNode.w / 2 - (tNode.x + tNode.w / 2));
        const dy = Math.abs(sNode.y + sNode.h / 2 - (tNode.y + tNode.h / 2));
        if (dx >= dy) {
          const sRight = sNode.x < tNode.x;
          portPart = `exitX=${sRight ? 1 : 0};exitY=${offset};exitDx=0;exitDy=0;entryX=${sRight ? 0 : 1};entryY=${offset};entryDx=0;entryDy=0;`;
        } else {
          const sDown = sNode.y < tNode.y;
          portPart = `exitX=${offset};exitY=${sDown ? 1 : 0};exitDx=0;exitDy=0;entryX=${offset};entryY=${sDown ? 0 : 1};entryDx=0;entryDy=0;`;
        }
      }
    }

    let geomInner = '<mxGeometry relative="1" as="geometry"/>';
    if (e.waypoints && e.waypoints.length > 0) {
      const pts = e.waypoints.map((pt) => `<mxPoint x="${pt.x}" y="${pt.y}"/>`).join('');
      geomInner = `<mxGeometry relative="1" as="geometry"><Array as="points">${pts}</Array></mxGeometry>`;
    }

    let formattedEdgeLabelHtml = esc(e.label);
    if (!e.label.startsWith('/') && /^[A-Za-z0-9]+\/[A-Za-z0-9]+$/.test(e.label)) {
      const [part1, part2] = e.label.split('/');
      formattedEdgeLabelHtml = `${esc(part1)}/<br/>${esc(part2)}`;
    } else if (/\s:[0-9]+$/.test(e.label)) {
      const idx = e.label.lastIndexOf(' :');
      formattedEdgeLabelHtml = `${esc(e.label.slice(0, idx))}<br/>${esc(e.label.slice(idx + 1))}`;
    }

    const pillHtml = `<div style="display:inline-block;background:${lblBg};border:1.6px solid ${lblBorder};border-radius:10px;padding:2px 7px;font-family:Inter,system-ui,sans-serif;font-size:10px;font-weight:700;color:${lblColor};text-align:center;white-space:nowrap;line-height:1.15;">${formattedEdgeLabelHtml}</div>`;

    cells.push(
      `        <mxCell id="${e.id}" value="${esc(pillHtml)}" style="${edgeStylePart}${portPart}html=1;strokeColor=${e.stroke};strokeWidth=${sw};${dashPart}endArrow=block;endFill=1;fontSize=10;fontStyle=1;fontColor=${lblColor};labelBackgroundColor=none;labelBorderColor=none;" edge="1" parent="1" source="${e.source}" target="${e.target}">${geomInner}</mxCell>`
    );
  }

  const themeAttr = params.isDarkTheme ? ' data-theme="dark-neon" data-canvas-theme="dark"' : '';
  return [
    `<mxfile host="app.diagrams.net" modified="${new Date().toISOString()}" agent="PromptCanvas-CompositionalChainCompiler" version="24.0.0">`,
    `  <diagram id="${params.diagramId}" name="${esc(params.diagramName)}" data-compositional-chain="true" data-chain-domain="${params.state.domain}" data-chain-step="${params.state.step}" data-chain-state-json="${stateJsonEsc}">`,
    `    <mxGraphModel dx="${pw}" dy="${ph}" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="${pw}" pageHeight="${ph}" background="${bg}" math="0" shadow="0" data-arch-type="compositional_chain_architecture"${themeAttr}>`,
    `      <root>`,
    `        <mxCell id="0"/>`,
    `        <mxCell id="1" parent="0"/>`,
    ...cells,
    `      </root>`,
    `    </mxGraphModel>`,
    `  </diagram>`,
    `</mxfile>`,
  ].join('\n');
}

// ============================================================================
// CHAIN 1 BUILDER: CLOUD-NATIVE WEB APPLICATION (DECOMPILED FROM NANO BANANA IMAGE 2)
// ============================================================================
function buildChain1CloudNativeWeb(state: CompositionalChainState): string {
  const f = state.flags;
  const dark = Boolean(f.c1_darkNeonDashed);
  const neonBlue = '#00F0FF';
  const neonGreen = '#00FF66';
  const hasBottomOpsRow = Boolean(f.c1_prometheusGrafana || f.c1_rabbitMqWorker);
  const posterSpec = NANO_BANANA_3TIER_VISION_DECOMPILED_SPEC;

  // Decompile base 3-tier swimlane containers directly from NANO_BANANA_3TIER_VISION_DECOMPILED_SPEC
  const containers: ContainerSpec[] = posterSpec.containers.map((vc) => {
    const rect = normalizedBoxToCanvasRect(vc.box2d, posterSpec.canvasWidth, posterSpec.canvasHeight);
    const isTier2 = vc.id === 'c1_tier_backend';
    return {
      id: vc.id,
      title: vc.title,
      x: rect.x,
      y: rect.y,
      w: rect.w,
      h: rect.h,
      fill: dark ? (isTier2 ? '#0D1B2A' : '#0B132B') : vc.fillHex,
      stroke: dark ? (isTier2 ? neonGreen : neonBlue) : vc.strokeHex,
      headerColor: dark ? (isTier2 ? neonGreen : neonBlue) : vc.headerBgHex,
    };
  });

  if (f.c1_kubernetesCluster) {
    containers.push({
      id: 'c1_k8s_cluster_box',
      title: '☸️ Kubernetes Cluster (K8s Deployment Infrastructure)',
      subtitle: 'Auto-Scaling Backend Microservice Pods & Service Mesh',
      x: 745,
      y: 142,
      w: 280,
      h: 398,
      fill: dark ? '#111827' : '#ECFDF5',
      stroke: dark ? neonGreen : '#059669',
      headerColor: dark ? neonGreen : '#047857',
      dashed: true,
    });
  }

  if (hasBottomOpsRow) {
    containers.push({
      id: 'c1_tier_ops_async',
      title: 'Asynchronous Task Processing (RabbitMQ + Workers) & Observability Stack (Prometheus + Grafana)',
      x: 30,
      y: 585,
      w: 1540,
      h: 265,
      fill: dark ? '#0D1B2A' : '#FFFBEB',
      stroke: dark ? neonGreen : '#D97706',
      headerColor: dark ? neonGreen : '#B45309',
    });
  }

  const nodes: NodeSpec[] = [];
  const edges: EdgeSpec[] = [];

  // Helper to resolve a decompiled node from NANO_BANANA_3TIER_VISION_DECOMPILED_SPEC
  const decompilePosterNode = (nodeId: string): NodeSpec => {
    const vn = posterSpec.nodes.find((n) => n.id === nodeId)!;
    const rect = normalizedBoxToCanvasRect(vn.box2d, posterSpec.canvasWidth, posterSpec.canvasHeight);
    return {
      id: vn.id,
      badge: vn.badge,
      title: vn.title,
      subtitle: vn.subtitle || '',
      x: rect.x,
      y: rect.y,
      w: rect.w,
      h: rect.h,
      shape: vn.shape,
      fill: dark ? (vn.id === 'c1_react_rest_client' ? '#0F172A' : '#1E293B') : vn.fillHex,
      stroke: dark ? (vn.strokeHex === '#16A34A' ? neonGreen : neonBlue) : vn.strokeHex,
      badgeColor: dark ? (vn.strokeHex === '#16A34A' ? neonGreen : neonBlue) : vn.badgeColorHex,
      heroLogo: vn.heroLogo,
      verticalAlignTop: vn.verticalAlignTop,
      cleanPosterCard: true,
    };
  };

  // =========================================================================
  // TIER 1 (LEFT SWIMLANE): Decompiled Left-to-Right Client -> React 19 SPA (with nested TanStack Query REST Client)
  // =========================================================================
  const t1LeftId = f.c1_cdn ? 'c1_cdn_node' : 'c1_client_browser';
  if (f.c1_cdn) {
    const clientRect = normalizedBoxToCanvasRect(
      posterSpec.nodes.find((n) => n.id === 'c1_client_browser')!.box2d,
      posterSpec.canvasWidth,
      posterSpec.canvasHeight
    );
    nodes.push({
      id: 'c1_cdn_node',
      badge: 'GLOBAL EDGE CDN',
      title: 'CDN (Content Delivery Network)',
      subtitle: 'Global Edge Static Asset Caching & TLS 1.3',
      x: clientRect.x,
      y: clientRect.y,
      w: clientRect.w,
      h: clientRect.h,
      fill: dark ? '#1E293B' : '#FFFFFF',
      stroke: dark ? neonBlue : '#2563EB',
      badgeColor: dark ? neonBlue : '#1D4ED8',
      heroLogo: true,
      cleanPosterCard: true,
    });
  } else {
    nodes.push(decompilePosterNode('c1_client_browser'));
  }

  nodes.push(decompilePosterNode('c1_react_frontend'), decompilePosterNode('c1_react_rest_client'));

  edges.push({
    id: 'e_c1_t1_left_to_react',
    source: t1LeftId,
    target: 'c1_react_frontend',
    label: f.c1_cdn ? 'Static Assets' : 'HTTPS',
    stroke: dark ? neonBlue : '#1E293B',
    dashed: dark,
    exitX: 1,
    exitY: 0.5,
    entryX: 0,
    entryY: 0.48,
  });

  // =========================================================================
  // TIER 2 (CENTER SWIMLANE): Decompiled Left-to-Right API Gateway / Node.js Backend -> Prisma ORM & PgBouncer Pool
  // =========================================================================
  if (f.c1_loadBalancer) {
    nodes.push({
      id: 'c1_load_balancer',
      badge: 'L7 TRAFFIC ROUTER',
      title: 'Application Load Balancer',
      subtitle: 'L7 Reverse Proxy & Health Checks',
      x: 558,
      y: 275,
      w: 168,
      h: 106,
      fill: dark ? '#1E293B' : '#FFFFFF',
      stroke: dark ? neonGreen : '#0D9488',
      badgeColor: dark ? neonGreen : '#0F766E',
      heroLogo: true,
      cleanPosterCard: true,
    });
    edges.push({
      id: 'e_c1_react_lb',
      source: 'c1_react_frontend',
      target: 'c1_load_balancer',
      label: 'HTTPS (:443)',
      stroke: dark ? neonBlue : '#2563EB',
      dashed: dark,
    });
  }

  if (f.c1_splitAuthCore) {
    const t2ColX = f.c1_loadBalancer ? 756 : 568;
    const t2ColW = f.c1_loadBalancer ? 260 : 445;
    nodes.push(
      {
        id: 'c1_auth_service',
        badge: f.c1_kubernetesCluster ? 'K8S POD • NODE.JS AUTH' : 'NODE.JS MICROSERVICE 1',
        title: 'Authentication Service (Node.js)',
        subtitle: 'OAuth2 / JWT Issuance, Session Validation & RBAC Guard',
        x: t2ColX,
        y: 162,
        w: t2ColW,
        h: 92,
        fill: dark ? '#1E293B' : '#FFFFFF',
        stroke: dark ? neonGreen : '#16A34A',
        badgeColor: dark ? neonGreen : '#15803D',
        heroLogo: true,
        cleanPosterCard: true,
      },
      {
        id: 'c1_core_api_service',
        badge: f.c1_kubernetesCluster ? 'K8S POD • NODE.JS CORE API' : 'NODE.JS MICROSERVICE 2',
        title: 'Core API Service (Node.js)',
        subtitle: 'Business Domain Logic, Media Uploads & Async Task Producer',
        x: t2ColX,
        y: 282,
        w: t2ColW,
        h: 96,
        fill: dark ? '#1E293B' : '#FFFFFF',
        stroke: dark ? neonGreen : '#16A34A',
        badgeColor: dark ? neonGreen : '#15803D',
        heroLogo: true,
        cleanPosterCard: true,
      },
      {
        id: 'c1_prisma_pgbouncer',
        badge: 'DATA ACCESS & CONNECTION POOL',
        title: 'Prisma ORM / PgBouncer Connection Pool',
        subtitle: 'Parameterized SQL Builder & Transaction Pool',
        x: t2ColX,
        y: 408,
        w: t2ColW,
        h: 94,
        fill: dark ? '#1E293B' : '#FFFFFF',
        stroke: dark ? neonGreen : '#0D9488',
        badgeColor: dark ? neonGreen : '#0F766E',
        heroLogo: true,
        cleanPosterCard: true,
      }
    );

    const ingressSource = f.c1_loadBalancer ? 'c1_load_balancer' : 'c1_react_frontend';
    edges.push(
      {
        id: 'e_c1_in_auth',
        source: ingressSource,
        target: 'c1_auth_service',
        label: '/auth/* JWT Route',
        stroke: dark ? neonGreen : '#16A34A',
        dashed: dark,
      },
      {
        id: 'e_c1_in_core',
        source: ingressSource,
        target: 'c1_core_api_service',
        label: '/api/* Core Route',
        stroke: dark ? neonGreen : '#16A34A',
        dashed: dark,
      },
      {
        id: 'e_c1_core_to_pool',
        source: 'c1_core_api_service',
        target: 'c1_prisma_pgbouncer',
        label: 'ORM Transaction Call',
        stroke: dark ? neonGreen : '#0D9488',
        dashed: dark,
      }
    );
  } else if (f.c1_loadBalancer) {
    nodes.push(
      {
        id: 'c1_api_gateway_limiter',
        badge: 'API INGRESS & RATE LIMITER',
        title: 'Express/NestJS API Gateway & Rate Limiter',
        subtitle: 'CORS Policy & Token-Bucket Rate Limiter',
        x: 756,
        y: 156,
        w: 260,
        h: 94,
        fill: dark ? '#1E293B' : '#FFFFFF',
        stroke: dark ? neonGreen : '#16A34A',
        badgeColor: dark ? neonGreen : '#15803D',
        heroLogo: false,
        cleanPosterCard: true,
      },
      {
        id: 'c1_nodejs_backend',
        badge: 'NODE.JS 22 LTS',
        title: 'Node.js 22 LTS Backend API Server',
        subtitle: '',
        x: 756,
        y: 278,
        w: 260,
        h: 98,
        fill: dark ? '#1E293B' : '#FFFFFF',
        stroke: dark ? neonGreen : '#16A34A',
        badgeColor: dark ? neonGreen : '#15803D',
        heroLogo: true,
        cleanPosterCard: true,
      },
      {
        id: 'c1_prisma_pgbouncer',
        badge: 'ORM & CONNECTION POOL',
        title: 'Prisma ORM / PgBouncer Connection Pool',
        subtitle: '',
        x: 756,
        y: 408,
        w: 260,
        h: 94,
        fill: dark ? '#1E293B' : '#FFFFFF',
        stroke: dark ? neonGreen : '#0D9488',
        badgeColor: dark ? neonGreen : '#0F766E',
        heroLogo: true,
        cleanPosterCard: true,
      }
    );
    edges.push(
      {
        id: 'e_c1_lb_to_gw',
        source: 'c1_load_balancer',
        target: 'c1_api_gateway_limiter',
        label: 'L7 Proxied Traffic',
        stroke: dark ? neonGreen : '#0D9488',
        dashed: dark,
      },
      {
        id: 'e_c1_gw_to_node',
        source: 'c1_api_gateway_limiter',
        target: 'c1_nodejs_backend',
        label: 'Validated Route',
        stroke: dark ? neonGreen : '#16A34A',
        dashed: dark,
      },
      {
        id: 'e_c1_node_to_pool',
        source: 'c1_nodejs_backend',
        target: 'c1_prisma_pgbouncer',
        label: 'ORM Query',
        stroke: dark ? neonGreen : '#0D9488',
        dashed: dark,
      }
    );
  } else {
    // Decompile Tier 2 nodes & edges directly from NANO_BANANA_3TIER_VISION_DECOMPILED_SPEC
    nodes.push(
      decompilePosterNode('c1_api_gateway_limiter'),
      decompilePosterNode('c1_nodejs_backend'),
      decompilePosterNode('c1_prisma_pgbouncer')
    );

    const t2EdgeIds = [
      'e_c1_react_to_gw',
      'e_c1_react_to_node',
      'e_c1_rest_client_to_node',
      'e_c1_gw_to_node',
      'e_c1_node_to_pool',
    ];
    for (const eid of t2EdgeIds) {
      const ve = posterSpec.edges.find((e) => e.id === eid)!;
      edges.push({
        id: ve.id,
        source: ve.source,
        target: ve.target,
        label: ve.label,
        stroke: dark ? (ve.source.includes('react') ? neonBlue : neonGreen) : ve.strokeHex,
        dashed: dark,
        exitX: ve.exitX,
        exitY: ve.exitY,
        entryX: ve.entryX,
        entryY: ve.entryY,
      });
    }
  }

  const primaryBackendId = f.c1_splitAuthCore ? 'c1_core_api_service' : 'c1_nodejs_backend';
  const authBackendId = f.c1_splitAuthCore ? 'c1_auth_service' : 'c1_api_gateway_limiter';

  // =========================================================================
  // TIER 3 (RIGHT SWIMLANE): Left-to-Right 2-Column Spatial Topology (Never 3x3 Horizontal Bricks)
  // =========================================================================
  if (f.c1_redis) {
    nodes.push(
      {
        id: 'c1_redis_cache',
        badge: 'IN-MEMORY CACHE LAYER',
        title: 'Redis Caching Layer',
        subtitle: 'Sub-ms Key-Value Query & Session Cache',
        x: 1114,
        y: 152,
        w: 180,
        h: 145,
        shape: 'cylinder',
        fill: dark ? '#1E293B' : '#FFFFFF',
        stroke: dark ? neonBlue : '#DC2626',
        badgeColor: dark ? neonBlue : '#B91C1C',
        heroLogo: true,
        cleanPosterCard: true,
      },
      {
        id: 'c1_postgresql_db',
        badge: 'PRIMARY RELATIONAL DB',
        title: 'PostgreSQL 16 Primary Relational Database',
        subtitle: '',
        x: 1114,
        y: 322,
        w: 180,
        h: 218,
        shape: 'cylinder',
        fill: dark ? '#1E293B' : '#FFFFFF',
        stroke: dark ? neonBlue : '#7C3AED',
        badgeColor: dark ? neonBlue : '#6D28D9',
        heroLogo: true,
        cleanPosterCard: true,
      },
      {
        id: 'c1_postgres_read_replica',
        badge: 'STREAMING READ REPLICA',
        title: 'PostgreSQL Streaming Read Replica',
        subtitle: '',
        x: 1372,
        y: 152,
        w: 180,
        h: 195,
        shape: 'cylinder',
        fill: dark ? '#1E293B' : '#FFFFFF',
        stroke: dark ? neonBlue : '#7C3AED',
        badgeColor: dark ? neonBlue : '#6D28D9',
        heroLogo: true,
        cleanPosterCard: true,
      },
      {
        id: f.c1_objectStorageS3 ? 'c1_s3_object_storage' : 'c1_postgres_wal_backup',
        badge: f.c1_objectStorageS3 ? 'MEDIA OBJECT STORAGE' : 'DISASTER RECOVERY & PITR ARCHIVE',
        title: f.c1_objectStorageS3 ? 'Object Storage Service (AWS S3)' : 'Automated WAL Archive & PITR Backups',
        subtitle: f.c1_objectStorageS3 ? 'Durable Media Blob Storage' : '',
        x: 1372,
        y: 378,
        w: 180,
        h: 162,
        shape: 'cylinder',
        fill: dark ? '#1E293B' : '#F3E8FF',
        stroke: dark ? neonGreen : '#7C3AED',
        badgeColor: dark ? neonGreen : '#5B21B6',
        heroLogo: true,
        cleanPosterCard: true,
      }
    );

    edges.push(
      {
        id: 'e_c1_api_redis',
        source: authBackendId,
        target: 'c1_redis_cache',
        label: '1. Cache Lookup (Redis :6379)',
        stroke: dark ? neonBlue : '#EA580C',
        dashed: true,
      },
      {
        id: 'e_c1_redis_pg',
        source: 'c1_redis_cache',
        target: 'c1_postgresql_db',
        label: '2. Cache Miss -> SQL Read',
        stroke: dark ? neonGreen : '#7C3AED',
        dashed: dark,
      },
      {
        id: 'e_c1_pool_pg',
        source: 'c1_prisma_pgbouncer',
        target: 'c1_postgresql_db',
        label: 'SQL Queries (TCP :5432)',
        stroke: dark ? neonBlue : '#1E293B',
        dashed: dark,
      },
      {
        id: 'e_c1_pg_to_replica',
        source: 'c1_postgresql_db',
        target: 'c1_postgres_read_replica',
        label: 'WAL Replication',
        stroke: dark ? neonGreen : '#1E293B',
        dashed: dark,
      },
      {
        id: f.c1_objectStorageS3 ? 'e_c1_core_s3' : 'e_c1_pg_to_backup',
        source: f.c1_objectStorageS3 ? primaryBackendId : 'c1_postgresql_db',
        target: f.c1_objectStorageS3 ? 'c1_s3_object_storage' : 'c1_postgres_wal_backup',
        label: f.c1_objectStorageS3 ? 'Store User-Uploaded Media' : 'Backup Data',
        stroke: dark ? neonGreen : '#6D28D9',
        dashed: true,
      }
    );
  } else {
    // Decompile Tier 3 nodes & edges directly from NANO_BANANA_3TIER_VISION_DECOMPILED_SPEC
    nodes.push(
      decompilePosterNode('c1_postgresql_db'),
      decompilePosterNode('c1_postgres_read_replica'),
      decompilePosterNode('c1_postgres_wal_backup')
    );

    const t3EdgeIds = [
      'e_c1_pool_to_pg_top',
      'e_c1_pool_to_pg',
      'e_c1_pg_to_replica',
      'e_c1_pg_to_backup',
    ];
    for (const eid of t3EdgeIds) {
      const ve = posterSpec.edges.find((e) => e.id === eid)!;
      const waypoints = ve.waypointsNormalized?.map(([ wy, wx ]) => ({
        x: Math.round((wx / 1000) * posterSpec.canvasWidth),
        y: Math.round((wy / 1000) * posterSpec.canvasHeight),
      }));
      edges.push({
        id: ve.id,
        source: ve.source,
        target: ve.target,
        label: ve.label,
        stroke: dark ? (ve.id === 'e_c1_pg_to_replica' ? neonGreen : neonBlue) : ve.strokeHex,
        dashed: dark,
        exitX: ve.exitX,
        exitY: ve.exitY,
        entryX: ve.entryX,
        entryY: ve.entryY,
        waypoints,
      });
    }
  }

  // Monitoring & Async Workers (Bottom Row when active)
  if (f.c1_prometheusGrafana) {
    nodes.push({
      id: 'c1_prometheus_grafana',
      badge: 'OBSERVABILITY & LOGGING STACK',
      title: 'Prometheus & Grafana Monitoring + Logging',
      subtitle: 'Real-Time Metrics Scraping, Dashboards & Centralized Service Logs',
      x: 65,
      y: 660,
      w: 480,
      h: 110,
      fill: dark ? '#1E293B' : '#FFFFFF',
      stroke: dark ? neonGreen : '#D97706',
      badgeColor: dark ? neonGreen : '#B45309',
    });
    edges.push({
      id: 'e_c1_mon_core',
      source: primaryBackendId,
      target: 'c1_prometheus_grafana',
      label: 'Metrics & Logs Stream',
      stroke: dark ? neonGreen : '#D97706',
      dashed: true,
    });
    if (f.c1_splitAuthCore) {
      edges.push({
        id: 'e_c1_mon_auth',
        source: 'c1_auth_service',
        target: 'c1_prometheus_grafana',
        label: 'Auth Metrics & Audit Logs',
        stroke: dark ? neonBlue : '#D97706',
        dashed: true,
      });
    }
  }

  if (f.c1_rabbitMqWorker) {
    nodes.push(
      {
        id: 'c1_rabbitmq_queue',
        badge: 'ASYNC MESSAGE BROKER',
        title: 'RabbitMQ Task Queue',
        subtitle: 'Durable AMQP Exchange & Async Job Queue Populated by Core API',
        x: 610,
        y: 660,
        w: 420,
        h: 110,
        fill: dark ? '#1E293B' : '#FFFFFF',
        stroke: dark ? neonBlue : '#EA580C',
        badgeColor: dark ? neonBlue : '#C2410C',
      },
      {
        id: 'c1_background_worker',
        badge: 'ASYNC BACKGROUND COMPUTE',
        title: 'Background Worker Process',
        subtitle: 'Pulls Async Tasks from RabbitMQ Queue & Processes Media/Jobs',
        x: 1100,
        y: 660,
        w: 430,
        h: 110,
        fill: dark ? '#1E293B' : '#FFFFFF',
        stroke: dark ? neonGreen : '#059669',
        badgeColor: dark ? neonGreen : '#047857',
      }
    );
    edges.push(
      {
        id: 'e_c1_core_rmq',
        source: primaryBackendId,
        target: 'c1_rabbitmq_queue',
        label: 'Enqueue Async Tasks',
        stroke: dark ? neonBlue : '#EA580C',
        dashed: true,
      },
      {
        id: 'e_c1_rmq_worker',
        source: 'c1_rabbitmq_queue',
        target: 'c1_background_worker',
        label: 'Pull Async Tasks',
        stroke: dark ? neonGreen : '#059669',
        dashed: true,
      }
    );
  }

  return renderDrawioFromSpecs({
    diagramId: 'compositional_chain_architecture',
    diagramName: `3-Tier Cloud-Native Web Application (v1.0.${state.step})`,
    state,
    headerTitle: '3-Tier Cloud-Native Web Application',
    headerSubtitle: dark
      ? 'Dark Neon Theme (#0F172A) • Neon Blue & Green Accents • Dashed Data-Flow Arrows • CDN • Load Balancer • K8s • Redis • Postgres • S3 • RabbitMQ'
      : 'React 19 Single-Page Application (SPA) • Express/NestJS API Gateway • Node.js 22 LTS Backend API • Prisma ORM & PgBouncer • PostgreSQL 16 Primary & Read Replica',
    isDarkTheme: dark,
    containers,
    nodes,
    edges,
    pageHeight: hasBottomOpsRow ? 880 : 585,
  });
}

// ============================================================================
// CHAIN 2 BUILDER: E-COMMERCE MICROSERVICES
// ============================================================================
function buildChain2EcommerceMicroservices(state: CompositionalChainState): string {
  const f = state.flags;
  const vertical = Boolean(f.c2_verticalLayout);
  const containers: ContainerSpec[] = [];
  const nodes: NodeSpec[] = [];
  const edges: EdgeSpec[] = [];

  if (f.c2_nextjsPolyglotStorefront && !vertical) {
    const posterSpec = NANO_BANANA_ECOMMERCE_MICROSERVICES_VISION_DECOMPILED_SPEC;
    for (const c of posterSpec.containers) {
      const rect = normalizedBoxToCanvasRect(c.box2d, posterSpec.canvasWidth, posterSpec.canvasHeight);
      containers.push({
        id: c.id,
        title: c.title,
        x: rect.x,
        y: rect.y,
        w: rect.w,
        h: rect.h,
        fill: c.fillHex,
        stroke: c.strokeHex,
        headerColor: c.headerBgHex,
      });
    }
    for (const vn of posterSpec.nodes) {
      const rect = normalizedBoxToCanvasRect(vn.box2d, posterSpec.canvasWidth, posterSpec.canvasHeight);
      nodes.push({
        id: vn.id,
        badge: vn.badge,
        title: vn.title,
        subtitle: vn.subtitle || '',
        x: rect.x,
        y: rect.y,
        w: rect.w,
        h: rect.h,
        shape: vn.shape,
        fill: vn.fillHex,
        stroke: vn.strokeHex,
        badgeColor: vn.badgeColorHex,
        heroLogo: vn.heroLogo,
        verticalAlignTop: vn.verticalAlignTop,
        cleanPosterCard: true,
      });
    }
    for (const ve of posterSpec.edges) {
      const waypoints = ve.waypointsNormalized?.map(([nx, ny]) => ({
        x: Math.round((nx / 1000) * posterSpec.canvasWidth),
        y: Math.round((ny / 1000) * posterSpec.canvasHeight),
      }));
      edges.push({
        id: ve.id,
        source: ve.source,
        target: ve.target,
        label: ve.label,
        stroke: ve.strokeHex,
        exitX: ve.exitX,
        exitY: ve.exitY,
        entryX: ve.entryX,
        entryY: ve.entryY,
        waypoints,
      });
    }

    return renderDrawioFromSpecs({
      diagramId: 'compositional_chain_architecture',
      diagramName: `E-Commerce Microservices Architecture (v1.0.${state.step})`,
      state,
      headerTitle: posterSpec.posterTitle,
      headerSubtitle:
        'Next.js 15 Storefront • Edge API Gateway • Catalog, Cart & Checkout Microservices • Polyglot Database-per-Service (MongoDB, Redis, PostgreSQL 16)',
      isDarkTheme: Boolean(f.c1_darkNeonDashed),
      containers,
      nodes,
      edges,
      pageWidth: posterSpec.canvasWidth,
      pageHeight: posterSpec.canvasHeight,
    });
  }

  if (vertical) {
    // VERTICAL FLOW (TOP-TO-BOTTOM) LAYOUT (Prompt 10)
    containers.push(
      {
        id: 'c2_v_public_subnet',
        title: 'Public Subnet (Edge DMZ — Client Apps, API Gateway & Identity Provider)',
        subtitle: 'North-South Ingress Tier • External Client Traffic & OAuth2/JWT Token Validation',
        x: 40,
        y: 86,
        w: 1520,
        h: 195,
        fill: '#EFF6FF',
        stroke: '#2563EB',
        headerColor: '#1D4ED8',
      },
      {
        id: 'c2_v_private_subnet',
        title: 'Private Subnet (Internal Security Boundary — Microservices, Apache Kafka Event Bus & Isolated Databases)',
        subtitle: 'Zero-Trust Internal Network • Database-per-Service Isolation & Async Pub/Sub',
        x: 40,
        y: 300,
        w: 1520,
        h: 630,
        fill: '#F0FDF4',
        stroke: '#16A34A',
        headerColor: '#15803D',
        dashed: true,
      }
    );

    // Top Row: Client Apps -> API Gateway + Central Identity Provider (Keycloak/Auth0) + Third-Party Payment Gateway
    nodes.push(
      {
        id: 'c2_client_apps',
        badge: 'TOP TIER • CLIENT APPS',
        title: 'External Client Applications',
        subtitle: 'Web Storefront & Mobile E-Commerce Apps',
        x: 75,
        y: 145,
        w: 310,
        h: 105,
        fill: '#FFFFFF',
        stroke: '#2563EB',
        badgeColor: '#1D4ED8',
      },
      {
        id: 'c2_api_gateway',
        badge: 'PUBLIC SUBNET • EDGE ROUTER',
        title: 'API Gateway (Edge Routing)',
        subtitle: 'Routes External Client Requests to Microservices',
        x: 455,
        y: 145,
        w: 340,
        h: 105,
        fill: '#FFFFFF',
        stroke: '#0284C7',
        badgeColor: '#0369A1',
      },
      {
        id: 'c2_identity_provider',
        badge: 'CENTRAL IDENTITY PROVIDER',
        title: 'Identity Provider (Keycloak / Auth0)',
        subtitle: 'Connected to API Gateway for OAuth2 / JWT Token Validation',
        x: 860,
        y: 145,
        w: 320,
        h: 105,
        fill: '#FFFFFF',
        stroke: '#7C3AED',
        badgeColor: '#6D28D9',
      },
      {
        id: 'c2_payment_gateway',
        badge: 'EXTERNAL THIRD-PARTY API',
        title: 'Third-Party Payment Gateway',
        subtitle: 'Direct PCI-DSS Payment Authorization with Order Service',
        x: 1235,
        y: 145,
        w: 295,
        h: 105,
        fill: '#FFFFFF',
        stroke: '#D97706',
        badgeColor: '#B45309',
      }
    );

    // Middle Row 1 inside Private Subnet: Microservices (User, Catalog, Order, Inventory, Notification)
    nodes.push(
      {
        id: 'c2_user_service',
        badge: 'PRIVATE SUBNET • MICROSERVICE',
        title: 'User Service',
        subtitle: 'Customer Profiles, Addresses & Auth State',
        x: 70,
        y: 365,
        w: 265,
        h: 100,
        fill: '#FFFFFF',
        stroke: '#16A34A',
        badgeColor: '#15803D',
      },
      {
        id: 'c2_catalog_service',
        badge: 'PRIVATE SUBNET • MICROSERVICE',
        title: 'Catalog Service',
        subtitle: 'Product Listings, SKUs, Pricing & Categories',
        x: 365,
        y: 365,
        w: 265,
        h: 100,
        fill: '#FFFFFF',
        stroke: '#16A34A',
        badgeColor: '#15803D',
      },
      {
        id: 'c2_order_service',
        badge: 'PRIVATE SUBNET • MICROSERVICE',
        title: 'Order Service',
        subtitle: 'Checkout Orchestration, Payment & Purchase Confirmation',
        x: 660,
        y: 365,
        w: 275,
        h: 100,
        fill: '#FFFFFF',
        stroke: '#16A34A',
        badgeColor: '#15803D',
      },
      {
        id: 'c2_inventory_service',
        badge: 'PRIVATE SUBNET • MICROSERVICE',
        title: 'Inventory Microservice',
        subtitle: 'Stock Verification & Reservation Before Order Confirmation',
        x: 965,
        y: 365,
        w: 265,
        h: 100,
        fill: '#FFFFFF',
        stroke: '#0D9488',
        badgeColor: '#0F766E',
      },
      {
        id: 'c2_notification_service',
        badge: 'PRIVATE SUBNET • MICROSERVICE',
        title: 'Notification Service',
        subtitle: 'Listens to Kafka Event Bus & Sends Order Emails to Users',
        x: 1260,
        y: 365,
        w: 270,
        h: 100,
        fill: '#FFFFFF',
        stroke: '#EA580C',
        badgeColor: '#C2410C',
      }
    );

    // Middle Row 2 inside Private Subnet: Apache Kafka Event Bus
    nodes.push({
      id: 'c2_kafka_bus',
      badge: 'ASYNC PUBLISH / SUBSCRIBE EVENT BUS',
      title: 'Apache Kafka Event Bus',
      subtitle: 'Asynchronous Pub/Sub Event Streaming Between Order, Inventory & Notification Services',
      x: 660,
      y: 525,
      w: 870,
      h: 92,
      fill: '#FFFBEB',
      stroke: '#EA580C',
      badgeColor: '#C2410C',
    });

    // Bottom Row inside Private Subnet: Database-per-Service (User DB, Catalog DB, Order DB, Inventory DB)
    nodes.push(
      {
        id: 'c2_user_db',
        badge: 'DATABASE-PER-SERVICE',
        title: 'User Service Database',
        subtitle: 'Isolated User Accounts & Credentials Store',
        x: 70,
        y: 780,
        w: 265,
        h: 110,
        shape: 'cylinder',
        fill: '#FFFFFF',
        stroke: '#2563EB',
        badgeColor: '#1D4ED8',
      },
      {
        id: 'c2_catalog_db',
        badge: 'DATABASE-PER-SERVICE',
        title: 'Catalog Service Database',
        subtitle: 'Isolated Product Catalog & Pricing Store',
        x: 365,
        y: 780,
        w: 265,
        h: 110,
        shape: 'cylinder',
        fill: '#FFFFFF',
        stroke: '#059669',
        badgeColor: '#047857',
      },
      {
        id: 'c2_order_db',
        badge: 'DATABASE-PER-SERVICE',
        title: 'Order Service Database',
        subtitle: 'Isolated ACID Orders & Transaction Ledger',
        x: 660,
        y: 780,
        w: 275,
        h: 110,
        shape: 'cylinder',
        fill: '#FFFFFF',
        stroke: '#7C3AED',
        badgeColor: '#6D28D9',
      },
      {
        id: 'c2_inventory_db',
        badge: 'DATABASE-PER-SERVICE',
        title: 'Inventory Database',
        subtitle: 'Isolated SKU Stock Counts & Reservations',
        x: 965,
        y: 780,
        w: 265,
        h: 110,
        shape: 'cylinder',
        fill: '#FFFFFF',
        stroke: '#0D9488',
        badgeColor: '#0F766E',
      }
    );

    edges.push(
      { id: 'e_c2_v1', source: 'c2_client_apps', target: 'c2_api_gateway', label: 'HTTPS Client Requests', stroke: '#2563EB' },
      { id: 'e_c2_v2', source: 'c2_api_gateway', target: 'c2_identity_provider', label: 'Validate JWT Token', stroke: '#7C3AED' },
      { id: 'e_c2_v3', source: 'c2_api_gateway', target: 'c2_user_service', label: 'Route /users', stroke: '#0284C7' },
      { id: 'e_c2_v4', source: 'c2_api_gateway', target: 'c2_catalog_service', label: 'Route /catalog', stroke: '#0284C7' },
      { id: 'e_c2_v5', source: 'c2_api_gateway', target: 'c2_order_service', label: 'Route /orders', stroke: '#0284C7' },
      { id: 'e_c2_v6', source: 'c2_order_service', target: 'c2_payment_gateway', label: 'Payment Charge API', stroke: '#D97706' },
      { id: 'e_c2_v7', source: 'c2_order_service', target: 'c2_kafka_bus', label: 'Publish OrderEvents', stroke: '#EA580C', dashed: true },
      { id: 'e_c2_v8', source: 'c2_kafka_bus', target: 'c2_inventory_service', label: 'Consume Stock Reserve', stroke: '#0D9488', dashed: true },
      { id: 'e_c2_v9', source: 'c2_kafka_bus', target: 'c2_notification_service', label: 'Order Update -> Send Email', stroke: '#EA580C', dashed: true },
      { id: 'e_c2_v10', source: 'c2_user_service', target: 'c2_user_db', label: 'Isolated User SQL', stroke: '#2563EB' },
      { id: 'e_c2_v11', source: 'c2_catalog_service', target: 'c2_catalog_db', label: 'Isolated Catalog Query', stroke: '#059669' },
      { id: 'e_c2_v12', source: 'c2_order_service', target: 'c2_order_db', label: 'Isolated Order SQL', stroke: '#7C3AED' },
      { id: 'e_c2_v13', source: 'c2_inventory_service', target: 'c2_inventory_db', label: 'Stock Deduct', stroke: '#0D9488' }
    );
  } else {
    // HORIZONTAL FLOW (LEFT-TO-RIGHT) LAYOUT (Steps 1..9)
    containers.push(
      {
        id: 'c2_h_public_zone',
        title: f.c2_privatePublicSubnets ? 'Public Subnet (Edge DMZ — API Gateway & Client Ingress)' : 'Tier 1: Client & Edge Gateway Layer',
        subtitle: 'External E-Commerce Traffic, API Gateway Routing & Identity Federation',
        x: 35,
        y: 88,
        w: 410,
        h: 825,
        fill: '#EFF6FF',
        stroke: '#2563EB',
        headerColor: '#1D4ED8',
      },
      {
        id: 'c2_h_private_zone',
        title: f.c2_privatePublicSubnets
          ? 'Private Subnet (Security Boundary — Internal Microservices, Event Bus & Isolated Databases)'
          : 'Tier 2 & 3: E-Commerce Domain Microservices, Event Bus & Persistence',
        subtitle: f.c2_privatePublicSubnets
          ? 'Isolated Private VPC Subnet • Only API Gateway Exposed in Public Subnet'
          : 'Decoupled Domain Services & Asynchronous Event Backbone',
        x: 470,
        y: 88,
        w: 1095,
        h: 825,
        fill: '#F0FDF4',
        stroke: '#16A34A',
        headerColor: '#15803D',
        dashed: Boolean(f.c2_privatePublicSubnets),
      }
    );

    nodes.push({
      id: 'c2_client_apps',
      badge: 'E-COMMERCE CLIENTS',
      title: 'Web & Mobile Shoppers',
      subtitle: 'Storefront UI • Browse Catalog, Cart & Checkout',
      x: 60,
      y: 350,
      w: 165,
      h: 105,
      fill: '#FFFFFF',
      stroke: '#2563EB',
      badgeColor: '#1D4ED8',
    });

    if (f.c2_apiGateway) {
      nodes.push({
        id: 'c2_api_gateway',
        badge: 'EDGE API GATEWAY',
        title: 'API Gateway',
        subtitle: 'Routes External Requests to User, Catalog & Order Services',
        x: 250,
        y: 350,
        w: 175,
        h: 105,
        fill: '#FFFFFF',
        stroke: '#0284C7',
        badgeColor: '#0369A1',
      });
      edges.push({
        id: 'e_c2_client_gw',
        source: 'c2_client_apps',
        target: 'c2_api_gateway',
        label: 'HTTPS Requests',
        stroke: '#2563EB',
      });
    }

    if (f.c2_identityProvider) {
      nodes.push({
        id: 'c2_identity_provider',
        badge: 'CENTRAL IDENTITY PROVIDER',
        title: 'Identity Provider (Keycloak / Auth0)',
        subtitle: 'OAuth2 / OIDC JWT Token Validation for API Gateway',
        x: 115,
        y: 165,
        w: 300,
        h: 105,
        fill: '#FFFFFF',
        stroke: '#7C3AED',
        badgeColor: '#6D28D9',
      });
      if (f.c2_apiGateway) {
        edges.push({
          id: 'e_c2_gw_idp',
          source: 'c2_api_gateway',
          target: 'c2_identity_provider',
          label: 'Token Validation',
          stroke: '#7C3AED',
        });
      }
    }

    // Core 3 Microservices
    nodes.push(
      {
        id: 'c2_user_service',
        badge: 'DOMAIN MICROSERVICE 1',
        title: 'User Service',
        subtitle: 'Customer Profiles, Authentication & Account Management',
        x: 505,
        y: 165,
        w: 255,
        h: 105,
        fill: '#FFFFFF',
        stroke: '#16A34A',
        badgeColor: '#15803D',
      },
      {
        id: 'c2_catalog_service',
        badge: 'DOMAIN MICROSERVICE 2',
        title: 'Catalog Service',
        subtitle: 'Product Listings, Search, Categories & Pricing Engine',
        x: 505,
        y: 350,
        w: 255,
        h: 105,
        fill: '#FFFFFF',
        stroke: '#16A34A',
        badgeColor: '#15803D',
      },
      {
        id: 'c2_order_service',
        badge: 'DOMAIN MICROSERVICE 3',
        title: 'Order Service',
        subtitle: 'Order Placement, Purchase Confirmation & Lifecycle State',
        x: 505,
        y: 535,
        w: 255,
        h: 105,
        fill: '#FFFFFF',
        stroke: '#16A34A',
        badgeColor: '#15803D',
      }
    );

    const routeSource = f.c2_apiGateway ? 'c2_api_gateway' : 'c2_client_apps';
    edges.push(
      { id: 'e_c2_rt_user', source: routeSource, target: 'c2_user_service', label: '/users API', stroke: '#0284C7' },
      { id: 'e_c2_rt_cat', source: routeSource, target: 'c2_catalog_service', label: '/catalog API', stroke: '#0284C7' },
      { id: 'e_c2_rt_ord', source: routeSource, target: 'c2_order_service', label: '/orders API', stroke: '#0284C7' }
    );

    if (f.c2_paymentGateway) {
      nodes.push({
        id: 'c2_payment_gateway',
        badge: 'THIRD-PARTY INTEGRATION',
        title: 'Third-Party Payment Gateway',
        subtitle: 'Direct Payment Authorization & Settlement with Order Service',
        x: 115,
        y: 535,
        w: 300,
        h: 105,
        fill: '#FFFFFF',
        stroke: '#D97706',
        badgeColor: '#B45309',
      });
      edges.push({
        id: 'e_c2_ord_pay',
        source: 'c2_order_service',
        target: 'c2_payment_gateway',
        label: 'Direct Payment Auth',
        stroke: '#D97706',
      });
    }

    if (f.c2_inventoryService) {
      nodes.push({
        id: 'c2_inventory_service',
        badge: 'DOMAIN MICROSERVICE 4',
        title: 'Inventory Microservice',
        subtitle: 'Verifies & Reserves SKU Stock Before Confirming Purchase',
        x: 505,
        y: 720,
        w: 255,
        h: 105,
        fill: '#FFFFFF',
        stroke: '#0D9488',
        badgeColor: '#0F766E',
      });
    }

    if (f.c2_kafkaEventBus) {
      nodes.push({
        id: 'c2_kafka_bus',
        badge: 'ASYNC EVENT BUS (PUB/SUB)',
        title: 'Apache Kafka Event Bus',
        subtitle: 'Asynchronous Publish/Subscribe Between Order & Inventory Services',
        x: 840,
        y: 535,
        w: 280,
        h: 105,
        fill: '#FFFBEB',
        stroke: '#EA580C',
        badgeColor: '#C2410C',
      });
      edges.push({
        id: 'e_c2_ord_kafka',
        source: 'c2_order_service',
        target: 'c2_kafka_bus',
        label: 'Publish OrderCreated',
        stroke: '#EA580C',
        dashed: true,
      });
      if (f.c2_inventoryService) {
        edges.push({
          id: 'e_c2_kafka_inv',
          source: 'c2_kafka_bus',
          target: 'c2_inventory_service',
          label: 'Subscribe OrderEvents',
          stroke: '#0D9488',
          dashed: true,
        });
      }
    } else if (f.c2_inventoryService) {
      edges.push({
        id: 'e_c2_ord_inv_direct',
        source: 'c2_order_service',
        target: 'c2_inventory_service',
        label: 'Check Stock Before Purchase',
        stroke: '#0D9488',
      });
    }

    if (f.c2_notificationService) {
      nodes.push({
        id: 'c2_notification_service',
        badge: 'ASYNC EMAIL DISPATCHER',
        title: 'Notification Service',
        subtitle: 'Listens to Kafka Event Bus for Order Updates & Sends User Emails',
        x: 840,
        y: 720,
        w: 280,
        h: 105,
        fill: '#FFFFFF',
        stroke: '#EA580C',
        badgeColor: '#C2410C',
      });
      if (f.c2_kafkaEventBus) {
        edges.push({
          id: 'e_c2_kafka_notif',
          source: 'c2_kafka_bus',
          target: 'c2_notification_service',
          label: 'Order Updates -> Send Email',
          stroke: '#EA580C',
          dashed: true,
        });
      }
    }

    if (f.c2_dbPerService) {
      nodes.push(
        {
          id: 'c2_user_db',
          badge: 'ISOLATED DATABASE 1',
          title: 'User Service Database',
          subtitle: 'Database-per-Service: Dedicated User Store',
          x: 1200,
          y: 165,
          w: 320,
          h: 105,
          shape: 'cylinder',
          fill: '#FFFFFF',
          stroke: '#2563EB',
          badgeColor: '#1D4ED8',
        },
        {
          id: 'c2_catalog_db',
          badge: 'ISOLATED DATABASE 2',
          title: 'Catalog Service Database',
          subtitle: 'Database-per-Service: Dedicated Product Store',
          x: 1200,
          y: 350,
          w: 320,
          h: 105,
          shape: 'cylinder',
          fill: '#FFFFFF',
          stroke: '#059669',
          badgeColor: '#047857',
        },
        {
          id: 'c2_order_db',
          badge: 'ISOLATED DATABASE 3',
          title: 'Order Service Database',
          subtitle: 'Database-per-Service: Dedicated Order Ledger',
          x: 1200,
          y: 535,
          w: 320,
          h: 105,
          shape: 'cylinder',
          fill: '#FFFFFF',
          stroke: '#7C3AED',
          badgeColor: '#6D28D9',
        }
      );
      edges.push(
        { id: 'e_c2_u_db', source: 'c2_user_service', target: 'c2_user_db', label: 'Isolated User SQL', stroke: '#2563EB' },
        { id: 'e_c2_c_db', source: 'c2_catalog_service', target: 'c2_catalog_db', label: 'Isolated Catalog Query', stroke: '#059669' },
        { id: 'e_c2_o_db', source: 'c2_order_service', target: 'c2_order_db', label: 'Isolated Order SQL', stroke: '#7C3AED' }
      );
    }
  }

  return renderDrawioFromSpecs({
    diagramId: 'compositional_chain_architecture',
    diagramName: `E-Commerce Microservices Architecture (v1.0.${state.step})`,
    state,
    headerTitle: 'E-COMMERCE MICROSERVICES & EVENT-DRIVEN ARCHITECTURE',
    headerSubtitle: vertical
      ? 'Top-to-Bottom Vertical Flow: Client Apps (Top) -> Public Subnet (API Gateway & IdP) -> Private Subnet (Microservices & Kafka) -> Isolated Databases (Bottom)'
      : 'Iterative Domain Evolution: API Gateway • Keycloak/Auth0 IdP • User, Catalog, Order, Inventory & Notification Services • Apache Kafka • Database-per-Service',
    isDarkTheme: false,
    containers,
    nodes,
    edges,
  });
}

// ============================================================================
// CHAIN 3 BUILDER: REAL-TIME DATA ANALYTICS PIPELINE
// ============================================================================
function buildChain3RealtimeDataAnalytics(state: CompositionalChainState): string {
  const f = state.flags;
  const z3 = Boolean(f.c3_threeZonesAgnostic);
  const edwBrand = state.extractedWarehouseBrand || 'Cloud EDW';

  const containers: ContainerSpec[] = [
    {
      id: 'c3_zone_ingestion',
      title: z3 ? 'Zone 1: Ingestion (Cloud-Agnostic Telemetry & Streaming Layer)' : 'Stage 1: Telemetry Producers & Streaming Ingestion',
      subtitle: 'Mobile Device Telemetry Sources & High-Throughput Apache Kafka Stream',
      x: 35,
      y: 88,
      w: 440,
      h: 825,
      fill: '#EFF6FF',
      stroke: '#2563EB',
      headerColor: '#1D4ED8',
    },
    {
      id: 'c3_zone_processing',
      title: z3 ? 'Zone 2: Processing (Cloud-Agnostic Stream, Batch, Lake & Governance)' : 'Stage 2: Stream/Batch Processing, Data Lake & Governance',
      subtitle: 'Apache Flink Stream Engine, Cloud Storage Data Lake, Apache Airflow ETL, Data Catalog & IAM/KMS',
      x: 495,
      y: 88,
      w: 545,
      h: 825,
      fill: '#FAF5FF',
      stroke: '#7C3AED',
      headerColor: '#6D28D9',
    },
    {
      id: 'c3_zone_serving',
      title: z3 ? 'Zone 3: Serving (Cloud-Agnostic Real-Time Analytics, Warehouse & ML)' : 'Stage 3: Time-Series Serving, Data Warehouse & ML Training',
      subtitle: `Time-Series DB, Real-Time Analytics Dashboard, Structured Data Warehouse (${edwBrand}) & Predictive ML`,
      x: 1060,
      y: 88,
      w: 505,
      h: 825,
      fill: '#ECFDF5',
      stroke: '#059669',
      headerColor: '#047857',
    },
  ];

  const nodes: NodeSpec[] = [];
  const edges: EdgeSpec[] = [];

  // Zone 1: Mobile Devices + Apache Kafka
  nodes.push({
    id: 'c3_mobile_devices',
    badge: z3 ? 'CLOUD-AGNOSTIC SOURCE • INGESTION ZONE' : 'TELEMETRY PRODUCERS',
    title: 'Mobile Devices (Raw Telemetry)',
    subtitle: 'iOS & Android Clients Emitting High-Frequency Event Telemetry',
    x: 65,
    y: 185,
    w: 380,
    h: 110,
    fill: '#FFFFFF',
    stroke: '#2563EB',
    badgeColor: '#1D4ED8',
  });

  if (f.c3_kafkaIngestion) {
    nodes.push({
      id: 'c3_kafka_stream',
      badge: z3 ? 'CLOUD-AGNOSTIC STREAM • INGESTION ZONE' : 'STREAMING INGESTION LAYER',
      title: 'Apache Kafka (Streaming Ingestion)',
      subtitle: 'High-Throughput Distributed Event Log Before Data Lake',
      x: 65,
      y: 385,
      w: 380,
      h: 115,
      fill: '#FFFFFF',
      stroke: '#EA580C',
      badgeColor: '#C2410C',
    });
    edges.push({
      id: 'e_c3_mob_kafka',
      source: 'c3_mobile_devices',
      target: 'c3_kafka_stream',
      label: 'Raw Telemetry Stream',
      stroke: '#2563EB',
    });
  }

  // Zone 2: Cloud Storage Data Lake, Apache Flink, Apache Airflow, Data Catalog, IAM & KMS
  nodes.push({
    id: 'c3_data_lake',
    badge: z3 ? 'CLOUD-AGNOSTIC OBJECT LAKE • PROCESSING ZONE' : 'RAW TELEMETRY DATA LAKE',
    title: 'Cloud Storage Data Lake',
    subtitle: 'Immutable Raw Telemetry Parquet & JSON Object Storage',
    x: 530,
    y: 385,
    w: 475,
    h: 115,
    shape: 'cylinder',
    fill: '#FFFFFF',
    stroke: '#0284C7',
    badgeColor: '#0369A1',
  });

  if (!f.c3_kafkaIngestion) {
    nodes.push({
      id: 'c3_telemetry_collector',
      badge: 'DIRECT TELEMETRY INGESTION ENDPOINT',
      title: 'Telemetry Ingestion Collector (HTTPS / gRPC)',
      subtitle: 'Receives Raw Mobile Device Telemetry & Writes Directly to Data Lake',
      x: 65,
      y: 385,
      w: 380,
      h: 115,
      fill: '#FFFFFF',
      stroke: '#0284C7',
      badgeColor: '#0369A1',
    });
  }

  if (f.c3_kafkaIngestion) {
    edges.push({
      id: 'e_c3_kafka_lake',
      source: 'c3_kafka_stream',
      target: 'c3_data_lake',
      label: 'Persist Raw Stream to Data Lake',
      stroke: '#0284C7',
    });
    if (!f.c3_flinkStreamProc) {
      edges.push({
        id: 'e_c3_lake_kafka_ack',
        source: 'c3_data_lake',
        target: 'c3_kafka_stream',
        label: 'Commit Kafka Partition Offset ACK',
        stroke: '#059669',
        dashed: true,
      });
    }
  } else {
    edges.push(
      {
        id: 'e_c3_mob_col',
        source: 'c3_mobile_devices',
        target: 'c3_telemetry_collector',
        label: 'Emit Raw Mobile Telemetry',
        stroke: '#2563EB',
      },
      {
        id: 'e_c3_col_lake',
        source: 'c3_telemetry_collector',
        target: 'c3_data_lake',
        label: 'Direct Raw Telemetry Ingestion',
        stroke: '#0284C7',
      },
      {
        id: 'e_c3_lake_ack',
        source: 'c3_data_lake',
        target: 'c3_mobile_devices',
        label: '202 Ingestion ACK',
        stroke: '#059669',
        dashed: true,
      }
    );
  }

  if (f.c3_flinkStreamProc) {
    nodes.push({
      id: 'c3_apache_flink',
      badge: z3 ? 'CLOUD-AGNOSTIC STREAM ENGINE • PROCESSING ZONE' : 'REAL-TIME STREAM PROCESSOR',
      title: 'Apache Flink (Stream Processing Engine)',
      subtitle: 'Reads Data from Apache Kafka in Real-Time for Stateful Windowing',
      x: 530,
      y: 185,
      w: 475,
      h: 110,
      fill: '#FFFFFF',
      stroke: '#7C3AED',
      badgeColor: '#6D28D9',
    });
    if (f.c3_kafkaIngestion) {
      edges.push({
        id: 'e_c3_kafka_flink',
        source: 'c3_kafka_stream',
        target: 'c3_apache_flink',
        label: 'Real-Time Stream Read',
        stroke: '#7C3AED',
      });
    }
  }

  if (f.c3_airflowBatchEtl) {
    nodes.push({
      id: 'c3_apache_airflow',
      badge: z3 ? 'CLOUD-AGNOSTIC BATCH ETL • PROCESSING ZONE' : 'PARALLEL BATCH PROCESSING PATH',
      title: 'Apache Airflow (Nightly Batch ETL Jobs)',
      subtitle: 'Pulls Raw Telemetry from Data Lake & Transforms Clean Batch Data',
      x: 530,
      y: 565,
      w: 475,
      h: 105,
      fill: '#FFFFFF',
      stroke: '#D97706',
      badgeColor: '#B45309',
    });
    edges.push({
      id: 'e_c3_lake_airflow',
      source: 'c3_data_lake',
      target: 'c3_apache_airflow',
      label: 'Pull Nightly Batch Data',
      stroke: '#D97706',
      dashed: true,
    });
  }

  if (f.c3_dataCatalog) {
    nodes.push({
      id: 'c3_data_catalog',
      badge: z3 ? 'CLOUD-AGNOSTIC GOVERNANCE • PROCESSING ZONE' : 'METADATA & DATA GOVERNANCE',
      title: 'Data Catalog (Metadata & Governance)',
      subtitle: 'Attached to Both Data Lake & Data Warehouse for Schema Lineage',
      x: 530,
      y: 730,
      w: 475,
      h: 105,
      fill: '#FFFFFF',
      stroke: '#0D9488',
      badgeColor: '#0F766E',
    });
    edges.push({
      id: 'e_c3_cat_lake',
      source: 'c3_data_catalog',
      target: 'c3_data_lake',
      label: 'Govern Lake Metadata',
      stroke: '#0D9488',
      dashed: true,
    });
  }

  if (f.c3_iamKmsSecurity) {
    nodes.push({
      id: 'c3_iam_kms',
      badge: 'SECURITY & ENCRYPTION GOVERNANCE',
      title: 'IAM & KMS Security Layer',
      subtitle: 'Identity & Access Management + Key Management Governing All Storage',
      x: 65,
      y: 620,
      w: 380,
      h: 120,
      fill: '#FEF2F2',
      stroke: '#DC2626',
      badgeColor: '#B91C1C',
    });
    edges.push({
      id: 'e_c3_iam_lake',
      source: 'c3_iam_kms',
      target: 'c3_data_lake',
      label: 'IAM & KMS Storage Policy',
      stroke: '#DC2626',
      dashed: true,
    });
  }

  // Zone 3: Time-Series DB, Real-Time Analytics Dashboard, Structured Data Warehouse, ML Training Module
  if (f.c3_timeseriesDashboard) {
    nodes.push(
      {
        id: 'c3_timeseries_db',
        badge: z3 ? 'CLOUD-AGNOSTIC TSDB • SERVING ZONE' : 'REAL-TIME SERVING STORE',
        title: 'Time-Series Database',
        subtitle: 'High-Ingestion Low-Latency Metrics Store Fed by Stream Processor',
        x: 1095,
        y: 165,
        w: 435,
        h: 100,
        shape: 'cylinder',
        fill: '#FFFFFF',
        stroke: '#059669',
        badgeColor: '#047857',
      },
      {
        id: 'c3_realtime_dashboard',
        badge: z3 ? 'CLOUD-AGNOSTIC BI • SERVING ZONE' : 'LIVE OPERATIONAL BI',
        title: 'Real-Time Analytics Dashboard',
        subtitle: 'Live Streaming KPI Visualization Fed Directly by Time-Series DB',
        x: 1095,
        y: 310,
        w: 435,
        h: 95,
        fill: '#FFFFFF',
        stroke: '#059669',
        badgeColor: '#047857',
      }
    );
    if (f.c3_flinkStreamProc) {
      edges.push({
        id: 'e_c3_flink_tsdb',
        source: 'c3_apache_flink',
        target: 'c3_timeseries_db',
        label: 'Stream Processed Metrics',
        stroke: '#059669',
      });
    }
    edges.push({
      id: 'e_c3_tsdb_dash',
      source: 'c3_timeseries_db',
      target: 'c3_realtime_dashboard',
      label: 'Feed Real-Time Dashboard',
      stroke: '#059669',
    });
  }

  if (f.c3_dataWarehouse) {
    nodes.push({
      id: 'c3_data_warehouse',
      badge: z3 ? 'CLOUD-AGNOSTIC EDW • SERVING ZONE' : 'STRUCTURED DATA WAREHOUSE',
      title: `Structured Data Warehouse (${edwBrand})`,
      subtitle: 'Cleaned & Transformed Analytical Tables Loaded by Airflow Batch Jobs',
      x: 1095,
      y: 480,
      w: 435,
      h: 110,
      shape: 'cylinder',
      fill: '#FFFFFF',
      stroke: '#0284C7',
      badgeColor: '#0369A1',
    });
    if (f.c3_airflowBatchEtl) {
      edges.push({
        id: 'e_c3_airflow_edw',
        source: 'c3_apache_airflow',
        target: 'c3_data_warehouse',
        label: 'Load Transformed Clean Data',
        stroke: '#0284C7',
      });
    }
    if (f.c3_dataCatalog) {
      edges.push({
        id: 'e_c3_cat_edw',
        source: 'c3_data_catalog',
        target: 'c3_data_warehouse',
        label: 'Govern Warehouse Metadata',
        stroke: '#0D9488',
        dashed: true,
      });
    }
    if (f.c3_iamKmsSecurity) {
      edges.push({
        id: 'e_c3_iam_edw',
        source: 'c3_iam_kms',
        target: 'c3_data_warehouse',
        label: 'KMS Encryption & IAM',
        stroke: '#DC2626',
        dashed: true,
        waypoints: [
          { x: 255, y: 865 },
          { x: 1055, y: 865 },
          { x: 1055, y: 535 },
        ],
      });
    }
  }

  if (f.c3_mlTrainingModule) {
    nodes.push({
      id: 'c3_ml_training',
      badge: z3 ? 'CLOUD-AGNOSTIC ML • SERVING ZONE' : 'PREDICTIVE MACHINE LEARNING',
      title: 'Machine Learning Training Module',
      subtitle: 'Pulls Historical Batch Data from Data Warehouse to Train Predictive Models',
      x: 1095,
      y: 665,
      w: 435,
      h: 110,
      fill: '#FFFFFF',
      stroke: '#7C3AED',
      badgeColor: '#6D28D9',
    });
    if (f.c3_dataWarehouse) {
      edges.push({
        id: 'e_c3_edw_ml',
        source: 'c3_data_warehouse',
        target: 'c3_ml_training',
        label: 'Pull Historical Batch Data',
        stroke: '#7C3AED',
      });
    }
  }

  return renderDrawioFromSpecs({
    diagramId: 'compositional_chain_architecture',
    diagramName: `Real-Time Data Analytics Pipeline (v1.0.${state.step})`,
    state,
    headerTitle: z3
      ? 'CLOUD-AGNOSTIC REAL-TIME & BATCH DATA ANALYTICS PIPELINE (3-ZONE ARCHITECTURE)'
      : 'REAL-TIME STREAMING & BATCH DATA ANALYTICS PIPELINE ARCHITECTURE',
    headerSubtitle: z3
      ? 'Cloud-Agnostic 3-Zone Grouping: Zone 1 (Ingestion) • Zone 2 (Processing & Governance) • Zone 3 (Serving, Data Warehouse & ML)'
      : `Mobile Telemetry -> Apache Kafka -> Apache Flink -> Time-Series DB & Dashboard | Data Lake -> Airflow ETL -> Data Warehouse (${edwBrand}) -> ML Training`,
    isDarkTheme: false,
    containers,
    nodes,
    edges,
  });
}

// ============================================================================
// CHAIN 4 BUILDER: MLOPS & MODEL DEPLOYMENT
// ============================================================================
function buildChain4MlopsModelDeployment(state: CompositionalChainState): string {
  const f = state.flags;
  const inf = Boolean(f.c4_infinityLoopLayout);
  const containers: ContainerSpec[] = [];
  const nodes: NodeSpec[] = [];
  const edges: EdgeSpec[] = [];

  if (inf) {
    // CONTINUOUS INFINITY LOOP (∞) SHAPE LAYOUT (Prompt 10)
    containers.push(
      {
        id: 'c4_inf_left_loop',
        title: '∞ Left Loop: Continuous Code, Data Prep, Feature Store & GPU Training Cycle',
        subtitle: 'Iterative Feature Engineering & Automated GPU Model Training Loop',
        x: 35,
        y: 95,
        w: 610,
        h: 810,
        fill: '#EFF6FF',
        stroke: '#2563EB',
        headerColor: '#1D4ED8',
      },
      {
        id: 'c4_inf_center_nexus',
        title: '∞ Infinity Crossover Nexus',
        subtitle: 'MLflow Registry & CI/CD Hub',
        x: 665,
        y: 250,
        w: 270,
        h: 490,
        fill: '#FAF5FF',
        stroke: '#7C3AED',
        headerColor: '#6D28D9',
        dashed: true,
      },
      {
        id: 'c4_inf_right_loop',
        title: '∞ Right Loop: Staging/Prod Serving, A/B Routing & Drift Feedback Cycle',
        subtitle: 'Production Inference, A/B Traffic Split & Continuous Drift Retraining Loop',
        x: 955,
        y: 95,
        w: 610,
        h: 810,
        fill: '#ECFDF5',
        stroke: '#059669',
        headerColor: '#047857',
      }
    );

    // Left Loop Nodes
    nodes.push(
      {
        id: 'c4_data_prep',
        badge: '∞ LEFT LOOP • STAGE 1',
        title: 'Data Preparation Stage',
        subtitle: 'Data Cleaning, Normalization & Feature Extraction Pipeline',
        x: 70,
        y: 165,
        w: 250,
        h: 105,
        fill: '#FFFFFF',
        stroke: '#2563EB',
        badgeColor: '#1D4ED8',
      },
      {
        id: 'c4_feature_store',
        badge: '∞ LEFT LOOP • FEATURE VAULT',
        title: 'Feature Store',
        subtitle: 'Saves Engineered Features from Data Prep for Model Training',
        x: 360,
        y: 165,
        w: 255,
        h: 105,
        shape: 'cylinder',
        fill: '#FFFFFF',
        stroke: '#0284C7',
        badgeColor: '#0369A1',
      },
      {
        id: 'c4_model_training',
        badge: '∞ LEFT LOOP • STAGE 2',
        title: 'Model Training Stage',
        subtitle: 'Supervised & Deep Learning Model Training Pipeline',
        x: 70,
        y: 430,
        w: 545,
        h: 105,
        fill: '#FFFFFF',
        stroke: '#7C3AED',
        badgeColor: '#6D28D9',
      },
      {
        id: 'c4_gpu_cluster',
        badge: '∞ LEFT LOOP • ACCELERATED COMPUTE',
        title: 'GPU Compute Cluster',
        subtitle: 'Distributed Multi-Node GPU Cluster Executing Training Jobs',
        x: 70,
        y: 675,
        w: 545,
        h: 105,
        fill: '#FFFFFF',
        stroke: '#4F46E5',
        badgeColor: '#4338CA',
      }
    );

    // Center Crossover Nexus Nodes
    nodes.push(
      {
        id: 'c4_model_registry',
        badge: '∞ CROSSOVER NEXUS • MLFLOW',
        title: 'Model Registry (MLflow)',
        subtitle: 'Version Controls Trained Models Between Training & Deployment',
        x: 685,
        y: 315,
        w: 230,
        h: 115,
        shape: 'cylinder',
        fill: '#FFFFFF',
        stroke: '#7C3AED',
        badgeColor: '#6D28D9',
      },
      {
        id: 'c4_cicd_pipeline',
        badge: '∞ CROSSOVER NEXUS • AUTOMATION',
        title: 'CI/CD Pipeline (GitHub Actions)',
        subtitle: 'Triggers Model Training on Code Push or Drift Feedback Alert',
        x: 685,
        y: 560,
        w: 230,
        h: 115,
        fill: '#FFFFFF',
        stroke: '#D97706',
        badgeColor: '#B45309',
      }
    );

    // Right Loop Nodes
    nodes.push(
      {
        id: 'c4_staging_api',
        badge: '∞ RIGHT LOOP • STAGING ENV',
        title: 'Staging Deployment (REST API)',
        subtitle: 'Pre-Production Shadow & Integration Testing Environment',
        x: 985,
        y: 165,
        w: 265,
        h: 100,
        fill: '#FFFFFF',
        stroke: '#0D9488',
        badgeColor: '#0F766E',
      },
      {
        id: 'c4_ab_router',
        badge: '∞ RIGHT LOOP • TRAFFIC SPLIT',
        title: 'A/B Testing Routing Infrastructure',
        subtitle: 'Splits Live User Traffic Between Model Version A & Version B',
        x: 1280,
        y: 165,
        w: 255,
        h: 100,
        shape: 'rhombus',
        fill: '#FFFFFF',
        stroke: '#059669',
        badgeColor: '#047857',
      },
      {
        id: 'c4_prod_api_a',
        badge: '∞ RIGHT LOOP • PRODUCTION ENV A',
        title: 'Production REST API (Model Version A)',
        subtitle: 'Champion Model Serving Live REST Predictions',
        x: 985,
        y: 430,
        w: 265,
        h: 105,
        fill: '#FFFFFF',
        stroke: '#059669',
        badgeColor: '#047857',
      },
      {
        id: 'c4_prod_api_b',
        badge: '∞ RIGHT LOOP • PRODUCTION ENV B',
        title: 'Production REST API (Model Version B)',
        subtitle: 'Challenger Model Serving A/B Split Traffic',
        x: 1280,
        y: 430,
        w: 255,
        h: 105,
        fill: '#FFFFFF',
        stroke: '#059669',
        badgeColor: '#047857',
      },
      {
        id: 'c4_model_monitoring',
        badge: '∞ RIGHT LOOP • DRIFT TELEMETRY',
        title: 'Model Monitoring Service',
        subtitle: 'Attached to Production API Tracking Data Drift & Prediction Accuracy',
        x: 985,
        y: 675,
        w: 550,
        h: 105,
        fill: '#FFFBEB',
        stroke: '#DC2626',
        badgeColor: '#B91C1C',
      }
    );

    edges.push(
      { id: 'e_c4_i1', source: 'c4_data_prep', target: 'c4_feature_store', label: 'Save Engineered Features', stroke: '#2563EB' },
      { id: 'e_c4_i2', source: 'c4_feature_store', target: 'c4_model_training', label: 'Training Features', stroke: '#0284C7' },
      { id: 'e_c4_i3', source: 'c4_gpu_cluster', target: 'c4_model_training', label: 'Execute GPU Training Jobs', stroke: '#4F46E5' },
      { id: 'e_c4_i4', source: 'c4_model_training', target: 'c4_model_registry', label: '∞ Register Versioned Model', stroke: '#7C3AED' },
      { id: 'e_c4_i5', source: 'c4_model_registry', target: 'c4_staging_api', label: 'Promote to Staging', stroke: '#0D9488' },
      { id: 'e_c4_i6', source: 'c4_model_registry', target: 'c4_ab_router', label: 'Promote to Prod A/B', stroke: '#059669' },
      { id: 'e_c4_i7', source: 'c4_ab_router', target: 'c4_prod_api_a', label: 'Traffic Split -> Version A', stroke: '#059669' },
      { id: 'e_c4_i8', source: 'c4_ab_router', target: 'c4_prod_api_b', label: 'Traffic Split -> Version B', stroke: '#059669' },
      { id: 'e_c4_i9', source: 'c4_prod_api_a', target: 'c4_model_monitoring', label: 'Track Drift & Accuracy', stroke: '#DC2626' },
      { id: 'e_c4_i10', source: 'c4_prod_api_b', target: 'c4_model_monitoring', label: 'Track A/B Telemetry', stroke: '#DC2626' },
      {
        id: 'e_c4_i11_feedback',
        source: 'c4_model_monitoring',
        target: 'c4_cicd_pipeline',
        label: '∞ Drift Feedback Loop -> Retrain',
        stroke: '#DC2626',
        dashed: true,
        strokeWidth: 2.5,
      },
      {
        id: 'e_c4_i12_trigger',
        source: 'c4_cicd_pipeline',
        target: 'c4_model_training',
        label: '∞ Trigger Automated Retraining',
        stroke: '#D97706',
        dashed: true,
        strokeWidth: 2.5,
      }
    );
  } else {
    // SEQUENTIAL 3-STAGE MLOPS PIPELINE (Steps 1..9)
    containers.push(
      {
        id: 'c4_stage1_box',
        title: 'Stage 1: Data Preparation & Feature Engineering',
        subtitle: 'Raw Dataset Ingestion, Cleaning & Feature Store Persistence',
        x: 35,
        y: 88,
        w: 430,
        h: 825,
        fill: '#EFF6FF',
        stroke: '#2563EB',
        headerColor: '#1D4ED8',
      },
      {
        id: 'c4_stage2_box',
        title: 'Stage 2: Model Training, CI/CD & Model Registry',
        subtitle: 'Automated CI/CD Triggers, GPU Cluster Training & MLflow Version Control',
        x: 485,
        y: 88,
        w: 530,
        h: 825,
        fill: '#FAF5FF',
        stroke: '#7C3AED',
        headerColor: '#6D28D9',
      },
      {
        id: 'c4_stage3_box',
        title: 'Stage 3: Model Deployment (REST API), A/B Routing & Monitoring',
        subtitle: f.c4_splitStagingProd
          ? 'Staging & Production Environments, A/B Traffic Router & Drift Monitoring'
          : 'Production REST API Endpoint Serving Real-Time Predictions',
        x: 1035,
        y: 88,
        w: 530,
        h: 825,
        fill: '#ECFDF5',
        stroke: '#059669',
        headerColor: '#047857',
      }
    );

    // Stage 1 Nodes
    nodes.push({
      id: 'c4_data_prep',
      badge: 'MLOPS STAGE 1',
      title: 'Data Preparation',
      subtitle: 'Data Ingestion, Validation, Transformation & Feature Engineering',
      x: 65,
      y: 260,
      w: 370,
      h: 115,
      fill: '#FFFFFF',
      stroke: '#2563EB',
      badgeColor: '#1D4ED8',
    });

    if (f.c4_featureStore) {
      nodes.push({
        id: 'c4_feature_store',
        badge: 'ENGINEERED FEATURE REPOSITORY',
        title: 'Feature Store',
        subtitle: 'Stores Engineered Features from Data Prep for Model Training',
        x: 65,
        y: 470,
        w: 370,
        h: 115,
        shape: 'cylinder',
        fill: '#FFFFFF',
        stroke: '#0284C7',
        badgeColor: '#0369A1',
      });
      edges.push({
        id: 'e_c4_prep_fs',
        source: 'c4_data_prep',
        target: 'c4_feature_store',
        label: 'Save Engineered Features',
        stroke: '#0284C7',
      });
    }

    // Stage 2 Nodes
    if (f.c4_cicdGithubActions) {
      nodes.push({
        id: 'c4_cicd_pipeline',
        badge: 'AUTOMATED PIPELINE TRIGGER',
        title: 'CI/CD Pipeline (GitHub Actions)',
        subtitle: 'Automatically Triggers Model Training When New Code is Pushed',
        x: 520,
        y: 155,
        w: 460,
        h: 100,
        fill: '#FFFFFF',
        stroke: '#D97706',
        badgeColor: '#B45309',
      });
    }

    nodes.push({
      id: 'c4_model_training',
      badge: 'MLOPS STAGE 2',
      title: 'Model Training',
      subtitle: 'Model Architecture Training, Hyperparameter Tuning & Validation',
      x: 520,
      y: 310,
      w: 460,
      h: 110,
      fill: '#FFFFFF',
      stroke: '#7C3AED',
      badgeColor: '#6D28D9',
    });

    if (f.c4_featureStore) {
      edges.push({
        id: 'e_c4_fs_train',
        source: 'c4_feature_store',
        target: 'c4_model_training',
        label: 'Pull Engineered Features',
        stroke: '#0284C7',
      });
    } else {
      edges.push(
        {
          id: 'e_c4_prep_train',
          source: 'c4_data_prep',
          target: 'c4_model_training',
          label: 'Prepared Training Dataset',
          stroke: '#2563EB',
        },
        {
          id: 'e_c4_train_prep_val',
          source: 'c4_model_training',
          target: 'c4_data_prep',
          label: 'Schema & Split Validation',
          stroke: '#7C3AED',
          dashed: true,
        }
      );
    }

    if (f.c4_cicdGithubActions) {
      edges.push({
        id: 'e_c4_cicd_train',
        source: 'c4_cicd_pipeline',
        target: 'c4_model_training',
        label: 'Code Push -> Trigger Training',
        stroke: '#D97706',
      });
    }

    if (f.c4_gpuComputeCluster) {
      nodes.push({
        id: 'c4_gpu_cluster',
        badge: 'ACCELERATED TRAINING INFRASTRUCTURE',
        title: 'GPU Compute Cluster',
        subtitle: 'High-Performance Multi-GPU Cluster Executing Model Training Jobs',
        x: 520,
        y: 470,
        w: 460,
        h: 105,
        fill: '#FFFFFF',
        stroke: '#4F46E5',
        badgeColor: '#4338CA',
      });
      edges.push({
        id: 'e_c4_gpu_train',
        source: 'c4_gpu_cluster',
        target: 'c4_model_training',
        label: 'Execute GPU Training Jobs',
        stroke: '#4F46E5',
      });
    }

    if (f.c4_modelRegistryMlflow) {
      nodes.push({
        id: 'c4_model_registry',
        badge: 'MODEL VERSION CONTROL',
        title: 'Model Registry (MLflow)',
        subtitle: 'Sits Between Training & Deployment to Version-Control Models',
        x: 520,
        y: 640,
        w: 460,
        h: 115,
        shape: 'cylinder',
        fill: '#FFFFFF',
        stroke: '#7C3AED',
        badgeColor: '#6D28D9',
      });
      edges.push({
        id: 'e_c4_train_reg',
        source: 'c4_model_training',
        target: 'c4_model_registry',
        label: 'Publish Versioned Model',
        stroke: '#7C3AED',
      });
    }

    const deployUpstreamId = f.c4_modelRegistryMlflow ? 'c4_model_registry' : 'c4_model_training';

    // Stage 3 Nodes: Single Deployment vs Split Staging & Production (+ A/B Testing Router + Model Monitoring)
    if (f.c4_splitStagingProd) {
      nodes.push({
        id: 'c4_staging_api',
        badge: 'DEPLOYMENT ENVIRONMENT 1',
        title: 'Staging Environment (REST API)',
        subtitle: 'Pre-Production Model Validation & Integration REST Endpoint',
        x: 1070,
        y: 155,
        w: 460,
        h: 100,
        fill: '#FFFFFF',
        stroke: '#0D9488',
        badgeColor: '#0F766E',
      });
      edges.push({
        id: 'e_c4_up_staging',
        source: deployUpstreamId,
        target: 'c4_staging_api',
        label: 'Deploy Candidate to Staging',
        stroke: '#0D9488',
      });

      if (f.c4_abTestingRouter) {
        nodes.push(
          {
            id: 'c4_ab_router',
            badge: 'PRODUCTION TRAFFIC SPLITTER',
            title: 'A/B Testing Routing Infrastructure',
            subtitle: 'Splits Live User Traffic Between Model Version A and Model Version B',
            x: 1070,
            y: 300,
            w: 460,
            h: 95,
            fill: '#FFFFFF',
            stroke: '#059669',
            badgeColor: '#047857',
          },
          {
            id: 'c4_prod_api_a',
            badge: 'PRODUCTION MODEL VERSION A',
            title: 'Production REST API (Version A)',
            subtitle: 'Baseline Champion Model Serving Live User Traffic',
            x: 1070,
            y: 445,
            w: 220,
            h: 110,
            fill: '#FFFFFF',
            stroke: '#059669',
            badgeColor: '#047857',
          },
          {
            id: 'c4_prod_api_b',
            badge: 'PRODUCTION MODEL VERSION B',
            title: 'Production REST API (Version B)',
            subtitle: 'Challenger Model Serving A/B Test Traffic',
            x: 1310,
            y: 445,
            w: 220,
            h: 110,
            fill: '#FFFFFF',
            stroke: '#059669',
            badgeColor: '#047857',
          }
        );
        edges.push(
          { id: 'e_c4_up_ab', source: deployUpstreamId, target: 'c4_ab_router', label: 'Promote to Production', stroke: '#059669' },
          { id: 'e_c4_ab_a', source: 'c4_ab_router', target: 'c4_prod_api_a', label: 'Split Traffic -> Version A', stroke: '#059669' },
          { id: 'e_c4_ab_b', source: 'c4_ab_router', target: 'c4_prod_api_b', label: 'Split Traffic -> Version B', stroke: '#059669' }
        );
      } else {
        nodes.push({
          id: 'c4_prod_api',
          badge: 'DEPLOYMENT ENVIRONMENT 2',
          title: 'Production Environment (REST API)',
          subtitle: 'Live Low-Latency REST API Serving Production Predictions',
          x: 1070,
          y: 340,
          w: 460,
          h: 115,
          fill: '#FFFFFF',
          stroke: '#059669',
          badgeColor: '#047857',
        });
        edges.push({
          id: 'e_c4_up_prod',
          source: deployUpstreamId,
          target: 'c4_prod_api',
          label: 'Promote to Production API',
          stroke: '#059669',
        });
      }
    } else {
      nodes.push({
        id: 'c4_deploy_rest_api',
        badge: 'MLOPS STAGE 3',
        title: 'Model Deployment as a REST API',
        subtitle: 'Containerized Real-Time Inference Endpoint Serving HTTP/JSON Predictions',
        x: 1070,
        y: 310,
        w: 460,
        h: 115,
        fill: '#FFFFFF',
        stroke: '#059669',
        badgeColor: '#047857',
      });
      edges.push({
        id: 'e_c4_train_deploy',
        source: deployUpstreamId,
        target: 'c4_deploy_rest_api',
        label: 'Deploy Trained Model',
        stroke: '#059669',
      });
    }

    if (f.c4_modelMonitoring) {
      nodes.push({
        id: 'c4_model_monitoring',
        badge: 'PRODUCTION OBSERVABILITY & DRIFT',
        title: 'Model Monitoring Service',
        subtitle: 'Attached to Production API Tracking Data Drift & Prediction Accuracy',
        x: 1070,
        y: 640,
        w: 460,
        h: 115,
        fill: '#FFFBEB',
        stroke: '#DC2626',
        badgeColor: '#B91C1C',
      });
      const prodSourceId = f.c4_abTestingRouter
        ? 'c4_prod_api_a'
        : f.c4_splitStagingProd
        ? 'c4_prod_api'
        : 'c4_deploy_rest_api';
      edges.push({
        id: 'e_c4_prod_mon',
        source: prodSourceId,
        target: 'c4_model_monitoring',
        label: 'Track Data Drift & Accuracy',
        stroke: '#DC2626',
      });

      if (f.c4_driftFeedbackLoop && f.c4_cicdGithubActions) {
        edges.push({
          id: 'e_c4_drift_feedback_loop',
          source: 'c4_model_monitoring',
          target: 'c4_cicd_pipeline',
          label: 'Feedback Loop: Drift Detected -> Trigger Retraining',
          stroke: '#DC2626',
          dashed: true,
          strokeWidth: 2.5,
        });
      }
    }
  }

  return renderDrawioFromSpecs({
    diagramId: 'compositional_chain_architecture',
    diagramName: `MLOps & Model Deployment Architecture (v1.0.${state.step})`,
    state,
    headerTitle: inf
      ? 'CONTINUOUS MLOPS INFINITY LOOP (∞) LIFECYCLE ARCHITECTURE'
      : 'END-TO-END MLOPS & PRODUCTION MODEL DEPLOYMENT ARCHITECTURE',
    headerSubtitle: inf
      ? 'Continuous Infinity Loop (∞): Data Prep & Feature Store -> GPU Training -> MLflow Registry -> Staging & A/B Prod API -> Drift Monitoring -> CI/CD Retraining'
      : 'Data Preparation • Feature Store • CI/CD (GitHub Actions) • GPU Cluster Model Training • MLflow Registry • Staging & A/B Production REST API • Drift Feedback Loop',
    isDarkTheme: false,
    containers,
    nodes,
    edges,
  });
}

// ============================================================================
// CHAIN 5 BUILDER: IOT EVENT-DRIVEN SMART HOME SYSTEM
// ============================================================================
function buildChain5IotSmartHome(state: CompositionalChainState): string {
  const f = state.flags;
  const rg = Boolean(f.c5_redGreenArrows);
  const cmdColor = rg ? '#DC2626' : '#2563EB';
  const telColor = rg ? '#16A34A' : '#059669';

  const containers: ContainerSpec[] = [
    {
      id: 'c5_zone_smart_home_local',
      title: 'Zone 1: Smart Home Physical Devices & Local Central Hub (Edge LAN)',
      subtitle: 'Physical Smart Thermostats, Smart Lights, Local Central Hub & Offline Edge Computing',
      x: 35,
      y: 88,
      w: 520,
      h: 825,
      fill: '#F0FDF4',
      stroke: '#16A34A',
      headerColor: '#15803D',
    },
    {
      id: 'c5_zone_iot_cloud',
      title: 'Zone 2: Cloud IoT Platform, Rules Engine, Provisioning, OTA & Cold Storage',
      subtitle: 'MQTT Cloud IoT Gateway, Rules Engine, Device Provisioning, OTA Server & Cold Storage Archive',
      x: 575,
      y: 88,
      w: 525,
      h: 825,
      fill: '#EFF6FF',
      stroke: '#2563EB',
      headerColor: '#1D4ED8',
    },
    {
      id: 'c5_zone_user_control',
      title: 'Zone 3: Remote User Control, Cloud REST API & Voice Assistants',
      subtitle: rg
        ? '🔴 Red Arrows = Command/Control Flows (App to Device) | 🟢 Green Arrows = Telemetry/Data Flows (Device to Cloud)'
        : 'Cloud REST API, Mobile App & Voice Assistant Integration (Alexa / Google Home)',
      x: 1120,
      y: 88,
      w: 445,
      h: 825,
      fill: '#FAF5FF',
      stroke: '#7C3AED',
      headerColor: '#6D28D9',
    },
  ];

  const nodes: NodeSpec[] = [];
  const edges: EdgeSpec[] = [];

  // Zone 1: Physical Smart Thermostats, Smart Lights, Local Central Hub (+ Edge Computing Module)
  nodes.push(
    {
      id: 'c5_smart_thermostats',
      badge: 'PHYSICAL IOT SENSOR & ACTUATOR 1',
      title: 'Physical Smart Thermostats',
      subtitle: 'Sends Temperature & HVAC Telemetry to Local Central Hub',
      x: 65,
      y: 170,
      w: 215,
      h: 115,
      fill: '#FFFFFF',
      stroke: '#16A34A',
      badgeColor: '#15803D',
    },
    {
      id: 'c5_smart_lights',
      badge: 'PHYSICAL IOT SENSOR & ACTUATOR 2',
      title: 'Physical Smart Lights',
      subtitle: 'Sends Lighting State & Energy Usage Data to Local Central Hub',
      x: 310,
      y: 170,
      w: 215,
      h: 115,
      fill: '#FFFFFF',
      stroke: '#16A34A',
      badgeColor: '#15803D',
    },
    {
      id: 'c5_local_central_hub',
      badge: 'LOCAL SMART HOME EDGE HUB',
      title: 'Local Central Hub',
      subtitle: 'Aggregates Local Device Telemetry & Dispatches Control Commands',
      x: 65,
      y: 410,
      w: 460,
      h: 120,
      fill: '#FFFFFF',
      stroke: '#0D9488',
      badgeColor: '#0F766E',
    }
  );

  edges.push(
    {
      id: 'e_c5_therm_hub_tel',
      source: 'c5_smart_thermostats',
      target: 'c5_local_central_hub',
      label: rg ? '🟢 [TELEMETRY] Temperature Data' : 'Send Temperature Data',
      stroke: telColor,
      strokeWidth: rg ? 2.5 : 2,
    },
    {
      id: 'e_c5_lights_hub_tel',
      source: 'c5_smart_lights',
      target: 'c5_local_central_hub',
      label: rg ? '🟢 [TELEMETRY] Lighting State Data' : 'Send Lighting Data',
      stroke: telColor,
      strokeWidth: rg ? 2.5 : 2,
    }
  );

  if (rg) {
    edges.push(
      {
        id: 'e_c5_hub_therm_cmd',
        source: 'c5_local_central_hub',
        target: 'c5_smart_thermostats',
        label: '🔴 [COMMAND] Set HVAC Target Temp',
        stroke: cmdColor,
        strokeWidth: 2.5,
      },
      {
        id: 'e_c5_hub_lights_cmd',
        source: 'c5_local_central_hub',
        target: 'c5_smart_lights',
        label: '🔴 [COMMAND] Toggle / Dim Lights',
        stroke: cmdColor,
        strokeWidth: 2.5,
      }
    );
  } else {
    edges.push({
      id: 'e_c5_hub_devices_sync',
      source: 'c5_local_central_hub',
      target: 'c5_smart_thermostats',
      label: 'Local Hub ACK & Schedule Sync',
      stroke: '#0D9488',
      dashed: true,
    });
  }

  if (f.c5_edgeComputingOffline) {
    nodes.push({
      id: 'c5_edge_computing',
      badge: 'LOCAL OFFLINE RESILIENCE',
      title: 'Edge Computing Module (on Central Hub)',
      subtitle: 'Processes Critical Alerts Locally if Internet Connection Goes Down',
      x: 65,
      y: 650,
      w: 460,
      h: 115,
      fill: '#FFFBEB',
      stroke: '#D97706',
      badgeColor: '#B45309',
    });
    edges.push({
      id: 'e_c5_hub_edge',
      source: 'c5_local_central_hub',
      target: 'c5_edge_computing',
      label: rg ? '🔴 [LOCAL CONTROL] Offline Critical Alert Failover' : 'Local Offline Alert Processing',
      stroke: rg ? cmdColor : '#D97706',
      dashed: true,
    });
  }

  // Zone 2: Cloud IoT Gateway (MQTT), Rules Engine, Device Provisioning, OTA Update Server, Cold Storage DB
  if (f.c5_cloudIotMqtt) {
    nodes.push({
      id: 'c5_cloud_iot_gateway',
      badge: 'CLOUD MQTT INGESTION BROKER',
      title: 'Cloud-Based IoT Gateway (MQTT)',
      subtitle: 'Bidirectional MQTT Protocol Bridge Connected to Local Central Hub',
      x: 610,
      y: 350,
      w: 455,
      h: 110,
      fill: '#FFFFFF',
      stroke: '#2563EB',
      badgeColor: '#1D4ED8',
    });
    edges.push({
      id: 'e_c5_hub_iotgw_mqtt',
      source: 'c5_local_central_hub',
      target: 'c5_cloud_iot_gateway',
      label: rg ? '🟢 [TELEMETRY] MQTT Sensor Stream (Device to Cloud)' : 'MQTT Protocol (Telemetry & Control)',
      stroke: telColor,
      strokeWidth: rg ? 2.5 : 2,
    });
    if (rg) {
      edges.push({
        id: 'e_c5_iotgw_hub_cmd',
        source: 'c5_cloud_iot_gateway',
        target: 'c5_local_central_hub',
        label: '🔴 [COMMAND] MQTT Control Downlink',
        stroke: cmdColor,
        strokeWidth: 2.5,
      });
    }
  }

  if (f.c5_rulesEngine) {
    nodes.push({
      id: 'c5_rules_engine',
      badge: 'CLOUD AUTOMATION ENGINE',
      title: 'Cloud Rules Engine',
      subtitle: 'Evaluates Incoming Sensor Data from IoT Gateway Against User Preferences',
      x: 610,
      y: 520,
      w: 455,
      h: 105,
      fill: '#FFFFFF',
      stroke: '#7C3AED',
      badgeColor: '#6D28D9',
    });
    if (f.c5_cloudIotMqtt) {
      edges.push({
        id: 'e_c5_gw_rules',
        source: 'c5_cloud_iot_gateway',
        target: 'c5_rules_engine',
        label: rg ? '🟢 [TELEMETRY] Evaluate Sensor Data' : 'Evaluate Incoming Sensor Data',
        stroke: telColor,
        strokeWidth: rg ? 2.5 : 2,
      });
    }
  }

  if (f.c5_deviceProvisioning) {
    nodes.push({
      id: 'c5_device_provisioning',
      badge: 'ZERO-TRUST ONBOARDING & CERTS',
      title: 'Device Provisioning Service',
      subtitle: 'Handles Secure Onboarding & X.509 Certificate Generation for Smart Devices',
      x: 610,
      y: 170,
      w: 220,
      h: 115,
      fill: '#FFFFFF',
      stroke: '#0284C7',
      badgeColor: '#0369A1',
    });
    if (f.c5_cloudIotMqtt) {
      edges.push({
        id: 'e_c5_prov_gw',
        source: 'c5_device_provisioning',
        target: 'c5_cloud_iot_gateway',
        label: rg ? '🔴 [CONTROL] X.509 Cert Onboarding' : 'Secure Cert Onboarding',
        stroke: cmdColor,
      });
    }
  }

  if (f.c5_otaUpdateServer) {
    nodes.push({
      id: 'c5_ota_server',
      badge: 'FIRMWARE PATCH DISTRIBUTION',
      title: 'OTA (Over-The-Air) Update Server',
      subtitle: 'Connected to Local Smart Devices to Push Signed Firmware Patches',
      x: 845,
      y: 170,
      w: 220,
      h: 115,
      fill: '#FFFFFF',
      stroke: '#EA580C',
      badgeColor: '#C2410C',
    });
    edges.push({
      id: 'e_c5_ota_devices',
      source: 'c5_ota_server',
      target: 'c5_local_central_hub',
      label: rg ? '🔴 [COMMAND] Push OTA Firmware Patches' : 'Push OTA Firmware Patches',
      stroke: rg ? cmdColor : '#EA580C',
      dashed: true,
      strokeWidth: rg ? 2.5 : 2,
      waypoints: [
        { x: 955, y: 120 },
        { x: 525, y: 120 },
        { x: 525, y: 477 },
      ],
    });
  }

  if (f.c5_coldStorageArchive) {
    nodes.push({
      id: 'c5_cold_storage_db',
      badge: 'LONG-TERM TELEMETRY ARCHIVE',
      title: 'Cold Storage Database',
      subtitle: 'Cost-Effectively Archives Years of Temperature & Energy Usage Logs',
      x: 610,
      y: 690,
      w: 455,
      h: 115,
      shape: 'cylinder',
      fill: '#FFFFFF',
      stroke: '#059669',
      badgeColor: '#047857',
    });
    const archiveSource = f.c5_rulesEngine ? 'c5_rules_engine' : f.c5_cloudIotMqtt ? 'c5_cloud_iot_gateway' : 'c5_local_central_hub';
    edges.push({
      id: 'e_c5_archive_logs',
      source: archiveSource,
      target: 'c5_cold_storage_db',
      label: rg ? '🟢 [TELEMETRY] Archive Temp & Energy Logs' : 'Archive Multi-Year Temp & Energy Logs',
      stroke: telColor,
      strokeWidth: rg ? 2.5 : 2,
    });
  }

  // Zone 3: Cloud REST API, Mobile App, Voice Assistant (Alexa / Google Home)
  if (f.c5_mobileAppRestApi) {
    nodes.push(
      {
        id: 'c5_mobile_app',
        badge: 'REMOTE USER APPLICATION',
        title: 'Mobile App (iOS / Android)',
        subtitle: 'Reads Live Device States & Sends Remote Control Commands',
        x: 1155,
        y: 170,
        w: 375,
        h: 115,
        fill: '#FFFFFF',
        stroke: '#2563EB',
        badgeColor: '#1D4ED8',
      },
      {
        id: 'c5_cloud_rest_api',
        badge: 'CLOUD CONTROL & STATE API',
        title: 'Cloud REST API',
        subtitle: 'Exposes Device State Endpoints & Dispatches Remote Control Commands',
        x: 1155,
        y: 350,
        w: 375,
        h: 110,
        fill: '#FFFFFF',
        stroke: '#7C3AED',
        badgeColor: '#6D28D9',
      }
    );
    edges.push({
      id: 'e_c5_app_rest_cmd',
      source: 'c5_mobile_app',
      target: 'c5_cloud_rest_api',
      label: rg ? '🔴 [COMMAND] Remote Control Commands (App to Device)' : 'Read States & Send Remote Commands',
      stroke: cmdColor,
      strokeWidth: rg ? 2.5 : 2,
    });
    if (f.c5_cloudIotMqtt) {
      edges.push({
        id: 'e_c5_rest_iotgw_cmd',
        source: 'c5_cloud_rest_api',
        target: 'c5_cloud_iot_gateway',
        label: rg ? '🔴 [COMMAND] Dispatch Device Control' : 'Dispatch Control Commands',
        stroke: cmdColor,
        strokeWidth: rg ? 2.5 : 2,
      });
    }
  }

  if (f.c5_voiceAssistant) {
    nodes.push({
      id: 'c5_voice_assistant',
      badge: 'VOICE CONTROL INTEGRATION',
      title: 'Voice Assistant (Alexa / Google Home)',
      subtitle: 'Interacts Directly with Cloud REST API for Voice Smart Home Control',
      x: 1155,
      y: 530,
      w: 375,
      h: 115,
      fill: '#FFFFFF',
      stroke: '#D97706',
      badgeColor: '#B45309',
    });
    if (f.c5_mobileAppRestApi) {
      edges.push({
        id: 'e_c5_voice_rest_cmd',
        source: 'c5_voice_assistant',
        target: 'c5_cloud_rest_api',
        label: rg ? '🔴 [COMMAND] Voice Control Commands' : 'Voice Command API',
        stroke: cmdColor,
        strokeWidth: rg ? 2.5 : 2,
      });
    }
  }

  return renderDrawioFromSpecs({
    diagramId: 'compositional_chain_architecture',
    diagramName: `IoT Event-Driven Smart Home System (v1.0.${state.step})`,
    state,
    headerTitle: rg
      ? 'IOT EVENT-DRIVEN SMART HOME ARCHITECTURE (🔴 RED COMMANDS vs. 🟢 GREEN TELEMETRY)'
      : 'IOT EVENT-DRIVEN SMART HOME EDGE-TO-CLOUD ARCHITECTURE',
    headerSubtitle: rg
      ? 'Semantic Flow Color-Coding: Red Arrows (#DC2626) = Command/Control Flows (App to Device) • Green Arrows (#16A34A) = Telemetry/Data Flows (Device to Cloud)'
      : 'Smart Thermostats & Lights -> Local Central Hub & Offline Edge Computing -> MQTT Cloud IoT Gateway -> Rules Engine, REST API, Mobile/Voice, Provisioning, OTA & Cold Storage',
    isDarkTheme: false,
    containers,
    nodes,
    edges,
  });
}

function buildChain6UniversalDynamicTopology(state: CompositionalChainState): string {
  const combinedPrompt = (state.promptHistory && state.promptHistory.length > 0
    ? state.promptHistory.join(' • ')
    : state.universalTitle || 'Enterprise Google Cloud Hub-and-Spoke Reference Architecture'
  ).trim();

  const rawXml = synthesizeOfficialGcpArchCenter78FromPrompt(combinedPrompt);
  const stateJsonEsc = esc(JSON.stringify(state));

  return rawXml.replace(
    /<diagram\s+id="([^"]+)"\s+name="([^"]+)">/,
    `<diagram id="$1" name="$2" data-compositional-chain="true" data-chain-domain="${state.domain}" data-chain-step="${state.step}" data-chain-state-json="${stateJsonEsc}">`
  );
}

export function compileCompositionalArchitectureChain(
  currentXml: string,
  promptText: string
): {
  xml: string;
  state: CompositionalChainState;
  canvasDiff: string;
  specDiff: string;
  detectedPersona: string;
  versionTag: string;
} {
  const existingState = extractChainStateFromXml(currentXml);
  const detectedNewDomain = detectInitialChainDomain(promptText);

  let state: CompositionalChainState;
  if (!existingState || (detectedNewDomain && detectedNewDomain !== existingState.domain && existingState.step >= 10)) {
    const domain = detectedNewDomain || existingState?.domain || 'cloud_native_web';
    state = {
      domain,
      step: 1,
      promptHistory: [promptText],
      flags: {},
    };
  } else {
    state = {
      ...existingState,
      step: existingState.step + 1,
      promptHistory: [...(existingState.promptHistory || []), promptText],
      flags: { ...(existingState.flags || {}) },
    };
  }

  const { canvasDiff, specDiff, persona } = applyPromptToChainState(state, promptText);
  const versionTag = `v1.0.${state.step}`;

  let xml = '';
  switch (state.domain) {
    case 'cloud_native_web':
      xml = buildChain1CloudNativeWeb(state);
      break;
    case 'ecommerce_microservices':
      xml = buildChain2EcommerceMicroservices(state);
      break;
    case 'realtime_data_analytics':
      xml = buildChain3RealtimeDataAnalytics(state);
      break;
    case 'mlops_model_deployment':
      xml = buildChain4MlopsModelDeployment(state);
      break;
    case 'iot_smart_home':
      xml = buildChain5IotSmartHome(state);
      break;
    case 'universal_dynamic_topology':
      xml = buildChain6UniversalDynamicTopology(state);
      break;
  }

  return {
    xml,
    state,
    canvasDiff,
    specDiff,
    detectedPersona: persona,
    versionTag,
  };
}
