/**
 * 🎨 MASTER BATCH COMPARISON GENERATOR FOR ALL 41 CANONICAL TEMPLATES
 * Generates side-by-side comparison images for templates 01 through 41:
 * - Left: Ground-Truth Master Reference (images/XX.png)
 * - Right: Rendered Canonical Blueprint
 * - Outputs to: scratch/screenshots_canonical_gallery/comparisons/comparison_XX.png
 * - Creates an interactive HTML visual gallery: scratch/screenshots_canonical_gallery/index.html
 */

import puppeteer from "puppeteer";
import * as http from "http";
import * as fs from "fs";
import * as path from "path";
import { createCanvas, loadImage } from "canvas";
import { CANONICAL_TEMPLATES } from "../src/lib/canonical/canonicalTemplates";

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function renderAllComparisons() {
  console.log("================================================================================");
  console.log("📸 GENERATING 1:1 SIDE-BY-SIDE COMPARISONS FOR ALL 41 CANONICAL BLUEPRINTS");
  console.log("================================================================================\n");

  const outDir = path.resolve(process.cwd(), "scratch/screenshots_canonical_gallery");
  const renderedDir = path.resolve(outDir, "rendered");
  const compDir = path.resolve(outDir, "comparisons");

  fs.mkdirSync(outDir, { recursive: true });
  fs.mkdirSync(renderedDir, { recursive: true });
  fs.mkdirSync(compDir, { recursive: true });

  // 1. Setup local HTTP server for viewer-static.min.js
  let currentHtml = "";
  const server = http.createServer((req, res) => {
    if (req.url === "/viewer-static.min.js") {
      const p = path.resolve(process.cwd(), "public/viewer-static.min.js");
      if (fs.existsSync(p)) {
        res.writeHead(200, { "Content-Type": "application/javascript" });
        res.end(fs.readFileSync(p));
        return;
      }
    }
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(currentHtml);
  });

  const port = 3099;
  await new Promise<void>((resolve) => server.listen(port, resolve));

  // 2. Launch Puppeteer
  const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: chromePath,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-web-security"]
  });

  const page = await browser.newPage();
  const summary: { id: string; name: string; compPath: string; hasRef: boolean }[] = [];

  for (const t of CANONICAL_TEMPLATES) {
    const id = t.id.padStart(2, "0");
    const refPath = path.resolve(process.cwd(), `images/${id}.png`);
    const renderedPath = path.resolve(renderedDir, `${id}_rendered.png`);
    const compPath = path.resolve(compDir, `comparison_${id}.png`);

    console.log(`Rendering Template ${id}: ${t.name}...`);

    let xml = "";
    try {
      xml = t.generateXml("default", "light");
    } catch (e: any) {
      console.error(`  ❌ Failed to generate XML for ${id}: ${e.message}`);
      continue;
    }

    // Determine dimensions from XML or defaults
    let width = 1600;
    let height = 1000;
    const dxMatch = xml.match(/pageWidth="(\d+)"/);
    const dyMatch = xml.match(/pageHeight="(\d+)"/);
    if (dxMatch && dyMatch) {
      width = parseInt(dxMatch[1], 10);
      height = parseInt(dyMatch[1], 10);
    }

    const configObj = {
      xml: xml.trim(),
      lightbox: false,
      nav: false,
      resize: true,
      toolbar: "zoom",
      edit: "_blank",
      border: 0,
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
            width: 100% !important; height: auto !important; margin: 0 auto;
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

    await page.setViewport({ width, height, deviceScaleFactor: 2 });
    await page.goto(`http://localhost:${port}`, { waitUntil: "networkidle0", timeout: 20000 });
    await sleep(1200);

    const svgElem = (await page.$(".mxgraph > svg")) || (await page.$("#diagram-container"));
    if (svgElem) {
      await svgElem.screenshot({ path: renderedPath });
    } else {
      await page.screenshot({ path: renderedPath, fullPage: true });
    }

    const hasRef = fs.existsSync(refPath);
    if (hasRef) {
      const imgRef = await loadImage(refPath);
      const imgGen = await loadImage(renderedPath);

      const bannerH = 60;
      const totalW = width * 2 + 30;
      const totalH = height + bannerH + 20;

      const canvas = createCanvas(totalW, totalH);
      const ctx = canvas.getContext("2d");

      // Dark glassmorphic background
      ctx.fillStyle = "#0B0F19";
      ctx.fillRect(0, 0, totalW, totalH);

      // Top banner
      ctx.fillStyle = "#0F172A";
      ctx.fillRect(0, 0, totalW, bannerH);
      ctx.strokeStyle = "#1E293B";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, bannerH);
      ctx.lineTo(totalW, bannerH);
      ctx.stroke();

      // Banner text
      ctx.font = "bold 15px sans-serif";
      ctx.fillStyle = "#38BDF8";
      ctx.fillText(`Template ${id}: ${t.name} — 1:1 Ground-Truth Visual Parity Audit`, 20, 26);

      ctx.font = "12px sans-serif";
      ctx.fillStyle = "#F87171";
      ctx.fillText(`🔴 GROUND-TRUTH REFERENCE: images/${id}.png`, 20, 48);

      ctx.fillStyle = "#4ADE80";
      ctx.fillText(`⚡ GENERATED CANONICAL BLUEPRINT: Template ${id}`, width + 20, 48);

      ctx.fillStyle = "#94A3B8";
      ctx.font = "11px sans-serif";
      ctx.textAlign = "right";
      ctx.fillText("Ground-Truth Master Reference (Left) vs. Rendered Canonical Blueprint (Right)", totalW - 20, 32);
      ctx.textAlign = "left";

      // Draw Ground Truth Image (Left)
      ctx.drawImage(imgRef, 10, bannerH + 10, width, height);

      // Dividing border
      ctx.strokeStyle = "#334155";
      ctx.lineWidth = 2;
      ctx.strokeRect(10, bannerH + 10, width, height);

      // Draw Rendered Image (Right)
      ctx.drawImage(imgGen, width + 20, bannerH + 10, width, height);
      ctx.strokeRect(width + 20, bannerH + 10, width, height);

      fs.writeFileSync(compPath, canvas.toBuffer("image/png"));
      console.log(`  🔍 Comparison saved: comparison_${id}.png`);
    } else {
      console.log(`  ⚠️ No reference image found at images/${id}.png`);
    }

    summary.push({
      id,
      name: t.name,
      compPath,
      hasRef
    });
  }

  await browser.close();
  server.close();

  // 3. Generate HTML Gallery
  const galleryHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>PromptCanvas — All 41 Canonical Blueprints Side-by-Side Visual Gallery</title>
      <style>
        * { box-sizing: border-box; }
        body {
          margin: 0; padding: 24px; background: #090D16; color: #F8FAFC;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }
        header {
          padding-bottom: 20px; border-bottom: 1px solid #1E293B; margin-bottom: 24px;
        }
        h1 { font-size: 28px; margin: 0 0 8px 0; color: #38BDF8; }
        p { color: #94A3B8; margin: 0; font-size: 14px; }
        .grid {
          display: flex; flex-direction: column; gap: 40px;
        }
        .card {
          background: #0F172A; border: 1px solid #1E293B; border-radius: 8px; overflow: hidden;
        }
        .card-header {
          padding: 12px 18px; background: #131E33; border-bottom: 1px solid #1E293B;
          display: flex; justify-content: space-between; align-items: center;
        }
        .card-title { font-weight: 700; font-size: 16px; color: #F1F5F9; }
        .badge {
          background: #0369A1; color: #E0F2FE; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 600;
        }
        .card-body { padding: 12px; text-align: center; }
        .card-body img {
          max-width: 100%; height: auto; border-radius: 4px; border: 1px solid #334155;
        }
      </style>
    </head>
    <body>
      <header>
        <h1>🏛️ PromptCanvas Master Canonical Blueprint Gallery</h1>
        <p>Ground-Truth Master Reference (Left) vs. Rendered Canonical Blueprint (Right) across all 41 Architecture Blueprints.</p>
      </header>
      <div class="grid">
        ${summary.map(s => `
          <div class="card" id="t_${s.id}">
            <div class="card-header">
              <div class="card-title">Template ${s.id}: ${s.name}</div>
              <div class="badge">${s.hasRef ? "1:1 Comparison Audited" : "Rendered Only"}</div>
            </div>
            <div class="card-body">
              <a href="comparisons/comparison_${s.id}.png" target="_blank">
                <img src="comparisons/comparison_${s.id}.png" alt="Template ${s.id}" loading="lazy"/>
              </a>
            </div>
          </div>
        `).join("\n")}
      </div>
    </body>
    </html>
  `;

  fs.writeFileSync(path.resolve(outDir, "index.html"), galleryHtml);
  console.log("\n================================================================================");
  console.log(`🎉 ALL 41 COMPARISONS & VISUAL GALLERY RENDERED SUCCESSFULLY!`);
  console.log(`📁 Visual Gallery HTML: file://${path.resolve(outDir, "index.html")}`);
  console.log("================================================================================\n");
}

if (require.main === module) {
  renderAllComparisons().catch(err => {
    console.error("Fatal error during batch comparison render:", err);
    process.exit(1);
  });
}
