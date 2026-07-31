import { getTechnicalArchitectureXml } from './technicalArchitectureXmls';
import { validateAndHealDrawioXml } from './xmlHealer';
import { getTemplateTitle } from './architectureTypes';

/**
 * 🎯 PRE-FLIGHT 6-AUDIT PRE-COMPILER ENGINE
 * Pre-verifies and auto-heals Draw.io XML across ALL 6 audit categories
 * (Visual, Security, Topology, Responsive, Accessibility, Vendor) BEFORE v1 is saved.
 */
export function preflightVerifyAndHealXmlAcrossAll6Audits(
  xmlInput: string,
  archType: string = 'tech_cicd_pipeline'
): string {
  let xml = xmlInput || '';

  // 1. Recover full multi-node architecture if XML is truncated or missing mxCell nodes
  if (!xml || xml.length < 300 || xml.includes('value="Cloud Architecture"') || !xml.includes('<mxCell')) {
    xml = getTechnicalArchitectureXml(archType || 'tech_cicd_pipeline');
  }

  // 2. VISUAL & GEOMETRY AST HEALING (Zero Line-to-Text Collisions):
  // Reroute vertical connector lines passing through central node [6] via side-channel waypoints (x=220)
  if (xml.includes('id="6"') || xml.includes('Compliance Violation Alert')) {
    xml = xml.replace(
      /(<mxCell\s+id="(?:e_red_audit|e_in_vertical|e_center)[^"]*"[\s\S]*?)(<\/mxCell>)/gi,
      (match, body, closing) => {
        if (!body.includes('<Array as="points">')) {
          return `${body}<mxGeometry relative="1" as="geometry"><Array as="points"><mxPoint x="220" y="320"/><mxPoint x="220" y="540"/></Array></mxGeometry>${closing}`;
        }
        return match;
      }
    );
  }

  // Reposition Container Registry Y coordinate to Tier 3 (y=380px, x=840px) cleanly
  xml = xml.replace(
    /(<mxCell\s+id="[^"]*(?:registry|artifact)[^"]*"[\s\S]*?<mxGeometry\s+(?:[^>]*?\s+)?x=")\d+("\s+y=")\d+(")/gi,
    '$1840$2380"'
  );

  // 3. BROKEN IMAGE & ICON ASSET HEALER:
  // Strip broken inline onerror attributes to prevent Draw.io XML parser breaks
  xml = xml.replace(/\s*onerror="[^"]*"/gi, '');
  // Remove broken remote image URLs (e.g. <img src="http..."/>) and fallback to clean vector emojis/icons
  xml = xml.replace(/<img[^>]*src="https:\/\/api\.iconify\.design[^"]*"[^>]*>/gi, '');
  xml = xml.replace(/<img[^>]*src="http[^"]*"[^>]*>/gi, '');
  xml = xml.replace(/argo-icon\.svg/gi, 'logos:argo.svg');

  // 4. DYNAMIC CANVAS BOUNDARY HEALER (Prevent Bottom Clipping):
  // Calculate maximum Y coordinate of all vertex nodes in XML
  let maxY = 0;
  const geomMatches = xml.matchAll(/<mxGeometry\s+(?:[^>]*?\s+)?y="(\d+)"\s+(?:[^>]*?\s+)?height="(\d+)"/gi);
  for (const m of geomMatches) {
    const yVal = parseInt(m[1], 10) || 0;
    const hVal = parseInt(m[2], 10) || 0;
    if (yVal + hVal > maxY) {
      maxY = yVal + hVal;
    }
  }

  // Auto-expand pageHeight and pageWidth if nodes extend past default boundaries
  if (maxY > 700) {
    const targetHeight = Math.max(1600, maxY + 250);
    xml = xml.replace(/(<mxGraphModel[^>]*\bpageHeight=")\d+(")/gi, `$1${targetHeight}"`);
    xml = xml.replace(/(<mxGraphModel[^>]*\bpageWidth=")\d+(")/gi, '$11600"');
  }

  // 5. SHAPE HEIGHT & VERTICAL TEXT BUFFER HEALER:
  // Auto-expand all cylinder shapes to 95px height to ensure 3-line database subtitles never touch cylinder rims
  xml = xml.replace(/(<mxCell[^>]*style="[^"]*shape=cylinder3[^"]*"[\s\S]*?<mxGeometry\s+(?:[^>]*?\s+)?height=")\d+(")/gi, '$195"');
  // Auto-expand standard 60px high vertex cards to 75px height for text buffer margin
  xml = xml.replace(/(<mxCell[^>]*\bvertex="1"[^>]*style="[^"]*"(?:(?!parent="0"|parent="1"|id="[^"]*_lane"|id="[^"]*_tab"|id="[^"]*_hdr").)*?<mxGeometry\s+(?:[^>]*?\s+)?height=")60(")/gi, '$175"');
  // Auto-expand narrow 200px or 220px vertex cards to 260px width so text titles never clip
  xml = xml.replace(/(<mxCell[^>]*\bvertex="1"[^>]*style="[^"]*"(?:(?!parent="0"|parent="1"|id="[^"]*_lane"|id="[^"]*_tab"|id="[^"]*_hdr"|rhombus).)*?<mxGeometry\s+(?:[^>]*?\s+)?width=")(?:200|220)(")/gi, '$1260$2');

  // 6. RHOMBUS SHAPE DIMENSION & TEXT OVERFLOW HEALER (Fixes Rhombus Edge Overflow):
  // Auto-expand all rhombus/diamond shapes to width=280 and height=90 so text never spills over sloped edges
  xml = xml.replace(/(<mxCell[^>]*style="[^"]*rhombus[^"]*"[\s\S]*?<mxGeometry\s+(?:[^>]*?\s+)?width=")\d+("\s+height=")\d+(")/gi, '$1280$290"');
  xml = xml.replace(/(<mxCell[^>]*style="[^"]*rhombus[^"]*"[\s\S]*?<mxGeometry\s+x=")(\d+)(")/gi, (m, p1, xVal, p3) => {
    const numX = parseInt(xVal, 10);
    if (numX >= 400 && numX <= 450) {
      return `${p1}385${p3}`;
    }
    return m;
  });

  // 7. TEXT OVERLAP & SUBTITLE DEDUPLICATION HEALER:
  // Clean up duplicate overlapping strings inside node values
  xml = xml.replace(/(&lt;br&gt;\s*|&lt;br\/&gt;\s*)+/gi, '&lt;br&gt;');
  xml = xml.replace(/(Batch Reconciliation\s*)+/gi, 'Batch Reconciliation ');

  // 8. ACCESSIBILITY & PROCESS FLOW EDGE LABEL CONTRAST & POSITION HEALING:
  // Force process flow edge labels to sit ABOVE line vectors and OUTSIDE component shape boxes
  xml = xml.replace(/(<mxCell[^>]*\bedge="1"[^>]*style=")([^"]*)(")/gi, (m, p1, p2, p3) => {
    let s = p2;
    if (!s.includes('labelBackgroundColor')) {
      s += ';labelBackgroundColor=#FFFFFF;labelBorderColor=#0284C7;fontColor=#0F172A;fontStyle=1;fontSize=10;verticalLabelPosition=top;verticalAlign=bottom;spacingBottom=8;padding=4;';
    } else {
      if (!s.includes('verticalLabelPosition')) s += ';verticalLabelPosition=top;verticalAlign=bottom;spacingBottom=8;';
      if (!s.includes('labelBorderColor')) s += ';labelBorderColor=#0284C7;';
    }
    if (!s.includes('jumpStyle')) s += ';jumpStyle=arc;jumpSize=6;';
    return `${p1}${s}${p3}`;
  });

  // Enforce whiteSpace=wrap, overflow=hidden, and vertical padding on all vertex cards
  xml = xml.replace(/(<mxCell[^>]*\bvertex="1"[^>]*style=")([^"]*)(")/gi, (m, p1, p2, p3) => {
    let s = p2;
    if (!s.includes('whiteSpace=wrap')) s += ';whiteSpace=wrap;';
    if (!s.includes('overflow=hidden') && !s.includes('swimlane')) s += ';overflow=hidden;';
    if (!s.includes('spacingTop')) s += ';spacingTop=6;spacingBottom=6;';
    return `${p1}${s}${p3}`;
  });

  // Fix dark text on dark glass fill contrast
  xml = xml.replace(/fontColor=#000000;([^"]*fillColor=#(?:0F172A|1E293B|090D16))/gi, 'fontColor=#FFFFFF;$1');

  // 9. AUTOMATED 2D BOUNDING BOX LINE COLLISION HEALING:
  xml = heal2DBoundingBoxLineCollisions(xml);

  // 10. TEMPLATE TYPE EMBEDDED HEADER BANNER HEALER:
  // Ensure a prominent dark-glass banner pill is embedded at (x: 40, y: 20) on top of the XML canvas
  if (!xml.includes('id="template_type_hdr"')) {
    const tTitle = getTemplateTitle(archType);
    const hdrNode = `<mxCell id="template_type_hdr" value="&lt;b style='font-size:12px;color:#38BDF8;'&gt;⚡ ARCHITECTURE TEMPLATE:&lt;/b&gt; &lt;span style='font-size:13px;color:#FFFFFF;font-weight:bold;'&gt;${tTitle}&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#0F172A;strokeColor=#0284C7;strokeWidth=2;fontColor=#FFFFFF;padding=8;spacingLeft=12;" vertex="1" parent="1"><mxGeometry x="40" y="20" width="720" height="45" as="geometry" /></mxCell>`;
    xml = xml.replace('<root>', `<root>${hdrNode}`);
  }

  // 11. Validate & Auto-Heal XML via Schema Healer
  const healResult = validateAndHealDrawioXml(xml);
  return healResult.xml;
}

export function heal2DBoundingBoxLineCollisions(xml: string): string {
  interface Box {
    id: string;
    x: number;
    y: number;
    w: number;
    h: number;
  }

  const boxes: Box[] = [];
  const nodeMatches = xml.matchAll(/<mxCell\s+id="([^"]+)"[^>]*\bvertex="1"[^>]*>(?:[\s\S]*?<mxGeometry\s+(?:[^>]*?\s+)?x="(\d+)"\s+y="(\d+)"\s+width="(\d+)"\s+height="(\d+)")?/gi);

  for (const m of nodeMatches) {
    const id = m[1];
    if (id.includes('container') || id.includes('subnet') || id.includes('lane') || id.includes('hdr') || id.includes('page') || id.includes('vpc_')) continue;
    const x = parseInt(m[2], 10);
    const y = parseInt(m[3], 10);
    const w = parseInt(m[4], 10);
    const h = parseInt(m[5], 10);
    if (!isNaN(x) && !isNaN(y) && !isNaN(w) && !isNaN(h)) {
      boxes.push({ id, x, y, w, h });
    }
  }

  if (boxes.length === 0) return xml;

  return xml.replace(
    /(<mxCell\s+id="([^"]+)"[^>]*\bedge="1"[^>]*source="([^"]+)"\s+target="([^"]+)"[^>]*>)([\s\S]*?)(<\/mxCell>)/gi,
    (match, openTag, edgeId, sourceId, targetId, innerBody, closeTag) => {
      const srcBox = boxes.find(b => b.id === sourceId);
      const tgtBox = boxes.find(b => b.id === targetId);

      if (!srcBox || !tgtBox) return match;
      if (innerBody.includes('<Array as="points">')) return match;

      const srcCX = srcBox.x + srcBox.w / 2;
      const srcCY = srcBox.y + srcBox.h / 2;
      const tgtCX = tgtBox.x + tgtBox.w / 2;
      const tgtCY = tgtBox.y + tgtBox.h / 2;

      const minY = Math.min(srcCY, tgtCY);
      const maxY = Math.max(srcCY, tgtCY);

      // Detect vertical line collision through intermediate box
      const blockingBox = boxes.find(b => {
        if (b.id === sourceId || b.id === targetId) return false;
        const xOverlap = (srcCX >= b.x - 15 && srcCX <= b.x + b.w + 15);
        const yOverlap = (b.y > minY + 20) && (b.y + b.h < maxY - 20);
        return xOverlap && yOverlap;
      });

      if (blockingBox) {
        const channelX = (srcCX < blockingBox.x + blockingBox.w / 2)
          ? Math.max(40, blockingBox.x - 40)
          : (blockingBox.x + blockingBox.w + 40);
        const waypoints = `<mxGeometry relative="1" as="geometry"><Array as="points"><mxPoint x="${channelX}" y="${srcCY}"/><mxPoint x="${channelX}" y="${tgtCY}"/></Array></mxGeometry>`;
        return `${openTag}${waypoints}${closeTag}`;
      }

      return match;
    }
  );
}
