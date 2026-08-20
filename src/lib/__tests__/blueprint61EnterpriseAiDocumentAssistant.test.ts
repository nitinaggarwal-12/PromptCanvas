import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { inflateRawSync } from 'node:zlib';
import { describe, expect, it } from 'vitest';
import { getDefaultXmlForArchitecture } from '../architectureTypesCertified';
import {
  CATALOG_BLUEPRINT_NUMBERS,
  CATALOG_CANONICAL_IDS,
  CATALOG_EXACT_FACTORIES,
  getExactCatalogBlueprintXml,
} from '../blueprintExactResolver';

const ID = 'enterprise_ai_document_assistant';
const MASTER_PATH = resolve(process.cwd(), 'templates/master_blueprints/xml/61_enterprise_ai_document_assistant.drawio');

function countTopology(xml: string) {
  return {
    vertices: (xml.match(/<mxCell\b[^>]*\bvertex="1"/gi) || []).length,
    edges: (xml.match(/<mxCell\b[^>]*\bedge="1"/gi) || []).length,
    decisions: (xml.match(/rhombus/gi) || []).length,
  };
}

function assertArchitectureSemantics(xml: string) {
  expect(xml).toMatch(/Workflow Orchestrator/i);
  expect(xml).toMatch(/Document AI/i);
  expect(xml).toMatch(/Vertex AI|Gemini/i);
  expect(xml).toMatch(/Human Review/i);
  expect(xml).toMatch(/Pub\/Sub/i);
  expect(xml).toMatch(/Cloud Logging/i);
  expect(xml).toMatch(/Cloud Armor/i);
  expect(xml).toMatch(/BigQuery/i);
}

function decodeRuntimeDiagram(xml: string): string {
  const body = xml.match(/<diagram\b[^>]*>([\s\S]*?)<\/diagram>/i)?.[1] || '';
  expect(body.length).toBeGreaterThan(1000);
  return decodeURIComponent(inflateRawSync(Buffer.from(body, 'base64')).toString('utf8'));
}

describe('Blueprint 61 — Enterprise AI Document Assistant', () => {
  it('is explicitly reserved as #61 without disturbing the certified 1-60 advertised catalog', () => {
    expect(CATALOG_CANONICAL_IDS).toHaveLength(60);
    expect(CATALOG_CANONICAL_IDS).not.toContain(ID);
    expect(CATALOG_BLUEPRINT_NUMBERS[ID]).toBe(61);
    expect(CATALOG_EXACT_FACTORIES[ID]).toBeTypeOf('function');
  });

  it('ships a native editable Draw.io master with zero provisional #51 leakage', () => {
    const xml = readFileSync(MASTER_PATH, 'utf8');
    const topology = countTopology(xml);

    expect(xml).toContain('compressed="false"');
    expect(xml).toContain('PromptCanvas Blueprint 61');
    expect(xml).toContain('id="enterprise_ai_doc_assistant_61"');
    expect(xml).toContain('Blueprint 61 - Enterprise AI Document Assistant');
    expect(xml).not.toContain('Blueprint 51');
    expect(xml).not.toContain('enterprise_ai_doc_assistant_51');
    expect(topology.vertices).toBeGreaterThanOrEqual(45);
    expect(topology.edges).toBeGreaterThanOrEqual(30);
    expect(topology.decisions).toBeGreaterThanOrEqual(4);
    assertArchitectureSemantics(xml);
  });

  it('resolves #61 through the same certified runtime entry point used by the application', () => {
    const xml = getDefaultXmlForArchitecture(ID) || '';
    expect(xml.length).toBeGreaterThan(1000);
    expect(xml).toContain('id="catalog_enterprise_ai_document_assistant"');
    expect(xml).toContain('PromptCanvas Blueprint 61');
    expect(xml).not.toContain('Blueprint 51');
  });

  it('emits canonical Blueprint 61 exact-resolver identity and never leaks provisional #51 markers', () => {
    const xml = getExactCatalogBlueprintXml(ID);
    expect(xml).toBeTruthy();
    expect(xml).toContain('id="catalog_enterprise_ai_document_assistant"');
    expect(xml).toContain('PromptCanvas Blueprint 61');
    expect(xml).toContain('Blueprint 61 - Enterprise AI Document Assistant');
    expect(xml).not.toContain('Blueprint 51');
    expect(xml).not.toContain('enterprise_ai_doc_assistant_51');
  });

  it('runtime payload remains a substantial editable architecture with decisions and routed flows', () => {
    const xml = getExactCatalogBlueprintXml(ID) || '';
    const diagram = decodeRuntimeDiagram(xml);
    const topology = countTopology(diagram);

    expect(diagram).toContain('<mxGraphModel');
    expect(diagram).toContain('<root>');
    expect(topology.vertices).toBeGreaterThanOrEqual(25);
    expect(topology.edges).toBeGreaterThanOrEqual(18);
    expect(topology.decisions).toBeGreaterThanOrEqual(3);
    assertArchitectureSemantics(diagram);
    expect(diagram).not.toMatch(/Blueprint 51/i);
  });
});
