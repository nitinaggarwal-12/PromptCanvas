import { describe, it, expect } from 'vitest';
import {
  BLUEPRINT_KNOWLEDGE_MATRIX,
  getFacetedBlueprintFilters,
  getBlueprintMetadataById,
  PHASE_NAME_OPTIONS,
  ARCHITECTURE_DOMAIN_OPTIONS
} from '@/lib/blueprintKnowledgeMatrix';

describe('Blueprint Knowledge Matrix & Bi-Directional Cascading Filters', () => {
  it('should have all 50 enterprise blueprints populated with full dimension metadata and 0 duplicates', () => {
    expect(BLUEPRINT_KNOWLEDGE_MATRIX.length).toBe(50);

    const ids = BLUEPRINT_KNOWLEDGE_MATRIX.map(b => b.combinedId);
    const names = BLUEPRINT_KNOWLEDGE_MATRIX.map(b => b.diagramName);

    // Verify 0 duplicate IDs and 0 duplicate names
    expect(new Set(ids).size).toBe(50);
    expect(new Set(names).size).toBe(50);

    BLUEPRINT_KNOWLEDGE_MATRIX.forEach((bp) => {
      expect(bp.combinedId).toBeTruthy();
      expect(bp.diagramName).toBeTruthy();
      expect(bp.phaseName).toBeTruthy();
      expect(bp.domain).toBeTruthy();
      expect(bp.abstractionLevel).toBeTruthy();
      expect(bp.stackLayer).toBeTruthy();
      expect(bp.defaultDirection).toBeTruthy();
      expect(bp.salesStage).toBeTruthy();
      expect(bp.lifecyclePhase).toBeTruthy();
    });
  });

  it('should return all 50 items when no filter is applied', () => {
    const res = getFacetedBlueprintFilters({});
    expect(res.matchingCount).toBe(50);
    expect(res.matchingBlueprints.length).toBe(50);
    
    // Sum of phase counts should equal 50
    const totalPhaseCount = Object.values(res.phaseCounts).reduce((a, b) => a + b, 0);
    expect(totalPhaseCount).toBe(50);
  });

  it('should dynamically narrow down blueprint options and cascading dimension counts when a phase is selected', () => {
    const phaseTarget = 'Phase 3: Target State Logical Architecture';
    const res = getFacetedBlueprintFilters({ phaseName: phaseTarget });
    
    // All matching blueprints must belong to that phase
    res.matchingBlueprints.forEach((bp) => {
      expect(bp.phaseName).toBe(phaseTarget);
    });

    // matchingCount must match the length
    expect(res.matchingCount).toBe(res.matchingBlueprints.length);
    expect(res.matchingCount).toBeGreaterThan(0);

    // Other dimensions should reflect the filtered subset
    const totalFilteredDomains = Object.values(res.domainCounts).reduce((a, b) => a + b, 0);
    expect(totalFilteredDomains).toBe(res.matchingCount);
  });

  it('should correctly handle multi-dimensional drill-downs (Phase + Domain + Direction)', () => {
    const res = getFacetedBlueprintFilters({
      phaseName: 'Phase 3: Target State Logical Architecture',
      domain: 'Data & Analytics',
      defaultDirection: 'LR'
    });

    res.matchingBlueprints.forEach((bp) => {
      expect(bp.phaseName).toBe('Phase 3: Target State Logical Architecture');
      expect(bp.domain).toBe('Data & Analytics');
      expect(bp.defaultDirection).toBe('LR');
    });

    expect(res.matchingCount).toBe(res.matchingBlueprints.length);
  });

  it('should resolve blueprints by fuzzy aliases and combined IDs', () => {
    // Exact combined ID
    const bp1 = getBlueprintMetadataById('conceptual_diagram');
    expect(bp1).toBeDefined();
    expect(bp1?.diagramName).toBe('Total Unified System View');

    // Legacy short ID alias
    const bp2 = getBlueprintMetadataById('p1_bp01');
    expect(bp2).toBeDefined();
    expect(bp2?.diagramName).toBe('Legacy Data Dependency Map');

    // Sequence diagram alias
    const bp3 = getBlueprintMetadataById('sequence_diagram');
    expect(bp3).toBeDefined();
    expect(bp3?.diagramName).toBe('Multi-Agent Execution Lifeline Sequence Diagram');
  });
});
