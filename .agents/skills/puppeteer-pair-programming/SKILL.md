---
name: puppeteer-pair-programming
description: Comprehensive architecture, cheatsheet, and patterns for building robust end-to-end (E2E) Puppeteer automation suites that run asynchronously in the background during pair programming with interactive setup modes, clean profile management, DOM verification, and screenshot review galleries.
---

# Puppeteer Pair Programming & Autonomous E2E Testing Suite

This skill provides the architectural foundation and reusable patterns for writing Puppeteer test suites designed specifically for **autonomous pair programming** where the agent runs background verification tasks, asserts live DOM states, and captures review screenshots after every code change across all projects.

## 1. Headless Background Chrome Setup & Profile Management

When running E2E scripts during pair programming, always launch Chrome in **headless background mode (`headless: 'new'`)** using the installed Google Chrome binary.

```javascript
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

async function launchPairProgrammingBrowser(customProfileDir = '.gemini/chrome_profile_e2e') {
  const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const userDataDir = path.join(process.env.HOME || '/Users/nitinagga', customProfileDir);
  
  // Clean profile lock to avoid SingletonLock issues
  const lockFile = path.join(userDataDir, 'SingletonLock');
  if (fs.existsSync(lockFile)) {
    try { fs.unlinkSync(lockFile); } catch (e) {}
  }

  return await puppeteer.launch({
    executablePath: fs.existsSync(chromePath) ? chromePath : undefined,
    headless: 'new',
    defaultViewport: { width: 1440, height: 900 },
    userDataDir: userDataDir,
    args: [
      '--headless=new',
      '--window-size=1440,900',
      '--no-default-browser-check',
      '--no-first-run',
      '--disable-blink-features=AutomationControlled'
    ]
  });
}
```

## 2. Mandatory Screenshot Capture & Storage Protocol

Always store visual artifacts in a dedicated task folder within the project workspace, purging old files first:

```javascript
const screenshotDir = path.join(process.cwd(), 'scratch', `screenshots_${taskId}`);
if (fs.existsSync(screenshotDir)) {
  fs.rmSync(screenshotDir, { recursive: true, force: true });
}
fs.mkdirSync(screenshotDir, { recursive: true });

// Capture state
await page.screenshot({ path: path.join(screenshotDir, '01_initial_load.png'), fullPage: false });
```

## 3. Mandatory 800ms Settling Delays for Animations & React State

Always inject an 800ms delay after UI actions to allow React state updates and CSS transitions to settle:

```javascript
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

await page.click('button[type="submit"]');
await sleep(800);
await page.screenshot({ path: path.join(screenshotDir, '02_after_submit.png') });
```

## 4. Framework-Safe DOM Verification & Interaction

```javascript
// Direct DOM Click (avoids overlay interception)
await page.$eval(selector, el => el.click());

// Verify DOM String Literal
const exists = await page.evaluate((text) => {
  return document.body.innerText.includes(text);
}, 'Expected Text Literal');
```

## 5. Visual Review Delivery

Present captured screenshots as clickable `file://` Markdown links in the response:
- `[01_before_baseline.png](file:///path/to/scratch/screenshots_<task_id>/01_before_baseline.png)`
- `[02_after_modified.png](file:///path/to/scratch/screenshots_<task_id>/02_after_modified.png)`

## 6. Strict 3-Step Execution Sequence

1. **Step 1: Local Development & Validation**:
   - Make all changes locally on the codebase.
   - Run typecheck (`npx tsc --noEmit`) and verify on local dev server (`http://localhost:3000`).
2. **Step 2: Mandatory Before & After Visual Review**:
   - Capture `01_before_baseline.png` (or baseline reference) and `02_after_modified.png`.
   - Present both screenshots as clickable Markdown `file://` links to the user for visual confirmation.
3. **Step 3: Deferred Git Commit & Deployment**:
   - Only execute `git commit` and `git push origin main` AFTER local validation and screenshot presentation.
   - Trigger the 1-minute Railway deployment monitoring loop post-push.

---

## 7. Autonomous Closed-Loop Self-Healing Protocol

Never treat E2E testing as a single-pass check. Autonomous test execution must follow this loop until **zero defects remain**:

```javascript
let loopIteration = 0;
const MAX_LOOPS = 5;
let allPassed = false;

while (!allPassed && loopIteration < MAX_LOOPS) {
  loopIteration++;
  console.log(`🔁 [Loop ${loopIteration}] Running E2E verification harness...`);

  const results = await runE2eTestSuite(page);

  if (results.failures.length === 0) {
    console.log(`✅ [Loop ${loopIteration}] All criteria passed with 0 defects.`);
    allPassed = true;
    break;
  }

  console.warn(`⚠️ [Loop ${loopIteration}] Detected ${results.failures.length} issues:`, results.failures);
  
  // 1. Capture diagnostic screenshot & DOM state
  await page.screenshot({ path: path.join(screenshotDir, `err_loop_${loopIteration}.png`) });

  // 2. Perform autonomous surgical self-correction in codebase
  await applyAutonomousFixes(results.failures);

  // 3. Settling delay & re-run loop
  await sleep(1000);
}

if (!allPassed) {
  throw new Error(`❌ Closed-loop E2E failed to converge after ${MAX_LOOPS} iterations.`);
}
```

---

## 8. Zero-Metadata Ground-Truth Data Assertion Matrix

**Inviolable Law**: Never assume functionality from metadata (HTTP 200, exit code 0, `svg.length > 0`, `certified: true`). Always validate **actual data** directly in the DOM and render trees:

```javascript
// ❌ WRONG: Superficial Metadata Checks
expect(res.status).toBe(200);
expect(svgHtml.length).toBeGreaterThan(0);

// ✅ CORRECT: Deep Actual Data & Geometric Assertions
const audit = await page.evaluate(() => {
  const svg = document.querySelector('svg');
  if (!svg) return { ok: false, error: 'Missing SVG root' };

  const textNodes = Array.from(svg.querySelectorAll('text, foreignObject')).map(el => el.textContent.trim());
  const hasExpectedTitle = textNodes.some(t => t.includes('Conceptual Architecture: Holistic SAP Multi-Agent AI'));
  const hasUserPersona = textNodes.some(t => t.includes('End User'));
  const hasS4Hana = textNodes.some(t => t.includes('SAP S/4HANA (NW Gateway)'));

  // Calculate actual AABB bounding box collisions in DOM
  const rects = Array.from(svg.querySelectorAll('rect')).map(r => r.getBoundingClientRect());
  let collisionCount = 0;
  for (let i = 0; i < rects.length; i++) {
    for (let j = i + 1; j < rects.length; j++) {
      const r1 = rects[i];
      const r2 = rects[j];
      const collides = !(r2.left >= r1.right || r2.right <= r1.left || r2.top >= r1.bottom || r2.bottom <= r1.top);
      if (collides && Math.abs(r1.width - r2.width) > 5) collisionCount++;
    }
  }

  return {
    ok: hasExpectedTitle && hasUserPersona && hasS4Hana && collisionCount === 0,
    hasExpectedTitle,
    hasUserPersona,
    hasS4Hana,
    collisionCount,
    textSample: textNodes.slice(0, 10),
  };
});

if (!audit.ok) {
  throw new Error(`Actual DOM validation failed: ${JSON.stringify(audit)}`);
}
```

---

## 9. 360° Blindspot Coverage Checklist

Before declaring any feature complete, verify that the harness probed all four blindspot categories:

1. **Boundary & Edge States**:
   - Empty input states, maximum-length label wraps, unicode characters, and unescaped XML entities (`&`, `<`, `>`).
2. **Multi-Viewport & Responsive Matrix**:
   - Verify layout stability at Mobile (`390x844`), Tablet (`834x1194`), and Ultra-Wide Desktop (`1600x1000` / `1840x1040`).
3. **Dynamic State Transitions & Theme Switching**:
   - Assert contrast and DOM element visibility after switching between Dark (`#0F172A`) and Light (`#FFFFFF`) themes.
4. **Embedded Viewport Mutation**:
   - Ensure dynamic state changes actually mutated the inner iframe/canvas DOM rather than serving stale, cached element references.
