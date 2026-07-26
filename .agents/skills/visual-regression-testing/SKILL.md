---
name: visual-regression-testing
description: Automated pixel-by-pixel image comparison using pixelmatch and canvas to detect visual layout shifts, CSS regressions, and font rendering anomalies between baseline and current screenshots.
---

# Visual Regression Testing & Image Diffing Skill

This skill provides automated pixel-level image comparison workflows to ensure UI design integrity across code refactors and framework upgrades.

## 1. Directory Structure

Baseline images and diff results are stored in the project workspace:
- Baseline Screenshots: `scratch/screenshots_baseline/`
- Current Screenshots: `scratch/screenshots_current/`
- Diff Visual Artifacts: `scratch/screenshots_diff/`

## 2. Automated Image Diffing Script (`scratch/diff_screenshots.js`)

```javascript
const fs = require('fs');
const path = require('path');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');

function compareScreenshots(baselinePath, currentPath, diffOutputPath) {
  if (!fs.existsSync(baselinePath) || !fs.existsSync(currentPath)) {
    console.error('❌ Missing baseline or current screenshot for comparison.');
    return { mismatchedPixels: -1, diffPercentage: 100 };
  }

  const img1 = PNG.sync.read(fs.readFileSync(baselinePath));
  const img2 = PNG.sync.read(fs.readFileSync(currentPath));

  const { width, height } = img1;
  const diff = new PNG({ width, height });

  const numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, width, height, {
    threshold: 0.1,
    includeAA: false,
  });

  const totalPixels = width * height;
  const diffPercentage = ((numDiffPixels / totalPixels) * 100).toFixed(2);

  fs.mkdirSync(path.dirname(diffOutputPath), { recursive: true });
  fs.writeFileSync(diffOutputPath, PNG.sync.write(diff));

  console.log(`📊 Image Diff Results: ${numDiffPixels} mismatched pixels (${diffPercentage}% difference)`);
  console.log(`🖼️ Diff image saved to: file://${diffOutputPath}`);

  return { numDiffPixels, diffPercentage, diffOutputPath };
}

module.exports = { compareScreenshots };
```

## 3. Workflow Protocol

1. **Capture Baseline**: Run Puppeteer suite on `main` branch and save to `scratch/screenshots_baseline/`.
2. **Capture Current**: Run Puppeteer suite on feature branch and save to `scratch/screenshots_current/`.
3. **Compare & Report**: Execute `compareScreenshots()`. If `diffPercentage > 0.5%`, output a warning and present the diff file link `[01_diff.png](file:///path/to/scratch/screenshots_diff/01_diff.png)`.
