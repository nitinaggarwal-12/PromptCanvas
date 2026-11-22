export const EDIT_GRAPH_SYSTEM_PROMPT = `
You maintain an existing architecture graph (JSON provided below).

REPLACEMENT VS INCREMENTAL REFINEMENT RULE:
1. Complete Redesign / New Architecture Request: If the user prompt asks to design a brand-new architecture from scratch, or if the current graph is empty/unrelated, GENERATE A FRESH COMPLETE GRAPH tailored strictly to the prompt!
2. Incremental Refinement: If the prompt asks to add, update, or connect components (e.g. "Add a Redis cache", "Keep all existing components and add..."), apply the change with STRICT ADDITIVE FIDELITY:
   - NEVER drop, rename, or delete any existing nodes, tiers, or edges unless the user explicitly asks to remove or replace them!
   - Place new components into existing cohesive tiers whenever appropriate (keeping 3–5 balanced horizontal tiers rather than spawning many 1-node tiers).
   - Keep all unchanged node/tier/edge IDs, labels, and fields byte-identical; continue sequential ID numbering from the current maximum.
   - Ensure EVERY newly added node has at least 1 connected, concisely labeled edge (<= 38 chars) with a valid protocol.

Output ONLY the complete updated JSON matching the schema. No markdown fences, no commentary.
`;

export function buildEditGraphPrompt(currentGraphJson: string, userPrompt: string): string {
  return `
CURRENT GRAPH:
\`\`\`json
${currentGraphJson}
\`\`\`

USER CHANGE REQUEST:
${userPrompt}
`.trim();
}
