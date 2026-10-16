import { validateAndHealDrawioXml } from '../src/lib/xmlHealer';
import { preflightVerifyAndHealXmlAcrossAll6Audits } from '../src/lib/preflightAuditEngine';
import { executeGcpPromptModification } from '../src/lib/gcpCoPilotModifier';
import { synthesizePromptDrivenDiagramXml } from '../src/lib/promptDrivenDiagramSynthesizer';
import { runTruthfulnessAndGroundingCertification } from '../src/lib/truthfulnessGroundingEngine';
import {
  getAutoSavedDraftBlueprints,
  healStubOrOracleDiagramXml,
} from '../src/lib/draftMicroVersionStore';

function assert(condition: boolean, message: string): void {
  if (!condition) {
    console.error(`❌ ASSERTION FAILED: ${message}`);
    process.exit(1);
  }
  console.log(`✅ PASS: ${message}`);
}

async function main() {
  console.log('================================================================================');
  console.log('🔬 Running Blank Canvas, Oracle@Google Exadata EBS & Fail-Closed Audit Gate');
  console.log('================================================================================');

  // 1. Blank Canvas Preservation & 0% Fail-Closed Audit
  const rawBlankXml = `<mxfile host="app.diagrams.net"><diagram id="blank-canvas" name="Blank Canvas"><mxGraphModel data-blank-canvas="true" dx="1440" dy="900" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1440" pageHeight="900" background="#FFFFFF"><root><mxCell id="0"/><mxCell id="1" parent="0"/></root></mxGraphModel></diagram></mxfile>`;

  const healedBlank = validateAndHealDrawioXml(rawBlankXml, 'canonical_blank');
  assert(
    healedBlank.xml.includes('data-blank-canvas="true"'),
    'validateAndHealDrawioXml preserves data-blank-canvas="true" marker'
  );
  assert(
    (healedBlank.xml.match(/vertex="1"/g) || []).length === 0,
    'validateAndHealDrawioXml keeps 0 vertices on Blank Canvas (0 fallback Agentic AI injection)'
  );
  assert(
    !healedBlank.xml.includes('Enterprise Governed Agentic AI Platform'),
    'validateAndHealDrawioXml does not inject Enterprise Governed Agentic AI Platform into Blank Canvas'
  );

  const preflightBlank = preflightVerifyAndHealXmlAcrossAll6Audits(rawBlankXml, 'canonical_blank');
  assert(
    (preflightBlank.match(/vertex="1"/g) || []).length === 0,
    'preflightVerifyAndHealXmlAcrossAll6Audits preserves 0 vertices on Blank Canvas'
  );

  const blankDossier = await runTruthfulnessAndGroundingCertification({
    prompt: 'Blank Canvas Initialized',
    xmlContent: rawBlankXml,
    blueprintId: 'blank',
  });
  assert(
    blankDossier.scores.overallCompositeScore === 0,
    `Blank Canvas overallCompositeScore === 0 (got ${blankDossier.scores.overallCompositeScore}%)`
  );
  assert(
    blankDossier.scores.logicalMissionCompleteness === 0,
    `Blank Canvas logicalMissionCompleteness === 0 (got ${blankDossier.scores.logicalMissionCompleteness}%)`
  );
  assert(
    blankDossier.provenanceLedger[3]?.verdict === 'FAILED_INCOMPLETE_STUB',
    `Blank Canvas Stage 4 verdict === 'FAILED_INCOMPLETE_STUB' (got ${blankDossier.provenanceLedger[3]?.verdict})`
  );

  // 2. 1-Box Stub Fail-Closed Rejection (Never 100% Certified)
  const oraclePrompt =
    'Create an architecture diagram showing oracle@google for ebuisness suite running on exadata';
  const oneBoxStubXml = `<mxfile host="app.diagrams.net"><diagram id="stub" name="Stub"><mxGraphModel dx="1440" dy="900"><root><mxCell id="0"/><mxCell id="1" parent="0"/><mxCell id="copilot_mod_custom_box_0" value="&lt;b&gt;Create an architecture diagram showing oracle@g...&lt;/b&gt;&lt;br/&gt;Prompt-Requested Component • Zero-Trust Enforced" style="rounded=1;whiteSpace=wrap;html=1;" vertex="1" parent="1"><mxGeometry x="660" y="695" width="310" height="72" as="geometry"/></mxCell></root></mxGraphModel></diagram></mxfile>`;

  const stubDossier = await runTruthfulnessAndGroundingCertification({
    prompt: oraclePrompt,
    xmlContent: oneBoxStubXml,
    blueprintId: 'blank',
  });
  assert(
    stubDossier.scores.overallCompositeScore <= 30,
    `1-Box Stub fails closed with overallCompositeScore <= 30% (got ${stubDossier.scores.overallCompositeScore}%)`
  );
  assert(
    stubDossier.scores.logicalMissionCompleteness <= 15,
    `1-Box Stub logicalMissionCompleteness <= 15% (got ${stubDossier.scores.logicalMissionCompleteness}%)`
  );
  assert(
    stubDossier.provenanceLedger[3]?.verdict === 'FAILED_INCOMPLETE_STUB',
    `1-Box Stub Stage 4 verdict === 'FAILED_INCOMPLETE_STUB' (got ${stubDossier.provenanceLedger[3]?.verdict})`
  );

  // 3. Full Oracle Database@Google Cloud for E-Business Suite on Exadata Synthesis
  const oracleModResult = executeGcpPromptModification(rawBlankXml, oraclePrompt, 'blank');
  const oracleXml = oracleModResult.updatedXml;
  const oracleVertices = (oracleXml.match(/vertex="1"/g) || []).length;
  const oracleEdges = (oracleXml.match(/edge="1"/g) || []).length;

  assert(
    oracleXml.includes('id="oracle-at-google-ebs-exadata-2026"'),
    'Oracle@Google Exadata EBS prompt synthesizes canonical id="oracle-at-google-ebs-exadata-2026" diagram'
  );
  assert(
    oracleVertices >= 20,
    `Oracle@Google Exadata EBS diagram contains >= 20 vertices (got ${oracleVertices})`
  );
  assert(
    oracleEdges >= 15,
    `Oracle@Google Exadata EBS diagram contains >= 15 orthogonal edges (got ${oracleEdges})`
  );
  assert(
    !oracleXml.includes('data-blank-canvas="true"'),
    'Synthesized Oracle@Google Exadata EBS diagram strips data-blank-canvas="true"'
  );

  const requiredOracleTokens = [
    'Oracle Database@Google Cloud',
    'E-Business Suite (EBS R12.2)',
    'Exadata X10M',
    'Partner Interconnect',
    'Cloud Filestore Enterprise',
    'APPL_TOP',
    'WebLogic',
    'Concurrent Processing',
    'Active Data Guard',
    'GoldenGate',
    'Google Cloud Cortex for Oracle EBS',
  ];
  for (const token of requiredOracleTokens) {
    assert(
      oracleXml.includes(token),
      `Oracle@Google Exadata EBS diagram includes grounded architectural component "${token}"`
    );
  }

  // 4. Full Oracle@Google Exadata EBS Audit Certification
  const oracleDossier = await runTruthfulnessAndGroundingCertification({
    prompt: oraclePrompt,
    xmlContent: oracleXml,
    blueprintId: 'blank',
  });
  assert(
    oracleDossier.scores.overallCompositeScore >= 96,
    `Full Oracle@Google Exadata EBS diagram certifies at >= 96% (got ${oracleDossier.scores.overallCompositeScore}%)`
  );
  assert(
    oracleDossier.scores.promptRelevance === 100,
    `Full Oracle@Google Exadata EBS diagram promptRelevance === 100% (got ${oracleDossier.scores.promptRelevance}%)`
  );
  assert(
    oracleDossier.provenanceLedger[3]?.verdict === 'CERTIFIED',
    `Full Oracle@Google Exadata EBS Stage 4 verdict === 'CERTIFIED'`
  );

  // 5. General Freeform Creation Prompt on Blank Canvas
  const retailPrompt =
    'Create an architecture diagram for a multi-region retail inventory platform on Google Cloud';
  const retailMod = executeGcpPromptModification(rawBlankXml, retailPrompt, 'blank');
  const retailVertices = (retailMod.updatedXml.match(/vertex="1"/g) || []).length;
  const retailEdges = (retailMod.updatedXml.match(/edge="1"/g) || []).length;
  assert(
    retailVertices >= 10 && retailEdges >= 6,
    `General freeform prompt on Blank Canvas synthesizes multi-tier diagram (${retailVertices} vertices, ${retailEdges} edges)`
  );
  assert(
    !retailMod.updatedXml.includes('copilot_mod_custom_box_0'),
    'General freeform prompt on Blank Canvas does not fall back to 1-box copilot_mod_custom_box_0 stub'
  );

  // 6. Saved Architectures Library (/library) Seed & Stale 1-Box Self-Healing
  const seededDrafts = getAutoSavedDraftBlueprints();
  const oracleSeed = seededDrafts.find((d) => d.id === 'DRAFT-ORACLE-EXADATA-EBS-V1-0-1');
  const oracleSeedXml = oracleSeed?.latest_xml || '';
  assert(
    Boolean(oracleSeed) &&
      (oracleSeedXml.match(/vertex="1"/g) || []).length === 23 &&
      (oracleSeedXml.match(/edge="1"/g) || []).length === 17,
    'getAutoSavedDraftBlueprints() seeds DRAFT-ORACLE-EXADATA-EBS-V1-0-1 with 23 vertices and 17 edges'
  );
  assert(
    Array.isArray(oracleSeed?.versions) && (oracleSeed?.versions.length || 0) === 2,
    'DRAFT-ORACLE-EXADATA-EBS-V1-0-1 includes 2 versions (v1.0.1 full 23-vertex architecture + v1.0.0 blank canvas baseline)'
  );

  const healedFromStaleStub = healStubOrOracleDiagramXml(
    oneBoxStubXml,
    oraclePrompt,
    'Oracle@googl...'
  ).xml;
  assert(
    healedFromStaleStub.includes('id="oracle-at-google-ebs-exadata-2026"') &&
      (healedFromStaleStub.match(/vertex="1"/g) || []).length === 23 &&
      !healedFromStaleStub.includes('copilot_mod_custom_box_0'),
    'healStubOrOracleDiagramXml() upgrades stale 1-box localStorage/DB stub into full 23-vertex Oracle Exadata architecture'
  );

  console.log('================================================================================');
  console.log('🎉 ALL 21/21 BLANK CANVAS, ORACLE@GOOGLE EXADATA, LIBRARY SEED & AUDIT CHECKS PASSED!');
  console.log('================================================================================');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
