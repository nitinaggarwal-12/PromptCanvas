import { listDiagrams, getDiagramVersions } from '../src/lib/db.ts';

async function readAllDiagrams() {
  console.log('Querying database for all diagrams and their versions...');
  try {
    const diagrams = listDiagrams();
    console.log(`Found ${diagrams.length} diagram(s) in database.\n`);
    
    for (const d of diagrams) {
      console.log(`==================================================`);
      console.log(`Diagram: "${d.name}" (ID: ${d.id})`);
      console.log(`Created: ${d.created_at} | Updated: ${d.updated_at}`);
      
      const versions = getDiagramVersions(d.id);
      console.log(`Versions count: ${versions.length}`);
      
      for (const v of versions) {
        console.log(`  - v${v.version_number}: "${v.comment}" by ${v.created_by} at ${v.created_at}`);
        if (d.name === 'GE' || d.name.includes('GE')) {
          console.log(`    --- XML CONTENT FOR v${v.version_number} ---`);
          console.log(v.xml_content);
          console.log(`    -----------------------------------------`);
        }
      }
    }
  } catch (error) {
    console.error('Failed to read database:', error);
  }
}

readAllDiagrams();
