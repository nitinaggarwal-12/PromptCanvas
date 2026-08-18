// Server-side concurrency lock to enforce a single Gemini API call per user/session at a time.
// Prevents API quota exhaustion, rate limit issues, and overlapping state mutations while isolating multi-tenant sessions.

const activeGeminiRequests = new Map<string, number>();
const LOCK_TIMEOUT_MS = 120 * 1000; // 120 seconds auto-expiry safeguard (matches 20-60s Gemini call durations)

/**
 * Derive a unique lock key per authenticated user, session cookie, or client IP.
 */
export function deriveLockKey(userId?: string | null, clientIp?: string | null, sessionId?: string | null): string {
  if (userId) return `user_${userId}`;
  if (sessionId) return `session_${sessionId}`;
  if (clientIp && clientIp !== '127.0.0.1' && clientIp !== '::1') return `ip_${clientIp}`;
  return 'anonymous_default';
}

/**
 * Attempt to acquire the Gemini API execution lock for a given user or session key.
 * @returns true if lock was acquired, false if a request is currently in progress.
 */
export function acquireGeminiLock(key: string): boolean {
  if (!key) key = 'anonymous_default';
  const now = Date.now();
  const existing = activeGeminiRequests.get(key);
  
  if (existing && (now - existing) < LOCK_TIMEOUT_MS) {
    return false; // Lock is actively held
  }
  
  activeGeminiRequests.set(key, now);
  return true;
}

/**
 * Release the Gemini API execution lock for a given user or session key.
 */
export function releaseGeminiLock(key: string): void {
  if (!key) key = 'anonymous_default';
  activeGeminiRequests.delete(key);
}

/**
 * Check if the lock is currently held without acquiring it.
 */
export function isGeminiLocked(key: string): boolean {
  if (!key) key = 'anonymous_default';
  const now = Date.now();
  const existing = activeGeminiRequests.get(key);
  return !!existing && (now - existing) < LOCK_TIMEOUT_MS;
}

