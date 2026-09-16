import { NextRequest, NextResponse } from 'next/server';
import { getVault, loadBridgeFileFromDisk, saveBridgeFileToDisk, CloudBridgeEntry } from '../route';
import { generateAzureLandingZoneArchitectureXml } from '@/lib/masterBuilders/build_master_azure_landing_zone';
import { exportDrawioToEditablePptx } from '@/lib/export/editablePptxCompiler';

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

const SELF_HEAL_CUTOFF_TS = 1789580000000;

async function resolveOrHealEntryByFilename(filename: string): Promise<CloudBridgeEntry | null> {
  if (!filename) return null;
  const cleanId = filename.replace(/\.(pptx|docx)$/i, '');
  const vault = getVault();
  let entry = vault.get(cleanId) || vault.get(filename) || loadBridgeFileFromDisk(cleanId);

  const isAzureVis9745 =
    cleanId.toLowerCase().includes('vis9745') ||
    cleanId.toLowerCase().includes('vis_9745') ||
    cleanId.toLowerCase().includes('azure');

  // Self-heal if missing OR if it's an older pre-fix VIS-9745 PPTX
  if ((!entry || (isAzureVis9745 && entry.createdAt < SELF_HEAL_CUTOFF_TS)) && isAzureVis9745) {
    try {
      const xmlContent = generateAzureLandingZoneArchitectureXml();
      const base64Data = (await exportDrawioToEditablePptx(
        xmlContent,
        'Microsoft Azure Application Landing Zone',
        'VIS-9745',
        {
          returnBase64: true,
          masterImageSrc: '/blueprints/azure_application_landing_zone.png',
        }
      )) as string;

      if (base64Data && typeof base64Data === 'string') {
        const healedEntry: CloudBridgeEntry = {
          id: 'VIS-9745',
          title: 'Microsoft Azure Application Landing Zone',
          format: 'pptx',
          buffer: Buffer.from(base64Data, 'base64'),
          createdAt: Date.now(),
        };
        vault.set(cleanId, healedEntry);
        saveBridgeFileToDisk(cleanId, 'pptx', healedEntry.title, healedEntry.buffer);
        return healedEntry;
      }
    } catch (err) {
      console.error('Self-heal VIS-9745 cloud-bridge notice:', err);
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

  const contentType =
    entry.format === 'pptx'
      ? 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
      : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

  return new NextResponse(null, {
    status: 200,
    headers: {
      ...BRIDGE_FILE_HEADERS,
      'Content-Type': contentType,
      'Content-Length': entry.buffer.length.toString(),
      'Content-Disposition': `inline; filename="${filename}"`,
      'Cache-Control': 'public, max-age=3600',
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

  const contentType =
    entry.format === 'pptx'
      ? 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
      : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

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
          'Cache-Control': 'public, max-age=3600',
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
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
