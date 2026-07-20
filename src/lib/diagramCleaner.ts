import { XMLParser, XMLBuilder } from 'fast-xml-parser';

export interface CleanVariantResult {
  success: boolean;
  cleanedXml: string;
  modifiedNodesCount: number;
}

/**
 * 🧹 Transforms a dense, text-heavy Draw.io XML diagram into Option 2:
 * Indexed Numbering & Tooltip Metadata (Minimalist Clean Variant).
 * 
 * - Simplifies node labels to concise titles (e.g. `[1] Client Portal`).
 * - Moves verbose subtitles and descriptions into Draw.io `tooltip` attributes for hover inspection.
 * - Removes cluttered text overlays from directional edge arrows.
 */
export function createMinimalistCleanVariant(xmlInput: string): CleanVariantResult {
  if (!xmlInput || typeof xmlInput !== 'string') {
    return { success: false, cleanedXml: xmlInput, modifiedNodesCount: 0 };
  }

  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    allowBooleanAttributes: true,
    parseTagValue: false,
    parseAttributeValue: false,
  });

  let ast: any = null;
  try {
    ast = parser.parse(xmlInput);
  } catch {
    return { success: false, cleanedXml: xmlInput, modifiedNodesCount: 0 };
  }

  if (!ast.mxfile || !ast.mxfile.diagram || !ast.mxfile.diagram.mxGraphModel || !ast.mxfile.diagram.mxGraphModel.root) {
    return { success: false, cleanedXml: xmlInput, modifiedNodesCount: 0 };
  }

  let root = ast.mxfile.diagram.mxGraphModel.root;
  let cells: any[] = root.mxCell ? (Array.isArray(root.mxCell) ? root.mxCell : [root.mxCell]) : [];
  let modifiedNodesCount = 0;

  for (const cell of cells) {
    // 1. Clean Edge Arrows (edge="1"): Remove verbose connection labels
    if (cell['@_edge'] === '1' || cell['@_edge'] === true) {
      if (cell['@_value']) {
        const fullEdgeValue = cell['@_value'];
        // Store full label in tooltip
        cell['@_tooltip'] = fullEdgeValue.replace(/<[^>]+>/g, '').trim();
        // Clear value on edge to keep arrows clean and readable
        cell['@_value'] = '';
        modifiedNodesCount++;
      }
      continue;
    }

    // 2. Clean Vertex Nodes (vertex="1")
    if (cell['@_vertex'] === '1' || cell['@_vertex'] === true) {
      const rawValue = cell['@_value'] || '';
      if (!rawValue) continue;

      // Extract Icon image if present
      const imgMatch = rawValue.match(/<img[^>]*>/i);
      const iconTag = imgMatch ? imgMatch[0] : '';

      // Clean plain text representation
      const plainText = rawValue.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

      // Extract Index & Main Title (e.g. "[1] Remy Client Portal" or "Google Secret Manager")
      const titleMatch = rawValue.match(/(?:&lt;b&gt;|<b>)(.*?)(?:&lt;\/b&gt;|<\/b>)/i);
      let mainTitle = '';

      if (titleMatch && titleMatch[1]) {
        mainTitle = titleMatch[1].replace(/<[^>]+>/g, '').trim();
      } else {
        // Fallback to first 25 chars of plain text
        const parts = plainText.split(/[-–—:]/);
        mainTitle = parts[0]?.trim() || plainText.slice(0, 25);
      }

      // Extract Subtitle / Description text for tooltip
      const subMatch = rawValue.match(/(?:&lt;i&gt;|<i>)(.*?)(?:&lt;\/i&gt;|<\/i>)/i);
      let subtitle = subMatch && subMatch[1] ? subMatch[1].replace(/<[^>]+>/g, '').trim() : '';

      if (!subtitle && plainText.length > mainTitle.length) {
        subtitle = plainText.replace(mainTitle, '').replace(/^[-–—:\s]+/, '').trim();
      }

      // Attach tooltip attribute with full subtitle description
      if (subtitle) {
        cell['@_tooltip'] = `${mainTitle} — ${subtitle}`;
      } else {
        cell['@_tooltip'] = mainTitle;
      }

      // Construct minimalist clean label
      const cleanValue = `${iconTag}<b>${mainTitle}</b>`;
      cell['@_value'] = cleanValue;
      modifiedNodesCount++;
    }
  }

  root.mxCell = cells;

  const builder = new XMLBuilder({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    format: true,
    indentBy: '  ',
    suppressEmptyNode: true,
  });

  const cleanedXml = builder.build(ast);

  return {
    success: true,
    cleanedXml,
    modifiedNodesCount
  };
}
