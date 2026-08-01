import { runSchemaTests } from './unit/schema.test';
import { runValidatorTests } from './unit/validator.test';
import { runElkDeterminismTests } from './unit/elk-determinism.test';
import { runXmlToGraphTests } from './unit/xmlToGraph.test';
import { runGoldenPipelineTests } from './golden/golden-pipeline.test';

async function main() {
  console.log('🚀 Running Complete Pipeline V2 Test Suite...');
  const start = Date.now();

  const schemaOk = runSchemaTests();
  const validatorOk = runValidatorTests();
  const elkOk = await runElkDeterminismTests();
  const xmlToGraphOk = runXmlToGraphTests();
  const goldenOk = await runGoldenPipelineTests();

  const totalTime = Date.now() - start;

  console.log('\n========================================');
  console.log(`Test Execution Time: ${totalTime}ms`);
  if (schemaOk && validatorOk && elkOk && xmlToGraphOk && goldenOk) {
    console.log('🎉 ALL TESTS PASSED SUCCESSFULLY! (100% Green)');
    process.exit(0);
  } else {
    console.error('❌ TEST SUITE FAILED (See errors above)');
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Fatal Test Runner Error:', err);
  process.exit(1);
});
