import puppeteer from 'puppeteer';
import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';
import { CANONICAL_TEMPLATES } from '../src/lib/canonical/canonicalTemplates';
import { auditTemplate } from './run_canonical_suite';

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log("================================================================================");
  console.log("🚀 STARTING FULL CANONICAL TEST HARNESS & AUTOMATED RENDERING SUITE (34 TEMPLATES)");
  console.log("================================================================================\n");

  // Step 1: Geometric & Structural Audit
  console.log("🔍 PHASE 1: Running Mathematical 2D Ray-Box Collision & Structural Audit...");
  let totalCollisions = 0;
  for (const t of CANONICAL_TEMPLATES) {
    const xml = t.generateXml('biopharma', 'light');
    const res = auditTemplate(xml, t.id, t.name);
    totalCollisions += res.collisions.length;
    if (res.collisions.length > 0) {
      console.error(`❌ Template ${t.id} failed collision audit with ${res.collisions.length} collisions:`);
      res.collisions.forEach(c => console.error(`    ${c}`));
    }
  }

  if (totalCollisions > 0) {
    console.error(`\n❌ QUALITY GATE FAILED: Found ${totalCollisions} geometric collisions.`);
    process.exit(1);
  }
  console.log("✅ PHASE 1 COMPLETE: 0 Geometric Collisions across all 34 canonical blueprints!\n");

  // Step 2: Spin up local HTTP server with static assets
  console.log("🌐 PHASE 2: Initializing local rendering server & Puppeteer...");
  let currentHtml = '';

  const server = http.createServer((req, res) => {
    if (req.url === '/viewer-static.min.js') {
      const filePath = path.resolve(process.cwd(), 'public/viewer-static.min.js');
      if (fs.existsSync(filePath)) {
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
        res.end(fs.readFileSync(filePath));
        return;
      }
    }
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(currentHtml);
  });

  const port = 8996;
  await new Promise<void>((resolve) => server.listen(port, resolve));

  const outDir = path.resolve(process.cwd(), 'scratch/screenshots_canonical_all');
  if (fs.existsSync(outDir)) {
    fs.rmSync(outDir, { recursive: true, force: true });
  }
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1800, height: 1100, deviceScaleFactor: 2 });

  console.log("✅ PHASE 2 COMPLETE: Browser initialized with 1800x1100 2x Retina Viewport.\n");

  // Step 3: Render and capture all 34 templates
  console.log("📸 PHASE 3: Rendering & Capturing High-Resolution PNG Screenshots for all 34 blueprints...");

  for (let i = 0; i < CANONICAL_TEMPLATES.length; i++) {
    const tmpl = CANONICAL_TEMPLATES[i];
    const seqNum = (i + 1).toString().padStart(2, '0');
    const slug = tmpl.name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
    const filename = `${seqNum}_${slug}.png`;
    const outPath = path.resolve(outDir, filename);

    const xml = tmpl.generateXml('biopharma', 'light');

    const configObj = {
      xml: xml.trim(),
      lightbox: false,
      nav: true,
      resize: true,
      toolbar: 'zoom layers tags',
      edit: '_blank',
      border: 15,
      transparent: false,
      fit: true,
      'max-scale': 2.5
    };

    currentHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          html, body {
            margin: 0; padding: 0; width: 100%; height: 100%; background: #F8FAFC;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            display: flex; flex-direction: column; overflow: hidden;
          }
          .header-banner {
            background: #0B111E; padding: 12px 24px; border-bottom: 2px solid #3B82F6;
            display: flex; justify-content: space-between; align-items: center; box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          }
          .header-title { color: #FFFFFF; font-size: 15px; font-weight: 800; }
          .header-tag {
            background: rgba(59, 130, 246, 0.2); color: #60A5FA; border: 1px solid rgba(59, 130, 246, 0.4);
            padding: 3px 10px; border-radius: 9999px; font-size: 11px; font-weight: 600;
          }
          .canvas-frame {
            flex: 1; margin: 12px; background: #FFFFFF; border-radius: 8px; border: 1px solid #CBD5E1;
            box-shadow: 0 4px 20px rgba(0,0,0,0.06); display: flex; align-items: center; justify-content: center;
            overflow: auto; padding: 10px;
          }
          .mxgraph {
            width: 100%; height: 100%; min-height: 850px; display: flex; align-items: center; justify-content: center;
          }
          .mxgraph > svg {
            width: 100% !important; max-width: 1720px !important; height: auto !important; margin: 0 auto;
          }
        </style>
      </head>
      <body>
        <div class="header-banner">
          <div class="header-title">Template ${tmpl.id}: ${tmpl.name}</div>
          <div class="header-tag">100% Collision-Free Geometry • Canonical Ground-Truth Blueprint</div>
        </div>
        <div class="canvas-frame">
          <div class="mxgraph" id="diagram-container"></div>
        </div>
        <script src="/viewer-static.min.js"></script>
        <script>
          const cfg = ${JSON.stringify(configObj)};
          const cont = document.getElementById('diagram-container');
          cont.setAttribute('data-mxgraph', JSON.stringify(cfg));
          if (window.GraphViewer && window.GraphViewer.processElements) {
            window.GraphViewer.processElements();
          }
        </script>
      </body>
      </html>
    `;

    await page.goto('http://localhost:8996', { waitUntil: 'networkidle0', timeout: 20000 });
    await sleep(1500);

    const svgCount = await page.evaluate(() => document.querySelectorAll('svg').length);
    if (svgCount === 0) {
      console.error(`❌ Template ${tmpl.id} failed to render SVG elements.`);
      process.exit(1);
    }

    await page.screenshot({ path: outPath, fullPage: true });
    const stats = fs.statSync(outPath);
    console.log(`  [${seqNum}/34] ✅ Captured ${filename} (${stats.size} bytes) - Template ${tmpl.id}: ${tmpl.name}`);
  }

  await browser.close();
  server.close();

  console.log("\n================================================================================");
  console.log(`🎉 ALL 34 CANONICAL MASTER BLUEPRINTS AUDITED & RENDERED WITH 100% SUCCESS!`);
  console.log(`📁 Artifacts Location: ${outDir}`);
  console.log("================================================================================\n");
}

main().catch(err => {
  console.error('Fatal error in test harness:', err);
  process.exit(1);
});
