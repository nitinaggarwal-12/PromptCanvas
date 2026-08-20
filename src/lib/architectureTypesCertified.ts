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

const KNOWN_ARCHITECTURE_IDS = new Set(VISUAL_ARCHITECTURE_TYPES.map((option) => option.id));
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

  // Final boundary guarantee: post-processing must never return malformed XML entities.
  return ensureValidXmlEntities(next);
}

function assertRegisteredBlueprintId(archId?: string | null): void {
  const raw = String(archId || '').trim();
  if (!raw || !BLUEPRINT_ID_PREFIX_RE.test(raw)) return;

  const normalized = visualNormalizeArchitectureId(raw);
  if (!KNOWN_ARCHITECTURE_IDS.has(normalized)) {
    throw new Error(`BLUEPRINT_NOT_REGISTERED: ${raw}`);
  }
}

/**
 * Certified production resolver — the single runtime entry point for blueprint XML.
 *
 * Catalog rendering first goes through exact canonical dispatch, then the technical,
 * visual, semantic-icon and containment pipeline, and finally this sanitizer prevents
 * late-stage enrichment from reintroducing emoji placeholders, sub-9.5px text, or
 * malformed XML entities. Blueprint-looking IDs that are not registered fail loudly
 * instead of silently falling through to an unrelated generic template.
 */
export function getDefaultXmlForArchitecture(
  archId?: string | null,
  useCaseContext?: string,
  userPrompt?: string,
): string | null {
  assertRegisteredBlueprintId(archId);
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
