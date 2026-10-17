---
name: load-and-stress-testing
description: >-
  Executes concurrent HTTP load, p99 latency, and rate-limit stress tests against local and Cloud Run endpoints.
---

# Load & Stress Testing Skill

This skill provides high-throughput load and concurrent stress testing scripts to measure API latency, throughput (requests/sec), database connection contention, and rate limit responses under heavy multi-user loads.

## 1. Native High-Concurrency Load Tester (`scratch/run_load_test.js`)

```javascript
const http = require('http');
const https = require('https');

async function runConcurrentLoadTest({ url, connections = 20, totalRequests = 100 }) {
  console.log(`🚀 Launching Concurrent Load Test: ${connections} concurrent clients, ${totalRequests} total requests -> ${url}`);

  const isHttps = url.startsWith('https');
  const agent = isHttps ? https : http;

  let completed = 0;
  let successCount = 0;
  let errorCount = 0;
  const latencies = [];
  const startTime = Date.now();

  const makeRequest = () => {
    return new Promise((resolve) => {
      const reqStart = Date.now();
      const req = agent.get(url, (res) => {
        res.on('data', () => {});
        res.on('end', () => {
          const duration = Date.now() - reqStart;
          latencies.push(duration);
          if (res.statusCode >= 200 && res.statusCode < 400) {
            successCount++;
          } else {
            errorCount++;
          }
          completed++;
          resolve();
        });
      });

      req.on('error', (err) => {
        errorCount++;
        completed++;
        resolve();
      });

      req.end();
    });
  };

  const pool = Array.from({ length: totalRequests });
  const executeBatch = async () => {
    while (pool.length > 0) {
      const batch = pool.splice(0, connections).map(() => makeRequest());
      await Promise.all(batch);
    }
  };

  await executeBatch();

  const totalTimeMs = Date.now() - startTime;
  const avgLatencyMs = (latencies.reduce((a, b) => a + b, 0) / latencies.length).toFixed(2);
  const rps = ((completed / totalTimeMs) * 1000).toFixed(2);

  const report = {
    url,
    totalRequests: completed,
    successCount,
    errorCount,
    totalTimeSec: (totalTimeMs / 1000).toFixed(2),
    requestsPerSec: rps,
    avgLatencyMs,
    minLatencyMs: Math.min(...latencies),
    maxLatencyMs: Math.max(...latencies),
  };

  console.log('\n📊 LOAD TEST RESULTS SUMMARY:');
  console.table(report);
  return report;
}

module.exports = { runConcurrentLoadTest };
```

## 2. Load Testing Protocol

1. Run `runConcurrentLoadTest()` on key endpoints (`/api/diagrams`, `/audit`) before major release deployments.
2. Verify `requestsPerSec > 50` and `errorCount === 0`.
3. Save test reports to `scratch/load_test_reports/`.

---

## 🛡️ Strict Architectural & Cloud Run Deployment Constraints (All Current & New Projects)

You are configured to work on this repository with strict architectural and deployment constraints. Follow these instructions exactly:

1. **Planning & Immediate Same-Turn Execution (`Rule 28A`):** Formulate a concise 3 to 5 bullet execution plan and **immediately execute all file edits, backend syncs, and quality gates in the exact same turn**. NEVER output a plan or diagnostic gap list and stop to ask *"Shall I apply these fixes?"* or *"Would you like me to proceed?"*.
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
6. **Deployment Target (Rule 56 Mandatory Synchronous 2-Project Pipeline):**
* Never run `gcloud run deploy <service> --source . --project=ramp-portal-dev` (corporate IAM blocks `storage.buckets.create`).
* Always build in `nitina-ggarwal-sandbox-647724` and update the service in `ramp-portal-dev` (`us-west1`) synchronously:
```bash
gcloud builds submit --project=nitina-ggarwal-sandbox-647724 \
  --tag us-central1-docker.pkg.dev/nitina-ggarwal-sandbox-647724/cloud-run-source-deploy/<service>:<TAG> .
gcloud run services update <service> \
  --project=ramp-portal-dev \
  --region=us-west1 \
  --image=us-central1-docker.pkg.dev/nitina-ggarwal-sandbox-647724/cloud-run-source-deploy/<service>:<TAG>
```

