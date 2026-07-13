import puppeteer from 'puppeteer';
import { join } from 'path';

const SCREENSHOT_DIR = '/Users/nitinagga/.gemini/jetski/brain/57227f71-af5c-418d-8f2b-c3e2b3572380/screenshots_gcp';
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function capturePowerBiScroll() {
  console.log('🚀 Launching PowerBI scroll & zoom verification on localhost:3000...');

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 950 });

  try {
    console.log('Navigating to dashboard...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
    await sleep(1500);

    // Select the GCP BigQuery diagram (08fbd745...)
    console.log('Selecting GCP BigQuery diagram...');
    await page.evaluate(() => {
      const items = Array.from(document.querySelectorAll('aside li, aside button, aside div'));
      const target = items.find(el => el.textContent?.includes('GCP BigQuery Enterprise Architecture'));
      if (target) {
        (target as HTMLElement).click();
      }
    });

    console.log('⏳ Waiting for active diagram (v4 / v3) to load...');
    await sleep(3500);

    // Click the Zoom Out (-) button twice so that Y=810 (PowerBI) comes into full view
    console.log('Clicking Zoom Out (-) button twice to reveal bottom tier (Y=810)...');
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const zoomOutBtn = buttons.find(btn => btn.textContent?.trim() === '-' || btn.getAttribute('title')?.includes('Zoom Out'));
      if (zoomOutBtn) {
        zoomOutBtn.click();
        zoomOutBtn.click();
      }
    });

    await sleep(1500);
    console.log('📸 Capturing zoomed out view showing PowerBI: powerbi_zoomed_out.png');
    await page.screenshot({ path: join(SCREENSHOT_DIR, 'powerbi_zoomed_out.png') });

    // Also scroll down the iframe/canvas container
    await page.evaluate(() => {
      const container = document.querySelector('.overflow-auto, .mxgraph, iframe');
      if (container) {
        container.scrollTop = 400;
      }
      window.scrollTo(0, 400);
    });
    await sleep(1000);

    console.log('📸 Capturing scrolled down view: powerbi_scrolled.png');
    await page.screenshot({ path: join(SCREENSHOT_DIR, 'powerbi_scrolled.png') });

    // Switch to Outline View to show PowerBI listed in the Tree Inspector
    console.log('Switching to Outline view...');
    const outlineBtn = await page.$('#view-mode-outline-btn');
    if (outlineBtn) {
      await outlineBtn.click();
      await sleep(1500);
      console.log('📸 Capturing outline showing PowerBI: powerbi_in_outline.png');
      await page.screenshot({ path: join(SCREENSHOT_DIR, 'powerbi_in_outline.png') });
    }

    console.log('🎉 PowerBI Verification Suite Completed Successfully!');
  } catch (error) {
    console.error('❌ Verification failed:', error);
  } finally {
    await browser.close();
  }
}

capturePowerBiScroll();
