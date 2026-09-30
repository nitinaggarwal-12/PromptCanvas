---
name: load-and-stress-testing
description: High-throughput concurrent user load and stress testing using autocannon or native node concurrency runners to evaluate API rate-limiting, database lock contention, and Gemini AI queue limits under heavy traffic.
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

1. Run `runConcurrentLoadTest()` on key endpoints (`/api/diagrams`, `/workspace?tab=audit`) before major release deployments.
2. Verify `requestsPerSec > 50` and `errorCount === 0`.
3. Save test reports to `scratch/load_test_reports/`.
