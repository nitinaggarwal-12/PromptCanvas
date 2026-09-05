import puppeteer from "puppeteer";
import * as path from "path";
import * as fs from "fs";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  const screenshotsDir = path.resolve(process.cwd(), "scratch/screenshots_pharma_conceptual");
  if (fs.existsSync(screenshotsDir)) {
    fs.rmSync(screenshotsDir, { recursive: true, force: true });
  }
  fs.mkdirSync(screenshotsDir, { recursive: true });

  console.log("Launching Puppeteer with Google Chrome...");
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1720, height: 1100, deviceScaleFactor: 2 });

  // Pre-seed cookie consent so banner does not display
  await page.evaluateOnNewDocument(() => {
    localStorage.setItem(
      'promptcanvas_cookie_consent',
      JSON.stringify({
        essential: true,
        analytics: true,
        telemetry: true,
        hasInteracted: true,
      })
    );
  });

  // ==========================================
  // TIER 1: CONCEPTUAL ARCHITECTURE
  // ==========================================
  console.log("1. Navigating to Conceptual Architecture: http://localhost:3000/gcp?id=gcp-pharma-conceptual...");
  await page.goto("http://localhost:3000/gcp?id=gcp-pharma-conceptual", {
    waitUntil: "networkidle0",
    timeout: 30000,
  });
  await sleep(2000);

  const conceptualChecks = [
    "Pharma Drug Discovery: Conceptual Architecture",
    "Pharma Drug Discovery Multi-Tier Architecture Suite",
    "1. Conceptual Architecture",
    "2. Logical Architecture",
    "3. Technical Infrastructure",
    "Operating at Capability & Boundary Level",
  ];

  const body1 = await page.evaluate(() => document.body.innerText);
  for (const c of conceptualChecks) {
    const ok = body1.includes(c);
    console.log(`[Tier 1] Check "${c}": ${ok ? "PASS" : "FAIL"}`);
  }

  const p1 = path.resolve(screenshotsDir, "01_conceptual_tier.png");
  await page.screenshot({ path: p1, fullPage: false });
  console.log("Captured 01_conceptual_tier.png");

  // ==========================================
  // TIER 2: LOGICAL ARCHITECTURE
  // ==========================================
  console.log("2. Clicking '2. Logical Architecture' in 3-Tier Navigator...");
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll("button"));
    const btn = buttons.find((b) => b.innerText.includes("2. Logical Architecture"));
    if (btn) btn.click();
  });
  await sleep(2000);

  const logicalChecks = [
    "Pharma Drug Discovery: Logical Architecture",
    "Target-to-Lead Generation: Multi-Agent Mesh",
  ];

  const body2 = await page.evaluate(() => document.body.innerText);
  for (const c of logicalChecks) {
    const ok = body2.includes(c);
    console.log(`[Tier 2] Check "${c}": ${ok ? "PASS" : "FAIL"}`);
  }

  const p2 = path.resolve(screenshotsDir, "02_logical_tier.png");
  await page.screenshot({ path: p2, fullPage: false });
  console.log("Captured 02_logical_tier.png");

  // ==========================================
  // TIER 3: TECHNICAL INFRASTRUCTURE
  // ==========================================
  console.log("3. Clicking '3. Technical Infrastructure' in 3-Tier Navigator...");
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll("button"));
    const btn = buttons.find((b) => b.innerText.includes("3. Technical Infrastructure"));
    if (btn) btn.click();
  });
  await sleep(2000);

  const techChecks = [
    "Pharma Drug Discovery: Technical Infrastructure Blueprint",
    "Multi-Zone VPC, Cloud TPU v5e/H100 HPC",
  ];

  const body3 = await page.evaluate(() => document.body.innerText);
  for (const c of techChecks) {
    const ok = body3.includes(c);
    console.log(`[Tier 3] Check "${c}": ${ok ? "PASS" : "FAIL"}`);
  }

  const p3 = path.resolve(screenshotsDir, "03_technical_tier.png");
  await page.screenshot({ path: p3, fullPage: false });
  console.log("Captured 03_technical_tier.png");

  await browser.close();
  console.log("E2E 3-Tier Verification completed successfully!");
}

main().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
