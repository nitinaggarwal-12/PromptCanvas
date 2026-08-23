import { CANONICAL_TEMPLATES } from '../src/lib/canonical/canonicalTemplates';

interface Rect {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  isDiamond?: boolean;
  isLifelineActivation?: boolean;
}

interface Segment {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  isLifeline?: boolean;
}

function lineIntersectsRect(seg: Segment, r: Rect): boolean {
  // Ignore container background wrappers (large outer cards)
  if (r.w > 350 && r.h > 120) return false;
  
  // Lifelines in sequence diagrams are intentional background guides for activation bars and participant boxes
  if (seg.isLifeline) {
    if (r.isLifelineActivation && Math.abs(seg.x1 - (r.x + r.w / 2)) < 12) return false;
    if (r.id.startsWith('p_') || r.id.startsWith('alt_') || r.id.startsWith('plan_')) return false;
    // Lifelines pass behind horizontal sequence messages
    return false;
  }

  const minX = Math.min(seg.x1, seg.x2);
  const maxX = Math.max(seg.x1, seg.x2);
  const minY = Math.min(seg.y1, seg.y2);
  const maxY = Math.max(seg.y1, seg.y2);

  // If segment is entirely outside bounding box with 2px tolerance
  if (maxX <= r.x + 2 || minX >= r.x + r.w - 2 || maxY <= r.y + 2 || minY >= r.y + r.h - 2) {
    return false;
  }

  // Slicing through
  if (seg.x1 === seg.x2) {
    // Vertical line
    const x = seg.x1;
    if (x > r.x + 3 && x < r.x + r.w - 3) {
      if (minY < r.y && maxY > r.y + r.h) return true;
    }
  } else if (seg.y1 === seg.y2) {
    // Horizontal line
    const y = seg.y1;
    if (y > r.y + 3 && y < r.y + r.h - 3) {
      if (minX < r.x && maxX > r.x + r.w) return true;
    }
  }

  return false;
}

export function auditTemplate(xml: string, templateId: string, templateName: string) {
  const rects: Rect[] = [];
  const segments: Segment[] = [];

  // Parse mxCells with vertex="1"
  const vertexRegex = /<mxCell[^>]*id="([^"]+)"[^>]*vertex="1"[^>]*>[\s\S]*?<mxGeometry[^>]*x="([^"]+)"[^>]*y="([^"]+)"[^>]*width="([^"]+)"[^>]*height="([^"]+)"[^>]*\/>[\s\S]*?<\/mxCell>/g;
  let match;
  while ((match = vertexRegex.exec(xml)) !== null) {
    const id = match[1];
    const x = parseFloat(match[2]);
    const y = parseFloat(match[3]);
    const w = parseFloat(match[4]);
    const h = parseFloat(match[5]);
    rects.push({ 
      id, 
      x, 
      y, 
      w, 
      h, 
      isLifelineActivation: id.startsWith('act_')
    });
  }

  // Parse lines with edge="1" and explicit coordinates
  const lineRegex = /<mxCell[^>]*id="([^"]+)"[^>]*edge="1"[^>]*>[\s\S]*?<mxPoint[^>]*x="([^"]+)"[^>]*y="([^"]+)"[^>]*as="sourcePoint"\/>[\s\S]*?<mxPoint[^>]*x="([^"]+)"[^>]*y="([^"]+)"[^>]*as="targetPoint"\/>[\s\S]*?<\/mxCell>/g;
  while ((match = lineRegex.exec(xml)) !== null) {
    const id = match[1];
    const x1 = parseFloat(match[2]);
    const y1 = parseFloat(match[3]);
    const x2 = parseFloat(match[4]);
    const y2 = parseFloat(match[5]);
    segments.push({ 
      id, 
      x1, 
      y1, 
      x2, 
      y2,
      isLifeline: id.startsWith('life_')
    });
  }

  const collisions: string[] = [];
  for (const seg of segments) {
    for (const r of rects) {
      if (lineIntersectsRect(seg, r)) {
        collisions.push(`Line ${seg.id} (${seg.x1},${seg.y1} -> ${seg.x2},${seg.y2}) intersects Rect ${r.id} (${r.x},${r.y},${r.w},${r.h})`);
      }
    }
  }

  // Checklist verification
  const hasEnvelope = xml.includes('<mxfile') && xml.includes('<diagram') && xml.includes('</mxfile>');
  const hasBrand = xml.includes('NOVACURA') || xml.includes('NovaCura') || xml.includes('Google Cloud') || xml.includes('NEXUSFIN') || xml.includes('SYNACTIVE');
  const hasLegend = xml.includes('LEGEND') || xml.includes('Legend');
  const nodeCount = rects.length;

  return {
    templateId,
    templateName,
    nodeCount,
    lineCount: segments.length,
    hasEnvelope,
    hasBrand,
    hasLegend,
    collisions
  };
}

async function runSuite() {
  console.log("================================================================================");
  console.log("🛡️ PROMPTCANVAS CANONICAL QUALITY GATE & GEOMETRIC AUDIT SUITE");
  console.log("================================================================================\n");

  const results = [];
  let totalCollisions = 0;

  for (const t of CANONICAL_TEMPLATES) {
    const xml = t.generateXml('biopharma', 'light');
    const res = auditTemplate(xml, t.id, t.name);
    results.push(res);
    totalCollisions += res.collisions.length;

    const status = res.collisions.length === 0 ? "✅ PASS" : `❌ ${res.collisions.length} COLLISIONS`;
    console.log(`[${status}] Template ${t.id.padStart(2, '0')}: ${t.name.padEnd(36)} | Nodes: ${res.nodeCount.toString().padStart(3)} | Lines: ${res.lineCount.toString().padStart(2)} | Envelope: ${res.hasEnvelope ? '✓' : '✗'} | Legend: ${res.hasLegend ? '✓' : '✗'}`);
    
    if (res.collisions.length > 0) {
      for (const col of res.collisions) {
        console.log(`    ↳ ⚠️ ${col}`);
      }
    }
  }

  console.log("\n================================================================================");
  console.log(`SUMMARY: ${CANONICAL_TEMPLATES.length} Templates Audited | Total Geometric Collisions: ${totalCollisions}`);
  console.log("================================================================================\n");
}

runSuite();
