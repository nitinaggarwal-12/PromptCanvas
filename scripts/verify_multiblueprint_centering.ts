import puppeteer from 'puppeteer';
import * as path from 'path';
import * as fs from 'fs';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const TARGET_URL = process.env.TARGET_URL || 'http://localhost:3000/dashboard';

async function main() {
  const outDir = path.join(process.cwd(), 'scratch', 'screenshots_canvas_centering');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: CHROME_PATH,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 950 });

  console.log(`Navigating to ${TARGET_URL}...`);
  await page.goto(TARGET_URL, { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise((r) => setTimeout(r, 2000));

  // Test blueprints by selecting from Step 2
  const blueprintsToTest = [
    { name: '03_blueprint_09_genai_swarm', search: '09' },
    { name: '04_blueprint_18_payments', search: '18' },
  ];

  for (const bp of blueprintsToTest) {
    console.log(`Testing blueprint search for ${bp.search}...`);
    // Open blueprint dropdown
    await page.click('.blueprint-combobox-container button');
    await new Promise((r) => setTimeout(r, 400));

    // Type search
    await page.type('.blueprint-combobox-container input', bp.search);
    await new Promise((r) => setTimeout(r, 400));

    // Click first result
    const results = await page.$$('.blueprint-combobox-container .max-h-48 > div');
    if (results.length > 0) {
      await results[0].click();
      await new Promise((r) => setTimeout(r, 400));

      // Click Propose Blueprint & Plan
      await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const proposeBtn = btns.find((b) => b.textContent && b.textContent.includes('Propose Blueprint & Plan'));
        if (proposeBtn) proposeBtn.click();
      });
      await new Promise((r) => setTimeout(r, 2500));

      const p = path.join(outDir, `${bp.name}.png`);
      await page.screenshot({ path: p, fullPage: false });
      console.log(`Saved screenshot: ${p}`);
    }
  }

  await browser.close();
  console.log('Multi-blueprint verification complete.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
