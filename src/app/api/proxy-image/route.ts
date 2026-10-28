import { NextRequest, NextResponse } from 'next/server';

const ALLOWED_IMAGE_MIME_TYPES = new Set([
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/webp',
  'image/gif',
  'image/avif',
  'image/svg+xml',
  'image/x-icon',
  'image/vnd.microsoft.icon',
]);

function isPrivateOrMetadataHost(hostname: string): boolean {
  const h = hostname.trim().toLowerCase().replace(/^\[|\]$/g, '');
  if (
    h === 'localhost' ||
    h === '0.0.0.0' ||
    h === '::1' ||
    h === '0:0:0:0:0:0:0:1' ||
    h === 'metadata.google.internal' ||
    h === 'metadata' ||
    h.endsWith('.internal') ||
    h.endsWith('.local')
  ) {
    return true;
  }
  if (/^127\./.test(h) || /^10\./.test(h) || /^192\.168\./.test(h) || /^169\.254\./.test(h) || /^0\./.test(h)) {
    return true;
  }
  const m172 = h.match(/^172\.(\d+)\./);
  if (m172) {
    const second = Number(m172[1]);
    if (second >= 16 && second <= 31) return true;
  }
  if (/^(fc00:|fd00:|fe80:)/i.test(h)) {
    return true;
  }
  return false;
}

function normalizeImageMime(rawContentType: string | null): string | null {
  const clean = (rawContentType || '').split(';')[0].trim().toLowerCase();
  if (!clean) return 'image/png';
  if (ALLOWED_IMAGE_MIME_TYPES.has(clean)) return clean;
  return null;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 });
  }

  try {
    const parsed = new URL(targetUrl);
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return NextResponse.json({ error: 'Invalid URL protocol' }, { status: 400 });
    }
    if (isPrivateOrMetadataHost(parsed.hostname)) {
      return NextResponse.json({ error: 'Forbidden internal/metadata target host' }, { status: 403 });
    }

    const res = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
      },
      signal: AbortSignal.timeout(10000),
      redirect: 'manual',
    });

    if (!res.ok) {
      return NextResponse.json({ error: `Upstream returned status ${res.status}` }, { status: res.status });
    }

    const safeMime = normalizeImageMime(res.headers.get('content-type'));
    if (!safeMime) {
      return NextResponse.json({ error: 'Upstream response is not an allowed image MIME type' }, { status: 415 });
    }
    const buffer = await res.arrayBuffer();

    // If client requested base64 format
    if (searchParams.get('format') === 'base64') {
      const base64Str = Buffer.from(buffer).toString('base64');
      return NextResponse.json({
        success: true,
        mimeType: safeMime,
        base64: `data:${safeMime};base64,${base64Str}`,
        sizeBytes: buffer.byteLength
      });
    }

    // Stream raw binary image with CORS + sandbox CSP headers
    return new NextResponse(Buffer.from(buffer), {
      status: 200,
      headers: {
        'Content-Type': safeMime,
        'Content-Length': buffer.byteLength.toString(),
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=86400, immutable',
        'X-Content-Type-Options': 'nosniff',
        'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; sandbox",
      }
    });
  } catch (error: any) {
    console.error('[ProxyImage] Error fetching image:', error);
    return NextResponse.json({ error: error?.message || 'Failed to proxy image' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (!url) {
      return NextResponse.json({ error: 'Missing url' }, { status: 400 });
    }

    const parsed = new URL(url);
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return NextResponse.json({ error: 'Invalid protocol' }, { status: 400 });
    }
    if (isPrivateOrMetadataHost(parsed.hostname)) {
      return NextResponse.json({ error: 'Forbidden internal/metadata target host' }, { status: 403 });
    }

    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
      },
      signal: AbortSignal.timeout(10000),
      redirect: 'manual',
    });

    if (!res.ok) {
      return NextResponse.json({ error: `Upstream error: ${res.status}` }, { status: res.status });
    }

    const safeMime = normalizeImageMime(res.headers.get('content-type'));
    if (!safeMime) {
      return NextResponse.json({ error: 'Upstream response is not an allowed image MIME type' }, { status: 415 });
    }
    const buffer = await res.arrayBuffer();
    const base64Str = Buffer.from(buffer).toString('base64');

    return NextResponse.json({
      success: true,
      mimeType: safeMime,
      base64: `data:${safeMime};base64,${base64Str}`,
      sizeBytes: buffer.byteLength
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to proxy image' }, { status: 500 });
  }
}
