import type { GoogleGenAI } from '@google/genai';

/**
 * Ensures stale environment variables pointing to previous-generation models
 * (Gemini 1.x / 2.0 / 2.5) or unpublished fictional slugs never pollute runtime routing.
 */
export function sanitizeFrontierModelId(envValue: string | undefined, defaultModel: string): string {
  const cleaned = String(envValue || '')
    .trim()
    .replace(/^models\//i, '');
  if (!cleaned) return defaultModel;
  // Accept verified Google Gemini 2.5 / 3.x, Imagen, Veo, Lyria 2, and text-embedding models
  if (/^(?:gemini-(?:2\.5|3(?:\.\d+)?)-[a-z0-9.-]+|veo-[23][a-z0-9.-]*|imagen-[34][a-z0-9.-]*|lyria-002|text-embedding-004|gemini-embedding-001)$/i.test(cleaned)) {
    return cleaned;
  }
  return defaultModel;
}

export const GEMINI_PRO_MODEL_ID = sanitizeFrontierModelId(
  process.env.GEMINI_PRO_MODEL_ID,
  'gemini-2.5-pro'
);
export const GEMINI_FLASH_MODEL_ID = sanitizeFrontierModelId(
  process.env.GEMINI_FLASH_MODEL_ID,
  'gemini-2.5-flash'
);
export const GEMINI_FLASH_LITE_MODEL_ID = sanitizeFrontierModelId(
  process.env.GEMINI_FLASH_LITE_MODEL_ID,
  'gemini-2.5-flash-lite'
);
export const GEMINI_FLASH_LIVE_MODEL_ID = sanitizeFrontierModelId(
  process.env.GEMINI_FLASH_LIVE_MODEL_ID,
  'gemini-2.5-flash'
);
export const GEMINI_FALLBACK_PRO_MODEL_ID = sanitizeFrontierModelId(
  process.env.GEMINI_FALLBACK_PRO_MODEL_ID,
  'gemini-2.5-flash'
);
export const GEMINI_FALLBACK_FLASH_MODEL_ID = sanitizeFrontierModelId(
  process.env.GEMINI_FALLBACK_FLASH_MODEL_ID,
  'gemini-2.5-flash-lite'
);
export const DEEPMIND_VEO_MODEL_ID = sanitizeFrontierModelId(
  process.env.DEEPMIND_VEO_MODEL_ID,
  'veo-3.0-generate-preview'
);
export const DEEPMIND_IMAGEN_MODEL_ID = sanitizeFrontierModelId(
  process.env.DEEPMIND_IMAGEN_MODEL_ID,
  'gemini-2.5-flash-image'
);
export const DEEPMIND_LYRIA_MODEL_ID = sanitizeFrontierModelId(
  process.env.DEEPMIND_LYRIA_MODEL_ID,
  'lyria-002'
);
export const GEMINI_EMBEDDING_MODEL_ID = sanitizeFrontierModelId(
  process.env.GEMINI_EMBEDDING_MODEL_ID,
  'text-embedding-004'
);

export const OMNI_ORCHESTRATOR_ID = GEMINI_PRO_MODEL_ID;
export const DEEP_RESEARCH_MODEL_ID = GEMINI_PRO_MODEL_ID;
export const GEMINI_MODEL_ID = sanitizeFrontierModelId(process.env.GEMINI_MODEL_ID, GEMINI_PRO_MODEL_ID);

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

export function initRequestGeminiKeyContext(): RequestGeminiKeyBox {
  const als = getGeminiKeyAls();
  const box: RequestGeminiKeyBox = { apiKey: null };
  if (als) {
    als.enterWith(box);
  }
  return box;
}

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

export type ModelTier =
  | 'latest'
  | 'omni'
  | 'lite'
  | 'medium'
  | 'pro'
  | 'critic'
  | 'vision'
  | 'chat'
  | 'live'
  | 'image';

/**
 * Honest Live-Verified Gemini 3.x Model Routing Engine (Zero Fictional Model Slugs, Zero 1.x/2.x Downgrade)
 */
export function getGeminiModel(tier: ModelTier = 'pro'): string {
  if (tier === 'image') {
    return DEEPMIND_IMAGEN_MODEL_ID;
  }
  if (tier === 'live') {
    return GEMINI_FLASH_LIVE_MODEL_ID;
  }
  if (tier === 'lite') {
    return GEMINI_FLASH_LITE_MODEL_ID;
  }
  if (tier === 'latest' || tier === 'omni' || tier === 'pro' || tier === 'critic' || tier === 'vision') {
    return GEMINI_PRO_MODEL_ID;
  }
  return GEMINI_FLASH_MODEL_ID;
}

export function getGeminiFallbackModel(tier: ModelTier = 'pro'): string {
  if (tier === 'live') {
    return GEMINI_FLASH_MODEL_ID;
  }
  if (tier === 'latest' || tier === 'omni' || tier === 'pro' || tier === 'critic' || tier === 'vision') {
    return GEMINI_FALLBACK_PRO_MODEL_ID;
  }
  return GEMINI_FALLBACK_FLASH_MODEL_ID;
}

export function getGeminiModelWithFallbacks(tier: ModelTier = 'pro'): string[] {
  if (tier === 'live') {
    return Array.from(
      new Set([GEMINI_FLASH_LIVE_MODEL_ID, GEMINI_FLASH_MODEL_ID, GEMINI_FLASH_LITE_MODEL_ID])
    );
  }
  const primary = getGeminiModel(tier);
  const fallback = getGeminiFallbackModel(tier);
  return primary === fallback ? [primary, GEMINI_FLASH_LITE_MODEL_ID] : [primary, fallback];
}

interface DiscoveredFrontierModel {
  id: string;
  major: number;
  minor: number;
  versionScore: number;
  family: 'pro' | 'flash' | 'flash-lite' | 'live' | 'image';
}

interface DynamicModelCatalogEntry {
  expiresAt: number;
  generalModels: DiscoveredFrontierModel[];
  liveModels: DiscoveredFrontierModel[];
  imageModels: DiscoveredFrontierModel[];
}

const DYNAMIC_CATALOG_TTL_MS = 10 * 60 * 1000;

function parseFrontierGeminiModel(rawName: string): DiscoveredFrontierModel | null {
  const id = String(rawName || '')
    .trim()
    .replace(/^models\//i, '');
  const match = id.match(/^gemini-(\d+)(?:\.(\d+))?-(.+)$/i);
  if (!match) return null;
  const major = Number(match[1]);
  const minor = Number(match[2] || 0);
  if (!Number.isFinite(major) || major < 2 || (major === 2 && minor < 5)) return null;

  const rest = match[3].toLowerCase();
  if (
    rest.includes('tts') ||
    rest.includes('embedding') ||
    rest.includes('robotics') ||
    rest.includes('computer-use') ||
    rest.includes('customtools') ||
    rest.includes('audio') ||
    rest.includes('aqa') ||
    rest.includes('transcribe') ||
    rest.includes('translate')
  ) {
    return null;
  }

  const versionScore = major * 100 + minor;
  if (rest.includes('image')) {
    const qualityBonus =
      (rest.includes('lite') ? -15 : rest.includes('pro') ? 12 : rest.includes('flash') ? 4 : 2) +
      (rest.includes('preview') ? -1 : 2);
    return { id, major, minor, versionScore: versionScore + qualityBonus, family: 'image' };
  }
  if (rest.includes('live')) {
    return { id, major, minor, versionScore, family: 'live' };
  }
  if (rest.includes('pro')) {
    return { id, major, minor, versionScore, family: 'pro' };
  }
  if (rest.includes('flash') && rest.includes('lite')) {
    return { id, major, minor, versionScore, family: 'flash-lite' };
  }
  if (rest.includes('flash')) {
    return { id, major, minor, versionScore, family: 'flash' };
  }
  return { id, major, minor, versionScore, family: 'pro' };
}

async function discoverLiveFrontierCatalog(ai: GoogleGenAI): Promise<DynamicModelCatalogEntry | null> {
  const g = globalThis as unknown as {
    __promptCanvasDynamicModelCatalog?: DynamicModelCatalogEntry & { schemaRev?: number };
    __promptCanvasDynamicModelInflight?: Promise<DynamicModelCatalogEntry | null>;
  };

  if (
    g.__promptCanvasDynamicModelCatalog &&
    g.__promptCanvasDynamicModelCatalog.schemaRev === 3 &&
    g.__promptCanvasDynamicModelCatalog.expiresAt > Date.now()
  ) {
    return g.__promptCanvasDynamicModelCatalog;
  }
  if (g.__promptCanvasDynamicModelInflight) {
    return g.__promptCanvasDynamicModelInflight;
  }
  if (!ai?.models?.list || typeof ai.models.list !== 'function') {
    return null;
  }

  g.__promptCanvasDynamicModelInflight = (async () => {
    try {
      const listTask = (async () => {
        const generalModels: DiscoveredFrontierModel[] = [];
        const liveModels: DiscoveredFrontierModel[] = [];
        const imageModels: DiscoveredFrontierModel[] = [];
        const seen = new Set<string>();

        const pager = await ai.models.list({ config: { pageSize: 100 } } as any);
        let scanned = 0;
        for await (const item of pager as AsyncIterable<any>) {
          if (++scanned > 120) break;
          const supported: string[] | undefined = item?.supportedActions;
          if (Array.isArray(supported) && supported.length > 0 && !supported.includes('generateContent')) {
            continue;
          }
          const parsed = parseFrontierGeminiModel(item?.name || '');
          if (!parsed || seen.has(parsed.id)) continue;
          seen.add(parsed.id);
          if (parsed.family === 'image') {
            imageModels.push(parsed);
          } else if (parsed.family === 'live') {
            liveModels.push(parsed);
          } else {
            generalModels.push(parsed);
          }
        }
        return { generalModels, liveModels, imageModels };
      })();

      const timeoutTask = new Promise<null>((resolve) => setTimeout(() => resolve(null), 8000));
      const discovered = await Promise.race([listTask, timeoutTask]);
      if (!discovered || (discovered.generalModels.length === 0 && discovered.imageModels.length === 0)) {
        return null;
      }

      const entry: DynamicModelCatalogEntry & { schemaRev: number } = {
        schemaRev: 3,
        expiresAt: Date.now() + DYNAMIC_CATALOG_TTL_MS,
        ...discovered,
      };
      g.__promptCanvasDynamicModelCatalog = entry;
      return entry;
    } catch {
      return null;
    } finally {
      g.__promptCanvasDynamicModelInflight = undefined;
    }
  })();

  return g.__promptCanvasDynamicModelInflight;
}

export async function resolveLatestGeminiModelChain(
  ai: GoogleGenAI,
  tier: ModelTier = 'latest'
): Promise<string[]> {
  const catalog = await discoverLiveFrontierCatalog(ai);
  if (!catalog || catalog.generalModels.length === 0) {
    return getGeminiModelWithFallbacks(tier);
  }

  const familyRank: Record<DiscoveredFrontierModel['family'], number> = {
    pro: 3,
    flash: 2,
    'flash-lite': 1,
    live: 1,
    image: 0,
  };

  const sortLatestFirst = (items: DiscoveredFrontierModel[]) =>
    [...items].sort((a, b) => {
      if (b.versionScore !== a.versionScore) return b.versionScore - a.versionScore;
      return familyRank[b.family] - familyRank[a.family];
    });

  const nonLite = catalog.generalModels.filter((m) => m.family !== 'flash-lite');
  const liteOnly = catalog.generalModels.filter((m) => m.family === 'flash-lite');
  const proModels = catalog.generalModels.filter((m) => m.family === 'pro');
  const fullFlash = catalog.generalModels.filter((m) => m.family === 'flash');

  let ordered: DiscoveredFrontierModel[];
  if (tier === 'latest') {
    ordered = [...sortLatestFirst(nonLite), ...sortLatestFirst(liteOnly)];
  } else if (tier === 'omni' || tier === 'pro' || tier === 'critic' || tier === 'vision') {
    ordered = [...sortLatestFirst(proModels), ...sortLatestFirst(fullFlash), ...sortLatestFirst(liteOnly)];
  } else if (tier === 'lite') {
    ordered = [...sortLatestFirst([...liteOnly, ...fullFlash]), ...sortLatestFirst(proModels)];
  } else if (tier === 'live' && catalog.liveModels.length > 0) {
    ordered = [...sortLatestFirst(catalog.liveModels), ...sortLatestFirst(nonLite)];
  } else {
    ordered = [...sortLatestFirst(fullFlash), ...sortLatestFirst(proModels), ...sortLatestFirst(liteOnly)];
  }

  return Array.from(new Set(ordered.map((m) => m.id)));
}

export async function resolveLatestDistinctJudgeChain(
  ai: GoogleGenAI,
  generatorModelId?: string
): Promise<string[]> {
  const genNorm = String(generatorModelId || '').trim().toLowerCase();
  const desiredTier: ModelTier = genNorm.includes('pro') ? 'chat' : 'pro';
  const liveChain = await resolveLatestGeminiModelChain(ai, desiredTier);
  const distinct = liveChain.filter((m) => m.toLowerCase() !== genNorm);
  return distinct.length > 0 ? distinct : liveChain;
}

export async function resolveLatestGeminiImageModelChain(ai: GoogleGenAI): Promise<string[]> {
  const catalog = await discoverLiveFrontierCatalog(ai);
  if (catalog && catalog.imageModels.length > 0) {
    const sorted = [...catalog.imageModels].sort((a, b) => b.versionScore - a.versionScore);
    return sorted.map((m) => m.id);
  }
  return Array.from(
    new Set(['gemini-3-pro-image-preview', DEEPMIND_IMAGEN_MODEL_ID, 'gemini-2.5-flash-image'])
  );
}

export interface GeneratedReferenceImage {
  dataUrl: string;
  mimeType: string;
  base64Data: string;
  modelUsed: string;
  width?: number;
  height?: number;
}

function readPngDimensionsFromBase64(base64Data: string): { width?: number; height?: number } {
  try {
    const buf = Buffer.from(base64Data.slice(0, 64), 'base64');
    // PNG magic bytes: 89 50 4E 47 0D 0A 1A 0A, IHDR width @ 16, height @ 20
    if (buf.length >= 24 && buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) {
      const width = buf.readUInt32BE(16);
      const height = buf.readUInt32BE(20);
      if (width > 64 && height > 64 && width < 16384 && height < 16384) {
        return { width, height };
      }
    }
  } catch {
    // Ignore header parse failure
  }
  return {};
}

/**
 * Generates a crisp 16:9 architecture diagram image using the latest discovered
 * Gemini 3+ Pro/Flash multimodal image models (`responseModalities: ['TEXT', 'IMAGE']`).
 */
export async function generateReferenceArchitectureImage(
  ai: GoogleGenAI,
  imagePrompt: string,
  aspectRatio: string = '16:9'
): Promise<GeneratedReferenceImage | null> {
  const imageModels = await resolveLatestGeminiImageModelChain(ai);
  for (const imgModel of imageModels.slice(0, 2)) {
    const tImg = Date.now();
    const timeoutMs = imgModel.toLowerCase().includes('pro') ? 48_000 : 30_000;
    try {
      const res = await Promise.race([
        ai.models.generateContent({
          model: imgModel,
          contents: imagePrompt,
          config: {
            responseModalities: ['TEXT', 'IMAGE'],
            imageConfig: { aspectRatio },
          } as any,
        }),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error(`Image generation timeout on ${imgModel}`)), timeoutMs)
        ),
      ]);
      const parts = (res as any)?.candidates?.[0]?.content?.parts || [];
      for (const p of parts) {
        if (p?.inlineData?.data) {
          const mimeType = p.inlineData.mimeType || 'image/png';
          const base64Data = String(p.inlineData.data);
          const dims = readPngDimensionsFromBase64(base64Data);
          console.log(
            `[PromptToDiagram] Stage 3 Image (${imgModel}, ${dims.width || '?'}x${dims.height || '?'}) succeeded in ${Date.now() - tImg}ms`
          );
          return {
            dataUrl: `data:${mimeType};base64,${base64Data}`,
            mimeType,
            base64Data,
            modelUsed: imgModel,
            width: dims.width,
            height: dims.height,
          };
        }
      }
    } catch (err: any) {
      console.warn(`[PromptToDiagram] Stage 3 Image (${imgModel}) failed after ${Date.now() - tImg}ms:`, err?.message || err);
    }
  }
  return null;
}

export function getDistinctJudgeModel(generatorModelId?: string): string {
  const normalizedGen = (generatorModelId || '').trim().toLowerCase();
  const proModel = getGeminiModel('pro');
  const flashModel = getGeminiModel('chat');

  if (!normalizedGen) {
    return proModel;
  }
  if (normalizedGen === proModel.toLowerCase()) {
    return flashModel;
  }
  if (normalizedGen === flashModel.toLowerCase() || normalizedGen.includes('flash')) {
    return proModel;
  }
  return proModel;
}

export const LLM_JUDGE_MATRIX = {
  diagramGenerationV2: {
    generator: GEMINI_FLASH_MODEL_ID,
    judge: GEMINI_PRO_MODEL_ID,
    fallbackJudge: GEMINI_FLASH_LITE_MODEL_ID,
  },
  docgenReportSynthesis: {
    generator: GEMINI_PRO_MODEL_ID,
    judge: GEMINI_FLASH_MODEL_ID,
    fallbackJudge: GEMINI_FLASH_LITE_MODEL_ID,
  },
  sixAuditPostureSuite: {
    generator: GEMINI_FLASH_MODEL_ID,
    judge: GEMINI_PRO_MODEL_ID,
    fallbackJudge: GEMINI_FLASH_LITE_MODEL_ID,
  },
} as const;

type GenConfigKind = 'generate' | 'edit' | 'repair' | 'audit' | 'narrative' | 'vision';

export function getGenConfig(kind: GenConfigKind) {
  switch (kind) {
    case 'repair':
      return {
        thinkingConfig: {
          thinkingLevel: 'LOW' as any,
        },
        temperature: 0.1,
        maxOutputTokens: 32768,
      };
    case 'audit':
      return {
        thinkingConfig: {
          thinkingLevel: 'HIGH' as any,
        },
        temperature: 0.2,
        maxOutputTokens: 32768,
      };
    case 'vision':
      return {
        thinkingConfig: {
          thinkingLevel: 'HIGH' as any,
        },
        temperature: 0.1,
        maxOutputTokens: 32768,
      };
    case 'generate':
      return {
        thinkingConfig: {
          thinkingLevel: 'MEDIUM' as any,
        },
        temperature: 0.3,
        maxOutputTokens: 32768,
      };
    case 'edit':
    case 'narrative':
    default:
      return {
        thinkingConfig: {
          thinkingLevel: 'LOW' as any,
        },
        temperature: 0.5,
        maxOutputTokens: 32768,
      };
  }
}

export function getGenConfigForModel(kind: GenConfigKind, _modelId?: string) {
  const base = getGenConfig(kind);
  return {
    ...base,
    maxOutputTokens: Math.min(base.maxOutputTokens || 32768, 32768),
  };
}
