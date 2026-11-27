import { createHash } from 'crypto';

/**
 * Zero-Dependency GCS Persistence Mirror for PromptCanvas Diagrams & Sessions.
 *
 * Ensures every generated diagram's unique UUID (`?id=<uuid>`) AND every user/guest
 * session (`promptcanvas_session`, stored hashed via SHA-256) survives Cloud Run
 * cold starts, horizontal autoscaling, and revision rollouts even when `DATABASE_URL`
 * (Postgres) is not attached and local SQLite is ephemeral.
 */

export interface GcsDiagramBundle {
  diagram: {
    id: string;
    name: string;
    user_id?: string | null;
    architecture_type?: string | null;
    is_private?: number | boolean | null;
    created_studio?: string | null;
    created_at?: string | Date | null;
    updated_at?: string | Date | null;
  };
  versions: Array<{
    id: string;
    diagram_id: string;
    version_number: number;
    xml_content: string;
    comment?: string | null;
    created_by?: string | null;
    prompt?: string | null;
    ai_reasoning?: string | null;
    business_usecase?: string | null;
    technical_usecase?: string | null;
    architecture_type?: string | null;
    graph_json?: string | null;
    created_at?: string | Date | null;
  }>;
}

export interface GcsSessionBundle {
  session: {
    user_id: string;
    expires_at: string;
    created_at: string;
  };
  user: {
    id: string;
    email: string;
    name: string | null;
    global_role?: 'Super-Admin' | 'Author' | 'Member';
    is_super_admin?: boolean;
    created_at: string;
  };
}

const DEFAULT_PROD_GCS_BUCKET = 'ramp-portal-dev-promptcanvas-state';

let cachedToken: { token: string; expiresAt: number } | null = null;

export function getGcsStateBucket(): string | null {
  if (process.env.VITEST || process.env.NODE_ENV === 'test') {
    return null;
  }
  const explicit = (process.env.PROMPTCANVAS_GCS_BUCKET || '').trim();
  if (explicit) return explicit;
  if (
    process.env.NODE_ENV === 'production' &&
    !process.env.DATABASE_URL &&
    (process.env.K_SERVICE || process.env.GOOGLE_CLOUD_PROJECT === 'ramp-portal-dev')
  ) {
    return DEFAULT_PROD_GCS_BUCKET;
  }
  return null;
}

function sanitizeDiagramObjectId(diagramId: string): string | null {
  const cleaned = String(diagramId || '').trim();
  if (!cleaned || !/^[a-zA-Z0-9._-]{4,128}$/.test(cleaned)) {
    return null;
  }
  return cleaned;
}

function hashSessionTokenForObjectKey(sessionId: string): string | null {
  const cleaned = String(sessionId || '').trim();
  if (!cleaned || cleaned.length < 8 || cleaned.length > 256) return null;
  return createHash('sha256').update(cleaned).digest('hex');
}

async function getMetadataAccessToken(): Promise<string | null> {
  const now = Date.now();
  if (cachedToken && cachedToken.expiresAt > now + 30_000) {
    return cachedToken.token;
  }
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 2500);
    const res = await fetch(
      'http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token',
      {
        headers: { 'Metadata-Flavor': 'Google' },
        signal: controller.signal,
      }
    );
    clearTimeout(timer);
    if (!res.ok) return null;
    const data = (await res.json()) as { access_token?: string; expires_in?: number };
    if (!data?.access_token) return null;
    cachedToken = {
      token: data.access_token,
      expiresAt: now + Math.max(60, Number(data.expires_in || 300)) * 1000,
    };
    return cachedToken.token;
  } catch {
    return null;
  }
}

export async function saveDiagramBundleToGcs(bundle: GcsDiagramBundle): Promise<boolean> {
  const bucket = getGcsStateBucket();
  if (!bucket) return false;
  const safeId = sanitizeDiagramObjectId(bundle?.diagram?.id);
  if (!safeId) return false;

  const token = await getMetadataAccessToken();
  if (!token) return false;

  const objectName = `diagrams/${safeId}.json`;
  const url = `https://storage.googleapis.com/upload/storage/v1/b/${encodeURIComponent(bucket)}/o?uploadType=media&name=${encodeURIComponent(objectName)}`;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bundle),
      signal: controller.signal,
    });
    clearTimeout(timer);
    return res.ok;
  } catch (err) {
    console.warn(`[GCS Diagram Store] Failed saving ${safeId}:`, err);
    return false;
  }
}

export async function loadDiagramBundleFromGcs(diagramId: string): Promise<GcsDiagramBundle | null> {
  const bucket = getGcsStateBucket();
  if (!bucket) return null;
  const safeId = sanitizeDiagramObjectId(diagramId);
  if (!safeId) return null;

  const token = await getMetadataAccessToken();
  if (!token) return null;

  const objectName = `diagrams/${safeId}.json`;
  const url = `https://storage.googleapis.com/storage/v1/b/${encodeURIComponent(bucket)}/o/${encodeURIComponent(objectName)}?alt=media`;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) return null;
    const parsed = (await res.json()) as GcsDiagramBundle;
    if (!parsed?.diagram?.id) return null;
    return parsed;
  } catch {
    return null;
  }
}

export async function deleteDiagramBundleFromGcs(diagramId: string): Promise<void> {
  const bucket = getGcsStateBucket();
  if (!bucket) return;
  const safeId = sanitizeDiagramObjectId(diagramId);
  if (!safeId) return;

  const token = await getMetadataAccessToken();
  if (!token) return;

  const objectName = `diagrams/${safeId}.json`;
  const url = `https://storage.googleapis.com/storage/v1/b/${encodeURIComponent(bucket)}/o/${encodeURIComponent(objectName)}`;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4000);
    await fetch(url, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
      signal: controller.signal,
    });
    clearTimeout(timer);
  } catch {
    // Best-effort delete
  }
}

export async function saveSessionBundleToGcs(sessionId: string, bundle: GcsSessionBundle): Promise<boolean> {
  const bucket = getGcsStateBucket();
  if (!bucket) return false;
  const tokenHash = hashSessionTokenForObjectKey(sessionId);
  if (!tokenHash) return false;

  const token = await getMetadataAccessToken();
  if (!token) return false;

  const objectName = `sessions/${tokenHash}.json`;
  const url = `https://storage.googleapis.com/upload/storage/v1/b/${encodeURIComponent(bucket)}/o?uploadType=media&name=${encodeURIComponent(objectName)}`;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bundle),
      signal: controller.signal,
    });
    clearTimeout(timer);
    return res.ok;
  } catch {
    return false;
  }
}

export async function loadSessionBundleFromGcs(sessionId: string): Promise<GcsSessionBundle | null> {
  const bucket = getGcsStateBucket();
  if (!bucket) return null;
  const tokenHash = hashSessionTokenForObjectKey(sessionId);
  if (!tokenHash) return null;

  const token = await getMetadataAccessToken();
  if (!token) return null;

  const objectName = `sessions/${tokenHash}.json`;
  const url = `https://storage.googleapis.com/storage/v1/b/${encodeURIComponent(bucket)}/o/${encodeURIComponent(objectName)}?alt=media`;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4000);
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) return null;
    const parsed = (await res.json()) as GcsSessionBundle;
    if (!parsed?.user?.id || !parsed?.session?.expires_at) return null;
    if (new Date(parsed.session.expires_at).getTime() <= Date.now()) return null;
    return parsed;
  } catch {
    return null;
  }
}

export async function deleteSessionBundleFromGcs(sessionId: string): Promise<void> {
  const bucket = getGcsStateBucket();
  if (!bucket) return;
  const tokenHash = hashSessionTokenForObjectKey(sessionId);
  if (!tokenHash) return;

  const token = await getMetadataAccessToken();
  if (!token) return;

  const objectName = `sessions/${tokenHash}.json`;
  const url = `https://storage.googleapis.com/storage/v1/b/${encodeURIComponent(bucket)}/o/${encodeURIComponent(objectName)}`;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4000);
    await fetch(url, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
      signal: controller.signal,
    });
    clearTimeout(timer);
  } catch {
    // Best-effort delete
  }
}

/**
 * Lists all diagram IDs stored under `diagrams/*.json` in the GCS state bucket.
 * Bounded to maxResults=200 so cold-start library hydration stays sub-second.
 */
export async function listDiagramIdsFromGcs(maxResults = 200): Promise<string[]> {
  const bucket = getGcsStateBucket();
  if (!bucket) return [];
  const token = await getMetadataAccessToken();
  if (!token) return [];

  const url = `https://storage.googleapis.com/storage/v1/b/${encodeURIComponent(bucket)}/o?prefix=${encodeURIComponent('diagrams/')}&maxResults=${Math.min(500, Math.max(1, maxResults))}&fields=items(name)`;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) return [];
    const data = (await res.json()) as { items?: Array<{ name?: string }> };
    const ids: string[] = [];
    for (const item of data?.items || []) {
      const name = String(item?.name || '');
      const m = /^diagrams\/([a-zA-Z0-9._-]{4,128})\.json$/.exec(name);
      if (m) ids.push(m[1]);
    }
    return ids;
  } catch {
    return [];
  }
}

const inMemoryNamespaceStore: Record<string, Map<string, unknown>> = {
  'docgen-projects': new Map(),
  'saved-blogs': new Map(),
};

export async function saveNamespacedArtifactToGcs(
  namespace: 'docgen-projects' | 'saved-blogs',
  rawId: string,
  payload: unknown
): Promise<boolean> {
  const safeId = sanitizeDiagramObjectId(rawId);
  if (!safeId) return false;
  inMemoryNamespaceStore[namespace].set(safeId, payload);

  const bucket = getGcsStateBucket();
  if (!bucket) return true;
  const token = await getMetadataAccessToken();
  if (!token) return false;

  const objectName = `${namespace}/${safeId}.json`;
  const url = `https://storage.googleapis.com/upload/storage/v1/b/${encodeURIComponent(bucket)}/o?uploadType=media&name=${encodeURIComponent(objectName)}`;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    clearTimeout(timer);
    return res.ok;
  } catch {
    return false;
  }
}

export async function loadNamespacedArtifactFromGcs<T = any>(
  namespace: 'docgen-projects' | 'saved-blogs',
  rawId: string
): Promise<T | null> {
  const safeId = sanitizeDiagramObjectId(rawId);
  if (!safeId) return null;

  const bucket = getGcsStateBucket();
  if (bucket) {
    const token = await getMetadataAccessToken();
    if (token) {
      const objectName = `${namespace}/${safeId}.json`;
      const url = `https://storage.googleapis.com/storage/v1/b/${encodeURIComponent(bucket)}/o/${encodeURIComponent(objectName)}?alt=media`;
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 5000);
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        });
        clearTimeout(timer);
        if (res.ok) {
          const parsed = (await res.json()) as T;
          inMemoryNamespaceStore[namespace].set(safeId, parsed);
          return parsed;
        }
      } catch {}
    }
  }

  return (inMemoryNamespaceStore[namespace].get(safeId) as T) || null;
}

export async function listNamespacedArtifactsFromGcs<T = any>(
  namespace: 'docgen-projects' | 'saved-blogs',
  maxResults = 100
): Promise<T[]> {
  const bucket = getGcsStateBucket();
  if (!bucket) {
    return Array.from(inMemoryNamespaceStore[namespace].values()) as T[];
  }
  const token = await getMetadataAccessToken();
  if (!token) {
    return Array.from(inMemoryNamespaceStore[namespace].values()) as T[];
  }

  const url = `https://storage.googleapis.com/storage/v1/b/${encodeURIComponent(bucket)}/o?prefix=${encodeURIComponent(`${namespace}/`)}&maxResults=${Math.min(200, Math.max(1, maxResults))}&fields=items(name)`;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) return [];
    const data = (await res.json()) as { items?: Array<{ name?: string }> };
    const ids: string[] = [];
    const prefixRe = new RegExp(`^${namespace}/([a-zA-Z0-9._-]{4,128})\\.json$`);
    for (const item of data?.items || []) {
      const m = prefixRe.exec(String(item?.name || ''));
      if (m) ids.push(m[1]);
    }
    const loaded: T[] = [];
    for (let i = 0; i < ids.length; i += 6) {
      const batch = ids.slice(i, i + 6);
      const results = await Promise.all(batch.map((id) => loadNamespacedArtifactFromGcs<T>(namespace, id)));
      for (const r of results) {
        if (r) loaded.push(r);
      }
    }
    return loaded;
  } catch {
    return [];
  }
}

export async function deleteNamespacedArtifactFromGcs(
  namespace: 'docgen-projects' | 'saved-blogs',
  rawId: string
): Promise<void> {
  const safeId = sanitizeDiagramObjectId(rawId);
  if (!safeId) return;
  inMemoryNamespaceStore[namespace].delete(safeId);

  const bucket = getGcsStateBucket();
  if (!bucket) return;
  const token = await getMetadataAccessToken();
  if (!token) return;

  const objectName = `${namespace}/${safeId}.json`;
  const url = `https://storage.googleapis.com/storage/v1/b/${encodeURIComponent(bucket)}/o/${encodeURIComponent(objectName)}`;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4000);
    await fetch(url, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
      signal: controller.signal,
    });
    clearTimeout(timer);
  } catch {}
}
