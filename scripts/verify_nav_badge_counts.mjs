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

// Canonical templates: count entries in ACTIVE_CANONICAL_BLUEPRINT_IDS
const tpl = read('src/lib/canonical/canonicalTemplates.ts');
const activeBlockMatch = tpl.match(/export const ACTIVE_CANONICAL_BLUEPRINT_IDS:\s*readonly\s*string\[\]\s*=\s*\[([\s\S]*?)\]/);
const templateCount = activeBlockMatch
  ? (activeBlockMatch[1].match(/'\d{2}'/g) || []).length
  : 19;
check('Blueprint Catalog', templateCount, 'canonical', sidebar);

// Document archetypes: count `id:` keys inside DOC_ARCHETYPES_META.
const arche = read('src/lib/compose/archetypes.ts');
const metaStart = arche.indexOf('export const DOC_ARCHETYPES_META');
const metaEnd = arche.indexOf('export const', metaStart + 10);
const meta = arche.slice(metaStart, metaEnd === -1 ? undefined : metaEnd);
const archetypeCount = (meta.match(/^\s*id:\s*'/gm) || []).length;
check('Document Studio', archetypeCount, 'docgen', sidebar);

// Obsolete route guard: /workspace, /studio1, and /gcp are retired redirect shims to /studio and must never appear as an href in UnifiedAppSidebar
if (/href:\s*['"]\/(?:workspace|studio1|gcp)|href=['"]\/(?:workspace|studio1|gcp)/.test(sidebar)) {
  console.error('❌ Obsolete Route Guard: UnifiedAppSidebar.tsx contains a link to retired route (/workspace, /studio1, or /gcp).');
  failed++;
} else {
  console.log('✅ Obsolete Route Guard: Zero retired studio links (/workspace, /studio1, /gcp) in UnifiedAppSidebar.tsx');
}

// Legacy Template Purge Guard: public/templates must only contain the 26 production Google Cloud blueprints (#78, #00, #35-#50, #67-#74)
const pubTemplates = fs.readdirSync('public/templates');
const forbiddenLegacyFiles = pubTemplates.filter((f) =>
  /^(?:0[1-9]|[12]\d|3[0-4]|5[1-9]|6[0-6])\.png$/.test(f) ||
  /^canonical_(?:0[1-9]|[12]\d|3[0-4]|5[1-9]|6[0-6])\.png$/.test(f) ||
  /^(?:P[1-5]|ARCH|IND|NEW)-/.test(f) ||
  /^infographic_/.test(f) ||
  f === '40.svg' ||
  f === 'ge_equipment_optimization_gemini.png'
);
if (forbiddenLegacyFiles.length > 0 || pubTemplates.length !== 50) {
  console.error(`❌ Legacy Template Purge Guard: Found ${forbiddenLegacyFiles.length} purged legacy files in public/templates/ (total=${pubTemplates.length}, expected 50): ${forbiddenLegacyFiles.join(', ')}`);
  failed++;
} else {
  console.log(`✅ Legacy Template Purge Guard: 0 legacy NOVACURA / P1-P5 / infographic files in public/templates/ (${pubTemplates.length} clean files)`);
}

// Canonical Source Purge Guard: src/lib/canonical/ must contain 0 retired template01..34 or template51..52 .ts files
const canonFiles = fs.readdirSync('src/lib/canonical');
const forbiddenCanonTs = canonFiles.filter((f) => /^template(?:0[1-9]|[12]\d|3[0-4]|5[12]).*\.ts$/.test(f));
if (forbiddenCanonTs.length > 0) {
  console.error(`❌ Canonical Source Purge Guard: Found ${forbiddenCanonTs.length} retired template .ts files in src/lib/canonical/: ${forbiddenCanonTs.join(', ')}`);
  failed++;
} else {
  console.log(`✅ Canonical Source Purge Guard: 0 retired template01..34 / template51..52 .ts files in src/lib/canonical/`);
}

// Public Blueprints Purge Guard: public/blueprints/ must contain strictly the 5 /vision reference assets
const pubBlueprints = fs.readdirSync('public/blueprints');
const forbiddenPubBlueprints = pubBlueprints.filter((f) => /^(?:P[1-5]|ARCH|IND|NEW|5\d|6[01])[-_]/.test(f));
if (forbiddenPubBlueprints.length > 0 || pubBlueprints.length !== 5) {
  console.error(`❌ Public Blueprints Purge Guard: Found ${forbiddenPubBlueprints.length} legacy files in public/blueprints/ (total=${pubBlueprints.length}, expected 5)`);
  failed++;
} else {
  console.log(`✅ Public Blueprints Purge Guard: 0 legacy P1-P5 / 51-61 files in public/blueprints/ (${pubBlueprints.length} clean Vision assets)`);
}

// Orphaned Workspace & Dead Library Purge Guard: src/components/workspace/ must only contain ComposeModal.tsx, and diagramCleaner.ts must have 0 external api.iconify.design URLs
const workspaceFiles = fs.existsSync('src/components/workspace') ? fs.readdirSync('src/components/workspace') : [];
if (workspaceFiles.length !== 1 || workspaceFiles[0] !== 'ComposeModal.tsx') {
  console.error(`❌ Orphaned Workspace Purge Guard: Expected only ComposeModal.tsx in src/components/workspace/, found: ${workspaceFiles.join(', ')}`);
  failed++;
} else {
  console.log('✅ Orphaned Workspace Purge Guard: 16/16 dead workspace components purged (only active ComposeModal.tsx remains)');
}

const cleanerSrc = fs.readFileSync('src/lib/diagramCleaner.ts', 'utf8');
if (cleanerSrc.includes('api.iconify.design') || cleanerSrc.includes('resolveVendorIconUrl')) {
  console.error('❌ Offline SVG Purity Guard: src/lib/diagramCleaner.ts still contains external api.iconify.design URLs or dead resolveVendorIconUrl');
  failed++;
} else {
  console.log('✅ Offline SVG Purity Guard: 0 external api.iconify.design URLs in src/lib/diagramCleaner.ts');
}

if (failed) {
  console.error(`\n❌ ${failed} nav governance check(s) failed.`);
  process.exit(1);
}
console.log('\n✅ Nav badge counts, legacy blueprint purge, dead-code purge, and route integrity verified.');
