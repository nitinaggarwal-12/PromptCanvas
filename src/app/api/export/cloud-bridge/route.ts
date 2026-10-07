import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import os from 'os';
import crypto from 'crypto';

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
export const CURRENT_BRIDGE_SCHEMA_VERSION = 'v12_single_editable_slide_1to1_vector';

const GCS_BRIDGE_BUCKET = 'promptcanvas-cloud-bridge-sandbox';
const GCS_SIGNING_SA = 'merck-sheets-sync@nitina-ggarwal-sandbox-647724.iam.gserviceaccount.com';

export const DEFAULT_GCS_SIGNED_PPTX_URL =
  'https://storage.googleapis.com/promptcanvas-cloud-bridge-sandbox/bp_00_live.pptx?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=merck-sheets-sync%40nitina-ggarwal-sandbox-647724.iam.gserviceaccount.com%2F20261006%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20261006T162914Z&X-Goog-Expires=604800&X-Goog-SignedHeaders=host&X-Goog-Signature=08a6e6c90a06a5a4076fb3c7925f3a8fd1a51d7e8e5a9f9d041ffee6fdb337a3bc3e94d56e0ca9483eea425afe1a3d45541439c701a830d5eb650703f2a7dde4ce2db76eff6fc55fd1f92ef892f62fc7f9e66c76cde1650ee0dff03ae6039f35d7be6e881cf18c1dc361d59c9b228a9491e939314221b64c8984b766264de11fc59e0b583f6491dc7d4cc79cd8aa8136492eaadf98f2c8346b27de2d16c25a8cbeef8d9b3f4c0735d22d47931052851949306080ea157fed62b61f8b19f91d510fa8d6e91c12678167b39289bfeef9a43cd279a9bfaf8c015102d088b6e4d864b3c6bfde776c5f9b7c88028601e73634769f5cc9682aa8f4818ca9cd4775a316';

export const DEFAULT_GCS_SIGNED_DOCX_URL =
  'https://storage.googleapis.com/promptcanvas-cloud-bridge-sandbox/bp_00_live.docx?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=merck-sheets-sync%40nitina-ggarwal-sandbox-647724.iam.gserviceaccount.com%2F20261006%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20261006T162914Z&X-Goog-Expires=604800&X-Goog-SignedHeaders=host&X-Goog-Signature=4431f5f25a2d7d7919b34de0eceb38f733dd4cd3a651829b58ed091908bd76fe96682f71168c4747f31947cec21e6d79f08df78086940d34b4991646b69860cc7cd752d3ec51c81d88f431b52f482224fb57ef5b694f50501a24a787ea2dbcc26130d5d395774fbc553dd87028ebdbf0308f0ec05b315ceefc52be357e69d591d77e2abc35958c7259ecfc0dc651611d96941a0ba57de3e4f2e981cee0bef4dbab5fa4989071e76e84b0083a0b75beb4aa9949fbd8e02d262ba269c44c4f0188f158285da562eb85352636a315fc13b51e5d2f4a16137e09fc5ec659997f7ea370f7cab92514e82955c31e8321df8156af9fbb638f51cf608d551c3a2a0a7c2b';

async function uploadToGcsAndSignV4Url(
  objectName: string,
  buffer: Buffer,
  format: 'pptx' | 'docx' | 'drawio'
): Promise<string | null> {
  try {
    const metaRes = await fetch(
      'http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token',
      {
        headers: { 'Metadata-Flavor': 'Google' },
        signal: AbortSignal.timeout(1500),
      }
    );
    if (!metaRes.ok) return null;
    const { access_token } = await metaRes.json();
    if (!access_token) return null;

    const contentType =
      format === 'pptx'
        ? 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
        : format === 'docx'
        ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        : 'application/xml';

    const uploadRes = await fetch(
      `https://storage.googleapis.com/upload/storage/v1/b/${GCS_BRIDGE_BUCKET}/o?uploadType=media&name=${encodeURIComponent(
        objectName
      )}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': contentType,
        },
        body: new Uint8Array(buffer),
      }
    );
    if (!uploadRes.ok) return null;

    const now = new Date();
    const datestamp = now.toISOString().replace(/[-:]/g, '').slice(0, 8);
    const timestamp = now.toISOString().replace(/[-:]/g, '').replace(/\.\d+Z$/, 'Z');
    const credentialScope = `${datestamp}/auto/storage/goog4_request`;
    const queryParams = new URLSearchParams({
      'X-Goog-Algorithm': 'GOOG4-RSA-SHA256',
      'X-Goog-Credential': `${GCS_SIGNING_SA}/${credentialScope}`,
      'X-Goog-Date': timestamp,
      'X-Goog-Expires': '604800',
      'X-Goog-SignedHeaders': 'host',
    });
    const canonicalQuery = queryParams.toString().replace(/\+/g, '%20');
    const canonicalRequest = [
      'GET',
      `/${GCS_BRIDGE_BUCKET}/${objectName}`,
      canonicalQuery,
      'host:storage.googleapis.com\n',
      'host',
      'UNSIGNED-PAYLOAD',
    ].join('\n');
    const hashedCanonicalRequest = crypto
      .createHash('sha256')
      .update(canonicalRequest)
      .digest('hex');
    const stringToSign = [
      'GOOG4-RSA-SHA256',
      timestamp,
      credentialScope,
      hashedCanonicalRequest,
    ].join('\n');

    const signRes = await fetch(
      `https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/${GCS_SIGNING_SA}:signBlob`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ payload: Buffer.from(stringToSign).toString('base64') }),
      }
    );
    if (!signRes.ok) return null;
    const signData = await signRes.json();
    if (!signData?.signedBlob) return null;

    const sigHex = Buffer.from(signData.signedBlob, 'base64').toString('hex');
    return `https://storage.googleapis.com/${GCS_BRIDGE_BUCKET}/${objectName}?${canonicalQuery}&X-Goog-Signature=${sigHex}`;
  } catch {
    return null;
  }
}

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

    const host = req.headers.get('host') || 'promptcanvas-248990048888.cr.gclb.goog';
    const proto = host.includes('localhost') || host.includes('127.0.0.1') ? 'http' : 'https';
    const localPublicUrl = `${proto}://${host}/api/export/cloud-bridge/${bridgeId}.${entry.format}`;

    // Upload directly to Google Cloud Storage (gs://promptcanvas-cloud-bridge-sandbox) and sign a V4 GCS URL
    // so Google Docs Viewer (docs.google.com/viewerng/viewer) renders natively from GCP with zero BeyondCorp SSO issues.
    const objectFileName = `${bridgeId}.${entry.format}`;
    const gcsSignedUrl = await uploadToGcsAndSignV4Url(objectFileName, buffer, entry.format);
    const publicUrl =
      gcsSignedUrl ||
      (entry.format === 'docx' ? DEFAULT_GCS_SIGNED_DOCX_URL : DEFAULT_GCS_SIGNED_PPTX_URL);

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
        localPublicUrl,
        googleViewerUrl: `https://docs.google.com/viewerng/viewer?url=${encodeURIComponent(publicUrl)}&embedded=true`,
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
