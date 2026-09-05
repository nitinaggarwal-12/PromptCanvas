export const GEMINI_PRO_MODEL_ID = process.env.GEMINI_PRO_MODEL_ID || 'gemini-3.1-pro-preview';
export const GEMINI_FLASH_MODEL_ID = process.env.GEMINI_FLASH_MODEL_ID || 'gemini-3.8-flash';
export const GEMINI_FALLBACK_PRO_MODEL_ID = process.env.GEMINI_FALLBACK_PRO_MODEL_ID || 'gemini-2.5-pro';
export const GEMINI_FALLBACK_FLASH_MODEL_ID = process.env.GEMINI_FALLBACK_FLASH_MODEL_ID || 'gemini-2.5-flash';
export const GEMINI_MODEL_ID = process.env.GEMINI_MODEL_ID || GEMINI_PRO_MODEL_ID;

export type ModelTier = 'lite' | 'medium' | 'pro' | 'critic' | 'vision' | 'chat';

/**
 * 🧠 Unified Gemini Model Routing Engine
 * - Tier 'pro', 'critic' & 'vision': Gemini 3.1 Pro Preview (Deep architectural reasoning & high-precision vision decompilation)
 * - Tier 'medium', 'lite' & 'chat': Gemini 3.8 Flash (Sub-second streaming autocomplete & intent routing)
 */
export function getGeminiModel(tier: ModelTier = 'pro'): string {
  if (tier === 'pro' || tier === 'critic' || tier === 'vision') {
    return process.env.GEMINI_PRO_MODEL_ID || GEMINI_PRO_MODEL_ID;
  }
  return process.env.GEMINI_FLASH_MODEL_ID || GEMINI_FLASH_MODEL_ID;
}

export function getGeminiFallbackModel(tier: ModelTier = 'pro'): string {
  if (tier === 'pro' || tier === 'critic' || tier === 'vision') {
    return GEMINI_FALLBACK_PRO_MODEL_ID;
  }
  return GEMINI_FALLBACK_FLASH_MODEL_ID;
}

export function getGeminiModelWithFallbacks(tier: ModelTier = 'pro'): string[] {
  const primary = getGeminiModel(tier);
  const fallback = getGeminiFallbackModel(tier);
  return primary === fallback ? [primary] : [primary, fallback];
}

export function getGeminiModelForArchitecture(archId?: string): string {
  return getGeminiModel('pro');
}

export type GenConfigKind = 'generate' | 'edit' | 'repair' | 'audit' | 'narrative' | 'vision';

export function getGenConfig(kind: GenConfigKind) {
  switch (kind) {
    case 'repair':
      return {
        thinkingConfig: {
          thinkingBudget: 100, // Minimal thinking budget for mechanical repair calls
        },
        temperature: 0.1,
      };
    case 'audit':
      return {
        thinkingConfig: {
          thinkingBudget: 1000, // Deep thinking budget for Gemini 3.1 Pro architectural critic
        },
        temperature: 0.2,
      };
    case 'vision':
      return {
        thinkingConfig: {
          thinkingBudget: 500, // Thinking budget for spatial bounding box estimation and OCR alignment
        },
        temperature: 0.1,
      };
    case 'generate':
      return {
        thinkingConfig: {
          thinkingBudget: 500, // Modest thinking budget for creative generation calls
        },
        temperature: 0.3,
      };
    case 'edit':
    case 'narrative':
    default:
      return {
        temperature: 0.5,
      };
  }
}
