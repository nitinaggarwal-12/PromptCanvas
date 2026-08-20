import { inflateRawSync } from 'node:zlib';
import { describe, expect, it } from 'vitest';
import {
  CATALOG_BLUEPRINT_NUMBERS,
  CATALOG_CANONICAL_IDS,
  CATALOG_EXACT_FACTORIES,
  getExactCatalogBlueprintXml,
} from '../blueprintExactResolver';

const ID = 'enterprise_ai_document_assistant';

function decodeDiagramBody(xml: string): string {
  const body = xml.match(/<diagram\b[^>]*>([\s\S]*?)<\/diagram>/i)?.[1] || '';
  expect(body.length).toBeGreaterThan(1000);
  const inflated = inflateRawSync(Buffer.from(body, 'base64')).toString('utf8');
  return decodeURIComponent(inflated);
}

describe('Blueprint 61 — Enterprise AI Document Assistant', () => {
  it('is explicitly reserved as #61 without disturbing the certified 1-60 catalog', () => {
    expect(CATALOG_CANONICAL_IDS).toHaveLength(60);
    expect(CATALOG_CANONICAL_IDS).not.toContain(ID);
    expect(CATALOG_BLUEPRINT_NUMBERS[ID]).toBe(61);
    expect(CATALOG_EXACT_FACTORIES[ID]).toBeTypeOf('function');
  });

  it('emits Blueprint 61 identity and never leaks provisional #51 markers', () => {
    const xml = getExactCatalogBlueprintXml(ID);
    expect(xml).toBeTruthy();
    expect(xml).toContain('id="catalog_enterprise_ai_document_assistant"');
    expect(xml).toContain('PromptCanvas Blueprint 61');
    expect(xml).toContain('Blueprint 61 - Enterprise AI Document Assistant');
    expect(xml).not.toContain('Blueprint 51');
    expect(xml).not.toContain('enterprise_ai_doc_assistant_51');
  });

  it('decompresses into a substantial editable architecture with decisions and routed flows', () => {
    const xml = getExactCatalogBlueprintXml(ID) || '';
    const diagram = decodeDiagramBody(xml);
    const vertices = (diagram.match(/<mxCell\b[^>]*\bvertex="1"/gi) || []).length;
    const edges = (diagram.match(/<mxCell\b[^>]*\bedge="1"/gi) || []).length;
    const decisions = (diagram.match(/rhombus/gi) || []).length;

    expect(diagram).toContain('<mxGraphModel');
    expect(diagram).toContain('<root>');
    expect(vertices).toBeGreaterThanOrEqual(25);
    expect(edges).toBeGreaterThanOrEqual(18);
    expect(decisions).toBeGreaterThanOrEqual(3);
    expect(diagram).toMatch(/Workflow Orchestrator/i);
    expect(diagram).toMatch(/Document AI/i);
    expect(diagram).toMatch(/Vertex AI|Gemini/i);
    expect(diagram).toMatch(/Human Review/i);
    expect(diagram).toMatch(/Pub\/Sub/i);
    expect(diagram).toMatch(/Cloud Logging/i);
    expect(diagram).not.toMatch(/Blueprint 51/i);
  });
});
