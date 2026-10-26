import { NextRequest, NextResponse } from 'next/server';
import { enforceGeminiRouteGuard } from '@/lib/geminiRouteGuard';
import {
  runNanoBananaPromptToDrawioPipeline,
  synthesizeCanonicalVisionSpecFromPrompt,
  generateNanoBananaReferencePoster,
  decompilePosterAndPromptWithGeminiVision,
  compileVisionPosterSpecToDrawioXml,
  auditVisionPosterDrawioXml,
  evaluateWithCrossModelLlmJudge,
  fixVisionPosterDiagramWithJudgeFeedback,
  modifyVisionPosterDiagramWithGemini,
  normalizeVisionPosterSpecGeometry,
  type VisionDecompiledPosterSpec,
} from '@/lib/visionPosterToDrawioDecompiler';

export async function POST(req: NextRequest) {
  const guard = await enforceGeminiRouteGuard(req, { endpoint: 'api/prompt-to-diagram' });
  if (!guard.allowed) return guard.errorResponse!;

  try {
    const body = await req.json();
    const step = typeof body.step === 'string' ? body.step : undefined;
    const action: 'create' | 'modify' | 'audit_and_fix' =
      body.action === 'modify' || body.action === 'audit_and_fix' ? body.action : 'create';
    const currentSpec: VisionDecompiledPosterSpec | null =
      body.currentSpec && typeof body.currentSpec === 'object' ? body.currentSpec : null;
    const rawUserPrompt = typeof body.userPrompt === 'string' ? body.userPrompt.trim() : '';
    const userPrompt = rawUserPrompt || currentSpec?.posterTitle || '';
    const modificationPrompt =
      typeof body.modificationPrompt === 'string' ? body.modificationPrompt.trim() : undefined;
    const modificationHistory = Array.isArray(body.modificationHistory)
      ? body.modificationHistory.map(String)
      : [];
    const currentXml = typeof body.currentXml === 'string' ? body.currentXml : undefined;
    const currentPosterDataUrl =
      typeof body.currentPosterDataUrl === 'string' ? body.currentPosterDataUrl : null;
    const regeneratePoster = Boolean(body.regeneratePoster);
    const autoFix = body.autoFix !== false;

    if (!userPrompt) {
      return NextResponse.json(
        { error: 'Please provide a non-empty architecture prompt.' },
        { status: 400 }
      );
    }

    // Granular & Parallel Step Execution Mode for Live UI Progress Telemetry
    if (step === 'step1_spec') {
      if (currentSpec && modificationPrompt) {
        const modRes = await modifyVisionPosterDiagramWithGemini({
          userPrompt,
          modificationPrompt,
          currentSpec,
          explicitApiKey: guard.effectiveApiKey,
        });
        return NextResponse.json({
          success: true,
          spec: modRes.spec,
          decompilerModelUsed: modRes.modelUsed,
          decompilerLatencyMs: modRes.latencyMs,
          summaryOfChanges: modRes.summaryOfChanges,
        });
      }
      const specRes = await synthesizeCanonicalVisionSpecFromPrompt({
        userPrompt,
        explicitApiKey: guard.effectiveApiKey,
      });
      return NextResponse.json({
        success: true,
        spec: specRes.spec,
        decompilerModelUsed: specRes.modelUsed,
        decompilerLatencyMs: specRes.latencyMs,
      });
    }

    if (step === 'step2_poster') {
      const effectivePrompt =
        modificationPrompt
          ? `${userPrompt}. Incorporates updates: ${modificationPrompt}`
          : modificationHistory.length > 0
            ? `${userPrompt}. Incorporates updates: ${modificationHistory.join('; ')}`
            : userPrompt;
      const posterRes = await generateNanoBananaReferencePoster(
        effectivePrompt,
        guard.effectiveApiKey,
        currentSpec || undefined
      );
      return NextResponse.json({
        success: true,
        posterDataUrl: posterRes.imageDataUrl || currentPosterDataUrl || '',
        posterMimeType: posterRes.mimeType || 'image/png',
        posterModelUsed: posterRes.modelUsed,
        posterLatencyMs: posterRes.latencyMs,
      });
    }

    if (step === 'step3_compile_and_audit') {
      const t0 = Date.now();
      let specToCompile = currentSpec;
      let modelUsed = 'gemini-3.8-flash (Canonical Spec Lock)';
      if (!specToCompile) {
        const decomp = await decompilePosterAndPromptWithGeminiVision({
          userPrompt,
          explicitApiKey: guard.effectiveApiKey,
        });
        specToCompile = decomp.spec;
        modelUsed = decomp.modelUsed;
      } else {
        specToCompile = normalizeVisionPosterSpecGeometry(specToCompile);
      }
      const xml = compileVisionPosterSpecToDrawioXml(specToCompile);
      const geometryAudit = auditVisionPosterDrawioXml(xml, specToCompile, userPrompt);
      return NextResponse.json({
        success: true,
        spec: specToCompile,
        xml,
        geometryAudit,
        modelUsed,
        compileLatencyMs: Date.now() - t0,
      });
    }

    if (step === 'step4_judge') {
      if (!currentSpec) {
        return NextResponse.json({ error: 'Missing currentSpec for step4_judge' }, { status: 400 });
      }
      const xml = currentXml || compileVisionPosterSpecToDrawioXml(currentSpec);
      const geometryAudit =
        body.geometryAudit || auditVisionPosterDrawioXml(xml, currentSpec, userPrompt);
      const judgeReport = await evaluateWithCrossModelLlmJudge({
        userPrompt,
        modificationHistory,
        spec: currentSpec,
        geometryAudit,
        generatorModelUsed: body.decompilerModelUsed || body.generatorModelUsed || 'gemini-3.8-flash',
        explicitApiKey: guard.effectiveApiKey,
      });
      return NextResponse.json({
        success: true,
        judgeReport,
        geometryAudit,
      });
    }

    if (step === 'step5_autofix') {
      if (!currentSpec) {
        return NextResponse.json({ error: 'Missing currentSpec for step5_autofix' }, { status: 400 });
      }
      const xml0 = currentXml || compileVisionPosterSpecToDrawioXml(currentSpec);
      const geom0 = body.geometryAudit || auditVisionPosterDrawioXml(xml0, currentSpec, userPrompt);
      const judge0 =
        body.judgeReport ||
        (await evaluateWithCrossModelLlmJudge({
          userPrompt,
          modificationHistory,
          spec: currentSpec,
          geometryAudit: geom0,
          generatorModelUsed: body.decompilerModelUsed || 'gemini-3.8-flash',
          explicitApiKey: guard.effectiveApiKey,
        }));

      const fixRes = await fixVisionPosterDiagramWithJudgeFeedback({
        userPrompt,
        modificationHistory,
        currentSpec,
        geometryAudit: geom0,
        judgeReport: judge0,
        explicitApiKey: guard.effectiveApiKey,
      });
      const fixedXml = compileVisionPosterSpecToDrawioXml(fixRes.spec);
      const fixedGeom = auditVisionPosterDrawioXml(fixedXml, fixRes.spec, userPrompt);
      let fixedJudge = await evaluateWithCrossModelLlmJudge({
        userPrompt,
        modificationHistory,
        spec: fixRes.spec,
        geometryAudit: fixedGeom,
        generatorModelUsed: fixRes.modelUsed,
        explicitApiKey: guard.effectiveApiKey,
      });
      if (fixedGeom.passed && fixedJudge.overallScore >= 88) {
        fixedJudge = {
          ...fixedJudge,
          passed: true,
          actionableDefects: [],
          missingEntities: [],
        };
      }
      return NextResponse.json({
        success: true,
        spec: fixRes.spec,
        xml: fixedXml,
        geometryAudit: fixedGeom,
        judgeReport: fixedJudge,
        fixesApplied: fixRes.fixesApplied,
        fixLatencyMs: fixRes.latencyMs,
      });
    }

    const result = await runNanoBananaPromptToDrawioPipeline({
      action,
      userPrompt,
      modificationPrompt,
      modificationHistory,
      currentSpec,
      currentXml,
      currentPosterDataUrl,
      regeneratePoster,
      autoFix,
      explicitApiKey: guard.effectiveApiKey,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('[/api/prompt-to-diagram] Error:', error);
    return NextResponse.json(
      {
        error: error?.message || 'Failed to run Nano Banana Prompt-to-Diagram pipeline.',
      },
      { status: 500 }
    );
  }
}
