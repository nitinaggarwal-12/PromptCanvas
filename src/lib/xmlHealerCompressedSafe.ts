import {
  validateAndHealDrawioXml as validateAndHealDrawioXmlRaw,
} from './xmlHealer';
import type { XmlHealerResult } from './xmlHealer';

export type { XmlHealerResult } from './xmlHealer';

/**
 * Detect a valid diagrams.net compressed <diagram> payload.
 *
 * Compressed Draw.io documents intentionally do not expose mxCell/vertex markers until
 * the viewer inflates the diagram body. The legacy healer used the absence of
 * vertex="1" as an "empty diagram" signal, which caused compressed masters to be
 * replaced with a fallback architecture before rendering.
 */
export function isCompressedDrawioXml(inputXml: string): boolean {
  if (!inputXml || typeof inputXml !== 'string') return false;
  if (!inputXml.includes('<mxfile') || inputXml.includes('<mxGraphModel')) return false;

  const diagramBody = inputXml.match(/<diagram\b[^>]*>([\s\S]*?)<\/diagram>/i)?.[1]?.trim() || '';
  if (diagramBody.length < 100) return false;

  // diagrams.net compressed payloads are deflate/base64 text. Whitespace is harmless.
  return /^[A-Za-z0-9+/=\s]+$/.test(diagramBody);
}

/**
 * Runtime-safe wrapper around the existing XML healer.
 *
 * - Valid compressed Draw.io masters are preserved byte-for-byte for the official
 *   diagrams.net viewer to inflate.
 * - All ordinary/uncompressed diagrams continue through the existing healer unchanged.
 */
export function validateAndHealDrawioXml(inputXml: string, archType?: string): XmlHealerResult {
  if (isCompressedDrawioXml(inputXml)) {
    return {
      isValid: true,
      isHealed: false,
      xml: inputXml.trim(),
      healingLog: ['Preserved valid compressed Draw.io master; deferred inflation to diagrams.net viewer.'],
    };
  }

  return validateAndHealDrawioXmlRaw(inputXml, archType);
}
