/**
 * Dynamic Zone Layout Solver & Elastic Viewport Engine
 * Resolves component placement, pod-grid partitioning, and elastic canvas expansions.
 */

export interface ZoneGeometry {
  id: string;
  title: string;
  subnet: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface NodePlacement {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  column: number;
  row: number;
}

export interface ZoneLayoutSolution {
  zoneGeometry: ZoneGeometry;
  placements: NodePlacement[];
  strategy: 'VERTICAL_STACK' | 'POD_GRID_2COL' | 'ELASTIC_EXPANSION';
  deltaHeightApplied: number;
}

/**
 * Solves optimal layout for N components inside a target zone bounding box.
 */
export function solveZoneLayout(
  zone: ZoneGeometry,
  componentIds: string[],
  minCardHeight = 62,
  gapY = 10,
  gapX = 12,
  paddingX = 14,
  paddingTop = 40,
  paddingBottom = 14
): ZoneLayoutSolution {
  const count = componentIds.length;
  if (count === 0) {
    return {
      zoneGeometry: { ...zone },
      placements: [],
      strategy: 'VERTICAL_STACK',
      deltaHeightApplied: 0
    };
  }

  const availableHeight = zone.height - paddingTop - paddingBottom;
  const availableWidth = zone.width - 2 * paddingX;

  // Case 1: Standard 1-Column Vertical Stack (N <= 4)
  if (count <= 4) {
    const totalGaps = (count - 1) * gapY;
    const cardHeight = Math.max(minCardHeight, Math.floor((availableHeight - totalGaps) / count));
    const cardWidth = availableWidth;

    const placements: NodePlacement[] = componentIds.map((id, idx) => ({
      id,
      x: zone.x + paddingX,
      y: zone.y + paddingTop + idx * (cardHeight + gapY),
      width: cardWidth,
      height: cardHeight,
      column: 0,
      row: idx
    }));

    return {
      zoneGeometry: { ...zone },
      placements,
      strategy: 'VERTICAL_STACK',
      deltaHeightApplied: 0
    };
  }

  // Case 2: 2-Column Pod Grid (5 <= N <= 6)
  if (count <= 6) {
    const cols = 2;
    const rows = Math.ceil(count / cols);
    const cardWidth = Math.floor((availableWidth - gapX) / cols);
    const totalGapsY = (rows - 1) * gapY;
    const cardHeight = Math.max(minCardHeight, Math.floor((availableHeight - totalGapsY) / rows));

    const placements: NodePlacement[] = componentIds.map((id, idx) => {
      const col = idx % cols;
      const row = Math.floor(idx / cols);
      return {
        id,
        x: zone.x + paddingX + col * (cardWidth + gapX),
        y: zone.y + paddingTop + row * (cardHeight + gapY),
        width: cardWidth,
        height: cardHeight,
        column: col,
        row
      };
    });

    return {
      zoneGeometry: { ...zone },
      placements,
      strategy: 'POD_GRID_2COL',
      deltaHeightApplied: 0
    };
  }

  // Case 3: Elastic Expansion (N >= 7)
  const cols = 2;
  const rows = Math.ceil(count / cols);
  const cardWidth = Math.floor((availableWidth - gapX) / cols);
  const cardHeight = 72; // Standard fixed height for high-density cards
  const requiredHeight = paddingTop + paddingBottom + rows * cardHeight + (rows - 1) * gapY;
  const deltaHeight = Math.max(0, requiredHeight - zone.height);

  const updatedZone: ZoneGeometry = {
    ...zone,
    height: zone.height + deltaHeight
  };

  const placements: NodePlacement[] = componentIds.map((id, idx) => {
    const col = idx % cols;
    const row = Math.floor(idx / cols);
    return {
      id,
      x: zone.x + paddingX + col * (cardWidth + gapX),
      y: zone.y + paddingTop + row * (cardHeight + gapY),
      width: cardWidth,
      height: cardHeight,
      column: col,
      row
    };
  });

  return {
    zoneGeometry: updatedZone,
    placements,
    strategy: 'ELASTIC_EXPANSION',
    deltaHeightApplied: deltaHeight
  };
}
