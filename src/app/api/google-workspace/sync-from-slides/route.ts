import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/auth';
import { getDiagram, getLatestDiagramVersion, saveDiagramVersion } from '@/lib/db';
import {
  extractPresentationIdFromInput,
  loadCloudViewerManifest,
  normalizeManifestKey,
  pullGoogleSlidesEditsToDrawioXml,
} from '@/lib/server/googleWorkspaceBridge';

export const dynamic = 'force-dynamic';

/**
 * POST /api/google-workspace/sync-from-slides
 * Bidirectional Google Slides -> Draw.io XML -> DB Version sync endpoint.
 * Pulls live edits (renames, moves, newly added shapes) from a Google Slides presentation
 * and merges them back into Draw.io XML + saves a new version when diagramId is provided.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const rawSlidesRef = String(body.presentationId || body.googleSlidesUrl || body.slidesUrl || '').trim();
    const diagramId = typeof body.diagramId === 'string' ? body.diagramId.trim() : '';
    const cacheKey = typeof body.key === 'string' ? body.key.trim() : '';
    const accessTokenOverride = typeof body.accessToken === 'string' && body.accessToken.trim()
      ? body.accessToken.trim()
      : null;

    let presentationId = extractPresentationIdFromInput(rawSlidesRef);
    if (!presentationId && cacheKey) {
      const manifest = loadCloudViewerManifest();
      const normKey = normalizeManifestKey(cacheKey, body.title);
      presentationId = manifest.slides[normKey]?.googleSlidesId || null;
    }

    if (!presentationId) {
      return NextResponse.json(
        { ok: false, error: 'Missing valid presentationId or googleSlidesUrl.' },
        { status: 400 }
      );
    }

    let baseXml = typeof body.baseXml === 'string' ? body.baseXml : '';
    let dbDiagram: any = null;
    if (diagramId) {
      const user = await getAuthenticatedUser();
      dbDiagram = await getDiagram(diagramId, user?.id);
      if (dbDiagram && dbDiagram.access_level === 'Viewer') {
        return NextResponse.json(
          { ok: false, error: 'Forbidden: You have read-only access to this diagram.' },
          { status: 403 }
        );
      }
      if (!baseXml && dbDiagram) {
        const latest = await getLatestDiagramVersion(diagramId);
        baseXml = latest?.xml_content || '';
      }
    }

    if (!baseXml || !baseXml.includes('<mxCell')) {
      return NextResponse.json(
        { ok: false, error: 'Missing baseXml (or persisted diagram version) to merge Google Slides edits into.' },
        { status: 400 }
      );
    }

    const syncResult = await pullGoogleSlidesEditsToDrawioXml({
      presentationIdOrUrl: presentationId,
      baseXml,
      accessTokenOverride,
    });

    let savedVersion: any = null;
    if (diagramId && dbDiagram && syncResult.totalChanges > 0) {
      savedVersion = await saveDiagramVersion(
        diagramId,
        syncResult.xml,
        syncResult.summary,
        'Google Slides Sync',
        null,
        syncResult.summary,
        null,
        null,
        dbDiagram.architecture_type || 'v2_freeform',
        null
      );
    }

    return NextResponse.json({
      ok: true,
      ...syncResult,
      version: savedVersion,
    });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || 'Google Slides sync-back failed.' },
      { status: 500 }
    );
  }
}
