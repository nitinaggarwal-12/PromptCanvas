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
}

/**
 * Viewer-safe Draw.io renderer.
 *
 * Root-cause guard for the large black overlay regression:
 * the previous viewer forced every direct child <div> emitted by viewer-static.min.js
 * to width:100%/height:auto. Draw.io can emit transient overlay/toolbar DIVs next to the
 * actual SVG; stretching those nodes can turn a small opaque control surface into a
 * canvas-sized rectangle. Only the rendered SVG is now resized. A defensive runtime
 * guard also suppresses an oversized opaque-black direct overlay that contains no SVG.
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
}: DiagramViewerRenderSafeProps) {
  const [isCompactViewport, setIsCompactViewport] = React.useState(false);

  React.useEffect(() => {
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
    ...(isCompactViewport && aspectRatioId !== '9:16'
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

  const iframeHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  html, body { margin:0; padding:0; width:100%; height:100%; background:${bgColor}; overflow:hidden; font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif; }
  .canvas-container { position:absolute; inset:0; padding:4px; box-sizing:border-box; overflow:auto; overscroll-behavior:contain; -webkit-overflow-scrolling:touch; background:${bgColor}; }
  .mxgraph { width:100%; min-height:100%; display:flex; align-items:center; justify-content:center; background:transparent; }

  /* IMPORTANT: resize only the diagram SVG, never arbitrary Draw.io overlay DIVs. */
  .mxgraph > svg,
  .mxgraph > div > svg { width:100% !important; max-width:100% !important; height:auto !important; margin:0 auto !important; display:block !important; }
  .mxgraph > div { max-width:100%; }
  .geEditor { background-color:transparent !important; }

  @media (max-width:1280px), (pointer:coarse) {
    .canvas-container { padding:8px 24px 18px 8px; }
    .mxgraph { width:max(1120px, calc(100vw - 40px)); min-width:max(1120px, calc(100vw - 40px)); min-height:0; align-items:flex-start; justify-content:flex-start; }
    .mxgraph > svg,
    .mxgraph > div > svg { width:max(1120px, calc(100vw - 40px)) !important; min-width:max(1120px, calc(100vw - 40px)) !important; max-width:none !important; height:auto !important; margin:0 !important; }
  }

  ::-webkit-scrollbar { width:4px; height:4px; }
  ::-webkit-scrollbar-track { background:transparent; }
  ::-webkit-scrollbar-thumb { background:rgba(100,116,139,.4); border-radius:9999px; }

  ${isLiveFlow ? `@keyframes flowPulse { 0% { stroke-dashoffset:48; } 100% { stroke-dashoffset:0; } }
  svg path[stroke-dasharray], svg g[data-cell-id] path[stroke], svg .geEdge path { animation:flowPulse 1.1s linear infinite !important; }` : ''}
</style>
</head>
<body>
<div class="canvas-container"><div class="mxgraph" id="diagram-container"></div></div>
<script>
  if (typeof window.btoa === 'function') {
    const _btoa = window.btoa.bind(window);
    window.btoa = function(str) {
      try { return _btoa(str); }
      catch (e) { return _btoa(unescape(encodeURIComponent(str))); }
    };
  }

  const compactViewport = window.matchMedia('(max-width:1280px)').matches || window.matchMedia('(pointer:coarse)').matches;
  const canvasContainer = document.querySelector('.canvas-container');
  const storageKey = 'pc_canvas_scroll_' + ${JSON.stringify(diagramId || 'default')};

  if (canvasContainer) {
    try {
      const saved = sessionStorage.getItem(storageKey);
      if (saved && !compactViewport) {
        const pos = JSON.parse(saved);
        canvasContainer.scrollLeft = pos.left || 0;
        canvasContainer.scrollTop = pos.top || 0;
      } else {
        canvasContainer.scrollLeft = 0;
        canvasContainer.scrollTop = 0;
      }
    } catch (e) {}
    canvasContainer.addEventListener('scroll', function() {
      try { sessionStorage.setItem(storageKey, JSON.stringify({ left:canvasContainer.scrollLeft, top:canvasContainer.scrollTop })); } catch (e) {}
    });
  }

  function getCleanGraphXml(xmlStr) {
    if (!xmlStr) return '';
    const s = xmlStr.indexOf('<mxGraphModel');
    const e = xmlStr.lastIndexOf('</mxGraphModel>');
    return s !== -1 && e !== -1 ? xmlStr.substring(s, e + 15) : xmlStr;
  }

  const configObj = ${JSON.stringify({
    xml: translatedXml,
    lightbox: true,
    nav: true,
    resize: true,
    toolbar: 'zoom layers tags',
    edit: '_blank',
    border: 0,
    transparent: true,
    fit: true,
    'max-scale': 4.0,
  })};
  if (compactViewport) configObj.fit = false;
  configObj.xml = getCleanGraphXml(configObj.xml);

  const root = document.getElementById('diagram-container');
  if (root) root.setAttribute('data-mxgraph', JSON.stringify(configObj));

  function suppressOversizedBlackOverlay() {
    if (!root) return;
    const rw = Math.max(root.clientWidth, 1);
    const rh = Math.max(root.clientHeight, 1);
    Array.from(root.children).forEach(function(node) {
      if (!(node instanceof HTMLElement)) return;
      if (node.querySelector('svg')) return;
      const rect = node.getBoundingClientRect();
      const style = getComputedStyle(node);
      const bg = style.backgroundColor.replace(/\s/g, '');
      const opaqueBlack = bg === 'rgb(0,0,0)' || bg === 'rgba(0,0,0,1)' || bg === '#000' || bg === '#000000';
      const oversized = rect.width >= rw * 0.22 && rect.height >= rh * 0.22;
      if (opaqueBlack && oversized) {
        node.style.setProperty('display', 'none', 'important');
        node.setAttribute('data-pc-suppressed-oversized-overlay', 'true');
        console.warn('[PromptCanvas] Suppressed oversized opaque Draw.io overlay', rect.width, rect.height);
      }
    });
  }

  function finishPresentation() {
    if (canvasContainer && compactViewport) {
      canvasContainer.scrollTop = 0;
      canvasContainer.scrollLeft = 0;
    }
    suppressOversizedBlackOverlay();
  }

  function loadViewerScript() {
    if (document.getElementById('mxgraph-script-element')) return;
    const script = document.createElement('script');
    script.id = 'mxgraph-script-element';
    script.src = ${JSON.stringify(scriptUrl)};
    script.onload = function() {
      requestAnimationFrame(finishPresentation);
      [80, 180, 420, 900, 1600].forEach(function(ms) { setTimeout(finishPresentation, ms); });
    };
    script.onerror = function() { console.error('[PromptCanvas] Draw.io viewer script failed to load'); };
    document.body.appendChild(script);
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') setTimeout(loadViewerScript, 20);
  else window.addEventListener('load', loadViewerScript);
</script>
</body>
</html>`;

  const containerBgClass = bgTheme === 'light'
    ? 'bg-white border-slate-300 shadow-xl'
    : 'bg-[#0F172A] border-panel-border/20 shadow-2xl';

  return (
    <DiagramErrorBoundary fallbackXml={sanitizedXml}>
      <div
        style={responsiveFrameStyle}
        className={`${containerDimensions} relative rounded-xl overflow-hidden ${containerBgClass} transition-all duration-300 mx-auto`}
      >
        <iframe
          key={`safe_iframe_${diagramId || 'd'}_${versionId || 'v'}_${aspectRatioId}_${bgTheme}_${sanitizedXml.length}`}
          srcDoc={iframeHtml}
          className="w-full h-full border-0 bg-transparent"
          title="PromptCanvas Draw.io Diagram Viewer"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
      </div>
    </DiagramErrorBoundary>
  );
}
