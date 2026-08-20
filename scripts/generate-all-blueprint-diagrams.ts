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
      const isLightTheme = /background=["']#(F8FAFC|FFFFFF|FAFAFA)/i.test(cleanXml);
      const bgColor = isLightTheme ? '#F8FAFC' : '#0B111E';
      const shadowFilter = isLightTheme
        ? 'filter: drop-shadow(0 10px 25px rgba(0, 0, 0, 0.08));'
        : 'filter: drop-shadow(0 14px 36px rgba(0, 0, 0, 0.7));';

      const config = {
        xml: cleanXml,
        lightbox: false,
        nav: false,
        resize: true,
        toolbar: '',
        border: 24,
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
      background: ${bgColor};
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    #stage {
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: ${bgColor};
      padding: 24px 32px;
      position: relative;
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
      max-height: 96vh !important;
      width: auto !important;
      height: auto !important;
      ${shadowFilter}
    }
  </style>
</head>
<body>
  <div id="stage">
    <div id="diagram" class="mxgraph"></div>
  </div>
</body>
</html>`;

      await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' });

      await page.evaluate((serializedConfig) => {
        const el = document.getElementById('diagram');
        if (el) {
          el.setAttribute('data-mxgraph', serializedConfig);
        }
      }, JSON.stringify(config));

      const viewerScriptPath = path.resolve('public/viewer-static.min.js');
      await page.addScriptTag({ path: viewerScriptPath });

      try {
        await page.waitForSelector('#diagram svg', { timeout: 10000 });
        await new Promise((resolve) => setTimeout(resolve, 600));

        const scratchFile = path.join(SCRATCH_OUTPUT_DIR, `${id}.png`);
        const pubBlueprintFile = path.join(PUBLIC_BLUEPRINTS_DIR, `${id}.png`);
        const pubTemplateFile = path.join(PUBLIC_TEMPLATES_DIR, `${cleanId}.png`);
        const pubTemplateFull = path.join(PUBLIC_TEMPLATES_DIR, `${id}.png`);

        await page.screenshot({
          path: scratchFile,
          type: 'png',
          omitBackground: false,
        });

        fs.copyFileSync(scratchFile, pubBlueprintFile);
        fs.copyFileSync(scratchFile, pubTemplateFile);
        fs.copyFileSync(scratchFile, pubTemplateFull);

        results.push({
          id,
          name: blueprint.diagramName,
          level: blueprint.abstractionLevel,
          success: true,
          filePath: scratchFile,
        });

        console.log(`✅ [${i + 1}/${BLUEPRINT_KNOWLEDGE_MATRIX.length}] Rendered: ${id}`);
      } catch (err: any) {
        console.error(`❌ Failed to render ${id}:`, err?.message || err);
        results.push({
          id,
          name: blueprint.diagramName,
          level: blueprint.abstractionLevel,
          success: false,
          error: err?.message || 'SVG render timeout',
        });
      }
    }

    const manifestPath = path.join(SCRATCH_OUTPUT_DIR, 'blueprint_render_manifest.json');
    fs.writeFileSync(
      manifestPath,
      JSON.stringify(
        {
          generatedAt: new Date().toISOString(),
          total: BLUEPRINT_KNOWLEDGE_MATRIX.length,
          successful: results.filter((r) => r.success).length,
          failed: results.filter((r) => !r.success).length,
          results,
        },
        null,
        2
      )
    );

    console.log('\n======================================================');
    console.log(`🎉 COMPLETED: ${results.filter((r) => r.success).length} / ${BLUEPRINT_KNOWLEDGE_MATRIX.length} Blueprints successfully rendered to PNG!`);
    console.log(`📁 Artifacts stored in:\n   - ${SCRATCH_OUTPUT_DIR}\n   - ${PUBLIC_BLUEPRINTS_DIR}\n   - ${PUBLIC_TEMPLATES_DIR}`);
    console.log('======================================================\n');
  } finally {
    await browser.close();
  }
}

generateAllBlueprintDiagrams().catch((err) => {
  console.error('Fatal batch generation error:', err);
  process.exit(1);
});
