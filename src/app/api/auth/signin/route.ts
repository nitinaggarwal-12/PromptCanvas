import { NextResponse } from 'next/server';
import { getUserByEmail, createSession, updateUserLastLogin, logUserEvent, migrateGuestContent } from '@/lib/db';
import { verifyPassword, setSessionCookie, SESSION_MAX_AGE_DAYS, getAuthenticatedUser } from '@/lib/auth';
import { checkRateLimit, resetRateLimit } from '@/lib/rateLimiter';

export async function POST(request: Request) {
  try {
    const rawIp = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '';
    const ipAddress = rawIp.split(',')[0]?.trim() || '127.0.0.1';

    const oldUser = await getAuthenticatedUser();
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }

    // Rate Limit: Max 10 attempts per 15 minutes per IP/email
    const rateCheck = checkRateLimit(`signin_${ipAddress}_${email.toLowerCase()}`, 10, 15 * 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: `Too many failed sign-in attempts. Please try again in ${rateCheck.retryAfterSec} seconds.` },
        { status: 429, headers: { 'Retry-After': String(rateCheck.retryAfterSec) } }
      );
    }

    const user = await getUserByEmail(email);
    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
    }

    const isValid = verifyPassword(password, user.password_hash, user.salt);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
    }

    // Reset rate limit on successful authentication
    resetRateLimit(`signin_${ipAddress}_${email.toLowerCase()}`);

    await updateUserLastLogin(user.id);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + SESSION_MAX_AGE_DAYS);
    const session = await createSession(user.id, expiresAt);

    await setSessionCookie(session.id);

    if (oldUser && oldUser.email.endsWith('@promptcanvas.guest')) {
      await migrateGuestContent(oldUser.id, user.id);
    }

    const userAgent = request.headers.get('user-agent');
    await logUserEvent(user.id, 'LOGIN', ipAddress, userAgent);

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        created_at: user.created_at,
      },
    });
  } catch (error) {
    console.error('Signin error:', error);
    return NextResponse.json({ error: 'Failed to sign in.' }, { status: 500 });
  }
}
