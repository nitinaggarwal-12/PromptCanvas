import { NextResponse } from 'next/server';
import { getDiagram, getLatestDiagramVersion, saveDiagramVersion } from '@/lib/db';
import { getAuthenticatedUser } from '@/lib/auth';
import { acquireGeminiLock, releaseGeminiLock, deriveLockKey } from '@/lib/geminiLock';
import { getTechnicalArchitectureXml } from '@/lib/technicalArchitectureXmls';
import { applyDeterministicGeometryAndContrastFixes } from '@/lib/preflightAuditEngine';
import { enforceGeminiRouteGuard } from '@/lib/geminiRouteGuard';
import { toUserFacingMessage, toResponseStatus, parseUpstreamError } from '@/lib/ai/modelErrors';
import { mutateDrawioXmlDirectly } from '@/lib/freeform/directDrawioSpatialMutator';
import { runTruthfulnessAndGroundingCertification } from '@/lib/truthfulnessGroundingEngine';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const guard = await enforceGeminiRouteGuard(request, { endpoint: 'api/audit/remediate' });
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
      xmlContent: directXmlContent,
      prompt: directPrompt,
      selectedGaps,
      architectureType,
    } = body;

    if ((!diagramId && !directXmlContent) || !Array.isArray(selectedGaps) || selectedGaps.length === 0) {
      return NextResponse.json(
        { error: 'Either diagramId or xmlContent plus a non-empty selectedGaps array are required.' },
        { status: 400 }
      );
    }

    let diagram = null;
    let latestVersion = null;
    if (diagramId) {
      diagram = await getDiagram(diagramId, user?.id);
      if (!diagram && !directXmlContent) {
        return NextResponse.json(
          { error: `Diagram with ID ${diagramId} not found or access denied` },
          { status: 404 }
        );
      }
      if (diagram?.access_level === 'Viewer') {
        return NextResponse.json(
          { error: 'Forbidden: You have read-only access to this diagram.' },
          { status: 403 }
        );
      }
      latestVersion = await getLatestDiagramVersion(diagramId, architectureType);
    }

    let currentXml =
      typeof directXmlContent === 'string' && directXmlContent.includes('<mxCell')
        ? directXmlContent
        : latestVersion?.xml_content || '';

    if (!currentXml || currentXml.length < 200 || !currentXml.includes('<mxCell')) {
      currentXml = getTechnicalArchitectureXml(
        architectureType || latestVersion?.architecture_type || 'unified_system_view'
      );
    }

    const remediationInstruction = selectedGaps
      .slice(0, 8)
      .map(
        (gap: { title?: string; component?: string; remediation?: string }, idx: number) =>
          `${idx + 1}. [${gap.title || 'Gap'}${gap.component ? ` on ${gap.component}` : ''}]: ${gap.remediation || 'Fix issue cleanly'}`
      )
      .join('\n');

    let remediatedXml = currentXml;
    let summaryOfChanges = `Applied deterministic geometry & contrast healing across ${selectedGaps.length} finding(s).`;
    let modelUsed = 'deterministic-geometry-healer';
    let precomputedJudgeReport: any = undefined;

    if (lockAcquired) {
      try {
        const mutated = await mutateDrawioXmlDirectly({
          currentXml,
          userPrompt: directPrompt || latestVersion?.prompt || diagram?.name || 'Architecture Remediation',
          modificationPrompt: `Surgically remediate these verified architecture/layout gaps without adding fake compliance banners:\n${remediationInstruction}`,
          explicitApiKey: guard.effectiveApiKey,
        });
        remediatedXml = mutated.xml;
        summaryOfChanges = mutated.summaryOfChanges;
        modelUsed = mutated.modelUsed;
        precomputedJudgeReport = mutated.judgeReport;
      } catch (mutErr) {
        console.warn('[/api/audit/remediate] Spatial LLM mutator unavailable; applying honest deterministic geometry & contrast fixes:', mutErr);
      }
    }

    // Apply pure deterministic contrast & sibling-overlap healing (ZERO fake banners, ZERO rigged 100% stamps!)
    remediatedXml = applyDeterministicGeometryAndContrastFixes(
      remediatedXml,
      architectureType || latestVersion?.architecture_type || 'custom'
    );

    const truthfulnessDossier = await runTruthfulnessAndGroundingCertification({
      prompt: directPrompt || latestVersion?.prompt || diagram?.name || 'Architecture Remediation',
      modificationPrompt: remediationInstruction,
      xmlContent: remediatedXml,
      beforeXml: currentXml,
      generatorModel: modelUsed,
      explicitApiKey: guard.effectiveApiKey,
      precomputedJudgeReport,
    });

    let newVersion = null;
    if (diagramId && diagram) {
      newVersion = await saveDiagramVersion(
        diagramId,
        remediatedXml,
        summaryOfChanges,
        modelUsed,
        null,
        null,
        null,
        null,
        architectureType || latestVersion?.architecture_type || 'unified_system_view'
      );
    }

    return NextResponse.json({
      success: true,
      xml: remediatedXml,
      modelUsed,
      summaryOfChanges,
      truthfulnessDossier,
      newVersion,
      comment: summaryOfChanges,
      message: summaryOfChanges,
    });
  } catch (error: unknown) {
    console.error('Audit remediation failed:', error);
    return NextResponse.json(
      {
        error: 'Remediation Failed',
        details: toUserFacingMessage(error, 'Remediation'),
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
