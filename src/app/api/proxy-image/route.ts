import { NextRequest, NextResponse } from 'next/server';

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

    const res = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
      }
    });

    if (!res.ok) {
      return NextResponse.json({ error: `Upstream returned status ${res.status}` }, { status: res.status });
    }

    const contentType = res.headers.get('content-type') || 'image/png';
    const buffer = await res.arrayBuffer();

    // If client requested base64 format
    if (searchParams.get('format') === 'base64') {
      const base64Str = Buffer.from(buffer).toString('base64');
      return NextResponse.json({
        success: true,
        mimeType: contentType,
        base64: `data:${contentType};base64,${base64Str}`,
        sizeBytes: buffer.byteLength
      });
    }

    // Stream raw binary image with CORS headers
    return new NextResponse(Buffer.from(buffer), {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Length': buffer.byteLength.toString(),
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=86400, immutable'
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

    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
      }
    });

    if (!res.ok) {
      return NextResponse.json({ error: `Upstream error: ${res.status}` }, { status: res.status });
    }

    const contentType = res.headers.get('content-type') || 'image/png';
    const buffer = await res.arrayBuffer();
    const base64Str = Buffer.from(buffer).toString('base64');

    return NextResponse.json({
      success: true,
      mimeType: contentType,
      base64: `data:${contentType};base64,${base64Str}`,
      sizeBytes: buffer.byteLength
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to proxy image' }, { status: 500 });
  }
}
