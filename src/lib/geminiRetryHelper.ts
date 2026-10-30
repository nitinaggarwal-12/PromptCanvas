import { GoogleGenAI } from '@google/genai';
import { parseUpstreamError } from './ai/modelErrors';
import { resolveLatestGeminiModelChain } from './geminiConfig';

interface GeminiRetryOptions {
  /** Total attempts, including the first. */
  maxRetries?: number;
  /** Ceiling for a single attempt. Prevents one slow call eating the budget. */
  perAttemptTimeoutMs?: number;
  /**
   * Ceiling for ALL attempts combined. A retry is skipped when there is not
   * enough budget left to plausibly finish, so callers keep a predictable
   * worst-case latency.
   */
  totalBudgetMs?: number;
  /** Short operation name used in logs. */
  label?: string;
}

const DEFAULTS: Required<Omit<GeminiRetryOptions, 'label'>> = {
  maxRetries: 3,
  perAttemptTimeoutMs: 45_000,
  totalBudgetMs: 90_000,
};

/** Rejects if `operation` outlives `ms`. The underlying call is abandoned, not cancelled. */
function withTimeout<T>(operation: Promise<T>, ms: number, label: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error(`${label} exceeded its ${Math.round(ms / 1000)}s per-attempt budget.`)),
      ms
    );
    operation.then(
      (value) => { clearTimeout(timer); resolve(value); },
      (error) => { clearTimeout(timer); reject(error); }
    );
  });
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function normalizeThinkingConfigForFrontierModel(modelId: string, config: any): any {
  if (!config) return config;
  const modelStr = String(modelId || '').toLowerCase();
  if (/^gemini-[345]/i.test(modelStr) && config.thinkingConfig) {
    return {
      ...config,
      maxOutputTokens: Math.min(config.maxOutputTokens || 32768, 32768),
      thinkingConfig: {
        thinkingLevel:
          config.thinkingConfig.thinkingLevel &&
          config.thinkingConfig.thinkingLevel !== 'MINIMAL'
            ? config.thinkingConfig.thinkingLevel
            : typeof config.thinkingConfig.thinkingBudget === 'number' &&
                config.thinkingConfig.thinkingBudget >= 500
              ? 'HIGH'
              : typeof config.thinkingConfig.thinkingBudget === 'number' &&
                  config.thinkingConfig.thinkingBudget <= 100
                ? 'LOW'
                : 'MEDIUM',
      },
    };
  }
  return config;
}

/**
 * Executes a Gemini `generateContent` call with exponential backoff + jitter.
 *
 * Retries transient upstream failures — notably HTTP 503 UNAVAILABLE ("model is
 * currently experiencing high demand"), 429 rate limits, 5xx, and network
 * resets. Client errors (400/401/403) are surfaced immediately, since retrying
 * them only wastes the user's time.
 *
 * Backwards compatible: `generateContentWithRetry(ai, params, 3)` still works.
 */
export async function generateContentWithRetry(
  ai: GoogleGenAI,
  params: any,
  options: number | GeminiRetryOptions = {}
): Promise<any> {
  const opts: GeminiRetryOptions =
    typeof options === 'number' ? { maxRetries: options } : options;

  const maxRetries = opts.maxRetries ?? DEFAULTS.maxRetries;
  const perAttemptTimeoutMs = opts.perAttemptTimeoutMs ?? DEFAULTS.perAttemptTimeoutMs;
  const totalBudgetMs = opts.totalBudgetMs ?? DEFAULTS.totalBudgetMs;
  const label = opts.label ?? 'Gemini generateContent';

  const startedAt = Date.now();
  let lastError: any = null;

  // Law 16 / Rule 55 Guard: Gemini 3+ frontier models use discrete `thinkingLevel` (`LOW` | `MEDIUM` | `HIGH`)
  // and `maxOutputTokens <= 32768`, rejecting numeric `thinkingBudget` and `MINIMAL` with HTTP 400.
  let activeParams = params?.config
    ? {
        ...params,
        config: normalizeThinkingConfigForFrontierModel(String(params?.model || ''), params.config),
      }
    : params;

  let strippedUnsupportedThinking = false;
  let resolvedLiveFallbackModels: string[] | null = null;
  let liveFallbackIdx = 0;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const elapsed = Date.now() - startedAt;
    const remaining = totalBudgetMs - elapsed;
    if (remaining <= 0) break;

    try {
      const response = await withTimeout(
        ai.models.generateContent(activeParams),
        Math.min(perAttemptTimeoutMs, remaining),
        label
      );
      if (response && typeof response === 'object' && activeParams?.model) {
        try {
          (response as any).__resolvedModelId = String(activeParams.model);
        } catch {
          // Ignore frozen response objects
        }
      }
      return response;
    } catch (err: any) {
      lastError = err;
      const errMsg = String(err?.message || '');

      // If a newly released model rejects thinkingConfig with HTTP 400, strip thinkingConfig and retry immediately on the same latest model.
      if (
        !strippedUnsupportedThinking &&
        activeParams?.config?.thinkingConfig &&
        /thinking.?level|thinking.?config|thinking is not supported/i.test(errMsg)
      ) {
        strippedUnsupportedThinking = true;
        const { thinkingConfig: _removed, ...restConfig } = activeParams.config;
        activeParams = { ...activeParams, config: restConfig };
        attempt--;
        continue;
      }

      const info = parseUpstreamError(err);

      // If a caller supplied an unpublished/renamed model alias (HTTP 404 / NOT_FOUND) and live model discovery is available,
      // automatically switch to the highest-ranked live Gemini frontier model in the matching tier without burning a backoff sleep.
      if (
        (info.httpStatus === 404 || info.upstreamStatus === 'NOT_FOUND') &&
        typeof (ai as any)?.models?.list === 'function'
      ) {
        if (!resolvedLiveFallbackModels) {
          const currentNorm = String(activeParams?.model || '').toLowerCase();
          const preferredTier = currentNorm.includes('flash')
            ? 'chat'
            : currentNorm.includes('pro')
              ? 'pro'
              : 'latest';
          const chain = await resolveLatestGeminiModelChain(ai, preferredTier);
          resolvedLiveFallbackModels = chain.filter((m) => m.toLowerCase() !== currentNorm);
        }
        if (resolvedLiveFallbackModels && liveFallbackIdx < resolvedLiveFallbackModels.length) {
          const nextLiveModel = resolvedLiveFallbackModels[liveFallbackIdx++];
          activeParams = {
            ...activeParams,
            model: nextLiveModel,
            ...(activeParams?.config
              ? { config: normalizeThinkingConfigForFrontierModel(nextLiveModel, activeParams.config) }
              : {}),
          };
          strippedUnsupportedThinking = false;
          attempt--;
          continue;
        }
      }

      // A per-attempt timeout is itself worth one more try if budget allows.
      const isAttemptTimeout = typeof err?.message === 'string'
        && err.message.includes('per-attempt budget');
      const retryable = info.isRetryable || isAttemptTimeout;

      if (attempt >= maxRetries || !retryable) break;

      // Rate limits need materially longer cool-off than capacity blips.
      const baseDelay = info.isRateLimit ? 2000 : 800;
      const delayMs = baseDelay * Math.pow(2, attempt - 1) + Math.random() * 400;

      // Don't sleep past the budget only to immediately give up.
      if (Date.now() - startedAt + delayMs >= totalBudgetMs) break;

      console.warn(
        `[Gemini Retry] ${label} attempt ${attempt}/${maxRetries} failed ` +
        `(HTTP ${info.httpStatus || '?'} ${info.upstreamStatus || 'unknown'}). ` +
        `Retrying in ${Math.round(delayMs)}ms...`
      );
      await sleep(delayMs);
    }
  }

  throw lastError;
}
