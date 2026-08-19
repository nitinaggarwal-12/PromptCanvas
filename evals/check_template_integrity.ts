/**
 * Template integrity checks for the blueprint corpus.
 *
 * Three failures this catches, none of which any existing check catches:
 *   1. EMPTY    — template renders nothing (zero vertices). Passes every
 *                 geometry and XML validator, because there is nothing to fail.
 *   2. DUPLICATE— several filenames resolve to byte-equivalent node content.
 *                 A catalog of 151 files representing 57 diagrams is not a
 *                 catalog of 151 blueprints.
 *   3. MISNAMED — the filename claims an architecture the node labels do not
 *                 contain (e.g. a `_gcp_` lakehouse built from Amazon S3).
 *
 * Usage:
 *   npx tsx evals/check_template_integrity.ts templates/master_blueprints/xml/*.xml
 *   npx tsx evals/check_template_integrity.ts --json <files>
 *   npx tsx evals/check_template_integrity.ts --allow evals/template-integrity-allowlist.json <files>
 *
 * Exits 1 on any violation not present in the allowlist. The allowlist exists so
 * this can be turned on today against a corpus that currently fails, and
 * ratcheted down as entries are fixed — NOT so violations can be ignored
 * indefinitely. Entries removed from the allowlist must never be re-added.
 */
import { readFileSync, existsSync } from 'fs';
import { basename } from 'path';
import { createHash } from 'crypto';

interface Violation {
  kind: 'EMPTY' | 'DUPLICATE' | 'MISNAMED';
  file: string;
  detail: string;
}

/** Tokens in a filename that assert something must appear in the diagram. */
const NAME_ASSERTIONS: Record<string, { must: string[]; forbid?: string[] }> = {
  gcp: {
    must: ['gcp', 'google cloud', 'cloud run', 'bigquery', 'vertex', 'pub/sub', 'gke', 'cloud sql', 'gemini', 'looker', 'dataflow', 'spanner', 'apigee'],
    forbid: ['amazon s3', 'dynamodb', 'kinesis', 'aws lambda', 'redshift', 'lake formation'],
  },
  aws: {
    must: ['aws', 'amazon', 's3', 'lambda', 'dynamodb', 'eks', 'kinesis', 'redshift', 'glue'],
  },
  azure: { must: ['azure', 'cosmos', 'synapse', 'aks'] },
  lakehouse: { must: ['lakehouse', 'lake', 'catalog', 'warehouse', 'bigquery', 'iceberg', 'delta', 'glue', 'parquet'] },
  streaming: { must: ['stream', 'kafka', 'pub/sub', 'kinesis', 'dataflow', 'flink', 'firehose'] },
  erd: { must: ['pk', 'fk', 'dim_', 'fact_', 'schema', 'entity', 'table'] },
  rag: { must: ['rag', 'embedding', 'vector', 'retriev', 'chunk', 'knowledge'] },
  cicd: { must: ['ci', 'cd', 'build', 'deploy', 'pipeline', 'artifact', 'gitops', 'commit'] },
  iam: { must: ['iam', 'identity', 'sso', 'auth', 'rbac', 'role', 'principal'] },
  vpc: { must: ['vpc', 'subnet', 'firewall', 'peering', 'nat', 'route', 'network'] },
  retail: { must: ['retail', 'ecommerce', 'e-commerce', 'store', 'cart', 'order', 'omnichannel', 'merchand'] },
  fintech: { must: ['payment', 'bank', 'financial', 'transaction', 'ledger', 'wealth', 'fraud', 'portfolio'] },
  supply: { must: ['supply', 'logistic', 'inventory', 'warehouse', 'shipment', 'procure', 'supplier'] },
  hr: { must: ['hr', 'talent', 'workforce', 'employee', 'candidate', 'recruit', 'hiring'] },
  observability: { must: ['observab', 'metric', 'trace', 'log', 'slo', 'alert', 'monitor'] },
  finops: { must: ['cost', 'finops', 'billing', 'chargeback', 'budget', 'showback'] },
  healthcare: { must: ['fhir', 'hl7', 'patient', 'clinical', 'ehr', 'health', 'phi'] },
};

function vertexLabels(xml: string): string[] {
  const labels: string[] = [];
  const cellRe = /<mxCell([^>]*?)\/?>/g;
  let m: RegExpExecArray | null;
  while ((m = cellRe.exec(xml)) !== null) {
    const attrs = m[1];
    if (!/vertex="1"/.test(attrs)) continue;
    const v = /value="([^"]*)"/.exec(attrs);
    if (!v) continue;
    const text = v[1]
      .replace(/&(amp;)+/g, '&')
      .replace(/&lt;[^&]*?&gt;/g, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&[a-z]+;/g, ' ')
      .trim();
    if (text.length > 1) labels.push(text);
  }
  return labels;
}

function countVertices(xml: string): number {
  return (xml.match(/vertex="1"/g) ?? []).length;
}

/** Normalized content fingerprint: the sorted set of vertex labels. */
function contentHash(labels: string[]): string {
  const norm = [...new Set(labels.map((l) => l.toLowerCase().replace(/\s+/g, ' ').trim()))].sort();
  return createHash('sha256').update(norm.join('|')).digest('hex').slice(0, 16);
}

export function checkCorpus(files: string[]): Violation[] {
  const violations: Violation[] = [];
  const byHash = new Map<string, string[]>();

  for (const file of files) {
    const name = basename(file);
    let xml: string;
    try {
      xml = readFileSync(file, 'utf8');
    } catch (err) {
      violations.push({ kind: 'EMPTY', file: name, detail: `unreadable: ${(err as Error).message}` });
      continue;
    }

    const nVerts = countVertices(xml);
    if (nVerts === 0) {
      violations.push({ kind: 'EMPTY', file: name, detail: 'zero vertices — renders blank' });
      continue; // an empty file can't be meaningfully deduped or name-checked
    }

    const labels = vertexLabels(xml);
    const h = contentHash(labels);
    if (!byHash.has(h)) byHash.set(h, []);
    byHash.get(h)!.push(name);

    // --- name assertions ---
    const haystack = labels.join(' ').toLowerCase();
    const lowerName = name.toLowerCase();
    for (const [token, rule] of Object.entries(NAME_ASSERTIONS)) {
      if (!lowerName.includes(token)) continue;
      // Short keywords ("hr", "ci", "cd", "pk") match inside unrelated words
      // ("through", "threshold"), which silently hides real mismatches.
      // Anything <= 4 chars must match on a word boundary.
      const present = (k: string) =>
        k.length > 4
          ? haystack.includes(k)
          : new RegExp(`(^|[^a-z0-9])${k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^a-z0-9]|$)`).test(haystack);
      if (!rule.must.some(present)) {
        violations.push({
          kind: 'MISNAMED',
          file: name,
          detail: `name asserts "${token}" but no matching term appears in node labels`,
        });
      }
      for (const bad of rule.forbid ?? []) {
        if (haystack.includes(bad)) {
          violations.push({
            kind: 'MISNAMED',
            file: name,
            detail: `name asserts "${token}" but diagram contains "${bad}"`,
          });
        }
      }
    }
  }

  for (const [h, names] of byHash) {
    if (names.length < 2) continue;
    const [keep, ...rest] = names.sort();
    for (const dup of rest) {
      violations.push({
        kind: 'DUPLICATE',
        file: dup,
        detail: `identical node content to ${keep} (group of ${names.length}, hash ${h})`,
      });
    }
  }

  return violations;
}

// ---------------- CLI ----------------

function main(): void {
  const argv = process.argv.slice(2);
  const asJson = argv.includes('--json');
  const aIdx = argv.indexOf('--allow');
  const allowPath = aIdx >= 0 ? argv[aIdx + 1] : undefined;
  const files = argv.filter((a, i) => !a.startsWith('--') && i !== aIdx + 1 && a.endsWith('.xml'));

  if (files.length === 0) {
    console.error('usage: npx tsx evals/check_template_integrity.ts [--json] [--allow <file>] <*.xml>');
    process.exit(2);
  }

  const all = checkCorpus(files);

  let allow: Set<string> = new Set();
  if (allowPath && existsSync(allowPath)) {
    const raw = JSON.parse(readFileSync(allowPath, 'utf8')) as { allow: string[] };
    allow = new Set(raw.allow);
  }
  const key = (v: Violation) => `${v.kind}:${v.file}`;
  const blocking = all.filter((v) => !allow.has(key(v)));

  if (asJson) {
    console.log(JSON.stringify({ total: all.length, blocking: blocking.length, violations: all }, null, 2));
  } else {
    const counts = all.reduce<Record<string, number>>((a, v) => ({ ...a, [v.kind]: (a[v.kind] ?? 0) + 1 }), {});
    console.log(
      `scanned ${files.length} templates — ` +
      `EMPTY=${counts.EMPTY ?? 0} DUPLICATE=${counts.DUPLICATE ?? 0} MISNAMED=${counts.MISNAMED ?? 0} ` +
      `(${blocking.length} blocking, ${all.length - blocking.length} allowlisted)`,
    );
    for (const v of blocking) console.log(`  ${v.kind.padEnd(9)} ${v.file}\n            ${v.detail}`);
  }

  if (blocking.length > 0) {
    console.error(`\n${blocking.length} template integrity violation(s) not in the allowlist.`);
    process.exit(1);
  }
}

if (process.argv[1] && process.argv[1].includes('check_template_integrity')) main();
