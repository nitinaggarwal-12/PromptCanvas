export const GEMINI_MODEL_ID = process.env.GEMINI_MODEL_ID || 'gemini-3.1-pro-preview';

export type ModelTier = 'lite' | 'medium' | 'pro';

/**
 * 🧠 Unified Gemini 3.1 Pro Architectural Engine
 * - Enforces Gemini 3.1 Pro across all tiers, generation calls, audits, and pipeline synthesis.
 */
export function getGeminiModel(tier: ModelTier = 'pro'): string {
  return process.env.GEMINI_PRO_MODEL_ID || process.env.GEMINI_MODEL_ID || 'gemini-3.1-pro-preview';
}

export function getGeminiModelForArchitecture(archId?: string): string {
  return getGeminiModel('pro');
}

export type GenConfigKind = 'generate' | 'edit' | 'repair' | 'audit' | 'narrative';

export function getGenConfig(kind: GenConfigKind) {
  switch (kind) {
    case 'repair':
      return {
        thinkingConfig: {
          thinkingBudget: 100, // Minimal thinking budget for mechanical repair calls
        },
      };
    case 'generate':
    case 'edit':
    case 'audit':
    case 'narrative':
    default:
      return {
        thinkingConfig: {
          thinkingBudget: 500, // Modest thinking budget for creative architectural generation calls
        },
      };
  }
}
