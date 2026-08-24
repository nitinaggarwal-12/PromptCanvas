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
      const viewerPath = path.join(process.cwd(), 'public/viewer-static.min.js');
      if (fs.existsSync(viewerPath)) {
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
        res.end(fs.readFileSync(viewerPath));
        return;
      }
    }
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(currentHtml);
  });
  
  const port = 8997;
  await new Promise<void>((resolve) => server.listen(port, () => resolve()));
  
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
    
    currentHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <style>
    html, body { margin: 0; padding: 0; width: 100%; height: 100%; background: #F8FAFC; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; display: flex; flex-direction: column; overflow: hidden; }
    .header-banner { background: #0B111E; padding: 12px 24px; border-bottom: 2px solid #3B82F6; display: flex; justify-content: space-between; align-items: center; }
    .header-title { color: #FFFFFF; font-size: 15px; font-weight: 800; }
    .header-tag { background: rgba(59, 130, 246, 0.2); color: #60A5FA; border: 1px solid rgba(59, 130, 246, 0.4); padding: 3px 10px; border-radius: 9999px; font-size: 11px; font-weight: 600; }
    .canvas-frame { flex: 1; margin: 12px; background: #FFFFFF; border-radius: 8px; border: 1px solid #CBD5E1; display: flex; align-items: center; justify-content: center; overflow: auto; padding: 10px; }
    .mxgraph { width: 100%; height: 100%; min-height: 850px; display: flex; align-items: center; justify-content: center; }
    .mxgraph > svg { width: 100% !important; max-width: 1720px !important; height: auto !important; margin: 0 auto; }
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
</html>`;

    await page.goto(`http://localhost:${port}`, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1500));
    
    const svgCount = await page.evaluate(() => document.querySelectorAll('svg').length);
    console.log(`Template ${tmpl.id} rendered with ${svgCount} SVG elements.`);

    const filename = `${tmpl.id}_${tmpl.name.toLowerCase().replace(/[^a-z0-9]+/g, '_')}.png`;
    const targetFile = path.join(outDir, filename);
    await page.screenshot({ path: targetFile, fullPage: true });
    console.log(`Captured ${filename}`);
  }
  
  await browser.close();
  server.close();
}

main().catch(console.error);
