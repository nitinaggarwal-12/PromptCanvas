---
name: database-schema-guard
description: Automated schema drift detection, SQLite to PostgreSQL type compatibility auditing, index efficiency verification, and database migration safety validation.
---

# Database Schema Drift & Migration Guard Skill

This skill ensures dual-database compatibility (SQLite local `dev.db` vs PostgreSQL production) and verifies schema consistency across table columns, indices, foreign keys, and RLS policies.

## 1. Schema Drift Checker (`scratch/check_schema_drift.js`)

```javascript
const { DatabaseSync } = require('node:sqlite');
const path = require('path');

function inspectSqliteSchema() {
  const dbPath = path.join(process.cwd(), 'dev.db');
  const db = new DatabaseSync(dbPath);

  const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'").all();
  console.log('📋 Local SQLite Tables:');
  
  const schemaMap = {};
  for (const t of tables) {
    const columns = db.prepare(`PRAGMA table_info(${t.name})`).all();
    schemaMap[t.name] = columns.map(c => ({ name: c.name, type: c.type, notnull: c.notnull }));
  }

  console.dir(schemaMap, { depth: null });
  db.close();
  return schemaMap;
}

module.exports = { inspectSqliteSchema };
```

## 2. Dual DB Safeguard Rules

1. **Column Additions**: Always use `ADD COLUMN IF NOT EXISTS` in migrations for both SQLite and PostgreSQL syntax.
2. **Type Mapping**: Ensure SQLite `INTEGER` booleans (`0` / `1`) cleanly map to PostgreSQL `BOOLEAN` types (`true` / `false`).
3. **Foreign Keys**: Always enable `PRAGMA foreign_keys = ON` in SQLite initialization to mirror PostgreSQL constraint enforcement.

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

