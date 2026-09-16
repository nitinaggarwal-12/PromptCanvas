import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import os from 'os';

export interface CloudBridgeEntry {
  id: string;
  title: string;
  format: 'pptx' | 'docx' | 'drawio';
  buffer: Buffer;
  createdAt: number;
  version?: string;
}

declare global {
  // eslint-disable-next-line no-var
  var __cloudBridgeVault: Map<string, CloudBridgeEntry> | undefined;
}

export function getVault(): Map<string, CloudBridgeEntry> {
  if (!globalThis.__cloudBridgeVault) {
    globalThis.__cloudBridgeVault = new Map<string, CloudBridgeEntry>();
  }
  return globalThis.__cloudBridgeVault;
}

const BRIDGE_TMP_DIR = path.join(os.tmpdir(), 'promptcanvas_cloud_bridge');
export const CURRENT_BRIDGE_SCHEMA_VERSION = 'v4_editable_drawio_clean_ascii';

export function saveBridgeFileToDisk(
  id: string,
  format: 'pptx' | 'docx' | 'drawio',
  title: string,
  buffer: Buffer,
  version: string = CURRENT_BRIDGE_SCHEMA_VERSION
) {
  try {
    if (!fs.existsSync(BRIDGE_TMP_DIR)) {
      fs.mkdirSync(BRIDGE_TMP_DIR, { recursive: true });
    }
    const filePath = path.join(BRIDGE_TMP_DIR, `${id}.${format}`);
    const metaPath = path.join(BRIDGE_TMP_DIR, `${id}.${format}.json`);
    fs.writeFileSync(filePath, buffer);
    fs.writeFileSync(
      metaPath,
      JSON.stringify({ id, title, format, version, createdAt: Date.now(), size: buffer.length })
    );
  } catch (err) {
    console.warn('Could not write cloud bridge file to disk tmp:', err);
  }
}

export function loadBridgeFileFromDisk(id: string, requestedFormat?: 'pptx' | 'docx' | 'drawio'): CloudBridgeEntry | null {
  try {
    const cleanId = id.replace(/\.(pptx|docx|drawio)$/i, '');
    const fmt = requestedFormat || (id.endsWith('.docx') ? 'docx' : id.endsWith('.drawio') ? 'drawio' : 'pptx');
    const metaPathNew = path.join(BRIDGE_TMP_DIR, `${cleanId}.${fmt}.json`);
    const metaPathLegacy = path.join(BRIDGE_TMP_DIR, `${cleanId}.json`);
    const metaPath = fs.existsSync(metaPathNew) ? metaPathNew : metaPathLegacy;
    if (!fs.existsSync(metaPath)) return null;
    const meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
    const filePath = path.join(BRIDGE_TMP_DIR, `${cleanId}.${meta.format || fmt}`);
    if (!fs.existsSync(filePath)) return null;
    const buffer = fs.readFileSync(filePath);
    return {
      id: cleanId,
      title: meta.title || 'Architecture Blueprint',
      format: meta.format || fmt,
      buffer,
      createdAt: meta.createdAt || Date.now(),
      version: meta.version,
    };
  } catch {
    return null;
  }
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, HEAD, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      id = 'VIS-MASTER',
      title = 'Architecture Blueprint',
      format = 'pptx',
      base64Data,
      bridgeId: requestedBridgeId,
      googleAccessToken,
    } = body;

    if (!base64Data) {
      return NextResponse.json(
        { error: 'Missing base64Data payload' },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const buffer = Buffer.from(base64Data, 'base64');
    const bridgeId =
      requestedBridgeId || `${id.toLowerCase().replace(/[^a-z0-9]/g, '')}_${Date.now()}`;

    const vault = getVault();
    const now = Date.now();
    for (const [k, v] of vault.entries()) {
      if (now - v.createdAt > 60 * 60 * 1000) {
        vault.delete(k);
      }
    }

    const entryFormat: 'pptx' | 'docx' | 'drawio' =
      format === 'docx' ? 'docx' : format === 'drawio' ? 'drawio' : 'pptx';

    const entry: CloudBridgeEntry = {
      id: bridgeId,
      title,
      format: entryFormat,
      buffer,
      createdAt: now,
      version: CURRENT_BRIDGE_SCHEMA_VERSION,
    };

    vault.set(`${bridgeId}.${entryFormat}`, entry);
    vault.set(bridgeId, entry);
    saveBridgeFileToDisk(bridgeId, entry.format, title, buffer, CURRENT_BRIDGE_SCHEMA_VERSION);

    if (body.xmlContent && typeof body.xmlContent === 'string') {
      const drawioBuf = Buffer.from(body.xmlContent, 'utf-8');
      const drawioEntry: CloudBridgeEntry = {
        id: bridgeId,
        title,
        format: 'drawio',
        buffer: drawioBuf,
        createdAt: now,
        version: CURRENT_BRIDGE_SCHEMA_VERSION,
      };
      vault.set(`${bridgeId}.drawio`, drawioEntry);
      saveBridgeFileToDisk(bridgeId, 'drawio', title, drawioBuf, CURRENT_BRIDGE_SCHEMA_VERSION);
    }

    const host = req.headers.get('host') || 'promptcanvas.up.railway.app';
    const proto = host.includes('localhost') || host.includes('127.0.0.1') ? 'http' : 'https';
    // Clean filename path ending in .pptx or .docx so Google Docs Viewer URL parser succeeds 100%
    const publicUrl = `${proto}://${host}/api/export/cloud-bridge/${bridgeId}.${entry.format}`;

    let googleWebViewLink: string | null = null;
    let googleFileId: string | null = null;
    let googleDriveError: string | null = null;

    if (googleAccessToken && googleAccessToken.trim().length > 10) {
      try {
        const targetMimeType =
          entry.format === 'pptx'
            ? 'application/vnd.google-apps.presentation'
            : 'application/vnd.google-apps.document';
        const sourceMimeType =
          entry.format === 'pptx'
            ? 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
            : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

        const boundary = '-------PromptCanvasGoogleDriveBoundary' + Date.now();
        const metadata = JSON.stringify({
          name: `${title} (${id}) — Editable ${entry.format === 'pptx' ? 'Google Slides' : 'Google Docs'}`,
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
            (entry.format === 'pptx'
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

    return NextResponse.json(
      {
        success: true,
        bridgeId,
        publicUrl,
        googleViewerUrl: `https://docs.google.com/viewer?url=${encodeURIComponent(publicUrl)}&embedded=true`,
        googleWebViewLink,
        googleFileId,
        googleDriveError,
      },
      { headers: CORS_HEADERS }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Cloud bridge failed' },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}

function resolveBridgeEntry(rawId: string | null): CloudBridgeEntry | null {
  if (!rawId) return null;
  const cleanId = rawId.replace(/\.(pptx|docx)$/i, '');
  const vault = getVault();
  const memEntry = vault.get(cleanId) || vault.get(rawId);
  if (memEntry) return memEntry;
  return loadBridgeFileFromDisk(cleanId);
}

export async function HEAD(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const entry = resolveBridgeEntry(id);
  if (!entry) {
    return new NextResponse(null, { status: 404, headers: CORS_HEADERS });
  }
  const contentType =
    entry.format === 'pptx'
      ? 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
      : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  const safeName = entry.title.toLowerCase().replace(/[^a-z0-9]+/g, '_');

  return new NextResponse(null, {
    status: 200,
    headers: {
      ...CORS_HEADERS,
      'Content-Type': contentType,
      'Content-Length': entry.buffer.length.toString(),
      'Content-Disposition': `inline; filename="${safeName}.${entry.format}"`,
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const entry = resolveBridgeEntry(id);
  if (!entry) {
    return new NextResponse('Bridge file expired or not found', { status: 404, headers: CORS_HEADERS });
  }

  const contentType =
    entry.format === 'pptx'
      ? 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
      : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  const safeName = entry.title.toLowerCase().replace(/[^a-z0-9]+/g, '_');

  return new NextResponse(new Uint8Array(entry.buffer), {
    status: 200,
    headers: {
      ...CORS_HEADERS,
      'Content-Type': contentType,
      'Content-Length': entry.buffer.length.toString(),
      'Content-Disposition': `inline; filename="${safeName}.${entry.format}"`,
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
