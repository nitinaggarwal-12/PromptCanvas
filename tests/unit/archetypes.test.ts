import { describe, it, expect } from 'vitest';
import {
  ARCHETYPE_REGISTRY,
  DOC_ARCHETYPES_META,
  PURGED_ABSORBED_ARCHETYPE_IDS,
  resolveSurvivingArchetypeId,
  getArchetype,
  validateArchetypeInvariants,
  NON_GOALS_DISCLAIMER,
} from '../../src/lib/compose/archetypes';

describe('Phase 2: DocArchetype Registry & Provenance Invariants (Lean 8 Pharma Regulatory Rigor)', () => {
  it('registers strictly the 8 surviving core document archetypes and resolves all 9 absorbed archetypes cleanly', () => {
    const survivingIds: (keyof typeof ARCHETYPE_REGISTRY)[] = [
      'brd',
      'prd',
      'sdd',
      'tdd',
      'ai_system_card',
      'threat_model',
      'security_package',
      'sre_resilience',
    ];
    expect(DOC_ARCHETYPES_META.map((m) => m.id)).toEqual(survivingIds);
    expect(Object.keys(ARCHETYPE_REGISTRY).length).toBe(8);
    for (const id of survivingIds) {
      expect(ARCHETYPE_REGISTRY[id]).toBeDefined();
    }

    // Verify all 9 purged redundant archetypes are absent from ARCHETYPE_REGISTRY and DOC_ARCHETYPES_META
    expect(PURGED_ABSORBED_ARCHETYPE_IDS.length).toBe(9);
    for (const absorbedId of PURGED_ABSORBED_ARCHETYPE_IDS) {
      expect((ARCHETYPE_REGISTRY as Record<string, unknown>)[absorbedId]).toBeUndefined();
      expect(DOC_ARCHETYPES_META.find((m) => m.id === (absorbedId as any))).toBeUndefined();
      // But resolveSurvivingArchetypeId and getArchetype resolve them to their surviving target
      const resolved = resolveSurvivingArchetypeId(absorbedId);
      expect(survivingIds.includes(resolved)).toBe(true);
      expect(getArchetype(absorbedId).id).toBe(resolved);
    }
  });

  it('enforces hard provenance invariants across all registered archetypes', () => {
    for (const archetype of Object.values(ARCHETYPE_REGISTRY)) {
      expect(() => validateArchetypeInvariants(archetype)).not.toThrow();
    }
  });

  it('contains the non-goals disclaimer verbatim in PRD scope_non_goals section', () => {
    const prd = ARCHETYPE_REGISTRY.prd;
    const scopeSection = prd.sections.find((s) => s.id === 'scope_non_goals');
    expect(scopeSection).toBeDefined();
    expect(scopeSection!.provenance).toBe('human');
    expect(scopeSection!.guidance).toContain(NON_GOALS_DISCLAIMER);
  });

  it('every derived section has a valid mapper name', () => {
    for (const archetype of Object.values(ARCHETYPE_REGISTRY)) {
      for (const s of archetype.sections) {
        if (s.provenance === 'derived') {
          expect(typeof s.mapper).toBe('string');
        }
      }
    }
  });

  it('every inferred section has an inferPrompt', () => {
    for (const archetype of Object.values(ARCHETYPE_REGISTRY)) {
      for (const s of archetype.sections) {
        if (s.provenance === 'inferred') {
          expect(typeof s.inferPrompt).toBe('string');
        }
      }
    }
  });
});
