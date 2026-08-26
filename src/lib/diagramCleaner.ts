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

  if (clean.length <= 18) return clean;

  const words = clean.split(' ');
  if (words.length <= 2) return clean;

  if (words.length >= 6) {
    const third = Math.ceil(words.length / 3);
    const line1 = words.slice(0, third).join(' ');
    const line2 = words.slice(third, third * 2).join(' ');
    const line3 = words.slice(third * 2).join(' ');
    return `${line1}<br/>${line2}<br/>${line3}`;
  }

  const mid = Math.ceil(words.length / 2);
  return `${words.slice(0, mid).join(' ')}<br/>${words.slice(mid).join(' ')}`;
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
    7: [], // Extended Integration / Governance Tier
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
      else {
        // Evenly distribute custom enterprise nodes across Tiers 1-6 using string hash
        let hash = 0;
        for (let i = 0; i < plainText.length; i++) hash = (hash << 5) - hash + plainText.charCodeAt(i);
        tierIdx = 1 + (Math.abs(hash) % 6);
      }
    }

    tiers[tierIdx] = tiers[tierIdx] || [];
    tiers[tierIdx].push(vertex);
  }

  // 2. Compute Spaced Coordinates for Vertices (Widescreen 16:9 Slide Ratio: max 3-4 nodes/row, tight 65px row gap)
  const startY = 40;
  const rowHeight = isDetailedView ? 155 : 135; // Spacious 155px row height (75px node + 80px vertical channel gap)
  const nodeWidth = 220;
  const nodeHeight = isDetailedView ? 75 : 55;
  const gapX = 140; // Spacious 140px horizontal gap between nodes
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
    style += `;fontColor=#0284C7;fontStyle=1;labelBackgroundColor=#FFFFFF;labelBorderColor=#0EA5E9;fontSize=10;whiteSpace=wrap;align=center;verticalAlign=middle;html=1;`;

    // Format edge label to max 2 lines with max 140px width rule
    const rawVal = String(edge['@_value'] || '');
    if (rawVal) {
      edge['@_value'] = formatEdgeLabelToMax2Lines(rawVal);
    }

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
      const isSameTier = srcPos.tier === tgtPos.tier;
      const hasObstacle = checkAnySegmentIntersectsNode(srcPos, tgtPos, srcId, tgtId);

      if (isSameTier && Math.abs(srcPos.x - tgtPos.x) <= nodeWidth + gapX + 160 && !hasObstacle) {
        // Direct horizontal connection between adjacent columns in same tier
        isHorizontal = true;
        if (srcPos.x < tgtPos.x) {
          style += `;exitX=1;exitY=${exitPort};entryX=0;entryY=${entryPort};`;
        } else {
          style += `;exitX=0;exitY=${exitPort};entryX=1;entryY=${entryPort};`;
        }
      } else if (tierDiff > 2 || (srcPos.x < 300 && tgtPos.x > 800 && tierDiff > 1)) {
        // Route through Outer Gutter Highway for long jumps
        const isRightSide = tgtPos.x >= 500 || srcPos.x >= 500;
        let gutterX = dynamicRightGutterX;
        if (isRightSide) {
          gutterX = dynamicRightGutterX + rightGutterLaneCount * 35;
          rightGutterLaneCount = (rightGutterLaneCount + 1) % 4;
        } else {
          gutterX = dynamicLeftGutterX - leftGutterLaneCount * 35;
          leftGutterLaneCount = (leftGutterLaneCount + 1) % 4;
        }

        style += isRightSide ? `;exitX=1;exitY=${exitPort};entryX=1;entryY=${entryPort};` : `;exitX=0;exitY=${exitPort};entryX=0;entryY=${entryPort};`;
        customWaypoints = [
          { '@_x': String(Math.round(gutterX)), '@_y': String(Math.round(srcPos.y + nodeHeight / 2)) },
          { '@_x': String(Math.round(gutterX)), '@_y': String(Math.round(tgtPos.y + nodeHeight / 2)) }
        ];
      } else {
        // Route through Open Inter-Row Channel Gap
        let gapY = Math.round(srcPos.y + nodeHeight + (tgtPos.y - (srcPos.y + nodeHeight)) / 2);
        if (isSameTier || tgtPos.y <= srcPos.y + nodeHeight) {
          gapY = srcPos.y + nodeHeight + 40; // Safely place in channel gap BELOW source tier for backward/upward links
        }

        const sX = Math.round(srcPos.x + exitPort * nodeWidth);
        const tX = Math.round(tgtPos.x + entryPort * nodeWidth);

        style += `;exitX=${exitPort};exitY=1;entryX=${entryPort};entryY=0;`;
        if (Math.abs(sX - tX) > 20) {
          customWaypoints = [
            { '@_x': String(sX), '@_y': String(gapY) },
            { '@_x': String(tX), '@_y': String(gapY) }
          ];
        }
      }
    } else {
      style += `;exitX=${exitPort};exitY=1;entryX=${entryPort};entryY=0;`;
    }

    const isTargetRhombus = tgtPos && (vertexCells.find(v => String(v['@_id']) === tgtId)?.['@_style'] || '').includes('rhombus');
    const isSourceRhombus = srcPos && (vertexCells.find(v => String(v['@_id']) === srcId)?.['@_style'] || '').includes('rhombus');

    let lblX = 0;
    let lblY = -18;

    if (isTargetRhombus && isHorizontal) {
      lblX = -50;
      lblY = -18;
    } else if (isSourceRhombus && isHorizontal) {
      lblX = 50;
      lblY = -18;
    } else if (!isHorizontal) {
      lblX = 28;
      lblY = -10;
      style += ';align=left;spacingLeft=8;';
    }

    edge['@_style'] = style;

    // Position edge label safely in open inter-row / inter-column channels away from node boxes
    const edgeGeo: any = {
      '@_relative': '1',
      '@_as': 'geometry',
      mxPoint: {
        '@_as': 'offset',
        '@_x': String(lblX),
        '@_y': String(lblY)
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
function isPreservedCustomLayout(xml: string): boolean {
  if (!xml || typeof xml !== 'string') return false;
  const lower = xml.toLowerCase();
  return (
    lower.includes('col_') ||
    lower.includes('hdr_') ||
    lower.includes('wbs') ||
    lower.includes('frame_') ||
    lower.includes('pagewidth="1400"') ||
    lower.includes('pagewidth="1080"') ||
    lower.includes('mcp') ||
    lower.includes('hub_and_spoke') ||
    lower.includes('hub_spoke') ||
    lower.includes('logical_ai') ||
    lower.includes('tenant') ||
    lower.includes('governance') ||
    lower.includes('dataops') ||
    lower.includes('sre') ||
    lower.includes('observability') ||
    lower.includes('sovereign') ||
    lower.includes('data_residency') ||
    lower.includes('federated') ||
    lower.includes('iam_sso') ||
    lower.includes('trism') ||
    lower.includes('guardrail') ||
    lower.includes('micro_frontend') ||
    lower.includes('fintech') ||
    lower.includes('genomics') ||
    lower.includes('supply_chain') ||
    lower.includes('eval_safety') ||
    lower.includes('agentic_mesh') ||
    lower.includes('six_rs') ||
    lower.includes('hybrid_strangler') ||
    lower.includes('finops') ||
    lower.includes('chargeback') ||
    lower.includes('ai_coe') ||
    lower.includes('operating_model') ||
    lower.includes('conceptual_diagram') ||
    lower.includes('sequence_diagram') ||
    lower.includes('agentic_rag') ||
    lower.includes('secure_deployment_map') ||
    lower.includes('unified_system_view') ||
    lower.includes('devops_cicd_pipeline') ||
    lower.includes('data_ai_pipeline') ||
    lower.includes('lakehouse') ||
    lower.includes('modern_data_stack') ||
    lower.includes('event_driven_eda') ||
    lower.includes('golive_warroom') ||
    lower.includes('agent_harness') ||
    lower.includes('langgraph') ||
    lower.includes('hitl') ||
    lower.includes('c4_system_context') ||
    lower.includes('erd') ||
    lower.includes('tech_') ||
    xml.includes('<mxGraphModel')
  );
}

export function createMinimalistCleanVariant(xmlInput: string): CleanVariantResult {
  if (!xmlInput || typeof xmlInput !== 'string') {
    return { success: false, cleanedXml: xmlInput, modifiedNodesCount: 0 };
  }
  if (isPreservedCustomLayout(xmlInput)) {
    return { success: true, cleanedXml: xmlInput, modifiedNodesCount: 0 };
  }

  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    allowBooleanAttributes: true,
    parseTagValue: false,
    parseAttributeValue: false,
    maxNestedTags: 1000,
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

  const root = ast.mxfile.diagram.mxGraphModel.root;
  const cells: any[] = root.mxCell ? (Array.isArray(root.mxCell) ? root.mxCell : [root.mxCell]) : [];
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
          cell['@_value'] = formatEdgeLabelToMax2Lines(cleanEdgeText);
        }
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

      const vendorIconUrl = resolveVendorIconUrl(plainText + ' ' + mainTitle);
      const cleanImgTag = ``;
      cell['@_value'] = `${cleanImgTag}<b>${mainTitle}</b>`;
      modifiedNodesCount++;
    }
  }

  // Apply Generous Node Layout with identical grid structure across Options
  applyGenerousNodeLayout(cells, true);

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

export function resolveVendorIconUrl(text: string): string {
  if (!text) return 'https://api.iconify.design/logos:google-cloud.svg';
  const lower = text.toLowerCase();

  // 1. AI, LLM & Agentic Ecosystem (Genie, Cortex, Gemini, Claude, OpenAI, Bedrock, etc.)
  if (lower.includes('deepmind')) return 'https://api.iconify.design/simple-icons:googledeepmind.svg';
  if (lower.includes('databricks')) return 'https://api.iconify.design/logos:databricks.svg';
  if (lower.includes('cortex') || lower.includes('snowflake')) return 'https://api.iconify.design/logos:snowflake.svg';
  if (lower.includes('genie') || lower.includes('gemini') || lower.includes('vertex') || lower.includes('gcp') || lower.includes('google cloud')) return 'https://api.iconify.design/logos:google-cloud.svg';
  if (lower.includes('claude') || lower.includes('anthropic')) return 'https://api.iconify.design/logos:anthropic-icon.svg';
  if (lower.includes('gpt') || lower.includes('openai')) return 'https://api.iconify.design/logos:openai-icon.svg';
  if (lower.includes('copilot') || lower.includes('azure')) return 'https://api.iconify.design/logos:microsoft-azure.svg';
  if (lower.includes('bedrock') || lower.includes('aws') || lower.includes('amazon')) return 'https://api.iconify.design/logos:aws.svg';
  if (lower.includes('langchain') || lower.includes('langgraph')) return 'https://api.iconify.design/logos:langchain-icon.svg';
  if (lower.includes('pinecone')) return 'https://api.iconify.design/logos:pinecone.svg';
  if (lower.includes('milvus')) return 'https://api.iconify.design/logos:milvus.svg';
  if (lower.includes('qdrant')) return 'https://api.iconify.design/logos:qdrant.svg';
  if (lower.includes('huggingface') || lower.includes('hugging face')) return 'https://api.iconify.design/logos:huggingface.svg';
  if (lower.includes('mlflow')) return 'https://api.iconify.design/logos:mlflow.svg';
  if (lower.includes('ray')) return 'https://api.iconify.design/logos:ray.svg';

  // 2. Data & Analytics Ecosystem
  if (lower.includes('spark') || lower.includes('delta lake') || lower.includes('pyspark')) return 'https://api.iconify.design/logos:apache-spark.svg';
  if (lower.includes('clickhouse')) return 'https://api.iconify.design/logos:clickhouse.svg';
  if (lower.includes('dbt')) return 'https://api.iconify.design/logos:dbt.svg';
  if (lower.includes('airflow')) return 'https://api.iconify.design/logos:airflow.svg';
  if (lower.includes('kafka') || lower.includes('event stream')) return 'https://api.iconify.design/logos:kafka-icon.svg';
  if (lower.includes('pubsub') || lower.includes('pub/sub')) return 'https://api.iconify.design/logos:google-cloud.svg';
  if (lower.includes('kinesis')) return 'https://api.iconify.design/logos:aws-kinesis.svg';

  // 3. Oracle & Enterprise Infrastructure
  if (lower.includes('oracle') || lower.includes('oci')) return 'https://api.iconify.design/logos:oracle.svg';
  if (lower.includes('cloudflare')) return 'https://api.iconify.design/logos:cloudflare.svg';
  if (lower.includes('vercel')) return 'https://api.iconify.design/logos:vercel-icon.svg';
  if (lower.includes('railway')) return 'https://api.iconify.design/logos:railway.svg';
  if (lower.includes('sap') || lower.includes('hiding')) return 'https://api.iconify.design/logos:sap.svg';
  if (lower.includes('salesforce') || lower.includes('veeva')) return 'https://api.iconify.design/logos:salesforce.svg';
  if (lower.includes('servicenow')) return 'https://api.iconify.design/logos:servicenow.svg';
  if (lower.includes('stripe')) return 'https://api.iconify.design/logos:stripe.svg';

  // 4. Databases & Caching
  if (lower.includes('postgresql') || lower.includes('postgres')) return 'https://api.iconify.design/logos:postgresql.svg';
  if (lower.includes('mysql')) return 'https://api.iconify.design/logos:mysql.svg';
  if (lower.includes('redis')) return 'https://api.iconify.design/logos:redis.svg';
  if (lower.includes('mongodb')) return 'https://api.iconify.design/logos:mongodb-icon.svg';
  if (lower.includes('cassandra')) return 'https://api.iconify.design/logos:cassandra.svg';
  if (lower.includes('neo4j')) return 'https://api.iconify.design/logos:neo4j.svg';
  if (lower.includes('supabase')) return 'https://api.iconify.design/logos:supabase-icon.svg';
  if (lower.includes('firebase')) return 'https://api.iconify.design/logos:firebase.svg';
  if (lower.includes('dynamodb')) return 'https://api.iconify.design/logos:aws-dynamodb.svg';
  if (lower.includes('s3')) return 'https://api.iconify.design/logos:aws-s3.svg';
  if (lower.includes('lambda')) return 'https://api.iconify.design/logos:aws-lambda.svg';

  // 5. DevOps, Observability & Security
  if (lower.includes('kubernetes') || lower.includes('k8s')) return 'https://api.iconify.design/logos:kubernetes.svg';
  if (lower.includes('docker')) return 'https://api.iconify.design/logos:docker.svg';
  if (lower.includes('terraform')) return 'https://api.iconify.design/logos:terraform.svg';
  if (lower.includes('vault')) return 'https://api.iconify.design/logos:vault-icon.svg';
  if (lower.includes('argo')) return 'https://api.iconify.design/logos:argo.svg';
  if (lower.includes('datadog')) return 'https://api.iconify.design/logos:datadog.svg';
  if (lower.includes('grafana')) return 'https://api.iconify.design/logos:grafana.svg';
  if (lower.includes('prometheus')) return 'https://api.iconify.design/logos:prometheus.svg';
  if (lower.includes('github')) return 'https://api.iconify.design/logos:github-icon.svg';
  if (lower.includes('gitlab')) return 'https://api.iconify.design/logos:gitlab.svg';
  if (lower.includes('okta') || lower.includes('ping') || lower.includes('auth0')) return 'https://api.iconify.design/logos:okta.svg';
  if (lower.includes('sonarqube') || lower.includes('trivy')) return 'https://api.iconify.design/logos:sonarqube.svg';
  if (lower.includes('python')) return 'https://api.iconify.design/logos:python.svg';

  // 6. Dynamic Ecosystem Auto-Resolver Fallback
  // Extracts the primary technical brand word and dynamically resolves its official logo
  const words = text.replace(/[^a-zA-Z0-9\s-]/g, '').split(/\s+/).filter(w => w.length > 2);
  for (const w of words) {
    const slug = w.toLowerCase();
    if (['engine', 'service', 'platform', 'tier', 'node', 'cluster', 'data', 'cloud', 'system', 'api', 'app'].includes(slug)) continue;
    return `https://api.iconify.design/logos:${slug}.svg`;
  }

  return 'https://api.iconify.design/logos:google-cloud.svg';
}

export function restoreDetailedView(xmlInput: string, skipLayout: boolean = false): string {
  if (!xmlInput) return xmlInput;
  if (isPreservedCustomLayout(xmlInput)) return xmlInput;
  if (xmlInput.includes('unified_system_view') || xmlInput.includes('TOTAL UNIFIED SYSTEM VIEW') || xmlInput.includes('sw3_') || xmlInput.includes('sw1_') || xmlInput.includes('legend_box_statemachine') || xmlInput.includes('archival_bot') || xmlInput.includes('pill_trig1') || xmlInput.includes('eval_safety_benchmarking') || xmlInput.includes('vertex-ai-eval-flow') || xmlInput.includes('hitl-agent-gov') || xmlInput.includes('multi-agent-langgraph') || xmlInput.includes('agent_governance') || xmlInput.includes('langgraph') || xmlInput.includes('agent_harness') || xmlInput.includes('agent_runtime') || xmlInput.includes('tech_agent_harness_runtime') || xmlInput.includes('Complete Next-Gen Enterprise Agent Harness Architecture') || xmlInput.includes('PRODUCTION ENTERPRISE ARCHETYPE') || xmlInput.includes('c4_system_context') || xmlInput.includes('modern_data_stack') || xmlInput.includes('event_driven_eda') || xmlInput.includes('data_ai_pipeline') || xmlInput.includes('Data & AI Pipeline') || xmlInput.includes('data_lakehouse') || xmlInput.includes('Enterprise Data Lakehouse') || xmlInput.includes('golive_warroom') || xmlInput.includes('Go-Live Cutover') || xmlInput.includes('Human-in-the-Loop') || xmlInput.includes('Governingautonomous')) return xmlInput;

  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    allowBooleanAttributes: true,
    parseTagValue: false,
    parseAttributeValue: false,
    maxNestedTags: 1000,
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

  const root = ast.mxfile.diagram.mxGraphModel.root;
  const cells: any[] = root.mxCell ? (Array.isArray(root.mxCell) ? root.mxCell : [root.mxCell]) : [];

  for (const cell of cells) {
    const cellId = String(cell['@_id'] || '');
    if (cellId === '0' || cellId === '1') continue;

    if (cell['@_edge'] === '1' || cell['@_edge'] === true) {
      if (cell['@_tooltip'] && !cell['@_value']) {
        cell['@_value'] = formatEdgeLabelToMax2Lines(String(cell['@_tooltip']));
      } else if (cell['@_value']) {
        cell['@_value'] = formatEdgeLabelToMax2Lines(String(cell['@_value']));
      }

      let style = String(cell['@_style'] || '');
      style = style
        .replace(/;?fontColor=[^;]*/g, '')
        .replace(/;?labelBackgroundColor=[^;]*/g, '')
        .replace(/;?labelBorderColor=[^;]*/g, '')
        .replace(/;?fontSize=[^;]*/g, '')
        .replace(/;?fontStyle=[^;]*/g, '');
      style += ';labelBackgroundColor=#FFFFFF;fontColor=#0F172A;fontStyle=1;fontSize=11;padding=4;';
      cell['@_style'] = style;
    } else if (cell['@_vertex'] === '1' || cell['@_vertex'] === true) {
      let rawValue = String(cell['@_value'] || '');
      const tooltip = String(cell['@_tooltip'] || '');
      const newImgTag = ``;

      if (rawValue.includes('<img')) {
        rawValue = rawValue.replace(/<img[^>]*>/gi, newImgTag);
      } else {
        rawValue = `${newImgTag}${rawValue}`;
      }

      if (tooltip && tooltip.includes(' — ') && !rawValue.includes('<i>') && !rawValue.includes('&lt;i&gt;')) {
        const parts = tooltip.split(' — ');
        const title = parts[0];
        const subtitle = parts.slice(1).join(' — ');
        rawValue = `${newImgTag}<b>${title}</b><br/><i>${subtitle}</i>`;
      }

      cell['@_value'] = rawValue;
    }
  }

  // Apply Generous Node Layout ONLY if skipLayout is false!
  if (!skipLayout) {
    applyGenerousNodeLayout(cells, true);
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

/**
 * 🏷️ Injects active Use-Case domain flavor (e.g. Prior Authorization, ITACS Oncology, Claims Engine)
 * into all titles, subtitles, headers, and component nodes across Technical & Business diagrams.
 * Prevents generic boilerplate titles in technical design documents.
 */
export function injectUseCaseFlavor(xml: string, useCaseTitle: string, userPrompt?: string): string {
  if (!xml || typeof xml !== 'string') return xml;

  let topic = useCaseTitle ? useCaseTitle.trim() : '';

  // Dynamically extract clean 2-4 word topic string from userPrompt or useCaseTitle
  if (!topic || topic === 'Architecture' || topic === 'Clean Architecture Workspace' || topic.toLowerCase().includes('act as')) {
    const rawText = userPrompt || topic;
    const cleanPrompt = rawText
      .replace(/\b(act as|chief|enterprise|architect|and|pharma|technology|lead|at|we|are|building|a|generative|ai|platform|to|automate|scientific|literature|mining|accelerate|therapeutic|target|discovery|for|non-small|cell|lung|cancer|design|build|create|system|architecture|diagram)\b/gi, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    const words = cleanPrompt.split(' ').filter(w => w.length > 2).slice(0, 4);
    topic = words.length > 0 
      ? words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ')
      : 'Enterprise Platform';
  }




  const topicUpper = topic.toUpperCase();

  let updatedXml = xml.replace(/&amp;amp;(?:amp;)*/g, '&amp;');

  // Dynamic Domain-Aware Topology Flavoring across all technical reference diagrams
  // Extract clean short brand name (1-2 words) for subtle branding without repeating full 50-char diagram title everywhere
  let topicClean = (topic || 'Enterprise').trim();
  if (topicClean.includes('\n') || topicClean.includes('**') || topicClean.startsWith('-')) {
    const firstLine = topicClean.split('\n')[0].replace(/^[-*#\s]+/, '').replace(/[*_]/g, '').replace(/:\s*$/, '').trim();
    topicClean = firstLine.length > 3 && firstLine.length < 50 ? firstLine : 'Enterprise System';
  }
  if (topicClean.length > 55) {
    topicClean = topicClean.slice(0, 52) + '...';
  }
  const brandWords = topicClean.split(' ').filter(w => w.length > 2);
  const shortBrand = brandWords.length > 0 ? brandWords[0] : 'Enterprise';
  const shortBrandUpper = shortBrand.toUpperCase();

  const escapeXml = (s: string) => (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const topicCleanXml = escapeXml(topicClean);
  const topicCleanUpperXml = escapeXml(topicClean.toUpperCase());
  const shortBrandXml = escapeXml(shortBrand);
  const shortBrandUpperXml = escapeXml(shortBrandUpper);

  // Universal Title & Use Case Header Injection across ALL diagrams
  updatedXml = updatedXml
    .replace(/(&lt;span[^>]*&gt;\s*❖?\s*USE CASE:\s*&lt;\/span&gt;)[^<]+/gi, `$1 ${topicCleanXml}`)
    .replace(/(<span[^>]*>\s*❖?\s*USE CASE:\s*<\/span>)[^<]+/gi, `$1 ${topicCleanXml}`)
    .replace(/(❖\s*USE CASE:\s*)[^<"&]+/gi, `$1${topicCleanXml}`)
    .replace(/(\bUSE CASE:\s*)[^<"&]+/gi, `$1${topicCleanXml}`)
    .replace(/(\bSYSTEM CONTEXT:\s*)[^<"&]+/gi, `$1${topicCleanXml}`)
    .replace(/BUSINESS PROCESS \/ SWIMLANE — [^<"&]+/gi, `BUSINESS PROCESS / SWIMLANE — ${topicCleanUpperXml}`)
    .replace(/BUSINESS PROCESS \/ SWIMLANE — [^<"]+/gi, `BUSINESS PROCESS / SWIMLANE — ${topicCleanUpperXml}`)
    .replace(/SYNACTIVE SMART GRID &amp; INDUSTRIAL IOT/gi, topicCleanUpperXml)
    .replace(/OMNIVUE RETAIL &amp; SUPPLY CHAIN/gi, topicCleanUpperXml)
    .replace(/NEXUSFIN WEALTH &amp; PAYMENTS/gi, topicCleanUpperXml)
    .replace(/ENTERPRISE ARCHITECTURE PLATFORM/gi, topicCleanUpperXml)
    .replace(/SYNACTIVE/gi, shortBrandUpperXml)
    .replace(/OMNIVUE/gi, shortBrandUpperXml)
    .replace(/NEXUSFIN/gi, shortBrandUpperXml)
    .replace(/Enterprise Governed Agentic AI Platform/gi, topicCleanXml)
    .replace(/Enterprise Technical System View/gi, `${topicCleanXml} System View`)
    .replace(/Enterprise DevSecOps Polyrepo CI\/CD Pipeline/gi, `${topicCleanXml} DevSecOps CI/CD Pipeline`)
    .replace(/The Operational Flow/gi, `${topicCleanXml} Operational Flow`)
    .replace(/Total Unified System View/gi, `${topicCleanXml} Total Unified System View`)
    .replace(/Enterprise Event-Driven Microservices Architecture/gi, `${topicCleanXml} Event-Driven Architecture`)
    .replace(/MODERN DATA STACK ARCHITECTURE BLUEPRINT/gi, `${topicCleanUpperXml} MODERN DATA STACK ARCHITECTURE`)
    .replace(/C4 Enterprise System Context/gi, `${topicCleanXml} C4 System Context`)
    .replace(/Agent Harness Runtime Platform/gi, `${topicCleanXml} Agent Harness Runtime Platform`)
    .replace(/Enterprise Document Lake/gi, `[1] ${shortBrandXml} Document &amp; Telemetry Lake`)
    .replace(/Order &amp;amp; Checkout Microservices Pods/gi, `[1.1] ${shortBrandXml} Ingress Pods`)
    .replace(/Order &amp; Checkout Microservices Pods/gi, `[1.1] ${shortBrandXml} Ingress Pods`)
    .replace(/Production Operational OLTP Core/gi, `[1.1] ${shortBrandXml} DB Core`)
    .replace(/Ingress &amp;amp; Perimeter/gi, `${shortBrandXml} Ingress &amp;amp; Perimeter`)
    .replace(/Ingress &amp; Perimeter/gi, `${shortBrandXml} Ingress &amp; Perimeter`)
    .replace(/IoT Devices &amp; App Telemetry/gi, `IoT &amp; ${shortBrandXml} Telemetry`)
    .replace(/Route 53 DNS &amp; AWS WAF/gi, `Route 53 (${shortBrandXml} Ingress)`)
    .replace(/Batch &amp; Streaming Sources/gi, `Batch &amp; ${shortBrandXml} Streams`)
    .replace(/Cloud DNS &amp; Cloud CDN/gi, `Cloud DNS (${shortBrandXml} Edge)`)
    .replace(/Polyrepo Git Commits/gi, `${shortBrandXml} Git Commits`)
    .replace(/Cloud Run UI \(Private App Subnet\)/gi, `Cloud Run (${shortBrandXml} UI)`)
    .replace(/Cloud Run API Microservices/gi, `Cloud Run (${shortBrandXml} API)`)
    .replace(/Cloud SQL HA PostgreSQL/gi, `Cloud SQL (${shortBrandXml} DB)`)
    .replace(/Static Media Lake &amp; Private Assets/gi, `${shortBrandXml} Storage Lake`)
    .replace(/MQTT \/ HTTPS Edge Ingestion Gateway/gi, `[1] ${shortBrandXml} Edge Ingestion`)
    .replace(/Pub\/Sub High-Throughput Ingestion Topics/gi, `[2] ${shortBrandXml} Pub/Sub Topics`)
    .replace(/Frontend Envoy Mesh Pods/gi, `[1] ${shortBrandXml} Ingress Pods`)
    .replace(/Core API Business Logic Pods/gi, `[2] ${shortBrandXml} Core API Pods`)
    .replace(/Bronze Tier Raw Data Bucket/gi, `[3] Bronze (${shortBrandXml} Raw)`)
    .replace(/Gold Tier Curated Delta Lake/gi, `[5] Gold (${shortBrandXml} Metrics)`)
    .replace(/Vertex AI Matching Engine/gi, `[3] Vertex AI (${shortBrandXml} Vectors)`)
    .replace(/Gemini 1\.5 Pro Reasoning Agent/gi, `[4] Gemini (${shortBrandXml} AI Core)`)
    .replace(/Primary Application Cluster/gi, `[8] ${shortBrandXml} Cluster`)
    .replace(/Source Code Repository/gi, `[1] ${shortBrandXml} Polyrepo`)
    .replace(/Polyrepo Git Source/gi, `[1] ${shortBrandXml} Polyrepo`)
    .replace(/PostgreSQL \/ MySQL OLTP Core/gi, `[1] ${shortBrandXml} OLTP DB`)
    .replace(/Order &amp; Checkout Microservice/gi, `[1] ${shortBrandXml} Microservice`)
    .replace(/Multi-Modal Ingress &amp; Routing Gateway/gi, `[1] ${shortBrandXml} Gateway`)
    .replace(/FastAPI REST API Microservice/gi, `${shortBrandXml} API Service`)
    .replace(/Next\.js Frontend Web Application/gi, `${shortBrandXml} Web Portal`)
    .replace(/Cloud Run \(FastAPI Backend API\)/gi, `Cloud Run (${shortBrandXml} API)`)
    .replace(/Cloud Run \(Frontend SSR Microservice\)/gi, `Cloud Run (${shortBrandXml} UI)`)
    .replace(/Cloud SQL PostgreSQL 15/gi, `Cloud SQL (${shortBrandXml} DB)`)
    .replace(/Amazon EKS Cluster \(us-east-1a\/b\)/gi, `Amazon EKS Cluster (${topicCleanXml} Mesh)`)
    .replace(/Medallion Architecture/gi, `${topicCleanXml} Medallion Architecture`)
    .replace(/Raw Telemetry &amp; Field Ingestion/gi, `${topicCleanXml} Raw Telemetry &amp; Ingestion`)
    .replace(/Vertex AI Vector Search &amp; Reasoning Core/gi, `${topicCleanXml} Vertex AI Reasoning Core`);

  const isSupplyChain = /supply|logistics|warehouse|quantumflow|fleet|inventory|chain|drone/i.test(topicClean + ' ' + (userPrompt || ''));

  if (isSupplyChain) {
    updatedXml = updatedXml
      .replace(/\[1\] On-Premises Data Center/g, `[1] Regional Logistics &amp; Warehouse Hubs`)
      .replace(/Enterprise Hybrid Connectivity/g, `Real-Time Telemetry &amp; Fleet Connectivity`)
      .replace(/\[2\] Google Global HTTP\(S\) LB/g, `[2] Global Ingress &amp; Routing Load Balancer`)
      .replace(/Intelligent Traffic Routing/g, `Autonomous Supply Flow Routing`)
      .replace(/\[3\] Cloud Interconnect/g, `[3] Dedicated 10Gbps Fleet Depot Link`)
      .replace(/\[4\] Cloud Armor WAF/g, `[4] Edge Security &amp; WAF Gate`)
      .replace(/\[5\] Primary Shared VPC Network/g, `[5] Primary Governed Supply Chain VPC`)
      .replace(/\[7\] DR Shared VPC Network/g, `[7] Failover DR Supply Chain VPC`)
      .replace(/\[8\] Primary GKE Cluster/g, `[8] Primary Orchestrator Cluster (GKE)`)
      .replace(/Multi-Zone Application Deployment/g, `Autonomous Inventory &amp; Order Routing`)
      .replace(/\[9\] DR GKE Cluster/g, `[9] Failover Orchestrator Cluster (GKE)`)
      .replace(/DR Region Disaster Recovery Apps/g, `Standby Regional Supply Chain Engine`)
      .replace(/\[10\] Primary Cloud SQL/g, `[10] Primary Operational Ledger DB (Cloud SQL)`)
      .replace(/\[11\] DR Cloud SQL/g, `[11] Replicated DR Ledger DB (Cloud SQL)`)
      .replace(/\[12\] DR Failover Orchestration/g, `[12] Autonomous Logistics Failover Controller`)
      .replace(/\[1\] GitHub \/ GitLab Polyrepo/g, `[1] Source Code Repository (Polyrepo)`)
      .replace(/\[2\] Webhook Pipeline Trigger/g, `[2] Automated Order Dispatcher`)
      .replace(/\[3\] Cloud Build Runner/g, `[3] Automated CI\/CD Test Runner`)
      .replace(/\[4\] SonarQube &amp; Snyk SAST/g, `[4] Compliance &amp; SAST Audit Gate`)
      .replace(/\[5\] Docker Container Compiler/g, `[5] Multi-Arch Container Builder`)
      .replace(/\[6\] Artifact Registry Scanner/g, `[6] Artifact Registry &amp; Scanner`)
      .replace(/\[7\] ArgoCD \/ Flux Controller/g, `[7] GitOps Continuous Deployment`)
      .replace(/\[8\] Staging GKE Cluster/g, `[8] Production Kubernetes Cluster`);
  } else {
    updatedXml = updatedXml
      .replace(/\[1\] On-Premises Data Center/g, `[1] Enterprise Core Facility`)
      .replace(/\[2\] Google Global HTTP\(S\) LB/g, `[2] Global Traffic Load Balancer`)
      .replace(/\[4\] Cloud Armor WAF/g, `[4] Edge Security &amp; WAF Gate`)
      .replace(/\[5\] Primary Shared VPC Network/g, `[5] Primary Governed VPC Network`)
      .replace(/\[7\] DR Shared VPC Network/g, `[7] Failover DR VPC Network`)
      .replace(/\[8\] Primary GKE Cluster/g, `[8] Primary Application Cluster (GKE)`)
      .replace(/\[9\] DR GKE Cluster/g, `[9] Failover Application Cluster (GKE)`)
      .replace(/\[10\] Primary Cloud SQL/g, `[10] Primary Operational Database (SQL)`)
      .replace(/\[11\] DR Cloud SQL/g, `[11] Replicated DR Database (SQL)`)
      .replace(/\[12\] DR Failover Orchestration/g, `[12] Automated Failover Controller`)
      .replace(/\[1\] GitHub \/ GitLab Polyrepo/g, `[1] Polyrepo Source Repository`)
      .replace(/\[2\] Webhook Pipeline Trigger/g, `[2] Automated Event Trigger`)
      .replace(/\[3\] Cloud Build Runner/g, `[3] Automated Build &amp; Test Runner`)
      .replace(/\[4\] SonarQube &amp; Snyk SAST/g, `[4] SAST &amp; Security Compliance Gate`)
      .replace(/\[5\] Docker Container Compiler/g, `[5] Container Image Builder`)
      .replace(/\[6\] Artifact Registry Scanner/g, `[6] Registry &amp; Vulnerability Scanner`)
      .replace(/\[7\] ArgoCD \/ Flux Controller/g, `[7] GitOps Deployment Controller`)
      .replace(/\[8\] Staging GKE Cluster/g, `[8] Live Production Application Cluster`);
  }

  const topicXml = escapeXml(topic || 'Enterprise');
  const topicUpperXml = escapeXml((topic || 'Enterprise').toUpperCase());

  // 1. Replace generic titles, ITACS, and Oncology headers
  updatedXml = updatedXml
    .replace(/\[STAGE 1\]\s*ONCOLOGY DATA PORTAL/gi, `[STAGE 1] ${topicUpperXml} INGESTION PORTAL`)
    .replace(/ONCOLOGY DATA PORTAL/gi, `${topicUpperXml} INGESTION PORTAL`)
    .replace(/ITACS Oncology Platform Conceptual Diagram/gi, `${topicXml} Conceptual Diagram`)
    .replace(/ITACS Oncology Platform/gi, `${topicXml} Platform`)
    .replace(/Oncology Scenario Planning/gi, `${topicXml} Scenario Planning &amp; Operations`)
    .replace(/Oncology Trends/gi, `${topicXml} Trends`)
    .replace(/Oncology Analyst/gi, `${topicXml} Operations User`)
    .replace(/Dim_Oncology_Product/gi, `Dim_${topicClean.replace(/[^a-zA-Z0-9]/g, '_')}_Catalog`)
    .replace(/Fact_Oncology_Insights/gi, `Fact_${topicClean.replace(/[^a-zA-Z0-9]/g, '_')}_Transactions`)
    .replace(/PubMed PDF (?:&amp;|&amp;amp;|&) PPT Chunking Engine/gi, `${topicXml} Data &amp; Stream Processing Engine`)
    .replace(/ITACS Integrated Insights Platform - TOTAL UNIFIED SYSTEM VIEW: Data, Cognition, Deployment, (?:&amp;|&amp;amp;) Governance \(End-to-End without Compromise\)\./g, `${topicXml} - TOTAL UNIFIED SYSTEM VIEW: Data, Cognition, Deployment, &amp; Governance`)
    .replace(/ITACS Integrated Insights Platform - TOTAL UNIFIED SYSTEM VIEW/g, `${topicXml} - TOTAL UNIFIED SYSTEM VIEW`)
    .replace(/ITACS SECURE GOVERNED CLOUD TENANT/g, `${topicUpperXml} SECURE GOVERNED CLOUD TENANT`)
    .replace(/ITACS Integrated Insights Platform/g, `${topicXml} Platform`)
    .replace(/AWS Modern Data Lakehouse Architecture/g, `${topicXml} - AWS Data Lakehouse Architecture`)
    .replace(/GCP Serverless Web Application Architecture/g, `${topicXml} - GCP Serverless Architecture`)
    .replace(/AWS EKS Microservices Service Mesh Architecture/g, `${topicXml} - EKS Microservices Mesh`)
    .replace(/GCP Real-Time Streaming Analytics Pipeline/g, `${topicXml} - Streaming Analytics Pipeline`)
    .replace(/Combining Data Flow \(DFD\), MLOps Lifecycle, and Feature Engineering/g, `${topicXml} - Data &amp; AI Pipeline`)
    .replace(/Google Cloud Project \(ITACS Platform Production\)/g, `${topicCleanXml} Production Cloud Architecture`)
    .replace(/AWS Serverless Event-Driven Microservices/g, `${topicCleanXml} - Event-Driven Microservices`)
    .replace(/GCP Multi-Region Active-Passive Disaster Recovery/g, `${topicCleanXml} - Multi-Region DR Topology`)
    .replace(/GCP AI Cognitive Architecture \(Retrieval-Augmented Generation \/ RAG\)/g, `${topicCleanXml} - AI Agentic RAG Architecture`)
    .replace(/AWS Zero-Trust Secure VPC Network Infrastructure/g, `${topicCleanXml} - Zero-Trust Secure VPC Network`)
    .replace(/GCP Industrial IoT Telemetry Ingestion &amp; Analytics/g, `${topicCleanXml} - Industrial IoT Ingestion &amp; Analytics`)
    .replace(/Enterprise DevSecOps Polyrepo CI\/CD Pipeline Architecture/g, `${topicCleanXml} - DevSecOps Polyrepo CI/CD Pipeline`)
    .replace(/UNIFIED GOVERNANCE &amp; STATE-MACHINE LIFECYCLE/g, `${shortBrandUpperXml} UNIFIED GOVERNANCE &amp; STATE-MACHINE LIFECYCLE`)
    .replace(/TOTAL UNIFIED SYSTEM VIEW: Data, Cognition, Deployment, (?:&amp;|&amp;amp;) Governance/g, `${shortBrandUpperXml} TOTAL UNIFIED SYSTEM VIEW`)
    .replace(/COMPLETE END-TO-END DYNAMIC SEQUENCE DIAGRAM/g, `${shortBrandUpperXml} COMPLETE END-TO-END DYNAMIC SEQUENCE DIAGRAM`)
    .replace(/ITACS Governing Cloud Tenant/g, `${shortBrandUpperXml} Governing Cloud Tenant`)
    .replace(/ITACS Primary VPC Network/g, `Primary Governed VPC Network`)
    .replace(/ITACS Agent Orchestrator/g, `Core Agent Orchestrator (GKE Pod)`)
    .replace(/Core ITACS Synthesis Engine/g, `Core AI Synthesis Engine`)
    .replace(/ITACS SECURE MANAGED/g, `${topicUpperXml} SECURE MANAGED`)
    .replace(/ITACS Target/g, `${topicXml} Target`)
    .replace(/Review Drug Launch Strategy/gi, `Review ${topicXml} Operational Strategy`)
    .replace(/Alert ID: #T-731/gi, `Alert ID: #OPS-101`)
    .replace(/Competitor X/gi, `Primary Arterial Corridor`)
    .replace(/Competitor Y/gi, `Secondary Traffic Channel`)
    .replace(/Q3 Launch/gi, `Optimal Flow`)
    .replace(/Phase 2b/gi, `Active`)
    .replace(/Q1 Market Lead/gi, `Peak Efficiency`)
    .replace(/Launch Readiness/gi, `System Readiness`)
    .replace(/Phase 3/gi, `Operational`)
    .replace(/Real-time KPIs/gi, `Live Telemetry KPIs`)
    .replace(/PubMed/gi, `${topicXml} API`)
    .replace(/Oncology/gi, topicXml || 'Enterprise')
    .replace(/ITACS/gi, topicXml || 'Enterprise')
    .replace(/CLINICAL AI BIO-PHARMA PRODUCT/gi, topicCleanUpperXml)
    .replace(/NOVACURA BIO-PHARMA PRODUCT/gi, topicCleanUpperXml)
    .replace(/NOVACURA BIO-PHARMA/gi, `${shortBrandUpperXml} PLATFORM`)
    .replace(/Transforming Therapies\. Improving Lives\./gi, `${shortBrandXml} Autonomous Cloud Architecture`)
    .replace(/May 8, 2025/g, 'August 2026')
    .replace(/Aug 8, 2025/g, 'Q4 2026')
    .replace(/Jun 8, 2025/g, 'Q4 2026')
    .replace(/&amp;amp;/g, '&amp;');

  // 1b. Domain-Aware Dynamic Enterprise Governance Header Engine
  const promptLower = ((userPrompt || '') + ' ' + (useCaseTitle || '')).toLowerCase();
  let dynPersonas = 'Enterprise Architect, AI Systems Engineer';
  let dynStakeholders = 'Governance Board, Platform SRE';
  let dynDefinition = 'Unified Logical Flow, Technology Stack, Security Boundaries, &amp; Operational Lifecycles';
  let dynSla = 'SLA: 99.99% Uptime | Zero-Trust Perimeter';
  let dynArchName = 'Enterprise Architecture System';

  if (/energy|ev|charging|microgrid|solar|battery|bess|v2g|ocpp|grid|iot|sensor/i.test(promptLower)) {
    dynPersonas = 'Grid Architect, IoT Fleet SRE, Power Trading Specialist';
    dynStakeholders = 'ISO/RTO Grid Authority, Utility Operations, Sustainability Lead';
    dynDefinition = 'Decentralized Smart EV Fast-Charging, Sub-50ms Dynamic Load Balancing &amp; Microgrid Energy Trading';
    dynSla = 'SLA: 99.999% Grid Availability | Telemetry &lt;100ms';
    dynArchName = 'Decentralized Smart Grid &amp; EV Fleet Architecture';
  } else if (/payment|fintech|banking|pci|ledger|fraud/i.test(promptLower)) {
    dynPersonas = 'Payment Operator, Risk Officer, Compliance Analyst';
    dynStakeholders = 'Central Bank Ops, Clearing House, Security Lead';
    dynDefinition = 'Real-Time Financial Settlement, Multi-Tier Fraud Detection, &amp; ISO 20022 Ledger Flow';
    dynSla = 'SLA: 99.999% Uptime | Latency &lt;50ms';
    dynArchName = 'FinTech Financial Settlement Architecture';
  } else if (/supply|logistics|warehouse|fleet|inventory|chain/i.test(promptLower)) {
    dynPersonas = 'Supply Chain Architect, Logistics Fleet SRE, Depot Ops';
    dynStakeholders = 'Global Supply Chain Board, Carrier Partners, SRE Lead';
    dynDefinition = 'Autonomous Multi-Node Supply Routing, Telemetry Tracking, &amp; Fleet Orchestration';
    dynSla = 'SLA: Real-Time Telemetry | 99.9% Uptime';
    dynArchName = 'Autonomous Supply Chain Topology';
  } else if (/genomic|fastq|variant|dna|gatk|literature|clinical|pharma|cancer/i.test(promptLower)) {
    dynPersonas = 'Bioinformatician, Clinical AI Engineer, Data Modeler';
    dynStakeholders = 'Regulatory Review Board, Chief Medical Officer, SRE Lead';
    dynDefinition = 'HIPAA-Governed Literature Mining, Genomic Pipeline &amp; Agentic RAG Discovery';
    dynSla = 'SLA: HIPAA / SOC2 Governed | GKE Autopilot';
    dynArchName = 'Clinical & Genomic Cognitive Architecture';
  } else if (/devops|ci\/cd|pipeline|polyrepo|argocd|gitops|snyk|sonarqube/i.test(promptLower)) {
    dynPersonas = 'DevSecOps Lead, Platform SRE, Security Auditor';
    dynStakeholders = 'Engineering Leadership, Compliance & Audit Board';
    dynDefinition = 'Polyrepo DevSecOps CI/CD Pipeline with Automated SAST & GitOps Canary Promotion';
    dynSla = 'SLA: Zero-Downtime Canary | 100% Audit Trail';
    dynArchName = 'DevSecOps Polyrepo CI/CD Architecture';
  } else if (/erd|dimensional|fact|dimension|schema|database|table/i.test(promptLower)) {
    dynPersonas = 'Data Architect, Database Modeler, Analytics Engineer';
    dynStakeholders = 'Enterprise Data Governance, Business Intelligence Lead';
    dynDefinition = 'Dimensional Enterprise Star/Snowflake Schema with PK/FK Integrity & Lineage';
    dynSla = 'SLA: ACID Consistent | Read-Replica HA';
    dynArchName = 'Dimensional Data Model (ERD)';
  } else if (/rag|agent|cognitive|llm|embedding|vector|pinecone|pgvector/i.test(promptLower)) {
    dynPersonas = 'Cognitive Systems Engineer, AI Chief Architect, Prompt Modeler';
    dynStakeholders = 'AI Safety Board, Enterprise Product Leadership, SRE Lead';
    dynDefinition = 'Agentic RAG Cognitive Loop with Vector Indexing, Tool Calling, & HITL Review';
    dynSla = 'SLA: p99 < 350ms | Guarded Inference';
    dynArchName = 'Cognitive Agentic RAG Architecture';
  }

  // 1c. Dynamic CIDR Extraction & Network Topology Hydration Engine
  const cidrMatches = Array.from(((userPrompt || '') + ' ' + (topic || '')).matchAll(/\b(\d{1,3}\.\d{1,3})\.(\d{1,3})\.(\d{1,3})\/(\d{1,2})\b/g));
  if (cidrMatches.length > 0) {
    const octet1_2 = cidrMatches[0][1]; // e.g. "10.240" or "172.16"
    const prefix = cidrMatches[0][4]; // e.g. "16"
    const userVpcCidr = `${octet1_2}.0.0/${prefix}`;
    const userPublicSubnet = `${octet1_2}.1.0/24`;
    const userPubSubSubnet = `${octet1_2}.5.0/24`;
    const userVpcAccess = `${octet1_2}.8.0/28`;
    const userAppSubnet = `${octet1_2}.10.0/24`;
    const userWorkerSubnet = `${octet1_2}.15.0/24`;
    const userDataSubnet = `${octet1_2}.20.0/24`;
    const userDbIp = `${octet1_2}.20.5`;
    const userCacheIp = `${octet1_2}.25.5`;
    const userTenantSubnet = `${octet1_2}.180.1.0/24`;

    updatedXml = updatedXml
      .replace(/10\.128\.0\.0\/16/g, userVpcCidr)
      .replace(/10\.0\.0\.0\/16/g, userVpcCidr)
      .replace(/10\.150\.0\.0\/16/g, userVpcCidr)
      .replace(/10\.170\.0\.0\/16/g, userVpcCidr)
      .replace(/10\.180\.0\.0\/16/g, userVpcCidr)
      .replace(/10\.128\.1\.0\/24/g, userPublicSubnet)
      .replace(/10\.0\.1\.0\/24/g, userPublicSubnet)
      .replace(/10\.150\.1\.0\/24/g, userPublicSubnet)
      .replace(/10\.160\.1\.0\/24/g, userPublicSubnet)
      .replace(/10\.128\.5\.0\/24/g, userPubSubSubnet)
      .replace(/10\.8\.0\.0\/28/g, userVpcAccess)
      .replace(/10\.128\.10\.0\/24/g, userAppSubnet)
      .replace(/10\.0\.10\.0\/24/g, userAppSubnet)
      .replace(/10\.130\.10\.0\/24/g, userAppSubnet)
      .replace(/10\.140\.10\.0\/24/g, userAppSubnet)
      .replace(/10\.150\.10\.0\/24/g, userAppSubnet)
      .replace(/10\.160\.10\.0\/24/g, userAppSubnet)
      .replace(/10\.170\.10\.0\/24/g, userAppSubnet)
      .replace(/10\.180\.10\.0\/24/g, userAppSubnet)
      .replace(/10\.128\.15\.0\/24/g, userWorkerSubnet)
      .replace(/10\.128\.20\.0\/24/g, userDataSubnet)
      .replace(/10\.0\.20\.0\/24/g, userDataSubnet)
      .replace(/10\.150\.20\.0\/24/g, userDataSubnet)
      .replace(/10\.160\.20\.0\/24/g, userDataSubnet)
      .replace(/10\.170\.20\.0\/24/g, userDataSubnet)
      .replace(/10\.128\.20\.5/g, userDbIp)
      .replace(/10\.128\.25\.5/g, userCacheIp)
      .replace(/10\.180\.1\.0\/24/g, userTenantSubnet);

    dynSla = `${dynSla} &amp;nbsp;|&amp;nbsp; &lt;span style='color:#38BDF8;font-weight:bold;'&gt;🔒 VPC CIDR: ${userVpcCidr}&lt;/span&gt;`;
  }

  // 1d. Multi-Pillar Cloud FinOps & Cost Optimization Engine (Token, Egress, Storage, DR)
  const isAiOrCloudArch = /rag|agent|langgraph|vertex|gemini|llm|streaming|serverless|microservices|gcp|aws/i.test(promptLower);
  if (isAiOrCloudArch) {
    dynSla = `${dynSla} &amp;nbsp;|&amp;nbsp; &lt;span style='background:rgba(245,158,11,0.2);border:1px solid #F59E0B;color:#FBBF24;font-size:10px;padding:2px 6px;border-radius:8px;'&gt;⚡ Total FinOps: Context Cache (-90% Token) | CDN Edge Egress (-75%) | Autoclass Storage | HA Regional DR&lt;/span&gt;`;
  }

  const dynDefinitionXml = escapeXml(dynDefinition);
  const dynPersonasXml = escapeXml(dynPersonas);
  const dynStakeholdersXml = escapeXml(dynStakeholders);

  const dynamicEnterpriseHeaderHtml = `&lt;table style='width:100%;border-collapse:collapse;color:#FFFFFF;font-family:Helvetica,Arial,sans-serif;padding:2px 8px;table-layout:fixed;'&gt;&lt;tr&gt;&lt;td style='text-align:left;font-size:14px;font-weight:bold;color:#F8FAFC;padding-bottom:5px;border-bottom:1px solid rgba(255,255,255,0.25);width:50%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;'&gt;&lt;span style='color:#38BDF8;margin-right:6px;'&gt;&#10070; USE CASE:&lt;/span&gt;${topicCleanXml}&lt;/td&gt;&lt;td style='text-align:right;font-size:13px;font-weight:bold;color:#F1F5F9;padding-bottom:5px;border-bottom:1px solid rgba(255,255,255,0.25);width:50%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;'&gt;${dynArchName} &lt;span style='color:#93C5FD;font-weight:normal;'&gt;(v1.0.0)&lt;/span&gt;&amp;nbsp;&amp;nbsp;&lt;span style='background:rgba(16,185,129,0.25);border:1px solid #10B981;color:#34D399;font-size:11px;padding:2px 8px;border-radius:10px;'&gt;🟢 Production Approved&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style='text-align:left;font-size:11px;color:#CBD5E1;padding-top:5px;width:50%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;'&gt;&lt;b style='color:#E2E8F0;'&gt;Definition:&lt;/b&gt; ${dynDefinitionXml}&lt;/td&gt;&lt;td style='text-align:right;font-size:11px;color:#CBD5E1;padding-top:5px;width:50%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;'&gt;&lt;b style='color:#E2E8F0;'&gt;Personas:&lt;/b&gt; ${dynPersonasXml}&amp;nbsp;&amp;nbsp;|&amp;nbsp;&amp;nbsp;&lt;b style='color:#E2E8F0;'&gt;Stakeholders:&lt;/b&gt; ${dynStakeholdersXml}&amp;nbsp;&amp;nbsp;|&amp;nbsp;&amp;nbsp;&lt;span style='color:#38BDF8;font-weight:bold;'&gt;${dynSla}&lt;/span&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;`;

  updatedXml = updatedXml
    .replace(/(<mxCell\s+id="(?:main_title_bar_uv|main_title_bar|macro_hdr_title|top_header|header_title|main_title|main_title_banner)"\s+value=")[\s\S]*?("\s+style="[^"]*"[^>]*vertex="1"[^>]*>)/gi, `$1${dynamicEnterpriseHeaderHtml}$2`);

  // 2. Adapt technical nodes if generic
  const promptTextLower = (userPrompt || topic || '').toLowerCase();
  const isEcommerce = /e-?commerce|retail|storefront|cart|checkout|catalog|shopper|merchant|omnichannel|product catalog/i.test(promptTextLower + ' ' + (topic || ''));
  const isGenomicPrompt = promptTextLower.includes('genomic') || promptTextLower.includes('fastq') || promptTextLower.includes('variant') || promptTextLower.includes('gatk') || promptTextLower.includes('dna') || promptTextLower.includes('bwa');
  const isLiteratureMiningPrompt = promptTextLower.includes('literature') || promptTextLower.includes('patent') || promptTextLower.includes('clinical trial') || promptTextLower.includes('nsclc') || promptTextLower.includes('target discovery') || promptTextLower.includes('langchain') || promptTextLower.includes('bioinformatician');
  const isEarlyDiscoveryPrompt = promptLower.includes('discovery') || promptLower.includes('aiddison') || promptLower.includes('notebook') || promptLower.includes('biologist') || promptLower.includes('hypothesis');
  const isFintechPrompt = !isEcommerce && (promptLower.includes('fintech') || promptLower.includes('payment') || promptLower.includes('fraud') || promptLower.includes('ledger') || promptLower.includes('banking') || promptLower.includes('iso 20022') || promptLower.includes('pci') || promptLower.includes('apexpay'));

  if (isEcommerce) {
    updatedXml = updatedXml
      .replace(/Data Engineering/g, 'Event-Driven E-Commerce Pub/Sub Ingestion')
      .replace(/Application Development/g, 'Next.js &amp; Spring Boot Microservices Core')
      .replace(/MLOps/g, 'Vertex AI Agentic RAG &amp; Recommendation Core')
      .replace(/Project Planning/g, 'PCI-DSS &amp; Global E-Commerce Compliance')
      .replace(/Dimensional Data Modeling \(ERD\)/g, 'E-Commerce Dimensional Schema &amp; Order Lineage')
      .replace(/TRACK 1: DATA ENGINEERING &amp; DIMENSIONAL MODELING FLOW \(DFD\/ERD Lifecycle\)/g, 'TRACK 1: REAL-TIME CLICKSTREAM &amp; ORDER INGESTION PIPELINE')
      .replace(/TRACK 2: APPLICATION DEVELOPMENT &amp; COGNITIVE ARCHITECTURE FLOW \(App Code Flow\)/g, 'TRACK 2: VERTEX AI AGENTIC PRODUCT RECOMMENDATION &amp; SEARCH')
      .replace(/TRACK 3: MLOps LIFECYCLE \(ML\/AI TRAINING FLOW\)/g, 'TRACK 3: REAL-TIME FRAUD DETECTION &amp; CART ABANDONMENT ML PIPELINE')
      .replace(/GKE Containers/g, 'Spring Boot E-Commerce Microservices (GKE)')
      .replace(/API Gateway/g, 'Apigee &amp; Cloud Armor Storefront Gateway')
      .replace(/Canary deployment on GKE/g, 'Automated Blue/Green Storefront Deployment')
      .replace(/Human-in-the-Loop Governance/g, 'High-Risk Order Review &amp; Fraud Gate')
      // ERD Specific Replacements (Complete 1-to-1 E-Commerce Mapping)
      .replace(/Dim_Patient/g, 'Dim_Customer')
      .replace(/Patient Key/g, 'Customer Key (PK)')
      .replace(/Patient ID/g, 'Customer ID')
      .replace(/Patient Type/g, 'Customer Loyalty Tier (Gold/VIP)')
      .replace(/Demographics/g, 'Demographics &amp; Shipping Region')
      .replace(/Disease History/g, 'Purchase History &amp; Lifetime Value')
      .replace(/Dim_Physician/g, 'Dim_Product')
      .replace(/Physician Key/g, 'Product SKU Key (PK)')
      .replace(/Physician ID/g, 'Product SKU')
      .replace(/Specialization/g, 'Category &amp; Taxonomy')
      .replace(/Affiliation/g, 'Brand &amp; Merchant ID')
      .replace(/Ranking/g, 'Rating &amp; Review Score')
      .replace(/Location/g, 'Warehouse Fulfillment Center')
      .replace(/Dim_Payer/g, 'Dim_Payment_Method')
      .replace(/Payer Key/g, 'Payment Method Key (PK)')
      .replace(/Payer ID/g, 'Payment Gateway ID')
      .replace(/Payer Name/g, 'Gateway (Stripe/Adyen/PayPal)')
      .replace(/Type/g, 'Payment Type (Credit/ApplePay/BNPL)')
      .replace(/Tier/g, 'PCI-DSS Compliance Tier')
      .replace(/Dim_Oncology_Product/g, 'Dim_Store_Channel')
      .replace(/Product Key/g, 'Channel Key (PK)')
      .replace(/Product ID/g, 'Channel ID')
      .replace(/Product Name/g, 'Channel Name (Web/Mobile/POS)')
      .replace(/Therapy Area/g, 'Region (US/EU/APAC)')
      .replace(/Fact_Patient_Encounters/g, 'Fact_Orders')
      .replace(/Encounter ID/g, 'Order ID (PK)')
      .replace(/Diagnosis ID/g, 'Cart Session ID')
      .replace(/Physician ID/g, 'Product SKU (FK)')
      .replace(/Payer ID/g, 'Payment Method ID (FK)')
      .replace(/Patient ID/g, 'Customer ID (FK)')
      .replace(/Fact_Oncology_Insights/g, 'Fact_Cart_Events')
      .replace(/Fact_Competitive_Intel/g, 'Fact_Payment_Transactions')
      .replace(/Insight Type/g, 'Cart Action (Add/Remove/Abandon)')
      .replace(/Row-Level Security on Patient Data/g, 'Row-Level Security on Customer &amp; Payment Data (PCI-DSS &amp; GDPR Compliant)');
  } else if (isFintechPrompt) {
    updatedXml = updatedXml
      .replace(/Data Engineering/g, 'ISO 20022 Ingestion (Swift/SEPA)')
      .replace(/Application Development/g, 'ML Fraud Risk Scoring')
      .replace(/MLOps/g, 'Cloud Spanner Ledger Core')
      .replace(/Project Planning/g, 'PCI-DSS &amp; SOC2 Governance')
      .replace(/Dimensional Data Modeling \(ERD\)/g, 'ISO 20022 Schema &amp; Ledger')
      .replace(/TRACK 1: DATA ENGINEERING &amp; DIMENSIONAL MODELING FLOW \(DFD\/ERD Lifecycle\)/g, 'TRACK 1: REAL-TIME ISO 20022 PAYMENT CLEARING PIPELINE')
      .replace(/TRACK 2: APPLICATION DEVELOPMENT &amp; COGNITIVE ARCHITECTURE FLOW \(App Code Flow\)/g, 'TRACK 2: SUB-50ms ML FRAUD DETECTION &amp; ANOMALY SCORING')
      .replace(/TRACK 3: MLOps LIFECYCLE \(ML\/AI TRAINING FLOW\)/g, 'TRACK 3: CLOUD SPANNER ALGORITHMIC LEDGER &amp; SETTLEMENT')
      .replace(/GKE Containers/g, 'Payment Pods &amp; WAF')
      .replace(/API Gateway/g, 'ISO 20022 Gateway')
      .replace(/Canary deployment on GKE/g, 'Settlement Rollout Gate')
      .replace(/Human-in-the-Loop Governance/g, 'Fraud &amp; AML Gate')
      .replace(/Dim_Patient/g, 'Dim_Customer_Account')
      .replace(/Fact_Patient_Encounters/g, 'Fact_Account_Transactions')
      .replace(/Dim_Physician/g, 'Dim_Merchant')
      .replace(/Dim_Payer/g, 'Dim_Card_Issuer');
  } else if (isEarlyDiscoveryPrompt) {
    updatedXml = updatedXml
      .replace(/Manual Data Sources Card/g, 'Internal Assay Notes, PDFs &amp; Lab Summaries')
      .replace(/Raw Scientific Literature &amp; PPT Decks/g, 'Gemini Notebook Enterprise Ingestion')
      .replace(/Analyst Workspace Portal/g, 'Scientist &amp; Computational Biologist Portal')
      .replace(/Asset Analysis &amp; Query Interface/g, 'Biological Hypothesis &amp; Target Exploration')
      .replace(/Multi-Functional Data Synthesis/g, 'Gemini Notebook Enterprise Synthesis')
      .replace(/Genomic &amp; Clinical Correlation Engine/g, 'Scattered Findings &amp; Unified Target Dossier')
      .replace(/Unstructured Content Analysis/g, 'AIDDISON on Vertex AI (Virtual Screening)')
      .replace(/PubMed PDF &amp; PPT Chunking Engine/g, 'Chemical Screening &amp; Synthesis Routes')
      .replace(/Strategic Chatbot Reasoning/g, 'Reusable Agent Designer Monitoring')
      .replace(/ReAct Natural Language Agent Interface/g, 'Continuous Signal Alerts &amp; Literature Monitor')
      // ERD Specific Replacements (Explicitly Mapped to 5 Early Discovery Workflow Steps)
      .replace(/Dim_Patient/g, 'Dim_Biological_Target (Step 1)')
      .replace(/Patient Key/g, 'Target ID (PK)')
      .replace(/Patient Type/g, 'Gene Symbol &amp; Target Name')
      .replace(/Demographics/g, 'Disease Association')
      .replace(/Disease History/g, 'AIDDISON Screening Status')
      .replace(/Dim_Physician/g, 'Dim_Lab_Assay_Notes (Step 3)')
      .replace(/Physician Key/g, 'Lab Asset ID (PK)')
      .replace(/Specialization/g, 'Assay Note / Lab PDF Type')
      .replace(/Affiliation/g, 'Gemini Notebook Dossier ID')
      .replace(/Ranking/g, 'Synthesis Status')
      .replace(/Location/g, 'Lab Facility Location')
      .replace(/Dim_Payer/g, 'Dim_Literature_Corpus (Step 2)')
      .replace(/Payer Key/g, 'Doc DOI / Patent ID (PK)')
      .replace(/Payer Name/g, 'Deep Research Source')
      .replace(/Type/g, 'Doc Type (Paper/Patent/Abstract)')
      .replace(/Tier/g, 'Scientific Impact Tier')
      .replace(/Dim_Oncology_Product/g, 'Dim_Chemical_Compound (Step 4)')
      .replace(/Product Key/g, 'Compound SMILES ID (PK)')
      .replace(/Therapy Area/g, 'AIDDISON Affinity Score')
      .replace(/Fact_Oncology_Insights/g, 'Fact_AIDDISON_Screening (Step 4)')
      .replace(/Fact_Patient_Encounters/g, 'Fact_Virtual_Synthesis_Routes (Step 4)')
      .replace(/Encounter ID/g, 'Synthesis Route ID')
      .replace(/Diagnosis ID/g, 'Reaction Steps Count')
      .replace(/Physician ID/g, 'Lab Asset ID')
      .replace(/Payer ID/g, 'Doc DOI ID')
      .replace(/Patient ID/g, 'Target ID')
      .replace(/Fact_Competitive_Intel/g, 'Fact_Monitoring_Alerts (Step 5)')
      .replace(/Insight Type/g, 'Agent Designer Signal Confidence')
      .replace(/Row-Level Security on Patient Data/g, 'IP &amp; Target Molecule Protection')
      // Product Vendor Model & Vendor Service Updates (Latest GCP & Enterprise LLM updates)
      .replace(/Gemini 1\.5 Pro/g, 'Gemini 3.7 Flash')
      .replace(/Gemini 2\.5 Pro/g, 'Gemini 3.7 Flash')
      .replace(/Gemini 3\.6 Pro/g, 'Gemini 3.7 Flash')
      .replace(/Vertex AI Gemini API/g, 'Gemini 3.7 Flash LLM &amp; Notebook Enterprise')
      .replace(/Anthos Service Mesh/gi, 'Google Cloud Service Mesh (Managed Istio)')
      .replace(/Cloud Life Sciences API/gi, 'Genomics on Google Cloud Batch &amp; GKE Spot')
      .replace(/Cloud Source Repositories/gi, 'GitHub Enterprise &amp; Cloud Build Triggers')
      .replace(/Cloud SQL for PostgreSQL/gi, 'AlloyDB &amp; Cloud SQL HA PostgreSQL')
      .replace(/AWS OpenSearch/gi, 'Amazon OpenSearch Serverless Vector Engine')
      // Prompt & Callout Cleanliness (Flexible regex matching HTML entities and newlines)
      .replace(/Compare market trends[\s\S]*?across functional silos/gi, 'Explore biological targets &amp; AIDDISON virtual synthesis')
      .replace(/Oncology Trends/gi, 'Target Hypothesis &amp; Literature')
      .replace(/Total Sales in Q1/gi, 'Virtual Chemical Screening &amp; Binding Affinity')
      .replace(/Financial Analyst/gi, 'Research Scientist &amp; Computational Biologist')
      .replace(/Tool 1: Enterprise Knowledge/gi, 'Tool 1: Deep Research &amp; Gemini Notebook')
      .replace(/Tool 2: Business Analytics/gi, 'Tool 2: AIDDISON &amp; Agent Designer Engine')
      .replace(/Execute SQL Queries/gi, 'Virtual Chemical Screening')
      .replace(/Structured Data Access/gi, 'Predict Synthesis Routes &amp; Costs')
      .replace(/Queries secured GCS Data Corpus/gi, 'Deep Research: Papers, Patents &amp; Abstracts')
      .replace(/Automatic Embedding &amp; Retrieval/gi, 'Gemini Notebook Enterprise Dossier Synthesis')
      // Sequence Diagram Specific Replacements for Early Discovery
      .replace(/RLY IDENTIFIC ION PERSON SECURE MANAGED GEMINI ENTERPRISE ECOSYSTEM/g, 'EARLY DISCOVERY &amp; TARGET IDENTIFICATION SECURE MANAGED ECOSYSTEM')
      .replace(/Rly Identific Ion Person Platform - RLY IDENTIFIC ION PERSON RLY IDENTIFIC ION PERSON COMPLETE END-TO-END DYNAMIC SEQUENCE DIAGRAM\./g, 'Early Discovery &amp; Target Identification — Complete End-to-End Macro Sequence Diagram')
      .replace(/ITACS Integrated Insights Platform - COMPLETE END-TO-END DYNAMIC SEQUENCE DIAGRAM\./g, 'Early Discovery &amp; Target Identification — Complete End-to-End Macro Sequence Diagram')
      .replace(/Early Discovery &amp; Target Identification Platform - Early Discovery &amp; Target Identification Early Discovery &amp; Target Identification COMPLETE END-TO-END DYNAMIC SEQUENCE DIAGRAM\./g, 'Early Discovery &amp; Target Identification — Complete End-to-End Macro Sequence Diagram')
      .replace(/Sends single Oncology prompt:[\s\S]*?recent sales figures'/gi, "Sends biological target prompt:&lt;br&gt;&lt;span style='font-size:10px;font-weight:normal;'&gt;'Define NSCLC hypothesis &amp; explore target dossiers'&lt;/span&gt;")
      .replace(/THOUGHT: 'I need multi-silo context.'/gi, "THOUGHT: 'Need PubMed, patents &amp; assay notes.'")
      .replace(/ACTION: Call RAG Tool/gi, 'ACTION: Call Deep Research &amp; Notebook Enterprise')
      .replace(/Send call with 'Automatic Embedding &amp; Ret Tool'[\s\S]*?centientext\)\)/gi, 'Executes Landscape Search &amp; Ingest (Scan millions of papers/patents &amp; synthesize assay notes)')
      .replace(/THOUGHT: 'I have context, but need recent sales figures.'/gi, "THOUGHT: 'Have target dossier. Need AIDDISON screening.'")
      .replace(/ACTION: Query BigQuery Analytics/gi, 'ACTION: Call AIDDISON Virtual Screening')
      .replace(/Send call logs; ML Inference log def[\s\S]*?RAG query/gi, 'Executes AIDDISON Chemical Screening (Screen chemical possibilities &amp; predict synthesis routes)')
      .replace(/Tool 1: Managed RAG[\s\S]*?Conv\)/gi, 'Tool 1: Deep Research &amp; Gemini Notebook')
      .replace(/Tool 2: BigQuery Analytics[\s\S]*?\)/gi, 'Tool 2: AIDDISON &amp; Agent Designer')
      .replace(/BigQuery Analytics \(SQL\)/gi, 'AIDDISON &amp; Agent Designer')
      .replace(/GCS Secure Bucket[\s\S]*?Corpus\)/gi, 'GCS Lab Assay PDFs &amp; Target Corpus')
      .replace(/Oncology Analyst/g, 'Research Scientist &amp; Bioinformatician')
      .replace(/Deck Studio API/g, 'AIDDISON Virtual Screening API')
      .replace(/Global Market Radar API/g, 'Deep Research Landscape API')
      .replace(/Requests PPT deck/g, 'Frame biological research hypothesis &amp; target exploration')
      .replace(/synthesized request and request flow/g, 'Deploy Deep Research agent across millions of papers &amp; patents')
      .replace(/Generate PPT deck/g, 'Synthesize assay notes &amp; lab PDFs in Gemini Notebook Enterprise')
      .replace(/interactive visualizabcn/g, 'Screen billions of chemicals &amp; predict synthesis routes in AIDDISON')
      .replace(/pushes to interface/g, 'Deploy reusable Agent Designer literature monitoring agent')
      // Data & AI Pipeline Specific Replacements for Early Discovery
      .replace(/Rly Identific Ion Person - Data &amp; AI Pipeline/g, 'Early Discovery &amp; Target Identification — Data &amp; AI Pipeline')
      .replace(/RLY IDENTIFIC ION PERSON SECURE GOVERNED CLOUD TENANT/g, 'EARLY DISCOVERY &amp; TARGET IDENTIFICATION SECURE GOVERNED CLOUD TENANT')
      .replace(/Customer\s*(?:&lt;|<)br\s*\/?(?:&gt;|>)\s*Churn\s*Features/gi, 'Target Dossier &amp;&lt;br&gt;Binding Affinity Features')
      .replace(/Sales\s*Prediction\s*(?:&lt;|<)br\s*\/?(?:&gt;|>)\s*Features/gi, 'AIDDISON Chemical&lt;br&gt;Screening Features')
      .replace(/Funcriogy/g, 'Functional Research Areas')
      .replace(/Salesforce\s*(?:&lt;|<)br\s*\/?(?:&gt;|>)\s*cloud\s*App/gi, 'PubMed REST API &amp;&lt;br&gt;Patent Ingest')
      // Catch-all Generic Sales / Lead Scoring DFD Replacements for Early Discovery
      .replace(/Lead Scoring &amp; Prioritization/gi, 'Target Prioritization &amp; Binding Affinity Engine')
      .replace(/Business Rules Engine, Financial Impact Rating/gi, 'AIDDISON Virtual Screening &amp; Target Validation')
      .replace(/AI\/ML Profiling Engine/gi, 'Literature &amp; Assay Target Extraction Engine')
      .replace(/Predictive Scoring, Sentiment Analysis/gi, 'Gemini Notebook Enterprise Target Synthesis')
      .replace(/Market Segmentation &amp; Analytics/gi, 'Target Landscape &amp; Deep Research Analytics')
      .replace(/Cluster Analysis, Trend Scoring/gi, 'Patent &amp; Paper Signal Clustering')
      .replace(/Manual Input &amp; CRM Feeds/gi, 'Lab Assay Notes &amp; Assay PDF Feeds')
      .replace(/Salesforce &amp; User-Provided Data/gi, 'Internal GxP Assay Documents &amp; Lab Notes')
      .replace(/Market Research, News, Social/gi, 'PubMed API, USPTO Patents &amp; Congress Abstracts')
      // Secure Deployment Map Replacements for Early Discovery
      .replace(/Google Cloud Project \(ITACS Platform Production\)/g, 'Google Cloud Project (Early Discovery &amp; Target Identification)')
      .replace(/Rly Identific Ion Person Production Cloud Architecture/g, 'Google Cloud Project (Early Discovery &amp; Target Identification)')
      .replace(/Rly Identific Ion Person Primary/gi, 'EARLY DISCOVERY &amp; TARGET IDENTIFICATION Primary')
      .replace(/Rly Identific Ion Person Agent\s*<br\s*\/?>\s*Orchestrator\s*<br\s*\/?>\s*\(GKE Pod\)/gi, 'Scientific Discovery Orchestrator &amp;&lt;br&gt;Agent Designer&lt;br&gt;(GKE Cluster)')
      .replace(/Rly Identific Ion Person/g, 'Early Discovery &amp; Target Identification')
      .replace(/Zone 1: The Edge \(External Traffic\)/g, 'Zone 1: Scientific Web Edge &amp; Ingress (External)')
      .replace(/Public Internet\s*<br\s*\/?>\s*Traffic/gi, 'Research Scientist &amp;&lt;br&gt;Bioinformatician Traffic')
      .replace(/ITACS Primary VPC Network/g, 'Early Discovery Primary VPC Network')
      .replace(/ITACS Agent Orchestrator \(GKE Pod\)/g, 'Scientific Discovery Orchestrator (GKE Cluster)')
      .replace(/Vertex AI Vector Search Index/g, 'Vertex AI Vector Search (pgvector Target Embeddings)')
      .replace(/Vertex AI Training Cluster/g, 'AIDDISON Virtual Screening Engine (Vertex AI)')
      .replace(/Vertex AI Gemini API/g, 'Gemini 3.7 Flash LLM &amp; Notebook Enterprise')
      // DevOps & CI/CD Pipeline Replacements for Early Discovery
      .replace(/ITACS Governing Cloud Tenant \(Managed Services\)/g, 'Early Discovery &amp; Target Identification Cloud Tenant')
      .replace(/Rly Identific Ion Person Governing Cloud Tenant/gi, 'Early Discovery &amp; Target Identification Cloud Tenant')
      .replace(/ITACS SECURE MANAGED GEMINI ENTERPRISE ECOSYSTEM BOUNDARY/g, 'EARLY DISCOVERY SECURE MANAGED GEMINI ECOSYSTEM BOUNDARY')
      .replace(/Project\s*<br\s*\/?>\s*Planning/gi, 'Hypothesis Framing &amp;&lt;br&gt;Target Goal Setting')
      .replace(/Dimensional\s*<br\s*\/?>\s*Data Modeling\s*<br\s*\/?>\s*\(ERD\)/gi, 'Assay Data Model &amp;&lt;br&gt;Target Schema (ERD)')
      .replace(/Data Engineering/g, 'Assay Data Ingestion Engine')
      .replace(/Application\s*(?:<br\s*\/?>)?\s*Development/gi, 'AIDDISON Screening &amp;&lt;br&gt;Agent Designer')
      .replace(/MLOps/g, 'MLOps Target &amp; Binding Affinity')
      // Governance & State Machine Replacements for Early Discovery
      .replace(/DATA VETTING/gi, 'ASSAY DATA VETTING')
      .replace(/Ethical Sourcing/gi, 'GxP &amp; IP Sourcing')
      .replace(/MODEL CREATED/gi, 'TARGET HYPOTHESIS CREATED')
      .replace(/PROMPT DESIGNED/gi, 'TARGET DOSSIER DEFINED')
      .replace(/MODEL REGISTRY/gi, 'TARGET &amp; COMPOUND REGISTRY')
      .replace(/Bias &amp;amp;&lt;br&gt;Fairness Audit/g, 'AIDDISON Binding Affinity &amp;amp;&lt;br&gt;Safety Audit')
      .replace(/Bias &amp;amp; Fair/g, 'AIDDISON Safety')
      // Unified System View Replacements for Early Discovery
      .replace(/ITACS Integrated Insights Platform/gi, 'EARLY DISCOVERY &amp; TARGET IDENTIFICATION PLATFORM')
      .replace(/Rly Identific Ion Person Integrated Insights Platform/gi, 'EARLY DISCOVERY &amp; TARGET IDENTIFICATION PLATFORM')
      .replace(/Dim_Patient/gi, 'Dim_Target')
      .replace(/Fact_Clinical/gi, 'Fact_Assay_Binding');
  }

  const isECommercePrompt = promptLower.includes('e-commerce') || promptLower.includes('ecommerce') || promptLower.includes('supply chain') || promptLower.includes('fulfillment') || promptLower.includes('stripe') || promptLower.includes('inventory') || promptLower.includes('warehouse') || promptLower.includes('order');

  if (isECommercePrompt) {
    updatedXml = updatedXml
      .replace(/Silo Analysts/g, 'Customer &amp; Operations')
      .replace(/Google Workspace Connectors/g, 'API Gateway')
      .replace(/GCS Secure Bucket/g, 'Inventory Service (Real-Time)')
      .replace(/Airflow Scheduler/g, 'Event Stream / EventBridge')
      .replace(/dbt Transformation/g, 'Autonomous Inventory Allocation')
      .replace(/BigQuery Feature Store/g, 'Stripe Payment Gateway')
      .replace(/ETL Audit Log/g, 'Fulfillment Audit Log')
      .replace(/ML Engineer/g, 'Supply Chain Operations')
      .replace(/Model Training \(Vertex AI\)/g, 'Predictive Reordering Service')
      .replace(/Model Registry/g, 'Fulfillment Node Registry')
      .replace(/Governance Board \(Human-in-the-Loop\)/g, 'Logistics Operations Board')
      .replace(/GKE Inference Endpoint/g, 'GPS Telemetry Service')
      .replace(/Monitoring/g, 'Carrier Delivery Monitor')
      .replace(/ML Inference Log/g, 'Shipment &amp; GPS Telemetry Log')
      .replace(/Oncology Analyst/g, 'Customer / Buyer')
      .replace(/User Interface/g, 'E-Commerce Storefront App')
      .replace(/Agent Orchestrator \(Vertex AI\)/g, 'Supply Chain Agent Orchestrator')
      .replace(/Deck Studio API/g, 'Carrier Shipping API')
      .replace(/Global Market Radar API/g, 'Real-Time GPS Tracking API')
      .replace(/Requests PPT deck/g, 'Place E-Commerce Order')
      .replace(/Requests request/g, 'Verify Stock &amp; Authorize Payment')
      .replace(/Orchestrator calls Deck Studio API with synthesized report and request/g, 'Allocate Warehouse Stock &amp; Assign Logistics Node')
      .replace(/Orchestrator calls Global Market Radar API, generates interactive visualization/g, 'Dispatch Shipment &amp; Stream GPS Telemetry')
      .replace(/Analysts upload raw docs/g, 'Customer places order')
      .replace(/Executes logic \(Clean, Normalize, Aggregate, Encode\)/g, 'Verify inventory &amp; allocate warehouse stock')
      .replace(/Stores model-ready features/g, 'Authorize payment &amp; emit OrderPlaced event')
      .replace(/Pushes metadata \(lineage, job status, row counts\)/g, 'Log order fulfillment &amp; audit status')
      .replace(/Initiates training/g, 'Trigger predictive stock reorder')
      .replace(/Pulls features from BigQuery/g, 'Query inventory levels &amp; lead times')
      .replace(/Executes training, generates Metrics/g, 'Run Gemini predictive reorder analysis')
      .replace(/Provides Human-in-the-Loop Approval/g, 'Approve purchase order for supplier')
      .replace(/Deployment Pipeline pulls model/g, 'Dispatch purchase order to logistics')
      .replace(/Logs inference and drift/g, 'Track carrier delivery SLA &amp; status')
      .replace(/Pushes logs to ML Inference Log/g, 'Stream delivery status to BigQuery');
  }

  // Conceptual Diagram Specific Replacements
  if (isLiteratureMiningPrompt || isGenomicPrompt || isEarlyDiscoveryPrompt) {
    updatedXml = updatedXml
      .replace(/Legacy SAP S\/4HANA/gi, 'PubMed REST API &amp; USPTO Patent Ingest')
      .replace(/Veeva Vault Clinical/gi, 'Internal GxP Clinical Trial Repository')
      .replace(/Azure API Management/gi, 'LangChain Agentic API Gateway')
      .replace(/Ping Identity OAuth 2\.0/gi, 'IP Protection &amp; Data Encryption Vault')
      .replace(/Drug Discovery Cluster/gi, 'Vertex AI Vector Search (pgvector Embeddings)')
      .replace(/Clinical Trial &amp; Regulatory Cluster/gi, 'Literature Mining &amp; Document Summarization Engine')
      .replace(/Commercial &amp; Supply Chain Cluster/gi, 'Target &amp; Pathway Consensus Identification Service')
      .replace(/On-Prem GxP ERP/g, 'Scientific Literature &amp; Patent Ingest')
      .replace(/eTMF &amp; Submissions Gateway/g, 'GxP Trial Protocol Gateway')
      .replace(/GxP Part 11 Compliance Enforcement/g, 'LangChain Agentic API Router')
      .replace(/HIPAA\/PKCE Anonymization/g, 'IP Protection &amp; Data Anonymization')
      .replace(/Vertex AI, SAS 9\.4 Analytics/g, 'Vertex AI Vector Search &amp; Cosine Index')
      .replace(/HealthLake, Veeva Connect/g, 'LLM Literature Summarization Engine')
      .replace(/SAP Batch Reconciler/g, 'Pathway Consensus Identification')
      .replace(/Genomic Data Lake/g, 'PubMed &amp; Patent Data Lake')
      .replace(/Clinical Data Warehouse/g, 'NSCLC Clinical Target Repository');
  } else {
    const domainTitle = topic || 'Enterprise';
    updatedXml = updatedXml
      .replace(/Legacy SAP S\/4HANA/gi, `${domainTitle} Core Systems &amp; API Ingress`)
      .replace(/Veeva Vault Clinical/gi, `${domainTitle} Data Repository &amp; Storage`)
      .replace(/Azure API Management/gi, `${domainTitle} API Gateway &amp; Router`)
      .replace(/Ping Identity OAuth 2\.0/gi, `${domainTitle} Zero-Trust Identity &amp; Auth`)
      .replace(/Drug Discovery Cluster/gi, `${domainTitle} Core Processing &amp; AI Engine`)
      .replace(/Clinical Trial &amp; Regulatory Cluster/gi, `${domainTitle} Transaction &amp; Business Logic`)
      .replace(/Commercial &amp; Supply Chain Cluster/gi, `${domainTitle} Analytics &amp; Operations Service`)
      .replace(/On-Prem GxP ERP/g, `${domainTitle} Core ERP &amp; Database Systems`)
      .replace(/eTMF &amp; Submissions Gateway/g, `${domainTitle} Integration Gateway`)
      .replace(/GxP Part 11 Compliance Enforcement/g, `${domainTitle} Security &amp; Compliance Router`)
      .replace(/HIPAA\/PKCE Anonymization/g, `${domainTitle} Data Encryption Vault`)
      .replace(/Vertex AI, SAS 9\.4 Analytics/g, `${domainTitle} Analytics &amp; Reporting Engine`)
      .replace(/HealthLake, Veeva Connect/g, `${domainTitle} Integrations &amp; Connectors`)
      .replace(/SAP Batch Reconciler/g, `${domainTitle} Data Reconciler`)
      .replace(/Genomic Data Lake/g, `${domainTitle} Enterprise Data Lake`)
      .replace(/Clinical Data Warehouse/g, `${domainTitle} Enterprise Data Warehouse`)
      .replace(/PubMed REST API &amp; USPTO Patent Ingest/gi, `${domainTitle} External Data &amp; API Ingress`)
      .replace(/PubMed REST API/gi, `${domainTitle} Data Ingress API`)
      .replace(/PubMed &amp; Patent Data Lake/gi, `${domainTitle} Data Lake`)
      .replace(/NSCLC Clinical Target Repository/gi, `${domainTitle} Data Repository`)
      .replace(/Oncology Scenario Planning/gi, `${domainTitle} Operations &amp; Strategy Planning`)
      .replace(/Oncology Analyst/gi, `${domainTitle} Operations Analyst`)
      .replace(/Review Drug Launch Strategy/gi, `Review ${domainTitle} Operational Strategy`)
      .replace(/Drug Launch Strategy/gi, `${domainTitle} Operational Strategy`)
      .replace(/Biomarker/gi, `Data Attribute`)
      .replace(/Oncology/gi, domainTitle);
  }

  if (isLiteratureMiningPrompt) {
    updatedXml = updatedXml
      .replace(/\[1\]\s*User Client[^<]*/gi, '[1] Researcher Dashboard &amp; Query Portal (Bioinformatician UI)')
      .replace(/\[1\]\s*External API Clients[^<]*/gi, '[1] PubMed REST API &amp; USPTO Patent Gateway')
      .replace(/\[1\]\s*External Data Sources[^<]*/gi, '[1] PubMed, Patents &amp; Internal Clinical Trial Feeds')
      .replace(/\[1\]\s*Developer Workstation[^<]*/gi, '[1] Lead Bioinformatician Workstation')
      .replace(/\[2\]\s*Cloud Armor[^<]*/gi, '[2] Cloud Armor WAF (IP Protection &amp; Ingress Firewall)')
      .replace(/\[2\]\s*Kinesis Data Streams[^<]*/gi, '[2] Literature &amp; Patent Ingestion Stream (Kinesis)')
      .replace(/\[3\]\s*Global HTTPS Load Balancer[^<]*/gi, '[3] Global HTTPS Load Balancer (API Ingress Gateway)')
      .replace(/\[3\]\s*AWS Lake Formation[^<]*/gi, '[3] GxP Data Lakehouse Governance (AWS Lake Formation)')
      .replace(/\[4\]\s*Cloud CDN[^<]*/gi, '[4] Cloud CDN (Cached Literature Summaries)')
      .replace(/\[4\]\s*S3 Landing Zone[^<]*/gi, '[4] S3 Raw Literature &amp; Patent Landing Zone')
      .replace(/\[5\]\s*Cloud Run Frontend[^<]*/gi, '[5] Unstructured PDF &amp; Patent Document Chunking Engine')
      .replace(/\[5\]\s*AWS Glue ETL Processing[^<]*/gi, '[5] Unstructured Text Summarization Engine (AWS Glue)')
      .replace(/\[6\]\s*Cloud Run Backend API[^<]*/gi, '[6] LangChain Agentic Prompt Orchestrator &amp; ReAct Reasoner')
      .replace(/\[6\]\s*S3 Processed Zone[^<]*/gi, '[6] S3 Processed Embeddings &amp; Vector Zone')
      .replace(/\[7\]\s*Cloud SQL[^<]*/gi, '[7] Vertex AI Vector Search Index (pgvector / Cosine Embeddings)')
      .replace(/\[7\]\s*S3 Curated Zone[^<]*/gi, '[7] S3 Curated Target &amp; Pathway Data Marts')
      .replace(/\[8\]\s*Cloud Storage[^<]*/gi, '[8] Fine-Tuned Medical LLM (Gemini 3.7 Flash)')
      .replace(/\[8\]\s*Glue Data Catalog[^<]*/gi, '[8] NSCLC Target Catalog (AWS Glue)')
      .replace(/\[9\]\s*Secret Manager[^<]*/gi, '[9] Target &amp; Pathway Consensus Evaluation Engine')
      .replace(/\[9\]\s*Amazon Athena[^<]*/gi, '[9] Amazon Athena (In-Silico Target Query Engine)')
      .replace(/\[10\]\s*Cloud Pub\/Sub[^<]*/gi, '[10] Patent &amp; Literature Discrepancy Analysis Service')
      .replace(/\[10\]\s*Redshift Spectrum[^<]*/gi, '[10] Redshift Data Warehouse (NSCLC Target Analytics)')
      .replace(/\[11\]\s*Cloud Logging[^<]*/gi, '[11] Automated GxP Audit Trail Ledger (21 CFR Part 11 Compliance)')
      .replace(/\[11\]\s*AWS IAM &amp; Policies[^<]*/gi, '[11] IP Protection &amp; IAM Access Control Policies')
      .replace(/\[12\]\s*Cloud Trace[^<]*/gi, '[12] In-Silico Target Screening Strategy Evaluator')
      .replace(/\[13\]\s*Cloud Security Command Center[^<]*/gi, '[13] Intellectual Property Protection &amp; Privacy Vault');
  } else if (isGenomicPrompt) {
    updatedXml = updatedXml
      .replace(/\[1\]\s*User Client[^<]*/gi, '[1] Illumina NovaSeq Sequencing (RAW FASTQ Ingestion)')
      .replace(/\[1\]\s*External API Clients[^<]*/gi, '[1] Illumina NovaSeq Sequencing (RAW FASTQ Ingestion)')
      .replace(/\[1\]\s*Developer Workstation[^<]*/gi, '[1] Illumina NovaSeq Sequencing (RAW FASTQ Ingestion)')
      .replace(/\[2\]\s*Cloud Armor[^<]*/gi, '[2] Cloud Armor WAF (Layer 7 DDoS Protection)')
      .replace(/\[2\]\s*Source Code Repository[^<]*/gi, '[2] GCP Artifact Registry (FASTQ Raw Storage)')
      .replace(/\[3\]\s*Global HTTPS Load Balancer[^<]*/gi, '[3] Global Load Balancer &amp; Ingress Gateway')
      .replace(/\[3\]\s*CI\/CD Workflow Engine[^<]*/gi, '[3] Cloud Pub/Sub Event Orchestrator (FASTQ Triggers)')
      .replace(/\[4\]\s*Cloud CDN[^<]*/gi, '[4] Cloud Pub/Sub Event Orchestrator (FASTQ Triggers)')
      .replace(/\[4\]\s*Test &amp; Quality Cluster[^<]*/gi, '[4] GKE Quality Gate (FASTQ Validation &amp; QC)')
      .replace(/\[5\]\s*Cloud Run Frontend[^<]*/gi, '[5] Cloud Storage RAW FASTQ Data Bucket (KMS Encrypted)')
      .replace(/\[5\]\s*Security Scan Suite[^<]*/gi, '[5] SAST &amp; Trivy Scanner (Container &amp; Pipeline Guard)')
      .replace(/\[6\]\s*Cloud Run Backend API[^<]*/gi, '[6] GKE Secondary Analysis Compute (BWA-MEM &amp; GATK)')
      .replace(/\[6\]\s*Container Build &amp; Scan[^<]*/gi, '[6] GKE Secondary Analysis Compute (BWA-MEM &amp; GATK)')
      .replace(/\[7\]\s*Cloud SQL[^<]*/gi, '[7] BigQuery Genomics Data Lakehouse (VCF &amp; Variant Store)')
      .replace(/\[7\]\s*Container Registry[^<]*/gi, '[7] BigQuery Genomics Data Lakehouse (VCF &amp; Variant Store)')
      .replace(/\[8\]\s*Cloud Storage[^<]*/gi, '[8] Cloud KMS (Customer-Managed Encryption Keys)')
      .replace(/\[8\]\s*GitOps Deployment Sync[^<]*/gi, '[8] GitOps Controller (ArgoCD Pipeline Deployment)')
      .replace(/\[9\]\s*Secret Manager[^<]*/gi, '[9] Google Secret Manager (API Credentials)')
      .replace(/\[9\]\s*Staging Kubernetes Cluster[^<]*/gi, '[9] GKE Staging Sequencing Cluster')
      .replace(/\[10\]\s*Cloud Pub\/Sub[^<]*/gi, '[10] Cloud Pub/Sub Secondary Event Queue')
      .replace(/\[10\]\s*Production Kubernetes Cluster[^<]*/gi, '[10] GKE Production Variant Calling Cluster')
      .replace(/\[11\]\s*Cloud Logging[^<]*/gi, '[11] Cloud Monitoring &amp; Automated Rollback Alert')
      .replace(/\[11\]\s*Performance &amp; Canary Monitoring[^<]*/gi, '[11] Cloud Monitoring &amp; Automated Rollback Alert')
      .replace(/\[12\]\s*Automated Rollback Trigger[^<]*/gi, '[12] Automated Rollback Trigger (Canary Health Workflow)');
  } else {
    updatedXml = updatedXml
      .replace(/\[1\] External Data Sources/g, `[1] ${topic} Data Feeds`)
      .replace(/\[2\] Kinesis Data Streams/g, `[2] ${topic} Kinesis Real-Time Stream`)
      .replace(/\[3\] AWS Lake Formation/g, `[3] ${topic} Lakehouse Governance`)
      .replace(/\[4\] S3 Landing Zone/g, `[4] ${topic} Raw S3 Landing`)
      .replace(/\[5\] AWS Glue ETL Processing/g, `[5] ${topic} Glue ETL Engine`)
      .replace(/\[6\] S3 Processed Zone/g, `[6] ${topic} Staged Processed Data`)
      .replace(/\[7\] S3 Curated Zone/g, `[7] ${topic} Curated Data Marts`)
      .replace(/\[8\] Glue Data Catalog/g, `[8] ${topic} Glue Data Catalog`)
      .replace(/\[9\] Amazon Athena/g, `[9] ${topic} Athena Query Engine`)
      .replace(/\[10\] Redshift Spectrum/g, `[10] ${topic} Redshift Data Warehouse`)
      .replace(/\[11\] AWS IAM &amp; Policies/g, `[11] ${topic} IAM Access Control`)
      .replace(/\[11\] AWS IAM & Policies/g, `[11] ${topic} IAM Access Control`)
      .replace(/\[1\] Ingress \/ Client Portal/g, `[1] ${topic} Web &amp; Mobile Ingress`)
      .replace(/\[1\] Client App \/ Web Portal/g, `[1] ${topic} Client Portal`)
      .replace(/\[1\] Field IoT Gateway Devices/g, `[1] ${topic} Field IoT Devices`)
      .replace(/\[1\] Public Internet Traffic/g, `[1] ${topic} Internet Ingress`)
      .replace(/\[1\] Developer Push \/ PR Event/g, `[1] ${topic} Dev PR Event`)
      .replace(/\[1\] User Client/g, `[1] ${topic} User Client`)
      .replace(/\[1\] Customer Mobile App/g, `[1] ${topic} App Portal`)
      .replace(/\[1\] AWS WAF &amp; Shield/g, `[1] ${topic} AWS WAF &amp; Shield`)
      .replace(/\[1\] External API Clients/g, `[1] ${topic} External API Clients`)
      .replace(/\[1\] Enterprise Data Repositories/g, `[1] ${topic} Data Repositories`)
      .replace(/\[1\] Polyrepo Source Control/g, `[1] ${topic} Polyrepo Source Repos`);
  }

  const isBankingPrompt = promptLower.includes('bank') || promptLower.includes('fintech') || promptLower.includes('payment') || promptLower.includes('card') || promptLower.includes('loan') || promptLower.includes('wealth') || promptLower.includes('account') || promptLower.includes('credit') || promptLower.includes('ledger') || promptLower.includes('atm');

  if (isBankingPrompt) {
    updatedXml = updatedXml
      .replace(/Manual Data Sources Card/g, 'Banking Ingress &amp; Channel Ingestion Card')
      .replace(/Raw Scientific Literature &amp; PPT Decks/g, 'Mobile Apps, Web Banking &amp; ATM API Feeds')
      .replace(/>PDFs</g, '>Mobile App<')
      .replace(/>PPTs</g, '>Web Banking<')
      .replace(/Unstructured\s*(?:&lt;|<)br\s*\/?(?:&gt;|>)\s*Documents/gi, 'ATM &amp; Branch&lt;br&gt;API Feeds')
      .replace(/5 Functional Silos Ingestion/g, '5 Core Banking Functional Silos')
      .replace(/Market Research/g, 'Accounts &amp; Deposits')
      .replace(/Medical Affairs/g, 'Payments &amp; Transfers')
      .replace(/Market Access/g, 'Loans &amp; Mortgages')
      .replace(/Outcomes Research/g, 'Cards &amp; Fraud Alerts')
      .replace(/Competitive Intelligence/g, 'Wealth &amp; Investment Portal')
      .replace(/Researcher Node/g, 'Customer &amp; Operator Node')
      .replace(/Analyst Workspace Portal/g, 'Mobile &amp; Web Banking Interface')
      .replace(/Asset Analysis &amp; Query Interface/g, 'Transaction History &amp; Payment Gateway')
      .replace(/Core ITACS Synthesis Engine/g, 'Core Banking &amp; Transaction Ledger')
      .replace(/Core AI Synthesis Engine/g, 'Core Banking &amp; Transaction Ledger')
      .replace(/Multi-Functional Data Synthesis/g, 'Real-Time Transaction Processing')
      .replace(/Genomic &amp; Clinical Correlation Engine/g, 'Double-Entry Accounting &amp; Core Ledger')
      .replace(/Unstructured Content Analysis/g, 'Real-Time Fraud &amp; AML Screening')
      .replace(/PubMed PDF &amp; PPT Chunking Engine/g, 'Anti-Money Laundering &amp; Risk Scoring')
      .replace(/Strategic Chatbot Reasoning/g, 'AI Financial Assistant &amp; Wealth Support')
      .replace(/ReAct Natural Language Agent Interface/g, 'Conversational Banking &amp; Bill Pay Agent')
      .replace(/Competitive Launch Simulation/g, 'Credit Scoring &amp; Loan Underwriting')
      .replace(/Oncology Scenario Planning/g, 'Risk Profiling &amp; Loan Origination Models')
      .replace(/OUTMANEUVER COMPETITION/g, 'SECURE REAL-TIME PAYMENTS')
      .replace(/REACH PATIENTS FASTER/g, 'ZERO-TRUST FRAUD PREVENTION')
      .replace(/STRATEGIC PLANNING &amp; ANALYSIS/g, 'REGULATORY &amp; COMPLIANCE REPORTING')
      .replace(/Executive Strategy Dashboard/g, 'Executive Banking &amp; Risk Dashboard')
      .replace(/Competitor Comparison View/g, 'Account &amp; Portfolio Summary View')
      .replace(/Competitor X/g, 'Savings Account')
      .replace(/Competitor Y/g, 'Credit Card')
      .replace(/Q3 Launch/g, 'Active Balance')
      .replace(/Phase 2b/g, 'Approved Limit')
      .replace(/Q1 Market Lead/g, 'Primary Account')
      .replace(/Oncology Analyst/g, 'Banking Customer / Operator')
      .replace(/Review ITACS Oncology Operational Strategy/gi, 'Review Banking App Real-Time Fraud &amp; Compliance Strategy')
      .replace(/Oncology Operational Strategy/gi, 'Banking Real-Time Compliance Strategy')
      .replace(/STRATEGIC ADVISORY ALERT:[\s\S]*?Strategy/g, 'BANKING SECURITY ALERT: Real-Time Fraud &amp; Compliance Audit Active')
      // ERD Specific Banking Replacements
      .replace(/Dim_Customer_Entity/g, 'Dim_Customer_Account')
      .replace(/Dim_Patient/g, 'Dim_Customer_Account')
      .replace(/Patient Key/g, 'Account Key (PK)')
      .replace(/Patient Type/g, 'Account Type (Checking/Savings)')
      .replace(/Demographics/g, 'KYC Status &amp; Credit Score')
      .replace(/Disease History/g, 'Account Standing &amp; Risk Rating')
      .replace(/Dim_Provider_Service/g, 'Dim_Merchant')
      .replace(/Dim_Physician/g, 'Dim_Merchant')
      .replace(/Physician Key/g, 'Merchant Key (PK)')
      .replace(/Specialization/g, 'Merchant Category Code (MCC)')
      .replace(/Affiliation/g, 'Payment Network (Visa/MC)')
      .replace(/Ranking/g, 'Risk Rating')
      .replace(/Location/g, 'Terminal / Store Location')
      .replace(/Dim_Billing_Channel/g, 'Dim_Card_Issuer')
      .replace(/Dim_Payer/g, 'Dim_Card_Issuer')
      .replace(/Payer Key/g, 'Issuer Key (PK)')
      .replace(/Payer Name/g, 'Card Issuer / Bank')
      .replace(/Dim_Oncology_Product/g, 'Dim_Banking_Product')
      .replace(/Product Key/g, 'Product Key (PK)')
      .replace(/Therapy Area/g, 'Product Line (Credit/Debit/Mortgage)')
      .replace(/Fact_Oncology_Insights/g, 'Fact_Transaction_Insights')
      .replace(/Fact_Patient_Encounters/g, 'Fact_Account_Transactions')
      .replace(/Encounter ID/g, 'Transaction ID (PK)')
      .replace(/Diagnosis ID/g, 'Auth Code / ISO 8583 Msg')
      .replace(/Physician ID/g, 'Merchant Key (FK)')
      .replace(/Payer ID/g, 'Issuer Key (FK)')
      .replace(/Patient ID/g, 'Account Key (FK)')
      .replace(/Row-Level Security on Patient Data/g, 'Row-Level Security on Account Data (PCI-DSS &amp; Banking Compliance)');
  }

  const isHealthcareOrPharma = !isEcommerce && !isFintechPrompt && /\b(healthcare|patient|hospital|medical|pharma|oncology|clinical|biotech|drug discovery|clinical trial)\b/i.test(promptLower);

  // Universal Scrubber: Clean legacy ITACS/Oncology boilerplate out of templates for NON-healthcare/pharma diagrams
  if (!isHealthcareOrPharma && !isEcommerce && !isFintechPrompt) {
    updatedXml = updatedXml
      .replace(/Raw Scientific Literature &amp; PPT Decks/g, `${topic} Data Ingress &amp; Client Docs`)
      .replace(/Manual Data Sources Card/g, `${topic} Ingress Card`)
      .replace(/Market Research/g, 'Client Gateway')
      .replace(/Medical Affairs/g, 'Core Operations')
      .replace(/Market Access/g, 'Integration APIs')
      .replace(/Outcomes Research/g, 'Analytics &amp; Metrics')
      .replace(/Competitive Intelligence/g, 'Business Intelligence')
      .replace(/Researcher Node/g, 'User &amp; Operator Node')
      .replace(/Analyst Workspace Portal/g, `${topic} Application Portal`)
      .replace(/Asset Analysis &amp; Query Interface/g, 'Data Analysis &amp; Query Interface')
      .replace(/Genomic &amp; Clinical Correlation Engine/g, 'Core Business Data Engine')
      .replace(/PubMed PDF &amp; PPT Chunking Engine/g, 'Document &amp; Stream Processing Engine')
      .replace(/Oncology Scenario Planning/g, 'Scenario Planning &amp; Operations')
      .replace(/Oncology Analyst/g, 'Operations Analyst')
      .replace(/Oncology Trends/g, 'Performance Trends')
      .replace(/OUTMANEUVER COMPETITION/g, 'OPTIMIZE SYSTEM EFFICIENCY')
      .replace(/REACH PATIENTS FASTER/g, 'ACCELERATE TIME-TO-VALUE')
      .replace(/STRATEGIC PLANNING &amp; ANALYSIS/g, 'ENTERPRISE GOVERNANCE &amp; ANALYTICS')
      .replace(/Dim_Patient/g, 'Dim_Consignee_Shipper')
      .replace(/Patient Key/g, 'Consignee Key (PK)')
      .replace(/Patient ID/g, 'Consignee ID')
      .replace(/Patient Type/g, 'Freight Account Type')
      .replace(/Disease History/g, 'Shipment History')
      .replace(/Dim_Physician/g, 'Dim_Carrier_Vessel')
      .replace(/Physician Key/g, 'Vessel / Carrier Key (PK)')
      .replace(/Physician ID/g, 'Carrier ID')
      .replace(/Specialization/g, 'Fleet Type / IMO')
      .replace(/Dim_Payer/g, 'Dim_Customs_Broker')
      .replace(/Payer Key/g, 'Broker Key (PK)')
      .replace(/Payer ID/g, 'Broker ID')
      .replace(/Payer Name/g, 'Brokerage Firm')
      .replace(/Fact_Patient_Encounters/g, 'Fact_Shipment_Events')
      .replace(/Fact_Oncology_Insights/g, 'Fact_Logistics_Freight_Insights')
      .replace(/Fact_Competitive_Intel/g, 'Fact_Port_Berth_Operations')
      .replace(/Dim_Oncology_Product/g, 'Dim_Cargo_Container_Catalog')
      .replace(/Product Key/g, 'Container SKU Key (PK)')
      .replace(/Product ID/g, 'Container ID')
      .replace(/Product Name/g, 'Cargo Description')
      .replace(/Row-Level Security on Patient Data/g, 'Row-Level Security on Cargo Manifest Data')
      .replace(/\bPatient\b/gi, 'Consignee')
      .replace(/\bPhysician\b/gi, 'Carrier')
      .replace(/\bPayer\b/gi, 'Broker')
      .replace(/Oncology/gi, topic || 'Enterprise')
      .replace(/PubMed/gi, `${topic} API`)
      .replace(/ITACS/gi, topic || 'Enterprise');
  } else if (isHealthcareOrPharma) {
    // For Healthcare/Pharma prompts: preserve generic medical vocabulary, only clean ITACS brand boilerplate
    updatedXml = updatedXml
      .replace(/Dim_Customer_Entity/g, 'Dim_Patient')
      .replace(/Customer ID/g, 'Patient Key')
      .replace(/Entity Type/g, 'Patient Type')
      .replace(/Activity History/g, 'Medical History')
      .replace(/Dim_Provider_Service/g, 'Dim_Physician')
      .replace(/Provider ID/g, 'Physician Key')
      .replace(/Dim_Billing_Channel/g, 'Dim_Payer')
      .replace(/Fact_System_Transactions/g, 'Fact_Patient_Encounters')
      .replace(/ITACS Oncology Platform/g, `${topic} Platform`)
      .replace(/ITACS/gi, topic || 'Healthcare');
  }

  // Universal Dynamic Entity & Workflow Step Extractor
  // Parses explicit user prompt workflows ONLY if explicit sequence operators (->, =>, •, Step 1:) exist
  if (userPrompt && typeof userPrompt === 'string') {
    if (/(?:->|-->|=>|•|\bstep\s*\d+)/i.test(userPrompt)) {
      const sanitizeStep = (raw: string, fallback: string) => {
        if (!raw) return fallback;
        const clean = raw.replace(/<[^>]+>/g, '').replace(/^(?:Act as|Chief|Enterprise|Architect|Build|Create|Design|System details:|\d+[\.:\)]\s*)/gi, '').trim();
        if (!clean || clean.length < 3) return fallback;
        if (clean.length <= 26) return clean;
        const words = clean.split(/\s+/).filter(Boolean);
        const short = words.slice(0, 3).join(' ');
        return short.length <= 26 ? short : short.slice(0, 23) + '...';
      };

      const rawSteps = userPrompt
        .split(/(?:->|-->|=>|•|\n|;)/)
        .map(s => s.replace(/^(?:Act as|Chief|Enterprise|Architect|Build|Create|Design|System details:|\d+[\.:\)]\s*)/gi, '').trim())
        .filter(s => s.length > 3);

      if (rawSteps.length >= 2) {
        const step1 = sanitizeStep(rawSteps[0], 'Edge Ingress Gateway');
        const step2 = sanitizeStep(rawSteps[1], 'Event Stream Queue');
        const step3 = sanitizeStep(rawSteps[2], 'Real-Time Anomaly Engine');
        const step4 = sanitizeStep(rawSteps[3] || rawSteps[rawSteps.length - 1], 'Model Fine-Tuning Hub');

        updatedXml = updatedXml
          .replace(/External Multimodal Client Portal/g, step1)
          .replace(/Public Ingress Subnet/g, `${step1} Subnet`)
          .replace(/BA Safety Workbench/g, step2)
          .replace(/Managed PostgreSQL \/ pgvector/g, step3)
          .replace(/Ephemeral Prompt Cache Store/g, step4)
          .replace(/\[1\] Ingress \/ Client Portal/g, `[1] ${step1}`)
          .replace(/\[2\] Event Streaming Gateway/g, `[2] ${step2}`)
          .replace(/\[3\] AI Processing Cluster/g, `[3] ${step3}`)
          .replace(/\[4\] Deployment & Lifecycle Hub/g, `[4] ${step4}`);
      }
    }

    // Dynamic Purpose & Problem Statement card update
    if (useCaseTitle && !/^(Today|Yesterday|v\d+|Untitled|Design Canvas|Diagram)/i.test(useCaseTitle.trim())) {
      updatedXml = updatedXml
        .replace(/Purpose &amp; Problem Statement:[^<]*/g, `Purpose &amp; Problem Statement: ${useCaseTitle} — Automated Enterprise Architecture Topology`)
        .replace(/Purpose & Problem Statement:[^<]*/g, `Purpose &amp; Problem Statement: ${useCaseTitle} — Automated Enterprise Architecture Topology`);
    }

    // Dynamic Cloud Vendor Terminology Translation
    const promptLowerFull = userPrompt.toLowerCase();
    if (promptLowerFull.includes('azure')) {
      updatedXml = updatedXml
        .replace(/Google Cloud Platform \(GCP\)/g, 'Microsoft Azure Enterprise Cloud')
        .replace(/GCP/g, 'Azure')
        .replace(/Cloud Pub\/Sub/g, 'Azure Event Hubs &amp; IoT Hub')
        .replace(/Cloud KMS/g, 'Azure Key Vault')
        .replace(/Cloud Run/g, 'Azure Container Apps')
        .replace(/BigQuery/g, 'Azure Synapse Analytics')
        .replace(/Cloud Storage/g, 'Azure Blob Storage');
    } else if (promptLowerFull.includes('oracle') || promptLowerFull.includes('oci')) {
      updatedXml = updatedXml
        .replace(/Google Cloud Platform \(GCP\)/g, 'Oracle Cloud Infrastructure (OCI)')
        .replace(/GCP/g, 'OCI')
        .replace(/Cloud Pub\/Sub/g, 'OCI Streaming Service')
        .replace(/Cloud KMS/g, 'OCI Vault &amp; KMS')
        .replace(/Cloud Run/g, 'OCI Container Instances')
        .replace(/BigQuery/g, 'OCI Autonomous Database')
        .replace(/Cloud Storage/g, 'OCI Object Storage');
    } else if (promptLowerFull.includes('snowflake') || promptLowerFull.includes('databricks')) {
      updatedXml = updatedXml
        .replace(/Cloud Pub\/Sub/g, 'Databricks Event Stream / Kafka')
        .replace(/BigQuery/g, 'Snowflake Iceberg Lakehouse')
        .replace(/Cloud Storage/g, 'Databricks Unity Catalog Storage');
    }
  }

  return sanitizeDrawioXmlAttributes(updatedXml);
}

/**
 * 🏷️ Option 3: Vendor Icons View
 * Replaces generic/broken node icons with official high-definition SVG vendor brand logos (Databricks, GCP, AWS, Azure, K8s, etc.)
 */
export function createVendorIconsVariant(xmlInput: string): string {
  if (!xmlInput) return xmlInput;
  if (isPreservedCustomLayout(xmlInput)) return xmlInput;

  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    allowBooleanAttributes: true,
    parseTagValue: false,
    parseAttributeValue: false,
    maxNestedTags: 1000,
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

  const root = ast.mxfile.diagram.mxGraphModel.root;
  const cells: any[] = root.mxCell ? (Array.isArray(root.mxCell) ? root.mxCell : [root.mxCell]) : [];

  for (const cell of cells) {
    const cellId = String(cell['@_id'] || '');
    if (cellId === '0' || cellId === '1') continue;

    if (cell['@_edge'] === '1' || cell['@_edge'] === true) {
      if (cell['@_value']) {
        cell['@_value'] = formatEdgeLabelToMax2Lines(String(cell['@_value']));
      }
    } else if (cell['@_vertex'] === '1' || cell['@_vertex'] === true) {
      const rawValue = String(cell['@_value'] || '');
      const tooltip = String(cell['@_tooltip'] || '');

      const cleanText = rawValue.replace(/<img[^>]*>/gi, '').trim();

      cell['@_value'] = `<div style="display:flex;align-items:center;gap:10px;text-align:left;width:100%;box-sizing:border-box;"><div style="flex:1;min-width:0;word-break:break-word;line-height:1.25;">${cleanText}</div></div>`;

      let style = String(cell['@_style'] || '');
      const comboText = (rawValue + ' ' + tooltip).toLowerCase();

      if (comboText.includes('apigee') || comboText.includes('gateway') || comboText.includes('oauth') || comboText.includes('proxy') || comboText.includes('auth')) {
        style = `rhombus;whiteSpace=wrap;html=1;arcSize=10;fillColor=#FFE6CC;strokeColor=#D79B00;fontColor=#000000;strokeWidth=2;html=1;`;
      } else if (comboText.includes('database') || comboText.includes('data lake') || comboText.includes('bigquery') || comboText.includes('redshift') || comboText.includes('healthlake') || comboText.includes('sql') || comboText.includes('spanner')) {
        style = `shape=cylinder;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;fillColor=#D5E8D4;strokeColor=#82B366;fontColor=#000000;strokeWidth=2;html=1;`;
      } else if (comboText.includes('cluster') || comboText.includes('orchestrat') || comboText.includes('synthesis') || comboText.includes('trial') || comboText.includes('ops')) {
        style = `rounded=1;whiteSpace=wrap;html=1;arcSize=12;fillColor=#E1D5E7;strokeColor=#9673A6;fontColor=#000000;strokeWidth=2;html=1;`;
      } else {
        if (!style.includes('html=1')) {
          style += ';html=1;';
        }
      }
      cell['@_style'] = style;
    }
  }

  applyGenerousNodeLayout(cells, true);

  root.mxCell = cells;

  const builder = new XMLBuilder({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    format: true,
    indentBy: '  ',
    suppressEmptyNode: true,
  });

  const builtXml = builder.build(ast);
  return sanitizeDrawioXmlAttributes(builtXml);
}

export function sanitizeDrawioXmlAttributes(xml: string): string {
  if (!xml) return xml;
  
  // 1. Convert non-ASCII unicode characters/emojis into safe numeric HTML entities using unicode surrogate mode to prevent invalid XML entities (e.g. &#55357;) and atob Latin1 failures
  let cleaned = xml.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\x00-\x7F]/gu, (char) => {
    const code = char.codePointAt(0);
    return code ? `&#${code};` : '';
  });

  // Clean any legacy invalid surrogate numeric character entities (&#55296; to &#57343;)
  cleaned = cleaned.replace(/&#(?:5[5-6][0-9]{3}|57[0-2][0-9]{2}|573[0-3][0-9]|5734[0-3]);/g, '');

  // 2. Fix unescaped raw '<' and '&quot;' inside value attributes
  cleaned = cleaned.replace(/\bvalue="([\s\S]*?)"(?=\s+[a-zA-Z_:][a-zA-Z0-9_:-]*=|\s*\/?>)/g, (match, valContent) => {
    const sanitized = valContent
      // Convert &quot; and inner double quotes to single quotes to prevent breaking out of attribute
      .replace(/&quot;/g, "'")
      .replace(/"/g, "'")
      // Replace raw HTML tags inside value attribute: <b>, </b>, <br>, <i>, </i>, <span>, </span>, <table>, etc.
      .replace(/<(\/?[a-zA-Z0-9]+(?:\s+[^>]*)?)>/g, '&lt;$1&gt;')
      // Fix unescaped < followed by numbers like <50ms, <75%
      .replace(/<([0-9]+)/g, '&lt;$1')
      // Replace any other raw '<'
      .replace(/<(?![a-zA-Z0-9/])/g, '&lt;');
    return `value="${sanitized}"`;
  });

  // Ensure &amp; entities are valid
  cleaned = cleaned.replace(/&amp;amp;/g, '&amp;');

  // 3. XSS Sanitization: Neutralize <script>, javascript: pseudo-protocols, and inline DOM event attributes
  cleaned = cleaned
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript\s*:/gi, 'blocked_script:')
    .replace(/\son[a-zA-Z]+\s*=\s*(?:'[^']*'|"[^"]*"|[^\s>]+)/gi, '');

  return cleaned;
}
