import { NextResponse } from 'next/server';
import { loadCloudViewerManifest } from '@/lib/server/googleWorkspaceBridge';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const manifest = loadCloudViewerManifest();
    return NextResponse.json(manifest, {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (err: any) {
    return NextResponse.json(
      { slides: {}, docs: {}, error: err?.message || 'Failed to load manifest' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}
