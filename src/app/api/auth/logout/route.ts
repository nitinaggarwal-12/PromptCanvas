import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { deleteSession, logUserEvent } from '@/lib/db';
import { clearSessionCookie, getAuthenticatedUser, SESSION_COOKIE_NAME } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const user = await getAuthenticatedUser();
    const cookieStore = await cookies();
    const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    if (sessionId) {
      await deleteSession(sessionId);
    }

    if (user) {
      const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip');
      const userAgent = request.headers.get('user-agent');
      await logUserEvent(user.id, 'LOGOUT', ipAddress, userAgent);
    }

    await clearSessionCookie();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ error: 'Failed to logout.' }, { status: 500 });
  }
}
