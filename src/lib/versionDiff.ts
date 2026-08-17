import { parseXmlNodesAndEdges } from '@/lib/graph/xmlNodesParser';

export interface VersionChanges {
  added: string[];
  removed: string[];
  modified: string[];
}

export function computeVersionDiff(currentXml: string, parentXml: string): VersionChanges {
  const currentItems = parseXmlNodesAndEdges(currentXml || '');
  const parentItems = parseXmlNodesAndEdges(parentXml || '');

  const currentMap = new Map(currentItems.map(item => [item.id, item]));
  const parentMap = new Map(parentItems.map(item => [item.id, item]));

  const added: string[] = [];
  const removed: string[] = [];
  const modified: string[] = [];

  // Find added or modified items
  currentMap.forEach((curr, id) => {
    const parent = parentMap.get(id);
    if (!parent) {
      if (curr.isEdge) {
        const srcLabel = currentMap.get(curr.source || '')?.label || 'Component';
        const tgtLabel = currentMap.get(curr.target || '')?.label || 'Component';
        added.push(`Connection: ${srcLabel} ➔ ${tgtLabel}`);
      } else {
        added.push(curr.label);
      }
    } else if (parent.label !== curr.label) {
      if (curr.isEdge) {
        modified.push(`Connection: "${parent.label}" renamed to "${curr.label}"`);
      } else {
        modified.push(`Component: "${parent.label}" renamed to "${curr.label}"`);
      }
    }
  });

  // Find removed items
  parentMap.forEach((parent, id) => {
    if (!currentMap.has(id)) {
      if (parent.isEdge) {
        const srcLabel = parentMap.get(parent.source || '')?.label || 'Component';
        const tgtLabel = parentMap.get(parent.target || '')?.label || 'Component';
        removed.push(`Connection: ${srcLabel} ➔ ${tgtLabel}`);
      } else {
        removed.push(parent.label);
      }
    }
  });

  return { added, removed, modified };
}
