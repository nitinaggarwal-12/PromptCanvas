import { getApprovedDevopsCicdBlueprintXml as buildApprovedBlueprint24 } from './approvedBlueprint24';

/**
 * Draw.io HTML labels live inside XML attributes. The approved Blueprint 24
 * builder intentionally keeps its layout readable in source, so this final
 * pass encodes only raw HTML-bearing value attributes while leaving already
 * encoded rich labels untouched.
 */
function normalizeHtmlValueAttributes(xml: string): string {
  return xml.replace(/value="([\s\S]*?)" style="/g, (full, value: string) => {
    const needsEncoding = value.includes('<') || value.includes('>') || value.includes('"') || value.includes('&nbsp;');
    if (!needsEncoding || value.includes('&lt;')) return full;

    const encoded = value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
    return `value="${encoded}" style="`;
  });
}

export function getApprovedDevopsCicdBlueprintXml(): string {
  return normalizeHtmlValueAttributes(buildApprovedBlueprint24());
}
