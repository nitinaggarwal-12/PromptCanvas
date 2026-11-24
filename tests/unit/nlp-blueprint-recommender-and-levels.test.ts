import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  CANONICAL_TEMPLATES,
  CANONICAL_DEPTH_LEVELS,
  DEPTH_LEVEL_META,
  type BlueprintDepthLevel,
} from '../../src/lib/canonical/canonicalTemplates';
import { recommendBlueprintsWithNlp } from '../../src/lib/nlpBlueprintRecommender';
import * as geminiConfig from '../../src/lib/geminiConfig';
import * as geminiRetry from '../../src/lib/geminiRetryHelper';

describe('Architecture Depth Levels (L100–L400) & NLP Top 1–3 Blueprint Recommender', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('assigns a valid L100/L200/L300/L400 depthLevel to all 41 certified blueprints with L400 as most detailed', () => {
    expect(CANONICAL_TEMPLATES.length).toBe(41);
    expect(CANONICAL_DEPTH_LEVELS).toEqual(['All', 'L100', 'L200', 'L300', 'L400']);

    const counts: Record<BlueprintDepthLevel, number> = {
      L100: 0,
      L200: 0,
      L300: 0,
      L400: 0,
    };

    for (const tpl of CANONICAL_TEMPLATES) {
      expect(['L100', 'L200', 'L300', 'L400']).toContain(tpl.depthLevel);
      counts[tpl.depthLevel] += 1;
    }

    expect(counts.L100).toBeGreaterThan(0);
    expect(counts.L200).toBeGreaterThan(0);
    expect(counts.L300).toBeGreaterThan(0);
    expect(counts.L400).toBe(9);
    expect(counts.L100 + counts.L200 + counts.L300 + counts.L400).toBe(41);

    const bp99 = CANONICAL_TEMPLATES.find((t) => t.id === '99');
    expect(bp99?.depthLevel).toBe('L400');
    expect(bp99?.tags).toContain('L400 GCP');

    const bp78 = CANONICAL_TEMPLATES.find((t) => t.id === '78');
    expect(bp78?.depthLevel).toBe('L300');

    expect(DEPTH_LEVEL_META.L400.label).toContain('Most Detailed');
  });

  it('uses live Gemini NLP to rank Top 1–3 blueprints in order with concrete reasoning and respects preferredLevel', async () => {
    vi.spyOn(geminiConfig, 'createGeminiClient').mockReturnValue({} as any);
    vi.spyOn(geminiConfig, 'resolveLatestGeminiModelChain').mockResolvedValue(['gemini-2.5-flash']);
    vi.spyOn(geminiRetry, 'generateContentWithRetry').mockResolvedValue({
      text: JSON.stringify({
        promptSummary: 'Multi-tenant GCP agentic platform requiring Pool, Hybrid PSC, and Sovereign HSM CMEK Silo isolation.',
        inferredLevel: 'L400',
        detectedConcepts: ['Multi-Tenant Isolation', '5-Hop Control Plane', 'DPoP + STS', 'HSM CMEK Silo'],
        recommendations: [
          {
            rank: 1,
            templateId: '99',
            matchScore: 98,
            reasoning: 'Template #99 directly models the 80% shared 5-Hop control plane with Pool (AlloyDB FORCE RLS), Hybrid (/28 PSC spokes), and Sovereign HSM CMEK Silo targets.',
            suggestedMutations: ['Add regional failover for Hop 3 Cloud Run', 'Expose BigQuery FinOps chargeback dashboard'],
          },
          {
            rank: 2,
            templateId: '79',
            matchScore: 91,
            reasoning: 'Template #79 supplies the L400 VPC CIDR blocks, BGP ASN 64512, Cloud Armor WAF, and PSC subnet geometry for the same hub-and-spoke multi-tenant topology.',
            suggestedMutations: ['Add custom PSC spoke CIDR ranges'],
          },
          {
            rank: 3,
            templateId: '81',
            matchScore: 84,
            reasoning: 'Template #81 provides the L400 runtime interaction sequence showing OIDC JWT, SPIFFE mTLS, and Agent Gateway delegation.',
            suggestedMutations: ['Insert Valkey session cache lifeline'],
          },
        ],
      }),
    } as any);

    const res = await recommendBlueprintsWithNlp({
      prompt: 'Build an L400 multi-tenant GCP agent platform with shared 5-hop governance and Pool/Hybrid/Silo isolation',
      preferredLevel: 'L400',
    });

    expect(res.engine).toBe('gemini-nlp');
    expect(res.isLiveNlp).toBe(true);
    expect(res.inferredLevel).toBe('L400');
    expect(res.recommendations.length).toBe(3);
    expect(res.recommendations.map((r) => r.rank)).toEqual([1, 2, 3]);
    expect(res.recommendations.map((r) => r.templateId)).toEqual(['99', '79', '81']);
    expect(res.recommendations.every((r) => r.depthLevel === 'L400')).toBe(true);
    expect(res.recommendations[0].reasoning).toContain('5-Hop');
    expect(res.recommendations[0].suggestedMutations.length).toBeGreaterThan(0);
  });

  it('gracefully falls back to conceptual similarity if Gemini backend is unavailable without pretending to be live NLP', async () => {
    vi.spyOn(geminiConfig, 'createGeminiClient').mockReturnValue(null);

    const res = await recommendBlueprintsWithNlp({
      prompt: 'Need a detailed L400 Oracle EBS R12.2 on Exadata X10M architecture on Google Cloud',
      preferredLevel: 'L400',
    });

    expect(res.engine).toBe('semantic-vector-fallback');
    expect(res.isLiveNlp).toBe(false);
    expect(res.recommendations.length).toBe(3);
    expect(res.recommendations[0].templateId).toBe('84');
    expect(res.recommendations.every((r) => r.depthLevel === 'L400')).toBe(true);
  });
});
