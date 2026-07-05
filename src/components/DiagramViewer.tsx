'use client';

import React from 'react';

interface DiagramViewerProps {
  xml: string;
}

export default function DiagramViewer({ xml }: DiagramViewerProps) {
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
          overflow: auto; /* Enable scrollbars for large diagrams in narrow viewports */
          background-color: transparent;
        }
        /* Ensure the Draw.io container fills the page */
        .mxgraph {
          width: 100%;
          height: 100%;
          display: block; /* Use block layout instead of flex to prevent centering/clipping bugs */
        }
        /* Style the Draw.io toolbar to match our dark theme */
        .geEditor {
          background-color: transparent !important;
        }
        /* Custom scrollbars inside the iframe */
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: #334155; /* slate-700 */
          border-radius: 9999px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #475569; /* slate-600 */
        }
      </style>
    </head>
    <body>
      <div 
        class="mxgraph" 
        data-mxgraph="${JSON.stringify({
          xml: xml,
          lightbox: false,
          nav: true,
          resize: true,
          toolbar: 'zoom layers tags',
          edit: '_blank',
          border: 0,
          transparent: true,
          zoom: 1
        }).replace(/"/g, '&quot;')}"
      ></div>
      
      <!-- Diagnostic & Dynamic Script Loader to prevent scale(NaN,NaN) race conditions -->
      <script type="text/javascript">
        console.log('[Iframe Diagnostic] 🚀 Iframe document parsed.');
        console.log('[Iframe Diagnostic] Init window size:', window.innerWidth, 'x', window.innerHeight);
        
        // Catch any unhandled errors inside the iframe and log them
        window.onerror = function(message, source, lineno, colno, error) {
          console.error('[Iframe JS Error] ❌', message, 'at', source, ':', lineno);
          return false;
        };

        window.addEventListener('load', function() {
          console.log('[Iframe Diagnostic] 🏁 Load event fired. Checking container size...');
          const container = document.querySelector('.mxgraph');
          
          function loadViewerScript() {
            console.log('[Iframe Diagnostic] 📦 Loading Draw.io viewer script dynamically...');
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'https://viewer.diagrams.net/js/viewer-static.min.js';
            
            script.onload = function() {
              console.log('[Iframe Diagnostic] ✅ Draw.io viewer script loaded successfully.');
              // Check if SVG is rendered after a short delay
              setTimeout(function() {
                if (container) {
                  const svg = container.querySelector('svg');
                  console.log('[Iframe Diagnostic] Rendered SVG:', svg ? 'Found (Success!)' : 'NOT Found (Failed)');
                  if (svg) {
                    console.log('[Iframe Diagnostic] SVG inner elements count:', svg.querySelectorAll('*').length);
                  } else {
                    console.log('[Iframe Diagnostic] Container innerHTML:', container.innerHTML || '(empty)');
                  }
                }
              }, 1000);
            };
            
            script.onerror = function() {
              console.error('[Iframe Diagnostic] ❌ Failed to load Draw.io viewer script.');
            };
            
            document.body.appendChild(script);
          }

          if (container && container.offsetWidth > 0 && container.offsetHeight > 0) {
            console.log('[Iframe Diagnostic] Container size is valid:', container.offsetWidth, 'x', container.offsetHeight);
            loadViewerScript();
          } else {
            console.warn('[Iframe Diagnostic] ⚠️ Container size is 0. Delaying script load to let layout settle...');
            // Wait 150ms for layout to settle
            setTimeout(function() {
              console.log('[Iframe Diagnostic] Retrying container size check after delay:', container ? container.offsetWidth + 'x' + container.offsetHeight : 'no container');
              loadViewerScript();
            }, 150);
          }
        });
      </script>
    </body>
    </html>
  `;

  return (
    <div className="w-full h-full min-h-[350px] relative rounded-xl overflow-hidden bg-bg-dark">
      <iframe
        key={xml} // Force iframe reload when XML changes to guarantee clean re-rendering
        srcDoc={iframeHtml}
        className="w-full h-full border-0 bg-transparent"
        title="Draw.io Diagram Viewer"
        sandbox="allow-scripts allow-popups allow-forms allow-same-origin"
      />
    </div>
  );
}
