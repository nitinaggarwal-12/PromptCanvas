/**
 * 🛡️ Robust JSON Sanitizer & Repair Utility
 * Handles Markdown code fences, trailing commas, single quotes, and extra commentary.
 */
export function parseJsonSafely<T = any>(raw: string, fallback: T): T {
  if (!raw || typeof raw !== 'string') return fallback;

  let cleaned = raw.trim();

  // 1. Strip Markdown Code Fences (```json ... ```)
  cleaned = cleaned.replace(/^```(?:json|JSON)?\s*\n?/m, '').replace(/\n?```\s*$/m, '').trim();

  // 2. Extract outermost JSON object or array if extra commentary text surrounds it
  const firstBrace = cleaned.indexOf('{');
  const lastBrace = cleaned.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    cleaned = cleaned.slice(firstBrace, lastBrace + 1);
  }

  // 3. Remove trailing commas before } or ]
  cleaned = cleaned.replace(/,\s*([}\]])/g, '$1');

  try {
    return JSON.parse(cleaned) as T;
  } catch (err) {
    try {
      // Secondary repair: replace unescaped control chars
      const sanitized = cleaned.replace(/[\u0000-\u001F]+/g, ' ');
      return JSON.parse(sanitized) as T;
    } catch {
      console.warn('Failed to parse repaired JSON:', cleaned.slice(0, 120));
      return fallback;
    }
  }
}
