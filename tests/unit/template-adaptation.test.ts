import { describe, it, expect } from 'vitest';
import { createHash } from 'crypto';
import { getDefaultXmlForArchitecture } from '../../src/lib/architectureTypes';
import { injectUseCaseFlavor } from '../../src/lib/diagramCleaner';
import { validateDrawioXml } from '../../src/lib/validate/validator';

const md5 = (s: string) => createHash('md5').update(s).digest('hex');

describe('template domain adaptation (guards the 23-identical-diagrams bug)', () => {
  const PROMPT_A = 'design an autonomous e-commerce supply chain platform';
  const PROMPT_B = 'commercial marketing multimedia campaign generation system';

  it('two different prompts produce different XML for the same template type', () => {
    for (const archType of ['conceptual_diagram', 'unified_system_view', 'tech_serverless_gcp']) {
      const a = getDefaultXmlForArchitecture(archType, PROMPT_A, PROMPT_A);
      const b = getDefaultXmlForArchitecture(archType, PROMPT_B, PROMPT_B);
      expect(a, `${archType} should return XML`).toBeTruthy();
      expect(md5(a!), `${archType}: adaptation must differentiate prompts`).not.toBe(md5(b!));
    }
  });

  it('adapted XML contains the prompt domain topic, not legacy boilerplate', () => {
    const xml = getDefaultXmlForArchitecture('conceptual_diagram', PROMPT_A, PROMPT_A)!;
    expect(/AUTONOMOUS|SUPPLY|E-COMMERCE/i.test(xml)).toBe(true);
    expect(xml).not.toMatch(/ITACS/);
  });

  it('flavor injection is idempotent (second pass changes nothing)', () => {
    const once = getDefaultXmlForArchitecture('conceptual_diagram', PROMPT_A, PROMPT_A)!;
    const twice = injectUseCaseFlavor(once, PROMPT_A, PROMPT_A);
    if (once !== twice) {
      for (let i = 0; i < Math.max(once.length, twice.length); i++) {
        if (once[i] !== twice[i]) {
          console.log(`Diff at index ${i}:`);
          console.log('once :', JSON.stringify(once.substring(Math.max(0, i - 30), i + 50)));
          console.log('twice:', JSON.stringify(twice.substring(Math.max(0, i - 30), i + 50)));
          break;
        }
      }
    }
    expect(md5(twice)).toBe(md5(once));
  });
});

describe('validator: point-anchored edges are not dangling', () => {
  const pointEdgeXml = `<?xml version="1.0"?><mxfile><diagram><mxGraphModel><root>
    <mxCell id="0"/><mxCell id="1" parent="0"/>
    <mxCell id="n1" value="Node" style="rounded=1" vertex="1" parent="1"><mxGeometry x="40" y="40" width="160" height="70" as="geometry"/></mxCell>
    <mxCell id="legend_arrow" style="endArrow=block" edge="1" parent="1">
      <mxGeometry relative="1" as="geometry">
        <mxPoint x="300" y="60" as="sourcePoint"/>
        <mxPoint x="380" y="60" as="targetPoint"/>
      </mxGeometry>
    </mxCell>
  </root></mxGraphModel></diagram></mxfile>`;

  it('edge with explicit sourcePoint/targetPoint and no cell refs passes', () => {
    const r = validateDrawioXml(pointEdgeXml);
    expect((r.errors || []).filter((e: any) => e.code === 'EDGE_DANGLING')).toHaveLength(0);
  });

  it('edge with no cell refs AND no explicit points is still flagged', () => {
    const broken = pointEdgeXml.replace(/<mxPoint[^/]*\/>/g, '');
    const r = validateDrawioXml(broken);
    expect((r.errors || []).filter((e: any) => e.code === 'EDGE_DANGLING').length).toBeGreaterThan(0);
  });
});
