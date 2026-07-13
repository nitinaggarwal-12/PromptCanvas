import puppeteer from 'puppeteer';
import { rmSync, mkdirSync } from 'fs';
import { join } from 'path';

const SCREENSHOT_DIR = '/Users/nitinagga/.gemini/jetski/brain/57227f71-af5c-418d-8f2b-c3e2b3572380/screenshots_gcp';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function runGcpPromptTest() {
  console.log('🚀 Starting GCP BigQuery Architecture Prompt Execution Suite...');
  
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
  await page.setViewport({ width: 1440, height: 900 });
  
  page.on('console', msg => {
    const text = msg.text();
    if (!text.includes('[HMR]') && !text.includes('React DevTools')) {
      console.log(`[BROWSER CONSOLE] [${msg.type()}] ${text}`);
    }
  });

  try {
    console.log('Navigating to http://localhost:3000...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
    
    await page.waitForSelector('#new-diagram-btn', { timeout: 10000 });
    await sleep(1000);

    console.log('Creating new diagram...');
    await page.$eval('#new-diagram-btn', el => (el as HTMLButtonElement).click());
    await page.waitForSelector('input[placeholder="e.g., Google Cloud E-Commerce"]', { timeout: 5000 });
    await page.type('input[placeholder="e.g., Google Cloud E-Commerce"]', 'GCP BigQuery Enterprise Architecture');
    
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const submitBtn = buttons.find(btn => btn.textContent?.includes('Create Canvas'));
      if (submitBtn) submitBtn.click();
      else throw new Error('Create Canvas button not found');
    });
    
    await page.waitForFunction(
      () => document.querySelector('header h2')?.textContent === 'GCP BigQuery Enterprise Architecture',
      { timeout: 10000 }
    );
    await sleep(1500);

    console.log('Submitting user prompt to Gemini 2.5-flash...');
    const promptText = `Act as a GCP Data Architect. Design an end-to-end BigQuery architecture including a text-based diagram. Detail Google's official best practices for: Ingestion: Batch and streaming. Storage & Compute: Partitioning, clustering, and slot management. Security & Governance: Dataplex, IAM, and row/column-level access. Cost Optimization: Query rules and spend reduction.`;
    
    await page.type('textarea[placeholder*="Apigee Gateway"]', promptText);
    await sleep(500);

    await page.evaluate(() => {
      const textarea = document.querySelector('textarea[placeholder*="Apigee Gateway"]');
      const form = textarea?.closest('form');
      if (form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) (submitBtn as HTMLButtonElement).click();
      }
    });

    console.log('⏳ Waiting for Gemini 2.5-flash response and Draw.io SVG rendering (up to 90s)...');
    await page.waitForFunction(
      () => {
        const dots = Array.from(document.querySelectorAll('.rounded-full'));
        return dots.some(dot => dot.textContent?.trim() === '2');
      },
      { timeout: 90000 }
    );
    await sleep(3000); // 3000ms settling delay for vector engine to finish rendering

    console.log('📸 Capturing: gcp_bigquery_diagram.png');
    await page.screenshot({ path: join(SCREENSHOT_DIR, 'gcp_bigquery_diagram.png') });

    console.log('Switching to Outline view...');
    await page.$eval('#view-mode-outline-btn', el => (el as HTMLButtonElement).click());
    await sleep(1000);

    console.log('📸 Capturing: gcp_bigquery_outline.png');
    await page.screenshot({ path: join(SCREENSHOT_DIR, 'gcp_bigquery_outline.png') });

    console.log('🎉 GCP Prompt Execution & Screenshot Capture Completed Successfully!');
  } catch (error) {
    console.error('❌ Test failed:', error);
    try {
      await page.screenshot({ path: join(SCREENSHOT_DIR, 'error.png') });
    } catch (e) {}
    await browser.close();
    process.exit(1);
  }

  await browser.close();
}

runGcpPromptTest();
