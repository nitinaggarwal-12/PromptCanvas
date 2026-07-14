import puppeteer from 'puppeteer';
import { rmSync, mkdirSync } from 'fs';
import { join } from 'path';

const SCREENSHOT_DIR = '/Users/nitinagga/.gemini/jetski/brain/5bf245c3-5d88-44e5-b952-6a18dfe48f5d/screenshots_tour';

// Helper to sleep/wait
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function runTourTest() {
  console.log('🚀 Starting Onboarding Tour Verification...');
  
  // Clean screenshots directory
  try {
    rmSync(SCREENSHOT_DIR, { recursive: true, force: true });
  } catch (e) {}
  mkdirSync(SCREENSHOT_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // Pipe page console logs to terminal
  page.on('console', msg => console.log(`[BROWSER CONSOLE] [${msg.type()}] ${msg.text()}`));

  try {
    console.log('\n--- STEP 1: Launching Tour Welcome Overlay ---');
    await page.goto('http://localhost:3000/workspace?tour=true', { waitUntil: 'networkidle2' });
    await sleep(1500); // Wait for page compiling/settling
    
    // Capture Welcome Overlay
    await page.screenshot({ path: join(SCREENSHOT_DIR, '01_tour_welcome.png') });
    console.log('📸 Captured 01_tour_welcome.png');

    // Click Next Button (DOM-level click)
    await page.evaluate(() => {
      const nextBtn = document.querySelector('#tour-next-btn');
      if (nextBtn) (nextBtn as HTMLButtonElement).click();
      else throw new Error('Next button not found in Step 1 welcome card');
    });
    await sleep(1000); // Animation settling delay

    console.log('\n--- STEP 2: Navigation Dock Highlight ---');
    await page.screenshot({ path: join(SCREENSHOT_DIR, '02_tour_nav_dock.png') });
    console.log('📸 Captured 02_tour_nav_dock.png');

    await page.evaluate(() => {
      const nextBtn = document.querySelector('#tour-next-btn');
      if (nextBtn) (nextBtn as HTMLButtonElement).click();
      else throw new Error('Next button not found in Step 2 card');
    });
    await sleep(1000);

    console.log('\n--- STEP 3: AI Assistant Panel Highlight ---');
    await page.screenshot({ path: join(SCREENSHOT_DIR, '03_tour_ai_panel.png') });
    console.log('📸 Captured 03_tour_ai_panel.png');

    await page.evaluate(() => {
      const nextBtn = document.querySelector('#tour-next-btn');
      if (nextBtn) (nextBtn as HTMLButtonElement).click();
      else throw new Error('Next button not found in Step 3 card');
    });
    await sleep(1000);

    console.log('\n--- STEP 4: Canvas Viewport Highlight ---');
    await page.screenshot({ path: join(SCREENSHOT_DIR, '04_tour_canvas.png') });
    console.log('📸 Captured 04_tour_canvas.png');

    await page.evaluate(() => {
      const nextBtn = document.querySelector('#tour-next-btn');
      if (nextBtn) (nextBtn as HTMLButtonElement).click();
      else throw new Error('Next button not found in Step 4 card');
    });
    await sleep(1000);

    console.log('\n--- STEP 5: Version History Timeline Highlight ---');
    await page.screenshot({ path: join(SCREENSHOT_DIR, '05_tour_timeline.png') });
    console.log('📸 Captured 05_tour_timeline.png');

    await page.evaluate(() => {
      const nextBtn = document.querySelector('#tour-next-btn');
      if (nextBtn) (nextBtn as HTMLButtonElement).click();
      else throw new Error('Next button not found in Step 5 card');
    });
    await sleep(1000);

    console.log('\n--- STEP 6: Security Audit Highlight ---');
    await page.screenshot({ path: join(SCREENSHOT_DIR, '06_tour_audit.png') });
    console.log('📸 Captured 06_tour_audit.png');

    await page.evaluate(() => {
      const nextBtn = document.querySelector('#tour-next-btn');
      if (nextBtn) (nextBtn as HTMLButtonElement).click();
      else throw new Error('Next button not found in Step 6 card');
    });
    await sleep(1000);

    console.log('\n🎉 Guided Onboarding Tour Completed Successfully!');
  } catch (error) {
    console.error('❌ Tour Verification Failed:', error);
    await page.screenshot({ path: join(SCREENSHOT_DIR, 'error_tour.png') });
  } finally {
    await browser.close();
  }
}

runTourTest();
