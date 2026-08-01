import { DatabaseSync } from 'node:sqlite';
import fs from 'fs';
import path from 'path';
import { XMLParser, XMLBuilder } from 'fast-xml-parser';

console.log('🚀 Starting Draw.io V2 Label & Spatial Layout Migration...');

const dbPath = path.join(process.cwd(), 'dev.db');
if (!fs.existsSync(dbPath)) {
  console.error(`❌ Database not found at ${dbPath}`);
  process.exit(1);
}

const db = new DatabaseSync(dbPath);

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  textNodeName: '#text',
  parseAttributeValue: false,
  trimValues: false,
});

const builder = new XMLBuilder({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  textNodeName: '#text',
  format: true,
  suppressEmptyNode: true,
});

function formatEdgeLabelToMax2Lines(text: string): string {
  if (!text) return '';
  const clean = text.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  if (!clean) return '';

  if (clean.length <= 18) return clean;

  const words = clean.split(' ');
  if (words.length <= 2) return clean;

  if (words.length >= 6) {
    const third = Math.ceil(words.length / 3);
    const line1 = words.slice(0, third).join(' ');
    const line2 = words.slice(third, third * 2).join(' ');
    const line3 = words.slice(third * 2).join(' ');
    return `${line1}<br/>${line2}<br/>${line3}`;
  }

  const mid = Math.ceil(words.length / 2);
  return `${words.slice(0, mid).join(' ')}<br/>${words.slice(mid).join(' ')}`;
}

function migrateXmlV2Labels(xmlContent: string): { migratedXml: string; modified: boolean } {
  if (!xmlContent || !xmlContent.includes('<mxGraphModel')) {
    return { migratedXml: xmlContent, modified: false };
  }

  try {
    const parsed = parser.parse(xmlContent);
    const mxCells = parsed?.mxGraphModel?.root?.mxCell;
    if (!mxCells) return { migratedXml: xmlContent, modified: false };

    const cellArray = Array.isArray(mxCells) ? mxCells : [mxCells];
    let modified = false;

    // Build map of cells by id to resolve source/target geometry
    const cellById: Record<string, any> = {};
    for (const cell of cellArray) {
      if (cell['@_id']) cellById[String(cell['@_id'])] = cell;
    }

    for (const cell of cellArray) {
      const isEdge = cell['@_edge'] === '1' || cell['@_edge'] === true;
      const isVertex = cell['@_vertex'] === '1' || cell['@_vertex'] === true;
      let style = String(cell['@_style'] || '');

      // 1. Edge Label Enhancements & Strict V2 Routing Rules
      if (isEdge) {
        // Enforce plain text edge labels & transparent background pill/label rules
        if (!style.includes('labelBackgroundColor=')) {
          style += ';labelBackgroundColor=none;';
          modified = true;
        } else {
          style = style.replace(/labelBackgroundColor=[^;]*/, 'labelBackgroundColor=none');
        }

        if (!style.includes('fontColor=')) {
          style += ';fontColor=#38BDF8;fontStyle=1;fontSize=11;';
          modified = true;
        }

        // Format label text to max 2-3 lines (140px width rule)
        const rawValue = String(cell['@_value'] || '');
        if (rawValue && !rawValue.includes('<br')) {
          const formattedValue = formatEdgeLabelToMax2Lines(rawValue);
          if (formattedValue !== rawValue) {
            cell['@_value'] = formattedValue;
            modified = true;
          }
        }

        // Rhombus tip offset rule & Vertical line side offsets
        const sourceId = String(cell['@_source'] || '');
        const targetId = String(cell['@_target'] || '');
        const sourceCell = cellById[sourceId];
        const targetCell = cellById[targetId];

        const sourceIsRhombus = String(sourceCell?.['@_style'] || '').includes('shape=rhombus') || String(sourceCell?.['@_style'] || '').includes('rhombus');
        const targetIsRhombus = String(targetCell?.['@_style'] || '').includes('shape=rhombus') || String(targetCell?.['@_style'] || '').includes('rhombus');

        if (sourceIsRhombus || targetIsRhombus) {
          if (!style.includes('lblX=')) {
            style += ';lblX=50;lblY=-18;';
            modified = true;
          }
        } else {
          // Vertical vs Horizontal check
          const srcGeo = sourceCell?.mxGeometry?.['@_x'] && sourceCell?.mxGeometry?.['@_y'];
          const tgtGeo = targetCell?.mxGeometry?.['@_x'] && targetCell?.mxGeometry?.['@_y'];
          if (srcGeo && tgtGeo) {
            const dx = Math.abs(Number(targetCell.mxGeometry['@_x']) - Number(sourceCell.mxGeometry['@_x']));
            const dy = Math.abs(Number(targetCell.mxGeometry['@_y']) - Number(sourceCell.mxGeometry['@_y']));
            if (dy > dx * 1.5 && !style.includes('lblX=')) {
              style += ';lblX=28;lblY=-10;align=left;spacingLeft=8;';
              modified = true;
            }
          }
        }

        cell['@_style'] = style;
      }

      // 2. Vertex Node Safety & Text Buffer Margin
      if (isVertex) {
        if (!style.includes('whiteSpace=wrap')) {
          style += ';whiteSpace=wrap;';
          modified = true;
        }
        cell['@_style'] = style;
      }
    }

    if (!modified) return { migratedXml: xmlContent, modified: false };

    if (!Array.isArray(mxCells)) {
      parsed.mxGraphModel.root.mxCell = cellArray[0];
    } else {
      parsed.mxGraphModel.root.mxCell = cellArray;
    }

    const migratedXml = builder.build(parsed);
    return { migratedXml, modified: true };
  } catch (err) {
    return { migratedXml: xmlContent, modified: false };
  }
}

const rows = db.prepare('SELECT id, diagram_id, version_number, xml_content FROM diagram_versions').all() as any[];
console.log(`Found ${rows.length} total diagram versions to audit & migrate.`);

let updatedCount = 0;
const updateStmt = db.prepare('UPDATE diagram_versions SET xml_content = ? WHERE id = ?');

for (const row of rows) {
  const { migratedXml, modified } = migrateXmlV2Labels(row.xml_content);
  if (modified) {
    updateStmt.run(migratedXml, row.id);
    updatedCount++;
  }
}

console.log(`✨ Migrated ${updatedCount} diagram versions to V2 Label & Spatial Layout standards!`);

// Export latest XMLs to diagrams/latest
const outputDir = path.join(process.cwd(), 'diagrams', 'latest');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const diagrams = db.prepare('SELECT id, name, architecture_type FROM diagrams').all() as any[];
let exportedCount = 0;

for (const diagram of diagrams) {
  const versions = db.prepare(
    'SELECT id, version_number, xml_content, architecture_type FROM diagram_versions WHERE diagram_id = ? ORDER BY version_number DESC'
  ).all(diagram.id) as any[];

  if (versions.length === 0) continue;

  const latestVersion = versions[0];
  const sanitizeName = (str: string) => String(str || '').replace(/[^a-zA-Z0-9_-]/g, '_').toLowerCase();

  const fileName = `${sanitizeName(diagram.name)}__${sanitizeName(diagram.architecture_type || 'conceptual_diagram')}__v${latestVersion.version_number}.xml`;
  const filePath = path.join(outputDir, fileName);

  fs.writeFileSync(filePath, latestVersion.xml_content, 'utf-8');
  exportedCount++;
}

console.log(`📦 Updated all ${exportedCount} latest XML files in diagrams/latest/`);
