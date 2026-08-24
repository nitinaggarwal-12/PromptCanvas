import puppeteer from "puppeteer";
import * as http from "http";
import * as fs from "fs";
import * as path from "path";
import { createCanvas, loadImage } from "canvas";
import { CANONICAL_TEMPLATES } from "../src/lib/canonical/canonicalTemplates";

async function renderSingle(idInput: string) {
  const targetId = idInput.replace(/^0+/, "");
  const template = CANONICAL_TEMPLATES.find(t => t.id === targetId || t.id === idInput);
  if (!template) {
    console.error(`Template ${idInput} not found`);
    process.exit(1);
  }

  const id = template.id.padStart(2, "0");
  const outDir = path.resolve(process.cwd(), "scratch/screenshots_canonical_gallery");
  const renderedDir = path.resolve(outDir, "rendered");
  const compDir = path.resolve(outDir, "comparisons");
  fs.mkdirSync(outDir, { recursive: true });
  fs.mkdirSync(renderedDir, { recursive: true });
  fs.mkdirSync(compDir, { recursive: true });

  const refPath = path.resolve(process.cwd(), `images/${id}.png`);
  const renderedPath = path.resolve(renderedDir, `${id}_rendered.png`);
  const compPath = path.resolve(compDir, `comparison_${id}.png`);

  const xml = template.generateXml("default", "light");
  let width = 1536, height = 1024;
  const dxMatch = xml.match(/pageWidth="(\d+)"/);
  const dyMatch = xml.match(/pageHeight="(\d+)"/);
  if (dxMatch && dyMatch) {
    width = parseInt(dxMatch[1], 10);
    height = parseInt(dyMatch[1], 10);
  }

  let currentHtml = "";
  const server = http.createServer((req, res) => {
    if (req.url === "/viewer-static.min.js") {
      const p = path.resolve(process.cwd(), "public/viewer-static.min.js");
      if (fs.existsSync(p)) {
        res.writeHead(200, { "Content-Type": "application/javascript" });
        res.end(fs.readFileSync(p));
        return;
      }
    }
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(currentHtml);
  });
  await new Promise<void>(resolve => server.listen(3099, resolve));

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-web-security"]
  });

  const page = await browser.newPage();
  const cfg = {
    xml: xml.trim(),
    lightbox: false,
    nav: false,
    resize: true,
    toolbar: "zoom",
    edit: "_blank",
    border: 0,
    transparent: false,
    fit: true,
    "max-scale": 2.0
  };

  currentHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>html,body{margin:0;padding:0;width:100%;height:100%;background:#FFF;overflow:hidden;display:flex;align-items:center;justify-content:center;}.mxgraph{width:100%;height:100%;display:flex;align-items:center;justify-content:center;}.mxgraph>svg{width:100%!important;height:auto!important;margin:0 auto;}</style></head><body><div class="mxgraph" id="diagram-container"></div><script src="/viewer-static.min.js"></script><script>const cfg=${JSON.stringify(cfg)};const cont=document.getElementById("diagram-container");cont.setAttribute("data-mxgraph",JSON.stringify(cfg));if(window.GraphViewer&&window.GraphViewer.processElements){window.GraphViewer.processElements();}</script></body></html>`;

  await page.setViewport({ width, height, deviceScaleFactor: 2 });
  await page.goto("http://localhost:3099", { waitUntil: "networkidle0", timeout: 20000 });
  await new Promise(r => setTimeout(r, 1500));

  const svgElem = (await page.$(".mxgraph > svg")) || (await page.$("#diagram-container"));
  if (svgElem) {
    await svgElem.screenshot({ path: renderedPath });
  }

  if (fs.existsSync(refPath)) {
    const imgRef = await loadImage(refPath);
    const imgGen = await loadImage(renderedPath);

    const bannerH = 60;
    const totalW = width * 2 + 30;
    const totalH = height + bannerH + 20;

    const canvas = createCanvas(totalW, totalH);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#0B0F19"; ctx.fillRect(0, 0, totalW, totalH);
    ctx.fillStyle = "#0F172A"; ctx.fillRect(0, 0, totalW, bannerH);
    ctx.strokeStyle = "#1E293B"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, bannerH); ctx.lineTo(totalW, bannerH); ctx.stroke();

    ctx.font = "bold 15px sans-serif"; ctx.fillStyle = "#38BDF8";
    ctx.fillText(`Template ${id}: ${template.name} — 1:1 Ground-Truth Visual Parity Audit`, 20, 26);
    ctx.font = "12px sans-serif"; ctx.fillStyle = "#F87171";
    ctx.fillText(`🔴 GROUND-TRUTH REFERENCE: images/${id}.png`, 20, 48);
    ctx.fillStyle = "#4ADE80";
    ctx.fillText(`⚡ GENERATED CANONICAL BLUEPRINT: Template ${id}`, width + 20, 48);

    ctx.drawImage(imgRef, 10, bannerH + 10, width, height);
    ctx.strokeStyle = "#334155"; ctx.lineWidth = 2;
    ctx.strokeRect(10, bannerH + 10, width, height);

    ctx.drawImage(imgGen, width + 20, bannerH + 10, width, height);
    ctx.strokeRect(width + 20, bannerH + 10, width, height);

    fs.writeFileSync(compPath, canvas.toBuffer("image/png"));
    console.log(`✅ Saved comparison: comparison_${id}.png`);
  }

  await browser.close();
  server.close();
}

const arg = process.argv[2] || "38";
renderSingle(arg);
