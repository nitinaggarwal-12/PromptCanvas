import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  GoogleDriveDirectOpenError,
  buildDriveMultipartBody,
  buildGoogleEditorUrl,
  clearCachedDriveToken,
  createGoogleWorkspaceFileFromBlob,
  describeDriveApiError,
  getCachedDriveToken,
  getRememberedGoogleAccountEmail,
  isValidGoogleOAuthClientId,
  resolveGoogleOAuthClientId,
  saveRememberedGoogleAccountEmail,
} from '@/lib/googleDriveDirectOpen';

const PPTX_MIME = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';

describe('googleDriveDirectOpen — OAuth client id validation', () => {
  it('accepts a real Web OAuth client id shape', () => {
    expect(isValidGoogleOAuthClientId('248990048888-abc123def456.apps.googleusercontent.com')).toBe(true);
  });

  it('rejects placeholders, tokens and empty values', () => {
    expect(isValidGoogleOAuthClientId('')).toBe(false);
    expect(isValidGoogleOAuthClientId(undefined)).toBe(false);
    expect(isValidGoogleOAuthClientId('ya29.a0AfH6SMB-access-token')).toBe(false);
    expect(isValidGoogleOAuthClientId('paste-client-id-here.apps.googleusercontent.com')).toBe(false);
  });
});

describe('googleDriveDirectOpen — editor URLs', () => {
  it('builds the real Google Slides editor URL (never viewerng)', () => {
    const url = buildGoogleEditorUrl('slides', '1AbC_dEf');
    expect(url).toBe('https://docs.google.com/presentation/d/1AbC_dEf/edit');
    expect(url).not.toContain('viewerng');
  });

  it('pins the signed-in account with authuser for Docs', () => {
    expect(buildGoogleEditorUrl('docs', 'xyz', 'nitinagga@google.com')).toBe(
      'https://docs.google.com/document/d/xyz/edit?authuser=nitinagga%40google.com'
    );
  });
});

describe('googleDriveDirectOpen — multipart body', () => {
  it('emits a Drive-compatible multipart/related envelope with conversion metadata', async () => {
    const media = new Blob(['PK\u0003\u0004fake-pptx'], { type: PPTX_MIME });
    const { body, contentType } = buildDriveMultipartBody(
      { name: 'Deck (#00)', mimeType: 'application/vnd.google-apps.presentation' },
      media,
      PPTX_MIME,
      'test-boundary'
    );
    expect(contentType).toBe('multipart/related; boundary=test-boundary');
    const text = await body.text();
    expect(text.startsWith('--test-boundary\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n')).toBe(true);
    expect(text).toContain('"mimeType":"application/vnd.google-apps.presentation"');
    expect(text).toContain(`--test-boundary\r\nContent-Type: ${PPTX_MIME}\r\n\r\nPK\u0003\u0004fake-pptx\r\n--test-boundary--`);
  });
});

describe('googleDriveDirectOpen — Drive API error mapping', () => {
  it('maps 401 to token_expired', () => {
    const err = describeDriveApiError(401, '{"error":{"code":401,"message":"Invalid Credentials"}}');
    expect(err).toBeInstanceOf(GoogleDriveDirectOpenError);
    expect(err.code).toBe('token_expired');
  });

  it('maps accessNotConfigured to drive_api_disabled with actionable guidance', () => {
    const err = describeDriveApiError(
      403,
      JSON.stringify({
        error: {
          code: 403,
          message: 'Google Drive API has not been used in project 123 before or it is disabled.',
          errors: [{ reason: 'accessNotConfigured' }],
        },
      })
    );
    expect(err.code).toBe('drive_api_disabled');
    expect(err.message).toMatch(/Drive API is not enabled/);
  });

  it('maps storageQuotaExceeded to storage_quota', () => {
    const err = describeDriveApiError(
      403,
      JSON.stringify({ error: { errors: [{ reason: 'storageQuotaExceeded' }], message: 'The user has exceeded their Drive storage quota' } })
    );
    expect(err.code).toBe('storage_quota');
  });
});

describe('googleDriveDirectOpen — createGoogleWorkspaceFileFromBlob', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('uses the multipart endpoint for small decks and returns the Slides edit URL', async () => {
    const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      expect(url).toContain('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart');
      expect((init?.headers as Record<string, string>).Authorization).toBe('Bearer tok-123');
      expect((init?.headers as Record<string, string>)['Content-Type']).toMatch(/^multipart\/related; boundary=/);
      return new Response(
        JSON.stringify({ id: 'FILE_ID', name: 'Deck (#00)', webViewLink: 'https://docs.google.com/presentation/d/FILE_ID/edit?usp=drivesdk' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    });
    vi.stubGlobal('fetch', fetchMock);

    const result = await createGoogleWorkspaceFileFromBlob('tok-123', new Blob(['small'], { type: PPTX_MIME }), {
      name: 'Deck (#00)',
      kind: 'slides',
      email: 'nitinagga@google.com',
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(result.id).toBe('FILE_ID');
    expect(result.url).toBe('https://docs.google.com/presentation/d/FILE_ID/edit?authuser=nitinagga%40google.com');
  });

  it('switches to the resumable protocol for decks above the multipart limit', async () => {
    const calls: string[] = [];
    const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      calls.push(`${init?.method} ${url}`);
      if (url.includes('uploadType=resumable')) {
        expect((init?.headers as Record<string, string>)['X-Upload-Content-Type']).toBe(PPTX_MIME);
        return new Response(null, { status: 200, headers: { Location: 'https://www.googleapis.com/upload/session/abc' } });
      }
      expect(url).toBe('https://www.googleapis.com/upload/session/abc');
      expect(init?.method).toBe('PUT');
      return new Response(JSON.stringify({ id: 'BIG_ID' }), { status: 200 });
    });
    vi.stubGlobal('fetch', fetchMock);

    const bigBlob = new Blob([new Uint8Array(5 * 1024 * 1024)], { type: PPTX_MIME });
    const result = await createGoogleWorkspaceFileFromBlob('tok-123', bigBlob, { name: 'Big deck', kind: 'slides' });

    expect(calls).toHaveLength(2);
    expect(calls[0]).toContain('POST https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable');
    expect(result.url).toBe('https://docs.google.com/presentation/d/BIG_ID/edit');
  });

  it('surfaces a typed error when Drive rejects the upload', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => new Response(JSON.stringify({ error: { code: 403, message: 'Insufficient Permission', errors: [{ reason: 'insufficientPermissions' }] } }), { status: 403 }))
    );
    await expect(
      createGoogleWorkspaceFileFromBlob('tok-123', new Blob(['x'], { type: PPTX_MIME }), { name: 'Deck', kind: 'docs' })
    ).rejects.toMatchObject({ code: 'insufficient_permissions' });
  });
});

describe('exportDrawioToEditablePptx — single editable vector slide 1:1 fidelity', () => {
  it('compiles Blueprint #00 into a single editable slide without static picture or object ID slides', async () => {
    const JSZip = (await import('jszip')).default;
    const { exportDrawioToEditablePptx } = await import('@/lib/export/editablePptxCompiler');
    const { generateUpgradedGcpGeBankingArchitectureXml } = await import('@/lib/canonical/upgradedGcpGeBankingAgentTemplate');

    const xml = generateUpgradedGcpGeBankingArchitectureXml({ theme: 'light' });
    const blob = (await exportDrawioToEditablePptx(
      xml,
      'GCP + GE + ADK + A2A Banking Multi-Agent Reference Architecture (#00)',
      'light',
      { returnBlob: true }
    )) as Blob;
    const zip = await JSZip.loadAsync(await blob.arrayBuffer());
    const slideFiles = Object.keys(zip.files).filter((k) => /^ppt\/slides\/slide\d+\.xml$/.test(k));
    expect(slideFiles).toEqual(['ppt/slides/slide1.xml']);

    const mediaFiles = Object.keys(zip.files).filter((k) => k.startsWith('ppt/media/'));
    expect(mediaFiles.length).toBeGreaterThanOrEqual(25);

    const slide1Xml = await zip.file('ppt/slides/slide1.xml')!.async('string');
    expect(slide1Xml).toContain('prst="can"');
    expect(slide1Xml).toContain('Gemini 3.1 Pro / 3.8 Flash');
    expect(slide1Xml).toContain('❶');
    expect(slide1Xml).toContain('➐');
    expect(slide1Xml).not.toContain('OBJ-01');
    expect(slide1Xml).not.toContain('• (');
  });
});

describe('googleDriveDirectOpen — Primary Server Session Vault + Fallback IAP login_hint', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('hydrates server-side sessionToken (Primary) and BeyondCorp iapEmail (Fallback) from /api/google-workspace/oauth-config', async () => {
    const store = new Map<string, string>();
    const storageMock = {
      getItem: (k: string) => store.get(k) ?? null,
      setItem: (k: string, v: string) => store.set(k, v),
      removeItem: (k: string) => store.delete(k),
    };
    vi.stubGlobal('window', {
      localStorage: storageMock,
      sessionStorage: storageMock,
      location: { origin: 'https://promptcanvas-248990048888.cr.gclb.goog' },
    });

    const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (url.includes('/api/google-workspace/oauth-config') && (!init?.method || init.method === 'GET')) {
        return new Response(
          JSON.stringify({
            clientId: '248990048888-abc123def456.apps.googleusercontent.com',
            configured: true,
            iapEmail: 'nitinagga@google.com',
            sessionToken: {
              accessToken: 'ya29.server-vault-hydrated-token',
              expiresAt: Date.now() + 50 * 60 * 1000,
              email: 'nitinagga@google.com',
            },
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      }
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    });
    vi.stubGlobal('fetch', fetchMock);

    const clientId = await resolveGoogleOAuthClientId();
    expect(clientId).toBe('248990048888-abc123def456.apps.googleusercontent.com');

    // Primary: Server-hydrated token is immediately available in browser cache
    const cached = getCachedDriveToken();
    expect(cached).not.toBeNull();
    expect(cached?.accessToken).toBe('ya29.server-vault-hydrated-token');
    expect(cached?.email).toBe('nitinagga@google.com');

    // Fallback: BeyondCorp IAP email is remembered for GIS login_hint + prompt: ''
    expect(getRememberedGoogleAccountEmail()).toBe('nitinagga@google.com');

    // Updating remembered email persists normalized address
    saveRememberedGoogleAccountEmail('  NitinAgga@google.com ');
    expect(getRememberedGoogleAccountEmail()).toBe('nitinagga@google.com');

    // Clearing cached token removes token but preserves remembered IAP email for fallback silent renewal
    clearCachedDriveToken();
    expect(getCachedDriveToken()).toBeNull();
    expect(getRememberedGoogleAccountEmail()).toBe('nitinagga@google.com');
  });
});

describe('exportDrawioToEditableDocx — single editable vector document 1:1 fidelity', () => {
  it('compiles Blueprint #00 into a 1:1 editable Google Docs / Word DrawingML vector diagram with cylinders, circled badges, all 4 Observability rows, and orthogonal connectors', async () => {
    const JSZip = (await import('jszip')).default;
    const { exportDrawioToEditableDocx } = await import('@/lib/export/editableDocxCompiler');
    const { generateUpgradedGcpGeBankingArchitectureXml } = await import('@/lib/canonical/upgradedGcpGeBankingAgentTemplate');

    const xml = generateUpgradedGcpGeBankingArchitectureXml({ theme: 'light' });
    const blob = (await exportDrawioToEditableDocx(
      xml,
      'GCP + GE + ADK + A2A Banking Multi-Agent Reference Architecture (#00)',
      '#00',
      { returnBlob: true }
    )) as Blob;
    const zip = await JSZip.loadAsync(await blob.arrayBuffer());
    const docXml = await zip.file('word/document.xml')!.async('string');

    // 3D Cylinder geometry
    expect(docXml).toContain('prst="can"');
    // Circled step badges (1..7)
    expect(docXml).toContain('❶');
    expect(docXml).toContain('❹');
    expect(docXml).toContain('❻');
    expect(docXml).toContain('➐');
    // Full untruncated 3rd-line subtitles (previously chopped by .slice(0, 2))
    expect(docXml).toContain('Google ADK &amp; LangGraph)');
    expect(docXml).toContain('ScaNN &amp; Valkey Memory)');
    expect(docXml).toContain('vLLM &amp; Vertex Model Garden)');
    // All 4 Observability rows & vector badges
    expect(docXml).toContain('Cloud Logging');
    expect(docXml).toContain('Cloud Monitoring');
    expect(docXml).toContain('Vertex AI Evaluation');
    expect(docXml).toContain('GCP FinOps Hub');
    // Edge labels & IAM shield (no spurious AZ badge or top header clutter)
    expect(docXml).toContain('A2A');
    expect(docXml).toContain('MCP');
    expect(docXml).not.toContain('>AZ<');
    expect(docXml).not.toContain('Editable Word Architecture Diagram');

    // Every connector line segment must be 100% orthogonal (either horizontal cy="0" or vertical cx="0")
    const lineShapes = Array.from(
      docXml.matchAll(/<a:xfrm[^>]*><a:off[^/]*\/><a:ext cx="(\d+)" cy="(\d+)"\/><\/a:xfrm><a:prstGeom prst="line">/g)
    );
    expect(lineShapes.length).toBeGreaterThanOrEqual(20);
    for (const m of lineShapes) {
      const cx = Number(m[1]);
      const cy = Number(m[2]);
      expect(cx === 0 || cy === 0).toBe(true);
    }
  });
});

