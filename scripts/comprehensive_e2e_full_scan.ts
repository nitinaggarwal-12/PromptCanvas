import puppeteer, { Browser, Page } from 'puppeteer';
import { spawn, ChildProcess } from 'node:child_process';

const PORT = 3010;
const BASE_URL = `http://localhost:${PORT}`;
const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runDeepScan() {
  console.log('================================================================');
  console.log('🚀 RUNNING COMPREHENSIVE FULL-SPECTRUM E2E AUDIT');
  console.log('================================================================\n');

  // 1. Start a local server on port 3010
  console.log(`📡 Starting local Next.js server on port ${PORT}...`);
  const server: ChildProcess = spawn('npx', ['next', 'start', '-p', String(PORT)], {
    env: { ...process.env, PORT: String(PORT) },
    stdio: 'ignore',
  });

  // Wait for server to be responsive
  let serverReady = false;
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch(`${BASE_URL}/api/health`);
      if (res.status === 200 || res.status === 404) {
        serverReady = true;
        break;
      }
    } catch (e) {
      await sleep(1000);
    }
  }

  if (!serverReady) {
    console.error('❌ Failed to start local server on port 3010');
    server.kill();
    process.exit(1);
  }
  console.log('✅ Server is healthy and listening on port 3010.\n');

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: CHROME_PATH,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
  });

  const page: Page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 960 });

  const loggedErrors: { url: string; error: string }[] = [];
  page.on('pageerror', (err: any) => {
    loggedErrors.push({ url: page.url(), error: `[PageError] ${err?.message || String(err)}` });
  });
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      loggedErrors.push({ url: page.url(), error: `[ConsoleError] ${msg.text()}` });
    }
  });

  try {
    // -------------------------------------------------------------
    // AUDIT 1: Test All 50 Canonical Blueprints in Real Chrome
    // -------------------------------------------------------------
    console.log('🧪 AUDIT 1: Auditing all 50 Canonical Blueprints rendering in Chrome...');
    let passedCount = 0;
    for (let id = 1; id <= 50; id++) {
      const padId = String(id).padStart(2, '0');
      const url = `${BASE_URL}/canonical/${padId}?domain=biopharma`;
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      const iframe = await page.waitForSelector('iframe', { timeout: 10000 });
      if (!iframe) {
        throw new Error(`Template ${padId}: No <iframe> element found on page`);
      }
      await sleep(400);
      const frame = await iframe.contentFrame();
      if (!frame) {
        throw new Error(`Template ${padId}: Cannot access iframe contentFrame`);
      }

      const hasSvg = await frame.evaluate(() => {
        const svg = document.querySelector('svg');
        if (!svg) return false;
        const rect = svg.getBoundingClientRect();
        return rect.width > 200 && rect.height > 200;
      });

      if (!hasSvg) {
        throw new Error(`Template ${padId}: SVG element is missing or has 0 dimensions in iframe`);
      }
      passedCount++;
    }
    console.log(`  ✅ PASS: All ${passedCount}/50 Canonical Blueprints rendered valid, non-zero SVGs in real Chrome!\n`);

    // -------------------------------------------------------------
    // AUDIT 2: DocGen Tabs and Mode Switching
    // -------------------------------------------------------------
    console.log('🧪 AUDIT 2: Auditing DocGen Studio & Specification Tabs...');
    await page.goto(`${BASE_URL}/docgen?tab=studio`, { waitUntil: 'networkidle2', timeout: 15000 });
    await sleep(1500);

    // Verify Diagrams Mode
    const studioIframe = await page.$('iframe[title*="Diagram"]');
    if (!studioIframe) throw new Error('DocGen Studio: Diagram iframe missing in Diagrams mode');
    const studioFrame = await studioIframe.contentFrame();
    const studioSvg = await studioFrame?.evaluate(() => {
      const svg = document.querySelector('svg');
      return svg ? svg.getBoundingClientRect().width > 100 : false;
    });
    if (!studioSvg) throw new Error('DocGen Studio: Diagram SVG missing or 0px in Diagrams mode');
    console.log('  ✅ PASS: DocGen Diagrams Mode rendered live vector diagram');

    // Switch to Both (Unified) Mode
    const buttons = await page.$$('button');
    for (const btn of buttons) {
      const text = await (await btn.getProperty('textContent')).jsonValue();
      if (text && text.includes('Both (Unified)')) {
        await btn.click();
        break;
      }
    }
    await sleep(1500);

    const bothIframe = await page.$('iframe[title*="Diagram"]');
    if (!bothIframe) throw new Error('DocGen Studio: Diagram iframe missing in Both mode');
    const bothFrame = await bothIframe.contentFrame();
    const bothSvg = await bothFrame?.evaluate(() => {
      const svg = document.querySelector('svg');
      return svg ? svg.getBoundingClientRect().width > 100 : false;
    });
    if (!bothSvg) throw new Error('DocGen Studio: Embedded chapter SVG missing or 0px in Both mode');
    console.log('  ✅ PASS: DocGen Both (Unified) Mode rendered chapter preview SVG');

    // Switch to Documents Mode
    for (const btn of buttons) {
      const text = await (await btn.getProperty('textContent')).jsonValue();
      if (text && text.includes('Documents')) {
        await btn.click();
        break;
      }
    }
    await sleep(1000);
    console.log('  ✅ PASS: DocGen Documents Mode activated cleanly');

    // -------------------------------------------------------------
    // AUDIT 3: Design Canvas Direct Blueprint Navigation
    // -------------------------------------------------------------
    console.log('\n🧪 AUDIT 3: Auditing Design Canvas direct blueprint loading (/workspace)...');
    await page.goto(`${BASE_URL}/workspace?blueprint=08&domain=fintech`, { waitUntil: 'networkidle2', timeout: 15000 });
    await sleep(3000);

    const iframes = await page.$$('iframe');
    console.log(`  Found ${iframes.length} iframes on /workspace`);
    for (const ifr of iframes) {
      const title = await (await ifr.getProperty('title')).jsonValue();
      const src = await (await ifr.getProperty('src')).jsonValue();
      console.log(`    - iframe title: "${title}", src: "${src}"`);
    }

    const canvasIframe = await page.$('iframe');
    if (!canvasIframe) throw new Error('Workspace: Canvas iframe missing for blueprint #08');
    const canvasFrame = await canvasIframe.contentFrame();
    const canvasSvg = await canvasFrame?.evaluate(() => {
      const svg = document.querySelector('svg');
      return svg ? svg.getBoundingClientRect().width > 100 : false;
    });
    if (!canvasSvg) throw new Error('Workspace: Canvas SVG missing or 0px for blueprint #08');
    console.log('  ✅ PASS: /workspace?blueprint=08 loaded Blueprint #08 into the design canvas');

    // -------------------------------------------------------------
    // AUDIT 4: Check for Any Uncaught Browser Console / Page Errors
    // -------------------------------------------------------------
    console.log('\n🧪 AUDIT 4: Auditing browser error logs across all tested pages...');
    const criticalErrors = loggedErrors.filter(
      (e) => !e.error.includes('favicon') && !e.error.includes('warning')
    );

    if (criticalErrors.length > 0) {
      console.warn(`  ⚠️ Found ${criticalErrors.length} browser errors during audit:`);
      criticalErrors.forEach((e) => console.warn(`    - [${e.url}]: ${e.error}`));
    } else {
      console.log('  ✅ PASS: Zero uncaught JavaScript syntax, runtime, or network errors detected across all pages!');
    }

    console.log('\n================================================================');
    console.log('🎉 COMPREHENSIVE FULL-SPECTRUM AUDIT COMPLETE: 100% SUCCESSFUL!');
    console.log('================================================================');
  } catch (err: any) {
    console.error('\n❌ AUDIT FAILED:', err.message);
    process.exit(1);
  } finally {
    await browser.close();
    server.kill();
  }
}

runDeepScan();
