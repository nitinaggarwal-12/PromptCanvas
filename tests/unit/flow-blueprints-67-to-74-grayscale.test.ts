import { describe, it, expect } from 'vitest';
import { CANONICAL_TEMPLATES, ACTIVE_CANONICAL_BLUEPRINT_IDS, injectDomainFlavorXml } from '../../src/lib/canonical/canonicalTemplates';
import {
  OFFICIAL_ARCH_CENTER_BLUEPRINTS,
  compileOfficialArchCenterDrawioXml,
  compileOfficialArchCenterSvg,
} from '../../src/lib/canonical/templateOfficialGcpArchCenterHubSpoke';
import { GOOGLE_CLOUD_DOCUMENTATION_SERIES } from '../../src/lib/blogs/googleCloudDocumentationSeries';

const ALLOWED_GOOGLE_BRAND_LIGHT_HEXES = new Set([
  // Google Material 3 Light Neutrals
  '#FFFFFF',
  '#F8FAFD',
  '#F8F9FA',
  '#F1F3F4',
  '#DADCE0',
  '#5F6368',
  '#3C4043',
  '#202124',
  // Official Google Blue
  '#E8F0FE',
  '#AECBFA',
  '#4285F4',
  '#1A73E8',
  '#174EA6',
  // Official Google Green
  '#E6F4EA',
  '#CEEAD6',
  '#34A853',
  '#1E8E3E',
  '#137333',
  '#0D652D',
  // Official Google Yellow / Amber
  '#FEF7E0',
  '#FEEFC3',
  '#FBBC04',
  '#FBBC05',
  '#E37400',
  '#B06000',
  // Official Google Red
  '#FCE8E6',
  '#FAD2CF',
  '#EA4335',
  '#D93025',
  '#C5221F',
  '#A50E0E',
  '#B31412',
]);

describe('Flow Blueprints #67..#74 Official Google Cloud Brand Light Theme & 9-Guide Diagram Parity', () => {
  it('includes all 8 operational & agentic flow blueprints (#67..#74) in CANONICAL_TEMPLATES with light theme', () => {
    for (const id of ['67', '68', '69', '70', '71', '72', '73', '74']) {
      expect(ACTIVE_CANONICAL_BLUEPRINT_IDS.includes(id)).toBe(true);
      const bp = CANONICAL_TEMPLATES.find((t) => t.id === id);
      expect(bp).toBeDefined();
      expect(bp?.theme).toBe('light');
    }
  });

  it('enforces strictly Official Google Cloud Brand Light palette across #67..#74 with zero funky colors and preserves header_logo through injectDomainFlavorXml', () => {
    for (const id of ['67', '68', '69', '70', '71', '72', '73', '74']) {
      const bp = CANONICAL_TEMPLATES.find((t) => t.id === id)!;
      const rawXml = bp.generateXml('biopharma', 'light');
      const xml = injectDomainFlavorXml(rawXml, 'biopharma');
      expect(xml).toContain('background="#FFFFFF"');
      // Must include authentic 4-color Google G logo and Google Blue primary accents
      expect(xml).toContain('id="header_logo"');
      expect(xml).toContain('Google Cloud');
      expect(xml).toContain('Gemini');
      expect(xml).toContain('#1A73E8');
      expect(xml).toContain('#E8F0FE');
      const hexMatches = Array.from(
        new Set((xml.match(/#[0-9a-fA-F]{6}\b/g) || []).map((h) => h.toUpperCase()))
      );
      const funkyOrNonBrand = hexMatches.filter((h) => !ALLOWED_GOOGLE_BRAND_LIGHT_HEXES.has(h));
      expect(funkyOrNonBrand, `Blueprint #${id} emitted non-Google-Brand hexes: ${funkyOrNonBrand.join(', ')}`).toEqual([]);
    }
  });

  it('maps all 9 blog guides (DOC-MT-01..DOC-REF-09) 1:1 to 9 distinct Official #78 blueprints with 18/18 component coverage', () => {
    expect(OFFICIAL_ARCH_CENTER_BLUEPRINTS.length).toBe(9);
    expect(GOOGLE_CLOUD_DOCUMENTATION_SERIES.length).toBe(9);

    const seenVariantIds = new Set<string>();
    const seenXmlSignatures = new Set<string>();

    for (const guide of GOOGLE_CLOUD_DOCUMENTATION_SERIES) {
      expect(seenVariantIds.has(guide.primaryBlueprintVariantId)).toBe(false);
      seenVariantIds.add(guide.primaryBlueprintVariantId);

      const bp = OFFICIAL_ARCH_CENTER_BLUEPRINTS.find((b) => b.id === guide.primaryBlueprintVariantId);
      expect(bp, `Missing Official #78 blueprint for ${guide.docId}`).toBeDefined();

      const xml = compileOfficialArchCenterDrawioXml(bp!);
      const svg = compileOfficialArchCenterSvg(bp!);
      expect(seenXmlSignatures.has(xml), `Duplicate diagram XML in ${guide.docId}`).toBe(false);
      seenXmlSignatures.add(xml);

      // Zero ungrounded Claude references
      expect(xml).not.toMatch(/Claude/i);
      expect(svg).not.toMatch(/Claude/i);

      // Bidirectional arrows on RAG and Tool edges
      expect(xml).toContain('id="e_left_mcp_run_bot"');
      expect(xml).toContain('id="e_left_db_mcp_bot"');
      expect(xml).toContain('id="e_right_mcp_run_bot"');
      expect(xml).toContain('id="e_right_db_mcp_bot"');

      // All 18 cards + 2 boundary wrappers documented across 5 component groups (1 + 5 + 3 + 1 + 5 = 15 rows)
      const compSec = guide.sections.find((s) => s.componentGroupsTable && s.componentGroupsTable.length > 0);
      expect(compSec, `Missing componentGroupsTable section in ${guide.docId}`).toBeDefined();
      const totalItems = compSec!.componentGroupsTable!.reduce((acc, g) => acc + g.items.length, 0);
      expect(totalItems, `Guide ${guide.docId} should document all 15 component rows (18 cards + 2 wrappers)`).toBe(15);
    }
  });
});
