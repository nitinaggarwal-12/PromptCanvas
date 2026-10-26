import { describe, it, expect } from 'vitest';
import { CANONICAL_TEMPLATES, ACTIVE_CANONICAL_BLUEPRINT_IDS, injectDomainFlavorXml } from '../../src/lib/canonical/canonicalTemplates';
import { CANONICAL_CONTRACTS } from '../../src/lib/canonical/canonicalContracts';
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

describe('22 Canonical Blueprints (7 Core Architecture/Flow #78, #79, #81, #84, #00, #67, #69 + 15 Infographic #52–#66), Permanent Purge of #38, #42, #44, #68, #80, #82, #83 & 9-Guide Diagram Parity', () => {
  it('retains strictly the 22 canonical blueprints (7 core architecture/flow + 15 infographic #52–#66) and permanently purges #35–#50, #68, #70–#74, #80, #82, #83', () => {
    expect(ACTIVE_CANONICAL_BLUEPRINT_IDS).toEqual([
      '78', '79', '81', '84',
      '00', '67', '69',
      '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66',
    ]);
    expect(CANONICAL_TEMPLATES.length).toBe(22);

    for (const id of ['78', '79', '81', '84', '67', '69']) {
      expect(ACTIVE_CANONICAL_BLUEPRINT_IDS.includes(id)).toBe(true);
      const bp = CANONICAL_TEMPLATES.find((t) => t.id === id);
      expect(bp).toBeDefined();
      expect(bp?.theme).toBe('light');
    }

    for (let i = 52; i <= 66; i++) {
      const id = String(i);
      expect(ACTIVE_CANONICAL_BLUEPRINT_IDS.includes(id)).toBe(true);
      const bp = CANONICAL_TEMPLATES.find((t) => t.id === id);
      expect(bp).toBeDefined();
      expect(bp?.family).toBe('Infographic');
    }

    const purgedIds = ['35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '68', '70', '71', '72', '73', '74', '80', '82', '83'];
    for (const purgedId of purgedIds) {
      expect(ACTIVE_CANONICAL_BLUEPRINT_IDS.includes(purgedId)).toBe(false);
      expect(CANONICAL_TEMPLATES.find((t) => t.id === purgedId)).toBeUndefined();
      expect(CANONICAL_CONTRACTS[purgedId]).toBeUndefined();
    }
  });

  it('enforces strictly Official Google Cloud Brand Light palette across #67 and #69 with zero funky colors and preserves header_logo through injectDomainFlavorXml', () => {
    for (const id of ['67', '69']) {
      const bp = CANONICAL_TEMPLATES.find((t) => t.id === id)!;
      const rawXml = bp.generateXml('biopharma', 'light');
      const xml = injectDomainFlavorXml(rawXml, 'biopharma');
      expect(xml).toContain('background="#FFFFFF"');
      // Must include authentic 4-color Google G logo and Google Blue primary accents
      expect(xml).toContain('id="header_logo"');
      expect(xml).toContain('Google Cloud');
      expect(xml).toContain('#1A73E8');
      expect(xml).toContain('#E8F0FE');
      const hexMatches = Array.from(
        new Set((xml.match(/#[0-9a-fA-F]{6}\b/g) || []).map((h) => h.toUpperCase()))
      );
      const funkyOrNonBrand = hexMatches.filter((h) => !ALLOWED_GOOGLE_BRAND_LIGHT_HEXES.has(h));
      expect(funkyOrNonBrand, `Blueprint #${id} emitted non-Google-Brand hexes: ${funkyOrNonBrand.join(', ')}`).toEqual([]);
    }
  });

  it('enforces per-blueprint ReferenceGeometryContract (#67, #69) for exact pageWidth/pageHeight, SVG icon count, required/forbidden mxCell IDs, and DOM painting order', () => {
    for (const id of ['67', '69']) {
      const bp = CANONICAL_TEMPLATES.find((t) => t.id === id)!;
      const rg = CANONICAL_CONTRACTS[id]?.referenceGeometry!;
      expect(rg, `Missing referenceGeometry contract for #${id}`).toBeDefined();

      const xml = bp.generateXml('default', 'light');
      expect(xml).toContain(`pageWidth="${rg.pageWidth}"`);
      expect(xml).toContain(`pageHeight="${rg.pageHeight}"`);

      const iconMatches = xml.match(/shape=image;[^"]*image=data:image\/svg\+xml,/g) || [];
      if (typeof rg.exactIconCount === 'number') {
        expect(iconMatches.length, `Blueprint #${id} must embed exactly ${rg.exactIconCount} SVG icons`).toBe(rg.exactIconCount);
      }
      if (typeof rg.minIconCount === 'number') {
        expect(iconMatches.length, `Blueprint #${id} must embed >= ${rg.minIconCount} SVG icons`).toBeGreaterThanOrEqual(rg.minIconCount);
      }

      for (const reqId of rg.requiredCellIds) {
        expect(xml, `Blueprint #${id} missing required cell id="${reqId}"`).toContain(`id="${reqId}"`);
      }
      for (const forbId of rg.forbiddenCellIds) {
        expect(xml, `Blueprint #${id} contains forbidden invented cell id="${forbId}"`).not.toContain(`id="${forbId}"`);
      }
      for (const reqSub of rg.requiredSubstrings) {
        expect(xml, `Blueprint #${id} missing required substring "${reqSub}"`).toContain(reqSub);
      }
      for (const forbSub of rg.forbiddenSubstrings) {
        expect(xml, `Blueprint #${id} contains forbidden substring "${forbSub}"`).not.toContain(forbSub);
      }
      if (rg.domOrderPairs) {
        const cellIds = (xml.match(/<mxCell[^>]*\sid="([^"]+)"/g) || []).map((m) => m.match(/\sid="([^"]+)"/)?.[1] || '');
        for (const [earlierId, laterId] of rg.domOrderPairs) {
          const idxA = cellIds.indexOf(earlierId);
          const idxB = cellIds.indexOf(laterId);
          expect(idxA).toBeGreaterThan(-1);
          expect(idxB).toBeGreaterThan(-1);
          expect(idxA, `In #${id}, ${earlierId} must precede ${laterId} in DOM order`).toBeLessThan(idxB);
        }
      }
    }
  });

  it('maps all 9 blog guides (DOC-MT-01..DOC-REF-09) 1:1 to 9 distinct Official #78 blueprints with 18/18 component coverage', () => {
    expect(OFFICIAL_ARCH_CENTER_BLUEPRINTS.length).toBe(10);
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

      // Bidirectional arrows on RAG, Tool, and e_alb_to_mid_left edges
      expect(xml).toContain('id="e_left_mcp_run_bot"');
      expect(xml).toContain('id="e_left_db_mcp_bot"');
      expect(xml).toContain('id="e_right_mcp_run_bot"');
      expect(xml).toContain('id="e_right_db_mcp_bot"');
      expect(xml).toMatch(/id="e_alb_to_mid_left"[^>]*startArrow=open;startFill=0;startSize=7;endArrow=open;endFill=0;endSize=7/);

      // Icon diversity >= 12 distinct service icons per diagram
      const iconUris = new Set((xml.match(/data:image\/(?:png|svg\+xml)(?:;(?:utf8|base64))?,[^"&]+/g) || []));
      expect(iconUris.size, `Guide ${guide.docId} (${bp!.id}) has only ${iconUris.size} distinct icons`).toBeGreaterThanOrEqual(12);

      // All 18 cards + 2 boundary wrappers documented across 5 component groups (1 + 5 + 3 + 1 + 5 = 15 rows)
      const compSec = guide.sections.find((s) => s.componentGroupsTable && s.componentGroupsTable.length > 0);
      expect(compSec, `Missing componentGroupsTable section in ${guide.docId}`).toBeDefined();
      const totalItems = compSec!.componentGroupsTable!.reduce((acc, g) => acc + g.items.length, 0);
      expect(totalItems, `Guide ${guide.docId} should document all 15 component rows (18 cards + 2 wrappers)`).toBe(15);
    }
  });
});
