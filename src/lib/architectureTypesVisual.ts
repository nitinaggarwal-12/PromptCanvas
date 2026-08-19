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
import { buildEnterpriseReferenceArchitectureXml } from './masterBuilders/build_master_enterprise_reference';

export type ArchitectureTypeOption = RawArchitectureTypeOption;

const ENTERPRISE_REFERENCE_ID = 'unified_system_view';

function isEnterpriseReferenceId(archId?: string | null): boolean {
  const raw = String(archId || '').toLowerCase();
  const normalized = rawNormalizeArchitectureId(archId);
  return normalized === ENTERPRISE_REFERENCE_ID || raw.includes('total_unified_system_view') || raw.includes('unified_system_view');
}

function normalizeCustomerFacingOption(option: RawArchitectureTypeOption): RawArchitectureTypeOption {
  if (option.id !== ENTERPRISE_REFERENCE_ID) return option;
  return {
    ...option,
    name: 'Enterprise Reference Architecture',
    category: 'Executive & Business Strategy',
    whenToUse: 'High-level enterprise reference architecture spanning experience, applications, integration, data, AI, cloud platform, and cross-cutting security, governance, reliability, DevSecOps, and FinOps.',
    prompt: 'Enterprise Reference Architecture: Experience Layer -> Business Application Layer -> Integration Layer -> Data Layer -> AI & Intelligence Layer -> Cloud Platform Layer, with cross-cutting Security & Identity, Governance & Compliance, Observability, Reliability & Resilience, DevSecOps, and FinOps. Keep this as an orientation/reference view and use specialized blueprints for implementation-level details.'
  };
}

export const BUSINESS_ARCHITECTURE_TYPES = RAW_BUSINESS_ARCHITECTURE_TYPES.map(normalizeCustomerFacingOption);
export const TECHNICAL_ARCHITECTURE_TYPES = RAW_TECHNICAL_ARCHITECTURE_TYPES.map(normalizeCustomerFacingOption);
export const ARCHITECTURE_TYPES = RAW_ARCHITECTURE_TYPES.map(normalizeCustomerFacingOption);
export const normalizeArchitectureId = rawNormalizeArchitectureId;

export function getArchitectureTypeById(id?: string | null): RawArchitectureTypeOption | undefined {
  const option = rawGetArchitectureTypeById(id);
  return option ? normalizeCustomerFacingOption(option) : option;
}

export function getTemplateTitle(id?: string | null): string {
  return isEnterpriseReferenceId(id) ? 'Enterprise Reference Architecture' : rawGetTemplateTitle(id);
}

export const getTechnicalArchitectureXml = rawGetTechnicalArchitectureXml;

export function getDefaultXmlForArchitecture(
  archId?: string | null,
  useCaseContext?: string,
  userPrompt?: string
): string | null {
  const normalizedId = rawNormalizeArchitectureId(archId);

  if (isEnterpriseReferenceId(archId)) {
    return applyBlueprintVisualSystem(buildEnterpriseReferenceArchitectureXml(), ENTERPRISE_REFERENCE_ID);
  }

  const xml = rawGetDefaultXmlForArchitecture(archId, useCaseContext, userPrompt);
  if (!xml) return xml;

  if (normalizedId === 'blank_canvas' || normalizedId === 'arch_blank_canvas' || archId === 'v2_freeform') {
    return xml;
  }

  return applyBlueprintVisualSystem(xml, normalizedId);
}
