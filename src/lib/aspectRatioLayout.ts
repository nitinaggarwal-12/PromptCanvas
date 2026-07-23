/**
 * Aspect Ratio Auto-Layout Engine for PromptCanvas
 * Recalculates Draw.io mxGraph XML node geometry (x, y coordinates)
 * for top-level nodes (parent="1") to fit targeted aspect ratios
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
 * Re-layouts Draw.io mxGraph XML top-level nodes (parent="1")
 * to fit targeted aspect ratio bounds cleanly.
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

  // Filter top-level vertices (parent="1" or parent is root)
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
    width: parseFloat(cell.mxGeometry['@_width'] || '220'),
    height: parseFloat(cell.mxGeometry['@_height'] || '60'),
  }));

  // Sort nodes naturally by ID or original position
  parsedNodes.sort((a, b) => a.y - b.y || a.x - b.x);

  if (R < 0.85) {
    // 📱 9:16 Vertical Mobile Stack (2 columns per row, compact height so all nodes fit on screen)
    const maxCols = 2;
    const colWidth = 240;
    const rowHeight = 95;

    parsedNodes.forEach((node, idx) => {
      const col = idx % maxCols;
      const row = Math.floor(idx / maxCols);

      const newX = Math.round(30 + col * (colWidth + 20));
      const newY = Math.round(80 + row * rowHeight);

      node.cell.mxGeometry['@_x'] = String(newX);
      node.cell.mxGeometry['@_y'] = String(newY);
    });
  } else if (R <= 1.15) {
    // ⏹️ 1:1 Square Grid (3 columns per row, balanced square card matrix)
    const maxCols = 3;
    const colWidth = 230;
    const rowHeight = 105;

    parsedNodes.forEach((node, idx) => {
      const col = idx % maxCols;
      const row = Math.floor(idx / maxCols);

      const newX = Math.round(40 + col * (colWidth + 25));
      const newY = Math.round(80 + row * rowHeight);

      node.cell.mxGeometry['@_x'] = String(newX);
      node.cell.mxGeometry['@_y'] = String(newY);
    });
  } else if (R < 1.5) {
    // 📊 4:3 Executive Slide Deck (3 columns per row, wide slide spacing)
    const maxCols = 3;
    const colWidth = 250;
    const rowHeight = 115;

    parsedNodes.forEach((node, idx) => {
      const col = idx % maxCols;
      const row = Math.floor(idx / maxCols);

      const newX = Math.round(50 + col * (colWidth + 30));
      const newY = Math.round(80 + row * rowHeight);

      node.cell.mxGeometry['@_x'] = String(newX);
      node.cell.mxGeometry['@_y'] = String(newY);
    });
  } else {
    // 🖥️ 16:9 Widescreen Baseline (4 columns per row, spacious horizontal presenter layout)
    const maxCols = 4;
    const colWidth = 240;
    const rowHeight = 110;

    parsedNodes.forEach((node, idx) => {
      const col = idx % maxCols;
      const row = Math.floor(idx / maxCols);

      const newX = Math.round(40 + col * (colWidth + 30));
      const newY = Math.round(80 + row * rowHeight);

      node.cell.mxGeometry['@_x'] = String(newX);
      node.cell.mxGeometry['@_y'] = String(newY);
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
