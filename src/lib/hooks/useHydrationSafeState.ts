'use client';

/**
 * 🧊 Hydration-Safe State Utilities
 *
 * PROBLEM
 * -------
 * Reading `localStorage`, `sessionStorage`, `window.location`, `Date`, or `Math.random()`
 * inside a `useState` lazy initializer is a classic React 18/19 hydration bug:
 *
 *   const [open, setOpen] = useState(() => localStorage.getItem('k') === 'true');
 *
 * The server has no `window`, so it renders the fallback (e.g. `false` -> `w-16`).
 * The client's FIRST render (the hydration render) reads the persisted value
 * (e.g. `true` -> `w-64`). The two trees disagree and React throws:
 *
 *   "Hydration failed because the server rendered HTML didn't match the client."
 *
 * SOLUTION
 * --------
 * Render the deterministic SSR value on the server AND on the client's first
 * (hydration) render, then synchronize to the real client value in a layout
 * effect. Layout effects are flushed synchronously *before the browser paints*,
 * so the correct value is on screen in the very first frame: no hydration
 * mismatch and no visible flash of the fallback state.
 */

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useLayoutEffect,
  type Dispatch,
  type SetStateAction,
} from 'react';

/**
 * `useLayoutEffect` warns when executed during server rendering.
 * Fall back to `useEffect` on the server (where it is a no-op anyway).
 */
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Returns `false` during SSR and the hydration render, then `true` afterwards.
 *
 * Use this to gate rendering of inherently client-only output (relative
 * timestamps, locale-formatted dates, random IDs, etc.).
 */
export function useIsHydrated(): boolean {
  const [isHydrated, setIsHydrated] = useState(false);
  useIsomorphicLayoutEffect(() => {
    setIsHydrated(true);
  }, []);
  return isHydrated;
}

/**
 * Drop-in replacement for `useState(() => <ssr-unsafe expression>)`.
 *
 * @param ssrDefault  Deterministic value rendered on the server and during hydration.
 * @param clientInit  Resolver executed once on the client after mount (may safely
 *                    touch `window`, `localStorage`, `Date`, `Math.random()`, ...).
 *
 * @example
 * const [isOpen, setIsOpen] = useHydratedState(false, () => {
 *   return localStorage.getItem('sidebar_open') === 'true';
 * });
 */
export function useHydratedState<T>(
  ssrDefault: T,
  clientInit: () => T
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(ssrDefault);

  // Keep the latest resolver without re-running the sync effect.
  const clientInitRef = useRef(clientInit);
  clientInitRef.current = clientInit;

  const hasSyncedRef = useRef(false);

  useIsomorphicLayoutEffect(() => {
    if (hasSyncedRef.current) return;
    hasSyncedRef.current = true;

    let resolved: T;
    try {
      resolved = clientInitRef.current();
    } catch {
      return; // Storage disabled / quota errors: keep the SSR default.
    }

    setState((prev) => (Object.is(prev, resolved) ? prev : resolved));
  }, []);

  return [state, setState];
}

/**
 * Hydration-safe boolean backed by `localStorage`.
 * Reads after mount and writes through on every update.
 */
export function usePersistentBoolean(
  storageKey: string,
  defaultValue = false
): [boolean, Dispatch<SetStateAction<boolean>>] {
  const [value, setValue] = useHydratedState<boolean>(defaultValue, () => {
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved !== null) return saved === 'true';
    } catch {}
    return defaultValue;
  });

  // Mirror of `value` so the setter can resolve functional updates without
  // running side effects inside a React updater (StrictMode invokes those twice).
  const valueRef = useRef(value);
  valueRef.current = value;

  const setAndPersist = useCallback<Dispatch<SetStateAction<boolean>>>(
    (next) => {
      const resolved =
        typeof next === 'function'
          ? (next as (p: boolean) => boolean)(valueRef.current)
          : next;

      valueRef.current = resolved;
      try {
        window.localStorage.setItem(storageKey, String(resolved));
      } catch {}
      setValue(resolved);
    },
    [storageKey, setValue]
  );

  return [value, setAndPersist];
}
