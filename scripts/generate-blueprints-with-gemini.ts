import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer';
import { GoogleGenAI } from '@google/genai';
import { BLUEPRINT_KNOWLEDGE_MATRIX } from '../src/lib/blueprintKnowledgeMatrixNormalized';

// Load environment keys from .env.local natively
try {
  const envLocalPath = path.resolve('.env.local');
  if (fs.existsSync(envLocalPath)) {
    const lines = fs.readFileSync(envLocalPath, 'utf8').split('\n');
    for (const line of lines) {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let value = match[2] || '';
        if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
        if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
        process.env[key] = value.trim();
      }
    }
  }
} catch (e) {
  console.warn('Could not read .env.local:', e);
}

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('❌ GEMINI_API_KEY is not defined in .env.local');
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });
const modelId = process.env.GEMINI_MODEL_ID || 'gemini-3.1-pro-preview';

const PUBLIC_BLUEPRINTS_DIR = path.resolve('public/blueprints');
const PUBLIC_TEMPLATES_DIR = path.resolve('public/templates');
const SCRATCH_OUTPUT_DIR = path.resolve('scratch/blueprint_diagrams');

fs.mkdirSync(PUBLIC_BLUEPRINTS_DIR, { recursive: true });
fs.mkdirSync(PUBLIC_TEMPLATES_DIR, { recursive: true });
fs.mkdirSync(SCRATCH_OUTPUT_DIR, { recursive: true });

const SYSTEM_INSTRUCTION = `You are the Lead Google Cloud Enterprise Architect and Draw.io Graph Compiler.
Your mission is to generate complete, production-grade, highly detailed, visually rich, and technically accurate Draw.io XML diagrams in the Light Theme Architecture standard.

Rules for Draw.io XML:
1. Wrap root with <mxfile><diagram><mxGraphModel dx="1600" dy="950" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1000" pageHeight="720" background="#F8FAFC"><root><mxCell id="0"/><mxCell id="1" parent="0"/>...
2. Use horizontal rounded container swimlanes (fillColor="#FFFFFF", strokeColor="#CBD5E1", strokeWidth="1.5", arcSize="10", shadow="1").
3. Use left-docked bold tier title pods (fillColor="#1E293B" or "#1E3A8A", fontColor="#FFFFFF", bold uppercase 12.5px).
4. Use crisp white component cards with high-contrast dark text (#0F172A titles, #475569 descriptions), colored accent borders (#2563EB, #059669, #7C3AED, #D97706), and embedded SVG icons.
5. Create explicit orthogonal connection arrows with numbered data flow step labels (e.g. "1. Ingest Events", "2. CDC Sync", "3. Transform") on clean white label badges (#FFFFFF).
6. Return ONLY the raw valid <mxfile>...</mxfile> XML without markdown fences.`;

async function generateWithGemini(blueprint: typeof BLUEPRINT_KNOWLEDGE_MATRIX[0]): Promise<string> {
  const prompt = `Generate a complete, highly detailed, visually rich Light Theme Draw.io XML architecture diagram for:
Title: ${blueprint.diagramName}
Blueprint ID: ${blueprint.combinedId}
Domain: ${blueprint.domain}
Abstraction Level: ${blueprint.abstractionLevel}
Core GCP Services: ${blueprint.coreGcpServices.join(', ')}
Key Architecture Directives:
${blueprint.phaseGoal}
${blueprint.generativeBuildSequence}

Requirements:
- 5 distinct horizontal architecture tiers with left header pods.
- Top floating client/source ingress pills.
- Detailed component nodes with clear attributes and sub-chips.
- Numbered data flow arrows connecting all tiers sequentially.
- Off-white background (#F8FAFC) and high-contrast styling.`;

  console.log(`🤖 Calling Gemini (${modelId}) for: ${blueprint.diagramName}...`);

  const response = await ai.models.generateContent({
    model: modelId,
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.2,
      maxOutputTokens: 8192,
    },
  });

  const rawText = response.text || '';
  const cleanXml = rawText
    .replace(/^```(xml)?/i, '')
    .replace(/```$/i, '')
    .trim();

  if (!cleanXml.includes('<mxfile') || !cleanXml.includes('</mxfile>')) {
    throw new Error('Gemini response did not contain complete <mxfile> root');
  }

  return cleanXml;
}

async function runGeminiGeneration() {
  console.log(`Starting Gemini AI diagram generation pipeline for Templates 1 through 10...`);

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 2560, height: 1440, deviceScaleFactor: 2 });

    for (let i = 0; i < 10; i++) {
      const blueprint = BLUEPRINT_KNOWLEDGE_MATRIX[i];
      const id = blueprint.combinedId;
      const cleanId = id.replace(/^(P\d-[A-Z]+-[A-Z]-\d+_|IND-[A-Z]+-\d+_|NEW-[A-Z]+-\d+_)/i, '');

      try {
        const xml = await generateWithGemini(blueprint);
        console.log(`✅ Gemini generated XML for: ${blueprint.diagramName} (${xml.length} bytes)`);

        const config = {
          xml: xml,
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
      margin: 0; padding: 0; width: 100%; height: 100%;
      background: #F8FAFC;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      overflow: hidden; display: flex; align-items: center; justify-content: center;
    }
    #stage {
      width: 100vw; height: 100vh; display: flex; align-items: center; justify-content: center;
      background: #F8FAFC; padding: 24px 32px;
    }
    .mxgraph { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }
    .mxgraph > svg, .mxgraph > div > svg {
      max-width: 98% !important; max-height: 96vh !important;
      width: auto !important; height: auto !important;
      filter: drop-shadow(0 10px 25px rgba(0, 0, 0, 0.08));
    }
  </style>
</head>
<body>
  <div id="stage"><div id="diagram" class="mxgraph"></div></div>
</body>
</html>`;

        await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' });
        await page.evaluate((serializedConfig) => {
          document.getElementById('diagram')?.setAttribute('data-mxgraph', serializedConfig);
        }, JSON.stringify(config));

        await page.addScriptTag({ path: path.resolve('public/viewer-static.min.js') });
        await page.waitForSelector('#diagram svg', { timeout: 10000 });
        await new Promise((r) => setTimeout(r, 600));

        const scratchFile = path.join(SCRATCH_OUTPUT_DIR, `${id}.png`);
        const pubBlueprintFile = path.join(PUBLIC_BLUEPRINTS_DIR, `${id}.png`);
        const pubTemplateFile = path.join(PUBLIC_TEMPLATES_DIR, `${cleanId}.png`);

        await page.screenshot({ path: scratchFile, type: 'png' });
        fs.copyFileSync(scratchFile, pubBlueprintFile);
        fs.copyFileSync(scratchFile, pubTemplateFile);

        console.log(`🖼️ Rendered high-res PNG from Gemini for: ${id}\n`);
      } catch (err: any) {
        console.error(`⚠️ Gemini pipeline fallback/retry for ${id}:`, err?.message || err);
      }
    }
    console.log('🎉 Gemini diagram generation pipeline completed successfully!');
  } finally {
    await browser.close();
  }
}

runGeminiGeneration().catch(console.error);
