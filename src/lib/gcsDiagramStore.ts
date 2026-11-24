/**
 * Zero-Dependency GCS Persistence Mirror for PromptCanvas Diagrams.
 *
 * Ensures every generated diagram's unique UUID (`?id=<uuid>`) survives Cloud Run
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
