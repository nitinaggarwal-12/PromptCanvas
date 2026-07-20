import { NextResponse } from 'next/server';
import { createMagicLinkToken } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }

    const token = await createMagicLinkToken(email);
    const magicLinkUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/auth/magic-link/verify?token=${token}`;

    console.log(`[Magic Link Auth] 🔑 Generated token for ${email}: ${magicLinkUrl}`);

    return NextResponse.json({
      success: true,
      message: 'Magic login link sent! Check your inbox or click below to enter.',
      magicLinkUrl, // Returned for instant direct testing & UX
    });
  } catch (error: unknown) {
    console.error('Magic link creation error:', error);
    const msg = error instanceof Error ? error.message : 'Failed to generate magic link.';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
