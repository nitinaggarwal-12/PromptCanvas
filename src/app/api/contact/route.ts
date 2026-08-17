import { NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/auth';
import { submitContactForm } from '@/lib/db';
import { checkRateLimit } from '@/lib/rateLimiter';

export async function POST(request: Request) {
  try {
    const rawIp = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '';
    const ipAddress = rawIp.split(',')[0]?.trim() || '127.0.0.1';

    const user = await getAuthenticatedUser();
    const body = await request.json();
    const { name, email, reason, message } = body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'Name is a required field.' }, { status: 400 });
    }
    if (name.trim().length > 120) {
      return NextResponse.json({ error: 'Name must not exceed 120 characters.' }, { status: 400 });
    }

    if (!email || typeof email !== 'string' || !email.trim() || !email.includes('@')) {
      return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 });
    }
    if (email.trim().length > 150) {
      return NextResponse.json({ error: 'Email must not exceed 150 characters.' }, { status: 400 });
    }

    if (!reason || typeof reason !== 'string' || !reason.trim()) {
      return NextResponse.json({ error: 'Please select a reason for contacting the creator.' }, { status: 400 });
    }
    if (reason.trim().length > 120) {
      return NextResponse.json({ error: 'Reason must not exceed 120 characters.' }, { status: 400 });
    }

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ error: 'Please enter your message.' }, { status: 400 });
    }
    if (message.trim().length > 4000) {
      return NextResponse.json({ error: 'Message must not exceed 4,000 characters.' }, { status: 400 });
    }

    // Rate Limit: Max 5 submissions per 10 minutes per IP/email
    const rateCheck = checkRateLimit(`contact_${ipAddress}_${email.toLowerCase()}`, 5, 10 * 60 * 1000);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { error: `Too many contact requests. Please try again in ${rateCheck.retryAfterSec} seconds.` },
        { status: 429, headers: { 'Retry-After': String(rateCheck.retryAfterSec) } }
      );
    }

    const submission = await submitContactForm(
      name,
      email,
      reason,
      message,
      user?.id || null
    );

    return NextResponse.json({
      success: true,
      submission,
      message: 'Thank you for reaching out! Your message has been sent to the creator.',
    }, { status: 201 });
  } catch (error: unknown) {
    console.error('Error in contact form submission:', error);
    const msg = error instanceof Error ? error.message : 'Failed to submit contact form.';
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
