import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const OUT_DIR = path.resolve(process.cwd(), 'screenshots/5chains-evolution');
const ARTIFACT_DIR =
  '/Users/nitinagga/.gemini/jetski/brain/e207ead0-f0c5-4c72-af1f-b78e93830642';

fs.mkdirSync(OUT_DIR, { recursive: true });

const FIVE_CHAINS = [
  {
    chainId: 'chain1_cloud_native_web',
    chainTitle: '1. Cloud-Native Web Application',
    steps: [
      {
        step: 1,
        prompt:
          'Create a diagram for a classic 3-tier web application architecture with a React frontend, Node.js backend API, and a PostgreSQL database.',
        requiredTerms: ['React Frontend', 'Node.js Backend API', 'PostgreSQL Database'],
      },
      {
        step: 2,
        prompt:
          'Add a caching layer using Redis between the Node.js backend and the PostgreSQL database.',
        requiredTerms: ['React Frontend', 'Node.js Backend API', 'Redis Caching Layer', 'PostgreSQL Database'],
      },
      {
        step: 3,
        prompt:
          'Introduce a Load Balancer in front of the backend servers to distribute incoming traffic.',
        requiredTerms: ['React Frontend', 'Load Balancer', 'Node.js Backend API', 'Redis Caching Layer', 'PostgreSQL Database'],
      },
      {
        step: 4,
        prompt:
          'Separate the Node.js backend into two distinct services: an Authentication Service and a Core API Service.',
        requiredTerms: [
          'React Frontend',
          'Load Balancer',
          'Authentication Service',
          'Core API Service',
          'Redis Caching Layer',
          'PostgreSQL Database',
        ],
      },
      {
        step: 5,
        prompt:
          'Add a CDN (Content Delivery Network) in front of the React frontend to serve static assets globally.',
        requiredTerms: [
          'CDN (Content Delivery Network)',
          'React Frontend',
          'Load Balancer',
          'Authentication Service',
          'Core API Service',
          'Redis Caching Layer',
          'PostgreSQL Database',
        ],
      },
      {
        step: 6,
        prompt:
          'Include a monitoring and logging stack using Prometheus and Grafana connected to all backend services.',
        requiredTerms: [
          'CDN (Content Delivery Network)',
          'React Frontend',
          'Load Balancer',
          'Authentication Service',
          'Core API Service',
          'Prometheus',
          'Grafana',
          'Redis Caching Layer',
          'PostgreSQL Database',
        ],
      },
      {
        step: 7,
        prompt:
          'Change the deployment infrastructure to show the backend services running inside a Kubernetes cluster.',
        requiredTerms: [
          'CDN (Content Delivery Network)',
          'React Frontend',
          'Load Balancer',
          'Kubernetes Cluster',
          'Authentication Service',
          'Core API Service',
          'Prometheus',
          'Grafana',
          'Redis Caching Layer',
          'PostgreSQL Database',
        ],
      },
      {
        step: 8,
        prompt:
          'Add an Object Storage service (like AWS S3) connected to the Core API for storing user-uploaded media files.',
        requiredTerms: [
          'CDN (Content Delivery Network)',
          'React Frontend',
          'Load Balancer',
          'Kubernetes Cluster',
          'Authentication Service',
          'Core API Service',
          'Object Storage Service (AWS S3)',
          'Prometheus',
          'Grafana',
          'Redis Caching Layer',
          'PostgreSQL Database',
        ],
      },
      {
        step: 9,
        prompt:
          'Introduce a background worker process that pulls async tasks from a RabbitMQ queue populated by the Core API.',
        requiredTerms: [
          'CDN (Content Delivery Network)',
          'React Frontend',
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
          'PostgreSQL Database',
        ],
      },
      {
        step: 10,
        prompt:
          "Update the diagram's style to use a dark theme with neon blue and green accents, and make the data flow arrows dashed.",
        requiredTerms: [
          'CDN (Content Delivery Network)',
          'React Frontend',
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
          'PostgreSQL Database',
        ],
        expectDarkCanvas: true,
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
          'PUBLIC SUBNET',
          'PRIVATE SUBNET',
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
          'IAM & KMS Security Layer',
        ],
      },
      {
        step: 10,
        prompt:
          'Redraw the diagram using cloud-agnostic icons, grouping the components into three distinct zones: Ingestion, Processing, and Serving.',
        requiredTerms: [
          'ZONE 1: INGESTION',
          'ZONE 2: PROCESSING',
          'ZONE 3: SERVING',
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
          'IAM & KMS Security Layer',
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
          'LEFT LOOP',
          'INFINITY CROSSOVER NEXUS',
          'RIGHT LOOP',
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
          '[COMMAND]',
          '[TELEMETRY]',
        ],
      },
    ],
  },
];

async function setReactTextareaValue(page, selector, value) {
  await page.waitForSelector(selector, { visible: true, timeout: 15000 });
  await page.evaluate(
    (sel, val) => {
      const el = document.querySelector(sel);
      if (!el) throw new Error(`Element not found: ${sel}`);
      el.focus();
      const nativeSetter = Object.getOwnPropertyDescriptor(
        window.HTMLTextAreaElement.prototype,
        'value'
      )?.set;
      if (nativeSetter) {
        nativeSetter.call(el, val);
      } else {
        el.value = val;
      }
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    },
    selector,
    value
  );
}

async function waitForStepRenderedInIframe(page, expectedStep, timeoutMs = 20000) {
  const expectedBadge = `STEP ${expectedStep} OF 10 • v1.0.${expectedStep} VERIFIED`;
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    // 1. Check that AI synthesis spinner has finished
    const isProcessing = await page.evaluate(() => {
      return Boolean(document.querySelector('#dashboard-ai-planning-status'));
    });
    if (!isProcessing) {
      // 2. Inspect the Draw.io iframe
      const frames = page.frames();
      for (const frame of frames) {
        try {
          const info = await frame.evaluate((badge) => {
            const container = document.getElementById('diagram-container');
            if (!container) return null;
            const svg = container.querySelector('svg');
            if (!svg) return null;
            const textContent = (container.innerText || container.textContent || '').replace(/\s+/g, ' ');
            if (!textContent.includes(badge)) return null;
            const rects = svg.querySelectorAll('rect').length;
            const paths = svg.querySelectorAll('path').length;
            const bodyBg = window.getComputedStyle(document.body).backgroundColor;
            return {
              matched: true,
              textContent,
              rects,
              paths,
              bodyBg,
            };
          }, expectedBadge);
          if (info && info.matched) {
            return info;
          }
        } catch {}
      }
    }
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error(`Timed out waiting for Draw.io iframe to render "${expectedBadge}"`);
}

async function runSuite() {
  console.log('================================================================================');
  console.log('LAUNCHING HEADLESS CHROME PUPPETEER: 5 CHAINS x 10 PROMPTS = 50 UI EXECUTIONS');
  console.log('================================================================================');

  const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: fs.existsSync(chromePath) ? chromePath : undefined,
    defaultViewport: { width: 1560, height: 960, deviceScaleFactor: 1 },
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  const report = {
    executedAt: new Date().toISOString(),
    totalChains: 5,
    totalPrompts: 50,
    passedPrompts: 0,
    chains: [],
  };

  try {
    console.log(`Navigating to ${BASE_URL}/dashboard ...`);
    await page.goto(`${BASE_URL}/dashboard`, { waitUntil: 'networkidle2', timeout: 45000 });
    await page.waitForSelector('[data-testid="dashboard-new-diagram-btn"]', { visible: true, timeout: 20000 });
    await new Promise((r) => setTimeout(r, 1200));

    // Capture baseline "Before" screenshot prior to starting the 5 prompt chains
    const beforePath = path.join(OUT_DIR, 'before_5chains_baseline.png');
    await page.screenshot({ path: beforePath, fullPage: false });
    if (fs.existsSync(ARTIFACT_DIR)) {
      fs.copyFileSync(beforePath, path.join(ARTIFACT_DIR, 'before_5chains_baseline.png'));
    }

    for (const chain of FIVE_CHAINS) {
      console.log(`\n▶ Starting ${chain.chainTitle} (${chain.chainId})`);
      const chainResult = {
        chainId: chain.chainId,
        chainTitle: chain.chainTitle,
        steps: [],
      };

      for (const stepSpec of chain.steps) {
        const t0 = Date.now();
        if (stepSpec.step === 1) {
          // Open "+ New Diagram" -> AI Prompt tab -> enter initial prompt -> click Synthesize
          await page.click('[data-testid="dashboard-new-diagram-btn"]');
          await page.waitForSelector('[data-testid="new-diagram-tab-prompt"]', { visible: true, timeout: 10000 });
          await page.click('[data-testid="new-diagram-tab-prompt"]');
          await setReactTextareaValue(page, '[data-testid="new-diagram-prompt-textarea"]', stepSpec.prompt);
          await new Promise((r) => setTimeout(r, 150));
          await page.click('[data-testid="new-diagram-synthesize-submit-btn"]');
        } else {
          // Enter follow-up prompt in left-pane AI Co-Pilot composer -> click Synthesize Modification
          await setReactTextareaValue(page, '#dashboard-prompt-composer-input', stepSpec.prompt);
          await new Promise((r) => setTimeout(r, 120));
          await page.click('#dashboard-prompt-submit-btn');
        }

        const iframeInfo = await waitForStepRenderedInIframe(page, stepSpec.step, 25000);
        // Brief settle for SVG fit & paint
        await new Promise((r) => setTimeout(r, 350));

        // Verify top header version badge
        const headerVersionText = await page.evaluate(() => {
          const badge = document.querySelector('#dashboard-session-copy-badge');
          return badge ? badge.textContent || '' : '';
        });

        const upperIframeText = iframeInfo.textContent.toUpperCase();
        const missingTerms = stepSpec.requiredTerms.filter(
          (term) => !upperIframeText.includes(term.toUpperCase())
        );

        const darkCheckPass = stepSpec.expectDarkCanvas
          ? iframeInfo.bodyBg === 'rgb(15, 23, 42)'
          : true;

        const screenshotName = `${chain.chainId}_step${String(stepSpec.step).padStart(2, '0')}.png`;
        const screenshotPath = path.join(OUT_DIR, screenshotName);
        await page.screenshot({ path: screenshotPath, fullPage: false });

        // Copy milestone evolution screenshots (Step 1, Step 4, Step 7, Step 10) to artifact directory
        if ([1, 4, 7, 10].includes(stepSpec.step) && fs.existsSync(ARTIFACT_DIR)) {
          fs.copyFileSync(screenshotPath, path.join(ARTIFACT_DIR, screenshotName));
        }

        const durationMs = Date.now() - t0;
        const pass =
          headerVersionText.includes(`v1.0.${stepSpec.step}`) &&
          missingTerms.length === 0 &&
          iframeInfo.rects >= 5 &&
          iframeInfo.paths >= 3 &&
          darkCheckPass;

        if (pass) {
          report.passedPrompts++;
          console.log(
            `  ✅ Step ${String(stepSpec.step).padStart(2, '0')} (v1.0.${stepSpec.step}) [${durationMs}ms]: SVG rects=${iframeInfo.rects}, paths=${iframeInfo.paths}, bg=${iframeInfo.bodyBg} | ${stepSpec.requiredTerms.length}/${stepSpec.requiredTerms.length} terms rendered | 📸 ${screenshotName}`
          );
        } else {
          console.error(
            `  ❌ Step ${String(stepSpec.step).padStart(2, '0')} FAIL: headerBadge="${headerVersionText}", missingTerms=[${missingTerms.join(', ')}], rects=${iframeInfo.rects}, paths=${iframeInfo.paths}, bg=${iframeInfo.bodyBg}`
          );
        }

        chainResult.steps.push({
          step: stepSpec.step,
          versionTag: `v1.0.${stepSpec.step}`,
          prompt: stepSpec.prompt,
          pass,
          durationMs,
          svgRects: iframeInfo.rects,
          svgPaths: iframeInfo.paths,
          canvasBg: iframeInfo.bodyBg,
          missingTerms,
          screenshotPath,
        });
      }

      report.chains.push(chainResult);
    }

    const reportPath = path.join(OUT_DIR, '5chains_50prompts_puppeteer_report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    console.log('\n================================================================================');
    console.log(
      `PUPPETEER E2E SUMMARY: ${report.passedPrompts}/${report.totalPrompts} PROMPTS PASSED LIVE UI & SVG RENDERING`
    );
    console.log(`Screenshots saved to: ${OUT_DIR}`);
    console.log(`JSON Audit Report:    ${reportPath}`);
    console.log('================================================================================');

    if (report.passedPrompts !== report.totalPrompts) {
      process.exitCode = 1;
    }
  } finally {
    await browser.close();
  }
}

runSuite().catch((err) => {
  console.error('Puppeteer suite fatal error:', err);
  process.exit(1);
});
