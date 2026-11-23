import { describe, expect, it } from 'vitest';
import {
  findTopAlignedLeafCardIds,
  normalizeLeafCardVerticalAlignment,
} from './leafVerticalAlignment';
import { ARCHITECTURE_TYPES, getDefaultXmlForArchitecture } from './architectureTypes';
import { sanitizeDrawioXmlAttributes } from './diagramCleaner';
import { validateAndHealDrawioXml } from './xmlHealer';
import { validateDrawioXml } from './validate/validator';

describe('leafVerticalAlignment — Universal Leaf-Card Vertical Centering', () => {
  it('centers tall non-container leaf cards and strips asymmetric spacingTop', () => {
    const xml = `<mxfile host="app.diagrams.net"><diagram id="t1" name="Test"><mxGraphModel><root>
      <mxCell id="0"/>
      <mxCell id="1" parent="0"/>
      <mxCell id="zone_1" value="Zone Header" style="rounded=1;html=1;container=1;collapsible=0;verticalAlign=top;spacingTop=8;" vertex="1" parent="1">
        <mxGeometry x="20" y="20" width="400" height="300" as="geometry"/>
      </mxCell>
      <mxCell id="leaf_card" value="&lt;b&gt;Hop 1A&lt;/b&gt;&lt;br/&gt;Short-lived OIDC" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;align=left;verticalAlign=top;spacingTop=14;spacingLeft=12;" vertex="1" parent="zone_1">
        <mxGeometry x="16" y="40" width="180" height="240" as="geometry"/>
      </mxCell>
    </root></mxGraphModel></diagram></mxfile>`;

    const result = normalizeLeafCardVerticalAlignment(xml);
    expect(result.normalizedCount).toBe(1);
    expect(result.normalizedIds).toEqual(['leaf_card']);
    // Container keeps verticalAlign=top; leaf switches to verticalAlign=middle without spacingTop=14
    expect(result.xml).toContain('id="zone_1" value="Zone Header" style="rounded=1;html=1;container=1;collapsible=0;verticalAlign=top;spacingTop=8;"');
    expect(result.xml).toContain('id="leaf_card"');
    expect(result.xml).toContain('verticalAlign=middle;spacingLeft=12;');
    expect(result.xml).not.toContain('spacingTop=14');
    expect(findTopAlignedLeafCardIds(result.xml)).toEqual([]);
  });

  it('preserves verticalAlign=top on flat unparented background zones that spatially enclose sibling cards', () => {
    const xml = `<mxfile host="app.diagrams.net"><diagram id="t2" name="FlatZone"><mxGraphModel><root>
      <mxCell id="0"/>
      <mxCell id="1" parent="0"/>
      <mxCell id="flat_zone" value="Compute Zone" style="rounded=1;html=1;fillColor=#F8FAFF;strokeColor=#4285F4;verticalAlign=top;spacingTop=8;" vertex="1" parent="1">
        <mxGeometry x="40" y="40" width="500" height="320" as="geometry"/>
      </mxCell>
      <mxCell id="inner_card" value="Cloud Run Service" style="rounded=1;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;verticalAlign=top;spacingTop=10;" vertex="1" parent="1">
        <mxGeometry x="80" y="100" width="180" height="140" as="geometry"/>
      </mxCell>
    </root></mxGraphModel></diagram></mxfile>`;

    const result = normalizeLeafCardVerticalAlignment(xml);
    expect(result.normalizedIds).toEqual(['inner_card']);
    expect(result.xml).toMatch(/id="flat_zone"[^>]*verticalAlign=top/);
    expect(result.xml).toMatch(/id="inner_card"[^>]*verticalAlign=middle/);
  });

  it('preserves verticalAlign=top on pinned top-header banner cards, text-only labels, and external-label icons', () => {
    const xml = `<mxfile host="app.diagrams.net"><diagram id="t3" name="Exempt"><mxGraphModel><root>
      <mxCell id="0"/>
      <mxCell id="1" parent="0"/>
      <mxCell id="gw_card" value="&lt;div style=&quot;background:#1A73E8;color:#FFF;padding:8px;&quot;&gt;Agent Gateway&lt;/div&gt;&lt;div&gt;Body&lt;/div&gt;" style="rounded=1;html=1;fillColor=#F0F6FF;strokeColor=#4285F4;verticalAlign=top;spacingTop=0;" vertex="1" parent="1">
        <mxGeometry x="40" y="40" width="180" height="240" as="geometry"/>
      </mxCell>
      <mxCell id="text_note" value="Plain note" style="text;html=1;strokeColor=none;fillColor=none;verticalAlign=top;" vertex="1" parent="1">
        <mxGeometry x="260" y="40" width="160" height="80" as="geometry"/>
      </mxCell>
      <mxCell id="ext_icon" value="Cloud SQL" style="shape=image;html=1;verticalLabelPosition=bottom;verticalAlign=top;" vertex="1" parent="1">
        <mxGeometry x="460" y="40" width="60" height="60" as="geometry"/>
      </mxCell>
    </root></mxGraphModel></diagram></mxfile>`;

    const result = normalizeLeafCardVerticalAlignment(xml);
    expect(result.normalizedCount).toBe(0);
    expect(result.xml).toBe(xml);
  });

  it('automatically heals top-aligned leaf cards via sanitizeDrawioXmlAttributes and validateAndHealDrawioXml', () => {
    const xml = `<mxfile host="app.diagrams.net"><diagram id="t4" name="Pipeline"><mxGraphModel><root>
      <mxCell id="0"/>
      <mxCell id="1" parent="0"/>
      <mxCell id="card_a" value="Auth Manager" style="rounded=1;html=1;fillColor=#FFFFFF;strokeColor=#DADCE0;verticalAlign=top;spacingTop=12;" vertex="1" parent="1">
        <mxGeometry x="40" y="40" width="200" height="160" as="geometry"/>
      </mxCell>
    </root></mxGraphModel></diagram></mxfile>`;

    const preVal = validateDrawioXml(xml);
    expect(preVal.warnings.some((w) => w.code === 'LEAF_TOP_ALIGNED_EMPTY_SPACE')).toBe(true);

    const sanitized = sanitizeDrawioXmlAttributes(xml);
    expect(sanitized).toContain('verticalAlign=middle');
    expect(validateDrawioXml(sanitized).warnings.some((w) => w.code === 'LEAF_TOP_ALIGNED_EMPTY_SPACE')).toBe(false);

    const healed = validateAndHealDrawioXml(xml, 'canonical_google_cloud_ref_v2');
    expect(healed.xml).toContain('verticalAlign=middle');
  });

  it('guarantees zero uncentered tall leaf cards across all 62 registered PromptCanvas templates', () => {
    const offenders: Array<{ id: string; cells: string[] }> = [];
    for (const t of ARCHITECTURE_TYPES) {
      const xml = getDefaultXmlForArchitecture(t.id);
      if (!xml) continue;
      const remaining = findTopAlignedLeafCardIds(xml, 44);
      if (remaining.length > 0) {
        offenders.push({ id: t.id, cells: remaining });
      }
    }
    expect(offenders).toEqual([]);
  });
});
