/**
 * 🛡️ COMPREHENSIVE 41-TEMPLATE BLIND-SPOT & QUALITY AUDIT SUITE
 * Runs the upgraded multi-dimensional quality engine across ALL 41 Canonical Blueprints:
 * 1. Stepped Jogs (|ΔY| or |ΔX| between 1px and 8px).
 * 2. Malformed Inline SVGs (missing viewBox, unclosed tags, undefined interpolation).
 * 3. Typography Violations (font-size < 6.5px).
 * 4. Geometric Edge-Card Slicing (connector lines slicing across card text).
 * 5. Container Dead Space Voids (bottom dead void > 36px).
 * 6. Raw Emoji Pollution (checks for raw emoji unicode).
 */

import { CANONICAL_TEMPLATES } from '../src/lib/canonical/canonicalTemplates';
import { auditDiagramBlindspots, BlindspotAuditReport } from './audit_comprehensive_diagram_blindspots';

async function auditAllTemplates() {
  console.log('================================================================================');
  console.log('🧪 RUNNING COMPREHENSIVE QUALITY & BLIND-SPOT AUDIT ACROSS ALL 41 TEMPLATES');
  console.log('================================================================================\n');

  const results: BlindspotAuditReport[] = [];
  let passedCount = 0;
  let failedCount = 0;

  for (const template of CANONICAL_TEMPLATES) {
    try {
      const xml = template.generateXml('default', 'light');
      const report = auditDiagramBlindspots(`template_${template.id}`, xml);
      results.push(report);

      const emojiMatches = xml.match(/\p{Extended_Pictographic}/gu);
      const emojiCount = emojiMatches ? emojiMatches.length : 0;

      const hasFailures = !report.passed || emojiCount > 0;

      if (!hasFailures) {
        passedCount++;
        console.log(`✅ Template ${template.id.padStart(2, '0')}: ${template.name.padEnd(46, ' ')} [100% CLEAN]`);
      } else {
        failedCount++;
        console.log(`❌ Template ${template.id.padStart(2, '0')}: ${template.name.padEnd(46, ' ')} [FAILURES FOUND]`);
        if (report.steppedJogs.length > 0) console.log(`     - Stepped Jogs (${report.steppedJogs.length}): ${report.steppedJogs[0]}`);
        if (report.malformedSvgs.length > 0) console.log(`     - Malformed SVGs (${report.malformedSvgs.length}): ${report.malformedSvgs[0]}`);
        if (report.typographyViolations.length > 0) console.log(`     - Typography Violations (${report.typographyViolations.length}): ${report.typographyViolations[0]}`);
        if (report.edgeSlicingViolations.length > 0) console.log(`     - Edge Slicing (${report.edgeSlicingViolations.length}): ${report.edgeSlicingViolations[0]}`);
        if (report.containerVoids.length > 0) console.log(`     - Container Voids (${report.containerVoids.length}): ${report.containerVoids[0]}`);
        if (emojiCount > 0) console.log(`     - Raw Emojis: ${emojiCount} emojis detected`);
      }
    } catch (err: any) {
      failedCount++;
      console.log(`💥 Template ${template.id.padStart(2, '0')}: ${template.name.padEnd(46, ' ')} [EXCEPTION: ${err.message}]`);
    }
  }

  console.log('\n================================================================================');
  console.log(`📊 BATCH AUDIT COMPLETE: ${passedCount} / ${CANONICAL_TEMPLATES.length} Passed, ${failedCount} Need Refinement`);
  console.log('================================================================================\n');

  return { passedCount, failedCount, total: CANONICAL_TEMPLATES.length };
}

if (require.main === module) {
  auditAllTemplates().then(({ failedCount }) => {
    if (failedCount > 0) {
      console.log('⚠️ Action Required: Refine the identified templates to achieve 100% catalog certification.');
    }
  });
}
