import { NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/auth';
import { submitContactForm } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const user = await getAuthenticatedUser();
    const body = await request.json();
    const { name, email, reason, message } = body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'Name is a required field.' }, { status: 400 });
    }

    if (!email || typeof email !== 'string' || !email.trim() || !email.includes('@')) {
      return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 });
    }

    if (!reason || typeof reason !== 'string' || !reason.trim()) {
      return NextResponse.json({ error: 'Please select a reason for contacting the creator.' }, { status: 400 });
    }

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ error: 'Please enter your message.' }, { status: 400 });
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
