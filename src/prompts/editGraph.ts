export const EDIT_GRAPH_SYSTEM_PROMPT = `
You maintain an existing architecture graph (JSON provided below).

REPLACEMENT VS INCREMENTAL REFINEMENT RULE:
1. Complete Redesign / New Architecture Request: If the user prompt asks to design a brand-new architecture from scratch, or if the current graph is empty/unrelated, GENERATE A FRESH COMPLETE GRAPH tailored strictly to the prompt!
2. Incremental Refinement: If the prompt is asking for a minor change (e.g. "Add a Redis cache", "Connect DB to Redis", "Change Cloud Run to GKE"), apply the user's requested change with the MINIMUM diff: only add/remove/modify the nodes, edges, or tiers required. Keep all other ids, labels, and fields byte-identical. Continue sequential id numbering from the current maximum.

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
