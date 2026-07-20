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
 * Fixes all visual defects:
 * 1. Resolves all Node-on-Node collisions via a 7-tier Layered Grid Auto-Layout Engine.
 * 2. Applies Orthogonal Edge Routing (`edgeStyle=orthogonalEdgeStyle`) to prevent line-through-text defects.
 * 3. Simplifies node labels to concise titles (e.g. `[1] Client Portal`).
 * 4. Offloads subtitles & edge descriptions to Draw.io hover tooltips (`tooltip="..."`).
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

  // Separate vertex cells and edge cells
  const vertexCells: any[] = [];
  const edgeCells: any[] = [];

  for (const cell of cells) {
    const cellId = String(cell['@_id'] || '');
    if (cellId === '0' || cellId === '1') continue;

    if (cell['@_edge'] === '1' || cell['@_edge'] === true) {
      edgeCells.push(cell);
    } else if (cell['@_vertex'] === '1' || cell['@_vertex'] === true) {
      vertexCells.push(cell);
    }
  }

  // 1. Process Edges: Apply Orthogonal Routing & Move labels to tooltips
  for (const edge of edgeCells) {
    let style = String(edge['@_style'] || '');
    if (!style.includes('orthogonalEdgeStyle')) {
      // Apply orthogonal routing to prevent line-through-text overlaps
      style = `edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;${style}`;
      edge['@_style'] = style;
    }

    if (edge['@_value']) {
      const fullEdgeValue = edge['@_value'];
      const cleanEdgeText = fullEdgeValue.replace(/<[^>]+>/g, '').trim();
      if (cleanEdgeText) {
        edge['@_tooltip'] = cleanEdgeText;
      }
      edge['@_value'] = ''; // Clear edge label text to keep arrows clean
      modifiedNodesCount++;
    }
  }

  // 2. Process Vertices: Clean text & Assign to 7-Tier Grid Layout
  const tiers: { [tierIdx: number]: any[] } = {
    0: [], // Ingress / Portal
    1: [], // Perimeter Security / Gateways
    2: [], // Compute & Orchestration
    3: [], // Security & Encryption Middleware
    4: [], // Database & Storage Tier
    5: [], // Task Queues & Workers
    6: [], // Observability, SIEM & Analytics
  };

  for (const vertex of vertexCells) {
    const rawValue = String(vertex['@_value'] || '');
    const plainText = rawValue.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

    // Extract Icon image if present
    const imgMatch = rawValue.match(/<img[^>]*>/i);
    const iconTag = imgMatch ? imgMatch[0] : '';

    // Extract Index & Main Title
    const titleMatch = rawValue.match(/(?:&lt;b&gt;|<b>)(.*?)(?:&lt;\/b&gt;|<\/b>)/i);
    let mainTitle = '';

    if (titleMatch && titleMatch[1]) {
      mainTitle = titleMatch[1].replace(/<[^>]+>/g, '').trim();
    } else {
      const parts = plainText.split(/[-–—:]/);
      mainTitle = parts[0]?.trim() || plainText.slice(0, 25);
    }

    // Extract Subtitle
    const subMatch = rawValue.match(/(?:&lt;i&gt;|<i>)(.*?)(?:&lt;\/i&gt;|<\/i>)/i);
    let subtitle = subMatch && subMatch[1] ? subMatch[1].replace(/<[^>]+>/g, '').trim() : '';

    if (!subtitle && plainText.length > mainTitle.length) {
      subtitle = plainText.replace(mainTitle, '').replace(/^[-–—:\s]+/, '').trim();
    }

    // Set Tooltip
    if (subtitle) {
      vertex['@_tooltip'] = `${mainTitle} — ${subtitle}`;
    } else {
      vertex['@_tooltip'] = mainTitle;
    }

    // Set Clean Concise Label
    vertex['@_value'] = `${iconTag}<b>${mainTitle}</b>`;
    modifiedNodesCount++;

    // Classify into Tier based on Index or Keywords
    const numMatch = mainTitle.match(/\[(\d+)\]/);
    const nodeNum = numMatch ? parseInt(numMatch[1], 10) : null;

    let tierIdx = 2; // Default to compute

    if (nodeNum !== null) {
      if (nodeNum === 1) tierIdx = 0;
      else if ([2, 3, 4].includes(nodeNum)) tierIdx = 1;
      else if ([5, 6, 7].includes(nodeNum)) tierIdx = 2;
      else if ([8, 9, 10, 11].includes(nodeNum)) tierIdx = 4;
      else if ([12, 13].includes(nodeNum)) tierIdx = 5;
      else if ([14, 15, 16, 17, 18].includes(nodeNum)) tierIdx = 6;
    } else {
      const lower = plainText.toLowerCase();
      if (lower.includes('portal') || lower.includes('client') || lower.includes('app')) tierIdx = 0;
      else if (lower.includes('waf') || lower.includes('proxy') || lower.includes('gateway')) tierIdx = 1;
      else if (lower.includes('orchestrator') || lower.includes('llm') || lower.includes('langchain')) tierIdx = 2;
      else if (lower.includes('kms') || lower.includes('dlp') || lower.includes('secret') || lower.includes('vpc service')) tierIdx = 3;
      else if (lower.includes('db') || lower.includes('sql') || lower.includes('store') || lower.includes('spanner') || lower.includes('registry')) tierIdx = 4;
      else if (lower.includes('queue') || lower.includes('instance') || lower.includes('runtime')) tierIdx = 5;
      else if (lower.includes('monitoring') || lower.includes('log') || lower.includes('scc') || lower.includes('bigquery')) tierIdx = 6;
    }

    tiers[tierIdx].push(vertex);
  }

  // 3. Grid Coordinates Calculation per Tier
  // Spacing Configuration
  const startY = 60;
  const rowHeight = 160; // Generous vertical gap between layers
  const nodeWidth = 240;
  const nodeHeight = 65;
  const gapX = 60; // Horizontal gap between adjacent nodes in a row
  const canvasWidth = 1400;

  for (let tierIdx = 0; tierIdx <= 6; tierIdx++) {
    const nodesInTier = tiers[tierIdx];
    if (nodesInTier.length === 0) continue;

    const currentY = startY + tierIdx * rowHeight;
    const totalRowWidth = nodesInTier.length * nodeWidth + (nodesInTier.length - 1) * gapX;
    let startX = Math.max(60, (canvasWidth - totalRowWidth) / 2);

    for (let colIdx = 0; colIdx < nodesInTier.length; colIdx++) {
      const vertex = nodesInTier[colIdx];
      const currentX = startX + colIdx * (nodeWidth + gapX);

      if (!vertex.mxGeometry) {
        vertex.mxGeometry = { '@_as': 'geometry' };
      }
      vertex.mxGeometry['@_x'] = String(Math.round(currentX));
      vertex.mxGeometry['@_y'] = String(Math.round(currentY));
      vertex.mxGeometry['@_width'] = String(nodeWidth);
      vertex.mxGeometry['@_height'] = String(nodeHeight);
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
