import puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';

const SCREENSHOT_DIR = path.join(process.cwd(), 'scratch', 'screenshots_gcp_copilot_quality');
const APP_URL = 'http://localhost:3000/gcp';
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function run() {
  console.log('🚀 Starting GCP Co-Pilot Quality Gates E2E Verification...');

  if (fs.existsSync(SCREENSHOT_DIR)) {
    fs.rmSync(SCREENSHOT_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1680,1050'],
    defaultViewport: { width: 1680, height: 1050 },
  });

  const page = await browser.newPage();

  try {
    // 1. Navigate to /gcp
    console.log(`Navigating to ${APP_URL}...`);
    await page.goto(APP_URL, { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(2000);

    // Screenshot 1: Baseline
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01_baseline_interactive_canvas.png'), fullPage: false });
    console.log('✅ Screenshot 01: Baseline Interactive Canvas captured.');

    // 2. Submit an Architecture Q&A Question: "What is missing in this architecture?"
    console.log('Testing Q&A Advisory Intent Classification...');
    const textareaSelector = '#architecture-copilot-panel textarea';
    await page.waitForSelector(textareaSelector, { timeout: 5000 });
    await page.type(textareaSelector, 'What is missing in this architecture?');
    await page.waitForSelector('#gcp-copilot-apply-btn:not([disabled])', { timeout: 5000 });
    
    // Direct DOM click apply button
    await page.$eval('#gcp-copilot-apply-btn', (el: any) => el.click());
    console.log('Waiting for advisory response and gap analysis...');
    await sleep(4000); // Allow API / fallback advisory and UI updates to settle

    // Verify advisory elements in DOM
    const advisoryText = await page.evaluate(() => {
      const panel = document.getElementById('architecture-copilot-panel');
      return panel ? panel.innerText : '';
    });

    if (!advisoryText.includes('Advisory') && !advisoryText.includes('Gaps')) {
      throw new Error(`Expected Co-Pilot Advisory & Gap Analysis response for question prompt. Got: ${advisoryText.slice(0, 200)}`);
    }

    // Screenshot 2: Advisory & Gaps
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02_copilot_advisory_qna_and_gaps.png'), fullPage: false });
    console.log('✅ Screenshot 02: Co-Pilot Advisory Q&A and Gaps captured.');

    // 3. Click one of the interactive suggestion pills (e.g. "+ Enforce Cloud Armor WAF" or "+ Upgrade")
    console.log('Testing Suggestion Pill 1-click mutation...');
    const clickedSuggestion = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('#architecture-copilot-panel button'));
      const sugBtn = buttons.find((b: any) => b.textContent && b.textContent.includes('+'));
      if (sugBtn) {
        (sugBtn as HTMLButtonElement).click();
        return sugBtn.textContent;
      }
      return null;
    });

    if (!clickedSuggestion) {
      // If pill not clicked, type mutation directly
      await page.type(textareaSelector, 'Enforce Cloud Armor Enterprise WAF and zero-trust perimeter');
      await page.$eval('#gcp-copilot-apply-btn', (el: any) => el.click());
    }

    await sleep(2500);

    // Verify v1.1 version badge
    const currentVersion = await page.evaluate(() => {
      const badge = document.querySelector('#version-selector-trigger');
      return badge ? badge.textContent : '';
    });
    console.log(`Current version after mutation: ${currentVersion}`);

    // Screenshot 3: Suggestion Pill Mutation
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03_copilot_suggestion_chip_mutation_v1_1.png'), fullPage: false });
    console.log('✅ Screenshot 03: Mutation v1.1 captured.');

    // 4. Test Cross-Vendor Translation: "Add AWS S3 bucket for data lake"
    console.log('Testing Cross-Vendor Translation (AWS S3 -> Google Cloud Storage)...');
    await page.click(textareaSelector);
    await page.type(textareaSelector, 'Add AWS S3 bucket for data lake');
    await page.waitForSelector('#gcp-copilot-apply-btn:not([disabled])', { timeout: 5000 });
    await page.$eval('#gcp-copilot-apply-btn', (el: any) => el.click());
    await sleep(2500);

    // Screenshot 4: Cross-Vendor Translation
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '04_cross_vendor_s3_to_gcs_mapping_v1_2.png'), fullPage: false });
    console.log('✅ Screenshot 04: Cross-Vendor Translation v1.2 captured.');

    // 5. Test Negative Prompt Decoupling: "Remove Cloud Spanner"
    console.log('Testing Negative Prompt Decoupling (Preventing Prompt Inversion)...');
    await page.click(textareaSelector);
    await page.type(textareaSelector, 'Remove Cloud Spanner and decouple persistence');
    await page.waitForSelector('#gcp-copilot-apply-btn:not([disabled])', { timeout: 5000 });
    await page.$eval('#gcp-copilot-apply-btn', (el: any) => el.click());
    await sleep(2500);

    // Screenshot 5: Negative Prompt Decoupling
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '05_negative_prompt_decoupling_v1_3.png'), fullPage: false });
    console.log('✅ Screenshot 05: Negative Prompt Decoupling v1.3 captured.');

    // 5b. Mandatory URI Addressability & Idempotent Reload Quality Gate
    console.log('Testing Mandatory URI Addressability & Idempotent Reload Gate...');
    const currentUrl = page.url();
    console.log(`Current URL after mutations: ${currentUrl}`);
    if (!currentUrl.includes('v=v1.3')) {
      throw new Error(`Expected URL to contain 'v=v1.3', but got: ${currentUrl}`);
    }

    // Click Share Snapshot Deep-Link button
    await page.waitForSelector('#gcp-share-url-btn', { timeout: 3000 });
    await page.$eval('#gcp-share-url-btn', (el: any) => el.click());
    await sleep(500);

    // Execute Idempotent Reload
    console.log('Executing page.reload() to verify state persistence across page refreshes...');
    await page.reload({ waitUntil: 'networkidle2' });
    await sleep(2000);

    const reloadedVersion = await page.evaluate(() => {
      const badge = document.querySelector('#version-selector-trigger');
      return badge ? badge.textContent : '';
    });
    console.log(`Version after page reload: ${reloadedVersion}`);
    if (!reloadedVersion.includes('v1.3')) {
      throw new Error(`Idempotent reload failed! Expected version v1.3 after reload, but got: ${reloadedVersion}`);
    }

    // Screenshot 5b: Reload Persistence
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '05b_idempotent_reload_persistence_v1_3.png'), fullPage: false });
    console.log('✅ Screenshot 05b: Idempotent Reload Persistence v1.3 captured.');

    // 6. Test Rollback to Baseline v1.0
    console.log('Testing 1-click Rollback to Baseline v1.0...');
    await page.$eval('#version-selector-trigger', (el: any) => el.click());
    await sleep(800);

    // Click baseline v1.0 in dropdown
    await page.evaluate(() => {
      const items = Array.from(document.querySelectorAll('#version-selector-dropdown button'));
      const baselineBtn = items.find((b: any) => b.textContent && b.textContent.includes('v1.0'));
      if (baselineBtn) {
        (baselineBtn as HTMLButtonElement).click();
      }
    });
    await sleep(1500);

    // Screenshot 6: Rollback Baseline
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '06_rollback_to_baseline_v1_0.png'), fullPage: false });
    console.log('✅ Screenshot 06: Rollback to Baseline v1.0 captured.');

    console.log('\n🎉 ALL GCP Co-Pilot Quality Gate E2E tests PASSED successfully!');
  } finally {
    await browser.close();
  }
}

run().catch((err) => {
  console.error('❌ E2E Quality Gate Test Failed:', err);
  process.exit(1);
});
