import { randomBytes, scryptSync, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';
import { getSession, User } from './db';

export const SESSION_COOKIE_NAME = 'promptcanvas_session';
export const SESSION_MAX_AGE_DAYS = 30;

/**
 * Hash a plain text password using Node.js native crypto scrypt with a random salt.
 */
export function hashPassword(password: string): { hash: string; salt: string } {
  const salt = randomBytes(16).toString('hex');
  const hashBuffer = scryptSync(password, salt, 64);
  return {
    hash: hashBuffer.toString('hex'),
    salt,
  };
}

/**
 * Verify a plain text password against a stored hash and salt using timing-safe comparison.
 */
export function verifyPassword(password: string, hash: string, salt: string): boolean {
  try {
    const hashBuffer = Buffer.from(hash, 'hex');
    const inputHashBuffer = scryptSync(password, salt, 64);
    return timingSafeEqual(hashBuffer, inputHashBuffer);
  } catch {
    return false;
  }
}

/**
 * Helper to get the currently authenticated user from Next.js request cookies.
 */
export async function getAuthenticatedUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (!sessionId) return null;

    const session = await getSession(sessionId);
    if (!session || !session.user) return null;

    return session.user;
  } catch {
    return null;
  }
}

/**
 * Helper to set session cookie on Next.js Response / cookieStore.
 */
export async function setSessionCookie(sessionId: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * SESSION_MAX_AGE_DAYS, // 30 days
  });
}

/**
 * Helper to clear session cookie.
 */
export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
}
