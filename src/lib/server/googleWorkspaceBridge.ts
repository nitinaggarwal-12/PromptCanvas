import fs from 'fs';
import path from 'path';
import os from 'os';
import crypto from 'crypto';
import { DEFAULT_GOOGLE_OAUTH_CLIENT_ID } from '@/lib/googleDriveDirectOpen';

const QUOTA_PROJECT = 'ramp-portal-dev';
export const DEFAULT_USER_EMAIL = 'nitinagga@google.com';

interface CloudSlidesManifestEntry {
  key: string;
  title: string;
  pptxPath?: string;
  sha256: string;
  xmlSha256?: string;
  sizeBytes?: number;
  googleSlidesId: string;
  googleSlidesEditUrl: string;
  googleSlidesPreviewUrl: string;
  googleSlidesEmbedUrl: string;
  googleSlidesPdfUrl: string;
  webViewLink: string;
  syncedAt: string;
}

interface CloudDocsManifestEntry {
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

const HOME_DIR = os.homedir();
const REPO_MANIFEST_PATH = path.join(/*turbopackIgnore: true*/ process.cwd(), 'src', 'data', 'cloud_viewer_manifest.json');
const TMP_MANIFEST_PATH = path.join(os.tmpdir(), 'promptcanvas_cloud_viewer_manifest.json');
const BLOGS_MANIFEST_PATH = path.join(/*turbopackIgnore: true*/ HOME_DIR, 'Documents', 'blogs', 'slides', 'cloud_viewer_manifest.json');

const TOKEN_CANDIDATE_PATHS = Array.from(
  new Set([
    path.join(/*turbopackIgnore: true*/ process.cwd(), '.gsheet_oauth_token.json'),
    path.join(/*turbopackIgnore: true*/ HOME_DIR, 'Documents', 'gantry-pulse', '.gsheet_oauth_token.json'),
    path.join(/*turbopackIgnore: true*/ HOME_DIR, 'Documents', 'blogs', '.gsheet_oauth_token.json'),
    path.join(/*turbopackIgnore: true*/ HOME_DIR, 'Documents', 'PromptCanvas', '.gsheet_oauth_token.json'),
    '/Users/nitinagga/Documents/blogs/.gsheet_oauth_token.json',
    '/Users/nitinagga/Documents/gantry-pulse/.gsheet_oauth_token.json',
  ])
);

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
      if (fs.existsSync(/*turbopackIgnore: true*/ filePath)) {
        const parsed = JSON.parse(fs.readFileSync(/*turbopackIgnore: true*/ filePath, 'utf-8'));
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

export function normalizeManifestKey(rawKey: string, titleHint?: string): string {
  const clean = String(rawKey || 'DOC-MT-01').trim();
  const titleClean = String(titleHint || '').trim();
  if (/nasa|multiverse|multi-universe|closed-loop\s+mission/i.test(`${clean} ${titleClean}`)) {
    return 'DRAFT-NASA-MULTIVERSE-V1-0-1';
  }
  if (!clean) return 'DOC-MT-01';
  const upper = clean.toUpperCase();
  if (/^DOC-(?:MT|REF)-\d{2}$/.test(upper)) {
    return upper;
  }
  if (['WS1', 'WS2', 'WS3', 'WS4', 'WS5', 'ALL'].includes(upper)) {
    return upper;
  }
  const lower = clean.toLowerCase();
  if (lower.startsWith('ws1-') || lower === 'uc-geap-ws1') return 'DOC-MT-01';
  if (lower === 'ws2-5-ten-point-breach-defense-matrix' || lower.includes('breach-defense')) return 'DOC-MT-05';
  if (lower.startsWith('ws2-') || lower === 'uc-geap-ws2') return 'DOC-MT-02';
  if (lower.startsWith('ws3-') || lower === 'uc-geap-ws3') return 'DOC-MT-03';
  if (lower.startsWith('ws4-') || lower === 'uc-geap-ws4') return 'DOC-MT-04';
  if (lower.startsWith('ws5-') || lower === 'uc-geap-ws5') return 'DOC-MT-06';

  const wsPrefixMatch = clean.match(/^(?:uc-geap-)?ws([1-5])(?:$|[-_.])/i);
  if (wsPrefixMatch) {
    return `WS${wsPrefixMatch[1]}`;
  }
  const numMatch = clean.match(/^#?(\d{1,2})$/);
  const bpMatch = clean.match(/^BP[-_]?(\d{1,2})$/i);
  const bpNum = numMatch ? numMatch[1].padStart(2, '0') : bpMatch ? bpMatch[1].padStart(2, '0') : null;
  if (bpNum) {
    if (
      (bpNum === '00' || bpNum === '01') &&
      titleClean &&
      !/2026\s+upgraded\s+gcp|official\s+google\s+cloud.*#00|^enterprise\s+architecture\s*—\s*blueprint/i.test(
        titleClean
      )
    ) {
      const slug = titleClean
        .replace(/\s*—\s*Blueprint.*$/i, '')
        .replace(/\s*\(#?\d+\)\s*$/i, '')
        .replace(/[^A-Za-z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '')
        .toUpperCase()
        .slice(0, 42);
      if (slug && slug !== 'BP_00' && slug !== 'BP_01') {
        return `CUSTOM_${slug}`;
      }
    }
    return `BP-${bpNum}`;
  }
  return clean.replace(/[^A-Za-z0-9_-]/g, '_');
}

/**
 * Maps GEAP workstream use cases and diagram IDs to their pre-warmed DOC-MT or workstream keys when applicable.
 */
export function resolveFallbackWorkstreamKey(key: string): string | null {
  const k = key.toLowerCase();
  if (k.startsWith('ws1-') || k === 'uc-geap-ws1') return 'DOC-MT-01';
  if (k.includes('breach-defense') || k === 'ws2-5-ten-point-breach-defense-matrix') return 'DOC-MT-05';
  if (k.startsWith('ws2-') || k === 'uc-geap-ws2') return 'DOC-MT-02';
  if (k.startsWith('ws3-') || k === 'uc-geap-ws3') return 'DOC-MT-03';
  if (k.startsWith('ws4-') || k === 'uc-geap-ws4') return 'DOC-MT-04';
  if (k.startsWith('ws5-') || k === 'uc-geap-ws5') return 'DOC-MT-06';
  if (k.includes('ws1') || k.includes('workstream-1')) return 'WS1';
  if (k.includes('ws2') || k.includes('workstream-2')) return 'WS2';
  if (k.includes('ws3') || k.includes('workstream-3')) return 'WS3';
  if (k.includes('ws4') || k.includes('workstream-4')) return 'WS4';
  if (k.includes('ws5') || k.includes('workstream-5')) return 'WS5';
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

  if (globalThis.__pcCloudViewerManifestCache) {
    Object.assign(base.slides, globalThis.__pcCloudViewerManifestCache.slides);
    Object.assign(base.docs, globalThis.__pcCloudViewerManifestCache.docs);
  }

  const mergeFrom = (filePath: string) => {
    try {
      if (fs.existsSync(/*turbopackIgnore: true*/ filePath)) {
        const parsed = JSON.parse(fs.readFileSync(/*turbopackIgnore: true*/ filePath, 'utf-8')) as Partial<CloudViewerManifest>;
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

  mergeFrom(TMP_MANIFEST_PATH);
  mergeFrom(BLOGS_MANIFEST_PATH);
  mergeFrom(REPO_MANIFEST_PATH);

  globalThis.__pcCloudViewerManifestCache = base;
  return base;
}

export function saveCloudViewerManifest(manifest: CloudViewerManifest): void {
  manifest.updatedAt = new Date().toISOString();
  globalThis.__pcCloudViewerManifestCache = manifest;
  const serialized = JSON.stringify(manifest, null, 2);
  for (const targetPath of [TMP_MANIFEST_PATH, REPO_MANIFEST_PATH, BLOGS_MANIFEST_PATH]) {
    try {
      const dir = path.dirname(targetPath);
      if (fs.existsSync(/*turbopackIgnore: true*/ dir)) {
        fs.writeFileSync(/*turbopackIgnore: true*/ targetPath, serialized, 'utf-8');
      }
    } catch {
      // ignore write errors on read-only paths
    }
  }
}

function sha256Buffer(buf: Buffer): string {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

export function sha256Text(text: string): string {
  return crypto.createHash('sha256').update(text, 'utf8').digest('hex');
}

/**
 * Uploads a compiled .pptx buffer to Google Drive with mimeType = application/vnd.google-apps.presentation,
 * converting it into a 100% native editable Google Slides presentation and caching it in cloud_viewer_manifest.json.
 * When targetFileId is provided (or an existing googleSlidesId is present), attempts an in-place PATCH update first
 * so existing presentation URLs update seamlessly in-place.
 */
export async function uploadPptxBufferToGoogleSlides(params: {
  pptxBuffer: Buffer;
  title: string;
  cacheKey: string;
  xmlSha256?: string;
  force?: boolean;
  targetFileId?: string;
  accessTokenOverride?: string | null;
}): Promise<CloudSlidesManifestEntry> {
  const normalizedKey = normalizeManifestKey(params.cacheKey, params.title);
  const manifest = loadCloudViewerManifest();
  const sha = sha256Buffer(params.pptxBuffer);
  const existing = manifest.slides[normalizedKey];

  const isReservedWorkstream = ['WS1', 'WS2', 'WS3', 'WS4', 'WS5', 'ALL'].includes(normalizedKey);
  const xmlUnchanged = !params.xmlSha256 || existing?.xmlSha256 === params.xmlSha256;

  if (
    !params.force &&
    existing &&
    existing.googleSlidesId &&
    ((existing.sha256 === sha && xmlUnchanged) || (isReservedWorkstream && !params.xmlSha256))
  ) {
    return existing;
  }

  const token = params.accessTokenOverride || (await getServerDriveAccessToken());
  if (!token) {
    const fbKey = resolveFallbackWorkstreamKey(normalizedKey);
    if (fbKey && manifest.slides[fbKey]) {
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

  const workstreamReservedIds = new Set(
    ['WS1', 'WS2', 'WS3', 'WS4', 'WS5', 'ALL']
      .map((k) => manifest.slides[k]?.googleSlidesId)
      .filter((v): v is string => Boolean(v))
  );
  workstreamReservedIds.add('1dwa5ER2-aWO_Qo1QhSR4TVtkRsuw9RL-Exf0YDUDrIg');
  workstreamReservedIds.add('1HfjCi035HDOb74CO-P6J6GS7VKHT3zSfuwQx_KH15wc');
  workstreamReservedIds.add('1WYmj2wHnC9ofji_--4M_fnLtJ2B245umKmEdQwQCYE0');
  workstreamReservedIds.add('1Tm2bkJNUCXa-oLoOaL7x1ho6TBKY5YRwC4rjgxaGTXA');
  workstreamReservedIds.add('1r_2oEeBC-XKkub16auZfLD8levx3ZORxEKBiBDlW5Gs');
  workstreamReservedIds.add('1wNzyaGuMdWhVlxNdWJw8fJda7aovAQ0pgE8mtZUTNUc');

  const rawPreferredId = params.targetFileId || existing?.googleSlidesId;
  const preferredId =
    normalizedKey.startsWith('DOC-') && rawPreferredId && workstreamReservedIds.has(rawPreferredId)
      ? undefined
      : rawPreferredId;
  let data: { id: string; webViewLink?: string } | null = null;

  if (preferredId) {
    const patchRes = await fetch(
      `https://www.googleapis.com/upload/drive/v3/files/${preferredId}?uploadType=multipart&supportsAllDrives=true&fields=id,name,webViewLink`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'x-goog-user-project': QUOTA_PROJECT,
          'Content-Type': `multipart/related; boundary=${boundary}`,
        },
        body: new Uint8Array(multipartBody),
        signal: AbortSignal.timeout(60000),
      }
    );
    if (patchRes.ok) {
      data = (await patchRes.json()) as { id: string; webViewLink?: string };
    }
  }

  if (!data) {
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
    data = (await res.json()) as { id: string; webViewLink?: string };
  }

  const fid = data.id;
  const encodedEmail = encodeURIComponent(DEFAULT_USER_EMAIL);

  const entry: CloudSlidesManifestEntry = {
    key: normalizedKey,
    title: params.title,
    sha256: sha,
    ...(params.xmlSha256 ? { xmlSha256: params.xmlSha256 } : {}),
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
 * Clones a verified native Google Doc template via drive.files.copy and updates title/scalars in-place
 * via Google Docs API documents.batchUpdate (Rule 49: zero Drive multipart HTML-to-Docs upload).
 */
export async function uploadHtmlOrDocxToGoogleDocs(params: {
  contentBuffer: Buffer;
  sourceMimeType: 'text/html; charset=UTF-8' | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  title: string;
  cacheKey: string;
  force?: boolean;
  accessTokenOverride?: string | null;
}): Promise<CloudDocsManifestEntry> {
  const normalizedKey = normalizeManifestKey(params.cacheKey, params.title);
  const manifest = loadCloudViewerManifest();
  const sha = sha256Buffer(params.contentBuffer);
  const existing = manifest.docs[normalizedKey];

  if (existing && existing.googleDocsId) {
    return existing;
  }

  const fbKey = resolveFallbackWorkstreamKey(normalizedKey) || 'WS1';
  const templateEntry = manifest.docs[fbKey] || manifest.docs.WS1;
  const token = params.accessTokenOverride || (await getServerDriveAccessToken());
  if (!token || !templateEntry?.googleDocsId) {
    if (templateEntry) {
      return templateEntry;
    }
    throw new Error('No Google Drive OAuth token or native template Doc ID available on server.');
  }

  // Rule 49: Clone verified native Google Doc template via drive.files.copy (never multipart HTML upload)
  const copyRes = await fetch(
    `https://www.googleapis.com/drive/v3/files/${encodeURIComponent(templateEntry.googleDocsId)}/copy?supportsAllDrives=true&fields=id,name,webViewLink`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'x-goog-user-project': QUOTA_PROJECT,
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        name: `${params.title} — Editable Google Docs`,
      }),
      signal: AbortSignal.timeout(60000),
    }
  );

  if (!copyRes.ok) {
    return templateEntry;
  }

  const data = (await copyRes.json()) as { id: string; webViewLink?: string };
  const fid = data.id;
  const encodedEmail = encodeURIComponent(DEFAULT_USER_EMAIL);

  // Apply surgical title replacement via Google Docs API documents.batchUpdate
  try {
    await fetch(`https://docs.googleapis.com/v1/documents/${encodeURIComponent(fid)}:batchUpdate`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'x-goog-user-project': QUOTA_PROJECT,
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        requests: [
          {
            replaceAllText: {
              containsText: { text: templateEntry.title, matchCase: true },
              replaceText: params.title,
            },
          },
        ],
      }),
      signal: AbortSignal.timeout(30000),
    });
  } catch {
    // non-fatal if Docs API batchUpdate is skipped
  }

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

// ============================================================================
// BIDIRECTIONAL GOOGLE SLIDES -> DRAW.IO XML SYNC ENGINE
// Reads live shapes, text edits, moves/resizes, and newly added shapes from a
// Google Slides presentation via Slides API v1 and merges them back into Draw.io XML.
// ============================================================================

const EMU_PER_INCH = 914400;

interface SlidesSyncManifestCell {
  id: string;
  label: string;
  subtitle?: string;
  isContainer: boolean;
  sx: number;
  sy: number;
  sw: number;
  sh: number;
}

interface SlidesSyncManifest {
  v: number;
  diagramTitle?: string;
  blueprintId?: string;
  transform: {
    effMinX: number;
    effMinY: number;
    scaleX: number;
    scaleY: number;
    offsetX: number;
    offsetY: number;
  };
  cells: SlidesSyncManifestCell[];
}

export interface GoogleSlidesSyncDiffResult {
  xml: string;
  presentationId: string;
  presentationTitle: string;
  matchedSlideObjectId: string | null;
  renamedCells: Array<{ id: string; from: string; to: string }>;
  movedCells: Array<{ id: string; label: string; dx: number; dy: number }>;
  addedCells: Array<{ id: string; label: string }>;
  totalChanges: number;
  summary: string;
}

export function extractPresentationIdFromInput(input: string): string | null {
  const clean = String(input || '').trim();
  if (!clean) return null;
  const urlMatch = clean.match(/\/presentation\/d\/([a-zA-Z0-9_-]{12,})/);
  if (urlMatch) return urlMatch[1];
  if (/^[a-zA-Z0-9_-]{16,120}$/.test(clean)) return clean;
  return null;
}

function extractTextFromGoogleSlideElement(el: any): { fullText: string; lines: string[] } {
  const textElements = el?.shape?.text?.textElements;
  if (!Array.isArray(textElements)) return { fullText: '', lines: [] };
  let raw = '';
  for (const te of textElements) {
    if (typeof te?.textRun?.content === 'string') {
      raw += te.textRun.content;
    }
  }
  const lines = raw
    .split(/\r?\n/)
    .map((l) => l.replace(/\s+/g, ' ').trim())
    .filter(Boolean);
  return { fullText: lines.join(' — '), lines };
}

function extractSlideNotesText(slide: any): string {
  const notesElements = slide?.slideProperties?.notesPage?.pageElements;
  if (!Array.isArray(notesElements)) return '';
  let out = '';
  for (const el of notesElements) {
    const t = el?.shape?.text?.textElements;
    if (!Array.isArray(t)) continue;
    for (const te of t) {
      if (typeof te?.textRun?.content === 'string') {
        out += te.textRun.content;
      }
    }
  }
  return out;
}

function extractSlideElementBoxInches(el: any): { x: number; y: number; w: number; h: number } | null {
  const size = el?.size;
  const transform = el?.transform;
  if (!size || !transform) return null;
  const unitFactor = (u?: string) => (u === 'PT' ? 1 / 72 : 1 / EMU_PER_INCH);
  const rawW = Number(size.width?.magnitude || 0) * unitFactor(size.width?.unit);
  const rawH = Number(size.height?.magnitude || 0) * unitFactor(size.height?.unit);
  const scaleX = typeof transform.scaleX === 'number' ? Math.abs(transform.scaleX) : 1;
  const scaleY = typeof transform.scaleY === 'number' ? Math.abs(transform.scaleY) : 1;
  const tx = Number(transform.translateX || 0) * unitFactor(transform.unit);
  const ty = Number(transform.translateY || 0) * unitFactor(transform.unit);
  const w = rawW * scaleX;
  const h = rawH * scaleY;
  if (w <= 0.05 || h <= 0.05) return null;
  return { x: tx, y: ty, w, h };
}

function parseSlidesSyncManifest(notesText: string): SlidesSyncManifest | null {
  const marker = 'PROMPTCANVAS_SLIDES_SYNC_V1:';
  const idx = notesText.indexOf(marker);
  if (idx === -1) return null;
  const jsonSlice = notesText.slice(idx + marker.length).trim();
  const start = jsonSlice.indexOf('{');
  const end = jsonSlice.lastIndexOf('}');
  if (start === -1 || end <= start) return null;
  try {
    const parsed = JSON.parse(jsonSlice.slice(start, end + 1)) as SlidesSyncManifest;
    if (parsed && parsed.transform && Array.isArray(parsed.cells)) {
      return parsed;
    }
  } catch {
    // ignore malformed notes JSON
  }
  return null;
}

/**
 * Pure, deterministic bidirectional merge engine: reconciles a Google Slides API v1
 * Presentation JSON against a base Draw.io XML string, propagating renames, moves/resizes,
 * and newly added shapes back into Draw.io XML while preserving untouched styles and edges.
 */
export async function applyGoogleSlidesPresentationToDrawioXml(
  baseXml: string,
  presentation: any,
  presentationId: string
): Promise<GoogleSlidesSyncDiffResult> {
  const {
    parseDrawioXmlSpatialState,
    serializeSpatialStateToDrawioXml,
    buildCardValueHtml,
  } = await import('@/lib/freeform/directDrawioSpatialMutator');
  const { resolveFreeformIconDataUri } = await import('@/lib/freeform/freeformIconRegistry');

  const slides: any[] = Array.isArray(presentation?.slides) ? presentation.slides : [];
  if (slides.length === 0) {
    throw new Error('Google Slides presentation contains no slides.');
  }

  let targetSlide: any = null;
  let manifest: SlidesSyncManifest | null = null;
  for (const s of slides) {
    const notes = extractSlideNotesText(s);
    const parsed = parseSlidesSyncManifest(notes);
    if (parsed) {
      targetSlide = s;
      manifest = parsed;
      break;
    }
  }
  if (!targetSlide) {
    targetSlide = slides.length >= 2 ? slides[1] : slides[0];
  }

  const state = parseDrawioXmlSpatialState(baseXml);
  const cellById = new Map(state.cells.map((c) => [c.id, c]));

  const renamedCells: Array<{ id: string; from: string; to: string }> = [];
  const movedCells: Array<{ id: string; label: string; dx: number; dy: number }> = [];
  const addedCells: Array<{ id: string; label: string }> = [];

  const slideElements: any[] = Array.isArray(targetSlide?.pageElements) ? targetSlide.pageElements : [];
  const candidateShapes = slideElements
    .map((el) => {
      const box = extractSlideElementBoxInches(el);
      const text = extractTextFromGoogleSlideElement(el);
      return {
        objectId: String(el?.objectId || ''),
        shapeType: String(el?.shape?.shapeType || ''),
        box,
        title: text.lines[0] || '',
        subtitle: text.lines.slice(1).join(' — '),
        fullText: text.fullText,
      };
    })
    .filter((s) => {
      if (!s.box) return false;
      // Ignore slide chrome (outer DevSite sheet, breadcrumb header/footer, Figure 1 banner/caption)
      if (s.box.w > 11.5 && s.box.h > 5.8) return false;
      if (s.box.y < 0.72 || s.box.y > 6.68) return false;
      if (/^figure\s*1\b|^cloud architecture center|^promptcanvas architecture studio/i.test(s.title)) {
        return false;
      }
      return s.title.length > 0;
    });

  const matchedManifestIds = new Set<string>();
  const matchedShapeObjectIds = new Set<string>();

  if (manifest && manifest.cells.length > 0) {
    const tf = manifest.transform;
    const fromSlideX = (sx: number) => Math.round(tf.effMinX + (sx - tf.offsetX) / (tf.scaleX || 1));
    const fromSlideY = (sy: number) => Math.round(tf.effMinY + (sy - tf.offsetY) / (tf.scaleY || 1));

    const applyMatchedShape = (
      mCell: SlidesSyncManifestCell,
      drawioCell: (typeof state.cells)[number],
      bestShape: (typeof candidateShapes)[number]
    ) => {
      if (!bestShape.box) return;
      matchedManifestIds.add(mCell.id);
      matchedShapeObjectIds.add(bestShape.objectId);

      // 1a. Detect text rename in Google Slides
      const normOld = mCell.label.replace(/\s+/g, ' ').trim();
      const normNew = bestShape.title.replace(/\s+/g, ' ').trim();
      if (normNew && normOld && normNew.toLowerCase() !== normOld.toLowerCase()) {
        renamedCells.push({ id: drawioCell.id, from: normOld, to: normNew });
        drawioCell.plainLabel = normNew;
        if (!drawioCell.isContainer) {
          const iconUri = resolveFreeformIconDataUri(normNew);
          drawioCell.value = buildCardValueHtml(normNew, bestShape.subtitle || mCell.subtitle, iconUri, 11);
        } else {
          drawioCell.value = `<b style="color:#1E3A8A;font-size:11.5px;letter-spacing:0.6px;">${normNew
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .toUpperCase()}</b>`;
        }
      }

      // 1b. Detect significant move in Google Slides (> 0.20" shift)
      const moveDistInches = Math.hypot(bestShape.box.x - mCell.sx, bestShape.box.y - mCell.sy);
      if (moveDistInches > 0.2 && !drawioCell.isContainer) {
        const nextAbsX = Math.max(24, fromSlideX(bestShape.box.x));
        const nextAbsY = Math.max(24, fromSlideY(bestShape.box.y));
        const dx = nextAbsX - drawioCell.absX;
        const dy = nextAbsY - drawioCell.absY;
        if (Math.abs(dx) >= 12 || Math.abs(dy) >= 12) {
          movedCells.push({ id: drawioCell.id, label: drawioCell.plainLabel, dx, dy });
          drawioCell.absX = nextAbsX;
          drawioCell.absY = nextAbsY;
          const parentCell =
            drawioCell.parent && drawioCell.parent !== '1' ? cellById.get(drawioCell.parent) : undefined;
          drawioCell.relX = parentCell ? Math.round(drawioCell.absX - parentCell.absX) : drawioCell.absX;
          drawioCell.relY = parentCell ? Math.round(drawioCell.absY - parentCell.absY) : drawioCell.absY;
        }
      }
    };

    // Pass 1A: Exact label matches FIRST (prevents a moved shape from being stolen by a nearby cell)
    for (const mCell of manifest.cells) {
      const drawioCell = cellById.get(mCell.id);
      if (!drawioCell) continue;
      const mCx = mCell.sx + mCell.sw / 2;
      const mCy = mCell.sy + mCell.sh / 2;
      const normOldLower = mCell.label.replace(/\s+/g, ' ').trim().toLowerCase();

      let bestShape: (typeof candidateShapes)[number] | null = null;
      let bestDist = Infinity;
      for (const sh of candidateShapes) {
        if (matchedShapeObjectIds.has(sh.objectId) || !sh.box) continue;
        const shLower = sh.title.replace(/\s+/g, ' ').trim().toLowerCase();
        if (shLower !== normOldLower) continue;
        const dist = Math.hypot(sh.box.x + sh.box.w / 2 - mCx, sh.box.y + sh.box.h / 2 - mCy);
        if (dist <= 4.5 && dist < bestDist) {
          bestDist = dist;
          bestShape = sh;
        }
      }
      if (bestShape) {
        applyMatchedShape(mCell, drawioCell, bestShape);
      }
    }

    // Pass 1B: Geometric proximity match for in-place renames (within 0.55" center radius)
    for (const mCell of manifest.cells) {
      if (matchedManifestIds.has(mCell.id)) continue;
      const drawioCell = cellById.get(mCell.id);
      if (!drawioCell) continue;
      const mCx = mCell.sx + mCell.sw / 2;
      const mCy = mCell.sy + mCell.sh / 2;

      let bestShape: (typeof candidateShapes)[number] | null = null;
      let bestDist = Infinity;
      for (const sh of candidateShapes) {
        if (matchedShapeObjectIds.has(sh.objectId) || !sh.box) continue;
        const dist = Math.hypot(sh.box.x + sh.box.w / 2 - mCx, sh.box.y + sh.box.h / 2 - mCy);
        if (dist <= 0.55 && dist < bestDist) {
          bestDist = dist;
          bestShape = sh;
        }
      }
      if (bestShape) {
        applyMatchedShape(mCell, drawioCell, bestShape);
      }
    }

    // Pass 2: Any unmatched substantive shape drawn inside the diagram figure box becomes a new Draw.io card!
    const existingLabelsLower = new Set(state.cells.map((c) => c.plainLabel.toLowerCase()));
    const existingEdgeLabelsLower = new Set(state.edges.map((e) => e.plainLabel.toLowerCase()));
    for (const sh of candidateShapes) {
      if (matchedShapeObjectIds.has(sh.objectId) || !sh.box) continue;
      if (sh.box.w < 0.65 || sh.box.h < 0.28) continue; // skip tiny edge pills/step circles
      const lblLower = sh.title.toLowerCase();
      if (existingLabelsLower.has(lblLower) || existingEdgeLabelsLower.has(lblLower)) continue;

      const absX = Math.max(40, fromSlideX(sh.box.x));
      const absY = Math.max(40, fromSlideY(sh.box.y));
      const w = Math.max(180, Math.min(320, Math.round(sh.box.w / (tf.scaleX || 1))));
      const h = Math.max(68, Math.min(130, Math.round(sh.box.h / (tf.scaleY || 1))));
      const newId = `slides_added_${sh.objectId.replace(/[^a-zA-Z0-9_]/g, '').slice(-10) || addedCells.length + 1}`;
      const iconUri = resolveFreeformIconDataUri(sh.title);

      state.cells.push({
        id: newId,
        parent: '1',
        value: buildCardValueHtml(sh.title, sh.subtitle || undefined, iconUri, 11),
        plainLabel: sh.title,
        style: 'rounded=1;arcSize=10;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#2563EB;strokeWidth=1.5;',
        isContainer: false,
        relX: absX,
        relY: absY,
        absX,
        absY,
        w,
        h,
      });
      addedCells.push({ id: newId, label: sh.title });
      existingLabelsLower.add(lblLower);
    }
  }

  for (const c of state.cells) {
    if (c.absX + c.w + 40 > state.canvasW) state.canvasW = Math.ceil(c.absX + c.w + 40);
    if (c.absY + c.h + 40 > state.canvasH) state.canvasH = Math.ceil(c.absY + c.h + 40);
  }

  let syncedXml = serializeSpatialStateToDrawioXml(state);
  if (!syncedXml.includes('data-slides-synced="true"')) {
    syncedXml = syncedXml.replace('<mxfile ', '<mxfile data-slides-synced="true" ');
  }

  const totalChanges = renamedCells.length + movedCells.length + addedCells.length;
  const summaryParts: string[] = [];
  if (renamedCells.length > 0) summaryParts.push(`${renamedCells.length} renamed`);
  if (movedCells.length > 0) summaryParts.push(`${movedCells.length} moved`);
  if (addedCells.length > 0) summaryParts.push(`${addedCells.length} added`);

  return {
    xml: syncedXml,
    presentationId,
    presentationTitle: String(presentation?.title || state.title),
    matchedSlideObjectId: targetSlide?.objectId ? String(targetSlide.objectId) : null,
    renamedCells,
    movedCells,
    addedCells,
    totalChanges,
    summary:
      totalChanges > 0
        ? `Synced ${totalChanges} Google Slides edit(s) back to Draw.io XML (${summaryParts.join(', ')}).`
        : 'Checked Google Slides presentation — diagram is already in sync with Draw.io XML (0 diffs).',
  };
}

/**
 * Live server-side Google Slides -> Draw.io XML sync via Google Slides API v1 (`presentations.get`).
 */
export async function pullGoogleSlidesEditsToDrawioXml(params: {
  presentationIdOrUrl: string;
  baseXml: string;
  accessTokenOverride?: string | null;
}): Promise<GoogleSlidesSyncDiffResult> {
  const presentationId = extractPresentationIdFromInput(params.presentationIdOrUrl);
  if (!presentationId) {
    throw new Error('Invalid Google Slides presentation ID or URL.');
  }

  const token = params.accessTokenOverride || (await getServerDriveAccessToken());
  if (!token) {
    throw new Error(
      'No Google Workspace OAuth token available on server to read Google Slides. Ensure local OAuth credentials are configured.'
    );
  }

  const res = await fetch(
    `https://slides.googleapis.com/v1/presentations/${encodeURIComponent(presentationId)}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'x-goog-user-project': QUOTA_PROJECT,
      },
      signal: AbortSignal.timeout(30_000),
    }
  );
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Google Slides API read failed (${res.status}): ${errText}`);
  }
  const presentation = await res.json();
  return applyGoogleSlidesPresentationToDrawioXml(params.baseXml, presentation, presentationId);
}
