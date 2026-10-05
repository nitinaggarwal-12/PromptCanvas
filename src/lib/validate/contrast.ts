/**
 * WCAG 2.x contrast audit for Draw.io XML — computes REAL fill/font contrast ratios per
 * vertex instead of asserting a hardcoded "WCAG AAA" badge.
 */

export interface ContrastPair {
  cellId: string;
  label: string;
  fill: string;
  font: string;
  ratio: number;
}

export type ContrastGrade = 'AAA' | 'AA' | 'AA Large' | 'Fail' | 'N/A';

export interface ContrastAudit {
  pairsEvaluated: number;
  minRatio: number | null;
  grade: ContrastGrade;
  worst: ContrastPair | null;
  failing: ContrastPair[];
}

function normalizeHex(raw: string | undefined | null): string | null {
  if (!raw) return null;
  let v = raw.trim().toLowerCase();
  if (v === 'none' || v === 'default' || v === 'inherit') return null;
  if (!v.startsWith('#')) return null;
  v = v.slice(1);
  if (v.length === 3) v = v.split('').map((c) => c + c).join('');
  if (v.length === 8) v = v.slice(0, 6);
  if (!/^[0-9a-f]{6}$/.test(v)) return null;
  return `#${v}`;
}

function channel(c: number): number {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

export function relativeLuminance(hex: string): number {
  const h = normalizeHex(hex) || '#ffffff';
  const r = parseInt(h.slice(1, 3), 16);
  const g = parseInt(h.slice(3, 5), 16);
  const b = parseInt(h.slice(5, 7), 16);
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

export function contrastRatio(a: string, b: string): number {
  const l1 = relativeLuminance(a);
  const l2 = relativeLuminance(b);
  const light = Math.max(l1, l2);
  const dark = Math.min(l1, l2);
  return Math.round(((light + 0.05) / (dark + 0.05)) * 100) / 100;
}

export function gradeForRatio(ratio: number | null): ContrastGrade {
  if (ratio === null) return 'N/A';
  if (ratio >= 7) return 'AAA';
  if (ratio >= 4.5) return 'AA';
  if (ratio >= 3) return 'AA Large';
  return 'Fail';
}

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

/**
 * Walks every vertex mxCell, resolves fill (style fillColor, default white) and font colour
 * (style fontColor, inline `color:` in the HTML label, default #000000) and returns the
 * weakest pair. Transparent fills are evaluated against the page background (#ffffff).
 */
export function auditXmlContrast(xml: string, pageBackground: string = '#ffffff'): ContrastAudit {
  if (!xml || typeof xml !== 'string') {
    return { pairsEvaluated: 0, minRatio: null, grade: 'N/A', worst: null, failing: [] };
  }
  const cellRegex = /<mxCell\b([^>]*)\bvertex="1"[^>]*>/gi;
  const pairs: ContrastPair[] = [];
  let m: RegExpExecArray | null;
  while ((m = cellRegex.exec(xml)) !== null) {
    const attrs = m[0];
    const style = (attrs.match(/\bstyle="([^"]*)"/) || [])[1] || '';
    if (/edgeStyle|shape=image|^image;|;image=|text;html=1;strokeColor=none;fillColor=none/i.test(style) && !/fontColor/.test(style)) {
      // image cells and pure invisible text containers without explicit colours are skipped
      if (/shape=image|^image;|;image=/i.test(style)) continue;
    }
    const id = (attrs.match(/\bid="([^"]*)"/) || [])[1] || '';
    const rawValue = decodeEntities((attrs.match(/\bvalue="([^"]*)"/) || [])[1] || '');
    const label = rawValue.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    if (!label) continue; // nothing to read → no contrast requirement

    const fill = normalizeHex((style.match(/fillColor=([^;]+)/) || [])[1]) || pageBackground;
    const inlineColor = (rawValue.match(/color:\s*(#[0-9a-fA-F]{3,8})/) || [])[1];
    const font = normalizeHex((style.match(/fontColor=([^;]+)/) || [])[1]) || normalizeHex(inlineColor) || '#000000';
    pairs.push({ cellId: id, label: label.slice(0, 60), fill, font, ratio: contrastRatio(fill, font) });
  }

  if (pairs.length === 0) {
    return { pairsEvaluated: 0, minRatio: null, grade: 'N/A', worst: null, failing: [] };
  }
  const sorted = [...pairs].sort((a, b) => a.ratio - b.ratio);
  const worst = sorted[0];
  return {
    pairsEvaluated: pairs.length,
    minRatio: worst.ratio,
    grade: gradeForRatio(worst.ratio),
    worst,
    failing: sorted.filter((p) => p.ratio < 4.5).slice(0, 5),
  };
}
