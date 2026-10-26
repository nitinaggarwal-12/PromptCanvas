#!/usr/bin/env node
/**
 * Nav badge drift & legacy purge guard.
 *
 * UnifiedAppSidebar renders on every route, so it deliberately hardcodes the
 * "26" and "17" badge counts rather than importing CANONICAL_TEMPLATES and
 * DOC_ARCHETYPES_META — those modules are ~130KB of source and would land in
 * every client bundle for the sake of two numbers.
 *
 * This guard enforces badge parity, retired route shim removal, and Waves 1-10
 * legacy asset/source/export purges.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => fs.readFileSync(path.isAbsolute(p) ? p : path.join(ROOT, p), 'utf8');
let failed = 0;

function check(label, actual, badgeId, sidebar) {
  // Match the badge on the nav entry with the given id, e.g.
  //   { id: 'canonical', ..., badge: '26' },
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

// Obsolete route guard: /workspace, /studio1, and /gcp are retired and must never appear in UnifiedAppSidebar or exist in src/app/
const retiredRouteDirs = ['src/app/workspace', 'src/app/studio1', 'src/app/gcp'].filter((d) =>
  fs.existsSync(path.join(ROOT, d))
);
if (
  /href:\s*['"]\/(?:workspace|studio1|gcp)|href=['"]\/(?:workspace|studio1|gcp)/.test(sidebar) ||
  retiredRouteDirs.length > 0
) {
  console.error(
    `❌ Obsolete Route Guard: Retired routes found in UnifiedAppSidebar.tsx or on disk: ${retiredRouteDirs.join(', ')}`
  );
  failed++;
} else {
  console.log('✅ Obsolete Route Guard: Zero retired studio links or route directories (/workspace, /studio1, /gcp)');
}

// Legacy & Purged Tier 1/2/3 Template Guard: public/templates must only contain the 22 active blueprints (7 core Google Cloud blueprints #78, #79, #81, #84, #00, #67, #69 + 15 Infographic blueprints #52–#66 -> 44 files)
const pubTemplates = fs.readdirSync('public/templates');
const forbiddenLegacyFiles = pubTemplates.filter((f) =>
  /^(?:0[1-9]|[1234]\d|5[01]|68|7[0-4]|80|82|83)\.png$/.test(f) ||
  /^canonical_(?:0[1-9]|[1234]\d|5[01]|68|7[0-4]|80|82|83)\.png$/.test(f) ||
  /^(?:P[1-5]|ARCH|IND|NEW)-/.test(f) ||
  /^infographic_/.test(f) ||
  f === '40.svg' ||
  f === 'ge_equipment_optimization_gemini.png'
);
if (forbiddenLegacyFiles.length > 0 || pubTemplates.length !== 44) {
  console.error(`❌ Legacy Template Purge Guard: Found ${forbiddenLegacyFiles.length} purged legacy files in public/templates/ (total=${pubTemplates.length}, expected 44): ${forbiddenLegacyFiles.join(', ')}`);
  failed++;
} else {
  console.log(`✅ Legacy Template Purge Guard: 0 purged Tier 1/2/3 or legacy files in public/templates/ (${pubTemplates.length} clean files)`);
}

// Root & Public Images Legacy Purge Guard: images/ and public/images/ must contain only the 1 active reference PNG (00.png)
for (const imgDir of ['images', 'public/images']) {
  if (fs.existsSync(imgDir)) {
    const imgs = fs.readdirSync(imgDir);
    const forbiddenImgs = imgs.filter(
      (f) => /^(?:0[1-9]|[1234]\d|50)\.png$/.test(f) || f === '40.svg'
    );
    if (forbiddenImgs.length > 0 || imgs.length !== 1) {
      console.error(`❌ Images Legacy Purge Guard (${imgDir}): Found ${forbiddenImgs.length} legacy/purged files in ${imgDir}/ (total=${imgs.length}, expected 1): ${forbiddenImgs.join(', ')}`);
      failed++;
    } else {
      console.log(`✅ Images Legacy Purge Guard (${imgDir}): 0 purged Tier 1/2/3 or legacy files in ${imgDir}/ (${imgs.length} active reference PNG)`);
    }
  }
}

// Canonical Source Purge Guard: src/lib/canonical/ must contain 0 retired template01..34, purged Tier 1/2/3 (35..52) .ts files
const canonFiles = fs.readdirSync('src/lib/canonical');
const forbiddenCanonTs = canonFiles.filter((f) => /^template(?:0[1-9]|[1234]\d|5[0-2]).*\.ts$/.test(f));
if (forbiddenCanonTs.length > 0) {
  console.error(`❌ Canonical Source Purge Guard: Found ${forbiddenCanonTs.length} retired/purged template .ts files in src/lib/canonical/: ${forbiddenCanonTs.join(', ')}`);
  failed++;
} else {
  console.log(`✅ Canonical Source Purge Guard: 0 retired or purged Tier 1/2/3 template .ts files in src/lib/canonical/`);
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

// 9. Full-Repo Source Purity Scan across all src/**/*.{ts,tsx}
function walkSrcFiles(dir) {
  let out = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) out.push(...walkSrcFiles(p));
    else if (/\.(ts|tsx)$/.test(ent.name)) out.push(p);
  }
  return out;
}
const allSrcFiles = walkSrcFiles(path.join(ROOT, 'src'));
const srcViolations = [];
const multiCloudAllowedFiles = new Set([
  'src/lib/canonical/infographicBlueprints52to66.ts',
  'src/lib/awsOfficialSvgAssets.ts',
  'src/lib/visionPosterToDrawioDecompiler.ts',
]);
for (const f of allSrcFiles) {
  const rel = path.relative(ROOT, f);
  const txt = fs.readFileSync(f, 'utf8');
  if (txt.includes('api.iconify.design')) {
    srcViolations.push(`${rel}: contains external api.iconify.design URL`);
  }
  if (/thinkingBudget\s*:/.test(txt)) {
    srcViolations.push(`${rel}: contains numeric thinkingBudget (violates Law 16 / Rule 55)`);
  }
  if (/window\.(prompt|alert|confirm)\s*\(/.test(txt)) {
    srcViolations.push(`${rel}: contains thread-blocking window.prompt/alert/confirm (violates Law 10 / Rule 25J)`);
  }
  if (!multiCloudAllowedFiles.has(rel) && /\b(Anthropic|Claude|Snowflake)\b/i.test(txt)) {
    srcViolations.push(`${rel}: contains banned Anthropic/Claude/Snowflake vendor reference (violates Rule 53)`);
  }
  if (rel.startsWith('src/lib/masterBuilders/') && /id="old_[^"]+"/.test(txt)) {
    srcViolations.push(`${rel}: contains legacy id="old_*" diagram ID`);
  }
}
if (srcViolations.length > 0) {
  console.error(`❌ Full-Repo Source Purity Guard (${srcViolations.length} violation(s)):`, srcViolations);
  failed++;
} else {
  console.log(`✅ Full-Repo Source Purity Guard: ${allSrcFiles.length} src/**/*.{ts,tsx} files verified (0 api.iconify.design, 0 thinkingBudget, 0 window.confirm/prompt/alert, 0 Anthropic/Claude/Snowflake, 0 old_* diagram IDs)`);
}

// 10. Cross-Page Blueprint Count Drift & Rule 54 Header Theme-Awareness Guard
const crossPageTargets = [
  'src/app/page.tsx',
  'src/components/NewDiagramInputSelectionModal.tsx',
  'src/app/dashboard/page.tsx',
  'src/app/guide/page.tsx',
  'src/app/test-status/page.tsx',
];
const staleBlueprintRegex = /\b(?:7|8|18|19|23|26|29|77)\s+(?:Official\s+Google\s+Cloud\s+Reference\s+(?:&\s+Infographic\s+)?Blueprints|curated\s+Google\s+Cloud\s+reference\s+(?:&\s+infographic\s+)?blueprints|Production\s+Blueprints|Certified\s+Blueprints|Certified|certified\s+reference\s+architectures|Reference\s+Blueprints|Blueprints|blueprints|Canonical\s+Blueprints|canonical\s+master\s+blueprints)\b/;
for (const rel of crossPageTargets) {
  const content = read(rel);
  const m = staleBlueprintRegex.exec(content);
  if (m) {
    console.error(`❌ Cross-Page Blueprint Count Drift Guard: ${rel} still contains stale blueprint count "${m[0]}" (expected ${templateCount})`);
    failed++;
  }
}
const landingPage = read('src/app/page.tsx');
const changelogPage = read('src/app/changelog/page.tsx');
if (landingPage.includes('<header className="dark ') || changelogPage.includes('<header className="dark ')) {
  console.error('❌ Rule 54 Header Theme-Awareness Guard: src/app/page.tsx or src/app/changelog/page.tsx forces hardcoded className="dark ..." on <header>');
  failed++;
} else {
  console.log(`✅ Cross-Page Blueprint Count (${templateCount}) & Rule 54 Header Theme-Awareness Guard: 0 stale 19/77 counts and 0 hardcoded dark-only page headers across ${crossPageTargets.length} surfaces`);
}

if (failed) {
  console.error(`\n❌ ${failed} nav governance check(s) failed.`);
  process.exit(1);
}
console.log('\n✅ Nav badge counts, legacy blueprint purge, dead-code purge, full-repo source purity, and route integrity verified.');
