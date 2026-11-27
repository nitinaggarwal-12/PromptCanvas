import { Type } from '@google/genai';
import {
  CROSS_FAMILY_JUDGE_MODEL_ID,
  GEMINI_PRO_MODEL_ID,
  GEMINI_SECONDARY_PRO_MODEL_ID,
  createGeminiClient,
  getGenConfigForModel,
  resolveLatestDistinctJudgeChain,
} from './geminiConfig';
import { generateContentWithRetry } from './geminiRetryHelper';
import { validateDrawioXml, type ValidationResult } from './validate/validator';
import {
  clusterCompositeCards,
  parseDrawioXmlSpatialState,
} from './freeform/directDrawioSpatialMutator';
import {
  classifyDiagramDomainKind,
  computeHonestDiagramHealth,
  type DiagramDomainKind,
  type HonestAuditDimension,
} from './diagramAstHealth';

export { classifyDiagramDomainKind, computeHonestDiagramHealth };
export type { DiagramDomainKind, HonestAuditDimension };

export interface ActionableJudgeDefect {
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  category: 'TECHNICAL_ACCURACY' | 'TOPOLOGY_WIRING' | 'PROMPT_FIDELITY' | 'SPATIAL_GEOMETRY' | 'SECURITY_GOVERNANCE';
  cellIds: string[];
  title: string;
  detail: string;
  repairInstruction: string;
}

export interface SingleJudgeVerdict {
  judgeRole: 'primary_pro_critic' | 'cross_family_critic';
  modelId: string;
  executed: boolean;
  latencyMs: number;
  truthfulnessScore: number;
  groundingScore: number;
  completenessScore: number;
  relevanceScore: number;
  technicalSummary: string;
  defects: ActionableJudgeDefect[];
}

export interface OrthogonalMultiModelJudgeReport {
  evaluatedAtUtc: string;
  isLiveModelEvaluated: boolean;
  generatorModel: string;
  primaryJudgeModel: string;
  crossFamilyJudgeModel: string;
  domainKind: DiagramDomainKind;
  verdict: 'CERTIFIED' | 'NEEDS_REPAIR' | 'FAILED_INCOMPLETE_STUB' | 'UNVERIFIED_OFFLINE';
  scores: {
    truthfulnessAndReality: number;
    externalStandardsGrounding: number;
    logicalMissionCompleteness: number;
    promptRelevance: number;
    geometricZeroCollision: number;
    overallCompositeScore: number;
  };
  dimensions: HonestAuditDimension[];
  judgeVerdicts: SingleJudgeVerdict[];
  actionableDefects: ActionableJudgeDefect[];
  validationReport: ValidationResult;
  inventorySummary: {
    zoneCount: number;
    cardCount: number;
    edgeCount: number;
    overlapCount: number;
    intersectingEdgeCount: number;
    danglingEdgeCount: number;
    contrastErrorCount: number;
    brokenImageCount: number;
  };
}


function buildBeforeAfterDiffSummary(beforeXml: string | undefined, afterXml: string): string {
  if (!beforeXml || !beforeXml.trim()) return 'Initial diagram (no prior baseline XML).';
  try {
    const beforeState = parseDrawioXmlSpatialState(beforeXml);
    const afterState = parseDrawioXmlSpatialState(afterXml);
    const beforeCards = new Map(clusterCompositeCards(beforeState).cards.map((c) => [c.id, c]));
    const afterCards = new Map(clusterCompositeCards(afterState).cards.map((c) => [c.id, c]));

    const addedCards: string[] = [];
    const removedCards: string[] = [];
    const modifiedCards: string[] = [];

    for (const [id, c] of afterCards) {
      const prev = beforeCards.get(id);
      if (!prev) {
        addedCards.push(`${id}("${c.label}") @ [${c.rect.join(',')}]`);
      } else if (prev.label !== c.label || Math.abs(prev.rect[0] - c.rect[0]) > 4 || Math.abs(prev.rect[1] - c.rect[1]) > 4) {
        modifiedCards.push(`${id}: "${prev.label}" -> "${c.label}" @ [${c.rect.join(',')}]`);
      }
    }
    for (const [id, c] of beforeCards) {
      if (!afterCards.has(id)) {
        removedCards.push(`${id}("${c.label}")`);
      }
    }

    const beforeEdgeSet = new Set(beforeState.edges.map((e) => `${e.id}:${e.source}->${e.target}:${e.plainLabel}`));
    const afterEdgeSet = new Set(afterState.edges.map((e) => `${e.id}:${e.source}->${e.target}:${e.plainLabel}`));
    const addedEdges = [...afterEdgeSet].filter((x) => !beforeEdgeSet.has(x));
    const removedEdges = [...beforeEdgeSet].filter((x) => !afterEdgeSet.has(x));

    return JSON.stringify(
      {
        addedCards,
        removedCards,
        modifiedCards,
        addedEdges,
        removedEdges,
      },
      null,
      2
    );
  } catch {
    return 'Unable to compute structural diff.';
  }
}

/**
 * Executes a real Server-Side Orthogonal Multi-Model Judge Panel:
 * - Judge 1 (`gemini-3.1-pro-preview` or `gemini-2.5-pro`, strictly distinct from & >= generator):
 *   Frontier reasoning + optional multimodal PNG inspection over the FULL parsed node & edge inventory.
 * - Judge 2 (`gemma-4-31b-it`, distinct open-weights architecture family):
 *   Independent cross-family adversarial critique catching shared-family blindspots and technical/causal flaws.
 * - Deterministic AST & Geometry Gate (`validateDrawioXml` + `computeHonestDiagramHealth`):
 *   Hard mathematical ceilings with zero score floors.
 */
export async function runOrthogonalMultiModelJudge(params: {
  userPrompt: string;
  modificationPrompt?: string;
  xmlContent: string;
  beforeXml?: string;
  generatorModel?: string;
  imageBase64?: string;
  explicitApiKey?: string;
}): Promise<OrthogonalMultiModelJudgeReport> {
  const evaluatedAtUtc = new Date().toISOString();
  const generatorModel = params.generatorModel || 'unknown-generator';
  const health = computeHonestDiagramHealth(
    params.xmlContent,
    `${params.userPrompt || ''} ${params.modificationPrompt || ''}`
  );

  if (health.isBlank || health.isStub) {
    const stubScore = health.isBlank ? 0 : 20;
    return {
      evaluatedAtUtc,
      isLiveModelEvaluated: false,
      generatorModel,
      primaryJudgeModel: 'none (stub-gate-rejected)',
      crossFamilyJudgeModel: 'none (stub-gate-rejected)',
      domainKind: health.domainKind,
      verdict: 'FAILED_INCOMPLETE_STUB',
      scores: {
        truthfulnessAndReality: stubScore,
        externalStandardsGrounding: stubScore,
        logicalMissionCompleteness: stubScore,
        promptRelevance: stubScore,
        geometricZeroCollision: health.dimensions.find((d) => d.category === 'visual')?.score ?? 0,
        overallCompositeScore: stubScore,
      },
      dimensions: health.dimensions,
      judgeVerdicts: [],
      actionableDefects: [
        {
          severity: 'CRITICAL',
          category: 'PROMPT_FIDELITY',
          cellIds: [],
          title: health.isBlank ? 'Blank Canvas' : 'Incomplete Stub Topology',
          detail: `Canvas contains ${health.inventory.cardCount} component card(s) and ${health.inventory.edgeCount} connector(s).`,
          repairInstruction: 'Synthesize a complete multi-component architecture with connected end-to-end flows.',
        },
      ],
      validationReport: health.validation,
      inventorySummary: health.inventory,
    };
  }

  const ai = createGeminiClient(params.explicitApiKey);
  const visualDeterministicScore = health.dimensions.find((d) => d.category === 'visual')?.score ?? 0;
  const topoDeterministicScore = health.dimensions.find((d) => d.category === 'topology')?.score ?? 0;
  const secDeterministicScore = health.dimensions.find((d) => d.category === 'security')?.score ?? 0;

  if (!ai) {
    const astAvg = Math.round(
      health.dimensions.reduce((acc, d) => acc + d.score, 0) / Math.max(1, health.dimensions.length)
    );
    return {
      evaluatedAtUtc,
      isLiveModelEvaluated: false,
      generatorModel,
      primaryJudgeModel: 'none (offline — deterministic AST only)',
      crossFamilyJudgeModel: 'none (offline — deterministic AST only)',
      domainKind: health.domainKind,
      verdict: 'UNVERIFIED_OFFLINE',
      scores: {
        truthfulnessAndReality: secDeterministicScore,
        externalStandardsGrounding: secDeterministicScore,
        logicalMissionCompleteness: topoDeterministicScore,
        promptRelevance: topoDeterministicScore,
        geometricZeroCollision: visualDeterministicScore,
        overallCompositeScore: astAvg,
      },
      dimensions: health.dimensions,
      judgeVerdicts: [],
      actionableDefects: health.validation.errors.slice(0, 10).map((e) => ({
        severity: 'HIGH',
        category: 'SPATIAL_GEOMETRY',
        cellIds: e.cells,
        title: e.code,
        detail: e.detail,
        repairInstruction: `Resolve ${e.code} on cell(s): ${e.cells.join(', ') || 'canvas'}.`,
      })),
      validationReport: health.validation,
      inventorySummary: health.inventory,
    };
  }

  const distinctChain = await resolveLatestDistinctJudgeChain(ai, generatorModel);
  const primaryJudgeCandidate =
    distinctChain.find((m) => m.toLowerCase().includes('pro')) ||
    (generatorModel.toLowerCase() === GEMINI_PRO_MODEL_ID.toLowerCase()
      ? GEMINI_SECONDARY_PRO_MODEL_ID
      : GEMINI_PRO_MODEL_ID);
  const crossFamilyCandidate =
    distinctChain.find((m) => m.toLowerCase().startsWith('gemma-4-')) ||
    CROSS_FAMILY_JUDGE_MODEL_ID;

  const diffSummary = buildBeforeAfterDiffSummary(params.beforeXml, params.xmlContent);

  const sharedAuditBrief = `### USER ORIGINAL CONTEXT / TITLE:
"${params.userPrompt}"
${params.modificationPrompt ? `\n### EXPLICIT MODIFICATION REQUESTED:\n"${params.modificationPrompt}"\n\n### STRUCTURAL DIFF (BEFORE -> AFTER):\n${diffSummary}\n` : ''}
### FULL PARSED DRAW.IO CANVAS INVENTORY (ZONES, COMPOSITE CARDS, DIRECTED EDGES & VALIDATOR ERRORS):
${health.compactInventoryJson}`;

  const judgeJsonInstruction = `Evaluate the actual Draw.io diagram inventory above with strict engineering rigor (ZERO generosity, ZERO grade inflation):
1. Technical & Cloud/Domain Accuracy: Check every SKU, region/witness quorum, K8s/cloud config, protocol, and notation. Flag any made-up features, wrong cloud vendor services, or invalid specs.
2. Causal & Topological Integrity: Check every edge direction ("from -> to"). Flag inverted arrows (e.g., ReAct loops backwards, clients bypassing load balancers directly to databases, disconnected new nodes, or missing return paths).
3. Prompt & Modification Fidelity: If a modification was requested, verify whether the exact requested change was accurately applied without collateral damage or unrequested security-theatre banners.
4. Spatial & Visual Cleanliness: Incorporate validator errors (overlaps, edge-card intersections, broken icons, low contrast) into your score.

Return ONLY a valid JSON object with this exact shape:
{
  "truthfulnessScore": <number 0-100>,
  "groundingScore": <number 0-100>,
  "completenessScore": <number 0-100>,
  "relevanceScore": <number 0-100>,
  "technicalSummary": "<2-3 concise sentences citing concrete node IDs and findings>",
  "defects": [
    {
      "severity": "CRITICAL" | "HIGH" | "MEDIUM" | "LOW",
      "category": "TECHNICAL_ACCURACY" | "TOPOLOGY_WIRING" | "PROMPT_FIDELITY" | "SPATIAL_GEOMETRY" | "SECURITY_GOVERNANCE",
      "cellIds": ["<affected cell id>"],
      "title": "<short defect title>",
      "detail": "<specific technical or spatial flaw>",
      "repairInstruction": "<exact surgical fix instruction>"
    }
  ]
}`;

  const cleanImageB64 = params.imageBase64
    ? params.imageBase64.replace(/^data:image\/\w+;base64,/, '').trim()
    : '';

  // Run Judge 1 (Frontier Pro Reasoning + Optional Multimodal PNG) and Judge 2 (Gemma 4 31B Cross-Family Critic) in parallel
  const runSingleJudge = async (
    role: 'primary_pro_critic' | 'cross_family_critic',
    modelId: string
  ): Promise<SingleJudgeVerdict> => {
    const tStart = Date.now();
    try {
      const parts: any[] = [
        {
          text: `You are ${
            role === 'primary_pro_critic'
              ? `Judge 1 (Principal Architecture & Multimodal Critic, ${modelId}, auditing ${generatorModel})`
              : `Judge 2 (Independent Cross-Family Adversarial Critic, ${modelId}, auditing ${generatorModel})`
          }.\n\n${sharedAuditBrief}\n\n${judgeJsonInstruction}`,
        },
      ];
      if (cleanImageB64 && cleanImageB64.length > 100) {
        parts.push({
          inlineData: {
            mimeType: 'image/png',
            data: cleanImageB64,
          },
        });
      }

      const isGemma = modelId.toLowerCase().startsWith('gemma-');
      const sharedResponseSchema = {
        type: Type.OBJECT,
        properties: {
          truthfulnessScore: { type: Type.NUMBER },
          groundingScore: { type: Type.NUMBER },
          completenessScore: { type: Type.NUMBER },
          relevanceScore: { type: Type.NUMBER },
          technicalSummary: { type: Type.STRING },
          defects: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                severity: { type: Type.STRING },
                category: { type: Type.STRING },
                cellIds: { type: Type.ARRAY, items: { type: Type.STRING } },
                title: { type: Type.STRING },
                detail: { type: Type.STRING },
                repairInstruction: { type: Type.STRING },
              },
              required: ['severity', 'category', 'cellIds', 'title', 'detail', 'repairInstruction'],
            },
          },
        },
        required: [
          'truthfulnessScore',
          'groundingScore',
          'completenessScore',
          'relevanceScore',
          'technicalSummary',
          'defects',
        ],
      };

      const config: any = {
        temperature: 0.1,
        maxOutputTokens: 8192,
        responseMimeType: 'application/json',
        responseSchema: sharedResponseSchema,
        ...(isGemma
          ? { thinkingConfig: { thinkingLevel: 'MINIMAL' as any } }
          : { thinkingConfig: getGenConfigForModel('audit', modelId).thinkingConfig }),
      };

      const res = await generateContentWithRetry(
        ai,
        {
          model: modelId,
          contents: [{ role: 'user', parts }],
          config,
        },
        {
          maxRetries: 2,
          perAttemptTimeoutMs: 35_000,
          totalBudgetMs: 45_000,
          label: role === 'primary_pro_critic' ? `Judge 1 (${modelId})` : `Judge 2 (${modelId})`,
        }
      );

      const resolvedModel = String((res as any)?.__resolvedModelId || modelId);
      const rawText = String(res?.text || '').trim();
      const cleanedJson = rawText
        .replace(/^```(?:json)?\s*/i, '')
        .replace(/\s*```$/i, '')
        .trim();
      const firstBrace = cleanedJson.indexOf('{');
      const lastBrace = cleanedJson.lastIndexOf('}');
      const jsonSlice =
        firstBrace !== -1 && lastBrace > firstBrace
          ? cleanedJson.slice(firstBrace, lastBrace + 1)
          : cleanedJson;
      const parsed: Record<string, any> = jsonSlice ? JSON.parse(jsonSlice) : {};
      const clamp100 = (n: any, fb: number) =>
        typeof n === 'number' && Number.isFinite(n) ? Math.max(0, Math.min(100, Math.round(n))) : fb;

      const defects: ActionableJudgeDefect[] = Array.isArray(parsed.defects)
        ? parsed.defects.slice(0, 12).map((d: any) => ({
            severity: ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].includes(String(d?.severity).toUpperCase())
              ? (String(d.severity).toUpperCase() as ActionableJudgeDefect['severity'])
              : 'MEDIUM',
            category: [
              'TECHNICAL_ACCURACY',
              'TOPOLOGY_WIRING',
              'PROMPT_FIDELITY',
              'SPATIAL_GEOMETRY',
              'SECURITY_GOVERNANCE',
            ].includes(String(d?.category).toUpperCase())
              ? (String(d.category).toUpperCase() as ActionableJudgeDefect['category'])
              : 'TECHNICAL_ACCURACY',
            cellIds: Array.isArray(d?.cellIds) ? d.cellIds.map(String) : [],
            title: String(d?.title || 'Architectural Finding').slice(0, 120),
            detail: String(d?.detail || '').slice(0, 400),
            repairInstruction: String(d?.repairInstruction || '').slice(0, 300),
          }))
        : [];

      return {
        judgeRole: role,
        modelId: resolvedModel,
        executed: true,
        latencyMs: Date.now() - tStart,
        truthfulnessScore: clamp100(parsed.truthfulnessScore, 80),
        groundingScore: clamp100(parsed.groundingScore, 80),
        completenessScore: clamp100(parsed.completenessScore, 80),
        relevanceScore: clamp100(parsed.relevanceScore, 80),
        technicalSummary: String(parsed.technicalSummary || '').trim(),
        defects,
      };
    } catch (err: any) {
      console.warn(`[OrthogonalMultiModelJudge] ${role} (${modelId}) failed:`, err?.message || err);
      return {
        judgeRole: role,
        modelId,
        executed: false,
        latencyMs: Date.now() - tStart,
        truthfulnessScore: 0,
        groundingScore: 0,
        completenessScore: 0,
        relevanceScore: 0,
        technicalSummary: `Judge execution failed (${err?.message ? String(err.message).slice(0, 100) : 'upstream error'}).`,
        defects: [],
      };
    }
  };

  const [judge1, judge2] = await Promise.all([
    runSingleJudge('primary_pro_critic', primaryJudgeCandidate),
    runSingleJudge('cross_family_critic', crossFamilyCandidate),
  ]);

  const executedJudges = [judge1, judge2].filter((j) => j.executed);
  if (executedJudges.length === 0) {
    const astAvg = Math.round(
      health.dimensions.reduce((acc, d) => acc + d.score, 0) / Math.max(1, health.dimensions.length)
    );
    return {
      evaluatedAtUtc,
      isLiveModelEvaluated: false,
      generatorModel,
      primaryJudgeModel: `${judge1.modelId} (failed)`,
      crossFamilyJudgeModel: `${judge2.modelId} (failed)`,
      domainKind: health.domainKind,
      verdict: 'UNVERIFIED_OFFLINE',
      scores: {
        truthfulnessAndReality: secDeterministicScore,
        externalStandardsGrounding: secDeterministicScore,
        logicalMissionCompleteness: topoDeterministicScore,
        promptRelevance: topoDeterministicScore,
        geometricZeroCollision: visualDeterministicScore,
        overallCompositeScore: astAvg,
      },
      dimensions: health.dimensions,
      judgeVerdicts: [judge1, judge2],
      actionableDefects: health.validation.errors.slice(0, 10).map((e) => ({
        severity: 'HIGH',
        category: 'SPATIAL_GEOMETRY',
        cellIds: e.cells,
        title: e.code,
        detail: e.detail,
        repairInstruction: `Resolve ${e.code} on cell(s): ${e.cells.join(', ') || 'canvas'}.`,
      })),
      validationReport: health.validation,
      inventorySummary: health.inventory,
    };
  }

  // Conservative multi-judge aggregation: weight Primary Pro Judge (60%) + Cross-Family Gemma 4 31B Judge (40%),
  // and cap completeness/geometry by deterministic AST topological & spatial ceilings.
  const blend = (pick: (j: SingleJudgeVerdict) => number): number => {
    if (judge1.executed && judge2.executed) {
      return Math.round(pick(judge1) * 0.6 + pick(judge2) * 0.4);
    }
    return pick(executedJudges[0]);
  };

  const mergedDefects: ActionableJudgeDefect[] = [];
  const seenDefectKeys = new Set<string>();

  for (const e of health.validation.errors) {
    const key = `ast:${e.code}:${e.cells.join(',')}`;
    if (!seenDefectKeys.has(key)) {
      seenDefectKeys.add(key);
      mergedDefects.push({
        severity: e.code === 'OVERLAP' || e.code === 'EDGE_DANGLING' || e.code === 'BROKEN_IMAGE_ASSET' ? 'HIGH' : 'MEDIUM',
        category: e.code.includes('EDGE') || e.code.includes('ORPHAN') ? 'TOPOLOGY_WIRING' : 'SPATIAL_GEOMETRY',
        cellIds: e.cells,
        title: e.code,
        detail: e.detail,
        repairInstruction: `Fix ${e.code}: ${e.detail}`,
      });
    }
  }

  for (const j of executedJudges) {
    for (const d of j.defects) {
      const key = `${d.category}:${d.title.toLowerCase().slice(0, 32)}:${d.cellIds.join(',')}`;
      if (!seenDefectKeys.has(key)) {
        seenDefectKeys.add(key);
        mergedDefects.push(d);
      }
    }
  }

  const criticalOrHighCount = mergedDefects.filter(
    (d) => d.severity === 'CRITICAL' || d.severity === 'HIGH'
  ).length;

  const truthfulnessAndReality = Math.max(0, blend((j) => j.truthfulnessScore));
  const externalStandardsGrounding = Math.max(0, blend((j) => j.groundingScore));
  const logicalMissionCompleteness = Math.min(
    topoDeterministicScore + 8,
    Math.max(0, blend((j) => j.completenessScore))
  );
  const promptRelevance = Math.max(0, blend((j) => j.relevanceScore));
  const geometricZeroCollision = visualDeterministicScore;

  const overallCompositeScore = Math.round(
    (truthfulnessAndReality +
      externalStandardsGrounding +
      logicalMissionCompleteness +
      promptRelevance +
      geometricZeroCollision) /
      5
  );

  // Enrich Security & Topology dimension summaries with live multi-model judge findings
  const enrichedDimensions: HonestAuditDimension[] = health.dimensions.map((dim) => {
    if (dim.category === 'security') {
      const secScoreBlended = Math.round((dim.score + truthfulnessAndReality + externalStandardsGrounding) / 3);
      const judgeSecRecs = mergedDefects
        .filter((d) => d.category === 'TECHNICAL_ACCURACY' || d.category === 'SECURITY_GOVERNANCE')
        .slice(0, 3)
        .map((d) => `[${d.severity}] ${d.title}: ${d.repairInstruction}`);
      return {
        ...dim,
        score: secScoreBlended,
        status: secScoreBlended >= 88 ? 'passed' : secScoreBlended >= 65 ? 'warning' : 'critical',
        summary: judge1.executed && judge1.technicalSummary ? judge1.technicalSummary : dim.summary,
        recommendations: Array.from(new Set([...judgeSecRecs, ...dim.recommendations])).slice(0, 4),
        evaluationSource: 'live_multi_model_judge',
      };
    }
    if (dim.category === 'topology') {
      const topoScoreBlended = Math.round((dim.score + logicalMissionCompleteness + promptRelevance) / 3);
      const judgeTopoRecs = mergedDefects
        .filter((d) => d.category === 'TOPOLOGY_WIRING' || d.category === 'PROMPT_FIDELITY')
        .slice(0, 3)
        .map((d) => `[${d.severity}] ${d.title}: ${d.repairInstruction}`);
      return {
        ...dim,
        score: topoScoreBlended,
        status: topoScoreBlended >= 88 ? 'passed' : topoScoreBlended >= 65 ? 'warning' : 'critical',
        summary:
          judge2.executed && judge2.technicalSummary
            ? `${dim.summary} Cross-Family Judge (${judge2.modelId}): ${judge2.technicalSummary}`
            : dim.summary,
        recommendations: Array.from(new Set([...judgeTopoRecs, ...dim.recommendations])).slice(0, 4),
        evaluationSource: 'live_multi_model_judge',
      };
    }
    return dim;
  });

  const verdict: OrthogonalMultiModelJudgeReport['verdict'] =
    criticalOrHighCount === 0 && overallCompositeScore >= 85
      ? 'CERTIFIED'
      : 'NEEDS_REPAIR';

  return {
    evaluatedAtUtc,
    isLiveModelEvaluated: true,
    generatorModel,
    primaryJudgeModel: judge1.executed ? judge1.modelId : 'unavailable',
    crossFamilyJudgeModel: judge2.executed ? judge2.modelId : 'unavailable',
    domainKind: health.domainKind,
    verdict,
    scores: {
      truthfulnessAndReality,
      externalStandardsGrounding,
      logicalMissionCompleteness,
      promptRelevance,
      geometricZeroCollision,
      overallCompositeScore,
    },
    dimensions: enrichedDimensions,
    judgeVerdicts: [judge1, judge2],
    actionableDefects: mergedDefects,
    validationReport: health.validation,
    inventorySummary: health.inventory,
  };
}
