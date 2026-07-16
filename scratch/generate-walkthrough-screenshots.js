const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const SCREENSHOT_DIR = path.join(__dirname, '../public/walkthrough');

// Clean target directory per E2E rules
if (fs.existsSync(SCREENSHOT_DIR)) {
  fs.rmSync(SCREENSHOT_DIR, { recursive: true, force: true });
}
fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
console.log(`🧹 Purged and recreated target directory: ${SCREENSHOT_DIR}`);

const scenarios = [
  {
    index: 1,
    name: 'Multi-Agent RAG with Advanced Grounding',
    createPrompt: 'Design an enterprise Multi-Agent RAG system. It should include: a secure Client Web portal, an API Gateway with JWT Auth and PII filters, a Router/Orchestrator Agent, specialized Document Chunking and Embedding Agents, a Vector Database (Vertex AI Vector Search), a grounding store (Redis), a compliance/QC feedback loops, and a connection to external Enterprise Knowledge base.',
    modifyPrompt: 'Add a Redis Semantic Cache layer between the API Gateway and the Router Orchestrator Agent to speed up response times.'
  },
  {
    index: 2,
    name: 'Event-Driven Microservices Order Pipeline',
    createPrompt: 'Design an event-driven E-Commerce Order Fulfillment Pipeline. It should include: Web/Mobile Clients, API Gateway, Saga Pattern Orchestrator, Kafka Event Broker, Order Service, Payment Service with secure compliance, Inventory Service, Dead-Letter Queues (DLQ), and a fraud checking compliance loop pointing back to the Orchestrator.',
    modifyPrompt: 'Add an auto-scaling container orchestration layer to host the order and payment microservices.'
  },
  {
    index: 3,
    name: 'High-Availability Hybrid Multi-Cloud System',
    createPrompt: 'Design a high-availability Hybrid Multi-Cloud Web Application. It should include: DNS routing (Route 53) distributing traffic between AWS and GCP, Global HTTPS Load Balancers on both clouds, frontend container apps, distributed SQL Database (Cloud Spanner/Aurora) with cross-cloud replication, and a centralized monitoring/observability agent.',
    modifyPrompt: 'Add Cloud Armor WAF security rules in front of the GCP Load Balancer.'
  },
  {
    index: 4,
    name: 'Data Mesh Analytics Platform',
    createPrompt: 'Design a decentralized Data Mesh Analytics Platform. It should include: Multiple domain data ingestion systems, a central Data Governance and Lineage orchestrator (GCP Dataplex), distributed dbt modeling pipelines, separate domain warehouses (BigQuery/Snowflake), Apache Airflow workflow manager, and automated IAM access control compliance loops.',
    modifyPrompt: 'Add a central data catalog service to allow users to search and discover data assets across domains.'
  },
  {
    index: 5,
    name: 'Secure HIPAA PCI Compliant Payment Gateway',
    createPrompt: 'Design a zero-trust, HIPAA & PCI-DSS compliant Payment Gateway. It should include: Client payment interfaces, AWS API Gateway with Shield DDoS protection, isolated VPC compute instances for tokenization, AWS KMS for envelope encryption, a dedicated auditing and logging vault (CloudTrail/CloudWatch), and automated risk compliance self-healing loops.',
    modifyPrompt: 'Add an isolated hardware security module (HSM) instance inside a private subnet to store root keys.'
  }
];

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function injectFrameworkSafeInput(page, inputSelector, text) {
  await page.evaluate(({ selector, value }) => {
    const el = document.querySelector(selector) || document.activeElement;
    if (!el) return;
    el.focus();

    if (el.tagName.toLowerCase() === 'textarea' || el.tagName.toLowerCase() === 'input') {
      const proto = el.tagName.toLowerCase() === 'textarea' 
        ? window.HTMLTextAreaElement.prototype 
        : window.HTMLInputElement.prototype;
      const setter = Object.getOwnPropertyDescriptor(proto, 'value').set;
      if (setter) setter.call(el, value);
      else el.value = value;
    } else {
      el.innerText = value;
    }

    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  }, { selector: inputSelector, value: text });

  await page.keyboard.type(' ');
  await page.keyboard.press('Backspace');
}

async function clickButtonWithText(page, text) {
  return await page.evaluate((btnText) => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btn = buttons.find(b => b.innerText.includes(btnText));
    if (btn) {
      btn.click();
      return true;
    }
    return false;
  }, text);
}

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    defaultViewport: { width: 1440, height: 950 },
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  try {
    for (const sc of scenarios) {
      console.log(`\n🚀 STARTING SCENARIO ${sc.index}: ${sc.name}`);
      
      // Step 1: Navigate to Create Modal
      console.log(`Navigating to Create modal...`);
      await page.goto('http://localhost:3000/workspace?modal=create', { waitUntil: 'networkidle2' });
      await sleep(1500); // Settling delay
      
      // Type Name and Prompt
      console.log(`Typing name and prompt...`);
      await injectFrameworkSafeInput(page, 'input[placeholder*="Google Cloud E-Commerce"]', `${sc.name}`);
      await sleep(500);
      
      // Select custom prompt
      await page.select('select', 'custom');
      await sleep(500);
      
      await injectFrameworkSafeInput(page, 'textarea', sc.createPrompt);
      await sleep(800);
      
      // Submit form
      console.log(`Submitting form...`);
      await page.click('button[type="submit"]');
      
      // Wait for Gemini API and Draw.io render (35-45s)
      console.log(`⏳ Waiting for diagram generation (up to 50s)...`);
      await sleep(40000);
      
      // Capture Created diagram screenshot
      const createPath = path.join(SCREENSHOT_DIR, `scenario_${sc.index}_create.png`);
      await page.screenshot({ path: createPath });
      console.log(`📸 Captured: ${createPath}`);
      
      // Step 2: Refine / Modify Diagram
      console.log(`Submitting refinement prompt...`);
      await injectFrameworkSafeInput(page, 'form textarea', sc.modifyPrompt);
      await sleep(800);
      
      // Submit modification
      await page.click('form button[type="submit"]');
      
      // Wait for Gemini API and Draw.io render (25-35s)
      console.log(`⏳ Waiting for refinement (up to 40s)...`);
      await sleep(35000);
      
      // Capture Modified diagram screenshot
      const modifyPath = path.join(SCREENSHOT_DIR, `scenario_${sc.index}_modify.png`);
      await page.screenshot({ path: modifyPath });
      console.log(`📸 Captured: ${modifyPath}`);
      
      // Step 3: Switch to Business Use Case tab
      console.log(`Switching to Business Use Case tab...`);
      await page.click('#view-mode-business-btn');
      await sleep(1500); // Settling delay
      
      // Generate Use Cases
      console.log(`Clicking Generate Use Cases button...`);
      const clicked = await clickButtonWithText(page, 'Generate Use Cases with AI');
      if (clicked) {
        console.log(`⏳ Waiting for use case generation (up to 45s)...`);
        await sleep(35000);
      } else {
        console.warn(`⚠️ Generate button not found, use cases might be pre-seeded or already generated.`);
      }
      
      // Capture Business Use Case screenshot
      const businessPath = path.join(SCREENSHOT_DIR, `scenario_${sc.index}_business.png`);
      await page.screenshot({ path: businessPath });
      console.log(`📸 Captured: ${businessPath}`);
      
      // Step 4: Switch to Technical Use Case tab
      console.log(`Switching to Technical Use Case tab...`);
      await page.click('#view-mode-technical-btn');
      await sleep(1500); // Settling delay
      
      // Capture Technical Use Case screenshot
      const technicalPath = path.join(SCREENSHOT_DIR, `scenario_${sc.index}_technical.png`);
      await page.screenshot({ path: technicalPath });
      console.log(`📸 Captured: ${technicalPath}`);
    }
    
    console.log('\n🎉 ALL SCENARIOS GENERATED SUCCESSFUL!');
  } catch (err) {
    console.error('❌ Automation Error:', err);
  } finally {
    await browser.close();
  }
})();
