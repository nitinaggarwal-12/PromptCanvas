import puppeteer from "puppeteer";
import * as http from "http";
import * as fs from "fs";
import * as path from "path";
import { createCanvas, loadImage } from "canvas";
import { CANONICAL_TEMPLATES } from "../src/lib/canonical/canonicalTemplates";

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runVisualAudit() {
  console.log("================================================================================");
  console.log("🔍 STARTING VISUAL AUDIT & SIDE-BY-SIDE COMPARISON GENERATOR (TEMPLATES 15 - 34)");
  console.log("================================================================================\n");

  const outDir = path.resolve(process.cwd(), "scratch/visual_audit_comparisons");
  if (fs.existsSync(outDir)) {
    fs.rmSync(outDir, { recursive: true, force: true });
  }
  fs.mkdirSync(outDir, { recursive: true });

  const rawDir = path.resolve(process.cwd(), "scratch/raw_rendered");
  if (fs.existsSync(rawDir)) {
    fs.rmSync(rawDir, { recursive: true, force: true });
  }
  fs.mkdirSync(rawDir, { recursive: true });

  let currentHtml = "";
  const server = http.createServer((req, res) => {
    if (req.url === "/viewer-static.min.js") {
      const filePath = path.resolve(process.cwd(), "public/viewer-static.min.js");
      if (fs.existsSync(filePath)) {
        res.writeHead(200, { "Content-Type": "application/javascript" });
        res.end(fs.readFileSync(filePath));
        return;
      }
    }
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(currentHtml);
  });

  const port = 8998;
  await new Promise<void>((resolve) => server.listen(port, resolve));

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-web-security"]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1680, height: 1050, deviceScaleFactor: 2 });

  const results: Array<{ id: string; name: string; comparisonFile: string }> = [];

  for (let i = 14; i < 34; i++) {
    const tmpl = CANONICAL_TEMPLATES[i];
    const idNum = parseInt(tmpl.id, 10);
    const idStr = idNum.toString().padStart(2, "0");
    const rawFilename = `rendered_${idStr}.png`;
    const rawPath = path.resolve(rawDir, rawFilename);

    console.log(`Rendering Template ${tmpl.id}: ${tmpl.name}...`);
    const xml = tmpl.generateXml("biopharma", "light");

    const configObj = {
      xml: xml.trim(),
      lightbox: false,
      nav: true,
      resize: true,
      toolbar: "zoom layers tags",
      edit: "_blank",
      border: 10,
      transparent: false,
      fit: true,
      "max-scale": 2.0
    };

    currentHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          html, body {
            margin: 0; padding: 0; width: 100%; height: 100%; background: #FFFFFF;
            overflow: hidden; display: flex; align-items: center; justify-content: center;
          }
          .mxgraph {
            width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;
          }
          .mxgraph > svg {
            width: 100% !important; max-width: 1650px !important; height: auto !important; margin: 0 auto;
          }
        </style>
      </head>
      <body>
        <div class="mxgraph" id="diagram-container"></div>
        <script src="/viewer-static.min.js"></script>
        <script>
          const cfg = ${JSON.stringify(configObj)};
          const cont = document.getElementById("diagram-container");
          cont.setAttribute("data-mxgraph", JSON.stringify(cfg));
          if (window.GraphViewer && window.GraphViewer.processElements) {
            window.GraphViewer.processElements();
          }
        </script>
      </body>
      </html>
    `;

    await page.goto("http://localhost:8998", { waitUntil: "networkidle0", timeout: 20000 });
    await sleep(1500);

    const svgCount = await page.evaluate(() => document.querySelectorAll("svg").length);
    if (svgCount === 0) {
      console.error(`❌ Template ${tmpl.id} failed to render SVG.`);
      continue;
    }

    const svgElem = await page.$('.mxgraph > svg') || await page.$('#diagram-container');
    if (svgElem) {
      await svgElem.screenshot({ path: rawPath });
    } else {
      await page.screenshot({ path: rawPath, fullPage: true });
    }

    // Build Side-by-Side Composite Canvas
    const refPath = path.resolve(process.cwd(), `images/${idStr}.png`);
    if (fs.existsSync(refPath)) {
      const imgRef = await loadImage(refPath);
      const imgGen = await loadImage(rawPath);

      // Target canvas dimensions: 3200 width, 1080 height
      const targetW = 1600;
      const targetH = 1000;
      const bannerH = 60;
      const totalW = targetW * 2 + 30;
      const totalH = targetH + bannerH + 20;

      const canvas = createCanvas(totalW, totalH);
      const ctx = canvas.getContext("2d");

      // Fill Background
      ctx.fillStyle = "#0F172A";
      ctx.fillRect(0, 0, totalW, totalH);

      // Top Banner
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 24px -apple-system, sans-serif";
      ctx.fillText(`Template ${tmpl.id}: ${tmpl.name} – Side-by-Side Visual Parity Audit`, 20, 38);

      ctx.fillStyle = "#38BDF8";
      ctx.font = "16px -apple-system, sans-serif";
      ctx.fillText("Ground-Truth Master Reference (Left)  vs  Rendered Canonical Generator (Right)", totalW - 650, 38);

      // Draw Left Image (Reference)
      ctx.fillStyle = "#1E293B";
      ctx.fillRect(10, bannerH + 5, targetW + 5, targetH + 10);
      ctx.drawImage(imgRef, 10, bannerH + 10, targetW, targetH);

      const rightX = targetW + 20;

      // Clean Sub-Headers above diagrams (no overlay on diagram itself)
      ctx.fillStyle = "#F87171";
      ctx.font = "bold 15px -apple-system, sans-serif";
      ctx.fillText(`📷 GROUND TRUTH: images/${idStr}.png`, 15, bannerH - 8);

      ctx.fillStyle = "#4ADE80";
      ctx.font = "bold 15px -apple-system, sans-serif";
      ctx.fillText(`⚡ GENERATED BLUEPRINT: Template ${tmpl.id}`, rightX + 5, bannerH - 8);

      // Draw Right Image (Generated)
      ctx.fillStyle = "#1E293B";
      ctx.fillRect(rightX - 5, bannerH + 5, targetW + 5, targetH + 10);
      ctx.drawImage(imgGen, rightX, bannerH + 10, targetW, targetH);

      const compFilename = `comparison_${idStr}_${tmpl.name.toLowerCase().replace(/[^a-z0-9]+/g, "_")}.png`;
      const compPath = path.resolve(outDir, compFilename);
      fs.writeFileSync(compPath, canvas.toBuffer("image/png"));

      console.log(`  ✅ Generated side-by-side composite: ${compFilename}`);
      results.push({ id: tmpl.id, name: tmpl.name, comparisonFile: compFilename });
    }
  }

  await browser.close();
  server.close();

  console.log("\n================================================================================");
  console.log(`🎉 SIDE-BY-SIDE VISUAL AUDIT COMPLETE FOR TEMPLATES 15 - 34!`);
  console.log(`📁 Comparison Images Directory: ${outDir}`);
  console.log("================================================================================\n");
}

runVisualAudit().catch(err => {
  console.error("Fatal error in visual audit:", err);
  process.exit(1);
});
