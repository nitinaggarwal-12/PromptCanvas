import { describe, it, expect } from 'vitest';
import { getExactSequenceDiagramReferenceXml } from '../../src/lib/diagramCompiler';
import { validateAndHealDrawioXml } from '../../src/lib/xmlHealer';

describe('UML Sequence Diagram Blueprint (P3-APP-L-10)', () => {
  it('should compile the complete 19-step multi-agent sequence diagram XML', () => {
    const rawXml = getExactSequenceDiagramReferenceXml();
    expect(rawXml).toBeDefined();
    expect(rawXml).toContain('id="multi_agent_sequence_flow"');
    expect(rawXml).toContain('Mapping Data Flow, Orchestration, Time, and Governance across Data/AI Solutions');
    expect(rawXml).toContain('SECURE MANAGED GEMINI ENTERPRISE ECOSYSTEM');
    
    // Verify all 7 participants
    expect(rawXml).toContain('col_user');
    expect(rawXml).toContain('col_orch');
    expect(rawXml).toContain('col_reasoner');
    expect(rawXml).toContain('col_memory');
    expect(rawXml).toContain('col_rag');
    expect(rawXml).toContain('col_gcs');
    expect(rawXml).toContain('col_bq');

    // Verify all 19 interaction step badges
    for (let i = 1; i <= 19; i++) {
      expect(rawXml).toContain(`step_${i}_`);
    }

    // Verify bottom 3 specification boxes
    expect(rawXml).toContain('LEGEND');
    expect(rawXml).toContain('KEY DEFINITIONS');
    expect(rawXml).toContain('WHY IT WORKS:');
  });

  it('should preserve all sourcePoints, targetPoints and edge geometry through xmlHealer', () => {
    const rawXml = getExactSequenceDiagramReferenceXml();
    const healed = validateAndHealDrawioXml(rawXml);
    expect(healed.isValid).toBe(true);

    // Ensure edge sourcePoint and targetPoint were not destroyed by offset normalization
    expect(healed.xml).toContain('as="sourcePoint"');
    expect(healed.xml).toContain('as="targetPoint"');
    expect(healed.xml).toContain('step_1_wire');
    expect(healed.xml).toContain('step_18_wire');
    expect(healed.xml).toContain('step_19_wire');
  });
});
