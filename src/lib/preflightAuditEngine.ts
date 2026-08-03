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

  // V2 layout-engine output (graph -> ELK -> renderer) is deterministically laid out and
  // validator-gated with its own repair loop. Geometric "healers" below assume absolute
  // integer coordinates and fixed attribute order; applied to v2's parent-relative decimal
  // geometry they relocate nodes out of containers, strip legitimate edge waypoints, and
  // resize nodes without re-layout. Text/brand scrubbing still applies; geometry surgery
  // must never touch v2 output. (Regression: "fresh diagrams losing structure post generation".)
  const isV2LayoutEngineOutput = xml.includes('PromptCanvas-LayoutEngineV2');

  // 1b. Fix double/triple-escaped ampersands: &amp;amp; -> &amp;
  xml = xml.replace(/&amp;amp;(?:amp;)*/g, '&amp;');

  // 1c. Scrub generic legacy ITACS brand names & dark black box overlays
  xml = xml
    .replace(/<mxCell\s+id="(?:exec_dash_foot|exec_dash_stand|exec_dash_bezel|exec_dash_chin|comp_view_bezel|comp_view_cam|advisory_bezel|advisory_notch)"[\s\S]*?<\/mxCell>/gi, '')
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
    // 1d. Scrub legacy OCR typos
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

  // Remove stray edge waypoints that drop into y > 1100 margin (Gemini-authored XML only:
  // v2/ELK diagrams are legitimately taller than 1100px and their waypoints are routed)
  if (!isV2LayoutEngineOutput) {
    xml = xml.replace(/<mxPoint\s+x="(\d+)"\s+y="(?:1[1-9]\d\d|2000)"\s*\/>/gi, '');
  }

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

  // 5. SHAPE HEIGHT & VERTICAL TEXT BUFFER HEALER (Gemini-authored XML only:
  // resizing structured template nodes or v2 nodes without re-running ELK manufactures overlaps and container escapes)
  const isStructuredTemplateXml =
    xml.includes('PromptCanvas-LayoutEngineV2') ||
    xml.includes('col_ingestion') ||
    xml.includes('col_processing') ||
    xml.includes('col_delivery') ||
    xml.includes('col_top') ||
    xml.includes('col_central') ||
    xml.includes('col_right') ||
    xml.includes('box_mlops') ||
    xml.includes('box_rag') ||
    xml.includes('erd_compiled') ||
    xml.includes('agentic_rag') ||
    xml.includes('itacs_conceptual_compiled') ||
    xml.includes('governance_state_machine_compiled') ||
    xml.includes('unified_system_view') ||
    xml.includes('devops_cicd_pipeline') ||
    xml.includes('data_ai_pipeline') ||
    xml.includes('secure_deployment_map') ||
    xml.includes('sequence_diagram') ||
    xml.includes('macro_sequence_diagram') ||
    xml.includes('eval_safety_benchmarking') ||
    xml.includes('vertex-ai-eval-flow') ||
    xml.includes('tech_') ||
    xml.includes('serverless_gcp') ||
    xml.includes('sw1_') ||
    xml.includes('sw2_') ||
    xml.includes('sw3_') ||
    xml.includes('dm_l1_') ||
    xml.includes('etl_src') ||
    xml.includes('fact_ins');

  if (!isStructuredTemplateXml && !isV2LayoutEngineOutput) {
    // Auto-expand all cylinder shapes to 95px height to ensure 3-line database subtitles never touch cylinder rims
    xml = xml.replace(/(<mxCell[^>]*style="[^"]*shape=cylinder3[^"]*"[\s\S]*?<mxGeometry\s+(?:[^>]*?\s+)?height=")\d+(")/gi, '$195"');
    // Auto-expand standard vertex cards to 80px height for text buffer margin
    xml = xml.replace(/(<mxCell[^>]*\bvertex="1"[^>]*style="[^"]*"(?:(?!parent="0"|parent="1"|id="[^"]*_lane"|id="[^"]*_tab"|id="[^"]*_hdr").)*?<mxGeometry\s+(?:[^>]*?\s+)?height=")(?:60|65|70|75)(")/gi, '$180$2');
    // Auto-expand narrow vertex cards (200px to 250px) to 270px width so text titles never clip
    xml = xml.replace(/(<mxCell[^>]*\bvertex="1"[^>]*style="[^"]*"(?:(?!parent="0"|parent="1"|id="[^"]*_lane"|id="[^"]*_tab"|id="[^"]*_hdr"|rhombus).)*?<mxGeometry\s+(?:[^>]*?\s+)?width=")(?:200|220|240|250)(")/gi, '$1270$2');
  }

  // 6. RHOMBUS SHAPE DIMENSION & TEXT OVERFLOW HEALER (Fixes Rhombus Edge Overflow):
  // Auto-expand all rhombus/diamond shapes to width=280 and height=90 so text never spills over sloped edges
  xml = xml.replace(/(<mxCell[^>]*style="[^"]*rhombus[^"]*"[\s\S]*?<mxGeometry\s+(?:[^>]*?\s+)?width=")\d+("\s+height=")\d+(")/gi, '$1280$290"');

  // 7. EDGE LABEL MULTI-LINE SPLITTING & TEXT OVERLAP HEALING:
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

  // 8. ACCESSIBILITY & PROCESS FLOW EDGE LABEL CONTRAST & POSITION HEALING (Skipped for pre-engineered structured templates):
  if (!isStructuredTemplateXml) {
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
  }

  // Fix dark text on dark glass fill contrast
  xml = xml.replace(/fontColor=#000000;([^"]*fillColor=#(?:0F172A|1E293B|090D16))/gi, 'fontColor=#FFFFFF;$1');

  // 9. AUTOMATED 2D BOUNDING BOX LINE & EDGE LABEL OVERLAP HEALING:
  // All pre-engineered template diagrams and V2 Layout Engine outputs already have explicit,
  // collision-free spatial coordinates. Naive 1D tier collision heuristics must never shift cards or distort templates.
  if (!isStructuredTemplateXml) {
    xml = heal2DBoundingBoxLineCollisions(xml);
    xml = heal2DSameTierNodeCollisions(xml);
  }

  // 9b. DETERMINISTIC 3-STAGE CONCEPTUAL DIAGRAM CONTAINER BOUNDS ENFORCER:
  // If a diagram has Stage 1 (x=50..370), Stage 2 (x=430..810), Stage 3 (x=870..1230), ensure cards never escape:
  if (xml.includes('col_ingestion') || xml.includes('col_processing') || xml.includes('col_delivery')) {
    // Stage 1 cards -> x="70", width="280"
    xml = xml.replace(/(<mxCell\s+id="(?:src_card|func_areas|user_node)"[\s\S]*?<mxGeometry\s+[^>]*?\bx=")\d+("\s+[^>]*?\bwidth=")\d+(")/gi, '$170$2280"');
    // Stage 2 cards -> x="470", width="300"
    xml = xml.replace(/(<mxCell\s+id="(?:synth|content|chatbot|sim)"[\s\S]*?<mxGeometry\s+[^>]*?\bx=")\d+("\s+[^>]*?\bwidth=")\d+(")/gi, '$1470$2300"');
    // Stage 3 cards -> x="900", width="300"
    xml = xml.replace(/(<mxCell\s+id="(?:out_1|out_2|out_3|exec_dash|comp_view|advisory)"[\s\S]*?<mxGeometry\s+[^>]*?\bx=")\d+("\s+[^>]*?\bwidth=")\d+(")/gi, '$1900$2300"');
  }

  // Remove any legacy template_type_hdr nodes
  xml = xml.replace(/<mxCell\s+id="template_type_hdr"[\s\S]*?<\/mxCell>/gi, '');

  // 10. Validate & Auto-Heal XML via Schema Healer
  const healResult = validateAndHealDrawioXml(xml);
  return healResult.xml;
}

export function heal2DSameTierNodeCollisions(xml: string): string {
  interface NodeItem {
    fullTag: string;
    id: string;
    x: number;
    y: number;
    w: number;
    h: number;
    value: string;
  }

  // 1. Wrap long subtitles into compact multi-line text so they never horizontally bleed outside node borders
  xml = xml.replace(/(value="[^"]*")/gi, (match) => {
    let val = match;
    val = val.replace(/Fallback Loop PCI Gateway Handler/gi, 'Fallback Loop&lt;br&gt;PCI Gateway Handler');
    val = val.replace(/Vector Search &amp; Recommendation Engine/gi, 'Vector Search &amp;&lt;br&gt;Recommendation Engine');
    val = val.replace(/Cloudflare CDN &amp; Next\.js SSR Web Apps/gi, 'Cloudflare CDN &amp;&lt;br&gt;Next.js SSR Web Apps');
    val = val.replace(/Kong Gateway &amp; OAuth OIDC Auth/gi, 'Kong Gateway &amp;&lt;br&gt;OAuth OIDC Auth');
    val = val.replace(/Apollo Router &amp; Schema Stitching/gi, 'Apollo Router &amp;&lt;br&gt;Schema Stitching');
    val = val.replace(/Product Metadata &amp; Pricing APIs/gi, 'Product Metadata &amp;&lt;br&gt;Pricing APIs');
    val = val.replace(/SAP S\/4HANA &amp; Warehouse Connector/gi, 'SAP S/4HANA &amp;&lt;br&gt;Warehouse Connector');
    val = val.replace(/Session Store &amp; Stock Locks/gi, 'Session Store &amp;&lt;br&gt;Stock Locks');
    val = val.replace(/Asynchronous Order Events/gi, 'Asynchronous&lt;br&gt;Order Events');
    val = val.replace(/PostgreSQL Relational Storage/gi, 'PostgreSQL&lt;br&gt;Relational Storage');
    val = val.replace(/Desktop APM &amp; Data Warehouse/gi, 'Desktop APM &amp;&lt;br&gt;Data Warehouse');
    return val;
  });

  // 2. Scan nodes and prevent horizontal overlapping along same Y tiers
  const nodes: NodeItem[] = [];
  const regex = /(<mxCell\s+id="([^"]+)"[^>]*\bvertex="1"[^>]*>([\s\S]*?<mxGeometry\s+(?:[^>]*?\s+)?x="(\d+)"\s+y="(\d+)"\s+width="(\d+)"\s+height="(\d+)"[^>]*>[\s\S]*?<\/mxCell>))/gi;

  let m;
  while ((m = regex.exec(xml)) !== null) {
    const fullTag = m[1];
    const id = m[2];
    if (id.includes('container') || id.includes('subnet') || id.includes('lane') || id.includes('hdr') || id.includes('page') || id.includes('vpc_')) continue;
    const x = parseInt(m[4], 10);
    const y = parseInt(m[5], 10);
    const w = parseInt(m[6], 10);
    const h = parseInt(m[7], 10);
    if (!isNaN(x) && !isNaN(y) && !isNaN(w) && !isNaN(h)) {
      nodes.push({ fullTag, id, x, y, w, h, value: '' });
    }
  }

  if (nodes.length === 0) return xml;

  // Group by Y tier (within 45px vertical tolerance)
  const tiers: NodeItem[][] = [];
  for (const node of nodes) {
    let placed = false;
    for (const tier of tiers) {
      if (Math.abs(tier[0].y - node.y) <= 45) {
        tier.push(node);
        placed = true;
        break;
      }
    }
    if (!placed) {
      tiers.push([node]);
    }
  }

  // Resolve horizontal overlaps per tier
  for (const tier of tiers) {
    tier.sort((a, b) => a.x - b.x);
    for (let i = 0; i < tier.length - 1; i++) {
      const current = tier[i];
      const next = tier[i + 1];
      const minClearanceX = current.x + current.w + 45; // Enforce minimum 45px clear horizontal corridor
      if (minClearanceX > next.x) {
        const shiftX = minClearanceX - next.x;
        for (let j = i + 1; j < tier.length; j++) {
          const oldX = tier[j].x;
          const newX = oldX + shiftX;
          tier[j].x = newX;

          // Replace x in XML string for this cell
          const oldGeomRegex = new RegExp(`(<mxCell\\s+id="${tier[j].id}"[^>]*\\bvertex="1"[^>]*>[\\s\\S]*?<mxGeometry\\s+[^>]*?\\bx=")${oldX}(")`);
          xml = xml.replace(oldGeomRegex, `$1${newX}$2`);
        }
      }
    }
  }

  return xml;
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
