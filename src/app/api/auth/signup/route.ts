import { NextResponse } from 'next/server';
import { createUser, getUserByEmail, createSession, logUserEvent, migrateGuestContent, checkIpEventRateLimit, recordChangelogEntry } from '@/lib/db';
import { hashPassword, setSessionCookie, SESSION_MAX_AGE_DAYS, getAuthenticatedUser } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const rawIp = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '';
    const ipAddress = rawIp.split(',')[0]?.trim() || '127.0.0.1';
    const userAgent = request.headers.get('user-agent');

    // Rate limit signup per IP (max 5 signups per 15 minutes)
    const rateCheck = await checkIpEventRateLimit(ipAddress, 'SIGNUP', 5, 15);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: 'Too many account creation attempts from this network. Please wait 15 minutes and try again.' },
        { status: 429 }
      );
    }

    const oldUser = await getAuthenticatedUser();
    const body = await request.json();
    const { email, password, name } = body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }

    if (!password || typeof password !== 'string' || password.length < 10) {
      return NextResponse.json({ error: 'Password must be at least 10 characters long.' }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const rootEmail = process.env.ROOT_USER_EMAIL?.trim().toLowerCase();

    // Prevent unverified takeover of ROOT_USER_EMAIL or email enumeration (B1 & D6)
    const existingUser = await getUserByEmail(normalizedEmail);
    if (existingUser || (rootEmail && normalizedEmail === rootEmail)) {
      return NextResponse.json(
        {
          success: true,
          requiresVerification: true,
          message: 'Check your email or use magic-link verification to continue signing in to this account.',
        },
        { status: 200 }
      );
    }

    const { hash, salt } = hashPassword(password);
    const newUser = await createUser(normalizedEmail, hash, salt, name || null);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + SESSION_MAX_AGE_DAYS);
    const session = await createSession(newUser.id, expiresAt);

    await setSessionCookie(session.id);

    if (oldUser && oldUser.email.endsWith('@promptcanvas.guest')) {
      await migrateGuestContent(oldUser.id, newUser.id);
    }

    await logUserEvent(newUser.id, 'SIGNUP', ipAddress, userAgent);
    await recordChangelogEntry({
      event_category: 'USER_ADDED',
      actor_id: newUser.id,
      actor_name: newUser.name || normalizedEmail.split('@')[0],
      actor_email: newUser.email,
      actor_role: 'Author',
      entity_type: 'User',
      entity_id: newUser.id,
      entity_name: `${newUser.name || 'New User'} (${newUser.email})`,
      field_changed: 'user_created',
      old_value: 'None',
      new_value: 'Author',
      summary: `New user ${newUser.name || newUser.email} registered via UI and synced to Google Sheet [Users!A:F].`,
      source: 'UI',
      sheet_row_ref: 'Users!A:F',
    });

    return NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        created_at: newUser.created_at,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'Failed to create user account.' }, { status: 500 });
  }
}
