import { NextRequest, NextResponse } from 'next/server';
import { enforceGeminiRouteGuard } from '@/lib/geminiRouteGuard';
import { runTruthfulnessAndGroundingCertification } from '@/lib/truthfulnessGroundingEngine';

export const dynamic = 'force-dynamic';
export const maxDuration = 90;

export async function POST(req: NextRequest) {
  const guard = await enforceGeminiRouteGuard(req, { endpoint: 'api/judge' });
  if (!guard.allowed) return guard.errorResponse!;

  try {
    const body = await req.json();
    const prompt = typeof body?.prompt === 'string' ? body.prompt.trim().slice(0, 16000) : '';
    const modificationPrompt =
      typeof body?.modificationPrompt === 'string'
        ? body.modificationPrompt.trim().slice(0, 8000)
        : undefined;
    const xmlContent = typeof body?.xmlContent === 'string' ? body.xmlContent : '';
    const beforeXml = typeof body?.beforeXml === 'string' ? body.beforeXml : undefined;
    const generatorModel =
      typeof body?.generatorModel === 'string' ? body.generatorModel.trim().slice(0, 120) : undefined;
    const imageBase64 = typeof body?.imageBase64 === 'string' ? body.imageBase64 : undefined;

    if (!xmlContent || xmlContent.length > 3_000_000) {
      return NextResponse.json(
        { error: 'Valid Draw.io xmlContent (<= 3MB) is required.' },
        { status: 400 }
      );
    }

    const dossier = await runTruthfulnessAndGroundingCertification({
      prompt: prompt || 'Architecture Diagram Evaluation',
      modificationPrompt,
      xmlContent,
      beforeXml,
      generatorModel,
      imageBase64,
      explicitApiKey: guard.effectiveApiKey,
    });

    return NextResponse.json({
      success: true,
      truthfulnessDossier: dossier,
      multiModelJudgeReport: dossier.multiModelJudgeReport,
    });
  } catch (err: any) {
    console.error('[/api/judge] Multi-model judge error:', err?.message || err);
    return NextResponse.json(
      { error: 'Failed to execute multi-model architecture evaluation.' },
      { status: 500 }
    );
  }
}
