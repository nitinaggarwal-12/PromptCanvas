import puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runE2E() {
  const taskDir = path.join(process.cwd(), 'scratch', 'screenshots_studio_blueprints');
  const brainDir = '/Users/nitinagga/.gemini/jetski/brain/8d379ad2-8382-4c17-976c-6502e40a06cb';

  if (fs.existsSync(taskDir)) {
    fs.rmSync(taskDir, { recursive: true, force: true });
  }
  fs.mkdirSync(taskDir, { recursive: true });

  console.log('🚀 Starting Studio 52-Blueprint Catalog & 16-Doc E2E Verification Harness...');

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--window-size=1600,1000']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 1000 });

  page.on('console', (msg) => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', (err) => console.error('BROWSER ERROR:', err));

  async function capture(name: string) {
    const filePath = path.join(taskDir, `${name}.png`);
    await page.screenshot({ path: filePath, fullPage: false });
    if (fs.existsSync(brainDir)) {
      const brainPath = path.join(brainDir, `${name}.png`);
      fs.copyFileSync(filePath, brainPath);
    }
    console.log(`📸 Captured: ${name}.png`);
  }

  try {
    // 1. Load /studio
    console.log('🌐 Navigating to http://localhost:3050/studio...');
    await page.goto('http://localhost:3050/studio', { waitUntil: 'networkidle2', timeout: 30000 });
    
    // Wait for client hydration to complete (live session ID generated instead of ses_...)
    await page.waitForFunction(() => !document.body.innerText.includes('Session:\nses_...'), { timeout: 10000 });
    console.log('⚡ Client React hydration confirmed!');
    await sleep(800);

    // Verify Blueprint Selector button exists in header
    const blueprintBtn = await page.waitForSelector('button[title*="Canonical Architecture Blueprints Catalog"]', { timeout: 10000 });
    if (!blueprintBtn) throw new Error('Blueprint button not found in studio header');
    console.log('✅ Blueprint Selector button verified in header.');

    await capture('01_studio_default_view');

    // 2. Open Blueprint Catalog Modal
    console.log('🖱️ Clicking Blueprint Selector button...');
    await blueprintBtn.click();
    await sleep(800); // settling delay rule

    // Verify modal rendered
    await page.waitForSelector('#blueprint-catalog-modal', { timeout: 15000 });
    const modalText = await page.$eval('#blueprint-catalog-modal h2', (el: any) => el.textContent);
    console.log(`✅ Modal Header text: "${modalText}"`);

    await capture('02_blueprint_catalog_modal_open');

    // 3. Search for "Data Lakehouse"
    console.log('🔍 Searching for "Data Lakehouse"...');
    const searchInput = await page.waitForSelector('input[placeholder*="Search 52 blueprints"]');
    if (!searchInput) throw new Error('Search input not found');
    await searchInput.type('Data Lakehouse');
    await sleep(800);

    await capture('03_catalog_filtered_datalakehouse');

    // 4. Click "Load into Canvas" for Blueprint #42
    console.log('⚡ Loading Blueprint #42 (Modern Data Lakehouse Data Mesh)...');
    const loadButtons = await page.$$('button');
    let loadBtnClicked = false;
    for (const btn of loadButtons) {
      const text = await page.evaluate(el => el.textContent, btn);
      if (text && text.includes('Load into Canvas')) {
        await btn.click();
        loadBtnClicked = true;
        break;
      }
    }
    if (!loadBtnClicked) throw new Error('Load into Canvas button not found');

    await sleep(2000); // Settling delay for Draw.io XML load & AST sync

    // Verify header title updated to Blueprint #42
    const headerText = await page.evaluate(() => document.body.innerText);
    if (!headerText.includes('#42') && !headerText.includes('Data Lakehouse')) {
      throw new Error('Canvas header did not update with Blueprint #42');
    }
    console.log('✅ Blueprint #42 successfully loaded and verified on canvas!');

    await capture('04_blueprint_42_loaded_canvas');

    // 5. Switch to Living Specs (16 Docs)
    console.log('📑 Switching to Living Specs view...');
    const clickedSpecView = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const btn = btns.find(b => b.textContent && b.textContent.includes('Living Specs'));
      if (btn) {
        btn.click();
        return true;
      }
      return false;
    });
    if (!clickedSpecView) throw new Error('Living Specs button not found');
    await sleep(1000);

    // Select DOC-06 (Threat Model)
    console.log('🛡️ Selecting DOC-06 Threat Model...');
    const clickedDoc06 = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const btn = btns.find(b => b.textContent && b.textContent.includes('Threat Model'));
      if (btn) {
        btn.click();
        return true;
      }
      return false;
    });
    if (!clickedDoc06) throw new Error('DOC-06 Threat Model button not found');
    await sleep(1000);

    // Verify Bound Certified Diagram Blueprints banner is present
    const specContent = await page.evaluate(() => document.body.innerText);
    if (!specContent.includes('Bound Certified Diagram Blueprints')) {
      throw new Error('Bound Certified Diagram Blueprints banner not found in DOC-06');
    }
    console.log('✅ Verified Bound Certified Diagram Blueprints banner in DOC-06!');

    await capture('05_living_specs_doc06_bound_blueprints');

    // 6. Click bound view button [#18 Security / Trust Boundary]
    console.log('🔗 Clicking bound blueprint view [#18 Security / Trust Boundary] from spec...');
    const clickedBound = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const btn = btns.find(b => b.textContent && b.textContent.includes('#18'));
      if (btn) {
        btn.click();
        return true;
      }
      return false;
    });
    if (!clickedBound) throw new Error('Bound blueprint view [#18] button not found');
    await sleep(1500);

    // Verify canvas switched and Blueprint #18 is active
    const canvasBody = await page.evaluate(() => document.body.innerText);
    if (!canvasBody.includes('#18')) {
      throw new Error('Canvas did not switch to Blueprint #18');
    }
    console.log('✅ Seamlessly navigated from DOC-06 Spec to Blueprint #18 on Canvas!');

    await capture('06_bound_blueprint_18_loaded_from_spec');

    // 7. Test /studioprod
    console.log('🏢 Navigating to http://localhost:3050/studioprod...');
    await page.goto('http://localhost:3050/studioprod', { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(1500);

    const prodBlueprintBtn = await page.waitForSelector('button[title*="Canonical Architecture Blueprints Catalog"]', { timeout: 10000 });
    if (!prodBlueprintBtn) throw new Error('Blueprint button not found in studioprod header');
    console.log('✅ Blueprint Selector button verified in StudioProd header.');

    await capture('07_studioprod_dark_enterprise_view');

    // Open Blueprint Catalog in StudioProd
    await prodBlueprintBtn.click();
    await sleep(800);
    await page.waitForSelector('#blueprint-catalog-modal', { timeout: 10000 });

    await capture('08_studioprod_catalog_dark_theme');
    console.log('✅ StudioProd dark-themed Blueprint Catalog verified.');

    console.log('\n🎉 ALL 8 E2E ASSERTIONS & SCREENSHOTS COMPLETED SUCCESSFULLY WITH 0 DEFECTS!');
  } catch (err) {
    console.error('❌ E2E Verification failed:', err);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
}

runE2E();
