import { NextResponse } from 'next/server';
import { ensureAuthenticatedOrGuestUser } from '@/lib/auth';
import {
  listNamespacedArtifactsFromGcs,
  loadNamespacedArtifactFromGcs,
  saveNamespacedArtifactToGcs,
} from '@/lib/gcsDiagramStore';

export async function GET() {
  try {
    const items = await listNamespacedArtifactsFromGcs<any>('docgen-projects', 100);
    items.sort(
      (a, b) =>
        new Date(b?.lastUpdated || b?.updatedAt || 0).getTime() -
        new Date(a?.lastUpdated || a?.updatedAt || 0).getTime()
    );
    return NextResponse.json(items, {
      headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' },
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to list DocGen projects' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const user = await ensureAuthenticatedOrGuestUser();
    const body = await request.json();
    const rawId = typeof body?.id === 'string' ? body.id.trim() : '';
    if (!rawId || !/^[a-zA-Z0-9._-]{4,128}$/.test(rawId)) {
      return NextResponse.json({ error: 'Valid project id is required' }, { status: 400 });
    }
    const existing = await loadNamespacedArtifactFromGcs<any>('docgen-projects', rawId);
    const snapshots = Array.isArray(body.snapshots) ? body.snapshots.slice(0, 10) : [];
    const chatHistory = Array.isArray(body.chatHistory) ? body.chatHistory.slice(-50) : [];
    const latest = snapshots[0] || {};
    const record = {
      id: rawId,
      title: String(body.title || existing?.title || 'Architecture Specification').trim(),
      archetypeId: String(body.archetypeId || existing?.archetypeId || 'sdd').trim(),
      domainId: String(body.domainId || existing?.domainId || 'enterprise').trim(),
      scopeSummary: String(body.scopeSummary ?? existing?.scopeSummary ?? '').trim(),
      docVersion: String(latest.docVersion || latest.versionTag || body.docVersion || existing?.docVersion || 'v1.0'),
      snapshotCount: snapshots.length || existing?.snapshotCount || 1,
      lastUpdated: String(latest.timestamp || new Date().toISOString()),
      ownerUserId: existing?.ownerUserId || user?.id || null,
      snapshots,
      chatHistory,
    };
    await saveNamespacedArtifactToGcs('docgen-projects', rawId, record);
    return NextResponse.json({ success: true, project: record }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to save DocGen project' },
      { status: 500 }
    );
  }
}
