import { describe, it, expect } from 'vitest';
import {
  getGeminiModel,
  getGeminiFallbackModel,
  getGeminiModelWithFallbacks,
  getDistinctJudgeModel,
  sanitizeFrontierModelId,
  parseFrontierGeminiModel,
  resolveLatestGeminiModelChain,
  resolveLatestDistinctJudgeChain,
} from '../../src/lib/geminiConfig';

describe('Gemini & Cross-Family Frontier Model Routing (Verified Live Models Only)', () => {
  it('routes all tiers strictly to verified frontier models with zero fictional slugs or internal codenames', () => {
    expect(getGeminiModel('pro')).toBe('gemini-3.1-pro-preview');
    expect(getGeminiModel('critic')).toBe('gemini-3.1-pro-preview');
    expect(getGeminiModel('vision')).toBe('gemini-3.1-pro-preview');
    expect(getGeminiModel('chat')).toBe('gemini-3-flash-preview');
    expect(getGeminiModel('cross_family_critic')).toBe('gemma-4-31b-it');
    expect(getGeminiModel('latest')).toBe('gemini-3.1-pro-preview');

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

  it('never downgrades a Pro generator to a weaker Flash judge', () => {
    expect(getDistinctJudgeModel('gemini-3-flash-preview')).toBe('gemini-3.1-pro-preview');
    expect(getDistinctJudgeModel('gemini-2.5-flash')).toBe('gemini-3.1-pro-preview');
    expect(getDistinctJudgeModel('gemini-2.5-pro')).toBe('gemini-3.1-pro-preview');
    const distinctFrom31Pro = getDistinctJudgeModel('gemini-3.1-pro-preview');
    expect(distinctFrom31Pro).not.toBe('gemini-3.1-pro-preview');
    expect(distinctFrom31Pro).not.toContain('flash');
    expect(distinctFrom31Pro).toBe('gemini-2.5-pro');
  });

  it('accepts real 2.5 / 3.x / Gemma 4 models and blocks deprecated 1.x / 2.0, Bidi audio, and internal codenames', () => {
    expect(sanitizeFrontierModelId('gemini-3.1-pro-preview', 'gemini-2.5-pro')).toBe('gemini-3.1-pro-preview');
    expect(sanitizeFrontierModelId('gemma-4-31b-it', 'gemini-2.5-pro')).toBe('gemma-4-31b-it');
    expect(sanitizeFrontierModelId('models/gemini-2.5-pro', 'gemini-2.5-flash')).toBe('gemini-2.5-pro');
    expect(sanitizeFrontierModelId('gemini-2.0-flash', 'gemini-2.5-flash')).toBe('gemini-2.5-flash');
    expect(sanitizeFrontierModelId('gemini-1.5-pro', 'gemini-2.5-pro')).toBe('gemini-2.5-pro');
    expect(sanitizeFrontierModelId('gemini-4-argon', 'gemini-3.1-pro-preview')).toBe('gemini-3.1-pro-preview');
    expect(sanitizeFrontierModelId('nano-banana-pro-preview', 'gemini-3.1-pro-preview')).toBe('gemini-3.1-pro-preview');
    expect(sanitizeFrontierModelId('gemini-omni-1.1-flash', 'gemini-3-flash-preview')).toBe('gemini-3-flash-preview');
    expect(parseFrontierGeminiModel('models/gemini-4-argon')).toBeNull();
    expect(parseFrontierGeminiModel('models/gemini-omni-1.2-flash')).toBeNull();
    expect(parseFrontierGeminiModel('models/gemma-4-31b-it')?.family).toBe('gemma');
  });

  it('dynamically discovers and ranks live Gemini 3.1 Pro, 2.5 Pro, and Gemma 4 31B without Flash judge inversion', async () => {
    const g = globalThis as any;
    delete g.__promptCanvasDynamicModelCatalog;
    delete g.__promptCanvasDynamicModelInflight;

    const mockItems = [
      { name: 'models/gemini-2.5-flash', supportedActions: ['generateContent'] },
      { name: 'models/gemini-2.5-pro', supportedActions: ['generateContent'] },
      { name: 'models/gemini-3-flash-preview', supportedActions: ['generateContent'] },
      { name: 'models/gemini-3.1-pro-preview', supportedActions: ['generateContent'] },
      { name: 'models/gemma-4-31b-it', supportedActions: ['generateContent'] },
      { name: 'models/gemini-4-argon', supportedActions: ['generateContent'] },
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

    const latestProChain = await resolveLatestGeminiModelChain(mockAi, 'pro');
    expect(latestProChain[0]).toBe('gemini-3.1-pro-preview');
    expect(latestProChain).toContain('gemini-2.5-pro');
    expect(latestProChain).not.toContain('gemini-4-argon');

    const judgeFor31Pro = await resolveLatestDistinctJudgeChain(mockAi, 'gemini-3.1-pro-preview');
    expect(judgeFor31Pro[0]).toBe('gemini-2.5-pro');
    expect(judgeFor31Pro).toContain('gemma-4-31b-it');
    expect(judgeFor31Pro).not.toContain('gemini-3.1-pro-preview');
    expect(judgeFor31Pro[0]).not.toContain('flash');
  });
});
