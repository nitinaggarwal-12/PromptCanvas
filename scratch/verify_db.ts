import { 
  createDiagram, 
  listDiagrams, 
  getDiagram, 
  saveDiagramVersion, 
  getDiagramVersions, 
  getDiagramVersion, 
  getLatestDiagramVersion, 
  deleteDiagram 
} from '../src/lib/db.ts'; // Use .ts extension or just import directly if node resolves it

async function runTests() {
  console.log('🚀 Starting Database Helper Verification Tests...\n');

  // Test 1: Create a diagram
  console.log('Test 1: Creating a new diagram...');
  const initialXml = '<mxfile><diagram id="1">Initial Diagram</diagram></mxfile>';
  const { diagram, version } = createDiagram('Test Architecture', initialXml, 'Initial AI generation');
  
  console.log('✅ Diagram created:', diagram);
  console.log('✅ Version 1 created:', version);
  if (!diagram || !version || version.version_number !== 1) {
    throw new Error('Test 1 Failed: Diagram or Version 1 not created correctly.');
  }
  console.log('--------------------------------------------------\n');

  // Test 2: Save a new version
  console.log('Test 2: Saving a new version...');
  const updatedXml = '<mxfile><diagram id="1">Updated Diagram v2</diagram></mxfile>';
  const version2 = saveDiagramVersion(diagram.id, updatedXml, 'Manual refinement', 'User');
  
  console.log('✅ Version 2 saved:', version2);
  if (!version2 || version2.version_number !== 2 || version2.xml_content !== updatedXml) {
    throw new Error('Test 2 Failed: Version 2 not saved correctly.');
  }
  console.log('--------------------------------------------------\n');

  // Test 3: List diagrams
  console.log('Test 3: Listing all diagrams...');
  const diagrams = listDiagrams();
  console.log(`✅ Found ${diagrams.length} diagram(s).`);
  console.log(diagrams);
  if (diagrams.length === 0 || !diagrams.some(d => d.id === diagram.id)) {
    throw new Error('Test 3 Failed: Created diagram not found in list.');
  }
  console.log('--------------------------------------------------\n');

  // Test 4: Get diagram details and versions
  console.log('Test 4: Retrieving diagram details and versions...');
  const retrievedDiagram = getDiagram(diagram.id);
  const versions = getDiagramVersions(diagram.id);
  const latestVersion = getLatestDiagramVersion(diagram.id);

  console.log('✅ Retrieved Diagram:', retrievedDiagram);
  console.log(`✅ Retrieved ${versions.length} version(s):`);
  versions.forEach(v => console.log(`  - v${v.version_number}: "${v.comment}" by ${v.created_by} at ${v.created_at}`));
  console.log('✅ Latest Version:', latestVersion);

  if (!retrievedDiagram || versions.length !== 2 || latestVersion?.version_number !== 2) {
    throw new Error('Test 4 Failed: Diagram details or versions list incorrect.');
  }
  console.log('--------------------------------------------------\n');

  // Test 5: Get specific version
  console.log('Test 5: Retrieving specific version...');
  const retrievedV1 = getDiagramVersion(version.id);
  console.log('✅ Retrieved v1:', retrievedV1?.xml_content);
  if (!retrievedV1 || retrievedV1.xml_content !== initialXml) {
    throw new Error('Test 5 Failed: Could not retrieve version 1 correctly.');
  }
  console.log('--------------------------------------------------\n');

  // Test 6: Delete diagram
  console.log('Test 6: Deleting diagram (cascade delete check)...');
  deleteDiagram(diagram.id);
  
  const deletedDiag = getDiagram(diagram.id);
  const deletedVersions = getDiagramVersions(diagram.id);
  
  console.log('✅ Diagram query after delete:', deletedDiag);
  console.log('✅ Versions query after delete (length):', deletedVersions.length);
  
  if (deletedDiag !== null || deletedVersions.length !== 0) {
    throw new Error('Test 6 Failed: Diagram or its versions were not deleted.');
  }
  console.log('--------------------------------------------------\n');

  console.log('🎉 All Database Helper Tests Passed Successfully! 🎉');
}

runTests().catch(err => {
  console.error('❌ Verification Tests Failed:', err);
  process.exit(1);
});
