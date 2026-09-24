import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { getUserGeminiApiKey, setUserGeminiApiKey } from '@/lib/db';
import { GEMINI_MODEL_ID, GEMINI_FLASH_MODEL_ID } from '@/lib/geminiConfig';

function maskApiKey(raw: string): string {
  const trimmed = raw.trim();
  if (trimmed.length <= 8) return '••••••••';
  return `${trimmed.slice(0, 6)}••••••••${trimmed.slice(-4)}`;
}

function isGuestAccount(user: { email?: string; is_guest?: number | boolean } | null): boolean {
  if (!user) return true;
  if (user.is_guest === 1 || user.is_guest === true) return true;
  if (typeof user.email === 'string' && user.email.toLowerCase().endsWith('@guest.promptcanvas.local')) {
    return true;
  }
  return false;
}

export async function GET() {
  try {
    const user = await getCurrentUser();
    const isGuest = isGuestAccount(user);

    if (!user || isGuest) {
      return NextResponse.json({
        authenticated: Boolean(user && !isGuest),
        isGuest: true,
        userId: user?.id || null,
        email: user?.email || null,
        hasKey: false,
        maskedKey: null,
        keySource: 'guest_system_key',
        activeModels: {
          pro: GEMINI_MODEL_ID,
          flash: GEMINI_FLASH_MODEL_ID,
        },
      });
    }

    const savedKey = await getUserGeminiApiKey(user.id);
    return NextResponse.json({
      authenticated: true,
      isGuest: false,
      userId: user.id,
      email: user.email,
      hasKey: Boolean(savedKey),
      maskedKey: savedKey ? maskApiKey(savedKey) : null,
      keySource: savedKey ? 'user_byok' : 'system_default',
      activeModels: {
        pro: GEMINI_MODEL_ID,
        flash: GEMINI_FLASH_MODEL_ID,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Failed to load API key configuration' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    const isGuest = isGuestAccount(user);

    if (!user || isGuest) {
      return NextResponse.json(
        {
          error: 'Sign in with a registered account to save a personal Gemini API key tied to your User ID. In Guest mode, the default system key is used automatically.',
          isGuest: true,
        },
        { status: 403 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const rawKey = typeof body.apiKey === 'string' ? body.apiKey.trim() : '';

    if (rawKey.length > 0 && rawKey.length < 16) {
      return NextResponse.json(
        { error: 'Please enter a valid Google Gemini API key (e.g., AIzaSy...).' },
        { status: 400 }
      );
    }

    await setUserGeminiApiKey(user.id, rawKey || null);

    return NextResponse.json({
      success: true,
      userId: user.id,
      hasKey: Boolean(rawKey),
      maskedKey: rawKey ? maskApiKey(rawKey) : null,
      keySource: rawKey ? 'user_byok' : 'system_default',
      activeModels: {
        pro: GEMINI_MODEL_ID,
        flash: GEMINI_FLASH_MODEL_ID,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Failed to save Gemini API key' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    const user = await getCurrentUser();
    const isGuest = isGuestAccount(user);
    if (!user || isGuest) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    await setUserGeminiApiKey(user.id, null);
    return NextResponse.json({
      success: true,
      userId: user.id,
      hasKey: false,
      maskedKey: null,
      keySource: 'system_default',
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Failed to remove Gemini API key' },
      { status: 500 }
    );
  }
}
