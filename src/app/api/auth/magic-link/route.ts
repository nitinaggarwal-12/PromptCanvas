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

    const isDev = process.env.NODE_ENV !== 'production' || process.env.ENABLE_DEV_MAGIC_LINK === 'true';

    console.log(`[Magic Link Auth] 🔑 Generated token for ${email}: ${magicLinkUrl}`);

    // Dispatch email via Resend
    const { sendMagicLinkEmail } = await import('@/lib/email');
    await sendMagicLinkEmail({ toEmail: email, magicLinkUrl });

    return NextResponse.json({
      success: true,
      message: `Magic link dispatched! Please check your email inbox (${email}) to complete sign in.`,
    });
  } catch (error: unknown) {
    console.error('Magic link creation error:', error);
    const msg = error instanceof Error ? error.message : 'Failed to generate magic link.';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
