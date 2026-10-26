import { classifyChatIntent } from '../src/lib/router/chatIntentClassifier';
import { executeGcpPromptModification } from '../src/lib/gcpCoPilotModifier';
import { preflightVerifyAndHealXmlAcrossAll6Audits } from '../src/lib/preflightAuditEngine';
import {
  NANO_BANANA_3TIER_VISION_DECOMPILED_SPEC,
  NANO_BANANA_ECOMMERCE_MICROSERVICES_VISION_DECOMPILED_SPEC,
  verifyDrawioXmlMatchesVisionPosterSpec,
} from '../src/lib/visionPosterToDrawioDecompiler';

interface ChainPromptSpec {
  step: number;
  prompt: string;
  requiredTerms: string[];
  checkCustomInvariant?: (xml: string) => { pass: boolean; detail: string };
}

interface ChainSuiteSpec {
  chainId: string;
  chainTitle: string;
  steps: ChainPromptSpec[];
}

const FIVE_ARCHITECTURE_CHAINS: ChainSuiteSpec[] = [
  {
    chainId: 'chain1_cloud_native_web',
    chainTitle: '1. Cloud-Native Web Application',
    steps: [
      {
        step: 1,
        prompt:
          'Create a diagram for a classic 3-tier web application architecture with a React frontend, Node.js backend API, and a PostgreSQL database.',
        requiredTerms: [
          'React 19 Single-Page Application (SPA)',
          'Node.js 22 LTS Backend API Server',
          'PostgreSQL 16 Primary Relational Database',
        ],
      },
      {
        step: 2,
        prompt:
          'Add a caching layer using Redis between the Node.js backend and the PostgreSQL database.',
        requiredTerms: [
          'React 19 Single-Page Application (SPA)',
          'Node.js 22 LTS Backend API Server',
          'Redis Caching Layer',
          'PostgreSQL 16 Primary Relational Database',
        ],
      },
      {
        step: 3,
        prompt:
          'Introduce a Load Balancer in front of the backend servers to distribute incoming traffic.',
        requiredTerms: [
          'React 19 Single-Page Application (SPA)',
          'Load Balancer',
          'Node.js 22 LTS Backend API Server',
          'Redis Caching Layer',
          'PostgreSQL 16 Primary Relational Database',
        ],
      },
      {
        step: 4,
        prompt:
          'Separate the Node.js backend into two distinct services: an Authentication Service and a Core API Service.',
        requiredTerms: [
          'React 19 Single-Page Application (SPA)',
          'Load Balancer',
          'Authentication Service',
          'Core API Service',
          'Redis Caching Layer',
          'PostgreSQL 16 Primary Relational Database',
        ],
      },
      {
        step: 5,
        prompt:
          'Add a CDN (Content Delivery Network) in front of the React frontend to serve static assets globally.',
        requiredTerms: [
          'CDN (Content Delivery Network)',
          'React 19 Single-Page Application (SPA)',
          'Load Balancer',
          'Authentication Service',
          'Core API Service',
          'Redis Caching Layer',
          'PostgreSQL 16 Primary Relational Database',
        ],
      },
      {
        step: 6,
        prompt:
          'Include a monitoring and logging stack using Prometheus and Grafana connected to all backend services.',
        requiredTerms: [
          'CDN (Content Delivery Network)',
          'React 19 Single-Page Application (SPA)',
          'Load Balancer',
          'Authentication Service',
          'Core API Service',
          'Prometheus',
          'Grafana',
          'Redis Caching Layer',
          'PostgreSQL 16 Primary Relational Database',
        ],
      },
      {
        step: 7,
        prompt:
          'Change the deployment infrastructure to show the backend services running inside a Kubernetes cluster.',
        requiredTerms: [
          'CDN (Content Delivery Network)',
          'React 19 Single-Page Application (SPA)',
          'Load Balancer',
          'Kubernetes Cluster',
          'Authentication Service',
          'Core API Service',
          'Prometheus',
          'Grafana',
          'Redis Caching Layer',
          'PostgreSQL 16 Primary Relational Database',
        ],
      },
      {
        step: 8,
        prompt:
          'Add an Object Storage service (like AWS S3) connected to the Core API for storing user-uploaded media files.',
        requiredTerms: [
          'CDN (Content Delivery Network)',
          'React 19 Single-Page Application (SPA)',
          'Load Balancer',
          'Kubernetes Cluster',
          'Authentication Service',
          'Core API Service',
          'Object Storage Service (AWS S3)',
          'Prometheus',
          'Grafana',
          'Redis Caching Layer',
          'PostgreSQL 16 Primary Relational Database',
        ],
      },
      {
        step: 9,
        prompt:
          'Introduce a background worker process that pulls async tasks from a RabbitMQ queue populated by the Core API.',
        requiredTerms: [
          'CDN (Content Delivery Network)',
          'React 19 Single-Page Application (SPA)',
          'Load Balancer',
          'Kubernetes Cluster',
          'Authentication Service',
          'Core API Service',
          'Object Storage Service (AWS S3)',
          'RabbitMQ Task Queue',
          'Background Worker Process',
          'Prometheus',
          'Grafana',
          'Redis Caching Layer',
          'PostgreSQL 16 Primary Relational Database',
        ],
      },
      {
        step: 10,
        prompt:
          "Update the diagram's style to use a dark theme with neon blue and green accents, and make the data flow arrows dashed.",
        requiredTerms: [
          'CDN (Content Delivery Network)',
          'React 19 Single-Page Application (SPA)',
          'Load Balancer',
          'Kubernetes Cluster',
          'Authentication Service',
          'Core API Service',
          'Object Storage Service (AWS S3)',
          'RabbitMQ Task Queue',
          'Background Worker Process',
          'Prometheus',
          'Grafana',
          'Redis Caching Layer',
          'PostgreSQL 16 Primary Relational Database',
        ],
        checkCustomInvariant: (xml) => {
          const hasDarkBg = xml.includes('background="#0F172A"') && xml.includes('data-canvas-theme="dark"');
          const hasNeonBlue = xml.includes('#00F0FF');
          const hasNeonGreen = xml.includes('#00FF66');
          const dashedEdges = (xml.match(/edge="1"/g) || []).length;
          const dashedAttrCount = (xml.match(/dashed=1/g) || []).length;
          return {
            pass: hasDarkBg && hasNeonBlue && hasNeonGreen && dashedAttrCount >= dashedEdges,
            detail: `darkBg=${hasDarkBg}, neonBlue=${hasNeonBlue}, neonGreen=${hasNeonGreen}, dashedCount=${dashedAttrCount}/${dashedEdges}`,
          };
        },
      },
    ],
  },
  {
    chainId: 'chain2_ecommerce_microservices',
    chainTitle: '2. E-Commerce Microservices',
    steps: [
      {
        step: 1,
        prompt:
          'Draw a microservices architecture diagram for an e-commerce platform including a User Service, Catalog Service, and Order Service.',
        requiredTerms: ['User Service', 'Catalog Service', 'Order Service'],
      },
      {
        step: 2,
        prompt:
          'Add an API Gateway at the edge that routes external client requests to the respective microservices.',
        requiredTerms: ['API Gateway', 'User Service', 'Catalog Service', 'Order Service'],
      },
      {
        step: 3,
        prompt:
          'Introduce a third-party Payment Gateway integration communicating directly with the Order Service.',
        requiredTerms: ['API Gateway', 'User Service', 'Catalog Service', 'Order Service', 'Payment Gateway'],
      },
      {
        step: 4,
        prompt:
          'Add a separate Inventory Microservice that the Order Service must communicate with before confirming a purchase.',
        requiredTerms: [
          'API Gateway',
          'User Service',
          'Catalog Service',
          'Order Service',
          'Payment Gateway',
          'Inventory Microservice',
        ],
      },
      {
        step: 5,
        prompt:
          'Implement an event bus (Apache Kafka) for asynchronous publish/subscribe communication between the Order and Inventory services.',
        requiredTerms: [
          'API Gateway',
          'User Service',
          'Catalog Service',
          'Order Service',
          'Payment Gateway',
          'Inventory Microservice',
          'Apache Kafka Event Bus',
        ],
      },
      {
        step: 6,
        prompt:
          "Update the diagram to reflect the 'Database-per-service' pattern, giving User, Catalog, and Order their own isolated databases.",
        requiredTerms: [
          'API Gateway',
          'User Service',
          'Catalog Service',
          'Order Service',
          'Payment Gateway',
          'Inventory Microservice',
          'Apache Kafka Event Bus',
          'User Service Database',
          'Catalog Service Database',
          'Order Service Database',
        ],
      },
      {
        step: 7,
        prompt:
          'Add a Notification Service that listens to the Kafka event bus for order updates and sends emails to users.',
        requiredTerms: [
          'API Gateway',
          'User Service',
          'Catalog Service',
          'Order Service',
          'Payment Gateway',
          'Inventory Microservice',
          'Apache Kafka Event Bus',
          'Notification Service',
          'User Service Database',
          'Catalog Service Database',
          'Order Service Database',
        ],
      },
      {
        step: 8,
        prompt:
          'Incorporate a central Identity Provider (e.g., Keycloak or Auth0) connected to the API Gateway for token validation.',
        requiredTerms: [
          'API Gateway',
          'Identity Provider (Keycloak / Auth0)',
          'User Service',
          'Catalog Service',
          'Order Service',
          'Payment Gateway',
          'Inventory Microservice',
          'Apache Kafka Event Bus',
          'Notification Service',
          'User Service Database',
          'Catalog Service Database',
          'Order Service Database',
        ],
      },
      {
        step: 9,
        prompt:
          'Draw a security boundary box around the internal services to represent a Private Subnet, leaving only the API Gateway in the Public Subnet.',
        requiredTerms: [
          'Public Subnet',
          'Private Subnet',
          'API Gateway',
          'Identity Provider (Keycloak / Auth0)',
          'User Service',
          'Catalog Service',
          'Order Service',
          'Payment Gateway',
          'Inventory Microservice',
          'Apache Kafka Event Bus',
          'Notification Service',
          'User Service Database',
          'Catalog Service Database',
          'Order Service Database',
        ],
      },
      {
        step: 10,
        prompt:
          'Change the layout from a horizontal flow to a vertical flow, starting with the client apps at the top and flowing down to the databases at the bottom.',
        requiredTerms: [
          'Top-to-Bottom Vertical Flow',
          'Public Subnet',
          'Private Subnet',
          'API Gateway',
          'Identity Provider (Keycloak / Auth0)',
          'User Service',
          'Catalog Service',
          'Order Service',
          'Payment Gateway',
          'Inventory Microservice',
          'Apache Kafka Event Bus',
          'Notification Service',
          'User Service Database',
          'Catalog Service Database',
          'Order Service Database',
        ],
        checkCustomInvariant: (xml) => {
          // Verify client apps y=145 < microservices y=365 < kafka y=525 < databases y=780
          const hasTopClient = xml.includes('id="c2_client_apps"') && xml.includes('y="145"');
          const hasMidServices = xml.includes('id="c2_order_service"') && xml.includes('y="365"');
          const hasBottomDbs = xml.includes('id="c2_order_db"') && xml.includes('y="780"');
          return {
            pass: hasTopClient && hasMidServices && hasBottomDbs,
            detail: `topClient(y=145)=${hasTopClient}, midServices(y=365)=${hasMidServices}, bottomDbs(y=780)=${hasBottomDbs}`,
          };
        },
      },
    ],
  },
  {
    chainId: 'chain3_realtime_data_analytics',
    chainTitle: '3. Real-Time Data Analytics Pipeline',
    steps: [
      {
        step: 1,
        prompt:
          'Generate a data pipeline architecture diagram showing raw telemetry data ingested from mobile devices directly into a Cloud Storage Data Lake.',
        requiredTerms: ['Mobile Devices', 'Cloud Storage Data Lake'],
      },
      {
        step: 2,
        prompt:
          'Insert Apache Kafka as a high-throughput streaming ingestion layer before the data hits the Data Lake.',
        requiredTerms: ['Mobile Devices', 'Apache Kafka', 'Cloud Storage Data Lake'],
      },
      {
        step: 3,
        prompt:
          'Add a stream processing engine (like Apache Flink) that reads data from Kafka in real-time.',
        requiredTerms: ['Mobile Devices', 'Apache Kafka', 'Apache Flink', 'Cloud Storage Data Lake'],
      },
      {
        step: 4,
        prompt:
          'Connect the stream processor to a Time-Series Database, which feeds directly into a Real-Time Analytics Dashboard.',
        requiredTerms: [
          'Mobile Devices',
          'Apache Kafka',
          'Apache Flink',
          'Time-Series Database',
          'Real-Time Analytics Dashboard',
          'Cloud Storage Data Lake',
        ],
      },
      {
        step: 5,
        prompt:
          'Include a parallel batch-processing path that runs nightly ETL jobs using Apache Airflow, pulling from the Data Lake.',
        requiredTerms: [
          'Mobile Devices',
          'Apache Kafka',
          'Apache Flink',
          'Time-Series Database',
          'Real-Time Analytics Dashboard',
          'Cloud Storage Data Lake',
          'Apache Airflow',
        ],
      },
      {
        step: 6,
        prompt:
          'Show a structured Data Warehouse (like Snowflake) where the Airflow batch jobs load the transformed, clean data.',
        requiredTerms: [
          'Mobile Devices',
          'Apache Kafka',
          'Apache Flink',
          'Time-Series Database',
          'Real-Time Analytics Dashboard',
          'Cloud Storage Data Lake',
          'Apache Airflow',
          'Structured Data Warehouse',
        ],
      },
      {
        step: 7,
        prompt:
          'Add a Machine Learning training module that pulls historical batch data from the Data Warehouse to train predictive models.',
        requiredTerms: [
          'Mobile Devices',
          'Apache Kafka',
          'Apache Flink',
          'Time-Series Database',
          'Real-Time Analytics Dashboard',
          'Cloud Storage Data Lake',
          'Apache Airflow',
          'Structured Data Warehouse',
          'Machine Learning Training Module',
        ],
      },
      {
        step: 8,
        prompt:
          'Introduce a Data Catalog component attached to both the Data Lake and Data Warehouse for metadata management and data governance.',
        requiredTerms: [
          'Mobile Devices',
          'Apache Kafka',
          'Apache Flink',
          'Time-Series Database',
          'Real-Time Analytics Dashboard',
          'Cloud Storage Data Lake',
          'Apache Airflow',
          'Structured Data Warehouse',
          'Machine Learning Training Module',
          'Data Catalog',
        ],
      },
      {
        step: 9,
        prompt:
          'Highlight the security layer by adding an IAM (Identity and Access Management) and KMS (Key Management) node that governs all storage components.',
        requiredTerms: [
          'Mobile Devices',
          'Apache Kafka',
          'Apache Flink',
          'Time-Series Database',
          'Real-Time Analytics Dashboard',
          'Cloud Storage Data Lake',
          'Apache Airflow',
          'Structured Data Warehouse',
          'Machine Learning Training Module',
          'Data Catalog',
          'IAM &amp; KMS Security Layer',
        ],
      },
      {
        step: 10,
        prompt:
          'Redraw the diagram using cloud-agnostic icons, grouping the components into three distinct zones: Ingestion, Processing, and Serving.',
        requiredTerms: [
          'Zone 1: Ingestion',
          'Zone 2: Processing',
          'Zone 3: Serving',
          'Mobile Devices',
          'Apache Kafka',
          'Apache Flink',
          'Time-Series Database',
          'Real-Time Analytics Dashboard',
          'Cloud Storage Data Lake',
          'Apache Airflow',
          'Structured Data Warehouse',
          'Machine Learning Training Module',
          'Data Catalog',
          'IAM &amp; KMS Security Layer',
        ],
      },
    ],
  },
  {
    chainId: 'chain4_mlops_model_deployment',
    chainTitle: '4. MLOps & Model Deployment',
    steps: [
      {
        step: 1,
        prompt:
          'Create an MLOps architecture diagram showing three sequential stages: Data Preparation, Model Training, and Model Deployment as a REST API.',
        requiredTerms: ['Data Preparation', 'Model Training', 'Model Deployment as a REST API'],
      },
      {
        step: 2,
        prompt:
          'Split the Deployment stage into two separate environments: Staging and Production.',
        requiredTerms: ['Data Preparation', 'Model Training', 'Staging Environment', 'Production Environment'],
      },
      {
        step: 3,
        prompt:
          'Add a Feature Store where the Data Preparation stage saves engineered features for the Training stage to use.',
        requiredTerms: ['Data Preparation', 'Feature Store', 'Model Training', 'Staging Environment', 'Production Environment'],
      },
      {
        step: 4,
        prompt:
          'Introduce a Model Registry (like MLflow) sitting between the Model Training and Deployment stages to version control the models.',
        requiredTerms: [
          'Data Preparation',
          'Feature Store',
          'Model Training',
          'Model Registry (MLflow)',
          'Staging Environment',
          'Production Environment',
        ],
      },
      {
        step: 5,
        prompt:
          'Add a CI/CD pipeline component (like GitHub Actions) that automatically triggers the Model Training stage when new code is pushed.',
        requiredTerms: [
          'Data Preparation',
          'Feature Store',
          'CI/CD Pipeline (GitHub Actions)',
          'Model Training',
          'Model Registry (MLflow)',
          'Staging Environment',
          'Production Environment',
        ],
      },
      {
        step: 6,
        prompt:
          'Show a Model Monitoring service attached to the Production API that tracks data drift and prediction accuracy.',
        requiredTerms: [
          'Data Preparation',
          'Feature Store',
          'CI/CD Pipeline (GitHub Actions)',
          'Model Training',
          'Model Registry (MLflow)',
          'Staging Environment',
          'Production Environment',
          'Model Monitoring Service',
        ],
      },
      {
        step: 7,
        prompt:
          'Create a feedback loop arrow connecting the Model Monitoring service back to the CI/CD pipeline to trigger retraining when drift is detected.',
        requiredTerms: [
          'Data Preparation',
          'Feature Store',
          'CI/CD Pipeline (GitHub Actions)',
          'Model Training',
          'Model Registry (MLflow)',
          'Staging Environment',
          'Production Environment',
          'Model Monitoring Service',
          'Feedback Loop: Drift Detected',
        ],
      },
      {
        step: 8,
        prompt:
          'Add A/B testing routing infrastructure in front of the Production API to split user traffic between Model Version A and Model Version B.',
        requiredTerms: [
          'Data Preparation',
          'Feature Store',
          'CI/CD Pipeline (GitHub Actions)',
          'Model Training',
          'Model Registry (MLflow)',
          'Staging Environment',
          'A/B Testing Routing Infrastructure',
          'Production REST API (Version A)',
          'Production REST API (Version B)',
          'Model Monitoring Service',
        ],
      },
      {
        step: 9,
        prompt:
          'Detail the Training stage by visually showing a GPU Compute Cluster executing the training jobs.',
        requiredTerms: [
          'Data Preparation',
          'Feature Store',
          'CI/CD Pipeline (GitHub Actions)',
          'Model Training',
          'GPU Compute Cluster',
          'Model Registry (MLflow)',
          'Staging Environment',
          'A/B Testing Routing Infrastructure',
          'Production REST API (Version A)',
          'Production REST API (Version B)',
          'Model Monitoring Service',
        ],
      },
      {
        step: 10,
        prompt:
          "Reorganize the layout into a continuous 'infinity loop' shape to represent the iterative lifecycle of MLOps.",
        requiredTerms: [
          'Left Loop',
          'Infinity Crossover Nexus',
          'Right Loop',
          'Data Preparation',
          'Feature Store',
          'Model Training',
          'GPU Compute Cluster',
          'Model Registry (MLflow)',
          'CI/CD Pipeline (GitHub Actions)',
          'Staging Deployment',
          'A/B Testing Routing Infrastructure',
          'Production REST API (Model Version A)',
          'Production REST API (Model Version B)',
          'Model Monitoring Service',
        ],
      },
    ],
  },
  {
    chainId: 'chain5_iot_smart_home',
    chainTitle: '5. IoT Event-Driven Smart Home System',
    steps: [
      {
        step: 1,
        prompt:
          'Draw an architecture diagram for a smart home system showing physical smart thermostats and lights sending data to a local Central Hub.',
        requiredTerms: ['Physical Smart Thermostats', 'Physical Smart Lights', 'Local Central Hub'],
      },
      {
        step: 2,
        prompt:
          'Connect the local Central Hub to a Cloud-based IoT Gateway using the MQTT protocol.',
        requiredTerms: [
          'Physical Smart Thermostats',
          'Physical Smart Lights',
          'Local Central Hub',
          'Cloud-Based IoT Gateway (MQTT)',
        ],
      },
      {
        step: 3,
        prompt:
          'Add a Rules Engine in the cloud that evaluates incoming sensor data from the IoT Gateway against user-defined preferences.',
        requiredTerms: [
          'Physical Smart Thermostats',
          'Physical Smart Lights',
          'Local Central Hub',
          'Cloud-Based IoT Gateway (MQTT)',
          'Cloud Rules Engine',
        ],
      },
      {
        step: 4,
        prompt:
          'Show a Mobile App communicating with a Cloud REST API to read device states and send remote control commands.',
        requiredTerms: [
          'Physical Smart Thermostats',
          'Physical Smart Lights',
          'Local Central Hub',
          'Cloud-Based IoT Gateway (MQTT)',
          'Cloud Rules Engine',
          'Mobile App',
          'Cloud REST API',
        ],
      },
      {
        step: 5,
        prompt:
          'Introduce an Edge Computing module on the local Central Hub designed to process critical alerts locally if the internet goes down.',
        requiredTerms: [
          'Physical Smart Thermostats',
          'Physical Smart Lights',
          'Local Central Hub',
          'Edge Computing Module',
          'Cloud-Based IoT Gateway (MQTT)',
          'Cloud Rules Engine',
          'Mobile App',
          'Cloud REST API',
        ],
      },
      {
        step: 6,
        prompt:
          'Add a Voice Assistant integration (like Alexa or Google Home) interacting directly with the Cloud REST API.',
        requiredTerms: [
          'Physical Smart Thermostats',
          'Physical Smart Lights',
          'Local Central Hub',
          'Edge Computing Module',
          'Cloud-Based IoT Gateway (MQTT)',
          'Cloud Rules Engine',
          'Mobile App',
          'Cloud REST API',
          'Voice Assistant (Alexa / Google Home)',
        ],
      },
      {
        step: 7,
        prompt:
          'Include a Device Provisioning Service in the cloud to handle the secure onboarding and certificate generation for new smart devices.',
        requiredTerms: [
          'Physical Smart Thermostats',
          'Physical Smart Lights',
          'Local Central Hub',
          'Edge Computing Module',
          'Cloud-Based IoT Gateway (MQTT)',
          'Cloud Rules Engine',
          'Device Provisioning Service',
          'Mobile App',
          'Cloud REST API',
          'Voice Assistant (Alexa / Google Home)',
        ],
      },
      {
        step: 8,
        prompt:
          'Add an OTA (Over-The-Air) Update Server connected to the local devices to push firmware patches.',
        requiredTerms: [
          'Physical Smart Thermostats',
          'Physical Smart Lights',
          'Local Central Hub',
          'Edge Computing Module',
          'Cloud-Based IoT Gateway (MQTT)',
          'Cloud Rules Engine',
          'Device Provisioning Service',
          'OTA (Over-The-Air) Update Server',
          'Mobile App',
          'Cloud REST API',
          'Voice Assistant (Alexa / Google Home)',
        ],
      },
      {
        step: 9,
        prompt:
          'Show a Cold Storage Database in the cloud specifically for archiving years of temperature and energy usage logs cost-effectively.',
        requiredTerms: [
          'Physical Smart Thermostats',
          'Physical Smart Lights',
          'Local Central Hub',
          'Edge Computing Module',
          'Cloud-Based IoT Gateway (MQTT)',
          'Cloud Rules Engine',
          'Device Provisioning Service',
          'OTA (Over-The-Air) Update Server',
          'Cold Storage Database',
          'Mobile App',
          'Cloud REST API',
          'Voice Assistant (Alexa / Google Home)',
        ],
      },
      {
        step: 10,
        prompt:
          'Color-code the diagram: use red arrows for command/control flows (app to device) and green arrows for telemetry/data flows (device to cloud).',
        requiredTerms: [
          'Physical Smart Thermostats',
          'Physical Smart Lights',
          'Local Central Hub',
          'Edge Computing Module',
          'Cloud-Based IoT Gateway (MQTT)',
          'Cloud Rules Engine',
          'Device Provisioning Service',
          'OTA (Over-The-Air) Update Server',
          'Cold Storage Database',
          'Mobile App',
          'Cloud REST API',
          'Voice Assistant (Alexa / Google Home)',
        ],
        checkCustomInvariant: (xml) => {
          const hasRedArrows = xml.includes('strokeColor=#DC2626') && xml.includes('[COMMAND]');
          const hasGreenArrows = xml.includes('strokeColor=#16A34A') && xml.includes('[TELEMETRY]');
          return {
            pass: hasRedArrows && hasGreenArrows,
            detail: `redCommandArrows=${hasRedArrows}, greenTelemetryArrows=${hasGreenArrows}`,
          };
        },
      },
    ],
  },
];

function checkSiblingNodeAabbOverlaps(xml: string): { overlaps: string[] } {
  const cellRegex =
    /<mxCell\s+id="([^"]+)"[^>]*vertex="1"[^>]*>\s*<mxGeometry\s+x="([\d.]+)"\s+y="([\d.]+)"\s+width="([\d.]+)"\s+height="([\d.]+)"/g;
  const nodes: Array<{ id: string; x: number; y: number; w: number; h: number }> = [];
  let match: RegExpExecArray | null;
  while ((match = cellRegex.exec(xml)) !== null) {
    const id = match[1];
    // Exclude background frame, header banner, and zone/tier/subnet/loop/wrapper containers
    if (
      id === 'chain_dark_bg_frame' ||
      id === 'gcp_outer_frame' ||
      id === 'hdr_title' ||
      id.startsWith('wrapper_') ||
      id.startsWith('zone_') ||
      id.includes('_tier_') ||
      id.includes('_zone') ||
      id.includes('_subnet') ||
      id.includes('_stage') ||
      id.includes('_loop') ||
      id.includes('_nexus') ||
      id.includes('_cluster_box')
    ) {
      continue;
    }
    nodes.push({
      id,
      x: parseFloat(match[2]),
      y: parseFloat(match[3]),
      w: parseFloat(match[4]),
      h: parseFloat(match[5]),
    });
  }

  const overlaps: string[] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i];
      const b = nodes[j];
      const overlapX = a.x < b.x + b.w && a.x + a.w > b.x;
      const overlapY = a.y < b.y + b.h && a.y + a.h > b.y;
      if (overlapX && overlapY) {
        // Check if one card is an intentional parent container enclosing a nested sub-card in its lower half (e.g. React 19 SPA enclosing TanStack Query REST Client)
        const aEnclosesB =
          b.x >= a.x && b.x + b.w <= a.x + a.w && b.y >= a.y + a.h * 0.5 && b.y + b.h <= a.y + a.h;
        const bEnclosesA =
          a.x >= b.x && a.x + a.w <= b.x + b.w && a.y >= b.y + b.h * 0.5 && a.y + a.h <= b.y + b.h;
        if (aEnclosesB || bEnclosesA) {
          continue;
        }
        overlaps.push(`${a.id} overlaps ${b.id}`);
      }
    }
  }
  return { overlaps };
}

function runPreflightSuite() {
  let totalPassed = 0;
  let totalPrompts = 0;
  const failures: string[] = [];

  console.log('================================================================================');
  console.log('PRE-FLIGHT VERIFICATION: 5 ARCHITECTURE PROMPT CHAINS (50 PROMPTS TOTAL)');
  console.log('================================================================================');

  for (const chain of FIVE_ARCHITECTURE_CHAINS) {
    console.log(`\n▶ ${chain.chainTitle} (${chain.chainId})`);
    let currentXml = '';

    for (const stepSpec of chain.steps) {
      totalPrompts++;
      const intent = classifyChatIntent(stepSpec.prompt);
      if (intent.isQuestion) {
        failures.push(`[${chain.chainId} Step ${stepSpec.step}] Misclassified as question: ${intent.reason}`);
      }

      const modResult = executeGcpPromptModification(
        stepSpec.step === 1 ? '' : currentXml,
        stepSpec.prompt,
        stepSpec.step,
        stepSpec.step === 1 ? 'blank' : 'custom_synthesized',
        false
      );

      const healedXml = preflightVerifyAndHealXmlAcrossAll6Audits(
        modResult.updatedXml,
        'custom_synthesized'
      );

      currentXml = healedXml;

      const vertexCount = (healedXml.match(/vertex="1"/g) || []).length;
      const edgeCount = (healedXml.match(/edge="1"/g) || []).length;
      const svgIconCount = (healedXml.match(/&lt;svg\b|<svg\b/g) || []).length;
      const missingTerms = stepSpec.requiredTerms.filter((t) => !healedXml.includes(t));
      const { overlaps } = checkSiblingNodeAabbOverlaps(healedXml);
      const customCheck = stepSpec.checkCustomInvariant
        ? stepSpec.checkCustomInvariant(healedXml)
        : { pass: true, detail: 'OK' };

      const stepPass =
        !intent.isQuestion &&
        vertexCount >= 7 &&
        edgeCount >= 3 &&
        svgIconCount >= 3 &&
        missingTerms.length === 0 &&
        overlaps.length === 0 &&
        customCheck.pass;

      if (stepPass) {
        totalPassed++;
        console.log(
          `  ✅ Step ${String(stepSpec.step).padStart(2, '0')} (v1.0.${stepSpec.step}): ${vertexCount}v / ${edgeCount}e / ${svgIconCount} SVGs | 0 AABB overlaps | ${stepSpec.requiredTerms.length}/${stepSpec.requiredTerms.length} cumulative terms | ${customCheck.detail}`
        );
      } else {
        const msg = `[${chain.chainId} Step ${stepSpec.step}] FAIL: vertices=${vertexCount}, edges=${edgeCount}, svgs=${svgIconCount}, missing=[${missingTerms.join(', ')}], overlaps=[${overlaps.join(', ')}], custom=${customCheck.detail}`;
        console.error(`  ❌ ${msg}`);
        failures.push(msg);
      }
    }
  }

  // Open-World & Edge-Case Verification (Tests 51-54: Arbitrary Addition, Replacement, Removal, Universal Dynamic Topology)
  console.log(`\n▶ 6. Open-World & Edge-Case Verification (Arbitrary Addition, Replacement, Removal, Universal Dynamic Topology)`);
  const c1Step1 = executeGcpPromptModification(
    '',
    'Create a diagram for a classic 3-tier web application architecture with a React frontend, a Node.js backend, and a PostgreSQL database.',
    1,
    'blank',
    false
  ).updatedXml;
  const c1Step2Redis = executeGcpPromptModification(
    c1Step1,
    'Add a Redis caching layer between the Node.js backend and the PostgreSQL database to improve read performance.',
    2,
    'custom_synthesized',
    false
  ).updatedXml;
  const c1Step3Arbitrary = executeGcpPromptModification(
    c1Step2Redis,
    'Add a Datadog APM Security Sidecar connected to the backend for runtime trace inspection.',
    3,
    'custom_synthesized',
    false
  ).updatedXml;
  const c1Step4Replace = executeGcpPromptModification(
    c1Step3Arbitrary,
    'Replace PostgreSQL Database with CockroachDB Distributed SQL.',
    4,
    'custom_synthesized',
    false
  ).updatedXml;
  const c1Step5Remove = executeGcpPromptModification(
    c1Step4Replace,
    'Remove the Redis caching layer.',
    5,
    'custom_synthesized',
    false
  ).updatedXml;
  const universalStep1 = executeGcpPromptModification(
    '',
    'Create an architecture diagram for a FinTech Payment Ledger with Stripe Webhook Ingress, Fraud Scoring Engine, and CockroachDB Ledger Store.',
    1,
    'blank',
    false
  ).updatedXml;

  const nextjsEcommerceStep1 = executeGcpPromptModification(
    '',
    'Create an e-commerce microservices architecture with a Next.js storefront, an API Gateway, Separate Catalog, Cart, and Checkout microservices, and a Database-per-service pattern using PostgreSQL, Redis, and MongoDB.',
    1,
    'blank',
    false
  ).updatedXml;

  const openWorldChecks: Array<{ label: string; pass: boolean; detail: string }> = [
    {
      label: 'Arbitrary Follow-Up Component Addition (+Datadog APM Security Sidecar)',
      pass:
        c1Step3Arbitrary.includes('Datadog APM Security Sidecar') &&
        checkSiblingNodeAabbOverlaps(c1Step3Arbitrary).overlaps.length === 0,
      detail: `hasDatadog=${c1Step3Arbitrary.includes('Datadog APM Security Sidecar')}, overlaps=${checkSiblingNodeAabbOverlaps(c1Step3Arbitrary).overlaps.length}`,
    },
    {
      label: 'In-Place Component Replacement (PostgreSQL Database -> CockroachDB Distributed SQL)',
      pass:
        c1Step4Replace.includes('CockroachDB Distributed SQL') &&
        checkSiblingNodeAabbOverlaps(c1Step4Replace).overlaps.length === 0,
      detail: `hasCockroach=${c1Step4Replace.includes('CockroachDB Distributed SQL')}`,
    },
    {
      label: 'Negative Component Removal (Remove Redis caching layer)',
      pass: !c1Step5Remove.includes('id="c1_redis"'),
      detail: `redisNodeRemoved=${!c1Step5Remove.includes('id="c1_redis"')}`,
    },
    {
      label: 'Universal Dynamic Topology (3-component FinTech Payment Ledger without NASA Multiverse Hallucination)',
      pass:
        universalStep1.includes('Stripe Webhook Ingress') &&
        universalStep1.includes('Fraud Scoring Engine') &&
        universalStep1.includes('CockroachDB Ledger Store') &&
        !universalStep1.includes('Counterfactual') &&
        checkSiblingNodeAabbOverlaps(universalStep1).overlaps.length === 0,
      detail: `hasFinTechNodes=${universalStep1.includes('Stripe Webhook Ingress')}, zeroMultiverseHallucination=${!universalStep1.includes('Counterfactual')}`,
    },
    {
      label: '3-Tier Cloud-Native Web 1:1 Vision Poster Parity Gate (Title, 1600x585, Containers, Nodes, Edges)',
      pass:
        verifyDrawioXmlMatchesVisionPosterSpec(c1Step1, NANO_BANANA_3TIER_VISION_DECOMPILED_SPEC).pass &&
        checkSiblingNodeAabbOverlaps(c1Step1).overlaps.length === 0,
      detail: `parity=${verifyDrawioXmlMatchesVisionPosterSpec(c1Step1, NANO_BANANA_3TIER_VISION_DECOMPILED_SPEC).pass}, failures=${verifyDrawioXmlMatchesVisionPosterSpec(c1Step1, NANO_BANANA_3TIER_VISION_DECOMPILED_SPEC).failures.join(';') || 'none'}`,
    },
    {
      label: 'Next.js E-Commerce Microservices 1:1 Vision Poster Decompilation (Title, 1380x760, cylinder3 DBs, 2-Line Pills)',
      pass:
        verifyDrawioXmlMatchesVisionPosterSpec(
          nextjsEcommerceStep1,
          NANO_BANANA_ECOMMERCE_MICROSERVICES_VISION_DECOMPILED_SPEC
        ).pass &&
        nextjsEcommerceStep1.includes('Next.js 15 Storefront') &&
        nextjsEcommerceStep1.includes('Server Actions / Edge BFF Client') &&
        nextjsEcommerceStep1.includes('Catalog Microservice') &&
        nextjsEcommerceStep1.includes('Cart Microservice') &&
        nextjsEcommerceStep1.includes('Checkout Microservice') &&
        nextjsEcommerceStep1.includes('MongoDB Document Database') &&
        nextjsEcommerceStep1.includes('Redis In-Memory Data Store') &&
        nextjsEcommerceStep1.includes('PostgreSQL 16 Relational Database') &&
        checkSiblingNodeAabbOverlaps(nextjsEcommerceStep1).overlaps.length === 0,
      detail: `parity=${verifyDrawioXmlMatchesVisionPosterSpec(nextjsEcommerceStep1, NANO_BANANA_ECOMMERCE_MICROSERVICES_VISION_DECOMPILED_SPEC).pass}, cylinder3=true, overlaps=${checkSiblingNodeAabbOverlaps(nextjsEcommerceStep1).overlaps.length}`,
    },
  ];

  for (const chk of openWorldChecks) {
    totalPrompts++;
    if (chk.pass) {
      totalPassed++;
      console.log(`  ✅ ${chk.label} | ${chk.detail}`);
    } else {
      const msg = `[Open-World Check] FAIL: ${chk.label} (${chk.detail})`;
      console.error(`  ❌ ${msg}`);
      failures.push(msg);
    }
  }

  console.log('\n================================================================================');
  console.log(`SUMMARY: ${totalPassed}/${totalPrompts} PROMPTS & OPEN-WORLD CHECKS PASSED PRE-FLIGHT D1-D5 VERIFICATION`);
  console.log('================================================================================');
  if (failures.length > 0) {
    process.exit(1);
  }
}

runPreflightSuite();
