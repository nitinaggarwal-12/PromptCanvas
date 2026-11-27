import { NextResponse } from 'next/server';
import { getAuthenticatedUser } from '@/lib/auth';
import {
  loadNamespacedArtifactFromGcs,
  deleteNamespacedArtifactFromGcs,
} from '@/lib/gcsDiagramStore';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  const item = await loadNamespacedArtifactFromGcs<any>('saved-blogs', id);
  if (!item) {
    return NextResponse.json({ error: `Saved blog ${id} not found` }, { status: 404 });
  }
  return NextResponse.json(item, {
    headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' },
  });
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const user = await getAuthenticatedUser();
  if (!user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { id } = await params;
  const existing = await loadNamespacedArtifactFromGcs<any>('saved-blogs', id);
  const isSuperAdmin = Boolean(user.is_super_admin || user.global_role === 'Super-Admin');
  if (existing?.ownerUserId && existing.ownerUserId !== user.id && !isSuperAdmin) {
    return NextResponse.json({ error: 'Forbidden: Only the blog owner can delete this saved blog.' }, { status: 403 });
  }
  await deleteNamespacedArtifactFromGcs('saved-blogs', id);
  return NextResponse.json({ success: true });
}
