---
name: performance-and-telemetry
description: Comprehensive client-side Core Web Vitals (LCP, CLS, TTFB) metric profiling, DOM node budget tracking, Railway container telemetry streaming, and server error log monitoring.
---

# Performance & Production Telemetry Skill

This skill combines client-side rendering performance profiling (Core Web Vitals) with live server container telemetry monitoring.

## 1. Client Web Vitals Thresholds
- **LCP (Largest Contentful Paint)**: Good ≤ 2.5s | Needs Improvement ≤ 4.0s
- **CLS (Cumulative Layout Shift)**: Good ≤ 0.1 | Needs Improvement ≤ 0.25
- **TTFB (Time to First Byte)**: Good ≤ 800ms | Needs Improvement ≤ 1800ms

## 2. Telemetry & Performance Runner (`scratch/audit_performance_telemetry.js`)

```javascript
const puppeteer = require('puppeteer');
const https = require('https');

async function profilePerformanceAndTelemetry(url) {
  console.log(`🚀 Profiling Web Vitals & Telemetry for: ${url}`);

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  await page.evaluateOnNewDocument(() => {
    window.performanceMetrics = {};
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          window.performanceMetrics.LCP = entry.startTime;
        }
        if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
          window.performanceMetrics.CLS = (window.performanceMetrics.CLS || 0) + entry.value;
        }
      }
    }).observe({ type: 'largest-contentful-paint', buffered: true });
  });

  const startTime = Date.now();
  await page.goto(url, { waitUntil: 'networkidle2' });
  const ttfb = Date.now() - startTime;

  const metrics = await page.metrics();
  const cwv = await page.evaluate(() => window.performanceMetrics || {});

  const report = {
    url,
    TTFB_ms: ttfb,
    LCP_ms: cwv.LCP ? cwv.LCP.toFixed(2) : 'N/A',
    CLS: cwv.CLS ? cwv.CLS.toFixed(3) : 0,
    JSHeapUsedMB: (metrics.JSHeapUsedSize / 1024 / 1024).toFixed(2),
    DOMNodes: metrics.Nodes,
  };

  console.table(report);
  await browser.close();
  return report;
}

module.exports = { profilePerformanceAndTelemetry };
```

## 3. Production Verification Protocol
1. Execute `profilePerformanceAndTelemetry()` after new feature deployments.
2. Verify `LCP < 2500ms`, `CLS < 0.1`, and HTTP `200` responses.

## 4. Cloudtop Railway CLI & 1-Minute Deployment Monitoring Loop

### Santa Workstation Blocker Bypass
- **Prohibition**: Never execute raw `railway` CLI binary directly on macOS workstation (blocked by workstation Santa security policies).
- **Cloudtop Execution**: Always run `railway` commands inside a Cloudtop session (`rw nitinagga.c.googlers.com`) or fallback to Railway API & live HTTP polling.

### Automated 1-Minute Cadence Polling Script (`scratch/monitor_railway_deployment.ts`)

```typescript
import https from 'https';

async function checkLiveEndpoint(url: string, targetString?: string): Promise<{ isLive: boolean; hasString: boolean }> {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        resolve({
          isLive: res.statusCode === 200,
          hasString: targetString ? data.includes(targetString) : true,
        });
      });
    }).on('error', () => resolve({ isLive: false, hasString: false }));
  });
}

export async function pollRailwayDeployment(
  url = 'https://promptcanvas-248990048888.cr.gclb.goog',
  targetStringLiteral?: string,
  maxMinutes = 10,
  onProgress?: (minute: number, status: string) => void
) {
  for (let minute = 1; minute <= maxMinutes; minute++) {
    await new Promise(r => setTimeout(r, 60000)); // 1-minute delay
    const { isLive, hasString } = await checkLiveEndpoint(url, targetStringLiteral);

    if (isLive && hasString) {
      if (onProgress) onProgress(minute, `✅ Deployment LIVE and verified at ${url}`);
      return { success: true, minute };
    } else {
      if (onProgress) onProgress(minute, `⏱️ [Min ${minute}] Deployment in progress... (HTTP check pending cache invalidation)`);
    }
  }
  return { success: false, timeout: true };
}
```

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

