/**
 * 🛡️ Container Fill Factor & Dead Space Budget Audit Engine
 * Programmatically detects unutilized vertical voids (> 36px) at the bottom of parent containers.
 */

export interface ContainerVoidReport {
  containerId: string;
  containerBounds: { x: number; y: number; w: number; h: number };
  childrenCount: number;
  maxChildBottom: number;
  bottomVoidPx: number;
  bottomVoidPercent: number;
  isExcessiveVoid: boolean;
}

export function auditContainerFillFactors(xml: string, maxAllowedBottomVoidPx = 36): ContainerVoidReport[] {
  const reports: ContainerVoidReport[] = [];

  const cellRegex = /<mxCell[^>]*id="([^"]+)"[^>]*vertex="1"[^>]*>[\s\S]*?<mxGeometry[^>]*x="(-?[\d.]+)"[^>]*y="(-?[\d.]+)"[^>]*width="([\d.]+)"[^>]*height="([\d.]+)"[^>]*as="geometry"/g;
  
  interface Node {
    id: string;
    x: number;
    y: number;
    w: number;
    h: number;
  }

  const nodes: Node[] = [];
  let match;

  while ((match = cellRegex.exec(xml)) !== null) {
    nodes.push({
      id: match[1],
      x: parseFloat(match[2]),
      y: parseFloat(match[3]),
      w: parseFloat(match[4]),
      h: parseFloat(match[5])
    });
  }

  nodes.forEach(parent => {
    // Ignore small pills, cards, labels, or the whole canvas
    if (parent.w < 180 || parent.h < 120 || (parent.w >= 1500 && parent.h >= 900)) return;

    const children = nodes.filter(child => 
      child.id !== parent.id &&
      child.x >= parent.x - 5 &&
      child.y >= parent.y - 5 &&
      (child.x + child.w) <= (parent.x + parent.w + 5) &&
      (child.y + child.h) <= (parent.y + parent.h + 20)
    );

    if (children.length >= 2) {
      let maxChildBottom = 0;
      children.forEach(c => {
        const bottom = c.y + c.h;
        if (bottom > maxChildBottom) {
          maxChildBottom = bottom;
        }
      });

      const parentBottom = parent.y + parent.h;
      const bottomVoidPx = parentBottom - maxChildBottom;
      const bottomVoidPercent = Math.round((bottomVoidPx / parent.h) * 100);

      reports.push({
        containerId: parent.id,
        containerBounds: { x: parent.x, y: parent.y, w: parent.w, h: parent.h },
        childrenCount: children.length,
        maxChildBottom,
        bottomVoidPx,
        bottomVoidPercent,
        isExcessiveVoid: bottomVoidPx > maxAllowedBottomVoidPx
      });
    }
  });

  return reports;
}
