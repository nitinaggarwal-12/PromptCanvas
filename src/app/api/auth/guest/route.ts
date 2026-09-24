import { NextResponse } from 'next/server';
import { createUser, createSession, logUserEvent, checkIpEventRateLimit } from '@/lib/db';
import { hashPassword, setSessionCookie, SESSION_MAX_AGE_DAYS } from '@/lib/auth';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  try {
    const rawIp = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '';
    const ipAddress = rawIp.split(',')[0]?.trim() || '127.0.0.1';

    // Rate limit guest session creation per IP (max 10 guest sessions per hour)
    const rateCheck = await checkIpEventRateLimit(ipAddress, 'GUEST_SESSION_STARTED', 10, 60);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: 'Guest session rate limit reached for this network. Please sign in with a registered account.' },
        { status: 429 }
      );
    }

    const guestEmail = `guest_${uuidv4().slice(0, 8)}@promptcanvas.guest`;
    const { hash, salt } = hashPassword('guest-session-secret');
    const user = await createUser(guestEmail, hash, salt, 'Guest Explorer');

    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * SESSION_MAX_AGE_DAYS);
    const session = await createSession(user.id, expiresAt);
    await setSessionCookie(session.id);

    await logUserEvent(user.id, 'GUEST_SESSION_STARTED', ipAddress, 'Guest Explorer Session');

    return NextResponse.json({
      success: true,
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        global_role: 'Author',
        is_guest: true,
      }
    });
  } catch (error: unknown) {
    console.error('Guest auth error:', error);
    const msg = error instanceof Error ? error.message : 'Failed to initialize guest session';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
