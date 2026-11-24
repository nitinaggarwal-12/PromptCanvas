import { Type } from '@google/genai';
import { z } from 'zod';
import { ARCHITECTURE_TYPES } from '@/lib/architectureTypes';
import { buildIntentClassificationPrompt } from '@/prompts/classifyIntent';
import { generateContentWithRetry } from '@/lib/geminiRetryHelper';
import {
  GEMINI_FLASH_MODEL_ID,
  createGeminiClient,
  getEffectiveGeminiApiKey,
  hasLiveGeminiBackend,
  sanitizeFrontierModelId,
} from '@/lib/geminiConfig';

export const CLASSIFIER_TIMEOUT_MS = 2500;
export const CLASSIFIER_MODEL_ID =
  sanitizeFrontierModelId(process.env.INTENT_CLASSIFIER_MODEL, '') ||
  sanitizeFrontierModelId(process.env.GEMINI_MODEL_ID, GEMINI_FLASH_MODEL_ID);

export const IntentClassificationSchema = z.object({
  selectedType: z.string().nullable(),
  confidence: z.number().min(0).max(1),
  reasoning: z.string(),
  assumptions: z.array(z.string()),
  alternativeTypes: z.array(z.string())
});

export type IntentClassification = z.infer<typeof IntentClassificationSchema>;

const validArchitectureIds = new Set(ARCHITECTURE_TYPES.map(t => t.id));

async function executeSingleAttempt(prompt: string): Promise<IntentClassification | null> {
  const ai = createGeminiClient();
  if (!ai) {
    console.warn('[IntentClassifier] No Gemini API key or Vertex AI credentials, skipping classification');
    return null;
  }

  const systemPrompt = buildIntentClassificationPrompt(prompt);

  try {
    const response = await generateContentWithRetry(
      ai,
      {
        model: CLASSIFIER_MODEL_ID,
        contents: systemPrompt,
        config: {
          temperature: 0.1,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              selectedType: { type: Type.STRING, nullable: true },
              confidence: { type: Type.NUMBER },
              reasoning: { type: Type.STRING },
              assumptions: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              alternativeTypes: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: ['selectedType', 'confidence', 'reasoning', 'assumptions', 'alternativeTypes']
          }
        }
      },
      {
        maxRetries: 1,
        perAttemptTimeoutMs: CLASSIFIER_TIMEOUT_MS,
        totalBudgetMs: CLASSIFIER_TIMEOUT_MS + 500,
        label: 'IntentClassifier',
      }
    );

    const rawText = response.text || '';
    if (!rawText.trim()) {
      return null;
    }

    // Strip markdown code fences if present
    const cleanedText = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
    const jsonParsed = JSON.parse(cleanedText);
    const parseResult = IntentClassificationSchema.safeParse(jsonParsed);

    if (!parseResult.success) {
      console.warn('[IntentClassifier] Validation failed:', parseResult.error.format());
      return null;
    }

    const classification = parseResult.data;

    // Verify selectedType is a valid ID in our system
    if (classification.selectedType && !validArchitectureIds.has(classification.selectedType)) {
      console.warn(`[IntentClassifier] Unknown selectedType "${classification.selectedType}", resetting to null`);
      classification.selectedType = null;
    }

    // Filter alternativeTypes to valid IDs
    classification.alternativeTypes = classification.alternativeTypes.filter(id => validArchitectureIds.has(id));

    return classification;
  } catch (err: any) {
    console.warn('[IntentClassifier] Execution error:', err?.message || err);
    return null;
  }
}

export async function classifyIntent(prompt: string): Promise<IntentClassification | null> {
  if (!getEffectiveGeminiApiKey() && !hasLiveGeminiBackend()) {
    return null;
  }

  // Attempt 1
  let result = await executeSingleAttempt(prompt);
  if (result) {
    return result;
  }

  // Single retry on failure if credentials are present
  console.log('[IntentClassifier] Retrying classification once...');
  result = await executeSingleAttempt(prompt);
  return result;
}
