import { NextRequest, NextResponse } from 'next/server';

interface CloudBridgeEntry {
  id: string;
  title: string;
  format: 'pptx' | 'docx';
  buffer: Buffer;
  createdAt: number;
}

declare global {
  // eslint-disable-next-line no-var
  var __cloudBridgeVault: Map<string, CloudBridgeEntry> | undefined;
}

function getVault(): Map<string, CloudBridgeEntry> {
  if (!globalThis.__cloudBridgeVault) {
    globalThis.__cloudBridgeVault = new Map<string, CloudBridgeEntry>();
  }
  return globalThis.__cloudBridgeVault;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      id = 'VIS-MASTER',
      title = 'Architecture Blueprint',
      format = 'pptx',
      base64Data,
      googleAccessToken,
    } = body;

    if (!base64Data) {
      return NextResponse.json({ error: 'Missing base64Data payload' }, { status: 400 });
    }

    const buffer = Buffer.from(base64Data, 'base64');
    const bridgeId = `${id.toLowerCase().replace(/[^a-z0-9]/g, '')}_${Date.now()}`;

    const vault = getVault();
    // Clean up entries older than 30 minutes
    const now = Date.now();
    for (const [k, v] of vault.entries()) {
      if (now - v.createdAt > 30 * 60 * 1000) {
        vault.delete(k);
      }
    }

    vault.set(bridgeId, {
      id: bridgeId,
      title,
      format,
      buffer,
      createdAt: now,
    });

    const host = req.headers.get('host') || 'promptcanvas.up.railway.app';
    const proto = host.includes('localhost') ? 'http' : 'https';
    const publicUrl = `${proto}://${host}/api/export/cloud-bridge?id=${bridgeId}&ext=.${format}`;

    // If a Google OAuth Access Token is provided, upload directly to Google Drive API
    // with conversion to native Google Slides or Google Docs!
    let googleWebViewLink: string | null = null;
    let googleFileId: string | null = null;
    let googleDriveError: string | null = null;

    if (googleAccessToken && googleAccessToken.trim().length > 10) {
      try {
        const targetMimeType =
          format === 'pptx'
            ? 'application/vnd.google-apps.presentation'
            : 'application/vnd.google-apps.document';
        const sourceMimeType =
          format === 'pptx'
            ? 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
            : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

        const boundary = '-------PromptCanvasGoogleDriveBoundary' + Date.now();
        const metadata = JSON.stringify({
          name: `${title} (${id}) — Editable ${format === 'pptx' ? 'Google Slides' : 'Google Docs'}`,
          mimeType: targetMimeType,
        });

        const multipartBody = Buffer.concat([
          Buffer.from(
            `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${metadata}\r\n--${boundary}\r\nContent-Type: ${sourceMimeType}\r\n\r\n`,
            'utf-8'
          ),
          buffer,
          Buffer.from(`\r\n--${boundary}--\r\n`, 'utf-8'),
        ]);

        const gRes = await fetch(
          'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,webViewLink',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${googleAccessToken.trim()}`,
              'Content-Type': `multipart/related; boundary=${boundary}`,
            },
            body: new Uint8Array(multipartBody),
          }
        );

        if (gRes.ok) {
          const gData = await gRes.json();
          googleFileId = gData.id;
          googleWebViewLink =
            gData.webViewLink ||
            (format === 'pptx'
              ? `https://docs.google.com/presentation/d/${gData.id}/edit`
              : `https://docs.google.com/document/d/${gData.id}/edit`);
        } else {
          const errText = await gRes.text();
          googleDriveError = `Google Drive API returned ${gRes.status}: ${errText}`;
        }
      } catch (gErr: any) {
        googleDriveError = gErr?.message || 'Google Drive upload failed';
      }
    }

    return NextResponse.json({
      success: true,
      bridgeId,
      publicUrl,
      googleViewerUrl: `https://docs.google.com/viewer?url=${encodeURIComponent(publicUrl)}&embedded=false`,
      googleWebViewLink,
      googleFileId,
      googleDriveError,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Cloud bridge failed' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) {
    return new NextResponse('Missing bridge id', { status: 400 });
  }

  const vault = getVault();
  const entry = vault.get(id);
  if (!entry) {
    return new NextResponse('Bridge file expired or not found', { status: 404 });
  }

  const contentType =
    entry.format === 'pptx'
      ? 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
      : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  const safeName = entry.title.toLowerCase().replace(/[^a-z0-9]+/g, '_');

  return new NextResponse(new Uint8Array(entry.buffer), {
    status: 200,
    headers: {
      'Content-Type': contentType,
      'Content-Disposition': `inline; filename="${safeName}.${entry.format}"`,
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=1800',
    },
  });
}
