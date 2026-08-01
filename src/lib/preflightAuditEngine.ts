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

  // 1b. Fix double/triple-escaped ampersands: &amp;amp; -> &amp;
  xml = xml.replace(/&amp;amp;(?:amp;)*/g, '&amp;');

  // 1c. Scrub generic legacy ITACS brand names
  xml = xml
    .replace(/ITACS Integrated Insights Platform - TOTAL UNIFIED SYSTEM VIEW/g, 'Unified Architecture Platform - System View')
    .replace(/ITACS Integrated Insights Platform/g, 'Enterprise Architecture Platform')
    .replace(/ITACS SECURE GOVERNED CLOUD TENANT/g, 'SECURE GOVERNED CLOUD TENANT')
    .replace(/ITACS Governing Cloud Tenant/g, 'Governing Cloud Tenant')
    .replace(/ITACS Primary VPC Network/g, 'Primary VPC Network')
    .replace(/ITACS Agent Orchestrator/g, 'Agent Orchestrator')
    .replace(/ITACS Oncology Platform/g, 'Enterprise AI Platform')
    .replace(/Core ITACS Synthesis Engine/g, 'Core AI Synthesis Engine')
    .replace(/ITACS Target/g, 'Enterprise Target')
    .replace(/\bITACS\b/g, 'Enterprise')
    // 1d. Scrub legacy medical/patient residual terms
    .replace(/Dim_Patient/g, 'Dim_Customer_Account')
    .replace(/Patient Key/g, 'Account Key (PK)')
    .replace(/Patient Type/g, 'Account Type')
    .replace(/Disease History/g, 'Account History')
    .replace(/Dim_Physician/g, 'Dim_Provider_Merchant')
    .replace(/Physician Key/g, 'Provider Key (PK)')
    .replace(/Dim_Payer/g, 'Dim_Payment_Gateway')
    .replace(/Payer Key/g, 'Gateway Key (PK)')
    .replace(/Fact_Patient_Encounters/g, 'Fact_Transactions')
    .replace(/Row-Level Security on Patient Data/g, 'Row-Level Access Security &amp; Compliance')
    // 1e. Scrub legacy OCR typos
    .replace(/Entire ultra-diate in organizing across major phases/g, 'End-to-End Enterprise Architecture across major phases')
    .replace(/Poots &amp; Pl[aa]nnin[cg] Phases/gi, 'Planning &amp; Ingestion Phases')
    .replace(/Poots &amp; Plonning/gi, 'Planning &amp; Ingestion')
    .replace(/Poots/gi, 'Planning')
    .replace(/insograto4 MLOps\(L\)MLOps State Machine &amp; Pipalinos/gi, 'Integrated MLOps State Machine &amp; Pipelines')
    .replace(/insograto4/gi, 'integrated')
    .replace(/Pipalinos/gi, 'Pipelines')
    .replace(/DEYIRBMENT/gi, 'RETIREMENT')
    .replace(/Yavates/gi, 'Nodes')
    .replace(/incogporating/gi, 'incorporating')
    .replace(/Metripls metica/gi, 'Metrics &amp; Audits')
    .replace(/Regeslation/gi, 'Regulation')
    .replace(/fiennon nao integration/gi, 'detailed role integration')
    .replace(/Noman-in-the-Loop/gi, 'Human-in-the-Loop')
    .replace(/dhified Soromance Beant/gi, 'Unified Governance Board')
    .replace(/analists aplioad rao osss/gi, 'analysts upload raw data')
    .replace(/Modsl\/Prompt/gi, 'Model/Prompt')
    .replace(/offhoe Metrics/gi, 'offline metrics')
    .replace(/Pairoess Audit/gi, 'Fairness Audit')
    .replace(/Accursay\/P1/gi, 'Accuracy/F1')
    .replace(/Zonss 2/gi, 'Zones 2')
    .replace(/Eaterprise Nnowledge/gi, 'Enterprise Knowledge')
    .replace(/Danaged RiAG/gi, 'Managed RAG')
    .replace(/GCS\?Vertes A\? Search/gi, 'GCS / Vertex AI Search')
    .replace(/Boslouss Avalytics/gi, 'Business Analytics')
    .replace(/Auakehce/gi, 'Analytics')
    .replace(/Agenlic/gi, 'Agentic')
    .replace(/Orchestratien 5 Analytics/gi, 'Orchestration &amp; Analytics')
    .replace(/leference/gi, 'Inference')
    .replace(/ML lnference/gi, 'ML Inference')
    .replace(/Betlict Theoghd loop/gi, 'ReAct Thought loop')
    .replace(/Actien deoision Tbnoglt/gi, 'Action decision Thought')
    .replace(/Actien deesion Memery/gi, 'Action decision Memory')
    .replace(/Private Dete\/AI Subwet/gi, 'Private Data/AI Subnet')
    .replace(/ACTION gRP\/HTTP/gi, 'ACTION gRPC/HTTP')
    .replace(/Priocla call/gi, 'Private call');

  // Remove stray edge waypoints that drop into y > 1100 margin
  xml = xml.replace(/<mxPoint\s+x="(\d+)"\s+y="(?:1[1-9]\d\d|2000)"\s*\/>/gi, '');

  // 4. DYNAMIC CANVAS BOUNDARY HEALER (Prevent Bottom & Right Clipping):
  // Calculate maximum Y and X coordinates of all vertex nodes in XML
  let maxY = 0;
  let maxX = 0;
  const mxGeomRegex = /<mxGeometry\b([^>]*)\/?>/gi;
  let geomMatch;
  while ((geomMatch = mxGeomRegex.exec(xml)) !== null) {
    const attrs = geomMatch[1];
    const yMatch = attrs.match(/\by="(\d+)"/i);
    const hMatch = attrs.match(/\bheight="(\d+)"/i);
    const xMatch = attrs.match(/\bx="(\d+)"/i);
    const wMatch = attrs.match(/\bwidth="(\d+)"/i);

    const yVal = yMatch ? parseInt(yMatch[1], 10) : 0;
    const hVal = hMatch ? parseInt(hMatch[1], 10) : 0;
    const xVal = xMatch ? parseInt(xMatch[1], 10) : 0;
    const wVal = wMatch ? parseInt(wMatch[1], 10) : 0;

    if (yVal + hVal > maxY) maxY = yVal + hVal;
    if (xVal + wVal > maxX) maxX = xVal + wVal;
  }

  // Auto-expand pageHeight and pageWidth if nodes extend past default boundaries
  if (maxY > 650) {
    const targetHeight = Math.max(1600, maxY + 250);
    xml = xml.replace(/(<mxGraphModel[^>]*\bpageHeight=")\d+(")/gi, `$1${targetHeight}"`);
  }
  if (maxX > 1100) {
    const targetWidth = Math.max(1920, maxX + 250);
    xml = xml.replace(/(<mxGraphModel[^>]*\bpageWidth=")\d+(")/gi, `$1${targetWidth}"`);
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
