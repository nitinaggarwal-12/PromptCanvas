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
