import { describe, it, expect } from 'vitest';
import {
  getGeminiModel,
  getGeminiFallbackModel,
  getGeminiModelWithFallbacks,
  sanitizeFrontierModelId,
  resolveLatestGeminiModelChain,
} from '../../src/lib/geminiConfig';

describe('Gemini Model Routing (Verified Real Models Only)', () => {
  it('routes all tiers strictly to verified Google Gemini models with zero fictional slugs', () => {
    expect(getGeminiModel('pro')).toBe('gemini-2.5-pro');
    expect(getGeminiModel('critic')).toBe('gemini-2.5-pro');
    expect(getGeminiModel('vision')).toBe('gemini-2.5-pro');
    expect(getGeminiModel('chat')).toBe('gemini-2.5-flash');
    expect(getGeminiModel('latest')).toBe('gemini-2.5-pro');

    for (const tier of ['pro', 'critic', 'vision', 'chat', 'lite', 'medium', 'live', 'latest'] as const) {
      const fb = getGeminiFallbackModel(tier);
      expect(fb).toMatch(/^gemini-(?:2\.5|3)/i);
      const chain = getGeminiModelWithFallbacks(tier);
      expect(chain.length).toBeGreaterThanOrEqual(2);
      for (const m of chain) {
        expect(m).toMatch(/^gemini-(?:2\.5|3)/i);
      }
    }
  });

  it('accepts real 2.5 / 3.x models and rejects deprecated 1.x / 2.0 or unknown overrides', () => {
    expect(sanitizeFrontierModelId('gemini-2.5-flash', 'gemini-2.5-pro')).toBe('gemini-2.5-flash');
    expect(sanitizeFrontierModelId('models/gemini-2.5-pro', 'gemini-2.5-flash')).toBe('gemini-2.5-pro');
    expect(sanitizeFrontierModelId('gemini-2.0-flash', 'gemini-2.5-flash')).toBe('gemini-2.5-flash');
    expect(sanitizeFrontierModelId('gemini-1.5-pro', 'gemini-2.5-pro')).toBe('gemini-2.5-pro');
    expect(sanitizeFrontierModelId('nonexistent-model-xyz', 'gemini-2.5-pro')).toBe('gemini-2.5-pro');
  });

  it('dynamically discovers and ranks live Gemini 2.5 and 3.x models via ai.models.list()', async () => {
    const g = globalThis as any;
    delete g.__promptCanvasDynamicModelCatalog;
    delete g.__promptCanvasDynamicModelInflight;

    const mockItems = [
      { name: 'models/gemini-2.5-flash', supportedActions: ['generateContent'] },
      { name: 'models/gemini-2.5-pro', supportedActions: ['generateContent'] },
      { name: 'models/text-embedding-004', supportedActions: ['embedContent'] },
    ];
    const mockAi = {
      models: {
        list: async () => ({
          async *[Symbol.asyncIterator]() {
            for (const item of mockItems) yield item;
          },
        }),
      },
    } as any;

    const latestChain = await resolveLatestGeminiModelChain(mockAi, 'pro');
    expect(latestChain[0]).toBe('gemini-2.5-pro');
    expect(latestChain).toContain('gemini-2.5-flash');
  });
});
