import { getDiagramVersions, listDiagrams } from '../src/lib/db.ts';
import { writeFileSync } from 'fs';
import { join } from 'path';

function exportGeXml() {
  console.log('Exporting GE diagram XML...');
  try {
    const diagrams = listDiagrams();
    const geDiagram = diagrams.find(d => d.name === 'GE');
    if (!geDiagram) {
      console.error('Diagram "GE" not found.');
      return;
    }
    
    const versions = getDiagramVersions(geDiagram.id);
    const v2 = versions.find(v => v.version_number === 2);
    if (!v2) {
      console.error('Version 2 of "GE" not found.');
      // Let's check if there is v1
      const v1 = versions.find(v => v.version_number === 1);
      if (v1) {
        console.log('Found v1, exporting v1 instead...');
        writeFileSync(join(process.cwd(), 'scratch', 'ge_v1.xml'), v1.xml_content);
        console.log('Saved to scratch/ge_v1.xml');
      }
      return;
    }
    
    writeFileSync(join(process.cwd(), 'scratch', 'ge_v2.xml'), v2.xml_content);
    console.log('✅ Successfully saved GE v2 XML to scratch/ge_v2.xml');
  } catch (error) {
    console.error('Export failed:', error);
  }
}

exportGeXml();
