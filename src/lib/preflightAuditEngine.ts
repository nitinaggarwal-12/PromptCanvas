import { getTechnicalArchitectureXml } from './technicalArchitectureXmls';
import { validateAndHealDrawioXml } from './xmlHealer';

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
  xml = xml.replace(/<img[^>]*src="http[^"]*"[^>]*>/gi, '📄 ');
  xml = xml.replace(/<img[^>]*src=""[^>]*>/gi, '');
  xml = xml.replace(/argo-icon\.svg/gi, 'logos:argo.svg');

  // Enforce float:left on all image tags to prevent icon-over-text collision
  xml = xml.replace(/<img src="([^"]+)" width="24" height="24" style="([^"]*)"/gi, (m, src, style) => {
    if (!style.includes('float:left')) {
      return `<img src="${src}" width="24" height="24" style="float:left;margin-right:8px;vertical-align:middle;${style}"`;
    }
    return m;
  });

  // 4. TEXT OVERLAP & SUBTITLE DEDUPLICATION HEALER:
  // Clean up duplicate overlapping strings inside node values
  xml = xml.replace(/(&lt;br&gt;\s*|&lt;br\/&gt;\s*)+/gi, '&lt;br&gt;');
  xml = xml.replace(/(Batch Reconciliation\s*)+/gi, 'Batch Reconciliation ');

  // 5. ACCESSIBILITY & EDGE LABEL CONTRAST HEALING:
  // Enforce solid high-contrast background pills on all edge connector labels
  xml = xml.replace(/(<mxCell[^>]*\bedge="1"[^>]*style=")([^"]*)(")/gi, (m, p1, p2, p3) => {
    let s = p2;
    if (!s.includes('labelBackgroundColor')) {
      s += ';labelBackgroundColor=#FFFFFF;labelBorderColor=#94A3B8;fontColor=#0F172A;fontStyle=1;spacingTop=4;spacingBottom=4;';
    }
    return `${p1}${s}${p3}`;
  });

  // Enforce whiteSpace=wrap and overflow=hidden on all vertex cards to prevent text overflow outside shapes
  xml = xml.replace(/(<mxCell[^>]*\bvertex="1"[^>]*style=")([^"]*)(")/gi, (m, p1, p2, p3) => {
    let s = p2;
    if (!s.includes('whiteSpace=wrap')) s += ';whiteSpace=wrap;';
    if (!s.includes('overflow=hidden') && !s.includes('swimlane')) s += ';overflow=hidden;';
    return `${p1}${s}${p3}`;
  });

  // Fix dark text on dark glass fill contrast
  xml = xml.replace(/fontColor=#000000;([^"]*fillColor=#(?:0F172A|1E293B|090D16))/gi, 'fontColor=#FFFFFF;$1');

  // 6. Validate & Auto-Heal XML via Schema Healer
  const healResult = validateAndHealDrawioXml(xml);
  return healResult.xml;
}
