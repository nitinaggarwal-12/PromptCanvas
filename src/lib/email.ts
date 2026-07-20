import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;

export async function sendMagicLinkEmail({
  toEmail,
  magicLinkUrl,
}: {
  toEmail: string;
  magicLinkUrl: string;
}) {
  if (!resendApiKey) {
    console.warn('[Resend Email] RESEND_API_KEY environment variable is missing. Email skipped.');
    return { success: false, reason: 'Missing RESEND_API_KEY' };
  }

  const resend = new Resend(resendApiKey);

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #070a13; color: #e2e8f0; margin: 0; padding: 40px 20px; }
          .card { max-width: 500px; margin: 0 auto; background-color: #0b101d; border: 1px solid #1e293b; border-radius: 16px; padding: 32px; text-align: center; }
          .logo { font-size: 20px; font-weight: 900; color: #2dd4bf; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 24px; }
          .title { font-size: 24px; font-weight: 800; color: #ffffff; margin-bottom: 12px; }
          .text { font-size: 14px; color: #94a3b8; line-height: 1.6; margin-bottom: 28px; }
          .btn { display: inline-block; background: linear-gradient(to right, #2dd4bf, #6366f1); color: #070a13; font-weight: 800; font-size: 15px; padding: 14px 32px; border-radius: 12px; text-decoration: none; box-shadow: 0 4px 14px rgba(45, 212, 191, 0.2); }
          .footer { margin-top: 32px; font-size: 12px; color: #64748b; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="logo">⚡ PromptCanvas</div>
          <div class="title">Your Passwordless Sign-In Link</div>
          <p class="text">Click the button below to instantly sign in to your PromptCanvas workspace and access your architecture diagrams.</p>
          <a href="${magicLinkUrl}" class="btn">✨ Sign In to PromptCanvas</a>
          <p class="footer">If you did not request this link, you can safely ignore this email.<br>This link expires in 15 minutes.</p>
        </div>
      </body>
    </html>
  `;

  try {
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'PromptCanvas <onboarding@resend.dev>';
    const data = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: '✨ Your PromptCanvas Passwordless Sign-In Link',
      html: htmlContent,
    });

    console.log(`[Resend Email] 🚀 Magic Link email dispatched to ${toEmail}. Message ID:`, data.data?.id);
    return { success: true, id: data.data?.id };
  } catch (error) {
    console.error('[Resend Email Error]:', error);
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }
}
