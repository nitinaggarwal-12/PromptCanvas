export const GEMINI_PRO_MODEL_ID = process.env.GEMINI_PRO_MODEL_ID || 'gemini-3.1-pro';
export const GEMINI_FLASH_MODEL_ID = process.env.GEMINI_FLASH_MODEL_ID || 'gemini-3.7-flash';
export const GEMINI_MODEL_ID = process.env.GEMINI_MODEL_ID || GEMINI_PRO_MODEL_ID;

export type ModelTier = 'lite' | 'medium' | 'pro' | 'critic';

/**
 * 🧠 Unified Gemini Model Routing Engine
 * - Tier 'pro' & 'critic': Gemini 3.1 Pro (Deep architectural reasoning & Well-Architected validation)
 * - Tier 'medium' & 'lite': Gemini 3.7 Flash / Gemini 2.5 Flash (Sub-second streaming autocomplete)
 */
export function getGeminiModel(tier: ModelTier = 'pro'): string {
  if (tier === 'pro' || tier === 'critic') {
    return process.env.GEMINI_PRO_MODEL_ID || 'gemini-3.1-pro';
  }
  return process.env.GEMINI_FLASH_MODEL_ID || 'gemini-3.7-flash';
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
    case 'audit':
      return {
        thinkingConfig: {
          thinkingBudget: 1000, // Deep thinking budget for Gemini 3.1 Pro architectural critic
        },
      };
    case 'generate':
    case 'edit':
    case 'narrative':
    default:
      return {
        thinkingConfig: {
          thinkingBudget: 500, // Modest thinking budget for creative generation calls
        },
      };
  }
}
