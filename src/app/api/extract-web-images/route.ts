import { NextRequest, NextResponse } from 'next/server';

export interface ExtractedWebImage {
  url: string;
  proxiedUrl: string;
  alt: string;
  isProbableDiagram: boolean;
  score: number;
}

const DIAGRAM_KEYWORDS = [
  'architecture', 'diagram', 'pipeline', 'workflow', 'topology', 'overview',
  'flow', 'system', 'dataflow', 'gcp', 'cloud', 'aws', 'azure', 'infrastructure',
  'c4', 'component', 'schema', 'graph', 'database', 'network', 'blueprint'
];

const TRACKING_KEYWORDS = [
  'pixel', 'beacon', 'doubleclick', 'google-analytics', 'analytics', 'spacer.gif',
  '1x1', 'adservice', 'facebook.com/tr', 'bat.bing', 'clarity.ms', 'tracking'
];

function isLikelyTrackingImage(url: string): boolean {
  const lower = url.toLowerCase();
  return TRACKING_KEYWORDS.some(kw => lower.includes(kw));
}

function computeDiagramScore(url: string, alt: string): { isProbableDiagram: boolean; score: number } {
  const text = `${url} ${alt}`.toLowerCase();
  let score = 0;

  for (const kw of DIAGRAM_KEYWORDS) {
    if (text.includes(kw)) score += 10;
  }

  // Boost common diagram file formats
  if (text.endsWith('.png') || text.endsWith('.webp') || text.endsWith('.svg')) {
    score += 5;
  }

  // Demote tiny icons or logos
  if (text.includes('icon') || text.includes('avatar') || text.includes('logo')) {
    score -= 8;
  }

  return {
    isProbableDiagram: score >= 10,
    score
  };
}

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'Please provide a valid web URL' }, { status: 400 });
    }

    let targetUrl = url.trim();
    if (!/^https?:\/\//i.test(targetUrl)) {
      targetUrl = `https://${targetUrl}`;
    }

    let parsedBase: URL;
    try {
      parsedBase = new URL(targetUrl);
    } catch {
      return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 });
    }

    // 1. Direct Image Check: if URL directly ends in an image extension
    if (/\.(png|jpe?g|webp|svg|gif)(\?.*)?$/i.test(parsedBase.pathname)) {
      const scoring = computeDiagramScore(targetUrl, parsedBase.pathname);
      return NextResponse.json({
        success: true,
        url: targetUrl,
        pageTitle: parsedBase.pathname.split('/').pop() || 'Direct Image',
        images: [
          {
            url: targetUrl,
            proxiedUrl: `/api/proxy-image?url=${encodeURIComponent(targetUrl)}`,
            alt: parsedBase.pathname.split('/').pop() || 'Architecture Image',
            isProbableDiagram: true,
            score: scoring.score + 50
          }
        ],
        totalCount: 1
      });
    }

    // 2. Fetch Webpage HTML
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

    let html = '';
    try {
      const res = await fetch(targetUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9'
        },
        signal: controller.signal
      });

      clearTimeout(timeout);

      if (!res.ok) {
        return NextResponse.json({ error: `Website returned status ${res.status}: ${res.statusText}` }, { status: res.status });
      }

      const contentType = res.headers.get('content-type') || '';
      if (contentType.startsWith('image/')) {
        // Returned an image directly
        return NextResponse.json({
          success: true,
          url: targetUrl,
          pageTitle: 'Direct Image Asset',
          images: [
            {
              url: targetUrl,
              proxiedUrl: `/api/proxy-image?url=${encodeURIComponent(targetUrl)}`,
              alt: 'Architecture Diagram Image',
              isProbableDiagram: true,
              score: 100
            }
          ],
          totalCount: 1
        });
      }

      html = await res.text();
    } catch (err: any) {
      clearTimeout(timeout);
      return NextResponse.json({
        error: `Could not reach ${targetUrl}. ${err?.name === 'AbortError' ? 'Connection timed out (12s)' : err?.message || 'Network error'}`
      }, { status: 504 });
    }

    // 3. Extract Page Title
    const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
    const pageTitle = titleMatch ? titleMatch[1].trim() : parsedBase.hostname;

    const rawFoundImages: Array<{ url: string; alt: string }> = [];

    // Helper to safely resolve URLs
    const resolveUrl = (relOrAbs: string): string | null => {
      try {
        if (!relOrAbs || relOrAbs.startsWith('data:image/svg+xml;base64,PHN2Zy') || relOrAbs.startsWith('javascript:')) {
          return null;
        }
        if (relOrAbs.startsWith('data:image')) {
          return relOrAbs.length > 500 ? relOrAbs : null;
        }
        const resolved = new URL(relOrAbs, targetUrl).href;
        if (!['http:', 'https:'].includes(new URL(resolved).protocol)) return null;
        return resolved;
      } catch {
        return null;
      }
    };

    // 4. Extract OpenGraph & Twitter Images (High Priority)
    const ogImageMatches = html.matchAll(/<meta[^>]+(?:property|name)=["'](?:og:image|twitter:image|twitter:image:src)["'][^>]+content=["']([^"']+)["']/gi);
    for (const match of ogImageMatches) {
      const resolved = resolveUrl(match[1]);
      if (resolved) {
        rawFoundImages.push({ url: resolved, alt: `${pageTitle} (Featured Cover Image)` });
      }
    }

    // Also check content before name
    const ogReverseMatches = html.matchAll(/<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["'](?:og:image|twitter:image|twitter:image:src)["']/gi);
    for (const match of ogReverseMatches) {
      const resolved = resolveUrl(match[1]);
      if (resolved) {
        rawFoundImages.push({ url: resolved, alt: `${pageTitle} (Featured Cover Image)` });
      }
    }

    // 5. Extract <img ...> tags
    const imgTagMatches = html.matchAll(/<img\s+([^>]+)>/gi);
    for (const match of imgTagMatches) {
      const attrs = match[1];

      // Extract alt text
      const altMatch = attrs.match(/alt=["']([^"']*)["']/i);
      const alt = altMatch ? altMatch[1].trim() : '';

      // Extract src or lazy-load attributes
      const srcMatch = attrs.match(/(?:src|data-src|data-original|data-lazy-src|data-highres)=["']([^"']+)["']/i);
      if (srcMatch) {
        const resolved = resolveUrl(srcMatch[1]);
        if (resolved) {
          rawFoundImages.push({ url: resolved, alt });
        }
      }

      // Extract from srcset
      const srcsetMatch = attrs.match(/srcset=["']([^"']+)["']/i);
      if (srcsetMatch) {
        const parts = srcsetMatch[1].split(',');
        for (const part of parts) {
          const u = part.trim().split(/\s+/)[0];
          const resolved = resolveUrl(u);
          if (resolved) {
            rawFoundImages.push({ url: resolved, alt });
          }
        }
      }
    }

    // 6. Extract <source srcset="..."> inside <picture>
    const sourceMatches = html.matchAll(/<source\s+[^>]*srcset=["']([^"']+)["'][^>]*>/gi);
    for (const match of sourceMatches) {
      const parts = match[1].split(',');
      for (const part of parts) {
        const u = part.trim().split(/\s+/)[0];
        const resolved = resolveUrl(u);
        if (resolved) {
          rawFoundImages.push({ url: resolved, alt: '' });
        }
      }
    }

    // 7. De-duplicate and Filter
    const seenUrls = new Set<string>();
    const finalImages: ExtractedWebImage[] = [];

    for (const item of rawFoundImages) {
      if (seenUrls.has(item.url)) continue;
      if (isLikelyTrackingImage(item.url)) continue;

      // Filter out tiny favicon icons unless it's the only thing
      const lower = item.url.toLowerCase();
      if (lower.includes('favicon.ico') || lower.includes('apple-touch-icon') || lower.includes('icon-16x16')) {
        continue;
      }

      seenUrls.add(item.url);
      const scoring = computeDiagramScore(item.url, item.alt);

      finalImages.push({
        url: item.url,
        proxiedUrl: `/api/proxy-image?url=${encodeURIComponent(item.url)}`,
        alt: item.alt || item.url.split('/').pop()?.split('?')[0] || 'Webpage Image',
        isProbableDiagram: scoring.isProbableDiagram,
        score: scoring.score
      });
    }

    // Sort: highest score (probable architecture diagrams) first!
    finalImages.sort((a, b) => b.score - a.score);

    return NextResponse.json({
      success: true,
      url: targetUrl,
      pageTitle,
      images: finalImages.slice(0, 30), // Top 30 images max
      totalCount: finalImages.length
    });
  } catch (error: any) {
    console.error('[ExtractWebImages] Error:', error);
    return NextResponse.json({ error: error?.message || 'Failed to extract images from web URL' }, { status: 500 });
  }
}
