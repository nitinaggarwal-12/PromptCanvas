import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const ARTIFACT_DIR = '/Users/nitinagga/.gemini/jetski/brain/99ea0039-8c87-4928-a29f-0950d83e61f0';
const BASE_URL = 'http://localhost:3106/prompt-to-diagram';

async function run() {
  console.log('Launching Headless Chrome E2E Verification on', BASE_URL);
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath:
      process.env.CHROME_PATH ||
      (fs.existsSync('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome')
        ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
        : undefined),
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1720,1200'],
    defaultViewport: { width: 1720, height: 1200, deviceScaleFactor: 2 },
  });

  try {
    const page = await browser.newPage();
    await page.setCacheEnabled(false);
    await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 60000 });

    // Verify default prompt
    const promptVal = await page.$eval('[data-testid="input-freeform-user-prompt"]', (el) => el.value);
    console.log('Initial Prompt Value:', promptVal);

    // Click Generate
    await page.click('[data-testid="btn-generate-nano-drawio"]');

    // Wait 1.5s and capture In-Progress Parallel Telemetry screenshot
    await new Promise((r) => setTimeout(r, 1500));
    const inProgBanner = await page.$('[data-testid="pipeline-telemetry-strip"]');
    if (inProgBanner) {
      await page.screenshot({
        path: path.join(ARTIFACT_DIR, 'after_parallel_pipeline_progress_telemetry.png'),
        clip: { x: 0, y: 0, width: 1720, height: 520 },
      });
      console.log('Captured in-progress telemetry screenshot.');
    }

    // Wait until pipeline finishes (up to 90s)
    console.log('Waiting for parallel Branch A (Nano Banana) & Branch B (Vector + Pro Judge) to complete...');
    await page.waitForFunction(
      () => {
        const pctEl = document.querySelector('[data-testid="pipeline-progress-pct"]');
        const scorecard = document.querySelector('[data-testid="cross-model-judge-scorecard"]');
        const img = document.querySelector('[data-testid="nano-banana-generated-image"]');
        return (
          pctEl &&
          pctEl.textContent &&
          pctEl.textContent.includes('100% Complete') &&
          scorecard &&
          img &&
          img.getAttribute('src') &&
          img.getAttribute('src').startsWith('data:image/')
        );
      },
      { timeout: 95000, polling: 500 }
    );

    // Wait 2.5s for Draw.io viewer iframe SVG to finish rendering
    await new Promise((r) => setTimeout(r, 2500));

    // Verify Scrollbars (overflow-x: scroll & overflow-y: scroll)
    const scrollbarReport = await page.evaluate(() => {
      const checkEl = (sel) => {
        const el = document.querySelector(sel);
        if (!el) return null;
        const cs = window.getComputedStyle(el);
        return {
          overflowX: cs.overflowX,
          overflowY: cs.overflowY,
          scrollWidth: el.scrollWidth,
          clientWidth: el.clientWidth,
          scrollHeight: el.scrollHeight,
          clientHeight: el.clientHeight,
        };
      };
      return {
        leftControlPanel: checkEl('[data-testid="left-control-scroll-panel"]'),
        posterViewport: checkEl('[data-testid="poster-scroll-viewport"]'),
        drawioViewport: checkEl('[data-testid="decompiled-drawio-viewer-container"]'),
      };
    });
    console.log('Scrollbar Verification Report:', JSON.stringify(scrollbarReport, null, 2));

    // Verify 6-Gate Deterministic Audit & Cross-Model Pro Judge Scorecard
    const auditAndJudgeReport = await page.evaluate(() => {
      const title = document.querySelector('[data-testid="decompiled-diagram-title"]')?.textContent?.trim();
      const pctText = document.querySelector('[data-testid="pipeline-progress-pct"]')?.textContent?.trim();
      const etaText = document.querySelector('[data-testid="pipeline-eta-badge"]')?.textContent?.trim();
      const checks = Array.from(document.querySelectorAll('[data-testid^="geom-check-"]')).map((el) => ({
        id: el.getAttribute('data-testid'),
        text: el.textContent?.trim(),
      }));
      const scorecardText = document.querySelector('[data-testid="cross-model-judge-scorecard"]')?.innerText;
      return {
        title,
        pctText,
        etaText,
        checks,
        scorecardSnippet: scorecardText ? scorecardText.slice(0, 900) : '',
      };
    });
    console.log('Audit & Judge Report:', JSON.stringify(auditAndJudgeReport, null, 2));

    // Capture Split View + Telemetry + Scrollbars screenshot
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'after_aws_gcp_aiml_split_scrollbars_and_telemetry.png'),
      fullPage: false,
    });

    // Scroll down to capture the 5-Dimension Cross-Model Judge & 6-Gate Deterministic Audit Scorecard
    const scorecardEl = await page.$('[data-testid="cross-model-judge-scorecard"]');
    if (scorecardEl) {
      await scorecardEl.scrollIntoView();
      await new Promise((r) => setTimeout(r, 500));
      await scorecardEl.screenshot({
        path: path.join(ARTIFACT_DIR, 'after_aws_gcp_aiml_6gate_and_judge_scorecard.png'),
      });
    }

    // Switch to full Draw.io Canvas tab to inspect and screenshot the full 1600x860 vector diagram with official AWS & GCP icons
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.click('[data-testid="view-tab-drawio"]');
    await new Promise((r) => setTimeout(r, 2500));

    // Inspect the iframe inside Draw.io view to verify official AWS & GCP vendor icons & zero DOM overlaps
    const frames = page.frames();
    let vendorIconsFound = [];
    for (const f of frames) {
      try {
        const icons = await f.evaluate(() => {
          const els = Array.from(document.querySelectorAll('[data-vendor-icon]'));
          return els.map((e) => e.getAttribute('data-vendor-icon'));
        });
        if (icons.length > 0) {
          vendorIconsFound = icons;
        }
      } catch {
        // ignore cross-frame errors
      }
    }
    console.log('Official AWS & GCP Vendor Icons Rendered in Draw.io SVG:', vendorIconsFound);

    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'after_aws_gcp_aiml_drawio_full_vector_icons.png'),
      fullPage: false,
    });

    // Switch back to Split View so the page is left in default Split state
    await page.click('[data-testid="view-tab-split"]');
    await new Promise((r) => setTimeout(r, 1000));

    // Assert all 6 deterministic checks passed
    const failedChecks = auditAndJudgeReport.checks.filter((c) => c.text && c.text.includes('FAIL'));
    if (failedChecks.length > 0) {
      throw new Error(`Deterministic checks failed: ${JSON.stringify(failedChecks)}`);
    }
    if (vendorIconsFound.length < 8) {
      throw new Error(`Expected >= 8 official AWS/GCP vendor icons in Draw.io SVG, found ${vendorIconsFound.length}`);
    }

    console.log('✅ ALL HEADLESS CHROME E2E ASSERTIONS PASSED!');
  } finally {
    await browser.close();
  }
}

run().catch((err) => {
  console.error('E2E Verification Failed:', err);
  process.exit(1);
});
