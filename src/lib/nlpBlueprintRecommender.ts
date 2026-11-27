import {
  CANONICAL_TEMPLATES,
  type BlueprintDepthLevel,
  type CanonicalTemplate,
} from './canonical/canonicalTemplates';
import {
  createGeminiClient,
  resolveLatestGeminiModelChain,
} from './geminiConfig';
import { generateContentWithRetry } from './geminiRetryHelper';

export type PreferredDepthFilter = 'All' | BlueprintDepthLevel;

export interface NlpBlueprintRecommendation {
  rank: 1 | 2 | 3;
  templateId: string;
  name: string;
  family: CanonicalTemplate['family'];
  depthLevel: BlueprintDepthLevel;
  tags: string[];
  previewImage: string;
  primaryPurpose: string;
  keyComponents: string[];
  matchScore: number;
  reasoning: string;
  suggestedMutations: string[];
}

export interface NlpRecommendationResponse {
  prompt: string;
  preferredLevel: PreferredDepthFilter;
  inferredLevel: BlueprintDepthLevel;
  promptSummary: string;
  detectedConcepts: string[];
  engine: 'gemini-nlp' | 'semantic-vector-fallback';
  isLiveNlp: boolean;
  modelUsed: string;
  latencyMs: number;
  recommendations: NlpBlueprintRecommendation[];
}

interface RawGeminiNlpPayload {
  promptSummary?: string;
  inferredLevel?: string;
  detectedConcepts?: string[];
  recommendations?: Array<{
    rank?: number;
    templateId?: string;
    matchScore?: number;
    reasoning?: string;
    suggestedMutations?: string[];
  }>;
}

const VALID_DEPTH_LEVELS: ReadonlySet<BlueprintDepthLevel> = new Set([
  'L100',
  'L200',
  'L300',
  'L400',
]);

function normalizeDepthLevel(raw?: string | null): BlueprintDepthLevel {
  const upper = String(raw || '').trim().toUpperCase();
  if (upper === 'L100' || upper === 'L1') return 'L100';
  if (upper === 'L200' || upper === 'L2') return 'L200';
  if (upper === 'L300' || upper === 'L3') return 'L300';
  if (upper === 'L400' || upper === 'L4') return 'L400';
  return 'L300';
}

function buildCatalogDigest(pool: CanonicalTemplate[]): string {
  return pool
    .map((t) => {
      const tagStr = t.tags && t.tags.length > 0 ? ` | Tags: ${t.tags.join(', ')}` : '';
      const comps = (t.keyComponents || []).slice(0, 6).join('; ');
      return `[ID=${t.id}] Name="${t.name}" | Depth=${t.depthLevel} | Family=${t.family}${tagStr} | Purpose="${t.primaryPurpose}" | Components="${comps}" | Examples="${t.examples}"`;
    })
    .join('\n');
}

function extractJsonObject(rawText: string): RawGeminiNlpPayload | null {
  const cleaned = String(rawText || '')
    .trim()
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```\s*$/i, '')
    .trim();
  try {
    return JSON.parse(cleaned) as RawGeminiNlpPayload;
  } catch {
    const first = cleaned.indexOf('{');
    const last = cleaned.lastIndexOf('}');
    if (first !== -1 && last > first) {
      try {
        return JSON.parse(cleaned.slice(first, last + 1)) as RawGeminiNlpPayload;
      } catch {
        return null;
      }
    }
    return null;
  }
}

/**
 * Offline conceptual-similarity fallback used ONLY if no live Gemini backend is reachable.
 * Never claims to be live Gemini NLP (`engine: 'semantic-vector-fallback'`, `isLiveNlp: false`).
 */
function buildSemanticFallbackRecommendations(
  prompt: string,
  preferredLevel: PreferredDepthFilter,
  pool: CanonicalTemplate[],
  startedAt: number
): NlpRecommendationResponse {
  const tokens = prompt
    .toLowerCase()
    .replace(/[^a-z0-9/\-\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length >= 2);

  const uniqueTokens = Array.from(new Set(tokens));
  const inferredLevel: BlueprintDepthLevel =
    preferredLevel !== 'All'
      ? preferredLevel
      : /\b(l400|cidr|vpc-sc|cmek|hsm|dpop|spiffe|5-hop|five-hop|silo|force rls|exadata|principal sequence|gvisor)\b/i.test(prompt)
      ? 'L400'
      : /\b(l300|hub-and-spoke|hub and spoke|runbook|cutover|hexagonal|component|dfd|physical erd|ddl|operational)\b/i.test(prompt)
      ? 'L300'
      : /\b(l200|bpmn|swimlane|journey|state machine|use case|adr|trade-?off|erd|logical)\b/i.test(prompt)
      ? 'L200'
      : /\b(l100|executive|infographic|roadmap|pyramid|funnel|overview|conceptual|context)\b/i.test(prompt)
      ? 'L100'
      : 'L300';

  // Conceptual expansions so even fallback handles synonyms beyond literal keywords
  const conceptualClusters: Array<[RegExp, string[]]> = [
    [/multi[\s-]?tenant|saas|isolation|pool|silo|hybrid|5[\s-]?hop/i, ['99', '78']],
    [/mcp|a2a|sequence|delegation|spiffe|oidc|jwt|protocol/i, ['81', '99', '78']],
    [/agent|adk|gemini|rag|llm|gateway|model armor|guardrail/i, ['99', '78', '67', '00']],
    [/network|vpc|cidr|bgp|waf|alb|psc|perimeter|firewall/i, ['78', '99', '94']],
    [/oracle|ebs|exadata|erp|oci|goldengate/i, ['84', '78', '99']],
    [/bpmn|swimlane|process|workflow|approval|sla/i, ['95', '03']],
    [/journey|persona|touchpoint|telemetry|otel/i, ['87', '94']],
    [/use case|sod|separation of duties|rbac|iam|pam/i, ['97', '94']],
    [/state machine|statechart|lifecycle|finite state/i, ['91', '12']],
    [/erd|schema|database|ddl|alloydb|postgres|table/i, ['93', '14']],
    [/dfd|data flow|tokenization|phi|lineage/i, ['92', '69']],
    [/adr|trade[\s-]?off|comparison|decision|scoring|option/i, ['89', '56', '64']],
    [/cutover|rollback|migration|runbook|release/i, ['29', '58']],
    [/context|c4|system boundary|external actor/i, ['94', '90']],
    [/hexagonal|microservice|ports|adapters|worker/i, ['90', '69']],
    [/infographic|executive|roadmap|timeline|funnel|quadrant|pyramid/i, ['59', '56', '62', '65', '52']],
  ];

  const scored = pool.map((tpl) => {
    const docText = `${tpl.name} ${tpl.primaryPurpose} ${tpl.examples} ${tpl.keyComponents.join(' ')} ${(tpl.tags || []).join(' ')} ${tpl.depthLevel} ${tpl.family}`.toLowerCase();
    let score = 40;
    const matchedTerms: string[] = [];

    for (const tok of uniqueTokens) {
      if (docText.includes(tok)) {
        score += tpl.name.toLowerCase().includes(tok) ? 8 : 4;
        if (matchedTerms.length < 5) matchedTerms.push(tok);
      }
    }

    for (const [pattern, boostIds] of conceptualClusters) {
      if (pattern.test(prompt)) {
        const idx = boostIds.indexOf(tpl.id);
        if (idx === 0) score += 28;
        else if (idx === 1) score += 18;
        else if (idx >= 2) score += 10;
      }
    }

    if (tpl.depthLevel === inferredLevel) score += 12;
    else if (inferredLevel === 'L400' && tpl.depthLevel === 'L300') score += 5;

    return {
      tpl,
      score: Math.min(97, Math.max(52, Math.round(score))),
      matchedTerms,
    };
  });

  scored.sort((a, b) => b.score - a.score);
  const top3 = scored.slice(0, 3);

  const recommendations: NlpBlueprintRecommendation[] = top3.map((entry, idx) => {
    const rank = (idx + 1) as 1 | 2 | 3;
    const t = entry.tpl;
    const conceptNote =
      entry.matchedTerms.length > 0
        ? `aligns with your focus on ${entry.matchedTerms.slice(0, 4).join(', ')}`
        : `matches the overall architectural structure and ${t.family} viewpoint of your prompt`;
    return {
      rank,
      templateId: t.id,
      name: t.name,
      family: t.family,
      depthLevel: t.depthLevel,
      tags: t.tags || [],
      previewImage: t.previewImage || `/templates/canonical_${t.id.padStart(2, '0')}.png`,
      primaryPurpose: t.primaryPurpose,
      keyComponents: t.keyComponents,
      matchScore: entry.score,
      reasoning: `Ranked #${rank} (${t.depthLevel} ${t.family}): ${conceptNote}. Provides ready-to-mutate topology covering ${t.keyComponents.slice(0, 3).join(', ')}.`,
      suggestedMutations: [
        `Adapt component labels and flows to match "${prompt.slice(0, 64)}"`,
        `Add observability, IAM guardrails, or failover tiers specific to your deployment`,
      ],
    };
  });

  return {
    prompt,
    preferredLevel,
    inferredLevel,
    promptSummary: `Semantic analysis of "${prompt.slice(0, 120)}" targeting ${inferredLevel} architectural depth.`,
    detectedConcepts: uniqueTokens.slice(0, 6),
    engine: 'semantic-vector-fallback',
    isLiveNlp: false,
    modelUsed: 'offline-semantic-fallback',
    latencyMs: Date.now() - startedAt,
    recommendations,
  };
}

/**
 * Evaluates a natural-language user prompt with live Gemini NLP reasoning (NOT regex/keyword matching)
 * and ranks the Top 1–3 most relevant Certified Blueprints with clear architectural reasoning.
 */
export async function recommendBlueprintsWithNlp(options: {
  prompt: string;
  preferredLevel?: PreferredDepthFilter;
  explicitApiKey?: string | null;
}): Promise<NlpRecommendationResponse> {
  const startedAt = Date.now();
  const prompt = String(options.prompt || '').trim();
  const preferredLevel: PreferredDepthFilter =
    options.preferredLevel && options.preferredLevel !== 'All' && VALID_DEPTH_LEVELS.has(options.preferredLevel)
      ? options.preferredLevel
      : 'All';

  const filteredPool =
    preferredLevel === 'All'
      ? CANONICAL_TEMPLATES
      : CANONICAL_TEMPLATES.filter((t) => t.depthLevel === preferredLevel);
  const candidatePool = filteredPool.length >= 3 ? filteredPool : CANONICAL_TEMPLATES;
  const byId = new Map(candidatePool.map((t) => [t.id, t]));

  const ai = createGeminiClient(options.explicitApiKey);
  if (!ai) {
    return buildSemanticFallbackRecommendations(prompt, preferredLevel, candidatePool, startedAt);
  }

  const catalogDigest = buildCatalogDigest(candidatePool);
  const levelGuidance =
    preferredLevel === 'All'
      ? 'Infer the best architectural depth level (L100 Conceptual/Executive, L200 Logical/Process, L300 Reference/Component, L400 Most Detailed Physical/Multi-Tenant/Security-Hardened) from the semantic intent and technical specificity of the prompt.'
      : `The user explicitly filtered for Level ${preferredLevel}. Strictly choose all 3 recommendations from the ${preferredLevel} candidates below.`;

  const systemInstruction = `You are a Principal Cloud & Enterprise Solutions Architect performing deep NLP semantic evaluation of a user's architecture prompt against a certified catalog of Draw.io blueprint templates.

CRITICAL RULES:
1. Perform TRUE semantic NLP understanding — analyze architectural intent, problem domain, isolation/multi-tenancy model, protocol/runtime needs, viewpoint (topology vs sequence vs BPMN vs ERD vs DFD vs ADR vs executive infographic), and detail depth (L100 -> L400, where L400 is the most detailed and comprehensive). Do NOT do naive keyword matching.
2. Select EXACTLY 3 DISTINCT blueprints from the provided catalog in strict descending relevance order: rank 1 (best match), rank 2 (strong runner-up), rank 3 (complementary alternative).
3. Every templateId MUST exactly match an [ID=...] from the catalog below.
4. For EACH of the 3 choices, write a crisp, concrete 2-sentence "reasoning" explaining specifically WHY this template fits the user's prompt (referencing both the user's stated goals and the blueprint's concrete architecture) and WHY it sits at rank 1, 2, or 3.
5. Provide 2 short, actionable "suggestedMutations" for each template so once the user selects it, they know how to tailor it via subsequent prompts or Draw.io edits.
6. Return ONLY valid JSON matching the exact schema below.`;

  const userMessage = `USER PROMPT:
"""
${prompt}
"""

LEVEL CONSTRAINT:
${levelGuidance}

CERTIFIED BLUEPRINT CATALOG (${candidatePool.length} candidates):
${catalogDigest}

Return strict JSON with this exact structure:
{
  "promptSummary": "1 concise sentence summarizing the user's architectural goal",
  "inferredLevel": "L100" | "L200" | "L300" | "L400",
  "detectedConcepts": ["concept 1", "concept 2", "concept 3", "concept 4"],
  "recommendations": [
    {
      "rank": 1,
      "templateId": "99",
      "matchScore": 95,
      "reasoning": "Specific NLP reasoning linking user prompt goals to this blueprint's architecture.",
      "suggestedMutations": ["Concrete follow-up edit 1", "Concrete follow-up edit 2"]
    },
    {
      "rank": 2,
      "templateId": "78",
      "matchScore": 86,
      "reasoning": "...",
      "suggestedMutations": ["...", "..."]
    },
    {
      "rank": 3,
      "templateId": "94",
      "matchScore": 79,
      "reasoning": "...",
      "suggestedMutations": ["...", "..."]
    }
  ]
}`;

  const modelChain = await resolveLatestGeminiModelChain(ai, 'medium');

  for (const modelId of modelChain) {
    try {
      const response = await generateContentWithRetry(
        ai,
        {
          model: modelId,
          contents: [{ role: 'user', parts: [{ text: userMessage }] }],
          config: {
            systemInstruction,
            temperature: 0.2,
            responseMimeType: 'application/json',
          },
        },
        { maxRetries: 2, perAttemptTimeoutMs: 25_000, totalBudgetMs: 40_000, label: 'nlp-blueprint-recommend' }
      );

      const rawText = response?.text || '';
      const parsed = extractJsonObject(rawText);
      if (!parsed || !Array.isArray(parsed.recommendations) || parsed.recommendations.length === 0) {
        continue;
      }

      const seen = new Set<string>();
      const validRecs: NlpBlueprintRecommendation[] = [];

      for (const item of parsed.recommendations) {
        const rawId = String(item?.templateId || '').replace(/^#/, '').trim();
        const padded = rawId.padStart(2, '0');
        const tpl = byId.get(rawId) || byId.get(padded);
        if (!tpl || seen.has(tpl.id)) continue;
        seen.add(tpl.id);

        const rank = (validRecs.length + 1) as 1 | 2 | 3;
        const scoreNum = Number(item?.matchScore);
        const clampedScore = Number.isFinite(scoreNum)
          ? Math.min(99, Math.max(45, Math.round(scoreNum)))
          : Math.max(70, 96 - (rank - 1) * 7);

        validRecs.push({
          rank,
          templateId: tpl.id,
          name: tpl.name,
          family: tpl.family,
          depthLevel: tpl.depthLevel,
          tags: tpl.tags || [],
          previewImage: tpl.previewImage || `/templates/canonical_${tpl.id.padStart(2, '0')}.png`,
          primaryPurpose: tpl.primaryPurpose,
          keyComponents: tpl.keyComponents,
          matchScore: clampedScore,
          reasoning:
            String(item?.reasoning || '').trim() ||
            `Selected by Gemini NLP as #${rank} match for its ${tpl.depthLevel} ${tpl.family} coverage of ${tpl.keyComponents.slice(0, 3).join(', ')}.`,
          suggestedMutations: Array.isArray(item?.suggestedMutations)
            ? item.suggestedMutations.map((s) => String(s || '').trim()).filter(Boolean).slice(0, 3)
            : [],
        });

        if (validRecs.length === 3) break;
      }

      // Guarantee 3 ranked choices by padding from semantic fallback if Gemini returned <3 valid unique IDs
      if (validRecs.length < 3) {
        const fb = buildSemanticFallbackRecommendations(prompt, preferredLevel, candidatePool, startedAt);
        for (const rec of fb.recommendations) {
          if (!seen.has(rec.templateId) && validRecs.length < 3) {
            seen.add(rec.templateId);
            validRecs.push({ ...rec, rank: (validRecs.length + 1) as 1 | 2 | 3 });
          }
        }
      }

      if (validRecs.length > 0) {
        return {
          prompt,
          preferredLevel,
          inferredLevel:
            preferredLevel !== 'All'
              ? preferredLevel
              : normalizeDepthLevel(parsed.inferredLevel || validRecs[0]?.depthLevel),
          promptSummary:
            String(parsed.promptSummary || '').trim() ||
            `NLP evaluation for "${prompt.slice(0, 120)}".`,
          detectedConcepts: Array.isArray(parsed.detectedConcepts)
            ? parsed.detectedConcepts.map((c) => String(c || '').trim()).filter(Boolean).slice(0, 6)
            : [],
          engine: 'gemini-nlp',
          isLiveNlp: true,
          modelUsed: modelId,
          latencyMs: Date.now() - startedAt,
          recommendations: validRecs,
        };
      }
    } catch (err) {
      console.warn(`[nlpBlueprintRecommender] Model ${modelId} failed, trying next:`, err);
    }
  }

  return buildSemanticFallbackRecommendations(prompt, preferredLevel, candidatePool, startedAt);
}
