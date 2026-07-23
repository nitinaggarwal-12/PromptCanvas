'use client';

import React from 'react';

interface DiagramViewerProps {
  xml: string;
  aspectRatioId?: string;
  customW?: number;
  customH?: number;
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
}: DiagramViewerProps) {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const scriptUrl = `${origin}/viewer-static.min.js`;

  // Dynamically size container frame based on aspect ratio
  let containerDimensions = 'w-full max-w-[1400px] h-[800px]';

  if (aspectRatioId === '1:1') {
    containerDimensions = 'w-full max-w-[900px] h-[900px]';
  } else if (aspectRatioId === '9:16') {
    containerDimensions = 'w-full max-w-[650px] h-[1050px]';
  } else if (aspectRatioId === '4:3') {
    containerDimensions = 'w-full max-w-[1200px] h-[900px]';
  } else if (aspectRatioId === '21:9') {
    containerDimensions = 'w-full max-w-[1600px] h-[700px]';
  } else if (aspectRatioId === 'custom' && customW > 0 && customH > 0) {
    const calcH = Math.min(1200, Math.max(500, Math.round(900 * (customH / customW))));
    containerDimensions = `w-full max-w-[900px] h-[${calcH}px]`;
  }

  // Construct the isolated HTML document for the iframe
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
          overflow: auto;
          background-color: transparent;
        }
        .mxgraph {
          width: 100%;
          height: 100%;
          display: block;
        }
        .geEditor {
          background-color: transparent !important;
        }
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: #334155;
          border-radius: 9999px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #475569;
        }
      </style>
    </head>
    <body>
      <div 
        class="mxgraph" 
        data-mxgraph="${htmlEscape(JSON.stringify({
          xml: xml,
          lightbox: false,
          nav: true,
          resize: true,
          toolbar: 'zoom layers tags',
          edit: '_blank',
          border: 20,
          transparent: true,
          fit: true,
          'max-scale': 1.15
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

  return (
    <div className={`${containerDimensions} relative rounded-xl overflow-hidden bg-bg-dark border border-panel-border/20 shadow-2xl transition-all duration-300 mx-auto`}>
      <iframe
        key={`${xml}_${aspectRatioId}`}
        srcDoc={iframeHtml}
        className="w-full h-full border-0 bg-transparent"
        title="Draw.io Diagram Viewer"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
      />
    </div>
  );
}
