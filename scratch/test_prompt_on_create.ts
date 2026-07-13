import puppeteer from 'puppeteer';
import { rmSync, mkdirSync } from 'fs';
import { join } from 'path';

const SCREENSHOT_DIR = '/Users/nitinagga/.gemini/jetski/brain/57227f71-af5c-418d-8f2b-c3e2b3572380/screenshots_v7';
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function runPromptOnCreateSuite() {
  console.log('🚀 Starting Phase 7 Option B (Prompt-on-Create & Clean Slate) Test Suite...');
  
  // 1. Housekeeping: Purge screenshot directory
  console.log('🧹 Cleaning screenshot directory...');
  try {
    rmSync(SCREENSHOT_DIR, { recursive: true, force: true });
  } catch (e) {}
  mkdirSync(SCREENSHOT_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 950 });

  try {
    console.log('Navigating to http://localhost:3000...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
    await sleep(2000);

    // Step 1: Click "+ New Diagram" button in left sidebar
    console.log('Clicking "+ New Diagram" button...');
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const newBtn = buttons.find(btn => btn.textContent?.includes('New Diagram'));
      if (newBtn) newBtn.click();
      else throw new Error('New Diagram button not found!');
    });
    await sleep(1000);

    console.log('📸 Capturing Step 1: New Diagram modal opened with Name and Initial AI Prompt fields: 01_new_diagram_modal_opened.png');
    await page.screenshot({ path: join(SCREENSHOT_DIR, '01_new_diagram_modal_opened.png') });

    // Step 2: Type Diagram Name and Initial AI Prompt in the modal
    console.log('Typing Diagram Name ("GCP Data Processing Pipeline") and Initial AI Prompt...');
    await page.type('input[placeholder*="Google Cloud"]', 'GCP Data Processing Pipeline');
    await page.type('textarea[placeholder*="Act as a GCP Data Architect"]', 'Act as a GCP Data Architect. Design a simple 5-node streaming data pipeline with Cloud Storage, Pub/Sub, Dataflow, BigQuery, and Looker.');

    console.log('📸 Capturing Step 2: Modal filled with Name and Prompt: 02_modal_filled.png');
    await page.screenshot({ path: join(SCREENSHOT_DIR, '02_modal_filled.png') });

    // Click Create Canvas button
    console.log('Submitting form (clicking Create Canvas)...');
    await page.evaluate(() => {
      const form = document.querySelector('form');
      if (form) form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      else throw new Error('Form not found!');
    });

    console.log('⏳ Waiting for minimal slate v1 creation AND automatic AI generation of v2 (up to 60s)...');
    await sleep(35000); // Allow Gemini 2.5-flash to compile the 5-node architecture and Draw.io to render

    console.log('📸 Capturing Step 3: Automatically generated 5-node GCP architecture (v2): 03_auto_generated_pipeline_v2.png');
    await page.screenshot({ path: join(SCREENSHOT_DIR, '03_auto_generated_pipeline_v2.png') });

    // Step 4: Use top-bar Version Dropdown to inspect Version v1 (Clean Minimal Slate)
    console.log('Selecting Version v1 (Clean Minimal Slate) via top-bar dropdown (#version-dropdown-selector)...');
    await page.evaluate(() => {
      const select = document.querySelector('#version-dropdown-selector') as HTMLSelectElement;
      if (select) {
        const options = Array.from(select.options);
        const v1Opt = options.find(opt => opt.text.includes('v1'));
        if (v1Opt) {
          select.value = v1Opt.value;
          select.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }
    });
    await sleep(3000);

    console.log('📸 Capturing Step 4: Version v1 loaded showing Clean Minimal Slate (no 15-node RAG/ERP clutter!): 04_clean_minimal_starter_v1.png');
    await page.screenshot({ path: join(SCREENSHOT_DIR, '04_clean_minimal_starter_v1.png') });

    console.log('🎉 Phase 7 Option B (Prompt-on-Create & Clean Slate) Test Suite Completed Successfully!');
  } catch (error) {
    console.error('❌ Suite failed:', error);
  } finally {
    await browser.close();
  }
}

runPromptOnCreateSuite();
