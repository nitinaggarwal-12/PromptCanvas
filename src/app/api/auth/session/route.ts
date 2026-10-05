import { NextResponse } from 'next/server';
import {
  getUserByEmail,
  createUser,
  createSession,
  updateUserLastLogin,
  logUserEvent,
  migrateGuestContent,
} from '@/lib/db';
import {
  hashPassword,
  setSessionCookie,
  SESSION_MAX_AGE_DAYS,
  getAuthenticatedUser,
} from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const rawIp =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      '';
    const ipAddress = rawIp.split(',')[0]?.trim() || '127.0.0.1';

    const oldUser = await getAuthenticatedUser();
    const body = await request.json().catch(() => ({}));
    const rawEmail = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';

    if (
      !rawEmail ||
      !rawEmail.includes('@') ||
      rawEmail.endsWith('@promptcanvas.guest') ||
      rawEmail.endsWith('@guest.promptcanvas.local')
    ) {
      return NextResponse.json(
        { error: 'Please enter a valid work or personal email address.' },
        { status: 400 }
      );
    }

    let user = await getUserByEmail(rawEmail);
    if (!user) {
      const displayName = rawEmail
        .split('@')[0]
        .replace(/[._-]+/g, ' ')
        .replace(/\b\w/g, (c: string) => c.toUpperCase());
      const { hash, salt } = hashPassword(`byok-session-${rawEmail}`);
      user = await createUser(rawEmail, hash, salt, displayName || 'Enterprise Architect');
    } else {
      await updateUserLastLogin(user.id);
    }

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + SESSION_MAX_AGE_DAYS);
    const session = await createSession(user.id, expiresAt);
    await setSessionCookie(session.id);

    if (
      oldUser &&
      oldUser.id !== user.id &&
      (oldUser.email.endsWith('@promptcanvas.guest') ||
        oldUser.email.endsWith('@guest.promptcanvas.local'))
    ) {
      await migrateGuestContent(oldUser.id, user.id);
    }

    const userAgent = request.headers.get('user-agent');
    await logUserEvent(user.id, 'LOGIN', ipAddress, userAgent);

    return NextResponse.json({
      success: true,
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        created_at: user.created_at,
      },
    });
  } catch (error: unknown) {
    console.error('Quick session auth error:', error);
    const msg = error instanceof Error ? error.message : 'Failed to establish session.';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
