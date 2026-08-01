import { GoogleGenAI, Type } from '@google/genai';
import { z } from 'zod';
import { ARCHITECTURE_TYPES } from '@/lib/architectureTypes';
import { buildIntentClassificationPrompt } from '@/prompts/classifyIntent';

export const CLASSIFIER_TIMEOUT_MS = 2500;
export const CLASSIFIER_MODEL_ID = process.env.INTENT_CLASSIFIER_MODEL || 'gemini-3.5-flash-lite';

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
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('[IntentClassifier] GEMINI_API_KEY is missing, skipping classification');
    return null;
  }

  const ai = new GoogleGenAI({ apiKey });
  const systemPrompt = buildIntentClassificationPrompt(prompt);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), CLASSIFIER_TIMEOUT_MS);

  try {
    const response = await ai.models.generateContent({
      model: CLASSIFIER_MODEL_ID,
      contents: systemPrompt,
      config: {
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
    });

    clearTimeout(timeoutId);

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
    clearTimeout(timeoutId);
    if (err?.name === 'AbortError' || controller.signal.aborted) {
      console.warn(`[IntentClassifier] Timeout (> ${CLASSIFIER_TIMEOUT_MS}ms) during classification`);
    } else {
      console.warn('[IntentClassifier] Execution error:', err?.message || err);
    }
    return null;
  }
}

export async function classifyIntent(prompt: string): Promise<IntentClassification | null> {
  // Attempt 1
  let result = await executeSingleAttempt(prompt);
  if (result) {
    return result;
  }

  // Single retry on failure
  console.log('[IntentClassifier] Retrying classification once...');
  result = await executeSingleAttempt(prompt);
  return result;
}
