'use client';

import React from 'react';

import { validateAndHealDrawioXml } from '@/lib/xmlHealer';

interface DiagramViewerProps {
  xml: string;
  aspectRatioId?: string;
  customW?: number;
  customH?: number;
  bgTheme?: 'dark' | 'light';
}

function htmlEscape(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export default function DiagramViewer({
  xml,
  aspectRatioId = '16:9',
  customW = 16,
  customH = 10,
  bgTheme = 'light',
}: DiagramViewerProps) {
  // Strip markdown fences if present without mutating geometry coordinates
  const sanitizedXml = React.useMemo(() => {
    if (!xml || typeof xml !== 'string') return '';
    let cleaned = xml.trim();
    if (cleaned.includes('```')) {
      cleaned = cleaned.replace(/^```[a-z]*\n?/gi, '').replace(/\n?```$/g, '').trim();
    }
    return cleaned;
  }, [xml]);

  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const scriptUrl = `${origin}/viewer-static.min.js`;

  // Dynamically size container frame based on aspect ratio
  let containerDimensions = 'w-full max-w-[1750px] xl:max-w-[96%] h-[800px] xl:h-[920px]';

  if (aspectRatioId === '1:1') {
    containerDimensions = 'w-full max-w-[950px] h-[950px]';
  } else if (aspectRatioId === '9:16') {
    containerDimensions = 'w-full max-w-[650px] h-[1150px]';
  } else if (aspectRatioId === '4:3') {
    containerDimensions = 'w-full max-w-[1350px] h-[1000px]';
  } else if (aspectRatioId === '21:9') {
    containerDimensions = 'w-full max-w-[1950px] xl:max-w-[98%] h-[750px] xl:h-[850px]';
  } else if (aspectRatioId === 'custom' && customW > 0 && customH > 0) {
    const calcH = Math.min(1300, Math.max(600, Math.round(1000 * (customH / customW))));
    containerDimensions = `w-full max-w-[1100px] h-[${calcH}px]`;
  }

  const bgColor = bgTheme === 'light' ? '#FFFFFF' : '#0F172A';

  // Construct the isolated HTML document for the iframe
  const iframeHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        html, body {
          margin: 0;
          padding: 16px;
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          overflow: auto;
          background-color: ${bgColor};
        }
        .mxgraph {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .mxgraph > svg, .mxgraph > div {
          max-width: 100%;
          max-height: 100%;
          margin: auto !important;
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
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(100, 116, 139, 0.7);
        }
      </style>
    </head>
    <body>
      <div 
        class="mxgraph" 
        data-mxgraph="${htmlEscape(JSON.stringify({
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
        }))}"
      ></div>
      
      <script type="text/javascript">
        console.log('[Iframe Diagnostic] 🚀 Iframe document parsed.');
        window.onerror = function(message, source, lineno, colno, error) {
          console.error('[Iframe JS Error] ❌', message, 'at', source, ':', lineno);
          return false;
        };

        window.addEventListener('load', function() {
          const container = document.querySelector('.mxgraph');
          
          function loadViewerScript() {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = '${scriptUrl}';
            
            script.onload = function() {
              console.log('[Iframe Diagnostic] ✅ Draw.io viewer script loaded successfully.');
            };
            
            document.body.appendChild(script);
          }

          if (container && container.offsetWidth > 0 && container.offsetHeight > 0) {
            loadViewerScript();
          } else {
            setTimeout(function() {
              loadViewerScript();
            }, 150);
          }
        });
      </script>
    </body>
    </html>
  `;

  const containerBgClass = bgTheme === 'light' ? 'bg-white border-slate-300 shadow-xl' : 'bg-[#0F172A] border-panel-border/20 shadow-2xl';

  return (
    <div className={`${containerDimensions} relative rounded-xl overflow-hidden ${containerBgClass} transition-all duration-300 mx-auto`}>
      <iframe
        key={`${xml}_${aspectRatioId}_${bgTheme}`}
        srcDoc={iframeHtml}
        className="w-full h-full border-0 bg-transparent"
        title="Draw.io Diagram Viewer"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
      />
    </div>
  );
}
