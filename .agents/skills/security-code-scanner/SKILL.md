---
name: security-code-scanner
description: Static Application Security Testing (SAST) for XSS in custom SVG renderers, unhandled API route inputs, environment secret leak checks, and npm audit dependency CVE scanning.
---

# Security Code Scanner & Vulnerability Guard Skill

This skill performs automated Static Application Security Testing (SAST) to detect unhandled user inputs, potential XSS vectors in Draw.io SVG canvas renders, secret leaks in git commits, and `npm audit` dependency vulnerabilities.

## 1. SAST Audit Protocols

1. **Dependency Audit**: Run `npm audit --json` to detect known high or critical CVEs in `node_modules`.
2. **SVG XSS Sanitization Audit**: Verify that user-controlled XML/SVG tags rendered in `DiagramViewerRenderSafe.tsx` or iframe bridges pass through sanitization (`DOMPurify` or safe text node creation).
3. **Secret Leak Detection**: Check for hardcoded API keys, JWT secrets, or un-hashed database credentials in `src/` files.

## 2. Automated SAST Audit Runner (`scratch/run_security_sast.js`)

```javascript
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function runSecurityScan() {
  console.log('🔒 Starting SAST & Secret Leak Audit...\n');

  // 1. Secret Leak Scanner
  const srcDir = path.join(process.cwd(), 'src');
  const files = fs.readdirSync(srcDir, { recursive: true }).filter(f => f.endsWith('.ts') || f.endsWith('.tsx'));

  let secretLeaks = 0;
  for (const f of files) {
    const fullPath = path.join(srcDir, f);
    const content = fs.readFileSync(fullPath, 'utf8');
    if (content.includes('AIZASy') || content.includes('sk_live_')) {
      console.error(`🚨 Potential API Secret Leak detected in: ${f}`);
      secretLeaks++;
    }
  }

  // 2. npm audit check
  try {
    const auditOutput = execSync('npm audit --json', { encoding: 'utf8' });
    const auditJson = JSON.parse(auditOutput);
    const vulnerabilities = auditJson?.metadata?.vulnerabilities || {};
    console.log(`📦 Dependency Vulnerabilities: High: ${vulnerabilities.high || 0}, Critical: ${vulnerabilities.critical || 0}`);
  } catch (err) {
    console.warn('⚠️ npm audit returned advisories.');
  }

  console.log(`\n✅ SAST Scan Complete. Secret leaks found: ${secretLeaks}`);
}

runSecurityScan();
```

## 3. Workflow Protocol
Execute `node scratch/run_security_sast.js` before git commits or deployment pushes.

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

