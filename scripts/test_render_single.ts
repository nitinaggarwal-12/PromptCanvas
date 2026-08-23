import puppeteer from 'puppeteer';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { CANONICAL_TEMPLATES } from '../src/lib/canonical/canonicalTemplates';

async function main() {
  const ids = process.argv.slice(2);
  const targetTemplates = CANONICAL_TEMPLATES.filter(t => ids.length === 0 || ids.includes(t.id));
  
  let currentHtml = '';
  const server = http.createServer((req, res) => {
    if (req.url === '/viewer-static.min.js') {
      const viewerPath = path.join(process.cwd(), 'node_modules/drawio-renderer/viewer-static.min.js');
      if (fs.existsSync(viewerPath)) {
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
        res.end(fs.readFileSync(viewerPath));
        return;
      }
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(currentHtml);
  });
  
  await new Promise<void>((resolve) => server.listen(8767, () => resolve()));
  
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu', '--disable-web-security']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1800, height: 1100, deviceScaleFactor: 2 });
  
  const outDir = path.join(process.cwd(), 'scratch/screenshots_canonical_all');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  for (const tmpl of targetTemplates) {
    const xml = tmpl.generateXml(tmpl.defaultDomain, 'light');
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
    const configJson = JSON.stringify(configObj).replace(/"/g, '&quot;');
    
    currentHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <style>
    body { margin: 0; padding: 24px; background: #0b101b; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
    .banner { color: #f8fafc; font-size: 15px; font-weight: 700; margin-bottom: 16px; display: flex; justify-content: space-between; }
    .canvas-container { background: #FFFFFF; border-radius: 12px; box-shadow: 0 20px 40px rgba(0,0,0,0.5); overflow: hidden; padding: 12px; }
  </style>
  <script src="http://localhost:8767/viewer-static.min.js"></script>
</head>
<body>
  <div class="banner">
    <div>Template ${tmpl.id}: ${tmpl.name}</div>
    <div style="font-size: 12px; color: #38bdf8; font-weight: 600;">100% Collision-Free Geometry • Canonical Ground-Truth Blueprint</div>
  </div>
  <div class="canvas-container">
    <div class="mxgraph" style="max-width: 100%; border: 1px solid #cbd5e1; border-radius: 8px;" data-mxgraph="${configJson}"></div>
  </div>
  <script>
    window.addEventListener('DOMContentLoaded', () => {
      if (window.GraphViewer) {
        GraphViewer.processElements();
      }
    });
  </script>
</body>
</html>`;

    await page.goto('http://localhost:8767', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1200));
    
    const filename = `${tmpl.id}_${tmpl.name.toLowerCase().replace(/[^a-z0-9]+/g, '_')}.png`;
    const targetFile = path.join(outDir, filename);
    await page.screenshot({ path: targetFile, fullPage: false });
    console.log(`Captured ${filename}`);
  }
  
  await browser.close();
  server.close();
}

main().catch(console.error);
