import puppeteer from 'puppeteer';
import path from 'path';

const OUT_DIR = '/Users/nitinagga/Documents/PromptCanvas/public/blogs-verification-screenshots';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.connect({
  browserURL: 'http://127.0.0.1:9423',
  protocolTimeout: 120000,
  defaultViewport: { width: 1600, height: 1000, deviceScaleFactor: 2 }
});

// 1. BigQuery Studio: Run SELECT * FROM pattern_a_pooled_rls_entities
const bqPage = await browser.newPage();
await bqPage.setViewport({ width: 1600, height: 1000, deviceScaleFactor: 2 });
console.log('Opening BigQuery Studio Pattern A table...');
await bqPage.goto('https://console.cloud.google.com/bigquery?project=nitinagga-ge-2&ws=!1m5!1m4!4m3!1snitinagga-ge-2!2scymbal_agentic_finops_otel!3spattern_a_pooled_rls_entities', {
  waitUntil: 'domcontentloaded',
  timeout: 60000
}).catch(() => {});
await sleep(13000);

// Click "Query" button (around x=408, y=150 or via DOM)
await bqPage.evaluate(() => {
  const btns = Array.from(document.querySelectorAll('button, a, span'));
  const qBtn = btns.find(b => (b.textContent || '').trim() === 'Query');
  if (qBtn) qBtn.click();
}).catch(() => {});
await sleep(2500);
await bqPage.evaluate(() => {
  const items = Array.from(document.querySelectorAll('[role="menuitem"], button'));
  const newTab = items.find(i => (i.textContent || '').includes('In new tab') || (i.textContent || '').includes('new tab'));
  if (newTab) newTab.click();
}).catch(() => {});
await sleep(4500);

// Type '*' at the cursor position right after SELECT
await bqPage.keyboard.type('*');
await sleep(1000);

// Click "Run" button at x=374, y=108 (and via DOM)
await bqPage.mouse.click(374, 108);
await sleep(8000);
await bqPage.screenshot({ path: path.join(OUT_DIR, 'gcp_console_03_bigquery_studio_pattern_a_rls.png') });
console.log('Saved gcp_console_03_bigquery_studio_pattern_a_rls.png');
await bqPage.close();

// 2. Gemini Enterprise App: dismiss "Get started" and execute live query
const gePage = await browser.newPage();
await gePage.setViewport({ width: 1600, height: 1000, deviceScaleFactor: 2 });
console.log('Opening Gemini Enterprise App...');
await gePage.goto('https://vertexaisearch.cloud.google.com/us/home/cid/e823f383-deba-4330-9270-ed6ac94cbbc6', {
  waitUntil: 'domcontentloaded',
  timeout: 60000
}).catch(() => {});
await sleep(10000);

// Click "Get started" button on welcome dialog (x=1008, y=735)
await gePage.mouse.click(1008, 735);
await sleep(2500);

// Click main prompt box in center (x=680, y=430) and type query
await gePage.mouse.click(680, 430);
await sleep(1000);
await gePage.keyboard.type('Verify multi-tenant isolation across Pattern A Pooled RLS, Pattern B FinVault CMEK Silo, and Pattern C PSC Hub-and-Spoke VPC', { delay: 10 });
await sleep(1000);
await gePage.keyboard.press('Enter');
await sleep(14000);
await gePage.screenshot({ path: path.join(OUT_DIR, 'gcp_console_08_gemini_enterprise_app_live_exec.png') });
console.log('Saved gcp_console_08_gemini_enterprise_app_live_exec.png');
await gePage.close();

await browser.disconnect();
console.log('DONE!');
