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
  await new Promise((r) => setTimeout(r, 2500));

  const p1 = path.join(outDir, '01_default_blueprint_00_centered.png');
  await page.screenshot({ path: p1, fullPage: false });
  console.log(`Saved screenshot: ${p1}`);

  // Switch to Category 2 (AI & GenAI Systems)
  console.log('Testing category switch & proposal...');
  await page.click('.category-dropdown-container button');
  await new Promise((r) => setTimeout(r, 400));

  const catItems = await page.$$('.category-dropdown-container .max-h-48 > div');
  if (catItems.length > 1) {
    await catItems[1].click();
  }
  await new Promise((r) => setTimeout(r, 500));

  // Click Propose Blueprint & Plan
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const proposeBtn = btns.find((b) => b.textContent && b.textContent.includes('Propose Blueprint & Plan'));
    if (proposeBtn) proposeBtn.click();
  });
  await new Promise((r) => setTimeout(r, 2500));

  const p2 = path.join(outDir, '02_proposed_blueprint_ai_centered.png');
  await page.screenshot({ path: p2, fullPage: false });
  console.log(`Saved screenshot: ${p2}`);

  await browser.close();
  console.log('All tests finished successfully.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
