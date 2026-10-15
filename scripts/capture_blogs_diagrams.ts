import puppeteer from 'puppeteer';
import path from 'path';

const ARTIFACT_DIR = '/Users/nitinagga/.gemini/jetski/brain/717453f9-23de-4843-af0f-5a7103bd7f05';
const BASE_URL = 'http://localhost:3000/blogs';
const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: CHROME_PATH,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1720, height: 1120, deviceScaleFactor: 2 });

  console.log('Navigating to', BASE_URL);
  await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 60000 });
  await sleep(1200);

  // Dismiss GDPR cookie banner if present so screenshots are 100% clean
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const acceptBtn = buttons.find((b) => b.textContent?.includes('Accept All'));
    if (acceptBtn) (acceptBtn as HTMLElement).click();
  });
  await sleep(400);

  const variants = [
    {
      variantId: 'ws1-multi-tenant-taxonomy-overview',
      useCaseId: 'uc-multi-tenant-agentic-saas',
      outFile: 'after_ws1_three_patterns.png',
    },
    {
      variantId: 'ws1-cloud-arch-center-5hop-baseline',
      useCaseId: 'uc-multi-tenant-agentic-saas',
      outFile: 'after_ws1_3_5hop_context_chain.png',
    },
    {
      variantId: 'ws2-pattern-a-pooled-5hop-architecture',
      useCaseId: 'uc-ws2-pattern-a-pooled',
      outFile: 'after_ws2_1_pattern_a_pooled.png',
    },
    {
      variantId: 'ws2-pattern-a-breach-defense-sequence',
      useCaseId: 'uc-ws2-pattern-a-pooled',
      outFile: 'after_ws2_5_breach_defense.png',
    },
    {
      variantId: 'ws3-pattern-b-sovereign-silos-architecture',
      useCaseId: 'uc-ws3-pattern-b-sovereign-silos',
      outFile: 'after_ws3_1_pattern_b_silos.png',
    },
    {
      variantId: 'ws4-pattern-c-hybrid-psc-and-migration',
      useCaseId: 'uc-ws4-pattern-c-hybrid-psc',
      outFile: 'after_ws4_1_pattern_c_psc.png',
    },
    {
      variantId: 'ws5-decision-tree-and-agentic-triad',
      useCaseId: 'uc-ws5-decision-guide-triad',
      outFile: 'after_ws5_decision_tree_triad.png',
    },
  ];

  for (const v of variants) {
    const ucBtn = await page.$(`[data-testid="usecase-item-${v.useCaseId}"]`);
    if (ucBtn) {
      await ucBtn.evaluate((el) => (el as HTMLElement).click());
      await sleep(450);
    }
    const varBtn = await page.$(`[data-testid="arch-center-variant-${v.variantId}"]`);
    if (varBtn) {
      await varBtn.evaluate((el) => (el as HTMLElement).click());
      await sleep(500);
    }
    const selectorCard = await page.$('[data-testid="interactive-architecture-selector"]');
    if (selectorCard) {
      await selectorCard.evaluate((el) => el.scrollIntoView({ block: 'center' }));
      await sleep(350);
      const outPath = path.join(ARTIFACT_DIR, v.outFile);
      await selectorCard.screenshot({ path: outPath });
      console.log('Saved diagram screenshot:', outPath);
    }
  }

  // Capture domain presets (Multimodal GraphRAG & Zero-Trust ADK)
  const domainCaptures = [
    { useCaseId: 'uc-multimodal-graphrag', outFile: 'after_multimodal_graphrag.png' },
    { useCaseId: 'uc-zero-trust-adk', outFile: 'after_zero_trust_adk.png' },
  ];
  for (const dc of domainCaptures) {
    const ucBtn = await page.$(`[data-testid="usecase-item-${dc.useCaseId}"]`);
    if (ucBtn) {
      await ucBtn.evaluate((el) => (el as HTMLElement).click());
      await sleep(450);
    }
    const autoBtn = await page.$('[data-testid="arch-center-variant-auto"]');
    if (autoBtn) {
      await autoBtn.evaluate((el) => (el as HTMLElement).click());
      await sleep(450);
    }
    const selectorCard = await page.$('[data-testid="interactive-architecture-selector"]');
    if (selectorCard) {
      await selectorCard.evaluate((el) => el.scrollIntoView({ block: 'center' }));
      await sleep(350);
      const outPath = path.join(ARTIFACT_DIR, dc.outFile);
      await selectorCard.screenshot({ path: outPath });
      console.log('Saved domain diagram screenshot:', outPath);
    }
  }

  // Select WS1 + Cloud Architecture Center format and capture the fixed Walkthrough section (Figure 1 Reading Guide)
  const ws1Btn = await page.$('[data-testid="usecase-item-uc-multi-tenant-agentic-saas"]');
  if (ws1Btn) {
    await ws1Btn.evaluate((el) => (el as HTMLElement).click());
    await sleep(450);
  }
  const fmtArchBtn = await page.$('[data-testid="format-tab-cloud-arch-center"]');
  if (fmtArchBtn) {
    await fmtArchBtn.evaluate((el) => (el as HTMLElement).click());
    await sleep(500);
  }

  // Scroll to Reading Figure 1 section
  await page.evaluate(() => {
    const headings = Array.from(document.querySelectorAll('h2, h3'));
    const h = headings.find((el) => el.textContent?.includes('Reading Figure 1'));
    if (h) {
      const top = h.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'instant' as ScrollBehavior });
    }
  });
  await sleep(500);
  const outWalkthrough = path.join(ARTIFACT_DIR, 'after_blog_walkthrough_section.png');
  await page.screenshot({ path: outWalkthrough });
  console.log('Saved fixed walkthrough screenshot:', outWalkthrough);

  // Switch to FDE 5-Hop Series (WS1-5) and scroll to Section 7 (Google Cloud Console Verification Runbook & Editable Assets — no Social Kit)
  const fmtFdeBtn = await page.$('[data-testid="format-tab-geap-fde-deep-dive"]');
  if (fmtFdeBtn) {
    await fmtFdeBtn.evaluate((el) => (el as HTMLElement).click());
    await sleep(500);
  }
  await page.evaluate(() => {
    const headings = Array.from(document.querySelectorAll('h2, h3'));
    const h = headings.find(
      (el) =>
        el.textContent?.includes('Verification Runbook') ||
        el.textContent?.includes('Google Cloud Console')
    );
    if (h) {
      const top = h.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'instant' as ScrollBehavior });
    }
  });
  await sleep(500);
  const outRunbook = path.join(ARTIFACT_DIR, 'after_blog_no_social_kit_section.png');
  await page.screenshot({ path: outRunbook });
  console.log('Saved Section 7 (no social kit) screenshot:', outRunbook);

  // Scroll back to top and open the Live GCP Console Verification Drawer
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior }));
  await sleep(400);
  const gcpBtn = await page.$('[data-testid="open-gcp-verify-drawer-btn"]');
  if (gcpBtn) {
    await gcpBtn.evaluate((el) => (el as HTMLElement).click());
    await sleep(900);
    const outGcpDrawer = path.join(ARTIFACT_DIR, 'after_gcp_live_verification_console.png');
    await page.screenshot({ path: outGcpDrawer });
    console.log('Saved Live GCP Console Verification drawer screenshot:', outGcpDrawer);

    // Scroll inside the drawer to show the 20/20 workstream & pattern checks
    await page.evaluate(() => {
      const drawer = document.querySelector('[data-testid="gcp-live-verification-drawer"] > div:nth-child(2)');
      if (drawer) drawer.scrollTop = 540;
    });
    await sleep(400);
    const outGcpChecks = path.join(ARTIFACT_DIR, 'after_gcp_live_verification_20_checks.png');
    await page.screenshot({ path: outGcpChecks });
    console.log('Saved Live GCP 20/20 Checks screenshot:', outGcpChecks);
  }

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
