/**
 * Google Drive Direct Open — browser-side helper that turns an in-memory .pptx / .docx
 * into a NATIVE Google Slides / Google Docs file inside the signed-in user's own Google
 * Drive and returns the real `https://docs.google.com/presentation/d/<id>/edit` URL.
 *
 * This is exactly what Gmail's "Open with Google Slides" does for an attachment:
 *   1. Google Identity Services (GIS) token flow → short-lived access token for the
 *      non-sensitive `drive.file` scope (only files created by this app are visible).
 *   2. Drive API `files.create` with `mimeType: application/vnd.google-apps.presentation`
 *      → Google converts the Office file into an editable Slides deck owned by the user.
 *   3. Redirect to the Slides editor URL (no local file download, no read-only viewer).
 *
 * Zero npm dependencies: GIS is loaded from accounts.google.com, uploads use `fetch`.
 */

export type GoogleWorkspaceKind = 'slides' | 'docs';

export const GOOGLE_DRIVE_FILE_SCOPE = 'https://www.googleapis.com/auth/drive.file';
/** drive.file + the basic identity scopes so we can pin `authuser=` on the redirect. */
export const GOOGLE_OAUTH_SCOPES = `${GOOGLE_DRIVE_FILE_SCOPE} openid email`;

export const GOOGLE_OAUTH_CLIENT_ID_STORAGE_KEY = 'pc_google_oauth_client_id';
const DRIVE_TOKEN_STORAGE_KEY = 'pc_google_drive_token_v2';
const OAUTH_CONFIG_CACHE_KEY = 'pc_google_oauth_config_v1';
const OAUTH_CONFIG_CACHE_TTL_MS = 5 * 60 * 1000;
const GIS_SCRIPT_ID = 'google-gsi-client-script';
const GIS_SCRIPT_SRC = 'https://accounts.google.com/gsi/client';
/** Drive multipart uploads are documented for files <= 5 MB; stay comfortably below. */
const MULTIPART_UPLOAD_LIMIT_BYTES = 4 * 1024 * 1024;

export const GOOGLE_WORKSPACE_MIME: Record<
  GoogleWorkspaceKind,
  { source: string; target: string; editorPath: 'presentation' | 'document'; label: string }
> = {
  slides: {
    source: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    target: 'application/vnd.google-apps.presentation',
    editorPath: 'presentation',
    label: 'Google Slides',
  },
  docs: {
    source: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    target: 'application/vnd.google-apps.document',
    editorPath: 'document',
    label: 'Google Docs',
  },
};

export interface CachedDriveToken {
  accessToken: string;
  /** Epoch ms after which the token must not be used. */
  expiresAt: number;
  clientId: string;
  email?: string;
}

export interface GoogleWorkspaceFileResult {
  id: string;
  url: string;
  webViewLink?: string;
  name?: string;
}

export class GoogleDriveDirectOpenError extends Error {
  readonly code:
    | 'no_client_id'
    | 'gis_unavailable'
    | 'popup_blocked'
    | 'popup_closed'
    | 'access_denied'
    | 'token_expired'
    | 'drive_api_disabled'
    | 'insufficient_permissions'
    | 'storage_quota'
    | 'upload_failed'
    | 'unknown';

  constructor(code: GoogleDriveDirectOpenError['code'], message: string) {
    super(message);
    this.name = 'GoogleDriveDirectOpenError';
    this.code = code;
  }
}

/* -------------------------------------------------------------------------- */
/*  OAuth Client ID resolution                                                 */
/* -------------------------------------------------------------------------- */

export function isValidGoogleOAuthClientId(candidate: string | null | undefined): boolean {
  if (!candidate) return false;
  return /^[0-9]{6,}-[a-z0-9]+\.apps\.googleusercontent\.com$/i.test(candidate.trim());
}

function safeStorage(kind: 'local' | 'session'): Storage | null {
  if (typeof window === 'undefined') return null;
  try {
    return kind === 'local' ? window.localStorage : window.sessionStorage;
  } catch {
    return null;
  }
}

/** Admin override stored by the in-app setup card (survives deploys, per browser). */
export function getLocalGoogleOAuthClientIdOverride(): string {
  const value = safeStorage('local')?.getItem(GOOGLE_OAUTH_CLIENT_ID_STORAGE_KEY) || '';
  return isValidGoogleOAuthClientId(value) ? value.trim() : '';
}

export function saveLocalGoogleOAuthClientIdOverride(clientId: string): void {
  const storage = safeStorage('local');
  if (!storage) return;
  const clean = clientId.trim();
  if (clean) {
    storage.setItem(GOOGLE_OAUTH_CLIENT_ID_STORAGE_KEY, clean);
  } else {
    storage.removeItem(GOOGLE_OAUTH_CLIENT_ID_STORAGE_KEY);
  }
  safeStorage('session')?.removeItem(OAUTH_CONFIG_CACHE_KEY);
}

/**
 * Resolves the OAuth Web Client ID: local admin override → server runtime config
 * (`GOOGLE_OAUTH_CLIENT_ID` env on Cloud Run, exposed by /api/google-workspace/oauth-config).
 */
export async function resolveGoogleOAuthClientId(): Promise<string> {
  const override = getLocalGoogleOAuthClientIdOverride();
  if (override) return override;

  const session = safeStorage('session');
  try {
    const cachedRaw = session?.getItem(OAUTH_CONFIG_CACHE_KEY);
    if (cachedRaw) {
      const cached = JSON.parse(cachedRaw) as { clientId?: string; fetchedAt?: number };
      if (cached && Date.now() - (cached.fetchedAt || 0) < OAUTH_CONFIG_CACHE_TTL_MS) {
        return isValidGoogleOAuthClientId(cached.clientId) ? String(cached.clientId) : '';
      }
    }
  } catch {
    // ignore cache corruption
  }

  try {
    const res = await fetch('/api/google-workspace/oauth-config', { cache: 'no-store' });
    if (!res.ok) return '';
    const data = (await res.json()) as { clientId?: string };
    const clientId = isValidGoogleOAuthClientId(data?.clientId) ? String(data.clientId).trim() : '';
    session?.setItem(OAUTH_CONFIG_CACHE_KEY, JSON.stringify({ clientId, fetchedAt: Date.now() }));
    return clientId;
  } catch {
    return '';
  }
}

/* -------------------------------------------------------------------------- */
/*  Token cache                                                                */
/* -------------------------------------------------------------------------- */

export function getCachedDriveToken(clientId?: string): CachedDriveToken | null {
  const raw = safeStorage('local')?.getItem(DRIVE_TOKEN_STORAGE_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as CachedDriveToken;
    if (!parsed?.accessToken || typeof parsed.expiresAt !== 'number') return null;
    if (parsed.expiresAt - 60_000 <= Date.now()) return null;
    if (clientId && parsed.clientId && parsed.clientId !== clientId) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function cacheDriveToken(token: CachedDriveToken): void {
  safeStorage('local')?.setItem(DRIVE_TOKEN_STORAGE_KEY, JSON.stringify(token));
}

export function clearCachedDriveToken(): void {
  safeStorage('local')?.removeItem(DRIVE_TOKEN_STORAGE_KEY);
}

/* -------------------------------------------------------------------------- */
/*  Google Identity Services loader + token client                            */
/* -------------------------------------------------------------------------- */

let gisLoadPromise: Promise<void> | null = null;

export function loadGoogleIdentityServices(): Promise<void> {
  if (typeof window === 'undefined') {
    return Promise.reject(new GoogleDriveDirectOpenError('gis_unavailable', 'Google Identity Services requires a browser.'));
  }
  const googleObj = (window as any).google;
  if (googleObj?.accounts?.oauth2) return Promise.resolve();
  if (gisLoadPromise) return gisLoadPromise;

  gisLoadPromise = new Promise<void>((resolve, reject) => {
    const finish = () => {
      if ((window as any).google?.accounts?.oauth2) {
        resolve();
      } else {
        gisLoadPromise = null;
        reject(new GoogleDriveDirectOpenError('gis_unavailable', 'Google Identity Services failed to initialize.'));
      }
    };
    const existing = document.getElementById(GIS_SCRIPT_ID) as HTMLScriptElement | null;
    if (existing) {
      if ((window as any).google?.accounts?.oauth2) {
        resolve();
        return;
      }
      existing.addEventListener('load', finish, { once: true });
      existing.addEventListener(
        'error',
        () => {
          gisLoadPromise = null;
          reject(new GoogleDriveDirectOpenError('gis_unavailable', 'Could not load Google Identity Services script.'));
        },
        { once: true }
      );
      return;
    }
    const script = document.createElement('script');
    script.id = GIS_SCRIPT_ID;
    script.src = GIS_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = finish;
    script.onerror = () => {
      gisLoadPromise = null;
      reject(new GoogleDriveDirectOpenError('gis_unavailable', 'Could not load Google Identity Services script.'));
    };
    document.head.appendChild(script);
  });
  return gisLoadPromise;
}

export interface DriveTokenRequestOptions {
  /** '' lets returning users skip the consent screen; 'select_account' forces the chooser. */
  prompt?: '' | 'consent' | 'select_account';
  loginHint?: string;
}

export interface DriveTokenClient {
  clientId: string;
  /**
   * MUST be invoked synchronously inside a user gesture (click) — Google opens a popup.
   * Resolves with a cached, expiry-aware token.
   */
  requestToken(options?: DriveTokenRequestOptions): Promise<CachedDriveToken>;
}

export async function prepareDriveTokenClient(clientId: string): Promise<DriveTokenClient> {
  if (!isValidGoogleOAuthClientId(clientId)) {
    throw new GoogleDriveDirectOpenError('no_client_id', 'A Google OAuth Web Client ID is required.');
  }
  await loadGoogleIdentityServices();
  const oauth2 = (window as any).google.accounts.oauth2;

  const tokenClient = oauth2.initTokenClient({
    client_id: clientId,
    scope: GOOGLE_OAUTH_SCOPES,
    callback: () => {},
    error_callback: () => {},
  });

  return {
    clientId,
    requestToken(options?: DriveTokenRequestOptions) {
      return new Promise<CachedDriveToken>((resolve, reject) => {
        tokenClient.callback = async (resp: any) => {
          if (resp?.error) {
            const code = resp.error === 'access_denied' ? 'access_denied' : 'unknown';
            reject(new GoogleDriveDirectOpenError(code, resp.error_description || resp.error));
            return;
          }
          if (!resp?.access_token) {
            reject(new GoogleDriveDirectOpenError('unknown', 'Google did not return an access token.'));
            return;
          }
          const expiresInSec = Number(resp.expires_in) > 0 ? Number(resp.expires_in) : 3600;
          const token: CachedDriveToken = {
            accessToken: resp.access_token,
            expiresAt: Date.now() + expiresInSec * 1000,
            clientId,
          };
          token.email = await fetchGoogleAccountEmail(token.accessToken);
          cacheDriveToken(token);
          resolve(token);
        };
        tokenClient.error_callback = (err: any) => {
          const type = String(err?.type || '');
          if (type === 'popup_failed_to_open') {
            reject(new GoogleDriveDirectOpenError('popup_blocked', 'The Google sign-in popup was blocked. Allow popups for this site and try again.'));
          } else if (type === 'popup_closed') {
            reject(new GoogleDriveDirectOpenError('popup_closed', 'Google sign-in was closed before finishing.'));
          } else {
            reject(new GoogleDriveDirectOpenError('unknown', err?.message || 'Google sign-in failed.'));
          }
        };
        const overrides: Record<string, string> = { prompt: options?.prompt ?? '' };
        if (options?.loginHint) overrides.login_hint = options.loginHint;
        tokenClient.requestAccessToken(overrides);
      });
    },
  };
}

export async function fetchGoogleAccountEmail(accessToken: string): Promise<string | undefined> {
  try {
    const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!res.ok) return undefined;
    const data = (await res.json()) as { email?: string };
    return typeof data?.email === 'string' ? data.email : undefined;
  } catch {
    return undefined;
  }
}

/* -------------------------------------------------------------------------- */
/*  Drive upload + conversion                                                  */
/* -------------------------------------------------------------------------- */

export function buildGoogleEditorUrl(kind: GoogleWorkspaceKind, fileId: string, email?: string): string {
  const base = `https://docs.google.com/${GOOGLE_WORKSPACE_MIME[kind].editorPath}/d/${encodeURIComponent(fileId)}/edit`;
  return email ? `${base}?authuser=${encodeURIComponent(email)}` : base;
}

/** Builds a `multipart/related` body (metadata part + media part) for Drive `files.create`. */
export function buildDriveMultipartBody(
  metadata: Record<string, unknown>,
  media: Blob,
  mediaMimeType: string,
  boundary: string = `pc_drive_${Math.random().toString(36).slice(2)}_${Date.now()}`
): { body: Blob; contentType: string } {
  const head =
    `--${boundary}\r\n` +
    'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
    `${JSON.stringify(metadata)}\r\n` +
    `--${boundary}\r\n` +
    `Content-Type: ${mediaMimeType}\r\n\r\n`;
  const tail = `\r\n--${boundary}--`;
  return {
    body: new Blob([head, media, tail]),
    contentType: `multipart/related; boundary=${boundary}`,
  };
}

/** Maps a Drive API error payload to an actionable, user-facing error. */
export function describeDriveApiError(status: number, rawBody: string): GoogleDriveDirectOpenError {
  let reason = '';
  let message = '';
  try {
    const parsed = JSON.parse(rawBody);
    reason = String(parsed?.error?.errors?.[0]?.reason || parsed?.error?.status || '');
    message = String(parsed?.error?.message || '');
  } catch {
    message = rawBody.slice(0, 300);
  }

  if (status === 401) {
    return new GoogleDriveDirectOpenError('token_expired', 'Your Google session expired. Sign in again to continue.');
  }
  if (reason === 'accessNotConfigured' || /Drive API has not been used|is disabled/i.test(message)) {
    return new GoogleDriveDirectOpenError(
      'drive_api_disabled',
      'The Google Drive API is not enabled in the Google Cloud project that owns this OAuth client.'
    );
  }
  if (reason === 'storageQuotaExceeded' || /quota/i.test(message)) {
    return new GoogleDriveDirectOpenError('storage_quota', 'Your Google Drive storage quota is full.');
  }
  if (status === 403) {
    return new GoogleDriveDirectOpenError(
      'insufficient_permissions',
      message || 'Google Drive rejected the request (insufficient permissions).'
    );
  }
  return new GoogleDriveDirectOpenError(
    'upload_failed',
    `Google Drive API returned ${status}${message ? `: ${message}` : ''}`
  );
}

/**
 * Creates a native Google Slides / Google Docs file from an Office blob in the user's Drive.
 * Small payloads use the multipart endpoint; larger decks use the resumable protocol.
 */
export async function createGoogleWorkspaceFileFromBlob(
  accessToken: string,
  blob: Blob,
  options: { name: string; kind: GoogleWorkspaceKind; email?: string }
): Promise<GoogleWorkspaceFileResult> {
  const mime = GOOGLE_WORKSPACE_MIME[options.kind];
  const metadata = { name: options.name, mimeType: mime.target };
  const fields = 'id,name,webViewLink,mimeType';

  let response: Response;
  if (blob.size <= MULTIPART_UPLOAD_LIMIT_BYTES) {
    const { body, contentType } = buildDriveMultipartBody(metadata, blob, mime.source);
    response = await fetch(
      `https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&supportsAllDrives=true&fields=${encodeURIComponent(fields)}`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': contentType },
        body,
      }
    );
  } else {
    const initRes = await fetch(
      `https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable&supportsAllDrives=true&fields=${encodeURIComponent(fields)}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json; charset=UTF-8',
          'X-Upload-Content-Type': mime.source,
          'X-Upload-Content-Length': String(blob.size),
        },
        body: JSON.stringify(metadata),
      }
    );
    if (!initRes.ok) {
      throw describeDriveApiError(initRes.status, await initRes.text());
    }
    const sessionUri = initRes.headers.get('Location');
    if (!sessionUri) {
      throw new GoogleDriveDirectOpenError('upload_failed', 'Google Drive did not return a resumable upload session.');
    }
    response = await fetch(sessionUri, {
      method: 'PUT',
      headers: { 'Content-Type': mime.source },
      body: blob,
    });
  }

  if (!response.ok) {
    const err = describeDriveApiError(response.status, await response.text());
    if (err.code === 'token_expired') clearCachedDriveToken();
    throw err;
  }

  const data = (await response.json()) as { id?: string; name?: string; webViewLink?: string };
  if (!data?.id) {
    throw new GoogleDriveDirectOpenError('upload_failed', 'Google Drive did not return a file id.');
  }
  return {
    id: data.id,
    name: data.name,
    webViewLink: data.webViewLink,
    url: buildGoogleEditorUrl(options.kind, data.id, options.email),
  };
}

/** Human-readable guidance for the one-time OAuth client setup (shown in the handoff UI). */
export function getGoogleOAuthSetupOrigins(): string[] {
  const origins = new Set<string>(['https://promptcanvas-248990048888.cr.gclb.goog', 'http://localhost:3000']);
  if (typeof window !== 'undefined' && window.location?.origin) {
    origins.add(window.location.origin);
  }
  return Array.from(origins);
}
