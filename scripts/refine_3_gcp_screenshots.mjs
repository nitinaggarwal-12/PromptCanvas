import puppeteer from 'puppeteer';
import path from 'path';

const OUT_DIR = '/Users/nitinagga/Documents/PromptCanvas/public/blogs-verification-screenshots';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.connect({
  browserURL: 'http://127.0.0.1:9423',
  defaultViewport: { width: 1600, height: 1000, deviceScaleFactor: 2 }
});

const page = await browser.newPage();
await page.setViewport({ width: 1600, height: 1000, deviceScaleFactor: 2 });

// 1. Trigger a fresh request to cymbal-multi-tenant-patterns so logs are hot
await fetch('https://cymbal-multi-tenant-patterns-638420508320.us-central1.run.app').catch(() => {});

// 2. Capture Cloud Run Logs tab directly showing live execution logs & HTTP 200
console.log('Capturing Cloud Run Logs tab...');
await page.goto('https://console.cloud.google.com/run/detail/us-central1/cymbal-multi-tenant-patterns/logs?project=nitinagga-ge-2', {
  waitUntil: 'domcontentloaded',
  timeout: 60000
}).catch(() => {});
await sleep(14000);
await page.screenshot({ path: path.join(OUT_DIR, 'gcp_console_07_logs_explorer_20_20_pass.png') });
console.log('Saved gcp_console_07_logs_explorer_20_20_pass.png');

// 3. BigQuery Studio: Open Pattern A table, click Schema/Details or open SQL editor and run query
console.log('Capturing BigQuery Studio SQL Query execution on Pattern A RLS table...');
await page.goto('https://console.cloud.google.com/bigquery?project=nitinagga-ge-2&ws=!1m5!1m4!4m3!1snitinagga-ge-2!2scymbal_agentic_finops_otel!3spattern_a_pooled_rls_entities', {
  waitUntil: 'domcontentloaded',
  timeout: 60000
}).catch(() => {});
await sleep(13000);
// Click "Query" button to open SQL editor with SELECT * FROM pattern_a_pooled_rls_entities
await page.evaluate(() => {
  const btns = Array.from(document.querySelectorAll('button, a, span'));
  const qBtn = btns.find(b => (b.textContent || '').trim() === 'Query');
  if (qBtn) qBtn.click();
});
await sleep(3000);
// If a menu opened ("In new tab"), click it
await page.evaluate(() => {
  const items = Array.from(document.querySelectorAll('[role="menuitem"], button'));
  const newTab = items.find(i => (i.textContent || '').includes('In new tab') || (i.textContent || '').includes('new tab'));
  if (newTab) newTab.click();
});
await sleep(5000);
// Click Run button in BigQuery Studio
await page.evaluate(() => {
  const btns = Array.from(document.querySelectorAll('button'));
  const runBtn = btns.find(b => {
    const t = (b.textContent || '').trim();
    return t === 'Run' || t.startsWith('Run');
  });
  if (runBtn) runBtn.click();
});
await sleep(8000);
await page.screenshot({ path: path.join(OUT_DIR, 'gcp_console_03_bigquery_studio_pattern_a_rls.png') });
console.log('Saved gcp_console_03_bigquery_studio_pattern_a_rls.png');

// 4. Gemini Enterprise App: dismiss "Get started" modal and run a live enterprise query
console.log('Capturing Gemini Enterprise live query execution...');
await page.goto('https://vertexaisearch.cloud.google.com/us/home/cid/e823f383-deba-4330-9270-ed6ac94cbbc6', {
  waitUntil: 'domcontentloaded',
  timeout: 60000
}).catch(() => {});
await sleep(10000);
// Dismiss "Get started" button if present
await page.evaluate(() => {
  const btns = Array.from(document.querySelectorAll('button, a, span'));
  const getStarted = btns.find(b => (b.textContent || '').trim() === 'Get started');
  if (getStarted) getStarted.click();
});
await sleep(3000);
// Type query into Gemini Enterprise input box and submit
const typed = await page.evaluate(() => {
  const editables = Array.from(document.querySelectorAll('textarea, [contenteditable="true"], input[type="text"]'));
  const target = editables.find(el => el.offsetParent !== null);
  if (target) {
    target.focus();
    return true;
  }
  return false;
});
if (typed) {
  await page.keyboard.type('Verify multi-tenant isolation across Pattern A Pooled RLS, Pattern B FinVault CMEK Silo, and Pattern C PSC Hub-and-Spoke VPC', { delay: 15 });
  await sleep(1500);
  await page.keyboard.press('Enter');
  await sleep(12000);
}
await page.screenshot({ path: path.join(OUT_DIR, 'gcp_console_08_gemini_enterprise_app_live_exec.png') });
console.log('Saved gcp_console_08_gemini_enterprise_app_live_exec.png');

await page.close();
await browser.disconnect();
