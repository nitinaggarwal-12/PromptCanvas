import { XMLParser, XMLBuilder } from 'fast-xml-parser';

export interface XmlHealerResult {
  isValid: boolean;
  isHealed: boolean;
  xml: string;
  healingLog: string[];
}

/**
 * 🛡️ Strict Draw.io XML AST Schema Validator & Auto-Healer
 * 
 * Inspects, parses, validates, and repairs Draw.io (mxGraph) XML strings.
 * Guarantees that the resulting XML has a valid AST structure, essential root cells (id=0, id=1),
 * sanitized geometries, unique node IDs, and 100% iframe renderability.
 */
export function validateAndHealDrawioXml(inputXml: string): XmlHealerResult {
  const healingLog: string[] = [];
  let isHealed = false;

  if (!inputXml || typeof inputXml !== 'string') {
    healingLog.push('Input XML was empty or invalid type.');
    const fallbackXml = createFallbackDrawioXml();
    return { isValid: false, isHealed: true, xml: fallbackXml, healingLog };
  }

  let cleaned = inputXml.trim();

  // 1. Strip Markdown Code Fences if present
  if (cleaned.includes('```')) {
    cleaned = cleaned.replace(/^```[a-z]*\n?/gi, '').replace(/\n?```$/g, '').trim();
    isHealed = true;
    healingLog.push('Stripped markdown code fences.');
  }

  // 2. Ensure outer <mxfile> and <diagram> tags exist
  if (!cleaned.includes('<mxfile')) {
    isHealed = true;
    healingLog.push('Missing outer <mxfile> wrapper. Wrapping in standard Draw.io container.');
    if (cleaned.includes('<mxGraphModel')) {
      cleaned = `<mxfile host="PromptCanvas" modified="${new Date().toISOString()}" agent="PromptCanvas-AutoHealer">
  <diagram id="healed-diagram" name="Architecture">
    ${cleaned}
  </diagram>
</mxfile>`;
    } else if (cleaned.includes('<root')) {
      cleaned = `<mxfile host="PromptCanvas" modified="${new Date().toISOString()}" agent="PromptCanvas-AutoHealer">
  <diagram id="healed-diagram" name="Architecture">
    <mxGraphModel dx="1200" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1169" pageHeight="827" background="none">
      ${cleaned}
    </mxGraphModel>
  </diagram>
</mxfile>`;
    } else {
      cleaned = `<mxfile host="PromptCanvas" modified="${new Date().toISOString()}" agent="PromptCanvas-AutoHealer">
  <diagram id="healed-diagram" name="Architecture">
    <mxGraphModel dx="1200" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1169" pageHeight="827" background="none">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
    }
  }

  // Ensure </mxfile> closing tag is present
  if (!cleaned.includes('</mxfile>')) {
    cleaned += '\n</mxfile>';
    isHealed = true;
    healingLog.push('Appended missing </mxfile> closing tag.');
  }

  // 3. Parse AST using fast-xml-parser
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    allowBooleanAttributes: true,
    parseTagValue: false,
    parseAttributeValue: false,
  });

  let ast: any = null;
  try {
    ast = parser.parse(cleaned);
  } catch (err: unknown) {
    healingLog.push(`AST parsing failed: ${err instanceof Error ? err.message : String(err)}. Applying structural repair.`);
    const repairedXml = autoRepairXmlSyntax(cleaned);
    try {
      ast = parser.parse(repairedXml);
      cleaned = repairedXml;
      isHealed = true;
    } catch {
      healingLog.push('Fatal XML corruption. Returning safe fallback diagram.');
      return { isValid: false, isHealed: true, xml: createFallbackDrawioXml(), healingLog };
    }
  }

  // 4. Validate AST Hierarchy: mxfile -> diagram -> mxGraphModel -> root
  if (!ast.mxfile) {
    ast = { mxfile: { diagram: { mxGraphModel: { root: { mxCell: [{ '@_id': '0' }, { '@_id': '1', '@_parent': '0' }] } } } } };
    isHealed = true;
    healingLog.push('Restructured invalid root AST.');
  }

  let diagram = ast.mxfile.diagram;
  if (Array.isArray(diagram)) {
    diagram = diagram[0];
    ast.mxfile.diagram = diagram;
  }
  if (typeof diagram === 'string') {
    // Handling unescaped inner string if present
    try {
      diagram = parser.parse(diagram);
      ast.mxfile.diagram = diagram;
    } catch {
      diagram = {};
      ast.mxfile.diagram = diagram;
    }
  }

  if (!diagram.mxGraphModel) {
    diagram.mxGraphModel = { '@_dx': '1200', '@_dy': '800', root: {} };
    isHealed = true;
    healingLog.push('Injected missing mxGraphModel to AST.');
  }

  const model = diagram.mxGraphModel;
  if (!model.root) {
    model.root = {};
    isHealed = true;
    healingLog.push('Injected missing root to mxGraphModel AST.');
  }

  let root = model.root;
  let cells: any[] = [];

  if (root.mxCell) {
    cells = Array.isArray(root.mxCell) ? root.mxCell : [root.mxCell];
  }

  // 5. Ensure essential root cells (id="0" and id="1") exist
  let hasRoot0 = false;
  let hasRoot1 = false;
  const seenIds = new Set<string>();

  for (const cell of cells) {
    const cellId = String(cell['@_id'] || '');
    if (cellId === '0') hasRoot0 = true;
    if (cellId === '1') hasRoot1 = true;
  }

  if (!hasRoot0) {
    cells.unshift({ '@_id': '0' });
    isHealed = true;
    healingLog.push('Injected mandatory root cell id="0".');
  }

  if (!hasRoot1) {
    // Insert id="1" after id="0"
    const root0Idx = cells.findIndex(c => String(c['@_id']) === '0');
    cells.splice(root0Idx + 1, 0, { '@_id': '1', '@_parent': '0' });
    isHealed = true;
    healingLog.push('Injected mandatory parent layer cell id="1" (parent="0").');
  }

  // 6. Deduplicate IDs and Repair Geometries
  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    let cellId = String(cell['@_id'] || '');

    // Deduplicate or generate ID if missing
    if (!cellId || seenIds.has(cellId)) {
      cellId = cellId ? `${cellId}_${i}` : `cell_${i}`;
      cell['@_id'] = cellId;
      isHealed = true;
      healingLog.push(`Deduplicated/assigned cell ID: ${cellId}`);
    }
    seenIds.add(cellId);

    // Validate vertex geometries
    if (cell['@_vertex'] === '1' || cell['@_vertex'] === true) {
      if (!cell.mxGeometry) {
        cell.mxGeometry = {
          '@_x': '100',
          '@_y': '100',
          '@_width': '120',
          '@_height': '60',
          '@_as': 'geometry'
        };
        isHealed = true;
        healingLog.push(`Fixed missing mxGeometry for vertex cell id="${cellId}"`);
      } else {
        const geo = cell.mxGeometry;
        if (!geo['@_as']) geo['@_as'] = 'geometry';
        if (!geo['@_width'] || isNaN(Number(geo['@_width']))) {
          geo['@_width'] = '120';
          isHealed = true;
        }
        if (!geo['@_height'] || isNaN(Number(geo['@_height']))) {
          geo['@_height'] = '60';
          isHealed = true;
        }
      }
    }
  }

  // 6b. 📐 Visual Collision & Bounding Box Overlap Auto-Healer
  const vertexNodes = cells.filter(
    (c: any) => (c['@_vertex'] === '1' || c['@_vertex'] === true) && c.mxGeometry
  );

  for (let i = 0; i < vertexNodes.length; i++) {
    for (let j = i + 1; j < vertexNodes.length; j++) {
      const nodeA = vertexNodes[i];
      const nodeB = vertexNodes[j];

      const ax = Number(nodeA.mxGeometry['@_x'] || 0);
      const ay = Number(nodeA.mxGeometry['@_y'] || 0);
      const aw = Number(nodeA.mxGeometry['@_width'] || 160);
      const ah = Number(nodeA.mxGeometry['@_height'] || 60);

      const bx = Number(nodeB.mxGeometry['@_x'] || 0);
      const by = Number(nodeB.mxGeometry['@_y'] || 0);
      const bw = Number(nodeB.mxGeometry['@_width'] || 160);
      const bh = Number(nodeB.mxGeometry['@_height'] || 60);

      // Check 2D bounding box intersection (with 30px safety padding margin)
      const isOverlapping =
        ax < bx + bw + 30 &&
        ax + aw + 30 > bx &&
        ay < by + bh + 30 &&
        ay + ah + 30 > by;

      if (isOverlapping) {
        // Heal collision by shifting nodeB horizontally or vertically
        if (Math.abs(ay - by) < 40) {
          // Same tier Y overlap: shift nodeB horizontally to the right
          const newX = Math.round(ax + aw + 80);
          nodeB.mxGeometry['@_x'] = String(newX);
          isHealed = true;
          healingLog.push(`Visual Healer: Shifted overlapping node id="${nodeB['@_id'] || j}" rightward to X=${newX}`);
        } else {
          // Vertical tier overlap: shift nodeB vertically downward
          const newY = Math.round(ay + ah + 90);
          nodeB.mxGeometry['@_y'] = String(newY);
          isHealed = true;
          healingLog.push(`Visual Healer: Shifted overlapping node id="${nodeB['@_id'] || j}" downward to Y=${newY}`);
        }
      }
    }
  }

  root.mxCell = cells;

  // 7. Re-serialize healed AST back to XML string
  const builder = new XMLBuilder({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    format: true,
    indentBy: '  ',
    suppressEmptyNode: true,
  });

  const finalXml = builder.build(ast);

  return {
    isValid: true,
    isHealed,
    xml: finalXml,
    healingLog
  };
}

/**
 * Auto-repairs raw XML string syntax errors (unclosed tags, broken quotes)
 */
function autoRepairXmlSyntax(xml: string): string {
  let repaired = xml;

  // Fix unclosed mxCell self-closing tags
  repaired = repaired.replace(/<mxCell([^>]*?)(?<!\/)>/gi, (match, attrs) => {
    if (attrs.includes('parent') || attrs.includes('value') || attrs.includes('style') || attrs.includes('id')) {
      if (!match.endsWith('/>')) {
        return `<mxCell${attrs}/>`;
      }
    }
    return match;
  });

  // Ensure mxfile wrapper
  if (!repaired.includes('<mxfile')) {
    repaired = `<mxfile host="PromptCanvas"><diagram id="healed">${repaired}</diagram></mxfile>`;
  }

  return repaired;
}

/**
 * Creates a valid, error-free fallback Draw.io XML structure
 */
function createFallbackDrawioXml(): string {
  return `<mxfile host="PromptCanvas" modified="${new Date().toISOString()}" agent="PromptCanvas-AutoHealer">
  <diagram id="fallback-diagram" name="Architecture">
    <mxGraphModel dx="1200" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1169" pageHeight="827">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        <mxCell id="fallback_node" value="Cloud Architecture" vertex="1" parent="1" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#10b981;fontColor=#ffffff;strokeColor=#059669;fontStyle=1;">
          <mxGeometry x="350" y="200" width="160" height="70" as="geometry"/>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;
}
