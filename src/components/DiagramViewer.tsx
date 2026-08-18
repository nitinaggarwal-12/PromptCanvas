'use client';

import React from 'react';
import { validateAndHealDrawioXml } from '@/lib/xmlHealer';
import { getDefaultXmlForArchitecture, getTemplateTitle } from '@/lib/architectureTypes';
import { getArchitectureMeta } from '@/lib/architectureMetadata';
import { SupportedLanguage, translateDiagramXmlToLanguage } from '@/lib/i18n';
import { localizeDrawioXmlDeep } from '@/lib/diagramLanguageLocalizer';
import { sanitizeDrawioXmlAttributes } from '@/lib/diagramCleaner';
import { DiagramErrorBoundary } from './DiagramErrorBoundary';

interface DiagramViewerProps {
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

export default function DiagramViewer({
  currentLanguage = 'en',
  xml,
  diagramId,
  versionId,
  aspectRatioId = '16:9',
  customW = 16,
  customH = 10,
  bgTheme = 'light',
  useCaseName,
  diagramType,
  description,
  isLiveFlow = false,
}: DiagramViewerProps) {
  const sanitizedXml = React.useMemo(() => {
    if (!xml) {
      return getDefaultXmlForArchitecture(diagramType || 'unified_system_view') || '';
    }
    let rawStr = '';
    if (typeof xml === 'string') {
      rawStr = xml;
    } else if (typeof xml === 'object' && xml !== null) {
      rawStr = Buffer.from(Object.values(xml) as any).toString('utf-8');
    } else {
      rawStr = String(xml);
    }
    try {
      const healed = validateAndHealDrawioXml(rawStr, diagramType);
      if (!healed.xml || healed.xml.length < 100) {
        return getDefaultXmlForArchitecture(diagramType || 'unified_system_view') || '';
      }
      return healed.xml;
    } catch (err) {
      console.error('[DiagramViewer] Failed to heal XML, using fallback:', err);
      return getDefaultXmlForArchitecture(diagramType || 'unified_system_view') || '';
    }
  }, [xml, diagramType]);

  // Derive template title (e.g., Serverless Web Application (GCP), DevOps CI/CD Pipeline, etc.)
  const templateName = React.useMemo(() => {
    return getTemplateTitle(diagramType || diagramId);
  }, [diagramType, diagramId]);

  // Derive comprehensive architecture metadata with User Dynamic Overrides First
  const meta = React.useMemo(() => {
    const defaultMeta = getArchitectureMeta(diagramId || diagramType);
    const userTitle = (useCaseName && !/^\d+\.\s/.test(useCaseName)) ? useCaseName : (defaultMeta.title || templateName);
    const userUseCase = useCaseName || defaultMeta.useCase;
    return {
      useCase: userUseCase,
      title: userTitle,
      category: defaultMeta.category,
      businessUseCase: userUseCase,
      primaryActors: defaultMeta.primaryActors,
      targetOutcomes: defaultMeta.targetOutcomes,
      desc: description || defaultMeta.desc,
    };
  }, [diagramId, useCaseName, diagramType, description, templateName]);

  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const scriptUrl = `${origin}/viewer-static.min.js`;

  // Dynamically size container frame based on aspect ratio
  let containerDimensions = 'w-full h-full max-w-full';

  if (aspectRatioId === '1:1') {
    containerDimensions = 'w-full max-w-[950px] h-[980px]';
  } else if (aspectRatioId === '9:16') {
    containerDimensions = 'w-full max-w-[650px] h-[1180px]';
  } else if (aspectRatioId === '4:3') {
    containerDimensions = 'w-full max-w-[1350px] h-[1040px]';
  } else if (aspectRatioId === '21:9') {
    containerDimensions = 'w-full h-full max-w-full';
  }
  
  let customHeightStyle: React.CSSProperties | undefined = undefined;
  if (aspectRatioId === 'custom' && customW > 0 && customH > 0) {
    const calcH = Math.min(1300, Math.max(600, Math.round(1000 * (customH / customW))));
    containerDimensions = 'w-full max-w-full';
    customHeightStyle = { height: `${calcH}px` };
  }

  const bgColor = bgTheme === 'light' ? '#FFFFFF' : '#0F172A';
  const cardBg = bgTheme === 'light' ? '#F8FAFC' : '#1E293B';
  const textColor = bgTheme === 'light' ? '#0F172A' : '#F8FAFC';
  const borderColor = bgTheme === 'light' ? 'rgba(226, 232, 240, 0.9)' : 'rgba(51, 65, 85, 0.6)';

  // Construct isolated HTML document for iframe with full Business Use Case Panel & Training Summary
  const iframeHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        html, body {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          background-color: ${bgColor};
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          overflow: hidden;
        }
        .header-banner {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          background-color: ${cardBg};
          border-bottom: 1px solid ${borderColor};
          padding: 12px 24px;
          z-index: 100;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .header-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .header-left-title {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .usecase-tag {
          background-color: rgba(14, 165, 233, 0.15);
          color: #0EA5E9;
          font-size: 10px;
          font-weight: 800;
          padding: 3px 8px;
          border-radius: 4px;
          letter-spacing: 0.5px;
          border: 1px solid rgba(14, 165, 233, 0.3);
          text-transform: uppercase;
        }
        .diagram-title {
          color: ${textColor};
          font-size: 15px;
          font-weight: 800;
          letter-spacing: -0.2px;
        }
        .category-badge {
          background-color: ${bgTheme === 'dark' ? '#334155' : '#E2E8F0'};
          color: ${bgTheme === 'dark' ? '#94A3B8' : '#475569'};
          font-size: 10px;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 9999px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .business-usecase-box {
          background-color: ${bgTheme === 'light' ? '#FFFFFF' : '#0F172A'};
          border: 1px solid ${bgTheme === 'light' ? '#CBD5E1' : '#334155'};
          border-radius: 6px;
          padding: 8px 12px;
          font-size: 11px;
          line-height: 1.4;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .usecase-title-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 700;
          color: ${bgTheme === 'light' ? '#0F172A' : '#F8FAFC'};
        }
        .usecase-text {
          color: ${bgTheme === 'light' ? '#334155' : '#CBD5E1'};
          font-weight: 400;
        }
        .meta-tags-row {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: 2px;
          font-size: 10.5px;
        }
        .meta-pill {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #64748B;
        }
        .meta-pill strong {
          color: ${bgTheme === 'light' ? '#1E293B' : '#E2E8F0'};
        }
        .canvas-container {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 16px;
          box-sizing: border-box;
          overflow: auto;
        }
        .mxgraph {
          width: 100%;
          min-height: 100%;
          display: flex;
          align-items: flex-start;
          justify-content: center;
        }
        .mxgraph > svg, .mxgraph > div {
          max-width: 100% !important;
          margin: 0 auto !important;
        }
        .geEditor {
          background-color: transparent !important;
        }
        ::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(100, 116, 139, 0.4);
          border-radius: 9999px;
        }${isLiveFlow ? `
        @keyframes flowPulse {
          0% { stroke-dashoffset: 48; }
          100% { stroke-dashoffset: 0; }
        }
        svg path[stroke-dasharray], svg g[data-cell-id] path[stroke], svg .geEdge path {
          animation: flowPulse 1.1s linear infinite !important;
        }
` : ''}
      </style>
    </head>
    <body>
      <div class="canvas-container">
        <div class="mxgraph" id="diagram-container"></div>
      </div>
      
      <script type="text/javascript">
        // Safe Latin1 & UTF-8 btoa / atob wrappers to prevent "Failed to execute 'btoa' on 'Window'"
        if (typeof window.btoa === 'function') {
          const _origBtoa = window.btoa.bind(window);
          window.btoa = function(str) {
            try {
              return _origBtoa(str);
            } catch (e) {
              try {
                return _origBtoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
                  return String.fromCharCode(parseInt(p1, 16));
                }));
              } catch (e2) {
                return _origBtoa(unescape(encodeURIComponent(str)));
              }
            }
          };
        }
        if (typeof window.atob === 'function') {
          const _origAtob = window.atob.bind(window);
          window.atob = function(b64) {
            try {
              return _origAtob(b64);
            } catch (e) {
              try {
                return decodeURIComponent(Array.prototype.map.call(_origAtob(b64), function(c) {
                  return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));
              } catch (e2) {
                return _origAtob(b64);
              }
            }
          };
        }

        console.log('[Iframe Diagnostic] 🚀 Iframe document parsed with Business Use Case context.');
        window.onerror = function(message, source, lineno, colno, error) {
          console.error('[Iframe JS Error] ❌', message, 'at', source, ':', lineno);
          return false;
        };

        const storageKey = 'pc_canvas_scroll_' + '${diagramId || 'default'}';
        const canvasContainer = document.querySelector('.canvas-container');

        if (canvasContainer) {
          // Restore saved scroll position
          try {
            const savedPos = sessionStorage.getItem(storageKey);
            if (savedPos) {
              const { left, top } = JSON.parse(savedPos);
              canvasContainer.scrollLeft = left || 0;
              canvasContainer.scrollTop = top || 0;
            }
          } catch(e) {}

          // Save scroll position on scroll
          canvasContainer.addEventListener('scroll', function() {
            try {
              sessionStorage.setItem(storageKey, JSON.stringify({
                left: canvasContainer.scrollLeft,
                top: canvasContainer.scrollTop
              }));
            } catch(e) {}
          });
        }

        function getCleanGraphXml(xmlStr) {
          if (!xmlStr) return '';
          var sIdx = xmlStr.indexOf('<mxGraphModel');
          var eIdx = xmlStr.lastIndexOf('</mxGraphModel>');
          if (sIdx !== -1 && eIdx !== -1) {
            return xmlStr.substring(sIdx, eIdx + 15);
          }
          return xmlStr;
        }

        const configObj = ${JSON.stringify({
          xml: sanitizeDrawioXmlAttributes(localizeDrawioXmlDeep(translateDiagramXmlToLanguage(sanitizedXml, currentLanguage || 'en'), currentLanguage || 'en')),
          lightbox: true,
          nav: true,
          resize: true,
          toolbar: 'zoom layers tags',
          edit: '_blank',
          border: 12,
          transparent: true,
          fit: true,
          'max-scale': 2.0
        })};
        configObj.xml = getCleanGraphXml(configObj.xml);

        const container = document.getElementById('diagram-container');
        if (container) {
          container.setAttribute('data-mxgraph', JSON.stringify(configObj));
        }

        function loadViewerScript() {
          if (document.getElementById('mxgraph-script-element')) return;
          const script = document.createElement('script');
          script.id = 'mxgraph-script-element';
          script.type = 'text/javascript';
          script.src = '${scriptUrl}';
          
          script.onload = function() {
            console.log('[Iframe Diagnostic] ✅ Draw.io viewer script loaded successfully.');
            if (canvasContainer) {
              try {
                const savedPos = sessionStorage.getItem(storageKey);
                if (savedPos) {
                  const { left, top } = JSON.parse(savedPos);
                  canvasContainer.scrollLeft = left || 0;
                  canvasContainer.scrollTop = top || 0;
                }
              } catch(e) {}
            }
          };
          
          document.body.appendChild(script);
        }

        if (document.readyState === 'complete' || document.readyState === 'interactive') {
          setTimeout(loadViewerScript, 50);
        } else {
          window.addEventListener('load', loadViewerScript);
        }
      </script>
    </body>
    </html>
  `;

  const containerBgClass = bgTheme === 'light' ? 'bg-white border-slate-300 shadow-xl' : 'bg-[#0F172A] border-panel-border/20 shadow-2xl';

  return (
    <DiagramErrorBoundary fallbackXml={sanitizedXml}>
      <div 
        style={customHeightStyle}
        className={`${containerDimensions} relative rounded-xl overflow-hidden ${containerBgClass} transition-all duration-300 mx-auto`}
      >
        <iframe
          key={`iframe_${diagramId || 'd'}_${versionId || 'v'}_${aspectRatioId}_${bgTheme}_${xml ? (xml.length + '_' + xml.slice(0, 60).replace(/[^a-zA-Z0-9]/g, '')) : 'empty'}`}
          srcDoc={iframeHtml}
          className="w-full h-full border-0 bg-transparent"
          title="Draw.io Diagram Viewer with Business Use Case Panel"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
      </div>
    </DiagramErrorBoundary>
  );
}
