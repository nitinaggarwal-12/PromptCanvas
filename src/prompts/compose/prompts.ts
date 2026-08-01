import { SystemModel } from '../../lib/compose/extract';

export const COMPPOSE_SYSTEM_PROMPT = `You are a Principal Enterprise Systems Architect and Technical Writer composing authoritative technical documentation derived from architectural system models.

RULES FOR INFERRED SECTIONS:
1. Write in an authoritative, professional technical document voice.
2. NEVER invent components, infrastructure nodes, metrics, or SLA numbers absent from the SystemModel.
3. Every inferred paragraph must be directly answerable from the SystemModel or framed clearly as "Likely/Presumed [Confirm with Engineering]" with an explicit confirmation cue.
4. Do not alter or contradict derived facts.
5. Return strictly valid JSON matching the schema: Record<string, { paragraphs: string[], bullets: string[] }>.`;

export function buildInferredPrompt(
  model: SystemModel,
  sections: { id: string; title: string; inferPrompt?: string }[]
): string {
  const context = {
    title: model.title,
    domain: model.domain || 'Enterprise Software System',
    cloud: model.cloud || 'Hybrid / Multi-Cloud',
    tiers: model.tiers.map((t) => t.label),
    components: model.components.map((c) => `${c.label} (${c.type || 'service'}) in ${c.tier}`),
    flows: model.flows.map((f) => `${f.from} -> ${f.to} [${f.protocol || 'REST'}: ${f.label || 'data'}]`),
    assumptions: model.assumptions || [],
  };

  return `${COMPPOSE_SYSTEM_PROMPT}

SYSTEM MODEL CONTEXT:
${JSON.stringify(context, null, 2)}

SECTIONS TO GENERATE:
${sections.map((s) => `- Section ID "${s.id}": Title "${s.title}" (Brief: ${s.inferPrompt})`).join('\n')}

Respond with a JSON object where keys are the exact Section IDs ("${sections.map((s) => s.id).join('", "')}") and values are { "paragraphs": string[], "bullets": string[] }.`;
}
