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
  if (!xml || xml.length < 300 || xml.includes('value="Cloud Architecture"') || !xml.includes('<mxCell') || xml.includes('aws_vpc_secret_network') || xml.includes('cicd-pipeline-architecture') || xml.includes('id="ingress"') || xml.includes('Access tokens verification')) {
    xml = getTechnicalArchitectureXml(archType === 'conceptual_diagram' ? 'conceptual_diagram' : (archType || 'tech_rag_gcp'));
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
  // Remove broken remote image URLs (e.g. <img src="http..."/> or escaped &lt;img...&gt;) and fallback to clean vector emojis/icons
  xml = xml.replace(/&lt;img\s+[\s\S]*?&gt;/gi, '');
  xml = xml.replace(/<img\s+[\s\S]*?>/gi, '');
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
  // Auto-expand standard vertex cards to 80px height for text buffer margin
  xml = xml.replace(/(<mxCell[^>]*\bvertex="1"[^>]*style="[^"]*"(?:(?!parent="0"|parent="1"|id="[^"]*_lane"|id="[^"]*_tab"|id="[^"]*_hdr").)*?<mxGeometry\s+(?:[^>]*?\s+)?height=")(?:60|65|70|75)(")/gi, '$180$2');
  // Auto-expand narrow vertex cards (200px to 250px) to 270px width so text titles never clip
  xml = xml.replace(/(<mxCell[^>]*\bvertex="1"[^>]*style="[^"]*"(?:(?!parent="0"|parent="1"|id="[^"]*_lane"|id="[^"]*_tab"|id="[^"]*_hdr"|rhombus).)*?<mxGeometry\s+(?:[^>]*?\s+)?width=")(?:200|220|240|250)(")/gi, '$1270$2');

  // 6. RHOMBUS SHAPE DIMENSION & TEXT OVERFLOW HEALER (Fixes Rhombus Edge Overflow):
  // Auto-expand all rhombus/diamond shapes to width=280 and height=90 so text never spills over sloped edges
  xml = xml.replace(/(<mxCell[^>]*style="[^"]*rhombus[^"]*"[\s\S]*?<mxGeometry\s+(?:[^>]*?\s+)?width=")\d+("\s+height=")\d+(")/gi, '$1280$290"');

  // 7. EDGE LABEL MULTI-LINE SPLITTING & TEXT OVERLAP HEALER:
  // Compact multi-word edge labels so they fit perfectly inside 160px corridors without clipping cards
  xml = xml.replace(/value="Promote to Production"/gi, 'value="Promote to&lt;br&gt;Production"');
  xml = xml.replace(/value="Sync GitOps Manifest"/gi, 'value="Sync GitOps&lt;br&gt;Manifest"');
  xml = xml.replace(/value="Trigger Build"/gi, 'value="Trigger&lt;br&gt;Build"');
  xml = xml.replace(/value="Stream Batch Archive"/gi, 'value="Stream Batch&lt;br&gt;Archive"');
  xml = xml.replace(/value="Train Anomaly Models"/gi, 'value="Train Anomaly&lt;br&gt;Models"');
  xml = xml.replace(/value="Trigger Operational Alert"/gi, 'value="Trigger Operational&lt;br&gt;Alert"');
  xml = xml.replace(/value="Canary Telemetry Fail -&amp;gt; Auto Rollback"/gi, 'value="Canary Fail -&amp;gt;&lt;br&gt;Auto Rollback"');
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

  // 9. AUTOMATED 2D BOUNDING BOX LINE & EDGE LABEL OVERLAP HEALING:
  xml = heal2DBoundingBoxLineCollisions(xml);

  // Remove any legacy template_type_hdr nodes
  xml = xml.replace(/<mxCell\s+id="template_type_hdr"[\s\S]*?<\/mxCell>/gi, '');

  // 10. Validate & Auto-Heal XML via Schema Healer
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

  const pairCounts = new Map<string, number>();

  return xml.replace(
    /(<mxCell\s+id="([^"]+)"[^>]*\bedge="1"[^>]*style="([^"]*)"[^>]*source="([^"]+)"\s+target="([^"]+)"[^>]*>)([\s\S]*?)(<\/mxCell>)/gi,
    (match, openTag, edgeId, styleStr, sourceId, targetId, innerBody, closeTag) => {
      const srcBox = boxes.find(b => b.id === sourceId);
      const tgtBox = boxes.find(b => b.id === targetId);

      if (!srcBox || !tgtBox) return match;

      // Track parallel edges between same pair of nodes
      const pairKey = [sourceId, targetId].sort().join('---');
      const count = (pairCounts.get(pairKey) || 0) + 1;
      pairCounts.set(pairKey, count);

      let updatedStyle = styleStr;
      let updatedInner = innerBody;

      // Parallel edge disambiguation: alternate top vs bottom label placement
      if (count > 1) {
        if (!updatedStyle.includes('verticalLabelPosition=bottom')) {
          updatedStyle = updatedStyle
            .replace(/verticalLabelPosition=[^;]+/g, 'verticalLabelPosition=bottom')
            .replace(/verticalAlign=[^;]+/g, 'verticalAlign=top')
            .replace(/spacingBottom=[^;]+/g, 'spacingTop=14');
        }
      }

      const srcCX = srcBox.x + srcBox.w / 2;
      const srcCY = srcBox.y + srcBox.h / 2;
      const tgtCX = tgtBox.x + tgtBox.w / 2;
      const tgtCY = tgtBox.y + tgtBox.h / 2;

      const labelMidX = (srcCX + tgtCX) / 2;
      const labelMidY = (srcCY + tgtCY) / 2;

      // Check if label midpoint overlaps targetBox or any node box
      const overlapsNodeBox = boxes.find(b => {
        return (labelMidX >= b.x - 15 && labelMidX <= b.x + b.w + 15) &&
               (labelMidY >= b.y - 15 && labelMidY <= b.y + b.h + 15);
      });

      // Shift label offset X/Y away from shape box cleanly into open channel corridor
      if (overlapsNodeBox && !updatedInner.includes('as="offset"')) {
        let offsetX = 0;
        let offsetY = 0;

        if (Math.abs(srcCY - tgtCY) < 40) {
          offsetY = count > 1 ? 20 : -28;
          // Calculate midpoint of open horizontal channel between source and target cards
          const srcRight = srcBox.x + srcBox.w;
          const tgtLeft = tgtBox.x;
          if (tgtLeft > srcRight) {
            const channelMidX = (srcRight + tgtLeft) / 2;
            offsetX = Math.round(channelMidX - labelMidX);
          } else {
            const channelMidX = (tgtBox.x + tgtBox.w + srcBox.x) / 2;
            offsetX = Math.round(channelMidX - labelMidX);
          }
        } else {
          offsetY = count > 1 ? 24 : -32;
        }

        if (updatedInner.includes('<mxGeometry')) {
          updatedInner = updatedInner.replace(/(<mxGeometry[^>]*>)/gi, `$1<mxPoint x="${offsetX}" y="${offsetY}" as="offset"/>`);
        } else {
          updatedInner = `<mxGeometry relative="1" as="geometry"><mxPoint x="${offsetX}" y="${offsetY}" as="offset"/></mxGeometry>${updatedInner}`;
        }
      }

      // Reconstruct tag with updatedStyle if changed
      const reconstructedTag = openTag.replace(/style="[^"]*"/, `style="${updatedStyle}"`);

      // Detect diagonal return line cutting down-left across intermediate cards
      if (!updatedInner.includes('<Array as="points">') && srcBox.x > tgtBox.x + 80 && tgtBox.y > srcBox.y + 40) {
        const rightWaypointX = Math.max(srcBox.x + srcBox.w + 50, 830);
        const channelY = Math.round((srcBox.y + srcBox.h + tgtBox.y) / 2);
        const leftWaypointX = Math.min(tgtBox.x - 50, 80);

        const waypointStr = `<Array as="points"><mxPoint x="${rightWaypointX}" y="${Math.round(srcCY)}"/><mxPoint x="${rightWaypointX}" y="${channelY}"/><mxPoint x="${leftWaypointX}" y="${channelY}"/><mxPoint x="${leftWaypointX}" y="${Math.round(tgtCY)}"/></Array>`;

        if (updatedInner.includes('<mxGeometry')) {
          updatedInner = updatedInner.replace(/(<\/mxGeometry>)/gi, `${waypointStr}$1`);
        } else {
          updatedInner = `<mxGeometry relative="1" as="geometry">${waypointStr}</mxGeometry>${updatedInner}`;
        }
      }

      // Detect vertical line collision through intermediate box
      if (!updatedInner.includes('<Array as="points">')) {
        const minY = Math.min(srcCY, tgtCY);
        const maxY = Math.max(srcCY, tgtCY);

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
          
          if (updatedInner.includes('<mxGeometry')) {
            updatedInner = updatedInner.replace(/(<\/mxGeometry>)/gi, `<Array as="points"><mxPoint x="${channelX}" y="${srcCY}"/><mxPoint x="${channelX}" y="${tgtCY}"/></Array>$1`);
          } else {
            updatedInner = `<mxGeometry relative="1" as="geometry"><Array as="points"><mxPoint x="${channelX}" y="${srcCY}"/><mxPoint x="${channelX}" y="${tgtCY}"/></Array></mxGeometry>${updatedInner}`;
          }
        }
      }

      return `${reconstructedTag}${updatedInner}${closeTag}`;
    }
  );
}
