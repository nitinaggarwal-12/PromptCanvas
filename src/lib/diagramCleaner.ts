import { XMLParser, XMLBuilder } from 'fast-xml-parser';

export interface CleanVariantResult {
  success: boolean;
  cleanedXml: string;
  modifiedNodesCount: number;
}

/**
 * ✂️ Formats edge label text to be at most 2 lines (1 line if <= 18 chars).
 * Prevents vertical text towers.
 */
function formatEdgeLabelToMax2Lines(text: string): string {
  if (!text) return '';
  const clean = text.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  if (!clean) return '';

  let formatted = clean;
  if (clean.length > 18) {
    const words = clean.split(' ');
    if (words.length > 2) {
      const mid = Math.ceil(words.length / 2);
      formatted = `${words.slice(0, mid).join(' ')}<br/>${words.slice(mid).join(' ')}`;
    }
  }

  return `<font color="#ffffff"><b>${formatted}</b></font>`;
}

/**
 * 📐 Core Tier Classification and Spacing Layout Engine.
 * Formats both Detailed View and Clean View with generous node spacing (gapX=160px, rowHeight=220px).
 */
function applyGenerousNodeLayout(cells: any[], isDetailedView: boolean) {
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

  // 1. Process Vertices & Assign to 7 Architectural Tiers
  const tiers: { [tierIdx: number]: any[] } = {
    0: [], // Ingress / Portal
    1: [], // Perimeter Security / Gateways
    2: [], // Core Frontend & Mid-Tier
    3: [], // Microservices & Backend API Tier
    4: [], // Storage & Database Tier
    5: [], // Serverless Functions & Event Queues
    6: [], // Observability & IAM Management
  };

  const vertexPosMap: { [id: string]: { x: number; y: number; tier: number } } = {};

  for (const vertex of vertexCells) {
    // Preserve natural node shapes with perimeterSpacing=0 so arrowheads touch box edges directly
    let style = String(vertex['@_style'] || '');
    if (!style.includes('whiteSpace=wrap')) {
      style = `whiteSpace=wrap;html=1;${style}`;
    }
    style = style.replace(/;?perimeterSpacing=[^;]*/g, '');
    style = `perimeter=rectanglePerimeter;perimeterSpacing=0;${style}`;
    vertex['@_style'] = style;

    const rawValue = String(vertex['@_value'] || '');
    const plainText = rawValue.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

    const titleMatch = rawValue.match(/(?:&lt;b&gt;|<b>)(.*?)(?:&lt;\/b&gt;|<\/b>)/i);
    let mainTitle = titleMatch && titleMatch[1] ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : '';

    if (!mainTitle) {
      const parts = plainText.split(/[-–—:]/);
      mainTitle = parts[0]?.trim() || plainText.slice(0, 25);
    }

    const numMatch = mainTitle.match(/\[(\d+)\]/);
    const nodeNum = numMatch ? parseInt(numMatch[1], 10) : null;

    let tierIdx = 3; // Default mid-tier

    if (nodeNum !== null) {
      if (nodeNum === 1) tierIdx = 0;
      else if ([2, 3, 100].includes(nodeNum)) tierIdx = 1;
      else if ([4, 101, 103].includes(nodeNum)) tierIdx = 2;
      else if ([5, 6].includes(nodeNum)) tierIdx = 3;
      else if ([7, 8, 9, 10].includes(nodeNum)) tierIdx = 4;
      else if ([11].includes(nodeNum)) tierIdx = 5;
      else if ([12, 13].includes(nodeNum)) tierIdx = 6;
      else if ([14, 15, 16, 17, 18].includes(nodeNum)) tierIdx = 7;
      else tierIdx = Math.min(7, Math.floor((nodeNum - 1) / 2.5)); // Dynamic scaling for N > 18 nodes
    } else {
      const lower = plainText.toLowerCase();
      if (lower.includes('browser') || lower.includes('client') || lower.includes('portal') || lower.includes('iot')) tierIdx = 0;
      else if (lower.includes('waf') || lower.includes('load balancer') || lower.includes('apigee') || lower.includes('cdn')) tierIdx = 1;
      else if (lower.includes('frontend') || lower.includes('ingress') || lower.includes('secret manager')) tierIdx = 2;
      else if (lower.includes('backend') || lower.includes('compute') || lower.includes('vision') || lower.includes('microservice')) tierIdx = 3;
      else if (lower.includes('storage') || lower.includes('db') || lower.includes('spanner') || lower.includes('bigquery') || lower.includes('sql')) tierIdx = 4;
      else if (lower.includes('composer') || lower.includes('orchestrat') || lower.includes('iam')) tierIdx = 5;
      else if (lower.includes('monitoring') || lower.includes('logging') || lower.includes('audit')) tierIdx = 6;
      else if (lower.includes('dlq') || lower.includes('dead letter') || lower.includes('failover') || lower.includes('interlock') || lower.includes('compliance')) tierIdx = 7;
    }

    tiers[tierIdx] = tiers[tierIdx] || [];
    tiers[tierIdx].push(vertex);
  }

  // 2. Compute Spaced Coordinates for Vertices (Widescreen 16:9 Slide Ratio: max 3-4 nodes/row, tight 65px row gap)
  const startY = 40;
  const rowHeight = isDetailedView ? 140 : 120; // Tight 140px row height (75px node + 65px vertical gap, zero blank space)
  const nodeWidth = 220;
  const nodeHeight = isDetailedView ? 75 : 55;
  const gapX = 90; // Balanced 90px horizontal gap between nodes
  const canvasWidth = 1180;
  let currentY = startY;

  let maxRightX = 0;
  let minLeftX = 1180;

  for (let tierIdx = 0; tierIdx <= 7; tierIdx++) {
    const nodesInTier = tiers[tierIdx] || [];
    if (nodesInTier.length === 0) continue;

    // Allow up to 3 nodes per sub-row for widescreen 16:9 balance
    const maxPerRow = nodesInTier.length === 4 ? 4 : 3;
    const currentGapX = nodesInTier.length === 4 ? 50 : gapX;

    for (let r = 0; r < nodesInTier.length; r += maxPerRow) {
      const rowNodes = nodesInTier.slice(r, r + maxPerRow);
      const totalRowWidth = rowNodes.length * nodeWidth + (rowNodes.length - 1) * currentGapX;
      const startX = Math.max(120, (canvasWidth - totalRowWidth) / 2);

      for (let colIdx = 0; colIdx < rowNodes.length; colIdx++) {
        const vertex = rowNodes[colIdx];
        const currentX = startX + colIdx * (nodeWidth + currentGapX);
        const vId = String(vertex['@_id'] || '');

        if (!vertex.mxGeometry) {
          vertex.mxGeometry = { '@_as': 'geometry' };
        }
        vertex.mxGeometry['@_x'] = String(Math.round(currentX));
        vertex.mxGeometry['@_y'] = String(Math.round(currentY));
        vertex.mxGeometry['@_width'] = String(nodeWidth);
        vertex.mxGeometry['@_height'] = String(nodeHeight);

        vertexPosMap[vId] = { x: currentX, y: currentY, tier: tierIdx };
        maxRightX = Math.max(maxRightX, currentX + nodeWidth);
        minLeftX = Math.min(minLeftX, currentX);
      }
      currentY += rowHeight;
    }
  }

  // Calculate Dynamic Outer Gutter X Coordinates guaranteed to be completely outside all shapes
  const dynamicRightGutterX = maxRightX + 100;
  const dynamicLeftGutterX = Math.max(40, minLeftX - 100);

  let rightGutterLaneCount = 0;
  let leftGutterLaneCount = 0;

  // Helper to check if ANY node sits between src and tgt either horizontally or vertically
  const checkAnySegmentIntersectsNode = (
    sPos: { x: number; y: number },
    tPos: { x: number; y: number },
    exSrcId: string,
    exTgtId: string
  ): boolean => {
    const sX1 = sPos.x;
    const sX2 = sPos.x + nodeWidth;
    const sY1 = sPos.y;
    const sY2 = sPos.y + nodeHeight;

    const tX1 = tPos.x;
    const tX2 = tPos.x + nodeWidth;
    const tY1 = tPos.y;
    const tY2 = tPos.y + nodeHeight;

    for (const vId in vertexPosMap) {
      if (vId === exSrcId || vId === exTgtId) continue;
      const vPos = vertexPosMap[vId];
      const vX1 = vPos.x - 10;
      const vX2 = vPos.x + nodeWidth + 10;
      const vY1 = vPos.y - 10;
      const vY2 = vPos.y + nodeHeight + 10;

      // Check horizontal segment intersection: if line travels horizontally between sPos and tPos
      if (Math.abs(sPos.y - tPos.y) < nodeHeight + 30) {
        const minX = Math.min(sX1, tX1);
        const maxX = Math.max(sX2, tX2);
        if (vPos.x > minX - 10 && vPos.x + nodeWidth < maxX + 10 && Math.abs(vPos.y - sPos.y) < nodeHeight + 30) {
          return true; // Node sits in between src and tgt horizontally!
        }
      }

      // Check vertical segment intersection: if line travels vertically between sPos and tPos
      if (Math.abs(sPos.x - tPos.x) < nodeWidth + 30) {
        const minY = Math.min(sY1, tY1);
        const maxY = Math.max(sY2, tY2);
        if (vPos.y > minY - 10 && vPos.y + nodeHeight < maxY + 10 && Math.abs(vPos.x - sPos.x) < nodeWidth + 30) {
          return true; // Node sits in between src and tgt vertically!
        }
      }
    }
    return false;
  };

  // 3. Process Edges & Multi-Port Edge Anchor Distribution with Gutter Waypoints
  const srcEdgeCounts: { [id: string]: number } = {};
  const tgtEdgeCounts: { [id: string]: number } = {};

  for (const edge of edgeCells) {
    const srcId = String(edge['@_source'] || '');
    const tgtId = String(edge['@_target'] || '');
    srcEdgeCounts[srcId] = (srcEdgeCounts[srcId] || 0) + 1;
    tgtEdgeCounts[tgtId] = (tgtEdgeCounts[tgtId] || 0) + 1;
  }

  const srcEdgeIndex: { [id: string]: number } = {};
  const tgtEdgeIndex: { [id: string]: number } = {};

  const getDistributedAnchor = (idx: number, total: number): number => {
    if (total <= 1) return 0.5;
    if (total === 2) return idx === 1 ? 0.35 : 0.65;
    if (total === 3) return idx === 1 ? 0.25 : (idx === 2 ? 0.5 : 0.75);
    const step = 0.8 / (total - 1);
    return Number((0.1 + (idx - 1) * step).toFixed(2));
  };

  for (const edge of edgeCells) {
    let style = String(edge['@_style'] || '');
    style = style
      .replace(/;?fontColor=[^;]*/g, '')
      .replace(/;?labelBackgroundColor=[^;]*/g, '')
      .replace(/;?labelBorderColor=[^;]*/g, '')
      .replace(/;?verticalAlign=[^;]*/g, '')
      .replace(/;?verticalLabelPosition=[^;]*/g, '')
      .replace(/;?align=[^;]*/g, '');
    style = style.replace(/;?(exit|entry)[XY]=[^;]*/g, '');

    if (!style.includes('orthogonalEdgeStyle')) {
      style = `edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;${style}`;
    }
    style += `;fontColor=#ffffff;fontStyle=1;labelBackgroundColor=none;labelBorderColor=none;labelWidth=150;fontSize=11;whiteSpace=wrap;align=center;verticalAlign=middle;html=1;`;

    const srcId = String(edge['@_source'] || '');
    const tgtId = String(edge['@_target'] || '');
    const srcPos = vertexPosMap[srcId];
    const tgtPos = vertexPosMap[tgtId];

    srcEdgeIndex[srcId] = (srcEdgeIndex[srcId] || 0) + 1;
    tgtEdgeIndex[tgtId] = (tgtEdgeIndex[tgtId] || 0) + 1;

    const sIdx = srcEdgeIndex[srcId];
    const sTotal = srcEdgeCounts[srcId] || 1;
    const tIdx = tgtEdgeIndex[tgtId];
    const tTotal = tgtEdgeCounts[tgtId] || 1;

    const exitPort = getDistributedAnchor(sIdx, sTotal);
    const entryPort = getDistributedAnchor(tIdx, tTotal);

    let isHorizontal = false;
    let customWaypoints: any[] | null = null;

    if (srcPos && tgtPos) {
      const tierDiff = Math.abs(srcPos.tier - tgtPos.tier);
      const hasObstacle = checkAnySegmentIntersectsNode(srcPos, tgtPos, srcId, tgtId);

      if (srcPos.tier === tgtPos.tier && !hasObstacle) {
        // Direct horizontal connection between adjacent nodes in same tier
        isHorizontal = true;
        if (srcPos.x < tgtPos.x) {
          style += `;exitX=1;exitY=${exitPort};entryX=0;entryY=${entryPort};`;
        } else {
          style += `;exitX=0;exitY=${exitPort};entryX=1;entryY=${entryPort};`;
        }
      } else if (tierDiff > 1 || hasObstacle) {
        // Route through staggered dynamic outer left or right highway lanes so bypass lines NEVER overlap each other or shapes
        const isRightSide = tgtPos.x >= 500 || srcPos.x >= 500;
        const sideVal = isRightSide ? 1 : 0;
        let gutterX = dynamicRightGutterX;
        if (isRightSide) {
          gutterX = dynamicRightGutterX + rightGutterLaneCount * 35;
          rightGutterLaneCount = (rightGutterLaneCount + 1) % 4;
        } else {
          gutterX = dynamicLeftGutterX - leftGutterLaneCount * 35;
          leftGutterLaneCount = (leftGutterLaneCount + 1) % 4;
        }

        const srcY = srcPos.y + exitPort * nodeHeight;
        const tgtY = tgtPos.y - 30;
        const tgtX = tgtPos.x + entryPort * nodeWidth;

        style += `;exitX=${sideVal};exitY=${exitPort};entryX=${entryPort};entryY=0;`;
        customWaypoints = [
          { '@_x': String(Math.round(gutterX)), '@_y': String(Math.round(srcY)) },
          { '@_x': String(Math.round(gutterX)), '@_y': String(Math.round(tgtY)) },
          { '@_x': String(Math.round(tgtX)), '@_y': String(Math.round(tgtY)) }
        ];
      } else if (srcPos.tier < tgtPos.tier) {
        style += `;exitX=${exitPort};exitY=1;entryX=${entryPort};entryY=0;`;
      } else {
        // Upward feedback connection: exit top, enter bottom at distributed ports
        style += `;exitX=${exitPort};exitY=0;entryX=${entryPort};entryY=1;`;
      }
    } else {
      style += `;exitX=${exitPort};exitY=1;entryX=${entryPort};entryY=0;`;
    }

    edge['@_style'] = style;

    // Position edge label at exact line midpoint in open channels
    const edgeGeo: any = {
      '@_relative': '1',
      '@_as': 'geometry',
      mxPoint: {
        '@_as': 'offset',
        '@_x': isHorizontal ? '0' : '12',
        '@_y': isHorizontal ? '-12' : '0'
      }
    };

    if (customWaypoints && customWaypoints.length > 0) {
      edgeGeo.Array = {
        '@_as': 'points',
        mxPoint: customWaypoints.map(pt => ({
          '@_x': pt['@_x'],
          '@_y': pt['@_y']
        }))
      };
    }

    edge.mxGeometry = edgeGeo;
  }
}

/**
 * 🧹 Transforms a dense Draw.io XML diagram into Option 2: Minimalist Clean Variant
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
    const cellId = String(cell['@_id'] || '');
    if (cellId === '0' || cellId === '1') continue;

    if (cell['@_edge'] === '1' || cell['@_edge'] === true) {
      if (cell['@_value']) {
        const fullEdgeValue = String(cell['@_value']);
        const cleanEdgeText = fullEdgeValue.replace(/<[^>]+>/g, '').trim();
        if (cleanEdgeText) {
          cell['@_tooltip'] = cleanEdgeText;
        }
        cell['@_value'] = '';
        modifiedNodesCount++;
      }
    } else if (cell['@_vertex'] === '1' || cell['@_vertex'] === true) {
      const rawValue = String(cell['@_value'] || '');
      const plainText = rawValue.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      const imgMatch = rawValue.match(/<img[^>]*>/i);
      const iconTag = imgMatch ? imgMatch[0] : '';

      const titleMatch = rawValue.match(/(?:&lt;b&gt;|<b>)(.*?)(?:&lt;\/b&gt;|<\/b>)/i);
      let mainTitle = titleMatch && titleMatch[1] ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : '';

      if (!mainTitle) {
        const parts = plainText.split(/[-–—:]/);
        mainTitle = parts[0]?.trim() || plainText.slice(0, 25);
      }

      const subMatch = rawValue.match(/(?:&lt;i&gt;|<i>)(.*?)(?:&lt;\/i&gt;|<\/i>)/i);
      let subtitle = subMatch && subMatch[1] ? subMatch[1].replace(/<[^>]+>/g, '').trim() : '';

      if (!subtitle && plainText.length > mainTitle.length) {
        subtitle = plainText.replace(mainTitle, '').replace(/^[-–—:\s]+/, '').trim();
      }

      if (subtitle) {
        cell['@_tooltip'] = `${mainTitle} — ${subtitle}`;
      } else {
        cell['@_tooltip'] = mainTitle;
      }

      cell['@_value'] = `${iconTag}<b>${mainTitle}</b>`;
      modifiedNodesCount++;
    }
  }

  // Apply Generous Node Layout with expanded gaps (gapX=160px, rowHeight=210px)
  applyGenerousNodeLayout(cells, false);

  root.mxCell = cells;

  const builder = new XMLBuilder({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    format: true,
    indentBy: '  ',
    suppressEmptyNode: true,
  });

  return {
    success: true,
    cleanedXml: builder.build(ast),
    modifiedNodesCount,
  };
}

/**
 * 🔍 Restores detailed labels, subtitles, and edge descriptions on XML diagrams
 * and applies generous node spacing (gapX=160px, rowHeight=240px) so Detailed View is never congested.
 */
export function restoreDetailedView(xmlInput: string): string {
  if (!xmlInput || typeof xmlInput !== 'string') return xmlInput;

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
    return xmlInput;
  }

  if (!ast.mxfile || !ast.mxfile.diagram || !ast.mxfile.diagram.mxGraphModel || !ast.mxfile.diagram.mxGraphModel.root) {
    return xmlInput;
  }

  let root = ast.mxfile.diagram.mxGraphModel.root;
  let cells: any[] = root.mxCell ? (Array.isArray(root.mxCell) ? root.mxCell : [root.mxCell]) : [];

  for (const cell of cells) {
    const cellId = String(cell['@_id'] || '');
    if (cellId === '0' || cellId === '1') continue;

    if (cell['@_edge'] === '1' || cell['@_edge'] === true) {
      if (cell['@_tooltip'] && !cell['@_value']) {
        cell['@_value'] = formatEdgeLabelToMax2Lines(String(cell['@_tooltip']));
      } else if (cell['@_value']) {
        cell['@_value'] = formatEdgeLabelToMax2Lines(String(cell['@_value']));
      }
    } else if (cell['@_vertex'] === '1' || cell['@_vertex'] === true) {
      const rawValue = String(cell['@_value'] || '');
      const tooltip = String(cell['@_tooltip'] || '');

      if (tooltip && tooltip.includes(' — ') && !rawValue.includes('<i>') && !rawValue.includes('&lt;i&gt;')) {
        const parts = tooltip.split(' — ');
        const title = parts[0];
        const subtitle = parts.slice(1).join(' — ');
        const imgMatch = rawValue.match(/<img[^>]*>/i);
        const iconTag = imgMatch ? imgMatch[0] : '';
        cell['@_value'] = `${iconTag}<b>${title}</b><br/><i>${subtitle}</i>`;
      }
    }
  }

  // Apply Generous Node Layout for Detailed View as well (gapX=160px, rowHeight=240px)
  applyGenerousNodeLayout(cells, true);

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
