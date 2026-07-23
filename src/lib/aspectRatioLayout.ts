/**
 * Aspect Ratio Auto-Layout Engine for PromptCanvas
 * Recalculates Draw.io mxGraph XML node geometry (x, y coordinates)
 * to fit targeted aspect ratios (16:9, 4:3, 1:1, 9:16, 21:9, or Custom W:H)
 * instantly on the client side without Gemini API calls.
 */

export interface AspectRatioOption {
  id: string;
  label: string;
  ratio: number; // Width / Height quotient
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
  
  if (ratioStr.includes(':')) {
    const [w, h] = ratioStr.split(':').map(Number);
    if (w && h && h > 0) return w / h;
  }
  return 16 / 9; // Default
}

interface ParsedNode {
  id: string;
  fullTag: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Re-layouts Draw.io mxGraph XML nodes to fit the specified aspect ratio bounds.
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

  // Match all <mxCell ... vertex="1" ...> elements
  const cellMatchRegex = /<mxCell\s+[^>]*vertex="1"[^>]*>[\s\S]*?<\/mxCell>/gi;
  const nodes: ParsedNode[] = [];

  let match: RegExpExecArray | null;
  while ((match = cellMatchRegex.exec(xmlContent)) !== null) {
    const fullTag = match[0];
    const idMatch = fullTag.match(/id="([^"]+)"/);
    const geomMatch = fullTag.match(/<mxGeometry\s+([^>]*)\/>/);

    if (idMatch && geomMatch) {
      const geomAttrs = geomMatch[1];
      const xMatch = geomAttrs.match(/x="([^"]+)"/);
      const yMatch = geomAttrs.match(/y="([^"]+)"/);
      const wMatch = geomAttrs.match(/width="([^"]+)"/);
      const hMatch = geomAttrs.match(/height="([^"]+)"/);

      nodes.push({
        id: idMatch[1],
        fullTag,
        x: xMatch ? parseFloat(xMatch[1]) : 100,
        y: yMatch ? parseFloat(yMatch[1]) : 100,
        width: wMatch ? parseFloat(wMatch[1]) : 200,
        height: hMatch ? parseFloat(hMatch[1]) : 70,
      });
    }
  }

  if (nodes.length === 0) return xmlContent;

  // Sort nodes vertically into logical tiers by Y coordinate
  nodes.sort((a, b) => a.y - b.y);

  // Group nodes into Y-tiers (nodes within 90px Y are considered same tier)
  const tiers: ParsedNode[][] = [];
  nodes.forEach(node => {
    let placed = false;
    for (const tier of tiers) {
      const avgY = tier.reduce((sum, n) => sum + n.y, 0) / tier.length;
      if (Math.abs(node.y - avgY) < 90) {
        tier.push(node);
        placed = true;
        break;
      }
    }
    if (!placed) {
      tiers.push([node]);
    }
  });

  // Calculate new grid coordinates based on Aspect Ratio Quotient (R)
  let updatedXml = xmlContent;

  if (R < 0.85) {
    // 📱 Vertical Mobile Flow (Single-Column Top-to-Bottom Stack)
    let currentY = 80;
    const centerX = 300;

    tiers.forEach(tier => {
      tier.forEach(node => {
        const newX = Math.max(50, centerX - node.width / 2);
        const newY = currentY;
        currentY += node.height + 60;

        updatedXml = replaceNodeCoordinates(updatedXml, node.id, newX, newY);
      });
    });
  } else if (R >= 1.6) {
    // 🖥️ Wide Horizontal Flow (16:9, 21:9, 16:10)
    let currentY = 100;
    const tierSpacingY = 160;

    tiers.forEach(tier => {
      const maxCols = R > 2.0 ? 5 : 4;
      const totalTierWidth = Math.min(tier.length, maxCols) * 260;
      const startX = Math.max(80, 650 - totalTierWidth / 2);

      tier.forEach((node, idx) => {
        const col = idx % maxCols;
        const row = Math.floor(idx / maxCols);

        const newX = startX + col * 260;
        const newY = currentY + row * 100;

        updatedXml = replaceNodeCoordinates(updatedXml, node.id, newX, newY);
      });

      const maxRowsInTier = Math.ceil(tier.length / maxCols);
      currentY += maxRowsInTier * 100 + tierSpacingY;
    });
  } else {
    // ⏹️ Balanced Matrix Grid (4:3, 1:1, 3:2, 5:4)
    let currentY = 100;
    const tierSpacingY = 140;

    tiers.forEach(tier => {
      const maxCols = R <= 1.0 ? 2 : 3;
      const totalTierWidth = Math.min(tier.length, maxCols) * 240;
      const startX = Math.max(80, 450 - totalTierWidth / 2);

      tier.forEach((node, idx) => {
        const col = idx % maxCols;
        const row = Math.floor(idx / maxCols);

        const newX = startX + col * 240;
        const newY = currentY + row * 110;

        updatedXml = replaceNodeCoordinates(updatedXml, node.id, newX, newY);
      });

      const maxRowsInTier = Math.ceil(tier.length / maxCols);
      currentY += maxRowsInTier * 110 + tierSpacingY;
    });
  }

  return updatedXml;
}

function replaceNodeCoordinates(xml: string, nodeId: string, newX: number, newY: number): string {
  const cellRegex = new RegExp(
    `(<mxCell\\s+[^>]*id="${escapeRegex(nodeId)}"[^>]*>[\\s\\S]*?<mxGeometry\\s+)([^>]*)(/>)`,
    'gi'
  );

  return xml.replace(cellRegex, (match, prefix, geomAttrs, suffix) => {
    let updatedAttrs = geomAttrs;
    if (/x="[^"]*"/.test(updatedAttrs)) {
      updatedAttrs = updatedAttrs.replace(/x="[^"]*"/, `x="${Math.round(newX)}"`);
    } else {
      updatedAttrs = `x="${Math.round(newX)}" ${updatedAttrs}`;
    }

    if (/y="[^"]*"/.test(updatedAttrs)) {
      updatedAttrs = updatedAttrs.replace(/y="[^"]*"/, `y="${Math.round(newY)}"`);
    } else {
      updatedAttrs = `y="${Math.round(newY)}" ${updatedAttrs}`;
    }

    return `${prefix}${updatedAttrs}${suffix}`;
  });
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
