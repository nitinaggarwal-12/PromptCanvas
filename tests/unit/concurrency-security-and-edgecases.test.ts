import { describe, it, expect, beforeEach } from 'vitest';
import { acquireGeminiLock, releaseGeminiLock, isGeminiLocked, deriveLockKey } from '@/lib/geminiLock';
import { customizeDiagramTemplateWithGemini } from '@/lib/geminiDiagramCustomizer';
import { validateAndHealDrawioXml } from '@/lib/xmlHealer';

describe('Blind Spot 1: Concurrency & Lock Management', () => {
  beforeEach(() => {
    releaseGeminiLock('user_test_123');
    releaseGeminiLock('session_test_456');
    releaseGeminiLock('anonymous_default');
  });

  it('should acquire lock for unique user and reject concurrent requests', () => {
    const lockKey = deriveLockKey('test_123', null, null);
    expect(lockKey).toBe('user_test_123');

    // First request acquires lock
    const acquired1 = acquireGeminiLock(lockKey);
    expect(acquired1).toBe(true);
    expect(isGeminiLocked(lockKey)).toBe(true);

    // Concurrent second request is rejected (429 prevention)
    const acquired2 = acquireGeminiLock(lockKey);
    expect(acquired2).toBe(false);

    // Release lock
    releaseGeminiLock(lockKey);
    expect(isGeminiLocked(lockKey)).toBe(false);

    // Third request can now proceed
    const acquired3 = acquireGeminiLock(lockKey);
    expect(acquired3).toBe(true);
  });

  it('should isolate locks across different sessions and IP addresses', () => {
    const keyUserA = deriveLockKey('user_A', null, null);
    const keyUserB = deriveLockKey('user_B', null, null);
    const keySessionC = deriveLockKey(null, null, 'sess_C');

    expect(acquireGeminiLock(keyUserA)).toBe(true);
    expect(acquireGeminiLock(keyUserB)).toBe(true);
    expect(acquireGeminiLock(keySessionC)).toBe(true);

    // Each user holds their own lock independently
    expect(acquireGeminiLock(keyUserA)).toBe(false);
    expect(acquireGeminiLock(keyUserB)).toBe(false);
    expect(acquireGeminiLock(keySessionC)).toBe(false);

    releaseGeminiLock(keyUserA);
    releaseGeminiLock(keyUserB);
    releaseGeminiLock(keySessionC);
  });
});

describe('Blind Spot 2: Special Characters, XML Injection & HTML Sanitization', () => {
  const baseXml = `<mxfile><diagram id="d1"><mxGraphModel><root><mxCell id="0"/><mxCell id="1" parent="0"/><mxCell id="card_1" value="&lt;table&gt;&lt;tr&gt;&lt;td&gt;&lt;b&gt;Existing Title&lt;/b&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;" vertex="1" parent="1"><mxGeometry x="100" y="100" width="200" height="80" as="geometry"/></mxCell></root></mxGraphModel></diagram></mxfile>`;

  it('should safely handle quotes, angle brackets, and XML injection tokens in prompts', async () => {
    const maliciousPrompt = `Special chars: <script>alert("XSS")</script> & "quotes" & 'apos' & <mxCell id="injected">`;
    
    const result = await customizeDiagramTemplateWithGemini(
      baseXml,
      maliciousPrompt,
      'conceptual_diagram'
    );

    expect(result.xml).toBeDefined();
    // Validate AST is well-formed and healed
    const healed = validateAndHealDrawioXml(result.xml);
    expect(healed.isValid).toBe(true);
    expect(healed.xml).not.toContain('<script>');
  });

  it('should preserve XML syntax when prompt contains unicode, emoticons, and multi-language characters', async () => {
    const unicodePrompt = `Architect a Global Cloud Mesh: 🚀 ☁️ 🛡️ 日本語 / 中文 / Español & High-Throughput Pipelines`;
    
    const result = await customizeDiagramTemplateWithGemini(
      baseXml,
      unicodePrompt,
      'agentic_rag'
    );

    const healed = validateAndHealDrawioXml(result.xml);
    expect(healed.isValid).toBe(true);
    expect(healed.xml.length).toBeGreaterThan(100);
  });
});

describe('Blind Spot 3: Corrupt XML Self-Healing & AST Resilience', () => {
  it('should heal and restore valid mxGraph structure when given malformed or truncated XML', () => {
    const malformedXml = `<mxfile><diagram><mxGraphModel><root><mxCell id="0"/><mxCell id="1" parent="0"/><mxCell id="broken_node" value="Unclosed Tag`;
    
    const healed = validateAndHealDrawioXml(malformedXml, 'conceptual_diagram');
    expect(healed.xml).toBeDefined();
    expect(healed.xml).toContain('<root>');
    expect(healed.xml).toContain('</root>');
    expect(healed.xml).toContain('<mxCell id="0"/>');
  });

  it('should replace completely empty XML (<root/> only) with a verified 1400x800 blueprint', () => {
    const emptyXml = `<mxfile><diagram id="d1"><mxGraphModel><root><mxCell id="0"/><mxCell id="1" parent="0"/></root></mxGraphModel></diagram></mxfile>`;
    
    const healed = validateAndHealDrawioXml(emptyXml, 'tech_event_driven_eda');
    expect(healed.xml).toBeDefined();
    const vertexCount = (healed.xml.match(/vertex="1"/g) || []).length;
    expect(vertexCount).toBeGreaterThanOrEqual(5);
  });
});
