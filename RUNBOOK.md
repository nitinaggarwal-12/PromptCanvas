# PromptCanvas — Operational Runbook & Engineering Handbook

Welcome to the **PromptCanvas** Operational Runbook. This document provides developers and autonomous agents with exact execution recipes, testing workflows, visual verification protocols, troubleshooting guides, and deployment procedures.

---

## 1. Environment Prerequisites

- **Node.js**: `>= 24.0.0` (Enforced in `package.json`).
- **Installed Google Chrome**: `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome` (Required for headless Puppeteer visual regression testing on macOS).
- **Default Development Port**: `3000` (`http://localhost:3000`).

---

## 2. Canonical Development Commands

```bash
# 1. Start Local Development Server (Port 3000)
npm run dev

# 2. Run TypeScript Typecheck (Zero Emit)
npx tsc --noEmit

# 3. Run Linting Suite
npm run lint

# 4. Run Vitest Unit Tests
npm test

# 5. Run Blueprint Catalog Quality & Geometry Validation
npm run validate:blueprints
npm run validate:canvas

# 6. Run Headless Chrome Real-Browser Journey
npx tsx scripts/e2e_real_browser_journey.ts

# 7. Production Next.js Build (with 4GB Node heap allocation)
npm run build
```

---

## 3. Autonomous E2E Visual Verification Protocol

To ensure pixel-perfect rendering and prevent brittle agent automation, all UI tests and diagram rendering scripts MUST adhere to this three-rule protocol:

### Rule 1: Mandatory 800ms Settling Delays
Never capture a screenshot or inspect a DOM element immediately after clicking a tab, drawer, or dropdown. Always inject a minimum 800ms synchronization delay to allow React state updates, CSS transitions, and SVG re-flows to settle:
```typescript
await new Promise((resolve) => setTimeout(resolve, 800));
```

### Rule 2: Deterministic Chrome Executable Path
Never rely on default `Google Chrome for Testing` downloads, which trigger macOS Santa security policy blocks. Explicitly launch the signed system Google Chrome:
```typescript
const browser = await puppeteer.launch({
  headless: true,
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});
```

### Rule 3: Clean Screenshot Storage & Direct DOM Assertion
1. **Dedicated Task Directory**: Always store visual artifacts in a dedicated new subfolder:
   `<project_root>/scratch/screenshots_<task_id>/`
2. **Purge Stale Artifacts**: Programmatically purge the target directory before test execution:
   `rm -rf scratch/screenshots_<task_id>/`
3. **Direct DOM Verification**: Never rely solely on CLI exit codes. Physically verify that child elements mutated in the live browser DOM (e.g. `svg.childNodes.length > 0` or specific text strings present in DOM):
   ```typescript
   const svgExists = await page.evaluate(() => {
     const svg = document.querySelector('svg');
     return !!svg && svg.childNodes.length > 0;
   });
   ```
4. **Visual Review Delivery**: Present captured screenshots to the user using clickable `file://` Markdown links.

### Rule 4: Iterative Closed-Loop Convergence (Loop Until Zero Defects)
E2E testing must execute in an automated self-correcting loop until all issues are resolved:
```typescript
// Loop repeatedly until 100% of assertions pass with zero failures
let loop = 0;
const MAX_LOOPS = 5;
while (loop < MAX_LOOPS) {
  loop++;
  const result = await runE2EHarness(page);
  if (result.passed && result.defectCount === 0) break;
  await autoPatchDefects(result.defects);
  await sleep(1000);
}
```

### Rule 5: Zero-Assumption Actual Data Validation (Metadata Is Not Reality)
- Never assume success from HTTP `200 OK`, CLI exit code `0`, `svg.length > 0`, or metadata flags (`certified: true`).
- Physically validate actual data payloads:
  - Exact text string literals and typography nodes in DOM.
  - Mathematical 2D bounding boxes and zero AABB geometric intersections.
  - Rendered raster pixel data compared against ground-truth master image baselines.

### Rule 6: 360° Blindspot Coverage
Every test suite must probe all blindspots:
1. *Boundary States*: Empty payloads, max-width string wraps, unescaped XML/HTML entities (`&`, `<`, `>`).
2. *Responsive & Aspect Ratios*: Breakpoint tests at Mobile (390px), Tablet (834px), Desktop (1440px), and Ultra-Wide (1600px+), plus aspect ratio morphing (`16:9`, `9:16`, `1:1`, `21:9`).
3. *State Transitions & Theme Shifts*: Full dark/light theme switching with 800ms settled transitions.
4. *Embedded Viewport Mutation*: Physically asserting child element attribute mutation inside iframe/canvas viewports.

---

## 4. Local-First Development & Deferred Git Commit Law

All development follows a strict 3-step sequence:

```text
┌────────────────────────────────────────┐
│  Step 1: Local Implementation          │
│  • Modify workspace files              │
│  • Compile cleanly (npx tsc --noEmit)  │
└──────────────────┬─────────────────────┘
                   │
                   ▼
┌────────────────────────────────────────┐
│  Step 2: Visual Review & Diffs         │
│  • Headless Puppeteer E2E run          │
│  • Inspect Before & After screenshots  │
│  • Present clickable file:// links     │
└──────────────────┬─────────────────────┘
                   │
                   ▼
┌────────────────────────────────────────┐
│  Step 3: Deferred Git Commit & Push    │
│  • git commit -m "feat/fix: ..."       │
│  • Immediately execute:                │
│    git push origin main                │
│  • 1-minute Railway deployment loop    │
└────────────────────────────────────────┘
```

---

## 5. Post-Push Railway Deployment Monitoring

Whenever code is pushed to `origin/main`, execute an automated background monitoring loop:
1. **Bypass Local Railway CLI**: Avoid running the raw `railway` binary locally on macOS.
2. **1-Minute Polling Cadence**: Poll the live endpoint at 1-minute intervals:
   ```bash
   curl -sI https://promptcanvas.up.railway.app
   ```
3. **Independent String Verification**: Perform an HTTP request (`curl -s https://promptcanvas.up.railway.app`) searching the delivered HTML/JS asset for a **unique string literal** present only in the new commit to confirm CDN cache invalidation before reporting completion.

---

## 6. Operational Troubleshooting & FAQs

### Q1: Port 3000 is already in use (`EADDRINUSE`)
Find and terminate the stale Node.js dev server process:
```bash
lsof -ti :3000 | xargs kill -9
```

### Q2: Santa Security Policy blocks binary execution on macOS
Ensure all test scripts point to `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`. For Railway CLI operations, execute via **Cloudtop** (`rw nitinagga.c.googlers.com`) or live REST APIs.

### Q3: Next.js build runs out of memory (`JavaScript heap out of memory`)
The build script in `package.json` automatically sets `NODE_OPTIONS=--max-old-space-size=4096`. Ensure this flag is included if executing raw `next build`.

### Q4: SQLite database is locked (`dev.db`)
Verify that long-running test scripts properly close database statements or connection handles in `try / finally` blocks.
