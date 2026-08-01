import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { extractSystemModel } from '../../src/lib/compose/extract';
import {
  componentDescriptionsMapper,
  interfaceInventoryMapper,
  acceptanceCriteriaMapper,
  nfrsFromGovernanceMapper,
  trustBoundaryCrossingsMapper,
  MAPPER_REGISTRY,
} from '../../src/lib/compose/mappers';

describe('Phase 3: Pure Derivation Mappers & Traceability', () => {
  const corpusDir = path.join(__dirname, '../../diagrams/latest');

  it('unified system view fixture yields component descriptions with sourceRefs', () => {
    const xml = fs.readFileSync(path.join(corpusDir, 'hdc__unified_system_view__v1.xml'), 'utf8');
    const model = extractSystemModel({ xml });
    const res = componentDescriptionsMapper(model);

    expect(res.bullets.length).toBeGreaterThan(0);
    for (const b of res.bullets) {
      expect(Array.isArray(b.sourceRefs)).toBe(true);
      expect(b.sourceRefs.length).toBeGreaterThan(0);
    }
  });

  it('unified system view fixture yields interface inventory table', () => {
    const xml = fs.readFileSync(path.join(corpusDir, 'hdc__unified_system_view__v1.xml'), 'utf8');
    const model = extractSystemModel({ xml });
    const res = interfaceInventoryMapper(model);

    expect(res.table).toBeDefined();
    expect(res.table!.rows.length).toBeGreaterThan(0);
    for (const row of res.table!.rows) {
      expect(row.sourceRefs.length).toBeGreaterThan(0);
    }
  });

  it('governance fixture yields acceptance criteria traceable to ids', () => {
    const xml = fs.readFileSync(path.join(corpusDir, 'hdc__governance_state_machine__v1.xml'), 'utf8');
    const model = extractSystemModel({ xml });
    const res = acceptanceCriteriaMapper(model);

    expect(res.bullets.length).toBeGreaterThan(0);
    for (const b of res.bullets) {
      expect(b.sourceRefs.length).toBeGreaterThan(0);
    }
  });

  it('trust boundary crossings identifies inter-tier flows', () => {
    const xml = fs.readFileSync(path.join(corpusDir, 'hdc__unified_system_view__v1.xml'), 'utf8');
    const model = extractSystemModel({ xml });
    const res = trustBoundaryCrossingsMapper(model);

    expect(res.table).toBeDefined();
  });

  it('every registered mapper in MAPPER_REGISTRY produces valid SectionContent', () => {
    const xml = fs.readFileSync(path.join(corpusDir, 'hdc__conceptual_diagram__v1.xml'), 'utf8');
    const model = extractSystemModel({ xml });

    for (const [key, fn] of Object.entries(MAPPER_REGISTRY)) {
      const out = fn(model, key);
      expect(out.sectionId).toBe(key);
      expect(Array.isArray(out.paragraphs)).toBe(true);
      expect(Array.isArray(out.bullets)).toBe(true);
    }
  });
});
