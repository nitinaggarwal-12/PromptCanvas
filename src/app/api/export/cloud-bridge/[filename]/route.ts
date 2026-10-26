import { NextRequest, NextResponse } from 'next/server';
import {
  getVault,
  loadBridgeFileFromDisk,
  saveBridgeFileToDisk,
  CloudBridgeEntry,
  CURRENT_BRIDGE_SCHEMA_VERSION,
} from '../route';
import { CANONICAL_TEMPLATES } from '@/lib/canonical/canonicalTemplates';
import { exportDrawioToEditablePptx } from '@/lib/export/editablePptxCompiler';
import { exportDrawioToEditableDocx } from '@/lib/export/editableDocxCompiler';

const BRIDGE_FILE_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, Range',
  'Access-Control-Expose-Headers': 'Content-Length, Content-Range, Content-Disposition, Accept-Ranges',
  'Accept-Ranges': 'bytes',
  'Content-Security-Policy': "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:; frame-ancestors *;",
  'Cross-Origin-Resource-Policy': 'cross-origin',
  'Timing-Allow-Origin': '*',
};

function getContentTypeForFormat(filename: string, format?: string): string {
  const lower = filename.toLowerCase();
  if (lower.endsWith('.drawio') || format === 'drawio') {
    return 'application/xml; charset=utf-8';
  }
  if (lower.endsWith('.docx') || format === 'docx') {
    return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  }
  return 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
}

async function resolveOrHealEntryByFilename(filename: string): Promise<CloudBridgeEntry | null> {
  if (!filename) return null;
  const lower = filename.toLowerCase();
  const isDocx = lower.endsWith('.docx');
  const isDrawio = lower.endsWith('.drawio');
  const requestedFormat: 'pptx' | 'docx' | 'drawio' = isDrawio ? 'drawio' : isDocx ? 'docx' : 'pptx';
  const cleanId = filename.replace(/\.(pptx|docx|drawio)$/i, '');

  const vault = getVault();
  let entry =
    vault.get(`${cleanId}.${requestedFormat}`) ||
    vault.get(filename) ||
    vault.get(cleanId) ||
    loadBridgeFileFromDisk(cleanId, requestedFormat);

  // If entry exists but has the wrong format or outdated schema version, force re-heal
  if (
    entry &&
    (entry.format !== requestedFormat || entry.version !== CURRENT_BRIDGE_SCHEMA_VERSION)
  ) {
    entry = null;
  }

  // Check if cleanId matches a canonical blueprint (e.g., bp_00, bp_00_177..., canonical_00, 00_177...)
  const canonicalMatch = cleanId.match(/^(?:bp_|canonical_)?(\d{2})(?:_|$)/i);
  const matchedCanonicalTemplate = canonicalMatch
    ? CANONICAL_TEMPLATES.find((t) => t.id === canonicalMatch[1])
    : null;

  // Self-heal on demand if missing or outdated for canonical blueprints
  if (!entry && matchedCanonicalTemplate) {
    try {
      const xmlContent = matchedCanonicalTemplate.generateXml('enterprise', 'light');
      const blueprintTitle = matchedCanonicalTemplate.name;
      const blueprintCode = `#${matchedCanonicalTemplate.id}`;
      const masterImgSrc =
        Number(matchedCanonicalTemplate.id) <= 74
          ? `/templates/canonical_${matchedCanonicalTemplate.id.padStart(2, '0')}.png`
          : undefined;

      if (requestedFormat === 'drawio') {
        const healedEntry: CloudBridgeEntry = {
          id: cleanId,
          title: blueprintTitle,
          format: 'drawio',
          buffer: Buffer.from(xmlContent, 'utf-8'),
          createdAt: Date.now(),
          version: CURRENT_BRIDGE_SCHEMA_VERSION,
        };
        vault.set(`${cleanId}.drawio`, healedEntry);
        saveBridgeFileToDisk(cleanId, 'drawio', healedEntry.title, healedEntry.buffer, CURRENT_BRIDGE_SCHEMA_VERSION);
        return healedEntry;
      } else if (requestedFormat === 'docx') {
        const base64Data = (await exportDrawioToEditableDocx(
          xmlContent,
          blueprintTitle,
          blueprintCode,
          {
            returnBase64: true,
            bridgeId: cleanId,
            masterImageSrc: masterImgSrc,
          }
        )) as string;

        if (base64Data && typeof base64Data === 'string') {
          const healedEntry: CloudBridgeEntry = {
            id: cleanId,
            title: blueprintTitle,
            format: 'docx',
            buffer: Buffer.from(base64Data, 'base64'),
            createdAt: Date.now(),
            version: CURRENT_BRIDGE_SCHEMA_VERSION,
          };
          vault.set(`${cleanId}.docx`, healedEntry);
          vault.set(cleanId, healedEntry);
          saveBridgeFileToDisk(cleanId, 'docx', healedEntry.title, healedEntry.buffer, CURRENT_BRIDGE_SCHEMA_VERSION);
          saveBridgeFileToDisk(
            cleanId,
            'drawio',
            healedEntry.title,
            Buffer.from(xmlContent, 'utf-8'),
            CURRENT_BRIDGE_SCHEMA_VERSION
          );
          return healedEntry;
        }
      } else {
        const base64Data = (await exportDrawioToEditablePptx(
          xmlContent,
          blueprintTitle,
          blueprintCode,
          {
            returnBase64: true,
            masterImageSrc: masterImgSrc,
          }
        )) as string;

        if (base64Data && typeof base64Data === 'string') {
          const healedEntry: CloudBridgeEntry = {
            id: cleanId,
            title: blueprintTitle,
            format: 'pptx',
            buffer: Buffer.from(base64Data, 'base64'),
            createdAt: Date.now(),
            version: CURRENT_BRIDGE_SCHEMA_VERSION,
          };
          vault.set(`${cleanId}.pptx`, healedEntry);
          vault.set(cleanId, healedEntry);
          saveBridgeFileToDisk(cleanId, 'pptx', healedEntry.title, healedEntry.buffer, CURRENT_BRIDGE_SCHEMA_VERSION);
          return healedEntry;
        }
      }
    } catch (err) {
      console.error('Self-heal cloud-bridge notice:', err);
    }
  }

  return entry;
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: BRIDGE_FILE_HEADERS });
}

export async function HEAD(
  _req: NextRequest,
  context: { params: Promise<{ filename: string }> }
) {
  const { filename } = await context.params;
  const entry = await resolveOrHealEntryByFilename(filename);
  if (!entry) {
    return new NextResponse(null, { status: 404, headers: BRIDGE_FILE_HEADERS });
  }

  const contentType = getContentTypeForFormat(filename, entry.format);

  return new NextResponse(null, {
    status: 200,
    headers: {
      ...BRIDGE_FILE_HEADERS,
      'Content-Type': contentType,
      'Content-Length': entry.buffer.length.toString(),
      'Content-Disposition': `inline; filename="${filename}"`,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ filename: string }> }
) {
  const { filename } = await context.params;
  const entry = await resolveOrHealEntryByFilename(filename);
  if (!entry) {
    return new NextResponse('Bridge file expired or not found', {
      status: 404,
      headers: BRIDGE_FILE_HEADERS,
    });
  }

  const contentType = getContentTypeForFormat(filename, entry.format);
  const totalLen = entry.buffer.length;
  const rangeHeader = req.headers.get('range');

  if (rangeHeader && rangeHeader.startsWith('bytes=')) {
    const parts = rangeHeader.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : totalLen - 1;

    if (!isNaN(start) && !isNaN(end) && start >= 0 && end < totalLen && start <= end) {
      const chunk = entry.buffer.subarray(start, end + 1);
      return new NextResponse(new Uint8Array(chunk), {
        status: 206,
        headers: {
          ...BRIDGE_FILE_HEADERS,
          'Content-Type': contentType,
          'Content-Range': `bytes ${start}-${end}/${totalLen}`,
          'Content-Length': chunk.length.toString(),
          'Content-Disposition': `inline; filename="${filename}"`,
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      });
    }
  }

  return new NextResponse(new Uint8Array(entry.buffer), {
    status: 200,
    headers: {
      ...BRIDGE_FILE_HEADERS,
      'Content-Type': contentType,
      'Content-Length': totalLen.toString(),
      'Content-Disposition': `inline; filename="${filename}"`,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
}
