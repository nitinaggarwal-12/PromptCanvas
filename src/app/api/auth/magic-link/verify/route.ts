import { NextResponse } from 'next/server';
import { 
  verifyMagicLinkToken, 
  getUserByEmail, 
  createUser, 
  createSession, 
  ensureUserPersonalWorkspace, 
  logUserEvent 
} from '@/lib/db';
import { setSessionCookie, SESSION_MAX_AGE_DAYS } from '@/lib/auth';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.redirect(new URL('/?error=Missing+token', request.url));
  }

  try {
    const email = await verifyMagicLinkToken(token);
    let user = await getUserByEmail(email);

    if (!user) {
      // Create new user with default Author role
      const rootEmail = process.env.ROOT_USER_EMAIL;
      const isSuper = !!(rootEmail && email.toLowerCase() === rootEmail.trim().toLowerCase());
      
      user = await createUser(email, 'MAGIC_LINK_HASH', 'MAGIC_LINK_SALT', email.split('@')[0]);
      if (isSuper) {
        // Upgrade super admin flag
        const { updateUserGlobalRole } = await import('@/lib/db');
        await updateUserGlobalRole(user.id, 'Super-Admin');
      }
    }

    // Auto-create Personal Workspace for user
    await ensureUserPersonalWorkspace(user.id, user.email);

    // Issue Session Token Cookie
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + SESSION_MAX_AGE_DAYS);
    const session = await createSession(user.id, expiresAt);
    await setSessionCookie(session.id);

    await logUserEvent(user.id, 'MAGIC_LINK_LOGIN', null, 'Passwordless Session Verified');

    return NextResponse.redirect(new URL('/dashboard', request.url));
  } catch (error: unknown) {
    console.error('Magic link verification error:', error);
    const msg = error instanceof Error ? error.message : 'Invalid link';
    return NextResponse.redirect(new URL(`/?error=${encodeURIComponent(msg)}`, request.url));
  }
}
