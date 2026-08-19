import type { ReactNode } from 'react';

export default function WorkspaceTemplate({ children }: { children: ReactNode }) {
  const preserveInitialDiagramDeepLink = `
    (() => {
      try {
        const initialUrl = new URL(window.location.href);
        const initialDiagram = initialUrl.searchParams.get('diagram');
        if (!initialDiagram || !initialDiagram.startsWith('bp_')) return;

        const originalReplaceState = window.history.replaceState.bind(window.history);
        let armed = true;

        window.history.replaceState = function(state, title, url) {
          if (!armed) {
            return originalReplaceState(state, title, url);
          }

          try {
            const nextUrl = new URL(String(url || window.location.href), window.location.href);
            const requestedDiagram = nextUrl.searchParams.get('diagram');
            const explicitlySynced = requestedDiagram === initialDiagram;

            if (
              nextUrl.pathname === initialUrl.pathname &&
              !requestedDiagram
            ) {
              nextUrl.searchParams.set('diagram', initialDiagram);
            }

            const nextPath = nextUrl.pathname +
              (nextUrl.searchParams.toString() ? '?' + nextUrl.searchParams.toString() : '') +
              nextUrl.hash;

            const result = originalReplaceState(state, title, nextPath);

            // Once the workspace itself explicitly synchronizes the loaded diagram ID,
            // release the guard so normal navigation is unaffected.
            if (explicitlySynced) {
              armed = false;
              window.history.replaceState = originalReplaceState;
            }

            return result;
          } catch (_) {
            return originalReplaceState(state, title, url);
          }
        };

        // Fail-safe: never keep the temporary guard beyond initial hydration/load.
        window.setTimeout(() => {
          if (armed) {
            armed = false;
            window.history.replaceState = originalReplaceState;
          }
        }, 10000);
      } catch (_) {
        // Deep-link guard is best-effort and must never block workspace rendering.
      }
    })();
  `;

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: preserveInitialDiagramDeepLink }} />
      {children}
    </>
  );
}
