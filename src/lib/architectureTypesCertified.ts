import type { ArchitectureTypeOption as VisualArchitectureTypeOption } from './architectureTypesVisual';
import {
  BUSINESS_ARCHITECTURE_TYPES as VISUAL_BUSINESS_ARCHITECTURE_TYPES,
  TECHNICAL_ARCHITECTURE_TYPES as VISUAL_TECHNICAL_ARCHITECTURE_TYPES,
  ARCHITECTURE_TYPES as VISUAL_ARCHITECTURE_TYPES,
  normalizeArchitectureId as visualNormalizeArchitectureId,
  getArchitectureTypeById as visualGetArchitectureTypeById,
  getTemplateTitle as visualGetTemplateTitle,
  getDefaultXmlForArchitecture as visualGetDefaultXmlForArchitecture,
} from './architectureTypesVisual';
import {
  CATALOG_BLUEPRINT_NUMBERS,
  CATALOG_CANONICAL_IDS,
  getExactCatalogBlueprintXml,
} from './blueprintExactResolver';

export type ArchitectureTypeOption = VisualArchitectureTypeOption;
export const BUSINESS_ARCHITECTURE_TYPES = VISUAL_BUSINESS_ARCHITECTURE_TYPES;
export const TECHNICAL_ARCHITECTURE_TYPES = VISUAL_TECHNICAL_ARCHITECTURE_TYPES;
export const ARCHITECTURE_TYPES = VISUAL_ARCHITECTURE_TYPES;
export const normalizeArchitectureId = visualNormalizeArchitectureId;
export const getArchitectureTypeById = visualGetArchitectureTypeById;
export const getTemplateTitle = visualGetTemplateTitle;

const NOTATION_SENSITIVE_IDS = new Set([
  'erd',
  'sequence_diagram',
  'tech_c4_system_context',
  'c4_component_lld',
  'bpmn_process_workflow',
  'threat_modeling_stride',
  'data_lineage_provenance',
]);

const REVIEW_EXTENSION_IDS = new Set<string>(Object.keys(CATALOG_BLUEPRINT_NUMBERS));
const REGISTERED_BLUEPRINT_IDS = new Set<string>([
  ...CATALOG_CANONICAL_IDS,
  ...REVIEW_EXTENSION_IDS,
]);
const BLUEPRINT_ID_PREFIX_RE = /^(?:p\d-|ind-|arch-)/i;
const EMOJI_RE = /\p{Extended_Pictographic}/gu;
const MIN_FONT = 9.5;

function finalReadableFontFloor(xml: string): string {
  const styleFloor = xml.replace(/fontSize=(\d+(?:\.\d+)?)/gi, (full, raw) => {
    const value = Number(raw);
    return Number.isFinite(value) && value < MIN_FONT ? `fontSize=${MIN_FONT}` : full;
  });

  return styleFloor.replace(/font-size:\s*(\d+(?:\.\d+)?)px/gi, (full, raw) => {
    const value = Number(raw);
    return Number.isFinite(value) && value < MIN_FONT ? `font-size:${MIN_FONT}px` : full;
  });
}

function ensureValidXmlEntities(xml: string): string {
  return xml.replace(/&(?!([a-zA-Z0-9]+|#\d+|#x[0-9a-fA-F]+);)/g, '&amp;');
}

function finalNonNotationSanitize(xml: string, architectureId?: string | null): string {
  if (!xml) return xml;
  const id = visualNormalizeArchitectureId(architectureId);
  let next = xml;

  if (!next.includes('pc-final-catalog-sanitize-v1') && !NOTATION_SENSITIVE_IDS.has(id)) {
    next = next
      .replace(EMOJI_RE, '')
      .replace(/\uFE0F/g, '')
      .replace(/\u200D/g, '');
    next = finalReadableFontFloor(next);
    next = next.replace(/(<mxGraphModel\b)/, '<!-- pc-final-catalog-sanitize-v1 -->\n$1');
  }

  return ensureValidXmlEntities(next);
}

function assertRegisteredBlueprintId(archId?: string | null): void {
  const raw = String(archId || '').trim();
  if (!raw || !BLUEPRINT_ID_PREFIX_RE.test(raw)) return;

  const normalized = visualNormalizeArchitectureId(raw);
  if (!REGISTERED_BLUEPRINT_IDS.has(normalized)) {
    throw new Error(`BLUEPRINT_NOT_REGISTERED: ${raw}`);
  }
}

/**
 * Certified production resolver — the single runtime entry point for blueprint XML.
 *
 * The advertised catalog stays governed by CATALOG_CANONICAL_IDS. Explicitly numbered
 * review extensions can be resolved by their canonical ID without being advertised in
 * the catalog until approval. This keeps review isolated while exercising the same
 * sanitizer and runtime boundary as certified templates.
 */
export function getDefaultXmlForArchitecture(
  archId?: string | null,
  useCaseContext?: string,
  userPrompt?: string,
): string | null {
  assertRegisteredBlueprintId(archId);
  const normalized = visualNormalizeArchitectureId(archId);

  if (REVIEW_EXTENSION_IDS.has(normalized)) {
    const exact = getExactCatalogBlueprintXml(normalized);
    return exact ? finalNonNotationSanitize(exact, normalized) : exact;
  }

  const xml = visualGetDefaultXmlForArchitecture(archId, useCaseContext, userPrompt);
  return xml ? finalNonNotationSanitize(xml, archId) : xml;
}

/**
 * Backward-compatible technical resolver name. It intentionally delegates to the
 * certified resolver so consumers cannot bypass canonical catalog dispatch.
 */
export function getTechnicalArchitectureXml(archId: string): string {
  const xml = getDefaultXmlForArchitecture(archId);
  if (!xml) throw new Error(`BLUEPRINT_XML_UNAVAILABLE: ${archId}`);
  return xml;
}
