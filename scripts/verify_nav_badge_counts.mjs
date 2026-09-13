#!/usr/bin/env node
/**
 * Nav badge drift guard.
 *
 * UnifiedAppSidebar renders on every route, so it deliberately hardcodes the
 * "52" and "17" badge counts rather than importing CANONICAL_TEMPLATES and
 * DOC_ARCHETYPES_META — those modules are ~130KB of source and would land in
 * every client bundle for the sake of two numbers.
 *
 * The cost of that choice is drift, which already happened: the badge read
 * "50" while there were 52 templates, so the sidebar contradicted the page it
 * linked to. This check makes that impossible to reintroduce silently.
 */
import fs from 'fs';

const read = (p) => fs.readFileSync(p, 'utf8');
let failed = 0;

function check(label, actual, badgeId, sidebar) {
  // Match the badge on the nav entry with the given id, e.g.
  //   { id: 'canonical', ..., badge: '52' },
  const entry = new RegExp(`\\{[^}]*\\bid:\\s*'${badgeId}'[^}]*\\}`).exec(sidebar);
  if (!entry) {
    console.error(`❌ ${label}: no nav entry with id '${badgeId}' found in UnifiedAppSidebar`);
    failed++;
    return;
  }
  const badge = /badge:\s*'(\d+)'/.exec(entry[0]);
  if (!badge) {
    console.error(`❌ ${label}: nav entry '${badgeId}' has no numeric badge`);
    failed++;
    return;
  }
  const shown = Number(badge[1]);
  if (shown !== actual) {
    console.error(
      `❌ ${label}: sidebar badge says ${shown} but there are ${actual}. ` +
        `Update badge: '${actual}' on the '${badgeId}' nav entry.`
    );
    failed++;
  } else {
    console.log(`✅ ${label}: badge ${shown} matches ${actual} real entries`);
  }
}

const sidebar = read('src/components/UnifiedAppSidebar.tsx');

// Canonical templates: count `id:` keys in RAW_TEMPLATES (everything before the
// derived CANONICAL_TEMPLATES export).
const tpl = read('src/lib/canonical/canonicalTemplates.ts');
const rawTemplates = tpl.slice(0, tpl.indexOf('export const CANONICAL_TEMPLATES'));
const templateCount = (rawTemplates.match(/^\s*id:\s*['`]/gm) || []).length;
check('Blueprint Catalog', templateCount, 'canonical', sidebar);

// Document archetypes: count `id:` keys inside DOC_ARCHETYPES_META.
const arche = read('src/lib/compose/archetypes.ts');
const metaStart = arche.indexOf('export const DOC_ARCHETYPES_META');
const metaEnd = arche.indexOf('export const', metaStart + 10);
const meta = arche.slice(metaStart, metaEnd === -1 ? undefined : metaEnd);
const archetypeCount = (meta.match(/^\s*id:\s*'/gm) || []).length;
check('Document Studio', archetypeCount, 'docgen', sidebar);

if (failed) {
  console.error(`\n❌ ${failed} nav badge count(s) out of date.`);
  process.exit(1);
}
console.log('\n✅ Nav badge counts verified.');
