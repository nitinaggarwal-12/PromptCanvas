import { createHash } from 'crypto';
import { describe, expect, it } from 'vitest';
import { BLUEPRINT_KNOWLEDGE_MATRIX } from '../../src/lib/blueprintKnowledgeMatrix';
import {
  getDefaultXmlForArchitecture,
  normalizeArchitectureId,
} from '../../src/lib/architectureTypesCertified';

interface Resolution {
  combinedId: string;
  canonicalId: string;
  hash: string;
  labels: number;
}

function labelledVertexCount(xml: string): number {
  const cellRe = /<mxCell([^>]*?)\/?>/g;
  let match: RegExpExecArray | null;
  let count = 0;

  while ((match = cellRe.exec(xml)) !== null) {
    const attrs = match[1];
    if (!/vertex="1"/.test(attrs)) continue;
    const value = /value="([^"]*)"/.exec(attrs);
    if (!value) continue;
    const text = value[1]
      .replace(/<[^>]+>/g, ' ')
      .replace(/&[a-z#0-9]+;/gi, ' ')
      .trim();
    if (text.length > 1) count += 1;
  }

  return count;
}

function resolveCatalog(): Resolution[] {
  return BLUEPRINT_KNOWLEDGE_MATRIX.map((blueprint) => {
    const combinedId = blueprint.combinedId;
    const canonicalId = normalizeArchitectureId(combinedId);
    const xml = getDefaultXmlForArchitecture(combinedId);

    if (!xml || xml.length < 200) {
      throw new Error(`${combinedId} resolved to empty or truncated XML`);
    }

    const labels = labelledVertexCount(xml);
    if (labels === 0) {
      throw new Error(`${combinedId} resolved without readable labelled vertices`);
    }

    return {
      combinedId,
      canonicalId,
      labels,
      hash: createHash('sha256').update(xml).digest('hex'),
    };
  });
}

describe('Certified blueprint resolver contract', () => {
  it('resolves all 60 advertised blueprints to distinct labelled canonical diagrams', () => {
    expect(BLUEPRINT_KNOWLEDGE_MATRIX).toHaveLength(60);

    const results = resolveCatalog();
    expect(results).toHaveLength(60);

    const canonicalIds = results.map((result) => result.canonicalId);
    expect(new Set(canonicalIds).size).toBe(60);

    const hashes = results.map((result) => result.hash);
    expect(new Set(hashes).size).toBe(60);

    for (const result of results) {
      expect(result.labels, result.combinedId).toBeGreaterThan(0);
    }
  }, 30000);

  it('fails loudly for an unregistered blueprint-like ID instead of returning a generic diagram', () => {
    expect(() => getDefaultXmlForArchitecture('P9-APP-L-99_nonexistent_blueprint'))
      .toThrow('BLUEPRINT_NOT_REGISTERED: P9-APP-L-99_nonexistent_blueprint');
  });
});
