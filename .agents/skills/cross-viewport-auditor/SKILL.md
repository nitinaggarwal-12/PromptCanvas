---
name: cross-viewport-auditor
description: Multi-device and cross-browser viewport scaling tests across Mobile (390x844), Tablet (834x1194), and Ultra-Wide Desktop (1600x950) to ensure responsive layout balance.
---

# Cross-Viewport Responsive UI Auditor Skill

This skill provides multi-device viewport testing using Puppeteer to verify responsive breakpoints, navigation drawer collapse, search input wrapping, and canvas grid scaling across Mobile, Tablet, and Desktop screen sizes.

## 1. Standard Responsive Breakpoint Matrices

- **Mobile Viewport (iPhone 14/15 Pro)**: Width: 390px | Height: 844px
- **Tablet Viewport (iPad Pro 11")**: Width: 834px | Height: 1194px
- **Standard Desktop**: Width: 1280px | Height: 800px
- **Ultra-Wide Desktop**: Width: 1600px | Height: 950px

## 2. Multi-Viewport Automated Runner (`scratch/audit_responsive_viewports.js`)

```javascript
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const viewports = [
  { name: 'mobile_iphone', width: 390, height: 844 },
  { name: 'tablet_ipad', width: 834, height: 1194 },
  { name: 'desktop_wide', width: 1600, height: 950 },
];

async function auditResponsiveViewports(targetUrl, outputDir = 'scratch/screenshots_responsive') {
  console.log(`📱 Running Cross-Viewport Responsive UI Audit on: ${targetUrl}`);
  fs.mkdirSync(outputDir, { recursive: true });

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  for (const vp of viewports) {
    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 2000));

    const screenshotPath = path.join(outputDir, `${vp.name}.png`);
    await page.screenshot({ path: screenshotPath });
    console.log(`📸 Captured ${vp.name} (${vp.width}x${vp.height}): file://${screenshotPath}`);
    await page.close();
  }

  await browser.close();
  console.log('✅ Multi-Viewport Responsive Audit Complete!');
}

module.exports = { auditResponsiveViewports };
```

## 3. Workflow Protocol
Run `auditResponsiveViewports(url)` when creating new UI components or modifying responsive Tailwind breakpoints (`md:`, `lg:`).

---

## 🛡️ Strict Architectural & Cloud Run Deployment Constraints (All Current & New Projects)

You are configured to work on this repository with strict architectural and deployment constraints. Follow these instructions exactly:

1. **Planning First:** Before editing or generating code across multiple files, provide a concise 3 to 5 bullet execution plan. Do not touch any files until this plan is stated.
2. **Strict File Boundaries:**
* Only edit files directly required to complete the assigned task.
* Do not reformat, refactor, or delete unrelated files, functions, or utilities.
* Never edit or commit `.env` files, `.git` internals, or package lockfiles (`package-lock.json`, `poetry.lock`).
3. **No Hallucinations:** Use only verified, actively maintained libraries and standard APIs. Do not invent non-existent parameters, SDK methods, or placeholder mocks.
4. **Cloud Run Runtime Compliance:**
* Web services must listen on host `0.0.0.0`.
* Read the port dynamically from the `PORT` environment variable, defaulting to `8080` if not set. Never hardcode port numbers.
* Handle termination signals cleanly so existing connections finish before shutdown:
* In Node.js: `process.on('SIGTERM', ...)`
* In Python: `signal.signal(signal.SIGTERM, ...)`
5. **Quality and Test Gates:**
* Run local linting, type-checking, and unit tests immediately after modifying code.
* Fix all errors before presenting the task as complete.
6. **Deployment Target:**
* When running deployment commands, strictly target:
* Platform: Google Cloud Run
* Project ID: `ramp-portal-dev` (Project Number `248990048888`)
* Region: `us-west1`
* Canonical BeyondCorp URL: `https://promptcanvas-248990048888.cr.gclb.goog`
* Command pattern:
```bash
gcloud run deploy promptcanvas \
  --source . \
  --project ramp-portal-dev \
  --region us-west1 \
  --platform managed
```

