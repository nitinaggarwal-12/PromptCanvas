import { NextRequest, NextResponse } from 'next/server';
import {
  exportGoogleFilePdfBytes,
  loadCloudViewerManifest,
  normalizeManifestKey,
  resolveFallbackWorkstreamKey,
} from '@/lib/server/googleWorkspaceBridge';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const rawKey = (searchParams.get('key') || 'WS1').trim();
    const key = normalizeManifestKey(rawKey);
    const fbKey = resolveFallbackWorkstreamKey(rawKey) || 'WS1';
    const mode = (searchParams.get('mode') || 'slides').trim().toLowerCase();
    let fileId = (searchParams.get('fileId') || '').trim();

    const manifest = loadCloudViewerManifest();
    if (!fileId) {
      if (mode === 'docs') {
        fileId =
          manifest.docs[key]?.googleDocsId ||
          manifest.docs[fbKey]?.googleDocsId ||
          manifest.docs.WS1?.googleDocsId ||
          '';
      } else {
        fileId =
          manifest.slides[key]?.googleSlidesId ||
          manifest.slides[fbKey]?.googleSlidesId ||
          manifest.slides.WS1?.googleSlidesId ||
          '';
      }
    }

    if (!fileId) {
      return NextResponse.json(
        { error: `No Google Drive fileId found for key=${key} mode=${mode}` },
        { status: 404 }
      );
    }

    const pdfBytes = await exportGoogleFilePdfBytes(fileId);
    return new NextResponse(new Uint8Array(pdfBytes), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Length': String(pdfBytes.length),
        'Content-Disposition': `inline; filename="PromptCanvas-${key}-${mode}.pdf"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'PDF export failed' }, { status: 500 });
  }
}
