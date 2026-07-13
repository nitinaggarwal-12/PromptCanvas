import puppeteer from 'puppeteer';
import { rmSync, mkdirSync } from 'fs';
import { join } from 'path';

const SCREENSHOT_DIR = '/Users/nitinagga/.gemini/jetski/brain/57227f71-af5c-418d-8f2b-c3e2b3572380/screenshots_v6';
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function runVersionDropdownSuite() {
  console.log('🚀 Starting Phase 6 Interactive Version Dropdown Test Suite...');
  
  // 1. Housekeeping: Purge screenshot directory
  console.log('🧹 Cleaning screenshot directory...');
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
  await page.setViewport({ width: 1440, height: 950 });

  try {
    console.log('Navigating to http://localhost:3000...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
    await sleep(2000);

    // Click on diagram GCP BigQuery Enterprise Architecture in left sidebar
    console.log('Selecting diagram GCP BigQuery Enterprise Architecture...');
    const clicked = await page.evaluate(() => {
      const spans = Array.from(document.querySelectorAll('aside span, aside div'));
      const targetSpan = spans.find(el => el.textContent?.trim() === 'GCP BigQuery Enterprise Architecture');
      if (targetSpan) {
        const row = targetSpan.closest('.cursor-pointer') || targetSpan;
        (row as HTMLElement).click();
        return true;
      }
      // Fallback: click first diagram row in aside
      const firstRow = document.querySelector('aside .space-y-1 > div.cursor-pointer');
      if (firstRow) {
        (firstRow as HTMLElement).click();
        return true;
      }
      return false;
    });

    if (!clicked) {
      throw new Error('Failed to find or click diagram row in sidebar!');
    }

    console.log('⏳ Waiting for active diagram and #version-dropdown-selector to load...');
    await page.waitForSelector('#version-dropdown-selector', { timeout: 15000 });
    await sleep(2500); // Allow Draw.io vector engine to settle

    console.log('📸 Capturing Step 1: Active Draft v4 with new top-bar Version Dropdown: 01_active_draft_v4.png');
    await page.screenshot({ path: join(SCREENSHOT_DIR, '01_active_draft_v4.png') });

    // Step 2: Use the new top-bar Version Dropdown (#version-dropdown-selector) to select Version v3 (PowerBI)
    console.log('Selecting Version v3 (PowerBI) via top-bar dropdown (#version-dropdown-selector)...');
    await page.evaluate(() => {
      const select = document.querySelector('#version-dropdown-selector') as HTMLSelectElement;
      if (select) {
        const options = Array.from(select.options);
        const v3Opt = options.find(opt => opt.text.includes('v3') || opt.text.toLowerCase().includes('powerbi'));
        if (v3Opt) {
          select.value = v3Opt.value;
          select.dispatchEvent(new Event('change', { bubbles: true }));
        } else {
          console.warn('v3 option not found in dropdown! Options available:', options.map(o => o.text));
        }
      } else {
        throw new Error('Version dropdown selector not found in DOM!');
      }
    });

    console.log('⏳ Waiting for Version v3 to render in Preview mode...');
    await sleep(3500);

    console.log('📸 Capturing Step 2: Version v3 loaded via dropdown: 02_selected_v3_via_dropdown.png');
    await page.screenshot({ path: join(SCREENSHOT_DIR, '02_selected_v3_via_dropdown.png') });

    // Step 3: Zoom out twice while in v3 preview mode to show PowerBI at Y=810
    console.log('Clicking Zoom Out (-) twice in v3 to reveal PowerBI at Y=810...');
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const zoomOutBtn = buttons.find(btn => btn.textContent?.trim() === '-' || btn.getAttribute('title')?.includes('Zoom Out'));
      if (zoomOutBtn) {
        zoomOutBtn.click();
        zoomOutBtn.click();
      }
    });
    await sleep(1500);

    console.log('📸 Capturing Step 3: PowerBI revealed in v3 zoomed out: 03_powerbi_revealed_in_v3.png');
    await page.screenshot({ path: join(SCREENSHOT_DIR, '03_powerbi_revealed_in_v3.png') });

    // Step 4: Use dropdown to select Version v2 (GCP Data Architect initial refinement)
    console.log('Selecting Version v2 via top-bar dropdown...');
    await page.evaluate(() => {
      const select = document.querySelector('#version-dropdown-selector') as HTMLSelectElement;
      if (select) {
        const options = Array.from(select.options);
        const v2Opt = options.find(opt => opt.text.includes('v2'));
        if (v2Opt) {
          select.value = v2Opt.value;
          select.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }
    });
    await sleep(3000);

    console.log('📸 Capturing Step 4: Version v2 loaded via dropdown: 04_selected_v2_via_dropdown.png');
    await page.screenshot({ path: join(SCREENSHOT_DIR, '04_selected_v2_via_dropdown.png') });

    // Step 5: Use dropdown to select Version v4 (Active Draft) to return cleanly
    console.log('Selecting Version v4 (Active Draft) via dropdown to return to working draft...');
    await page.evaluate(() => {
      const select = document.querySelector('#version-dropdown-selector') as HTMLSelectElement;
      if (select) {
        const options = Array.from(select.options);
        const v4Opt = options.find(opt => opt.text.includes('v4') || opt.text.includes('Active Draft'));
        if (v4Opt) {
          select.value = v4Opt.value;
          select.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }
    });
    await sleep(3000);

    console.log('📸 Capturing Step 5: Returned cleanly to Active Draft v4: 05_returned_to_v4_draft.png');
    await page.screenshot({ path: join(SCREENSHOT_DIR, '05_returned_to_v4_draft.png') });

    console.log('🎉 Phase 6 Interactive Version Dropdown Test Suite Completed Successfully!');
  } catch (error) {
    console.error('❌ Suite failed:', error);
  } finally {
    await browser.close();
  }
}

runVersionDropdownSuite();
