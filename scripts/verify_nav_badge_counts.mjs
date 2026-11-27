#!/usr/bin/env node
/**
 * Nav badge drift, legacy purge & zero-orphan mechanical ratchet.
 *
 * Enforces:
 * 1. Sidebar badge parity ('84' Templates, '15' Infographics, '8' Document Studio)
 * 2. Retired & orphan route/directory/module absence
 * 3. Full-repo source purity (zero XSS sinks, zero fictional models, zero stale counts)
 * 4. 100% Reachable `src/` Dependency Graph (zero unimported orphan `.ts/.tsx/.json` files)
 * 5. Zero broken internal page/API links, zero 0-caller `/api/*` routes, and zero unwired `<button>`s
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'src');
const read = (p) => fs.readFileSync(path.isAbsolute(p) ? p : path.join(ROOT, p), 'utf8');
let failed = 0;

function check(label, actual, badgeId, sidebar) {
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

const tpl = read('src/lib/canonical/canonicalTemplates.ts');
const activeBlockMatch = tpl.match(/export const ACTIVE_CANONICAL_BLUEPRINT_IDS:\s*readonly\s*string\[\]\s*=\s*\[([\s\S]*?)\]/);
const templateCount = activeBlockMatch
  ? (activeBlockMatch[1].match(/'\d{2}'/g) || []).length
  : 35;

// Certified Architecture Templates (/templates): count entries in CERTIFIED_ARCHITECTURE_TEMPLATES & assert 0 L100
const certArchSrc = read('src/lib/templates/certifiedArchitectureTemplates.ts');
const certArchCount = (certArchSrc.match(/"slug":\s*"template_/g) || []).length;
check('Templates', certArchCount, 'templates', sidebar);
if (/"level":\s*"L100"/.test(certArchSrc)) {
  console.error('❌ Templates Level Guard: Found forbidden L100 entry in src/lib/templates/certifiedArchitectureTemplates.ts');
  failed++;
} else {
  console.log(`✅ Templates Level Guard: ${certArchCount} certified architecture templates verified across L200–L400 (0 L100, 0 Infographics)`);
}

// Separate Infographics (/infographics): count entries in INFOGRAPHIC_BLUEPRINTS_LIST
const infoSrc = read('src/lib/canonical/infographicBlueprints52to66.ts');
const infoCount = (infoSrc.match(/previewImage:\s*'\/templates\/(?:5[2-9]|6[0-6])\.png'/g) || []).length;
check('Infographics', infoCount, 'infographics', sidebar);

// Document archetypes: count `id:` keys inside DOC_ARCHETYPES_META
const arche = read('src/lib/compose/archetypes.ts');
const metaStart = arche.indexOf('export const DOC_ARCHETYPES_META');
const metaEnd = arche.indexOf('export const', metaStart + 10);
const meta = arche.slice(metaStart, metaEnd === -1 ? undefined : metaEnd);
const archetypeCount = (meta.match(/^\s*id:\s*'/gm) || []).length;
check('Document Studio', archetypeCount, 'docgen', sidebar);

// Obsolete route & purged orphan guard
const retiredPaths = [
  'src/app/workspace',
  'src/app/studio1',
  'src/app/studio',
  'src/app/gcp',
  'src/app/pv-case-processing',
  'src/app/test-status',
  'src/app/canonical',
  'src/components/studio',
  'src/components/workspace',
  'src/components/ContactUsModal.tsx',
  'src/components/AccessRequestsInbox.tsx',
  'src/components/VisitorCounter.tsx',
  'src/app/api/chat',
  'src/app/api/auth/session',
  'src/app/api/auth/magic-link',
  'src/app/api/contact',
  'src/app/api/access-requests',
  'src/app/api/diagrams/customize',
  'src/app/api/export/terraform',
  'src/app/api/generate',
  'src/app/api/changelog/sheet-sync',
  'src/app/api/infographic-blueprint',
  'src/app/api/research-infographic',
  'src/app/api/visitors',
  'public/gcp-templates',
  'public/gcp-multi-tenant-artifacts',
  'src/lib/canonical/template59QuarterlyRoadmapGcp.ts',
  'src/lib/gcpDialectA.ts',
  'src/lib/gcpConceptualPharma.ts',
  'src/lib/validate/contrast.ts',
  'src/prompts/repairXml.ts',
  'src/lib/omniDirector',
  'src/lib/pipeline',
  'src/lib/layout',
  'src/lib/render',
  'src/lib/research',
  'src/lib/unifiedDiagramEngine.ts',
  'src/lib/geminiDiagramCustomizer.ts',
  'templates',
  'diagrams',
  'evals',
  'logs',
  'docs',
];
const existingRetiredPaths = retiredPaths.filter((d) => fs.existsSync(path.join(ROOT, d)));
if (
  /href:\s*['"]\/(?:workspace|studio1|studio|gcp|pv-case-processing|test-status|canonical)|href=['"]\/(?:workspace|studio1|studio|gcp|pv-case-processing|test-status|canonical)/.test(sidebar) ||
  existingRetiredPaths.length > 0
) {
  console.error(
    `❌ Obsolete Route & Purged Orphan Guard: Retired paths found in UnifiedAppSidebar.tsx or on disk: ${existingRetiredPaths.join(', ')}`
  );
  failed++;
} else {
  console.log(`✅ Obsolete Route & Purged Orphan Guard: 0/${retiredPaths.length} retired routes/components/APIs/directories exist`);
}

// Legacy & Purged Tier 1/2/3 Template Guard
const pubTemplates = fs.readdirSync(path.join(ROOT, 'public/templates'));
const pubTemplateSet = new Set(pubTemplates);
const RESTORED_CANONICAL_PNGS = new Set([
  'canonical_03.png',
  'canonical_12.png',
  'canonical_14.png',
  'canonical_29.png',
]);
const forbiddenLegacyFiles = pubTemplates.filter((f) =>
  (/^(?:0[1-9]|[1234]\d|5[01]|68|7[0-4]|79|80|82|83|85|86|88|96|98)\.png$/.test(f)) ||
  (/^canonical_(?:0[1-9]|[1234]\d|5[01]|68|7[0-4]|79|80|82|83|85|86|88|96|98)\.png$/.test(f) && !RESTORED_CANONICAL_PNGS.has(f)) ||
  /^(?:P[1-5]|ARCH|IND|NEW)-/.test(f) ||
  /^infographic_/.test(f) ||
  f === '40.svg' ||
  f === 'ge_equipment_optimization_gemini.png'
);
const activeIds = activeBlockMatch ? (activeBlockMatch[1].match(/\d{2}/g) || []) : [];
const missingActivePreviews = activeIds.filter((id) => !pubTemplateSet.has(`canonical_${id}.png`));
if (forbiddenLegacyFiles.length > 0 || missingActivePreviews.length > 0) {
  console.error(`❌ Legacy Template Purge Guard: forbidden=${forbiddenLegacyFiles.length}, missingActivePreviews=${missingActivePreviews.length}`);
  failed++;
} else {
  console.log(`✅ Legacy Template Purge Guard: 0 purged legacy files and all ${activeIds.length}/${activeIds.length} active canonical PNG previews verified in public/templates/ (${pubTemplates.length} clean files)`);
}

for (const imgDir of ['images', 'public/images']) {
  const fullImgDir = path.join(ROOT, imgDir);
  if (fs.existsSync(fullImgDir)) {
    const imgs = fs.readdirSync(fullImgDir);
    const forbiddenImgs = imgs.filter(
      (f) => /^(?:0[1-9]|[1234]\d|50)\.png$/.test(f) || f === '40.svg'
    );
    if (forbiddenImgs.length > 0 || imgs.length !== 1) {
      console.error(`❌ Images Legacy Purge Guard (${imgDir}): total=${imgs.length}, expected 1`);
      failed++;
    } else {
      console.log(`✅ Images Legacy Purge Guard (${imgDir}): 0 purged Tier 1/2/3 or legacy files in ${imgDir}/ (${imgs.length} active reference PNG)`);
    }
  }
}

const canonFiles = fs.readdirSync(path.join(ROOT, 'src/lib/canonical'));
const RESTORED_CANON_TS = new Set([
  'template03Swimlane.ts',
  'template12StateMachine.ts',
  'template14DataModelErd.ts',
  'template29CutoverRunbook.ts',
]);
const forbiddenCanonTs = canonFiles.filter(
  (f) => /^template(?:0[1-9]|[1234]\d|5[0-2]).*\.ts$/.test(f) && !RESTORED_CANON_TS.has(f)
);
if (forbiddenCanonTs.length > 0) {
  console.error(`❌ Canonical Source Purge Guard: Found ${forbiddenCanonTs.length} retired template .ts files`);
  failed++;
} else {
  console.log('✅ Canonical Source Purge Guard: 0 retired or purged Tier 1/2/3 template .ts files in src/lib/canonical/');
}

const pubBlueprints = fs.readdirSync(path.join(ROOT, 'public/blueprints'));
const forbiddenPubBlueprints = pubBlueprints.filter((f) => /^(?:P[1-5]|ARCH|IND|NEW|5\d|6[01])[-_]/.test(f));
if (forbiddenPubBlueprints.length > 0 || pubBlueprints.length !== 5) {
  console.error(`❌ Public Blueprints Purge Guard: total=${pubBlueprints.length}, expected 5`);
  failed++;
} else {
  console.log(`✅ Public Blueprints Purge Guard: 0 legacy P1-P5 / 51-61 files in public/blueprints/ (${pubBlueprints.length} clean Vision assets)`);
}

const cleanerSrc = read('src/lib/diagramCleaner.ts');
if (cleanerSrc.includes('api.iconify.design') || cleanerSrc.includes('resolveVendorIconUrl')) {
  console.error('❌ Offline SVG Purity Guard: src/lib/diagramCleaner.ts contains external api.iconify.design URLs');
  failed++;
} else {
  console.log('✅ Offline SVG Purity Guard: 0 external api.iconify.design URLs in src/lib/diagramCleaner.ts');
}

// Full-Repo Source Purity Scan across all src/**/*.{ts,tsx}
function walkFiles(dir, exts = null) {
  let out = [];
  if (!fs.existsSync(dir)) return out;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) out.push(...walkFiles(p, exts));
    else if (!exts || exts.some((e) => ent.name.endsWith(e))) out.push(p);
  }
  return out;
}

const allSrcTsFiles = walkFiles(SRC, ['.ts', '.tsx']);
const srcViolations = [];
const multiCloudAllowedFiles = new Set([
  'src/lib/canonical/infographicBlueprints52to66.ts',
  'src/lib/awsOfficialSvgAssets.ts',
  'src/lib/visionPosterToDrawioDecompiler.ts',
]);
const gemini25TranslatorFiles = new Set([
  'src/lib/geminiConfig.ts',
  'src/lib/geminiRetryHelper.ts',
]);
for (const f of allSrcTsFiles) {
  const rel = path.relative(ROOT, f);
  const txt = fs.readFileSync(f, 'utf8');
  if (txt.includes('api.iconify.design')) srcViolations.push(`${rel}: contains api.iconify.design`);
  if (!gemini25TranslatorFiles.has(rel) && /thinkingBudget\s*:/.test(txt)) {
    srcViolations.push(`${rel}: contains numeric thinkingBudget`);
  }
  if (/window\.(prompt|alert|confirm)\s*\(/.test(txt)) {
    srcViolations.push(`${rel}: contains window.prompt/alert/confirm`);
  }
  if (/railway\.app/i.test(txt)) srcViolations.push(`${rel}: contains railway.app`);
  if (!multiCloudAllowedFiles.has(rel) && /\b(Anthropic|Claude|Snowflake)\b/i.test(txt)) {
    srcViolations.push(`${rel}: contains Anthropic/Claude/Snowflake vendor reference`);
  }
  if (rel.startsWith('src/lib/masterBuilders/') && /id="old_[^"]+"/.test(txt)) {
    srcViolations.push(`${rel}: contains legacy id="old_*" diagram ID`);
  }
  if (/art_gen_default_|proj_aeronode_981|proj_smartgrid_774|proj_apexpay_332/.test(txt)) {
    srcViolations.push(`${rel}: contains purged fabricated demo project/artifact ID`);
  }
  if (/cymbal-build-sandbox/i.test(txt)) srcViolations.push(`${rel}: contains cymbal-build-sandbox`);
  if (/authuser=nitinagga/i.test(txt)) srcViolations.push(`${rel}: contains personal authuser=nitinagga`);
  if (/defaultSenderEmail=["']nitinagga@/i.test(txt)) srcViolations.push(`${rel}: contains defaultSenderEmail`);
  if (/sheet-sync|sheet_sync_config|performTwoWayGoogleSheetSync/.test(txt)) {
    srcViolations.push(`${rel}: contains purged 2-Way Google Sheet Sync reference`);
  }
}

const strayMetaFiles = walkFiles(SRC).filter((f) => f.endsWith('.metadata.json'));
for (const mf of strayMetaFiles) {
  srcViolations.push(`${path.relative(ROOT, mf)}: stray sidecar .metadata.json file in src/`);
}
if (srcViolations.length > 0) {
  console.error(`❌ Full-Repo Source Purity Guard (${srcViolations.length} violation(s)):`, srcViolations);
  failed++;
} else {
  console.log(`✅ Full-Repo Source Purity Guard: ${allSrcTsFiles.length} src/**/*.{ts,tsx} files verified`);
}

// Zero-Orphan Dependency Graph Guard across all src/**/*.{ts,tsx,json}
const allGraphCandidates = walkFiles(SRC, ['.ts', '.tsx', '.js', '.mjs', '.json']).filter(
  (f) => !f.includes('.test.') && !f.includes('__tests__') && !f.endsWith('.d.ts')
);
function resolveImport(fromFile, spec) {
  let base = null;
  if (spec.startsWith('@/')) base = path.join(SRC, spec.slice(2));
  else if (spec.startsWith('./') || spec.startsWith('../')) base = path.resolve(path.dirname(fromFile), spec);
  else return null;
  for (const c of [base, `${base}.ts`, `${base}.tsx`, `${base}.js`, `${base}.mjs`, `${base}.json`, path.join(base, 'index.ts'), path.join(base, 'index.tsx')]) {
    if (fs.existsSync(c) && fs.statSync(c).isFile()) return c;
  }
  return null;
}
const entryFiles = allGraphCandidates.filter(
  (f) =>
    /\/src\/app\/.*\/(page|layout|loading|error|not-found|global-error|template|default)\.tsx$/.test(f) ||
    /\/src\/app\/(page|layout|loading|error|not-found|global-error|icon|apple-icon|opengraph-image|robots|sitemap)\.(tsx|ts)$/.test(f) ||
    /\/src\/app\/api\/.*\/route\.ts$/.test(f) ||
    /\/src\/(middleware|proxy|instrumentation)\.ts$/.test(f) ||
    (fs.existsSync(path.join(ROOT, 'bin/validate-cli.ts')) && f === path.join(SRC, 'lib/validate/validator.ts'))
);
const reachable = new Set();
const queue = [...entryFiles];
while (queue.length > 0) {
  const cur = queue.pop();
  if (reachable.has(cur)) continue;
  reachable.add(cur);
  const txt = fs.readFileSync(cur, 'utf8');
  const specs = [
    ...txt.matchAll(/(?:import|export)\s+(?:[^'"]*?\s+from\s+)?['"]([^'"]+)['"]/g),
    ...txt.matchAll(/\bimport\s*\(\s*['"]([^'"]+)['"]\s*\)/g),
    ...txt.matchAll(/\brequire\s*\(\s*['"]([^'"]+)['"]\s*\)/g),
  ].map((m) => m[1]);
  for (const s of specs) {
    const r = resolveImport(cur, s);
    if (r && !reachable.has(r)) queue.push(r);
  }
}
const orphanSrcFiles = allGraphCandidates
  .filter((f) => !reachable.has(f))
  .map((f) => path.relative(ROOT, f));
if (orphanSrcFiles.length > 0) {
  console.error(`❌ Zero-Orphan Dependency Graph Guard: Found ${orphanSrcFiles.length} unimported file(s) in src/: ${orphanSrcFiles.join(', ')}`);
  failed++;
} else {
  console.log(`✅ Zero-Orphan Dependency Graph Guard: 0 unimported orphan modules across ${allGraphCandidates.length} runtime files`);
}

// Zero Broken Internal Links, Zero 0-Caller APIs & Zero Unwired <button> Guard
const nonTestSrc = allSrcTsFiles.filter((f) => !f.includes('.test.') && !f.includes('__tests__'));
const pageRoutes = nonTestSrc
  .filter((f) => /\/app\/.*\/page\.tsx$|\/app\/page\.tsx$/.test(f))
  .map((f) => {
    const rel = path.relative(path.join(SRC, 'app'), f);
    const dir = path.dirname(rel);
    return dir === '.' ? '/' : '/' + dir.replace(/\\/g, '/');
  });
const apiRoutes = nonTestSrc
  .filter((f) => /\/app\/api\/.*\/route\.ts$/.test(f))
  .map((f) => '/' + path.dirname(path.relative(path.join(SRC, 'app'), f)).replace(/\\/g, '/'));
const pageRegexes = pageRoutes.map((r) => new RegExp('^' + r.replace(/\[[^\]]+\]/g, '[^/?#]+') + '$'));
const apiRegexes = apiRoutes.map((r) => new RegExp('^' + r.replace(/\[[^\]]+\]/g, '[^/?#]+') + '$'));
const publicSet = new Set(
  walkFiles(path.join(ROOT, 'public')).map((f) => '/' + path.relative(path.join(ROOT, 'public'), f).replace(/\\/g, '/'))
);

const linkOrBtnIssues = [];
const allSrcConcat = nonTestSrc.map((f) => fs.readFileSync(f, 'utf8')).join('\n');
for (const api of apiRoutes) {
  // Strip dynamic [param] segments to verify caller prefix + every static segment
  const staticParts = api.split('/').filter((seg) => seg && !seg.startsWith('['));
  const prefix = '/' + staticParts.slice(0, Math.min(2, staticParts.length)).join('/');
  const callerFiles = nonTestSrc.filter((f) => {
    const rel = path.relative(ROOT, f);
    if (rel.startsWith(`src/app${api}/`)) return false;
    const t = fs.readFileSync(f, 'utf8');
    return t.includes(prefix) && staticParts.every((seg) => t.includes('/' + seg));
  });
  if (callerFiles.length === 0) {
    linkOrBtnIssues.push(`Orphan API route with 0 callers in src/: ${api}`);
  }
}

for (const f of nonTestSrc) {
  const rel = path.relative(ROOT, f);
  const txt = fs.readFileSync(f, 'utf8');
  for (const m of [
    ...txt.matchAll(/\bhref\s*=\s*['"]((?:\/|#)[^'"]*)['"]/g),
    ...txt.matchAll(/\brouter\.(?:push|replace)\s*\(\s*['"](\/[^'"]*)['"]/g),
  ]) {
    const raw = m[1];
    if (raw === '#') {
      linkOrBtnIssues.push(`${rel}: dead href="#"`);
      continue;
    }
    if (raw.startsWith('#')) continue;
    const clean = raw.split('?')[0].split('#')[0].replace(/\/+$/, '') || '/';
    if (clean.startsWith('/api/')) {
      if (!apiRegexes.some((rx) => rx.test(clean))) linkOrBtnIssues.push(`${rel}: broken API link ${raw}`);
    } else if (!publicSet.has(clean) && !pageRegexes.some((rx) => rx.test(clean))) {
      linkOrBtnIssues.push(`${rel}: broken page link ${raw}`);
    }
  }
  if (rel.endsWith('.tsx')) {
    const btnRx = /<button\b([\s\S]*?)>/g;
    let bm;
    while ((bm = btnRx.exec(txt)) !== null) {
      const snippet = txt.slice(bm.index, bm.index + 450);
      const hasHandler = /\bonClick\s*=|\bonMouseDown\s*=|\bonPointerDown\s*=/.test(snippet);
      const isSubmit = /\btype\s*=\s*['"](?:submit|reset)['"]/.test(snippet);
      const isDisabled = /\bdisabled\s*(?:=\{true\}|(?=[\s/>]))/.test(bm[1]);
      const prev160 = txt.slice(Math.max(0, bm.index - 160), bm.index);
      if (!hasHandler && !isSubmit && !isDisabled && !/<Link\b|<a\b|<summary\b/.test(prev160)) {
        const ln = txt.slice(0, bm.index).split('\n').length;
        linkOrBtnIssues.push(`${rel}:${ln}: unwired <button> missing onClick or type="submit"`);
      }
    }
  }
}
if (linkOrBtnIssues.length > 0) {
  console.error(`❌ Zero Orphan APIs, Links & Buttons Guard (${linkOrBtnIssues.length}):`, linkOrBtnIssues);
  failed++;
} else {
  console.log(`✅ Zero Orphan APIs, Links & Buttons Guard: ${pageRoutes.length} pages, ${apiRoutes.length} APIs, 0 broken links, 0 unwired buttons`);
}

// Cross-Page Header Theme-Awareness Guard
const landingPage = read('src/app/page.tsx');
const changelogPage = read('src/app/changelog/page.tsx');
if (landingPage.includes('<header className="dark ') || changelogPage.includes('<header className="dark ')) {
  console.error('❌ Rule 54 Header Theme-Awareness Guard: hardcoded dark header found');
  failed++;
} else {
  console.log('✅ Rule 54 Header Theme-Awareness Guard: 0 hardcoded dark-only page headers');
}

if (failed) {
  console.error(`\n❌ ${failed} governance check(s) failed.`);
  process.exit(1);
}
console.log('\n✅ All nav badges, zero-orphan graph, route/link/button integrity, and source purity checks passed.');
