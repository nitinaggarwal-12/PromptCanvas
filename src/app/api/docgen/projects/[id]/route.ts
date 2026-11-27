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
  const project = await loadNamespacedArtifactFromGcs<any>('docgen-projects', id);
  if (!project) {
    return NextResponse.json({ error: `DocGen project ${id} not found` }, { status: 404 });
  }
  return NextResponse.json(project, {
    headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' },
  });
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const user = await getAuthenticatedUser();
  if (!user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { id } = await params;
  const existing = await loadNamespacedArtifactFromGcs<any>('docgen-projects', id);
  const isSuperAdmin = Boolean(user.is_super_admin || user.global_role === 'Super-Admin');
  if (existing?.ownerUserId && existing.ownerUserId !== user.id && !isSuperAdmin) {
    return NextResponse.json({ error: 'Forbidden: Only the project owner can delete this DocGen project.' }, { status: 403 });
  }
  await deleteNamespacedArtifactFromGcs('docgen-projects', id);
  return NextResponse.json({ success: true });
}
