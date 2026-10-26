#!/usr/bin/env node
/**
 * Phase-0 Reference-Image Deterministic Pixel & Bounding-Box Decompiler (Rule 57-0)
 *
 * Eliminates "eyeballed" aspect ratios and coordinates when converting a user-uploaded
 * reference image into a 1:1 Draw.io canonical blueprint.
 *
 * Usage:
 *   node scripts/decompile_reference_image_grid.mjs <path-to-reference.png> [scaleFactor=1.5]
 */

import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer-core';

export function readPngDimensions(filePath) {
  const abs = path.resolve(filePath);
  if (!fs.existsSync(abs)) {
    throw new Error(`Reference image not found: ${abs}`);
  }
  const buf = fs.readFileSync(abs);
  if (buf.length < 24 || buf[0] !== 0x89 || buf[1] !== 0x50 || buf[2] !== 0x4e || buf[3] !== 0x47) {
    throw new Error(`File is not a valid PNG (missing IHDR signature): ${abs}`);
  }
  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);
  const aspectRatio = Number((width / height).toFixed(6));
  return { width, height, aspectRatio };
}

async function decompileReferenceImage(imagePath, scaleFactor = 1.5) {
  const { width: origW, height: origH, aspectRatio } = readPngDimensions(imagePath);
  const pageWidth = Math.round(origW * scaleFactor);
  const pageHeight = Math.round(origH * scaleFactor);

  const b64 = fs.readFileSync(path.resolve(imagePath)).toString('base64');
  const dataUri = `data:image/png;base64,${b64}`;

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    const scanResult = await page.evaluate(
      async ({ uri, targetW, targetH }) => {
        const img = new Image();
        img.src = uri;
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });

        const canvas = document.createElement('canvas');
        canvas.width = targetW;
        canvas.height = targetH;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, targetW, targetH);
        const { data } = ctx.getImageData(0, 0, targetW, targetH);

        const getRgb = (x, y) => {
          const idx = (Math.floor(y) * targetW + Math.floor(x)) * 4;
          return [data[idx], data[idx + 1], data[idx + 2]];
        };
        const isGraySwimlane = ([r, g, b]) =>
          r >= 232 && r <= 248 && g >= 234 && g <= 249 && b >= 236 && b <= 252 && !(r > 250 && g > 250 && b > 250);
        const isBlueBand = ([r, g, b]) => b - r >= 10 && b >= 235 && r >= 215;

        // 1. Scan mid-vertical slice (y = 0.35 * targetH) for vertical column swimlanes
        const midY = Math.round(targetH * 0.35);
        const verticalColumns = [];
        let inCol = false;
        let colStart = 0;
        for (let x = 0; x < targetW; x++) {
          const hit = isGraySwimlane(getRgb(x, midY));
          if (hit && !inCol) {
            inCol = true;
            colStart = x;
          } else if (!hit && inCol) {
            if (x - colStart >= 40) {
              verticalColumns.push({ x: colStart, width: x - colStart, xEnd: x });
            }
            inCol = false;
          }
        }

        // 2. Scan horizontal bands along center x
        const midX = Math.round(targetW * 0.5);
        const blueBands = [];
        let inBand = false;
        let bandStart = 0;
        for (let y = 0; y < targetH; y++) {
          const hit = isBlueBand(getRgb(midX, y));
          if (hit && !inBand) {
            inBand = true;
            bandStart = y;
          } else if (!hit && inBand) {
            if (y - bandStart >= 25) {
              blueBands.push({ y: bandStart, height: y - bandStart, yEnd: y });
            }
            inBand = false;
          }
        }

        return { verticalColumns, blueBands };
      },
      { uri: dataUri, targetW: pageWidth, targetH: pageHeight }
    );

    const output = {
      sourceImage: path.basename(imagePath),
      originalDimensions: { width: origW, height: origH, aspectRatio },
      drawioCanvas: {
        scaleFactor,
        pageWidth,
        pageHeight,
        aspectRatio: Number((pageWidth / pageHeight).toFixed(6)),
      },
      detectedVerticalColumns: scanResult.verticalColumns,
      detectedHorizontalBlueBands: scanResult.blueBands,
    };

    console.log(JSON.stringify(output, null, 2));
    return output;
  } finally {
    await browser.close();
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const imgArg = process.argv[2];
  const scaleArg = process.argv[3] ? Number(process.argv[3]) : 1.5;
  if (!imgArg) {
    console.error('Usage: node scripts/decompile_reference_image_grid.mjs <path-to-reference.png> [scaleFactor=1.5]');
    process.exit(1);
  }
  decompileReferenceImage(imgArg, scaleArg).catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
