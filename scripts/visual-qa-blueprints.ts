import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer';
import { getDefaultXmlForArchitecture } from '../src/lib/architectureTypesCertified';

const TARGETS = [
  { id: 'tech_ai_trism_guardrails', label: '22-ai-trism' },
  { id: 'tech_llm_capacity_quota', label: '33-capacity' },
  { id: 'tech_supply_chain', label: '39-predictive-maintenance' },
];

interface VisualInspection {
  blackOverlays: Array<{ tag: string; width: number; height: number; areaRatio: number; source: string }>;
  svgWidth: number;
  svgHeight: number;
  directChildren: number;
}

const outDir = path.resolve('artifacts/visual-qa');
fs.mkdirSync(outDir, { recursive: true });

function cleanGraphXml(xml: string): string {
  const start = xml.indexOf('<mxGraphModel');
  const end = xml.lastIndexOf('</mxGraphModel>');
  return start !== -1 && end !== -1 ? xml.substring(start, end + 15) : xml;
}

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  const failures: string[] = [];
  try {
    for (const target of TARGETS) {
      const xml = getDefaultXmlForArchitecture(target.id);
      if (!xml) {
        failures.push(`${target.label}: resolver returned no XML`);
        continue;
      }

      const page = await browser.newPage();
      await page.setViewport({ width: 1600, height: 1000, deviceScaleFactor: 1 });
      page.on('console', msg => {
        if (msg.type() === 'error') console.error(`[visual-qa:${target.label}] browser:`, msg.text());
      });

      // External vendor icons are not required for the geometry/overlay gate. Avoid
      // network nondeterminism while keeping self-contained Google Cloud SVGs active.
      await page.setRequestInterception(true);
      page.on('request', req => {
        const url = req.url();
        if (/^https?:\/\//i.test(url)) req.abort();
        else req.continue();
      });

      const config = {
        xml: cleanGraphXml(xml),
        lightbox: true,
        nav: true,
        resize: true,
        toolbar: 'zoom layers tags',
        border: 0,
        transparent: true,
        fit: true,
        'max-scale': 4,
      };

      await page.setContent(`<!doctype html>
<html><head><meta charset="utf-8"><style>
html,body{margin:0;width:100%;height:100%;overflow:hidden;background:#fff}
#frame{position:absolute;inset:0;padding:4px;box-sizing:border-box;overflow:auto;background:#fff}
.mxgraph{width:100%;min-height:100%;display:flex;align-items:center;justify-content:center;background:transparent}
.mxgraph>svg,.mxgraph>div>svg{width:100%!important;max-width:100%!important;height:auto!important;margin:0 auto!important;display:block!important}
.mxgraph>div{max-width:100%}
.geEditor{background-color:transparent!important}
</style></head><body><div id="frame"><div id="diagram" class="mxgraph"></div></div></body></html>`, { waitUntil: 'domcontentloaded' });

      await page.evaluate((serialized) => {
        document.getElementById('diagram')?.setAttribute('data-mxgraph', serialized);
      }, JSON.stringify(config));

      await page.addScriptTag({ path: path.resolve('public/viewer-static.min.js') });

      try {
        await page.waitForSelector('#diagram svg', { timeout: 12000 });
        await new Promise(resolve => setTimeout(resolve, 700));
      } catch {
        failures.push(`${target.label}: Draw.io viewer produced no SVG`);
        await page.screenshot({ path: path.join(outDir, `${target.label}-no-svg.png`) });
        await page.close();
        continue;
      }

      // Use a browser-native function string instead of a TS-transformed closure. tsx/esbuild
      // can inject its __name helper into functions passed directly to page.evaluate(), but that
      // helper does not exist in the browser execution context.
      const inspection = (await page.evaluate(`(() => {
        const root = document.getElementById('diagram');
        const svg = root && root.querySelector('svg');
        if (!root || !svg) return { blackOverlays: [], svgWidth: 0, svgHeight: 0, directChildren: 0 };

        const rootRect = root.getBoundingClientRect();
        const rootArea = Math.max(1, rootRect.width * rootRect.height);
        const blackOverlays = [];

        function isOpaqueBlack(value) {
          const compact = String(value || '').replace(/\\s+/g, '').toLowerCase();
          return compact === '#000' || compact === '#000000' || compact === 'black' ||
            compact === 'rgb(0,0,0)' || compact === 'rgba(0,0,0,1)';
        }

        Array.from(root.children).forEach(function(node) {
          if (!(node instanceof HTMLElement)) return;
          if (node.querySelector('svg')) return;
          const rect = node.getBoundingClientRect();
          const style = getComputedStyle(node);
          const ratio = (rect.width * rect.height) / rootArea;
          if (isOpaqueBlack(style.backgroundColor) && ratio >= 0.08) {
            blackOverlays.push({ tag: node.tagName, width: rect.width, height: rect.height, areaRatio: ratio, source: 'direct-div' });
          }
        });

        svg.querySelectorAll('rect,path,polygon').forEach(function(node) {
          if (!(node instanceof SVGGraphicsElement)) return;
          const rect = node.getBoundingClientRect();
          const style = getComputedStyle(node);
          const ratio = (rect.width * rect.height) / rootArea;
          if (isOpaqueBlack(style.fill) && ratio >= 0.12) {
            blackOverlays.push({ tag: node.tagName, width: rect.width, height: rect.height, areaRatio: ratio, source: 'svg-primitive' });
          }
        });

        const svgRect = svg.getBoundingClientRect();
        return {
          blackOverlays,
          svgWidth: Math.round(svgRect.width),
          svgHeight: Math.round(svgRect.height),
          directChildren: root.children.length,
        };
      })()`)) as VisualInspection;

      await page.screenshot({ path: path.join(outDir, `${target.label}.png`), fullPage: false });
      fs.writeFileSync(path.join(outDir, `${target.label}.json`), JSON.stringify(inspection, null, 2));

      if (inspection.blackOverlays.length) {
        failures.push(`${target.label}: oversized opaque black overlay detected: ${JSON.stringify(inspection.blackOverlays)}`);
      }
      if (inspection.svgWidth < 300 || inspection.svgHeight < 180) {
        failures.push(`${target.label}: rendered SVG unexpectedly small (${inspection.svgWidth}x${inspection.svgHeight})`);
      }

      console.log(`PASS-CANDIDATE ${target.label}: ${inspection.svgWidth}x${inspection.svgHeight}, overlays=${inspection.blackOverlays.length}`);
      await page.close();
    }
  } finally {
    await browser.close();
  }

  if (failures.length) {
    console.error('\nVisual QA failures:');
    failures.forEach(f => console.error(` - ${f}`));
    process.exit(1);
  }

  console.log('\nVisual QA passed: no oversized opaque black overlay on #22, #33, #39.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
