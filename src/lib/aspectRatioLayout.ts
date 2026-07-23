/**
 * Aspect Ratio Auto-Layout Engine for PromptCanvas
 * Recalculates Draw.io mxGraph XML node geometry (x, y coordinates)
 * for top-level container groups (parent="1") to fit targeted aspect ratios
 * (16:9, 4:3, 1:1, 9:16, 21:9, or Custom W:H) instantly on the client side.
 */

import { XMLParser, XMLBuilder } from 'fast-xml-parser';

export interface AspectRatioOption {
  id: string;
  label: string;
  ratio: number;
  description: string;
}

export const ASPECT_RATIO_PRESETS: AspectRatioOption[] = [
  { id: '16:9', label: '16:9 Widescreen', ratio: 16 / 9, description: 'Desktop Presenter (Default)' },
  { id: '4:3', label: '4:3 Slide', ratio: 4 / 3, description: 'Executive PDF & Slide Deck' },
  { id: '1:1', label: '1:1 Square', ratio: 1 / 1, description: 'Documentation Card & Social Share' },
  { id: '9:16', label: '9:16 Vertical', ratio: 9 / 16, description: 'Mobile Viewport Stack' },
  { id: '21:9', label: '21:9 Ultra-Wide', ratio: 21 / 9, description: 'Command Center Monitor' },
  { id: 'custom', label: 'Custom Ratio...', ratio: 16 / 9, description: 'User-Defined Width:Height' },
];

export function parseAspectRatioQuotient(ratioStr: string, customW?: number, customH?: number): number {
  if (ratioStr === 'custom' && customW && customH && customH > 0) {
    return customW / customH;
  }
  const preset = ASPECT_RATIO_PRESETS.find(p => p.id === ratioStr);
  if (preset) return preset.ratio;
  
  if (ratioStr && ratioStr.includes(':')) {
    const [w, h] = ratioStr.split(':').map(Number);
    if (w && h && h > 0) return w / h;
  }
  return 16 / 9; // Default
}

interface ParsedNode {
  id: string;
  cell: any;
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Re-layouts Draw.io mxGraph XML top-level container groups (parent="1")
 * to fit targeted aspect ratio bounds.
 */
export function rearrangeDiagramForAspectRatio(
  xmlContent: string,
  aspectRatioId: string,
  customWidth?: number,
  customHeight?: number
): string {
  if (!xmlContent || !xmlContent.includes('<mxGraphModel>')) {
    return xmlContent;
  }

  const R = parseAspectRatioQuotient(aspectRatioId, customWidth, customHeight);

  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    allowBooleanAttributes: true,
    parseTagValue: false,
    parseAttributeValue: false,
  });

  let ast: any = null;
  try {
    ast = parser.parse(xmlContent);
  } catch {
    return xmlContent;
  }

  const diagramObj = Array.isArray(ast.mxfile?.diagram) ? ast.mxfile.diagram[0] : ast.mxfile?.diagram;
  if (!diagramObj || !diagramObj.mxGraphModel || !diagramObj.mxGraphModel.root) {
    return xmlContent;
  }

  let root = diagramObj.mxGraphModel.root;
  let cells: any[] = root.mxCell ? (Array.isArray(root.mxCell) ? root.mxCell : [root.mxCell]) : [];

  // Filter top-level container vertices (parent="1" or parent is root)
  const topLevelVertices = cells.filter(
    (c: any) => (c['@_vertex'] === '1' || c['@_vertex'] === true) && 
           (c['@_parent'] === '1' || !c['@_parent']) && 
           c['@_id'] !== 'header_title' &&
           c.mxGeometry
  );

  if (topLevelVertices.length === 0) return xmlContent;

  const parsedNodes: ParsedNode[] = topLevelVertices.map((cell: any) => ({
    id: String(cell['@_id']),
    cell,
    x: parseFloat(cell.mxGeometry['@_x'] || '100'),
    y: parseFloat(cell.mxGeometry['@_y'] || '100'),
    width: parseFloat(cell.mxGeometry['@_width'] || '200'),
    height: parseFloat(cell.mxGeometry['@_height'] || '70'),
  }));

  parsedNodes.sort((a, b) => a.x - b.x);

  if (R < 0.85 || R <= 1.1) {
    // 📱 9:16 Vertical & 1:1 Square: Stack top-level container groups into vertical rows
    let currentY = 80;
    const maxCols = R < 0.85 ? 1 : 2;

    parsedNodes.forEach((node, idx) => {
      const col = idx % maxCols;

      const newX = Math.round(40 + col * (node.width + 40));
      const newY = Math.round(currentY);

      node.cell.mxGeometry['@_x'] = String(newX);
      node.cell.mxGeometry['@_y'] = String(newY);

      if (col === maxCols - 1 || idx === parsedNodes.length - 1) {
        currentY += node.height + 60;
      }
    });
  } else if (R >= 1.6) {
    // 🖥️ 16:9 Widescreen: Horizontal Row Layout
    let currentX = 40;
    let currentY = 80;

    parsedNodes.forEach((node) => {
      node.cell.mxGeometry['@_x'] = String(currentX);
      node.cell.mxGeometry['@_y'] = String(currentY);
      currentX += node.width + 30;
    });
  }

  root.mxCell = cells;

  const builder = new XMLBuilder({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    format: true,
    indentBy: '  ',
    suppressEmptyNode: true,
  });

  return builder.build(ast);
}
