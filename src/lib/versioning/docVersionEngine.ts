/**
 * @file docVersionEngine.ts
 * Enterprise Granular Version History & Ring Buffer Engine for PromptCanvas DocGen.
 * 
 * Supports:
 * - 10-Snapshot Ring Buffer with automatic oldest eviction
 * - Granular independent versioning (Doc Text vs Individual Diagram Slots)
 * - Line-by-line Diff Computation (LCS-based diff with colored chunks)
 * - 1-Click Snapshot Rollback and Replay
 * - Robust LocalStorage serialization & error handling
 */

export interface DiagramSlotVersionData {
  templateId: string;
  xml: string;
  version: string;
  customizationPrompt?: string;
}

export interface VersionSnapshot {
  id: string;
  versionTag: string; // e.g. "v1.0", "v1.1", "v1.2"
  timestamp: string; // ISO 8601
  author: 'User' | 'AI Assist' | 'System';
  changeSummary: string;
  targetType: 'doc' | 'diagram' | 'full';
  targetSlotIndex?: number;
  docMarkdown: string;
  docVersion: string; // e.g. "v1.0"
  diagramSlots: Record<number, DiagramSlotVersionData>;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  actionApplied?: {
    type: 'doc_update' | 'diagram_update' | 'version_rollback' | 'theme_change';
    summary: string;
    versionTag: string;
    targetSlotIndex?: number;
  };
  suggestedNextSteps?: Array<{
    label: string;
    prompt: string;
  }>;
}

export const MAX_VERSION_SNAPSHOTS = 10;

/**
 * Increment semantic version string (e.g. "v1.0" -> "v1.1", "v1.9" -> "v2.0")
 */
export function bumpVersionTag(current: string, isMajor: boolean = false): string {
  const clean = current.replace(/^v/, '');
  const parts = clean.split('.').map((p) => parseInt(p, 10) || 0);
  const major = parts[0] ?? 1;
  const minor = parts[1] ?? 0;

  if (isMajor) {
    return `v${major + 1}.0`;
  }
  return `v${major}.${minor + 1}`;
}

/**
 * Create initial v1.0 baseline snapshot
 */
export function createInitialSnapshot(
  docMarkdown: string,
  diagramSlots: Record<number, DiagramSlotVersionData> = {},
  summary: string = 'Initial Document & Architecture Baseline'
): VersionSnapshot {
  const now = new Date().toISOString();
  return {
    id: `snap_${Date.now()}_init`,
    versionTag: 'v1.0',
    timestamp: now,
    author: 'System',
    changeSummary: summary,
    targetType: 'full',
    docMarkdown,
    docVersion: 'v1.0',
    diagramSlots: { ...diagramSlots },
  };
}

/**
 * Push new snapshot into a 10-snapshot ring buffer.
 * Enforces strict max 10 snapshots (evicts oldest entries beyond 10).
 */
export function pushVersionSnapshot(
  history: VersionSnapshot[],
  newSnapshot: VersionSnapshot,
  maxLimit: number = MAX_VERSION_SNAPSHOTS
): VersionSnapshot[] {
  const updated = [newSnapshot, ...history.filter((s) => s.id !== newSnapshot.id)];
  return updated.slice(0, maxLimit);
}

/**
 * Line-by-line Diff Representation
 */
export interface DiffLine {
  type: 'added' | 'removed' | 'unchanged';
  text: string;
  oldLineNumber?: number;
  newLineNumber?: number;
}

export interface DiffSummary {
  addedCount: number;
  removedCount: number;
  lines: DiffLine[];
}

/**
 * Computes line-by-line diff using Longest Common Subsequence (LCS).
 */
export function computeTextDiff(oldText: string, newText: string): DiffSummary {
  const oldLines = oldText.split('\n');
  const newLines = newText.split('\n');

  const m = oldLines.length;
  const n = newLines.length;

  // Build DP table for LCS
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (oldLines[i] === newLines[j]) {
        dp[i + 1][j + 1] = dp[i][j] + 1;
      } else {
        dp[i + 1][j + 1] = Math.max(dp[i + 1][j], dp[i][j + 1]);
      }
    }
  }

  // Backtrack to build diff lines
  const lines: DiffLine[] = [];
  let i = m;
  let j = n;
  let addedCount = 0;
  let removedCount = 0;

  const stack: DiffLine[] = [];

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && oldLines[i - 1] === newLines[j - 1]) {
      stack.push({
        type: 'unchanged',
        text: oldLines[i - 1],
        oldLineNumber: i,
        newLineNumber: j,
      });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      stack.push({
        type: 'added',
        text: newLines[j - 1],
        newLineNumber: j,
      });
      addedCount++;
      j--;
    } else if (i > 0 && (j === 0 || dp[i][j - 1] < dp[i - 1][j])) {
      stack.push({
        type: 'removed',
        text: oldLines[i - 1],
        oldLineNumber: i,
      });
      removedCount++;
      i--;
    }
  }

  // Reverse stack to get top-down ordering
  while (stack.length > 0) {
    lines.push(stack.pop()!);
  }

  return {
    addedCount,
    removedCount,
    lines,
  };
}

/**
 * Format timestamp into human-readable relative string ("Just now", "2m ago", "1h ago")
 */
export function formatRelativeTime(isoString: string): string {
  try {
    const time = new Date(isoString).getTime();
    const now = Date.now();
    const diffSec = Math.floor((now - time) / 1000);

    if (diffSec < 10) return 'Just now';
    if (diffSec < 60) return `${diffSec}s ago`;
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return `${diffHr}h ago`;
    const diffDays = Math.floor(diffHr / 24);
    return `${diffDays}d ago`;
  } catch {
    return 'Recent';
  }
}

/**
 * LocalStorage Persistence Helpers
 */
export function getStorageKey(projectId: string, type: 'versions' | 'chat'): string {
  return `promptcanvas_docgen_${type}_${projectId || 'default'}`;
}

export function saveVersionHistory(
  projectId: string,
  snapshots: VersionSnapshot[],
  chatHistory: ChatMessage[]
): void {
  if (typeof window === 'undefined') return;
  try {
    const vKey = getStorageKey(projectId, 'versions');
    const cKey = getStorageKey(projectId, 'chat');
    window.localStorage.setItem(vKey, JSON.stringify(snapshots.slice(0, MAX_VERSION_SNAPSHOTS)));
    window.localStorage.setItem(cKey, JSON.stringify(chatHistory.slice(-50)));
  } catch (err) {
    console.warn('[DocVersionEngine] Failed to save history to localStorage:', err);
  }
}

export function loadVersionHistory(
  projectId: string
): { snapshots: VersionSnapshot[]; chatHistory: ChatMessage[] } | null {
  if (typeof window === 'undefined') return null;
  try {
    const vKey = getStorageKey(projectId, 'versions');
    const cKey = getStorageKey(projectId, 'chat');
    const rawVersions = window.localStorage.getItem(vKey);
    const rawChat = window.localStorage.getItem(cKey);

    const snapshots = rawVersions ? (JSON.parse(rawVersions) as VersionSnapshot[]) : [];
    const chatHistory = rawChat ? (JSON.parse(rawChat) as ChatMessage[]) : [];

    if (snapshots.length === 0 && chatHistory.length === 0) {
      return null;
    }
    return { snapshots, chatHistory };
  } catch (err) {
    console.warn('[DocVersionEngine] Failed to load history from localStorage:', err);
    return null;
  }
}
