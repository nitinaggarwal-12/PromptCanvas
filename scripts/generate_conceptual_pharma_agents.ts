import * as fs from "fs";
import * as path from "path";
import puppeteer from "puppeteer";
import { generateConceptualPharmaXml } from "../src/lib/gcpConceptualPharma";

async function main() {
  const outDir = path.resolve(process.cwd(), "diagrams/pharma_drug_discovery");
  fs.mkdirSync(outDir, { recursive: true });

  const xml = generateConceptualPharmaXml(false);
  const xmlPath = path.resolve(outDir, "01_conceptual_pharma_drug_discovery.drawio.xml");
  const pngPath = path.resolve(outDir, "01_conceptual_pharma_drug_discovery.png");

  fs.writeFileSync(xmlPath, xml.trim(), "utf-8");
  console.log(`Saved Clean Conceptual Pharma XML to ${xmlPath}`);

  // Also save to scratch
  const scratchDir = path.resolve(process.cwd(), "scratch/screenshots_pharma_conceptual");
  fs.mkdirSync(scratchDir, { recursive: true });
  fs.writeFileSync(path.resolve(scratchDir, "01_conceptual_pharma_drug_discovery.drawio.xml"), xml.trim(), "utf-8");

  // Read local viewer-static.min.js
  const viewerJsPath = path.join(process.cwd(), "public/viewer-static.min.js");
  const viewerJs = fs.readFileSync(viewerJsPath, "utf8");

  const configObj = {
    highlight: "#0000ff",
    nav: false,
    resize: true,
    toolbar: null,
    edit: null,
    xml: xml.trim(),
  };

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { margin: 0; padding: 20px; background: #FFFFFF; display: flex; justify-content: center; }
    .mxgraph { width: 1840px; height: 1060px; }
  </style>
</head>
<body>
  <div class="mxgraph" id="diagram-container" style="max-width:100%;border:1px solid #E2E8F0;"></div>
  <script>
    ${viewerJs}
  </script>
  <script>
    try {
      const el = document.getElementById('diagram-container');
      el.setAttribute('data-mxgraph', JSON.stringify(${JSON.stringify(configObj)}));
      if (window.GraphViewer && window.GraphViewer.processElements) {
        window.GraphViewer.processElements();
      }
    } catch(e) {
      console.error("Initialization error:", e);
    }
  </script>
</body>
</html>`;

  try {
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1150, deviceScaleFactor: 2 });
    page.on("console", (msg) => console.log("PAGE LOG:", msg.text()));
    page.on("pageerror", (err) => console.log("PAGE ERROR:", String(err)));

    await page.setContent(html, { waitUntil: "load" });
    await new Promise((r) => setTimeout(r, 2500));

    const svgExists = await page.evaluate(() => {
      const svg = document.querySelector("svg");
      return !!svg && svg.childNodes.length > 0;
    });
    console.log("SVG successfully rendered inside DOM:", svgExists);

    const container = await page.$(".mxgraph");
    if (container) {
      await container.screenshot({ path: pngPath });
      console.log(`Rendered clean PNG to ${pngPath}`);
    } else {
      await page.screenshot({ path: pngPath, fullPage: true });
      console.log(`Rendered fallback PNG to ${pngPath}`);
    }

    // Also copy to scratch
    fs.copyFileSync(pngPath, path.resolve(scratchDir, "01_conceptual_pharma_drug_discovery.png"));

    await browser.close();
    console.log("Puppeteer rendering completed successfully!");
  } catch (e) {
    console.error("Puppeteer rendering error:", e);
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(console.error);
}
