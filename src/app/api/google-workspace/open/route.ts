import { NextRequest, NextResponse } from 'next/server';
import {
  loadCloudViewerManifest,
  normalizeManifestKey,
  resolveFallbackWorkstreamKey,
  uploadHtmlOrDocxToGoogleDocs,
  uploadPptxBufferToGoogleSlides,
} from '@/lib/server/googleWorkspaceBridge';
import { exportDrawioToEditablePptx, cleanHtmlToPlainText, parseDrawioXmlForPptx } from '@/lib/export/editablePptxCompiler';
import { CANONICAL_TEMPLATES } from '@/lib/canonical/canonicalTemplates';
import { getPrecompiledBlueprint } from '@/lib/visionBlueprintStore';
import {
  OFFICIAL_ARCH_CENTER_BLUEPRINTS,
  compileOfficialArchCenterDrawioXml,
} from '@/lib/canonical/templateOfficialGcpArchCenterHubSpoke';
import { buildUniversalClosedLoopDomainHarnessXml } from '@/lib/canonical/nasaMultiverseClosedLoopHarness';

export const dynamic = 'force-dynamic';

function resolveServerDiagramXmlAndTitle(rawKey: string, fallbackTitle?: string): { xml: string; title: string } {
  const clean = String(rawKey || '').trim();
  const combined = `${clean} ${fallbackTitle || ''}`;

  if (/nasa|multiverse|multi-universe|closed-loop/i.test(combined)) {
    return {
      xml: buildUniversalClosedLoopDomainHarnessXml({
        prompt:
          fallbackTitle ||
          'NASA Closed-Loop Mission Control & Parallel Multi-Universe Digital-Twin Agentic Harness',
        theme: 'light',
      }),
      title:
        fallbackTitle ||
        'NASA Closed-Loop Mission Control & Parallel Multi-Universe Digital-Twin Agentic Harness',
    };
  }

  // 1. Check Official Arch Center variants (ws1-multi-tenant-taxonomy-overview, etc.)
  const archBp = OFFICIAL_ARCH_CENTER_BLUEPRINTS.find((b) => b.id === clean);
  if (archBp) {
    return {
      xml: compileOfficialArchCenterDrawioXml(archBp),
      title: fallbackTitle || `${archBp.title} — ${archBp.subtitle}`,
    };
  }

  // 2. Check Precompiled Enterprise Blueprints (GCP-MULTIAGENT-01, etc.)
  const pre = getPrecompiledBlueprint(clean);
  if (pre && pre.xml) {
    return {
      xml: pre.xml,
      title: fallbackTitle || pre.title,
    };
  }

  // 3. Check Canonical Templates (#01..#78 or BP-01..BP-78)
  const numMatch = clean.match(/(\d{1,2})$/);
  const paddedId = numMatch ? numMatch[1].padStart(2, '0') : '78';
  if (paddedId === '78') {
    const defaultBp = OFFICIAL_ARCH_CENTER_BLUEPRINTS[0];
    return {
      xml: compileOfficialArchCenterDrawioXml(defaultBp),
      title: fallbackTitle || 'Official Google Cloud Architecture Center Hub-and-Spoke (#78)',
    };
  }

  const tpl =
    CANONICAL_TEMPLATES.find((t) => String(t.id) === paddedId || String(t.id) === clean) ||
    CANONICAL_TEMPLATES[0];
  const xml =
    typeof tpl.generateXml === 'function' ? tpl.generateXml('cloud', 'light') : (tpl as any).xml || '';
  return {
    xml,
    title: fallbackTitle || `${tpl.name} (Blueprint #${tpl.id})`,
  };
}

function buildHtmlSpecFromXml(xml: string, title: string, key: string, extraMarkdown?: string): string {
  const { cells } = parseDrawioXmlForPptx(xml);
  const vertices = cells.filter((c) => c.vertex && cleanHtmlToPlainText(c.value).title.length > 0);
  const edges = cells.filter((c) => c.edge);

  const rowsHtml = vertices
    .slice(0, 80)
    .map((node, idx) => {
      const parsed = cleanHtmlToPlainText(node.value);
      return `<tr>
        <td style="border:1px solid #dadce0;padding:6px 9px;font-family:monospace;font-size:9pt;color:#174ea6;">OBJ-${String(
          idx + 1
        ).padStart(2, '0')}</td>
        <td style="border:1px solid #dadce0;padding:6px 9px;font-weight:bold;color:#202124;">${parsed.title}</td>
        <td style="border:1px solid #dadce0;padding:6px 9px;color:#3c4043;">${
          parsed.subtitle || 'Enterprise Google Cloud Architecture Component'
        }</td>
      </tr>`;
    })
    .join('');

  const narrativeHtml = extraMarkdown
    ? `<div style="margin:16px 0;padding:12px 16px;background:#f8f9fa;border:1px solid #dadce0;">${extraMarkdown
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br/>')}</div>`
    : '';

  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>${title}</title></head>
  <body style="font-family:'Google Sans',Roboto,Arial,sans-serif;color:#202124;line-height:1.55;font-size:11pt;max-width:760px;margin:0 auto;">
    <div style="border-top:5px solid #1a73e8;padding:10px 14px;background:#e8f0fe;margin-bottom:18px;">
      <div style="font-size:9pt;font-weight:bold;color:#174ea6;text-transform:uppercase;">PromptCanvas Enterprise Architecture • Editable Google Docs Specification</div>
      <div style="font-size:9pt;color:#5f6368;">Blueprint Key: <code>${key}</code> • Vector Components: ${vertices.length} • Connectors: ${edges.length}</div>
    </div>
    <h1 style="font-size:20pt;color:#174ea6;border-bottom:2px solid #1a73e8;padding-bottom:6px;">${title}</h1>
    <div style="margin:10px 0;padding:10px 14px;background:#e8f0fe;border-left:4px solid #1a73e8;color:#174ea6;">
      <b>Executive Summary:</b> Production-grade architecture topology decomposed into ${vertices.length} editable vector components and ${edges.length} orthogonal connectors for Google Slides &amp; Google Docs collaboration.
    </div>
    ${narrativeHtml}
    <h2 style="font-size:15pt;color:#1a73e8;margin-top:18px;margin-bottom:6px;">Component Inventory &amp; Technical Specification Matrix</h2>
    <table style="width:100%;border-collapse:collapse;margin:14px 0;font-size:9.5pt;">
      <tr>
        <th style="border:1px solid #dadce0;background:#174ea6;color:#ffffff;padding:7px 9px;text-align:left;">Object ID</th>
        <th style="border:1px solid #dadce0;background:#174ea6;color:#ffffff;padding:7px 9px;text-align:left;">Component Name</th>
        <th style="border:1px solid #dadce0;background:#174ea6;color:#ffffff;padding:7px 9px;text-align:left;">Technical Role &amp; Specification</th>
      </tr>
      ${rowsHtml}
    </table>
  </body></html>`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const rawKey = String(body.key || body.blueprintId || 'WS1').trim();
    const normalizedKey = normalizeManifestKey(rawKey, body.title);
    const mode = String(body.mode || 'slides').trim().toLowerCase();
    const force = Boolean(body.force);
    const accessTokenOverride = String(body.accessToken || '').trim() || null;

    const manifest = loadCloudViewerManifest();
    const fbWsKey = resolveFallbackWorkstreamKey(rawKey);

    // 1. Google Docs mode
    if (mode === 'docs') {
      const existingDoc =
        manifest.docs[normalizedKey] || (fbWsKey && !body.htmlContent && !body.base64Docx ? manifest.docs[fbWsKey] : undefined);
      if (!force && existingDoc && existingDoc.googleDocsId && !body.base64Docx && !body.htmlContent) {
        const docKey = existingDoc.key || normalizedKey;
        return NextResponse.json({
          ok: true,
          mode: 'docs',
          key: docKey,
          url: existingDoc.googleDocsEditUrl,
          editUrl: existingDoc.googleDocsEditUrl,
          previewUrl: existingDoc.googleDocsPreviewUrl,
          pdfUrl: `/api/google-workspace/pdf?key=${encodeURIComponent(docKey)}&mode=docs`,
          directPdfUrl: existingDoc.googleDocsPdfUrl,
          entry: existingDoc,
        });
      }

      const resolved = resolveServerDiagramXmlAndTitle(rawKey, body.title);
      const xmlToUse = String(body.xmlContent || '').includes('<mxCell') ? String(body.xmlContent) : resolved.xml;
      const titleToUse = String(body.title || resolved.title).trim();

      let contentBuffer: Buffer;
      let sourceMimeType:
        | 'text/html; charset=UTF-8'
        | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

      if (body.base64Docx && typeof body.base64Docx === 'string') {
        contentBuffer = Buffer.from(body.base64Docx, 'base64');
        sourceMimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      } else {
        const htmlStr =
          body.htmlContent && typeof body.htmlContent === 'string'
            ? body.htmlContent
            : buildHtmlSpecFromXml(xmlToUse, titleToUse, normalizedKey, body.markdownContent);
        contentBuffer = Buffer.from(htmlStr, 'utf-8');
        sourceMimeType = 'text/html; charset=UTF-8';
      }

      const entry = await uploadHtmlOrDocxToGoogleDocs({
        contentBuffer,
        sourceMimeType,
        title: titleToUse,
        cacheKey: normalizedKey,
        force,
        accessTokenOverride,
      });

      return NextResponse.json({
        ok: true,
        mode: 'docs',
        key: entry.key,
        url: entry.googleDocsEditUrl,
        editUrl: entry.googleDocsEditUrl,
        previewUrl: entry.googleDocsPreviewUrl,
        pdfUrl: `/api/google-workspace/pdf?key=${encodeURIComponent(entry.key)}&mode=docs`,
        directPdfUrl: entry.googleDocsPdfUrl,
        entry,
      });
    }

    // 2. Default: Google Slides or PDF mode
    const existingSlide =
      manifest.slides[normalizedKey] || (fbWsKey && !body.base64Pptx ? manifest.slides[fbWsKey] : undefined);
    if (!force && existingSlide && existingSlide.googleSlidesId && !body.base64Pptx) {
      const slideKey = existingSlide.key || normalizedKey;
      const pdfRoute = `/api/google-workspace/pdf?key=${encodeURIComponent(slideKey)}&mode=slides`;
      const targetUrl = mode === 'pdf' ? pdfRoute : existingSlide.googleSlidesEditUrl;
      return NextResponse.json({
        ok: true,
        mode,
        key: slideKey,
        url: targetUrl,
        editUrl: existingSlide.googleSlidesEditUrl,
        previewUrl: existingSlide.googleSlidesPreviewUrl,
        embedUrl: existingSlide.googleSlidesEmbedUrl,
        pdfUrl: pdfRoute,
        directPdfUrl: existingSlide.googleSlidesPdfUrl,
        entry: existingSlide,
      });
    }

    const resolved = resolveServerDiagramXmlAndTitle(rawKey, body.title);
    const xmlToUse = String(body.xmlContent || '').includes('<mxCell') ? String(body.xmlContent) : resolved.xml;
    const titleToUse = String(body.title || resolved.title).trim();

    let pptxBuffer: Buffer;
    if (body.base64Pptx && typeof body.base64Pptx === 'string') {
      pptxBuffer = Buffer.from(body.base64Pptx, 'base64');
    } else {
      const b64 = (await exportDrawioToEditablePptx(xmlToUse, titleToUse, normalizedKey, {
        returnBase64: true,
        masterImageSrc: body.masterImageSrc,
        includeArchCenterGuideSlides: true,
        markdownContent: body.markdownContent,
        docId: body.docId || rawKey,
      })) as string;
      pptxBuffer = Buffer.from(b64, 'base64');
    }

    const entry = await uploadPptxBufferToGoogleSlides({
      pptxBuffer,
      title: titleToUse,
      cacheKey: normalizedKey,
      force,
      accessTokenOverride,
    });

    const pdfRoute = `/api/google-workspace/pdf?key=${encodeURIComponent(entry.key)}&mode=slides`;
    const targetUrl = mode === 'pdf' ? pdfRoute : entry.googleSlidesEditUrl;

    return NextResponse.json({
      ok: true,
      mode,
      key: entry.key,
      url: targetUrl,
      editUrl: entry.googleSlidesEditUrl,
      previewUrl: entry.googleSlidesPreviewUrl,
      embedUrl: entry.googleSlidesEmbedUrl,
      pdfUrl: pdfRoute,
      directPdfUrl: entry.googleSlidesPdfUrl,
      entry,
    });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || 'Google Workspace sync failed' },
      { status: 500 }
    );
  }
}
