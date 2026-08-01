import { XMLParser } from 'fast-xml-parser';

export type ErrorCode =
  | 'XML_INVALID'
  | 'EDGE_DANGLING'
  | 'GEOMETRY_MISSING'
  | 'OVERLAP'
  | 'OUT_OF_CONTAINER'
  | 'OUT_OF_BOUNDS'
  | 'ORPHAN_NODE';

export interface ValidationError {
  code: ErrorCode;
  cells: string[];
  detail: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
}

interface ParsedVertex {
  id: string;
  parent: string;
  isContainer: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  // Computed absolute coordinates on canvas
  absX: number;
  absY: number;
}

interface ParsedEdge {
  id: string;
  source: string;
  target: string;
}

export function validateDrawioXml(xmlString: string): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];

  if (!xmlString || typeof xmlString !== 'string' || xmlString.trim().length === 0) {
    return {
      valid: false,
      errors: [{ code: 'XML_INVALID', cells: [], detail: 'XML input is empty' }],
      warnings: [],
    };
  }

  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
  });

  let parsed: any;
  try {
    parsed = parser.parse(xmlString);
  } catch (err: any) {
    return {
      valid: false,
      errors: [{ code: 'XML_INVALID', cells: [], detail: `XML Parse Failure: ${err?.message}` }],
      warnings: [],
    };
  }

  const mxfile = parsed?.mxfile;
  const diagram = mxfile?.diagram;
  const graphModel = diagram?.mxGraphModel || parsed?.mxGraphModel;
  const root = graphModel?.root;

  if (!root) {
    return {
      valid: false,
      errors: [{ code: 'XML_INVALID', cells: [], detail: 'Missing mxGraphModel or root element' }],
      warnings: [],
    };
  }

  let rawCells = root.mxCell;
  if (!rawCells) {
    return {
      valid: false,
      errors: [{ code: 'XML_INVALID', cells: [], detail: 'Missing mxCell elements inside root' }],
      warnings: [],
    };
  }

  if (!Array.isArray(rawCells)) {
    rawCells = [rawCells];
  }

  const cellIdSet = new Set<string>();
  const duplicateIds: string[] = [];

  let hasCell0 = false;
  let hasCell1 = false;

  const verticesMap = new Map<string, ParsedVertex>();
  const edgesMap = new Map<string, ParsedEdge>();

  for (const cell of rawCells) {
    const id = cell['@_id'];
    if (!id) {
      errors.push({ code: 'XML_INVALID', cells: [], detail: 'Cell missing id attribute' });
      continue;
    }

    if (id === '0') hasCell0 = true;
    if (id === '1') hasCell1 = true;

    if (cellIdSet.has(id)) {
      duplicateIds.push(id);
    }
    cellIdSet.add(id);

    const isVertex = cell['@_vertex'] === '1' || cell['@_vertex'] === 1;
    const isEdge = cell['@_edge'] === '1' || cell['@_edge'] === 1;

    if (isVertex) {
      const parent = cell['@_parent'] || '1';
      const style = cell['@_style'] || '';
      const isContainer = style.includes('container=1');

      const geom = cell.mxGeometry;
      if (!geom) {
        errors.push({
          code: 'GEOMETRY_MISSING',
          cells: [id],
          detail: `Vertex "${id}" is missing mxGeometry`,
        });
        continue;
      }

      const x = parseFloat(geom['@_x'] || '0');
      const y = parseFloat(geom['@_y'] || '0');
      const width = parseFloat(geom['@_width'] || '0');
      const height = parseFloat(geom['@_height'] || '0');

      if (!isContainer && (width < 120 || height < 60)) {
        errors.push({
          code: 'GEOMETRY_MISSING',
          cells: [id],
          detail: `Vertex "${id}" dimensions (${width}x${height}) below minimum 120x60`,
        });
      }

      if (x < 0 || y < 0) {
        errors.push({
          code: 'OUT_OF_BOUNDS',
          cells: [id],
          detail: `Vertex "${id}" has negative relative coordinates (${x}, ${y})`,
        });
      }

      verticesMap.set(id, {
        id,
        parent,
        isContainer,
        x,
        y,
        width,
        height,
        absX: x,
        absY: y,
      });
    } else if (isEdge) {
      const source = cell['@_source'];
      const target = cell['@_target'];
      edgesMap.set(id, { id, source, target });
    }
  }

  if (!hasCell0 || !hasCell1) {
    errors.push({
      code: 'XML_INVALID',
      cells: [],
      detail: 'Missing required root cells "0" or "1"',
    });
  }

  if (duplicateIds.length > 0) {
    errors.push({
      code: 'XML_INVALID',
      cells: duplicateIds,
      detail: `Duplicate cell IDs found: ${duplicateIds.join(', ')}`,
    });
  }

  // Compute absolute coordinates on canvas
  for (const [id, v] of verticesMap.entries()) {
    if (v.parent !== '1' && verticesMap.has(v.parent)) {
      const parentV = verticesMap.get(v.parent)!;
      v.absX = parentV.x + v.x;
      v.absY = parentV.y + v.y;
    }
  }

  // Check EDGE_DANGLING
  const connectedNodeIds = new Set<string>();
  for (const [edgeId, edge] of edgesMap.entries()) {
    if (!edge.source || !verticesMap.has(edge.source)) {
      errors.push({
        code: 'EDGE_DANGLING',
        cells: [edgeId],
        detail: `Edge "${edgeId}" source "${edge.source}" is not a valid vertex`,
      });
    } else {
      connectedNodeIds.add(edge.source);
      if (verticesMap.get(edge.source)?.isContainer) {
        errors.push({
          code: 'EDGE_DANGLING',
          cells: [edgeId],
          detail: `Edge "${edgeId}" is improperly attached to container vertex "${edge.source}"`,
        });
      }
    }

    if (!edge.target || !verticesMap.has(edge.target)) {
      errors.push({
        code: 'EDGE_DANGLING',
        cells: [edgeId],
        detail: `Edge "${edgeId}" target "${edge.target}" is not a valid vertex`,
      });
    } else {
      connectedNodeIds.add(edge.target);
      if (verticesMap.get(edge.target)?.isContainer) {
        errors.push({
          code: 'EDGE_DANGLING',
          cells: [edgeId],
          detail: `Edge "${edgeId}" is improperly attached to container vertex "${edge.target}"`,
        });
      }
    }
  }

  // Check OUT_OF_BOUNDS (max extent > 5000x5000)
  for (const [id, v] of verticesMap.entries()) {
    if (v.absX + v.width > 5000 || v.absY + v.height > 5000) {
      errors.push({
        code: 'OUT_OF_BOUNDS',
        cells: [id],
        detail: `Vertex "${id}" extends beyond 5000x5000 canvas bounds (extent: ${v.absX + v.width}x${v.absY + v.height})`,
      });
    }
  }

  // Check OUT_OF_CONTAINER
  for (const [id, v] of verticesMap.entries()) {
    if (!v.isContainer && v.parent !== '1' && verticesMap.has(v.parent)) {
      const parentV = verticesMap.get(v.parent)!;
      // Top label band (top 40px)
      if (v.y < 40) {
        errors.push({
          code: 'OUT_OF_CONTAINER',
          cells: [id, parentV.id],
          detail: `Child vertex "${id}" (y=${v.y}) overlaps container top-label band (top 40px) of parent "${parentV.id}"`,
        });
      }
      // Right & Bottom padding (20px)
      if (v.x + v.width > parentV.width - 20) {
        errors.push({
          code: 'OUT_OF_CONTAINER',
          cells: [id, parentV.id],
          detail: `Child vertex "${id}" right edge (${v.x + v.width}px) exceeds parent "${parentV.id}" width minus 20px padding (${parentV.width - 20}px)`,
        });
      }
      if (v.y + v.height > parentV.height - 20) {
        errors.push({
          code: 'OUT_OF_CONTAINER',
          cells: [id, parentV.id],
          detail: `Child vertex "${id}" bottom edge (${v.y + v.height}px) exceeds parent "${parentV.id}" height minus 20px padding (${parentV.height - 20}px)`,
        });
      }
    }
  }

  // Check OVERLAP between sibling non-container vertices (with 40px gap requirement)
  const verticesList = Array.from(verticesMap.values()).filter((v) => !v.isContainer);
  for (let i = 0; i < verticesList.length; i++) {
    for (let j = i + 1; j < verticesList.length; j++) {
      const v1 = verticesList[i];
      const v2 = verticesList[j];

      // Check siblings (same parent)
      if (v1.parent === v2.parent) {
        // Gap check: minimum 40px gap between sibling bounding boxes
        const gapX = Math.max(v1.x - (v2.x + v2.width), v2.x - (v1.x + v1.width));
        const gapY = Math.max(v1.y - (v2.y + v2.height), v2.y - (v1.y + v1.height));

        const intersects = !(
          v1.x + v1.width <= v2.x ||
          v2.x + v2.width <= v1.x ||
          v1.y + v1.height <= v2.y ||
          v2.y + v2.height <= v1.y
        );

        if (intersects || (gapX < 40 && gapY < 40 && gapX < 0 && gapY < 0)) {
          errors.push({
            code: 'OVERLAP',
            cells: [v1.id, v2.id],
            detail: `Overlap or insufficient safety gap (<40px) between sibling nodes "${v1.id}" and "${v2.id}"`,
          });
        }
      }
    }
  }

  // Check ORPHAN_NODE (warning, not error)
  for (const [id, v] of verticesMap.entries()) {
    if (!v.isContainer && !connectedNodeIds.has(id)) {
      warnings.push({
        code: 'ORPHAN_NODE',
        cells: [id],
        detail: `Vertex "${id}" has zero connected edges`,
      });
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}
