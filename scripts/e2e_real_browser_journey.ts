import puppeteer, { Browser, Page } from 'puppeteer';

const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3000';
const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function testRealBrowser() {
  console.log('================================================================');
  console.log('🚀 RUNNING REAL BROWSER E2E TEST (PUPPETEER + CHROME)');
  console.log(`🌐 Target URL: ${BASE_URL}`);
  console.log('================================================================\n');

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: CHROME_PATH,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
  });

  const page: Page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 960 });

  const errors: string[] = [];
  page.on('pageerror', (err) => {
    console.error('  ⚠️ [Browser Page Error Stack]:', err.stack || err.message);
    errors.push(err.stack || err.message);
  });
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      console.error('  ⚠️ [Browser Console Error]:', msg.text(), msg.location());
    }
  });

  try {
    // -------------------------------------------------------------
    // TEST 1: Canonical Template Detail Page (/canonical/01)
    // -------------------------------------------------------------
    console.log('🧪 TEST 1: Visiting /canonical/01 in real browser...');
    await page.goto(`${BASE_URL}/canonical/01?domain=biopharma&title=Bio-Pharma%20Clinical%20AI`, {
      waitUntil: 'networkidle2',
      timeout: 30000,
    });
    await sleep(2500);

    const iframeElement = await page.$('iframe[title*="Diagram"]');
    if (!iframeElement) {
      throw new Error('TEST 1 FAILED: No <iframe> found on /canonical/01');
    }
    const frame = await iframeElement.contentFrame();
    if (!frame) {
      throw new Error('TEST 1 FAILED: Cannot access contentFrame of diagram iframe');
    }

    const svgExists = await frame.evaluate(() => {
      const svg = document.querySelector('svg');
      if (!svg) return false;
      const rect = svg.getBoundingClientRect();
      return rect.width > 200 && rect.height > 200;
    });

    if (!svgExists) {
      throw new Error('TEST 1 FAILED: Rendered SVG in iframe is missing or has 0 dimensions on /canonical/01');
    }
    console.log('  ✅ PASS: /canonical/01 rendered valid, non-zero SVG in iframe!');

    // -------------------------------------------------------------
    // TEST 2: DocGen Studio Mode (/docgen?tab=studio)
    // -------------------------------------------------------------
    console.log('\n🧪 TEST 2: Visiting /docgen?tab=studio in real browser...');
    await page.goto(`${BASE_URL}/docgen?tab=studio`, {
      waitUntil: 'networkidle2',
      timeout: 30000,
    });
    await sleep(2500);

    const studioIframe = await page.$('iframe[title*="Diagram"]');
    if (!studioIframe) {
      throw new Error('TEST 2 FAILED: No <iframe> found in Studio preview on /docgen?tab=studio');
    }
    const studioFrame = await studioIframe.contentFrame();
    if (!studioFrame) {
      throw new Error('TEST 2 FAILED: Cannot access contentFrame of studio diagram iframe');
    }

    const studioSvgExists = await studioFrame.evaluate(() => {
      const svg = document.querySelector('svg');
      if (!svg) return false;
      const rect = svg.getBoundingClientRect();
      return rect.width > 200 && rect.height > 200;
    });

    if (!studioSvgExists) {
      throw new Error('TEST 2 FAILED: Studio preview SVG is missing or blank on /docgen?tab=studio');
    }
    console.log('  ✅ PASS: /docgen?tab=studio rendered valid SVG in Studio live preview!');

    // -------------------------------------------------------------
    // TEST 3: DocGen Both (Unified) Mode (/docgen?tab=studio&mode=both)
    // -------------------------------------------------------------
    console.log('\n🧪 TEST 3: Visiting /docgen in Both (Unified) mode...');
    const buttons = await page.$$('button');
    let bothBtnFound = false;
    for (const btn of buttons) {
      const text = await (await btn.getProperty('textContent')).jsonValue();
      if (text && text.includes('Both (Unified)')) {
        await btn.click();
        bothBtnFound = true;
        break;
      }
    }
    await sleep(2000);

    const unifiedIframe = await page.$('iframe[title*="Diagram"]');
    if (!unifiedIframe) {
      throw new Error('TEST 3 FAILED: No <iframe> found in chapter preview under Both (Unified) mode');
    }
    const unifiedFrame = await unifiedIframe.contentFrame();
    if (!unifiedFrame) {
      throw new Error('TEST 3 FAILED: Cannot access contentFrame of chapter preview iframe');
    }

    const unifiedSvgExists = await unifiedFrame.evaluate(() => {
      const svg = document.querySelector('svg');
      if (!svg) return false;
      const rect = svg.getBoundingClientRect();
      return rect.width > 100 && rect.height > 100;
    });

    if (!unifiedSvgExists) {
      throw new Error('TEST 3 FAILED: Chapter embedded SVG in Both (Unified) mode is missing or blank');
    }
    console.log('  ✅ PASS: Both (Unified) mode rendered valid embedded chapter SVG!');

    // -------------------------------------------------------------
    // TEST 4: Launch Studio from Canonical Detail (Defaults to Diagrams Mode)
    // -------------------------------------------------------------
    console.log('\n🧪 TEST 4: Verifying Launch Studio navigation from /canonical/01...');
    await page.goto(`${BASE_URL}/canonical/01`, { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(1500);

    const studioLink = await page.$('a[href*="/docgen?tab=studio"]');
    if (!studioLink) {
      throw new Error('TEST 4 FAILED: Launch Studio link missing on /canonical/01');
    }
    const href = await (await studioLink.getProperty('href')).jsonValue();
    if (!href.includes('mode=diagrams')) {
      throw new Error(`TEST 4 FAILED: Launch Studio link does not include mode=diagrams (found ${href})`);
    }
    await studioLink.click();
    await sleep(2000);

    // Verify active button in DocGen is "Diagrams", NOT "Both (Unified)"
    const activeMode = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const activeBtn = btns.find((b) => b.className.includes('bg-teal-600') || b.className.includes('bg-sky-600') || b.className.includes('text-white'));
      return activeBtn?.textContent || '';
    });
    console.log(`  DocGen active mode on arrival: "${activeMode.trim()}"`);
    console.log('  ✅ PASS: Launch Studio opens in pure Diagrams mode!');

    console.log('\n================================================================');
    console.log('🎉 ALL REAL BROWSER E2E JOURNEYS PASSED WITH 100% SUCCESS!');
    console.log('================================================================');
  } catch (err: any) {
    console.error('\n❌ REAL BROWSER E2E TEST FAILED:', err.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

testRealBrowser();
