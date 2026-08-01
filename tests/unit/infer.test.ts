import { describe, it, expect } from 'vitest';
import { extractSystemModel } from '../../src/lib/compose/extract';
import { fillInferredSections } from '../../src/lib/compose/infer';
import { buildInferredPrompt } from '../../src/prompts/compose/prompts';

describe('Phase 4: Inferred-Fill (Gemini) with Graceful Fallback', () => {
  it('builds valid prompt containing SystemModel context', () => {
    const model = extractSystemModel({
      title: 'Banking System',
      domain: 'FinTech',
    });
    const prompt = buildInferredPrompt(model, [{ id: 'problem_statement', title: 'Problem Statement' }]);
    expect(prompt).toContain('Banking System');
    expect(prompt).toContain('problem_statement');
  });

  it('gracefully returns generation unavailable TODO when GEMINI_API_KEY is not set', async () => {
    const model = extractSystemModel({ title: 'Test System' });
    const res = await fillInferredSections(model, [{ id: 'exec_summary', title: 'Executive Summary' }]);
    expect(res.exec_summary).toBeDefined();
    expect(res.exec_summary.paragraphs[0]).toContain('Executive engineering specification');
  });
});
