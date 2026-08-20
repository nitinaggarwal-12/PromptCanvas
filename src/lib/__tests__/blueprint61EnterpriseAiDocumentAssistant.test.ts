import { describe, expect, it } from 'vitest';
import {
  CATALOG_BLUEPRINT_NUMBERS,
  CATALOG_EXACT_FACTORIES,
  getExactCatalogBlueprintXml,
} from '../blueprintExactResolver';

const ID = 'enterprise_ai_document_assistant';

describe('Blueprint 61 — Enterprise AI Document Assistant', () => {
  it('has an explicit non-positional catalog number', () => {
    expect(CATALOG_BLUEPRINT_NUMBERS[ID]).toBe(61);
    expect(CATALOG_EXACT_FACTORIES[ID]).toBeTypeOf('function');
  });

  it('emits canonical Blueprint 61 identity and never leaks provisional #51 markers', () => {
    const xml = getExactCatalogBlueprintXml(ID);
    expect(xml).toBeTruthy();
    expect(xml).toContain('pc-catalog-id:enterprise_ai_document_assistant');
    expect(xml).toContain('id="catalog_enterprise_ai_document_assistant"');
    expect(xml).toContain('PromptCanvas Blueprint 61');
    expect(xml).toContain('Blueprint 61 - Enterprise AI Document Assistant');
    expect(xml).not.toContain('Blueprint 51');
    expect(xml).not.toContain('enterprise_ai_doc_assistant_51');
  });
});
