import puppeteer from 'puppeteer';
import path from 'path';

const OUT_DIR = '/Users/nitinagga/Documents/PromptCanvas/public/blogs-verification-screenshots';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.connect({
  browserURL: 'http://127.0.0.1:9423',
  protocolTimeout: 120000,
  defaultViewport: { width: 1600, height: 1000, deviceScaleFactor: 2 }
});

const gePage = await browser.newPage();
await gePage.setViewport({ width: 1600, height: 1000, deviceScaleFactor: 2 });
await gePage.goto('https://vertexaisearch.cloud.google.com/us/home/cid/e823f383-deba-4330-9270-ed6ac94cbbc6', {
  waitUntil: 'domcontentloaded',
  timeout: 60000
}).catch(() => {});
await sleep(9000);
// Dismiss "Get started" if shown
await gePage.mouse.click(1008, 735);
await sleep(2000);
// Click "Veeva Vault Clinical Docs table" at x=80, y=468
await gePage.mouse.click(80, 468);
await sleep(6000);
await gePage.screenshot({ path: path.join(OUT_DIR, 'gcp_console_08_gemini_enterprise_app_live_exec.png') });
console.log('Saved gcp_console_08_gemini_enterprise_app_live_exec.png');

// Also capture Cloud Console AI Applications / Gemini Enterprise Engines list
await gePage.goto('https://console.cloud.google.com/gen-app-builder/engines?project=nitinagga-ge-2', {
  waitUntil: 'domcontentloaded',
  timeout: 60000
}).catch(() => {});
await sleep(12000);
await gePage.screenshot({ path: path.join(OUT_DIR, 'gcp_console_09_vertex_ai_agent_builder_engines.png') });
console.log('Saved gcp_console_09_vertex_ai_agent_builder_engines.png');

await gePage.close();
await browser.disconnect();
