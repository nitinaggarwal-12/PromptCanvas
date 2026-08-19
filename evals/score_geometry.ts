/**
 * Deterministic geometry scorer for Draw.io / mxGraph XML.
 *
 * Measures visual-quality defects that require no model and no human:
 *   - sibling node overlap
 *   - edge crossings (straight-line, center-to-center)
 *   - label overflow (heuristic)
 *   - out-of-container children
 *
 * Usage:
 *   npx tsx evals/score_geometry.ts diagrams/latest/*.xml
 *   npx tsx evals/score_geometry.ts --json diagrams/latest/*.xml > evals/results/geometry.json
 *   npx tsx evals/score_geometry.ts --baseline evals/results/geometry.json diagrams/latest/*.xml
 *
 * Exit code 1 when --baseline is supplied and any metric regressed beyond tolerance.
 *
 * CAVEATS (read before quoting any number):
 *   - Crossings use straight center-to-center segments. Orthogonal routing with
 *     waypoints will differ; treat this as a directional proxy, not ground truth.
 *   - Label overflow uses a character-width heuristic (CHAR_PX), not font metrics.
 *   - Overlap is computed among siblings sharing a parent. A renderer that nests
 *     children under flat parents will report legitimate containment as overlap.
 *   Validate against rendered PNGs before treating these as authoritative.
 */
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { XMLParser } from 'fast-xml-parser';

const CHAR_PX = 6.5;          // approx advance width at default label size
const WRAP_FACTOR = 2.2;      // assumed lines of wrap available inside a node
const EPS = 1;                // px tolerance before an overlap counts

interface Cell {
  id: string; x: number; y: number; w: number; h: number;
  vertex: boolean; edge: boolean;
  source?: string; target?: string; parent?: string; label: string;
}

export interface GeometryScore {
  file: string;
  nodes: number;
  edges: number;
  overlaps: number;
  crossings: number;
  labelOverflow: number;
  outOfContainer: number;
  crossingsPerEdge: number;
  clean: boolean;
}

function toNum(v: unknown): number {
  const n = typeof v === 'number' ? v : parseFloat(String(v ?? '0'));
  return Number.isFinite(n) ? n : 0;
}

function collectCells(node: unknown, out: Cell[]): void {
  if (node === null || typeof node !== 'object') return;
  const obj = node as Record<string, unknown>;
  for (const [key, value] of Object.entries(obj)) {
    const items = Array.isArray(value) ? value : [value];
    for (const item of items) {
      if (key === 'mxCell' && item && typeof item === 'object') {
        const c = item as Record<string, unknown>;
        const geo = (c.mxGeometry ?? {}) as Record<string, unknown>;
        const id = c['@_id'];
        if (id !== undefined) {
          out.push({
            id: String(id),
            x: toNum(geo['@_x']), y: toNum(geo['@_y']),
            w: toNum(geo['@_width']), h: toNum(geo['@_height']),
            vertex: String(c['@_vertex']) === '1',
            edge: String(c['@_edge']) === '1',
            source: c['@_source'] === undefined ? undefined : String(c['@_source']),
            target: c['@_target'] === undefined ? undefined : String(c['@_target']),
            parent: c['@_parent'] === undefined ? undefined : String(c['@_parent']),
            label: String(c['@_value'] ?? ''),
          });
        }
      }
      collectCells(item, out);
    }
  }
}

function segmentsCross(
  p: [number, number], q: [number, number],
  r: [number, number], s: [number, number],
): boolean {
  const dir = (a: [number, number], b: [number, number], c: [number, number]) =>
    (c[1] - a[1]) * (b[0] - a[0]) - (b[1] - a[1]) * (c[0] - a[0]);
  const d1 = dir(r, s, p), d2 = dir(r, s, q), d3 = dir(p, q, r), d4 = dir(p, q, s);
  return (d1 > 0) !== (d2 > 0) && (d3 > 0) !== (d4 > 0);
}

export function scoreXml(xml: string, file = '<inline>'): GeometryScore {
  const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '@_' });
  const cells: Cell[] = [];
  collectCells(parser.parse(xml), cells);

  const byId = new Map(cells.map((c) => [c.id, c]));
  const verts = cells.filter((c) => c.vertex && c.w > 0 && c.h > 0);

  // --- sibling overlap ---
  const bySibling = new Map<string, Cell[]>();
  for (const v of verts) {
    const key = v.parent ?? '__root__';
    if (!bySibling.has(key)) bySibling.set(key, []);
    bySibling.get(key)!.push(v);
  }
  let overlaps = 0;
  for (const group of bySibling.values()) {
    for (let i = 0; i < group.length; i++) {
      for (let j = i + 1; j < group.length; j++) {
        const a = group[i], b = group[j];
        const ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
        const oy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
        if (ox > EPS && oy > EPS) overlaps++;
      }
    }
  }

  // --- edge crossings ---
  const segments: Array<[[number, number], [number, number]]> = [];
  for (const c of cells) {
    if (!c.edge || !c.source || !c.target) continue;
    const a = byId.get(c.source), b = byId.get(c.target);
    if (!a || !b) continue;
    segments.push([
      [a.x + a.w / 2, a.y + a.h / 2],
      [b.x + b.w / 2, b.y + b.h / 2],
    ]);
  }
  let crossings = 0;
  for (let i = 0; i < segments.length; i++) {
    for (let j = i + 1; j < segments.length; j++) {
      if (segmentsCross(segments[i][0], segments[i][1], segments[j][0], segments[j][1])) crossings++;
    }
  }

  // --- label overflow ---
  const labelOverflow = verts.filter(
    (v) => v.label.trim().length > 0 && v.label.trim().length * CHAR_PX > v.w * WRAP_FACTOR,
  ).length;

  // --- children escaping their container ---
  let outOfContainer = 0;
  for (const v of verts) {
    const p = v.parent ? byId.get(v.parent) : undefined;
    if (!p || !p.vertex || p.w <= 0 || p.h <= 0) continue;
    if (v.x < -EPS || v.y < -EPS || v.x + v.w > p.w + EPS || v.y + v.h > p.h + EPS) outOfContainer++;
  }

  return {
    file,
    nodes: verts.length,
    edges: segments.length,
    overlaps,
    crossings,
    labelOverflow,
    outOfContainer,
    crossingsPerEdge: segments.length ? +(crossings / segments.length).toFixed(2) : 0,
    clean: overlaps === 0 && crossings === 0 && outOfContainer === 0,
  };
}

// ---------------- CLI ----------------

function main(): void {
  const argv = process.argv.slice(2);
  const asJson = argv.includes('--json');
  const bIdx = argv.indexOf('--baseline');
  const baselinePath = bIdx >= 0 ? argv[bIdx + 1] : undefined;
  const files = argv.filter(
    (a, i) => !a.startsWith('--') && i !== bIdx + 1 && a.endsWith('.xml'),
  );

  if (files.length === 0) {
    console.error('usage: npx tsx evals/score_geometry.ts [--json] [--baseline <file>] <*.xml>');
    process.exit(2);
  }

  const scores: GeometryScore[] = [];
  for (const f of files) {
    try {
      scores.push(scoreXml(readFileSync(f, 'utf8'), f));
    } catch (err) {
      console.error(`PARSE FAIL  ${f}: ${(err as Error).message}`);
      process.exitCode = 1;
    }
  }

  const totals = scores.reduce(
    (acc, s) => ({
      nodes: acc.nodes + s.nodes,
      edges: acc.edges + s.edges,
      overlaps: acc.overlaps + s.overlaps,
      crossings: acc.crossings + s.crossings,
      labelOverflow: acc.labelOverflow + s.labelOverflow,
      outOfContainer: acc.outOfContainer + s.outOfContainer,
    }),
    { nodes: 0, edges: 0, overlaps: 0, crossings: 0, labelOverflow: 0, outOfContainer: 0 },
  );
  const cleanCount = scores.filter((s) => s.clean).length;
  const cleanRate = scores.length ? cleanCount / scores.length : 0;

  const report = { generatedAt: new Date().toISOString(), totals, cleanRate: +cleanRate.toFixed(4), scores };

  if (asJson) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    console.log(
      'file'.padEnd(52) + 'nodes'.padStart(6) + 'edges'.padStart(6) +
      'ovlp'.padStart(6) + 'cross'.padStart(6) + 'lbl'.padStart(5) + 'esc'.padStart(5),
    );
    for (const s of scores) {
      console.log(
        s.file.slice(-52).padEnd(52) + String(s.nodes).padStart(6) + String(s.edges).padStart(6) +
        String(s.overlaps).padStart(6) + String(s.crossings).padStart(6) +
        String(s.labelOverflow).padStart(5) + String(s.outOfContainer).padStart(5),
      );
    }
    console.log(
      `\nfiles=${scores.length}  clean=${cleanCount} (${(cleanRate * 100).toFixed(0)}%)  ` +
      `overlaps=${totals.overlaps}  crossings=${totals.crossings}  ` +
      `labelOverflow=${totals.labelOverflow}  outOfContainer=${totals.outOfContainer}`,
    );
  }

  if (baselinePath) {
    if (!existsSync(baselinePath)) {
      console.error(`\nBaseline ${baselinePath} not found — writing current run as the new baseline.`);
      writeFileSync(baselinePath, JSON.stringify(report, null, 2));
      return;
    }
    const base = JSON.parse(readFileSync(baselinePath, 'utf8')) as typeof report;
    const regressions: string[] = [];
    if (cleanRate < base.cleanRate - 0.02) {
      regressions.push(`clean rate ${(cleanRate * 100).toFixed(1)}% < baseline ${(base.cleanRate * 100).toFixed(1)}% - 2pp`);
    }
    for (const k of ['overlaps', 'crossings', 'outOfContainer'] as const) {
      if (totals[k] > base.totals[k]) regressions.push(`${k} ${totals[k]} > baseline ${base.totals[k]}`);
    }
    if (regressions.length) {
      console.error('\nGEOMETRY REGRESSION:\n  ' + regressions.join('\n  '));
      process.exit(1);
    }
    console.log('\nNo geometry regression vs baseline.');
  }
}

if (process.argv[1] && process.argv[1].includes('score_geometry')) main();
