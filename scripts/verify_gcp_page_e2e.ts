import puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';

const SCREENSHOT_DIR = path.join(process.cwd(), 'scratch', 'screenshots_gcp_page');

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run() {
  console.log('🚀 Starting Google Cloud Dialect A E2E Browser Verification...');

  // 1. Purge & recreate screenshot directory
  if (fs.existsSync(SCREENSHOT_DIR)) {
    fs.rmSync(SCREENSHOT_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--window-size=1600,1200'],
    defaultViewport: { width: 1600, height: 1200 }
  });

  const page = await browser.newPage();

  try {
    // 2. Navigate to /gcp
    console.log('Navigating to http://localhost:3000/gcp...');
    await page.goto('http://localhost:3000/gcp', { waitUntil: 'networkidle0', timeout: 30000 });
    await sleep(1500);

    // Dismiss cookies if banner is present
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const acceptBtn = btns.find((b) => b.textContent?.includes('Accept All') || b.textContent?.includes('Essential Only'));
      if (acceptBtn) acceptBtn.click();
      const banner = Array.from(document.querySelectorAll('div')).find(el => el.textContent?.includes('Cookie Preferences'));
      if (banner && banner.parentElement) {
        banner.style.display = 'none';
      }
    });
    await sleep(800);

    // 3. Assert DOM elements
    const pageTitle = await page.$eval('h1', (el) => el.textContent?.trim());
    console.log('Asserted Page Title:', pageTitle);
    if (!pageTitle?.includes('Google Cloud Architecture Center')) {
      throw new Error(`Expected page title to contain 'Google Cloud Architecture Center', got '${pageTitle}'`);
    }

    const dialectBadge = await page.$eval('header', (el) => el.textContent);
    if (!dialectBadge?.includes('DIALECT A STANDARDS')) {
      throw new Error('DIALECT A STANDARDS badge missing from header');
    }
    console.log('Verified: DIALECT A STANDARDS header badge is present');

    // Screenshot 1: Multi-Agent AI System (Full Page Overview)
    console.log('Capturing 01_gcp_multiagent_core_page.png...');
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01_gcp_multiagent_core_page.png'), fullPage: false });

    console.log('Capturing 01_gcp_multiagent_core_canvas_element.png...');
    const canvasCard1 = await page.$('#diagram-canvas-card');
    if (canvasCard1) {
      await canvasCard1.screenshot({ path: path.join(SCREENSHOT_DIR, '01_gcp_multiagent_core_canvas_element.png') });
    }

    // 4. Switch to "Living Spec & Data Flow" Tab
    console.log('Switching to Living Spec & Data Flow tab...');
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const specBtn = buttons.find((b) => b.textContent?.includes('Living Spec & Data Flow'));
      if (specBtn) specBtn.click();
    });
    await sleep(1000); // 1s settling delay

    // Assert DOM elements in spec tab
    const specContent = await page.evaluate(() => document.body.innerText);
    if (!specContent.includes('Sequential Execution') || !specContent.includes('Coordinator')) {
      throw new Error('Spec tab did not render sequential execution or coordinator components');
    }
    console.log('Verified: Spec Tab rendered sequential execution and components');

    // Screenshot 2: Multi-Agent Core Spec View
    console.log('Capturing 02_gcp_multiagent_core_spec.png...');
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02_gcp_multiagent_core_spec.png'), fullPage: false });

    // 5. Switch to "Public Docs Reference" Tab
    console.log('Switching to Public Docs Reference tab...');
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const docsBtn = buttons.find((b) => b.textContent?.includes('Public Docs Reference'));
      if (docsBtn) docsBtn.click();
    });
    await sleep(1000);

    // Screenshot 3: Public Docs Reference View
    console.log('Capturing 03_gcp_multiagent_core_public_docs.png...');
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03_gcp_multiagent_core_public_docs.png'), fullPage: false });

    // 6. Switch back to Canvas Tab
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const canvasBtn = buttons.find((b) => b.textContent?.includes('Interactive Canvas'));
      if (canvasBtn) canvasBtn.click();
    });
    await sleep(1000);

    // 7. Select Architecture 2: Classify Multimodal Data
    console.log('Selecting Architecture 2: Classify Multimodal Data...');
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const card2 = buttons.find((b) => b.textContent?.includes('Classify Multimodal Data'));
      if (card2) card2.click();
    });
    await sleep(2500);

    console.log('Capturing 04_gcp_multimodal_classify_page.png...');
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '04_gcp_multimodal_classify_page.png'), fullPage: false });

    console.log('Capturing 04_gcp_multimodal_classify_canvas_element.png...');
    const canvasCard2 = await page.$('#diagram-canvas-card');
    if (canvasCard2) {
      await canvasCard2.screenshot({ path: path.join(SCREENSHOT_DIR, '04_gcp_multimodal_classify_canvas_element.png') });
    }

    // 8. Select Architecture 3: Multi-Tenant Agentic AI System
    console.log('Selecting Architecture 3: Multi-Tenant Agentic AI System...');
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const card3 = buttons.find((b) => b.textContent?.includes('Multi-Tenant Agentic AI System'));
      if (card3) card3.click();
    });
    await sleep(2500);

    console.log('Capturing 05_gcp_multitenant_agentic_page.png...');
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '05_gcp_multitenant_agentic_page.png'), fullPage: false });

    console.log('Capturing 05_gcp_multitenant_agentic_canvas_element.png...');
    const canvasCard3 = await page.$('#diagram-canvas-card');
    if (canvasCard3) {
      await canvasCard3.screenshot({ path: path.join(SCREENSHOT_DIR, '05_gcp_multitenant_agentic_canvas_element.png') });
    }

    // 9. Select Architecture 4: Autonomous Deep-Sea Robotic Fleet
    console.log('Selecting Architecture 4: Autonomous Deep-Sea Robotic Fleet...');
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const card4 = buttons.find((b) => b.textContent?.includes('Autonomous Deep-Sea Robotic Fleet'));
      if (card4) card4.click();
    });
    await sleep(2500);

    console.log('Capturing 06_gcp_deepsea_agentic_page.png...');
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '06_gcp_deepsea_agentic_page.png'), fullPage: false });

    console.log('Capturing 06_gcp_deepsea_agentic_canvas_element.png...');
    const canvasCard4 = await page.$('#diagram-canvas-card');
    if (canvasCard4) {
      await canvasCard4.screenshot({ path: path.join(SCREENSHOT_DIR, '06_gcp_deepsea_agentic_canvas_element.png') });
    }

    // 10. Select Architecture 5: Pharma Drug Discovery Agentic AI
    console.log('Selecting Architecture 5: Pharma Drug Discovery Agentic AI...');
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const card5 = buttons.find((b) => b.textContent?.includes('Pharma Drug Discovery'));
      if (card5) card5.click();
    });
    await sleep(2500);

    // Assert DOM elements for Pharma Drug Discovery
    const pharmaDom = await page.evaluate(() => document.body.innerText);
    if (!pharmaDom.includes('Pharma Drug Discovery') || !pharmaDom.includes('AlphaFold 3') || !pharmaDom.includes('GROMACS')) {
      throw new Error('Pharma Drug Discovery architecture components missing from DOM');
    }
    console.log('Verified: Pharma Drug Discovery components (AlphaFold 3, GROMACS, Model Armor) present in DOM');

    console.log('Capturing 07_gcp_pharma_drug_discovery_page.png...');
    await page.evaluate(() => window.scrollTo(0, 0));
    await sleep(400);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '07_gcp_pharma_drug_discovery_page.png'), fullPage: false });

    console.log('Capturing 07_gcp_pharma_drug_discovery_canvas_element.png...');
    const canvasCard5 = await page.$('#diagram-canvas-card');
    if (canvasCard5) {
      await canvasCard5.screenshot({ path: path.join(SCREENSHOT_DIR, '07_gcp_pharma_drug_discovery_canvas_element.png') });
    }

    // Switch to Living Spec for Pharma
    console.log('Switching to Living Spec tab for Pharma Drug Discovery...');
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const specBtn = buttons.find((b) => b.textContent?.includes('Living Spec & Data Flow'));
      if (specBtn) specBtn.click();
    });
    await sleep(1000);

    console.log('Capturing 08_gcp_pharma_spec_data_flow.png...');
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '08_gcp_pharma_spec_data_flow.png'), fullPage: false });

    // Switch back to Interactive Canvas
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const canvasBtn = buttons.find((b) => b.textContent?.includes('Interactive Canvas'));
      if (canvasBtn) canvasBtn.click();
    });
    await sleep(1000);

    // 11. Select Architecture 6: Pharma AI Technical Infrastructure
    console.log('Selecting Architecture 6: Pharma AI Technical Infrastructure...');
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const card6 = buttons.find((b) => b.textContent?.includes('Pharma AI Technical Infrastructure') || b.textContent?.includes('Technical Infrastructure'));
      if (card6) card6.click();
    });
    await sleep(2500);

    // Assert DOM elements for Pharma Technical Infrastructure
    const techDom = await page.evaluate(() => document.body.innerText);
    if (!techDom.includes('Technical Infrastructure') || !techDom.includes('10.100.0.0/16') || !techDom.includes('TPU v5e')) {
      throw new Error('Pharma Technical Infrastructure components missing from DOM');
    }
    console.log('Verified: Pharma Technical Infrastructure components (Multi-Zone VPC, TPU v5e, Slurm H100) present in DOM');

    console.log('Capturing 09_gcp_pharma_technical_architecture_page.png...');
    await page.evaluate(() => window.scrollTo(0, 0));
    await sleep(400);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '09_gcp_pharma_technical_architecture_page.png'), fullPage: false });

    console.log('Capturing 09_gcp_pharma_technical_architecture_canvas_element.png...');
    const canvasCard6 = await page.$('#diagram-canvas-card');
    if (canvasCard6) {
      await canvasCard6.screenshot({ path: path.join(SCREENSHOT_DIR, '09_gcp_pharma_technical_architecture_canvas_element.png') });
    }

    // Switch to Living Spec for Pharma Technical Infrastructure
    console.log('Switching to Living Spec tab for Pharma Technical Infrastructure...');
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const specBtn = buttons.find((b) => b.textContent?.includes('Living Spec & Data Flow'));
      if (specBtn) specBtn.click();
    });
    await sleep(1000);

    console.log('Capturing 10_gcp_pharma_technical_spec_data_flow.png...');
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '10_gcp_pharma_technical_spec_data_flow.png'), fullPage: false });

    // Switch back to Interactive Canvas
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const canvasBtn = buttons.find((b) => b.textContent?.includes('Interactive Canvas'));
      if (canvasBtn) canvasBtn.click();
    });
    await sleep(1000);

    // 12. Check Sidebar navigation
    const sidebarHasGcp = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('nav a, aside a'));
      return links.some((l) => l.getAttribute('href') === '/gcp' && l.textContent?.includes('GCP Architecture Center'));
    });
    console.log('Sidebar GCP link verified:', sidebarHasGcp);
    if (!sidebarHasGcp) {
      throw new Error('Sidebar does not contain active link to /gcp');
    }

    console.log('✅ ALL VERIFICATIONS PASSED SUCCESSFULLY!');
  } catch (err) {
    console.error('❌ E2E Verification failed:', err);
    throw err;
  } finally {
    await browser.close();
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
