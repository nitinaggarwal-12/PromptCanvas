/**
 * 🛡️ Omni 1.1 Quality Control Chief Agent
 * 
 * Conducts the mandatory 8-Dimension Forensic Audit on every generated or decompiled
 * diagram AST. If defects are detected, autonomously computes surgical AST patches
 * and re-audits until 100% certified parity is achieved.
 */

import { OmniAuditReport, QualityGap, SourceParityContext } from './types';

export class OmniQcChief {
  /**
   * Run the 8-Dimension Forensic Audit on Draw.io XML.
   *
   * @param source Ground-truth context OCR'd from the original image. When supplied,
   *   a 9th SOURCE_PARITY dimension verifies the XML actually depicts that source.
   *   Without it the audit is only a self-consistency check and CANNOT detect that an
   *   unrelated master blueprint was substituted for the user's diagram.
   */
  public static auditDiagramXml(
    xml: string,
    contextTitle: string = '',
    source?: SourceParityContext
  ): OmniAuditReport {
    const gaps: QualityGap[] = [];
    const directives: string[] = [];

    // 1. DIMENSION 1: ICON_GLYPH (Check for placeholder glyphs and bracketed artifacts)
    const hasBracketedPlaceholders = /\[(?:Protein|Drug Binding|Placeholder|Icon|Logo|Image|TBD|TODO|Insert|Pending|Step)\]/gi.test(xml) ||
                                    />\s*\[[a-zA-Z0-9_\s-]{3,30}\]\s*</g.test(xml);
    if (hasBracketedPlaceholders) {
      gaps.push({
        category: 'ICON_GLYPH',
        elementName: 'Unresolved Placeholder Artifacts',
        description: 'Diagram contains raw bracketed prompt placeholders (e.g. [Icon], [Placeholder], [TBD]) instead of structured vector graphics or authentic labels.',
        expected: 'Fully synthesized vector graphics or concrete architectural service cards.',
        actual: 'Unresolved bracketed prompt tokens found in cell values.',
        severity: 'CRITICAL',
        remediation: 'Replace placeholder tokens with structured shapes, cards, or concrete entity labels.'
      });
      directives.push('HEAL_PLACEHOLDER_GLYPHS');
    }

    // 2. DIMENSION 2: LEGEND_INTEGRITY (Assert non-empty legend body if legend is declared)
    const hasLegend = /id="(?:box_legend|legend_box|legend)"/i.test(xml) || /value="[^"]*Legend[^"]*"/i.test(xml);
    if (source?.legend && source.legend.length > 0) {
      if (!hasLegend) {
        gaps.push({
          category: 'LEGEND_INTEGRITY',
          elementName: 'Architecture Protocol Legend',
          description: `Source diagram declares ${source.legend.length} legend definitions, but no legend container was synthesized in the vector graph.`,
          expected: 'Bottom legend bar with color swatches and definition labels matching source diagram.',
          actual: 'Legend container completely missing.',
          severity: 'HIGH',
          remediation: 'Synthesize bottom legend container with definition swatches.'
        });
        directives.push('POPULATE_EMPTY_LEGEND');
      }
    } else if (hasLegend) {
      // If a legend box exists, verify it is not empty
      const legendMatch = xml.match(/<mxCell\s+[^>]*id="(?:box_legend|legend_box|legend)"\s+value="([^"]*)"/i);
      const legendValue = legendMatch ? legendMatch[1] : '';
      if (legendValue && legendValue.replace(/<[^>]+>/g, '').trim().length < 20) {
        gaps.push({
          category: 'LEGEND_INTEGRITY',
          elementName: 'Architecture Protocol Legend',
          description: 'Legend box is empty or missing technical protocol definitions.',
          expected: 'Complete technical legend defining network lines, interconnects, or stage color swatches.',
          actual: 'Empty container box with zero definition items.',
          severity: 'MEDIUM',
          remediation: 'Populate legend box with standard enterprise protocol definition table.'
        });
        directives.push('POPULATE_EMPTY_LEGEND');
      }
    }

    // 3. DIMENSION 3: CHEVRON_STAGE (Check process stages and workflow banners vs flat text)
    const hasStages = /(?:stage\s+\d+|phase\s+\d+|\d+\.\s+[A-Z\s&]+)/i.test(xml) || Boolean(source?.detectedZones && source.detectedZones.length >= 3);
    const hasStageBanners = /rounded=1;.*(?:fillColor|strokeColor)=#(?!none)/i.test(xml) || /shape=(?:mxgraph\.|step|hexagon)/i.test(xml);
    if (hasStages && !hasStageBanners) {
      gaps.push({
        category: 'CHEVRON_STAGE',
        elementName: 'Process Workflow Stage Cards',
        description: 'Process progression rendered as unstyled plain text lines without container backgrounds or stage cards.',
        expected: 'Distinct high-contrast chevron pill cards or rounded stage containers with background fills and boundary strokes.',
        actual: 'Floating raw text strings with no card containers.',
        severity: 'HIGH',
        remediation: 'Wrap stage steps in distinct container cards with sequential connector arrows.'
      });
      directives.push('RESTORE_STAGE_CHEVRONS');
    }

    // 4. DIMENSION 4: SHAPE_GEOMETRY (Header Banner Span)
    const headerMatch = xml.match(/<mxCell\s+id="(?:main_title_banner|main_title_box|header_banner)"[^>]*>[\s\S]*?<mxGeometry\s+[^>]*width="(\d+)"/i);
    if (headerMatch) {
      const headerWidth = parseInt(headerMatch[1], 10);
      if (headerWidth < 900) {
        gaps.push({
          category: 'SHAPE_GEOMETRY',
          elementName: 'Top Title Banner',
          description: `Title banner width is only ${headerWidth}px, leaving asymmetric empty side gutters.`,
          expected: 'Full widescreen span (>= 1050px) across all architecture zones.',
          actual: `Narrow centered box (${headerWidth}px).`,
          severity: 'MEDIUM',
          remediation: 'Expand title banner geometry width to 1055px to align with canvas boundaries.'
        });
        directives.push('EXPAND_HEADER_BANNER');
      }
    }

    // 5. DIMENSION 5: CONNECTORS_FLOW (Check closed-loop feedback returns if cyclic flow is indicated)
    const indicatesClosedLoop = /(?:feedback|closed-loop|iterative|continuous|lifecycle|pipeline)/i.test(contextTitle) ||
                                Boolean(source?.detectedTitle && /(?:feedback|closed-loop|iterative|continuous|lifecycle|pipeline)/i.test(source.detectedTitle));
    if (indicatesClosedLoop) {
      const hasDashedReturnEdge = /(?:strokeColor=#(?:9333EA|7C3AED|8B5CF6|0D9488|16A34A|2563EB).*dashed=1|dashed=1.*strokeColor=#(?:9333EA|7C3AED|8B5CF6|0D9488|16A34A|2563EB))/i.test(xml);
      const totalEdges = (xml.match(/<mxCell[^>]+edge="1"/gi) || []).length;
      if (totalEdges >= 4 && !hasDashedReturnEdge && /(?:feedback|closed-loop|iterative)/i.test(contextTitle)) {
        gaps.push({
          category: 'CONNECTORS_FLOW',
          elementName: 'Closed-Loop Feedback Return Wires',
          description: 'Iterative feedback return wires connecting downstream analytics/monitoring back to source tiers are missing.',
          expected: 'Closed-loop dashed orthogonal return wires looping back to source systems.',
          actual: 'Zero return feedback lines present in iterative lifecycle map.',
          severity: 'HIGH',
          remediation: 'Inject discrete dashed feedback connectors with open-channel waypoints.'
        });
        directives.push('RESTORE_PURPLE_FEEDBACK_LOOPS');
      }
    }

    // 6. DIMENSION 6: CONTAINER_ENCLAVE (Check Security & Compliance Container Styling)
    const hasSecurityContainer = /(?:CMEK|Security Enclave|VPC|Subnet|DMZ|Firewall|Auth Gate)/i.test(xml);
    if (hasSecurityContainer && !xml.includes('#FEF9C3') && !xml.includes('#DCFCE7') && !xml.includes('#16A34A') && !xml.includes('#FEE2E2')) {
      gaps.push({
        category: 'CONTAINER_ENCLAVE',
        elementName: 'Enterprise Security Enclave',
        description: 'Security container lacks distinct security compliance fill or boundary tint (#FEF9C3, #DCFCE7, or #FEE2E2).',
        expected: 'High-contrast security boundary styling with visible fill tint.',
        actual: 'Monochromatic unstyled container card.',
        severity: 'MEDIUM',
        remediation: 'Apply security styling to security enclave container.'
      });
      directives.push('RESTORE_SECURITY_PALETTE');
    }

    // 7. DIMENSION 7: ICON_GLYPH DENSITY (Universal check across all enterprise architectures)
    const unicodeIconCount = (xml.match(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}]/gu) || []).length;
    const iconCount = (xml.match(/(?:<|&lt;|%3c)svg/gi) || []).length +
                      (xml.match(/data:image\/(?:svg|png)/gi) || []).length +
                      (xml.match(/(?:<|&lt;)img\s+src=/gi) || []).length +
                      (xml.match(/shape=(?:mxgraph\.|image)/gi) || []).length +
                      (xml.match(/image=data:image/gi) || []).length +
                      unicodeIconCount;
    const nodeCount = (xml.match(/<mxCell[^>]+vertex="1"/gi) || []).length;
    if (nodeCount >= 10 && iconCount < 3) {
      gaps.push({
        category: 'ICON_GLYPH',
        elementName: 'Enterprise Service & Actor Icons',
        description: `Diagram contains ${nodeCount} nodes but only ${iconCount} vector/service icons, creating an incomplete wireframe look.`,
        expected: 'Vector SVG/Unicode icons for compute, data, model, and actor nodes.',
        actual: `${iconCount} icons found across ${nodeCount} architecture nodes.`,
        severity: 'MEDIUM',
        remediation: 'Inject inline SVG vector service icons or Unicode symbols into architecture cards.'
      });
      directives.push('INJECT_ENTERPRISE_ICONS');
    }

    // 8. DIMENSION 8: STEP_SEQUENCE_BADGES (Check numbered step sequence indicators)
    const isProcessOrWorkflow = /(?:macro\s+sequence|micro\s+sequence|invocation\s+flow|ci\/cd\s+pipeline|multiagent\s+sequence|sequence\s+diagram)/i.test(contextTitle);
    const hasStepBadges = /value="[❶❷❸❹❺12345]"/i.test(xml) || /ellipse;.*fillColor=#(?:188038|1E8E3E|34A853|2563EB)/i.test(xml);
    if (isProcessOrWorkflow && !hasStepBadges) {
      gaps.push({
        category: 'CONNECTORS_FLOW',
        elementName: 'Numbered Step Sequence Badges',
        description: 'Process workflow lacks sequential numbered badges (❶..❺) indicating execution order.',
        expected: 'Numbered step circular badges at key decision gates and invocation hops.',
        actual: 'Unnumbered orthogonal connector lines.',
        severity: 'HIGH',
        remediation: 'Inject high-contrast circular step badges onto connector junctions.'
      });
      directives.push('INJECT_STEP_BADGES');
    }

    // 9. DIMENSION 9: HALLUCINATED_LEGEND_CHECK
    const hasHallucinatedLegend = /id="legend".*value="Legend"/i.test(xml) && /On-Premises.*Cloud Compute.*Data.*CMEK/i.test(xml);
    if (hasHallucinatedLegend && !/pharma|genomics/i.test(contextTitle)) {
      gaps.push({
        category: 'LEGEND_INTEGRITY',
        elementName: 'Hallucinated On-Prem Legend',
        description: 'Diagram contains an injected generic On-Premises/CMEK legend box that does not exist in the source architecture.',
        expected: 'Zero hallucinated containers; 100% faithful representation of ground-truth image.',
        actual: 'Hallucinated 4-row legend box present at canvas corner.',
        severity: 'HIGH',
        remediation: 'Remove hallucinated legend container.'
      });
      directives.push('STRIP_HALLUCINATED_LEGEND');
    }

    // 10. DIMENSION 10: UNIVERSAL CONNECTOR DENSITY GATE (Graph Connectivity)
    const edgeCount = (xml.match(/<mxCell[^>]+edge="1"/gi) || []).length;
    const vertexCount = (xml.match(/<mxCell[^>]+vertex="1"/gi) || []).length;
    // For large multi-card or row-based architectures, a minimum of 4-6 flow edges provides strong process continuity
    const minRequiredEdges = Math.min(6, Math.max(3, Math.floor(vertexCount * 0.08)));
    if (vertexCount >= 6 && edgeCount < minRequiredEdges) {
      gaps.push({
        category: 'CONNECTORS_FLOW',
        elementName: 'Diagram Data Flow & Connectivity',
        description: `Diagram contains ${vertexCount} vertices but only ${edgeCount} connector lines. Graph is structurally disconnected.`,
        expected: `Minimum ${minRequiredEdges} directional orthogonal or straight connector edges.`,
        actual: `${edgeCount} edges found across ${vertexCount} architecture vertices.`,
        severity: edgeCount === 0 ? 'CRITICAL' : 'HIGH',
        remediation: 'Synthesize directional flow edges between primary tiers and service cards.'
      });
      // Do not push arbitrary sequential edge chaining; graph connectivity must be faithfully generated by the AST builder.
    }

    // 11. DIMENSION 11: CONTAINER_VOID_AND_SPATIAL_PACKING
    // Programmatically asserts that parent containers shrink-wrap their children (void <= 36px)
    // Resolves hierarchical parent-relative coordinates to absolute canvas coordinates
    interface RawNodeGeom {
      id: string;
      parentId: string;
      relX: number;
      relY: number;
      w: number;
      h: number;
    }
    const rawCellMap = new Map<string, RawNodeGeom>();
    const cellRegex = /<mxCell[^>]*id="([^"]+)"([^>]*)>([\s\S]*?)<\/mxCell>/g;
    const geomRegex = /<mxGeometry[^>]*x="(-?[\d.]+)"[^>]*y="(-?[\d.]+)"[^>]*width="([\d.]+)"[^>]*height="([\d.]+)"/;

    let cm: RegExpExecArray | null;
    while ((cm = cellRegex.exec(xml)) !== null) {
      const id = cm[1];
      const attrs = cm[2];
      const body = cm[3];
      if (!attrs.includes('vertex="1"') && !body.includes('vertex="1"')) continue;

      const pMatch = attrs.match(/parent="([^"]+)"/);
      const parentId = pMatch ? pMatch[1] : '1';
      const gm = body.match(geomRegex);
      if (gm) {
        rawCellMap.set(id, {
          id,
          parentId,
          relX: parseFloat(gm[1]),
          relY: parseFloat(gm[2]),
          w: parseFloat(gm[3]),
          h: parseFloat(gm[4])
        });
      }
    }

    // Resolve absolute coordinates relative to canvas root
    function getAbs(id: string, visited = new Set<string>()): { x: number; y: number; w: number; h: number } {
      const node = rawCellMap.get(id);
      if (!node) return { x: 0, y: 0, w: 0, h: 0 };
      if (visited.has(id)) return { x: node.relX, y: node.relY, w: node.w, h: node.h };
      visited.add(id);
      if (!node.parentId || node.parentId === '1' || node.parentId === '0' || !rawCellMap.has(node.parentId)) {
        return { x: node.relX, y: node.relY, w: node.w, h: node.h };
      }
      const parentCoords = getAbs(node.parentId, visited);
      return {
        x: parentCoords.x + node.relX,
        y: parentCoords.y + node.relY,
        w: node.w,
        h: node.h
      };
    }

    interface NodeGeom { id: string; parentId: string; x: number; y: number; w: number; h: number; }
    const nodes: NodeGeom[] = Array.from(rawCellMap.keys()).map(id => {
      const abs = getAbs(id);
      return { id, parentId: rawCellMap.get(id)!.parentId, ...abs };
    });

    nodes.forEach(parent => {
      if (parent.w < 180 || parent.h < 120 || (parent.w >= 1400 && parent.h >= 850)) return;

      const children = nodes.filter(child =>
        child.id !== parent.id &&
        (child.parentId === parent.id || (
          child.x >= parent.x - 5 &&
          child.y >= parent.y - 5 &&
          (child.x + child.w) <= (parent.x + parent.w + 5) &&
          (child.y + child.h) <= (parent.y + parent.h + 20)
        ))
      );

      if (children.length >= 2) {
        let maxChildBottom = 0;
        children.forEach(c => {
          const bottom = c.y + c.h;
          if (bottom > maxChildBottom) maxChildBottom = bottom;
        });

        const parentBottom = parent.y + parent.h;
        const bottomVoidPx = parentBottom - maxChildBottom;

        // Check if this container is part of an aligned row with sibling containers
        const isRowAligned = nodes.some(sibling =>
          sibling.id !== parent.id &&
          Math.abs(sibling.y - parent.y) <= 15 &&
          Math.abs((sibling.y + sibling.h) - parentBottom) <= 15
        );
        const maxAllowedVoid = isRowAligned ? 85 : 36;

        if (bottomVoidPx > maxAllowedVoid) {
          gaps.push({
            category: 'CONTAINER_ENCLAVE',
            elementId: parent.id,
            elementName: `Parent Container (${parent.id})`,
            description: `Container "${parent.id}" has an excessive unutilized bottom void of ${bottomVoidPx}px. Lowest child ends at Y=${maxChildBottom} while container extends to Y=${parentBottom}.`,
            expected: `Container height should shrink-wrap children with <= ${maxAllowedVoid}px bottom clearance.`,
            actual: `${bottomVoidPx}px unutilized vertical dead void.`,
            severity: 'HIGH',
            remediation: `Shrink container height from ${parent.h}px to ${maxChildBottom - parent.y + 20}px.`
          });
          directives.push(`SHRINK_CONTAINER_${parent.id}_TO_${maxChildBottom - parent.y + 20}`);
        }
      }
    });

    // 12. DIMENSION 12: AABB_2D_COLLISION_DETECTION
    // Programmatically asserts that sibling cards/shapes do not collide or overlap (>= 12px area)
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];

        // Ignore canvas background envelopes
        if ((a.w >= 1400 && a.h >= 800) || (b.w >= 1400 && b.h >= 800)) continue;

        // Direct parent/child containment check
        if (a.id === b.parentId || b.id === a.parentId) continue;

        // Intentional containment check (A contains B or B contains A with 6px tolerance)
        const aContainsB = (a.x <= b.x + 6 && a.y <= b.y + 6 && (a.x + a.w) >= (b.x + b.w - 6) && (a.y + a.h) >= (b.y + b.h - 6));
        const bContainsA = (b.x <= a.x + 6 && b.y <= a.y + 6 && (b.x + b.w) >= (a.x + a.w - 6) && (b.y + b.h) >= (a.y + a.h - 6));
        if (aContainsB || bContainsA) continue;

        // Intentional 3D card drop shadows or stacked backdrop layers
        const isDropShadow = (a.id.includes('_bg') || b.id.includes('_bg') || a.id.includes('shadow') || b.id.includes('shadow')) &&
                             Math.abs(a.w - b.w) <= 6 && Math.abs(a.h - b.h) <= 6 &&
                             Math.abs(a.x - b.x) <= 8 && Math.abs(a.y - b.y) <= 8;
        if (isDropShadow) continue;

        const overlapW = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
        const overlapH = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);

        if (overlapW >= 12 && overlapH >= 12) {
          gaps.push({
            category: 'SHAPE_GEOMETRY',
            elementId: `${a.id}_vs_${b.id}`,
            elementName: `Collision: ${a.id} ⇄ ${b.id}`,
            description: `2D Spatial Collision detected between sibling elements "${a.id}" and "${b.id}". Overlap: ${Math.round(overlapW)}px × ${Math.round(overlapH)}px.`,
            expected: `Non-enclosing sibling elements must have clean positive clearance (>= 8px gap).`,
            actual: `Physical bounding box overlap of ${Math.round(overlapW)}px horizontally and ${Math.round(overlapH)}px vertically.`,
            severity: 'CRITICAL',
            remediation: `Adjust coordinates of "${a.id}" or "${b.id}" to provide clean positive clearance.`
          });
          directives.push(`RESOLVE_COLLISION_${a.id}_AND_${b.id}`);
        }
      }
    }

    // 13. DIMENSION 13: ASPECT_RATIO_WIDESCREEN (16:9 Landscape Layout Mandate)
    // Extracts pageWidth and pageHeight from <mxGraphModel> or computes content bounding box.
    // AGENTS.md mandates 16:9 aspect ratio (~1.30 - 2.10, e.g. 1150x780, 1440x800, 1600x960).
    const pageModelMatch = xml.match(/<mxGraphModel[^>]*pageWidth="(\d+)"[^>]*pageHeight="(\d+)"/i) ||
                           xml.match(/<mxGraphModel[^>]*pageHeight="(\d+)"[^>]*pageWidth="(\d+)"/i);
    let effectiveW = 0;
    let effectiveH = 0;
    if (pageModelMatch) {
      effectiveW = parseInt(pageModelMatch[1], 10);
      effectiveH = parseInt(pageModelMatch[2], 10);
    }

    // If pageWidth/pageHeight not explicitly in model, calculate from content bounding box
    if (effectiveW < 400 || effectiveH < 300) {
      if (nodes.length > 0) {
        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
        nodes.forEach(n => {
          if (n.w >= 1400 && n.h >= 800) return; // skip canvas background envelope
          if (n.x < minX) minX = n.x;
          if (n.x + n.w > maxX) maxX = n.x + n.w;
          if (n.y < minY) minY = n.y;
          if (n.y + n.h > maxY) maxY = n.y + n.h;
        });
        if (maxX > minX && maxY > minY) {
          effectiveW = maxX - minX;
          effectiveH = maxY - minY;
        }
      }
    }

    if (effectiveW >= 400 && effectiveH >= 300) {
      const aspectRatio = effectiveW / effectiveH;
      // Allowed landscape range: 1.25 to 2.20 (standard 16:9 is 1.78, 16:10 is 1.60, 1150/780 is 1.47, 1485/800 is 1.85)
      if (aspectRatio < 1.25 || aspectRatio > 2.20) {
        gaps.push({
          category: 'SHAPE_GEOMETRY',
          elementName: 'Diagram 16:9 Landscape Aspect Ratio',
          description: `Diagram aspect ratio is ${aspectRatio.toFixed(2)} (${effectiveW}px × ${effectiveH}px), violating the mandatory 16:9 widescreen landscape specification.`,
          expected: 'Widescreen 16:9 landscape aspect ratio (1.25 to 2.20, e.g. 1150×780, 1440×800, 1600×960).',
          actual: `Non-compliant aspect ratio of ${aspectRatio.toFixed(2)} (${effectiveW}px × ${effectiveH}px).`,
          severity: 'HIGH',
          remediation: 'Adjust canvas dimensions or redistribute horizontal layout to conform to 16:9 widescreen format.'
        });
        directives.push('ALIGN_WIDESCREEN_16_9_ASPECT_RATIO');
      }
    }

    // 14. DIMENSION 14: DANGLING_CONNECTOR_REFERENCES (Broken source/target IDs)
    const allKnownCellIds = new Set<string>();
    const allCellIdMatches = xml.matchAll(/<mxCell[^>]+id="([^"]+)"/gi);
    for (const cm of allCellIdMatches) {
      allKnownCellIds.add(cm[1]);
    }

    const edgeCellMatches = xml.matchAll(/<mxCell[^>]+id="([^"]+)"[^>]+edge="1"[^>]*>/gi);
    for (const em of edgeCellMatches) {
      const fullTag = em[0];
      const edgeId = em[1];
      const srcMatch = fullTag.match(/source="([^"]+)"/i);
      const tgtMatch = fullTag.match(/target="([^"]+)"/i);
      if (srcMatch && !allKnownCellIds.has(srcMatch[1])) {
        gaps.push({
          category: 'CONNECTORS_FLOW',
          elementId: edgeId,
          elementName: `Dangling Edge Source (${edgeId})`,
          description: `Connector edge "${edgeId}" references non-existent source ID "${srcMatch[1]}"!`,
          expected: `Connector source must reference an existing vertex in the diagram.`,
          actual: `Dangling source="${srcMatch[1]}" causing arrow to float detached.`,
          severity: 'MEDIUM',
          remediation: `Attach edge "${edgeId}" to a valid source node or strip the dangling connector.`
        });
        directives.push(`REMOVE_DANGLING_EDGE_${edgeId}`);
      }
      if (tgtMatch && !allKnownCellIds.has(tgtMatch[1])) {
        gaps.push({
          category: 'CONNECTORS_FLOW',
          elementId: edgeId,
          elementName: `Dangling Edge Target (${edgeId})`,
          description: `Connector edge "${edgeId}" references non-existent target ID "${tgtMatch[1]}"!`,
          expected: `Connector target must reference an existing vertex in the diagram.`,
          actual: `Dangling target="${tgtMatch[1]}" causing arrow to float detached.`,
          severity: 'MEDIUM',
          remediation: `Attach edge "${edgeId}" to a valid target node or strip the dangling connector.`
        });
        directives.push(`REMOVE_DANGLING_EDGE_${edgeId}`);
      }
    }

    // 15. DIMENSION 15: CANVAS_PAGE_OVERFLOW (Elements exceeding canvas boundaries)
    if (pageModelMatch) {
      const pW = parseInt(pageModelMatch[1], 10);
      const pH = parseInt(pageModelMatch[2], 10);
      if (pW >= 400 && pH >= 300) {
        for (const n of nodes) {
          // Skip canvas background envelopes
          if (n.w >= pW - 20 && n.h >= pH - 20) continue;
          const rightEdge = n.x + n.w;
          const bottomEdge = n.y + n.h;
          if (rightEdge > pW + 25 || bottomEdge > pH + 25) {
            gaps.push({
              category: 'SHAPE_GEOMETRY',
              elementId: n.id,
              elementName: `Canvas Boundary Overflow (${n.id})`,
              description: `Element "${n.id}" (${n.w}x${n.h} at X=${n.x}, Y=${n.y}) bleeds off canvas boundaries! Extends to X=${rightEdge}, Y=${bottomEdge} exceeding canvas (${pW}x${pH}).`,
              expected: `All diagram elements must remain within canvas boundaries (${pW}x${pH}) with positive clearance.`,
              actual: `Element overflows canvas bounds by ${Math.max(0, rightEdge - pW)}px horizontally and ${Math.max(0, bottomEdge - pH)}px vertically.`,
              severity: 'MEDIUM',
              remediation: `Reposition "${n.id}" within canvas bounds or expand canvas pageWidth/pageHeight.`
            });
            directives.push(`EXPAND_CANVAS_TO_${Math.max(pW, rightEdge + 30)}x${Math.max(pH, bottomEdge + 30)}`);
          }
        }
      }
    }

    // 16. DIMENSION 16: XML_ENTITY_VALIDITY (Unescaped '&' or unsupported HTML entities)
    const xmlWithoutComments = xml.replace(/<!--[\s\S]*?-->/g, '');
    const badEntityMatch = xmlWithoutComments.match(/&(?!amp;|lt;|gt;|quot;|apos;|#\d+;|#x[0-9a-fA-F]+;)(?:[a-zA-Z0-9#]+;?)?/i);
    if (badEntityMatch) {
      const badToken = badEntityMatch[0];
      gaps.push({
        category: 'BRANDING_STYLE',
        elementName: 'XML Character Entities',
        description: `Unescaped ampersand or unsupported entity "${badToken}" found in Draw.io XML!`,
        expected: 'All XML entities must be strictly pre-defined XML entities (&amp;, &lt;, &gt;, &quot;, &apos;) or numeric references (&#...;).',
        actual: `Invalid entity token "${badToken}" which causes strict XML parser crashes.`,
        severity: 'MEDIUM',
        remediation: 'Sanitize unescaped ampersands and replace HTML entities with native UTF-8 symbols (e.g. •, —, –) or &amp;.'
      });
      directives.push('SANITIZE_XML_ENTITIES');
    }

    // 17. DIMENSION 17: CARD_CONTAINERIZATION & WIREFRAME GATE
    // Programmatically asserts that multi-line activity cards, metrics, and outcomes
    // are enclosed in physical vector card containers (rounded=1, solid/tinted fillColor,
    // visible strokeColor) rather than rendered as naked unbordered floating text.
    const allVerts = OmniQcChief.parseVertices(xml);
    const bareCards: Array<{ id: string; label: string; x: number; y: number; w: number; h: number }> = [];
    let boxedCardsCount = 0;

    for (const v of allVerts) {
      // Exclude root, full canvas backgrounds, and top title banners
      if (v.w >= 900 && v.h >= 500) continue;
      if (/^(0|1|title|heading|header|main_title)/i.test(v.id)) continue;
      if (v.w >= 500 && v.y <= 120) continue; // Title banner
      if (v.y <= 60 && v.h <= 50) continue; // Top title box
      if (v.w < 60 || v.h < 25) continue; // Tiny badges or icons

      const rawLabel = v.label;
      const isSubstantiveCard =
        rawLabel.length >= 20 ||
        /(\n|<br|•|&bull;|\*|- )/i.test(rawLabel) ||
        (v.w >= 120 && v.h >= 40 && rawLabel.length >= 10);

      // Check if it has card styling (visible background fill and/or visible stroke border)
      const hasFill = /fillColor=(?!none)(#[0-9a-fA-F]{6}|[a-zA-Z]+)/i.test(v.style);
      const hasStroke = /strokeColor=(?!none)(#[0-9a-fA-F]{6}|[a-zA-Z]+)/i.test(v.style);
      const isExplicitTextOnly = /(?:^|;)text(?:;|$)|strokeColor=none;fillColor=none|fillColor=none;strokeColor=none/i.test(v.style);

      if (isSubstantiveCard) {
        if (isExplicitTextOnly || (!hasFill && !hasStroke)) {
          // This is a bare floating text card
          bareCards.push(v);
        } else if (hasFill || hasStroke) {
          boxedCardsCount++;
        }
      }
    }

    if (bareCards.length >= 4 && bareCards.length >= boxedCardsCount) {
      const sampleTitles = bareCards.slice(0, 5).map(c => `"${c.label.slice(0, 30)}..."`);
      gaps.push({
        category: 'SHAPE_GEOMETRY',
        elementName: 'Card Containerization & Visual Enclosures',
        description:
          `Wireframe Defect: ${bareCards.length} substantive content cards (e.g. ${sampleTitles.join(', ')}) ` +
          `were rendered as naked unbordered floating text without enclosing card geometry (found only ${boxedCardsCount} boxed cards).`,
        expected: 'Every substantive card, metric, or activity item must be enclosed in an explicit styled container (rounded=1, solid/tinted fillColor, visible strokeColor).',
        actual: `${bareCards.length} floating text blocks with zero card border or background fill.`,
        severity: 'CRITICAL',
        remediation:
          'Containerize floating cards with rounded=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5; ' +
          'or re-synthesize AST with explicit card geometry.'
      });
      directives.push('CONTAINERIZE_FLOATING_CARDS');
    }

    // =======================================================================
    // DIMENSION 9: SOURCE_PARITY — does this XML actually depict the SOURCE?
    // -----------------------------------------------------------------------
    // Every other dimension inspects the XML against itself, so a wholesale
    // substitution of an unrelated certified master scores a flawless 100.
    // This dimension is the only thing standing between the user and a
    // confidently-branded diagram of somebody else's system.
    // =======================================================================
    let sourceParityChecked = false;
    let sourceCoverage = 1;
    const haystack = OmniQcChief.readableText(xml);

    const groundTruthTerms = [
      ...(source?.detectedTitle ? OmniQcChief.significantTerms(source.detectedTitle) : []),
      ...(source?.detectedZones || []).flatMap(z => OmniQcChief.significantTerms(z))
    ];
    const uniqueTerms = Array.from(new Set(groundTruthTerms));

    // Require a meaningful ground-truth vocabulary before judging; 3 terms is the
    // floor below which coverage ratios are statistically meaningless.
    if (uniqueTerms.length >= 3) {
      sourceParityChecked = true;
      const hits = uniqueTerms.filter(t => haystack.includes(t));
      sourceCoverage = hits.length / uniqueTerms.length;

      if (sourceCoverage < 0.34) {
        const missing = uniqueTerms.filter(t => !haystack.includes(t)).slice(0, 8);
        gaps.push({
          category: 'SOURCE_PARITY',
          elementName: source?.detectedTitle?.split('\n')[0].trim() || 'Source Diagram',
          description:
            `The generated XML shares only ${Math.round(sourceCoverage * 100)}% of the vocabulary ` +
            `OCR'd from the source image (${hits.length}/${uniqueTerms.length} terms). This diagram ` +
            `does not depict the source.`,
          expected: `Terms present in the source header and zone headers, e.g. ${missing.join(', ')}.`,
          actual: 'None of the source-specific terminology appears in the emitted diagram.',
          severity: 'CRITICAL',
          remediation:
            'Do NOT certify. Rebuild the AST directly from the source image instead of binding a ' +
            'master blueprint. This gap is not auto-healable by AST patching.'
        });
        // Deliberately NO remediation directive: autonomouslyHealXml cannot turn one
        // diagram into a different diagram, and adding a directive would spin the
        // remediation loop forever.
      }
    }

    // ── 9b. STRUCTURAL COMPLETENESS ────────────────────────────────────────
    // Real fidelity failures look like declared rows where none of the source cards
    // were synthesized, or large declared containers rendered as empty shells.
    if (source?.rows && source.rows.length > 0) {
      const emptyRowNames: string[] = [];

      for (const row of source.rows) {
        if (!row.cards || row.cards.length < 2) continue;
        // Check if ANY of the cards in this row appear in the XML (checking title, bullets, or meta)
        const populatedCards = row.cards.filter(c => {
          const titleClean = (c.title || '').toLowerCase().replace(/[^a-z0-9]/g, ' ').trim();
          if (titleClean.length >= 3) {
            const terms = titleClean.split(/\s+/).filter(t => t.length >= 4);
            if (terms.length === 0 ? haystack.includes(titleClean) : terms.some(t => haystack.includes(t))) {
              return true;
            }
          }
          if (c.bullets && c.bullets.length > 0) {
            for (const b of c.bullets) {
              const bClean = b.toLowerCase().replace(/[^a-z0-9]/g, ' ').trim();
              if (bClean.length >= 3) {
                const bTerms = bClean.split(/\s+/).filter(t => t.length >= 4);
                if (bTerms.length === 0 ? haystack.includes(bClean) : bTerms.some(t => haystack.includes(t))) {
                  return true;
                }
              }
            }
          }
          if (c.meta) {
            const mClean = c.meta.toLowerCase().replace(/[^a-z0-9]/g, ' ').trim();
            if (mClean.length >= 3 && haystack.includes(mClean)) return true;
          }
          return false;
        });

        if (populatedCards.length === 0) {
          emptyRowNames.push(row.rowTitle);
        }
      }

      if (emptyRowNames.length > 0) {
        sourceParityChecked = true;
        gaps.push({
          category: 'SOURCE_PARITY',
          elementName: emptyRowNames.slice(0, 4).join(', '),
          description:
            `${emptyRowNames.length} declared row(s) from the source diagram are missing cards: ` +
            `${emptyRowNames.join(', ')}. The row was declared in the source, but 0 of its cards were synthesized.`,
          expected: 'Every declared row container holds its cards and bullet points.',
          actual: 'Row cards are completely absent from the emitted XML.',
          severity: 'CRITICAL',
          remediation: 'Rebuild the AST with the row inventory contract to populate every declared tier.'
        });
      }
    }

    const emptyRegions = OmniQcChief.findEmptyRegions(xml);
    if (emptyRegions.length > 0) {
      sourceParityChecked = true;
      gaps.push({
        category: 'SOURCE_PARITY',
        elementName: emptyRegions.slice(0, 4).join(', '),
        description:
          `${emptyRegions.length} declared region(s) were rendered as empty shells with no child ` +
          `content: ${emptyRegions.slice(0, 6).join(', ')}. The row headers exist but the cells ` +
          `inside them were never populated.`,
        expected: 'Every declared row/zone container holds the cards, bullets or entries visible in the source.',
        actual: 'Container drawn with a label but zero enclosed elements.',
        severity: 'CRITICAL',
        remediation:
          'Re-extract the source with a per-row cell inventory and populate each region. ' +
          'Not auto-healable by AST patching.'
      });
    }

    // ── 9c. THEME INTEGRITY (Light Mode Black Bar Defect) ──────────────────
    const isLightDiagram = source?.theme === 'light' || (!source?.theme && !xml.includes('background="#0F172A"') && !xml.includes('pageBackground="#0F172A"'));
    if (isLightDiagram) {
      const hasDarkHeaderBanner = /<mxCell[^>]+id="(?:main_title_banner|header_banner|hdr_bar)"[^>]+(?:fillColor=#(?:0F172A|000000|0B111E|1E293B)|style="[^"]*fillColor=#(?:0F172A|000000|0B111E|1E293B))/i.test(xml);
      const hasDarkLegendBar = /<mxCell[^>]+id="(?:legend_box|box_legend|leg_bar)"[^>]+(?:fillColor=#(?:0F172A|000000|0B111E|1E293B)|style="[^"]*fillColor=#(?:0F172A|000000|0B111E|1E293B))/i.test(xml);
      if (hasDarkHeaderBanner || hasDarkLegendBar) {
        sourceParityChecked = true;
        gaps.push({
          category: 'SOURCE_PARITY',
          elementName: 'Theme Inversion (Dark Bars in Light Canvas)',
          description: `Light Theme Inversion Defect: Artificial dark banner/legend bar (#0F172A) injected into light-themed architecture diagram.`,
          expected: 'Light theme styling (white or subtle card fill #FFFFFF / #F8FAFC with slate border) matching source diagram theme.',
          actual: `Dark filled bar (${hasDarkHeaderBanner ? 'Header' : ''} ${hasDarkLegendBar ? 'Legend' : ''} #0F172A) violating source theme integrity.`,
          severity: 'CRITICAL',
          remediation: 'Replace #0F172A header and legend background fills with theme-compliant #FFFFFF / #F8FAFC styling.'
        });
        directives.push('FIX_THEME_INVERSION');
      }
    }

    // ── 9d. LEFT ROW HEADER COLUMN PARITY ─────────────────────────────────
    if (source?.hasLeftColumn) {
      const hasLeftColCells = /id="row_hdr_/i.test(xml) ||
                              /id="row_[a-z0-9]+_label"/i.test(xml) ||
                              /id="left_col_/i.test(xml) ||
                              /<mxCell[^>]+vertex="1"[^>]*>[\s\S]*?<mxGeometry[^>]+x="(?:[0-9]|[1-9][0-9]|1[0-4][0-9])"[^>]+width="(?:9[0-9]|1[0-9]{2}|2[0-1][0-9])"/i.test(xml);
      
      const expectedRowTitles = source.rows?.map(r => r.rowTitle) || [];
      const leftColHits = expectedRowTitles.filter(title => {
        const tClean = title.toLowerCase().replace(/[^a-z0-9]/g, ' ').trim();
        return haystack.includes(tClean);
      });

      if (!hasLeftColCells || (expectedRowTitles.length >= 3 && leftColHits.length < 2)) {
        sourceParityChecked = true;
        gaps.push({
          category: 'SOURCE_PARITY',
          elementName: 'Left Row Header Column',
          description: 'The source diagram features a dedicated left-hand vertical row header column defining architecture tiers, but zero left-column header cells were synthesized.',
          expected: 'Dedicated left-column header cells (e.g. VALUE STAGES, KEY ACTIVITIES, VALUE METRICS, VALUE FLOW, etc.) at left margin.',
          actual: 'Complete omission of the left-hand vertical row header column.',
          severity: 'CRITICAL',
          remediation: 'Synthesize dedicated left-hand header column with vertical/horizontal row boundary dividers.'
        });
        directives.push('SYNTHESIZE_LEFT_HEADER_COLUMN');
      }
    }

    // ── 9e. EMOJI DEGRADATION GATE ─────────────────────────────────────────
    const rawEmojiMatches = xml.match(/(?:⚙️|🤖|☁️|📦|🔧|🔒|📊|⚡|🛡️|💡|🔍)/gu);
    if (rawEmojiMatches && rawEmojiMatches.length >= 2) {
      sourceParityChecked = true;
      gaps.push({
        category: 'ICON_GLYPH',
        elementName: 'Degraded Raw Unicode Emojis',
        description: `Diagram contains ${rawEmojiMatches.length} raw unicode emoji icon(s) (${Array.from(new Set(rawEmojiMatches)).join(', ')}) instead of authentic vector SVG paths or native mxGraph shape stencils.`,
        expected: 'Authentic vector SVG paths or native mxGraph cloud service stencils (shape=mxgraph.gcp2.*).',
        actual: `Raw emojis found in cell values: ${Array.from(new Set(rawEmojiMatches)).join(' ')}.`,
        severity: 'CRITICAL',
        remediation: 'Replace raw emojis with vector SVG paths or native mxGraph shape stencils.'
      });
      directives.push('REPLACE_EMOJIS_WITH_SVGS');
    }

    // ── 9f. BADGE NUMBER PARITY ───────────────────────────────────────────
    if (source?.badgeNumber) {
      const badgeClean = (source.badgeNumber || '').trim();
      if (badgeClean) {
        const hasBadge = xml.includes(`id="hdr_num"`) ||
                         xml.includes(`id="title_num"`) ||
                         xml.includes(`[ ${badgeClean} ]`) ||
                         new RegExp(`>${badgeClean}<`).test(xml) ||
                         new RegExp(`\\[\\s*${badgeClean}\\s*\\]`).test(xml);
        if (!hasBadge) {
          sourceParityChecked = true;
          gaps.push({
            category: 'SOURCE_PARITY',
            elementName: `Badge Number [ ${badgeClean} ]`,
            description: `Source diagram has badge number "${badgeClean}" at top-left, but no badge number box was synthesized in the header.`,
            expected: `Top-left numbered badge box with value "${badgeClean}".`,
            actual: `Missing top-left numbered badge box.`,
            severity: 'HIGH',
            remediation: `Synthesize top-left numbered badge box with [ ${badgeClean} ].`
          });
          directives.push('ADD_BADGE_NUMBER');
        }
      }
    }

    // ── 9g. MULTI-CARD ROW DENSITY & COUNT PARITY ─────────────────────────
    if (source?.rows) {
      for (const row of source.rows) {
        if (row.cards && row.cards.length >= 4) {
          const titles = row.cards.map(c => {
            const raw = ((c && c.title) || (c && c.bullets && c.bullets[0]) || '');
            return raw.replace(/<[^>]+>|&lt;[^&]*?&gt;/g, ' ').replace(/[^a-z0-9]/gi, ' ').toLowerCase().trim();
          }).filter(t => t.length >= 3);
          const cleanHaystack = haystack.replace(/[^a-z0-9]/gi, ' ').toLowerCase();
          const foundTitles = titles.filter(t => {
            const words = t.split(/\s+/).filter(w => w.length >= 3);
            return words.length > 0 && words.every(w => cleanHaystack.includes(w));
          });
          if (titles.length >= 4 && foundTitles.length < Math.floor(titles.length * 0.4)) {
            sourceParityChecked = true;
            gaps.push({
              category: 'SOURCE_PARITY',
              elementName: `Row Cards: ${row.rowTitle}`,
              description: `Row "${row.rowTitle}" declared ${titles.length} cards in source, but only ${foundTitles.length} were found in the emitted XML. Cards were collapsed or omitted.`,
              expected: `All ${titles.length} individual cards synthesized with distinct geometry.`,
              actual: `Only ${foundTitles.length} of ${titles.length} cards detected.`,
              severity: 'CRITICAL',
              remediation: `Synthesize individual cards for row "${row.rowTitle}" without collapsing them.`
            });
            directives.push(`POPULATE_ROW_${row.rowTitle.replace(/[^a-zA-Z0-9]/g, '_')}`);
          }
        }
      }
    }

    // ── 9h. BRAND BLOCK PARITY ────────────────────────────────────────────
    if (source?.brandBlock?.logoText) {
      const brandClean = (source.brandBlock.logoText || '').toLowerCase().trim();
      if (brandClean.length >= 2 && !haystack.includes(brandClean)) {
        sourceParityChecked = true;
        gaps.push({
          category: 'SOURCE_PARITY',
          elementName: `Brand Block (${source.brandBlock.logoText})`,
          description: `Source diagram contains brand block "${source.brandBlock.logoText}", but it is missing from the emitted XML header.`,
          expected: `Top-right brand block displaying "${source.brandBlock.logoText}".`,
          actual: `Brand block missing from header.`,
          severity: 'HIGH',
          remediation: `Synthesize top-right brand block with logo text and vector icon.`
        });
        directives.push('ADD_BRAND_BLOCK');
      }
    }

    // Calculate Parity Score
    const criticalWeight = gaps.filter(g => g.severity === 'CRITICAL').length * 30;
    const highWeight = gaps.filter(g => g.severity === 'HIGH').length * 15;
    const mediumWeight = gaps.filter(g => g.severity === 'MEDIUM').length * 5;
    let parityScore = Math.max(10, 100 - (criticalWeight + highWeight + mediumWeight));
    const hasCriticalGaps = gaps.some(g => g.severity === 'CRITICAL');
    const hasSourceMismatch = gaps.some(g => g.category === 'SOURCE_PARITY');

    // A source mismatch caps the headline score at the measured coverage. Reporting
    // "100% Parity" for a diagram of an unrelated system is the exact failure mode
    // this dimension exists to prevent.
    if (hasSourceMismatch) {
      parityScore = Math.min(parityScore, Math.round(sourceCoverage * 100));
    }

    const verdict: OmniAuditReport['verdict'] = hasSourceMismatch
      ? 'BLOCKED'
      : (gaps.length === 0 || (!hasCriticalGaps && parityScore >= 90)) ? 'PASS' : 'REMEDIATE';

    return {
      timestamp: Date.now(),
      iteration: 1,
      verdict,
      parityScore,
      checkedDimensions: {
        shapes: !gaps.some(g => g.category === 'SHAPE_GEOMETRY'),
        icons: !gaps.some(g => g.category === 'ICON_GLYPH'),
        connectors: !gaps.some(g => g.category === 'CONNECTORS_FLOW'),
        containers: !gaps.some(g => g.category === 'CONTAINER_ENCLAVE'),
        legend: !gaps.some(g => g.category === 'LEGEND_INTEGRITY'),
        chevrons: !gaps.some(g => g.category === 'CHEVRON_STAGE'),
        mascots: !gaps.some(g => g.category === 'MASCOT_AVATAR'),
        branding: !gaps.some(g => g.category === 'BRANDING_STYLE'),
        // Only true when we actually had ground truth to compare against AND it passed.
        sourceParity: sourceParityChecked && !hasSourceMismatch,
      },
      gaps,
      remediationDirectives: directives,
      certifiedBy: 'Omni 1.1 (Quality Control Chief)'
    };
  }

  /**
   * Decode a Draw.io XML document down to the human-readable label text, so that
   * ground-truth terms are matched against what a viewer would actually read rather
   * than against style attributes, ids and geometry.
   */
  private static readableText(xml: string): string {
    // Draw.io stores every visible label in a `value="..."` ATTRIBUTE, so markup must
    // be harvested before it is stripped. Stripping <...> first deletes the labels
    // along with the tags and silently drives all coverage ratios to zero.
    const rawLabels = Array.from(xml.matchAll(/\svalue="([^"]*)"/gi)).map(m => m[1]);
    const cleanedLabels = rawLabels.map(l => 
      l.replace(/&lt;[^&]*?&gt;/g, ' ')
       .replace(/&amp;/g, '&')
       .replace(/&quot;/g, '"')
       .replace(/&#\d+;/g, ' ')
       .replace(/&[a-z]+;/gi, ' ')
    );
    const raw = cleanedLabels.length > 0 ? cleanedLabels.join(' ') : xml.replace(/<[^>]+>/g, ' ');

    return raw
      .replace(/\s+/g, ' ')
      .toLowerCase();
  }

  /**
   * Parse vertices with their geometry. LLM-authored Draw.io XML almost always
   * parents every cell to "1" and positions absolutely, so containment has to be
   * derived from coordinates rather than from the parent tree alone.
   */
  private static parseVertices(xml: string): Array<{
    id: string; parent: string; label: string; style: string; x: number; y: number; w: number; h: number;
  }> {
    const out: Array<{ id: string; parent: string; label: string; style: string; x: number; y: number; w: number; h: number }> = [];
    const cellRe = /<mxCell\s+([^>]*?)>\s*<mxGeometry\s+([^>]*?)\/>/g;
    let m: RegExpExecArray | null;

    const attr = (s: string, name: string) => {
      const r = new RegExp(`${name}="([^"]*)"`).exec(s);
      return r ? r[1] : '';
    };

    while ((m = cellRe.exec(xml)) !== null) {
      const cellAttrs = m[1];
      const geomAttrs = m[2];
      if (attr(cellAttrs, 'vertex') !== '1') continue;

      const x = parseFloat(attr(geomAttrs, 'x') || '0');
      const y = parseFloat(attr(geomAttrs, 'y') || '0');
      const w = parseFloat(attr(geomAttrs, 'width') || '0');
      const h = parseFloat(attr(geomAttrs, 'height') || '0');
      if (!w || !h) continue;

      out.push({
        id: attr(cellAttrs, 'id'),
        parent: attr(cellAttrs, 'parent'),
        label: OmniQcChief.readableText(attr(cellAttrs, 'value')).trim(),
        style: attr(cellAttrs, 'style'),
        x, y, w, h
      });
    }
    return out;
  }

  /**
   * Identify large labelled regions that enclose no content. Returns their labels.
   *
   * A "region" is a vertex big enough to be a row band or zone container. It is
   * considered empty when no smaller vertex is parented to it AND no smaller vertex's
   * centre point falls inside its bounds.
   */
  private static findEmptyRegions(xml: string): string[] {
    const verts = OmniQcChief.parseVertices(xml);
    if (verts.length < 6) return [];

    const maxW = Math.max(...verts.map(v => v.w));
    const REGION_MIN_AREA = 20000;
    const empty: string[] = [];

    for (const region of verts) {
      const area = region.w * region.h;

      // Must be band-like and among the wider elements to plausibly be a row container.
      if (area < REGION_MIN_AREA) continue;
      if (region.w < 250 || region.h < 50) continue;
      if (region.w < maxW * 0.35) continue;

      // A cell carrying real prose IS the content — not an empty shell. This is what
      // separates a populated activity card from a hollow row band.
      if (region.label.length > 24) continue;

      // Pure text/label elements and title banners are never containers.
      if (/^text;|;text;/.test(region.style)) continue;
      if (/shape=|ellipse|rhombus|image=/.test(region.style)) continue;

      const hasChild = verts.some(c => {
        if (c.id === region.id) return false;
        if (c.w * c.h >= area) return false;
        if (c.parent && c.parent === region.id) return true;
        const cx = c.x + c.w / 2;
        const cy = c.y + c.h / 2;
        return cx > region.x && cx < region.x + region.w
            && cy > region.y && cy < region.y + region.h;
      });

      if (!hasChild) {
        empty.push(region.label ? region.label.slice(0, 40) : `unlabelled ${Math.round(region.w)}x${Math.round(region.h)} region @ (${Math.round(region.x)},${Math.round(region.y)})`);
      }
    }
    return empty;
  }

  /**
   * Reduce a heading to distinctive lowercase tokens, dropping stopwords and generic
   * architecture filler that would match almost any diagram and inflate coverage.
   */
  private static significantTerms(text: string): string[] {
    const STOP = new Set([
      'the', 'and', 'for', 'from', 'with', 'to', 'of', 'in', 'on', 'a', 'an', 'end',
      'architecture', 'diagram', 'platform', 'system', 'systems', 'layer', 'tier',
      'cloud', 'google', 'data', 'services', 'service', 'enterprise', 'overview'
    ]);
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, ' ')
      .split(/\s+/)
      .map(t => t.trim())
      .filter(t => t.length >= 4 && !STOP.has(t) && !/^\d+$/.test(t));
  }

  /**
   * Surgical AST Auto-Healer: applies targeted code fixes for gaps detected by Omni 1.1
   */
  public static autonomouslyHealXml(xml: string, directives: string[]): string {
    let healed = xml;

    // Fix 1: Heal Empty Legend Box
    if (directives.includes('POPULATE_EMPTY_LEGEND')) {
      const fullLegendValue = `&lt;div style=&quot;font-weight:bold;font-size:10px;margin-bottom:2px;color:#0F172A;text-align:left;&quot;&gt;Legend&lt;/div&gt;&lt;table style=&quot;width:100%;border-collapse:collapse;font-size:7.5px;color:#0F172A;font-family:sans-serif;&quot;&gt;&lt;tr&gt;&lt;td style=&quot;width:24px;font-weight:bold;font-size:10px;&quot;&gt;—&lt;/td&gt;&lt;td style=&quot;width:38%;&quot;&gt;Internet&lt;/td&gt;&lt;td style=&quot;width:20px;color:#0284C7;&quot;&gt;➔&lt;/td&gt;&lt;td&gt;Genomics Stream / EHR&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;font-weight:bold;font-size:10px;&quot;&gt;—&lt;/td&gt;&lt;td&gt;Private Interconnect&lt;/td&gt;&lt;td style=&quot;color:#9333EA;&quot;&gt;▢&lt;/td&gt;&lt;td&gt;Private Interconnect Interface&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;color:#9333EA;font-weight:bold;&quot;&gt;---&amp;gt;&lt;/td&gt;&lt;td style=&quot;color:#9333EA;font-weight:bold;&quot;&gt;Agentic loops&lt;/td&gt;&lt;td style=&quot;color:#0284C7;&quot;&gt;☁️&lt;/td&gt;&lt;td&gt;Gemini Data BAA Protected&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;color:#64748B;&quot;&gt;---&lt;/td&gt;&lt;td&gt;BAA&lt;/td&gt;&lt;td colspan=&quot;2&quot; style=&quot;font-size:7px;color:#9333EA;font-style:italic;&quot;&gt;Dotted purple lines represent data-driven agentic action loop&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td style=&quot;color:#64748B;&quot;&gt;····&lt;/td&gt;&lt;td&gt;CMEK&lt;/td&gt;&lt;td colspan=&quot;2&quot;&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;`;
      
      healed = healed.replace(
        /(<mxCell\s+id="(?:box_legend|legend_box)"\s+value=")[^"]*(")/i,
        `$1${fullLegendValue}$2`
      );
    }

    // Fix 2: Remove bracketed placeholders
    if (directives.includes('HEAL_PLACEHOLDER_GLYPHS')) {
      healed = healed
        .replace(/\[Protein Image\]/gi, '3D Molecular Fold')
        .replace(/\[Protein\]/gi, 'Predicted Structure')
        .replace(/\[Drug Binding\]/gi, 'AlphaFold Scaling')
        .replace(/shape=ellipse;.*strokeColor=#0284C7;.*strokeWidth=2;/gi, 'shape=mxgraph.gcp2.biotech;fillColor=#FFFFFF;strokeColor=#3B82F6;strokeWidth=1.5;');
    }

    // Fix 3: Restore CMEK Security Yellow Tint
    if (directives.includes('RESTORE_SECURITY_PALETTE')) {
      healed = healed.replace(
        /(<mxCell\s+id="node_cmek_ent"[^>]*style="[^"]*)/i,
        (match) => match.replace(/fillColor=[^;]+;strokeColor=[^;]+;/, 'fillColor=#FEF9C3;strokeColor=#EAB308;')
      );
    }

    // Fix 4: Expand Header Banner
    if (directives.includes('EXPAND_HEADER_BANNER')) {
      healed = healed.replace(
        /(<mxCell\s+id="(?:main_title_banner|main_title_box)"[^>]*>[\s\S]*?<mxGeometry\s+[^>]*width=")\d+(")/i,
        '$11055$2'
      );
    }

    // Fix 5: Strip Hallucinated Legend
    if (directives.includes('STRIP_HALLUCINATED_LEGEND')) {
      healed = healed.replace(/<mxCell\s+id="legend"[\s\S]*?<\/mxCell>\s*(?:<mxCell\s+id="legend_[^"]*"[^>]*>[\s\S]*?<\/mxCell>\s*)*/gi, '');
    }

    // Fix 5b: Containerize floating cards into styled vector card containers
    if (directives.includes('CONTAINERIZE_FLOATING_CARDS')) {
      // Find substantive text vertices that lack borders/fills and wrap them into styled cards
      healed = healed.replace(
        /<mxCell\s+([^>]*?)style="([^"]*)"([^>]*?)>/gi,
        (fullCell, pre, style, post) => {
          const combined = pre + post;
          // Only operate on vertices
          if (!combined.includes('vertex="1"')) {
            return fullCell;
          }

          // Skip root cells and title banners
          if (combined.includes('id="0"') || combined.includes('id="1"') || /(?:title|header|banner)/i.test(combined)) {
            return fullCell;
          }

          // Check if it has a value with substantive text (> 18 chars, bullets, or breaks)
          const valMatch = combined.match(/value="([^"]*)"/i);
          const rawVal = valMatch ? valMatch[1] : '';
          const isSubstantive =
            rawVal.length >= 20 ||
            /(?:&lt;br&gt;|\n|•|&bull;|\*|- )/i.test(rawVal);

          if (!isSubstantive) return fullCell;

          const isExplicitTextOnly = /(?:^|;)text(?:;|$)|strokeColor=none;fillColor=none|fillColor=none;strokeColor=none/i.test(style);
          const hasFill = /fillColor=(?!none)(#[0-9a-fA-F]{6}|[a-zA-Z]+)/i.test(style);
          const hasStroke = /strokeColor=(?!none)(#[0-9a-fA-F]{6}|[a-zA-Z]+)/i.test(style);

          if (isExplicitTextOnly || (!hasFill && !hasStroke)) {
            // Clean out bare text flags
            let newStyle = style
              .replace(/(?:^|;)text(?=;|$)/g, '')
              .replace(/strokeColor=none;?/gi, '')
              .replace(/fillColor=none;?/gi, '');
            if (!newStyle.endsWith(';')) newStyle += ';';

            // Add clean card styling
            newStyle += 'rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#CBD5E1;strokeWidth=1.5;spacing=6;shadow=1;arcSize=8;';
            return `<mxCell ${pre}style="${newStyle}"${post}>`;
          }

          return fullCell;
        }
      );
    }

    // Fix 7: Auto-Sanitize XML Entities & HTML Named Entities in Attribute Values & Labels
    const HTML_ENTITY_MAP: Record<string, string> = {
      '&bull;': '•',
      '&mdash;': '—',
      '&ndash;': '–',
      '&nbsp;': '&#160;',
      '&hellip;': '…',
      '&copy;': '©',
      '&reg;': '®',
      '&trade;': '™',
      '&check;': '✓',
      '&cross;': '✗',
      '&rarr;': '➔',
      '&larr;': '←',
      '&rArr;': '⇒',
      '&lArr;': '⇐'
    };

    for (const [entity, replacement] of Object.entries(HTML_ENTITY_MAP)) {
      healed = healed.replaceAll(entity, replacement);
    }

    healed = healed.replace(/value="([^"]*)"/g, (fullMatch, val) => {
      const escaped = val.replace(/&(?!amp;|lt;|gt;|quot;|apos;|#\d+;|#x[a-f0-9]+;)/gi, '&amp;');
      return `value="${escaped}"`;
    });

    // Fix 8: Autonomously Shrink-Wrap Container Heights
    directives.forEach(dir => {
      const shrinkMatch = dir.match(/^SHRINK_CONTAINER_(.+)_TO_(\d+)$/);
      if (shrinkMatch) {
        const cId = shrinkMatch[1];
        const newH = shrinkMatch[2];
        const geomRegex = new RegExp(`(<mxCell\\s+[^>]*id="${cId}"[^>]*>[\\s\\S]*?<mxGeometry[^>]*height=")\\d+("[^>]*as="geometry")`, 'i');
        healed = healed.replace(geomRegex, `$1${newH}$2`);
      }
    });

    // Fix 9: Auto-Heal 16:9 Canvas Dimensions
    if (directives.includes('ALIGN_WIDESCREEN_16_9_ASPECT_RATIO')) {
      if (healed.includes('pageWidth=') && healed.includes('pageHeight=')) {
        healed = healed.replace(/(<mxGraphModel[^>]*pageWidth=")\d+(")/i, '$11440$2');
        healed = healed.replace(/(<mxGraphModel[^>]*pageHeight=")\d+(")/i, '$1800$2');
      } else if (healed.includes('<mxGraphModel')) {
        healed = healed.replace('<mxGraphModel', '<mxGraphModel pageWidth="1440" pageHeight="800"');
      }
    }

    // Fix 10: Auto-Heal Dangling Connector Edges
    directives.forEach(dir => {
      const edgeMatch = dir.match(/^REMOVE_DANGLING_EDGE_(.+)$/);
      if (edgeMatch) {
        const edgeId = edgeMatch[1];
        const edgeRegex = new RegExp(`<mxCell\\s+[^>]*id="${edgeId}"[^>]*>[\\s\\S]*?<\\/mxCell>\\s*|<mxCell\\s+[^>]*id="${edgeId}"[^>]*\\/>\\s*`, 'gi');
        healed = healed.replace(edgeRegex, '');
      }
    });

    // Fix 11: Auto-Expand Canvas for Page Overflows
    directives.forEach(dir => {
      const expandMatch = dir.match(/^EXPAND_CANVAS_TO_(\d+)x(\d+)$/);
      if (expandMatch) {
        const newW = expandMatch[1];
        const newH = expandMatch[2];
        if (healed.includes('pageWidth=') && healed.includes('pageHeight=')) {
          healed = healed.replace(/(<mxGraphModel[^>]*pageWidth=")\d+(")/i, `$1${newW}$2`);
          healed = healed.replace(/(<mxGraphModel[^>]*pageHeight=")\d+(")/i, `$1${newH}$2`);
        }
      }
    });

    // Fix 12: Fix Theme Inversion (Convert dark bars in light mode to clean light cards)
    if (directives.includes('FIX_THEME_INVERSION')) {
      healed = healed.replace(
        /(<mxCell[^>]+id="(?:main_title_banner|header_banner|hdr_bar)"[^>]*style="[^"]*)/gi,
        (match) => match.replace(/fillColor=#(?:0F172A|000000|0B111E|1E293B)/gi, 'fillColor=#FFFFFF').replace(/strokeColor=#[0-9a-fA-F]+/gi, 'strokeColor=#CBD5E1')
      );
      healed = healed.replace(
        /(<mxCell[^>]+id="(?:legend_box|box_legend|leg_bar)"[^>]*style="[^"]*)/gi,
        (match) => match.replace(/fillColor=#(?:0F172A|000000|0B111E|1E293B)/gi, 'fillColor=#FFFFFF').replace(/strokeColor=#[0-9a-fA-F]+/gi, 'strokeColor=#CBD5E1')
      );
      healed = healed.replace(
        /(<mxCell[^>]+id="(?:header_title|title_text|hdr_title)[^"]*"[^>]*value="[^"]*)/gi,
        (match) => match.replace(/#F8FAFC|#FFFFFF/gi, '#0F172A')
      );
    }

    // Fix 13: Strip Degraded Raw Emojis
    if (directives.includes('REPLACE_EMOJIS_WITH_SVGS')) {
      healed = healed.replace(/(?:⚙️|🤖|☁️|📦|🔧|🔒|📊|⚡|🛡️|💡|🔍)\s*/gu, '');
    }

    return healed;
  }
}
