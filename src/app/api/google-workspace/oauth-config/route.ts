import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { CachedDriveToken, GOOGLE_OAUTH_SCOPES, isValidGoogleOAuthClientId } from '@/lib/googleDriveDirectOpen';

export const dynamic = 'force-dynamic';

const SESSION_COOKIE_NAME = 'pc_drive_session_v1';
const EMAIL_COOKIE_NAME = 'pc_google_user_email';
const GCS_BRIDGE_BUCKET = 'promptcanvas-cloud-bridge-sandbox';
const THIRTY_DAYS_SEC = 30 * 24 * 60 * 60;

interface StoredDriveSession extends CachedDriveToken {
  refreshToken?: string;
  updatedAt: number;
}

declare global {
  // eslint-disable-next-line no-var
  var __pcDriveSessions: Map<string, StoredDriveSession> | undefined;
}

function getSessionMap(): Map<string, StoredDriveSession> {
  if (!globalThis.__pcDriveSessions) {
    globalThis.__pcDriveSessions = new Map<string, StoredDriveSession>();
  }
  return globalThis.__pcDriveSessions;
}

/**
 * Extracts the authenticated user's email from Google BeyondCorp / Cloud IAP headers
 * (`x-goog-authenticated-user-email: accounts.google.com:user@google.com`) or persistent cookie.
 */
export function extractAuthenticatedGoogleEmail(req: NextRequest): string | undefined {
  const rawIapHeader =
    req.headers.get('x-goog-authenticated-user-email') ||
    req.headers.get('x-forwarded-email') ||
    req.headers.get('x-authenticated-user-email') ||
    '';
  if (rawIapHeader) {
    const cleaned = rawIapHeader.replace(/^accounts\.google\.com:/i, '').trim();
    if (cleaned.includes('@')) return cleaned;
  }
  const cookieEmail = req.cookies.get(EMAIL_COOKIE_NAME)?.value?.trim();
  if (cookieEmail && cookieEmail.includes('@')) {
    return decodeURIComponent(cookieEmail);
  }
  return undefined;
}

function sessionKeyForEmail(email: string | undefined, clientId: string): string {
  const raw = `${(email || 'default').toLowerCase().trim()}::${clientId}`;
  return crypto.createHash('sha256').update(raw).digest('hex').slice(0, 32);
}

async function getGcpMetadataToken(): Promise<string | null> {
  try {
    const metaRes = await fetch(
      'http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token',
      {
        headers: { 'Metadata-Flavor': 'Google' },
        signal: AbortSignal.timeout(1200),
      }
    );
    if (!metaRes.ok) return null;
    const data = (await metaRes.json()) as { access_token?: string };
    return data?.access_token || null;
  } catch {
    return null;
  }
}

async function loadSessionFromGcs(key: string): Promise<StoredDriveSession | null> {
  try {
    const gcpToken = await getGcpMetadataToken();
    if (!gcpToken) return null;
    const objectName = `auth_sessions/${key}.json`;
    const res = await fetch(
      `https://storage.googleapis.com/storage/v1/b/${GCS_BRIDGE_BUCKET}/o/${encodeURIComponent(objectName)}?alt=media`,
      {
        headers: { Authorization: `Bearer ${gcpToken}` },
        signal: AbortSignal.timeout(1500),
      }
    );
    if (!res.ok) return null;
    const parsed = (await res.json()) as StoredDriveSession;
    return parsed?.accessToken ? parsed : null;
  } catch {
    return null;
  }
}

async function saveSessionToGcs(key: string, session: StoredDriveSession): Promise<void> {
  try {
    const gcpToken = await getGcpMetadataToken();
    if (!gcpToken) return;
    const objectName = `auth_sessions/${key}.json`;
    await fetch(
      `https://storage.googleapis.com/upload/storage/v1/b/${GCS_BRIDGE_BUCKET}/o?uploadType=media&name=${encodeURIComponent(
        objectName
      )}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${gcpToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(session),
        signal: AbortSignal.timeout(1500),
      }
    );
  } catch {
    // non-fatal background persistence
  }
}

/**
 * Attempts to mint a fresh Google Drive access token using a server-side OAuth refresh token
 * (either stored in the user's session or configured via GOOGLE_OAUTH_REFRESH_TOKEN).
 */
async function tryRefreshAccessToken(
  clientId: string,
  refreshToken?: string,
  email?: string
): Promise<StoredDriveSession | null> {
  const effectiveRefreshToken = (refreshToken || process.env.GOOGLE_OAUTH_REFRESH_TOKEN || '').trim();
  const clientSecret = (process.env.GOOGLE_OAUTH_CLIENT_SECRET || '').trim();
  if (!effectiveRefreshToken || !clientSecret || !clientId) return null;

  try {
    const body = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: effectiveRefreshToken,
      grant_type: 'refresh_token',
    });
    const res = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
      signal: AbortSignal.timeout(2500),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { access_token?: string; expires_in?: number };
    if (!data?.access_token) return null;
    const expiresInSec = Number(data.expires_in) > 0 ? Number(data.expires_in) : 3600;
    return {
      accessToken: data.access_token,
      expiresAt: Date.now() + expiresInSec * 1000,
      clientId,
      email,
      refreshToken: effectiveRefreshToken,
      updatedAt: Date.now(),
    };
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const rawClientId = (
    process.env.GOOGLE_OAUTH_CLIENT_ID ||
    process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID ||
    ''
  ).trim();
  const clientId = isValidGoogleOAuthClientId(rawClientId) ? rawClientId : '';
  const iapEmail = extractAuthenticatedGoogleEmail(req);

  let sessionToken: CachedDriveToken | null = null;
  let storedSession: StoredDriveSession | null = null;

  // 1. Check encrypted/encoded httpOnly session cookie first
  const rawCookie = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (rawCookie) {
    try {
      const decoded = JSON.parse(Buffer.from(rawCookie, 'base64url').toString('utf-8')) as StoredDriveSession;
      if (decoded?.accessToken && (!clientId || decoded.clientId === clientId)) {
        storedSession = decoded;
      }
    } catch {
      // ignore malformed cookie
    }
  }

  // 2. Check server memory map / GCS persistent vault keyed by BeyondCorp email
  const key = sessionKeyForEmail(iapEmail || storedSession?.email, clientId);
  if (!storedSession || storedSession.expiresAt - 60_000 <= Date.now()) {
    const memHit = getSessionMap().get(key);
    if (memHit && memHit.expiresAt - 60_000 > Date.now()) {
      storedSession = memHit;
    } else {
      const gcsHit = await loadSessionFromGcs(key);
      if (gcsHit) {
        storedSession = gcsHit;
        getSessionMap().set(key, gcsHit);
      }
    }
  }

  // 3. Validate token expiry or auto-refresh via server-side refresh_token
  if (storedSession && storedSession.expiresAt - 60_000 > Date.now()) {
    sessionToken = {
      accessToken: storedSession.accessToken,
      expiresAt: storedSession.expiresAt,
      clientId: storedSession.clientId,
      email: storedSession.email || iapEmail,
    };
  } else if (clientId) {
    const refreshed = await tryRefreshAccessToken(
      clientId,
      storedSession?.refreshToken,
      storedSession?.email || iapEmail
    );
    if (refreshed) {
      getSessionMap().set(key, refreshed);
      void saveSessionToGcs(key, refreshed);
      sessionToken = {
        accessToken: refreshed.accessToken,
        expiresAt: refreshed.expiresAt,
        clientId: refreshed.clientId,
        email: refreshed.email || iapEmail,
      };
    }
  }

  const effectiveEmail = sessionToken?.email || storedSession?.email || iapEmail;

  const response = NextResponse.json(
    {
      configured: clientId.length > 0,
      clientId,
      scopes: GOOGLE_OAUTH_SCOPES,
      flow: 'google-identity-services-token-client',
      iapEmail: effectiveEmail,
      sessionToken,
    },
    { headers: { 'Cache-Control': 'no-store' } }
  );

  if (effectiveEmail) {
    response.cookies.set(EMAIL_COOKIE_NAME, effectiveEmail, {
      httpOnly: false,
      sameSite: 'lax',
      path: '/',
      maxAge: THIRTY_DAYS_SEC,
    });
  }

  return response;
}

/**
 * Persists an active Google Drive OAuth token (and optional refresh token) in the server-side
 * session cookie + GCS vault so returning sessions, new tabs, and Cloud Run revisions reuse it
 * without re-prompting the user.
 */
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<StoredDriveSession>;
    if (!body?.accessToken || !body?.clientId || typeof body?.expiresAt !== 'number') {
      return NextResponse.json({ ok: false, error: 'Invalid token payload' }, { status: 400 });
    }
    const iapEmail = extractAuthenticatedGoogleEmail(req);
    const effectiveEmail = body.email || iapEmail;

    const session: StoredDriveSession = {
      accessToken: body.accessToken,
      expiresAt: body.expiresAt,
      clientId: body.clientId,
      email: effectiveEmail,
      refreshToken: body.refreshToken,
      updatedAt: Date.now(),
    };

    const key = sessionKeyForEmail(effectiveEmail, body.clientId);
    getSessionMap().set(key, session);
    void saveSessionToGcs(key, session);

    const res = NextResponse.json({ ok: true, email: effectiveEmail });
    const encoded = Buffer.from(JSON.stringify(session), 'utf-8').toString('base64url');
    res.cookies.set(SESSION_COOKIE_NAME, encoded, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: THIRTY_DAYS_SEC,
    });
    if (effectiveEmail) {
      res.cookies.set(EMAIL_COOKIE_NAME, effectiveEmail, {
        httpOnly: false,
        sameSite: 'lax',
        path: '/',
        maxAge: THIRTY_DAYS_SEC,
      });
    }
    return res;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  const iapEmail = extractAuthenticatedGoogleEmail(req);
  const rawClientId = (process.env.GOOGLE_OAUTH_CLIENT_ID || '').trim();
  if (rawClientId) {
    const key = sessionKeyForEmail(iapEmail, rawClientId);
    getSessionMap().delete(key);
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(SESSION_COOKIE_NAME);
  return res;
}
