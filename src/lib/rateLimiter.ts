// In-memory sliding-window rate limiter for sensitive authentication endpoints (signin, signup, magic-link)

interface RateLimitRecord {
  attempts: number[];
}

const rateLimitStore = new Map<string, RateLimitRecord>();

export interface RateLimitResult {
  allowed: boolean;
  remainingAttempts: number;
  retryAfterSec: number;
}

/**
 * Check and record an attempt under a given key.
 * @param key Identifier (e.g. `ip_${clientIp}` or `email_${userEmail}`)
 * @param maxAttempts Maximum allowed attempts within window (e.g. 5)
 * @param windowMs Time window in milliseconds (default 15 minutes)
 */
export function checkRateLimit(key: string, maxAttempts: number = 5, windowMs: number = 15 * 60 * 1000): RateLimitResult {
  const now = Date.now();
  let record = rateLimitStore.get(key);
  if (!record) {
    record = { attempts: [] };
    rateLimitStore.set(key, record);
  }

  // Filter out attempts older than window
  record.attempts = record.attempts.filter((ts) => now - ts < windowMs);

  if (record.attempts.length >= maxAttempts) {
    const oldest = record.attempts[0];
    const retryAfterSec = Math.ceil((oldest + windowMs - now) / 1000);
    return {
      allowed: false,
      remainingAttempts: 0,
      retryAfterSec: Math.max(1, retryAfterSec),
    };
  }

  record.attempts.push(now);
  return {
    allowed: true,
    remainingAttempts: maxAttempts - record.attempts.length,
    retryAfterSec: 0,
  };
}

/**
 * Reset rate limiting record upon successful authentication.
 */
export function resetRateLimit(key: string): void {
  rateLimitStore.delete(key);
}
