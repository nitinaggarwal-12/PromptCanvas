import { NextRequest, NextResponse } from 'next/server';
import {
  getVault,
  loadBridgeFileFromDisk,
  saveBridgeFileToDisk,
  CloudBridgeEntry,
  CURRENT_BRIDGE_SCHEMA_VERSION,
} from '../route';
import { generateAzureLandingZoneArchitectureXml } from '@/lib/masterBuilders/build_master_azure_landing_zone';
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

  const isAzureBlueprint =
    cleanId.toLowerCase().includes('vis9745') ||
    cleanId.toLowerCase().includes('vis_9745') ||
    cleanId.toLowerCase().includes('vis5965') ||
    cleanId.toLowerCase().includes('vis_5965') ||
    cleanId.toLowerCase().includes('azure') ||
    cleanId.toLowerCase().includes('vis');

  // Self-heal on demand if missing or outdated
  if (!entry && isAzureBlueprint) {
    try {
      const xmlContent = generateAzureLandingZoneArchitectureXml();
      const blueprintTitle = cleanId.toLowerCase().includes('5965')
        ? 'Azure Application Landing Zone (VIS-5965)'
        : 'Microsoft Azure Application Landing Zone';
      const blueprintCode = cleanId.toLowerCase().includes('5965') ? 'VIS-5965' : 'VIS-9745';

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
            masterImageSrc: '/blueprints/azure_application_landing_zone.png',
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
          // Also pre-save companion .drawio file for instant 1-click Draw.io Web Editor opening
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
            masterImageSrc: '/blueprints/azure_application_landing_zone.png',
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
