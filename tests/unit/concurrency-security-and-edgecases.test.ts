import { describe, it, expect, beforeEach } from 'vitest';
import { acquireGeminiLock, releaseGeminiLock, isGeminiLocked, deriveLockKey } from '@/lib/geminiLock';
import { validateAndHealDrawioXml } from '@/lib/xmlHealer';

describe('Concurrency & Lock Management', () => {
  beforeEach(() => {
    releaseGeminiLock('user_test_123');
    releaseGeminiLock('session_test_456');
    releaseGeminiLock('anonymous_default');
  });

  it('acquires lock for unique user and rejects concurrent requests', () => {
    const lockKey = deriveLockKey('test_123', null, null);
    expect(lockKey).toBe('user_test_123');

    const acquired1 = acquireGeminiLock(lockKey);
    expect(acquired1).toBe(true);
    expect(isGeminiLocked(lockKey)).toBe(true);

    const acquired2 = acquireGeminiLock(lockKey);
    expect(acquired2).toBe(false);

    releaseGeminiLock(lockKey);
    expect(isGeminiLocked(lockKey)).toBe(false);

    const acquired3 = acquireGeminiLock(lockKey);
    expect(acquired3).toBe(true);
  });

  it('isolates locks across different sessions and IP addresses', () => {
    const keyUserA = deriveLockKey('user_A', null, null);
    const keyUserB = deriveLockKey('user_B', null, null);
    const keySessionC = deriveLockKey(null, null, 'sess_C');

    expect(acquireGeminiLock(keyUserA)).toBe(true);
    expect(acquireGeminiLock(keyUserB)).toBe(true);
    expect(acquireGeminiLock(keySessionC)).toBe(true);

    expect(acquireGeminiLock(keyUserA)).toBe(false);
    expect(acquireGeminiLock(keyUserB)).toBe(false);
    expect(acquireGeminiLock(keySessionC)).toBe(false);

    releaseGeminiLock(keyUserA);
    releaseGeminiLock(keyUserB);
    releaseGeminiLock(keySessionC);
  });
});

describe('Corrupt XML Self-Healing & AST Resilience', () => {
  it('heals and restores valid mxGraph structure when given malformed or truncated XML', () => {
    const malformedXml = `<mxfile><diagram><mxGraphModel><root><mxCell id="0"/><mxCell id="1" parent="0"/><mxCell id="broken_node" value="Unclosed Tag`;

    const healed = validateAndHealDrawioXml(malformedXml, 'conceptual_diagram');
    expect(healed.xml).toBeDefined();
    expect(healed.xml).toContain('<root>');
    expect(healed.xml).toContain('</root>');
    expect(healed.xml).toMatch(/<mxCell id="0"\s*\/>/);
  });

  it('replaces completely empty XML (<root/> only) with a verified blueprint', () => {
    const emptyXml = `<mxfile><diagram id="d1"><mxGraphModel><root><mxCell id="0"/><mxCell id="1" parent="0"/></root></mxGraphModel></diagram></mxfile>`;

    const healed = validateAndHealDrawioXml(emptyXml, 'tech_event_driven_eda');
    expect(healed.xml).toBeDefined();
    const vertexCount = (healed.xml.match(/vertex="1"/g) || []).length;
    expect(vertexCount).toBeGreaterThanOrEqual(5);
  });
});
