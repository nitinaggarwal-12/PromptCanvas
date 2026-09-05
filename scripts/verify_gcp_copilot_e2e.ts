import puppeteer from "puppeteer";
import * as path from "path";
import * as fs from "fs";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  const screenshotsDir = path.resolve(process.cwd(), "scratch/screenshots_gcp_copilot");
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

  // Pre-seed cookie consent
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

  console.log("1. Navigating to http://localhost:3000/gcp?id=gcp-pharma-conceptual...");
  await page.goto("http://localhost:3000/gcp?id=gcp-pharma-conceptual", {
    waitUntil: "networkidle0",
    timeout: 30000,
  });
  await sleep(2000);

  // Check initial Co-Pilot panel existence
  const copilotExists = await page.$("#architecture-copilot-panel");
  console.log("[Verification] Architecture Co-Pilot Panel rendered:", !!copilotExists);

  const initialVersion = await page.evaluate(() => {
    const btn = document.querySelector("#gcp-version-dropdown-container button");
    return btn ? (btn as any).innerText : null;
  });
  console.log("[Verification] Initial Version button text:", initialVersion);

  const p0 = path.resolve(screenshotsDir, "00_initial_copilot_view.png");
  await page.screenshot({ path: p0, fullPage: false });
  console.log("Captured 00_initial_copilot_view.png");

  // Click on specialized prompt chip: "🧬 Cryo-EM & AlphaFold 3"
  console.log("2. Clicking '🧬 Cryo-EM & AlphaFold 3' specialized prompt chip...");
  const chipClicked = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll("#architecture-copilot-panel button"));
    const chip = buttons.find((b: any) => b.innerText.includes("Cryo-EM"));
    if (chip) {
      (chip as HTMLButtonElement).click();
      return true;
    }
    return false;
  });
  console.log("[Verification] Chip clicked:", chipClicked);
  await sleep(1500);

  const v1Text = await page.evaluate(() => {
    const btn = document.querySelector("#gcp-version-dropdown-container button");
    return btn ? (btn as any).innerText : null;
  });
  console.log("[Verification] Version after chip prompt:", v1Text);

  const p1 = path.resolve(screenshotsDir, "01_copilot_prompt_applied_v1_1.png");
  await page.screenshot({ path: p1, fullPage: false });
  console.log("Captured 01_copilot_prompt_applied_v1_1.png");

  // Type custom prompt in textarea
  console.log("3. Typing custom prompt in Co-Pilot composer with page.type...");
  await page.focus("#architecture-copilot-panel textarea");
  await page.keyboard.type("Enforce Cloud KMS HSM CMEK keys, Cloud Armor Enterprise WAF, and VPC Service Controls perimeter.", { delay: 10 });
  await sleep(500);

  // Click "Apply" button or press Enter
  await page.keyboard.press("Enter");
  await sleep(2000);

  const v2Text = await page.evaluate(() => {
    const btn = document.querySelector("#gcp-version-dropdown-container button");
    return btn ? (btn as any).innerText : null;
  });
  console.log("[Verification] Version after custom prompt:", v2Text);

  const p2 = path.resolve(screenshotsDir, "02_copilot_custom_prompt_applied_v1_2.png");
  await page.screenshot({ path: p2, fullPage: false });
  console.log("Captured 02_copilot_custom_prompt_applied_v1_2.png");

  // Open Version History Dropdown
  console.log("4. Opening Version History Dropdown...");
  await page.evaluate(() => {
    const btn = document.querySelector("#gcp-version-dropdown-container button") as HTMLButtonElement;
    if (btn) btn.click();
  });
  await sleep(800);

  const p3 = path.resolve(screenshotsDir, "03_version_history_dropdown.png");
  await page.screenshot({ path: p3, fullPage: false });
  console.log("Captured 03_version_history_dropdown.png");

  // Click "Restore Baseline Model (v1.0)"
  console.log("5. Clicking Restore Baseline Model (v1.0)...");
  await page.evaluate(() => {
    const restoreBtn = Array.from(document.querySelectorAll("#gcp-version-dropdown-container button")).find((b: any) =>
      b.innerText.includes("Restore Baseline")
    ) as HTMLButtonElement;
    if (restoreBtn) restoreBtn.click();
  });
  await sleep(1500);

  const restoredVersion = await page.evaluate(() => {
    const btn = document.querySelector("#gcp-version-dropdown-container button");
    return btn ? (btn as any).innerText : null;
  });
  console.log("[Verification] Version after rollback:", restoredVersion);

  const p4 = path.resolve(screenshotsDir, "04_restored_baseline_v1_0.png");
  await page.screenshot({ path: p4, fullPage: false });
  console.log("Captured 04_restored_baseline_v1_0.png");

  // Collapse Co-Pilot panel to see full-width canvas
  console.log("6. Toggling Co-Pilot panel closed...");
  await page.evaluate(() => {
    const toggleBtn = Array.from(document.querySelectorAll("#diagram-canvas-card button")).find((b: any) =>
      b.innerText.includes("Co-Pilot")
    ) as HTMLButtonElement;
    if (toggleBtn) toggleBtn.click();
  });
  await sleep(800);

  const p5 = path.resolve(screenshotsDir, "05_copilot_panel_collapsed_fullscreen.png");
  await page.screenshot({ path: p5, fullPage: false });
  console.log("Captured 05_copilot_panel_collapsed_fullscreen.png");

  await browser.close();
  console.log("E2E Co-Pilot & Versioning Verification completed successfully!");
}

main().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
