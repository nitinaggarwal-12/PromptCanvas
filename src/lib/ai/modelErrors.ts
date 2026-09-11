/**
 * Upstream model error classification and user-facing message mapping.
 *
 * WHY THIS EXISTS
 * ---------------
 * The @google/genai SDK throws `ApiError` where:
 *   - `err.status`  = numeric HTTP status (e.g. 503)
 *   - `err.message` = JSON.stringify(errorBody), e.g.
 *       {"error":{"code":503,"message":"This model is currently experiencing
 *        high demand...","status":"UNAVAILABLE"}}
 *
 * Passing `err.message` straight to the client leaks that raw JSON blob into
 * the UI. It also loses the distinction between "retry in a moment" and
 * "your request is invalid", which the user needs in order to act.
 */

/** Statuses worth retrying: transient capacity/availability, not client error. */
const RETRYABLE_HTTP = new Set([408, 409, 425, 429, 500, 502, 503, 504]);

/** Transient network-layer failures that surface as plain Errors. */
const TRANSIENT_MESSAGE_PATTERNS = [
  'fetch failed',
  'ECONNRESET',
  'ETIMEDOUT',
  'EAI_AGAIN',
  'ENOTFOUND',
  'socket hang up',
  'network error',
  'terminated',
];

export interface UpstreamErrorInfo {
  /** HTTP status if determinable, else 0. */
  httpStatus: number;
  /** Canonical upstream status string, e.g. 'UNAVAILABLE', 'RESOURCE_EXHAUSTED'. */
  upstreamStatus: string;
  /** Human message extracted from the upstream payload, if any. */
  upstreamMessage: string;
  /** Whether retrying the identical request could plausibly succeed. */
  isRetryable: boolean;
  /** Specifically rate limiting / quota exhaustion (needs longer backoff). */
  isRateLimit: boolean;
  /** Model capacity overload (503 UNAVAILABLE). */
  isOverloaded: boolean;
}

/**
 * Extracts structured information from an unknown thrown value.
 * Never throws — always returns a usable object.
 */
export function parseUpstreamError(err: any): UpstreamErrorInfo {
  const rawMessage: string = typeof err?.message === 'string' ? err.message : String(err ?? '');

  // 1) Preferred: the SDK's numeric status.
  let httpStatus = Number(err?.status ?? err?.statusCode ?? err?.code ?? 0);
  if (!Number.isFinite(httpStatus)) httpStatus = 0;

  let upstreamStatus = '';
  let upstreamMessage = '';

  // 2) The SDK stringifies the error body into `message`. Recover it.
  //    This also covers cases where a wrapper dropped `err.status`.
  const jsonStart = rawMessage.indexOf('{');
  if (jsonStart !== -1) {
    try {
      const parsed = JSON.parse(rawMessage.slice(jsonStart));
      const body = parsed?.error ?? parsed;
      if (body) {
        const code = Number(body.code);
        if (!httpStatus && Number.isFinite(code)) httpStatus = code;
        if (typeof body.status === 'string') upstreamStatus = body.status;
        if (typeof body.message === 'string') upstreamMessage = body.message;
      }
    } catch {
      // Not JSON — fall through to heuristics.
    }
  }

  // 3) Last-resort heuristics for non-JSON transports.
  if (!httpStatus) {
    const m = /\b(429|500|502|503|504)\b/.exec(rawMessage);
    if (m) httpStatus = Number(m[1]);
  }

  const upper = `${upstreamStatus} ${rawMessage}`.toUpperCase();
  const isRateLimit =
    httpStatus === 429 ||
    upper.includes('RESOURCE_EXHAUSTED') ||
    upper.includes('QUOTA');
  const isOverloaded =
    httpStatus === 503 ||
    upper.includes('UNAVAILABLE') ||
    upper.includes('OVERLOADED') ||
    upper.includes('HIGH DEMAND');

  const isTransientNetwork = TRANSIENT_MESSAGE_PATTERNS.some((p) =>
    rawMessage.toLowerCase().includes(p.toLowerCase())
  );

  const isRetryable =
    RETRYABLE_HTTP.has(httpStatus) || isRateLimit || isOverloaded || isTransientNetwork;

  return {
    httpStatus: httpStatus || 0,
    upstreamStatus,
    upstreamMessage,
    isRetryable,
    isRateLimit,
    isOverloaded,
  };
}

/**
 * Converts an upstream failure into a message safe and useful to show a user.
 * Never returns a raw JSON blob.
 *
 * @param label Short description of the operation, e.g. "Architecture synthesis".
 */
export function toUserFacingMessage(err: any, label = 'The request'): string {
  const info = parseUpstreamError(err);

  if (info.isOverloaded) {
    return `${label} could not complete because the architecture model is temporarily overloaded (HTTP 503). This is a capacity spike on the model provider's side, not a problem with your prompt. Your canvas was not changed — please retry in a few seconds.`;
  }

  if (info.isRateLimit) {
    return `${label} was rate limited (HTTP 429). The API quota for this key is momentarily exhausted. Your canvas was not changed — please wait a moment and retry.`;
  }

  if (info.httpStatus === 401 || info.httpStatus === 403) {
    return `${label} was rejected by the model provider (HTTP ${info.httpStatus}). Check that GEMINI_API_KEY is set and authorised for the requested model.`;
  }

  if (info.httpStatus === 400) {
    return `${label} was rejected as invalid (HTTP 400)${info.upstreamMessage ? `: ${info.upstreamMessage}` : '.'}`;
  }

  if (info.httpStatus >= 500) {
    return `${label} failed because the model provider returned a server error (HTTP ${info.httpStatus}). Your canvas was not changed — please retry shortly.`;
  }

  // Prefer the upstream human message over the raw JSON envelope.
  if (info.upstreamMessage) return `${label} failed: ${info.upstreamMessage}`;

  const fallback = typeof err?.message === 'string' ? err.message : '';
  // Guard: never surface a JSON envelope to the UI.
  if (fallback.trim().startsWith('{')) {
    return `${label} failed due to an unexpected model provider error. Your canvas was not changed — please retry.`;
  }
  return fallback ? `${label} failed: ${fallback}` : `${label} failed unexpectedly.`;
}

/**
 * Maps an upstream failure to the HTTP status this API should return.
 * Preserves 503/429 so clients can distinguish "retry" from "fix your input".
 */
export function toResponseStatus(err: any): number {
  const info = parseUpstreamError(err);
  if (info.isOverloaded) return 503;
  if (info.isRateLimit) return 429;
  if (info.httpStatus === 400 || info.httpStatus === 401 || info.httpStatus === 403) {
    return info.httpStatus;
  }
  return 502; // upstream dependency failed
}
