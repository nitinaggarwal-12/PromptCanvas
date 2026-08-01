import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { getArchetype } from '../../src/lib/compose/archetypes';
import { extractSystemModel } from '../../src/lib/compose/extract';
import { MAPPER_REGISTRY } from '../../src/lib/compose/mappers';
import { renderMarkdown } from '../../src/lib/compose/renderMd';
import { renderDocx } from '../../src/lib/compose/renderDocx';

describe('Phase 5: Docx & Markdown Document Composer', () => {
  const corpusDir = path.join(__dirname, '../../diagrams/latest');

  it('renders clean Markdown with provenance summary table and TODO human block', () => {
    const xml = fs.readFileSync(path.join(corpusDir, 'hdc__governance_state_machine__v1.xml'), 'utf8');
    const model = extractSystemModel({ xml });
    const archetype = getArchetype('prd');

    const derivedSections: Record<string, any> = {};
    for (const spec of archetype.sections) {
      if (spec.provenance === 'derived' && spec.mapper) {
        derivedSections[spec.id] = MAPPER_REGISTRY[spec.mapper](model, spec.id);
      }
    }

    const md = renderMarkdown({
      archetype,
      model,
      sections: derivedSections,
      inferredMap: {},
    });

    expect(md).toContain('# Product Requirement Document (PRD)');
    expect(md).toContain('| Section ID | Section Title | Provenance Class |');
    expect(md).toContain('TODO [HUMAN ACTION REQUIRED — DO NOT AUTO-FILL]');
    expect(md).toContain('Derived diagrams describe what is designed, not what was excluded');
  });

  it('renders valid docx binary buffer starting with PK zip header', async () => {
    const xml = fs.readFileSync(path.join(corpusDir, 'hdc__unified_system_view__v1.xml'), 'utf8');
    const model = extractSystemModel({ xml });
    const archetype = getArchetype('fdd');

    const derivedSections: Record<string, any> = {};
    for (const spec of archetype.sections) {
      if (spec.provenance === 'derived' && spec.mapper) {
        derivedSections[spec.id] = MAPPER_REGISTRY[spec.mapper](model, spec.id);
      }
    }

    const docxBuf = await renderDocx({
      archetype,
      model,
      sections: derivedSections,
      inferredMap: {},
    });

    expect(Buffer.isBuffer(docxBuf)).toBe(true);
    expect(docxBuf.length).toBeGreaterThan(1000);
    // DOCX files are ZIP archives starting with magic byte PK\x03\x04 (0x50 0x4B 0x03 0x04)
    expect(docxBuf[0]).toBe(0x50);
    expect(docxBuf[1]).toBe(0x4b);
  });
});
