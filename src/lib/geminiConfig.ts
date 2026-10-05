export const OMNI_ORCHESTRATOR_ID = process.env.OMNI_ORCHESTRATOR_ID || 'google-omni-1.1';
export const OMNI_FLASH_MODEL_ID = process.env.OMNI_FLASH_MODEL_ID || 'gemini-omni-1.1-flash';
export const GEMINI_PRO_MODEL_ID = process.env.GEMINI_PRO_MODEL_ID || 'gemini-3.1-pro-preview';
export const GEMINI_FLASH_MODEL_ID = process.env.GEMINI_FLASH_MODEL_ID || 'gemini-3.8-flash';
export const GEMINI_FLASH_LIVE_MODEL_ID = process.env.GEMINI_FLASH_LIVE_MODEL_ID || 'gemini-3.1-flash-live-preview';
export const GEMINI_FALLBACK_PRO_MODEL_ID = process.env.GEMINI_FALLBACK_PRO_MODEL_ID || 'gemini-2.5-pro';
export const GEMINI_FALLBACK_FLASH_MODEL_ID = process.env.GEMINI_FALLBACK_FLASH_MODEL_ID || 'gemini-2.5-flash';
export const GEMINI_FALLBACK_FLASH_LIVE_MODEL_ID = process.env.GEMINI_FALLBACK_FLASH_LIVE_MODEL_ID || 'gemini-2.5-flash';
export const DEEPMIND_VEO_MODEL_ID = process.env.DEEPMIND_VEO_MODEL_ID || 'veo-3.1-generate-preview';
export const DEEPMIND_IMAGEN_MODEL_ID = process.env.DEEPMIND_IMAGEN_MODEL_ID || 'gemini-3.1-flash-image-preview';
export const DEEPMIND_LYRIA_MODEL_ID = process.env.DEEPMIND_LYRIA_MODEL_ID || 'lyria-3.5';
export const GEMINI_TTS_MODEL_ID = process.env.GEMINI_TTS_MODEL_ID || 'gemini-3.1-flash-tts-preview';
export const GEMINI_EMBEDDING_MODEL_ID = process.env.GEMINI_EMBEDDING_MODEL_ID || 'text-embedding-005';
export const GEMINI_MODEL_ID = process.env.GEMINI_MODEL_ID || GEMINI_FLASH_MODEL_ID;

export const GEMINI_MODELS = {
  ORCHESTRATOR_AND_AUDIT: OMNI_ORCHESTRATOR_ID,
  OMNI_FLASH: OMNI_FLASH_MODEL_ID,
  DEEP_REASONING_AND_VISION: GEMINI_PRO_MODEL_ID,
  FAST_SYNTHESIS_AND_COPILOT: GEMINI_FLASH_MODEL_ID,
  REALTIME_VOICE_AND_CANVAS: GEMINI_FLASH_LIVE_MODEL_ID,
  VIDEO_GENERATION: DEEPMIND_VEO_MODEL_ID,
  IMAGE_GENERATION: DEEPMIND_IMAGEN_MODEL_ID,
  MUSIC_AND_AUDIO: DEEPMIND_LYRIA_MODEL_ID,
  SPEECH_TTS: GEMINI_TTS_MODEL_ID,
  VECTOR_EMBEDDING: GEMINI_EMBEDDING_MODEL_ID,
} as const;

interface RequestGeminiKeyBox {
  apiKey: string | null;
}

interface AsyncLocalStorageLike<T> {
  getStore(): T | undefined;
  enterWith(store: T): void;
  run<R>(store: T, callback: () => R): R;
}

function getGeminiKeyAls(): AsyncLocalStorageLike<RequestGeminiKeyBox> | null {
  if (typeof window !== 'undefined') return null;
  const g = globalThis as unknown as {
    __promptCanvasGeminiKeyAls?: AsyncLocalStorageLike<RequestGeminiKeyBox> | null;
  };
  if (g.__promptCanvasGeminiKeyAls !== undefined) {
    return g.__promptCanvasGeminiKeyAls;
  }
  try {
    const asyncHooks = eval('require')('node:async_hooks') as {
      AsyncLocalStorage: new <T>() => AsyncLocalStorageLike<T>;
    };
    g.__promptCanvasGeminiKeyAls = new asyncHooks.AsyncLocalStorage<RequestGeminiKeyBox>();
  } catch {
    g.__promptCanvasGeminiKeyAls = null;
  }
  return g.__promptCanvasGeminiKeyAls;
}

/**
 * Synchronously initializes a request-isolated AsyncLocalStorage box before the first
 * `await` in a route guard so all downstream async continuations in the request share
 * the isolated box without cross-request leakage.
 */
export function initRequestGeminiKeyContext(): RequestGeminiKeyBox {
  const als = getGeminiKeyAls();
  const box: RequestGeminiKeyBox = { apiKey: null };
  if (als) {
    als.enterWith(box);
  }
  return box;
}

/**
 * Sets the active request's resolved Gemini API key inside the request-isolated
 * AsyncLocalStorage context box (never in a shared module-global variable).
 */
export function setActiveRequestGeminiApiKey(apiKey: string | null, contextBox?: RequestGeminiKeyBox): void {
  const normalized = apiKey && apiKey.trim().length > 0 ? apiKey.trim() : null;
  if (contextBox) {
    contextBox.apiKey = normalized;
  }
  const als = getGeminiKeyAls();
  if (als) {
    const existing = als.getStore();
    if (existing) {
      existing.apiKey = normalized;
    } else {
      als.enterWith(contextBox || { apiKey: normalized });
    }
  }
}

/**
 * Returns the effective Gemini API key for the current operation:
 * 1. Explicit key passed to the function (if non-empty)
 * 2. Active request's isolated AsyncLocalStorage BYOK key (set by enforceGeminiRouteGuard)
 * 3. Default system key (process.env.GEMINI_API_KEY, always used in Guest mode)
 */
export function getEffectiveGeminiApiKey(explicitKey?: string | null): string {
  if (explicitKey && explicitKey.trim().length > 0) {
    return explicitKey.trim();
  }
  const als = getGeminiKeyAls();
  const scopedKey = als?.getStore()?.apiKey;
  if (scopedKey) {
    return scopedKey;
  }
  return process.env.GEMINI_API_KEY || '';
}

export type ModelTier = 'omni' | 'lite' | 'medium' | 'pro' | 'critic' | 'vision' | 'chat' | 'live';


/**
 * 🧠 Unified 5-Tier Google Gemini & DeepMind Model Routing Engine
 * - Tier 'omni': Gemini 3.1 Pro SME Director & Multimodal Forensic Auditor (`gemini-3.1-pro-preview`)
 * - Tier 'pro', 'critic' & 'vision': Gemini 3.1 Pro (`gemini-3.1-pro-preview`, fallback `gemini-2.5-pro`)
 * - Tier 'medium', 'lite' & 'chat': Gemini 2.5 Flash (`gemini-2.5-flash`)
 * - Tier 'live': Gemini 2.5 Flash Live (`gemini-2.5-flash`)
 */
export function getGeminiModel(tier: ModelTier = 'pro'): string {
  if (tier === 'live') {
    return process.env.GEMINI_FLASH_LIVE_MODEL_ID || GEMINI_FLASH_LIVE_MODEL_ID;
  }
  if (tier === 'omni' || tier === 'pro' || tier === 'critic' || tier === 'vision') {
    return process.env.GEMINI_PRO_MODEL_ID || GEMINI_PRO_MODEL_ID;
  }
  return process.env.GEMINI_FLASH_MODEL_ID || GEMINI_FLASH_MODEL_ID;
}

export function getGeminiFallbackModel(tier: ModelTier = 'pro'): string {
  if (tier === 'live') {
    return GEMINI_FALLBACK_FLASH_MODEL_ID;
  }
  if (tier === 'omni' || tier === 'pro' || tier === 'critic' || tier === 'vision') {
    return GEMINI_FALLBACK_PRO_MODEL_ID;
  }
  return GEMINI_FALLBACK_FLASH_MODEL_ID;
}

export function getGeminiModelWithFallbacks(tier: ModelTier = 'pro'): string[] {
  if (tier === 'live') {
    return Array.from(new Set([
      getGeminiModel('live'),
      GEMINI_FLASH_MODEL_ID,
      GEMINI_FALLBACK_FLASH_MODEL_ID,
    ]));
  }
  const primary = getGeminiModel(tier);
  const fallback = getGeminiFallbackModel(tier);
  return primary === fallback ? [primary] : [primary, fallback];
}

export function getGeminiModelForArchitecture(archId?: string): string {
  return getGeminiModel('pro');
}

/**
 * ⚖️ Cross-Model LLM-as-a-Judge Separation Engine
 * Guarantees that the Judge / Critic model evaluating a diagram, refactor, patch, or specification
 * report is NEVER the same model ID that generated the artifact from user inputs.
 *
 * - Generator = Flash (`gemini-2.5-flash` / `gemini-2.5-flash` / `gemini-3.1-flash-live-preview`)
 *   -> Judge = `gemini-3.1-pro-preview` (fallback `gemini-2.5-pro`)
 * - Generator = Pro (`gemini-3.1-pro-preview`)
 *   -> Judge = `gemini-2.5-flash` (fallback `gemini-2.5-pro`)
 * - Generator = Fallback Pro (`gemini-2.5-pro`)
 *   -> Judge = `gemini-3.1-pro-preview` (fallback `gemini-2.5-flash`)
 */
export function getDistinctJudgeModel(generatorModelId?: string): string {
  const normalizedGen = (generatorModelId || '').trim().toLowerCase();
  const proModel = getGeminiModel('pro'); // gemini-3.1-pro-preview
  const flashModel = getGeminiModel('chat'); // gemini-2.5-flash

  if (!normalizedGen) {
    return proModel;
  }
  if (normalizedGen === proModel.toLowerCase()) {
    // Generator used Gemini 3.1 Pro -> use Gemini 2.5 Flash as orthogonal cross-family Judge
    return flashModel;
  }
  if (normalizedGen === flashModel.toLowerCase() || normalizedGen.includes('flash')) {
    // Generator used Flash -> use Gemini 3.1 Pro as higher-order reasoning Judge
    return proModel;
  }
  return normalizedGen === proModel.toLowerCase() ? flashModel : proModel;
}

export function getDistinctJudgeModelWithFallbacks(generatorModelId?: string): string[] {
  const normalizedGen = (generatorModelId || '').trim().toLowerCase();
  const primaryJudge = getDistinctJudgeModel(generatorModelId);
  const candidates = [
    primaryJudge,
    GEMINI_PRO_MODEL_ID,
    GEMINI_FLASH_MODEL_ID,
    GEMINI_FALLBACK_PRO_MODEL_ID,
    GEMINI_FALLBACK_FLASH_MODEL_ID,
  ].filter((m) => m.toLowerCase() !== normalizedGen);
  return Array.from(new Set(candidates));
}

export const LLM_JUDGE_MATRIX = {
  diagramGenerationV2: {
    generator: GEMINI_FLASH_MODEL_ID,
    judge: GEMINI_PRO_MODEL_ID,
    fallbackJudge: GEMINI_FALLBACK_PRO_MODEL_ID,
  },
  studio1TournamentAndPatch: {
    generator: GEMINI_PRO_MODEL_ID,
    judge: GEMINI_FLASH_MODEL_ID,
    fallbackJudge: GEMINI_FALLBACK_PRO_MODEL_ID,
  },
  docgenReportSynthesis: {
    generator: GEMINI_PRO_MODEL_ID,
    judge: GEMINI_FLASH_MODEL_ID,
    fallbackJudge: GEMINI_FALLBACK_PRO_MODEL_ID,
  },
  sixAuditPostureSuite: {
    generator: GEMINI_FLASH_MODEL_ID,
    judge: GEMINI_PRO_MODEL_ID,
    fallbackJudge: GEMINI_FALLBACK_PRO_MODEL_ID,
  },
} as const;

export type GenConfigKind = 'generate' | 'edit' | 'repair' | 'audit' | 'narrative' | 'vision';

export function getGenConfig(kind: GenConfigKind) {
  switch (kind) {
    case 'repair':
      return {
        thinkingConfig: {
          thinkingBudget: 100, // Minimal thinking budget for mechanical repair calls
        },
        temperature: 0.1,
        maxOutputTokens: 65536,
      };
    case 'audit':
      return {
        thinkingConfig: {
          thinkingBudget: 1000, // Deep thinking budget for Gemini 3.1 Pro architectural critic
        },
        temperature: 0.2,
        maxOutputTokens: 32768,
      };
    case 'vision':
      return {
        thinkingConfig: {
          thinkingBudget: 500, // Thinking budget for spatial bounding box estimation and OCR alignment
        },
        temperature: 0.1,
        maxOutputTokens: 65536, // CRITICAL: Prevent 8192 token truncation on dense 45+ node enterprise architecture diagrams
      };
    case 'generate':
      return {
        thinkingConfig: {
          thinkingBudget: 500, // Modest thinking budget for creative generation calls
        },
        temperature: 0.3,
        maxOutputTokens: 65536,
      };
    case 'edit':
    case 'narrative':
    default:
      return {
        temperature: 0.5,
        maxOutputTokens: 32768,
      };
  }
}
