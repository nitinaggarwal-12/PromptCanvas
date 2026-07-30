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
    lower.includes('conceptual_diagram') ||
    lower.includes('oncology data portal') ||
    lower.includes('itacs_conceptual') ||
    lower.includes('integrated insights hub') ||
    lower.includes('merck') ||
    lower.includes('keytruda') ||
    lower.includes('demand forecasting') ||
    lower.includes('dim_patient') ||
    lower.includes('sub-schema') ||
    lower.includes('etl_system_data_sources') ||
    lower.includes('agentic_rag') ||
    lower.includes('cognitive architecture') ||
    lower.includes('react loop') ||
    lower.includes('sequence_diagram') ||
    lower.includes('macro sequence') ||
    xml.includes('itacs_conceptual_compiled')
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
      const cleanImgTag = `<img src="${vendorIconUrl}" width="26" height="26" style="float:left;margin-right:8px;vertical-align:middle;"/>`;
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
  if (!text) return 'https://cdn.simpleicons.org/googlecloud/4285F4';
  const lower = text.toLowerCase();

  // SAP & ERP Systems
  if (lower.includes('sap ') || lower.includes(' s/4hana') || /\berp\b/.test(lower)) return 'https://api.iconify.design/logos:sap.svg';

  // Pharma & Clinical Systems (Veeva, Salesforce)
  if (lower.includes('veeva') || lower.includes('salesforce') || lower.includes('etmf')) return 'https://api.iconify.design/logos:salesforce.svg';

  // Identity & Security (Ping Identity, Okta, Auth0, OAuth)
  if (lower.includes('ping') || lower.includes('okta') || lower.includes('oauth') || lower.includes('auth0') || lower.includes('anonymization')) return 'https://api.iconify.design/logos:okta.svg';

  // Healthcare & Regulatory (FDA, HealthLake, Clinical)
  if (lower.includes('fda') || lower.includes('health') || lower.includes('gxp') || lower.includes('clinical') || lower.includes('esg')) return 'https://api.iconify.design/logos:redhat.svg';

  // Databricks Ecosystem
  if (lower.includes('databricks') || lower.includes('dlt') || lower.includes('delta live') || lower.includes('auto loader') || lower.includes('unity catalog') || lower.includes('mosaic')) {
    return 'https://api.iconify.design/logos:databricks.svg';
  }
  if (lower.includes('delta lake') || lower.includes('bronze') || lower.includes('silver') || lower.includes('gold') || lower.includes('spark') || lower.includes('pyspark')) {
    return 'https://api.iconify.design/logos:apache-spark.svg';
  }

  // Google Cloud Platform (GCP)
  if (lower.includes('cloud run')) return 'https://api.iconify.design/logos:google-cloud.svg';
  if (lower.includes('bigquery')) return 'https://api.iconify.design/logos:google-cloud.svg';
  if (lower.includes('vertex') || lower.includes('gemini') || lower.includes('gcp')) return 'https://api.iconify.design/logos:google-cloud.svg';
  if (lower.includes('gcs') || lower.includes('cloud storage') || lower.includes('object storage')) return 'https://api.iconify.design/logos:google-cloud.svg';
  if (lower.includes('apigee') || lower.includes('api gateway')) return 'https://api.iconify.design/logos:google-cloud.svg';

  // Amazon Web Services (AWS)
  if (lower.includes('lambda')) return 'https://api.iconify.design/logos:aws-lambda.svg';
  if (lower.includes('s3') || lower.includes('aws s3')) return 'https://api.iconify.design/logos:aws-s3.svg';
  if (lower.includes('dynamodb')) return 'https://api.iconify.design/logos:aws-dynamodb.svg';
  if (lower.includes('rds') || lower.includes('aurora') || lower.includes('redshift') || lower.includes('healthlake')) return 'https://api.iconify.design/logos:aws.svg';
  if (lower.includes('ec2') || lower.includes('ecs') || lower.includes('eks') || lower.includes('aws') || lower.includes('amazon')) return 'https://api.iconify.design/logos:aws.svg';

  // Microsoft Azure & Fabric
  if (lower.includes('fabric') || lower.includes('power bi')) return 'https://api.iconify.design/logos:microsoft-power-bi.svg';
  if (lower.includes('azure') || lower.includes('event hub') || lower.includes('apim')) return 'https://api.iconify.design/logos:microsoft-azure.svg';

  // Enterprise SaaS & Operations
  if (lower.includes('servicenow')) return 'https://api.iconify.design/logos:servicenow.svg';
  if (lower.includes('workday')) return 'https://api.iconify.design/logos:workday.svg';

  // Common Tech Stack & Frameworks
  if (lower.includes('kafka') || lower.includes('event stream')) return 'https://api.iconify.design/logos:kafka-icon.svg';
  if (lower.includes('kubernetes') || lower.includes('k8s')) return 'https://api.iconify.design/logos:kubernetes.svg';
  if (lower.includes('snowflake')) return 'https://api.iconify.design/logos:snowflake.svg';
  if (lower.includes('postgresql') || lower.includes('postgres')) return 'https://api.iconify.design/logos:postgresql.svg';
  if (lower.includes('mysql')) return 'https://api.iconify.design/logos:mysql.svg';
  if (lower.includes('redis')) return 'https://api.iconify.design/logos:redis.svg';
  if (lower.includes('grafana')) return 'https://api.iconify.design/logos:grafana.svg';
  if (lower.includes('python')) return 'https://api.iconify.design/logos:python.svg';
  if (lower.includes('docker')) return 'https://api.iconify.design/logos:docker.svg';

  // Genomic & Bioinformatics Systems
  if (lower.includes('illumina') || lower.includes('fastq') || lower.includes('gatk') || lower.includes('bwa') || lower.includes('genomic') || lower.includes('dna') || lower.includes('rna') || lower.includes('bioinformatics')) return 'https://api.iconify.design/logos:google-cloud.svg';

  // CI/CD & DevOps Tools
  if (lower.includes('argo')) return 'https://api.iconify.design/logos:argo.svg';
  if (lower.includes('trivy') || lower.includes('sonar') || lower.includes('snyk')) return 'https://api.iconify.design/logos:sonarqube.svg';

  return 'https://api.iconify.design/logos:google-cloud.svg'; // Fallback
}

export function restoreDetailedView(xmlInput: string, skipLayout: boolean = false): string {
  if (!xmlInput) return xmlInput;
  if (isPreservedCustomLayout(xmlInput)) return xmlInput;

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

      // Repair broken or missing image tags with official SVG vendor icons
      const vendorIconUrl = resolveVendorIconUrl(rawValue + ' ' + tooltip);
      const newImgTag = `<img src="${vendorIconUrl}" width="26" height="26" style="float:left;margin-right:8px;vertical-align:middle;"/>`;

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
  if (!topic || topic === 'Architecture' || topic === 'Clean Architecture Workspace' || topic.length > 35 || topic.toLowerCase().includes('act as')) {
    const rawText = userPrompt || topic;
    const cleanPrompt = rawText
      .replace(/act as|chief|enterprise|architect|and|pharma|technology|lead|at|we|are|building|a|generative|ai|platform|to|automate|scientific|literature|mining|accelerate|therapeutic|target|discovery|for|non-small|cell|lung|cancer|design|build|create|system|architecture|diagram/gi, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    const words = cleanPrompt.split(' ').filter(w => w.length > 2).slice(0, 4);
    topic = words.length > 0 
      ? words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ')
      : 'Enterprise Platform';
  }

  const topicUpper = topic.toUpperCase();

  let updatedXml = xml;

  // 1. Replace generic titles and headers
  updatedXml = updatedXml
    .replace(/ITACS SECURE GOVERNED CLOUD TENANT/g, `${topicUpper} SECURE GOVERNED CLOUD TENANT`)
    .replace(/ITACS Integrated Insights Platform/g, `${topic} Platform`)
    .replace(/AWS Modern Data Lakehouse Architecture/g, `${topic} - AWS Data Lakehouse Architecture`)
    .replace(/GCP Serverless Web Application Architecture/g, `${topic} - GCP Serverless Architecture`)
    .replace(/AWS EKS Microservices Service Mesh Architecture/g, `${topic} - EKS Microservices Mesh`)
    .replace(/GCP Real-Time Streaming Analytics Pipeline/g, `${topic} - Streaming Analytics Pipeline`)
    .replace(/Combining Data Flow \(DFD\), MLOps Lifecycle, and Feature Engineering/g, `${topic} - Data &amp; AI Pipeline`)
    .replace(/Google Cloud Project \(ITACS Platform Production\)/g, `${topic} Production Cloud Architecture`)
    .replace(/AWS Serverless Event-Driven Microservices/g, `${topic} - Event-Driven Microservices`)
    .replace(/GCP Multi-Region Active-Passive Disaster Recovery/g, `${topic} - Multi-Region DR Topology`)
    .replace(/GCP AI Cognitive Architecture \(Retrieval-Augmented Generation \/ RAG\)/g, `${topic} - AI Agentic RAG Architecture`)
    .replace(/AWS Zero-Trust Secure VPC Network Infrastructure/g, `${topic} - Zero-Trust Secure VPC Network`)
    .replace(/GCP Industrial IoT Telemetry Ingestion &amp; Analytics/g, `${topic} - Industrial IoT Ingestion &amp; Analytics`)
    .replace(/Enterprise DevSecOps Polyrepo CI\/CD Pipeline Architecture/g, `${topic} - DevSecOps Polyrepo CI/CD Pipeline`)
    .replace(/UNIFIED GOVERNANCE &amp; STATE-MACHINE LIFECYCLE/g, `${topicUpper} UNIFIED GOVERNANCE &amp; STATE-MACHINE LIFECYCLE`)
    .replace(/TOTAL UNIFIED SYSTEM VIEW: Data, Cognition, Deployment, &amp; Governance/g, `${topicUpper} TOTAL UNIFIED SYSTEM VIEW`)
    .replace(/COMPLETE END-TO-END DYNAMIC SEQUENCE DIAGRAM/g, `${topicUpper} COMPLETE END-TO-END DYNAMIC SEQUENCE DIAGRAM`)
    .replace(/ITACS Governing Cloud Tenant/g, `${topicUpper} Governing Cloud Tenant`)
    .replace(/ITACS Primary VPC Network/g, `${topicUpper} Primary VPC Network`)
    .replace(/ITACS Agent Orchestrator/g, `${topic} Agent Orchestrator`)
    .replace(/ITACS Oncology Platform/g, `${topic} Platform`)
    .replace(/Core ITACS Synthesis Engine/g, `Core AI Synthesis Engine`)
    .replace(/ITACS Integrated Insights Platform/g, `${topic} Integrated Insights Platform`)
    .replace(/ITACS SECURE MANAGED/g, `${topicUpper} SECURE MANAGED`)
    .replace(/ITACS Target/g, `${topic} Target`)
    .replace(/\bITACS\b/g, topic || 'GenAI');

  // 2. Adapt technical nodes if generic
  const promptLower = (userPrompt || topic || '').toLowerCase();
  const isGenomicPrompt = promptLower.includes('genomic') || promptLower.includes('fastq') || promptLower.includes('variant') || promptLower.includes('gatk') || promptLower.includes('dna') || promptLower.includes('bwa');
  const isLiteratureMiningPrompt = promptLower.includes('literature') || promptLower.includes('patent') || promptLower.includes('clinical trial') || promptLower.includes('nsclc') || promptLower.includes('target discovery') || promptLower.includes('langchain') || promptLower.includes('bioinformatician');

  const isEarlyDiscoveryPrompt = promptLower.includes('discovery') || promptLower.includes('aiddison') || promptLower.includes('notebook') || promptLower.includes('biologist') || promptLower.includes('hypothesis');

  if (isEarlyDiscoveryPrompt) {
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
      .replace(/Gemini 1\.5 Pro/g, 'Gemini 2.5 Pro')
      .replace(/Vertex AI Search and Conversation/g, 'Vertex AI Agent Builder &amp; Search')
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
      .replace(/Sends single Oncology prompt:[\s\S]*?recent sales figures'/gi, "Sends biological target prompt:<br><span style='font-size:10px;font-weight:normal;'>'Define NSCLC hypothesis &amp; explore target dossiers'</span>")
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
      .replace(/pushes to interface/g, 'Deploy reusable Agent Designer literature monitoring agent');
  }

  // Conceptual Diagram Specific Replacements
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
      .replace(/\[8\]\s*Cloud Storage[^<]*/gi, '[8] Fine-Tuned Medical LLM (Gemini 2.5 Pro / Flash)')
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

  return updatedXml;
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
      if (cell['@_value']) {
        cell['@_value'] = formatEdgeLabelToMax2Lines(String(cell['@_value']));
      }
    } else if (cell['@_vertex'] === '1' || cell['@_vertex'] === true) {
      let rawValue = String(cell['@_value'] || '');
      const tooltip = String(cell['@_tooltip'] || '');

      const vendorIconUrl = resolveVendorIconUrl(rawValue + ' ' + tooltip);
      const vendorImgTag = `<img src="${vendorIconUrl}" width="30" height="30" style="float:left;margin-right:10px;vertical-align:middle;"/>`;

      // Extract clean text title
      let cleanText = rawValue.replace(/<img[^>]*>/gi, '').trim();

      cell['@_value'] = `${vendorImgTag}<div style="display:inline-block;vertical-align:middle;">${cleanText}</div>`;

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

  return builder.build(ast);
}
