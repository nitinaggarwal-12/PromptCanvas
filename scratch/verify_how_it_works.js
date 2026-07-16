const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const SCREENSHOT_DIR = '/Users/nitinagga/.gemini/jetski/brain/294f418a-1d1d-4926-8b00-e3fd359275ed';
const targetScreenshot = path.join(SCREENSHOT_DIR, 'how_it_works_bigger.png');

if (fs.existsSync(targetScreenshot)) {
  try {
    fs.unlinkSync(targetScreenshot);
    console.log('🧹 Purged existing section screenshot.');
  } catch (e) {
    console.error('Warning during file purge:', e);
  }
}

async function verify() {
  console.log('🚀 Running E2E verification for "How it Works" section...');
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  try {
    console.log('Navigating to landing page...');
    await page.goto('http://localhost:3000/#how-it-works', { waitUntil: 'load' });
    
    console.log('Waiting for layout to settle (1000ms)...');
    await new Promise(r => setTimeout(r, 1000));

    const element = await page.$('#how-it-works');
    if (element) {
      console.log('Capturing element screenshot...');
      await element.screenshot({ path: targetScreenshot });
      console.log('📸 Section screenshot saved successfully to:', targetScreenshot);
    } else {
      console.error('❌ Could not find #how-it-works element!');
    }

  } catch (err) {
    console.error('❌ E2E verification failed:', err);
  } finally {
    await browser.close();
  }
}

verify();
