import { GoogleGenAI } from '@google/genai';

/**
 * Executes a Gemini generateContent call with exponential backoff and jitter for transient errors (429, 503, connection reset).
 */
export async function generateContentWithRetry(
  ai: GoogleGenAI,
  params: any,
  maxRetries = 3
): Promise<any> {
  let lastError: any = null;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await ai.models.generateContent(params);
      return response;
    } catch (err: any) {
      lastError = err;
      const status = err?.status || err?.statusCode || (err?.message?.includes('429') ? 429 : 0);
      const isRateLimit = status === 429 || err?.message?.includes('RESOURCE_EXHAUSTED') || err?.message?.includes('quota');
      const isTransient = isRateLimit || status >= 500 || err?.message?.includes('fetch failed') || err?.message?.includes('ECONNRESET');

      if (attempt < maxRetries && isTransient) {
        const baseDelay = isRateLimit ? 2000 : 800;
        const delayMs = baseDelay * Math.pow(2, attempt - 1) + Math.random() * 400;
        console.warn(`[Gemini Retry Helper] Attempt ${attempt} encountered transient error (${err.message}). Retrying in ${Math.round(delayMs)}ms...`);
        await new Promise(resolve => setTimeout(resolve, delayMs));
      } else {
        break;
      }
    }
  }
  throw lastError;
}
