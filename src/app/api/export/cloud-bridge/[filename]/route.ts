import { NextRequest, NextResponse } from 'next/server';
import { getVault, loadBridgeFileFromDisk, CloudBridgeEntry } from '../route';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

function resolveEntryByFilename(filename: string): CloudBridgeEntry | null {
  if (!filename) return null;
  const cleanId = filename.replace(/\.(pptx|docx)$/i, '');
  const vault = getVault();
  const mem = vault.get(cleanId) || vault.get(filename);
  if (mem) return mem;
  return loadBridgeFileFromDisk(cleanId);
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function HEAD(
  _req: NextRequest,
  context: { params: Promise<{ filename: string }> }
) {
  const { filename } = await context.params;
  const entry = resolveEntryByFilename(filename);
  if (!entry) {
    return new NextResponse(null, { status: 404, headers: CORS_HEADERS });
  }

  const contentType =
    entry.format === 'pptx'
      ? 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
      : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

  return new NextResponse(null, {
    status: 200,
    headers: {
      ...CORS_HEADERS,
      'Content-Type': contentType,
      'Content-Length': entry.buffer.length.toString(),
      'Content-Disposition': `inline; filename="${filename}"`,
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ filename: string }> }
) {
  const { filename } = await context.params;
  const entry = resolveEntryByFilename(filename);
  if (!entry) {
    return new NextResponse('Bridge file expired or not found', {
      status: 404,
      headers: CORS_HEADERS,
    });
  }

  const contentType =
    entry.format === 'pptx'
      ? 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
      : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

  return new NextResponse(new Uint8Array(entry.buffer), {
    status: 200,
    headers: {
      ...CORS_HEADERS,
      'Content-Type': contentType,
      'Content-Length': entry.buffer.length.toString(),
      'Content-Disposition': `inline; filename="${filename}"`,
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
