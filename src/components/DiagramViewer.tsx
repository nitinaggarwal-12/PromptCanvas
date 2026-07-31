'use client';

import React from 'react';
import { validateAndHealDrawioXml } from '@/lib/xmlHealer';
import { getTechnicalArchitectureXml } from '@/lib/architectureTypes';
import { getArchitectureMeta } from '@/lib/architectureMetadata';

interface DiagramViewerProps {
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
}

export default function DiagramViewer({
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
}: DiagramViewerProps) {
  const sanitizedXml = React.useMemo(() => {
    if (!xml) {
      return getTechnicalArchitectureXml('tech_cicd_pipeline');
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
      const healed = validateAndHealDrawioXml(rawStr);
      if (!healed.xml || healed.xml.length < 100) {
        return getTechnicalArchitectureXml('tech_cicd_pipeline');
      }
      return healed.xml;
    } catch (err) {
      console.error('[DiagramViewer] Failed to heal XML, using fallback:', err);
      return getTechnicalArchitectureXml('tech_cicd_pipeline');
    }
  }, [xml]);

  // Derive comprehensive architecture metadata
  const meta = React.useMemo(() => {
    const defaultMeta = getArchitectureMeta(diagramId);
    return {
      useCase: useCaseName || defaultMeta.useCase,
      title: diagramType || defaultMeta.title,
      category: defaultMeta.category,
      businessUseCase: defaultMeta.businessUseCase,
      primaryActors: defaultMeta.primaryActors,
      targetOutcomes: defaultMeta.targetOutcomes,
      desc: description || defaultMeta.desc,
    };
  }, [diagramId, useCaseName, diagramType, description]);

  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const scriptUrl = `${origin}/viewer-static.min.js`;

  // Dynamically size container frame based on aspect ratio
  let containerDimensions = 'w-full max-w-[1750px] xl:max-w-[96%] h-[840px] xl:h-[960px]';

  if (aspectRatioId === '1:1') {
    containerDimensions = 'w-full max-w-[950px] h-[980px]';
  } else if (aspectRatioId === '9:16') {
    containerDimensions = 'w-full max-w-[650px] h-[1180px]';
  } else if (aspectRatioId === '4:3') {
    containerDimensions = 'w-full max-w-[1350px] h-[1040px]';
  } else if (aspectRatioId === '21:9') {
    containerDimensions = 'w-full max-w-[1950px] xl:max-w-[98%] h-[780px] xl:h-[890px]';
  } else if (aspectRatioId === 'custom' && customW > 0 && customH > 0) {
    const calcH = Math.min(1300, Math.max(600, Math.round(1000 * (customH / customW))));
    containerDimensions = `w-full max-w-[1100px] h-[${calcH}px]`;
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
          top: 108px;
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
          height: auto !important;
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
        }
      </style>
    </head>
    <body>
      <div class="header-banner">
        <div class="header-top-row">
          <div class="header-left-title">
            <span class="usecase-tag">BUSINESS USE CASE</span>
            <span class="diagram-title">${meta.title ? meta.title.replace(/^(\d+\.\s*)+/, (match) => { const nums = match.match(/\d+/g); return nums ? `${nums[nums.length - 1]}. ` : match; }) : ''}</span>
          </div>
          <div>
            <span class="category-badge">${meta.category}</span>
          </div>
        </div>
        <div class="business-usecase-box">
          <div class="usecase-title-row">
            <span style="color: #0EA5E9;">🎯 Purpose &amp; Problem Statement:</span>
            <span class="usecase-text">${meta.businessUseCase}</span>
          </div>
          <div class="meta-tags-row">
            <div class="meta-pill">👥 <strong>Primary Actors:</strong> ${meta.primaryActors}</div>
            <div class="meta-pill">🚀 <strong>Key Outcomes:</strong> ${meta.targetOutcomes}</div>
          </div>
        </div>
      </div>
      <div class="canvas-container">
        <div class="mxgraph" id="diagram-container"></div>
      </div>
      
      <script type="text/javascript">
        console.log('[Iframe Diagnostic] 🚀 Iframe document parsed with Business Use Case context.');
        window.onerror = function(message, source, lineno, colno, error) {
          console.error('[Iframe JS Error] ❌', message, 'at', source, ':', lineno);
          return false;
        };

        const configObj = ${JSON.stringify({
          xml: sanitizedXml,
          lightbox: true,
          nav: true,
          resize: true,
          toolbar: 'zoom layers tags',
          edit: '_blank',
          border: 40,
          transparent: true,
          fit: true,
          'max-scale': 1.35
        })};

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
    <div className={`${containerDimensions} relative rounded-xl overflow-hidden ${containerBgClass} transition-all duration-300 mx-auto`}>
      <iframe
        key={`${diagramId || ''}_${versionId || ''}_${xml ? xml.length : 0}_${aspectRatioId}_${bgTheme}`}
        srcDoc={iframeHtml}
        className="w-full h-full border-0 bg-transparent"
        title="Draw.io Diagram Viewer with Business Use Case Panel"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
      />
    </div>
  );
}
