import { spawn } from 'child_process';
import puppeteer from 'puppeteer';
import path from 'path';

const ARTIFACT_DIR =
  '/Users/nitinagga/.gemini/jetski/brain/5d1af057-eb29-4f2d-94a1-9cb8545c5c06';
const PORT = 3099;
const BASE_URL = `http://localhost:${PORT}`;

function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function waitForServer(url, timeoutMs = 45000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok || res.status === 200) return true;
    } catch {}
    await wait(600);
  }
  throw new Error(`Timed out waiting for ${url}`);
}

async function main() {
  console.log(`🚀 Starting Next.js server on port ${PORT}...`);
  const serverProc = spawn('npx', ['next', 'dev', '-p', String(PORT)], {
    cwd: '/Users/nitinagga/Documents/PromptCanvas',
    stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env, PORT: String(PORT) },
  });

  try {
    await waitForServer(`${BASE_URL}/dashboard`);
    console.log('✅ Next.js server ready on /dashboard');

    const browser = await puppeteer.launch({
      headless: 'new',
      executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      defaultViewport: { width: 1680, height: 1020, deviceScaleFactor: 2 },
    });
    const page = await browser.newPage();

    // 1. Open /dashboard
    await page.goto(`${BASE_URL}/dashboard`, { waitUntil: 'networkidle2', timeout: 60000 });
    await wait(1200);

    // 2. Click "+ New Diagram" -> "4. Blank Canvas" -> "Create Blank Canvas ->"
    console.log('🖱️ Clicking + New Diagram -> 4. Blank Canvas...');
    await page.click('[data-testid="dashboard-new-diagram-btn"]');
    await wait(600);
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const blankTabBtn = btns.find((b) => (b.textContent || '').includes('4. Blank Canvas'));
      if (blankTabBtn) blankTabBtn.click();
    });
    await wait(400);
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const createBtn = btns.find((b) => (b.textContent || '').includes('Create Blank Canvas'));
      if (createBtn) createBtn.click();
    });
    await wait(1200);

    // Verify Blank Canvas empty state is visible & Audit button shows "Audit 0%"
    const blankCheck = await page.evaluate(() => {
      const emptyEl = document.querySelector('[data-testid="blank-canvas-empty-state"]');
      const auditBtn = document.querySelector('#toolbar-audit-btn');
      return {
        emptyVisible: Boolean(emptyEl),
        auditBtnText: auditBtn ? auditBtn.textContent.trim() : '',
      };
    });
    console.log(
      `   Blank Canvas Empty State visible=${blankCheck.emptyVisible}, Audit button="${blankCheck.auditBtnText}"`
    );
    if (!blankCheck.emptyVisible) {
      throw new Error('Blank Canvas empty state did not render!');
    }
    if (!blankCheck.auditBtnText.includes('0%')) {
      throw new Error(`Expected Audit button on Blank Canvas to show 0%, got: ${blankCheck.auditBtnText}`);
    }

    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'after_blank_canvas.png'),
      fullPage: false,
    });
    console.log('📸 Saved after_blank_canvas.png');

    // 3. Open Audit Modal on Blank Canvas and verify 0% fail-closed score
    await page.click('#toolbar-audit-btn');
    await wait(700);
    const modalScoreBlank = await page.evaluate(() => {
      const el = document.querySelector('#audit-modal-composite-score');
      return el ? el.textContent.trim() : '';
    });
    console.log(`   Blank Canvas Audit Modal score="${modalScoreBlank}"`);
    if (!modalScoreBlank.includes('0%')) {
      throw new Error(`Expected Blank Canvas Audit Modal to show 0%, got: ${modalScoreBlank}`);
    }
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'after_blank_canvas_audit_0pct.png'),
      fullPage: false,
    });
    console.log('📸 Saved after_blank_canvas_audit_0pct.png');

    // Close Audit Modal
    await page.evaluate(() => {
      const modal = document.querySelector('#audit-modal-composite-score')?.closest('.fixed.inset-0');
      if (modal) {
        const closeBtn = modal.querySelector('button');
        if (closeBtn) closeBtn.click();
      }
    });
    await wait(500);

    // 4. Enter the exact user prompt: "Create an architecture diagram showing oracle@google for ebuisness suite running on exadata"
    const userPrompt =
      'Create an architecture diagram showing oracle@google for ebuisness suite running on exadata';
    console.log(`⌨️ Entering prompt: "${userPrompt}"`);
    await page.focus('#dashboard-prompt-composer-input');
    await page.type('#dashboard-prompt-composer-input', userPrompt);
    await wait(400);
    await page.click('#dashboard-prompt-submit-btn');

    // Wait for synthesis to finish and SVG diagram to render
    await page.waitForFunction(
      () => {
        const emptyEl = document.querySelector('[data-testid="blank-canvas-empty-state"]');
        const bodyText = document.body.innerText || '';
        return !emptyEl && bodyText.includes('Oracle Database@Google Cloud');
      },
      { timeout: 30000 }
    );
    await wait(2500);

    const auditBtnAfterOracle = await page.evaluate(() => {
      const el = document.querySelector('#toolbar-audit-btn');
      return el ? el.textContent.trim() : '';
    });
    console.log(`   Oracle@Google Exadata synthesized! Audit button="${auditBtnAfterOracle}"`);

    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'after_oracle_exadata_ebs_diagram.png'),
      fullPage: false,
    });
    console.log('📸 Saved after_oracle_exadata_ebs_diagram.png');

    // 5. Open Audit Modal on synthesized Oracle@Google Exadata EBS diagram
    await page.click('#toolbar-audit-btn');
    await wait(800);
    const modalScoreOracle = await page.evaluate(() => {
      const el = document.querySelector('#audit-modal-composite-score');
      return el ? el.textContent.trim() : '';
    });
    console.log(`   Oracle@Google Exadata Audit Modal score="${modalScoreOracle}"`);

    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'after_oracle_exadata_ebs_audit.png'),
      fullPage: false,
    });
    console.log('📸 Saved after_oracle_exadata_ebs_audit.png');

    await browser.close();
    console.log('🎉 E2E Puppeteer visual verification & screenshot capture complete!');
  } finally {
    serverProc.kill('SIGTERM');
  }
}

main().catch((err) => {
  console.error('❌ E2E script failed:', err);
  process.exit(1);
});
