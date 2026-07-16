const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const SCREENSHOT_DIR = '/Users/nitinagga/.gemini/jetski/brain/294f418a-1d1d-4926-8b00-e3fd359275ed';

// Ensure dir exists
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

// Clean target screenshots before run
const targetScreenshot = path.join(SCREENSHOT_DIR, 'landing_page_after_fix.png');
if (fs.existsSync(targetScreenshot)) {
  try {
    fs.unlinkSync(targetScreenshot);
    console.log('🧹 Purged existing screenshot file.');
  } catch (e) {
    console.error('Warning during file purge:', e);
  }
}

async function verify() {
  console.log('🚀 Running E2E verification for landing page...');
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  try {
    console.log('Navigating to landing page http://localhost:3000...');
    await page.goto('http://localhost:3000', { waitUntil: 'load' });
    
    // Inject settling delay
    console.log('Waiting for layout to settle (1000ms)...');
    await new Promise(r => setTimeout(r, 1000));

    console.log('Capturing viewport screenshot...');
    await page.screenshot({ path: targetScreenshot });
    console.log('📸 Screenshot saved successfully to:', targetScreenshot);

  } catch (err) {
    console.error('❌ E2E verification failed:', err);
  } finally {
    await browser.close();
  }
}

verify();
