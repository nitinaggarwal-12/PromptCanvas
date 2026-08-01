import { describe, it, expect } from 'vitest';
import { ARCHETYPE_REGISTRY, validateArchetypeInvariants, NON_GOALS_DISCLAIMER } from '../../src/lib/compose/archetypes';

describe('Phase 2: DocArchetype Registry & Provenance Invariants', () => {
  it('registers all required document archetypes', () => {
    const requiredIds: (keyof typeof ARCHETYPE_REGISTRY)[] = ['sdd', 'fdd', 'tdd', 'exec_brief', 'security_package', 'prd', 'brd', 'api_spec', 'threat_model'];
    for (const id of requiredIds) {
      expect(ARCHETYPE_REGISTRY[id]).toBeDefined();
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
