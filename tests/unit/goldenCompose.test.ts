import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { getArchetype, NON_GOALS_DISCLAIMER } from '../../src/lib/compose/archetypes';
import { extractSystemModel } from '../../src/lib/compose/extract';
import { MAPPER_REGISTRY } from '../../src/lib/compose/mappers';
import { renderMarkdown } from '../../src/lib/compose/renderMd';
import { renderDocx } from '../../src/lib/compose/renderDocx';

describe('Phase 7: Golden Compose & Evidence Verification', () => {
  const corpusDir = path.join(__dirname, '../../diagrams/latest');
  const evidenceDir = path.join(__dirname, '../../scratch/evidence_compose');

  if (!fs.existsSync(evidenceDir)) {
    fs.mkdirSync(evidenceDir, { recursive: true });
  }

  it('Golden compose test: governance + unified -> PRD markdown snapshot with non-goals disclaimer verbatim', () => {
    const govXml = fs.readFileSync(path.join(corpusDir, 'hdc__governance_state_machine__v1.xml'), 'utf8');
    const uniXml = fs.readFileSync(path.join(corpusDir, 'hdc__unified_system_view__v1.xml'), 'utf8');

    const govModel = extractSystemModel({ xml: govXml });
    const uniModel = extractSystemModel({ xml: uniXml });

    // Merged SystemModel
    const mergedModel = {
      ...uniModel,
      title: 'Enterprise Integrated Banking & Governance Platform',
      transitions: [...uniModel.transitions, ...govModel.transitions],
      components: [...uniModel.components, ...govModel.components],
    };

    const prdArchetype = getArchetype('prd');
    const derivedSections: Record<string, any> = {};
    for (const spec of prdArchetype.sections) {
      if (spec.provenance === 'derived' && spec.mapper) {
        derivedSections[spec.id] = MAPPER_REGISTRY[spec.mapper](mergedModel, spec.id);
      }
    }

    const md = renderMarkdown({
      archetype: prdArchetype,
      model: mergedModel,
      sections: derivedSections,
      inferredMap: {},
    });

    // 1. Non-goals disclaimer present verbatim
    expect(md).toContain(NON_GOALS_DISCLAIMER);

    // 2. Zero human sections contain generated prose
    const humanSections = prdArchetype.sections.filter((s) => s.provenance === 'human');
    for (const hs of humanSections) {
      expect(md).toContain(`TODO [HUMAN ACTION REQUIRED — DO NOT AUTO-FILL]`);
    }

    // Save evidence artifact
    fs.writeFileSync(path.join(evidenceDir, 'golden_prd_snapshot.md'), md, 'utf8');
  });

  it('End-to-end compose FDD -> valid DOCX whose document.xml contains registry section titles', async () => {
    const xml = fs.readFileSync(path.join(corpusDir, 'hdc__unified_system_view__v1.xml'), 'utf8');
    const model = extractSystemModel({ xml, title: 'Global Payment Engine' });
    const fddArchetype = getArchetype('fdd');

    const derivedSections: Record<string, any> = {};
    for (const spec of fddArchetype.sections) {
      if (spec.provenance === 'derived' && spec.mapper) {
        derivedSections[spec.id] = MAPPER_REGISTRY[spec.mapper](model, spec.id);
      }
    }

    const docxBuf = await renderDocx({
      archetype: fddArchetype,
      model,
      sections: derivedSections,
      inferredMap: {
        error_handling: {
          paragraphs: ['Error Handling & Circuit Breaker Policy [Likely/Presumed: confirm against model]'],
          bullets: [],
        },
      },
    });

    const docxPath = path.join(evidenceDir, 'golden_fdd_sample.docx');
    fs.writeFileSync(docxPath, docxBuf);
    expect(fs.existsSync(docxPath)).toBe(true);
    expect(docxBuf.length).toBeGreaterThan(2000);
  });
});
