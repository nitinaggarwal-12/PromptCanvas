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
2. CRITICAL FREEFORM PRESERVATION RULE (DO NOT HIJACK CUSTOM STACKS):
   - Return \`selectedType: null\`, \`confidence: 0.2\`, and \`alternativeTypes: []\` whenever the user prompt specifies:
     a) A custom multi-service architecture naming 3+ concrete technologies/services (e.g. Kinesis + Flink + DynamoDB + SageMaker; SAP S/4HANA + Debezium + Kafka + BigLake + dbt; MQTT + EMQX + TimescaleDB + PyTorch + Grafana; Epic HL7v2 + Mirth + FHIR + DLP), OR
     b) Non-GCP clouds (AWS, Azure, Hybrid/On-Premises, Open-Source, Blockchain/zk-Rollup, custom protocols like OAuth 2.0 PKCE + Auth0 + React + Redis).
   - Static templates are ONLY for generic, unparameterized template requests (e.g., "give me a generic ERD template", "show a blank STRIDE threat model", "show standard C4 system context").
3. Assign a confidence score between 0.0 and 1.0:
   - 0.8 to 1.0: ONLY when the user explicitly wants a generic built-in template with NO custom stack that would be lost by a static template.
   - 0.6 to 0.79: Medium confidence match where freeform graph synthesis is preferred.
   - Below 0.6 (or 0.2 with selectedType: null): Custom multi-service / non-GCP / specific architecture that MUST be synthesized from scratch by the V2 Graph Engine.
4. List explicit assumptions made if the prompt is vague or broad.
5. Provide up to 3 alternative template IDs ONLY if the prompt is genuinely ambiguous; leave \`alternativeTypes: []\` for clear custom architectures.
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
