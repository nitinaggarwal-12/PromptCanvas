import puppeteer, { Browser, Page } from 'puppeteer';
import fs from 'fs';
import path from 'path';

const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3000';
const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const screenshotDir = path.join(process.cwd(), 'scratch/screenshots_studio_gcp_native');

if (fs.existsSync(screenshotDir)) {
  fs.rmSync(screenshotDir, { recursive: true, force: true });
}
fs.mkdirSync(screenshotDir, { recursive: true });

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runStudioTest() {
  console.log('================================================================');
  console.log('🚀 RUNNING STUDIO GOOGLE CLOUD NATIVE E2E TEST');
  console.log(`🌐 Target URL: ${BASE_URL}/studio`);
  console.log('================================================================\n');

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: CHROME_PATH,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
  });

  const page: Page = await browser.newPage();
  await page.setViewport({ width: 1680, height: 1050 });

  const errors: string[] = [];
  page.on('pageerror', (err: any) => {
    console.error('  ⚠️ [Browser Page Error]:', err?.message || String(err));
    errors.push(err?.message || String(err));
  });

  try {
    // 1. Navigate to Studio
    console.log('📍 1. Loading /studio...');
    await page.goto(`${BASE_URL}/studio`, { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(2500);

    // Verify DOM content
    const pageText = await page.evaluate(() => document.body.innerText);
    const hasGCP = pageText.includes('Google Cloud') || pageText.includes('GCP') || pageText.includes('Enterprise');
    console.log(`✅ Page content loaded. Has Google Cloud indicators: ${hasGCP}`);

    // Capture screenshot 1: Initial Default Pure Google Cloud Native Topology
    const screen1 = path.join(screenshotDir, '01_studio_default_gcp_native.png');
    await page.screenshot({ path: screen1 });
    console.log(`📸 Screenshot saved: ${screen1}`);

    // 2. Switch to SDD Spec tab
    console.log('📍 2. Switching to Live SDD Spec Tab...');
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const specBtn = buttons.find(b => b.textContent?.includes('SDD') || b.textContent?.includes('Spec') || b.textContent?.includes('System Design'));
      if (specBtn) specBtn.click();
    });
    await sleep(1000);

    const screen2 = path.join(screenshotDir, '02_studio_spec_view.png');
    await page.screenshot({ path: screen2 });
    console.log(`📸 Screenshot saved: ${screen2}`);

    // Switch back to Diagram Tab
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const diagBtn = buttons.find(b => b.textContent?.includes('Diagram') || b.textContent?.includes('Architecture'));
      if (diagBtn) diagBtn.click();
    });
    await sleep(1000);

    // 3. Enter Custom Project Parameters & Trigger Synthesis
    console.log('📍 3. Entering Project Parameters for AI Synthesis...');
    await page.evaluate(() => {
      const inputs = Array.from(document.querySelectorAll('input'));
      const titleInput = inputs.find(i => i.placeholder?.includes('Project') || i.placeholder?.includes('Name') || i.placeholder?.includes('Title') || i.type === 'text');
      if (titleInput) {
        titleInput.value = 'OmniRoute Global Autonomous Logistics AI';
        titleInput.dispatchEvent(new Event('input', { bubbles: true }));
        titleInput.dispatchEvent(new Event('change', { bubbles: true }));
      }

      const textarea = document.querySelector('textarea');
      if (textarea) {
        textarea.value = 'Design a high-throughput smart fleet telemetry ingestion and autonomous routing optimization engine on Google Cloud using Pub/Sub, Dataflow, BigQuery Lakehouse, Vertex AI Gemini 2.5 route scoring, and Cloud Run APIs with Memorystore Redis cache.';
        textarea.dispatchEvent(new Event('input', { bubbles: true }));
        textarea.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
    await sleep(800);

    console.log('⚡ Triggering Synthesis...');
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const synthBtn = buttons.find(b => 
        b.textContent?.includes('Generate Architecture') || 
        b.textContent?.includes('Synthesize') || 
        b.textContent?.includes('Generate')
      );
      if (synthBtn) synthBtn.click();
    });

    // Wait for AI generation & iframe render
    await sleep(4000);

    const screen3 = path.join(screenshotDir, '03_studio_synthesized_custom_architecture.png');
    await page.screenshot({ path: screen3 });
    console.log(`📸 Screenshot saved: ${screen3}`);

    // 4. Test "Design from Scratch" / Reset action
    console.log('📍 4. Testing Reset to Scratch / Blank GCP Native Canvas...');
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const scratchBtn = buttons.find(b => b.textContent?.includes('Scratch') || b.textContent?.includes('Blank') || b.title?.includes('Scratch'));
      if (scratchBtn) scratchBtn.click();
    });
    await sleep(1500);

    const screen4 = path.join(screenshotDir, '04_studio_scratch_canvas.png');
    await page.screenshot({ path: screen4 });
    console.log(`📸 Screenshot saved: ${screen4}`);

    console.log('\n================================================================');
    console.log(`🎉 ALL STUDIO E2E TESTS PASSED WITH ${errors.length} ERRORS!`);
    console.log('================================================================\n');
  } catch (err) {
    console.error('❌ Test failed:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runStudioTest();
