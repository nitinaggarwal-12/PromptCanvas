import puppeteer from 'puppeteer';
import path from 'path';

const OUT_DIR = '/Users/nitinagga/Documents/PromptCanvas/public/blogs-verification-screenshots';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.connect({
  browserURL: 'http://127.0.0.1:9423',
  protocolTimeout: 120000,
  defaultViewport: { width: 1600, height: 1000, deviceScaleFactor: 2 }
});

// 1. BigQuery Studio: Run SELECT * FROM pattern_a_pooled_rls_entities and show Query results table
const bqPage = await browser.newPage();
await bqPage.setViewport({ width: 1600, height: 1000, deviceScaleFactor: 2 });
await bqPage.goto('https://console.cloud.google.com/bigquery?project=nitinagga-ge-2&ws=!1m5!1m4!4m3!1snitinagga-ge-2!2scymbal_agentic_finops_otel!3spattern_a_pooled_rls_entities', {
  waitUntil: 'domcontentloaded',
  timeout: 60000
}).catch(() => {});
await sleep(12000);
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
await bqPage.keyboard.type('*');
await sleep(1500);
// Click the blue "Run" button via DOM
await bqPage.evaluate(() => {
  const btns = Array.from(document.querySelectorAll('button'));
  const runBtn = btns.find(b => (b.textContent || '').trim() === 'Run' || (b.getAttribute('aria-label') || '').includes('Run'));
  if (runBtn) runBtn.click();
}).catch(() => {});
await sleep(7000);
await bqPage.screenshot({ path: path.join(OUT_DIR, 'gcp_console_03_bigquery_studio_pattern_a_rls.png') });
console.log('Saved gcp_console_03_bigquery_studio_pattern_a_rls.png');
await bqPage.close();

// 2. Gemini Enterprise: Click the completed "Verify multi-tenant isolation across Pa..." chat in left nav
const gePage = await browser.newPage();
await gePage.setViewport({ width: 1600, height: 1000, deviceScaleFactor: 2 });
await gePage.goto('https://vertexaisearch.cloud.google.com/us/home/cid/e823f383-deba-4330-9270-ed6ac94cbbc6', {
  waitUntil: 'domcontentloaded',
  timeout: 60000
}).catch(() => {});
await sleep(10000);
// Dismiss "Get started" if shown
await gePage.mouse.click(1008, 735);
await sleep(2000);
// Click the first Recent conversation at x=80, y=368
await gePage.mouse.click(80, 368);
await sleep(6000);
await gePage.screenshot({ path: path.join(OUT_DIR, 'gcp_console_08_gemini_enterprise_app_live_exec.png') });
console.log('Saved gcp_console_08_gemini_enterprise_app_live_exec.png');
await gePage.close();

await browser.disconnect();
