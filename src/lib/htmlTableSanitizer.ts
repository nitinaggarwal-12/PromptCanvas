/**
 * HTML5 Table Foster-Parenting & Copy Sanitizer for Draw.io `html=1` XML cells.
 *
 * Why this exists:
 * When a Draw.io cell value contains an HTML `<table><tr><td>...</td></tr></table>`
 * and code injects a `<span>` or `<div>` directly inside `<tr>...</tr>` OUTSIDE any
 * `<td>`/`<th>` (e.g. `...</td><span>Badge</span></tr>`), browsers execute the HTML5
 * "foster parenting" algorithm and hoist that element ABOVE the entire `<table>`,
 * physically ejecting pills out the top border of every card into neighboring cards.
 */

export interface FosterParentViolation {
  cellId: string;
  snippet: string;
}

function decodeXmlEntities(str: string): string {
  return (str || '')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

function encodeXmlAttrValue(str: string): string {
  return (str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Removes any elements/text appearing directly inside `<tr>...</tr>` outside `<td>` or `<th>`.
 * Preserves all legitimate `<td>...</td>` and `<th>...</th>` content untouched.
 */
function stripFosterParentedTrChildren(rawHtml: string): { html: string; violations: string[] } {
  if (!/<tr\b/i.test(rawHtml)) {
    return { html: rawHtml, violations: [] };
  }
  const violations: string[] = [];
  const cleaned = rawHtml.replace(/(<tr\b[^>]*>)([\s\S]*?)(<\/tr>)/gi, (_full, openTr: string, inner: string, closeTr: string) => {
    // Capture only valid <td>...</td> and <th>...</th> blocks; anything else inside <tr> triggers foster parenting.
    const validCells: string[] = [];
    const cellRe = /<(td|th)\b[^>]*>[\s\S]*?<\/\1>/gi;
    let lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = cellRe.exec(inner)) !== null) {
      const gap = inner.slice(lastIndex, m.index).trim();
      if (gap) {
        violations.push(gap.slice(0, 120));
      }
      validCells.push(m[0]);
      lastIndex = m.index + m[0].length;
    }
    const trailing = inner.slice(lastIndex).trim();
    if (trailing) {
      violations.push(trailing.slice(0, 120));
    }
    if (validCells.length === 0) {
      // Malformed <tr> with no cells at all; don't destroy content silently.
      return `${openTr}${inner}${closeTr}`;
    }
    return `${openTr}${validCells.join('')}${closeTr}`;
  });
  return { html: cleaned, violations };
}

/**
 * Scans all `<mxCell value="...">` entries in a Draw.io XML string and reports any cells
 * containing illegal HTML5 foster-parenting children inside `<tr>` outside `<td>`/`<th>`.
 */
export function findFosterParentedTableCells(xml: string): FosterParentViolation[] {
  if (!xml || !xml.includes('<mxCell')) return [];
  const results: FosterParentViolation[] = [];
  const cellRe = /<mxCell\b([^>]*)>/gi;
  let match: RegExpExecArray | null;
  while ((match = cellRe.exec(xml)) !== null) {
    const attrs = match[1] || '';
    const valMatch = attrs.match(/\bvalue="([^"]*)"/i);
    if (!valMatch || !valMatch[1]) continue;
    const decoded = decodeXmlEntities(valMatch[1]);
    if (!/<tr\b/i.test(decoded)) continue;
    const { violations } = stripFosterParentedTrChildren(decoded);
    if (violations.length > 0) {
      const idMatch = attrs.match(/\bid="([^"]*)"/i);
      results.push({
        cellId: idMatch ? idMatch[1] : 'unknown',
        snippet: violations[0],
      });
    }
  }
  return results;
}

/**
 * Deterministically removes illegal foster-parenting children inside `<tr>` across all
 * `<mxCell value="...">` elements in a Draw.io XML document.
 */
export function healFosterParentedHtmlInXml(xml: string): { xml: string; healedCount: number } {
  if (!xml || !xml.includes('<mxCell')) {
    return { xml: xml || '', healedCount: 0 };
  }
  let healedCount = 0;
  const nextXml = xml.replace(/(<mxCell\b[^>]*\bvalue=")([^"]*)(")/gi, (full, prefix: string, rawVal: string, suffix: string) => {
    if (!rawVal) return full;
    const decoded = decodeXmlEntities(rawVal);
    if (!/<tr\b/i.test(decoded)) return full;
    const { html, violations } = stripFosterParentedTrChildren(decoded);
    if (violations.length === 0) return full;
    healedCount++;
    return `${prefix}${encodeXmlAttrValue(html)}${suffix}`;
  });
  return { xml: nextXml, healedCount };
}

/**
 * Normalizes deprecated Google Cloud product names and common LLM typos in diagram copy.
 */
export function normalizeModernGcpCopy(text: string): string {
  if (!text) return '';
  return text
    .replace(/\bGemini\s+Agentspace\b/gi, 'Gemini Enterprise')
    .replace(/\bGoogle\s+Agentspace\b/gi, 'Gemini Enterprise')
    .replace(/\bAgentspace\b/gi, 'Gemini Enterprise')
    .replace(/\bDuet\s+AI\b/gi, 'Gemini Code Assist')
    .replace(/\bRate\s+Limiting\s*(&amp;|&)\s*Quotes\b/gi, 'Rate Limiting $1 Quotas')
    .replace(/\bLimiting\s*(&amp;|&)\s*Quotes\b/gi, 'Limiting $1 Quotas');
}
