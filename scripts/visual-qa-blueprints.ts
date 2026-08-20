import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer';
import { getDefaultXmlForArchitecture } from '../src/lib/architectureTypesCertified';
import { CATALOG_CANONICAL_IDS } from '../src/lib/blueprintExactResolver';

const TARGETS = CATALOG_CANONICAL_IDS.map((id, index) => ({ id, number: index + 1, label: `${String(index + 1).padStart(2, '0')}-${id.replace(/[^a-z0-9]+/gi, '-')}` }));
const VIEWPORTS = [{ name: 'desktop', width: 1600, height: 1000 }, { name: 'compact', width: 1180, height: 920 }] as const;
const outDir = path.resolve('artifacts/visual-qa');
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

/** The catalog contains a few multi-page mxfiles. The viewer expects one graph model,
 * so extract the FIRST complete model rather than spanning from the first opening tag
 * to the last closing tag across multiple pages. */
function cleanGraphXml(xml: string): string {
  return xml.match(/<mxGraphModel\b[\s\S]*?<\/mxGraphModel>/i)?.[0] || xml;
}

async function main() {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'] });
  const blockers: string[] = [];
  const advisories: string[] = [];
  const rows: any[] = [];
  try {
    for (const target of TARGETS) {
      const xml = getDefaultXmlForArchitecture(target.id);
      if (!xml) { blockers.push(`#${target.number} ${target.id}: resolver returned no XML`); continue; }
      for (const viewport of VIEWPORTS) {
        const page = await browser.newPage();
        const failedImages = new Set<string>();
        await page.setViewport({ width: viewport.width, height: viewport.height, deviceScaleFactor: 1 });
        page.on('requestfailed', req => { if (req.resourceType() === 'image') failedImages.add(req.url()); });
        const config = { xml: cleanGraphXml(xml), lightbox: true, nav: true, resize: true, toolbar: 'zoom layers tags', border: 0, transparent: true, fit: true, 'max-scale': 4 };
        await page.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;width:100%;height:100%;overflow:hidden;background:#fff}#frame{position:absolute;inset:0;padding:4px;box-sizing:border-box;overflow:auto;background:#fff}.mxgraph{width:100%;min-height:100%;display:flex;align-items:flex-start;justify-content:center}.mxgraph>svg,.mxgraph>div>svg{width:100%!important;max-width:100%!important;height:auto!important;margin:0 auto!important;display:block!important}.mxgraph>div{max-width:100%}.geEditor{background-color:transparent!important}</style></head><body><div id="frame"><div id="diagram" class="mxgraph"></div></div></body></html>`, { waitUntil: 'domcontentloaded' });
        await page.evaluate(serialized => document.getElementById('diagram')?.setAttribute('data-mxgraph', serialized), JSON.stringify(config));
        await page.addScriptTag({ path: path.resolve('public/viewer-static.min.js') });
        try {
          await page.waitForSelector('#diagram svg', { timeout: 15000 });
          await new Promise(resolve => setTimeout(resolve, 900));
        } catch {
          blockers.push(`#${target.number} ${target.id}/${viewport.name}: Draw.io produced no SVG`);
          await page.screenshot({ path: path.join(outDir, `${target.label}-${viewport.name}-no-svg.png`) });
          rows.push({ blueprint: target.number, id: target.id, viewport: viewport.name, status: 'BLOCKED_NO_SVG' });
          await page.close(); continue;
        }

        const inspection = await page.evaluate(`(() => {
          const root=document.getElementById('diagram'), svg=root&&root.querySelector('svg');
          if(!root||!svg)return {svgWidth:0,svgHeight:0,blackOverlays:[],severeClip:[],tinyText:0};
          const rr=root.getBoundingClientRect(), rootArea=Math.max(1,rr.width*Math.max(rr.height,1)), blackOverlays=[];
          const nearBlack=v=>{const s=String(v||'').replace(/\\s+/g,'').toLowerCase();if(['#000','#000000','black','rgb(0,0,0)','rgba(0,0,0,1)'].includes(s))return true;const m=s.match(/^rgba?\\((\\d+),(\\d+),(\\d+)(?:,([\\d.]+))?\\)$/);return !!m&&Number(m[1])<=24&&Number(m[2])<=24&&Number(m[3])<=24&&(m[4]==null||Number(m[4])>=.9)};
          svg.querySelectorAll('rect,path,polygon').forEach(node=>{if(!(node instanceof SVGGraphicsElement))return;const r=node.getBoundingClientRect(),ratio=(r.width*r.height)/rootArea;if(nearBlack(getComputedStyle(node).fill)&&ratio>=.12)blackOverlays.push({tag:node.tagName,ratio});});
          const severeClip=[];let tinyText=0;
          svg.querySelectorAll('foreignObject').forEach(fo=>{const text=String(fo.textContent||'').replace(/\\s+/g,' ').trim();if(!text)return;const fr=fo.getBoundingClientRect();if(fr.width<8||fr.height<8)return;const range=document.createRange();range.selectNodeContents(fo);const cr=range.getBoundingClientRect();const overflow=Math.max(0,fr.left-cr.left,cr.right-fr.right,fr.top-cr.top,cr.bottom-fr.bottom);if(overflow>7)severeClip.push({text:text.slice(0,100),overflow:Math.round(overflow),box:[Math.round(fr.width),Math.round(fr.height)]});const els=Array.from(fo.querySelectorAll('*')).filter(e=>e instanceof HTMLElement&&String(e.textContent||'').trim());for(const el of els){const px=parseFloat(getComputedStyle(el).fontSize||'0');if(px>0&&px<9.5){tinyText++;break;}}});
          const sr=svg.getBoundingClientRect();return {svgWidth:Math.round(sr.width),svgHeight:Math.round(sr.height),blackOverlays,severeClip:severeClip.slice(0,20),tinyText};
        })()`);
        const imageFailures=[...failedImages].filter(url=>/cdn\.jsdelivr\.net|simpleicons\.org|gstatic\.com|googleapis\.com|iconify\.design/i.test(url));
        await page.screenshot({ path: path.join(outDir, `${target.label}-${viewport.name}.png`) });
        fs.writeFileSync(path.join(outDir, `${target.label}-${viewport.name}.json`), JSON.stringify({ ...inspection, imageFailures }, null, 2));
        const localBlockers:string[]=[];
        if(inspection.blackOverlays.length)localBlockers.push(`oversized dark overlay=${inspection.blackOverlays.length}`);
        if(inspection.svgWidth<300||inspection.svgHeight<180)localBlockers.push(`unexpected SVG ${inspection.svgWidth}x${inspection.svgHeight}`);
        if(localBlockers.length)blockers.push(`#${target.number} ${target.id}/${viewport.name}: ${localBlockers.join('; ')}`);
        if(inspection.severeClip.length)advisories.push(`#${target.number} ${target.id}/${viewport.name}: possible severe text clipping=${inspection.severeClip.length}`);
        if(inspection.tinyText)advisories.push(`#${target.number} ${target.id}/${viewport.name}: rendered text below 9.5px=${inspection.tinyText}`);
        if(imageFailures.length)advisories.push(`#${target.number} ${target.id}/${viewport.name}: external icon requests failed=${imageFailures.length}`);
        rows.push({ blueprint:target.number,id:target.id,viewport:viewport.name,status:localBlockers.length?'FAIL':'PASS',svg:`${inspection.svgWidth}x${inspection.svgHeight}`,blackOverlays:inspection.blackOverlays.length,severeClip:inspection.severeClip.length,tinyText:inspection.tinyText,imageFailures:imageFailures.length });
        console.log(`${localBlockers.length?'FAIL':'PASS'} #${target.number} ${target.id}/${viewport.name} ${inspection.svgWidth}x${inspection.svgHeight} overlay=${inspection.blackOverlays.length} clip?=${inspection.severeClip.length} iconFail=${imageFailures.length}`);
        await page.close();
      }
    }
  } finally { await browser.close(); }
  const summary={generatedAt:new Date().toISOString(),checks:rows.length,blockers,advisories,rows};
  fs.writeFileSync(path.join(outDir,'summary.json'),JSON.stringify(summary,null,2));
  fs.writeFileSync(path.join(outDir,'summary.md'),['# PromptCanvas all-50 rendered QA','',`Hard blockers: ${blockers.length}`,`Advisories: ${advisories.length}`,'','| # | Blueprint | Viewport | Status | SVG | Dark overlay | Clip advisory | Tiny text | Icon failures |','|---:|---|---|---|---|---:|---:|---:|---:|',...rows.map(r=>`| ${r.blueprint} | ${r.id} | ${r.viewport} | ${r.status} | ${r.svg||'-'} | ${r.blackOverlays||0} | ${r.severeClip||0} | ${r.tinyText||0} | ${r.imageFailures||0} |`)].join('\n'));
  if(blockers.length){console.error(`\nRendered visual QA BLOCKED by ${blockers.length} hard failure(s).`);blockers.forEach(x=>console.error(` - ${x}`));process.exit(1);}
  console.log(`\nRendered visual QA hard gate PASSED for all ${TARGETS.length} blueprints at both viewports.`);
  if(advisories.length)console.log(`${advisories.length} advisory signal(s) require screenshot review; see artifact summary.`);
}
main().catch(error=>{console.error(error);process.exit(1);});
