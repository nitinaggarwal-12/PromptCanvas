import puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';
import { EVOLUTION_STEPS, evolveAst } from '../src/lib/evolution/evolutionEngine';
import { createDefaultFintechAst, ArchitectureAst } from '../src/lib/ast/architectureAst';
import { generateGcpNativeArchitectureXml } from '../src/lib/gcpNativeArchitecture';

const OUTPUT_DIR = path.resolve(process.cwd(), 'scratch/screenshots_10_versions');
const BRAIN_DIR = '/Users/nitinagga/.gemini/jetski/brain/8d379ad2-8382-4c17-976c-6502e40a06cb';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function renderDiagramToPng(
  page: any,
  viewerJs: string,
  xml: string,
  outputPath: string,
  brainPath?: string
) {
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
    body { margin: 0; padding: 24px; background: #0F172A; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
    .mxgraph { width: 1720px; height: 960px; background: #FFFFFF; border-radius: 12px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5); overflow: hidden; }
  </style>
</head>
<body>
  <div class="mxgraph" id="diagram-container"></div>
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
  await sleep(1800);

  // Assert SVG element was physically injected into the DOM
  const svgInfo = await page.evaluate(() => {
    const svg = document.querySelector('svg');
    if (!svg) return { exists: false, childCount: 0 };
    return {
      exists: true,
      childCount: svg.childNodes.length,
      width: svg.getAttribute('width'),
      height: svg.getAttribute('height')
    };
  });

  if (!svgInfo.exists || svgInfo.childCount === 0) {
    throw new Error(`SVG failed to render inside DOM for ${outputPath}`);
  }

  const container = await page.$('.mxgraph');
  if (container) {
    await container.screenshot({ path: outputPath });
  } else {
    await page.screenshot({ path: outputPath, fullPage: true });
  }

  const stat = fs.statSync(outputPath);
  console.log(` ✅ Rendered ${path.basename(outputPath)} (${Math.round(stat.size / 1024)} KB, SVG nodes: ${svgInfo.childCount})`);

  if (brainPath && fs.existsSync(BRAIN_DIR)) {
    fs.copyFileSync(outputPath, brainPath);
  }
}

async function main() {
  console.log('🚀 Launching Chrome Headless for 10 Evolution Versions + Custom Diagrams...');
  
  const viewerJsPath = path.join(process.cwd(), 'public/viewer-static.min.js');
  const viewerJs = fs.readFileSync(viewerJsPath, 'utf8');

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1180']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1180, deviceScaleFactor: 2 });

  let currentAst: ArchitectureAst = createDefaultFintechAst();
  const filenames = [
    '01_v1_0_payments_mesh_baseline.png',
    '02_v2_0_clinical_fhir_intake.png',
    '03_v3_0_retail_iot_supply_chain.png',
    '04_v4_0_fintech_token_vault.png',
    '05_v5_0_telco_5g_network_slice.png',
    '06_v6_0_media_streaming_veo_coe.png',
    '07_v7_0_autonomous_fleet_telematics.png',
    '08_v8_0_threat_intel_model_armor.png',
    '09_v9_0_smart_manufacturing_edge.png',
    '10_v10_0_sovereign_ai_cloud_eu.png'
  ];

  console.log('\n--- 1. Rendering All 10 Enterprise Evolution Blueprints ---');
  for (let i = 0; i < EVOLUTION_STEPS.length; i++) {
    const step = EVOLUTION_STEPS[i];
    currentAst = evolveAst(currentAst, step);

    const xml = generateGcpNativeArchitectureXml(
      {
        projectTitle: step.projectTitle,
        domain: step.domain
      },
      currentAst
    );

    const filename = filenames[i];
    const outPath = path.join(OUTPUT_DIR, filename);
    const brainPath = path.join(BRAIN_DIR, filename);

    console.log(`[${step.versionTag}] Generating ${step.versionName}...`);
    await renderDiagramToPng(page, viewerJs, xml, outPath, brainPath);
  }

  console.log('\n--- 2. Rendering Custom Architectures ---');
  
  // Custom 1: Pure Conceptual Architecture (4-Flow Taxonomy)
  const conceptualXmlPath = path.join(process.cwd(), 'scratch/sap_google_agents/pure_conceptual_sap_agents.drawio.xml');
  if (fs.existsSync(conceptualXmlPath)) {
    const conceptualXml = fs.readFileSync(conceptualXmlPath, 'utf8');
    const outPath = path.join(OUTPUT_DIR, 'custom_01_pure_conceptual_4flow.png');
    const brainPath = path.join(BRAIN_DIR, 'custom_01_pure_conceptual_4flow.png');
    console.log('Rendering Custom 1: Pure Conceptual Architecture (4-Flow Model)...');
    await renderDiagramToPng(page, viewerJs, conceptualXml, outPath, brainPath);
  }

  // Custom 2: True Technical Production Architecture (SAP Agents on Google Cloud)
  const technicalXmlPath = path.join(process.cwd(), 'scratch/sap_google_agents/true_technical_sap_agents_google_cloud.drawio.xml');
  if (fs.existsSync(technicalXmlPath)) {
    const technicalXml = fs.readFileSync(technicalXmlPath, 'utf8');
    const outPath = path.join(OUTPUT_DIR, 'custom_02_true_technical_sap_google_agents.png');
    const brainPath = path.join(BRAIN_DIR, 'custom_02_true_technical_sap_google_agents.png');
    console.log('Rendering Custom 2: True Technical Multi-Agent Production Architecture...');
    await renderDiagramToPng(page, viewerJs, technicalXml, outPath, brainPath);
  }

  await browser.close();
  console.log('\n🎉 Successfully rendered all 10 versions + custom diagrams to high-resolution PNG!');
}

main().catch(err => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});
