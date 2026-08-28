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
        const srcLabel = currentMap.get(curr.source || '')?.label || curr.source || 'Component';
        const tgtLabel = currentMap.get(curr.target || '')?.label || curr.target || 'Component';
        added.push(`Connection: ${srcLabel} ➔ ${tgtLabel}`);
      } else {
        added.push(curr.label || `Node (${id})`);
      }
    } else {
      // Check for modifications
      const changes: string[] = [];

      if (parent.label !== curr.label) {
        if (curr.isEdge) {
          changes.push(`renamed from "${parent.label}" to "${curr.label}"`);
        } else {
          changes.push(`renamed from "${parent.label}" to "${curr.label}"`);
        }
      }

      if (curr.isEdge) {
        if (parent.source !== curr.source || parent.target !== curr.target) {
          const oldSrc = parentMap.get(parent.source || '')?.label || parent.source || 'Node';
          const oldTgt = parentMap.get(parent.target || '')?.label || parent.target || 'Node';
          const newSrc = currentMap.get(curr.source || '')?.label || curr.source || 'Node';
          const newTgt = currentMap.get(curr.target || '')?.label || curr.target || 'Node';
          changes.push(`rerouted from (${oldSrc} ➔ ${oldTgt}) to (${newSrc} ➔ ${newTgt})`);
        }
      } else {
        // Geometric coordinate movement (check if moved > 5px)
        if (parent.x !== undefined && curr.x !== undefined && (Math.abs(parent.x - curr.x) > 5 || Math.abs((parent.y || 0) - (curr.y || 0)) > 5)) {
          changes.push(`moved to (${Math.round(curr.x)}, ${Math.round(curr.y || 0)})`);
        }
        // Dimension resizing (check if resized > 5px)
        if (parent.width !== undefined && curr.width !== undefined && (Math.abs(parent.width - curr.width) > 5 || Math.abs((parent.height || 0) - (curr.height || 0)) > 5)) {
          changes.push(`resized to ${Math.round(curr.width)}x${Math.round(curr.height || 0)}px`);
        }
      }

      if (changes.length > 0) {
        const prefix = curr.isEdge ? 'Connection' : 'Component';
        const label = curr.label || parent.label || id;
        modified.push(`${prefix} "${label}": ${changes.join(', ')}`);
      }
    }
  });

  // Find removed items
  parentMap.forEach((parent, id) => {
    if (!currentMap.has(id)) {
      if (parent.isEdge) {
        const srcLabel = parentMap.get(parent.source || '')?.label || parent.source || 'Component';
        const tgtLabel = parentMap.get(parent.target || '')?.label || parent.target || 'Component';
        removed.push(`Connection: ${srcLabel} ➔ ${tgtLabel}`);
      } else {
        removed.push(parent.label || `Node (${id})`);
      }
    }
  });

  return { added, removed, modified };
}
