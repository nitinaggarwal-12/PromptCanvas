import { NextResponse } from 'next/server';
import { getAuthenticatedUser, hashPassword } from '@/lib/auth';
import { updateUserPassword, logUserEvent } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized. Active session required.' }, { status: 401 });
    }

    const { password, confirmPassword } = await request.json();

    if (!password || typeof password !== 'string' || password.trim().length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters long.' }, { status: 400 });
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ error: 'Passwords do not match.' }, { status: 400 });
    }

    const { hash, salt } = hashPassword(password);
    await updateUserPassword(user.id, hash, salt);

    await logUserEvent(user.id, 'PASSWORD_SETUP_COMPLETED', null, 'User configured password after magic link authentication.');

    return NextResponse.json({
      success: true,
      message: 'Password set successfully! Next time you can sign in directly using email & password.',
      email: user.email,
    });
  } catch (error: unknown) {
    console.error('Password setup failed:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: 'Failed to update password', details: errorMessage },
      { status: 500 }
    );
  }
}
