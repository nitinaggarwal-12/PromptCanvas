import { describe, expect, it } from 'vitest';
import { XMLParser } from 'fast-xml-parser';
import { getApprovedSixRsMigrationMatrixXml } from '../../src/lib/approvedBlueprint29Safe';

describe('Blueprint 29 approved 6Rs migration disposition master', () => {
  const xml = getApprovedSixRsMigrationMatrixXml();

  it('emits parseable mxGraph XML on the readable approved canvas', () => {
    expect(() => new XMLParser({ ignoreAttributes: false }).parse(xml)).not.toThrow();
    expect(xml).toContain('pageWidth="1760"');
    expect(xml).toContain('pageHeight="1040"');
    expect(xml).toContain('id="six_rs_migration_disposition_matrix"');
  });

  it('contains every migration disposition with no missing Repurchase path', () => {
    for (const id of ['rehost','replatform','refactor','retain','retire','repurchase']) {
      expect(xml).toContain(`id="r_${id}"`);
    }
    expect(xml).toContain('1 Rehost');
    expect(xml).toContain('2 Replatform');
    expect(xml).toContain('3 Refactor');
    expect(xml).toContain('4 Retain');
    expect(xml).toContain('5 Retire');
    expect(xml).toContain('6 Repurchase');
  });

  it('preserves assessment scoring, rationale, outputs and governance detail', () => {
    expect(xml).toContain('Business');
    expect(xml).toContain('Technical');
    expect(xml).toContain('Cloud Readiness');
    expect(xml).toContain('30%');
    expect(xml).toContain('40%');
    expect(xml).toContain('Disposition Engine');
    expect(xml).toContain('Decision Confidence &amp; Rationale');
    expect(xml).toContain('Primary Drivers');
    expect(xml).toContain('Constraints');
    expect(xml).toContain('Dependencies');
    expect(xml).toContain('Assumptions');
    expect(xml).toContain('Reporting &amp; Artifacts');
    expect(xml).toContain('Migration Roadmap');
    expect(xml).toContain('Risk &amp; Compliance Report');
  });

  it('preserves enterprise cross-cutting controls and score semantics', () => {
    for (const label of ['Security &amp; Compliance','Network &amp; Connectivity','Data Management','Observability','FinOps &amp; Cost Governance','Operational Readiness']) {
      expect(xml).toContain(label);
    }
    expect(xml).toContain('SCORE RANGE (0–100)');
    expect(xml).toContain('80–100 Strong Fit / Low Risk');
    expect(xml).toContain('CONFIDENCE');
    expect(xml).toContain('High &amp;gt;75%');
  });

  it('is self-contained and does not depend on external diagram assets', () => {
    expect(xml).not.toContain('cdn.jsdelivr.net');
    expect(xml).not.toContain('simpleicons.org');
    expect(xml).not.toContain('undefined');
  });
});
