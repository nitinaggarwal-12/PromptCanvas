import { ARCHITECTURE_TYPES } from '@/lib/architectureTypes';

export function buildIntentClassificationPrompt(userPrompt: string): string {
  const optionsList = ARCHITECTURE_TYPES.map(opt => {
    return `- ID: "${opt.id}"\n  Name: "${opt.name}"\n  Category: "${opt.category}"\n  When to use: "${opt.whenToUse || opt.name}"`;
  }).join('\n\n');

  return `You are an AI Architecture Diagram Classifier for PromptCanvas.
Your task is to analyze a user's prompt and categorize their intent to select the best diagram type or template.

AVAILABLE DIAGRAM TYPES & TEMPLATES:
${optionsList}

INSTRUCTIONS:
1. Analyze the user prompt carefully.
2. Determine if the prompt clearly requests or strongly aligns with one of the available diagram types/templates listed above.
3. Assign a confidence score between 0.0 and 1.0:
   - 0.8 to 1.0: High confidence match for a specific template type (e.g. sequence diagram, ERD, conceptual diagram, RAG architecture).
   - 0.6 to 0.79: Medium confidence match for freeform technical or a specific template with reasonable assumptions.
   - Below 0.6: Low confidence or ambiguous intent.
4. List explicit assumptions made if the prompt is vague or broad.
5. Provide up to 3 alternative template IDs if the request could reasonably fit other diagram types.
6. Return strictly a JSON object with NO markdown formatting, NO code blocks, and NO extra text.

JSON RESPONSE SCHEMA:
{
  "selectedType": string | null, // Must be a valid ID from the AVAILABLE DIAGRAM TYPES above, or null if completely unclassifiable
  "confidence": number,          // Float between 0.0 and 1.0
  "reasoning": string,           // Brief 1-2 sentence explanation
  "assumptions": string[],       // List of stated assumptions (e.g., ["Assumed cloud provider is GCP", "Assumed REST microservices architecture"])
  "alternativeTypes": string[]   // Up to 3 alternative valid diagram IDs
}

USER PROMPT:
"${userPrompt}"`;
}
