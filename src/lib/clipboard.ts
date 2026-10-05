/**
 * Clipboard helper with a graceful fallback.
 *
 * `navigator.clipboard.writeText` is only available in secure contexts
 * (https / localhost) and may be denied by permissions policy inside
 * embedded frames. Several studio panels previously called it unguarded,
 * which surfaced as an uncaught promise rejection and a "Copied" badge that
 * lied about the outcome. This helper returns an honest boolean so callers
 * can show the right feedback.
 */
export async function copyTextToClipboard(text: string): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fall through to the legacy path
  }

  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', 'true');
    textarea.setAttribute('aria-hidden', 'true');
    textarea.style.position = 'fixed';
    textarea.style.top = '-1000px';
    textarea.style.left = '-1000px';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    textarea.setSelectionRange(0, text.length);
    const ok = document.execCommand('copy');
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
}
