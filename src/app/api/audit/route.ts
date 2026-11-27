import { NextResponse } from 'next/server';
import { Type } from '@google/genai';
import { getLatestDiagramVersion, getDiagramVersion, saveAuditReport, getAuditReportsForDiagram } from '@/lib/db';
import { getAuthenticatedUser } from '@/lib/auth';
import { acquireGeminiLock, releaseGeminiLock, deriveLockKey } from '@/lib/geminiLock';
import { getDefaultXmlForArchitecture } from '@/lib/architectureTypes';
import {
  CROSS_FAMILY_JUDGE_MODEL_ID,
  GEMINI_FLASH_MODEL_ID,
  createGeminiClient,
  getGenConfigForModel,
  resolveLatestDistinctJudgeChain,
} from '@/lib/geminiConfig';
import { generateContentWithRetry } from '@/lib/geminiRetryHelper';
import { enforceGeminiRouteGuard } from '@/lib/geminiRouteGuard';
import { toUserFacingMessage, toResponseStatus, parseUpstreamError } from '@/lib/ai/modelErrors';
import { computeHonestDiagramHealth } from '@/lib/orthogonalMultiModelJudge';
import { cookies } from 'next/headers';

export interface AuditGap {
  id: string;
  title: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  component: string;
  description: string;
  remediation: string;
}

export type AuditCategory = 'security' | 'visual' | 'topology' | 'responsive' | 'accessibility' | 'vendor';

const CATEGORY_RUBRICS: Record<AuditCategory, string> = {
  security: `Evaluate SECURITY, GOVERNANCE & DOMAIN INVARIANTS strictly appropriate to the diagram's domainKind:
- For cloud_infrastructure / agentic_ai / data_medallion: inspect ingress auth/WAF, IAM/OIDC/Workload Identity, network isolation (VPC-SC / PSC / private subnets), KMS/Secret Manager encryption, and guardrail/audit logging.
- For uml_erd_schema: inspect Primary Key (PK), Foreign Key (FK), column data types, and referential constraints (do NOT penalize a schema/ERD for lacking infrastructure WAF servers).
- For sequence_state_flow: inspect lifeline auth/token steps, transition guards, timeout/error paths, and terminal states.`,

  visual: `Evaluate VISUAL LAYOUT & 2D SPATIAL GEOMETRY:
- Inspect node bounding boxes for overlaps, edge routes slicing through unrelated cards or container headers, slanted non-orthogonal connectors, child nodes overflowing containers, and text clipping.`,

  topology: `Evaluate TOPOLOGICAL & CAUSAL ACCURACY:
- Inspect directed edge wiring ("from -> to") for accurate causal flow, absence of dangling connectors or disconnected components, proper tier ordering (no client bypassing gateways straight to databases), and realistic cloud/domain SKUs.`,

  responsive: `Evaluate VIEWPORT & BOUNDARY FIT:
- Verify all coordinates stay non-negative and fit cleanly inside the 16:9 widescreen canvas boundary without clipping or cramped margins.`,

  accessibility: `Evaluate WCAG 2.1 CONTRAST & LABEL LEGIBILITY:
- Verify W3C relative luminance contrast (>= 4.5:1 AA) between text and card fills, readable font sizes (>= 9.5px), and absence of unescaped swallowed HTML angle-bracket tokens.`,

  vendor: `Evaluate ICON & NOTATION ASSET INTEGRITY:
- Verify zero broken external image URLs and accurate service vector icons or standard UML/ERD notation appropriate to the diagram type.`,
};

function extractDeterministicCategoryGaps(
  xmlContent: string,
  categoryKey: AuditCategory,
  promptContext: string
): { deterministicScore: number; gaps: AuditGap[]; compactInventoryJson: string; domainKind: string } {
  const health = computeHonestDiagramHealth(xmlContent, promptContext);
  const dim = health.dimensions.find((d) => d.category === categoryKey) || health.dimensions[0];
  const gaps: AuditGap[] = [];

  const codeMap: Record<AuditCategory, Set<string>> = {
    visual: new Set([
      'OVERLAP',
      'EDGE_INTERSECTS_VERTEX',
      'CONTAINER_HEADER_SLICED',
      'NON_ORTHOGONAL_EDGE_SEGMENT',
      'TEXT_OVERFLOW_HEIGHT',
      'OUT_OF_CONTAINER',
      'HTML_FOSTER_PARENTING_IN_TABLE',
    ]),
    topology: new Set([
      'EDGE_DANGLING',
      'ORPHAN_NODE',
      'DATA_STORE_DISCONNECTED',
      'UNCONNECTED_LOAD_BALANCER',
      'FLOW_BACKTRACKING_DETECTED',
      'CLOSED_LOOP_MISSING_EDGE',
    ]),
    responsive: new Set(['OUT_OF_BOUNDS']),
    accessibility: new Set(['LOW_COLOR_CONTRAST', 'UNESCAPED_PSEUDO_HTML_TAG']),
    vendor: new Set(['BROKEN_IMAGE_ASSET']),
    security: new Set([]),
  };

  const targetCodes = codeMap[categoryKey];
  const matchingErrors = health.validation.errors.filter((e) => targetCodes.has(e.code));
  const matchingWarnings = health.validation.warnings.filter((w) => targetCodes.has(w.code));

  matchingErrors.slice(0, 8).forEach((err, idx) => {
    gaps.push({
      id: `ast_${categoryKey}_err_${idx + 1}`,
      title: err.code.replace(/_/g, ' '),
      severity: 'HIGH',
      component: err.cells.length > 0 ? err.cells.join(', ') : 'Canvas AST',
      description: err.detail,
      remediation: `Resolve ${err.code} on ${err.cells.join(', ') || 'affected element(s)'}.`,
    });
  });

  matchingWarnings.slice(0, 4).forEach((warn, idx) => {
    gaps.push({
      id: `ast_${categoryKey}_warn_${idx + 1}`,
      title: warn.code.replace(/_/g, ' '),
      severity: 'MEDIUM',
      component: warn.cells.length > 0 ? warn.cells.join(', ') : 'Canvas AST',
      description: warn.detail,
      remediation: warn.detail,
    });
  });

  if (gaps.length === 0 && dim.recommendations.length > 0) {
    dim.recommendations.forEach((rec, idx) => {
      gaps.push({
        id: `ast_${categoryKey}_rec_${idx + 1}`,
        title: `${dim.name} Advisory`,
        severity: dim.score < 75 ? 'HIGH' : 'MEDIUM',
        component: health.domainKind,
        description: dim.summary,
        remediation: rec,
      });
    });
  }

  return {
    deterministicScore: dim.score,
    gaps,
    compactInventoryJson: health.compactInventoryJson,
    domainKind: health.domainKind,
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const diagramId = searchParams.get('diagramId');
    if (!diagramId) {
      return NextResponse.json({ error: 'diagramId query parameter is required' }, { status: 400 });
    }
    const reports = await getAuditReportsForDiagram(diagramId);
    return NextResponse.json({ reports });
  } catch (error: unknown) {
    console.error('Failed to fetch audit reports:', error);
    return NextResponse.json({ error: 'Failed to fetch reports' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const guard = await enforceGeminiRouteGuard(request, { endpoint: 'api/audit' });
  if (!guard.allowed) return guard.errorResponse!;

  const user = await getAuthenticatedUser();
  const rawIp = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '';
  const clientIp = rawIp.split(',')[0]?.trim() || '';
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('promptcanvas_session')?.value;
  const lockKey = deriveLockKey(user?.id, clientIp, sessionId);

  const lockAcquired = acquireGeminiLock(lockKey);

  try {
    const body = await request.json();
    const {
      diagramId,
      versionId,
      auditCategory = 'security',
      architectureType,
      imageBase64,
      xmlContent: bodyXmlContent,
      generatorModel: bodyGeneratorModel,
    } = body;

    if (!diagramId && !bodyXmlContent) {
      return NextResponse.json({ error: 'diagramId or xmlContent is required' }, { status: 400 });
    }

    let targetVersion = null;
    if (versionId) {
      targetVersion = await getDiagramVersion(versionId);
    }
    if (!targetVersion && diagramId) {
      targetVersion = await getLatestDiagramVersion(diagramId, architectureType);
    }

    if (!targetVersion && (!bodyXmlContent || typeof bodyXmlContent !== 'string' || bodyXmlContent.trim().length === 0)) {
      return NextResponse.json({ error: 'Diagram has no versions to audit' }, { status: 404 });
    }

    const ucContext = (targetVersion as any)?.use_case_context || targetVersion?.prompt || 'Architecture Diagram';
    const userPrompt = targetVersion?.prompt || undefined;
    const effectiveArchType =
      architectureType ||
      targetVersion?.architecture_type ||
      'custom_architecture';

    let xmlContent =
      typeof bodyXmlContent === 'string' && bodyXmlContent.trim().length > 0
        ? bodyXmlContent
        : targetVersion?.xml_content || '';

    if (!xmlContent || xmlContent.length < 120) {
      xmlContent = getDefaultXmlForArchitecture(effectiveArchType, ucContext, userPrompt) || xmlContent;
    }

    const categoryKey = (CATEGORY_RUBRICS[auditCategory as AuditCategory] ? auditCategory : 'security') as AuditCategory;
    const det = extractDeterministicCategoryGaps(
      xmlContent,
      categoryKey,
      `${ucContext} ${userPrompt || ''} ${effectiveArchType}`
    );

    const generatorModel =
      typeof bodyGeneratorModel === 'string' && bodyGeneratorModel.trim()
        ? bodyGeneratorModel.trim()
        : GEMINI_FLASH_MODEL_ID;

    const explicitKey = request.headers.get('x-gemini-api-key') || guard.effectiveApiKey;
    const ai = lockAcquired ? createGeminiClient(explicitKey) : null;

    let score = det.deterministicScore;
    let report = `### Deterministic AST Audit (${categoryKey.toUpperCase()})\n\n- **Domain Kind**: \`${det.domainKind}\`\n- **Score**: **${det.deterministicScore}%**\n- **Detected Gaps**: ${det.gaps.length}\n`;
    let gaps: AuditGap[] = [...det.gaps];
    let judgeModelReport = 'none (offline — deterministic AST only)';
    let crossFamilyJudgeReport = 'none (offline)';
    let isLiveEvaluated = false;

    if (ai) {
      try {
        const distinctChain = await resolveLatestDistinctJudgeChain(ai, generatorModel);
        const primaryJudge = distinctChain.find((m) => m.toLowerCase().includes('pro')) || distinctChain[0];
        const crossFamilyJudge =
          distinctChain.find((m) => m.toLowerCase().startsWith('gemma-4-')) || CROSS_FAMILY_JUDGE_MODEL_ID;

        const systemInstruction = `${CATEGORY_RUBRICS[categoryKey]}

STRICT HONESTY MANDATE:
- Score strictly 0-100 with ZERO artificial score floors. If severe defects exist, score accordingly (<50 when broken).
- Reference actual node/edge IDs from the parsed inventory. Never invent fictional node names.`;

        const multimodalParts: any[] = [];
        if (imageBase64 && typeof imageBase64 === 'string') {
          const cleanBase64 = imageBase64.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');
          if (cleanBase64.length > 100) {
            multimodalParts.push({
              inlineData: {
                mimeType: 'image/png',
                data: cleanBase64,
              },
            });
          }
        }
        multimodalParts.push({
          text: `Context: "${ucContext}" (${effectiveArchType}, domainKind=${det.domainKind})\n\nParsed Canvas Inventory & Validator Findings:\n${det.compactInventoryJson}\n\nReturn JSON: { "score": 0..100, "report": "markdown analysis", "gaps": [{ "id", "title", "severity": "HIGH"|"MEDIUM"|"LOW", "component", "description", "remediation" }] }`,
        });

        const auditResponseSchema = {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            report: { type: Type.STRING },
            gaps: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  title: { type: Type.STRING },
                  severity: { type: Type.STRING, enum: ['HIGH', 'MEDIUM', 'LOW'] },
                  component: { type: Type.STRING },
                  description: { type: Type.STRING },
                  remediation: { type: Type.STRING },
                },
                required: ['id', 'title', 'severity', 'component', 'description', 'remediation'],
              },
            },
          },
          required: ['score', 'report', 'gaps'],
        };

        // Run Primary Pro Judge + Cross-Family Gemma 4 31B Judge in parallel
        const [proRes, gemmaRes] = await Promise.allSettled([
          generateContentWithRetry(
            ai,
            {
              model: primaryJudge,
              contents: [{ role: 'user', parts: multimodalParts }],
              config: {
                systemInstruction,
                temperature: 0.1,
                maxOutputTokens: 8192,
                thinkingConfig: getGenConfigForModel('audit', primaryJudge).thinkingConfig,
                responseMimeType: 'application/json',
                responseSchema: auditResponseSchema,
              },
            },
            { maxRetries: 2, perAttemptTimeoutMs: 35_000, totalBudgetMs: 45_000, label: `Audit Pro Judge (${primaryJudge})` }
          ),
          generateContentWithRetry(
            ai,
            {
              model: crossFamilyJudge,
              contents: [
                {
                  role: 'user',
                  parts: [
                    {
                      text: `${systemInstruction}\n\n${multimodalParts[multimodalParts.length - 1].text}`,
                    },
                  ],
                },
              ],
              config: {
                temperature: 0.1,
                maxOutputTokens: 8192,
                responseMimeType: 'application/json',
                responseSchema: auditResponseSchema,
                thinkingConfig: { thinkingLevel: 'MINIMAL' as any },
              },
            },
            { maxRetries: 2, perAttemptTimeoutMs: 35_000, totalBudgetMs: 45_000, label: `Audit Cross-Family Judge (${crossFamilyJudge})` }
          ),
        ]);

        const parseSafe = (txt: string) => {
          const clean = String(txt || '').replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
          const s = clean.indexOf('{');
          const e = clean.lastIndexOf('}');
          return JSON.parse(s >= 0 && e > s ? clean.slice(s, e + 1) : clean);
        };

        let proScore: number | null = null;
        let gemmaScore: number | null = null;
        const llmGaps: AuditGap[] = [];

        if (proRes.status === 'fulfilled' && proRes.value?.text) {
          const p = parseSafe(proRes.value.text);
          judgeModelReport = String((proRes.value as any)?.__resolvedModelId || primaryJudge);
          if (typeof p.score === 'number') proScore = Math.max(0, Math.min(100, Math.round(p.score)));
          if (typeof p.report === 'string' && p.report.trim()) report = p.report;
          if (Array.isArray(p.gaps)) llmGaps.push(...p.gaps);
          isLiveEvaluated = true;
        }

        if (gemmaRes.status === 'fulfilled' && gemmaRes.value?.text) {
          try {
            const g = parseSafe(gemmaRes.value.text);
            crossFamilyJudgeReport = String((gemmaRes.value as any)?.__resolvedModelId || crossFamilyJudge);
            if (typeof g.score === 'number') gemmaScore = Math.max(0, Math.min(100, Math.round(g.score)));
            if (Array.isArray(g.gaps)) {
              for (const gg of g.gaps.slice(0, 4)) {
                if (gg?.title && gg?.remediation) {
                  llmGaps.push({
                    id: String(gg.id || `gemma_${llmGaps.length + 1}`),
                    title: `[Cross-Family] ${String(gg.title)}`,
                    severity: ['HIGH', 'MEDIUM', 'LOW'].includes(String(gg.severity).toUpperCase())
                      ? (String(gg.severity).toUpperCase() as 'HIGH' | 'MEDIUM' | 'LOW')
                      : 'MEDIUM',
                    component: String(gg.component || 'Architecture'),
                    description: String(gg.description || ''),
                    remediation: String(gg.remediation),
                  });
                }
              }
            }
            isLiveEvaluated = true;
          } catch {
            // Ignore malformed secondary JSON while keeping Pro judge output
          }
        }

        if (isLiveEvaluated) {
          const seenTitles = new Set(gaps.map((g) => g.title.toLowerCase().slice(0, 32)));
          for (const g of llmGaps) {
            const k = String(g.title || '').toLowerCase().slice(0, 32);
            if (k && !seenTitles.has(k)) {
              seenTitles.add(k);
              gaps.push(g);
            }
          }
          const judgeBlend =
            proScore !== null && gemmaScore !== null
              ? Math.round(proScore * 0.65 + gemmaScore * 0.35)
              : (proScore ?? gemmaScore ?? det.deterministicScore);
          // Zero artificial 50% floor: combine deterministic AST truth with multi-model judge score
          score = Math.max(0, Math.min(det.deterministicScore + 5, Math.round((det.deterministicScore + judgeBlend) / 2)));
        }
      } catch (llmError) {
        console.warn('[/api/audit] Multi-model judge failed; returning honest offline AST score:', llmError);
        isLiveEvaluated = false;
        judgeModelReport = 'none (upstream error — deterministic AST only)';
      }
    }

    let savedReport = null;
    let allReports: any[] = [];
    if (diagramId && targetVersion) {
      try {
        savedReport = await saveAuditReport({
          diagramId,
          versionNumber: targetVersion.version_number,
          auditCategory: categoryKey,
          score,
          report,
          gaps,
        });
        allReports = await getAuditReportsForDiagram(diagramId);
      } catch (dbErr) {
        console.warn('Failed to save audit report to DB:', dbErr);
      }
    }

    return NextResponse.json({
      auditCategory: categoryKey,
      architectureType: effectiveArchType,
      domainKind: det.domainKind,
      score,
      report,
      gaps,
      isLiveEvaluated,
      generatorModel,
      judgeModel: isLiveEvaluated
        ? crossFamilyJudgeReport !== 'none (offline)'
          ? `${judgeModelReport} + ${crossFamilyJudgeReport}`
          : judgeModelReport
        : judgeModelReport,
      primaryJudgeModel: judgeModelReport,
      crossFamilyJudgeModel: crossFamilyJudgeReport,
      savedReport,
      reportsHistory: allReports,
    });
  } catch (error: unknown) {
    console.error('Audit failed:', error);
    return NextResponse.json(
      {
        error: 'Audit Failed',
        details: toUserFacingMessage(error, 'Audit'),
        retryable: parseUpstreamError(error).isRetryable,
      },
      { status: toResponseStatus(error) }
    );
  } finally {
    if (lockAcquired) {
      releaseGeminiLock(lockKey);
    }
  }
}
