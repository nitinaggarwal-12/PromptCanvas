import { describe, it, expect } from 'vitest';
import {
  getGeminiModel,
  getGeminiFallbackModel,
  getGeminiModelWithFallbacks,
  getGenConfig,
} from '../../src/lib/geminiConfig';
import { decompileArchitectureImageWithDeepMind } from '../../src/lib/deepmindVisionDecompiler';
import { validateDrawioXml } from '../../src/lib/validate/validator';
import { ensureTablesExist } from '../../src/lib/db';

describe('Gemini Model Routing & Vision Decompilation Architecture', () => {
  it('routes pro, critic, and vision tiers to Gemini 3.1 Pro Preview with Gemini 2.5 Pro fallback', () => {
    expect(getGeminiModel('pro')).toBe('gemini-3.1-pro-preview');
    expect(getGeminiModel('critic')).toBe('gemini-3.1-pro-preview');
    expect(getGeminiModel('vision')).toBe('gemini-3.1-pro-preview');

    expect(getGeminiFallbackModel('pro')).toBe('gemini-2.5-pro');
    expect(getGeminiFallbackModel('critic')).toBe('gemini-2.5-pro');
    expect(getGeminiFallbackModel('vision')).toBe('gemini-2.5-pro');

    const visionChain = getGeminiModelWithFallbacks('vision');
    expect(visionChain).toEqual(['gemini-3.1-pro-preview', 'gemini-2.5-pro']);
  });

  it('routes chat, lite, and medium tiers to Gemini 3.8 Flash with Gemini 2.5 Flash fallback', () => {
    expect(getGeminiModel('chat')).toBe('gemini-3.8-flash');
    expect(getGeminiModel('lite')).toBe('gemini-3.8-flash');
    expect(getGeminiModel('medium')).toBe('gemini-3.8-flash');

    expect(getGeminiFallbackModel('chat')).toBe('gemini-2.5-flash');
    expect(getGeminiFallbackModel('lite')).toBe('gemini-2.5-flash');
    expect(getGeminiFallbackModel('medium')).toBe('gemini-2.5-flash');

    const chatChain = getGeminiModelWithFallbacks('chat');
    expect(chatChain).toEqual(['gemini-3.8-flash', 'gemini-2.5-flash']);
  });

  it('configures specialized thinking budgets and temperatures for vision, audit, and repair', () => {
    const visionConfig = getGenConfig('vision');
    expect(visionConfig.thinkingConfig?.thinkingBudget).toBe(500);
    expect(visionConfig.temperature).toBe(0.1);

    const auditConfig = getGenConfig('audit');
    expect(auditConfig.thinkingConfig?.thinkingBudget).toBe(1000);
    expect(auditConfig.temperature).toBe(0.2);

    const repairConfig = getGenConfig('repair');
    expect(repairConfig.thinkingConfig?.thinkingBudget).toBe(100);
    expect(repairConfig.temperature).toBe(0.1);
  });

  it('decompiles architecture image via deterministic master engine when offline or no key is provided', async () => {
    // 1x1 transparent PNG base64
    const sampleImageBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

    const result = await decompileArchitectureImageWithDeepMind({
      imageBase64: sampleImageBase64,
      projectName: 'Test Enterprise Banking',
      useCaseName: 'Core Transaction Ingestion',
    });

    expect(result.xml).toBeDefined();
    expect(result.xml).toContain('<mxfile');
    expect(result.xml).toContain('</mxfile>');
    expect(result.componentCount).toBeGreaterThan(15);
    expect(result.extractedZones.length).toBeGreaterThanOrEqual(3);

    // Validate the decompiled Draw.io XML
    const validation = validateDrawioXml(result.xml);
    expect(validation.errors).toHaveLength(0);
  });

  it('deduplicates in-flight database table initialization across concurrent calls', async () => {
    // Calling ensureTablesExist concurrently should execute without race conditions or error
    const results = await Promise.all([
      ensureTablesExist(),
      ensureTablesExist(),
      ensureTablesExist()
    ]);
    expect(results).toHaveLength(3);
  });
});
