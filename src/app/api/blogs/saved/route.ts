import { NextResponse } from 'next/server';
import { ensureAuthenticatedOrGuestUser } from '@/lib/auth';
import {
  listNamespacedArtifactsFromGcs,
  saveNamespacedArtifactToGcs,
  loadNamespacedArtifactFromGcs,
} from '@/lib/gcsDiagramStore';

export async function GET() {
  try {
    const items = await listNamespacedArtifactsFromGcs<any>('saved-blogs', 100);
    items.sort(
      (a, b) =>
        new Date(b?.updatedIso || 0).getTime() - new Date(a?.updatedIso || 0).getTime()
    );
    return NextResponse.json(items, {
      headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' },
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to list saved blogs' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const user = await ensureAuthenticatedOrGuestUser();
    const body = await request.json();
    const rawId = typeof body?.id === 'string' ? body.id.trim() : '';
    if (!rawId || !/^[a-zA-Z0-9._-]{4,128}$/.test(rawId) || !body?.blog) {
      return NextResponse.json({ error: 'Valid blog id and blog payload are required' }, { status: 400 });
    }
    const existing = await loadNamespacedArtifactFromGcs<any>('saved-blogs', rawId);
    const nextVersionCount = Number(existing?.versionCount || 0) + 1;
    const nowIso = new Date().toISOString();
    const record = {
      id: rawId,
      savedAt: body.savedAt || new Date().toLocaleString(),
      updatedIso: nowIso,
      versionCount: body.versionCount || nextVersionCount,
      ownerUserId: existing?.ownerUserId || user?.id || null,
      useCase: body.useCase,
      blog: {
        ...body.blog,
        id: rawId,
      },
    };
    await saveNamespacedArtifactToGcs('saved-blogs', rawId, record);
    return NextResponse.json({ success: true, item: record }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to save blog' },
      { status: 500 }
    );
  }
}
