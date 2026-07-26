import { NextResponse } from 'next/server';
import { createUser, createSession } from '@/lib/db';
import { hashPassword, setSessionCookie, SESSION_MAX_AGE_DAYS } from '@/lib/auth';
import { v4 as uuidv4 } from 'uuid';

export async function POST() {
  try {
    const guestEmail = `guest_${uuidv4().slice(0, 8)}@promptcanvas.guest`;
    const { hash, salt } = hashPassword('guest-session-secret');
    const user = await createUser(guestEmail, hash, salt, 'Guest Explorer');

    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * SESSION_MAX_AGE_DAYS);
    const session = await createSession(user.id, expiresAt);
    await setSessionCookie(session.id);

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
