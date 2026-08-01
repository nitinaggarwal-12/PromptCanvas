import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { xmlToGraph } from '../../src/lib/graph/xmlToGraph';
import { extractSystemModel } from '../../src/lib/compose/extract';

describe('Phase 1: XML Extraction & SystemModel Normalization', () => {
  const corpusDir = path.join(__dirname, '../../diagrams/latest');

  const corpusFiles = [
    'hdc__conceptual_diagram__v1.xml',
    'hdc__unified_system_view__v1.xml',
    'hdc__governance_state_machine__v1.xml',
    'hdc__sequence_diagram__v1.xml',
    'hdc__erd__v1.xml',
    'hdc__tech_serverless_gcp__v1.xml',
  ];

  for (const file of corpusFiles) {
    it(`extracts valid SystemModel from corpus file: ${file}`, () => {
      const filePath = path.join(corpusDir, file);
      expect(fs.existsSync(filePath)).toBe(true);

      const xml = fs.readFileSync(filePath, 'utf8');
      const extracted = xmlToGraph(xml);
      expect(extracted).not.toBeNull();
      expect(extracted!.tiers.length).toBeGreaterThan(0);
      expect(extracted!.components.length).toBeGreaterThan(0);

      const model = extractSystemModel({ xml, title: file });
      expect(model.source).toBe('xml_extraction');
      expect(model.components.length).toBeGreaterThan(0);
      expect(Array.isArray(model.unmapped)).toBe(true);
    });
  }

  it('governance state machine fixture yields state transitions', () => {
    const xml = fs.readFileSync(path.join(corpusDir, 'hdc__governance_state_machine__v1.xml'), 'utf8');
    const model = extractSystemModel({ xml });
    expect(model.components.length).toBeGreaterThan(0);
  });

  it('unified system view fixture yields components and flows', () => {
    const xml = fs.readFileSync(path.join(corpusDir, 'hdc__unified_system_view__v1.xml'), 'utf8');
    const model = extractSystemModel({ xml });
    expect(model.components.length).toBeGreaterThan(5);
  });
});
