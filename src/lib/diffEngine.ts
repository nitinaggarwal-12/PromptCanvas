/**
 * 🔍 Architecture AST & Geometric Diff Engine for Draw.io XML
 * Performs deep semantic comparison between two architecture diagram versions.
 */

export interface DiffItem {
  id: string;
  name: string;
  category: 'node' | 'edge' | 'text' | 'route';
  type: 'added' | 'modified' | 'removed';
  description: string;
  details?: string;
  beforeSnippet?: string;
  afterSnippet?: string;
}

export interface ArchitectureDiffResult {
  summary: string;
  stats: {
    addedCount: number;
    modifiedCount: number;
    removedCount: number;
    edgesChangedCount: number;
    totalChanges: number;
  };
  addedNodes: DiffItem[];
  modifiedNodes: DiffItem[];
  removedNodes: DiffItem[];
  addedEdges: DiffItem[];
  modifiedEdges: DiffItem[];
  removedEdges: DiffItem[];
  textChanges: DiffItem[];
}

function stripHtml(html: string): string {
  if (!html) return '';
  return html
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractPrimaryTitle(html: string): string {
  if (!html) return '';
  const decoded = html
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"');
  
  // Match bold tags or font tags
  const bMatch = decoded.match(/<b[^>]*>([^<]+)<\/b>/i);
  if (bMatch && bMatch[1]?.trim()) return bMatch[1].trim();

  const titleMatch = decoded.match(/font-size:\s*(?:1[2-9]|2[0-9])px[^>]*>([^<]+)</i);
  if (titleMatch && titleMatch[1]?.trim()) return titleMatch[1].trim();

  const plain = stripHtml(html);
  if (plain.length > 0) {
    const parts = plain.split(/[•\n|—–-]/);
    return parts[0].trim().slice(0, 40);
  }
  return '';
}

interface ParsedCell {
  id: string;
  value: string;
  cleanText: string;
  title: string;
  isVertex: boolean;
  isEdge: boolean;
  source?: string;
  target?: string;
  style: string;
  geometry?: {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    points?: string;
  };
}

function parseCellsFromXml(xml: string): Map<string, ParsedCell> {
  const map = new Map<string, ParsedCell>();
  if (!xml) return map;

  // Regex to match mxCell tags
  const cellRegex = /<mxCell\s+([^>]+?)(?:\/>|>([\s\S]*?)<\/mxCell>)/gi;
  let match;

  while ((match = cellRegex.exec(xml)) !== null) {
    const attrString = match[1] || '';
    const inner = match[2] || '';

    // Extract attributes
    const idMatch = attrString.match(/id=["']([^"']+)["']/i);
    if (!idMatch || !idMatch[1]) continue;
    const id = idMatch[1];
    if (id === '0' || id === '1') continue; // Root containers

    const valueMatch = attrString.match(/value=["']([\s\S]*?)["']/i);
    const rawValue = valueMatch ? valueMatch[1] : '';

    const styleMatch = attrString.match(/style=["']([\s\S]*?)["']/i);
    const style = styleMatch ? styleMatch[1] : '';

    const vertexMatch = attrString.match(/vertex=["']1["']/i);
    const edgeMatch = attrString.match(/edge=["']1["']/i);

    const sourceMatch = attrString.match(/source=["']([^"']+)["']/i);
    const targetMatch = attrString.match(/target=["']([^"']+)["']/i);

    // Extract geometry
    const geoMatch = (attrString + inner).match(/<mxGeometry\s+([^>]+?)(?:\/>|>([\s\S]*?)<\/mxGeometry>)/i);
    let geometry: ParsedCell['geometry'];
    if (geoMatch) {
      const geoAttrs = geoMatch[1] || '';
      const x = geoAttrs.match(/x=["']([\d.-]+)["']/i);
      const y = geoAttrs.match(/y=["']([\d.-]+)["']/i);
      const w = geoAttrs.match(/width=["']([\d.-]+)["']/i);
      const h = geoAttrs.match(/height=["']([\d.-]+)["']/i);
      geometry = {
        x: x ? parseFloat(x[1]) : undefined,
        y: y ? parseFloat(y[1]) : undefined,
        width: w ? parseFloat(w[1]) : undefined,
        height: h ? parseFloat(h[1]) : undefined
      };
    }

    const cleanText = stripHtml(rawValue);
    const title = extractPrimaryTitle(rawValue) || (vertexMatch ? cleanText.slice(0, 30) : `Connector ${id}`);

    map.set(id, {
      id,
      value: rawValue,
      cleanText,
      title,
      isVertex: Boolean(vertexMatch),
      isEdge: Boolean(edgeMatch),
      source: sourceMatch ? sourceMatch[1] : undefined,
      target: targetMatch ? targetMatch[1] : undefined,
      style,
      geometry
    });
  }

  return map;
}

export function computeArchitectureDiff(
  xmlBefore: string,
  xmlAfter: string,
  versionTagBefore = 'v1.0',
  versionTagAfter = 'v2.0'
): ArchitectureDiffResult {
  const cellsA = parseCellsFromXml(xmlBefore);
  const cellsB = parseCellsFromXml(xmlAfter);

  const addedNodes: DiffItem[] = [];
  const modifiedNodes: DiffItem[] = [];
  const removedNodes: DiffItem[] = [];

  const addedEdges: DiffItem[] = [];
  const modifiedEdges: DiffItem[] = [];
  const removedEdges: DiffItem[] = [];

  const textChanges: DiffItem[] = [];

  // Check nodes in B vs A
  for (const [id, cellB] of cellsB.entries()) {
    const cellA = cellsA.get(id);

    if (cellB.isVertex) {
      if (!cellA) {
        addedNodes.push({
          id,
          name: cellB.title || `Node ${id}`,
          category: 'node',
          type: 'added',
          description: `Added architectural component: "${cellB.title}"`,
          details: cellB.cleanText ? `Content: ${cellB.cleanText.slice(0, 100)}` : undefined,
          afterSnippet: cellB.cleanText
        });
      } else {
        // Check for modifications
        const textChanged = cellA.cleanText !== cellB.cleanText;
        const styleChanged = cellA.style !== cellB.style;
        const posChanged =
          cellA.geometry?.x !== cellB.geometry?.x ||
          cellA.geometry?.y !== cellB.geometry?.y ||
          cellA.geometry?.width !== cellB.geometry?.width ||
          cellA.geometry?.height !== cellB.geometry?.height;

        if (textChanged || styleChanged || posChanged) {
          const reasons: string[] = [];
          if (textChanged) reasons.push('Updated label / specification');
          if (styleChanged) reasons.push('Refined visual styling / theme');
          if (posChanged) reasons.push('Repositioned in grid tier');

          modifiedNodes.push({
            id,
            name: cellB.title || cellA.title || `Node ${id}`,
            category: 'node',
            type: 'modified',
            description: reasons.join(' • '),
            beforeSnippet: cellA.cleanText,
            afterSnippet: cellB.cleanText
          });

          if (textChanged && cellA.cleanText && cellB.cleanText) {
            textChanges.push({
              id: `txt_${id}`,
              name: cellB.title || `Text on ${id}`,
              category: 'text',
              type: 'modified',
              description: `Modified label on "${cellB.title}"`,
              beforeSnippet: cellA.cleanText,
              afterSnippet: cellB.cleanText
            });
          }
        }
      }
    } else if (cellB.isEdge) {
      if (!cellA) {
        addedEdges.push({
          id,
          name: cellB.title || `Route ${cellB.source || ''} → ${cellB.target || ''}`,
          category: 'edge',
          type: 'added',
          description: `Added flow route / connector: ${cellB.title || id}`,
          details: cellB.style.includes('dashed=1') ? 'Asynchronous / Event-driven channel' : 'Synchronous direct channel',
          afterSnippet: cellB.style
        });
      } else {
        const styleChanged = cellA.style !== cellB.style;
        const textChanged = cellA.cleanText !== cellB.cleanText;

        if (styleChanged || textChanged) {
          let desc = 'Updated edge routing waypoints & connector style';
          if (cellB.style.includes('orthogonal') && !cellA.style.includes('orthogonal')) {
            desc = 'Enforced strict orthogonal 90-degree routing';
          } else if (textChanged) {
            desc = `Updated connector protocol label: "${cellB.cleanText}"`;
          }

          modifiedEdges.push({
            id,
            name: cellB.title || `Route ${id}`,
            category: 'edge',
            type: 'modified',
            description: desc,
            beforeSnippet: cellA.cleanText || cellA.style,
            afterSnippet: cellB.cleanText || cellB.style
          });
        }
      }
    }
  }

  // Check nodes in A that were removed in B
  for (const [id, cellA] of cellsA.entries()) {
    if (!cellsB.has(id)) {
      if (cellA.isVertex) {
        removedNodes.push({
          id,
          name: cellA.title || `Node ${id}`,
          category: 'node',
          type: 'removed',
          description: `Removed component: "${cellA.title}"`,
          beforeSnippet: cellA.cleanText
        });
      } else if (cellA.isEdge) {
        removedEdges.push({
          id,
          name: cellA.title || `Route ${id}`,
          category: 'edge',
          type: 'removed',
          description: `Deprecated connector route: ${cellA.title || id}`,
          beforeSnippet: cellA.cleanText || cellA.style
        });
      }
    }
  }

  const addedCount = addedNodes.length + addedEdges.length;
  const modifiedCount = modifiedNodes.length + modifiedEdges.length;
  const removedCount = removedNodes.length + removedEdges.length;
  const edgesChangedCount = addedEdges.length + modifiedEdges.length + removedEdges.length;
  const totalChanges = addedCount + modifiedCount + removedCount;

  let summary = `Compared ${versionTagBefore} vs ${versionTagAfter}: `;
  if (totalChanges === 0) {
    summary += 'Architectures are identical with 0 structural deltas.';
  } else {
    const parts: string[] = [];
    if (addedNodes.length > 0) parts.push(`+${addedNodes.length} nodes added`);
    if (modifiedNodes.length > 0) parts.push(`${modifiedNodes.length} nodes modified`);
    if (removedNodes.length > 0) parts.push(`-${removedNodes.length} nodes removed`);
    if (edgesChangedCount > 0) parts.push(`${edgesChangedCount} connector routes updated`);
    summary += parts.join(', ');
  }

  return {
    summary,
    stats: {
      addedCount,
      modifiedCount,
      removedCount,
      edgesChangedCount,
      totalChanges
    },
    addedNodes,
    modifiedNodes,
    removedNodes,
    addedEdges,
    modifiedEdges,
    removedEdges,
    textChanges
  };
}
