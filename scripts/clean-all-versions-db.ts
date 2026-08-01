import { DatabaseSync } from 'node:sqlite';
import path from 'path';
import { getDefaultXmlForArchitecture } from '../src/lib/architectureTypes';
import { injectUseCaseFlavor } from '../src/lib/diagramCleaner';
import { preflightVerifyAndHealXmlAcrossAll6Audits } from '../src/lib/preflightAuditEngine';

const dbPath = path.join(process.cwd(), 'dev.db');
const db = new DatabaseSync(dbPath);

console.log('🚀 Cleaning all historical diagram versions in dev.db...');

const versions = db.prepare('SELECT id, diagram_id, version_number, xml_content, prompt, architecture_type FROM diagram_versions').all() as any[];

console.log(`Found ${versions.length} total versions to process across all diagrams.`);

let updatedCount = 0;

for (const v of versions) {
  const archType = v.architecture_type || 'conceptual_diagram';
  let xml = v.xml_content || '';
  const prompt = v.prompt || 'Enterprise Platform';

  // If a conceptual_diagram version was saved as a vertical flowchart (missing col_ingestion), restore 3-Stage layout
  if (archType === 'conceptual_diagram' && !xml.includes('col_ingestion')) {
    const backbone = getDefaultXmlForArchitecture('conceptual_diagram', prompt, prompt);
    if (backbone) {
      xml = backbone;
    }
  }

  // Inject domain flavor & apply preflight cleaning (strips dark black bezels, Oncology placeholders, etc.)
  xml = injectUseCaseFlavor(xml, prompt, prompt);
  xml = preflightVerifyAndHealXmlAcrossAll6Audits(xml, archType);

  if (xml !== v.xml_content) {
    db.prepare('UPDATE diagram_versions SET xml_content = ? WHERE id = ?').run(xml, v.id);
    updatedCount++;
  }
}

console.log(`✨ Successfully cleaned and updated ${updatedCount} historical diagram versions in dev.db!`);
