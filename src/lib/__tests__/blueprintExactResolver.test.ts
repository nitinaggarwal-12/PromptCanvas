import { describe, expect, it } from 'vitest';
import { normalizeArchitectureId } from '../architectureTypes';
import {
  CATALOG_CANONICAL_IDS,
  CATALOG_EXACT_FACTORIES,
  getExactCatalogBlueprintXml,
} from '../blueprintExactResolver';

describe('exact 50-blueprint catalog resolver', () => {
  it('defines exactly 50 canonical blueprint identities', () => {
    expect(CATALOG_CANONICAL_IDS).toHaveLength(50);
    expect(new Set(CATALOG_CANONICAL_IDS).size).toBe(50);
  });

  it('has an exact factory for every catalog blueprint except the dedicated #6 enterprise-reference override', () => {
    const expectedFactoryIds = CATALOG_CANONICAL_IDS.filter(id => id !== 'unified_system_view');
    expect(Object.keys(CATALOG_EXACT_FACTORIES).sort()).toEqual([...expectedFactoryIds].sort());
    expect(getExactCatalogBlueprintXml('unified_system_view')).toBeNull();
  });

  it('normalizes historically collision-prone combined IDs to the intended unique canonical IDs', () => {
    expect(normalizeArchitectureId('P4-SEC-P-05_tech_agentic_mesh')).toBe('tech_agentic_mesh');
    expect(normalizeArchitectureId('P4-DAT-P-13_realtime_streaming')).toBe('tech_streaming_analytics');
    expect(normalizeArchitectureId('IND-MFG-02_ge_equipment_optimization_gemini')).toBe('tech_supply_chain');
    expect(normalizeArchitectureId('IND-MFG-05_smart_manufacturing_iot')).toBe('smart_factory_iot');
    expect(normalizeArchitectureId('P5-GOV-L-04_incident_triage_swimlane')).toBe('incident_triage_swimlane');
    expect(normalizeArchitectureId('P5-SEC-P-02_enterprise_sre_observability')).toBe('enterprise_sre_observability');
    expect(normalizeArchitectureId('ARCH-C4-01_c4_system_context')).toBe('tech_c4_system_context');
    expect(normalizeArchitectureId('ARCH-C4-02_ARCH-C4-03_c4_component_lld')).toBe('c4_component_lld');
  });
});
