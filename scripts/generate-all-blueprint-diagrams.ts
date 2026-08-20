import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer';
import { BLUEPRINT_KNOWLEDGE_MATRIX } from '../src/lib/blueprintKnowledgeMatrixNormalized';
import { getDefaultXmlForArchitecture } from '../src/lib/architectureTypesCertified';

const PUBLIC_BLUEPRINTS_DIR = path.resolve('public/blueprints');
const PUBLIC_TEMPLATES_DIR = path.resolve('public/templates');
const SCRATCH_OUTPUT_DIR = path.resolve('scratch/blueprint_diagrams');

fs.mkdirSync(PUBLIC_BLUEPRINTS_DIR, { recursive: true });
fs.mkdirSync(PUBLIC_TEMPLATES_DIR, { recursive: true });
fs.mkdirSync(SCRATCH_OUTPUT_DIR, { recursive: true });

function cleanGraphXml(xml: string): string {
  if (!xml) return '';
  const trimmed = xml.trim();
  if (trimmed.includes('<mxfile')) {
    return trimmed;
  }
  const start = trimmed.indexOf('<mxGraphModel');
  const end = trimmed.lastIndexOf('</mxGraphModel>');
  if (start !== -1 && end !== -1) {
    return trimmed.substring(start, end + 15);
  }
  return trimmed;
}

async function generateAllBlueprintDiagrams() {
  console.log(`Starting high-resolution generation of architecture diagram PNGs for all ${BLUEPRINT_KNOWLEDGE_MATRIX.length} blueprints...`);

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
  });

  const results: Array<{ id: string; name: string; level: string; success: boolean; filePath?: string; error?: string }> = [];

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 2560, height: 1440, deviceScaleFactor: 2 });

    for (let i = 0; i < BLUEPRINT_KNOWLEDGE_MATRIX.length; i++) {
      const blueprint = BLUEPRINT_KNOWLEDGE_MATRIX[i];
      const id = blueprint.combinedId;
      const cleanId = id.replace(/^(P\d-[A-Z]+-[A-Z]-\d+_|IND-[A-Z]+-\d+_|NEW-[A-Z]+-\d+_)/i, '');
      console.log(`[${i + 1}/${BLUEPRINT_KNOWLEDGE_MATRIX.length}] Rendering: ${blueprint.diagramName} (${id})...`);

      const xml = getDefaultXmlForArchitecture(id);
      if (!xml || xml.length < 50) {
        console.warn(`⚠️ No XML found for blueprint: ${id}`);
        results.push({ id, name: blueprint.diagramName, level: blueprint.abstractionLevel, success: false, error: 'No XML returned by resolver' });
        continue;
      }

      const cleanXml = cleanGraphXml(xml);
      const config = {
        xml: cleanXml,
        lightbox: false,
        nav: false,
        resize: true,
        toolbar: '',
        border: 40,
        transparent: false,
        fit: true,
        'max-scale': 4,
      };

      const htmlContent = `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * { box-sizing: border-box; }
    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      background: #090d16;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    #stage {
      width: 100vw;
      height: 100vh;
      display: flex;
      flex-direction: column;
      background: radial-gradient(circle at 50% 20%, #151e32 0%, #090d16 100%);
      padding: 24px 32px;
      position: relative;
    }
    #header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 16px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      margin-bottom: 16px;
      flex-shrink: 0;
    }
    #header .title-area {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    #header .badge-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .badge {
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      padding: 3px 8px;
      border-radius: 6px;
    }
    .badge-primary {
      background: rgba(59, 130, 246, 0.25);
      color: #60a5fa;
      border: 1px solid rgba(96, 165, 250, 0.4);
    }
    .badge-phase {
      background: rgba(16, 185, 129, 0.2);
      color: #34d399;
      border: 1px solid rgba(52, 211, 153, 0.4);
    }
    .badge-gcp {
      background: rgba(245, 158, 11, 0.2);
      color: #fbbf24;
      border: 1px solid rgba(251, 191, 36, 0.4);
    }
    #header h1 {
      margin: 0;
      font-size: 22px;
      font-weight: 800;
      color: #ffffff;
      letter-spacing: -0.01em;
    }
    #header .meta-tag {
      font-size: 12px;
      color: #94a3b8;
      font-weight: 600;
    }
    #diagram-container {
      flex: 1;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 14px;
      padding: 16px;
    }
    .mxgraph {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .mxgraph > svg, .mxgraph > div > svg {
      max-width: 98% !important;
      max-height: 94% !important;
      width: auto !important;
      height: auto !important;
      filter: drop-shadow(0 12px 30px rgba(0, 0, 0, 0.6));
    }
    #footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 12px;
      font-size: 11px;
      color: #64748b;
      font-weight: 600;
      flex-shrink: 0;
    }
  </style>
</head>
<body>
  <div id="stage">
    <div id="header">
      <div class="title-area">
        <div class="badge-row">
          <span class="badge badge-primary">${blueprint.abstractionLevel || 'Technical'} Architecture</span>
          <span class="badge badge-phase">${blueprint.phase || 'Enterprise'}</span>
          <span class="badge badge-gcp">Google Cloud Native</span>
        </div>
        <h1>${blueprint.diagramName}</h1>
      </div>
      <div style="text-align: right">
        <div style="font-size: 13px; font-weight: 800; color: #38bdf8;">PROMPTCANVAS ENTERPRISE</div>
        <div class="meta-tag">${blueprint.stackLayer || 'Layer 5 (Operations)'} • ${blueprint.domain || 'Infrastructure'}</div>
      </div>
    </div>

    <div id="diagram-container">
      <div id="diagram" class="mxgraph"></div>
    </div>

    <div id="footer">
      <span>Google Cloud Reference Architecture • Built with PromptCanvas Engine</span>
      <span>${id} • High-Fidelity Blueprint</span>
    </div>
  </div>
</body>
</html>`;

      await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' });
      await page.evaluate((serialized) => {
        document.getElementById('diagram')?.setAttribute('data-mxgraph', serialized);
      }, JSON.stringify(config));

      await page.addScriptTag({ path: path.resolve('public/viewer-static.min.js') });

      try {
        await page.waitForSelector('#diagram svg', { timeout: 8000 });
        await new Promise(resolve => setTimeout(resolve, 500));

        const targetPaths = [
          path.join(SCRATCH_OUTPUT_DIR, `${id}.png`),
          path.join(PUBLIC_BLUEPRINTS_DIR, `${id}.png`),
          path.join(PUBLIC_TEMPLATES_DIR, `${cleanId}.png`),
          path.join(PUBLIC_TEMPLATES_DIR, `${id}.png`),
        ];

        const buffer = await page.screenshot({ type: 'png' });
        for (const p of targetPaths) {
          fs.writeFileSync(p, buffer);
        }

        console.log(`✅ [${i + 1}/${BLUEPRINT_KNOWLEDGE_MATRIX.length}] Rendered: ${id}`);
        results.push({ id, name: blueprint.diagramName, level: blueprint.abstractionLevel, success: true, filePath: targetPaths[0] });
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        console.error(`❌ Error rendering ${id}:`, message);
        results.push({ id, name: blueprint.diagramName, level: blueprint.abstractionLevel, success: false, error: message });
      }
    }

    await page.close();
  } finally {
    await browser.close();
  }

  const reportPath = path.join(SCRATCH_OUTPUT_DIR, 'blueprint_render_manifest.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));

  const totalSuccess = results.filter(r => r.success).length;
  console.log(`\n======================================================`);
  console.log(`🎉 COMPLETED: ${totalSuccess} / ${results.length} Blueprints successfully rendered to PNG!`);
  console.log(`📁 Artifacts stored in:`);
  console.log(`   - ${SCRATCH_OUTPUT_DIR}`);
  console.log(`   - ${PUBLIC_BLUEPRINTS_DIR}`);
  console.log(`   - ${PUBLIC_TEMPLATES_DIR}`);
  console.log(`======================================================\n`);
}

generateAllBlueprintDiagrams().catch(console.error);
