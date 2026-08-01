/**
 * CI tripwire for the "23 identical diagrams" failure class.
 * Fails when more than MAX_DUP differently-named diagram exports share identical content,
 * indicating template domain adaptation has silently stopped working.
 * Baseline ratchet: hashes in scripts/corpus-baseline.json are known legacy duplicates and
 * only warn. Delete the baseline file after the legacy data refresh to go fully strict.
 * Usage: npx tsx scripts/check-corpus-duplicates.ts [diagrams/latest]
 */
import * as fs from 'fs';
import { createHash } from 'crypto';

const dir = process.argv[2] || 'diagrams/latest';
const MAX_DUP = 4; // hdc/hsdc mirrored seed projects legitimately share content pairwise

if (!fs.existsSync(dir)) { console.log(`[corpus-check] ${dir} not present, skipping`); process.exit(0); }
const byHash: Record<string, string[]> = {};
for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.xml'))) {
  const h = createHash('md5').update(fs.readFileSync(`${dir}/${f}`)).digest('hex');
  (byHash[h] ||= []).push(f);
}
const baselinePath = 'scripts/corpus-baseline.json';
const baseline: string[] = fs.existsSync(baselinePath) ? JSON.parse(fs.readFileSync(baselinePath, 'utf8')) : [];
// Same-domain duplicates are legitimate: adaptation is deterministic, so five canvases
// about the same domain correctly share identical adapted XML. Only CROSS-domain
// duplication signals broken adaptation. A group is same-domain when some content word
// (>=6 chars) appears in every filename of the group.
function isSameDomainGroup(files: string[]): boolean {
  const tokenize = (f: string) => new Set(f.toLowerCase().replace(/\.xml$/, '').split(/[^a-z]+/).filter(t => t.length >= 6));
  const sets = files.map(tokenize);
  for (const tok of sets[0]) if (sets.every(set => set.has(tok))) return true;
  return false;
}
const allOffenders = Object.entries(byHash).filter(([, files]) => files.length > MAX_DUP && !isSameDomainGroup(files));
for (const [h, files] of Object.entries(byHash).filter(([, f]) => f.length > MAX_DUP && isSameDomainGroup(f)))
  console.log(`[corpus-check] OK (same-domain group): ${h.slice(0, 8)} x${files.length}`);
const grandfathered = allOffenders.filter(([h]) => baseline.includes(h));
const offenders = allOffenders.filter(([h]) => !baseline.includes(h));
for (const [h, files] of grandfathered)
  console.warn(`[corpus-check] WARN (baselined legacy): ${h.slice(0, 8)} x${files.length} — refresh pending`);
if (offenders.length) {
  console.error(`[corpus-check] FAIL: ${offenders.length} content group(s) exceed ${MAX_DUP} identical files:`);
  for (const [h, files] of offenders) console.error(`  ${h.slice(0, 8)} x${files.length}: ${files.slice(0, 5).join(', ')}${files.length > 5 ? ' ...' : ''}`);
  console.error('[corpus-check] Template domain adaptation may have regressed (see tests/unit/template-adaptation.test.ts).');
  process.exit(1);
}
console.log(`[corpus-check] OK: no new duplicate group exceeds ${MAX_DUP} files (${Object.keys(byHash).length} unique / ${Object.values(byHash).flat().length} total)`);
