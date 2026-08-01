import { DocArchetype, NON_GOALS_DISCLAIMER } from './archetypes';
import { SystemModel } from './extract';
import { SectionContent } from './mappers/types';
import { InferredSectionOutput } from './infer';

export interface ComposeRenderInput {
  archetype: DocArchetype;
  model: SystemModel;
  sections: Record<string, SectionContent>;
  inferredMap: Record<string, InferredSectionOutput>;
}

export function renderMarkdown(input: ComposeRenderInput): string {
  const { archetype, model, sections, inferredMap } = input;
  const lines: string[] = [];

  lines.push(`# ${archetype.name}: ${model.title}`);
  lines.push(`**Domain:** ${model.domain || 'Enterprise Software System'} | **Source Model:** ${model.source} | **Generated:** ${new Date().toISOString().split('T')[0]}`);
  lines.push('');

  // 1. Provenance & Fidelity Summary Table
  lines.push('## Document Provenance & Extraction Fidelity Summary');
  lines.push('');
  lines.push('| Section ID | Section Title | Provenance Class | Items / Detail |');
  lines.push('| :--- | :--- | :--- | :--- |');

  for (const spec of archetype.sections) {
    let detail = '';
    if (spec.provenance === 'derived') {
      const s = sections[spec.id];
      const count = (s?.paragraphs.length || 0) + (s?.bullets.length || 0) + (s?.table?.rows.length || 0);
      detail = `${count} derived element(s)`;
    } else if (spec.provenance === 'inferred') {
      const inf = inferredMap[spec.id];
      const count = (inf?.paragraphs.length || 0) + (inf?.bullets.length || 0);
      detail = `${count} inferred paragraph(s)`;
    } else {
      detail = 'Human TODO (manual input required)';
    }
    lines.push(`| \`${spec.id}\` | **${spec.title}** | \`${spec.provenance.toUpperCase()}\` | ${detail} |`);
  }

  lines.push('');
  lines.push(`*Extraction Fidelity:* Extracted **${model.components.length}** components, **${model.flows.length}** flows across **${model.tiers.length}** tiers (**${model.unmapped.length}** unmapped cells).`);
  lines.push('');

  // 2. Sections
  for (const spec of archetype.sections) {
    lines.push(`---`);
    lines.push(`## ${spec.title} [\`${spec.provenance.toUpperCase()}\`]`);
    lines.push('');

    if (spec.provenance === 'human') {
      lines.push(`> 📌 **TODO [HUMAN ACTION REQUIRED — DO NOT AUTO-FILL]**`);
      lines.push(`> **Guidance:** ${spec.guidance || 'Provide authoritative human judgment and scope definitions for this section.'}`);
      if (spec.id === 'scope_non_goals') {
        lines.push(`>`);
        lines.push(`> **Mandatory Scope Notice:** ${NON_GOALS_DISCLAIMER}`);
      }
      lines.push('');
      continue;
    }

    if (spec.provenance === 'inferred') {
      const inf = inferredMap[spec.id];
      lines.push(`> ⚠️ **AI-INFERRED SECTION — CONFIRM WITH ENGINEERING**`);
      lines.push('');
      if (inf && inf.paragraphs.length > 0) {
        for (const p of inf.paragraphs) {
          lines.push(`${p}`);
          lines.push('');
        }
      }
      if (inf && inf.bullets.length > 0) {
        for (const b of inf.bullets) {
          lines.push(`- ${b}`);
        }
        lines.push('');
      }
      continue;
    }

    // derived
    const sec = sections[spec.id];
    if (sec) {
      for (const p of sec.paragraphs) {
        const refs = p.sourceRefs.length > 0 ? ` *[refs: ${p.sourceRefs.join(', ')}]*` : '';
        lines.push(`${p.text}${refs}`);
        lines.push('');
      }

      if (sec.table) {
        lines.push(`| ${sec.table.headers.join(' | ')} |`);
        lines.push(`| ${sec.table.headers.map(() => '---').join(' | ')} |`);
        for (const row of sec.table.rows) {
          lines.push(`| ${row.cells.join(' | ')} |`);
        }
        lines.push('');
      }

      for (const b of sec.bullets) {
        const refs = b.sourceRefs.length > 0 ? ` *[refs: ${b.sourceRefs.join(', ')}]*` : '';
        lines.push(`- ${b.text}${refs}`);
      }
      lines.push('');
    }
  }

  return lines.join('\n');
}
