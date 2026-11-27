import { GoogleGenAI } from '@google/genai';

/**
 * Ensures stale environment variables pointing to previous-generation models
 * (Gemini 1.x / 2.0), internal codenames, or Bidi-only audio slugs never pollute runtime routing.
 */
const BANNED_MODEL_SUBSTRINGS = [
  'argon',
  'carbon',
  'hydrogen',
  'neon',
  'nano-banana',
  'antigravity',
  'omni-1.',
  'omni-flash',
  'deep-research',
  'computer-use',
  'robotics',
  'customtools',
];

export function sanitizeFrontierModelId(envValue: string | undefined, defaultModel: string): string {
  const cleaned = String(envValue || '')
    .trim()
    .replace(/^models\//i, '');
  if (!cleaned) return defaultModel;
  const lower = cleaned.toLowerCase();
  if (BANNED_MODEL_SUBSTRINGS.some((tok) => lower.includes(tok))) {
    return defaultModel;
  }
  // Accept verified Google Gemini 2.5 / 3.x, Gemma 4 open-weights critics, Imagen, Veo, Lyria, and embedding models
  if (
    /^(?:gemini-(?:2\.5|3(?:\.\d+)?)-[a-z0-9.-]+|gemma-4-[a-z0-9.-]+|veo-[23][a-z0-9.-]*|imagen-[34][a-z0-9.-]*|lyria-[a-z0-9.-]+|text-embedding-004|gemini-embedding-001)$/i.test(
      cleaned
    )
  ) {
    return cleaned;
  }
  return defaultModel;
}

export const GEMINI_PRO_MODEL_ID = sanitizeFrontierModelId(
  process.env.GEMINI_PRO_MODEL_ID,
  'gemini-3.1-pro-preview'
);
export const GEMINI_SECONDARY_PRO_MODEL_ID = sanitizeFrontierModelId(
  process.env.GEMINI_SECONDARY_PRO_MODEL_ID,
  'gemini-2.5-pro'
);
export const GEMINI_FLASH_MODEL_ID = sanitizeFrontierModelId(
  process.env.GEMINI_FLASH_MODEL_ID,
  'gemini-3-flash-preview'
);
export const GEMINI_SECONDARY_FLASH_MODEL_ID = sanitizeFrontierModelId(
  process.env.GEMINI_SECONDARY_FLASH_MODEL_ID,
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
  'gemini-2.5-pro'
);
export const GEMINI_FALLBACK_FLASH_MODEL_ID = sanitizeFrontierModelId(
  process.env.GEMINI_FALLBACK_FLASH_MODEL_ID,
  'gemini-2.5-flash'
);
export const CROSS_FAMILY_JUDGE_MODEL_ID = sanitizeFrontierModelId(
  process.env.CROSS_FAMILY_JUDGE_MODEL_ID,
  'gemma-4-31b-it'
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
  if (typeof window !== 'undefined') {
    return explicitKey && explicitKey.trim().length > 0 ? explicitKey.trim() : '';
  }
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

interface CachedVertexToken {
  token: string;
  expiresAt: number;
  project: string;
  location: string;
}

export function invalidateVertexTokenCache(): void {
  const g = globalThis as unknown as { __pcVertexTokenCache?: CachedVertexToken | null };
  g.__pcVertexTokenCache = null;
}

/**
 * Resolves a GCP Service Account token via Cloud Run / GCE Metadata Server first
 * (works inside slim production containers where `gcloud` CLI is not installed),
 * falling back to local `gcloud` CLI only on developer workstations.
 */
export async function resolveVertexAccessTokenAsync(forceRefresh = false): Promise<CachedVertexToken | null> {
  if (typeof window !== 'undefined') return null;
  const g = globalThis as unknown as { __pcVertexTokenCache?: CachedVertexToken | null };
  if (!forceRefresh && g.__pcVertexTokenCache && g.__pcVertexTokenCache.expiresAt > Date.now() + 15_000) {
    return g.__pcVertexTokenCache;
  }
  if (process.env.VITEST && !process.env.PROMPTCANVAS_ENABLE_LIVE_VERTEX_IN_TESTS) {
    return null;
  }
  const useVertex =
    process.env.GOOGLE_GENAI_USE_VERTEXAI === 'true' ||
    process.env.PROMPTCANVAS_USE_VERTEXAI === 'true' ||
    Boolean(process.env.K_SERVICE || process.env.GOOGLE_CLOUD_PROJECT || process.env.GCLOUD_PROJECT);
  if (!useVertex && process.env.NODE_ENV === 'test') {
    return null;
  }

  const location = (process.env.GOOGLE_CLOUD_LOCATION || 'global').trim();
  let project = (process.env.GOOGLE_CLOUD_PROJECT || process.env.GCLOUD_PROJECT || '').trim();

  // 1. Primary path: GCP Metadata Server (Cloud Run / GKE / GCE — zero `gcloud` binary needed)
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 1500);
    const metaHeaders = { 'Metadata-Flavor': 'Google' };
    try {
      if (!project) {
        const pRes = await fetch(
          'http://metadata.google.internal/computeMetadata/v1/project/project-id',
          { headers: metaHeaders, signal: ctrl.signal }
        );
        if (pRes.ok) {
          project = (await pRes.text()).trim();
        }
      }
      if (project) {
        const tRes = await fetch(
          'http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token',
          { headers: metaHeaders, signal: ctrl.signal }
        );
        if (tRes.ok) {
          const data = (await tRes.json()) as { access_token?: string; expires_in?: number };
          if (data?.access_token && data.access_token.length >= 20) {
            const ttlMs = Math.max(60, Number(data.expires_in || 300) - 60) * 1000;
            const cached: CachedVertexToken = {
              token: data.access_token,
              expiresAt: Date.now() + ttlMs,
              project,
              location,
            };
            g.__pcVertexTokenCache = cached;
            return cached;
          }
        }
      }
    } finally {
      clearTimeout(timer);
    }
  } catch {
    // Metadata server unavailable (local workstation); fall through to local gcloud CLI
  }

  // 2. Workstation fallback: local `gcloud` CLI (strictly fixed binary & args, zero user input)
  return resolveVertexAccessTokenSync(forceRefresh);
}

function resolveVertexAccessTokenSync(forceRefresh = false): CachedVertexToken | null {
  if (typeof window !== 'undefined') return null;
  const g = globalThis as unknown as { __pcVertexTokenCache?: CachedVertexToken | null };
  if (!forceRefresh && g.__pcVertexTokenCache && g.__pcVertexTokenCache.expiresAt > Date.now() + 15_000) {
    return g.__pcVertexTokenCache;
  }
  if (process.env.VITEST && !process.env.PROMPTCANVAS_ENABLE_LIVE_VERTEX_IN_TESTS) {
    return null;
  }
  const useVertex =
    process.env.GOOGLE_GENAI_USE_VERTEXAI === 'true' ||
    process.env.PROMPTCANVAS_USE_VERTEXAI === 'true' ||
    Boolean(process.env.GOOGLE_CLOUD_PROJECT || process.env.GCLOUD_PROJECT);
  if (!useVertex && process.env.NODE_ENV === 'test') {
    return null;
  }
  // Inside Cloud Run slim containers (`K_SERVICE`), `gcloud` is not installed; rely on async Metadata Server
  if (process.env.K_SERVICE) {
    return g.__pcVertexTokenCache || null;
  }
  try {
    const childProc = eval('require')('node:child_process') as typeof import('child_process');
    const project = (
      process.env.GOOGLE_CLOUD_PROJECT ||
      process.env.GCLOUD_PROJECT ||
      childProc.execSync('gcloud config get-value project 2>/dev/null', {
        encoding: 'utf8',
        timeout: 2500,
      })
    ).trim();
    if (!project || project === '(unset)') return null;
    const token = childProc
      .execSync('gcloud auth print-access-token 2>/dev/null', {
        encoding: 'utf8',
        timeout: 3500,
      })
      .trim();
    if (!token || token.length < 20) return null;
    const location = (process.env.GOOGLE_CLOUD_LOCATION || 'global').trim();
    const cached: CachedVertexToken = {
      token,
      expiresAt: Date.now() + 3 * 60 * 1000,
      project,
      location,
    };
    g.__pcVertexTokenCache = cached;
    return cached;
  } catch {
    return null;
  }
}

/**
 * Returns true if any live Gemini backend is available (BYOK / GEMINI_API_KEY / Cloud Run Metadata ADC / local gcloud).
 */
export function hasLiveGeminiBackend(explicitKey?: string | null): boolean {
  if (typeof window !== 'undefined') {
    return Boolean(explicitKey && explicitKey.trim().length > 0);
  }
  if (getEffectiveGeminiApiKey(explicitKey)) return true;
  if (process.env.K_SERVICE && (process.env.GOOGLE_CLOUD_PROJECT || process.env.GCLOUD_PROJECT)) {
    return true;
  }
  return Boolean(resolveVertexAccessTokenSync());
}

/**
 * Unified Gemini client factory used across ALL server pipelines.
 * Priority: Explicit BYOK -> Server GEMINI_API_KEY -> Cloud Run Metadata Server ADC -> Local gcloud ADC.
 */
export function createGeminiClient(
  explicitKey?: string | null,
  options?: { location?: string }
): GoogleGenAI | null {
  if (typeof window !== 'undefined') {
    const browserKey = explicitKey && explicitKey.trim().length > 0 ? explicitKey.trim() : '';
    return browserKey ? new GoogleGenAI({ apiKey: browserKey }) : null;
  }
  const apiKey = getEffectiveGeminiApiKey(explicitKey);
  if (apiKey) {
    return new GoogleGenAI({ apiKey });
  }
  const envProject = (process.env.GOOGLE_CLOUD_PROJECT || process.env.GCLOUD_PROJECT || '').trim();
  const syncVertex = resolveVertexAccessTokenSync();
  const project = syncVertex?.project || (process.env.K_SERVICE ? envProject : '');
  if (!project) return null;
  const location = options?.location || syncVertex?.location || (process.env.GOOGLE_CLOUD_LOCATION || 'global').trim();

  return new GoogleGenAI({
    vertexai: true,
    project,
    location,
    googleAuthOptions: {
      authClient: {
        getAccessToken: async () => {
          const fresh = (await resolveVertexAccessTokenAsync()) || syncVertex;
          if (!fresh?.token) {
            throw new Error('Unable to acquire Vertex AI access token from Metadata Server or ADC.');
          }
          return { token: fresh.token };
        },
        getRequestHeaders: async () => {
          const fresh = (await resolveVertexAccessTokenAsync()) || syncVertex;
          if (!fresh?.token) {
            throw new Error('Unable to acquire Vertex AI authorization header from Metadata Server or ADC.');
          }
          return new Headers({ Authorization: `Bearer ${fresh.token}` });
        },
      } as any,
    },
  });
}

export type ModelTier =
  | 'latest'
  | 'omni'
  | 'lite'
  | 'medium'
  | 'pro'
  | 'critic'
  | 'cross_family_critic'
  | 'vision'
  | 'chat'
  | 'live'
  | 'image';

/**
 * Live-Verified Frontier Model Routing Engine (Zero Fictional Slugs, Zero Internal Codenames, Zero Inverted Judge Downgrade)
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
  if (tier === 'cross_family_critic') {
    return CROSS_FAMILY_JUDGE_MODEL_ID;
  }
  if (tier === 'latest' || tier === 'omni' || tier === 'pro' || tier === 'critic' || tier === 'vision') {
    return GEMINI_PRO_MODEL_ID;
  }
  return GEMINI_FLASH_MODEL_ID;
}

export function getGeminiFallbackModel(tier: ModelTier = 'pro'): string {
  if (tier === 'live') {
    return GEMINI_SECONDARY_FLASH_MODEL_ID;
  }
  if (tier === 'cross_family_critic') {
    return GEMINI_SECONDARY_PRO_MODEL_ID;
  }
  if (tier === 'latest' || tier === 'omni' || tier === 'pro' || tier === 'critic' || tier === 'vision') {
    return GEMINI_FALLBACK_PRO_MODEL_ID;
  }
  return GEMINI_FALLBACK_FLASH_MODEL_ID;
}

export function getGeminiModelWithFallbacks(tier: ModelTier = 'pro'): string[] {
  if (tier === 'live') {
    return Array.from(
      new Set([GEMINI_FLASH_LIVE_MODEL_ID, GEMINI_SECONDARY_FLASH_MODEL_ID, GEMINI_FLASH_LITE_MODEL_ID])
    );
  }
  if (tier === 'cross_family_critic') {
    return Array.from(
      new Set([CROSS_FAMILY_JUDGE_MODEL_ID, GEMINI_SECONDARY_PRO_MODEL_ID, GEMINI_PRO_MODEL_ID])
    );
  }
  const primary = getGeminiModel(tier);
  const fallback = getGeminiFallbackModel(tier);
  if (tier === 'pro' || tier === 'critic' || tier === 'vision' || tier === 'latest' || tier === 'omni') {
    return Array.from(new Set([primary, fallback, GEMINI_SECONDARY_PRO_MODEL_ID, GEMINI_FLASH_MODEL_ID]));
  }
  return Array.from(new Set([primary, fallback, GEMINI_SECONDARY_FLASH_MODEL_ID, GEMINI_FLASH_LITE_MODEL_ID]));
}

interface DiscoveredFrontierModel {
  id: string;
  major: number;
  minor: number;
  versionScore: number;
  family: 'pro' | 'flash' | 'flash-lite' | 'gemma' | 'live' | 'image';
}

interface DynamicModelCatalogEntry {
  expiresAt: number;
  generalModels: DiscoveredFrontierModel[];
  liveModels: DiscoveredFrontierModel[];
  imageModels: DiscoveredFrontierModel[];
}

const DYNAMIC_CATALOG_TTL_MS = 10 * 60 * 1000;

export function parseFrontierGeminiModel(rawName: string): DiscoveredFrontierModel | null {
  const id = String(rawName || '')
    .trim()
    .replace(/^models\//i, '');
  const lower = id.toLowerCase();
  if (BANNED_MODEL_SUBSTRINGS.some((tok) => lower.includes(tok))) {
    return null;
  }

  // Support Gemma 4 open-weights models as independent cross-family critics
  const gemmaMatch = id.match(/^gemma-(\d+)-(\d+)b(?:-([a-z0-9-]+))?$/i);
  if (gemmaMatch) {
    const gMajor = Number(gemmaMatch[1]);
    const gParamsB = Number(gemmaMatch[2]);
    if (gMajor >= 4 && gParamsB >= 24) {
      return {
        id,
        major: gMajor,
        minor: gParamsB,
        versionScore: 260 + gParamsB,
        family: 'gemma',
      };
    }
    return null;
  }

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
    rest.includes('translate') ||
    rest.includes('omni')
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
    return { id, major, minor, versionScore: versionScore + 25, family: 'pro' };
  }
  if (rest.includes('flash') && rest.includes('lite')) {
    return { id, major, minor, versionScore, family: 'flash-lite' };
  }
  if (rest.includes('flash')) {
    // Only rank standard stable/preview 2.5 & 3.0/3.1 Flash variants ahead of experimental sub-point Flash slugs
    const stabilityPenalty = minor >= 5 ? -18 : 0;
    return { id, major, minor, versionScore: versionScore + stabilityPenalty, family: 'flash' };
  }
  return null;
}

async function discoverLiveFrontierCatalog(ai: GoogleGenAI): Promise<DynamicModelCatalogEntry | null> {
  const g = globalThis as unknown as {
    __promptCanvasDynamicModelCatalog?: DynamicModelCatalogEntry & { schemaRev?: number };
    __promptCanvasDynamicModelInflight?: Promise<DynamicModelCatalogEntry | null>;
  };

  if (
    g.__promptCanvasDynamicModelCatalog &&
    g.__promptCanvasDynamicModelCatalog.schemaRev === 4 &&
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
          if (++scanned > 150) break;
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
        schemaRev: 4,
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
    pro: 4,
    gemma: 3,
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

  const proModels = catalog.generalModels.filter((m) => m.family === 'pro');
  const gemmaModels = catalog.generalModels.filter((m) => m.family === 'gemma');
  const fullFlash = catalog.generalModels.filter((m) => m.family === 'flash');
  const liteOnly = catalog.generalModels.filter((m) => m.family === 'flash-lite');

  let ordered: DiscoveredFrontierModel[];
  if (tier === 'cross_family_critic') {
    ordered = [...sortLatestFirst(gemmaModels), ...sortLatestFirst(proModels)];
  } else if (tier === 'latest' || tier === 'omni' || tier === 'pro' || tier === 'critic' || tier === 'vision') {
    ordered = [...sortLatestFirst(proModels), ...sortLatestFirst(fullFlash), ...sortLatestFirst(liteOnly)];
  } else if (tier === 'lite') {
    ordered = [...sortLatestFirst([...liteOnly, ...fullFlash]), ...sortLatestFirst(proModels)];
  } else if (tier === 'live' && catalog.liveModels.length > 0) {
    ordered = [...sortLatestFirst(catalog.liveModels), ...sortLatestFirst(fullFlash)];
  } else {
    // 'chat' / 'medium': prioritize clean fast Flash (gemini-3-flash-preview, gemini-2.5-flash)
    const preferredFlash = [...fullFlash].sort((a, b) => {
      const aPref = a.id === 'gemini-3-flash-preview' ? 2 : a.id === 'gemini-2.5-flash' ? 1 : 0;
      const bPref = b.id === 'gemini-3-flash-preview' ? 2 : b.id === 'gemini-2.5-flash' ? 1 : 0;
      if (bPref !== aPref) return bPref - aPref;
      return b.versionScore - a.versionScore;
    });
    ordered = [...preferredFlash, ...sortLatestFirst(proModels), ...sortLatestFirst(liteOnly)];
  }

  const ids = Array.from(new Set(ordered.map((m) => m.id)));
  return ids.length > 0 ? ids : getGeminiModelWithFallbacks(tier);
}

/**
 * Resolves an Orthogonal Judge Chain (`judge !== generator`) WITHOUT EVER downgrading
 * a Pro generator to a weaker Flash judge!
 * - Flash generator -> Frontier Pro judges (`gemini-3.1-pro-preview`, `gemini-2.5-pro`, `gemma-4-31b-it`)
 * - `gemini-2.5-pro` generator -> Stronger `gemini-3.1-pro-preview`, then cross-family `gemma-4-31b-it`
 * - `gemini-3.1-pro-preview` generator -> Distinct Pro `gemini-2.5-pro` + cross-family `gemma-4-31b-it`
 */
export async function resolveLatestDistinctJudgeChain(
  ai: GoogleGenAI,
  generatorModelId?: string
): Promise<string[]> {
  const genNorm = String(generatorModelId || '').trim().toLowerCase();
  const proChain = await resolveLatestGeminiModelChain(ai, 'pro');
  const crossFamilyChain = await resolveLatestGeminiModelChain(ai, 'cross_family_critic');

  // Strictly keep only Pro-tier and Cross-Family Gemma-4-31B models at the front of the judge chain (never Flash first!)
  const strongJudges = [
    ...proChain.filter((m) => m.toLowerCase().includes('pro')),
    ...crossFamilyChain.filter((m) => m.toLowerCase().startsWith('gemma-4-')),
    GEMINI_PRO_MODEL_ID,
    GEMINI_SECONDARY_PRO_MODEL_ID,
    CROSS_FAMILY_JUDGE_MODEL_ID,
  ];
  const dedupedDistinct = Array.from(new Set(strongJudges)).filter(
    (m) => m.toLowerCase() !== genNorm
  );
  return dedupedDistinct.length > 0
    ? dedupedDistinct
    : [GEMINI_SECONDARY_PRO_MODEL_ID, CROSS_FAMILY_JUDGE_MODEL_ID];
}

export async function resolveLatestGeminiImageModelChain(ai: GoogleGenAI): Promise<string[]> {
  const catalog = await discoverLiveFrontierCatalog(ai);
  if (catalog && catalog.imageModels.length > 0) {
    const sorted = [...catalog.imageModels].sort((a, b) => b.versionScore - a.versionScore);
    return sorted.map((m) => m.id);
  }
  return Array.from(new Set([DEEPMIND_IMAGEN_MODEL_ID, 'gemini-2.5-flash-image']));
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
 * Gemini multimodal image models (`responseModalities: ['TEXT', 'IMAGE']`).
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

/**
 * Synchronous distinct judge selector: NEVER downgrades a Pro generator to a Flash judge!
 */
export function getDistinctJudgeModel(generatorModelId?: string): string {
  const normalizedGen = (generatorModelId || '').trim().toLowerCase();
  const primaryPro = GEMINI_PRO_MODEL_ID; // 'gemini-3.1-pro-preview'
  const secondaryPro = GEMINI_SECONDARY_PRO_MODEL_ID; // 'gemini-2.5-pro'

  if (!normalizedGen) {
    return primaryPro;
  }
  if (normalizedGen === primaryPro.toLowerCase()) {
    return secondaryPro !== primaryPro ? secondaryPro : CROSS_FAMILY_JUDGE_MODEL_ID;
  }
  return primaryPro;
}

export const LLM_JUDGE_MATRIX = {
  diagramGenerationV2: {
    generator: GEMINI_FLASH_MODEL_ID,
    judge: GEMINI_PRO_MODEL_ID,
    crossFamilyJudge: CROSS_FAMILY_JUDGE_MODEL_ID,
    fallbackJudge: GEMINI_SECONDARY_PRO_MODEL_ID,
  },
  docgenReportSynthesis: {
    generator: GEMINI_SECONDARY_PRO_MODEL_ID,
    judge: GEMINI_PRO_MODEL_ID,
    crossFamilyJudge: CROSS_FAMILY_JUDGE_MODEL_ID,
    fallbackJudge: CROSS_FAMILY_JUDGE_MODEL_ID,
  },
  sixAuditPostureSuite: {
    generator: GEMINI_FLASH_MODEL_ID,
    judge: GEMINI_PRO_MODEL_ID,
    crossFamilyJudge: CROSS_FAMILY_JUDGE_MODEL_ID,
    fallbackJudge: GEMINI_SECONDARY_PRO_MODEL_ID,
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
        temperature: 0.1,
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
        temperature: 0.3,
        maxOutputTokens: 32768,
      };
  }
}

export function getGenConfigForModel(
  kind: GenConfigKind,
  modelId?: string
): {
  temperature: number;
  maxOutputTokens: number;
  thinkingConfig?: { thinkingLevel?: any; thinkingBudget?: number };
} {
  const base = getGenConfig(kind);
  const modelStr = String(modelId || '').toLowerCase();

  // Gemma open-weights models do not accept `thinkingConfig`
  if (modelStr.startsWith('gemma-')) {
    return {
      temperature: base.temperature,
      maxOutputTokens: Math.min(base.maxOutputTokens || 8192, 8192),
    };
  }

  const isGemini25 = /^gemini-2\.5/i.test(modelStr) || (!/^gemini-[345]/i.test(modelStr) && modelStr.length > 0);
  if (isGemini25 && base.thinkingConfig) {
    const level = String((base.thinkingConfig as any).thinkingLevel || 'LOW').toUpperCase();
    const budgetByKind: Record<GenConfigKind, number> = {
      repair: 512,
      edit: 1024,
      narrative: 512,
      generate: 1024,
      audit: 2048,
      vision: 2048,
    };
    const numericBudget =
      budgetByKind[kind] ?? (level === 'HIGH' ? 2048 : level === 'MEDIUM' ? 1024 : 512);
    return {
      ...base,
      thinkingConfig: {
        thinkingBudget: numericBudget,
      },
      maxOutputTokens: Math.min(base.maxOutputTokens || 16384, 32768),
    };
  }
  return {
    ...base,
    maxOutputTokens: Math.min(base.maxOutputTokens || 32768, 32768),
  };
}
