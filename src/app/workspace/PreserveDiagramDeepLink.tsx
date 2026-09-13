'use client';

import { useRef } from 'react';

/**
 * Preserves a `?diagram=bp_…` catalog deep link while the workspace boots.
 *
 * The workspace calls `history.replaceState` from several effects during
 * startup, and some of those calls rebuild the query string without the
 * `diagram` param — which silently drops the deep link on refresh. This guard
 * temporarily wraps `replaceState` and re-injects the param until the workspace
 * explicitly synchronizes the same diagram id, then removes itself.
 *
 * Why a client component and not an inline `<script>`:
 * this previously lived in `workspace/template.tsx` as
 * `<script dangerouslySetInnerHTML>`. That works on a hard load (the script is
 * in the SSR stream and the browser parses it) but is a silent no-op on every
 * client-side navigation, because scripts inserted through React reconciliation
 * are never executed. React 19 warns about exactly this. Patching during render
 * instead covers both paths: a parent renders before its children, and long
 * before any child effect can call `replaceState`.
 */

const GUARD_FLAG = '__pcWorkspaceDeepLinkGuard';

function installDeepLinkGuard(): void {
  try {
    // Idempotent: React StrictMode double-renders in development, and the
    // template remounts on navigation. Never stack wrappers.
    if ((window as any)[GUARD_FLAG]) return;

    const initialUrl = new URL(window.location.href);
    const initialDiagram = initialUrl.searchParams.get('diagram');
    if (!initialDiagram || !initialDiagram.startsWith('bp_')) return;

    (window as any)[GUARD_FLAG] = true;

    const originalReplaceState = window.history.replaceState.bind(window.history);
    let armed = true;

    const release = () => {
      if (!armed) return;
      armed = false;
      window.history.replaceState = originalReplaceState;
      (window as any)[GUARD_FLAG] = false;
    };

    window.history.replaceState = function (state: any, title: string, url?: string | URL | null) {
      if (!armed) {
        return originalReplaceState(state, title, url);
      }

      try {
        const nextUrl = new URL(String(url || window.location.href), window.location.href);
        const requestedDiagram = nextUrl.searchParams.get('diagram');
        const explicitlySynced = requestedDiagram === initialDiagram;

        if (nextUrl.pathname === initialUrl.pathname && !requestedDiagram) {
          nextUrl.searchParams.set('diagram', initialDiagram);
        }

        const nextPath =
          nextUrl.pathname +
          (nextUrl.searchParams.toString() ? '?' + nextUrl.searchParams.toString() : '') +
          nextUrl.hash;

        const result = originalReplaceState(state, title, nextPath);

        // Once the workspace itself explicitly synchronizes the loaded diagram ID,
        // release the guard so normal navigation is unaffected.
        if (explicitlySynced) release();

        return result;
      } catch {
        return originalReplaceState(state, title, url);
      }
    };

    // Fail-safe: never keep the temporary guard beyond initial hydration/load.
    window.setTimeout(release, 10000);
  } catch {
    // Deep-link guard is best-effort and must never block workspace rendering.
  }
}

export default function PreserveDiagramDeepLink() {
  const installed = useRef(false);

  // Deliberately during render, not in an effect: effects run child-first, so a
  // layout effect here would fire *after* the workspace page has already
  // rewritten the URL. Renders a null tree, so hydration output is unchanged.
  if (typeof window !== 'undefined' && !installed.current) {
    installed.current = true;
    installDeepLinkGuard();
  }

  return null;
}
