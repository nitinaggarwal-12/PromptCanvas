import { NextResponse } from 'next/server';
import { loadCloudViewerManifest } from '@/lib/server/googleWorkspaceBridge';

export const dynamic = 'force-dynamic';

export async function GET() {
  const manifest = loadCloudViewerManifest();
  return NextResponse.json(manifest, {
    headers: { 'Cache-Control': 'no-store' },
  });
}
