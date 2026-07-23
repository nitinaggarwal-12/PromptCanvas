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

  return formatted;
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
    style += `;fontColor=#38BDF8;fontStyle=1;labelBackgroundColor=none;fontSize=11;whiteSpace=wrap;align=center;verticalAlign=middle;html=1;`;

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
        // Route through Open Inter-Row Channel Gap (exit bottom into open row gap, travel horizontally, enter top of target)
        let gapY = Math.round(srcPos.y + nodeHeight + (tgtPos.y - (srcPos.y + nodeHeight)) / 2);
        if (isSameTier || Math.abs(srcPos.y - tgtPos.y) < 20) {
          gapY = srcPos.y + nodeHeight + 35; // Place in open channel below row if in same tier
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
  if (lower.includes('sap') || lower.includes('s/4hana') || lower.includes('erp')) return 'https://api.iconify.design/logos:sap.svg';

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

  return 'https://api.iconify.design/logos:google-cloud.svg'; // Fallback
}

export function restoreDetailedView(xmlInput: string, skipLayout: boolean = false): string {
  if (!xmlInput) return xmlInput;

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
      style += ';labelBackgroundColor=none;fontColor=#38BDF8;fontStyle=1;fontSize=11;';
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
 * 🏷️ Option 3: Vendor Icons View
 * Replaces generic/broken node icons with official high-definition SVG vendor brand logos (Databricks, GCP, AWS, Azure, K8s, etc.)
 */
export function createVendorIconsVariant(xmlInput: string): string {
  if (!xmlInput) return xmlInput;

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
