import puppeteer from 'puppeteer';
import { join } from 'path';

const SCREENSHOT_DIR = '/Users/nitinagga/.gemini/jetski/brain/5bf245c3-5d88-44e5-b952-6a18dfe48f5d';
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function capture() {
  console.log('🚀 Starting screen captures...');
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  try {
    // 1. Capture Empty Workspace State
    console.log('Navigating to empty workspace...');
    await page.goto('http://localhost:3000/workspace', { waitUntil: 'networkidle2' });
    await sleep(2000);
    console.log('Capturing: workspace_empty_state.png');
    await page.screenshot({ path: join(SCREENSHOT_DIR, 'workspace_empty_state.png') });

    // 2. Select diagram to load
    console.log('Clicking the first diagram in sidebar...');
    await page.evaluate(() => {
      const btn = document.querySelector('aside .group') as HTMLElement;
      if (btn) btn.click();
    });
    await sleep(3500); // Wait for canvas load

    console.log('Capturing: workspace_loaded.png');
    await page.screenshot({ path: join(SCREENSHOT_DIR, 'workspace_loaded.png') });

  } catch (err) {
    console.error(err);
  } finally {
    await browser.close();
  }
}

capture();
