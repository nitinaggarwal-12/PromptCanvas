import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  classifyIntent,
  CLASSIFIER_TIMEOUT_MS,
  CLASSIFIER_MODEL_ID,
  IntentClassificationSchema
} from '@/lib/router/intentClassifier';
import { buildIntentClassificationPrompt } from '@/prompts/classifyIntent';

describe('Intent Classifier Unit Tests', () => {
  it('exports correct classifier timeout (2500ms) and model ID', () => {
    expect(CLASSIFIER_TIMEOUT_MS).toBe(2500);
    expect(CLASSIFIER_MODEL_ID).toBe(process.env.INTENT_CLASSIFIER_MODEL || 'gemini-3.5-flash-lite');
  });

  it('buildIntentClassificationPrompt embeds user prompt and architecture types', () => {
    const prompt = buildIntentClassificationPrompt('build an e-commerce platform');
    expect(prompt).toContain('build an e-commerce platform');
    expect(prompt).toContain('conceptual_diagram');
    expect(prompt).toContain('erd');
    expect(prompt).toContain('sequence_diagram');
  });

  it('validates correct IntentClassificationSchema objects', () => {
    const validData = {
      selectedType: 'conceptual_diagram',
      confidence: 0.95,
      reasoning: 'Matches conceptual architecture pattern',
      assumptions: ['Cloud provider is GCP'],
      alternativeTypes: ['erd']
    };
    const result = IntentClassificationSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('rejects invalid confidence scores in IntentClassificationSchema', () => {
    const invalidData = {
      selectedType: 'conceptual_diagram',
      confidence: 1.5, // > 1
      reasoning: 'Invalid confidence',
      assumptions: [],
      alternativeTypes: []
    };
    const result = IntentClassificationSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('classifyIntent returns null cleanly when GEMINI_API_KEY is unset or API throws', async () => {
    const origKey = process.env.GEMINI_API_KEY;
    delete process.env.GEMINI_API_KEY;

    const result = await classifyIntent('build a payment service');
    expect(result).toBeNull();

    if (origKey) {
      process.env.GEMINI_API_KEY = origKey;
    }
  });
});
