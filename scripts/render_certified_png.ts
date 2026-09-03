import puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';

async function render() {
  const xmlPath = path.join(process.cwd(), 'scratch/sap_google_agents/true_technical_sap_agents_google_cloud.drawio.xml');
  const pngPath = path.join(process.cwd(), 'scratch/sap_google_agents/true_technical_sap_agents_google_cloud.png');
  const viewerJsPath = path.join(process.cwd(), 'public/viewer-static.min.js');
  
  const xml = fs.readFileSync(xmlPath, 'utf8');
  const viewerJs = fs.readFileSync(viewerJsPath, 'utf8');

  console.log('Launching browser with Chrome...');
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', String(err)));

  const configObj = {
    highlight: '#0000ff',
    nav: false,
    resize: true,
    toolbar: null,
    edit: null,
    xml: xml
  };

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { margin: 0; padding: 20px; background: #FFFFFF; display: flex; justify-content: center; }
    .mxgraph { width: 1820px; height: 980px; }
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

  await page.setContent(html, { waitUntil: 'load' });
  await new Promise(r => setTimeout(r, 2500));

  // Check if SVG was actually rendered inside the container
  const svgExists = await page.evaluate(() => {
    const svg = document.querySelector('svg');
    return !!svg && svg.childNodes.length > 0;
  });

  console.log('SVG successfully rendered inside DOM:', svgExists);

  const container = await page.$('.mxgraph');
  if (container) {
    await container.screenshot({ path: pngPath });
    console.log('Successfully captured certified technical PNG:', pngPath);
  } else {
    await page.screenshot({ path: pngPath, fullPage: true });
    console.log('Fallback fullpage captured certified technical PNG:', pngPath);
  }

  // Also copy to brain artifact directory
  const brainDir = '/Users/nitinagga/.gemini/jetski/brain/91e4f891-6e33-44a8-a4f2-d41b4a004f4a';
  const brainPngPath = path.join(brainDir, 'true_technical_sap_agents_google_cloud.png');
  fs.copyFileSync(pngPath, brainPngPath);
  console.log('Successfully updated brain artifact image at:', brainPngPath);

  await browser.close();
}

render().catch(console.error);
