import puppeteer from 'puppeteer';
import { join } from 'path';

const SCREENSHOT_DIR = '/Users/nitinagga/.gemini/jetski/brain/57227f71-af5c-418d-8f2b-c3e2b3572380/screenshots_gcp';
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function captureCurrentPreview() {
  console.log('🚀 Launching live preview capture suite on localhost:3000...');

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  try {
    console.log('Navigating to dashboard...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
    await sleep(1500);

    // Click on the most recent diagram in the sidebar (GCP BigQuery Enterprise Architecture)
    console.log('Selecting active diagram from sidebar...');
    await page.evaluate(() => {
      const items = Array.from(document.querySelectorAll('aside li, aside button, aside div'));
      const target = items.find(el => el.textContent?.includes('GCP BigQuery Enterprise Architecture'));
      if (target) {
        (target as HTMLElement).click();
      } else {
        // Fallback: click the first diagram item in the list
        const firstItem = document.querySelector('aside ul li button, aside ul li div');
        if (firstItem) (firstItem as HTMLElement).click();
      }
    });

    console.log('⏳ Waiting for active diagram v2 to load and render...');
    await sleep(3500); // Allow Draw.io vector engine to render completely

    console.log('📸 Capturing live active draft (v2): live_current_v2.png');
    await page.screenshot({ path: join(SCREENSHOT_DIR, 'live_current_v2.png') });

    // Now let's test the "Preview" button on Version v1 in the Version History sidebar
    console.log('Clicking "Preview" on Version v1 in Version History...');
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const previewBtns = buttons.filter(btn => btn.textContent?.trim() === 'Preview');
      // The second preview button corresponds to older version v1 (since v2 is latest)
      if (previewBtns.length >= 2) {
        previewBtns[1].click();
      } else if (previewBtns.length === 1) {
        previewBtns[0].click();
      } else {
        console.warn('No preview button found!');
      }
    });

    console.log('⏳ Waiting for Preview mode banner and canvas rendering...');
    await sleep(3500);

    console.log('📸 Capturing live preview (v1): live_preview_v1.png');
    await page.screenshot({ path: join(SCREENSHOT_DIR, 'live_preview_v1.png') });

    // Switch to Outline View while in Preview mode
    console.log('Switching to Outline view in Preview mode...');
    const outlineBtn = await page.$('#view-mode-outline-btn');
    if (outlineBtn) {
      await outlineBtn.click();
      await sleep(1500);
      console.log('📸 Capturing live preview outline: live_preview_v1_outline.png');
      await page.screenshot({ path: join(SCREENSHOT_DIR, 'live_preview_v1_outline.png') });
    }

    console.log('🎉 Live Preview Capture Completed Successfully!');
  } catch (error) {
    console.error('❌ Capture failed:', error);
  } finally {
    await browser.close();
  }
}

captureCurrentPreview();
