import puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';

const SCREENSHOTS_DIR = path.join(process.cwd(), 'scratch', 'screenshots_left_menu_collapsible');

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  console.log('🚀 Launching Collapsible Left Menu E2E Verification Test...');

  // 1. Clean purge target screenshots directory
  if (fs.existsSync(SCREENSHOTS_DIR)) {
    fs.rmSync(SCREENSHOTS_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1680,1050'],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1680, height: 1050 });

    console.log('Navigating to http://localhost:3000/gcp?id=gcp-pharma-conceptual...');
    await page.goto('http://localhost:3000/gcp?id=gcp-pharma-conceptual', {
      waitUntil: 'networkidle2',
      timeout: 30000,
    });

    await sleep(2000);

    // STEP 1: Baseline expanded view
    console.log('Step 1: Capturing baseline expanded left navigation and copilot view...');
    const initialSidebarWidth = await page.$eval('#unified-app-sidebar', (el) => el.getBoundingClientRect().width);
    console.log(`Initial sidebar width: ${initialSidebarWidth}px (expected ~256px)`);
    if (initialSidebarWidth < 200) {
      throw new Error(`Expected sidebar width ~256px, got ${initialSidebarWidth}px`);
    }
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, '01_baseline_expanded_left_menu.png'),
      fullPage: false,
    });

    // STEP 2: Collapse Left Navigation via Header Button
    console.log('Step 2: Clicking #gcp-toggle-left-menu-btn in header bar...');
    await page.$eval('#gcp-toggle-left-menu-btn', (el: any) => el.click());
    await sleep(1000);

    const collapsedSidebarWidth = await page.$eval('#unified-app-sidebar', (el) => el.getBoundingClientRect().width);
    console.log(`Collapsed sidebar width: ${collapsedSidebarWidth}px (expected ~64px)`);
    if (collapsedSidebarWidth > 100) {
      throw new Error(`Expected collapsed sidebar width ~64px, got ${collapsedSidebarWidth}px`);
    }
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, '02_left_nav_collapsed_via_header_btn.png'),
      fullPage: false,
    });

    // STEP 3: Re-expand Left Navigation via Top Sidebar Button
    console.log('Step 3: Clicking #unified-sidebar-expand-btn at top of sidebar...');
    await page.$eval('#unified-sidebar-expand-btn', (el: any) => el.click());
    await sleep(1000);

    const reExpandedWidth = await page.$eval('#unified-app-sidebar', (el) => el.getBoundingClientRect().width);
    console.log(`Re-expanded sidebar width: ${reExpandedWidth}px (expected ~256px)`);
    if (reExpandedWidth < 200) {
      throw new Error(`Expected re-expanded sidebar width ~256px, got ${reExpandedWidth}px`);
    }
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, '03_left_nav_reexpanded_via_sidebar_top_btn.png'),
      fullPage: false,
    });

    // STEP 4: Collapse Left Navigation via Sidebar Header Collapse Button
    console.log('Step 4: Clicking #unified-sidebar-collapse-btn in sidebar header...');
    await page.$eval('#unified-sidebar-collapse-btn', (el: any) => el.click());
    await sleep(1000);

    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, '04_left_nav_collapsed_via_sidebar_header_btn.png'),
      fullPage: false,
    });

    // STEP 5: Collapse Co-Pilot Panel to Left Rail
    console.log('Step 5: Clicking #gcp-collapse-copilot-btn to collapse Co-Pilot panel...');
    await page.$eval('#gcp-collapse-copilot-btn', (el: any) => el.click());
    await sleep(1000);

    const hasRail = await page.$('#gcp-expand-copilot-rail-btn');
    if (!hasRail) {
      throw new Error('Expected #gcp-expand-copilot-rail-btn to be present in DOM when Co-Pilot is collapsed');
    }
    console.log('Collapsed Co-Pilot rail verified in DOM.');

    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, '05_both_left_nav_and_copilot_collapsed.png'),
      fullPage: false,
    });

    // STEP 6: Re-expand Co-Pilot Panel from Left Rail
    console.log('Step 6: Clicking #gcp-expand-copilot-rail-btn to re-expand Co-Pilot...');
    await page.$eval('#gcp-expand-copilot-rail-btn', (el: any) => el.click());
    await sleep(1000);

    const hasPanel = await page.$('#architecture-copilot-panel');
    if (!hasPanel) {
      throw new Error('Expected #architecture-copilot-panel to be restored in DOM');
    }
    console.log('Architecture Co-Pilot panel successfully re-expanded from left rail.');

    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, '06_copilot_reexpanded_from_rail.png'),
      fullPage: false,
    });

    console.log('🎉 ALL 6 E2E COLLAPSIBLE LEFT MENU STEPS PASSED SUCCESSFULLY!');
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error('❌ Test failed with error:', err);
  process.exit(1);
});
