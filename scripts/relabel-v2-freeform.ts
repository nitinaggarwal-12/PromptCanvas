/**
 * One-time relabel: versions produced by the v2 pipeline before the routing fix were saved
 * with legacy architecture_type values. Identify by graph_json presence; relabel to
 * v2_freeform so template logic (backbone injection, validator scoping) treats them correctly.
 * Dry-run by default; pass --apply to write. Local sqlite dev.db.
 */
import { DatabaseSync } from 'node:sqlite';
const db = new DatabaseSync('dev.db');
const rows = db.prepare(`SELECT id, diagram_id, version_number, architecture_type FROM diagram_versions WHERE graph_json IS NOT NULL AND architecture_type != 'v2_freeform'`).all() as any[];
console.log(`${rows.length} v2-produced versions to relabel:`);
rows.forEach(r => console.log(`  ${r.diagram_id} v${r.version_number}: ${r.architecture_type} -> v2_freeform`));
if (process.argv.includes('--apply')) {
  const res = db.prepare(`UPDATE diagram_versions SET architecture_type='v2_freeform' WHERE graph_json IS NOT NULL AND architecture_type != 'v2_freeform'`).run();
  console.log(`Migrated ${res.changes} rows.`);
} else console.log('Dry run — add --apply to write.');
