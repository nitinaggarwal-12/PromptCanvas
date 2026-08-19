import type { ArchitectureTypeOption as RawArchitectureTypeOption } from './architectureTypes';
import {
  BUSINESS_ARCHITECTURE_TYPES as RAW_BUSINESS_ARCHITECTURE_TYPES,
  TECHNICAL_ARCHITECTURE_TYPES as RAW_TECHNICAL_ARCHITECTURE_TYPES,
  ARCHITECTURE_TYPES as RAW_ARCHITECTURE_TYPES,
  normalizeArchitectureId as rawNormalizeArchitectureId,
  getArchitectureTypeById as rawGetArchitectureTypeById,
  getTemplateTitle as rawGetTemplateTitle,
  getDefaultXmlForArchitecture as rawGetDefaultXmlForArchitecture,
  getTechnicalArchitectureXml as rawGetTechnicalArchitectureXml
} from './architectureTypes';
import { applyBlueprintVisualSystem } from './blueprintVisualSystem';

export type ArchitectureTypeOption = RawArchitectureTypeOption;

export const BUSINESS_ARCHITECTURE_TYPES = RAW_BUSINESS_ARCHITECTURE_TYPES;
export const TECHNICAL_ARCHITECTURE_TYPES = RAW_TECHNICAL_ARCHITECTURE_TYPES;
export const ARCHITECTURE_TYPES = RAW_ARCHITECTURE_TYPES;
export const normalizeArchitectureId = rawNormalizeArchitectureId;
export const getArchitectureTypeById = rawGetArchitectureTypeById;
export const getTemplateTitle = rawGetTemplateTitle;
export const getTechnicalArchitectureXml = rawGetTechnicalArchitectureXml;

export function getDefaultXmlForArchitecture(
  archId?: string | null,
  useCaseContext?: string,
  userPrompt?: string
): string | null {
  const xml = rawGetDefaultXmlForArchitecture(archId, useCaseContext, userPrompt);
  if (!xml) return xml;

  const normalizedId = rawNormalizeArchitectureId(archId);
  if (normalizedId === 'blank_canvas' || normalizedId === 'arch_blank_canvas' || archId === 'v2_freeform') {
    return xml;
  }

  return applyBlueprintVisualSystem(xml, normalizedId);
}
