import fs from 'node:fs';
import path from 'node:path';
import { getCertifiedArchitectureTemplateById } from './certifiedArchitectureTemplates';

const PUBLIC_XML_DIR = path.resolve(process.cwd(), 'public', 'architecture-templates', 'xml');

/**
 * Server-only safe loader for immutable architecture template XMLs.
 * Enforces strict allow-list resolution via getCertifiedArchitectureTemplateById and directory boundary checks.
 */
export function loadImmutableServerTemplateXml(rawTemplateId: string | null | undefined): string | null {
  const tpl = getCertifiedArchitectureTemplateById(rawTemplateId);
  if (!tpl) return null;

  // Safe allow-listed basename only (zero user-controlled path segments)
  const safeFileName = `${path.basename(tpl.slug)}.drawio`;
  const resolvedPath = path.resolve(PUBLIC_XML_DIR, safeFileName);
  if (!resolvedPath.startsWith(PUBLIC_XML_DIR + path.sep)) {
    return null;
  }
  if (!fs.existsSync(resolvedPath)) {
    return null;
  }
  const rawXml = fs.readFileSync(resolvedPath, 'utf8');
  // Return a fresh string copy so callers can never mutate cached template state
  return String(rawXml);
}
