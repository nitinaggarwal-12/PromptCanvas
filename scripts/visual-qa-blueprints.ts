import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer';
import { getDefaultXmlForArchitecture } from '../src/lib/architectureTypesCertified';
import { CATALOG_CANONICAL_IDS } from '../src/lib/blueprintExactResolver';

const TARGETS = CATALOG_CANONICAL_IDS.map((id, index) => ({
  id,
  number: index + 1,
  label: `${String(index + 1).padStart(2, '0')}-${id.replace(/[^a-z0-9]+/gi, '-')}`,
}));

const VIEWPORTS = [
  { name: 'desktop', width: 1600, height: 1000 },
  // Matches the effective content width seen on large-screen/foldable mobile browsers.
  { name: 'compact', width: 1180, height: 920 },
] as const;

interface VisualInspection {
  blackOverlays: Array<{ tag: string; width: number; height: number; areaRatio: number; source: string }>;
  clippedText: Array<{ text: string; width: number; height: number; scrollWidth: number; scrollHeight: number }>;
  textCollisions: Array<{ a: string; b: string; overlapRatio: number }>;
  edgeTextCrossings: Array<{ text: string; pathLength: number }>;
  svgWidth: number;
  svgHeight: number;
  foreignObjects: number;
  minBaseFontPx: number;
  tinyTextCount: number;
}

interface ResultRow {
  blueprint: number;
  id: string;
  viewport: string;
  svg: string;
  blackOverlays: number;
  clippedText: number;
  textCollisions: number;
  edgeTextCrossings: number;
  minBaseFontPx: number;
  tinyTextCount: number;
  failedImageRequests: string[];
  status: 'PASS' | 'FAIL';
}

const outDir = path.resolve('artifacts/visual-qa');
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

function cleanGraphXml(xml: string): string {
  const start = xml.indexOf('<mxGraphModel');
  const end = xml.lastIndexOf('</mxGraphModel>');
  return start !== -1 && end !== -1 ? xml.substring(start, end + 15) : xml;
}

function compactFailureList(values: string[], max = 6): string {
  if (values.length <= max) return values.join(', ');
  return `${values.slice(0, max).join(', ')} … +${values.length - max} more`;
}

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  const failures: string[] = [];
  const rows: ResultRow[] = [];

  try {
    for (const target of TARGETS) {
      const xml = getDefaultXmlForArchitecture(target.id);
      if (!xml) {
        failures.push(`#${target.number} ${target.id}: resolver returned no XML`);
        continue;
      }

      for (const viewport of VIEWPORTS) {
        const page = await browser.newPage();
        const failedImageRequests = new Set<string>();
        await page.setViewport({ width: viewport.width, height: viewport.height, deviceScaleFactor: 1 });

        page.on('console', msg => {
          if (msg.type() === 'error') console.error(`[visual-qa:${target.label}:${viewport.name}] browser:`, msg.text());
        });
        page.on('requestfailed', req => {
          if (req.resourceType() === 'image') failedImageRequests.add(req.url());
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
.mxgraph{width:100%;min-height:100%;display:flex;align-items:flex-start;justify-content:center;background:transparent}
.mxgraph>svg,.mxgraph>div>svg{width:100%!important;max-width:100%!important;height:auto!important;margin:0 auto!important;display:block!important}
.mxgraph>div{max-width:100%}
.geEditor{background-color:transparent!important}
</style></head><body><div id="frame"><div id="diagram" class="mxgraph"></div></div></body></html>`, { waitUntil: 'domcontentloaded' });

        await page.evaluate((serialized) => {
          document.getElementById('diagram')?.setAttribute('data-mxgraph', serialized);
        }, JSON.stringify(config));

        await page.addScriptTag({ path: path.resolve('public/viewer-static.min.js') });

        try {
          await page.waitForSelector('#diagram svg', { timeout: 15000 });
          // Give Draw.io foreignObjects and remote product/vendor icons time to settle.
          await new Promise(resolve => setTimeout(resolve, 1700));
        } catch {
          failures.push(`#${target.number} ${target.id}/${viewport.name}: Draw.io viewer produced no SVG`);
          await page.screenshot({ path: path.join(outDir, `${target.label}-${viewport.name}-no-svg.png`) });
          await page.close();
          continue;
        }

        const inspection = (await page.evaluate(`(() => {
          const root = document.getElementById('diagram');
          const svg = root && root.querySelector('svg');
          if (!root || !svg) return {
            blackOverlays: [], clippedText: [], textCollisions: [], edgeTextCrossings: [],
            svgWidth: 0, svgHeight: 0, foreignObjects: 0, minBaseFontPx: 0, tinyTextCount: 0
          };

          const rootRect = root.getBoundingClientRect();
          const rootArea = Math.max(1, rootRect.width * Math.max(rootRect.height, 1));
          const blackOverlays = [];
          const clippedText = [];
          const textCollisions = [];
          const edgeTextCrossings = [];

          function nearBlack(value) {
            const compact = String(value || '').replace(/\\s+/g, '').toLowerCase();
            if (compact === '#000' || compact === '#000000' || compact === 'black') return true;
            const m = compact.match(/^rgba?\\((\\d+),(\\d+),(\\d+)(?:,([\\d.]+))?\\)$/);
            if (!m) return false;
            const r = Number(m[1]), g = Number(m[2]), b = Number(m[3]), a = m[4] == null ? 1 : Number(m[4]);
            return a >= .9 && r <= 24 && g <= 24 && b <= 24;
          }

          Array.from(root.children).forEach(function(node) {
            if (!(node instanceof HTMLElement)) return;
            if (node.querySelector('svg')) return;
            const rect = node.getBoundingClientRect();
            const style = getComputedStyle(node);
            const ratio = (rect.width * rect.height) / rootArea;
            if (nearBlack(style.backgroundColor) && ratio >= 0.08) {
              blackOverlays.push({ tag: node.tagName, width: rect.width, height: rect.height, areaRatio: ratio, source: 'direct-div' });
            }
          });

          svg.querySelectorAll('rect,path,polygon').forEach(function(node) {
            if (!(node instanceof SVGGraphicsElement)) return;
            const rect = node.getBoundingClientRect();
            const style = getComputedStyle(node);
            const ratio = (rect.width * rect.height) / rootArea;
            if (nearBlack(style.fill) && ratio >= 0.12) {
              blackOverlays.push({ tag: node.tagName, width: rect.width, height: rect.height, areaRatio: ratio, source: 'svg-primitive' });
            }
          });

          const foreignObjects = Array.from(svg.querySelectorAll('foreignObject'));
          const textRects = [];
          let minBaseFontPx = Number.POSITIVE_INFINITY;
          let tinyTextCount = 0;

          function normalizedText(node) {
            return String(node.textContent || '').replace(/\\s+/g, ' ').trim().slice(0, 120);
          }

          foreignObjects.forEach(function(fo) {
            const rect = fo.getBoundingClientRect();
            const text = normalizedText(fo);
            if (!text || rect.width < 4 || rect.height < 4) return;
            const descendants = Array.from(fo.querySelectorAll('*')).filter(function(el) {
              return el instanceof HTMLElement && normalizedText(el).length > 0;
            });
            const probe = descendants.find(function(el) {
              return el instanceof HTMLElement && el.scrollWidth > 0 && el.clientWidth > 0;
            });
            if (probe instanceof HTMLElement) {
              const horizontal = probe.scrollWidth > probe.clientWidth + 3;
              const vertical = probe.scrollHeight > probe.clientHeight + 3;
              if (horizontal || vertical) {
                clippedText.push({
                  text, width: Math.round(rect.width), height: Math.round(rect.height),
                  scrollWidth: probe.scrollWidth, scrollHeight: probe.scrollHeight
                });
              }
            }

            const styleTarget = descendants.find(function(el) {
              return el instanceof HTMLElement && Number.parseFloat(getComputedStyle(el).fontSize || '0') > 0;
            });
            if (styleTarget instanceof HTMLElement) {
              const px = Number.parseFloat(getComputedStyle(styleTarget).fontSize || '0');
              if (Number.isFinite(px) && px > 0) {
                minBaseFontPx = Math.min(minBaseFontPx, px);
                if (px < 9.5) tinyTextCount += 1;
              }
            }

            // Edge-label groups normally contain path primitives. Exclude them from
            // node-text collision checks so a label sitting on its own edge is not a false positive.
            let group = fo.parentElement;
            while (group && group !== svg && group.tagName.toLowerCase() !== 'g') group = group.parentElement;
            const isEdgeLabel = !!(group && group.querySelector(':scope > path[fill="none"], :scope > polyline'));
            if (!isEdgeLabel) textRects.push({ rect, text });
          });

          // Detect text-on-text overlaps. Tiny edge-touching (<12% of smaller area) is ignored.
          for (let i = 0; i < textRects.length; i++) {
            for (let j = i + 1; j < textRects.length; j++) {
              const a = textRects[i], b = textRects[j];
              const left = Math.max(a.rect.left, b.rect.left), top = Math.max(a.rect.top, b.rect.top);
              const right = Math.min(a.rect.right, b.rect.right), bottom = Math.min(a.rect.bottom, b.rect.bottom);
              const area = Math.max(0, right - left) * Math.max(0, bottom - top);
              if (!area) continue;
              const denom = Math.max(1, Math.min(a.rect.width * a.rect.height, b.rect.width * b.rect.height));
              const ratio = area / denom;
              if (ratio >= 0.12) textCollisions.push({ a: a.text, b: b.text, overlapRatio: ratio });
              if (textCollisions.length >= 20) break;
            }
            if (textCollisions.length >= 20) break;
          }

          // Detect connector paths that physically pass through node-label rectangles.
          // Ignore the first/last 8% of each path so legitimate connection endpoints at card borders do not fail.
          const edgePaths = Array.from(svg.querySelectorAll('path')).filter(function(path) {
            if (!(path instanceof SVGPathElement)) return false;
            const fill = String(path.getAttribute('fill') || '').toLowerCase();
            const stroke = String(path.getAttribute('stroke') || '').toLowerCase();
            if (fill && fill !== 'none' && fill !== 'transparent') return false;
            if (!stroke || stroke === 'none' || stroke === 'transparent') return false;
            try { return path.getTotalLength() >= 60; } catch { return false; }
          });

          const seenCrossings = new Set();
          edgePaths.forEach(function(path) {
            let length = 0;
            try { length = path.getTotalLength(); } catch { return; }
            const ctm = path.getScreenCTM();
            if (!ctm) return;
            const samples = Math.max(12, Math.min(48, Math.ceil(length / 28)));
            textRects.forEach(function(item) {
              const r = item.rect;
              // Leave a 4px safety moat inside the text box; touching the outside border is okay.
              const left = r.left + 4, right = r.right - 4, top = r.top + 3, bottom = r.bottom - 3;
              if (right <= left || bottom <= top) return;
              let hit = false;
              for (let s = 1; s < samples; s++) {
                const t = s / samples;
                if (t < .08 || t > .92) continue;
                const p = path.getPointAtLength(length * t);
                const pt = new DOMPoint(p.x, p.y).matrixTransform(ctm);
                if (pt.x >= left && pt.x <= right && pt.y >= top && pt.y <= bottom) { hit = true; break; }
              }
              if (hit) {
                const key = item.text + '|' + Math.round(length);
                if (!seenCrossings.has(key)) {
                  seenCrossings.add(key);
                  edgeTextCrossings.push({ text: item.text, pathLength: Math.round(length) });
                }
              }
            });
          });

          const svgRect = svg.getBoundingClientRect();
          return {
            blackOverlays,
            clippedText: clippedText.slice(0, 20),
            textCollisions: textCollisions.slice(0, 20),
            edgeTextCrossings: edgeTextCrossings.slice(0, 20),
            svgWidth: Math.round(svgRect.width),
            svgHeight: Math.round(svgRect.height),
            foreignObjects: foreignObjects.length,
            minBaseFontPx: Number.isFinite(minBaseFontPx) ? Math.round(minBaseFontPx * 10) / 10 : 0,
            tinyTextCount,
          };
        })()`)) as VisualInspection;

        const failedImages = [...failedImageRequests].filter(url => /cdn\.jsdelivr\.net|simpleicons\.org|googleapis\.com|gstatic\.com/i.test(url));
        const screenshot = path.join(outDir, `${target.label}-${viewport.name}.png`);
        await page.screenshot({ path: screenshot, fullPage: false });
        fs.writeFileSync(
          path.join(outDir, `${target.label}-${viewport.name}.json`),
          JSON.stringify({ ...inspection, failedImageRequests: failedImages }, null, 2),
        );

        const localFailures: string[] = [];
        if (inspection.blackOverlays.length) localFailures.push(`oversized dark overlay=${inspection.blackOverlays.length}`);
        if (inspection.svgWidth < 300 || inspection.svgHeight < 180) localFailures.push(`SVG unexpectedly small ${inspection.svgWidth}x${inspection.svgHeight}`);
        if (inspection.clippedText.length) localFailures.push(`clipped text=${inspection.clippedText.length}`);
        if (inspection.textCollisions.length) localFailures.push(`text collisions=${inspection.textCollisions.length}`);
        if (inspection.edgeTextCrossings.length) localFailures.push(`edge/text crossings=${inspection.edgeTextCrossings.length}`);
        if (inspection.tinyTextCount) localFailures.push(`base text below 9.5px=${inspection.tinyTextCount}`);
        if (failedImages.length) localFailures.push(`failed product/vendor images=${failedImages.length}`);

        rows.push({
          blueprint: target.number,
          id: target.id,
          viewport: viewport.name,
          svg: `${inspection.svgWidth}x${inspection.svgHeight}`,
          blackOverlays: inspection.blackOverlays.length,
          clippedText: inspection.clippedText.length,
          textCollisions: inspection.textCollisions.length,
          edgeTextCrossings: inspection.edgeTextCrossings.length,
          minBaseFontPx: inspection.minBaseFontPx,
          tinyTextCount: inspection.tinyTextCount,
          failedImageRequests: failedImages,
          status: localFailures.length ? 'FAIL' : 'PASS',
        });

        if (localFailures.length) {
          failures.push(`#${target.number} ${target.id}/${viewport.name}: ${localFailures.join('; ')}`);
        }

        console.log(`${localFailures.length ? 'FAIL' : 'PASS'} #${target.number} ${target.id}/${viewport.name}: ${inspection.svgWidth}x${inspection.svgHeight}; clip=${inspection.clippedText.length}; collisions=${inspection.textCollisions.length}; edgeCross=${inspection.edgeTextCrossings.length}; images=${failedImages.length}`);
        await page.close();
      }
    }
  } finally {
    await browser.close();
  }

  const summary = {
    generatedAt: new Date().toISOString(),
    targets: TARGETS.length,
    viewports: VIEWPORTS.length,
    checks: rows.length,
    passes: rows.filter(row => row.status === 'PASS').length,
    failures: rows.filter(row => row.status === 'FAIL').length,
    rows,
  };
  fs.writeFileSync(path.join(outDir, 'summary.json'), JSON.stringify(summary, null, 2));

  const markdown = [
    '# PromptCanvas all-50 rendered visual QA',
    '',
    `Checks: ${summary.checks} (${TARGETS.length} blueprints × ${VIEWPORTS.length} viewports)`,
    `Pass: ${summary.passes}  |  Fail: ${summary.failures}`,
    '',
    '| # | Blueprint | Viewport | Status | Clip | Text overlap | Edge/text | Min font | Image failures |',
    '|---:|---|---|---|---:|---:|---:|---:|---:|',
    ...rows.map(row => `| ${row.blueprint} | ${row.id} | ${row.viewport} | ${row.status} | ${row.clippedText} | ${row.textCollisions} | ${row.edgeTextCrossings} | ${row.minBaseFontPx} | ${row.failedImageRequests.length} |`),
  ].join('\n');
  fs.writeFileSync(path.join(outDir, 'summary.md'), markdown);

  if (failures.length) {
    console.error(`\nRendered visual QA FAILED with ${failures.length} viewport-level blocker(s):`);
    failures.slice(0, 80).forEach(f => console.error(` - ${f}`));
    if (failures.length > 80) console.error(` - … ${failures.length - 80} more (see artifacts/visual-qa/summary.json)`);
    process.exit(1);
  }

  console.log(`\nRendered visual QA PASSED: all ${TARGETS.length} blueprints across desktop and compact viewports.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
