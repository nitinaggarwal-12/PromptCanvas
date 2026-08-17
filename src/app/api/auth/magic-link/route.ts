import { NextResponse } from 'next/server';
import { createMagicLinkToken } from '@/lib/db';
import { checkRateLimit } from '@/lib/rateLimiter';

export async function POST(request: Request) {
  try {
    const rawIp = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '';
    const ipAddress = rawIp.split(',')[0]?.trim() || '127.0.0.1';

    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }

    // Rate Limit: Max 5 magic link requests per 15 minutes per IP/email
    const rateCheck = checkRateLimit(`magic_${ipAddress}_${email.toLowerCase()}`, 5, 15 * 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: `Too many magic link requests. Please try again in ${rateCheck.retryAfterSec} seconds.` },
        { status: 429, headers: { 'Retry-After': String(rateCheck.retryAfterSec) } }
      );
    }

    const token = await createMagicLinkToken(email);
    const reqOrigin = request.headers.get('origin') || (request.headers.get('host') ? `https://${request.headers.get('host')}` : null) || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const magicLinkUrl = `${reqOrigin}/api/auth/magic-link/verify?token=${token}`;

    const isDev = process.env.NODE_ENV !== 'production' || process.env.ENABLE_DEV_MAGIC_LINK === 'true';

    console.log(`[Magic Link Auth] 🔑 Generated token for ${email}: ${magicLinkUrl}`);

    // Dispatch email via Resend
    const { sendMagicLinkEmail } = await import('@/lib/email');
    await sendMagicLinkEmail({ toEmail: email, magicLinkUrl });

    return NextResponse.json({
      success: true,
      message: 'Magic link dispatched! Please check your inbox to complete sign in.',
    });
  } catch (error: unknown) {
    console.error('Magic link creation error:', error);
    const msg = error instanceof Error ? error.message : 'Failed to generate magic link.';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
