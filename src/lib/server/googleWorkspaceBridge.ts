import fs from 'fs';
import path from 'path';
import os from 'os';
import crypto from 'crypto';
import { DEFAULT_GOOGLE_OAUTH_CLIENT_ID } from '@/lib/googleDriveDirectOpen';

export const QUOTA_PROJECT = 'nitina-ggarwal-sandbox-647724';
export const DEFAULT_USER_EMAIL = 'nitinagga@google.com';

export interface CloudSlidesManifestEntry {
  key: string;
  title: string;
  pptxPath?: string;
  sha256: string;
  sizeBytes?: number;
  googleSlidesId: string;
  googleSlidesEditUrl: string;
  googleSlidesPreviewUrl: string;
  googleSlidesEmbedUrl: string;
  googleSlidesPdfUrl: string;
  webViewLink: string;
  syncedAt: string;
}

export interface CloudDocsManifestEntry {
  key: string;
  title: string;
  mdPath?: string;
  sha256: string;
  googleDocsId: string;
  googleDocsEditUrl: string;
  googleDocsPreviewUrl: string;
  googleDocsPdfUrl: string;
  webViewLink: string;
  syncedAt: string;
}

export interface CloudViewerManifest {
  updatedAt: string;
  accountEmail: string;
  oauthClientId: string;
  slides: Record<string, CloudSlidesManifestEntry>;
  docs: Record<string, CloudDocsManifestEntry>;
}

const REPO_MANIFEST_PATH = path.join(process.cwd(), 'src', 'data', 'cloud_viewer_manifest.json');
const TMP_MANIFEST_PATH = path.join(os.tmpdir(), 'promptcanvas_cloud_viewer_manifest.json');
const BLOGS_MANIFEST_PATH = '/Users/nitinagga/Documents/blogs/slides/cloud_viewer_manifest.json';

const TOKEN_CANDIDATE_PATHS = [
  path.join(process.cwd(), '.gsheet_oauth_token.json'),
  '/Users/nitinagga/Documents/blogs/.gsheet_oauth_token.json',
  '/Users/nitinagga/Documents/gantry-pulse/.gsheet_oauth_token.json',
];

declare global {
  // eslint-disable-next-line no-var
  var __pcServerDriveTokenCache:
    | {
        accessToken: string | null;
        expiresAt: number;
        email: string;
      }
    | undefined;
  // eslint-disable-next-line no-var
  var __pcCloudViewerManifestCache: CloudViewerManifest | undefined;
}

function getTokenCache() {
  if (!globalThis.__pcServerDriveTokenCache) {
    globalThis.__pcServerDriveTokenCache = {
      accessToken: null,
      expiresAt: 0,
      email: DEFAULT_USER_EMAIL,
    };
  }
  return globalThis.__pcServerDriveTokenCache;
}

interface RawOAuthCredentials {
  client_id: string;
  client_secret: string;
  refresh_token: string;
}

function resolveServerOAuthCredentials(): RawOAuthCredentials[] {
  const candidates: RawOAuthCredentials[] = [];

  const envClientId = (
    process.env.GOOGLE_WORKSPACE_CLIENT_ID ||
    process.env.GOOGLE_OAUTH_CLIENT_ID ||
    DEFAULT_GOOGLE_OAUTH_CLIENT_ID
  ).trim();
  const envClientSecret = (
    process.env.GOOGLE_WORKSPACE_CLIENT_SECRET ||
    process.env.GOOGLE_OAUTH_CLIENT_SECRET ||
    ''
  ).trim();
  const envRefreshToken = (
    process.env.GOOGLE_WORKSPACE_REFRESH_TOKEN ||
    process.env.GOOGLE_OAUTH_REFRESH_TOKEN ||
    ''
  ).trim();

  if (envClientId && envClientSecret && envRefreshToken) {
    candidates.push({
      client_id: envClientId,
      client_secret: envClientSecret,
      refresh_token: envRefreshToken,
    });
  }

  for (const filePath of TOKEN_CANDIDATE_PATHS) {
    try {
      if (fs.existsSync(filePath)) {
        const parsed = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        if (parsed?.client_id && parsed?.client_secret && parsed?.refresh_token) {
          candidates.push({
            client_id: String(parsed.client_id).trim(),
            client_secret: String(parsed.client_secret).trim(),
            refresh_token: String(parsed.refresh_token).trim(),
          });
        }
      }
    } catch {
      // ignore unreadable candidate path
    }
  }

  return candidates;
}

/**
 * Mints a fresh Google Drive access token server-side using the OAuth refresh token
 * (exact port of blogs/scripts/sync_google_workspace_bridge.py:get_drive_access_token).
 */
export async function getServerDriveAccessToken(): Promise<string | null> {
  const cache = getTokenCache();
  const nowSec = Date.now() / 1000;
  if (cache.accessToken && nowSec < cache.expiresAt) {
    return cache.accessToken;
  }

  const credsList = resolveServerOAuthCredentials();
  for (const creds of credsList) {
    try {
      const body = new URLSearchParams({
        client_id: creds.client_id,
        client_secret: creds.client_secret,
        refresh_token: creds.refresh_token,
        grant_type: 'refresh_token',
      });
      const res = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
        signal: AbortSignal.timeout(10000),
      });
      if (!res.ok) continue;
      const payload = (await res.json()) as { access_token?: string; expires_in?: number };
      if (payload?.access_token) {
        cache.accessToken = payload.access_token;
        cache.expiresAt = nowSec + Number(payload.expires_in || 3500) - 120;
        return payload.access_token;
      }
    } catch (err) {
      console.warn('[GoogleWorkspaceBridge] Token refresh warning:', err);
    }
  }

  return null;
}

export function normalizeManifestKey(rawKey: string): string {
  const clean = String(rawKey || 'WS1').trim();
  if (!clean) return 'WS1';
  const upper = clean.toUpperCase();
  if (['WS1', 'WS2', 'WS3', 'WS4', 'WS5', 'ALL'].includes(upper)) {
    return upper;
  }
  const wsPrefixMatch = clean.match(/^(?:uc-geap-)?ws([1-5])(?:$|[-_.])/i);
  if (wsPrefixMatch) {
    return `WS${wsPrefixMatch[1]}`;
  }
  const numMatch = clean.match(/^#?(\d{1,2})$/);
  if (numMatch) {
    return `BP-${numMatch[1].padStart(2, '0')}`;
  }
  const bpMatch = clean.match(/^BP[-_]?(\d{1,2})$/i);
  if (bpMatch) {
    return `BP-${bpMatch[1].padStart(2, '0')}`;
  }
  return clean.replace(/[^A-Za-z0-9_-]/g, '_');
}

/**
 * Maps GEAP workstream use cases and diagram IDs to their pre-warmed workstream keys when applicable.
 */
export function resolveFallbackWorkstreamKey(key: string): string | null {
  const k = key.toLowerCase();
  if (k.includes('ws1') || k.includes('workstream-1') || k === 'uc-geap-ws1') return 'WS1';
  if (k.includes('ws2') || k.includes('workstream-2') || k === 'uc-geap-ws2') return 'WS2';
  if (k.includes('ws3') || k.includes('workstream-3') || k === 'uc-geap-ws3') return 'WS3';
  if (k.includes('ws4') || k.includes('workstream-4') || k === 'uc-geap-ws4') return 'WS4';
  if (k.includes('ws5') || k.includes('workstream-5') || k === 'uc-geap-ws5') return 'WS5';
  if (k === 'all' || k.includes('end-to-end')) return 'ALL';
  return null;
}

export function loadCloudViewerManifest(): CloudViewerManifest {
  const base: CloudViewerManifest = {
    updatedAt: new Date().toISOString(),
    accountEmail: DEFAULT_USER_EMAIL,
    oauthClientId: DEFAULT_GOOGLE_OAUTH_CLIENT_ID,
    slides: {},
    docs: {},
  };

  const mergeFrom = (filePath: string) => {
    try {
      if (fs.existsSync(filePath)) {
        const parsed = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as Partial<CloudViewerManifest>;
        if (parsed.accountEmail) base.accountEmail = parsed.accountEmail;
        if (parsed.oauthClientId) base.oauthClientId = parsed.oauthClientId;
        if (parsed.updatedAt) base.updatedAt = parsed.updatedAt;
        if (parsed.slides && typeof parsed.slides === 'object') {
          Object.assign(base.slides, parsed.slides);
        }
        if (parsed.docs && typeof parsed.docs === 'object') {
          Object.assign(base.docs, parsed.docs);
        }
      }
    } catch {
      // ignore parse errors
    }
  };

  mergeFrom(BLOGS_MANIFEST_PATH);
  mergeFrom(REPO_MANIFEST_PATH);
  mergeFrom(TMP_MANIFEST_PATH);

  if (globalThis.__pcCloudViewerManifestCache) {
    Object.assign(base.slides, globalThis.__pcCloudViewerManifestCache.slides);
    Object.assign(base.docs, globalThis.__pcCloudViewerManifestCache.docs);
  }

  globalThis.__pcCloudViewerManifestCache = base;
  return base;
}

export function saveCloudViewerManifest(manifest: CloudViewerManifest): void {
  manifest.updatedAt = new Date().toISOString();
  globalThis.__pcCloudViewerManifestCache = manifest;
  const serialized = JSON.stringify(manifest, null, 2);
  try {
    fs.writeFileSync(TMP_MANIFEST_PATH, serialized, 'utf-8');
  } catch {
    // ignore tmp write errors
  }
  try {
    const dir = path.dirname(REPO_MANIFEST_PATH);
    if (fs.existsSync(dir)) {
      fs.writeFileSync(REPO_MANIFEST_PATH, serialized, 'utf-8');
    }
  } catch {
    // ignore read-only container filesystem on Cloud Run
  }
}

export function sha256Buffer(buf: Buffer): string {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

/**
 * Uploads a compiled .pptx buffer to Google Drive with mimeType = application/vnd.google-apps.presentation,
 * converting it into a 100% native editable Google Slides presentation and caching it in cloud_viewer_manifest.json.
 */
export async function uploadPptxBufferToGoogleSlides(params: {
  pptxBuffer: Buffer;
  title: string;
  cacheKey: string;
  force?: boolean;
  accessTokenOverride?: string | null;
}): Promise<CloudSlidesManifestEntry> {
  const normalizedKey = normalizeManifestKey(params.cacheKey);
  const manifest = loadCloudViewerManifest();
  const sha = sha256Buffer(params.pptxBuffer);
  const existing = manifest.slides[normalizedKey];

  if (
    !params.force &&
    existing &&
    existing.googleSlidesId &&
    (existing.sha256 === sha || ['WS1', 'WS2', 'WS3', 'WS4', 'WS5', 'ALL'].includes(normalizedKey))
  ) {
    return existing;
  }

  const token = params.accessTokenOverride || (await getServerDriveAccessToken());
  if (!token) {
    // If no token and a fallback workstream entry exists, return the fallback entry
    const fbKey = resolveFallbackWorkstreamKey(normalizedKey) || 'WS1';
    if (manifest.slides[fbKey]) {
      return manifest.slides[fbKey];
    }
    throw new Error('No Google Drive OAuth token available on server to convert .pptx to Google Slides.');
  }

  const boundary = '----PromptCanvasCloudBridgeBoundary' + crypto.randomUUID().replace(/-/g, '');
  const metaJson = JSON.stringify({
    name: `${params.title} — Editable Google Slides`,
    mimeType: 'application/vnd.google-apps.presentation',
  });

  const multipartBody = Buffer.concat([
    Buffer.from(
      `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${metaJson}\r\n--${boundary}\r\nContent-Type: application/vnd.openxmlformats-officedocument.presentationml.presentation\r\n\r\n`,
      'utf-8'
    ),
    params.pptxBuffer,
    Buffer.from(`\r\n--${boundary}--\r\n`, 'utf-8'),
  ]);

  const res = await fetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&supportsAllDrives=true&fields=id,name,webViewLink',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'x-goog-user-project': QUOTA_PROJECT,
        'Content-Type': `multipart/related; boundary=${boundary}`,
      },
      body: new Uint8Array(multipartBody),
      signal: AbortSignal.timeout(60000),
    }
  );

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Google Drive Slides conversion failed (${res.status}): ${errText}`);
  }

  const data = (await res.json()) as { id: string; webViewLink?: string };
  const fid = data.id;
  const encodedEmail = encodeURIComponent(DEFAULT_USER_EMAIL);

  const entry: CloudSlidesManifestEntry = {
    key: normalizedKey,
    title: params.title,
    sha256: sha,
    sizeBytes: params.pptxBuffer.length,
    googleSlidesId: fid,
    googleSlidesEditUrl: `https://docs.google.com/presentation/d/${fid}/edit?authuser=${encodedEmail}`,
    googleSlidesPreviewUrl: `https://docs.google.com/presentation/d/${fid}/preview`,
    googleSlidesEmbedUrl: `https://docs.google.com/presentation/d/${fid}/embed?start=false&loop=false&delayms=5000`,
    googleSlidesPdfUrl: `https://docs.google.com/presentation/d/${fid}/export/pdf`,
    webViewLink: data.webViewLink || `https://docs.google.com/presentation/d/${fid}/edit`,
    syncedAt: new Date().toISOString(),
  };

  manifest.slides[normalizedKey] = entry;
  saveCloudViewerManifest(manifest);
  return entry;
}

/**
 * Uploads HTML or DOCX content to Google Drive with mimeType = application/vnd.google-apps.document,
 * converting it into a 100% native editable Google Docs document and caching it in cloud_viewer_manifest.json.
 */
export async function uploadHtmlOrDocxToGoogleDocs(params: {
  contentBuffer: Buffer;
  sourceMimeType: 'text/html; charset=UTF-8' | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  title: string;
  cacheKey: string;
  force?: boolean;
  accessTokenOverride?: string | null;
}): Promise<CloudDocsManifestEntry> {
  const normalizedKey = normalizeManifestKey(params.cacheKey);
  const manifest = loadCloudViewerManifest();
  const sha = sha256Buffer(params.contentBuffer);
  const existing = manifest.docs[normalizedKey];

  if (
    !params.force &&
    existing &&
    existing.googleDocsId &&
    (existing.sha256 === sha || ['WS1', 'WS2', 'WS3', 'WS4', 'WS5', 'ALL'].includes(normalizedKey))
  ) {
    return existing;
  }

  const token = params.accessTokenOverride || (await getServerDriveAccessToken());
  if (!token) {
    const fbKey = resolveFallbackWorkstreamKey(normalizedKey) || 'WS1';
    if (manifest.docs[fbKey]) {
      return manifest.docs[fbKey];
    }
    throw new Error('No Google Drive OAuth token available on server to convert specification to Google Docs.');
  }

  const boundary = '----PromptCanvasDocsBridgeBoundary' + crypto.randomUUID().replace(/-/g, '');
  const metaJson = JSON.stringify({
    name: `${params.title} — Editable Google Docs`,
    mimeType: 'application/vnd.google-apps.document',
  });

  const multipartBody = Buffer.concat([
    Buffer.from(
      `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${metaJson}\r\n--${boundary}\r\nContent-Type: ${params.sourceMimeType}\r\n\r\n`,
      'utf-8'
    ),
    params.contentBuffer,
    Buffer.from(`\r\n--${boundary}--\r\n`, 'utf-8'),
  ]);

  const res = await fetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&supportsAllDrives=true&fields=id,name,webViewLink',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'x-goog-user-project': QUOTA_PROJECT,
        'Content-Type': `multipart/related; boundary=${boundary}`,
      },
      body: new Uint8Array(multipartBody),
      signal: AbortSignal.timeout(60000),
    }
  );

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Google Drive Docs conversion failed (${res.status}): ${errText}`);
  }

  const data = (await res.json()) as { id: string; webViewLink?: string };
  const fid = data.id;
  const encodedEmail = encodeURIComponent(DEFAULT_USER_EMAIL);

  const entry: CloudDocsManifestEntry = {
    key: normalizedKey,
    title: params.title,
    sha256: sha,
    googleDocsId: fid,
    googleDocsEditUrl: `https://docs.google.com/document/d/${fid}/edit?authuser=${encodedEmail}`,
    googleDocsPreviewUrl: `https://docs.google.com/document/d/${fid}/preview`,
    googleDocsPdfUrl: `https://docs.google.com/document/d/${fid}/export?format=pdf`,
    webViewLink: data.webViewLink || `https://docs.google.com/document/d/${fid}/edit`,
    syncedAt: new Date().toISOString(),
  };

  manifest.docs[normalizedKey] = entry;
  saveCloudViewerManifest(manifest);
  return entry;
}

/**
 * Exports a Google Slides or Google Docs file as PDF bytes via Google Drive API.
 */
export async function exportGoogleFilePdfBytes(fileId: string): Promise<Buffer> {
  const token = await getServerDriveAccessToken();
  if (!token) {
    throw new Error('No Google Drive OAuth token available on server to export PDF.');
  }
  const res = await fetch(
    `https://www.googleapis.com/drive/v3/files/${encodeURIComponent(fileId)}/export?mimeType=application/pdf`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'x-goog-user-project': QUOTA_PROJECT,
      },
      signal: AbortSignal.timeout(60000),
    }
  );
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Google Drive PDF export failed (${res.status}): ${errText}`);
  }
  const arr = await res.arrayBuffer();
  return Buffer.from(arr);
}
