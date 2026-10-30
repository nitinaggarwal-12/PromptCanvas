/**
 * Lightweight 15-Change Undo / Redo Ring Buffer Store.
 * Replaces semantic micro-versioning (v1.0.1, v1.0.2, ...) completely:
 * - Keeps strictly up to MAX_UNDO_REDO_CHANGES (15) changes for instant Undo & Redo.
 * - Persists safely to localStorage while stripping heavy inline base64 PNGs from
 *   historical stack entries so browser storage quota is never exceeded.
 */

export const MAX_UNDO_REDO_CHANGES = 15;

export interface DiagramChangeEntry<T = unknown> {
  id: string;
  label: string;
  timestamp: string;
  xml: string;
  payload?: T;
}

export interface UndoRedoStackState<T = unknown> {
  past: DiagramChangeEntry<T>[];
  present: DiagramChangeEntry<T> | null;
  future: DiagramChangeEntry<T>[];
}

export function createEmptyUndoRedoState<T = unknown>(): UndoRedoStackState<T> {
  return {
    past: [],
    present: null,
    future: [],
  };
}

/**
 * Records a new diagram change onto the Undo/Redo stack.
 * - If `resetStack` is true (e.g., user explicitly clicked Reset), starts fresh.
 * - Otherwise pushes `state.present` onto `past` (retaining the last 15 changes)
 *   and clears `future`.
 */
export function pushUndoRedoChange<T = unknown>(
  state: UndoRedoStackState<T>,
  input: {
    id?: string;
    label: string;
    timestamp?: string;
    xml: string;
    payload?: T;
  },
  options?: { resetStack?: boolean }
): UndoRedoStackState<T> {
  const entry: DiagramChangeEntry<T> = {
    id: input.id || `chg_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    label: input.label,
    timestamp:
      input.timestamp ||
      new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    xml: input.xml,
    payload: input.payload,
  };

  if (options?.resetStack || !state.present) {
    return {
      past: [],
      present: entry,
      future: [],
    };
  }

  // Avoid duplicate consecutive push if XML is byte-for-byte identical
  if (state.present.xml === entry.xml && state.present.label === entry.label) {
    return {
      ...state,
      present: entry,
    };
  }

  const nextPast = [...state.past, state.present].slice(-MAX_UNDO_REDO_CHANGES);
  return {
    past: nextPast,
    present: entry,
    future: [],
  };
}

/**
 * Steps backward one change (Undo), moving `present` to `future[0]`
 * and popping the most recent `past` entry into `present`.
 */
export function undoDiagramChange<T = unknown>(
  state: UndoRedoStackState<T>
): UndoRedoStackState<T> {
  if (!state.present || state.past.length === 0) {
    return state;
  }
  const previous = state.past[state.past.length - 1];
  const nextPast = state.past.slice(0, -1);
  const nextFuture = [state.present, ...state.future].slice(0, MAX_UNDO_REDO_CHANGES);
  return {
    past: nextPast,
    present: previous,
    future: nextFuture,
  };
}

/**
 * Steps forward one change (Redo), moving `present` to the end of `past`
 * and shifting `future[0]` into `present`.
 */
export function redoDiagramChange<T = unknown>(
  state: UndoRedoStackState<T>
): UndoRedoStackState<T> {
  if (!state.present || state.future.length === 0) {
    return state;
  }
  const next = state.future[0];
  const nextFuture = state.future.slice(1);
  const nextPast = [...state.past, state.present].slice(-MAX_UNDO_REDO_CHANGES);
  return {
    past: nextPast,
    present: next,
    future: nextFuture,
  };
}

export function canUndoChange<T = unknown>(state: UndoRedoStackState<T>): boolean {
  return Boolean(state.present && state.past.length > 0);
}

export function canRedoChange<T = unknown>(state: UndoRedoStackState<T>): boolean {
  return Boolean(state.present && state.future.length > 0);
}

/**
 * Returns the ordered timeline of saved changes (newest first) up to MAX_UNDO_REDO_CHANGES + 1,
 * along with the index of `present`, so UI timelines can jump directly to any saved step.
 */
export function listOrderedChangesNewestFirst<T = unknown>(
  state: UndoRedoStackState<T>
): { items: DiagramChangeEntry<T>[]; activeIndex: number } {
  if (!state.present) {
    return { items: [], activeIndex: -1 };
  }
  // Chronological oldest -> newest: [...past, present, ...future.slice().reverse()? No: future[0] is next redo!]
  // Specifically: after 1 undo, future[0] is the newest state we just undid!
  // Chronological newest -> oldest: [...future.slice().reverse(), present, ...past.slice().reverse()]
  const newestFirst = [
    ...state.future.slice().reverse(),
    state.present,
    ...state.past.slice().reverse(),
  ].slice(0, MAX_UNDO_REDO_CHANGES + 1);

  const activeIndex = newestFirst.findIndex((x) => x.id === state.present?.id);
  return {
    items: newestFirst,
    activeIndex: activeIndex >= 0 ? activeIndex : 0,
  };
}

/**
 * Jumps directly to a specific entry ID in the Undo/Redo timeline while preserving
 * full Undo and Redo continuity across all saved entries.
 */
export function jumpToSavedChangeById<T = unknown>(
  state: UndoRedoStackState<T>,
  targetId: string
): UndoRedoStackState<T> {
  if (!state.present || state.present.id === targetId) return state;
  const chronological = [...state.past, state.present, ...state.future];
  const idx = chronological.findIndex((item) => item.id === targetId);
  if (idx < 0) return state;

  const nextPast = chronological.slice(0, idx).slice(-MAX_UNDO_REDO_CHANGES);
  const nextPresent = chronological[idx];
  const nextFuture = chronological.slice(idx + 1, idx + 1 + MAX_UNDO_REDO_CHANGES);
  return {
    past: nextPast,
    present: nextPresent,
    future: nextFuture,
  };
}

function stripLargeBlobsFromPayload<T>(payload: T | undefined, keepImage: boolean): T | undefined {
  if (!payload || typeof payload !== 'object') return payload;
  if (keepImage) return payload;
  const clone = { ...(payload as Record<string, unknown>) };
  if (typeof clone.referenceImageDataUrl === 'string' && clone.referenceImageDataUrl.length > 4096) {
    delete clone.referenceImageDataUrl;
  }
  return clone as T;
}

export function saveUndoRedoStateToStorage<T = unknown>(
  storageKey: string,
  state: UndoRedoStackState<T>
): void {
  if (typeof window === 'undefined') return;
  try {
    const compactState: UndoRedoStackState<T> = {
      past: state.past.slice(-MAX_UNDO_REDO_CHANGES).map((e) => ({
        ...e,
        payload: stripLargeBlobsFromPayload(e.payload, false),
      })),
      present: state.present
        ? {
            ...state.present,
            payload: stripLargeBlobsFromPayload(state.present.payload, false),
          }
        : null,
      future: state.future.slice(0, MAX_UNDO_REDO_CHANGES).map((e) => ({
        ...e,
        payload: stripLargeBlobsFromPayload(e.payload, false),
      })),
    };
    window.localStorage.setItem(storageKey, JSON.stringify(compactState));
  } catch {
    // Best-effort storage write
  }
}

export function loadUndoRedoStateFromStorage<T = unknown>(
  storageKey: string
): UndoRedoStackState<T> {
  if (typeof window === 'undefined') return createEmptyUndoRedoState<T>();
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return createEmptyUndoRedoState<T>();
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return createEmptyUndoRedoState<T>();
    const past = Array.isArray(parsed.past) ? parsed.past.slice(-MAX_UNDO_REDO_CHANGES) : [];
    const present = parsed.present && typeof parsed.present.xml === 'string' ? parsed.present : null;
    const future = Array.isArray(parsed.future) ? parsed.future.slice(0, MAX_UNDO_REDO_CHANGES) : [];
    if (!present) return createEmptyUndoRedoState<T>();
    return { past, present, future };
  } catch {
    return createEmptyUndoRedoState<T>();
  }
}

export function clearUndoRedoStorage(storageKey: string): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(storageKey);
  } catch {
    // Ignore
  }
}
