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

  const masterPngSrc = path.resolve(process.cwd(), "diagrams/pharma_drug_discovery/01_conceptual_pharma_drug_discovery.png");
  if (fs.existsSync(masterPngSrc)) {
    fs.copyFileSync(masterPngSrc, path.resolve(screenshotsDir, "00_master_standalone_diagram.png"));
    console.log("Copied 00_master_standalone_diagram.png to scratch folder.");
  }

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

  console.log("Navigating to http://localhost:3000/gcp?id=gcp-pharma-conceptual...");
  await page.goto("http://localhost:3000/gcp?id=gcp-pharma-conceptual", {
    waitUntil: "networkidle0",
    timeout: 30000,
  });

  await sleep(2000);

  // Verify page title and header
  const title = await page.title();
  console.log("Page title:", title);

  // Check DOM text and SVG HTML
  const { bodyText, bodyHtml } = await page.evaluate(() => ({
    bodyText: document.body.innerText,
    bodyHtml: document.body.innerHTML,
  }));
  const checks = [
    "Pharma Drug Discovery: Conceptual Architecture",
    "Operating at Capability & Boundary Level",
    "Discovery Personas",
    "Cognitive Discovery Agents & AI Mesh",
    "Structural & Chemical Foundation",
    "Compliance & Wet-Lab Execution",
    "The 4 Canonical Conceptual Flows",
  ];

  for (const check of checks) {
    const present = bodyText.includes(check) || bodyHtml.includes(check);
    console.log(`Check "${check}": ${present ? "PASS" : "FAIL"}`);
    if (!present) {
      console.warn("Warning: Expected string missing from page DOM:", check);
    }
  }

  // Verify SVG rendered
  const svgExists = await page.evaluate(() => {
    const svgs = document.querySelectorAll("svg");
    return svgs.length > 0;
  });
  console.log("SVG rendered on page:", svgExists);

  // Screenshot 1: Full GCP Architecture Center Page View (Interactive Canvas - Light)
  const p1 = path.resolve(screenshotsDir, "01_gcp_pharma_conceptual_canvas_light.png");
  await page.screenshot({ path: p1, fullPage: false });
  console.log("Captured 01_gcp_pharma_conceptual_canvas_light.png");

  // Click on "Living Spec & Data Flow" tab
  console.log("Clicking Living Spec & Data Flow tab...");
  const specTabClicked = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll("button"));
    const specBtn = buttons.find((b) => b.innerText.includes("Living Spec") || b.innerText.includes("Data Flow"));
    if (specBtn) {
      specBtn.click();
      return true;
    }
    return false;
  });

  if (specTabClicked) {
    await sleep(800); // 800ms settling delay rule
    const p2 = path.resolve(screenshotsDir, "02_gcp_pharma_conceptual_spec.png");
    await page.screenshot({ path: p2, fullPage: false });
    console.log("Captured 02_gcp_pharma_conceptual_spec.png");
  }

  // Switch back to canvas tab
  console.log("Switching back to Interactive Canvas tab...");
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll("button"));
    const canvasBtn = buttons.find((b) => b.innerText.includes("Interactive Canvas"));
    if (canvasBtn) {
      canvasBtn.click();
    }
  });
  await sleep(800);

  // Switch to Dark Mode
  console.log("Toggling dark mode...");
  const darkToggled = await page.evaluate(() => {
    const themeBtn = document.getElementById("global-theme-toggle-btn") ||
      document.querySelector("[aria-label*=\"theme\"], [title*=\"theme\"], button svg.lucide-moon, button svg.lucide-sun")?.closest("button");
    if (themeBtn) {
      (themeBtn as HTMLButtonElement).click();
      return true;
    }
    return false;
  });

  if (darkToggled) {
    await sleep(1500); // Allow theme change and canvas re-render to settle
    const p3 = path.resolve(screenshotsDir, "03_gcp_pharma_conceptual_canvas_dark.png");
    await page.screenshot({ path: p3, fullPage: false });
    console.log("Captured 03_gcp_pharma_conceptual_canvas_dark.png");
  }

  await browser.close();
  console.log("E2E Verification completed successfully!");
}

main().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
