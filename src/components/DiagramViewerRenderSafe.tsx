'use client';

import React from 'react';
import { validateAndHealDrawioXml } from '@/lib/xmlHealer';
import { getDefaultXmlForArchitecture } from '@/lib/architectureTypes';
import { SupportedLanguage, translateDiagramXmlToLanguage } from '@/lib/i18n';
import { localizeDrawioXmlDeep } from '@/lib/diagramLanguageLocalizer';
import { sanitizeDrawioXmlAttributes } from '@/lib/diagramCleaner';
import { DiagramErrorBoundary } from './DiagramErrorBoundary';

export interface DiagramViewerRenderSafeProps {
  currentLanguage?: SupportedLanguage;
  xml: string;
  diagramId?: string;
  versionId?: string;
  aspectRatioId?: string;
  customW?: number;
  customH?: number;
  bgTheme?: 'dark' | 'light';
  useCaseName?: string;
  diagramType?: string;
  description?: string;
  isLiveFlow?: boolean;
  allowFullScaleScroll?: boolean;
}

/**
 * Viewer-safe Draw.io renderer.
 *
 * Root-cause guard for the large black overlay regression:
 * the previous viewer forced every direct child <div> emitted by viewer-static.min.js
 * to width:100%/height:auto. Draw.io can emit transient overlay/toolbar DIVs next to the
 * actual SVG; stretching those nodes can turn a small opaque control surface into a
 * canvas-sized rectangle. Only the rendered SVG is now resized. A defensive runtime
 * guard also suppresses oversized opaque-black viewer artifacts while preserving real
 * diagram content.
 */
export default function DiagramViewerRenderSafe({
  currentLanguage = 'en',
  xml,
  diagramId,
  versionId,
  aspectRatioId = '16:9',
  customW = 16,
  customH = 10,
  bgTheme = 'light',
  diagramType,
  isLiveFlow = false,
  allowFullScaleScroll = false,
}: DiagramViewerRenderSafeProps) {
  const [mounted, setMounted] = React.useState(false);
  const [isCompactViewport, setIsCompactViewport] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    document.body.classList.add('pc-diagram-viewer-active');
    const widthQuery = window.matchMedia('(max-width: 1280px)');
    const pointerQuery = window.matchMedia('(pointer: coarse)');
    const sync = () => setIsCompactViewport(widthQuery.matches || pointerQuery.matches);
    sync();
    widthQuery.addEventListener?.('change', sync);
    pointerQuery.addEventListener?.('change', sync);
    return () => {
      document.body.classList.remove('pc-diagram-viewer-active');
      widthQuery.removeEventListener?.('change', sync);
      pointerQuery.removeEventListener?.('change', sync);
    };
  }, []);

  const sanitizedXml = React.useMemo(() => {
    if (!xml) return getDefaultXmlForArchitecture(diagramType || 'unified_system_view') || '';
    const rawStr = typeof xml === 'string' ? xml : String(xml);
    try {
      const healed = validateAndHealDrawioXml(rawStr, diagramType);
      if (!healed.xml || healed.xml.length < 100) {
        return getDefaultXmlForArchitecture(diagramType || 'unified_system_view') || '';
      }
      return healed.xml;
    } catch (err) {
      console.error('[DiagramViewerRenderSafe] XML healing failed, using catalog fallback:', err);
      return getDefaultXmlForArchitecture(diagramType || 'unified_system_view') || '';
    }
  }, [xml, diagramType]);

  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const scriptUrl = `${origin}/viewer-static.min.js`;

  let containerDimensions = 'w-full h-full max-w-full';
  if (aspectRatioId === '1:1') containerDimensions = 'w-full max-w-[950px] h-[980px]';
  else if (aspectRatioId === '9:16') containerDimensions = 'w-full max-w-[650px] h-[1180px]';
  else if (aspectRatioId === '4:3') containerDimensions = 'w-full max-w-[1350px] h-[1040px]';
  else if (aspectRatioId === '21:9') containerDimensions = 'w-full h-full max-w-full';

  let customHeightStyle: React.CSSProperties | undefined;
  if (aspectRatioId === 'custom' && customW > 0 && customH > 0) {
    const calcH = Math.min(1300, Math.max(600, Math.round(1000 * (customH / customW))));
    containerDimensions = 'w-full max-w-full';
    customHeightStyle = { height: `${calcH}px` };
  }

  const responsiveFrameStyle: React.CSSProperties = {
    ...customHeightStyle,
    height: '100%',
    minHeight: allowFullScaleScroll ? '760px' : '450px',
    width: '100%',
    ...(isCompactViewport && aspectRatioId !== '9:16' && aspectRatioId !== '16:9'
      ? { height: 'clamp(440px, 56vw, 720px)', minHeight: 0, alignSelf: 'flex-start' }
      : {}),
  };

  const bgColor = bgTheme === 'light' ? '#FFFFFF' : '#0F172A';
  const translatedXml = sanitizeDrawioXmlAttributes(
    localizeDrawioXmlDeep(
      translateDiagramXmlToLanguage(sanitizedXml, currentLanguage || 'en'),
      currentLanguage || 'en',
    ),
  );
  const aggressiveOverlayGuard = /ai_trism|llm_capacity|equipment_optimization|predictive_maintenance/i.test(
    `${diagramType || ''} ${diagramId || ''}`,
  );

  const iframeHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
${origin ? `<base href="${origin}/">` : ''}
<style>
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    background: ${bgColor};
    overflow: ${allowFullScaleScroll ? 'auto' : 'hidden'};
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  }
  .canvas-container {
    ${allowFullScaleScroll
      ? `position: relative; width: 100%; min-width: 1640px; min-height: 1040px; padding: 24px; box-sizing: border-box; overflow: visible; background: ${bgColor}; display: flex; align-items: center; justify-content: center;`
      : `position: absolute; inset: 0; padding: 4px; box-sizing: border-box; overflow: hidden; background: ${bgColor}; display: flex; align-items: center; justify-content: center;`}
  }
  .mxgraph {
    ${allowFullScaleScroll
      ? `width: 1600px !important; min-width: 1600px !important; height: 1000px !important; min-height: 1000px !important; display: block !important; margin: 0 auto; background: transparent;`
      : `width: 100%; height: 100%; min-height: 100%; display: flex; align-items: center; justify-content: center; background: transparent;`}
  }

  /* IMPORTANT: resize and scale the diagram SVG to fit neatly without clipping or distortion */
  .mxgraph > svg,
  .mxgraph > div > svg {
    ${allowFullScaleScroll
      ? `width: 1600px !important; min-width: 1600px !important; height: 1000px !important; min-height: 1000px !important; margin: auto !important; display: block !important;`
      : `width: 100% !important; max-width: 100% !important; height: 100% !important; max-height: 100% !important; margin: auto !important; display: block !important; object-fit: contain !important;`}
  }
  .mxgraph > div {
    ${allowFullScaleScroll
      ? `width: 1600px !important; min-width: 1600px !important; height: 1000px !important; min-height: 1000px !important; display: block;`
      : `width: 100%; max-width: 100%; height: 100%; max-height: 100%; display: flex; align-items: center; justify-content: center;`}
  }
  .geEditor { background-color: transparent !important; }

  /* Smooth customized scrollbars */
  ::-webkit-scrollbar { width: 8px; height: 8px; }
  ::-webkit-scrollbar-track { background: ${bgColor}; }
  ::-webkit-scrollbar-thumb { background: ${bgTheme === 'dark' ? '#334155' : '#CBD5E1'}; border-radius: 4px; }
  ::-webkit-scrollbar-thumb:hover { background: ${bgTheme === 'dark' ? '#475569' : '#94A3B8'}; }

  ${isLiveFlow ? `@keyframes flowPulse { 0% { stroke-dashoffset:48; } 100% { stroke-dashoffset:0; } }
  svg path[stroke-dasharray], svg g[data-cell-id] path[stroke], svg .geEdge path { animation:flowPulse 1.1s linear infinite !important; }` : ''}
</style>
</head>
<body>
<div class="canvas-container">
  <div class="mxgraph" id="diagram-container"></div>
</div>
<script>
  if (typeof window.btoa === 'function') {
    const _btoa = window.btoa.bind(window);
    window.btoa = function(str) {
      try { return _btoa(str); }
      catch (e) { return _btoa(unescape(encodeURIComponent(str))); }
    };
  }

  const canvasContainer = document.querySelector('.canvas-container');
  const aggressiveOverlayGuard = ${aggressiveOverlayGuard ? 'true' : 'false'};

  function getCleanGraphXml(xmlStr) {
    if (!xmlStr) return '';
    const trimmed = xmlStr.trim();
    if (trimmed.startsWith('<mxfile') || trimmed.includes('<mxfile')) {
      const s = trimmed.indexOf('<mxfile');
      const e = trimmed.lastIndexOf('</mxfile>');
      if (s !== -1 && e !== -1) {
        return trimmed.substring(s, e + 9);
      }
    }
    const s = trimmed.indexOf('<mxGraphModel');
    const e = trimmed.lastIndexOf('</mxGraphModel>');
    if (s !== -1 && e !== -1) {
      const modelXml = trimmed.substring(s, e + 15);
      return '<mxfile host="embed.diagrams.net"><diagram id="diagram_1" name="Diagram">' + modelXml + '</diagram></mxfile>';
    }
    return trimmed;
  }

  const configObj = ${JSON.stringify({
    xml: translatedXml,
    lightbox: false,
    nav: false,
    resize: !allowFullScaleScroll,
    toolbar: '',
    edit: '',
    border: allowFullScaleScroll ? 10 : 20,
    transparent: true,
    fit: !allowFullScaleScroll,
    'max-scale': 4.0,
  })};
  configObj.fit = ${allowFullScaleScroll ? 'false' : 'true'};
  configObj.xml = getCleanGraphXml(configObj.xml);

  const root = document.getElementById('diagram-container');
  if (root) root.setAttribute('data-mxgraph', JSON.stringify(configObj));

  function isOpaqueBlack(value) {
    const compact = String(value || '').replace(/\s/g, '').toLowerCase();
    return compact === 'rgb(0,0,0)' || compact === 'rgba(0,0,0,1)' || compact === '#000' || compact === '#000000' || compact === 'black';
  }

  function suppressOversizedBlackOverlay() {
    if (!root) return;
    const rootRect = root.getBoundingClientRect();
    const rootArea = Math.max(1, rootRect.width * rootRect.height);

    root.querySelectorAll('div').forEach(function(node) {
      if (!(node instanceof HTMLElement)) return;
      if (node.querySelector('svg')) return;
      const rect = node.getBoundingClientRect();
      const style = getComputedStyle(node);
      const ratio = (rect.width * rect.height) / rootArea;
      if (isOpaqueBlack(style.backgroundColor) && ratio >= 0.08) {
        node.style.setProperty('display', 'none', 'important');
        node.setAttribute('data-pc-suppressed-oversized-overlay', 'true');
      }
    });

    if (aggressiveOverlayGuard) {
      const svg = root.querySelector('svg');
      if (!svg) return;
      svg.querySelectorAll('rect,path,polygon').forEach(function(node) {
        if (!(node instanceof SVGGraphicsElement)) return;
        const rect = node.getBoundingClientRect();
        const style = getComputedStyle(node);
        const ratio = (rect.width * rect.height) / rootArea;
        if (isOpaqueBlack(style.fill) && ratio >= 0.12) {
          node.style.setProperty('display', 'none', 'important');
          node.setAttribute('data-pc-suppressed-oversized-overlay', 'true');
        }
      });
    }
  }

  function finishPresentation() {
    if (canvasContainer) {
      canvasContainer.scrollTop = 0;
      canvasContainer.scrollLeft = 0;
    }
    suppressOversizedBlackOverlay();
  }

  let renderAttempts = 0;
  let renderSucceeded = false;

  function triggerRender() {
    renderAttempts++;
    if (window.GraphViewer && typeof window.GraphViewer.processElements === 'function') {
      try {
        window.GraphViewer.processElements();
        renderSucceeded = true;
      } catch(e) {
        console.warn('[DiagramViewer] processElements warning:', e);
      }
    }
    requestAnimationFrame(finishPresentation);
    [20, 80, 200, 500, 1000].forEach(function(ms) { setTimeout(finishPresentation, ms); });

    // Ensure asynchronous or slow script executions on cloud deployments are retried until rendered
    if (!renderSucceeded && renderAttempts < 40) {
      setTimeout(triggerRender, 50);
    }
  }
</script>
<script src="${scriptUrl}" onload="triggerRender()" onerror="this.src='/viewer-static.min.js';"></script>
<script>
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(triggerRender, 30);
  } else {
    window.addEventListener('DOMContentLoaded', triggerRender);
    window.addEventListener('load', triggerRender);
  }
  // Secondary fallback timer for slow mobile/cellular networks
  setTimeout(triggerRender, 300);
  setTimeout(triggerRender, 800);
</script>
</body>
</html>`;

  const containerBgClass = bgTheme === 'light'
    ? 'bg-white border-slate-300 shadow-xl'
    : 'bg-[#0F172A] border-panel-border/20 shadow-2xl';

  if (!mounted) {
    return (
      <div
        style={responsiveFrameStyle}
        className={`${containerDimensions} relative rounded-xl overflow-hidden ${containerBgClass} transition-all duration-300 mx-auto flex items-center justify-center`}
      >
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <div className="w-4 h-4 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
          <span>Rendering Architecture Blueprint...</span>
        </div>
      </div>
    );
  }

  return (
    <DiagramErrorBoundary fallbackXml={sanitizedXml}>
      <div
        style={responsiveFrameStyle}
        className={`${containerDimensions} relative rounded-xl overflow-hidden ${containerBgClass} transition-all duration-300 mx-auto`}
      >
        <iframe
          key={`safe_iframe_${diagramId || 'd'}_${versionId || 'v'}_${aspectRatioId}_${bgTheme}_${sanitizedXml.length}_${sanitizedXml.slice(60, 120)}`}
          srcDoc={iframeHtml}
          className="w-full h-full min-h-[760px] border-0 bg-transparent"
          title="PromptCanvas Draw.io Diagram Viewer"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
      </div>
    </DiagramErrorBoundary>
  );
}
