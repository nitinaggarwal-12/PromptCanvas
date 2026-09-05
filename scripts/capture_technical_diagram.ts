import puppeteer from 'puppeteer';
import * as path from 'path';

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run() {
  const SCREENSHOT_DIR = path.join(process.cwd(), 'scratch', 'screenshots_gcp_page');
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--window-size=1600,1200'],
    defaultViewport: { width: 1600, height: 1200 }
  });

  const page = await browser.newPage();
  try {
    await page.goto('http://localhost:3000/gcp', { waitUntil: 'networkidle0', timeout: 30000 });
    await sleep(1000);

    // Dismiss cookies banner
    await page.evaluate(() => {
      const banner = Array.from(document.querySelectorAll('div')).find(el => el.textContent?.includes('Cookie Preferences'));
      if (banner && banner.parentElement) {
        banner.style.display = 'none';
      }
    });

    // Select Architecture 6: Pharma AI Technical Infrastructure
    console.log('Selecting Architecture 6...');
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const card6 = buttons.find((b) => b.textContent?.includes('Pharma AI Technical Infrastructure') || b.textContent?.includes('Technical Infrastructure'));
      if (card6) card6.click();
    });
    await sleep(2500);

    console.log('Capturing canvas element...');
    const canvasCard = await page.$('#diagram-canvas-card');
    if (canvasCard) {
      await canvasCard.screenshot({ path: path.join(SCREENSHOT_DIR, '09_gcp_pharma_technical_architecture_canvas_element.png') });
    }

    console.log('Capturing full page...');
    await page.evaluate(() => window.scrollTo(0, 0));
    await sleep(400);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '09_gcp_pharma_technical_architecture_page.png'), fullPage: false });

    console.log('Done!');
    await browser.close();
    process.exit(0);
  } finally {
    try { await browser.close(); } catch {}
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
