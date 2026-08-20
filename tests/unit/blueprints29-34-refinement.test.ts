import { describe, expect, it } from 'vitest';
import { getExactCatalogBlueprintXml } from '../../src/lib/blueprintExactResolver';

describe('Blueprint 29 and 34 refinements', () => {
  it('Blueprint 29 preserves all six Rs and explicit decision logic', () => {
    const xml = getExactCatalogBlueprintXml('six_rs_migration_matrix')!;
    expect(xml).toContain('6Rs Migration Disposition Matrix');
    expect(xml).toContain('P5-APP-L-01');
    for (const term of ['Rehost','Replatform','Refactor','Retain','Retire','Repurchase']) expect(xml).toContain(term);
    for (const term of ['Business 30%','Technical 40%','Cloud Readiness 30%','Disposition Engine','Hard Constraints','Dependency &amp; wave logic','Decision Confidence &amp; Rationale']) expect(xml).toContain(term);
    expect(xml).toContain('data migration + identity/integration re-pointing');
    expect(xml).toContain('illustrative planning ranges');
    expect(xml).toContain('Migration Roadmap');
    expect(xml).toContain('vertex="1"');
    expect(xml).toContain('edge="1"');
  });

  it('Blueprint 34 separates capability, connector and custom-agent governance with handoff', () => {
    const xml = getExactCatalogBlueprintXml('ai_coe_operating_model')!;
    expect(xml).toContain('AI Center of Excellence (CoE) Operating Model');
    expect(xml).toContain('P5-AI-L-06');
    for (const term of ['GEMINI ENTERPRISE EXPERIENCE','CUSTOM AGENT ENGINEERING','Gemini Enterprise connectors','Custom tool access (MCP / API / A2A)','Feature maturity gates','Risk tier &amp; human authority','Decision rights (RACI)','Value realization metrics','Product / feature feedback loop','Exit &amp; operational handoff']) expect(xml).toContain(term);
    expect(xml).toContain('FDE');
    expect(xml).toContain('PSO/SI');
    expect(xml).toContain('TAM');
    expect(xml).toContain('IT Ops/SRE');
    expect(xml).toContain('Skills as subagents');
    expect(xml).toContain('vertex="1"');
    expect(xml).toContain('edge="1"');
  });
});
